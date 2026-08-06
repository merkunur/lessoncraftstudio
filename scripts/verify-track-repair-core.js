#!/usr/bin/env node
/* =====================================================================
   verify-track-repair-core.js — the MEASURED, critic-armed build-gate for
   "Whistle Valley — Number-Line Track Repair" (1.NBT.A.1). Drives the REAL
   core (loaded via `new Function`) over the REAL manifest. HALTS the build
   on any failure. The solver set is scored BANK-WIDE (a few dense-by-1
   rounds are individually cheat-passable; the bank-wide accuracy stays
   <= chance because the distractor-laden skip/interval rounds dominate):

     • COUNT-ON / MAGNITUDE ORACLE → 100% (place each tie at valueToPct);
     • SORT_ASCENDING / SPACING solver → <= chance (places the N smallest
       tray values; an in-range distractor / non-uniform spacing defeats it);
     • SUCCESSOR_ONLY solver → <= chance (left-anchor +1,+2 — fails skip/
       interval where +1 is not a station);
     • BRUTE-FORCE → <= chance (no info → ~0%).

   Plus STRUCTURAL: continuous placement (no slots); in-range distractor on
   every non-dense round; >=1 round reaches >=100 (the ceiling); on-grade
   bounds; >=7 cogs; rote-count-from-1 == 0 (all any-start).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'track-repair-core.js');
const MANIFEST = path.join(MINI, 'track-repair-activities.json');

const CHANCE = 0.55;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.TrackRepairCore) throw new Error('core did not attach window.TrackRepairCore');
  return win.TrackRepairCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = (row && row.params && row.params.rounds) || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.placementContinuous, `${r.id}: not continuous placement`);
    F(f.onGrade, `${r.id}: out of grade bounds (0-120, step ∈ {1,5,10})`);
    F(f.noSequentialSolvingAudio, `${r.id}: sequential solving audio present (successor-leak)`);
    F(f.evaluateAtCommitOnly, `${r.id}: not commit-only`);
    F(f.reshuffleOnWrongCommit, `${r.id}: no reshuffle-on-wrong`);
    F(f.anchorsPinnedVisible, `${r.id}: anchors not pinned`);
    if (!Core.DENSE_COGS[r.cog]) {
      F(f.inRangeDistractorPresent, `${r.id}: non-dense round has NO in-range distractor (the station-check / anti-sort fails)`);
    }
  });

  /* ---- (B) >=7 cogs; ceiling; rote-from-1 ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  Core.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));
  F(rounds.some((r) => Core.facts(r).reachesCeiling), 'no round reaches the >=100 ceiling (the standard counts to 120)');
  const roteFrom1 = rounds.filter((r) => r.start === 0 || r.start === 1).length;
  F(roteFrom1 === 0, `${roteFrom1} round(s) start at 0/1 (rote-from-1 must be ~0 — count-on from ANY start)`);

  /* ---- (C) THE SOLVER SET (bank-wide) ---- */
  /* each solver returns a placements map {value: pct}; isRepaired grades it. */
  function oracle(a) { const p = {}; a.targets.forEach((t) => { p[t.value] = t.truePct; }); return p; }
  /* the SMART sorter: discard out-of-[start,end] (anyone can see they're off
     the segment), then sort ascending. In-range distractors SURVIVE the
     filter — that is what defeats it on skip/interval. */
  function inRange(a, round) { return a.trolley.filter((v) => v >= round.start && v <= round.end && a.present.indexOf(v) === -1); }
  function sortAscending(a, round) {
    const sortedTray = inRange(a, round).sort((x, y) => x - y);
    const sortedTargets = a.targets.slice().sort((x, y) => x.value - y.value);
    const pickN = sortedTray.slice(0, sortedTargets.length);
    const p = {};
    pickN.forEach((v, i) => { p[v] = sortedTargets[i].truePct; });   /* i-th smallest in-range tray value → i-th gap position */
    return p;
  }
  function spacing(a, round) {
    const sortedTray = inRange(a, round).sort((x, y) => x - y);
    const n = a.targets.length;
    const pickN = sortedTray.slice(0, n);
    const p = {};
    pickN.forEach((v, i) => { p[v] = ((i + 1) / (n + 1)) * 100; });   /* even spacing, ignores magnitude */
    return p;
  }
  function successorOnly(a, round) {
    /* place left-anchor +1, +2, ... at their valueToPct; only if that value is
       in the trolley (else the solver cannot find the tie → leaves it). */
    const left = Math.min.apply(null, a.present);
    const p = {};
    for (let k = 1; k <= a.targets.length; k++) {
      const v = left + k;
      if (a.trolley.indexOf(v) !== -1) p[v] = Core.valueToPct(v, round.start, round.end);
    }
    return p;
  }
  function brute(a) { const p = {}; a.targets.forEach((t, i) => { p[a.trolley[i % a.trolley.length]] = ((i * 37) % 100); }); return p; }

  const solvers = { oracle, sortAscending, spacing, successorOnly, brute };
  const score = { oracle: 0, sortAscending: 0, spacing: 0, successorOnly: 0, brute: 0 };
  rounds.forEach((r) => {
    const a = Core.audit(r);
    Object.keys(solvers).forEach((name) => {
      if (Core.isRepaired(r, solvers[name](a, r))) score[name]++;
    });
  });

  F(score.oracle === N, `count-on/magnitude oracle ${score.oracle}/${N} (must be 100%)`);
  ['sortAscending', 'spacing', 'successorOnly', 'brute'].forEach((name) => {
    F(score[name] / N <= CHANCE, `${name} solver scores ${pct(score[name] / N)} bank-wide (> ${pct(CHANCE)} ceiling)`);
  });

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`dense-by-1 (sort-passable): ${rounds.filter((r) => Core.DENSE_COGS[r.cog]).length} | non-dense (distractor-laden): ${rounds.filter((r) => !Core.DENSE_COGS[r.cog]).length}`);
  console.log('solvers (bank-wide):');
  console.log(`  ${score.oracle === N ? 'ok  ' : 'FAIL'} count-on/magnitude oracle: ${score.oracle}/${N}`);
  ['sortAscending', 'spacing', 'successorOnly', 'brute'].forEach((name) => {
    console.log(`  ${score[name] / N <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / N)} (chance ceiling ${pct(CHANCE)})`);
  });
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-TRACK-REPAIR-CORE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-TRACK-REPAIR-CORE PASSED — the count-on/magnitude oracle heals 100% (continuous place-at-distance); SORT_ASCENDING / SPACING / SUCCESSOR_ONLY / BRUTE all score <= chance bank-wide (the in-range distractors + non-uniform spacing on the skip/interval majority defeat them, even though a few dense-by-1 rounds are individually sort-passable); every non-dense round carries an in-range distractor; >=1 round reaches the >=100 ceiling; on-grade; >=7 cogs; rote-from-1 == 0.');
  process.exit(0);
})();
