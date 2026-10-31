/* =====================================================================
   reason-sign-core.js — the model of ACTIVITY #175 of the one-by-one
   rebuild: "Pearl's Opinion Page" (RI.2.8) → THE SIGN THAT STANDS ON ITS
   REASONS. Pure, no DOM. Design: docs/activities-rebuild/designs/175-pearl-opinion-page.md
   Pages: reason-sign-data.js (window.ReasonSignData).
   ---------------------------------------------------------------------
   Pearl's point is a sign lying on the beach. A card slid under it is
   tested by the tide: a REASON for that point is a post that holds the
   sign up (it stays dry); a RESTATEMENT is only a second copy of the sign
   (flat, soaked); an OFF-TOPIC sentence is a post planted beside the sign,
   under nothing; a reason for the OTHER point (Level 2) leans against the
   edge; in Level 3 one reason holds the sign but it tilts — it needs two.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['one', 'two', 'legs'];
  var IDS = ['park', 'helmet', 'read', 'garden', 'water', 'lights', 'dogs', 'dishes'];
  /* Level 2: two signs; a reason for each, the restatement of one and the off-topic sentence of the other.
     No reason on the cards supports the other sign (the reviewer-signed table in the gate). */
  var PAIRS = [
    { signs: ['park', 'helmet'], reasons: ['R1', 'R1'], s: 'park', o: 'helmet' },
    { signs: ['read', 'water'], reasons: ['R1', 'R2'], s: 'water', o: 'read' },
    { signs: ['garden', 'lights'], reasons: ['R2', 'R1'], s: 'garden', o: 'lights' },
    { signs: ['dogs', 'dishes'], reasons: ['R1', 'R2'], s: 'dishes', o: 'dogs' },
    { signs: ['park', 'read'], reasons: ['R2', 'R2'], s: 'read', o: 'park' },
    { signs: ['helmet', 'garden'], reasons: ['R2', 'R1'], s: 'helmet', o: 'garden' },
    { signs: ['water', 'dogs'], reasons: ['R1', 'R2'], s: 'dogs', o: 'water' },
    { signs: ['lights', 'dishes'], reasons: ['R2', 'R2'], s: 'lights', o: 'dishes' }
  ];
  /* where the right card(s) sit (1-based slots), by the round's place in the pass, rotated +1 every pass */
  var SLOT1 = [2, 1, 3, 3, 1, 2, 1, 3];
  var SLOT2 = [[1, 3], [2, 4], [1, 2], [3, 4], [1, 4], [2, 3], [1, 3], [2, 4]];
  var SLOT3 = [[2, 4], [1, 3], [1, 4], [2, 3], [3, 4], [1, 2], [1, 3], [2, 4]];
  var ROLE = { R1: 'reason', R2: 'reason', S: 'restate', O: 'off' };

  function data() { return (root && root.ReasonSignData) || null; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'one'; }
  function mod(a, n) { return ((a % n) + n) % n; }
  function card(L, point, key) { return { id: point + '.' + key, point: point, key: key, role: ROLE[key], t: L.points[point][key] }; }
  /* lay the cards in their slots: the right cards at the table's slots, the others in the rest */
  function lay(right, others, slots, n, flip) {
    var out = new Array(n), free = [], i;
    for (i = 0; i < right.length; i++) out[slots[i] - 1] = right[i];
    for (i = 0; i < n; i++) if (!out[i]) free.push(i);
    var o = flip ? others.slice().reverse() : others;
    for (i = 0; i < free.length; i++) out[free[i]] = o[i];
    return out;
  }
  /* a round: level, the round's key in the pool, the pass, and its place in the pass */
  function round(loc, level, k, pass, pos, D) {
    D = D || data(); loc = locOf(loc); level = levelOf(level); pass = pass || 0; pos = pos || 0;
    var L = D[loc], at = mod(pos + pass, 8), flip = mod(pos + pass, 2) === 1, id, pr;
    if (level === 'two') {
      pr = PAIRS[mod(k, 8)];
      var a = card(L, pr.signs[0], pr.reasons[0]), b = card(L, pr.signs[1], pr.reasons[1]);
      return { level: level, key: 'p' + mod(k, 8), signs: pr.signs.slice(),
        cards: lay(flip ? [b, a] : [a, b], [card(L, pr.s, 'S'), card(L, pr.o, 'O')], SLOT2[at], 4, flip) };
    }
    id = IDS[mod(k, 8)];
    if (level === 'legs') return { level: level, key: id, signs: [id], cards: lay(flip ? [card(L, id, 'R2'), card(L, id, 'R1')] : [card(L, id, 'R1'), card(L, id, 'R2')], [card(L, id, 'S'), card(L, id, 'O')], SLOT3[at], 4, flip) };
    /* Level 1 meets both reasons: R1 on even passes, R2 on odd ones */
    return { level: level, key: id, signs: [id], cards: lay([card(L, id, mod(pass, 2) ? 'R2' : 'R1')], [card(L, id, 'S'), card(L, id, 'O')], [SLOT1[at]], 3, flip) };
  }
  function sockets(level) { return level === 'two' ? [{ sign: 0 }, { sign: 1 }] : level === 'legs' ? [{ sign: 0 }, { sign: 0 }] : [{ sign: 0 }]; }

  function range(n) { var o = []; for (var i = 0; i < n; i++) o.push(i); return o; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(n, rnd, prev) {
    rnd = rnd || Math.random;
    for (var t = 0; t < 200; t++) { var c = shuffle(range(n), rnd); if (!prev || prev.join() !== c.join()) return c; }
    var o = prev ? prev.slice(1).concat(prev.slice(0, 1)) : range(n);
    return o;
  }

  /* ---- a round in play ---- */
  function newState(loc, level, k, pass, pos, D) {
    level = levelOf(level);
    var r = round(loc, level, k, pass, pos, D);
    return { level: level, round: r, sockets: sockets(level).map(function (s) { return { sign: s.sign, card: null }; }), misses: 0, help: false, done: false, shown: null };
  }
  function cardById(st, id) { for (var i = 0; i < st.round.cards.length; i++) if (st.round.cards[i].id === id) return st.round.cards[i]; return null; }
  function socketOf(st, id) { for (var i = 0; i < st.sockets.length; i++) if (st.sockets[i].card === id) return i; return -1; }
  /* slide a card under a sign: into the given socket, or (Levels 1 and 3) the first free one — a full sign swaps its last card */
  function place(st, id, socket) {
    if (st.done || !cardById(st, id)) return false;
    var at = socketOf(st, id);
    if (socket == null) {
      if (st.level === 'two') return false;
      socket = -1; for (var i = 0; i < st.sockets.length; i++) if (!st.sockets[i].card) { socket = i; break; }
      if (socket < 0) socket = st.sockets.length - 1;
    }
    if (socket < 0 || socket >= st.sockets.length) return false;
    if (at >= 0) st.sockets[at].card = null;
    st.sockets[socket].card = id; st.shown = null;
    return true;
  }
  function take(st, socket) { if (st.done || !st.sockets[socket] || !st.sockets[socket].card) return false; st.sockets[socket].card = null; st.shown = null; return true; }
  function empty(st) { return st.sockets.every(function (s) { return !s.card; }); }

  /* what the tide shows: each placed card as what it really is, and each sign dry, tilted or soaked */
  function read(st) {
    var signs = st.round.signs.map(function () { return { reasons: 0, dry: false, tilt: false }; }), show = {}, why = null;
    st.sockets.forEach(function (s, i) {
      if (!s.card) return;
      var c = cardById(st, s.card), mine = st.round.signs[s.sign];
      if (c.role === 'reason' && c.point === mine) { show[i] = 'post'; signs[s.sign].reasons++; }
      else if (c.role === 'reason') { show[i] = 'lean'; why = why || 'wrong'; }
      else if (c.role === 'restate') { show[i] = 'copy'; why = why || 'restate'; }
      else { show[i] = 'lonely'; why = why || 'off'; }
    });
    var need = st.level === 'legs' ? 2 : 1;
    signs.forEach(function (g) { g.dry = g.reasons >= need; g.tilt = need === 2 && g.reasons === 1; });
    var ok = signs.every(function (g) { return g.dry; });
    if (!ok && !why) why = 'oneLeg';
    return { ok: ok, signs: signs, show: show, why: ok ? null : why };
  }
  /* the tide is the Check */
  function tide(st) {
    if (st.done) return { result: 'no' };
    if (empty(st)) return { result: 'empty', key: st.level === 'two' ? 'hintEmpty2' : 'hintEmpty' };
    if (st.level === 'two' && st.sockets.some(function (s) { return !s.card; })) return { result: 'empty', key: 'hintEmpty2' };
    var rd = read(st); st.shown = rd;
    if (rd.ok) { st.done = true; return { result: 'ok', read: rd }; }
    st.misses++; st.help = st.misses >= 2;
    return { result: 'miss', read: rd };
  }
  var WHY_KEY = { restate: 'hintRestate', off: 'hintOff', wrong: 'hintWrong', oneLeg: 'hintOneLeg' };
  function hint(st, res) { if (!res) return null; if (res.result === 'empty') return res.key; if (res.result !== 'miss') return null; return WHY_KEY[res.read.why]; }

  var api = { LOCALES: LOCALES, LEVELS: LEVELS, IDS: IDS, PAIRS: PAIRS, SLOT1: SLOT1, SLOT2: SLOT2, SLOT3: SLOT3, ROLE: ROLE,
    locOf: locOf, levelOf: levelOf, round: round, sockets: sockets, plan: plan,
    newState: newState, cardById: cardById, socketOf: socketOf, place: place, take: take, empty: empty, read: read, tide: tide, hint: hint };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ReasonSignCore = api;
})(typeof window !== 'undefined' ? window : this);
