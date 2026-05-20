import { h, setMeta } from '../js/utils.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFab } from '../components/fab.js';
import { navigate } from '../js/router.js';

export async function renderMore({ app }){
  setMeta({title:'আরো — স্বাস্থ্য সেতু'});
  renderTopbar({title:'আরো', back:'/'}); renderNavbar(); renderFab();
  const items = [
    ['ℹ️','অ্যাপ সম্পর্কে','/about'],
    ['📞','সাহায্য / যোগাযোগ','/support'],
    ['🔒','গোপনীয়তা নীতি','/privacy'],
    ['🚑','জরুরি নম্বর','/?emergency=1'],
    ['⭐','অ্যাপ রেটিং দিন','#'],
    ['📤','বন্ধুকে শেয়ার করুন','#'],
  ];
  app.appendChild(h('section',{class:'section'},
    h('div',{class:'card',style:'padding:0;overflow:hidden'},
      ...items.map(([emo,lbl,href],i)=>
        h('button',{style:'display:flex;align-items:center;gap:14px;padding:16px;width:100%;text-align:left;border-bottom:'+(i<items.length-1?'1px solid var(--brand-border)':'0'),
          onclick:()=>{ if (href.startsWith('/')) navigate(href); }},
          h('span',{style:'font-size:22px;width:32px;text-align:center'}, emo),
          h('span',{style:'flex:1;font-weight:600'}, lbl),
          h('span',{class:'muted'}, '›'),
        )
      )
    )
  ));
}
