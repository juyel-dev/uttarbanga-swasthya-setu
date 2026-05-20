import { h } from '../js/utils.js';
export function openModal(content){
  const root = document.getElementById('modal-root');
  root.innerHTML = '';
  const inner = h('div',{class:'modal'}, h('div',{class:'handle'}));
  if (typeof content === 'string') inner.insertAdjacentHTML('beforeend', content);
  else inner.appendChild(content);
  const bd = h('div',{class:'modal-backdrop', onclick:e=>{ if(e.target===bd) close(); }}, inner);
  root.appendChild(bd);
  requestAnimationFrame(()=>bd.classList.add('open'));
  function close(){ bd.classList.remove('open'); setTimeout(()=>root.innerHTML='', 250); }
  return close;
}
