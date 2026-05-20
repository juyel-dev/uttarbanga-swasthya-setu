import { h, setMeta, phoneHref, waHref } from '../js/utils.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { toast } from '../components/toast.js';

export async function renderSupport({ app }){
  setMeta({title:'সাহায্য ও যোগাযোগ — স্বাস্থ্য সেতু',canonical:location.origin+'/support'});
  renderTopbar({title:'যোগাযোগ', back:'/more'}); renderNavbar();
  app.appendChild(h('section',{class:'section'},
    h('div',{class:'card'},
      h('h3',{style:'margin-bottom:10px'}, 'আমাদের লিখুন'),
      h('input',{class:'input',placeholder:'আপনার নাম',id:'sn'}),
      h('div',{style:'height:10px'}),
      h('input',{class:'input',placeholder:'মোবাইল বা ইমেইল',id:'sc'}),
      h('div',{style:'height:10px'}),
      h('textarea',{class:'textarea',rows:4,placeholder:'আপনার বার্তা লিখুন...',id:'sm'}),
      h('div',{style:'height:12px'}),
      h('button',{class:'btn btn-primary btn-block',onclick:()=>{ toast('ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।'); }}, 'পাঠান'),
    )
  ));
  app.appendChild(h('section',{class:'section'},
    h('h3',{style:'margin-bottom:8px'}, 'সরাসরি যোগাযোগ'),
    h('div',{class:'card',style:'display:flex;flex-direction:column;gap:10px'},
      h('a',{class:'btn btn-secondary btn-block',href:waHref('919000000000'),target:'_blank',rel:'noopener'}, '💬 WhatsApp'),
      h('a',{class:'btn btn-outline btn-block',href:phoneHref('9000000000')}, '📞 কল'),
      h('a',{class:'btn btn-ghost btn-block',href:'mailto:hello@swasthya-setu.app'}, '✉️ ইমেইল'),
    )
  ));
}
