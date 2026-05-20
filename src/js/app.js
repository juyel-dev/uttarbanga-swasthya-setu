import { route, render } from './router.js';
import { renderHome } from '../pages/home.js';
import { renderDoctors } from '../pages/doctors.js';
import { renderDoctorProfile } from '../pages/doctor-profile.js';
import { renderHospitals } from '../pages/hospitals.js';
import { renderHospitalDetail } from '../pages/hospital-detail.js';
import { renderSymptoms } from '../pages/symptoms.js';
import { renderSymptomDetail } from '../pages/symptom-detail.js';
import { renderMore } from '../pages/more.js';
import { renderAbout } from '../pages/about.js';
import { renderSupport } from '../pages/support.js';
import { renderSearchResults } from '../pages/search-results.js';
import { renderOffline } from '../pages/offline.js';

// Routes
route('/', renderHome);
route('/doctors', renderDoctors);
route(/^\/doctor\/(?<slug>[\w-]+)$/, renderDoctorProfile);
route('/hospitals', renderHospitals);
route(/^\/hospital\/(?<slug>[\w-]+)$/, renderHospitalDetail);
route('/symptoms', renderSymptoms);
route(/^\/symptoms\/(?<slug>[\w-]+)$/, renderSymptomDetail);
route('/more', renderMore);
route('/about', renderAbout);
route('/support', renderSupport);
route('/privacy', renderAbout);
route('/search', renderSearchResults);
route('/offline', renderOffline);

// Splash hide
window.addEventListener('load', () => {
  setTimeout(() => {
    const sp = document.getElementById('splash');
    if (sp) { sp.classList.add('hide'); setTimeout(()=>sp.remove(), 500); }
  }, 900);
});

// Register service worker (production only — skipped in iframes/preview)
const inIframe = (()=>{ try { return window.self !== window.top; } catch { return true; } })();
if ('serviceWorker' in navigator && !inIframe && location.hostname !== 'localhost'){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwa/sw.js').catch(()=>{});
  });
}

// Online/offline
window.addEventListener('offline', () => {
  if (location.pathname !== '/offline') history.pushState({}, '', '/offline');
  render();
});

render();
