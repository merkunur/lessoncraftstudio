#!/usr/bin/env node
/**
 * Applies a reviewer's corrections to the PAGE texts of a language's units (Daily Teaching System, Part 4.6 onward):
 * the fixed strings (frontend/content/units/ui.<loc>.json) and the names, page titles and meta descriptions of units
 * and plans (frontend/content/units/defs/<loc>.json, the hand-kept source). Teacher notes have their own tool
 * (scripts/units/notes/rewrite.js).
 *
 *   node scripts/units/apply-page-corrections.js --loc=sv <corrections.json> [--dry]
 *
 * corrections.json: { "ui": { "<key>": "text" }, "units": { "<unit id>": { title?, metaTitle?, metaDescription? } },
 *                     "plans": { "<plan id>": { title?, metaTitle?, metaDescription? } } }
 * Refused, with nothing written: a key the English strings do not have, a string that loses or gains a {placeholder},
 * an id that is no unit or plan, a field other than the three, a unit metaTitle over 70 characters, a unit meta
 * description outside 110-170 characters. A unit's slug never changes here (a title may; the address stays).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', null);
const src = process.argv.slice(2).find((x) => !x.startsWith('--'));
const DRY = process.argv.includes('--dry');
if (!loc || !src) { console.error('usage: apply-page-corrections.js --loc=<loc> <corrections.json> [--dry]'); process.exit(1); }
const U = path.join(REPO, 'frontend', 'content', 'units');
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const patch = read(path.resolve(src));
const uiFile = path.join(U, 'ui.' + loc + '.json'), defsFile = path.join(U, 'defs', loc + '.json');
const ui = read(uiFile), en = read(path.join(U, 'ui.en.json')), defs = read(defsFile);
const holes = (s) => (String(s).match(/\{[A-Za-z_]+\}/g) || []).sort().join(' ');
const problems = [];
let n = 0;
for (const [k, v] of Object.entries(patch.ui || {})) {
  if (!(k in en)) { problems.push('ui ' + k + ': no such string'); continue; }
  if (typeof v !== 'string' || !v.trim()) { problems.push('ui ' + k + ': empty'); continue; }
  if (holes(v) !== holes(en[k])) { problems.push('ui ' + k + ': placeholders "' + holes(v) + '" are not those of the English string "' + holes(en[k]) + '"'); continue; }
  if (ui[k] !== v) { ui[k] = v; n++; }
}
const FIELDS = ['title', 'metaTitle', 'metaDescription'];
for (const [kind, list] of [['units', defs.units], ['plans', defs.plans || []]]) {
  for (const [id, c] of Object.entries(patch[kind] || {})) {
    const x = list.find((y) => y.id === id);
    if (!x) { problems.push(kind + ' ' + id + ': no such id'); continue; }
    for (const [f, v] of Object.entries(c)) {
      if (!FIELDS.includes(f)) { problems.push(kind + ' ' + id + ': ' + f + ' cannot be corrected here'); continue; }
      if (typeof v !== 'string' || !v.trim()) { problems.push(kind + ' ' + id + ' ' + f + ': empty'); continue; }
      if (holes(v) !== holes(x[f])) { problems.push(kind + ' ' + id + ' ' + f + ': placeholders changed'); continue; }
      if (kind === 'units' && f === 'metaTitle' && v.length > 70) { problems.push('units ' + id + ': metaTitle has ' + v.length + ' characters (70 at most)'); continue; }
      if (kind === 'units' && f === 'metaDescription' && (v.length < 110 || v.length > 170)) { problems.push('units ' + id + ': the meta description has ' + v.length + ' characters (110 to 170)'); continue; }
      if (x[f] !== v) { x[f] = v; n++; }
    }
  }
}
if (problems.length) { for (const p of problems) console.log('ERROR  ' + p); console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }
if (!DRY) { fs.writeFileSync(uiFile, JSON.stringify(ui, null, 1) + '\n'); fs.writeFileSync(defsFile, JSON.stringify(defs, null, 1) + '\n'); }
console.log(loc + ': ' + n + ' text(s) ' + (DRY ? 'would change' : 'changed') + ' (strings, unit and plan names); assemble again: node scripts/units/assemble.js --loc=' + loc);
