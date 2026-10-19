/* =====================================================================
   ghost-rafts-core.js — the model of THE GHOST RAFTS
   (activity #31 of the one-by-one rebuild, "Dewey's Ten-Tank", K.NBT.A.1).
   Design sheet: docs/activities-rebuild/designs/031-ten-tank.md
   ---------------------------------------------------------------------
   Bubbles drift in the tank too much to count in place, so you catch ten
   on the raft's seats; the tenth seals them into ONE raft and every bubble
   still loose hooks onto the raft's tow-line in a row. A number card
   dropped on the record builds its GHOST in the bay: 31 is three rafts and
   one bubble, 3 is three bubbles and no raft at all. Five round kinds:
   CATCH (catch ten, then the card), DOCK (a ready raft + spare bubbles
   from the reeds), FIX (change a tank to the number), POP (pop the raft —
   the number stays), TWO TANKS (which has more). Pure model, no DOM.
   Node-loadable (verify-ghost-rafts-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* the design's tables (§6): cards are listed with the right one first, in the slot order before
     the shuffle; `start` = the bubbles already on a FIX tank's tow-line; TWO TANKS: `bigLeft` at rest */
  var LEVELS = {
    '19': [
      { kind: 'catch', n: 13, cards: [13, 31, 14] },
      { kind: 'dock', n: 15 },
      { kind: 'catch', n: 16, cards: [16, 61, 6] },
      { kind: 'fix', n: 14, start: 2 },
      { kind: 'pop', n: 12, cards: [12, 2, 10] },
      { kind: 'catch', n: 18, cards: [18, 81, 17] },
      { kind: 'dock', n: 17 },
      { kind: 'two', a: 13, b: 18, bigLeft: false },
      { kind: 'catch', n: 11, cards: [11, 10, 1] }
    ],
    '15': [
      { kind: 'catch', n: 12, cards: [12, 21, 2] },
      { kind: 'dock', n: 11 },
      { kind: 'catch', n: 14, cards: [14, 41, 15] },
      { kind: 'fix', n: 13, start: 5 },
      { kind: 'pop', n: 15, cards: [15, 51, 5] },
      { kind: 'catch', n: 15, cards: [15, 5, 10] },
      { kind: 'dock', n: 13 },
      { kind: 'two', a: 14, b: 12, bigLeft: true },
      { kind: 'catch', n: 11, cards: [11, 10, 1] }
    ]
  };
  var SPARE = 9, TANK_MAX = 19, DRIFT_MAX = 12 /* px per second */, HOLD_MS = 600;

  function num(a, b) { return a - b; }
  function level(name) { return String(name) === '15' ? '15' : '19'; }
  function rounds(lv) {
    lv = level(lv);
    return LEVELS[lv].map(function (r, i) {
      var o = { level: lv, index: i, kind: r.kind };
      if (r.kind === 'two') { o.a = r.a; o.b = r.b; o.bigLeft = r.bigLeft; o.n = Math.max(r.a, r.b); o.id = 'two.' + r.a + '-' + r.b; }
      else { o.n = r.n; o.id = r.kind + '.' + r.n; }
      if (r.cards) o.cards = r.cards.slice();
      if (r.start != null) o.start = r.start;
      return o;
    });
  }
  /* the decoy's misconception — reversal, ones-only, ten-only, neighbour */
  function decoyKinds(n, m) {
    var k = [];
    if (m !== n && m === (n % 10) * 10 + Math.floor(n / 10)) k.push('reversal');
    if (m === n % 10) k.push('ones');
    if (m === 10) k.push('ten');
    if (Math.abs(m - n) === 1) k.push('neighbour');
    return k;
  }

  /* ---------------- the order: a pass opens on a CATCH, never the same order twice, never the same seam ---------------- */
  function shuffle(a, rand) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length, base = pool.map(function (r, i) { return i; });
    if (n < 2) return base;
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    for (var tries = 0; tries < 400; tries++) {
      var a = shuffle(base.slice(), rand);
      if (pool[a[0]].kind !== 'catch') continue;
      if (a[0] === lastPrev) continue;
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      return a;
    }
    var c = base.filter(function (i) { return pool[i].kind === 'catch' && i !== lastPrev; })[0];
    return [c].concat(base.filter(function (i) { return i !== c; }));
  }
  /* the slots for one pass: the card rounds in pass order get the right card's slot from a sequence that
     holds every slot at least once and at most twice; the decoys fill the other two slots at random.
     Returns { roundIndex: [values in slot order] }. TWO TANKS: a coin per pass swaps the sides. */
  function deal(pool, ord, rand) {
    rand = rand || Math.random;
    var cardRounds = ord.filter(function (i) { return !!pool[i].cards; }), k = cardRounds.length, seq = [];
    for (var tries = 0; tries < 200; tries++) {
      seq = []; for (var j = 0; j < k; j++) seq.push(Math.floor(rand() * 3));
      var cnt = [0, 0, 0]; seq.forEach(function (s) { cnt[s]++; });
      if (k < 3 || (cnt[0] >= 1 && cnt[1] >= 1 && cnt[2] >= 1 && cnt[0] <= 2 && cnt[1] <= 2 && cnt[2] <= 2)) break;
    }
    var out = { slots: {}, swap: rand() < 0.5 };
    cardRounds.forEach(function (ri, j) {
      var c = pool[ri].cards, right = c[0], dec = shuffle(c.slice(1), rand), slots = [null, null, null];
      slots[seq[j]] = right;
      for (var s = 0, d = 0; s < 3; s++) if (slots[s] == null) slots[s] = dec[d++];
      out.slots[ri] = slots;
    });
    return out;
  }

  /* ---------------- state ----------------
     tank: raft (0|1 sealed), seats (0–9 on the raft's frame), loose (drifting), tow (hooked behind the raft);
     reeds: raft (0|1 ready), spare (loose bubbles to put in the tank) */
  function newState(r, opts) {
    opts = opts || {};
    var st = { id: r.id, level: r.level, kind: r.kind, n: r.n, cards: null, frame: false,
      tank: { raft: 0, seats: 0, loose: 0, tow: 0 }, reeds: { raft: 0, spare: 0 },
      popped: false, record: null, ghost: null, pick: null, misses: 0, help: 0, last: null, done: false, explore: false };
    if (r.kind === 'catch') { st.frame = true; st.tank.loose = r.n; }
    if (r.kind === 'dock') { st.reeds.raft = 1; st.reeds.spare = SPARE; }
    if (r.kind === 'fix') { st.tank.raft = 1; st.tank.tow = r.start; st.reeds.raft = 1; st.reeds.spare = SPARE; }
    if (r.kind === 'pop') { st.tank.raft = 1; st.tank.tow = r.n - 10; }
    /* a deal is only taken when it holds exactly this round's three cards (a stale deal from the other level is refused) */
    if (r.cards) st.cards = (opts.slots && opts.slots.slice().sort(num).join() === r.cards.slice().sort(num).join() ? opts.slots : r.cards).slice();
    if (r.kind === 'two') {
      var left = r.bigLeft ? Math.max(r.a, r.b) : Math.min(r.a, r.b), right = r.a + r.b - left;
      if (opts.swap) { var t = left; left = right; right = t; }
      st.two = [left, right]; st.a = r.a; st.b = r.b;
    }
    return st;
  }
  function newPlay() {
    var st = newState({ id: 'play', level: '19', kind: 'catch', n: 0 });
    st.explore = true; st.tank.loose = 0; st.reeds.spare = Infinity; st.cards = null; return st;
  }
  function value(tank) { return tank.raft * 10 + tank.seats + tank.loose + tank.tow; }
  function inTank(st) { return value(st.tank); }
  function moved(st) { st.help = 0; st.last = null; st.ghost = null; st.pick = null; }

  /* the seal: ten seats melt into ONE raft and every loose bubble hooks onto its tow-line */
  function seal(st) { st.tank.raft = 1; st.tank.seats = 0; st.tank.tow += st.tank.loose; st.tank.loose = 0; return { sealed: true }; }
  /* catch one loose bubble onto the next free seat */
  function catchBubble(st) {
    if (st.done || !st.frame || st.tank.raft || st.tank.loose < 1) return null;
    st.tank.loose--; st.tank.seats++; moved(st);
    if (st.tank.seats === 10) return seal(st);
    return { seat: st.tank.seats };
  }
  /* a seated bubble floats off its seat */
  function release(st) {
    if (st.done || st.tank.raft || st.tank.seats < 1) return null;
    st.tank.seats--; st.tank.loose++; moved(st); return {};
  }
  /* pop a sealed raft: ten loose bubbles drift again; the tow-line row stays */
  function pop(st) {
    if (st.done || !st.tank.raft || !(st.kind === 'pop' || st.explore)) return null;
    st.tank.raft = 0; st.tank.loose += 10; st.popped = true; moved(st); return { popped: true };
  }
  /* dock the ready raft from the reeds; only one raft fits */
  function dock(st) {
    if (st.done || st.reeds.raft < 1) return null;
    if (st.tank.raft || st.tank.seats) return { refused: 'oneTen' };
    st.reeds.raft = 0; st.tank.raft = 1; st.tank.tow += st.tank.loose; st.tank.loose = 0; moved(st); return { docked: true };
  }
  /* a spare bubble from the reeds into the tank: onto the tow-line when a raft is there, else loose */
  function addSpare(st) {
    if (st.done || st.reeds.spare < 1 || inTank(st) >= TANK_MAX) return null;
    st.reeds.spare--;
    if (st.tank.raft) st.tank.tow++; else st.tank.loose++;
    moved(st); return {};
  }
  /* a bubble back to the reeds (DOCK, FIX, free play): the last on the tow-line, else a loose one */
  function takeBubble(st) {
    if (st.done || st.kind === 'catch' && !st.explore || st.kind === 'pop') return null;
    if (st.tank.tow > 0) st.tank.tow--; else if (st.tank.loose > 0) st.tank.loose--; else return null;
    st.reeds.spare++; moved(st); return {};
  }

  function ghostOf(m) { return { rafts: Math.floor(m / 10), ones: m % 10 }; }
  /* the card is the commit in CATCH and POP: it is only taken once the ten is a raft (CATCH) or popped (POP) */
  function ready(st) { return st.kind === 'catch' ? st.tank.raft === 1 : st.kind === 'pop' ? st.popped : false; }
  function pickCard(st, m) {
    if (st.done || st.explore || !st.cards || st.cards.indexOf(m) < 0) return null;
    if (!ready(st)) { st.last = { result: 'notyet' }; return st.last; }
    st.pick = m;
    if (m === st.n) {
      st.record = m; st.done = true; st.ghost = null; st.help = 0;
      st.last = { result: 'ok', n: st.n, k: st.n - 10 };
      return st.last;
    }
    st.misses++; st.help = Math.min(2, st.misses); st.ghost = ghostOf(m);
    st.last = { result: 'wrong', card: m, miss: true };
    return st.last;
  }
  /* free play: any card builds its ghost — nothing is judged */
  function playCard(st, m) { if (!st.explore || m < 1 || m > 99) return null; st.ghost = ghostOf(m); st.pick = m; return st.ghost; }
  /* DOCK / FIX: Check */
  function check(st) {
    if (st.done || st.explore || !(st.kind === 'dock' || st.kind === 'fix')) return null;
    var v = inTank(st), res;
    if (st.kind === 'dock' && v === 0) { st.last = { result: 'empty' }; return st.last; }
    if (v === st.n && st.tank.raft === 1) {
      st.done = true; st.record = st.n; st.help = 0; st.ghost = null;
      st.last = { result: 'ok', n: st.n, k: st.n - 10 }; return st.last;
    }
    st.misses++; st.help = Math.min(2, st.misses); st.ghost = ghostOf(st.n);
    res = { result: v < st.n ? 'few' : 'many', have: v, miss: true };
    st.last = res; return res;
  }
  /* TWO TANKS: tap the tank with more */
  function pickTank(st, side) {
    if (st.done || st.kind !== 'two' || (side !== 0 && side !== 1)) return null;
    var other = 1 - side;
    if (st.two[side] > st.two[other]) { st.done = true; st.pick = side; st.help = 0; st.last = { result: 'ok' }; return st.last; }
    st.misses++; st.help = Math.min(2, st.misses); st.pick = side;
    st.last = { result: 'wrong', miss: true }; return st.last;
  }

  /* the bubble's sentence */
  function hint(st) {
    if (st.explore || st.done || !st.last) return null;
    var L = st.last;
    if (L.result === 'notyet') return { key: st.kind === 'pop' ? 'hintPop' : 'hintCatch', wrong: false };
    if (L.result === 'empty') return { key: 'hintDock', wrong: false };
    if (L.result === 'ok') return null;
    if (st.kind === 'two') return { key: 'hintSameTen', wrong: true };
    if (st.kind === 'dock' || st.kind === 'fix') return st.help >= 2 ? { key: 'hintNeed', k: st.n - 10, wrong: true } : { key: 'hintGhostMake', wrong: true };
    if (st.help >= 2) return { key: st.kind === 'pop' ? 'hintTenLoose' : 'hintOneTen', k: st.n - 10, wrong: true };
    return { key: 'hintGhost', m: L.card, wrong: true };
  }
  function success(st) {
    if (!st.done || st.explore) return null;
    if (st.kind === 'two') {
      var big = Math.max(st.a, st.b), small = Math.min(st.a, st.b);
      return { key: 'okTwo', args: { a: big, b: small, ka: big - 10, kb: small - 10 } };
    }
    return { key: st.kind === 'pop' ? 'okPop' : 'okMake', args: { n: st.n, k: st.n - 10 } };
  }
  /* the record strip "10 + k = n": the k and n boxes fill on success; POP shows its k from the start */
  function record(st) {
    if (st.kind === 'two') return null;
    var k = st.n - 10;
    return { ten: 10, k: st.done || st.kind === 'pop' ? k : null, n: st.done ? st.n : (st.kind === 'dock' || st.kind === 'fix' ? st.n : null) };
  }
  /* miss 2 (CATCH / POP): the raft's badge and the tow-line numbers counting on from 11 */
  function numbered(st) { return !st.done && !st.explore && st.help >= 2 && (st.kind === 'catch' || st.kind === 'pop'); }
  /* DOCK / FIX miss 2: which bubbles blink — missing (k > tow) or extra (tow > k) */
  function blink(st) {
    if (st.done || st.help < 2 || !(st.kind === 'dock' || st.kind === 'fix')) return null;
    var want = st.n - 10, have = st.tank.tow + st.tank.loose;
    return { missing: Math.max(0, want - have), extra: Math.max(0, have - want), raft: st.tank.raft ? 0 : 1 };
  }
  /* TWO TANKS help: miss 1 pairs the rows one-to-one, miss 2 makes the extra bubbles glow */
  function pairing(st) {
    if (st.kind !== 'two' || st.help < 1 || st.done) return null;
    return { rows: [st.two[0] - 10, st.two[1] - 10], glow: st.help >= 2 };
  }

  /* the drift: a slow wander plus a bob; the two together never pass DRIFT_MAX px/s (the cap that keeps
     a bubble catchable on a small phone). box = { x0, y0, x1, y1 } for the bubble's top-left corner. */
  var WANDER = 8, BOB_A = 3, BOB_W = 1.2; /* the bob's speed is at most BOB_A × BOB_W = 3.6 px/s */
  function newBubble(rand, box) {
    rand = rand || Math.random;
    var ang = rand() * Math.PI * 2, sp = WANDER * (0.4 + 0.6 * rand());
    return { x: box.x0 + rand() * Math.max(0, box.x1 - box.x0), y: box.y0 + rand() * Math.max(0, box.y1 - box.y0),
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, ph: rand() * Math.PI * 2, t: 0 };
  }
  function driftStep(b, dt, box) {
    b.t += dt;
    b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.x < box.x0) { b.x = box.x0; b.vx = Math.abs(b.vx); } if (b.x > box.x1) { b.x = box.x1; b.vx = -Math.abs(b.vx); }
    if (b.y < box.y0) { b.y = box.y0; b.vy = Math.abs(b.vy); } if (b.y > box.y1) { b.y = box.y1; b.vy = -Math.abs(b.vy); }
    return { x: b.x, y: b.y + BOB_A * Math.sin(b.ph + BOB_W * b.t) };
  }
  function maxSpeed() { return WANDER + BOB_A * BOB_W; }

  /* layout: stacked; the bay sits beside the tank from 600 px, under it on phones */
  function layout(W) {
    var wide = W >= 600;
    var L = { mode: wide ? 'wide' : 'narrow', bay: wide ? Math.min(150, Math.max(120, Math.round(W * 0.2))) : 0 };
    L.tankW = wide ? W - L.bay - 12 : W;
    L.duck = wide ? 96 : 64;
    /* the raft frame sits right of Dewey on the bank: five seats + four gaps + its padding */
    L.seat = wide ? 48 : Math.max(32, Math.min(42, Math.floor((L.tankW - L.duck - 22 - 4 * 4 - 12 - 4) / 5)));
    L.bubble = 46; /* a loose bubble is a tap target: never under 44 px */
    L.tow = wide ? 40 : Math.max(24, Math.min(30, Math.floor((L.tankW - L.duck - 38) / 9) - 6));
    L.tankH = wide ? 330 : W < 300 ? 236 : 260;
    return L;
  }

  var api = {
    LEVELS: LEVELS, SPARE: SPARE, TANK_MAX: TANK_MAX, DRIFT_MAX: DRIFT_MAX, HOLD_MS: HOLD_MS,
    level: level, rounds: rounds, decoyKinds: decoyKinds, order: order, deal: deal, newState: newState, newPlay: newPlay,
    value: value, inTank: inTank, seal: seal, catchBubble: catchBubble, release: release, pop: pop, dock: dock,
    addSpare: addSpare, takeBubble: takeBubble, ghostOf: ghostOf, ready: ready, pickCard: pickCard, playCard: playCard,
    check: check, pickTank: pickTank, hint: hint, success: success, record: record, numbered: numbered, blink: blink,
    pairing: pairing, newBubble: newBubble, driftStep: driftStep, maxSpeed: maxSpeed, layout: layout
  };
  global.GhostRaftsCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
