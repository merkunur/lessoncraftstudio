/* =====================================================================
   stamp-sheet-core.js — the model of ACTIVITY #170 of the one-by-one
   rebuild: "Make and Count Squares" → THE STAMP SHEET (2.G.A.2).
   Pure, no DOM. Design: docs/activities-rebuild/designs/170-fractions.md
   ---------------------------------------------------------------------
   The rectangle is a sheet of stamps exactly cols × rows plate squares.
   The child perforates it at notches on two rails — a notch every HALF
   square, all alike, so the rail never tells where the squares are —
   and the press prints the plate square at the top-left of every piece:
   true pieces (exactly one plate square) print perfectly, a piece too
   narrow or short is SLICED (the plate overhangs it), a piece too wide
   or tall is BORDERED (white left over). Then the child counts the
   stamps. The pick board shows three finished sheets and a card; only
   the sheet with the card's rows AND row length fills the card's page.
   Cut positions are in half-square units: whole squares are even.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var BOARDS = ['numbers', 'plate', 'pick'];
  var CARDS = ['rowsOf', 'add', 'mul'];
  /* the raised dot where the school writes it (design §9) */
  var MUL_SIGN = { en: '×', fr: '×', es: '×', it: '×', pt: '×', nl: '×', de: '·', sv: '·', da: '·', no: '·', fi: '·' };
  /* MAKE by numbers: [rows, cols] — M1–M8 the old rounds, M9 the tall twin of M1 */
  var NUMBERS = [[2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [4, 4], [3, 5], [4, 5], [3, 2]];
  /* MAKE by the plate: [cols, rows] (the design's table is cols × rows) */
  var PLATE = [[3, 2], [4, 3], [2, 2], [5, 2], [4, 4], [5, 3], [3, 4], [5, 4]];
  /* PICK: the card (rows of length), three sheets (rows × length, the first is the match), the match's slot in pass 1 */
  var PICK = [
    { card: [2, 3], sheets: [[2, 3], [2, 4], [3, 3]], slot: 2 },
    { card: [3, 4], sheets: [[3, 4], [3, 3], [2, 4]], slot: 3 },
    { card: [2, 5], sheets: [[2, 5], [2, 6], [3, 5]], slot: 1 },
    { card: [4, 4], sheets: [[4, 4], [4, 5], [3, 4]], slot: 3 },
    { card: [3, 5], sheets: [[3, 5], [3, 4], [2, 5]], slot: 1 },
    { card: [4, 3], sheets: [[4, 3], [4, 4], [5, 3]], slot: 2 },
    { card: [3, 3], sheets: [[3, 3], [3, 4], [2, 3]], slot: 1 },
    { card: [4, 5], sheets: [[4, 5], [4, 4], [3, 5]], slot: 2 },
    { card: [3, 4], sheets: [[3, 4], [2, 6], [4, 4]], slot: 3 }
  ];

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function boardOf(v) { return BOARDS.indexOf(String(v)) >= 0 ? String(v) : 'numbers'; }
  function cardOf(v) { return CARDS.indexOf(String(v)) >= 0 ? String(v) : 'rowsOf'; }
  function mulSign(loc) { return MUL_SIGN[locOf(loc)]; }
  function rounds(board) {
    board = boardOf(board);
    if (board === 'numbers') return NUMBERS.map(function (r, i) { return { k: i, board: board, rows: r[0], cols: r[1] }; });
    if (board === 'plate') return PLATE.map(function (r, i) { return { k: i, board: board, rows: r[1], cols: r[0] }; });
    return PICK.map(function (r, i) { return { k: i, board: board, rows: r.card[0], cols: r.card[1], slot: r.slot,
      sheets: r.sheets.map(function (s, j) { return { rows: s[0], cols: s[1], ok: j === 0 }; }) }; });
  }
  function passSize(board) { return rounds(board).length; }
  /* the match's slot (0–2) in pass p: the design's pass-1 slot, moved one along per pass (each slot three times per pass) */
  function slotIn(r, pass) { return ((r.slot - 1) + (pass || 0)) % 3; }

  /* ---- the sheet ---- */
  /* the interior notches of a rail n squares long: half-square steps 1 … 2n − 1 */
  function notches(n) { var o = []; for (var h = 1; h < 2 * n; h++) o.push(h); return o; }
  function cutsSorted(a) { return a.slice().sort(function (x, y) { return x - y; }); }
  /* the pieces the cuts make, row by row, in half-square units */
  function pieces(cols, rows, colCuts, rowCuts) {
    var xs = [0].concat(cutsSorted(colCuts), [2 * cols]), ys = [0].concat(cutsSorted(rowCuts), [2 * rows]), out = [];
    for (var j = 0; j + 1 < ys.length; j++) for (var i = 0; i + 1 < xs.length; i++) out.push({ r: j, c: i, x: xs[i], y: ys[j], w: xs[i + 1] - xs[i], h: ys[j + 1] - ys[j] });
    return out;
  }
  function isTrueGrid(st) {
    var want = function (n) { var o = []; for (var i = 1; i < n; i++) o.push(2 * i); return o.join(); };
    return cutsSorted(st.colCuts).join() === want(st.cols) && cutsSorted(st.rowCuts).join() === want(st.rows);
  }
  /* the press: the plate square (2 × 2 halves) at each piece's top-left. A true piece prints perfectly; otherwise
     `over` = where the plate runs past the piece (sliced), `border` = where the piece is left white */
  function misprints(st) {
    return pieces(st.cols, st.rows, st.colCuts, st.rowCuts).map(function (p) {
      var o = { r: p.r, c: p.c, x: p.x, y: p.y, w: p.w, h: p.h, ok: p.w === 2 && p.h === 2, over: [], border: [] };
      if (p.w < 2) o.over.push({ x: p.x + p.w, y: p.y, w: 2 - p.w, h: 2 });
      if (p.h < 2) o.over.push({ x: p.x, y: p.y + p.h, w: Math.min(p.w, 2), h: 2 - p.h });
      if (p.w > 2) o.border.push({ x: p.x + 2, y: p.y, w: p.w - 2, h: p.h });
      if (p.h > 2) o.border.push({ x: p.x, y: p.y + 2, w: Math.min(p.w, 2), h: p.h - 2 });
      return o;
    });
  }
  function total(st) { return st.rows * st.cols; }
  /* the running total at the end of each row: cols, 2·cols, … */
  function runningTotals(rows, cols) { var o = []; for (var r = 1; r <= rows; r++) o.push(r * cols); return o; }
  /* the card: rows of length / the adding (the row length written `rows` times) / the multiplying */
  function addTerms(rows, cols) { var o = []; for (var r = 0; r < rows; r++) o.push(cols); return o; }
  function cardMath(card, rows, cols, loc) {
    card = cardOf(card);
    if (card === 'add') return addTerms(rows, cols).join(' + ');
    if (card === 'mul') return rows + ' ' + mulSign(loc) + ' ' + cols;
    return null;
  }
  /* the pick board's page: the card's rows × length; how the chosen sheet's rows file into it */
  function pageFit(sheet, card) {
    var n = Math.max(sheet.rows, card.rows), out = [];
    for (var r = 0; r < n; r++) {
      var have = r < sheet.rows ? sheet.cols : 0, slot = r < card.rows ? card.cols : 0;
      out.push({ r: r, have: have, slot: slot, state: !slot ? 'extra' : !have ? 'missing' : have === slot ? 'ok' : have > slot ? 'over' : 'short' });
    }
    return out;
  }
  function fits(sheet, card) { return sheet.rows === card.rows && sheet.cols === card.cols; }

  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a fresh round. pick: the match at its slot for this pass, the two others in the remaining slots (their order alternates by pass) */
  function newState(board, k, pass) {
    board = boardOf(board);
    var pool = rounds(board), r = pool[((k % pool.length) + pool.length) % pool.length];
    var st = { board: board, k: r.k, rows: r.rows, cols: r.cols, colCuts: [], rowCuts: [], step: board === 'pick' ? 'pick' : 'cut',
      typed: '', pick: null, sheets: null, misses: 0, help: false, cmisses: 0, chelp: false, verdict: null, done: false };
    if (board === 'pick') {
      var s = slotIn(r, pass), others = r.sheets.slice(1); if ((pass || 0) % 2) others.reverse();
      var sh = [null, null, null]; sh[s] = r.sheets[0];
      for (var i = 0, j = 0; i < 3; i++) if (!sh[i]) sh[i] = others[j++];
      st.sheets = sh;
    }
    return st;
  }
  function changed(st) { st.verdict = null; }
  /* perforate or heal at half-notch h of a rail ('col' = the top rail, lines down the sheet; 'row' = the left rail, lines across) */
  function toggleCut(st, axis, h) {
    if (st.done || st.step !== 'cut') return null;
    var n = axis === 'col' ? st.cols : st.rows, list = axis === 'col' ? st.colCuts : st.rowCuts;
    if (!(h >= 1 && h < 2 * n && Math.floor(h) === h)) return null;
    var i = list.indexOf(h);
    if (i >= 0) list.splice(i, 1); else list.push(h);
    changed(st); return i >= 0 ? 'healed' : 'cut';
  }
  function hasCut(st, axis, h) { return (axis === 'col' ? st.colCuts : st.rowCuts).indexOf(h) >= 0; }
  function type(st, d) {
    if (st.done || st.step !== 'count') return false;
    if (d === 'back') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); changed(st); return true; }
    if (!/^[0-9]$/.test(String(d)) || st.typed.length >= 2 || (st.typed === '' && String(d) === '0')) return false;
    st.typed += String(d); changed(st); return true;
  }
  function choose(st, i) { if (st.done || st.step !== 'pick' || !(i >= 0 && i < 3)) return false; st.pick = st.pick === i ? null : i; changed(st); return true; }

  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.step === 'cut') {
      if (!st.colCuts.length && !st.rowCuts.length) return { result: 'note', key: 'hintStart' };
      if (isTrueGrid(st)) { st.step = 'count'; st.verdict = null; return { result: 'grid' }; }
      st.misses++; st.help = st.misses >= 2; st.verdict = { misprint: true };
      return { result: 'miss', step: 'cut' };
    }
    if (st.step === 'count') {
      if (!st.typed) return { result: 'note', key: 'hintCountStart' };
      if (+st.typed === total(st)) { st.step = 'done'; st.done = true; return { result: 'ok' }; }
      st.cmisses++; st.chelp = st.cmisses >= 2; st.verdict = { count: +st.typed };
      return { result: 'miss', step: 'count' };
    }
    if (st.pick == null) return { result: 'note', key: 'hintPickStart' };
    if (fits(st.sheets[st.pick], st)) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2; st.verdict = { pick: st.pick };
    return { result: 'miss', step: 'pick' };
  }
  function hint(st) {
    if (st.step === 'count') return st.chelp ? 'hintCountOn' : 'hintRow';
    if (st.step === 'pick') return st.help ? 'hintPickFill' : 'hintPickRows';
    return st.help ? 'hintGhost' : 'hintPress';
  }
  /* an order-only reshuffle per pass, never the previous order; the pick board also keeps the match out of
     the same slot three rounds running */
  function plan(board, rnd, prev, pass) {
    board = boardOf(board);
    var pool = rounds(board), ks = pool.map(function (r) { return r.k; });
    var okRuns = function (c) { if (board !== 'pick') return true; for (var i = 2; i < c.length; i++) { var a = slotIn(pool[c[i]], pass), b = slotIn(pool[c[i - 1]], pass), d = slotIn(pool[c[i - 2]], pass); if (a === b && b === d) return false; } return true; };
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && okRuns(c)) return c; }
    /* a stuck random source: rotate the previous order until the slots behave */
    var base = (prev || ks).slice();
    for (var s = 1; s <= base.length; s++) { var rot = base.slice(s).concat(base.slice(0, s)); if (rot.join() !== (prev || []).join() && okRuns(rot)) return rot; }
    return base.slice(1).concat(base.slice(0, 1));
  }
  var api = { LOCALES: LOCALES, BOARDS: BOARDS, CARDS: CARDS, MUL_SIGN: MUL_SIGN, locOf: locOf, boardOf: boardOf, cardOf: cardOf, mulSign: mulSign,
    rounds: rounds, passSize: passSize, slotIn: slotIn, notches: notches, pieces: pieces, isTrueGrid: isTrueGrid, misprints: misprints, total: total,
    runningTotals: runningTotals, addTerms: addTerms, cardMath: cardMath, pageFit: pageFit, fits: fits, newState: newState,
    toggleCut: toggleCut, hasCut: hasCut, type: type, choose: choose, check: check, hint: hint, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StampSheetCore = api;
})(typeof window !== 'undefined' ? window : this);
