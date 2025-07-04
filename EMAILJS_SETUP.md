# 📧 EmailJS Kurulum Rehberi

## 🚀 Adım 1: EmailJS Hesabı Oluşturma

1. [EmailJS.com](https://www.emailjs.com/) adresine gidin
2. "Sign Up" ile ücretsiz hesap oluşturun
3. E-posta adresinizi doğrulayın

## 🔧 Adım 2: E-posta Servisi Ekleme

1. Dashboard'da "Email Services" sekmesine gidin
2. "Add New Service" butonuna tıklayın
3. "Gmail" seçin
4. Gmail hesabınızla bağlantı kurun
5. **Service ID**'yi not alın (örn: `service_abc123`)

## 📝 Adım 3: E-posta Template Oluşturma

1. "Email Templates" sekmesine gidin
2. "Create New Template" butonuna tıklayın
3. Template adı: "Contact Form"
4. Aşağıdaki template'i kullanın:

```html
<h2>Yeni İletişim Formu Mesajı</h2>

<p><strong>Gönderen:</strong> {{from_name}}</p>
<p><strong>E-posta:</strong> {{from_email}}</p>
<p><strong>Telefon:</strong> {{from_phone}}</p>
<p><strong>Konu:</strong> {{subject}}</p>

<h3>Mesaj:</h3>
<p>{{message}}</p>

<hr>
<p><em>Bu mesaj Nora Akademi web sitesinden gönderilmiştir.</em></p>
```

5. **Template ID**'yi not alın (örn: `template_xyz789`)

## 🔑 Adım 4: User ID Alma

1. Dashboard'da "Account" sekmesine gidin
2. "API Keys" bölümünde **Public Key**'i kopyalayın
3. Bu değer `user_id` olarak kullanılacak

## ⚙️ Adım 5: Kod Güncelleme

Aşağıdaki dosyalarda placeholder değerleri gerçek değerlerle değiştirin:

### `src/App.js` (Satır 18):
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

### `src/components/Contact.js` (Satır 35-39):
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',    // service_abc123
  'YOUR_TEMPLATE_ID_HERE',   // template_xyz789
  templateParams,
  'YOUR_PUBLIC_KEY_HERE'     // user_id
);
```

## ✅ Adım 6: Test Etme

1. `npm start` ile uygulamayı başlatın
2. İletişim formunu doldurun
3. Gönder butonuna tıklayın
4. `noracademy1@gmail.com` adresine e-posta geldiğini kontrol edin

## 🔒 Güvenlik Notları

- Public Key client-side'da güvenlidir
- Gmail hesabınızda "Less secure app access" açık olmalı
- Veya Gmail App Password kullanabilirsiniz

## 📊 Ücretsiz Plan Limitleri

- Aylık 200 e-posta
- Gmail servisi
- Temel template desteği

## 🆘 Sorun Giderme

**E-posta gelmiyor:**
- Service ID, Template ID ve Public Key'i kontrol edin
- Gmail hesabı ayarlarını kontrol edin
- Console'da hata mesajlarını kontrol edin

**Template hatası:**
- Template'deki değişken isimlerinin kodla eşleştiğinden emin olun
- Template'i kaydettiğinizden emin olun 