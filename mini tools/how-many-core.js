/* =====================================================================
   how-many-core.js — the MODEL of "How many?" (K.CC.B.5), activity #1 of
   the one-by-one rebuild (docs/activities-rebuild/001-how-many.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-how-many-core.js
   drives it exhaustively; scripts/mutate-how-many.js proves the gate bites).

   THE SKILL. K.CC.B.5: count to answer "how many?" about things arranged
   in a LINE, a rectangular ARRAY, a CIRCLE (the standard runs to 20 there)
   or SCATTERED (up to 10). This instrument covers 0-10, the first half. Three
   counting principles are enacted, not told:
     one-to-one   — each thing is TAGGED once (tag() refuses a second tag);
     stable order — tags are numbered 1,2,3… in the order they were given;
     cardinality  — the LAST tag is the answer; the verdict distinguishes
                    "not all tagged" / "no answer yet" / "wrong" / "ok" so
                    the hint can name which principle slipped.
   Order-irrelevance and conservation are free moves on the same state:
   untagAll() (count again another way) and a new arrangement for the
   same n (mix them up).

   LAYOUT is part of the model so it can be gated without a browser: the
   four arrangements are produced here as integer boxes inside a mat W px
   wide, never overlapping, never smaller than the picture floor the
   activity law sets (≥ 96 px at the live width, ≥ 64 px on a phone). An
   arrangement that cannot meet the floor at this width is simply not
   offered (arrangementsFor), never squeezed: a circle of ten needs a mat
   wider than a phone, so a phone shows ten in rows or scattered instead.
   ===================================================================== */
(function (global) {
  'use strict';

  var ARRANGEMENTS = ['line', 'array', 'circle', 'scatter'];
  var GAP = 12, PAD = 14;   /* the wide-mat values; layout() narrows them under 400px */

  /* ---- deterministic randomness (mulberry32 over a string hash) ---- */
  function hash(str) {
    var h = 2166136261 >>> 0;
    str = String(str);
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function rng(seed) {
    var a = (typeof seed === 'number' ? seed : hash(seed)) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---- picture size policy (the activity law's floors) ---- */
  function sizeCaps(W) {
    if (W >= 600) return { max: 128, min: 96 };
    if (W >= 480) return { max: 120, min: 96 };
    return { max: 96, min: 64 };
  }

  /* how many columns of the floor size fit across the mat */
  function maxCols(W, caps) { var g = W < 400 ? 6 : 12, pd = W < 400 ? 6 : 14; return Math.max(1, Math.floor((W - 2 * pd + g) / (caps.min + g))); }

  /* a RECTANGULAR array, as the standard says: 4 = 2×2, 6 = 3×2, 8 = 4×2,
     9 = 3×3, 10 = 5×2; a prime count (5, 7) has no rectangle and is not
     offered rows. Where the rectangle's columns do not fit the mat (ten on a
     phone), the rows go ragged rather than the pictures under the floor —
     ragged:true says so, and arrangementsFor refuses it on a wide mat. */
  var RECT = { 4: [2], 6: [3, 2], 8: [4, 2], 9: [3], 10: [5, 2] };   // column choices, widest first (a tall rectangle is still a rectangle)
  function arrayDims(n, W) {
    var caps = sizeCaps(W), mc = maxCols(W, caps), opts = RECT[n] || [], i;
    for (i = 0; i < opts.length; i++) {
      if (opts[i] <= mc && !(W < 400 && Math.ceil(n / opts[i]) > 3)) return { cols: opts[i], rows: n / opts[i], ragged: false, rect: true };
    }
    /* no rectangle fits: a phone shows ragged rows (seven as 4+3) because
       neither a ring nor a scatter of seven clears its fold; a wide mat does not */
    if (W < 400 && n >= 4) { var c = Math.min(mc, 4); return { cols: c, rows: Math.ceil(n / c), ragged: true, rect: false }; }
    return { cols: n, rows: 1, ragged: false, rect: false };
  }

  /* the ring: smallest radius that keeps neighbours' BOXES apart (a chord
     of size·√2 + gap guarantees no axis-aligned overlap at any angle) */
  function ringFor(n, size, gap) { return Math.ceil((size * 1.42 + (gap || GAP)) / (2 * Math.sin(Math.PI / n))); }

  /* layout(n, arr, W, seed) → { size, h, points:[{x,y}], fits }  (x,y = top-left) */
  function layout(n, arr, W, seed) {
    var caps = sizeCaps(W);
    /* a narrow mat (a phone) spends less on its own padding and gaps so three
       rows of 64px pictures still clear the phone fold (visual-qa FITS) */
    var GAP = W < 400 ? 6 : 12, PAD = W < 400 ? 6 : 14;
    var i, size, pts = [], h, fits = true;
    if (n === 0) return { size: caps.min, h: Math.round(caps.min * 1.6), points: [], fits: true };
    if (arr === 'line') {
      if (n > 5) fits = false;
      size = Math.min(caps.max, Math.floor((W - 2 * PAD - (n - 1) * GAP) / n));
      if (size < caps.min) { size = caps.min; fits = false; }
      var totalW = n * size + (n - 1) * GAP;
      var x0 = Math.round((W - totalW) / 2);
      h = size + 2 * PAD;
      for (i = 0; i < n; i++) pts.push({ x: x0 + i * (size + GAP), y: PAD });
      return { size: size, h: h, points: pts, fits: fits };
    }
    if (arr === 'array') {
      var d = arrayDims(n, W);
      if (d.rows < 2) fits = false;                     // a one-row "array" is a line
      if (!d.rect && !d.ragged) fits = false;           // no rectangle and no phone fallback → not rows
      size = Math.min(caps.max, Math.floor((W - 2 * PAD - (d.cols - 1) * GAP) / d.cols));
      /* a narrow mat with three or more rows keeps the pictures at the floor
         so the Check stays above a 640px phone fold */
      if (W < 400 && d.rows >= 3) size = Math.min(size, caps.min);
      if (size < caps.min) { size = caps.min; fits = false; }
      h = d.rows * size + (d.rows - 1) * GAP + 2 * PAD;
      for (i = 0; i < n; i++) {
        var r = Math.floor(i / d.cols), c = i % d.cols;
        var inRow = Math.min(d.cols, n - r * d.cols);
        var rowW = inRow * size + (inRow - 1) * GAP;
        var rx0 = Math.round((W - rowW) / 2);
        pts.push({ x: rx0 + c * (size + GAP), y: PAD + r * (size + GAP) });
      }
      return { size: size, h: h, points: pts, fits: fits };
    }
    if (arr === 'circle') {
      if (n < 3 || n > 6) fits = false;              // a ring of seven+ at the picture floor is taller than a 900px desktop card allows (visual-qa FITS @1366×900)
      size = caps.min;                               // a ring is airy by nature: floor-size pictures keep a ring of six inside a 900px desktop card
      var R = ringFor(n, size, GAP);
      while (2 * R + size + 2 * PAD > W && size - 4 >= caps.min) { size -= 4; R = ringFor(n, size, GAP); }
      if (2 * R + size + 2 * PAD > W) fits = false;
      h = 2 * R + size + 2 * PAD;
      var cx = W / 2, cy = h / 2;
      for (i = 0; i < n; i++) {
        var ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
        pts.push({ x: Math.round(cx + R * Math.cos(ang) - size / 2), y: Math.round(cy + R * Math.sin(ang) - size / 2) });
      }
      return { size: size, h: h, points: pts, fits: fits };
    }
    /* scatter: seeded rejection sampling; never overlapping; shrinks the
       picture (never below the floor) and then grows the mat if n will
       not fit. Always offered — the mat can always grow. */
    var rand = rng(seed || 1);
    size = Math.min(caps.max, Math.round(Math.min(W, 560) * 0.22));
    size = Math.max(size, caps.min);
    /* the table is as tall as the group needs: one animal does not get a
       ten-animal mat (a mostly-empty table is the 'small content in a big
       card' the law forbids); ten get room to scatter */
    h = Math.max(220, Math.min(n >= 8 ? 440 : 380, Math.round(Math.min(W, 560) * (n >= 8 ? 0.72 : 0.62) * Math.sqrt(Math.max(n, 3) / 10))));
    for (var attempt = 0; attempt < 60; attempt++) {
      pts = [];
      var tries = 0, minD = size + GAP;
      while (pts.length < n && tries < 600) {
        tries++;
        var p = { x: Math.round(PAD + rand() * (W - 2 * PAD - size)), y: Math.round(PAD + rand() * (h - 2 * PAD - size)) };
        var ok = true;
        for (i = 0; i < pts.length; i++) {
          if (Math.abs(pts[i].x - p.x) < minD && Math.abs(pts[i].y - p.y) < minD) { ok = false; break; }
        }
        if (ok) pts.push(p);
      }
      if (pts.length === n) break;
      if (size - 6 >= caps.min) size -= 6; else h += 24;
    }
    if (pts.length !== n) fits = false;
    /* a narrow mat has a fold budget (320×640 phone: the Check must stay on
       screen, visual-qa FITS): a scatter that had to grow past 250px is not
       offered there — rows show the same count */
    if (W < 400 && (n > 5 || h > 250)) fits = false;
    return { size: size, h: h, points: pts, fits: fits };
  }

  /* which arrangements may show n things on a mat W px wide: exactly the
     ones whose layout meets the picture floor without overflowing. */
  function arrangementsFor(n, W) {
    if (n <= 0) return ['line'];
    var out = [];
    for (var i = 0; i < ARRANGEMENTS.length; i++) {
      if (layout(n, ARRANGEMENTS[i], W, 'probe').fits) out.push(ARRANGEMENTS[i]);
    }
    return out;
  }

  /* ---- the round pool: every n in [min..max] once, arrangement round-
     robin over what the width allows (order is the activity's business) */
  /* want = null (varied: round-robin over what fits) or one arrangement — then
     only the counts that arrangement can show are served (a setting is never
     a silent no-op) */
  function rounds(min, max, W, seed, want) {
    var out = [], k = 0;
    for (var n = min; n <= max; n++) {
      var allowed = arrangementsFor(n, W);
      if (want) { if (allowed.indexOf(want) < 0 && n !== 0) continue; out.push({ n: n, arr: n === 0 ? 'line' : want, seed: (seed || 'hm') + ':' + n }); continue; }
      /* the least-used offered arrangement so far → every shape the width
         allows appears across the pool, not just the first two */
      var pick = allowed[0], best = Infinity;
      for (var a = 0; a < allowed.length; a++) { var used = out.filter(function (r) { return r.arr === allowed[a]; }).length; if (used < best) { best = used; pick = allowed[a]; } }
      out.push({ n: n, arr: pick, seed: (seed || 'hm') + ':' + n });
      k++;
    }
    return out;
  }

  /* ---- state ---- */
  function newState(round) {
    return { n: round.n, arr: round.arr, seed: round.seed, tags: [], answer: null };
  }
  function tag(st, i) {
    if (!st || i < 0 || i >= st.n) return { ok: false, k: st ? st.tags.length : 0, reason: 'range' };
    if (st.tags.indexOf(i) >= 0) return { ok: false, k: st.tags.length, reason: 'again' };
    st.tags.push(i);
    return { ok: true, k: st.tags.length };
  }
  function untagAll(st) { st.tags = []; st.answer = null; }
  function allTagged(st) { return st.tags.length === st.n; }
  function lastTagged(st) { return st.tags.length ? st.tags[st.tags.length - 1] : -1; }
  function setAnswer(st, v) { st.answer = (v === null || v === undefined) ? null : Number(v); }
  function untagged(st) {
    var out = [];
    for (var i = 0; i < st.n; i++) if (st.tags.indexOf(i) < 0) out.push(i);
    return out;
  }
  /* verdict: 'untagged' | 'noAnswer' | 'wrong' | 'ok' */
  function verdict(st) {
    if (!allTagged(st)) return 'untagged';
    if (st.answer === null || !isFinite(st.answer)) return 'noAnswer';
    return st.answer === st.n ? 'ok' : 'wrong';
  }
  function nextArrangement(st, W) {
    var allowed = arrangementsFor(st.n, W);
    var i = allowed.indexOf(st.arr);
    return allowed[(i + 1) % allowed.length];
  }

  var api = {
    ARRANGEMENTS: ARRANGEMENTS, GAP: GAP, PAD: PAD,
    hash: hash, rng: rng,
    arrangementsFor: arrangementsFor, sizeCaps: sizeCaps, arrayDims: arrayDims, ringFor: ringFor, layout: layout,
    rounds: rounds, newState: newState, tag: tag, untagAll: untagAll, allTagged: allTagged,
    lastTagged: lastTagged, setAnswer: setAnswer, untagged: untagged, verdict: verdict,
    nextArrangement: nextArrangement
  };
  global.HowManyCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
