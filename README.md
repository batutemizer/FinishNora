# Nora Akademi Web Sitesi

Modern, profesyonel ve şık matematik eğitimi web sitesi. React, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Şık ve profesyonel görünüm
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Animasyonlar**: Framer Motion ile akıcı animasyonlar
- **Hızlı**: Optimize edilmiş performans
- **SEO Dostu**: Arama motorları için optimize edilmiş
- **Erişilebilir**: WCAG standartlarına uygun

## 📋 İçerik

- **Ana Sayfa**: Etkileyici hero section ve istatistikler
- **Hakkımızda**: Şirket bilgileri ve başarılar
- **Hizmetler**: Farklı eğitim seçenekleri ve fiyatlandırma
- **Öğretmenler**: Uzman öğretmen profilleri ve yorumlar
- **İletişim**: İletişim formu ve bilgileri

## 🛠️ Teknolojiler

- **React 18**: Modern React hooks ve functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animasyon kütüphanesi
- **Lucide React**: Modern icon set
- **React Router**: Sayfa yönlendirme

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd nora-akademi
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm start
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Navbar.js       # Navigasyon menüsü
│   ├── Hero.js         # Ana sayfa hero section
│   ├── About.js        # Hakkımızda bölümü
│   ├── Services.js     # Hizmetler bölümü
│   ├── Teachers.js     # Öğretmenler bölümü
│   ├── Contact.js      # İletişim bölümü
│   └── Footer.js       # Alt bilgi
├── App.js              # Ana uygulama bileşeni
├── index.js            # Uygulama giriş noktası
└── index.css           # Global stiller
```

## 🎨 Özelleştirme

### Renkler
Tailwind config dosyasında renk paletini özelleştirebilirsiniz:

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... diğer tonlar
  }
}
```

### İçerik
Her component dosyasında metinleri ve bilgileri güncelleyebilirsiniz.

### Öğretmen Bilgileri
`src/components/Teachers.js` dosyasında öğretmen profillerini düzenleyebilirsiniz.

## 📱 Responsive Tasarım

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Production Build

```bash
npm run build
```

Build dosyaları `build/` klasöründe oluşturulacaktır.

## 📞 İletişim

- **Telefon**: +90 555 123 45 67
- **E-posta**: info@noraakademi.com
- **Adres**: Kadıköy, İstanbul

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Changelog

### v1.0.0
- İlk sürüm
- Tüm temel özellikler eklendi
- Responsive tasarım
- Modern animasyonlar
- İletişim formu
- Öğretmen profilleri

---

**Nora Akademi** - Profesyonel matematik eğitimi için modern web sitesi. 