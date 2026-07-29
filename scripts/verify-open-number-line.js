#!/usr/bin/env node
/* =====================================================================
   verify-open-number-line.js — build-gate for TOOL #26 Open Number Line.

   Two things here are load-bearing and nothing else in the repo checks
   them, so they are the reason this gate exists:

     - THE ARC. No arc renderer existed anywhere before this tool
       (Hopper's activity draws its hop as a rounded-rect span), so the
       geometry is pure and proven here rather than eyeballed in a
       browser: endpoints on the axis, sweep the right way round, apex
       ABOVE the line, height capped and floored.
     - THE NUMBER-WORD DRIFT GATE. The tool carries a byte-faithful copy
       of place-value-core's composers because the tool page never loads
       that core. A copy rots silently, so every one of 0-999 × 11
       locales is compared against the LIVE core on every build.

     G1  the model: landings RECOMPUTED, never stored
     G2  addJump is immutable — history must not be mutated in place
     G3  undoJump is the exact inverse of addJump
     G4  notation uses a real minus sign (U+2212), never a hyphen
     G5  xOf maps the window onto the box, monotonically
     G6  arc endpoints sit exactly on xOf(from) / xOf(to)
     G7  arc sweep: 1 going right, 0 going left (take-away stays ABOVE)
     G8  arc height capped AND floored; apex above the axis
     G9  viewFor never clips a landing
     G10 friendly-number snapping is a landing snap, and off means off
     G11 number-word drift vs the LIVE place-value-core, 0-999 × 11
     G12 strings ×11, placeholder parity, typographic apostrophes only
     G13 no verdict / score / timer vocabulary in any locale
     G14 no dead strings
     G15 identity + premium defaults closed
     G16 no exfil (the Hush Owl bar)
     G17 THE COLLISION GUARD — this tool must never draw fixed ticks

   Usage: node scripts/verify-open-number-line.js [--locales=en,de]
   Override for mutation testing: ONL_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.ONL_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

const VERDICT = {
  en: /\b(wrong|incorrect|bad|failed|try again)\b/i, de: /\b(falsch|fehler|leider)\b/i,
  fr: /\b(faux|fausse|erreur|raté)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(fel|felaktig)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};
const SCORE_RE = /\b(score|scores|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|badge|reward|countdown|timer)\b/i;

function sandbox() {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop
  });
  const box = {
    window: { addEventListener: noop, removeEventListener: noop, location: { search: '' } },
    navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: fakeEl(), hidden: false
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  box.globalThis = box;
  vm.createContext(box);
  return box;
}

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'open-number-line.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const box = sandbox();
vm.runInContext(SRC, box, { filename: 'open-number-line.js' });
const T = box.OpenNumberLine || box.window.OpenNumberLine;
if (!T) { console.error('  ERROR could not load OpenNumberLine'); process.exit(1); }

/* the LIVE core, for the drift gate — always from the repo, never the
   mutation dir, because it is the thing being compared AGAINST */
const coreBox = sandbox();
vm.runInContext(fs.readFileSync(path.join(TOOLS_DIR, 'place-value-core.js'), 'utf8'), coreBox, { filename: 'place-value-core.js' });
const CORE = coreBox.PlaceValueCore || coreBox.window.PlaceValueCore;

console.log('[model]');

/* ---------- G1 landings derived ---------- */
{
  let line = T.newLine(47);
  line = T.addJump(line, 10); line = T.addJump(line, 10); line = T.addJump(line, 5);
  const ls = T.landings(line);
  if (ls.length !== line.deltas.length + 1) err(`G1 landings length ${ls.length} for ${line.deltas.length} deltas`);
  if (ls[0] !== 47) err('G1 the first landing is not the start');
  if (JSON.stringify(ls) !== JSON.stringify([47, 57, 67, 72])) err('G1 landings are not the running sum: ' + JSON.stringify(ls));
  if (T.landing(line) !== 72) err('G1 landing() disagrees with landings()');
  /* the derived-not-stored proof: poke a landing onto the object and it
     must change nothing, because nothing reads it */
  line.landing = 999; line.landings = [1, 2, 3];
  if (T.landing(line) !== 72) err('G1 a STORED landing was believed over the recomputed one');
}

/* ---------- G2 immutability ---------- */
{
  const a = T.newLine(10);
  const b = T.addJump(a, 5);
  if (a.deltas.length !== 0) err('G2 addJump mutated its input — undo and replay would disagree');
  if (b.deltas.length !== 1) err('G2 addJump did not add');
  if (a === b) err('G2 addJump returned the same object');
}

/* ---------- G3 undo is the inverse ---------- */
{
  /* ⚠ "undo twice from two jumps leaves zero" is a LYING TEST: removing
     TWO per call also lands on zero, so it passed a slice(0,-2) mutant.
     Assert undo removes EXACTLY ONE, from a line long enough to tell. */
  let l = T.newLine(3);
  [10, -4, 20, 7].forEach(d => { l = T.addJump(l, d); });
  let n = l.deltas.length;
  while (n > 0) {
    const before = l.deltas.slice();
    l = T.undoJump(l);
    if (l.deltas.length !== before.length - 1)
      err(`G3 undo removed ${before.length - l.deltas.length} jump(s), not exactly one`);
    if (JSON.stringify(l.deltas) !== JSON.stringify(before.slice(0, -1)))
      err('G3 undo removed the wrong jump — it must drop the LAST one');
    n--;
  }
  if (l.start !== 3) err('G3 undo changed the start');
  /* and it is the exact inverse of a single add */
  const base = T.addJump(T.addJump(T.newLine(5), 10), 10);
  const round = T.undoJump(T.addJump(base, 99));
  if (JSON.stringify(round.deltas) !== JSON.stringify(base.deltas)) err('G3 undo(add(x)) does not return x');
  const empty = T.undoJump(T.newLine(0));
  if (!empty || empty.deltas.length !== 0) err('G3 undo on an empty line must be a no-op, not a crash');
}

/* ---------- G4 the minus sign ---------- */
{
  if (T.label(10) !== '+10') err('G4 positive label is "' + T.label(10) + '"');
  const neg = T.label(-5);
  if (neg.indexOf('-') >= 0) err('G4 negative label uses a HYPHEN — on a projected line that reads as a dash, not minus');
  if (neg !== '−' + '5') err('G4 negative label is "' + neg + '", expected U+2212 then 5');
}

console.log('[geometry]');

/* ---------- G5 xOf ---------- */
{
  const view = { min: 0, max: 100 }, g = T.GEOM;
  const x0 = T.xOf(0, view), x100 = T.xOf(100, view);
  if (Math.abs(x0 - g.INSET) > 0.01) err(`G5 xOf(min) = ${x0}, expected the inset ${g.INSET}`);
  if (Math.abs(x100 - (g.W - g.INSET)) > 0.01) err(`G5 xOf(max) = ${x100}, expected ${g.W - g.INSET}`);
  let prev = -Infinity, mono = true;
  for (let v = 0; v <= 100; v += 5) { const x = T.xOf(v, view); if (x <= prev) mono = false; prev = x; }
  if (!mono) err('G5 xOf is not monotonic — the line would fold back on itself');
}

/* ---------- G6/G7/G8 the arc ---------- */
{
  const view = { min: 0, max: 100 }, g = T.GEOM;
  const parse = (d) => {
    const m = /^M([\d.]+) ([\d.]+) A([\d.]+) ([\d.]+) 0 0 (\d) ([\d.]+) ([\d.]+)$/.exec(d);
    return m ? { x1: +m[1], y1: +m[2], rx: +m[3], ry: +m[4], sweep: +m[5], x2: +m[6], y2: +m[7] } : null;
  };
  const fwd = parse(T.arcPath(10, 40, view));
  if (!fwd) err('G6 a forward arc did not parse as a single elliptical arc: ' + T.arcPath(10, 40, view));
  else {
    if (Math.abs(fwd.x1 - T.xOf(10, view)) > 0.5) err('G6 arc start is not on xOf(from)');
    if (Math.abs(fwd.x2 - T.xOf(40, view)) > 0.5) err('G6 arc end is not on xOf(to)');
    if (fwd.y1 !== g.AXIS_Y || fwd.y2 !== g.AXIS_Y) err('G6 arc endpoints are not on the axis');
    if (fwd.sweep !== 1) err('G7 a forward jump does not sweep 1 — the arc would hang below the line');
  }
  const back = parse(T.arcPath(40, 10, view));
  if (!back) err('G6 a backward arc did not parse');
  else if (back.sweep !== 0) err('G7 a BACKWARD jump must sweep 0 or a take-away arc flips under the line');

  /* height capped + floored, apex above */
  const huge = parse(T.arcPath(0, 100, view));
  if (huge && huge.ry > g.ARC_MAX + 0.01) err(`G8 a long jump draws ry=${huge.ry}, above the cap ${g.ARC_MAX} — it would leave the sheet`);
  const tiny = parse(T.arcPath(10, 11, view));
  if (tiny && tiny.ry < g.ARC_MIN - 0.01) err(`G8 a short jump draws ry=${tiny.ry}, below the floor ${g.ARC_MIN} — it reads as a flat smear`);
  for (const [a, b] of [[10, 40], [40, 10], [0, 100], [10, 11]]) {
    const ap = T.arcApex(a, b, view);
    if (!(ap.y < g.AXIS_Y)) err(`G8 the apex of ${a}->${b} is not ABOVE the axis (y=${ap.y} vs ${g.AXIS_Y})`);
  }
}

/* ---------- G9 the window never clips ---------- */
{
  for (const [start, deltas, range] of [[47, [10, 10, 5], 100], [0, [], 20], [90, [-30, -30], 100], [5, [100, 200], 1000]]) {
    let line = T.newLine(start);
    deltas.forEach(d => { line = T.addJump(line, d); });
    const view = T.viewFor(line, range);
    for (const l of T.landings(line)) {
      if (l < view.min || l > view.max) err(`G9 landing ${l} falls outside the window ${view.min}..${view.max}`);
    }
    if (view.max <= view.min) err('G9 the window is inverted or empty');
  }
}

/* ---------- G10 friendly snapping ---------- */
{
  if (T.snapLanding(47.4, 100, false) !== 47) err('G10 snapping OFF must still land on a whole number');
  if (T.snapLanding(47, 100, false) !== 47) err('G10 snapping OFF changed an exact value');
  const on = T.snapLanding(47, 100, true);
  const step = T.friendlyStep(100);
  if (on % step !== 0) err(`G10 snapping ON produced ${on}, not a multiple of ${step}`);
  if (T.friendlyStep(20) >= T.friendlyStep(1000)) err('G10 the friendly step does not grow with the range');

  /* G10b the directional commit. Plain rounding makes a small deliberate
     drag do NOTHING, so once a quarter of a step has been travelled the
     jump commits the way the finger went. Below that it is a stray touch. */
  const step10 = T.friendlyStep(100);
  const nudge = T.snapFrom(60, 63, 100, true);
  if (nudge !== 60 + step10) err(`G10b a deliberate small drag forward committed to ${nudge}, expected ${60 + step10} — the child would see nothing happen`);
  const nudgeBack = T.snapFrom(60, 57, 100, true);
  if (nudgeBack !== 60 - step10) err(`G10b a small drag BACKWARD committed to ${nudgeBack}, expected ${60 - step10}`);
  if (T.snapFrom(60, 60.4, 100, true) !== 60) err('G10b a stray touch must not commit a jump');
  if (T.snapFrom(60, 71, 100, true) !== 70) err('G10b a long drag must still snap to the nearest friendly number');
  if (T.snapFrom(60, 63, 100, false) !== 63) err('G10b snapping OFF must honour the exact drag');
}

console.log('[number words]');

/* ---------- G11 THE DRIFT GATE ---------- */
{
  /* ⚠ place-value-core does NOT export `numberWord` — that dispatcher is
     internal and only `_NUMBER_WORD_HELPERS` is public. So compare the
     HELPERS, which is the actual copied logic; comparing a dispatcher we
     also own would be marking our own homework. */
  const mineH = T._NUMBER_WORD_HELPERS, theirsH = CORE && CORE._NUMBER_WORD_HELPERS;
  if (!theirsH) err('G11 could not reach the live place-value-core helpers to compare against');
  else {
    let checked = 0, bad = 0, firstBad = '';
    for (const loc of LOCALES) {
      if (typeof theirsH[loc] !== 'function') { err(`G11 the live core has no ${loc} helper`); continue; }
      if (typeof mineH[loc] !== 'function') { err(`G11 the copy is MISSING the ${loc} helper`); continue; }
      for (let n = 0; n <= 999; n++) {
        for (const mode of ['cardinal', 'attributive']) {
          const a = mineH[loc](n, mode), b = theirsH[loc](n, mode);
          checked++;
          if (a !== b) { bad++; if (!firstBad) firstBad = `${loc} ${n} (${mode}): "${a}" vs core "${b}"`; }
        }
      }
    }
    if (bad) err(`G11 the number-word copy has DRIFTED from place-value-core in ${bad} of ${checked} cases — first: ${firstBad}`);
    else console.log(`  ${checked} number words match the live core across ${LOCALES.length} locale(s)`);
  }
  if (T.numberWord(-1, 'en') !== '-1') err('G11 out-of-range must pass through as digits');
  if (T.numberWord(1000, 'en') !== '1000') err('G11 out-of-range must pass through as digits');
}

console.log('[tool]');

/* ---------- G17 THE COLLISION GUARD ---------- */
{
  /* The whole justification for this tool existing beside the shipped
     Hopper's Number Line activity is that the line is EMPTY. If someone
     ever adds a tick loop, the differentiation is gone and the tool
     should fail the build rather than quietly become a duplicate. */
  if (/\bticks?\s*[:(]/.test(SRC_NC) || /nl-tick|onl-tick/.test(SRC_NC))
    err('G17 this tool renders TICKS — the empty line is the entire difference from Hopper’s Number Line');
  if (!/no ticks/i.test(SRC)) warn('G17 the header no longer states the empty-line contract');
}

/* ---------- G15 identity ---------- */
{
  if (T.id !== 'open-number-line') err(`G15 id is "${T.id}"`);
  if (T.STORE_KEY !== 'lcs:open-number-line:v1') err(`G15 STORE_KEY is "${T.STORE_KEY}"`);
  if (T.premium !== false) err('G15 premium does not default to false');
  if (!T.GEOM || !T.GEOM.W || !T.GEOM.AXIS_Y) err('G15 no geometry descriptor');
}

/* ---------- G16 no exfil ---------- */
{
  const fetches = SRC_NC.match(/\bfetch\s*\(/g) || [];
  if (fetches.length !== 1) err(`G16 ${fetches.length} fetch call(s) — exactly one is allowed (entitlement)`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('G16 no /api/auth/me entitlement check');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('G16 a fetch carries a body');
  if (/XMLHttpRequest|sendBeacon|WebSocket|RTCPeerConnection|MediaRecorder/.test(SRC_NC))
    err('G16 an exfiltration API appears in the source');
  if (/\.track\(/.test(SRC_NC)) err('G16 the tool calls api.track');
}

/* ---------- G12/G13/G14 strings ---------- */
{
  const S = T.strings || {};
  const enKeys = Object.keys(S).filter(k => S[k] && typeof S[k].en === 'string');
  if (enKeys.length < 15) err(`G12 only ${enKeys.length} strings — the surface is incomplete`);
  const ph = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
  for (const key of enKeys) {
    for (const loc of LOCALES) {
      const v = S[key][loc];
      if (typeof v !== 'string' || !v.trim()) { err(`G12 ${key}.${loc} missing`); continue; }
      if (ph(v) !== ph(S[key].en)) err(`G12 ${key}.${loc} placeholder parity: "${ph(S[key].en)}" vs "${ph(v)}"`);
      if (/'/.test(v)) err(`G12 ${key}.${loc} uses a straight apostrophe — typographic ’ only`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`G13 ${key}.${loc} carries a verdict: "${v}"`);
      if (SCORE_RE.test(v)) err(`G13 ${key}.${loc} scores or times a child: "${v}"`);
    }
  }
  /* dead strings — the Letter Studio lesson: eleven ensembles should never
     be asked to translate text no child will ever see. title +
     instruction are read by the SHELL (lcs-shell.js i18n.t(tool.strings)). */
  const body = SRC_NC.split('\n').filter(l => !/^\s{4}\w+:\s*\{en:/.test(l)).join('\n');
  const SHELL_KEYS = ['title', 'instruction'];
  for (const k of enKeys) {
    if (SHELL_KEYS.indexOf(k) >= 0) continue;
    if (!new RegExp(`['"]${k}['"]`).test(body)) err(`G14 the string "${k}" is never consumed — a dead string 11 ensembles must maintain`);
  }
}

console.log('');
if (ERRORS) { console.error(`FAIL — ${ERRORS} error(s), ${WARNS} warn(s)`); process.exit(1); }
console.log(`PASS — 0 error(s), ${WARNS} warn(s)`);
