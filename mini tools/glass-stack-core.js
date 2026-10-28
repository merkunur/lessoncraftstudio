/* =====================================================================
   glass-stack-core.js — the model of THE GLASS STACK (row 148, "Comet's
   Big Leaps", 2.NBT.B.8; G1-131, G1-132, G2-226, G2-321/322/323).
   Pure, no DOM.
   Design: docs/activities-rebuild/designs/148-comet-kangaroo.md
   ---------------------------------------------------------------------
   The numbers 0–999 live in a stack of ten glass hundred-charts. On a
   sheet, row = the tens digit and column = the ones digit; the sheet is
   the hundreds digit. So one more is a step across, ten more a step
   down, and a hundred more the very same square one sheet deeper — each
   digit is a direction. Falling off a sheet's bottom edge lands on the
   next sheet's top row: 296 + 10 = 306. The child types where Comet will
   land BEFORE she leaps; a wrong number plants a flag where THAT number
   lives, and the axis it is off on is the diagnosis.
   Faces: 1 and 10 (one sheet) · 10 and 100 (default, the frozen nine +
   two wraps) · arrow trails (follow / mystery square / how far).
   ===================================================================== */
(function (root) {
  'use strict';

  var COMET = 'zoo animals/kangaroo';
  var STEP = { R: 1, L: -1, D: 10, U: -10, DIVE: 100, RISE: -100 };
  /* 1 and 10 (G1-131 / G1-132): one sheet; two of each leap, two row wraps */
  var SMALL = [[47, 10], [35, 10], [63, -10], [91, -10], [29, 1], [58, 1], [80, -1], [64, -1]];
  /* 10 and 100 (default): the old nine + two that cross a hundred; bands 1 (#0–2), 2 (#3–5), 3 (#6–10) */
  var BIG = [[247, 10], [362, -10], [415, 100], [683, -100], [538, 10], [271, -10], [326, 100], [754, -100], [489, 10], [296, 10], [602, -10]];
  var BIG_BAND = [1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3];
  /* arrow trails (G2-321 follow, G2-322 mystery square, G2-323 how far) */
  var TRAILS = [
    { kind: 'follow', a: 34, chips: ['D', 'D', 'R'] },
    { kind: 'follow', a: 68, chips: ['U', 'L', 'L'] },
    { kind: 'follow', a: 21, chips: ['D', 'R', 'R', 'D'] },
    { kind: 'follow', a: 79, chips: ['L', 'U', 'U'] },
    { kind: 'follow', a: 145, chips: ['DIVE', 'R'] },
    { kind: 'mystery', a: 38, ca: 'D', b: 47, cb: 'R' },
    { kind: 'mystery', a: 82, ca: 'U', b: 73, cb: 'L' },
    { kind: 'far', a: 23, b: 57 },
    { kind: 'far', a: 36, b: 58 },
    { kind: 'mystery', a: 15, ca: 'D', b: 26, cb: 'L' },
    { kind: 'far', a: 14, b: 76 },
    { kind: 'far', a: 52, b: 83 }
  ];

  function faceOf(v) { return v === 'small' || v === 'trails' ? v : 'big'; }
  function addr(n) { return { sheet: Math.floor(n / 100), row: Math.floor(n / 10) % 10, col: n % 10 }; }
  function inRange(n) { return n >= 0 && n <= 999 && n === Math.floor(n); }
  /* the arithmetic IS the geometry: off the bottom row of a sheet is n + 10 crossing a hundred */
  function step(n, dir) { return n + STEP[dir]; }
  function trail(n, chips) { var p = [n]; chips.forEach(function (c) { n = step(n, c); p.push(n); }); return p; }
  function howFar(a, b) { var A = addr(a), B = addr(b); return { down: B.row - A.row + 10 * (B.sheet - A.sheet), right: B.col - A.col }; }
  /* the diagnosis: which axes a claim is off on, with direction */
  function offset(claim, truth) { var c = addr(claim), t = addr(truth); return { dSheet: c.sheet - t.sheet, dRow: c.row - t.row, dCol: c.col - t.col }; }
  function leapDir(leap) { return leap === 1 ? 'R' : leap === -1 ? 'L' : leap === 10 ? 'D' : leap === -10 ? 'U' : leap === 100 ? 'DIVE' : 'RISE'; }

  function rounds(face) {
    face = faceOf(face);
    if (face === 'trails') return TRAILS.map(function (t, i) { var r = Object.assign({ k: i }, t); r.answer = answerOf(r); return r; });
    return (face === 'small' ? SMALL : BIG).map(function (r, i) { var o = { k: i, kind: 'leap', a: r[0], leap: r[1], band: face === 'big' ? BIG_BAND[i] : 1 }; o.answer = answerOf(o); return o; });
  }
  function answerOf(r) {
    if (r.kind === 'leap') return r.a + r.leap;
    if (r.kind === 'follow') { var p = trail(r.a, r.chips); return p[p.length - 1]; }
    if (r.kind === 'mystery') return step(r.a, r.ca);
    return howFar(r.a, r.b);
  }
  /* a wrap: the landing leaves the start's row (±1) or the start's sheet (±10) */
  function isWrap(r) {
    if (r.kind !== 'leap') return false;
    var s = addr(r.a), t = addr(r.answer);
    return Math.abs(r.leap) === 1 ? s.row !== t.row : Math.abs(r.leap) === 10 ? s.sheet !== t.sheet : false;
  }
  /* which place a leap changes (for the success line) */
  function placeOf(r) { var L = Math.abs(r.leap); return L === 1 ? 'ones' : L === 10 ? 'tens' : 'hundreds'; }

  /* ---------- state ---------- */
  function newState(face, k) {
    face = faceOf(face);
    var r = rounds(face)[k];
    return { face: face, k: k, round: r, token: r.a, token2: r.kind === 'mystery' ? r.b : null, leapt: false, typed: '', typed2: '', box: 1, flag: null, misses: 0, help: false, verdict: null, done: false, moved: false, visited: [r.a] };
  }
  function type(st, d) {
    if (st.done) return false;
    var two = st.round.kind === 'far', key = two && st.box === 2 ? 'typed2' : 'typed', max = two ? 1 : 4;
    if (d === 'del') { if (!st[key]) return false; st[key] = st[key].slice(0, -1); clearMarks(st); return true; }
    if (!/^[0-9]$/.test(d) || st[key].length >= max || (d === '0' && !st[key] && !two)) return false;
    st[key] += d; clearMarks(st);
    return true;
  }
  function setBox(st, b) { if (st.done || st.round.kind !== 'far' || (b !== 1 && b !== 2)) return false; st.box = b; return true; }
  function clearMarks(st) { st.verdict = null; st.flag = null; }
  /* Check: nothing typed is a note; otherwise the leap happens (once) and the claim is planted as a flag */
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (r.kind === 'far') {
      if (!st.typed || !st.typed2) return { result: 'note', key: 'hintTypeFar' };
      var d = +st.typed, rr = +st.typed2;
      st.leapt = true; st.token = r.b;
      if (d === r.answer.down && rr === r.answer.right) { st.done = true; st.verdict = null; return { result: 'ok' }; }
      st.misses++; st.help = st.misses >= 2; st.verdict = { far: true, downOk: d === r.answer.down, rightOk: rr === r.answer.right };
      return { result: 'miss' };
    }
    if (!st.typed) return { result: 'note', key: 'hintType' };
    var claim = +st.typed, truth = r.answer;
    st.leapt = true; st.token = truth; if (r.kind === 'mystery') st.token2 = truth;
    st.flag = claim;
    if (claim === truth) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { off: inRange(claim) ? offset(claim, truth) : null, outside: !inRange(claim) };
    if (st.help) { st.token = r.a; st.token2 = r.kind === 'mystery' ? r.b : null; st.visited = [r.a]; st.moved = false; }
    return { result: 'miss', off: st.verdict.off, outside: st.verdict.outside };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    if (!st.verdict) return null;
    var r = st.round;
    if (st.help) return 'hintMove';
    if (st.verdict.outside) return 'hintNoSheet';
    if (r.kind === 'far') return 'hintFar';
    if (r.kind !== 'leap') return 'hintTrail';
    if (isWrap(r)) return Math.abs(r.leap) === 1 ? 'hintRowEnd' : 'hintEdge';
    return 'hintAxis';
  }
  /* miss 2 / free play: the child moves Comet one step at a time (never off the stack) */
  function move(st, dir) {
    if (st.done && st.face !== 'free') return false;
    if (!st.help) return false;
    var n = step(st.token, dir);
    if (!inRange(n) || (st.face === 'small' && addr(n).sheet !== 0)) return false;
    st.token = n; st.moved = true; if (st.visited.indexOf(n) < 0) st.visited.push(n);
    return true;
  }
  /* miss 2: tap a spine edge — Comet goes to the same square on that sheet */
  function dive(st, sheet) {
    if (st.done || !st.help || st.face === 'small' || sheet < 0 || sheet > 9 || sheet === Math.floor(st.token / 100)) return false;
    st.token = sheet * 100 + (st.token % 100); st.moved = true; if (st.visited.indexOf(st.token) < 0) st.visited.push(st.token);
    return true;
  }
  /* the cells the leap or trail passes through, start to landing (miss 2 clears them) */
  function path(r) {
    if (r.kind === 'leap') { var dir = leapDir(r.leap); return [r.a, step(r.a, dir)]; }
    if (r.kind === 'follow') return trail(r.a, r.chips);
    if (r.kind === 'mystery') return [r.a, r.b, r.answer];
    var p = [r.a], n = r.a, h = howFar(r.a, r.b), i;
    for (i = 0; i < h.down; i++) { n += 10; p.push(n); }
    for (i = 0; i < Math.abs(h.right); i++) { n += h.right > 0 ? 1 : -1; p.push(n); }
    return p;
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* order-only reshuffle: inside bands (10-and-100), never the same order twice, two wraps never back to back */
  function plan(face, rnd, prev) {
    rnd = rnd || Math.random; face = faceOf(face);
    var R = rounds(face);
    for (var a = 0; a < 2000; a++) {
      var o;
      if (face === 'big') { o = []; [1, 2, 3].forEach(function (b) { o = o.concat(shuffle(R.filter(function (r) { return r.band === b; }).map(function (r) { return r.k; }), rnd)); }); }
      else o = shuffle(R.map(function (r) { return r.k; }), rnd);
      var bad = false; for (var i = 1; i < o.length; i++) if (isWrap(R[o[i]]) && isWrap(R[o[i - 1]])) bad = true;
      if (bad) continue;
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: R.map(function (r) { return r.k; }) };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { COMET: COMET, STEP: STEP, SMALL: SMALL, BIG: BIG, BIG_BAND: BIG_BAND, TRAILS: TRAILS, faceOf: faceOf, addr: addr, inRange: inRange, step: step, trail: trail, howFar: howFar, offset: offset, leapDir: leapDir, rounds: rounds, answerOf: answerOf, isWrap: isWrap, placeOf: placeOf, newState: newState, type: type, setBox: setBox, check: check, hint: hint, move: move, dive: dive, path: path, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.GlassStackCore = api;
})(typeof window !== 'undefined' ? window : this);
