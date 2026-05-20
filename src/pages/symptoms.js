import { h, setMeta } from '../js/utils.js';
import { api } from '../js/api.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { navigate } from '../js/router.js';

export async function renderSymptoms({ app }){
  setMeta({title:'উপসর্গ অনুযায়ী ডাক্তার — স্বাস্থ্য সেতু',description:'উপসর্গ দেখে বুঝুন কোন বিশেষজ্ঞের কাছে যাবেন।',canonical:location.origin+'/symptoms'});
  renderTopbar({title:'উপসর্গ', back:'/'}); renderNavbar(); renderFab();
  app.appendChild(h('div',{class:'section'},
    h('h2',{}, 'উপসর্গ অনুযায়ী ডাক্তার'),
    h('p',{class:'subtitle'}, 'সমস্যার আইকনে ক্লিক করুন — উপযুক্ত বিশেষজ্ঞ দেখাবো'),
  ));
  const grid = h('div',{class:'container grid-3',style:'padding:0 16px 24px'});
  app.appendChild(grid);
  const symptoms = await api.getSymptoms();
  symptoms.forEach(s => grid.appendChild(
    h('button',{class:'symp-card',onclick:()=>navigate('/symptoms/'+s.slug)},
      h('div',{class:'emoji'}, s.emoji),
      h('div',{class:'lbl'}, s.label_bn),
    )
  ));
}
