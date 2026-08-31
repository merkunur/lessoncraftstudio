/**
 * One-shot, idempotent registrar for the nt20 batch's 17 NEW family keys
 * (topics-taxonomy.json: apps.* + axes.exercise-type.* — EN entries; the
 * 10 non-EN slug/name columns are merged by i18n/apply-locale.js at each
 * locale fan). Re-running reports already-registered keys and changes
 * nothing. G1-212 (telling-time) and G2-252 (measurement) reuse existing
 * keys on purpose — not listed here.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

const NEW_FAMILIES = {
  'pre-writing':          { subject: 'letters', age: '5-7',  name: 'Pre-Writing Practice' },
  'number-tracing':       { subject: 'math',    age: '5-7',  name: 'Number Tracing' },
  'letter-tracing':       { subject: 'letters', age: '5-7',  name: 'Letter Tracing' },
  'sight-words':          { subject: 'letters', age: '5-7',  name: 'Sight Words' },
  'cutting-practice':     { subject: 'logic',   age: '5-7',  name: 'Cutting Practice' },
  'color-by-number':      { subject: 'math',    age: '5-7',  name: 'Color by Number' },
  'mazes':                { subject: 'spatial-reasoning', age: '5-7', name: 'Mazes' },
  'number-bonds':         { subject: 'math',    age: '5-7',  name: 'Number Bonds' },
  'mental-math':          { subject: 'math',    age: '6-8',  name: 'Mental Math' },
  'fact-families':        { subject: 'math',    age: '6-8',  name: 'Fact Families' },
  'number-words':         { subject: 'math',    age: '6-8',  name: 'Number Words' },
  'money':                { subject: 'math',    age: '6-8',  name: 'Counting Money' },
  'word-problems':        { subject: 'math',    age: '6-8',  name: 'Word Problems' },
  'column-arithmetic':    { subject: 'math',    age: '7-9',  name: 'Column Addition and Subtraction' },
  'symmetry':             { subject: 'spatial-reasoning', age: '7-9', name: 'Symmetry' },
  'reading-comprehension':{ subject: 'letters', age: '7-9',  name: 'Reading Comprehension' },
  'multiplication-tables':{ subject: 'math',    age: '8-10', name: 'Multiplication Tables' },
};

const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let added = 0, skipped = 0;
for (const [key, def] of Object.entries(NEW_FAMILIES)) {
  if (j.apps[key] && j.axes['exercise-type'][key]) { console.log(`already registered: ${key}`); skipped++; continue; }
  if (!j.apps[key]) {
    j.apps[key] = {
      default_subject: def.subject,
      default_age_range: def.age,
      exercise_type_axis_key: key,
    };
  }
  if (!j.axes['exercise-type'][key]) {
    j.axes['exercise-type'][key] = { slug: { en: key }, name: { en: def.name } };
  }
  console.log(`registered: ${key} (${def.subject}, ${def.age})`);
  added++;
}
fs.writeFileSync(FILE, JSON.stringify(j, null, 2) + '\n');
console.log(`done: ${added} added, ${skipped} already present. apps=${Object.keys(j.apps).length} axis=${Object.keys(j.axes['exercise-type']).length}`);
