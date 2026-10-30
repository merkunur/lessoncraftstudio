/* =====================================================================
   worth-till-core.js — the model of ACTIVITY #164 of the one-by-one
   rebuild: "Pip's Market Stall — Counting Coins & Making Change"
   → THE WORTH TILL (2.MD.C.8). Pure, no DOM.
   Design: docs/activities-rebuild/designs/164-coin-stall.md
   ---------------------------------------------------------------------
   Pip's till has a cup for every coin's WORTH, and a cup only takes the
   coin it is named for — a coin dropped in the wrong cup bounces back. So
   a child cannot count, pay or give change without knowing what each coin
   is worth (in en the coins carry no numeral, like the real ones), and the
   money in the till is already lined up biggest-worth first for counting on.
   Values are whole minor units (cents / centavos) or, for MXN SEK DKK NOK,
   whole units — never decimals at this grade.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var FAMILY = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
  var LEVELS = ['1', '2', '3'];
  /* the real coins: diameter (mm), metal, reeded edge, centre hole — the cups are the family's coins, the extras only ever arrive as a payment */
  var C = function (v, d, metal, o) { o = o || {}; return { v: v, d: d, metal: metal, reeded: !!o.reeded, hole: !!o.hole, note: !!o.note }; };
  var EUR = [C(1, 16.25, 'copper'), C(2, 18.75, 'copper'), C(5, 21.25, 'copper'), C(10, 19.75, 'gold'), C(20, 22.25, 'gold'), C(50, 24.25, 'gold'), C(100, 23.25, 'bi-sg'), C(200, 25.75, 'bi-gs')];
  var MONEY = {
    USD: { cups: [1, 5, 10, 25], coins: [C(1, 19.05, 'copper'), C(5, 21.21, 'silver'), C(10, 17.91, 'silver', { reeded: true }), C(25, 24.26, 'silver', { reeded: true }), C(100, 0, 'green', { note: true })] },
    EURF: { cups: [1, 2, 5, 10, 20, 50], coins: EUR },
    EURR: { cups: [5, 10, 20, 50], coins: EUR },
    MXN: { cups: [1, 2, 5, 10], coins: [C(1, 21, 'bi-gs'), C(2, 23, 'bi-gs'), C(5, 25.5, 'bi-gs'), C(10, 28, 'bi-sg'), C(20, 0, 'blue', { note: true })] },
    BRL: { cups: [5, 10, 25, 50], coins: [C(5, 22, 'copper'), C(10, 20, 'gold'), C(25, 25, 'gold'), C(50, 23, 'silver'), C(100, 27, 'bi-sg')] },
    SEK: { cups: [1, 2, 5, 10], coins: [C(1, 19.5, 'silver'), C(2, 22.5, 'silver'), C(5, 23.75, 'gold'), C(10, 20.5, 'gold'), C(20, 0, 'purple', { note: true })] },
    DKK: { cups: [1, 2, 5, 10, 20], coins: [C(1, 20.25, 'silver', { hole: true }), C(2, 24.5, 'silver', { hole: true }), C(5, 28.5, 'silver', { hole: true }), C(10, 23.35, 'gold'), C(20, 27, 'gold')] },
    NOK: { cups: [1, 5, 10, 20], coins: [C(1, 21, 'silver', { hole: true }), C(5, 26, 'silver', { hole: true }), C(10, 24, 'gold'), C(20, 27.5, 'gold')] }
  };
  /* the rounds (design §6, every number re-measured by the gate; two fewest purses widened at build — EURF 35 and DKK 32 had ONE way to pay, so 'fewest' was no choice) — count: [coins]; pay kinds: price + purse; level 3: change / enough / purse */
  var X = function (n, v) { var a = []; for (var i = 0; i < n; i++) a.push(v); return a; };
  var cat = function () { return [].concat.apply([], arguments); };
  var COUNT = {
    USD: [X(4, 10), X(6, 5), cat(X(2, 25), X(3, 1)), cat(X(3, 10), X(4, 5)), cat([25], X(2, 10), X(3, 1)), [25, 10, 5, 1], cat(X(2, 25), [10], X(2, 5), X(2, 1)), cat(X(2, 10), X(3, 5), X(4, 1))],
    EURF: [X(4, 10), X(6, 5), cat(X(2, 20), X(3, 1)), cat(X(3, 10), X(4, 2)), cat([50], X(2, 10), X(3, 1)), [50, 20, 5, 2], [50, 20, 10, 5, 5, 2, 1], cat(X(2, 20), X(3, 5), X(4, 1))],
    EURR: [X(4, 10), X(6, 5), cat(X(2, 20), X(3, 5)), cat(X(3, 10), X(2, 20)), [50, 10, 10, 5], [50, 20, 10, 5], cat(X(2, 20), [10], X(3, 5)), cat([20], X(2, 10), X(4, 5))],
    MXN: [X(4, 2), X(6, 5), cat(X(2, 10), X(3, 1)), cat(X(3, 5), X(2, 2)), cat([10], X(2, 5), X(3, 2)), [10, 5, 2, 1], cat(X(2, 10), [5], X(2, 2), X(2, 1)), cat([10], X(3, 5), X(4, 1))],
    BRL: [X(4, 10), X(6, 5), cat(X(2, 25), X(3, 5)), cat(X(3, 10), X(2, 25)), [50, 10, 10, 5], [50, 25, 10, 5], cat(X(2, 25), X(2, 10), X(3, 5)), cat([25], X(2, 10), X(5, 5))],
    SEK: [X(4, 2), X(6, 5), cat(X(2, 10), X(3, 1)), cat(X(3, 5), X(2, 2)), cat([10], X(2, 5), X(2, 2)), [10, 5, 2, 1], cat(X(2, 10), [5], X(2, 2), X(2, 1)), cat([10], X(3, 5), X(4, 1))],
    DKK: [X(4, 2), X(6, 5), cat(X(2, 20), X(3, 1)), cat(X(3, 5), X(4, 2)), cat([20], X(2, 5), X(3, 1)), [20, 10, 5, 2], cat([20, 10], X(2, 5), X(2, 2), [1]), cat([10], X(3, 5), X(4, 1))],
    NOK: [X(4, 10), X(6, 5), cat(X(2, 20), X(3, 1)), cat(X(3, 10), X(4, 5)), cat([20], X(2, 5), X(3, 1)), [20, 10, 5, 1], cat([20, 10], X(2, 5), X(2, 1)), cat([10], X(3, 5), X(4, 1))]
  };
  var P = function (kind, price, purse, o) { o = o || {}; return { kind: kind, price: price, purse: purse, shown: o.shown || null, item: o.item || null }; };
  var MXSE2 = [P('exact', 13, [10, 1, 2, 5, 1, 2, 1, 5], { item: 'seashell' }), P('exact', 17, [10, 5, 2, 1, 5, 2, 10, 1], { item: 'starfish' }), P('exact', 24, [10, 10, 2, 2, 5, 1, 5, 1], { item: 'bucket' })];
  var PAY = {
    USD: [P('exact', 30, [25, 5, 10, 10, 1, 1, 5, 25], { item: 'seashell' }), P('exact', 41, [25, 10, 10, 5, 1, 25, 5, 1], { item: 'starfish' }), P('exact', 16, [10, 5, 1, 1, 10, 5, 25, 1], { item: 'bucket' }),
      P('fewest', 35, [25, 10, 10, 5, 1, 25, 5, 1], { item: 'kite' }), P('fewest', 30, [25, 5, 10, 10, 1, 25, 5, 1], { item: 'net' }),
      P('trade', 25, [10, 10, 5, 5, 1, 10, 5, 1]), P('trade', 10, [5, 5, 1, 1, 5, 1, 5, 1]), P('two', 30, [10, 10, 10, 25, 5, 5, 1, 1], { shown: [10, 10, 10] })],
    EURF: [P('exact', 30, [20, 5, 10, 10, 1, 1, 5, 20], { item: 'seashell' }), P('exact', 41, [20, 10, 10, 5, 1, 20, 5, 1], { item: 'starfish' }), P('exact', 16, [10, 5, 1, 1, 10, 5, 20, 1], { item: 'bucket' }),
      P('fewest', 35, [20, 10, 10, 5, 5, 20, 5, 1], { item: 'kite' }), P('fewest', 30, [20, 10, 10, 5, 1, 20, 5, 1], { item: 'net' }),
      P('trade', 50, [20, 20, 10, 5, 5, 20, 10, 5]), P('trade', 10, [5, 5, 2, 2, 5, 1, 5, 2]), P('two', 30, [10, 10, 10, 20, 5, 5, 2, 1], { shown: [10, 10, 10] })],
    EURR: [P('exact', 30, [20, 5, 10, 10, 5, 5, 50, 20], { item: 'seashell' }), P('exact', 45, [20, 10, 10, 5, 5, 20, 50, 5], { item: 'starfish' }), P('exact', 65, [50, 10, 5, 20, 10, 5, 20, 5], { item: 'bucket' }),
      P('fewest', 35, [20, 10, 10, 5, 5, 20, 50, 5], { item: 'kite' }), P('fewest', 70, [50, 20, 10, 10, 20, 5, 5, 50], { item: 'net' }),
      P('trade', 50, [20, 20, 10, 5, 5, 20, 10, 5]), P('trade', 20, [10, 5, 5, 10, 5, 5, 10, 5]), P('two', 40, [20, 20, 10, 10, 5, 5, 50, 10], { shown: [20, 20] })],
    MXN: MXSE2.concat([P('fewest', 15, [10, 5, 5, 2, 2, 1, 10, 1], { item: 'kite' }), P('fewest', 16, [10, 5, 5, 2, 1, 1, 10, 2], { item: 'net' }),
      P('trade', 10, [5, 2, 2, 1, 5, 1, 2, 1]), P('trade', 5, [2, 2, 1, 1, 2, 1, 1, 2]), P('two', 12, [10, 2, 5, 5, 1, 1, 2, 1], { shown: [10, 2] })]),
    BRL: [P('exact', 30, [25, 5, 10, 10, 5, 5, 50, 25], { item: 'seashell' }), P('exact', 60, [50, 10, 25, 25, 5, 10, 5, 50], { item: 'starfish' }), P('exact', 85, [50, 25, 10, 5, 25, 10, 5, 50], { item: 'bucket' }),
      P('fewest', 35, [25, 10, 10, 5, 5, 25, 50, 5], { item: 'kite' }), P('fewest', 75, [50, 25, 25, 10, 10, 5, 5, 50], { item: 'net' }),
      P('trade', 50, [25, 10, 10, 5, 25, 10, 5, 5]), P('trade', 25, [10, 10, 5, 5, 10, 5, 5, 10]), P('two', 50, [25, 25, 10, 10, 5, 5, 50, 10], { shown: [25, 25] })],
    SEK: MXSE2.concat([P('fewest', 15, [10, 5, 5, 2, 2, 1, 10, 1], { item: 'kite' }), P('fewest', 16, [10, 5, 5, 2, 1, 1, 10, 2], { item: 'net' }),
      P('trade', 10, [5, 2, 2, 1, 5, 1, 2, 1]), P('trade', 5, [2, 2, 1, 1, 2, 1, 1, 2]), P('two', 12, [10, 2, 5, 5, 1, 1, 2, 1], { shown: [10, 2] })]),
    DKK: MXSE2.concat([P('fewest', 25, [20, 5, 5, 10, 10, 2, 1, 20], { item: 'kite' }), P('fewest', 32, [20, 10, 10, 5, 5, 2, 2, 1], { item: 'net' }),
      P('trade', 20, [10, 5, 5, 2, 2, 1, 10, 5]), P('trade', 10, [5, 2, 2, 1, 5, 1, 2, 1]), P('two', 30, [20, 10, 5, 5, 10, 2, 1, 20], { shown: [20, 10] })]),
    NOK: [P('exact', 16, [10, 5, 1, 1, 5, 1, 10, 20], { item: 'seashell' }), P('exact', 27, [20, 5, 1, 1, 10, 5, 1, 20], { item: 'starfish' }), P('exact', 35, [20, 10, 5, 5, 10, 1, 20, 1], { item: 'bucket' }),
      P('fewest', 25, [20, 5, 5, 10, 10, 1, 1, 20], { item: 'kite' }), P('fewest', 31, [20, 10, 10, 5, 1, 1, 5, 20], { item: 'net' }),
      P('trade', 20, [10, 5, 5, 1, 1, 10, 5, 1]), P('trade', 10, [5, 5, 1, 1, 1, 1, 1, 5]), P('two', 30, [20, 10, 5, 5, 10, 1, 1, 20], { shown: [20, 10] })]
  };
  var CH = function (price, paid, payWith, item) { return { kind: 'change', price: price, paid: paid, payWith: payWith, item: item }; };
  var EN = function (price, purse, item) { return { kind: 'enough', price: price, purse: purse, item: item }; };
  var PU = function (a, b) { return { kind: 'purse', a: a, b: b }; };
  var EN4 = function (p, items) { return p.map(function (x, i) { return EN(x[0], x[1], ['sunglasses', 'hat', 'spade', 'kite'][i]); }); };
  var MXSE3 = function (note) {
    return [CH(7, 10, [10], 'hat'), CH(12, 20, [note ? 20 : 20], 'sunglasses')].concat(EN4([[15, [10, 5]], [18, [10, 5, 2]], [25, [10, 10, 5, 2]], [30, [10, 10, 5, 2, 2]]]))
      .concat([PU(cat(X(6, 1), X(3, 2)), [10, 5]), PU([5, 5, 2], [10])]);
  };
  var THREE = {
    USD: [CH(70, 100, [100], 'hat'), CH(30, 50, [25, 25], 'sunglasses')].concat(EN4([[35, [25, 10]], [40, [25, 10, 1, 1, 1]], [50, [25, 25, 10]], [60, [25, 10, 10, 10, 1, 1, 1]]]))
      .concat([PU(cat(X(8, 1), X(2, 5)), [10, 10]), PU([10, 10, 10], [25])]),
    EURF: [CH(70, 100, [100], 'hat'), CH(30, 50, [50], 'sunglasses')].concat(EN4([[35, [20, 10]], [40, [20, 20]], [50, [50, 2, 1]], [60, [50, 5, 2, 1]]]))
      .concat([PU(cat(X(8, 1), X(2, 5)), [10, 10]), PU([10, 10, 10, 5], [20, 10])]),
    EURR: [CH(70, 100, [100], 'hat'), CH(35, 50, [50], 'sunglasses')].concat(EN4([[35, [20, 10]], [40, [20, 20]], [50, [50, 10]], [60, [50, 5]]]))
      .concat([PU(X(6, 5), [20, 20]), PU([10, 10, 10, 10], [20, 10])]),
    MXN: MXSE3(true),
    BRL: [CH(70, 100, [100], 'hat'), CH(25, 50, [50], 'sunglasses')].concat(EN4([[35, [25, 5]], [40, [25, 10, 5]], [50, [50, 10, 5]], [75, [50, 10, 10]]]))
      .concat([PU(X(7, 5), [25, 25]), PU([25, 25, 10], [50])]),
    SEK: MXSE3(true),
    DKK: [CH(7, 10, [10], 'hat'), CH(13, 20, [20], 'sunglasses')].concat(EN4([[15, [10, 5]], [23, [20, 2]], [25, [20, 5, 2]], [40, [20, 10, 5, 2, 2]]]))
      .concat([PU(cat(X(6, 1), X(3, 2)), [20]), PU([5, 5, 5, 2], [10, 5])]),
    NOK: [CH(7, 10, [10], 'hat'), CH(12, 20, [20], 'sunglasses')].concat(EN4([[15, [10, 5]], [18, [10, 5, 1, 1]], [25, [20, 5, 1, 1]], [30, [20, 5, 1, 1, 1]]]))
      .concat([PU(cat(X(9, 1), X(2, 5)), [20]), PU([5, 5, 5, 1], [10, 5])])
  };
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function desc(a) { return a.slice().sort(function (x, y) { return y - x; }); }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function famOf(l) { return FAMILY[locOf(l)]; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : '1'; }
  function coin(fam, v) { var cs = MONEY[fam].coins; for (var i = 0; i < cs.length; i++) if (cs[i].v === v) return cs[i]; return null; }
  /* the cups, worth descending (the till lays the money out biggest-first, left to right) */
  function cups(fam) { return desc(MONEY[fam].cups); }
  function rounds(fam, level) {
    level = levelOf(level);
    if (level === '1') return COUNT[fam].map(function (cs, i) { return { k: i, level: level, kind: 'count', coins: cs, total: sum(cs) }; });
    var src = level === '2' ? PAY[fam] : THREE[fam];
    return src.map(function (r, i) { var o = { k: i, level: level }; for (var p in r) o[p] = r[p]; return o; });
  }
  /* the fewest coins from a purse that make an amount (exhaustive over sub-multisets; the purse is small) */
  function fewest(target, purse) {
    var best = null, n = purse.length;
    for (var mask = 1; mask < (1 << n); mask++) {
      var s = 0, pick = []; for (var i = 0; i < n; i++) if (mask & (1 << i)) { s += purse[i]; pick.push(purse[i]); }
      if (s === target && (!best || pick.length < best.length)) best = pick;
    }
    return best ? desc(best) : null;
  }
  function newState(fam, level, k, side) {
    var pool = rounds(fam, level), r = pool[k] || pool[0], coins = [], id = 0;
    var add = function (v, at) { coins.push({ id: id++, v: v, home: at, at: at }); };
    if (r.kind === 'count') r.coins.forEach(function (v) { add(v, 'counter'); });
    else if (r.kind === 'change') MONEY[fam].cups.forEach(function (v) { for (var i = 0; i < 3; i++) add(v, 'till'); });
    else if (r.kind === 'enough') r.purse.forEach(function (v) { add(v, 'purse'); });
    else if (r.kind !== 'purse') r.purse.forEach(function (v) { add(v, 'purse'); });
    /* which purse sits on the left is drawn per showing (side: 0 → A left) */
    return { fam: fam, level: levelOf(level), k: r.k, round: r, coins: coins, seq: [], dial: { t: 0, o: 0 }, choice: null, side: side ? 1 : 0,
      bounces: {}, moved: false, misses: 0, help: false, verdict: null, done: false };
  }
  function byId(st, id) { for (var i = 0; i < st.coins.length; i++) if (st.coins[i].id === id) return st.coins[i]; return null; }
  function lidded(st, v) { return st.round.kind === 'trade' && st.round.price === v; }
  function changed(st) { st.moved = true; st.verdict = null; }
  /* drop a loose coin into a cup: the cup takes only its own worth — anything else bounces back */
  function drop(st, id, cupV) {
    if (st.done) return { result: 'no' };
    var c = byId(st, id); if (!c || c.at === 'till' || c.at === 'tray' || MONEY[st.fam].cups.indexOf(cupV) < 0) return { result: 'no' };
    if (st.round.kind === 'change' || st.round.kind === 'purse') return { result: 'no' };
    if (lidded(st, cupV)) return { result: 'lid' };
    if (c.v !== cupV) { st.bounces[id] = (st.bounces[id] || 0) + 1; return { result: 'bounce', ghost: st.bounces[id] >= 2 }; }
    c.at = 'till'; st.seq.push(id); changed(st); return { result: 'in' };
  }
  /* tap a cup: its top coin comes out — back home, or (change rounds) onto the customer's tray */
  function takeTop(st, cupV) {
    if (st.done) return null;
    var top = null;
    for (var i = st.seq.length - 1; i >= 0; i--) { var c = byId(st, st.seq[i]); if (c.v === cupV && c.at === 'till') { top = c; break; } }
    if (st.round.kind === 'change') {
      if (!top) for (var j = st.coins.length - 1; j >= 0; j--) if (st.coins[j].v === cupV && st.coins[j].at === 'till') { top = st.coins[j]; break; }
      if (!top) return null;
      top.at = 'tray'; st.seq.push(top.id); changed(st); return top;
    }
    if (!top) return null;
    top.at = top.home; st.seq.splice(st.seq.indexOf(top.id), 1); changed(st); return top;
  }
  function trayBack(st, id) { var c = byId(st, id); if (st.done || !c || c.at !== 'tray') return false; c.at = 'till'; st.seq.splice(st.seq.indexOf(id), 1); changed(st); return true; }
  function spin(st, wheel, d) { if (st.done) return false; var w = st.dial[wheel] + d; st.dial[wheel] = (w + 10) % 10; changed(st); return true; }
  function choose(st, c) { if (st.done || st.choice === c) return false; st.choice = c; changed(st); return true; }
  function at(st, where) { return st.coins.filter(function (c) { return c.at === where; }).map(function (c) { return c.v; }); }
  function paid(st) { return at(st, 'till').length && st.round.kind !== 'change' ? at(st, 'till') : []; }
  function dialValue(st) { return st.dial.t * 10 + st.dial.o; }
  function sameMultiset(a, b) { return desc(a).join() === desc(b).join(); }
  /* the right answer of an enough / purse round */
  function answer(r) {
    if (r.kind === 'enough') return sum(r.purse) >= r.price ? 'yes' : 'no';
    if (r.kind === 'purse') return sum(r.a) > sum(r.b) ? 'a' : 'b';
    return null;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, k = r.kind;
    if (k === 'count' && at(st, 'counter').length) return { result: 'note', key: 'hintSortFirst' };
    if (k === 'count' && dialValue(st) === 0) return { result: 'note', key: 'hintDial' };
    if ((k === 'exact' || k === 'fewest' || k === 'trade' || k === 'two') && !paid(st).length) return { result: 'note', key: 'hintPayFirst' };
    if (k === 'change' && !at(st, 'tray').length) return { result: 'note', key: 'hintTrayFirst' };
    if ((k === 'enough' || k === 'purse') && !st.choice) return { result: 'note', key: k === 'purse' ? 'hintPurseFirst' : 'hintChoose' };
    /* Check again with nothing changed: a reminder, never a second miss */
    if (st.verdict) return { result: 'note', key: 'hintAgain' };
    var why = null;
    if (k === 'count') { if (dialValue(st) !== r.total) why = 'count'; }
    else if (k === 'change') { var t = sum(at(st, 'tray')), want = r.paid - r.price; if (t > want) why = 'over'; else if (t < want) why = 'under'; }
    else if (k === 'enough' || k === 'purse') { var side = st.choice; if (k === 'purse') side = st.choice === 'left' ? (st.side ? 'b' : 'a') : (st.side ? 'a' : 'b'); if (side !== answer(r)) why = k; }
    else {
      var p = paid(st), s = sum(p);
      if (s > r.price) why = 'over'; else if (s < r.price) why = 'under';
      else if (k === 'fewest' && p.length > fewest(r.price, r.purse).length) why = 'fewer';
      else if (k === 'two' && sameMultiset(p, r.shown)) why = 'same';
    }
    if (!why) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { why: why };
    return { result: 'miss', why: why };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    var k = st.round.kind, w = v.why, h = st.help;
    if (w === 'count') return h ? 'helpCount' : 'hintCount';
    if (w === 'enough') return h ? 'helpEnough' : 'hintEnough';
    if (w === 'purse') return h ? 'helpPurse' : 'hintPurse';
    if (w === 'fewer') return 'hintFewer';
    if (w === 'same') return 'hintSame';
    if (k === 'change') return h ? 'helpChange' : 'hintChangeMiss';
    if (h) return k === 'trade' ? 'helpTrade' : 'helpPay';
    if (k === 'trade') return 'hintTrade';
    return w === 'over' ? 'hintOver' : 'hintUnder';
  }
  function okKey(st) {
    var r = st.round, k = r.kind;
    if (k === 'count') return 'okCount';
    if (k === 'change') return 'okChange';
    if (k === 'enough') return answer(r) === 'yes' ? 'okYes' : 'okNo';
    if (k === 'purse') { var win = answer(r) === 'a' ? r.a : r.b, lose = answer(r) === 'a' ? r.b : r.a; return win.length < lose.length ? 'okPurseFew' : 'okPurse'; }
    return { exact: 'okExact', fewest: 'okFewest', trade: 'okTrade', two: 'okTwo' }[k];
  }
  /* the parade: coins worth-first with their running totals (from a start, for the change count-up) */
  function parade(vals, start) { var t = start || 0; return desc(vals).map(function (v) { t += v; return { v: v, run: t }; }); }
  function rail(st) {
    var r = st.round, k = r.kind;
    if (k === 'count') return { rows: [parade(at(st, 'till'))], hideLast: true };
    if (k === 'change') return { rows: [parade(at(st, 'tray'), r.price)], start: r.price, target: r.paid };
    if (k === 'enough') return { rows: [parade(r.purse)], target: r.price };
    if (k === 'purse') return { rows: st.side ? [parade(r.b), parade(r.a)] : [parade(r.a), parade(r.b)] };
    return { rows: [parade(paid(st))], target: r.price };
  }
  function passSize() { return 8; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order; in level 3 the two purse rounds never sit side by side */
  function plan(fam, level, rnd, prev) {
    var pool = rounds(fam, level), ks = pool.map(function (r) { return r.k; });
    var valid = function (c) { for (var i = 1; i < c.length; i++) if (pool[c[i]].kind === 'purse' && pool[c[i - 1]].kind === 'purse') return false; return !prev || prev.join() !== c.join(); };
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if (valid(c)) return c; }
    /* a stuck random source: rotate the last order until it is valid and new */
    var base = prev || ks;
    for (var s = 1; s < base.length; s++) { var r = base.slice(s).concat(base.slice(0, s)); if (valid(r)) return r; }
    return base.slice().reverse();
  }
  var api = { LOCALES: LOCALES, FAMILY: FAMILY, LEVELS: LEVELS, MONEY: MONEY, famOf: famOf, locOf: locOf, levelOf: levelOf, coin: coin, cups: cups, rounds: rounds,
    fewest: fewest, newState: newState, byId: byId, lidded: lidded, drop: drop, takeTop: takeTop, trayBack: trayBack, spin: spin, choose: choose, at: at, paid: paid,
    dialValue: dialValue, sum: sum, desc: desc, answer: answer, check: check, hint: hint, okKey: okKey, parade: parade, rail: rail, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.WorthTillCore = api;
})(typeof window !== 'undefined' ? window : this);
