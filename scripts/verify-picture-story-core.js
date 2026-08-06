#!/usr/bin/env node
/* =====================================================================
   verify-picture-story-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/picture-story-core.js (window shim) and proves,
   for the shipped manifest (RL.K.1 story key-details), the clarity-first
   redesign of #58:

     1. ORACLE 100% — oracle(round) === round.answer, and it is accepted;
        a wrong option is rejected.
     2. ANSWER_DERIVED_NOT_STORED — no stored isCorrect/correctIndex field
        (deep scan); grading is response===answer (matched, not an index).
     3. the answer ∈ options; ≥3 distinct options each round.
     4. every round's storyId resolves to a defined story; the answer is
        GROUNDED in that story's captions (≥1 content word ≥4 chars appears) —
        the answer is FROM the story, not invented.
     5. ≥3 distinct qtypes; ≥3 stories; ≥7 distinct rounds (§A.13.60).

   The spec's wordless / entity-registry / blind-annotator / HUMAN-bypass-pilot
   rigor is deliberately NOT implemented (clarity-first redesign — a clear
   captioned picture-story the child can read). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'picture-story-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PictureStoryCore;
if (!Core) { console.error('FAIL: picture-story-core.js did not define window.PictureStoryCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'picture-story-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;

for (const row of manifest) {
  const stories = (row.params && row.params.stories) || {};
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.qtype}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const story = stories[r.storyId];

    check(Core.oracle(r) === r.answer, `${label}: oracle ≠ round.answer`);
    check(Core.isAnswer(r, r.answer), `${label}: the answer was not accepted`);
    check(f.optionCount >= 3, `${label}: <3 options`);
    check(f.distinctOptions, `${label}: duplicate options`);
    check(f.answerInOptions, `${label}: the answer is not among the options`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);
    (r.options || []).filter((o) => o !== r.answer).forEach((w) => check(!Core.isAnswer(r, w), `${label}: a wrong option ("${w}") was accepted`));
    check(!!story, `${label}: storyId "${r.storyId}" has no defined story`);
    check(Core.answerFromStory(r, story), `${label}: the answer ("${r.answer}") is not grounded in the story's captions`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctQtypes.length >= 3, `only ${df.distinctQtypes.length} distinct qtypes (<3): [${df.distinctQtypes.join(',')}]`);
  check(df.distinctStories.length >= 3, `only ${df.distinctStories.length} distinct stories (<3)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
  // every story has ≥1 panel with a caption
  Object.keys(stories).forEach((sid) => check((stories[sid].panels || []).every((p) => p.caption && p.caption.length), `story "${sid}" has an empty caption`));
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} picture-story violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), qtypes [${df.distinctQtypes.join('/')}], ${df.distinctStories.length} stories: oracle 100% (=round.answer); answer derived-not-stored (matched, no index); answer ∈ options + grounded in the story captions; ≥3 distinct options; a wrong option rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #58]`);
process.exit(0);
