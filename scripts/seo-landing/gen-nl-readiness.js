#!/usr/bin/env node
/* Generic NL readiness/landing generator — STEP 2 nl-fan engine (clone of gen-sv-readiness.js).
 * Config-driven: reads a per-type config (nl-readiness-<type>.js) + nl-<type>-coordinates.json + nl-themes
 * + nl-render (PURE SUBSTITUTION — no morphology; Dutch definite plural is "de "+plIndef, gender non-load-
 * bearing in the plural). Readiness types carry no `standard`/educationalAlignment; raw l.strand = the
 * per-type SLO-kerndoelen readiness label (the two ruled buckets: Voorbereidend rekenen … / Visuele
 * waarneming en logisch denken). Standard-bearing types pass cfg.standard (EN R3 CCSS code, kept as the
 * machine anchor). Plural-safe by construction (hand-verified plIndef) + the nl assertion (FAIL-halts).
 *
 * Config shape (nl-readiness-<type>.js):
 *   { type, eyebrow, strand, slotWord, level?, modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3,
 *     h1:(modeKey, themeObj, level)=>string, carousel:(modeKey, h1Display)=>string, standard?:(mk,level)=>code|null }
 *   modeKey 'null' = the null exerciseMode.
 *
 * Usage: node scripts/seo-landing/gen-nl-readiness.js --type=grid-match [--only=<mode>]
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./nl-themes');
const { render, assertThemeTable, placeholdersRemain, singularSlotSuspects } = require('./nl-render');
const { validateCoordinate } = require('./validity-gate');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPE = arg('type', null);
if (!TYPE) { console.error('--type required'); process.exit(1); }
const cfg = require('./nl-readiness-' + TYPE);
const NL = 'frontend/content/seo-landing/nl.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/nl-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

// ---- table-level assertion (gender/plDef/plIndef/mass) — FAIL-halts before any render ----
const tableFails = assertThemeTable(THEMES);
if (tableFails.length) {
  console.error('nl-themes ASSERTION FAILED (' + tableFails.length + '):');
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
const DEFAULT_LEVEL = cfg.level || 'kleuters';

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
    const level = co.level || DEFAULT_LEVEL;
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

let cur = { _note: 'NL landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(NL,'utf8')); } catch (e) {}
const keep = (cur.landings||[]).filter(l => l.coordinate.type!==TYPE);
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(NL, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + TYPE + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; nl.json total ' + merged.landings.length);

// ---- per-landing lint (placeholder + singular-slot guard) — FAIL-halts ----
let lintFail = 0;
generated.forEach(e => {
  const text = e.h1 + ' ' + e.p1 + ' ' + e.p2 + ' ' + e.p3;
  if (placeholdersRemain(text + ' ' + e.carousel.map(c=>c.label).join(' '))) {
    console.log('  B1 UNSUBSTITUTED PLACEHOLDER ' + e.slug); lintFail++;
  }
  const sus = singularSlotSuspects(text);
  if (sus.length) { console.log('  B2 SINGULAR-SLOT ? ' + e.slug + ' :: ' + sus.join(', ')); lintFail++; }
});
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
if (short) console.log(short + ' short (<200 words)');
if (lintFail) { console.error('nl lint: ' + lintFail + ' FAIL — halting.'); process.exit(1); }
console.log('nl lint: clean' + (short ? (' (but ' + short + ' SHORT)') : '') + '; all checks pass');
