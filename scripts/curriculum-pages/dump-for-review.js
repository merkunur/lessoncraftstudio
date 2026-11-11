#!/usr/bin/env node
/**
 * One text file with everything a visitor reads on the curriculum pages of a language, for the one reviewer of the
 * native-speaker and pedagogy check (CLAUDE.md rule #2; Daily Teaching System, Part 6).
 *
 * Per page: its names, then every line: the official code, the description the page shows, the lessons it links, and,
 * FOR THE REVIEWER ONLY, the wording of the objective from the registry (a page never shows it), so that the fit of a
 * line can be judged. Then the pages' own strings.
 *
 *   node scripts/curriculum-pages/dump-for-review.js --loc=en   → out/curriculum-pages/review-<loc>.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const C = path.join(REPO, 'frontend', 'content');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const pages = readJson(path.join(C, 'curriculum-pages', 'pages.' + loc + '.json')).pages;
const ui = readJson(path.join(C, 'curriculum-pages', 'ui.' + loc + '.json'));
const display = readJson(path.join(C, 'curricula', 'display.json')).registries;
const { shown } = require('../curricula/show.js');
const regs = new Map();
const wording = (reg, framework, code) => {
  if (!regs.has(reg)) { const fw = readJson(path.join(C, 'curricula', reg, 'framework.json')); const registry = { framework: fw, display: display[reg] }; const m = new Map(); for (const n of fw.nodes) m.set(n.f + ' ' + shown(registry, n).code, n.text); regs.set(reg, m); }
  return regs.get(reg).get(framework + ' ' + code) || '';
};
let md = '# Curriculum pages, language `' + loc + '`: everything a visitor reads\n\nA line is cited as `<page id> / <code>`. "OFFICIAL (not shown)" is the wording of the objective from the registry, given only so that the fit of a line can be judged; a page never shows it.\n';
let n = 0;
for (const p of pages) {
  md += '\n## PAGE `' + p.id + '` — ' + p.title + '\n\n- page title: ' + p.metaTitle + '\n- page description: ' + p.metaDescription + '\n- counts: ' + p.counts.taught + ' taught, ' + p.counts.near + ' near, ' + p.counts.open + ' not covered, ' + p.counts.lessons + ' lessons\n';
  for (const g of p.groups) {
    md += '\n### ' + g.title + '\n';
    for (const it of g.items) {
      n++;
      md += '\n- `' + p.id + ' / ' + it.code + '` (' + (it.state === 'taught' ? 'taught' : 'near: ' + it.rel) + ')\n  - OFFICIAL (not shown): ' + wording(p.registry, p.framework, it.code).slice(0, 260) + '\n  - SHOWN: ' + it.text + '\n';
      if (it.lessons) md += '  - lessons: ' + it.lessons.map((l) => '"' + l.title + '" (unit ' + l.unitTitle + ', grade ' + l.unitGrade + ')').join('; ') + '\n';
      if (it.papers) md += '  - worksheets: ' + it.papers.map((x) => '"' + x.title + '"').join('; ') + '\n';
    }
    if (g.open && g.open.length) md += '\n- not covered (codes only): ' + g.open.join(', ') + '\n';
  }
}
md += '\n## The strings of the pages (`curriculum-pages/ui`)\n\n';
for (const [k, v] of Object.entries(ui)) md += '- `' + k + '`: ' + v + '\n';
const out = path.join(REPO, 'out', 'curriculum-pages', 'review-' + loc + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + pages.length + ' page(s), ' + n + ' lines, ' + Math.round(md.length / 1024) + ' KB');
