import { h } from '../js/utils.js';
import { phoneHref } from '../js/utils.js';

export function renderFab(){
  const root = document.getElementById('fab-root');
  root.innerHTML = '';
  const fab = h('div',{class:'fab'});
  const menu = h('div',{class:'fab-menu'},
    h('a',{class:'fab-item',href:phoneHref('108')}, '🚑 অ্যাম্বুলেন্স — ১০৮'),
    h('a',{class:'fab-item',href:phoneHref('104')}, '📞 স্বাস্থ্য হেল্পলাইন — ১০৪'),
    h('a',{class:'fab-item',href:phoneHref('1910')}, '🩸 ব্লাড ব্যাংক — ১৯১০'),
  );
  const btn = h('button',{class:'fab-btn','aria-label':'জরুরি',onclick:()=>fab.classList.toggle('open')},
  );
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>';
  fab.appendChild(menu);
  fab.appendChild(btn);
  root.appendChild(fab);
  document.addEventListener('click', e => { if (!fab.contains(e.target)) fab.classList.remove('open'); });
}
