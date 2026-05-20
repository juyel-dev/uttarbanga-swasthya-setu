// Run: node scripts/generate-sitemap.js
import fs from 'node:fs';
const BASE = process.env.BASE_URL || 'https://uttarbanga-swasthya.app';
const docs = JSON.parse(fs.readFileSync('./data/doctors.json','utf8'));
const hosps = JSON.parse(fs.readFileSync('./data/hospitals.json','utf8'));
const symps = JSON.parse(fs.readFileSync('./data/symptoms.json','utf8'));
const urls = ['/','/doctors','/hospitals','/symptoms','/about','/support','/privacy'];
docs.forEach(d=>urls.push('/doctor/'+d.slug));
hosps.forEach(h=>urls.push('/hospital/'+h.slug));
symps.forEach(s=>urls.push('/symptoms/'+s.slug));
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${BASE}${u}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`;
fs.writeFileSync('./sitemap.xml', xml);
console.log('Wrote sitemap.xml with', urls.length, 'urls');
