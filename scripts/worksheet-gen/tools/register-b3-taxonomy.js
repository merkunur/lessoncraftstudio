/**
 * One-shot, idempotent registrar for the nt20-C batch's 20 NEW family keys
 * (topics-taxonomy.json: apps.* + axes.exercise-type.* — EN entries; the 10
 * non-EN slug/name columns are merged by tools/apply-b3-locale.js at each
 * locale fan). Re-running reports already-registered keys and changes nothing.
 *
 * Subjects/ages come from each design file §1 (docs/worksheet-gen/b3-designs);
 * `science` is a legal default_subject (README cross-type ruling; 3 live
 * science-* families). The rail on /[locale]/worksheets buckets by
 * apps.<key>.default_subject — a key without apps.<key> renders NOWHERE
 * (scripts/verify-hub-type-rows.js asserts this after registration).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

const NEW_FAMILIES = {
  // K
  'letter-of-the-week':      { subject: 'letters', age: '5-7',  name: 'Letter of the Week', id: 'K-317' },
  'sound-boxes':             { subject: 'letters', age: '5-7',  name: 'Sound Boxes', id: 'K-318' },
  // key `feelings`, NOT `emotions`: the THEME axis already owns the key `emotions` (topic slug + topicMeta/topicProse are keyed per axis-key across axes) and the taxonomy invariant is slug.en === key — ruled 2026-09-14, K-319 design file §1 slug `feelings`
  'feelings':                { subject: 'letters', age: '5-7',  name: 'Feelings', id: 'K-319' },
  'ordinal-numbers':         { subject: 'math',    age: '5-7',  name: 'Ordinal Numbers', id: 'K-320' },
  'days-and-months':         { subject: 'math',    age: '5-7',  name: 'Days and Months', id: 'K-321' },
  'seasons':                 { subject: 'science', age: '5-7',  name: 'Four Seasons', id: 'K-322' },
  'all-about-me':            { subject: 'letters', age: '5-7',  name: 'All About Me', id: 'K-323' },
  'picture-word-cards':      { subject: 'letters', age: '5-7',  name: 'Picture Word Cards', id: 'K-324' },
  // G1
  'syllable-split':          { subject: 'letters', age: '6-8',  name: 'Syllable Division', id: 'G1-305' },
  'syllable-reading':        { subject: 'letters', age: '6-8',  name: 'Word Families', id: 'G1-306' },
  'opposites':               { subject: 'letters', age: '6-8',  name: 'Opposites', id: 'G1-307' },
  'read-and-do':             { subject: 'letters', age: '6-8',  name: 'Read and Do', id: 'G1-308' },
  'rhyming-words':           { subject: 'letters', age: '6-8',  name: 'Rhyming Words', id: 'G1-309' },
  'hundreds-chart-puzzles':  { subject: 'math',    age: '6-8',  name: 'Hundreds Chart Puzzles', id: 'G1-310' },
  // G2
  'spelling-rules':          { subject: 'letters', age: '7-9',  name: 'Spelling Rules', id: 'G2-315' },
  'compound-words':          { subject: 'letters', age: '7-9',  name: 'Compound Words', id: 'G2-316' },
  'verb-forms':              { subject: 'letters', age: '7-9',  name: 'Verb Forms', id: 'G2-317' },
  'animal-fact-file':        { subject: 'science', age: '7-9',  name: 'Animal Fact File', id: 'G2-318' },
  'logic-puzzles':           { subject: 'logic',   age: '7-9',  name: 'Logic Grid Puzzles', id: 'G2-319' },
  // G3
  'division-with-remainder': { subject: 'math',    age: '8-10', name: 'Division with Remainders', id: 'G3-377' },
};

if (require.main === module) {
  const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const subjects = Object.keys(j.subjects || {});
  let added = 0, skipped = 0;
  for (const [key, def] of Object.entries(NEW_FAMILIES)) {
    if (!subjects.includes(def.subject)) throw new Error('register-b3-taxonomy: ' + key + ' subject "' + def.subject + '" is not in taxonomy.subjects (' + subjects.join('/') + ')');
    if (j.apps[key] && j.axes['exercise-type'][key]) { console.log(`already registered: ${key}`); skipped++; continue; }
    if (!j.apps[key]) j.apps[key] = { default_subject: def.subject, default_age_range: def.age, exercise_type_axis_key: key };
    if (!j.axes['exercise-type'][key]) j.axes['exercise-type'][key] = { slug: { en: key }, name: { en: def.name } };
    console.log(`registered: ${key} (${def.subject}, ${def.age})`);
    added++;
  }
  fs.writeFileSync(FILE, JSON.stringify(j, null, 2) + '\n');
  console.log(`done: ${added} added, ${skipped} already present. apps=${Object.keys(j.apps).length} axis=${Object.keys(j.axes['exercise-type']).length}`);
}
module.exports = { NEW_FAMILIES };
