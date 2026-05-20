import { h, setMeta } from '../js/utils.js';
import { renderTopbar } from '../components/topbar.js';
import { renderNavbar } from '../components/navbar.js';

export async function renderAbout({ app }){
  setMeta({title:'অ্যাপ সম্পর্কে — উত্তরবঙ্গ স্বাস্থ্য সেতু',description:'উত্তরবঙ্গের স্বাস্থ্যসেবা সহজ করতে তৈরি বাংলা ভাষার স্বাস্থ্য ডিরেক্টরি।',canonical:location.origin+'/about'});
  renderTopbar({title:'অ্যাপ সম্পর্কে', back:'/more'}); renderNavbar();
  app.appendChild(h('section',{class:'section'},
    h('div',{class:'card'},
      h('div',{style:'text-align:center;margin-bottom:16px'},
        h('img',{src:'/src/assets/icons/logo.svg',width:64,height:64,style:'margin:0 auto'}),
        h('h1',{style:'margin-top:8px'}, 'উত্তরবঙ্গ স্বাস্থ্য সেতু'),
        h('p',{class:'muted'}, 'v1.0.0'),
      ),
      h('p',{}, 'উত্তরবঙ্গের প্রতিটি মানুষ যেন তাঁর ভাষায়, তাঁর শহরে, ৩০ সেকেন্ডে সঠিক ডাক্তারকে খুঁজে পান — এই লক্ষ্যেই তৈরি স্বাস্থ্য সেতু।'),
      h('h3',{style:'margin-top:16px'}, 'আমাদের কভারেজ'),
      h('p',{class:'muted'}, 'কুচবিহার • শিলিগুড়ি • তুফানগঞ্জ • দিনহাটা • মেখলিগঞ্জ • আলিপুরদুয়ার • জলপাইগুড়ি • দার্জিলিং'),
      h('h3',{style:'margin-top:16px'}, 'বৈশিষ্ট্য'),
      h('ul',{style:'padding-left:18px;margin-top:6px'},
        h('li',{}, 'বাংলা-প্রথম ইন্টারফেস'),
        h('li',{}, '১২০+ ভেরিফাইড ডাক্তার'),
        h('li',{}, 'অফলাইন সাপোর্ট (PWA)'),
        h('li',{}, 'জরুরি কুইক-অ্যাকশন'),
      ),
    )
  ));
}
