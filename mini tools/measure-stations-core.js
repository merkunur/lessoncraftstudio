/* =====================================================================
   measure-stations-core.js — the model of THE MEASURING STATIONS
   (activity #32 of the one-by-one rebuild, "Describe Measurable
   Attributes", K.MD.A.1). Design sheet: docs/activities-rebuild/designs/032-choice-board.md
   ---------------------------------------------------------------------
   Long, tall and heavy are three different ways to measure, so the child
   answers by choosing a measuring station: lay the picture on the TRACK
   (how long, end to end lying down), stand it at the POST (how tall, in its
   natural pose) or hang it on the SPRING (how heavy). A wrong station still
   measures, honestly, the wrong thing. "Two questions": one object measured
   two ways, a card with two badges. Size mode: a square SIZE WINDOW proves
   big (pokes out) and small (fits inside). Pure model, no DOM.
   Node-loadable (verify-measure-stations-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* per-noun poses, measured from each picture's ink (alpha > 40) in a 256-px contained picture:
     [rotation deg (CSS clockwise), x0, y0, x1, y1] relative to the picture's centre after rotation.
     rest = its natural pose (the post), lie = its long axis horizontal (the track).
     wt / len / hgt = the authored classes (the spring, the badges). */
  var OBJ = {
    pencil:     { dir: 'classroom', rest: [44.7, -170, -28, 148, 32], lie: [44.7, -170, -28, 148, 32], wt: 'light', len: 'long' },
    ruler:      { dir: 'classroom', rest: [44.4, -148, -30, 149, 31], lie: [44.4, -148, -30, 149, 31], wt: 'light', len: 'long' },
    carrot:     { dir: 'vegetables', rest: [48.2, -166, -38, 144, 49], lie: [48.2, -166, -38, 144, 49], wt: 'light', len: 'long' },
    cucumber:   { dir: 'vegetables', rest: [32.2, -138, -26, 145, 48], lie: [32.2, -138, -26, 145, 48], wt: 'light', len: 'long' },
    baguette:   { dir: 'bakery', rest: [-16.7, -126, -26, 129, 29], lie: [-16.7, -126, -26, 129, 29], wt: 'light', len: 'long' },
    train:      { dir: 'toys', rest: [0, -122, -87, 122, 94], lie: [0, -122, -87, 122, 94], wt: 'heavy', len: 'long' }, /* a child knows trains are heavy (review) */
    giraffe:    { dir: 'zoo animals', rest: [0, -69, -122, 63, 126], lie: [-78.7, -125, -74, 130, 63], wt: 'heavy', hgt: 'tall' },
    sunflower:  { dir: 'flowers', rest: [0, -88, -120, 85, 124], lie: [-92.4, -119, -84, 125, 89], wt: 'light', hgt: 'tall' },
    lighthouse: { dir: 'beach', rest: [0, -52, -120, 46, 124], lie: [-90, -120, -46, 124, 52], wt: 'heavy', hgt: 'tall' },
    ladder:     { dir: 'tools', rest: [0, -48, -122, 46, 126], lie: [81.3, -123, -31, 128, 31], hgt: 'tall' },
    rocket:     { dir: 'space', rest: [-38.1, -65, -146, 70, 148], lie: [51.9, -146, -65, 148, 70], hgt: 'tall' },
    bottle:     { dir: 'kitchen tools', rest: [0, -49, -122, 52, 123], lie: [-90.1, -122, -52, 123, 50], hgt: 'tall' },
    kite:       { dir: 'toys', rest: [0, -68, -122, 66, 125], lie: [-94.6, -122, -61, 125, 73], wt: 'light', hgt: 'tall' },
    rock:       { dir: 'camping', rest: [0, -122, -103, 122, 105], lie: [0, -122, -103, 122, 105], wt: 'heavy', hgt: 'short' },
    pumpkin:    { dir: 'vegetables', rest: [0, -122, -107, 122, 112], lie: [0, -122, -107, 122, 112], wt: 'heavy' },
    cabbage:    { dir: 'vegetables', rest: [0, -121, -115, 121, 119], lie: [0, -121, -115, 121, 119], wt: 'heavy' },
    toolbox:    { dir: 'around the house', rest: [0, -121, -104, 122, 110], lie: [0, -121, -104, 122, 110], wt: 'heavy', hgt: 'short' },
    ball:       { dir: 'toys', rest: [0, -122, -122, 120, 125] },
    apple:      { dir: 'fruits', rest: [0, -102, -121, 102, 123] },
    pig:        { dir: 'farm animals', rest: [0, -115, -121, 116, 123] },
    cupcake:    { dir: 'bakery', rest: [0, -102, -122, 100, 123] }
  };
  var SHAPES = ['circle', 'square', 'triangle', 'star', 'hexagon'];
  var STATION = { long: 'track', tall: 'post', heavy: 'spring' };
  var ATTR = { track: 'long', post: 'tall', spring: 'heavy' };
  var BAYS = ['track', 'post', 'spring'];
  var SMALL = 0.56, WINDOW = 0.80, IDLE_MS = 20000;

  /* the design's tables (§6) */
  var ONE = [['pencil', 'long'], ['giraffe', 'tall'], ['rock', 'heavy'], ['carrot', 'long'], ['lighthouse', 'tall'], ['pumpkin', 'heavy'], ['train', 'long'], ['sunflower', 'tall'], ['cabbage', 'heavy']];
  /* the review replaced the design's kite ("tall" reads as "flies high" in ten languages) with the sunflower, and its toy
     train ("light" contradicts what a child knows of trains) with the ruler */
  var TWO = [['carrot', 'long', 'heavy'], ['giraffe', 'tall', 'heavy'], ['sunflower', 'heavy', 'tall'], ['pencil', 'heavy', 'long'], ['lighthouse', 'tall', 'heavy'],
    ['ruler', 'long', 'heavy'], ['rock', 'heavy', 'tall'], ['baguette', 'long', 'heavy'], ['toolbox', 'heavy', 'tall']];
  /* two pictures: [item, big side] */
  var PAIRS = [['ball', 'R'], ['apple', 'L'], ['pig', 'R'], ['cupcake', 'L'], ['circle', 'R'], ['kite', 'R'], ['star', 'L'], ['pumpkin', 'L'], ['square', 'R']];
  /* a whole row: B = big, s = small, reading order */
  var ROWS = [['ball', 'sBsBs'], ['apple', 'BssBBs'], ['triangle', 'ssBsB'], ['pig', 'BsBssB'], ['star', 'sBBss'], ['cupcake', 'sBssBB'], ['hexagon', 'BssBs'], ['kite', 'ssBBsB'], ['circle', 'BBssBs']];
  /* the free-play tray: every station noun */
  var PLAY = ['pencil', 'ruler', 'carrot', 'cucumber', 'baguette', 'train', 'giraffe', 'sunflower', 'lighthouse', 'ladder', 'rocket', 'bottle', 'kite', 'rock', 'pumpkin', 'cabbage', 'toolbox'];

  function measure(name) { return name === 'size' ? 'size' : 'stations'; }
  function harder(name) { return name === 'two' ? 'two' : 'one'; }
  function isShape(item) { return SHAPES.indexOf(item) >= 0; }
  function rounds(m, h) {
    m = measure(m); h = harder(h);
    if (m === 'stations' && h === 'one') return ONE.map(function (r, i) { return { mode: 'stations', two: false, index: i, noun: r[0], qs: [r[1]], id: 'one.' + r[0] }; });
    if (m === 'stations') return TWO.map(function (r, i) { return { mode: 'stations', two: true, index: i, noun: r[0], qs: [r[1], r[2]], id: 'two.' + r[0] }; });
    if (h === 'one') return PAIRS.map(function (r, i) { return { mode: 'size', two: false, index: i, item: r[0], row: r[1] === 'L' ? 'Bs' : 'sB', id: 'pair.' + r[0] }; });
    return ROWS.map(function (r, i) { return { mode: 'size', two: true, index: i, item: r[0], row: r[1], id: 'row.' + r[0] }; });
  }

  /* ---------------- the order: never the same twice, never the same seam; no station answers 3 rounds in a row ---------------- */
  function runOk(pool, a) {
    if (pool[0].mode !== 'stations') return true;
    for (var i = 2; i < a.length; i++) { var x = pool[a[i]].qs[0]; if (x === pool[a[i - 1]].qs[0] && x === pool[a[i - 2]].qs[0]) return false; }
    return true;
  }
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length, base = pool.map(function (r, i) { return i; });
    if (n < 2) return base;
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    for (var tries = 0; tries < 400; tries++) {
      var a = base.slice();
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      if (a[0] === lastPrev) continue;
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      if (!runOk(pool, a)) continue;
      return a;
    }
    return base.slice(1).concat(base[0]);
  }

  /* ---------------- state ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var st = { id: r.id, mode: r.mode, two: r.two, noun: r.noun || null, item: r.item || null, qs: r.qs ? r.qs.slice() : null, step: 0,
      placed: null, misses: 0, help: 0, last: null, done: false, explore: false, rings: [], answers: [] };
    if (r.mode === 'size') { var row = opts.mirror ? r.row.split('').reverse().join('') : r.row; st.row = row.split('').map(function (c) { return c === 'B'; }); }
    return st;
  }
  function newPlay(noun) { return { id: 'play', mode: 'stations', two: false, noun: noun || 'giraffe', qs: null, step: 0, placed: null, misses: 0, help: 0, last: null, done: false, explore: true, rings: [], answers: [] }; }
  function question(st) { return st.qs ? st.qs[st.step] : null; }
  function moved(st) { st.help = 0; st.last = null; }

  /* what a station shows for this object (scale k px per ink unit): the track = its length lying down,
     the post = its height in its natural pose, the spring = its weight class */
  function shown(noun, bay, k) {
    var o = OBJ[noun]; if (!o) return null;
    if (bay === 'track') return { attr: 'long', bar: (o.lie[3] - o.lie[1]) * k, rot: o.lie[0] };
    if (bay === 'post') return { attr: 'tall', bar: (o.rest[4] - o.rest[2]) * k, rot: o.rest[0] };
    return { attr: 'heavy', heavy: o.wt === 'heavy' };
  }
  function stretch(noun, narrow) { var h = OBJ[noun] && OBJ[noun].wt === 'heavy'; return narrow ? (h ? 38 : 9) : (h ? 62 : 14); }
  /* the feminine nouns per Romance locale (image-vocabulary genders, via mini tools/pictures/*.json) */
  var FEM = {
    fr: ['ruler', 'carrot', 'baguette', 'giraffe', 'ladder', 'rocket', 'bottle', 'pumpkin', 'toolbox'],
    es: ['ruler', 'carrot', 'giraffe', 'ladder', 'bottle', 'rock', 'pumpkin', 'cabbage', 'toolbox'],
    it: ['pencil', 'carrot', 'baguette', 'giraffe', 'ladder', 'bottle', 'rock', 'pumpkin', 'toolbox'],
    pt: ['ruler', 'carrot', 'baguette', 'giraffe', 'ladder', 'bottle', 'kite', 'rock', 'pumpkin', 'toolbox']
  };
  /* the badge for one attribute of one object (authored classes); in fr/es/it/pt it agrees with the noun (key + 'F') */
  function badge(noun, attr, lang) {
    var o = OBJ[noun], k;
    if (attr === 'heavy') k = o.wt === 'heavy' ? 'badgeHeavy' : 'badgeLight';
    else if (attr === 'long') k = o.len === 'long' ? 'badgeLong' : 'badgeShortLength';
    else k = o.hgt === 'tall' ? 'badgeTall' : 'badgeShortHeight';
    var l = String(lang || 'en').slice(0, 2);
    return FEM[l] && FEM[l].indexOf(noun) >= 0 ? k + 'F' : k;
  }
  /* drop the object on a station: it always measures; it answers when its attribute is the question's */
  function drop(st, bay) {
    if (st.done || BAYS.indexOf(bay) < 0) return null;
    st.placed = bay;
    if (st.explore) { st.last = { result: 'play', bay: bay }; return st.last; }
    var q = question(st);
    if (ATTR[bay] === q) {
      st.answers.push(q);
      st.misses = 0; st.help = 0;
      var res = { result: 'ok', bay: bay, attr: q, step: st.step };
      if (st.two && st.step === 0) st.step = 1; else { st.done = true; res.complete = true; }
      st.last = res; return res;
    }
    st.misses++; st.help = Math.min(2, st.misses);
    st.last = { result: 'wrong', bay: bay, attr: ATTR[bay], want: q, miss: true };
    return st.last;
  }
  /* the station that answers (miss 2 glows it) */
  function glow(st) { return !st.done && !st.explore && st.mode === 'stations' && st.help >= 2 ? STATION[question(st)] : null; }

  /* ---------------- size mode ---------------- */
  function ring(st, i) {
    if (st.done || st.mode !== 'size' || i < 0 || i >= st.row.length) return false;
    var at = st.rings.indexOf(i);
    if (!st.two) st.rings = at >= 0 ? [] : [i];
    else if (at >= 0) st.rings.splice(at, 1); else st.rings.push(i);
    moved(st); return true;
  }
  function sizeCheck(st) {
    if (st.done || st.mode !== 'size') return null;
    if (!st.rings.length) { st.last = { result: 'empty' }; return st.last; }
    var wrongSmall = [], missedBig = [];
    st.row.forEach(function (big, i) { var r = st.rings.indexOf(i) >= 0; if (r && !big) wrongSmall.push(i); if (!r && big) missedBig.push(i); });
    if (!wrongSmall.length && !missedBig.length) { st.done = true; st.help = 0; st.last = { result: 'ok', n: bigCount(st) }; return st.last; }
    st.misses++; st.help = Math.min(2, st.misses);
    st.last = { result: 'miss', wrongSmall: wrongSmall, missedBig: missedBig, first: wrongSmall.concat(missedBig).sort(function (a, b) { return a - b; })[0], miss: true };
    return st.last;
  }
  function bigCount(st) { return st.row.filter(Boolean).length; }
  /* the window: 0.80 of the big picture's ink side — a big one pokes out, a small one (0.56) fits with room */
  function windowSide(bigSide) { return WINDOW * bigSide; }
  function fit(bigSide, big) {
    var w = windowSide(bigSide), s = big ? bigSide : SMALL * bigSide;
    return { window: w, side: s, poke: Math.max(0, (s - w) / 2), margin: Math.max(0, (w - s) / 2) };
  }
  /* the ink side of an item (pictures: their measured ink box; shapes: the drawn box) */
  function inkSide(item) { var o = OBJ[item]; return o ? Math.max(o.rest[3] - o.rest[1], o.rest[4] - o.rest[2]) : 256; }

  /* ---------------- the words ---------------- */
  var WRONG = { track: { tall: 'hintTrackTall', heavy: 'hintTrackHeavy' }, post: { long: 'hintPostLong', heavy: 'hintPostHeavy' }, spring: { long: 'hintSpringLong', tall: 'hintSpringTall' } };
  function hint(st) {
    if (st.explore || st.done || !st.last) return null;
    var L = st.last;
    if (L.result === 'idle') return { key: 'hintIdle' };
    if (L.result === 'empty') return { key: 'hintTapFirst' };
    if (L.result === 'ok') return null;
    if (st.mode === 'size') return { key: st.help >= 2 ? 'hintLook' : 'hintWindow', wrong: true };
    if (st.help >= 2) return { key: 'hintTrySign', wrong: true };
    return { key: WRONG[L.bay][L.want], wrong: true };
  }
  function success(st) {
    var L = st.last; if (!L || (L.result !== 'ok')) return null;
    if (st.mode === 'size') return { key: st.two ? 'okBigAll' : 'okBigOne', args: { n: L.n } };
    if (st.two && L.complete) return { key: 'okTwoWays', attrs: st.answers.slice() };
    return { key: { long: 'okLong', tall: 'okTall', heavy: 'okHeavy' }[L.attr], args: {} };
  }
  var PROMPT = { long: 'promptLong', tall: 'promptTall', heavy: 'promptHeavy' };

  /* ---------------- layout ---------------- */
  function layout(W) {
    var wide = W >= 560;
    var L = { mode: wide ? 'wide' : 'narrow', gap: wide ? 12 : 8 };
    L.bayW = Math.floor((W - 2 * L.gap) / 3);
    L.bayH = wide ? 250 : Math.round(Math.max(150, Math.min(170, L.bayW * 1.55)));
    L.obj = wide ? 160 : 112;     /* the object on its plinth */
    L.card = wide ? 110 : 76;     /* the question card */
    L.rail = L.bayW - (wide ? 20 : 10);
    L.postH = L.bayH - (wide ? 56 : 40);
    L.pan = wide ? 104 : 64;
    return L;
  }
  /* the one scale per object per bay size: it lies on the track and stands at the post at the same scale */
  function scaleFor(noun, L) {
    var o = OBJ[noun];
    return Math.min(L.rail / (o.lie[3] - o.lie[1]), (L.bayH * 0.42) / (o.lie[4] - o.lie[2]), L.postH / (o.rest[4] - o.rest[2]), (L.bayW - 34) / (o.rest[3] - o.rest[1]));
  }

  var api = {
    OBJ: OBJ, FEM: FEM, SHAPES: SHAPES, STATION: STATION, ATTR: ATTR, BAYS: BAYS, SMALL: SMALL, WINDOW: WINDOW, IDLE_MS: IDLE_MS, ONE: ONE, TWO: TWO, PAIRS: PAIRS, ROWS: ROWS, PLAY: PLAY, PROMPT: PROMPT,
    measure: measure, harder: harder, isShape: isShape, rounds: rounds, order: order, newState: newState, newPlay: newPlay, question: question,
    shown: shown, stretch: stretch, badge: badge, drop: drop, glow: glow, ring: ring, sizeCheck: sizeCheck, bigCount: bigCount, windowSide: windowSide, fit: fit, inkSide: inkSide,
    hint: hint, success: success, layout: layout, scaleFor: scaleFor
  };
  global.MeasureStationsCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
