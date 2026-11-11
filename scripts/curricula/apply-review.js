#!/usr/bin/env node
/**
 * Puts a reviewer's corrections into a registry (Daily Teaching System, Part 2).
 *
 *   node scripts/curricula/apply-review.js <registry> <review.out.json> [<review.out.json> …]
 *
 * A review file is what a teacher-reviewer of that country wrote after reading the official text next to the
 * derived crosswalk:  { points: { "<point id>": { rows: [{ id, rel }], none?, why } }, notes: [...] }
 * It holds only the points the reviewer changed. This merges them into
 * frontend/content/curricula/<registry>/crosswalk-overrides.json (the reviewer's reason is kept beside each row)
 * and appends the reviewer's notes to docs/daily-teaching-system/curricula/REVIEW-NOTES.<registry>.md.
 * A point named by two reviews is refused: one of them has to give way by hand.
 *
 *   node scripts/curricula/apply-review.js <registry> --authored <author.out.json> [<author.out.json> …]
 *
 * --authored: the files are not corrections of a derived crosswalk but the crosswalk itself, written point by point
 * from the official text (a state or a country whose curriculum the points carry no codes of). Together they must
 * hold every teaching point; the result is crosswalk-authored.json, which the registry's builder turns into
 * crosswalk.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const authored = process.argv.includes('--authored');
const [reg, ...files] = process.argv.slice(2).filter((a) => a !== '--authored');
if (!reg || !files.length) { console.error('usage: apply-review.js <registry> <review.out.json> …'); process.exit(1); }
const dir = path.join(REPO, 'frontend', 'content', 'curricula', reg);
const nodes = new Set(JSON.parse(fs.readFileSync(path.join(dir, 'framework.json'), 'utf8')).nodes.map((n) => n.id));
const pointIds = new Set(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points.map((p) => p.id));
const out = {}, notes = [], problems = [];
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  const name = path.basename(f).replace(/\.out\.json$/, '');
  for (const [id, o] of Object.entries(d.points || {})) {
    if (!pointIds.has(id)) { problems.push(name + ': unknown point ' + id); continue; }
    if (out[id]) { problems.push(id + ' is corrected by two reviews'); continue; }
    const rows = [];
    for (const r of o.rows || []) {
      if (!nodes.has(r.id)) problems.push(name + ': ' + id + ' names ' + r.id + ', which is not a node');
      else if (!['teaches', 'prepares', 'extends'].includes(r.rel)) problems.push(name + ': ' + id + ' → ' + r.id + ' has the relation "' + r.rel + '"');
      else if (rows.some((x) => x.id === r.id)) problems.push(name + ': ' + id + ' names ' + r.id + ' twice');
      else rows.push({ id: r.id, rel: r.rel });
    }
    if (!o.why) problems.push(name + ': ' + id + ' gives no reason');
    out[id] = rows.length ? { rows, why: o.why, review: name } : { none: o.none || o.why || 'no counterpart in these documents', why: o.why, review: name };
  }
  notes.push([name, Array.isArray(d.notes) ? d.notes : d.notes ? [String(d.notes)] : []]);
}
for (const m of problems) console.log('FAIL  ' + m);
if (problems.length) process.exit(1);
const sorted = {};
for (const id of [...pointIds]) if (out[id]) sorted[id] = out[id];
if (authored) {
  const missing = [...pointIds].filter((id) => !out[id]);
  if (missing.length) { console.log('FAIL  ' + missing.length + ' teaching point(s) are in no file: ' + missing.slice(0, 20).join(', ')); process.exit(1); }
}
const target = authored ? 'crosswalk-authored.json' : 'crosswalk-overrides.json';
fs.writeFileSync(path.join(dir, target), JSON.stringify({ $comment: authored ? 'The crosswalk as reviewers who teach to this curriculum wrote it, point by point, from the official text (scripts/curricula/apply-review.js --authored). `why` is the reviewer\'s reason; the registry\'s builder adds each row\'s grade and writes crosswalk.json.' : 'Rows a reviewer who teaches to this curriculum set after reading the official text beside the derived crosswalk; they win over the derived rows. Written by scripts/curricula/apply-review.js from the review files; `why` is the reviewer\'s reason.', points: sorted }, null, 1) + '\n');
const docDir = path.join(REPO, 'docs', 'daily-teaching-system', 'curricula');
fs.mkdirSync(docDir, { recursive: true });
let md = '# Reviewers\' notes: registry `' + reg + '`\n\nWritten by the reviewers of the crosswalk (`scripts/curricula/apply-review.js`). ' + Object.keys(sorted).length + ' teaching points carry a reviewer\'s row; the reason for each is in `frontend/content/curricula/' + reg + '/' + target + '`.\n';
for (const [name, list] of notes) { md += '\n## ' + name + '\n\n'; for (const n of list) md += '- ' + n + '\n'; }
fs.writeFileSync(path.join(docDir, 'REVIEW-NOTES.' + reg + '.md'), md);
console.log(reg + ': ' + Object.keys(sorted).length + ' points carry a reviewer\'s row; notes written');
