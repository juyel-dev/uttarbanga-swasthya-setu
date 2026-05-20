import { h } from '../js/utils.js';
export function bannerSlider(){
  const slides = [
    {cls:'', title:'উত্তরবঙ্গের সেরা ডাক্তার একসাথে', sub:'১২০+ বিশেষজ্ঞ • ৮টি শহর', emoji:'👨‍⚕️'},
    {cls:'s2', title:'জরুরি অবস্থায় এক ক্লিকে অ্যাম্বুলেন্স', sub:'২৪ ঘণ্টা হেল্পলাইন — ১০৮', emoji:'🚑'},
    {cls:'s3', title:'উপসর্গ দেখে বুঝুন কোন ডাক্তার', sub:'সহজ বাংলায় স্বাস্থ্য গাইড', emoji:'🩺'},
  ];
  const track = h('div',{class:'slider-track'});
  slides.forEach(s => track.appendChild(
    h('div',{class:'slide '+s.cls},
      h('div',{style:'font-size:48px;margin-bottom:8px'}, s.emoji),
      h('h3',{}, s.title),
      h('p',{}, s.sub),
    )
  ));
  const dots = h('div',{class:'slider-dots'});
  slides.forEach((_,i)=>dots.appendChild(h('span',{class:'dot'+(i===0?' active':'')})));
  const wrap = h('div',{class:'slider'}, track, dots);
  // auto-advance
  let i = 0;
  const adv = setInterval(()=>{
    if (!document.body.contains(track)){ clearInterval(adv); return; }
    i = (i+1) % slides.length;
    track.scrollTo({ left: i * track.clientWidth, behavior:'smooth' });
  }, 4500);
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    [...dots.children].forEach((d,k)=>d.classList.toggle('active', k===idx));
  });
  return wrap;
}
