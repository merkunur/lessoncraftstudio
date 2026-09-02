/**
 * One-shot, idempotent EN content registrar for the nt20-B batch:
 *  - i18n/skill-sentences.en.json: +17 family {full, short} pairs (the SEO
 *    description middle pool — substantive, band-filling sentences; must run
 *    BEFORE the EN wave, because emit/deck-html.js skillSentenceFor() falls
 *    back to {} silently and a short-titled type then misses the 120 floor)
 *  - frontend/messages/en.json topicMeta: +17 new families
 * Never overwrites an existing key. `--dry-run` only validates lengths.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'word-tracing': {
    full: 'Tracing a picture word along its letter strokes and then writing it alone links the thing, its name, and its spelling in one glance.',
    short: 'Builds early word writing from pictures.',
  },
  'dot-to-dot': {
    full: 'Joining the numbered dots in order reveals a picture and rehearses the counting sequence with every pencil stroke.',
    short: 'Builds number sequence and pencil control.',
  },
  'grid-copy': {
    full: 'Copying a picture square by square onto an empty grid trains careful looking, position sense, and precise drawing.',
    short: 'Builds spatial copying on a grid.',
  },
  'singular-plural': {
    full: 'Seeing one picture beside many and writing the plural form builds the noun endings children hear but rarely spell.',
    short: 'Builds singular and plural noun forms.',
  },
  'articles': {
    full: 'Circling the right article beside each picture builds the noun-gender and article habits that every later sentence depends on.',
    short: 'Builds article and noun-gender knowledge.',
  },
  'read-and-color': {
    full: 'Reading each short sentence and coloring exactly what it says turns decoding into real comprehension the child can check.',
    short: 'Builds reading comprehension through coloring.',
  },
  'number-of-the-day': {
    full: 'Showing one number as a word, in tens and ones, in frames, tallies, and on the number line builds deep number sense.',
    short: 'Builds number sense through many representations.',
  },
  'write-the-word': {
    full: 'Writing the name of each picture on the line, with or without a word bank, builds spelling from sounds to letters.',
    short: 'Builds spelling from pictures.',
  },
  'alphabetical-order': {
    full: 'Putting picture words into alphabetical order builds letter-sequence knowledge and the dictionary skills readers rely on.',
    short: 'Builds alphabetical ordering.',
  },
  'number-walls': {
    full: 'Filling each brick with the sum of the two below it builds addition fluency and missing-addend thinking in one puzzle.',
    short: 'Builds addition fluency with number pyramids.',
  },
  'doubles-halves': {
    full: 'Doubling a group and halving another builds the doubles facts that unlock near-doubles, even numbers, and early multiplication.',
    short: 'Builds doubles and halves facts.',
  },
  'sentence-building': {
    full: 'Putting scrambled word tiles back into a sentence builds word order, capital letters, and the feel of a complete thought.',
    short: 'Builds sentence word order.',
  },
  'capitals-punctuation': {
    full: 'Rewriting each sentence with its capital letter and end mark builds the punctuation habits that make writing readable.',
    short: 'Builds capital letters and end punctuation.',
  },
  'word-classes': {
    full: 'Sorting words into nouns, verbs, and adjectives builds the grammar categories children need to talk about language.',
    short: 'Builds noun, verb, and adjective recognition.',
  },
  'calendar': {
    full: 'Reading dates, weekdays, and weeks off a real month grid builds the calendar skills children use every single day.',
    short: 'Builds calendar reading.',
  },
  'picture-writing': {
    full: 'Writing about a picture with a word bank and sentence starters turns a blank page into a first confident story.',
    short: 'Builds early writing from a picture prompt.',
  },
  'grid-coordinates': {
    full: 'Coloring each named square on a lettered and numbered grid builds coordinate reading and reveals a hidden picture.',
    short: 'Builds grid coordinate reading.',
  },
};

const TOPIC_META = {
  'word-tracing': 'Word tracing worksheets: look at the picture, trace its name on handwriting lines, then write the word yourself. Free printable PDFs.',
  'dot-to-dot': 'Dot-to-dot worksheets: connect the numbered dots in order to reveal the picture, counting to 20 and skip counting. Free printable PDFs.',
  'grid-copy': 'Copy the grid picture worksheets: draw the picture square by square onto the empty grid. Free printable PDFs.',
  'singular-plural': 'Singular and plural worksheets: one picture, many pictures. Trace and write the plural form of each noun. Free printable PDFs.',
  'articles': 'Article worksheets: circle the correct article for each picture noun. Free printable PDFs.',
  'read-and-color': 'Read and color worksheets: read each sentence and color the pictures exactly as it says. Free printable PDFs.',
  'number-of-the-day': 'Number of the day worksheets: show one number as a word, in tens and ones, in ten frames, tallies, and on the number line. Free printable PDFs.',
  'write-the-word': 'Write the word worksheets: write the name of each picture on the line, with a word bank to help. Free printable PDFs.',
  'alphabetical-order': 'Alphabetical order worksheets: put the picture words in ABC order using the alphabet strip. Free printable PDFs.',
  'number-walls': 'Number wall worksheets: fill each brick of the pyramid with the sum of the two bricks below it. Free printable PDFs.',
  'doubles-halves': 'Doubles and halves worksheets: double the group, halve the group, and write the number. Free printable PDFs.',
  'sentence-building': 'Unscramble the sentence worksheets: put the word tiles in order and write the sentence on the line. Free printable PDFs.',
  'capitals-punctuation': 'Capital letters and punctuation worksheets: rewrite each sentence with its capital letter and end mark. Free printable PDFs.',
  'word-classes': 'Word classes worksheets: sort the words into nouns, verbs, and adjectives. Free printable PDFs.',
  'calendar': 'Calendar worksheets: read the month grid and answer questions about dates, weekdays, and weeks. Free printable PDFs.',
  'picture-writing': 'Picture writing prompt worksheets: write about the picture using the word bank and sentence starters. Free printable PDFs.',
  'grid-coordinates': 'Grid coordinates worksheets: color the named squares on the lettered grid to reveal a hidden pixel picture. Free printable PDFs.',
};

if (require.main === module) {
  const dry = process.argv.includes('--dry-run');
  const errs = [];
  for (const [k, v] of Object.entries(SKILLS)) {
    if (v.full.length < 60 || v.full.length > 180) errs.push(`${k}.full ${v.full.length}`);
    if (v.short.length < 15 || v.short.length > 90) errs.push(`${k}.short ${v.short.length}`);
    if ((TOPIC_META[k] || '').length < 50) errs.push(`${k}.topicMeta short`);
  }
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); process.exit(1); }
  if (dry) { console.log('dry-run ok: 17 families'); process.exit(0); }
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
