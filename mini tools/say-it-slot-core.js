/* =====================================================================
   say-it-slot-core.js — the model of ACTIVITY #165 of the one-by-one
   rebuild: "Count Out the Money — Coins to a Target Amount"
   → THE SAY-IT SLOT (2.MD.C.8). Pure, no DOM.
   Design: docs/activities-rebuild/designs/165-money.md
   ---------------------------------------------------------------------
   Pip's bakery coin box only swallows a coin when its counter already
   says what the box will hold with that coin inside: the child counts on
   BEFORE every coin. The counter cannot turn past the price (the price
   pin), so overshoot is impossible; the purse is real and finite, so
   spending the small coins first can strand you. There is no running
   total anywhere: the only number is the one the child turns.
   Values are whole minor units (cents / centavos) or, for MXN SEK DKK
   NOK, whole units — never decimals at this grade.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var FAMILY = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
  var LEVELS = ['1', '2', '3'];
  var MODES = ['purse', 'endless'];
  /* the real coins: diameter (mm), metal, reeded edge, centre hole (design §4; same table as rows 164/166) */
  var C = function (v, d, metal, o) { o = o || {}; return { v: v, d: d, metal: metal, reeded: !!o.reeded, hole: !!o.hole }; };
  var EUR = [C(1, 16.25, 'copper'), C(2, 18.75, 'copper'), C(5, 21.25, 'copper'), C(10, 19.75, 'gold'), C(20, 22.25, 'gold'), C(50, 24.25, 'gold'), C(100, 23.25, 'bi-sg')];
  var COINS = {
    USD: [C(1, 19.05, 'copper'), C(5, 21.21, 'silver'), C(10, 17.91, 'silver', { reeded: true }), C(25, 24.26, 'silver', { reeded: true })],
    EURF: EUR,
    EURR: EUR.filter(function (c) { return c.v >= 5; }),
    MXN: [C(1, 21, 'bi-gs'), C(2, 23, 'bi-gs'), C(5, 25.5, 'bi-gs'), C(10, 28, 'bi-sg')],
    BRL: [C(5, 22, 'copper'), C(10, 20, 'gold'), C(25, 25, 'gold'), C(50, 23, 'silver'), C(100, 27, 'bi-sg')],
    SEK: [C(1, 19.5, 'silver'), C(2, 22.5, 'silver'), C(5, 23.75, 'gold'), C(10, 20.5, 'gold')],
    DKK: [C(1, 20.25, 'silver', { hole: true }), C(2, 24.5, 'silver', { hole: true }), C(5, 28.5, 'silver', { hole: true }), C(10, 23.35, 'gold'), C(20, 27, 'gold')],
    NOK: [C(1, 21, 'silver', { hole: true }), C(5, 26, 'silver', { hole: true }), C(10, 24, 'gold'), C(20, 27.5, 'gold')]
  };
  var X = function (n, v) { var a = []; for (var i = 0; i < n; i++) a.push(v); return a; };
  var cat = function () { return [].concat.apply([], arguments); };
  /* level 1 — count out (design §6; every price made at least two ways, no coin equal to the price) */
  var L1 = {
    USD: [[30, [25, 10, 10, 5, 5]], [15, [10, 5, 5, 5, 1]], [40, [25, 10, 10, 10, 5, 5]], [11, [10, 5, 5, 1, 1]], [26, [25, 10, 10, 5, 1]], [35, [25, 10, 5, 5, 1]], [50, [25, 25, 10, 10, 5]], [20, [10, 10, 5, 5, 1]]],
    EURF: [[30, [20, 10, 10, 5, 5]], [7, [5, 2, 1, 1, 1]], [16, [10, 5, 5, 5, 1]], [70, [50, 20, 10, 5, 5]], [45, [20, 20, 10, 10, 5]], [80, [50, 20, 10, 5, 5]], [150, [100, 50, 50, 50, 50]], [120, [100, 20, 10, 5, 5]]],
    EURR: [[30, [20, 10, 10, 5, 5]], [15, [10, 5, 5, 5, 5]], [70, [50, 20, 20, 20, 10]], [25, [20, 10, 10, 5, 5]], [60, [50, 20, 20, 10, 10]], [150, [100, 50, 20, 20, 10]], [110, [100, 50, 50, 50, 10]], [85, [50, 20, 10, 5, 5, 5]]],
    MXN: [[8, [5, 2, 2, 2, 1, 1]], [13, [10, 2, 1, 1, 1]], [17, [10, 5, 5, 5, 2]], [22, [10, 10, 2, 1, 1]], [26, [10, 10, 5, 5, 5, 1]], [30, [10, 10, 10, 5, 5, 1]], [35, [10, 10, 10, 5, 5, 5]], [41, [10, 10, 10, 10, 5, 5, 1, 1]]],
    BRL: [[15, [10, 5, 5, 5, 5]], [30, [25, 10, 10, 10, 5]], [35, [25, 10, 10, 10, 5]], [45, [25, 10, 10, 5, 5]], [60, [50, 25, 25, 25, 10]], [75, [50, 25, 10, 10, 5]], [85, [50, 25, 25, 25, 10]], [100, [50, 50, 25, 25, 5]]],
    SEK: [[12, [10, 5, 5, 5, 2]], [7, [5, 2, 1, 1, 1]], [16, [10, 5, 5, 5, 1]], [21, [10, 10, 5, 5, 1, 1]], [9, [5, 2, 2, 2, 2, 1]], [17, [10, 5, 2, 1, 1]], [14, [10, 5, 5, 2, 2]], [25, [10, 10, 5, 2, 2, 1]]],
    DKK: [[7, [5, 2, 2, 2, 1]], [13, [10, 2, 1, 1, 1]], [17, [10, 5, 5, 5, 2]], [22, [20, 2, 1, 1, 1]], [26, [20, 10, 10, 5, 1]], [31, [20, 10, 5, 5, 1]], [38, [20, 10, 10, 10, 5, 2, 1]], [45, [20, 20, 5, 2, 2, 1]]],
    NOK: [[16, [10, 5, 5, 5, 1]], [7, [5, 5, 5, 1, 1]], [12, [10, 5, 5, 1, 1]], [23, [20, 10, 10, 1, 1, 1, 1]], [31, [20, 10, 10, 10, 1]], [26, [20, 10, 10, 5, 1, 1]], [35, [20, 10, 10, 10, 5]], [41, [20, 20, 10, 10, 1, 1]]]
  };
  /* level 2 — fewest coins (the fewest set unique in each purse, and a longer way always there) */
  var MXSE2 = [[15, [10, 5, 2, 2, 1]], [16, [10, 5, 5, 5, 1]], [8, [5, 2, 1, 1, 1]], [12, [10, 2, 1, 1, 1]], [25, [10, 10, 5, 5, 5]], [30, [10, 10, 10, 5, 5]], [18, [10, 5, 2, 1, 1, 1]], [37, [10, 10, 10, 5, 2, 1, 1]]];
  var L2 = {
    USD: [[30, [25, 10, 10, 5, 5]], [35, [25, 10, 5, 5, 1]], [40, [25, 10, 5, 5, 5]], [45, [25, 10, 10, 5, 5]], [60, [25, 25, 10, 5, 5]], [75, [25, 25, 25, 10, 10, 5]], [16, [10, 5, 5, 5, 1]], [52, [25, 25, 10, 10, 5, 1, 1]]],
    EURF: [[30, [20, 10, 5, 5, 1]], [7, [5, 2, 1, 1, 1]], [16, [10, 5, 5, 5, 1]], [70, [50, 20, 10, 5, 5]], [45, [20, 20, 10, 10, 5]], [80, [50, 20, 10, 5, 5]], [150, [100, 50, 20, 20, 10]], [120, [100, 20, 10, 5, 5]]],
    EURR: [[30, [20, 10, 5, 5, 5]], [35, [20, 10, 5, 5, 5]], [70, [50, 20, 10, 5, 5]], [45, [20, 20, 10, 10, 5]], [80, [50, 20, 10, 5, 5]], [150, [100, 50, 20, 20, 10]], [120, [100, 20, 10, 5, 5]], [95, [50, 20, 20, 10, 10, 5]]],
    MXN: MXSE2,
    BRL: [[35, [25, 10, 5, 5, 5]], [75, [50, 25, 10, 10, 5]], [60, [50, 10, 5, 5, 5]], [40, [25, 10, 5, 5, 5]], [85, [50, 25, 10, 5, 5]], [65, [50, 10, 5, 5, 5]], [30, [25, 10, 10, 5, 5]], [90, [50, 25, 10, 5, 5, 5]]],
    SEK: MXSE2,
    DKK: [[15, [10, 5, 2, 2, 1]], [25, [20, 5, 2, 2, 1]], [8, [5, 2, 1, 1, 1]], [12, [10, 2, 1, 1, 1]], [32, [20, 10, 2, 1, 1]], [37, [20, 10, 5, 2, 1, 1]], [18, [10, 5, 2, 1, 1, 1]], [47, [20, 20, 5, 2, 1, 1]]],
    NOK: [[15, [10, 5, 5, 5, 1]], [25, [20, 10, 5, 5, 5]], [17, [10, 5, 5, 5, 1, 1]], [12, [10, 5, 5, 1, 1]], [31, [20, 10, 5, 5, 1]], [36, [20, 10, 5, 5, 5, 1]], [16, [10, 5, 5, 5, 1]], [47, [20, 20, 10, 10, 5, 1, 1]]]
  };
  /* level 3 — top up (price, Pip's coins already in, the purse to add from) and compare (two trays) */
  var T = function (price, pre, add) { return { kind: 'top', price: price, pre: pre, purse: add }; };
  var K = function (a, b) { return { kind: 'compare', a: a, b: b }; };
  var MXSE3 = [T(20, [10, 5], [10, 5, 1, 1]), T(25, [10, 10, 1], [5, 2, 2, 1]), T(15, [5, 2, 1], [10, 5, 2, 1]), T(30, [10, 10, 2, 2], [10, 5, 1, 1]), T(40, [10, 10, 5, 2], [10, 2, 1, 1, 1]), T(12, [5, 2], [10, 5, 1, 1]),
    K(cat(X(6, 1), [2, 2, 2]), [10, 5]), K([5, 5, 2], [10])];
  var L3 = {
    USD: [T(50, [25, 10], [25, 10, 5, 1]), T(75, [25, 25], [25, 1, 1, 1]), T(40, [10, 10, 5], [25, 10, 5, 1]), T(60, [25, 10, 5, 1], [25, 10, 5, 1, 1, 1, 1]), T(85, [25, 25, 10, 5], [25, 10, 10, 1]), T(30, [10, 1, 1], [25, 10, 5, 1, 1, 1]),
      K(cat(X(8, 1), [5, 5]), [10, 10]), K([10, 10, 10], [25])],
    EURF: [T(50, [20, 10], [50, 20, 1, 1]), T(75, [50, 20], [10, 5, 1, 1]), T(40, [10, 10, 5], [20, 10, 5, 1]), T(60, [20, 20, 1], [20, 10, 5, 2, 2]), T(90, [50, 20, 5], [20, 10, 5, 1]), T(30, [10, 2], [20, 10, 5, 2, 1]),
      K(cat(X(8, 1), [5, 5]), [10, 10]), K([10, 10, 10, 5], [20, 10])],
    EURR: [T(50, [20, 10], [50, 20, 5, 5]), T(85, [50, 5], [50, 20, 10, 5]), T(40, [10, 10, 5], [20, 10, 5, 5]), T(70, [20, 20, 5], [50, 20, 5, 5]), T(90, [50, 20, 5], [20, 10, 5, 5]), T(40, [10, 5], [50, 20, 5, 5]),
      K(X(6, 5), [20, 20]), K([10, 10, 10, 10], [20, 10])],
    MXN: MXSE3,
    BRL: [T(50, [25, 10], [25, 10, 5, 5]), T(85, [50, 10], [50, 25, 5, 5]), T(40, [10, 10, 5], [25, 10, 5, 5]), T(60, [25, 10, 5], [25, 10, 10, 5]), T(90, [50, 25, 5], [25, 10, 5, 5]), T(40, [10, 5], [50, 25, 5, 5]),
      K(X(7, 5), [25, 25]), K([25, 25, 10], [50])],
    SEK: MXSE3,
    DKK: [T(20, [10, 5], [10, 5, 1, 1]), T(25, [20, 1], [5, 2, 2, 1]), T(15, [5, 2, 1], [10, 5, 2, 1]), T(30, [20, 2, 2], [10, 5, 1, 1]), T(40, [20, 10, 2], [10, 5, 2, 1]), T(12, [5, 2], [10, 5, 1, 1]),
      K(cat(X(6, 1), [2, 2, 2]), [20]), K([5, 5, 5, 2], [10, 5])],
    NOK: [T(20, [10, 5], [10, 5, 1, 1]), T(25, [10, 10, 1], [5, 1, 1, 1, 1]), T(15, [5, 1, 1], [10, 5, 1, 1, 1]), T(30, [10, 10, 1, 1], [10, 5, 1, 1, 1]), T(40, [20, 10, 5, 1], [5, 1, 1, 1, 1]), T(12, [5, 1], [10, 5, 1, 1]),
      K(cat(X(9, 1), [5, 5]), [20]), K([5, 5, 5, 1], [10, 5])]
  };
  /* the bakery treat a round pays for (library pictures, seen on a contact sheet) */
  var TREATS = ['cookie', 'croissant', 'cupcake', 'doughnut', 'pretzel', 'waffle', 'bagel', 'brownie'];

  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function desc(a) { return a.slice().sort(function (x, y) { return y - x; }); }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function famOf(l) { return FAMILY[locOf(l)]; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : '1'; }
  function modeOf(v) { return MODES.indexOf(String(v)) >= 0 ? String(v) : 'purse'; }
  function coin(fam, v) { var cs = COINS[fam]; for (var i = 0; i < cs.length; i++) if (cs[i].v === v) return cs[i]; return null; }
  function kinds(fam) { return desc(COINS[fam].map(function (c) { return c.v; })); }
  function rounds(fam, level) {
    level = levelOf(level);
    var src = level === '1' ? L1[fam] : level === '2' ? L2[fam] : L3[fam];
    return src.map(function (r, i) {
      var o = Array.isArray(r) ? { kind: level === '1' ? 'count' : 'fewest', price: r[0], purse: r[1] } : r;
      var out = { k: i, level: level, treat: TREATS[i % TREATS.length] };
      for (var p in o) out[p] = o[p];
      return out;
    });
  }
  /* every way to pick a sub-multiset of the coins that makes the amount (exhaustive; purses are small) — as sorted value lists, distinct */
  function ways(target, purse) {
    var seen = {}, out = [], n = purse.length;
    for (var mask = 1; mask < (1 << n); mask++) {
      var s = 0, pick = []; for (var i = 0; i < n; i++) if (mask & (1 << i)) { s += purse[i]; pick.push(purse[i]); }
      if (s === target) { var key = desc(pick).join(); if (!seen[key]) { seen[key] = 1; out.push(desc(pick)); } }
    }
    return out;
  }
  function canMake(target, coins) { if (target === 0) return true; if (target < 0) return false; var can = [true]; for (var i = 0; i < coins.length; i++) for (var t = target; t >= coins[i]; t--) if (can[t - coins[i]]) can[t] = true; return !!can[target]; }
  /* the fewest coins that make the amount — from a purse, or (endless) from unlimited coins of the family */
  function fewestCount(target, purse) { var w = ways(target, purse), best = Infinity; w.forEach(function (x) { if (x.length < best) best = x.length; }); return best; }
  function fewestUnlimited(target, fam) { var ks = kinds(fam), d = [0]; for (var t = 1; t <= target; t++) { d[t] = Infinity; ks.forEach(function (v) { if (v <= t && d[t - v] + 1 < d[t]) d[t] = d[t - v] + 1; }); } return d[target]; }
  /* the count-on steps a coin's worth is said in: hundreds, then tens, then a five, then ones (a quarter from 35: 45, 55, 60) */
  function steps(from, v) {
    var out = [], t = from, rest = v;
    while (rest >= 100) { t += 100; rest -= 100; out.push(t); }
    while (rest >= 10) { t += 10; rest -= 10; out.push(t); }
    if (rest >= 5) { t += 5; rest -= 5; out.push(t); }
    while (rest >= 1) { t += 1; rest -= 1; out.push(t); }
    return out;
  }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a round's state; the cloth (and each tray) is shuffled per showing; side 1 puts tray B on the left */
  function newState(fam, level, k, mode, rnd, side) {
    rnd = rnd || Math.random;
    var pool = rounds(fam, level), r = pool[k] || pool[0], coins = [], id = 0;
    mode = r.kind === 'compare' ? 'purse' : modeOf(mode);
    var add = function (v, at) { coins.push({ id: id++, v: v, home: at, at: at, pre: at === 'box' }); };
    if (r.kind === 'compare') { shuffle(r.a.slice(), rnd).forEach(function (v) { add(v, 'tray-a'); }); shuffle(r.b.slice(), rnd).forEach(function (v) { add(v, 'tray-b'); }); }
    else {
      if (r.kind === 'top') r.pre.forEach(function (v) { add(v, 'box'); });
      if (mode === 'endless') kinds(fam).forEach(function (v) { add(v, 'supply'); });
      else shuffle(r.purse.slice(), rnd).forEach(function (v) { add(v, 'cloth'); });
    }
    var st = { fam: fam, level: levelOf(level), mode: mode, k: r.k, round: r, coins: coins, nextId: id, box: [], said: [],
      counter: 0, misses: {}, missTotal: 0, stranded: 0, fewMiss: 0, sorted: false, side: side ? 1 : 0,
      pick: null, active: null, slips: {}, compareMiss: false, done: false };
    st.counter = inBox(st);
    return st;
  }
  function byId(st, id) { for (var i = 0; i < st.coins.length; i++) if (st.coins[i].id === id) return st.coins[i]; return null; }
  function where(st, at) { return st.coins.filter(function (c) { return c.at === at; }); }
  function inBox(st) { return sum(where(st, 'box').map(function (c) { return c.v; })); }
  function preTotal(st) { return st.round.kind === 'top' ? sum(st.round.pre) : 0; }
  /* the price the pin stands at: compare rounds have none (the counter goes up to its last digit) */
  function digits(st) { var p = st.round.price || 0; return p >= 100 ? 3 : 2; }
  function maxCounter(st) { return st.round.kind === 'compare' ? Math.pow(10, digits(st)) - 1 : st.round.price; }
  /* turn a wheel one step (place 0 ones, 1 tens, 2 hundreds); the ones carry like an odometer. Never below what the box holds, never past the pin */
  function roll(st, place, dir) {
    if (st.done) return 'no';
    var nv = st.counter + dir * Math.pow(10, place);
    if (nv > maxCounter(st)) return 'pin';
    if (nv < inBox(st)) return 'floor';
    st.counter = nv; return 'ok';
  }
  /* a coin the hand may drop: on the cloth, a supply pile, or (compare) the tray being counted — once a tray is picked */
  function droppable(st, c) {
    if (!c || st.done) return false;
    if (st.round.kind === 'compare') { if (!st.pick || st.slips.a != null && st.slips.b != null) return false; return (c.at === 'tray-a' || c.at === 'tray-b') && (!st.active || c.at === 'tray-' + st.active); }
    return c.at === 'cloth' || c.at === 'supply';
  }
  /* drop a coin into the slot: it is swallowed only if the counter already says box + coin */
  function drop(st, id) {
    var c = byId(st, id);
    if (!c || st.done) return { result: 'no' };
    if (st.round.kind === 'compare') {
      if (!st.pick) return { result: 'pickFirst' };
      if (st.active && c.at !== 'tray-' + st.active && (c.at === 'tray-a' || c.at === 'tray-b')) return { result: 'otherTray' };
    }
    if (!droppable(st, c)) return { result: 'no' };
    var has = inBox(st), want = has + c.v;
    if (want > maxCounter(st)) return { result: 'tooBig' };
    if (st.counter === has) return { result: 'idle' };
    if (st.counter !== want) {
      var said = st.counter;
      st.misses[id] = (st.misses[id] || 0) + 1; st.missTotal++;
      st.counter = has;
      return { result: 'spit', said: said, miss: st.misses[id] };
    }
    var inC = c;
    if (c.at === 'supply') { inC = { id: st.nextId++, v: c.v, home: 'supply-gone', at: 'box', pre: false }; st.coins.push(inC); }
    else { if (st.round.kind === 'compare' && !st.active) st.active = c.at.slice(5); inC.at = 'box'; }
    st.box.push(inC.id); st.said.push(st.counter);
    var out = { result: 'in', id: inC.id };
    if (st.round.kind === 'compare') {
      if (!where(st, 'tray-' + st.active).length) { out.slip = st.active; printSlip(st); }
      return out;
    }
    if (st.counter === st.round.price) {
      if (st.round.kind === 'fewest' && st.box.length > fewestNeed(st)) { st.fewMiss++; out.fewer = st.fewMiss; return out; }
      st.done = true; out.done = true; return out;
    }
    if (!canFinish(st)) { st.stranded++; out.stranded = st.stranded; }
    return out;
  }
  /* the tray is counted: the box prints its slip, and tips the counted coins out beside it */
  function printSlip(st) {
    var t = st.active; st.slips[t] = inBox(st);
    where(st, 'box').forEach(function (c) { c.at = 'slip-' + t; });
    st.box = []; st.said = []; st.active = null; st.counter = 0;
    if (st.slips.a != null && st.slips.b != null) {
      if (st.pick === answer(st.round)) st.done = true; else st.compareMiss = true;
    }
  }
  function fewestNeed(st) { return st.mode === 'endless' ? fewestUnlimited(st.round.price, st.fam) : fewestCount(st.round.price, st.round.purse); }
  /* the coins still free (cloth or supply) can make what is missing */
  function canFinish(st) {
    var gap = st.round.price - inBox(st);
    if (gap <= 0) return gap === 0;
    if (st.mode === 'endless') return canMake(gap, kinds(st.fam).reduce(function (a, v) { return a.concat(X(Math.floor(gap / v), v)); }, []));
    return canMake(gap, where(st, 'cloth').map(function (c) { return c.v; }));
  }
  /* the give-back lever: the LAST coin in comes back out (a slot box gives back what is on top); Pip's own coins stay */
  function giveBack(st) {
    if (st.done || !st.box.length) return null;
    var id = st.box.pop(), c = byId(st, id); st.said.pop();
    if (c.home === 'supply-gone') st.coins.splice(st.coins.indexOf(c), 1); else c.at = c.home;
    if (st.round.kind === 'compare' && !st.box.length) st.active = null;
    st.counter = inBox(st);
    return c;
  }
  /* the tip-out ring: every coin the child put in comes back; the counter rolls back to the start */
  function tipOut(st) {
    if (st.done) return 0;
    var n = 0; while (st.box.length) { giveBack(st); n++; }
    st.counter = inBox(st);
    return n;
  }
  /* the second stranding: tip out and lay the cloth biggest first */
  function sortCloth(st) {
    tipOut(st); st.sorted = true;
    var cl = where(st, 'cloth'), rest = st.coins.filter(function (c) { return c.at !== 'cloth'; });
    cl.sort(function (a, b) { return b.v - a.v; });
    st.coins = rest.concat(cl);
  }
  /* compare: pick the tray you think holds more (before the counting, or after the slips to put it right) */
  function pickTray(st, t) {
    if (st.done || st.round.kind !== 'compare' || (t !== 'a' && t !== 'b')) return false;
    if (st.slips.a != null && st.slips.b != null) { if (t !== answer(st.round)) { st.pick = t; return true; } st.pick = t; st.done = true; return true; }
    if (st.box.length) return false;
    st.pick = t; return true;
  }
  function answer(r) { return sum(r.a) > sum(r.b) ? 'a' : 'b'; }
  /* the coin that the fewest way uses and the box does not (fewest level, second time) */
  function fewestCoin(st) {
    var best = null;
    if (st.mode === 'endless') { var ks = kinds(st.fam), gap = st.round.price; ks.forEach(function (v) { if (!best && v <= gap && fewestUnlimited(gap - v, st.fam) + 1 === fewestUnlimited(gap, st.fam)) best = v; }); }
    else ways(st.round.price, st.round.purse).forEach(function (w) { if (!best && w.length === fewestNeed(st)) best = w; });
    if (!Array.isArray(best)) return best;
    var boxV = where(st, 'box').map(function (c) { return c.v; });
    for (var i = 0; i < best.length; i++) { var j = boxV.indexOf(best[i]); if (j < 0) return best[i]; boxV.splice(j, 1); }
    return best[0];
  }
  function passSize() { return 8; }
  /* an order-only reshuffle per pass, never the previous order; the two compare rounds never side by side */
  function plan(fam, level, rnd, prev) {
    var pool = rounds(fam, level), ks = pool.map(function (r) { return r.k; });
    var valid = function (c) { for (var i = 1; i < c.length; i++) if (pool[c[i]].kind === 'compare' && pool[c[i - 1]].kind === 'compare') return false; return !prev || prev.join() !== c.join(); };
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if (valid(c)) return c; }
    var base = prev || ks;
    for (var s = 1; s < base.length; s++) { var r = base.slice(s).concat(base.slice(0, s)); if (valid(r)) return r; }
    return base.slice().reverse();
  }
  var api = { LOCALES: LOCALES, FAMILY: FAMILY, LEVELS: LEVELS, MODES: MODES, COINS: COINS, TREATS: TREATS, famOf: famOf, locOf: locOf, levelOf: levelOf, modeOf: modeOf,
    coin: coin, kinds: kinds, rounds: rounds, ways: ways, canMake: canMake, fewestCount: fewestCount, fewestUnlimited: fewestUnlimited, steps: steps,
    newState: newState, byId: byId, where: where, inBox: inBox, preTotal: preTotal, digits: digits, maxCounter: maxCounter, roll: roll, droppable: droppable,
    drop: drop, giveBack: giveBack, tipOut: tipOut, sortCloth: sortCloth, pickTray: pickTray, answer: answer, canFinish: canFinish, fewestNeed: fewestNeed,
    fewestCoin: fewestCoin, sum: sum, desc: desc, passSize: passSize, plan: plan, shuffle: shuffle };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SayItSlotCore = api;
})(typeof window !== 'undefined' ? window : this);
