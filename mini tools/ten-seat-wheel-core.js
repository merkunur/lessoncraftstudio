/* =====================================================================
   ten-seat-wheel-core.js — the model of THE TEN-SEAT WHEEL
   (activity #28 of the one-by-one rebuild, "Make 10", K.OA.A.4).
   Design sheet: docs/activities-rebuild/designs/028-numberbond.md
   ---------------------------------------------------------------------
   A Ferris wheel whose hub is the whole and whose gondolas are the parts.
   FILL rounds: k riders are aboard; the child sets the gate dial (1–9),
   pulls the gate lever (that many riders board, the extras that do not fit
   stand on the platform edge) and releases the brake: a full wheel spins;
   empty seats make it lurch and settle with the empty gondolas at the top
   (the filled seats' centre of mass straight below the hub); riders on the
   edge hold the brake and all hop back off. WHOLE rounds: every seat is
   full with two kinds of rider and the hub carries the dial.
   Pure model, no DOM. Node-loadable (verify-ten-seat-wheel-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVELS_LIST = ['upto5', 'six9', 'ten'];
  /* the design's tables: F = fill [n, aboard] · W = whole [a, b] */
  var LEVELS = {
    ten: [['F', 10, 7], ['F', 10, 4], ['F', 10, 9], ['F', 10, 2], ['F', 10, 6], ['F', 10, 5], ['F', 10, 8], ['F', 10, 3], ['F', 10, 1]],
    upto5: [['F', 5, 3], ['F', 4, 1], ['W', 2, 2], ['F', 5, 1], ['F', 3, 2], ['W', 3, 2], ['F', 5, 2], ['F', 4, 2]],
    six9: [['F', 6, 4], ['F', 7, 3], ['W', 5, 3], ['F', 8, 5], ['F', 9, 2], ['W', 4, 2], ['F', 9, 4], ['F', 7, 6], ['W', 6, 3]]
  };
  /* one kind aboard + one kind in the queue, contrasting (RULINGS: hen only, never chick with
     duck, never lamb with sheep) */
  var PAIRS = [['chick', 'pig'], ['lamb', 'duck'], ['rabbit', 'goat'], ['cow', 'hen'], ['dog', 'sheep'], ['horse', 'turkey']];
  var THEME = 'farm animals';
  var DIAL_START = 5, DIAL_MIN = 1, DIAL_MAX = 9, HUB_MIN = 2, HUB_MAX = 10;

  function level(name) { return LEVELS_LIST.indexOf(name) >= 0 ? name : 'ten'; }
  function rounds(name) {
    var lv = level(name);
    return LEVELS[lv].map(function (x, i) {
      var r = { level: lv, index: i, pair: PAIRS[i % PAIRS.length].slice() };
      if (x[0] === 'F') { r.kind = 'fill'; r.n = x[1]; r.k = x[2]; r.answer = x[1] - x[2]; }
      else { r.kind = 'whole'; r.a = x[1]; r.b = x[2]; r.n = x[1] + x[2]; r.k = r.n; r.answer = r.n; }
      r.id = lv + '.' + r.kind + '.' + r.n + '.' + (r.kind === 'fill' ? r.k : r.a + '-' + r.b) + '.' + i;
      return r;
    });
  }
  function norm(d) { d = d % 360; return d < 0 ? d + 360 : d; }
  function step(n) { return 360 / n; }
  /* seat i sits at screen angle rot + i·step (0° = right, clockwise; 90° = straight down) */
  function seatAngle(rot, i, n) { return norm(rot + i * step(n)); }
  /* the lurch: the rotation that puts the filled seats' centre of mass straight below the hub */
  function settleAngle(n, filled) {
    var sx = 0, sy = 0;
    filled.forEach(function (i) { var a = i * step(n) * Math.PI / 180; sx += Math.cos(a); sy += Math.sin(a); });
    if (Math.abs(sx) < 1e-9 && Math.abs(sy) < 1e-9) return null;
    return norm(90 - Math.atan2(sy, sx) * 180 / Math.PI);
  }

  /* ---------------- the order ----------------
     a pass opens on a FILL round · no two WHOLE side by side · never the same order twice ·
     a pass never opens where the last one closed */
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length;
    if (n < 2) return pool.map(function (r, i) { return i; });
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    var used = [], seq = [];
    for (var u = 0; u < n; u++) used.push(false);
    var ok = (function dfs() {
      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));
      var cands = [];
      for (var i = 0; i < n; i++) if (!used[i]) cands.push(i);
      for (var j = cands.length - 1; j > 0; j--) { var k = Math.floor(rand() * (j + 1)); var t = cands[j]; cands[j] = cands[k]; cands[k] = t; }
      for (var c = 0; c < cands.length; c++) {
        var x = cands[c], L = seq.length;
        if (L === 0 && (x === lastPrev || pool[x].kind !== 'fill')) continue;
        if (L > 0 && pool[x].kind === 'whole' && pool[seq[L - 1]].kind === 'whole') continue;
        used[x] = true; seq.push(x);
        if (dfs()) return true;
        used[x] = false; seq.pop();
      }
      return false;
    }());
    return ok ? seq : pool.map(function (r, i) { return i; });
  }

  /* ---------------- state ---------------- */
  function newState(r, rand) {
    rand = rand || Math.random;
    return { id: r.id, level: r.level, kind: r.kind, n: r.n, k: r.k, a: r.a || null, b: r.b || null, pair: r.pair.slice(),
      boarded: 0, dial: DIAL_START, extras: 0, hub: null, rot: Math.floor(rand() * 3600) / 10,
      misses: 0, help: 0, last: null, done: false, explore: false };
  }
  /* free play ("Fairground"): any wheel 2–10, nobody aboard at the start, nothing judged */
  function newPlay(n) {
    return { id: 'play', level: 'play', kind: 'play', n: n || 6, k: 0, a: null, b: null, pair: PAIRS[0].slice(),
      boarded: 0, dial: DIAL_START, extras: 0, hub: null, rot: 0, misses: 0, help: 0, last: null, done: false, explore: true };
  }
  function setSeats(st, n) { if (!st.explore) return false; st.n = Math.max(2, Math.min(10, n)); st.boarded = 0; st.extras = 0; st.last = null; st.rot = 0; return true; }
  function moved(st) { st.help = 0; st.last = null; }
  function free(st) { return st.n - st.k; }
  function filledCount(st) { return st.k + st.boarded; }

  function setDial(st, v) { if (st.done || st.kind === 'whole') return false; v = Math.max(DIAL_MIN, Math.min(DIAL_MAX, Math.round(v))); if (v === st.dial) return false; st.dial = v; moved(st); return true; }
  function stepDial(st, d) { return setDial(st, st.dial + d); }
  /* the hub dial (WHOLE): blank until first touched; the first touch starts from 5 */
  function setHub(st, v) { if (st.done || st.kind !== 'whole') return false; v = Math.max(HUB_MIN, Math.min(HUB_MAX, Math.round(v))); if (v === st.hub) return false; st.hub = v; moved(st); return true; }
  function stepHub(st, d) { return setHub(st, (st.hub == null ? DIAL_START : st.hub) + d); }

  /* the gate lever: the wheel takes exactly the dial's riders from the queue — those that do not
     fit stand on the platform edge; a dial lower than the riders already boarded sends the
     difference back to the queue. Each rider boards the empty seat at the bottom, so the wheel
     ends with the next empty seat at the bottom. */
  function board(st) {
    if (st.done || st.kind === 'whole') return null;
    var before = st.boarded;
    st.boarded = Math.min(st.dial, free(st));
    st.extras = Math.max(0, st.dial - free(st));
    st.rot = norm(90 - filledCount(st) * step(st.n));
    moved(st);
    return { added: st.boarded - before, boarded: st.boarded, extras: st.extras };
  }
  /* let a boarded rider off (never one who was aboard at the start) */
  function letOff(st, seat) {
    if (st.done || st.kind === 'whole') return false;
    if (seat != null && (seat < st.k || seat >= filledCount(st))) return false;
    if (st.boarded < 1) return false;
    st.boarded--; st.extras = 0;
    st.dial = Math.max(DIAL_MIN, st.boarded);
    moved(st);
    return true;
  }

  function miss(st, res) { st.misses++; st.help = Math.min(2, st.misses); res.miss = true; st.last = res; return res; }
  /* the brake (= Check) */
  function release(st) {
    if (st.done) return null;
    var res;
    if (st.kind === 'whole') {
      if (st.hub == null) res = { state: 'unset' };
      else if (st.hub === st.n) { res = { state: 'wholeRight' }; st.done = true; }
      else return miss(st, { state: 'wholeWrong', hub: st.hub });
      st.last = res; return res;
    }
    if (st.extras > 0) {
      res = { state: 'over', extras: st.extras, boarded: st.boarded };
      /* the brake holds; every rider boarded this try hops back off; the dial keeps its number */
      st.boarded = 0; st.extras = 0;
      return st.explore ? (st.last = res) : miss(st, res);
    }
    if (st.boarded === 0 && !st.explore) { res = { state: 'empty' }; st.last = res; return res; }
    var f = filledCount(st);
    if (f === st.n) { res = { state: 'full' }; if (!st.explore) st.done = true; st.last = res; return res; }
    var filled = []; for (var i = 0; i < f; i++) filled.push(i);
    var rest = settleAngle(st.n, filled);
    if (rest != null) st.rot = rest;
    res = { state: 'short', empties: st.n - f, rot: st.rot };
    return st.explore ? (st.last = res) : miss(st, res);
  }

  /* what each seat holds: 'start' (aboard from the round's start, kind pair[0]) · 'board' (from the
     queue, kind pair[1]) · null (empty) */
  function seats(st) {
    var out = [];
    for (var i = 0; i < st.n; i++) {
      if (st.kind === 'whole') out.push({ who: 'start', kind: i < st.a ? st.pair[0] : st.pair[1] });
      else if (i < st.k) out.push({ who: 'start', kind: st.pair[0] });
      else if (i < filledCount(st)) out.push({ who: 'board', kind: st.pair[1] });
      else out.push(null);
    }
    return out;
  }
  /* the help: miss 2 (FILL) numbers the empty seats counting on from the filled ones — never the
     answer's numeral; miss 2 (WHOLE) numbers every seat 1 … n */
  function seatMarks(st) {
    if (st.done || st.help < 2 || st.explore) return null;
    var out = [];
    if (st.kind === 'whole') { for (var i = 0; i < st.n; i++) out.push(i + 1); return out; }
    var f = filledCount(st);
    for (var j = 0; j < st.n; j++) out.push(j >= f ? j + 1 : '');
    return out;
  }
  function countOnSeq(st) { var m = seatMarks(st); return m ? m.filter(function (x) { return x !== ''; }) : []; }
  /* which dial arrow glows at miss 2: up = more riders (or a bigger whole), down = fewer */
  function arrowGlow(st) {
    if (st.done || st.help < 2 || !st.last) return null;
    if (st.kind === 'whole') return st.hub < st.n ? 'up' : 'down';
    return st.last.state === 'over' ? 'down' : st.last.state === 'short' ? 'up' : null;
  }
  function hint(st) {
    if (st.explore || st.done) return null;
    var L = st.last;
    if (!L) return null;
    if (L.state === 'empty') return { key: 'hintDial' };
    if (L.state === 'unset') return { key: 'hintHub' };
    if (st.help >= 2 && st.kind === 'fill') return { key: 'hintCountOn', seq: countOnSeq(st).join(', '), wrong: true };
    if (L.state === 'short') return { key: 'hintShort', wrong: true };
    if (L.state === 'over') return { key: 'hintOver', wrong: true };
    if (L.state === 'wholeWrong') return { key: 'hintWhole', wrong: true };
    return null;
  }
  function promptKey(r) {
    if (r.kind === 'whole') return 'promptWhole';
    var base = r.n === 10 ? 'promptFill10' : 'promptFill';
    return r.k === 1 ? base + 'One' : base;
  }
  function celebrateKey(r, lastOfPass) {
    if (lastOfPass && r.level === 'ten') return 'celebrateTen';
    return r.kind === 'whole' ? 'celebrateWhole' : 'celebrateFill';
  }

  /* ---------------- layout ----------------
     wide (≥ 620): the wheel in the left column, the bond board in a 152 px column; narrow: stacked.
     The radius is the largest that fits, up to the design's 190 (wide) / 110 on phones (design 120; 110 leaves every locale's
     Fairground note on screen at 360 and the cups still clear their neighbours); a gondola
     fits between its neighbours on a ten-seat wheel. */
  function layout(W) {
    var wide = W >= 620, L = { mode: wide ? 'wide' : 'narrow' };
    L.side = wide ? 152 : 0; L.gap = wide ? 12 : 0;
    L.col = W - L.side - L.gap;
    if (wide) { L.gond = { w: 104, h: 104 }; L.rider = 96; L.hub = 96; L.hubFont = 48; L.queue = 3; L.qRider = 96; }
    else if (W >= 300) { L.gond = { w: 70, h: 70 }; L.rider = 64; L.hub = 64; L.hubFont = 34; L.queue = 2; L.qRider = 64; }
    else { L.gond = { w: 62, h: 62 }; L.rider = 56; L.hub = 56; L.hubFont = 30; L.queue = 2; L.qRider = 56; }
    L.R = Math.min(wide ? 190 : 110, Math.floor((L.col - L.gond.w) / 2));
    L.wheelW = 2 * L.R + L.gond.w; L.wheelH = 2 * L.R + L.gond.h + 8;
    L.arrow = 48; L.lever = wide ? 64 : 56; L.brake = 56; L.dialWin = 56;
    return L;
  }

  var api = {
    LEVELS_LIST: LEVELS_LIST, LEVELS: LEVELS, PAIRS: PAIRS, THEME: THEME, DIAL_START: DIAL_START,
    level: level, rounds: rounds, order: order, norm: norm, step: step, seatAngle: seatAngle, settleAngle: settleAngle,
    newState: newState, newPlay: newPlay, setSeats: setSeats, free: free, filledCount: filledCount,
    setDial: setDial, stepDial: stepDial, setHub: setHub, stepHub: stepHub, board: board, letOff: letOff, release: release,
    seats: seats, seatMarks: seatMarks, countOnSeq: countOnSeq, arrowGlow: arrowGlow, hint: hint,
    promptKey: promptKey, celebrateKey: celebrateKey, layout: layout
  };
  global.TenSeatWheelCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
