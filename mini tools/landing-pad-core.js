/* =====================================================================
   landing-pad-core.js — the model of ACTIVITY #157 of the one-by-one
   rebuild: "Hopper's Number Line" → THE SPRING AND THE LANDING PAD
   (2.MD.B.6). Pure, no DOM.
   Design: docs/activities-rebuild/designs/157-hoppers-number-line.md
   ---------------------------------------------------------------------
   The number line is a row of equally spaced stones across a pond. The
   child puts Hopper on the story's start stone, turns him the way the
   story goes, loads his spring with ten-coils and one-coils (the hop
   size, built as tens and ones), and floats a lily pad where they PREDICT
   he will land. On Check he hops one arc per coil — every arc from one
   stone to another, so the start is never counted — and lands on the pad
   or splashes into the pond. Equal hops (level 3) repeat the same spring
   k times: a product from 0, or a count of hops back to the bank.
   The landing is never stored: it is derived from the story numbers.
   ===================================================================== */
(function (root) {
  'use strict';
  /* level 1 — 0..20: [start, size, +1 forward | -1 back] */
  var L20 = [[6, 8, 1], [16, 6, -1], [3, 9, 1], [18, 9, -1], [11, 7, 1], [14, 8, -1], [4, 12, 1], [20, 13, -1], [8, 5, 1]];
  /* level 2 — within 100: [line low, line high, step, start, size, dir] (the last two on the tens line) */
  var L100 = [[40, 60, 1, 43, 12, 1], [40, 60, 1, 58, 14, -1], [60, 80, 1, 62, 15, 1], [60, 80, 1, 79, 16, -1], [80, 100, 1, 81, 13, 1], [80, 100, 1, 97, 11, -1],
    [40, 60, 1, 47, 9, 1], [60, 80, 1, 76, 8, -1], [80, 100, 1, 83, 10, 1], [0, 100, 10, 30, 40, 1], [0, 100, 10, 80, 50, -1]];
  /* level 3 — equal hops on 0..24: ['mul', hops k, size n] from 0 · ['div', start s, size n] back to the bank */
  var LEQ = [['mul', 4, 3], ['div', 12, 3], ['mul', 5, 4], ['div', 20, 4], ['mul', 7, 2], ['div', 18, 6], ['mul', 3, 5], ['div', 16, 2], ['mul', 3, 6], ['div', 24, 4], ['mul', 7, 3], ['mul', 6, 4]];

  function levelOf(v) { v = String(v); return v === '100' ? '100' : v === 'eq' ? 'eq' : '20'; }
  function rounds(level) {
    level = levelOf(level);
    if (level === '20') return L20.map(function (x, i) { return { k: i, level: level, kind: x[2] > 0 ? 'add' : 'sub', lo: 0, hi: 20, step: 1, start: x[0], size: x[1], dir: x[2], count: 1, answer: x[0] + x[2] * x[1] }; });
    if (level === '100') return L100.map(function (x, i) { return { k: i, level: level, kind: x[5] > 0 ? 'add' : 'sub', lo: x[0], hi: x[1], step: x[2], start: x[3], size: x[4], dir: x[5], count: 1, answer: x[3] + x[5] * x[4] }; });
    return LEQ.map(function (x, i) {
      if (x[0] === 'mul') return { k: i, level: level, kind: 'mul', lo: 0, hi: 24, step: 1, start: 0, size: x[2], dir: 1, count: x[1], answer: x[1] * x[2] };
      return { k: i, level: level, kind: 'div', lo: 0, hi: 24, step: 1, start: x[1], size: x[2], dir: -1, count: x[1] / x[2], answer: x[1] / x[2] };
    });
  }
  /* the stones of a round's line */
  function stones(r) { var out = []; for (var v = r.lo; v <= r.hi; v += r.step) out.push(v); return out; }
  function onLine(r, v) { return v >= r.lo && v <= r.hi && (v - r.lo) % r.step === 0; }

  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, frogAt: null, facing: 1, coils: [], count: 1, countSet: r.level !== 'eq',
      padAt: r.kind === 'div' ? r.lo : null, misses: 0, help: false, verdict: null, done: false };
  }
  function clear(st) { if (!st.done) st.verdict = null; }
  function placeFrog(st, v) { var r = st.round; if (st.done) return false;
    v = Math.round(+v); if (!(v === v)) return false; v = Math.max(r.lo, Math.min(r.hi, r.lo + Math.round((v - r.lo) / r.step) * r.step));
    if (st.frogAt === v) return false; st.frogAt = v; clear(st); return true; }
  function turn(st) { if (st.done) return false; st.facing = -st.facing; clear(st); return true; }
  function tens(st) { return st.coils.filter(function (c) { return c === 10; }).length; }
  function ones(st) { return st.coils.filter(function (c) { return c === 1; }).length; }
  /* the spring: up to nine ten-coils and nine one-coils; on the tens line a one-coil has no stone to land on */
  function addCoil(st, c) {
    if (st.done) return false;
    c = c === 10 ? 10 : 1;
    if (c === 1 && st.round.step === 10) return false;
    if ((c === 10 ? tens(st) : ones(st)) >= 9) return false;
    st.coils.push(c); clear(st); return true;
  }
  function undoCoil(st) { if (st.done || !st.coils.length) return false; st.coils.pop(); clear(st); return true; }
  function size(st) { var s = 0; st.coils.forEach(function (c) { s += c; }); return s; }
  function setCount(st, n) { if (st.done || st.round.level !== 'eq') return false; n = Math.max(1, Math.min(9, Math.round(+n))); if (st.count === n && st.countSet) return false; st.count = n; st.countSet = true; clear(st); return true; }
  function placePad(st, v) {
    var r = st.round; if (st.done || r.kind === 'div') return false;
    if (v === null) { if (st.padAt === null) return false; st.padAt = null; clear(st); return true; }
    v = Math.round(+v); if (!(v === v)) return false; v = Math.max(r.lo, Math.min(r.hi, r.lo + Math.round((v - r.lo) / r.step) * r.step));
    if (st.padAt === v) return false; st.padAt = v; clear(st); return true;
  }
  /* the hops Hopper makes with the spring as it is: tens first, then ones, once per hop count — every arc from a stone to the next landing */
  function run(st) {
    var at = st.frogAt, stops = [at], order = st.coils.slice().sort(function (a, b) { return b - a; });
    for (var h = 0; h < st.count; h++) order.forEach(function (c) { at += st.facing * c; stops.push(at); });
    return { stops: stops, final: at };
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (st.frogAt === null) return { result: 'note', key: 'hintFrog' };
    if (!st.coils.length) return { result: 'note', key: 'hintLoad' };
    if (!st.countSet) return { result: 'note', key: 'hintMarks' };
    if (st.padAt === null) return { result: 'note', key: 'hintPad' };
    if (st.frogAt !== r.start) { st.misses++; st.help = st.misses >= 2; st.verdict = { kind: 'start' }; return { result: 'miss', kind: 'start' }; }
    var R = run(st), dirOk = st.facing === r.dir, sizeOk = size(st) === r.size, countOk = st.count === r.count;
    var onPad = R.final === st.padAt, right = dirOk && sizeOk && countOk;
    if (onPad && right) { st.done = true; st.verdict = null; return { result: 'ok', final: R.final }; }
    var why = !dirOk ? 'direction' : !sizeOk ? 'load' : !countOk ? 'count' : 'pad';
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { kind: onPad ? 'sink' : 'splash', why: why, final: R.final, stops: R.stops };
    return { result: 'miss', kind: st.verdict.kind, why: why };
  }
  /* the true path (miss 2 draws it as dotted hops; its last stone is never named) */
  function truePath(r) {
    var at = r.start, stops = [at], order = [], s = r.size;
    for (var t = 0; t < Math.floor(s / 10); t++) order.push(10);
    for (var o = 0; o < s % 10; o++) order.push(1);
    for (var h = 0; h < r.count; h++) order.forEach(function (c) { at += r.dir * c; stops.push(at); });
    return stops;
  }
  /* the label a child counts from for a start off the labels */
  function nearestLabel(r, every) { var best = null; stones(r).forEach(function (v) { if (labelled(r, v, every) && (best === null || Math.abs(v - r.start) < Math.abs(best - r.start))) best = v; }); return best; }
  /* which stones carry their numeral: 'some' = every 2nd (levels 1 and 3) · every 5th (level 2); 'every' · 'ten'; the ends always; the tens line labels every stone */
  function labelled(r, v, every) {
    if (r.step === 10) return true;
    var e = every === 'every' ? 1 : every === 'ten' ? 10 : r.level === '100' ? 5 : 2;
    return v === r.lo || v === r.hi || v % e === 0;
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st, every) {
    var v = st.verdict; if (!v) return null;
    if (v.kind === 'start') return labelled(st.round, st.round.start, every) ? 'hintStartFind' : 'hintStart';
    if (st.help) return 'hintGhost';
    if (v.why === 'direction') return 'hintDir';
    if (v.why === 'load') return 'hintLoadWrong';
    if (v.why === 'count') return st.round.kind === 'div' ? 'hintBank' : 'hintCountWrong';
    return 'hintPadOff';
  }
  function storyKey(r) { return 's_' + r.kind; }
  function okKey(r) { return 'ok_' + r.kind; }
  /* the success line's numbers */
  function okArgs(r) {
    if (r.kind === 'mul') { var parts = []; for (var i = 0; i < r.count; i++) parts.push(r.size); return { k: r.count, n: r.size, sum: parts.join(' + '), e: r.answer }; }
    if (r.kind === 'div') return { s: r.start, n: r.size, k: r.answer };
    return { s: r.start, n: r.size, e: r.answer };
  }

  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* level 3 never puts three rounds of one kind in a row */
  function runsOk(level, o) { var R = rounds(level); if (levelOf(level) !== 'eq') return true; for (var i = 2; i < o.length; i++) if (R[o[i]].kind === R[o[i - 1]].kind && R[o[i]].kind === R[o[i - 2]].kind) return false; return true; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = rounds(level).map(function (r) { return r.k; });
    for (var tries = 0; tries < 500; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c; }
    return prev && prev.join() === ks.join() ? ks.slice().reverse() : ks.slice();
  }

  var api = { levelOf: levelOf, rounds: rounds, stones: stones, onLine: onLine, newState: newState, placeFrog: placeFrog, turn: turn, tens: tens, ones: ones, addCoil: addCoil, undoCoil: undoCoil,
    size: size, setCount: setCount, placePad: placePad, run: run, check: check, truePath: truePath, nearestLabel: nearestLabel, labelled: labelled, hint: hint, storyKey: storyKey, okKey: okKey,
    okArgs: okArgs, passSize: passSize, runsOk: runsOk, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LandingPadCore = api;
})(typeof window !== 'undefined' ? window : this);
