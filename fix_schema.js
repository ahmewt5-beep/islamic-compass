import fs from 'fs';
import { globSync } from 'glob';

const files = globSync('src/pages/**/\\[seo_url\\].astro', { ignore: ['node_modules/**'] });
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    if (c.includes('"@type": "Article"')) {
        fs.writeFileSync(f, c.replace(/"@type": "Article"/g, `"@type": "Article",
  "image": "https://islamiccompass.org/og-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Islamic Compass"
  },
  "datePublished": "2024-01-01T00:00:00Z",
  "publisher": {
    "@type": "Organization",
    "name": "Islamic Compass",
    "logo": {
      "@type": "ImageObject",
      "url": "https://islamiccompass.org/favicon.svg"
    }
  }`));
        console.log('Updated schema in: ' + f);
    }
});
