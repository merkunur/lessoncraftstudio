/**
 * apply-nt20-locale.js <locale> <draft.json> — merges one locale's native-
 * ensemble draft (the nt20 batch) into every target surface, with hard
 * validation up front (refuse-don't-guess: any structural defect aborts
 * before the first write). Idempotent: re-running overwrites that locale's
 * own entries only.
 *
 * Targets:
 *  - i18n/strings.<loc>.json                (+20 type title/instruction)
 *  - i18n/skill-sentences.<loc>.json        (+17 family {full,short})
 *  - frontend/config/topics-taxonomy.json   (slug.<loc> + name.<loc> ×17)
 *  - frontend/messages/<loc>.json topicMeta (+25)
 *  - data/symmetry/figure-names.js          (FIGURE_NAMES.<loc>)
 *  - data/literacy/sight-words.js           (SIGHT_WORDS.<loc>)
 *  - data/literacy/reading-passages.js      (READING_PASSAGES.<loc>)
 *  - data/word-problems/frames.js           (FRAMES.<loc>)
 * The four data modules are rewritten as generated JS (header + JSON body).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FRONTEND = path.join(ROOT, '..', '..', 'frontend');

const TYPE_IDS = ['K-236', 'K-237', 'K-238', 'K-239', 'K-240', 'K-241', 'K-242', 'K-243',
  'G1-208', 'G1-209', 'G1-210', 'G1-211', 'G1-212', 'G1-213',
  'G2-251', 'G2-252', 'G2-253', 'G2-254', 'G3-357', 'G3-358'];
const FAMILIES = ['pre-writing', 'number-tracing', 'letter-tracing', 'sight-words', 'cutting-practice',
  'color-by-number', 'mazes', 'number-bonds', 'mental-math', 'fact-families', 'number-words', 'money',
  'word-problems', 'column-arithmetic', 'symmetry', 'reading-comprehension', 'multiplication-tables'];
const LEGACY_META = ['science-sort', 'science-sequence', 'science-match', 'beginning-sounds',
  'letter-knowledge', 'word-building', 'picture-vocabulary', 'phonological-awareness'];
const FIGURE_KEYS = ['heart', 'butterfly', 'rocket', 'tree', 'house', 'crown', 'star', 'arrow',
  'flower', 'mushroom', 'cat', 'robot', 'apple', 'diamond', 'ice-cream', 'snowman'];
const BAND_OF = (id) => id.split('-')[0];

function fail(msg) { console.error('ABORT: ' + msg); process.exit(1); }

const [, , locale, draftPath] = process.argv;
if (!locale || !draftPath) fail('usage: node apply-nt20-locale.js <locale> <draft.json>');
const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
if (draft.locale !== locale) fail(`draft.locale ${draft.locale} != ${locale}`);

/* ---------------- validation ---------------- */
const errs = [];
// types
for (const id of TYPE_IDS) {
  const t = draft.types && draft.types[id];
  if (!t || !t.title || !t.instruction) { errs.push(`types.${id} missing`); continue; }
  if (/arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille/i.test(t.title)) {
    errs.push(`types.${id}: title contains a worksheet-word (engine adds it): "${t.title}"`);
  }
}
// per-band title uniqueness
const byBand = {};
for (const id of TYPE_IDS) {
  const t = draft.types && draft.types[id];
  if (!t) continue;
  const band = BAND_OF(id);
  byBand[band] = byBand[band] || new Set();
  const key = t.title.toLowerCase();
  if (byBand[band].has(key)) errs.push(`duplicate title in band ${band}: "${t.title}"`);
  byBand[band].add(key);
}
// families
const slugSeen = new Set();
for (const f of FAMILIES) {
  const e = draft.families && draft.families[f];
  if (!e || !e.slug || !e.name) { errs.push(`families.${f} missing`); continue; }
  if (!/^[a-z0-9äöüåæøéèêáàâãíóòôõúùûçñß-]+$/i.test(e.slug)) errs.push(`families.${f}: bad slug "${e.slug}"`);
  const s = e.slug.toLowerCase();
  if (slugSeen.has(s)) errs.push(`duplicate family slug "${e.slug}"`);
  slugSeen.add(s);
}
// skills
for (const f of FAMILIES) {
  const s = draft.skills && draft.skills[f];
  if (!s || !s.full || !s.short) { errs.push(`skills.${f} missing`); continue; }
  if (s.full.length < 60 || s.full.length > 180) errs.push(`skills.${f}.full length ${s.full.length}`);
  if (s.short.length < 15 || s.short.length > 90) errs.push(`skills.${f}.short length ${s.short.length}`);
}
// topicMeta
for (const k of [...FAMILIES, ...LEGACY_META]) {
  const v = draft.topicMeta && draft.topicMeta[k];
  if (!v || v.length < 50) errs.push(`topicMeta.${k} missing/short`);
}
// figures
for (const k of FIGURE_KEYS) {
  if (!draft.figureNames || !draft.figureNames[k]) errs.push(`figureNames.${k} missing`);
}
// sight words
if (!Array.isArray(draft.sightWords) || draft.sightWords.length < 12) errs.push('sightWords < 12');
else draft.sightWords.forEach((w) => { if (w.length > 10 || /\s/.test(w)) errs.push(`sightWord "${w}" too long/spacey`); });
// passages
if (!Array.isArray(draft.readingPassages) || draft.readingPassages.length !== 3) errs.push('readingPassages != 3');
else draft.readingPassages.forEach((p, i) => {
  if (!p.id || !p.title || !p.text || p.text.length < 80) errs.push(`passage ${i}: missing/short text`);
  if (!Array.isArray(p.questions) || p.questions.length !== 3) { errs.push(`passage ${i}: questions != 3`); return; }
  p.questions.forEach((q, j) => {
    if (!q.q || !Array.isArray(q.choices) || q.choices.length !== 3) errs.push(`passage ${i} q${j}: bad shape`);
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 2) errs.push(`passage ${i} q${j}: bad correct`);
    if (q.choices && new Set(q.choices).size !== q.choices.length) errs.push(`passage ${i} q${j}: duplicate choices`);
  });
  const corrects = p.questions.map((q) => q.correct);
  if (new Set(corrects).size === 1) errs.push(`passage ${i}: all corrects at index ${corrects[0]}`);
});
// word problems
const wp = draft.wordProblems || {};
if (!['lower', 'keep'].includes(wp.nounCase)) errs.push('wordProblems.nounCase invalid');
if (!Array.isArray(wp.names) || wp.names.length < 6) errs.push('wordProblems.names < 6');
if (!wp.frames || !Array.isArray(wp.frames.add) || wp.frames.add.length < 3) errs.push('frames.add < 3');
if (!wp.frames || !Array.isArray(wp.frames.sub) || wp.frames.sub.length < 3) errs.push('frames.sub < 3');
['add', 'sub'].forEach((op) => (wp.frames && wp.frames[op] || []).forEach((f, i) => {
  for (const slot of ['{name}', '{n1}', '{n2}', '{noun}']) {
    if (!f.includes(slot)) errs.push(`frames.${op}[${i}]: missing ${slot}`);
  }
  if (/\{noun\}\s*\{|\{\w+\}\{/.test(f)) errs.push(`frames.${op}[${i}]: adjacent slots`);
}));
// fi partitive requirement
if (locale === 'fi' && wp.nounForm === 'partitive' && !wp.nounForms) errs.push('fi: nounForm partitive but no nounForms table');

if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(`${errs.length} validation error(s)`); }

/* ---------------- merges ---------------- */
const writeJson = (p, obj) => fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');

// 1. strings.<loc>.json
const strFile = path.join(ROOT, 'i18n', `strings.${locale}.json`);
const strings = JSON.parse(fs.readFileSync(strFile, 'utf8'));
for (const id of TYPE_IDS) strings[id] = { title: draft.types[id].title, instruction: draft.types[id].instruction };
writeJson(strFile, strings);

// 2. skill-sentences.<loc>.json
const skFile = path.join(ROOT, 'i18n', `skill-sentences.${locale}.json`);
const skills = JSON.parse(fs.readFileSync(skFile, 'utf8'));
for (const f of FAMILIES) skills[f] = { full: draft.skills[f].full, short: draft.skills[f].short };
writeJson(skFile, skills);

// 3. taxonomy
const taxFile = path.join(FRONTEND, 'config', 'topics-taxonomy.json');
const tax = JSON.parse(fs.readFileSync(taxFile, 'utf8'));
for (const f of FAMILIES) {
  const ax = tax.axes['exercise-type'][f];
  if (!ax) fail(`taxonomy missing family ${f} (run register-nt20-taxonomy first)`);
  ax.slug[locale] = draft.families[f].slug;
  ax.name[locale] = draft.families[f].name;
}
// cross-family slug-collision check within the locale
const locSlugs = {};
for (const [k, ax] of Object.entries(tax.axes['exercise-type'])) {
  const s = ax.slug && ax.slug[locale];
  if (!s) continue;
  if (locSlugs[s] && locSlugs[s] !== k) fail(`slug collision in ${locale}: "${s}" used by ${locSlugs[s]} and ${k}`);
  locSlugs[s] = k;
}
writeJson(taxFile, tax);

// 4. messages topicMeta
const msgFile = path.join(FRONTEND, 'messages', `${locale}.json`);
const msgs = JSON.parse(fs.readFileSync(msgFile, 'utf8'));
if (!msgs.topicMeta) fail(`${locale}.json has no topicMeta`);
for (const k of [...FAMILIES, ...LEGACY_META]) msgs.topicMeta[k] = draft.topicMeta[k];
writeJson(msgFile, msgs);

// 5-8. the data modules (rewritten as generated JS, headers preserved here)
function writeModule(rel, header, exportName, obj) {
  const p = path.join(ROOT, rel);
  fs.writeFileSync(p, `${header}\n'use strict';\n\nconst ${exportName} = ${JSON.stringify(obj, null, 2)};\n\nmodule.exports = { ${exportName} };\n`);
}
const figures = require(path.join(ROOT, 'data', 'symmetry', 'figure-names.js')).FIGURE_NAMES;
figures[locale] = draft.figureNames;
writeModule('data/symmetry/figure-names.js',
  `/**\n * Localized display names for the symmetry figures (G2-253 card labels).\n * en authored at build; non-EN columns authored by native ensembles at the\n * fan (single nouns, the locale's own school caption convention).\n * GENERATED by tools/apply-nt20-locale.js — edit drafts, not this file.\n */`,
  'FIGURE_NAMES', figures);

const sight = require(path.join(ROOT, 'data', 'literacy', 'sight-words.js')).SIGHT_WORDS;
sight[locale] = draft.sightWords;
writeModule('data/literacy/sight-words.js',
  `/**\n * High-frequency word lists for K-239 (see-trace-write lanes). Native per\n * locale (en Dolch-style; de Grundwortschatz core; fr mots-outils; nl\n * flitswoorden; da frequent-word tradition; fi fluency words). ≤8 letters,\n * lowercase. GENERATED by tools/apply-nt20-locale.js — edit drafts, not this file.\n */`,
  'SIGHT_WORDS', sight);

const passages = require(path.join(ROOT, 'data', 'literacy', 'reading-passages.js')).READING_PASSAGES;
passages[locale] = draft.readingPassages;
writeModule('data/literacy/reading-passages.js',
  `/**\n * Short reading passages + MC questions for G2-254. ORIGINAL per locale —\n * authored by native ensembles, never translated. [0] short (d1) · [1]\n * medium (d2) · [2] longer (d3); 3 questions × 3 choices, exactly one\n * correct. GENERATED by tools/apply-nt20-locale.js — edit drafts, not this file.\n */`,
  'READING_PASSAGES', passages);

const frames = require(path.join(ROOT, 'data', 'word-problems', 'frames.js')).FRAMES;
frames[locale] = {
  nounForm: wp.nounForm || 'plural',
  nounCase: wp.nounCase,
  ...(wp.nounForms ? { nounForms: wp.nounForms } : {}),
  names: wp.names,
  frames: wp.frames,
};
writeModule('data/word-problems/frames.js',
  `/**\n * Native sentence FRAME BANKS for picture word problems (G1-213): fixed\n * native-authored frames, slots {name}/{n1}/{n2}/{noun} only, no adjectives\n * or definite articles by design (stored vocab plurals drop in unchanged;\n * fi uses a curated partitive table — build REFUSES an unknown noun).\n * GENERATED by tools/apply-nt20-locale.js — edit drafts, not this file.\n */`,
  'FRAMES', frames);

console.log(`applied ${locale}: 20 types, 17 families, 17 skills, ${[...FAMILIES, ...LEGACY_META].length} topicMeta, 16 figures, ${draft.sightWords.length} sight words, 3 passages, ${wp.frames.add.length}+${wp.frames.sub.length} frames`);
if (draft.audits) console.log('audits:', JSON.stringify(draft.audits, null, 1));
if (draft.notes) console.log('notes:', draft.notes);
