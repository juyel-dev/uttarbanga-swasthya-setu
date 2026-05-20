import { h, setMeta } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { doctorCard } from '../components/doctor-card.js';
import { skeletonList } from '../components/skeleton.js';

export async function renderSymptomDetail({ params, app }){
  const s = await api.getSymptom(params.slug);
  renderTopbar({title:'উপসর্গ', back:'/symptoms'}); renderNavbar(); renderFab();
  if (!s){ app.innerHTML = '<div class="container section"><h2>উপসর্গ পাওয়া যায়নি</h2></div>'; return; }
  setMeta({title:`${s.label_bn} — কোন ডাক্তার দেখাবেন | স্বাস্থ্য সেতু`,description:`${s.label_bn} এর জন্য সুপারিশকৃত বিশেষজ্ঞ ডাক্তারদের তালিকা।`,canonical:location.origin+'/symptoms/'+s.slug});
  app.appendChild(h('section',{class:'section'},
    h('div',{class:'card',style:'text-align:center;padding:24px'},
      h('div',{style:'font-size:56px;margin-bottom:8px'}, s.emoji),
      h('h1',{}, s.label_bn),
      h('p',{class:'muted',style:'margin-top:6px'}, s.description || 'উপযুক্ত বিশেষজ্ঞের পরামর্শ নিন'),
      h('div',{style:'margin-top:10px'}, h('span',{class:'badge badge-spec'}, 'বিভাগ: ' + s.specialty_bn)),
    )
  ));
  app.appendChild(h('section',{class:'section'},
    h('h3',{style:'margin-bottom:8px'}, 'সুপারিশকৃত বিশেষজ্ঞ ডাক্তার'),
  ));
  const list = h('div',{class:'container',style:'display:flex;flex-direction:column;gap:12px;padding:0 16px 24px'});
  list.appendChild(skeletonList(3));
  app.appendChild(list);
  const docs = await api.getDoctors({ specialty: s.specialty_slug });
  list.innerHTML = '';
  if (!docs.length) list.appendChild(h('div',{class:'card'}, h('p',{class:'muted'}, 'এখনো কোনো ডাক্তার তালিকাভুক্ত নয়।')));
  docs.slice(0,8).forEach(d => list.appendChild(doctorCard(d)));
}
