import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://islamiccompass.org', 
  
  // ÇOKLU DİL (i18n) ZEKASI EKLENDİ
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar', 'id', 'ur', 'fr', 'ru'],
    routing: {
      prefixDefaultLocale: false, 
      redirectToDefaultLocale: true // Yanlış girenleri Türkçeye yönlendir
    }
  },

  integrations: [tailwind(), sitemap()],
});