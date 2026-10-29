/* =====================================================================
   cm-cutter-core.js — the model of ACTIVITY #153 of the one-by-one
   rebuild: "Tildy's Tailor Shop" → THE CM CUTTER AND THE PIECE JAR
   (2.MD.A.1; G2-235). Pure, no DOM.
   Design: docs/activities-rebuild/designs/153-tildy.md
   ---------------------------------------------------------------------
   A strip lies on the cutting table. The child slides the ruler so its 0
   meets the strip's start (the cat has bumped it off) and taps the number
   at the end. On Check Tildy's cutter rides the ruler from its 0 and snips
   at every centimetre: pieces of the strip drop into the jar, and whatever
   the ruler missed stays on the table — a stub before the 0, a tail past
   the ruler's end, or snips in thin air before the strip began.
   Level 2: broken rulers (count the spaces), Tildy's mistakes to fix, and
   a rack of rulers of which exactly one is long enough.
   All coordinates are whole centimetres on the table. The snapshot holds
   no "aligned" flag and no distance: nothing tells the child they are
   close before Check (the old tildy-core's gate-can't-cheat rule).
   ===================================================================== */
(function (root) {
  'use strict';
  var WIN = 16;                     /* the visible table window, in cm */
  var STRIPS = ['ribbon', 'leather', 'yarn', 'cord', 'denim', 'felt', 'lace', 'braid', 'elastic'];
  /* Level 1 — line up the 0: [strip, start, end, where the cat leaves the ruler's 0] — the ruler is 12 cm */
  var ALIGN = [['ribbon', 0, 7, 3], ['leather', 0, 5, 2], ['yarn', 0, 4, 1], ['cord', 0, 9, -2], ['denim', 0, 8, 4],
    ['felt', 2, 8, 1], ['lace', 1, 11, 0], ['braid', 5, 8, 3], ['elastic', 2, 13, 4]];
  /* Level 2 — tricky rulers */
  var TRICKY = [
    { kind: 'broken', strip: 'ribbon', s: 2, e: 8, b: 2 },
    { kind: 'broken', strip: 'cord', s: 3, e: 7, b: 3 },
    { kind: 'broken', strip: 'lace', s: 1, e: 10, b: 1 },
    { kind: 'fix', strip: 'yarn', s: 0, e: 7, z: 1, len: 12, says: 6 },
    { kind: 'fix', strip: 'elastic', s: 0, e: 10, z: 0, len: 9, says: 9, rack: [7, 9, 12] },
    { kind: 'pick', strip: 'felt', s: 0, e: 11, rack: [6, 9, 12] },
    { kind: 'pick', strip: 'braid', s: 0, e: 8, rack: [5, 7, 10] },
    { kind: 'pick', strip: 'leather', s: 0, e: 14, rack: [10, 12, 15] }
  ];
  var BROKEN_TO = 12;               /* a broken ruler is printed from b up to 12 */

  function levelOf(v) { return v === 'tricky' ? 'tricky' : 'align'; }
  function rounds(level) {
    level = levelOf(level);
    if (level === 'align') return ALIGN.map(function (r, i) { return { k: i, level: level, kind: 'align', strip: r[0], s: r[1], e: r[2], z: r[3], len: 12 }; });
    return TRICKY.map(function (r, i) { var o = { k: i, level: level }; for (var p in r) o[p] = Array.isArray(r[p]) ? r[p].slice() : r[p]; return o; });
  }
  function length(r) { return r.e - r.s; }
  /* the table window: 1 cm left of the smaller of the strip start and the ruler's first 0 */
  function windowLeft(r) { var z = r.kind === 'broken' ? r.s : r.kind === 'pick' ? r.s : r.z; return Math.min(r.s, z) - 1; }
  function printed(len, every, from) { var a = []; for (var i = from || 0; i <= len; i++) if (every || i % 5 === 0) a.push(i); return a; }

  function newState(level, k, rackOrder) {
    var pool = rounds(level), r = pool[k] || pool[0], W0 = windowLeft(r);
    var st = { level: levelOf(level), k: r.k, round: r, w0: W0, zero: null, len: null, reading: null, stitches: [], rack: null, picked: null,
      misses: 0, help: false, verdict: null, cut: null, done: false };
    if (r.kind === 'align' || r.kind === 'fix') { st.zero = r.z; st.len = r.len; }
    if (r.kind === 'broken') { st.zero = 0; st.len = BROKEN_TO; }
    if (r.rack) { st.rack = rackOrder && rackOrder.length === r.rack.length ? rackOrder.slice() : r.rack.slice(); }
    return st;
  }
  function clear(st) { st.verdict = null; st.cut = null; }
  /* slide the ruler so its 0 sits at table cm z (clamped inside the window) */
  function slide(st, z) {
    var r = st.round; if (st.done || r.kind === 'broken' || st.len == null) return false;
    z = Math.max(st.w0, Math.min(st.w0 + WIN - 1, Math.round(z)));
    if (z === st.zero) return false;
    st.zero = z; clear(st); return true;
  }
  /* tap a numeral: the reading is the ruler's number, tied to the ruler (it moves with it) */
  function read(st, n) {
    if (st.done || st.round.kind === 'broken' || st.len == null) return false;
    n = Math.max(0, Math.min(st.len, Math.round(n)));
    if (n === st.reading) return false;
    st.reading = n; clear(st); return true;
  }
  /* a stitch on the table space [k, k+1] of a broken ruler (toggle) — only where the ruler lies */
  function stitch(st, k) {
    var r = st.round; if (st.done || r.kind !== 'broken') return false;
    k = Math.round(k); if (k < r.b || k >= BROKEN_TO) return false;
    var i = st.stitches.indexOf(k); if (i >= 0) st.stitches.splice(i, 1); else { st.stitches.push(k); st.stitches.sort(function (a, b) { return a - b; }); }
    clear(st); return true;
  }
  /* take ruler i of the rack onto the table: it lands at the table's left edge */
  function pick(st, i) {
    if (st.done || !st.rack || !(i >= 0 && i < st.rack.length)) return false;
    st.len = st.rack[i]; st.picked = i; st.zero = st.w0; st.reading = null; clear(st); return true;
  }
  /* the cutter: what a snip from the ruler's 0 does to the strip */
  function snip(st) {
    var r = st.round;
    /* a broken ruler: the cutter snips where the child stitched — a stitch on the strip is a piece, a stitch off it cuts air, an unstitched space stays whole */
    if (r.kind === 'broken') { var on = st.stitches.filter(function (k) { return k >= r.s && k < r.e; }).length; return { pieces: on, stub: 0, air: st.stitches.length - on, tail: 0, gaps: length(r) - on }; }
    var Z = st.zero, end = Z + st.len;
    return { pieces: Math.max(0, Math.min(r.e, end) - Math.max(r.s, Z)), stub: Math.max(0, Z - r.s), air: Math.max(0, r.s - Z), tail: Math.max(0, r.e - end) };
  }
  function evaluate(st) {
    var r = st.round;
    if (r.kind === 'broken') {
      if (!st.stitches.length) return { kind: 'note', key: 'hintStitch' };
      var want = []; for (var k = r.s; k < r.e; k++) want.push(k);
      var extra = st.stitches.filter(function (x) { return want.indexOf(x) < 0; }).length, missing = want.filter(function (x) { return st.stitches.indexOf(x) < 0; }).length;
      return extra || missing ? { kind: 'miscount', extra: extra, missing: missing } : { kind: 'ok' };
    }
    if (st.len == null) return { kind: 'note', key: 'hintPick' };
    if (st.reading == null) return { kind: 'note', key: 'hintRead' };
    var c = snip(st);
    if (c.tail) return { kind: 'short', by: c.tail };
    if (c.stub) return { kind: 'inside', by: c.stub };
    if (c.air) return { kind: 'before', by: c.air };
    if (st.reading !== length(r)) return { kind: 'misread', by: st.reading - length(r) };
    return { kind: 'ok' };
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var v = evaluate(st);
    if (v.kind === 'note') return { result: 'note', key: v.key };
    st.cut = snip(st);
    if (v.kind === 'ok') { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2; st.verdict = v;
    return { result: 'miss', kind: v.kind };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (v.kind === 'miscount') return st.help ? 'hintCount' : v.extra ? 'hintStitchPast' : 'hintStitchMissing';
    if (v.kind === 'short') return st.help ? 'hintLonger' : 'hintShort';
    if (v.kind === 'misread') return st.help ? 'hintEnd' : 'hintJar';
    if (st.help) return 'hintPin';
    return v.kind === 'inside' ? 'hintStub' : 'hintAir';
  }
  function taskKey(r) { return r.kind === 'broken' ? 'tBroken' : r.kind === 'fix' ? 'tFix' : r.kind === 'pick' ? 'tPick' : 'oP_' + r.strip; }
  function okKey(r) { return r.kind === 'broken' ? 'okBroken' : 'ok_' + r.strip; }

  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the pass: an order-only reshuffle (never the previous order) and a fresh rack order per round */
  function plan(level, pass, rnd, prev) {
    var R = rounds(level), ks = R.map(function (r) { return r.k; }), o = null;
    for (var tries = 0; tries < 50; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) { o = c; break; } }
    if (!o) o = ks.slice().reverse();
    var racks = {}; R.forEach(function (r) { if (r.rack) racks[r.k] = shuffle(r.rack.slice(), rnd); });
    return { order: o, racks: racks };
  }
  /* pixels per centimetre for a stage of width W, and the table's left padding */
  function geo(W) {
    var pad = W >= 560 ? 14 : 9;
    var ppc = Math.min(38, Math.floor((W - 2 * pad) / WIN * 10) / 10);
    return { ppc: ppc, pad: pad + Math.max(0, Math.floor((W - 2 * pad - ppc * WIN) / 2)), wide: W >= 560, cramp: W < 340 };
  }

  var api = { WIN: WIN, STRIPS: STRIPS, BROKEN_TO: BROKEN_TO, levelOf: levelOf, rounds: rounds, length: length, windowLeft: windowLeft, printed: printed,
    newState: newState, slide: slide, read: read, stitch: stitch, pick: pick, snip: snip, evaluate: evaluate, check: check, hint: hint,
    taskKey: taskKey, okKey: okKey, passSize: passSize, plan: plan, geo: geo };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CmCutterCore = api;
})(typeof window !== 'undefined' ? window : this);
