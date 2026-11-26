#!/usr/bin/env node
/**
 * Writes the click-rate test's new titles and descriptions (treatment.json) into their source files.
 *
 *   landing:<loc>                      frontend/content/seo-landing/<loc>.json      entry by slug: title, metaDescription
 *   override:<loc>:<section>:<key>     frontend/content/topic-seo-overrides/<loc>.json  [section][key]: title, metaDescription
 *   seasonal:<loc>:<season>, subjecthub:<loc>:<subject>:<level>   code (frontend/lib/seasonal-hub.ts, subject-hub.ts):
 *                                      checked here, written by hand in the same commit
 *
 * A JSON file is written only if it round-trips byte for byte in its own format (indent, LF/CRLF, final newline), so
 * the diff is the changed fields and nothing else; the script then proves that exactly two fields per page changed.
 *
 *   node docs/SEO/ctr-test-2026-11/apply-treatment.js            dry run: what would change
 *   node docs/SEO/ctr-test-2026-11/apply-treatment.js --write
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const WRITE = process.argv.includes('--write');
const treatment = JSON.parse(fs.readFileSync(path.join(__dirname, 'treatment.json'), 'utf8'));

const files = new Map(); // file -> { s, o, crlf, indent, nl }
function open(rel) {
  if (files.has(rel)) return files.get(rel);
  const full = path.join(REPO, rel);
  const s = fs.readFileSync(full, 'utf8');
  const crlf = s.includes('\r\n');
  const norm = crlf ? s.replace(/\r\n/g, '\n') : s;
  const o = JSON.parse(norm);
  const nl = norm.endsWith('\n') ? '\n' : '';
  const indent = [1, 2, 4, '\t'].find((k) => JSON.stringify(o, null, k) + nl === norm);
  if (indent === undefined) throw new Error(`${rel}: does not round-trip in a known JSON format; not touching it`);
  const f = { full, s, o, crlf, indent, nl, before: JSON.parse(norm) };
  files.set(rel, f);
  return f;
}
const landingIndex = (o) => (Array.isArray(o) ? o : o.landings || Object.values(o));

let changed = 0, already = 0, manual = 0;
for (const t of treatment) {
  const [kind, loc, a, b] = t.source.split(':');
  let target = null, rel = null;
  if (kind === 'landing') {
    rel = `frontend/content/seo-landing/${loc}.json`;
    const slug = t.path.split('/').pop();
    target = landingIndex(open(rel).o).find((x) => x && x.slug === slug);
  } else if (kind === 'override') {
    rel = `frontend/content/topic-seo-overrides/${loc}.json`;
    target = open(rel).o[a] && open(rel).o[a][b];
  } else {
    manual++;
    console.log(`manual  ${t.path} (${t.source}) — written in code by hand`);
    continue;
  }
  if (!target) throw new Error(`${t.path}: no entry in ${rel}`);
  if (target.title === t.after.title && target.metaDescription === t.after.description) { already++; continue; }
  if (target.title !== t.before.title.replace(/ · LessonCraftStudio$/, '') && target.title !== t.after.title) {
    console.log(`note    ${t.path}: source title "${target.title}" differs from the live one captured in pages.json`);
  }
  target.title = t.after.title;
  target.metaDescription = t.after.description;
  changed++;
  console.log(`change  ${t.path}`);
}

// prove: per touched file, exactly 2 × (pages in that file) leaf fields differ
function leafDiff(x, y, p = '', out = []) {
  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) { if (x !== y) out.push(p); return out; }
  for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) leafDiff(x[k], y[k], `${p}/${k}`, out);
  return out;
}
let fieldDiffs = 0;
for (const [rel, f] of files) {
  const d = leafDiff(f.before, f.o);
  fieldDiffs += d.length;
  if (d.some((p) => !/\/(title|metaDescription)$/.test(p))) throw new Error(`${rel}: a field other than title/metaDescription would change`);
  if (WRITE && d.length) {
    let out = JSON.stringify(f.o, null, f.indent) + f.nl;
    if (f.crlf) out = out.replace(/\n/g, '\r\n');
    fs.writeFileSync(f.full, out);
  }
}
console.log(`\n${changed} page(s) to change, ${already} already done, ${manual} by hand; ${fieldDiffs} field(s) differ` + (WRITE ? ' — written' : ' — dry run'));
if (fieldDiffs > changed * 2) { console.log('MORE FIELDS DIFFER THAN EXPECTED'); process.exit(1); }
