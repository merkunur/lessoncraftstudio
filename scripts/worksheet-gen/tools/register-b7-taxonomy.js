/**
 * One-shot, idempotent registrar for the nt2-G batch's 5 NEW family keys
 * (topics-taxonomy.json: apps.* + axes.exercise-type.* — EN entries; the
 * non-EN slug/name columns are merged by tools/apply-b7-locale.js at each
 * locale fan). Re-running reports already-registered keys and changes nothing.
 *
 * Subjects/ages come from each design file §1 (docs/worksheet-gen/b7-designs);
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
  'find-the-differences': { subject: 'spatial-reasoning', age: '5-7', name: 'Find the Differences', id: 'K-395' },
  'how-to-draw': { subject: 'spatial-reasoning', age: '5-7', name: 'How to Draw', id: 'K-396' },
};

if (require.main === module) {
  const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const subjects = Object.keys(j.subjects || {});
  let added = 0, skipped = 0;
  for (const [key, def] of Object.entries(NEW_FAMILIES)) {
    if (!subjects.includes(def.subject)) throw new Error('register-b7-taxonomy: ' + key + ' subject "' + def.subject + '" is not in taxonomy.subjects (' + subjects.join('/') + ')');
    if (j.axes.theme && j.axes.theme[key]) throw new Error('register-b7-taxonomy: ' + key + ' is a THEME key — the family key must not collide with axes.theme');
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
