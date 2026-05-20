import { h } from '../js/utils.js';
import { navigate } from '../js/router.js';

const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>',
};

export function renderTopbar({ title='স্বাস্থ্য সেতু', home=false, back=null, actions=['search','menu'] } = {}){
  const tb = document.getElementById('topbar');
  tb.hidden = false;
  tb.className = 'topbar' + (home ? ' home' : '');
  tb.innerHTML = '';
  if (home){
    tb.appendChild(h('div',{class:'tb-title'},
      h('img',{src:'/src/assets/icons/logo.svg',class:'logo',alt:''}),
      h('span',{}, 'স্বাস্থ্য সেতু')
    ));
  } else {
    const btn = h('button',{class:'tb-btn','aria-label':'ফিরে যান', html: ICON.back, onclick:()=>back ? navigate(back) : history.length>1 ? history.back() : navigate('/') });
    tb.appendChild(btn);
    tb.appendChild(h('div',{class:'tb-title'}, title));
  }
  const actWrap = h('div',{class:'row'});
  for (const a of actions){
    if (a === 'search') actWrap.appendChild(h('button',{class:'tb-btn',html:ICON.search,'aria-label':'সার্চ',onclick:()=>navigate('/search')}));
    if (a === 'menu')   actWrap.appendChild(h('button',{class:'tb-btn',html:ICON.menu,'aria-label':'মেনু',onclick:()=>navigate('/more')}));
  }
  tb.appendChild(actWrap);
}
