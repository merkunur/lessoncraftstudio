#!/usr/bin/env node
/**
 * One compact text file with everything a GUEST TEACHER and a class teacher read in the sub packs of a language, for
 * the one reviewer of the native-speaker and pedagogy check (CLAUDE.md rule #2; Daily Teaching System, Part 5).
 *
 * Per pack: its name, page title and description, and each block of the day with the worksheet it hands out (the
 * title and directions printed on it) and the script (say, start together, if a child is stuck). A script that
 * appeared in an earlier pack word for word is named, not repeated. Then the pack page's and the guest teacher
 * pages' own strings.
 *
 *   node scripts/sub-plans/dump-for-review.js --loc=en [--grades=K,1]   → out/sub-plans/review-<loc>.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const grades = (arg('grades', '') || '').split(',').filter(Boolean);
const S = path.join(REPO, 'frontend', 'content', 'sub-plans');
const packs = JSON.parse(fs.readFileSync(path.join(S, 'packs.' + loc + '.json'), 'utf8')).packs.filter((p) => !grades.length || grades.includes(String(p.grade)));
const ui = JSON.parse(fs.readFileSync(path.join(S, 'ui.' + loc + '.json'), 'utf8'));
let md = '# Sub packs, language `' + loc + '`: everything a guest teacher reads\n\nIds in `code` are what to cite in a finding. A worksheet\'s own title and directions (printed on the page the children get) are given so that a script can be checked against them; they are not under review themselves.\n';
const seen = new Map();
for (const p of packs) {
  md += '\n## PACK `' + p.id + '` — ' + p.title + ' (grade ' + p.grade + ', ' + p.position + ' in the year, ' + p.minutes + ' minutes of seat work)\n\n- page title: ' + p.metaTitle + '\n- page description: ' + p.metaDescription + '\n';
  for (const b of p.blocks) {
    const key = b.point + ' / ' + b.type + (b.level === 'hard' ? '+' : '');
    md += '\n### `' + p.id + ' / ' + b.key + '` (' + (ui['block_' + b.key] || b.key) + ', ' + b.minutes + ' min; script `' + key + '`)\n\n- worksheet "' + b.title + '" (pages: ' + ['core', b.easy ? 'easier' : '', b.hard ? 'early finishers' : ''].filter(Boolean).join(', ') + ') — its directions: ' + b.instruction + '\n';
    if (seen.has(key)) { md += '- script: the same as in `' + seen.get(key) + '`\n'; continue; }
    seen.set(key, p.id + ' / ' + b.key);
    md += '- say: ' + b.script.say + '\n- start together: ' + b.script.first + '\n- if a child is stuck: ' + b.script.stuck + '\n';
  }
}
md += '\n## The strings of the pack page and of the guest teacher pages (`sub-plans/ui`)\n\n';
for (const [k, v] of Object.entries(ui)) md += '- `' + k + '`: ' + v + '\n';
const out = path.join(REPO, 'out', 'sub-plans', 'review-' + loc + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + packs.length + ' pack(s), ' + seen.size + ' scripts, ' + Math.round(md.length / 1024) + ' KB');
