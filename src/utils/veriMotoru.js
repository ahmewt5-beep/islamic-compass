// 🚀 VERCEL SSR İÇİN VİTE SÜPER GÜCÜ: Tüm JSON dosyalarını sunucunun belleğine (RAM) gömüyoruz.
// fs ve path modüllerini SİLDİK çünkü sunucusuz (Serverless) mimaride dosya okuma işlemi bu şekilde yapılmaz.
const butunVeriler = import.meta.glob('/src/data/*.json', { eager: true });

// 7 Dilli Kırılmaz Veri Okuma Zekası (Işık Hızında Önbellekli)
export function veriGetir(dosyaAdi, dil = 'tr') {
  // 1. Dil ekini belirliyoruz (Örn: "_en", "_ar" veya Türkçe için boş)
  const ek = dil === 'tr' ? '' : `_${dil}`;
  
  // 2. Aranacak dosyanın tam yolunu Vercel'in belleğinde bulacağı formata getiriyoruz
  const hedefDosyaYolu = `/src/data/${dosyaAdi}${ek}.json`;

  // 3. Dosya sunucu belleğinde (RAM) var mı diye bakıyoruz
  if (butunVeriler[hedefDosyaYolu]) {
    // Varsa, ışık hızında JSON verisini döndür (.default ile Vite modülünden güvenle çıkartıyoruz)
    return butunVeriler[hedefDosyaYolu].default || butunVeriler[hedefDosyaYolu];
  }

  // 4. B Planı: Dosya bulunamadıysa veya o dil henüz çevrilmediyse, Orijinal (Türkçe) dosyayı yedek olarak ver
  const orijinalDosyaYolu = `/src/data/${dosyaAdi}.json`;
  if (butunVeriler[orijinalDosyaYolu]) {
    return butunVeriler[orijinalDosyaYolu].default || butunVeriler[orijinalDosyaYolu];
  }

  // 5. En Kötü Senaryo: Veri hiçbir şekilde yoksa, sitenin çökmesini engellemek için boş dizi gönder
  return [];
}