/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // İŞTE BU SATIR SİHRİ YAPACAK
  theme: {
    extend: {
      colors: {
        zemin: '#0B1120',       
        kart: '#111827',        
        altin: '#D4AF37',       
        metin: '#F3F4F6',       
        metinMuted: '#94A3B8',  
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'], 
        serif: ['Georgia', 'Cambria', 'serif'],             
        arabic: ['Amiri', 'Scheherazade New', 'serif'],     
      }
    },
  },
  plugins: [],
}