/* =====================================================================
   flip-pads-core.js — the model of THE FLIP PADS (row 141, "Hopper's
   Lily Hops", 2.NBT.A.2; G1-123/124/125/126/278–281/285, G2-207/208/304/
   314/392, G3-308/326/327/329). Pure, no DOM.
   Design: docs/activities-rebuild/designs/141-skipcount.md
   ---------------------------------------------------------------------
   Every lily pad shows its number on split-flaps. The empty pad arrives
   as a copy of the pad before it and is flipped forward (or back) by one
   hop. The flaps never carry: past 9 the child flips the next flap.
   Fill rounds have two empty pads; find-the-hop rounds set Hopper's sign.
   ===================================================================== */
(function (root) {
  'use strict';

  /* kind: 'up' | 'down' fill (buds = empty pad indices) · 'hop' (find the hop) */
  var SETS = {
    '5': [
      { seq: [35, 40, 45, 50, 55], buds: [2, 4] }, { seq: [63, 68, 73, 78, 83], buds: [2, 4] },
      { seq: [85, 90, 95, 100, 105], buds: [2, 3] }, { seq: [10, 20, 30, 40, 50], buds: [2, 4] },
      { seq: [370, 380, 390, 400, 410], buds: [2, 3] }, { seq: [600, 700, 800, 900, 1000], buds: [2, 4] },
      { seq: [530, 520, 510, 500, 490], buds: [1, 3] }, { seq: [900, 800, 700, 600, 500], buds: [2, 4] },
      { seq: [245, 255, 265, 275], hop: true }, { seq: [615, 620, 625, 630], hop: true }, { seq: [400, 500, 600, 700], hop: true }
    ],
    '2': [
      { seq: [2, 4, 6, 8, 10], buds: [2, 4] }, { seq: [46, 48, 50, 52, 54], buds: [1, 3] },
      { seq: [3, 6, 9, 12, 15, 18], buds: [2, 5] }, { seq: [21, 24, 27, 30, 33], buds: [2, 4] },
      { seq: [4, 8, 12, 16, 20], buds: [2, 3] }, { seq: [28, 32, 36, 40, 44], buds: [2, 3] },
      { seq: [30, 28, 26, 24, 22], buds: [1, 4] }, { seq: [30, 27, 24, 21, 18], buds: [2, 4] },
      { seq: [12, 15, 18, 21], hop: true }, { seq: [16, 20, 24, 28], hop: true }, { seq: [7, 9, 11, 13], hop: true }
    ],
    '25': [
      { seq: [25, 50, 75, 100, 125], buds: [2, 4] }, { seq: [150, 175, 200, 225, 250], buds: [2, 4] },
      { seq: [50, 100, 150, 200, 250], buds: [1, 4] }, { seq: [350, 400, 450, 500, 550], buds: [2, 3] },
      { seq: [130, 230, 330, 430, 530], buds: [2, 4] }, { seq: [300, 275, 250, 225, 200], buds: [2, 4] },
      { seq: [900, 850, 800, 750, 700], buds: [1, 3] }, { seq: [1000, 900, 800, 700, 600], buds: [2, 4] },
      { seq: [125, 150, 175, 200], hop: true }, { seq: [640, 590, 540, 490], hop: true }, { seq: [360, 460, 560, 660], hop: true }
    ]
  };

  function setOf(v) { return v === '2' || v === '25' ? v : '5'; }
  function dirOf(v) { return v === 'up' ? 'up' : 'both'; }
  function stepOf(rd) { return rd.seq[1] - rd.seq[0]; }
  function isDown(rd) { return stepOf(rd) < 0; }
  /* "up only" drops the going-down fill rounds (a find-the-hop round may still shrink) */
  function rounds(set, dir) { var R = SETS[setOf(set)]; return dirOf(dir) === 'up' ? R.filter(function (r) { return r.hop || !isDown(r); }) : R; }
  function places(rd) { return rd.seq.some(function (n) { return n >= 1000; }) ? 4 : 3; }
  /* a chain that starts at its own step is drawn on a number line from a printed 0 tick */
  function fromBank(rd) { return !rd.hop && rd.seq[0] === stepOf(rd); }

  /* digits with leading blanks (null), never a leading 0 */
  function flaps(n, p) { var s = String(n), out = []; for (var i = 0; i < p; i++) { var k = i - (p - s.length); out.push(k < 0 ? null : +s[k]); } return out; }
  function valueOf(f) { var v = 0; for (var i = 0; i < f.length; i++) v = v * 10 + (f[i] == null ? 0 : f[i]); return v; }
  /* after a flip: a blank inside a number reads 0; zeros before the first digit go blank (the ones flap never blanks) */
  function normalize(f) {
    var seen = false;
    for (var i = 0; i < f.length; i++) {
      if (i === f.length - 1) { if (f[i] == null) f[i] = 0; continue; }
      if (!seen) { if (f[i] === 0) f[i] = null; if (f[i] != null) seen = true; }
      else if (f[i] == null) f[i] = 0;
    }
    return f;
  }
  /* one flap, one digit forward or back — NEVER carries into the next flap */
  function flipDigits(f, i, d) {
    var leading = true; for (var j = 0; j < i; j++) if (f[j] != null) leading = false;
    var last = i === f.length - 1, v = f[i];
    if (leading && !last) { var cyc = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9], at = cyc.indexOf(v === 0 ? null : v); f[i] = cyc[(at + d + 10) % 10]; }
    else f[i] = ((v == null ? 0 : v) + d + 10) % 10;
    return normalize(f);
  }

  function newState(set, dir, k) {
    var rd = rounds(set, dir)[k], p = places(rd), st = { set: setOf(set), dir: dirOf(dir), k: k, rd: rd, places: p, hop: !!rd.hop, bi: 0, filled: [], misses: 0, help: false, last: null, done: false, tally: 0 };
    if (rd.hop) { st.sign = 1; st.board = [null, null, null]; st.signTouched = false; }
    else st.board = flaps(rd.seq[rd.buds[0] - 1], p);
    return st;
  }
  function budIndex(st) { return st.hop ? null : st.rd.buds[st.bi]; }
  function prevValue(st) { return st.rd.seq[budIndex(st) - 1]; }
  function target(st) { return st.hop ? stepOf(st.rd) : st.rd.seq[budIndex(st)]; }
  function flip(st, i, d) {
    if (st.done || (d !== 1 && d !== -1)) return 'no';
    if (st.hop && i === -1) { st.sign = -st.sign; st.signTouched = true; st.help = false; return 'sign'; }
    if (i < 0 || i >= st.board.length) return 'no';
    flipDigits(st.board, i, d); st.tally += d; st.help = false; return 'flipped';
  }
  function made(st) { return valueOf(st.board) - prevValue(st); }

  function miss(st, kind, extra) { st.misses++; st.help = st.misses >= 2; st.last = { result: kind }; for (var k in (extra || {})) st.last[k] = extra[k]; return st.last; }
  function check(st) {
    if (st.done) return { result: 'done' };
    if (st.hop) {
      var mag = valueOf(st.board), want = stepOf(st.rd);
      if (mag === 0 && !st.signTouched) { st.last = { result: 'empty' }; return st.last; }
      if (st.sign * mag === want) { st.done = true; st.help = false; st.last = { result: 'ok', round: true }; return st.last; }
      if (mag === Math.abs(want)) return miss(st, 'sign');
      return miss(st, 'hop');
    }
    var v = valueOf(st.board), prev = prevValue(st);
    if (v === prev) { st.last = { result: 'same' }; return st.last; }
    if (v !== target(st)) return miss(st, 'meter', { made: v - prev, hop: stepOf(st.rd) });
    /* this bud is right: it opens; the next bud arrives as a copy of the pad before it */
    st.filled.push(budIndex(st)); st.misses = 0; st.help = false; st.tally = 0;
    if (st.bi + 1 < st.rd.buds.length) { var at = st.bi; st.bi++; st.board = flaps(st.rd.seq[budIndex(st) - 1], st.places); st.last = { result: 'ok', round: false, bud: st.rd.buds[at] }; return st.last; }
    st.done = true; st.last = { result: 'ok', round: true, bud: st.rd.buds[st.bi] }; return st.last;
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    var down = isDown(st.rd);
    switch (L.result) {
      case 'empty': return 'hSign';
      case 'same': return down ? 'hSameBack' : 'hSame';
      case 'meter': return st.help ? (down ? 'miss2Down' : 'miss2Up') : 'missMeter';
      case 'hop': return st.help ? 'miss2Hop' : 'missHop';
      case 'sign': return st.help ? 'miss2Hop' : 'missHopSign';
    }
    return null;
  }
  /* the places that must change from the pad before to the target (miss 2 rings them) */
  function changing(st) {
    var a = flaps(st.hop ? st.rd.seq[0] : prevValue(st), st.places), b = flaps(st.hop ? st.rd.seq[1] : target(st), st.places), out = [];
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) out.push(i);
    return out;
  }
  /* the columns that change on every hop of the whole chain (the end-of-round show) */
  function stripe(rd) {
    var p = places(rd), F = rd.seq.map(function (n) { return flaps(n, p); }), out = [];
    for (var i = 0; i < p; i++) { var all = true; for (var j = 1; j < F.length; j++) if (F[j][i] === F[j - 1][i]) all = false; if (all) out.push(i); }
    return out;
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  function plan(set, dir, rnd, prev) {
    rnd = rnd || Math.random; var n = rounds(set, dir).length, ids = []; for (var i = 0; i < n; i++) ids.push(i);
    for (var a = 0; a < 2000; a++) { var o = shuffle(ids, rnd); if (!prev || prev.join() !== o.join()) return { order: o }; }
    return { order: ids.slice().reverse() };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { SETS: SETS, setOf: setOf, dirOf: dirOf, stepOf: stepOf, isDown: isDown, rounds: rounds, places: places, fromBank: fromBank, flaps: flaps, valueOf: valueOf, normalize: normalize, flipDigits: flipDigits, newState: newState, budIndex: budIndex, prevValue: prevValue, target: target, flip: flip, made: made, check: check, hint: hint, changing: changing, stripe: stripe, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FlipPadsCore = api;
})(typeof window !== 'undefined' ? window : this);
