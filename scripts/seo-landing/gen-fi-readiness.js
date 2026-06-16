#!/usr/bin/env node
/* Generic FI readiness/other-types landing generator — FI bulk engine.
 * Config-driven clone of gen-pt-readiness.js, adapted to fi-render (pure substitution,
 * render(tpl, themeObj)) + fi-themes + the Finnish case placeholders {H1} (h1Display, nom pl
 * Capitalized) / {N_PL} (nom pl lc) / {N_PART_SG} (partitive sg) / {N_PART_PL} (partitive pl) /
 * {N_GEN} (genitive pl). Finnish has NO gender + NO articles, so the pt genArt+gen P3 neighbor
 * is replaced by the neighbor's {H1} (h1Display); the current-theme collective in P3 uses the
 * {N_GEN}/{N_PL}/... placeholders rendered by fi-render, NOT a stored article pair.
 *
 * Config shape (fi-readiness-<type>.js):
 *   { type, eyebrow, strand(str|fn(mk,level)), slotWord, level?, standard?(str|fn(mk,level)),
 *     h1:(mk,level)=>patternStringWith{H1}, carousel:(mk,themeH1)=>string,
 *     modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3:patternStringWith {nb1}{nb2} + fi placeholders }
 *   modeKey 'null' = the null exerciseMode.
 * Coordinates: fi-<type>-coordinates.json = [{mode, theme, canonicalDeckSlug, level?, siblings?}].
 *
 * Usage: node scripts/seo-landing/gen-fi-readiness.js --type=subtraction [--only=<mode>]
 */
'use strict';
const fs = require('fs');
const _t = require('./fi-themes');
const THEMES = _t.THEMES || _t;
const { render, assertThemeTable } = require('./fi-render');
const { validateCoordinate } = require('./validity-gate');

// FAIL-halt on any theme-table defect (vowel-harmony / case-form / lowercase) before any render.
{
  const fails = assertThemeTable(THEMES);
  if (fails && fails.length) {
    console.error('FATAL: fi-themes.js assertThemeTable failed (' + fails.length + '):');
    fails.slice(0, 30).forEach((m) => console.error('  ' + m));
    process.exit(1);
  }
}

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPE = arg('type', null);
if (!TYPE) { console.error('--type required'); process.exit(1); }
const cfg = require('./fi-readiness-' + TYPE);
const FI = 'frontend/content/seo-landing/fi.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/fi-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i, S, P){ const cells = S*P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// Finnish P3: neighbour slots {nb1}/{nb2} are filled with the neighbour's h1Display (no gender/article);
// the current-theme collective is woven via fi-render placeholders ({N_GEN}/{N_PL}/...).
function p3fi(d, nb1, nb2, mk){
  const p3raw = (typeof cfg.P3 === 'function') ? cfg.P3(mk) : cfg.P3; // per-mode P3 supported
  return render(p3raw.replace(/\{nb1\}/g, nb1.h1Display).replace(/\{nb2\}/g, nb2.h1Display), d);
}

const modeKey = (m) => (m === null || m === undefined ? 'null' : m);
const onlyArg = arg('only', null);
const MODES = onlyArg ? [onlyArg] : Object.keys(cfg.modes);

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
    const lvl = co.level || (typeof cfg.level === 'function' ? cfg.level(mk) : cfg.level) || 'esikoulu';
    const nb1 = THEMES[list[(i+1)%list.length].theme], nb2 = THEMES[list[(i+7)%list.length].theme];
    const entry = {
      slug: co.canonicalDeckSlug,
      variantShape: (co.siblings && co.siblings.length>1) ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level: lvl },
      eyebrow: cfg.eyebrow,
      h1: render(cfg.h1(mk, lvl), d),
      strand: (typeof cfg.strand === 'function' ? cfg.strand(mk, lvl) : cfg.strand),
      // §4.B "theme-noun in P1" lint tokens — the fi case fields + display + theme key + level + slotWord.
      slotTokens: [d.nomPl, d.partPl, d.partSg, d.h1Display, co.theme.replace(/_/g,' '), lvl, cfg.slotWord].filter(Boolean),
      p1: render(sk[c.skel], d),
      p2: render(p2[c.p2], d),
      p3: p3fi(d, nb1, nb2, mk),
      canonicalDeckSlug: co.canonicalDeckSlug,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: cfg.carousel(mk, THEMES[n.theme].h1Display), href: n.canonicalDeckSlug}; }),
    };
    if (co.siblings && co.siblings.length>1) entry.collapseSiblings = co.siblings;
    if (cfg.standard) { const _std = (typeof cfg.standard === 'function' ? cfg.standard(mk, lvl) : cfg.standard); if (_std) entry.standard = _std; }
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ': ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

let cur = { _note: 'FI landing copy — PART FI.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(FI,'utf8')); } catch (e) {}
const keep = (cur.landings||[]).filter(l => l.coordinate.type!==TYPE);
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(FI, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + TYPE + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; fi.json total ' + merged.landings.length);

let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
console.log(short? (short+' short (<200)') : ('all ' + generated.length + ' >=200 words'));
