/**
 * apply-var-locale.js <locale> <draft.json> — merges one locale's native-
 * ensemble draft for the nt20-VAR batch (92 variation titles/instructions +
 * appended data pools) into the target surfaces, with hard validation up
 * front (refuse-don't-guess). Idempotent for the strings entries; the data
 * appends are guarded so a re-run cannot double-append.
 *
 * Draft shape:
 * {
 *   locale,
 *   types: { 'K-244': {title, instruction}, ... all 92 ids },
 *   sightWordsAppend: [12 words],           // indices 12-23 of the pool
 *   readingPassagesAppend: [5 passages],    // indices 3-7
 *   animalPartitives: { vocabKey: form }    // fi ONLY (G1-213 animals fan)
 * }
 * Targets: i18n/strings.<loc>.json · data/literacy/sight-words.js ·
 * data/literacy/reading-passages.js · data/word-problems/frames.js (fi).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const TYPE_IDS = [
  'K-244', 'K-245', 'K-246', 'K-247', 'K-248', 'K-249', 'K-250', 'K-251', 'K-252', 'K-253',
  'K-254', 'K-255', 'K-256', 'K-257', 'K-258', 'K-259', 'K-260', 'K-261', 'K-262', 'K-263',
  'K-264', 'K-265', 'K-266', 'K-267', 'K-268', 'K-269', 'K-270', 'K-271', 'K-272',
  'K-273', 'K-274', 'K-275', 'K-276', 'K-277',
  'G1-214', 'G1-215', 'G1-216', 'G1-217', 'G1-218', 'G1-219', 'G1-220', 'G1-221', 'G1-222',
  'G1-223', 'G1-224', 'G1-225', 'G1-226', 'G1-227', 'G1-228', 'G1-229', 'G1-230', 'G1-231', 'G1-232',
  'G1-233', 'G1-234', 'G1-235', 'G1-236', 'G1-237', 'G1-238', 'G1-239', 'G1-240', 'G1-241',
  'G2-255', 'G2-256', 'G2-257', 'G2-258', 'G2-259', 'G2-260', 'G2-261', 'G2-262', 'G2-263',
  'G2-264', 'G2-265', 'G2-266', 'G2-267', 'G2-268', 'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273',
  'G3-359', 'G3-360', 'G3-361', 'G3-362', 'G3-363', 'G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368', 'G3-369',
];
const BAND_OF = (id) => id.split('-')[0];

function fail(msg) { console.error('ABORT: ' + msg); process.exit(1); }

const [, , locale, draftPath] = process.argv;
if (!locale || !draftPath) fail('usage: node apply-var-locale.js <locale> <draft.json>');
const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
if (draft.locale !== locale) fail(`draft.locale ${draft.locale} != ${locale}`);
if (TYPE_IDS.length !== 92) fail('TYPE_IDS != 92');

const strFile = path.join(ROOT, 'i18n', `strings.${locale}.json`);
const strings = JSON.parse(fs.readFileSync(strFile, 'utf8'));

/* ---------------- validation ---------------- */
const errs = [];
for (const id of TYPE_IDS) {
  const t = draft.types && draft.types[id];
  if (!t || !t.title || !t.instruction) { errs.push(`types.${id} missing`); continue; }
  if (/arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|tehtävämoniste/i.test(t.title)) {
    errs.push(`types.${id}: title contains a worksheet-word (engine adds it): "${t.title}"`);
  }
}
// per-band title uniqueness — the draft's 92 AND the locale's whole existing
// strings file (the collision class only lint-locale used to catch late)
const byBand = {};
for (const [id, s] of Object.entries(strings)) {
  if (!s || !s.title || draft.types && draft.types[id]) continue; // re-run: own entries replaced
  const band = BAND_OF(id);
  (byBand[band] = byBand[band] || new Map()).set(s.title.toLowerCase(), id);
}
for (const id of TYPE_IDS) {
  const t = draft.types && draft.types[id];
  if (!t || !t.title) continue;
  const band = BAND_OF(id);
  byBand[band] = byBand[band] || new Map();
  const key = t.title.toLowerCase();
  if (byBand[band].has(key)) errs.push(`title collision in band ${band}: "${t.title}" (vs ${byBand[band].get(key)})`);
  byBand[band].set(key, id);
}
// sight words append
const sightPath = path.join(ROOT, 'data', 'literacy', 'sight-words.js');
const { SIGHT_WORDS } = require(sightPath);
const existingWords = SIGHT_WORDS[locale] || [];
if (!Array.isArray(draft.sightWordsAppend) || draft.sightWordsAppend.length !== 12) errs.push('sightWordsAppend != 12');
else {
  draft.sightWordsAppend.forEach((w) => {
    if (typeof w !== 'string' || w.length > 10 || /\s/.test(w)) errs.push(`sight word "${w}" bad`);
    if (existingWords.slice(0, 12).includes(w)) errs.push(`sight word "${w}" already in the core 12`);
  });
  if (new Set(draft.sightWordsAppend).size !== 12) errs.push('sightWordsAppend has duplicates');
}
// passages append
const rpPath = path.join(ROOT, 'data', 'literacy', 'reading-passages.js');
const { READING_PASSAGES } = require(rpPath);
const existingPassages = READING_PASSAGES[locale] || [];
if (!Array.isArray(draft.readingPassagesAppend) || draft.readingPassagesAppend.length !== 5) errs.push('readingPassagesAppend != 5');
else draft.readingPassagesAppend.forEach((p, i) => {
  if (!p.id || !p.title || !p.text || p.text.length < 80) errs.push(`passage ${i}: missing/short`);
  if (existingPassages.some((e) => e.id === p.id)) errs.push(`passage ${i}: id "${p.id}" already exists`);
  if (!Array.isArray(p.questions) || p.questions.length !== 3) { errs.push(`passage ${i}: questions != 3`); return; }
  p.questions.forEach((q, j) => {
    if (!q.q || !Array.isArray(q.choices) || q.choices.length !== 3) errs.push(`passage ${i} q${j}: bad shape`);
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 2) errs.push(`passage ${i} q${j}: bad correct`);
    if (q.choices && new Set(q.choices).size !== q.choices.length) errs.push(`passage ${i} q${j}: duplicate choices`);
  });
  const corrects = p.questions.map((q) => q.correct);
  if (new Set(corrects).size === 1) errs.push(`passage ${i}: all corrects at index ${corrects[0]}`);
});
// new symmetry figure names
const NEW_FIGURES = ['tulip', 'sailboat', 'sun', 'crab', 'cactus', 'ladybug', 'owl', 'umbrella'];
for (const k of NEW_FIGURES) {
  if (!draft.figureNamesNew || !draft.figureNamesNew[k]) errs.push(`figureNamesNew.${k} missing`);
}
// fi animal partitives (the G1-213 animals fan gate)
let animalNouns = null;
if (locale === 'fi') {
  if (!draft.animalPartitives || typeof draft.animalPartitives !== 'object') errs.push('fi: animalPartitives missing');
  else {
    const { labelSafeNouns } = require(path.join(ROOT, 'image-cache', 'resolve.js'));
    animalNouns = labelSafeNouns('animals');
    for (const n of animalNouns) {
      if (!draft.animalPartitives[n.vocabKey]) errs.push(`fi: animalPartitives missing "${n.vocabKey}"`);
    }
  }
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(`${errs.length} validation error(s)`); }

/* ---------------- merges ---------------- */
for (const id of TYPE_IDS) strings[id] = { title: draft.types[id].title, instruction: draft.types[id].instruction };
fs.writeFileSync(strFile, JSON.stringify(strings, null, 2) + '\n');

function writeModule(rel, header, exportName, obj) {
  fs.writeFileSync(path.join(ROOT, rel),
    `${header}\n'use strict';\n\nconst ${exportName} = ${JSON.stringify(obj, null, 2)};\n\nmodule.exports = { ${exportName} };\n`);
}

// sight words: core 12 + appended 12 (guarded against double-append)
SIGHT_WORDS[locale] = [...existingWords.slice(0, 12), ...draft.sightWordsAppend];
writeModule('data/literacy/sight-words.js',
  `/**\n * High-frequency word lists for K-239 (see-trace-write lanes). Native per\n * locale (en Dolch-style; de Grundwortschatz core; fr mots-outils; nl\n * flitswoorden; da frequent-word tradition; fi fluency words). ≤8 letters,\n * lowercase. Words 0-11 = the frozen base-page core; 12-23 feed the\n * nt20-VAR set pages. GENERATED by tools/apply-*-locale.js — edit drafts.\n */`,
  'SIGHT_WORDS', SIGHT_WORDS);

// passages: first 3 + appended 5
READING_PASSAGES[locale] = [...existingPassages.slice(0, 3), ...draft.readingPassagesAppend];
writeModule('data/literacy/reading-passages.js',
  `/**\n * Short reading passages + MC questions for G2-254 (+ the nt20-VAR story\n * pages G2-269..273 at indices 3-7). ORIGINAL per locale — authored by\n * native ensembles, never translated. 3 questions × 3 choices, exactly one\n * correct. GENERATED by tools/apply-*-locale.js — edit drafts.\n */`,
  'READING_PASSAGES', READING_PASSAGES);

// new symmetry figure names → FIGURE_NAMES.<locale>
{
  const fnPath = path.join(ROOT, 'data', 'symmetry', 'figure-names.js');
  const { FIGURE_NAMES } = require(fnPath);
  FIGURE_NAMES[locale] = { ...FIGURE_NAMES[locale], ...draft.figureNamesNew };
  writeModule('data/symmetry/figure-names.js',
    `/**\n * Localized display names for the symmetry figures (G2-253 card labels +\n * the nt20-VAR symmetry pages). en authored at build; non-EN columns\n * authored by native ensembles. GENERATED by tools/apply-*-locale.js —\n * edit drafts, not this file.\n */`,
    'FIGURE_NAMES', FIGURE_NAMES);
}

// fi: extend the partitive table with the animals nouns
if (locale === 'fi') {
  const framesPath = path.join(ROOT, 'data', 'word-problems', 'frames.js');
  const { FRAMES } = require(framesPath);
  FRAMES.fi.nounForms = { ...FRAMES.fi.nounForms, ...draft.animalPartitives };
  writeModule('data/word-problems/frames.js',
    `/**\n * Native sentence FRAME BANKS for picture word problems (G1-213): fixed\n * native-authored frames, slots {name}/{n1}/{n2}/{noun} only, no adjectives\n * or definite articles by design (stored vocab plurals drop in unchanged;\n * fi uses a curated partitive table — build REFUSES an unknown noun).\n * GENERATED by tools/apply-*-locale.js — edit drafts, not this file.\n */`,
    'FRAMES', FRAMES);
}

console.log(`applied ${locale}: 92 variation strings, +12 sight words (pool ${SIGHT_WORDS[locale].length}), +5 passages (pool ${READING_PASSAGES[locale].length})` +
  (locale === 'fi' ? `, +${Object.keys(draft.animalPartitives).length} fi animal partitives` : ''));
if (draft.audits) console.log('audits:', JSON.stringify(draft.audits, null, 1));
if (draft.notes) console.log('notes:', draft.notes);
