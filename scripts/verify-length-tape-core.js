#!/usr/bin/env node
/* =====================================================================
   verify-length-tape-core.js — the MEASURED build-gate for "Bram's Board
   Shop" (2.MD.B.5, length word problems modeled on a tape). Drives the REAL
   length-tape-core.js over the REAL manifest. The cognition is MODEL-THE-
   LENGTH-SITUATION (bind each known length to its tape segment, mark the
   unknown, leave the magnitude-decoy out) → the number is DERIVED.

   Threat model (the activity REQUIRES a correct binding to grade — so a
   non-modeling shortcut must FAIL the binding, not just the number):
     • SITUATION-MODELER ORACLE → 100%;
     • MAGNITUDE (biggest tile → most container-like slot) → ~0: the decoy is
       the BIGGEST tile on EVERY round, so biggest-first always binds the
       decoy → rejected (decoy-bound). The headline length-model guarantee;
     • KEYWORD-cheat (op by story keyword, tiles by magnitude) → ~0 (binding
       fails on the decoy);
     • NUMBER-GRAB-cheat (sum the two knowns, tiles by magnitude) → ~0;
     • BRUTE (swap the two known tiles between their slots) → <= chance;
     • LABEL-MATCH → 0% (slots iconic; no role token in any story).
   Plus STRUCTURAL: answer derived-not-authored; decoy on every round + decoy
   is the biggest tile; full binding graded; within-100; >=7 distinct cogs;
   >=1 start-unknown; >=3 keyword-reversed (keyword is not a reliable cue).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'length-tape-core.js');
const MANIFEST = path.join(MINI, 'bram-board-shop-activities.json');
const CHANCE = 0.45;
const CONTAINER = { result: 5, whole: 5, bigger: 5, start: 4, partA: 3, partB: 3, change: 2, smaller: 2, difference: 1 };

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.LengthTapeCore) throw new Error('core did not attach window.LengthTapeCore'); return win.LengthTapeCore; }

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

  /* ---- (A) structural facts ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.answerDerivedNotAuthored, `${r.id}: has an authored 'answer' field`);
    F(f.fullBindingGraded, `${r.id}: full binding not graded`);
    F(f.hasDecoy, `${r.id}: NO magnitude-decoy tile`);
    F(f.noSlotLabelWordInQuestion, `${r.id}: the story echoes a role token (label-match leak)`);
    F(f.withinHundred, `${r.id}: out of range (within-100)`);
    F((r.tiles || []).length === 3, `${r.id}: expected 3 tiles, got ${(r.tiles || []).length}`);
    F((r.slots || []).length === 3, `${r.id}: expected 3 slots, got ${(r.slots || []).length}`);
    F((r.slots || []).filter((s) => s.correct === null).length === 1, `${r.id}: must have exactly ONE unknown slot`);
    const unkSlot = (r.slots || []).filter((s) => s.correct === null)[0];
    F(unkSlot && unkSlot.role === r.unknownRole, `${r.id}: unknown slot role != unknownRole`);
    F((r.slots || []).every((s) => s.correct !== r.decoyId), `${r.id}: the decoy is wired as a correct tile`);
    /* the decoy must be the BIGGEST tile (so biggest-first magnitude grabs it → fails) */
    const dv = tileVal(r, r.decoyId);
    const maxKnown = Math.max.apply(null, (r.tiles || []).filter((t) => t.id !== r.decoyId).map((t) => t.value));
    F(dv > maxKnown, `${r.id}: decoy ${dv} is not > the biggest known ${maxKnown} (magnitude-grab would not be lured)`);
    F(dv !== Core.trueAnswer(r), `${r.id}: decoy equals the answer`);
  });

  /* ---- (B) cog variety + start-unknown + reversed ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  F(rounds.some((r) => /start/.test(r.unknownRole)), 'no start-unknown round (the frontier)');
  const reversed = rounds.filter((r) => Core.facts(r).reversed).length;
  F(reversed >= 3, `only ${reversed} keyword-reversed round(s) (need >=3 so keyword is not a reliable cue)`);
  const diagrams = new Set(rounds.map((r) => r.diagram));
  F(diagrams.has('change') && diagrams.has('bracket') && diagrams.has('compare'), `missing a diagram type (have ${[...diagrams].join('/')})`);

  /* ---- (C) THE SOLVER SET ---- */
  const knownSlotsOf = (a) => a.roles.filter((role) => role !== a.unknownRole);

  function oracle(a) { const binding = {}; a.roles.forEach((role) => { binding[role] = a.correct[role]; }); return { binding, number: a.answer }; }
  /* magnitude: biggest tile (incl decoy) → most container-like slot; derive from its own binding */
  function magnitude(a) {
    const ks = knownSlotsOf(a).slice().sort((x, y) => (CONTAINER[y] || 0) - (CONTAINER[x] || 0));
    const tiles = a.tiles.slice().sort((x, y) => y.value - x.value);
    const binding = {}; binding[a.unknownRole] = '?';
    ks.forEach((role, i) => { binding[role] = tiles[i].id; });
    const known = {}; ks.forEach((role) => { known[role] = tileVal(a, binding[role]); });
    return { binding, number: Core.solveUnknown(a.diagram, a.op, known, a.unknownRole) };
  }
  /* keyword-cheat: does NOT model (binds by magnitude) + op from story keyword */
  function keyword(a) {
    const m = magnitude(a);
    const ks = knownSlotsOf(a); const vals = ks.map((role) => tileVal(a, m.binding[role]));
    const s = String(a.story).toLowerCase();
    const addKw = /\b(more|added|glue|glues|glued|ties|tied|joins|joined|longer|taller|extra)\b/.test(s);
    const subKw = /\b(cut|cuts|saw|saws|sawed|off|shorter|trimmed|broke)\b/.test(s);
    const op = subKw && !addKw ? 'sub' : 'add';
    const hi = Math.max(vals[0], vals[1]), lo = Math.min(vals[0], vals[1]);
    return { binding: m.binding, number: op === 'sub' ? hi - lo : hi + lo };
  }
  /* number-grab-cheat: does NOT model (magnitude binding) + sum the two placed knowns */
  function numberGrab(a) {
    const m = magnitude(a);
    const ks = knownSlotsOf(a); const vals = ks.map((role) => tileVal(a, m.binding[role]));
    return { binding: m.binding, number: vals[0] + vals[1] };
  }
  function label(a) {
    const s = String(a.story).toLowerCase();
    const binding = {}; binding[a.unknownRole] = '?';
    a.roles.forEach((role) => { if (role !== a.unknownRole && new RegExp('\\b' + role.toLowerCase() + '\\b').test(s)) binding[role] = a.correct[role]; });
    return { binding, number: a.answer };
  }
  function brute(a) {
    const ks = knownSlotsOf(a);
    const binding = {}; binding[a.unknownRole] = '?';
    binding[ks[0]] = a.correct[ks[1]]; binding[ks[1]] = a.correct[ks[0]];
    return { binding, number: a.answer };
  }

  const solvers = { oracle, magnitude, keyword, numberGrab, label, brute };
  const score = {}; Object.keys(solvers).forEach((k) => (score[k] = 0));
  rounds.forEach((r) => {
    const a = Core.audit(r);
    Object.keys(solvers).forEach((name) => { const out = solvers[name](a); if (Core.gradeAttempt(r, out.binding, out.number)) score[name]++; });
  });

  F(score.oracle === N, `situation-modeler oracle ${score.oracle}/${N} (must be 100%)`);
  ['magnitude', 'keyword', 'numberGrab', 'label', 'brute'].forEach((name) => {
    F(score[name] / N <= CHANCE, `${name} solver scores ${pct(score[name] / N)} (> ${pct(CHANCE)} ceiling)`);
  });
  F(score.magnitude === 0, `MAGNITUDE-cheat scores ${score.magnitude}/${N} (decoy must be biggest on every round → biggest-first grabs the decoy → 0)`);

  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`reversed (keyword-inconsistent): ${reversed} | diagrams: ${[...diagrams].join('/')}`);
  console.log('solvers (over the deck):');
  console.log(`  ${score.oracle === N ? 'ok  ' : 'FAIL'} situation-modeler oracle: ${score.oracle}/${N}`);
  ['magnitude', 'keyword', 'numberGrab', 'label', 'brute'].forEach((name) => {
    console.log(`  ${score[name] / N <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / N)} (ceiling ${pct(CHANCE)})`);
  });
  console.log('');
  if (fails.length) { console.error(`VERIFY-LENGTH-TAPE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-LENGTH-TAPE PASSED — the length-situation-modeler oracle solves 100%; MAGNITUDE is 0 (decoy biggest on every round → biggest-first grabs it → binding rejected); KEYWORD / NUMBER-GRAB cheats fail the binding; LABEL 0% (iconic slots); BRUTE <= chance. Answer derived-not-authored; decoy biggest on every round; within-100; >=7 cogs across change/bracket/compare; >=1 start-unknown; >=3 reversed.');
  process.exit(0);
})();
