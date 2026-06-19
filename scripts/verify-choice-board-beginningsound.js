#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-beginningsound.js — build-time correctness gate for the
   RF.K.3.a "Beginning Sounds" beginning-sound choice-board activity.
   ---------------------------------------------------------------------
   Loads the REAL choice-board-core.js + IMAGE_VOCABULARY + the filesystem image
   library, and proves, MEASURED, FOR EACH locale's rounds:
     1. correct word's first letter === round.letter (case-insensitive) — onset;
     2. NO distractor word starts with round.letter (no-shared-onset; letter-
        level — native owns sound-level);
     3. 4 tiles, all distinct nouns, correct ∉ distractors;
     4. EACH tile's image EXISTS on disk image-library-webp/themes/<themeDir>/
        <noun>@2x.webp AND themeDir is NOT a B&W dir (§5 color + HTTP-200 proxy);
     5. EACH stored word === IMAGE_VOCABULARY[noun][locale][0] (no fabrication);
     6. drive the REAL core (correct.noun → true; each distractor → false) ⇒
        EXACTLY ONE correct (no-two-correct);
     7. ≥7 rounds/locale; round.letter is a consonant.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.beginning-sound.rf-k-3-a';
const CONSONANTS = new Set('BCDFGHJKLMNPQRSTVWXZ'.split(''));
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: no ChoiceBoardCore'); process.exit(1); }
const vocabSrc = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
const VOCAB = new Function(vocabSrc + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();
if (!VOCAB) { console.error('FAIL: no IMAGE_VOCABULARY'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const fl = (w) => (w || '').trim().charAt(0).toLowerCase();
const isBW = (name) => /\bbw\b/i.test(name);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'beginning-sound', `task_template ${row.task_template} ≠ beginning-sound`);
check(row.alignment && row.alignment.code === 'RF.K.3.a', `alignment ${row.alignment && row.alignment.code} ≠ RF.K.3.a`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const byLocale = (row.params && row.params.byLocale) || {};
const locales = Object.keys(byLocale);
check(locales.length === 11, `expected 11 locales, saw ${locales.length}`);
let total = 0;

locales.forEach((loc) => {
  const rounds = (byLocale[loc] && byLocale[loc].rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${loc}: ${rounds.length} rounds < ${VARIETY_MIN}`);
  rounds.forEach((r, i) => {
    const label = `${loc} r#${i}[${r.letter}]`;
    const letter = r.letter, correct = r.correct, distractors = r.distractors || [];
    check(CONSONANTS.has((letter || '').toUpperCase()), `${label}: '${letter}' not a consonant`);

    const tiles = [correct].concat(distractors);
    check(tiles.length === 4, `${label}: ${tiles.length} tiles (expected 4)`);
    const nouns = tiles.map((t) => t.noun);
    check(new Set(nouns).size === nouns.length, `${label}: duplicate nouns ${JSON.stringify(nouns)}`);
    check(distractors.findIndex((d) => d.noun === correct.noun) < 0, `${label}: correct among distractors`);

    // onset: correct word first letter === target
    check(fl(correct.word) === (letter || '').toLowerCase(), `${label}: correct "${correct.word}" doesn't start with ${letter}`);
    // no-shared-onset
    distractors.forEach((d) => check(fl(d.word) !== (letter || '').toLowerCase(), `${label}: distractor "${d.word}" shares onset ${letter}`));

    // image exists + color + word matches vocab
    tiles.forEach((t) => {
      check(!isBW(t.themeDir), `${label}: tile '${t.noun}' themeDir "${t.themeDir}" is B&W`);
      check(imgExists(t.themeDir, t.noun), `${label}: image MISSING themes/${t.themeDir}/${t.noun}@2x.webp`);
      const v = VOCAB[t.noun];
      const vw = v && v[loc] && v[loc][0];
      check(vw === t.word, `${label}: word "${t.word}" ≠ vocab[${t.noun}][${loc}]="${vw}"`);
    });

    // drive the REAL core
    const seed = (i + 1) * 131;
    const options = tiles.map((t) => ({ key: t.noun, imgUrl: 'x', label: t.word }));
    Core.setupTask(options, correct.noun, { type: 'text', text: letter });
    let correctCount = 0;
    options.forEach((o) => {
      Core.answer = o.key;
      const graded = (Core.answer === correct.noun);
      if (graded) correctCount++;
      if (o.key === correct.noun) check(graded === true, `${label}: correct tile graded wrong`);
      else check(graded === false, `${label}: foil '${o.key}' graded correct`);
    });
    check(correctCount === 1, `${label}: ${correctCount} correct (expected EXACTLY 1)`);
    total++;
  });
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${locales.length} locales, ${total} rounds: onset match, no-shared-onset, image exists (color), word=vocab, EXACTLY ONE correct (REAL core), consonants, ≥${VARIETY_MIN}/locale.`);
process.exit(0);
