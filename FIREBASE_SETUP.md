# 🔥 Firebase Kurulum Rehberi

## 🚀 Adım 1: Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. **"Create a project"** butonuna tıklayın
4. Proje adı: **"nora-akademi"**
5. **"Continue"** butonuna tıklayın
6. Google Analytics'i açın (önerilen)
7. **"Create project"** butonuna tıklayın

## 🔧 Adım 2: Web Uygulaması Ekleme

1. Proje oluşturulduktan sonra **"Web"** ikonuna tıklayın
2. Uygulama takma adı: **"nora-akademi-web"**
3. **"Register app"** butonuna tıklayın
4. **Firebase konfigürasyonu** görünecek

## 📋 Adım 3: Konfigürasyon Değerlerini Kopyalama

Firebase size şuna benzer bir konfigürasyon verecek:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "nora-akademi.firebaseapp.com",
  projectId: "nora-akademi",
  storageBucket: "nora-akademi.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

Bu değerleri kopyalayın.

## ⚙️ Adım 4: Kod Güncelleme

### `src/firebase.js` dosyasında:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // Kopyaladığınız apiKey
  authDomain: "YOUR_AUTH_DOMAIN",   // Kopyaladığınız authDomain
  projectId: "YOUR_PROJECT_ID",     // Kopyaladığınız projectId
  storageBucket: "YOUR_STORAGE_BUCKET", // Kopyaladığınız storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Kopyaladığınız messagingSenderId
  appId: "YOUR_APP_ID"              // Kopyaladığınız appId
};
```

## 🔐 Adım 5: Authentication Açma

1. Firebase Console'da **"Authentication"** sekmesine gidin
2. **"Get started"** butonuna tıklayın
3. **"Sign-in method"** sekmesine gidin
4. **"Email/Password"** sağlayıcısını etkinleştirin
5. **"Enable"** butonuna tıklayın

## 📊 Adım 6: Firestore Database Oluşturma

1. **"Firestore Database"** sekmesine gidin
2. **"Create database"** butonuna tıklayın
3. **"Start in test mode"** seçin (geliştirme için)
4. **"Next"** butonuna tıklayın
5. Lokasyon seçin (örn: **"europe-west3"**)
6. **"Done"** butonuna tıklayın

## 🎯 Adım 7: Güvenlik Kuralları

Firestore Rules'da şu kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Öğrenci verileri
    match /students/{studentId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == studentId || 
         resource.data.parentId == request.auth.uid ||
         request.auth.token.role == 'teacher');
    }
    
    // Öğretmen verileri
    match /teachers/{teacherId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == teacherId || 
         request.auth.token.role == 'admin');
    }
  }
}
```

## ✅ Adım 8: Test Etme

1. Konfigürasyonu güncelledikten sonra
2. `npm start` ile uygulamayı başlatın
3. Kayıt formunu doldurun
4. Firebase Console'da **"Authentication"** sekmesinde kullanıcıyı görün
5. **"Firestore Database"** sekmesinde verileri görün

## 📊 Firebase Ücretsiz Plan

- **Authentication**: 10,000 kullanıcı/ay
- **Firestore**: 1GB depolama, 50,000 okuma/ay
- **Hosting**: 10GB depolama, 360MB/ay transfer
- **Functions**: 125,000 çağrı/ay

## 🆘 Sorun Giderme

**Firebase bağlantı hatası:**
- Konfigürasyon değerlerini kontrol edin
- API Key'in doğru olduğundan emin olun
- Domain kısıtlamalarını kontrol edin

**Authentication hatası:**
- Email/Password sağlayıcısının açık olduğundan emin olun
- Firestore kurallarını kontrol edin

## 🎯 Sonraki Adımlar

Firebase kurulumu tamamlandıktan sonra:
1. Login/Register fonksiyonlarını Firebase ile bağlayın
2. Kullanıcı panellerini oluşturun
3. Veri yapısını tasarlayın
4. Güvenlik kurallarını ayarlayın 