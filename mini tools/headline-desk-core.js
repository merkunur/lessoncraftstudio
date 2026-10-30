/* =====================================================================
   headline-desk-core.js — the model of ACTIVITY #173 of the one-by-one
   rebuild: "Marina's Headline Desk" (RI.2.2) → THE STAPLER THAT ONLY
   BINDS WHAT THE HEADLINE IS ABOUT.
   Pure, no DOM. Design: docs/activities-rebuild/designs/173-marina-headline-desk.md
   Texts and cards: headline-desk-data.js (window.HeadlineDeskData).
   ---------------------------------------------------------------------
   The article lies on Marina's desk as loose strips, one sentence each.
   A headline card goes on top; the stapler staples down only the strips
   that headline is about (the card's `covers`, recorded in the data), and
   the rest blow off the desk. Level 1: one paragraph of 3 strips, the
   main topic covers all three. Level 2: two paragraphs of 2 strips each,
   the main topic covers all four; a one-paragraph card covers two.
   Level 3: one paragraph is lit yellow and slid under the stapler; the
   card that fits it covers exactly its two strips.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['story', 'two', 'one'];

  /* the right card's slot (1-based) per round, design §6; 4 cards: two of each slot */
  var SLOTS = {
    story: { 3: [1, 2, 3, 1, 3, 2, 2, 3], 4: [1, 2, 3, 4, 2, 4, 3, 1] },
    two: { 3: [3, 1, 2, 2, 1, 3, 3, 1], 4: [3, 1, 4, 2, 4, 1, 3, 2] },
    one: { 3: [2, 3, 1, 1, 3, 2, 3, 1, 2, 2, 1, 3, 1, 2, 3, 3], 4: [2, 3, 1, 4, 3, 2, 4, 1, 2, 4, 1, 3, 1, 2, 3, 4] }
  };

  function data() { return (root && root.HeadlineDeskData) || (typeof module !== 'undefined' && module.exports && module.exports._data) || null; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'story'; }
  function cardsOf(v) { return String(v) === '4' ? 4 : 3; }
  function range(a, b) { var o = []; for (var i = a; i < b; i++) o.push(i); return o; }

  /* the rounds of a level in a locale: { k, level, strips, breakAt, lit, target, cards:[{role, text, covers}] } */
  function rounds(loc, level, D) {
    D = D || data(); loc = locOf(loc); level = levelOf(level);
    var L = D[loc];
    if (level === 'story') return L.L1.map(function (a, k) {
      return { k: k, level: level, id: a.id, strips: a.strips.slice(), hl: a.hl, breakAt: null, lit: null, target: [0, 1, 2],
        cards: [{ role: 'topic', text: a.topic, covers: [0, 1, 2] }, { role: 'detail', text: a.detail[0], covers: [a.detail[1]] }, { role: 'neighbour', text: a.neighbour, covers: [] }, { role: 'fourth', text: a.fourth[0], covers: [a.fourth[1]] }] };
    });
    if (level === 'two') return L.L2.map(function (a, k) {
      return { k: k, level: level, id: a.id, strips: a.p1.concat(a.p2), hl: a.hl, breakAt: 2, lit: null, target: [0, 1, 2, 3],
        cards: [{ role: 'topic', text: a.topic, covers: [0, 1, 2, 3] }, { role: 'paragraph', text: a.para[0], covers: a.para[1] ? [2, 3] : [0, 1] }, { role: 'neighbour', text: a.neighbour, covers: [] }, { role: 'fourth', text: a.fourth[0], covers: [a.fourth[1]] }] };
    });
    var out = [];
    L.L2.forEach(function (a, ai) {
      [0, 1].forEach(function (p) {
        var mine = p ? [2, 3] : [0, 1], other = p ? [0, 1] : [2, 3];
        out.push({ k: out.length, level: level, id: a.id + '.' + (p + 1), strips: a.p1.concat(a.p2), hl: a.hl, breakAt: 2, lit: p, target: mine,
          cards: [{ role: 'fit', text: a.fit[p], covers: mine }, { role: 'detail', text: a.det[p][0], covers: [a.det[p][1]] }, { role: 'other', text: a.fit[1 - p], covers: other }, { role: 'whole', text: a.topic, covers: [0, 1, 2, 3] }] });
      });
    });
    return out;
  }
  function passSize(level) { return levelOf(level) === 'one' ? 16 : 8; }

  /* the card order for a round: the right card at its slot (the table, rotated +1 per pass), the others in a rotated order */
  function order(level, k, ncards, pass) {
    level = levelOf(level); ncards = cardsOf(ncards);
    var slot = (SLOTS[level][ncards][k] - 1 + (pass || 0)) % ncards, rest = range(1, ncards), rot = ((k + (pass || 0)) % rest.length);
    rest = rest.slice(rot).concat(rest.slice(0, rot));
    var o = [], j = 0; for (var i = 0; i < ncards; i++) o.push(i === slot ? 0 : rest[j++]);
    return o;
  }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, rnd, prev) {
    var ks = range(0, passSize(level));
    for (var t = 0; t < 200; t++) { var c = shuffle(ks.slice(), rnd || Math.random); if (!prev || prev.join() !== c.join()) return c; }
    var b = (prev || ks).slice(); return b.slice(1).concat(b.slice(0, 1));
  }

  /* ---- a round ---- */
  function newState(loc, level, k, ncards, pass, D) {
    level = levelOf(level); ncards = cardsOf(ncards);
    var pool = rounds(loc, level, D), r = pool[((k % pool.length) + pool.length) % pool.length];
    var ord = order(level, r.k, ncards, pass);
    return { level: level, k: r.k, round: r, ncards: ncards, cards: ord.map(function (i) { return r.cards[i]; }), slot: null, verdict: null, misses: 0, help: false, done: false };
  }
  /* tap a card: into the slot; tap it again (or the slotted one): back out */
  function choose(st, i) {
    if (st.done || !(i >= 0 && i < st.cards.length)) return false;
    st.slot = st.slot === i ? null : i; st.verdict = null; st.help = false; return true;
  }
  var same = function (a, b) { return a.length === b.length && a.every(function (x) { return b.indexOf(x) >= 0; }); };
  /* the press: which strips the slotted headline staples. Levels 1–2: every strip is under the jaw — the covered ones
     staple, the rest blow away. Level 3: only the yellow paragraph is under the jaw — a card covering only yellow strips
     staples them (the other yellow strip blows off); a card reaching beyond them jams the stapler open (nothing staples). */
  function press(r, card) {
    var all = range(0, r.strips.length);
    if (r.level !== 'one') {
      var st1 = card.covers.slice().sort(), bl = all.filter(function (i) { return card.covers.indexOf(i) < 0; });
      return { stapled: st1, blown: bl, jam: false, reach: [], ok: same(card.covers, r.target) };
    }
    var inside = card.covers.every(function (i) { return r.target.indexOf(i) >= 0; });
    if (!inside || !card.covers.length) return { stapled: [], blown: [], jam: card.covers.length > 0, reach: card.covers.filter(function (i) { return r.target.indexOf(i) < 0; }), ok: false };
    return { stapled: card.covers.slice().sort(), blown: r.target.filter(function (i) { return card.covers.indexOf(i) < 0; }), jam: false, reach: [], ok: same(card.covers, r.target) };
  }
  function cardRight(st, i) { return press(st.round, st.cards[i]).ok; }
  /* the hint for a miss, from what the card covers (never from a stored answer) */
  function kindOf(r, card) {
    var c = card.covers;
    if (!c.length) return 'neighbour';
    if (r.level === 'one') {
      if (c.every(function (i) { return r.target.indexOf(i) >= 0; })) return 'l3detail';
      if (c.some(function (i) { return r.target.indexOf(i) >= 0; })) return 'l3whole';
      return 'l3other';
    }
    if (r.level === 'two' && c.length === 2 && (same(c, [0, 1]) || same(c, [2, 3]))) return 'paragraph';
    return 'detail';
  }
  var HINT = { neighbour: 'hintNeighbour', detail: 'hintDetail', paragraph: 'hintPara', l3detail: 'hintL3detail', l3other: 'hintL3other', l3whole: 'hintL3whole' };
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.slot == null) return { result: 'note', key: 'hintEmpty' };
    var card = st.cards[st.slot], p = press(st.round, card);
    st.verdict = p;
    if (p.ok) { st.done = true; return { result: 'ok', press: p }; }
    st.misses++; st.help = st.misses >= 2;
    return { result: 'miss', press: p, kind: kindOf(st.round, card) };
  }
  function hint(st, res) { if (!res || res.result !== 'miss') return null; return st.help ? (st.level === 'one' ? 'hintMiss2Y' : 'hintMiss2') : HINT[res.kind]; }

  var api = { LOCALES: LOCALES, LEVELS: LEVELS, SLOTS: SLOTS, locOf: locOf, levelOf: levelOf, cardsOf: cardsOf, rounds: rounds, passSize: passSize,
    order: order, plan: plan, newState: newState, choose: choose, press: press, cardRight: cardRight, kindOf: kindOf, check: check, hint: hint };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HeadlineDeskCore = api;
})(typeof window !== 'undefined' ? window : this);
