#!/usr/bin/env node
/**
 * The sheet a country's teachers PLACE the lessons on, before any note of that language is written (Daily Teaching
 * System, Part 4.6 onward; the German review showed why: a page's printed year is not the year a country teaches it).
 *
 * Every lesson of the English units (the reviewed stock of lessons), with the title and instruction its worksheets
 * print IN THE LANGUAGE, and what the country's own curriculum registry says about its teaching point. One reviewer
 * who teaches in that country answers for each lesson: which school year, in which order, or "not taught in these
 * years"; and names what a teacher of that country expects in a year and is missing.
 *
 *   node scripts/units/placement-sheet.js --loc=sv   → out/units/placement-<loc>.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'sv');
const C = path.join(REPO, 'frontend', 'content');
const en = JSON.parse(fs.readFileSync(path.join(C, 'units', 'defs', 'en.json'), 'utf8')).units;
const enText = JSON.parse(fs.readFileSync(path.join(C, 'units', 'points', 'en.json'), 'utf8')).points;
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'), 'utf8'));
const assets = JSON.parse(fs.readFileSync(path.join(C, 'teaching-graph', 'assets', loc + '.json'), 'utf8'));
const cw = JSON.parse(fs.readFileSync(path.join(C, 'curricula', loc, 'crosswalk.json'), 'utf8')).points;
let md = '# Placement sheet, language `' + loc + '`\n\nEvery lesson below exists as worksheets in this language. US grade K is the year children are 5 to 6, grade 1 is 6 to 7, grade 2 is 7 to 8, grade 3 is 8 to 9. `registry:` is what this country\'s curriculum registry says about the lesson\'s teaching point (teaches / prepares / extends @ the years the curriculum names).\n';
let n = 0, none = 0;
for (const u of en) {
  md += '\n## US grade ' + u.grade + ', ' + u.subject + ' — unit `' + u.id + '` (' + u.title + ')\n';
  for (const l of u.lessons) {
    n++;
    const have = l.types.filter((t) => strings[t] && assets.types[t]);
    if (!have.length) none++;
    const rows = ((cw[l.point] || {}).rows || []).map((r) => r.rel + '@' + r.grade).join(', ') || 'no counterpart';
    md += '\n- `' + l.point + '` — ' + ((enText[l.point] || {}).title || '') + ' | registry: ' + rows + '\n';
    for (const t of l.types) md += '  - ' + (strings[t] && assets.types[t] ? '“' + strings[t].title + '” — ' + (strings[t].instruction || '') : '(no page of ' + t + ' in this language)') + '\n';
  }
}
const out = path.join(REPO, 'out', 'units', 'placement-' + loc + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + en.length + ' units, ' + n + ' lessons (' + none + ' without a page in ' + loc + '), ' + Math.round(md.length / 1024) + ' KB');
