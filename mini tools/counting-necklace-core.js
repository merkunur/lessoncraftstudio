/* =====================================================================
   counting-necklace-core.js — the MODEL of "The Necklace That Won't Hold
   Still" (K.CC.B.4), activity #9 of the one-by-one rebuild
   (docs/activities-rebuild/009-counting-necklace.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-counting-necklace-core.js
   drives it; scripts/mutate-counting-necklace.js proves the gate bites).

   THE SKILL. K.CC.B.4: (a) say the number names pairing each object with
   one name; (b) the last number said tells how many, and it stays the same
   however the objects are arranged; (c) each next number is one more.
   The apparatus is THE COUNTING NECKLACE: a round necklace with a clasp at
   the top. A tap slides the NEXT bead along the cord to the clasp side —
   beads cannot pass each other on a string, so one-to-one is built in.
   When every bead is across, the child answers how many (b, cardinality);
   then the necklace changes — the beads glide apart, squeeze together, or
   one more bead comes on — and the child answers again (b, conservation;
   c, one more). Count again is always allowed. This core owns the pools,
   the bead angles (start arrangements, the counted pack, the twists), the
   answer cards and their order, the slip notes and the layout.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- the necklace geometry, in a 400 × 400 view box ---- */
  var VB = 400, CX = 200, CY = 200, R = 160, BEAD = 24;
  var STEP = 18.5;                 /* degrees between two touching beads (2·asin(24/160) = 17.25, plus a hair) */
  var PACK0 = 23.25;               /* the first counted bead sits just clockwise of the clasp (clasp at 0°) */
  var MAXB = 11;                   /* ten beads + one more */
  var START = 72;                  /* uncounted beads lie clear of the clasp, so the counted side starts empty */

  /* rounds: n beads, how they lie at the start, what the necklace does after the count */
  var POOLS = {
    to10: [
      { n: 5,  start: 'clumps', twist: 'spread' },
      { n: 6,  start: 'spread', twist: 'bunch' },
      { n: 7,  start: 'bunch',  twist: 'oneMore' },
      { n: 8,  start: 'clumps', twist: 'spread' },
      { n: 9,  start: 'spread', twist: 'bunch' },
      { n: 4,  start: 'spread', twist: 'oneMore' },
      { n: 10, start: 'clumps', twist: 'bunch' },
      { n: 6,  start: 'bunch',  twist: 'spread' },
      { n: 8,  start: 'spread', twist: 'oneMore' },
      { n: 7,  start: 'clumps', twist: 'bunch' }
    ],
    to5: [
      { n: 3, start: 'spread', twist: 'spread' },
      { n: 3, start: 'clumps', twist: 'bunch' },
      { n: 4, start: 'bunch',  twist: 'oneMore' },
      { n: 4, start: 'spread', twist: 'spread' },
      { n: 5, start: 'clumps', twist: 'bunch' },
      { n: 5, start: 'spread', twist: 'oneMore' },
      { n: 4, start: 'clumps', twist: 'bunch' },
      { n: 3, start: 'bunch',  twist: 'oneMore' }
    ]
  };
  var NUMBERS = ['shown', 'hidden'];
  var COLORS = ['coral', 'teal', 'gold', 'plum', 'sky'];
  /* the lure pairs for each question; the variant per round is chosen so that no
     card-picking rule (smallest / largest / middle / first) wins — measured in the gate */
  var LURES = {
    howMany: [[1, -1], [1, 2], [-1, -2]],
    spread:  [[1, 2], [2, -1]],
    bunch:   [[-1, -2], [-2, 1]],
    oneMore: [[0, 2], [0, -1], [2, 3]]       /* offsets from the OLD count n; the answer is n + 1 */
  };

  /* ---- a seeded PRNG (mulberry32 over a string hash) ---- */
  function hash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- angles ---- */
  function packAngle(k) { return PACK0 + k * STEP; }
  /* where m beads lie in an arrangement; every bead i lies at or clockwise of its pack place (it slides back to it) */
  function arrange(kind, m, seed) {
    var out = [], i;
    if (kind === 'spread') {
      if (m === 1) return [180];
      for (i = 0; i < m; i++) out.push(START + i * ((340 - START) / (m - 1)));
      return out;
    }
    if (kind === 'bunch') {
      var c = 190 + (m > 9 ? 8 : 0);
      for (i = 0; i < m; i++) out.push(c - (m - 1) / 2 * STEP + i * STEP);
      return out;
    }
    /* clumps: groups of 2 or 3 (a lone bead at the end if one is left), a gap between groups */
    var r = rng((seed || 'nk') + ':clumps:' + m), sizes = [], left = m;
    while (left > 0) { var g = left <= 3 ? left : (r() < 0.5 ? 2 : 3); if (left - g === 1 && g === 3) g = 2; sizes.push(g); left -= g; }
    var span = (m - sizes.length) * STEP, gap = Math.min(46, (340 - START - span) / Math.max(1, sizes.length - 1));
    var a = START;
    for (var s = 0; s < sizes.length; s++) { for (var b = 0; b < sizes[s]; b++) { out.push(a); a += (b < sizes[s] - 1) ? STEP : 0; } a += gap; }
    return out;
  }

  /* ---- answer cards ---- */
  /* pos = where the right card stands (0 / 1 / 2) — cycled over the pool so no position wins */
  function cardsFor(kind, n, variant, seed, pos) {
    var answer = kind === 'oneMore' ? n + 1 : n;
    var pool = LURES[kind], lures = null;
    for (var t = 0; t < pool.length && !lures; t++) {
      var p = pool[(variant + t) % pool.length], c = [n + p[0], n + p[1]];
      if (c[0] >= 1 && c[1] >= 1 && c[0] !== answer && c[1] !== answer && c[0] !== c[1]) lures = c;
    }
    if (!lures) lures = [answer + 1, answer + 2];   /* a necklace too small for the designed lures (none in the pools) */
    var cards = shuffle(lures, rng(seed + ':cards:' + kind));
    cards.splice(((pos % 3) + 3) % 3, 0, answer);
    return { answer: answer, cards: cards };
  }

  /* ---- rounds ---- */
  function rounds(range, seed) {
    range = POOLS[range] ? range : 'to10';
    var pool = POOLS[range], out = [], s = seed || 'nk';
    for (var i = 0; i < pool.length; i++) {
      var p = pool[i], sd = s + ':' + range + ':' + i;
      var r = rng(sd + ':pal'), pal = shuffle(COLORS, r).slice(0, 2);
      var h = hash(sd);
      out.push({
        id: range + '-' + i + '-' + p.n + '-' + p.twist, n: p.n, start: p.start, twist: p.twist, palette: pal, seed: sd,
        howMany: cardsFor('howMany', p.n, h % LURES.howMany.length, sd, i),
        after: cardsFor(p.twist, p.n, (h >>> 4) % LURES[p.twist].length, sd, i + 2)
      });
    }
    return out;
  }

  /* ---- state ---- */
  function newState(round) {
    var r = rng(round.seed + ':colors'), colors = [];
    for (var i = 0; i < MAXB; i++) colors.push(round.palette[r() < 0.5 ? 0 : 1]);
    var angles = arrange(round.start, round.n, round.seed);
    return { id: round.id, n: round.n, total: round.n, start: round.start, twist: round.twist, seed: round.seed,
      colors: colors, angles: angles, counted: 0, phase: 'count', howMany: round.howMany, after: round.after,
      misses: 0, picked: null, note: null, twisted: false, done: false };
  }
  /* a tap on the necklace: the next bead (clockwise from the clasp) slides back to its counted place */
  function slide(st) {
    if (st.phase !== 'count' || st.counted >= st.total) return false;
    st.angles[st.counted] = packAngle(st.counted);
    st.counted++;
    st.note = null; st.picked = null;
    if (st.counted === st.total) st.phase = st.twisted ? 'after' : 'howMany';
    return true;
  }
  function question(st) { return st.phase === 'howMany' ? st.howMany : st.phase === 'after' || st.phase === 'done' ? st.after : null; }
  /* the slip note for a wrong card */
  function noteFor(st, a) {
    if (st.phase === 'howMany') return 'noteLast';
    if (st.twist === 'oneMore') return a < st.n + 1 ? 'noteOneOn' : 'noteOnlyOne';
    return 'noteMoved';
  }
  /* the necklace changes after the right "how many" */
  function applyTwist(st) {
    if (st.twist === 'oneMore') { st.total = st.n + 1; st.angles.push(packAngle(st.n)); }
    else st.angles = arrange(st.twist, st.total, st.seed);
    st.twisted = true;
  }
  /* a tap on a card */
  function pick(st, a) {
    var q = question(st);
    if (!q || st.done || q.cards.indexOf(a) < 0) return null;
    st.picked = a;
    if (a !== q.answer) { st.misses++; st.note = noteFor(st, a); return { ok: false, note: st.note, phase: st.phase }; }
    st.note = null;
    if (st.phase === 'howMany') { st.phase = 'after'; applyTwist(st); return { ok: true, phase: 'howMany', twist: st.twist }; }
    st.phase = 'done'; st.done = true;
    return { ok: true, phase: 'after', done: true };
  }
  /* count again: the beads go back out — the start arrangement before the twist, the twisted one after
     (spread / bunch stay as they are; after one more bead the beads spread) */
  function recount(st) {
    if (st.done || st.phase === 'count' && st.counted === 0) return false;
    var kind = !st.twisted ? st.start : (st.twist === 'oneMore' ? 'spread' : st.twist);
    st.angles = arrange(kind, st.total, st.seed);
    st.counted = 0; st.phase = 'count'; st.picked = null; st.note = null;
    return true;
  }
  function hintKey(st) { return st.phase === 'count' ? 'hintSlide' : 'hintPick'; }
  function finalAnswer(round) { return round.after.answer; }

  /* ---- layout ----
     W = the stage width. From 600 ('row'): the necklace on the left (D ≤ 440), the panel on the right
     (the counter, the question, three cards stacked); below 600 ('stack'): the necklace as wide as the
     stage (D ≤ 420, 88 % of the stage), the panel under it with the cards in a row. A bead is 2·24/400 of D. */
  function layout(W) {
    if (W >= 600) {
      var D = Math.min(440, W - 236);
      return { mode: 'row', D: D, panel: W - D - 16, bead: Math.round(D * 2 * BEAD / VB), card: Math.min(96, Math.floor((W - D - 16) * 0.5)) };
    }
    var d = Math.min(420, Math.floor(W * 0.88));   /* a phone keeps room for the bubble and Next under the cards */
    return { mode: 'stack', D: d, panel: W, bead: Math.round(d * 2 * BEAD / VB), card: Math.max(64, Math.min(88, Math.floor((W - 24) / 3))) };
  }
  /* a bead's centre in view-box units */
  function beadXY(angle) { var a = angle * Math.PI / 180; return { x: CX + R * Math.sin(a), y: CY - R * Math.cos(a) }; }

  var api = {
    VB: VB, CX: CX, CY: CY, R: R, BEAD: BEAD, STEP: STEP, PACK0: PACK0, MAXB: MAXB, POOLS: POOLS, NUMBERS: NUMBERS, COLORS: COLORS, LURES: LURES,
    rng: rng, shuffle: shuffle, packAngle: packAngle, arrange: arrange, cardsFor: cardsFor, rounds: rounds, newState: newState,
    slide: slide, question: question, noteFor: noteFor, pick: pick, recount: recount, hintKey: hintKey, finalAnswer: finalAnswer, layout: layout, beadXY: beadXY
  };
  global.CountingNecklaceCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
