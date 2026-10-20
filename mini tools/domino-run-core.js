/* =====================================================================
   domino-run-core.js — the model of ACTIVITY #50 of the one-by-one
   rebuild: "Forma las sílabas" (es) → LA FILA DE FICHAS, the domino run
   (RF.K.2.B; Spanish only — every language's syllable activity is its own
   row). Design sheet: docs/activities-rebuild/designs/050-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: syllables as dominoes. Stand them on their marks and push
   the first (¡Empuja! = Check): they topple faster and faster, each landing
   face-up a little closer to the one before, until the fallen syllables
   close up into the word. A gap stops the run. Three levels: Completa la
   palabra (one domino missing) · Ordena las fichas (build the word) ·
   ¿Cuántas fichas? (blank dominoes, one per syllable heard).

   Every word is in approved-words-es.json with the shown split (the gate
   re-reads it, accents and güi kept) and its picture's es label is the
   word. The old row's sapo pointed at a toad the library does not have →
   rana stays a spare. Review 2026-10-20: trick dominoes / candidates that
   spelled a real word — man·za·na (zanahoria + man), tor·tu·ra (tortuga
   + ra), pe·ri·ta (pelota + ri), to·ca, a·ro — swapped; pez out (many
   Mexican children say «pescado») → flor. No DOM. UMD: window.DominoRunCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DominoRunCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  ('mesa|furniture/table|me-sa;luna|space/moon|lu-na;pelota|toys/ball|pe-lo-ta;jirafa|animals/giraffe|ji-ra-fa;mariposa|insects and bugs/butterfly|ma-ri-po-sa;'
  + 'girasol|flowers/sunflower|gi-ra-sol;bicicleta|vehicles/bicycle|bi-ci-cle-ta;elefante|animals/elephant|e-le-fan-te;helicóptero|vehicles/helicopter|he-li-cóp-te-ro;conejo|animals/rabbit|co-ne-jo;'
  + 'gato|animals/cat|ga-to;casa|miscellaneous/house|ca-sa;faro|beach/lighthouse|fa-ro;avión|vehicles/airplane|a-vión;guante|accessories/glove|guan-te;'
  + 'tortuga|animals/turtle|tor-tu-ga;paraguas|weather/umbrella|pa-ra-guas;manzana|fruits/apple|man-za-na;calabaza|vegetables/pumpkin|ca-la-ba-za;zanahoria|vegetables/carrot|za-na-ho-ria;'
  + 'sol|beach/sun|sol;tigre|animals/tiger|ti-gre;caracol|forest creatures/snail|ca-ra-col;flor|spring/flower|flor;delfín|animals/dolphin|del-fín;'
  + 'caballo|animals/horse|ca-ba-llo;murciélago|animals/bat|mur-cié-la-go;tractor|vehicles/tractor|trac-tor;pingüino|animals/penguin|pin-güi-no;hipopótamo|animals/hippopotamus|hi-po-pó-ta-mo')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  /* word, the gap (syllable index), a same-word syllable, a foreign syllable */
  var COMPLETE = [['mesa', 1, 'me', 'lo'], ['luna', 0, 'na', 'fa'], ['pelota', 1, 'ta', 'za'], ['jirafa', 1, 'fa', 'ne'], ['mariposa', 2, 'ma', 'cle'],
    ['girasol', 2, 'gi', 'ta'], ['bicicleta', 0, 'ta', 'jo'], ['elefante', 2, 'le', 'po'], ['helicóptero', 2, 'ro', 'na'], ['conejo', 1, 'co', 'fan']];
  /* word, the trick domino (a syllable of another pool word) */
  var ORDER = [['gato', 'mur'], ['casa', 'del'], ['faro', 'vión'], ['avión', 'cle'], ['guante', 'tu'], ['tortuga', 'bi'], ['paraguas', 'za'], ['manzana', 'ba'], ['calabaza', 'ho'], ['zanahoria', 'go']];
  var COUNT = ['sol', 'tigre', 'caracol', 'flor', 'delfín', 'caballo', 'murciélago', 'tractor', 'pingüino', 'hipopótamo'];

  var LEVEL_KEYS = ['complete', 'order', 'count'], MAX_BLANKS = 6;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'complete'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('domino-run: no word ' + k); return w; }
  function rounds(lv) {
    lv = level(lv);
    if (lv === 'complete') return COMPLETE.map(function (c, i) { return { id: 'complete-' + c[0], level: lv, i: i, w: word(c[0]), gap: c[1], same: c[2], foreign: c[3] }; });
    if (lv === 'order') return ORDER.map(function (o, i) { return { id: 'order-' + o[0], level: lv, i: i, w: word(o[0]), decoy: o[1] }; });
    return COUNT.map(function (k, i) { return { id: 'count-' + k, level: lv, i: i, w: word(k) }; });
  }

  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function inOrder(o) { for (var i = 0; i < o.length; i++) if (o[i] !== i) return false; return true; }
  function reversed(o) { for (var i = 0; i < o.length; i++) if (o[i] !== o.length - 1 - i) return false; return true; }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random, n = r.w.syl.length, st = { r: r, pass: pass || 0, misses: 0, help: 0, show: false, last: null, done: false, dominoes: [], marks: [], box: [], blanks: 0, pinned: [] };
    if (r.level === 'complete') {
      r.w.syl.forEach(function (s, q) { if (q !== r.gap) st.dominoes.push({ id: 'd' + q, s: q, text: s, fixed: true }); });
      st.dominoes.push({ id: 'a', s: r.gap, text: r.w.syl[r.gap] }, { id: 'b', s: -2, text: r.same }, { id: 'c', s: -1, text: r.foreign });
      for (var i = 0; i < n; i++) st.marks.push(i === r.gap ? null : 'd' + i);
      st.box = shuffle(['a', 'b', 'c'], rnd);
    } else if (r.level === 'order') {
      r.w.syl.forEach(function (s, q) { st.dominoes.push({ id: 'd' + q, s: q, text: s }); });
      if (opts.decoy) st.dominoes.push({ id: 'x', s: -1, text: r.decoy });
      for (var j = 0; j < n; j++) st.marks.push(null);
      for (var t = 0; t < 400; t++) {
        st.box = shuffle(st.dominoes.map(function (d) { return d.id; }), rnd);
        var seq = st.box.map(function (id) { return domino(st, id).s; }).filter(function (s) { return s >= 0; });
        if (n < 3 || (!inOrder(seq) && !reversed(seq))) break;
      }
    }
    return st;
  }
  function domino(st, id) { for (var i = 0; i < st.dominoes.length; i++) if (st.dominoes[i].id === id) return st.dominoes[i]; return null; }
  function moved(st) { st.show = false; st.last = null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- the hand ---- */
  /* stand a box domino on a mark (default: the gap / the first empty mark); a domino already there goes back to the box */
  function stand(st, id, mark) {
    if (st.done || st.r.level === 'count' || !domino(st, id) || domino(st, id).fixed) return false;
    var at = st.marks.indexOf(id);
    if (mark === undefined) mark = st.r.level === 'complete' ? st.r.gap : st.marks.indexOf(null);
    if (mark < 0 || mark >= st.marks.length || st.pinned.indexOf(mark) >= 0) return false;
    var occ = st.marks[mark];
    if (occ && domino(st, occ).fixed) return false;
    if (at === mark) return false;
    if (at >= 0) st.marks[at] = occ || null; else st.box.splice(st.box.indexOf(id), 1);
    if (occ && at < 0) st.box.push(occ);
    st.marks[mark] = id; moved(st); return true;
  }
  function unstand(st, mark) {
    if (st.done || st.r.level === 'count') return false;
    var id = st.marks[mark]; if (!id || domino(st, id).fixed || st.pinned.indexOf(mark) >= 0) return false;
    st.marks[mark] = null; st.box.push(id); moved(st); return true;
  }
  function standBlank(st) { if (st.done || st.r.level !== 'count' || st.blanks >= MAX_BLANKS) return false; st.blanks++; moved(st); return true; }
  function unstandBlank(st) { if (st.done || st.r.level !== 'count' || st.blanks <= 0) return false; st.blanks--; moved(st); return true; }

  /* what k blank dominoes throw up: too few → the last throws the rest; too many → the extras throw nothing */
  function engrave(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }

  /* ---- ¡Empuja! (Check) ---- */
  function push(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { right: true };
    if (r.level === 'count') {
      var k = st.blanks;
      if (!k) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
      if (k === n) return win(st);
      miss(st, { result: k < n ? 'short' : 'long', printed: engrave(r.w.syl, k), blank: Math.max(0, k - n) });
      return { right: false, kase: st.last.result };
    }
    var placed = st.marks.filter(function (id, i) { return id && !domino(st, id).fixed; }).length;
    if (!placed) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
    /* a gap stops the run — not a miss */
    var gap = st.marks.indexOf(null);
    if (gap >= 0) { st.show = true; st.last = { result: 'stop', stoppedAt: gap }; return { right: false, kase: 'stop', stoppedAt: gap }; }
    var row = st.marks.map(function (id) { return domino(st, id); });
    var stay = [], bounced = [];
    row.forEach(function (d, i) { if (d.s === i) stay.push(i); else bounced.push(i); });
    if (!bounced.length) return win(st);
    var fallen = row.map(function (d) { return d.text; });
    if (r.level === 'complete') {
      var d0 = row[r.gap];
      st.marks[r.gap] = null; st.box.push(d0.id);
      miss(st, { result: d0.s === -2 ? 'same' : 'foreign', syl: d0.text, fallen: fallen, bounced: [r.gap] });
      return { right: false, kase: st.last.result };
    }
    var decoy = bounced.some(function (i) { return row[i].s === -1; });
    bounced.forEach(function (i) { st.box.push(st.marks[i]); st.marks[i] = null; });
    miss(st, { result: decoy ? 'decoy' : 'order', fallen: fallen, stay: stay, bounced: bounced });
    /* miss 2 (order): the first syllable's domino stands itself on the first mark and is pinned */
    if (st.help >= 2 && st.marks[0] === null) {
      var f = 'd0';
      var was = st.box.indexOf(f); if (was >= 0) st.box.splice(was, 1);
      st.marks[0] = f; st.pinned.push(0); st.last.pinned = 0;
    }
    return { right: false, kase: st.last.result };
  }
  function win(st) { st.done = true; st.show = false; st.last = { result: 'right' }; return { right: true }; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, L = st.r.level;
    if (L === 'count') { if (R === 'empty') return 'hintCount'; if (st.help >= 2) return 'hintClap'; return R === 'short' ? 'hintShort' : st.last.blank > 1 ? 'hintLong2' : 'hintLong'; }
    if (R === 'empty') return L === 'complete' ? 'hintGap' : 'hintOrder';
    if (R === 'stop') return 'hintStop';
    if (L === 'complete') { if (st.help >= 2) return 'hintListen'; return R === 'same' ? 'hintSame' : 'hintForeign'; }
    if (st.help >= 2) return 'hintFirst';
    return R === 'decoy' ? 'hintDecoy' : 'hintStay';
  }

  /* the cascade speeds up: fall interval shrinks 260 → 120 ms; each fallen tile lands closer: overlap shrinks 20 → 4 px */
  function intervals(n) { var out = []; for (var i = 0; i < n; i++) out.push(n < 2 ? 260 : Math.round(260 - 140 * i / (n - 1))); return out; }
  function overlaps(n) { var out = []; for (var i = 1; i < n; i++) out.push(n < 3 ? 12 : Math.round(20 - 16 * (i - 1) / (n - 2))); return out; }
  /* marks spread evenly along the run: each takes an equal share — the spacing depends only on n */
  function spread(n, x0, x1) { var out = [], step = (x1 - x0) / Math.max(1, n); for (var i = 0; i < n; i++) out.push(x0 + step * (i + 0.5)); return out; }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 120 : (W < 300 ? 80 : 96);
    L.dw = wide ? 56 : 44; L.dh = wide ? 104 : (W < 300 ? 76 : 82); L.syl = wide ? 26 : (W < 300 ? 19 : 21);
    L.tableH = wide ? 190 : (W < 300 ? 136 : 162); L.base = L.tableH - (wide ? 34 : 28);
    L.x0 = wide ? 10 : 4; L.x1 = W - L.x0;
    return L;
  }

  return {
    WORDS: WORDS, COMPLETE: COMPLETE, ORDER: ORDER, COUNT: COUNT, LEVEL_KEYS: LEVEL_KEYS, MAX_BLANKS: MAX_BLANKS,
    level: level, word: word, rounds: rounds, newState: newState, domino: domino, stand: stand, unstand: unstand,
    standBlank: standBlank, unstandBlank: unstandBlank, engrave: engrave, push: push, hint: hint,
    intervals: intervals, overlaps: overlaps, spread: spread, order: order, layout: layout
  };
}));
