/* =====================================================================
   kite-tail-core.js — the model of ACTIVITY #45 of the one-by-one
   rebuild: "Build Words from Syllables" → THE KITE TAIL (RF.K.2.B; en
   only — every language's syllable activity is its own row).
   Design sheet: docs/activities-rebuild/designs/045-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: every word is a kite whose tail needs exactly one bow per
   beat, in the right order — only then does it fly steady. Too few bows
   and the last bow carries two beats and the kite spins; too many and a
   blank bow drags it into the grass; a wrong order knots the tail at the
   first bow out of place. Five levels run every syllable routine of the
   K-1 worksheets on one apparatus: count (How many bows?), blend (Tie the
   word, or Write it), missing + scramble (Fix the tail), sort (The kite
   fence) and sounds per syllable (The tassels).

   en syllable boundaries are contested: a word may SHOW its split only if
   approved-words-en.json lists TeX among its agreeing sources AND the split
   is the one a child says. The gate holds that whitelist. No DOM.
   UMD: window.KiteTailCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KiteTailCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* key | picture | split */
  var WORDS = {};
  'fish|animals/fish|fish;rabbit|animals/rabbit|rab-bit;butterfly|easter/butterfly|but-ter-fly;drum|music/drum|drum;penguin|animals/penguin|pen-guin;umbrella|weather/umbrella|um-brel-la;snowman|winter/snowman|snow-man;strawberry|fruits/strawberry|straw-ber-ry;bus|vehicles/bus|bus;dolphin|animals/dolphin|dol-phin;muffin|breakfast/muffin|muf-fin;carrot|vegetables/carrot|car-rot;balloon|toys/balloon|bal-loon;pencil|classroom/pencil|pen-cil;tractor|vehicles/tractor|trac-tor;rainbow|weather/rainbow|rain-bow;cupcake|bakery/cupcake|cup-cake;airplane|vehicles/airplane|air-plane;gingerbread|christmas/gingerbread|gin-ger-bread;dragonfly|insects and bugs/dragonfly|drag-on-fly;ladder|tools/ladder|lad-der;mitten|accessories/mitten|mit-ten;basket|At the Supermarket/basket|bas-ket;sailboat|vehicles/sailboat|sail-boat;hammer|around the house/hammer|ham-mer;popcorn|At the Supermarket/popcorn|pop-corn;basketball|activities/basketball|bas-ket-ball;frog|camping/frog|frog;train|toys/train|train;panda|animals/panda|pan-da;raccoon|animals/raccoon|rac-coon;pizza|At the Supermarket/pizza|piz-za;monkey|zoo animals/monkey|mon-key;otter|zoo animals/otter|ot-ter'
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });
  /* compounds: the two parts are small words of their own (the Write hint) */
  var COMPOUNDS = ['snowman', 'rainbow', 'cupcake', 'airplane', 'sailboat', 'popcorn', 'basketball', 'gingerbread', 'dragonfly'];

  var COUNT = ['fish', 'rabbit', 'butterfly', 'drum', 'penguin', 'umbrella', 'snowman', 'strawberry', 'bus', 'dolphin'];
  var TIE = [['muffin', 'car'], ['carrot', 'fin'], ['balloon', 'pen'], ['pencil', 'bal'], ['tractor', 'rain'], ['rainbow', 'cup'], ['cupcake', 'air'], ['airplane', 'trac'], ['gingerbread', 'pop'], ['dragonfly', 'pop']];
  /* fix: a = missing (bare knot index, the box), b = scramble (the starting order) */
  var FIX = [
    { k: 'ladder', t: 'a', bare: 1, box: ['der', 'lad', 'ten', 'cil'] }, { k: 'hammer', t: 'b', start: [1, 0] },
    { k: 'mitten', t: 'a', bare: 0, box: ['mit', 'ten', 'rab', 'bow'] }, { k: 'popcorn', t: 'b', start: [1, 0] },
    { k: 'basket', t: 'a', bare: 1, box: ['ket', 'bas', 'man', 'loon'] }, { k: 'umbrella', t: 'b', start: [2, 0, 1] },
    { k: 'sailboat', t: 'a', bare: 0, box: ['sail', 'boat', 'pop', 'der'] }, { k: 'basketball', t: 'b', start: [2, 0, 1] },
    { k: 'strawberry', t: 'a', bare: 1, box: ['ber', 'ry', 'straw', 'cil'] }, { k: 'butterfly', t: 'b', start: [2, 0, 1] }
  ];
  /* the fence is sorted by the PICTURE alone: ball → bus (toys/ball is a soccer ball, "soccer ball" = three beats) and basketball → butterfly (an orange ball reads "ball", one beat) */
  var FENCE = ['bus', 'frog', 'train', 'panda', 'raccoon', 'pizza', 'butterfly', 'dragonfly', 'strawberry'];
  var FENCE23 = ['panda', 'raccoon', 'pizza', 'monkey', 'butterfly', 'dragonfly', 'strawberry', 'umbrella'];
  /* the tassels: one per sound; r-controlled er/or is ONE sound */
  /* no tassel word shares a consonant across its break: a doubled consonant (ot|ter) is ONE sound heard once, and
     counting it twice would teach "two letters = two sounds" (reviewer ruling 2026-10-20); sh/ph/ai/ow/ey/or are one sound each */
  var TASSELS = { drum: [['d', 'r', 'u', 'm']], panda: [['p', 'a', 'n'], ['d', 'a']], tractor: [['t', 'r', 'a', 'c'], ['t', 'or']], frog: [['f', 'r', 'o', 'g']], rainbow: [['r', 'ai', 'n'], ['b', 'ow']], dragonfly: [['d', 'r', 'a', 'g'], ['o', 'n'], ['f', 'l', 'y']], fish: [['f', 'i', 'sh']], dolphin: [['d', 'o', 'l'], ['ph', 'i', 'n']], monkey: [['m', 'o', 'n'], ['k', 'ey']] };
  var TASSEL_ORDER = ['drum', 'panda', 'tractor', 'frog', 'rainbow', 'dragonfly', 'fish', 'dolphin', 'monkey'];

  var LEVEL_KEYS = ['count', 'tie', 'fix', 'fence', 'tassels'], MAX_BOWS = 4, MAX_TASSELS = 5;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'count'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('kite-tail: no word ' + k); return w; }

  function rounds(lv, opts) {
    lv = level(lv); opts = opts || {};
    var out = [];
    if (lv === 'count') COUNT.forEach(function (k, i) { out.push({ id: 'count-' + k, level: lv, i: i, w: word(k) }); });
    if (lv === 'tie') { var byN = {}; TIE.forEach(function (d, i) { var w = word(d[0]), n = w.syl.length; byN[n] = byN[n] || 0; out.push({ id: 'tie-' + d[0], level: lv, i: i, k: byN[n]++, w: w, foreign: d[1] }); }); }
    if (lv === 'fix') { var ka = 0; FIX.forEach(function (d, i) { var r = { id: 'fix-' + d.k, level: lv, i: i, w: word(d.k), t: d.t }; if (d.t === 'a') { r.bare = d.bare; r.box = d.box; r.k = ka++; } else r.start = d.start; out.push(r); }); }
    if (lv === 'fence') (opts.kites === '23' ? FENCE23 : FENCE).forEach(function (k, i) { out.push({ id: 'fence-' + (opts.kites === '23' ? '23-' : '') + k, level: lv, i: i, w: word(k), kites: opts.kites === '23' ? [2, 3] : [1, 2, 3] }); });
    if (lv === 'tassels') TASSEL_ORDER.forEach(function (k, i) { out.push({ id: 'tassels-' + k, level: lv, i: i, w: word(k), sounds: TASSELS[k] }); });
    return out;
  }

  /* the box (tie): the word's bows lie in reading order in exactly half the two-beat rounds over two passes (chance, no tell
     either way), three beats never in reading order nor reversed; the foreign bow's place rotates */
  function dealTie(r, pass) {
    var n = r.w.syl.length, idx = [], i, out;
    for (i = 0; i < n; i++) idx.push(i);
    if (n === 2) out = (r.k + (pass || 0)) % 2 ? [1, 0] : [0, 1];
    else {
      var p = (r.k + (pass || 0)) % n, rest = idx.slice(1), rot = (r.k + (pass || 0)) % rest.length;
      rest = rest.slice(rot).concat(rest.slice(0, rot)); out = rest.slice(); out.splice(p, 0, 0);
      var same = function (a, b) { return a.join() === b.join(); }, rev = idx.slice().reverse();
      if (same(out, idx) || same(out, rev)) { var a = out[n - 1]; out[n - 1] = out[n - 2]; out[n - 2] = a; }
      if (same(out, idx) || same(out, rev)) { var b = out[1]; out[1] = out[2]; out[2] = b; }
    }
    out.splice((r.i + (pass || 0)) % (n + 1), 0, -1);
    return out;
  }
  /* the box (fix a): the answer's slot rotates over the level */
  function dealFix(r, pass) {
    var ans = r.w.syl[r.bare], rest = r.box.filter(function (t) { return t !== ans; }), at = (r.k + (pass || 0)) % r.box.length;
    rest.splice(at, 0, ans); return rest;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var n = r.w.syl.length, st = { r: r, pass: pass || 0, misses: 0, help: 0, show: false, last: null, done: false, touched: false };
    if (r.level === 'count') { st.bows = 1; }
    if (r.level === 'tie') {
      st.write = opts.write === true;
      st.knots = []; for (var i = 0; i < n; i++) st.knots.push(null);
      if (st.write) st.typed = st.knots.map(function () { return ''; });
      else { st.bowsAll = dealTie(r, pass).map(function (s, j) { return { id: 'b' + j, s: s, text: s < 0 ? r.foreign : r.w.syl[s] }; }); st.box = st.bowsAll.map(function (b) { return b.id; }); }
    }
    if (r.level === 'fix') {
      if (r.t === 'a') {
        st.knots = r.w.syl.map(function (s, i) { return i === r.bare ? null : 'fixed' + i; });
        st.bowsAll = dealFix(r, pass).map(function (t, j) { return { id: 'b' + j, text: t, s: t === r.w.syl[r.bare] ? r.bare : r.w.syl.indexOf(t) >= 0 ? -2 : -1 }; });
        st.box = st.bowsAll.map(function (b) { return b.id; });
      } else st.order = r.start.slice();
    }
    if (r.level === 'fence') { st.tries = {}; }
    if (r.level === 'tassels') st.tassels = r.sounds.map(function () { return 0; });
    return st;
  }
  function bow(st, id) { for (var i = 0; i < st.bowsAll.length; i++) if (st.bowsAll[i].id === id) return st.bowsAll[i]; return null; }
  function moved(st) { st.show = false; st.last = null; st.touched = true; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- count: tie / untie blank bows ---- */
  function tie(st) { if (st.done || st.r.level !== 'count' || st.bows >= MAX_BOWS) return false; st.bows++; moved(st); return true; }
  function untie(st) { if (st.done || st.r.level !== 'count' || st.bows <= 0) return false; st.bows--; moved(st); return true; }
  /* what the gust blows onto k bows */
  function printBows(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }

  /* ---- tie / fix a: bows from the box onto knots ---- */
  function tieBow(st, id, knot) {
    var r = st.r; if (st.done || !st.bowsAll || !bow(st, id)) return false;
    if (knot < 0 || knot >= st.knots.length) return false;
    if (r.level === 'fix' && knot !== r.bare) return false;
    var from = st.knots.indexOf(id), there = st.knots[knot];
    if (from === knot) return false;
    if (from >= 0) st.knots[from] = there;
    else { var b = st.box.indexOf(id); if (b < 0) return false; st.box.splice(b, 1); if (there) st.box.push(there); }
    st.knots[knot] = id; moved(st); return true;
  }
  function untieBow(st, knot) {
    if (st.done || !st.bowsAll || !st.knots[knot] || String(st.knots[knot]).indexOf('fixed') === 0) return false;
    st.box.push(st.knots[knot]); st.knots[knot] = null; moved(st); return true;
  }
  function firstFree(st) { return st.knots.indexOf(null); }
  /* ---- fix b: swap two bows on the tail ---- */
  function swap(st, i, j) { if (st.done || !st.order || i === j || i < 0 || j < 0 || i >= st.order.length || j >= st.order.length) return false; var t = st.order[i]; st.order[i] = st.order[j]; st.order[j] = t; moved(st); return true; }
  /* ---- tie (write): type the bows ---- */
  function type(st, knot, text) { if (st.done || !st.write || knot < 0 || knot >= st.typed.length) return false; st.typed[knot] = String(text).toLowerCase().replace(/[^a-z]/g, '').slice(0, 8); moved(st); return true; }
  /* ---- fence ---- */
  function tryCard(st, kite) {
    var r = st.r; if (st.done || r.level !== 'fence') return null;
    var bows = r.kites[kite], n = r.w.syl.length; if (bows == null) return null;
    st.touched = true;
    if (bows === n) { st.done = true; st.show = false; st.last = { result: 'fit', kite: kite }; return { result: 'fit' }; }
    st.tries[kite] = (st.tries[kite] || 0) + 1;
    miss(st, { result: n > bows ? 'spin' : 'sag', kite: kite, printed: printBows(r.w.syl, bows) });
    return { result: st.last.result };
  }
  /* ---- tassels ---- */
  function tassel(st, b, d) { if (st.done || st.r.level !== 'tassels' || b < 0 || b >= st.tassels.length) return false; var v = st.tassels[b] + d; if (v < 0 || v > MAX_TASSELS) return false; st.tassels[b] = v; moved(st); return true; }

  /* ---- the gust (Check) ---- */
  function gust(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { flight: 'steady' };
    if (r.level === 'count') {
      if (!st.touched && st.bows === 1 && n > 1) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      if (st.bows === 0) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      if (st.bows === n) return win(st);
      miss(st, { result: st.bows < n ? 'spin' : 'sag', printed: printBows(r.w.syl, st.bows), blank: Math.max(0, st.bows - n) });
      return { flight: st.last.result };
    }
    if (r.level === 'tie' && st.write) {
      if (st.typed.every(function (t) { return !t; })) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      var ok = st.typed.every(function (t, i) { return t === r.w.syl[i]; });
      if (ok) return win(st);
      var joined = st.typed.join('');
      if (joined !== r.w.word) { miss(st, { result: 'spell' }); return { flight: 'tangle' }; }
      var bi = 0; while (bi < n - 1 && st.typed[bi] === r.w.syl[bi]) bi++;
      var a = r.w.syl[bi], b = r.w.syl[bi + 1], kind = COMPOUNDS.indexOf(r.w.key) >= 0 ? 'compound' : a[a.length - 1] === b[0] ? 'double' : 'slow';
      miss(st, { result: 'split', kind: kind, a: a, b: b, c: b[0] }); return { flight: 'tangle' };
    }
    if (r.level === 'tie' || (r.level === 'fix' && r.t === 'a')) {
      var placed = st.knots.filter(function (x) { return x && String(x).indexOf('fixed') !== 0; });
      if (!placed.length) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      var sOf = function (x) { return String(x).indexOf('fixed') === 0 ? +String(x).slice(5) : bow(st, x).s; };
      var foreign = st.knots.filter(function (x) { return x && String(x).indexOf('fixed') !== 0 && bow(st, x).s === -1; });
      if (foreign.length) {
        foreign.forEach(function (x) { st.knots[st.knots.indexOf(x)] = null; st.box.push(x); });
        miss(st, { result: 'foreign' }); return { flight: 'tangle' };
      }
      if (r.level === 'fix' && bow(st, st.knots[r.bare]).s === -2) {
        var wrong = st.knots[r.bare]; st.knots[r.bare] = null; st.box.push(wrong);
        miss(st, { result: 'sameword', text: bow(st, wrong).text }); return { flight: 'tangle' };
      }
      var right = st.knots.map(function (x, i) { return !!x && sOf(x) === i; });
      if (right.every(Boolean)) return win(st);
      var tangleAt = right.indexOf(false), anyWrong = st.knots.some(function (x, i) { return x && sOf(x) !== i; });
      if (!anyWrong) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      miss(st, { result: 'tangle', right: right, tangleAt: tangleAt });
      return { flight: 'tangle', tangleAt: tangleAt };
    }
    if (r.level === 'fix') {
      if (st.order.every(function (s, i) { return s === i; })) return win(st);
      if (!st.touched && st.misses === 0) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      var inPlace = st.order.map(function (s, i) { return s === i; });
      miss(st, { result: 'tangle', right: inPlace, tangleAt: inPlace.indexOf(false) });
      if (st.help >= 2) { var at = inPlace.indexOf(false), want = st.order.indexOf(at); var t = st.order[at]; st.order[at] = st.order[want]; st.order[want] = t; st.last.autoFixed = at; }
      return { flight: 'tangle' };
    }
    if (r.level === 'tassels') {
      if (st.tassels.every(function (t) { return !t; })) { st.show = true; st.last = { result: 'empty' }; return { flight: 'none' }; }
      var per = r.sounds.map(function (g, i) { return { missing: Math.max(0, g.length - st.tassels[i]), extra: Math.max(0, st.tassels[i] - g.length) }; });
      if (per.every(function (p) { return !p.missing && !p.extra; })) return win(st);
      miss(st, { result: per.some(function (p) { return p.missing; }) ? 'missing' : 'extra', per: per });
      return { flight: 'lopsided' };
    }
    return { flight: 'none' };
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'steady' }; return { flight: 'steady' }; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (R === 'empty') return L === 'count' ? 'hintCount' : L === 'tassels' ? 'hintTassel' : L === 'fix' && st.r.t === 'b' ? 'hintSwap' : 'hintTie';
    if (L === 'count') return st.help >= 2 ? 'hintBob' : R === 'spin' ? 'hintSpin' : 'hintSag';
    if (L === 'fence') return R === 'spin' ? 'hintFenceFew' : 'hintFenceMany';
    if (L === 'tassels') return R === 'missing' ? 'hintNoTassel' : 'hintNoSound';
    if (R === 'spell') return 'hintSpell';
    if (R === 'split') return st.last.kind === 'double' ? 'hintDouble' : st.last.kind === 'compound' ? 'hintCompound' : 'hintSlow';
    if (R === 'foreign') return 'hintForeign';
    if (R === 'sameword') return 'hintSameWord';
    if (L === 'fix' && st.r.t === 'b') return st.help >= 2 ? 'hintAutoFix' : 'hintSwapGlow';
    return st.help >= 2 ? 'hintNext' : 'hintGlow';
  }
  /* miss 2 (tie / fix a): the next right bow in the box */
  function nextBow(st) {
    if (!st.bowsAll || st.help < 2 || !st.show) return null;
    var knot = st.r.level === 'fix' ? st.r.bare : st.knots.findIndex(function (x, i) { return !x || bow(st, x).s !== i; });
    if (knot < 0) return null;
    var want = st.r.level === 'fix' ? st.r.bare : knot;
    var b = st.bowsAll.filter(function (x) { return x.s === want && st.box.indexOf(x.id) >= 0; })[0];
    return b ? b.id : null;
  }

  /* order-only reshuffle; never the previous order */
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 112 : 80;
    L.bowW = wide ? 84 : W < 340 ? 60 : 66;
    L.bowH = wide ? 56 : W < 340 ? 44 : 46;
    L.syl = wide ? 26 : 20;
    L.cardPic = wide ? 96 : 72;
    return L;
  }

  return {
    WORDS: WORDS, COMPOUNDS: COMPOUNDS, COUNT: COUNT, TIE: TIE, FIX: FIX, FENCE: FENCE, FENCE23: FENCE23, TASSELS: TASSELS, LEVEL_KEYS: LEVEL_KEYS, MAX_BOWS: MAX_BOWS, MAX_TASSELS: MAX_TASSELS,
    level: level, word: word, rounds: rounds, dealTie: dealTie, dealFix: dealFix, newState: newState, bow: bow, tie: tie, untie: untie, printBows: printBows,
    tieBow: tieBow, untieBow: untieBow, firstFree: firstFree, swap: swap, type: type, tryCard: tryCard, tassel: tassel, gust: gust, hint: hint, nextBow: nextBow, order: order, layout: layout
  };
}));
