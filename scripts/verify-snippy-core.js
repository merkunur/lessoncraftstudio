#!/usr/bin/env node
/* =====================================================================
   verify-snippy-core.js — the MEASURED, critic-armed build-gate for "Snippy
   the Sound-Spark Snail" (L.K.1.a letter FORMATION). Drives the REAL core
   (loaded via `new Function`) over the REAL manifest. HALTS the build on any
   failure. The cognition is FORMATION (correct start-point + stroke order +
   direction + shape), graded ONLY at the CERTIFY pass (path + order hidden).
   The solver set proves no shortcut survives:

     • FORM-FROM-THE-PLAN ORACLE → 100% (correct start in order + in-order trace);
     • CHECKPOINT-HOMING-FOLLOWER → <= chance (the critic's DEEPEST: convention-
       free geometric dot-connector — knows the coords, ZERO handwriting
       knowledge → orders strokes by proximity-to-origin → picks the WRONG first
       start on the multi-stroke majority → demoted; single proximity-traceable
       letters are the minority);
     • DOT-FOLLOWER → <= chance (at certify a bare start-tap forms nothing — a
       real trace is required; no path → off-path);
     • SCRIBBLER → <= chance (garbage path → off-path).

   Plus the CERTIFY-HIDES proof: the certify snapshot carries NO glyph path + NO
   order numbers (only the unlabeled stroke-starts), while the guided snapshot
   shows them. Plus STRUCTURAL: only-certify-graded; demote-on-wrong-start;
   also_teaches empty; >=7 distinct letters; >=1 multi-stroke + the b/d reversal
   + the S<->s upper/lower pairing + word-anchors; HOMER_DEFEATED_MAJORITY.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'snippy-core.js');
const MANIFEST = path.join(MINI, 'snippy-activities.json');
const CHANCE = 0.45;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.SnippyCore) throw new Error('core did not attach window.SnippyCore');
  return win.SnippyCore;
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

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7 distinct letters)`);
  F(!(row.alignment && row.alignment.also_teaches && row.alignment.also_teaches.length), 'alignment has a non-empty also_teaches (L.K.1.a only — RF dropped, exposure-prose only)');

  /* ---- (A) per-round structural facts + the certify-hides proof ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.onlyCertifyGraded, `${r.id}: not only-certify-graded`);
    F(f.certifyHidesOrderAndPath, `${r.id}: the certify pass does NOT hide the path/order`);
    F(f.certifyShowsUnlabeledStarts, `${r.id}: the certify pass does not show unlabeled starts`);
    F(f.demoteOnWrongStart, `${r.id}: no demote-on-wrong-start`);
    F(f.letterShownNotRecognition, `${r.id}: not letter-shown (recognition-poach risk)`);
    /* the certify snapshot carries NO glyph path + NO order numbers */
    const cert = C.snapshot(r, 'certify');
    F(cert.showPath === false && cert.showOrderNumbers === false && cert.glyphPath == null, `${r.id}: CERTIFY snapshot leaks a path or order numbers`);
    /* the guided snapshot DOES show them (the levels genuinely differ) */
    const guid = C.snapshot(r, 'guided');
    F(guid.showPath === true && guid.showOrderNumbers === true && guid.glyphPath != null, `${r.id}: GUIDED snapshot does not show the path+order (no scaffold)`);
  });

  /* ---- (B) coverage: distinct letters + the required round types ---- */
  const letters = new Set(rounds.map((r) => r.letter));
  F(letters.size >= 7, `only ${letters.size} distinct letters (need >=7)`);
  F(rounds.some((r) => C.numStrokes(r.letter) > 1), 'no multi-stroke letter');
  F(letters.has('b') && letters.has('d'), 'the b/d reversal pair is not both present');
  F(letters.has('S') && letters.has('s'), 'the S<->s upper/lower pairing is not both present');
  F(rounds.every((r) => r.word && String(r.word).length), 'a round is missing its word-anchor');

  /* ---- (C) demote-on-wrong-start: a wrong certify start demotes (no free retry) ---- */
  const multi = rounds.find((r) => C.numStrokes(r.letter) > 1);
  if (multi) {
    const g = C.glyphOf(multi.letter);
    const st = C.newState(multi, 'certify');
    const wrongStart = g[1][0];   /* the SECOND stroke's start, used first = wrong order */
    const res = C.attemptStroke(st, wrongStart, g[1].map((p) => ({ x: p.x, y: p.y })));
    F(res === 'wrong-start' && st.demoted === true, `${multi.letter}: a wrong first start at certify did not demote (got '${res}', demoted=${st.demoted})`);
  }

  /* ---- (D) THE SOLVER SET (over the certify deck) ---- */
  const S = C.SOLVERS;
  let oracle = 0, homer = 0, dotF = 0, scrib = 0;
  rounds.forEach((r) => {
    if (S.oracleSolver(r).genuine) oracle++;
    if (S.homerSolver(r).genuine) homer++;
    if (S.dotFollowerSolver(r).genuine) dotF++;
    if (S.scribblerSolver(r).genuine) scrib++;
  });

  F(oracle === N, `form-from-the-plan oracle ${oracle}/${N} (must be 100%)`);
  F(homer / N <= CHANCE, `checkpoint-homing-follower scores ${pct(homer / N)} over the certify deck (> ${pct(CHANCE)} ceiling) — skew the deck to more multi-stroke defeaters`);
  F(dotF / N <= CHANCE, `dot-follower scores ${pct(dotF / N)} (> ${pct(CHANCE)})`);
  F(scrib / N <= CHANCE, `scribbler scores ${pct(scrib / N)} (> ${pct(CHANCE)})`);
  /* HOMER_DEFEATED_MAJORITY — the homer fails > half the certify deck */
  F((N - homer) / N > 0.5, `the homer is defeated on only ${pct((N - homer) / N)} of the deck (need > 50%)`);

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} letters [${[...letters].join(',')}], multi-stroke: ${rounds.filter((r) => C.numStrokes(r.letter) > 1).length}`);
  console.log('solvers (over the certify deck):');
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} form-from-the-plan oracle: ${oracle}/${N}`);
  console.log(`  ${homer / N <= CHANCE ? 'ok  ' : 'FAIL'} checkpoint-homing-follower: ${pct(homer / N)} (chance ${pct(CHANCE)}; defeated on ${pct((N - homer) / N)})`);
  console.log(`  ${dotF / N <= CHANCE ? 'ok  ' : 'FAIL'} dot-follower: ${pct(dotF / N)}`);
  console.log(`  ${scrib / N <= CHANCE ? 'ok  ' : 'FAIL'} scribbler: ${pct(scrib / N)}`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-SNIPPY FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-SNIPPY PASSED — the form-from-the-plan oracle certifies 100%; CHECKPOINT-HOMING-FOLLOWER (convention-free geometric dot-connector) / DOT-FOLLOWER (a bare start-tap forms nothing at certify) / SCRIBBLER all <= chance and the homer is defeated on the multi-stroke majority. The certify pass HIDES the path + order numbers (only the unlabeled starts) while guided shows them; a wrong first start at certify DEMOTES; only-certify-graded; also_teaches empty; >=7 distinct letters; multi-stroke + the b/d reversal + the S<->s pairing + word-anchors all present.');
  process.exit(0);
})();
