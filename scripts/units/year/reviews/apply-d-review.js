#!/usr/bin/env node
/**
 * Part 12.2, second run of stage 1 (Year pages D): what the teacher-reviewers of the English and German lessons ruled
 * on the DEFINITIONS (the text findings are in the note files). Run once (2026-11-13); kept as the record.
 *
 *  - en "Add two two-digit numbers": the practice on screen adds WITH a new ten, the lesson without: taken out. Its
 *    second asset is the Place Value Lab on the projector, which now models the point "add with blocks"; the three
 *    lessons of today on that point (en, de, sv) name no tool and keep none.
 *  - en "Add tens to a number", "Add ones to a two-digit number": level 2 of both pages is SUBTRACTION only; a unit
 *    called Adding Within 100 offers no harder page there (`noHard`).
 *  - de: the description of the new unit names its number examples (the unit crosses a ten with one-digit numbers only).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..', '..');
const file = (f) => path.join(REPO, f);
const edit = (f, fn) => { const raw = fs.readFileSync(file(f), 'utf8'); const j = JSON.parse(raw); fn(j);
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1]; let out = JSON.stringify(j, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : '')); };
const keyOf = (l) => l.id || l.point;
const lesson = (defs, unitId, key) => { const u = defs.units.find((x) => x.id === unitId); const l = u && u.lessons.find((x) => keyOf(x) === key); if (!l) throw new Error(unitId + ' has no lesson ' + key); return l; };

edit('frontend/content/teaching-graph/tools.json', (j) => { const t = j.tools['place-value-lab']; if (t.points.includes('2:add-with-blocks')) throw new Error('ran before'); if (Object.keys(j.tools).some((k) => j.tools[k].points.includes('2:add-with-blocks'))) throw new Error('2:add-with-blocks has a tool'); t.points.push('2:add-with-blocks'); });
edit('frontend/content/units/defs/en.json', (d) => {
  lesson(d, 'g2-add-subtract-within-1000', '2:add-with-blocks').tool = null;
  Object.assign(lesson(d, 'g1-adding-within-100', '2:add-with-blocks#add-two-two-digit-numbers'), { tool: 'place-value-lab', activity: null });
  lesson(d, 'g1-adding-within-100', '1:mental-math-to-100').noHard = ['G1-558'];
  lesson(d, 'g1-adding-within-100', '1:mental-math-to-100#add-ones-to-a-two-digit-number').noHard = ['G1-559'];
});
edit('frontend/content/units/defs/de.json', (d) => {
  lesson(d, 'de3-runden-schriftlich', '2:add-with-blocks').tool = null;
  const u = d.units.find((x) => x.id === 'de2-plus-minus-bis-100');
  u.metaDescription = u.metaDescription.replace(/^(\S+ Wochen) Mathe Klasse 2: 4 Stunden .*$/, '$1 Mathe Klasse 2: 4 Stunden zu Zehnerzahlen und Einern dazu und weg und zu Plus und Minus mit Zehnerübergang bis 100 (47 + 8, 53 − 6), mit Lehrerhinweis.');
  if (!u.metaDescription.includes('(47 + 8, 53 − 6)') || u.metaDescription.length > 170) throw new Error('de description: ' + u.metaDescription);
});
edit('frontend/content/units/defs/sv.json', (d) => { lesson(d, 'sv-2-ma-add-sub-0-100', '2:add-with-blocks').tool = null; });
console.log('applied');
