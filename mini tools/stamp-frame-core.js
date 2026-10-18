/* =====================================================================
   stamp-frame-core.js — the MODEL of "Show the Operation" (K.OA.A.1),
   activity #23 of the one-by-one rebuild — THE STAMP FRAME
   (design: docs/activities-rebuild/designs/023-ten-frame.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-stamp-frame-core.js
   drives it; scripts/mutate-stamp-frame.js proves the gate bites).

   THE SKILL. K.OA.A.1: represent addition and subtraction with objects,
   drawings and expressions. THE INVENTION — the child prints the
   expression on a ten-frame with three rubber stamps (a coral dot for the
   first number, a teal dot for the second, a big cross to take away), and
   each number in the equation then reaches down with a BRACKET over its
   own counters. Before the brackets drop, THE TIDY slides the counters
   into reading order (coral then teal; uncrossed then crossed) — it only
   ever permutes, never changes how many of each there are. A right
   printing merges the brackets (addition) or peels the crossed counters
   off into the away dish (subtraction), and only then is "how many?"
   asked, on a fixed 1–10 / 1–20 number strip (position = value).
   No round, addend, subtrahend or answer is ever 0.
   ===================================================================== */
(function (global) {
  'use strict';

  var FRAME = 10, LINE = 5;
  var LEVELS = ['within5', 'within10', 'within20'];
  var SHOWS = ['numerals', 'dots'];
  /* [a, b, op] — within10 keeps the old activity's ten problems word for word */
  var POOLS = {
    within5:  [[2, 1, '+'], [1, 3, '+'], [2, 2, '+'], [3, 2, '+'], [1, 4, '+'], [5, 1, '-'], [4, 2, '-'], [5, 3, '-'], [3, 1, '-'], [4, 3, '-']],
    within10: [[3, 2, '+'], [4, 3, '+'], [5, 4, '+'], [2, 6, '+'], [1, 5, '+'], [5, 2, '-'], [8, 3, '-'], [7, 4, '-'], [9, 6, '-'], [6, 2, '-']],
    within20: [[8, 5, '+'], [9, 7, '+'], [6, 6, '+'], [7, 8, '+'], [10, 4, '+'], [15, 6, '-'], [13, 5, '-'], [18, 7, '-'], [14, 7, '-'], [17, 7, '-']]
  };
  var MAXN = { within5: 5, within10: 10, within20: 20 };

  /* ---- a seeded PRNG (mulberry32 over a string hash) ---- */
  function hash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  function level(l) { return POOLS[l] ? l : 'within10'; }
  function frames(l) { return level(l) === 'within20' ? 2 : 1; }
  function result(a, b, op) { return op === '+' ? a + b : a - b; }

  /* ---- rounds ---- */
  function rounds(l) {
    l = level(l);
    return POOLS[l].map(function (p) { return { id: l + '-' + p[0] + (p[2] === '+' ? 'p' : 'm') + p[1], level: l, a: p[0], b: p[1], op: p[2], frames: frames(l) }; });
  }
  /* an order is good when no two equal answers sit side by side and no operator runs longer than two */
  function orderOk(pool, ord) {
    var run = 1;
    for (var i = 1; i < ord.length; i++) {
      var p = pool[ord[i - 1]], q = pool[ord[i]];
      if (result(p.a, p.b, p.op) === result(q.a, q.b, q.op)) return false;
      run = (p.op === q.op) ? run + 1 : 1;
      if (run > 2) return false;
    }
    return true;
  }
  /* order-only reshuffle: a fresh permutation that keeps the rules and differs from the previous one */
  function order(pool, rand, prev) {
    var n = pool.length, a, i, j, t, tries;
    rand = rand || Math.random;
    for (tries = 0; tries < 4000; tries++) {
      a = []; for (i = 0; i < n; i++) a.push(i);
      for (i = n - 1; i > 0; i--) { j = Math.floor(rand() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (orderOk(pool, a) && (!prev || n < 2 || a.join(',') !== prev.join(','))) return a;
    }
    /* never reached for the shipped pools (the gate measures 10 000 seeds); a safe interleave */
    var plus = [], minus = [];
    for (i = 0; i < n; i++) (pool[i].op === '+' ? plus : minus).push(i);
    a = []; while (plus.length || minus.length) { if (plus.length) a.push(plus.shift()); if (minus.length) a.push(minus.shift()); }
    return a;
  }

  /* ---- state ---- */
  function newState(round) {
    var n = (round.frames || 1) * FRAME, cells = [];
    for (var i = 0; i < n; i++) cells.push(null);
    return {
      id: round.id, level: round.level, a: round.a, b: round.b, op: round.op, frames: round.frames || 1,
      cells: cells, stamp: 'c', step: 1, answer: null, dish: 0,
      misses1: 0, misses2: 0, last1: null, last2: null, showHelp: false, done: false, explore: false
    };
  }
  function newPlay() {
    var st = newState({ id: 'play', level: 'within20', a: 0, b: 0, op: '+', frames: 2 });
    st.explore = true;
    return st;
  }
  /* the stamps on the rack: addition coral + teal, take-away coral + cross, free play all three */
  function rack(st) { return st.explore ? ['c', 't', 'x'] : (st.op === '+' ? ['c', 't'] : ['c', 'x']); }
  function select(st, s) { if (rack(st).indexOf(s) < 0) return false; st.stamp = s; return true; }
  function cap(st) { return st.cells.length; }
  function firstHasRoom(st) { for (var i = 0; i < FRAME; i++) if (st.cells[i] === null) return true; return false; }
  function firstEmpty(st) { for (var i = 0; i < st.cells.length; i++) if (st.cells[i] === null) return i; return -1; }

  /* ---- the hand: press the lifted stamp on cell i ----
     returns what happened: ink · wipe · recolour · cross · uncross · fillFirst · refused · locked */
  function stamp(st, i) {
    if (st.done || (!st.explore && st.step !== 1)) return 'locked';
    if (i < 0 || i >= st.cells.length) return 'refused';
    var s = st.stamp, v = st.cells[i], out;
    if (rack(st).indexOf(s) < 0) return 'refused';
    if (s === 'x') {
      if (v === 'c') out = 'cross'; else if (v === 'cx') out = 'uncross'; else return 'refused';
      st.cells[i] = (v === 'c') ? 'cx' : 'c';
    } else if (v === null) {
      /* the ten-frame convention: the second frame takes ink only once the first is full */
      if (i >= FRAME && firstHasRoom(st)) return 'fillFirst';
      st.cells[i] = s; out = 'ink';
    } else if (v === s) { st.cells[i] = null; out = 'wipe'; }
    else if (v === 'cx') return 'refused';
    else { st.cells[i] = s; out = 'recolour'; }
    st.showHelp = false;
    return out;
  }
  function clear(st) { if (st.done || (!st.explore && st.step !== 1)) return false; for (var i = 0; i < st.cells.length; i++) st.cells[i] = null; st.showHelp = false; return true; }

  function counts(st) {
    var c = 0, t = 0, x = 0;
    for (var i = 0; i < st.cells.length; i++) { var v = st.cells[i]; if (v === 'c') c++; else if (v === 't') t++; else if (v === 'cx') { c++; x++; } }
    return { coral: c, teal: t, cross: x, ink: c + t };
  }

  /* ---- THE TIDY: a permutation into reading order, never a change of counts ----
     addition: coral from the first place; teal from the start of the {b} bracket (at a) unless the
     coral already reach past it, so a coral run that is too short leaves visible empty places.
     take-away: uncrossed coral first, the crossed ones straight after. */
  function tidy(st) {
    var k = counts(st), n = cap(st), out = [], i, start;
    for (i = 0; i < n; i++) out.push(null);
    if (st.op === '+' || st.explore) {
      var tealStart = st.explore ? k.coral : Math.min(Math.max(k.coral - k.cross, st.a), n - k.teal);
      var u = k.coral - k.cross;
      for (i = 0; i < u; i++) out[i] = 'c';
      start = Math.max(u, tealStart);
      for (i = 0; i < k.teal; i++) out[start + i] = 't';
      for (i = 0, start = start + k.teal; i < k.cross; i++) out[start + i] = 'cx';
    } else {
      var un = k.coral - k.cross;
      for (i = 0; i < un; i++) out[i] = 'c';
      for (i = 0; i < k.cross; i++) out[un + i] = 'cx';
      for (i = 0; i < k.teal; i++) out[un + k.cross + i] = 't';
    }
    st.cells = out;
    return out;
  }

  /* the brackets: [from, to) ranges in reading order over the cells, one per number in the equation */
  function brackets(st) {
    var a = st.a, b = st.b;
    if (st.explore) return [];
    if (st.step === 2 || st.done) return st.op === '+' ? [{ key: 'all', from: 0, to: a + b }] : [{ key: 'left', from: 0, to: a - b }];
    return st.op === '+' ? [{ key: 'a', from: 0, to: a }, { key: 'b', from: a, to: a + b }] : [{ key: 'a', from: 0, to: a }, { key: 'b', from: a - b, to: a }];
  }
  /* what each place should hold after a right printing */
  function expected(st, i) {
    if (st.op === '+') return i < st.a ? 'c' : (i < st.a + st.b ? 't' : null);
    return i < st.a - st.b ? 'c' : (i < st.a ? 'cx' : null);
  }
  /* per place, after a Check: ok · empty (a place in a bracket with nothing) · wrong (the wrong ink) · extra (ink outside every bracket) · '' */
  function marks(st) {
    var out = [];
    for (var i = 0; i < st.cells.length; i++) {
      var e = expected(st, i), v = st.cells[i];
      if (e === null) out.push(v === null ? '' : 'extra');
      else if (v === null) out.push('empty');
      else out.push(v === e ? 'ok' : 'wrong');
    }
    return out;
  }

  /* ---- step 1: the equation checks the printing ---- */
  function checkStep1(st) {
    if (st.done || st.explore || st.step !== 1) return null;
    var k = counts(st), res;
    if (k.ink === 0) { res = { ok: false, slip: 'empty' }; st.last1 = res; st.showHelp = true; return res; }
    tidy(st);
    var a = st.a, b = st.b;
    if (st.op === '+') {
      if (k.coral > a) res = { ok: false, slip: 'outside', n: a, k: k.coral - a, g: 'a' };
      else if (k.coral < a) res = { ok: false, slip: 'missing', n: a, k: a - k.coral, g: 'a' };
      else if (k.teal > b) res = { ok: false, slip: 'outside', n: b, k: k.teal - b, g: 'b' };
      else if (k.teal < b) res = { ok: false, slip: 'missing', n: b, k: b - k.teal, g: 'b' };
      else res = { ok: true, slip: 'right' };
    } else {
      if (k.cross === 0) res = { ok: false, slip: 'noCross', n: b, k: b, g: 'b' };
      else if (k.coral > a) res = { ok: false, slip: 'outside', n: a, k: k.coral - a, g: 'a' };
      else if (k.coral < a) res = { ok: false, slip: 'missing', n: a, k: a - k.coral, g: 'a' };
      else if (k.cross < b) res = { ok: false, slip: 'crossMore', n: b, k: b - k.cross, g: 'b' };
      else if (k.cross > b) res = { ok: false, slip: 'crossLess', n: b, k: k.cross - b, g: 'b' };
      else res = { ok: true, slip: 'right' };
    }
    if (res.ok) {
      st.step = 2;
      if (st.op === '-') peel(st);
    } else st.misses1++;
    st.last1 = res; st.showHelp = true;
    return res;
  }
  /* take-away: the crossed counters leave the frame for the away dish; the ones left stay in reading order */
  function peel(st) {
    var moved = 0;
    for (var i = 0; i < st.cells.length; i++) if (st.cells[i] === 'cx') { st.cells[i] = null; moved++; }
    st.dish += moved;
    return moved;
  }
  function answerOf(st) { return result(st.a, st.b, st.op); }
  function maxAnswer(st) { return MAXN[level(st.level)] || 10; }

  /* ---- step 2: how many altogether / left, on the fixed number strip ---- */
  function checkAnswer(st, v) {
    if (st.done || st.explore || st.step !== 2) return null;
    v = Number(v);
    var ans = answerOf(st), res;
    st.answer = v;
    if (v === ans) { res = { ok: true, slip: 'right' }; st.done = true; }
    else {
      st.misses2++;
      if (st.op === '+' && (v === st.a || v === st.b)) res = { ok: false, slip: 'part', n: v };
      else if (st.op === '-' && (v === st.a || v === st.b)) res = { ok: false, slip: 'away', n: v };
      else res = { ok: false, slip: 'count' };
    }
    st.last2 = res; st.showHelp = true;
    return res;
  }
  function help2(st) { return st.done || st.step !== 2 || !st.showHelp ? 0 : Math.min(2, st.misses2); }
  function help1(st) { return st.done || st.step !== 1 || !st.showHelp ? 0 : Math.min(2, st.misses1); }

  /* the numbers on the counters: step 1 miss 2 numbers each bracket's places; step 2 miss 2 counts to "?" on the last
     counter (the help never writes the answer); success numbers every counter in the merged bracket */
  function chips(st) {
    var n = st.cells.length, out = [], i;
    for (i = 0; i < n; i++) out.push('');
    if (st.explore) return out;
    if (st.done) { var ans = answerOf(st); for (i = 0; i < ans; i++) out[i] = i + 1; return out; }
    if (st.step === 2 && help2(st) === 2) { var m = answerOf(st); for (i = 0; i < m - 1; i++) out[i] = i + 1; out[m - 1] = '?'; return out; }
    if (st.step === 1 && help1(st) === 2) {
      var br = brackets(st);
      /* take-away: the 'a' slips count the whole first bracket 1..a, the cross slips count the crossed run 1..b */
      var g = (st.op === '+') ? br : (st.last1 && st.last1.g === 'a' ? [br[0]] : [br[1]]);
      for (var j = 0; j < g.length; j++) for (i = g[j].from; i < g[j].to; i++) out[i] = i - g[j].from + 1;
    }
    return out;
  }

  /* the bubble under the frame: which string, with which numbers */
  function hint(st) {
    if (st.explore) return null;
    if (st.done) return null;
    if (st.step === 1) {
      var r = st.last1;
      if (!r || !st.showHelp) return null;
      if (r.slip === 'empty') return { key: 'hintStart' };
      if (r.slip === 'noCross') return { key: 'hintCross' };
      if (help1(st) >= 2) return { key: (r.slip === 'crossMore' || r.slip === 'crossLess') ? 'hintSlotsX' : 'hintSlots', n: r.n };
      var one = r.k === 1;
      if (r.slip === 'outside') return { key: one ? 'hintOutside1' : 'hintOutsideN', n: r.n, k: r.k };
      if (r.slip === 'missing') return { key: one ? 'hintEmpty1' : 'hintEmptyN', n: r.n, k: r.k };
      if (r.slip === 'crossMore') return { key: one ? 'hintCrossMore1' : 'hintCrossMoreN', n: r.n, k: r.k };
      if (r.slip === 'crossLess') return { key: one ? 'hintCrossLess1' : 'hintCrossLessN', n: r.n, k: r.k };
      return null;
    }
    var q = st.last2;
    if (!q || !st.showHelp) return { key: st.op === '+' ? 'askAdd' : 'askSub', a: st.a, b: st.b };
    if (help2(st) >= 2) return { key: 'hintNumbers' };
    if (q.slip === 'part') return { key: 'hintPart', n: q.n };
    if (q.slip === 'away') return { key: 'hintAway' };
    return { key: 'hintCountAll' };
  }

  /* the success line: the dots wording only when both addends show as dots and neither is 1 ("1 dots") */
  function celebrateKey(round, show) {
    if (round.op === '-') return result(round.a, round.b, round.op) === 1 ? 'celebrateSub1' : 'celebrateSub';
    if (show === 'dots' && round.a >= 2 && round.b >= 2 && round.a <= 10 && round.b <= 10) return 'celebrateDots';
    return 'celebrateAdd';
  }

  /* free play: the equation writes itself from what is stamped */
  function liveEquation(st) {
    var k = counts(st), terms = [];
    if (k.coral) terms.push({ v: k.coral, kind: 'c' });
    if (k.teal) terms.push({ v: k.teal, kind: 't', op: '+' });
    if (k.cross) terms.push({ v: k.cross, kind: 'x', op: '-' });
    return { terms: terms, total: k.coral + k.teal - k.cross };
  }

  /* ---- dots: a die face up to 6, a domino (two halves) 7..10; pips on a 3 × 3 grid (0..8) ---- */
  var DIE = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  var DOMINO = { 7: [4, 3], 8: [4, 4], 9: [5, 4], 10: [5, 5] };
  function dots(n) {
    if (n >= 1 && n <= 6) return [DIE[n].slice()];
    if (DOMINO[n]) return [DIE[DOMINO[n][0]].slice(), DIE[DOMINO[n][1]].slice()];
    return null;
  }

  /* ---- layout ----
     W = the stage content width. 'wide' (≥ 560): the frame(s) centred and big (places ≤ 80, ≤ 72 for
     two frames so Check stays in the 1366 × 900 fold), the away dish beside them in take-away rounds
     only (SIDE); the note, then the rack or the number strip, full width under them — the strip one
     number line of ten keys (two rows within 20). 'narrow': everything stacked, the strip in rows of
     five; two frames take 46 px places so the 1–20 strip stays in the 360 × 740 fold. */
  var PAD = 12, GAP = 6, SIDE = 136;
  function layout(W, nFrames, maxN, sub) {
    nFrames = nFrames || 1; maxN = maxN || 10;
    var wide = W >= 560, cell, key, perRow, side = wide && sub ? SIDE : 0;
    if (wide) cell = Math.min(nFrames === 2 ? 72 : 80, Math.floor((W - side - (side ? 16 : 0) - 2 * PAD - 4 * GAP) / 5));
    else cell = Math.min(nFrames === 2 ? 46 : 56, Math.floor((W - 2 * PAD - 4 * GAP) / 5));
    perRow = wide ? 10 : 5;
    key = Math.min(56, Math.floor((W - (perRow - 1) * 6) / perRow));
    var rows = Math.ceil(maxN / perRow);
    var keyH = wide ? 52 : (rows > 2 ? 44 : 48);
    return { mode: wide ? 'wide' : 'narrow', cell: cell, pad: PAD, gap: GAP, side: side, key: key, keyH: keyH, perRow: perRow, rows: rows, num: wide ? 48 : 38, box: wide ? 56 : 48 };
  }
  /* where place i sits: frame, row, column (reading order: the first line of five, then the second) */
  function place(i) { var f = Math.floor(i / FRAME), j = i % FRAME; return { frame: f, row: Math.floor(j / LINE), col: j % LINE }; }

  var api = {
    FRAME: FRAME, LINE: LINE, LEVELS: LEVELS, SHOWS: SHOWS, POOLS: POOLS, MAXN: MAXN,
    rng: rng, level: level, frames: frames, result: result, rounds: rounds, orderOk: orderOk, order: order,
    newState: newState, newPlay: newPlay, rack: rack, select: select, stamp: stamp, clear: clear, counts: counts,
    firstEmpty: firstEmpty, firstHasRoom: firstHasRoom, tidy: tidy, brackets: brackets, expected: expected, marks: marks,
    checkStep1: checkStep1, peel: peel, answerOf: answerOf, maxAnswer: maxAnswer, checkAnswer: checkAnswer,
    help1: help1, help2: help2, chips: chips, hint: hint, celebrateKey: celebrateKey, liveEquation: liveEquation, dots: dots, layout: layout, place: place
  };
  global.StampFrameCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
