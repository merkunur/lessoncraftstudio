#!/usr/bin/env node
/**
 * One-shot retrofitter: replaces apex-form canonical URLs with www. form in
 * deck.html files. Fixes the embed-iframe auto-resize defect where:
 *   1. publish-cli substitute.js used to substitute __CANONICAL_URL__ with
 *      apex form (https://lessoncraftstudio.com)
 *   2. Operator's embed snippet has iframe src=apex
 *   3. Browser loads apex → nginx 301-redirects to www
 *   4. Inside iframe, location.href = www
 *   5. postMessage emits resize-height with url=www
 *   6. Embed-snippet listener compares url=www vs f.src=apex → MISMATCH
 *   7. Resize rejected; iframe stays at default aspect-ratio:800/1400
 *   8. Sparse-content apps (alphabet-train, prepositions) show empty space
 *      at iframe bottom; dense-content apps coincidentally fill 1400px
 *      and look fine
 *
 * Per CLAUDE.md §A.10, www. is the canonical form across all URL substitutions.
 *
 * Replacements (in plain + URL-encoded forms):
 *   https://lessoncraftstudio.com/        →  https://www.lessoncraftstudio.com/
 *   https%3A%2F%2Flessoncraftstudio.com%2F →  https%3A%2F%2Fwww.lessoncraftstudio.com%2F
 *
 * Usage: node scripts/publish-cli/rewrite-canonical-host.js <directory> [--dry-run]
 *
 * Idempotent: re-runs report skip-already-www. Atomic per-file write.
 */

'use strict';

var fs = require('fs');
var path = require('path');

// Apex form (current state in many decks) → www. form (target).
// Use the FULL `https://lessoncraftstudio.com/` (with trailing slash) as the
// match pattern so we don't accidentally match `lessoncraftstudio.com` inside
// other contexts (e.g., `www.lessoncraftstudio.com` would match the bare host
// substring without the protocol+slash anchor).
var REPLACEMENTS = [
  { from: 'https://lessoncraftstudio.com/', to: 'https://www.lessoncraftstudio.com/' },
  // URL-encoded form (used in social share intent links via encodeURIComponent)
  { from: 'https%3A%2F%2Flessoncraftstudio.com%2F', to: 'https%3A%2F%2Fwww.lessoncraftstudio.com%2F' },
  // Lowercase URL-encoded variant (defensive)
  { from: 'https%3a%2f%2flessoncraftstudio.com%2f', to: 'https%3a%2f%2fwww.lessoncraftstudio.com%2f' }
];

function replaceAll(html) {
  var changed = 0;
  REPLACEMENTS.forEach(function (r) {
    var split = html.split(r.from);
    if (split.length > 1) {
      changed += split.length - 1;
      html = split.join(r.to);
    }
  });
  return { html: html, changed: changed };
}

function processFile(filepath, dryRun) {
  var html;
  try {
    html = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    return { file: filepath, action: 'skip-read-error', note: e.message };
  }
  var result = replaceAll(html);
  if (result.changed === 0) {
    return { file: filepath, action: 'skip-already-www' };
  }
  if (dryRun) {
    return { file: filepath, action: 'would-rewrite', changed: result.changed };
  }
  var tmp = filepath + '.tmp';
  try {
    fs.writeFileSync(tmp, result.html, 'utf8');
    fs.renameSync(tmp, filepath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    return { file: filepath, action: 'write-error', note: e.message };
  }
  return { file: filepath, action: 'rewritten', changed: result.changed };
}

function walkDecksDir(rootDir, accumulator) {
  var entries;
  try {
    entries = fs.readdirSync(rootDir);
  } catch (e) {
    return;
  }
  entries.forEach(function (name) {
    if (name.charAt(0) === '.') return;
    var p = path.join(rootDir, name);
    var stat;
    try { stat = fs.statSync(p); } catch (_) { return; }
    if (!stat.isDirectory()) return;
    var deckHtml = path.join(p, 'deck.html');
    if (fs.existsSync(deckHtml)) {
      accumulator.push(deckHtml);
    } else {
      walkDecksDir(p, accumulator);
    }
  });
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var rootDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].charAt(0) === '-') {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (rootDir == null) { rootDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!rootDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-canonical-host.js <directory> [--dry-run]');
    process.exit(2);
  }
  rootDir = path.resolve(rootDir);
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + rootDir);
    process.exit(2);
  }

  console.log('rewrite-canonical-host.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  root: ' + rootDir);
  console.log('');

  var deckHtmlPaths = [];
  walkDecksDir(rootDir, deckHtmlPaths);
  console.log('Found ' + deckHtmlPaths.length + ' deck.html files');
  console.log('');

  var counts = {};
  var totalReplacements = 0;
  var notes = [];
  deckHtmlPaths.forEach(function (p, idx) {
    var r = processFile(p, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    if (r.changed) totalReplacements += r.changed;
    if (r.action === 'write-error' || r.action === 'skip-read-error') {
      notes.push('  ' + r.action + '  ' + p + (r.note ? '  // ' + r.note : ''));
    }
    if ((idx + 1) % 500 === 0) console.log('  processed ' + (idx + 1) + '/' + deckHtmlPaths.length);
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) {
    if (counts[k] > 0) console.log('  ' + k + ':  ' + counts[k]);
  });
  console.log('  total apex→www replacements:  ' + totalReplacements);
  if (notes.length > 0) {
    console.log('');
    console.log('=== Errors ===');
    notes.forEach(function (n) { console.log(n); });
  }
  process.exit((counts['write-error'] || 0) > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { processFile: processFile, replaceAll: replaceAll, REPLACEMENTS: REPLACEMENTS };
