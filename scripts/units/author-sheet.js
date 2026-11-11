#!/usr/bin/env node
/**
 * The sheet a language's teacher notes are WRITTEN from (Daily Teaching System, Part 4.5 onward): for each lesson of
 * the named units, what the lesson's worksheets print IN THAT LANGUAGE (each type's title and instruction), and beside
 * it the reviewed English note of the same teaching point as a record of what the lesson is about and which mistake
 * its reviewers confirmed. The note of the language is written natively from the page; the English note is never
 * translated (a page in another language asks its own question in its own words, and a country teaches the point its
 * own way).
 *
 *   node scripts/units/author-sheet.js --loc=de --units=g1-add-subtract-within-10,g1-tens-and-ones   (id prefixes)
 *     → out/units/author-<loc>-<name>.md   (--name=<file stem>, default "part")
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'de');
const only = (arg('units', '') || '').split(',').filter(Boolean);
const U = path.join(REPO, 'frontend', 'content', 'units');
const defs = JSON.parse(fs.readFileSync(path.join(U, 'defs', loc + '.json'), 'utf8')).units.filter((u) => !only.length || only.some((x) => u.id.startsWith(x)));
const en = JSON.parse(fs.readFileSync(path.join(U, 'points', 'en.json'), 'utf8')).points;
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'), 'utf8'));
let md = '# Author sheet, language `' + loc + '`: ' + defs.length + ' unit(s)\n';
let n = 0;
for (const u of defs) {
  md += '\n## `' + u.id + '` — ' + u.title + ' (grade ' + u.grade + ', ' + u.subject + ')\n';
  for (const l of u.lessons) {
    n++;
    const e = en[l.point];
    md += '\n### `' + l.point + '`\n';
    for (const t of l.types) { const s = strings[t] || {}; md += '- ' + t + ' “' + (s.title || '(NO TITLE IN ' + loc + ')') + '” — ' + (s.instruction || '') + '\n'; }
    if (e) md += '- en: ' + e.title + ' | ' + e.objective + '\n- en mistake: ' + e.note.mistake + '\n- en words: ' + e.note.words + '\n- en watch: ' + e.note.watch + '\n';
    else md += '- (no English note for this point)\n';
  }
}
const out = path.join(REPO, 'out', 'units', 'author-' + loc + '-' + arg('name', 'part') + '.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + defs.length + ' unit(s), ' + n + ' lessons, ' + Math.round(md.length / 1024) + ' KB');
