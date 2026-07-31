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

/* ⚠ BOUNDED, ALWAYS. A mutation that stopped the record filling made an
   unbounded `while (T.canDraw(s))` spin forever, and the harness scored
   it TIMED OUT — which counts as SURVIVED. A gate that hangs reports
   nothing, so no loop in this file is allowed to depend on the tool
   terminating. */
function fillRun(st, where) {
  let s = st, guard = 0;
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
  st = T.placeGuess(st, 'c');
  if (!st) { err('D10: placeGuess refused before any draw — the prior can never be placed'); return; }
  if (JSON.stringify(st.guess) === before) { err('D10: placeGuess did not move the guess'); return; }
  /* three taps cycle back to undecided */
  let cyc = T.placeGuess(T.placeGuess(st, 'c'), 'c');
  if (cyc.guess.c !== 0) { err('D10: three taps did not return the piece to undecided'); return; }
  st = T.placeGuess(st, 's');
  const committedGuess = JSON.stringify(st.guess);
  st.n = 10;
  st = T.draw(st);
  if (!st.committed) { err('D10: the first draw did not commit the prior'); return; }
  for (const k of O_KINDS) {
    if (T.placeGuess(st, k) !== null) { err('D10: the guess moved after the first draw'); return; }
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
  const VERDICT = /\b(score|scoring|correct|incorrect|wrong|right_answer|winner|wins|verdict|rank|ranking|closest|better|worse|accuracy|streak)\b/i;
  if (VERDICT.test(SRC_NC)) {
    const hit = SRC_NC.match(VERDICT);
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
  const ALLOWED = [/^api\.t\('[a-zA-Z]+'\)$/, /^String\(n\)$/, /^''$/];
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
  const PAIRS = [
    ['openBtn', 'openBag('],
    ['againBtn', 'secondRun('],
    ['fillBtn', 'openDraft('],
    ['sealBtn', 'sealDraft('],
    ['anotherBtn', '_stepBag('],
    ['drawAria', 'draw(']
  ];
  /* ⚠ CHECK EVERY OCCURRENCE, NOT THE FIRST. `fillBtn` names both the
     control and the builder's aria-label, and anchoring on indexOf
     found the aria-label — reporting a control dead that is wired
     perfectly well twenty lines further down. At least one occurrence
     must be followed by the call it promises. */
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
  inst.api = { lang: 'en', t: (k) => k, el: () => ({ setAttribute() {}, appendChild() {}, addEventListener() {}, classList: { add() {} }, style: {} }) };
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
  a = T.draw(a);
  const before = JSON.stringify({ bag: a.bag, runs: a.runs, guess: a.guess, n: a.n });
  const b = T.setSkin(a, (BOOK.skins && BOOK.skins[0] && BOOK.skins[0].id) || 'fruits');
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
    ['placeGuess', (s) => T.placeGuess(s, 'c')],
    ['setLen', (s) => T.setLen(s, 10)],
    ['setSkin', (s) => T.setSkin(s, 'fruits')],
    ['loadBag', (s) => T.loadBag(s, BAGS[0])],
    ['draw', (s) => { const l = T.loadBag(s, BAGS[0]); return T.draw(l); }],
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
  mid = T.draw(mid);
  mid = T.draw(mid);
  const drawnBefore = mid.runs[0].draws.join('');
  if (T.setLen(mid, 10) !== null) err('D19: setLen changed the record length mid-run instead of refusing');
  if (mid.runs[0].draws.join('') !== drawnBefore) err('D19: a refused setLen still damaged the record');

  /* ⚠ A REDUCER MUST HAND BACK ITS OWN BAG OBJECT, NOT THE INPUT'S.
     Sharing the reference is invisible today because nothing writes to
     the bag — and it is exactly the aliasing that would make a future
     without-replacement bug unfindable. */
  const src = T.loadBag(T.newState(), BAGS[0]);
  const alias = [['draw', T.draw(src)], ['openDraft', T.openDraft(src)], ['placeGuess', T.placeGuess(src, 'c')]];
  for (const [name, out] of alias) {
    if (out && out.bag === src.bag) err('D19: ' + name + ' shares its input\'s bag object rather than copying it');
    if (out && out.guess === src.guess) err('D19: ' + name + ' shares its input\'s guess object rather than copying it');
  }
  console.log('D19 purity: state shape frozen, ' + probes.length + ' reducers leave their input untouched, hostile input refused');
})();

/* ===================================================================== */
console.log('');
if (ERRORS) { console.error('FAIL — ' + ERRORS + ' error(s), ' + WARNS + ' warning(s)'); process.exit(1); }
console.log('PASS — 0 errors, ' + WARNS + ' warning(s)');
