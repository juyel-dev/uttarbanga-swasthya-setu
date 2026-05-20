// Convert /src/assets/**/*.{png,jpg} → .webp. Requires `sharp`.
// Usage: npm i -D sharp && node scripts/optimize-images.js
import fs from 'node:fs'; import path from 'node:path';
try {
  const sharp = (await import('sharp')).default;
  async function walk(dir){
    for (const e of fs.readdirSync(dir,{withFileTypes:true})){
      const p = path.join(dir,e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(png|jpe?g)$/i.test(e.name)){
        const out = p.replace(/\.(png|jpe?g)$/i, '.webp');
        await sharp(p).webp({quality:80}).toFile(out);
        console.log('→', out);
      }
    }
  }
  await walk('src/assets');
} catch(e){ console.warn('sharp not installed:', e.message); }
