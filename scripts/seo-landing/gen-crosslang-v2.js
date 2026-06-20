#!/usr/bin/env node
/* Generic CROSS-LANGUAGE ("Learn <X>") landing generator for the NEWER render contract
 * (fr/it/nl/sv/da/no/fi/pt — render(tpl, themeObj) + per-locale <loc>-themes objects, as opposed to
 * de's render(tpl, nPl, gen)). Sibling of gen-<loc>-readiness.js; same 8x7 coprime cell engine.
 * Cross-language: every entry carries coordinate.target (the taught language ISO) so it never collides
 * with the monolingual same-(type,mode,theme) coordinate; strand from the config; NO `standard`/no
 * educationalAlignment; level = 'language-beginner'.
 *
 * Per-locale inputs (must exist): <loc>-themes.js (THEMES), <loc>-render.js (render(tpl, themeObj),
 * optional assertThemeTable), <loc>-crosslang-<type>.js config, <loc>-<target>-<type>-coordinates.json.
 *
 * Config shape (<loc>-crosslang-<type>.js):
 *   { type, eyebrow, strand, slotWord, level?, modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3,
 *     h1:(modeKey, themeObj, level, themeH1)=>string, carousel:(modeKey, themeH1)=>string }
 *
 * Usage: node scripts/seo-landing/gen-crosslang-v2.js --locale=sv --target=en --type=crossword
 */
'use strict';
const fs = require('fs');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const LOCALE = arg('locale', null);
const TARGET = arg('target', null);
const TYPE = arg('type', null);
// Multi-target page-locales (en→10, es→{en,pt}, pt→{en,es}) parametrize the taught language.
// --targetname="inglés" (lowercase, as used in prose: "palabras en {TGT}"); {TGT_CAP} = capitalized.
const TGT = arg('targetname', null);
const TGT_CAP = TGT ? (TGT.charAt(0).toUpperCase() + TGT.slice(1)) : null;
if (!LOCALE || !TARGET || !TYPE) { console.error('--locale, --target and --type required'); process.exit(1); }
// MULTI-TARGET anti-doorway: en→de and en→fr (same page-locale, same theme, different taught language)
// otherwise share the SAME English skeleton — only the {TGT} word differs → near-duplicate bodies. Offset the
// cell assignment by a per-target constant so the SAME theme lands on a DIFFERENT skeleton+P2 per target.
// 0 for single-target locales (no --targetname) → shipped English-target output byte-identical.
// Explicit, DISTINCT per-target offsets (stride 17, coprime with the 56-cell space) so that within a
// page-locale no two targets map the SAME theme to the SAME (skeleton, P2) cell — eliminates the exact
// same-cell cross-target near-duplicates a hash would leave.
const TARGET_INDEX = { en:0, de:1, es:2, fr:3, it:4, nl:5, pt:6, sv:7, da:8, no:9, fi:10 };
const TARGET_OFFSET = TGT ? ((TARGET_INDEX[TARGET] != null ? TARGET_INDEX[TARGET] : 0) * 17) : 0;
// Per-(page-locale, target) language-fact sentence — genuinely target-SPECIFIC content appended to the
// body so a "Learn German" page and a "Learn French" page are not near-duplicates differing only by the
// language name (the doorway-page failure mode of the multi-target en fan). Optional: locales/targets
// without an entry append nothing. en page-locale only (the dense 10-target case); es/pt are clean without.
const TARGET_NOTES = {
  en: {
    de: 'Here is something special about German: it gives every naming word a capital letter, even a small cat or a ball.',
    es: 'One friendly thing about Spanish: the words are said almost exactly the way they are written.',
    fr: 'French has a playful habit — some letters are written down but stay completely silent when you say the word.',
    it: 'Italian has a musical sound, and many of its everyday words end in a bright -o or -a.',
    nl: 'Dutch likes to join small words together, so a single word can grow surprisingly long.',
    pt: 'Portuguese adds little marks to some letters, like the curly a in "ã", which gives the word a soft nasal sound.',
    sv: 'Swedish has three extra letters at the very end of its alphabet — a, a and o with little marks — that English does not use.',
    da: 'Danish often sounds softer than it looks, so a word can be written one way and spoken a little more gently.',
    no: 'Norwegian shares a lot of everyday words with English, so a few of them feel familiar right away.',
    fi: 'Finnish builds long words by clicking small pieces together, a bit like adding cars to a train.',
  },
};
const NOTE = (TARGET_NOTES[LOCALE] && TARGET_NOTES[LOCALE][TARGET]) || null;
function tgt(s){ return (TGT && typeof s === 'string') ? s.replace(/\{TGT_CAP\}/g, TGT_CAP).replace(/\{TGT\}/g, TGT) : s; }

// themes export shape varies: de/sv/fr/nl/no/da/fi export { THEMES }; it/pt export the map directly.
const _tmod = require('./' + LOCALE + '-themes');
const THEMES = _tmod.THEMES || _tmod;
const rmod = require('./' + LOCALE + '-render');
const render = rmod.render;
const assertThemeTable = rmod.assertThemeTable;
const { validateCoordinate } = require('./validity-gate');
const cfg = require('./' + LOCALE + '-crosslang-' + TYPE);
const OUT = 'frontend/content/seo-landing/' + LOCALE + '.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/' + LOCALE + '-' + TARGET + '-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

// table-level assertion (definiteness/agreement) where the locale exposes one — FAIL-halts.
if (typeof assertThemeTable === 'function') {
  const tf = assertThemeTable(THEMES);
  if (tf && tf.length) { console.error(LOCALE + '-themes ASSERTION FAILED (' + tf.length + '):'); tf.forEach(f => console.error('  ' + f)); process.exit(1); }
}

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i, S, P){ const cells = S*P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// Shape-agnostic accessors across the 3 newer theme shapes:
//   sv/nl/no/da: {plIndef, plDef, h1Display}   fr: {plIndef, gen=GENDER(!), h1Display}
//   it/pt:       {nPl, gen=collective, genArt, h1}   fi: {nomPl, partSg, partPl, genPl, h1Display}
// `gen` is a collective NOUN in it/pt but a GENDER code in fr — so plIndef wins first (fr always has it).
const coll = (x) => x.plIndef || x.gen || x.nomPl || x.h1Display || x.h1;          // collective plural noun
const listForm = (x) => x.nPl || x.plIndef || x.nomPl || x.h1Display || x.h1;       // the {N_PL} example list
const disp = (x) => x.h1Display || x.h1;                                            // display name for h1/carousel

// P3: pre-substitute the neighbour tokens (the locale render can't know them) + {GEN}→own collective,
// THEN run the locale render() so {GEN_ART}/{N_PL}/{N_PART_*}/elision slots all resolve.
function p3(ownTheme, nb1Theme, nb2Theme){
  const pre = cfg.P3
    .replace(/\{NB1\}/g, coll(nb1Theme))
    .replace(/\{NB2\}/g, coll(nb2Theme))
    .replace(/\{GEN\}/g, coll(ownTheme));
  return render(pre, ownTheme);
}

const modeKey = (m) => (m === null ? 'null' : m);
const MODES = Object.keys(cfg.modes);
const LEVEL = cfg.level || 'language-beginner';

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
  const out=[];
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    const c = cellAssign(i + TARGET_OFFSET, sk.length, p2.length);
    // neighbour themes (the P3 "want more?" pair) also shift per target, so same-theme pages for
    // DIFFERENT targets reference DIFFERENT neighbours → P3 diverges across targets (anti-doorway).
    const nb1 = list[(i+1+TARGET_OFFSET)%list.length], nb2 = list[(i+7+TARGET_OFFSET)%list.length];
    const entry = {
      slug: co.canonical,
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level: LEVEL, target: TARGET },
      eyebrow: tgt(cfg.eyebrow),
      h1: tgt(cfg.h1(mk, d, LEVEL, disp(d))),
      strand: tgt(typeof cfg.strand === 'function' ? cfg.strand(mk, LEVEL) : cfg.strand),
      // every theme-noun surface form across all locales, so the theme-noun-in-P1 gate matches whichever
      // case/definiteness a locale's SKEL legitimately uses (fi p1 may carry partitive/genitive, not nominative).
      slotTokens: [d.nPl, d.plIndef, d.plDef, d.nomPl, d.partPl, d.partSg, d.genPl, d.gen && d.genArt ? d.gen : null, disp(d), co.theme.replace(/_/g,' '), cfg.slotWord].filter(Boolean),
      p1: tgt(render(sk[c.skel], d)),
      p2: tgt(render(p2[c.p2], d)) + (NOTE ? ' ' + NOTE : ''),
      p3: tgt(p3(d, THEMES[nb1.theme], THEMES[nb2.theme])),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: tgt(cfg.carousel(mk, disp(THEMES[n.theme]))), href: n.canonical}; }),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ': ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

let cur = { _note: LOCALE.toUpperCase() + ' landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(OUT,'utf8')); } catch (e) {}
// target-aware merge: never clobber monolingual same-type landings (no coordinate.target).
const keep = (cur.landings||[]).filter(l => !(l.coordinate.type===TYPE && (l.coordinate.target||null)===TARGET));
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(OUT, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + LOCALE + ' ' + TYPE + '→' + TARGET + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; ' + LOCALE + '.json total ' + merged.landings.length);

// lints: unsubstituted placeholder + title-uniqueness + short.
let lintFail=0;
generated.forEach(e=>{ const t=e.h1+' '+e.p1+' '+e.p2+' '+e.p3; if(/\{[A-Z_]+\}/.test(t)){ console.log('  UNSUBSTITUTED PLACEHOLDER ' + e.slug); lintFail++; } });
const titles=generated.map(e=>e.h1); const dupT=titles.length-new Set(titles).size;
console.log(dupT ? ('TITLE-DUP: ' + dupT) : ('title-uniqueness: clean (' + titles.length + ')'));
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
console.log(short? (short+' short (<200)') : ('all ' + generated.length + ' >=200 words'));
if (lintFail) { console.error(LOCALE + '-crosslang lint: ' + lintFail + ' FAIL'); process.exit(1); }
