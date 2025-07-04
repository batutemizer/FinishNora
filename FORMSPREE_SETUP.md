# 📧 Formspree Kurulum Rehberi

## 🚀 Adım 1: Formspree Hesabı Oluşturma

1. [Formspree.io](https://formspree.io/) adresine gidin
2. **"Get Started"** butonuna tıklayın
3. E-posta: `noracademy1@gmail.com`
4. Şifre oluşturun
5. E-posta adresinizi doğrulayın

## 🔧 Adım 2: Form Oluşturma

1. Dashboard'da **"New Form"** butonuna tıklayın
2. Form adı: **"Nora Akademi Contact"**
3. **"Create Form"** butonuna tıklayın
4. **Form endpoint**'ini kopyalayın (örn: `https://formspree.io/f/xayz1234`)

## ⚙️ Adım 3: Kod Güncelleme

### `src/components/Contact.js` dosyasında (Satır 25):
```javascript
const formEndpoint = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
```

**YOUR_FORM_ID_HERE** yerine Formspree'den aldığınız endpoint'i yazın.

**Örnek:**
```javascript
const formEndpoint = 'https://formspree.io/f/xayz1234';
```

## ✅ Adım 4: Test Etme

1. `npm start` ile uygulamayı başlatın
2. İletişim formunu doldurun
3. Gönder butonuna tıklayın
4. `noracademy1@gmail.com` adresine e-posta geldiğini kontrol edin

## 📊 Ücretsiz Plan Özellikleri

- Aylık 50 form gönderimi
- Spam koruması
- E-posta bildirimleri
- Basit dashboard

## 🔒 Güvenlik

- Formspree güvenli HTTPS kullanır
- Spam koruması otomatik olarak aktif
- Veriler şifrelenmiş olarak iletilir

## 🆘 Sorun Giderme

**E-posta gelmiyor:**
- Form endpoint'ini kontrol edin
- Spam klasörünü kontrol edin
- Console'da hata mesajlarını kontrol edin

**Form gönderilmiyor:**
- Network bağlantısını kontrol edin
- Form alanlarının doğru doldurulduğundan emin olun

## 📱 Mobil Uyumluluk

Formspree tüm cihazlarda çalışır:
- Desktop
- Tablet
- Mobil telefon

## 🎯 Avantajlar

✅ **Basit kurulum** - 5 dakikada hazır  
✅ **Güvenilir** - Spam koruması  
✅ **Ücretsiz** - 50 form/ay  
✅ **Mobil uyumlu** - Tüm cihazlar  
✅ **Anlık bildirim** - E-posta hemen gelir 