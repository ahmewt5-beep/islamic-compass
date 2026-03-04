import { veriGetir } from '../utils/veriMotoru';

// Sitemap içindeki sayfaların ne kadar sıklıkla değiştiğini belirleyen sabitler
const diller = ['tr', 'en', 'ar', 'id', 'ur', 'fr', 'ru'];
const kategoriler = [
  { slug: 'kuran', veri: 'kuran_proje_hazir' },
  { slug: 'hadisler', veri: 'hadisler_proje_hazir' },
  { slug: 'kissalar', veri: 'kissalar_proje_hazir' },
  { slug: 'dualar', veri: 'dualar_proje_hazir' },
  { slug: 'alimler', veri: 'alimler_proje_hazir' },
  { slug: 'terimler', veri: 'terimler_proje_hazir' },
  { slug: 'blog', veri: 'blog_proje_hazir' }
];

export async function GET() {
  let urls = [];
  const base = 'https://islamiccompass.org';

  // 1. Ana Sayfalar ve Dil Varyasyonları
  diller.forEach(lang => {
    const prefix = lang === 'tr' ? '' : `/${lang}`;
    urls.push(`${base}${prefix}/`);
    
    // Her dil için kategori ana sayfaları
    kategoriler.forEach(kat => {
      urls.push(`${base}${prefix}/${kat.slug}`);
    });

    // 2. Dinamik İçerik Sayfaları (Kuran, Hadis, Kıssa vb.)
    kategoriler.forEach(kat => {
      const data = veriGetir(kat.veri, lang);
      data.forEach(item => {
        if (item.seo_url) {
          urls.push(`${base}${prefix}/${kat.slug}/${item.seo_url}`);
        }
      });
    });
  });

  // XML Yapısını İnşa Ediyoruz
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}