#!/usr/bin/env node
/**
 * The sheet a language's sub packs are CHOSEN from (Daily Teaching System, Part 5): every teaching point of a grade
 * (and of the grade before it) that has a published worksheet in the language, with where the grade's plans teach it
 * (the plan week its unit ends in) and which pages each of its types has (core, easier, harder).
 *
 * A sub day is review: a pack for the start of the year takes points of the grade before or of the first third of
 * the plan weeks, a pack for the middle of the year of the first two thirds (the rule assemble.js enforces).
 *
 *   node scripts/sub-plans/candidates.js --loc=en --grade=1   → out/sub-plans/candidates-<loc>-<grade>.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { pagesOf, REPO } = require('../units/catalog.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en'), grade = String(arg('grade', '1'));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const C = path.join(REPO, 'frontend', 'content');
const points = readJson(path.join(C, 'teaching-graph', 'points.json')).points;
const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
const pages = pagesOf(loc);
const { planWeeks } = require('./position.js');
const where = planWeeks(unitsFile);
const ORDER = 'PK123';
const before = ORDER[ORDER.indexOf(grade) - 1];
let md = '# Sub pack candidates, language `' + loc + '`, grade ' + grade + '\n\nPer point: subject, where the grade\'s plan teaches it (`week a of b`), then each worksheet type with its pages (c core, e easier, h harder) and its printed title and instruction.\n';
let n = 0;
for (const g of [before, grade]) {
  md += '\n## Teaching points of grade ' + g + '\n';
  for (const p of points.filter((x) => x.grade === g)) {
    const rows = p.types.filter((t) => pages.get(t) && pages.get(t).core.length && strings[t] && strings[t].title);
    if (!rows.length) continue;
    n++;
    const w = where.get(p.id);
    md += '\n- `' + p.id + '` (' + p.subject + ') ' + (w ? 'week ' + w.to + ' of ' + w.of + ' in ' + w.plan : 'in no plan') + '\n';
    for (const t of rows) { const pg = pages.get(t), s = strings[t]; md += '  - ' + t + ' [c' + pg.core.length + ' e' + pg.easy.length + ' h' + pg.hard.length + '] “' + (s.printTitle || s.title) + '” — ' + (s.instruction || '') + '\n'; }
  }
}
const out = path.join(REPO, 'out', 'sub-plans', 'candidates-' + loc + '-' + grade.toLowerCase() + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + n + ' points, ' + Math.round(md.length / 1024) + ' KB');
