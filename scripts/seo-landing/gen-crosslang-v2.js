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
if (!LOCALE || !TARGET || !TYPE) { console.error('--locale, --target and --type required'); process.exit(1); }

const { THEMES } = require('./' + LOCALE + '-themes');
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

// own/neighbour collective for P3 — newer themes expose plIndef.
function p3(ownTheme, nb1Theme, nb2Theme){
  return cfg.P3
    .replace(/\{NB1\}/g, nb1Theme.plIndef)
    .replace(/\{NB2\}/g, nb2Theme.plIndef)
    .replace(/\{GEN\}/g, ownTheme.plIndef);
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
    const c = cellAssign(i, sk.length, p2.length);
    const nb1 = list[(i+1)%list.length], nb2 = list[(i+7)%list.length];
    const entry = {
      slug: co.canonical,
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level: LEVEL, target: TARGET },
      eyebrow: cfg.eyebrow,
      h1: cfg.h1(mk, d, LEVEL, d.h1Display),
      strand: (typeof cfg.strand === 'function' ? cfg.strand(mk, LEVEL) : cfg.strand),
      slotTokens: [d.plIndef, d.plDef, d.h1Display, co.theme.replace(/_/g,' '), cfg.slotWord].filter(Boolean),
      p1: render(sk[c.skel], d),
      p2: render(p2[c.p2], d),
      p3: p3(d, THEMES[nb1.theme], THEMES[nb2.theme]),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: cfg.carousel(mk, THEMES[n.theme].h1Display), href: n.canonical}; }),
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
