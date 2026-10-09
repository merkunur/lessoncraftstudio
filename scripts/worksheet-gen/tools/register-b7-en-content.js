/**
 * One-shot, idempotent EN content registrar for the nt2-G batch (2 flagship families):
 *  - i18n/skill-sentences.en.json: {full, short} per family — the SEO description middle pool (deck <meta
 *    description>; SEO metadata, so the "free printable" lead the emitter adds is allowed by the 2026-09-14 ruling —
 *    these sentences themselves never claim free). find-the-differences decks DO ship a tap screen + an answer key
 *    (the family is uniformly interactive: frontend INTERACTIVE_PRINTABLE_FAMILIES) and may say so; how-to-draw decks
 *    are printable-only and must never promise a key or a screen.
 *    Must run BEFORE the EN wave (emit/deck-html.js skillSentenceFor() falls back to {} silently and a short-titled
 *    type then misses the 120 floor).
 *  - frontend/messages/en.json topicMeta.<family>: the /topic page <meta description> (SEO-only surface).
 * Never overwrites an existing key. `--dry-run` only validates.
 * Sentences express each design file §1/§6 lock (docs/worksheet-gen/b7-designs/<ID>-<key>.md): find-the-differences
 * never the K-061 bare head "spot the differences" as its own name, never "math"; how-to-draw never "tracing" /
 * "coloring" as a head. The 10 non-EN sets are authored by the native panels and applied by tools/apply-b7-locale.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, '..', 'i18n', 'skill-sentences.en.json');
const MSGS_FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'en.json');

const SKILLS = {
  'find-the-differences': {
    full: 'Comparing two pictures of one scene, circling what is gone, new, turned round, bigger or moved and ticking a box for each find trains careful looking; every page has a tap version and an answer key.',
    short: 'Builds careful looking by comparing two pictures of one scene.',
  },
  'how-to-draw': {
    full: 'Drawing an animal from four or five numbered steps, first the outline, then the big parts, the face and the details, gives children a way to draw any animal they like with their own pencil.',
    short: 'Builds drawing an animal step by step from its outline.',
  },
};

const TOPIC_META = {
  'find-the-differences': 'Find the differences worksheets: compare two pictures of one scene, circle 3, 5, 7 or 10 differences, find what is missing or what changed, and check with the answer key or the tap version. Printable PDFs for kindergarten to grade 2.',
  'how-to-draw': 'How to draw worksheets: draw a cat, dog, rabbit, horse, dinosaur, fish, frog, owl, bird, bear or butterfly step by step from numbered steps, start with simple shapes, trace, finish or draw from memory. Printable PDFs for kindergarten to grade 2.',
};

const ANSWER_KEY = /\b(with answers?|answer key|interactive|tap version)\b/i;

if (require.main === module) {
  const dry = process.argv.includes('--dry-run');
  const errs = [];
  const FREE = /\bfree\b/i;
  for (const [k, v] of Object.entries(SKILLS)) {
    if (v.full.length < 60 || v.full.length > 200) errs.push(`${k}.full ${v.full.length}`);
    if (v.short.length < 15 || v.short.length > 90) errs.push(`${k}.short ${v.short.length}`);
    if (FREE.test(v.full) || FREE.test(v.short)) errs.push(`${k}: skill sentence claims free`);
    if ((TOPIC_META[k] || '').length < 50) errs.push(`${k}.topicMeta short`);
  }
  const htd = SKILLS['how-to-draw'].full + ' ' + SKILLS['how-to-draw'].short + ' ' + TOPIC_META['how-to-draw'];
  if (ANSWER_KEY.test(htd)) errs.push('how-to-draw: promises an answer key or a screen (printable-only decks ship none)');
  if (/\btrac(e|ing) (the )?letters?|tracing worksheets|colou?ring worksheets/i.test(htd)) errs.push('how-to-draw: tracing / colouring is another family\'s head');
  const fd = SKILLS['find-the-differences'].full + ' ' + SKILLS['find-the-differences'].short + ' ' + TOPIC_META['find-the-differences'];
  if (/\bmath\b/i.test(fd)) errs.push('find-the-differences: "math" (the subtraction tail, never this family)');
  if (/^spot the differences/i.test(TOPIC_META['find-the-differences'])) errs.push('find-the-differences: K-061\'s bare head');
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
