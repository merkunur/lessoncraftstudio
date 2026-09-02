/**
 * One-shot, idempotent registrar for the nt20-B batch's 17 NEW family keys
 * (topics-taxonomy.json: apps.* + axes.exercise-type.* — EN entries; the
 * 10 non-EN slug/name columns are merged by tools/apply-b2-locale.js at each
 * locale fan). Re-running reports already-registered keys and changes
 * nothing. G1-248 (number-lines), G2-276 (money) and G3-370 (word-problems)
 * reuse existing keys on purpose — not listed here.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

const NEW_FAMILIES = {
  'word-tracing':         { subject: 'letters', age: '5-7',  name: 'Word Tracing' },
  'dot-to-dot':           { subject: 'math',    age: '5-7',  name: 'Dot-to-Dot' },
  'grid-copy':            { subject: 'spatial-reasoning', age: '5-7', name: 'Copy the Grid Picture' },
  'singular-plural':      { subject: 'letters', age: '5-7',  name: 'Singular and Plural' },
  'articles':             { subject: 'letters', age: '5-7',  name: 'Articles' },
  'read-and-color':       { subject: 'letters', age: '6-8',  name: 'Read and Color' },
  'number-of-the-day':    { subject: 'math',    age: '6-8',  name: 'Number of the Day' },
  'write-the-word':       { subject: 'letters', age: '6-8',  name: 'Write the Word' },
  'alphabetical-order':   { subject: 'letters', age: '6-8',  name: 'Alphabetical Order' },
  'number-walls':         { subject: 'math',    age: '6-8',  name: 'Number Walls' },
  'doubles-halves':       { subject: 'math',    age: '6-8',  name: 'Doubles and Halves' },
  'sentence-building':    { subject: 'letters', age: '6-8',  name: 'Sentence Building' },
  'capitals-punctuation': { subject: 'letters', age: '7-9',  name: 'Capital Letters and Punctuation' },
  'word-classes':         { subject: 'letters', age: '7-9',  name: 'Word Classes' },
  'calendar':             { subject: 'math',    age: '7-9',  name: 'Calendar' },
  'picture-writing':      { subject: 'letters', age: '7-9',  name: 'Picture Writing Prompts' },
  'grid-coordinates':     { subject: 'spatial-reasoning', age: '7-9', name: 'Grid Coordinates' },
};

const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let added = 0, skipped = 0;
for (const [key, def] of Object.entries(NEW_FAMILIES)) {
  if (j.apps[key] && j.axes['exercise-type'][key]) { console.log(`already registered: ${key}`); skipped++; continue; }
  if (!j.apps[key]) {
    j.apps[key] = { default_subject: def.subject, default_age_range: def.age, exercise_type_axis_key: key };
  }
  if (!j.axes['exercise-type'][key]) {
    j.axes['exercise-type'][key] = { slug: { en: key }, name: { en: def.name } };
  }
  console.log(`registered: ${key} (${def.subject}, ${def.age})`);
  added++;
}
fs.writeFileSync(FILE, JSON.stringify(j, null, 2) + '\n');
console.log(`done: ${added} added, ${skipped} already present. apps=${Object.keys(j.apps).length} axis=${Object.keys(j.axes['exercise-type']).length}`);
module.exports = { NEW_FAMILIES };
