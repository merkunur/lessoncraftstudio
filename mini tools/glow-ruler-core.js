/* =====================================================================
   glow-ruler-core.js — the model of ACTIVITY #152 of the one-by-one
   rebuild: "Read the Ruler" → THE GLOW RULER (2.MD.A.1; G2-235).
   Pure, no DOM. Design: docs/activities-rebuild/designs/152-choice-board.md
   ---------------------------------------------------------------------
   A library picture lies on a 15-cm ruler, its INK registered so its left
   edge is on 0 and its right edge on N (the worksheet G2-235 rule: the
   measured ink box, never the padded square). The child slides a glow
   marker to where the object ends and presses Check: light fills the
   centimetre SPACES one by one from 0 and stops at the marker, each lit
   space showing its count — so the number you stopped on is exactly how
   many spaces it counted. Too far: the spaces past the end glow coral
   under nothing. Too short: the end of the object stays unlit.
   Level 1 prints every centimetre; level 2 prints only 0, 5, 10, 15 and
   no length is a multiple of 5, so every reading needs counting on.
   Every object lies at a length the real thing believably has (the
   critic's rule): the [lo, hi] range is part of the round and is gated.
   ===================================================================== */
(function (root) {
  'use strict';
  var CM = 15;
  /* the measured ink box of each picture in its square image, as drawn
     (scripts/worksheet-gen/data/art-extents.json: [w, x, h, y] fractions) */
  var PICS = {
    snail: { theme: 'spring', ink: [0.951171875, 0.026041666666666668, 0.9173177083333334, 0.048828125], rot: 0 },
    seashell: { theme: 'beach', ink: [0.9576822916666666, 0.021484375, 0.9563802083333334, 0.024088541666666668], rot: 0 },
    car: { theme: 'toys', ink: [0.9505208333333334, 0.022786458333333332, 0.6080729166666666, 0.21809895833333334], rot: 0 },
    lemon: { theme: 'fruits', ink: [0.95703125, 0.01953125, 0.6432291666666666, 0.1953125], rot: 0 },
    key: { theme: 'around the house', ink: [0.4765625, 0.251953125, 0.9720052083333334, 0.016276041666666668], rot: 90 },
    centipede: { theme: 'insects and bugs', ink: [0.9420572916666666, 0.027994791666666668, 0.521484375, 0.26171875], rot: 0 },
    glue: { theme: 'classroom', ink: [0.361328125, 0.3053385416666667, 0.9622395833333334, 0.024739583333333332], rot: 90 },
    popsicle: { theme: 'desserts and sweets', ink: [0.3860677083333333, 0.294921875, 0.9720052083333334, 0.017578125], rot: 90 },
    kiwi: { theme: 'fruits', ink: [0.9544270833333334, 0.022135416666666668, 0.7962239583333334, 0.11197916666666667], rot: 0 },
    train: { theme: 'toys', ink: [0.953125, 0.022786458333333332, 0.7044270833333334, 0.162109375], rot: 0 },
    airplane: { theme: 'toys', ink: [0.947265625, 0.02734375, 0.4485677083333333, 0.2760416666666667], rot: 0 }
  };
  /* [object, length in cm, [lo, hi] — the real thing's believable length] */
  var EVERY = [['snail', 4, [3, 5]], ['seashell', 5, [4, 7]], ['car', 6, [6, 8]], ['lemon', 7, [7, 9]],
    ['key', 8, [6, 8]], ['centipede', 9, [3, 10]], ['glue', 11, [9, 13]], ['popsicle', 13, [11, 14]]];
  var FIVES = [['seashell', 4, [4, 7]], ['kiwi', 6, [5, 7]], ['train', 7, [6, 10]], ['centipede', 8, [3, 10]],
    ['airplane', 9, [8, 15]], ['popsicle', 11, [11, 14]], ['popsicle', 12, [11, 14]], ['glue', 13, [9, 13]]];
  /* the popsicle range includes its stick */

  function levelOf(v) { return v === 'fives' ? 'fives' : 'every'; }
  function rounds(level) {
    level = levelOf(level);
    return (level === 'fives' ? FIVES : EVERY).map(function (r, i) { var p = PICS[r[0]]; return { k: i, level: level, obj: r[0], theme: p.theme, rot: p.rot, len: r[1], lo: r[2][0], hi: r[2][1] }; });
  }
  /* the numbers printed under the ticks */
  function printed(level) { if (levelOf(level) === 'fives') return [0, 5, 10, 15]; var a = []; for (var i = 0; i <= CM; i++) a.push(i); return a; }
  /* the printed number at or just below a length (level 2 counts ON from it) */
  function nearestPrinted(len, level) { var p = printed(level), m = 0; for (var i = 0; i < p.length; i++) if (p[i] <= len) m = p[i]; return m; }
  /* the ink box once the picture lies flat: 90° clockwise maps (x, y) → (1 − y, x) */
  function inkFlat(obj) {
    var p = PICS[obj], b = p.ink;
    if (p.rot === 90) return { w: b[2], x: 1 - b[3] - b[2], h: b[0], y: b[1] };
    return { w: b[0], x: b[1], h: b[2], y: b[3] };
  }
  /* registration: the square image box (side S) so that the ink spans len × ppc from x0, its bottom on baseY */
  function place(obj, len, ppc, x0, baseY) {
    var f = inkFlat(obj), S = len * ppc / f.w;
    return { S: S, left: x0 - f.x * S, top: baseY - (f.y + f.h) * S, inkLeft: x0, inkRight: x0 + len * ppc, inkH: f.h * S, inkTop: baseY - f.h * S };
  }
  /* pixels per centimetre for a stage of width W: the ruler uses the width, never above 40 */
  var PAD_L = 12, PAD_R = 12;
  function geo(W) {
    var ex = W >= 560 ? 9 : 0;   /* the wide glass keeps 20 px either side for its 20-px numerals */
    var ppc = Math.min(40, Math.floor((W - PAD_L - PAD_R - 2 * ex) / CM * 10) / 10);
    var rulerW = Math.round(ppc * CM + PAD_L + PAD_R + 2 * ex);
    return { ppc: ppc, x0: PAD_L + ex + Math.max(0, Math.floor((W - rulerW) / 2)), rulerW: rulerW, wide: W >= 560, cramp: W < 340 };
  }
  function snap(px, x0, ppc) { var n = Math.round((px - x0) / ppc); return Math.max(0, Math.min(CM, n)); }
  /* the spaces the light fills: space i sits between tick i − 1 and tick i, and shows the count i */
  function spaces(n) { var out = []; for (var i = 1; i <= n; i++) out.push({ count: i, from: i - 1, to: i }); return out; }
  function evaluate(round, marker) {
    if (marker === round.len) return { ok: true };
    return marker > round.len ? { over: marker - round.len } : { under: round.len - marker };
  }

  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, marker: 0, lit: 0, misses: 0, help: false, verdict: null, done: false };
  }
  function setMarker(st, n) {
    n = Math.max(0, Math.min(CM, Math.round(n)));
    if (n === st.marker) return false;
    st.marker = n;
    if (st.done) { st.lit = n; return true; }      /* free play after the win: the light follows */
    st.verdict = null; st.lit = 0;
    return true;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.marker === 0) return { result: 'note', key: 'hintStart' };
    st.lit = st.marker;
    var e = evaluate(st.round, st.marker);
    if (e.ok) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = e.over ? { kind: 'over', by: e.over } : { kind: 'under', by: e.under };
    return { result: 'miss', kind: st.verdict.kind };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (st.help) return st.level !== 'fives' ? 'hintDrop1' : nearestPrinted(st.round.len, st.level) === 0 ? 'hintDrop0' : 'hintDrop5';
    return v.kind === 'over' ? 'hintOver' : 'hintUnder';
  }

  function passSize(level) { return rounds(level).length; }
  function plan(level, pass, rnd, prev) {
    var ks = rounds(level).map(function (r) { return r.k; });
    for (var tries = 0; tries < 50; tries++) {
      var o = ks.slice();
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; }
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: ks.slice().reverse() };
  }

  var api = { CM: CM, PICS: PICS, levelOf: levelOf, rounds: rounds, printed: printed, nearestPrinted: nearestPrinted, inkFlat: inkFlat, place: place,
    geo: geo, snap: snap, spaces: spaces, evaluate: evaluate, newState: newState, setMarker: setMarker, check: check, hint: hint, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GlowRulerCore = api;
})(typeof window !== 'undefined' ? window : this);
