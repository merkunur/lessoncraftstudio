/* =====================================================================
   growing-picture-core.js — the model of ACTIVITY #154 of the one-by-one
   rebuild: "Gauge's Good Guess" → THE GROWING PICTURE (2.MD.A.3).
   Pure, no DOM. Design: docs/activities-rebuild/designs/154-gauge-good-guess.md
   ---------------------------------------------------------------------
   Every estimate is a promise about size. Tap one and the picture grows or
   shrinks to exactly that size beside a 30-cm school ruler (centimetres)
   or a 1-m metre stick (metres), drawn to the same scale — so a 12-cm ant
   towers over half a ruler and a 2-m ferry is two metre sticks long. A
   wrong estimate LOOKS wrong. Level 2 gives the number and asks for the
   unit: the same 2 makes a 2-cm bee or a bee as long as a bed.
   The benchmark depends only on the unit and on long-vs-tall, never on
   which option is right. Every round carries the believable range of its
   real thing, and exactly one option lies inside it.
   ===================================================================== */
(function (root) {
  'use strict';
  /* each picture: its theme, long or tall, the CSS turn that makes it lie flat, and its ink box after that turn
     (fractions of the image side, relative to the image centre — measured from the pixels, alpha > 40) */
  var PICS = {
    ant: { theme: 'insects and bugs', axis: 'long', ang: 0, l: -0.4785, r: 0.4727, t: -0.4053, b: 0.4297 },
    spoon: { theme: 'kitchen tools', axis: 'long', ang: -90, l: -0.4814, r: 0.4863, t: -0.1035, b: 0.1533 },
    snail: { theme: 'insects and bugs', axis: 'long', ang: 0, l: -0.4717, r: 0.4736, t: -0.3428, b: 0.3779 },
    bed: { theme: 'furniture', axis: 'long', ang: 0, l: -0.4697, r: 0.4707, t: -0.2822, b: 0.2832 },
    door: { theme: 'around the house', axis: 'tall', ang: 0, l: -0.3232, r: 0.3027, t: -0.4805, b: 0.4834 },
    pencil: { theme: 'classroom', axis: 'long', ang: 45, l: -0.6641, r: 0.5762, t: -0.1094, b: 0.124 },
    truck: { theme: 'vehicles', axis: 'long', ang: 0, l: -0.4658, r: 0.4688, t: -0.2744, b: 0.3174 },
    lighthouse: { theme: 'beach', axis: 'tall', ang: 0, l: -0.2021, r: 0.1807, t: -0.4678, b: 0.4844 },
    house: { theme: 'miscellaneous', axis: 'tall', ang: 0, l: -0.4736, r: 0.4727, t: -0.3701, b: 0.3789 },
    airplane: { theme: 'vehicles', axis: 'long', ang: 0, l: -0.4756, r: 0.4717, t: -0.2959, b: 0.3125 },
    ferry: { theme: 'vehicles', axis: 'long', ang: 0, l: -0.4736, r: 0.4688, t: -0.2568, b: 0.2617 },
    whale: { theme: 'ocean life', axis: 'long', ang: 0, l: -0.4775, r: 0.4805, t: -0.2305, b: 0.2832 },
    banana: { theme: 'fruits', axis: 'long', ang: 50, l: -0.4995, r: 0.5581, t: -0.1577, b: 0.4321 },
    bee: { theme: 'insects and bugs', axis: 'long', ang: 0, l: -0.4814, r: 0.4736, t: -0.4063, b: 0.4307 },
    car: { theme: 'vehicles', axis: 'long', ang: 0, l: -0.4795, r: 0.4795, t: -0.2607, b: 0.3076 },
    key: { theme: 'around the house', axis: 'long', ang: -90, l: -0.4834, r: 0.4883, t: -0.2285, b: 0.248 },
    book: { theme: 'classroom', axis: 'long', ang: 0, l: -0.4814, r: 0.4736, t: -0.2334, b: 0.2715 }
  };
  /* Level 1 — pick the estimate: [thing, unit, three options (increasing), the right value, the real thing's range in cm] */
  var ESTIMATE = [
    ['ant', 'cm', [1, 12, 30], 1, [0.3, 2.5]],
    ['spoon', 'cm', [15, 60, 150], 15, [12, 20]],
    ['snail', 'cm', [3, 30, 90], 3, [2, 6]],
    ['bed', 'm', [2, 6, 20], 2, [170, 230]],
    ['door', 'm', [1, 2, 9], 2, [180, 250]],
    ['pencil', 'cm', [2, 17, 90], 17, [12, 20]],
    ['truck', 'm', [2, 8, 60], 8, [500, 1200]],
    ['lighthouse', 'm', [3, 30, 300], 30, [1500, 6000]],
    ['house', 'm', [1, 8, 80], 8, [600, 1100]],
    ['airplane', 'm', [1, 4, 40], 40, [2500, 7500]],
    ['ferry', 'm', [2, 6, 100], 100, [3000, 30000]],
    ['whale', 'm', [1, 3, 15], 15, [1000, 2000]],
    ['banana', 'cm', [2, 6, 20], 20, [15, 25]]
  ];
  /* Level 2 — pick the unit: [thing, the number, the right unit, the real thing's range in cm] */
  var UNIT = [
    ['bee', 2, 'cm', [1, 3]], ['door', 2, 'm', [180, 250]], ['car', 4, 'm', [300, 500]], ['key', 6, 'cm', [4, 9]], ['truck', 8, 'm', [500, 1200]],
    ['spoon', 15, 'cm', [12, 20]], ['whale', 15, 'm', [1000, 2000]], ['banana', 20, 'cm', [15, 25]], ['book', 25, 'cm', [18, 32]], ['lighthouse', 30, 'm', [1500, 6000]]
  ];
  var RULER = 30, STICK = 100;   /* the benchmarks, in cm */

  function levelOf(v) { return v === 'unit' ? 'unit' : 'estimate'; }
  function cmOf(n, unit) { return unit === 'm' ? n * 100 : n; }
  function rounds(level) {
    level = levelOf(level);
    if (level === 'unit') return UNIT.map(function (r, i) { return { k: i, level: level, obj: r[0], axis: PICS[r[0]].axis, n: r[1], unit: r[2], cards: ['cm', 'm'], answer: r[2], lo: r[3][0], hi: r[3][1] }; });
    return ESTIMATE.map(function (r, i) { return { k: i, level: level, obj: r[0], axis: PICS[r[0]].axis, unit: r[1], cards: r[2].slice(), answer: r[3], lo: r[4][0], hi: r[4][1] }; });
  }
  /* the size a card promises, in cm */
  function sizeOf(round, card) { return round.level === 'unit' ? cmOf(round.n, card) : cmOf(card, round.unit); }
  function trueCm(round) { return sizeOf(round, round.answer); }
  /* the benchmarks drawn: only the unit (level 1) — both in level 2 — never the answer */
  function benches(round) { return round.level === 'unit' ? ['ruler', 'stick'] : [round.unit === 'm' ? 'stick' : 'ruler']; }
  function benchCm(b) { return b === 'stick' ? STICK : RULER; }
  /* the picture's ink along and across its axis, as fractions of the image side */
  function ink(obj) { var p = PICS[obj]; var w = p.r - p.l, h = p.b - p.t; return p.axis === 'tall' ? { along: h, across: w } : { along: w, across: h }; }
  /* one scale for everything in the frame: the longest thing fills 90 % of the length, and nothing overflows the thickness */
  function scale(lenPx, thickPx, items) {
    var s = Infinity;
    items.forEach(function (it) {
      if (!(it.cm > 0)) return;
      s = Math.min(s, 0.9 * lenPx / it.cm);
      if (it.across) s = Math.min(s, thickPx / (it.cm * it.across));
    });
    return s;
  }

  function newState(level, k, order) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, order: order && order.length === r.cards.length ? order.slice() : r.cards.map(function (c, i) { return i; }),
      chosen: null, misses: 0, help: false, verdict: null, done: false };
  }
  /* tap card i (a slot of the shown order): a choice, never graded */
  function choose(st, i) {
    if (st.done && st.chosen !== null) { if (i >= 0 && i < st.round.cards.length) { st.chosen = i; return true; } return false; }   /* free play: replay the sizes */
    if (!(i >= 0 && i < st.round.cards.length) || st.chosen === i) return false;
    st.chosen = i; st.verdict = null; return true;
  }
  function chosenCard(st) { return st.chosen === null ? null : st.round.cards[st.chosen]; }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.chosen === null) return { result: 'note', key: 'hintPick' };
    var r = st.round, c = chosenCard(st);
    if (c === r.answer) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { kind: sizeOf(r, c) > trueCm(r) ? 'big' : 'small' };
    return { result: 'miss', kind: st.verdict.kind };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict, r = st.round;
    if (!v) return null;
    if (r.level === 'unit') return st.help ? 'hintUnits' : v.kind === 'big' ? 'hintBigBoth' : 'hintSmallBoth';
    if (st.help) return 'cmp1_' + r.obj;
    var stick = r.unit === 'm';
    return v.kind === 'big' ? (stick ? 'hintBigStick' : 'hintBigRuler') : (stick ? 'hintSmallStick' : 'hintSmallRuler');
  }
  function questionKey(r) { return (r.level === 'unit' ? 'q2_' : 'q1_') + r.obj; }
  function okKey(r) { return r.level === 'unit' ? 'okUnit' : 'ok1_' + r.obj; }

  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the pass: an order-only reshuffle (never the previous order) and a fresh card order per round;
     level 2 puts the cm card on the left in exactly half the rounds */
  function plan(level, pass, rnd, prev) {
    var R = rounds(level), ks = R.map(function (r) { return r.k; }), o = null;
    for (var tries = 0; tries < 50; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) { o = c; break; } }
    if (!o) o = ks.slice().reverse();
    var cards = {};
    if (levelOf(level) === 'unit') { var left = shuffle(ks.slice(), rnd).slice(0, Math.floor(ks.length / 2)); ks.forEach(function (k) { cards[k] = left.indexOf(k) >= 0 ? [0, 1] : [1, 0]; }); }
    else R.forEach(function (r) { cards[r.k] = shuffle([0, 1, 2], rnd); });
    return { order: o, cards: cards };
  }

  var api = { PICS: PICS, RULER: RULER, STICK: STICK, levelOf: levelOf, cmOf: cmOf, rounds: rounds, sizeOf: sizeOf, trueCm: trueCm, benches: benches, benchCm: benchCm,
    ink: ink, scale: scale, newState: newState, choose: choose, chosenCard: chosenCard, check: check, hint: hint, questionKey: questionKey, okKey: okKey, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GrowingPictureCore = api;
})(typeof window !== 'undefined' ? window : this);
