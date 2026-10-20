/* =====================================================================
   silbenbogen-core.js — the model of ACTIVITY #43 of the one-by-one
   rebuild: "Bau das Wort aus Silben" → DIE SCHWUNGBAHN, the syllable-bow
   track (RF.K.2.B; German only — every language's syllable activity is
   its own row).
   Design sheet: docs/activities-rebuild/designs/043-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: no slots are given. The child SWINGS the word (Silben
   schwingen, as in the Morgenkreis), and every swing draws one
   Silbenbogen under the track. The bows ARE the slots and every bow holds
   exactly one syllable card, so the count is the child's own: too few
   bows leaves a card with nowhere to lie, too many leaves a bow empty,
   and a wrong order stops the ball's ride at the bow that is out of place.

   The 30 words and their splits are the gated output
   (scripts/v2-data/verify-syllable-boundaries/output/approved-words-de.json,
   ≥ 4 sources agreeing); the gate re-reads that file and fails the build
   if a split here differs. No split is authored by hand.
   No DOM. UMD: window.SilbenbogenCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SilbenbogenCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* key | picture | word | gated split (lower case, as the approved file stores it) */
  function W(s) { var p = s.split('|'); return { key: p[0], pic: p[1], word: p[2], syl: p[3].split('-') }; }
  var LEVELS = {
    kurz: [
      'bear|forest creatures/bear|Bär|bär', 'cat|animals/cat|Katze|kat-ze', 'fish|animals/fish|Fisch|fisch', 'apple|fruits/apple|Apfel|ap-fel',
      'fox|animals/fox|Fuchs|fuchs', 'sock|accessories/sock|Socke|so-cke', 'book|classroom/book|Buch|buch', 'bell|christmas/bell|Glocke|glo-cke',
      'scarf|accessories/scarf|Schal|schal', 'kite|toys/kite|Drachen|dra-chen'
    ].map(W),
    mittel: [
      'baker|occupations/baker|Bäcker|bä-cker', 'acorn|miscellaneous/acorn|Eichel|ei-chel',
      'pear|fruits/pear|Birne|bir-ne', 'cake|bakery/cake|Kuchen|ku-chen', 'snowman|winter/snowman|Schneemann|schnee-mann',
      'lighthouse|beach/lighthouse|Leuchtturm|leucht-turm', 'glove|accessories/glove|Handschuh|hand-schuh', 'starfish|beach/starfish|Seestern|see-stern',
      'airplane|vehicles/airplane|Flugzeug|flug-zeug', 'strawberry|fruits/strawberry|Erdbeere|erd-bee-re', 'necklace|accessories/necklace|Halskette|hals-ket-te',
      'banana|fruits/banana|Banane|ba-na-ne'
    ].map(W),
    lang: [
      'butterfly|insects and bugs/butterfly|Schmetterling|schmet-ter-ling', 'pancake|breakfast/pancake|Pfannkuchen|pfann-ku-chen',
      'umbrella|weather/umbrella|Regenschirm|re-gen-schirm', 'ambulance|vehicles/ambulance|Krankenwagen|kran-ken-wa-gen',
      'rainbow|weather/rainbow|Regenbogen|re-gen-bo-gen', 'sunflower|flowers/sunflower|Sonnenblume|son-nen-blu-me',
      'watermelon|fruits/watermelon|Wassermelone|was-ser-me-lo-ne'
    ].map(W)
  };
  var LEVEL_KEYS = ['kurz', 'mittel', 'lang'], MAX_BOWS = 6;
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'kurz'; }

  /* the pool of a level: each word with its index inside its syllable-count group (k), for the tray balance */
  function rounds(lv) {
    lv = level(lv);
    var byN = {};
    return LEVELS[lv].map(function (w, i) { var n = w.syl.length; byN[n] = (byN[n] || 0); return { id: lv + '-' + w.key, level: lv, n: n, k: byN[n]++, i: i, word: w }; });
  }

  /* the tray: the first syllable's card rotates through every position over a level (and between passes);
     3+ syllables never lie in reading order, nor in reverse reading order */
  function deal(r, pass) {
    var n = r.n, idx = [], p, rest, out;
    for (var i = 0; i < n; i++) idx.push(i);
    if (n === 1) return [0];
    p = (r.k + (pass || 0)) % n;
    rest = idx.slice(1);
    if (n >= 3) { var rot = (r.k + (pass || 0)) % rest.length; rest = rest.slice(rot).concat(rest.slice(0, rot)); }
    out = rest.slice(); out.splice(p, 0, 0);
    if (n >= 3) {
      var same = function (a, b) { return a.join() === b.join(); }, rev = idx.slice().reverse();
      if (same(out, idx) || same(out, rev)) { var a = out[out.length - 1]; out[out.length - 1] = out[out.length - 2]; out[out.length - 2] = a; }
      if (same(out, idx) || same(out, rev)) { var b = out[1]; out[1] = out[2]; out[2] = b; }
    }
    return out;
  }

  function newState(r, pass) {
    var cards = deal(r, pass).map(function (s) { return { id: 'c' + s, s: s, text: r.word.syl[s] }; });
    return { r: r, pass: pass || 0, bows: 0, beds: [], tray: cards.map(function (c) { return c.id; }), cards: cards, misses: 0, help: 0, show: false, last: null, done: false, helpKind: null };
  }
  function card(st, id) { for (var i = 0; i < st.cards.length; i++) if (st.cards[i].id === id) return st.cards[i]; return null; }
  function moved(st) { st.show = false; st.last = null; }

  function swing(st) { if (st.done || st.bows >= MAX_BOWS) return false; st.bows++; st.beds.push(null); moved(st); return true; }
  /* an empty bow can be removed; a bow with a card cannot */
  function removeBow(st, b) {
    if (st.done || b < 0 || b >= st.bows || st.beds[b] !== null) return false;
    st.beds.splice(b, 1); st.bows--; moved(st); return true;
  }
  /* put a card on bow b; a full bow swaps (the other card goes where this one came from) */
  function place(st, id, b) {
    if (st.done || b < 0 || b >= st.bows || !card(st, id)) return false;
    var from = st.beds.indexOf(id), inTray = st.tray.indexOf(id) >= 0, there = st.beds[b];
    if (from === b) return false;
    if (from >= 0) { st.beds[from] = there; }
    else if (inTray) { st.tray.splice(st.tray.indexOf(id), 1); if (there) st.tray.push(there); }
    else return false;
    st.beds[b] = id; moved(st); return true;
  }
  function lift(st, b) { if (st.done || b < 0 || b >= st.bows || !st.beds[b]) return false; st.tray.push(st.beds[b]); st.beds[b] = null; moved(st); return true; }
  function firstEmpty(st) { return st.beds.indexOf(null); }

  /* Fahren! — the ride */
  function ride(st) {
    if (st.done) return { ok: true };
    var n = st.r.n, empty = st.beds.filter(function (x) { return x === null; }).length;
    if (st.bows === 0) { st.show = true; st.last = { reason: 'noBows' }; return { ok: false, reason: 'noBows' }; }
    if (st.tray.length && empty) { st.show = true; st.last = { reason: 'unplaced' }; return { ok: false, reason: 'unplaced' }; }
    var reason = null, stopAt = -1;
    if (st.tray.length) reason = 'tooFew';
    else if (empty) reason = 'tooMany';
    else {
      for (var i = 0; i < n; i++) if (card(st, st.beds[i]).s !== i) { stopAt = i; break; }
      if (stopAt >= 0) reason = 'order';
    }
    if (reason) {
      st.misses++; st.help = Math.min(2, st.misses); st.show = true;
      st.helpKind = reason === 'order' ? 'order' : 'count';
      st.last = { reason: reason, stopAt: stopAt, built: st.beds.map(function (id) { return id ? card(st, id).text : ''; }).join('') };
      return { ok: false, reason: reason, stopAt: stopAt };
    }
    st.done = true; st.show = false; st.last = { reason: 'ok' };
    return { ok: true };
  }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.reason;
    if (R === 'noBows') return 'hintSwing';
    if (R === 'unplaced') return 'hintPlace';
    if (st.help >= 2) return st.helpKind === 'order' ? 'hintSlices' : 'hintSwingN';
    return R === 'tooFew' ? 'hintTooFew' : R === 'tooMany' ? 'hintTooMany' : 'hintOrder';
  }

  /* order-only reshuffle; never the previous order; in Kurz the first four alternate 1 and 2 syllables */
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 600; t++) {
      var o = shuffle(pool.map(function (_, i) { return i; }), rnd);
      if (prev && prev.join() === o.join()) continue;
      if (pool[0] && pool[0].level === 'kurz') { var ok = true; for (var i = 1; i < 4; i++) if (pool[o[i]].n === pool[o[i - 1]].n) ok = false; if (!ok) continue; }
      return o;
    }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* layout: the track takes the full width; on phones the swing pad sits above it */
  function layout(W) {
    var wide = W >= 520, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pad = wide ? 88 : 64;
    L.track = wide ? W - L.pad - 16 : W - 8;
    L.bowMax = wide ? 120 : 84;
    L.cardW = wide ? 104 : W < 340 ? 84 : 92;
    L.cardH = wide ? 72 : 60;
    L.cardFont = wide ? 34 : 26;
    L.pic = wide ? 168 : 120;
    return L;
  }
  /* the bows share the whole track (the ball may rest over the last one): six bows still give a 44 px target at 320 */
  function bowWidth(L, bows) { return Math.max(44, Math.min(L.bowMax, Math.floor(L.track / Math.max(4, bows)))); }

  return {
    LEVELS: LEVELS, LEVEL_KEYS: LEVEL_KEYS, MAX_BOWS: MAX_BOWS,
    level: level, rounds: rounds, deal: deal, newState: newState, card: card, swing: swing, removeBow: removeBow, place: place, lift: lift,
    firstEmpty: firstEmpty, ride: ride, hint: hint, order: order, layout: layout, bowWidth: bowWidth
  };
}));
