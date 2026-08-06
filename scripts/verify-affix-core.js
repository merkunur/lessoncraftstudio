#!/usr/bin/env node
/* =====================================================================
   verify-affix-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/affix-core.js (window shim) and proves, for the
   shipped manifest (L.2.4.b/c affix word-meaning), the clarity-first game:

     1. ORACLE 100% — the correct affix is accepted for every round; a wrong
        option's affix is rejected.
     2. ANSWER_DERIVED_NOT_STORED — no stored isCorrect/correctIndex field
        (deep scan); the correct option is FOUND by matching round.affix
        (mutate round.affix → the correct option/cog moves).
     3. apply rounds: exactly one option matches round.affix; a `root`-only
        distractor present; ≥1 wrong-affix distractor; word === root+affix
        spelling; correct ∉ authored index 0. which rounds: the affix ∈ options.
     4. ≥3 options each; both cogs (apply + which); all four affix families
        (un/re/ful/less) covered across the deck; ≥7 distinct rounds.

   The spec's tuple/phrasings/PARAPHRASE_TEMPLATE_SOLVER suite is deliberately
   NOT implemented (clarity-first — simple readable meanings + derived-by-
   affix-match + root/wrong-affix distractors). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];
const FAMILIES = ['un', 're', 'ful', 'less'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'affix-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.AffixCore;
if (!Core) { console.error('FAIL: affix-core.js did not define window.AffixCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'affix-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;
const cogs = {}, fams = {};

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++; cogs[r.cog] = 1; fams[r.affix] = 1;
    const label = `${r.id}[${r.cog}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const ci = Core.correctIndex(r);

    check(Core.isAnswer(r, r.affix), `${label}: the correct affix (${r.affix}) was not accepted`);
    check(ci >= 0 && f.exactlyOneCorrect, `${label}: the correct option could not be derived`);
    check(f.correctNotIndex0, `${label}: correct at authored index 0`);
    check(f.optionCount >= 3, `${label}: <3 options`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);
    check(f.oneCorrectMatch, `${label}: not exactly one option matches the round's affix`);

    if (r.cog === 'apply') {
      check(f.hasRootDistractor, `${label}: no root-only distractor`);
      check(f.hasWrongAffixDistractor, `${label}: no wrong-affix distractor`);
      check(f.wordSpellingOk, `${label}: word "${r.word}" ≠ ${r.root}+${r.affix} (${Core.applySpelling(r.root, r.affix)})`);
      // a wrong option's affix is rejected
      const wrong = (r.options || []).find((o) => o.affix !== r.affix);
      check(wrong && !Core.isAnswer(r, wrong.affix), `${label}: a wrong option (${wrong && wrong.affix}) was accepted`);
      // ANSWER_DERIVED_NOT_STORED — flip round.affix to another present affix → correct option moves
      const otherAffix = (r.options || []).map((o) => o.affix).find((a) => a !== r.affix && a !== 'root');
      if (otherAffix) {
        const moved = Core.correctIndex(Object.assign({}, r, { affix: otherAffix }));
        check(moved !== ci && moved >= 0, `${label}: correct option did not move when round.affix changed (stored?)`);
      }
    } else {
      check((r.options || []).indexOf(r.affix) >= 0, `${label}: the correct affix is not among the cog options`);
      const wrong = (r.options || []).find((a) => a !== r.affix);
      check(wrong && !Core.isAnswer(r, wrong), `${label}: a wrong cog (${wrong}) was accepted`);
    }
  });
}

const distinctCogs = Object.keys(cogs);
check(distinctCogs.indexOf('apply') >= 0 && distinctCogs.indexOf('which') >= 0, `both cogs required (apply + which); got [${distinctCogs.join('/')}]`);
FAMILIES.forEach((fam) => check(fams[fam], `affix family "${fam}" not covered anywhere in the deck`));

const df = Core.deckFacts(manifest[0].params.rounds);
check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} affix-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), cogs [${distinctCogs.join('/')}], families [${Object.keys(fams).join('/')}]: oracle 100% (correct = the option matching round.affix); answer derived-not-stored; root + wrong-affix distractors; word spelling = root+affix; ≥3 options; a wrong option rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first]`);
process.exit(0);
