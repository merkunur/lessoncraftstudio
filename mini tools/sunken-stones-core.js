/* =====================================================================
   sunken-stones-core.js — the model of ACTIVITY #86, THE SUNKEN STONES
   ("Lily's Ten Stones", 1.OA.C.6). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/086-ten-stones.md
   ---------------------------------------------------------------------
   A pond is a number line 0–20. Lily the frog starts on a stone; the
   number to add or take away is a rope of beads. A leap uses beads. The
   stones on the far side of ten from Lily are under water until she has
   stood on the golden Ten Stone — a leap that crosses ten splashes and she
   swims back (never a miss). So every crossing leap breaks at ten, and the
   rest is what is left on the rope. Bank rounds have no rope: Lily must
   land exactly on 20 (past it is the reeds) and the child types how far
   she leapt. Then the child types the stone Lily is on.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SunkenStonesCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['both', 'add'];
  var BANK_MAX = 10;
  /* [kind, a, b]: add/sub start on a with a rope of b; anchor = a + b, the child picks the start; bank = start a, leap to 20 */
  var ROUNDS = {
    both: [['add', 8, 6], ['add', 7, 5], ['add', 6, 3], ['add', 9, 4], ['anchor', 3, 8], ['anchor', 9, 2], ['add', 6, 7],
      ['sub', 13, 4], ['sub', 15, 7], ['sub', 12, 5], ['sub', 14, 6, 'relation'], ['sub', 16, 4], ['sub', 11, 4],
      ['bank', 14], ['bank', 15], ['bank', 5]],
    add: [['add', 8, 6], ['add', 7, 5], ['add', 6, 3], ['add', 9, 4], ['anchor', 3, 8], ['add', 6, 7], ['add', 9, 7], ['add', 7, 8], ['anchor', 5, 9], ['bank', 8]]
  };
  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'both'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = ROUNDS[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function round(level, idx) {
    level = levelOf(level); var d = ROUNDS[level][idx], k = d[0], r = { level: level, idx: idx, kind: k, a: d[1], b: d[2] == null ? null : d[2], relation: d[3] === 'relation' };
    r.op = k === 'sub' ? '-' : '+';
    r.dir = k === 'sub' ? -1 : 1;
    if (k === 'bank') { r.answer = 20 - r.a; r.end = 20; r.starts = [r.a]; }
    else { r.answer = k === 'sub' ? r.a - r.b : r.a + r.b; r.end = r.answer; r.starts = k === 'anchor' ? [r.a, r.b] : [r.a]; }
    r.crosses = crossesFrom(r, r.starts[0]);
    return r;
  }
  /* the rope a start leaves: anchor = the other number */
  function ropeFor(r, s) { if (r.kind === 'bank') return null; if (r.kind === 'anchor') return s === r.a ? r.b : r.a; return r.b; }
  function crossesFrom(r, s) {
    if (r.kind === 'bank') return s < 10;
    var e = r.kind === 'sub' ? s - ropeFor(r, s) : s + ropeFor(r, s);
    return (s < 10 && e > 10) || (s > 10 && e < 10);
  }
  /* the leaps the water allows that empty the rope: the distance to ten, then the rest (crossing); any split otherwise */
  function forcedSplit(r, s) {
    var n = r.kind === 'bank' ? 20 - s : ropeFor(r, s);
    if (r.kind === 'bank') return s < 10 ? [10 - s, 10] : [n];
    if (!crossesFrom(r, s)) return [n];
    var p = r.dir > 0 ? 10 - s : s - 10; return [p, n - p];
  }
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var k = 0; k < 6000; k++) {
      order = shuffle(all, rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      var bad = false, run = 1;
      for (var p = 1; p < order.length && !bad; p++) {
        var x = round(level, order[p]), y = round(level, order[p - 1]);
        if (x.answer === y.answer) bad = true;
        run = x.op === y.op ? run + 1 : 1; if (level === 'both' && run > 2) bad = true;
      }
      if (!bad) break;
    }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r) {
    var st = { r: r, lily: null, start: null, rope: null, leaps: [], stops: [], tenVisited: false, typed: '', misses: 0, show: 0, last: null, done: false };
    if (r.kind !== 'anchor') chooseStart(st, r.a, true);
    return st;
  }
  function moved(st) { st.show = 0; st.last = null; }
  function chooseStart(st, s, quiet) {
    var r = st.r;
    if (st.done || st.start != null || r.starts.indexOf(s) < 0) return false;
    st.start = s; st.lily = s; st.rope = ropeFor(r, s); st.stops = [s]; st.tenVisited = s === 10;
    if (!quiet) moved(st);
    return true;
  }
  /* which side of ten a stone is on: -1 below, 0 ten, +1 above */
  function side(n) { return n < 10 ? -1 : n > 10 ? 1 : 0; }
  function sunken(st, stone) {
    if (st.tenVisited || st.lily == null || stone === 10) return false;
    var s = side(st.lily); return s !== 0 && side(stone) === -s;
  }
  function canLeap(st) { return !st.done && st.lily != null && !finished(st); }
  function maxLeap(st) { return st.r.kind === 'bank' ? BANK_MAX : st.rope; }
  /* leap n stones the round's way: 'land' | 'ten' | 'splash' | 'reeds' | 'rope' | null */
  function leap(st, n) {
    var r = st.r; n = n | 0;
    if (!canLeap(st) || n < 1) return null;
    if (n > maxLeap(st)) { st.last = { reason: 'rope' }; st.show = 0; return 'rope'; }
    var t = st.lily + r.dir * n;
    if (t > 20 || t < 0) { st.last = { reason: 'reeds' }; st.show = 0; return 'reeds'; }
    if (sunken(st, t)) { st.last = { reason: 'splash' }; st.show = 0; return 'splash'; }   /* the water: never a miss */
    st.lily = t; if (st.rope != null) st.rope -= n; st.leaps.push(n); st.stops.push(t);
    var ten = t === 10 && !st.tenVisited; if (t === 10) st.tenVisited = true;
    moved(st); st.last = { reason: ten ? 'ten' : 'land' };
    return ten ? 'ten' : 'land';
  }
  /* tap a stone: a leap to it, if it lies ahead */
  function leapTo(st, stone) {
    if (!canLeap(st)) return null;
    var n = (stone - st.lily) * st.r.dir; if (n < 1) return null;
    return leap(st, n);
  }
  function undo(st) {
    if (st.done || !st.leaps.length) return false;
    var n = st.leaps.pop(); st.stops.pop(); st.lily = st.stops[st.stops.length - 1]; if (st.rope != null) st.rope += n;
    st.tenVisited = st.stops.indexOf(10) >= 0; moved(st); return true;
  }
  function finished(st) { return st.lily != null && (st.r.kind === 'bank' ? st.lily === 20 : st.rope === 0); }
  function type(st, d) {
    if (st.done || !finished(st)) return false;
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); moved(st); return true; }
    if (!/^[0-9]$/.test(String(d)) || st.typed.length >= 2 || (st.typed === '' && d === '0')) return false;
    st.typed += d; moved(st); return true;
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (st.lily == null) { st.last = { reason: 'pick' }; st.show = 0; return { ok: false, reason: 'pick' }; }
    if (!finished(st)) { st.last = { reason: 'go' }; st.show = 0; return { ok: false, reason: 'go' }; }
    if (st.typed === '') { st.last = { reason: 'empty' }; st.show = 0; return { ok: false, reason: 'empty' }; }
    var n = +st.typed;
    if (n === r.answer) { st.done = true; st.show = 0; st.last = { reason: 'ok' }; return { ok: true }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss', n: n };
    return { ok: false, reason: 'miss', show: st.show };
  }
  /* did Lily's path stop on ten (a crossing broken at ten)? */
  function viaTen(st) { return st.stops.indexOf(10) > 0 && st.stops[0] !== 10 && st.lily !== 10; }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason, r = st.r, bank = r.kind === 'bank';
    if (R === 'pick') return 'hPick';
    if (R === 'go') return bank ? 'hBankGo' : 'hRope';
    if (R === 'splash') return 'nSplash';
    if (R === 'reeds') return 'nReeds';
    if (R === 'rope') return bank ? 'nFar' : 'nRope';   /* a bank round has no beads */
    if (R === 'ten') return 'nTen';
    if (R === 'land') return finished(st) ? (bank ? 'hTypeBank' : 'hType') : null;
    if (R === 'empty') return bank ? 'hTypeBank' : 'hType';
    if (R !== 'miss') return null;
    if (bank) return 'hBankMiss';
    var above = st.lily > 10;   /* which side of ten Lily is on decides on or back, not the operation */
    if (st.show >= 2 && viaTen(st)) return above ? 'hTenOn' : 'hTenBack';
    if (viaTen(st)) return above ? 'hOn' : 'hBack';
    return 'hNear';
  }
  /* the stones the round can reach (for the phone window) */
  function reach(r) {
    var pts = [10, r.end];
    r.starts.forEach(function (s) { pts.push(s); });
    if (r.kind === 'anchor') r.starts.forEach(function (s) { pts.push(r.dir > 0 ? s + ropeFor(r, s) : s - ropeFor(r, s)); });
    return { lo: Math.max(0, Math.min.apply(null, pts) - 1), hi: Math.min(20, Math.max.apply(null, pts) + 1) };
  }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, BANK_MAX: BANK_MAX }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, round: round, ropeFor: ropeFor, crossesFrom: crossesFrom, forcedSplit: forcedSplit, plan: plan,
    newState: newState, chooseStart: chooseStart, side: side, sunken: sunken, maxLeap: maxLeap, leap: leap, leapTo: leapTo, undo: undo, finished: finished,
    type: type, check: check, viaTen: viaTen, hint: hint, reach: reach, layout: layout
  };
});
