import { h, phoneHref, waHref, fmtBn } from '../js/utils.js';
import { navigate } from '../js/router.js';

const STAR = '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';

export function doctorCard(d){
  const card = h('article',{class:'doc-card fade-in'});
  const head = h('div',{class:'head'});
  const av = h('div',{class:'avatar'}, d.name_bn ? d.name_bn[0] : d.name[0]);
  head.appendChild(av);
  const meta = h('div',{class:'meta'});
  const name = h('div',{class:'name'},
    h('span',{}, d.name_bn || d.name),
    d.verified ? h('span',{class:'badge badge-verified'}, '✓ ভেরিফায়েড') : null,
  );
  meta.appendChild(name);
  meta.appendChild(h('div',{class:'qual'}, d.qualification));
  const row2 = h('div',{class:'row2'},
    h('span',{class:'badge badge-spec'}, d.specialty_bn),
    d.reviewCount >= 5 ? h('span',{class:'badge badge-pop'}, '🔥 জনপ্রিয়') : null,
    d.availableToday ? h('span',{class:'badge badge-today'}, '🟢 আজ পাওয়া যাবে') : null,
  );
  meta.appendChild(row2);
  const stars = h('span',{class:'stars'}); stars.innerHTML = STAR + ` ${d.rating.toFixed(1)} <span class="muted" style="font-weight:500">(${fmtBn(d.reviewCount)} রিভিউ)</span>`;
  meta.appendChild(h('div',{class:'row3'},
    stars,
  ));
  meta.appendChild(h('div',{class:'row3'},
    h('span',{}, `📍 ${d.city_bn}`),
    h('span',{}, `💰 ₹${fmtBn(d.fee)}`),
  ));
  head.appendChild(meta);
  card.appendChild(head);
  const actions = h('div',{class:'actions'},
    h('a',{class:'btn btn-primary',href:phoneHref(d.phone)}, '📞 কল'),
    h('a',{class:'btn btn-secondary',href:waHref(d.phone,'নমস্কার, আপনার চেম্বার সম্পর্কে জানতে চাই।'),target:'_blank',rel:'noopener'}, '💬 WhatsApp'),
    h('button',{class:'btn btn-ghost',onclick:()=>navigate('/doctor/'+d.slug)}, 'বিস্তারিত →'),
  );
  card.appendChild(actions);
  return card;
}
