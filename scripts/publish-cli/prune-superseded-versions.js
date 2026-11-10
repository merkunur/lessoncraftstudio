// Run on the server after an in-place republish has been verified live (CLAUDE.md §A.14.12, memory
// feedback_clean_server_after_republish):
//   node scripts/publish-cli/prune-superseded-versions.js <updates-manifest.json> [--apply]
// The manifest is the one publish-wave's --updates-manifest used ({ "<zip name>": "<live slug>" }, the locale read from
// the ZIP name's "-<loc>-v<N>" part). For every updated deck it lists the <slug>-vN folders that the live <slug> symlink
// no longer points to. Dry run by default; --apply deletes them. Refuses (exit 1, nothing deleted) if any live symlink is
// missing or dangling. The live target is never in the list.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const apply = process.argv.includes('--apply');
const manifestPath = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!manifestPath) { console.error('usage: prune-superseded-versions.js <updates-manifest.json> [--apply]'); process.exit(2); }
const map = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const ROOT = '/var/www/lcs-media/decks';
const byLoc = {};
for (const [zip, slug] of Object.entries(map)) {
  // "<…>-<loc>-v<N>.zip" (variant > 1) or "<…>-<loc>.zip" (variant 1, e.g. wsg-wb2varen-k295-nothm-d2-en.zip)
  const m = zip.match(/-([a-z]{2})(?:-v\d+)?\.zip$/);
  if (!m) { console.error(`cannot read the locale from "${zip}" — nothing deleted`); process.exit(1); }
  (byLoc[m[1]] = byLoc[m[1]] || []).push(slug);
}
const bad = [], del = [];
let live = 0;
for (const [loc, slugs] of Object.entries(byLoc)) {
  const dir = path.join(ROOT, loc);
  const names = fs.readdirSync(dir);
  const set = new Set(slugs);
  const byBase = new Map();
  for (const n of names) {
    const m = n.match(/^(.*)-v(\d+)$/);
    if (m && set.has(m[1])) byBase.set(m[1], (byBase.get(m[1]) || []).concat(n));
  }
  for (const slug of slugs) {
    const link = path.join(dir, slug);
    let target;
    try { target = fs.readlinkSync(link); } catch (e) { bad.push(`${loc}/${slug}: not a symlink`); continue; }
    if (!fs.existsSync(path.join(dir, target))) { bad.push(`${loc}/${slug}: dangling -> ${target}`); continue; }
    live++;
    for (const v of byBase.get(slug) || []) {
      if (v === target) continue;
      del.push(path.join(dir, v));
    }
  }
}
let bytes = 0;
if (del.length) bytes = Number(execFileSync('du', ['-scb', ...del]).toString().trim().split('\n').pop().split('\t')[0]);
console.log(`locales ${Object.keys(byLoc).length} · live symlinks ok ${live} · superseded folders ${del.length} · ${(bytes / 1e9).toFixed(2)} GB`);
const perLoc = {};
for (const d of del) { const l = d.split('/')[5]; perLoc[l] = (perLoc[l] || 0) + 1; }
console.log('per locale: ' + JSON.stringify(perLoc));
console.log('sample: ' + del.slice(0, 3).join('  '));
for (const b of bad) console.log('FAIL ' + b);
if (bad.length) process.exit(1);
if (apply) {
  for (const d of del) fs.rmSync(d, { recursive: true, force: true });
  const left = del.filter((d) => fs.existsSync(d)).length;
  console.log(`deleted ${del.length - left}, left ${left}`);
  if (left) process.exit(1);
}
