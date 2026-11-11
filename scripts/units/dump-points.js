#!/usr/bin/env node
/**
 * The working sheet for writing teacher notes (Daily Teaching System, Part 4): every teaching point of one grade and
 * subject in teaching order, beside what its worksheets PRINT (each type's own title and instruction, with how many
 * pages it has per level), the tools that model it, its live activities and its national objective line. A note is
 * written from the page's instruction, never from the type's name (PART-3-DESIGN.md §7).
 *
 *   node scripts/units/dump-points.js --loc=en --subject=math [--grade=K] [--reg=en]   → out/units/points-<subject>-<loc>[-<grade>].md
 *
 * Marks: SET = the pages form a Level Set; scr = some page has a screen version; NOTE = the point already has a note.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en'), subject = arg('subject', 'math'), gradeArg = arg('grade', null), reg = arg('reg', loc);
const C = path.join(REPO, 'frontend', 'content');
const read = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (d !== undefined) return d; throw e; } };
const points = read(path.join(C, 'teaching-graph', 'points.json')).points;
const assets = read(path.join(C, 'teaching-graph', 'assets', loc + '.json'));
const tools = read(path.join(C, 'teaching-graph', 'tools.json')).tools;
const strings = read(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
const toolContent = read(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'), {});
const notes = read(path.join(C, 'units', 'points', loc + '.json'), { points: {} }).points;
const fw = read(path.join(C, 'curricula', reg, 'framework.json'));
const cw = read(path.join(C, 'curricula', reg, 'crosswalk.json')).points;
const { line } = require('../curricula/show.js');
const registry = { framework: fw, display: read(path.join(C, 'curricula', 'display.json')).registries[reg] };
const nodeById = new Map(fw.nodes.map((n) => [n.id, n]));
const actTitle = new Map();
for (const f of fs.readdirSync(path.join(REPO, 'mini tools')).filter((x) => /-activities\.json$/.test(x))) {
  const m = read(path.join(REPO, 'mini tools', f), null); if (!m) continue;
  for (const r of (m.activities || m)) if (r && r.id && r.page_title && r.page_title[loc]) actTitle.set(r.id, r.page_title[loc]);
}
let md = '# Teaching points, ' + subject + ', language `' + loc + '`' + (gradeArg ? ', grade ' + gradeArg : '') + '\n';
for (const g of gradeArg ? [gradeArg] : ['K', '1', '2', '3']) {
  md += '\n## Grade ' + g + '\n';
  for (const p of points.filter((x) => x.grade === g && x.subject === subject).sort((a, b) => a.order - b.order)) {
    const withPages = p.types.filter((t) => assets.types[t] && assets.types[t].p.some((n) => n > 0));
    md += '\n### `' + p.id + '`' + (notes[p.id] ? ' NOTE' : '') + (withPages.length ? '' : ' — NO PAGES') + '\n' + p.skill + '\n';
    const rows = ((cw[p.id] || {}).rows || []).filter((r) => nodeById.has(r.id)).slice(0, 3).map((r) => r.rel + ' ' + line(registry, nodeById.get(r.id)));
    if (rows.length) md += '- curriculum: ' + rows.join(' | ') + '\n';
    for (const t of withPages) {
      const a = assets.types[t], s = strings[t] || {};
      md += '- ' + t + ' [' + a.p.join('/') + (a.set ? ' SET' : '') + (a.s.some((n) => n > 0) ? ' scr' : '') + '] “' + (s.title || '?') + '” — ' + (s.instruction || '?') + '\n';
    }
    const tl = Object.keys(tools).filter((k) => (tools[k].points || []).includes(p.id) && toolContent[k] && toolContent[k].name).map((k) => k + ' (' + toolContent[k].name + ')');
    if (tl.length) md += '- tools: ' + tl.join(', ') + '\n';
    const al = p.activities.filter((a) => assets.activities[a]).map((a) => actTitle.get(a) || a);
    if (al.length) md += '- activities: ' + al.join(' · ') + '\n';
  }
}
const out = path.join(REPO, 'out', 'units', 'points-' + subject + '-' + loc + (gradeArg ? '-' + gradeArg : '') + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + md.split('\n### ').length - 1 + ' points, ' + (md.length / 1024).toFixed(0) + ' KB');
