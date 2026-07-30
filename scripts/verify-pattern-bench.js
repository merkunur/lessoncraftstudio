#!/usr/bin/env node
/* =====================================================================
   verify-pattern-bench.js — MEASURED build-gate for Pattern Bench
   (mini tools/pattern-bench.js). Fix the tool, never the gate.

   Invariants:
     P1 STRIP IS THE UNIT   cellAt(i) === unit[i mod unitLength] for every
                            reachable (unit, i) — exhaustively
     P2 ⭐ COSTUME-BLIND     the letter sequence is IDENTICAL under every
                            medium. This is the whole thesis: a pattern is
                            its unit, not its surface, so no rendering may
                            reach the pattern
     P3 THE COVER HIDES     a covered cell appends no bead and carries no
                            slot letter — it leaves the DOM, not the eye
     P4 MIDDLE COVER        any index is coverable, not just the last one;
                            a gap at the end can be solved by copying
     P5 MODEL THIN          state is {unit,len,covered,medium,unitHidden}
                            and every mutator is immutable + hostile-safe
     P6 UNIT BOUNDS         length clamps to 2..4 and the unit is never
                            empty, so the strip can never vanish
     P7 CLAP IS SILENT      over a covered bead — the sound must not leak
                            what the cloth hides
     P8 NO VERDICT          no grading vocabulary, no score/streak/timer,
                            no correct/wrong class
     P9 FENCE               no reference to pattern BLOCKS (shapeforge) or
                            the counting sequence (star-stitcher)
     P10 IDENTITY/EXFIL     id, STORE_KEY, premium:false, free-play, one
                            fetch on the allowlist
     P11 ONE GRID           the strip and the letter row share a column
                            template, so letter i sits under bead i by
                            construction and cannot drift
     P12 STRINGS/CSS        strings x11, injector, print, reduced motion

   Usage: node scripts/verify-pattern-bench.js
   Override for mutation testing: PTN_TOOL_DIR
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.PTN_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'pattern-bench.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = PatternBench;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — PatternBench is not defined'); process.exit(1); }
T.api = { t: (k) => k, lang: 'en', settings: {} };

/* snapshot identity BEFORE any test writes to it (the Sorting Hoops lesson) */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium, tasks: T.tasks, nextTask: T.nextTask };

const mk = (unit, len) => { const s = T.newState(); s.unit = unit.slice(); s.len = len || 12; return s; };

/* ---------------- P1 the strip IS the unit ---------------- */
console.log('[the pattern]');
let bad1 = 0, checked = 0;
const UNITS = [['a', 'b'], ['a', 'b', 'c'], ['a', 'a', 'b'], ['a', 'b', 'b'], ['a', 'b', 'c', 'd'], ['a', 'a', 'b', 'b']];
UNITS.forEach((u) => {
  const st = mk(u);
  for (let i = 0; i < st.len; i++) { checked++; if (T.cellAt(st, i) !== u[i % u.length]) bad1++; }
});
if (bad1) err(`P1 the strip does not repeat the unit (${bad1}/${checked})`);
else console.log(`  P1 the strip repeats the unit exactly (${checked} cells over ${UNITS.length} units)`);
if (T.cellAt(mk(['a', 'b']), -1) !== null || T.cellAt(mk(['a', 'b']), 99) !== null) err('P1 out-of-range cells must be null');
if (T.cellAt(mk([]), 0) !== null) err('P1 an empty unit must yield null, not a crash');

/* ---------------- P2 ⭐ costume-blind ---------------- */
let bad2 = [];
UNITS.forEach((u) => {
  const base = JSON.stringify(T.sequence(mk(u)));
  T.MEDIA.forEach((m) => {
    const st = T.setMedium(mk(u), m);
    if (JSON.stringify(T.sequence(st)) !== base) bad2.push(u.join('') + '/' + m);
  });
});
if (bad2.length) err(`P2 the costume changed the pattern: ${bad2.join(', ')}`);
else console.log(`  P2 COSTUME-BLIND: the letter sequence is identical across ${T.MEDIA.join(', ')}`);
/* and the media must actually differ visually, or "translate" is a lie */
const glyphKeys = [Object.keys(T.COLOUR).join(''), Object.keys(T.SHAPE).join(''), Object.keys(T.PICTURE).join('')];
if (new Set(glyphKeys).size !== 1) err('P2 the three costumes do not cover the same slot set');
if (new Set(Object.values(T.COLOUR)).size !== T.SLOTS.length) err('P2 two slots share a colour — the costume cannot distinguish them');
if (new Set(Object.values(T.SHAPE)).size !== T.SLOTS.length) err('P2 two slots share a shape');
if (new Set(Object.values(T.PICTURE)).size !== T.SLOTS.length) err('P2 two slots share a picture');
if (new Set(Object.values(T.TONE)).size !== T.SLOTS.length) err('P2 two slots share a tone — clapping cannot distinguish them');

/* ---------------- P3/P4 the cover ---------------- */
console.log('[the cover]');
const covSrc = (SRC_NC.match(/if \(self\.isCovered\(self\.st, idx\)\) \{[\s\S]*?\} else \{[\s\S]*?\}/) || [''])[0];
if (!covSrc) err('P3 could not find the covered branch');
else if (/_bead\(/.test(covSrc.split('} else {')[0])) err('P3 a covered cell still draws its bead');
else if (/aria-label[^)]*slot/i.test(covSrc.split('} else {')[0])) err('P3 a covered cell leaks its slot in aria');
else console.log('  P3 a covered cell appends no bead and carries no slot');
let cov = mk(['a', 'b', 'c']);
[0, 5, 6, 11].forEach((i) => { cov = T.toggleCover(cov, i); });
if (cov.covered.length !== 4) err(`P4 not every index is coverable (${cov.covered.length}/4)`);
else if (cov.covered.indexOf(5) === -1 || cov.covered.indexOf(6) === -1) err('P4 an interior cell could not be covered');
else console.log('  P4 any bead can be covered, including the middle ones');
if (T.toggleCover(cov, 99).covered.length !== cov.covered.length) err('P4 an out-of-range cover was accepted');
const uncov = T.toggleCover(cov, 5);
if (uncov.covered.indexOf(5) > -1) err('P4 covering is not a toggle');

/* ---------------- P5/P6 the model ---------------- */
console.log('[model]');
(function () {
  const st = T.newState();
  const keys = Object.keys(st).sort().join(',');
  if (keys !== 'covered,len,medium,unit,unitHidden') err(`P5 unexpected state fields: ${keys}`);
  const a = T.setUnitSlot(st, 0, 'c');
  if (st.unit[0] === 'c') err('P5 setUnitSlot mutated the input');
  if (a.unit[0] !== 'c') err('P5 setUnitSlot did not set');
  const b = T.toggleCover(st, 3);
  if (st.covered.length !== 0) err('P5 toggleCover mutated the input');
  if (b.covered.length !== 1) err('P5 toggleCover did not cover');
  try { T.setUnitSlot(st, 9, 'a'); T.setUnitSlot(st, 0, 'zz'); T.setMedium(st, 'nope'); T.sequence(null); T.isCovered(null, 0); }
  catch (e) { err('P5 the engine threw on a hostile input: ' + e.message); }
  if (T.setMedium(st, 'nope').medium !== st.medium) err('P5 an unknown medium was accepted');
  if (T.setUnitSlot(st, 0, 'zz').unit[0] === 'zz') err('P5 an unknown slot was accepted');
  [1, 5, 0, -2].forEach((n) => {
    const r = T.setUnitLength(st, n);
    if (r.unit.length < 2 || r.unit.length > 4) err(`P6 setUnitLength(${n}) produced a unit of ${r.unit.length}`);
  });
  [2, 3, 4].forEach((n) => { if (T.setUnitLength(st, n).unit.length !== n) err(`P6 setUnitLength(${n}) failed`); });
  /* the strip grows, clamped, and never leaves a cover on a bead that is gone */
  [0, -5, 9, 'x', 999].forEach((n) => {
    const r = T.setLen(st, n);
    if (r.len < T.LEN_MIN || r.len > T.LEN_MAX) err(`P6 setLen(${n}) produced len ${r.len}`);
  });
  if (T.setLen(st, 16).len !== 16) err('P6 setLen(16) failed');
  let big = T.setLen(st, 24);
  big = T.toggleCover(big, 22);
  if (T.setLen(big, 12).covered.indexOf(22) > -1) err('P6 shortening the strip left a cover on a bead that no longer exists');
  if (T.setLen(st, 16) === st || st.len !== 12) err('P6 setLen mutated the input');
  if (!ERRORS) console.log(`  P5/P6 state is {${keys}}, immutable, hostile-safe, unit 2-4, strip ${T.LEN_MIN}-${T.LEN_MAX}`);
}());

/* ---------------- P13 the transfer line ---------------- */
/* ⚠ MOAT STRING — an ERROR, never a warning. Number Balance taught this:
   the one string that carries the idea is exactly the one that goes dead. */
const barSrc = (SRC_NC.match(/_buildBar: function[\s\S]*?\n  \},/) || [''])[0];
if (!/_transfer\s*=\s*\(?was !== m/.test(barSrc)) {
  err('P13 the transfer line is not set on a medium change — the tool would swap costumes silently, which is the whole idea unsaid');
} else if (!/api\.t\('sameAgain'\)/.test(SRC_NC)) err('P13 the transfer string is never rendered');
else if (!/this\._transfer = false/.test(SRC_NC)) err('P13 the transfer line never clears — it would decorate the page instead of naming a moment');
else console.log('  P13 the transfer line fires on a costume change and clears after');

/* ---------------- P7 clap is silent over a cover ---------------- */
console.log('[stance]');
const clapSrc = (SRC_NC.match(/clapIt: function[\s\S]*?\n  \},/) || [''])[0];
if (!clapSrc) err('P7 could not find clapIt');
else if (!/isCovered/.test(clapSrc)) err('P7 clapIt does not check isCovered — the sound would leak what the cloth hides');
else {
  const before = clapSrc.indexOf('isCovered'), after = clapSrc.indexOf('api.sound');
  if (after > -1 && before > after) err('P7 clapIt plays the tone before checking the cover');
  else console.log('  P7 a covered bead is silent when the strip is clapped');
}

/* ---------------- P8 no verdict ---------------- */
const BANNED = /\b(isCorrect|answerKey|checkAnswer|score|streak|timer|countdown|starsEarned|celebrate)\b/;
if (BANNED.test(SRC_NC)) err(`P8 grading vocabulary present: ${(SRC_NC.match(BANNED) || [])[0]}`);
/* the token, with or without a leading dot — a class applied in JS has no dot */
if (/\bptn-(correct|wrong|right|error|bad|fail|pass)\b/.test(SRC_NC)) {
  err(`P8 a verdict CSS class exists: ${(SRC_NC.match(/\bptn-(correct|wrong|right|error|bad|fail|pass)\b/) || [])[0]}`);
}
const VERDICT = /\b(correct|incorrect|wrong|well done|try again|oops)\b/i;
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((loc) => {
  if (VERDICT.test(T.strings[k][loc])) err(`P8 verdict wording in strings.${k}.${loc}: "${T.strings[k][loc]}"`);
}));
if (!ERRORS) console.log('  P8 nothing here grades anybody');

/* ---------------- P9 fence ---------------- */
if (/shapeforge|star-?stitcher|pattern-?block/i.test(SRC_NC)) err('P9 references a shipped pattern-BLOCK or counting-sequence surface');
else console.log('  P9 fence holds: no pattern-block, no counting-sequence reference');

/* ---------------- P10 identity + exfil ---------------- */
console.log('[identity + safety]');
if (DECLARED.id !== 'pattern-bench') err(`P10 id is "${DECLARED.id}"`);
if (DECLARED.STORE_KEY !== 'lcs:pattern-bench:v1') err(`P10 STORE_KEY is "${DECLARED.STORE_KEY}"`);
if (DECLARED.premium !== false) err('P10 premium must default to false');
if (DECLARED.tasks || DECLARED.nextTask) err('P10 declaring tasks/nextTask would render activity chrome');
const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
urls.forEach((u) => { if (u.indexOf('/api/auth/me') !== 0) err(`P10 unexpected fetch target "${u}"`); });
if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('P10 an exfiltration path exists');
if (!ERRORS) console.log(`  P10 identity ok, free-play, ${urls.length} fetch call(s) on the allowlist`);

/* ---------------- P11 one grid ---------------- */
const gridDecl = (SRC.match(/\.ptn-strip,\.ptn-letters\{[\s\S]{0,220}?grid-template-columns:([^']*)/) || [])[1];
if (gridDecl === undefined) {
  err('P11 the strip and the letter row do not share a column template — letter i will drift off bead i');
} else if (!/var\(--ptn-n/.test(gridDecl)) {
  err('P11 the shared column count is not driven by the strip length — a longer strip would keep 12 columns');
} else if (!/track\.style\.setProperty\('--ptn-n', String\(this\.st\.len\)\)/.test(SRC_NC)) {
  err('P11 --ptn-n is not set from st.len');
} else {
  /* the tap floor lives in the same declaration; a phone must still be usable */
  const floor = Number((gridDecl.match(/minmax\((\d+)px/) || [])[1]);
  if (!(floor >= 44)) err(`P11 the cell floor is ${floor || '?'}px — below the 44px tap minimum`);
  else console.log(`  P11 one column template, driven by st.len, ${floor}px tap floor`);
}

/* ---------------- P12 strings + css ---------------- */
console.log('[l10n + css]');
const used = new Set();
(SRC_NC.match(/api\.t\([^)]*\)/g) || []).forEach((call) => {
  const inner = call.slice(call.indexOf('(') + 1, -1);
  const re = /(^|[?:]\s*)['"]([a-zA-Z]+)['"]/g;
  let m;
  while ((m = re.exec(inner)) !== null) used.add(m[2]);
});
(SRC_NC.match(/labelKey:\s*'([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
(SRC_NC.match(/_gateInline\([^,]+,\s*'([a-zA-Z]+)'\)/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
(SRC_NC.match(/LAB = \{[^}]*\}/g) || []).forEach((s) => (s.match(/'([a-zA-Z]+)'/g) || []).forEach((q) => used.add(q.slice(1, -1))));
const SHELL_READ = ['title', 'instruction'];
const declared = new Set(Object.keys(T.strings));
Array.from(used).forEach((k) => { if (!declared.has(k)) err(`P12 api.t('${k}') has no string`); });
const dead = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1);
if (dead.length) warn(`P12 ${dead.length} declared but unused string(s): ${dead.join(', ')}`);
Object.keys(T.strings).forEach((k) => {
  if (!T.strings[k].en) err(`P12 strings.${k} has no en`);
  Object.keys(T.strings[k]).forEach((loc) => { if (/'/.test(T.strings[k][loc])) err(`P12 straight apostrophe in strings.${k}.${loc}`); });
});
const locs = new Set();
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((l) => locs.add(l)));
console.log(`  P12 ${declared.size} strings across ${locs.size} locale(s): ${Array.from(locs).join(' ')}`);
if (locs.size < 11) warn(`P12 ${11 - locs.size} locale(s) still to author — the locale pass has not run`);
if (!/getElementById\('ptn-style'\)\)\s*return/.test(SRC_NC)) err('P12 the CSS injector is not idempotent');
if (!/@media print/.test(SRC)) err('P12 no @media print block');
if (!/prefers-reduced-motion/.test(SRC)) err('P12 no prefers-reduced-motion guard');
const lcsSel = (SRC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-header');
if (lcsSel.length) err(`P12 restyles shell internals: ${Array.from(new Set(lcsSel)).join(', ')}`);
if (!/body\.ptn-wide/.test(SRC)) err('P12 no body.ptn-wide scope');
if (!ERRORS) console.log('  P12 css ok');

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
