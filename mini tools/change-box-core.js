/* =====================================================================
   change-box-core.js — the model of ACTIVITY #166 of the one-by-one
   rebuild: "Make Change with Coins — Money Word Problems"
   → THE CHANGE BOX (2.MD.C.8). Pure, no DOM.
   Design: docs/activities-rebuild/designs/166-money.md
   ---------------------------------------------------------------------
   The customer's payment goes into Pip's change box and comes out as the
   same money in small coins. The child gives the change out of that pile
   into the customer's tray; whatever is left is Pip's, and Pip must count
   exactly to the price. Give too much and Pip is short, too little and
   Pip is over: change is checked by conservation, never by a running
   total. Level 2: is the purse enough / how much more; level 3: a basket
   of two or three toys, then change.
   Values are whole minor units (cents / centavos) or, for MXN SEK DKK
   NOK, whole units — never decimals at this grade.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var FAMILY = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
  var SHOPS = ['change', 'more', 'basket', 'mixed'];
  var COUNTS = ['check', 'live'];
  /* the real coins (diameter mm, metal, reeded, hole) and the notes a customer pays with */
  var C = function (v, d, metal, o) { o = o || {}; return { v: v, d: d, metal: metal, reeded: !!o.reeded, hole: !!o.hole }; };
  var EUR = [C(1, 16.25, 'copper'), C(2, 18.75, 'copper'), C(5, 21.25, 'copper'), C(10, 19.75, 'gold'), C(20, 22.25, 'gold'), C(50, 24.25, 'gold'), C(100, 23.25, 'bi-sg'), C(200, 25.75, 'bi-gs')];
  var COINS = {
    USD: [C(1, 19.05, 'copper'), C(5, 21.21, 'silver'), C(10, 17.91, 'silver', { reeded: true }), C(25, 24.26, 'silver', { reeded: true })],
    EURF: EUR,
    EURR: EUR.filter(function (c) { return c.v >= 5; }),
    MXN: [C(1, 21, 'bi-gs'), C(2, 23, 'bi-gs'), C(5, 25.5, 'bi-gs'), C(10, 28, 'bi-sg'), C(20, 32, 'bi-sg')],
    BRL: [C(5, 22, 'copper'), C(10, 20, 'gold'), C(25, 25, 'gold'), C(50, 23, 'silver'), C(100, 27, 'bi-sg')],
    SEK: [C(1, 19.5, 'silver'), C(2, 22.5, 'silver'), C(5, 23.75, 'gold'), C(10, 20.5, 'gold')],
    DKK: [C(1, 20.25, 'silver', { hole: true }), C(2, 24.5, 'silver', { hole: true }), C(5, 28.5, 'silver', { hole: true }), C(10, 23.35, 'gold'), C(20, 27, 'gold')],
    NOK: [C(1, 21, 'silver', { hole: true }), C(5, 26, 'silver', { hole: true }), C(10, 24, 'gold'), C(20, 27.5, 'gold')]
  };
  var NOTES = { USD: { 100: 'green' }, MXN: { 20: 'blue', 50: 'pink' }, BRL: { 200: 'bluegrey' }, SEK: { 20: 'purple', 50: 'orange' }, DKK: { 50: 'purple' }, NOK: { 50: 'green' }, EURF: {}, EURR: {} };
  var X = function (n, v) { var a = []; for (var i = 0; i < n; i++) a.push(v); return a; };
  var cat = function () { return [].concat.apply([], arguments); };
  /* a payment item: a coin, or a note ('n' + value) */
  var N = function (v) { return { v: v, note: true }; }, K = function (v) { return { v: v, note: false }; };
  var CH = function (price, pay, pile) { return { kind: 'change', price: price, pay: pay, pile: pile }; };
  /* ---- level 1: change (design §6, the old eight problems kept) ---- */
  var D1 = {
    USD: [CH(70, [N(100)], [25, 25, 25, 10, 10, 5]), CH(85, [N(100)], [25, 25, 25, 10, 5, 5, 5]), CH(60, [N(100)], [25, 25, 10, 10, 10, 10, 5, 5]), CH(75, [N(100)], [25, 25, 25, 10, 10, 5]),
      CH(90, [N(100)], cat([25, 25, 25, 10, 5, 5], X(5, 1))), CH(55, [N(100)], [25, 25, 10, 10, 10, 10, 5, 5]), CH(65, [N(100)], [25, 25, 25, 10, 5, 5, 5]), CH(80, [N(100)], cat([25, 25, 10, 10, 10, 10, 5], X(5, 1)))],
    EURF: [CH(80, [K(100)], [50, 20, 10, 10, 5, 5]), CH(70, [K(100)], [50, 20, 10, 10, 5, 2, 2, 1]), CH(60, [K(100)], [50, 20, 20, 5, 2, 2, 1]), CH(175, [K(200)], [100, 50, 20, 20, 5, 2, 2, 1]),
      CH(90, [K(100), K(50)], [50, 50, 20, 10, 10, 5, 5]), CH(65, [K(100)], [50, 20, 10, 10, 5, 2, 2, 1]), CH(350, [K(200), K(200)], [200, 100, 50, 20, 20, 10]), CH(130, [K(200)], [100, 50, 20, 20, 5, 2, 2, 1])],
    EURR: [CH(35, [K(50)], [20, 10, 10, 5, 5]), CH(80, [K(100)], [50, 20, 10, 10, 5, 5]), CH(75, [K(100)], [50, 20, 10, 10, 5, 5]), CH(140, [K(200)], [100, 50, 20, 10, 10, 5, 5]),
      CH(40, [K(50)], [20, 10, 10, 5, 5]), CH(130, [K(200)], [100, 50, 20, 10, 10, 5, 5]), CH(85, [K(100)], [50, 20, 10, 5, 5, 5, 5]), CH(175, [K(200)], [100, 50, 20, 10, 10, 5, 5])],
    MXN: [CH(7, [K(10)], [5, 2, 2, 1]), CH(12, [N(20)], [10, 5, 2, 2, 1]), CH(16, [N(20)], [10, 5, 2, 2, 1]), CH(3, [K(10)], [5, 2, 2, 1]),
      CH(14, [N(20)], [10, 5, 2, 2, 1]), CH(25, [N(50)], [20, 10, 10, 5, 2, 2, 1]), CH(35, [N(50)], [20, 10, 10, 5, 2, 2, 1]), CH(18, [N(20)], [10, 5, 2, 2, 1])],
    BRL: [CH(75, [K(100)], [50, 25, 10, 10, 5]), CH(80, [K(100)], [50, 10, 10, 10, 10, 5, 5]), CH(70, [K(100)], [50, 25, 10, 10, 5]), CH(40, [K(100)], [25, 25, 25, 10, 10, 5]),
      CH(55, [K(100)], [50, 25, 10, 10, 5]), CH(150, [N(200)], [100, 50, 25, 10, 10, 5]), CH(135, [N(200)], [100, 50, 25, 10, 10, 5]), CH(85, [K(100)], [50, 25, 10, 5, 5, 5])],
    SEK: [CH(7, [K(10)], [5, 2, 2, 1]), CH(6, [K(10)], [5, 2, 2, 1]), CH(15, [N(20)], [10, 5, 2, 2, 1]), CH(12, [N(20)], [10, 5, 2, 2, 1]),
      CH(14, [N(20)], [10, 5, 2, 2, 1]), CH(3, [K(10)], [5, 2, 2, 1]), CH(8, [N(20)], [10, 5, 2, 2, 1]), CH(11, [N(20)], [10, 5, 2, 2, 1])],
    DKK: [CH(7, [K(10)], [5, 2, 2, 1]), CH(16, [K(20)], [10, 5, 2, 2, 1]), CH(14, [K(20)], [10, 5, 2, 2, 1]), CH(12, [K(20)], [10, 5, 2, 2, 1]),
      CH(13, [K(20)], [10, 5, 2, 2, 1]), CH(8, [K(10)], [5, 2, 2, 1]), CH(35, [N(50)], [20, 10, 10, 5, 2, 2, 1]), CH(9, [K(20)], [10, 5, 2, 2, 1])],
    NOK: [CH(7, [K(10)], cat([5], X(5, 1))), CH(16, [K(20)], cat([10, 5], X(5, 1))), CH(12, [K(20)], cat([10, 5], X(5, 1))), CH(13, [K(20)], cat([10, 5], X(5, 1))),
      CH(42, [N(50)], cat([20, 10, 10, 5], X(5, 1))), CH(36, [N(50)], cat([20, 10, 10, 5], X(5, 1))), CH(34, [N(50)], cat([20, 10, 10, 5], X(5, 1))), CH(38, [N(50)], cat([20, 10, 10, 5], X(5, 1)))]
  };
  /* ---- level 2: enough? (R1–R4) and how much more? (R5–R8) ---- */
  var EN = function (price, purse) { return { kind: 'enough', price: price, purse: purse }; };
  var MO = function (price, purse) { return { kind: 'more', price: price, purse: purse }; };
  var MXSE2 = [EN(15, [10, 5]), EN(20, [10, 5, 2, 1]), EN(18, [10, 5, 2, 2]), EN(30, [10, 10, 5, 2, 2]), MO(20, [10, 5]), MO(25, [10, 10, 1]), MO(35, [10, 10, 5, 2]), MO(16, [10, 2])];
  var D2 = {
    USD: [EN(45, [25, 10, 10]), EN(60, [25, 25, 5, 1, 1, 1, 1]), EN(35, [10, 10, 10, 5, 1]), EN(80, [25, 25, 10, 10, 5]), MO(50, [25, 10]), MO(75, [25, 10, 10, 10]), MO(90, [25, 25, 10, 5, 1]), MO(40, [10, 5, 5, 1, 1])],
    EURF: [EN(45, [20, 20, 5]), EN(60, [50, 5, 2, 2]), EN(35, [20, 10, 5, 2]), EN(80, [50, 20, 5, 2]), MO(50, [20, 10]), MO(75, [50, 10, 5]), MO(90, [50, 20, 5, 2]), MO(40, [20, 5, 2, 1])],
    EURR: [EN(45, [20, 20, 5]), EN(60, [50, 5]), EN(35, [20, 10, 10]), EN(80, [50, 20, 5]), MO(50, [20, 10]), MO(75, [50, 5]), MO(90, [50, 20, 5]), MO(40, [20, 5])],
    MXN: MXSE2,
    BRL: [EN(45, [25, 10, 10]), EN(60, [50, 5]), EN(35, [25, 10, 5]), EN(80, [50, 25]), MO(50, [25, 10]), MO(75, [50, 10]), MO(90, [50, 25, 5]), MO(40, [10, 10, 5])],
    SEK: MXSE2,
    DKK: [EN(15, [10, 5]), EN(30, [20, 5, 2, 1]), EN(18, [10, 5, 2, 2]), EN(40, [20, 10, 5, 2, 2]), MO(20, [10, 5]), MO(25, [20, 1]), MO(35, [20, 10, 2]), MO(16, [10, 2])],
    NOK: [EN(15, [10, 5]), EN(20, [10, 5, 1, 1, 1]), EN(18, [10, 5, 1, 1, 1, 1]), EN(30, [20, 5, 1, 1, 1]), MO(20, [10, 5]), MO(25, [20, 1]), MO(35, [20, 10, 1]), MO(16, [10, 1])]
  };
  /* ---- level 3: a basket of two or three toys, then change ---- */
  var BA = function (tags, pay, pile) { return { kind: 'basket', tags: tags, price: tags.reduce(function (a, b) { return a + b; }, 0), pay: pay, pile: pile }; };
  var UP = [25, 25, 25, 10, 10, 5];
  var EF = [50, 20, 10, 10, 5, 5], EF2 = [50, 20, 10, 10, 5, 2, 2, 1];
  var SMALL = function (fam) { return fam === 'NOK' ? cat([10, 5], X(5, 1)) : [10, 5, 2, 2, 1]; };
  var BIG = function (fam) { return fam === 'NOK' ? cat([20, 10, 10, 5], X(5, 1)) : fam === 'SEK' ? [10, 10, 10, 10, 5, 2, 2, 1] : [20, 10, 10, 5, 2, 2, 1]; };
  var NORD3 = function (fam) {
    var n20 = fam === 'MXN' || fam === 'SEK' ? N(20) : K(20), n50 = N(50), s = SMALL(fam), b = BIG(fam);
    return [BA([7, 5], [n20], s), BA([9, 8], [n20], s), BA([12, 6], [n20], s), BA([15, 13], [n50], b), BA([4, 5, 6], [n20], s), BA([3, 7, 9], [n20], s), BA([10, 8, 5], [n50], b), BA([12, 9, 14], [n50], b)];
  };
  var D3 = {
    USD: [BA([25, 15], [N(100)], UP), BA([30, 45], [N(100)], UP), BA([12, 20], [N(100)], cat([25, 25, 25, 10, 5, 5], X(5, 1))), BA([35, 50], [N(100)], UP),
      BA([10, 15, 20], [N(100)], UP), BA([25, 25, 30], [N(100)], UP), BA([5, 12, 30], [N(100)], cat([25, 25, 25, 10, 10], X(5, 1))), BA([20, 35, 40], [N(100)], [25, 25, 25, 10, 5, 5, 5])],
    EURF: [BA([25, 15], [K(100)], EF), BA([30, 45], [K(100)], EF), BA([12, 20], [K(100)], EF2), BA([35, 50], [K(100)], EF), BA([10, 15, 20], [K(100)], EF), BA([25, 25, 30], [K(100)], EF), BA([5, 12, 30], [K(100)], EF2), BA([20, 35, 40], [K(100)], EF)],
    EURR: [BA([25, 15], [K(50)], [20, 10, 10, 5, 5]), BA([30, 45], [K(100)], EF), BA([15, 20], [K(50)], [20, 10, 10, 5, 5]), BA([35, 50], [K(100)], EF), BA([10, 15, 20], [K(50)], [20, 10, 10, 5, 5]), BA([25, 25, 30], [K(100)], EF), BA([5, 15, 30], [K(100)], EF), BA([20, 35, 40], [K(100)], EF)],
    BRL: [BA([25, 15], [K(50)], [25, 10, 10, 5]), BA([30, 45], [K(100)], [50, 25, 10, 10, 5]), BA([15, 20], [K(50)], [25, 10, 10, 5]), BA([35, 50], [K(100)], [50, 25, 10, 10, 5]), BA([10, 15, 20], [K(50)], [25, 10, 10, 5]), BA([25, 25, 30], [K(100)], [50, 25, 10, 10, 5]), BA([5, 15, 30], [K(100)], [50, 25, 10, 10, 5]), BA([20, 35, 40], [K(100)], [50, 25, 10, 10, 5])],
    MXN: NORD3('MXN'), SEK: NORD3('SEK'), DKK: NORD3('DKK'), NOK: NORD3('NOK')
  };
  var TOYS = ['airplane', 'ball', 'boat', 'car', 'dinosaur', 'helicopter', 'kite', 'robot', 'rocket', 'train', 'truck'];

  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function desc(a) { return a.slice().sort(function (x, y) { return y - x; }); }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function famOf(l) { return FAMILY[locOf(l)]; }
  function shopOf(v) { return SHOPS.indexOf(String(v)) >= 0 ? String(v) : 'change'; }
  function countOf(v) { return COUNTS.indexOf(String(v)) >= 0 ? String(v) : 'check'; }
  function coin(fam, v) { var cs = COINS[fam]; for (var i = 0; i < cs.length; i++) if (cs[i].v === v) return cs[i]; return null; }
  function noteColour(fam, v) { return NOTES[fam][v] || null; }
  function kinds(fam) { return desc(COINS[fam].map(function (c) { return c.v; })); }
  /* the round pool of a shop: the mixed shop runs all three levels' rounds in one pass */
  function rounds(fam, shop) {
    shop = shopOf(shop);
    var src = shop === 'change' ? D1[fam] : shop === 'more' ? D2[fam] : shop === 'basket' ? D3[fam] : D1[fam].concat(D2[fam], D3[fam]);
    return src.map(function (r, i) { var o = { k: i }; for (var p in r) o[p] = r[p]; return o; });
  }
  function paid(r) { return r.pay ? sum(r.pay.map(function (x) { return x.v; })) : 0; }
  function change(r) { return paid(r) - r.price; }
  /* the fewest coins among `coins` that make `target` (exhaustive; ≤ 12 coins) — or null */
  function fewestFrom(target, coins) {
    var best = null, n = coins.length;
    for (var m = 1; m < (1 << n); m++) { var s = 0, c = 0; for (var i = 0; i < n; i++) if (m & (1 << i)) { s += coins[i]; c++; } if (s === target && (!best || c < best.c)) best = { m: m, c: c }; }
    if (!best) return null;
    var out = []; for (var j = 0; j < n; j++) if (best.m & (1 << j)) out.push(j);
    return out;
  }
  /* the fewest coins of the family (unlimited) that make an amount, biggest first */
  function fewestUnlimited(target, fam) { var ks = kinds(fam).filter(function (v) { return v < 100; }), d = [[]]; for (var t = 1; t <= target; t++) { d[t] = null; ks.forEach(function (v) { if (v <= t && d[t - v] && (!d[t] || d[t - v].length + 1 < d[t].length)) d[t] = d[t - v].concat([v]); }); } return d[target] ? desc(d[target]) : null; }
  /* running amounts of a set of coins, biggest first, from a start */
  function count(vals, start) { var t = start || 0; return desc(vals).map(function (v) { t += v; return { v: v, run: t }; }); }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a round's state; the toys are drawn without repeats inside the pass by the caller (toyStart) */
  function newState(fam, shop, k, toyStart) {
    var pool = rounds(fam, shop), r = pool[k] || pool[0], coins = [], id = 0;
    var add = function (v, at) { coins.push({ id: id++, v: v, at: at }); };
    if (r.kind === 'change' || r.kind === 'basket') r.pile.forEach(function (v) { add(v, 'pile'); });
    else r.purse.forEach(function (v) { add(v, 'purse'); });
    var n = r.kind === 'basket' ? r.tags.length : 1, toys = [];
    for (var i = 0; i < n; i++) toys.push(TOYS[((toyStart || 0) + i) % TOYS.length]);
    return { fam: fam, shop: shopOf(shop), k: r.k, round: r, coins: coins, nextId: id, toys: toys, choice: null,
      misses: 0, help: false, verdict: null, checked: false, done: false };
  }
  function byId(st, id) { for (var i = 0; i < st.coins.length; i++) if (st.coins[i].id === id) return st.coins[i]; return null; }
  function where(st, at) { return st.coins.filter(function (c) { return c.at === at; }); }
  function vals(st, at) { return where(st, at).map(function (c) { return c.v; }); }
  function changed(st) { st.verdict = null; st.checked = false; }
  /* a tap on a coin: pile ↔ tray (change, basket); an added coin back out of Pip's dish (more) */
  function move(st, id) {
    if (st.done) return null;
    var c = byId(st, id); if (!c) return null;
    if (c.at === 'pile') c.at = 'tray'; else if (c.at === 'tray') c.at = 'pile';
    else if (c.at === 'added') st.coins.splice(st.coins.indexOf(c), 1);
    else return null;
    changed(st); return c;
  }
  /* how much more: a coin from the side tray (unlimited) into Pip's dish */
  function add(st, v) {
    if (st.done || st.round.kind !== 'more' || kinds(st.fam).indexOf(v) < 0) return null;
    var c = { id: st.nextId++, v: v, at: 'added' }; st.coins.push(c); changed(st); return c;
  }
  function choose(st, c) { if (st.done || st.round.kind !== 'enough' || st.choice === c) return false; st.choice = c; changed(st); return true; }
  /* what Pip holds: the pile (change, basket) · the purse and what was added (more) · the purse (enough) */
  function pipVals(st) { var k = st.round.kind; return k === 'more' ? vals(st, 'purse').concat(vals(st, 'added')) : k === 'enough' ? vals(st, 'purse') : vals(st, 'pile'); }
  function pip(st) { return sum(pipVals(st)); }
  function enoughAnswer(r) { return sum(r.purse) >= r.price ? 'yes' : 'no'; }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, k = r.kind;
    if ((k === 'change' || k === 'basket') && !where(st, 'tray').length) return { result: 'note', key: 'hintTrayEmpty' };
    if (k === 'more' && !where(st, 'added').length) return { result: 'note', key: 'hintAddEmpty' };
    if (k === 'enough' && !st.choice) return { result: 'note', key: 'hintChoose' };
    /* Check again with nothing changed: a reminder, never a second miss */
    if (st.verdict) return { result: 'note', key: 'hintAgain' };
    st.checked = true;
    var why = null, p = pip(st);
    if (k === 'enough') { if (st.choice !== enoughAnswer(r)) why = 'enough'; }
    else if (p < r.price) why = 'short'; else if (p > r.price) why = 'over';
    if (!why) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2; st.verdict = { why: why };
    return { result: 'miss', why: why };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    var k = st.round.kind, w = v.why, h = st.help;
    if (k === 'enough') return h ? 'helpEnough' : enoughAnswer(st.round) === 'yes' ? 'hintEnoughYes' : 'hintEnoughNo';
    if (k === 'more') return h ? 'helpMore' : w === 'short' ? 'hintMoreShort' : 'hintMoreOver';
    if (h) return 'helpChange';
    if (k === 'basket') return w === 'short' ? 'hintBasketShort' : 'hintBasketOver';
    return w === 'short' ? 'hintShort' : 'hintOver';
  }
  function okKey(st) {
    var r = st.round, k = r.kind;
    if (k === 'enough') { var s = sum(r.purse); return s === r.price ? 'okEqual' : s > r.price ? 'okYes' : 'okNo'; }
    return { change: 'okChange', basket: 'okBasket', more: 'okMore' }[k];
  }
  /* miss 2, the count-up: change — Pip's fewest coins for the change, from the pile, after the price; more — from the purse up to the price */
  function countUp(st) {
    var r = st.round, k = r.kind;
    if (k === 'change' || k === 'basket') {
      var pileC = st.coins.filter(function (c) { return c.at === 'pile' || c.at === 'tray'; }).sort(function (a, b) { return b.v - a.v; });
      var ix = fewestFrom(change(r), pileC.map(function (c) { return c.v; }));
      var ids = ix ? ix.map(function (i) { return pileC[i].id; }) : [];
      return { start: r.price, ids: ids, steps: count(ix ? ix.map(function (i) { return pileC[i].v; }) : [], r.price), end: paid(r) };
    }
    if (k === 'more') { var s0 = sum(r.purse), need = fewestUnlimited(r.price - s0, st.fam) || []; return { start: s0, ids: [], steps: count(need, s0), end: r.price }; }
    return { start: 0, ids: [], steps: count(r.purse, 0), end: r.price };
  }
  /* the tray empties back to the pile (miss 2 of a change round) */
  function trayBack(st) { where(st, 'tray').forEach(function (c) { c.at = 'pile'; }); }
  function passSize(shop) { return shopOf(shop) === 'mixed' ? 24 : 8; }
  /* an order-only reshuffle per pass, never the previous order; two single-coin-change rounds (level 1) never side by side */
  /* the design's spacing rule is for the change rounds (level 1); baskets have up to 5 of 8 single-coin changes, which cannot all be kept apart */
  function singleCoin(r) { return r.kind === 'change' && r.pile.indexOf(change(r)) >= 0; }
  function plan(fam, shop, rnd, prev) {
    var pool = rounds(fam, shop), ks = pool.map(function (r) { return r.k; });
    var valid = function (c) { for (var i = 1; i < c.length; i++) if (singleCoin(pool[c[i]]) && singleCoin(pool[c[i - 1]])) return false; return !prev || prev.join() !== c.join(); };
    for (var tries = 0; tries < 600; tries++) { var c = shuffle(ks.slice(), rnd); if (valid(c)) return c; }
    var base = prev || ks;
    for (var s = 1; s < base.length; s++) { var r = base.slice(s).concat(base.slice(0, s)); if (valid(r)) return r; }
    return base.slice().reverse();
  }
  var api = { LOCALES: LOCALES, FAMILY: FAMILY, SHOPS: SHOPS, COUNTS: COUNTS, COINS: COINS, NOTES: NOTES, TOYS: TOYS, famOf: famOf, locOf: locOf, shopOf: shopOf, countOf: countOf,
    coin: coin, noteColour: noteColour, kinds: kinds, rounds: rounds, paid: paid, change: change, fewestFrom: fewestFrom, fewestUnlimited: fewestUnlimited, count: count,
    newState: newState, byId: byId, where: where, vals: vals, move: move, add: add, choose: choose, pipVals: pipVals, pip: pip, enoughAnswer: enoughAnswer,
    check: check, hint: hint, okKey: okKey, countUp: countUp, trayBack: trayBack, passSize: passSize, singleCoin: singleCoin, plan: plan, sum: sum, desc: desc, shuffle: shuffle };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ChangeBoxCore = api;
})(typeof window !== 'undefined' ? window : this);
