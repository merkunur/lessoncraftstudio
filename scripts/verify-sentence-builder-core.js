#!/usr/bin/env node
/* =====================================================================
   verify-sentence-builder-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/sentence-builder-core.js (window shim) and proves,
   for the shipped manifest (L.1.1.j build-a-sentence):

     1. EACH sentence ≥4 words, starts with a Capitalized word, ends with a "."
        (a complete declarative), with NO duplicate words (1:1 tile↔slot).
     2. ORDERED GRADE is strict — gradeOrder(canonical,canonical)=true;
        reversed=false; EVERY adjacent single-swap=false (only the exact order
        passes → exact-order grading is unambiguous).
     3. SCRAMBLE differs from canonical (there is always something to arrange).
     4. DERIVED_NOT_STORED — no stored correctIndex/answer/correct key (deep
        scan); mutate the canonical order → a previously-correct arrangement now
        fails (the grade is the order, not a stored flag).
     5. ASSET — every subject noun has a COLOR @2x.webp on disk (§20.5).
     6. ≥7 distinct sentences, ≥6 distinct subjects.

   NOTE: "unique grammatical order" (no SECOND valid sentence from the tiles) is
   an authoring guarantee checked by the visual-critic, not machine-verifiable
   here. Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'order'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'sentence-builder-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SentenceBuilderCore;
if (!Core) { console.error('FAIL: sentence-builder-core.js did not define window.SentenceBuilderCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sentence-builder-activities.json'), 'utf8'));
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const colorImage = (s) => fs.existsSync(path.join(THEMES, s.themeDir, s.noun + '@2x.webp')) && !/\bbw\b|black/i.test(s.themeDir);

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN}`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const c = r.canonical || [];

    check(f.wordCount >= 4, `${label}: ${f.wordCount} words (<4 — middle ordering must be non-trivial)`);
    check(f.startsCapital, `${label}: does not start with a capitalized word ("${c[0]}")`);
    check(f.endsPeriod, `${label}: does not end with . ! or ? ("${c[c.length - 1]}")`);
    check(f.noDuplicateWords, `${label}: has duplicate words (breaks 1:1 tile↔slot)`);
    check(f.scrambleDiffers, `${label}: scramble equals the canonical order (nothing to arrange)`);

    // strict ordered grade
    check(Core.gradeOrder(c, c) === true, `${label}: canonical order not accepted`);
    check(Core.gradeOrder(c.slice().reverse(), c) === false, `${label}: reversed order accepted`);
    for (let i = 0; i < c.length - 1; i++) {
      const sw = c.slice(); const t = sw[i]; sw[i] = sw[i + 1]; sw[i + 1] = t;
      check(Core.gradeOrder(sw, c) === false, `${label}: a single adjacent swap (${i}) was accepted`);
    }
    // tiles are a permutation of canonical
    const tiles = Core.scramble(c, r.seed || 1);
    check(tiles.slice().sort().join('|') === c.slice().sort().join('|'), `${label}: tiles are not a permutation of the sentence`);

    // derived: mutate the canonical order → the old-correct arrangement fails
    if (c.length >= 2) {
      const mutated = c.slice(); const t2 = mutated[0]; mutated[0] = mutated[1]; mutated[1] = t2;
      check(Core.gradeOrder(c, mutated) === false, `${label}: grade not derived from order (re-pointing canonical still accepted the old order)`);
    }

    // asset
    if (r.subject && r.subject.noun) check(colorImage(r.subject), `${label}: subject ${r.subject.noun} has no COLOR @2x.webp at themes/${r.subject.themeDir}/`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctSentences >= VARIETY_MIN, `only ${df.distinctSentences} distinct sentences (<${VARIETY_MIN})`);
  check(df.distinctSubjects >= 6, `only ${df.distinctSubjects} distinct subjects (<6)`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} sentence-builder violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} sentence(s), ${df0.distinctSubjects} subjects: each ≥4 words, capital-first + period-last, no dup words; ordered grade strict (only the exact order passes, every swap rejected); scramble differs; derived-not-stored (order-mutation); subjects color-imaged; ≥${VARIETY_MIN} distinct sentences. [L.1.1.j + L.K.1.b]`);
process.exit(0);
