/**
 * One-shot, idempotent registrar for the b9 batch's ONE new family key `picture-tracing` (topics-taxonomy.json:
 * apps.* + axes.exercise-type.* — the EN entry; the non-EN slug/name columns are merged by tools/apply-b9-locale.js
 * at each locale fan). Re-running reports an already-registered key and changes nothing.
 *
 * Subject `letters` (the fine-motor / pre-writing readiness strand — the family sits beside `pre-writing` on the hub
 * rail); age 5-7 (the platform's band; the PreK faces carry their level per landing). The rail on /[locale]/worksheets
 * buckets by apps.<key>.default_subject — a key without apps.<key> renders NOWHERE (verify-hub-type-rows.js asserts it).
 * The guard refuses a family key that IS a theme key.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

const NEW_FAMILIES = {
  'picture-tracing': { subject: 'letters', age: '5-7', name: 'Picture Tracing', id: 'K-418' },   // the fine-motor / pre-writing strand, beside pre-writing
};

if (require.main === module) {
  const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const subjects = Object.keys(j.subjects || {});
  let added = 0, skipped = 0;
  for (const [key, def] of Object.entries(NEW_FAMILIES)) {
    if (!subjects.includes(def.subject)) throw new Error('register-b9-taxonomy: ' + key + ' subject "' + def.subject + '" is not in taxonomy.subjects (' + subjects.join('/') + ')');
    if (j.axes.theme && j.axes.theme[key]) throw new Error('register-b9-taxonomy: ' + key + ' is a THEME key — the family key must not collide with axes.theme');
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
