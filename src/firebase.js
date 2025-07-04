import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyBqXFk3ACZZSLbHcuDQT6kOGYERGskU5pE",
  authDomain: "nora23-4a427.firebaseapp.com",
  projectId: "nora23-4a427",
  storageBucket: "nora23-4a427.firebasestorage.app",
  messagingSenderId: "1024698210314",
  appId: "1:1024698210314:web:bbc03f2266dc751b87a7f3",
  measurementId: "G-PGBZ62ZEYQ"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth, Firestore ve Analytics servislerini export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 