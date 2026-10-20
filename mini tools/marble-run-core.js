/* =====================================================================
   marble-run-core.js — the model of ACTIVITY #53 of the one-by-one
   rebuild: "Muodosta sana tavuista" (fi) → TAVUKUULARATA, the syllable
   marble run (RF.K.2.B; Finnish only — every language's syllable
   activity is its own row). Design sheet:
   docs/activities-rebuild/designs/053-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: syllables are pieces of a marble track. Put pieces on
   the six places of the pegboard and let the marble go: it reads the
   track aloud as it rolls — each piece's syllable joins the word strip —
   and drops into the picture's cup only when the strip says the
   picture's name. A gap and it falls through; at the end of a wrong
   track it rolls past the cup into the side dish. Every piece carries an
   ENTRY STEP as high as the consonants before its first vowel (0, 1 or
   2+): the marble cannot climb a step of 2 after the first piece — the
   Finnish tavutus rule (in a native word a syllable after the first
   starts with at most one consonant: kis-sa, never ki-ssa) enforced by
   the track. Three levels: Lyhyet sanat · Pitkät sanat · Tavuvahti.

   Every word is in approved-words-fi.json with the shown split (the gate
   re-reads it) and its picture's fi label is the word. Native review
   2026-10-20: pannukakku out (the library pancake is a stack of letut)
   → mansikka; vene out (every library boat has a cabin: laiva) → laiva. No DOM. UMD: window.MarbleRunCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MarbleRunCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  ('kuu|space/moon|kuu;vyö|clothing/belt|vyö;talo|miscellaneous/house|ta-lo;auto|vehicles/car|au-to;koira|animals/dog|koi-ra;karhu|camping/bear|kar-hu;'
  + 'kala|animals/fish|ka-la;juna|toys/train|ju-na;siili|forest creatures/hedgehog|sii-li;laiva|vehicles/ship|lai-va;seepra|animals/zebra|seep-ra;'
  + 'aurinko|beach/sun|au-rin-ko;hevonen|farm animals/horse|he-vo-nen;omena|fruits/apple|o-me-na;banaani|fruits/banana|ba-naa-ni;enkeli|christmas/angel|en-ke-li;'
  + 'perhonen|insects and bugs/butterfly|per-ho-nen;tiikeri|animals/tiger|tii-ke-ri;sateenvarjo|weather/umbrella|sa-teen-var-jo;lumiukko|winter/snowman|lu-mi-uk-ko;'
  + 'mansikka|fruits/strawberry|man-sik-ka;linnunpönttö|spring/birdhouse|lin-nun-pönt-tö;sateenkaari|weather/rainbow|sa-teen-kaa-ri;auringonkukka|flowers/sunflower|au-rin-gon-kuk-ka;'
  + 'kissa|animals/cat|kis-sa;kukka|summer/flower|kuk-ka;pallo|toys/ball|pal-lo;kakku|4th of July/cake|kak-ku;kello|christmas/bell|kel-lo;'
  + 'porkkana|vegetables/carrot|pork-ka-na;kynttilä|christmas/candle|kynt-ti-lä;kilpikonna|animals/turtle|kil-pi-kon-na;kettu|animals/fox|ket-tu;sukka|accessories/sock|suk-ka')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  /* word, decoy piece [syllable, source word] */
  var SHORT = [['kuu', ['ku', 'kakku']], ['vyö', ['vo', 'hevonen']], ['talo', ['la', 'kala']], ['auto', ['ko', 'aurinko']], ['koira', ['ri', 'tiikeri']], ['karhu', ['ka', 'kala']],
    ['kala', ['lo', 'talo']], ['juna', ['nun', 'linnunpönttö']], ['siili', ['lu', 'lumiukko']], ['laiva', ['li', 'siili']], ['seepra', ['sa', 'sateenvarjo']]];
  var LONG = [['aurinko', ['kon', 'kilpikonna']], ['hevonen', ['ho', 'perhonen']], ['omena', ['mi', 'lumiukko']], ['banaani', ['na', 'porkkana']], ['enkeli', ['kel', 'kello']],
    ['perhonen', ['vo', 'hevonen']], ['tiikeri', ['ti', 'kynttilä']], ['sateenvarjo', ['kaa', 'sateenkaari']], ['lumiukko', ['lo', 'talo']], ['mansikka', ['kuk', 'kukka']],
    ['linnunpönttö', ['ni', 'banaani']], ['sateenkaari', ['var', 'sateenvarjo']], ['auringonkukka', ['ko', 'aurinko']]];
  /* Tavuvahti: the word and its WRONG split (the double consonant kept together); its pieces that differ from the right split lie on the tray too */
  var GUARD = [['kissa', 'ki-ssa'], ['kukka', 'ku-kka'], ['pallo', 'pa-llo'], ['kakku', 'ka-kku'], ['kello', 'ke-llo'], ['porkkana', 'por-kka-na'],
    ['kynttilä', 'kyn-tti-lä'], ['kilpikonna', 'kil-pi-ko-nna'], ['kettu', 'ke-ttu'], ['sukka', 'su-kka']];

  var LEVEL_KEYS = ['short', 'long', 'guard'], PLACES = 6, VOWELS = 'aeiouyäö';
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'short'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('marble-run: no word ' + k); return w; }
  /* the entry step: consonants before the first vowel, capped at 2 */
  function stepOf(text) { var n = 0; for (var i = 0; i < text.length; i++) { if (VOWELS.indexOf(text[i]) >= 0) break; n++; } return Math.min(2, n); }

  function rounds(lv) {
    lv = level(lv);
    if (lv === 'guard') return GUARD.map(function (g, i) { var w = word(g[0]), bad = g[1].split('-'); return { id: 'guard-' + g[0], level: lv, i: i, w: w, wrong: bad, extra: bad.filter(function (s) { return w.syl.indexOf(s) < 0; }) }; });
    return (lv === 'short' ? SHORT : LONG).map(function (t, i) { return { id: lv + '-' + t[0], level: lv, i: i, w: word(t[0]), decoy: { text: t[1][0], src: t[1][1] } }; });
  }

  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function isDerangement(p) { for (var i = 0; i < p.length; i++) if (p[i] === i) return false; return true; }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random, n = r.w.syl.length;
    var st = { r: r, pass: pass || 0, pieces: [], places: [], tray: [], misses: 0, help: 0, show: false, last: null, ride: null, done: false };
    for (var k = 0; k < PLACES; k++) st.places.push(null);
    r.w.syl.forEach(function (s, q) { st.pieces.push({ id: 'p' + q, text: s, step: stepOf(s), own: q }); });
    var extra = [];
    if (r.level === 'guard') r.extra.forEach(function (s, q) { extra.push({ id: 'w' + q, text: s, step: stepOf(s), own: -1, wrong: true }); });
    else if (opts.decoy !== false) extra.push({ id: 'x0', text: r.decoy.text, step: stepOf(r.decoy.text), own: -1, decoy: true });
    st.pieces = st.pieces.concat(extra);
    /* the tray: three or more own pieces a derangement of word order, two at chance; the others at uniformly drawn places */
    var p = r.w.syl.map(function (_, q) { return q; });
    if (n === 2) shuffle(p, rnd);
    else if (n > 2) for (var t = 0; t < 400; t++) { shuffle(p, rnd); if (isDerangement(p)) break; }
    st.tray = p.map(function (q) { return 'p' + q; });
    extra.forEach(function (x) { st.tray.splice(Math.floor(rnd() * (st.tray.length + 1)), 0, x.id); });
    return st;
  }
  function byId(st, id) { for (var i = 0; i < st.pieces.length; i++) if (st.pieces[i].id === id) return st.pieces[i]; return null; }
  /* any move takes the ride and the help away until the next Check */
  function moved(st) { st.ride = null; st.show = false; st.last = null; }

  /* ---- the hand ---- */
  /* put a piece on a place; a piece already there goes where this one came from (another place, or the tray) */
  function place(st, id, k) {
    if (st.done || !byId(st, id) || k < 0 || k >= PLACES) return false;
    var from = st.places.indexOf(id), occ = st.places[k];
    if (from === k) return false;
    if (from >= 0) st.places[from] = occ;
    else { st.tray.splice(st.tray.indexOf(id), 1); if (occ) st.tray.push(occ); }
    st.places[k] = id; moved(st); return true;
  }
  function firstFree(st) { return st.places.indexOf(null); }
  function remove(st, id) {
    var k = st.places.indexOf(id);
    if (st.done || k < 0) return false;
    st.places[k] = null; st.tray.push(id); moved(st); return true;
  }

  /* ---- Check = let the marble go ---- */
  /* the ride: from place 1, piece by piece; an empty place with a piece later = a gap (it falls); a step of 2 after the first piece stops it (it rolls back); the end of the track = the cup if the strip says the word */
  function rideOf(st) {
    var r = st.r, last = -1, events = [], read = '', entered = [];
    st.places.forEach(function (id, k) { if (id) last = k; });
    for (var k = 0; k <= last; k++) {
      var id = st.places[k];
      if (!id) { events.push({ place: k, kind: 'gap' }); return { read: read, entered: entered, events: events, stop: 'gap', at: k, landed: false }; }
      var pc = byId(st, id);
      if (k > 0 && pc.step >= 2) { events.push({ place: k, kind: 'step' }); return { read: read, entered: entered, events: events, stop: 'step', at: k, landed: false }; }
      events.push({ place: k, kind: 'enter' }); read += pc.text; entered.push(id);
    }
    events.push({ place: last + 1, kind: 'end' });
    return { read: read, entered: entered, events: events, stop: 'end', at: last + 1, landed: read === r.w.word && entered.every(function (id, i) { return byId(st, id).own === i; }) };
  }
  function release(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { ok: true };
    if (st.places.every(function (x) { return !x; })) { st.show = true; st.last = { result: 'empty' }; st.ride = null; return { ok: false, kase: 'empty' }; }
    if (!st.places[0]) { st.show = true; st.last = { result: 'nostart' }; st.ride = null; return { ok: false, kase: 'nostart' }; }
    var ride = rideOf(st); st.ride = ride;
    if (ride.landed) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true, ride: ride }; }
    var kase;
    if (ride.stop === 'gap') kase = 'gap';
    else if (ride.stop === 'step') kase = 'step';
    else if (ride.entered.some(function (id) { return byId(st, id).own < 0; })) kase = lengthOnly(ride.read, r.w.word) ? 'length' : 'other';
    else if (ride.entered.length < n) kase = 'short';
    else kase = 'order';
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: kase, read: ride.read, at: ride.at };
    return { ok: false, kase: kase, ride: ride };
  }
  /* miss 2 — the shadow track: n outlines from place 1, and the word in pale grey with a divider at each syllable */
  /* two words that differ only in a sound's length (ku/kuu, kisa/kissa): the same once doubled letters are made single */
  function single(s) { return s.replace(/(.)\1+/g, '$1'); }
  function lengthOnly(a, b) { return a !== b && single(a) === single(b); }
  function shadowOn(st) { return !st.done && st.show && st.help >= 2; }
  /* the first letter of a finished wrong ride that differs from the word (marked, the word itself never shown) */
  function firstDiff(st) {
    var rd = st.ride; if (!rd || rd.stop !== 'end' || rd.landed) return -1;
    var w = st.r.w.word; for (var i = 0; i < Math.max(rd.read.length, w.length); i++) if (rd.read[i] !== w[i]) return Math.min(i, rd.read.length - 1);
    return -1;
  }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result;
    if (R === 'empty') return 'hintEmpty';
    if (R === 'nostart') return 'hintStart';
    if (st.help >= 2) return 'hintShadow';
    return { gap: 'hintGap', step: 'hintStep', length: 'hintLength', other: 'hintOther', short: 'hintShort', order: 'hintOrder' }[R];
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.perRow = wide ? 6 : 3; L.funnel = wide ? 72 : 52;
    L.pw = Math.min(wide ? 92 : 84, Math.floor((W - L.funnel - 34) / L.perRow)); L.ph = wide ? 54 : 50;
    L.fs = wide ? 30 : 26; L.slope = wide ? 12 : 6; L.rowGap = wide ? 34 : 14; L.top = wide ? 26 : 16;
    L.pic = wide ? 128 : (W < 340 ? 72 : 92);
    return L;
  }
  /* the six places on the board (top-left corner of each piece): one gentle slope on wide boards, two rows of three on phones */
  function placeXY(L, k) {
    var row = Math.floor(k / L.perRow), col = k % L.perRow;
    return { x: L.funnel + 8 + col * (L.pw + 2), y: L.top + row * (L.ph + L.rowGap + 2 * L.slope) + col * L.slope };
  }

  return {
    WORDS: WORDS, SHORT: SHORT, LONG: LONG, GUARD: GUARD, LEVEL_KEYS: LEVEL_KEYS, PLACES: PLACES,
    level: level, word: word, stepOf: stepOf, rounds: rounds, newState: newState, byId: byId, isDerangement: isDerangement,
    place: place, firstFree: firstFree, remove: remove, rideOf: rideOf, release: release, lengthOnly: lengthOnly, shadowOn: shadowOn, firstDiff: firstDiff,
    hint: hint, order: order, layout: layout, placeXY: placeXY
  };
}));
