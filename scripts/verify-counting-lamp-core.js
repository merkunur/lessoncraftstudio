#!/usr/bin/env node
/* =====================================================================
   verify-counting-lamp-core.js — the gate for ACTIVITY #92, THE COUNTING
   LAMP ("Whistle Valley — Number-Line Track Repair", 1.NBT.A.1). Its OWN
   oracle: the design's round tables (§6, with the build's to-50 rulings)
   are re-read here as text and solved with this file's own arithmetic;
   nothing expected is read off the core.
     · hops: a ± k inside the stretch, the STOP tie never the centre and
       never the start, 4 left / 4 right of centre per level, never 0;
     · find the spot: every target on exactly one blank tie, the arrowed
       tie never a target, the distractor on no blank tie (ties) / outside
       the rail (open rail), ε as the old rounds, every to-50 number ≤ 50;
     · mileposts: one constant step, ≥ 2 printed posts that show it, the
       distractors break it;
     · EVERY plate on EVERY seat: right iff it is the tie's number; the lamp
       counts from the station and stops at the FIRST plate it disagrees
       with; the hop lands at a ± k (never a ± k ∓ 1); the open rail
       accepts within ε only; a typed number is read as itself (1007 is
       not 107); the hints; a move clears the showing;
     · the plan: a permutation, never the previous pass, neighbours never
       share a right tie / STOP tie, a real reshuffle; the tray never in
       numeric order; the engine is a labelled colour picture.
   Usage: node scripts/verify-counting-lamp-core.js   (LM_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.LM_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'counting-lamp-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };

/* ---- the design's tables, as text ---- */
const HOPS = {
  '120': '46-56 47+3 · 20-30 25-3 · 35-45 38+4 · 10-20 16-5 · 95-105 98+4 · 60-70 63+5 · 35-45 41-4 · 110-120 112+6',
  '50': '16-26 17+3 · 20-30 25-3 · 35-45 38+4 · 10-20 16-5 · 25-35 28+3 · 30-40 33+5 · 35-45 41-4 · 34-44 36+6'
};
const SPOTS = {
  '120': '1-11 bolt 8 4 x13 · 10-20 bolt 13 18 x21 · 20-30 bolt 26 name 22 x32 · 40-50 bolt 47 43 x54 · 30-40 bolt 38 name 34 x48 · 50-60 bolt 51 59 x61 · 90-100 bolt 99 95 x109 · 100-110 bolt 103 name 107 x113 · open 10-30 bolt 20 15 x35 e1.4 · open 40-80 bolt 60 50 x90 e2.6',
  '50': '1-11 bolt 8 4 x13 · 10-20 bolt 13 18 x21 · 20-30 bolt 26 name 22 x32 · 40-50 bolt 47 43 x36 · 30-40 bolt 38 name 34 x48 · 5-15 bolt 6 14 x17 · 25-35 bolt 30 28 x37 · 35-45 bolt 42 name 39 x47 · open 10-30 bolt 20 15 x35 e1.4 · open 20-40 bolt 30 25 x45 e1.4'
};
const POSTS = {
  '120': '5 _ _ _ 25 30 x13 18 · 40 _ _ 70 80 90 x45 55 · 12 14 _ 18 _ 22 x15 19 · 90 80 _ 60 _ 40 x75 65 · 60 70 _ 90 _ 110 x85 95 · 70 75 _ 85 _ 95 x82 88 · 118 116 _ 112 _ 108 x113 111 · 45 40 _ 30 _ 20 x36 24',
  '50': '5 _ _ _ 25 30 x13 18 · 20 _ _ 35 40 45 x28 33 · 12 14 _ 18 _ 22 x15 19 · 30 28 _ 24 _ 20 x25 21 · 10 15 _ 25 _ 35 x22 28 · 2 4 _ 8 _ 12 x7 11 · 48 46 _ 42 _ 38 x43 41 · 45 40 _ 30 _ 20 x36 24'
};
const rows = (s) => s.split(' · ');

for (const lv of ['50', '120']) {
  const cap = lv === '50' ? 50 : 120;   /* every number a child meets ≤ the setting's range (to 120 means to 120 — reviewer 2026-10-24) */
  /* ---------------- hops ---------------- */
  const H = rows(HOPS[lv]).map(t => { const m = /^(\d+)-(\d+) (\d+)([+-])(\d+)$/.exec(t); return { from: +m[1], to: +m[2], a: +m[3], dir: m[4] === '+' ? 1 : -1, k: +m[5] }; });
  ok(C.ids(lv, 'hops').length === H.length, `${lv} hops: ${H.length} rounds`);
  let left = 0, right = 0;
  H.forEach((d, i) => {
    const r = C.round(lv, 'hops', i), w = `${lv} hops #${i} ${d.a}${d.dir > 0 ? '+' : '−'}${d.k}`, land = d.a + d.dir * d.k, landTie = land - d.from;
    ok(d.to - d.from === 10 && r.from === d.from && C.tieValue(r, 0) === d.from && C.tieValue(r, 10) === d.to, `${w}: the stretch ${d.from}–${d.to}`);
    ok(r.hop.startValue === d.a && r.hop.k === d.k && r.hop.dir === d.dir && r.hop.landValue === land && r.hop.land === landTie, `${w}: lands on ${land} (tie ${landTie})`);
    ok(landTie > 0 && landTie < 10 && landTie !== 5 && land >= 1 && d.from >= 1 && d.to <= cap, `${w}: the STOP tie inside, never the centre, numbers ≤ ${cap}`);
    ok(r.printed.slice().sort((x, y) => x - y).join() === [0, d.a - d.from, 10].sort((x, y) => x - y).join(), `${w}: printed at both ends and the start`);
    if (landTie < 5) left++; else right++;
    /* every tie as the flag */
    for (let t = 0; t <= 10; t++) {
      const st = C.newState(r), planted = C.plant(st, t);
      ok(planted === (t !== d.a - d.from), `${w} flag ${t}: plantable unless the start tie`);
      if (!planted) continue;
      const a = C.check(st);
      ok((a.result === 'ok') === (t === landTie), `${w} flag on tie ${t}: right iff tie ${landTie}`);
      if (a.result !== 'ok') { ok(C.hint(st).key === 'hintHop', `${w} flag ${t}: hintHop`); const want = []; for (let h = 1; h <= d.k; h++) want.push(d.a - d.from + d.dir * h); ok(a.run.counted.join() === want.join() && a.run.stop === landTie, `${w}: one puff per hop, ${want.join(',')}`); }
    }
    const st0 = C.newState(r); ok(C.check(st0).result === 'none' && C.hint(st0).key === 'hintFlag' && st0.misses === 0, `${w}: no flag → hintFlag, no miss`);
  });
  ok(left === 4 && right === 4, `${lv} hops: STOP ties 4 left / 4 right (${left}/${right})`);
  /* ---------------- find the spot ---------------- */
  const S = rows(SPOTS[lv]).map(t => {
    let m = /^open (\d+)-(\d+) bolt (\d+) (\d+) x(\d+) e([\d.]+)$/.exec(t);
    if (m) return { open: [+m[1], +m[2]], plates: [+m[3], +m[4]], dist: +m[5], eps: +m[6] };
    m = /^(\d+)-(\d+) bolt (\d+)(?: (\d+))?(?: name (\d+))? x(\d+)$/.exec(t);
    return { from: +m[1], to: +m[2], plates: m[4] ? [+m[3], +m[4]] : [+m[3]], name: m[5] ? +m[5] : null, dist: +m[6] };
  });
  ok(C.ids(lv, 'spots').length === S.length, `${lv} spots: ${S.length} rounds`);
  S.forEach((d, i) => {
    const r = C.round(lv, 'spots', i), w = `${lv} spots #${i}`;
    ok(JSON.stringify(r.plates) === JSON.stringify(d.plates) && JSON.stringify(r.dist) === JSON.stringify([d.dist]), `${w}: plates ${d.plates} + distractor ${d.dist}`);
    const nums = d.plates.concat([d.dist], d.name ? [d.name] : []);
    ok(nums.every(n => n >= 1 && n <= cap) && (d.open ? d.open[0] : d.from) >= 1 && (d.open ? d.open[1] : d.to) <= cap, `${w}: no 0${lv === '50' ? ', nothing above 50' : ''}`);
    if (d.open) {
      ok(r.open && r.open.a === d.open[0] && r.open.b === d.open[1] && r.open.eps === d.eps, `${w}: open rail ${d.open[0]}…${d.open[1]}, ε ${d.eps}`);
      ok(d.dist < d.open[0] || d.dist > d.open[1], `${w}: the distractor is outside the rail`);
      ok(d.plates.every(v => v > d.open[0] && v < d.open[1]), `${w}: the targets are inside the rail`);
      /* each target at every 1/40 of the rail: right iff within ε of its true place */
      for (const v of d.plates) for (let q = 1; q < 40; q++) {
        const x = q / 40, st = C.newState(r), other = d.plates.find(u => u !== v);
        C.placeOpen(st, other, (other - d.open[0]) / (d.open[1] - d.open[0])); C.placeOpen(st, v, x);
        const tv = d.open[0] + (d.open[1] - d.open[0]) * x, a = C.check(st), want = Math.abs(tv - v) <= d.eps;
        ok((a.result === 'ok') === want, `${w}: ${v} at ${tv.toFixed(2)} → ${want ? 'right' : 'wrong'}`);
        if (!want) ok(a.run.stop === v && Math.abs(a.run.stopValue - tv) <= C.ghostStep(r) / 2 + 1e-9, `${w}: the lamp stops at ${v} and shows its true place`);
      }
      for (let q = 1; q < 10; q++) { const st = C.newState(r); d.plates.forEach(v => C.placeOpen(st, v, (v - d.open[0]) / (d.open[1] - d.open[0]))); C.placeOpen(st, d.dist, q / 10); ok(C.check(st).result === 'miss', `${w}: the distractor is wrong anywhere on the rail`); }
      { const s8 = C.newState(r); d.plates.forEach(v => C.placeOpen(s8, v, (v - d.open[0]) / (d.open[1] - d.open[0]))); C.placeOpen(s8, d.dist, 0.5); C.check(s8); C.check(s8); const h2 = C.hint(s8); ok(h2.key === 'hintNowhere' && h2.args.n === d.dist, `${w}: the distractor on the rail → miss 2 hintNowhere`); }
      const st1 = C.newState(r); C.placeOpen(st1, d.plates[0], 0.5); ok(C.check(st1).result === 'none' && C.hint(st1).key === 'hintEmptyRail' && st1.misses === 0, `${w}: one plate on the rail → hintEmptyRail, no miss`);
      return;
    }
    ok(r.from === d.from && d.to - d.from === 10, `${w}: the stretch ${d.from}–${d.to}`);
    const homes = d.plates.map(v => v - d.from), nameTie = d.name ? d.name - d.from : null;
    homes.forEach((h, k) => ok(h > 0 && h < 10 && C.home(r, d.plates[k]) === h, `${w}: ${d.plates[k]} belongs on tie ${h}`));
    ok(new Set(homes.concat(nameTie != null ? [nameTie] : [])).size === homes.length + (nameTie != null ? 1 : 0), `${w}: every right tie different`);
    if (d.name) ok(r.name.tie === nameTie && nameTie > 0 && nameTie < 10, `${w}: the arrow on tie ${nameTie}`);
    ok(d.dist < d.from || d.dist > d.to, `${w}: the distractor ${d.dist} belongs on no tie of this stretch`);
    /* every plate on every seat */
    for (const v of nums.filter(n => n !== d.name)) for (let t = 1; t < 10; t++) {
      const st = C.newState(r), placed = C.place(st, v, t);
      ok(placed === (t !== nameTie), `${w}: plate ${v} → tie ${t} ${t === nameTie ? 'refused (the arrow tie)' : 'bolts'}`);
      if (!placed) continue;
      if (d.name) st.typed = String(d.name);
      d.plates.forEach((u, k) => { if (u !== v && C.where(st, u) == null && homes[k] !== t) C.place(st, u, homes[k]); });
      const a = C.check(st), allRight = d.plates.every((u, k) => st.seats[homes[k]] === u) && Object.keys(st.seats).length === d.plates.length;
      if (a.result === 'none') { ok(Object.keys(st.seats).length < d.plates.length, `${w}: plate ${v} on ${t}: 'none' only while plates are missing`); continue; }
      ok((a.result === 'ok') === allRight, `${w}: plate ${v} on tie ${t} → ${allRight ? 'right' : 'wrong'}`);
      /* the lamp's stop = the first seat from the left whose plate is not its number */
      let first = null; for (let q = 1; q < 10; q++) { const p = q === nameTie ? +st.typed : st.seats[q]; if (p != null && p !== d.from + q) { first = q; break; } }
      ok((a.run.stop == null ? null : a.run.stop) === first, `${w}: plate ${v} on ${t}: the lamp stops at ${first}`);
      if (first != null) ok(a.run.counted.join() === Array.from({ length: first }, (_, q) => q + 1).join(), `${w}: the lamp counted ties 1..${first} from the station`);
    }
    /* empty / typed */
    const st2 = C.newState(r); if (d.name) { ok(C.check(st2).result === 'none' && C.hint(st2).key === 'hintType', `${w}: nothing typed → hintType`); st2.typed = String(d.name); }
    ok(C.check(st2).result === 'none' && C.hint(st2).key === 'hintEmpty' && st2.misses === 0, `${w}: no plates → hintEmpty, no miss`);
    if (d.name) {
      const s3 = C.newState(r); d.plates.forEach((u, k) => C.place(s3, u, homes[k]));
      const wrongs = [String(d.name + 1), String(d.name - 1), d.name >= 100 ? '1007' : String(d.name) + '7'];   /* 1007 for 107: the 4th digit is refused, so it reads 100 — never 107 */
      for (const tw of wrongs) { s3.typed = ''; tw.split('').forEach(ch => C.type(s3, ch)); const a = C.check(s3); ok(a.result === 'miss' && a.why === 'typed' && C.hint(s3).key === 'hintFromNearest' && C.hint(s3).args.m === d.from, `${w}: typed ${s3.typed} for ${d.name} → hintFromNearest ${d.from}`); C.unplace(s3, d.plates[0]); C.place(s3, d.plates[0], homes[0]); }
      s3.typed = ''; String(d.name).split('').forEach(ch => C.type(s3, ch)); ok(C.check(s3).result === 'ok', `${w}: typed ${d.name} → right`);
      const s4 = C.newState(r); ok(!C.type(s4, '0') && C.type(s4, '1') && C.type(s4, '0') && C.type(s4, '0') && !C.type(s4, '7') && s4.typed === '100' && C.del(s4) && s4.typed === '10', `${w}: no leading 0, at most 3 digits, delete`);
    }
    /* miss 2 hint names the plate's own number; a move clears it */
    const s5 = C.newState(r); if (d.name) s5.typed = String(d.name);
    d.plates.forEach((u, k) => C.place(s5, u, homes[k] === 9 ? 8 === nameTie ? 7 : 8 : homes[k] + 1 === nameTie ? homes[k] + 2 : homes[k] + 1));
    C.check(s5); const mv = C.hint(s5); C.check(s5); const mv2 = C.hint(s5);
    ok(mv.key === 'hintCountOn' && mv2.key === 'hintFind' && d.plates.indexOf(mv2.args.n) >= 0 && s5.show === 2, `${w}: miss 1 hintCountOn, miss 2 hintFind {its plate}`);
    ok(C.lampTies(s5).length === 9 - (nameTie != null ? 1 : 0) && C.lampTies(s5).indexOf(nameTie) < 0, `${w}: miss 2 lights every blank tie but the arrow tie`);
    { const s8 = C.newState(r); if (d.name) s8.typed = String(d.name); d.plates.forEach((u, k) => C.place(s8, u, homes[k])); const fr = [1, 2, 3, 4, 5, 6, 7, 8, 9].find(t => homes.indexOf(t) < 0 && t !== nameTie); C.place(s8, d.dist, fr); C.check(s8); const h1 = C.hint(s8); C.check(s8); const h2 = C.hint(s8);
      ok(h1.key === 'hintCountOn' && h2.key === 'hintNowhere' && h2.args.n === d.dist, `${w}: the distractor on a tie → miss 2 says no tie here is ${d.dist} (never 'find the tie that says ${d.dist}')`); }
    C.unplace(s5, d.plates[0]); ok(s5.show === 0 && s5.last == null && s5.run == null && C.lampTies(s5).length === 0, `${w}: a move clears the showing`);
  });
  /* ---------------- mileposts ---------------- */
  const P = rows(POSTS[lv]).map(t => { const [p, x] = t.split(' x'); return { posts: p.split(' ').map(s => s === '_' ? null : +s), dist: x.split(' ').map(Number) }; });
  ok(C.ids(lv, 'posts').length === P.length, `${lv} posts: ${P.length} rounds`);
  P.forEach((d, i) => {
    const r = C.round(lv, 'posts', i), w = `${lv} posts #${i} ${d.posts.map(x => x == null ? '_' : x).join(' ')}`;
    const printed = d.posts.map((v, k) => v == null ? null : k).filter(k => k != null);
    const step = (d.posts[printed[1]] - d.posts[printed[0]]) / (printed[1] - printed[0]);
    const full = d.posts.map((v, k) => d.posts[printed[0]] + (k - printed[0]) * step);
    ok(Number.isInteger(step) && step !== 0 && d.posts.every((v, k) => v == null || v === full[k]), `${w}: one constant step ${step}`);
    ok(printed.some((k, q) => q > 0 && k === printed[q - 1] + 1), `${w}: two printed neighbours show the step`);
    ok(r.posts.step === step && r.posts.values.join() === full.join() && r.posts.blanks.join() === d.posts.map((v, k) => v == null ? k : null).filter(k => k != null).join(), `${w}: the posts and the blanks`);
    ok(full.every(v => v >= 1 && v <= cap) && d.dist.every(v => v >= 1 && v <= cap), `${w}: no 0${lv === '50' ? ', nothing above 50' : ''}`);
    ok(d.dist.every(x => full.indexOf(x) < 0), `${w}: the distractors break the step`);
    const blanks = r.posts.blanks, want = blanks.map(b => full[b]);
    /* every plate on every blank post */
    for (const b of blanks) for (const v of want.concat(d.dist)) {
      const st = C.newState(r); blanks.forEach((bb, k) => { if (bb !== b) C.place(st, want[k], bb); });
      if (C.where(st, v) != null) continue; C.place(st, v, b);
      const a = C.check(st), right = v === full[b];
      ok((a.result === 'ok') === right, `${w}: ${v} on post ${b} → ${right ? 'right' : 'wrong'}`);
      if (!right) { ok(a.run.stop === b && C.hint(st).key === 'hintStep', `${w}: the engine stops at post ${b}, hintStep`); const j = a.run.jumps; ok(j[b - 1] === v - (b - 1 === -1 ? 0 : st.seats[b - 1] != null ? st.seats[b - 1] : full[b - 1]), `${w}: the jump into post ${b} shows its own size`); }
      else ok(a.run.jumps.every(x => x === step), `${w}: every jump is ${step}`);
    }
    const s6 = C.newState(r); C.place(s6, want[0], blanks[0]); ok(C.check(s6).result === 'none' && C.hint(s6).key === 'hintEmptyPosts', `${w}: an empty post → hintEmptyPosts`);
    const s7 = C.newState(r); blanks.forEach((b, k) => C.place(s7, k === blanks.length - 1 ? d.dist[0] : want[k], b)); C.check(s7); C.check(s7);
    ok(C.hint(s7).key === 'hintStepShow' && C.hint(s7).args.s === Math.abs(step), `${w}: miss 2 names the step`);
    ok(!C.place(s7, want[0], printed[0]), `${w}: a printed post takes no plate`);
  });
  /* ---------------- the plan + the tray ---------------- */
  for (const tr of C.TRACKS) {
    const ids = C.ids(lv, tr), tag = `${lv} ${tr}`;
    const right = (i) => { const r = C.round(lv, tr, i); if (r.hop) return [r.hop.land]; if (r.posts || r.open) return []; return r.plates.map(v => v - r.from).concat(r.name ? [r.name.tie] : []); };
    let s1 = 11; const r1 = () => (s1 = (s1 * 16807) % 2147483647) / 2147483647; let pv = null;
    for (let k = 0; k < 2000; k++) {
      const o = C.plan(lv, tr, r1, pv).order;
      if (o.slice().sort((a, b) => a - b).join() !== ids.join() || (pv && pv.join() === o.join())) { ok(false, `${tag} plan #${k}: a new permutation`); break; }
      for (let q = 1; q < o.length; q++) if (right(o[q]).some(t => right(o[q - 1]).indexOf(t) >= 0)) { ok(false, `${tag} plan #${k}: neighbours share a right tie`); break; }
      pv = o;
    }
    const orders = new Set(); let s2 = 5; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
    for (let k = 0; k < 200; k++) orders.add(C.plan(lv, tr, r2, null).order.join());
    ok(orders.size > 100, `${tag}: the plan really reshuffles (${orders.size}/200)`);
    for (const sd of [3, 5, 9, 13]) { const mk = () => { let q = sd; return () => (q = (q * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(lv, tr, mk(), null).order; ok(C.plan(lv, tr, mk(), o1).order.join() !== o1.join(), `${tag} seed ${sd}: handed its own order, the plan gives another`); }
    if (tr !== 'hops') for (const i of ids) { const r = C.round(lv, tr, i); let s3 = 7 + i; const r3 = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647; for (let k = 0; k < 200; k++) { const t = C.tray(r, r3), up = t.every((x, q) => q === 0 || x >= t[q - 1]), dn = t.every((x, q) => q === 0 || x <= t[q - 1]); ok(t.slice().sort((a, b) => a - b).join() === r.plates.concat(r.dist).sort((a, b) => a - b).join() && (t.length < 3 || (!up && !dn)), `${tag} #${i}: the tray holds every plate, never in numeric order (3+ plates)`); } }
  }
}
/* ---- the engine ---- */
const [dir, key] = C.DATA.ENGINE;
const pj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir + '.json'), 'utf8'));
ok(!!(pj.nouns && pj.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')) && !/bw(\s+\d+)?$/i.test(dir), `the engine ${dir}/${key} is a labelled colour picture`);
ok(dir === 'vehicles' && key === 'train', 'the engine is vehicles/train (the contact sheet: a steam engine facing RIGHT, no printed text — mirrored only for count-back hops)');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.levelOf('x') === '120' && C.trackOf('x') === 'spots' && C.TIES === 11, 'locales + defaults');
console.log(`verify-counting-lamp-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
