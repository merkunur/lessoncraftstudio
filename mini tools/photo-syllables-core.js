/* =====================================================================
   photo-syllables-core.js — the model of ACTIVITY #52 of the one-by-one
   rebuild: "Forme le mot en syllabes" (fr) → LA PHOTO QUI SE RÉVÈLE, the
   developing photo (RF.K.2.B; French only — every language's syllable
   activity is its own row). Design sheet:
   docs/activities-rebuild/designs/052-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: every syllable card carries its own vertical strip of
   the photo of the word it came from (strip = that syllable's place in
   its own word, width = the photo ÷ its own word's syllable count). Lay
   the cards on the rail and develop: the photo only comes out whole when
   the syllables are the right ones, in the right order. A misplaced card
   develops its strip in the wrong place, a decoy card a strip of another
   photo, a missing card leaves white paper. Strips that are the right
   card in the right place develop sharp; every other strip fogged.

   Native review 2026-10-20: lac (a mountain landscape) and boulanger (a
   chef's toque) came out — lit and escargot in; every decoy that SOUNDS
   like the answer's syllable (tu/tue, am/an) replaced.
   Splits are the gated syllabes écrites of approved-words-fr.json (the
   final mute e counted: lu-ne); the word-final plain e is flagged so the
   card shows it grey (the CP "lettre muette"). The fr oral-syllable
   convention is a deferred operator ruling (CLAUDE.md §20.9) — the split
   source is the WORDS table alone. No DOM. UMD: window.PhotoSyllablesCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PhotoSyllablesCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* word | picture | split */
  var WORDS = {};
  ('chat|animals/cat|chat;chien|animals/dog|chien;fleur|summer/flower|fleur;lit|furniture/bed|lit;ours|camping/bear|ours;'
  + 'avion|vehicles/airplane|a-vion;lapin|animals/rabbit|la-pin;ballon|toys/ball|bal-lon;soleil|beach/sun|so-leil;'
  + 'lune|space/moon|lu-ne;table|furniture/table|ta-ble;ange|christmas/angel|an-ge;cloche|christmas/bell|clo-che;livre|classroom/book|li-vre;'
  + 'tigre|animals/tiger|ti-gre;zèbre|animals/zebra|zè-bre;pomme|fruits/apple|pom-me;tortue|animals/turtle|tor-tue;'
  + 'banane|fruits/banana|ba-na-ne;voiture|vehicles/car|voi-tu-re;papillon|insects and bugs/butterfly|pa-pil-lon;parapluie|weather/umbrella|pa-ra-pluie;'
  + 'chocolat|easter/chocolate|cho-co-lat;éléphant|animals/elephant|é-lé-phant;girafe|animals/giraffe|gi-ra-fe;tournesol|flowers/sunflower|tour-ne-sol;'
  + 'escargot|forest creatures/snail|es-car-got;ambulance|vehicles/ambulance|am-bu-lan-ce')
    .split(';').forEach(function (e) { var p = e.split('|'); WORDS[p[0]] = { key: p[0], word: p[0], pic: p[1], syl: p[2].split('-') }; });

  /* word, decoy cards [syllable text, source word] — each a real syllable of another pool word, never one of this word's */
  var SHORT = [['chat', [['cho', 'chocolat'], ['chien', 'chien']]], ['chien', [['che', 'cloche'], ['ours', 'ours']]], ['fleur', [['clo', 'cloche'], ['lu', 'lune']]],
    ['lit', [['lu', 'lune'], ['pin', 'lapin']]], ['ours', [['tour', 'tournesol'], ['pom', 'pomme']]],
    ['avion', [['am', 'ambulance']]], ['lapin', [['pa', 'papillon']]], ['ballon', [['ba', 'banane']]], ['soleil', [['sol', 'tournesol']]]];
  var MUTE = [['lune', [['la', 'lapin']]], ['table', [['bal', 'ballon']]], ['ange', [['la', 'lapin']]], ['cloche', [['cho', 'chocolat']]], ['livre', [['ti', 'tigre']]],
    ['tigre', [['gi', 'girafe']]], ['zèbre', [['vre', 'livre']]], ['pomme', [['pa', 'papillon']]], ['tortue', [['tour', 'tournesol']]]];
  var LONG = [['banane', [['pa', 'papillon']]], ['voiture', [['ti', 'tigre']]], ['papillon', [['bal', 'ballon']]], ['parapluie', [['la', 'lapin']]], ['chocolat', [['lu', 'lune']]],
    ['éléphant', [['ne', 'lune']]], ['girafe', [['ti', 'tigre']]], ['tournesol', [['so', 'soleil']]], ['escargot', [['co', 'chocolat']]], ['ambulance', [['bal', 'ballon']]]];

  var LEVEL_KEYS = ['short', 'mute', 'long'], TABLES = { short: SHORT, mute: MUTE, long: LONG };
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'short'; }
  function word(k) { var w = WORDS[k]; if (!w) throw new Error('photo-syllables: no word ' + k); return w; }
  /* the word-final plain e — written, not said (never é è ê, never a non-final e) */
  function muteE(src, idx) { var w = word(src); return idx === w.syl.length - 1 && /e$/.test(w.word) && w.syl[idx].length > 1; }
  function card(id, src, idx) { var w = word(src); return { id: id, text: w.syl[idx], src: src, srcIdx: idx, srcCount: w.syl.length, pic: w.pic, mute: muteE(src, idx) }; }

  function rounds(lv) {
    lv = level(lv);
    return TABLES[lv].map(function (t, i) {
      return { id: lv + '-' + t[0], level: lv, i: i, w: word(t[0]), decoys: t[1].map(function (d) { return { text: d[0], src: d[1], srcIdx: word(d[1]).syl.indexOf(d[0]) }; }) };
    });
  }

  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function isDerangement(p) { for (var i = 0; i < p.length; i++) if (p[i] === i) return false; return true; }

  function newState(r, pass, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random, n = r.w.syl.length, st = { r: r, pass: pass || 0, cards: [], rail: [], tray: [], misses: 0, help: 0, show: false, last: null, developed: null, done: false };
    r.w.syl.forEach(function (_, q) { st.cards.push(card('c' + q, r.w.key, q)); });
    if (opts.decoy !== false) r.decoys.forEach(function (d, q) { st.cards.push(card('x' + q, d.src, d.srcIdx)); });
    /* the tray: three or more cards in a derangement of word order; two at chance (always swapped would be a tell); the decoys at uniformly drawn places */
    var p = r.w.syl.map(function (_, q) { return q; });
    if (n === 2) shuffle(p, rnd);
    else if (n > 2) for (var t = 0; t < 400; t++) { shuffle(p, rnd); if (isDerangement(p)) break; }
    st.tray = p.map(function (q) { return 'c' + q; });
    st.cards.forEach(function (c) { if (c.id[0] === 'x') st.tray.splice(Math.floor(rnd() * (st.tray.length + 1)), 0, c.id); });
    return st;
  }
  function byId(st, id) { for (var i = 0; i < st.cards.length; i++) if (st.cards[i].id === id) return st.cards[i]; return null; }
  /* any move takes the help away: the paper goes back to blank cream until the next develop */
  function moved(st) { st.developed = null; st.show = false; st.last = null; }

  /* ---- the hand ---- */
  /* lay a tray card on the rail at a place (default: after the last card); the cards right of it slide along */
  function lay(st, id, at) {
    if (st.done || !byId(st, id) || st.tray.indexOf(id) < 0) return false;
    if (at === undefined || at > st.rail.length) at = st.rail.length;
    if (at < 0) at = 0;
    st.tray.splice(st.tray.indexOf(id), 1); st.rail.splice(at, 0, id); moved(st); return true;
  }
  /* move a card along the rail */
  function move(st, id, to) {
    var from = st.rail.indexOf(id);
    if (st.done || from < 0) return false;
    to = Math.max(0, Math.min(st.rail.length - 1, to));
    if (to === from) return false;
    st.rail.splice(from, 1); st.rail.splice(to, 0, id); moved(st); return true;
  }
  /* take a card back to the tray */
  function takeBack(st, id) {
    var from = st.rail.indexOf(id);
    if (st.done || from < 0) return false;
    st.rail.splice(from, 1); st.tray.push(id); moved(st); return true;
  }

  /* ---- develop (Check) ---- */
  /* the strips: each card sends up its own slice of its own photo, laid left to right with its own width */
  function bands(st) {
    var r = st.r, x = 0;
    return st.rail.map(function (id, i) {
      var c = byId(st, id), w = 1 / c.srcCount, b = { id: id, pic: c.pic, src: c.src, srcIdx: c.srcIdx, srcCount: c.srcCount, x: x, w: w, foreign: c.src !== r.w.key, sharp: c.src === r.w.key && c.srcIdx === i };
      x += w; return b;
    });
  }
  function develop(st) {
    var r = st.r, n = r.w.syl.length;
    if (st.done) return { ok: true };
    if (!st.rail.length) { st.show = true; st.last = { result: 'empty' }; st.developed = null; return { ok: false, kase: 'empty' }; }
    var bs = bands(st), end = bs.length ? bs[bs.length - 1].x + bs[bs.length - 1].w : 0;
    var dev = { bands: bs, gap: end < 1 - 1e-9 ? 1 - end : 0, overflow: end > 1 + 1e-9 ? end - 1 : 0 };
    st.developed = dev;
    if (bs.length === n && bs.every(function (b) { return b.sharp; })) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true, developed: dev }; }
    var kase = bs.some(function (b) { return b.foreign; }) ? 'foreign' : bs.length < n ? 'missing' : 'order';
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: kase };
    return { ok: false, kase: kase, developed: dev };
  }
  /* miss 2 — the contact print: the right photo as a faint ghost with a line where each syllable's strip starts */
  function ghostOn(st) { return !st.done && st.show && st.help >= 2; }
  function guides(st) { var n = st.r.w.syl.length, out = []; for (var i = 1; i < n; i++) out.push(i / n); return out; }

  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result;
    if (R === 'empty') return 'hintEmpty';
    if (st.help >= 2) return 'hintLines';
    return R === 'foreign' ? 'hintForeign' : R === 'missing' ? 'hintMissing' : 'hintOrder';
  }
  function celebrateKey(r) { return r.w.syl.length === 1 ? 'okOne' : r.level === 'mute' ? 'okMute' : 'okWord'; }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 208 : (W < 340 ? 132 : 160);
    L.cw = wide ? 104 : 76; L.ch = wide ? 72 : 60; L.fs = wide ? 34 : 26;
    return L;
  }

  return {
    WORDS: WORDS, SHORT: SHORT, MUTE: MUTE, LONG: LONG, LEVEL_KEYS: LEVEL_KEYS,
    level: level, word: word, muteE: muteE, rounds: rounds, newState: newState, byId: byId, isDerangement: isDerangement,
    lay: lay, move: move, takeBack: takeBack, bands: bands, develop: develop, ghostOn: ghostOn, guides: guides, hint: hint,
    celebrateKey: celebrateKey, order: order, layout: layout
  };
}));
