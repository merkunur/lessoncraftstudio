/* =====================================================================
   twin-tubes-core.js — the model of THE TWIN TUBES (row 142, "Three Ways
   to Show a Number", 2.NBT.A.3; G2-223/225). Pure, no DOM.
   Design: docs/activities-rebuild/designs/142-match-pairs.md
   ---------------------------------------------------------------------
   Every card pours its hundreds, tens and ones into three tubes: a
   numeral digit by digit, an expanded card part by part, a word card
   chunk by chunk IN THE WORDS' OWN ORDER (German pours the ones before
   the tens). Two cards clip together only when all three pairs of tubes
   stand level. The number words come from the shipped helper
   (PlaceValueCore._NUMBER_WORD_HELPERS); chunks are cut on the helper's
   own surface string, so they always join back to it exactly.
   ===================================================================== */
(function (root) {
  'use strict';

  /* three numbers per round that share their digits, so no first digit or first word gives a number away */
  var NOZERO = [[247, 274, 427], [365, 356, 563], [481, 418, 841], [562, 526, 265], [613, 631, 316], [836, 863, 368], [942, 924, 249], [353, 335, 533]];
  var ZEROS = [[305, 350, 530], [408, 480, 804], [607, 670, 760], [209, 290, 920], [106, 160, 610], [703, 730, 370], [806, 860, 608], [405, 450, 540]];
  /* digit values: one digit in all three places — [digit, numerals] */
  var DIGITS = [[7, [721, 172, 217]], [4, [438, 843, 384]], [5, [562, 256, 625]], [3, [319, 931, 193]], [8, [806, 680, 768]], [6, [647, 464, 746]], [2, [290, 925, 512]], [9, [950, 495, 309]]];

  function cardsOf(v) { return v === 'digits' ? 'digits' : 'three'; }
  function numsOf(v) { return v === 'zeros' ? 'zeros' : 'nozero'; }
  function rounds(cards, nums) { return cardsOf(cards) === 'digits' ? DIGITS : numsOf(nums) === 'zeros' ? ZEROS : NOZERO; }
  function digitsOf(n) { return [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10]; }

  /* ---------- the word chunks: cut on the helper's surface string ---------- */
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  /* find w (or w less its last letter — Italian/French elide at the seams) inside s, ignoring accents */
  /* skip: a span already taken (the tens word) — the ones word may hide inside it (pt sete in setenta, it tre in trenta) */
  function locate(s, w, skip) {
    var ns = norm(s), tries = [w, w.slice(0, -1)];
    for (var i = 0; i < tries.length; i++) {
      var nw = norm(tries[i]); if (nw.length < 2) continue;
      for (var at = ns.indexOf(nw); at >= 0; at = ns.indexOf(nw, at + 1)) if (!skip || at >= skip.at + skip.len || at + nw.length <= skip.at) return { at: at, len: nw.length };
    }
    return null;
  }
  /* chunks: [{text, places:[0|1|2]}] — 0 hundreds, 1 tens, 2 ones; a joiner pours nothing */
  function chunks(n, words) {
    var S = words(n), d = digitsOf(n), r = n % 100, out = [];
    if (n < 100 || d[0] === 0) return null;
    var rest = r ? words(r) : '', nS = norm(S), cut = S.length;
    if (r) { var nr = norm(rest); if (nS.slice(nS.length - nr.length) !== nr) return null; cut = S.length - nr.length; }
    var region = S.slice(0, cut), joinM = region.match(/(\s+(og|e|y|et|und)\s+|og|\s+)$/), hText = joinM ? region.slice(0, region.length - joinM[0].length) : region;
    out.push({ text: hText, places: [0] });
    if (joinM) out.push({ text: joinM[0], places: [] });
    if (!r) return out;
    var R = S.slice(cut), filled = [];
    if (d[1]) filled.push(1); if (d[2]) filled.push(2);
    if (!d[1] || !d[2] || d[1] === 1) { out.push({ text: R, places: filled }); return out; }
    var tw = locate(R, words(d[1] * 10)), ow = tw && locate(R, words(d[2]), tw);
    if (!tw || !ow || (tw.at < ow.at ? tw.at + tw.len > ow.at : ow.at + ow.len > tw.at)) { out.push({ text: R, places: filled }); return out; }
    var parts = [{ at: tw.at, len: tw.len, places: [1] }, { at: ow.at, len: ow.len, places: [2] }].sort(function (a, b) { return a.at - b.at; }), pos = 0;
    parts.forEach(function (p) { if (p.at > pos) out.push({ text: R.slice(pos, p.at), places: [] }); out.push({ text: R.slice(p.at, p.at + p.len), places: p.places }); pos = p.at + p.len; });
    if (pos < R.length) {
      /* a tail after the last word belongs to that word (e.g. a plural s) */
      var last = out[out.length - 1]; if (last.places.length) last.text += R.slice(pos); else out.push({ text: R.slice(pos), places: [] });
    }
    return out;
  }

  /* ---------- cards ---------- */
  function expanded(n) { var d = digitsOf(n), p = []; if (d[0]) p.push(d[0] * 100); if (d[1]) p.push(d[1] * 10); if (d[2]) p.push(d[2]); return p.join(' + '); }
  /* a card's pour: amounts per place [h, t, o] and the order its parts pour */
  function pourOf(card) {
    if (card.kind === 'word') { var amt = [0, 0, 0], order = []; card.parts.forEach(function (c) { c.places.forEach(function (p) { amt[p] = card.digits[p]; order.push(p); }); }); return { amt: amt, order: order }; }
    if (card.kind === 'lit') { var a = [0, 0, 0]; a[card.lit] = card.digits[card.lit]; return { amt: a, order: [card.lit] }; }
    var dg = card.digits, ord = [0, 1, 2].filter(function (p) { return dg[p] > 0; });
    return { amt: dg.slice(), order: ord };
  }
  function frosted(card) { return card.kind === 'word' || card.kind === 'valword' || card.kind === 'lit'; }
  /* the nine cards of a round: three rows by kind */
  function buildCards(cards, nums, k, words) {
    var out = [];
    if (cardsOf(cards) === 'digits') {
      var R = DIGITS[k], dgt = R[0];
      R[1].forEach(function (n, i) {
        var lit = digitsOf(n).indexOf(dgt), val = dgt * [100, 10, 1][lit], vd = digitsOf(val);
        out.push({ id: 'n' + i, kind: 'lit', row: 0, key: i, value: n, digits: digitsOf(n), lit: lit, text: String(n) });
        out.push({ id: 'w' + i, kind: 'valword', row: 1, key: i, value: val, digits: vd, text: words(val), parts: [{ text: words(val), places: [lit] }] });
        out.push({ id: 'e' + i, kind: 'val', row: 2, key: i, value: val, digits: vd, text: String(val) });
      });
      return out;
    }
    rounds(cards, nums)[k].forEach(function (n, i) {
      out.push({ id: 'n' + i, kind: 'num', row: 0, key: i, value: n, digits: digitsOf(n), text: String(n) });
      var ch = chunks(n, words);
      out.push({ id: 'w' + i, kind: 'word', row: 1, key: i, value: n, digits: digitsOf(n), text: words(n), parts: ch });
      out.push({ id: 'e' + i, kind: 'exp', row: 2, key: i, value: n, digits: digitsOf(n), text: expanded(n) });
    });
    return out;
  }
  /* a deal: each row's three numbers in an order where no number keeps one column, at most one number repeats a column */
  function dealOk(cols) { var twice = 0; for (var i = 0; i < 3; i++) { var c = cols[i]; if (c[0] === c[1] && c[1] === c[2]) return false; if (c[0] === c[1] || c[1] === c[2] || c[0] === c[2]) twice++; } return twice <= 1; }
  function deal(rnd) {
    rnd = rnd || Math.random;
    for (var a = 0; a < 500; a++) {
      var rows = [0, 1, 2].map(function () { return shuffle([0, 1, 2], rnd); }), cols = [0, 1, 2].map(function (key) { return rows.map(function (r) { return r.indexOf(key); }); });
      if (dealOk(cols)) return rows;
    }
    return [[0, 1, 2], [1, 2, 0], [2, 0, 1]];
  }

  /* ---------- state ---------- */
  function newState(cards, nums, k, words, rnd) {
    var st = { cards: cardsOf(cards), nums: numsOf(nums), k: k, deck: buildCards(cards, nums, k, words), order: deal(rnd), cradles: [null, null], found: {}, done: false, misses: 0, help: false, last: null, poured: null };
    return st;
  }
  function card(st, id) { for (var i = 0; i < st.deck.length; i++) if (st.deck[i].id === id) return st.deck[i]; return null; }
  /* a found pair travels as one double card (its key), never a deck card again */
  function isPlaced(st, id) { return st.cradles.indexOf(id) >= 0; }
  function used(st, id) { var c = card(st, id); return !!(c && st.found[c.key] && st.found[c.key].ids.indexOf(id) >= 0); }
  function put(st, id) {
    if (st.done) return 'no';
    var isDouble = /^pair-/.test(id);
    if (isDouble) { var key = +id.slice(5); if (!st.found[key] || st.found[key].ids.length !== 2) return 'no'; }
    else if (!card(st, id) || used(st, id)) return 'no';
    if (isPlaced(st, id)) return 'no';
    var slot = st.cradles[0] == null ? 0 : st.cradles[1] == null ? 1 : -1; if (slot < 0) return 'no';
    st.cradles[slot] = id; st.help = false; st.poured = null; st.last = null;
    return st.cradles[0] != null && st.cradles[1] != null ? 'full' : 'one';
  }
  function takeOut(st, slot) { if (st.done || st.cradles[slot] == null) return 'no'; st.cradles[slot] = null; st.poured = null; st.last = null; return 'out'; }
  function pourItem(st, id) {
    if (/^pair-/.test(id)) { var key = +id.slice(5), pp = pourOf(card(st, st.found[key].ids[0])); return { amt: pp.amt, order: [0, 1, 2].filter(function (x) { return pp.amt[x] > 0; }), frost: false, key: key }; }
    var c = card(st, id), p = pourOf(c); p.frost = frosted(c); p.key = c.key; return p;
  }
  function level(a, b) { return a.amt[0] === b.amt[0] && a.amt[1] === b.amt[1] && a.amt[2] === b.amt[2]; }
  /* both cradles full → pour: level clips (a pair, or a pair + its third card), otherwise a miss */
  function pour(st) {
    if (st.done || st.cradles[0] == null || st.cradles[1] == null) return { result: 'no' };
    var A = pourItem(st, st.cradles[0]), B = pourItem(st, st.cradles[1]);
    st.poured = { a: A, b: B };
    if (level(A, B)) {
      var key = A.key, ids = st.cradles.filter(function (x) { return !/^pair-/.test(x); });
      var f = st.found[key] || (st.found[key] = { ids: [] }); f.ids = f.ids.concat(ids);
      st.cradles = [null, null]; st.help = false;
      var triple = f.ids.length === 3;
      var all = Object.keys(st.found).length === 3 && Object.keys(st.found).every(function (kk) { return st.found[kk].ids.length === 3; });
      if (all) st.done = true;
      st.last = { result: triple ? 'triple' : 'pair', key: key, round: all };
      return st.last;
    }
    st.misses++; st.help = st.misses >= 2;
    var at = [0, 1, 2].filter(function (p) { return A.amt[p] !== B.amt[p]; })[0];
    st.last = { result: 'uneven', place: at, a: A, b: B };
    return st.last;
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L || L.result !== 'uneven') return null;
    if (st.help) return 'miss2';
    var both = !L.a.frost && !L.b.frost, none = L.a.frost && L.b.frost;
    if (none) return ['notH', 'notT', 'notO'][L.place];
    if (both) return ['diffH', 'diffT', 'diffO'][L.place];
    return ['notH', 'notT', 'notO'][L.place];
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  function plan(cards, nums, rnd, prev) {
    rnd = rnd || Math.random; var n = rounds(cards, nums).length, ids = []; for (var i = 0; i < n; i++) ids.push(i);
    for (var a = 0; a < 2000; a++) { var o = shuffle(ids, rnd); if (!prev || prev.join() !== o.join()) return { order: o }; }
    return { order: ids.slice().reverse() };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { NOZERO: NOZERO, ZEROS: ZEROS, DIGITS: DIGITS, cardsOf: cardsOf, numsOf: numsOf, rounds: rounds, digitsOf: digitsOf, norm: norm, chunks: chunks, expanded: expanded, pourOf: pourOf, frosted: frosted, buildCards: buildCards, dealOk: dealOk, deal: deal, newState: newState, card: card, used: used, put: put, takeOut: takeOut, pourItem: pourItem, level: level, pour: pour, hint: hint, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TwinTubesCore = api;
})(typeof window !== 'undefined' ? window : this);
