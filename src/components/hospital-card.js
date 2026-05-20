import { h, phoneHref, mapsHref } from '../js/utils.js';
import { navigate } from '../js/router.js';
export function hospitalCardCompact(hp){
  const c = h('article',{class:'hosp-card', onclick:()=>navigate('/hospital/'+hp.slug)});
  c.appendChild(h('div',{class:'ph'}, h('span',{style:'font-size:36px'}, '🏥')));
  c.appendChild(h('div',{class:'body'},
    h('div',{class:'name'}, hp.name_bn || hp.name),
    h('div',{class:'loc'}, `📍 ${hp.city_bn} • ${hp.type === 'diagnostic' ? 'ডায়াগনস্টিক' : 'হাসপাতাল'}`),
    h('div',{class:'row',style:'gap:6px'},
      h('a',{class:'btn btn-primary',style:'flex:1;padding:8px 0;font-size:12px',href:phoneHref(hp.phone)}, '📞 কল'),
      h('a',{class:'btn btn-ghost',style:'flex:1;padding:8px 0;font-size:12px',href:mapsHref(hp.address),target:'_blank',rel:'noopener'}, '🗺️ ম্যাপ'),
    )
  ));
  return c;
}
export function hospitalCardFull(hp){
  const c = h('article',{class:'doc-card fade-in'});
  c.appendChild(h('div',{class:'head'},
    h('div',{class:'avatar'}, '🏥'),
    h('div',{class:'meta'},
      h('div',{class:'name'}, hp.name_bn || hp.name, hp.emergency ? h('span',{class:'badge badge-pop'},'২৪×৭') : null),
      h('div',{class:'qual'}, hp.address),
      h('div',{class:'row2'},
        h('span',{class:'badge badge-spec'}, hp.type === 'diagnostic' ? 'ডায়াগনস্টিক' : 'হাসপাতাল'),
        h('span',{class:'badge badge-today'}, '📍 ' + hp.city_bn),
      ),
    )
  ));
  c.appendChild(h('div',{class:'actions'},
    h('a',{class:'btn btn-primary',href:phoneHref(hp.phone)}, '📞 কল'),
    h('a',{class:'btn btn-secondary',href:mapsHref(hp.address),target:'_blank',rel:'noopener'}, '🗺️ ম্যাপ'),
    h('button',{class:'btn btn-ghost',onclick:()=>navigate('/hospital/'+hp.slug)}, 'বিস্তারিত →'),
  ));
  return c;
}
