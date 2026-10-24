#!/usr/bin/env node
/* =====================================================================
   verify-plank-path-core.js — the gate for ACTIVITY #90, THE PLANK PATH
   ("Find the Missing Number", 1.OA.D.8). Its OWN oracle: the design's
   18 paths are re-read here as text and solved with this file's own
   arithmetic; nothing expected is read off the core.
     · every equation, answer and decoy as the design tables; per path four
       DIFFERENT kinds of blank, four different answers, the decoy never an
       answer; every number 1..10 / 1..20, never 0; a Within-20 path holds a
       number above 10;
     · every decoy is a real mistake (the sum or the difference of the two
       numbers a child sees) or an answer's neighbour; the decoy is the
       largest plank in ≤ 4 of 9 paths and the smallest in ≤ 4;
     · the road: the banks are the known numbers, the open stretch is the
       answer, at the place its kind of blank puts it (the start, the
       middle, the slot under the road, the rest after a take-away);
     · EVERY plank 1..20 laid in EVERY gap: fits iff it is the answer; too
       short / too long by exactly the difference; a wrong plank is a miss,
       the second miss in that gap numbers its squares; a laid plank can be
       lifted; the path is done only when all four fit;
     · the tray: the four answers + the decoy; gap 1's answer in every slot
       15–25 % of the time; the decoy never in the same slot twice running;
       the plan never repeats a pass; the walkers are labelled library
       pictures, the left-facing ones mirrored.
   Usage: node scripts/verify-plank-path-core.js   (PP_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.PP_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'plank-path-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };

/* ---- the design's paths (docs/activities-rebuild/designs/090-match-pairs.md §6), as text ---- */
const DESIGN = {
  '10': [['? + 4 = 9 · 8 − ? = 5 · 3 + 4 = ? · ? − 6 = 2', [5, 3, 7, 8], 4], ['2 + ? = 8 · ? − 3 = 4 · 9 − 5 = ? · ? + 7 = 10', [6, 7, 4, 3], 10], ['? + 6 = 8 · 10 − ? = 6 · 5 + 4 = ? · ? − 2 = 5', [2, 4, 9, 7], 3],
    ['6 + ? = 9 · ? − 1 = 7 · 10 − 4 = ? · ? + 5 = 6', [3, 8, 6, 1], 2], ['? + 3 = 7 · 9 − ? = 4 · 2 + 8 = ? · ? − 4 = 2', [4, 5, 10, 6], 2], ['5 + ? = 7 · ? − 5 = 4 · 8 − 7 = ? · ? + 3 = 9', [2, 9, 1, 6], 3],
    ['? + 2 = 5 · 7 − ? = 1 · 4 + 4 = ? · ? − 5 = 5', [3, 6, 8, 10], 9], ['1 + ? = 5 · ? − 2 = 7 · 6 − 3 = ? · ? + 2 = 8', [4, 9, 3, 6], 7], ['? + 1 = 8 · 10 − ? = 8 · 3 + 3 = ? · ? − 1 = 4', [7, 2, 6, 5], 9]],
  '20': [['? + 4 = 13 · 14 − ? = 6 · 7 + 8 = ? · ? − 5 = 7', [9, 8, 15, 12], 2], ['8 + ? = 11 · ? − 6 = 10 · 13 − 7 = ? · ? + 9 = 18', [3, 16, 6, 9], 19], ['? + 7 = 15 · 16 − ? = 9 · 6 + 5 = ? · ? − 8 = 6', [8, 7, 11, 14], 2],
    ['5 + ? = 12 · ? − 9 = 4 · 18 − 6 = ? · ? + 6 = 20', [7, 13, 12, 14], 5], ['? + 8 = 17 · 15 − ? = 11 · 9 + 9 = ? · ? − 3 = 10', [9, 4, 18, 13], 7], ['9 + ? = 15 · ? − 4 = 12 · 20 − 6 = ? · ? + 5 = 13', [6, 16, 14, 8], 18],
    ['? + 6 = 11 · 17 − ? = 7 · 8 + 6 = ? · ? − 7 = 9', [5, 10, 14, 16], 17], ['7 + ? = 16 · ? − 8 = 11 · 12 − 9 = ? · ? + 10 = 18', [9, 19, 3, 8], 10], ['? + 9 = 20 · 13 − ? = 8 · 4 + 9 = ? · ? − 2 = 14', [11, 5, 13, 16], 12]]
};
const TOP = { '10': 10, '20': 20 };
/* my own reader and solver */
const read = (t) => { const m = /^(\d+|\?) ([+−]) (\d+|\?) = (\d+|\?)$/.exec(t.trim()); const n = (v) => v === '?' ? null : +v; return { x: n(m[1]), op: m[2], y: n(m[3]), z: n(m[4]) }; };
const solve = (e) => { for (let v = 1; v <= 40; v++) { const x = e.x ?? v, y = e.y ?? v, z = e.z ?? v; if ((e.op === '+' ? x + y : x - y) === z) return v; } return null; };
const kindOf = (e) => e.op === '+' ? (e.x == null ? 'first' : e.y == null ? 'second' : 'sum') : (e.x == null ? 'start' : e.y == null ? 'takeaway' : 'diff');

for (const lv of C.LEVELS) {
  const top = TOP[lv], rows = DESIGN[lv]; let biggest = 0, smallest = 0;
  ok(C.ids(lv).length === rows.length, `${lv}: ${rows.length} paths`);
  rows.forEach(([text, answers, decoy], i) => {
    const r = C.round(lv, i), eqs = text.split(' · ').map(read), tag = `${lv}#${i}`;
    ok(r.gaps.map(g => C.text(g)).join(' · ') === text.replace(/−/g, '−'), `${tag}: the core writes "${r.gaps.map(g => C.text(g)).join(' · ')}"`);
    const mine = eqs.map(solve);
    ok(mine.join() === answers.join() && r.answers.join() === answers.join() && r.decoy === decoy, `${tag}: answers ${answers} + decoy ${decoy}`);
    ok(new Set(eqs.map(kindOf)).size === 4 && r.gaps.every((g, k) => g.kind === kindOf(eqs[k])), `${tag}: four different kinds of blank (${eqs.map(kindOf)})`);
    ok(new Set(answers).size === 4 && !answers.includes(decoy), `${tag}: four different answers, the decoy is not one of them`);
    const nums = text.match(/\d+/g).map(Number).concat(answers, [decoy]);
    ok(nums.every(n => n >= 1 && n <= top), `${tag}: every number 1..${top}, never 0`);
    if (lv === '20') ok(nums.some(n => n > 10), `${tag}: a number above 10`);
    /* the decoy is a real mistake or a neighbour */
    const mistakes = new Set(); eqs.forEach((e, k) => { const vis = [e.x, e.y, e.z].filter(v => v != null); mistakes.add(vis[0] + vis[1]); mistakes.add(Math.abs(vis[0] - vis[1])); mistakes.add(answers[k] + 1); mistakes.add(answers[k] - 1); });
    ok(mistakes.has(decoy), `${tag}: the decoy ${decoy} is a child's mistake or a neighbour`);
    const all = answers.concat([decoy]).sort((a, b) => a - b); if (decoy === all[4]) biggest++; if (decoy === all[0]) smallest++;
    /* the road */
    eqs.forEach((e, k) => {
      const g = r.gaps[k], lay = C.layout(g), kind = kindOf(e), ans = answers[k], t2 = `${tag} gap ${k + 1} ${C.text(g)}`;
      ok(lay.gap.len === ans, `${t2}: the open stretch is ${ans} squares`);
      const known = [e.x, e.y, e.z].filter(v => v != null);
      if (kind === 'first') ok(lay.gap.from === 0 && !lay.gap.base && lay.banks.length === 1 && lay.banks[0].len === e.y && lay.banks[0].from === ans && lay.whole === e.z, `${t2}: the gap at the START, the bank ${e.y} at the end`);
      if (kind === 'second') ok(lay.gap.from === e.x && !lay.gap.base && lay.banks[0].from === 0 && lay.banks[0].len === e.x && lay.whole === e.z, `${t2}: the bank ${e.x}, then the gap`);
      if (kind === 'takeaway') ok(lay.gap.from === e.z && !lay.gap.base && lay.banks[0].len === e.z && lay.whole === e.x, `${t2}: what is left (${e.z}), then the gap to ${e.x}`);
      if (kind === 'start' || kind === 'sum') ok(lay.gap.base && lay.gap.from === 0 && lay.banks.length === 2 && lay.banks[0].len + lay.banks[1].len === ans && lay.whole === ans, `${t2}: both banks, the whole in the slot under the road`);
      if (kind === 'diff') ok(lay.gap.from === 0 && !lay.gap.base && lay.banks[0].gone && lay.banks[0].len === e.y && lay.banks[0].from === ans && lay.whole === e.x, `${t2}: the ${e.y} taken away at the end, the gap is the rest`);
      lay.banks.forEach(b => ok(known.includes(b.len), `${t2}: a bank ${b.len} is a number in the equation`));
      /* every plank in this gap */
      for (let p = 1; p <= 20; p++) { const f = C.fit(g, p); ok(f.fit === (p === ans ? 'exact' : p < ans ? 'short' : 'long') && f.diff === Math.abs(p - ans), `${t2}: plank ${p} → ${f.fit} ${f.diff}`); }
    });
    /* play the path */
    const st = C.newState(r, answers.concat([decoy]));
    ok(st.selected === 0 && C.lay(st, 99) === null, `${tag}: only tray planks can be laid`);
    const wrong = [decoy].concat(answers.filter(a => a !== answers[0]))[0];
    let res = C.lay(st, wrong); ok(res.fit !== 'exact' && st.misses[0] === 1 && st.laid[0] === null && C.hint(st) === (wrong < answers[0] ? 'hShort' : 'hLong') && C.countHelp(st) === null, `${tag}: a wrong plank is a miss (${C.hint(st)})`);
    const wrong2 = answers.find(a => a !== answers[0]); C.lay(st, wrong2);
    const h = C.countHelp(st); ok(st.misses[0] === 2 && C.hint(st) === 'hCount' && h && h.gap === 0 && h.len === answers[0], `${tag}: miss 2 numbers the ${answers[0]} squares of the gap`);
    answers.forEach((a, k) => { ok(C.select(st, k) && C.lay(st, a).fit === 'exact' && st.laid[k] === a && C.hint(st) === null, `${tag}: ${a} fits gap ${k + 1}`); ok(st.done === (k === 3), `${tag}: done only after the fourth plank`); });
    ok(C.lay(st, decoy) === null && C.lift(st, 0) === false, `${tag}: a crossed path takes no more planks`);
    const s2 = C.newState(r, answers.concat([decoy])); C.lay(s2, answers[0]);
    ok(s2.selected === 1 && C.lay(s2, answers[0]) === null && C.select(s2, 0) === false, `${tag}: a laid plank is used; its gap is closed; the next gap is chosen`);
    ok(C.lift(s2, 0) && s2.laid[0] === null && s2.selected === 0 && C.lay(s2, answers[0]).fit === 'exact', `${tag}: a laid plank lifts out and back`);
  });
  ok(biggest <= 4 && smallest <= 4, `${lv}: the decoy is the largest plank in ${biggest} and the smallest in ${smallest} of 9 paths (≤ 4 each)`);
}
/* ---- the tray ---- */
for (const lv of C.LEVELS) {
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const r = C.round(lv, 0), slots = [0, 0, 0, 0, 0]; let prev = -1, repeats = 0; const N = 10000;
  for (let k = 0; k < N; k++) {
    const t = C.tray(r, rnd, prev);
    if (t.slice().sort((a, b) => a - b).join() !== r.answers.concat([r.decoy]).sort((a, b) => a - b).join()) { ok(false, `${lv}: a tray holds the answers and the decoy`); break; }
    slots[t.indexOf(r.answers[0])]++; const d = t.indexOf(r.decoy); if (d === prev) repeats++; prev = d;
  }
  ok(slots.every(c => c / N >= 0.15 && c / N <= 0.25), `${lv}: gap 1's plank in every slot 15–25 % (${slots.map(c => Math.round(100 * c / N)).join('/')})`);
  ok(repeats === 0, `${lv}: the decoy never in the same slot twice running (${repeats})`);
  let s3 = 7; const r3 = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647; let pv = null;
  for (let k = 0; k < 5000; k++) { const o = C.plan(lv, r3, pv).order; if (o.slice().sort((a, b) => a - b).join() !== C.ids(lv).join() || (pv && pv.join() === o.join())) { ok(false, `${lv} plan #${k}: a new permutation`); break; } pv = o; }
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let q = sd; return () => (q = (q * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(lv, mk(), null).order; ok(C.plan(lv, mk(), o1).order.join() !== o1.join(), `${lv} seed ${sd}: handed its own order, the plan gives another`); }
}
/* ---- the walkers ---- */
const LEFT = ['rabbit', 'squirrel', 'goat'];   /* measured on the contact sheet: these face left */
C.DATA.WALKERS.forEach(([dir, key, mirror]) => {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir.replace(/ /g, '-') + '.json'), 'utf8'));
  ok(!!(j.nouns && j.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')), `the walker ${dir}/${key} is a labelled colour picture`);
  ok(mirror === LEFT.includes(key), `the walker ${key} ${LEFT.includes(key) ? 'is mirrored to walk left → right' : 'is not mirrored'}`);
});
ok(C.DATA.WALKERS.length === 9 && new Set(C.DATA.WALKERS.map(w => w[1])).size === 9, 'nine different walkers, one per path in a pass');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.levelOf('x') === '10', 'locales + defaults');
console.log(`verify-plank-path-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
