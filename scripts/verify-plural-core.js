#!/usr/bin/env node
/* =====================================================================
   verify-plural-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/plural-core.js (window shim) and proves, for the
   shipped manifest (L.2.1.b irregular plurals), the clarity-first redesign of
   #79:

     1. DERIVE — derivePlural(round) yields the correct irregular plural per
        rule (cross-checked against a known-forms table feet/teeth/geese/men/
        women/mice/children/fish/sheep).
     2. 3 DISTINCT chips; ORACLE 100% (only the derived plural accepted; +s +
        third rejected).
     3. DERIVED_NOT_STORED — the plural literal is NEVER stored: no stored field
        value equals derivePlural (deep scan); no isCorrect/correct/plural/
        answer key; mutate ruleSpec → derivePlural changes.
     4. blocksEliminateS on EVERY transform round (≥1 non-correct chip has no
        trailing s, so "drop anything with s" can't win); ≥2 distinct rules;
        ≥2 no-change; ≥7 distinct rounds.

   The spec's constrained-build / MENU_GUESS_SOLVER / CUE_CLASSIFY / pre-
   highlight / no-pre-commit-oracle / balanced-discrimination rigor is
   deliberately NOT implemented (clarity-first — a clean 3-pick whose unchanged-
   singular distractor blocks the eliminate-+s cheat). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex', 'plural'];
const KNOWN = { deer: 'deer', foot: 'feet', tooth: 'teeth', goose: 'geese', man: 'men', woman: 'women', mouse: 'mice', child: 'children', fish: 'fish', sheep: 'sheep' };

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'plural-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PluralCore;
if (!Core) { console.error('FAIL: plural-core.js did not define window.PluralCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'plural-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scan(obj, label, pluralLiteral, singularLiteral) {
  if (obj == null) return;
  /* the singular STEM is legitimately stored (it is the displayed word); for
     no-change words plural===singular, so exclude the singular from the leak
     check — only a SEPARATELY stored plural literal is the violation. */
  if (typeof obj === 'string') { if (obj === pluralLiteral && obj !== singularLiteral) failures.push(`${label}: a stored string equals the plural literal "${obj}" — the answer must never be stored`); return; }
  if (typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scan(obj[k], label + '.' + k, pluralLiteral, singularLiteral); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    const correct = Core.derivePlural(r);
    scan(r, label, correct, r.singular);
    const f = Core.facts(r);
    const chips = Core.chipStrings(r);

    check(f.ruleValid, `${label}: invalid rule "${r.rule}"`);
    check(f.deriveNonEmpty, `${label}: derivePlural empty`);
    if (KNOWN[r.singular]) check(correct === KNOWN[r.singular], `${label}: derivePlural("${r.singular}")="${correct}" ≠ known "${KNOWN[r.singular]}"`);
    check(f.threeDistinctChips, `${label}: the 3 chips are not all distinct (${chips.join(' / ')})`);
    check(f.blocksEliminateS, `${label}: no no-s distractor — "drop anything with s" would win`);

    // oracle: only the derived plural accepted
    check(Core.isAnswer(r, correct), `${label}: correct plural not accepted`);
    chips.forEach((s) => { if (s !== correct) check(!Core.isAnswer(r, s), `${label}: a non-correct chip "${s}" was accepted`); });

    // MUTATION: change ruleSpec → derivePlural changes (proves derived)
    if (r.rule === 'vowel-change') {
      const m = clone(r); m.ruleSpec = { from: r.ruleSpec.from, to: r.ruleSpec.to + 'x' };
      check(Core.derivePlural(m) !== correct || r.singular.indexOf(r.ruleSpec.from) < 0, `${label}: derivePlural did not change under mutated ruleSpec`);
    } else if (r.rule === 'suffix') {
      const m = clone(r); m.ruleSpec = { add: r.ruleSpec.add + 'x' };
      check(Core.derivePlural(m) !== correct, `${label}: suffix derivePlural did not change under mutated ruleSpec`);
    }
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctRules.length >= 2, `only ${df.distinctRules.length} distinct rules (<2)`);
  check(df.noChangeCount >= 2, `only ${df.noChangeCount} no-change rounds (<2)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} plural violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), rules [${df0.distinctRules.join('/')}], ${df0.noChangeCount} no-change: derive correct per rule (vs known forms); 3 distinct chips; oracle 100% (irregular accepted, +s + unchanged rejected); derived-not-stored (no plural literal stored; derive changes under mutated ruleSpec); blocks-eliminate-s on transform rounds; ≥2 rules; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #79]`);
process.exit(0);
