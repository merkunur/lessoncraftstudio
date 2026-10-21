/**
 * Idempotent EN content registrar for the b9 batch (Picture Tracing, family `picture-tracing`):
 *  - i18n/skill-sentences.en.json: {full, short} — the SEO description middle pool (deck <meta description>; SEO
 *    metadata, so the "free printable" lead the emitter adds is allowed by the 2026-09-14 ruling — these sentences
 *    themselves never claim free). Picture Tracing is PDF ONLY: no sentence may promise an answer key or a screen.
 *    Must run BEFORE the EN wave (emit/deck-html.js skillSentenceFor() falls back to {} silently).
 *  - frontend/messages/en.json topicMeta['picture-tracing']: the /topic page <meta description>.
 * Never overwrites an existing skill / topicMeta key. `--dry-run` validates only.
 * The family must not speak its neighbours' heads as its own (pre-writing strokes, how to draw, dot to dot).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KEY = 'picture-tracing';
const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILL = {
  full: 'Tracing the dashed lines of a whole picture, one line at a time, builds pencil control, steady strokes and readiness for writing.',
  short: 'Builds steady pencil control.',   // short enough to band the longest titles' descriptions (K-423 core 119 < 120)
};
const TOPIC_META = 'Picture tracing worksheets for kids: trace a garden, a whale, a shape robot or a Christmas tree along dashed lines, then color it. Printable PDFs, preschool to grade 1.';

const PROMISE = /answer key|answers?\b|solution|screen|interactive/i;
const NEIGHBOUR = /\b(dot[- ]to[- ]dot|connect the dots|how to draw)\b/i;

function validate() {
  const errs = [];
  if (SKILL.full.length < 60 || SKILL.full.length > 180) errs.push('skill.full ' + SKILL.full.length);
  if (SKILL.short.length < 15 || SKILL.short.length > 90) errs.push('skill.short ' + SKILL.short.length);
  for (const t of [SKILL.full, SKILL.short, TOPIC_META]) {
    if (/\bfree\b/i.test(t)) errs.push('claims free: ' + t.slice(0, 40));
    if (PROMISE.test(t)) errs.push('promises what a PDF-only deck lacks: ' + t.match(PROMISE)[0]);
    if (NEIGHBOUR.test(t)) errs.push('a neighbour family head: ' + t.match(NEIGHBOUR)[0]);
  }
  if (TOPIC_META.length < 120 || TOPIC_META.length > 170) errs.push('topicMeta ' + TOPIC_META.length + ' chars (120-170)');
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
  console.log(`skill-sentences.en +${sAdd}; en.json topicMeta +${tAdd}`);
}
module.exports = { SKILL, TOPIC_META, validate };
