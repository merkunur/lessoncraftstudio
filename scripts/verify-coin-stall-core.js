#!/usr/bin/env node
/* =====================================================================
   verify-coin-stall-core.js — the MEASURED, critic-armed build-gate for
   "Pip's Market Stall" (2.MD.C.8). Drives the REAL core (loaded via
   `new Function`) over the REAL manifest. HALTS the build on any failure.
   The cognition is DENOMINATION-VALUE KNOWLEDGE (value invisible on the coin,
   retrieved from memory). The solver set proves no shortcut survives:

     • VALUE-COMPOSER ORACLE → 100% (reads the coinSet VALUES → composes/reads);
     • COUNT-PIPS → <= chance (treats every coin as worth 1 / cardinality);
     • ALL-PENNIES → <= chance (penny <=4 < target, no all-penny path);
     • NUMBER-CHASE → <= chance (no live total to hill-climb);
     • BRUTE-FORCE → <= chance (reshuffle-on-wrong kills cross-attempt memory);
     • LEGEND-MATCH → PASS scaffolded, FAIL legend-free (only the 'full' tier
       pairs coin↔value; >=60% of the deck is legend-free);
     • SIZE-GREEDY → <= chance + 0% on the dime round (composes by DIAMETER;
       the dime is the smallest coin but worth more than the bigger nickel).

   Plus STRUCTURAL: value-not-count; ¢/$ symbols; >=1 word-problem; >=1 $-
   crossing; >=7 structurally-distinct cogs; penny <=4; legend-free >=0.6;
   make-amount needs >=2 denominations; >=1 dime-value-over-size round.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'coin-stall-core.js');
const MANIFEST = path.join(MINI, 'coin-stall-activities.json');
const CHANCE = 0.45;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.CoinStallCore) throw new Error('core did not attach window.CoinStallCore');
  return win.CoinStallCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const C = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const coinSet = row.params.coinSet;
  const rounds = (row.params.rounds || []).map((r) => Object.assign({ coinSet }, r));
  const N = rounds.length || 1;
  const valOf = (den) => C.valueOf(coinSet, den);
  const diaOf = (den) => C.diameterOf(coinSet, den);

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- enumerate purse subsets summing exactly to a target value ---- */
  function subsetsToValue(purse, target, excludeDen) {
    const vals = purse.map(valOf), out = [];
    (function rec(i, cur, sum) {
      if (sum === target) { out.push(cur.slice()); return; }
      if (sum > target || i >= purse.length) return;
      if (!(excludeDen && purse[i] === excludeDen)) { cur.push(purse[i]); rec(i + 1, cur, sum + vals[i]); cur.pop(); }
      rec(i + 1, cur, sum);
    })(0, [], 0);
    return out;
  }

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.noValueNumeralOnCoin, `${r.id}: value numeral on the coin`);
    F(f.noLiveGauge, `${r.id}: a live total gauge is present`);
    F(f.scoredByValueNotCount, `${r.id}: not scored by value`);
    F(f.reshuffleOnWrong, `${r.id}: no reshuffle-on-wrong`);
    F(f.adjustDontWipe, `${r.id}: not adjust-don't-wipe`);
    F(f.wordProblemFramed, `${r.id}: no word-problem scenario`);
    if (r.purse) F(f.pennyOK, `${r.id}: penny count ${f.pennyCount} > 4`);
    if (r.cog === 'make-amount') F(f.solutionNeeds2Denominations, `${r.id}: make-amount solvable with ONE denomination (all-pennies/single-den hole)`);
  });

  /* ---- (B) >=7 cogs; legend-free >=0.6; dime round; $-crossing ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  C.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));
  const legendFree = rounds.filter((r) => C.facts(r).legendFree).length;
  F(legendFree / N >= 0.6, `legend-free fraction ${pct(legendFree / N)} (< 60%)`);
  F(rounds.some((r) => C.facts(r).dimeValueOverSize), 'no dime-value-over-size fewest round');
  F(rounds.some((r) => C.facts(r).dollarCrossing), 'no round crosses $1 (the $ symbol)');

  /* ---- (C) THE SOLVER SET (scored over the deck) ---- */
  /* each solver returns {trayDens} for COMPOSE or {choice} for CHOOSE. */
  function grade(r, out) {
    if (C.COMPOSE_COGS[r.cog]) return C.gradeCompose(r, out.trayDens || []);
    return C.gradeChoose(r, out.choice);
  }

  function oracle(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: a.correctChoice };
    const ex = r.cog === 'trade' ? r.offer.den : null;
    const subs = subsetsToValue(r.purse, a.target, ex);
    let pick = subs[0] || [];
    if (r.cog === 'fewest') pick = subs.reduce((m, s) => (!m || s.length < m.length ? s : m), null) || [];
    else if (r.cog === 'two-ways') pick = subs.find((s) => !C.sameMultiset(s, r.shownSet)) || subs[0] || [];
    return { trayDens: pick };
  }
  /* count-pips: every coin is worth 1 (cardinality); composes/judges by count. */
  function countPips(a, r) {
    if (r.cog === 'count-set') return { choice: (r.pile || []).reduce((s, p) => s + p.count, 0) };
    if (r.cog === 'enough') { const n = (r.pile || []).reduce((s, p) => s + p.count, 0); return { choice: C.enoughVerdict(n - r.price) }; }
    return { trayDens: r.purse.slice() };   /* dump all coins (count-driven) → value != target */
  }
  /* all-pennies: only pennies (<=4) → can't reach target. */
  function allPennies(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: r.cog === 'count-set' ? 0 : 'short' };
    return { trayDens: r.purse.filter((d) => d === 'penny') };
  }
  /* number-chase: WITH a live total it would hill-climb; with NONE (the assert)
     it is blind — it can't know when to stop, so it dumps the purse (overshoots). */
  function numberChase(a, r) {
    if (r.cog === 'count-set') return { choice: (r.options || [])[0] };
    if (r.cog === 'enough') return { choice: 'short' };
    return { trayDens: r.purse.slice() };       /* no gauge → can't stop → overshoot */
  }
  /* brute: a fixed wrong attempt (reshuffle-on-wrong → no memory). */
  function brute(a, r) {
    if (r.cog === 'count-set') return { choice: (r.options || [])[1] };
    if (r.cog === 'enough') return { choice: 'over' };
    return { trayDens: r.purse.slice(0, 1) };
  }
  /* legend-match: full tier → reads coin↔value (oracle); else no values → count-pips. */
  function legendMatch(a, r) { return r.legendTier === 'full' ? oracle(a, r) : countPips(a, r); }
  /* size-greedy: value model = DIAMETER (bigger coin = more) → cents never match. */
  function sizeGreedy(a, r) {
    if (r.cog === 'count-set') return { choice: (r.pile || []).reduce((s, p) => s + p.count * diaOf(p.den), 0) };
    if (r.cog === 'enough') { const d = (r.pile || []).reduce((s, p) => s + p.count * diaOf(p.den), 0); return { choice: C.enoughVerdict(d - r.price) }; }
    /* greedy by diameter desc until the DIAMETER sum reaches the target */
    const order = r.purse.slice().sort((x, y) => diaOf(y) - diaOf(x));
    const tray = []; let sum = 0;
    for (const d of order) { if (sum + diaOf(d) <= a.target) { tray.push(d); sum += diaOf(d); } }
    return { trayDens: tray };
  }

  const solvers = { oracle, countPips, allPennies, numberChase, brute, legendMatch, sizeGreedy };
  const score = {}; Object.keys(solvers).forEach((k) => (score[k] = 0));
  const legendFreeIdx = [];
  let legendMatchOnFree = 0, sizeGreedyDimeFail = true;
  rounds.forEach((r, i) => {
    const a = C.audit(r);
    Object.keys(solvers).forEach((name) => { if (grade(r, solvers[name](a, r))) score[name]++; });
    if (C.facts(r).legendFree) { legendFreeIdx.push(i); if (grade(r, legendMatch(a, r))) legendMatchOnFree++; }
    if (C.facts(r).dimeValueOverSize && grade(r, sizeGreedy(a, r))) sizeGreedyDimeFail = false;
  });

  F(score.oracle === N, `value-composer oracle ${score.oracle}/${N} (must be 100%)`);
  ['countPips', 'allPennies', 'numberChase', 'brute', 'legendMatch', 'sizeGreedy'].forEach((name) => {
    F(score[name] / N <= CHANCE, `${name} solver scores ${pct(score[name] / N)} over the deck (> ${pct(CHANCE)} ceiling)`);
  });
  /* headline asserts */
  F(legendMatchOnFree === 0, `legend-match passed ${legendMatchOnFree} legend-FREE round(s) (must be 0 — the legend-free majority carries the standard)`);
  F(score.legendMatch > 0, 'legend-match passed 0 scaffolded rounds (the gate must PROVE the cheat exists on full-legend rounds)');
  F(sizeGreedyDimeFail, 'size-greedy PASSED a dime-value-over-size round (the smaller dime must beat the bigger nickel)');

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`legend-free: ${legendFree}/${N} (${pct(legendFree / N)}) | $-crossing: ${rounds.filter((r) => C.facts(r).dollarCrossing).length} | dime-over-size: ${rounds.filter((r) => C.facts(r).dimeValueOverSize).length}`);
  console.log('solvers (over the deck):');
  console.log(`  ${score.oracle === N ? 'ok  ' : 'FAIL'} value-composer oracle: ${score.oracle}/${N}`);
  ['countPips', 'allPennies', 'numberChase', 'brute', 'legendMatch', 'sizeGreedy'].forEach((name) => {
    console.log(`  ${score[name] / N <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / N)} (chance ${pct(CHANCE)})`);
  });
  console.log(`  legend-match on legend-FREE rounds: ${legendMatchOnFree}/${legendFreeIdx.length} (must be 0); size-greedy fails the dime round: ${sizeGreedyDimeFail}`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-COIN-STALL FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-COIN-STALL PASSED — the value-composer oracle composes/reads 100% from the denomination VALUES; COUNT-PIPS / ALL-PENNIES / NUMBER-CHASE / BRUTE / SIZE-GREEDY all <= chance; LEGEND-MATCH passes ONLY the scaffolded full-legend rounds and 0 legend-free rounds (>=60% of the deck is legend-free); size-greedy fails the dime-value-over-size round (the smaller dime beats the bigger nickel). Value-not-count; ¢/$ symbols; >=1 word-problem + >=1 $-crossing; >=7 structurally-distinct cogs; penny <=4; make-amount needs >=2 denominations.');
  process.exit(0);
})();
