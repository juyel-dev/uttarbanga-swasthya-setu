import { h } from '../js/utils.js';
import { navigate } from '../js/router.js';

const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 22v-2a7 7 0 0 1 14 0v2"/></svg>',
  hos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V8l8-5 8 5v13"/><path d="M10 21v-6h4v6"/><path d="M12 9v4M10 11h4"/></svg>',
  sym:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
};
const items = [
  {path:'/', label:'হোম', icon:'home'},
  {path:'/doctors', label:'ডাক্তার', icon:'doc'},
  {path:'/hospitals', label:'হাসপাতাল', icon:'hos'},
  {path:'/symptoms', label:'উপসর্গ', icon:'sym'},
  {path:'/more', label:'আরো', icon:'more'},
];
export function renderNavbar(){
  const nb = document.getElementById('navbar');
  nb.hidden = false; nb.innerHTML = '';
  const cur = location.pathname;
  for (const it of items){
    const active = (it.path === '/' && cur === '/') || (it.path !== '/' && cur.startsWith(it.path));
    const el = h('button',{class:'nav-item'+(active?' active':''),'aria-label':it.label, onclick:()=>navigate(it.path)});
    el.innerHTML = I[it.icon] + `<span>${it.label}</span>`;
    nb.appendChild(el);
  }
}
