import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, BookOpen } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: Users, number: '50+', label: 'Öğrenci' },
    { icon: Award, number: '15+', label: 'Yıl Deneyim' },
    { icon: Star, number: '98%', label: 'Başarı Oranı' },
    { icon: BookOpen, number: '1000+', label: 'Ders Saati' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2 fill-current" />
              Nora Akademi - Kaliteli Matematik Eğitimi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight"
            >
              Matematik Artık{' '}
              <span className="text-gradient">Kolay!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg lg:text-xl text-secondary-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Deneyimli öğretmenlerimizle matematik korkunuzu yenin. 
              Modern eğitim yöntemleriyle başarıya ulaşın.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button 
                className="btn-primary group"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ücretsiz Deneme Dersi
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button 
                className="btn-secondary group"
                onClick={() => {
                  // YouTube video linki veya modal açma
                  alert('Tanıtım videosu yakında eklenecek!');
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Tanıtım Videosu
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-secondary-900">{stat.number}</div>
                  <div className="text-sm text-secondary-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Teachers Showcase */}
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-8 lg:p-12 shadow-2xl">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-6">Uzman Öğretmenlerimiz</h3>
                  
                  {/* Teachers Photos */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                                 <img 
                           src="/images/ayse-buz.jpg" 
                           alt="Ayşe BUZ"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-white/20 flex items-center justify-center text-2xl" style={{display: 'none'}}>
                          👩‍🏫
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                                 <img 
                           src="/images/ecem-cam.jpg" 
                           alt="Ecem ÇAM"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-white/20 flex items-center justify-center text-2xl" style={{display: 'none'}}>
                          👨‍🏫
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                  
                  <p className="text-primary-100 mb-6">
                    Deneyimli öğretmenlerimizle matematik öğrenmek artık çok kolay!
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                                         <div className="text-center">
                       <div className="text-2xl font-bold">8+</div>
                       <div className="text-sm text-primary-100">Yıl Toplam Deneyim</div>
                     </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm text-primary-100">Başarılı Öğrenci</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white rounded-lg p-3 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-secondary-700">Canlı Ders</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-secondary-700">5.0 Puan</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-secondary-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-secondary-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 