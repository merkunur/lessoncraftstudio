/* =====================================================================
   lacing-board-core.js — the model of ACTIVITY #47 of the one-by-one
   rebuild: "Bygg ordet av stavelser" (no) → SNØREBRETTET, the lacing
   board (RF.K.2.B; bokmål only — every language's syllable activity is
   its own row). Design sheet: docs/activities-rebuild/designs/047-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a lacing card whose holes are scattered syllable
   buttons. The child threads the lace through them in the order the word
   is said, then pulls it tight (Stram! = Check): the right beginning
   stays on the lace, and from the first wrong button on the lace slips
   out. Three levels: thread the word · one button does not belong (a
   decoy) · how many holes (blank buttons, one per syllable heard).

   Every word is in approved-words-no.json with the shown split (the gate
   re-reads it) and its picture's no label is the word itself.
   Picture check 2026-10-20: fruits/blueberry is one big dark ball (read
   as a plum or a ball) → blåbær out, traktor (the design's spare) in.
   Never shown: tannbørste, hanske (disputed seams, design §6). The gate
   caught sommerfugl's decoy "ke": mer + ke = merke → "tor". Review
   2026-10-20: bjørn out (the bear reads as a teddy, "bamse" = 2 claps),
   engel out (said eng-el: the "gel" button shows a g nobody hears),
   gorilla out (often "ape") → gris, banan, kenguru; trick buttons that
   made a word (vann+fugl, sommer+sol) or a meaning trap (pingvin + fugl:
   a penguin IS a bird) swapped. No DOM.
   UMD: window.LacingBoardCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LacingBoardCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  'klokke|around the house/clock|klok-ke;banan|fruits/banana|ba-nan;kjole|clothing/dress|kjo-le;kanin|animals/rabbit|ka-nin;panda|animals/panda|pan-da;tiger|animals/tiger|ti-ger;delfin|animals/dolphin|del-fin;snømann|winter/snowman|snø-mann;traktor|vehicles/tractor|trak-tor;solsikke|flowers/sunflower|sol-sik-ke;sommerfugl|easter/butterfly|som-mer-fugl;pingvin|animals/penguin|ping-vin;flaggermus|animals/bat|flag-ger-mus;sjøstjerne|beach/starfish|sjø-stjer-ne;paraply|weather/umbrella|pa-ra-ply;vannmelon|fruits/watermelon|vann-me-lon;helikopter|vehicles/helicopter|he-li-kop-ter;sjokolade|easter/chocolate|sjo-ko-la-de;gresskar|vegetables/pumpkin|gress-kar;jordbær|fruits/strawberry|jord-bær;gris|animals/pig|gris;skjorte|clothing/shirt|skjor-te;bokhylle|furniture/bookcase|bok-hyl-le;hund|animals/dog|hund;sykkel|vehicles/bicycle|syk-kel;edderkopp|forest creatures/spider|ed-der-kopp;alligator|reptiles and Amphibians/alligator|al-li-ga-tor;fyrtårn|beach/lighthouse|fyr-tårn;kenguru|zoo animals/kangaroo|ken-gu-ru;motorsykkel|vehicles/motorcycle|mo-tor-syk-kel'
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  var THREAD = ['klokke', 'banan', 'kjole', 'kanin', 'panda', 'tiger', 'delfin', 'snømann', 'traktor', 'solsikke'];
  /* word, decoy 1, decoy 2 — each a syllable of another pool word */
  var DECOY = [['sommerfugl', 'tor', 'ply'], ['pingvin', 'lon', 'ra'], ['flaggermus', 'sol', 'ke'], ['sjøstjerne', 'mer', 'lon'], ['paraply', 'mus', 'kel'],
    ['vannmelon', 'ger', 'kop'], ['helikopter', 'ra', 'sol'], ['sjokolade', 'lon', 'mus'], ['gresskar', 'ply', 'ti'], ['jordbær', 'kop', 'ger']];
  var COUNT = ['gris', 'skjorte', 'bokhylle', 'hund', 'sykkel', 'edderkopp', 'alligator', 'fyrtårn', 'kenguru', 'motorsykkel'];

  var LEVEL_KEYS = ['thread', 'decoy', 'count'], CELLS = 9, BLANKS = 6, KNOT = { x: 0, y: 0.5 };
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'thread'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('lacing-board: no word ' + k); return w; }

  function rounds(lv) {
    lv = level(lv);
    if (lv === 'thread') return THREAD.map(function (k, i) { return { id: 'thread-' + k, level: lv, i: i, w: word(k), decoys: [] }; });
    if (lv === 'decoy') return DECOY.map(function (d, i) { return { id: 'decoy-' + d[0], level: lv, i: i, w: word(d[0]), decoys: [d[1], d[2]] }; });
    return COUNT.map(function (k, i) { return { id: 'count-' + k, level: lv, i: i, w: word(k), decoys: [] }; });
  }

  /* ---- where the buttons lie ---- */
  /* a cell's centre in board units (0..1 × 0..1); scatter = a 3 × 3 grid, row = slots along one or two rows */
  function centre(b, row, k) {
    if (row) { var cols = k > 4 ? Math.ceil(k / 2) : k, rr = Math.floor(b.cell / cols), rows = Math.ceil(k / cols); return { x: (b.cell % cols + 0.5) / cols, y: rows === 1 ? 0.5 : 0.3 + rr * 0.4 }; }
    return { x: (b.cell % 3 + 0.5 + b.jx * 0.12) / 3, y: (Math.floor(b.cell / 3) + 0.5 + b.jy * 0.12) / 3 };
  }
  /* the word's buttons in reading order (row by row, left to right) */
  function readingOrder(st) { return st.buttons.filter(function (b) { return b.s !== null && b.s >= 0; }).slice().sort(function (a, b) { return a.cell - b.cell; }).map(function (b) { return b.s; }); }
  /* thread the nearest word button next, starting at the knot */
  function greedyOrder(st) {
    var left = st.buttons.filter(function (b) { return b.s !== null && b.s >= 0; }), at = KNOT, out = [], k = st.buttons.length;
    while (left.length) {
      var best = 0, bd = Infinity;
      left.forEach(function (b, i) { var c = centre(b, st.row, k), d = Math.hypot(c.x - at.x, (c.y - at.y) * 0.75); if (d < bd) { bd = d; best = i; } });
      at = centre(left[best], st.row, k); out.push(left[best].s); left.splice(best, 1);
    }
    return out;
  }
  function inOrder(o) { for (var i = 0; i < o.length; i++) if (o[i] !== i) return false; return true; }
  function reversed(o) { for (var i = 0; i < o.length; i++) if (o[i] !== o.length - 1 - i) return false; return true; }
  /* a fresh place for every button; three or more syllables never lie in reading order nor reversed,
     and the nearest-next path from the knot never spells the word (two syllables: chance, no tell either way) */
  function place(st, rnd) {
    var k = st.buttons.length, n = st.r.w.syl.length, t, i;
    for (t = 0; t < 400; t++) {
      var cells = [];
      for (i = 0; i < (st.row ? k : CELLS); i++) cells.push(i);
      for (i = cells.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = cells[i]; cells[i] = cells[j]; cells[j] = x; }
      st.buttons.forEach(function (b, q) { b.cell = cells[q]; b.jx = st.row ? 0 : rnd() * 2 - 1; b.jy = st.row ? 0 : rnd() * 2 - 1; b.rot = st.row ? 0 : rnd() * 2 - 1; });
      if (st.r.level === 'count' || n < 3) return st;
      var ro = readingOrder(st), go = greedyOrder(st);
      if (!inOrder(ro) && !reversed(ro) && !inOrder(go)) return st;
    }
    return st;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random, n = r.w.syl.length;
    var st = { r: r, pass: pass || 0, path: [], misses: 0, help: 0, show: false, last: null, done: false, row: r.level !== 'count' && opts.row === true };
    var list = [];
    if (r.level === 'count') for (var i = 0; i < BLANKS; i++) list.push({ s: null, text: '' });
    else {
      r.w.syl.forEach(function (s, q) { list.push({ s: q, text: s }); });
      var d = r.level === 'decoy' ? Math.max(0, Math.min(2, opts.decoys === undefined ? 1 : opts.decoys)) : 0;
      for (var q = 0; q < d; q++) list.push({ s: -1, text: r.decoys[q] });
    }
    st.buttons = list.map(function (b, q) { return { id: 'b' + q, s: b.s, text: b.text, cell: 0, jx: 0, jy: 0, rot: 0 }; });
    void n;
    return place(st, rnd);
  }
  function button(st, id) { for (var i = 0; i < st.buttons.length; i++) if (st.buttons[i].id === id) return st.buttons[i]; return null; }
  function moved(st) { st.show = false; st.last = null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- the hand ---- */
  function thread(st, id) { if (st.done || !button(st, id) || st.path.indexOf(id) >= 0) return false; st.path.push(id); moved(st); return true; }
  /* only the LAST threaded button comes off — like real lacing */
  function unthreadLast(st) { if (st.done || !st.path.length) return false; st.path.pop(); moved(st); return true; }

  /* what Stram! prints on k blank buttons: too few → the last carries the rest; too many → the extras stay blank */
  function engrave(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }

  /* ---- Stram! (Check) ---- */
  function tighten(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { right: true };
    if (!st.path.length) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
    if (r.level === 'count') {
      var k = st.path.length;
      if (k === n) return win(st);
      miss(st, { result: k < n ? 'short' : 'long', printed: engrave(r.w.syl, k), blank: Math.max(0, k - n) });
      return { right: false, kase: st.last.result };
    }
    /* the lace holds the longest right beginning; from the first wrong button on it slips out */
    var prefix = 0;
    while (prefix < st.path.length && button(st, st.path[prefix]).s === prefix) prefix++;
    if (prefix === st.path.length) {
      if (prefix === n) return win(st);
      st.show = true; st.last = { result: 'more', prefix: prefix }; return { right: false, kase: 'more' };
    }
    var popped = st.path.slice(prefix), decoys = popped.filter(function (id) { return button(st, id).s === -1; }).length;
    st.path = st.path.slice(0, prefix);
    var nx = st.buttons.filter(function (b) { return b.s === prefix; })[0], next = nx ? nx.id : null;
    miss(st, { result: decoys ? 'decoy' : 'order', prefix: prefix, popped: popped, decoys: decoys, next: next });
    return { right: false, kase: st.last.result };
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'right' }; return { right: true }; }

  /* miss 2 (thread / decoy): only the NEXT right button glows — never the whole order */
  function glow(st) { return !st.done && st.show && st.help >= 2 && st.last && st.last.next ? st.last.next : null; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (R === 'empty') return L === 'count' ? 'hintCount' : 'hintThread';
    if (R === 'more') return 'hintMore';
    if (L === 'count') return st.help >= 2 ? 'hintClap' : R === 'short' ? 'hintShort' : st.last.blank > 1 ? 'hintLong2' : 'hintLong';
    if (R === 'decoy') return st.last.decoys > 1 ? 'hintDecoy2' : 'hintDecoy';
    if (st.help >= 2) return 'hintNext';
    return st.last.prefix > 0 ? 'hintHolds' : 'hintFirst';
  }

  /* order-only reshuffle; never the previous order */
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* the board in px: the knot's margin on the left, the rail along the bottom, buttons as big as the cells allow */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 160 : 96;
    L.boardW = wide ? Math.min(470, W - L.pic - 28) : Math.max(240, W - 4);
    L.boardH = Math.round(L.boardW * (wide ? 0.7 : 0.8));
    L.padL = wide ? 40 : 30; L.padR = 8; L.padT = 8; L.rail = wide ? 30 : 26;
    L.cellW = (L.boardW - L.padL - L.padR) / 3; L.cellH = (L.boardH - L.padT - L.rail) / 3;
    L.btn = Math.max(44, Math.min(wide ? 80 : 64, Math.floor(Math.min(L.cellW, L.cellH) - 8)));
    L.slack = Math.max(0, Math.min(14, Math.floor((L.cellW - L.btn) / 2), Math.floor((L.cellH - L.btn) / 2)));
    L.lace = wide ? 8 : 6; L.syl = wide ? 26 : 21;
    return L;
  }

  return {
    WORDS: WORDS, THREAD: THREAD, DECOY: DECOY, COUNT: COUNT, LEVEL_KEYS: LEVEL_KEYS, BLANKS: BLANKS, KNOT: KNOT,
    level: level, word: word, rounds: rounds, centre: centre, readingOrder: readingOrder, greedyOrder: greedyOrder, place: place,
    newState: newState, button: button, thread: thread, unthreadLast: unthreadLast, engrave: engrave, tighten: tighten,
    glow: glow, hint: hint, order: order, layout: layout
  };
}));
