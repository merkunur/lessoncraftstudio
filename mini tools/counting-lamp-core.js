/* =====================================================================
   counting-lamp-core.js — the model of ACTIVITY #92, THE COUNTING LAMP
   ("Whistle Valley — Number-Line Track Repair", 1.NBT.A.1). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/092-track-repair.md
   ---------------------------------------------------------------------
   A storm-torn railway that IS a number line. The child bolts number
   plates onto the ties (or plants the STOP flag, or types the number for
   an arrowed tie, or fills blank mileposts) — and on Check the engine
   checks the track by COUNTING ON FROM THE STATION with its headlamp: it
   rolls tie by tie, the lamp names each tie's number, and it stops at the
   first plate the lamp disagrees with. Three tracks: hops (count on/back
   by k), find the spot (ties, an arrowed tie to name, an open rail graded
   by ε), mileposts (a constant step). Numbers to 50 or to 120 (and the
   big steps to 800 on the mileposts).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CountingLampCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var TRACKS = ['hops', 'spots', 'posts'], LEVELS = ['50', '120'], TIES = 11;
  /* HOPS: [stretch from, start number, k, dir] — the stretch is from..from+10, printed at both ends and at the start */
  var HOPS = {
    '120': [[46, 47, 3, 1], [20, 25, 3, -1], [35, 38, 4, 1], [10, 16, 5, -1], [95, 98, 4, 1], [60, 63, 5, 1], [35, 41, 4, -1], [110, 112, 6, 1]],
    '50': [[16, 17, 3, 1], [20, 25, 3, -1], [35, 38, 4, 1], [10, 16, 5, -1], [25, 28, 3, 1], [30, 33, 5, 1], [35, 41, 4, -1], [34, 36, 6, 1]]
  };
  /* SPOTS: ties {from, plates, name, dist} — or an open rail {open:[a,b], eps, plates, dist} */
  var SPOTS = {
    '120': [
      { from: 1, plates: [8, 4], dist: 13 }, { from: 10, plates: [13, 18], dist: 21 }, { from: 20, plates: [26], name: 22, dist: 32 },
      { from: 40, plates: [47, 43], dist: 54 }, { from: 30, plates: [38], name: 34, dist: 48 }, { from: 50, plates: [51, 59], dist: 61 },
      { from: 90, plates: [99, 95], dist: 109 }, { from: 100, plates: [103], name: 107, dist: 113 },
      { open: [10, 30], eps: 1.4, plates: [20, 15], dist: 35 }, { open: [40, 80], eps: 2.6, plates: [60, 50], dist: 90 }],
    '50': [
      { from: 1, plates: [8, 4], dist: 13 }, { from: 10, plates: [13, 18], dist: 21 }, { from: 20, plates: [26], name: 22, dist: 32 },
      { from: 40, plates: [47, 43], dist: 36 }, { from: 30, plates: [38], name: 34, dist: 48 }, { from: 5, plates: [6, 14], dist: 17 },
      { from: 25, plates: [30, 28], dist: 37 }, { from: 35, plates: [42], name: 39, dist: 47 },
      { open: [10, 30], eps: 1.4, plates: [20, 15], dist: 35 }, { open: [20, 40], eps: 1.4, plates: [30, 25], dist: 45 }]
  };
  /* POSTS: six mileposts (null = blank), the step, the distractors */
  var POSTS = {
    '120': [[[5, null, null, null, 25, 30], 5, [13, 18]], [[40, null, null, 70, 80, 90], 10, [45, 55]], [[12, 14, null, 18, null, 22], 2, [15, 19]],
      [[90, 80, null, 60, null, 40], -10, [75, 65]], [[60, 70, null, 90, null, 110], 10, [85, 95]], [[70, 75, null, 85, null, 95], 5, [82, 88]],
      [[118, 116, null, 112, null, 108], -2, [113, 111]], [[45, 40, null, 30, null, 20], -5, [36, 24]]],
    '50': [[[5, null, null, null, 25, 30], 5, [13, 18]], [[20, null, null, 35, 40, 45], 5, [28, 33]], [[12, 14, null, 18, null, 22], 2, [15, 19]],
      [[30, 28, null, 24, null, 20], -2, [25, 21]], [[10, 15, null, 25, null, 35], 5, [22, 28]], [[2, 4, null, 8, null, 12], 2, [7, 11]],
      [[48, 46, null, 42, null, 38], -2, [43, 41]], [[45, 40, null, 30, null, 20], -5, [36, 24]]]
  };

  function levelOf(l) { l = String(l); return LEVELS.indexOf(l) >= 0 ? l : '120'; }
  function trackOf(t) { return TRACKS.indexOf(t) >= 0 ? t : 'spots'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function table(level, track) { level = levelOf(level); track = trackOf(track); return track === 'hops' ? HOPS[level] : track === 'posts' ? POSTS[level] : SPOTS[level]; }
  function ids(level, track) { var n = table(level, track).length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a round: everything the board shows and the answers */
  function round(level, track, idx) {
    level = levelOf(level); track = trackOf(track);
    var row = table(level, track)[idx], r = { level: level, track: track, idx: idx, kind: track, printed: [], plates: [], dist: [], name: null, open: null, hop: null, posts: null, from: 0 };
    if (track === 'hops') {
      var from = row[0], start = row[1], k = row[2], dir = row[3];
      r.from = from; r.hop = { start: start - from, k: k, dir: dir, land: start - from + dir * k, startValue: start, landValue: start + dir * k };
      r.printed = [0, TIES - 1, start - from];
    } else if (track === 'posts') {
      r.kind = 'posts'; r.posts = { values: [], blanks: [], step: row[1] };
      for (var p = 0; p < 6; p++) { var v = row[0][p] != null ? row[0][p] : row[0][0] + p * row[1]; r.posts.values.push(v); if (row[0][p] == null) { r.posts.blanks.push(p); r.plates.push(v); } else r.printed.push(p); }
      r.dist = row[2].slice();
    } else if (row.open) {
      r.kind = 'open'; r.open = { a: row.open[0], b: row.open[1], eps: row.eps };
      r.plates = row.plates.slice(); r.dist = [row.dist];
    } else {
      r.kind = row.name != null ? 'name' : 'ties'; r.from = row.from; r.printed = [0, TIES - 1];
      r.plates = row.plates.slice(); r.dist = [row.dist];
      if (row.name != null) r.name = { v: row.name, tie: row.name - row.from };
    }
    return r;
  }
  /* the number a tie (or post) stands for */
  function tieValue(r, i) { return r.posts ? r.posts.values[i] : r.from + i; }
  /* where each target plate belongs: the tie index (ties), the post index (posts), the rail fraction (open) */
  function home(r, v) {
    if (r.posts) { var i = r.posts.values.indexOf(v); return r.posts.blanks.indexOf(i) >= 0 ? i : null; }
    if (r.open) return v >= r.open.a && v <= r.open.b ? (v - r.open.a) / (r.open.b - r.open.a) : null;
    var t = v - r.from; return t > 0 && t < TIES - 1 && (!r.name || t !== r.name.tie) && r.plates.indexOf(v) >= 0 ? t : null;
  }
  /* the plates on the trolley: targets + distractors, shuffled; three or more never in numeric order (two can only be up or down — either order is fine) */
  function tray(r, rnd) {
    var all = r.plates.concat(r.dist), o = shuffle(all, rnd);
    if (all.length < 3) return o;
    for (var k = 0; k < 50; k++) { o = shuffle(all, rnd); var up = true, dn = true; for (var i = 1; i < o.length; i++) { if (o[i] < o[i - 1]) up = false; if (o[i] > o[i - 1]) dn = false; } if (!up && !dn) break; }
    return o;
  }
  /* the open rail's ghost step and the number at a rail fraction */
  function ghostStep(r) { var span = r.open.b - r.open.a; return span <= 20 ? 1 : span / 20; }
  function railValue(r, x) { return r.open.a + (r.open.b - r.open.a) * x; }

  /* ---- state ---- */
  function newState(r) { return { r: r, seats: {}, clamps: {}, flag: null, typed: '', misses: 0, show: 0, last: null, run: null, done: false }; }
  function clear(st) { st.show = 0; st.last = null; st.run = null; }
  function where(st, v) { for (var k in st.seats) if (st.seats[k] === v) return +k; return null; }
  /* bolt plate v onto seat i (a tie or a blank post); an occupant goes back to the trolley */
  function place(st, v, i) {
    var r = st.r; if (st.done || r.open || r.track === 'hops') return false;
    if (r.plates.indexOf(v) < 0 && r.dist.indexOf(v) < 0) return false;
    if (r.posts) { if (r.posts.blanks.indexOf(i) < 0) return false; }
    else if (!(i > 0 && i < TIES - 1) || (r.name && i === r.name.tie)) return false;
    var was = where(st, v); if (was === i) return false;
    if (was != null) delete st.seats[was];
    st.seats[i] = v; clear(st); return true;
  }
  function placeOpen(st, v, x) {
    var r = st.r; if (st.done || !r.open) return false;
    if (r.plates.indexOf(v) < 0 && r.dist.indexOf(v) < 0) return false;
    x = Math.max(0, Math.min(1, +x)); if (!(x > 0 && x < 1)) return false;
    st.clamps[v] = x; clear(st); return true;
  }
  function unplace(st, v) {
    if (st.done) return false;
    var w = where(st, v); if (w != null) { delete st.seats[w]; clear(st); return true; }
    if (st.clamps[v] != null) { delete st.clamps[v]; clear(st); return true; }
    return false;
  }
  function plant(st, i) {
    var r = st.r; if (st.done || r.track !== 'hops') return false;
    if (!(i >= 0 && i < TIES) || i === r.hop.start || i === st.flag) return false;
    st.flag = i; clear(st); return true;
  }
  function type(st, d) {
    if (st.done || !st.r.name) return false;
    d = String(d); if (!/^[0-9]$/.test(d) || st.typed.length >= 3 || (st.typed === '' && d === '0')) return false;
    st.typed += d; clear(st); return true;
  }
  function del(st) { if (st.done || !st.r.name || !st.typed) return false; st.typed = st.typed.slice(0, -1); clear(st); return true; }

  /* ---- the lamp: count on from the station, stop at the first plate it disagrees with ---- */
  function lamp(st) {
    var r = st.r, i, run = { counted: [], stop: null, right: [] };
    if (r.track === 'hops') {
      var h = r.hop; for (i = 1; i <= h.k; i++) run.counted.push(h.start + h.dir * i);
      run.stop = h.land; run.ok = st.flag === h.land; return run;
    }
    if (r.posts) {
      var vals = r.posts.values.map(function (v, p) { return r.posts.blanks.indexOf(p) >= 0 ? (st.seats[p] != null ? st.seats[p] : null) : v; });
      run.jumps = [];
      for (i = 1; i < 6; i++) {
        run.counted.push(i);
        run.jumps.push(vals[i] != null && vals[i - 1] != null ? vals[i] - vals[i - 1] : null);
        if (r.posts.blanks.indexOf(i) >= 0 && vals[i] !== r.posts.values[i]) { run.stop = i; break; }
        if (r.posts.blanks.indexOf(i) >= 0) run.right.push(i);
      }
      run.ok = run.stop == null; return run;
    }
    if (r.open) {
      var vs = Object.keys(st.clamps).map(Number).sort(function (a, b) { return st.clamps[a] - st.clamps[b]; });
      for (i = 0; i < vs.length; i++) {
        var tv = railValue(r, st.clamps[vs[i]]);
        if (Math.abs(tv - vs[i]) > r.open.eps) { run.stop = vs[i]; run.stopValue = Math.round(tv / ghostStep(r)) * ghostStep(r); break; }
        run.right.push(vs[i]);
      }
      run.ok = run.stop == null; return run;
    }
    for (i = 1; i < TIES - 1; i++) {
      run.counted.push(i);
      var p = r.name && i === r.name.tie ? (st.typed ? +st.typed : null) : st.seats[i];
      if (p != null && p !== tieValue(r, i)) { run.stop = i; break; }
      if (p != null) run.right.push(i);
    }
    run.ok = run.stop == null; return run;
  }
  function placedCount(st) { return st.r.open ? Object.keys(st.clamps).length : Object.keys(st.seats).length; }
  function check(st) {
    var r = st.r; if (st.done) return null;
    var none = null;
    if (r.track === 'hops') { if (st.flag == null) none = 'hintFlag'; }
    else if (r.posts) { if (placedCount(st) < r.posts.blanks.length) none = 'hintEmptyPosts'; }
    else if (r.open) { if (placedCount(st) < r.plates.length) none = 'hintEmptyRail'; }
    else { if (r.name && !st.typed) none = 'hintType'; else if (placedCount(st) < r.plates.length) none = 'hintEmpty'; }
    if (none) { st.last = { reason: 'none', hint: none }; st.run = null; return { result: 'none', hint: none }; }
    var run = lamp(st); st.run = run;
    if (run.ok) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok', run: run }; }
    st.misses++; st.show = Math.min(2, st.misses);
    var why = r.track === 'hops' ? 'hop' : r.posts ? 'step' : r.open ? 'rail' : (r.name && run.stop === r.name.tie ? 'typed' : 'tie');
    st.last = { reason: why, stop: run.stop };
    return { result: 'miss', why: why, run: run };
  }
  function hint(st) {
    var L = st.last, r = st.r; if (!L || L.reason === 'fair') return null;
    if (L.reason === 'none') return { key: L.hint };
    if (L.reason === 'hop') return { key: 'hintHop' };
    if (L.reason === 'step') return { key: st.show >= 2 ? 'hintStepShow' : 'hintStep', args: { s: Math.abs(r.posts.step) } };
    if (L.reason === 'typed') return { key: 'hintFromNearest', args: { m: r.from } };
    /* miss 2 names the wrong plate's own number — unless that plate belongs nowhere here (a distractor): then say so */
    var wv = L.reason === 'rail' ? L.stop : st.seats[L.stop];
    if (st.show >= 2 && r.dist.indexOf(wv) >= 0) return { key: 'hintNowhere', args: { n: wv } };
    return st.show >= 2 ? { key: 'hintFind', args: { n: wv } } : { key: 'hintCountOn' };
  }
  /* the ties the lamp leaves a number on: miss 1 = the ties it counted; miss 2 = every blank tie (the arrowed tie excepted — it is the question) */
  function lampTies(st) {
    var r = st.r, out = [], i; if (!st.run || st.done || r.posts || r.open) return out;
    if (r.track === 'hops') { if (st.show >= 2) for (i = 0; i < TIES; i++) { if (r.printed.indexOf(i) < 0) out.push(i); } else out = st.run.counted.slice(); return out; }
    if (st.show >= 2) { for (i = 1; i < TIES - 1; i++) if (!(r.name && i === r.name.tie)) out.push(i); return out; }
    return st.run.counted.filter(function (t) { return !(r.name && t === r.name.tie && t !== st.run.stop); });
  }

  /* ---- order: never the previous pass; neighbours never share a right tie / STOP tie ---- */
  function targetsOf(level, track, i) { var r = round(level, track, i); if (r.hop) return [r.hop.land]; if (r.posts || r.open) return [];   /* posts: the design rows mostly blank posts 2 and 4 — a no-shared-blank rule is unsatisfiable there */ return r.plates.map(function (v) { return home(r, v); }).concat(r.name ? [r.name.tie] : []); }
  function orderOk(level, track, order) {
    for (var i = 1; i < order.length; i++) { var a = targetsOf(level, track, order[i - 1]), b = targetsOf(level, track, order[i]); for (var k = 0; k < a.length; k++) if (b.indexOf(a[k]) >= 0) return false; }
    return true;
  }
  function plan(level, track, rnd, prev) {
    var all = ids(level, track), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(level, track, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }
  return {
    DATA: { HOPS: HOPS, SPOTS: SPOTS, POSTS: POSTS, ENGINE: ['vehicles', 'train'] }, LOCALES: LOCALES, TRACKS: TRACKS, LEVELS: LEVELS, TIES: TIES,
    levelOf: levelOf, trackOf: trackOf, locale: locale, ids: ids, shuffle: shuffle, round: round, tieValue: tieValue, home: home, tray: tray,
    ghostStep: ghostStep, railValue: railValue, newState: newState, place: place, placeOpen: placeOpen, unplace: unplace, plant: plant, type: type, del: del,
    where: where, lamp: lamp, check: check, hint: hint, lampTies: lampTies, orderOk: orderOk, plan: plan, layout: layout
  };
});
