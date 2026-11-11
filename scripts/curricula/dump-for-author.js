#!/usr/bin/env node
/**
 * Writes the brief a teacher-reviewer of one country reads to author (or audit) a crosswalk (Daily Teaching System,
 * Part 2): PART 1 = the teaching points of the chosen subjects, PART 2 = every node of the chosen frameworks with its
 * official wording, by grade.
 *
 *   node scripts/curricula/dump-for-author.js <registry> <name> --subjects=math,thinking --frameworks=teks-math [--hint=en]
 *     → out/curricula/<registry>/author-<name>.md
 *
 * --hint=<registry> prints, under each point, the rows another registry already gives it (ids and relations only),
 * for orientation: the author decides from the official wording in PART 2, never from the hint.
 * A node whose wording opens with a phrase given in --skip="…|…" is left out of PART 2 (process standards that every
 * grade repeats and no worksheet is mapped to).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const [reg, name, ...flags] = process.argv.slice(2);
const flag = (k) => { const f = flags.find((x) => x.startsWith('--' + k + '=')); return f ? f.slice(k.length + 3) : null; };
if (!reg || !name || !flag('subjects') || !flag('frameworks')) { console.error('usage: dump-for-author.js <registry> <name> --subjects=a,b --frameworks=x,y [--hint=<registry>] [--skip="phrase|phrase"]'); process.exit(1); }
const subjects = flag('subjects').split(','), frameworks = flag('frameworks').split(',');
const skip = (flag('skip') || '').split('|').filter(Boolean);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const fw = readJson(path.join(REPO, 'frontend', 'content', 'curricula', reg, 'framework.json'));
const points = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json')).points.filter((p) => subjects.includes(p.subject));
const hintReg = flag('hint');
const hint = hintReg ? readJson(path.join(REPO, 'frontend', 'content', 'curricula', hintReg, 'crosswalk.json')).points : null;
for (const k of frameworks) if (!fw.frameworks.some((f) => f.key === k)) { console.error('no framework ' + k + ' in ' + reg); process.exit(1); }

let md = '# Crosswalk to author: teaching point → official objective (registry `' + reg + '`)\n\n';
md += 'PART 1 lists ' + points.length + ' teaching points (subjects: ' + subjects.join(', ') + '). PART 2 lists every objective that may be used: its id, then its official wording.\n\n## PART 1 — teaching points\n';
for (const p of points) {
  md += '\n### ' + p.id + '  (worksheets sit in grade ' + p.grade + '; subject ' + p.subject + ')\nskill: ' + p.skill + '\n';
  if (hint && hint[p.id]) md += 'for orientation, ' + hintReg + ' gives: ' + ((hint[p.id].rows || []).map((r) => r.rel + ' ' + r.id).join('; ') || 'no counterpart') + '\n';
}
md += '\n## PART 2 — the objectives\n';
let left = 0;
for (const k of frameworks) {
  const f = fw.frameworks.find((x) => x.key === k);
  md += '\n### ' + f.title + ' (' + f.version + ')\n';
  let grade = null;
  const dropped = new Set();
  for (const n of fw.nodes.filter((x) => x.f === k)) {
    if (skip.some((s) => n.text.startsWith(s)) || (n.parent && dropped.has(n.parent))) { dropped.add(n.id); left++; continue; }
    // a framework that plans by single years is printed year by year; one that plans in bands (1-2, 3-4, 1-4)
    // mixes them inside a table, so the band stands beside each objective
    const single = /^(?:K|\d)$/.test(n.grade);
    if (single && n.grade !== grade) { grade = n.grade; md += '\n#### grade ' + grade + '\n'; }
    md += (n.kind === 'strand' || n.kind === 'area' || n.kind === 'subarea' ? '\n' : '') + n.id + ' [' + n.kind + (single ? '' : ', years ' + n.grade) + '] ' + n.text + '\n';
  }
}
const out = path.join(REPO, 'out', 'curricula', reg, 'author-' + name + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + points.length + ' points, ' + Math.round(md.length / 1024) + ' KB' + (left ? ' (' + left + ' nodes left out by --skip)' : ''));
