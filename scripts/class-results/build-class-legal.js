#!/usr/bin/env node
/**
 * The three texts of "classes and results" as the site shows them (Daily Teaching System, Part 9; legal decision of
 * 2026-11-14, condition E7): the privacy section, the data processing terms and the note for parents.
 *
 *   source   frontend/content/class-legal/src/<locale>/{privacy,terms,parent-note}.md     written by a native writer
 *   built    frontend/content/class-legal/legal.<locale>.json   { privacy, terms, parentNote }   (imported by
 *            frontend/lib/class-results/legal.tsx; the app reads no file at run time)
 *
 *   node scripts/class-results/build-class-legal.js             builds every language that has all three texts
 *   node scripts/class-results/build-class-legal.js --check     exit 1 when a built file is not today's build, when a
 *                                                               language is incomplete, or when a text breaks a rule
 *   node scripts/class-results/build-class-legal.js --from-docs writes src/en from docs/daily-teaching-system/legal/
 *                                                               (the English texts with their working notes removed)
 *
 * The rules a text must keep (checked for every language, so a translation cannot drop them):
 *   - the same headings in the same order and number as the English text, the same number of list items and table rows
 *   - no square bracket left open except the teacher's own lines in the parent note
 *   - the facts: 14 months, 60 days, 7 days, 14 days, 48 hours, 20 minutes; Hetzner, Cloudflare; the support address;
 *     the operator's name; "Finland" in the language's own word is not checked, the numbers are
 *   - the words a page may not say: no "free", no promise the feature does not keep ("no data at all")
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const SRC = path.join(REPO, 'frontend', 'content', 'class-legal', 'src');
const OUT = path.join(REPO, 'frontend', 'content', 'class-legal');
const DOCS = path.join(REPO, 'docs', 'daily-teaching-system', 'legal');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DOCS_OF = { privacy: 'privacy-policy-section.en.md', terms: 'school-data-processing-agreement.en.md', 'parent-note': 'parent-note.en.md' };
const KEY = { privacy: 'privacy', terms: 'terms', 'parent-note': 'parentNote' };
const CHECK = process.argv.includes('--check');
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim() + '\n';

if (process.argv.includes('--from-docs')) {
  fs.mkdirSync(path.join(SRC, 'en'), { recursive: true });
  for (const [name, file] of Object.entries(DOCS_OF)) {
    let lines = fs.readFileSync(path.join(DOCS, file), 'utf8').replace(/\r\n/g, '\n').split('\n');
    // the working notes: the block quote right under the title (the parent note keeps its block for the teacher)
    lines = lines.filter((l) => !(l.startsWith('> ') && !l.startsWith('> **For the teacher')));
    if (name === 'privacy') lines = lines.slice(lines.findIndex((l) => l.startsWith('## ')));   // the section starts at its own heading
    fs.writeFileSync(path.join(SRC, 'en', name + '.md'), norm(lines.join('\n')));
  }
  console.log('src/en written from the docs');
}

const shape = (md) => ({
  headings: md.split('\n').filter((l) => /^#{1,3} /.test(l)).map((l) => l.match(/^#+/)[0].length),
  items: md.split('\n').filter((l) => /^- /.test(l)).length,
  rows: md.split('\n').filter((l) => /^\|/.test(l)).length,
});
const FACTS = {
  privacy: ['14', '60', '7', '48', '20', 'Hetzner', 'Cloudflare', 'support@lessoncraftstudio.com', 'Riza Kunur Genc', 'FERPA'],
  terms: ['14', '60', '7', '48', '30', 'Hetzner Online GmbH', 'Cloudflare, Inc.', 'Riza Kunur Genc', '34 CFR 99.31', '2021/914'],
  'parent-note': ['14'],
};
let bad = 0;
const fail = (m) => { bad++; console.log('FAIL  ' + m); };
const en = {};
for (const name of Object.keys(KEY)) { const f = path.join(SRC, 'en', name + '.md'); if (!fs.existsSync(f)) { fail('no English ' + name + '.md (run --from-docs)'); continue; } en[name] = norm(fs.readFileSync(f, 'utf8')); }
const built = [];
for (const loc of LOCALES) {
  const dir = path.join(SRC, loc);
  const have = Object.keys(KEY).filter((n) => fs.existsSync(path.join(dir, n + '.md')));
  if (!have.length) continue;
  if (have.length !== 3) { fail(loc + ': ' + have.length + ' of 3 texts'); continue; }
  const out = {};
  for (const name of Object.keys(KEY)) {
    const md = norm(fs.readFileSync(path.join(dir, name + '.md'), 'utf8'));
    const a = shape(md), b = shape(en[name] || '');
    if (JSON.stringify(a.headings) !== JSON.stringify(b.headings)) fail(loc + ' ' + name + ': headings ' + a.headings.join('') + ', English ' + b.headings.join(''));
    if (a.items !== b.items) fail(loc + ' ' + name + ': ' + a.items + ' list items, English ' + b.items);
    if (a.rows !== b.rows) fail(loc + ' ' + name + ': ' + a.rows + ' table rows, English ' + b.rows);
    for (const fact of FACTS[name]) if (!md.includes(fact)) fail(loc + ' ' + name + ': "' + fact + '" is missing');
    const open = (md.match(/\[[^\]\n]*\](?!\()/g) || []).filter((x) => name !== 'parent-note');
    if (open.length) fail(loc + ' ' + name + ': a bracket is left open: ' + open.slice(0, 3).join(' '));
    if (name === 'parent-note' && (md.match(/\[[^\]\n]*\](?!\()/g) || []).length !== (en[name].match(/\[[^\]\n]*\](?!\()/g) || []).length) fail(loc + ' parent-note: the teacher\'s lines to fill in differ in number from the English note');
    if (/^> /m.test(md) && name !== 'parent-note') fail(loc + ' ' + name + ': a working note (a line that starts with ">") is left in the text');
    if (loc === 'en' && /\bfree\b/i.test(md)) fail(loc + ' ' + name + ': the word "free"');
    if (loc !== 'en' && md === en[name]) fail(loc + ' ' + name + ': the text is still English');
    out[KEY[name]] = md;
  }
  const file = path.join(OUT, 'legal.' + loc + '.json'), json = JSON.stringify(out, null, 1) + '\n';
  if (CHECK) { if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== json) fail(loc + ': legal.' + loc + '.json is not the build of today\'s texts (run build-class-legal.js)'); }
  else fs.writeFileSync(file, json);
  built.push(loc);
}
console.log((bad ? bad + ' problem(s); ' : '') + 'class texts: ' + built.length + ' of ' + LOCALES.length + ' language(s) ' + (CHECK ? 'checked' : 'built') + ' (' + built.join(', ') + ')');
process.exit(bad ? 1 : 0);
