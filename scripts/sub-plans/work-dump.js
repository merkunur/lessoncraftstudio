#!/usr/bin/env node
/**
 * The working sheet for writing the week days' guest teacher scripts (Part 5.4): per grade, per teaching point (its
 * script once), per worksheet type the week days use: the weeks, the printed title and instruction, the byType part,
 * the pages, and the printed text of the first page. Out: out/sub-plans/work-<grade>.txt.
 *
 *   node scripts/sub-plans/work-dump.js --grade=K [--sheets]   (--sheets: contact sheets of one page per type)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const grade = arg('grade', 'K');
const T = path.join(REPO, 'out', 'sub-plans', 'thumbs');
const plan = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'sub-plans', 'weeks-plan.json'), 'utf8')).filter((b) => b.grade === grade);
const scripts = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'scripts', 'en.json'), 'utf8')).points;
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.en.json'), 'utf8'));
const groups = new Map();
for (const b of plan) { const k = b.point + ' ' + b.type + (b.level ? '+' : ''); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(b); }
const byPoint = new Map();
for (const [k, bs] of [...groups].sort()) { const p = k.split(' ')[0]; if (!byPoint.has(p)) byPoint.set(p, []); byPoint.get(p).push([k, bs]); }
const clip = (t, n) => t.replace(/Made with LessonCraftStudio[.]com/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
let out = '';
const sheetItems = [];
for (const [point, list] of byPoint) {
  const sc = scripts[point];
  out += '\n#### ' + point + (sc ? '' : '   NO SCRIPT') + '\n';
  if (sc) out += '  say: ' + sc.say + '\n  first: ' + sc.first + '\n  stuck: ' + sc.stuck + '\n';
  for (const [k, bs] of list) {
    const type = k.split(' ')[1];
    const s = strings[type.replace('+', '')] || {};
    const bt = sc && sc.byType && sc.byType[type];
    out += '  -- ' + type + ' wk ' + bs.map((b) => b.week + b.key.slice(0, 2)).join(',') + ' | ' + (s.printTitle || s.title) + ' | ' + s.instruction + '\n';
    if (bt) out += '     byType: ' + JSON.stringify(bt) + '\n';
    out += '     pages: ' + bs.map((b) => b.core).join(' ') + '\n';
    const txt = path.join(T, 'text', bs[0].core + '.txt');
    if (fs.existsSync(txt)) out += '     text: ' + clip(fs.readFileSync(txt, 'utf8'), 420) + '\n';
    sheetItems.push(path.join(T, 'pages', bs[0].core + '.png') + '=' + k);
  }
}
fs.writeFileSync(path.join(REPO, 'out', 'sub-plans', 'work-' + grade.toLowerCase() + '.txt'), out);
console.log('work-' + grade.toLowerCase() + '.txt: ' + groups.size + ' point-types, ' + plan.length + ' blocks');
if (process.argv.includes('--sheets')) {
  const per = 12;
  for (let i = 0; i < sheetItems.length; i += per) {
    const f = path.join(T, 'sheet-' + grade.toLowerCase() + '-' + String(i / per + 1).padStart(2, '0') + '.png');
    execFileSync('node', [path.join(__dirname, 'contact-sheet.js'), f, '4', '360', ...sheetItems.slice(i, i + per)], { stdio: 'inherit' });
  }
}
