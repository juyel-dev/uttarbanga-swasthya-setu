# 🏥 উত্তরবঙ্গ স্বাস্থ্য সেতু (Uttarbanga Swasthya Setu)

North Bengal's Healthcare Discovery Platform — find doctors, hospitals & diagnostics across Cooch Behar, Siliguri, Tufanganj, Dinhata, Mekhliganj, Alipurduar, Jalpaiguri & Darjeeling.

> Bengali-first • Installable PWA • Offline-ready • SEO-optimised • Zero-build vanilla ES modules

---

## 🚀 Quick Start (local)

```bash
# Any static server works. Examples:
npx serve .
# or
python3 -m http.server 8000
```

Open <http://localhost:3000> (or whichever port your server prints).

> The project uses native ES modules + dynamic `import()` — **no build step required**.

---

## 📁 Project Structure

```
uttarbanga-swasthya-setu/
├─ index.html              SPA shell + SEO meta
├─ manifest.json           PWA manifest
├─ robots.txt / sitemap.xml
├─ src/
│  ├─ styles/              Modular CSS (variables, base, components, ...)
│  ├─ js/                  app.js, router.js, api.js, state.js, utils.js, storage.js, location.js
│  ├─ components/          Reusable UI (navbar, topbar, cards, modal, slider, fab, toast)
│  ├─ pages/               Route-level pages
│  └─ assets/              icons, illustrations, images
├─ pwa/sw.js               Service worker (NetworkFirst for HTML, CacheFirst for assets)
├─ data/                   Seed JSON (doctors, hospitals, symptoms) — replace with Supabase
├─ scripts/                build / sitemap / image-optimize
└─ .github/workflows/      GitHub Pages auto-deploy
```

---

## 🎨 Design System

Tokens live in `src/styles/_variables.css`:

| Token              | Value     |
|--------------------|-----------|
| --brand-primary    | #1A6FBA   |
| --brand-secondary  | #0D9E6A   |
| --brand-accent     | #F5A623   |
| --brand-emergency  | #E53E3E   |
| --brand-bg         | #F4F7FB   |
| Display font       | Hind Siliguri |
| Body font          | Noto Sans Bengali |
| Numbers            | Nunito    |

---

## 🗺️ Routes

- `/` Home (categories, popular doctors, hospitals)
- `/doctors?specialty=&city=&q=&sort=` List + filters
- `/doctor/:slug` Profile with chamber, call/WhatsApp, reviews, schema.org/Physician markup
- `/hospitals?type=&city=` Hospitals & diagnostics
- `/hospital/:slug` Detail
- `/symptoms` Grid
- `/symptoms/:slug` Symptom → recommended specialist
- `/search?q=` Unified search
- `/more` `/about` `/support` `/privacy`
- `/offline` Offline fallback

---

## 🔌 Connecting Supabase

Swap `src/js/api.js` calls — keep the same return shapes:

```js
import { createClient } from '@supabase/supabase-js';
const sb = createClient(URL, ANON_KEY);
export const api = {
  async getDoctors(f={}) {
    let q = sb.from('doctors').select('*');
    if (f.specialty) q = q.eq('specialty_slug', f.specialty);
    // ... etc
    const { data } = await q;
    return data;
  },
};
```

Suggested tables: `doctors`, `hospitals`, `symptoms`, `reviews`, `ads`, `cities`.

---

## 📦 Deploy

### GitHub Pages (zero config)
Push to `main` — included workflow auto-deploys.

### Any static host
Drop the folder into Netlify, Vercel, Cloudflare Pages, or upload via FTP.

> SPA routing: ensure unknown paths fall back to `index.html`. `404.html` handles this for GitHub Pages.

---

## 📋 Generate sitemap from current data

```bash
node scripts/generate-sitemap.js
```

---

## 🔐 Production Checklist

- [ ] Replace placeholder phone numbers in seed JSON
- [ ] Add real doctor photos to `/src/assets/images/doctors/`
- [ ] Connect Supabase (or other backend)
- [ ] Generate proper 192/512 PNG icons (e.g. via `sharp`)
- [ ] Set `BASE_URL` and re-generate `sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Verify schema.org markup with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Lighthouse: aim for ≥90 Performance / 100 SEO / 100 Accessibility

---

## 📄 License

MIT — built for North Bengal, with ❤️.
