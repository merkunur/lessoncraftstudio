/* =====================================================================
   overflow-trays-core.js — the model of THE OVERFLOW TRAYS
   (activity #30 of the one-by-one rebuild, "Teen Numbers", K.NBT.A.1).
   Design sheet: docs/activities-rebuild/designs/030-ten-frame.md
   ---------------------------------------------------------------------
   Counters pour from a spout into a top tray of ten; nothing reaches the
   bottom tray until the top one is full, so 14 is a full ten that
   overflowed plus 4. "Number of the day": every full tray seals and slides
   onto the tens shelf; a tray stack adds a whole sealed ten per tap; the
   day card is filled step by step — build the number, ten more, ten less,
   and (rounds 3, 6, 9) one more / one less, where 30 − 1 breaks a ten.
   No count is shown during a task. Pure model, no DOM.
   Node-loadable (verify-overflow-trays-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var TEENS = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  /* the day table: the number of the day and its extra fourth step (rounds 3, 6, 9) */
  var DAYS = [
    { n: 23 }, { n: 37 }, { n: 49, extra: 'more' }, { n: 56 }, { n: 64 }, { n: 72, extra: 'less' }, { n: 18 }, { n: 85 }, { n: 30, extra: 'less' }
  ];
  var MAX = 99, POUR_MS = 250;

  function level(name) { return name === 'day' ? 'day' : 'teen'; }
  function rounds(lv) {
    lv = level(lv);
    if (lv === 'teen') return TEENS.map(function (n, i) { return { level: 'teen', index: i, n: n, steps: [{ kind: 'build', target: n }], id: 'teen.' + n }; });
    return DAYS.map(function (d, i) {
      var steps = [{ kind: 'build', target: d.n }, { kind: 'more', target: d.n + 10 }, { kind: 'less', target: d.n - 10 }];
      if (d.extra) steps.push({ kind: d.extra === 'more' ? 'oneMore' : 'oneLess', target: d.extra === 'more' ? d.n + 1 : d.n - 1 });
      return { level: 'day', index: i, n: d.n, steps: steps, id: 'day.' + d.n };
    });
  }

  /* ---------------- the order: never the same twice, never the same seam ---------------- */
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length, base = pool.map(function (r, i) { return i; });
    if (n < 2) return base;
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    for (var tries = 0; tries < 200; tries++) {
      var a = base.slice();
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      if (a[0] === lastPrev) continue;
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      return a;
    }
    return base.slice(1).concat(base[0]);
  }

  /* ---------------- state ----------------
     teen: `poured` (0–20): top = min(poured, 10), bottom = poured − top
     day:  `sealed` (0–9) full trays on the shelf + `open` (0–9) counters in the open tray */
  function newState(r) {
    return { id: r.id, level: r.level, n: r.n, steps: r.steps.slice(), step: 0, poured: 0, sealed: 0, open: 0,
      misses: 0, help: 0, last: null, done: false, explore: false, faces: {} };
  }
  function newPlay() { return { id: 'play', level: 'day', n: null, steps: [], step: 0, poured: 0, sealed: 0, open: 0, misses: 0, help: 0, last: null, done: false, explore: true, faces: {} }; }
  function total(st) { return st.level === 'teen' ? st.poured : st.sealed * 10 + st.open; }
  function top(st) { return Math.min(st.poured, 10); }
  function bottom(st) { return st.poured - top(st); }
  function step(st) { return st.steps[st.step] || null; }
  function moved(st) { st.help = 0; st.last = null; }

  /* pour one counter: the teen trays hold 20; in the day level the 10th counter seals the open tray */
  function pour(st) {
    if (st.done) return null;
    if (st.level === 'teen') { if (st.poured >= 20) return null; st.poured++; moved(st); return { overflow: st.poured === 11, filledTop: st.poured === 10 }; }
    if (total(st) >= MAX) return null;
    st.open++; moved(st);
    if (st.open === 10) { st.open = 0; st.sealed++; return { sealed: true }; }
    return {};
  }
  /* the tray stack: one whole sealed ten — never loose counters */
  function addTen(st) {
    if (st.done || st.level !== 'day' || st.sealed >= 9 || total(st) + 10 > MAX) return false;
    st.sealed++; moved(st); return true;
  }
  /* take back the LAST counter poured; in the teen trays a top counter cannot leave while the
     bottom has any; in the day level an empty open tray breaks the top sealed ten open */
  function takeBack(st, fromTop) {
    if (st.done) return null;
    if (st.level === 'teen') {
      if (!st.poured) return null;
      if (fromTop && bottom(st) > 0) return { refused: 'full' };
      st.poured--; moved(st); return {};
    }
    if (st.open > 0) { st.open--; moved(st); return {}; }
    if (st.sealed > 0) { st.sealed--; st.open = 9; moved(st); return { broke: true }; }
    return null;
  }
  /* un-seal: a sealed ten slides back and pours its ten into the spout — when the open tray is empty,
     or as the "ten less" step */
  function unseal(st) {
    if (st.done || st.level !== 'day' || st.sealed < 1) return false;
    var s = step(st);
    if (!(st.open === 0 || st.explore || (s && s.kind === 'less'))) return false;
    st.sealed--; moved(st); return true;
  }
  function clear(st) { if (st.done) return false; st.poured = 0; st.sealed = 0; st.open = 0; moved(st); return true; }
  /* put the build back to the number of the day (the start of the ten-less / one-more steps) */
  function rewind(st) { st.sealed = Math.floor(st.n / 10); st.open = st.n % 10; }

  /* the dotted shape of the target: teen = top cells (10) + bottom cells (n − 10); day = sealed
     bar outlines + open-tray cells */
  function shape(st) {
    var s = step(st); if (!s) return null;
    var t = s.target;
    return st.level === 'teen' ? { top: Math.min(t, 10), bottom: Math.max(0, t - 10) } : { sealed: Math.floor(t / 10), open: t % 10 };
  }
  function check(st) {
    if (st.done || st.explore) return null;
    var s = step(st), tot = total(st), res;
    if (tot === 0 && s.kind === 'build') { res = { result: 'empty' }; st.last = res; return res; }
    if (tot === s.target) {
      res = { result: 'ok', kind: s.kind, target: s.target, tens: Math.floor(s.target / 10), ones: s.target % 10, broke: false };
      st.faces[s.kind] = s.target;
      st.misses = 0; st.help = 0;
      st.step++;
      if (st.step >= st.steps.length) { st.done = true; res.complete = true; }
      else if (st.steps[st.step].kind !== 'more') rewind(st);
      st.last = res;
      return res;
    }
    st.misses++; st.help = Math.min(2, st.misses);
    res = { result: tot < s.target ? 'few' : 'many', target: s.target, have: tot, miss: true };
    st.last = res;
    return res;
  }
  /* the help: the dotted shape (after a miss, or always), numbered along the pour order at miss 2 */
  function dotted(st, always) { return !st.done && !st.explore && (always || st.help >= 1) ? shape(st) : null; }
  function numbered(st) { return !st.done && st.help >= 2; }
  function hint(st) {
    if (st.explore || st.done || !st.last) return null;
    var L = st.last;
    if (L.result === 'empty') return { key: 'hintPour', n: step(st).target };
    if (L.result === 'ok') return null;
    var t = L.target, s = step(st);
    /* one less from a round ten: the open tray is empty — a tap on it opens a full ten */
    if (s && s.kind === 'oneLess' && st.open === 0 && st.sealed > 0) return { key: 'hintBreak', wrong: true };
    if (st.help >= 2) return { key: shapeKey(st.level, t), n: t, tens: Math.floor(t / 10), ones: t % 10, wrong: true };
    return { key: L.result === 'few' ? 'hintFew' : 'hintMany', wrong: true };
  }
  /* the miss-2 sentence names the target's shape — never a 0 */
  function shapeKey(lv, t) {
    var tens = Math.floor(t / 10), ones = t % 10;
    if (lv === 'teen') return 'hintShape';
    if (tens === 0) return 'hintShapeSmall';
    if (tens === 1) return 'hintShapeTen';
    return ones ? 'hintShapeDay' : 'hintShapeDayNone';
  }
  /* the sentence after each proved step */
  function success(st) {
    var L = st.last; if (!L || L.result !== 'ok') return null;
    var a = { n: L.target, m: L.target, tens: L.tens, ones: L.ones };
    if (L.kind === 'build') return { key: L.tens === 1 ? 'okTeen' : L.ones ? 'okTens' : 'okTensNone', args: a };
    if (L.kind === 'more') return { key: L.ones ? 'okMore' : 'okMoreNone', args: a };
    if (L.kind === 'less') return { key: 'okLess', args: a };
    if (L.kind === 'oneMore') return { key: L.ones === 0 ? 'okOneMoreTen' : 'okOneMore', args: a };
    return { key: (L.ones === 9 ? 'okOneLessBroke' : 'okOneLess'), args: a };
  }
  /* the next step's line */
  function stepKey(st) {
    var s = step(st); if (!s) return null;
    return { build: 'promptMake', more: 'stepMore', less: 'stepLess', oneMore: 'stepOneMore', oneLess: 'stepOneLess' }[s.kind];
  }
  /* the day card: faces fill only after a Check proves them (in free play they follow the build) */
  function card(st, words) {
    var n = st.explore ? (total(st) || null) : st.faces.build;
    if (n == null) return { n: null };
    var c = { n: n, tens: Math.floor(n / 10), ones: n % 10, word: words ? words(n) : null, tally: n >= 1 && n <= 20 ? n : null };
    if (st.explore) { c.more = n + 10 <= MAX ? n + 10 : null; c.less = n - 10 >= 1 ? n - 10 : null; }
    else { c.more = st.faces.more != null ? st.faces.more : null; c.less = st.faces.less != null ? st.faces.less : null; c.oneMore = st.faces.oneMore; c.oneLess = st.faces.oneLess; }
    return c;
  }
  /* the split numeral on success: tens digit onto the full top tray, ones digit onto the bottom */
  function split(n) { return { tens: String(Math.floor(n / 10)), ones: String(n % 10) }; }
  /* the readout is hidden during a task (it would do the task) */
  function readoutVisible(st) { return !!st.explore; }

  /* layout: cells 56 (wide) / 54 (phones) / 48 (≤ 320) */
  function layout(W) {
    var L = { mode: W >= 640 ? 'wide' : 'narrow' };
    /* five cells and their gaps fit the stage: 56 (wide), up to 54 on phones (the spout sits above the trays there) */
    var wide = L.mode === 'wide';
    L.cell = wide ? 56 : Math.min(54, Math.floor((W - 4 * 6 - 12 - 4) / 5));
    L.gap = 6;
    L.tray = 5 * L.cell + 4 * L.gap + 12;
    L.side = wide ? 196 : 0;
    L.counter = Math.round(L.cell * 0.82);
    return L;
  }

  var api = {
    TEENS: TEENS, DAYS: DAYS, MAX: MAX, POUR_MS: POUR_MS,
    level: level, rounds: rounds, order: order, newState: newState, newPlay: newPlay, total: total, top: top, bottom: bottom,
    step: step, pour: pour, addTen: addTen, takeBack: takeBack, unseal: unseal, clear: clear, rewind: rewind, shape: shape,
    check: check, shapeKey: shapeKey, dotted: dotted, numbered: numbered, hint: hint, success: success, stepKey: stepKey, card: card, split: split,
    readoutVisible: readoutVisible, layout: layout
  };
  global.OverflowTraysCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
