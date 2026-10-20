/* =====================================================================
   syllable-chain-core.js — the model of ACTIVITY #49 of the one-by-one
   rebuild: "Forma la parola con le sillabe" (it) → LA CATENA DELLE
   SILLABE, the syllable chain (RF.K.2.B; Italian only — every language's
   syllable activity is its own row). Design sheet: docs/activities-rebuild/designs/049-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a chain whose hooks are syllables — the last syllable of
   one word must be the first syllable of the next, or the clasp will not
   close (la catena di parole: pal·la → la·ma → ma·no). Three levels:
   Catene corte · Catene lunghe (hook the picture whose word STARTS with
   the open clasp's syllable — every basket hides a trick picture that
   ENDS with it) · Conta e forma (size a link to the word's beats, then
   fill its sockets with the syllables in order).

   Every word is in approved-words-it.json with the shown split (the gate
   re-reads it) and its picture's it label is the word. Picture check
   2026-10-20: around the house/sofa is a couch a child calls "divano",
   not "sofà" — the two "so" steps of Catene lunghe hook so·le instead.
   The gate caught the design's plain cards never sharing the clasp's
   first sound: matching the first LETTER solved every step. Each plain
   card now starts with the same sound and a different SPOKEN syllable.
   Review 2026-10-20: answers a child names otherwise left — vespa ("ape"),
   tastiera ("pianola"), remo, lago (a landscape), toro (a calf: "mucca") —
   and the chains were rebuilt around clear pictures (ca·ro·ta, ta·vo·lo,
   ma·ti·ta, to·po); pen·na / tor·ta no longer stand beside «pe» / «to».
   No DOM. UMD: window.SyllableChainCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SyllableChainCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  ('palla|toys/ball|pal-la;lama|farm animals/llama|la-ma;scala|tools/ladder|sca-la;luna|camping/moon|lu-na;mano|body parts/hand|ma-no;piuma|easter/feather|piu-ma;'
  + 'mora|fruits/blackberry|mo-ra;ape|farm animals/bee|a-pe;pera|At the Supermarket/pear|pe-ra;volpe|animals/fox|vol-pe;rana|camping/frog|ra-na;regalo|christmas/present|re-ga-lo;'
  + 'chiave|around the house/key|chia-ve;vestito|clothing/dress|ve-sti-to;nave|vehicles/ship|na-ve;topo|forest creatures/mouse|to-po;letto|around the house/bed|let-to;tazza|around the house/cup|taz-za;'
  + 'naso|body parts/nose|na-so;nido|spring/nest|ni-do;sole|beach/sun|so-le;vaso|around the house/vase|va-so;sedia|around the house/chair|se-dia;gufo|animals/owl|gu-fo;'
  + 'foca|ocean life/seal|fo-ca;fico|fruits/fig|fi-co;fiore|easter/flower|fio-re;cane|animals/dog|ca-ne;mucca|farm animals/cow|muc-ca;corona|accessories/crown|co-ro-na;'
  + 'lumaca|spring/snail|lu-ma-ca;carota|vegetables/carrot|ca-ro-ta;coniglio|animals/rabbit|co-ni-glio;tavolo|around the house/table|ta-vo-lo;torta|4th of July/cake|tor-ta;tenda|camping/tent|ten-da;'
  + 'scopa|around the house/broom|sco-pa;pala|around the house/shovel|pa-la;arpa|music/harp|ar-pa;penna|around the house/pen|pen-na;nuvola|spring/cloud|nu-vo-la;pecora|farm animals/sheep|pe-co-ra;'
  + 'rosa|flowers/rose|ro-sa;chitarra|music/guitar|chi-tar-ra;gallina|farm animals/hen|gal-li-na;gatto|animals/cat|gat-to;bruco|forest creatures/caterpillar|bru-co;colomba|birds 2/dove|co-lom-ba;'
  + 'banana|At the Supermarket/banana|ba-na-na;erba|spring/grass|er-ba;bottiglia|kitchen tools/bottle|bot-ti-glia;stella|christmas/star|stel-la;libro|classroom/book|li-bro;matita|classroom/pencil|ma-ti-ta;'
  + 'zebra|animals/zebra|ze-bra;farfalla|easter/butterfly|far-fal-la;fragola|fruits/strawberry|fra-go-la;ombrello|accessories/umbrella|om-brel-lo;tartaruga|animals/turtle|tar-ta-ru-ga;girasole|flowers/sunflower|gi-ra-so-le;'
  + 'bicicletta|vehicles/bicycle|bi-ci-clet-ta;arcobaleno|easter/rainbow|ar-co-ba-le-no;elicottero|vehicles/helicopter|e-li-cot-te-ro')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  /* start link, then per step: answer · trick (ends with the clasp syllable; '' = none) · neutral */
  /* start link, then per step: answer · trick (ends with the clasp syllable; '' = none) · plain card(s). Every plain card that can
     STARTS WITH THE SAME SOUND as the clasp but a different syllable (lu·na for «la»), so matching the first letter never solves a step */
  var SHORT = [
    ['palla', ['lama', 'scala', 'luna'], ['mano', 'piuma', 'mora']],
    ['ape', ['pera', 'volpe', 'piuma'], ['rana', 'mora', 'regalo']],
    ['chiave', ['vestito', 'nave', 'volpe'], ['topo', 'letto', 'tazza']],
    ['luna', ['naso', 'rana', 'nido'], ['sole', 'vaso', 'sedia']],
    ['gufo', ['foca', '', 'fico', 'fiore'], ['cane', 'mucca', 'corona']],
    ['lumaca', ['carota', 'mucca', 'coniglio'], ['tavolo', 'torta', 'tenda']],
    ['scopa', ['pala', 'arpa', 'pera'], ['lama', 'palla', 'luna']],
    ['penna', ['nave', 'luna', 'nuvola'], ['vestito', 'chiave', 'volpe']]
  ];
  var LONG = [
    ['ape', ['pecora', 'volpe', 'piuma'], ['rana', 'mora', 'rosa'], ['nave', 'luna', 'nido']],
    ['chitarra', ['rana', 'mora', 'regalo'], ['naso', 'luna', 'nuvola'], ['sole', 'vaso', 'sedia']],
    ['gallina', ['nave', 'penna', 'nido'], ['vestito', 'chiave', 'vaso'], ['topo', 'gatto', 'tazza']],
    ['pera', ['rana', 'mora', 'rosa'], ['nave', 'luna', 'nuvola'], ['vestito', 'chiave', 'volpe']],
    ['bruco', ['corona', 'fico', 'cane'], ['naso', 'rana', 'nuvola'], ['sole', 'vaso', 'sedia']],
    ['colomba', ['banana', 'erba', 'bottiglia'], ['naso', 'luna', 'nido'], ['sole', 'vaso', 'sedia']],
    ['volpe', ['pecora', 'ape', 'piuma'], ['rana', 'mora', 'regalo'], ['naso', 'luna', 'nido']],
    ['stella', ['lama', 'scala', 'libro'], ['matita', 'piuma', 'mora'], ['tavolo', 'torta', 'tenda']],
    ['scopa', ['pala', 'arpa', 'penna'], ['lama', 'scala', 'letto'], ['mano', 'piuma', 'mucca']]
  ];
  var BUILD = ['cane', 'zebra', 'farfalla', 'fragola', 'ombrello', 'tartaruga', 'girasole', 'bicicletta', 'arcobaleno', 'elicottero'];
  /* the plain pictures a basket may borrow when the trick picture is off (Trabocchetto: No) */
  var SPARE = ['gufo', 'pera', 'ape', 'rosa', 'cane', 'naso', 'letto', 'topo', 'mano', 'foca', 'sole', 'luna'];

  var LEVEL_KEYS = ['short', 'long', 'build'], MAX_SOCKETS = 5;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'short'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('syllable-chain: no word ' + k); return w; }
  function first(k) { return word(k).syl[0]; }
  function last(k) { var s = word(k).syl; return s[s.length - 1]; }

  /* a step: {syl, answer, lure, others:[…]} — the basket is answer + lure (or a second plain card) + a plain card */
  function steps(row) {
    var out = [], prev = row[0];
    for (var i = 1; i < row.length; i++) {
      var a = row[i], answer = a[0], lure = a.length === 3 ? a[1] : '', plain = a.length === 3 ? [a[2]] : [a[2], a[3]];
      out.push({ syl: last(prev), answer: answer, lure: lure || null, plain: plain });
      prev = answer;
    }
    return out;
  }
  function rounds(lv) {
    lv = level(lv);
    if (lv === 'build') return BUILD.map(function (k, i) { return { id: 'build-' + k, level: lv, i: i, w: word(k) }; });
    return (lv === 'short' ? SHORT : LONG).map(function (row, i) { return { id: lv + '-' + row[0] + '-' + i, level: lv, i: i, start: row[0], steps: steps(row) }; });
  }

  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function inOrder(o) { for (var i = 0; i < o.length; i++) if (o[i] !== i) return false; return true; }
  function reversed(o) { for (var i = 0; i < o.length; i++) if (o[i] !== o.length - 1 - i) return false; return true; }

  /* the cards of a step: with the trick picture off, a spare plain card that neither starts nor ends with the syllable and is not on the chain */
  function cards(st, k) {
    var sp = st.r.steps[k], out = [sp.answer];
    if (sp.lure && st.lure) out.push(sp.lure);
    sp.plain.forEach(function (w) { out.push(w); });
    var used = st.chain.concat(out);
    for (var i = 0; out.length < 3 && i < SPARE.length; i++) {
      var c = SPARE[(i + st.r.i * 5) % SPARE.length];
      if (used.indexOf(c) < 0 && first(c) !== sp.syl && last(c) !== sp.syl) { out.push(c); used.push(c); }
    }
    return out;
  }

  function newState(r, pass, opts) {
    opts = opts || {};
    var st = { r: r, pass: pass || 0, rnd: opts.rnd || Math.random, misses: 0, help: 0, show: false, last: null, done: false, lure: opts.lure !== false };
    if (r.level === 'build') {
      st.phase = 'count'; st.sockets = 1; st.tiles = []; st.filled = []; st.locked = [];
    } else {
      st.chain = [r.start]; st.step = 0; st.basket = deal(st);
    }
    return st;
  }
  function deal(st) { return shuffle(cards(st, st.step), st.rnd); }
  function clasp(st) { return st.done || st.r.level === 'build' ? null : st.r.steps[st.step].syl; }
  function moved(st) { st.show = false; st.last = null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* ---- Catene: the hook IS the check ---- */
  function hook(st, k) {
    if (st.done || st.r.level === 'build' || st.basket.indexOf(k) < 0) return { closes: false, invalid: true };
    var syl = clasp(st), f = first(k);
    if (f === syl) {
      st.chain.push(k); st.step++; st.misses = 0; st.help = 0; moved(st);
      if (st.step >= st.r.steps.length) { st.done = true; st.basket = []; st.last = { result: 'right' }; return { closes: true, done: true }; }
      st.basket = deal(st);
      return { closes: true };
    }
    var lure = last(k) === syl;
    miss(st, { result: lure ? 'lure' : 'wrong', word: k, first: f, syl: syl, prev: st.chain[st.chain.length - 1] });
    return { closes: false, cardFirst: f, clasp: syl, isLure: lure };
  }
  /* only the LAST hooked link comes off (never the start link) */
  function unhookLast(st) {
    if (st.done || st.r.level === 'build' || st.chain.length < 2) return false;
    st.chain.pop(); st.step--; st.misses = 0; st.help = 0; moved(st); st.basket = deal(st); return true;
  }
  /* Controlla with no hook: a hint, no miss */
  function ask(st) { if (st.done) return false; st.show = true; st.last = { result: 'empty' }; return true; }
  /* miss 2: every basket card shows its first syllable */
  function tags(st) { return !st.done && st.show && st.help >= 2 && st.r.level !== 'build' ? st.basket.map(function (k) { return { word: k, first: first(k) }; }) : null; }

  /* ---- Conta e forma ---- */
  function setSockets(st, n) { if (st.done || st.r.level !== 'build' || st.phase !== 'count' || n < 1 || n > MAX_SOCKETS || n === st.sockets) return false; st.sockets = n; moved(st); return true; }
  /* what the sockets hold after a count: too few → the last holds the rest; too many → the extras stay empty */
  function engrave(syl, k) { var out = []; for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []); if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1); return out; }
  function tileOrder(n, rnd) {
    for (var t = 0; t < 400; t++) { var o = shuffle(Array.apply(null, Array(n)).map(function (_, i) { return i; }), rnd); if (n < 3 || (!inOrder(o) && !reversed(o))) return o; }
    return o;
  }
  function countCheck(st) {
    if (st.done || st.r.level !== 'build' || st.phase !== 'count') return { right: false };
    var n = st.r.w.syl.length, k = st.sockets;
    if (k === n) {
      st.phase = 'build'; st.misses = 0; st.help = 0; moved(st);
      st.tiles = tileOrder(n, st.rnd).map(function (s) { return { id: 't' + s, s: s, text: st.r.w.syl[s] }; });
      st.filled = []; for (var i = 0; i < n; i++) st.filled.push(null);
      st.locked = [];
      return { right: true, kase: 'count' };
    }
    miss(st, { result: k < n ? 'short' : 'long', printed: engrave(st.r.w.syl, k), blank: Math.max(0, k - n) });
    return { right: false, kase: st.last.result };
  }
  function tile(st, id) { for (var i = 0; i < st.tiles.length; i++) if (st.tiles[i].id === id) return st.tiles[i]; return null; }
  function fill(st, id, at) {
    if (st.done || st.phase !== 'build' || !tile(st, id) || st.filled.indexOf(id) >= 0) return false;
    if (at === undefined) at = st.filled.indexOf(null);
    if (at < 0 || at >= st.filled.length || st.filled[at] !== null) return false;
    st.filled[at] = id; moved(st); return true;
  }
  function unfill(st, at) { if (st.done || st.phase !== 'build' || !st.filled[at] || st.locked.indexOf(at) >= 0) return false; st.filled[at] = null; moved(st); return true; }
  function buildCheck(st) {
    if (st.done || st.phase !== 'build') return { right: false };
    if (st.filled.every(function (x) { return x === null; })) { st.show = true; st.last = { result: 'empty' }; return { right: false, kase: 'empty' }; }
    var ok = [], wrong = [];
    st.filled.forEach(function (id, i) { if (id === null) return; if (tile(st, id).s === i) ok.push(i); else wrong.push(i); });
    ok.forEach(function (i) { if (st.locked.indexOf(i) < 0) st.locked.push(i); });
    if (ok.length === st.filled.length) { st.done = true; st.show = false; st.last = { result: 'right' }; return { right: true }; }
    wrong.forEach(function (i) { st.filled[i] = null; });
    if (!wrong.length) { st.show = true; st.last = { result: 'more', locked: ok.slice() }; return { right: false, kase: 'more' }; }
    miss(st, { result: 'build', locked: ok.slice(), returned: wrong.slice() });
    /* miss 2: the first wrong socket's tile flies in by itself */
    if (st.help >= 2) {
      var at = st.filled.indexOf(null);
      if (at >= 0) { st.filled[at] = 't' + at; st.locked.push(at); st.last.auto = at; }
    }
    return { right: false, kase: 'build' };
  }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result;
    if (st.r.level !== 'build') {
      if (R === 'empty') return 'hintFind';
      if (st.help >= 2) return 'hintSlow';
      return R === 'lure' ? 'hintLure' : 'hintWrong';
    }
    if (st.phase === 'count') {
      if (R === 'empty') return 'hintCount';
      if (st.help >= 2) return 'hintClap';
      return R === 'short' ? 'hintShort' : st.last.blank > 1 ? 'hintLong2' : 'hintLong';
    }
    if (R === 'empty') return 'hintFill';
    if (R === 'more') return 'hintMore';
    if (st.help >= 2) return 'hintAuto';
    return 'hintGlow';
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* the chain in px: links + clasps, snaking into rows when the stage is narrow */
  function layout(W) {
    var L = { W: W, mode: W >= 560 ? 'wide' : 'narrow' };
    if (L.mode === 'wide') { L.linkW = 112; L.linkH = 146; L.pic = 96; L.clasp = 40; L.open = 48; L.hook = 30; L.word = 18; L.card = 120; L.cardPic = 104; L.big = 120; L.sock = 64; L.sockH = 56; L.tile = 24; }
    else if (W >= 300) { L.linkW = 90; L.linkH = 110; L.pic = 64; L.clasp = 32; L.open = 44; L.hook = 18; L.word = 14; L.card = 96; L.cardPic = 80; L.big = 80; L.sock = 52; L.sockH = 48; L.tile = 20; }
    else { L.linkW = 82; L.linkH = 106; L.pic = 64; L.clasp = 28; L.open = 44; L.hook = 14; L.word = 14; L.card = 88; L.cardPic = 72; L.big = 72; L.sock = 50; L.sockH = 46; L.tile = 20; }
    L.cols = Math.max(1, Math.floor((W - L.hook) / (L.linkW + L.clasp)));
    return L;
  }
  /* where link i sits (centre), and where its following clasp sits: serpentine rows; a row's last clasp turns down to the next row,
     the trailing open clasp turns down only when it does not fit beside the link */
  function place(L, n, open) {
    var links = [], clasps = [];
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / L.cols), k = i % L.cols, dir = row % 2 ? -1 : 1, col = dir > 0 ? k : L.cols - 1 - k;
      var x = L.hook + col * (L.linkW + L.clasp) + L.linkW / 2, y = row * (L.linkH + L.clasp) + L.linkH / 2;
      links.push({ x: x, y: y, row: row });
    }
    var nc = n - 1 + (open ? 1 : 0);
    for (var c = 0; c < nc; c++) {
      var a = links[c], nx = links[c + 1], down;
      if (nx) down = nx.row !== a.row;
      else { var dir2 = a.row % 2 ? -1 : 1, edge = a.x + dir2 * (L.linkW / 2 + L.clasp); down = edge < L.hook / 2 || edge > L.W; }
      if (down) clasps.push({ x: a.x, y: a.y + L.linkH / 2 + L.clasp / 2, down: true });
      else { var d = a.row % 2 ? -1 : 1; clasps.push({ x: a.x + d * (L.linkW / 2 + L.clasp / 2), y: a.y, down: false }); }
    }
    var bottom = 0; links.forEach(function (p) { bottom = Math.max(bottom, p.y + L.linkH / 2); }); clasps.forEach(function (p) { bottom = Math.max(bottom, p.y + L.open / 2); });
    return { links: links, clasps: clasps, h: bottom };
  }

  return {
    WORDS: WORDS, SHORT: SHORT, LONG: LONG, BUILD: BUILD, SPARE: SPARE, LEVEL_KEYS: LEVEL_KEYS, MAX_SOCKETS: MAX_SOCKETS,
    level: level, word: word, first: first, last: last, rounds: rounds, cards: cards, newState: newState, clasp: clasp,
    hook: hook, unhookLast: unhookLast, ask: ask, tags: tags, setSockets: setSockets, engrave: engrave, tileOrder: tileOrder,
    countCheck: countCheck, tile: tile, fill: fill, unfill: unfill, buildCheck: buildCheck, hint: hint, order: order, layout: layout, place: place
  };
}));
