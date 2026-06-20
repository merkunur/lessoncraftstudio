#!/usr/bin/env node
/* Locale-parameterized standalone generator for alphabet-train / mode=letter-hint landings (NON-DE locales).
 * The newer per-locale gens (gen-es-readiness etc.) are single-mode and heterogeneous, so instead of bending
 * each one we generate the letter-hint set directly, ADDITIVELY (keep every existing landing except
 * (type=alphabet-train, mode=letter-hint)) → the existing null-mode landings are NEVER touched.
 *
 * Theme display uses ONE invariant token {T} = taxonomy axes.theme.<key>.name.<locale> (e.g. es "Animales",
 * fr "Animaux"), so the prose needs no per-locale plural/case/definiteness engine — the prose module phrases
 * around {T} as a fixed noun phrase (the es {TEMA} pattern). READINESS: no `standard`/educationalAlignment.
 * level is inherited from the locale's existing null alphabet-train landings (vorschule/preescolar/…).
 *
 * Per-locale prose module  scripts/seo-landing/<loc>-letterhint-prose.js:
 *   { eyebrow, strand, h1:(T)=>s, title:(T)=>s, meta:(T)=>s, carousel:(T)=>s, SKEL:[8 with {T}], P2:[7 with {T}], P3:(T)=>s }
 *
 * Usage: node scripts/seo-landing/gen-alphabet-train-letterhint-i18n.js --locale=es
 */
'use strict';
const fs = require('fs');
const LOC = (process.argv.find(a => a.indexOf('--locale=') === 0) || '').split('=')[1];
if (!LOC) { console.error('--locale=<loc> required'); process.exit(1); }

const prose = require('./' + LOC + '-letterhint-prose.js');
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/' + LOC + '-alphabet-train-letterhint-coordinates.json', 'utf8')).coordinates;
const TAX = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const THEME_AXIS = (TAX.axes && TAX.axes.theme) || {};
const CONTENT = 'frontend/content/seo-landing/' + LOC + '.json';

function themeName(key) {
  const e = THEME_AXIS[key];
  return (e && e.name && e.name[LOC]) ? e.name[LOC] : null;
}

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }
function sub(tpl, T){ return tpl.replace(/\{T\}/g, T); }

// inherit the locale's existing null alphabet-train level (vorschule / preescolar / …); fallback preschool.
const cur = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
const nullAT = cur.landings.find(l => l.coordinate && l.coordinate.type === 'alphabet-train' && l.coordinate.mode == null);
const LEVEL = (nullAT && nullAT.coordinate && nullAT.coordinate.level) || 'preschool';

const list = COORDS.slice().filter(co => !!themeName(co.theme)).sort((a,b)=> a.theme<b.theme?-1:1);
const dropped = COORDS.filter(co => !themeName(co.theme)).map(c=>c.theme);
const cells = prose.SKEL.length * prose.P2.length;
console.log('[' + LOC + '] level=' + LEVEL + ' | ' + (cells>list.length?'[invariant OK]':'[INVARIANT WARN]') + ' ' + prose.SKEL.length + 'x' + prose.P2.length + '=' + cells + ' vs themes ' + list.length + (dropped.length?(' | dropped: '+dropped.join(', ')):''));

const out = list.map((co, i) => {
  const T = themeName(co.theme);
  const cell = cellAssign(i, prose.SKEL.length, prose.P2.length);
  const nb = [1,2,5,11].map(off => list[(i+off)%list.length]);
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'alphabet-train', mode:'letter-hint', theme:co.theme, level: LEVEL },
    eyebrow: prose.eyebrow,
    h1: prose.h1(T),
    strand: prose.strand,
    slotTokens: [T, co.theme.replace(/_/g,' '), LEVEL].concat(prose.extraTokens || []),
    p1: sub(prose.SKEL[cell.skel], T),
    p2: sub(prose.P2[cell.p2], T),
    p3: prose.P3(T),
    canonicalDeckSlug: co.canonical,
    carousel: nb.map(n => ({ label: prose.carousel(themeName(n.theme)), href: n.canonical })),
    title: prose.title(T),
    metaDescription: prose.meta(T),
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  return entry;
});

const keep = cur.landings.filter(l => !(l.coordinate.type === 'alphabet-train' && l.coordinate.mode === 'letter-hint'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(CONTENT, JSON.stringify(merged, null, 2) + '\n');
console.log('[' + LOC + '] generated ' + out.length + ' letter-hint landings (dropped ' + dropped.length + '); ' + LOC + '.json total ' + merged.landings.length);

// self-lint
let short=0, banned=0, phon=0, noTok=0;
const BAN=['fun and engaging','perfect for','great for'];
const SOUNDWORDS=prose.soundWords || []; // per-locale "sound" words to forbid (visual letter only)
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log('  SHORT '+e.slug+': '+w);}
  SOUNDWORDS.forEach(x=>{ if(x && lc.includes(String(x).toLowerCase())){phon++; console.log('  SOUND-LEAK '+e.slug+': "'+x+'"');} });
  if(!e.p1.toLowerCase().includes(String(e.slotTokens[0]).toLowerCase())){noTok++; console.log('  NO-THEME-TOKEN-IN-P1 '+e.slug);}
});
console.log('[' + LOC + '] lint: ' + (short?short+' short':'all>=200') + ' | ' + (phon?phon+' SOUND-LEAK':'no sound-leak') + ' | ' + (noTok?noTok+' no-token-in-P1':'theme-token in every P1'));
