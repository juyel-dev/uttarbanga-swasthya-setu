import { h, setMeta, fmtBn } from '../js/utils.js';
import { state } from '../js/state.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { bannerSlider } from '../components/slider.js';
import { categoryCard } from '../components/category-card.js';
import { doctorCard } from '../components/doctor-card.js';
import { hospitalCardCompact } from '../components/hospital-card.js';
import { adCard } from '../components/ad-card.js';
import { skeletonList } from '../components/skeleton.js';
import { openModal } from '../components/modal.js';
import { CITIES } from '../js/location.js';
import { setCity } from '../js/state.js';
import { navigate } from '../js/router.js';

const CATS = [
  {slug:'medicine',label:'মেডিসিন',emoji:'💊'},
  {slug:'ent',label:'কান, নাক, গলা',emoji:'👂'},
  {slug:'pulmonology',label:'বক্ষব্যাধি',emoji:'🫁'},
  {slug:'child-specialist',label:'শিশু রোগ',emoji:'👶'},
  {slug:'cardiology',label:'হৃদরোগ',emoji:'🫀'},
  {slug:'neurology',label:'নিউরোলজি',emoji:'🧠'},
  {slug:'ophthalmology',label:'চক্ষু',emoji:'👁️'},
  {slug:'dental',label:'দন্ত',emoji:'🦷'},
  {slug:'orthopedics',label:'অর্থোপেডিক',emoji:'🦴'},
  {slug:'gynecology-obstetrics',label:'স্ত্রী ও প্রসূতি',emoji:'🤰'},
  {slug:'diabetes-endocrinology',label:'ডায়াবেটিস',emoji:'🩸'},
  {slug:'dermatology-venereology',label:'চর্মরোগ',emoji:'🧴'},
];

export async function renderHome({ app }){
  setMeta({
    title:'উত্তরবঙ্গ স্বাস্থ্য সেতু — উত্তরবঙ্গের সেরা ডাক্তার ও হাসপাতাল',
    description:'কুচবিহার, শিলিগুড়ি, তুফানগঞ্জ, দিনহাটা সহ উত্তরবঙ্গের সকল ডাক্তার, হাসপাতাল ও ডায়াগনস্টিক এক জায়গায়।',
    canonical: location.origin + '/',
  });
  renderTopbar({ home:true });
  renderNavbar();
  renderFab();

  // Location chip
  const locChip = h('div',{class:'container',style:'padding-top:12px'},
    h('button',{class:'chip',onclick:openCityPicker},
      h('span',{}, '📍 ' + state.cityLabel),
      h('span',{class:'muted',style:'font-weight:500'}, ' • পরিবর্তন করুন ▾'),
    )
  );
  app.appendChild(locChip);

  // Hero slider
  const slidersec = h('section',{class:'section'}, bannerSlider());
  app.appendChild(slidersec);

  // Stats
  const stats = h('div',{class:'hscroll'},
    h('div',{class:'stat-pill'}, '👨‍⚕️ ', h('span',{class:'num'}, fmtBn(120)+'+'), ' ডাক্তার'),
    h('div',{class:'stat-pill'}, '🏥 ', h('span',{class:'num'}, fmtBn(45)+'+'), ' হাসপাতাল'),
    h('div',{class:'stat-pill'}, '🏙️ ', h('span',{class:'num'}, '৮'), ' শহর'),
    h('div',{class:'stat-pill'}, '⭐ ', h('span',{class:'num'}, '৪.৮'), ' গড় রেটিং'),
  );
  app.appendChild(stats);

  // Categories
  const catSec = h('section',{class:'section'},
    h('div',{class:'section-title'}, h('h2',{}, 'বিভাগ অনুযায়ী ডাক্তার'),
      h('a',{href:'/doctors','data-link':true}, 'সব দেখুন →')),
    h('p',{class:'subtitle'}, 'আপনার প্রয়োজন অনুযায়ী বিভাগ বেছে নিন'),
    h('div',{class:'grid-3'}, ...CATS.slice(0,12).map(categoryCard))
  );
  app.appendChild(catSec);

  // Popular doctors
  const docSec = h('section',{class:'section'},
    h('div',{class:'section-title'}, h('h2',{}, 'জনপ্রিয় বিশেষজ্ঞ ডাক্তার'),
      h('a',{href:'/doctors','data-link':true}, 'আরো →')),
    h('p',{class:'subtitle'}, 'সর্বোচ্চ রেটিং অনুযায়ী'),
  );
  const docList = h('div',{style:'display:flex;flex-direction:column;gap:12px'});
  docList.appendChild(skeletonList(3));
  docSec.appendChild(docList);
  app.appendChild(docSec);

  const docs = await api.getDoctors({ sort:'rating' });
  docList.innerHTML = '';
  docs.slice(0,4).forEach(d => docList.appendChild(doctorCard(d)));
  docList.appendChild(adCard({
    title:'💊 হোম ডেলিভারি ফার্মেসি',
    body:'কুচবিহার ও তুফানগঞ্জে ২ ঘণ্টায় ওষুধ ডেলিভারি — বিনামূল্যে',
    cta:'এখনই অর্ডার করুন', href:'#',
  }));
  docs.slice(4,6).forEach(d => docList.appendChild(doctorCard(d)));

  // Hospitals
  const hosSec = h('section',{class:'section'},
    h('div',{class:'section-title'}, h('h2',{}, 'কাছের হাসপাতাল ও ডায়াগনস্টিক'),
      h('a',{href:'/hospitals','data-link':true}, 'সব →')),
  );
  app.appendChild(hosSec);
  const hScroll = h('div',{class:'hscroll',style:'padding-top:0'});
  app.appendChild(hScroll);
  const hosps = await api.getHospitals();
  hosps.slice(0,6).forEach(hp => hScroll.appendChild(hospitalCardCompact(hp)));

  // Footer-ish
  app.appendChild(h('div',{class:'section',style:'text-align:center;padding-bottom:24px'},
    h('p',{class:'muted',style:'font-size:12px'}, '© উত্তরবঙ্গ স্বাস্থ্য সেতু • North Bengal'),
    h('div',{style:'margin-top:8px;display:flex;gap:12px;justify-content:center'},
      h('a',{class:'muted',style:'font-size:12px',href:'/about','data-link':true}, 'About'),
      h('a',{class:'muted',style:'font-size:12px',href:'/support','data-link':true}, 'Support'),
      h('a',{class:'muted',style:'font-size:12px',href:'/privacy','data-link':true}, 'Privacy'),
    )
  ));
}

function openCityPicker(){
  const list = h('div',{},
    h('h3',{}, 'আপনার শহর বেছে নিন'),
    h('div',{style:'display:flex;flex-direction:column;gap:8px;margin-top:12px'},
      ...CITIES.map(c => h('button',{class:'chip',style:'justify-content:space-between;padding:14px 16px',
        onclick:()=>{ setCity(c.slug, c.label); close(); navigate(location.pathname + location.search); }},
        h('span',{}, c.label),
        h('span',{class:'muted',style:'font-weight:500'}, c.en),
      ))
    )
  );
  const close = openModal(list);
}
