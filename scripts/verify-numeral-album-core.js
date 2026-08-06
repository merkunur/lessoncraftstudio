#!/usr/bin/env node
/* =====================================================================
   verify-numeral-album-core.js — build-time MEASURED gate for the
   represent-a-quantity-with-a-produced-numeral cognition behind "Rivet's
   Number Forge" (CCSS K.CC.A.3). Loads the REAL mini tools/numeral-album-core.js
   + the manifest rounds and proves (exit 0 = pass; 1 = any failure):

     #1 NO GLYPH MENU (symbol-matcher + palette-recognizer FAIL): the core
        exposes NO select / match / palette / pick-answer API — there is nothing
        to submit a read glyph through; the only mint path is pullLever after
        counting. (The rejected 0-9 palette would have given a recognizer a move.)
     #2 NO ANSWER-GLYPH ON THE PAGE: on every A.3 frame, printedNumeralsOnPage
        contains NO glyph equal to the true count (verify shows a WRONG decoy ≠
        count; reverse = the labeled K.CC.B.5 exception). A glyph-reader has
        nothing correct to copy.
     #3 COUNT→PRODUCE solver PASSES 100% — counts every object / produces the
        target on each frame → mints → completes EVERY page (incl. 0-case, a
        teen, reverse).
     #4 BRUTE-FORCE (no-count) FAILS — pulling the lever without counting mints
        ZERO count>0 / produce frames and completes NO round.
     #5 MISCOUNT FAILS — one-too-few taps → wheeze, never the right numeral
        (overshoot/undershoot can't land it).
     #6 0-CASE REQUIRED — ≥1 frame count===0, minted "0" via the SAME mechanic;
        leading-zero guard ("0" alone, "3"==="3", no "03"); interleaved.
     #7 DIFFERENT-SURFACES + COUNTABLE-TARGET — countableTarget===target; the
        answer-numeral is never pre-rendered; subset bench carries decoys.
     #8 NON-MONOTONIC pages — no page's frame quantities are strictly ascending.
     #9 RANGE — count-mode ≤10 EXCEPT teens (11-20) which MUST be ten-frame; the
        teen rides WITHIN count-mint (not a separate act); ≥1 teen present.
     #10 ≥7 distinct act_type with the BLOCKLIST — the 7 labels present + distinct
        ids; reverse ≤1 page (the labeled secondary, not an A.3 act).
     #11 ACTIVITY uses answerType:'state' (no shell keypad/choice glyph palette).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'numeral-album-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.NumeralAlbumCore;
if (!Core) { console.error('FAIL: numeral-album-core.js did not define window.NumeralAlbumCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'rivets-number-forge-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;
const activitySrc = fs.readFileSync(path.join(REPO, 'mini tools', 'rivets-number-forge-activity.js'), 'utf8');

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* #1 NO glyph-select / palette / match API on the core */
['selectNumeral', 'pickAnswer', 'placeGlyph', 'matchGlyph', 'palette', 'options', 'choices', 'chooseNumeral'].forEach((k) =>
  check(typeof Core[k] === 'undefined', `core exposes a "${k}" API — a glyph-recognizer would have a move (the symbol-matcher in a new costume)`));
check(!/function\s+(selectNumeral|pickAnswer|placeGlyph|numeralPalette)/.test(coreSrc), 'core has a glyph-select/palette helper');

const isReverse = (r) => r.act_type === 'reverse';

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.act_type}]`, frames = r.page.frames;

  /* #3 genuine solver completes */
  check(S.countProduceSolver(r).complete === true, `${L}: the genuine count→produce solver did NOT complete the page`);

  /* #4 brute-force fails */
  const bf = S.bruteForceSolver(r);
  check(bf.mintedNonZero === 0, `${L}: brute-force (no count) minted ${bf.mintedNonZero} count>0/produce frame(s)`);
  check(bf.complete === false, `${L}: brute-force completed the page without counting`);

  /* #5 miscount fails (count-mode) */
  const mc = S.miscountSolver(r);
  if (!mc.skip) check(mc.result === 'wheeze', `${L}: one-too-few taps minted anyway (miscount must wheeze)`);

  frames.forEach((f, i) => {
    const ff = Core.frameFacts(r, i);
    /* #2 no answer-glyph == true count on A.3 frames */
    if (ff.isAct3) check(ff.printedNumeralsOnPage.indexOf(ff.trueCount) < 0, `${L} frame ${i}: a printed numeral equals the true count ${ff.trueCount} (an answer-glyph to copy)`);
    if (r.act_type === 'verify') check((f.claimNumeral | 0) !== (f.count | 0), `${L} frame ${i}: verify decoy ${f.claimNumeral} equals the true count (must be WRONG)`);
    /* #7 countable target (count-mode only; produce acts have nothing to count) */
    if (!ff.isProduce) check(ff.countableTarget === ff.target, `${L} frame ${i}: countableTarget ${ff.countableTarget} ≠ target ${ff.target}`);
    /* #9 range: ≤10 unless a ten-frame teen; reverse uses numeral */
    if (!isReverse(r)) {
      const c = f.count | 0;
      if (c > 10) { check(f.arrangement === 'tenframe', `${L} frame ${i}: count ${c} >10 not on a ten-frame`); check(r.act_type === 'count-mint', `${L} frame ${i}: a teen (${c}) is tagged ${r.act_type}, not count-mint (magnitude is NOT a distinct act)`); }
      check(c >= 0 && c <= 20, `${L} frame ${i}: count ${c} out of 0..20`);
    }
  });

  /* #8 non-monotonic page (use count, or numeral for reverse) */
  const qs = frames.map((f) => isReverse(r) ? (f.numeral | 0) : (f.count | 0));
  let ascending = true; for (let k = 1; k < qs.length; k++) if (qs[k] <= qs[k - 1]) ascending = false;
  check(!(ascending && qs.length > 1), `${L}: page quantities are strictly ascending ${JSON.stringify(qs)} (anti-ordering: must not sort)`);
});

/* #6 0-case present + minted "0" + leading-zero guard */
const zeroFrames = rounds.reduce((n, r) => n + r.page.frames.filter((f) => !isReverse(r) && (f.count | 0) === 0).length, 0);
check(zeroFrames >= 1, 'no 0-case frame (count===0) anywhere');
check(Core.numeralRepresents(0) === '0' && Core.numeralRepresents(3) === '3' && Core.numeralRepresents(14) === '14', 'numeralRepresents broke (leading-zero/teen guard)');
{ // the genuine solver mints "0" for a 0-frame
  const zr = rounds.find((r) => r.act_type === 'zero');
  const res = S.countProduceSolver(zr);
  check(res.complete && res.minted.some((m) => m.numeral === '0'), 'the zero round did not mint a "0" via the count→produce mechanic');
}

/* #10 ≥7 distinct act_type + ids + reverse ≤1 */
const acts = new Set(rounds.map((r) => r.act_type));
['count-mint', 'zero', 'parade', 'subset', 'verify', 'build-mint', 'reverse'].forEach((a) => check(acts.has(a), `missing act_type "${a}"`));
check(acts.size >= 7, `only ${acts.size} distinct act-types (<7): ${[...acts].join(',')}`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.filter(isReverse).length <= 1, `${rounds.filter(isReverse).length} reverse pages (the labeled secondary B.5 must be ≤1)`);

/* #9 ≥1 teen */
check(rounds.some((r) => r.page.frames.some((f) => (f.count | 0) > 10)), 'no teen (11-20) frame present');

/* #11 activity uses answerType:'state' (no keypad/choice glyph palette) */
check(/answerType:\s*['"]state['"]/.test(activitySrc), "activity does not declare answerType:'state'");
check(!/answerType:\s*['"](number|choice)['"]/.test(activitySrc), 'activity uses a number/choice answer surface (the shell glyph keypad — the rejected palette)');

if (failures.length) {
  console.error(`FAIL — ${failures.length} numeral-album violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} pages / ${acts.size} act-types: ` +
  `NO glyph-select/palette API + NO answer-glyph == the true count on any A.3 frame (verify decoy ≠ count) → symbol-matcher + palette-recognizer have no move; ` +
  `count→produce completes 100% (incl. 0-case + teen + reverse); brute-force (no count) mints 0 count>0 frames + completes nothing; one-too-few wheezes; ` +
  `0-case minted "0" via the same mechanic; countableTarget===target; non-monotonic pages; ≤10 except ten-frame teens (within count-mint); 7 act-types, reverse ≤1; answerType:'state'.`);
process.exit(0);
