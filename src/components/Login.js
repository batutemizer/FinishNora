import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('student'); // student, parent, teacher

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Firebase ile giriş yap
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      console.log('Giriş başarılı:', userCredential.user);
      
      // Kullanıcı türüne göre yönlendirme
      switch (userType) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
        default:
          navigate('/student-dashboard');
      }
      
    } catch (error) {
      console.error('Giriş hatası:', error);
      
      // Firebase Authentication henüz açılmamışsa simülasyon yap
      if (error.code === 'auth/configuration-not-found') {
        console.log('Firebase Authentication henüz açılmamış, simülasyon modunda çalışıyor...');
        setTimeout(() => {
          setIsSubmitting(false);
          // Kullanıcı türüne göre yönlendirme
          switch (userType) {
            case 'student':
              navigate('/student-dashboard');
              break;
            case 'teacher':
              navigate('/teacher-dashboard');
              break;
            default:
              navigate('/student-dashboard');
          }
        }, 1500);
        return;
      }
      
      setError(getErrorMessage(error.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
      case 'auth/wrong-password':
        return 'Hatalı şifre. Lütfen tekrar deneyin.';
      case 'auth/invalid-email':
        return 'Geçersiz e-posta adresi.';
      case 'auth/too-many-requests':
        return 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
      default:
        return 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };

  const userTypes = [
    { id: 'student', label: 'Öğrenci', icon: User },
    { id: 'teacher', label: 'Öğretmen', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Giriş Yap
          </div>

          <h2 className="text-3xl font-bold text-secondary-900 mb-6">
            <span className="text-gradient">Nora Akademi</span>'ye Hoş Geldiniz
          </h2>

          <p className="text-lg text-secondary-600">
            Hesabınıza giriş yaparak eğitim yolculuğunuza devam edin.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Hesap Türü
            </label>
            <div className="grid grid-cols-2 gap-3">
              {userTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setUserType(type.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === type.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 text-secondary-600 hover:border-primary-300'
                  }`}
                >
                  <type.icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center space-x-3"
            >
              <div className="w-5 h-5 text-red-600">⚠️</div>
              <span className="text-red-800 font-medium">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                  Beni hatırla
                </label>
              </div>
              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => alert('Şifre sıfırlama özelliği yakında eklenecek.')}
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                >
                  Şifremi unuttum
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Giriş Yap
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">veya</span>
              </div>
            </div>
          </div>


        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link 
            to="/" 
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            ← Ana sayfaya dön
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 