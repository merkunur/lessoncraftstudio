/**
 * One-shot, idempotent EN content registrar for the nt10-D batch (10 families):
 *  - i18n/skill-sentences.en.json: {full, short} per family — the SEO
 *    description middle pool (deck <meta description>; SEO metadata, so the
 *    "free printable" lead the emitter adds is allowed by the 2026-09-14
 *    ruling — these sentences themselves never claim free, and never promise
 *    an answer key: printable-only decks ship none, README open item 6).
 *    Must run BEFORE the EN wave (emit/deck-html.js skillSentenceFor() falls
 *    back to {} silently and a short-titled type then misses the 120 floor).
 *  - frontend/messages/en.json topicMeta.<family>: the /topic page <meta
 *    description> (SEO-only surface).
 * Never overwrites an existing key. `--dry-run` only validates.
 * Sentences express each design file §1/§6 lock (docs/worksheet-gen/
 * b4-designs/<ID>-<key>.md): odd-and-even never mentions doubles, a chart or a
 * ten-frame; rounding never mentions a number line; human-body/weather use the
 * compound heads. The 10 non-EN sets are authored by the native panels and
 * applied by tools/apply-b4-locale.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'tangram': {
    full: 'Cutting out the seven tans and fitting them into a shape trains children to see how big shapes are built from smaller ones and how a piece looks when it turns.',
    short: 'Builds shape composition with the seven tangram pieces.',
  },
  'human-body': {
    full: 'Labelling the parts of a drawn child, counting how many of each we have and finding which come in twos gives children the names for their own body.',
    short: 'Builds the names of the parts of the body.',
  },
  'five-senses': {
    full: 'Matching each object to the eye, ear, nose, tongue or hand that senses it, and sorting objects by sense, shows children how they explore the world.',
    short: 'Builds the five senses and the organ for each.',
  },
  'weather-symbols': {
    full: 'Reading the weather symbols on a chart, matching each to its word and keeping a weekly weather diary builds the words children use every morning.',
    short: 'Builds weather symbols, words and a weekly chart.',
  },
  'recycling': {
    full: 'Sorting empty packaging into the right bin by what it is made of teaches children the materials around them and why each has its own bin.',
    short: 'Builds sorting waste by material into the right bin.',
  },
  'cloze': {
    full: 'Reading a whole sentence beside its picture and writing the one missing word trains children to use the picture and the sentence together to read.',
    short: 'Builds reading for meaning with a missing word.',
  },
  'odd-and-even': {
    full: 'Pairing up the dots under a number and writing it as two equal parts shows children why a number is even or odd before they learn the last-digit rule.',
    short: 'Builds odd and even numbers from pairs.',
  },
  'pronouns': {
    full: 'Replacing a name with he, she or they under a portrait, and finding who a pronoun points back to, builds the small words that hold sentences together.',
    short: 'Builds personal pronouns for people.',
  },
  'question-words': {
    full: 'Reading an answer sentence and circling the question word that asks for the marked part trains children to see what who, what, where and when each ask for.',
    short: 'Builds question words from answer sentences.',
  },
  'rounding': {
    full: 'Looking at the deciding digit and writing the nearest ten or hundred, then rounding first to estimate a sum, builds the rounding rule children use for checking.',
    short: 'Builds rounding to the nearest ten and hundred.',
  },
};

const TOPIC_META = {
  'tangram': 'Tangram worksheets: a cut-out set of seven tans, shapes to solve, a missing piece to find and pieces to count. Printable PDFs for kindergarten to grade 2.',
  'human-body': 'Parts of the body worksheets: label the drawn child, count how many of each part, colour by the key and find the parts that come in twos. Printable PDFs for kindergarten and grade 1.',
  'five-senses': 'Five senses worksheets: match objects to the eye, ear, nose, tongue or hand, sort by sense and write the sense words. Printable PDFs for kindergarten and grade 1.',
  'weather-symbols': 'Weather symbol worksheets: match symbols to words, keep a weekly weather chart, read a forecast and label the water cycle. Printable PDFs for kindergarten to grade 3.',
  'recycling': 'Recycling sort worksheets: sort empty packaging into the right bin by material, write the material words and colour the bins. Printable PDFs for kindergarten to grade 2.',
  'cloze': 'Fill in the missing word worksheets: read each sentence beside its picture and write the missing word from the bank. Printable PDFs for grade 1 and grade 2.',
  'odd-and-even': 'Odd and even number worksheets: sort numbers into houses, pair the dots, share fairly and use the last-digit rule to 100. Printable PDFs for grade 1 to grade 3.',
  'pronouns': 'Personal pronoun worksheets: circle he, she or they under each portrait, replace the name and find who a pronoun points to. Printable PDFs for grade 1 and grade 2.',
  'question-words': 'Question word worksheets: read the answer sentence and circle who, what, where or when, then match and write questions. Printable PDFs for grade 1 and grade 2.',
  'rounding': 'Rounding worksheets: round to the nearest ten and hundred, sort up or down and round first to estimate a sum. Printable PDFs for grade 2 and grade 3.',
};

const ANSWER_KEY = /\b(with answers?|answer key)\b/i;

if (require.main === module) {
  const dry = process.argv.includes('--dry-run');
  const errs = [];
  const FREE = /\bfree\b/i;
  for (const [k, v] of Object.entries(SKILLS)) {
    if (v.full.length < 60 || v.full.length > 180) errs.push(`${k}.full ${v.full.length}`);
    if (v.short.length < 15 || v.short.length > 90) errs.push(`${k}.short ${v.short.length}`);
    if (FREE.test(v.full) || FREE.test(v.short)) errs.push(`${k}: skill sentence claims free`);
    if (ANSWER_KEY.test(v.full) || ANSWER_KEY.test(v.short) || ANSWER_KEY.test(TOPIC_META[k] || '')) errs.push(`${k}: promises an answer key (printable decks ship none)`);
    if ((TOPIC_META[k] || '').length < 50) errs.push(`${k}.topicMeta short`);
  }
  if (/\b(double|chart|ten-frame|ten frame)\b/i.test(SKILLS['odd-and-even'].full + ' ' + SKILLS['odd-and-even'].short)) errs.push('odd-and-even: mentions doubles / chart / ten-frame (design lock)');
  if (/number line/i.test(SKILLS['rounding'].full + ' ' + SKILLS['rounding'].short + ' ' + TOPIC_META['rounding'])) errs.push('rounding: mentions a number line (design lock)');
  if (Object.keys(TOPIC_META).length !== Object.keys(SKILLS).length) errs.push('SKILLS / TOPIC_META key sets differ');
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); process.exit(1); }
  if (dry) { console.log('dry-run ok: ' + Object.keys(SKILLS).length + ' families'); process.exit(0); }
  const skills = JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf8'));
  let sAdd = 0;
  for (const [k, v] of Object.entries(SKILLS)) { if (skills[k]) continue; skills[k] = v; sAdd++; }
  fs.writeFileSync(SKILLS_FILE, JSON.stringify(skills, null, 2) + '\n');
  const msgs = JSON.parse(fs.readFileSync(MSGS_FILE, 'utf8'));
  if (!msgs.topicMeta) throw new Error('en.json has no topicMeta');
  let tAdd = 0;
  for (const [k, v] of Object.entries(TOPIC_META)) { if (msgs.topicMeta[k]) continue; msgs.topicMeta[k] = v; tAdd++; }
  fs.writeFileSync(MSGS_FILE, JSON.stringify(msgs, null, 2) + '\n');
  console.log(`skill-sentences.en: +${sAdd} (now ${Object.keys(skills).length}); en.json topicMeta: +${tAdd} (now ${Object.keys(msgs.topicMeta).length})`);
}
module.exports = { SKILLS, TOPIC_META };
