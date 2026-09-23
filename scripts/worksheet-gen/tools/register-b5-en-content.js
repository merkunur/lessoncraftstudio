/**
 * One-shot, idempotent EN content registrar for the nt10-E batch (10 families):
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
 * b5-designs/<ID>-<key>.md): odd-and-even never mentions doubles, a chart or a
 * ten-frame; rounding never mentions a number line; human-body/weather use the
 * compound heads. The 10 non-EN sets are authored by the native panels and
 * applied by tools/apply-b5-locale.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  '2d-shapes': {
    full: 'Naming circles, squares, triangles and rectangles even when they are turned, stretched or small, and spotting the ones that only look close, builds true shape names.',
    short: 'Builds naming flat shapes in any position.',
  },
  'road-safety': {
    full: 'Reading which lamp is lit, following the steps to cross the road and learning what each road sign asks for gives children the rules that keep them safe outside.',
    short: 'Builds traffic lights, crossing and road signs.',
  },
  'family': {
    full: "Finding each person on a family tree and naming them from one child's point of view builds the family words children use every day, from grandma to cousin.",
    short: 'Builds the family words and reading a family tree.',
  },
  'plants': {
    full: 'Labelling the roots, stem, leaf, flower, fruit and seed of a whole plant, then asking what each part does and what a plant needs, builds a first plant science vocabulary.',
    short: 'Builds the parts of a plant and what they do.',
  },
  'animal-life-cycles': {
    full: "Putting the egg, caterpillar, chrysalis and butterfly (and the frog's stages) in order around a circle shows children that animals change as they grow and start again.",
    short: 'Builds the butterfly and frog life cycles in order.',
  },
  'earth-and-space': {
    full: "Deciding whether a fact is about the Sun, the Earth or the Moon, ordering the moon shapes and the planets, and explaining day and night builds a child's first picture of space.",
    short: 'Builds the Sun, Earth, Moon, moon phases and planets.',
  },
  'maps': {
    full: 'Reading a map key, seeing things from above, finding north, south, east and west and naming the continents and oceans builds the first map skills children need.',
    short: 'Builds map keys, directions and continents.',
  },
  'digraphs': {
    full: 'Saying each picture word and finding the two letters that make one sound, such as sh, ch and th, trains children to hear and read letter teams in new words.',
    short: 'Builds hearing and reading letter teams.',
  },
  'synonyms': {
    full: 'Finding the word that means the same, putting close words in order from a little to a lot and choosing a better word for said grows the vocabulary children write with.',
    short: 'Builds words that mean the same and shades of meaning.',
  },
  'word-parts': {
    full: 'Sorting words by their root word, finding the root that three words share and adding a prefix or a suffix shows children how words are built and what they mean.',
    short: 'Builds root words, prefixes and suffixes.',
  },
};

const TOPIC_META = {
  '2d-shapes': '2D shapes worksheets: name the shape even when it is turned or skinny, spot real triangles and rectangles, find shapes around us and draw them on dots. Printable PDFs for kindergarten and grade 1.',
  'road-safety': 'Road safety worksheets: read traffic lights, colour the lamps, put the steps for crossing the road in order and learn what road signs mean. Printable PDFs for kindergarten to grade 2.',
  'family': 'Family members worksheets: find each person on a family tree, order the generations, trace the family words and solve family riddles. Printable PDFs for kindergarten to grade 2.',
  'plants': 'Parts of a plant worksheets: label roots, stem, leaf, flower, fruit and seed, what plants need, the plant life cycle and the parts we eat. Printable PDFs for kindergarten to grade 3.',
  'animal-life-cycles': 'Animal life cycle worksheets: order the butterfly and frog life cycles, cut and paste the stages, label them and compare two animals. Printable PDFs for grade 1 to grade 3.',
  'earth-and-space': 'Sun, Moon and planets worksheets: facts about the Sun, Earth and Moon, moon phases in order, day and night, and the planets in order. Printable PDFs for grade 1 to grade 3.',
  'maps': 'Map skills worksheets: read a map key, match side and top views, use a compass rose and label the continents and oceans. Printable PDFs for kindergarten to grade 3.',
  'digraphs': 'Digraph worksheets: say each picture and circle the letter team, sort pictures, write the missing letters and read letter teams in sentences. Printable PDFs for kindergarten to grade 2.',
  'synonyms': 'Synonym worksheets: circle the word that means the same, match synonym pairs, order words from a little to a lot and pick a better word for said. Printable PDFs for grade 1 to grade 3.',
  'word-parts': 'Prefix, suffix and root word worksheets: sort words by their root, find the shared root word, pick a prefix by its meaning and use word parts in sentences. Printable PDFs for grade 1 to grade 3.',
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
  if (/antonym|opposite/i.test(SKILLS['synonyms'].full + ' ' + SKILLS['synonyms'].short + ' ' + TOPIC_META['synonyms'])) errs.push('synonyms: mentions antonyms/opposites (the opposites family owns them)');
  if (/word famil/i.test(SKILLS['word-parts'].full + ' ' + SKILLS['word-parts'].short + ' ' + TOPIC_META['word-parts'])) errs.push('word-parts: says "word families" (syllable-reading owns the name)');
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
