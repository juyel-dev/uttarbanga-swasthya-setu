import { storage } from './storage.js';
const listeners = new Set();
export const state = {
  city: storage.get('city', 'cooch-behar'),
  cityLabel: storage.get('cityLabel', 'কুচবিহার'),
  onboarded: storage.get('onboarded', false),
  doctors: [], hospitals: [], symptoms: [], ads: [],
};
export const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn); };
export const notify = () => listeners.forEach(fn => fn(state));
export const setCity = (slug, label) => {
  state.city = slug; state.cityLabel = label;
  storage.set('city', slug); storage.set('cityLabel', label);
  notify();
};
