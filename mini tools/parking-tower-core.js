/* =====================================================================
   parking-tower-core.js — the model of ACTIVITY #36 of the one-by-one
   rebuild: "Bramble's Parking Tower" (K.G.A.1 → G2 grid codes + compass).
   Design sheet: docs/activities-rebuild/designs/036-parking-tower.md
   ---------------------------------------------------------------------
   THE INVENTION: a vehicle can only ride the lift up and down and drive
   along a floor, so every position word becomes a route the child sees —
   "above" is one ride up the lift in the landmark's column, never a drive
   sideways.

   Four boards (one setting):
     near   — a 3 × 3 tower; above / below / next to / between / left / right
     tower  — a 2-column tower with street spots, a roof deck and (only
              when asked) a basement; on top / under / beside / inside /
              outside / top · middle · bottom level / left side
     plan6  — the roof plan, 6 × 6, letters A–F across, numbers 1–6 DOWN;
              park in a code, read a code on the dials, compass with a
              turned rose
     plan10 — the roof plan, 10 × 10 (A–J, 1–10); on a narrow card every
              round is read on the dials (taps never shrink below 44 px)
   Bays are (c, l): columns from the left, levels from the GROUND up.
   Plan squares are (c, r): columns from the left, rows from the TOP.
   No DOM. UMD: window.ParkingTowerCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ParkingTowerCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* the library pictures (contact sheet 2026-10-19): truck faces RIGHT
     (mirrored to face the lift), tractor faces the viewer; the rest left.
     vehicles/taxi refused (printed TAXI sign). */
  var VEH = ['bus', 'van', 'car', 'truck', 'bulldozer', 'ambulance', 'tractor', 'jeep'];
  var FACES_RIGHT = { truck: 1 };
  var DIR_OF = { beaver: 'forest creatures' };
  function dirOf(n) { return DIR_OF[n] || 'vehicles'; }
  /* map-token colours (the roof plan's drawn record of a vehicle) */
  var TOKEN = { bus: '#2E8FC9', van: '#E08A1E', car: '#3E9B3A', truck: '#D9572F', bulldozer: '#C9A200', ambulance: '#C93A4A', tractor: '#B4442E', jeep: '#6B8E23' };
  var GREY = '#B9C2C0';
  var MODES = ['near', 'tower', 'plan6', 'plan10'];
  function mode(m) { return MODES.indexOf(m) >= 0 ? m : 'near'; }

  /* ---------------- the rounds (design §6) ---------------- */
  function B(c, l) { return { c: c, l: l }; }
  var NEAR = [
    { id: 'N1', kind: 'place', rel: 'next',    mover: 'truck', lms: [{ v: 'bus', c: 1, l: 1 }],       cands: [B(2, 1), B(1, 2), B(3, 2)], right: B(2, 1) },
    { id: 'N2', kind: 'place', rel: 'above',   mover: 'truck', lms: [{ v: 'van', c: 2, l: 2 }],       cands: [B(2, 3), B(1, 2), B(3, 1)], right: B(2, 3) },
    { id: 'N3', kind: 'place', rel: 'below',   mover: 'truck', lms: [{ v: 'car', c: 3, l: 2 }],       cands: [B(3, 1), B(2, 2), B(1, 3)], right: B(3, 1) },
    { id: 'N4', kind: 'place', rel: 'between', mover: 'truck', lms: [{ v: 'bus', c: 1, l: 2 }, { v: 'van', c: 3, l: 2 }], cands: [B(2, 2), B(2, 3), B(1, 1)], right: B(2, 2) },
    { id: 'N5', kind: 'place', rel: 'left',    mover: 'truck', lms: [{ v: 'bulldozer', c: 2, l: 3 }], cands: [B(1, 3), B(3, 3), B(2, 2)], right: B(1, 3) },
    { id: 'N6', kind: 'place', rel: 'right',   mover: 'truck', lms: [{ v: 'ambulance', c: 2, l: 1 }], cands: [B(3, 1), B(1, 1), B(2, 2)], right: B(3, 1) },
    { id: 'N7', kind: 'tap',   rel: 'above',   mover: 'truck', lms: [{ v: 'bus', c: 3, l: 1 }],       cands: [B(3, 2), B(2, 1), B(2, 2)], right: B(3, 2) },
    { id: 'N8', kind: 'tap',   rel: 'left',    mover: 'truck', lms: [{ v: 'tractor', c: 2, l: 3 }],   cands: [B(1, 3), B(3, 3), B(2, 2)], right: B(1, 3) },
    { id: 'N9', kind: 'place', rel: 'between', mover: 'car',   lms: [{ v: 'truck', c: 1, l: 1 }, { v: 'truck', c: 1, l: 3 }], cands: [B(1, 2), B(2, 2), B(2, 1)], right: B(1, 2) }
  ];
  /* tower: spots are bays B(c,l) (2 × 3) or 'SL' / 'SR' (the street, left /
     right of the tower), 'ROOF', 'BASE' (the basement under the street,
     drawn only when it is a candidate). The street is the entrance level:
     the parking floors are above it, the basement below — so "under" is
     a ride DOWN. T3 offers the street (not the roof) beside the basement:
     a board with both a roof deck and a basement does not fit a phone. */
  var TOWER = [
    { id: 'T1', kind: 'place', trel: 'on',      mover: 'car',       cands: ['ROOF', B(1, 2), 'SR'],   right: 'ROOF' },
    { id: 'T2', kind: 'place', trel: 'inside',  mover: 'van',       cands: [B(2, 1), 'SL', 'ROOF'],   right: B(2, 1) },
    { id: 'T3', kind: 'place', trel: 'under',   mover: 'truck',     cands: ['BASE', 'SR', B(1, 1)],   right: 'BASE' },
    { id: 'T4', kind: 'place', trel: 'beside',  mover: 'bulldozer', cands: ['SR', 'BASE', B(2, 3)],   right: 'SR' },
    { id: 'T5', kind: 'place', trel: 'outside', mover: 'jeep',      cands: ['SL', B(2, 1), B(1, 3)],  right: 'SL' },
    { id: 'T6', kind: 'place', trel: 'top',     mover: 'bus',       cands: [B(1, 3), B(2, 2), B(1, 1)], right: B(1, 3) },
    { id: 'T7', kind: 'place', trel: 'middle',  mover: 'ambulance', cands: [B(2, 2), B(1, 1), B(2, 3)], right: B(2, 2) },
    { id: 'T8', kind: 'place', trel: 'bottom',  mover: 'tractor',   cands: [B(1, 1), B(2, 2), B(1, 3)], right: B(1, 1) },
    { id: 'T9', kind: 'place', trel: 'leftside', mover: 'car',      cands: ['SL', 'SR', 'ROOF'],      right: 'SL' }
  ];
  /* plans: codes are letter across + number DOWN */
  var PLAN6 = [
    { id: 'P1', kind: 'code',    mover: 'car',       code: 'B2' },
    { id: 'P2', kind: 'code',    mover: 'van',       code: 'E5' },
    { id: 'P3', kind: 'code',    mover: 'bulldozer', code: 'A6' },
    { id: 'P4', kind: 'read',    mover: 'bus',       code: 'D3' },
    { id: 'P5', kind: 'read',    mover: 'jeep',      code: 'F1' },
    { id: 'P6', kind: 'compass', mover: 'car',       lm: { v: 'bus', code: 'C4' },   dir: 'north', rose: 0 },
    { id: 'P7', kind: 'compass', mover: 'truck',     lm: { v: 'van', code: 'D2' },   dir: 'east',  rose: 0 },
    { id: 'P8', kind: 'compass', mover: 'bulldozer', lm: { v: 'car', code: 'C3' },   dir: 'south', rose: 90 },
    { id: 'P9', kind: 'compass', mover: 'jeep',      lm: { v: 'truck', code: 'B5' }, dir: 'west',  rose: 180 }
  ];
  var PLAN10 = [
    { id: 'Q1', kind: 'code', mover: 'car',       code: 'C7' },
    { id: 'Q2', kind: 'code', mover: 'van',       code: 'H2' },
    { id: 'Q3', kind: 'code', mover: 'bulldozer', code: 'J9' },
    { id: 'Q4', kind: 'code', mover: 'jeep',      code: 'E10' },
    { id: 'Q5', kind: 'read', mover: 'bus',       code: 'G4' },
    { id: 'Q6', kind: 'read', mover: 'truck',     code: 'B8' },
    { id: 'Q7', kind: 'read', mover: 'ambulance', code: 'D1' },   /* not I1: a capital I beside a 1 reads as 11 */
    { id: 'Q8', kind: 'read', mover: 'van',       code: 'F6' },
    { id: 'Q9', kind: 'read', mover: 'car',       code: 'A3' }
  ];
  function rounds(m) {
    m = mode(m);
    var src = m === 'near' ? NEAR : m === 'tower' ? TOWER : m === 'plan6' ? PLAN6 : PLAN10;
    return src.map(function (r) { var o = JSON.parse(JSON.stringify(r)); o.mode = m; return o; });
  }

  /* ---------------- geometry: the side view ---------------- */
  function key(s) { return typeof s === 'string' ? s : s.c + ',' + s.l; }
  function same(a, b) { return key(a) === key(b); }
  /* every relation a bay has to a landmark bay (the viewer's left/right) */
  function relation(s, lm) {
    var dc = s.c - lm.c, dl = s.l - lm.l, out = [];
    if (dc === 0 && dl === 1) out.push('above');
    if (dc === 0 && dl === -1) out.push('below');
    if (dl === 0 && Math.abs(dc) === 1) out.push('next');
    if (dl === 0 && dc < 0) out.push('left');
    if (dl === 0 && dc > 0) out.push('right');
    if (!out.length) out.push(Math.abs(dc) === 1 && Math.abs(dl) === 1 ? 'diagonal' : 'far');
    return out;
  }
  /* between: on one line with a and b, touching both, one on each side */
  function between(s, a, b) {
    if (a.c === b.c && s.c === a.c) return Math.abs(a.l - b.l) === 2 && s.l === (a.l + b.l) / 2;
    if (a.l === b.l && s.l === a.l) return Math.abs(a.c - b.c) === 2 && s.c === (a.c + b.c) / 2;
    return false;
  }
  function nearTruth(r, s) {
    if (typeof s === 'string') return false;
    if (r.rel === 'between') return between(s, r.lms[0], r.lms[1]);
    return relation(s, r.lms[0]).indexOf(r.rel) >= 0;
  }
  /* the tower words: which ones a spot satisfies */
  function towerRel(s) {
    if (s === 'ROOF') return ['on'];
    if (s === 'BASE') return ['under'];
    if (s === 'SL') return ['beside', 'outside', 'leftside'];
    if (s === 'SR') return ['beside', 'outside', 'rightside'];
    return ['inside', s.l === 3 ? 'top' : s.l === 2 ? 'middle' : 'bottom'];
  }
  function towerTruth(r, s) { return towerRel(s).indexOf(r.trel) >= 0; }

  /* the free bays/spots and the parked fillers of a side-view round */
  function sideSpots(r) {
    var out = [];
    if (r.mode === 'near') { for (var l = 1; l <= 3; l++) for (var c = 1; c <= 3; c++) out.push(B(c, l)); return out; }
    for (var l2 = 1; l2 <= 3; l2++) for (var c2 = 1; c2 <= 2; c2++) out.push(B(c2, l2));
    out.push('SL', 'SR');
    if (hasRoofSpot(r)) out.push('ROOF');
    if (hasBase(r)) out.push('BASE');
    return out;
  }
  function hasBase(r) { return r.mode === 'tower' && r.cands.some(function (s) { return s === 'BASE'; }); }
  function hasRoofSpot(r) { return r.mode === 'tower' && r.cands.some(function (s) { return s === 'ROOF'; }); }
  function isCand(r, s) { return r.cands.some(function (x) { return same(x, s); }); }
  function lmAt(r, s) { var f = null; (r.lms || []).forEach(function (m) { if (typeof s !== 'string' && m.c === s.c && m.l === s.l) f = m; }); return f; }
  /* who stands where at rest: landmarks, the round's trucks (tap rounds),
     fillers in every other bay (never a vehicle the round names) */
  function parkedAt(r) {
    var named = {}; named[r.mover] = 1; (r.lms || []).forEach(function (m) { named[m.v] = 1; });
    var pool = VEH.filter(function (v) { return !named[v]; }), i = 0, out = {};
    sideSpots(r).forEach(function (s) {
      var k = key(s), lm = lmAt(r, s);
      if (lm) { out[k] = { v: lm.v, role: 'landmark' }; return; }
      if (isCand(r, s)) { if (r.kind === 'tap') out[k] = { v: r.mover, role: 'cand' }; return; }
      out[k] = { v: pool[i % pool.length], role: 'filler' }; i++;
    });
    return out;
  }

  /* ---------------- geometry: the roof plan ---------------- */
  var LETTERS = 'ABCDEFGHIJ';
  function size(r) { return r.mode === 'plan10' ? 10 : 6; }
  function codeOf(c, rw) { return LETTERS.charAt(c - 1) + rw; }
  function squareOf(code) { var m = /^([A-J])(\d{1,2})$/.exec(code || ''); return m ? { c: LETTERS.indexOf(m[1]) + 1, r: +m[2] } : null; }
  var DIRV = { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] };
  /* the screen step of a compass direction on a rose turned `rose` degrees
     clockwise (0: north up · 90: north points right · 180: north down) */
  function compassStep(dir, rose) {
    var v = DIRV[dir].slice(), k = ((rose || 0) / 90) % 4;
    for (var i = 0; i < k; i++) v = [-v[1], v[0]];
    return { dc: v[0], dr: v[1] };
  }
  function planAnswer(r) {
    if (r.kind === 'compass') { var a = squareOf(r.lm.code), d = compassStep(r.dir, r.rose); return codeOf(a.c + d.dc, a.r + d.dr); }
    return r.code;
  }
  /* "other cars" on the plan: a few grey tokens, never on the answer, the
     landmark, or (compass) any of the landmark's four neighbours */
  function greyTokens(r) {
    var n = size(r), want = n === 10 ? 9 : 5, seed = 0, out = [], ban = {};
    for (var i = 0; i < r.id.length; i++) seed = (seed * 31 + r.id.charCodeAt(i)) >>> 0;
    ban[planAnswer(r)] = 1;
    if (r.kind === 'compass') { var a = squareOf(r.lm.code); ban[r.lm.code] = 1; [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(function (d) { ban[codeOf(a.c + d[0], a.r + d[1])] = 1; }); }
    var guard = 0;
    while (out.length < want && guard++ < 500) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      var c = 1 + (seed >>> 8) % n; seed = (seed * 1103515245 + 12345) >>> 0;
      var rw = 1 + (seed >>> 8) % n, code = codeOf(c, rw);
      if (ban[code]) continue; ban[code] = 1; out.push(code);
    }
    return out;
  }
  /* the plan's tokens: {code: {v, role}} */
  function planTokens(r, read) {
    var out = {};
    greyTokens(r).forEach(function (cd) { out[cd] = { v: null, role: 'grey' }; });
    if (r.kind === 'compass') out[r.lm.code] = { v: r.lm.v, role: 'landmark' };
    if (read) out[r.code] = { v: r.mover, role: 'mover' };
    return out;
  }
  /* a round is READ on the dials: read rounds, and every 10 × 10 round on
     a card too narrow for 44 px squares */
  function isRead(r, narrow) { return r.kind === 'read' || (r.mode === 'plan10' && !!narrow); }

  /* ---------------- the state ---------------- */
  function newState(r, narrow) {
    return { r: r, read: r.mode.indexOf('plan') === 0 && isRead(r, narrow), parked: null, sel: null, dials: { l: null, n: null }, misses: 0, help: 0, done: false, last: null };
  }
  function occupied(st, s) {
    var r = st.r;
    if (r.mode.indexOf('plan') === 0) return !!planTokens(r, st.read)[s];
    var p = parkedAt(r)[key(s)];
    return !!p;
  }
  /* park the mover in a free spot (side view) or a free square (plan) */
  function park(st, s) {
    var r = st.r;
    if (r.kind === 'tap' || st.read) return false;
    if (r.mode.indexOf('plan') !== 0 && !sideSpots(r).some(function (x) { return same(x, s); })) return false;
    if (r.mode.indexOf('plan') === 0 && !squareOf(s)) return false;
    if (r.mode.indexOf('plan') === 0 && squareOf(s).c > size(r)) return false;
    if (occupied(st, s)) return false;
    /* after success the vehicle may be re-parked anywhere (free play);
       the round stays done */
    if (st.done) { st.parked = s; st.free = true; return true; }
    st.parked = s; st.help = 0; st.last = null;
    return true;
  }
  /* tap one of the round's trucks (reverse rounds) */
  function select(st, s) {
    if (st.done || st.r.kind !== 'tap' || !isCand(st.r, s)) return false;
    st.sel = s; st.help = 0; st.last = null;
    return true;
  }
  /* turn a dial: which 'l' or 'n', by +1 / -1 (wraps; starts at the first) */
  function turn(st, which, d) {
    if (st.done || !st.read) return false;
    var n = size(st.r), v = st.dials[which];
    v = v == null ? (d > 0 ? 1 : n) : ((v - 1 + d + n) % n) + 1;
    st.dials[which] = v; st.help = 0; st.last = null;
    return true;
  }
  function dialCode(st) { return st.dials.l == null || st.dials.n == null ? null : codeOf(st.dials.l, st.dials.n); }
  function answerOf(st) { var r = st.r; return r.mode.indexOf('plan') === 0 ? (st.read ? dialCode(st) : st.parked) : r.kind === 'tap' ? st.sel : st.parked; }
  function truth(st, a) {
    var r = st.r;
    if (a == null) return false;
    if (r.mode === 'near') return nearTruth(r, a);
    if (r.mode === 'tower') return isCand(r, a) && towerTruth(r, a);
    return a === planAnswer(r);
  }
  function check(st) {
    if (st.done) return st.last;
    var a = answerOf(st);
    if (a == null) { st.last = { result: 'empty' }; return st.last; }
    if (truth(st, a)) { st.done = true; st.last = { result: 'ok' }; return st.last; }
    st.misses++; st.help = Math.min(2, st.help + 1);
    st.last = { result: 'wrong', did: a };
    return st.last;
  }
  /* the right spot/square of the round (what miss 2 glows) */
  function rightOf(r) { return r.mode.indexOf('plan') === 0 ? planAnswer(r) : r.right; }

  /* ---------------- the words ---------------- */
  function prompt(r, read) {
    if (r.mode === 'near' || r.mode === 'tower') return 'p_' + r.id;
    if (read) return 'pRead_' + r.mover;
    if (r.kind === 'compass') return 'p_' + r.id;
    return 'pCode_' + r.mover;
  }
  function success(r) { return (r.mode === 'near' || r.mode === 'tower' || r.kind === 'compass') ? 'ok_' + r.id : 'okCode'; }
  /* the miss hint (relation-specific), or the empty-Check hint */
  function hint(st) {
    var r = st.r, last = st.last;
    if (last && last.result === 'empty') return st.read ? 'hintDials' : r.kind === 'tap' ? 'hintTapTruck' : 'hintTapFree';
    if (!st.help) return null;
    if (st.help >= 2) return st.read ? 'hintStrongRead' : r.kind === 'tap' ? 'hintStrongTap' : 'hintStrong';
    if (r.mode === 'near') return 'hint' + cap(r.rel);
    if (r.mode === 'tower') return 'hintT' + cap(r.trel);
    if (r.kind === 'compass') return 'hintNorth';
    return 'hintCode';
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------------- order: order-only reshuffle ---------------- */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 60; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      for (var j = n - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; }
      if (prev && n > 1 && o.join() === prev.join()) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout (px) ---------------- */
  function layout(m, W) {
    var wide = W >= 560;
    if (m === 'near' || m === 'tower') {
      var cols = m === 'near' ? 3 : 2;
      /* tight: a 320 px phone (stage 288) — every px of height is the fold */
      var tight = W < 340;
      var lift = wide ? 40 : tight ? 18 : 22, wall = wide ? 6 : tight ? 3 : 4, slab = wide ? 10 : tight ? 6 : 8;
      var street = m === 'tower' ? (wide ? 150 : tight ? 64 : 72) : 0;
      var bayH = wide ? 102 : tight ? 70 : 80, veh = wide ? 96 : 64;
      var avail = Math.min(W, wide ? 640 : 380) - lift - 2 * street - wall * (cols + 1) - 4;
      var bayW = Math.min(wide ? 150 : 104, Math.floor(avail / cols));
      return { mode: wide ? 'wide' : 'narrow', tight: tight, W: W, cols: cols, lift: lift, wall: wall, slab: slab, street: street, bayW: bayW, bayH: bayH, veh: veh, roofH: wide ? 22 : tight ? 14 : 18, baseH: bayH, drive: veh + (tight ? 6 : 12), beaver: veh };
    }
    /* the plan: the grid with the key / rose / dials column beside it when
       that fits with squares big enough to tap (6 × 6 ≥ 50, 10 × 10 ≥ 44);
       otherwise the key and rose ride above the grid. A 10 × 10 grid on a
       narrow card is display-only: its rounds are read on the dials. */
    var n = m === 'plan10' ? 10 : 6, side = n === 10 ? 136 : 168, gap = 16, strip = n === 10 ? 24 : 26;
    var sqW = Math.floor((W - side - gap - strip) / n);
    if (sqW >= (n === 10 ? 44 : 50)) { var sq = Math.min(n === 10 ? 48 : 70, sqW); return { mode: 'wide', W: W, n: n, sq: sq, strip: strip, side: side, gap: gap, token: n === 10 ? 30 : 44, key: 96, rose: n === 10 ? 104 : 120, tap: true }; }
    var tightP = W < 340, strip2 = n === 10 || tightP ? 16 : 20, sq2 = Math.min(n === 10 ? 40 : 56, Math.floor((Math.min(W, 420) - strip2) / n));
    return { mode: 'narrow', tight: tightP, W: W, n: n, sq: sq2, strip: strip2, side: 0, gap: 0, token: n === 10 ? Math.max(14, sq2 - 9) : 32, key: 64, rose: tightP ? 64 : 72, tap: n === 6 && sq2 >= 44 };
  }

  return {
    VEH: VEH, FACES_RIGHT: FACES_RIGHT, TOKEN: TOKEN, GREY: GREY, MODES: MODES, LETTERS: LETTERS,
    mode: mode, rounds: rounds, dirOf: dirOf, key: key, same: same,
    relation: relation, between: between, nearTruth: nearTruth, towerRel: towerRel, towerTruth: towerTruth,
    sideSpots: sideSpots, hasBase: hasBase, hasRoofSpot: hasRoofSpot, isCand: isCand, parkedAt: parkedAt,
    size: size, codeOf: codeOf, squareOf: squareOf, compassStep: compassStep, planAnswer: planAnswer,
    greyTokens: greyTokens, planTokens: planTokens, isRead: isRead,
    newState: newState, occupied: occupied, park: park, select: select, turn: turn, dialCode: dialCode,
    answerOf: answerOf, truth: truth, check: check, rightOf: rightOf,
    prompt: prompt, success: success, hint: hint, cap: cap, order: order, layout: layout
  };
}));
