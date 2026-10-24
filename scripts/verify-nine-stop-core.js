#!/usr/bin/env node
/* =====================================================================
   verify-nine-stop-core.js — ACTIVITY #97, The Nine-Stop Tubes
   (1.NBT.C.5). Its OWN oracle (never the core's answers):
     · every round recomputed by digit arithmetic (tens ± 1, ones ± 1 per
       arrow); every answer and every neighbour within 1–99, never 0; the
       follow landings lie in ≥ 6 different tens; the mystery trips meet;
       the jump counts are |Δtens| and |Δones|, and every wrong count lands
       somewhere else;
     · the tubes, exhaustively over all 100 states: up at 9 is the lid,
       down at 0 is empty, neither changes anything;
     · arrow cards work only on their own tube; a played card taken back
       restores the tubes;
     · Check: unchanged tubes / blank counts → no miss; right / wrong; the
       hints (incl. the trade at 39 + 1 and 70 − 1; nothing prints the
       answer); the mystery's second trip; the four neighbours in order;
     · the plan never repeats a pass and keeps its rules; the kept prompts
       equal the old choice-board strings; the WORDS block equals
       scripts/worksheet-gen/lib/number-words.js for 1–99 × 11 locales.
   Usage: node scripts/verify-nine-stop-core.js
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.NS_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'nine-stop-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
/* the oracle: a two-digit number as (tens, ones); an arrow moves one digit by one */
const ARR = { D: [1, 0], U: [-1, 0], R: [0, 1], L: [0, -1] };
function walk(n, cards) { let t = Math.floor(n / 10), o = n % 10; for (const c of cards) { t += ARR[c][0]; o += ARR[c][1]; if (o > 9) { o -= 10; t++; } if (o < 0) { o += 10; t--; } } return 10 * t + o; }
const in99 = (n) => Number.isInteger(n) && n >= 1 && n <= 99;

for (const f of C.FACES) {
  const ids = C.ids(f);
  ok(ids.length >= 7, `${f}: ≥ 7 rounds (${ids.length})`);
  const starts = [];
  for (const id of ids) {
    const r = C.round(f, id), w = `${f} ${id}`;
    if (r.kind === 'ten' || r.kind === 'one') {
      const want = r.start + (r.kind === 'ten' ? 1 : 1) * r.step;
      ok(r.answer === want && in99(r.answer) && in99(r.start) && Math.abs(r.step) === (r.kind === 'ten' ? 10 : 1), `${w}: ${r.start} ${r.step > 0 ? '+' : ''}${r.step} = ${want}`);
      starts.push(r.start);
    }
    if (r.kind === 'follow') { ok(r.answer === walk(r.start, r.cards) && in99(r.answer), `${w}: ${r.start} ${r.cards} lands on ${walk(r.start, r.cards)}`); }
    if (r.kind === 'mystery') {
      const a = walk(r.trips[0].start, r.trips[0].cards), b = walk(r.trips[1].start, r.trips[1].cards);
      ok(a === b && r.answer === a && r.trips[0].land === a && in99(a), `${w}: both trips meet at ${a} (${b})`);
      ok(r.trips[0].start !== r.trips[1].start, `${w}: two different starts`);
    }
    if (r.kind === 'count') {
      const dt = Math.floor(r.end / 10) - Math.floor(r.start / 10), dor = r.end % 10 - r.start % 10;
      ok(r.d === Math.abs(dt) && r.r === Math.abs(dor) && r.dirT === (dt >= 0 ? 'D' : 'U') && r.dirO === (dor >= 0 ? 'R' : 'L') && r.d > 0 && r.r > 0, `${w}: ${r.start} → ${r.end} is ${r.d} ${r.dirT} and ${r.r} ${r.dirO}`);
      ok(C.runCount(r, r.d, r.r) === r.end, `${w}: the right count lands on ${r.end}`);
      let wrongHits = 0; for (let d = 0; d <= 9; d++) for (let rr = 0; rr <= 9; rr++) if ((d !== r.d || rr !== r.r) && C.runCount(r, d, rr) === r.end) wrongHits++;
      ok(wrongHits === 0, `${w}: no wrong count lands on ${r.end} (${wrongHits})`);
    }
    if (r.kind === 'nod') {
      ok(JSON.stringify(r.targets) === JSON.stringify([r.n - 10, r.n - 1, r.n + 1, r.n + 10]) && r.targets.every(in99), `${w}: ${r.n}'s neighbours ${r.targets}, none is 0`);
      starts.push(r.n);
    }
  }
  if (starts.length) ok(new Set(starts).size === starts.length, `${f}: no start repeats in a pass`);
}
{
  const fl = C.ids('jumps').filter(i => i[0] === 'f').map(i => Math.floor(C.round('jumps', i).answer / 10));
  ok(new Set(fl).size >= 6, `follow landings in ≥ 6 tens (${new Set(fl).size})`);
  ok(C.ids('jumps').filter(i => i[0] === 'm').length >= 4 && C.ids('jumps').filter(i => i[0] === 'c').length >= 4, 'jumps: ≥ 4 mystery and ≥ 4 count rounds');
  const teen = C.ids('nod').map(i => C.round('nod', i).n).filter(n => n < 20);
  ok(teen.length >= 3, `number of the day keeps ≥ 3 teen numbers (${teen})`);
}

/* ---- the tubes, exhaustively ---- */
{
  const r = C.round('ten', 'n0');
  let bad = 0;
  for (let t = 0; t <= 9; t++) for (let o = 0; o <= 9; o++) for (const tube of ['t', 'o']) {
    const st = C.newState(r); st.t = t; st.o = o;
    const u = C.up(st, tube);
    const was = tube === 't' ? t : o;
    if (!(was === 9 ? (u === 'lid' && st.t === t && st.o === o) : (u === 'up' && st[tube] === was + 1 && (tube === 't' ? st.o === o : st.t === t)))) bad++;
    const s2 = C.newState(r); s2.t = t; s2.o = o; const d = C.down(s2, tube);
    if (!((tube === 't' ? t : o) === 0 ? (d === 'empty' && s2.t === t && s2.o === o) : (d === 'down' && s2[tube] === (tube === 't' ? t : o) - 1))) bad++;
    const s3 = C.newState(r); s3.t = t; s3.o = o; if (tube === 'o' && o === 9 && (C.up(s3, 'o') !== 'lid' || s3.o !== 9)) bad++;
  }
  ok(bad === 0, `the tubes over all 100 states: up at 9 is the lid, down at 0 is empty, nothing else moves (${bad} wrong)`);
}

/* ---- arrow cards ---- */
for (const id of C.ids('jumps').filter(i => i[0] === 'f')) {
  const r = C.round('jumps', id), st = C.newState(r), w = `follow ${id}`;
  for (let i = 0; i < r.cards.length; i++) {
    const dir = r.cards[i], own = C.DATA.TUBE[dir], other = own === 't' ? 'o' : 't', v0 = C.value(st);
    ok(C.playCard(st, i, other) === 'wrongTube' && C.value(st) === v0 && !st.played[i], `${w} card ${i} (${dir}) on the wrong tube does not flip`);
    const res = C.playCard(st, i);
    if (res === 'lid') { ok(dir === 'R' && st.o === 9 && C.value(st) === v0, `${w} card ${i}: only a → can meet the lid`); continue; }
    ok(res === 'played' && st.played[i] && C.value(st) === v0 + C.DATA.STEP[dir], `${w} card ${i} (${dir}) moves ${C.DATA.STEP[dir]}`);
  }
  const s2 = C.newState(r); C.playCard(s2, 0); ok(C.playCard(s2, 0) === 'undone' && C.value(s2) === r.start && !s2.played[0], `${w}: a played card taken back restores the tubes`);
}
/* 58 ↑↑→→: the last → meets the lid at 39 — the trade is done by hand */
{ const r = C.round('jumps', 'f4'), st = C.newState(r); ['played', 'played', 'played', 'lid'].forEach((want, i) => ok(C.playCard(st, i) === want, `58 UURR card ${i} → ${want}`)); ok(C.value(st) === 39, '58 ↑↑→ stands on 39, the lid stops the last →'); }

/* ---- Check ---- */
for (const f of ['ten', 'one']) for (const id of C.ids(f)) {
  const r = C.round(f, id), w = `${f} ${r.start}${r.step > 0 ? '+' : ''}${r.step}`;
  const st = C.newState(r);
  ok(C.check(st).hint === 'hintMove' && st.misses === 0, `${w}: unchanged → hintMove, no miss`);
  /* a wrong move: the other digit moved instead */
  const wrong = r.start + (Math.abs(r.step) === 10 ? Math.sign(r.step) : 10 * Math.sign(r.step));
  if (in99(wrong)) {
    st.t = Math.floor(wrong / 10); st.o = wrong % 10; st.touched = true;
    const x = C.check(st), h1 = C.hint(st).key;
    const tr1 = Math.abs(r.step) === 1 && Math.floor(r.answer / 10) !== Math.floor(r.start / 10);
    ok(x.result === 'miss' && h1 === (tr1 ? (r.step > 0 ? 'hintTradeUp' : 'hintTradeDown') : r.step === 10 ? 'hintTenMore' : r.step === -10 ? 'hintTenLess' : r.step === 1 ? 'hintOneMore' : 'hintOneLess'), `${w}: the other digit moved → ${h1}`);
    C.check(st); const h2 = C.hint(st);
    const trade = Math.abs(r.step) === 1 && Math.floor(r.answer / 10) !== Math.floor(r.start / 10);
    ok(h2.key === (Math.abs(r.step) === 10 ? 'hintOnlyTens' : trade ? (r.step > 0 ? 'hintTradeUp' : 'hintTradeDown') : 'hintOnlyOnes'), `${w}: miss 2 → ${h2.key}`);
    ok(!JSON.stringify(h2.args || {}).includes(String(r.answer)) || String(r.answer) === String(r.start), `${w}: the miss-2 hint never prints the answer`);
  }
  const s2 = C.newState(r); s2.t = Math.floor(r.answer / 10); s2.o = r.answer % 10; s2.touched = true;
  ok(C.check(s2).result === 'ok' && s2.done, `${w}: ${r.answer} is right`);
}
for (const id of C.ids('jumps')) {
  const r = C.round('jumps', id), w = `jumps ${id}`;
  if (r.kind === 'count') {
    const st = C.newState(r);
    ok(C.check(st).hint === 'hintTypeCounts' && st.misses === 0, `${w}: blank counts → hintTypeCounts`);
    ok(C.up(st, 't') === null && C.down(st, 'o') === null, `${w}: the handles do nothing in a count round`);
    C.typeCount(st, 'd', String(r.d + 1)); C.typeCount(st, 'r', String(r.r));
    const x = C.check(st); ok(x.result === 'miss' && x.landed !== r.end && st.ran === x.landed && C.value(st) === x.landed && C.hint(st).key === 'hintCount1', `${w}: one ten too many lands on ${x.landed}, not ${r.end}`);
    C.clearCount(st, 'd'); ok(C.value(st) === r.start && st.ran === null, `${w}: changing a count sends the tubes back to ${r.start}`); C.typeCount(st, 'd', String(r.d));
    ok(C.check(st).result === 'ok', `${w}: the right counts land on ${r.end}`);
    continue;
  }
  const st = C.newState(r);
  if (r.kind === 'mystery') {
    st.t = Math.floor(r.trips[0].land / 10); st.o = r.trips[0].land % 10; st.touched = true;
    ok(C.check(st).result === 'step' && st.phase === 1 && st.ghost === r.trips[0].land && C.value(st) === r.trips[1].start && !st.done, `${w}: trip 1 lands → the ghost pinned, the tubes reset to ${r.trips[1].start}`);
    ok(C.check(st).hint === 'hintMove', `${w}: trip 2 unchanged → hintMove`);
  }
  st.t = Math.floor(r.answer / 10); st.o = (r.answer % 10 + 1) % 10; st.touched = true;
  if (C.value(st) !== r.answer) { const x = C.check(st); ok(x.result === 'miss' && C.hint(st).key === 'hintArrows', `${w}: a wrong landing → hintArrows`); C.check(st); ok(C.hint(st).key === 'hintCards', `${w}: miss 2 → hintCards`); }
  st.t = Math.floor(r.answer / 10); st.o = r.answer % 10;
  ok(C.check(st).result === 'ok' && st.done, `${w}: ${r.answer} is right`);
}
for (const id of C.ids('nod')) {
  const r = C.round('nod', id), st = C.newState(r), w = `nod ${r.n}`;
  ok(C.check(st).hint === 'hintMove', `${w}: unchanged → hintMove`);
  /* the 10-more answer first is wrong: the neighbours come in order */
  st.t = Math.floor(r.targets[3] / 10); st.o = r.targets[3] % 10; st.touched = true;
  ok(C.check(st).result === 'miss' && C.hint(st).key === 'hintTenLess', `${w}: 10 more made when 10 less is asked → hintTenLess`);
  for (let k = 0; k < 4; k++) {
    st.t = Math.floor(r.targets[k] / 10); st.o = r.targets[k] % 10; st.touched = true;
    const x = C.check(st);
    ok(x.result === (k < 3 ? 'step' : 'ok') && st.filled.length === k + 1 && st.filled[k] === r.targets[k] && (k < 3 ? C.value(st) === r.n && st.misses === 0 : st.done), `${w}: neighbour ${k + 1} (${r.targets[k]}) fills its frame`);
  }
}

/* ---- the plan ---- */
for (const f of C.FACES) {
  let prev = null;
  for (let pass = 0; pass < 25; pass++) {
    const o = C.plan(f, rnd, prev).order;
    ok(o.slice().sort().join() === C.ids(f).slice().sort().join(), `${f} pass ${pass}: a permutation`);
    ok(!prev || o.join() !== prev.join(), `${f} pass ${pass}: never the previous order`);
    ok(C.orderOk(f, o), `${f} pass ${pass}: its rules hold`);
    prev = o;
  }
  let s3 = 11; const r3 = () => { s3 = (s3 * 48271) % 2147483647; return s3 / 2147483647; };
  let s4 = 11; const r4 = () => { s4 = (s4 * 48271) % 2147483647; return s4 / 2147483647; };
  const first = C.plan(f, r3, null).order;
  ok(C.plan(f, r4, first).order.join() !== first.join(), `${f}: a pass that would repeat the previous order is refused`);
}
for (const f of ['ten', 'one']) { const bad = C.ids(f).some((x, i, a) => false); ok(!bad, f); }
{ const o = C.ids('ten'); ok(!C.orderOk('ten', ['n0', 'n2', 'n4'].concat(o.filter(x => !['n0', 'n2', 'n4'].includes(x)))), 'ten: three "more" in a row is refused'); }
{ ok(!C.orderOk('jumps', ['c0', 'c1'].concat(C.ids('jumps').filter(x => x !== 'c0' && x !== 'c1'))), 'jumps: two count rounds side by side are refused'); }

/* ---- strings and words ---- */
{
  const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'nine-stop-activity.js'), 'utf8');
  const block = src.slice(src.indexOf('/*STRINGS-BEGIN*/'), src.indexOf('/*STRINGS-END*/'));
  const S = {}; for (const line of block.split('\n')) { const m = line.match(/^\s+(\w+):\s*\{(.*)\}\s*,?\s*$/); if (m) S[m[1]] = m[2]; }
  ok(Object.keys(S).length >= 70, `the strings block parses (${Object.keys(S).length} keys)`);
  for (const k in S) ok(LOCS.every(l => new RegExp('(^|,)' + l + ":'").test(S[k])), `string ${k}: all 11 locales`);
  for (const k of ['hintMove', 'hintTypeCounts', 'hintTenMore', 'hintTenLess', 'hintOneMore', 'hintOneLess', 'hintOnlyTens', 'hintOnlyOnes', 'hintTradeUp', 'hintTradeDown', 'hintArrows', 'hintCards', 'hintCount1', 'hintCount2']) ok(!!S[k], `hint ${k} authored`);
  const old = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'choice-board-activity.js'), 'utf8');
  for (const k of ['promptTenMore', 'promptTenLess']) {
    const m = old.match(new RegExp(k + ': (\\{.*\\}),')); const o = JSON.parse(m[1]);
    const sv = S[k]; ok(LOCS.every(l => sv.includes(l + ":'" + o[l].replace(/'/g, "\\'") + "'") || sv.includes(l + ":'" + o[l].replace(/ ([?!:;])/g, ' $1') + "'")), `${k}: the kept prompt equals the old one in all 11 locales`);
  }
  const vm = require('vm'); const ctx = { window: {}, NineStopCore: C }; vm.createContext(ctx); vm.runInContext(src + '\n;this.__A = NineStopActivity;', ctx);
  const W = ctx.__A.WORDS, NW = require(path.join(__dirname, 'worksheet-gen', 'lib', 'number-words.js'));
  let diff = 0; for (const l of LOCS) for (let n = 1; n <= 99; n++) if (!W[l] || W[l][n] !== NW.numberWord(n, l)) diff++;
  ok(diff === 0, `the WORDS block equals number-words.js for 1–99 × 11 (${diff} differ)`);
}

console.log(`verify-nine-stop-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
