import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    hizmetler: [
      'Birebir Özel Ders',
      'Grup Dersleri',
      'Online Dersler',
      'Sınav Hazırlığı',
      'Danışmanlık'
    ],
    kurumsal: [
      'Hakkımızda',
      'Öğretmenlerimiz',
      'Başarılarımız',
      'Referanslar',
      'Kariyer'
    ],
    destek: [
      'SSS',
      'İletişim',
      'Randevu Al',
      'Ücretsiz Danışmanlık',
      'Gizlilik Politikası'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nora Akademi</h3>
                <p className="text-secondary-400 text-sm">Profesyonel Matematik Eğitimi</p>
              </div>
            </div>

            <p className="text-secondary-400 mb-6 leading-relaxed">
              8 yıllık deneyimimizle matematik öğretiminde güvenilir eğitim kurumlarından 
              biriyiz. Modern eğitim yöntemleri ve teknolojik destekle öğrencilerimizin 
              başarısına katkı sağlıyoruz.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-secondary-300">noracademy1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-secondary-300">Elazığ,Gaziantep</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-semibold mb-6 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                                 {links.map((link, linkIndex) => (
                   <li key={linkIndex}>
                     <button
                       className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm text-left"
                     >
                       {link}
                     </button>
                   </li>
                 ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-secondary-800 mt-12 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-secondary-400 text-sm">Bizi takip edin:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-4">
              <span className="text-secondary-400 text-sm">E-bültenimize katılın:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-secondary-400 text-sm"
                />
                                 <button 
                   className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors duration-200 text-sm font-medium"
                   onClick={() => {
                     const email = document.querySelector('input[type="email"]').value;
                     if (email && email.includes('@')) {
                       alert('E-bültenimize başarıyla kaydoldunuz!');
                       document.querySelector('input[type="email"]').value = '';
                     } else {
                       alert('Lütfen geçerli bir e-posta adresi girin.');
                     }
                   }}
                 >
                   Katıl
                 </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-secondary-400 text-sm">
              © 2024 Nora Akademi. Tüm hakları saklıdır.
            </div>
            
                         <div className="flex items-center space-x-6 text-sm">
               <button className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                 Gizlilik Politikası
               </button>
               <button className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                 Kullanım Şartları
               </button>
               <button className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                 KVKK
               </button>
             </div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              aria-label="Yukarı çık"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
               <button 
         className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
         onClick={() => {
           const phoneNumber = '905522641898';
           const message = 'Merhaba! Nora Akademi hakkında bilgi almak istiyorum.';
           const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
           window.open(whatsappUrl, '_blank');
         }}
       >
         <div className="text-white text-2xl">💬</div>
         <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
       </button>
      </motion.div>
    </footer>
  );
};

export default Footer; 