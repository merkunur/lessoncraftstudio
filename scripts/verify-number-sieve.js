/* =====================================================================
   verify-number-sieve.js — the model gate for TOOL #36, The Number Sieve
   ---------------------------------------------------------------------
   Run:  node scripts/verify-number-sieve.js
   Mutations run it against a copy via NSV_TOOL_DIR (see
   scripts/mutate-number-sieve.js). The real file is never written to.

   ZERO CORPUS. Ground truth here is ARITHMETIC over 1..N, which is the
   whole reason this tool's repertoire can be machine-grown and
   machine-proven where a judgement-validated one (wodb) cannot.

     N1  TOTALITY        every predicate in the whole universe is total
                         over every number in every field
     N2  CORRECTNESS     the sequential fold equals the independent
                         intersection, at every prefix
     N3 ⭐ ORDER          every permutation of a deck lands on identical
                         survivors — invention 2, proven
     N4 ⭐ MINIMALITY     drop any one card and the survivors STRICTLY
                         grow: no card is a no-op, none is redundant
     N5  UNIQUENESS      the full deck leaves exactly one number, and it
                         is the declared target
     N6  MONOTONE        prefix sizes strictly decrease to 1
     N7 ⭐ THE BUILDER    isolates EVERY target in EVERY field, minimally,
                         in <= MAX_CARDS. This is what makes the free
                         builder safe: it can only hand a teacher a board
                         this gate would accept.
     N8  NO LEAK         targetOf() throws until the last card is turned
     N14 PURITY          no DOM / locale / random / Date in the model;
                         state shape frozen; hostile input clamps, never
                         throws
     N15 IDENTITY        no tasks/nextTask, exactly two fetch URLs, no
                         exfiltration path, no child identity

   (N9-N13 and N16 — the no-tell path, the four refusals, the vocabulary
   ban and the geometry floors — are asserted here too and scan source
   text, so they hold from the first render onwards.)
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.NSV_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'number-sieve.js'), 'utf8');
/* comments stripped, so a comment saying "no score here" cannot trip a ban */
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: {
    getElementById: () => null,
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, append() {} }),
    head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } }
  },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = NumberSieve;', sandbox);
const T = sandbox.__T;
if (!T) { console.error('FATAL: the tool did not define NumberSieve'); process.exit(1); }

/* ⭐ THE ORACLE — the gate's OWN implementation of the six families, and
   the reason the mutation harness has anything to bite on. The first cut
   built its corpus with the tool's builder and then checked it with the
   tool's predicates, so every predicate mutation stayed perfectly
   self-consistent and 19 of them survived. A gate that derives its
   expectations from the thing under test is marking its own homework.
   (folding-sheet's M3 closed-form shadowing, transplanted.)
   ⚠ The constants below are the GATE's, hardcoded on purpose: reading
   COARSE or MAX_DOTS off the tool would make a mutation to them
   invisible. */
const ORACLE_STEP = (field) => (field <= 20 ? 5 : 10);
const ORACLE_MAX_DOTS = 20;
const oracle = (c, n) => {
  if (typeof n !== 'number' || !isFinite(n)) return false;
  const v = Math.round(n);
  if (c.f === 'range') return c.op === 'ge' ? v >= c.a : (c.op === 'le' ? v <= c.a : null);
  if (c.f === 'parity') return (((v % 2) + 2) % 2) === (c.r ? 1 : 0);
  if (c.f === 'multiple') { const hit = v % c.m === 0; return c.keep ? hit : !hit; }
  if (c.f === 'digit') {
    const d = c.place === 'tens' ? Math.floor(Math.abs(v) / 10) % 10 : Math.abs(v) % 10;
    return c.keep ? d === c.d : d !== c.d;
  }
  /* ⚠ AN UNKNOWN OP IS A DEFECT, NOT A DEFAULT — and N26 caught this
     one pointing the other way: after the generator's oracle was
     tightened, THIS file was the weaker of the two and would have
     accepted a malformed quantity card the generator refused. */
  if (c.f === 'quantity') return c.op === 'lt' ? v < c.q : (c.op === 'gt' ? v > c.q : null);
  if (c.f === 'nearer') return Math.abs(v - c.a) < Math.abs(v - c.b);
  return null;   /* a family the gate does not know is a defect, not a pass */
};

/* independent intersection — deliberately NOT the tool's own fold */
const intersect = (field, clues) => {
  const out = [];
  for (let n = 1; n <= field; n++) {
    let ok = true;
    for (const c of clues) if (!T.satisfies(c, n)) { ok = false; break; }
    if (ok) out.push(n);
  }
  return out;
};
const perms = (a) => {
  if (a.length <= 1) return [a.slice()];
  const out = [];
  for (let i = 0; i < a.length; i++) {
    const rest = a.slice(0, i).concat(a.slice(i + 1));
    for (const p of perms(rest)) out.push([a[i]].concat(p));
  }
  return out;
};
const stateWith = (field, clues, target) => {
  const s = T.newState();
  s.field = field; s.clues = clues.slice(); s.target = target; s.turned = clues.length;
  return s;
};

console.log('[the predicates]');

/* ---------- N1 TOTALITY ---------- */
(function () {
  let checked = 0;
  for (const field of T.FIELDS) {
    const uni = T.universe(field);
    for (const c of uni) {
      for (let n = 1; n <= field; n++) {
        const v = T.satisfies(c, n);
        if (v !== true && v !== false) {
          err(`N1 satisfies(${JSON.stringify(c)}, ${n}) returned ${String(v)}, not a boolean`);
          return;
        }
        const want = oracle(c, n);
        if (want === null) { err(`N1 the tool emitted a card the gate does not know: ${JSON.stringify(c)}`); return; }
        if (v !== want) {
          err(`N1 ⭐ satisfies(${JSON.stringify(c)}, ${n}) = ${v}, the oracle says ${want}`);
          return;
        }
        checked++;
      }
    }
  }
  console.log(`  N1 ⭐ every card agrees with the gate's own arithmetic — EXHAUSTIVE, ${checked.toLocaleString('en-US')} (card x number) evaluations`);
}());

/* ---------- N1c the universe is well-formed ---------- */
(function () {
  for (const field of T.FIELDS) {
    const step = ORACLE_STEP(field), seen = {};
    for (const c of T.universe(field)) {
      const k = JSON.stringify(c);
      if (seen[k]) { err(`N1c the universe repeats a card: ${k}`); return; }
      seen[k] = 1;
      if (c.f === 'range') {
        if (c.a % step !== 0) { err(`N1c a magnitude bound is off the coarse grid: ${k} (step ${step}) — free bounds are how the "at most 37 / at least 37" pincer got in`); return; }
        if (c.a < step || c.a > field - 1) { err(`N1c a magnitude bound is outside the field: ${k}`); return; }
      }
      if (c.f === 'quantity' && (c.q < 2 || c.q > Math.min(ORACLE_MAX_DOTS, field - 1))) {
        err(`N1c a dot card shows ${c.q} dots — more than a class can subitise off a projector`); return;
      }
      if (c.f === 'nearer' && (c.a % step !== 0 || c.b % step !== 0 || c.b <= c.a)) {
        err(`N1c a nearer card has anchors off the grid or out of order: ${k}`); return;
      }
      if (c.f === 'multiple' && [2, 3, 4, 5, 10].indexOf(c.m) === -1) { err(`N1c an unexpected multiple: ${k}`); return; }
      if (c.f === 'digit' && (c.d < 0 || c.d > 9 || (c.place === 'tens' && field <= 20))) { err(`N1c a bad digit card: ${k}`); return; }
      if (c.f === 'parity' && c.r !== 0 && c.r !== 1) { err(`N1c a bad parity card: ${k}`); return; }
    }
  }
  console.log('  N1c every card in the universe is on the coarse grid and inside the field');
}());

/* ---------- N1b a number that is not a number survives nothing ---------- */
(function () {
  const uni = T.universe(20);
  const junk = [NaN, 'x', undefined, null, Infinity, -Infinity, {}];
  for (const c of uni) {
    for (const j of junk) {
      if (T.satisfies(c, j) !== false) {
        err(`N1b satisfies(${JSON.stringify(c)}, ${String(j)}) is not false — a non-number must survive nothing`);
        return;
      }
    }
  }
  console.log(`  N1b a non-number survives nothing (${uni.length} predicates x ${junk.length} shapes)`);
}());

/* ---------- N14a hostile input clamps, never throws ---------- */
(function () {
  const bad = [null, undefined, NaN, -5, 1e9, 'x', {}, [], Infinity];
  const st = T.newState();
  bad.forEach((b) => {
    try {
      T.satisfies(b, 3); T.satisfies({ f: 'range', op: 'ge', a: b }, b);
      T.allNumbers(b); T.survivorsAfter(st, b); T.park(st, b);
      T.setField(st, b); T.buildFor(b, b); T.loadBoard(st, b); T.setTarget(st, b);
    } catch (e) { err(`N14 hostile input ${String(b)} threw: ${e.message}`); }
  });
  if (!ERRORS) console.log('  N14 hostile input clamps, never throws (9 shapes x 10 entry points)');
}());

console.log('[the deck]');

/* the corpus every deck-level measure runs over: the builder's output for
   every target in every field. It is also N7's evidence. */
const BOARDS = [];
(function () {
  let worstCards = 0;
  for (const field of T.FIELDS) {
    for (let t = 1; t <= field; t++) {
      const clues = T.buildFor(field, t);
      if (!clues) { err(`N7 the builder failed to isolate ${t} in the 1-${field} field`); return; }
      if (clues.length > T.MAX_CARDS) { err(`N7 the builder used ${clues.length} cards for ${t} in 1-${field} (max ${T.MAX_CARDS})`); return; }
      worstCards = Math.max(worstCards, clues.length);
      BOARDS.push({ field, clues, target: t });
    }
  }
  /* ⚠ N7b — LENGTH IS PART OF VALIDITY. A one-card deck is not a routine,
     and the measured distribution is how the greedy-by-strongest-cut
     builder was caught producing 240 two-card decks that were all
     provably valid and none of them worth turning over. */
  const dist = {};
  BOARDS.forEach((b) => { dist[b.clues.length] = (dist[b.clues.length] || 0) + 1; });
  const shortest = Math.min.apply(null, BOARDS.map((b) => b.clues.length));
  const lens = BOARDS.map((b) => b.clues.length).sort((a, b) => a - b);
  const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const median = lens.length ? lens[Math.floor((lens.length - 1) / 2)] : 0;
  if (shortest < 2) err(`N7b a ${shortest}-card deck is not a routine — the builder must narrow, not answer`);
  /* ⚠ THE MEDIAN, NOT THE MEAN, AND FOUR IS NOT A TUNED NUMBER. Dropping
     the no-implication guard leaves the mean at 2.84 — comfortably over
     any mean threshold — while a THIRD of the decks collapse to two
     cards. The mean hid that; the median does not. Four is the length at
     which a deck has a beginning, a middle and an end, which is the whole
     claim that this is a routine rather than an answer. Hardcoded here so
     that moving AIM_CARDS in the tool cannot move the gate. */
  if (median < 4) err(`N7b the median deck is ${median} cards (mean ${mean.toFixed(2)}) — half the class's boards end before the middle`);
  if (!ERRORS) {
    console.log(`  N7 ⭐ the builder isolates EVERY target in EVERY field — EXHAUSTIVE, ${BOARDS.length} boards, worst deck ${worstCards} cards`);
    console.log(`  N7b deck lengths ${JSON.stringify(dist)}, median ${median}, mean ${mean.toFixed(2)} — every one a routine, not an answer`);
  }
}());

/* ---------- N2 CORRECTNESS (fold === intersection, at every prefix) ---------- */
(function () {
  if (ERRORS) return;
  let checked = 0;
  for (const b of BOARDS) {
    const st = stateWith(b.field, b.clues, b.target);
    for (let k = 0; k <= b.clues.length; k++) {
      const fold = T.survivorsAfter(st, k).join(',');
      const want = intersect(b.field, b.clues.slice(0, k)).join(',');
      if (fold !== want) { err(`N2 the fold disagrees with the intersection at prefix ${k} (target ${b.target}, 1-${b.field})`); return; }
      checked++;
    }
  }
  console.log(`  N2 the sequential fold equals the intersection at every prefix (${checked.toLocaleString('en-US')} prefixes)`);
}());

/* ---------- N3 ⭐ ORDER INVARIANCE ---------- */
(function () {
  if (ERRORS) return;
  let checked = 0;
  for (const b of BOARDS) {
    const base = intersect(b.field, b.clues).join(',');
    for (const p of perms(b.clues)) {
      const st = stateWith(b.field, p, b.target);
      if (T.survivorsAfter(st, p.length).join(',') !== base) {
        err(`N3 a permutation changed the survivors (target ${b.target}, 1-${b.field})`);
        return;
      }
      checked++;
    }
  }
  console.log(`  N3 ⭐ order does not matter — EXHAUSTIVE over ${checked.toLocaleString('en-US')} permutations of ${BOARDS.length} decks`);
}());

/* ---------- N3b the shuffle really is a shuffle ---------- */
(function () {
  if (ERRORS) return;
  const key = (c) => JSON.stringify(c);
  for (const b of BOARDS) {
    let st = stateWith(b.field, b.clues, b.target);
    const beforeSet = b.clues.map(key).sort().join('|');
    const beforeLive = intersect(b.field, b.clues).join(',');
    for (let r = 0; r < b.clues.length; r++) {
      st = T.shuffle(st);
      if (st.clues.map(key).sort().join('|') !== beforeSet) { err(`N3b shuffle changed WHICH cards are in the deck (target ${b.target})`); return; }
      if (st.turned !== 0 || st.committed) { err('N3b shuffle did not return the deck to face-down'); return; }
      const s2 = T._clone(st); s2.turned = s2.clues.length;
      if (T.survivorsAfter(s2, s2.clues.length).join(',') !== beforeLive) { err(`N3b shuffle changed the survivors (target ${b.target})`); return; }
    }
  }
  console.log('  N3b the shuffle re-orders the deck and cannot change what it leaves');
}());

/* ---------- N4 ⭐ MINIMALITY ---------- */
(function () {
  if (ERRORS) return;
  let checked = 0;
  for (const b of BOARDS) {
    const full = intersect(b.field, b.clues).length;
    for (let i = 0; i < b.clues.length; i++) {
      const without = b.clues.slice(0, i).concat(b.clues.slice(i + 1));
      const grown = intersect(b.field, without).length;
      if (!(grown > full)) {
        err(`N4 card ${i} is a no-op or redundant (target ${b.target}, 1-${b.field}): ${grown} vs ${full}`);
        return;
      }
      checked++;
    }
  }
  console.log(`  N4 ⭐ every card is load-bearing — ${checked.toLocaleString('en-US')} drop-one checks, all strictly grew`);
}());

/* ---------- N4b ⭐ no deck holds two cards where one implies the other ---------- */
(function () {
  if (ERRORS) return;
  const maskOf = (field, c) => {
    const m = [];
    for (let n = 1; n <= field; n++) m.push(oracle(c, n));
    return m;
  };
  let pairs = 0;
  for (const b of BOARDS) {
    const masks = b.clues.map((c) => maskOf(b.field, c));
    for (let i = 0; i < masks.length; i++) {
      for (let j = i + 1; j < masks.length; j++) {
        let aSubB = true, bSubA = true;
        for (let k = 0; k < masks[i].length; k++) {
          if (masks[i][k] && !masks[j][k]) aSubB = false;
          if (masks[j][k] && !masks[i][k]) bSubA = false;
        }
        if (aSubB || bSubA) {
          err(`N4b cards ${i} and ${j} imply one another (target ${b.target}, 1-${b.field}) — the weaker one is redundant the moment both are down`);
          return;
        }
        pairs++;
      }
    }
  }
  console.log(`  N4b ⭐ no deck holds a card that implies another (${pairs.toLocaleString('en-US')} pairs, judged by the gate's own arithmetic)`);
}());

/* ---------- N1d every family is really usable ---------- */
(function () {
  if (ERRORS) return;
  const want = ['range', 'parity', 'multiple', 'digit', 'quantity', 'nearer'];
  const seen = {};
  BOARDS.forEach((b) => b.clues.forEach((c) => { seen[c.f] = (seen[c.f] || 0) + 1; }));
  const missing = want.filter((f) => !seen[f]);
  if (missing.length) {
    err(`N1d the alphabet is smaller than it claims — no deck anywhere uses: ${missing.join(', ')}`);
    return;
  }
  console.log(`  N1d all six families are really in play ${JSON.stringify(seen)}`);
}());

/* ---------- N5 UNIQUENESS ---------- */
(function () {
  if (ERRORS) return;
  for (const b of BOARDS) {
    const s = intersect(b.field, b.clues);
    if (s.length !== 1 || s[0] !== b.target) {
      err(`N5 the deck leaves ${s.length} number(s) [${s.slice(0, 5)}], expected exactly ${b.target}`);
      return;
    }
  }
  console.log(`  N5 every deck leaves exactly one number, and it is the target (${BOARDS.length} decks)`);
}());

/* ---------- N6 MONOTONE SHRINK ---------- */
(function () {
  if (ERRORS) return;
  for (const b of BOARDS) {
    const st = stateWith(b.field, b.clues, b.target);
    let prev = Infinity;
    for (let k = 0; k <= b.clues.length; k++) {
      const n = T.survivorsAfter(st, k).length;
      if (!(n < prev)) { err(`N6 the field did not shrink at card ${k} (target ${b.target}, 1-${b.field})`); return; }
      prev = n;
    }
    if (prev !== 1) { err(`N6 the deck ended on ${prev} survivors`); return; }
  }
  console.log('  N6 the field strictly shrinks at every card, ending on one');
}());

console.log('[the stance]');

/* ---------- N8 NO LEAK — targetOf throws until the last card ---------- */
(function () {
  const b = BOARDS[6] || BOARDS[0];
  if (!b) { err('N8 no board to test'); return; }
  const st = stateWith(b.field, b.clues, b.target);
  for (let k = 0; k < b.clues.length; k++) {
    const part = T._clone(st); part.turned = k;
    let threw = false;
    try { T.targetOf(part); } catch (_) { threw = true; }
    if (!threw) { err(`N8 targetOf did not throw with ${k}/${b.clues.length} cards turned — the answer is reachable`); return; }
  }
  let got = null;
  try { got = T.targetOf(st); } catch (e) { err('N8 targetOf threw after every card was turned: ' + e.message); return; }
  if (got !== b.target) { err(`N8 targetOf returned ${got}, expected ${b.target}`); return; }
  /* and the empty state must not hand back a target either */
  let threwEmpty = false;
  try { T.targetOf(T.newState()); } catch (_) { threwEmpty = true; }
  if (!threwEmpty) { err('N8 targetOf did not throw on a fresh state'); return; }
  console.log('  N8 the number is unreachable until every card has been turned');
}());

/* ---------- N9 NO TELL — structural: the render path cannot see the target ---------- */
(function () {
  const names = /* ⚠ AND `_paint`, WHICH IS WHERE THE SURVIVORS ARE NOW COMPUTED. The
     build/paint split moved that line out of `_buildField`, and this
     scan kept looking at the old three — a mutation putting
     `this.st.target` into the paint path sailed straight through. */
  ['_cellEl', '_buildField', '_paint', 'render'];
  const bodies = names.map((n) => {
    const m = new RegExp(n + ':\\s*function[\\s\\S]*?\\n  \\},').exec(SRC_NC);
    return m ? m[0] : '';
  }).join('\n');
  if (!bodies.trim()) { warn('N9 the render path is not written yet — re-run once it is'); return; }
  const tells = ['targetOf', 'st.target', 'state.target', '.target'].filter((w) => bodies.indexOf(w) > -1);
  if (tells.length) err(`N9 the render path can see the answer (${tells.join(', ')}) — the field must not know what it is converging on`);
  else console.log('  N9 the render path cannot see the target');
}());

/* ---------- N10 THE MARKER IS COMMITTED ---------- */
(function () {
  const b = BOARDS[10] || BOARDS[0];
  if (!b) return;
  let st = stateWith(b.field, b.clues, b.target);
  st.turned = 0; st.committed = false;
  st = T.park(st, 3);
  st = T.park(st, 9);
  if (st.markers.join(',') !== '3,9') { err('N10 two markers could not be parked before the first card (got ' + st.markers.join(',') + ')'); return; }
  if (T.park(st, 3).markers.join(',') !== '9') { err('N10 a marker could not be lifted again before the first card'); return; }
  st = T.turn(st);
  if (!st.committed) { err('N10 turning the first card did not commit the marker'); return; }
  const moved = T.park(st, 14);
  if (moved.markers.join(',') !== '3,9') { err(`N10 a marker moved after the first card (${moved.markers.join(',')}) — they must be committed`); return; }
  /* ⭐ AND A SHUFFLE MUST NOT UN-COMMIT THEM. The shipped build set
     committed=false here, so after a full run — when the class already
     knows the answer — the one control that invites a second run handed
     them permission to move a marker onto it. N3b checked the survivors
     and this gate checked one run; neither looked across a shuffle,
     which is exactly where it broke. */
  const shuf = T.shuffle(moved);
  if (!shuf.committed) { err('N10 a shuffle un-committed the markers'); return; }
  if (T.park(shuf, 14).markers.join(',') !== '3,9') { err('N10 a marker could be moved after a shuffle'); return; }
  /* and it is never given a verdict field */
  if (Object.prototype.hasOwnProperty.call(moved, 'markerCorrect') || /marker(Correct|Wrong|Hit|Won)/.test(SRC_NC)) {
    err('N10 the marker carries a verdict field'); return;
  }
  console.log('  N10 ⭐ the marker is committed from the first card, and is never judged');
}());

/* ---------- N10c turning a card advances by exactly one ---------- */
(function () {
  const b = BOARDS[20] || BOARDS[0];
  if (!b) return;
  let st = stateWith(b.field, b.clues, b.target);
  st.turned = 0; st.committed = false;
  for (let i = 1; i <= b.clues.length; i++) {
    st = T.turn(st);
    if (st.turned !== i) { err(`N10c turning card ${i} left turned=${st.turned} — a card must advance by exactly one`); return; }
  }
  const past = T.turn(st);
  if (past.turned !== b.clues.length) { err(`N10c the deck ran past its end (${past.turned}/${b.clues.length})`); return; }
  console.log('  N10c a card advances the deck by exactly one, and the deck stops at its end');
}());

/* ---------- N10b the marker cannot be parked off the field ---------- */
(function () {
  const st = T.newState();
  [0, -1, st.field + 1, 999, NaN, 'x', null].forEach((v) => {
    const p = T.park(st, v);
    if (p.markers.length) err(`N10b a marker was parked off the field at ${String(v)} (got ${p.markers.join(',')})`);
  });
  const good = T.park(st, st.field);
  if (good.markers.join(',') !== String(st.field)) err('N10b the last cell of the field would not take a marker');
  /* two markers may not share a cell, or the tables converge and the
     disagreement the plural markers exist to produce disappears */
  if (T.park(good, st.field).markers.length !== 0) err('N10b tapping a parked cell did not lift its marker');
  let many = T.newState();
  for (let i = 1; i <= T.MAX_MARKERS + 3; i++) many = T.park(many, i);
  if (many.markers.length !== T.MAX_MARKERS) err(`N10b the marker cap did not hold (${many.markers.length}/${T.MAX_MARKERS})`);
  if (!ERRORS) console.log('  N10b the marker only lands on a number that is really there');
}());

/* ---------- N17 the free gate is structural, and unknown is pessimistic ---------- */
(function () {
  const board = { id: 'x', range: 20, clues: T.buildFor(20, 7), target: 7 };
  T.data = { version: 1, freeMax: 8, premiumMax: 300, boards: [
    Object.assign({ free: true }, board, { id: 'free-1' }),
    Object.assign({ free: false }, board, { id: 'paid-1' })
  ] };
  T.premium = false;
  const free = T.boardsFor();
  if (free.length !== 1 || free[0].id !== 'free-1') { err(`N17 a locked board reached the free array (${free.map((b) => b.id).join(',')})`); return; }
  T.premium = true;
  if (T.boardsFor().length !== 2) { err('N17 a subscriber cannot see the whole library'); return; }
  T.premium = false;
  /* ⚠ unknown entitlement must be PESSIMISTIC — pattern-bench shipped the
     opposite and leaked a premium costume during the auth window */
  const noToken = /if \(!token\) \{ self\.premium = false; self\.premiumKnown = true;/.test(SRC_NC);
  if (!noToken) err('N17 the no-token branch does not force premium=false — unknown must be pessimistic');
  else console.log('  N17 locked boards are ABSENT from the array, and unknown entitlement is pessimistic');
}());

/* ---------- N11 NO WORDS / NO DIGITS IN AUTHORED STRINGS ---------- */
(function () {
  let bad = 0;
  LOCALES.forEach((loc) => {
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v === undefined) { err(`N11 strings.${k} has no ${loc}`); bad++; return; }
      /* placeholders are the only braces, and the only digits allowed are
         inside them ({n} / {i}) — the tool never counts */
      const stripped = String(v).replace(/\{[a-z]\}/g, '');
      if (/\d/.test(stripped)) { err(`N11 ${loc}.${k} contains a digit — this tool never counts: "${v}"`); bad++; }
      if (/[<>]/.test(stripped)) { err(`N11 ${loc}.${k} contains a comparison glyph: "${v}"`); bad++; }
      /* ⚠ invisible characters. A soft hyphen typed into the Danish card
         label survived every assertion and only showed up when the smoke
         digest PRINTED the string. Same family as the 0x08 bytes a bash
         heredoc injects. */
      const invisible = /[­​-‍⁠﻿ --]/.exec(stripped);
      if (invisible) { err(`N11 ${loc}.${k} carries an invisible character U+${invisible[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}: "${v}"`); bad++; }
    });
  });
  if (!bad) console.log(`  N11 no authored string counts or compares (${Object.keys(T.strings).length} keys x ${LOCALES.length} locales)`);
}());

/* ---------- N11b ⭐ THE ONLY TEXT THE APPARATUS CAN DRAW IS A NUMERAL ---------- */
(function () {
  const texts = (SRC_NC.match(/createElementNS\([^)]*,\s*'text'\)/g) || []).length;
  if (texts === 0) { warn('N11b the tool draws no SVG text at all — re-check once the card faces exist'); return; }
  if (texts > 1) { err(`N11b ${texts} places create SVG text — there must be exactly one, so "numerals only" is a property of the code and not of everybody's discipline`); return; }
  const body = (SRC_NC.match(/_num:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!/replace\(\/\[\^0-9\]\/g/.test(body)) {
    err('N11b the one text helper does not strip non-digits — a word could reach the apparatus');
    return;
  }
  console.log('  N11b ⭐ exactly one text helper exists and it strips everything that is not a digit');
}());

/* ---------- N12 NO VERDICT, in eleven locales ---------- */
(function () {
  const ident = /\b(isCorrect|score|streak|stopwatch|countdown|_?elapsed|matched|mismatch|isWrong|winner|attempts|tries)\b/;
  const hit = ident.exec(SRC_NC);
  if (hit) err(`N12 verdict/timing machinery: "${hit[0]}"`);
  if (/nsv-(correct|wrong|right|bad|good|win|fail)\b/.test(SRC)) err('N12 a verdict class token exists');
  const words = /\b(correct|incorrect|wrong|well done|richtig|falsch|correcto|incorrecto|correcte?|faux|bravo|giusto|sbagliato|goed gedaan|fout|rätt|fel|rigtigt|forkert|riktig|feil|oikein|väärin)\b/i;
  let bad = 0;
  LOCALES.forEach((loc) => {
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v && words.test(v)) { err(`N12 ${loc}.${k} carries verdict wording: "${v}"`); bad++; }
    });
  });
  /* the dark state must not be a verdict colour: no red/green pair */
  const reds = /#(e|f)[0-9a-f]{1}[0-3][0-9a-f]{3}\b/gi;
  const greens = /#[0-4][0-9a-f]{1}(c|d|e|f)[0-9a-f]{3}\b/gi;
  if (reds.test(SRC) && greens.test(SRC)) err('N12 the palette carries a red/green pair');
  if (!bad && !ERRORS) console.log('  N12 no verdict machinery, wording (x11) or colour');
}());

/* ---------- N13 ⭐ THE FOUR REFUSALS ---------- */
(function () {
  /* 1 — never ink a sequence */
  if (/\binked\b/.test(SRC_NC)) err('N13.1 an "inked" counter exists — this field never accumulates');
  if (/^\s*(next|advance|step)\s*:\s*function/m.test(SRC_NC)) err('N13.1 a traversal/advance method exists');
  /* 2 — never a columns control, and no control may reset the field */
  if (/^\s*cols\s*:/m.test(SRC_NC) || /setCols|COLS_ALLOWED|colsLabel/.test(SRC_NC)) err('N13.2 a columns control exists — that is choral-counting, and it is the Hundred Field\'s thesis');
  if (/_resetCount/.test(SRC_NC)) err('N13.2 a field-reset path exists');
  /* 3 — never tint by place value */
  if (/nsv-dg-(ones|tens)|digitSpans?|_digitSpans|PV_WORD_SPANS|tintOnes|tintTens/.test(SRC_NC)) err('N13.3 per-digit tinting leaked in — place-value-lab and choral-counting own that');
  /* 4 — never name the clue */
  /* ⚠ QUALIFIED FORMS, NOT BARE TOKENS — a cross-locale false positive.
     The bare Spanish `par` is also the French preposition, so the French
     panel's natural "retournez les cartes une par une" would have FAILED
     the build; bare `like` is English, and bare `pair` matches "a pair".
     A fence that rejects correct French is not a fence, it is a bug —
     and it is the kind that makes a native panel quietly reword around
     the gate instead of reporting it. Match what actually names a
     family: the multi-word form. */
  const FAMILY_WORDS = /\b(even numbers?|odd numbers?|multiples? of|parity|gerade Zahlen|ungerade Zahlen|Vielfache|nombres pairs|nombres impairs|multiples de|números pares|números impares|múltiplos|numeri pari|numeri dispari|multipli|even getallen|oneven getallen|veelvouden|jämna tal|udda tal|lige tal|ulige tal|like tall|ulike tall|parilliset|parittomat)\b/i;
  let bad = 0;
  LOCALES.forEach((loc) => {
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v && FAMILY_WORDS.test(v)) { err(`N13.4 ${loc}.${k} NAMES a clue family: "${v}"`); bad++; }
    });
  });
  if (!bad && !ERRORS) console.log('  N13 ⭐ the four refusals hold: no sequence, no columns control, no digit tint, no named clue');
}());

/* ---------- N14b PURITY + STATE SHAPE ---------- */
(function () {
  /* ⚠ BOUND THE REGION ON A CODE LANDMARK, NOT A COMMENT. The first cut
     sliced to the word "ENTITLEMENT", which lives only in a comment — and
     SRC_NC has comments stripped, so indexOf returned -1, the region
     silently became THE WHOLE FILE, and the store/entitlement block
     tripped the purity ban. The gate was measuring the wrong thing. */
  const modelStart = SRC_NC.indexOf('newState:');
  const modelEnd = SRC_NC.indexOf('_loadStore:');
  if (modelStart < 0 || modelEnd <= modelStart) { err('N14 could not bound the model region'); return; }
  const model = SRC_NC.slice(modelStart, modelEnd);
  ['Math.random', 'document.', 'window.', 'localStorage', 'api.t(', 'new Date'].forEach((w) => {
    if (model.indexOf(w) > -1) err(`N14 the model touches "${w}" — predicates must be pure`);
  });
  const keys = Object.keys(T.newState()).sort().join(',');
  if (keys !== 'chosen,clues,committed,emblems,field,markers,spares,target,turned') err(`N14 state shape is "${keys}"`);
  /* immutability: no model call may mutate its input */
  const st = stateWith(20, T.buildFor(20, 7), 7);
  const before = JSON.stringify(st);
  T.turn(st); T.park(st, 4); T.shuffle(st); T.setField(st, 100); T.survivors(st); T.setTarget(st, 5);
  if (JSON.stringify(st) !== before) err('N14 a model call mutated its input — the view cannot write to the data');
  if (!ERRORS) console.log('  N14 the model is pure, immutable, and its state shape is frozen');
}());

/* ---------- N15 IDENTITY / NO EXFIL ---------- */
(function () {
  if (T.tasks || T.nextTask) err('N15 the tool declares tasks/nextTask — it would become a graded activity');
  if (/^\s*(tasks|nextTask)\s*:/m.test(SRC_NC)) err('N15 a tasks/nextTask key is declared in source');
  const urls = [];
  SRC_NC.replace(/fetch\(\s*['"]([^'"]+)['"]/g, (m, u) => { urls.push(u); return m; });
  const want = ['/api/auth/me', '/mini-tools/number-sieve-boards.json'].sort().join(',');
  if (urls.slice().sort().join(',') !== want) err(`N15 unexpected network calls: ${urls.join(', ') || 'none'}`);
  if (/sendBeacon|WebSocket|XMLHttpRequest|analytics/.test(SRC_NC)) err('N15 an exfiltration path exists');
  if (/my-classes|rosterFor|studentId|childName/.test(SRC_NC)) err('N15 the tool reads child identity');
  if (!ERRORS) console.log('  N15 two fetches, no exfiltration, no child identity');
}());

/* ---------- N20 ⭐ A CONTROL MUST DO WHAT ITS LABEL SAYS ---------- */
(function () {
  /* ⚠ `audit-tool-control-liveness` PASSED the "New cards" chip while it
     produced no cards, because setting a flag and re-rendering IS a DOM
     change. Class Graph taught this codebase to prove a control ACTS;
     that is not the same as proving it FUNCTIONS. The chip is named with
     a noun, so its handler must actually deal a deck. */
  const h = /pick\.addEventListener\('click',\s*function \(\)\s*\{([\s\S]*?)\}\);/.exec(SRC_NC);
  if (!h) { err('N20 could not find the New-cards handler'); return; }
  const body = h[1];
  if (!/_dealNewTarget\s*\(/.test(body)) {
    err('N20 the New-cards handler does not deal a deck — a control named with a noun must produce the thing it names, not arm a mode');
    return;
  }
  if (typeof T._dealNewTarget !== 'function') { err('N20 _dealNewTarget is not defined'); return; }
  /* and it really lands on a DIFFERENT board */
  const probe = Object.create(T);
  probe.st = T.loadBoard(T.newState(), { id: 'x', range: 20, clues: T.buildFor(20, 7) });
  const beforeTarget = probe.st.target, beforeClues = JSON.stringify(probe.st.clues);
  probe._dealNewTarget();
  if (probe.st.target === beforeTarget || JSON.stringify(probe.st.clues) === beforeClues) {
    err(`N20 dealing new cards left the same board (target ${beforeTarget})`);
    return;
  }
  /* stride must walk every target, not a short orbit */
  const seen = {};
  let walk = Object.create(T);
  walk.st = T.loadBoard(T.newState(), { id: 'x', range: 20, clues: T.buildFor(20, 1) });
  for (let i = 0; i < 20; i++) { walk._dealNewTarget(); seen[walk.st.target] = 1; }
  const reached = Object.keys(seen).length;
  if (reached < 20) { err(`N20 repeated presses only reach ${reached} of 20 targets — the stride cycles a short orbit`); return; }
  console.log(`  N20 ⭐ "New cards" deals a genuinely different board, and repeated presses reach all ${reached} targets`);
}());

/* ---------- N21 setTarget fails loudly, and the hint dispatch is a
     FUNCTION rather than a paragraph of render code ---------- */
(function () {
  const st = T.loadBoard(T.newState(), { id: 'x', range: 20, clues: T.buildFor(20, 7) });
  [0, 21, -1, NaN, 'x', null].forEach((bad) => {
    if (T.setTarget(st, bad) !== null) err(`N21 setTarget(${String(bad)}) did not return null — a failure must be distinguishable from a success`);
  });
  if (!T.setTarget(st, 13)) { err('N21 setTarget refused a buildable target'); return; }
  const tap = (SRC_NC.match(/_tapCell:\s*function[\s\S]*?\n  \},/) || [''])[0];
  if (!tap.trim()) { err('N21 could not find _tapCell — the scrape is disarmed, which is a failure and not a pass'); return; }
  if (/built\.clues\.length/.test(tap)) {
    err('N21 _tapCell still guards on built.clues.length — on failure that is the OLD deck and reads as success');
    return;
  }
  /* ⭐ THE HINT IS NOW DRIVEN, NOT SCRAPED. It used to be a chain of ifs
     inside `_buildHint`, and this gate read that chain as TEXT — which
     means it was testing the shape of a paragraph rather than what the
     tool says. On #44 a Node gate that reimplemented an inline dispatch
     let three mutations of the real one sail through. `hintKey` is a pure
     function of the state, so the gate can simply ask it. */
  if (typeof T.hintKey !== 'function') { err('N21 hintKey is not a function — the hint dispatch must be drivable'); return; }
  const deck = T.buildFor(20, 7);
  const board = T.loadBoard(T.newState(), { id: 'x', range: 20, clues: deck });
  /* armed beats everything, on every state, including a cold load */
  if (T.hintKey(T.newState(), 'target') !== 'pickHint') err('N21 the armed hint does not fire on an empty deck when armed');
  if (T.hintKey(board, 'target') !== 'pickHint') err('N21 the armed hint does not fire on a dealt board');
  /* ⚠ and it must NOT fire merely because the deck is empty — that is
     every cold load, and the tap it asks for only parks a marker */
  if (T.hintKey(T.newState(), null) === 'pickHint') err('N21 the armed hint fires on a cold load — a hint that cannot be obeyed is worse than silence');
  if (T.hintKey(board, null) !== 'parkHint') err('N21 a fresh board does not ask for a marker');
  if (T.hintKey(T.park(board, 7), null) !== 'instruction') err('N21 a parked board does not ask for a card');
  let mid = T.turn(T.park(board, 7));
  if (T.hintKey(mid, null) !== '') err('N21 the tool talks mid-deck — it should wait');
  if (!ERRORS) console.log('  N21 setTarget fails loudly, the caller guards on the build, and the hint dispatch is driven');
}());

/* ---------- N19 NO DEAD STRINGS — measured by REACHABILITY ---------- */
(function () {
  /* ⚠⚠ A SOURCE SCAN CANNOT ANSWER THIS QUESTION, and believing it could
     was itself a defect. The hint keys are reached through
     `api.t(this.hintKey(...))` — a VARIABLE — so a scan for the literal
     `api.t('instruction')` reported five live, load-bearing strings as
     dead. That is the recorded A15 trap exactly: a key can be reached
     through a ternary, a lookup map or a dispatch function, and "the
     string exists" is not "the string is reached".
     So: every key must be REACHED by driving the tool's own dispatchers
     over a matrix of real states, or be consumed by a literal api.t, or
     be one of the two the shell itself renders. Three ways in, and a key
     that meets none of them is genuinely dead.
     ⚠ Three times on this platform an unused string has turned out to be
     a MISSING FEATURE rather than dead copy — here it found that the
     three range chips were an unlabelled group. */
  const consumed = new Set();
  /* (1) the shell renders these two itself (lcs-shell.js:458-468) */
  consumed.add('title');
  consumed.add('instruction');
  /* (2) literal api.t('key') — the whole argument, or a branch after ? or
     : , because a looser scan reads the comparison operand in
     api.t(x ? 'a' : 'b') as a key and a stricter one misses the ternary */
  SRC_NC.replace(/api\.t\(([^()]*)\)/g, (m, arg) => {
    arg.split(/[?:]/).forEach((part) => {
      const q = /^\s*'([A-Za-z0-9_]+)'\s*$/.exec(part);
      if (q) consumed.add(q[1]);
    });
    return m;
  });
  /* (3) DRIVEN: every key the hint dispatcher can actually produce, over
     a matrix that reaches every branch it has */
  /* ⚠ THE BOARD HAS TO BE ONE THAT ACTUALLY HAS SPARES. Built without
     the penultimate floor a deck often arrives at two, and a two-wide
     closing state has no three-way choice to offer — so `spareHint`
     was unreachable and this gate correctly said so. The library is
     generated under the floor, so the floor is the honest matrix. */
  let deck = T.buildFor(20, 7, 4, { minPen: T.MIN_PENULTIMATE });
  for (let t = 1; !deck && t <= 20; t++) deck = T.buildFor(20, t, 4, { minPen: T.MIN_PENULTIMATE });
  if (!deck) { err('N19 could not build a floored board to drive the dispatcher'); return; }
  const b0 = T.loadBoard(T.newState(), { id: 'x', range: 20, clues: deck });
  if (b0.spares.length !== 3) { err('N19 a floored board carried no spares — the matrix cannot reach the closing move'); return; }
  const states = [
    [T.newState(), 'target'], [T.newState(), null], [b0, null], [b0, 'target'],
    [T.park(b0, 7), null], [T.turn(T.park(b0, 7)), null]
  ];
  let run = T.park(b0, 7);
  for (let i = 0; i < deck.length + 1; i++) { run = T.turn(run); states.push([run, null]); }
  /* and the closing move, which is the only route to `spareHint` */
  if (b0.spares && b0.spares.length === 3) {
    let sp = T.park(b0, 7);
    while (sp.turned < sp.clues.length - 1) sp = T.turn(sp);
    states.push([sp, null]);
    for (let i = 0; i < 3; i++) states.push([T.chooseSpare(sp, i), null]);
  }
  const produced = new Set();
  states.forEach(([s, p]) => { const k = T.hintKey(s, p); if (k) produced.add(k); });
  produced.forEach((k) => consumed.add(k));

  const dead = Object.keys(T.strings).filter((k) => !consumed.has(k));
  if (dead.length) {
    err(`N19 unreachable string(s): ${dead.join(', ')} — on this platform that has three times been a missing feature, not dead copy. Wire it or delete it.`);
    return;
  }
  /* ⚠ AND THE DISPATCHER MUST ACTUALLY HAVE REACHED SOMETHING, or this
     whole section is a set-union with an empty set and cannot fail. */
  if (produced.size < 4) {
    err(`N19 the hint dispatcher produced only ${produced.size} keys over ${states.length} states — the matrix is not driving it`);
    return;
  }
  console.log(`  N19 ⭐ every authored string is REACHED (${Object.keys(T.strings).length} keys; ${produced.size} of them only via the dispatcher)`);
}());

/* ---------- N22 ⭐ TWO DISTINCT CLUES NEVER DRAW THE SAME FACE ----------
   The tool's whole law is that the icon IS the statement, so a
   many-to-one face is not a cosmetic defect, it is the apparatus lying.
   Measured on the shipped build: `_cardFace` drew Math.min(q, 10) dots
   while `MAX_DOTS` was 20 and the universe emitted q up to 20 — the cap
   was designed at 20 and the renderer written at 10, and the two never
   met. On the 1-100 field ELEVEN distinct clues ("more than 10" through
   "more than 20") rendered byte-identically, in two collision classes
   per field, and 14 of the 26 quantity cards in the shipped library drew
   a face that was simply false.
   ⚠ THE GATE DRAWS THE REAL FACE. It builds the actual SVG through a
   minimal DOM shim and digests the primitives, rather than re-deriving
   what it thinks the renderer would do — a gate that reimplements the
   thing it checks is testing a copy (#44). */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const mkEl = (tag) => ({
    tag, attrs: {}, kids: [], _text: '',
    setAttribute(k, v) { this.attrs[k] = String(v); },
    appendChild(c) { this.kids.push(c); return c; },
    set textContent(v) { this._text = String(v); },
    get textContent() { return this._text; }
  });
  const prevCreate = sandbox.document.createElementNS;
  sandbox.document.createElementNS = (ns, tag) => mkEl(tag);
  const digest = (n) => {
    const a = Object.keys(n.attrs).sort().map((k) => k + '=' + n.attrs[k]).join(',');
    return n.tag + '[' + a + ']' + (n._text ? '{' + n._text + '}' : '')
      + (n.kids.length ? '(' + n.kids.map(digest).join(';') + ')' : '');
  };
  let clashes = 0, worst = 0, worstEx = '';
  try {
    T.FIELDS.forEach((f) => {
      const seen = {};
      T.universe(f).forEach((c) => {
        const d = digest(T._cardFace(c));
        (seen[d] = seen[d] || []).push(c);
      });
      Object.keys(seen).forEach((d) => {
        if (seen[d].length > 1) {
          clashes++;
          if (seen[d].length > worst) { worst = seen[d].length; worstEx = JSON.stringify(seen[d].slice(0, 3)); }
        }
      });
    });
  } finally { sandbox.document.createElementNS = prevCreate; }
  /* ⚠ NON-VACUITY FIRST: prove the digest can tell two faces apart at
     all, or "no collisions" is a statement about an empty comparison. */
  sandbox.document.createElementNS = (ns, tag) => mkEl(tag);
  const a = digest(T._cardFace({ f: 'parity', r: 0 }));
  const b = digest(T._cardFace({ f: 'parity', r: 1 }));
  const c2 = digest(T._cardFace({ f: 'quantity', op: 'gt', q: 11 }));
  const c3 = digest(T._cardFace({ f: 'quantity', op: 'gt', q: 20 }));
  sandbox.document.createElementNS = prevCreate;
  if (a === b) { err('N22 the face digest cannot tell even and odd apart — it is not measuring the drawing'); return; }
  if (!a.length || a.length < 40) { err('N22 the face digest is empty or trivial — nothing was drawn'); return; }
  if (c2 === c3) { err('N22 "more than 11" and "more than 20" still draw the same face'); return; }
  if (clashes) { err(`N22 ${clashes} face collision class(es); worst holds ${worst} distinct clues, e.g. ${worstEx}`); return; }
  console.log('  N22 ⭐ no two distinct clues draw the same face — EXHAUSTIVE over the universe of all three fields');
}());

/* ---------- N23 ⭐ EVERY MEANING-BEARING PAIR MEETS 3:1 ----------
   The measurement that reframed the whole rebuild. Cream, amber and
   slate are near-isoluminant, so every boundary that carried meaning in
   the shipped tool sat between two light values — the lit-versus-dark
   step, which is the entire lesson, at 1.44:1 against a WCAG floor of
   3:1 for non-text graphics — while amber on deep teal, 5.82:1, was not
   used anywhere. This gate reads the shipped hex values out of the
   stylesheet and does the arithmetic, so the palette cannot quietly
   drift back. */
(function () {
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = (hex) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const ratio = (x, y) => { const a = L(x), b = L(y); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
  const css = (SRC.match(/function injectNumberSieveCSS[\s\S]*$/) || [''])[0];
  if (css.length < 2000) { err('N23 could not find the stylesheet — the scrape is disarmed, which is a failure and not a pass'); return; }
  const need = (name, re) => {
    const m = re.exec(css);
    if (!m) { err(`N23 ${name} is not in the stylesheet any more — this gate cannot measure what it cannot find`); return null; }
    return m[1];
  };
  const lit = need('the lit cell background', /\.nsv-cell\{[^}]*background-color:(#[0-9A-Fa-f]{6})/);
  const hatch = need('the dead cell hatch', /\.nsv-cell\.nsv-out\{[^}]*repeating-linear-gradient\(45deg,(#[0-9A-Fa-f]{6})/);
  const marker = need('the marker glyph', /\.nsv-mkg\{[^}]*background-color:(#[0-9A-Fa-f]{6})/);
  const bar = need('the card bar ground', /\.nsv-fbar\{fill:(#[0-9A-Fa-f]{6})/);
  const keep = need('the survives fill', /\.nsv-keep\{fill:(#[0-9A-Fa-f]{6})/);
  if (!lit || !hatch || !marker || !bar || !keep) return;
  const FLOOR = 3.0;
  const pairs = [
    ['the dead cell mark against a lit cell (the LESSON)', hatch, lit],
    ['the committed marker against a lit cell (invention 3)', marker, lit],
    ['the survives fill against the card bar it sits on', keep, bar]
  ];
  let bad = 0;
  pairs.forEach(([what, x, y]) => {
    const r = ratio(x, y);
    if (r < FLOOR) { err(`N23 ${what} is ${r.toFixed(2)}:1 — under the ${FLOOR}:1 floor for a non-text graphic`); bad++; }
  });
  /* ⚠ POISON IT IN BOTH DIRECTIONS. The old palette must FAIL and the
     new one must PASS, or this is a floor nobody has ever seen fire. */
  if (ratio('#C7CFCD', '#FBF3E4') >= FLOOR) { err('N23 the OLD dead-cell colour passes this floor — the gate is measuring the wrong thing'); bad++; }
  if (ratio('#F2C879', '#0E5147') < FLOOR) { err('N23 amber on deep teal fails this floor — the arithmetic is wrong'); bad++; }
  if (bad) return;
  console.log(`  N23 ⭐ every meaning-bearing pair clears 3:1 (lesson ${ratio(hatch, lit).toFixed(1)}:1, marker ${ratio(marker, lit).toFixed(1)}:1, survives ${ratio(keep, bar).toFixed(1)}:1)`);
}());

/* ---------- N24 ⭐ THE CLOSING CHOICE ----------
   Exactly one spare closes, the other two leave at least two numbers
   with distinct residues, and none of them is implied by a card already
   on the table (or the class could eliminate it without looking at the
   field, which is the one thing the move exists to make them do). */
(function () {
  let checked = 0, bad = 0;
  for (const field of T.FIELDS) {
    for (let t = 1; t <= field; t++) {
      const deck = T.buildFor(field, t, 4, { minPen: T.MIN_PENULTIMATE, cleanTens: true });
      if (!deck) continue;
      const st = T.loadBoard(T.newState(), { range: field, clues: deck });
      if (st.spares.length !== 3) { err(`N24 ${field}/${t} met the floor but carries no closing choice`); bad++; if (bad > 3) return; continue; }
      const res = [0, 1, 2].map((i) => T._afterSpare(st, i));
      const closers = res.filter((r) => r.length === 1 && r[0] === t).length;
      if (closers !== 1) { err(`N24 ${field}/${t} has ${closers} closing spares, not exactly one`); bad++; if (bad > 3) return; continue; }
      if (res.filter((r) => r.length >= 2).length !== 2) { err(`N24 ${field}/${t} does not have two live decoys`); bad++; if (bad > 3) return; continue; }
      if (new Set(res.map((r) => r.join(','))).size !== 3) { err(`N24 ${field}/${t} has two candidates leaving the same numbers`); bad++; if (bad > 3) return; continue; }
      /* the derived closer must agree with the arithmetic */
      const ci = T.closingSpare(st);
      if (res[ci].length !== 1 || res[ci][0] !== t) { err(`N24 ${field}/${t} closingSpare disagrees with the field`); bad++; if (bad > 3) return; continue; }
      /* ⚠ AND THE WINNER'S POSITION MUST NOT BE PREDICTABLE — a class
         that learns "it is always the left one" has learned nothing */
      checked++;
    }
  }
  if (bad) return;
  if (checked < 50) { err(`N24 only ${checked} boards carried a closing choice — the sweep is not driving it`); return; }
  /* the closer's seat is spread across all three positions */
  const seats = { 0: 0, 1: 0, 2: 0 };
  for (const field of T.FIELDS) {
    for (let t = 1; t <= field; t++) {
      const deck = T.buildFor(field, t, 4, { minPen: T.MIN_PENULTIMATE, cleanTens: true });
      if (!deck) continue;
      const st = T.loadBoard(T.newState(), { range: field, clues: deck });
      if (st.spares.length === 3) seats[T.closingSpare(st)]++;
    }
  }
  const lowest = Math.min(seats[0], seats[1], seats[2]);
  if (lowest < checked * 0.15) { err(`N24 the closing card sits in one seat too often (${JSON.stringify(seats)}) — its position leaks the answer`); return; }
  console.log(`  N24 ⭐ the closing choice is sound on all ${checked} floored boards, and the closer's seat is spread ${JSON.stringify(seats)}`);
}());

/* ---------- N27 ⭐ THE INVARIANTS THE MUTATION HARNESS CAUGHT ME MISSING
   Five mutations APPLIED cleanly and this file did not notice, which is
   the only way a gate hole ever announces itself. Each one below is the
   assertion that was absent.
   ⚠ Every check here drives the model. None of them reads the tool's
   source, because a source scan cannot tell whether a guard still has
   the effect it used to have. ---------- */
(function () {
  /* (a) the closing candidates may not be implied by a card already on
     the table — if one is, the class can eliminate it without looking at
     the field, which is the one thing the move exists to make them do */
  let checked = 0;
  for (const field of T.FIELDS) {
    for (let t = 1; t <= field; t++) {
      const deck = T.buildFor(field, t, 4, { minPen: T.MIN_PENULTIMATE, cleanTens: true });
      if (!deck) continue;
      const st = T.loadBoard(T.newState(), { range: field, clues: deck });
      if (st.spares.length !== 3) continue;
      const all = T.allNumbers(field);
      const opened = deck.slice(0, deck.length - 1).map((c) => all.map((n) => oracle(c, n)));
      for (let i = 0; i < 3; i++) {
        const m = all.map((n) => oracle(st.spares[i], n));
        for (const o of opened) {
          let ab = true, ba = true;
          for (let k = 0; k < m.length; k++) { if (m[k] && !o[k]) ab = false; if (o[k] && !m[k]) ba = false; }
          if (ab || ba) { err(`N27a ${field}/${t} candidate ${i} is implied by a card already turned`); return; }
        }
      }
      checked++;
      if (checked > 60) break;
    }
    if (checked > 60) break;
  }
  if (checked < 20) { err(`N27a only ${checked} boards were checked — the sweep is not driving it`); return; }

  /* (b) the penultimate floor survives the prune, and (c) the closing
     card really closes. Both are properties of the deck the builder
     RETURNS, so they are measured there and not inside it. */
  let n = 0, thin = 0, open = 0;
  for (const field of T.FIELDS) {
    for (let t = 1; t <= field; t++) {
      const d = T.buildFor(field, t, 4, { minPen: 3, cleanTens: true });
      if (!d) continue;
      n++;
      /* ⚠ THE FLOOR IS HARDCODED HERE ON PURPOSE. Reading it off the tool
       means a mutation to `MIN_PENULTIMATE` moves this expectation with
       it and the gate marks its own homework — which is exactly how
       that mutation survived. Three is the number the library shape,
       the closing choice and the whole pedagogical argument rest on. */
      if (T.penultimateWidth(field, d) < 3) thin++;
      const upto = T.survivorsAfter({ field, clues: d, turned: d.length - 1, markers: [], spares: [], chosen: -1, emblems: [], committed: false }, d.length - 1);
      const after = upto.filter((x) => T.satisfies(d[d.length - 1], x));
      if (after.length !== 1 || after[0] !== t) open++;
    }
  }
  if (!n) { err('N27 the floored builder produced nothing — this check cannot measure what does not exist'); return; }
  if (thin) { err(`N27b ${thin} of ${n} floored decks arrive at the last card below the floor — the prune is not re-checked`); return; }
  if (open) { err(`N27c ${open} of ${n} floored decks do not actually close on their target`); return; }

  /* (d) "Start again" starts THIS board again */
  const deck = T.buildFor(20, 7, 4, { minPen: T.MIN_PENULTIMATE }) || T.buildFor(20, 7);
  let st = T.loadBoard(T.newState(), { range: 20, clues: deck });
  st = T.park(st, 5); st = T.turn(st);
  const again = T.restart(st);
  if (again.field !== st.field) { err('N27d Start again changed the field'); return; }
  if (JSON.stringify(again.clues) !== JSON.stringify(st.clues)) { err('N27d Start again changed the board or its clue order'); return; }
  if (again.markers.length || again.turned !== 0 || again.committed) { err('N27d Start again did not clear the run'); return; }

  /* (e) the offline fallback degrades to the FREE TIER, not to nothing */
  const fb = T.FALLBACK_BOARDS;
  if (!fb || !fb.boards || fb.boards.length < 4) {
    err(`N27e the offline fallback carries ${(fb && fb.boards ? fb.boards.length : 0)} boards — it must degrade to the free tier, not to nothing`);
    return;
  }
  for (const b of fb.boards) {
    if (b.free !== true) { err('N27e the offline fallback carries a board that is not free'); return; }
    const live = T.allNumbers(b.range).filter((x) => b.clues.every((c) => oracle(c, x)));
    if (live.length !== 1) { err(`N27e inline fallback board ${b.id} does not isolate`); return; }
  }
  console.log(`  N27 ⭐ the five invariants the mutation harness caught this file missing (${n} floored decks, ${fb.boards.length} inline free boards)`);
}());

/* ---------- N25 ⭐ THE EMBLEM IS IDENTITY, NOT A SECOND ORDINAL ----------
   `shuffle` renumbered the card backs 1..n by POSITION, so four teal
   cards reading 1 2 3 4 became four teal cards reading 1 2 3 4 —
   indistinguishable from "New cards" dealing a completely different
   deck. The headline invention, that the same cards in another order
   leave the same survivors, was not observable on screen at all.
   ⚠ AND THE EMBLEM MUST NOT BE DERIVED FROM THE FAMILY. One that could
   be read back to a clue family would name the clue, which is refusal 4. */
(function () {
  const deck = T.buildFor(100, 37, 4, { minPen: T.MIN_PENULTIMATE }) || T.buildFor(100, 37);
  let st = T.loadBoard(T.newState(), { range: 100, clues: deck });
  if (st.emblems.length !== st.clues.length) { err('N25 the deck was dealt without an emblem per card'); return; }
  const paired = st.clues.map((c, i) => JSON.stringify(c) + '#' + st.emblems[i]).sort().join('|');
  let sh = T.shuffle(st);
  const pairedAfter = sh.clues.map((c, i) => JSON.stringify(c) + '#' + sh.emblems[i]).sort().join('|');
  if (paired !== pairedAfter) { err('N25 a shuffle broke the card-to-emblem pairing — the emblem is a second ordinal, not an identity'); return; }
  if (sh.clues.map((c) => JSON.stringify(c)).join('|') === st.clues.map((c) => JSON.stringify(c)).join('|')) {
    err('N25 the shuffle did not re-order the deck, so this proves nothing'); return;
  }
  /* the emblem must not be a function of the family */
  const byFam = {};
  let leak = true;
  T.FIELDS.forEach((f) => {
    for (let t = 1; t <= f; t++) {
      const d = T.buildFor(f, t);
      if (!d) continue;
      const s2 = T.loadBoard(T.newState(), { range: f, clues: d });
      d.forEach((c, i) => {
        const k = c.f;
        if (byFam[k] === undefined) byFam[k] = s2.emblems[i];
        else if (byFam[k] !== s2.emblems[i]) leak = false;
      });
    }
  });
  if (leak) { err('N25 every clue of a family carries the same emblem — the emblem names the clue'); return; }
  console.log('  N25 ⭐ the emblem travels with its card through a shuffle, and cannot be read back to a family');
}());

/* ---------- N26 THE TWO ORACLES AGREE ----------
   `scripts/gen-number-sieve-boards.js` re-proves every board against its
   own copy of the six families, and the value of a duplicate is only
   real if it cannot silently drift. It had already drifted once: gen's
   range branch read `op === 'ge' ? >= : <=`, treating any unrecognised
   op as "at most", so it was strictly WEAKER than this file. */
(function () {
  const genSrc = (() => {
    try { return fs.readFileSync(path.join(ROOT, 'scripts', 'gen-number-sieve-boards.js'), 'utf8'); }
    catch (_) { return ''; }
  })();
  if (!genSrc) { err('N26 the generator could not be read — this gate cannot measure what it cannot find'); return; }
  const m = /const oracle = ([\s\S]*?\n};)/.exec(genSrc);
  if (!m) { err('N26 the generator no longer exposes a comparable oracle'); return; }
  let genOracle;
  try { genOracle = eval('(' + m[1].replace(/;\s*$/, '') + ')'); } catch (e) { err('N26 the generator oracle would not evaluate: ' + e.message); return; }
  let n = 0, bad = 0;
  T.FIELDS.forEach((f) => {
    T.universe(f).forEach((c) => {
      for (let v = 1; v <= f; v++) {
        n++;
        if (genOracle(c, v) !== oracle(c, v)) { bad++; if (bad === 1) err(`N26 the two oracles disagree on ${JSON.stringify(c)} at ${v}`); }
      }
    });
  });
  /* and on the malformed shapes, which is where they drifted before */
  [{ f: 'range', op: 'zz', a: 5 }, { f: 'quantity', op: 'zz', q: 5 }].forEach((c) => {
    n++;
    if (genOracle(c, 7) !== oracle(c, 7)) { bad++; err(`N26 the two oracles disagree on a malformed ${c.f} card — the duplicate is weaker than the original`); }
  });
  if (bad) return;
  if (n < 10000) { err(`N26 only ${n} comparisons ran — the sweep is not driving both oracles`); return; }
  console.log(`  N26 the generator's oracle agrees with this one on all ${n.toLocaleString('en-US')} comparisons, malformed shapes included`);
}());

/* ---------- N18 THE SHIPPED LIBRARY — an invalid board cannot ship ---------- */
(function () {
  /* ⚠ always from the repo, never the mutation dir: this measure judges
     the DATA, and it judges it with the gate's own arithmetic, so it is
     deliberately independent of whatever the tool is doing today. */
  const p = path.join(ROOT, 'mini tools', 'number-sieve-boards.json');
  if (!fs.existsSync(p)) { warn('N18 the board library has not been generated yet'); return; }
  let file;
  try { file = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { err('N18 the board library is not valid JSON: ' + e.message); return; }
  const boards = file.boards || [];
  if (!boards.length) { err('N18 the board library is empty'); return; }
  const ids = {};
  let freeCount = 0;
  for (const b of boards) {
    if (ids[b.id]) { err(`N18 duplicate board id ${b.id}`); return; }
    ids[b.id] = 1;
    if (b.free) freeCount++;
    if (T.FIELDS.indexOf(b.range) === -1) { err(`N18 ${b.id} has an unknown field ${b.range}`); return; }
    /* ⭐ NO AUTHORED TEXT, IN ANY LOCALE — the property the whole library
       stands on. A title or a reason here would cap it at wodb's 21. */
    const extra = Object.keys(b).filter((k) => ['id', 'range', 'clues', 'free'].indexOf(k) === -1);
    if (extra.length) { err(`N18 ${b.id} carries fields it must not: ${extra.join(', ')} — a title would need translating, and a stored target would put the answer in a public file`); return; }
    /* ⚠ the id must be field + a plain sequence index, never the answer.
       The first cut banned "three digits in a row" and immediately fired
       on s100-05, where the three digits are the FIELD SIZE. The property
       is structural: <range>-<index>, and the index is bounded by how
       many boards that field has. */
    const m = /^s(\d+)-(\d{2,3})$/.exec(b.id);
    const inField = boards.filter((x) => x.range === b.range).length;
    if (!m || Number(m[1]) !== b.range || Number(m[2]) < 1 || Number(m[2]) > inField) {
      err(`N18 ${b.id} is not <field>-<sequence index> — an id must not be able to spell the answer`);
      return;
    }
    for (const c of b.clues) {
      if (oracle(c, 1) === null) { err(`N18 ${b.id} uses a card the gate does not know: ${JSON.stringify(c)}`); return; }
    }
    const survivors = [];
    for (let n = 1; n <= b.range; n++) if (b.clues.every((c) => oracle(c, n))) survivors.push(n);
    if (survivors.length !== 1) { err(`N18 ${b.id} leaves ${survivors.length} numbers standing, not one`); return; }
    /* and the tool derives the same number the gate does */
    const loaded = T.loadBoard(T.newState(), b);
    if (loaded.target !== survivors[0]) { err(`N18 ${b.id}: the tool derives ${loaded.target}, the gate ${survivors[0]}`); return; }
    let prev = Infinity;
    for (let k = 0; k <= b.clues.length; k++) {
      let n = 0;
      for (let v = 1; v <= b.range; v++) if (b.clues.slice(0, k).every((c) => oracle(c, v))) n++;
      if (!(n < prev)) { err(`N18 ${b.id} card ${k} takes nothing away`); return; }
      prev = n;
    }
    for (let i = 0; i < b.clues.length; i++) {
      const without = b.clues.slice(0, i).concat(b.clues.slice(i + 1));
      let n = 0;
      for (let v = 1; v <= b.range; v++) if (without.every((c) => oracle(c, v))) n++;
      if (n <= 1) { err(`N18 ${b.id} card ${i} is redundant`); return; }
    }
    if (b.clues.length < 4) { err(`N18 ${b.id} has only ${b.clues.length} cards — the library is the curated half, and a curated board is a routine`); return; }
  }
  if (freeCount !== file.freeMax) { err(`N18 freeMax says ${file.freeMax} but ${freeCount} boards are marked free`); return; }
  if (!freeCount) { err('N18 nothing is free — a signed-out teacher would meet a locked library on arrival'); return; }
  console.log(`  N18 ⭐ the shipped library is valid by the gate's own arithmetic (${boards.length} boards, ${freeCount} free, 0 translatable fields)`);
}());

/* ---------- N16 GEOMETRY — two floors, measured separately ---------- */
(function () {
  if (!/injectNumberSieveCSS|nsv-style/.test(SRC)) { warn('N16 the stylesheet is not written yet — re-run once it is'); return; }
  /* ⚠ AND, NEVER OR. The first cut read "the chip carries 44px OR
     anything carries 44px", and the card's own 44px satisfied the second
     half forever — so shrinking the chip was unfalsifiable. Every control
     class is named and checked on its own. */
  /* ⚠ EVERY CONTROL CLASS, NOT THE TWO THAT EXISTED WHEN THIS WAS
     WRITTEN. The rebuild added a segmented range control, six family
     toggles and a deck-length control; none of them was covered here,
     and local-test measured the segmented buttons at 40px and the
     length chips at 42x44 — both under the floor, both invisible to
     this gate. A control floor that names a fixed list of classes
     stops being a floor the moment a control is added. */
  ['nsv-chip', 'nsv-card', 'nsv-segbtn', 'nsv-fam', 'nsv-lenbtn'].forEach((c) => {
    if (!new RegExp('\\.' + c + '\\{[^}]*min-height:44px').test(SRC)) {
      err(`N16 .${c} does not carry the 44px control floor`);
    }
  });
  /* ⭐⭐ EVERY CLAMP, NOT ANY CLAMP — AND THE MUTATION HARNESS PROVED IT.
     This used to be a single `.test()`, which passes when ONE
     `--nsv-cell` clamp carries a floor of 34. The rebuild added a
     per-field clamp for the twelve-row board, so there are now two —
     and the mutation that drops the BASE floor to 22px sailed through,
     because the other clamp still matched. One matching instance was
     certifying all of them. Read every declaration and check every
     floor, and refuse to run at all if none is found, so that an
     empty sweep can never look like a clean one. */
  const clamps = SRC.match(/--nsv-cell:\s*clamp\(\s*(\d+)px/g) || [];
  if (!clamps.length) {
    err('N16 no --nsv-cell clamp found at all — this check cannot measure what it cannot find');
  } else {
    const floors = clamps.map((c) => Number(/clamp\(\s*(\d+)px/.exec(c)[1]));
    const low = floors.filter((f) => f < 34);
    if (low.length) err(`N16 ${low.length} of ${floors.length} field-cell clamp(s) sit under the 34px canvas floor (${low.join(', ')}px) — the calendar-wall precedent`);
  }
  if (!/\.nsv-cell\{[^}]*min-width:0/.test(SRC) || !/\.nsv-cell\{[^}]*min-height:0/.test(SRC)) {
    err('N16 the cell does not carry min-width:0;min-height:0 — aspect-ratio + a cell min-height over-inflates the track and pushes the last column out of the grid box while scrollWidth stays clean');
  }
  if (/\.style\.background\s*=/.test(SRC_NC)) {
    err('N16 an inline `background` SHORTHAND assignment exists — it resets background-image and beats the stylesheet. Use backgroundColor, or a class.');
  }
  if (!ERRORS) console.log('  N16 two tap floors (44 control / 34 field cell), no shorthand-background trap');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
