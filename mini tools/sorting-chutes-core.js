/* =====================================================================
   sorting-chutes-core.js — the model behind ACTIVITY #35 of the one-by-one
   rebuild: "Sort and Count" (K.MD.B.3) — THE SORTING CHUTES.
   Design sheet: docs/activities-rebuild/designs/035-choice-board.md
   ---------------------------------------------------------------------
   Pure UMD, Node-loadable, no DOM. A mixed pile rides a belt ONE thing at
   a time; each goes down the chute of its kind (a wrong chute bounces it
   back), so nothing is skipped or counted twice. The tubes fill with equal
   slots — a tube's height IS its count — and the question is answered from
   the tubes: how many, which most / fewest, the order from most to fewest,
   how many more; the 2 × 2 sorts by kind AND by "does it fly". Every truth
   is derived from the pile literals, never stored.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SortingChutesCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CATS = ['animals', 'fruits', 'vehicles'];
  /* every noun's kind; the picture's theme folder; and which ones fly */
  var KIND = {
    cat: 'animals', dog: 'animals', duck: 'animals', fish: 'animals', rabbit: 'animals', horse: 'animals', pig: 'animals', sheep: 'animals',
    giraffe: 'animals', owl: 'animals', fox: 'animals', elephant: 'animals', turtle: 'animals', penguin: 'animals', bat: 'animals',
    seagull: 'animals', donkey: 'animals', parrot: 'animals',
    apple: 'fruits', banana: 'fruits', orange: 'fruits', strawberry: 'fruits', pear: 'fruits', lemon: 'fruits', raspberry: 'fruits',
    kiwi: 'fruits', pineapple: 'fruits', watermelon: 'fruits',
    car: 'vehicles', bus: 'vehicles', truck: 'vehicles', train: 'vehicles', taxi: 'vehicles', van: 'vehicles', airplane: 'vehicles',
    boat: 'vehicles', helicopter: 'vehicles', jet: 'vehicles', rocket: 'vehicles', tractor: 'vehicles'
  };
  var DIR = { animals: 'animals', fruits: 'fruits', vehicles: 'vehicles' };
  var DIR_OF = { parrot: 'Things That Fly' };          /* the red macaw (the animals theme has none); the folder name is case-exact on the server */
  var FLY = { owl: 1, bat: 1, seagull: 1, parrot: 1, airplane: 1, helicopter: 1, jet: 1, rocket: 1 };
  /* the funnel labels: members of the kind that NEVER appear in a round */
  var LABELS = {
    animals:  [['farm animals', 'cow'], ['zoo animals', 'lion'], ['forest creatures', 'frog']],
    fruits:   [['fruits', 'blueberry'], ['fruits', 'coconut'], ['fruits', 'grapefruit']],
    vehicles: [['vehicles', 'motorcycle'], ['vehicles', 'bicycle'], ['vehicles', 'ship']]
  };
  function dirOf(noun) { return DIR_OF[noun] || DIR[KIND[noun]]; }

  /* ---------------- the rounds (design §6; mango → kiwi/pear/orange: it reads as a peach;
     the duck is drawn as a duckling, never a bird that flies → parrot / seagull / bat) ---------------- */
  var G2 = [
    { id: 'A1', pile: { animals: ['cat', 'dog', 'duck'], fruits: ['apple', 'banana'] }, q: { type: 'count', cat: 'animals' } },
    { id: 'A2', pile: { fruits: ['apple', 'orange', 'banana', 'strawberry', 'pear'], animals: ['dog', 'fish'] }, q: { type: 'count', cat: 'fruits' } },
    { id: 'A3', pile: { animals: ['fish', 'duck', 'rabbit', 'horse'], fruits: ['pear', 'lemon', 'raspberry', 'orange', 'kiwi', 'pineapple'] }, q: { type: 'most' } },
    { id: 'A4', pile: { vehicles: ['car', 'bus'], animals: ['cat', 'dog', 'fish', 'rabbit', 'sheep', 'pig', 'horse'] }, q: { type: 'count', cat: 'vehicles' } },
    { id: 'A5', pile: { animals: ['owl', 'fox', 'elephant'], vehicles: ['car', 'truck', 'train', 'taxi', 'van'] }, q: { type: 'order' } },
    { id: 'A6', pile: { fruits: ['strawberry', 'apple', 'pear', 'banana'], animals: ['horse', 'pig', 'sheep'] }, q: { type: 'count', cat: 'animals' } },
    { id: 'A7', pile: { vehicles: ['car', 'bus', 'truck', 'train', 'airplane', 'boat'], fruits: ['banana'] }, q: { type: 'fewest' } },
    { id: 'A8', pile: { animals: ['giraffe', 'horse', 'rabbit', 'pig', 'sheep'], fruits: ['kiwi', 'pineapple', 'watermelon'] }, q: { type: 'count', cat: 'fruits' } },
    { id: 'A9', pile: { vehicles: ['airplane', 'boat', 'helicopter'], animals: ['turtle', 'owl', 'fox', 'rabbit'] }, q: { type: 'order' } }
  ];
  var G3 = [
    { id: 'B1', pile: { animals: ['cat', 'dog', 'duck', 'fish'], fruits: ['apple', 'banana'], vehicles: ['car', 'bus', 'truck'] }, q: { type: 'count', cat: 'vehicles' } },
    { id: 'B2', pile: { animals: ['rabbit', 'horse'], fruits: ['pear', 'lemon', 'orange', 'raspberry', 'kiwi'], vehicles: ['train', 'taxi', 'van'] }, q: { type: 'most' } },
    { id: 'B3', pile: { animals: ['pig', 'sheep', 'cat', 'dog', 'duck'], fruits: ['kiwi'], vehicles: ['boat', 'airplane', 'bus'] }, q: { type: 'order' } },
    { id: 'B4', pile: { animals: ['owl', 'fox', 'elephant'], fruits: ['banana', 'apple', 'strawberry', 'pear'], vehicles: ['car', 'truck'] }, q: { type: 'count', cat: 'fruits' } },
    { id: 'B5', pile: { animals: ['turtle', 'penguin', 'giraffe', 'horse', 'rabbit', 'pig'], fruits: ['orange', 'pear'], vehicles: ['helicopter', 'car', 'bus', 'van'] }, q: { type: 'fewest' } },
    { id: 'B6', pile: { animals: ['cat', 'fish'], fruits: ['apple', 'raspberry', 'pear', 'banana', 'lemon', 'kiwi', 'orange'], vehicles: ['train', 'boat', 'taxi', 'truck', 'car'] }, q: { type: 'order' } },
    { id: 'B7', pile: { animals: ['dog', 'duck', 'sheep'], fruits: ['banana'], vehicles: ['airplane', 'bus', 'car', 'van', 'train'] }, q: { type: 'more', a: 'vehicles', b: 'animals' } },
    { id: 'B8', pile: { animals: ['elephant', 'giraffe', 'horse', 'donkey'], fruits: ['strawberry', 'watermelon', 'pineapple'], vehicles: ['tractor', 'bus'] }, q: { type: 'most' } },
    { id: 'B9', pile: { animals: ['rabbit', 'cat', 'dog', 'pig', 'sheep'], fruits: ['apple', 'orange'], vehicles: ['car', 'taxi', 'boat'] }, q: { type: 'more', a: 'animals', b: 'fruits' } }
  ];
  var X = [
    { id: 'C1', pile: { animals: ['owl', 'bat', 'dog', 'pig', 'cat'], vehicles: ['airplane', 'car', 'bus', 'truck', 'train'] }, q: { type: 'cell', key: 'animals.fly' } },
    { id: 'C2', pile: { animals: ['parrot', 'owl', 'seagull', 'rabbit', 'horse'], vehicles: ['helicopter', 'jet', 'boat', 'taxi', 'tractor', 'car', 'bus'] }, q: { type: 'cell', key: 'vehicles.ground' } },
    { id: 'C3', pile: { animals: ['parrot', 'elephant', 'turtle', 'penguin', 'dog'], vehicles: ['airplane', 'helicopter', 'rocket', 'car', 'train'] }, q: { type: 'fly' } },
    { id: 'C4', pile: { animals: ['bat', 'owl', 'parrot', 'seagull', 'cat'], vehicles: ['jet', 'airplane', 'bus', 'truck', 'taxi'] }, q: { type: 'mostCell' } },
    { id: 'C5', pile: { animals: ['owl', 'seagull', 'pig', 'horse', 'rabbit', 'dog', 'cat'], vehicles: ['rocket', 'boat', 'car', 'train', 'tractor'] }, q: { type: 'all', cat: 'animals' } },
    { id: 'C6', pile: { animals: ['seagull', 'parrot', 'bat', 'penguin', 'turtle'], vehicles: ['helicopter', 'airplane', 'jet', 'rocket', 'bus'] }, q: { type: 'fly' } },
    { id: 'C7', pile: { animals: ['bat', 'elephant', 'dog', 'pig'], vehicles: ['airplane', 'jet', 'car', 'bus', 'truck', 'taxi', 'train'] }, q: { type: 'cell', key: 'vehicles.ground' } }
  ];
  var CAP = { two: 7, three: 7, fly: 5 };

  function groups(v) { return v === '3' || v === 'three' ? 'three' : v === '2x2' || v === 'fly' ? 'fly' : 'two'; }
  function numbers(v) { return v === 'hidden' ? 'hidden' : 'shown'; }
  function rounds(g) { var t = groups(g); return (t === 'three' ? G3 : t === 'fly' ? X : G2).map(function (r, i) { var o = {}; for (var k in r) o[k] = r[k]; o.i = i; return o; }); }
  function isFly(r) { return r.id.charAt(0) === 'C'; }
  /* the tube an item belongs in */
  function keyOf(noun, fly) { return fly ? KIND[noun] + (FLY[noun] ? '.fly' : '.ground') : KIND[noun]; }
  function items(r) { var a = []; CATS.forEach(function (c) { (r.pile[c] || []).forEach(function (n) { a.push(n); }); }); return a; }
  function tubeKeys(r) {
    if (isFly(r)) return ['animals.fly', 'animals.ground', 'vehicles.fly', 'vehicles.ground'];
    return CATS.filter(function (c) { return r.pile[c] && r.pile[c].length; });
  }
  /* the count of each tube, from the pile literals */
  function counts(r) {
    var c = {}, fly = isFly(r);
    tubeKeys(r).forEach(function (k) { c[k] = 0; });
    items(r).forEach(function (n) { c[keyOf(n, fly)]++; });
    return c;
  }
  function sortedDesc(r) { var c = counts(r); return tubeKeys(r).slice().sort(function (a, b) { return c[b] - c[a]; }); }
  /* the truth of the round's question: a number, a tube, or an order */
  function truth(r) {
    var c = counts(r), q = r.q, keys = tubeKeys(r);
    if (q.type === 'count') return c[q.cat];
    if (q.type === 'more') return c[q.a] - c[q.b];
    if (q.type === 'cell') return c[q.key];
    if (q.type === 'fly') return c['animals.fly'] + c['vehicles.fly'];
    if (q.type === 'all') return c[q.cat + '.fly'] + c[q.cat + '.ground'];
    if (q.type === 'order') return sortedDesc(r);
    var best = keys[0];
    keys.forEach(function (k) { if (q.type === 'fewest' ? c[k] < c[best] : c[k] > c[best]) best = k; });
    return best;
  }
  function answerKind(r) { var t = r.q.type; return t === 'most' || t === 'fewest' || t === 'mostCell' ? 'tube' : t === 'order' ? 'order' : 'number'; }

  /* the belt: shuffled, never more than three of a kind in a row */
  function belt(r, rnd) {
    var a = items(r), out;
    for (var t = 0; t < 400; t++) {
      out = a.slice();
      for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var x = out[i]; out[i] = out[j]; out[j] = x; }
      if (runOk(out)) return out;
    }
    return out;
  }
  function runOk(a) { var run = 1; for (var i = 1; i < a.length; i++) { if (KIND[a[i]] === KIND[a[i - 1]]) { run++; if (run > 3) return false; } else run = 1; } return true; }
  /* where the tubes stand: re-dealt every round; an order round never starts already sorted */
  function deal(r, rnd) {
    var keys = tubeKeys(r);
    if (isFly(r)) return keys.slice();                 /* the 2 × 2 keeps its table: animals | vehicles, sky | ground */
    var c = counts(r), out;
    for (var t = 0; t < 200; t++) {
      out = keys.slice();
      for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var x = out[i]; out[i] = out[j]; out[j] = x; }
      if (r.q.type !== 'order' || !isSorted(out, c)) return out;
    }
    return out.reverse();
  }
  function isSorted(order, c) { for (var i = 1; i < order.length; i++) if (c[order[i]] > c[order[i - 1]]) return false; return true; }
  /* where an order breaks: the left index of every neighbour pair the wrong way round */
  function breaks(order, c) { var b = []; for (var i = 1; i < order.length; i++) if (c[order[i]] > c[order[i - 1]]) b.push(i - 1); return b; }

  /* ---------------- a round's state ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random;
    var st = { round: r.id, r: r, fly: isFly(r), belt: belt(r, rnd), tubes: {}, order: deal(r, rnd), phase: 'sort',
      num: null, pick: null, moved: false, misses: 0, help: 0, done: false, last: null, bounces: 0 };
    tubeKeys(r).forEach(function (k) { st.tubes[k] = []; });
    return st;
  }
  function current(st) { return st.belt.length ? st.belt[0] : null; }
  /* drop the waiting thing down a tube's chute: the right one keeps it, a wrong one bounces it back */
  function drop(st, key) {
    if (st.phase !== 'sort' || !st.belt.length) return { result: 'none' };
    if (!st.tubes[key]) return { result: 'none' };
    var n = st.belt[0], want = keyOf(n, st.fly);
    if (key !== want) {
      st.bounces++;
      var sameKind = st.fly && key.split('.')[0] === KIND[n];
      st.last = { result: 'bounce', noun: n, key: key, why: sameKind ? 'fly' : 'kind' };
      return st.last;
    }
    st.belt.shift(); st.tubes[key].push(n);
    if (!st.belt.length) st.phase = 'ask';
    st.last = { result: 'in', noun: n, key: key, n: st.tubes[key].length };
    return st.last;
  }
  /* only the top of a tube comes back (a stack), and only while sorting */
  function undoTop(st, key) {
    if (st.phase !== 'sort' || !st.tubes[key] || !st.tubes[key].length) return null;
    var n = st.tubes[key].pop(); st.belt.unshift(n);
    st.last = { result: 'undo', noun: n, key: key };
    return st.last;
  }
  function tubeCounts(st) { var c = {}; for (var k in st.tubes) c[k] = st.tubes[k].length; return c; }
  /* the answers */
  function setNum(st, v) { if (st.phase !== 'ask' || st.done) return false; st.num = v; st.last = { result: 'answer' }; return true; }
  function setPick(st, key) { if (st.phase !== 'ask' || st.done || !st.tubes[key]) return false; st.pick = key; st.last = { result: 'answer' }; return true; }
  function move(st, from, to) {                      /* slide a tube along the rail */
    if (st.phase !== 'ask' || st.done || from === to || from < 0 || to < 0 || from >= st.order.length || to >= st.order.length) return false;
    var k = st.order.splice(from, 1)[0]; st.order.splice(to, 0, k); st.moved = true; st.last = { result: 'answer' };
    return true;
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    if (st.phase !== 'ask') { st.last = { result: 'sorting' }; return st.last; }
    var kind = answerKind(st.r), want = truth(st.r), ok;
    if (kind === 'number') { if (st.num == null) { st.last = { result: 'empty' }; return st.last; } ok = st.num === want; }
    else if (kind === 'tube') { if (!st.pick) { st.last = { result: 'empty' }; return st.last; } ok = st.pick === want; }
    else { if (!st.moved) { st.last = { result: 'empty' }; return st.last; } ok = isSorted(st.order, tubeCounts(st)); }
    if (ok) { st.done = true; st.last = { result: 'ok' }; return st.last; }
    st.misses++; st.help++;
    st.last = { result: 'wrong' };
    return st.last;
  }
  function hint(st) {
    var L = st.last, t = st.r.q.type, kind = answerKind(st.r);
    if (!L) return null;
    if (L.result === 'bounce') return { key: L.why === 'fly' ? 'hintBounceFly' : 'hintBounce', wrong: true };
    if (L.result === 'sorting') return { key: st.fly ? 'pSortFly' : 'pSort' };
    if (L.result === 'empty') return { key: kind === 'number' ? 'tapNumber' : kind === 'tube' ? 'tapTube' : 'dragOrder' };
    if (L.result !== 'wrong') return null;
    var two = t === 'fly' || t === 'all';            /* the answer is the sum of two tubes */
    if (st.help >= 2) return { key: two ? 'hintReadTopTwo' : 'hintReadTop', wrong: true };
    if (t === 'order') return { key: 'hintWrongWay', wrong: true };
    if (t === 'more') return { key: 'hintPairUp', wrong: true };
    if (kind === 'tube') return { key: 'hintHeight', wrong: true };
    return { key: two ? 'hintCountBoth' : 'hintCountUp', wrong: true };
  }
  /* what the help shows after a miss: which tubes to light / number / pair */
  function help(st) {
    if (!st.help || st.done) return null;
    var q = st.r.q, t = q.type, c = tubeCounts(st), lvl = st.help >= 2 ? 2 : 1;
    if (t === 'count' || t === 'cell') return { kind: 'count', tubes: [q.cat || q.key], level: lvl };
    if (t === 'all') return { kind: 'count', tubes: [q.cat + '.fly', q.cat + '.ground'], level: lvl };
    if (t === 'fly') return { kind: 'count', tubes: ['animals.fly', 'vehicles.fly'], level: lvl };
    if (t === 'more') return { kind: 'pair', a: q.a, b: q.b, extras: c[q.a] - c[q.b], level: lvl };
    if (t === 'order') return { kind: 'order', breaks: breaks(st.order, c), level: lvl };
    return { kind: 'height', from: st.pick, level: lvl };
  }
  /* the win line and its words */
  function success(st) {
    if (!st.done) return null;
    var q = st.r.q, t = q.type, w = truth(st.r);
    if (t === 'count') return { key: 'okCount' + cap(q.cat), args: { n: w } };
    if (t === 'most' || t === 'fewest') return { key: (t === 'most' ? 'okMost' : 'okFewest') + (tubeKeys(st.r).length === 2 ? 'Two' : '') + cap(w) };   /* two groups: "more / fewer" */
    if (t === 'order') return { key: 'okOrder', list: w };
    if (t === 'more') return { key: 'okMore' + cap(q.a) + cap(q.b), args: { n: w } };
    if (t === 'mostCell') return { key: 'okMostCell' };
    return { key: 'okN', args: { n: w } };
  }
  function prompt(r) {
    var q = r.q, t = q.type;
    if (t === 'count') return 'pCount' + cap(q.cat);
    if (t === 'more') return 'pMore' + cap(q.a) + cap(q.b);
    if (t === 'cell') return 'pCell' + q.key.split('.').map(cap).join('');
    if (t === 'all') return 'pAll' + cap(q.cat);
    if ((t === 'most' || t === 'fewest') && tubeKeys(r).length === 2) return 'p' + cap(t) + 'Two';
    return 'p' + cap(t);
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* order-only reshuffle of the rounds: never the previous order */
  function order(pool, rnd, prev) {
    var n = pool.length, a;
    for (var t = 0; t < 400; t++) {
      a = pool.map(function (_, i) { return i; });
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      return a;
    }
    return a;
  }

  /* ---------------- geometry (px) ---------------- */
  function capOf(r) { var c = counts(r), m = 0; for (var k in c) m = Math.max(m, c[k]); return Math.max(5, m); }
  function layout(W, g, capR) {
    var wide = W >= 560, t = groups(g), n = t === 'three' ? 3 : t === 'fly' ? 4 : 2;
    var cap = capR || CAP[t], slot = wide ? 46 : cap > 5 ? 32 : 34, mark = wide ? 40 : 30;   /* a 7-slot phone tube: 32 px slots, the marks still at the 30 px floor */
    var tubeW, gap, colGap = 0;
    if (wide) { tubeW = t === 'two' ? 120 : t === 'three' ? 110 : 96; gap = t === 'two' ? 90 : t === 'three' ? 40 : 12; colGap = t === 'fly' ? 44 : 0; }
    else { gap = t === 'fly' ? 6 : 12; colGap = t === 'fly' ? 14 : 0; tubeW = Math.floor((Math.min(W, 380) - gap * (n - 1) - colGap - 4) / n); if (t === 'two') tubeW = Math.min(tubeW, 120); }
    var rowW = n * tubeW + (n - 1) * gap + colGap;
    return { mode: wide ? 'wide' : 'narrow', W: W, groups: t, n: n, slot: slot, mark: mark, cap: cap, tubeW: tubeW, gap: gap, colGap: colGap, rowW: rowW,
      beltH: wide ? 124 : 92, obj: wide ? 104 : 72, funnelH: wide ? 34 : 28, labelH: mark + 8, tubeH: cap * slot + 10, num: wide ? 52 : 44, numCols: wide ? 10 : 5 };
  }
  /* each tube's left edge in its row */
  function tubeX(L, i) {
    var x0 = (L.W - L.rowW) / 2, x = x0 + i * (L.tubeW + L.gap);
    if (L.groups === 'fly' && i >= 2) x += L.colGap;
    return x;
  }

  return {
    CATS: CATS, KIND: KIND, FLY: FLY, LABELS: LABELS, G2: G2, G3: G3, X: X, CAP: CAP,
    dirOf: dirOf, capOf: capOf, groups: groups, numbers: numbers, rounds: rounds, isFly: isFly, keyOf: keyOf, items: items, tubeKeys: tubeKeys, counts: counts,
    sortedDesc: sortedDesc, truth: truth, answerKind: answerKind, belt: belt, runOk: runOk, deal: deal, isSorted: isSorted, breaks: breaks,
    newState: newState, current: current, drop: drop, undoTop: undoTop, tubeCounts: tubeCounts, setNum: setNum, setPick: setPick, move: move,
    check: check, hint: hint, help: help, success: success, prompt: prompt, cap: cap, order: order, layout: layout, tubeX: tubeX
  };
});
