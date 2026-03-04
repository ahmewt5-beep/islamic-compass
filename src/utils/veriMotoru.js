import fs from 'fs';
import path from 'path';

// 7 Dilli Kırılmaz Veri Okuma Zekası
export function veriGetir(dosyaAdi, dil = 'tr') {
  // Eğer dil Türkçe ise ek yok, diğer dillerde "_en", "_ar" eki var.
  const ek = dil === 'tr' ? '' : `_${dil}`;
  const dosyaYolu = path.resolve(process.cwd(), `src/data/${dosyaAdi}${ek}.json`);

  // Güvenlik Kalkanı: Eğer bot bu dili henüz çevirmediyse veya dosya yoksa, çökme!
  if (fs.existsSync(dosyaYolu)) {
    return JSON.parse(fs.readFileSync(dosyaYolu, 'utf-8'));
  }

  // Dosya bulunamadıysa anında orijinal (Türkçe) dosyayı yedek olarak ver
  const orijinalYol = path.resolve(process.cwd(), `src/data/${dosyaAdi}_proje_hazir.json`);
  if (fs.existsSync(orijinalYol)) {
    return JSON.parse(fs.readFileSync(orijinalYol, 'utf-8'));
  }

  // En kötü senaryoda boş dizi döndür, site yine de ayakta kalsın
  return [];
}