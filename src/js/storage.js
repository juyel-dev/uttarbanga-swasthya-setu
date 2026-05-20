const PREFIX = 'uss:';
export const storage = {
  get(k, fallback=null){
    try { const v = localStorage.getItem(PREFIX+k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(k, v){ try { localStorage.setItem(PREFIX+k, JSON.stringify(v)); } catch {} },
  del(k){ try { localStorage.removeItem(PREFIX+k); } catch {} },
};
