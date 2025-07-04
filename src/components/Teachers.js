import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  Mail,
  Quote
} from 'lucide-react';

const Teachers = () => {
  const teachers = [
    {
      name: 'Ayşe BUZ',
      title: 'Matematik Öğretmeni',
      experience: '4 yıl',
      expertise: ['LGS Hazırlık', 'YKS Matematik', 'İlkokul Matematik', 'Ortaokul Matematik'],
      education: 'Matematik Öğretmenliği - Fırat Üniversitesi',
      description: '4 yıllık deneyimiyle öğrencilerin matematik korkusunu yenmelerine yardımcı olan uzman öğretmen. Modern eğitim yöntemleri ve sabırlı yaklaşımıyla tanınır.',
      rating: 4.9,
      students: 50,
      image: '/images/ayse-buz.jpg',
      contact: {
        email: 'noracademy1@gmail.com'
      }
    },
    {
      name: 'Ecem ÇAM',
      title: 'Matematik Öğretmeni',
      experience: '4 yıl',
      expertise: ['LGS Hazırlık', 'YKS Matematik', 'İlkokul Matematik', 'Ortaokul Matematik'],
      education: 'Matematik Öğretmenliği - Fırat Üniversitesi',
      description: '4 yıllık deneyimiyle özellikle sınav hazırlığı konusunda uzmanlaşmış öğretmen. Öğrencilerinin %95\'inin hedeflerine ulaşmasını sağlamıştır.',
      rating: 4.9,
      students: 51,
      image: '/images/ecem-cam.jpg',
      contact: {
        email: 'noracademy1@gmail.com'
      }
    }
  ];

  const testimonials = [
    {
      name: 'Elif Kaya',
      grade: '12. Sınıf Öğrencisi',
      content: 'Ayşe öğretmenim sayesinde matematik korkumu yendim. YKS\'de matematikten 35 net yaptım!',
      rating: 5,
      teacher: 'Ayşe BUZ'
    },
    {
      name: 'Ahmet Özkan',
      grade: '8. Sınıf Öğrencisi',
      content: 'Ecem öğretmenim çok sabırlı ve anlayışlı. LGS\'de matematikten full çektim!',
      rating: 5,
      teacher: 'Ecem ÇAM'
    },
    {
      name: 'Zeynep Arslan',
      grade: 'Veli',
      content: 'Kızımın matematik notları inanılmaz yükseldi. Öğretmenlerimiz gerçekten çok başarılı.',
      rating: 5,
      teacher: 'Ayşe BUZ'
    }
  ];

  const achievements = [
    { number: '50+', label: 'Başarılı Öğrenci' },
    { number: '8+', label: 'Yıl Toplam Deneyim' },
    { number: '96%', label: 'Başarı Oranı' },
    { number: '2000+', label: 'Tamamlanan Ders' }
  ];

  return (
    <section id="teachers" className="section-padding bg-white">
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
            <Users className="w-4 h-4 mr-2" />
            Öğretmenlerimiz
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
            Uzman{' '}
            <span className="text-gradient">Matematik Öğretmenleri</span>
          </h2>

          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Deneyimli ve uzman öğretmenlerimizle matematik öğrenmek artık çok kolay. 
            Her öğretmenimiz kendi alanında uzmanlaşmış ve öğrenci başarısı odaklı çalışmaktadır.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card group hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Teacher Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img 
                      src={teacher.image} 
                      alt={`${teacher.name} - ${teacher.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-6xl" style={{display: 'none'}}>
                      {teacher.name.includes('Ayşe') ? '👩‍🏫' : '👨‍🏫'}
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary-900 mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-primary-600 font-medium">{teacher.title}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-secondary-900">{teacher.rating}</span>
                    </div>
                  </div>

                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {teacher.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-secondary-700">
                        <strong>Deneyim:</strong> {teacher.experience}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-secondary-700">
                        <strong>Eğitim:</strong> {teacher.education}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-secondary-700">
                        <strong>Öğrenci:</strong> {teacher.students}+
                      </span>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-900 mb-3">Uzmanlık Alanları:</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-secondary-600">
                      <Mail className="w-4 h-4" />
                      <span>{teacher.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Başarılarımız
            </h3>
            <p className="text-primary-100 text-lg">
              Yılların deneyimi ve öğrenci odaklı yaklaşımımızla elde ettiğimiz sonuçlar
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-primary-100">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
              Öğrenci ve Veli Yorumları
            </h3>
            <p className="text-lg text-secondary-600">
              Başarılarımızın en büyük kanıtı öğrencilerimizin ve velilerimizin yorumları
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary-600 mr-3" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-secondary-700 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-secondary-200 pt-4">
                  <div className="font-semibold text-secondary-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {testimonial.grade}
                  </div>
                  <div className="text-sm text-primary-600 font-medium mt-1">
                    {testimonial.teacher}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Teachers; 