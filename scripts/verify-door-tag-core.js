#!/usr/bin/env node
/* =====================================================================
   verify-door-tag-core.js — the gate for ACTIVITY #93, THE STRETCHING DOOR
   TAG ("Bo's Berry Pantry — Tens and Ones the Smart Way", 1.NBT.B.2). Its
   OWN oracle: the design's round tables (§6) are re-read here as text and
   split into tens and ones with this file's own arithmetic; nothing
   expected is read off the core.
     · every round as the design; stock / label / stretch numbers have
       tens ≠ ones (decades excepted) and no doubled digit; overflow rounds
       have a full bowl of nine, a spill, ten or more loose and their tens =
       crates + 1; nothing past the range or the deck;
     · stretch racks hold the right pair, BOTH face-value plaques and a
       reversal plaque, never shown right-pair-first;
     · fling / take back: a crate lands on the deck (never the bowl), a
       berry fills the bowl to nine then spills (max 12); a take-back never
       leaves a gap;
     · EVERY build (crates 0..deck, loose 0..21) in every stock round:
       right iff it counts to the number; a right total with a spill is
       PACKED (ten loose → one crate) and counts as right; reversal, face
       value, overflow named; EVERY pair of wheels 0..9 in every label /
       overflow round; EVERY pair of plaques in every stretch round;
     · the crack-count counts a crate as ten, always;
     · the plan: a permutation, never the previous pass, no two neighbours
       with the same number, never three of a type in a row, a real
       reshuffle; the words-mode cards are number-words.js, word for word;
       the pictures are labelled colour library pictures.
   Usage: node scripts/verify-door-tag-core.js   (DT_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.DT_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'door-tag-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };

/* ---- the design's tables, as text ---- */
const DESIGN = {
  '99': 'stock 34 · stock 40 · label 2c 5b · stretch 6c 3b [60 6 3 30] · stock 28 · overflow 1c 13b · label 7c 0b · stretch 8c 5b [80 5 8 50] · stock 13 · overflow 3c 16b · label 5c 8b',
  '50': 'stock 34 · stock 40 · label 2c 5b · stretch 4c 7b [40 7 4 70] · stock 28 · overflow 1c 14b · label 3c 0b · stock 13 · overflow 2c 15b'
};
const CAP = { '50': 50, '99': 99 }, DECK = { '50': 5, '99': 9 };
const parse = (t) => { let m; if ((m = /^stock (\d+)$/.exec(t))) return { type: 'stock', n: +m[1] }; m = /^(\w+) (\d+)c (\d+)b(?: \[([\d ]+)\])?$/.exec(t); const crates = +m[2], berries = +m[3]; return { type: m[1], crates, berries, n: 10 * crates + berries, rack: m[4] ? m[4].split(' ').map(Number) : null }; };
const split = (n) => ({ t: Math.floor(n / 10), o: n % 10 });

for (const rg of ['50', '99']) {
  const D = DESIGN[rg].split(' · ').map(parse), types = {};
  ok(C.ids(rg).join() === D.map((_, i) => i).join(), `${rg}: ${D.length} rounds`);
  D.forEach((d, i) => {
    const r = C.round(rg, i), w = `${rg} #${i} ${d.type} ${d.n}`, s = split(d.n);
    types[d.type] = (types[d.type] || 0) + 1;
    ok(r.type === d.type && r.n === d.n && r.t === s.t && r.o === s.o, `${w}: the number ${d.n} = ${s.t} tens + ${s.o} ones (core ${r.n})`);
    ok(d.n >= 1 && d.n <= CAP[rg] && s.t >= 1 && s.t <= DECK[rg], `${w}: inside the range, never 0, tens fit the deck`);
    if (d.type !== 'overflow') ok(s.o === 0 || s.t !== s.o, `${w}: tens ≠ ones (a reversal is a different number)`);
    if (d.type === 'overflow') {
      const bowl = Math.min(9, d.berries), lip = d.berries - bowl;
      ok(r.given.deck === d.crates && r.given.bowl === 9 && r.given.lip === lip && lip >= 1 && d.berries >= 10 && s.t === d.crates + 1, `${w}: ${d.crates} crates, a full bowl, ${lip} spilled — the right tens are crates + 1`);
    } else if (d.type !== 'stock') ok(r.given.deck === d.crates && r.given.bowl === d.berries && r.given.lip === 0 && d.berries <= 9, `${w}: the shelf comes stocked ${d.crates} + ${d.berries}`);
    if (d.type === 'stretch') {
      ok(JSON.stringify(r.rack) === JSON.stringify(d.rack), `${w}: the rack ${d.rack}`);
      ok(d.rack.includes(10 * s.t) && d.rack.includes(s.o) && d.rack.includes(s.t) && d.rack.includes(10 * s.o), `${w}: the rack holds the right pair, both face values and a reversal`);
      let s1 = 3 + i; const r1 = () => (s1 = (s1 * 16807) % 2147483647) / 2147483647, seen = new Set();
      for (let k = 0; k < 300; k++) { const o = C.rackOrder(r, r1); seen.add(o.join()); if (o.slice().sort((a, b) => a - b).join() !== d.rack.slice().sort((a, b) => a - b).join() || (o[0] === 10 * s.t && o[1] === s.o)) { ok(false, `${w}: the rack is a shuffle, never right pair first`); break; } }
      ok(seen.size >= 6, `${w}: the rack really shuffles (${seen.size})`);
      /* every pair of plaques */
      for (const L of d.rack) for (const R of d.rack) {
        if (L === R) continue;
        const st = C.newState(r); C.hang(st, 'left', L); C.hang(st, 'right', R); const a = C.check(st), right = L === 10 * s.t && R === s.o;
        ok((a.result === 'ok') === right, `${w}: ${L} + ${R} → ${right ? 'right' : 'wrong'}`);
        if (!right) ok(a.kind === (L === s.t ? 'face' : (L === 10 * s.o || R === s.t) ? 'reverse' : 'crateTen'), `${w}: ${L} + ${R} → ${a.kind}`);
      }
      const st0 = C.newState(r); C.hang(st0, 'left', 10 * s.t); ok(C.check(st0).result === 'none' && C.hint(st0).key === 'hintHooks' && st0.misses === 0, `${w}: one hook empty → hintHooks, no miss`);
    }
    if (d.type === 'label' || d.type === 'overflow') {
      for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
        const st = C.newState(r); for (let k = 0; k < a; k++) C.turn(st, 't', 1); for (let k = 0; k < b; k++) C.turn(st, 'o', 1);
        if (st.wheels.t !== a || st.wheels.o !== b) { ok(false, `${w}: wheels ${a}·${b} reachable`); continue; }
        const res = C.check(st);
        if (a === 0 && b === 0) { ok(res.result === 'none' && C.hint(st).key === 'hintWheels' && st.misses === 0, `${w}: wheels 0·0 → hintWheels`); continue; }
        const right = 10 * a + b === d.n; ok((res.result === 'ok') === right, `${w}: wheels ${a}·${b} → ${right ? 'right' : 'wrong'}`);
        if (right && d.type === 'overflow') ok(st.packed && st.shelf.deck === s.t && st.shelf.bowl + st.shelf.lip === s.o && st.shelf.lip === 0, `${w}: written right → Bo packs ten into a crate: ${s.t} crates + ${s.o}`);
        if (right && d.type === 'label') ok(!st.packed, `${w}: a label round packs nothing`);
        if (!right) { const want = (a === s.o && b === s.t && s.o !== s.t) ? 'reverse' : (10 * a + b === d.crates + d.berries) ? 'crateAsOne' : d.type === 'overflow' ? 'overflow' : 'crateTen'; ok(res.kind === want, `${w}: wheels ${a}·${b} → ${want} (core ${res.kind})`); }
      }
      const sw = C.newState(r); ok(!C.turn(sw, 'o', -1) && (() => { for (let k = 0; k < 9; k++) C.turn(sw, 'o', 1); return !C.turn(sw, 'o', 1) && sw.wheels.o === 9; })(), `${w}: the ones wheel runs 0..9 and stops — there is no 13 to write`);
      const sf = C.newState(r); ok(C.fling(sf, 'crate') == null && !C.takeBack(sf), `${w}: a stocked shelf takes no fling`);
    }
    if (d.type === 'stock') {
      /* every build */
      for (let c = 0; c <= DECK[rg]; c++) for (let b = 0; b <= 21; b++) {
        const st = C.newState(r); for (let k = 0; k < c; k++) C.fling(st, 'crate'); for (let k = 0; k < b; k++) C.fling(st, 'berry');
        const sh = st.shelf; ok(sh.deck === c && sh.bowl === Math.min(9, b) && sh.lip === Math.min(12, Math.max(0, b - 9)), `${w}: ${c} crates + ${b} berries land deck ${c}, bowl ${Math.min(9, b)}, lip ${Math.min(12, Math.max(0, b - 9))}`);
        const loose = Math.min(9, b) + Math.min(12, Math.max(0, b - 9)), val = 10 * c + loose, res = C.check(st);
        if (val === 0) { ok(res.result === 'none' && C.hint(st).key === 'hintEmpty', `${w}: an empty shelf → hintEmpty`); continue; }
        ok((res.result === 'ok') === (val === d.n), `${w}: ${c} crates + ${loose} loose = ${val} → ${val === d.n ? 'right' : 'wrong'}`);
        if (val === d.n) { ok(st.shelf.deck === s.t && st.shelf.bowl + st.shelf.lip === s.o && st.packed === (loose > 9), `${w}: ${c} + ${loose}: ${loose > 9 ? 'packed into ' + s.t + ' crates and ' + s.o : 'already canonical'}`); continue; }
        const want = (s.o !== s.t && c === s.o && loose === s.t) ? 'reverse' : (c === 0 && loose === s.t) ? 'face' : loose >= 10 ? 'overflow' : 'crateTen';
        ok(res.kind === want, `${w}: ${c} + ${loose} → ${want} (core ${res.kind})`);
        if (want === 'face') ok(C.hint(st).key === 'hintFace' && C.hint(st).args.t0 === 10 * s.t, `${w}: face value → "the ${s.t} in ${d.n} means ${10 * s.t}"`);
        const cmp = C.compare(st); ok(cmp.extraCrates === Math.max(0, c - s.t) && cmp.missingCrates === Math.max(0, s.t - c), `${w}: ${c} crates against ${s.t}: ${cmp.extraCrates} too many, ${cmp.missingCrates} missing`);
      }
      const cap = C.newState(r); for (let k = 0; k < 20; k++) C.fling(cap, 'crate'); for (let k = 0; k < 40; k++) C.fling(cap, 'berry');
      ok(cap.shelf.deck === DECK[rg] && cap.shelf.bowl === 9 && cap.shelf.lip === 12, `${w}: the deck stops at ${DECK[rg]}, the bowl at 9, the lip at 12`);
      const tb = C.newState(r); C.fling(tb, 'crate'); C.fling(tb, 'berry'); C.fling(tb, 'crate'); for (let k = 0; k < 10; k++) C.fling(tb, 'berry');
      ok(C.takeBack(tb) && tb.shelf.lip === 1 && C.takeBack(tb, 'crate') && tb.shelf.deck === 1 && C.takeBack(tb) && tb.shelf.lip === 0 && tb.shelf.bowl === 9, `${w}: take-back: the last berry from the lip first, a crate on request, never a gap`);
      const tw = C.newState(r); for (let k = 0; k < s.o; k++) C.fling(tw, 'crate'); for (let k = 0; k < s.t; k++) C.fling(tw, 'berry');
      if (s.o !== s.t && s.o >= 1 && s.o <= DECK[rg]) { C.check(tw); const h1 = C.hint(tw); C.check(tw); ok(h1.key === 'hintReverse' && C.hint(tw).key === 'hintStrong' && tw.show === 2, `${w}: reversal → hintReverse, miss 2 hintStrong`); C.fling(tw, 'berry'); ok(tw.show === 0 && tw.last == null, `${w}: a new fling clears the showing`); }
    }
  });
  ok(types.stock >= 4 && types.label >= 2 && types.overflow >= 2 && types.stretch >= 1, `${rg}: every round type (${JSON.stringify(types)})`);
  /* the plan */
  let s2 = 11; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647; let pv = null;
  for (let k = 0; k < 2000; k++) {
    const o = C.plan(rg, r2, pv).order;
    if (o.slice().sort((a, b) => a - b).join() !== C.ids(rg).join() || (pv && pv.join() === o.join())) { ok(false, `${rg} plan #${k}: a new permutation`); break; }
    for (let q = 1; q < o.length; q++) { if (D[o[q]].n === D[o[q - 1]].n) { ok(false, `${rg} plan #${k}: the same number twice in a row`); break; } if (q >= 2 && D[o[q]].type === D[o[q - 1]].type && D[o[q]].type === D[o[q - 2]].type) { ok(false, `${rg} plan #${k}: three ${D[o[q]].type} rounds in a row`); break; } }
    pv = o;
  }
  const orders = new Set(); let s3 = 5; const r3 = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647;
  for (let k = 0; k < 200; k++) orders.add(C.plan(rg, r3, null).order.join());
  ok(orders.size > 100, `${rg}: the plan really reshuffles (${orders.size}/200)`);
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let q = sd; return () => (q = (q * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(rg, mk(), null).order; ok(C.plan(rg, mk(), o1).order.join() !== o1.join(), `${rg} seed ${sd}: handed its own order, the plan gives another`); }
  ok(new Set(C.ids(rg).map(i => C.round(rg, i).berry)).size === 4, `${rg}: the berry kind rotates through four`);
}
/* ---- the crack-count ---- */
for (let c = 0; c <= 9; c++) for (let b = 0; b <= 12; b++) { const ev = C.countRun({ deck: c, bowl: Math.min(9, b), lip: Math.max(0, b - 9) }); ok(ev.length === c + b && (c === 0 || ev[c - 1].count === 10 * c) && (ev.length === 0 || ev[ev.length - 1].count === 10 * c + b) && ev.slice(0, c).every((e, k) => e.kind === 'crate' && e.count === 10 * (k + 1)), `the crack-count: ${c} crates + ${b} berries counts by tens then ones`); }
/* ---- the words-mode cards = number-words.js ---- */
const W = require(path.join(__dirname, 'worksheet-gen', 'lib', 'number-words.js'));
const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'door-tag-activity.js'), 'utf8');
const WB = eval('({' + src.slice(src.indexOf('/*WORDS-BEGIN*/') + 15, src.indexOf('/*WORDS-END*/')).replace(/^WORDS:\s*\{/, '').replace(/\},\s*$/, '') + '})');
const stockNs = new Set(); for (const rg of C.RANGES) for (const i of C.ids(rg)) { const r = C.round(rg, i); if (r.type === 'stock') stockNs.add(r.n); }
for (const n of stockNs) for (const l of C.LOCALES) ok(WB[n] && WB[n][l] === W.numberWord(n, l), `the ${l} card for ${n} is number-words.js "${W.numberWord(n, l)}" (got "${WB[n] && WB[n][l]}")`);
ok(WB[34] && WB[34].no === 'trettifire' && WB[34].de === 'vierunddreißig' && WB[34].da === 'fireogtredive', 'the ones-first and Norwegian school forms are the SoT forms');
/* ---- the pictures ---- */
const pic = (dir, key) => { const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir.replace(/ /g, '-') + '.json'), 'utf8')); return !!(j.nouns && j.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')) && !/bw(\s+\d+)?$/i.test(dir); };
ok(pic(C.DATA.BO[0], C.DATA.BO[1]) && C.DATA.BO[1] === 'rabbit', 'Bo is forest creatures/rabbit, a labelled colour picture');
C.DATA.BERRIES.forEach(b => ok(pic('fruits', b) && /^#[0-9A-F]{6}$/i.test(C.DATA.BEAD[b]), `the berry fruits/${b} is a labelled colour picture with a bead colour`));
ok(C.DATA.BERRIES.indexOf('cherry') < 0, 'no cherry (drawn as an apple)');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.rangeOf('x') === '99' && C.cardOf('x') === 'num', 'locales + defaults');
console.log(`verify-door-tag-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
