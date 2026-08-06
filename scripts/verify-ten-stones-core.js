#!/usr/bin/env node
/* =====================================================================
   verify-ten-stones-core.js — the MEASURED, critic-armed build-gate for
   "Lily's Ten Stones" (1.OA.C.6). Drives the REAL core (loaded via
   `new Function`) over the REAL manifest. HALTS the build on any failure.
   The cognition is the MAKE-TEN DECOMPOSITION as a spatial bridge (declare the
   to-ten bond, land on 10, then the remainder). The solver set proves no
   shortcut survives:

     • DECLARE-THE-BOND ORACLE → 100% (declares [10-start, target-10] up, or the
       subtraction mirror down → lands on the target);
     • SPIN-TO-TEN-SEARCHER → <= chance (THE critic headline: a no-bond probe —
       there is NO block-gradient to search; evaluate returns a CATEGORICAL
       wrong-to-ten with NO proximity info → it cannot converge);
     • ONE-BIG-HOP → <= chance (a single hop straight to target never lands on 10
       → wrong-to-ten; STRATEGY_STRUCTURE_REQUIRED);
     • COUNT-BY-ONES → <= chance (unit hops; the first bond ⬚=1 != to-ten);
     • GLOW-CHASER → <= chance (no per-hop signal: the core has NO gradeHop API);
     • OVERSHOOT → <= chance (bonds summing past target → wrong-remainder).

   Plus the NO-SEARCH PROOF: for every bridge round, a wrong first-bond is
   'wrong-to-ten' REGARDLESS of how close it is to the answer (no gradient).
   Plus STRUCTURAL: within-20; one-ten-bridged-once; every bridge crosses ten
   (strategy-not-fluency); a full-but-uncommitted bridge is NOT correct;
   also_teaches empty; >=7 distinct rounds; >=1 subtraction-bridge + >=1 non-
   crossing guard + >=1 choose-anchor + >=1 near-double.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'ten-stones-core.js');
const MANIFEST = path.join(MINI, 'ten-stones-activities.json');
const CHANCE = 0.45;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.TenStonesCore) throw new Error('core did not attach window.TenStonesCore');
  return win.TenStonesCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const C = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = row.params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);
  F(!(row.alignment && row.alignment.also_teaches && row.alignment.also_teaches.length), 'alignment has a non-empty also_teaches (1.OA.C.6 teaches NOTHING else here)');

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.withinTwenty, `${r.id}: operands/target exceed 0..20`);
    F(f.oneTenBridgedOnce, `${r.id}: not one-ten-bridged-once`);
    F(f.bridgeCrossesTen, `${r.id}: a bridge round that does NOT cross ten (strategy-not-fluency violated)`);
    F(f.bondDeclaredBeforeHop, `${r.id}: bond not declared before the hop`);
    F(f.gapToTenNotSearchable, `${r.id}: a searchable gap-to-ten gradient is present`);
    F(f.noGlowTelegraph, `${r.id}: a per-hop glow telegraph is present`);
  });

  /* ---- (B) cog coverage + the named misconception rounds ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  C.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));
  F(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');
  F(rounds.some((r) => r.cog === 'decompose'), 'no subtraction bridge-DOWN round');
  F(rounds.some((r) => r.cog === 'findten' && !C.crossesTen(r)), 'no non-crossing find-where-ten guard round');
  F(rounds.some((r) => r.cog === 'findten' && C.crossesTen(r)), 'no crossing find-where-ten round');
  F(rounds.some((r) => r.cog === 'anchor'), 'no choose-the-bridging-anchor round');
  F(rounds.some((r) => r.cog === 'equiv'), 'no near-double round');

  /* ---- (C) no-mid-build-signal + structure: bridge rounds ---- */
  const bridge = rounds.filter((r) => C.BRIDGE_COGS[r.cog]);
  bridge.forEach((r) => {
    const a = C.audit(r);
    F(C.evaluate(r, [a.toTen, a.remainder], false).status === 'placed-ok-awaiting-commit', `${r.id}: a full bridge is graded BEFORE the commit`);
    F(C.evaluate(r, [a.toTen, a.remainder], true).status === 'correct', `${r.id}: a committed correct bridge is not 'correct'`);
    /* STRATEGY_STRUCTURE_REQUIRED — one big hop straight to target never lands on 10 */
    F(C.evaluate(r, [Math.abs(r.target - r.start)], true).status !== 'correct', `${r.id}: one-big-hop (no land on 10) was accepted`);
  });

  /* ---- (D) THE NO-SEARCH PROOF — a wrong first bond is categorical, no gradient ---- */
  let gradientLeak = false;
  bridge.forEach((r) => {
    const a = C.audit(r);
    const probes = [a.toTen - 1, a.toTen + 1, 1, a.toTen + 3].filter((v) => v !== a.toTen && v >= 0);
    const statuses = probes.map((v) => C.evaluate(r, [v], false).status);
    if (!statuses.every((s) => s === 'wrong-to-ten')) gradientLeak = true;   /* every wrong probe is the SAME status → no proximity gradient */
  });
  F(!gradientLeak, 'the gap-to-ten is SEARCHABLE — a wrong first bond returns a non-uniform status (a proximity gradient leaks)');

  /* ---- (E) THE SOLVER SET (scored over the scored rounds) ---- */
  const scored = rounds.filter((r) => C.isScored(r.cog));
  const SN = scored.length || 1;
  function grade(r, out) {
    if (C.BRIDGE_COGS[r.cog]) return C.gradeBridge(r, out.declared || []);
    if (C.CHOOSE_COGS[r.cog]) return C.gradeChoose(r, out.choice);
    return false;
  }
  /* a deterministic WRONG choice for the cheat solvers on choose cogs. */
  function wrongChoice(r) {
    const c = C.audit(r).correctChoice;
    if (r.cog === 'anchor') return Math.min(r.a, r.b);
    if (r.cog === 'findten') return c === 'yes' ? 'no' : 'yes';
    if (r.cog === 'equiv') { const o = (r.options || []).find((d) => String(d) !== String(c)); return o == null ? c : o; }
    return c;
  }
  function oracle(a, r) { return C.BRIDGE_COGS[r.cog] ? { declared: [a.toTen, a.remainder] } : { choice: a.correctChoice }; }
  /* spin-to-ten: a no-bond probe — declares a spun value (the start) it never computed → wrong-to-ten; no gradient to climb. */
  function spinToTen(a, r) { return C.BRIDGE_COGS[r.cog] ? { declared: [r.start] } : { choice: wrongChoice(r) }; }
  /* one-big-hop: a single hop straight to the target (no land on 10). */
  function oneBigHop(a, r) { return C.BRIDGE_COGS[r.cog] ? { declared: [Math.abs(r.target - r.start)] } : { choice: wrongChoice(r) }; }
  /* count-by-ones: unit hops; the first bond is 1. */
  function countByOnes(a, r) { const n = Math.abs(r.target - r.start); const arr = []; for (let i = 0; i < n; i++) arr.push(1); return C.BRIDGE_COGS[r.cog] ? { declared: arr } : { choice: wrongChoice(r) }; }
  /* glow-chaser: chasing a per-hop signal that doesn't exist → a plausible-wrong sequence. */
  function glowChaser(a, r) { return C.BRIDGE_COGS[r.cog] ? { declared: [a.remainder, a.toTen] } : { choice: wrongChoice(r) }; }  /* swapped order → wrong-to-ten */
  /* overshoot: right to-ten, remainder too big. */
  function overshoot(a, r) { return C.BRIDGE_COGS[r.cog] ? { declared: [a.toTen, a.remainder + 2] } : { choice: wrongChoice(r) }; }

  const solvers = { oracle, spinToTen, oneBigHop, countByOnes, glowChaser, overshoot };
  const score = {}; Object.keys(solvers).forEach((k) => (score[k] = 0));
  scored.forEach((r) => { const a = C.audit(r); Object.keys(solvers).forEach((name) => { if (grade(r, solvers[name](a, r))) score[name]++; }); });

  F(score.oracle === SN, `declare-the-bond oracle ${score.oracle}/${SN} (must be 100%)`);
  ['spinToTen', 'oneBigHop', 'countByOnes', 'glowChaser', 'overshoot'].forEach((name) => {
    F(score[name] / SN <= CHANCE, `${name} solver scores ${pct(score[name] / SN)} over the scored deck (> ${pct(CHANCE)} ceiling)`);
  });

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds (${SN} scored), cogs: ${[...cogs].sort().join('/')}`);
  console.log(`bridge: ${bridge.length} | subtraction: ${rounds.filter((r) => r.cog === 'decompose').length} | findten(cross/no): ${rounds.filter((r) => r.cog === 'findten' && C.crossesTen(r)).length}/${rounds.filter((r) => r.cog === 'findten' && !C.crossesTen(r)).length} | anchor: ${rounds.filter((r) => r.cog === 'anchor').length} | equiv: ${rounds.filter((r) => r.cog === 'equiv').length}`);
  console.log('solvers (over the scored deck):');
  console.log(`  ${score.oracle === SN ? 'ok  ' : 'FAIL'} declare-the-bond oracle: ${score.oracle}/${SN}`);
  ['spinToTen', 'oneBigHop', 'countByOnes', 'glowChaser', 'overshoot'].forEach((name) => {
    console.log(`  ${score[name] / SN <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / SN)} (chance ${pct(CHANCE)})`);
  });
  console.log(`  no-search proof (a wrong first bond is categorical, no gradient): ${!gradientLeak}`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-TEN-STONES FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-TEN-STONES PASSED — the declare-the-bond oracle bridges every round 100%; SPIN-TO-TEN-SEARCHER / ONE-BIG-HOP / COUNT-BY-ONES / GLOW-CHASER / OVERSHOOT all <= chance; the NO-SEARCH proof holds (a wrong first bond is a categorical wrong-to-ten with NO proximity gradient → nothing to search). Within-20; one-ten-bridged-once; every bridge crosses ten (strategy-not-fluency); a full-but-uncommitted bridge is NOT correct; also_teaches empty; >=7 distinct rounds; subtraction bridge-down + non-crossing guard + choose-anchor + near-double all present.');
  process.exit(0);
})();
