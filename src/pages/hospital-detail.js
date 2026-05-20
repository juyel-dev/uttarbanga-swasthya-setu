import { h, setMeta, phoneHref, mapsHref } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';

export async function renderHospitalDetail({ params, app }){
  const hp = await api.getHospital(params.slug);
  renderTopbar({title:'হাসপাতাল', back:'/hospitals'}); renderNavbar(); renderFab();
  if (!hp){ app.innerHTML='<div class="container section"><h2>পাওয়া যায়নি</h2></div>'; return; }
  setMeta({title:`${hp.name} — ${hp.city_bn} | স্বাস্থ্য সেতু`,description:`${hp.name_bn||hp.name}, ${hp.address}। ফোন ${hp.phone}।`,canonical:location.origin+'/hospital/'+hp.slug});
  app.appendChild(h('section',{class:'section'},
    h('div',{class:'card'},
      h('div',{style:'height:140px;border-radius:12px;background:linear-gradient(135deg,#1A6FBA,#0D9E6A);display:grid;place-items:center;color:#fff;font-size:48px;margin-bottom:12px'}, '🏥'),
      h('h1',{style:'font-size:20px'}, hp.name_bn || hp.name),
      h('p',{class:'muted',style:'margin-top:4px'}, hp.address),
      h('div',{style:'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap'},
        h('span',{class:'badge badge-spec'}, hp.type==='diagnostic'?'ডায়াগনস্টিক':'হাসপাতাল'),
        h('span',{class:'badge badge-today'}, '📍 '+hp.city_bn),
        hp.emergency ? h('span',{class:'badge badge-pop'}, '২৪×৭ জরুরি') : null,
      ),
    )
  ));
  app.appendChild(h('section',{class:'section'},
    h('div',{style:'display:grid;grid-template-columns:1fr 1fr;gap:10px'},
      h('a',{class:'btn btn-primary btn-block',href:phoneHref(hp.phone)}, '📞 কল করুন'),
      h('a',{class:'btn btn-secondary btn-block',href:mapsHref(hp.address),target:'_blank',rel:'noopener'}, '🗺️ ম্যাপ'),
    )
  ));
  if (hp.services?.length){
    app.appendChild(h('section',{class:'section'},
      h('h3',{style:'margin-bottom:8px'},'সেবাসমূহ'),
      h('div',{class:'card'}, h('div',{style:'display:flex;flex-wrap:wrap;gap:6px'}, ...hp.services.map(s=>h('span',{class:'badge badge-spec'}, s))))
    ));
  }
}
