/* =====================================================================
   verify-unit-handle.js — the model gate for TOOL #40, The Unit Handle
   ---------------------------------------------------------------------
   Run:  node scripts/verify-unit-handle.js
   Mutations run it against a copy via UNH_TOOL_DIR.

   ZERO CORPUS. Ground truth is implemented HERE and never read off the
   tool — the number-sieve lesson, where 19 of 51 mutations survived
   because the gate derived its expectations from the thing under test.
   The count oracle is REPEATED SUBTRACTION, deliberately a different
   algorithm from the tool's floor division, so the two cannot share a
   bug.

   ⚠ THE CATALOG'S GATE SPEC DOES NOT SURVIVE CONTACT — the fourth time
   a v4 spec has been off. It asks for "every unit size 1…1000 …
   monotonicity over all 499,500 pairs". C(1000,2) is arithmetically
   right and physically impossible: at u = 1 the tape carries a thousand
   tiles, which no class counts and no phone renders. The real domain is
   bounded by legibility (U_MIN) and by MIN_COUNT, and this gate PRINTS
   the true figure rather than quoting one.

     V1  ⭐ THE COUNT        floor(L/u), against repeated subtraction
     V2  ⭐ THE REMAINDER    L - u*count exactly, always < u, and the
                            tiles span the object exactly
     V3  ⭐ MONOTONE, NON-STRICT, AND NOT VACUOUS
     V4  ⭐ THE OBJECT CANNOT FLINCH
     V5  ⭐ THE TAPES ARE INDEPENDENT
     V6  NO VERDICT         nothing compares the two counts
     V7  NO WORDS ON THE STAGE
     V8  THE 11-LOCALE BAN  poison-tested in BOTH directions
     V9  DETERMINISM        no randomness, no clock in the model
     V10 LABELS ARE TRUE
     V11 PURITY + a TOTAL model
     V12 IDENTITY           no tasks, a fetch allow-list, no exfil
     V13 THE OBJECT SHELF   + an offline fallback that IS the free shelf
     V14 ⭐ NO DEAD STRINGS  runtime reachability, not a source scan
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.UNH_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'unit-handle.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = UnitHandle;', sandbox);
const T = sandbox.__T;
if (!T) { console.error('FATAL: the tool did not define UnitHandle'); process.exit(1); }

const MODEL_END = SRC_NC.indexOf('_loadStore:');
const MODEL = MODEL_END > 0 ? SRC_NC.slice(0, MODEL_END) : SRC_NC;
const RENDER = MODEL_END > 0 ? SRC_NC.slice(MODEL_END) : '';

/* ---- the oracle: hardcoded, and a DIFFERENT algorithm ---- */
const O_W = 1000, O_UMIN = 50, O_MINCOUNT = 2, O_SCALE = 16 / 9;
/* count by repeated subtraction — never floor division */
function oCount(L, u) {
  if (!(u > 0) || !(L > 0)) return 0;
  let n = 0, left = L;
  while (left >= u) { left -= u; n++; if (n > 10000) break; }
  return n;
}
function oRem(L, u) {
  if (!(u > 0) || !(L > 0)) return 0;
  let left = L;
  while (left >= u) left -= u;
  return left;
}

/* load the shelf the way the tool will */
let BOOK = null;
try { BOOK = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'unit-handle-objects.json'), 'utf8')); }
catch (e) { err('cannot read unit-handle-objects.json: ' + e.message); }
T.data = BOOK || T.FALLBACK_OBJECTS;
T.premium = true;

const shelf = T.shelf();
const stFor = (i, uA, uB) => ({ obj: i, uA: uA, uB: uB });

/* =====================================================================
   V1 / V2 — the whole arithmetic, exhaustive over the real domain
   ===================================================================== */
(function arithmetic() {
  let settings = 0, worstRem = -1;
  for (let i = 0; i < shelf.length; i++) {
    const L = T.lengthOf(stFor(i, 100, 100));
    if (L !== Math.round(shelf[i].w * O_SCALE)) { err(`V1 length of ${shelf[i].k} is ${L}, oracle ${Math.round(shelf[i].w * O_SCALE)}`); return; }
    const hi = Math.floor(L / O_MINCOUNT);
    for (let u = O_UMIN; u <= hi; u++) {
      const st = stFor(i, u, 100);
      const c = T.countOf(st, 'a'), r = T.remainderOf(st, 'a'), tiles = T.tilesOf(st, 'a');
      if (c !== oCount(L, u)) { err(`V1 count ${shelf[i].k} u=${u}: tool ${c}, oracle ${oCount(L, u)}`); return; }
      if (c < O_MINCOUNT) { err(`V1 ${shelf[i].k} u=${u} lays only ${c} tile(s) — below the floor`); return; }
      if (r !== oRem(L, u)) { err(`V2 remainder ${shelf[i].k} u=${u}: tool ${r}, oracle ${oRem(L, u)}`); return; }
      /* ⚠ the remainder is what is LEFT OVER — it can never be a whole
         unit, or the tape simply forgot to lay one */
      if (!(r < u)) { err(`V2 the remainder ${r} is a whole unit at ${shelf[i].k} u=${u}`); return; }
      if (r !== L - u * c) { err(`V2 remainder disagrees with L - u*count at ${shelf[i].k} u=${u}`); return; }
      /* the tiles must span the object EXACTLY — no gap, no overhang */
      let span = 0, whole = 0;
      for (const t of tiles) { span += t.w; if (!t.part) whole++; }
      if (span !== L) { err(`V2 the tiles span ${span}, the object is ${L} (${shelf[i].k} u=${u})`); return; }
      if (whole !== c) { err(`V2 ${whole} whole tiles but the count says ${c} (${shelf[i].k} u=${u})`); return; }
      if (tiles.length !== c + (r > 0 ? 1 : 0)) { err(`V2 tile count wrong at ${shelf[i].k} u=${u}`); return; }
      /* ⚠ x0 + i*u, never an accumulator: every tile starts where the
         previous one ended */
      const x0 = T.originOf(st);
      for (let j = 0; j < tiles.length; j++) {
        const want = x0 + j * u;
        if (j < c && tiles[j].x !== want) { err(`V2 tile ${j} starts at ${tiles[j].x}, should be ${want}`); return; }
      }
      worstRem = Math.max(worstRem, r);
      settings++;
    }
  }
  console.log(`V1/V2 the arithmetic: ${settings} unit settings across ${shelf.length} objects — count by repeated subtraction agrees everywhere, the tiles span the object exactly, and the remainder is never a whole unit (largest seen ${worstRem})`);
})();

/* =====================================================================
   V3 ⭐ MONOTONE — non-strict, and not vacuous
   ⚠ floor(L/u) is non-INCREASING in u; for most adjacent pairs it is
   EQUAL. Asserting a strict decrease would fail on a correct tool — the
   exact shape The Lids needed at V15. So: never increases, over every
   pair, plus a count of the places it actually falls, so the law cannot
   be satisfied by a constant.
   ===================================================================== */
(function monotone() {
  let pairs = 0, drops = 0;
  for (let i = 0; i < shelf.length; i++) {
    const L = T.lengthOf(stFor(i, 100, 100));
    const hi = Math.floor(L / O_MINCOUNT);
    const counts = [];
    for (let u = O_UMIN; u <= hi; u++) counts.push(T.countOf(stFor(i, u, 100), 'a'));
    for (let a = 0; a < counts.length; a++) {
      for (let b = a + 1; b < counts.length; b++) {
        pairs++;
        if (counts[b] > counts[a]) { err(`V3 a BIGGER unit gave a BIGGER count on ${shelf[i].k}`); return; }
      }
    }
    for (let a = 1; a < counts.length; a++) if (counts[a] < counts[a - 1]) drops++;
  }
  if (!drops) { err('V3 the count never falls as the unit grows — the law is vacuous'); return; }
  console.log(`V3 monotone: ${pairs} pairs, the count never rises as the unit grows, and it actually falls at ${drops} places`);
})();

/* =====================================================================
   V4 ⭐ THE OBJECT CANNOT FLINCH — invention 3
   Its geometry must be a pure function of the OBJECT, so that every
   unit setting of both tapes renders it identically. This is the one
   thing the class has to trust.
   ===================================================================== */
(function noFlinch() {
  let checked = 0;
  for (let i = 0; i < shelf.length; i++) {
    const L = T.lengthOf(stFor(i, 100, 100));
    const hi = Math.floor(L / O_MINCOUNT);
    const base = JSON.stringify(T.placement(shelf[i], T.originOf(stFor(i, O_UMIN, O_UMIN)), L, T.BASE));
    for (let u = O_UMIN; u <= hi; u += 7) {
      for (const v of [O_UMIN, hi, Math.floor((O_UMIN + hi) / 2)]) {
        const st = stFor(i, u, v);
        const p = JSON.stringify(T.placement(T.objectOf(st), T.originOf(st), T.lengthOf(st), T.BASE));
        if (p !== base) { err(`V4 THE OBJECT FLINCHED on ${shelf[i].k} at uA=${u} uB=${v}`); return; }
        checked++;
      }
    }
  }
  /* and structurally: no unit may appear anywhere in the placement path */
  const at = MODEL.indexOf('placement: function');
  const body = at < 0 ? '' : MODEL.slice(at, MODEL.indexOf('\n  _loadStore', at) > 0 ? MODEL.indexOf('\n  _loadStore', at) : MODEL.length).split('\n  }')[0];
  if (!body) err('V4 placement() was not found');
  else if (/\bu[AB]\b|unitOf|countOf|tilesOf/.test(body)) err('V4 placement() reads a unit — the object could flinch');
  /* poison: the check must be able to see a flinch */
  const fake = JSON.stringify(T.placement(shelf[0], T.originOf(stFor(0, 45, 45)) + 1, T.lengthOf(stFor(0, 45, 45)), T.BASE));
  if (fake === JSON.stringify(T.placement(shelf[0], T.originOf(stFor(0, 45, 45)), T.lengthOf(stFor(0, 45, 45)), T.BASE))) {
    err('V4 POISON: the placement comparison cannot see a moved object');
  }
  /* ⭐ V4b — AND IT IS PLACED CORRECTLY, not merely consistently.
     ⚠ Invariance is not correctness, and mutation proved the gap: push
     the object permanently to the wrong edge and every "it did not
     flinch" assertion still passes, because it flinches nowhere. That is
     not hypothetical — the first render of this tool put the object a
     third of a screen from the tapes it was supposed to sit above, and
     nothing here would have caught it. So: apply the affine to the TRIM
     CORNERS and require the object's visible span to be exactly the
     tape's span, with its bottom exactly on the bench line. */
  let spans = 0, worst = 0;
  for (let i = 0; i < shelf.length; i++) {
    const o = shelf[i], st = stFor(i, 100, 100);
    const L = T.lengthOf(st), X0 = T.originOf(st), BASE = T.BASE;
    const p = T.placement(o, X0, L, BASE);
    let x1, x2, yBottom;
    if (o.rot === 90) {
      /* rotate(90deg) about top-left maps local (x,y) -> (left - y, top + x) */
      const k = L / o.trim.h;
      x1 = p.left - (o.trim.y + o.trim.h) * k;
      x2 = p.left - o.trim.y * k;
      yBottom = p.top + (o.trim.x + o.trim.w) * k;
    } else {
      const k = L / o.trim.w;
      x1 = p.left + o.trim.x * k;
      x2 = p.left + (o.trim.x + o.trim.w) * k;
      yBottom = p.top + (o.trim.y + o.trim.h) * k;
    }
    const dLeft = Math.abs(x1 - X0), dRight = Math.abs(x2 - (X0 + L)), dBase = Math.abs(yBottom - BASE);
    if (dLeft > 0.01) { err(`V4b ${o.k}: the object's left edge is ${dLeft.toFixed(2)} off the tape's start`); return; }
    if (dRight > 0.01) { err(`V4b ${o.k}: the object's right edge is ${dRight.toFixed(2)} off the tape's end`); return; }
    if (dBase > 0.01) { err(`V4b ${o.k}: the object does not stand on the bench line (off by ${dBase.toFixed(2)})`); return; }
    worst = Math.max(worst, dLeft, dRight, dBase);
    spans++;
  }
  console.log(`V4 the object cannot flinch: ${checked} (object, uA, uB) combinations render it identically, and placement() reads no unit at all`);
  console.log(`V4b and it is placed CORRECTLY: on all ${spans} objects the trim corners land on the tape's own span and the bench line, worst error ${worst.toFixed(4)}px`);
})();

/* =====================================================================
   V5 ⭐ THE TAPES ARE INDEPENDENT — invention 2
   ===================================================================== */
(function independent() {
  let checked = 0;
  for (let i = 0; i < shelf.length; i++) {
    const L = T.lengthOf(stFor(i, 100, 100));
    const hi = Math.floor(L / O_MINCOUNT);
    for (let u = O_UMIN; u <= hi; u += 11) {
      const st = stFor(i, u, Math.min(hi, O_UMIN + 30));
      const bBefore = JSON.stringify(T.tilesOf(st, 'b')) + '|' + T.countOf(st, 'b');
      for (const nu of [O_UMIN, hi, u]) {
        const next = T.setUnit(st, 'a', nu);
        if (!next) continue;
        const bAfter = JSON.stringify(T.tilesOf(next, 'b')) + '|' + T.countOf(next, 'b');
        if (bAfter !== bBefore) { err(`V5 moving tape 1 changed tape 2 on ${shelf[i].k}`); return; }
        checked++;
      }
    }
  }
  /* poison: it must be able to see a coupled tape */
  const st0 = stFor(0, 100, 100);
  if (JSON.stringify(T.tilesOf(st0, 'b')) === JSON.stringify(T.tilesOf(T.setUnit(st0, 'b', 60) || st0, 'b'))) {
    err('V5 POISON: the independence check cannot see tape 2 change at all');
  }
  console.log(`V5 the tapes are independent: ${checked} moves of tape 1 left tape 2 byte-identical`);
})();

/* =====================================================================
   V6 / V7 — no verdict, no words on the stage
   ===================================================================== */
(function refusals() {
  const VERDICT = /\b(score|scoring|correct|incorrect|wrong|winner|wins|verdict|rank|ranking|closest|better|worse|accuracy|streak|longer|shorter)\b/i;
  if (VERDICT.test(SRC_NC)) err(`V6 verdict machinery in the source ("${SRC_NC.match(VERDICT)[0]}")`);
  if (!VERDICT.test('var score = 1;')) err('V6 POISON: the verdict ban no longer fires');
  /* ⚠ nothing may bring the two counts into contact */
  if (/countOf\([^)]*'a'\)[^;\n]*countOf\([^)]*'b'\)|countOf\([^)]*'b'\)[^;\n]*countOf\([^)]*'a'\)/.test(SRC_NC)) {
    err('V6 the two counts are compared — that is a verdict');
  }
  /* ⚠ THE BAN IS ON THE COUNTS MEETING, NOT ON THE UNITS. A first draft
     also banned comparing uA with uB, and that is wrong twice over: the
     units are apparatus settings, not measurements, so knowing they are
     equal is no more a judgement than knowing a lid is down — and
     `matchUnits` and the foot's disabled state both legitimately read
     them. A ban that rejects correct code teaches the next build to
     write around it. The COUNTS are the verdict surface; they are what
     must never touch. */
  if (!/countOf\([^)]*'a'\)[^;\n]*countOf\([^)]*'b'\)/.test("countOf(s,'a') === countOf(s,'b')")) {
    err('V6 POISON: the count-comparison ban would not fire on an actual comparison');
  }
  /* ⚠ NO NAMED UNIT — refusal 1 */
  const UNITWORD = /\b(centimet\w*|centimeter|inch|inches|paperclip\w*|cm\b|millimet\w*)/i;
  for (const k of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const v = T.strings[k][loc];
      if (typeof v === 'string' && UNITWORD.test(v)) err(`V7 a named unit in ${k}.${loc} ("${v.match(UNITWORD)[0]}")`);
    }
  }
  if (!UNITWORD.test('measure in inches')) err('V7 POISON: the named-unit ban no longer fires');
  /* the bench itself carries no text */
  const at = RENDER.indexOf('_buildBench: function');
  const body = RENDER.slice(at, RENDER.indexOf('_buildTape: function', at));
  if (/\.textContent\s*=/.test(body)) err('V7 the bench writes a text node');
  if (/\.innerHTML\s*=/.test(body)) err('V7 the bench writes innerHTML');
  console.log('V6/V7 refusals: no verdict machinery, the two counts never meet, no unit is ever named, and the bench carries no text');
})();

/* =====================================================================
   V8 — the 11-locale ban, BOTH directions
   ===================================================================== */
(function locales() {
  const BAN = {
    en: /\b(correct|wrong|well done)\b/i, de: /\b(richtig|falsch|gut gemacht)\b/i,
    fr: /\b(correct|faux|bravo)\b/i, es: /\b(correcto|incorrecto|bien hecho)\b/i,
    pt: /\b(correto|errado|muito bem)\b/i, it: /\b(giusto|sbagliato|bravo)\b/i,
    nl: /\b(goed zo|fout|correct)\b/i, sv: /\b(rätt|fel|bra jobbat)\b/i,
    da: /\b(rigtigt|forkert|godt klaret)\b/i, no: /\b(riktig|galt|bra jobba)\b/i,
    fi: /\b(oikein|väärin|hyvin tehty)\b/i
  };
  const MUSTFIRE = { en: 'correct', de: 'richtig', fr: 'bravo', es: 'correcto', pt: 'errado', it: 'giusto', nl: 'fout', sv: 'rätt', da: 'forkert', no: 'riktig', fi: 'oikein' };
  const INVIS = /[­​-‍⁠﻿‪-‮⁦-⁩]/;
  for (const loc of LOCALES) {
    if (!BAN[loc].test(MUSTFIRE[loc])) { err(`V8 POISON: the ${loc} verdict ban no longer fires on "${MUSTFIRE[loc]}"`); continue; }
    for (const k of Object.keys(T.strings)) {
      const v = T.strings[k][loc];
      if (typeof v !== 'string' || !v.trim()) { err(`V8 ${k}.${loc} is missing`); continue; }
      if (BAN[loc].test(v)) err(`V8 a verdict word in ${k}.${loc}`);
      if (INVIS.test(v)) err(`V8 an invisible character in ${k}.${loc}`);
    }
  }
  if (!INVIS.test('a­b')) err('V8 POISON: the invisible-character ban no longer fires');
  console.log('V8  11 locales: every key present, no verdict word, no invisibles — each ban poison-tested both ways');
})();

/* =====================================================================
   V9 / V10 / V11 / V12
   ===================================================================== */
(function rest() {
  /* V9 — determinism */
  const BANNED = /\b(Math\s*\.\s*random|crypto\s*\.\s*getRandomValues|performance\s*\.\s*now)\b/;
  if (BANNED.test(SRC_NC)) err('V9 unseeded randomness is reachable in the tool');
  if (/\b(Date\s*\.\s*now|new\s+Date)\b/.test(MODEL)) err('V9 the model reads the clock');
  if (!BANNED.test('var x = Math.random();')) err('V9 POISON: the randomness ban no longer fires');
  for (let i = 0; i < shelf.length; i++) {
    const a = JSON.stringify(T.tilesOf(stFor(i, 77, 55), 'a'));
    const b = JSON.stringify(T.tilesOf(stFor(i, 77, 55), 'a'));
    if (a !== b) { err(`V9 the tape is not deterministic on ${shelf[i].k}`); return; }
  }

  /* V10 — labels are true */
  const PAIRS = [['fitBtn', 'nextEvenFit('], ['matchBtn', 'matchUnits('], ['newObjBtn', 'stepObject(']];
  for (const [key, call] of PAIRS) {
    const needle = `api.t('${key}')`;
    const at = RENDER.indexOf(needle);
    if (at < 0) { err(`V10 the control labelled ${key} was not found`); continue; }
    if (RENDER.slice(at, at + 600).indexOf(call) < 0) err(`V10 the control labelled ${key} does not call ${call}`);
  }
  /* "make it come out even" must actually come out even */
  let evens = 0, tried = 0;
  for (let i = 0; i < shelf.length; i++) {
    const next = T.nextEvenFit(stFor(i, 100, 100), 'a');
    tried++;
    if (!next) { err(`V10 no even fit exists at all on ${shelf[i].k}`); continue; }
    if (T.remainderOf(next, 'a') !== 0) { err(`V10 "come out even" left a remainder of ${T.remainderOf(next, 'a')} on ${shelf[i].k}`); return; }
    evens++;
  }
  if (evens !== tried) err('V10 "come out even" did not come out even everywhere');
  /* and it MOVES — a control that lands where it started is dead */
  const cur = stFor(0, T.evenFits(stFor(0, 100, 100))[0], 100);
  const stepped = T.nextEvenFit(cur, 'a');
  if (!stepped || stepped.uA === cur.uA) err('V10 "come out even" does not move when already even');

  /* V11 — purity + a total model */
  const SHAPE = ['obj', 'uA', 'uB'].sort().join(',');
  if (Object.keys(T.newState()).sort().join(',') !== SHAPE) err(`V11 the state shape is ${Object.keys(T.newState()).sort().join(',')}`);
  const probes = [
    ['setUnit', (s) => T.setUnit(s, 'a', 120)],
    ['matchUnits', (s) => T.matchUnits(s)],
    ['stepObject', (s) => T.stepObject(s)],
    ['nextEvenFit', (s) => T.nextEvenFit(s, 'b')]
  ];
  for (const [name, fn] of probes) {
    const s = T.newState(), snap = JSON.stringify(s);
    const out = fn(s);
    if (JSON.stringify(s) !== snap) err(`V11 ${name} mutated its input`);
    if (out && Object.keys(out).sort().join(',') !== SHAPE) err(`V11 ${name} returned a state shaped ${Object.keys(out).sort().join(',')}`);
  }
  if (T.setUnit(T.newState(), 'a', T.U_MIN - 1) !== null) err('V11 a unit below the legibility floor was accepted');
  if (T.setUnit(T.newState(), 'a', 99999) !== null) err('V11 a unit past the ceiling was accepted');
  if (T.setUnit(T.newState(), 'a', T.newState().uA) !== null) err('V11 a no-op unit change returned a state instead of null');
  for (const h of [null, undefined, 0, '', []]) {
    try { T.countOf(h, 'a'); T.tilesOf(h, 'a'); T.lengthOf(h); T.originOf(h); T.remainderOf(h, 'b'); }
    catch (e) { err('V11 hostile input crashed the model: ' + e.message); }
  }
  /* ⚠ changing the object must re-clamp both units, or the bench lands
     in a state setUnit itself would refuse */
  /* ⚠ START FROM EACH OBJECT'S LARGEST LEGAL UNIT, not from a middling
     one. The first draft walked the shelf carrying u = 100 — legal on
     every object there is — so it could never produce the illegal state
     it existed to catch, and mutation walked straight past it. A unit
     that is legal on a 640-long ladder and illegal on a 320-long crayon
     is the whole point. */
  let carried = 0;
  for (let i = 0; i < shelf.length; i++) {
    const big = Math.floor(T.lengthOf(stFor(i, 100, 100)) / O_MINCOUNT);
    let st = stFor(i, big, big);
    for (let k = 0; k < shelf.length + 1; k++) {
      const prevBand = Math.floor(T.lengthOf(st) / O_MINCOUNT);
      const next = T.stepObject(st);
      if (!next) break;
      st = next;
      const L = T.lengthOf(st), hi = Math.floor(L / O_MINCOUNT);
      if (prevBand > hi) carried++;   /* this step really did demand a clamp */
      if (st.uA < T.U_MIN || st.uA > hi || st.uB < T.U_MIN || st.uB > hi) {
        err(`V11 stepping to ${T.objectOf(st).k} left an illegal unit (uA=${st.uA} uB=${st.uB}, band ${T.U_MIN}..${hi})`); return;
      }
    }
  }
  if (!carried) err('V11 no step in the whole shelf ever moved to a shorter object — the re-clamp is never exercised');

  /* V12 — identity */
  if (T.tasks || T.nextTask) err('V12 this is a free-play instrument and must declare no tasks');
  const urls = (SRC_NC.match(/fetch\(\s*'([^']+)'/g) || []).map((m) => m.replace(/fetch\(\s*'/, '').replace(/'$/, ''));
  const want = ['/api/auth/me', '/mini-tools/unit-handle-objects.json'].sort().join(',');
  if (urls.sort().join(',') !== want) err(`V12 the fetch allow-list is ${urls.join(',')}, expected ${want}`);
  if (/method\s*:\s*['"]POST['"]/i.test(SRC_NC)) err('V12 the tool POSTs somewhere');
  if (/lcs:my-classes/.test(SRC_NC)) err('V12 the tool touches the name-sticks roster store');
  if (T.STORE_KEY !== 'lcs:unit-handle:v1') err('V12 the store key is ' + T.STORE_KEY);
  console.log('V9  determinism: the tape replays identically; no randomness, no clock in the model');
  console.log(`V10 labels are true: every noun-labelled control calls what it promises, and "come out even" leaves a remainder of 0 on all ${evens} objects`);
  console.log('V11 purity: state shape frozen, reducers leave their input untouched, hostile input refused, and changing the object re-clamps both units');
  console.log('V12 identity: no tasks, two fetches, no POST, no roster');
})();

/* =====================================================================
   V13 — the object shelf, and a fallback that IS the free shelf
   ===================================================================== */
(function book() {
  if (!BOOK) return;
  const FIELDS = ['k', 'theme', 'noun', 'w', 'rot', 'trim', 'iw', 'ih'];
  const keys = new Set();
  for (const o of BOOK.objects || []) {
    for (const f of Object.keys(o)) if (FIELDS.indexOf(f) === -1) err(`V13 object ${o.k} carries an extra field "${f}"`);
    for (const f of FIELDS) if (!(f in o)) err(`V13 object ${o.k} is missing "${f}"`);
    if (keys.has(o.k)) err(`V13 duplicate object ${o.k}`);
    keys.add(o.k);
    if (o.rot !== 0 && o.rot !== 90) err(`V13 object ${o.k} has rot ${o.rot}`);
    if (!Number.isInteger(o.w * O_SCALE)) err(`V13 object ${o.k} does not remap to an integer length`);
    if (o.trim.x + o.trim.w > o.iw || o.trim.y + o.trim.h > o.ih) err(`V13 object ${o.k} has a trim box outside its image`);
    /* ⚠ the aspect filter is what keeps a boat from towering over the
       tapes it is measured by — and what makes the object measurable */
    const ratio = o.rot === 90 ? o.trim.h / o.trim.w : o.trim.w / o.trim.h;
    if (ratio < 2.5) err(`V13 object ${o.k} has aspect ${ratio.toFixed(2)} — too stubby to lay units along`);
    /* every object must afford a real range, or it is not worth a slot */
    const L = Math.round(o.w * O_SCALE);
    if (Math.floor(L / O_UMIN) < 4) err(`V13 object ${o.k} affords only ${Math.floor(L / O_UMIN)} tiles at the floor`);
  }
  if (BOOK.freeCount !== T.FREE_OBJECTS) err(`V13 the book says freeCount ${BOOK.freeCount}, the tool says ${T.FREE_OBJECTS}`);
  /* the free shelf must span the length range, or the free tier tells one story */
  const freeLens = new Set((BOOK.objects || []).slice(0, BOOK.freeCount).map((o) => Math.round(o.w * O_SCALE)));
  if (freeLens.size < 3) err(`V13 the free shelf spans only ${freeLens.size} distinct length(s)`);
  /* ⚠ THE FALLBACK IS THE FREE SHELF, BYTE FOR BYTE. A 404 must degrade
     to the free tier, never to nothing, and never to a DIFFERENT six. */
  const fb = T.FALLBACK_OBJECTS;
  if (!fb || !fb.objects || !fb.objects.length) err('V13 the offline fallback is empty');
  else {
    const want = JSON.stringify((BOOK.objects || []).slice(0, BOOK.freeCount));
    if (JSON.stringify(fb.objects) !== want) err('V13 the offline fallback is not the free shelf verbatim');
  }
  /* entitlement really filters */
  const probe = Object.create(T);
  probe.data = BOOK; probe.premium = false;
  if (probe.shelf().length !== T.FREE_OBJECTS) err(`V13 a free account reaches ${probe.shelf().length} objects, expected ${T.FREE_OBJECTS}`);
  probe.premium = true;
  if (probe.shelf().length !== (BOOK.objects || []).length) err('V13 a paid account cannot reach the whole shelf');
  console.log(`V13 the object shelf: ${(BOOK.objects || []).length} objects, all long enough to measure, fallback identical to the free ${BOOK.freeCount}, entitlement filters`);
})();

/* =====================================================================
   V14 ⭐ NO DEAD STRINGS — reached at RUNTIME, not merely mentioned
   ⚠ A source scan is defeated by an unreachable BRANCH: the t('key')
   call still sits in the file. The Lids paid for that lesson. So: drive
   every builder over a matrix of real states with a recording t(), and
   require each authored key to be asked for by one of them.
   ===================================================================== */
(function noDeadStrings() {
  const REACH = new Set();
  const stub = () => ({
    style: {}, classList: { add() {}, remove() {}, contains: () => false },
    children: [], textContent: '', type: '', disabled: false, href: '', target: '', rel: '',
    setAttribute() {}, getAttribute: () => null, addEventListener() {},
    appendChild(c) { this.children.push(c); return c; }, querySelector: () => null, querySelectorAll: () => []
  });
  const inst = Object.create(T);
  inst.api = { lang: 'en', el: () => stub(), t: (k) => { REACH.add(k); const v = T.strings[k]; return (v && v.en) || k; }, stage: stub() };
  inst.premium = false;
  inst.data = BOOK || T.FALLBACK_OBJECTS;
  inst._wrap = null;

  const L0 = T.lengthOf(stFor(0, 100, 100)), hi0 = Math.floor(L0 / O_MINCOUNT);
  const even = T.evenFits(stFor(0, 100, 100));
  const STATES = [
    ['the two tapes agree', stFor(0, 160, 160), false],
    ['they disagree, both even', stFor(0, even[0], even[even.length - 1]), false],
    ['one tape has a remainder', stFor(0, even[0] + 1, even[0]), false],
    ['both have remainders', stFor(0, even[0] + 1, even[0] + 3), false],
    ['the smallest unit', stFor(0, T.U_MIN, hi0), false],
    ['a longer object', stFor(shelf.length - 1, 100, 137), false],
    ['the gate showing', stFor(0, 160, 100), true]
  ];
  for (const [label, st, gate] of STATES) {
    if (!st) { err(`V14 could not build the "${label}" state`); continue; }
    inst.st = st;
    inst._gate = gate;
    try { inst._buildHint(); inst._buildBench(); inst._buildFoot(); }
    catch (e) { err(`V14 a builder threw on the "${label}" state: ${e.message}`); }
  }

  /* ⚠ AN AUDITABLE EXEMPTION LIST, never a loosened scan. These two are
     read by the SHELL, not by this file: lcs-shell.js:47-58 interpolates
     {title} and {instruction} into the page description in all eleven
     locales. Anything added here needs the same one-line proof. */
  const SHELL_CONSUMED = { title: 'lcs-shell.js:47-58 {title}', instruction: 'lcs-shell.js:47-58 {instruction}' };
  const unreached = Object.keys(T.strings).filter((k) => !REACH.has(k) && !SHELL_CONSUMED[k]);
  if (unreached.length) err(`V14 UNREACHABLE STRING(S) — present but no state of the tool asks for them: ${unreached.join(', ')}`);

  /* poison, both ways */
  if (REACH.has('__phantom__')) err('V14 POISON: the recorder invents keys');
  if (!REACH.has('hintOver')) err('V14 POISON: the state matrix never reaches a remainder — it would miss the class of defect it exists for');
  if (!REACH.has('gateLine') || !REACH.has('unlock')) err('V14 POISON: the state matrix never shows the gate');
  if (!REACH.has('hintStretch')) err('V14 POISON: the state matrix never reaches the opening hint');
  console.log(`V14 no dead strings: all ${Object.keys(T.strings).length} authored keys are REACHED at runtime — ${REACH.size} asked for across ${STATES.length} states, ${Object.keys(SHELL_CONSUMED).length} owned by the shell`);
})();

console.log('');
if (ERRORS) { console.error('FAIL — ' + ERRORS + ' error(s)'); process.exit(1); }
console.log('PASS — 0 errors');
