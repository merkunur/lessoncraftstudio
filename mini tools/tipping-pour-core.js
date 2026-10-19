/* =====================================================================
   tipping-pour-core.js — the model behind ACTIVITY #33 of the one-by-one
   rebuild: "Which Holds More?" (K.MD.A.2) — THE TIPPING POUR.
   Design sheet: docs/activities-rebuild/designs/033-bramble.md
   ---------------------------------------------------------------------
   Pure UMD, Node-loadable, no DOM. Every vessel is a list of CAVITY profile
   segments [y0, y1, r0, r1] (model units, y up from the cavity floor) — a
   solid of revolution — plus an outer wall. Capacity is COMPUTED from the
   cavity (frustum formula), never stored, so every illusion is a real one:
   a thick pot is big outside and small inside, a tall glass can hold less
   than a low pan. The truth of a round is derived from those capacities,
   the side swap and the question; no round carries an answer field.

   The pour: the left vessel (always the one poured) is tipped about its
   lip. What it can still hold at a tilt is the share of its 2D cross-section
   that lies below the line through its inner lip, mapped back to a volume;
   any juice above that runs out into the other vessel, which overflows into
   the drip tray when full. Juice is conserved exactly.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TippingPourCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PI = Math.PI;

  /* ---------------- the vessels (cavity profile, outer wall) ----------------
     wall/base are the outer shell's thickness; thin glass is 1 / 2. A thick
     vessel names its outer radius and height (the cavity sits in the top). */
  function cyl(r, h) { return [[0, h, r, r]]; }
  function fr(r0, r1, h) { return [[0, h, r0, r1]]; }
  var V = {
    cup15:      { kind: 'cup',    cav: cyl(15, 40) },
    cup15b:     { kind: 'cup',    cav: cyl(15, 35) },
    jug34:      { kind: 'jug',    cav: cyl(34, 90) },
    bowl22:     { kind: 'bowl',   cav: fr(22, 41, 50) },
    bowl24:     { kind: 'bowl',   cav: fr(24, 41, 50) },
    mug24:      { kind: 'mug',    cav: cyl(24, 60) },
    mug22:      { kind: 'mug',    cav: cyl(22, 50) },
    pan43:      { kind: 'pan',    cav: cyl(43, 46) },
    glass20:    { kind: 'glass',  cav: cyl(20, 88) },
    bottle:     { kind: 'bottle', cav: [[0, 64, 26, 26], [64, 88, 10, 10]] },
    glass23:    { kind: 'glass',  cav: cyl(23, 92) },
    bowl30:     { kind: 'bowl',   cav: fr(30, 42, 48) },
    jug24:      { kind: 'jug',    cav: cyl(24, 90) },
    glass30:    { kind: 'glass',  cav: cyl(30, 94) },
    tub40:      { kind: 'tub',    cav: cyl(40, 40) },
    pot:        { kind: 'pot',    cav: cyl(26, 60), thick: { r: 40, h: 84 } },
    mug27:      { kind: 'mug',    cav: cyl(27, 70) },
    glass24:    { kind: 'glass',  cav: cyl(24, 80) },
    stone:      { kind: 'stone',  cav: cyl(31, 32), thick: { r: 45, h: 50 } },
    flute:      { kind: 'flute',  cav: cyl(20, 94) },
    dish40:     { kind: 'dish',   cav: cyl(40, 18) },
    vial25:     { kind: 'vial',   cav: cyl(25, 94) },
    tub44:      { kind: 'tub',    cav: cyl(44, 44) },
    jar31:      { kind: 'jar',    cav: cyl(31, 94) },
    bin43:      { kind: 'bin',    cav: cyl(43, 38) },
    bowl24b:    { kind: 'bowl',   cav: fr(24, 36, 50) },
    jug25:      { kind: 'jug',    cav: cyl(25, 90) },
    tub30:      { kind: 'tub',    cav: null }   /* height SOLVED below: holds exactly what glass20 holds */
  };
  var WALL = 1, BASE = 2, HANDLE = 12;

  /* ---------------- volume / level ---------------- */
  function segVol(s, h) {                    /* volume of a segment from its foot up to height h inside it */
    var t = Math.max(0, Math.min(h, s[1]) - s[0]); if (t <= 0) return 0;
    var r0 = s[2], r1 = s[2] + (s[3] - s[2]) * t / (s[1] - s[0]);
    return PI * t / 3 * (r0 * r0 + r0 * r1 + r1 * r1);
  }
  function cavTop(v) { return v.cav[v.cav.length - 1][1]; }
  function volumeAt(v, h) { var s = 0; for (var i = 0; i < v.cav.length; i++) s += segVol(v.cav[i], h); return s; }
  function capacity(v) { return volumeAt(v, cavTop(v)); }
  function levelFor(v, vol) {                /* bisection, ≤ 50 steps */
    var top = cavTop(v); if (vol <= 0) return 0; if (vol >= capacity(v)) return top;
    var lo = 0, hi = top;
    for (var i = 0; i < 50; i++) { var m = (lo + hi) / 2; if (volumeAt(v, m) < vol) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* solve tub30's height so it holds exactly what glass20 holds */
  (function () { var target = capacity(V.glass20); V.tub30.cav = cyl(30, target / (PI * 900)); })();

  /* ---------------- outer shell (drawn; also the look-cue audit) ---------------- */
  function outer(v) {
    if (v.thick) return { r: v.thick.r, h: v.thick.h, floor: v.thick.h - cavTop(v), wall: v.thick.r - v.cav[0][2] };
    var rmax = 0; v.cav.forEach(function (s) { rmax = Math.max(rmax, s[2], s[3]); });
    return { r: rmax + WALL, h: cavTop(v) + BASE, floor: BASE, wall: WALL };
  }
  /* half-width of the outer outline at height y (y up from the outer foot) */
  function outerHalf(v, y) {
    var o = outer(v); if (v.thick) return o.r;
    var c = y - o.floor; if (c <= 0) return radiusAt(v, 0) + WALL;
    return radiusAt(v, Math.min(c, cavTop(v))) + WALL;
  }
  function radiusAt(v, c) {
    for (var i = 0; i < v.cav.length; i++) { var s = v.cav[i]; if (c <= s[1] + 1e-9) return s[2] + (s[3] - s[2]) * Math.max(0, c - s[0]) / (s[1] - s[0]); }
    return v.cav[v.cav.length - 1][3];
  }
  function hasHandle(v) { return v.kind === 'mug'; }
  /* the silhouette a child sees: its height, its full width (handle included) and its area */
  function look(v) {
    var o = outer(v), area = 0, N = 400;
    for (var i = 0; i < N; i++) area += 2 * outerHalf(v, (i + 0.5) * o.h / N) * o.h / N;
    var w = 2 * o.r + (hasHandle(v) ? HANDLE : 0);
    if (hasHandle(v)) area += HANDLE * o.h * 0.5;
    return { h: o.h, w: w, area: area };
  }

  /* the cavity cross-section as a polygon in vessel-local coords (x right, y up, origin = outer foot centre) */
  function cavPoly(v) {
    var f = outer(v).floor, pts = [], i;
    for (i = 0; i < v.cav.length; i++) { var s = v.cav[i]; pts.push([s[2], f + s[0]]); pts.push([s[3], f + s[1]]); }
    for (i = v.cav.length - 1; i >= 0; i--) { var t = v.cav[i]; pts.push([-t[3], f + t[1]]); pts.push([-t[2], f + t[0]]); }
    return pts;
  }
  function area(poly) { var a = 0; for (var i = 0; i < poly.length; i++) { var p = poly[i], q = poly[(i + 1) % poly.length]; a += p[0] * q[1] - q[0] * p[1]; } return Math.abs(a) / 2; }
  /* clip a polygon to {p : n·p <= c} (Sutherland–Hodgman, one half-plane) */
  function clip(poly, n, c) {
    var out = [];
    for (var i = 0; i < poly.length; i++) {
      var p = poly[i], q = poly[(i + 1) % poly.length];
      var dp = n[0] * p[0] + n[1] * p[1] - c, dq = n[0] * q[0] + n[1] * q[1] - c;
      if (dp <= 0) out.push(p);
      if ((dp < 0 && dq > 0) || (dp > 0 && dq < 0)) { var t = dp / (dp - dq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
    }
    return out;
  }
  /* world-up direction expressed in the vessel's own frame, tipped by deg toward dir (+1 right, -1 left) */
  function upIn(deg, dir) { var a = deg * PI / 180; return [-dir * Math.sin(a), Math.cos(a)]; }
  function upright2D(v, h) { return area(clip(cavPoly(v), [0, 1], outer(v).floor + h)); }
  /* volume → the upright 2D area it fills, and back */
  function areaForVolume(v, vol) { return upright2D(v, levelFor(v, vol)); }
  function volumeForArea(v, a) {
    var top = cavTop(v); if (a <= 0) return 0;
    var lo = 0, hi = top;
    for (var i = 0; i < 50; i++) { var m = (lo + hi) / 2; if (upright2D(v, m) < a) lo = m; else hi = m; }
    return volumeAt(v, (lo + hi) / 2);
  }
  function lipInner(v, dir) { var c = v.cav[v.cav.length - 1]; return [dir * c[3], outer(v).floor + c[1]]; }
  /* what a vessel can still hold when tipped by deg toward dir */
  function hold(v, deg, dir) {
    if (deg <= 0) return capacity(v);
    var n = upIn(deg, dir), lip = lipInner(v, dir);
    return volumeForArea(v, area(clip(cavPoly(v), n, n[0] * lip[0] + n[1] * lip[1])));
  }
  /* the liquid's polygon (vessel frame) for a volume at a tilt: its surface stays level */
  function liquidPoly(v, vol, deg, dir) {
    if (vol <= 0) return [];
    var poly = cavPoly(v), target = areaForVolume(v, vol), n = upIn(deg, dir);
    var lo = Infinity, hi = -Infinity;
    poly.forEach(function (p) { var d = n[0] * p[0] + n[1] * p[1]; lo = Math.min(lo, d); hi = Math.max(hi, d); });
    for (var i = 0; i < 40; i++) { var m = (lo + hi) / 2; if (area(clip(poly, n, m)) < target) lo = m; else hi = m; }
    return clip(poly, n, (lo + hi) / 2);
  }

  /* ---------------- the rounds ----------------
     A is poured into B (A stands left unless the pass swaps the sides). */
  var EASY = [
    { id: 'E1', A: 'cup15',  B: 'jug34' },
    { id: 'E2', A: 'bowl22', B: 'cup15b' },
    { id: 'E3', A: 'mug24',  B: 'mug24' },
    { id: 'E4', A: 'mug24',  B: 'jug34' },
    { id: 'E5', A: 'pan43',  B: 'cup15' },
    { id: 'E6', A: 'glass20', B: 'glass20' },
    { id: 'E7', A: 'cup15',  B: 'bowl24' },
    { id: 'E8', A: 'bottle', B: 'mug22' }
  ];
  var TRICKY = [
    { id: 'T1', cog: 'wide-wins',   A: 'glass23', B: 'bowl30' },
    { id: 'T2', cog: 'tall-less',   A: 'jug24',   B: 'pan43' },
    { id: 'T3', cog: 'narrow-wins', A: 'glass30', B: 'tub40' },
    { id: 'T4', cog: 'decouple',    A: 'pot',     B: 'mug27' },
    { id: 'T5', cog: 'decouple',    A: 'glass24', B: 'stone' },
    { id: 'T6', cog: 'narrow-wins', A: 'flute',   B: 'dish40' },
    { id: 'T7', cog: 'transfer',    A: 'vial25',  B: 'tub44' },
    { id: 'T8', cog: 'transfer',    A: 'jar31',   B: 'bin43' },
    { id: 'T9', cog: 'fit',         A: 'bowl24b', B: 'jug25', fit: true },
    { id: 'T10', cog: 'same',       A: 'glass20', B: 'tub30' }
  ];
  var SAME_TOL = 0.001;            /* "the same" = within 0.1 % */
  var SPILL_SEEN = 0.005;          /* a spill counts once 0.5 % of the vessel has run over */
  var MAX_TILT = 95;               /* past 90° every lip-topped cavity empties */

  function cups(level) { return level === 'tricky' ? 'tricky' : 'easy'; }
  function question(q) { return q === 'less' || q === 'mixed' ? q : 'more'; }
  function rounds(level) { return (cups(level) === 'tricky' ? TRICKY : EASY).map(function (r, i) { var o = {}; for (var k in r) o[k] = r[k]; o.i = i; return o; }); }

  /* which vessel stands left / right in this round */
  function sides(r, swap) { return swap ? { L: r.B, R: r.A } : { L: r.A, R: r.B }; }
  function compare(r, swap) {
    var s = sides(r, swap), a = capacity(V[s.L]), b = capacity(V[s.R]);
    if (Math.abs(a - b) <= SAME_TOL * Math.max(a, b)) return 'SAME';
    return a > b ? 'A' : 'B';
  }
  /* where the berry belongs: A (left), B (right), SAME, or FITS / SPILLS in the fit round */
  function truth(r, swap, polarity) {
    var c = compare(r, swap);
    if (r.fit) return c === 'B' || c === 'SAME' ? 'FITS' : 'SPILLS';
    if (c === 'SAME' || polarity !== 'less') return c;
    return c === 'A' ? 'B' : 'A';
  }
  function polarityAt(q, index) { var p = question(q); return p === 'mixed' ? (index % 2 === 0 ? 'more' : 'less') : p; }
  /* the side swap: none on the first pass; on odd passes half the rounds swap (alternating halves) */
  function swapOf(i, pass) { if (pass % 2 === 0) return false; return (pass % 4 === 1) ? i % 2 === 0 : i % 2 === 1; }

  /* order-only reshuffle, every pass including the first (a return visit never replays the same
     sequence; the Easy table is the on-ramp by its content, not its order), never the previous order, never the same berry
     place three times running; Tricky: T9/T10 never open a pass. */
  function order(pool, rnd, prev, pass, polQ) {
    var n = pool.length, tricky = pool[0] && pool[0].id.charAt(0) === 'T';
    for (var tries = 0; tries < 400; tries++) {
      var a = pool.map(function (_, i) { return i; });
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      if (tricky && (pool[a[0]].fit || pool[a[0]].cog === 'same')) continue;
      if (!runOk(pool, a, pass || 0, polQ)) continue;
      return a;
    }
    return a;
  }
  function runOk(pool, a, pass, polQ) {
    var last = null, run = 0;
    for (var k = 0; k < a.length; k++) {
      var r = pool[a[k]], t = truth(r, swapOf(r.i, pass), polarityAt(polQ, k));
      if (t === last) { run++; if (run >= 3) return false; } else { last = t; run = 1; }
    }
    return true;
  }

  /* ---------------- a round's state ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var s = sides(r, !!opts.swap);
    return {
      round: r.id, fit: !!r.fit, swap: !!opts.swap, polarity: r.fit ? 'fit' : (opts.polarity === 'less' ? 'less' : 'more'),
      L: s.L, R: s.R, berry: null,
      vol: { L: 0, R: 0 }, spilled: 0, docked: null, tilt: 0, poured: false,
      outcome: null, misses: 0, help: 0, done: false, last: null
    };
  }
  function want(st) {
    var r = { A: st.L, B: st.R, fit: st.fit };
    var a = capacity(V[st.L]), b = capacity(V[st.R]), c = Math.abs(a - b) <= SAME_TOL * Math.max(a, b) ? 'SAME' : a > b ? 'A' : 'B';
    if (r.fit) return c === 'B' || c === 'SAME' ? 'FITS' : 'SPILLS';
    if (c === 'SAME' || st.polarity !== 'less') return c;
    return c === 'A' ? 'B' : 'A';
  }
  function places(st) { return st.fit ? ['FITS', 'SPILLS'] : ['A', 'SAME', 'B']; }

  /* put the berry down. Before the pour it just sits; after it, it is judged. */
  function place(st, where) {
    if (st.done) return { result: 'done' };
    if (places(st).indexOf(where) < 0) return { result: 'nope' };
    st.berry = where;
    if (st.outcome) return judge(st);
    st.last = { result: 'placed', where: where };
    return st.last;
  }
  /* the tap fills the LEFT vessel — never before the berry is down (predict first) */
  function fill(st) {
    if (!st.berry) throw new Error('predict first: the berry goes down before the juice');
    if (st.poured || st.docked) return false;
    st.vol.L = capacity(V[st.L]);
    return true;
  }
  function canPour(st) { return !!st.berry && st.vol.L > 0 && !st.outcome && !st.done; }

  /* one step of pouring vessel `from` (L or R) into the other at its tilt; volume conserved */
  function pourStep(st, dt, from) {
    from = from || 'L';
    var to = from === 'L' ? 'R' : 'L', dir = from === 'L' ? 1 : -1;
    var vf = V[st[from]], vt = V[st[to]];
    var h = hold(vf, st.tilt, dir), extra = st.vol[from] - h;
    if (extra <= 1e-9) return 0;
    var out = Math.min(extra, extra * (1 - Math.exp(-3 * dt)) + 600 * dt * (st.tilt / MAX_TILT));
    st.vol[from] -= out; st.vol[to] += out;
    var cap = capacity(vt);
    if (st.vol[to] > cap) { st.spilled += st.vol[to] - cap; st.vol[to] = cap; }
    if (from === 'L' && st.berry && !st.outcome) settle(st);
    return out;
  }
  /* the juice decides: a spill, a gap, or exactly to the brim */
  function settle(st) {
    var capR = capacity(V[st.R]), capL = capacity(V[st.L]);
    if (st.spilled > SPILL_SEEN * capR) st.outcome = 'spill';
    else if (st.vol.L <= 0.002 * capL) st.outcome = Math.abs(st.vol.R - capR) <= SAME_TOL * capR * 2 + 1e-6 ? 'brim' : 'gap';
    if (st.outcome) {
      st.poured = true;
      /* a gap or a brim: the last drops follow (conserved; the brim's few drops over run to the tray) */
      if (st.outcome !== 'spill') { st.vol.R += st.vol.L; st.vol.L = 0; if (st.vol.R > capR) { st.spilled += st.vol.R - capR; st.vol.R = capR; } }
      return judge(st);
    }
    return null;
  }
  function judge(st) {
    if (!st.berry) return null;
    if (st.berry === want(st)) { st.done = true; st.last = { result: 'ok', outcome: st.outcome }; return st.last; }
    st.misses++; st.help++; st.berry = null;
    st.last = { result: 'wrong', outcome: st.outcome };
    return st.last;
  }
  /* the right place glows from the second miss */
  function glow(st) { return !st.done && st.help >= 2 ? want(st) : null; }
  function hint(st) {
    var L = st.last;
    if (!L) return null;
    if (L.result === 'nobery') return { key: st.fit ? 'hintGuess' : st.polarity === 'less' ? 'hintPutLess' : 'hintPutMore' };
    if (L.result === 'wrong') return { key: st.help >= 2 ? 'hintHere' : ({ spill: 'hintSpill', gap: 'hintGap', brim: 'hintBrim' })[L.outcome], wrong: true };
    return null;
  }
  function success(st) {
    if (!st.done) return null;
    var o = st.outcome, w = want(st);
    if (st.fit) return { key: w === 'FITS' ? 'okFits' : 'okSpills' };
    if (w === 'SAME') return { key: 'okSame' };
    if (st.polarity === 'less') return { key: o === 'spill' ? 'okLessSpill' : 'okLessGap' };
    return { key: o === 'spill' ? 'okMoreSpill' : 'okMoreGap' };
  }
  function aria(st) { return st.outcome ? ({ spill: 'ariaSpill', gap: 'ariaGap', brim: 'ariaBrim' })[st.outcome] : null; }

  /* ---------------- the stage, in model units ---------------- */
  var LIFT = 6;                    /* the poured vessel's lip clears the other's rim by this much */
  /* where the pouring vessel's outer foot sits when docked over the other (centres in units) */
  function dockPose(from, to, fromX, toX) {
    var a = V[from], b = V[to], dir = toX > fromX ? 1 : -1;
    var ob = outer(b), oa = outer(a), lipR = b.cav[b.cav.length - 1][3];
    var lipX = toX - dir * (lipR - 3), lipY = Math.max(ob.h + LIFT, oa.h);
    var ax = lipX - dir * (a.cav[a.cav.length - 1][3] + WALL);
    return { x: ax, y: lipY - oa.h, pivot: [lipX, lipY], dir: dir };
  }
  /* how high (above the counter) any point of the poured vessel reaches over the whole tilt */
  function reach(from, to, fromX, toX) {
    var p = dockPose(from, to, fromX, toX), v = V[from], o = outer(v), top = 0, left = Infinity, right = -Infinity;
    var corners = [[-o.r - (hasHandle(v) ? HANDLE : 0), 0], [o.r, 0], [-o.r, o.h], [o.r, o.h]];
    for (var d = 0; d <= MAX_TILT; d += 5) {
      var a = d * PI / 180, c = Math.cos(a), s = Math.sin(a);
      corners.forEach(function (q) {
        var x = p.x + q[0] - p.pivot[0], y = p.y + q[1] - p.pivot[1];
        var X = p.pivot[0] + x * c + p.dir * y * s, Y = p.pivot[1] - p.dir * x * s + y * c;
        top = Math.max(top, Y); left = Math.min(left, X); right = Math.max(right, X);
      });
    }
    return { top: top, left: left, right: right };
  }
  var TAP_Y = 116;                 /* the tap pipe's height above the counter */
  /* the counter holds the two vessels and the coasters; under it, a strip for the berry's dish, the
     basket and Bramble (pictures at the LAW floor: 96 px wide, 64 px on a phone) */
  function layout(W) {
    var wide = W >= 560, SW = wide ? 280 : 240, u = W / SW, pic = wide ? 96 : 64;
    var X = wide ? { L: 60, mid: 140, R: 220, dish: 30, basket: 72, bramble: 116 } : { L: 58, mid: 125, R: 192, dish: 28, basket: 66, bramble: 104 };
    return { mode: wide ? 'wide' : 'narrow', SW: SW, u: u, X: X, SKY: SKY, PIC: pic, UNDER: Math.ceil((pic + 22) / u) };
  }
  /* the sky over THIS pair: the tap's room and the highest the pour reaches (both ways once the call is made) */
  function skyFor(a, b, lay, both) {
    var m = Math.max(TAP_Y + 14, reach(a, b, lay.X.L, lay.X.R).top);
    if (both) m = Math.max(m, reach(b, a, lay.X.R, lay.X.L).top);
    return Math.ceil(m + 4);
  }
  /* the most any pour can ever need (either way, any round, either layout) */
  var SKY = (function () {
    var m = 0;
    [layout0(true), layout0(false)].forEach(function (X) {
      EASY.concat(TRICKY).forEach(function (r) {
        m = Math.max(m, reach(r.A, r.B, X.L, X.R).top, reach(r.B, r.A, X.R, X.L).top, reach(r.B, r.A, X.L, X.R).top, reach(r.A, r.B, X.R, X.L).top);
      });
    });
    return Math.ceil(m + 4);
  })();
  function layout0(wide) { return wide ? { L: 60, R: 220 } : { L: 58, R: 192 }; }

  return {
    V: V, TAP_Y: TAP_Y, skyFor: skyFor, EASY: EASY, TRICKY: TRICKY, SAME_TOL: SAME_TOL, SPILL_SEEN: SPILL_SEEN, MAX_TILT: MAX_TILT, WALL: WALL, BASE: BASE, HANDLE: HANDLE, LIFT: LIFT, SKY: SKY,
    cups: cups, question: question, rounds: rounds, sides: sides, compare: compare, truth: truth, polarityAt: polarityAt, swapOf: swapOf, order: order,
    volumeAt: volumeAt, capacity: capacity, levelFor: levelFor, cavTop: cavTop, outer: outer, outerHalf: outerHalf, radiusAt: radiusAt, hasHandle: hasHandle, look: look,
    cavPoly: cavPoly, area: area, clip: clip, upIn: upIn, hold: hold, liquidPoly: liquidPoly, lipInner: lipInner,
    newState: newState, want: want, places: places, place: place, fill: fill, canPour: canPour, pourStep: pourStep, settle: settle, judge: judge,
    glow: glow, hint: hint, success: success, aria: aria, dockPose: dockPose, reach: reach, layout: layout
  };
});
