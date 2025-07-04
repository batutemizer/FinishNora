import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users,
  User,
  LogOut,
  Bell,
  Plus,
  Edit,
  Eye,
  GraduationCap,
  Target,
  X,
  Save,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  doc, 
  getDoc,
  setDoc,
  collection, 
  getDocs, 
  addDoc,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  
  // Gerçek veriler
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Modal states
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  
  // Form states
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    parentName: '',
    parentPhone: '',
    password: ''
  });
  
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    description: '',
    dueDate: '',
    assignedStudents: []
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });

  const [editAssignment, setEditAssignment] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.userType === 'teacher') {
              const teacherDoc = await getDoc(doc(db, 'teachers', user.uid));
              if (teacherDoc.exists()) {
                setTeacherData({ ...userData, ...teacherDoc.data() });
              } else {
                setTeacherData(userData);
              }
              // Öğretmen verilerini yükle
              await loadTeacherData(user.uid);
            } else {
              navigate('/');
            }
          }
        } catch (error) {
          console.error('Veri getirme hatası:', error);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadTeacherData = async (teacherId) => {
    try {
      // Öğrencileri getir
      const studentsQuery = query(
        collection(db, 'students'),
        where('teacherId', '==', teacherId)
      );
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsData = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Client-side sorting
      studentsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });
      setStudents(studentsData);
      
      console.log('Yüklenen öğrenciler:', studentsData);
      console.log('Öğretmen ID:', teacherId);
      studentsData.forEach(student => {
        console.log(`Öğrenci: ${student.firstName} ${student.lastName}`);
        console.log(`  - Firestore ID: ${student.id}`);
        console.log(`  - User ID: ${student.userId}`);
        console.log(`  - Email: ${student.email}`);
        console.log('---');
      });

      // Ödevleri getir
      const assignmentsQuery = query(
        collection(db, 'assignments'),
        where('teacherId', '==', teacherId)
      );
      const assignmentsSnapshot = await getDocs(assignmentsQuery);
      const assignmentsData = assignmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Client-side sorting
      assignmentsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });
      setAssignments(assignmentsData);

      // Duyuruları getir
      const announcementsQuery = query(
        collection(db, 'announcements'),
        where('teacherId', '==', teacherId)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      const announcementsData = announcementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Client-side sorting by date (newest first)
      announcementsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });
      setAnnouncements(announcementsData);

      // Son aktiviteleri getir
      const activitiesQuery = query(
        collection(db, 'activities'),
        where('teacherId', '==', teacherId)
      );
      const activitiesSnapshot = await getDocs(activitiesQuery);
      const activitiesData = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Client-side sorting and limit
      activitiesData.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime();
        }
        return 0;
      });
      setRecentActivities(activitiesData.slice(0, 5));

    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  // Öğrenci ekleme
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      // Şifre kontrolü
      if (!newStudent.password || newStudent.password.length < 6) {
        alert('Şifre en az 6 karakter olmalıdır.');
        return;
      }

      // Firebase Authentication ile öğrenci hesabı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newStudent.email,
        newStudent.password
      );

      // Kullanıcı verilerini Firestore'a kaydet
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        phone: newStudent.phone,
        userType: 'student',
        createdAt: new Date(),
        isActive: true
      });

      // Öğrenci özel verilerini kaydet
      const studentData = {
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        phone: newStudent.phone,
        grade: newStudent.grade,
        parentName: newStudent.parentName,
        parentPhone: newStudent.parentPhone,
        teacherId: user.uid,
        userId: userCredential.user.uid,
        createdAt: serverTimestamp(),
        attendance: 0,
        performance: 0,
        lastSeen: 'Hiç giriş yapmadı'
      };
      await setDoc(doc(db, 'students', userCredential.user.uid), studentData);

      // Aktivite kaydet
      await addDoc(collection(db, 'activities'), {
        teacherId: user.uid,
        type: 'student_added',
        message: `${newStudent.firstName} ${newStudent.lastName} öğrencisi eklendi`,
        timestamp: serverTimestamp()
      });

      setShowAddStudent(false);
      setNewStudent({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        grade: '',
        parentName: '',
        parentPhone: '',
        password: ''
      });

      // Verileri yeniden yükle
      await loadTeacherData(user.uid);

    } catch (error) {
      console.error('Öğrenci ekleme hatası:', error);
      alert('Öğrenci eklenirken hata oluştu: ' + error.message);
    }
  };

  // Ödev ekleme
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try {
      const assignmentData = {
        ...newAssignment,
        teacherId: user.uid,
        teacherName: `${teacherData?.firstName} ${teacherData?.lastName}`,
        createdAt: serverTimestamp(),
        status: 'active'
      };
      
      await addDoc(collection(db, 'assignments'), assignmentData);
      
      // Aktivite kaydet
      await addDoc(collection(db, 'activities'), {
        teacherId: user.uid,
        type: 'assignment_added',
        message: `"${newAssignment.title}" ödevi eklendi`,
        timestamp: serverTimestamp()
      });
      
      setShowAddAssignment(false);
      setNewAssignment({
        title: '',
        subject: '',
        description: '',
        dueDate: '',
        assignedStudents: []
      });
      
      // Verileri yeniden yükle
      await loadTeacherData(user.uid);
      
    } catch (error) {
      console.error('Ödev ekleme hatası:', error);
    }
  };

  const handleStudentSelection = (studentId) => {
    setNewAssignment(prev => ({
      ...prev,
      assignedStudents: prev.assignedStudents.includes(studentId)
        ? prev.assignedStudents.filter(id => id !== studentId)
        : [...prev.assignedStudents, studentId]
    }));
  };

  // Duyuru ekleme
  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const announcementData = {
        ...newAnnouncement,
        teacherId: user.uid,
        teacherName: `${teacherData?.firstName} ${teacherData?.lastName}`,
        createdAt: serverTimestamp(),
        isActive: true
      };
      
      await addDoc(collection(db, 'announcements'), announcementData);
      
      // Aktivite kaydet
      await addDoc(collection(db, 'activities'), {
        teacherId: user.uid,
        type: 'announcement_added',
        message: `"${newAnnouncement.title}" duyurusu eklendi`,
        timestamp: serverTimestamp()
      });
      
      setShowAddAnnouncement(false);
      setNewAnnouncement({
        title: '',
        content: '',
        priority: 'normal'
      });
      
      // Verileri yeniden yükle
      await loadTeacherData(user.uid);
      
    } catch (error) {
      console.error('Duyuru ekleme hatası:', error);
    }
  };

  // Silme fonksiyonu
  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm("Bu ödevi silmek istediğinize emin misiniz?")) {
      await deleteDoc(doc(db, 'assignments', assignmentId));
      await loadTeacherData(user.uid);
    }
  };

  // Düzenleme fonksiyonu
  const handleEditAssignment = (assignment) => {
    setEditAssignment(assignment);
    setShowEditAssignment(true);
  };

  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'assignments', editAssignment.id), {
      title: editAssignment.title,
      subject: editAssignment.subject,
      description: editAssignment.description,
      dueDate: editAssignment.dueDate,
    });
    setShowEditAssignment(false);
    await loadTeacherData(user.uid);
  };

  // İstatistikleri hesapla
  const stats = {
    totalStudents: students.length,
    totalAnnouncements: announcements.length,
    pendingAssignments: assignments.filter(a => a.status === 'active').length,
    averagePerformance: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + (s.performance || 0), 0) / students.length)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary-600">Yükleniyor...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Öğretmen Paneli</h1>
                <p className="text-sm text-gray-600">
                  Hoş geldin, {teacherData?.firstName} {teacherData?.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Öğrenci</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Duyuru</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAnnouncements}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Ödev</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Başarı</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averagePerformance}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Duyurular */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Duyurular</h2>
                <button 
                  onClick={() => setShowAddAnnouncement(true)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Duyuru</span>
                </button>
              </div>
              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Henüz duyuru eklenmemiş.
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div key={announcement.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            announcement.priority === 'high' ? 'bg-red-100' :
                            announcement.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}>
                            <Bell className={`w-4 h-4 ${
                              announcement.priority === 'high' ? 'text-red-600' :
                              announcement.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                            <p className="text-xs text-gray-500">
                              {announcement.createdAt?.toDate ? 
                                announcement.createdAt.toDate().toLocaleString('tr-TR') : 
                                'Yakın zamanda'
                              }
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                          announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {announcement.priority === 'high' ? 'Yüksek' :
                           announcement.priority === 'medium' ? 'Orta' : 'Normal'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{announcement.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Son Aktiviteler */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Son Aktiviteler</h2>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    Henüz aktivite yok.
                  </div>
                ) : (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'assignment_added' ? 'bg-blue-100' :
                        activity.type === 'student_added' ? 'bg-green-100' :
                        activity.type === 'announcement_added' ? 'bg-orange-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'assignment_added' && <FileText className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'student_added' && <User className="w-4 h-4 text-green-600" />}
                        {activity.type === 'announcement_added' && <Bell className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">
                          {activity.timestamp?.toDate ? 
                            activity.timestamp.toDate().toLocaleString('tr-TR') : 
                            'Yakın zamanda'
                          }
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Öğrenci Listesi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Öğrenci Listesi</h2>
              <button 
                onClick={() => setShowAddStudent(true)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Öğrenci</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Öğrenci
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sınıf
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İletişim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Devam Oranı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Başarı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Henüz öğrenci kaydı yapılmamış.
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.firstName} {student.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${student.attendance || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{student.attendance || 0}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${student.performance || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{student.performance || 0}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Ödevler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Ödevler</h2>
              <button 
                onClick={() => setShowAddAssignment(true)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Ödev</span>
              </button>
            </div>
            <div className="space-y-4">
              {assignments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Henüz ödev oluşturulmamış.
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {assignment.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.subject}</p>
                    <p className="text-xs text-gray-500">Son Tarih: {assignment.dueDate}</p>
                    {assignment.description && (
                      <p className="text-sm text-gray-700 mt-2">{assignment.description}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEditAssignment(assignment)} title="Düzenle">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteAssignment(assignment.id)} title="Sil">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Öğrenci Ekleme Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Yeni Öğrenci Ekle</h3>
              <button 
                onClick={() => setShowAddStudent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                  <input
                    type="text"
                    value={newStudent.firstName}
                    onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                  <input
                    type="text"
                    value={newStudent.lastName}
                    onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sınıf</label>
                <input
                  type="text"
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="10. Sınıf"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veli Adı</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veli Telefonu</label>
                  <input
                    type="tel"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                  type="password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="En az 6 karakter"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ödev Ekleme Modal */}
      {showAddAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Yeni Ödev Oluştur</h3>
              <button 
                onClick={() => setShowAddAssignment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ödev Başlığı</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ders</label>
                <input
                  type="text"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Son Tarih</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              {/* Öğrenci Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Öğrenci Seçimi</label>
                {students.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 border border-gray-200 rounded-md">
                    Henüz öğrenci kaydı yapılmamış.
                  </div>
                ) : (
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                    {students.map((student) => (
                      <label key={student.id} className="flex items-center space-x-3 py-2 hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAssignment.assignedStudents.includes(student.userId)}
                          onChange={() => handleStudentSelection(student.userId)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">({student.grade})</span>
                          <span className="text-xs text-gray-400 block">
                            User ID: {student.userId} (Bu ID kullanılıyor)
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Seçili öğrenci sayısı: {newAssignment.assignedStudents.length}
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAssignment(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={newAssignment.assignedStudents.length === 0}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Duyuru Ekleme Modal */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Yeni Duyuru Ekle</h3>
              <button 
                onClick={() => setShowAddAnnouncement(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru Başlığı</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Öncelik</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru İçeriği</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Duyuru detaylarını buraya yazın..."
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAnnouncement(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ödev Düzenleme Modal */}
      {showEditAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ödevi Düzenle</h3>
              <button onClick={() => setShowEditAssignment(false)} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Kapat</span>×
              </button>
            </div>
            <form onSubmit={handleUpdateAssignment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input type="text" value={editAssignment.title} onChange={e => setEditAssignment({ ...editAssignment, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ders</label>
                <input type="text" value={editAssignment.subject} onChange={e => setEditAssignment({ ...editAssignment, subject: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea value={editAssignment.description} onChange={e => setEditAssignment({ ...editAssignment, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Son Tarih</label>
                <input type="date" value={editAssignment.dueDate} onChange={e => setEditAssignment({ ...editAssignment, dueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowEditAssignment(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">İptal</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard; 