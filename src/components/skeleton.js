import { h } from '../js/utils.js';
export function skeletonCard(){
  return h('div',{class:'card',style:'display:flex;gap:12px;align-items:center'},
    h('div',{class:'skeleton',style:'width:72px;height:72px;border-radius:50%'}),
    h('div',{style:'flex:1'},
      h('div',{class:'skeleton',style:'height:14px;width:60%;margin-bottom:8px'}),
      h('div',{class:'skeleton',style:'height:12px;width:80%;margin-bottom:6px'}),
      h('div',{class:'skeleton',style:'height:12px;width:40%'}),
    )
  );
}
export function skeletonList(n=4){
  const wrap = h('div',{style:'display:flex;flex-direction:column;gap:12px'});
  for (let i=0;i<n;i++) wrap.appendChild(skeletonCard());
  return wrap;
}
