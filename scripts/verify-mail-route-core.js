#!/usr/bin/env node
/* =====================================================================
   verify-mail-route-core.js — build-time MEASURED gate for the READ-a-numeral
   cognition behind "Pip's Round" (CCSS K.CC.A.3 recognition-face). Loads the
   REAL mini tools/mail-route-core.js + the manifest rounds and proves (exit 0 =
   pass; 1 = any failure) the converged + critic-fixed solver set:

     #1 NUMBER-RECOGNIZER PASSES 100% — a font-invariant + cross-modal solver
        (numeral===target) delivers EVERY round (across the 4 cogs incl. audio +
        cross-font + the 0-case + a teen).
     #2 NAVIGATION-ONLY FAILS — the correct house is NEVER the nearest/leftmost/
        in-order one (`correctNotNearestOrInOrder`); position↔value decorrelated
        (`posValueDecorrelated` ρ<0.2).
     #3 TEMPLATE/SHAPE-MATCH FAILS (the headline — proves READING) — no round has
        a same-font glyph target (`targetIsCrossFontOrAudio===true`); a glyph-
        pixel solver cannot pick on audio (no glyph) or cross-font (pixels ≠);
        AUDIO rounds are a required portion.
     #4 FIRST-DIGIT-MATCHER FAILS — ≥1 same-tens round makes tens-digit matching
        ambiguous (forces reading the whole numeral).
     #5 ROUTE-IS-CONSEQUENCE — `answerChannelIsNumeral===true` +
        `routeIsRenderOnly===true`; deliver reads the numeral, never a coord.
     #6 RANGE 0-20 (target) + distinct numerals/round + ≥1 confusable distractor.
     #7 4 COGNITIONS by `cog` with a BLOCKLIST (read-single/read-zero/read-teen/
        hear-find; match-a-count + rotation EXCLUDED); ≥7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mail-route-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MailRouteCore;
if (!Core) { console.error('FAIL: mail-route-core.js did not define window.MailRouteCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pips-round-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const COGS = ['read-single', 'read-zero', 'read-teen', 'hear-find'];

/* #5 static: deliver reads the numeral, the route never has an input handler */
check(/house\.numeral/.test(coreSrc), 'deliver() does not read house.numeral (the numeral-answer-channel)');
check(!/deliveredOrder\s*=\s*\[[^\]]/.test(coreSrc), 'route source looks pre-seeded (must be append-only on match)');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.cog}]`;
  const f = Core.facts(r, Core.newState(r));

  /* #1 number-recognizer delivers */
  check(S.numberRecognizerSolver(r).solved === true, `${L}: the NUMBER-RECOGNIZER did not deliver`);

  /* #2 navigation-only fails */
  const nav = S.navigationOnlySolver(r);
  check(nav.nearestCorrect === false && nav.leftmostCorrect === false && nav.firstCorrect === false, `${L}: the correct house IS the nearest/leftmost/in-order one (navigation cheat)`);
  check(f.correctNotNearestOrInOrder === true, `${L}: correctNotNearestOrInOrder !== true`);
  check(f.posValueDecorrelated === true, `${L}: position↔value not decorrelated (ρ≥0.2)`);

  /* #3 template/shape-match fails — no same-font glyph target */
  check(f.targetIsCrossFontOrAudio === true, `${L}: target is NOT cross-font/audio (a same-font glyph is template-matchable)`);
  check(S.templateMatchSolver(r).canPixelMatch === false, `${L}: a glyph-pixel solver CAN match (same-font glyph present)`);

  /* #5 route-is-consequence */
  check(f.answerChannelIsNumeral === true, `${L}: answerChannelIsNumeral !== true`);
  check(f.routeIsRenderOnly === true, `${L}: routeIsRenderOnly !== true`);

  /* #6 range + distinct + confusable */
  check((r.targetValue | 0) >= 0 && (r.targetValue | 0) <= 20, `${L}: targetValue ${r.targetValue} out of 0..20`);
  const nums = r.houses.map((h) => h.numeral | 0);
  check(new Set(nums).size === nums.length, `${L}: duplicate house numerals`);
  check(f.confusableDistractorPresent === true, `${L}: no confusable distractor`);

  /* #7 cog in the allowed set */
  check(COGS.indexOf(r.cog) >= 0, `${L}: cog "${r.cog}" not in {${COGS.join(',')}} (BLOCKLIST: match-a-count / rotation)`);

  /* a number-recognizer must also REJECT a confusable distractor (deliver to it → not matched) */
  const confHouse = r.houses.find((h) => (h.numeral | 0) !== (r.targetValue | 0) && Core.isConfusable(r.targetValue | 0, h.numeral | 0));
  if (confHouse) { const s2 = Core.newState(r); check(Core.deliver(s2, confHouse.hid).matched === false && s2.solved === false, `${L}: delivering to a confusable distractor was accepted`); }
});

/* #3 audio rounds are a required portion */
check(rounds.some((r) => r.present === 'audio'), 'no AUDIO round (the strongest reading-forcer is required)');
check(rounds.every((r) => r.present === 'audio' || r.present === 'cross-font'), 'a round uses a same-font glyph target');

/* #4 ≥1 same-tens round where first-digit matching is ambiguous */
check(rounds.some((r) => S.firstDigitMatcherSolver(r).ambiguous === true), 'no same-tens round (first-digit matching is never made ambiguous)');

/* #7 4 cogs, ≥7 rounds, distinct ids, 0-case present, a teen present */
const cogsSeen = new Set(rounds.map((r) => r.cog));
COGS.forEach((c) => check(cogsSeen.has(c), `missing cog "${c}"`));
check(cogsSeen.size === 4, `expected exactly 4 cogs, got ${cogsSeen.size} (${[...cogsSeen].join(',')})`);
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => (r.targetValue | 0) === 0), 'no 0-case round');
check(rounds.some((r) => (r.targetValue | 0) >= 10), 'no teen round');
check(!rounds.some((r) => /match-a-count|rotation/.test(r.cog || '')), 'a blocked cog (match-a-count/rotation) is present');

if (failures.length) {
  console.error(`FAIL — ${failures.length} mail-route violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const audioN = rounds.filter((r) => r.present === 'audio').length;
console.log(`PASS — ${rounds.length} rounds / ${cogsSeen.size} cogs (${audioN} audio): ` +
  `NUMBER-RECOGNIZER delivers 100% (+ rejects confusable distractors); NAVIGATION-ONLY fails (correct ≠ nearest/leftmost/in-order, ρ<0.2); ` +
  `TEMPLATE/SHAPE-MATCH fails (every target cross-font/audio, no same-font glyph); FIRST-DIGIT-MATCHER fails (a same-tens round); ` +
  `route-is-consequence (numeral-answer-channel, render-only); range 0-20, distinct numerals, ≥1 confusable distractor/round; 4 cogs, 0-case + teen present.`);
process.exit(0);
