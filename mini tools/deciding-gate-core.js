/* =====================================================================
   deciding-gate-core.js — the model of THE DECIDING GATE (row 151,
   "Compare Three-Digit Numbers", 2.NBT.A.4; G2-219, G2-220; the
   four-digit setting covers G3-325). Pure, no DOM.
   Design: docs/activities-rebuild/designs/151-match-pairs.md
   ---------------------------------------------------------------------
   Two numbers race through one gate per place, the biggest place first.
   At each gate their digits rise as blocks; equal digits let both
   through, and the FIRST gate where they differ drops its bar in front
   of the smaller number. The child calls that gate before the race (or
   the finish flag, when the numbers are the same), then sets < = >.
   Order four: put four numbers on the steps, smallest to greatest.
   A gate index runs 0 … nd − 1 (the biggest place first); nd itself is
   the finish flag ("the same").
   ===================================================================== */
(function (root) {
  'use strict';

  /* Compare (a, b) — the design's tables */
  var CMP3 = [[389, 412], [736, 367], [461, 529], [247, 274], [875, 857], [561, 516], [655, 658], [927, 924], [683, 689], [504, 504]];
  var CMP4 = [[3891, 4120], [6250, 5987], [1999, 2001], [7086, 7186], [8361, 8016], [2743, 2734], [9205, 9250], [5412, 5419], [4377, 4370], [6038, 6038]];
  /* Order four — as shown, left to right */
  var ORD3 = [[389, 412, 398, 421], [650, 560, 605, 506], [437, 734, 743, 473], [812, 218, 128, 281], [590, 905, 509, 950], [637, 367, 673, 376], [194, 941, 914, 149], [826, 862, 286, 268], [530, 305, 350, 503]];
  var ORD4 = [[3891, 4102, 3918, 4120], [6050, 5600, 6005, 5060], [2473, 2743, 7234, 2734], [8612, 8126, 6812, 8162], [1590, 1905, 1509, 1950], [3706, 3067, 3760, 3076], [5249, 5429, 5294, 4952], [7800, 8007, 7080, 7008], [9311, 9113, 9131, 9310]];

  function jobOf(v) { return v === 'order' ? 'order' : 'compare'; }
  function ndOf(v) { return v === 'four' || v === 4 ? 4 : 3; }
  /* the places, biggest first */
  function places(nd) { return nd === 4 ? ['th', 'h', 't', 'o'] : ['h', 't', 'o']; }
  function digitsOf(n, nd) { var s = String(n); while (s.length < nd) s = '0' + s; return s.split('').map(Number); }
  /* the first gate where the digits differ; nd when they never do (the finish flag) */
  function deciding(a, b, nd) { var x = digitsOf(a, nd), y = digitsOf(b, nd); for (var i = 0; i < nd; i++) if (x[i] !== y[i]) return i; return nd; }
  function signOf(a, b) { return a < b ? '<' : a > b ? '>' : '='; }

  function rounds(job, nd) {
    job = jobOf(job); nd = ndOf(nd);
    if (job === 'order') return (nd === 4 ? ORD4 : ORD3).map(function (r, i) { return { k: i, job: job, nd: nd, nums: r.slice() }; });
    return (nd === 4 ? CMP4 : CMP3).map(function (r, i) { return { k: i, job: job, nd: nd, a: r[0], b: r[1], gate: deciding(r[0], r[1], nd), sign: signOf(r[0], r[1]) }; });
  }
  function newState(job, nd, k) {
    job = jobOf(job); nd = ndOf(nd);
    var pool = rounds(job, nd), r = pool[k] || pool[0];
    return { job: job, nd: nd, k: r.k, round: r, predicted: null, sign: null, steps: [null, null, null, null], picked: null,
      misses: 0, help: false, verdict: null, done: false, ran: false };
  }
  /* the hand */
  function predict(st, g) { if (st.done || st.job !== 'compare' || !(g >= 0 && g <= st.nd && g === Math.floor(g))) return false; st.predicted = g; st.verdict = null; st.ran = false; return true; }
  function setSign(st, s) { if (st.done || st.job !== 'compare' || ['<', '=', '>', null].indexOf(s) < 0) return false; st.sign = s; st.verdict = null; st.ran = false; return true; }
  /* order: put the number at shown index i on step k (0 = the lowest step, the smallest); a taken step swaps */
  function place(st, i, k) {
    if (st.done || st.job !== 'order' || !(i >= 0 && i < 4) || !(k >= 0 && k < 4)) return false;
    var from = st.steps.indexOf(i), other = st.steps[k];
    if (from === k) return false;
    st.steps[k] = i;
    if (from >= 0) st.steps[from] = other != null && other !== i ? other : null;
    st.verdict = null; st.ran = false;
    return true;
  }
  function unplace(st, k) { if (st.done || st.job !== 'order' || st.steps[k] == null) return false; st.steps[k] = null; st.verdict = null; st.ran = false; return true; }
  /* the true order: shown indexes from the smallest to the greatest */
  function trueOrder(nums) { return nums.map(function (n, i) { return i; }).sort(function (x, y) { return nums[x] - nums[y]; }); }

  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, kind;
    if (st.job === 'compare') {
      if (st.predicted == null) return { result: 'note', key: 'hintPick' };
      if (!st.sign) return { result: 'note', key: 'hintSign' };
      st.ran = true;
      if (st.predicted > r.gate) kind = { kind: 'gateLate', gate: r.gate };
      else if (st.predicted < r.gate) kind = { kind: 'gateEarly', gate: st.predicted };
      else if (st.sign !== r.sign) kind = { kind: 'sign' };
      else return win(st);
    } else {
      if (st.steps.some(function (x) { return x == null; })) return { result: 'note', key: 'hintSteps' };
      st.ran = true;
      var want = trueOrder(r.nums), wrong = [0, 1, 2, 3].filter(function (k) { return st.steps[k] !== want[k]; });
      if (!wrong.length) return win(st);
      /* the pair to explain at help: the number on the first wrong step and the number that belongs there */
      var k0 = wrong[0], p = [st.steps[k0], want[k0]];
      kind = { kind: 'order', wrong: wrong, pair: p, gate: deciding(r.nums[p[0]], r.nums[p[1]], st.nd) };
    }
    st.misses++; st.help = st.misses >= 2; st.verdict = kind;
    return { result: 'miss', kind: kind.kind };
  }
  function win(st) { st.done = true; st.ran = true; st.verdict = null; return { result: 'ok' }; }

  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (st.job === 'order') return st.help ? 'hintPair' : 'hintOrder';
    if (st.help) return st.round.gate === st.nd ? 'hintAllSame' : 'hintVs';
    if (v.kind === 'gateLate') return 'hintLate';
    if (v.kind === 'gateEarly') return 'hintEarly';
    return 'hintSignSide';
  }
  /* the run: the gates the race reaches, with both digits; the last one reached is the deciding gate */
  function frames(a, b, nd) {
    var g = deciding(a, b, nd), x = digitsOf(a, nd), y = digitsOf(b, nd), out = [];
    for (var i = 0; i < nd && i <= g; i++) out.push({ gate: i, da: x[i], db: y[i], equal: x[i] === y[i] });
    return out;
  }
  function okKey(st) { if (st.job === 'order') return 'okOrder'; var s = st.round.sign; return s === '<' ? 'okLess' : s === '>' ? 'okGreater' : 'okEqual'; }

  function passSize(job, nd) { return rounds(job, nd).length; }
  function plan(job, nd, pass, rnd, prev) {
    var ks = rounds(job, nd).map(function (r) { return r.k; });
    for (var tries = 0; tries < 50; tries++) {
      var o = ks.slice();
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; }
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: ks.slice().reverse() };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 340 }; }

  var api = { jobOf: jobOf, ndOf: ndOf, places: places, digitsOf: digitsOf, deciding: deciding, signOf: signOf, rounds: rounds, newState: newState,
    predict: predict, setSign: setSign, place: place, unplace: unplace, trueOrder: trueOrder, check: check, hint: hint, frames: frames, okKey: okKey,
    passSize: passSize, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DecidingGateCore = api;
})(typeof window !== 'undefined' ? window : this);
