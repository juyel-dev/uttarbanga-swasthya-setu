export const $ = (s, r=document) => r.querySelector(s);
export const $$ = (s, r=document) => [...r.querySelectorAll(s)];
export const h = (tag, attrs={}, ...children) => {
  const el = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs||{})){
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of children.flat()){
    if (c == null || c === false) continue;
    el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
};
export const slug = s => String(s).toLowerCase().trim().replace(/[^\w\u0980-\u09FF]+/g,'-').replace(/^-+|-+$/g,'');
export const fmtBn = n => new Intl.NumberFormat('bn-IN').format(n);
export const debounce = (fn, ms=250) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };
export const phoneHref = p => `tel:${String(p).replace(/\s+/g,'')}`;
export const waHref = (p,msg='') => `https://wa.me/${String(p).replace(/\D/g,'')}${msg?`?text=${encodeURIComponent(msg)}`:''}`;
export const mapsHref = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const setMeta = ({title, description, canonical}) => {
  if (title) document.title = title;
  if (description) {
    let m = document.querySelector('meta[name="description"]');
    if (!m){ m = document.createElement('meta'); m.name='description'; document.head.appendChild(m); }
    m.content = description;
  }
  if (canonical){
    let l = document.querySelector('link[rel="canonical"]');
    if (!l){ l=document.createElement('link'); l.rel='canonical'; document.head.appendChild(l); }
    l.href = canonical;
  }
};
