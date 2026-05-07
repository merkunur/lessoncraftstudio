#!/usr/bin/env node
/**
 * One-shot STRIPPER for already-injected clamp+attribution markers in
 * deck.html files. Reverts the embed-clamp work that introduced two
 * regressions (standalone clipping, embed clipping due to async-positioned
 * pieces). Restores deck.html files to pre-injection state.
 *
 * Earlier history (this script's role evolved):
 *   - v1 (commit 353c1f56): injected clamp + HTML attribution unconditionally
 *     → broke standalone deck pages (cut content)
 *   - v2 (commit 694576f0): same script, embed-gated → still cut content for
 *     apps with async-positioned pieces (alphabet-train drag pieces row)
 *   - current (this revert): strips both v1 and v2 markers + their script
 *     blocks. catalog-export.js no longer emits the clamp block. Future
 *     generations are clean.
 *
 * Operator chose Option B (full revert) over Option A (smarter clamp with
 * MutationObserver) on the basis that the original embed gap was a minor
 * visual issue while the clipping bug caused visible content loss. The
 * gap returns for sparse-content apps (alphabet-train + prepositions) but
 * no content is ever clipped.
 *
 * Usage:
 *   node scripts/publish-cli/inject-clamp.js <directory> [--dry-run]
 *
 * Idempotent: re-runs on already-stripped files report skip-no-marker.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var V1_MARKER = '<!-- lcs-clamp-injected-v1 -->';
var V2_MARKER = '<!-- lcs-clamp-injected-v2 -->';

function stripMarkerBlock(html, marker) {
  var idx = html.indexOf(marker);
  if (idx === -1) return null;
  // Walk back past preceding newlines for clean trailing whitespace.
  while (idx > 0 && (html.charAt(idx - 1) === '\n' || html.charAt(idx - 1) === '\r')) {
    idx--;
  }
  // Find the FIRST closing </script> after the marker (the script block ends there).
  var scriptCloseTag = '</script>';
  var endIdx = html.indexOf(scriptCloseTag, idx + marker.length);
  if (endIdx === -1) return null;
  endIdx += scriptCloseTag.length;
  return html.slice(0, idx) + html.slice(endIdx);
}

function processFile(filepath, dryRun) {
  var html;
  try {
    html = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    return { file: filepath, action: 'skip-read-error', note: e.message };
  }
  var hadV1 = html.indexOf(V1_MARKER) !== -1;
  var hadV2 = html.indexOf(V2_MARKER) !== -1;
  if (!hadV1 && !hadV2) {
    return { file: filepath, action: 'skip-no-marker' };
  }
  var stripped = html;
  // Strip whichever marker is present. Some files may have BOTH if a v2 run
  // failed mid-strip — handle defensively by stripping each in sequence.
  if (hadV1) {
    var s1 = stripMarkerBlock(stripped, V1_MARKER);
    if (s1 == null) {
      return { file: filepath, action: 'skip-strip-failed', note: 'could not locate end of v1 block' };
    }
    stripped = s1;
  }
  if (hadV2) {
    var s2 = stripMarkerBlock(stripped, V2_MARKER);
    if (s2 == null) {
      return { file: filepath, action: 'skip-strip-failed', note: 'could not locate end of v2 block' };
    }
    stripped = s2;
  }
  if (dryRun) {
    return { file: filepath, action: hadV2 ? 'would-strip-v2' : 'would-strip-v1' };
  }
  var tmp = filepath + '.tmp';
  try {
    fs.writeFileSync(tmp, stripped, 'utf8');
    fs.renameSync(tmp, filepath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    return { file: filepath, action: 'write-error', note: e.message };
  }
  return { file: filepath, action: hadV2 ? 'stripped-v2' : 'stripped-v1' };
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
    console.error('USAGE: node scripts/publish-cli/inject-clamp.js <directory> [--dry-run]');
    console.error('  (current behavior: STRIPS clamp+attribution markers from deck.html files)');
    process.exit(2);
  }
  rootDir = path.resolve(rootDir);
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + rootDir);
    process.exit(2);
  }

  console.log('inject-clamp.js (STRIP MODE) — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  root: ' + rootDir);
  console.log('');

  var deckHtmlPaths = [];
  walkDecksDir(rootDir, deckHtmlPaths);
  console.log('Found ' + deckHtmlPaths.length + ' deck.html files');
  console.log('');

  var counts = {};
  var notes = [];
  deckHtmlPaths.forEach(function (p, idx) {
    var r = processFile(p, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    if (r.action === 'write-error' || r.action === 'skip-read-error' || r.action === 'skip-strip-failed') {
      notes.push('  ' + r.action + '  ' + p + (r.note ? '  // ' + r.note : ''));
    }
    if ((idx + 1) % 200 === 0) console.log('  processed ' + (idx + 1) + '/' + deckHtmlPaths.length);
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) {
    if (counts[k] > 0) console.log('  ' + k + ':  ' + counts[k]);
  });
  if (notes.length > 0) {
    console.log('');
    console.log('=== Errors / unusual cases ===');
    notes.forEach(function (n) { console.log(n); });
  }
  process.exit((counts['write-error'] || 0) > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { processFile: processFile, V1_MARKER: V1_MARKER, V2_MARKER: V2_MARKER };
