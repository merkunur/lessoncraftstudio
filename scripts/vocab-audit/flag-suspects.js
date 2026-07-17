#!/usr/bin/env node
/* =====================================================================
   flag-suspects.js — the CHEAP pre-filter for locales 4-11.

   The sv/de/nl waves used 13 Opus agents each (12 image-opening batches +
   an adversarial pass). That is unaffordable ×7. But those three waves
   produced a gift: they tell us WHICH KEYS ARE ERROR-PRONE. A word the
   builder got wrong in three independent languages (dinosaur
   over-Latinisations, English loans, mass nouns, plural-in-singular) is
   very likely wrong in da/no/fi/fr/es/pt/it too.

   So instead of re-checking all 1263 keys per locale, we check only the
   SUSPECTS — no images (the classification + art-defects are already
   cross-locale), no adversarial pass. One small agent per locale verifies
   this focused set against the dictionary. ~20× cheaper.

   A key is a suspect for locale L when it is a NOUN (gender-bearing, not a
   plural-picture, not blocked/art-defect) AND any of:
     (a) it was CORRECTED in sv, de, or nl — proven error-prone; OR
     (b) L's stored plural EQUALS its singular while the classification
         says countable-thing — a countable noun the builder gave NO
         plural (the "missing plural" class); OR
     (c) it is an English/foreign LOAN — the locale singular is byte-equal
         to the English singular, where the builder's native-suffix rule
         most often fails (basketball, muffin, kettlebell...).

   Gender is NOT a suspect axis: sv/de/nl found 2/3/3 gender fixes in 1263
   — ~99.5% correct. The agent checks gender only on the flagged keys, in
   passing.

   USAGE  node scripts/vocab-audit/flag-suspects.js --locale=da
   Writes docs/audit-results/vocab-audit/suspects/<loc>.json  (READ-ONLY else)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const VOCAB = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const DONE = ['sv', 'de', 'nl'];

function loadVocab() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(VOCAB, 'utf8') + '\n; __O = IMAGE_VOCABULARY;', ctx);
  return ctx.__O;
}

function main() {
  const a = process.argv.find((x) => x.startsWith('--locale='));
  if (!a) { console.error('FAIL: --locale=<xx> required'); process.exit(1); }
  const loc = a.split('=')[1];

  const vocab = loadVocab();
  const cls = JSON.parse(fs.readFileSync(path.join(OUT, 'classification.json'), 'utf8')).rows;

  /* the gift: every key any completed locale had to correct */
  const errorProne = new Set();
  for (const d of DONE) {
    try {
      const c = JSON.parse(fs.readFileSync(path.join(OUT, 'corrections-' + d + '.json'), 'utf8')).corrections;
      for (const f of ['singular', 'plural', 'gender']) for (const k of Object.keys(c[f] || {})) errorProne.add(k);
    } catch (e) { /* a locale not yet done — fine */ }
  }

  const suspects = [];
  const reasons = { errorProne: 0, missingPlural: 0, loan: 0 };
  for (const key of Object.keys(vocab)) {
    const c = cls[key];
    const row = vocab[key][loc];
    if (!c || !row) continue;
    if (!c.hasGender) continue;                 /* non-noun — already stripped */
    if (c.category === 'plural-picture') continue;   /* handled (no article, label IS plural) */
    if (c.blocked || c.art_defect) continue;    /* word follows the key; art bug, not a word bug */

    const s = row[0], p = row[1];
    const why = [];
    if (errorProne.has(key)) { why.push('error-prone (fixed in ' + DONE.join('/') + ')'); reasons.errorProne++; }
    if (c.hasPlural && s === p) { why.push('countable but NO plural (p===s)'); reasons.missingPlural++; }
    const enS = vocab[key].en && vocab[key].en[0];
    if (enS && String(enS).toLowerCase() === String(s).toLowerCase() && c.hasPlural) { why.push('English/foreign loan (locale==en)'); reasons.loan++; }

    if (why.length) suspects.push({ key, cur: { s, p, g: row.length > 2 ? row[2] : null }, en: vocab[key].en, themes: c.image_seen ? undefined : undefined, category: c.category, hasPlural: c.hasPlural, why: why.join(' + ') });
  }

  fs.mkdirSync(path.join(OUT, 'suspects'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'suspects', loc + '.json'),
    JSON.stringify({ locale: loc, count: suspects.length, note: 'CHECK EACH against the dictionary; gender in passing. Non-nouns/plural-pictures/art-defects excluded — already handled.', rows: suspects }, null, 1) + '\n');

  console.log(loc + ': ' + suspects.length + ' suspects of ' + Object.keys(vocab).length + ' keys  (~' + Math.round(suspects.length / Object.keys(vocab).length * 100) + '%)');
  console.log('   error-prone (fixed in sv/de/nl): ' + reasons.errorProne);
  console.log('   countable but no plural         : ' + reasons.missingPlural);
  console.log('   English/foreign loan            : ' + reasons.loan);
  console.log('→ suspects/' + loc + '.json');
}
main();
