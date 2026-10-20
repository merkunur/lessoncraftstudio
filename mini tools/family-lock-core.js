/* =====================================================================
   family-lock-core.js — the model of ACTIVITY #51 of the one-by-one
   rebuild: "Forme as sílabas" (pt-BR) → O CADEADO DAS FAMÍLIAS, the
   syllable-family lock (RF.K.2.B; Brazilian Portuguese only — every
   language's syllable activity is its own row). Design sheet:
   docs/activities-rebuild/designs/051-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the word is a combination lock. Every wheel is one
   família silábica — ga ge gi go gu — and the lock opens only when each
   wheel shows the syllable the picture's name needs. A plate under the
   wheels always reads what they say right now ("gi·to", "ga·to").
   Three levels: Duas sílabas (two rolling wheels) · Palavras maiores
   (three or four, a coda stays on its wheel: bar ber bir bor bur) ·
   Monte o cadeado (loose wheels into the sockets in order, plus one
   decoy wheel from the family of one of the word's own syllables).

   Every word is in approved-words-pt.json with the shown split (the gate
   re-reads it) and its picture's pt label is the word. All 28 words of
   the old row are kept. foca is new (every library duck is drawn as a
   duckling, so pato would name a picture a child calls «patinho»); cama
   was already there; vaca, sapato, macaco, janela, panela and jacaré are
   new family words. No DOM. UMD: window.FamilyLockCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FamilyLockCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  ('gato|animals/cat|ga-to;bola|toys/ball|bo-la;casa|miscellaneous/house|ca-sa;foca|ocean life/seal|fo-ca;mesa|around the house/table|me-sa;'
  + 'luva|accessories/glove|lu-va;pipa|toys/kite|pi-pa;vela|christmas/candle|ve-la;cama|around the house/bed|ca-ma;vaca|farm animals/cow|va-ca;'
  + 'girafa|animals/giraffe|gi-ra-fa;borboleta|insects and bugs/butterfly|bor-bo-le-ta;girassol|flowers/sunflower|gi-ras-sol;morango|fruits/strawberry|mo-ran-go;'
  + 'bicicleta|vehicles/bicycle|bi-ci-cle-ta;elefante|animals/elephant|e-le-fan-te;tartaruga|animals/turtle|tar-ta-ru-ga;sapato|clothing/shoe|sa-pa-to;'
  + 'macaco|zoo animals/monkey|ma-ca-co;janela|around the house/window|ja-ne-la;farol|beach/lighthouse|fa-rol;panela|around the house/pot|pa-ne-la;formiga|insects and bugs/ant|for-mi-ga;'
  + 'maçã|fruits/apple|ma-çã;cenoura|vegetables/carrot|ce-nou-ra;abóbora|vegetables/pumpkin|a-bó-bo-ra;jacaré|reptiles and Amphibians/alligator|ja-ca-ré;'
  + 'helicóptero|vehicles/helicopter|he-li-cóp-te-ro;pinguim|animals/penguin|pin-guim;balão|toys/balloon|ba-lão;golfinho|animals/dolphin|gol-fi-nho;'
  + 'trator|vehicles/tractor|tra-tor;tigre|animals/tiger|ti-gre;zebra|animals/zebra|ze-bra;panda|animals/panda|pan-da')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  var TWO = ['gato', 'bola', 'casa', 'foca', 'mesa', 'luva', 'pipa', 'vela', 'cama', 'vaca'];
  var LONG = ['girafa', 'borboleta', 'girassol', 'morango', 'bicicleta', 'elefante', 'tartaruga', 'sapato', 'macaco', 'janela', 'panela', 'formiga'];
  /* word, the decoy wheel: a sibling from the family of one of the word's own syllables, never spelling a real word in its place */
  var BUILD = [['maçã', 'mo'], ['cenoura', 'ri'], ['abóbora', 'ba'], ['jacaré', 'co'], ['helicóptero', 'la'], ['pinguim', 'pan'],
    ['balão', 'be'], ['golfinho', 'nhe'], ['trator', 'tro'], ['tigre', 'gra'], ['zebra', 'bri'], ['panda', 'du'], ['farol', 'fo']];

  /* faces a wheel skips (native review 2026-10-20): a word a teacher would not want shown (pi·pi, po·po, sa·pa·ta, sa·pu·ta)
     or ANOTHER name for the same picture, which the lock would mark wrong (ga·ta, ma·ca·ca, e·le·fan·ta) */
  var SKIP = { pipa: [[], ['pi', 'po']], gato: [[], ['ta']], macaco: [[], [], ['ca']], elefante: [[], [], [], ['ta']], sapato: [[], ['pu'], ['ta']] };

  var LEVEL_KEYS = ['two', 'long', 'build'], VOWELS = ['a', 'e', 'i', 'o', 'u'], CEDILLA = ['a', 'o', 'u'], OFFSETS = [1, 2, -1, -2];
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'two'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('family-lock: no word ' + k); return w; }

  /* a syllable's família: onset + one plain vowel + coda → the five (ç: three) faces in the order a e i o u.
     null when it cannot roll through a plain family: an accent or tilde, two vowels (gu/qu, diphthongs), no vowel */
  function familyFaces(s) {
    var m = /^([bcdfghjklmnpqrstvwxyzç]*)([aeiou])([bcdfghjklmnpqrstvwxyzç]*)$/.exec(s);
    if (!m) return null;
    var onset = m[1], coda = m[3], vs = onset === 'ç' ? CEDILLA : VOWELS;
    if (onset === 'q' || /ç./.test(onset)) return null;
    if (onset !== 'ç' && /ç/.test(onset + coda)) return null;
    if (vs.indexOf(m[2]) < 0) return null;
    return { onset: onset, vowel: m[2], coda: coda, faces: vs.map(function (v) { return onset + v + coda; }) };
  }

  function rounds(lv) {
    lv = level(lv);
    if (lv === 'two') return TWO.map(function (k, i) { return { id: 'two-' + k, level: lv, i: i, w: word(k) }; });
    if (lv === 'long') return LONG.map(function (k, i) { return { id: 'long-' + k, level: lv, i: i, w: word(k) }; });
    return BUILD.map(function (b, i) { return { id: 'build-' + b[0], level: lv, i: i, w: word(b[0]), decoy: b[1] }; });
  }

  function seeded(k) { var s = k >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* the start offsets of a level's wheels for one pass: +1 +2 −1 −2 dealt evenly (±1 per class) over every wheel of
     the level, in table order, shuffled per pass — so neither "always spin down" nor "leave it" opens a lock */
  function startOffsets(lv, pass) {
    var rs = rounds(lv), total = 0;
    rs.forEach(function (r) { total += r.w.syl.length; });
    var deck = []; for (var i = 0; i < total; i++) deck.push(OFFSETS[i % 4]);
    shuffle(deck, seeded(7919 * (LEVEL_KEYS.indexOf(level(lv)) + 1) + 104729 * ((pass || 0) + 1)));
    var out = {}, at = 0;
    rs.forEach(function (r) { out[r.id] = deck.slice(at, at + r.w.syl.length); at += r.w.syl.length; });
    return out;
  }

  function isDerangement(p) { for (var i = 0; i < p.length; i++) if (p[i] === i) return false; return true; }
  function isReversed(p) { for (var i = 0; i < p.length; i++) if (p[i] !== p.length - 1 - i) return false; return true; }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random, n = r.w.syl.length;
    var st = { r: r, pass: pass || 0, misses: 0, help: 0, show: false, last: null, done: false, touched: false, wheels: [], sockets: [], tray: [], pinned: [], wobble: [] };
    if (r.level !== 'build') {
      var offs = (opts.offsets || startOffsets(r.level, pass))[r.id];
      r.w.syl.forEach(function (s, q) {
        var f = familyFaces(s), skip = (SKIP[r.w.key] || [])[q] || [];
        f.faces = f.faces.filter(function (x) { return skip.indexOf(x) < 0; });
        var ans = f.faces.indexOf(s), len = f.faces.length, off = offs[q];
        if (len === 3 && Math.abs(off) === 2) off = off > 0 ? 1 : -1;
        st.wheels.push({ id: 'w' + q, onset: f.onset, coda: f.coda, faces: f.faces, answer: ans, start: (ans + off + len * 4) % len, idx: (ans + off + len * 4) % len });
      });
    } else {
      r.w.syl.forEach(function (s, q) { st.wheels.push({ id: 'w' + q, text: s, s: q }); });
      st.wheels.push({ id: 'x', text: r.decoy, s: -1 });
      for (var j = 0; j < n; j++) st.sockets.push(null);
      var p;
      for (var t = 0; t < 400; t++) { p = shuffle(r.w.syl.map(function (_, q) { return q; }), rnd); if (isDerangement(p) && (n < 3 || !isReversed(p))) break; }
      st.tray = p.map(function (q) { return 'w' + q; });
      st.tray.splice(Math.floor(rnd() * (n + 1)), 0, 'x');
    }
    return st;
  }
  function wheel(st, id) { for (var i = 0; i < st.wheels.length; i++) if (st.wheels[i].id === id) return st.wheels[i]; return null; }
  function face(w) { return w.text != null ? w.text : w.faces[w.idx]; }
  /* any move takes the help away: the touched wheel's pin lifts; the notch and the ghost hide until the next Check */
  function touch(st, q) { st.touched = true; st.show = false; st.last = null; st.wobble = []; var k = st.pinned.indexOf(q); if (k >= 0) st.pinned.splice(k, 1); }

  /* ---- the hand: rolling wheels (Duas sílabas, Palavras maiores) ---- */
  function roll(st, q, d) {
    var w = st.wheels[q];
    if (st.r.level === 'build' || !w || !d) return false;
    var len = w.faces.length;
    w.idx = ((w.idx + d) % len + len) % len;
    if (!st.done) touch(st, q);
    return true;
  }
  function setFace(st, q, i) {
    var w = st.wheels[q];
    if (st.r.level === 'build' || !w || i < 0 || i >= w.faces.length || w.idx === i) return false;
    w.idx = i; if (!st.done) touch(st, q); return true;
  }

  /* ---- the hand: loose wheels (Monte o cadeado) ---- */
  /* seat a wheel in a socket (default: the first empty one); a wheel already there goes where this one came from */
  function seat(st, id, socket) {
    if (st.done || st.r.level !== 'build' || !wheel(st, id)) return false;
    if (socket === undefined) socket = st.sockets.indexOf(null);
    if (socket < 0 || socket >= st.sockets.length) return false;
    var from = st.sockets.indexOf(id), occ = st.sockets[socket];
    if (from === socket) return false;
    if (from >= 0) { st.sockets[from] = occ; touch(st, from); }
    else { st.tray.splice(st.tray.indexOf(id), 1); if (occ) st.tray.push(occ); }
    st.sockets[socket] = id; touch(st, socket); return true;
  }
  function unseat(st, socket) {
    if (st.done || st.r.level !== 'build') return false;
    var id = st.sockets[socket]; if (!id) return false;
    st.sockets[socket] = null; st.tray.push(id); touch(st, socket); return true;
  }

  /* what the plate reads: the wheels left to right, an empty socket as a gap */
  function readingParts(st) {
    if (st.r.level === 'build') return st.sockets.map(function (id) { return id ? wheel(st, id).text : '_'; });
    return st.wheels.map(face);
  }
  function reading(st) { return readingParts(st).join('·'); }

  /* ---- Check ---- */
  function check(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { ok: true };
    if (r.level === 'build') {
      if (st.sockets.indexOf(null) >= 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    } else if (!st.touched) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var parts = readingParts(st), right = [], wrong = [];
    for (var i = 0; i < n; i++) (parts[i] === r.w.syl[i] ? right : wrong).push(i);
    if (!wrong.length) { st.done = true; st.show = false; st.pinned = right.slice(); st.wobble = []; st.last = { result: 'right' }; return { ok: true, pinned: right, wobble: [] }; }
    var decoy = r.level === 'build' && st.sockets.indexOf('x') >= 0;
    st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    st.pinned = right.slice(); st.wobble = wrong.slice();
    st.last = { result: decoy ? 'decoy' : 'miss', reading: parts.join('·') };
    return { ok: false, kase: st.last.result, pinned: right, wobble: wrong };
  }

  /* the notch (a gold mark beside each still-wrong wheel's right face) and the ghost (the word under the plate) */
  function notchOn(st, q, always) {
    if (st.r.level === 'build' || st.done) return false;
    if (!st.wheels[q]) return false;
    return !!always || (st.show && st.help >= 2 && st.pinned.indexOf(q) < 0);
  }
  /* which way the right face is nearer: −1 = roll up (the face above), +1 = roll down; 0 = it is showing */
  function nearest(w) { var len = w.faces.length, d = ((w.answer - w.idx) % len + len) % len; return !d ? 0 : d <= len / 2 ? 1 : -1; }
  function ghostOn(st, always) { return !st.done && (!!always && st.r.level !== 'build' || (st.show && st.help >= 2)); }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, B = st.r.level === 'build';
    if (R === 'empty') return B ? 'hintMissing' : 'hintRoll';
    if (st.help >= 2) return B ? 'hintGhost' : 'hintNotch';
    if (R === 'decoy') return 'hintDecoy';
    return B ? 'hintPins3' : 'hintPins';
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, tiny = W < 300, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 176 : (W < 340 ? 100 : 120);
    L.ww = wide ? 64 : (tiny ? 54 : 60); L.wh = wide ? 104 : (tiny ? 80 : 90); L.ww4 = wide ? 56 : (tiny ? 46 : 52); L.wh4 = wide ? 96 : (tiny ? 76 : 84);
    L.syl = wide ? 36 : (tiny ? 26 : 30); L.syl4 = wide ? 30 : (tiny ? 22 : 26);
    L.sw = wide ? 58 : (tiny ? 46 : 52); L.sh = wide ? 84 : (tiny ? 62 : 68); L.ssyl = wide ? 26 : (tiny ? 20 : 22);
    L.plate = wide ? 32 : (tiny ? 22 : 26);
    return L;
  }

  return {
    WORDS: WORDS, SKIP: SKIP, TWO: TWO, LONG: LONG, BUILD: BUILD, LEVEL_KEYS: LEVEL_KEYS, OFFSETS: OFFSETS,
    level: level, word: word, familyFaces: familyFaces, rounds: rounds, startOffsets: startOffsets, newState: newState, wheel: wheel,
    roll: roll, setFace: setFace, seat: seat, unseat: unseat, readingParts: readingParts, reading: reading, check: check,
    notchOn: notchOn, nearest: nearest, ghostOn: ghostOn, hint: hint, order: order, layout: layout, isDerangement: isDerangement, seeded: seeded
  };
}));
