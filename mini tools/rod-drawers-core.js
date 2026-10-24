/* =====================================================================
   rod-drawers-core.js — the model of ACTIVITY #95, THE TEN-ROD DRAWERS
   ("Compare Two-Digit Numbers — Greater Than, Less Than, Equal",
   1.NBT.B.3). Pure, no DOM. Design: docs/activities-rebuild/designs/095-choice-board.md
   ---------------------------------------------------------------------
   Each number is a cabinet with one drawer per place. The drawers of the
   same place are linked under the podium: pulling the place opens both
   cabinets' drawers at once. A place can only be pulled when every place
   to its left is open and EQUAL; as soon as an open place differs, the
   places to its right are SEALED — nine ones can never reach the next ten.
   Once the deciding place is open the sign stands up and is turned
   (< > =); Check fits it to the two value columns: its open side must hold
   the bigger number. Order rounds put three cabinets on a staircase.
   Levels: groups to 20 (packs + loose counters), two-digit, four-digit.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RodDrawersCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['groups', 'two', 'four'], TASKS = ['compare', 'order'];
  var PLACES = { groups: 2, two: 2, four: 4 };
  /* four-digit numerals: en comma (its decimal mark is the point); fr/sv/no/fi narrow no-break space (their school form);
     de/nl/it/es/pt/da ungrouped (their point is the thousands mark beside a comma decimal — "4.321" is a trap at eight) */
  var GROUPING = { en: ',', fr: ' ', sv: ' ', no: ' ', fi: ' ', de: '', nl: '', it: '', es: '', pt: '', da: '' };
  /* the fruit that names a group: [theme, noun, counter colour] — the pear is the supermarket's plainly green-yellow one (fruits/pear is red-blushed) */
  var FRUIT = {
    apple: ['fruits', 'apple', '#D9363E'], banana: ['fruits', 'banana', '#E8C547'], pear: ['at-the-supermarket', 'pear', '#C9CB3A'],
    strawberry: ['fruits', 'strawberry', '#E0444E'], orange: ['fruits', 'orange', '#F08A24']
  };
  var COMPARE = {
    two: [[47, 52], [63, 38], [45, 45], [71, 76], [54, 51], [29, 92], [60, 49], [24, 42], [37, 34], [65, 56]],
    groups: [[14, 17, 'apple'], [12, 8, 'banana'], [20, 15, 'pear'], [9, 11, 'strawberry'], [16, 16, 'orange'], [13, 10, 'strawberry'], [18, 19, 'apple'], [11, 7, 'orange']],
    four: [[4321, 4312], [2785, 3001], [6050, 6005], [1999, 2000], [7104, 7140], [3333, 3333], [8090, 8009], [5672, 5762]]
  };
  /* [the waiting row, left to right], dir: 'up' = smallest first, 'down' = biggest first */
  var ORDER = {
    two: [[[43, 34, 38], 'up'], [[72, 27, 70], 'down'], [[15, 51, 50], 'up'], [[66, 61, 69], 'down'], [[98, 89, 80], 'up'], [[23, 32, 30], 'down'], [[57, 75, 55], 'up'], [[41, 14, 44], 'down']],
    groups: [[[15, 9, 12], 'up', 'apple'], [[11, 18, 6], 'down', 'banana'], [[13, 7, 17], 'up', 'pear'], [[20, 14, 16], 'down', 'strawberry'], [[10, 19, 8], 'up', 'orange'], [[12, 5, 16], 'down', 'apple'], [[18, 13, 11], 'up', 'banana'], [[9, 17, 14], 'down', 'strawberry']],
    four: [[[4321, 4312, 4231], 'up'], [[2785, 3001, 2875], 'down'], [[6050, 6005, 6500], 'up'], [[7104, 7140, 7014], 'down'], [[2000, 1999, 1990], 'up'], [[5762, 5672, 5726], 'down'], [[8090, 8009, 8900], 'up'], [[3303, 3330, 3333], 'down']]
  };
  var SIGNS = ['<', '>', '='];

  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'two'; }
  function taskOf(t) { return TASKS.indexOf(t) >= 0 ? t : 'compare'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function table(level, task) { return (taskOf(task) === 'order' ? ORDER : COMPARE)[levelOf(level)]; }
  function ids(level, task) { var n = table(level, task).length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the digits of n, one per place, left to right (the highest place first) */
  function digits(n, places) { var s = String(n); while (s.length < places) s = '0' + s; return s.split('').map(Number); }
  function relation(a, b) { return a < b ? '<' : a > b ? '>' : '='; }
  /* the first place from the LEFT where the digits differ (-1 when the numbers are equal) */
  function decidingPlace(a, b, places) { var da = digits(a, places), db = digits(b, places); for (var i = 0; i < places; i++) if (da[i] !== db[i]) return i; return -1; }
  function format(n, loc, level) {
    var s = String(n); if (levelOf(level) !== 'four' || s.length < 4) return s;
    var g = GROUPING[locale(loc)] || ''; return s.slice(0, s.length - 3) + g + s.slice(s.length - 3);
  }
  function round(level, task, idx) {
    level = levelOf(level); task = taskOf(task);
    var row = table(level, task)[idx], P = PLACES[level];
    if (task === 'order') return { level: level, task: task, idx: idx, places: P, cards: row[0].slice(), dir: row[1], fruit: row[2] || null };
    return { level: level, task: task, idx: idx, places: P, a: row[0], b: row[1], fruit: row[2] || null, rel: relation(row[0], row[1]), decide: decidingPlace(row[0], row[1], P) };
  }
  function newState(r) {
    var open = []; for (var i = 0; i < r.places; i++) open.push(false);
    return { r: r, open: open, sign: 'flat', steps: [null, null, null], misses: 0, show: 0, last: null, done: false, reveal: false };
  }
  function clear(st) { st.show = 0; st.last = null; st.reveal = false; }

  /* ---- the drawers ---- */
  function lockOf(st, p) {
    var r = st.r; if (r.task !== 'compare') return 'locked';
    if (st.open[p]) return 'open';
    var da = digits(r.a, r.places), db = digits(r.b, r.places);
    for (var q = 0; q < p; q++) {
      if (!st.open[q]) return 'locked';
      if (da[q] !== db[q]) return 'sealed';
    }
    return 'free';
  }
  /* pull place p: both cabinets' drawers of that place slide out; a locked or sealed place only rattles */
  function openPlace(st, p) {
    if (st.done || st.r.task !== 'compare' || p < 0 || p >= st.r.places) return null;
    var lk = lockOf(st, p); if (lk === 'open') return { result: 'already' };
    if (lk !== 'free') return { result: 'rattle', lock: lk };
    st.open[p] = true; clear(st);
    var sealed = []; for (var q = p + 1; q < st.r.places; q++) if (lockOf(st, q) === 'sealed') sealed.push(q);
    return { result: 'opened', place: p, sealed: sealed };
  }
  /* the sign stands up when the deciding place is open (every place, when the numbers are equal) */
  function signReady(st) {
    var r = st.r; if (r.task !== 'compare') return false;
    var last = r.decide < 0 ? r.places - 1 : r.decide;
    for (var i = 0; i <= last; i++) if (!st.open[i]) return false;
    return true;
  }
  function turn(st) {
    if (st.done || !signReady(st)) return null;
    st.sign = st.sign === 'flat' ? '<' : SIGNS[(SIGNS.indexOf(st.sign) + 1) % 3]; clear(st); return st.sign;
  }

  /* ---- the staircase ---- */
  function placeCard(st, card, step) {
    if (st.done || st.r.task !== 'order' || card < 0 || card > 2 || step < 0 || step > 2) return false;
    var from = st.steps.indexOf(card), there = st.steps[step];
    if (from === step) return false;
    if (from >= 0) st.steps[from] = there; st.steps[step] = card;
    clear(st); return true;
  }
  function unplace(st, card) { var at = st.steps.indexOf(card); if (st.done || at < 0) return false; st.steps[at] = null; clear(st); return true; }
  function sortedCards(r) { var v = r.cards.slice().sort(function (x, y) { return x - y; }); return r.dir === 'down' ? v.reverse() : v; }

  /* ---- Check ---- */
  function check(st) {
    var r = st.r; if (st.done) return null;
    var none = null;
    if (r.task === 'order') {
      if (st.steps.indexOf(null) >= 0) none = 'hintSteps';
    } else if (!signReady(st)) {
      none = st.open[0] ? (r.places === 4 ? 'hintNextNow' : 'hintOnesNow') : (r.places === 4 ? 'hintLeftFirst' : 'hintTensFirst');
    } else if (st.sign === 'flat') none = 'hintTurn';
    if (none) { st.last = { reason: 'none', hint: none }; return { result: 'none', hint: none }; }
    var kind, culprit = -1;
    if (r.task === 'order') {
      var want = sortedCards(r), i;
      for (i = 0; i < 3; i++) if (r.cards[st.steps[i]] !== want[i]) break;
      if (i === 3) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok' }; }
      culprit = st.steps[i]; st.steps[i] = null; kind = 'orderBreak';   /* the cabinet that breaks the staircase hops back to the waiting row */
    } else {
      st.reveal = true;   /* every Check opens every drawer: the columns stand at full height */
      if (st.sign === r.rel) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok' }; }
      kind = r.rel === '=' ? 'notEqual' : st.sign === '=' ? 'falseEqual' : 'wrongWay';
    }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: kind, culprit: culprit };
    return { result: 'miss', kind: kind, culprit: culprit };
  }
  function hint(st) {
    var L = st.last, r = st.r; if (!L || L.reason === 'fair') return null;
    if (L.reason === 'none') return { key: L.hint };
    var four = r.places === 4;
    if (r.task === 'order') return { key: st.show >= 2 ? (four ? 'hintOrderFour' : 'hintColumns') : (four ? 'hintOrderFour' : 'hintOrder') };
    if (L.reason === 'notEqual') return { key: four ? 'hintSameFour' : 'hintSame' };   /* equal numbers: there is no bigger one, so never the open-side hint */
    if (st.show >= 2) return { key: 'hintOpenSide' };
    if (L.reason === 'falseEqual') return { key: four ? 'hintEqualFour' : 'hintEqual' };
    if (four) return { key: 'hintLookLeft' };
    return { key: r.decide === 0 ? 'hintLookTens' : 'hintOnesDecide' };
  }
  /* the grab: how the sign meets the two columns */
  function grab(sign, a, b) {
    var rel = relation(a, b);
    if (sign === '=') return rel === '=' ? 'fits' : 'tiltedEqual';
    if (rel === '=') return 'wrongWay';
    return sign === rel ? 'fits' : 'wrongWay';
  }

  /* ---- order of a pass: never the previous pass; compare: no three of the same sign or the same bigger side in a row; order: the steps' direction alternates ---- */
  function orderOk(level, task, order) {
    var i;
    if (taskOf(task) === 'order') { for (i = 1; i < order.length; i++) if (round(level, task, order[i - 1]).dir === round(level, task, order[i]).dir) return false; return true; }
    for (i = 2; i < order.length; i++) {
      var x = round(level, task, order[i - 2]), y = round(level, task, order[i - 1]), z = round(level, task, order[i]);
      if (x.rel === y.rel && y.rel === z.rel) return false;
    }
    return true;
  }
  function plan(level, task, rnd, prev) {
    var all = ids(level, task), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(level, task, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }
  return {
    DATA: { COMPARE: COMPARE, ORDER: ORDER, FRUIT: FRUIT, GROUPING: GROUPING }, LOCALES: LOCALES, LEVELS: LEVELS, TASKS: TASKS, PLACES: PLACES, SIGNS: SIGNS,
    levelOf: levelOf, taskOf: taskOf, locale: locale, ids: ids, shuffle: shuffle, digits: digits, relation: relation, decidingPlace: decidingPlace, format: format,
    round: round, newState: newState, lockOf: lockOf, openPlace: openPlace, signReady: signReady, turn: turn,
    placeCard: placeCard, unplace: unplace, sortedCards: sortedCards, check: check, hint: hint, grab: grab, orderOk: orderOk, plan: plan, layout: layout
  };
});
