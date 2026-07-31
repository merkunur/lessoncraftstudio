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
  if (c.f === 'quantity') return c.op === 'lt' ? v < c.q : v > c.q;
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
  const names = ['_cellEl', '_buildField', 'render'];
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
  if (st.marker !== 3) { err('N10 a marker could not be parked before the first card'); return; }
  st = T.turn(st);
  if (!st.committed) { err('N10 turning the first card did not commit the marker'); return; }
  const moved = T.park(st, 9);
  if (moved.marker !== 3) { err(`N10 the marker moved after the first card (${moved.marker}) — it must be committed`); return; }
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
    if (p.marker !== null) err(`N10b a marker was parked off the field at ${String(v)} (got ${p.marker})`);
  });
  const good = T.park(st, st.field);
  if (good.marker !== st.field) err('N10b the last cell of the field would not take a marker');
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
  if (keys !== 'clues,committed,field,marker,target,turned') err(`N14 state shape is "${keys}"`);
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

/* ---------- N19 NO DEAD STRINGS ---------- */
(function () {
  /* ⚠ Three times on this platform an unused string has turned out to be
     a MISSING FEATURE, not dead copy. Here it found that the three range
     chips were an unlabelled group. Take only what api.t actually
     consumes — the whole argument, or a branch after ? or : — because a
     looser scan reads the comparison operand in api.t(x ? 'a' : 'b') as a
     key, and a stricter one misses the ternary entirely. */
  const consumed = new Set(['title']);   /* title is rendered by the shell */
  SRC_NC.replace(/api\.t\(([^()]*)\)/g, (m, arg) => {
    arg.split(/[?:]/).forEach((part) => {
      const q = /^\s*'([A-Za-z0-9_]+)'\s*$/.exec(part);
      if (q) consumed.add(q[1]);
    });
    return m;
  });
  const dead = Object.keys(T.strings).filter((k) => !consumed.has(k));
  if (dead.length) {
    err(`N19 unused string(s): ${dead.join(', ')} — on this platform that has three times been a missing feature, not dead copy. Wire it or delete it.`);
    return;
  }
  console.log(`  N19 every authored string is wired (${Object.keys(T.strings).length} keys)`);
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
    const m = /^s(\d+)-(\d{2})$/.exec(b.id);
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
  ['nsv-chip', 'nsv-card'].forEach((c) => {
    if (!new RegExp('\\.' + c + '\\{[^}]*min-height:44px').test(SRC)) {
      err(`N16 .${c} does not carry the 44px control floor`);
    }
  });
  const cell = /--nsv-cell:\s*clamp\(3[4-9]px|--nsv-cell:\s*clamp\(4[0-9]px/.test(SRC);
  if (!cell) err('N16 no 34px field-cell floor found (the calendar-wall canvas precedent)');
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
