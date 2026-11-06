#!/usr/bin/env node
/**
 * Apply a native + pedagogy reviewer's findings at their source (the #2 rule: every finding is fixed where it lives).
 *
 *   node scripts/makers/landing/apply-review.js <findings.json> [--dry-run]
 *
 * Findings: [{ loc, file: src|ui|hub|ribbon|make, maker, key, old, new, why, severity }]. `old` must be an exact substring of
 * the current value; anything that does not match is listed, never guessed at. After applying: compile-copy.js, then
 * build-compositions.js --og --force for any maker whose keyword changed (the printed report names them).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const DATA = path.join(REPO, 'frontend', 'content', 'maker-landings');
const MSG = path.join(REPO, 'frontend', 'messages');
const DRY = process.argv.includes('--dry-run');
const findings = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const open = new Map();
function doc(file) {
  if (!open.has(file)) { const raw = fs.readFileSync(file, 'utf8'); open.set(file, { json: JSON.parse(raw), end: raw.endsWith('\n') ? '\n' : '', indent: /^\{\n {2}"/.test(raw) ? 2 : 1 }); }
  return open.get(file);
}
function target(f) {
  if (f.file === 'src') { const d = doc(path.join(DATA, 'src', `${f.loc}.json`)); return { d, obj: d.json[f.maker] }; }
  if (f.file === 'ui') { const d = doc(path.join(DATA, `ui.${f.loc}.json`)); return { d, obj: d.json }; }
  if (f.file === 'hub') { const d = doc(path.join(DATA, `hub.${f.loc}.json`)); return { d, obj: d.json }; }
  if (f.file === 'ribbon') { const d = doc(path.join(DATA, 'ribbon.json')); return { d, obj: d.json[f.loc] }; }
  if (f.file === 'make') { const d = doc(path.join(MSG, `${f.loc}.json`)); return { d, obj: d.json.homepageV6.make }; }
  return {};
}

let applied = 0;
const missed = [], keywords = new Set();
for (const f of findings) {
  const { obj } = target(f);
  if (!obj) { missed.push(f); continue; }
  const parts = String(f.key).split('.');
  let holder = obj, last = parts[0];
  if (parts.length === 2 && Array.isArray(obj[parts[0]])) { holder = obj[parts[0]]; last = Number(parts[1]); }
  const cur = holder[last];
  if (typeof cur === 'string' && cur.includes(f.old)) {
    holder[last] = cur.replace(f.old, f.new);
    applied++;
    if (f.file === 'src' && f.key === 'kw') keywords.add(`${f.maker} ${f.loc}`);
    continue;
  }
  // a reviewer's key can point at the wrong line of `teaches`: look through the entry, never the whole file
  let found = false;
  if (f.file === 'src') {
    for (const k of ['kw', 'lead', 'moment']) if (typeof obj[k] === 'string' && obj[k].includes(f.old)) { obj[k] = obj[k].replace(f.old, f.new); found = true; if (k === 'kw') keywords.add(`${f.maker} ${f.loc}`); break; }
    if (!found && Array.isArray(obj.teaches)) obj.teaches.forEach((t, i) => { if (!found && t.includes(f.old)) { obj.teaches[i] = t.replace(f.old, f.new); found = true; } });
  }
  if (found) applied++; else missed.push(f);
}
if (!DRY) for (const [file, d] of open) fs.writeFileSync(file, JSON.stringify(d.json, null, d.indent) + d.end);
console.log(`${DRY ? 'would apply' : 'applied'} ${applied} of ${findings.length}`);
missed.forEach((f) => console.log(`NOT APPLIED ${f.loc} ${f.file} ${f.maker || ''} ${f.key}: ${String(f.old).slice(0, 70)}`));
if (keywords.size) console.log(`keywords changed, rebuild their share images: ${[...keywords].join(', ')}`);
process.exit(missed.length ? 1 : 0);
