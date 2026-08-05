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

/* ⚠⚠ `\b` IS ASCII-ONLY, AND A BAN TESTED ON ENGLISH ALONE IS TESTED IN
   THE ONE LANGUAGE WHERE IT HAPPENS TO WORK. `\bväärin\b` and `\braté\b`
   can never match, so three of these were born dead. Unicode letter
   boundaries, everywhere.

   ⚠ AND A VERDICT IS NOT ONLY A NEGATIVE ONE. The first version banned
   only "wrong"; an instruction reading "check you got it right" sailed
   through, which is the same grading surface with a friendlier face.

   ⚠ BAN WIDTH IS DELIBERATE AND IS POISONED IN BOTH DIRECTIONS by
   poison-part-whole-frame-bans.js. Several obvious additions are
   REFUSED here because they are ordinary words in their own language and
   would teach a native panel to write around the gate instead of
   reporting it: nl `goed` (good), sv `rätt` (also "rather"), fr `juste`
   (also "just"), de `gut`. The MUST_PASS list in the poison script is
   the auditable record of that. */
const L = (alts) => new RegExp('(?<!\\p{L})(?:' + alts + ')(?!\\p{L})', 'iu');
const VERDICT = {
  /* ⚠ `right` IS NOT BANNED BARE. It is a direction as often as it is a
     verdict, and this board has two trays side by side — a bare ban would
     condemn correct copy and teach a panel to reword around the gate.
     The VERDICT is the construction, so ban the construction. */
  en: L('wrong|incorrect|bad|failed|try again|correct|well done|check|right answer|(?:got|get|is|are|was|were)\\s+(?:it\\s+)?right'),
  de: L('falsch|fehler|leider|richtig'),
  fr: L('faux|fausse|erreur|raté|correcte?'),
  it: L('sbagliato|errore|corrett[oa]|giust[oa]'),
  es: L('incorrecto|mal hecho|error|correct[oa]'),
  pt: L('errado|erro|corret[oa]'),
  nl: L('fout|foutje|verkeerd|correct'),
  sv: L('fel|felaktig|korrekt'),
  da: L('forkert|fejl|korrekt|rigtigt'),
  no: L('feil|korrekt|riktig'),
  fi: L('väärin|virhe|oikein')
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

/* ---------- P3 ways: order, dedupe, and a NON-DESTRUCTIVE ordered view ---------- */
(function () {
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

  /* ⭐ THE ORDERED VIEW IS A VIEW. The teacher may order the display, but
     `this.ways` is the child's route through the splits and is never
     re-written — so a display toggle must not be a destructive edit.
     Sorting the argument in place would pass a "the output is sorted"
     check and silently corrupt the record. */
  const src = ['4+1', '1+4', '3+2'];
  const snap = src.join('|');
  const view = T.orderedWays(src);
  if (src.join('|') !== snap) err('P3 orderedWays MUTATED its input — the ordered display is a destructive edit');
  if (view === src) err('P3 orderedWays returned the same array object');
  if (view.join('|') !== '1+4|3+2|4+1') err(`P3 orderedWays did not order by part one: ${view.join('|')}`);
  console.log('  P3 ways ok (dedupe, discovery order preserved, ordered view non-destructive)');
}());

/* ---------- P3b THE ARRANGEMENT IS STABLE UNDER n -> n+1 ----------
   The whole reason the arrangement is pairwise-banded rather than
   divisor-derived. A carry must add or remove EXACTLY ONE cell and leave
   every other counter where it was: that is what makes the moved counter
   the same object, and the moved counter is the entire lesson. It is also
   the precondition for the FLIP animation, which can only interpolate a
   counter that has not been re-flowed out from under it. */
(function () {
  if (typeof T.slot !== 'function') { err('P3b no slot() — the arrangement is not a pure function of the index'); return; }
  let checked = 0;
  /* ⭐ STABILITY IS THE WHOLE POINT, and it is asserted for every whole:
     a carry cannot change the whole, so within a carry slot() must depend
     on the index alone. Two counters may never share a cell, and the
     layout of n must be a PREFIX of the layout of n+1 at a fixed whole. */
  for (let w = T.MIN_WHOLE; w <= T.MAX_WHOLE; w++) {
    const seen = new Set();
    for (let i = 0; i < w; i++) {
      const s = T.slot(i, w);
      if (!Number.isInteger(s.col) || !Number.isInteger(s.row)) { err(`P3b slot(${i},${w}) is not integer grid coords`); return; }
      const k = s.col + ',' + s.row;
      if (seen.has(k)) { err(`P3b whole ${w}: slot(${i}) collides at cell ${k}`); return; }
      seen.add(k);
      const again = T.slot(i, w);
      if (again.col !== s.col || again.row !== s.row) { err('P3b slot is not deterministic'); return; }
      checked++;
    }
  }
  if (checked < 200) { err(`P3b only ${checked} slots checked — this loop measured almost nothing`); return; }

  /* ⭐ READING ORDER, IN A GRID HALF THE WHOLE WIDE — and the reason is
     the two-tone nest. Column-major pairs give the same stability, but
     they put the colour boundary on a DIAGONAL, and the entire two-tone
     design rests on the nest being ONE UNBROKEN RUN whose length never
     changes while exactly one counter changes coat. Reading order is what
     makes that run contiguous. (The render is what refuted the pairs; no
     model check could have.) */
  const key = (i, w) => { const s = T.slot(i, w); return s.col + ',' + s.row; };
  if (key(0, 6) !== '1,1' || key(1, 6) !== '2,1') { err('P3b whole 6: the first two counters are not side by side in row one'); return; }
  if (key(3, 6) !== '1,2') { err('P3b whole 6: the fourth counter did not start row two'); return; }
  if (T.colsFor(6) !== 3 || T.rowsFor(6) !== 2) err(`P3b a whole of six should be 3x2, not ${T.colsFor(6)}x${T.rowsFor(6)}`);
  if (T.colsFor(10) !== 5 || T.rowsFor(10) !== 2) err('P3b a whole of ten should be 5x2 — the ten-structure, exactly at ten');
  if (T.colsFor(20) !== 5 || T.rowsFor(20) !== 4) err('P3b a whole of twenty should be 5x4');
  /* ⭐ CONTIGUITY IN READING ORDER — the thesis, at the model layer. The
     first `a` counters and the remaining `b` must occupy two unbroken
     runs when the cells are read left-to-right, top-to-bottom. */
  for (let w = T.MIN_WHOLE; w <= T.MAX_WHOLE; w++) {
    const order = [];
    for (let i = 0; i < w; i++) { const s = T.slot(i, w); order.push({ i, r: s.row, c: s.col }); }
    order.sort((x, y) => x.r - y.r || x.c - y.c);
    for (let k = 0; k < order.length; k++) {
      if (order[k].i !== k) { err(`P3b whole ${w}: reading order does not match fill order at position ${k} (found counter ${order[k].i})`); return; }
    }
  }
  /* the containers reserve rows by the WHOLE, so all three are identical
     and a cloth can never change a tray height */
  /* rows are DERIVED from the whole and the column count, not stepped by
     hand: eleven needs three rows of five, not four. */
  if (T.rowsFor(10) !== 2 || T.rowsFor(11) !== 3 || T.rowsFor(20) !== 4)
    err(`P3b rowsFor is not ceil(whole/cols): 10->${T.rowsFor(10)}, 11->${T.rowsFor(11)}, 20->${T.rowsFor(20)}`);
  /* the reserved grid must be exactly big enough to hold the whole in ONE
     container — a part can BE the whole — and no bigger, or a tray of
     three sits against the left edge of five empty columns */
  /* the reserved grid must be exactly big enough to hold the whole in ONE
     container — a part can BE the whole — and no bigger, or a tray of
     three sits against the left edge of five empty columns */
  for (let w = T.MIN_WHOLE; w <= T.MAX_WHOLE; w++) {
    const cols = T.colsFor(w), rows = T.rowsFor(w), cells = cols * rows;
    if (cells < w) err(`P3b whole ${w}: the reserved grid holds ${cells}, which cannot fit ${w} in one tray`);
    if (cols > T.COLS) err(`P3b whole ${w}: ${cols} columns exceeds the ${T.COLS}-column band`);
    if (rows < 2) err(`P3b whole ${w}: a part-whole tray is never one row deep`);
    if ((rows - 1) * cols >= w && rows > 2) err(`P3b whole ${w}: ${rows} rows is one more than ${w} needs`);
    for (let i = 0; i < w; i++) {
      const s = T.slot(i, w);
      if (s.col > cols || s.row > rows)
        err(`P3b whole ${w}: slot(${i}) lands at ${s.col},${s.row} outside the reserved ${cols}x${rows} grid`);
    }
  }
  /* ⚠ AND THE RENDERER MUST ACTUALLY CALL slot(). The first build of the
     renderer did not, so the counters fell into DOM order and a whole of
     six drew as five-and-one — the exact structure the arrangement exists
     to refuse — while every model check here stayed green. A verified
     model the renderer ignores is worth nothing, and no amount of model
     checking can notice. */
  const bc = (SRC.match(/_buildCounter:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!bc) { err('P3b could not read _buildCounter'); return; }
  if (!/this\.slot\(i,\s*this\.frame\.whole\)/.test(bc)) err('P3b _buildCounter never calls slot() — the arrangement is verified and unused');
  if (!/gridColumn/.test(bc) || !/gridRow/.test(bc)) err('P3b _buildCounter does not place the counter on the grid');
  if (!/_buildCounter\(this\._sideFor\(which, i\), i\)/.test(SRC_NC))
    err('P3b the container does not pass the index to _buildCounter');
  if (!/--pwf-cols/.test(SRC_NC) || !/--pwf-rows/.test(SRC_NC))
    err('P3b the sheet does not publish its reserved grid to the stylesheet');
  console.log(`  P3b arrangement ok (${checked} cells across ${T.MAX_WHOLE - T.MIN_WHOLE + 1} wholes, reading order, contiguous)`);
}());

/* ---------- P4 setWhole clamps, invariant survives the teacher's move ---------- */
(function () {
  let f = T.newFrame(9, 9);
  f = T.setWhole(f, 4);
  if (f.a > f.whole) err('P4 setWhole left part one larger than the whole');
  if (f.a + T.partB(f) !== f.whole) err('P4 setWhole broke conservation');
  if (T.setWhole(f, 999).whole !== T.MAX_WHOLE) err('P4 setWhole did not clamp the ceiling');
  if (T.setWhole(f, -5).whole !== T.MIN_WHOLE) err('P4 setWhole did not clamp the floor');
  /* ⚠ CLAMPED, NOT SCALED — and conservation alone cannot tell the two
     apart, which is why a scaling mutant survived the first version of
     this check. Growing the whole must drop the new counter into part
     TWO and leave part one exactly where the child put it; scaling it
     proportionally moves a counter nobody touched. */
  let keep = T.setWhole(T.newFrame(9, 3), 20);
  if (keep.a !== 3) err(`P4 setWhole SCALED part one (3 -> ${keep.a}) instead of leaving it alone`);
  let shrink = T.setWhole(T.newFrame(20, 17), 5);
  if (shrink.a !== 5) err(`P4 setWhole did not clamp part one down to the new whole (got ${shrink.a})`);
  console.log('  P4 setWhole ok (clamped both ends, part one held, invariant holds)');
}());

/* ---------- P5 ANTI-GRADING — the structural fence ---------- */
(function () {
  const banned = [/\bisCorrect\b/, /\banswerKey\b/, /\breadOnly\b/, /\bcheckAnswer\b/, /\bgrade\b/];
  banned.forEach((re) => { if (re.test(SRC_NC)) err(`P5 grading surface present: ${re}`); });
  ['isCorrect', 'answerKey', 'missing', 'readOnly'].forEach((k) => {
    if (typeof T[k] === 'function') err(`P5 the engine exposes ${k}() — this tool has nothing to check`);
  });
  if (/\bCheck\b/.test(JSON.stringify(T.strings))) err('P5 a Check surface leaked into the strings');
  /* a `tasks` array is what makes the shell render activity chrome —
     a Check button, a Next, a prompt line, the whole graded frame. This
     tool is free-play and must never grow one. */
  if (T.tasks !== undefined) err('P5 the tool declares tasks — the shell would render the graded activity chrome');
  if (typeof T.nextTask === 'function') err('P5 the tool declares nextTask — this is not a task-driven activity');
  if (!/nothing to check|no right answer|correct BY DEFINITION|correct by definition/i.test(SRC))
    warn('P5 the header no longer states that there is nothing to check');
  console.log('  P5 anti-grading ok (no verdict surface, no answer key)');
}());

/* ---------- P6 identity ---------- */
(function () {
  if (T.id !== 'part-whole-frame') err('P6 id');
  if (T.STORE_KEY !== 'lcs:part-whole-frame:v2') err('P6 STORE_KEY literal');
  if (T.premium !== false) err('P6 premium must default false');
  if (T.ENT_TRUST_DAYS !== 14) err('P6 ENT_TRUST_DAYS must be 14');
  if (T.MIN_WHOLE !== 2 || T.FREE_MAX_WHOLE !== 10 || T.MAX_WHOLE !== 20) err('P6 band constants');
  console.log('  P6 identity ok');
}());

/* ---------- P6b TOTALITY — every settings value resolves ----------
   `st || newState()` catches null and 0 and hands the bad value straight
   through; the recorded Lids defect. Every resolver here must be TOTAL,
   because the renderer branches on the resolved value and never re-checks
   it — and localStorage is a surface a user can hand-edit. */
(function () {
  const junk = [undefined, null, 0, '', false, true, 'nope', {}, [], NaN, -1];
  const cases = [
    ['toneFor', T.TONES, 'one'],
    ['shapeFor', T.SHAPES, 'disc'],
    ['notationFor', T.NOTATIONS, 'off']
  ];
  cases.forEach(([fn, set, dflt]) => {
    if (!Array.isArray(set) || !set.length) { err(`P6b ${fn}: its value set is empty — this check would be vacuous`); return; }
    junk.forEach((j) => {
      const out = T[fn](j);
      if (set.indexOf(out) === -1) err(`P6b ${fn}(${JSON.stringify(j)}) === ${JSON.stringify(out)}, outside its own set`);
    });
    set.forEach((v) => { if (T[fn](v) !== v) err(`P6b ${fn} did not pass through its own value ${v}`); });
    if (T[fn](undefined) !== dflt) err(`P6b ${fn} default is not ${dflt}`);
  });
  /* the v1 store held a BOOLEAN in `notation`; a tool that shipped once
     has users whose localStorage still does */
  if (T.notationFor(true) !== 'sum') err('P6b notationFor(true) must migrate the v1 boolean to the single sum');
  if (T.notationFor(false) !== 'off') err('P6b notationFor(false) must migrate the v1 boolean to off');
  junk.concat(['coral-ink', 'ink-bone']).forEach((j) => {
    const s = T.schemeFor(j);
    if (!s || !s.c1 || !s.c2) err(`P6b schemeFor(${JSON.stringify(j)}) did not resolve to a whole scheme`);
  });
  if (T.schemeFor('nope') !== T.SCHEMES[0]) err('P6b schemeFor does not fall back to the first scheme');
  console.log('  P6b totality ok (tone/shape/notation/scheme resolve for every junk value)');
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

/* ---------- P10b THE COLOUR SCHEMES ARE MEASURED, NOT DECLARED ----------
   A pair whose two members differ only in HUE vanishes under deuteranopia
   and in greyscale, and the two-tone nest is the representation the whole
   rebuild rests on. So the separation is computed from the shipped hexes
   here; the numbers in the tool's comment are documentation, this is the
   authority. Fix the colours, never this threshold.

   Two independent requirements, and neither implies the other:
     dL*  >= 20   the pair is told apart by LIGHTNESS, so hue is optional
     edge >= 3:1  against the DARKEST tray stop, because the counter's
                  legibility at six metres is carried by its edge, not its
                  fill (which is why a light fill ships a thicker edge). */
(function () {
  const TRAY_DARKEST = '#EEE2CA';          // the tray gradient's darkest stop
  const hex = (h) => {
    const m = /^#([0-9a-f]{6})$/i.exec(String(h));
    return m ? [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16) / 255) : null;
  };
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const Y = (h) => { const c = hex(h); return c ? 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]) : null; };
  const Lstar = (y) => (y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : y * 24389 / 27);
  const cr = (a, b) => { const x = Y(a), y = Y(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  /* ⚠ NON-VACUITY FIRST. A colour check that runs over an empty list, or
     over members with no fill, passes perfectly and has measured nothing. */
  if (!Array.isArray(T.SCHEMES) || T.SCHEMES.length < 2) { err('P10b fewer than two schemes — nothing to choose between'); return; }
  if (Y('#000000') !== 0 || Math.round(cr('#000000', '#ffffff')) !== 21) { err('P10b the colour maths is wrong — black/white is not 21:1'); return; }

  const FIELDS = ['fill', 'lit', 'shade', 'edge', 'edgeSm'];
  const keys = new Set();
  let measured = 0;
  T.SCHEMES.forEach((s, i) => {
    if (!s.key) { err(`P10b scheme ${i} has no key`); return; }
    if (keys.has(s.key)) err(`P10b duplicate scheme key ${s.key}`);
    keys.add(s.key);
    ['c1', 'c2'].forEach((slot) => {
      const m = s[slot];
      if (!m) { err(`P10b ${s.key}.${slot} missing`); return; }
      FIELDS.forEach((f) => { if (!hex(m[f])) err(`P10b ${s.key}.${slot}.${f} is not a #rrggbb hex: ${m[f]}`); });
    });
    if (!s.c1 || !s.c2 || !hex(s.c1.fill) || !hex(s.c2.fill)) return;
    if (s.c1.fill.toLowerCase() === s.c2.fill.toLowerCase())
      err(`P10b ${s.key}: both parts are the same colour — the two-tone nest would show no boundary`);
    const dL = Math.abs(Lstar(Y(s.c1.fill)) - Lstar(Y(s.c2.fill)));
    if (dL < 20) err(`P10b ${s.key}: dL* ${dL.toFixed(1)} — the pair is told apart by hue alone and dies in greyscale/CVD`);
    ['c1', 'c2'].forEach((slot) => {
      const e = cr(s[slot].edge, TRAY_DARKEST);
      if (e < 3) err(`P10b ${s.key}.${slot}: edge ${s[slot].edge} is ${e.toFixed(2)}:1 on the tray — invisible on a lit-room projector`);
      /* ⚠ MEASURE THE THING, NOT A PROXY FOR IT. The first version asked
         whether the fill was LIGHTER than the tray, and no shipped member
         is — amber sits at Y .497 against a tray at .768. The condition
         could never fire, so a member that dropped its border boost was
         invisible. What actually matters is whether the fill separates
         from the tray AT ALL: below ~2:1 it does not, and the counter's
         entire legibility is then carried by its edge, which must be
         thicker to carry it. */
      const fillSep = cr(s[slot].fill, TRAY_DARKEST);
      if (fillSep < 2 && !(s[slot].bwx > 1))
        err(`P10b ${s.key}.${slot}: fill is only ${fillSep.toFixed(2)}:1 on the tray and ships no bwx border boost`);
      /* the ramp must actually be a ramp, or the token has no volume */
      if (!(Y(s[slot].lit) > Y(s[slot].fill) && Y(s[slot].fill) > Y(s[slot].shade)))
        err(`P10b ${s.key}.${slot}: lit/fill/shade is not a descending luminance ramp`);
      if (!(Y(s[slot].edgeSm) < Y(s[slot].edge)))
        err(`P10b ${s.key}.${slot}: edgeSm is not darker than edge — the small-size contrast buy-back does nothing`);
      measured++;
    });
    /* the drawer swatch must show the PAIR, or the teacher cannot predict
       what they are choosing */
    const v = T.schemeValue(s);
    if (v.indexOf(s.c1.fill) === -1 || v.indexOf(s.c2.fill) === -1)
      err(`P10b ${s.key}: the drawer swatch does not show both colours`);
    if (T.schemeFor(v) !== s) err(`P10b ${s.key}: schemeFor could not resolve its own swatch value back`);
  });
  if (measured !== T.SCHEMES.length * 2) { err(`P10b measured ${measured} members, expected ${T.SCHEMES.length * 2}`); return; }
  /* ⚠ NEVER RED-VS-GREEN, which is a verdict before it is a colour */
  T.SCHEMES.forEach((s) => {
    const hueish = (h) => { const c = hex(h); return c ? { r: c[0], g: c[1], b: c[2] } : null; };
    const A = hueish(s.c1.fill), B = hueish(s.c2.fill);
    const redish = (c) => c.r > 0.45 && c.g < 0.35 && c.b < 0.35;
    const greenish = (c) => c.g > 0.4 && c.r < 0.35 && c.b < 0.35;
    if ((redish(A) && greenish(B)) || (greenish(A) && redish(B)))
      err(`P10b ${s.key}: red-vs-green reads as wrong-vs-right and is unusable under deuteranopia`);
  });
  console.log(`  P10b schemes ok (${T.SCHEMES.length} pairs, ${measured} members, dL* + edge contrast measured)`);
}());

/* ---------- P11 diagram descriptors are renderer-true ---------- */
(function () {
  const ALLOWED = ['system', 'layout', 'legs'];
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
     stylesheet only.

     ⚠ THE RULE IS SCOPING, NOT A NAME WHITELIST. The first version of this
     check allowed exactly `.lcs-header`, which meant the two sanctioned
     wide-viewport hooks the shell itself reserves at lcs-shell.css:99-109
     (`body.<ns>-wide .lcs-app`, and the stage as a query container) read
     as violations while an UNSCOPED `.lcs-header` inside @media print read
     as fine. Measure the thing the rule is about: every `.lcs-` selector
     this tool emits must be preceded by `body.pwf-wide`, whichever class
     it names.

     ⚠ AND THE SCOPE IS ANY body CLASS THIS TOOL OWNS, not the one literal
     `pwf-wide`. The second version hard-coded that name and then fired on
     `body.pwf-paid .lcs-header` — a correctly scoped rule, condemned
     because the check knew one scope and the tool had grown two. Measure
     the property (a `body.pwf-*` ancestor), not the instance.
     Poison-tested below in both directions. */
  const lcsSel = SRC_NC.match(/\.lcs-[a-z-]+/g) || [];
  if (!lcsSel.length) err('P12 found no .lcs- selectors at all — this check would pass vacuously');
  const SCOPED = /body\.pwf-[a-z-]+\s+\.lcs-[a-z-]+$/;
  const unscoped = (SRC_NC.match(/(.{0,22})(\.lcs-[a-z-]+)/g) || []).filter((m) => !SCOPED.test(m));
  unscoped.forEach((m) => err(`P12 writes an UNSCOPED shell selector: ...${m.trim()}`));
  /* ⚠ a scope check that has only ever been shown to pass is not a check */
  if (SCOPED.test("'.lcs-stage{container-type")) err('P12 the scope check accepts a bare .lcs- selector — it cannot fail');
  if (!SCOPED.test("'body.pwf-paid .lcs-header")) err('P12 the scope check rejects a correctly scoped selector — it is too narrow');
  // the print block must re-tone every ink the tool draws, not just one
  const printBlock = (SRC.match(/@media print\{[\s\S]*?\n\s*\+ '\}';/) || [''])[0];
  /* ⚠ Match the SELECTOR, not the substring. `indexOf('pwf-dot')` is
     satisfied by `.pwf-dotZ`, so a renamed-away print rule survived the
     check — the counters would have printed as invisible screen-coral
     while the gate reported the block complete. */
  /* ⚠ THE PRINT SURFACE CHANGED, so what is measured changed with it. The
     printed pages are now their OWN DOM (a mat and the class's record), so
     the requirement is no longer "re-tone the screen ink" but "hide every
     screen surface and style every printed one". Fixing what is measured
     when the artefact genuinely changes is the correct move; loosening the
     threshold to let the old assertion pass would not be. */
  const PRINT_HIDDEN = ['pwf-head', 'pwf-controls', 'pwf-ways', 'pwf-sheet', 'pwf-notation', 'pwf-peg', 'pwf-cloth', 'pwf-main'];
  const PRINT_INK = ['pwf-printmat', 'pwf-printways', 'pwf-printhead', 'pwf-pdish', 'pwf-pdot', 'pwf-pglyph', 'pwf-pnum', 'pwf-pwaybar'];
  if (!printBlock) { err('P12 could not read the print block — this check would pass vacuously'); return; }
  PRINT_HIDDEN.forEach((cls) => {
    if (!new RegExp('\\.' + cls + '\\s*[{,]').test(printBlock))
      err(`P12 print block does not hide .${cls} — screen ink reaches paper and prints near-blank`);
  });
  PRINT_INK.forEach((cls) => {
    if (!new RegExp('\\.' + cls + '\\s*[{,\\[]').test(printBlock))
      err(`P12 print block does not style .${cls} — the printed page has an unstyled surface`);
  });
  if (!/print-color-adjust:\s*exact/.test(printBlock)) err('P12 no print-color-adjust:exact — drivers drop the greys and dashes');
  if (!/break-after:\s*page|page-break-after/.test(printBlock)) err('P12 the mat and the record are not on separate pages');
  console.log(`  P12 css ok (idempotent, ${PRINT_HIDDEN.length} screen surfaces hidden, ${PRINT_INK.length} printed surfaces styled)`);
}());

/* ---------- P13 THE REFUSALS, ENFORCED ----------
   Each of these is something the old build either shipped or was one
   commit away from shipping, and each is forbidden by the file's own
   REFUSES list. A rule that lives only in a comment is a rule that gets
   shipped past. */
(function () {
  /* the pre-drawn empty ways rows: a wall of 21 dashed boxes IS the
     "you missed three" verdict, and the old build forbade it in one
     comment and shipped it behind a toggle in the next */
  [/showEmpty/, /wayblank/, /waysFor/].forEach((re) => {
    if (re.test(SRC_NC)) err(`P13 the pre-drawn empty rows are back: ${re}`);
  });
  /* ⚠ (?<!\p{L}) NOT \b. \b is ASCII-only, so `\bpistettä\b` and
     `\bpontuação\b` can never match and a ban policed with it is dead in
     exactly the languages it was written for. */
  const COUNTER = /(?<!\p{L})\d+\s*(?:\/|of|von|sur|di|de|van|av|af|\/)\s*\d+(?!\p{L})/iu;
  Object.keys(T.strings).forEach((k) => {
    ALL.forEach((loc) => {
      const v = T.strings[k][loc];
      if (v && COUNTER.test(v)) err(`P13 ${k}.${loc} reads as a "found x of y" counter: "${v}"`);
    });
  });
  /* the ways record must never expose a count of what is missing */
  if (/ways\s*\.\s*length\s*\+\s*['"]\s*\//.test(SRC_NC) || /remaining|missing|left to find/i.test(SRC_NC))
    err('P13 the record computes what has not been found yet');
  console.log('  P13 refusals ok (no empty rows, no found-count, no remaining-count)');
}());

/* ---------- P14 THE CLOTH HOLDS IN EVERY CHANNEL ----------
   A tool that hides a number on screen and then speaks it aloud, posts it
   to the live region, or leaves it colour-coded in the nest has not hidden
   it. The old build did all three. */
(function () {
  const say = (SRC.match(/_sayerSplit:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!say) { err('P14 could not read _sayerSplit — this check would pass vacuously'); return; }
  if (!/_anyCovered\(\)/.test(say)) err('P14 the spoken split does not check the cloths — it says the hidden number aloud');
  const sayNum = (SRC.match(/\n  _say:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/_anyCovered\(\)/.test(sayNum)) err('P14 _say does not check the cloths');
  const carry = (SRC.match(/_carry:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!carry) { err('P14 could not read _carry'); return; }
  if (!/!this\._anyCovered\(\)[\s\S]*announce/.test(carry)) err('P14 the live region announces the split while a cloth is down');
  /* the two-tone nest leaks the hidden PART specifically, which is a
     narrower condition than "anything is covered" */
  if (typeof T._anyPartCovered !== 'function') err('P14 no _anyPartCovered — the two-tone nest cannot be neutralised');
  if (!/pwf-partcovered[\s\S]{0,200}pwf-box-whole[\s\S]{0,120}pwf-dot/.test(SRC_NC))
    err('P14 the part-covered rule does not neutralise the nest counters');
  /* ⚠ THE CLASS EXISTING IN THE STYLESHEET IS NOT THE CLASS BEING
     APPLIED. The first version grepped for `pwf-partcovered` and was
     satisfied by the CSS rule alone, so deleting the one line that puts
     the class on the sheet survived — the rule sat there, styling
     nothing, while the nest went on answering "how many are hiding". */
  const build = (SRC.match(/_buildSheet:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!build) { err('P14 could not read _buildSheet'); return; }
  if (!/_anyPartCovered\(\)[\s\S]{0,60}pwf-partcovered/.test(build))
    err('P14 _buildSheet never APPLIES pwf-partcovered — the rule styles nothing');
  /* ⚠ AND THE RECORD IS A FOURTH CHANNEL. The row showing the split
     currently on the board IS the answer to "how many are hiding". The
     voice, the live region and the nest were all handled and this one was
     not; only looking at the covered render found it. */
  const wr = (SRC.match(/_wayRow:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!wr) { err('P14 could not read _wayRow'); return; }
  if (!/_anyPartCovered\(\)/.test(wr)) err('P14 the record does not blind the current row while a part is covered');
  if (!/numerals && !blind/.test(wr)) err('P14 the record still prints the hidden numerals');
  if (!/if \(!blind\) row\.setAttribute\('aria-label', split\)/.test(wr))
    err('P14 the blinded row still states the split in its accessible name');
  /* ⭐ and the row you are already on is NOT A CONTROL — `_useWay`
     refuses to re-apply the split already on the board, so a button there
     can never have a consequence. This is the one real FAIL the shared
     liveness audit found. */
  if (!/api\.el\(current \? 'div' : 'button'/.test(wr))
    err('P14 the current record row is still a button that can do nothing');
  if (!/if \(!current\) row\.addEventListener/.test(wr))
    err('P14 the current record row still carries a click handler');
  console.log('  P14 cloth ok (silent voice, silent live region, neutral nest)');
}());

/* ---------- P14b WHAT THREE NATIVE PANELS FOUND ----------
   Every assertion in this block exists because a native panel READ THE
   MODEL and reported a defect no gate in this file could see. They were
   briefed to audit the English as a SOURCE; they audited the code too,
   and between them found five model bugs and a dozen copy defects. This
   is what keeps them fixed. */
(function () {
  /* ⭐ the biggest glyph on the board was answering "how many altogether"
     while the nest sat under a cloth */
  const head = (SRC.match(/_buildHead:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!head) { err('P14b could not read _buildHead'); return; }
  if (!/covers\.whole \?\s*'\?'\s*:\s*String\(this\.frame\.whole\)/.test(head))
    err('P14b the stepper prints the whole the cloth is hiding — the largest numeral on the board');
  /* a live control that cannot act is furniture, and the stepper had two */
  if (!/atFloor \|\| atCeiling/.test(head)) err('P14b the stepper does not state its own bounds');
  if (!/self\.premium \? self\._maxWhole\(\) : self\.MAX_WHOLE/.test(head))
    err('P14b the ceiling test would disable the very press that surfaces the upsell for a free visitor');
  /* narrowing the band is a new question too */
  const os = (SRC.match(/onSettings:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/narrowed\.whole !== this\.frame\.whole[\s\S]{0,120}recordSplit\(\[\]/.test(os))
    err('P14b narrowing the band leaves a record describing a number that is no longer on the board');
  /* Start again clears the lesson, not the teacher's setup */
  const ra = (SRC.match(/_resetAll:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (/_todaysWhole\(\)\)\s*;/.test(ra) && !/this\.frame \? this\.frame\.whole/.test(ra))
    err('P14b Start again throws away the number the teacher set');
  /* the outward arrow pointed at the wrong tray */
  if (/ArrowLeft' && which === 'a'/.test(SRC_NC))
    err('P14b the focus arrow is inverted again — ArrowLeft on the LEFT tray moved focus right');
  /* a covered tray advertised a grab and refused it */
  const sd = (SRC.match(/_startDrag:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/if \(!covered && !dots\.length\) return;/.test(sd))
    err('P14b a covered tray still refuses the drag its cursor advertises');
  /* the whole record goes blind, not only the current row */
  const wr2 = (SRC.match(/_wayRow:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/var blind = this\._anyPartCovered\(\);/.test(wr2))
    err('P14b only part of the record goes blind — a row recorded one carry ago gives the answer by subtracting one');
  if (/_buildCounter\(blind \? 'a' : 'a'\)/.test(SRC_NC)) err('P14b the dead ternary is back');
  /* _useWay must post to the live region, like _carry does */
  const uw = (SRC.match(/_useWay:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/announce/.test(uw)) err('P14b _useWay moves the board and tells a screen-reader user nothing');
  /* ⭐⭐ THE COLOUR PICKER SHIPPED THREE BLANK CHIPS — the operator's
     headline ask, dead on arrival. `lcs-shell.js` paints a `type:'color'`
     chip with `sw.style.background = value`, so handing it the scheme KEY
     assigned the string 'coral-ink', which is not a colour. `schemeValue`
     existed, was documented as the option value, and was reachable only
     from inside `schemeFor` — a helper the renderer never called.
     ⚠ The stored value has to be the SAME value, or the shell's
     `settings[key] === val` test never marks a chip selected. */
  if (!/settings\[2\]\.options = this\.SCHEMES\.map\(function \(sc\) \{ return self0\.schemeValue\(sc\); \}\)/.test(SRC_NC))
    err('P14b the colour options are not gradients — every swatch renders blank');
  if (!/api\.settings\.scheme = this\.schemeValue\(this\.schemeFor\(api\.settings\.scheme\)\)/.test(SRC_NC))
    err('P14b the stored scheme does not match the option value — no chip is ever marked selected');
  /* ⭐ GATING THE CHIP IS NOT GATING THE FEATURE. The printed pages are
     built only for a subscriber while the print stylesheet hid the whole
     screen for everyone, so a free Ctrl+P produced a blank sheet — the
     recorded fraction-kitchen defect, back. */
  if (!/document\.body\.classList\.toggle\('pwf-paid'/.test(SRC_NC))
    err('P14b nothing marks the paid state on the body, so the print rules cannot be scoped');
  const printBlk = (SRC.match(/@media print\{[\s\S]*?\n\s*\+ '\}';/) || [''])[0];
  if (!printBlk) { err('P14b could not read the print block'); return; }
  /* ⚠ JOIN THE STRING LITERALS FIRST. The stylesheet is built by `+`
     concatenation, so one CSS rule is spread over several quoted chunks —
     and a per-chunk check cannot see a selector list whose `display:none`
     lives three chunks later. The first version of this assertion did
     exactly that and the mutation walked straight past it. Reconstruct the
     emitted CSS, then read the RULES.

     ⚠ AND RECONSTRUCT FROM THE WHOLE INJECTOR, not from a slice of it. A
     slice that begins mid-literal pairs each CLOSING quote with the next
     OPENING one, so it captures the `+ ` glue instead of the CSS — the
     second version of this check rebuilt 560 characters out of 2702 and
     found zero rules, which reads exactly like "there is nothing wrong".

     ⚠ AND STRIP THE COMMENTS FIRST. The injector's own comments contain
     apostrophes — "the tool's", "the operator's" — and a quote-pair scan
     counts them, so one odd apostrophe desyncs every literal after it and
     the rebuilt CSS silently loses the whole print block. That is what
     produced 560 chars out of 2702. SRC_NC is the comment-stripped source
     the rest of this gate already reads. */
  const inj = (SRC_NC.match(/st\.textContent = ''[\s\S]*?;\n  document\.head/) || [''])[0];
  const allCss = (inj.match(/'((?:[^'\\]|\\.)*)'/g) || []).map((q) => q.slice(1, -1)).join('');
  const printCss = allCss.slice(allCss.indexOf('@media print{'));
  if (printCss.length < 400) { err(`P14b could not reconstruct the print CSS (${printCss.length} chars) — this check would be vacuous`); return; }
  (printCss.match(/([^{}]+)\{[^{}]*display:\s*none[^{}]*\}/g) || []).forEach((rule) => {
    const sel = rule.slice(0, rule.indexOf('{'));
    sel.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => {
      if (!/^body\.pwf-paid\s/.test(s))
        err(`P14b the print block hides "${s}" for EVERYONE — a free Ctrl+P prints nothing`);
    });
  });
  if (!/body\.pwf-paid \.pwf-printmat\{display:block/.test(printBlk))
    err('P14b the printed mat is not scoped to the paid state');
  console.log('  P14b panel findings ok (stepper, bounds, band-narrow, reset, arrows, covered drag, record, announce, swatches, print gating)');
}());

/* ---------- P15 THE DRAG FLAG HAS ONE OWNER ----------
   The recorded defect: `_dragMoved` was reset inside the tray's click
   handler, and `_carry` -> `render()` -> `stage.innerHTML=''` destroys
   that tray BEFORE the browser dispatches click. So every completed
   drag-carry swallowed the next tap, on the success path, silently. */
(function () {
  const resets = (SRC_NC.match(/_dragMoved\s*=\s*false/g) || []).length;
  if (resets < 2) { err('P15 _dragMoved is never released outside _startDrag'); return; }
  const click = (SRC_NC.match(/addEventListener\('click',\s*function \(e\) \{[\s\S]{0,220}?\}\);/) || [''])[0];
  if (/_dragMoved\s*=\s*false/.test(click))
    err('P15 the click handler resets _dragMoved — it runs on a node render() has already destroyed');
  if (!/setTimeout\(function \(\) \{ self\._dragMoved = false; \}, 0\)/.test(SRC_NC))
    err('P15 _dragMoved is not released on a macrotask from the gesture that set it');
  console.log('  P15 drag flag ok (owned by the gesture, released on a macrotask)');
}());

/* ---------- P16 THE CONNECTORS ARE MEASURED, NOT GUESSED ----------
   Percentages of one box cannot address another box: the old build drew
   the legs into a 340px-capped viewBox while the sheet ramped to 1300px,
   so the feet landed 38px away from the trays they pointed at and the
   error grew with every wide tier. Nothing measured whether a line
   touched a thing. */
(function () {
  const fn = (SRC.match(/_layoutLegs:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!fn) { err('P16 no _layoutLegs — the connectors are not measured'); return; }
  ['pwf-box-a', 'pwf-box-b', 'pwf-box-whole'].forEach((n) => {
    if (fn.indexOf(n) === -1) err(`P16 _layoutLegs never reads ${n}`);
  });
  /* ⚠ EVERY FOUR RECTS MUST BE MEASURED, INCLUDING THE SHEET'S. A single
     `indexOf('getBoundingClientRect')` is satisfied by the three tray
     rects while the SHEET's origin is a hard-coded box — which is exactly
     the old defect wearing a new hat, because the endpoints are expressed
     relative to that origin. Count them. */
  const rects = (fn.match(/getBoundingClientRect\(\)/g) || []).length;
  if (rects < 4) err(`P16 _layoutLegs measures only ${rects} rects — the sheet, the nest and both trays are four`);
  if (!/sheet\.getBoundingClientRect\(\)/.test(fn)) err('P16 the sheet origin is not measured — the endpoints are relative to a guess');
  /* the observer must be CONSTRUCTED and OBSERVING, not merely named in
     a typeof guard */
  if (!/new ResizeObserver\(/.test(SRC_NC)) err('P16 the ResizeObserver is never constructed');
  if (!/\.observe\(/.test(SRC_NC)) err('P16 the ResizeObserver never observes anything');
  if (!/_layoutLegs\(\);?\s*\}\s*\)/.test(SRC_NC)) err('P16 nothing recomputes the legs on resize');
  if (/\.pwf-legs\{[^}]*width:\s*min\(/.test(SRC_NC)) err('P16 the legs SVG carries a width cap again');
  if (/preserveAspectRatio/.test(SRC_NC)) err('P16 the legs still stretch a viewBox instead of using real pixels');
  console.log('  P16 connectors ok (measured off rendered rects, recomputed on resize)');
}());

/* ---------- P17 PREMIUM WHOLES ARE ABSENT, NOT DISABLED ----------
   The header has always claimed this. The old build shipped a static
   options array, gated on tap, and then left the drawer showing 20
   selected while the model said 10. */
(function () {
  const opts = T.settings.find((s) => s.key === 'band');
  if (!opts) { err('P17 no band setting'); return; }
  if (typeof T._applyBandOptions !== 'function') { err('P17 no _applyBandOptions — the option list is static'); return; }
  const stub = Object.create(T);
  stub.settings = JSON.parse(JSON.stringify(T.settings));
  stub.premium = false; stub._applyBandOptions();
  const free = stub.settings.find((s) => s.key === 'band').options;
  if (free.indexOf('20') !== -1) err('P17 a free visitor is still offered the 20 band');
  stub.premium = true; stub._applyBandOptions();
  const paid = stub.settings.find((s) => s.key === 'band').options;
  if (paid.indexOf('20') === -1) err('P17 a subscriber is not offered the 20 band');
  if (!/_applyBandOptions\(\)/.test((SRC.match(/_fetchEntitlement:[\s\S]*?\n  \},/) || [''])[0]))
    err('P17 the entitlement callback does not re-apply the band options');
  /* the quick-set chips carry the same rule */
  stub.premium = false;
  if (stub._quickWholes().indexOf(20) !== -1) err('P17 a free visitor is offered a 20 quick-set chip');
  stub.premium = true;
  if (stub._quickWholes().indexOf(20) === -1) err('P17 a subscriber is not offered a 20 quick-set chip');
  console.log('  P17 band gate ok (absent for free, present for paid, re-applied on entitlement)');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
