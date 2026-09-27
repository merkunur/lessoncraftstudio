#!/usr/bin/env node
/**
 * mark-zips-noindex.js — stamp the do-not-index marker into every
 * "Export to catalog" ZIP in a folder (2026-09-27, Level Set programme).
 *
 * Sets manifest.indexable = false in each ZIP's manifest.json, in place.
 * publish.js then publishes the deck VISIBLE to teachers but never offered to
 * search engines (noindex-marker.js). Idempotent: a ZIP already marked is
 * left byte-identical. Non-recursive, like publish-bulk.
 *
 * Usage:  node scripts/publish-cli/mark-zips-noindex.js <folder> [--dry-run]
 *         (publish-wave.js --noindex runs this for you)
 */
'use strict';
var fs = require('fs');
var path = require('path');
var AdmZip = require('adm-zip');

function markZip(file, dryRun) {
  var zip = new AdmZip(file);
  var entry = zip.getEntry('manifest.json');
  if (!entry) throw new Error('no manifest.json');
  var manifest = JSON.parse(zip.readAsText(entry));
  if (manifest.indexable === false) return 'already';
  if (dryRun) return 'would-mark';
  manifest.indexable = false;
  zip.updateFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));
  var tmp = file + '.noindex-tmp';
  zip.writeZip(tmp);
  fs.renameSync(tmp, file);
  return 'marked';
}

function main() {
  var args = process.argv.slice(2);
  var folder = args.find(function (a) { return a.indexOf('--') !== 0; });
  var dryRun = args.indexOf('--dry-run') !== -1;
  if (!folder || !fs.existsSync(folder)) {
    console.error('usage: mark-zips-noindex.js <folder> [--dry-run]');
    process.exit(2);
  }
  var zips = fs.readdirSync(folder).filter(function (f) { return f.toLowerCase().endsWith('.zip'); }).sort();
  var tally = { marked: 0, 'would-mark': 0, already: 0, failed: 0 };
  zips.forEach(function (f) {
    try { tally[markZip(path.join(folder, f), dryRun)]++; }
    catch (e) { tally.failed++; console.error('  FAIL ' + f + ': ' + e.message); }
  });
  console.log('[mark-zips-noindex] ' + zips.length + ' ZIP(s): ' + JSON.stringify(tally) + (dryRun ? ' (dry-run)' : ''));
  if (tally.failed) process.exit(1);
}

if (require.main === module) main();
module.exports = { markZip: markZip };
