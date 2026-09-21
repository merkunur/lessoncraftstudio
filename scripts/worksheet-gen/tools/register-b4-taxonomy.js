/**
 * One-shot, idempotent registrar for the nt10-D batch's 10 NEW family keys
 * (topics-taxonomy.json: apps.* + axes.exercise-type.* — EN entries; the 10
 * non-EN slug/name columns are merged by tools/apply-b4-locale.js at each
 * locale fan). Re-running reports already-registered keys and changes nothing.
 *
 * Subjects/ages come from each design file §1 (docs/worksheet-gen/b4-designs);
 * `science` is a legal default_subject (5 live science families). The rail on
 * /[locale]/worksheets buckets by apps.<key>.default_subject — a key without
 * apps.<key> renders NOWHERE (scripts/verify-hub-type-rows.js asserts this).
 *
 * EN names are the compound heads where the bare head is a THEME slug
 * (human-body: `body_parts`; weather-symbols: `weather`) — README cross-type ruling;
 * the guard below refuses a family key that IS a theme key (weather → weather-symbols).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

const NEW_FAMILIES = {
  // K
  'tangram':        { subject: 'spatial-reasoning', age: '5-7', name: 'Tangram', id: 'K-353' },
  'human-body':     { subject: 'science',           age: '5-7', name: 'Parts of the Body', id: 'K-354' },
  'five-senses':    { subject: 'science',           age: '5-7', name: 'The Five Senses', id: 'K-355' },
  // key `weather-symbols`, NOT `weather`: the THEME axis owns `weather` (topicMeta/topicProse are keyed per axis-key across axes; the taxonomy invariant is slug.en === key) — the nt20-C `feelings`/`emotions` ruling applied 2026-09-21 at Phase 0; the design file's compound TITLES already avoid the theme slug, the KEY follows
  'weather-symbols': { subject: 'science',           age: '5-7', name: 'Weather Symbols', id: 'K-356' },
  'recycling':      { subject: 'science',           age: '5-7', name: 'Recycling Sort', id: 'K-357' },
  // G1
  'cloze':          { subject: 'letters',           age: '6-8', name: 'Fill in the Missing Word', id: 'G1-350' },
  'odd-and-even':   { subject: 'math',              age: '6-8', name: 'Odd and Even Numbers', id: 'G1-351' },
  'pronouns':       { subject: 'letters',           age: '6-8', name: 'Personal Pronouns', id: 'G1-352' },
  'question-words': { subject: 'letters',           age: '6-8', name: 'Question Words', id: 'G1-353' },
  // G2 (content G3 in most locales; the base key stays G2 per the design file)
  'rounding':       { subject: 'math',              age: '7-9', name: 'Rounding Numbers', id: 'G2-346' },
};

if (require.main === module) {
  const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const subjects = Object.keys(j.subjects || {});
  let added = 0, skipped = 0;
  for (const [key, def] of Object.entries(NEW_FAMILIES)) {
    if (!subjects.includes(def.subject)) throw new Error('register-b4-taxonomy: ' + key + ' subject "' + def.subject + '" is not in taxonomy.subjects (' + subjects.join('/') + ')');
    if (j.axes.theme && j.axes.theme[key]) throw new Error('register-b4-taxonomy: ' + key + ' is a THEME key — the family key must not collide with axes.theme');
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
