/**
 * One-shot, idempotent EN content registrar for the nt5-F batch (5 families):
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
 * b6-designs/<ID>-<key>.md): healthy-habits never mentions food, sink-or-float
 * never names weight as the reason. The 10 non-EN sets are authored by the native panels and
 * applied by tools/apply-b6-locale.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'story-sequencing': {
    full: 'Numbering the pictures of a short story, choosing what happens next and retelling it with first, next, then and last builds the order and words children need to tell a story.',
    short: 'Builds ordering a picture story and retelling it.',
  },
  'healthy-habits': {
    full: 'Matching each habit to what we use, putting hand washing and tooth brushing in order and choosing the healthy way to cough gives children the daily habits that keep them well.',
    short: 'Builds hand washing, tooth brushing and hygiene habits.',
  },
  'habitats': {
    full: 'Matching animals to the ocean, forest, pond or polar ice, pairing them with their homes and seeing how their bodies suit a place builds a first picture of where animals live.',
    short: 'Builds animal habitats, homes and adaptations.',
  },
  'sink-or-float': {
    full: 'Predicting whether each object will sink or float, testing it in water and recording what happened shows children that size alone does not decide, and starts real science thinking.',
    short: 'Builds predicting, testing and recording sink or float.',
  },
  'cursive-writing': {
    full: 'Tracing and writing joined letters in the school handwriting, practising the connections between letters and copying whole words builds a fluent, readable cursive hand.',
    short: 'Builds joined cursive letters, words and sentences.',
  },
};

const TOPIC_META = {
  'story-sequencing': 'Story sequencing worksheets: number the pictures of a short story, use first, next, then and last, choose what happens next, draw the middle and retell the story. Printable PDFs for kindergarten to grade 2.',
  'healthy-habits': 'Healthy habits and hygiene worksheets: match each habit to what we use, put hand washing and tooth brushing steps in order, stop the germs and track habits for a week. Printable PDFs for kindergarten to grade 2.',
  'habitats': 'Animal habitat worksheets: match animals to the ocean, forest, pond and polar habitats, pair animals with their homes, find who does not belong and see how animals adapt. Printable PDFs for kindergarten to grade 3.',
  'sink-or-float': 'Sink or float experiment worksheets: predict, test and record, find out why a big log floats and a small key sinks, change the shape of clay and draw what you saw. Printable PDFs for kindergarten to grade 3.',
  'cursive-writing': 'Cursive writing worksheets: trace and write joined lowercase letters and capitals, practise letter connections, write words, read cursive and copy a sentence. Printable PDFs for grade 1 to grade 3.',
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
  if (/food|eat|fruit|vegetable/i.test(SKILLS['healthy-habits'].full + ' ' + SKILLS['healthy-habits'].short + ' ' + TOPIC_META['healthy-habits'])) errs.push('healthy-habits: mentions food (K-203/G1-207 own food)');
  if (/heav|light/i.test(SKILLS['sink-or-float'].full + ' ' + SKILLS['sink-or-float'].short + ' ' + TOPIC_META['sink-or-float'])) errs.push('sink-or-float: names weight (the misconception the family refutes)');
  if (/trac(e|ing) the letters?|tracing worksheets/i.test(TOPIC_META['cursive-writing'])) errs.push('cursive-writing: tracing is the head of letter-tracing');
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
