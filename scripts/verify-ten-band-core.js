#!/usr/bin/env node
/* =====================================================================
   verify-ten-band-core.js — the gate for ACTIVITY #94, THE TEN-POCKET BAND
   ("Bundle Bot — Make a Ten from Ten Ones", 1.NBT.B.2.a). Its OWN oracle:
   the design's round tables (§6) are re-read here as text and solved with
   this file's own arithmetic; nothing expected is read off the core.
     · every round as the design; targets never have equal digits; a build
       target's ones digit is 0 only in decades and 9 only in the impostor
       round; the impostor starts with exactly nine loose; the overfill clumps
       overshoot ten; read answers alternate canonical / non-canonical;
       ≥ 7 rounds per range;
     · the band: a pull with fewer than ten NEVER makes a ten (it springs
       open, nothing moves); with ten or more it takes EXACTLY ten and puts
       the extras back; a full rack is stiff; a snip gives exactly ten loose
       cubes and never changes the number; cubes never share a cell, at any
       count up to 50;
     · every build round reached by the hopper + the lever: right iff the
       count is the target AND fewer than ten lie loose (ten hiding is a
       miss); too many / too few tens and ones named; the unbundle round is
       right only after one snip; read: every typed number; tens: every
       slot pair, and the slots right but ten hiding is still a miss;
     · the plan: a permutation, never the previous pass, never two of a
       type side by side, a real reshuffle; Bolt is toys/robot.
   Usage: node scripts/verify-ten-band-core.js   (TB_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.TB_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'ten-band-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

/* ---- the design's tables, as text: type target rack·plate clumps ---- */
const DESIGN = {
  '49': 'build 23 0·0 123 · build 34 0·0 123 · unbundle 32 3·2 - 12 · impostor 29 1·9 123 · decade 40 0·0 123 · read 24 2·4 - · overfill 36 0·0 3 · build 45 0·0 123 · build 27 0·0 123 · tens 37 0·37 - · read 25 1·15 -',
  '99': 'build 58 0·0 123 · build 63 0·0 123 · decade 70 0·0 123 · unbundle 51 5·1 - 11 · impostor 79 6·9 123 · read 75 7·5 - · overfill 47 0·0 3 · tens 46 0·46 - · read 64 5·14 - · build 81 0·0 123'
};
const CAPS = { '49': 4, '99': 9 };
const parse = (t) => { const m = /^(\w+) (\d+) (\d+)·(\d+) (\S+)(?: (\d+))?$/.exec(t); return { type: m[1], n: +m[2], rack: +m[3], plate: +m[4], clumps: m[5] === '-' ? [] : m[5].split('').map(Number), extra: m[6] ? +m[6] : 0 }; };
const build = (st, rack, loose) => { /* reach rack·loose with the hopper, take-out and the lever only */
  let guard = 0;
  while (st.rack < rack && guard++ < 200) { while (st.plate.length < 10 && C.hopper(st)) {} if (st.plate.length >= 10) C.pull(st); else break; }
  while (st.plate.length < loose && guard++ < 400) { if (!C.hopper(st)) break; }
  while (st.plate.length > loose) C.takeOut(st);
};

for (const rg of ['49', '99']) {
  const D = DESIGN[rg].split(' · ').map(parse), cap = CAPS[rg];
  ok(C.ids(rg).length === D.length && D.length >= 7, `${rg}: ${D.length} rounds (≥ 7)`);
  const reads = [];
  D.forEach((d, i) => {
    const r = C.round(rg, i), w = `${rg} #${i} ${d.type} ${d.n}`, t = Math.floor(d.n / 10), o = d.n % 10;
    ok(r.type === d.type && r.n === d.n && r.t === t && r.o === o && r.startRack === d.rack && r.startPlate === d.plate && JSON.stringify(r.clumps) === JSON.stringify(d.clumps) && r.cap === cap, `${w}: as the design`);
    ok(t !== o && d.n >= 1 && d.n <= (rg === '49' ? 49 : 99), `${w}: digits differ, inside the range`);
    if (['build', 'overfill'].includes(d.type)) ok(o !== 0 && o !== 9, `${w}: a build's ones digit is never 0 or 9`);
    if (d.type === 'decade') ok(o === 0, `${w}: a decade`);
    if (d.type === 'impostor') ok(o === 9 && d.plate === 9 && r.clumps.length > 0, `${w}: the impostor starts with nine loose and needs one more`);
    if (d.type === 'overfill') { let s = 0, over = false; for (let k = 0; k < 6; k++) { s += d.clumps[k % d.clumps.length]; if (s > 10 && s - d.clumps[k % d.clumps.length] < 10) over = true; } ok(over || d.clumps.every(c => 10 % c !== 0), `${w}: the clumps of ${d.clumps} overshoot ten`); }
    if (d.type === 'read') { ok(d.rack * 10 + d.plate === d.n, `${w}: the shelf shows ${d.n}`); reads.push(d.plate >= 10); }
    if (d.type === 'tens') ok(d.rack === 0 && d.plate === d.n, `${w}: every cube on the plate`);
    if (d.type === 'unbundle') ok(d.rack * 10 + d.plate === d.n && d.extra === d.plate + 10, `${w}: needs ${d.extra} loose = ${d.plate} + 10`);
    /* the starting machine */
    const st = C.newState(r, rnd);
    ok(st.rack === d.rack && st.plate.length === d.plate && new Set(st.plate.map(c => c.c)).size === d.plate, `${w}: starts ${d.rack} tens · ${d.plate} loose, no two cubes in one cell`);
    if (d.type === 'impostor') { const cells = st.plate.map(c => c.c).sort((a, b) => a - b); ok(cells.join() === '2,3,4,5,6,12,13,15,16', `${w}: the near-ten scatter (two rows of five, one missing)`); }
    /* the right end state, reached by the machine */
    if (['build', 'decade', 'impostor', 'overfill'].includes(d.type)) {
      const s1 = C.newState(r, rnd); ok(C.check(s1).result === (d.rack + d.plate === 0 ? 'none' : 'miss'), `${w}: the untouched machine`); if (d.rack + d.plate === 0) ok(C.hint(s1).key === 'hintStart' && s1.misses === 0, `${w}: → hintStart, no miss`);
      const s2 = C.newState(r, rnd); build(s2, t, o); ok(s2.rack === t && s2.plate.length === o, `${w}: the hopper and the lever reach ${t} tens · ${o} loose`);
      ok(C.check(s2).result === 'ok', `${w}: ${t} · ${o} → right`);
      /* ten hiding: the same number with a ten left loose */
      if (t >= 1 && o + 10 <= 49) { const s3 = C.newState(r, rnd); build(s3, t - 1, o + 10); if (s3.rack === t - 1 && s3.plate.length === o + 10) { const a = C.check(s3); ok(a.result === 'miss' && a.kind === 'tenHiding' && C.hint(s3).key === 'hintHiding', `${w}: ${t - 1} tens · ${o + 10} loose → ten hiding (not right)`); } }
      /* every other end state with fewer than ten loose */
      for (let rk = 0; rk <= cap; rk++) for (let lo = 0; lo <= 9; lo++) {
        if (rk === t && lo === o) continue; const s4 = C.newState(r, rnd); build(s4, rk, lo); if (s4.rack !== rk || s4.plate.length !== lo) continue;
        const a = C.check(s4); if (a.result === 'none') continue;
        const want = rk > t ? 'tooManyTens' : rk < t ? 'tooFewTens' : 'onesWrong';
        ok(a.result === 'miss' && a.kind === want, `${w}: ${rk} · ${lo} → ${want} (core ${a.kind})`);
      }
    }
    if (d.type === 'unbundle') {
      const s5 = C.newState(r, rnd); const a0 = C.check(s5); ok(a0.result === 'miss' && C.hint(s5).key === 'hintSnip', `${w}: the untouched start → hintSnip`);
      ok(C.hopper(s5) == null && !C.takeOut(s5), `${w}: no hopper and no take-out (the number is given)`);
      const s6 = C.newState(r, rnd); const before = C.value(s6); C.snip(s6);
      ok(C.value(s6) === before && s6.rack === d.rack - 1 && s6.plate.length === d.plate + 10, `${w}: one snip → ${d.rack - 1} · ${d.plate + 10}, the number unchanged`);
      ok(C.check(s6).result === 'ok', `${w}: → right`);
      const s7 = C.newState(r, rnd); C.snip(s7); C.snip(s7); ok(C.check(s7).result === 'miss', `${w}: two snips → not what Bolt asked for`);
    }
    if (d.type === 'read') {
      for (let n = 1; n <= 99; n++) { const s8 = C.newState(r, rnd); String(n).split('').forEach(ch => C.type(s8, ch)); const a = C.check(s8); ok((a.result === 'ok') === (n === d.n), `${w}: typed ${n} → ${n === d.n ? 'right' : 'wrong'}`); if (n !== d.n) ok(C.hint(s8).key === 'hintTensByTens', `${w}: typed ${n} → hintTensByTens`); }
      const s9 = C.newState(r, rnd); ok(C.check(s9).result === 'none' && C.hint(s9).key === 'hintType', `${w}: nothing typed → hintType`);
      ok(!C.type(s9, '0') && C.type(s9, '1') && C.type(s9, '2') && !C.type(s9, '3') && C.del(s9) && s9.typed === '1', `${w}: no leading 0, two digits, delete`);
    }
    if (d.type === 'tens') {
      const sa = C.newState(r, rnd); ok(C.check(sa).result === 'none' && C.hint(sa).key === 'hintSlots', `${w}: empty slots → hintSlots`);
      for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
        const sb = C.newState(r, rnd); while (sb.plate.length >= 10) C.pull(sb); C.setSlot(sb, 't', a); C.setSlot(sb, 'o', b);
        const res = C.check(sb), right = a === t && b === o; ok((res.result === 'ok') === right, `${w}: bundled, slots ${a}·${b} → ${right ? 'right' : 'wrong'}`);
      }
      const sc = C.newState(r, rnd); C.setSlot(sc, 't', t); C.setSlot(sc, 'o', o); const ac = C.check(sc); ok(ac.result === 'miss' && ac.kind === 'tenHiding', `${w}: the right slots with the tens still loose → ten hiding`);
    }
  });
  ok(reads.length >= 2 && reads.some(x => x) && reads.some(x => !x), `${rg}: read rounds include canonical and non-canonical shelves`);
  /* ---- the band ---- */
  const r0 = C.round(rg, 0);
  for (let n = 0; n <= 30; n++) {
    const st = C.newState(r0, rnd); while (st.plate.length < n) C.hopper(st); while (st.plate.length > n) C.takeOut(st);
    const cells = st.plate.map(c => c.c), res = C.pull(st);
    if (n < 10) ok(res.result === 'spring' && res.filled === n && res.empty === 10 - n && st.rack === 0 && st.plate.length === n && st.plate.map(c => c.c).join() === cells.join(), `${rg} band ${n}: springs open, ${10 - n} empty pockets, nothing moves`);
    else ok(res.result === 'clunk' && res.squeezed === n - 10 && st.rack === 1 && st.plate.length === n - 10 && res.taken.length === 10, `${rg} band ${n}: takes exactly ten, ${n - 10} squeezed back`);
  }
  const full = C.newState(r0, rnd); full.rack = cap; for (let k = 0; k < 12; k++) C.hopper(full); const before = full.plate.length;
  ok(C.pull(full).result === 'stiff' && full.rack === cap && full.plate.length === before, `${rg}: a full rack (${cap}) makes the lever stiff`);
  for (let rk = 1; rk <= cap; rk++) { const s = C.newState(r0, rnd); s.rack = rk; for (let k = 0; k < 3; k++) C.hopper(s); const v0 = C.value(s), p0 = s.plate.length; C.snip(s); ok(C.value(s) === v0 && s.rack === rk - 1 && s.plate.length === p0 + 10, `${rg} snip at ${rk} tens: ten loose cubes, the number unchanged`); }
  /* the scatter never doubles up a cell */
  for (let n = 1; n <= 50; n++) { const p = C.scatter(n, rnd); ok(p.length === n && new Set(p.map(c => c.c)).size === n && p.every(c => c.c >= 0 && c.c < C.COLS * C.ROWS && Math.abs(c.jx) < 0.5 && Math.abs(c.jy) < 0.5), `scatter ${n}: one cube per cell, inside its cell`); }
  /* ---- the plan ---- */
  let s2 = 11; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647; let pv = null;
  for (let k = 0; k < 2000; k++) {
    const o = C.plan(rg, r2, pv).order;
    if (o.slice().sort((a, b) => a - b).join() !== C.ids(rg).join() || (pv && pv.join() === o.join())) { ok(false, `${rg} plan #${k}: a new permutation`); break; }
    for (let q = 1; q < o.length; q++) if (D[o[q]].type === D[o[q - 1]].type) { ok(false, `${rg} plan #${k}: two ${D[o[q]].type} rounds side by side`); break; }
    pv = o;
  }
  const orders = new Set(); let s3 = 5; const r3 = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647;
  for (let k = 0; k < 200; k++) orders.add(C.plan(rg, r3, null).order.join());
  ok(orders.size > 100, `${rg}: the plan really reshuffles (${orders.size}/200)`);
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let q = sd; return () => (q = (q * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(rg, mk(), null).order; ok(C.plan(rg, mk(), o1).order.join() !== o1.join(), `${rg} seed ${sd}: handed its own order, the plan gives another`); }
}
/* ---- the hint after two misses; a move clears it ---- */
{ const r = C.round('49', 0), st = C.newState(r, rnd); build(st, 2, 4); C.check(st); const h1 = C.hint(st); C.check(st); ok(h1.key === 'hintCount' && C.hint(st).key === 'hintStrong' && st.show === 2, 'miss 1 hintCount, miss 2 hintStrong'); C.takeOut(st); ok(st.show === 0 && st.last == null, 'a take-out clears the showing'); }
{ const r = C.round('49', 3), st = C.newState(r, rnd); C.pull(st); C.check(st); ok(C.hint(st).key === 'hintImpostor', 'the impostor round: miss 1 asks "is that really ten?"'); }
/* ---- Bolt ---- */
const pj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', 'toys.json'), 'utf8'));
ok(C.DATA.BOT[0] === 'toys' && C.DATA.BOT[1] === 'robot' && !!(pj.nouns && pj.nouns.robot) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', 'toys', 'robot@2x.webp')), 'Bolt is toys/robot, a labelled colour picture');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.rangeOf('x') === '49' && C.gapsOf('x') === 'show', 'locales + defaults');

/* the review's rules: a read round reads the board as it is (no lever, no snip); snipping too many is a ten to bundle back, not 'snip one'; every hint key the core can return is authored */
for (const rg of C.RANGES) for (const id of C.ids(rg)) { const r = C.round(rg, id); if (r.type !== 'read') continue;
  const st = C.newState(r, rnd), v0 = C.value(st), k0 = st.rack; ok(C.pull(st) === null && C.snip(st) === null && C.value(st) === v0 && st.rack === k0, rg + '#' + id + ': a read round refuses the lever and the snip'); }
for (const rg of C.RANGES) for (const id of C.ids(rg)) { const r = C.round(rg, id); if (r.type !== 'unbundle') continue;
  const st = C.newState(r, rnd); C.snip(st); C.snip(st); const res = C.check(st); ok(res.result === 'miss' && res.kind === 'tenHiding' && C.hint(st).key === 'hintHiding', rg + '#' + id + ': two snips → bundle one back (hintHiding), not hintSnip');
  const s1 = C.newState(r, rnd); C.check(s1); ok(C.hint(s1).key === 'hintSnip', rg + '#' + id + ': no snip yet → hintSnip'); }
{ const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'ten-band-activity.js'), 'utf8'), seen = new Set();
  for (const rg of C.RANGES) for (const id of C.ids(rg)) for (let m = 0; m < 3; m++) { const st = C.newState(C.round(rg, id), rnd); for (let k = 0; k <= m; k++) C.check(st); const h = C.hint(st); if (h) seen.add(h.key); }
  for (const k of ['hintStart','hintType','hintSlots','hintHiding','hintCount','hintImpostor','hintSnip','hintTensByTens','hintStrong']) seen.add(k);
  const authored = new Set((src.match(/^\s+(\w+):\s*\{en:/gm) || []).map(l => l.trim().split(':')[0]));
  ok(authored.size >= 30, 'the strings block parses (' + authored.size + ' keys)');
  for (const k of seen) ok(authored.has(k), 'hint key ' + k + ' is authored in the strings'); }
console.log(`verify-ten-band-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
