import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const TestStudent = () => {
  const [email, setEmail] = useState('test@student.com');
  const [password, setPassword] = useState('123456');

  const createTestStudent = async () => {
    try {
      // Firebase Auth ile öğrenci hesabı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const studentId = userCredential.user.uid;

      // Users koleksiyonuna kaydet
      await setDoc(doc(db, 'users', studentId), {
        firstName: 'Test',
        lastName: 'Öğrenci',
        email: email,
        userType: 'student',
        createdAt: serverTimestamp()
      });

      // Students koleksiyonuna detayları kaydet
      await setDoc(doc(db, 'students', studentId), {
        firstName: 'Test',
        lastName: 'Öğrenci',
        email: email,
        phone: '555-1234',
        grade: '10. Sınıf',
        parentName: 'Test Veli',
        parentPhone: '555-5678',
        teacherId: 'test-teacher-id', // Gerçek öğretmen ID'si ile değiştirin
        createdAt: serverTimestamp(),
        attendance: 0,
        performance: 0,
        lastSeen: 'Hiç giriş yapmadı'
      });

      alert('Test öğrenci hesabı oluşturuldu! ID: ' + studentId);
    } catch (error) {
      console.error('Test öğrenci oluşturma hatası:', error);
      alert('Hata: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Test Öğrenci Hesabı Oluştur</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={createTestStudent}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Test Öğrenci Oluştur
        </button>
      </div>
    </div>
  );
};

export default TestStudent; 