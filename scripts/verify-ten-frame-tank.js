#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame-tank.js — build-time MEASURED gate for the unitizing
   cognition behind "Dewey's Ten-Tank" (CCSS K.NBT.A.1). Loads the REAL
   mini tools/ten-frame-tank-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure):

     #1 GENUINE COMPOSER passes — seal/place a ten + the exact ones (or separate
        / reveal-then-judge) → won, for every round.
     #2 COUNT-13-SINGLES FAILS — every "one" lands in the ones frame; there is NO
        path to put a single in the left → sealedTenPlaced stays false,
        singleDotPlacedInLeft stays 0 → won false (13 loose is unconstructible).
     #3 FILL-WITHOUT-A-FULL-TEN FAILS — 7 ones, no sealed ten → won false.
     #4 STOP-BY-TIMING N/A — no setTimeout/setInterval/rAF gates the win.
     #5 TOKEN-PLACEMENT FAILS — tenUnitSubDots()===10 (visible 2×5, no bare token)
        AND place-a-ready-ten is REFUSED until sealedThisSession (the #1→#2 lock).
     #6 SEAL collapses 10→1 — completing a ten flips ten in-progress dots to one
        sealedTenPlaced unit.
     #7 BRUTE-FORCE FAILS on #5 (repair) + #7 (compare) — a random-pick / judge-
        without-revealing solver passes < 50% across the deck.
     #8 DECOMPOSE symmetry — the ten moves AS a unit (no crack-to-singles path).
     #9 RANGE 11–19 (≤10 only on the flagged on-ramp), exactly one ten, ones∈1-9.
     #10 ≥7 distinct terminal-acts + distinct ids.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-tank-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TenFrameTankCore;
if (!Core) { console.error('FAIL: ten-frame-tank-core.js did not define window.TenFrameTankCore'); process.exit(1); }
const S = Core.SOLVERS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'ten-tank-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

/* #4 no timed surface gating the win */
check(!/setTimeout|setInterval|requestAnimationFrame/.test(coreSrc), 'core has a timer/rAF (motor-timing must be impossible)');
/* #5 the ready-made ten is visibly ten */
check(Core.tenUnitSubDots() === 10, 'tenUnitSubDots() !== 10 (a bare-token ten leaks)');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`;

  /* #1 genuine composer passes (sessionSealed=true so ready-ten is allowed) */
  check(S.genuineComposer(r, true).won, `${L}: the genuine composer does NOT win`);

  /* #9 range + structure */
  if (r.type !== 'compare') {
    if (Core.isOnRamp(r)) check(r.target <= 10, `${L}: on-ramp target ${r.target} > 10`);
    else check(r.target >= 11 && r.target <= 19, `${L}: target ${r.target} outside 11–19`);
    check(Core.tensOf(r) === 1 || r.target === 10, `${L}: not exactly one ten`);
    check(Core.onesOf(r) >= 0 && Core.onesOf(r) <= 9, `${L}: ones ${Core.onesOf(r)} outside 0–9`);
  }

  if (r.type !== 'compare' && r.type !== 'decompose' && r.type !== 'repair') {
    /* #2 count-13-singles fails — EXCEPT regroup, where building loose ones to a
       10th-snap IS the intended unitizing mechanic (a ten still gets MADE). */
    if (r.mode !== 'regroup') {
      const c13 = S.count13SinglesSolver(r);
      check(!c13.won && !c13.sealedTenPlaced && c13.singleDotPlacedInLeft === 0, `${L}: 13 loose singles reached a win (the unitizing miss) — sealed=${c13.sealedTenPlaced} singlesInLeft=${c13.singleDotPlacedInLeft}`);
    } else {
      /* regroup still must MAKE a ten: 7 loose (no snap) never wins */
      check(!S.fillWithoutFullTenSolver(r).won, `${L}: regroup won with 7 loose ones (no ten made)`);
    }
    /* #3 fill-without-a-full-ten fails */
    check(!S.fillWithoutFullTenSolver(r).won, `${L}: a structure with no sealed ten won`);
  }

  /* #6 seal collapses 10→1 (compose seal rounds) */
  if (r.type === 'seal') {
    const s = Core.newState(r, false);
    for (let i = 0; i < 9; i++) Core.addToTen(r, s);
    check(!s.sealedTenPlaced, `${L}: sealed before the 10th dot`);
    Core.addToTen(r, s);
    check(s.sealedTenPlaced && s.sealedThisSession, `${L}: the 10th dot did not SEAL the ten (10→1 collapse)`);
  }

  /* #8 decompose: ten moves as a unit, no crack-to-singles on the win-path */
  if (r.mode === 'decompose') {
    const s = Core.newState(r, true); Core.dragTenToTens(r, s); for (let i = 0; i < Core.onesOf(r); i++) Core.dragOneToOnes(r, s);
    check(Core.validate(r, s) && s.tenInTensTray && s.singleDotPlacedInLeft === 0, `${L}: decompose win-path did not move the ten AS a unit`);
  }
});

/* #5 the #1→#2 ordering lock: place-a-ready-ten REFUSED until a seal this session */
const readyRound = rounds.find((r) => r.type === 'ready-ten');
check(!!readyRound, 'no ready-ten round');
if (readyRound) {
  const t = S.tokenBeforeSealSolver(readyRound);
  check(t.rejected && !t.sealedTenPlaced && t.subDots === 10, 'place-a-ready-ten was NOT refused before a seal (the #1→#2 lock leaks)');
  // and after sealing this session, the genuine composer wins it
  check(S.genuineComposer(readyRound, true).won, 'ready-ten round unwinnable even after a session seal');
}

/* #7 brute-force fails the deck on repair + compare (random < 50%) */
['repair', 'compare'].forEach((type) => {
  const rr = rounds.filter((r) => r.type === type); if (!rr.length) return;
  let wins = 0, n = 0;
  rr.forEach((r, ri) => { for (let t = 0; t < 600; t++) { if (S.bruteForceSolver(r, mulberry32(((ri + 3) * 2654435761 ^ (t + 1) * 40503) >>> 0)).won) wins++; n++; } });
  check(wins / n < 0.5, `brute-force passes ${(wins / n * 100).toFixed(0)}% of ${type} rounds (≥50% — not a committed construction)`);
});
/* compare: judge-without-reveal is a no-op (the reveal-both-first gate) */
const cmp = rounds.find((r) => r.type === 'compare');
if (cmp) { const s = Core.newState(cmp, true); const res = Core.judge(cmp, s, 'A'); check(res.rejected && s.picked == null, 'compare allowed a judge BEFORE revealing both (the gate leaks)'); }

/* #10 distinctness */
const types = new Set(rounds.map((r) => r.type));
check(types.size >= 7, `only ${types.size} distinct terminal-acts (<7): ${[...types].join(',')}`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');

if (failures.length) {
  console.error(`FAIL — ${failures.length} ten-frame-tank violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${types.size} distinct terminal-acts: ` +
  `genuine composer wins all; count-13-singles unconstructible (no single-in-left path, sealed required); fill-without-a-full-ten loses; ` +
  `the seal collapses 10→1; the ready-made ten is visibly 10 + REFUSED before a session-seal (#1→#2 lock); ` +
  `brute-force < 50% on repair+compare (committed construction / reveal-both-then-judge); decompose moves the ten AS a unit; 11–19, one ten, ones 0–9; no motor-timing.`);
process.exit(0);
