/* =====================================================================
   stepping-stones-core.js — the model of ACTIVITY #48 of the one-by-one
   rebuild: "Bygg ordet av stavelser" (sv) → STENARNA I BÄCKEN, the
   stepping stones (RF.K.2.B; Swedish only — every language's syllable
   activity is its own row). Design sheet: docs/activities-rebuild/designs/048-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: stepping stones that each hold one syllable. The frog
   hops the word across the stream (Hoppa! = Check), and lifting a stone
   out turns it into a different word: solros without sol is a ros.
   Three levels: Räkna stavelser (lay one blank stone per syllable heard)
   · Bygg ordet (lay the syllable stones in order) · Gömda ord (lift the
   stone(s) that leave the word on the far bank).

   Every word is in approved-words-sv.json with the shown split (the gate
   re-reads it), including the förskoleklass sound-out splits klock·a,
   äng·el, äpp·le (§A.13.57), and its picture's sv label is the word.
   Picture check 2026-10-20: every library bear (camping, forest
   creatures, zoo animals) is a round teddy — a child says "nalle" — so
   björn is out of Level 1 (→ katt) and tvättbjörn → björn is out of
   Level 3 (→ gräshoppa → gräs). animals/fish is orange like the
   goldfish, so guldfisk → fisk shows the blue-silver supermarket fish.
   around the house/brush is a paintbrush (pensel) and every library
   water is a bottle: borste, vatten are shown as written words only.
   The gate caught klänning + ma = maning (→ tor) and fladdermus without
   mus = fladder, a real noun (the design called it no word): written.
   Review 2026-10-20: tand·bors·te without tand·bors = te (tea) and
   gräs·hop·pa without gräs·pa = hop (a heap) are real words: written.
   No DOM. UMD: window.SteppingStonesCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SteppingStonesCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture ('' = a written word only) | split */
  var WORDS = {};
  ('katt|animals/cat|katt;äpple|fruits/apple|äpp-le;pannkaka|breakfast/pancake|pann-ka-ka;hund|animals/dog|hund;cykel|vehicles/bicycle|cy-kel;'
  + 'fågelholk|spring/birdhouse|få-gel-holk;helikopter|vehicles/helicopter|he-li-kop-ter;sebra|animals/zebra|se-bra;sköldpadda|animals/turtle|sköld-pad-da;'
  + 'motorcykel|vehicles/motorcycle|mo-tor-cy-kel;klocka|christmas/bell|klock-a;ängel|christmas/angel|äng-el;skjorta|clothing/shirt|skjor-ta;'
  + 'banan|fruits/banana|ba-nan;panda|animals/panda|pan-da;tiger|animals/tiger|ti-ger;klänning|clothing/dress|klän-ning;blomma|spring/flower|blom-ma;'
  + 'choklad|easter/chocolate|cho-klad;paraply|weather/umbrella|pa-ra-ply;'
  + 'solros|flowers/sunflower|sol-ros;ros|flowers/rose|ros;sol|beach/sun|sol;sjöstjärna|beach/starfish|sjö-stjär-na;stjärna|christmas/star|stjär-na;sjö|camping/lake|sjö;'
  + 'husbil|camping/camper|hus-bil;hus|miscellaneous/house|hus;bil|vehicles/car|bil;tandborste|around the house/toothbrush|tand-bors-te;tand|body parts/tooth|tand;borste||bors-te;te||te;'
  + 'flodhäst|animals/hippopotamus|flod-häst;häst|animals/horse|häst;flod|camping/river|flod;fladdermus|animals/bat|flad-der-mus;mus|forest creatures/mouse|mus;fladder||flad-der;'
  + 'bokhylla|furniture/bookcase|bok-hyl-la;bok|classroom/book|bok;hylla|furniture/shelf|hyl-la;vattenmelon|fruits/watermelon|vat-ten-me-lon;melon|At the Supermarket/melon|me-lon;vatten||vat-ten;'
  + 'gräshoppa|forest creatures/grasshopper|gräs-hop-pa;gräs|spring/grass|gräs;hoppa||hop-pa;hop||hop;guldfisk|pets/goldfish|guld-fisk;fisk|At the Supermarket/fish|fisk;guld||guld')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1] || null, syl: p[2].split('-') }; });

  var COUNT = ['katt', 'äpple', 'pannkaka', 'hund', 'cykel', 'fågelholk', 'helikopter', 'sebra', 'sköldpadda', 'motorcykel'];
  /* word, decoy — the decoy is a syllable of another pool word */
  var BUILD = [['klocka', 'nan'], ['ängel', 'da'], ['skjorta', 'ger'], ['banan', 'el'], ['panda', 'ning'], ['tiger', 'klad'], ['klänning', 'tor'], ['blomma', 'ply'], ['choklad', 'ta'], ['paraply', 'ti']];
  /* compound, target, the stones to lift, the words the OTHER lifts make */
  var HIDDEN = [
    { c: 'solros', t: 'ros', lift: [0], others: ['sol'] },
    { c: 'sjöstjärna', t: 'stjärna', lift: [0], others: ['sjö'] },
    { c: 'husbil', t: 'hus', lift: [1], others: ['bil'] },
    { c: 'tandborste', t: 'tand', lift: [1, 2], others: ['borste', 'te'] },
    { c: 'flodhäst', t: 'häst', lift: [0], others: ['flod'] },
    { c: 'fladdermus', t: 'mus', lift: [0, 1], others: ['fladder'] },
    { c: 'bokhylla', t: 'bok', lift: [1, 2], others: ['hylla'] },
    { c: 'vattenmelon', t: 'melon', lift: [0, 1], others: ['vatten'] },
    { c: 'gräshoppa', t: 'gräs', lift: [1, 2], others: ['hoppa', 'hop'] },
    { c: 'guldfisk', t: 'fisk', lift: [0], others: ['guld'] }
  ];

  var LEVEL_KEYS = ['count', 'build', 'hidden'], MAX_STONES = 6;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'count'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('stepping-stones: no word ' + k); return w; }

  function rounds(lv) {
    lv = level(lv);
    if (lv === 'count') return COUNT.map(function (k, i) { return { id: 'count-' + k, level: lv, i: i, w: word(k) }; });
    if (lv === 'build') return BUILD.map(function (b, i) { return { id: 'build-' + b[0], level: lv, i: i, w: word(b[0]), decoy: b[1] }; });
    return HIDDEN.map(function (h, i) { return { id: 'hidden-' + h.c, level: lv, i: i, w: word(h.c), target: word(h.t), lift: h.lift.slice(), others: h.others.slice() }; });
  }

  /* ---- the pile (Bygg ordet): a fresh order; three or more stones never in word order nor reversed, two at chance ---- */
  function inOrder(o) { for (var i = 0; i < o.length; i++) if (o[i] !== i) return false; return true; }
  function reversed(o) { for (var i = 0; i < o.length; i++) if (o[i] !== o.length - 1 - i) return false; return true; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function pileOrder(st, rnd) {
    var ws = st.stones.filter(function (s) { return s.s >= 0; }).length;
    for (var t = 0; t < 400; t++) {
      var o = shuffle(st.stones.map(function (s) { return s.id; }), rnd);
      if (ws < 3) return o;
      var seq = o.map(function (id) { return stone(st, id).s; }).filter(function (s) { return s >= 0; });
      if (!inOrder(seq) && !reversed(seq)) return o;
    }
    return o;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random;
    var st = { r: r, pass: pass || 0, misses: 0, help: 0, show: false, last: null, done: false, laid: 0, row: [], pile: [], lifted: [], stones: [] };
    if (r.level === 'build') {
      r.w.syl.forEach(function (s, q) { st.stones.push({ id: 's' + q, s: q, text: s }); });
      if (opts.decoy) st.stones.push({ id: 's' + r.w.syl.length, s: -1, text: r.decoy });
      st.pile = pileOrder(st, rnd);
    } else if (r.level === 'hidden') {
      r.w.syl.forEach(function (s, q) { st.stones.push({ id: 's' + q, s: q, text: s }); });
    }
    return st;
  }
  function stone(st, id) { for (var i = 0; i < st.stones.length; i++) if (st.stones[i].id === id) return st.stones[i]; return null; }
  function moved(st) { st.show = false; st.last = null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- the hand ---- */
  /* Räkna stavelser: lay a blank stone / take one back (1..6) */
  function lay(st) { if (st.done || st.r.level !== 'count' || st.laid >= MAX_STONES) return false; st.laid++; moved(st); return true; }
  function unlay(st) { if (st.done || st.r.level !== 'count' || st.laid <= 0) return false; st.laid--; moved(st); return true; }
  /* Bygg ordet: put a pile stone into the row at a gap (0 = before the first stone; default the end), or move it within the row */
  function place(st, id, gap) {
    if (st.done || st.r.level !== 'build' || !stone(st, id)) return false;
    var at = st.row.indexOf(id);
    if (at >= 0) { st.row.splice(at, 1); if (gap !== undefined && gap > at) gap--; }
    else { var pi = st.pile.indexOf(id); if (pi < 0) return false; st.pile.splice(pi, 1); }
    if (gap === undefined || gap > st.row.length) gap = st.row.length;
    if (gap < 0) gap = 0;
    st.row.splice(gap, 0, id); moved(st); return true;
  }
  /* a row stone goes back to the pile (at the end of the pile) */
  function unplace(st, id) {
    if (st.done || st.r.level !== 'build') return false;
    var at = st.row.indexOf(id); if (at < 0) return false;
    st.row.splice(at, 1); st.pile.push(id); moved(st); return true;
  }
  /* Gömda ord: lift a stone out of the water / put it back in its old place */
  function lift(st, i) { if (st.done || st.r.level !== 'hidden' || i < 0 || i >= st.stones.length || st.lifted.indexOf(i) >= 0) return false; st.lifted.push(i); st.lifted.sort(); moved(st); return true; }
  function unlift(st, i) { if (st.done || st.r.level !== 'hidden') return false; var at = st.lifted.indexOf(i); if (at < 0) return false; st.lifted.splice(at, 1); moved(st); return true; }
  function kept(st) { return st.stones.filter(function (s, i) { return st.lifted.indexOf(i) < 0; }); }

  /* what the frog writes on k blank stones: too few → the last carries the rest; too many → the extras stay blank */
  function engrave(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }

  /* what the far bank shows for a made string: a picture, a written word, or no word (the leftover syllables) */
  function madeWord(r, made) {
    if (made === r.target.word) return { kind: 'target', word: made, pic: r.target.pic };
    if (r.others.indexOf(made) >= 0) { var w = word(made); return { kind: w.pic ? 'picture' : 'word', word: made, pic: w.pic }; }
    return { kind: 'none', word: null, pic: null };
  }

  /* ---- Hoppa! (Check) ---- */
  function hop(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { right: true };
    if (r.level === 'count') {
      var k = st.laid;
      if (!k) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
      if (k === n) return win(st);
      miss(st, { result: k < n ? 'short' : 'long', printed: engrave(r.w.syl, k), blank: Math.max(0, k - n) });
      return { right: false, kase: st.last.result };
    }
    if (r.level === 'build') {
      if (!st.row.length) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
      /* the frog lands while the stones are right; at the first wrong stone it tips and the stones from there float back to the pile */
      var prefix = 0;
      while (prefix < st.row.length && stone(st, st.row[prefix]).s === prefix) prefix++;
      if (prefix === st.row.length) {
        if (prefix === n) return win(st);
        st.show = true; st.last = { result: 'more', prefix: prefix }; return { right: false, kase: 'more' };
      }
      var tipped = st.row.slice(prefix), decoy = tipped[0] && stone(st, tipped[0]).s === -1;
      st.row = st.row.slice(0, prefix); st.pile = st.pile.concat(tipped);
      var nx = st.stones.filter(function (s) { return s.s === prefix; })[0];
      miss(st, { result: decoy ? 'decoy' : 'order', prefix: prefix, tipped: tipped, next: nx ? nx.id : null });
      return { right: false, kase: st.last.result };
    }
    /* hidden: the frog hops the kept stones; right iff they spell the target */
    if (!st.lifted.length) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
    var made = kept(st).map(function (s) { return s.text; }).join(''), what = madeWord(r, made);
    if (what.kind === 'target') return win(st);
    var liftedNow = st.lifted.slice();
    st.lifted = [];  /* the lifted stones splash back into place */
    miss(st, { result: what.kind === 'none' ? 'noword' : 'made', made: made, what: what, lifted: liftedNow });
    return { right: false, kase: st.last.result };
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'right' }; return { right: true }; }

  /* miss 2: Bygg ordet → only the NEXT right stone glows; Gömda ord → the stones to KEEP glow */
  function glow(st) {
    if (st.done || !st.show || st.help < 2 || !st.last) return [];
    if (st.r.level === 'build') return st.last.next ? [st.last.next] : [];
    if (st.r.level === 'hidden' && (st.last.result === 'made' || st.last.result === 'noword')) return st.stones.filter(function (s, i) { return st.r.lift.indexOf(i) < 0; }).map(function (s) { return s.id; });
    return [];
  }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (R === 'empty') return L === 'count' ? 'hintCount' : L === 'build' ? 'hintBuild' : 'hintLift';
    if (L === 'count') return st.help >= 2 ? 'hintNod' : R === 'short' ? 'hintShort' : st.last.blank > 1 ? 'hintLong2' : 'hintLong';
    if (L === 'build') {
      if (R === 'more') return 'hintMore';
      if (st.help >= 2) return 'hintNext';
      if (R === 'decoy') return 'hintDecoy';
      return st.last.prefix > 0 ? 'hintHolds' : 'hintFirst';
    }
    if (st.help >= 2) return 'hintKeep';
    return R === 'made' ? 'hintMade' : 'hintNoWord';
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* stones spread evenly across the water: each takes an equal share, centre-to-centre = water ÷ n — the spacing depends only on n, never on the word */
  function spread(n, x0, x1) { var out = [], step = (x1 - x0) / Math.max(1, n); for (var i = 0; i < n; i++) out.push(x0 + step * (i + 0.5)); return out; }

  /* the scene in px. wide: frog on the near bank (left), the far bank's frame (right), the water between;
     narrow: frog and frame stand on the top bank, the water takes the whole width */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.sign = wide ? 144 : (W < 340 ? 72 : 96);
    if (wide) {
      L.frog = 96; L.far = 112; L.sceneH = 196; L.waterTop = 22; L.waterH = 152;
      L.x0 = 104; L.x1 = W - 126; L.farX = W - 62; L.farY = 98; L.homeX = 54; L.homeY = 98;
      L.stoneMax = 96; L.stoneH = 58; L.syl = 26;
    } else {
      L.frog = 64; L.far = W < 340 ? 76 : 80; L.waterTop = L.far + (W < 340 ? 8 : 18); L.waterH = W < 340 ? 92 : 104; L.sceneH = L.waterTop + L.waterH + 10;
      L.x0 = 0; L.x1 = W; L.farX = W - L.far / 2 - 8; L.farY = L.far / 2 + 8; L.homeX = L.frog / 2 + 6; L.homeY = L.waterTop - L.frog / 2 + 4;
      L.stoneMax = 72; L.stoneH = W < 340 ? 44 : 48; L.syl = W < 340 ? 18 : 20;
    }
    L.waterY = L.waterTop + L.waterH / 2;
    return L;
  }
  /* a stone's width when n lie in the water: as wide as the gap allows (never under 44, never over stoneMax) */
  function stoneW(L, n) { return Math.max(44, Math.min(L.stoneMax, Math.floor((L.x1 - L.x0) / Math.max(1, n) - 10))); }

  return {
    WORDS: WORDS, COUNT: COUNT, BUILD: BUILD, HIDDEN: HIDDEN, LEVEL_KEYS: LEVEL_KEYS, MAX_STONES: MAX_STONES,
    level: level, word: word, rounds: rounds, newState: newState, stone: stone, pileOrder: pileOrder,
    lay: lay, unlay: unlay, place: place, unplace: unplace, lift: lift, unlift: unlift, kept: kept,
    engrave: engrave, madeWord: madeWord, hop: hop, glow: glow, hint: hint, order: order, spread: spread, layout: layout, stoneW: stoneW
  };
}));
