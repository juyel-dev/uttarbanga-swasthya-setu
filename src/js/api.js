// Static seed data layer. Swap fetch base for Supabase later.
import { state } from './state.js';

const cache = new Map();
async function load(file){
  if (cache.has(file)) return cache.get(file);
  const r = await fetch(`/data/${file}.json`);
  if (!r.ok) throw new Error('Failed to load '+file);
  const j = await r.json();
  cache.set(file, j); return j;
}

export const api = {
  async getDoctors(filter={}){
    const all = await load('doctors');
    state.doctors = all;
    let res = all;
    if (filter.specialty) res = res.filter(d => d.specialty_slug === filter.specialty);
    if (filter.city)      res = res.filter(d => d.city_slug === filter.city);
    if (filter.area)      res = res.filter(d => d.area_slug === filter.area);
    if (filter.minRating) res = res.filter(d => d.rating >= filter.minRating);
    if (filter.maxFee)    res = res.filter(d => d.fee <= filter.maxFee);
    if (filter.q){
      const q = filter.q.toLowerCase();
      res = res.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.name_bn.includes(filter.q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.specialty_bn.includes(filter.q) ||
        d.city.toLowerCase().includes(q));
    }
    if (filter.sort === 'fee')        res = [...res].sort((a,b)=>a.fee-b.fee);
    else if (filter.sort === 'exp')   res = [...res].sort((a,b)=>b.experience-a.experience);
    else if (filter.sort === 'reviews') res = [...res].sort((a,b)=>b.reviewCount-a.reviewCount);
    else                              res = [...res].sort((a,b)=>b.rating-a.rating);
    return res;
  },
  async getDoctor(slug){
    const all = await load('doctors');
    return all.find(d => d.slug === slug);
  },
  async getHospitals(filter={}){
    const all = await load('hospitals');
    state.hospitals = all;
    let res = all;
    if (filter.city) res = res.filter(h => h.city_slug === filter.city);
    if (filter.type) res = res.filter(h => h.type === filter.type);
    if (filter.q){
      const q = filter.q.toLowerCase();
      res = res.filter(h => h.name.toLowerCase().includes(q) || h.name_bn.includes(filter.q));
    }
    return res;
  },
  async getHospital(slug){
    const all = await load('hospitals');
    return all.find(h => h.slug === slug);
  },
  async getSymptoms(){
    const s = await load('symptoms'); state.symptoms = s; return s;
  },
  async getSymptom(slug){
    const all = await load('symptoms');
    return all.find(s => s.slug === slug);
  },
};
