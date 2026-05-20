import { h } from '../js/utils.js';
import { navigate } from '../js/router.js';
export function categoryCard({slug, label, emoji}){
  return h('button',{class:'cat-card', onclick:()=>navigate('/doctors?specialty='+slug)},
    h('div',{class:'icon'}, h('span',{style:'font-size:26px'}, emoji)),
    h('div',{class:'lbl'}, label),
  );
}
