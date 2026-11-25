/**
 * The teacher texts of the PRESCHOOL THEME units, English (Stage D-4, 2026-11-25; plan decision 5).
 *
 * Their single source is the theme year itself, scripts/units/year/design.en.theme.json, written and read by US pre-K
 * teachers (one designer, one reviewer): per theme, per daily block (literacy, math, science, motor), the block's title,
 * objective, hands-on routine, its five day lines a week (`week`), its teacher note and its line on the observation
 * checklist (`check`). This file only maps them onto the lesson keys "<point>#p-<theme>" (a named lesson of the
 * Kindergarten readiness point the block practises at its earliest step). notes/apply.js merges them into
 * frontend/content/units/points/en.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DESIGN = path.join(__dirname, '..', 'year', 'design.en.theme.json');
const points = {};
if (fs.existsSync(DESIGN)) {
  const design = JSON.parse(fs.readFileSync(DESIGN, 'utf8'));
  for (const t of design.themes) {
    for (const b of t.lessons) {
      points[b.point + '#p-' + t.key] = { title: b.title, objective: b.objective, routine: b.routine, week: b.week, check: b.check, note: { mistake: b.note.mistake, words: b.note.words, watch: b.note.watch } };
    }
  }
}
module.exports = { loc: 'en', points };
