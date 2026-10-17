/* =====================================================================
   creek-map-core.js — the MODEL of the Creek Map, activity #21 of the
   one-by-one rebuild: "Comparison Creek" (K.CC.C.7).
   Design sheet: docs/activities-rebuild/021-creek-map.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-creek-map-core.js
   drives it; scripts/mutate-creek-map.js proves the gate bites).

   THE SKILL. K.CC.C.7: compare two numbers between 1 and 10 given as
   written numerals — here BOTH ways, by a rule the child must hold.
   THE INVENTION IS THE ROUTE: a creek forks twice on the way to a pond
   where a friend waits; at each fork two number buoys. A sign at the top
   gives the round's rule — follow the BIGGER numbers, or the SMALLER ones
   (the rule changes from round to round). The child plans the whole route
   (one number at each fork) and presses Check; the boat sails it. A wrong
   fork stops the boat in the reeds there (that fork ringed); a second miss
   puts dots under that fork's two numbers. Never 0, never equal.
   ===================================================================== */
(function (global) {
  'use strict';

  var BOAT = { theme: 'vehicles', noun: 'sailboat' };
  var FRIEND_THEME = 'forest creatures';
  /* contact sheet read 2026-10-17: nine friends unmistakable at a glance (toad is the frog's near-double; insects and birds left out) */
  var FRIENDS = ['frog', 'turtle', 'beaver', 'fox', 'rabbit', 'hedgehog', 'raccoon', 'squirrel', 'bear'];
  /* each round: the authored rule (used when the setting is "mixed") and the two forks [left, right] */
  var POOLS = {
    to10: [
      { rule: 'bigger', forks: [[7, 6], [5, 3]] }, { rule: 'smaller', forks: [[4, 8], [10, 9]] }, { rule: 'bigger', forks: [[2, 3], [8, 5]] },
      { rule: 'smaller', forks: [[9, 6], [7, 8]] }, { rule: 'bigger', forks: [[5, 9], [4, 6]] }, { rule: 'smaller', forks: [[2, 1], [4, 5]] },
      { rule: 'bigger', forks: [[10, 7], [8, 9]] }, { rule: 'smaller', forks: [[6, 10], [3, 7]] }, { rule: 'bigger', forks: [[4, 1], [2, 7]] }
    ],
    to5: [
      { rule: 'bigger', forks: [[3, 2], [1, 4]] }, { rule: 'smaller', forks: [[2, 5], [4, 3]] }, { rule: 'bigger', forks: [[4, 5], [2, 1]] },
      { rule: 'smaller', forks: [[5, 3], [1, 2]] }, { rule: 'bigger', forks: [[3, 1], [5, 2]] }, { rule: 'smaller', forks: [[4, 2], [3, 5]] },
      { rule: 'bigger', forks: [[2, 4], [3, 4]] }, { rule: 'smaller', forks: [[3, 1], [2, 4]] }
    ]
  };
  var MAX = { to10: 10, to5: 5 };
  var RANGES = ['to5', 'to10'], RULES = ['mixed', 'bigger', 'smaller'];

  function rounds(range, prefix, ruleSetting) {
    var key = POOLS[range] ? range : 'to10', out = [], P = POOLS[key];
    var fixed = ruleSetting === 'bigger' || ruleSetting === 'smaller' ? ruleSetting : null;
    for (var i = 0; i < P.length; i++) {
      out.push({ id: (prefix || 'cm') + '-' + key + '-' + i, max: MAX[key], rule: fixed || P[i].rule,
        forks: P[i].forks.map(function (p) { return p.slice(); }), friend: FRIENDS[i % FRIENDS.length] });
    }
    return out;
  }
  function pick(rule, pair) { return rule === 'bigger' ? (pair[0] > pair[1] ? 'left' : 'right') : (pair[0] < pair[1] ? 'left' : 'right'); }
  function answers(st) { return st.forks.map(function (p) { return pick(st.rule, p); }); }
  function newState(r) {
    return { id: r.id, max: r.max, rule: r.rule, forks: r.forks.map(function (p) { return p.slice(); }), friend: r.friend,
      route: r.forks.map(function () { return null; }), misses: 0, checked: null, done: false };
  }
  function choose(st, fork, side) {
    if (!st || st.done || !(fork >= 0 && fork < st.forks.length) || (side !== 'left' && side !== 'right')) return false;
    st.route[fork] = side; st.checked = null; return true;
  }
  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var res, ans = answers(st);
    if (st.route.every(function (s) { return s === null; })) res = { ok: false, slip: 'none' };
    else if (st.route.some(function (s) { return s === null; })) res = { ok: false, slip: 'incomplete' };
    else {
      var w = -1;
      for (var i = 0; i < ans.length; i++) if (st.route[i] !== ans[i]) { w = i; break; }
      res = w < 0 ? { ok: true, slip: 'right' } : { ok: false, slip: 'wrong', stuck: w };
    }
    if (res.ok) st.done = true;
    else if (res.slip === 'wrong') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none', R = st.rule === 'bigger' ? 'Big' : 'Small';
    if (s === 'incomplete') return 'hintEvery';
    if (s === 'wrong') return (helpLevel(st) >= 2 ? 'hintDots' : 'hintFork') + R;
    return 'hintStart';
  }
  function stuckAt(st) { return st.checked && st.checked.slip === 'wrong' ? st.checked.stuck : -1; }
  function dotsAt(st) { return helpLevel(st) >= 2 ? stuckAt(st) : -1; }
  /* how far the boat sails: every fork and the pond when done; up to the stuck fork (then the reeds) after a wrong Check */
  function sail(st) { return st.done ? { forks: st.forks.length, pond: true } : stuckAt(st) >= 0 ? { forks: stuckAt(st) + 1, pond: false } : { forks: 0, pond: false }; }
  function followed(st) { var a = answers(st); return st.forks.map(function (p, i) { return a[i] === 'left' ? p[0] : p[1]; }); }

  /* THE BENCH. A creek down the stage: the source (the rule sign, the boat), two forks, the pond (the friend).
     Each fork splits into two narrow channels round an island; the buoy stands on the OUTER bank of its channel
     (half in the water on a phone) and the boat sails down the channel, so the two never collide.
     wide (W ≥ 560): boat 96, buoy 64; stack (< 560): boat 64 (56 below a 328 px stage), buoy 46 (44). */
  function layout(W) {
    W = Math.max(240, Math.floor(W));
    var wide = W >= 560, m = 8;
    var boat = wide ? 96 : (W >= 328 ? 64 : 56);
    var buoy = wide ? 64 : (W >= 328 ? 46 : 44);
    var cx = Math.round(W / 2), chanW = boat + (wide ? 26 : 22), d = Math.round(W * 0.22);
    var shift = Math.max(0, Math.round((chanW - boat) / 2));
    var F = wide ? 172 : Math.max(100, Math.min(120, Math.round(W * 0.36)));
    var S = boat + (wide ? 18 : 10), P = boat + (wide ? 30 : 18);
    var chanX = { left: cx - d, right: cx + d };
    var boatX = { left: chanX.left + shift, right: chanX.right - shift };
    var off = wide ? Math.round(chanW / 2 + buoy / 2 + 6) : Math.round(chanW / 2) + 2;
    var buoyX = { left: chanX.left - off, right: chanX.right + off };
    var forkTop = [S, S + F];
    return { mode: wide ? 'wide' : 'stack', W: W, cx: cx, m: m, boat: boat, buoy: buoy, chanW: chanW, d: d, F: F, S: S, P: P, H: S + 2 * F + P,
      forkTop: forkTop, chanX: chanX, boatX: boatX, buoyX: buoyX, buoyY: forkTop.map(function (t) { return t + Math.round(F * 0.32); }),
      stuckY: forkTop.map(function (t) { return t + Math.round(F * 0.6); }), startY: Math.round(S / 2), pondY: S + 2 * F + Math.round(P / 2), friend: boat };
  }

  var api = { BOAT: BOAT, FRIEND_THEME: FRIEND_THEME, FRIENDS: FRIENDS, POOLS: POOLS, MAX: MAX, RANGES: RANGES, RULES: RULES,
    rounds: rounds, answers: answers, newState: newState, choose: choose, check: check, helpLevel: helpLevel, hintKey: hintKey,
    stuckAt: stuckAt, dotsAt: dotsAt, sail: sail, followed: followed, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.CreekMapCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
