#!/usr/bin/env node
/**
 * One-shot manifest-theme rewriter for catalog-export ZIPs whose
 * authoring-tool emit-defect produced manifest.theme decoupled from
 * actual content.
 *
 * Salvage path commissioned to handle the 153-ZIP en code-addition wave
 * generated 2026-05-05 against code-addition app v6.0.0. The app's
 * emit-site copied settings.theme_select into manifest.theme regardless
 * of the actual image-pool drawn (recon report 9850df93). This script
 * reads the correct theme from exercises[0].image.theme (primary) or
 * the path-derived directory (secondary) and rewrites manifest.theme
 * in-place. Operator's existing generation hours preserved; no
 * regeneration required.
 *
 * Authoring-side root-cause fix is a separate commission (Step 2 of the
 * post-recon path) and lives in REFERENCE APPS/code-addition.html.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-manifest-theme.js <directory> [--dry-run]
 *
 * --dry-run  performs all reads + classification; emits per-ZIP diff
 *            table; touches NO filesystem state (no backup created, no
 *            in-place edits). Exit 0 if all classified cleanly; 1 if
 *            any halt-class surfaced.
 *
 * Apply mode:
 *   1. Classify every ZIP first (full pre-pass, no FS writes).
 *   2. Halt on any halt-class before backup creation. No half-applied state.
 *   3. Create sibling <directory>.original/ backup dir; copy all ZIPs.
 *   4. For each ZIP needing rewrite: mutate manifest.theme; repack via
 *      adm-zip in-memory; write to <zip>.tmp; atomic renameSync to <zip>.
 *   5. Already-CLEAN ZIPs (manifest.theme === extracted theme) are
 *      untouched and counted as "skipped-clean" in the summary.
 *
 * Reuses slug.parseThemeFromImagePath from slug.js — same logic the
 * §A.13 reconciliation gate at 580b0ca26 uses, ensuring the rewrite
 * produces values that pass the gate downstream.
 *
 * Halt-classes:
 *   A — unparseable: exercises[0] is missing or has no image-bearing object
 *   B — ambiguous:  both signals null (no image.theme AND CUID-shaped
 *                   or missing path)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));
var slug = require('./slug');

// -------------------------------------------------------------------------
// Per-ZIP classification — pure function; no FS writes
// -------------------------------------------------------------------------

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,        // 'rewrite' | 'skip-clean' | 'halt-unparseable' | 'halt-ambiguous'
    oldTheme: null,
    newTheme: null,
    note: null
  };

  var zip;
  try {
    zip = new AdmZip(zipPath);
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'failed to open ZIP: ' + e.message;
    return result;
  }

  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    result.action = 'halt-unparseable';
    result.note = 'ZIP missing manifest.json';
    return result;
  }

  var manifest;
  try {
    manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'manifest.json parse error: ' + e.message;
    return result;
  }

  result.oldTheme = manifest.theme == null ? null : String(manifest.theme);

  // Pluck the first image-bearing object; mirrors slug.reconcileManifestTheme
  // dispatch so this script and the gate agree on the "primary" signal.
  var firstImg = null;
  if (manifest.exercises && manifest.exercises.length > 0) {
    var e0 = manifest.exercises[0];
    if (Array.isArray(e0)) {
      firstImg = e0[0] || null;
    } else if (e0 && typeof e0 === 'object') {
      if (e0.image) firstImg = e0.image;
      else if (e0.path || e0.theme) firstImg = e0;
    }
  }

  if (!firstImg || (!firstImg.theme && !firstImg.path)) {
    result.action = 'halt-unparseable';
    result.note = 'exercises[0] has no image-bearing object (theme + path both missing)';
    return result;
  }

  // Primary signal: image.theme (per-image semantic theme). Secondary:
  // path-derived directory. Mirrors the §A.13 gate's reconcileManifestTheme.
  var primary = (firstImg.theme && String(firstImg.theme).length > 0)
    ? String(firstImg.theme) : null;
  var secondary = firstImg.path ? slug.parseThemeFromImagePath(firstImg.path) : null;
  var corrected = primary || secondary;

  if (corrected == null) {
    // Both signals failed — image.theme missing AND path is CUID-shaped or
    // malformed. The deck is legitimately themeless (Track A baseline
    // pattern) per §17.8.5; rewriting would force a theme that isn't
    // reflected in content. Halt; let operator decide.
    result.action = 'halt-ambiguous';
    result.note = 'no recoverable theme: image.theme missing AND path is CUID-shaped or malformed (path=' + JSON.stringify(firstImg.path) + ')';
    return result;
  }

  result.newTheme = corrected;

  if (result.oldTheme === corrected) {
    result.action = 'skip-clean';
    return result;
  }

  result.action = 'rewrite';
  return result;
}

// -------------------------------------------------------------------------
// In-place rewrite of one ZIP
// -------------------------------------------------------------------------

function rewriteZip(zipPath, newTheme) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    throw new Error('rewriteZip: manifest.json missing inside ' + zipPath +
      ' (classification would have caught this; reaching here means concurrent modification)');
  }

  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  manifest.theme = newTheme;

  // adm-zip's updateFile preserves entry metadata (mode, mtime); fallback
  // to deleteFile + addFile if updateFile is unavailable in this version.
  var newBuf = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  if (typeof zip.updateFile === 'function') {
    zip.updateFile(manifestEntry, newBuf);
  } else {
    zip.deleteFile('manifest.json');
    zip.addFile('manifest.json', newBuf);
  }

  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);
}

// -------------------------------------------------------------------------
// Backup discipline — copy originals to <dir>.original/ before any rewrite
// -------------------------------------------------------------------------

function backupDirFor(workingDir) {
  // Sibling dir: working "decks/english/code addition" → backup "decks/english/code addition.original"
  var parent = path.dirname(workingDir);
  var name = path.basename(workingDir);
  return path.join(parent, name + '.original');
}

function ensureBackup(workingDir, zipFilenames) {
  var backupDir = backupDirFor(workingDir);
  if (fs.existsSync(backupDir)) {
    throw new Error(
      'Backup directory already exists at ' + backupDir + '. ' +
      'A prior run may have left it in place; refusing to overwrite a known-good backup. ' +
      'Manual cleanup required: rm -rf "' + backupDir + '"'
    );
  }
  fs.mkdirSync(backupDir, { recursive: true });
  zipFilenames.forEach(function (f) {
    var from = path.join(workingDir, f);
    var to = path.join(backupDir, f);
    fs.copyFileSync(from, to);
  });
  return backupDir;
}

// -------------------------------------------------------------------------
// Reporting helpers
// -------------------------------------------------------------------------

function pad(s, n) {
  s = String(s);
  if (s.length >= n) return s;
  return s + ' '.repeat(n - s.length);
}

function printDiffTable(classifications, opts) {
  var maxFile = 0, maxOld = 0, maxNew = 0;
  classifications.forEach(function (c) {
    if (c.file.length > maxFile) maxFile = c.file.length;
    var o = c.oldTheme == null ? '(none)' : c.oldTheme;
    var n = c.newTheme == null ? '(none)' : c.newTheme;
    if (o.length > maxOld) maxOld = o.length;
    if (n.length > maxNew) maxNew = n.length;
  });
  var headerFile = pad('filename', maxFile);
  var headerOld = pad('old_theme', maxOld);
  var headerNew = pad('new_theme', maxNew);
  console.log('  ' + headerFile + '  ' + headerOld + '  ' + headerNew + '  action');
  console.log('  ' + '-'.repeat(maxFile) + '  ' + '-'.repeat(maxOld) + '  ' + '-'.repeat(maxNew) + '  ' + '-'.repeat(20));
  classifications.forEach(function (c) {
    if (opts && opts.filter && !opts.filter(c)) return;
    var o = c.oldTheme == null ? '(none)' : c.oldTheme;
    var n = c.newTheme == null ? '(none)' : c.newTheme;
    console.log('  ' + pad(c.file, maxFile) + '  ' + pad(o, maxOld) + '  ' + pad(n, maxNew) + '  ' + c.action +
      (c.note ? '  // ' + c.note : ''));
  });
}

function printSummary(classifications, mode) {
  var counts = { rewrite: 0, 'skip-clean': 0, 'halt-unparseable': 0, 'halt-ambiguous': 0 };
  classifications.forEach(function (c) { counts[c.action]++; });
  var themeDist = {};
  classifications.forEach(function (c) {
    if (c.action === 'rewrite' || c.action === 'skip-clean') {
      var t = c.newTheme || c.oldTheme || '(unknown)';
      themeDist[t] = (themeDist[t] || 0) + 1;
    }
  });

  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs:        ' + classifications.length);
  console.log('  rewrite:           ' + counts.rewrite);
  console.log('  skip-clean:        ' + counts['skip-clean']);
  console.log('  halt-unparseable:  ' + counts['halt-unparseable']);
  console.log('  halt-ambiguous:    ' + counts['halt-ambiguous']);
  console.log('');
  console.log('=== Corrected-theme distribution (' + Object.keys(themeDist).length + ' unique) ===');
  var entries = Object.entries(themeDist).sort(function (a, b) { return b[1] - a[1]; });
  entries.forEach(function (e) {
    console.log('  ' + String(e[1]).padStart(4) + '  ' + e[0]);
  });
  return counts;
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var workingDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].startsWith('--')) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (workingDir == null) { workingDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-manifest-theme.js <directory> [--dry-run]');
    process.exit(2);
  }
  workingDir = path.resolve(workingDir);
  if (!fs.existsSync(workingDir) || !fs.statSync(workingDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + workingDir);
    process.exit(2);
  }

  var zipFilenames = fs.readdirSync(workingDir)
    .filter(function (f) { return f.toLowerCase().endsWith('.zip'); })
    .sort();
  if (zipFilenames.length === 0) {
    console.error('ERROR: no .zip files in ' + workingDir);
    process.exit(2);
  }

  console.log('rewrite-manifest-theme.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  working dir: ' + workingDir);
  console.log('  zip count:   ' + zipFilenames.length);
  if (!dryRun) {
    console.log('  backup dir:  ' + backupDirFor(workingDir));
  }
  console.log('');

  // Pre-pass: classify every ZIP (read-only).
  console.log('Classifying ' + zipFilenames.length + ' ZIPs...');
  var classifications = zipFilenames.map(function (f) {
    return classifyZip(path.join(workingDir, f));
  });

  // Halt-class detection.
  var halts = classifications.filter(function (c) {
    return c.action === 'halt-unparseable' || c.action === 'halt-ambiguous';
  });

  // Print rewrite table (always); halt table (when halts present); summary.
  console.log('');
  console.log('=== Per-ZIP classification ===');
  printDiffTable(classifications);

  var counts = printSummary(classifications, dryRun ? 'DRY-RUN' : 'APPLY');

  if (halts.length > 0) {
    console.log('');
    console.log('HALT — ' + halts.length + ' ZIP(s) failed classification. No rewrite performed.');
    console.log('Surface offending ZIPs to operator; investigate before proceeding.');
    process.exit(1);
  }

  if (dryRun) {
    console.log('');
    console.log('DRY-RUN clean. No filesystem changes. Re-run without --dry-run to apply.');
    process.exit(0);
  }

  // Apply path: backup then rewrite.
  if (counts.rewrite === 0) {
    console.log('');
    console.log('No ZIPs need rewriting (all already-clean). Skipping backup + rewrite.');
    process.exit(0);
  }

  console.log('');
  console.log('Creating backup at ' + backupDirFor(workingDir) + '...');
  var backupDir = ensureBackup(workingDir, zipFilenames);
  console.log('  Backed up ' + zipFilenames.length + ' ZIPs.');

  console.log('');
  console.log('Rewriting ' + counts.rewrite + ' ZIPs...');
  var rewrittenCount = 0;
  classifications.forEach(function (c) {
    if (c.action !== 'rewrite') return;
    var zipPath = path.join(workingDir, c.file);
    rewriteZip(zipPath, c.newTheme);
    rewrittenCount++;
    if (rewrittenCount % 25 === 0 || rewrittenCount === counts.rewrite) {
      console.log('  ' + rewrittenCount + '/' + counts.rewrite + ' rewritten');
    }
  });

  console.log('');
  console.log('=== APPLY complete ===');
  console.log('  rewritten:     ' + rewrittenCount);
  console.log('  skipped-clean: ' + counts['skip-clean']);
  console.log('  backup at:     ' + backupDir);
  console.log('');
  console.log('Next: run reconciliation gate against ' + workingDir + ' to verify ' +
    classifications.length + '/' + classifications.length + ' CLEAN.');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyZip: classifyZip,
  rewriteZip: rewriteZip,
  backupDirFor: backupDirFor,
  ensureBackup: ensureBackup
};
