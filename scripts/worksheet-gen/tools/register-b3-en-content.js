/**
 * One-shot, idempotent EN content registrar for the nt20-C batch (20 families):
 *  - i18n/skill-sentences.en.json: {full, short} per family — the SEO
 *    description middle pool (deck <meta description>; SEO metadata, so the
 *    "free printable" lead the emitter adds is allowed by the 2026-09-14
 *    ruling — these sentences themselves never claim free). Must run BEFORE
 *    the EN wave: emit/deck-html.js skillSentenceFor() falls back to {}
 *    silently and a short-titled type then misses the 120 floor.
 *  - frontend/messages/en.json topicMeta.<family>: the /topic page <meta
 *    description> (SEO-only surface).
 * Never overwrites an existing key. `--dry-run` only validates lengths.
 * Sentences express what each design file §6 requires (docs/worksheet-gen/
 * b3-designs/<ID>-<key>.md); the 10 non-EN sets are authored by the native
 * panels and applied by tools/apply-b3-locale.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'letter-of-the-week': {
    full: 'Hunting one letter through a page of pictures, then tracing and sorting it, anchors the letter shape to its sound and to real words.',
    short: 'Builds letter recognition and letter-sound links.',
  },
  'sound-boxes': {
    full: 'Saying a picture word slowly and marking one box per sound trains children to hear the separate sounds a word is made of.',
    short: 'Builds phoneme segmentation with sound boxes.',
  },
  'feelings': {
    full: 'Naming the feeling on each face and matching it to a situation gives children the words they need to say how they feel.',
    short: 'Builds feeling words and emotional awareness.',
  },
  'ordinal-numbers': {
    full: 'Reading first to tenth along a line of pictures links position words to counting and to the place each thing holds in a row.',
    short: 'Builds ordinal numbers from first to tenth.',
  },
  'days-and-months': {
    full: 'Ordering the days of the week and the months of the year, and filling the gaps, builds the calendar sequence children use every morning.',
    short: 'Builds the sequence of days and months.',
  },
  'seasons': {
    full: 'Sorting pictures into spring, summer, autumn and winter links weather, clothes and activities to the season they belong to.',
    short: 'Builds the four seasons and what belongs to each.',
  },
  'all-about-me': {
    full: 'Drawing, counting and writing about themselves gives children a first page of their own to read, share and keep.',
    short: 'Builds self-description in words and pictures.',
  },
  'picture-word-cards': {
    full: 'Cut-out cards with a clear picture and its word support matching, sorting and reading games at the table and on the wall.',
    short: 'Builds picture-word vocabulary with cut-out cards.',
  },
  'syllable-split': {
    full: 'Marking the syllable breaks in longer words with arcs or bars shows children how a word is built and where to read it in parts.',
    short: 'Builds syllable division in longer words.',
  },
  'syllable-reading': {
    full: 'Reading syllables and word families in rows, then writing the word, turns blending practice into whole words children can read.',
    short: 'Builds blending from syllables and word families.',
  },
  'opposites': {
    full: 'Matching each picture to its opposite builds pairs like big and small or hot and cold that anchor early vocabulary and comparison.',
    short: 'Builds opposite pairs in vocabulary.',
  },
  'read-and-do': {
    full: 'Reading a short instruction and doing exactly what it says makes every sentence a comprehension check the child can see on the page.',
    short: 'Builds reading comprehension by following directions.',
  },
  'rhyming-words': {
    full: 'Finding the picture that rhymes and writing its word tunes the ear to word endings, the first step toward spelling patterns.',
    short: 'Builds rhyme awareness and word endings.',
  },
  'hundreds-chart-puzzles': {
    full: 'Filling the empty squares of a hundreds chart piece uses the row for tens and the column for ones, so every answer comes from position.',
    short: 'Builds place value on the hundreds chart.',
  },
  'spelling-rules': {
    full: 'Practising one spelling rule at a time across many words, then sorting words by the rule, makes the pattern stick beyond the word list.',
    short: 'Builds spelling rules through sorting and writing.',
  },
  'compound-words': {
    full: 'Joining two pictures into one compound word and splitting long words back into their parts shows how new words are built.',
    short: 'Builds compound words from their parts.',
  },
  'verb-forms': {
    full: 'Writing what someone does today and did yesterday beside each picture builds verb forms and tense in sentences children use.',
    short: 'Builds verb forms and simple tenses.',
  },
  'animal-fact-file': {
    full: 'Completing a fact file about an animal, from its class and covering to what it eats, turns reading facts into organised writing.',
    short: 'Builds informational writing about animals.',
  },
  'logic-puzzles': {
    full: 'Using clues to cross out and confirm cells in a logic grid trains step-by-step deduction until only one answer fits.',
    short: 'Builds logical deduction with grid puzzles.',
  },
  'division-with-remainder': {
    full: 'Sharing a pile into equal groups and writing what is left over introduces remainders as the honest answer when division does not come out even.',
    short: 'Builds division with remainders.',
  },
};

const TOPIC_META = {
  'letter-of-the-week': 'Letter of the week worksheets: hunt the letter in pictures, trace it, and sort words by their first sound. Printable PDFs for kindergarten.',
  'sound-boxes': 'Sound box worksheets: say the picture word slowly and mark one box per sound. Printable phoneme segmentation PDFs for kindergarten and grade 1.',
  'feelings': 'Feelings worksheets: name the emotion on each face and match feelings to situations. Printable PDFs for kindergarten social-emotional learning.',
  'ordinal-numbers': 'Ordinal number worksheets: first to tenth along a row of pictures, circle, color, and write the position words. Printable PDFs for kindergarten.',
  'days-and-months': 'Days of the week and months of the year worksheets: order them, fill the gaps, and write what comes next. Printable PDFs for kindergarten and grade 1.',
  'seasons': 'Four seasons worksheets: sort pictures into spring, summer, autumn, and winter by weather, clothes, and activities. Printable PDFs for kindergarten.',
  'all-about-me': 'All about me worksheets: draw, count, and write about yourself, your family, and your favourites. Printable PDFs for kindergarten.',
  'picture-word-cards': 'Picture word card worksheets: cut-out cards with a picture and its word for matching, sorting, and reading games. Printable PDFs for kindergarten.',
  'syllable-split': 'Syllable division worksheets: mark the syllable breaks in longer words with arcs or bars and count them. Printable PDFs for grade 1.',
  'syllable-reading': 'Word family worksheets: read the syllables and word families in rows, then write the whole word. Printable PDFs for grade 1.',
  'opposites': 'Opposites worksheets: match each picture to its opposite and write the pair. Printable antonym PDFs for grade 1.',
  'read-and-do': 'Read and do worksheets: read each instruction and do exactly what it says on the picture. Printable following-directions PDFs for grade 1.',
  'rhyming-words': 'Rhyming words worksheets: find the picture that rhymes and write its word. Printable rhyme PDFs for kindergarten and grade 1.',
  'hundreds-chart-puzzles': 'Hundreds chart puzzle worksheets: fill the empty squares of each chart piece using tens and ones. Printable PDFs for grade 1 and grade 2.',
  'spelling-rules': 'Spelling rule worksheets: practise one rule at a time, sort words by the rule, and write them. Printable PDFs for grade 2.',
  'compound-words': 'Compound word worksheets: join two pictures into one word and split long words into their parts. Printable PDFs for grade 2.',
  'verb-forms': 'Verb form worksheets: write what someone does today and did yesterday beside each picture. Printable tense PDFs for grade 2.',
  'animal-fact-file': 'Animal fact file worksheets: complete a report about an animal, from its class and covering to what it eats. Printable PDFs for grade 2.',
  'logic-puzzles': 'Logic grid puzzle worksheets: use the clues to cross out and confirm cells until one answer fits. Printable deduction PDFs for grade 2.',
  'division-with-remainder': 'Division with remainder worksheets: share into equal groups and write what is left over. Printable PDFs for grade 3.',
};

if (require.main === module) {
  const dry = process.argv.includes('--dry-run');
  const errs = [];
  const FREE = /\bfree\b/i;
  for (const [k, v] of Object.entries(SKILLS)) {
    if (v.full.length < 60 || v.full.length > 180) errs.push(`${k}.full ${v.full.length}`);
    if (v.short.length < 15 || v.short.length > 90) errs.push(`${k}.short ${v.short.length}`);
    if (FREE.test(v.full) || FREE.test(v.short)) errs.push(`${k}: skill sentence claims free (visible on the sheet's description middle)`);
    if ((TOPIC_META[k] || '').length < 50) errs.push(`${k}.topicMeta short`);
  }
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
