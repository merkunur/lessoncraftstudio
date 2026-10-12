/**
 * Idempotent EN content registrar for the b8 batch (Handmade Mazes, family `maze-puzzles`):
 *  - i18n/skill-sentences.en.json: {full, short} — the SEO description middle pool (deck <meta description>; SEO
 *    metadata, so the "free printable" lead the emitter adds is allowed by the 2026-09-14 ruling — these sentences
 *    themselves never claim free). Every maze deck ships a draw-the-way screen and an answer key, so it may say so.
 *    Must run BEFORE the EN wave (emit/deck-html.js skillSentenceFor() falls back to {} silently).
 *  - frontend/messages/en.json topicMeta['maze-puzzles']: the /topic page <meta description>.
 *  - i18n/interactive-instructions.json `maze-puzzles`.mz-<mode>.en ← data/b8/maze-puzzles.js EN tap strings (the bank
 *    is the SOURCE: a differing value is UPDATED and reported, never left to drift — the b7 two-places trap).
 * Never overwrites an existing skill / topicMeta key. `--dry-run` validates only.
 * The family must not speak the grid family's heads (K-242 / K-270-272: easy / hard / giant / animal maze).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { EN_STRINGS, MODES } = require('../data/b8/maze-puzzles.js');

const KEY = 'maze-puzzles';
const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const II_FILE = path.join(__dirname, '..', 'i18n', 'interactive-instructions.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILL = {
  full: 'Drawing one line through a picture maze, choosing the next letter, number or sum at each fork, builds planning and pencil control; every page has a draw-the-way screen and a key.',
  short: 'Builds planning: draw one way through a picture maze.',
};
const TOPIC_META = 'Maze puzzles for kids: guide a hedgehog, a rocket or a polar bear through a picture maze, follow letters A to Z or numbers 1 to 20, count by 5s or find sums that make 10. Printable PDFs with an answer key, preschool to grade 2.';

const GRID_HEADS = /\b(easy|hard|giant|animal) mazes?\b/i;

function validate() {
  const errs = [];
  if (SKILL.full.length < 60 || SKILL.full.length > 180) errs.push('skill.full ' + SKILL.full.length);
  if (SKILL.short.length < 15 || SKILL.short.length > 90) errs.push('skill.short ' + SKILL.short.length);
  for (const t of [SKILL.full, SKILL.short, TOPIC_META]) {
    if (/\bfree\b/i.test(t)) errs.push('claims free: ' + t.slice(0, 40));
    if (GRID_HEADS.test(t)) errs.push('a grid-family head: ' + t.match(GRID_HEADS)[0]);
  }
  if (TOPIC_META.length < 50) errs.push('topicMeta short');
  for (const m of MODES) if (!EN_STRINGS[m] || !EN_STRINGS[m].tap) errs.push('no tap string for ' + m);
  return errs;
}

if (require.main === module) {
  const dry = process.argv.includes('--dry-run');
  const errs = validate();
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); process.exit(1); }
  if (dry) { console.log('dry-run ok'); process.exit(0); }
  const skills = JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf8'));
  const sAdd = skills[KEY] ? 0 : 1; if (!skills[KEY]) skills[KEY] = SKILL;
  fs.writeFileSync(SKILLS_FILE, JSON.stringify(skills, null, 2) + '\n');
  const msgs = JSON.parse(fs.readFileSync(MSGS_FILE, 'utf8'));
  if (!msgs.topicMeta) throw new Error('en.json has no topicMeta');
  const tAdd = msgs.topicMeta[KEY] ? 0 : 1; if (!msgs.topicMeta[KEY]) msgs.topicMeta[KEY] = TOPIC_META;
  fs.writeFileSync(MSGS_FILE, JSON.stringify(msgs, null, 2) + '\n');
  const ii = JSON.parse(fs.readFileSync(II_FILE, 'utf8'));
  ii[KEY] = ii[KEY] || {};
  let iAdd = 0, iUpd = 0;
  for (const m of MODES) {
    const k = 'mz-' + m; ii[KEY][k] = ii[KEY][k] || {};
    const want = EN_STRINGS[m].tap;
    if (ii[KEY][k].en === want) continue;
    if (ii[KEY][k].en) { iUpd++; console.log('  updated ' + k + '.en (bank is the source)'); } else iAdd++;
    ii[KEY][k].en = want;
  }
  fs.writeFileSync(II_FILE, JSON.stringify(ii, null, 1) + '\n');   // the file's own 1-space indent (a 2-space write rewrites all 5,000 lines)
  console.log(`skill-sentences.en +${sAdd}; en.json topicMeta +${tAdd}; interactive-instructions ${KEY}: +${iAdd} added, ${iUpd} updated`);
}
module.exports = { SKILL, TOPIC_META, validate };
