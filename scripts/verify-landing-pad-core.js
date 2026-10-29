#!/usr/bin/env node
/* =====================================================================
   verify-landing-pad-core.js — the gate for ACTIVITY #157, The Spring and
   the Landing Pad (2.MD.B.6). The gate keeps its OWN oracle: the design's
   round tables, its own hop model (one arc per coil, every arc from a
   stone to a stone, the start never counted) and its own grading rule —
   never read off the tool.
   A the rounds · B the pictures · C every build the child can make,
   graded by the own oracle · D the rules of the hand · E the misses and
   the miss-2 path · F the bots · G the plan · H strings ×11 and
   reachability · I drawing rules · J the manifest row.
   LP_CORE / LP_ACT / LP_MANIFEST let mutate-landing-pad.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.LP_CORE || path.join(ROOT, 'mini tools', 'landing-pad-core.js');
const ACT_PATH = process.env.LP_ACT || path.join(ROOT, 'mini tools', 'landing-pad-activity.js');
const MAN_PATH = process.env.LP_MANIFEST || path.join(ROOT, 'mini tools', 'hoppers-number-line-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
/* level 1 and 2: [low, high, step, start, size, +1 forward | -1 back, landing] */
const OWN = {
  20: [[0, 20, 1, 6, 8, 1, 14], [0, 20, 1, 16, 6, -1, 10], [0, 20, 1, 3, 9, 1, 12], [0, 20, 1, 18, 9, -1, 9], [0, 20, 1, 11, 7, 1, 18], [0, 20, 1, 14, 8, -1, 6], [0, 20, 1, 4, 12, 1, 16], [0, 20, 1, 20, 13, -1, 7], [0, 20, 1, 8, 5, 1, 13]],
  100: [[40, 60, 1, 43, 12, 1, 55], [40, 60, 1, 58, 14, -1, 44], [60, 80, 1, 62, 15, 1, 77], [60, 80, 1, 79, 16, -1, 63], [80, 100, 1, 81, 13, 1, 94], [80, 100, 1, 97, 11, -1, 86],
    [40, 60, 1, 47, 9, 1, 56], [60, 80, 1, 76, 8, -1, 68], [80, 100, 1, 83, 10, 1, 93], [0, 100, 10, 30, 40, 1, 70], [0, 100, 10, 80, 50, -1, 30]]
};
/* level 3: ['mul', hops, size, landing] from 0 · ['div', start, size, hops] back to the bank */
const OWN_EQ = [['mul', 4, 3, 12], ['div', 12, 3, 4], ['mul', 5, 4, 20], ['div', 20, 4, 5], ['mul', 7, 2, 14], ['div', 18, 6, 3], ['mul', 3, 5, 15], ['div', 16, 2, 8], ['mul', 3, 6, 18], ['div', 24, 4, 6], ['mul', 7, 3, 21], ['mul', 6, 4, 24]];
/* the own hop model: tens first then ones, once per hop; every arc lands on a stone */
const HOPS = (start, dir, tens, ones, count) => { let at = start; const stops = [at]; for (let h = 0; h < count; h++) { for (let t = 0; t < tens; t++) stops.push(at += dir * 10); for (let o = 0; o < ones; o++) stops.push(at += dir); } return stops; };
const OWN_ROUND = (L, i) => {
  if (L === 'eq') { const [kd, a, n, x] = OWN_EQ[i]; return kd === 'mul' ? { kind: 'mul', lo: 0, hi: 24, step: 1, start: 0, size: n, dir: 1, count: a, answer: x, land: x } : { kind: 'div', lo: 0, hi: 24, step: 1, start: a, size: n, dir: -1, count: x, answer: x, land: 0 }; }
  const [lo, hi, step, s, n, d, x] = OWN[L][i]; return { kind: d > 0 ? 'add' : 'sub', lo, hi, step, start: s, size: n, dir: d, count: 1, answer: x, land: x };
};
const SOME = (L, lo, hi, step, v) => step === 10 || v === lo || v === hi || v % (L === '100' ? 5 : 2) === 0;

/* ---------- A. the rounds ---------- */
for (const L of ['20', '100', 'eq']) {
  const R = C.rounds(L), n = L === 'eq' ? OWN_EQ.length : OWN[L].length;
  ok(R.length === n && n >= 7, 'A: ' + L + ' has ' + n + ' rounds (≥ 7)');
  R.forEach((r, i) => {
    const o = OWN_ROUND(L, i), tag = 'A: ' + L + '#' + (i + 1);
    ['kind', 'lo', 'hi', 'step', 'start', 'size', 'dir', 'count', 'answer'].forEach((f) => ok(r[f] === o[f], tag + ' ' + f + ' ' + r[f] + ' is the design table ' + o[f]));
    if (o.kind === 'add' || o.kind === 'sub') ok(o.start + o.dir * o.size === o.answer, tag + ' landing ' + o.answer + ' (own solver)');
    if (o.kind === 'mul') ok(o.count * o.size === o.answer && o.answer <= 24, tag + ' ' + o.count + ' × ' + o.size + ' = ' + o.answer + ' within the line');
    if (o.kind === 'div') ok(o.start % o.size === 0 && o.start / o.size === o.answer, tag + ' ' + o.start + ' ÷ ' + o.size + ' = ' + o.answer + ' hops, exactly');
    ok(o.land >= o.lo && o.land <= o.hi && (o.land - o.lo) % o.step === 0 && o.start >= o.lo && o.start <= o.hi, tag + ' start and landing are stones of the line');
    ok(o.kind === 'div' || o.land > 0, tag + ' never lands on 0 (only the bank of a division round)');
    ok(o.step !== 10 || o.size % 10 === 0, tag + ' a hop on the tens line is whole tens');
    ok(o.size >= 2 && o.size <= 99, tag + ' a hop the spring can hold');
  });
  if (L !== 'eq') {
    const lands = R.map((r) => r.answer); ok(new Set(lands).size === lands.length, 'A: ' + L + ' every landing differs');
    const fw = R.filter((r) => r.dir > 0).length; ok(fw / R.length >= 0.4 && fw / R.length <= 0.6, 'A: ' + L + ' forward ' + fw + ' of ' + R.length + ' (40–60 %)');
    const left = R.filter((r) => r.answer - r.lo < (r.hi - r.lo) / 2).length; ok(left >= 3 && left <= R.length - 3, 'A: ' + L + ' landings in the left half ' + left + ' of ' + R.length);
  }
  if (L === '100') {
    const lab = R.filter((r) => SOME('100', r.lo, r.hi, r.step, r.answer)).length; ok(lab / R.length <= 0.3, 'A: 100 landings on a printed number ' + lab + ' of 11 (≤ 30 %)');
    ok(R.filter((r) => r.step === 1).every((r) => !SOME('100', r.lo, r.hi, r.step, r.start)), 'A: 100 no window start sits on a printed number');
    ok(R.filter((r) => r.step === 1).every((r) => r.size >= 8 && r.size <= 16), 'A: 100 window hops are 8–16 (one ten and some ones, or ones)');
    ok(R.some((r) => r.step === 1 && r.size > 10 && (r.start % 10) + (r.dir > 0 ? r.size % 10 : 0) >= 10) || R.some((r) => r.dir < 0 && (r.start % 10) < (r.size % 10)), 'A: 100 some hops cross a ten');
  }
  if (L === 'eq') { ok(R.filter((r) => r.kind === 'mul').length === 7 && R.filter((r) => r.kind === 'div').length === 5, 'A: eq 7 × and 5 ÷'); ok(R.every((r) => r.size <= 9), 'A: eq hops are ones only'); }
}

/* ---------- B. the pictures ---------- */
[['pets', 'frog'], ['flowers', 'lotus']].forEach(([d, k]) => {
  const ix = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'pictures', d + '.json'), 'utf8')), e = ix.nouns && ix.nouns[k];
  ok(!!e, 'B: ' + d + '/' + k + ' is in the picture index');
  ok(e && fs.existsSync(path.join(ROOT, e.src.replace(/^\//, ''))), 'B: ' + d + '/' + k + ' webp exists');
  ok(e && LOCALES.every((l) => e.labels[l] && e.labels[l][0]), 'B: ' + d + '/' + k + ' labelled in 11 locales');
  ok(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d), 'B: ' + d + ' is a colour theme');
});
ok(/THEMES: \['pets', 'flowers'\]/.test(SRC) && /'frog'/.test(SRC) && /'lotus'/.test(SRC), 'B: the activity loads only pets/frog and flowers/lotus');

/* ---------- C. every build × pad, against the own oracle ---------- */
let graded = 0;
for (const L of ['20', '100', 'eq']) {
  const R = C.rounds(L);
  R.forEach((r, i) => {
    const o = OWN_ROUND(L, i), stonesAll = []; for (let v = o.lo; v <= o.hi; v += o.step) stonesAll.push(v);
    const frogs = [o.start, o.start - o.step, o.start + o.step, o.lo, o.hi].filter((v) => v >= o.lo && v <= o.hi);
    const counts = L === 'eq' ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1];
    const pads = o.kind === 'div' ? [o.lo] : stonesAll;
    const loads = []; for (let t = 0; t <= 6; t++) for (let u = 0; u <= 9; u++) if ((t || u) && (o.step === 1 || u === 0) && t * 10 + u <= 60) loads.push([t, u]);
    let wins = 0;
    for (const f of new Set(frogs)) for (const face of [1, -1]) for (const [t, u] of loads) for (const k of counts) for (const p of pads) {
      const st = C.newState(L, i); C.placeFrog(st, f); if (face !== st.facing) C.turn(st);
      /* coils in a scrambled order (the model must not care) */
      const coils = []; for (let a = 0; a < t; a++) coils.push(10); for (let b = 0; b < u; b++) coils.push(1); coils.sort((x, y) => ((x * 7 + y) % 3) - 1);
      coils.forEach((c) => C.addCoil(st, c)); if (L === 'eq') C.setCount(st, k); if (o.kind !== 'div') C.placePad(st, p);
      const res = C.check(st); graded++;
      const own = HOPS(f, face, t, u, k), fin = own[own.length - 1];
      const right = f === o.start && face === o.dir && t * 10 + u === o.size && k === o.count && fin === p;
      if (f !== o.start) { ok(res.result === 'miss' && res.kind === 'start', 'C: ' + L + '#' + (i + 1) + ' a wrong start (' + f + ') is the first thing graded'); continue; }
      if (right) { wins++; ok(res.result === 'ok', 'C: ' + L + '#' + (i + 1) + ' the true build lands on the pad'); continue; }
      if (res.result !== 'miss') { ok(false, 'C: ' + L + '#' + (i + 1) + ' a wrong build ' + JSON.stringify([f, face, t, u, k, p]) + ' passed'); continue; }
      ok(st.verdict.final === fin && st.verdict.stops.join() === own.join(), 'C: ' + L + '#' + (i + 1) + ' Hopper hops exactly the build (' + fin + ')');
      ok(res.kind === (fin === p ? 'sink' : 'splash'), 'C: ' + L + '#' + (i + 1) + ' on the pad but a wrong build sinks; off the pad splashes');
      const why = face !== o.dir ? 'direction' : t * 10 + u !== o.size ? 'load' : k !== o.count ? 'count' : 'pad';
      ok(res.why === why, 'C: ' + L + '#' + (i + 1) + ' the miss is the ' + why);
    }
    ok(wins === 1, 'C: ' + L + '#' + (i + 1) + ' exactly one build wins (' + wins + ')');
  });
}
ok(graded > 200000, 'C: graded ' + graded + ' builds');

/* ---------- D. the rules of the hand ---------- */
{
  const R = C.rounds('100'), tl = R.findIndex((r) => r.step === 10), st = C.newState('100', tl);
  ok(!C.addCoil(st, 1) && C.addCoil(st, 10), 'D: on the tens line the one-coil is shut, the ten-coil works');
  const s2 = C.newState('20', 0); for (let a = 0; a < 9; a++) C.addCoil(s2, 1); ok(!C.addCoil(s2, 1) && C.ones(s2) === 9, 'D: the spring holds at most nine one-coils');
  for (let a = 0; a < 9; a++) C.addCoil(s2, 10); ok(!C.addCoil(s2, 10) && C.tens(s2) === 9, 'D: and at most nine ten-coils');
  const s3 = C.newState('20', 0);
  ok(C.check(s3).key === 'hintFrog' && s3.misses === 0, 'D: Check with nothing → "put Hopper on his start", no miss');
  C.placeFrog(s3, 6); ok(C.check(s3).key === 'hintLoad' && s3.misses === 0, 'D: then "load his spring"');
  C.addCoil(s3, 1); ok(C.check(s3).key === 'hintPad' && s3.misses === 0, 'D: then "float the pad"');
  const s4 = C.newState('eq', 0); C.placeFrog(s4, 0); C.addCoil(s4, 1); ok(C.check(s4).key === 'hintMarks' && s4.misses === 0, 'D: on equal hops, "how many hops" before the pad');
  const dv = C.rounds('eq').findIndex((r) => r.kind === 'div'), s5 = C.newState('eq', dv);
  ok(s5.padAt === 0 && !C.placePad(s5, 5) && s5.padAt === 0, 'D: a division round keeps the pad at the bank');
  const s6 = C.newState('20', 0); C.placeFrog(s6, 6); C.addCoil(s6, 1); C.placePad(s6, 3); C.check(s6);
  ok(!!s6.verdict, 'D: a miss leaves its verdict'); C.addCoil(s6, 1); ok(s6.verdict === null, 'D: a new move clears it');
  const s7 = C.newState('20', 0); C.placeFrog(s7, 6); for (let a = 0; a < 8; a++) C.addCoil(s7, 1); C.placePad(s7, 14);
  ok(C.check(s7).result === 'ok' && s7.done, 'D: the true build wins');
  ok(!C.placeFrog(s7, 3) && !C.turn(s7) && !C.addCoil(s7, 1) && !C.undoCoil(s7) && !C.placePad(s7, 3) && C.check(s7).result === 'no', 'D: a solved round is locked');
  ok(!C.setCount(C.newState('20', 0), 3), 'D: the hop marks exist only on equal hops');
  const s8 = C.newState('100', 0); C.placeFrog(s8, 41.4); ok(s8.frogAt === 41, 'D: Hopper snaps to a stone');
  const s9 = C.newState('100', tl); C.placeFrog(s9, 34); ok(s9.frogAt === 30, 'D: on the tens line he snaps to a ten');
  C.placePad(s9, 1000); ok(s9.padAt === 100, 'D: the pad stays on the line');
}

/* ---------- E. the misses and the miss-2 path ---------- */
for (const L of ['20', '100', 'eq']) C.rounds(L).forEach((r, i) => {
  const o = OWN_ROUND(L, i), tag = 'E: ' + L + '#' + (i + 1);
  const tp = C.truePath(r), own = HOPS(o.start, o.dir, Math.floor(o.size / 10), o.size % 10, o.count);
  ok(tp.join() === own.join(), tag + ' the dotted path is the true hops, tens first');
  ok(tp.slice(1).every((v, j) => Math.abs(v - tp[j]) === (Math.abs(v - tp[j]) >= 10 ? 10 : 1)), tag + ' every dotted arc is one coil');
  /* counting the start stone as hop 1 lands one stone short: a splash one stone from the pad */
  if (o.kind === 'add' || o.kind === 'sub') {
    const st = C.newState(L, i); C.placeFrog(st, o.start); if (st.facing !== o.dir) C.turn(st);
    for (let t = 0; t < Math.floor(o.size / 10); t++) C.addCoil(st, 10); for (let u = 0; u < o.size % 10; u++) C.addCoil(st, 1);
    C.placePad(st, o.answer - o.dir * o.step); const res = C.check(st);
    ok(res.result === 'miss' && res.kind === 'splash' && Math.abs(st.verdict.final - st.padAt) === o.step, tag + ' counting the start as one: a splash exactly one stone from the pad');
    ok(C.hint(st, 'some') === 'hintPadOff', tag + ' and the hint points at Hopper and the pad');
    C.placePad(st, o.answer + o.dir * o.step); C.check(st); ok(st.help && C.hint(st, 'some') === 'hintGhost', tag + ' a second miss shows the dotted hops');
  }
  const sw = C.newState(L, i); C.placeFrog(sw, o.start === o.lo ? o.lo + o.step : o.start - o.step); C.addCoil(sw, o.step === 10 ? 10 : 1); if (L === 'eq') C.setCount(sw, 1); if (o.kind !== 'div') C.placePad(sw, o.lo); C.check(sw);
  ['some', 'every', 'ten'].forEach((ev) => {
    const lab = C.labelled(r, r.start, ev), k = C.hint(sw, ev);
    ok(k === (lab ? 'hintStartFind' : 'hintStart'), tag + ' wrong start (' + ev + '): ' + (lab ? '"find it"' : '"count from a label"'));
    if (!lab) { const nl = C.nearestLabel(r, ev); ok(C.labelled(r, nl, ev) && nl !== r.start, tag + ' counts from a printed number (' + nl + ')'); }
  });
});
{
  const st = C.newState('20', 0); C.placeFrog(st, 6); C.turn(st); for (let a = 0; a < 8; a++) C.addCoil(st, 1); C.placePad(st, 14); C.check(st);
  ok(C.hint(st, 'some') === 'hintDir', 'E: facing back on a forward story → the nose hint');
  C.placePad(st, 13); C.check(st); ok(st.help && C.hint(st, 'some') === 'hintGhost', 'E: miss 2 → the dotted hops');
  const s2 = C.newState('20', 0); C.placeFrog(s2, 6); C.turn(s2); C.turn(s2); for (let a = 0; a < 7; a++) C.addCoil(s2, 1); C.placePad(s2, 13); const r2 = C.check(s2);
  ok(r2.kind === 'sink' && C.hint(s2, 'some') === 'hintLoadWrong', 'E: a self-consistent wrong load (7 for 8) sinks the pad and asks to count the coils');
  const dv = C.rounds('eq').findIndex((r) => r.kind === 'div'), s3 = C.newState('eq', dv), rd = s3.round;
  C.placeFrog(s3, rd.start); C.turn(s3); for (let a = 0; a < rd.size; a++) C.addCoil(s3, 1); C.setCount(s3, rd.count - 1); C.check(s3);
  ok(C.hint(s3, 'some') === 'hintBank' && s3.verdict.final === rd.size, 'E: too few hops back leave Hopper in the water short of the bank');
  const mu = C.newState('eq', 0), rm = mu.round; C.placeFrog(mu, 0); for (let a = 0; a < rm.size; a++) C.addCoil(mu, 1); C.setCount(mu, rm.count + 1); C.placePad(mu, rm.answer); C.check(mu);
  ok(C.hint(mu, 'some') === 'hintCountWrong' && mu.verdict.kind === 'splash', 'E: one hop too many splashes past the pad');
}

/* ---------- F. the bots ---------- */
for (const L of ['20', '100']) {
  const R = C.rounds(L);
  /* a bot that builds the hop right but parks the pad by a shortcut */
  const play = (pad) => R.filter((r, i) => { const st = C.newState(L, i); C.placeFrog(st, r.start); if (st.facing !== r.dir) C.turn(st); for (let t = 0; t < Math.floor(r.size / 10); t++) C.addCoil(st, 10); for (let u = 0; u < r.size % 10; u++) C.addCoil(st, 1); C.placePad(st, pad(r)); return C.check(st).result === 'ok'; }).length;
  ok(play((r) => r.answer - r.dir * r.step) === 0, 'F: ' + L + ' counting the start stone never wins');
  ok(play((r) => r.start + r.size) === R.filter((r) => r.dir > 0).length, 'F: ' + L + ' "always add" wins only the forward stories');
  const nearestPrinted = (r) => { let b = null; C.stones(r).forEach((v) => { if (SOME(L, r.lo, r.hi, r.step, v) && (b === null || Math.abs(v - (r.lo + r.hi) / 2) < Math.abs(b - (r.lo + r.hi) / 2))) b = v; }); return b; };
  ok(play(nearestPrinted) <= 2, 'F: ' + L + ' parking on the middle printed number wins ' + play(nearestPrinted));
  for (let q = 0; q <= 20; q++) ok(play((r) => r.lo + q * r.step) <= 2, 'F: ' + L + ' the pad always on stone ' + q + ' wins ≤ 2');
}

/* ---------- G. the plan ---------- */
for (const L of ['20', '100', 'eq']) {
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0, runs = 0; const seen = new Set(), R = C.rounds(L);
  for (let p = 0; p < 300; p++) { const o = C.plan(L, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === R.map((r) => r.k).join(), 'G: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; for (let i = 2; i < o.length; i++) if (R[o[i]].kind === R[o[i - 1]].kind && R[o[i]].kind === R[o[i - 2]].kind) runs++; seen.add(o.join()); prev = o; }
  ok(same === 0, 'G: ' + L + ' never repeats the previous order');
  if (L === 'eq') ok(runs === 0, 'G: eq never three rounds of one kind in a row');
  ok(seen.size > 100, 'G: ' + L + ' orders really shuffle (' + seen.size + ')');
  /* the same random stream twice: only the never-repeat rule can make the second order differ */
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null), o2 = C.plan(L, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'LandingPadCore', SRC.replace(/injectLandingPadCSS\(\);/, '') + ';window.X=LandingPadActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings, KINDS = ['add', 'sub', 'mul', 'div'];
ok(keys.length >= 45, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]).replace(/(\{n\},)+/g, '{n},') === ph(STR[k].en).replace(/(\{n\},)+/g, '{n},'), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  const built = /^s_/.test(k) && /'s_' \+ r\.kind/.test(body) || /^ok_/.test(k) && /'ok_' \+ r\.kind/.test(body);
  ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
KINDS.forEach((kd) => LOCALES.forEach((l) => {
  const s = STR['s_' + kd][l], o = STR['ok_' + kd][l];
  ok(/\{s\}/.test(s) && /\{n\}/.test(s) && !/\{e\}/.test(s) && (kd !== 'mul' || /\{k\}/.test(s)) && (kd !== 'div' || !/\{k\}/.test(s)), 'H: ' + l + ' s_' + kd + ' gives the start and the hop, never the answer');
  ok(!/\d/.test(s.replace(/\{\w+\}/g, '')), 'H: ' + l + ' s_' + kd + ' carries no number of its own');
  if (kd === 'add') ok(/\{s\} \+ \{n\} = \{e\}/.test(o), 'H: ' + l + ' ok_add is the equation');
  if (kd === 'sub') ok(/\{s\} − \{n\} = \{e\}/.test(o), 'H: ' + l + ' ok_sub is the equation with U+2212');
  if (kd === 'mul') ok(/\{sum\} = \{e\}/.test(o) && (['de', 'sv', 'da', 'no', 'fi'].includes(l) ? /\{k\} · \{n\} = \{e\}/ : /\{k\} × \{n\} = \{e\}/).test(o), 'H: ' + l + ' ok_mul shows the repeated sum and the product (' + (['de', 'sv', 'da', 'no', 'fi'].includes(l) ? '·' : '×') + ')');
  if (kd === 'div') ok(/\{k\}/.test(o) && /\{s\}/.test(o), 'H: ' + l + ' ok_div names the start and the number of hops');
}));
['hintFrog', 'hintLoad', 'hintMarks', 'hintPad', 'hintDir', 'hintCountWrong', 'hintBank', 'hintPadOff', 'hintGhost', 'hintStartFind', 'hintStart', 'hintLoadWrong'].forEach((k) => LOCALES.forEach((l) => {
  ok(!/\{e\}|\{k\}/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' never names the landing or the count');
  ok(!/\d/.test(STR[k][l].replace(/\{\w+\}/g, '')), 'H: ' + l + ' ' + k + ' carries no number of its own');
}));
LOCALES.forEach((l) => ok(/\{lab\}/.test(STR.hintStart[l]) && !/\{lab\}/.test(STR.hintStartFind[l]), 'H: ' + l + ' only the off-label start hint counts from a label'));
LOCALES.forEach((l) => ok(STR.instruction[l].indexOf(STR.checkBtn[l].replace(/^¡|[!?]$| !$/g, '').trim()) >= 0, 'H: ' + l + ' the instruction names the Let-go button by its label'));
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');
LOCALES.forEach((l) => ok(/Saltão/.test(STR.title[l]) === (l === 'pt') && (l !== 'pt' || KINDS.every((k) => !/Hopper/.test(STR['s_' + k].pt))), 'H: ' + l + ' the mascot is ' + (l === 'pt' ? 'Saltão' : 'Hopper')));

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(/var shown = anim \? anim\.stops\[anim\.i\] : vk && vk !== 'start' \? st\.verdict\.final : st\.done \? r\.answer : st\.frogAt;/.test(ACT_BODY), 'I: Hopper is drawn where the child put him; the landing only after Let go');
ok(!/data-pad="1"[^\n]*(r\.answer|padAt|padV)[^\n]*<text|data-pad="1"[^\n]*<text/.test(ACT_BODY) && !/lp-lily[^\n]*<text/.test(ACT_BODY), 'I: the pad never shows a number');
ok(/if \(st\.help && vk && vk !== 'start' && !anim\)/.test(ACT_BODY), 'I: the dotted hops only after a second miss (never on a wrong start)');
ok(/if \(st\.done && lotus/.test(ACT_BODY), 'I: the lotus opens only on success');
ok(!/test-?hop|_testHop/i.test(ACT_BODY), 'I: no test hop inside a round (the prediction cannot be copied)');
ok(/bo\.disabled = st\.done \|\| this\._busy \|\| r\.step === 10/.test(ACT_BODY), 'I: the one-coil button is shut on the tens line');
ok(/if \(C\.labelled\(r, s, g\.every\)\)/.test(ACT_BODY), 'I: numerals follow the labels setting');
/* equal hops: a hop of 3 is ONE arc over three stones, so "4 hops of 3" shows 4 arcs (the review's finding) */
ok(/_byHop: function \(stops, per\) \{ if \(this\.st\.round\.level !== 'eq' \|\| !per\) return stops; return stops\.filter\(function \(v, j\) \{ return j % per === 0; \}\); \}/.test(ACT_BODY) && (ACT_BODY.match(/this\._byHop\(/g) || []).length >= 4, 'I: on equal hops each hop is one arc, wherever arcs are drawn');
ok(/var e = every === 'every' \? 1 : every === 'ten' \? 10 : r\.level === '100' \? 5 : 2;/.test(CORE), 'I: some = every 2nd (every 5th within 100); every; every 10');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'hoppers-number-line.jump-sums.2-md-b-6');
ok(row && row.tool === 'landing-pad-activity' && row.task_template === 'landing-pad', 'J: the row points at the landing pad');
ok(row && row.alignment.code === '2.MD.B.6', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');

console.log(`verify-landing-pad-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
