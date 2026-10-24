/* =====================================================================
   sign-beam-core.js — the model of ACTIVITY #88, THE EQUAL-SIGN BEAM
   ("Numbers Court", 1.OA.D.7 + the G3-350 make-it-balance face). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/088-numbers-court.md
   ---------------------------------------------------------------------
   The equal sign IS the balance: a fixed top bar and a bottom bar that
   pivots under it. Both sides the same amount → the bars lie parallel
   and read "=". Otherwise the light end rises until it touches the top
   bar and the pair reads as a "<" or ">" wedge OPENING toward the bigger
   side. A court seal holds the beam until the Judge's ruling is RIGHT —
   a wrong ruling never moves the beam (no direction leaks before the
   verdict). False claims are then repaired with a dial; "Make it
   balance" starts with a blank crate.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SignBeamCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var MODES = ['tf', 'mb'], LEVELS = ['10', '20'], DIAL_MIN = 1, DIAL_MAX = 20;
  /* True or false: [left, right, fix] — fix = [side, crate, answer] for every false claim */
  var TF = {
    '10': [['3+5', '5+3'], ['7', '3+4'], ['9', '4+4', ['L', 0, 8]], ['2+6', '5+3'], ['4+3', '2+6', ['R', 1, 5]], ['5', '9-4'],
      ['3', '8-4', ['R', 0, 7]], ['4+2', '6'], ['6+2', '8+1', ['L', 1, 3]], ['6', '6'], ['9-2', '3+5', ['R', 1, 4]], ['10-3', '4+3']],
    '20': [['7+9', '9+7'], ['14', '6+8'], ['13', '7+5', ['R', 1, 6]], ['9+6', '8+7'], ['8+4', '12+1', ['R', 0, 11]], ['8', '15-7'],
      ['9', '16-8', ['L', 0, 8]], ['9+5', '14'], ['18-9', '4+5'], ['7+7', '20-5', ['R', 1, 6]], ['17', '10+7'], ['6+9', '11+3', ['R', 1, 4]]]
  };
  /* Make it balance: [left, right, blank] — the blank crate is written as ? */
  var MB = {
    '10': [['3+4', '?+5', ['R', 0, 2]], ['6+2', '5+?', ['R', 1, 3]], ['?+4', '2+7', ['L', 0, 5]], ['9-3', '?+2', ['R', 0, 4]],
      ['2+?', '10-1', ['L', 1, 7]], ['8-?', '1+6', ['L', 1, 1]], ['?-2', '3+3', ['L', 0, 8]], ['5+5', '4+?', ['R', 1, 6]]],
    '20': [['8+4', '?+5', ['R', 0, 7]], ['6+7', '10+?', ['R', 1, 3]], ['?+9', '7+8', ['L', 0, 6]], ['15-6', '?+4', ['R', 0, 5]],
      ['3+?', '13-2', ['L', 1, 8]], ['9+9', '20-?', ['R', 1, 2]], ['14-?', '6+4', ['L', 1, 4]], ['?-3', '2+4', ['L', 0, 9]],
      ['12+3', '5+?', ['R', 1, 10]], ['11+?', '6+6', ['L', 1, 1]]]
  };
  /* the witnesses, one per round in turn (library pictures: dir, key) */
  var WITNESSES = [['forest creatures', 'fox'], ['forest creatures', 'raccoon'], ['forest creatures', 'squirrel'], ['forest creatures', 'mouse'],
    ['forest creatures', 'hedgehog'], ['forest creatures', 'badger'], ['forest creatures', 'beaver'], ['forest creatures', 'owl'],
    ['forest creatures', 'rabbit'], ['pets', 'hamster'], ['pets', 'parrot'], ['farm animals', 'goat']];
  var JUDGE = ['pets', 'tortoise'];

  function modeOf(m) { return MODES.indexOf(m) >= 0 ? m : 'tf'; }
  function levelOf(l) { l = String(l); return LEVELS.indexOf(l) >= 0 ? l : '10'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function table(mode, level) { return (modeOf(mode) === 'mb' ? MB : TF)[levelOf(level)]; }
  function ids(mode, level) { var n = table(mode, level).length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* a side: { nums:[a] or [a,b] (null = the blank), op:'+'|'-'|null } */
  function parseSide(s) {
    var m = /^(\d+|\?)(?:([+-])(\d+|\?))?$/.exec(s);
    var n = function (x) { return x === '?' ? null : +x; };
    return { nums: m[2] ? [n(m[1]), n(m[3])] : [n(m[1])], op: m[2] || null };
  }
  function round(mode, level, idx) {
    mode = modeOf(mode); level = levelOf(level);
    var row = table(mode, level)[idx], L = parseSide(row[0]), R = parseSide(row[1]), f = row[2] || null;
    var spot = f ? { side: f[0], pos: f[1], ans: f[2] } : null;
    return { mode: mode, level: level, idx: idx, L: L, R: R, fix: mode === 'tf' ? spot : null, blank: mode === 'mb' ? spot : null };
  }
  function sideOf(r, s) { return s === 'L' ? r.L : r.R; }
  /* the amount a side holds; `over` = {side,pos,v} puts a value into one crate */
  function evalSide(side, over, which) {
    var a = side.nums.map(function (x, i) { return over && over.side === which && over.pos === i ? over.v : x; });
    if (a.some(function (x) { return x == null; })) return null;
    return side.op === '-' ? a[0] - a[1] : side.op === '+' ? a[0] + a[1] : a[0];
  }
  function values(r, over) { return { l: evalSide(r.L, over, 'L'), r: evalSide(r.R, over, 'R') }; }
  function isTrue(r) { var v = values(r); return v.l === v.r; }
  /* the beam: 'eq' flat; 'gt' the left is bigger (open at the left); 'lt' the right is bigger */
  function shapeOf(l, r) { return l === r ? 'eq' : l > r ? 'gt' : 'lt'; }
  /* the one value in DIAL_MIN..DIAL_MAX that balances a crate (null if none or several) */
  function solve(r, spot) {
    var hit = [];
    for (var v = DIAL_MIN; v <= DIAL_MAX; v++) { var x = values(r, { side: spot.side, pos: spot.pos, v: v }); if (x.l !== null && x.l === x.r && x.l >= 0) hit.push(v); }
    return hit.length === 1 ? hit[0] : null;
  }
  function sideText(side, over, which, blank) {
    var t = side.nums.map(function (x, i) { return over && over.side === which && over.pos === i ? (over.v == null ? blank : String(over.v)) : x == null ? blank : String(x); });
    return t.length === 2 ? t[0] + (side.op === '+' ? ' + ' : ' − ') + t[1] : t[0];
  }
  /* the claim as written; `turned` writes it the other way round */
  function claimText(r, over, turned, blank) {
    blank = blank || '□';
    var a = sideText(r.L, over, 'L', blank), b = sideText(r.R, over, 'R', blank);
    return turned ? b + ' = ' + a : a + ' = ' + b;
  }
  function form(r) {
    var l = r.L, rr = r.R, single = function (s) { return s.nums.length === 1; };
    if (single(l) && single(rr)) return 'same';
    if (!single(l) && single(rr)) return 'last';
    if (single(l) && !single(rr)) return rr.op === '-' ? 'subtraction' : 'first';
    if (l.op === '+' && rr.op === '+' && l.nums[0] === rr.nums[1] && l.nums[1] === rr.nums[0]) return 'turnaround';
    return 'both';
  }

  /* ---- order: never the previous pass; True or false never 3 of one verdict in a row ---- */
  function runOk(mode, level, order) {
    if (modeOf(mode) !== 'tf') return true;
    var run = 0, last = null;
    for (var i = 0; i < order.length; i++) { var t = isTrue(round(mode, level, order[i])); run = t === last ? run + 1 : 1; last = t; if (run > 2) return false; }
    return true;
  }
  function plan(mode, level, rnd, prev) {
    var all = ids(mode, level), order = all, ok = false;
    for (var k = 0; k < 6000 && !ok; k++) { order = shuffle(all, rnd); ok = runOk(mode, level, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r) {
    return { r: r, phase: r.mode === 'mb' ? 'balance' : 'verdict', stamp: null, dial: null, misses: 0, rmisses: 0, show: 0,
      last: null, done: false, caught: false, shape: null, turned: false };
  }
  function moved(st) { st.show = 0; st.last = null; }
  function spotOf(st) { return st.phase === 'repair' ? st.r.fix : st.phase === 'balance' ? st.r.blank : null; }
  function over(st) { var s = spotOf(st); return s ? { side: s.side, pos: s.pos, v: st.dial } : null; }
  function stamp(st, v) {
    if (st.done || st.phase !== 'verdict' || (v !== 'eq' && v !== 'ne')) return false;
    st.stamp = v; moved(st); return true;
  }
  /* the dial's range for its crate: 1..20, and a subtraction never goes to 0 or below */
  function range(st) {
    var s = spotOf(st); if (!s) return null;
    var side = sideOf(st.r, s.side), lo = DIAL_MIN, hi = DIAL_MAX;
    if (side.op === '-') { if (s.pos === 1) hi = Math.min(hi, side.nums[0] - 1); else lo = Math.max(lo, side.nums[1] + 1); }
    return { lo: lo, hi: hi };
  }
  function setDial(st, n) {
    if (st.done || !spotOf(st)) return false;
    var rg = range(st);
    n = Math.max(rg.lo, Math.min(rg.hi, Math.round(n)));
    if (n === st.dial) return false;
    st.dial = n; moved(st); return true;
  }
  function nudge(st, d) { if (!spotOf(st) || (st.dial == null && d < 0)) return false; return setDial(st, st.dial == null ? range(st).lo : st.dial + d); }
  /* bang the gavel */
  function gavel(st) {
    if (st.done) return null;
    var r = st.r, v;
    if (st.phase === 'verdict') {
      if (!st.stamp) { st.last = { reason: 'nostamp' }; return { released: false, reason: 'nostamp' }; }
      v = values(r);
      var right = (st.stamp === 'eq') === (v.l === v.r);
      if (!right) { st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'wrong' }; return { released: false, reason: 'wrong' }; }
      st.shape = shapeOf(v.l, v.r);
      if (v.l === v.r) { st.done = true; st.last = { reason: 'true', n: v.l }; return { released: true, shape: 'eq', reason: 'true' }; }
      st.caught = true; st.phase = 'repair'; st.dial = r.fix.side === 'L' ? r.L.nums[r.fix.pos] : r.R.nums[r.fix.pos]; st.show = 0;
      st.last = { reason: 'caught', l: v.l, r: v.r };
      return { released: true, shape: st.shape, reason: 'caught' };
    }
    if (st.dial == null) { st.last = { reason: 'nodial' }; return { released: false, reason: 'nodial' }; }
    v = values(r, over(st)); st.shape = shapeOf(v.l, v.r);
    if (v.l === v.r) {
      st.done = true; st.last = { reason: st.phase === 'repair' ? 'fixed' : 'balanced', n: v.l, text: claimText(r, over(st)) };
      return { released: true, shape: 'eq', reason: st.last.reason };
    }
    var s = spotOf(st), mine = s.side === 'L' ? v.l : v.r, other = s.side === 'L' ? v.r : v.l;
    st.rmisses++; st.show = Math.min(2, st.rmisses);
    st.last = { reason: 'tip', heavy: mine > other, takes: sideOf(r, s.side).op === '-' && s.pos === 1 };   /* a subtracted crate: lighter means taking away MORE */
    return { released: true, shape: st.shape, reason: 'tip' };
  }
  /* turn the court round: only a level beam, only when the round is won */
  function turn(st) { if (!st.done || st.shape !== 'eq') return false; st.turned = !st.turned; st.last = { reason: 'turn', n: st.last && st.last.n }; return true; }
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'nostamp') return 'hStamp';
    if (L.reason === 'nodial') return 'hDial';
    if (L.reason === 'wrong') return st.show >= 2 ? 'hPair' : 'hEvid';
    if (L.reason === 'tip') return L.takes ? (L.heavy ? 'hTakeMore' : 'hTakeLess') : L.heavy ? 'hHeavy' : 'hLight';
    return null;
  }
  /* the evidence: dots under the pans. Verdict: after a wrong ruling (miss 2 adds the threads).
     Repair / balance: after the second tip, the dial crate's dots drawn dashed. */
  function evidence(st) {
    var verdict = st.phase === 'verdict';
    if (st.done || !st.last || (verdict ? st.last.reason !== 'wrong' : (st.last.reason !== 'tip' || st.show < 2))) return null;
    var o = over(st), mk = function (side, which) {
      var dots = [], nums = side.nums.map(function (x, i) { return o && o.side === which && o.pos === i ? o.v : x; });
      var dash = function (i) { return !!(o && o.side === which && o.pos === i); };
      if (side.op === '-') { for (var k = 0; k < nums[0]; k++) dots.push({ gone: k >= nums[0] - nums[1], dash: dash(0) || (k >= nums[0] - nums[1] && dash(1)) }); }
      else nums.forEach(function (n, i) { for (var k = 0; k < n; k++) dots.push({ gone: false, dash: dash(i) }); });
      return dots;
    };
    var L = mk(st.r.L, 'L'), R = mk(st.r.R, 'R'), nl = L.filter(function (d) { return !d.gone; }).length, nr = R.filter(function (d) { return !d.gone; }).length;
    return { L: L, R: R, threads: verdict && st.show >= 2 ? Math.min(nl, nr) : 0, nl: nl, nr: nr };
  }
  /* the beam's geometry for a stage width: the light end touches the top bar */
  function geometry(W) {
    var narrow = W < 560, crate = narrow ? (W < 330 ? 40 : 44) : 56, opW = narrow ? 18 : 26, pan = crate * 2 + opW + 18;
    var bar = Math.min(340, Math.floor(W - pan - 10)), gap = Math.round(bar * (narrow ? 0.062 : 0.059)), thick = narrow ? 18 : 26;
    var tilt = Math.asin(gap / (bar / 2)) * 180 / Math.PI;
    return { narrow: narrow, W: W, crate: crate, opW: opW, pan: pan, bar: bar, gap: gap, thick: thick, tilt: tilt, drop: gap, string: narrow ? 84 : 112 };
  }
  /* the angle of the bottom bar: positive = the right end goes down */
  function angle(shape, geo) { return shape === 'gt' ? -geo.tilt : shape === 'lt' ? geo.tilt : 0; }
  return {
    DATA: { TF: TF, MB: MB, WITNESSES: WITNESSES, JUDGE: JUDGE }, LOCALES: LOCALES, MODES: MODES, LEVELS: LEVELS, DIAL_MIN: DIAL_MIN, DIAL_MAX: DIAL_MAX,
    modeOf: modeOf, levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, parseSide: parseSide, round: round, sideOf: sideOf, evalSide: evalSide, values: values,
    isTrue: isTrue, shapeOf: shapeOf, solve: solve, claimText: claimText, sideText: sideText, form: form, runOk: runOk, plan: plan,
    newState: newState, spotOf: spotOf, over: over, range: range, stamp: stamp, setDial: setDial, nudge: nudge, gavel: gavel, turn: turn, hint: hint, evidence: evidence,
    geometry: geometry, angle: angle
  };
});
