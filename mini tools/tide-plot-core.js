/* =====================================================================
   tide-plot-core.js — the model of ACTIVITY #167 of the one-by-one
   rebuild: "Shelly's Tide-Line — Measurement Line Plots"
   → THE TIDE YOU PUSH (2.MD.D.9). Pure, no DOM.
   Design: docs/activities-rebuild/designs/167-line-plot.md
   ---------------------------------------------------------------------
   A line plot drawn on a beach. The child reads it by pushing the sea in
   from the left and right shores (they stop only in the gaps between
   numbers) or raising the sea level row by row, until only the shells
   the question is about stay dry — then answers. The tide is checked
   first: "longer than 5" with the 5 still dry is a miss even when the
   number is right. In the measure rounds a real shell is measured on a
   ruler (it does not always arrive at 0) and dropped as an X.
   All lengths are in HALF-centimetres (hu): 5 cm = 10 hu, 4½ cm = 9 hu.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['read', 'measure', 'halves'];
  var cm = function (a) { return a.map(function (x) { return Math.round(x * 2); }); };
  /* the beaches: whole centimetres 1–8 (read), 2–8 (measure), halves 2–6 */
  var BEACH = { read: cm([1, 2, 3, 4, 5, 6, 7, 8]), measure: cm([2, 3, 4, 5, 6, 7, 8]), halves: cm([2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]) };
  var D1 = cm([2, 3, 5, 5, 5, 6, 8]), D3 = cm([2, 2, 4, 6, 6, 6, 7]), D4 = cm([3, 3, 4, 4, 4, 6, 8]), D5 = cm([2, 4, 5, 5, 7, 7, 7, 8]);
  var Q = function (data, kind, a, b) { return { kind: kind, data: data, n: a == null ? null : a * 2, b: b == null ? null : b * 2 }; };
  /* level "Read the tide-line" (design §6, the three old data sets' questions kept) */
  var READ = [Q(D1, 'at', 5), Q(D4, 'at', 4), Q(D1, 'longer', 4), Q(D5, 'shorter', 5), Q(D3, 'mode'), Q(D4, 'mode'), Q(D1, 'range'), Q(D3, 'range'), Q(D1, 'more', 5, 6), Q(D5, 'more', 7, 5)];
  /* level "Measure and plot": four shells already on the plot, two new shells (length, arrival offset of the left edge) */
  var M = function (plot, s1, s2) { return { kind: 'measure', data: cm(plot), shells: [s1, s2].map(function (s) { return { len: s[0] * 2, off: s[1] * 2 }; }) }; };
  var MEASURE = [M([3, 4, 4, 6], [5, 1], [6, 0]), M([2, 5, 5, 7], [4, 2], [4, 1]), M([3, 3, 6, 8], [7, 0], [5, 2]), M([4, 5, 6, 6], [6, 1], [3, 1]),
    M([2, 3, 7, 7], [3, 2], [7, 0]), M([4, 4, 5, 8], [5, 1], [6, 2]), M([3, 5, 6, 7], [6, 0], [4, 1]), M([2, 4, 6, 6], [7, 2], [5, 0])];
  /* level "Halves" (G3-335): four measure rounds of one shell, four read rounds on a half-centimetre beach */
  var H1 = function (plot, len, off) { return { kind: 'measure', data: cm(plot), shells: [{ len: len * 2, off: off * 2 }] }; };
  var HA = cm([2.5, 3, 3.5, 3.5, 4, 4.5, 4.5, 4.5, 5.5]), HB = cm([3, 3, 3.5, 4, 4, 4, 5, 6]);
  var HALVES = [H1([3, 3.5, 4, 4, 5], 4.5, 1), H1([2.5, 3, 3, 4.5, 5], 3.5, 0), H1([3.5, 4, 4, 5, 5.5], 2.5, 1), H1([3, 4, 4.5, 5, 6], 5, 1),
    { kind: 'at', data: HA, n: 9, b: null }, { kind: 'at', data: HB, n: 6, b: null }, { kind: 'longer', data: HA, n: 8, b: null }, { kind: 'mode', data: HB, n: null, b: null }];
  var POOL = { read: READ, measure: MEASURE, halves: HALVES };
  /* the ruler under the measuring board: 0–9 cm (whole) or 0–6 cm (halves) */
  var RULER = { measure: 18, halves: 12 };

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'read'; }
  function rounds(level) { level = levelOf(level); return POOL[level].map(function (r, i) { var o = { k: i, level: level }; for (var p in r) o[p] = r[p]; return o; }); }
  function beach(level) { return BEACH[levelOf(level)]; }
  function count(data, v) { var c = 0; for (var i = 0; i < data.length; i++) if (data[i] === v) c++; return c; }
  function maxOf(a) { return Math.max.apply(null, a); } function minOf(a) { return Math.min.apply(null, a); }
  /* the most common length (unique by construction — the gate checks) */
  function mode(data) { var best = null, bc = 0; data.forEach(function (v) { var c = count(data, v); if (c > bc) { bc = c; best = v; } }); return best; }
  /* the right answer of a read round: a count (pebble 1–8) or, for the mode, a length on the sand */
  function answerOf(r) {
    var d = r.data;
    if (r.kind === 'at') return count(d, r.n);
    if (r.kind === 'longer') return d.filter(function (v) { return v > r.n; }).length;
    if (r.kind === 'shorter') return d.filter(function (v) { return v < r.n; }).length;
    if (r.kind === 'mode') return mode(d);
    if (r.kind === 'range') return (maxOf(d) - minOf(d)) / 2;
    if (r.kind === 'more') return count(d, r.n) - count(d, r.b);
    return null;
  }

  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    var st = { level: levelOf(level), k: r.k, round: r, cols: beach(level).slice(), tide: { L: 0, R: 0, S: 0 }, answer: null,
      misses: 0, help: false, verdict: null, done: false, shells: null };
    if (r.kind === 'measure') st.shells = r.shells.map(function (s) { return { len: s.len, off: s.off, pos: s.off * 5, col: null, droppedAt: null }; });
    return st;
  }
  /* the X's: { v (length), i (column), row (1 at the sand) } — the plot's own, then the measured shells dropped this round */
  function xs(st) {
    var out = [], h = {};
    var put = function (v, mine) { var i = st.cols.indexOf(v); if (i < 0) return; h[i] = (h[i] || 0) + 1; out.push({ v: v, i: i, row: h[i], mine: !!mine }); };
    st.round.data.slice().sort(function (a, b) { return a - b; }).forEach(function (v) { put(v, false); });
    (st.shells || []).forEach(function (s) { if (s.col != null) put(s.col, true); });
    return out;
  }
  function heights(st) { var h = st.cols.map(function () { return 0; }); xs(st).forEach(function (x) { h[x.i] = Math.max(h[x.i], x.row); }); return h; }
  /* an X is dry when it is between the two shores and above the sea level */
  function isDry(st, x) { var t = st.tide, n = st.cols.length; return x.i >= t.L && x.i < n - t.R && x.row > t.S; }
  function dry(st) { return xs(st).filter(function (x) { return isDry(st, x); }); }
  function key(list) { return list.map(function (x) { return x.i + ':' + x.row; }).sort().join(','); }
  /* the X's a question is about (the set that must stay dry) */
  function wanted(st) {
    var r = st.round, all = xs(st);
    if (r.kind === 'at') return all.filter(function (x) { return x.v === r.n; });
    if (r.kind === 'longer') return all.filter(function (x) { return x.v > r.n; });
    if (r.kind === 'shorter') return all.filter(function (x) { return x.v < r.n; });
    if (r.kind === 'more') return all.filter(function (x) { return x.v === r.n && x.row > count(r.data, r.b); });
    return null;
  }
  /* is the tide right for the question? (a dry set for the counting kinds; one stack poking out for the mode; both shores touching for the range) */
  function tideRight(st) {
    var r = st.round, t = st.tide, n = st.cols.length;
    if (r.kind === 'mode') { var d = dry(st), m = st.cols.indexOf(mode(r.data)); return d.length > 0 && d.every(function (x) { return x.i === m; }); }
    if (r.kind === 'range') return t.L === st.cols.indexOf(minOf(r.data)) && t.R === n - 1 - st.cols.indexOf(maxOf(r.data)) && t.S === 0;
    return key(dry(st)) === key(wanted(st));
  }
  /* the tide that answers the question (miss 2 moves the sea there) */
  function canonicalTide(st) {
    var r = st.round, n = st.cols.length, ix = function (v) { return st.cols.indexOf(v); };
    if (r.kind === 'at') return { L: ix(r.n), R: n - 1 - ix(r.n), S: 0 };
    if (r.kind === 'longer') return { L: ix(r.n) + 1, R: 0, S: 0 };
    if (r.kind === 'shorter') return { L: 0, R: n - ix(r.n), S: 0 };
    if (r.kind === 'range') return { L: ix(minOf(r.data)), R: n - 1 - ix(maxOf(r.data)), S: 0 };
    if (r.kind === 'more') return { L: ix(r.n), R: n - 1 - ix(r.n), S: count(r.data, r.b) };
    if (r.kind === 'mode') { var h = heights(st).slice().sort(function (a, b) { return b - a; }); return { L: 0, R: 0, S: h[1] }; }
    return { L: 0, R: 0, S: 0 };
  }
  function changed(st) { st.verdict = null; }
  /* the shores stop only in the gaps between numbers; they never cross */
  function setShore(st, side, v) {
    if (st.done) return false;
    var n = st.cols.length, t = st.tide;
    v = Math.max(0, Math.min(n, Math.round(v)));
    if (side === 'L') v = Math.min(v, n - t.R); else v = Math.min(v, n - t.L);
    if (t[side] === v) return false;
    t[side] = v; changed(st); return true;
  }
  function setSea(st, v) {
    if (st.done) return false;
    var top = Math.max.apply(null, heights(st));
    v = Math.max(0, Math.min(top, Math.round(v)));
    if (st.tide.S === v) return false;
    st.tide.S = v; changed(st); return true;
  }
  function choose(st, a) { if (st.done || st.answer === a) return false; st.answer = a; changed(st); return true; }
  /* ---- the measuring board ---- */
  function boardShell(st) { if (!st.shells) return null; for (var i = 0; i < st.shells.length; i++) if (st.shells[i].col == null) return i; return null; }
  /* slide the shell on the ruler (pos = its left edge in millimetres); it snaps to the stop within 3 mm */
  function slide(st, mm) {
    var i = boardShell(st); if (st.done || i == null) return false;
    var s = st.shells[i], max = RULER[st.level] * 5 - s.len * 5;
    mm = Math.max(0, Math.min(max, Math.round(mm)));
    if (mm <= 3) mm = 0;
    if (s.pos === mm) return false;
    s.pos = mm; changed(st); return true;
  }
  /* drop the board's shell as an X: it lands on a number of the beach, never between */
  function drop(st, v) {
    var i = boardShell(st); if (st.done || i == null || st.cols.indexOf(v) < 0) return null;
    var s = st.shells[i]; s.col = v; s.droppedAt = s.pos; changed(st); return i;
  }
  /* a dropped shell flies back to the board, where it was measured */
  function undrop(st, i) {
    var s = st.shells && st.shells[i]; if (st.done || !s || s.col == null) return false;
    s.col = null; s.pos = s.droppedAt == null ? s.pos : s.droppedAt; changed(st); return true;
  }
  /* where the shell's right edge ends on the ruler — what a child reads (it equals the length only from the stop) */
  function edgeAt(s) { return s.pos / 5 + s.len; }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, t = st.tide;
    if (r.kind === 'measure') {
      if (boardShell(st) != null) return { result: 'note', key: st.shells.some(function (s) { return s.col != null; }) ? 'hintNextShell' : 'hintMeasureFirst' };
      if (st.verdict) return { result: 'note', key: 'hintAgain' };
      var wrong = st.shells.filter(function (s) { return s.col !== s.len; });
      if (!wrong.length) { st.done = true; return { result: 'ok' }; }
      st.misses++; st.help = st.misses >= 2;
      var unzeroed = wrong.some(function (s) { return s.droppedAt !== 0; });
      wrong.forEach(function (s) { s.col = null; s.pos = st.help ? 0 : s.droppedAt; });
      st.verdict = { why: unzeroed ? 'zero' : 'edge', shell: st.shells.indexOf(wrong[0]) };
      return { result: 'miss', why: st.verdict.why };
    }
    var untouched = t.L === 0 && t.R === 0 && t.S === 0;
    if (untouched && st.answer == null) return { result: 'note', key: 'hintStart' };
    if (st.verdict) return { result: 'note', key: 'hintAgain' };
    var tideOk = tideRight(st);
    if (tideOk && st.answer == null) return { result: 'note', key: 'hintAnswer' };
    if (tideOk && st.answer === answerOf(r)) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { why: tideOk ? 'answer' : 'tide' };
    if (st.help) st.tide = canonicalTide(st);
    return { result: 'miss', why: st.verdict.why };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    var k = st.round.kind;
    if (k === 'measure') return st.help ? 'helpMeasure' : v.why === 'zero' ? 'hintZero' : 'hintEdge';
    if (st.help) return { at: 'helpAt', longer: 'helpLonger', shorter: 'helpShorter', mode: 'helpMode', range: 'helpRange', more: 'helpMore' }[k];
    if (v.why === 'answer') return k === 'range' ? 'hintCountSteps' : k === 'mode' ? 'hintModeNumber' : 'hintCountDry';
    return { at: 'tideAt', longer: 'tideLonger', shorter: 'tideShorter', mode: 'tideMode', range: 'tideRange', more: 'tideMore' }[k];
  }
  function okKey(st) {
    var r = st.round, k = r.kind, a = answerOf(r), one = a === 1;
    if (k === 'measure') return st.shells.length > 1 ? 'okMeasure2' : 'okMeasure1';
    if (k === 'mode') return 'okMode';
    if (k === 'range') return 'okRange';
    return { at: one ? 'okAt1' : 'okAt', longer: one ? 'okLonger1' : 'okLonger', shorter: one ? 'okShorter1' : 'okShorter', more: one ? 'okMore1' : 'okMore' }[k];
  }
  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order; two mode rounds or two range rounds never side by side */
  function plan(level, rnd, prev) {
    var pool = rounds(level), ks = pool.map(function (r) { return r.k; });
    var valid = function (c) { for (var i = 1; i < c.length; i++) { var a = pool[c[i]].kind, b = pool[c[i - 1]].kind; if (a === b && (a === 'mode' || a === 'range')) return false; } return !prev || prev.join() !== c.join(); };
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if (valid(c)) return c; }
    var base = prev || ks;
    for (var s = 1; s < base.length; s++) { var r = base.slice(s).concat(base.slice(0, s)); if (valid(r)) return r; }
    return base.slice().reverse();
  }
  var api = { LOCALES: LOCALES, LEVELS: LEVELS, BEACH: BEACH, RULER: RULER, locOf: locOf, levelOf: levelOf, rounds: rounds, beach: beach, count: count, mode: mode, answerOf: answerOf,
    newState: newState, xs: xs, heights: heights, isDry: isDry, dry: dry, wanted: wanted, tideRight: tideRight, canonicalTide: canonicalTide, setShore: setShore, setSea: setSea, choose: choose,
    boardShell: boardShell, slide: slide, drop: drop, undrop: undrop, edgeAt: edgeAt, check: check, hint: hint, okKey: okKey, passSize: passSize, plan: plan, minOf: minOf, maxOf: maxOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TidePlotCore = api;
})(typeof window !== 'undefined' ? window : this);
