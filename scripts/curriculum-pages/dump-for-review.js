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
// ---- a page of parts (a framework without public codes): per part, FOR THE REVIEWER ONLY, the objectives that stand
// under it (numbered; "+" = a lesson or worksheet of ours is said to teach it), then the lessons the page shows, each
// with the numbers of the objectives its teaching point is mapped to
const HEAD = new Set(['domain', 'cluster', 'strand', 'topic', 'area', 'subarea']);
const partKey = (id) => 'part-' + id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json')).units;
const pointOf = new Map();
// the lessons are listed ONCE, with their objective; a part names them by their number (L1, L2 …)
const lessonNo = new Map();
let lessonIndex = '';
for (const u of unitsFile) for (const l of u.lessons) {
  pointOf.set(u.slug + '#' + l.n, { point: l.point, objective: l.objective });
  if (u.status !== 'live') continue;
  const id = 'L' + (lessonNo.size + 1);
  lessonNo.set(u.slug + '#' + l.n, id);
  lessonIndex += '- ' + id + ' [grade ' + u.grade + ', unit ' + u.title + ', lesson ' + l.n + '] „' + l.title + '“: ' + l.objective + '\n';
}
const cwOf = new Map();
function partsOf(p) {
  if (!cwOf.has(p.registry)) cwOf.set(p.registry, { fw: readJson(path.join(C, 'curricula', p.registry, 'framework.json')), cw: readJson(path.join(C, 'curricula', p.registry, 'crosswalk.json')).points });
  const { fw, cw } = cwOf.get(p.registry);
  const byId = new Map(fw.nodes.map((n) => [n.id, n]));
  const hasChild = new Set(fw.nodes.map((n) => n.parent).filter(Boolean));
  const grades = p.grade.split(',');
  const headOf = (n) => { for (let x = n.parent ? byId.get(n.parent) : null, g = 0; x && g < 12; x = x.parent ? byId.get(x.parent) : null, g++) if (HEAD.has(x.kind)) return x; return null; };
  const out = new Map();
  for (const n of fw.nodes) { if (n.f !== p.framework || HEAD.has(n.kind) || hasChild.has(n.id) || !grades.includes(String(n.grade))) continue; const h = headOf(n); if (!h) continue; const k = partKey(h.id); if (!out.has(k)) out.set(k, []); out.get(k).push(n); }
  const rows = (point) => ((cw[point] || {}).rows || []);
  return { leaves: out, rows };
}
function dumpParts(p) {
  const { leaves, rows } = partsOf(p);
  let s = '';
  for (const g of p.groups) {
    s += '\n### ' + g.title + '\n';
    for (const it of g.items) {
      n++;
      const ls = leaves.get(it.key) || [];
      const num = new Map(ls.map((x, i) => [x.id, i + 1]));
      const taughtIds = new Set();
      const lessonLines = [];
      for (const u of it.units || []) for (const l of u.lessons) {
        const k = u.unit + '#' + l.n, pt = pointOf.get(k) || {};
        const hit = rows(pt.point).filter((r) => num.has(r.id));
        for (const r of hit) if (r.rel === 'teaches') taughtIds.add(r.id);
        lessonLines.push(lessonNo.get(k) + ' [grade ' + u.unitGrade + '] „' + l.title + '“ → ' + (hit.length ? hit.map((r) => num.get(r.id) + (r.rel === 'teaches' ? '' : ' (' + r.rel + ')')).join(', ') : 'part'));
      }
      s += '\n- `' + p.id + ' / ' + it.key + '` — ' + (it.code ? it.code + ' · ' : '') + it.title + ' (' + (it.state === 'taught' ? 'shown: lessons for ' + it.counts.taught + ' of ' + it.counts.objectives : 'near: ' + it.rel) + ')\n  - OFFICIAL objectives of this part (not shown):\n';
      ls.forEach((x, i) => { s += '    ' + (i + 1) + '. ' + (taughtIds.has(x.id) ? '+ ' : '  ') + (String(x.grade) !== grades0(p) ? '[' + x.grade + '] ' : '') + x.text.replace(/\s+/g, ' ').slice(0, 130) + '\n'; });
      if (lessonLines.length) s += '  - lessons SHOWN: ' + lessonLines.join(' | ') + '\n';
      if (it.papers) s += '  - worksheets shown: ' + it.papers.map((x) => '"' + x.title + '"').join('; ') + '\n';
    }
    if (g.openParts && g.openParts.length) s += '\n- shown as "no material yet": ' + g.openParts.map((o) => (o.code ? o.code + ' · ' : '') + o.title).join(' | ') + '\n';
  }
  return s;
}
const grades0 = (p) => (p.grade.split(',').length === 1 ? p.grade : '');
for (const p of pages) {
  md += '\n## PAGE `' + p.id + '` — ' + p.title + '\n\n- page title: ' + p.metaTitle + '\n- page description: ' + p.metaDescription + '\n- counts: ' + p.counts.taught + ' taught, ' + p.counts.near + ' near, ' + p.counts.open + ' not covered, ' + p.counts.lessons + ' lessons\n';
  if (p.mode === 'parts') { md += dumpParts(p); continue; }
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
if (pages.some((p) => p.mode === 'parts')) md = md.replace('\n## PAGE', '\n## THE LESSONS (a part names them by their number)\n\n' + lessonIndex + '\n## PAGE');
md += '\n## The strings of the pages (`curriculum-pages/ui`)\n\n';
for (const [k, v] of Object.entries(ui)) md += '- `' + k + '`: ' + v + '\n';
const out = path.join(REPO, 'out', 'curriculum-pages', 'review-' + loc + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + pages.length + ' page(s), ' + n + ' lines, ' + Math.round(md.length / 1024) + ' KB');
