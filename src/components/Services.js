import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Monitor, 
  Target, 
  Clock, 
  Award,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Users,
      title: 'Birebir Özel Ders',
      description: 'Öğrencinin seviyesine uygun kişiselleştirilmiş birebir matematik dersleri',
      features: ['Kişisel öğrenme planı', 'Esnek program', 'Sürekli geri bildirim', 'İlerleme takibi'],
      price: '₺950',
      duration: '60 dk',
      popular: false
    },
    {
      icon: Users,
      title: 'Grup Dersleri',
      description: 'Küçük gruplarda etkileşimli matematik öğrenimi',
      features: ['Maksimum 6 öğrenci', 'Uygun fiyat', 'Akran öğrenmesi', 'Sosyal etkileşim'],
      price: '₺350(kişi başı)',
      duration: '60 dk',
      popular: true
    },
    {
      icon: Monitor,
      title: 'Online Dersler',
      description: 'Teknolojik araçlarla uzaktan matematik eğitimi',
      features: ['Canlı video ders', 'İnteraktif araçlar', 'Kayıt imkanı', '7/24 erişim'],
      price: '₺450',
      duration: '60 dk',
      popular: false
    },
    {
      icon: Target,
      title: 'Sınav Hazırlığı',
      description: 'LGS, YKS ve diğer sınavlara özel hazırlık programları',
      features: ['Sınav odaklı müfredat', 'Deneme sınavları', 'Strateji eğitimi', 'Motivasyon desteği'],
      price: '₺350',
      duration: '30 dk',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Uzman Öğretmenler',
      description: '10+ yıl deneyime sahip uzman matematik öğretmenleri'
    },
    {
      icon: Clock,
      title: 'Esnek Program',
      description: 'Öğrencinin programına uygun esnek ders saatleri'
    },
    {
      icon: CheckCircle,
      title: 'Garantili Başarı',
      description: 'Başarı garantisi ile öğrenci memnuniyeti odaklı eğitim'
    },
    {
      icon: Star,
      title: 'Modern Yöntemler',
      description: 'Güncel eğitim teknolojileri ve interaktif öğretim yöntemleri'
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-primary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Hizmetlerimiz
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
            Size Özel{' '}
            <span className="text-gradient">Matematik Eğitimi</span>
          </h2>

          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Her öğrencinin ihtiyacına uygun farklı eğitim seçenekleri sunuyoruz. 
            Birebir derslerden grup derslerine, online eğitimden sınav hazırlığına kadar 
            tüm matematik eğitim ihtiyaçlarınız için yanınızdayız.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`card relative ${service.popular ? 'ring-2 ring-primary-500' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    En Popüler
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-4">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                    <div className="text-sm text-secondary-600">/ {service.duration}</div>
                  </div>
                  <button 
                    className="btn-primary group"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Başla
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h3>
            <p className="text-lg text-secondary-600">
              Kaliteli eğitim ve öğrenci memnuniyeti odaklı yaklaşımımızla fark yaratıyoruz
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-secondary-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 