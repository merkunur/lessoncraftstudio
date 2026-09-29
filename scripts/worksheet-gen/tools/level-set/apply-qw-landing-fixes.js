/**
 * apply-qw-landing-fixes.js — 2026-09-29: the question-words landings made TRUE of the corrected published pages.
 * Reads the native panels' two rounds (<scratch>/qwland-fix-<loc>.json, then qwland2-fix-<loc>.json, the second wins)
 * and writes the changed fields into frontend/content/seo-landing/<loc>.json — only question-words landings, only the
 * text fields, only a slug that exists. Refuses a field outside the allowed set, an empty text, a meta outside 100-170.
 *   node tools/level-set/apply-qw-landing-fixes.js <scratchDir> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const ROOT = path.join(__dirname, '..', '..', '..', '..', 'frontend', 'content', 'seo-landing');
const FIELDS = new Set(['eyebrow', 'h1', 'title', 'metaDescription', 'p1', 'p2', 'p3']);
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const problems = [];
let changed = 0;
for (const loc of LOCS) {
  const fixes = {};
  for (const f of ['qwland-fix-' + loc + '.json', 'qwland2-fix-' + loc + '.json', 'qwland3-fix-' + loc + '.json']) {
    const p = path.join(DIR, f);
    if (!fs.existsSync(p)) continue;
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const [slug, v] of Object.entries(j)) {
      if (slug === 'notes' || !v || typeof v !== 'object' || Array.isArray(v)) continue;
      fixes[slug] = { ...(fixes[slug] || {}), ...v };
    }
  }
  if (!Object.keys(fixes).length) continue;
  const file = path.join(ROOT, loc + '.json');
  const raw = fs.readFileSync(file, 'utf8');
  const doc = JSON.parse(raw);
  for (const [slug, v] of Object.entries(fixes)) {
    const l = doc.landings.find((x) => x.slug === slug);
    if (!l) { problems.push(`${loc} ${slug}: no such landing`); continue; }
    if (!l.coordinate || l.coordinate.type !== 'question-words') { problems.push(`${loc} ${slug}: not a question-words landing`); continue; }
    for (const [k, t] of Object.entries(v)) {
      if (!FIELDS.has(k)) { problems.push(`${loc} ${slug}: field "${k}" not allowed`); continue; }
      if (typeof t !== 'string' || !t.trim()) { problems.push(`${loc} ${slug}.${k}: empty`); continue; }
      if (k === 'metaDescription' && (t.length < 100 || t.length > 170)) { problems.push(`${loc} ${slug}.metaDescription: ${t.length} chars`); continue; }
      if (l[k] !== t) { l[k] = t; changed++; console.log(`${loc} ${slug}.${k}`); }
    }
  }
  if (!DRY && !problems.length) {
    const ind = (raw.match(/^\{\r?\n( +)/) || [, ' '])[1].length;
    let out = JSON.stringify(doc, null, ind) + (raw.endsWith('\n') ? '\n' : '');
    if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
    fs.writeFileSync(file, out);
  }
}
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exit(1); }
console.log(`${changed} fields ${DRY ? 'would change' : 'changed'}`);
