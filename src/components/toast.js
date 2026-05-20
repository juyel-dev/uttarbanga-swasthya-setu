import { h } from '../js/utils.js';
export function toast(msg, ms=2200){
  const root = document.getElementById('toast-root');
  const t = h('div',{class:'toast'}, msg);
  root.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, ms);
}
