#!/usr/bin/env node
/* =====================================================================
   verify-music-box-core.js — the gate for THE MUSIC-BOX STRIP (#29,
   K.OA.A.5). Its own oracle: every melody written out again in note names
   and mapped to bars through the pitch table (longest bar = lowest note);
   the fact pool re-derived by this file's own arithmetic; the drawn facts
   checked against the notes over 1 000 seeds per song; the crank's
   schedule recomputed from the stored beats and tempo — never from how
   the strip was answered. Design §12 rules 1–9, plus order, help, play,
   pictures, strings and layout.
   Usage: node scripts/verify-music-box-core.js   (MB_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.MB_CORE_DIR || MT, 'music-box-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'music-box-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

/* the melodies, written again in note names (the critic's note-by-note check, design §6) */
const TUNES = {
  to5: { frere1: 'C D E C C D E C', ode1: 'E E F G G F E D', row1: 'G E E F D D', row2: 'C D E F G G G', frere2: 'E F G E F G', ode2: 'C C D E E D D', duck: 'C D E F G G', buns: 'E D C E D C' },
  to5add: { buns: 'E D C E D C', odelow: 'D D E F F E D C', moon1: 'C C C D E D', lamb: 'E D C D E E', ode2: 'C C D E E D D', frere1: 'C D E C C D E C', moon2: 'C C C D E D C E D D C' },
  to10: { star1: 'C C G G A A G', star2: 'F F E E D D C', duck: 'C D E F G G', frere1: 'C D E C C D E C', ode1: 'E E F G G F E D', ode2: 'C C D E E D D', row: 'G E E F D D C' }
};
/* the bar for each note name: "to 5" C5 = 5 … G5 = 1; "to 10" C4 = 10 … B4 = 4 */
const BAR = { to5: { C: 5, D: 4, E: 3, F: 2, G: 1 }, to10: { C: 10, D: 9, E: 8, F: 7, G: 6, A: 5, B: 4 } };
const sets = { to5: C.rounds('to5', 'both'), to5add: C.rounds('to5', 'add'), to10: C.rounds('to10', 'both'), to10add: C.rounds('to10', 'add') };
for (const [set, rs] of Object.entries({ to5: sets.to5, to5add: sets.to5add, to10: sets.to10 })) {
  const tunes = TUNES[set], map = BAR[set === 'to10' ? 'to10' : 'to5'];
  is(rs.length === Object.keys(tunes).length && rs.length >= 7, `${set}: ${rs.length} rounds (≥ 7)`);
  rs.forEach(r => {
    const tune = tunes[r.songId];
    is(!!tune, `${set}/${r.songId}: a known tune`); if (!tune) return;
    const want = tune.split(' ').map(n => map[n]);
    is(r.notes.join() === want.join(), `${set}/${r.songId}: notes ${r.notes} = ${tune}`);
    is(r.beats.length === r.notes.length && r.beats.every(b => b > 0) && r.tempo >= 250 && r.tempo <= 700, `${set}/${r.songId}: a beat for every note, a stored tempo`);
    is(r.notes.length >= 6 && r.notes.length <= 11, `${set}/${r.songId}: 6–11 facts`);
    /* 7: answer-position measures */
    const s = C.stats(r);
    is(s.maxShare <= 0.5, `${set}/${r.songId}: most frequent answer ${(s.maxShare * 100).toFixed(0)} % ≤ 50 %`);
    is(s.repeats <= 3, `${set}/${r.songId}: "same bar again" ${s.repeats} ≤ 3`);
    /* the lid picture exists and is a colour drawing */
    is(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', r.pic[0], r.pic[1] + '@2x.webp')) && !/bw/i.test(r.pic[0]), `${set}/${r.songId}: picture ${r.pic.join('/')} on disk`);
    is(r.pic.join('/') !== 'music/trombone', `${set}/${r.songId}: never the trombone`);
  });
}
C.FRUITS.forEach(f => is(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', 'fruits', f + '@2x.webp')), `fruit ${f} on disk`));

/* ---- 1 + 8 + 9: the pool ---- */
const ORACLE_TO5 = { 1: ['2-1', '3-2', '4-3', '5-4'], 2: ['1+1', '3-1', '4-2', '5-3'], 3: ['1+2', '2+1', '4-1', '5-2'], 4: ['1+3', '3+1', '2+2', '5-1'], 5: ['1+4', '4+1', '2+3', '3+2'] };
const fk = f => f.a + f.op + f.b;
const P5 = C.pool('to5', 'both');
for (let c = 1; c <= 5; c++) is(P5[c].map(fk).sort().join() === ORACLE_TO5[c].slice().sort().join(), `to5 answer ${c}: ${P5[c].map(fk)}`);
['2+1', '2+2', '2+3', '1+3', '5-2', '4-1', '3-1', '5-1'].forEach(k => is(Object.values(P5).some(l => l.map(fk).includes(k)), `the old fact ${k} is in the pool`));
for (const [lv, mode] of [['to5', 'both'], ['to5', 'add'], ['to10', 'both'], ['to10', 'add']]) {
  const P = C.pool(lv, mode), top = lv === 'to10' ? 10 : 5, lo = lv === 'to10' ? 5 : 1;
  Object.keys(P).forEach(c => P[c].forEach(f => {
    const v = f.op === '+' ? f.a + f.b : f.a - f.b;
    is(v === +c && C.answerOf(f) === v, `${lv}/${mode}: ${fk(f)} = ${c}`);
    is(f.a >= 1 && f.b >= 1 && v >= 1 && v >= lo && v <= top && f.a <= top, `${lv}/${mode}: ${fk(f)} has no 0 and stays within ${top}`);
    if (mode === 'add') is(f.op === '+', `${lv}/add: ${fk(f)} is an addition`);
  }));
  /* completeness: every legal fact is in the pool */
  let n = 0; for (let a = 1; a <= top; a++) for (let b = 1; b <= top; b++) { if (a + b >= lo && a + b <= top) n++; if (mode !== 'add' && a - b >= lo && a - b >= 1) n++; }
  is(Object.values(P).reduce((s, l) => s + l.length, 0) === n, `${lv}/${mode}: every legal fact is in the pool (${n})`);
}
is(C.pool('to10', 'both')[7].map(fk).sort().join() === ['1+6', '2+5', '3+4', '4+3', '5+2', '6+1', '8-1', '9-2', '10-3'].sort().join(), 'to10 answer 7 = the design\'s list');
is(sets.to5add.every(r => !r.notes.includes(1)), 'add only: no tune needs answer 1 (no addition makes 1)');

/* ---- 2: the drawn facts follow the notes, no repeat while an unused fact remains ---- */
for (const rs of Object.values(sets)) rs.forEach(r => {
  let ok = true, rep = true, variety = new Set();
  for (let s = 0; s < 1000; s++) {
    const F = C.drawFacts(r, seeded(s * 7 + r.index));
    if (F.length !== r.notes.length || F.some((f, i) => C.answerOf(f) !== r.notes[i])) ok = false;
    if (r.mode === 'add' && F.some(f => f.op !== '+')) ok = false;
    const P = C.pool(r.level, r.mode), seen = {};
    F.forEach((f, i) => { const k = fk(f); if (seen[k] && P[r.notes[i]].some(g => !F.slice(0, i).some(h => fk(h) === fk(g)))) rep = false; seen[k] = true; });
    variety.add(F.map(fk).join());
  }
  is(ok, `${r.id}: drawn facts answer the notes in order (1 000 seeds)`);
  is(rep, `${r.id}: no fact twice in a round while an unused one remains`);
  is(variety.size > 20, `${r.id}: the facts on each note are re-drawn (${variety.size} strips)`);
});

/* ---- 3 + 4 + 5: tap, rods, crank ---- */
for (const rs of [sets.to5, sets.to10]) rs.forEach(r => {
  const st = C.newState(r, seeded(r.index + 1)), top = C.maxBar(r.level);
  is(C.crank(st) === null && !st.done, `${r.id}: the crank does nothing before the strip is full`);
  st.facts.forEach((f, i) => {
    const ans = C.answerOf(f);
    for (let k = 1; k <= top; k++) {
      if (k === ans) continue;
      const before = st.pos, res = C.tap(st, k);
      is(!res.ok && st.pos === before && st.punched.length === i, `${r.id}#${i}: bar ${k} punches nothing`);
      const rd = C.rods(f);
      is(rd.height === ans && rd.kept.reduce((a, b) => a + b, 0) === ans && rd.off === (f.op === '-' ? f.b : 0) && res.diff === ans - k, `${r.id}#${i}: rods ${ans} beside bar ${k}, difference ${ans - k}`);
      is(rd.kept.reduce((a, b) => a + b, 0) + rd.off === (f.op === '+' ? f.a + f.b : f.a), `${r.id}#${i}: the rods are made of the fact's own numbers`);
    }
    const lastK = ans === top ? top - 1 : top;
    is(st.help === 2 && C.rodBar(st) === lastK && C.rodBar(st) !== ans && C.frameOpen(st, false), `${r.id}#${i}: after two misses the rods stay beside the tapped bar (never the answer's) and the frame opens`);
    is(C.hint(st).key === (f.op === '-' ? 'hintCountLeft' : 'hintCount'), `${r.id}#${i}: miss 2 hint ${C.hint(st).key} (subtraction counts what is left)`);
    const ok = C.tap(st, ans);
    is(ok.ok && st.punched[i] === ans && st.pos === i + 1 && st.help === 0 && C.hint(st) === null && C.rodBar(st) === null, `${r.id}#${i}: bar ${ans} punches; the help goes`);
    if (!st.full) is(C.crank(st) === null && !st.done, `${r.id}#${i}: a half-full strip cannot be cranked`);
  });
  is(st.full && st.punched.join() === r.notes.join(), `${r.id}: a full strip holds exactly the song's notes`);
  is(C.tap(st, 1).act === 'locked', `${r.id}: a full strip takes no more holes`);
  const sch = C.crank(st);
  let t = 0;
  const own = r.notes.map((n, i) => { const e = { col: i, bar: n, t: t, dur: r.beats[i] * r.tempo }; t += e.dur; return e; });
  is(JSON.stringify(sch) === JSON.stringify(own), `${r.id}: the crank plays the song's notes in its own rhythm and tempo`);
  is(st.done, `${r.id}: the song has played`);
  /* the same song answered straight through gives the identical schedule — the tempo never depends on the answering */
  const s2 = C.newState(r, seeded(999)); s2.facts.forEach(f => C.tap(s2, C.answerOf(f)));
  is(JSON.stringify(C.crank(s2)) === JSON.stringify(own), `${r.id}: a strip answered fast and one answered slowly play the same`);
});
/* the first miss puts the rods beside the tapped bar; a tap takes the help away */
{ const r = sets.to5[0], st = C.newState(r, seeded(3)), ans = C.answerOf(C.fact(st)), k = ans === 5 ? 4 : ans + 1;
  C.tap(st, k);
  is(st.help === 1 && C.rodBar(st) === k && !C.frameOpen(st, false) && C.frameOpen(st, true) && C.hint(st).key === 'hintRods', 'miss 1: rods beside the tapped bar; the frame only on request');
  is(C.tap(st, 0).act === 'locked' && C.tap(st, 6).act === 'locked', 'bars outside 1–5 do nothing'); }

/* ---- the sound: a knock in-round, the note at the crank, longer = lower ---- */
for (const lv of ['to5', 'to10']) {
  const top = C.maxBar(lv), r = sets[lv][0], st = C.newState(r);
  for (let k = 1; k <= top; k++) {
    is(C.barSound(st, k, 'end') === C.TOK, `${lv}: bar ${k} knocks the same "tok" during a round`);
    is(C.barSound(st, k, 'go') === C.freq(lv, k), `${lv}: bar ${k} rings its note with "As you go"`);
    if (k < top) is(C.freq(lv, k + 1) < C.freq(lv, k), `${lv}: the longer bar ${k + 1} is lower than bar ${k}`);
  }
  const pl = C.newPlay(lv); is(C.barSound(pl, 3, 'end') === C.freq(lv, 3), `${lv}: in the Music box every bar rings`);
}

/* ---- order ---- */
for (const [name, P] of Object.entries(sets)) {
  let prev = null; const seen = new Set();
  for (let s = 0; s < 300; s++) {
    const o = C.order(P, seeded(400 + s), prev);
    is(o.length === P.length && new Set(o).size === P.length, `${name}: order is a permutation`);
    if (prev) { is(o.join() !== prev.join(), `${name}: never the same order twice`); is(o[0] !== prev[prev.length - 1], `${name}: never the same seam`); }
    seen.add(o.join()); prev = o;
  }
  is(seen.size > 50, `${name}: orders vary`);
  for (let s = 0; s < 20; s++) { const o1 = C.order(P, seeded(700 + s), null), o2 = C.order(P, seeded(700 + s), o1); is(o2.join() !== o1.join(), `${name}: the same source cannot repeat the last pass`); }
  is(C.celebrateKey(P[0], true) === 'celebratePass' && C.celebrateKey(P[0], false) === 'celebrateSong', `${name}: celebrate keys`);
}

/* ---- the Music box ---- */
{ const st = C.newPlay('to5');
  for (let i = 0; i < 14; i++) C.tap(st, (i % 5) + 1);
  is(st.punched.length === 12 && C.PLAY_MAX === 12 && st.explore && !st.done, 'Music box: any bar punches, up to 12 holes (the length of the strip)');
  const sch = C.crank(st); is(sch && sch.length === 12 && sch.every((e, i) => e.bar === (i % 5) + 1) && !st.done, 'Music box: the crank plays the child\'s own strip and play goes on');
  C.clearPlay(st); is(st.punched.length === 0 && C.crank(st) === null, 'Music box: a new strip'); }

/* ---- layout ---- */
for (const lv of ['to5', 'to10']) for (const W of [272, 281, 296, 312, 336, 380, 599, 600, 648, 656, 900]) {
  const L = C.layout(W, lv), per = C.maxBar(lv) / L.rows;
  is(per * L.barW + (per - 1) * L.gap <= W, `${lv} @${W}: the bars fit (${per * L.barW + (per - 1) * L.gap} ≤ ${W})`);
  is(L.barW >= 44, `${lv} @${W}: every bar ≥ 44 px wide (${L.barW})`);
  is(L.block >= 12 && L.crank >= 48 && L.disc >= 36, `${lv} @${W}: blocks, crank and discs`);
  is(L.pic >= (W >= 600 ? 96 : 64), `${lv} @${W}: pictures ${L.pic}`);
  if (lv === 'to10') is(L.rows === (W < 600 ? 2 : 1), `${lv} @${W}: ten bars in ${L.rows} row(s)`);
}

/* ---- strings ×11 ---- */
if (ACT) {
  const S = ACT.strings, keys = Object.keys(S);
  keys.forEach(k => LOCALES.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length, `string ${k}.${l}`)));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  keys.forEach(k => LOCALES.forEach(l => is(ph(S[k][l]) === ph(S[k].en), `${k}.${l} placeholders`)));
  const ban = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\w*)\b/i;
  keys.forEach(k => LOCALES.forEach(l => is(!ban.test(S[k][l]), `${k}.${l}: no "free"`)));
  keys.forEach(k => is(!/ [?!:;]/.test(S[k].fr) && !/ /.test(S[k].fr), `${k}.fr: U+202F before ? ! : ;`));
  keys.forEach(k => LOCALES.forEach(l => is(!/(?<![\d])0(?![\d])/.test(S[k][l].replace(/\{\w+\}/g, '')), `${k}.${l}: no lone 0`)));
  keys.forEach(k => LOCALES.forEach(l => is(!/\bfast|schnell|vite|rápid|veloc|snel|snabb|hurtig|rask|nopea/i.test(k === 'title' ? '' : S[k][l]), `${k}.${l}: nothing on screen says fast`)));
  const songs = new Set(); Object.values(sets).forEach(rs => rs.forEach(r => songs.add(r.song)));
  songs.forEach(sg => is(ACT.SONG_KEY[sg] && keys.includes(ACT.SONG_KEY[sg]), `song ${sg} has a name in every locale`));
  ['promptTap', 'hintRods', 'hintCount', 'hintCountLeft', 'hintCrank', 'celebrateSong', 'celebratePass'].forEach(k => is(keys.includes(k), `string ${k} exists`));
  is(ACT.defaults.level === 'to5' && ACT.defaults.facts === 'both' && ACT.defaults.display === 'numbers' && ACT.defaults.notes === 'end', 'defaults: to 5, add and subtract, numbers, notes at the end');
}

console.log(`verify-music-box-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
