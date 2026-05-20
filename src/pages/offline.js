import { h, setMeta } from '../js/utils.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';
import { navigate } from '../js/router.js';

export function renderOffline({ app }){
  setMeta({title:'অফলাইন'});
  renderTopbar({title:'অফলাইন', back:'/'}); renderNavbar();
  app.appendChild(h('div',{class:'offline-page'},
    h('div',{},
      h('div',{class:'ico'}, '📡'),
      h('h2',{}, 'ইন্টারনেট সংযোগ নেই'),
      h('p',{}, 'অনুগ্রহ করে ইন্টারনেট চেক করে আবার চেষ্টা করুন।'),
      h('button',{class:'btn btn-primary',onclick:()=>location.reload()}, 'আবার চেষ্টা করুন'),
    )
  ));
}
export function renderNotFound(app){
  setMeta({title:'পেজ পাওয়া যায়নি'});
  renderTopbar({title:'৪০৪', back:'/'}); renderNavbar();
  app.appendChild(h('div',{class:'offline-page'},
    h('div',{},
      h('div',{class:'ico'}, '🔍'),
      h('h2',{}, 'পেজ পাওয়া যায়নি'),
      h('p',{}, 'লিংকটি ভুল বা পেজটি সরিয়ে ফেলা হয়েছে।'),
      h('button',{class:'btn btn-primary',onclick:()=>navigate('/')}, 'হোমে যান'),
    )
  ));
}
