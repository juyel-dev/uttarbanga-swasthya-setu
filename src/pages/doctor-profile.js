import { h, setMeta, phoneHref, waHref, mapsHref, fmtBn } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { navigate } from '../js/router.js';
import { toast } from '../components/toast.js';

export async function renderDoctorProfile({ params, app }){
  const d = await api.getDoctor(params.slug);
  if (!d){
    setMeta({title:'ডাক্তার পাওয়া যায়নি'});
    renderTopbar({ title:'ডাক্তার', back:'/doctors' });
    renderNavbar(); renderFab();
    app.innerHTML = '<div class="container section"><h2>ডাক্তার পাওয়া যায়নি</h2></div>';
    return;
  }
  setMeta({
    title: `${d.name} — ${d.specialty_bn} • ${d.city_bn} | উত্তরবঙ্গ স্বাস্থ্য সেতু`,
    description: `${d.name_bn || d.name}, ${d.qualification}। চেম্বার ${d.chamber}, ${d.city_bn}। ভিজিট ফি ₹${d.fee}। কল বা WhatsApp করুন।`,
    canonical: location.origin + '/doctor/' + d.slug,
  });
  // schema markup
  const ld = document.createElement('script');
  ld.type='application/ld+json';
  ld.textContent = JSON.stringify({
    "@context":"https://schema.org","@type":"Physician",
    "name":d.name,"medicalSpecialty":d.specialty,
    "telephone":d.phone,
    "address":{"@type":"PostalAddress","addressLocality":d.city,"streetAddress":d.chamber,"addressRegion":"West Bengal","addressCountry":"IN"},
    "priceRange":"₹"+d.fee,
    "aggregateRating":{"@type":"AggregateRating","ratingValue":d.rating,"reviewCount":d.reviewCount}
  });
  document.head.appendChild(ld);

  renderTopbar({ title:'ডাক্তার প্রোফাইল', back:'/doctors' });
  renderNavbar(); renderFab();

  const hero = h('section',{class:'section'},
    h('div',{class:'card',style:'display:flex;gap:14px;align-items:flex-start'},
      h('div',{class:'avatar',style:'width:88px;height:88px;border-radius:50%;background:var(--brand-primary-50);display:grid;place-items:center;color:var(--brand-primary);font-size:32px;font-weight:800;font-family:var(--font-num)'}, d.name_bn ? d.name_bn[0] : d.name[0]),
      h('div',{style:'flex:1'},
        h('span',{class:'badge badge-spec'}, d.specialty_bn),
        h('h1',{style:'font-size:20px;margin-top:6px'}, d.name_bn || d.name),
        h('p',{class:'muted',style:'margin-top:4px'}, d.qualification),
        h('div',{style:'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap'},
          d.verified ? h('span',{class:'badge badge-verified'}, '✓ ভেরিফায়েড') : null,
          d.reviewCount>=5 ? h('span',{class:'badge badge-pop'}, '🔥 জনপ্রিয়') : null,
          d.availableToday ? h('span',{class:'badge badge-today'}, '🟢 আজ পাওয়া যাবে') : null,
        ),
        h('div',{class:'stars',style:'margin-top:8px'}, `⭐ ${d.rating.toFixed(1)} (${fmtBn(d.reviewCount)} রিভিউ)`),
      )
    )
  );
  app.appendChild(hero);

  // Chamber info
  app.appendChild(h('section',{class:'section'},
    h('h3',{style:'margin-bottom:8px'}, 'চেম্বার তথ্য'),
    h('div',{class:'card'},
      kv('🏥 চেম্বার', d.chamber),
      kv('📍 ঠিকানা', `${d.chamber}, ${d.city_bn}`),
      kv('🕒 সময়', d.timing || 'বিকেল ৫টা — রাত ৯টা'),
      kv('💰 ফি', '₹'+fmtBn(d.fee)),
      kv('🎓 অভিজ্ঞতা', `${fmtBn(d.experience)} বছর`),
    )
  ));

  // Actions
  app.appendChild(h('section',{class:'section'},
    h('div',{style:'display:grid;grid-template-columns:1fr 1fr;gap:10px'},
      h('a',{class:'btn btn-primary btn-block',href:phoneHref(d.phone)}, '📞 কল করুন'),
      h('a',{class:'btn btn-secondary btn-block',href:waHref(d.phone),target:'_blank',rel:'noopener'}, '💬 WhatsApp'),
      h('a',{class:'btn btn-outline btn-block',href:mapsHref(d.chamber+' '+d.city),target:'_blank',rel:'noopener'}, '🗺️ ম্যাপে দেখুন'),
      h('button',{class:'btn btn-ghost btn-block',onclick:share}, '🔗 শেয়ার করুন'),
    )
  ));

  // Bio
  if (d.bio){
    app.appendChild(h('section',{class:'section'},
      h('h3',{style:'margin-bottom:8px'}, 'পরিচিতি'),
      h('div',{class:'card'}, h('p',{}, d.bio))
    ));
  }
  // Reviews
  app.appendChild(h('section',{class:'section'},
    h('h3',{style:'margin-bottom:8px'}, 'রোগীদের মতামত'),
    h('div',{},
      reviewItem('রমেশ', 5, 'খুব ভালো ডাক্তার। সময় নিয়ে কথা শোনেন।'),
      reviewItem('সুমনা', 5, 'চেম্বারে যাওয়ার অভিজ্ঞতা ভালো ছিল।'),
      reviewItem('আকাশ', 4, 'ফি একটু বেশি কিন্তু চিকিৎসা ভালো।'),
    )
  ));

  function share(){
    const url = location.href;
    if (navigator.share) navigator.share({title:d.name, url});
    else { navigator.clipboard.writeText(url); toast('লিংক কপি হয়েছে'); }
  }
}
function kv(k,v){
  return h('div',{style:'display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--brand-border);font-size:14px'},
    h('span',{class:'muted'}, k),
    h('span',{style:'text-align:right;font-weight:600;max-width:60%'}, v),
  );
}
function reviewItem(name, stars, text){
  return h('div',{class:'rev-card'},
    h('div',{class:'who'},
      h('div',{class:'av'}, name[0]),
      h('div',{},
        h('div',{style:'font-weight:700;font-size:13px'}, name),
        h('div',{class:'stars'}, '⭐'.repeat(stars)),
      )
    ),
    h('p',{style:'font-size:13.5px'}, text),
  );
}
