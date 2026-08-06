#!/usr/bin/env node
/* =====================================================================
   verify-vet-diagnosis.js — the MEASURED, critic-armed build-gate for
   "Vet's Diagnosis Window" (1.OA.A.1). Drives the REAL core (loaded via
   `new Function`) over the REAL manifest. HALTS the build on any failure.
   The cognition is MODEL-THE-SITUATION (bind each known to its iconic role,
   mark the unknown, leave the decoy out) → the number is DERIVED. The
   solver set proves no shortcut survives:

     • SITUATION-MODELER ORACLE → 100% (correct binding + derived number);
     • MAGNITUDE-HEURISTIC (biggest tile incl. the decoy → the most
       container-like known slot) → <= chance: the magnitude-BREAKING cells
       (takefrom-change, compare-bigger) bind wrong outright, and on every
       FRIENDLY cell the DECOY (> the container known) lures the biggest tile
       into the container slot → wrong binding. THE HEADLINE — built first;
     • KEYWORD-MATCH (best-case binding GRANTED + keyword op) → <= chance
       (reversed on start-unknown / inconsistent-compare — a conservative
       upper bound: granting the binding only makes the gate stricter);
     • NUMBER-GRAB (sum of the two knowns) → <= chance;
     • LABEL-MATCH → 0% (slots iconic; the story carries no role token →
       no signal); asserted by noSlotLabelWordInQuestion (a literal grep);
     • BRUTE-FORCE (a swapped binding) → <= chance.

   Plus STRUCTURAL: answer derived not authored; iconic slots; full binding
   graded; enactment hides the unknown; a decoy on every round; within-20
   (result on-ramp within-10); >=7 distinct CGI cells; result capped;
   >=1 start-unknown + >=1 inconsistent-compare (reversed).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'vet-diagnosis-core.js');
const MANIFEST = path.join(MINI, 'vet-diagnosis-activities.json');

const CHANCE = 0.45;
/* the magnitude reader's "containerness" of each role — biggest number goes
   to the most total-like slot. The deck is balanced so this is wrong. */
const CONTAINER = { result: 5, whole: 5, bigger: 5, start: 4, partA: 3, partB: 3, change: 2, smaller: 2, difference: 1 };

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.VetDiagnosisCore) throw new Error('core did not attach window.VetDiagnosisCore');
  return win.VetDiagnosisCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';
const tileVal = (a, id) => { const t = a.tiles.filter((x) => x.id === id)[0]; return t ? t.value : null; };

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
    F(f.answerDerivedNotAuthored, `${r.id}: has an authored 'answer' field (number-grab surface)`);
    F(f.slotsIconicUnlabeled, `${r.id}: slots not iconic`);
    F(f.fullBindingGraded, `${r.id}: full binding not graded`);
    F(f.enactmentHidesUnknown, `${r.id}: enactment does not hide the unknown`);
    F(f.hasDecoy, `${r.id}: NO magnitude-decoy tile (the 4th-tile reject is required)`);
    F(f.noSlotLabelWordInQuestion, `${r.id}: the story echoes a role token (label-match leak)`);
    F(f.withinTwenty, `${r.id}: out of range (within-20; result on-ramp within-10)`);
    /* each round: exactly 3 tiles (2 knowns + 1 decoy), 3 slots, 1 unknown */
    F((r.tiles || []).length === 3, `${r.id}: expected 3 tiles, got ${(r.tiles || []).length}`);
    F((r.slots || []).length === 3, `${r.id}: expected 3 slots, got ${(r.slots || []).length}`);
    F((r.slots || []).filter((s) => s.correct === null).length === 1, `${r.id}: must have exactly ONE unknown slot`);
    /* the unknown slot's role === unknownRole */
    const unkSlot = (r.slots || []).filter((s) => s.correct === null)[0];
    F(unkSlot && unkSlot.role === r.unknownRole, `${r.id}: unknown slot role != unknownRole`);
    /* the decoy is not any slot's correct tile */
    F((r.slots || []).every((s) => s.correct !== r.decoyId), `${r.id}: the decoy is wired as a correct tile`);
  });

  /* ---- (B) >=7 cogs; result capped; reversed (inconsistent) cells; start-unknown ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  const resultCount = rounds.filter((r) => r.cog === 'result').length;
  F(resultCount <= 2, `result on-ramp appears ${resultCount} times (must be capped <=2)`);
  F(rounds.some((r) => r.cog === 'addto-start' || r.cog === 'takefrom-start'), 'no start-unknown round (the Grade-1 frontier)');
  const reversed = rounds.filter((r) => Core.facts(r).reversed).length;
  F(reversed >= 4, `only ${reversed} keyword-reversed round(s) (need >=4 so keyword is not a reliable signal)`);

  /* ---- (C) THE SOLVER SET (scored over the deck) ---- */
  /* each solver returns { binding: {role: tileId|'?'}, number }. gradeAttempt
     requires BOTH the full binding AND the derived number. */
  const knownSlotsOf = (a) => a.roles.filter((role) => role !== a.unknownRole);

  function oracle(a) {
    const binding = {}; a.roles.forEach((role) => { binding[role] = a.correct[role]; });
    return { binding, number: a.answer };
  }
  /* THE HEADLINE — biggest tile (INCLUDING the decoy) → the most container-like
     known slot; derive the number from its own (wrong) binding. */
  function magnitude(a) {
    const ks = knownSlotsOf(a).slice().sort((x, y) => (CONTAINER[y] || 0) - (CONTAINER[x] || 0));
    const tiles = a.tiles.slice().sort((x, y) => y.value - x.value);
    const binding = {}; binding[a.unknownRole] = '?';
    ks.forEach((role, i) => { binding[role] = tiles[i].id; });
    const known = {}; ks.forEach((role) => { known[role] = tileVal(a, binding[role]); });
    return { binding, number: Core.solveUnknown(a.diagram, a.op, known, a.unknownRole) };
  }
  /* keyword: GRANT the correct binding (a conservative upper bound) + a number
     from the dominant story keyword's op on the two known values. */
  function keyword(a) {
    const binding = {}; a.roles.forEach((role) => { binding[role] = a.correct[role]; });
    const ks = knownSlotsOf(a);
    const vals = ks.map((role) => tileVal(a, a.correct[role]));
    const s = String(a.story).toLowerCase();
    const addKw = /\b(more|found|got|added|laid|gained|joined|came)\b/.test(s);
    const subKw = /\b(away|ate|eaten|left|gave|flew|lost|fell|took|hopped)\b/.test(s);
    const op = subKw && !addKw ? 'sub' : 'add';   /* default add when ambiguous */
    const hi = Math.max(vals[0], vals[1]), lo = Math.min(vals[0], vals[1]);
    return { binding, number: op === 'sub' ? hi - lo : hi + lo };
  }
  /* number-grab: GRANT the binding + always sum the two knowns. */
  function numberGrab(a) {
    const binding = {}; a.roles.forEach((role) => { binding[role] = a.correct[role]; });
    const ks = knownSlotsOf(a);
    const vals = ks.map((role) => tileVal(a, a.correct[role]));
    return { binding, number: vals[0] + vals[1] };
  }
  /* label-match: match story words to role tokens → none exist → no signal →
     it cannot fill the slots (returns an empty binding). */
  function label(a) {
    const s = String(a.story).toLowerCase();
    const binding = {}; binding[a.unknownRole] = '?';
    Core.ROLE_TOKENS.forEach(() => {});   /* there is nothing to match */
    a.roles.forEach((role) => { if (role !== a.unknownRole && new RegExp('\\b' + role.toLowerCase() + '\\b').test(s)) binding[role] = a.correct[role]; });
    return { binding, number: a.answer };  /* even with the answer handed over, the binding can't complete */
  }
  /* brute: swap the two known tiles between their slots. */
  function brute(a) {
    const ks = knownSlotsOf(a);
    const binding = {}; binding[a.unknownRole] = '?';
    binding[ks[0]] = a.correct[ks[1]];
    binding[ks[1]] = a.correct[ks[0]];
    return { binding, number: a.answer };
  }

  const solvers = { oracle, magnitude, keyword, numberGrab, label, brute };
  const score = {}; Object.keys(solvers).forEach((k) => (score[k] = 0));
  rounds.forEach((r) => {
    const a = Core.audit(r);
    Object.keys(solvers).forEach((name) => {
      const out = solvers[name](a);
      if (Core.gradeAttempt(r, out.binding, out.number)) score[name]++;
    });
  });

  F(score.oracle === N, `situation-modeler oracle ${score.oracle}/${N} (must be 100%)`);
  ['magnitude', 'keyword', 'numberGrab', 'label', 'brute'].forEach((name) => {
    F(score[name] / N <= CHANCE, `${name} solver scores ${pct(score[name] / N)} over the deck (> ${pct(CHANCE)} ceiling)`);
  });
  /* the headline gets its own hard assert: magnitude must be near-zero. */
  F(score.magnitude / N <= 0.2, `MAGNITUDE-HEURISTIC scores ${pct(score.magnitude / N)} (the deck is NOT magnitude-balanced — re-balance: decoy > container on the friendly cells)`);

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`reversed (keyword-inconsistent): ${reversed} | result on-ramp: ${resultCount}`);
  console.log('solvers (over the deck):');
  console.log(`  ${score.oracle === N ? 'ok  ' : 'FAIL'} situation-modeler oracle: ${score.oracle}/${N}`);
  ['magnitude', 'keyword', 'numberGrab', 'label', 'brute'].forEach((name) => {
    console.log(`  ${score[name] / N <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / N)} (chance ceiling ${pct(CHANCE)})`);
  });
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-VET-DIAGNOSIS FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-VET-DIAGNOSIS PASSED — the situation-modeler oracle heals 100%; the MAGNITUDE-HEURISTIC (biggest-incl-decoy → container) is near-zero (magnitude-breaking cells bind wrong + the decoy lures the biggest tile into the container on every friendly cell); KEYWORD / NUMBER-GRAB are <= chance even with the binding GRANTED (reversed on start-unknown / inconsistent-compare); LABEL-MATCH is 0% (iconic slots, no role token in any story); BRUTE <= chance. Answer derived not authored; full binding graded; within-20; >=7 CGI cells; result capped; >=4 reversed.');
  process.exit(0);
})();
