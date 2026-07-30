#!/usr/bin/env node
/* =====================================================================
   verify-part-whole-frame.js — MEASURED build-gate for Part–Whole Frame
   (mini tools/part-whole-frame.js). Fix the data, never the gate.

   Invariants (all measured, none asserted-by-construction):
     CONSERVATION — for every whole 3-20 and EVERY state reachable by any
       sequence of carries, a + partB === whole. Plus the poke test: an
       assignment to a `b` field changes nothing, because part two has no
       slot (the derived-not-stored discipline).
     CARRY — immutable, clamped, a true no-op at either bound; carry there
       and back is the identity.
     WAYS — waysFor(n) === n+1 ordered pairs; recordSplit dedupes and
       preserves DISCOVERY order (never sorts into the staircase).
     SET-WHOLE — clamps `a`, so the invariant holds across the teacher's
       move as well as the child's.
     ANTI-GRADING — the structural fence against the six shipped
       numberbond.* activities: no isCorrect / answerKey / readOnly /
       Check surface anywhere, no verdict vocabulary in any of the 11
       locales, no score/timer/streak. This is the G17 analogue: if the
       tool ever grows a right answer, the build fails.
     DRIFT — NUM_WORDS 0-20 x 11 compared against the LIVE
       place-value-core.js _NUMBER_WORD_HELPERS, so the literal copy
       cannot rot silently.
     DIAGRAM — every descriptor is renderer-true: exactly the fields the
       renderer reads, two parts, and a `default` entry present.
     IDENTITY / NO-EXFIL / STRINGS / CSS — as per the house gates.

   Usage: node scripts/verify-part-whole-frame.js [--locales=en,de]
   Override for mutation testing: PWF_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.PWF_TOOL_DIR || TOOLS_DIR;

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
    appendChild: noop, append: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    insertAdjacentElement: noop, getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 }),
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop,
    querySelector: () => null, querySelectorAll: () => []
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
    requestAnimationFrame: () => 0,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  box.globalThis = box;
  vm.createContext(box);
  return box;
}

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'part-whole-frame.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const box = sandbox();
vm.runInContext(SRC, box, { filename: 'part-whole-frame.js' });
const T = box.PartWholeFrame || box.window.PartWholeFrame;
if (!T) { console.error('  ERROR could not load PartWholeFrame'); process.exit(1); }

/* the LIVE core, for the drift gate — always from the repo, never the
   mutation dir, because it is the thing being compared AGAINST */
const coreBox = sandbox();
vm.runInContext(fs.readFileSync(path.join(TOOLS_DIR, 'place-value-core.js'), 'utf8'), coreBox, { filename: 'place-value-core.js' });
const CORE = coreBox.PlaceValueCore || coreBox.window.PlaceValueCore;

console.log('[model]');

/* ---------- P1 conservation over every reachable state ---------- */
(function () {
  let checked = 0;
  for (let w = T.MIN_WHOLE; w <= T.MAX_WHOLE; w++) {
    // every reachable state: carry all the way down, then all the way up
    let f = T.newFrame(w);
    for (let i = 0; i <= w + 2; i++) {
      if (f.a + T.partB(f) !== f.whole) { err(`P1 conservation broken at whole ${w}, a ${f.a}`); return; }
      if (f.whole !== w) { err(`P1 whole drifted at ${w} -> ${f.whole}`); return; }
      checked++;
      f = T.carry(f, 'toB');
    }
    for (let i = 0; i <= w + 2; i++) {
      if (f.a + T.partB(f) !== f.whole) { err(`P1 conservation broken climbing at whole ${w}, a ${f.a}`); return; }
      checked++;
      f = T.carry(f, 'toA');
    }
  }
  // the poke test: part two has no slot to corrupt
  const g = T.newFrame(7, 3);
  g.b = 99; g.partB = 99; g.total = 0;
  if (T.partB(g) !== 4) err('P1 poke: partB is not derived — an assignment changed it');
  console.log(`  P1 conservation ok (${checked} reachable states, whole ${T.MIN_WHOLE}-${T.MAX_WHOLE})`);
}());

/* ---------- P2 carry: immutable, clamped, no-op at bounds ---------- */
(function () {
  const f = T.newFrame(8, 5);
  const snap = JSON.stringify(f);
  const n = T.carry(f, 'toB');
  if (JSON.stringify(f) !== snap) err('P2 carry mutated its input');
  if (n === f) err('P2 carry returned the same object');
  if (n.a !== 4) err('P2 carry toB did not move exactly one');
  if (T.carry(T.carry(f, 'toB'), 'toA').a !== f.a) err('P2 carry there-and-back is not the identity');

  const low = T.newFrame(6, 0);
  const lowOut = T.carry(low, 'toB');
  if (lowOut.a !== 0) err('P2 carry past the floor did not no-op');
  const high = T.newFrame(6, 6);
  if (T.carry(high, 'toA').a !== 6) err('P2 carry past the ceiling did not no-op');
  console.log('  P2 carry ok (immutable, clamped, reversible)');
}());

/* ---------- P3 ways: count, order, dedupe ---------- */
(function () {
  for (let n = T.MIN_WHOLE; n <= T.MAX_WHOLE; n++) {
    if (T.waysFor(n) !== n + 1) { err(`P3 waysFor(${n}) === ${T.waysFor(n)}, expected ${n + 1}`); return; }
  }
  /* ⚠ The discovery order here must be one that SORTING WOULD CHANGE.
     The first version of this test recorded 2+3 then 4+1 — already in
     sort order, so a `.sort()` mutant survived it and the stated refusal
     ("never sorts into the staircase") was unenforced. Record descending
     so the two orders genuinely differ. */
  let list = [];
  list = T.recordSplit(list, T.newFrame(5, 4));
  list = T.recordSplit(list, T.newFrame(5, 1));
  list = T.recordSplit(list, T.newFrame(5, 4));   // duplicate
  if (list.length !== 2) err('P3 recordSplit did not dedupe');
  if (list[0] !== '4+1' || list[1] !== '1+4') err('P3 recordSplit did not preserve discovery order (sorted?)');
  // 0+N and N+0 are DISTINCT rows — the ordered-pairs ruling
  let ord = T.recordSplit(T.recordSplit([], T.newFrame(4, 0)), T.newFrame(4, 4));
  if (ord.length !== 2) err('P3 ordered pairs collapsed — 0+4 and 4+0 must be distinct rows');
  console.log('  P3 ways ok (n+1 ordered, dedupe, discovery order preserved)');
}());

/* ---------- P4 setWhole clamps, invariant survives the teacher's move ---------- */
(function () {
  let f = T.newFrame(9, 9);
  f = T.setWhole(f, 4);
  if (f.a > f.whole) err('P4 setWhole left part one larger than the whole');
  if (f.a + T.partB(f) !== f.whole) err('P4 setWhole broke conservation');
  if (T.setWhole(f, 999).whole !== T.MAX_WHOLE) err('P4 setWhole did not clamp the ceiling');
  if (T.setWhole(f, -5).whole !== T.MIN_WHOLE) err('P4 setWhole did not clamp the floor');
  console.log('  P4 setWhole ok (clamped both ends, invariant holds)');
}());

/* ---------- P5 ANTI-GRADING — the structural fence ---------- */
(function () {
  const banned = [/\bisCorrect\b/, /\banswerKey\b/, /\breadOnly\b/, /\bcheckAnswer\b/, /\bgrade\b/];
  banned.forEach((re) => { if (re.test(SRC_NC)) err(`P5 grading surface present: ${re}`); });
  ['isCorrect', 'answerKey', 'missing', 'readOnly'].forEach((k) => {
    if (typeof T[k] === 'function') err(`P5 the engine exposes ${k}() — this tool has nothing to check`);
  });
  if (/\bCheck\b/.test(JSON.stringify(T.strings))) err('P5 a Check surface leaked into the strings');
  if (!/nothing to check|no right answer|correct BY DEFINITION|correct by definition/i.test(SRC))
    warn('P5 the header no longer states that there is nothing to check');
  console.log('  P5 anti-grading ok (no verdict surface, no answer key)');
}());

/* ---------- P6 identity ---------- */
(function () {
  if (T.id !== 'part-whole-frame') err('P6 id');
  if (T.STORE_KEY !== 'lcs:part-whole-frame:v1') err('P6 STORE_KEY literal');
  if (T.premium !== false) err('P6 premium must default false');
  if (T.ENT_TRUST_DAYS !== 14) err('P6 ENT_TRUST_DAYS must be 14');
  if (T.MIN_WHOLE !== 3 || T.FREE_MAX_WHOLE !== 10 || T.MAX_WHOLE !== 20) err('P6 band constants');
  console.log('  P6 identity ok');
}());

/* ---------- P7 no exfil (the Hush Owl bar) ---------- */
(function () {
  const fetches = SRC_NC.match(/fetch\s*\(/g) || [];
  if (fetches.length !== 1) err(`P7 expected exactly one fetch(, found ${fetches.length}`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('P7 the one fetch is not /api/auth/me');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('P7 a fetch carries a body');
  [/XMLHttpRequest/, /sendBeacon/, /WebSocket/, /RTCPeerConnection/, /MediaRecorder/].forEach((re) => {
    if (re.test(SRC_NC)) err(`P7 network surface ${re}`);
  });
  console.log('  P7 no-exfil ok (one fetch, /api/auth/me, nothing else)');
}());

console.log('[l10n]');

/* ---------- P8 strings: completeness, parity, apostrophes, verdicts ---------- */
(function () {
  const keys = Object.keys(T.strings);
  if (keys.length < 20) err(`P8 only ${keys.length} strings — expected the full surface`);
  keys.forEach((k) => {
    const enV = T.strings[k].en;
    if (!enV) { err(`P8 ${k}: no en`); return; }
    const enPh = (enV.match(/\{[a-z]+\}/g) || []).sort().join(',');
    LOCALES.forEach((loc) => {
      const v = T.strings[k][loc];
      if (!v) { err(`P8 ${k}.${loc} missing`); return; }
      const ph = (v.match(/\{[a-z]+\}/g) || []).sort().join(',');
      if (ph !== enPh) err(`P8 ${k}.${loc} placeholder parity: "${ph}" vs en "${enPh}"`);
      if (/'/.test(v)) err(`P8 ${k}.${loc} uses a straight apostrophe`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`P8 ${k}.${loc} verdict vocabulary: "${v}"`);
      if (SCORE_RE.test(v)) err(`P8 ${k}.${loc} score/timer vocabulary: "${v}"`);
      if (/common core/i.test(v)) err(`P8 ${k}.${loc} names Common Core`);
    });
  });
  console.log(`  P8 strings ok (${keys.length} keys x ${LOCALES.length} locales)`);
}());

/* ---------- P9 dead strings — every key must be used ---------- */
(function () {
  const body = SRC.split('\n').filter(l => !/^\s{4}[a-zA-Z]+:\s*\{en:/.test(l)).join('\n');
  Object.keys(T.strings).forEach((k) => {
    if (k === 'title' || k === 'instruction') return;   // shell-owned
    if (!new RegExp(`['"\`]${k}['"\`]`).test(body)) err(`P9 dead string: ${k} is never used`);
  });
  console.log('  P9 no dead strings');
}());

/* ---------- P10 THE DRIFT GATE — number words vs the live core ---------- */
(function () {
  if (!CORE || !CORE._NUMBER_WORD_HELPERS) { err('P10 could not load the live place-value-core helpers'); return; }
  let compared = 0;
  ALL.forEach((loc) => {
    const helper = CORE._NUMBER_WORD_HELPERS[loc];
    if (!helper) { err(`P10 the live core has no helper for ${loc}`); return; }
    const table = T.NUM_WORDS[loc];
    if (!table) { err(`P10 NUM_WORDS.${loc} missing`); return; }
    if (table.length !== 21) { err(`P10 NUM_WORDS.${loc} has ${table.length} entries, expected 21`); return; }
    for (let n = 0; n <= 20; n++) {
      const live = helper(n, 'cardinal');
      if (table[n] !== live) err(`P10 drift ${loc}[${n}]: "${table[n]}" vs live "${live}"`);
      compared++;
    }
  });
  console.log(`  P10 drift gate ok (${compared} values vs the live place-value-core)`);
}());

console.log('[render contract]');

/* ---------- P11 diagram descriptors are renderer-true ---------- */
(function () {
  const ALLOWED = ['system', 'layout', 'legs', 'ways'];
  /* renderer-true: a layout the renderer does not implement would render
     an empty frame, so the set is read out of the source, not assumed */
  const IMPLEMENTED = (SRC_NC.match(/pwf-layout-'\s*\+\s*d\.layout/) ? ['whole-above'] : []);
  if (!T.DIAGRAM['default']) err('P11 no default diagram — a locale without an ensemble ruling would render nothing');
  /* if the set could not be read, say so — do not skip the check silently */
  if (!IMPLEMENTED.length) err('P11 could not read the implemented layout set from the renderer — this check would pass vacuously');
  Object.keys(T.DIAGRAM).forEach((loc) => {
    const d = T.DIAGRAM[loc];
    Object.keys(d).forEach((f) => { if (ALLOWED.indexOf(f) === -1) err(`P11 ${loc}: dead field "${f}" — the renderer never reads it`); });
    ALLOWED.forEach((f) => { if (d[f] === undefined) err(`P11 ${loc}: missing "${f}"`); });
    if (IMPLEMENTED.length && IMPLEMENTED.indexOf(d.layout) === -1)
      err(`P11 ${loc}: layout "${d.layout}" has no renderer — an ensemble ruling must ship with the arrangement that draws it`);
    if (!Array.isArray(d.legs) || d.legs.length !== 2) err(`P11 ${loc}: a part-whole frame has exactly two legs`);
    (d.legs || []).forEach((x, i) => {
      if (typeof x !== 'number' || x < 0 || x > 100) err(`P11 ${loc}: leg ${i} (${x}) is not an x percentage`);
    });
    if (T.diagramFor(loc) !== d) err(`P11 diagramFor('${loc}') did not resolve to its own descriptor`);
  });
  if (T.diagramFor('zz') !== T.DIAGRAM['default']) err('P11 an unruled locale does not fall back to default');
  console.log(`  P11 diagram ok (${Object.keys(T.DIAGRAM).length} descriptor(s), renderer-true)`);
}());

/* ---------- P12 CSS contract ---------- */
(function () {
  if (!/getElementById\('pwf-style'\)/.test(SRC_NC)) err('P12 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('P12 no print stylesheet — the printable is a premium promise');
  if (!/prefers-reduced-motion/.test(SRC)) err('P12 no reduced-motion block');
  /* Every .lcs- selector must be the one sanctioned body class.
     ⚠ Scan SRC_NC, not SRC: the header comments legitimately NAME shell
     classes when they explain why a rule exists, and a gate that reads
     prose as code fires on documentation. Measured against the emitted
     stylesheet only. */
  const lcsSel = SRC_NC.match(/\.lcs-[a-z-]+/g) || [];
  lcsSel.forEach((s) => { if (s !== '.lcs-header') err(`P12 writes a shell selector: ${s}`); });
  if (lcsSel.length && !/body\.pwf-wide \.lcs-header/.test(SRC_NC)) err('P12 .lcs-header is not scoped to body.pwf-wide');
  // the print block must re-tone every ink the tool draws, not just one
  const printBlock = (SRC.match(/@media print\{[\s\S]*?\n\s*\+ '\}';/) || [''])[0];
  /* ⚠ Match the SELECTOR, not the substring. `indexOf('pwf-dot')` is
     satisfied by `.pwf-dotZ`, so a renamed-away print rule survived the
     check — the counters would have printed as invisible screen-coral
     while the gate reported the block complete. */
  ['pwf-leg', 'pwf-dot', 'pwf-dish', 'pwf-cap', 'pwf-num'].forEach((cls) => {
    if (!new RegExp('\\.' + cls + '\\s*[{,:]').test(printBlock))
      err(`P12 print block does not re-tone .${cls} — it will print near-blank`);
  });
  console.log('  P12 css ok (idempotent, print re-tones every ink, no shell bleed)');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
