import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Users, Award, BookOpen, Heart, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Hedef Odaklı Eğitim',
      description: 'Her öğrencinin hedeflerine uygun kişiselleştirilmiş eğitim programları'
    },
    {
      icon: Users,
      title: 'Deneyimli Öğretmenler',
      description: '8+ yıl deneyime sahip uzman matematik öğretmenleri'
    },
    {
      icon: BookOpen,
      title: 'Modern Müfredat',
      description: 'Güncel eğitim programları ve teknolojik destekli öğretim yöntemleri'
    },
    {
      icon: Heart,
      title: 'Öğrenci Odaklı',
      description: 'Her öğrencinin öğrenme stilini dikkate alan yaklaşım'
    }
  ];

  const achievements = [
    { number: '50+', label: 'Başarılı Öğrenci' },
    { number: '8+', label: 'Yıl Deneyim' },
    { number: '98%', label: 'Başarı Oranı' },
    { number: '1000+', label: 'Tamamlanan Ders' }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Hakkımızda
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
              Matematik Öğretiminde{' '}
              <span className="text-gradient">Uzmanlık</span>
            </h2>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              8 yıllık deneyimimizle, matematik öğretiminde güvenilir eğitim kurumlarından 
              biriyiz. Modern eğitim yöntemleri ve teknolojik destekle öğrencilerimizin 
              matematik korkusunu yenmelerine yardımcı oluyoruz.
            </p>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              Her öğrencinin farklı öğrenme stili olduğuna inanıyor ve buna göre 
              kişiselleştirilmiş eğitim programları hazırlıyoruz. Amacımız sadece 
              matematik öğretmek değil, matematiği sevdirmek.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
                         {/* Main Content Card */}
             <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-300 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                   Uzman Öğretmenlerimiz
                 </h3>
                 
                 {/* Teachers Photos */}
                 <div className="flex justify-center space-x-4 mb-6">
                   <div className="text-center">
                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-2">
                                                <img 
                           src="/images/ayse-buz.jpg" 
                           alt="Ayşe BUZ"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           e.target.style.display = 'none';
                           e.target.nextSibling.style.display = 'flex';
                         }}
                       />
                       <div className="w-full h-full bg-primary-200 flex items-center justify-center text-3xl" style={{display: 'none'}}>
                         👩‍🏫
                       </div>
                     </div>
                     <p className="text-sm font-medium text-secondary-700">Ayşe BUZ</p>
                     <p className="text-xs text-secondary-500">4 Yıl Deneyim</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-2">
                                                <img 
                           src="/images/ecem-cam.jpg" 
                           alt="Ecem ÇAM"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           e.target.style.display = 'none';
                           e.target.nextSibling.style.display = 'flex';
                         }}
                       />
                       <div className="w-full h-full bg-primary-200 flex items-center justify-center text-3xl" style={{display: 'none'}}>
                         👨‍🏫
                       </div>
                     </div>
                     <p className="text-sm font-medium text-secondary-700">Ecem ÇAM</p>
                     <p className="text-xs text-secondary-500">4 Yıl Deneyim</p>
                   </div>
                 </div>

                 <h3 className="text-xl font-bold text-secondary-900 mb-6">
                   Neden Bizi Seçmelisiniz?
                 </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Kişiselleştirilmiş Eğitim
                      </h4>
                      <p className="text-secondary-600">
                        Her öğrencinin seviyesine ve öğrenme hızına uygun programlar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Modern Teknoloji
                      </h4>
                      <p className="text-secondary-600">
                        İnteraktif araçlar ve dijital platformlarla destekli eğitim
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Sürekli Destek
                      </h4>
                      <p className="text-secondary-600">
                        Ders dışında da öğrencilerimize destek sağlıyoruz
                      </p>
                    </div>
                  </div>
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-primary-200">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-primary-600">
                        {achievement.number}
                      </div>
                      <div className="text-sm text-secondary-600">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-secondary-700">Online Ders</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-secondary-700">4.9/5 Puan</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 