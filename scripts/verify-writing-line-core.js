#!/usr/bin/env node
/* =====================================================================
   verify-writing-line-core.js — the model gate for ACTIVITY #5, "Digby's
   Number Trace" (K.CC.A.3), the Fading Line.
   Run: node scripts/verify-writing-line-core.js   Env: WL_CORE_DIR → a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: the
   three plans and their corridors, every digit × every box solved by the
   flattened ideal path (both the plain and the barred seven), the slip
   table from the finger's path, the help ladder, the layout floors, and
   the symmetric set {0, 8}. The two instruments it loads unchanged
   (NumberTraceCore, StrokeTraceCore) have gates of their own.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.WL_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'writing-line-core.js'));
const { ST, NT } = C.deps();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();
const flat = (s) => ST.flatten(s, 1.2);
const drive = (st, pts) => { for (const p of pts) C.sample(st, p); return C.endStroke(st); };

is(!!ST && !!NT, 'the two instruments load');
/* 1. plans, corridors, rounds */
is(C.plan('fading').join() === 'full,ghost,blank' && C.plan('full').join() === 'full,full,full' && C.plan('alone').join() === 'ghost,blank,blank' && C.plan('nonsense').join() === 'full,ghost,blank', 'the three plans; unknown falls back to fading');
is(C.CORRIDOR.full === 8 && C.CORRIDOR.ghost === 12 && C.CORRIDOR.blank === 16 && C.CORRIDOR.full === ST.CORRIDOR, 'corridors 8 / 12 / 16 (full = the judge\'s own)');
is(C.HELP_AFTER === 3 && C.LINES.top === 16 && C.LINES.base === 84 && C.LINES.mid === 50, 'help after 3 stalls; lines 16 / 50 / 84');
const R = C.rounds('s');
is(R.length === 10 && R.map(r => r.digit).join() === '0,1,2,3,4,5,6,7,8,9' && new Set(R.map(r => r.seed)).size === 10, 'ten rounds, 0…9, seeds distinct');
is(C.glyph(7, 'de').length === 2 && C.glyph(7, 'en').length === 1 && C.glyph(7, 'fi').length === 1 && C.glyph(1, 'en').length === 1 && C.glyph(4, 'en').length === 2 && C.glyph(5, 'en').length === 2 && C.glyph(9, 'en').length === 2, 'glyphs: barred seven for de only, 4/5/9 two strokes');

/* 2. symmetry: exactly 0 and 8 */
for (const d of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) is(C.symmetric(C.glyph(d, 'en')) === (d === 0 || d === 8), `symmetric(${d}) = ${d === 0 || d === 8}`);

/* 3. every digit × every plan × two langs: the ideal path writes all three boxes; the state advances box by box */
for (const lang of ['en', 'de']) for (const guide of ['fading', 'full', 'alone']) for (const r of R) {
  const st = C.newState(r, lang, guide), n = st.strokes.length;
  is(st.cells.length === 3 && st.cells.map(c => c.level).join() === C.plan(guide).join() && st.cells.every(c => c.trace.corridor === C.CORRIDOR[c.level]), `${lang} ${guide} ${r.digit}: three boxes on the plan, each with its corridor`);
  is(st.at === 0 && !st.done && C.verdict(st) === 'unfinished' && C.boxesDone(st) === 0 && C.strokeIndex(st) === 0, 'opens on box 1, stroke 1');
  is(C.demoRoute(st).length === n && C.demoRoute(st).every(p => p.length >= 3), 'the walker route covers every remaining stroke');
  for (let b = 0; b < 3; b++) {
    for (let i = 0; i < n; i++) {
      const res = drive(st, flat(st.strokes[i]));
      const last = i === n - 1;
      is(res.result === (last ? 'formed' : 'stroke-ok') && (!last || res.box === b), `${lang} ${guide} ${r.digit} box ${b + 1} stroke ${i + 1}: ${last ? 'the box forms' : 'stroke ok'} (got ${res.result})`);
      if (!last) is(C.strokeIndex(st) === i + 1 && C.demoRoute(st).length === n - i - 1, 'the next stroke is up; the walker route shrinks');
    }
    is(st.cells[b].formed && st.cells[b].ink.length === n && st.cells[b].ink.every(k => k.length >= 6) && C.boxesDone(st) === b + 1, `box ${b + 1} keeps ${n} ink strokes`);
    if (b < 2) is(st.at === b + 1 && !st.done, `on to box ${b + 2}`);
  }
  is(st.done && C.verdict(st) === 'done' && C.endStroke(st).result === 'none' && !C.sample(st, { x: 50, y: 50 }).on && !C.rubOut(st), `${lang} ${guide} ${r.digit}: done after three boxes; nothing more is taken`);
}

/* 4. the slip table — from the finger's own path, on box 1 of a fresh fading state */
const MIRROR_BLIND = [1];   /* measured 2026-10-16: the mirrored flag of 1 meets the real flag at the apex inside the corridor, so the judge accepts it — the only such digit */
for (const r of R) {
  const d = r.digit;
  const fresh = () => C.newState(r, 'en', 'fading');
  let st = fresh(), s0 = st.strokes[0];
  /* reversed: the first stroke swept from its far end */
  let res = drive(st, flat(C.reverseStroke(s0)));
  const symmetric = d === 0 || d === 8;
  is(res.result === 'incomplete' && res.slip === (symmetric ? 'direction' : 'reversed') && st.cells[0].fails === 1 && !st.cells[0].formed, `${d}: backwards → ${symmetric ? 'direction' : 'reversed'} (got ${res.slip})`);
  is(st.cells[0].live.length === 0 && ST.progress(st.cells[0].trace) === 0, `${d}: a named slip leaves no ink and no progress`);
  /* mirrored */
  st = fresh(); res = drive(st, flat(C.mirrorStrokes(st.strokes)[0]));
  if (MIRROR_BLIND.includes(d)) is(res.result !== 'incomplete', `${d}: the mirrored first stroke is accepted (mirror-blind, recorded)`);
  else is(res.result === 'incomplete' && res.slip === (symmetric ? 'direction' : 'mirror'), `${d}: mirrored → ${symmetric ? 'direction' : 'mirror'} (got ${res.slip})`);
  /* short: 70 % of the stroke */
  st = fresh(); { const f = flat(s0); res = drive(st, f.slice(0, Math.floor(f.length * 0.7))); }
  is(res.result === 'incomplete' && res.slip === 'short' && ST.progress(st.cells[0].trace) >= 0.5, `${d}: 70 % of the stroke → short (got ${res.slip})`);
  /* the ink and the cursor SURVIVE a lift: finishing the rest completes the stroke */
  { const f = flat(s0); res = drive(st, f.slice(Math.floor(f.length * 0.6))); }
  is(res.result === (st.strokes.length === 1 ? 'formed' : 'stroke-ok'), `${d}: resuming after a lift finishes the stroke (got ${res.result})`);
  /* scribble → off; a tap → off (nothing earned) */
  st = fresh(); res = drive(st, [{ x: 5, y: 5 }, { x: 90, y: 9 }, { x: 7, y: 95 }, { x: 95, y: 95 }]);
  is(res.result === 'incomplete' && res.slip === 'off', `${d}: a scribble → off`);
  is(st.cells[0].live.length === 0, `${d}: nothing off the road is inked`);
  { const f = flat(s0), half = f.slice(0, Math.floor(f.length * 0.65)); drive(st, half.concat([{ x: 2, y: 2 }, { x: 98, y: 98 }])); const L = st.cells[0].live; is(L.length >= 3 && L.every(q => f.some(fp => Math.hypot(fp.x - q.x, fp.y - q.y) <= C.CORRIDOR.full + 0.01)), `${d}: the live ink holds only points within the corridor (${L.length})`); }
  st = fresh(); res = drive(st, [{ x: s0[0].x, y: s0[0].y }]);
  is(res.result === 'incomplete' && res.slip === 'off', `${d}: a tap on the start → off`);
  st = fresh(); { const f = flat(s0); res = drive(st, f.slice(0, Math.max(3, Math.floor(f.length * 0.2)))); }
  is(res.result === 'incomplete' && res.slip === 'off' && ST.progress(st.cells[0].trace) < 0.5, `${d}: a fifth of the stroke is not 'short' yet → off (got ${res.slip})`);
  /* help: every third stall raises the shown guide; the level and corridor stay */
  st = C.newState(r, 'en', 'alone');            /* box 1 is a ghost → helps to full once */
  const c = st.cells[0];
  for (let k = 1; k <= 7; k++) { res = drive(st, [{ x: 2, y: 2 }, { x: 98, y: 3 }, { x: 2, y: 97 }]); is(c.fails === k && res.helped === (k === 3) && c.shown === (k >= 3 ? 'full' : 'ghost') && c.level === 'ghost' && c.trace.corridor === 12, `${d}: stall ${k} → shown ${c.shown}, helped ${res.helped}`); }
  st = C.newState(r, 'en', 'fading'); drive(st, flat(st.strokes[0])); for (let i = 1; i < st.strokes.length; i++) drive(st, flat(st.strokes[i]));
  { const f = flat(st.strokes[0]); drive(st, f.slice(0, 3)); } /* now on box 2 */
  is(st.at === 1, 'on box 2');
  for (let k = 1; k <= 6; k++) drive(st, [{ x: 2, y: 2 }, { x: 98, y: 3 }, { x: 2, y: 97 }]);
  is(st.cells[1].shown === 'full' && st.cells[1].helped === 1 && st.cells[1].level === 'ghost', `${d}: a ghost box steps to full after 3 stalls and stays there`);
  st = C.newState(r, 'en', 'fading'); st.at = 2;  /* the blank box ladder: blank → ghost → full */
  for (let k = 1; k <= 6; k++) drive(st, [{ x: 2, y: 2 }, { x: 98, y: 3 }, { x: 2, y: 97 }]);
  is(st.cells[2].shown === 'full' && st.cells[2].helped === 2 && st.cells[2].trace.corridor === 16, `${d}: a blank box climbs blank → ghost → full, corridor stays 16`);
  /* Rub out: ink and progress go, the level and the stalls stay */
  st = fresh(); { const f = flat(s0); drive(st, f.slice(0, Math.floor(f.length * 0.7))); }
  is(C.rubOut(st) && ST.progress(st.cells[0].trace) === 0 && st.cells[0].ink.length === 0 && st.cells[0].live.length === 0 && st.cells[0].fails === 1, `${d}: Rub out clears the box, keeps the stall count`);
  { const g = C.newState(r, 'en', 'alone'); drive(g, flat(g.strokes[0]).slice(0, 4)); is(C.rubOut(g) && g.cells[0].trace.corridor === C.CORRIDOR.ghost, `${d}: Rub out keeps the ghost box's corridor (${g.cells[0].trace.corridor})`); }
  if (st.strokes.length > 1) { drive(st, flat(s0)); is(C.rubOut(st) && st.cells[0].ink.length === 0 && C.strokeIndex(st) === 0, `${d}: Rub out after a finished stroke starts the box again`); }
}

/* 5. layout */
for (const W of [288, 296, 330, 360, 412, 479, 480, 520, 600, 660, 700, 820]) {
  const L = C.layout(W);
  if (W >= 480) is(L.mode === 'row' && L.cell === Math.min(220, Math.floor((W - 24) / 3)) && L.cell >= 152 && 3 * L.cell + 2 * L.gap <= W, `row of three ≥ 152 px at W=${W} (cell ${L.cell})`);
  else is(L.mode === 'single' && L.cell === Math.min(320, Math.round(W * 0.82)) && L.cell >= 236 && L.cell <= W && L.thumb === 44, `one box ≥ 236 px at W=${W} (cell ${L.cell})`);
}

console.log(`verify-writing-line-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);
