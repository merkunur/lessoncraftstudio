#!/usr/bin/env node
/**
 * One compact text file with everything a teacher READS in the units and sub packs of a language, for the one
 * reviewer of the native-speaker and pedagogy check (CLAUDE.md rule #2): every lesson's title, objective and teacher
 * note beside the worksheets it hands out (their own titles and instructions), every block's script, and the pages'
 * and PDFs' own strings.
 *
 *   node scripts/units/dump-for-review.js --loc=en   → out/units/review-<loc>.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (d !== undefined) return d; throw e; } };
const C = path.join(REPO, 'frontend', 'content');
const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
const units = readJson(path.join(C, 'units', 'units.' + loc + '.json'), { units: [] }).units;
const packs = readJson(path.join(C, 'sub-plans', 'packs.' + loc + '.json'), { packs: [] }).packs;
const uiU = readJson(path.join(C, 'units', 'ui.' + loc + '.json'), {});
const uiS = readJson(path.join(C, 'sub-plans', 'ui.' + loc + '.json'), {});
let md = '# Units and sub packs, language `' + loc + '`: everything a teacher reads\n\n';
md += 'Ids in `code` are what to cite in a finding. A worksheet\'s own title and instruction (printed on the page the children get) are given so that a note or a script can be checked against it; they are not under review themselves.\n';
for (const u of units) {
  md += '\n## UNIT `' + u.id + '` — ' + u.title + ' (grade ' + u.grade + ', ' + u.subject + ', about ' + u.weeks + ' weeks)\n\n- page title: ' + u.metaTitle + '\n- page description: ' + u.metaDescription + '\n';
  for (const l of u.lessons) {
    md += '\n### `' + u.id + ' / lesson ' + l.n + '` (teaching point `' + l.point + '`) — ' + l.title + '\n\n';
    md += '- objective: ' + l.objective + '\n';
    md += '- standards shown: ' + (l.standards.map((s) => s.rel + ' ' + [s.framework, s.code].filter(Boolean).join(' ')).join('; ') || 'none') + '\n';
    for (const p of l.paper) md += '- worksheet "' + p.title + '" (levels: core' + (p.easy ? ', easier' : '') + (p.hard ? ', harder' : '') + ') — its instruction: ' + ((strings[p.type] || {}).instruction || '') + '\n';
    if (l.tool) md += '- tool on the projector: ' + l.tool.name + '\n';
    if (l.screen) md += '- on screen: ' + l.screen.title + (l.screen.kind === 'page' ? ' (a worksheet page with a Check button)' : ' (an activity)') + '\n';
    md += '- teacher note, the usual mistake: ' + l.note.mistake + '\n- teacher note, words to use: ' + l.note.words + '\n- teacher note, what to watch for: ' + l.note.watch + '\n';
  }
}
for (const p of packs) {
  md += '\n## SUB PACK `' + p.id + '` — ' + p.title + ' (grade ' + p.grade + ', ' + p.position + ' of the year, ' + p.minutes + ' minutes of work)\n\n- page title: ' + p.metaTitle + '\n- page description: ' + p.metaDescription + '\n';
  for (const [i, b] of p.blocks.entries()) {
    md += '\n### `' + p.id + ' / block ' + (i + 1) + '` (' + (uiS['block_' + b.key] || b.key) + ', ' + b.minutes + ' min, teaching point `' + b.point + '`)\n\n';
    md += '- worksheet "' + b.title + '" (for everyone' + (b.easy ? ', an easier page' : '') + (b.hard ? ', a page for early finishers' : '') + ') — its instruction: ' + b.instruction + '\n';
    md += '- script, say: ' + b.script.say + '\n- script, start together: ' + b.script.first + '\n- script, if a child is stuck: ' + b.script.stuck + '\n';
  }
}
const list = (title, ui) => { md += '\n## ' + title + '\n\n'; for (const [k, v] of Object.entries(ui)) md += '- `' + k + '`: ' + v + '\n'; };
if (Object.keys(uiU).length) list('The unit page\'s and the teacher guide\'s own strings (`units/ui`)', uiU);
if (Object.keys(uiS).length) list('The sub pack page\'s and the guest teacher pages\' own strings (`sub-plans/ui`)', uiS);
const out = path.join(REPO, 'out', 'units', 'review-' + loc + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + units.length + ' unit(s), ' + packs.length + ' pack(s), ' + Math.round(md.length / 1024) + ' KB');
