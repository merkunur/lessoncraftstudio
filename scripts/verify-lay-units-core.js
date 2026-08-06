#!/usr/bin/env node
/* =====================================================================
   verify-lay-units-core.js — the MEASURED, critic-armed build-gate for
   "Inchie's Garden Path / Lay the Units" (1.MD.A.2). Drives the REAL
   `evaluate` (loaded via `new Function`) over the REAL manifest. HALTS the
   build on any failure. The cognition is UNIT ITERATION + "length IS the
   count". The solver set proves no shortcut survives:

     • LAY-AND-ENUMERATE ORACLE tiles + enumerates every object 100%;
     • COUNT-THE-PRE-PLACED fails — the gaps/overlaps pre-placed row is
       DELIBERATELY INVALID (counting it is gap/overlap, never correct);
     • SLOT-DROP fails — no slots, a 1-step gap is a distinct REJECTED status;
     • READ-THE-NUMBER fails — no scale/ticks/live-count; a perfect layout with
       0 helpers counted is NOT correct (the count is its own act);
     • MIXED-UNIT fails — a gapless exact-span MIXED-width row is rejected;
     • GAP / OVERLAP / OVERHANG / SHORT / MISALIGNED-START each a distinct fail;
     • BRUTE-TAP-COUNT fails (the headline) — no numeral chooser; completion
       requires every distinct helper counted once;
     • PICK-THE-NEATEST-ROW fails on judge — ≥2 gapless-but-wrong foils.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'lay-units-core.js');
const MANIFEST = path.join(MINI, 'lay-units-activities.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.LayUnitsCore) throw new Error('core did not attach window.LayUnitsCore');
  return win.LayUnitsCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const C = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = row.params.rounds || [];
  const N = rounds.length || 1;
  const U = C.U;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- (1) LAY-AND-ENUMERATE ORACLE → 100% ---- */
  let oracleOK = 0;
  rounds.forEach((r) => {
    const oracle = C.legalAbut(r);
    const ev = C.evaluate(r, oracle, oracle.length);
    if (ev.status === 'correct' && ev.length === r.L) oracleOK++;
    else fails.push(`${r.id}: the lay-and-enumerate ORACLE did not measure correct (${ev.status}) — bad lattice / params`);
    /* NO_AUTOCOUNT_WITHOUT_CLAIM: the perfect layout with 0 counted is NOT correct */
    const noClaim = C.evaluate(r, oracle, 0);
    F(noClaim.status === 'placed-ok-awaiting-count', `${r.id}: a perfect layout with 0 helpers counted was accepted (read-the-number / auto-count)`);
  });

  /* ---- (2) COUNT-THE-PRE-PLACED fails (gaps/overlaps start INVALID) ---- */
  rounds.filter((r) => r.cog === 'gaps' || r.cog === 'overlaps').forEach((r) => {
    const ev = C.evaluate(r, r.prePlaced, (r.prePlaced || []).length);
    F(ev.status === 'gap' || ev.status === 'overlap', `${r.id}: the pre-placed row is NOT deliberately invalid (status ${ev.status}) — count-the-pre-placed would win`);
  });

  /* ---- (3) SLOT-DROP fails — a 1-step gap is a distinct REJECTED status ---- */
  const oneStepGap = [{ pos: 0, w: U }, { pos: U + 1, w: U }];   /* a single-step sliver */
  F(C.evaluate({ L: 2, unitWidth: U }, oneStepGap, null).status === 'gap', 'a 1-step gap is NOT a distinct rejected status (edge-snap / slot-drop)');

  /* ---- (4) MIXED-UNIT fails — gapless exact-span mixed widths rejected ---- */
  const mixed = [{ pos: 0, w: U }, { pos: U, w: 12 }, { pos: U + 12, w: 12 }];   /* abutted, mixed widths */
  F(C.evaluate({ L: 4, unitWidth: U }, mixed, mixed.length).status === 'mixed-size', 'a mixed-width abutted row was NOT rejected as mixed-size');

  /* ---- (5) GAP / OVERLAP / OVERHANG / SHORT / MISALIGNED each distinct ---- */
  const W = U;
  F(C.evaluate({ L: 3, unitWidth: W }, [{ pos: 0, w: W }, { pos: W, w: W }, { pos: W * 2 + 2, w: W }], null).status === 'gap', 'gap status broken');
  F(C.evaluate({ L: 3, unitWidth: W }, [{ pos: 0, w: W }, { pos: W, w: W }, { pos: W * 2 - 2, w: W }], null).status === 'overlap', 'overlap status broken');
  F(C.evaluate({ L: 3, unitWidth: W }, [{ pos: 0, w: W }, { pos: W, w: W }, { pos: W * 2, w: W }, { pos: W * 3, w: W }], null).status === 'overhang', 'overhang status broken');
  F(C.evaluate({ L: 4, unitWidth: W }, [{ pos: 0, w: W }, { pos: W, w: W }, { pos: W * 2, w: W }], null).status === 'short', 'short status broken');
  F(C.evaluate({ L: 3, unitWidth: W }, [{ pos: 3, w: W }, { pos: 3 + W, w: W }, { pos: 3 + W * 2, w: W }], null).status === 'misaligned-start', 'misaligned-start status broken');

  /* ---- (6) BRUTE-TAP-COUNT fails — no numeral chooser; partial count not accepted ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.countIsEnumeratedNotSelected, `${r.id}: the count is a numeral selection, not enacted enumeration (brute-tap surface)`);
    F(f.wrongCountTriggersRecount, `${r.id}: an incomplete count auto-accepts`);
    /* a valid layout counted PARTIALLY (units-1) is NOT correct */
    const oracle = C.legalAbut(r);
    if (oracle.length >= 2) F(C.evaluate(r, oracle, oracle.length - 1).status === 'placed-ok-awaiting-count', `${r.id}: a partial enumeration (n-1) was accepted as correct (brute-tap-count)`);
  });

  /* ---- (7) PICK-THE-NEATEST-ROW fails on judge — ≥2 neat-but-wrong foils ---- */
  rounds.filter((r) => r.cog === 'judge').forEach((r) => {
    const a = C.audit(r);
    F(a.correctJudgeIndex >= 0, `${r.id}: no correct judge row`);
    F(C.evaluate(r, r.judgeRows[a.correctJudgeIndex].helpers, r.judgeRows[a.correctJudgeIndex].helpers.length).status === 'correct', `${r.id}: the "correct" judge row does not evaluate correct`);
    F(a.neatWrongFoils >= 2, `${r.id}: <2 neat-but-wrong foils (${a.neatWrongFoils}) — pick-the-neatest-row would win`);
  });

  /* ---- (8) STRUCTURAL ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.noSlotArray, `${r.id}: slot array present`);
    F(f.latticeIsSubunit, `${r.id}: lattice not sub-unit`);
    F(f.noScaleOrTicks, `${r.id}: scale/ticks present`);
    F(f.mixedWidthRejected, `${r.id}: mixed width not rejected`);
    F(f.startNotchIsVisualOnly, `${r.id}: start notch not visual-only`);
    F(f.wholeUnitsOnly, `${r.id}: not whole-units-only`);
    F(f.supplyExceedsLength, `${r.id}: supply does not exceed length`);
    F(f.alsoTeachesEmpty, `${r.id}: also_teaches not empty (K.CC laundering)`);
    if (r.cog === 'inverse') { F(f.inverseRoundHasNoVerdict, `${r.id}: inverse has a verdict`); F(f.inverseRoundNonStandardUnits, `${r.id}: inverse small unit is not non-standard`); }
  });
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cognitions (need 7: span/gaps/overlaps/samesize/start/judge/inverse)`);
  ['span', 'gaps', 'overlaps', 'samesize', 'start', 'judge', 'inverse'].forEach((c) => F(cogs.has(c), `cognition "${c}" missing`));
  /* L + object variety (no "pencils are always 5") */
  const Ls = new Set(rounds.map((r) => r.L)), objs = new Set(rounds.map((r) => r.objectNoun));
  F(Ls.size >= 2, `L is not varied (${[...Ls].join(',')}) — meta-pattern risk`);
  F(objs.size >= 3, `objects not varied (${objs.size})`);

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}, L∈{${[...Ls].sort().join(',')}}, objects: ${objs.size}`);
  console.log(`  ${oracleOK === N ? 'ok  ' : 'FAIL'} lay-and-enumerate oracle measures ${oracleOK}/${N}`);
  console.log('  ok   pre-placed-invalid / 1-step-gap / mixed-size / gap/overlap/overhang/short/misaligned / partial-count-not-accepted / judge neat-wrong-foils all enforced');
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-LAY-UNITS FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-LAY-UNITS PASSED — the lay-and-enumerate ORACLE measures every object 100%; COUNT-THE-PRE-PLACED fails (gaps/overlaps start deliberately invalid); SLOT-DROP fails (a 1-step gap is a distinct rejected status); READ-THE-NUMBER fails (no scale; a perfect layout with 0 counted ≠ correct); MIXED-UNIT fails (a gapless mixed-width row is rejected); gap/overlap/overhang/short/misaligned each distinct; BRUTE-TAP-COUNT fails (no numeral chooser, a partial enumeration is not accepted); PICK-THE-NEATEST-ROW fails on judge (≥2 neat-but-wrong foils). Whole-units-only, no scale/ticks/slots, start-notch visual-only, also_teaches empty, 7 cognitions, L+object varied.');
  process.exit(0);
})();
