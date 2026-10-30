/* =====================================================================
   dough-press-core.js — the model of ACTIVITY #171 of the one-by-one
   rebuild: "Same Size, Different Shape" → THE DOUGH PRESS (2.G.A.3).
   Pure, no DOM. Design: docs/activities-rebuild/designs/171-choice-board.md
   ---------------------------------------------------------------------
   Every piece of a cut shape is a slab of dough. Under the press it
   squashes into a round patty with exactly its amount of dough (radius
   ∝ √area), so equal shares make identical patties whatever their shape,
   and an unfair cut makes a big patty and a small one. Three boards:
   MATCH (the model's patties stacked against the chosen tile's), FAIR
   (ribbon every shape cut into equal parts), WHICH (which shape shows a
   fraction: the shaded patties lump together and must fill the card's
   share). Every verdict is computed from the polygons — never a table.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var BOARDS = ['match', 'fair', 'which'];
  var EPS = 0.001;   /* areas equal within 0.1 % */
  var K = 0.30;      /* patty area = K × piece area (one factor for every piece) */

  /* ---- the figure catalogue: a 100-unit box (square 100 × 100, rectangle 100 × 60), y down ---- */
  var R = function (x0, y0, x1, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; };
  function vstrips(W, H, cuts) { var xs = [0].concat(cuts.map(function (c) { return c * W; }), [W]), o = []; for (var i = 0; i + 1 < xs.length; i++) o.push(R(xs[i], 0, xs[i + 1], H)); return o; }
  function hstrips(W, H, cuts) { var ys = [0].concat(cuts.map(function (c) { return c * H; }), [H]), o = []; for (var i = 0; i + 1 < ys.length; i++) o.push(R(0, ys[i], W, ys[i + 1])); return o; }
  /* a figure id: '<sq|rect>-<cut>[@<percent>]' (the @ form moves an uneven halving cut, F6) */
  function figure(id) {
    var at = String(id).split('@'), base = at[0], pct = at.length > 1 ? +at[1] / 100 : null;
    var m = base.match(/^(sq|rect)-(.+)$/); if (!m) throw new Error('no figure ' + id);
    var W = 100, H = m[1] === 'sq' ? 100 : 60, cut = m[2], P;
    switch (cut) {
      case 'halves-v': P = vstrips(W, H, [1 / 2]); break;
      case 'halves-h': P = hstrips(W, H, [1 / 2]); break;
      case 'halves-diag': P = [[[0, 0], [W, 0], [W, H]], [[0, 0], [W, H], [0, H]]]; break;
      case 'halves-uneq': P = vstrips(W, H, [pct || 0.34]); break;
      case 'thirds-v': P = vstrips(W, H, [1 / 3, 2 / 3]); break;
      case 'thirds-h': P = hstrips(W, H, [1 / 3, 2 / 3]); break;
      case 'thirds-uneq': P = vstrips(W, H, [0.24, 0.60]); break;
      case 'fourths-grid': P = [R(0, 0, W / 2, H / 2), R(W / 2, 0, W, H / 2), R(0, H / 2, W / 2, H), R(W / 2, H / 2, W, H)]; break;
      case 'fourths-strips': P = vstrips(W, H, [1 / 4, 2 / 4, 3 / 4]); break;
      case 'fourths-uneq': P = vstrips(W, H, [0.14, 0.38, 0.66]); break;
      case 'fourths-diag': if (m[1] !== 'sq') throw new Error('fourths-diag is square only'); P = [[[0, 0], [W, 0], [W / 2, H / 2]], [[W, 0], [W, H], [W / 2, H / 2]], [[W, H], [0, H], [W / 2, H / 2]], [[0, H], [0, 0], [W / 2, H / 2]]]; break;
      case 'notsplit': P = [R(0, 0, W, H)]; break;
      /* equal shares that do not look the same, inside ONE figure */
      case 'fourths-mixed':
        if (m[1] === 'sq') P = [R(0, 0, W / 2, H / 2), R(W / 2, 0, W, H / 2), [[0, H / 2], [W, H / 2], [W, H]], [[0, H / 2], [W, H], [0, H]]];
        else P = [R(0, 0, W / 4, H), R(W / 4, 0, W / 2, H), R(W / 2, 0, W, H / 2), R(W / 2, H / 2, W, H)];
        break;
      case 'thirds-mixed': if (m[1] !== 'rect') throw new Error('thirds-mixed is rectangle only'); P = [R(0, 0, W / 3, H), [[W / 3, 0], [W, 0], [W, H]], [[W / 3, 0], [W, H], [W / 3, H]]]; break;
      case 'halves-step': if (m[1] !== 'rect') throw new Error('halves-step is rectangle only');
        P = [[[0, 0], [30, 0], [30, 20], [50, 20], [50, 40], [70, 40], [70, 60], [0, 60]], [[100, 60], [70, 60], [70, 40], [50, 40], [50, 20], [30, 20], [30, 0], [100, 0]]]; break;
      default: throw new Error('no figure ' + id);
    }
    return { id: id, kind: m[1], W: W, H: H, pieces: P };
  }
  /* shoelace, absolute */
  function area(poly) { var s = 0; for (var i = 0; i < poly.length; i++) { var a = poly[i], b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; }
  function areas(fig) { return fig.pieces.map(area); }
  function total(fig) { return fig.W * fig.H; }
  /* every piece the same amount (within 0.1 % of the mean) */
  function isEqualShares(fig) { var A = areas(fig), m = total(fig) / A.length; return A.length > 1 && A.every(function (a) { return Math.abs(a - m) <= EPS * m; }); }
  function nPieces(fig) { return fig.pieces.length; }
  /* the shaded share of the whole (shaded = piece indices) */
  function share(fig, shaded) { var A = areas(fig); return (shaded || []).reduce(function (s, i) { return s + A[i]; }, 0) / total(fig); }
  /* a tile SHOWS a card k/n when it is cut into equal shares and its shaded amount is k/n of the whole (W9: 2 of 4 = 1/2) */
  function shows(fig, shaded, card) { return isEqualShares(fig) && Math.abs(share(fig, shaded) - card[0] / card[1]) <= EPS; }
  /* the patty a piece of area a becomes, in units (multiply by the drawing scale) */
  function pattyR(a) { return Math.sqrt(K * a / Math.PI); }
  function patties(fig) { return areas(fig).map(pattyR); }
  /* the stack test: the chosen stack set on the model's stack, layer by layer (both sorted largest first) */
  function stackFit(left, right) {
    var L = left.slice().sort(function (a, b) { return b - a; }), Rr = right.slice().sort(function (a, b) { return b - a; }), n = Math.max(L.length, Rr.length), o = [];
    for (var i = 0; i < n; i++) {
      var l = L[i], r = Rr[i];
      o.push({ l: l == null ? null : l, r: r == null ? null : r, fit: l == null ? 'extra' : r == null ? 'missing' : Math.abs(r - l) <= EPS * l ? 'ok' : r > l ? 'over' : 'under' });
    }
    return o;
  }
  /* the squash: the outline resampled to 64 points, interpolated toward a circle, scaled about the centroid so the
     AREA stays the piece's area at every step (the amount of dough never changes) */
  function resample(poly, n) {
    var L = 0, seg = []; for (var i = 0; i < poly.length; i++) { var a = poly[i], b = poly[(i + 1) % poly.length], d = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push(d); L += d; }
    var out = [], step = L / n, k = 0, acc = 0;
    for (var j = 0; j < n; j++) { var t = j * step; while (acc + seg[k] < t - 1e-9) { acc += seg[k]; k = (k + 1) % poly.length; } var a2 = poly[k], b2 = poly[(k + 1) % poly.length], f = seg[k] ? (t - acc) / seg[k] : 0; out.push([a2[0] + (b2[0] - a2[0]) * f, a2[1] + (b2[1] - a2[1]) * f]); }
    return out;
  }
  function centroid(poly) { var x = 0, y = 0; poly.forEach(function (p) { x += p[0]; y += p[1]; }); return [x / poly.length, y / poly.length]; }
  function morph(poly, t) {
    var A = area(poly), P = resample(poly, 64), c = centroid(P), r = Math.sqrt(A / Math.PI);
    /* the circle point for each outline point: the same angle from the centroid */
    var Q = P.map(function (p) { var a = Math.atan2(p[1] - c[1], p[0] - c[0]); return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
    var M = P.map(function (p, i) { return [p[0] + (Q[i][0] - p[0]) * t, p[1] + (Q[i][1] - p[1]) * t]; });
    /* rescale about the piece's own centre (fixed for every t), so t = 1 is an exact circle round it */
    var a2 = area(M), s = a2 > 0 ? Math.sqrt(A / a2) : 1;
    return M.map(function (p) { return [c[0] + (p[0] - c[0]) * s, c[1] + (p[1] - c[1]) * s]; });
  }

  /* ---- the rounds (design §6) ---- */
  var T = function (s) { return s.split(' · ').map(function (x) { return x.trim(); }); };
  var MATCH = [
    ['sq-halves-diag', 'sq-halves-v', 'sq-halves-uneq · sq-fourths-grid · sq-notsplit'],
    ['rect-halves-v', 'rect-halves-h', 'rect-halves-uneq · rect-fourths-grid · rect-notsplit'],
    ['sq-halves-v', 'sq-halves-diag', 'sq-halves-uneq · sq-fourths-strips · sq-notsplit'],
    ['rect-halves-diag', 'rect-halves-v', 'rect-halves-uneq · rect-fourths-strips · rect-notsplit'],
    ['rect-fourths-grid', 'rect-fourths-strips', 'rect-fourths-uneq · rect-halves-v · rect-notsplit'],
    ['sq-fourths-grid', 'sq-fourths-strips', 'sq-fourths-uneq · sq-halves-v · sq-notsplit'],
    ['rect-fourths-strips', 'rect-fourths-grid', 'rect-fourths-uneq · rect-halves-h · rect-notsplit'],
    ['rect-thirds-v', 'rect-thirds-h', 'rect-thirds-uneq · rect-halves-v · rect-notsplit'],
    ['sq-thirds-v', 'sq-thirds-h', 'sq-thirds-uneq · sq-fourths-grid · sq-notsplit'],
    ['rect-thirds-h', 'rect-thirds-v', 'rect-thirds-uneq · rect-fourths-grid · rect-notsplit'],
    ['sq-halves-h', 'sq-halves-diag', 'sq-halves-uneq · sq-thirds-v · sq-notsplit'],
    ['sq-thirds-h', 'sq-thirds-v', 'sq-thirds-uneq · sq-halves-v · sq-notsplit'],
    ['sq-fourths-grid', 'sq-fourths-mixed', 'sq-fourths-uneq · sq-thirds-v · sq-notsplit'],
    ['rect-thirds-v', 'rect-thirds-mixed', 'rect-thirds-uneq · rect-fourths-strips · rect-notsplit'],
    ['rect-halves-h', 'rect-halves-step', 'rect-halves-uneq · rect-thirds-h · rect-notsplit'],
    ['sq-fourths-diag', 'sq-fourths-grid', 'sq-fourths-uneq · sq-halves-diag · sq-notsplit']
  ].map(function (r) { return { model: r[0], tiles: [{ fig: r[1], ok: true }].concat(T(r[2]).map(function (f) { return { fig: f, ok: false }; })) }; });
  /* FAIR: ✓ marks the fair tiles (design table); the gate recomputes fairness from the polygons */
  var FAIR = [
    'sq-halves-v ✓ · sq-halves-uneq · rect-halves-diag ✓ · rect-halves-uneq · sq-halves-diag ✓ · rect-thirds-uneq',
    'rect-fourths-grid ✓ · rect-fourths-uneq · sq-fourths-diag ✓ · sq-fourths-uneq · rect-halves-h ✓ · sq-thirds-uneq',
    'sq-thirds-v ✓ · sq-thirds-uneq · rect-thirds-h ✓ · rect-halves-uneq · sq-fourths-strips ✓ · rect-fourths-uneq',
    'sq-fourths-mixed ✓ · sq-fourths-uneq · rect-halves-step ✓ · rect-halves-uneq · sq-halves-uneq · rect-thirds-uneq',
    'rect-thirds-mixed ✓ · rect-thirds-uneq · sq-halves-h ✓ · sq-thirds-uneq · rect-fourths-mixed ✓ · rect-fourths-uneq',
    'sq-halves-diag ✓ · rect-halves-uneq · sq-fourths-uneq · rect-fourths-strips ✓ · sq-thirds-uneq · rect-halves-uneq@28',
    'rect-fourths-mixed ✓ · sq-fourths-mixed ✓ · rect-thirds-mixed ✓ · sq-halves-uneq · rect-fourths-uneq · sq-thirds-uneq',
    'sq-thirds-h ✓ · rect-thirds-uneq · rect-halves-v ✓ · sq-fourths-uneq · sq-halves-uneq · rect-fourths-grid ✓'
  ].map(function (s) { return { tiles: T(s).map(function (x) { return { fig: x.replace(' ✓', ''), ok: / ✓$/.test(x) }; }) }; });
  /* WHICH: the card [k, n]; tiles with their shaded piece indices (the first is the match) */
  var W = function (fig, sh) { return { fig: fig, shaded: sh }; };
  var WHICH = [
    { card: [1, 2], tiles: [W('rect-halves-diag', [0]), W('rect-halves-uneq', [0]), W('rect-thirds-v', [0]), W('rect-fourths-grid', [0])] },
    { card: [1, 3], tiles: [W('sq-thirds-h', [0]), W('sq-thirds-uneq', [0]), W('sq-fourths-strips', [0]), W('sq-halves-v', [0])] },
    { card: [1, 4], tiles: [W('sq-fourths-diag', [0]), W('sq-fourths-uneq', [3]), W('sq-thirds-v', [0]), W('sq-fourths-grid', [0, 1, 2])] },
    { card: [1, 3], tiles: [W('rect-thirds-mixed', [0]), W('rect-thirds-uneq', [0]), W('rect-thirds-v', [0, 1]), W('rect-fourths-strips', [0])] },
    { card: [1, 4], tiles: [W('sq-fourths-mixed', [2]), W('sq-fourths-uneq', [0]), W('sq-halves-diag', [0]), W('sq-thirds-h', [0])] },
    { card: [2, 3], tiles: [W('rect-thirds-v', [0, 1]), W('rect-thirds-uneq', [1, 2]), W('rect-thirds-h', [0]), W('rect-fourths-grid', [0, 1])] },
    { card: [3, 4], tiles: [W('sq-fourths-grid', [0, 1, 2]), W('sq-fourths-uneq', [1, 2, 3]), W('sq-fourths-strips', [0]), W('sq-thirds-v', [0, 1])] },
    { card: [2, 4], tiles: [W('rect-fourths-strips', [0, 1]), W('rect-fourths-uneq', [0, 1]), W('rect-fourths-grid', [0, 1, 2]), W('rect-thirds-h', [0, 1])] },
    { card: [1, 2], tiles: [W('sq-fourths-mixed', [2, 3]), W('sq-halves-uneq', [0]), W('sq-thirds-v', [0]), W('sq-fourths-grid', [0])] }
  ];
  var POOL = { match: MATCH, fair: FAIR, which: WHICH };

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function boardOf(v) { return BOARDS.indexOf(String(v)) >= 0 ? String(v) : 'match'; }
  function rounds(board) { board = boardOf(board); return POOL[board].map(function (r, i) { var o = { k: i, board: board }; for (var p in r) o[p] = r[p]; return o; }); }
  function passSize(board) { return rounds(board).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- answer positions ---- */
  /* MATCH: the match's slot per round = (k + pass) mod 4 → 4 / 4 / 4 / 4 over the 16 rounds in every pass */
  function matchSlot(k, pass) { return ((k % 4) + (pass || 0)) % 4; }
  /* WHICH: 9 rounds → slots 2 / 2 / 2 / 3, rotated per pass */
  function whichSlot(k, pass) { var base = [0, 1, 2, 3, 0, 1, 2, 3, 3][k]; return (base + (pass || 0)) % 4; }
  /* FAIR: a 3 × 2 grid (slots 0–2 top row, 3–5 bottom row; column = slot mod 3); the fair tiles never all in one row or one column */
  function fairSpread(order, tiles) {
    var fair = order.map(function (t, s) { return tiles[t].ok ? s : -1; }).filter(function (s) { return s >= 0; });
    var rows = {}, cols = {}; fair.forEach(function (s) { rows[Math.floor(s / 3)] = 1; cols[s % 3] = 1; });
    return Object.keys(rows).length >= 2 && Object.keys(cols).length >= 2;
  }
  /* the tile order for a round: MATCH/WHICH put the match at its slot and the distractors around it (their order moves with the
     pass); FAIR shuffles with the spread rule */
  function tileOrder(board, r, pass, rnd) {
    rnd = rnd || Math.random;
    if (board === 'fair') { for (var t = 0; t < 400; t++) { var o = shuffle(r.tiles.map(function (_, i) { return i; }), rnd); if (fairSpread(o, r.tiles)) return o; } return [0, 1, 3, 2, 4, 5]; }
    var slot = board === 'match' ? matchSlot(r.k, pass) : whichSlot(r.k, pass), rest = [1, 2, 3], rot = (pass || 0) % 3;
    rest = rest.slice(rot).concat(rest.slice(0, rot));
    var out = [null, null, null, null]; out[slot] = 0; for (var i = 0, j = 0; i < 4; i++) if (out[i] == null) out[i] = rest[j++];
    return out;
  }

  /* ---- a round ---- */
  function newState(board, k, pass, rnd) {
    board = boardOf(board);
    var pool = rounds(board), r = pool[((k % pool.length) + pool.length) % pool.length];
    var order = tileOrder(board, r, pass, rnd);
    return { board: board, k: r.k, round: r, tiles: order.map(function (i) { return r.tiles[i]; }), sel: null, ribbons: [], misses: 0, help: false, verdict: null, done: false };
  }
  function changed(st) { st.verdict = null; }
  function select(st, i) { if (st.done || st.board === 'fair' || !(i >= 0 && i < st.tiles.length)) return false; st.sel = st.sel === i ? null : i; changed(st); return true; }
  function ribbon(st, i) { if (st.done || st.board !== 'fair' || !(i >= 0 && i < st.tiles.length)) return false; var j = st.ribbons.indexOf(i); if (j >= 0) st.ribbons.splice(j, 1); else st.ribbons.push(i); changed(st); return true; }
  /* is tile i right, from the polygons */
  function tileRight(st, i) {
    var t = st.tiles[i], f = figure(t.fig);
    if (st.board === 'which') return shows(f, t.shaded, st.round.card);
    if (st.board === 'fair') return isEqualShares(f);
    var m = figure(st.round.model); return isEqualShares(f) && nPieces(f) === nPieces(m);
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.board === 'fair') {
      if (!st.ribbons.length) return { result: 'note', key: 'hintRibbon' };
      var wrongOn = st.ribbons.filter(function (i) { return !tileRight(st, i); }), missing = st.tiles.map(function (_, i) { return i; }).filter(function (i) { return tileRight(st, i) && st.ribbons.indexOf(i) < 0; });
      if (!wrongOn.length && !missing.length) { st.done = true; return { result: 'ok' }; }
      st.misses++; st.help = st.misses >= 2;
      /* the press shows every ribboned tile; an unfair one's ribbon slips off */
      st.verdict = { pressed: st.ribbons.slice(), slipped: wrongOn, missing: missing.length };
      st.ribbons = st.ribbons.filter(function (i) { return wrongOn.indexOf(i) < 0; });
      return { result: 'miss', slipped: wrongOn, missing: missing.length };
    }
    if (st.sel == null) return { result: 'note', key: 'hintPick' };
    if (tileRight(st, st.sel)) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2; st.verdict = { pressed: [st.sel] };
    return { result: 'miss' };
  }
  function hint(st, res) {
    if (st.help) return 'hintCompare';
    if (st.board === 'match') return 'hintPatties';
    if (st.board === 'which') return 'hintCard';
    return res && !res.slipped.length && res.missing ? 'hintMore' : 'hintFair';
  }
  /* an order-only reshuffle per pass, never the previous order; MATCH/WHICH also keep the match out of one slot three rounds running */
  function plan(board, rnd, prev, pass) {
    board = boardOf(board);
    var pool = rounds(board), ks = pool.map(function (r) { return r.k; });
    var slotOf = function (k) { return board === 'match' ? matchSlot(k, pass) : board === 'which' ? whichSlot(k, pass) : -1; };
    var okRuns = function (c) { if (board === 'fair') return true; for (var i = 2; i < c.length; i++) { var a = slotOf(c[i]); if (a === slotOf(c[i - 1]) && a === slotOf(c[i - 2])) return false; } return true; };
    for (var tries = 0; tries < 600; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && okRuns(c)) return c; }
    var base = (prev || ks).slice();
    for (var s = 1; s <= base.length; s++) { var rot = base.slice(s).concat(base.slice(0, s)); if (rot.join() !== (prev || []).join() && okRuns(rot)) return rot; }
    return base.slice(1).concat(base.slice(0, 1));
  }
  var api = { LOCALES: LOCALES, BOARDS: BOARDS, EPS: EPS, K: K, locOf: locOf, boardOf: boardOf, rounds: rounds, passSize: passSize,
    figure: figure, area: area, areas: areas, total: total, isEqualShares: isEqualShares, nPieces: nPieces, share: share, shows: shows,
    pattyR: pattyR, patties: patties, stackFit: stackFit, morph: morph, resample: resample,
    matchSlot: matchSlot, whichSlot: whichSlot, fairSpread: fairSpread, tileOrder: tileOrder,
    newState: newState, select: select, ribbon: ribbon, tileRight: tileRight, check: check, hint: hint, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DoughPressCore = api;
})(typeof window !== 'undefined' ? window : this);
