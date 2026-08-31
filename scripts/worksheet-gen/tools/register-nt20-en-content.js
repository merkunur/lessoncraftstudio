/**
 * One-shot, idempotent EN content registrar for the nt20 batch:
 *  - i18n/skill-sentences.en.json: +17 family {full, short} pairs (the SEO
 *    description middle pool — substantive, band-filling sentences)
 *  - frontend/messages/en.json topicMeta: +17 new families AND the 8
 *    legacy keys the science/literacy fans left without topicMeta in any
 *    locale (lint-locale exits 1 on them today — this closes the en column;
 *    the locale fans close the other 10).
 * Never overwrites an existing key.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'pre-writing': {
    full: 'Tracing loops, waves, and zigzag paths trains the pencil control and hand strength that every letter and numeral will build on.',
    short: 'Builds pencil control and pre-writing motor skills.',
  },
  'number-tracing': {
    full: 'Tracing each numeral along its stroke path with a start dot and arrows builds correct number formation from the very first try.',
    short: 'Builds correct numeral formation.',
  },
  'letter-tracing': {
    full: 'Tracing capital letters on handwriting lines builds letterform memory and the steady strokes behind confident early writing.',
    short: 'Builds capital letter formation.',
  },
  'sight-words': {
    full: 'Reading, tracing, and writing high-frequency words moves them into instant memory so young readers can focus on meaning.',
    short: 'Builds instant recognition of frequent words.',
  },
  'cutting-practice': {
    full: 'Cutting out pictures and gluing each one into its group trains scissor control and early sorting thinking in one warm activity.',
    short: 'Builds scissor skills and sorting.',
  },
  'color-by-number': {
    full: 'Matching every code to its color turns careful looking and early math facts into a picture worth finishing.',
    short: 'Builds fact fluency through coloring.',
  },
  'mazes': {
    full: 'Finding the one path through the maze builds visual planning, pencil control, and patient problem solving.',
    short: 'Builds visual planning and pencil control.',
  },
  'number-bonds': {
    full: 'Completing part-part-whole bonds shows how numbers break apart and builds the decomposition facts behind mental math.',
    short: 'Builds number decomposition to 10.',
  },
  'mental-math': {
    full: 'Solving addition and subtraction to twenty in the head builds the fact fluency that later written methods stand on.',
    short: 'Builds add and subtract fluency to 20.',
  },
  'fact-families': {
    full: 'Completing all four related facts from one number trio shows how addition and subtraction undo each other.',
    short: 'Builds inverse-operation understanding.',
  },
  'number-words': {
    full: 'Matching numerals to their written number words strengthens place-value reading and guards against digit reversals.',
    short: 'Builds number-word reading.',
  },
  'money': {
    full: 'Counting real coin values from largest to smallest builds the money sense children use in everyday life.',
    short: 'Builds coin counting and money sense.',
  },
  'word-problems': {
    full: 'Reading a short story, checking the picture, and writing the answer turns arithmetic into real problem solving.',
    short: 'Builds word-problem solving with picture support.',
  },
  'column-arithmetic': {
    full: 'Working one place-value column at a time builds the careful written method used for bigger and bigger numbers.',
    short: 'Builds the written column method.',
  },
  'symmetry': {
    full: 'Completing the mirror half of a picture square by square builds symmetry understanding and precise spatial drawing.',
    short: 'Builds symmetry and spatial drawing.',
  },
  'reading-comprehension': {
    full: 'Reading a short story and answering questions about it builds the careful understanding all learning depends on.',
    short: 'Builds reading comprehension.',
  },
  'multiplication-tables': {
    full: 'Practicing times-table facts in ladders and mixed drills builds the instant recall that makes harder math feel easy.',
    short: 'Builds times-table fact fluency.',
  },
};

const TOPIC_META = {
  'pre-writing': 'Pre-writing practice worksheets for preschool and kindergarten: trace loops, waves, and zigzag pencil paths from the starting dot. Free printable PDFs.',
  'number-tracing': 'Number tracing worksheets for preschool and kindergarten: trace the numerals 0-9 with start dots, arrows, and handwriting lines. Free printable PDFs.',
  'letter-tracing': 'Letter tracing worksheets: trace capital letters on handwriting lines, from the first solid model to writing on your own. Free printable PDFs.',
  'sight-words': 'Sight word worksheets for kindergarten and grade 1: read, trace, and write high-frequency words on handwriting lines. Free printable PDFs.',
  'cutting-practice': 'Cut and paste worksheets for preschool and kindergarten: cut out the pictures, sort them, and glue each one into its box. Free printable PDFs.',
  'color-by-number': 'Color by code worksheets: solve each little problem or spot each shape, then color it by the code. Free printable PDFs.',
  'mazes': 'Maze worksheets for kids: draw the path from start to goal through friendly printable mazes. Free printable PDFs.',
  'number-bonds': 'Number bond worksheets to 10: write the missing part in each part-part-whole bond. Free printable PDFs.',
  'mental-math': 'Mental math worksheets to 20: quick addition and subtraction drills with missing-number challenges. Free printable PDFs.',
  'fact-families': 'Fact family worksheets: use the three numbers on the roof to complete all four related addition and subtraction facts. Free printable PDFs.',
  'number-words': 'Number words worksheets: read numerals up to 100 and circle or match the written number word. Free printable PDFs.',
  'money': 'Counting coins worksheets: count the money in each purse and write the total amount. Free printable PDFs.',
  'word-problems': 'Addition and subtraction word problem worksheets with picture support for grade 1 and grade 2. Free printable PDFs.',
  'column-arithmetic': 'Column addition and subtraction worksheets, with and without regrouping, one place value at a time. Free printable PDFs.',
  'symmetry': 'Symmetry drawing worksheets: complete the other half of each picture on the grid. Free printable PDFs.',
  'reading-comprehension': 'Reading comprehension worksheets: short stories with multiple-choice questions for early readers. Free printable PDFs.',
  'multiplication-tables': 'Times tables practice worksheets: table ladders, mixed drills, and missing factors. Free printable PDFs.',
  // the 8 legacy keys shipped without topicMeta in any locale (en column here)
  'science-sort': 'Science sorting worksheets: sort pictures into groups like living and non-living or land, water, and air. Free printable PDFs.',
  'science-sequence': 'Science sequencing worksheets: put the stages of natural cycles in the right order. Free printable PDFs.',
  'science-match': 'Science matching worksheets: match animal babies, community helpers, and their pairs. Free printable PDFs.',
  'beginning-sounds': 'Beginning sounds worksheets: say each picture and write or sort its first letter sound. Free printable PDFs.',
  'letter-knowledge': 'Letter knowledge worksheets: match capitals to lowercase, find letters, and complete the alphabet. Free printable PDFs.',
  'word-building': 'Word building worksheets: write the missing sound and build short words letter by letter. Free printable PDFs.',
  'picture-vocabulary': 'Picture vocabulary worksheets: match words to pictures and sort them by category. Free printable PDFs.',
  'phonological-awareness': 'Phonological awareness worksheets: ending sounds, middle sounds, rhyming pairs, and syllables. Free printable PDFs.',
};

const skills = JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf8'));
let sAdd = 0;
for (const [k, v] of Object.entries(SKILLS)) {
  if (skills[k]) continue;
  skills[k] = v; sAdd++;
}
fs.writeFileSync(SKILLS_FILE, JSON.stringify(skills, null, 2) + '\n');

const msgs = JSON.parse(fs.readFileSync(MSGS_FILE, 'utf8'));
if (!msgs.topicMeta) throw new Error('en.json has no topicMeta');
let tAdd = 0;
for (const [k, v] of Object.entries(TOPIC_META)) {
  if (msgs.topicMeta[k]) continue;
  msgs.topicMeta[k] = v; tAdd++;
}
fs.writeFileSync(MSGS_FILE, JSON.stringify(msgs, null, 2) + '\n');

console.log(`skill-sentences.en: +${sAdd} (now ${Object.keys(skills).length}); en.json topicMeta: +${tAdd} (now ${Object.keys(msgs.topicMeta).length})`);
