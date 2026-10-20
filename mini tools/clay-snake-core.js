/* =====================================================================
   clay-snake-core.js — the model of ACTIVITY #44 of the one-by-one
   rebuild: "Bouw het woord met klankgroepen" → DE KLEISLANG, the clay
   snake (RF.K.2.B; Dutch only — every language's syllable activity is its
   own row).
   Design sheet: docs/activities-rebuild/designs/044-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: hakken en plakken with real clay. The snake is THE SAME
   LENGTH FOR EVERY WORD, so its length tells nothing: the parts exist only
   where the child chops. The stamp roller then prints the klankgroepen on
   the pieces — a piece with two klankgroepen means a chop is missing, a
   blank piece means one too many. Plakken: only true neighbours stick
   back together; a wrong joint stays cracked. Hakken met letters: a cut
   that is not at a klankgroep seam heals — the clay closes over it.

   Three levels: hak (count by chopping, no letters), plak (press the
   pieces together in order, optional decoy lump), letters (chop the
   written word at its seams; "ij" is one letter, never split).
   Every split is the gated output (approved-words-nl.json); the gate
   re-reads it. No DOM. UMD: window.ClaySnakeCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ClaySnakeCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function W(s) { var p = s.split('|'); return { key: p[0], pic: p[1], word: p[2], syl: p[3].split('-'), decoy: p[4] || null }; }
  var LEVELS = {
    hak: [
      'cat|animals/cat|kat|kat', 'zebra|animals/zebra|zebra|ze-bra', 'rainbow|weather/rainbow|regenboog|re-gen-boog',
      'bicycle|vehicles/bicycle|fiets|fiets', 'butterfly|easter/butterfly|vlinder|vlin-der', 'sunflower|flowers/sunflower|zonnebloem|zon-ne-bloem',
      'helicopter|vehicles/helicopter|helikopter|he-li-kop-ter', 'snowman|winter/snowman|sneeuwpop|sneeuw-pop',
      'lighthouse|beach/lighthouse|vuurtoren|vuur-to-ren', 'binoculars|camping/binoculars|verrekijker|ver-re-kij-ker'
    ].map(W),
    plak: [
      'panda|animals/panda|panda|pan-da|ster', 'rabbit|animals/rabbit|konijn|ko-nijn|pan', 'starfish|beach/starfish|zeester|zee-ster|da',
      'strawberry|fruits/strawberry|aardbei|aard-bei|koek', 'bookcase|furniture/bookcase|boekenkast|boe-ken-kast|muis',
      'pancake|breakfast/pancake|pannenkoek|pan-nen-koek|bei', 'umbrella|weather/umbrella|paraplu|pa-ra-plu|ken',
      'watermelon|fruits/watermelon|watermeloen|wa-ter-me-loen|plu', 'bat|animals/bat|vleermuis|vleer-muis|zee',
      'dolphin|animals/dolphin|dolfijn|dol-fijn|ra'
    ].map(W),
    letters: [
      'airplane|Things That Fly/airplane|vliegtuig|vlieg-tuig', 'tiger|animals/tiger|tijger|tij-ger', 'balloon|toys/balloon|ballon|bal-lon',
      'angel|christmas/angel|engel|en-gel', 'glove|accessories/glove|handschoen|hand-schoen', 'biscuit|breakfast/biscuit|koekje|koek-je',
      'tractor|vehicles/tractor|tractor|trac-tor', 'bee|farm animals/bee|bij|bij'
    ].map(W)
  };
  var LEVEL_KEYS = ['hak', 'plak', 'letters'];
  var MAX_PIECES = 6, MIN_GAP = 36 / 440;   /* a cut closer than 36 px (of the 440 px snake) to another cut or an end is refused */
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'hak'; }

  /* the written word as letter cells: Dutch "ij" is ONE letter and never split */
  function cells(word) { var out = [], i = 0; while (i < word.length) { if (word[i] === 'i' && word[i + 1] === 'j') { out.push('ij'); i += 2; } else { out.push(word[i]); i++; } } return out; }
  /* the seams of a word, as letter-cell gap indices (gap g = after cell g-1, before cell g) */
  function seams(w) { var out = [], at = 0; for (var i = 0; i < w.syl.length - 1; i++) { at += cells(w.syl[i]).length; out.push(at); } return out; }

  function rounds(lv) {
    lv = level(lv);
    var byN = {};
    return LEVELS[lv].map(function (w, i) { var n = w.syl.length; byN[n] = (byN[n] || 0); return { id: lv + '-' + w.key, level: lv, n: n, k: byN[n]++, i: i, word: w }; });
  }

  /* the tub (plak): two lumps lie in reading order in exactly half the rounds over two passes (chance, no tell either way);
     three or more never in reading order nor reversed; the decoy's place rotates */
  function deal(r, pass, decoy) {
    var n = r.n, idx = [], i, out;
    for (i = 0; i < n; i++) idx.push(i);
    if (n === 1) out = [0];
    else if (n === 2) out = (r.k + (pass || 0)) % 2 ? [1, 0] : [0, 1];
    else {
      var p = (r.k + (pass || 0)) % n, rest = idx.slice(1), rot = (r.k + (pass || 0)) % rest.length;
      rest = rest.slice(rot).concat(rest.slice(0, rot)); out = rest.slice(); out.splice(p, 0, 0);
      var same = function (a, b) { return a.join() === b.join(); }, rev = idx.slice().reverse();
      if (same(out, idx) || same(out, rev)) { var a = out[n - 1]; out[n - 1] = out[n - 2]; out[n - 2] = a; }
      if (same(out, idx) || same(out, rev)) { var b = out[1]; out[1] = out[2]; out[2] = b; }
    }
    if (decoy && r.word.decoy) out.splice((r.i + (pass || 0)) % (out.length + 1), 0, -1);
    return out;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var st = { r: r, pass: pass || 0, cuts: [], misses: 0, help: 0, show: false, last: null, done: false };
    if (r.level === 'plak') {
      st.lumps = deal(r, pass, opts.decoy).map(function (s) { return { id: s < 0 ? 'd' : 'l' + s, s: s, text: s < 0 ? r.word.decoy : r.word.syl[s] }; });
      st.tub = st.lumps.map(function (l) { return l.id; }); st.row = []; st.locked = null;
    }
    return st;
  }
  function lump(st, id) { for (var i = 0; i < st.lumps.length; i++) if (st.lumps[i].id === id) return st.lumps[i]; return null; }
  function moved(st) { st.show = false; st.last = null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- hak + letters: chop / knead ---- */
  function chop(st, x) {
    var r = st.r; if (st.done || r.level === 'plak') return { result: 'none' };
    if (r.level === 'letters') {
      var nc = cells(r.word.word).length, g = Math.round(x * nc);
      if (g <= 0 || g >= nc) return { result: 'refused' };
      if (st.cuts.indexOf(g) >= 0) return { result: 'refused' };
      st.cuts.push(g); st.cuts.sort(function (a, b) { return a - b; }); moved(st); return { result: 'cut', at: g };
    }
    if (x < MIN_GAP || x > 1 - MIN_GAP) return { result: 'refused' };
    for (var i = 0; i < st.cuts.length; i++) if (Math.abs(st.cuts[i] - x) < MIN_GAP) return { result: 'refused' };
    if (st.cuts.length + 1 >= MAX_PIECES) return { result: 'refused' };
    st.cuts.push(x); st.cuts.sort(function (a, b) { return a - b; }); moved(st); return { result: 'cut', at: x };
  }
  function knead(st, i) { if (st.done || i < 0 || i >= st.cuts.length) return false; st.cuts.splice(i, 1); moved(st); return true; }

  /* the stamp (hak): the klankgroepen printed onto the child's pieces, left to right */
  function stampPieces(st) {
    var syl = st.r.word.syl, k = st.cuts.length + 1, out = [];
    for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []);
    if (k < syl.length) out[k - 1] = syl.slice(k - 1);
    return out;
  }

  /* ---- plak: place / remove ---- */
  function place(st, id, at) {
    if (st.done || st.r.level !== 'plak' || !lump(st, id)) return false;
    var from = st.row.indexOf(id);
    if (st.locked === id) return false;
    if (from >= 0) st.row.splice(from, 1); else { var t = st.tub.indexOf(id); if (t < 0) return false; st.tub.splice(t, 1); }
    var min = st.locked ? 1 : 0;
    if (at == null || at > st.row.length) at = st.row.length;
    if (at < min) at = min;
    st.row.splice(at, 0, id); moved(st); return true;
  }
  function remove(st, id) {
    if (st.done || st.r.level !== 'plak' || st.locked === id) return false;
    var i = st.row.indexOf(id); if (i < 0) return false;
    st.row.splice(i, 1); st.tub.push(id); moved(st); return true;
  }
  /* which joints stick: only true neighbours, in order */
  function joints(st) { var out = []; for (var i = 0; i + 1 < st.row.length; i++) { var a = lump(st, st.row[i]), b = lump(st, st.row[i + 1]); out.push(a.s >= 0 && b.s === a.s + 1); } return out; }

  /* ---- Check ---- */
  function check(st) {
    var r = st.r, n = r.n;
    if (st.done) return { result: 'ok' };
    if (r.level === 'hak') {
      var k = st.cuts.length + 1;
      if (!st.cuts.length && n > 1) { st.show = true; st.last = { result: 'empty' }; return { result: 'empty' }; }
      if (k === n) return win(st);
      miss(st, { result: k < n ? 'short' : 'long', pieces: stampPieces(st), blank: Math.max(0, k - n) });
      return { result: st.last.result };
    }
    if (r.level === 'letters') {
      var sm = seams(r.word);
      if (!st.cuts.length && sm.length) { st.show = true; st.last = { result: 'empty' }; return { result: 'empty' }; }
      var healed = st.cuts.filter(function (g) { return sm.indexOf(g) < 0; }), missing = sm.filter(function (g) { return st.cuts.indexOf(g) < 0; });
      if (!healed.length && !missing.length) return win(st);
      st.cuts = st.cuts.filter(function (g) { return sm.indexOf(g) >= 0; });   /* the clay closes over a cut that is not at a seam */
      miss(st, { result: !sm.length ? 'oneOnly' : 'seams', healed: healed, missing: missing });
      return { result: st.last.result };
    }
    /* plak */
    if (!st.row.length) { st.show = true; st.last = { result: 'empty' }; return { result: 'empty' }; }
    var decoyIn = st.row.filter(function (id) { return lump(st, id).s < 0; });
    var trueInTub = st.tub.filter(function (id) { return lump(st, id).s >= 0; });
    if (decoyIn.length) {
      st.row = st.row.filter(function (id) { return lump(st, id).s >= 0; }); st.tub = st.tub.concat(decoyIn);
      miss(st, { result: 'decoy', text: r.word.decoy }); return { result: 'decoy' };
    }
    if (trueInTub.length) { st.show = true; st.last = { result: 'tub' }; return { result: 'tub' }; }
    var J = joints(st);
    if (J.every(function (x) { return x; }) && lump(st, st.row[0]).s === 0) return win(st);
    miss(st, { result: 'joints', joints: J });
    if (st.help >= 2) {
      /* miss 2: the first klankgroep rolls to the start mark and sticks there; the rest go back to the tub */
      var first = st.lumps.filter(function (l) { return l.s === 0; })[0].id;
      st.tub = st.tub.concat(st.row.filter(function (id) { return id !== first; })); st.row = [first]; st.locked = first;
      st.last.locked = first;
    }
    return { result: 'joints', joints: J };
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'ok' }; return { result: 'ok' }; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (R === 'empty') return L === 'plak' ? 'hintPlace' : 'hintChop';
    if (R === 'tub') return 'hintTub';
    if (L === 'hak') return st.help >= 2 ? 'hintClap' : R === 'short' ? 'hintShort' : 'hintLong';
    if (L === 'letters') return R === 'oneOnly' ? 'hintOneOnly' : st.help >= 2 ? 'hintDents' : 'hintHealed';
    if (R === 'decoy') return 'hintDecoy';
    return st.help >= 2 ? 'hintFirst' : 'hintJoint';
  }

  /* order-only reshuffle; never the previous order */
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.side = wide ? 200 : 0;
    L.board = wide ? W - L.side - 14 : W;
    L.snakeH = wide ? 64 : 52;
    L.letter = wide ? 32 : 22;
    L.pic = wide ? 160 : W < 340 ? 80 : 96;
    L.lumpH = wide ? 56 : 46;
    return L;
  }

  return {
    LEVELS: LEVELS, LEVEL_KEYS: LEVEL_KEYS, MAX_PIECES: MAX_PIECES, MIN_GAP: MIN_GAP,
    level: level, cells: cells, seams: seams, rounds: rounds, deal: deal, newState: newState, lump: lump,
    chop: chop, knead: knead, stampPieces: stampPieces, place: place, remove: remove, joints: joints, check: check, hint: hint, order: order, layout: layout
  };
}));
