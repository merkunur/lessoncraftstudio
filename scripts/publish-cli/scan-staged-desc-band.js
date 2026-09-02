#!/usr/bin/env node
/**
 * scan-staged-desc-band.js <staging-folder> [--quiet]
 *
 * Read-only pre-upload check that every staged ZIP's meta description sits in
 * the 120-170 band, so a batch cannot reach `publish-bulk --confirm` and HALT
 * with DESCRIPTION_LENGTH_TOO_SHORT/TOO_LONG after the upload.
 *
 * WHY THIS EXISTS. `preband-staged-descriptions.js` is the pre-upload band step
 * for app-generated ZIPs, but it SKIPS anything with `manifest.printable_only`
 * (worksheet-gen output), because those are banded at emit time by
 * build-seo-head.js `bandedDescription()`. That is true right up until a face's
 * title or skill sentence is short enough that no candidate bands — at which
 * point the only thing standing between it and a failed publish run is the
 * publish-time HALT itself. This closes that gap for printable waves.
 *
 * THE VERDICT IS NOT REIMPLEMENTED HERE. It calls the very predicate the
 * publisher halts on (`seo-reconciliation.reconcileDescriptionLength`), so the
 * scanner and the HALT cannot drift apart or disagree about a boundary case. A
 * gate that rewrites the rule it is checking is testing a copy of that rule.
 *
 * The description is read as the RAW attribute bytes between the quotes of
 * <meta name="description" content="...">, because that is exactly what the
 * predicate measures (escapeAttr-encoded, matching audit-deck-html Check 15) —
 * an HTML parser that decodes entities would measure a different string.
 *
 * Exit 0 = every deck in band. Exit 1 = at least one out of band. Exit 2 = usage
 * or an unreadable staging folder.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { reconcileDescriptionLength } = require('./seo-reconciliation.js');

const DESC_RE = /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i;

function descriptionOf(html) {
  const m = DESC_RE.exec(html);
  return m ? m[1] : null;
}

function scan(dir) {
  const rows = [];
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.zip')).sort();
  for (const f of files) {
    const zip = new AdmZip(path.join(dir, f));
    const html = zip.getEntry('deck.html');
    const mf = zip.getEntry('manifest.json');
    if (!html) { rows.push({ file: f, category: 'NO_DECK_HTML', length: 0 }); continue; }
    let manifest = {};
    try { manifest = JSON.parse(mf.getData().toString('utf8')); } catch (e) { /* keep {} */ }
    const desc = descriptionOf(html.getData().toString('utf8'));
    if (desc === null) { rows.push({ file: f, category: 'DESCRIPTION_TAG_MISSING', length: 0 }); continue; }
    const v = reconcileDescriptionLength(manifest, desc, {});
    rows.push({ file: f, category: v.category, length: v.length, value: desc });
  }
  return rows;
}

module.exports = { scan, descriptionOf };

if (require.main === module) {
  const dir = process.argv[2];
  const quiet = process.argv.includes('--quiet');
  if (!dir) { console.error('usage: scan-staged-desc-band.js <staging-folder> [--quiet]'); process.exit(2); }
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) { console.error('not a directory: ' + dir); process.exit(2); }
  const rows = scan(dir);
  if (!rows.length) { console.error('no .zip files in ' + dir); process.exit(2); }
  const bad = rows.filter((r) => r.category !== 'CLEAN');
  const lens = rows.filter((r) => r.length > 0).map((r) => r.length).sort((a, b) => a - b);
  const median = lens.length ? lens[Math.floor(lens.length / 2)] : 0;
  if (!quiet) {
    console.log(`scanned ${rows.length} staged decks in ${dir}`);
    console.log(`  in band (120-170): ${rows.length - bad.length}`);
    console.log(`  length min/median/max: ${lens[0] || 0} / ${median} / ${lens[lens.length - 1] || 0}`);
  }
  for (const r of bad) console.error(`  ${r.category} (${r.length}) ${r.file}${r.value ? '\n      "' + r.value.slice(0, 180) + '"' : ''}`);
  if (bad.length) { console.error(`${bad.length} deck(s) would HALT at publish`); process.exit(1); }
  console.log('all descriptions in band');
}
