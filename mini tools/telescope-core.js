/* =====================================================================
   telescope-core.js — the model of ACTIVITY #46 of the one-by-one
   rebuild: "Byg ordet af stavelser" → KIKKERTEN, the telescope (RF.K.2.B;
   da only — every language's syllable activity is its own row).
   Design sheet: docs/activities-rebuild/designs/046-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a telescope you pull out one click for every syllable.
   Kig! (Check) swings the view onto the picture: it is sharp only when
   the telescope has exactly as many rings as the word has syllables, in
   the right order. Too few rings and the last ring carries two syllables;
   too many and a ring stays blank. Three levels: pull it out (count),
   build it from syllable rings (blend), find the missing ring.

   Every word is policy_managed:false in approved-words-da.json (written
   and spoken syllables agree — the §20.7 Danish K-1 pool) and its picture's
   da label is the word itself. The gate re-reads both. Review 2026-10-20:
   pelikan out (all four library pelicans are drawn like a stork — "stork"
   is one syllable); badekar and papegøje out (often said bad-kar /
   pap-gøj-e) → spøgelse, medalje, ballerina. No DOM.
   UMD: window.TelescopeCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TelescopeCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  'fisk|animals/fish|fisk;banan|At the Supermarket/banana|ba-nan;lænestol|around the house/armchair|læ-ne-stol;hus|miscellaneous/house|hus;kanin|easter/bunny|ka-nin;telefon|around the house/telephone|te-le-fon;ambulance|hospital/ambulance|am-bu-lan-ce;pingvin|animals/penguin|ping-vin;gorilla|zoo animals/gorilla|go-ril-la;motorcykel|vehicles/motorcycle|mo-tor-cy-kel;engel|christmas/angel|en-gel;ballon|Things That Fly/balloon|bal-lon;klokke|christmas/bell|klok-ke;cykel|spring/bicycle|cy-kel;kjole|clothing/dress|kjo-le;zebra|animals/zebra|ze-bra;delfin|animals/dolphin|del-fin;spøgelse|miscellaneous/ghost|spø-gel-se;xylofon|music/xylophone|xy-lo-fon;ballerina|occupations/ballerina|bal-le-ri-na;traktor|vehicles/tractor|trak-tor;panda|animals/panda|pan-da;bælte|accessories/belt|bæl-te;lampe|around the house/lamp|lam-pe;tromme|music/drum|trom-me;radise|vegetables/radish|ra-di-se;medalje|accessories/medal|me-dal-je;køleskab|around the house/fridge|kø-le-skab;græshoppe|forest creatures/grasshopper|græs-hop-pe'
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  var PULL = ['fisk', 'banan', 'lænestol', 'hus', 'kanin', 'telefon', 'ambulance', 'pingvin', 'gorilla', 'motorcykel'];
  /* word, decoy ring (a syllable of another pool word) */
  var BUILD = [['engel', 'lon'], ['ballon', 'gel'], ['klokke', 'ze'], ['cykel', 'bra'], ['kjole', 'fin'], ['zebra', 'kjo'], ['delfin', 'nan'], ['spøgelse', 'fon'], ['xylofon', 'ri'], ['ballerina', 'lo']];
  /* word, the hollow ring, the other two candidates (one of the same word, one foreign) */
  var GAP = [
    { k: 'traktor', gap: 1, same: 'trak', foreign: 'ba' }, { k: 'panda', gap: 0, same: 'da', foreign: 'te' },
    { k: 'bælte', gap: 1, same: 'bæl', foreign: 'nin' }, { k: 'lampe', gap: 0, same: 'pe', foreign: 'bal' },
    { k: 'tromme', gap: 1, same: 'trom', foreign: 'lan' }, { k: 'radise', gap: 1, same: 'se', foreign: 'tor' },
    { k: 'medalje', gap: 0, same: 'je', foreign: 'ka' }, { k: 'køleskab', gap: 2, same: 'kø', foreign: 'fon' },
    { k: 'græshoppe', gap: 1, same: 'pe', foreign: 'la' }
  ];

  var LEVEL_KEYS = ['pull', 'build', 'gap'], MAX_RINGS = 4;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'pull'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('telescope: no word ' + k); return w; }

  function rounds(lv) {
    lv = level(lv);
    var out = [];
    if (lv === 'pull') PULL.forEach(function (k, i) { out.push({ id: 'pull-' + k, level: lv, i: i, w: word(k) }); });
    if (lv === 'build') { var byN = {}; BUILD.forEach(function (d, i) { var w = word(d[0]), n = w.syl.length; byN[n] = byN[n] || 0; out.push({ id: 'build-' + d[0], level: lv, i: i, k: byN[n]++, w: w, decoy: d[1] }); }); }
    if (lv === 'gap') GAP.forEach(function (d, i) { out.push({ id: 'gap-' + d.k, level: lv, i: i, w: word(d.k), gap: d.gap, same: d.same, foreign: d.foreign }); });
    return out;
  }

  /* the rack (build): two rings lie in reading order in exactly half the two-ring rounds over two passes (chance, no tell
     either way); three or more never in reading order nor reversed; the decoy's place rotates */
  function dealBuild(r, pass, extra) {
    var n = r.w.syl.length, idx = [], i, out, p = pass || 0;
    for (i = 0; i < n; i++) idx.push(i);
    if (n === 2) out = (r.k + p) % 2 ? [1, 0] : [0, 1];
    else {
      var at = (r.k + p) % n, rest = idx.slice(1), rot = (r.k + p) % rest.length;
      rest = rest.slice(rot).concat(rest.slice(0, rot)); out = rest.slice(); out.splice(at, 0, 0);
      var same = function (a, b) { return a.join() === b.join(); }, rev = idx.slice().reverse();
      if (same(out, idx) || same(out, rev)) { var a = out[n - 1]; out[n - 1] = out[n - 2]; out[n - 2] = a; }
      if (same(out, idx) || same(out, rev)) { var b = out[1]; out[1] = out[2]; out[2] = b; }
    }
    if (extra) out.splice((r.i + p) % (n + 1), 0, -1);
    return out;
  }
  /* the rack (gap): the answer's slot rotates 0/1/2 over the level */
  function dealGap(r, pass) {
    var rest = [r.same, r.foreign], at = (r.i + (pass || 0)) % 3;
    rest.splice(at, 0, r.w.syl[r.gap]); return rest;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var n = r.w.syl.length, st = { r: r, pass: pass || 0, misses: 0, help: 0, show: false, last: null, done: false, touched: false, locked: -1 };
    if (r.level === 'pull') st.out = 0;
    if (r.level === 'build') {
      st.extra = opts.extra === true;
      st.segs = []; for (var i = 0; i < n; i++) st.segs.push(null);
      st.all = dealBuild(r, pass, st.extra).map(function (s, j) { return { id: 'r' + j, s: s, text: s < 0 ? r.decoy : r.w.syl[s] }; });
      st.rack = st.all.map(function (x) { return x.id; });
    }
    if (r.level === 'gap') {
      st.segs = r.w.syl.map(function (s, i) { return i === r.gap ? null : 'fixed' + i; });
      st.all = dealGap(r, pass).map(function (t, j) { return { id: 'r' + j, text: t, s: t === r.w.syl[r.gap] ? r.gap : r.w.syl.indexOf(t) >= 0 ? -2 : -1 }; });
      st.rack = st.all.map(function (x) { return x.id; });
    }
    return st;
  }
  function ring(st, id) { for (var i = 0; i < st.all.length; i++) if (st.all[i].id === id) return st.all[i]; return null; }
  function isFixed(x) { return String(x).indexOf('fixed') === 0; }
  function sOf(st, x) { return isFixed(x) ? +String(x).slice(5) : ring(st, x).s; }
  function moved(st) { st.show = false; st.last = null; st.touched = true; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- pull: one click out / push in from ring i ---- */
  function pull(st) { if (st.done || st.r.level !== 'pull' || st.out >= MAX_RINGS) return false; st.out++; moved(st); return true; }
  function push(st, i) { if (st.done || st.r.level !== 'pull' || i < 0 || i >= st.out) return false; st.out = i; moved(st); return true; }
  /* what the look engraves onto k rings: too few → the last ring carries the rest; too many → the extra rings stay blank */
  function engrave(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }

  /* ---- build / gap: rings from the rack onto the telescope ---- */
  function fit(st, id) {
    var r = st.r; if (st.done || !st.all || !ring(st, id)) return false;
    var at = st.rack.indexOf(id); if (at < 0) return false;
    var slot = r.level === 'gap' ? r.gap : st.segs.indexOf(null); if (slot < 0) return false;
    st.rack.splice(at, 1);
    if (st.segs[slot]) st.rack.push(st.segs[slot]);
    st.segs[slot] = id; moved(st); return true;
  }
  /* take ring i off: the rings beyond it close up (build); the hollow empties (gap) */
  function unfit(st, i) {
    var r = st.r; if (st.done || !st.all || i < 0 || i >= st.segs.length || !st.segs[i] || isFixed(st.segs[i]) || i === st.locked) return false;
    st.rack.push(st.segs[i]);
    if (r.level === 'build') { st.segs.splice(i, 1); st.segs.push(null); if (st.locked > i) st.locked--; }
    else st.segs[i] = null;
    moved(st); return true;
  }
  function outermost(st) { for (var i = st.segs.length - 1; i >= 0; i--) if (st.segs[i] && !isFixed(st.segs[i]) && i !== st.locked) return i; return -1; }

  /* ---- Kig! (Check) ---- */
  function look(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { sharp: true };
    if (r.level === 'pull') {
      if (st.out === 0) { st.show = true; st.last = { result: 'empty' }; return { sharp: false, kase: 'empty' }; }
      if (st.out === n) return win(st);
      miss(st, { result: st.out < n ? 'short' : 'long', engraved: engrave(r.w.syl, st.out), blank: Math.max(0, st.out - n) });
      return { sharp: false, kase: st.last.result };
    }
    if (r.level === 'build') {
      var placed = st.segs.filter(Boolean);
      if (!placed.length) { st.show = true; st.last = { result: 'empty' }; return { sharp: false, kase: 'empty' }; }
      var decoys = st.segs.filter(function (x) { return x && ring(st, x).s === -1; });
      if (decoys.length) {
        decoys.forEach(function (x) { var i = st.segs.indexOf(x); st.segs.splice(i, 1); st.segs.push(null); st.rack.push(x); if (st.locked > i) st.locked--; });
        miss(st, { result: 'decoy' }); lockFirst(st); return { sharp: false, kase: 'decoy' };
      }
      var right = st.segs.map(function (x, i) { return !!x && sOf(st, x) === i; });
      if (right.every(Boolean)) return win(st);
      var wrong = st.segs.filter(function (x, i) { return x && sOf(st, x) !== i; });
      if (!wrong.length) { st.show = true; st.last = { result: 'empty' }; return { sharp: false, kase: 'empty' }; }
      /* the collapse: right rings stay in, wrong rings pop back to the rack */
      wrong.forEach(function (x) { st.segs[st.segs.indexOf(x)] = null; st.rack.push(x); });
      miss(st, { result: 'order', right: right });
      lockFirst(st);
      return { sharp: false, kase: 'order' };
    }
    if (r.level === 'gap') {
      var x = st.segs[r.gap];
      if (!x) { st.show = true; st.last = { result: 'empty' }; return { sharp: false, kase: 'empty' }; }
      var s = ring(st, x).s;
      if (s === r.gap) return win(st);
      st.segs[r.gap] = null; st.rack.push(x);
      miss(st, { result: s === -2 ? 'sameword' : 'foreign', text: ring(st, x).text, home: s === -2 ? r.w.syl.indexOf(ring(st, x).text) : -1 });
      return { sharp: false, kase: st.last.result };
    }
    return { sharp: false };
  }
  /* miss 2 (build): the FIRST syllable's ring fits itself onto the telescope and locks */
  function lockFirst(st) {
    if (st.help < 2 || st.locked === 0) return;
    var want = st.all.filter(function (x) { return x.s === 0; })[0].id, at = st.segs.indexOf(want);
    if (at >= 0) { st.segs.splice(at, 1); st.segs.push(null); } else st.rack.splice(st.rack.indexOf(want), 1);
    if (st.segs[0]) { var out = st.segs.pop(); if (out) st.rack.push(out); st.segs.unshift(want); } else st.segs[0] = want;
    st.locked = 0; st.last.locked = true;
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'sharp' }; return { sharp: true }; }
  /* the view is sharp only after a right look — never while pulling */
  function sharp(st) { return !!st.done; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (R === 'empty') return L === 'pull' ? 'hintPull' : L === 'build' ? 'hintBuild' : 'hintGap';
    if (L === 'pull') return st.help >= 2 ? 'hintClap' : R === 'short' ? 'hintShort' : st.last.blank > 1 ? 'hintLong2' : 'hintLong';
    if (L === 'build') return R === 'decoy' ? 'hintDecoy' : st.help >= 2 ? 'hintFirst' : st.last.right.some(Boolean) ? 'hintGlow' : 'hintNoneRight';
    return st.help >= 2 ? 'hintListen' : R === 'sameword' ? 'hintSameWord' : 'hintForeign';
  }

  /* order-only reshuffle; never the previous order */
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* every ring is the SAME size (a taper would show the order of the syllables) */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.cap = wide ? 40 : W < 300 ? 12 : 20; L.lens = wide ? 18 : 12; L.main = wide ? 110 : W < 300 ? 36 : 52;
    L.segH = wide ? 52 : 44;
    /* the sea's padding and the 44-px lens handle come off the width before the four rings share it */
    L.seg = Math.max(44, Math.min(84, Math.floor((W - (wide ? 24 : 14) - L.cap - L.main - 44) / MAX_RINGS)));
    L.syl = wide ? 26 : 18;
    L.view = wide ? 220 : 150; L.pic = wide ? 144 : 96; L.viewPic = wide ? 190 : 124;
    return L;
  }

  return {
    WORDS: WORDS, PULL: PULL, BUILD: BUILD, GAP: GAP, LEVEL_KEYS: LEVEL_KEYS, MAX_RINGS: MAX_RINGS,
    level: level, word: word, rounds: rounds, dealBuild: dealBuild, dealGap: dealGap, newState: newState, ring: ring, isFixed: isFixed,
    pull: pull, push: push, engrave: engrave, fit: fit, unfit: unfit, outermost: outermost, look: look, sharp: sharp, hint: hint, order: order, layout: layout
  };
}));
