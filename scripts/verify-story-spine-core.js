#!/usr/bin/env node
/* =====================================================================
   verify-story-spine-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/story-spine-core.js (window shim) and proves, for
   the shipped manifest (RL.K.3 story-grammar role-typing), the clarity-first
   redesign of #62:

     1. ORACLE 100% — oracle(round, story) is the panel whose role === the
        round's role, and it is accepted; a non-matching panel is rejected.
     2. ROLE_DERIVED_NOT_STORED — no stored isCorrect/correctIndex field
        (deep scan); grading is panel.role === round.role.
     3. every story has EXACTLY ONE panel per role (setting/problem/solution)
        + ≥3 panels; every round's storyId resolves + its role exists.
     4. ≥3 distinct roles; ≥3 stories; ≥7 distinct rounds (§A.13.60).

   The spec's graded AFFECT_SOLVER / ELIMINATION_SOLVER / affect-matched swing-
   pairs / load-bearing decoy / blind-annotator / HUMAN-bypass-pilot / role≠
   order rigor is deliberately NOT implemented (clarity-first — a clear
   captioned story + tap-the-part). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];
const ROLES = ['setting', 'problem', 'solution'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'story-spine-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.StorySpineCore;
if (!Core) { console.error('FAIL: story-spine-core.js did not define window.StorySpineCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'story-spine-activities.json'), 'utf8'));
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

  // every story: ≥3 panels + exactly one panel per role
  Object.keys(stories).forEach((sid) => {
    const p = stories[sid].panels || [];
    check(p.length >= 3, `story "${sid}": <3 panels`);
    ROLES.forEach((role) => { const n = p.filter((x) => x.role === role).length; check(n === 1, `story "${sid}": ${n} panels with role "${role}" (expected exactly 1)`); });
    p.forEach((x, i) => check(ROLES.indexOf(x.role) >= 0, `story "${sid}" panel ${i}: invalid role "${x.role}"`));
  });

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.role}]`;
    scanForbidden(r, label);
    const story = stories[r.storyId];
    check(!!story, `${label}: storyId "${r.storyId}" undefined`);
    if (!story) return;
    const f = Core.facts(r, story);
    const oi = Core.oracle(r, story);

    check(oi >= 0 && Core.isAnswer(r, story, oi), `${label}: oracle is not an accepted answer`);
    check(story.panels[oi].role === r.role, `${label}: oracle panel role ≠ round role`);
    check(f.roleDerivedNotStored, `${label}: derived invariant`);
    check(f.exactlyOneRolePanel, `${label}: not exactly one panel for the role`);
    // a non-matching panel is rejected
    const wrong = story.panels.findIndex((p, i) => i !== oi);
    check(wrong < 0 || !Core.isAnswer(r, story, wrong), `${label}: a non-matching panel was accepted`);
  });

  const df = Core.deckFacts(rounds, stories);
  check(df.distinctRoles.length >= 3, `only ${df.distinctRoles.length} distinct roles (<3): [${df.distinctRoles.join(',')}]`);
  check(df.distinctStories.length >= 3, `only ${df.distinctStories.length} distinct stories (<3)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} story-spine violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df = Core.deckFacts(manifest[0].params.rounds, manifest[0].params.stories);
console.log(`PASS — ${roundCount} round(s), roles [${df.distinctRoles.join('/')}], ${df.distinctStories.length} stories: oracle 100% (the role-matching panel); role derived-not-stored; exactly one panel per role; a non-matching panel rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #62]`);
process.exit(0);
