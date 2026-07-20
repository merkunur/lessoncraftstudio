#!/usr/bin/env node
/* SEO-landing content gate — Phase 5 STEP 3.
 * Runs the §4.B genericness lint + the §4.C cross-page similarity check
 * (raw + slot-normalized, whole-page + per-paragraph) over the pilot copy.
 * No deps. Usage: node scripts/seo-landing/gate.js [path-to-en.json]
 */
const fs = require('fs');
const path = require('process').argv[2] || 'frontend/content/seo-landing/en.json';
// fi tokenizer fix: the default [a-z0-9] strips ä/ö/å (very common in Finnish) → fragments
// words → UNDER-reports similarity for fi. Widen to a \p{L} Unicode tokenizer ONLY for fi.json
// so the other 10 locales' scores are byte-identical (the swirling-bengio recommendation).
const IS_FI = /\bfi\.json$/.test(path.replace(/\\/g, '/'));
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const pages = data.landings;

const BANNED = [
  'fun and engaging','fun and interactive','perfect for','ideal for','great for',
  'dive into','dive in','great way to','wonderful way to','excellent way to',
  "in today's classroom",'in the modern classroom','sneaky','find a way in',
  'something for everyone','one of the earliest','one of the oldest','one of the most important forms of',
  'engaging','captivating','delightful','amazing','watch as they learn','before you know it',
  'in no time','boost','supercharge','unlock','easy and fun','simple yet effective'];

function words(s){ return (s.toLowerCase().match(IS_FI ? /[\p{L}0-9]+/gu : /[a-z0-9]+/g)||[]); }
function grams(s,n){ const w=words(s); const g=new Set(); for(let i=0;i+n<=w.length;i++) g.add(w.slice(i,i+n).join(' ')); return g; }
function jaccard(a,b){ if(a.size===0&&b.size===0) return 1; let inter=0; for(const x of a) if(b.has(x)) inter++; return inter/(a.size+b.size-inter); }
function normalize(text, tokens){ let t=' '+text.toLowerCase()+' '; for(const tok of (tokens||[])){ const re=new RegExp('\\b'+tok.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'); t=t.replace(re,' __slot__ '); } return t; }

// ---- genericness + structural lints
console.log('=== §4.B genericness + structural lints ===');
// Reserved-slug invariant (Gate-1 browse-layer ruling 2026-06-12): a landing slug
// must never equal a bare reserved word — these are held open for future
// /worksheets/ sub-routes (the hub's browser/facet machinery).
const RESERVED_SLUGS = new Set(['browse','all','filter','filters','search','index']);
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
  if(RESERVED_SLUGS.has(p.slug)) issues.push('RESERVED SLUG "'+p.slug+'"');
  if(issues.length){ lintFails++; console.log('  FAIL '+p.slug+': '+issues.join(' | ')); }
}
console.log(lintFails? ('  -> '+lintFails+' lint fails'):'  -> all '+pages.length+' pages pass lint (≥200 words, no banned phrases, theme-noun in P1)');

// ---- similarity
const N=3;
// Memoized: these are called from O(n^2) pair loops (7.2M pairs at n=3,793), so
// recomputing the 3-gram set per comparison meant ~14M gram builds over ~270-word
// bodies and the gate never finished on a full locale. Results are identical.
const _pgCache = [new Map(), new Map()]; // [raw, slot-normalized]
function pageGrams(p, normed){
  const c = _pgCache[normed ? 1 : 0];
  let g = c.get(p);
  if (!g) { const txt=[p.p1,p.p2,p.p3].join(' '); g = grams(normed?normalize(txt,p.slotTokens):txt, N); c.set(p, g); }
  return g;
}
const _paraCache = new Map();
function paraGrams(p, key, normed){
  const ck = key + (normed ? ':n' : ':r');
  let m = _paraCache.get(ck);
  if (!m) { m = new Map(); _paraCache.set(ck, m); }
  let g = m.get(p);
  if (!g) { g = grams(normed?normalize(p[key],p.slotTokens):p[key], N); m.set(p, g); }
  return g;
}

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

function classKey(p){return p.coordinate.type+'/'+p.coordinate.mode+(p.coordinate.target?'/t:'+p.coordinate.target:'');}
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

/* ===========================================================================
 * §4.E  title + metaDescription distinctness   (added 2026-07-20)
 *
 * WHY THIS EXISTS. Everything above scores only p1/p2/p3. That is exactly why
 * `title` and `metaDescription` were free to drift to pairwise 0.42-0.69 — above
 * this gate's own WARN line — completely unnoticed, while the prose they sit on
 * scored a healthy 0.13-0.31. Those two fields are the first thing Google reads
 * and the only thing a searcher sees in the SERP, so they are now gated too.
 *
 * The decisive check for titles is NOT Jaccard but the PREFIX assertion: Google
 * truncates around 50-60 characters, so ~50 siblings sharing an identical first
 * 52 characters all present the SAME title in results, whatever follows.
 * =========================================================================== */
const PREFIX_LEN = 50;
const META_MIN = 120, META_MAX = 170;

function fieldGrams(p, key) { return grams(String(p[key] || ''), N); }
function pairStatsPre(gs, subset) {
  let max = 0, sum = 0, cnt = 0, over80 = 0, over65 = 0, maxPair = '';
  for (let i = 0; i < gs.length; i++) for (let j = i + 1; j < gs.length; j++) {
    const J = jaccard(gs[i], gs[j]); sum += J; cnt++;
    if (J > max) { max = J; maxPair = subset[i].slug + ' ~ ' + subset[j].slug; }
    if (J >= 0.80) over80++; if (J >= 0.65) over65++;
  }
  return { max, mean: cnt ? sum / cnt : 0, pairs: cnt, over80, over65, maxPair };
}

console.log('\n=== §4.E title + meta distinctness ===');

// --- the decisive one: shared truncated-title prefixes -----------------------
const prefixGroups = new Map();
let missingTitle = 0, missingMeta = 0, metaOutOfBand = 0;
for (const p of pages) {
  const t = String(p.title || '');
  if (!t) { missingTitle++; continue; }
  const k = t.slice(0, PREFIX_LEN).toLowerCase().trim();
  if (!prefixGroups.has(k)) prefixGroups.set(k, []);
  prefixGroups.get(k).push(p.slug);
}
for (const p of pages) {
  const m = String(p.metaDescription || '');
  if (!m) { missingMeta++; continue; }
  if (m.length < META_MIN || m.length > META_MAX) metaOutOfBand++;
}
const collidingPrefixes = [...prefixGroups.entries()].filter(([, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length);
const pagesInCollidingPrefix = collidingPrefixes.reduce((a, [, v]) => a + v.length, 0);

console.log('  [P] shared first-' + PREFIX_LEN + '-char title prefixes: ' + collidingPrefixes.length +
  ' groups covering ' + pagesInCollidingPrefix + ' of ' + pages.length + ' pages -> ' +
  (collidingPrefixes.length ? 'FAIL' : 'PASS'));
for (const [pfx, slugs] of collidingPrefixes.slice(0, 5)) {
  console.log('      ' + String(slugs.length).padStart(4) + ' pages share "' + pfx + '…"  e.g. ' + slugs.slice(0, 3).join(', '));
}
if (missingTitle) console.log('      WARN ' + missingTitle + ' pages have no title (route falls back to h1)');
if (missingMeta) console.log('      WARN ' + missingMeta + ' pages have no metaDescription (route falls back to first sentence of p1 — which is UNIQUE, so this is healthier than a templated one)');
if (metaOutOfBand) console.log('      WARN ' + metaOutOfBand + ' metaDescriptions outside the ' + META_MIN + '-' + META_MAX + ' band expected by the §21.2 preband step');

// --- Jaccard, per cluster then all-pairs -------------------------------------
let worstTitle = 0, worstTitlePair = '', worstMeta = 0, worstMetaPair = '';
let titleClusterFail = false, metaClusterFail = false;
for (const k of clusterKeys) {
  const c = clusters[k];
  // Pages with an EMPTY field must be excluded from the Jaccard, not scored:
  // jaccard() returns 1.0 for two empty sets by definition, so a cluster whose
  // titles are all absent (the cross-language decks, which legitimately fall back
  // to h1) would otherwise report a perfect-1.000 collision that does not exist.
  // Absence is already surfaced by the missingTitle / missingMeta warnings above.
  const ct = c.filter((p) => String(p.title || '').trim());
  const cm = c.filter((p) => String(p.metaDescription || '').trim());
  if (ct.length < 2 && cm.length < 2) continue;
  const ts = pairStatsPre(ct.map((p) => fieldGrams(p, 'title')), ct);
  const ms = pairStatsPre(cm.map((p) => fieldGrams(p, 'metaDescription')), cm);
  if (ts.max > worstTitle) { worstTitle = ts.max; worstTitlePair = ts.maxPair; }
  if (ms.max > worstMeta) { worstMeta = ms.max; worstMetaPair = ms.maxPair; }
  if (ts.over80) titleClusterFail = true;
  if (ms.over80) metaClusterFail = true;
  if (ts.mean >= 0.65 || ms.mean >= 0.65 || ts.over80 || ms.over80) {
    console.log('  ' + k + ' (n=' + c.length + '): TITLE mean ' + ts.mean.toFixed(3) + ' max ' + ts.max.toFixed(3) +
      ' #FAIL=' + ts.over80 + ' | META mean ' + ms.mean.toFixed(3) + ' max ' + ms.max.toFixed(3) + ' #FAIL=' + ms.over80);
  }
}
console.log('  [T] worst within-class TITLE max: ' + worstTitle.toFixed(3) + '  [' + worstTitlePair + ']  -> ' + (titleClusterFail ? 'FAIL' : 'PASS'));
console.log('  [M] worst within-class META  max: ' + worstMeta.toFixed(3) + '  [' + worstMetaPair + ']  -> ' + (metaClusterFail ? 'FAIL' : 'PASS'));

const titleMetaPass = !collidingPrefixes.length && !titleClusterFail && !metaClusterFail;

console.log('\n=== VERDICT vs LOCKED thresholds (2026-06-06 calibration) ===');
console.log('  [1] cannibalization = WHOLE-PAGE RAW: FAIL>=0.80 / WARN 0.65-0.80 / PASS<0.65 (within+cross)');
console.log('      worst within-class max: '+worstWithinMax.toFixed(3)+'  ['+worstWithinPair+']  -> '+(anyClusterFail?'FAIL':'PASS'));
console.log('      all-pairs max:          '+wpa.max+' #FAIL(>=0.80)='+wpa.over80+' #WARN(>=0.65)='+wpa.over65+'  -> '+(wpa.over80? 'FAIL':'PASS'));
console.log('  [2] cluster-density (whole-page-raw mean) alarm>0.75 (per cluster): '+(anyDensityAlarm?'ALARM':'OK'));
console.log('  [3] cross-class slot-norm template-collision FAIL>=0.90: max='+xmax.toFixed(3)+'  -> '+(xmax>=0.90?'FAIL':'PASS'));
console.log('  [4] P1-raw cluster-mean WARN>0.70 (per cluster): '+(anyP1Warn?'WARN (a cluster P1 is thin; enrich)':'ok'));
console.log('  [5] title/meta distinctness (§4.E): shared-'+PREFIX_LEN+'-char-prefix groups='+collidingPrefixes.length+
  ', worst TITLE '+worstTitle.toFixed(3)+', worst META '+worstMeta.toFixed(3)+'  -> '+(titleMetaPass?'PASS':'FAIL'));
console.log('      (per-paragraph 0.85 FAIL + within-class slot-norm = RETIRED per ruling — they misfire on the intended template/variant design)');
