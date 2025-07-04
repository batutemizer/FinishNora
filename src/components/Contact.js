import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Clock, 
  Send, 
  MessageCircle,
  CheckCircle
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // reCAPTCHA kontrolü
    if (!captchaValue) {
      alert('Lütfen "Ben robot değilim" kutusunu işaretleyin.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Formspree endpoint
      const formEndpoint = 'https://formspree.io/f/mgvyqdzo';
      
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Belirtilmemiş',
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          'g-recaptcha-response': captchaValue
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setCaptchaValue(null);
        
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form gönderimi başarısız:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      details: ['noracademy1@gmail.com'],
      action: 'E-posta Gönder'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      details: ['Pazartesi - Cuma: 09:00 - 21:00', 'Cumartesi: 09:00 - 18:00'],
      action: 'Randevu Al'
    }
  ];

  const subjects = [
    'Birebir Özel Ders',
    'Grup Dersleri',
    'Online Dersler',
    'Sınav Hazırlığı',
    'Danışmanlık',
    'Diğer'
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-primary">
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
            <MessageCircle className="w-4 h-4 mr-2" />
            İletişim
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
            Bizimle{' '}
            <span className="text-gradient">İletişime Geçin</span>
          </h2>

          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Matematik eğitimi hakkında sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız. 
            Aşağıdaki formu doldurun veya doğrudan bizimle iletişime geçin.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Mesaj Gönderin
            </h3>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center space-x-3"
              >
                <div className="w-5 h-5 text-red-600">⚠️</div>
                <span className="text-red-800 font-medium">
                  Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="+90 555 123 45 67"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Konu seçiniz</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LckGXcrAAAAAM1qZxxtswuGwyVKUz_sMgNUEukm"
                  onChange={(value) => setCaptchaValue(value)}
                  theme="light"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Gönderiliyor...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Mesaj Gönder
                  </div>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                İletişim Bilgileri
              </h3>
              <p className="text-secondary-600 mb-8">
                Size en uygun yöntemle bizimle iletişime geçebilirsiniz. 
                Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                        {info.title}
                      </h4>
                      <div className="space-y-1 mb-4">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-secondary-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                                             <button 
                         className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                         onClick={() => {
                           if (info.title === 'E-posta') {
                             window.open(`mailto:${info.details[0]}`, '_blank');
                           } else if (info.title === 'Çalışma Saatleri') {
                             const contactSection = document.getElementById('contact');
                             if (contactSection) {
                               contactSection.scrollIntoView({ behavior: 'smooth' });
                             }
                           }
                         }}
                       >
                         {info.action} →
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white"
            >
                             <h4 className="text-xl font-bold mb-4">
                 Hızlı İletişim
               </h4>
               <p className="text-primary-100 mb-6">
                 WhatsApp üzerinden mesaj gönderebilir veya e-posta ile iletişime geçebilirsiniz.
               </p>
                             <div className="flex flex-col sm:flex-row gap-3">
                 <button 
                   className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                   onClick={() => {
                     const phoneNumber = '905522641898'; // WhatsApp numarası
                     const message = 'Merhaba! Nora Akademi hakkında bilgi almak istiyorum.';
                     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                     window.open(whatsappUrl, '_blank');
                   }}
                 >
                   WhatsApp
                 </button>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 