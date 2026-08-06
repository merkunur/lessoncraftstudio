/* =====================================================================
   verify-draw-bag.js — the model gate for TOOL #38, The Draw Bag
   ---------------------------------------------------------------------
   Run:  node scripts/verify-draw-bag.js
   Mutations run it against a copy via DRB_TOOL_DIR.

   ZERO CORPUS. Ground truth is implemented HERE and never read off the
   tool — the number-sieve lesson, where 19 of 51 mutations survived
   because the gate built its corpus with the tool's own builder and then
   checked it with the tool's own predicates, so every predicate mutation
   stayed perfectly self-consistent.
   ⚠ In particular D3's oracle is a DIFFERENT ALGORITHM, not a copy: the
   gate EXPANDS the multiset into a flat array and indexes it, while the
   tool walks a prefix sum. An off-by-one in the walk cannot hide behind
   an off-by-one in the oracle, because there is no walk in the oracle.
   ⚠ And every constant below is HARDCODED. Reading MAX_TOTAL or the
   mulberry32 constants off the tool would make a mutation to them
   invisible.

     D1  SUPPORT SOUNDNESS   every drawn kind is really in the bag
     D2  IMPOSSIBLE / CERTAIN a count of 0 never appears; a one-kind bag
                             yields that kind every single time
     D3 ⭐ THE EXACT SAMPLER  the walk agrees with an expanded-array
                             oracle for every index of every bag
     D4  DETERMINISM         same (bag, seed, index) -> same piece, and
                             no UNSEEDED randomness exists in the model
     D5  DISTRIBUTION        chi-squared against the exact multinomial
     D6  CONSERVATION        with replacement: the bag is byte-identical
                             after every single draw
     D7  APPEND-ONLY         the record only ever grows, by exactly one
     D8 ⭐ IDENTICAL CAUSE    run two is the same bag and a different
                             seed — and a CERTAIN bag repeats exactly,
                             which is what stops D8 being vacuous
     D9  UNREACHABILITY      composition() throws before the bag is open
     D10 ⭐ COMMITTED PRIOR   the guess moves freely, then never again
     D11 NO VERDICT          nothing scores, ranks or compares the guess
     D12 NO FREQUENCY NUMERAL no count of anything reaches the screen
     D13 ⭐ NO WORDS ON THE STAGE  zero text nodes in the material
     D14 NO LIKELIHOOD WORD  the 11-locale ban, on each locale's OWN
                             vocabulary, and no "tip back in" calque
     D15 IDENTITY            no tasks, one fetch allow-list, no exfil
     D16 THE BAG BOOK        the library and its offline fallback
     D17 ⭐ LABELS ARE TRUE   every noun-labelled control does what it says
     D18 ⭐ MATERIAL IS A SKIN changing the pictures cannot change the draw
     D19 PURITY + SHAPE      immutable reducers, frozen state shape
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.DRB_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'draw-bag.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = DrawBag;', sandbox);
const T = sandbox.__T;
if (!T) { console.error('FATAL: the tool did not define DrawBag'); process.exit(1); }

/* the model region ends where the entitlement plumbing begins; source
   bans that would false-positive on chrome are scoped to it */
const MODEL_END = SRC_NC.indexOf('_loadStore:');
const MODEL = MODEL_END > 0 ? SRC_NC.slice(0, MODEL_END) : SRC_NC;
const RENDER = MODEL_END > 0 ? SRC_NC.slice(MODEL_END) : '';

/* =====================================================================
   THE ORACLE — hardcoded, independent, never read off the tool
   ===================================================================== */
const O_KINDS = ['c', 's', 't', 'd', 'h', 'x'];
const O_MAX_EACH = 12;
const O_MAX_TOTAL = 24;

function oTotal(b) { let t = 0; for (const k of O_KINDS) t += (b && b[k]) || 0; return t; }

/* ⭐ THE INDEPENDENT ORACLE: expand the multiset and index it. No prefix
   sum anywhere, so it cannot share a bug with the thing it is judging. */
function oExpand(b) {
  const a = [];
  for (const k of O_KINDS) for (let i = 0; i < ((b && b[k]) || 0); i++) a.push(k);
  return a;
}

function oMix(a, b) {
  let h = (a ^ Math.imul((b | 0) + 0x9E3779B9, 0x85EBCA6B)) | 0;
  h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) | 0;
  return (h ^ (h >>> 16)) >>> 0;
}
function oMulberry(a) {
  let s = a >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function oSeed(b, k) {
  let s = 0;
  for (let i = 0; i < O_KINDS.length; i++) s = oMix(s, ((b && b[O_KINDS[i]]) || 0) + (i + 1) * 31);
  return oMix(s, k);
}
function oUniform(rng, n) {
  if (!(n > 0)) return 0;
  const limit = Math.floor(4294967296 / n) * n;
  let v, guard = 0;
  do { v = Math.floor(rng() * 4294967296); guard++; } while (v >= limit && guard < 200);
  return v % n;
}
function oPick(b, seed, idx) {
  const t = oTotal(b);
  if (t < 1) return null;
  return oExpand(b)[oUniform(oMulberry(oMix(seed, idx)), t)];
}

/* the library the gate reasons over — read from the SAME dir the tool is
   read from, so the mutation harness can point both at its copy */
let BOOK = null;
try { BOOK = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'draw-bag-bags.json'), 'utf8')); }
catch (e) { err('cannot read draw-bag-bags.json: ' + e.message); }
const BAGS = (BOOK && BOOK.bags) || [];

const mk = (o) => { const b = {}; for (const k of O_KINDS) b[k] = (o && o[k]) || 0; return b; };
const bagsOf = () => BAGS.map((r) => mk(r.b));
const SKINS = (BOOK && BOOK.skins) || [];

/* ⭐ ARM THE PRIOR. From build #4 the bag REFUSES to draw until the class
   has claimed at least one kind — because build #3 set `committed = true`
   on the very first tap whatever the guess held, so one tap on the
   largest object on the stage silently froze an all-zero prior forever.
   Every group below that wants to draw must therefore state a claim
   first, exactly as a class does. This helper is that one claim, and it
   ASSERTS the arming worked rather than quietly handing back an
   unarmable state — a silent no-op here would hollow out every
   assertion downstream (the recorded #39 harness defect). */
function armed(st, where) {
  const a = T.placeGuess(st, 'c', T.ZONE_IN);
  if (!a) { err((where || 'armed') + ': could not place the opening claim'); return st; }
  if (!T.canDraw(a)) { err((where || 'armed') + ': the bag still refuses to draw after a claim'); return a; }
  return a;
}

/* ⚠ BOUNDED, ALWAYS. A mutation that stopped the record filling made an
   unbounded `while (T.canDraw(s))` spin forever, and the harness scored
   it TIMED OUT — which counts as SURVIVED. A gate that hangs reports
   nothing, so no loop in this file is allowed to depend on the tool
   terminating. */
function fillRun(st, where) {
  let s = st, guard = 0;
  if (!s.committed && T.claimed(s.guess) < 1) s = armed(s, where);
  while (T.canDraw(s)) {
    const next = T.draw(s);
    if (!next) break;
    s = next;
    if (++guard > 400) { err(where + ': the record never filled — draw is not advancing'); break; }
  }
  return s;
}

/* a handful of hand-built edge bags the library does not have to contain */
const EDGE = [
  mk({ c: 1 }), mk({ c: 12 }), mk({ c: 1, s: 1 }), mk({ c: 23, s: 1 }),
  mk({ c: 12, s: 12 }), mk({ c: 4, s: 4, t: 4, d: 4, h: 4, x: 4 }), mk({ c: 11, s: 1, t: 1 })
];

/* =====================================================================
   D1 · SUPPORT SOUNDNESS
   ===================================================================== */
(function D1() {
  const all = bagsOf().concat(EDGE);
  if (!all.length) { err('D1: no bags to check'); return; }
  let n = 0;
  for (const b of all) {
    const seed = oSeed(b, 1);
    for (let i = 0; i < 400; i++) {
      const got = T.pick(b, seed, i);
      n++;
      if (!got || !((b[got] || 0) > 0)) { err('D1: drew "' + got + '" from a bag that holds none of it'); return; }
    }
  }
  console.log('D1  support soundness: ' + n + ' draws, every one a kind the bag actually holds');
})();

/* =====================================================================
   D2 · IMPOSSIBLE NEVER, CERTAIN ALWAYS
   ===================================================================== */
(function D2() {
  /* a kind with count 0 must never come out */
  for (const b of bagsOf().concat(EDGE)) {
    const absent = O_KINDS.filter((k) => !b[k]);
    if (!absent.length) continue;
    const seed = oSeed(b, 7);
    for (let i = 0; i < 600; i++) {
      const got = T.pick(b, seed, i);
      if (absent.indexOf(got) !== -1) { err('D2: an impossible kind ("' + got + '") came out of the bag'); return; }
    }
  }
  /* a one-kind bag yields that kind every time — the certain case */
  for (const c of [1, 5, 12]) {
    const b = mk({ t: c });
    const seed = oSeed(b, 1);
    for (let i = 0; i < 500; i++) {
      if (T.pick(b, seed, i) !== 't') { err('D2: a one-kind bag failed to yield its one kind'); return; }
    }
  }
  console.log('D2  impossible never appears; a one-kind bag is certain across 1,500 draws');
})();

/* =====================================================================
   D3 ⭐ THE EXACT SAMPLER — the theorem. Chi-squared is only its backstop.
   ===================================================================== */
(function D3() {
  const all = bagsOf().concat(EDGE);
  let idxChecked = 0;
  for (const b of all) {
    const flat = oExpand(b);
    for (let i = 0; i < flat.length; i++) {
      if (T.at(b, i) !== flat[i]) {
        err('D3: at(bag,' + i + ') = ' + T.at(b, i) + ', the expanded multiset says ' + flat[i]);
        return;
      }
      idxChecked++;
    }
    /* out of range in both directions must be null, not a coerced kind */
    if (T.at(b, flat.length) !== null) { err('D3: at(bag, total) is not null'); return; }
    if (T.at(b, -1) !== null) { err('D3: at(bag, -1) is not null'); return; }
    if (T.at(b, 1.5) !== null && T.at(b, 1.5) !== flat[1]) { /* fractional is clamped or refused; either is fine */ }
    /* ⚠ `Number(null)` is 0, so a thing that is not a number must survive
       nothing — the recorded number-sieve trap. */
    if (T.at(b, null) !== null) { err('D3: at(bag, null) coerced to an index'); return; }
    if (T.at(b, '0') !== null) { err('D3: at(bag, "0") coerced to an index'); return; }
  }
  /* and the composed pick must match the composed oracle */
  let picks = 0;
  for (const b of all.slice(0, 40)) {
    for (let s = 1; s <= 3; s++) {
      const seed = oSeed(b, s);
      for (let i = 0; i < 120; i++) {
        if (T.pick(b, seed, i) !== oPick(b, seed, i)) { err('D3: pick disagrees with the oracle at seed ' + s + ' index ' + i); return; }
        picks++;
      }
    }
  }
  /* the tool's own seed derivation must match too, or two runs of "the
     same bag" could silently stop being the same bag */
  for (const b of all) {
    for (let k = 1; k <= 2; k++) {
      if (T.seedFor(b, k) !== oSeed(b, k)) { err('D3: seedFor disagrees with the oracle'); return; }
    }
  }
  console.log('D3  the exact sampler: ' + idxChecked + ' indices against an expanded-array oracle, ' + picks + ' composed picks, seeds agree');
})();

/* =====================================================================
   D4 · DETERMINISM, AND NO UNSEEDED RANDOMNESS
   ===================================================================== */
(function D4() {
  const b = mk({ c: 5, s: 3, t: 1 });
  const seed = oSeed(b, 1);
  for (let i = 0; i < 200; i++) {
    if (T.pick(b, seed, i) !== T.pick(b, seed, i)) { err('D4: pick is not a function of its arguments'); return; }
  }
  /* ⚠ THE BAN IS ON *UNSEEDED* RANDOMNESS, NOT ON RANDOMNESS. Both
     shipped v4 tools ban Math.random outright; this one is the first with
     a legitimate need for it, so the assertion had to be written
     differently — and Date is banned in the MODEL only, because the
     entitlement cache legitimately uses it. */
  const BANNED = /\b(Math\s*\.\s*random|crypto\s*\.\s*getRandomValues|performance\s*\.\s*now)\b/;
  if (BANNED.test(SRC_NC)) { err('D4: unseeded randomness is reachable in the tool'); }
  if (/\b(Date\s*\.\s*now|new\s+Date)\b/.test(MODEL)) { err('D4: the model reads the clock'); }
  /* poison — a ban that cannot fire is worse than no ban */
  if (!BANNED.test('var x = Math.random();')) err('D4 POISON: the unseeded-randomness ban no longer fires');
  if (!BANNED.test('crypto.getRandomValues(a)')) err('D4 POISON: the crypto ban no longer fires');
  if (!/\b(Date\s*\.\s*now|new\s+Date)\b/.test('var t = Date.now();')) err('D4 POISON: the clock ban no longer fires');
  /* whole-run determinism through the reducers, twice from scratch */
  const runOnce = () => {
    let st = T.newState();
    st = T.openDraft(st);
    st = T.setDraft(st, 'c', 1); st = T.setDraft(st, 'c', 1); st = T.setDraft(st, 's', 1);
    st = T.sealDraft(st);
    st = armed(st, 'D3');
    for (let i = 0; i < st.n; i++) st = T.draw(st);
    return st.runs[0].draws.join('');
  };
  if (runOnce() !== runOnce()) err('D4: two identical bags produced different runs');
  console.log('D4  determinism: identical bags replay identically; no unseeded randomness, no clock in the model');
})();

/* =====================================================================
   D5 · DISTRIBUTION — chi-squared against the exact multinomial
   ===================================================================== */
(function D5() {
  /* upper-tail critical values at p = 1e-5, so a correct sampler
     essentially never trips while a biased one trips enormously */
  const CRIT = { 1: 19.5, 2: 23.0, 3: 25.9, 4: 28.5, 5: 30.9 };
  const N = 20000;
  let worst = 0, worstId = '';
  const all = BAGS.length ? BAGS.map((r, i) => ({ id: r.id, b: mk(r.b) })) : EDGE.map((b, i) => ({ id: 'edge-' + i, b }));
  for (const { id, b } of all) {
    const t = oTotal(b);
    const kinds = O_KINDS.filter((k) => b[k] > 0);
    if (kinds.length < 2) continue;
    const seen = {};
    for (const k of kinds) seen[k] = 0;
    const seed = oSeed(b, 1);
    for (let i = 0; i < N; i++) seen[T.pick(b, seed, i)]++;
    let chi = 0;
    for (const k of kinds) {
      const exp = N * (b[k] / t);
      chi += Math.pow(seen[k] - exp, 2) / exp;
    }
    const df = kinds.length - 1;
    if (chi > worst) { worst = chi; worstId = id; }
    if (chi > CRIT[df]) { err('D5: ' + id + ' chi-squared ' + chi.toFixed(2) + ' exceeds ' + CRIT[df] + ' at df=' + df); return; }
  }
  console.log('D5  distribution: ' + all.length + ' bags x ' + N + ' draws, worst chi-squared ' + worst.toFixed(2) + ' (' + worstId + ')');
})();

/* =====================================================================
   D6 · CONSERVATION — with replacement, after EVERY single draw
   ===================================================================== */
(function D6() {
  let checks = 0;
  for (const rec of BAGS.slice(0, 30)) {
    let st = T.loadBag(T.newState(), rec);
    if (!st) { err('D6: loadBag refused a library bag (' + rec.id + ')'); return; }
    const before = JSON.stringify(st.bag);
    st.n = 40;
    st = armed(st, 'D6');
    for (let i = 0; i < 40; i++) {
      const next = T.draw(st);
      if (!next) { err('D6: draw refused at ' + i + ' of 40'); return; }
      st = next;
      if (JSON.stringify(st.bag) !== before) { err('D6: the bag changed after a draw — this tool is WITH replacement'); return; }
      checks++;
    }
  }
  console.log('D6  conservation: the bag is byte-identical after each of ' + checks + ' draws');
})();

/* =====================================================================
   D7 · APPEND-ONLY — the record only ever grows, by exactly one
   ===================================================================== */
(function D7() {
  let st = T.loadBag(T.newState(), BAGS[1] || { b: { c: 3, s: 2 } });
  st.n = 40;
  st = armed(st, 'D7');
  let prev = [];
  for (let i = 0; i < 40; i++) {
    st = T.draw(st);
    const now = st.runs[0].draws;
    if (now.length !== prev.length + 1) { err('D7: the record grew by ' + (now.length - prev.length) + ', not 1'); return; }
    for (let j = 0; j < prev.length; j++) {
      if (now[j] !== prev[j]) { err('D7: cell ' + j + ' changed after it was drawn — the record is not permanent'); return; }
    }
    prev = now.slice();
  }
  /* and a full record refuses another draw rather than overflowing */
  if (T.draw(st) !== null) err('D7: a full record accepted another draw');
  console.log('D7  append-only: 40 draws, every earlier cell untouched, and a full record refuses more');
})();

/* =====================================================================
   D8 ⭐ IDENTICAL CAUSE, DIFFERENT PICTURE
   ===================================================================== */
(function D8() {
  const fill = (st) => fillRun(st, 'D8');
  let differed = 0, checked = 0;
  for (const rec of BAGS.slice(0, 60)) {
    let st = T.loadBag(T.newState(), rec);
    st.n = 20;
    st = fill(st);
    const bagAfterRun1 = JSON.stringify(st.bag);
    const s2 = T.secondRun(st);
    if (!s2) { err('D8: secondRun refused after a full first run (' + rec.id + ')'); return; }
    /* THE claim: the same bag, and only the seed differs */
    if (JSON.stringify(s2.bag) !== bagAfterRun1) { err('D8: run two is not the same bag'); return; }
    if (s2.runs[1].seed === s2.runs[0].seed) { err('D8: run two reuses run one\'s seed — it would replay it'); return; }
    const done = fill(s2);
    const a = done.runs[0].draws.join(''), b = done.runs[1].draws.join('');
    /* the gate computes the exact probability of an identical record
       ITSELF: sum of p^2 over kinds, raised to n */
    const t = oTotal(done.bag);
    let coll = 0;
    for (const k of O_KINDS) coll += Math.pow((done.bag[k] || 0) / t, 2);
    const pIdentical = Math.pow(coll, done.n);
    checked++;
    if (pIdentical > 0.5) {
      /* ⚠ THE CERTAIN CASE, AND IT IS WHY THIS INVARIANT IS NOT VACUOUS.
         A one-kind bag MUST repeat exactly. "the records always differ"
         would be a false claim, and asserting it would have shipped. */
      if (a !== b) { err('D8: a bag that can only produce one record produced two (' + rec.id + ')'); return; }
    } else if (pIdentical < 1e-9) {
      if (a === b) { err('D8: two runs matched exactly where that is essentially impossible (' + rec.id + ')'); return; }
      differed++;
    }
  }
  if (!differed) { err('D8: no bag was actually checked for differing — the invariant is vacuous'); return; }
  console.log('D8  identical cause: ' + checked + ' bags, same multiset + a different seed; ' + differed + ' provably differed, and certain bags provably repeated');
})();

/* =====================================================================
   D9 · STRUCTURAL UNREACHABILITY
   ===================================================================== */
(function D9() {
  let st = T.loadBag(T.newState(), BAGS[0] || { b: { c: 3, s: 2 } });
  let threw = false;
  try { T.composition(st); } catch (_) { threw = true; }
  if (!threw) { err('D9: composition() did not throw before the bag was opened'); return; }
  /* it must keep throwing all the way through a run */
  st.n = 10;
  st = armed(st, 'D9');
  for (let i = 0; i < 10; i++) {
    st = T.draw(st);
    let t2 = false;
    try { T.composition(st); } catch (_) { t2 = true; }
    if (!t2) { err('D9: composition() stopped throwing part-way through a run'); return; }
  }
  const open = T.openBag(st);
  let got = null;
  try { got = T.composition(open); } catch (_) { }
  if (!got) { err('D9: composition() still throws after the bag was opened — the reveal is unreachable'); return; }
  /* poison: the invariant is only meaningful if it CAN succeed */
  if (oTotal(got) !== oTotal(open.bag)) { err('D9: the revealed composition is not the bag'); return; }
  /* opening is not a free-for-all: an empty bag has nothing to reveal,
     and opening twice would let a second reveal claim to be the first */
  if (T.openBag(T.newState()) !== null) err('D9: an empty bag could be opened');
  if (T.openBag(open) !== null) err('D9: an already-open bag could be opened again');
  /* and only one guarded caller may exist in the render path */
  const callers = (RENDER.match(/this\.composition\(/g) || []).length;
  if (callers !== 1) { err('D9: composition() has ' + callers + ' callers in the render path; exactly one, guarded, is allowed'); }
  if (!/if\s*\(this\.st\.opened\)\s*wrap\.appendChild\(this\._buildOpened\(\)\)/.test(RENDER)) {
    err('D9: the reveal is not guarded on st.opened at its call site');
  }
  console.log('D9  unreachability: composition() throws until the bag is open, then reveals; one guarded caller');
})();

/* =====================================================================
   D10 ⭐ THE COMMITTED PRIOR
   ===================================================================== */
(function D10() {
  let st = T.loadBag(T.newState(), BAGS[0] || { b: { c: 3, s: 2 } });
  /* ⚠ POISON FIRST: before a draw the guess MUST move, or "it cannot be
     changed afterwards" is true for the boring reason. An IFF that is
     almost always false is vacuous. */
  const before = JSON.stringify(st.guess);
  st = T.placeGuess(st, 'c', 1);
  if (!st) { err('D10: placeGuess refused before any draw — the prior can never be placed'); return; }
  if (JSON.stringify(st.guess) === before) { err('D10: placeGuess did not move the guess'); return; }

  /* ⭐⭐ ABSOLUTE PLACEMENT, MEASURED AS REACHABILITY. Build #3 was a
     blind 3-cycle — `(guess[kind] + 1) % 3` — and on the shipped tool
     one piece over six taps went pool -> in -> out -> pool -> in -> out
     -> pool: the destination of a single tap was not choosable and the
     middle zone cost three. That IS the operator's "the objects could
     not be placed on the second line". The law is not "a cycle exists";
     it is EVERY ZONE REACHES EVERY OTHER ZONE IN ONE ACTION. */
  const ZONES = [T.ZONE_TRAY, T.ZONE_IN, T.ZONE_OUT];
  if (new Set(ZONES).size !== 3) { err('D10: the three zones are not distinct'); return; }
  for (const from of ZONES) {
    for (const to of ZONES) {
      let base = T.loadBag(T.newState(), BAGS[0] || { b: { c: 3, s: 2 } });
      if (from !== T.ZONE_TRAY) { base = T.placeGuess(base, 'c', from); }
      if (!base || base.guess.c !== from) { err('D10: could not set up zone ' + from); return; }
      const moved = T.placeGuess(base, 'c', to);
      if (from === to) {
        /* a no-op is a REFUSAL, per the setLen/setSkin doctrine — a
           control that provably does nothing must not report success */
        if (moved !== null) { err('D10: placeGuess accepted a no-op (' + from + ' -> ' + to + ')'); return; }
        continue;
      }
      if (!moved) { err('D10: ' + from + ' -> ' + to + ' was refused; a destination must be choosable in ONE action'); return; }
      if (moved.guess.c !== to) { err('D10: ' + from + ' -> ' + to + ' landed on ' + moved.guess.c); return; }
    }
  }
  /* a zone outside the set is refused rather than clamped */
  for (const bad of [3, -1, 1.5, null, 'in', NaN]) {
    if (T.placeGuess(st, 'c', bad) !== null) { err('D10: placeGuess accepted the zone ' + String(bad)); return; }
  }

  /* ⭐⭐ THE PRIOR MUST EXIST BEFORE THE FIRST DRAW, AND THAT HAD TO BE
     ASSERTED RATHER THAN ASSUMED. Two mutations survived the first run of
     this gate — one that deleted the guard outright and one that made
     `claimed()` count pieces nobody had moved — because the gate checked
     that the prior FREEZES and never that it EXISTS. Build #3 set
     `committed = true` on the very first tap whatever the guess held, so
     one tap on the largest object on the stage silently froze an all-zero
     claim, forever, with no undo. */
  {
    const cold = T.loadBag(T.newState(), BAGS[0] || { b: { c: 3, s: 2 } });
    if (T.claimed(cold.guess) !== 0) err('D10: a freshly seated bag already counts a claim');
    if (T.canDraw(cold)) err('D10: the bag draws before the class has claimed anything');
    if (T.draw(cold) !== null) err('D10: draw() succeeded on an empty prior');
    /* and it must open the moment ONE claim exists — an always-false guard
       would satisfy the line above for the boring reason */
    for (const z of [T.ZONE_IN, T.ZONE_OUT]) {
      const one = T.placeGuess(cold, 'c', z);
      if (!one) { err('D10: could not claim into zone ' + z); continue; }
      if (T.claimed(one.guess) !== 1) err('D10: one claim counts as ' + T.claimed(one.guess));
      if (!T.canDraw(one)) err('D10: the bag still refuses after a claim in zone ' + z);
      if (T.draw(one) === null) err('D10: draw() still refused after a claim in zone ' + z);
    }
    /* moving a piece BACK to the tray withdraws the claim */
    let back = T.placeGuess(cold, 'c', T.ZONE_IN);
    back = T.placeGuess(back, 'c', T.ZONE_TRAY);
    if (!back) err('D10: a claim could not be withdrawn');
    else if (T.canDraw(back)) err('D10: the bag draws after every claim was withdrawn');
  }
  st = T.placeGuess(st, 's', 2);
  const committedGuess = JSON.stringify(st.guess);
  st.n = 10;
  st = T.draw(st);
  if (!st.committed) { err('D10: the first draw did not commit the prior'); return; }
  for (const k of O_KINDS) {
    for (const z of ZONES) {
      if (T.placeGuess(st, k, z) !== null) { err('D10: the guess moved after the first draw'); return; }
    }
  }
  st = fillRun(st, 'D10');
  const opened = T.openBag(st);
  if (JSON.stringify(opened.guess) !== committedGuess) { err('D10: the guess is not byte-identical at the reveal'); return; }
  console.log('D10 committed prior: the guess moves freely, commits on draw one, and is byte-identical at the reveal');
})();

/* =====================================================================
   D11 · NO VERDICT ON THE GUESS
   ===================================================================== */
(function D11() {
  /* ⚠ `points` WAS IN THIS LIST AND IT FIRED ON AN SVG POLYGON. That is
     the recorded fr defect in another dress: number-sieve's gate banned
     the bare token `par` (Spanish "even"), which is also the French
     preposition, so correct French would have failed the build. A fence
     that rejects correct code is not a fence — it teaches you to word
     things around it. The scoring vocabulary below is unambiguous. */
  /* ⚠ AND `closest` HAD TO COME OUT OF THE SCAN, WHICH IS THE SAME TRAP
     AGAIN. `Element.closest()` is a standard DOM method and the drop
     handler legitimately calls `ev.target.closest('.drb-gpiece')`. A ban
     that condemns the platform's own API teaches you to write around the
     fence instead of reporting it — exactly what the `par` and
     `Zufallsbeutel` defects did. It stays banned as a WORD and is
     exempted as a METHOD CALL, and both directions are poison-tested. */
  const VERDICT = /\b(score|scoring|correct|incorrect|wrong|right_answer|winner|wins|verdict|rank|ranking|closest|better|worse|accuracy|streak)\b/i;
  /* ⚠ AND IT HAS TO COVER THE EXISTENCE CHECK. The first exemption was
     `/\.closest\s*\(/`, which misses `ev.target.closest && ...` — so a
     narrowed exemption left the ban still condemning correct code. The
     recorded rule is to poison-test every narrowed regex; this is why. */
  const SCAN = SRC_NC.replace(/\.closest\b/g, '.__domClosest');
  if (/\bclosest\b/.test(SCAN.replace(/__domClosest/g, ''))) {
    err('D11: a bare "closest" survives the DOM exemption — check what it is');
  }
  if (!/\bclosest\b/.test('pick the closest one'.replace(/\.closest\b/g, '.__domClosest'))) {
    err('D11 POISON: the DOM exemption swallows the word in prose too');
  }
  if (VERDICT.test(SCAN)) {
    const hit = SCAN.match(VERDICT);
    err('D11: verdict machinery in the source ("' + hit[0] + '")');
  }
  if (/drb-(correct|wrong|right|good|bad|win|fail)/.test(SRC)) err('D11: a verdict class name exists');
  /* no function may take the guess and the bag together */
  if (/function\s*\([^)]*\)\s*\{[^}]*\bguess\b[^}]*\bcomposition\b/.test(SRC_NC)) {
    err('D11: something compares the guess with the composition');
  }
  if (!VERDICT.test('var score = 1;')) err('D11 POISON: the verdict ban no longer fires');
  if (!VERDICT.test('if (correct) {}')) err('D11 POISON: the verdict ban no longer fires on "correct"');
  console.log('D11 no verdict: nothing scores, ranks or compares the guess (poison-tested)');
})();

/* =====================================================================
   D12 · NO FREQUENCY NUMERAL
   ===================================================================== */
(function D12() {
  /* every textContent assignment in the file must be an authored string
     or the record-length numeral, which is chrome on a chip */
  const ALLOWED = [/^api\.t\('[a-zA-Z]+'\)$/, /^api\.t\(this\._hintKey\(\)\)$/, /^String\(n\)$/, /^''$/];
  /* ⚠ SCOPE TO THE OBJECT LITERAL. The stylesheet injector lives outside
     it and legitimately does `st.textContent = css`, which is a <style>
     element and not a word on the screen. Scanning the whole file made
     the gate report the stylesheet as a frequency numeral. */
  const OBJ_END = SRC_NC.indexOf('function injectDrawBagCSS');
  const OBJ = OBJ_END > 0 ? SRC_NC.slice(0, OBJ_END) : SRC_NC;
  const hits = OBJ.match(/\.textContent\s*=\s*([^;]+);/g) || [];
  if (!hits.length) { err('D12: no textContent assignments found — has the render changed shape?'); return; }
  for (const h of hits) {
    const rhs = h.replace(/^\.textContent\s*=\s*/, '').replace(/;$/, '').trim();
    if (!ALLOWED.some((re) => re.test(rhs))) err('D12: a textContent is not an authored string or the length numeral: ' + rhs);
  }
  /* and no authored string may carry a percentage or a bare digit */
  for (const key of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const v = T.strings[key][loc];
      if (typeof v !== 'string') continue;
      if (v.indexOf('%') !== -1) err('D12: ' + key + '.' + loc + ' carries a percent sign');
      if (/\d/.test(v.replace(/\{[a-z]+\}/g, ''))) err('D12: ' + key + '.' + loc + ' carries a digit outside a placeholder');
    }
  }
  /* the record must never group by kind — no per-kind tally anywhere */
  if (/\btally\b|\bfrequency\b|\bcountsByKind\b|\bhistogram\b/i.test(SRC_NC)) err('D12: a per-kind tally exists');
  if (!ALLOWED.some((re) => re.test("String(total)"))) { /* expected: not allowed */ } else err('D12 POISON: the allow-list admits a computed count');
  console.log('D12 no frequency numeral: ' + hits.length + ' textContent sites, all authored strings or the length chip');
})();

/* =====================================================================
   D13 ⭐ NO WORDS ON THE STAGE
   ===================================================================== */
(function D13() {
  /* the stage builders carry the material; not one of them may write a
     text node. The bar and the foot are chrome and may. */
  const STAGE = ['_buildGuess', '_buildMain', '_buildRecord', '_buildOpened', '_buildFill'];
  for (const fn of STAGE) {
    const at = SRC_NC.indexOf(fn + ': function');
    if (at < 0) { err('D13: stage builder ' + fn + ' not found'); continue; }
    /* to the next top-level builder */
    const rest = SRC_NC.slice(at + 1);
    const end = rest.search(/\n  [_a-zA-Z]+: function/);
    const body = end > 0 ? rest.slice(0, end) : rest;
    if (/\.textContent\s*=/.test(body)) err('D13: ' + fn + ' writes a text node onto the stage');
    if (/\.innerHTML\s*=/.test(body)) err('D13: ' + fn + ' writes innerHTML onto the stage');
  }
  /* and no SVG <text> node anywhere in the tool */
  if (/createElementNS\([^,]+,\s*['"]text['"]\)/.test(SRC_NC)) err('D13: an SVG text node exists');
  const poison = "_buildGuess: function () { x.textContent = 'hi'; }";
  if (!/\.textContent\s*=/.test(poison)) err('D13 POISON: the text-node ban no longer fires');
  /* ⭐⭐ AND THE ONE SENTENCE A TEACHER CAN SEE MUST ACTUALLY BE PAINTED.
     A mutation that blanked it survived the first run of this gate,
     because `''` is on D12's allow-list and nothing else looked. This is
     the tool's ONLY explanation on the real product surface: the shell
     renders `strings.instruction` into `.lcs-instruction` and
     `lcs-shell.css:261` hides that for every iframed load, which every
     production surface is. */
  const band = (() => {
    const at = SRC_NC.indexOf('_buildBand: function');
    if (at < 0) return '';
    const rest = SRC_NC.slice(at + 1);
    const end = rest.search(/\n  [_a-zA-Z]+: function/);
    return end > 0 ? rest.slice(0, end) : rest;
  })();
  if (!band) err('D13: there is no band, so the tool has no visible explanation at all');
  if (!/l1\.textContent\s*=\s*api\.t\('doctrine'\)/.test(band)) {
    err('D13: the permanent line is not painted from the doctrine string');
  }
  if (!/l2\.textContent\s*=\s*api\.t\(this\._hintKey\(\)\)/.test(band)) {
    err('D13: the state rung is not painted from an authored key');
  }
  if (/textContent\s*=\s*''/.test(band)) err('D13: the band blanks one of its own lines');
  console.log('D13 no words on the stage: ' + STAGE.length + ' material builders, zero text nodes (poison-tested)');
})();

/* =====================================================================
   D14 · NO LIKELIHOOD WORD, ON EACH LOCALE'S OWN VOCABULARY
   ⚠ Ambiguous tokens are QUALIFIED, never bare. The recorded fr defect:
   number-sieve's gate banned the bare token `par` (Spanish "even"),
   which is also the French preposition, so a teacher's natural phrasing
   would have failed the build. "certain / sicher / certo / caso" are all
   ordinary words in their own languages and are deliberately NOT banned
   bare — the technical nouns and the -ly adjectives carry the fence.
   ===================================================================== */
(function D14() {
  /* ⚠ THESE MUST TOLERATE INFLECTION OR THEY UNDER-FIRE. The first cut
     anchored `\b(osannolik)\b`, which does not match Swedish
     "osannolikt" — the neuter form, and the form a teacher would
     actually write. Its own poison case caught it, which is the whole
     reason each ban carries one. Germanic and Finnic endings are ASCII,
     so a trailing `\w*` is enough.

     ⭐ AND THE BAN IS ON THE VERDICT, NOT ON THE SUBJECT. The first cut
     also banned the MECHANISM words — zufällig/zufalls-, aléatoire,
     aleatorio, casuale, willekeurig, slumpmässig, tilfældig, satunnainen,
     random — and the German panel's proposed name, `Der Zufallsbeutel`,
     would have failed the build. That is the recorded fr defect in a new
     dress: number-sieve banned the bare token `par` (Spanish "even"),
     which is also the French preposition, and a fence that rejects
     correct German is not a fence — it teaches a native panel to reword
     AROUND the gate instead of reporting it.
     The refusal this tool actually makes is that it never tells the
     class HOW LIKELY anything is. "Zufall" names the domain — it is the
     word the KMK Klasse-1 strand and every Grundschule textbook use
     (*Zufallsexperiment*), and the v4 law itself says authored language
     is chrome "(title, settings, the paid chip)". Naming the subject is
     not delivering a verdict. So the judgement words stay banned
     everywhere and the mechanism words come out. */
  const BAN = {
    en: /\b(likely|unlikely|probabilit\w*|probable|impossible|odds|fifty-fifty)/i,
    de: /\b(wahrscheinlich\w*|unwahrscheinlich\w*|unmöglich\w*)/i,
    fr: /\b(probable\w*|improbable\w*|probabilité\w*|impossible\w*)/i,
    es: /\b(probable\w*|improbable\w*|probabilidad\w*|imposible\w*)/i,
    pt: /\b(prováv\w*|improváv\w*|probabilidade\w*|impossív\w*)/i,
    it: /\b(probabil\w*|improbabil\w*|impossibil\w*)/i,
    nl: /\b(waarschijnlijk\w*|onwaarschijnlijk\w*|onmogelijk\w*)/i,
    sv: /\b(sannolik\w*|osannolik\w*|omöjlig\w*)/i,
    da: /\b(sandsynlig\w*|usandsynlig\w*|umulig\w*)/i,
    no: /\b(sannsynlig\w*|usannsynlig\w*|umulig\w*)/i,
    fi: /\b(todennäköi\w*|epätodennäköi\w*|mahdoton\w*)/i
  };
  /* ⚠ AND THE NARROWING IS POISON-TESTED IN BOTH DIRECTIONS: every
     judgement word must still fire, and the mechanism word that caused
     the narrowing must now pass. A ban narrowed until it cannot fire is
     worse than no ban. */
  const MUST_PASS = {
    en: 'a draw bag', de: 'Der Zufallsbeutel', fr: 'le sac à tirages', es: 'la bolsa de sacar',
    pt: 'o saco de tirar', it: 'il sacchetto', nl: 'de trekzak', sv: 'dragpåsen',
    da: 'trækposen', no: 'trekkposen', fi: 'nostopussi'
  };
  const POISON = {
    en: 'it is unlikely', de: 'das ist unwahrscheinlich', fr: 'c’est improbable', es: 'es improbable',
    pt: 'é improvável', it: 'è improbabile', nl: 'dat is onwaarschijnlijk', sv: 'det är osannolikt',
    da: 'det er usandsynligt', no: 'det er usannsynlig', fi: 'se on epätodennäköinen'
  };
  /* refusal 6 — no calque of name-sticks' `tipBack`, which is authored
     in all eleven locales on a shipped tool */
  const TIPBACK = {
    en: /\btip (them |it )?back\b/i, de: /\bzurück ins (glas|beutel)\b/i, fr: /\bverse[-\s]les\b/i,
    es: /\bregresarlos\b/i, pt: /\bvirar tudo de volta\b/i, it: /\bversali\b/i,
    nl: /\bkieper ze terug\b/i, sv: /\bhäll tillbaka\b/i, da: /\bhæld dem tilbage\b/i,
    no: /\bhell dem tilbake\b/i, fi: /\bkaada takaisin\b/i
  };
  for (const loc of LOCALES) {
    if (!BAN[loc].test(POISON[loc])) { err('D14 POISON: the ' + loc + ' ban no longer fires on "' + POISON[loc] + '"'); continue; }
    /* the other direction: a ban wide enough to reject the tool's own
       name in that locale would send a native panel wording around it */
    if (BAN[loc].test(MUST_PASS[loc])) { err('D14 POISON: the ' + loc + ' ban is too wide — it rejects "' + MUST_PASS[loc] + '"'); continue; }
    for (const key of Object.keys(T.strings)) {
      const v = T.strings[key][loc];
      if (typeof v !== 'string') { err('D14: ' + key + ' has no ' + loc + ' string'); continue; }
      if (BAN[loc].test(v)) err('D14: a likelihood word in ' + key + '.' + loc + ' — "' + v.match(BAN[loc])[0] + '"');
      if (TIPBACK[loc].test(v)) err('D14: ' + key + '.' + loc + ' calques name-sticks\' "tip them back in"');
    }
  }
  /* invisible characters: a soft hyphen in a Danish string survived every
     assertion on a previous tool and surfaced only because a digest
     PRINTED it */
  /* ⚠ WRITTEN AS ESCAPES ON PURPOSE. The first cut typed the literal
     characters into this line, which made the ban itself invisible —
     grep reported the gate as a binary file and the mutation harness
     could not anchor on it. A ban you cannot read is a ban you cannot
     review. */
  const INVIS = /[\u00ad\u200b-\u200d\u2060\ufeff\u0000-\u0008\u000b\u000c\u000e-\u001f]/;
  for (const key of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const v = T.strings[key][loc];
      if (typeof v === 'string' && INVIS.test(v)) err('D14: an invisible character in ' + key + '.' + loc);
    }
  }
  if (!INVIS.test('a\u00adb')) err('D14 POISON: the invisible-character ban no longer fires');
  console.log('D14 no likelihood word in any of 11 locales, no tipBack calque, no invisibles (each ban poison-tested)');
})();

/* =====================================================================
   D15 · IDENTITY
   ===================================================================== */
(function D15() {
  if (T.tasks || T.nextTask) err('D15: this is a free-play instrument and must declare no tasks');
  const urls = (SRC_NC.match(/fetch\(\s*'([^']+)'/g) || []).map((m) => m.replace(/fetch\(\s*'/, '').replace(/'$/, ''));
  const want = ['/api/auth/me', '/mini-tools/draw-bag-bags.json'].sort().join(',');
  if (urls.sort().join(',') !== want) err('D15: the fetch allow-list is ' + urls.join(',') + ', expected ' + want);
  if (/method\s*:\s*['"]POST['"]/i.test(SRC_NC)) err('D15: the tool POSTs somewhere');
  /* ⚠ SRC_NC, NOT SRC. The refusal is documented in this file's own
     header, so scanning the commented source made the tool fail for
     saying it does not do the thing. */
  if (/lcs:my-classes/.test(SRC_NC)) err('D15: the tool touches the name-sticks roster store (children are PII)');
  if (T.STORE_KEY !== 'lcs:draw-bag:v1') err('D15: the store key is ' + T.STORE_KEY);
  /* nothing about a child */
  if (/\b(child|pupil|student)Name\b|\bnames\b/i.test(SRC_NC)) err('D15: the tool holds a child identity');
  console.log('D15 identity: no tasks, two fetches and no others, no POST, no roster, no child identity');
})();

/* =====================================================================
   D16 · THE BAG BOOK AND ITS OFFLINE FALLBACK
   ===================================================================== */
(function D16() {
  if (!BOOK) { err('D16: no bag book'); return; }
  if (!BAGS.length) { err('D16: the bag book is empty'); return; }
  const BAG_FIELDS = ['id', 'b', 'free'];
  const ids = new Set();
  let freeCount = 0;
  for (const r of BAGS) {
    for (const f of Object.keys(r)) if (BAG_FIELDS.indexOf(f) === -1) err('D16: bag ' + r.id + ' carries an extra field "' + f + '" — no derived answer may ride in a public file');
    if (!/^b-\d{3}$/.test(r.id)) err('D16: bad id shape "' + r.id + '"');
    if (ids.has(r.id)) err('D16: duplicate id ' + r.id);
    ids.add(r.id);
    const b = mk(r.b);
    for (const k of Object.keys(r.b)) if (O_KINDS.indexOf(k) === -1) err('D16: bag ' + r.id + ' has an unknown kind "' + k + '"');
    const t = oTotal(b);
    if (t < 6 || t > O_MAX_TOTAL) err('D16: bag ' + r.id + ' holds ' + t + ' pieces, outside 6..' + O_MAX_TOTAL);
    for (const k of O_KINDS) if (b[k] < 0 || b[k] > O_MAX_EACH) err('D16: bag ' + r.id + ' has ' + b[k] + ' of "' + k + '"');
    if (r.free) freeCount++;
  }
  if (freeCount !== BOOK.freeMax) err('D16: freeMax says ' + BOOK.freeMax + ' but ' + freeCount + ' bags are free');
  if (freeCount < 1) err('D16: no free bag — the first affordance would be gated');
  if (BOOK.premiumMax !== BAGS.length) err('D16: premiumMax does not match the library size');

  /* ⚠ THE FALLBACK MUST CARRY THE FREE BAGS INLINE AND BE IDENTICAL TO
     THEM. arrow-strip shipped an EMPTY fallback, which turned a control
     into a dead one for a subscriber the moment the file 404'd: a 404
     must degrade to the FREE TIER, not to nothing. */
  const fb = T.FALLBACK_BAGS;
  if (!fb || !fb.bags || !fb.bags.length) { err('D16: the offline fallback is empty'); return; }
  if (fb.bags.some((b) => !b.free)) err('D16: the offline fallback carries a paid bag');
  const freeIds = BAGS.filter((b) => b.free).map((b) => b.id).join(',');
  if (fb.bags.map((b) => b.id).join(',') !== freeIds) err('D16: the fallback ids do not match the free bags\n         book: ' + freeIds + '\n         fallback: ' + fb.bags.map((b) => b.id).join(','));
  for (const f of fb.bags) {
    const real = BAGS.filter((b) => b.id === f.id)[0];
    if (!real) continue;
    if (JSON.stringify(mk(f.b)) !== JSON.stringify(mk(real.b))) err('D16: fallback bag ' + f.id + ' does not match the book');
  }

  /* the skins */
  const SKIN_FIELDS = ['id', 'free', 'name', 'items'];
  const ITEM_FIELDS = ['dir', 'file', 'name'];
  for (const sk of (BOOK.skins || [])) {
    for (const f of Object.keys(sk)) if (SKIN_FIELDS.indexOf(f) === -1) err('D16: skin ' + sk.id + ' carries an extra field "' + f + '"');
    for (const loc of LOCALES) if (!sk.name || !sk.name[loc]) err('D16: skin ' + sk.id + ' has no name for ' + loc);
    const keys = Object.keys(sk.items || {}).sort().join(',');
    if (keys !== O_KINDS.slice().sort().join(',')) err('D16: skin ' + sk.id + ' does not cover exactly the six kinds');
    for (const k of O_KINDS) {
      const it = (sk.items || {})[k];
      if (!it) continue;
      for (const f of Object.keys(it)) if (ITEM_FIELDS.indexOf(f) === -1) err('D16: skin ' + sk.id + '.' + k + ' carries an extra field "' + f + '"');
      for (const loc of LOCALES) if (!it.name || !it.name[loc]) err('D16: skin ' + sk.id + '.' + k + ' has no ' + loc + ' noun');
    }
  }
  /* ⚠ LOCKED ENTRIES ARE ABSENT FROM THE ARRAY, NEVER MERELY HIDDEN.
     A filter that returns everything and leaves the hiding to the render
     puts the paid library in the DOM of a free page. */
  const probe = Object.create(T);
  probe.data = BOOK;
  probe.premium = false;
  const freeOnly = probe.bagsFor();
  if (freeOnly.length !== freeCount) err('D16: a free account can reach ' + freeOnly.length + ' bags, not ' + freeCount);
  if (freeOnly.some((b) => !b.free)) err('D16: a paid bag is reachable without the plan');
  probe.premium = true;
  if (probe.bagsFor().length !== BAGS.length) err('D16: a paid account cannot reach the whole library');
  probe.premium = false;
  if (probe.skinsFor().some((s) => !s.free)) err('D16: a paid skin is reachable without the plan');

  console.log('D16 the bag book: ' + BAGS.length + ' bags (' + freeCount + ' free, and exactly ' + freeOnly.length + ' reachable free), ' + (BOOK.skins || []).length + ' skins, fallback identical to the free set');
})();

/* =====================================================================
   D17 ⭐ LABELS ARE TRUE
   ⚠ The generic liveness gate structurally CANNOT know this: setting a
   flag and re-rendering IS a DOM change, and that is how number-sieve's
   "New cards" chip — which armed a mode and dealt nothing — passed every
   gate and reached the operator.
   ===================================================================== */
(function D17() {
  /* ⚠ PROXIMITY IS A PROXY, AND IT BROKE HONESTLY. The bag's handler
     moved into `_wire`, so the 700-character window between the label and
     the call stopped reaching it and this gate reported a control dead
     that is wired perfectly well. The proxy is kept for the chips, whose
     handler really does sit beside their label, and the bag — the one
     control that is wired at a distance — gets an explicit CHAIN check
     below instead. Fixing WHAT is measured, never the threshold. */
  const PAIRS = [
    ['openBtn', 'openBag('],
    ['againBtn', 'secondRun('],
    ['fillBtn', 'openDraft('],
    ['sealBtn', 'sealDraft('],
    ['cancelBtn', 'cancelDraft('],
    ['anotherBtn', '_stepBag(']
  ];
  /* ⚠ CHECK EVERY OCCURRENCE, NOT THE FIRST. `fillBtn` names both the
     control and the builder's aria-label, and anchoring on indexOf
     found the aria-label — reporting a control dead that is wired
     perfectly well twenty lines further down. At least one occurrence
     must be followed by the call it promises. */
  const bodyOf = (name) => {
    const at = RENDER.indexOf(name + ': function');
    if (at < 0) return '';
    const rest = RENDER.slice(at + 1);
    const end = rest.search(/\n  [_a-zA-Z]+: function/);
    return end > 0 ? rest.slice(0, end) : rest;
  };
  for (const [key, call] of PAIRS) {
    const needle = "api.t('" + key + "')";
    let at = RENDER.indexOf(needle), found = false, seen = 0;
    while (at >= 0) {
      seen++;
      if (RENDER.slice(at, at + 700).indexOf(call) >= 0) { found = true; break; }
      at = RENDER.indexOf(needle, at + 1);
    }
    if (!seen) { err('D17: the control labelled ' + key + ' was not found'); continue; }
    if (!found) err('D17: no site labelled ' + key + ' calls ' + call + ' (' + seen + ' site(s) checked)');
  }
  /* and "another bag" must really land on a different bag — the recorded
     defect where a library step chose an entry that rendered identically */
  const inst = Object.create(T);
  inst.api = { lang: 'en', t: (k) => k, announce: () => {}, el: () => ({ setAttribute() {}, appendChild() {}, addEventListener() {}, classList: { add() {} }, style: {} }) };
  inst.data = BOOK;
  inst.premium = true;
  inst._bagIdx = 0;
  inst.st = T.loadBag(T.newState(), BAGS[0]);
  inst.render = function () {};
  const first = JSON.stringify(inst.st.bag);
  inst._stepBag();
  if (JSON.stringify(inst.st.bag) === first) err('D17: "another bag" stepped to a bag that renders identically');
  let distinct = new Set([first]);
  for (let i = 0; i < 12; i++) { inst._stepBag(); distinct.add(JSON.stringify(inst.st.bag)); }
  if (distinct.size < 10) err('D17: repeated presses of "another bag" walk a short orbit (' + distinct.size + ' of 13)');

  /* ⚠ THE SKIP MUST BE EXERCISED, NOT ASSUMED. On the real library the
     next entry always differs anyway, so a step that does NOT skip
     identical bags passes unnoticed — the control would read as dead
     exactly where it matters. Build the situation on purpose: put the
     current bag next in line and require the step to walk past it.
     (This is the arrow-strip Mat Book defect and the number-sieve
     library defect, which are the same defect twice.) */
  const dupA = { c: 5, s: 4, t: 0, d: 0, h: 0, x: 0 };
  const dupB = { c: 2, s: 2, t: 2, d: 2, h: 0, x: 0 };
  const inst2 = Object.create(T);
  inst2.api = inst.api;
  inst2.data = { bags: [
    { id: 'b-001', b: dupA, free: true },
    { id: 'b-002', b: dupA, free: true },   /* identical to the one on screen */
    { id: 'b-003', b: dupB, free: true }
  ] };
  inst2.premium = true;
  inst2._bagIdx = 0;
  inst2.st = T.loadBag(T.newState(), { b: dupA });
  inst2.render = function () {};
  inst2._stepBag();
  if (JSON.stringify(inst2.st.bag) !== JSON.stringify(mk(dupB))) {
    err('D17: "another bag" landed on a bag that renders identically to the one already on screen');
  }
  /* ⭐ THE BAG'S CHAIN, LINK BY LINK. The element carrying `drawAria`
     must be the element the draw handler is bound to, and that handler
     must reach `draw(`. Every link is asserted separately, so a broken
     one names itself instead of collapsing into "not found". */
  const main = bodyOf('_buildMain');
  const wire = bodyOf('_wire');
  const tap = bodyOf('_tapBag');
  if (main.indexOf("api.t('drawAria')") < 0) err('D17 chain: the bag does not carry the drawAria label');
  if (!/this\._bagBtn\s*=\s*bagBtn/.test(main)) err('D17 chain: the labelled bag is never handed to the wiring');
  if (!/this\._bagBtn[\s\S]{0,200}addEventListener\('click'/.test(wire)) err('D17 chain: nothing binds a click to the bag');
  if (wire.indexOf('_tapBag(') < 0) err('D17 chain: the bag click does not reach _tapBag');
  if (!tap) err('D17 chain: _tapBag does not exist');
  else if (tap.indexOf('this.draw(') < 0) err('D17 chain: _tapBag never draws');
  /* poison: each link must be falsifiable */
  if (/this\._bagBtn\s*=\s*bagBtn/.test('var x = 1;')) err('D17 POISON: the chain check passes on unrelated source');
  console.log('D17 labels are true: ' + PAIRS.length + ' noun-labelled controls call what they promise; "another bag" reached ' + distinct.size + ' distinct bags');
})();

/* =====================================================================
   D18 ⭐ MATERIAL IS A SKIN — the pictures cannot change the chance
   ===================================================================== */
(function D18() {
  const skinIds = ['shapes'].concat(((BOOK && BOOK.skins) || []).map((s) => s.id));
  if (skinIds.length < 2) { err('D18: fewer than two skins — the invariant would be vacuous'); return; }
  let base = null;
  for (const id of skinIds) {
    let st = T.loadBag(T.newState(), BAGS[3] || { b: { c: 5, s: 3, t: 2 } });
    st.skin = id;
    st.n = 40;
    st = fillRun(st, 'D18');
    const seq = st.runs[0].draws.join('');
    if (base === null) base = seq;
    else if (seq !== base) { err('D18: the drawn sequence changed with the skin ("' + id + '") — the pictures are altering the chance'); return; }
  }
  /* and setSkin must touch nothing else */
  let a = T.loadBag(T.newState(), BAGS[3] || { b: { c: 5, s: 3 } });
  a.n = 20;
  a = armed(a, 'D18');
  a = T.draw(a);
  const before = JSON.stringify({ bag: a.bag, runs: a.runs, guess: a.guess, n: a.n });
  const b = T.setSkin(a, (SKINS[0] && SKINS[0].id) || 'fruits', SKINS);
  if (!b) { err('D18: setSkin refused a real skin'); return; }
  if (JSON.stringify({ bag: b.bag, runs: b.runs, guess: b.guess, n: b.n }) !== before) err('D18: setSkin changed something other than the skin');
  console.log('D18 material is a skin: ' + skinIds.length + ' skins, one identical 40-draw sequence, and setSkin touches nothing else');
})();

/* =====================================================================
   D19 · PURITY AND STATE SHAPE
   ===================================================================== */
(function D19() {
  const SHAPE = ['bag', 'draft', 'guess', 'committed', 'n', 'runs', 'opened', 'skin'].sort().join(',');
  const st0 = T.newState();
  if (Object.keys(st0).sort().join(',') !== SHAPE) err('D19: the state shape is ' + Object.keys(st0).sort().join(',') + ', expected ' + SHAPE);

  /* reducers must not mutate their input */
  const probes = [
    ['openDraft', (s) => T.openDraft(s)],
    ['placeGuess', (s) => T.placeGuess(s, 'c', 1)],
    ['cancelDraft', (s) => T.cancelDraft(T.openDraft(s))],
    ['setLen', (s) => T.setLen(s, 10)],
    ['setSkin', (s) => T.setSkin(s, 'fruits', SKINS)],
    ['loadBag', (s) => T.loadBag(s, BAGS[0])],
    ['draw', (s) => { const l = armed(T.loadBag(s, BAGS[0]), 'D19'); return T.draw(l); }],
    ['openBag', (s) => T.openBag(T.loadBag(s, BAGS[0]))]
  ];
  for (const [name, fn] of probes) {
    const s = T.loadBag(T.newState(), BAGS[0]);
    const snap = JSON.stringify(s);
    fn(s);
    if (JSON.stringify(s) !== snap) err('D19: ' + name + ' mutated its input');
  }
  /* hostile input must be refused or clamped, never crash */
  const hostile = [null, undefined, 0, '', [], { bag: 'nope' }];
  for (const h of hostile) {
    try { T.total(h); T.at(h, 0); T._copyCounts(h); } catch (e) { err('D19: hostile input crashed the model (' + String(h) + '): ' + e.message); }
  }
  if (T.setDraft(T.newState(), 'c', 1) !== null) err('D19: setDraft worked with no draft open');
  if (T.setDraft(T.openDraft(T.newState()), 'zz', 1) !== null) err('D19: setDraft accepted an unknown kind');
  if (T.setDraft(T.openDraft(T.newState()), 'c', 5) !== null) err('D19: setDraft accepted a step other than +-1');
  if (T.sealDraft(T.openDraft(T.newState())) !== null) err('D19: an empty bag was sealed');
  if (T.setLen(T.newState(), 33) !== null) err('D19: setLen accepted a length not in LENS');
  /* ⚠ REFUSE, DO NOT DESTROY. Changing the record length once drawing has
     started must return null and leave the record standing — the
     recorded number-sieve defect where changing the field wiped the deck
     and left a teacher looking at a full screen with nothing to do. */
  let mid = T.loadBag(T.newState(), BAGS[0]);
  mid.n = 20;
  mid = armed(mid, 'D19');
  mid = T.draw(mid);
  mid = T.draw(mid);
  const drawnBefore = mid.runs[0].draws.join('');
  if (T.setLen(mid, 10) !== null) err('D19: setLen changed the record length mid-run instead of refusing');
  if (mid.runs[0].draws.join('') !== drawnBefore) err('D19: a refused setLen still damaged the record');

  /* ⚠ A REDUCER MUST HAND BACK ITS OWN BAG OBJECT, NOT THE INPUT'S.
     Sharing the reference is invisible today because nothing writes to
     the bag — and it is exactly the aliasing that would make a future
     without-replacement bug unfindable. */
  const src = armed(T.loadBag(T.newState(), BAGS[0]), 'D19');
  const alias = [['draw', T.draw(src)], ['openDraft', T.openDraft(src)], ['placeGuess', T.placeGuess(src, 'c', 1)]];
  for (const [name, out] of alias) {
    if (out && out.bag === src.bag) err('D19: ' + name + ' shares its input\'s bag object rather than copying it');
    if (out && out.guess === src.guess) err('D19: ' + name + ' shares its input\'s guess object rather than copying it');
  }
  console.log('D19 purity: state shape frozen, ' + probes.length + ' reducers leave their input untouched, hostile input refused');
})();

/* =====================================================================
   D20 ⭐⭐ THE BUILDER IS BLIND
   Build #3's `openDraft` did `s.draft = this._copyCounts(s.bag)` and
   `_buildFill` painted every piece of it — so one free, always-live chip
   labelled "Fill the bag" rendered the sealed composition across the
   stage at any moment, including after the prior was committed. Measured
   on the shipped tool: the painted counts were [10,7,0,0,0,0], byte-
   identical to `st.bag`. D9 proved the REVEAL was unreachable and said
   nothing at all about the BUILDER, which is why this group exists.
   ===================================================================== */
(function D20() {
  for (const rec of BAGS.slice(0, 40)) {
    const sealed = T.loadBag(T.newState(), rec);
    if (!sealed) { err('D20: loadBag refused ' + rec.id); return; }
    const d = T.openDraft(sealed);
    if (!d || !d.draft) { err('D20: openDraft did not open a draft'); return; }
    if (oTotal(d.draft) !== 0) {
      err('D20: the builder opened holding ' + oTotal(d.draft) + ' pieces — it is seeded from the sealed bag');
      return;
    }
    /* and the sealed bag must be untouched by opening the builder */
    if (JSON.stringify(mk(d.bag)) !== JSON.stringify(mk(sealed.bag))) { err('D20: openDraft altered the bag'); return; }
  }
  /* ⚠ POISON, BOTH DIRECTIONS. A draft that can never hold anything
     would pass the check above for the boring reason. */
  let d = T.openDraft(T.loadBag(T.newState(), BAGS[0]));
  d = T.setDraft(d, 't', 1);
  if (!d || d.draft.t !== 1) { err('D20 POISON: the draft cannot be filled at all'); return; }

  /* the way OUT must destroy nothing. Build #3 had exactly one exit and
     it wiped the guess, both records and the lid, so one curious tap
     mid-lesson cost the whole lesson with no way back. */
  let live = armed(T.loadBag(T.newState(), BAGS[0]), 'D20');
  live.n = 10;
  live = fillRun(live, 'D20');
  const keep = JSON.stringify({ runs: live.runs, guess: live.guess, committed: live.committed, bag: live.bag });
  const back = T.cancelDraft(T.openDraft(live));
  if (!back) { err('D20: there is no way out of the builder that keeps the lesson'); return; }
  if (JSON.stringify({ runs: back.runs, guess: back.guess, committed: back.committed, bag: back.bag }) !== keep) {
    err('D20: cancelling the builder damaged the lesson');
  }
  if (T.cancelDraft(live) !== null) err('D20: cancelDraft worked with no draft open');
  console.log('D20 the builder is blind: the draft opens EMPTY over ' + Math.min(40, BAGS.length) + ' bags, and backing out destroys nothing');
})();

/* =====================================================================
   D21 ⭐⭐ THE PREMISE IS FREE
   The whole thesis of this instrument is "run the SAME bag again". In
   build #3 that was premium: at the end of run one the measured DOM held
   two record rows, the second with zero cells and unfillable, the bag
   `disabled` at opacity .5, and `hintAgain` gated on `premium` so a free
   teacher was told to open the bag instead. That is exactly what the
   operator reported as "the objects could not be placed on the second
   line at all". The plan sells DEPTH, never the premise.
   ===================================================================== */
(function D21() {
  /* the model must not know what an entitlement is */
  if (/\bpremium\b/.test(MODEL.slice(MODEL.indexOf('newState:')))) {
    err('D21: the model reasons about entitlement');
  }
  /* run two must be reachable from an ordinary state, with no argument,
     flag or option that could carry a tier */
  if (T.secondRun.length !== 1) err('D21: secondRun takes ' + T.secondRun.length + ' arguments; it must take only the state');
  let s = armed(T.loadBag(T.newState(), BAGS[0]), 'D21');
  s.n = 10;
  s = fillRun(s, 'D21');
  const two = T.secondRun(s);
  if (!two) { err('D21: run two was refused after a full first run'); return; }
  if (two.runs.length !== 2) { err('D21: secondRun did not add a record'); return; }
  const filled = fillRun(two, 'D21');
  if (filled.runs[1].draws.length !== filled.n) { err('D21: the second record could not be filled'); return; }

  /* ⚠ AND THE RENDER PATH MUST NOT GATE IT EITHER. The one place this
     could regress is a `premium` test wrapped around the againBtn
     handler, which is exactly the shape build #3 shipped. */
  const foot = RENDER.slice(RENDER.indexOf('_buildFoot: function'));
  const at = foot.indexOf("api.t('againBtn')");
  if (at < 0) { err('D21: the run-again control was not found'); return; }
  const scope = foot.slice(at, at + 900);
  if (/premium/.test(scope) || /drb-locked/.test(scope) || /_raiseGate\(/.test(scope)) {
    err('D21: the run-again control is gated on entitlement — the premise is behind the paywall');
  }
  /* poison: the gate must still be able to SEE a paywall where one
     legitimately is, or this assertion proves nothing */
  const pat = foot.indexOf("api.t('printBtn')");
  if (pat < 0 || !/premium/.test(foot.slice(pat, pat + 900))) {
    err('D21 POISON: the entitlement check cannot detect a gated control');
  }
  console.log('D21 the premise is free: run two is reachable with no tier, in the model and in the render path (poison-tested)');
})();

/* =====================================================================
   D22 ⭐ THE BAG'S TAG LEAKS NOTHING
   The bag is opaque, so "Another bag" changed nothing anybody could see.
   The tag fixes that — and a mark on an opaque bag is the exact place a
   hint about its contents would hide. The mark is a pure function of the
   ORDINAL POSITION in the book, which the book's own note already
   establishes as the safe channel ("the ids are a plain sequence that
   encodes nothing").
   ===================================================================== */
(function D22() {
  if (typeof T._tagNode !== 'function') { err('D22: there is no tag'); return; }
  if (T._tagNode.length !== 1) err('D22: _tagNode takes ' + T._tagNode.length + ' arguments; it must take only the index');
  /* the source of the tag must not mention the bag at all */
  /* ⚠ STRIP THE COMMENTS FIRST. `Function.prototype.toString()` returns
     the comments too, and this ban condemned _tagNode's OWN sentence,
     "a 120-bag library keeps differentiating" — the ban-too-wide trap for
     the fourth time in this build, every time on prose that was correct.
     A ban on what the CODE reads must read only the code. */
  const src = T._tagNode.toString().replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  const READS = /\bbag\b|this\.st\b|composition|\bKINDS\b/;
  if (READS.test(src)) err('D22: _tagNode reads something other than its index ("' + src.match(READS)[0] + '")');
  /* poison, BOTH ways: it must fire on a real read and pass a legitimate one */
  if (!READS.test('var q = this.st.bag;')) err('D22 POISON: the read-ban cannot fire');
  if (READS.test('var n = idx % this.PIPS.length;')) err('D22 POISON: the read-ban condemns a legitimate index expression');
  /* PIPS is a fixed table, so two libraries with different contents at
     the same index give the same mark by construction — assert it */
  if (!Array.isArray(T.PIPS) || T.PIPS.length < 2) { err('D22: the pip table is missing'); return; }
  for (let i = 0; i < T.PIPS.length; i++) {
    if (!Array.isArray(T.PIPS[i]) || T.PIPS[i].length !== i + 1) {
      err('D22: pip row ' + i + ' shows ' + (T.PIPS[i] || []).length + ' pips, not ' + (i + 1));
    }
  }
  /* and every pip sits inside the card it is drawn on (73..93, 35..59) */
  for (const row of T.PIPS) {
    for (const p of row) {
      const x = 73 + p[0] * 0.20, y = 35 + p[1] * 0.24;
      if (x < 74.5 || x > 91.5 || y < 36.5 || y > 57.5) err('D22: a pip at ' + x.toFixed(1) + ',' + y.toFixed(1) + ' falls off the tag');
    }
  }
  /* ⚠ THE SIZE MUST NEVER VARY WITH THE BAG. Size reads as fullness. */
  const bagSrc = String(T._bagNode);
  if (/total\s*\(|\.bag\b|composition/.test(bagSrc)) err('D22: the bag drawing reads its own contents');
  console.log('D22 the tag: ' + T.PIPS.length + ' marks, a pure function of the index, all pips on the card, and the drawing never reads the bag');
})();

/* =====================================================================
   D23 ⭐⭐ THE BAG CANNOT BE SWAPPED MID-RUN
   The entire argument of run two is that nothing changed in between. In
   build #3 the two controls that swap the contents — "Fill the bag" and
   "Another bag" — sat live on screen at exactly that moment, so a
   seven-year-old's objection ("you changed it") was not merely
   available, it was DISPLAYED.
   ===================================================================== */
(function D23() {
  const s = RENDER.indexOf('_buildFoot: function');
  const rest = RENDER.slice(s + 1);
  const e = rest.search(/\n  [_a-zA-Z]+: function/);
  const foot = e > 0 ? rest.slice(0, e) : rest;
  if (!foot) { err('D23: _buildFoot not found'); return; }

  const guard = foot.indexOf('if (setupOpen)');
  if (guard < 0) { err('D23: there is no guard around the bag-changing controls'); return; }
  const decl = foot.match(/var setupOpen = ([^;]+);/);
  if (!decl) { err('D23: setupOpen is not declared'); return; }
  /* it must be true ONLY before the first draw or after the reveal */
  if (!/!s\.runs\.length/.test(decl[1]) || !/s\.opened/.test(decl[1])) {
    err('D23: the guard is not "no run yet, or already opened" — it is "' + decl[1].trim() + '"');
  }
  /* the scoping is a FUNCTION so it can be poisoned on synthetic input.
     Poisoning it by mangling the real source only proved a mangled string
     still parses — the first version did exactly that and passed for the
     wrong reason. */
  const scopeOf = (text) => {
    const g = text.indexOf('if (setupOpen)');
    if (g < 0) return null;
    const c = text.indexOf('\n    }', g);
    return text.slice(g, c > 0 ? c : text.length);
  };
  const countIn = (text, key) => (text.match(new RegExp("api\\.t\\('" + key + "'\\)", 'g')) || []).length;
  const scoped = scopeOf(foot);
  if (scoped === null) { err('D23: the guard could not be scoped'); return; }
  for (const key of ['fillBtn', 'anotherBtn']) {
    const all = countIn(foot, key);
    const inside = countIn(scoped, key);
    if (all === 0) { err('D23: the control ' + key + ' is gone from the foot entirely'); continue; }
    if (inside !== all) err('D23: ' + key + ' appears ' + all + ' time(s) in the foot but only ' + inside + ' inside the guard');
  }
  /* ⭐ POISON, BOTH DIRECTIONS, on inputs built for the purpose */
  const GOOD = "if (setupOpen) {\n      x(api.t('anotherBtn'));\n    }\n    y();";
  const BAD  = "if (setupOpen) {\n      z();\n    }\n    x(api.t('anotherBtn'));";
  if (countIn(scopeOf(GOOD), 'anotherBtn') !== 1) err('D23 POISON: a control inside the guard is not counted as inside');
  if (countIn(scopeOf(BAD), 'anotherBtn') !== 0) err('D23 POISON: a control OUTSIDE the guard is still counted as inside it');
  console.log('D23 the bag cannot be swapped mid-run: both bag-changing controls live inside "' + decl[1].trim() + '" (poison-tested)');
})();

/* =====================================================================
   D24 ⭐ THE LIBRARY IS A TEACHING LADDER
   ⚠ MEASURED FIRST, GATED SECOND. The three laws below are the ones the
   library ACTUALLY satisfies when its own seeded runs are computed —
   not a percentage anyone liked the look of. Measured over the free
   eight at n=20: the single-kind bag differs in 0 of 20 cells, and the
   rest differ in 7..16.
   The single-kind bag is the CONTROL CONDITION the thesis needs: without
   it "two rows differ" is just noise, and with it the class learns that
   what decides sameness is what is in the bag. Build #3 seated a 10:7
   two-kind bag first and buried its best demonstration at position four.
   ===================================================================== */
(function D24() {
  const free = BAGS.filter((r) => r.free);
  if (!free.length) { err('D24: no free bags'); return; }
  const runOf = (b, k, n) => { const sd = oSeed(b, k), out = []; for (let i = 0; i < n; i++) out.push(oPick(b, sd, i)); return out; };

  /* LAW 1 — the FIRST free bag, the one the tool seats on a cold load,
     is single-kind. */
  const first = mk(free[0].b);
  const firstKinds = O_KINDS.filter((k) => first[k] > 0);
  if (firstKinds.length !== 1) {
    err('D24: the opening bag (' + free[0].id + ') holds ' + firstKinds.length + ' kinds; the control condition needs exactly one');
  }

  let single = 0, differing = 0;
  for (const rec of free) {
    const b = mk(rec.b);
    const kinds = O_KINDS.filter((k) => b[k] > 0);
    const a = runOf(b, 1, 20), c = runOf(b, 2, 20);
    const diff = a.filter((v, i) => v !== c[i]).length;
    if (kinds.length === 1) {
      /* LAW 2 — one kind in, one kind out, both runs identical. This is
         the only bag in the book whose two records MUST match. */
      single++;
      if (diff !== 0) err('D24: single-kind bag ' + rec.id + ' produced two different records (' + diff + '/20)');
      if (a.some((v) => v !== kinds[0])) err('D24: single-kind bag ' + rec.id + ' drew something that is not in it');
    } else {
      /* LAW 3 — every other bag MUST produce two different records, or
         "Run it again" reads as broken on that bag. */
      differing++;
      if (diff === 0) err('D24: bag ' + rec.id + ' produced two IDENTICAL records — run two would look broken');
      /* LAW 4 — a dominant bag (top kind at least twice the runner-up)
         must agree on its modal kind across both runs, or the apparatus
         teaches that everything is equally likely. */
      const sorted = kinds.map((k) => b[k]).sort((x, y) => y - x);
      if (sorted[0] >= 2 * sorted[1]) {
        const mode = (arr) => { const t = {}; for (const v of arr) t[v] = (t[v] || 0) + 1; const o = Object.keys(t).sort((p, q) => t[q] - t[p]); return { k: o[0], tie: o.length > 1 && t[o[0]] === t[o[1]] }; };
        const ma = mode(a), mc = mode(c);
        if (ma.tie || mc.tie) err('D24: dominant bag ' + rec.id + ' produced a tie at the top');
        else if (ma.k !== mc.k) err('D24: dominant bag ' + rec.id + ' changed its most-drawn kind between runs (' + ma.k + ' then ' + mc.k + ')');
      }
    }
  }
  if (single < 1) err('D24: no single-kind bag is free — the control condition is unreachable');
  console.log('D24 the library is a ladder: ' + free.length + ' free bags, ' + single + ' single-kind control, ' + differing + ' that provably differ across two runs');
})();

/* =====================================================================
   D25 ⭐⭐ THE MATERIAL IS LEGIBLE — MEASURED, NOT ASSERTED
   Build #3's palette had a worst-case colour-blind separation of dE00
   0.7: the purple diamond and the slate star were ONE OBJECT under
   deuteranopia, in a room where roughly one boy in twelve sees that way.
   Its bag drew its open/closed signal at 1.44:1, its empty record cell
   at 1.26:1, and the SELECTED length chip at 1.50:1. None of that is a
   matter of taste and none of it was in a gate, so all of it shipped.
   ⚠ THE THRESHOLDS ARE NOT INVENTED. Contrast uses WCAG's own floors
   (4.5:1 text, 3:1 non-text). The colour-separation floor is the one the
   platform has already ruled on: sorting-hoops.js:281 REJECTED a ring
   colour at dE00 6.7 and shipped one at 13.7, so 6.7 is a measured
   rejection and the floor sits above it.
   ===================================================================== */
(function D25() {
  const CSS = SRC.slice(SRC.indexOf('function injectDrawBagCSS'));
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
  const lum = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };

  /* the pairs this tool actually renders, each with the floor its USE
     demands. A pair is only listed if both colours are in the stylesheet
     — asserted below, so a rename cannot silently empty this table. */
  const CREAM = '#FBF3E4';
  const PAIRS = [
    ['#FFFFFF', '#C2562F', 4.5, 'the primary action chip'],
    ['#A8451F', CREAM, 4.5, 'the paid-plan explanation'],
    ['#0E5147', CREAM, 4.5, 'the doctrine line'],
    ['#3C4A43', CREAM, 4.5, 'the hint line'],
    ['#0E5147', '#FBF3E4', 3.0, 'the focus ring'],
    ['#3C7C72', '#F6EEDD', 3.0, 'a laid chip on the rail'],
    ['#4E8B7C', CREAM, 3.0, 'the rail edge'],
    ['#146B5E', '#F6EEDD', 3.0, 'the bag wall of the claim zone'],
    ['#55917F', CREAM, 3.0, 'the empty-slot marker'],
    ['#F1E7D2', '#146B5E', 3.0, 'the drawstring and the open mouth']
  ];
  /* ⚠⚠ BOTH SIDES MUST BE IN THE STYLESHEET, OR THIS IS A TABLE OF
     CONSTANTS AGREEING WITH ITSELF. A mutation that changed the action
     chip's background to build #3's 2.78:1 orange SURVIVED the first run
     of this gate: only the first colour of each pair was checked for
     presence, so the measurement went on happily reporting the value the
     table wished were there. The non-vacuity rule, applied to a colour
     table instead of a NodeList. */
  let worstText = Infinity;
  for (const [a, b, floor, what] of PAIRS) {
    for (const side of [a, b]) {
      if (CSS.indexOf(side) < 0 && CSS.indexOf(side.toLowerCase()) < 0) {
        err('D25: ' + side + ' (' + what + ') is not in the stylesheet — this pair is measuring a colour the tool does not use');
      }
    }
    const r = ratio(a, b);
    if (floor >= 4.5) worstText = Math.min(worstText, r);
    if (r < floor) err('D25: ' + what + ' measures ' + r.toFixed(2) + ':1 against a floor of ' + floor + ':1');
  }
  /* and the two rules whose colour is the whole point are read back OFF
     the stylesheet rather than trusted to the table above */
  const declared = (rule, prop) => {
    const m = CSS.match(new RegExp(rule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\{[^']*?" + prop + ':(#[0-9A-Fa-f]{6})'));
    return m ? m[1] : null;
  };
  const goBg = declared('.drb-chip.drb-go', 'background-color');
  if (!goBg) err('D25: the primary action chip declares no background colour');
  else if (ratio('#FFFFFF', goBg) < 4.5) err('D25: the primary action chip is ' + goBg + ' — ' + ratio('#FFFFFF', goBg).toFixed(2) + ':1 against white');
  const gateFg = declared('.drb-gate', 'color');
  if (!gateFg) err('D25: the paid-plan explanation declares no colour');
  else if (ratio(gateFg, CREAM) < 4.5) err('D25: the paid-plan explanation is ' + gateFg + ' — ' + ratio(gateFg, CREAM).toFixed(2) + ':1 on cream');
  /* ⚠ POISON: the measurement must condemn a pair that is genuinely
     illegible, or every number above is decoration. These are build #3's
     own shipped values. */
  if (ratio('#0E5147', '#146B5E') >= 3.0) err('D25 POISON: contrast cannot detect build #3\'s 1.44:1 bag');
  if (ratio('#FFFFFF', '#F2784B') >= 4.5) err('D25 POISON: contrast cannot detect build #3\'s 2.78:1 action chip');

  /* ---- colour separation, including for the ~8% who cannot use hue ---- */
  const M = [[0.31399, 0.63951, 0.04649], [0.15537, 0.75789, 0.08670], [0.01775, 0.10945, 0.87252]];
  const Mi = [[5.47221, -4.64196, 0.16963], [-1.12524, 2.29317, -0.16789], [0.02980, -0.19318, 1.16364]];
  const mul = (m, v) => m.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  const SIM = {
    normal: null,
    protan: [[0, 1.05118294, -0.05116099], [0, 1, 0], [0, 0, 1]],
    deutan: [[1, 0, 0], [0.9513092, 0, 0.04866992], [0, 0, 1]],
    tritan: [[1, 0, 0], [0, 1, 0], [-0.86744736, 1.86727089, 0]]
  };
  /* ⚠ TAKES LINEAR RGB AND RETURNS LINEAR RGB. The first version applied
     `lin` a SECOND time to values that were already linear, which crushed
     every colour to near-black — so all fifteen pairs, AND THE POISON
     ITSELF, reported dE00 0.0. A measurement that says everything is
     identical is broken, not a discovery. */
  const sim = (rgbLin, kind) => {
    if (!SIM[kind]) return rgbLin;
    const out = mul(Mi, mul(SIM[kind], mul(M, rgbLin)));
    return out.map((c) => Math.max(0, Math.min(1, c)));
  };
  const toLab = (rgbLin) => {
    const X = 0.4124 * rgbLin[0] + 0.3576 * rgbLin[1] + 0.1805 * rgbLin[2];
    const Y = 0.2126 * rgbLin[0] + 0.7152 * rgbLin[1] + 0.0722 * rgbLin[2];
    const Z = 0.0193 * rgbLin[0] + 0.1192 * rgbLin[1] + 0.9505 * rgbLin[2];
    const f = (t) => t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 116);
    const fx = f(X / 0.95047), fy = f(Y), fz = f(Z / 1.08883);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  };
  /* CIEDE2000 */
  const de00 = (L1, L2) => {
    const [l1, a1, b1] = L1, [l2, a2, b2] = L2;
    const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
    const G = 0.5 * (1 - Math.sqrt(Math.pow(Cb, 7) / (Math.pow(Cb, 7) + Math.pow(25, 7))));
    const ap1 = (1 + G) * a1, ap2 = (1 + G) * a2;
    const Cp1 = Math.hypot(ap1, b1), Cp2 = Math.hypot(ap2, b2);
    const hp = (a, b) => { if (a === 0 && b === 0) return 0; let h = Math.atan2(b, a) * 180 / Math.PI; return h < 0 ? h + 360 : h; };
    const hp1 = hp(ap1, b1), hp2 = hp(ap2, b2);
    const dL = l2 - l1, dC = Cp2 - Cp1;
    let dh = 0;
    if (Cp1 * Cp2 !== 0) { dh = hp2 - hp1; if (dh > 180) dh -= 360; else if (dh < -180) dh += 360; }
    const dH = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin(dh * Math.PI / 360);
    const Lb = (l1 + l2) / 2, Cpb = (Cp1 + Cp2) / 2;
    let Hb;
    if (Cp1 * Cp2 === 0) Hb = hp1 + hp2;
    else { Hb = (hp1 + hp2) / 2; if (Math.abs(hp1 - hp2) > 180) Hb += (hp1 + hp2 < 360) ? 180 : -180; }
    const Tt = 1 - 0.17 * Math.cos((Hb - 30) * Math.PI / 180) + 0.24 * Math.cos(2 * Hb * Math.PI / 180)
      + 0.32 * Math.cos((3 * Hb + 6) * Math.PI / 180) - 0.20 * Math.cos((4 * Hb - 63) * Math.PI / 180);
    const Sl = 1 + (0.015 * Math.pow(Lb - 50, 2)) / Math.sqrt(20 + Math.pow(Lb - 50, 2));
    const Sc = 1 + 0.045 * Cpb, Sh = 1 + 0.015 * Cpb * Tt;
    const Rt = -2 * Math.sqrt(Math.pow(Cpb, 7) / (Math.pow(Cpb, 7) + Math.pow(25, 7)))
      * Math.sin((60 * Math.exp(-Math.pow((Hb - 275) / 25, 2))) * Math.PI / 180);
    return Math.sqrt(Math.pow(dL / Sl, 2) + Math.pow(dC / Sc, 2) + Math.pow(dH / Sh, 2) + Rt * (dC / Sc) * (dH / Sh));
  };
  /* ⚠ PROVE THE METRIC WORKS BEFORE READING ANYTHING OFF IT. */
  const sepOf = (h1, h2, kind) => de00(toLab(sim(hex(h1).map(lin), kind)), toLab(sim(hex(h2).map(lin), kind)));
  if (sepOf('#000000', '#FFFFFF', 'normal') < 90) err('D25 POISON: the colour metric cannot tell black from white');
  if (sepOf('#146B5E', '#146B5E', 'normal') > 0.001) err('D25 POISON: the metric reports a difference between a colour and itself');
  const sep = (h1, h2) => {
    let worst = Infinity;
    for (const kind of ['normal', 'protan', 'deutan', 'tritan']) {
      const A = toLab(sim(hex(h1).map(lin), kind)), B = toLab(sim(hex(h2).map(lin), kind));
      worst = Math.min(worst, de00(A, B));
    }
    return worst;
  };

  /* read the six piece fills OFF THE STYLESHEET, so a palette edit that
     forgets this gate is impossible */
  const fills = {};
  for (const k of O_KINDS) {
    const m = CSS.match(new RegExp('\\.drb-k-' + k + '\\{fill:(#[0-9A-Fa-f]{6});'));
    if (!m) { err('D25: no fill declared for kind "' + k + '"'); continue; }
    fills[k] = m[1];
  }
  const got = Object.keys(fills);
  if (got.length !== 6) { err('D25: only ' + got.length + ' of 6 piece fills were found — refusing to report a separation floor'); return; }
  const FLOOR = 8.0;   /* above the platform's own measured rejection of 6.7 */
  let worst = Infinity, worstPair = '';
  for (let i = 0; i < got.length; i++) {
    for (let j = i + 1; j < got.length; j++) {
      const d = sep(fills[got[i]], fills[got[j]]);
      if (d < worst) { worst = d; worstPair = got[i] + '/' + got[j]; }
      if (d < FLOOR) err('D25: pieces ' + got[i] + ' and ' + got[j] + ' separate by only dE00 ' + d.toFixed(1) + ' for someone who cannot use hue');
    }
  }
  /* ⚠ POISON: build #3's own purple diamond and slate star. If the
     measurement cannot condemn THOSE, it is measuring nothing. */
  const oldPair = sep('#7B4B7E', '#4A6480');
  if (oldPair >= FLOOR) err('D25 POISON: the colour measurement cannot detect build #3\'s dE00 ' + oldPair.toFixed(1) + ' pair');

  /* every piece must also carry a rim, because two of the fills sit
     under 3:1 on cream and it is the EDGE that carries the silhouette
     (the sorting-hoops.js:1494 ruling) */
  for (const k of O_KINDS) {
    if (!new RegExp('\\.drb-k-' + k + '\\{fill:#[0-9A-Fa-f]{6};stroke:#[0-9A-Fa-f]{6};').test(CSS)) {
      err('D25: kind "' + k + '" has no rim colour');
    }
  }
  if (!/vector-effect:non-scaling-stroke/.test(CSS)) err('D25: the rim is not non-scaling — it will draw 4px at the widest tier');

  console.log('D25 the material is legible: ' + PAIRS.length + ' contrast pairs at their WCAG floors (worst text ' + worstText.toFixed(2)
    + ':1), and the six pieces separate by at least dE00 ' + worst.toFixed(1) + ' (' + worstPair + ') for every vision type — poison-tested against build #3 (' + oldPair.toFixed(1) + ')');
})();

/* ===================================================================== */
console.log('');
if (ERRORS) { console.error('FAIL — ' + ERRORS + ' error(s), ' + WARNS + ' warning(s)'); process.exit(1); }
console.log('PASS — 0 errors, ' + WARNS + ' warning(s)');
