import { h } from '../js/utils.js';
export function adCard({title, body, cta, href='#'}){
  return h('a',{class:'ad-card fade-in',href,target:'_blank',rel:'noopener'},
    h('div',{class:'ad-lbl'}, 'Sponsored'),
    h('div',{style:'font-weight:700;margin-bottom:4px'}, title),
    h('div',{class:'muted',style:'margin-bottom:10px'}, body),
    h('span',{class:'btn btn-primary'}, cta),
  );
}
