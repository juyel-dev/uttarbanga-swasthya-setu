const routes = [];
export const route = (pattern, handler) => routes.push({ pattern, handler });
const match = (path) => {
  for (const r of routes){
    if (typeof r.pattern === 'string'){
      if (r.pattern === path) return { handler: r.handler, params:{} };
    } else {
      const m = path.match(r.pattern);
      if (m) return { handler: r.handler, params: m.groups || {} };
    }
  }
  return null;
};
export const navigate = (path, replace=false) => {
  if (replace) history.replaceState({}, '', path);
  else history.pushState({}, '', path);
  render();
};
const parseQuery = s => Object.fromEntries(new URLSearchParams(s));
export const render = async () => {
  const path = location.pathname || '/';
  const query = parseQuery(location.search);
  const found = match(path);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.classList.remove('fade-in'); void app.offsetWidth; app.classList.add('fade-in');
  if (!found){
    const { renderNotFound } = await import('../pages/offline.js');
    renderNotFound(app); return;
  }
  try { await found.handler({ params: found.params, query, app }); }
  catch(e){ console.error(e); app.innerHTML = `<div class="container section"><h2>কিছু সমস্যা হয়েছে</h2><p class="muted">${e.message}</p></div>`; }
  window.scrollTo({ top:0, behavior:'instant' });
};
window.addEventListener('popstate', render);
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-link]');
  if (!a) return;
  e.preventDefault();
  navigate(a.getAttribute('href'));
});
