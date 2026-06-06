#!/usr/bin/env node
/* SEO-landing content gate — Phase 5 STEP 3.
 * Runs the §4.B genericness lint + the §4.C cross-page similarity check
 * (raw + slot-normalized, whole-page + per-paragraph) over the pilot copy.
 * No deps. Usage: node scripts/seo-landing/gate.js [path-to-en.json]
 */
const fs = require('fs');
const path = require('process').argv[2] || 'frontend/content/seo-landing/en.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const pages = data.landings;

const BANNED = [
  'fun and engaging','fun and interactive','perfect for','ideal for','great for',
  'dive into','dive in','great way to','wonderful way to','excellent way to',
  "in today's classroom",'in the modern classroom','sneaky','find a way in',
  'something for everyone','one of the earliest','one of the oldest','one of the most important forms of',
  'engaging','captivating','delightful','amazing','watch as they learn','before you know it',
  'in no time','boost','supercharge','unlock','easy and fun','simple yet effective'];

function words(s){ return (s.toLowerCase().match(/[a-z0-9]+/g)||[]); }
function grams(s,n){ const w=words(s); const g=new Set(); for(let i=0;i+n<=w.length;i++) g.add(w.slice(i,i+n).join(' ')); return g; }
function jaccard(a,b){ if(a.size===0&&b.size===0) return 1; let inter=0; for(const x of a) if(b.has(x)) inter++; return inter/(a.size+b.size-inter); }
function normalize(text, tokens){ let t=' '+text.toLowerCase()+' '; for(const tok of (tokens||[])){ const re=new RegExp('\\b'+tok.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'); t=t.replace(re,' __slot__ '); } return t; }

// ---- genericness + structural lints
console.log('=== §4.B genericness + structural lints ===');
let lintFails=0;
for(const p of pages){
  const body=[p.p1,p.p2,p.p3].join(' ');
  const wc=words(body).length;
  const hits=BANNED.filter(b=> body.toLowerCase().includes(b));
  const themeNounInP1 = (p.slotTokens||[]).some(t=> p.p1.toLowerCase().includes(t.toLowerCase()));
  const issues=[];
  if(wc<200) issues.push('WORDCOUNT '+wc+'<200');
  if(hits.length) issues.push('BANNED ['+hits.join(', ')+']');
  if(!themeNounInP1) issues.push('NO theme-noun in P1');
  if(issues.length){ lintFails++; console.log('  FAIL '+p.slug+': '+issues.join(' | ')); }
}
console.log(lintFails? ('  -> '+lintFails+' lint fails'):'  -> all '+pages.length+' pages pass lint (≥200 words, no banned phrases, theme-noun in P1)');

// ---- similarity
const N=3;
function pageGrams(p, normed){ const txt=[p.p1,p.p2,p.p3].join(' '); return grams(normed?normalize(txt,p.slotTokens):txt, N); }
function paraGrams(p, key, normed){ return grams(normed?normalize(p[key],p.slotTokens):p[key], N); }

function pairStats(subset, normed, paraKey){
  let max=0, sum=0, cnt=0, over80=0, over65=0, over85=0, maxPair='';
  for(let i=0;i<subset.length;i++) for(let j=i+1;j<subset.length;j++){
    const a=paraKey?paraGrams(subset[i],paraKey,normed):pageGrams(subset[i],normed);
    const b=paraKey?paraGrams(subset[j],paraKey,normed):pageGrams(subset[j],normed);
    const J=jaccard(a,b); sum+=J; cnt++;
    if(J>max){max=J; maxPair=subset[i].slug+' ~ '+subset[j].slug;}
    if(J>=0.80)over80++; if(J>=0.65)over65++; if(J>0.85)over85++;
  }
  return {max:max.toFixed(3), mean:(sum/cnt).toFixed(3), pairs:cnt, over80, over65, over85, maxPair};
}

function classKey(p){return p.coordinate.type+'/'+p.coordinate.mode;}
const all = pages;

// auto-discover (type,mode) clusters with >=2 pages
const clusters = {};
for(const p of all){ (clusters[classKey(p)]=clusters[classKey(p)]||[]).push(p); }
const clusterKeys = Object.keys(clusters).filter(k=>clusters[k].length>=2).sort();

// full top-N pair distribution (raw whole-page, every pair within+cross)
function topPairs(subset, normed, n){
  const arr=[];
  for(let i=0;i<subset.length;i++) for(let j=i+1;j<subset.length;j++){
    arr.push([jaccard(pageGrams(subset[i],normed),pageGrams(subset[j],normed)), subset[i].slug, subset[j].slug, classKey(subset[i]), classKey(subset[j])]);
  }
  arr.sort((a,b)=>b[0]-a[0]);
  return arr.slice(0,n);
}

console.log('\n=== §4.C similarity — per-(type,mode) WITHIN-CLASS clusters (whole-page RAW) ===');
let worstWithinMax=0, worstWithinPair='', anyClusterFail=false, anyDensityAlarm=false, anyP1Warn=false;
for(const k of clusterKeys){
  const c=clusters[k];
  const wp=pairStats(c,false), p1=pairStats(c,false,'p1');
  if(parseFloat(wp.max)>worstWithinMax){worstWithinMax=parseFloat(wp.max);worstWithinPair=wp.maxPair;}
  if(wp.over80>0)anyClusterFail=true;
  if(parseFloat(wp.mean)>0.75)anyDensityAlarm=true;
  if(parseFloat(p1.mean)>0.70)anyP1Warn=true;
  console.log('  '+k+' (n='+c.length+'): max '+wp.max+' mean '+wp.mean+' #FAIL>=0.80='+wp.over80+' #WARN>=0.65='+wp.over65+' | P1-raw mean '+p1.mean+(parseFloat(p1.mean)>0.70?' WARN':'')+' | maxPair '+wp.maxPair);
}

const wpa=pairStats(all,false);
console.log('\n=== cross-class + within: ALL '+all.length+' landings, whole-page RAW ===');
console.log('  ALL-PAIRS: '+JSON.stringify(wpa));

console.log('\n=== full distribution: TOP-10 raw whole-page pairs (within+cross) ===');
topPairs(all,false,10).forEach((r,idx)=> console.log('  '+(idx+1)+'. '+r[0].toFixed(3)+'  '+r[1]+' ~ '+r[2]+'  ('+r[3]+(r[3]===r[4]?'':' vs '+r[4])+')'));

// cross-class slot-normalized: does any DIFFERENT (type,mode) class collide on template?
let xmax=0,xpair='';
for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++){
  if(classKey(all[i])===classKey(all[j])) continue;
  const J=jaccard(pageGrams(all[i],true),pageGrams(all[j],true));
  if(J>xmax){xmax=J;xpair=all[i].slug+' ~ '+all[j].slug+' ('+classKey(all[i])+' vs '+classKey(all[j])+')';}
}
console.log('\n=== cross-class template-collision probe (slot-normalized whole-page, DIFFERENT (type,mode) only) ===');
console.log('  max cross-class slot-normalized Jaccard: '+xmax.toFixed(3)+'  ['+xpair+']');

console.log('\n=== VERDICT vs LOCKED thresholds (2026-06-06 calibration) ===');
console.log('  [1] cannibalization = WHOLE-PAGE RAW: FAIL>=0.80 / WARN 0.65-0.80 / PASS<0.65 (within+cross)');
console.log('      worst within-class max: '+worstWithinMax.toFixed(3)+'  ['+worstWithinPair+']  -> '+(anyClusterFail?'FAIL':'PASS'));
console.log('      all-pairs max:          '+wpa.max+' #FAIL(>=0.80)='+wpa.over80+' #WARN(>=0.65)='+wpa.over65+'  -> '+(wpa.over80? 'FAIL':'PASS'));
console.log('  [2] cluster-density (whole-page-raw mean) alarm>0.75 (per cluster): '+(anyDensityAlarm?'ALARM':'OK'));
console.log('  [3] cross-class slot-norm template-collision FAIL>=0.90: max='+xmax.toFixed(3)+'  -> '+(xmax>=0.90?'FAIL':'PASS'));
console.log('  [4] P1-raw cluster-mean WARN>0.70 (per cluster): '+(anyP1Warn?'WARN (a cluster P1 is thin; enrich)':'ok'));
console.log('      (per-paragraph 0.85 FAIL + within-class slot-norm = RETIRED per ruling — they misfire on the intended template/variant design)');
