import { h, setMeta, debounce } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { doctorCard } from '../components/doctor-card.js';
import { adCard } from '../components/ad-card.js';
import { skeletonList } from '../components/skeleton.js';
import { navigate } from '../js/router.js';
import { CITIES } from '../js/location.js';

const SPECS = [
  ['medicine','মেডিসিন'], ['cardiology','হৃদরোগ'], ['child-specialist','শিশু'],
  ['neurology','নিউরো'], ['dermatology-venereology','চর্ম'], ['ent','ENT'],
  ['orthopedics','অর্থো'], ['gynecology-obstetrics','স্ত্রীরোগ'], ['diabetes-endocrinology','ডায়াবেটিস'],
];

export async function renderDoctors({ query, app }){
  const f = {
    specialty: query.specialty || '',
    city: query.city || '',
    q: query.q || '',
    sort: query.sort || 'rating',
  };
  setMeta({
    title: `${f.specialty ? labelFor(f.specialty)+' ' : ''}ডাক্তার — উত্তরবঙ্গ স্বাস্থ্য সেতু`,
    description:'উত্তরবঙ্গের বিশেষজ্ঞ ডাক্তারদের তালিকা। রেটিং, ফি, চেম্বার ও যোগাযোগ এক জায়গায়।',
    canonical: location.origin + '/doctors',
  });
  renderTopbar({ title:'ডাক্তার খুঁজুন', back:'/' });
  renderNavbar();
  renderFab();

  // Search
  const input = h('input',{class:'input',type:'search',placeholder:'নাম, বিভাগ, এলাকা লিখুন...',value:f.q});
  const searchWrap = h('div',{class:'search-wrap',style:'padding:12px 16px'},
    (()=>{ const i = h('div',{class:'search-wrap'}); i.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'; i.appendChild(input); return i; })()
  );
  app.appendChild(searchWrap);
  input.addEventListener('input', debounce(e=>{ f.q = e.target.value; run(); }, 250));

  // Chips
  const chips = h('div',{class:'chips-row'},
    h('button',{class:'chip'+(!f.specialty?' active':''), onclick:()=>{ f.specialty=''; updateURL(); run(); }}, 'সব'),
    ...SPECS.map(([s,l])=>h('button',{class:'chip'+(f.specialty===s?' active':''), onclick:()=>{ f.specialty=s; updateURL(); run(); }}, l))
  );
  app.appendChild(chips);

  // Sort row
  const sortRow = h('div',{class:'container',style:'display:flex;justify-content:space-between;align-items:center;padding:8px 16px'},
    h('span',{class:'muted',id:'count'}, 'লোড হচ্ছে...'),
    (()=>{ const s = h('select',{class:'select',style:'width:auto;padding:8px 12px;font-size:12px'},
      h('option',{value:'rating'}, 'সেরা রেটিং'),
      h('option',{value:'reviews'}, 'বেশি রিভিউ'),
      h('option',{value:'fee'}, 'কম ফি'),
      h('option',{value:'exp'}, 'বেশি অভিজ্ঞতা'),
    ); s.value=f.sort; s.addEventListener('change',e=>{ f.sort=e.target.value; updateURL(); run(); }); return s; })()
  );
  app.appendChild(sortRow);

  const list = h('div',{class:'container',style:'display:flex;flex-direction:column;gap:12px;padding:8px 16px 24px'});
  app.appendChild(list);

  async function run(){
    list.innerHTML = ''; list.appendChild(skeletonList(4));
    const docs = await api.getDoctors(f);
    document.getElementById('count').textContent = `${docs.length} জন পাওয়া গেছে`;
    list.innerHTML = '';
    if (!docs.length){
      list.appendChild(h('div',{class:'card',style:'text-align:center;padding:32px'},
        h('div',{style:'font-size:48px;margin-bottom:8px'}, '🔍'),
        h('h3',{}, 'কোনো ডাক্তার পাওয়া যায়নি'),
        h('p',{class:'muted',style:'margin-top:6px'}, 'অন্য ফিল্টার বা সার্চ চেষ্টা করুন।'),
      ));
      return;
    }
    docs.forEach((d,i)=>{
      list.appendChild(doctorCard(d));
      if (i === 3) list.appendChild(adCard({title:'🏥 ডায়াগনস্টিক প্যাকেজ',body:'ফুল বডি চেকআপ ₹৯৯৯ থেকে শুরু — কুচবিহার ও শিলিগুড়ি',cta:'বুক করুন'}));
    });
  }
  function updateURL(){
    const u = new URLSearchParams();
    Object.entries(f).forEach(([k,v])=>{ if (v) u.set(k,v); });
    history.replaceState({}, '', '/doctors' + (u.toString() ? '?'+u : ''));
  }
  run();
}
function labelFor(s){ const m = SPECS.find(x=>x[0]===s); return m ? m[1] : ''; }
