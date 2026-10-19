/* =====================================================================
   music-box-core.js — the model of THE MUSIC-BOX STRIP
   (activity #29 of the one-by-one rebuild, "Quick Facts to 5", K.OA.A.5).
   Design sheet: docs/activities-rebuild/designs/029-ten-frame.md
   ---------------------------------------------------------------------
   A row of number bars, each exactly as long as its number (the longer, the
   lower the note). A round is one phrase of a real song: the facts are drawn
   so that their answers, in order, are the phrase's notes. A right bar
   punches a hole in that bar's row of a music-box strip; a wrong bar punches
   nothing and the fact's rods lie beside it (the difference is the error).
   When every note is punched the crank plays the song at its own stored
   tempo — never faster for a faster child. Pure model, no DOM.
   Node-loadable (verify-music-box-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* pitch: the longer the bar, the lower the note (Hz) */
  var NOTE = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.26, F5: 698.46, G5: 783.99 };
  var PITCH = {
    to5: { 5: NOTE.C5, 4: NOTE.D5, 3: NOTE.E5, 2: NOTE.F5, 1: NOTE.G5 },
    to10: { 10: NOTE.C4, 9: NOTE.D4, 8: NOTE.E4, 7: NOTE.F4, 6: NOTE.G4, 5: NOTE.A4, 4: NOTE.B4, 3: NOTE.C5, 2: NOTE.D5, 1: NOTE.E5 }
  };
  var TOK = 196; /* the in-round knock: one sound for every bar, so the tune cannot leak */
  /* the songs: notes (= answers) in order, beats per note, the tempo (ms per beat) and the lid picture */
  var SONGS = {
    to5: [
      { id: 'frere1', song: 'frere', pic: ['christmas', 'bell'], notes: [5, 4, 3, 5, 5, 4, 3, 5], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 420 },
      { id: 'ode1', song: 'ode', pic: ['music', 'trumpet'], notes: [3, 3, 2, 1, 1, 2, 3, 4], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 400 },
      { id: 'row1', song: 'row', pic: ['vehicles', 'boat'], notes: [1, 3, 3, 2, 4, 4], beats: [1, 1, 2, 1, 1, 2], tempo: 380 },
      { id: 'row2', song: 'row', pic: ['vehicles', 'boat'], notes: [5, 4, 3, 2, 1, 1, 1], beats: [1, 1, 1, 1, 1, 1, 2], tempo: 380 },
      { id: 'frere2', song: 'frere', pic: ['christmas', 'bell'], notes: [3, 2, 1, 3, 2, 1], beats: [1, 1, 2, 1, 1, 2], tempo: 420 },
      { id: 'ode2', song: 'ode', pic: ['music', 'trumpet'], notes: [5, 5, 4, 3, 3, 4, 4], beats: [1, 1, 1, 1, 1.5, 0.5, 2], tempo: 400 },
      { id: 'duck', song: 'duck', pic: ['farm animals', 'duck'], notes: [5, 4, 3, 2, 1, 1], beats: [1, 1, 1, 1, 2, 2], tempo: 360 },
      { id: 'buns', song: 'buns', pic: ['bakery', 'bun'], notes: [3, 4, 5, 3, 4, 5], beats: [1, 1, 2, 1, 1, 2], tempo: 400 }
    ],
    /* "add only": no fact makes 1 without a 0, so these tunes use the notes 2–5 only */
    to5add: [
      { id: 'buns', song: 'buns', pic: ['bakery', 'bun'], notes: [3, 4, 5, 3, 4, 5], beats: [1, 1, 2, 1, 1, 2], tempo: 400 },
      { id: 'odelow', song: 'ode', pic: ['music', 'trumpet'], notes: [4, 4, 3, 2, 2, 3, 4, 5], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 400 },
      { id: 'moon1', song: 'moon', pic: ['space', 'moon'], notes: [5, 5, 5, 4, 3, 4], beats: [1, 1, 1, 1, 2, 2], tempo: 420 },
      { id: 'lamb', song: 'lamb', pic: ['farm animals', 'lamb'], notes: [3, 4, 5, 4, 3, 3], beats: [1.5, 0.5, 1, 1, 1, 1], tempo: 400 },
      { id: 'ode2', song: 'ode', pic: ['music', 'trumpet'], notes: [5, 5, 4, 3, 3, 4, 4], beats: [1, 1, 1, 1, 1.5, 0.5, 2], tempo: 400 },
      { id: 'frere1', song: 'frere', pic: ['christmas', 'bell'], notes: [5, 4, 3, 5, 5, 4, 3, 5], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 420 },
      { id: 'moon2', song: 'moon', pic: ['space', 'moon'], notes: [5, 5, 5, 4, 3, 4, 5, 3, 4, 4, 5], beats: [1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2], tempo: 420 }
    ],
    to10: [
      { id: 'star1', song: 'star', pic: ['christmas', 'star'], notes: [10, 10, 6, 6, 5, 5, 6], beats: [1, 1, 1, 1, 1, 1, 2], tempo: 420 },
      { id: 'star2', song: 'star', pic: ['christmas', 'star'], notes: [7, 7, 8, 8, 9, 9, 10], beats: [1, 1, 1, 1, 1, 1, 2], tempo: 420 },
      { id: 'duck', song: 'duck', pic: ['farm animals', 'duck'], notes: [10, 9, 8, 7, 6, 6], beats: [1, 1, 1, 1, 2, 2], tempo: 360 },
      { id: 'frere1', song: 'frere', pic: ['christmas', 'bell'], notes: [10, 9, 8, 10, 10, 9, 8, 10], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 420 },
      { id: 'ode1', song: 'ode', pic: ['music', 'trumpet'], notes: [8, 8, 7, 6, 6, 7, 8, 9], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 400 },
      { id: 'ode2', song: 'ode', pic: ['music', 'trumpet'], notes: [10, 10, 9, 8, 8, 9, 9], beats: [1, 1, 1, 1, 1.5, 0.5, 2], tempo: 400 },
      { id: 'row', song: 'row', pic: ['vehicles', 'boat'], notes: [6, 8, 8, 7, 9, 9, 10], beats: [1, 1, 2, 1, 1, 2, 2], tempo: 380 }
    ]
  };
  var FRUITS = ['strawberry', 'apple', 'lemon', 'pear', 'orange'];

  function level(name) { return name === 'to10' ? 'to10' : 'to5'; }
  function factsMode(name) { return name === 'add' ? 'add' : 'both'; }
  function maxBar(lv) { return lv === 'to10' ? 10 : 5; }
  /* the fact pool: every a + b and a − b with a result in the level's answer range, no 0 operand or result */
  function pool(lv, mode) {
    var top = maxBar(lv), lo = lv === 'to10' ? 5 : 1, out = {};
    for (var c = lo; c <= top; c++) out[c] = [];
    for (var a = 1; a <= top; a++) for (var b = 1; b <= top; b++) {
      if (a + b >= lo && a + b <= top) out[a + b].push({ a: a, b: b, op: '+' });
      if (mode !== 'add' && a - b >= lo && a - b >= 1) out[a - b].push({ a: a, b: b, op: '-' });
    }
    return out;
  }
  function answerOf(f) { return f.op === '+' ? f.a + f.b : f.a - f.b; }
  function songsFor(lv, mode) { return lv === 'to10' ? SONGS.to10 : mode === 'add' ? SONGS.to5add : SONGS.to5; }
  function rounds(lv, mode) {
    lv = level(lv); mode = factsMode(mode);
    return songsFor(lv, mode).map(function (s, i) {
      return { level: lv, mode: mode, index: i, id: lv + '.' + mode + '.' + s.id, song: s.song, songId: s.id, pic: s.pic.slice(), notes: s.notes.slice(), beats: s.beats.slice(), tempo: s.tempo, fruit: FRUITS[i % FRUITS.length] };
    });
  }

  /* one fact per note, its answer = the note; no fact twice in a round while an unused one remains */
  function drawFacts(r, rand) {
    rand = rand || Math.random;
    var P = pool(r.level, r.mode), used = {}, out = [];
    r.notes.forEach(function (n) {
      var cands = P[n].filter(function (f) { return !used[key(f)]; });
      if (!cands.length) cands = P[n];
      var f = cands[Math.floor(rand() * cands.length)];
      used[key(f)] = true;
      out.push({ a: f.a, b: f.b, op: f.op });
    });
    return out;
  }
  function key(f) { return f.a + f.op + f.b; }

  /* ---------------- the order ----------------
     never the same order twice · a pass never opens where the last one closed */
  function order(poolR, rand, prev) {
    rand = rand || Math.random;
    var n = poolR.length, base = poolR.map(function (r, i) { return i; });
    if (n < 2) return base;
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    for (var tries = 0; tries < 200; tries++) {
      var a = base.slice();
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      if (a[0] === lastPrev) continue;
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      return a;
    }
    var b = base.slice(1).concat(base[0]);
    return b;
  }

  /* ---------------- state ---------------- */
  function newState(r, rand) {
    return { id: r.id, level: r.level, mode: r.mode, song: r.song, notes: r.notes.slice(), beats: r.beats.slice(), tempo: r.tempo,
      facts: drawFacts(r, rand), pos: 0, punched: [], wrong: 0, help: 0, last: null, full: false, done: false, explore: false };
  }
  /* free play ("Music box"): every bar punches, the crank plays the child's own strip (up to 12 holes) */
  function newPlay(lv) {
    return { id: 'play', level: level(lv), mode: 'both', song: null, notes: [], beats: [], tempo: 400, facts: [], pos: 0, punched: [], wrong: 0, help: 0, last: null, full: false, done: false, explore: true };
  }
  var PLAY_MAX = 12;
  function fact(st) { return st.facts[st.pos] || null; }
  /* tap a bar: the right one punches its row and the strip steps on; a wrong one punches nothing and
     returns the fact's rods; any tap takes away the help that was showing */
  function tap(st, k) {
    if (st.done || st.full) return { act: 'locked' };
    k = +k;
    if (!(k >= 1 && k <= maxBar(st.level))) return { act: 'locked' };
    if (st.explore) {
      if (st.punched.length >= PLAY_MAX) return { act: 'locked' };
      st.punched.push(k); st.notes.push(k); st.beats.push(1); st.pos++;
      return { act: 'punch', ok: true, k: k };
    }
    var f = fact(st), ans = answerOf(f);
    st.help = 0; st.last = null;
    if (k === ans) {
      st.punched.push(k); st.pos++; st.wrong = 0;
      if (st.pos === st.notes.length) st.full = true;
      return { act: 'punch', ok: true, k: k, fact: f, full: st.full };
    }
    st.wrong++; st.help = Math.min(2, st.wrong);
    st.last = { k: k, fact: f, diff: ans - k };
    return { act: 'miss', ok: false, k: k, fact: f, rods: rods(f), diff: ans - k };
  }
  /* the rods of a fact: addition = an a-rod on a b-rod; subtraction = an a-rod whose top b blocks break off */
  function rods(f) { return f.op === '+' ? { kept: [f.a, f.b], off: 0, height: f.a + f.b } : { kept: [f.a - f.b], off: f.b, height: f.a - f.b }; }
  /* where the rods lie: always beside the bar the child tapped — never beside the answer's bar (that would
     point at the answer; the counters in the five-frame are the scaffold at the second miss) */
  function rodBar(st) { if (!st.last) return null; return st.last.k; }
  function frameOpen(st, asked) { return !!asked || st.help >= 2; }
  function hint(st) {
    if (st.explore || st.done || !st.last) return null;
    if (st.help < 2) return { key: 'hintRods', wrong: true };
    /* subtraction: count the counters that are LEFT, not the crossed-out ones too */
    return { key: st.last.fact.op === '-' ? 'hintCountLeft' : 'hintCount', wrong: true };
  }
  /* the crank: playable only when the strip is full; the schedule is the song's own rhythm and tempo */
  function crank(st) {
    if (!st.full && !(st.explore && st.punched.length)) return null;
    var t = 0, out = [];
    for (var i = 0; i < st.punched.length; i++) { var d = (st.beats[i] || 1) * st.tempo; out.push({ col: i, bar: st.punched[i], t: t, dur: d }); t += d; }
    if (!st.explore) st.done = true;
    return out;
  }
  function freq(lv, k) { return PITCH[level(lv)][k]; }
  /* what a bar sounds like when struck: in a round, "tok" unless the teacher chose As you go */
  function barSound(st, k, notes) { return (st.explore || notes === 'go' || st.done) ? freq(st.level, k) : TOK; }
  function clearPlay(st) { if (!st.explore) return false; st.punched = []; st.notes = []; st.beats = []; st.pos = 0; return true; }

  /* per round: the most frequent answer's share and the "same bar again" hits (answer-position measures) */
  function stats(r) {
    var c = {}, rep = 0;
    r.notes.forEach(function (n, i) { c[n] = (c[n] || 0) + 1; if (i && r.notes[i - 1] === n) rep++; });
    var mx = 0; Object.keys(c).forEach(function (k) { mx = Math.max(mx, c[k]); });
    return { maxShare: mx / r.notes.length, repeats: rep };
  }
  function celebrateKey(r, lastOfPass) { return lastOfPass ? 'celebratePass' : 'celebrateSong'; }

  /* ---------------- layout ----------------
     the bars row is the hero: at "to 5" five bars side by side; at "to 10" ten bars, wrapping into two
     rows of five below a 600 px stage so a bar is never narrower than 44 px */
  function layout(W, lv) {
    var L = { mode: W >= 600 ? 'wide' : 'narrow' }, n = maxBar(level(lv));
    L.rows = n === 10 && W < 600 ? 2 : 1;
    var perRow = n / L.rows;
    L.gap = W >= 600 ? 14 : 6;
    L.barW = Math.min(n === 10 && L.rows === 1 ? 56 : 96, Math.floor((W - (perRow - 1) * L.gap - 8) / perRow));
    if (n === 5) L.block = W >= 600 ? 34 : W >= 330 ? 30 : 24;
    else L.block = L.rows === 1 ? 16 : 12;
    L.disc = W >= 600 ? 40 : 36;
    L.hole = W >= 600 ? 16 : 12;
    L.crank = W >= 600 ? 56 : 48;
    L.pic = W >= 600 ? 96 : 64;
    L.cardFont = W >= 600 ? 56 : 44;
    return L;
  }

  var api = {
    NOTE: NOTE, PITCH: PITCH, TOK: TOK, SONGS: SONGS, FRUITS: FRUITS, PLAY_MAX: PLAY_MAX,
    level: level, factsMode: factsMode, maxBar: maxBar, pool: pool, answerOf: answerOf, songsFor: songsFor, rounds: rounds,
    drawFacts: drawFacts, order: order, newState: newState, newPlay: newPlay, fact: fact, tap: tap, rods: rods, rodBar: rodBar,
    frameOpen: frameOpen, hint: hint, crank: crank, freq: freq, barSound: barSound, clearPlay: clearPlay, stats: stats,
    celebrateKey: celebrateKey, layout: layout
  };
  global.MusicBoxCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
