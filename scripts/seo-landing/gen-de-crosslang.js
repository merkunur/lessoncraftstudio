#!/usr/bin/env node
/* DE cross-language ("Learn English") landing generator — sibling of gen-de-readiness.js.
 * Config-driven: reads de-crosslang-<type>.js + de-en-<type>-coordinates.json + de-themes + de-render.
 * CROSS-LANGUAGE: every entry carries coordinate.target (the taught language ISO) so it never collides
 * with the monolingual same-(type,mode,theme) coordinate; strand = "Englisch · Wortschatz"; NO `standard`
 * / no educationalAlignment; level = 'language-beginner'. Gender-safe plural-only frames; 8×7 coprime cells.
 *
 * Config shape (de-crosslang-<type>.js):
 *   { type, eyebrow, strand, level, slotWord, modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3,
 *     h1:(modeKey,nplDat,level,themeH1)=>string, carousel:(modeKey,themeH1)=>string }
 *
 * Usage: node scripts/seo-landing/gen-de-crosslang.js --type=crossword --target=en
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./de-themes');
const { datN, render } = require('./de-render');
const { validateCoordinate } = require('./validity-gate');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPE = arg('type', null);
const TARGET = arg('target', 'en');
if (!TYPE) { console.error('--type required'); process.exit(1); }
const cfg = require('./de-crosslang-' + TYPE);
const DE = 'frontend/content/seo-landing/de.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/de-' + TARGET + '-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i, S, P){ const cells = S*P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

function p3de(gen, nb1, nb2){
  return cfg.P3.replace(/mit den \{NB2\}/g, 'mit den ' + datN(nb2)).replace(/\{NB1\}/g, nb1).replace(/\{NB2\}/g, nb2).replace(/\{GEN\}/g, gen);
}

const modeKey = (m) => (m === null ? 'null' : m);
const MODES = Object.keys(cfg.modes);

function buildMode(mk){
  const wantMode = (mk === 'null') ? null : mk;
  const raw = COORDS.filter(c => modeKey(c.mode) === mk).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const dropped=[]; let blocked=0;
  const list = raw.filter(co=>{
    if(!THEMES[co.theme]){ console.log('NO COPY DATA for theme ' + co.theme + ' (' + mk + ')'); blocked++; return false; }
    const v = validateCoordinate(TYPE, wantMode, co.theme, {});
    if(!v.valid){ dropped.push(co.theme); blocked++; return false; }
    return true;
  });
  const sk = cfg.modes[mk].SKEL, p2 = cfg.modes[mk].P2, cells = sk.length*p2.length;
  console.log('  ' + (cells>list.length?'[invariant OK]':'[INVARIANT WARN]') + ' ' + TYPE + '/' + mk + ': cells ' + sk.length + 'x' + p2.length + '=' + cells + ' vs themes ' + list.length);
  const LEVEL = cfg.level || 'language-beginner';
  const out=[];
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    const c = cellAssign(i, sk.length, p2.length);
    const nb1 = list[(i+1)%list.length], nb2 = list[(i+7)%list.length];
    const entry = {
      slug: co.canonical,
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level: LEVEL, target: TARGET },
      eyebrow: cfg.eyebrow,
      h1: cfg.h1(mk, datN(d.nPl), LEVEL, d.h1),
      strand: (typeof cfg.strand === 'function' ? cfg.strand(mk, LEVEL) : cfg.strand),
      slotTokens: d.nPl.replace(/ und /g,', ').split(', ').map(s=>s.trim()).concat([d.gen, co.theme.replace(/_/g,' '), cfg.slotWord]),
      p1: render(sk[c.skel], d.nPl, d.gen),
      p2: render(p2[c.p2], d.nPl, d.gen),
      p3: p3de(d.gen, THEMES[nb1.theme].gen, THEMES[nb2.theme].gen),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: cfg.carousel(mk, THEMES[n.theme].h1), href: n.canonical}; }),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ': ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

let cur = { _note: 'DE landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(DE,'utf8')); } catch (e) {}
// Target-aware merge: keep everything EXCEPT this (type, target) cross-language slice — never clobber
// the monolingual same-type landings (which have no coordinate.target).
const keep = (cur.landings||[]).filter(l => !(l.coordinate.type===TYPE && (l.coordinate.target||null)===TARGET));
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(DE, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + TYPE + '→' + TARGET + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; de.json total ' + merged.landings.length);

// title-uniqueness lint (per §22: a title collision is a HALT-class SEO defect).
const titles = generated.map(e=>e.h1);
const dupT = titles.length - new Set(titles).size;
console.log(dupT ? ('TITLE-DUP: ' + dupT + ' duplicate h1/title!') : ('title-uniqueness: clean (' + titles.length + ' distinct)'));

// gender-lint (reuse the readiness whitelist spirit: flag slotted singular theme nouns).
let lintFail=0;
generated.forEach(e=>{
  const text = e.h1 + ' ' + e.p1 + ' ' + e.p2 + ' ' + e.p3;
  (text.match(/\b(ein|eine)\s+([A-ZÄÖÜ][a-zäöüß]+)/g) || []).forEach(hit=>{
    console.log('  GENDER-LINT ? ' + e.slug + ' :: "' + hit + '"'); lintFail++;
  });
});
console.log(lintFail? ('gender-lint: ' + lintFail + ' to eyeball') : 'gender-lint: clean');
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
console.log(short? (short+' short (<200)') : ('all ' + generated.length + ' >=200 words'));
