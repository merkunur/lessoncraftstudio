#!/usr/bin/env node
/* Generic NO readiness/landing generator — the no-fan engine (clone of gen-da-readiness.js,
 * no ledger-lock 2026-06-15). Config-driven: reads a per-type config (no-readiness-<type>.js) +
 * no-<type>-coordinates.json + no-themes + no-render (PURE SUBSTITUTION — bokmål suffixal
 * definiteness from hand-verified literals). NO double-definiteness lint (Norwegian permits
 * "de små dyrene"; the da-only B5 pre-pass is dropped here). Readiness types carry no `standard`;
 * raw l.strand = the per-type LK20/Rammeplan label (buckets: Antall, rom og form /
 * Visuell sansing og logisk tenkning; letters: Bokstavkunnskap). Standard-bearing types pass
 * cfg.standard (EN R3 CCSS code, the invisible machine anchor).
 *
 * Config shape (no-readiness-<type>.js):
 *   { type, eyebrow, strand, slotWord, level?, modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3,
 *     h1:(modeKey, themeObj, level)=>string, carousel:(modeKey, h1Display)=>string, standard?:(mk,level)=>code|null }
 *   modeKey 'null' = the null exerciseMode. level may be a string or (mk)=>levelKey.
 *
 * Usage: node scripts/seo-landing/gen-no-readiness.js --type=grid-match [--only=<mode>]
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./no-themes');
const { render, assertThemeTable, placeholdersRemain, singularSlotSuspects, badDefiniteForm } = require('./no-render');
const { validateCoordinate } = require('./validity-gate');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPE = arg('type', null);
if (!TYPE) { console.error('--type required'); process.exit(1); }
const cfg = require('./no-readiness-' + TYPE);
const NO = 'frontend/content/seo-landing/no.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/no-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

// ---- table-level assertion (gender/plDef/plIndef) — FAIL-halts before any render ----
const tableFails = assertThemeTable(THEMES);
if (tableFails.length) {
  console.error('no-themes ASSERTION FAILED (' + tableFails.length + '):');
  tableFails.forEach(f => console.error('  ' + f));
  process.exit(1);
}

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i, S, P){ const cells = S*P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// P3 template uses {NB1}/{NB2} (neighbor collective plIndef) + {GEN} (own collective plIndef).
function p3nl(ownTheme, nb1Theme, nb2Theme){
  return cfg.P3
    .replace(/\{NB1\}/g, nb1Theme.plIndef)
    .replace(/\{NB2\}/g, nb2Theme.plIndef)
    .replace(/\{GEN\}/g, ownTheme.plIndef);
}

const modeKey = (m) => (m === null ? 'null' : m);
const onlyArg = arg('only', null);
const MODES = onlyArg ? [onlyArg] : Object.keys(cfg.modes);
// cfg.level may be a string OR a function (mk) => levelKey for band-split-by-mode types
// (matching letter→1-trinn readiness / name→2-trinn; word-guess easy→2-trinn / normal→2-trinn).
const levelFor = (mk) => (typeof cfg.level === 'function' ? cfg.level(mk) : (cfg.level || '1-trinn'));

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
    const level = co.level || levelFor(mk);
    const c = cellAssign(i, sk.length, p2.length);
    const nb1 = list[(i+1)%list.length], nb2 = list[(i+7)%list.length];
    const entry = {
      slug: co.canonical,
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level },
      eyebrow: cfg.eyebrow,
      h1: cfg.h1(mk, d, level),
      strand: (typeof cfg.strand === 'function' ? cfg.strand(mk, level) : cfg.strand),
      slotTokens: [d.plIndef, d.plDef, d.h1Display, co.theme.replace(/_/g,' '), level, cfg.slotWord],
      p1: render(sk[c.skel], d),
      p2: render(p2[c.p2], d),
      p3: p3nl(d, THEMES[nb1.theme], THEMES[nb2.theme]),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: cfg.carousel(mk, THEMES[n.theme].h1Display), href: n.canonical}; }),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    // per-coordinate standard (band-split numeric, e.g. math-puzzle) takes precedence; else the config's standard.
    const _std = co.standard || (cfg.standard ? (typeof cfg.standard === 'function' ? cfg.standard(mk, level) : cfg.standard) : null); if (_std) entry.standard = _std;
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ': ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

let cur = { _note: 'NO landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(NO,'utf8')); } catch (e) {}
const keep = (cur.landings||[]).filter(l => l.coordinate.type!==TYPE);
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(NO, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + TYPE + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; no.json total ' + merged.landings.length);

// ---- per-landing lint (placeholder + singular-slot guard) — FAIL-halts ----
let lintFail = 0;
generated.forEach(e => {
  const text = e.h1 + ' ' + e.p1 + ' ' + e.p2 + ' ' + e.p3;
  if (placeholdersRemain(text + ' ' + e.carousel.map(c=>c.label).join(' '))) {
    console.log('  B1 UNSUBSTITUTED PLACEHOLDER ' + e.slug); lintFail++;
  }
  const sus = singularSlotSuspects(text);
  if (sus.length) { console.log('  B2 SINGULAR-SLOT ? ' + e.slug + ' :: ' + sus.join(', ')); lintFail++; }
  // B4 (no): rendered definite-suffix sanity — a theme followed by bare "ne" (*dyrne / *frukterne).
  const th = THEMES[e.coordinate.theme];
  if (th) {
    const bad = badDefiniteForm(text, th);
    if (bad) { console.log('  B4 BAD-DEFINITE-FORM ' + e.slug + ' :: "' + bad + '"'); lintFail++; }
  }
});
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
if (short) console.log(short + ' short (<200 words)');
if (lintFail) { console.error('no lint: ' + lintFail + ' FAIL — halting.'); process.exit(1); }
console.log('no lint: clean' + (short ? (' (but ' + short + ' SHORT)') : '') + '; all checks pass');
