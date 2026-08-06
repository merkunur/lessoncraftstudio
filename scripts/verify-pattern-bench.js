#!/usr/bin/env node
/* =====================================================================
   verify-pattern-bench.js — MEASURED build-gate for Pattern Bench
   (mini tools/pattern-bench.js). FIX THE TOOL, NEVER THE GATE.

   ⚠ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Where it needs to know
   what an answer should be, it computes it here by different arithmetic
   rather than asking the tool — reading the expectation off the subject
   is how 19 of 51 mutations survived on number-sieve.

   Invariants:
     P1  STRIP IS THE UNIT   cellAt(i) === unit[(i-phase) mod k] for every
                             reachable (unit, phase, i) — exhaustively
     P2  ⭐ COSTUME-BLIND     the letter sequence is IDENTICAL under every
                             medium. This is the thesis: a pattern is its
                             unit, not its surface. Non-vacuity asserted
                             FIRST, or '' === '' passes it.
     P3  ⭐ THE SLIDE IS STRIP-PRESERVING. Exhaustive over every unit of
                             every legal length x every legal phase x both
                             directions. Invention #2, and the mechanism
                             that makes the tool's gate-5 claim testable.
     P4  ⭐ AN EDIT CHANGES EXACTLY ITS CONGRUENCE CLASS. The operator's
                             directive as a theorem: the set of indices
                             whose letter changed EQUALS {j : j ≡ i mod k},
                             and is never empty.
     P5  THE COVER HIDES     a covered cell appends no bead and carries no
                             slot letter — it leaves the DOM, not the eye
     P6  MIDDLE COVER        any index is coverable, not just the last;
                             AND a covered bead's hidden letter follows
                             its class, or the tool contradicts its own
                             strip when the cloth is lifted
     P7  MODEL THIN          immutable, total, hostile-safe, no new fields
     P8  ⭐ MID-UNIT ALWAYS  len ≡ 1 (mod k) at EVERY reachable length and
                             after every k-transition, with >= 3 whole
                             repeats. The strip's right edge must never be
                             a free reading of the unit's edge.
     P9  CLAP IS SILENT      over a covered bead — and reduced motion must
                             remove the transition, never the signal
     P10 NO VERDICT          no grading vocabulary, no score/streak/timer
     P11 FENCE               no pattern-BLOCK, no counting sequence, and
                             NO GROWING PATTERN
     P12 IDENTITY/EXFIL      id, STORE_KEY, premium:false, one allowed fetch
     P13 ⭐ PALETTE          the four slot inks are >= 18 dE00 apart under
                             normal/protan/deutan/tritan, form a value
                             ladder, and the RING ink is >= 26 from every
                             one of them. AUTHORITATIVE OVER ANY PROPOSED
                             HEX, including the art panel's and mine.
     P14 ⭐ GLYPH MASS       the four shape glyphs land within 8% on
                             effective optical area, computed here from
                             the path data — a triangle 30% lighter than
                             a circle makes slot b read weaker than slot a
     P15 PRINT               double-locked: the sheet leaves the DOM when
                             not entitled AND every print rule is scoped
     P16 ONE GRID / CSS      shared column template, tap floor, injector
                             idempotent, no shell-internal restyling
     P17 STRINGS             every key used exists, x11, no dead strings

   Usage: node scripts/verify-pattern-bench.js
   Override for mutation testing: PTN_TOOL_DIR    Quiet: PTN_QUIET
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.PTN_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'pattern-bench.js'), 'utf8');
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const SRC_NC = strip(SRC);
const QUIET = !!process.env.PTN_QUIET;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; if (!QUIET) console.log('  warn   ' + m); };
const say = (m) => { if (!QUIET) console.log(m); };
/* ⚠ a section reports on ITS OWN result. `if (!ERRORS)` reads a GLOBAL,
   so a section that passed stayed silent because an EARLIER one failed —
   which reads exactly like the section having been skipped. */
let MARK = 0;
const mark = () => { MARK = ERRORS; };
const clean = (m) => { if (ERRORS === MARK) say(m); };

const stubEl = () => ({ style: { setProperty() {} }, setAttribute() {}, appendChild() {},
  append() {}, querySelector: () => null, querySelectorAll: () => [],
  classList: { add() {}, remove() {}, toggle() {} } });
const sandbox = {
  document: { getElementById: () => null, createElement: stubEl, createElementNS: stubEl,
    head: { appendChild() {} }, body: { classList: { add() {}, toggle() {} }, appendChild() {} },
    activeElement: null },
  window: { matchMedia: () => ({ matches: false }) },
  localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console,
  Object, Array, Number, String, Boolean, ResizeObserver: function () { this.observe = function () {}; }
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = PatternBench;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — PatternBench is not defined'); process.exit(1); }
T.api = { t: (k) => k, lang: 'en', settings: {}, announce() {} };

/* ⚠ SNAPSHOT DECLARED IDENTITY BEFORE ANY TEST WRITES TO IT. A stateful
   gate that checks a field it has itself written checks nothing. */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium,
  tasks: T.tasks, nextTask: T.nextTask };

/* ---------- the gate's OWN arithmetic, never the tool's ---------- */
const mod = (n, m) => ((n % m) + m) % m;
const allUnits = (k) => {
  const out = []; const S = ['a', 'b', 'c', 'd'];
  const rec = (c) => { if (c.length === k) { out.push(c.slice()); return; } for (const s of S) rec(c.concat(s)); };
  rec([]); return out;
};
const mk = (unit, phase, len) => ({ unit: unit.slice(), phase: phase || 0,
  len: len === undefined ? 3 * unit.length + 1 : len, covered: [], medium: 'colour',
  unitHidden: false, armed: false });
/* every (k, len) the controls can actually reach */
const reachable = (k) => {
  const out = []; let len = 3 * k + 1;
  const maxR = Math.max(3, Math.floor((T.LEN_MAX - 1) / k));
  for (let r = 3; r <= maxR; r++) out.push(r * k + 1);
  void len; return out;
};

/* ---------------- P1 the strip IS the unit ---------------- */
say('[the pattern]');
mark();
{
  let checked = 0, bad = 0;
  for (let k = 1; k <= T.UNIT_MAX; k++) {
    for (const u of allUnits(k)) {
      for (const len of reachable(k)) {
        for (let ph = 0; ph <= len - k; ph++) {
          const st = mk(u, ph, len);
          for (let i = 0; i < len; i++) {
            checked++;
            if (T.cellAt(st, i) !== u[mod(i - ph, k)]) bad++;
          }
        }
      }
    }
  }
  if (bad) err(`P1 the strip does not repeat the unit (${bad}/${checked})`);
  else clean(`  P1 the strip repeats the unit exactly (${checked.toLocaleString()} cells)`);
  if (T.cellAt(mk(['a', 'b']), -1) !== null || T.cellAt(mk(['a', 'b']), 99) !== null) err('P1 out-of-range cells must be null');
  if (T.cellAt(mk([]), 0) !== null) err('P1 an empty unit must yield null, not a crash');
}

/* ---------------- P2 ⭐ costume-blind ---------------- */
mark();
{
  const bad = [];
  let nonVacuous = 0;
  for (let k = 1; k <= T.UNIT_MAX; k++) for (const u of allUnits(k)) {
    const st = mk(u, 0);
    const base = T.sequence(st);
    /* ⚠ NON-VACUITY FIRST. '' === '' === '' would pass this happily, and
       this tool's own thesis once did exactly that on an empty row. */
    if (!base.length) { err('P2 an empty sequence cannot demonstrate costume-blindness'); break; }
    if (new Set(base).size >= 2) nonVacuous++;
    const s0 = JSON.stringify(base);
    T.MEDIA.forEach((m) => {
      if (JSON.stringify(T.sequence(T.setMedium(st, m))) !== s0) bad.push(u.join('') + '/' + m);
    });
  }
  if (bad.length) err(`P2 the costume changed the pattern: ${bad.slice(0, 3).join(', ')}`);
  if (nonVacuous < 100) err(`P2 only ${nonVacuous} sequences had >=2 distinct letters — the check is near-vacuous`);
  clean(`  P2 COSTUME-BLIND across ${T.MEDIA.join(', ')} (${nonVacuous} non-trivial patterns)`);

  const keysets = [Object.keys(T.COLOUR).join(''), Object.keys(T.SHAPE).join(''), Object.keys(T.PICTURE).join('')];
  if (new Set(keysets).size !== 1) err('P2 the three costumes do not cover the same slot set');
  if (new Set(T.SLOTS.map((s) => T.COLOUR[s].fill)).size !== T.SLOTS.length) err('P2 two slots share a colour');
  if (new Set(T.SLOTS.map((s) => T.SHAPE[s])).size !== T.SLOTS.length) err('P2 two slots share a shape path');
  if (new Set(T.SLOTS.map((s) => T.PICTURE[s].parts[0].d)).size !== T.SLOTS.length) err('P2 two slots share a picture');
  if (new Set(Object.values(T.TONE)).size !== T.SLOTS.length) err('P2 two slots share a tone');
}

/* ---------------- P3 ⭐ THE SLIDE IS STRIP-PRESERVING ---------------- */
mark();
{
  /* ⚠ COUNT INSIDE THE LOOP, REPORT ONCE OUTSIDE IT. An err() per
     iteration here emits ~39,000 lines under a mutation, and the mutation
     harness — which pipes stdio — then scores the run TIMED OUT, which it
     counts as SURVIVED. So a gate that correctly DETECTED the defect
     reported it as a gate hole. Found by reproducing the timeout rather
     than assuming it was a hang. */
  let n = 0, bad = 0, moved = 0, illegal = 0, mutated = 0;
  for (let k = 1; k <= T.UNIT_MAX; k++) for (const u of allUnits(k)) {
    for (const len of reachable(k)) {
      for (let ph = 0; ph <= len - k; ph++) {
        const st = mk(u, ph, len);
        const before = T.sequence(st).join('');
        for (const d of [-1, 1]) {
          const q = T.slideBracket(st, d); n++;
          if (T.sequence(q).join('') !== before) bad++;
          if (q.phase < 0 || q.phase > q.len - k) illegal++;
          if (q.phase !== ph) moved++;
          if (st.phase !== ph || st.unit.join('') !== u.join('')) mutated++;
        }
      }
    }
  }
  if (illegal) err(`P3 the slide produced an illegal phase (${illegal} times)`);
  if (mutated) err(`P3 the slide mutated its input (${mutated} times)`);
  /* ⚠ NON-VACUITY: a slideBracket that always refused would satisfy
     "the strip is preserved" perfectly and teach nothing. */
  if (!moved) err('P3 the bracket never actually moved — the invariant is vacuous');
  if (bad) err(`P3 ⭐ the slide changed the strip in ${bad} of ${n} cases — invention #2 is broken`);
  else clean(`  P3 ⭐ the slide is strip-preserving over ${n.toLocaleString()} slides (${moved.toLocaleString()} of them moved)`);
}

/* ---------------- P4 ⭐ AN EDIT CHANGES EXACTLY ITS CLASS ---------------- */
mark();
{
  /* same rule as P3: aggregate, never one err() per iteration */
  let n = 0, bad = 0, emptyDiff = 0, classDisagree = 0, mutatedIn = 0;
  for (let k = 1; k <= T.UNIT_MAX; k++) for (const u of allUnits(k)) {
    const len = 3 * k + 1;
    for (let ph = 0; ph <= len - k; ph++) {
      const st = mk(u, ph, len);
      const before = T.sequence(st);
      for (let i = 0; i < len; i++) {
        n++;
        const after = T.sequence(T.cycleSlotAt(st, i));
        const diff = [];
        for (let j = 0; j < before.length; j++) if (before[j] !== after[j]) diff.push(j);
        /* the gate's OWN congruence class, not the tool's classOf */
        const want = [];
        for (let j = 0; j < len; j++) if (mod(j - ph, k) === mod(i - ph, k)) want.push(j);
        if (!diff.length) { emptyDiff++; continue; }
        if (diff.join(',') !== want.join(',')) bad++;
        if (T.classOf(st, i).join(',') !== want.join(',')) classDisagree++;
        if (st.unit.join('') !== u.join('')) mutatedIn++;
      }
    }
  }
  if (classDisagree) err(`P4 classOf disagrees with the model (${classDisagree} times) — the render would ring the wrong beads`);
  if (mutatedIn) err(`P4 cycleSlotAt mutated its input (${mutatedIn} times)`);
  if (emptyDiff) err(`P4 ⭐ ${emptyDiff} edits changed NOTHING — a tap on a bead must always move its family`);
  if (bad) err(`P4 ⭐ ${bad} of ${n} edits did not change exactly the congruence class`);
  else clean(`  P4 ⭐ an edit changes exactly {j : j ≡ i mod k}, never empty (${n.toLocaleString()} edits)`);
  /* the cycle must not be a toggle: two presses must not return to start,
     or a liveness gate pressing Enter then Space scores the control DEAD */
  const s2 = mk(['a', 'b'], 0);
  if (T.cycleSlotAt(T.cycleSlotAt(s2, 0), 0).unit[0] === s2.unit[0]) {
    err('P4 cycling twice returns to the start — a toggle scores DEAD on the liveness gate');
  }
}

/* ---------------- P5/P6 the cover ---------------- */
say('[the cover]');
mark();
{
  const covSrc = (SRC_NC.match(/if \(this\.isCovered\(this\.st, idx\)\) \{[\s\S]*?\} else \{[\s\S]*?\}/) || [''])[0];
  if (!covSrc) err('P5 could not find the covered branch');
  else {
    const head = covSrc.split('} else {')[0];
    if (/_bead\(/.test(head)) err('P5 a covered cell still draws its bead');
    else if (/aria-label[^)]*slot/i.test(head)) err('P5 a covered cell leaks its slot in aria');
  }
  let cov = mk(['a', 'b', 'c'], 0, 10);
  [0, 4, 5, 9].forEach((i) => { cov = T.toggleCover(cov, i); });
  if (cov.covered.length !== 4) err(`P6 not every index is coverable (${cov.covered.length}/4)`);
  if (cov.covered.indexOf(4) === -1 || cov.covered.indexOf(5) === -1) err('P6 an interior cell could not be covered');
  if (T.toggleCover(cov, 99).covered.length !== cov.covered.length) err('P6 an out-of-range cover was accepted');
  if (T.toggleCover(cov, 5).covered.indexOf(5) > -1) err('P6 covering is not a toggle');

  /* ⭐ A COVERED BEAD'S HIDDEN LETTER MUST FOLLOW ITS CLASS. Cover bead
     5, cycle a sibling, lift the cloth: it must read the NEW value. If it
     did not, the tool would contradict its own strip in front of a class
     the moment the teacher lifted the cover. */
  let s = mk(['a', 'b'], 0, 7);
  s = T.toggleCover(s, 5);
  const wasHidden = T.cellAt(s, 5);
  const sibling = T.classOf(s, 5).filter((j) => j !== 5)[0];
  if (sibling === undefined) err('P6 bead 5 has no sibling to cycle — the check would be vacuous');
  else {
    const t2 = T.cycleSlotAt(s, sibling);
    if (T.cellAt(t2, 5) === wasHidden) err('P6 ⭐ a covered bead did not follow its class — lifting the cloth would contradict the strip');
  }
  clean('  P5/P6 the cover hides, any index is coverable, and what is hidden still follows its class');
}

/* ---------------- P7 the model ---------------- */
say('[model]');
mark();
{
  const st = T.newState();
  const keys = Object.keys(st).sort().join(',');
  if (keys !== 'armed,covered,len,medium,phase,unit,unitHidden') err(`P7 unexpected state fields: ${keys}`);
  const a = T.setUnitSlot(st, 0, 'c');
  if (st.unit[0] === 'c') err('P7 setUnitSlot mutated the input');
  if (a.unit[0] !== 'c') err('P7 setUnitSlot did not set');
  if (T.toggleCover(st, 3).covered.length !== 1 || st.covered.length !== 0) err('P7 toggleCover is not immutable');
  try {
    T.setUnitSlot(st, 9, 'a'); T.setUnitSlot(st, 0, 'zz'); T.setMedium(st, 'nope');
    T.sequence(null); T.isCovered(null, 0); T.classOf(null, 0); T.slideBracket(st, 'x');
    T.setUnitLength(st, -5); T.setLen(st, 'q'); T.cycleSlotAt(st, -1); T.normLen(0, 0);
  } catch (e) { err('P7 the engine threw on a hostile input: ' + e.message); }
  if (T.setMedium(st, 'nope').medium !== st.medium) err('P7 an unknown medium was accepted');
  if (T.setUnitSlot(st, 0, 'zz').unit[0] === 'zz') err('P7 an unknown slot was accepted');
  [0, 1, 5, 9, -2, 'x'].forEach((n) => {
    const r = T.setUnitLength(st, n);
    if (r.unit.length < T.UNIT_MIN || r.unit.length > T.UNIT_MAX) err(`P7 setUnitLength(${n}) produced a unit of ${r.unit.length}`);
  });
  for (let n = T.UNIT_MIN; n <= T.UNIT_MAX; n++) {
    if (T.setUnitLength(st, n).unit.length !== n) err(`P7 setUnitLength(${n}) failed`);
  }
  clean(`  P7 state is {${keys}}, immutable, total, hostile-safe`);
}

/* ---------------- P8 ⭐ MID-UNIT ALWAYS ---------------- */
mark();
{
  let n = 0, boundary = 0, thin = 0;
  for (let k = T.UNIT_MIN; k <= T.UNIT_MAX; k++) {
    let s = T.setUnitLength(T.newState(), k);
    for (;;) {
      n++;
      /* ⚠ k=1 is exempt BY DEFINITION: every length is a multiple of 1,
         and a unit of one has no boundary to give away. */
      if (k > 1 && s.len % k !== 1) boundary++;
      if (Math.floor(s.len / k) < 3) thin++;
      const before = s.len;
      s = T.setLen(s, s.len + k);
      if (s.len === before) break;
    }
  }
  /* and across every k-transition, which is where a re-normalise is missed */
  for (let k1 = T.UNIT_MIN; k1 <= T.UNIT_MAX; k1++) for (let k2 = T.UNIT_MIN; k2 <= T.UNIT_MAX; k2++) {
    let s = T.setUnitLength(T.newState(), k1);
    for (let i = 0; i < 5; i++) s = T.setLen(s, s.len + k1);
    const q = T.setUnitLength(s, k2); n++;
    if (k2 > 1 && q.len % k2 !== 1) boundary++;
    if (Math.floor(q.len / k2) < 3) thin++;
    if (q.phase < 0 || q.phase > q.len - k2) err(`P8 phase illegal after ${k1}->${k2}`);
  }
  if (boundary) err(`P8 ⭐ ${boundary} of ${n} reachable states end ON a unit boundary — the strip's edge gives the unit away`);
  if (thin) err(`P8 ${thin} of ${n} reachable states show fewer than 3 whole repeats`);
  clean(`  P8 ⭐ every one of ${n} reachable states is mid-unit with >=3 repeats`);
  /* a bead that no longer exists cannot stay covered */
  let big = T.setLen(T.newState(), 25);
  big = T.toggleCover(big, big.len - 1);
  if (T.setLen(big, 7).covered.length) err('P8 shortening left a cover on a bead that no longer exists');
}

/* ---------------- P9 clap ---------------- */
say('[stance]');
mark();
{
  const clapSrc = (SRC_NC.match(/clapIt: function[\s\S]*?\n  \},/) || [''])[0];
  if (!clapSrc) err('P9 could not find clapIt');
  else {
    if (!/isCovered/.test(clapSrc)) err('P9 clapIt does not check isCovered — the sound would leak what the cloth hides');
    const before = clapSrc.indexOf('isCovered'), after = clapSrc.indexOf('api.sound');
    if (after > -1 && before > after) err('P9 clapIt plays the tone before checking the cover');
    if (clapSrc.indexOf('isCovered') > clapSrc.indexOf("classList.add('ptn-lit')")) {
      err('P9 clapIt LIGHTS a covered bead before checking the cover — the light leaks what the cloth hides');
    }
  }
  /* ⚠ reduced motion must remove the TRANSITION, never the SIGNAL. The
     shipped rule was `.ptn-cell.ptn-lit{box-shadow:none}`, which deleted
     the clap's only feedback outright. */
  const rm = (SRC.match(/@media \(prefers-reduced-motion:reduce\)\{([\s\S]*?)\}'/) || [])[1] || '';
  if (/ptn-lit\s*\{[^}]*(box-shadow:\s*none|display:\s*none|opacity:\s*0)/.test(rm)) {
    err('P9 reduced motion deletes the clap signal instead of its transition');
  }
  if (!/prefers-reduced-motion/.test(SRC)) err('P9 no prefers-reduced-motion guard at all');
  clean('  P9 a covered bead is silent AND unlit; reduced motion keeps the signal');
}

/* ---------------- P10 no verdict ---------------- */
mark();
{
  const BANNED = /\b(isCorrect|answerKey|checkAnswer|score|streak|timer|countdown|starsEarned|celebrate)\b/;
  if (BANNED.test(SRC_NC)) err(`P10 grading vocabulary present: ${(SRC_NC.match(BANNED) || [])[0]}`);
  if (/\bptn-(correct|wrong|right|error|bad|fail|pass)\b/.test(SRC_NC)) {
    err(`P10 a verdict CSS class exists: ${(SRC_NC.match(/\bptn-(correct|wrong|right|error|bad|fail|pass)\b/) || [])[0]}`);
  }
  const VERDICT = {
    en: /\b(correct|incorrect|wrong|well done|try again|oops)\b/i,
    de: /\b(richtig|falsch|super)\b/i, fr: /\b(correct|faux|bravo)\b/i,
    es: /\b(correcto|incorrecto|bien hecho)\b/i, pt: /\b(correto|errado|muito bem)\b/i,
    it: /\b(corretto|sbagliato|bravo)\b/i, nl: /\b(goed zo|fout|juist)\b/i,
    sv: /\b(rätt|fel|bra jobbat)\b/i, da: /\b(rigtigt|forkert|flot)\b/i,
    no: /\b(riktig|feil|bra jobbet)\b/i, fi: /\b(oikein|väärin|hienoa)\b/i
  };
  Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((loc) => {
    const re = VERDICT[loc];
    if (re && re.test(T.strings[k][loc])) err(`P10 verdict wording in strings.${k}.${loc}: "${T.strings[k][loc]}"`);
  }));
  clean('  P10 nothing here grades anybody, in any of the eleven languages');
}

/* ---------------- P11 fence ---------------- */
mark();
{
  if (/shapeforge|star-?stitcher/i.test(SRC_NC)) err('P11 references a shipped pattern-BLOCK or counting-sequence surface');
  /* ⚠ THE GROWING-PATTERN FENCE IS CODE, NOT A PROMISE. It is on the
     catalog's rejected list, it is already shipped at K-053, and it has
     no unit — admitting one would falsify invention #1 in the same frame
     that teaches it. The REFUSES list may SAY the words; nothing else may. */
  const refuses = (SRC.match(/REFUSES, FOREVER[\s\S]*?={10,}/) || [''])[0];
  const body = SRC_NC;
  if (/\bgrow(ing)?\s*(pattern|sequence)/i.test(body)) err('P11 a growing-pattern surface appears in executable code');
  if (!/NO GROWING PATTERNS/i.test(refuses)) err('P11 the REFUSES list does not name growing patterns — the next builder will re-open it');
  clean('  P11 fence holds: no pattern-block, no counting sequence, no growing pattern');
}

/* ---------------- P12 identity + exfil ---------------- */
say('[identity + safety]');
mark();
{
  if (DECLARED.id !== 'pattern-bench') err(`P12 id is "${DECLARED.id}"`);
  if (!/^lcs:pattern-bench:v\d+$/.test(DECLARED.STORE_KEY || '')) err(`P12 STORE_KEY is "${DECLARED.STORE_KEY}"`);
  if (DECLARED.premium !== false) err('P12 premium must DECLARE false — unknown entitlement is pessimistic');
  if (DECLARED.tasks || DECLARED.nextTask) err('P12 a free-play instrument must declare no tasks');
  const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
  urls.forEach((u) => { if (u.indexOf('/api/auth/me') !== 0) err(`P12 unexpected fetch target "${u}"`); });
  if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('P12 an exfiltration path exists');
  /* the premium costume must be demoted, not merely chip-locked */
  if (!/premiumKnown && !this\.premium && this\.st && this\.st\.medium === 'picture'/.test(SRC_NC)) {
    err('P12 a known-free account is not demoted off the premium costume');
  }
  if (/m === 'picture' && !self\.premium && self\.premiumKnown/.test(SRC_NC)) {
    err('P12 the picture lock consults premiumKnown — unknown must be PESSIMISTIC');
  }
  clean(`  P12 identity ok, free-play, ${urls.length} fetch call(s) on the allowlist`);
}

/* ---------------- P13 ⭐ THE PALETTE, MEASURED ---------------- */
mark();
{
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16) / 255);
  const rgb2lms = (r, g, b) => { r = lin(r); g = lin(g); b = lin(b);
    return [17.8824 * r + 43.5161 * g + 4.11935 * b, 3.45565 * r + 27.1554 * g + 3.86714 * b,
      0.0299566 * r + 0.184309 * g + 1.46709 * b]; };
  const lms2rgb = (l, m, s) => {
    const r = 0.0809444479 * l - 0.130504409 * m + 0.116721066 * s;
    const g = -0.0102485335 * l + 0.0540193266 * m - 0.113614708 * s;
    const b = -0.000365296938 * l - 0.00412161469 * m + 0.693511405 * s;
    const un = (c) => { c = Math.max(0, Math.min(1, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };
    return [un(r), un(g), un(b)];
  };
  const SIM = { normal: (v) => v,
    protan: (v) => [2.02344 * v[1] - 2.52581 * v[2], v[1], v[2]],
    deutan: (v) => [v[0], 0.494207 * v[0] + 1.24827 * v[2], v[2]],
    tritan: (v) => [v[0], v[1], -0.395913 * v[0] + 0.801109 * v[1]] };
  const lab = (rgb) => { const [r, g, b] = rgb.map(lin);
    let X = 0.4124 * r + 0.3576 * g + 0.1805 * b, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b,
        Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;
    X /= 0.95047; Z /= 1.08883;
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
  const dE = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) * (v - b[i]), 0));
  const sim = (hex, mode) => lab(lms2rgb.apply(null, SIM[mode](rgb2lms.apply(null, hex2rgb(hex)))));
  const Lstar = (hex) => lab(hex2rgb(hex))[0];

  const inks = T.SLOTS.map((k) => ({ k, hex: T.COLOUR[k].fill }));
  if (inks.length !== 4) err(`P13 expected 4 slot inks, found ${inks.length}`);
  const FLOOR = 18, RING_FLOOR = 26;
  let worst = 1e9, wp = '';
  Object.keys(SIM).forEach((mode) => {
    for (let i = 0; i < inks.length; i++) for (let j = i + 1; j < inks.length; j++) {
      const d = dE(sim(inks[i].hex, mode), sim(inks[j].hex, mode));
      if (d < worst) { worst = d; wp = mode + ' ' + inks[i].k + '~' + inks[j].k; }
    }
  });
  if (worst < FLOOR) err(`P13 ⭐ the slot inks collapse: worst pair ${wp} = dE ${worst.toFixed(1)} (floor ${FLOOR}). ` +
    'Colour is the DEFAULT costume — a child who cannot separate these cannot use the tool at all.');
  else clean(`  P13 slot inks >= dE ${worst.toFixed(1)} under all four vision types (worst ${wp})`);

  /* the value ladder — dichromats retain full luminance, so a set
     separable in greyscale is separable under any colour vision */
  const ladder = inks.map((i) => ({ k: i.k, L: Lstar(i.hex) })).sort((a, b) => a.L - b.L);
  let minGap = 1e9;
  for (let i = 1; i < ladder.length; i++) minGap = Math.min(minGap, ladder[i].L - ladder[i - 1].L);
  if (minGap < 8) err(`P13 the value ladder collapses: min adjacent L* gap ${minGap.toFixed(1)} (floor 8) — ` +
    'two slots are the same shade of grey on a washed-out projector');
  else say(`  P13 value ladder ${ladder.map((x) => x.k + ' ' + x.L.toFixed(0)).join(' < ')} (min gap ${minGap.toFixed(1)})`);

  /* ⭐ the RING must be discriminable from every slot fill — it is drawn
     ON a bead. Teal fails this at dE 20.7 from the blue slot under
     tritanopia; so does the shell's default focus blue. */
  let wr = 1e9, wrp = '';
  Object.keys(SIM).forEach((mode) => inks.forEach((i) => {
    const d = dE(sim(i.hex, mode), sim(T.RING, mode));
    if (d < wr) { wr = d; wrp = mode + ' ring~' + i.k; }
  }));
  if (wr < RING_FLOOR) err(`P13 ⭐ the RING ink puns on a slot colour: ${wrp} = dE ${wr.toFixed(1)} (floor ${RING_FLOOR})`);
  else say(`  P13 the ring ink is >= dE ${wr.toFixed(1)} from every slot (worst ${wrp})`);
  inks.forEach((i) => { if (i.hex.toLowerCase() === T.RING.toLowerCase()) err(`P13 the ring ink IS slot ${i.k}`); });

  /* ⚠ THE PAYWALL CHECK IS STRUCTURAL, NOT PERCEPTUAL, AND THE FIRST
     VERSION OF IT WAS THE BAN-TOO-WIDE TRAP IN A NEW DRESS. It compared
     every slot ink against coral under all four vision types and
     condemned honey #EFBB3C at dE 10.0 under TRITANOPIA — but yellow and
     orange converging IS tritanopia, so that check condemns every
     possible yellow and measures the deficiency rather than the design.
     Measured: honey~coral is dE 45.1 normal / 35.3 protan / 22.6 deutan.
     What can ACTUALLY go wrong is a bead being FILLED the paywall's
     colour, and lockedness here is carried by a border and a keyhole
     glyph on a CHIP — never by a fill. So: assert the structure. */
  inks.forEach((i) => {
    if (dE(sim(i.hex, 'normal'), sim('#F2784B', 'normal')) < 12) {
      err(`P13 slot ${i.k} (${i.hex}) IS the locked/premium coral`);
    }
  });
  const beadSrc = (SRC_NC.match(/_bead: function[\s\S]*?\n  \},/) || [''])[0]
    + (SRC_NC.match(/COLOUR: \{[\s\S]*?\n  \},/) || [''])[0];
  if (/#F2784B|#C2562F|242, ?120, ?75/i.test(beadSrc)) {
    err('P13 ⭐ the paywall colour is used as a FILL in the bead builder — a bead must never speak it');
  }
  say('  P13 the paywall colour never fills a bead (it is a border and a keyhole, on a chip)');
}

/* ---------------- P14 ⭐ GLYPH OPTICAL MASS ---------------- */
mark();
{
  /* the gate parses the shipped path data and computes area ITSELF —
     never asks the tool. Effective mass = fill area + perimeter x half
     the keyline, because a high-perimeter glyph gains more ink. */
  const KEY = 2.8;
  const num = (s) => s.split(/[\s,]+/).filter((x) => x !== '').map(Number);
  function massOf(d) {
    /* circle drawn as two arcs: M x y a r r 0 1 1 0 D ... */
    const arc = /^M([\d.]+) ([\d.]+)a([\d.]+) [\d.]+ 0 1 1 0 ([\d.]+)/.exec(d);
    if (arc) { const r = parseFloat(arc[3]); return { A: Math.PI * r * r, P: 2 * Math.PI * r }; }
    /* rounded rect: M x y h W a r r 0 0 1 r r v H ... */
    const rr = /^M([\d.]+) ([\d.]+)h([\d.]+)a([\d.]+) [\d.]+ 0 0 1 [\d.]+ [\d.]+v([\d.]+)/.exec(d);
    if (rr) {
      const w = parseFloat(rr[3]), r = parseFloat(rr[4]), h = parseFloat(rr[5]);
      const W = w + 2 * r, H = h + 2 * r;
      return { A: W * H - (4 - Math.PI) * r * r, P: 2 * (W - 2 * r) + 2 * (H - 2 * r) + 2 * Math.PI * r };
    }
    /* polygon: M/L/space-separated pairs ending in z (also 'H' close) */
    const cleaned = d.replace(/[MLz]/g, ' ').replace(/H([\d.]+)/g, ' $1 ');
    const v = num(cleaned);
    const pts = [];
    for (let i = 0; i + 1 < v.length; i += 2) pts.push([v[i], v[i + 1]]);
    /* an 'H' shorthand loses its y; rebuild it from the previous point */
    if (/H/.test(d)) {
      const m2 = /M([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)H([\d.]+)/.exec(d);
      if (m2) { pts.length = 0;
        pts.push([+m2[1], +m2[2]], [+m2[3], +m2[4]], [+m2[5], +m2[4]]); }
    }
    if (pts.length < 3) return null;
    let A = 0, P = 0;
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
      A += x1 * y2 - x2 * y1;
      P += Math.hypot(x2 - x1, y2 - y1);
    }
    return { A: Math.abs(A) / 2, P };
  }
  const mass = {};
  let unparsed = 0;
  T.SLOTS.forEach((s) => {
    const m = massOf(T.SHAPE[s]);
    if (!m) { unparsed++; return; }
    mass[s] = m.A + m.P * (KEY / 2);
  });
  /* ⚠ NON-VACUITY: if the parser understood nothing, this must FAIL loudly
     rather than report a perfect 0% spread over an empty set. */
  if (unparsed || Object.keys(mass).length !== 4) {
    err(`P14 could not parse ${unparsed || 4 - Object.keys(mass).length} of the 4 shape paths — the check would be vacuous`);
  } else {
    const v = Object.values(mass);
    const spread = (Math.max.apply(null, v) / Math.min.apply(null, v) - 1) * 100;
    if (spread > 8) err(`P14 ⭐ the shape glyphs spread ${spread.toFixed(1)}% on optical mass (ceiling 8%) — ` +
      'one slot reads as weaker than another in a tool whose claim is that they are equal members. ' +
      T.SLOTS.map((s) => s + ' ' + mass[s].toFixed(0)).join('  '));
    else clean(`  P14 ⭐ the four shape glyphs land within ${spread.toFixed(1)}% on optical mass`);
    /* and each must fit its 40-unit box once the keyline is added */
    T.SLOTS.forEach((s) => {
      const v2 = num(T.SHAPE[s].replace(/[A-Za-z]/g, ' ')).filter((x) => !isNaN(x));
      const mx = Math.max.apply(null, v2);
      if (mx + KEY / 2 > 40.6) err(`P14 shape ${s} overflows its viewBox (${mx.toFixed(1)} + keyline)`);
    });
  }
}

/* ---------------- P15 print, DOUBLE-LOCKED ---------------- */
say('[print]');
mark();
{
  if (!/_ensureSheet: function/.test(SRC_NC)) err('P15 there is no print sheet at all');
  const sheet = (SRC_NC.match(/_ensureSheet: function[\s\S]*?\n  \},/) || [''])[0];
  if (!/if \(!this\.premium\) return;/.test(sheet)) {
    err('P15 ⭐ the sheet is not removed from the DOM when unentitled — Ctrl+P delivers the paid output free');
  }
  const printBlock = (SRC.match(/@media print\{[\s\S]*?\n {4}\+ '\}';/) || [''])[0];
  if (!printBlock) err('P15 no @media print block');
  else {
    const rules = printBlock.split('+').filter((r) => /display:\s*block/.test(r));
    rules.forEach((r) => { if (!/body\.ptn-paid/.test(r)) err('P15 a print rule reveals the sheet without the paid scope'); });
    if (!/\.lcs-header,\.lcs-controls,\.lcs-instruction\{display:none/.test(printBlock)) {
      err('P15 the shell chrome is not hidden — the sheet would print the settings and mute buttons');
    }
    if (!/\.ptn-wrap\{display:none/.test(printBlock)) err('P15 the live tool is not hidden in print');
  }
  if (!/document\.body\.classList\.toggle\('ptn-paid'/.test(SRC_NC)) err('P15 the ptn-paid body scope is never set');
  clean('  P15 print is double-locked: the sheet leaves the DOM AND every rule is scoped');
}

/* ---------------- P16 grid + css ---------------- */
say('[layout + css]');
mark();
{
  const grid = (SRC.match(/grid-template-columns:repeat\(var\(--ptn-n[^)]*\),minmax\((\d+)px/) || []);
  if (!grid[1]) err('P16 the strip grid does not use a --ptn-n-driven column template');
  else if (Number(grid[1]) < 44) err(`P16 the cell floor is ${grid[1]}px — below the 44px K-2 tap minimum`);
  if (!/\.ptn-strip,\.ptn-letters\{display:grid/.test(SRC)) {
    err('P16 the strip and the letter row do not share a template — letter i would drift off bead i');
  }
  if (!/rail\.style\.setProperty\('--ptn-n', String\(this\.st\.len\)\)/.test(SRC_NC)) err('P16 --ptn-n is not set from st.len');
  /* the bead is bound to the socket, so the unit is the larger object */
  if (!/--ptn-bead:calc\(var\(--ptn-u\) \* \.5\)/.test(SRC)) {
    err('P16 the bead is not bound to half the socket — the unit stops being the protagonist at some width');
  }
  /* ⭐ D1/D3: the percentage chain must be broken UNCONDITIONALLY */
  const esc = /html,body\.ptn-wide\{overflow-y:auto;height:auto;min-height:100%;\}/.test(SRC);
  if (!esc) err('P16 ⭐ the html,body height chain is not broken — the iframe pins the tool at ~422px on every desktop');
  const escInMedia = /@media[^{]*\{[^}]*html,body\.ptn-wide\{overflow-y:auto/.test(SRC);
  if (escInMedia) err('P16 ⭐ the scroll escape is inside a media query — a width key misses the 704px embed by four pixels');
  /* the wide tiers must not carry a min-height, which is dead in an iframe */
  const tiers = SRC.match(/@media \(min-width:\d+px\)[^{]*\{body\.ptn-wide/g) || [];
  if (tiers.length < 3) err(`P16 only ${tiers.length} width-keyed wide tiers`);
  if (/@media \(min-width:\d+px\) and \(min-height:\d+px\)\{body\.ptn-wide/.test(SRC)) {
    err('P16 ⭐ a wide tier is gated on min-height — that is dead code inside the production iframe');
  }
  if (!/getElementById\('ptn-style'\)\)\s*return/.test(SRC_NC)) err('P16 the CSS injector is not idempotent');
  /* ⚠ SCAN THE EMITTED CSS, NOT THE COMMENTS. The first version read SRC
     and condemned the tool for the phrase "the shell's own .lcs-ctrl
     vocabulary" inside a /* *​/ block explaining that the plinth is a
     COPIED PATTERN rather than an override. A gate that fails on its own
     documentation teaches the next author to delete the documentation.
     ⚠ The three shell classes below are hidden in @media print ONLY —
     that is sanctioned and every sibling tool with a sheet does it. */
  const SANCTIONED = ['.lcs-header', '.lcs-controls', '.lcs-instruction', '.lcs-app'];
  const lcsSel = (SRC_NC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => SANCTIONED.indexOf(s) === -1);
  if (lcsSel.length) err(`P16 restyles shell internals: ${Array.from(new Set(lcsSel)).join(', ')}`);
  /* and the sanctioned three may appear ONLY inside the print block */
  const nonPrint = SRC_NC.replace(/@media print\{[\s\S]*?\n {4}\+ '\}';/, '');
  ['.lcs-header', '.lcs-controls', '.lcs-instruction'].forEach((s) => {
    if (nonPrint.indexOf("'" + s) > -1 || nonPrint.indexOf(s + '{') > -1) {
      err(`P16 ${s} is restyled outside the print block`);
    }
  });
  /* ⭐ THE CLASS THE JS ADDS MUST BE THE CLASS THE CSS SCOPES, AND ONLY
     A MUTATION FOUND THIS. Checking that the CSS still says
     `body.ptn-wide` passes happily while init() adds a DIFFERENT class —
     leaving every wide tier and, far worse, the unconditional scroll
     escape present but INERT. That is the exact shape of the D1 defect
     this rebuild exists to fix: a rule that is there and does nothing. */
  const added = (SRC_NC.match(/document\.body\.classList\.add\('([a-z-]+)'\)/) || [])[1];
  if (!added) err('P16 init() never adds a body scope class');
  else {
    const scoped = new RegExp('body\\.' + added + '\\b').test(SRC_NC);
    if (!scoped) err(`P16 ⭐ init() adds body.${added} but the CSS scopes something else — every wide tier and the scroll escape are INERT`);
    const esc2 = new RegExp('html,body\\.' + added + '\\{overflow-y:auto;height:auto;min-height:100%;\\}').test(SRC_NC);
    if (!esc2) err(`P16 ⭐ the scroll escape is not scoped to body.${added}, the class actually applied`);
  }
  if (/[^-]\bvh\b/.test(SRC.replace(/\/\*[\s\S]*?\*\//g, '')) && /\d+vh/.test(SRC)) {
    err('P16 vh is forbidden inside a manipulative — it resolves against the iframe and feeds back');
  }
  clean('  P16 one grid, 44px floor, chain broken unconditionally, width-keyed tiers');
}

/* ---------------- P17 strings ---------------- */
mark();
{
  const used = new Set();
  (SRC_NC.match(/api\.t\([^)]*\)/g) || []).forEach((call) => {
    const inner = call.slice(call.indexOf('(') + 1, -1);
    const re = /(^|[?:,]\s*)['"]([a-zA-Z]+)['"]/g;
    let m; while ((m = re.exec(inner)) !== null) used.add(m[2]);
  });
  (SRC_NC.match(/labelKey:\s*'([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
  (SRC_NC.match(/_gateInline\([^,]+,\s*'([a-zA-Z]+)'\)/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
  (SRC_NC.match(/LAB = \{[^}]*\}/g) || []).forEach((s) => (s.match(/'([a-zA-Z]+)'/g) || []).forEach((q) => used.add(q.slice(1, -1))));
  (SRC_NC.match(/mk\(-?1, '([a-zA-Z]+)'\)/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
  /* ⚠ NAMED EXEMPTIONS, each with a citation. title + instruction are
     read by the SHELL before mount (lcs-shell.js:448-449). */
  const SHELL_READ = ['title', 'instruction'];
  const declared = new Set(Object.keys(T.strings));
  Array.from(used).forEach((k) => { if (!declared.has(k)) err(`P17 api.t('${k}') has no string`); });
  const dead = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1);
  if (dead.length) err(`P17 ${dead.length} declared but UNREACHED string(s): ${dead.join(', ')}`);
  const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  Object.keys(T.strings).forEach((k) => {
    LOCS.forEach((l) => { if (!T.strings[k][l]) err(`P17 strings.${k} is missing ${l}`); });
    Object.keys(T.strings[k]).forEach((loc) => {
      if (/'/.test(T.strings[k][loc])) err(`P17 straight apostrophe in strings.${k}.${loc}`);
    });
  });
  clean(`  P17 ${declared.size} strings x ${LOCS.length} locales, all reached, no straight apostrophes`);
}

say('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
