#!/usr/bin/env node
/* =====================================================================
   verify-egg-cartons-core.js — the model gate for ACTIVITY #2, "Count by
   tens" (K.CC.A.1), the Ten-Shelf. Run: node scripts/verify-egg-cartons-core.js
   Env: EC_CORE_DIR points the mutation harness at a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: tags
   are 10·k by construction here, the verdict table is written out from the
   design sheet, the layout floors from the activity law.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.EC_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'egg-cartons-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();
const WIDTHS = [272, 288, 332, 384, 420, 480, 560, 620, 700, 760];

/* 1. layout: rows of five (four on a phone), cartons ≥ 60 wide and ≥ 44 tall, inside the mat, no overlap */
for (const W of WIDTHS) for (let k = 0; k <= 10; k++) {
  const L = C.layout(k, W);
  is(L.points.length === k, `points ${L.points.length} ≠ ${k} (W=${W})`);
  is(L.fits, `layout fits (k=${k} W=${W})`);
  is(L.w >= 60 && L.h >= 44, `carton ${L.w}×${L.h} meets the floors (k=${k} W=${W})`);
  const fitCols = Math.max(1, Math.min(W >= 520 ? 5 : 4, Math.floor((W - 2 * (W < 400 ? 8 : 14) + (W < 400 ? 6 : 10)) / (60 + (W < 400 ? 6 : 10)))));
  is(L.cols === Math.min(fitCols, Math.max(1, k)), `columns ${L.cols} for W=${W} k=${k} (expected ${Math.min(fitCols, Math.max(1, k))})`);
  let out = 0, ov = 0;
  for (let i = 0; i < k; i++) {
    const p = L.points[i];
    if (p.x < 0 || p.y < 0 || p.x + L.w > W || p.y + L.h > L.height) out++;
    for (let j = i + 1; j < k; j++) { const q = L.points[j]; if (Math.abs(p.x - q.x) < L.w && Math.abs(p.y - q.y) < L.h) ov++; }
  }
  is(out === 0 && ov === 0, `cartons inside the mat and apart (out ${out}, overlap ${ov}, k=${k} W=${W})`);
  if (k === 10 && W >= 520) is(L.rows === 2, 'ten cartons are two rows of five on a wide mat');
  if (k === 5 && W >= 520) is(L.rows === 1, 'five cartons are one row on a wide mat');
}

/* 2. pools: every tens once per kind; the kind setting serves only its kind; range 50 halves */
for (const max of [5, 10]) {
  const both = C.rounds(max, 'both', 's');
  is(both.length === 2 * (max - 1), `pool size ${both.length} for max ${max}`);
  is(both.filter(r => r.kind === 'count').map(r => r.tens).join() === [...Array(max - 1).keys()].map(i => i + 2).join(), 'count rounds 2..max once');
  is(both.filter(r => r.kind === 'pack').map(r => r.tens).join() === [...Array(max - 1).keys()].map(i => i + 2).join(), 'pack rounds 2..max once');
  is(new Set(both.map(r => r.seed)).size === both.length, 'seeds distinct');
  is(C.rounds(max, 'count', 's').every(r => r.kind === 'count') && C.rounds(max, 'count', 's').length === max - 1, 'kind=count serves only count rounds');
  is(C.rounds(max, 'pack', 's').every(r => r.kind === 'pack') && C.rounds(max, 'pack', 's').length === max - 1, 'kind=pack serves only pack rounds');
}

/* 3. count rounds: tags are the running total; one-to-one; the verdict table */
for (let k = 2; k <= 10; k++) {
  const st = C.newState({ kind: 'count', tens: k, seed: 's' });
  is(C.verdict(st) === 'untagged' && C.untagged(st).length === k, `fresh count round k=${k}`);
  for (let i = 0; i < k; i++) {
    const r = C.tag(st, i);
    is(r.ok && r.k === i + 1 && r.total === 10 * (i + 1), `tag ${i} → ${10 * (i + 1)}`);
    is(C.labelOf(st, i) === 10 * (i + 1), `carton ${i} wears ${10 * (i + 1)}`);
    is(!C.tag(st, i).ok && st.tags.length === i + 1, 'a second tag is refused');
    is(C.lastTagged(st) === i, 'the last tag is the last tapped');
  }
  is(!C.tag(st, k).ok && !C.tag(st, -1).ok, 'out of range refused');
  is(C.allTagged(st) && C.verdict(st) === 'noAnswer', 'all tagged → noAnswer');
  for (let v = 10; v <= 100; v += 10) { C.setAnswer(st, v); is(C.verdict(st) === (v === 10 * k ? 'ok' : ((v === k || v === 10) ? 'ones' : 'wrong')), `answer ${v} for k=${k}`); }
  C.setAnswer(st, 10); is(C.verdict(st) === 'ones', `the stamp '10' for ${k} cartons is the by-ones slip`);
  C.setAnswer(st, k); is(C.verdict(st) === 'ones', `the by-ones slip (${k}) is named`);
  C.setAnswer(st, 10 * k); C.untagAll(st);
  is(st.tags.length === 0 && st.answer === null, 'untagAll clears tags and answer');
  /* order does not matter */
  for (let i = k - 1; i >= 0; i--) C.tag(st, i);
  C.setAnswer(st, 10 * k); is(C.verdict(st) === 'ok', 'reverse order counts the same');
  is(C.labelOf(st, k - 1) === 10, 'the first carton tapped wears 10, whichever it is');
  /* a skipped carton blocks a right-looking answer */
  C.untagAll(st); for (let i = 0; i < k; i++) if (i !== 1) C.tag(st, i); C.setAnswer(st, 10 * k);
  is(C.verdict(st) === 'untagged' && C.untagged(st).join() === '1', 'the skipped carton is named');
  is(!C.add(st) && !C.remove(st), 'add/remove do nothing in a count round');
}

/* 4. pack rounds: add/remove, labels follow, verdict short/over/ok, cap at ten */
for (let t = 2; t <= 10; t++) {
  const st = C.newState({ kind: 'pack', tens: t, seed: 's' });
  is(C.verdict(st) === 'short' && st.packed === 0, `fresh pack round t=${t}`);
  is(C.target(st) === 10 * t, 'target is 10·t');
  for (let i = 1; i <= t; i++) { is(C.add(st) && st.packed === i && C.labelOf(st, i - 1) === 10 * i, `add → carton ${i} wears ${10 * i}`); }
  is(C.verdict(st) === 'ok', 'exactly t cartons → ok');
  is(C.labelOf(st, t) === null, 'no label past the packed ones');
  if (t < 10) { C.add(st); is(C.verdict(st) === 'over', 'one too many → over'); C.remove(st); is(C.verdict(st) === 'ok', 'remove → ok again'); }
  else { is(!C.add(st) && st.packed === 10, 'the shelf caps at ten cartons'); }
  for (let i = 0; i < t; i++) C.remove(st);
  is(st.packed === 0 && !C.remove(st) && C.verdict(st) === 'short', 'remove stops at zero');
  is(!C.tag(st, 0).ok, 'tag does nothing in a pack round');
}

console.log(`verify-egg-cartons-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);
