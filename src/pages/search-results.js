import { h, setMeta, debounce } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { doctorCard } from '../components/doctor-card.js';
import { hospitalCardFull } from '../components/hospital-card.js';

export async function renderSearchResults({ query, app }){
  let q = query.q || '';
  setMeta({title:`সার্চ: ${q} — স্বাস্থ্য সেতু`});
  renderTopbar({title:'সার্চ', back:'/'}); renderNavbar(); renderFab();
  const input = h('input',{class:'input',type:'search',placeholder:'ডাক্তার, হাসপাতাল, বিভাগ...',value:q,autofocus:true});
  app.appendChild(h('div',{style:'padding:12px 16px'}, input));
  const results = h('div',{class:'container',style:'display:flex;flex-direction:column;gap:12px;padding:0 16px 24px'});
  app.appendChild(results);
  async function run(){
    results.innerHTML = '';
    if (!q.trim()){ results.appendChild(h('div',{class:'card',style:'text-align:center;padding:24px'},h('p',{class:'muted'},'উপরে কিছু লিখে সার্চ করুন'))); return; }
    history.replaceState({}, '', '/search?q='+encodeURIComponent(q));
    const [docs, hosps] = await Promise.all([api.getDoctors({q}), api.getHospitals({q})]);
    if (!docs.length && !hosps.length){
      results.appendChild(h('div',{class:'card',style:'text-align:center;padding:32px'},h('div',{style:'font-size:48px'},'🔍'),h('h3',{},'কিছু পাওয়া যায়নি'))); return;
    }
    if (docs.length){
      results.appendChild(h('h3',{}, `ডাক্তার (${docs.length})`));
      docs.slice(0,6).forEach(d=>results.appendChild(doctorCard(d)));
    }
    if (hosps.length){
      results.appendChild(h('h3',{style:'margin-top:8px'}, `হাসপাতাল (${hosps.length})`));
      hosps.slice(0,4).forEach(hp=>results.appendChild(hospitalCardFull(hp)));
    }
  }
  input.addEventListener('input', debounce(e=>{ q=e.target.value; run(); }, 300));
  run();
}
