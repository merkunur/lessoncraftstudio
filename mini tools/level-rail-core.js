/* =====================================================================
   level-rail-core.js — the model of ACTIVITY #168 of the one-by-one
   rebuild: "Pip's Stacking Fence — Build & Read a Bar Graph"
   → THE LEVEL RAIL (2.MD.D.10). Pure, no DOM.
   Design: docs/activities-rebuild/designs/168-graph-it.md
   ---------------------------------------------------------------------
   A bar graph is Pip's fence: one picket per category, one plank per
   unit, a number post at the left. A spirit-level rail is hinged on a
   slider on the post; its free end rests on a picket's top. It lies
   level (bubble centred) only when the slider is at exactly that
   picket's height — then the post reads the picket's number and every
   plank of a taller picket above the rail is "how many more".
   Pickets can be stacked (put together) and planks dropped into Pip's
   basket (take apart). Values are in the round's own units: a scaled
   post counts by s (2, 5, 10), a picture fence by its key; a half step
   (half a plank / half a picture) exists only where s = 2.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['build', 'read', 'scaled'];
  var CATS = ['leaf', 'raspberry', 'acorn', 'pinecone', 'mushroom', 'flower'];
  /* the library picture of each category (theme, noun) */
  var PIC = { leaf: ['miscellaneous', 'leaf'], raspberry: ['fruits', 'raspberry'], acorn: ['miscellaneous', 'acorn'], pinecone: ['miscellaneous', 'pinecone'], mushroom: ['vegetables', 'mushroom'], flower: ['spring', 'flower'] };
  var L = 'leaf', R = 'raspberry', A = 'acorn', P = 'pinecone', M = 'mushroom', F = 'flower';
  /* d: [cat, value, cat, value, …] in the listed order */
  var data = function (d) { var o = { cats: [], data: {} }; for (var i = 0; i < d.length; i += 2) { o.cats.push(d[i]); o.data[d[i]] = d[i + 1]; } return o; };
  var B = function (source, d, extra) { var o = data(d); o.kind = 'build'; o.source = source; o.s = 1; o.pics = source === 'pics'; for (var p in extra || {}) o[p] = extra[p]; return o; };
  var Q = function (kind, d, extra) { var o = data(d); o.kind = kind; o.s = 1; o.pics = false; for (var p in extra || {}) o[p] = extra[p]; return o; };
  /* level "Build" (design §6; the old build data kept) */
  var BUILD = [
    B('tally', [L, 5, R, 3, A, 6]),
    B('tally', [L, 4, R, 7, A, 5, P, 3]),
    B('tally', [R, 8, L, 6]),
    B('pics', [M, 3, R, 5, L, 4]),
    B('pics', [F, 6, A, 2, P, 5]),
    B('tally', [L, 6, R, 4, A, 7], { kind: 'fix', shown: { leaf: 6, raspberry: 4, acorn: 6 } }),
    B('tally', [P, 5, M, 8, F, 3], { kind: 'fix', shown: { pinecone: 5, mushroom: 9, flower: 3 } }),
    B('table', [A, 9, F, 4, L, 7, R, 5])
  ];
  /* level "Read" (default; the old read data sets and questions kept) */
  var READ = [
    Q('more', [L, 6, R, 4, A, 9], { a: L, b: R }),
    Q('more', [R, 5, L, 8, A, 10], { a: L, b: R }),
    Q('more', [A, 8, R, 7, L, 10], { a: A, b: R }),
    Q('fewer', [R, 4, L, 7, M, 10], { a: R, b: L }),
    Q('total', [L, 6, R, 4, A, 7], { a: L, b: R }),
    Q('total', [P, 3, A, 8, M, 6], { a: P, b: A }),
    Q('most', [F, 5, L, 9, A, 7, R, 6]),
    Q('left', [A, 9, P, 5, L, 6], { a: A, eat: 4 }),
    Q('tf', [A, 8, P, 5, L, 6], { a: A, b: P, by: 2 }),
    Q('tf', [R, 9, F, 6, L, 4], { a: R, b: F, by: 3 })
  ];
  /* level "Scaled": a post counting by s, or a picture fence whose key is s */
  var S = function (kind, s, pics, d, extra) { var o = data(d); o.kind = kind; o.s = s; o.pics = pics; if (kind === 'build') o.source = 'table'; for (var p in extra || {}) o[p] = extra[p]; return o; };
  var SCALED = [
    S('value', 2, true, [L, 8, A, 6, P, 3], { a: P }),
    S('build', 2, true, [R, 10, F, 7, M, 4]),
    S('value', 5, false, [L, 35, A, 20, P, 15], { a: L }),
    S('build', 5, false, [A, 25, R, 40, F, 15]),
    S('value', 5, true, [P, 20, L, 15, A, 10], { a: L }),
    S('value', 2, false, [M, 7, F, 12, R, 9], { a: M }),
    S('more', 10, false, [L, 60, A, 40, R, 90], { a: R, b: A }),
    S('more', 2, true, [A, 12, L, 8], { a: A, b: L })
  ];
  var POOL = { build: BUILD, read: READ, scaled: SCALED };

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'read'; }
  function rounds(level) { level = levelOf(level); return POOL[level].map(function (r, i) { var o = { k: i, level: level }; for (var p in r) o[p] = r[p]; return o; }); }
  function passSize(level) { return rounds(level).length; }
  function isBuild(r) { return r.kind === 'build' || r.kind === 'fix'; }
  /* the snapping step of a picket top and of the slider: half a step only where the scale is 2 */
  function unitOf(r) { return r.s === 2 ? 1 : r.s; }
  function maxOf(r) { var m = 0; for (var c in r.data) m = Math.max(m, r.data[c]); return m; }
  /* the post: numbered every s, `steps` steps tall; a single-scale post is 10 */
  /* a single-scale post: 10 in build rounds (its top must not hint at the tallest card value); one step above the tallest picket in read rounds */
  function postOf(r) { if (r.s === 1 && !r.pics) return { s: 1, steps: isBuild(r) ? 10 : Math.min(10, Math.max(6, maxOf(r) + 1)) }; return { s: r.s, steps: Math.max(5, Math.ceil(maxOf(r) / r.s) + 1) }; }

  /* the right answer: a number (dial), a boolean (tags) or a category (a picket) */
  function answerOf(r) {
    var d = r.data;
    if (r.kind === 'more') return d[r.a] - d[r.b];
    if (r.kind === 'fewer') return d[r.b] - d[r.a];
    if (r.kind === 'total') return d[r.a] + d[r.b];
    if (r.kind === 'left') return d[r.a] - r.eat;
    if (r.kind === 'value') return d[r.a];
    if (r.kind === 'tf') return d[r.a] - d[r.b] === r.by;
    if (r.kind === 'most') { var best = null; r.cats.forEach(function (c) { if (best == null || d[c] > d[best]) best = c; }); return best; }
    return null;
  }
  function answerType(r) { return r.kind === 'tf' ? 'tf' : r.kind === 'most' ? 'picket' : isBuild(r) ? 'none' : 'dial'; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a fresh round; read rounds show their pickets in a new order every showing */
  function newState(level, k, rnd) {
    level = levelOf(level); var pool = rounds(level), r = pool[((k % pool.length) + pool.length) % pool.length];
    var order = isBuild(r) ? r.cats.slice() : shuffle(r.cats.slice(), rnd || Math.random);
    var fence = {}; r.cats.forEach(function (c) { fence[c] = r.kind === 'build' ? 0 : r.kind === 'fix' ? r.shown[c] : r.data[c]; });
    return { level: level, k: r.k, round: r, cats: order, post: postOf(r), fence: fence, rail: { y: 0, on: null }, railUsed: false, stack: null, basket: [],
      dial: { t: null, o: null }, answer: null, misses: 0, help: false, verdict: null, done: false, touched: false };
  }
  function changed(st) { st.verdict = null; st.touched = true; }
  /* the height a picket shows now: stacked pickets move, planks in the basket are gone */
  function topOf(st, c) {
    if (st.stack && st.stack.from === c) return 0;
    var v = st.fence[c];
    if (st.stack && st.stack.onto === c) v += st.fence[st.stack.from];
    return v;
  }
  /* the post grows to 20 when a stacked tower passes 10 */
  function postNow(st) {
    var p = st.post; if (p.s !== 1 || st.round.pics) return p;
    /* a stacked tower taller than the post makes it grow: to 10, or to 20 past 10 */
    var top = 0; for (var i = 0; i < st.cats.length; i++) top = Math.max(top, topOf(st, st.cats[i]));
    if (top > p.steps) return { s: 1, steps: top > 10 ? 20 : 10 };
    return p;
  }
  function postMax(st) { var p = postNow(st); return p.s * p.steps; }

  /* ---- the hand: build ---- */
  function setPicket(st, c, v) {
    var r = st.round; if (st.done || !isBuild(r) || st.cats.indexOf(c) < 0) return false;
    var u = unitOf(r); v = Math.max(0, Math.min(postMax(st), Math.round(v / u) * u));
    if (v === st.fence[c]) return false;
    st.fence[c] = v; changed(st); return true;
  }
  /* ---- the rail: the slider snaps to post ticks; the free end rests on a picket's top ---- */
  function setSlider(st, y) {
    if (st.done) return false; var u = unitOf(st.round);
    y = Math.max(0, Math.min(postMax(st), Math.round(y / u) * u));
    if (y === st.rail.y) return false;
    st.rail.y = y; st.railUsed = true; changed(st); return true;
  }
  function layRail(st, c) {
    if (st.done || st.cats.indexOf(c) < 0 || topOf(st, c) === 0 || st.rail.on === c) return false;
    st.rail.on = c; st.railUsed = true; changed(st); return true;
  }
  /* the rail is level only when the slider is at exactly the rested picket's top */
  function isLevel(st) { return st.rail.on != null && topOf(st, st.rail.on) > 0 && st.rail.y === topOf(st, st.rail.on); }
  /* the tilt as a fraction of the vial (−1…1): 0 only when level; the bubble rides to the high end */
  function tiltOf(st) {
    if (st.rail.on == null) return 0;
    var d = topOf(st, st.rail.on) - st.rail.y, u = st.round.s;
    if (d === 0) return 0;
    return Math.max(-1, Math.min(1, d / (3 * u)));
  }
  /* with the rail level: what sticks up above it, in steps of the scale, per picket */
  function overhang(st) {
    if (!isLevel(st)) return [];
    var y = st.rail.y, s = st.round.s, out = [];
    st.cats.forEach(function (c) { var t = topOf(st, c); if (t > y) out.push({ cat: c, from: y, to: t, steps: (t - y) / s }); });
    return out;
  }
  /* ---- stack (put together) and take apart ---- */
  function stack(st, from, onto) {
    if (st.done || from === onto || st.cats.indexOf(from) < 0 || st.cats.indexOf(onto) < 0 || st.stack || isBuild(st.round)) return false;
    if (topOf(st, from) === 0 || topOf(st, onto) === 0) return false;
    st.stack = { from: from, onto: onto };
    if (st.rail.on === from) st.rail.on = onto;
    changed(st); return true;
  }
  function unstack(st) { if (st.done || !st.stack) return false; if (st.rail.on === st.stack.onto || st.rail.on === st.stack.from) st.rail.on = null; st.stack = null; changed(st); return true; }
  function take(st, c) {
    if (st.done || isBuild(st.round) || st.stack || st.cats.indexOf(c) < 0 || st.fence[c] < st.round.s) return false;
    st.fence[c] -= st.round.s; st.basket.push(c);
    if (st.rail.on === c && st.fence[c] === 0) st.rail.on = null;
    changed(st); return true;
  }
  function putBack(st) { if (st.done || !st.basket.length) return false; var c = st.basket.pop(); st.fence[c] += st.round.s; changed(st); return true; }
  /* ---- the answer ---- */
  function setDial(st, t, o) {
    if (st.done || answerType(st.round) !== 'dial') return false;
    st.dial = { t: t, o: o };
    var v = (t || 0) * 10 + (o || 0);
    st.answer = (t == null && o == null) || v === 0 ? null : v;
    changed(st); return true;
  }
  function choose(st, v) {
    var ty = answerType(st.round); if (st.done) return false;
    if (ty === 'tf' && typeof v !== 'boolean') return false;
    if (ty === 'picket' && st.cats.indexOf(v) < 0) return false;
    if (ty !== 'tf' && ty !== 'picket') return false;
    if (st.answer === v) return false;
    st.answer = v; changed(st); return true;
  }
  /* the pickets still wrong in a build round, in display order */
  function wrongPickets(st) { var r = st.round; return st.cats.filter(function (c) { return st.fence[c] !== r.data[c]; }); }

  /* ---- Check ---- */
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (isBuild(r)) {
      if (!st.touched) return { result: 'note', key: 'hintBuildStart' };
      if (st.verdict) return { result: 'note', key: 'hintAgain' };
      var wrong = wrongPickets(st);
      if (!wrong.length) { st.done = true; return { result: 'ok' }; }
      st.misses++; st.help = st.misses >= 2;
      st.verdict = { why: 'build', cat: wrong[0], wrong: wrong };
      return { result: 'miss', why: 'build' };
    }
    if (st.answer == null) {
      if (!st.railUsed && r.kind !== 'total' && r.kind !== 'left') return { result: 'note', key: 'hintReadStart' };
      return { result: 'note', key: { dial: 'hintDial', tf: 'hintTF', picket: 'hintMost' }[answerType(r)] };
    }
    if (st.verdict) return { result: 'note', key: 'hintAgain' };
    if (st.answer === answerOf(r)) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { why: r.kind };
    return { result: 'miss', why: r.kind };
  }
  /* miss 1 shows the TOOL, miss 2 counts with it (design §7) */
  function hint(st) {
    var r = st.round, h = st.help;
    if (isBuild(r)) return !h ? (st.verdict && st.fence[st.verdict.cat] === 0 ? 'hintBuildEmpty' : 'hintBuildWrong') : r.pics ? (r.s > 1 ? 'helpBuildPicsBy' : 'helpBuildPics') : r.s > 1 ? 'helpBuildBy' : r.source === 'table' ? 'helpBuildTable' : 'helpBuild';
    if (h) return r.kind === 'most' ? 'helpMost' : r.s === 1 ? 'helpCount' : 'helpCountBy';
    if ((r.kind === 'more' || r.kind === 'fewer') && r.s > 1) return 'hintMoreBy';
    return { more: 'hintMore', fewer: 'hintMore', total: 'hintTotal', left: 'hintLeft', most: 'hintMost1', tf: 'hintTF1', value: 'hintValue' }[r.kind];
  }
  function okKey(st) {
    var r = st.round;
    if (isBuild(r)) return 'okBuild';
    if (r.kind === 'more') return answerOf(r) === 1 ? 'okMore1' : 'okMore';
    if (r.kind === 'tf') return answerOf(r) ? 'okTrue' : 'okFalse';
    if (r.kind === 'value') return r.pics && (r.data[r.a] / r.s) % 1 ? 'okValueHalf' : r.pics ? 'okValuePics' : 'okValue';
    return { fewer: 'okFewer', total: 'okTotal', left: 'okLeft', most: 'okMost' }[r.kind];
  }
  /* the tool laid by miss 1 / miss 2: which picket the rail rests on, and at what height */
  function toolRest(st) {
    var r = st.round, d = st.fence;
    if (r.kind === 'more' || r.kind === 'fewer' || r.kind === 'tf') { var lo = topOf(st, r.a) < topOf(st, r.b) ? r.a : r.b; return { on: lo, y: topOf(st, lo) }; }
    if (r.kind === 'value') return { on: r.a, y: st.help ? topOf(st, r.a) : st.rail.y };
    /* most: miss 1 rests on the second tallest (something still sticks up), miss 2 on the tallest (nothing does) */
    if (r.kind === 'most') { var byH = st.cats.slice().sort(function (x, y) { return topOf(st, y) - topOf(st, x); }), pick = st.help ? byH[0] : byH[1]; return { on: pick, y: topOf(st, pick) }; }
    if (r.kind === 'left') return { on: r.a, y: topOf(st, r.a) };
    if (r.kind === 'total' && st.stack) return { on: st.stack.onto, y: topOf(st, st.stack.onto) };
    if (isBuild(r) && st.verdict) return { on: st.verdict.cat, y: d[st.verdict.cat] };
    return null;
  }
  /* miss 2: the count tags, by the scale — the overhang, the tower or what is left (never the answer itself as one number) */
  function countList(st) {
    var r = st.round, s = r.s, out = [], from = 0, to = 0;
    if (r.kind === 'more' || r.kind === 'fewer' || r.kind === 'tf') { var lo = Math.min(r.data[r.a], r.data[r.b]), hi = Math.max(r.data[r.a], r.data[r.b]); from = lo; to = hi; out = []; for (var v = s; v <= to - from; v += s) out.push(v); return out; }
    if (r.kind === 'total') to = r.data[r.a] + r.data[r.b];
    else if (r.kind === 'left') to = r.data[r.a] - r.eat;
    else if (r.kind === 'value') to = r.data[r.a];
    for (var w = s; w <= to; w += s) out.push(w);
    if (to % s) out.push(to);
    return out;
  }
  function canonicalRail(st) { var t = toolRest(st); if (t) { st.rail.on = t.on; st.rail.y = t.y; } }
  /* an order-only reshuffle per pass, never the previous order; the two totals and the two true/false rounds never side by side */
  function plan(level, rnd, prev) {
    var pool = rounds(level), ks = pool.map(function (r) { return r.k; });
    var valid = function (c) { for (var i = 1; i < c.length; i++) { var a = pool[c[i]].kind, b = pool[c[i - 1]].kind; if (a === b && (a === 'total' || a === 'tf')) return false; } return !prev || prev.join() !== c.join(); };
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if (valid(c)) return c; }
    var base = prev || ks;
    for (var s = 1; s < base.length; s++) { var x = base.slice(s).concat(base.slice(0, s)); if (valid(x)) return x; }
    return base.slice().reverse();
  }
  var api = { LOCALES: LOCALES, LEVELS: LEVELS, CATS: CATS, PIC: PIC, locOf: locOf, levelOf: levelOf, rounds: rounds, passSize: passSize, isBuild: isBuild, unitOf: unitOf, postOf: postOf, answerOf: answerOf, answerType: answerType,
    newState: newState, topOf: topOf, postNow: postNow, postMax: postMax, setPicket: setPicket, setSlider: setSlider, layRail: layRail, isLevel: isLevel, tiltOf: tiltOf, overhang: overhang,
    stack: stack, unstack: unstack, take: take, putBack: putBack, setDial: setDial, choose: choose, wrongPickets: wrongPickets, check: check, hint: hint, okKey: okKey, toolRest: toolRest, countList: countList, canonicalRail: canonicalRail, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LevelRailCore = api;
})(typeof window !== 'undefined' ? window : this);
