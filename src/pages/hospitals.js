import { h, setMeta, debounce } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { hospitalCardFull } from '../components/hospital-card.js';
import { skeletonList } from '../components/skeleton.js';

export async function renderHospitals({ query, app }){
  const f = { city:query.city||'', type:query.type||'', q:query.q||'' };
  setMeta({title:'হাসপাতাল ও ডায়াগনস্টিক — উত্তরবঙ্গ স্বাস্থ্য সেতু',description:'উত্তরবঙ্গের হাসপাতাল, ক্লিনিক ও ডায়াগনস্টিক সেন্টার এর তালিকা।',canonical:location.origin+'/hospitals'});
  renderTopbar({title:'হাসপাতাল', back:'/'});
  renderNavbar(); renderFab();
  const input = h('input',{class:'input',type:'search',placeholder:'হাসপাতালের নাম লিখুন...',value:f.q});
  app.appendChild(h('div',{style:'padding:12px 16px'}, input));
  input.addEventListener('input', debounce(e=>{ f.q=e.target.value; run(); }, 250));

  const chips = h('div',{class:'chips-row'},
    h('button',{class:'chip'+(!f.type?' active':''),onclick:()=>{f.type='';chipUpd();run();}}, 'সব'),
    h('button',{class:'chip'+(f.type==='hospital'?' active':''),onclick:()=>{f.type='hospital';chipUpd();run();}}, '🏥 হাসপাতাল'),
    h('button',{class:'chip'+(f.type==='diagnostic'?' active':''),onclick:()=>{f.type='diagnostic';chipUpd();run();}}, '🔬 ডায়াগনস্টিক'),
  );
  app.appendChild(chips);
  function chipUpd(){ [...chips.children].forEach((c,i)=>c.classList.toggle('active', (i===0&&!f.type)||(i===1&&f.type==='hospital')||(i===2&&f.type==='diagnostic'))); }

  const list = h('div',{class:'container',style:'display:flex;flex-direction:column;gap:12px;padding:8px 16px 24px'});
  app.appendChild(list);
  async function run(){
    list.innerHTML=''; list.appendChild(skeletonList(3));
    const hs = await api.getHospitals(f);
    list.innerHTML='';
    if (!hs.length){ list.appendChild(h('div',{class:'card',style:'text-align:center;padding:32px'},h('div',{style:'font-size:48px'},'🏥'),h('h3',{},'কোনো হাসপাতাল পাওয়া যায়নি'))); return; }
    hs.forEach(hp => list.appendChild(hospitalCardFull(hp)));
  }
  run();
}
