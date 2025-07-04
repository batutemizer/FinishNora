import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  User,
  LogOut,
  Bell,
  GraduationCap,
  Target,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { 
  doc, 
  getDoc,
  collection, 
  getDocs, 
  query,
  where
} from 'firebase/firestore';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  
  // Gerçek veriler
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  
  const loadStudentData = useCallback(async (studentId) => {
    try {
      console.log('Öğrenci verileri yükleniyor... Student ID:', studentId);
      
      // Ödevleri getir
      const assignmentsQuery = query(
        collection(db, 'assignments'),
        where('assignedStudents', 'array-contains', studentId)
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
      
      console.log('Yüklenen ödevler:', assignmentsData);
      console.log('Öğrenci ID:', studentId);
      assignmentsData.forEach(assignment => {
        console.log(`Ödev: ${assignment.title}`);
        console.log(`  - Assigned Students: ${assignment.assignedStudents}`);
        console.log(`  - Student ID in array: ${assignment.assignedStudents.includes(studentId)}`);
        console.log('---');
      });

      // Duyuruları getir (öğretmenin tüm aktif duyuruları)
      const announcementsQuery = query(
        collection(db, 'announcements'),
        where('isActive', '==', true)
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
        where('studentId', '==', studentId)
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
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.userType === 'student') {
              const studentDoc = await getDoc(doc(db, 'students', user.uid));
              if (studentDoc.exists()) {
                setStudentData({ ...userData, ...studentDoc.data() });
              } else {
                setStudentData(userData);
              }
              // Öğrenci verilerini yükle
              await loadStudentData(user.uid);
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
  }, [navigate, loadStudentData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  // İstatistikleri hesapla
  const stats = {
    totalAssignments: assignments.length,
    completedAssignments: assignments.filter(a => a.status === 'completed').length,
    pendingAssignments: assignments.filter(a => a.status === 'active').length,
    performance: studentData?.performance || 0
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
                <h1 className="text-xl font-bold text-gray-900">Öğrenci Paneli</h1>
                <p className="text-sm text-gray-600">
                  Hoş geldin, {studentData?.firstName} {studentData?.lastName}
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
                <p className="text-sm font-medium text-gray-600">Toplam Ödev</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAssignments}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
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
                <p className="text-sm font-medium text-gray-600">Başarı Oranı</p>
                <p className="text-2xl font-bold text-gray-900">{stats.performance}%</p>
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
                <div className="flex items-center space-x-2 text-gray-500">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Öğretmen Duyuruları</span>
                </div>
              </div>
              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Henüz duyuru yok.
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
                              {announcement.teacherName} • {
                                announcement.createdAt?.toDate ? 
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
                        activity.type === 'assignment_completed' ? 'bg-green-100' :
                        activity.type === 'assignment_started' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'assignment_completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'assignment_started' && <FileText className="w-4 h-4 text-blue-600" />}
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

        {/* Ödevler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Ödevlerim</h2>
              <div className="flex items-center space-x-2 text-gray-500">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Atanan Ödevler</span>
              </div>
            </div>
            <div className="space-y-4">
              {assignments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Henüz ödev atanmamış.
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {assignment.status === 'completed' ? 'Tamamlandı' :
                         assignment.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.subject}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Son Tarih: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{assignment.teacherName}</span>
                      </div>
                    </div>
                    {assignment.description && (
                      <p className="text-sm text-gray-700 mt-2">{assignment.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard; 
