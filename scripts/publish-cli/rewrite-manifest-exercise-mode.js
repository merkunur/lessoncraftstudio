#!/usr/bin/env node
/**
 * One-shot manifest.exercise_mode rewriter for code-addition ZIPs whose
 * authoring-tool emit-defect produced manifest.exercise_mode = null
 * regardless of the actual mode the operator was authoring.
 *
 * Salvage path commissioned alongside the parallel manifest.theme
 * rewrite at 9051b43d. The code-addition app v6.0.0 emit-site populates
 * manifest.exercise_mode unconditionally as null; content carries the
 * mode-distinguishing signal in settings.word_reveal_mode (true =
 * secret-word-finding mode; false = standard code-addition).
 *
 * Operator-confirmed 2-mode split (recon at HEAD ~05d0940e):
 *   word_reveal_mode === true  → exercise_mode = "secret-word"
 *   word_reveal_mode === false → exercise_mode = null  (standard;
 *     the symbol_count=4 vs 5 distinction is gameplay-tuning, not
 *     mode-distinguishing per operator's adjudication)
 *
 * Authoring-side root-cause fix is a separate commission (Step 2-
 * equivalent for exercise_mode at REFERENCE APPS/code-addition.html
 * extractDeckBundle line ~5284-5292).
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-manifest-exercise-mode.js <directory> [--dry-run]
 *
 * --dry-run  performs all reads + classification; emits per-ZIP diff
 *            table; touches NO filesystem state. Exit 0 if all
 *            classified cleanly; 1 if any halt-class surfaced.
 *
 * Apply mode:
 *   1. Classify every ZIP first (full pre-pass, no FS writes).
 *   2. Halt on any halt-class before backup creation. No half-applied state.
 *   3. Create dot-prefix backup subdir <workingDir>/.pre-mode-rewrite-<utc>/;
 *      copy all ZIPs.
 *   4. For each ZIP needing rewrite: mutate manifest.exercise_mode;
 *      repack via adm-zip in-memory; write to <zip>.tmp; atomic
 *      renameSync to <zip>.
 *   5. Already-CLEAN ZIPs (manifest.exercise_mode === derived) are
 *      untouched and counted as "skipped-clean" in the summary.
 *
 * Mirrors scripts/publish-cli/rewrite-manifest-theme.js shape from
 * 9051b43d. Differences:
 *   - Backup convention: dot-prefix subdir within workingDir (matches
 *     §15.15 archive convention), not sibling-dir suffix.
 *   - Halt-class B is "settings.word_reveal_mode missing" (not
 *     "ambiguous" theme); no CUID branch.
 *
 * Halt-classes:
 *   A — unparseable: ZIP can't be opened OR manifest.json missing/malformed
 *   B — missing-signal: settings.word_reveal_mode field absent (defensive;
 *       not expected per recon — every code-addition manifest carries
 *       the field per emit-site contract)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

// -------------------------------------------------------------------------
// Per-ZIP classification — pure function; no FS writes
// -------------------------------------------------------------------------

function deriveExerciseMode(settings) {
  // Locked 2-mode contract per operator adjudication post-recon.
  // settings.word_reveal_mode is the canonical content signal.
  if (settings && settings.word_reveal_mode === true) return 'secret-word';
  return null;
}

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,        // 'rewrite' | 'skip-clean' | 'halt-unparseable' | 'halt-missing-signal'
    oldMode: null,
    newMode: null,
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

  // Defensive: settings.word_reveal_mode must be present (true OR false).
  // null/undefined/missing triggers halt — we can't derive without the signal.
  if (!manifest.settings || typeof manifest.settings.word_reveal_mode === 'undefined') {
    result.action = 'halt-missing-signal';
    result.note = 'settings.word_reveal_mode is missing — cannot derive exercise_mode';
    return result;
  }

  result.oldMode = manifest.exercise_mode == null ? null : String(manifest.exercise_mode);
  result.newMode = deriveExerciseMode(manifest.settings);

  // Skip-clean check: existing matches derived (handles null === null and
  // string-equality cases). Use loose-null comparison: existing null +
  // derived null → skip; existing 'secret-word' + derived 'secret-word' → skip.
  var oldNorm = result.oldMode == null ? null : result.oldMode;
  var newNorm = result.newMode == null ? null : result.newMode;
  if (oldNorm === newNorm) {
    result.action = 'skip-clean';
    return result;
  }

  result.action = 'rewrite';
  return result;
}

// -------------------------------------------------------------------------
// In-place rewrite of one ZIP
// -------------------------------------------------------------------------

function rewriteZip(zipPath, newMode) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    throw new Error('rewriteZip: manifest.json missing inside ' + zipPath);
  }

  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  // newMode may be null (for standard mode) or a string (for "secret-word").
  // JSON.stringify({a: null}) preserves the null literal correctly.
  manifest.exercise_mode = newMode;

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
// Backup discipline — dot-prefix subdir within workingDir per §15.15 convention
// -------------------------------------------------------------------------

function utcDateStamp() {
  var d = new Date();
  function p(n) { return n < 10 ? '0' + n : '' + n; }
  return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate());
}

function backupDirFor(workingDir) {
  // Dot-prefix subdir within workingDir; date-stamped for traceability.
  // Matches §15.15 archive convention for publish-inbound subdirs.
  return path.join(workingDir, '.pre-mode-rewrite-' + utcDateStamp());
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

function fmtMode(m) {
  return m == null ? '(null)' : m;
}

function printDiffTable(classifications) {
  var maxFile = 0, maxOld = 0, maxNew = 0;
  classifications.forEach(function (c) {
    if (c.file.length > maxFile) maxFile = c.file.length;
    var o = fmtMode(c.oldMode);
    var n = fmtMode(c.newMode);
    if (o.length > maxOld) maxOld = o.length;
    if (n.length > maxNew) maxNew = n.length;
  });
  console.log('  ' + pad('filename', maxFile) + '  ' + pad('old_mode', maxOld) + '  ' + pad('new_mode', maxNew) + '  action');
  console.log('  ' + '-'.repeat(maxFile) + '  ' + '-'.repeat(maxOld) + '  ' + '-'.repeat(maxNew) + '  ' + '-'.repeat(20));
  classifications.forEach(function (c) {
    console.log('  ' + pad(c.file, maxFile) + '  ' + pad(fmtMode(c.oldMode), maxOld) + '  ' + pad(fmtMode(c.newMode), maxNew) + '  ' + c.action +
      (c.note ? '  // ' + c.note : ''));
  });
}

function printSummary(classifications, mode) {
  var counts = { rewrite: 0, 'skip-clean': 0, 'halt-unparseable': 0, 'halt-missing-signal': 0 };
  classifications.forEach(function (c) { counts[c.action]++; });
  var modeDist = {};
  classifications.forEach(function (c) {
    if (c.action === 'rewrite' || c.action === 'skip-clean') {
      var key = fmtMode(c.newMode);
      modeDist[key] = (modeDist[key] || 0) + 1;
    }
  });

  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs:           ' + classifications.length);
  console.log('  rewrite:              ' + counts.rewrite);
  console.log('  skip-clean:           ' + counts['skip-clean']);
  console.log('  halt-unparseable:     ' + counts['halt-unparseable']);
  console.log('  halt-missing-signal:  ' + counts['halt-missing-signal']);
  console.log('');
  console.log('=== Corrected exercise_mode distribution ===');
  Object.entries(modeDist).sort(function (a, b) { return b[1] - a[1]; }).forEach(function (e) {
    console.log('  ' + String(e[1]).padStart(4) + '  exercise_mode=' + e[0]);
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
    console.error('USAGE: node scripts/publish-cli/rewrite-manifest-exercise-mode.js <directory> [--dry-run]');
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

  console.log('rewrite-manifest-exercise-mode.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
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

  var halts = classifications.filter(function (c) {
    return c.action === 'halt-unparseable' || c.action === 'halt-missing-signal';
  });

  // Print only halt rows + small sample of non-halt to keep output bounded
  // for 153-deck batches. Show first 5 of each non-halt action class so
  // operator can spot-check shape.
  console.log('');
  console.log('=== Per-ZIP classification (halts in full; first 5 of each non-halt action) ===');
  if (halts.length > 0) {
    console.log('--- halts ---');
    printDiffTable(halts);
    console.log('');
  }
  ['rewrite', 'skip-clean'].forEach(function (act) {
    var sample = classifications.filter(function (c) { return c.action === act; }).slice(0, 5);
    if (sample.length > 0) {
      console.log('--- ' + act + ' (first ' + sample.length + ') ---');
      printDiffTable(sample);
      console.log('');
    }
  });

  var counts = printSummary(classifications, dryRun ? 'DRY-RUN' : 'APPLY');

  if (halts.length > 0) {
    console.log('');
    console.log('HALT — ' + halts.length + ' ZIP(s) failed classification. No rewrite performed.');
    process.exit(1);
  }

  if (dryRun) {
    console.log('');
    console.log('DRY-RUN clean. No filesystem changes. Re-run without --dry-run to apply.');
    process.exit(0);
  }

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
    rewriteZip(zipPath, c.newMode);
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
  console.log('Next: re-run publish-cli dry-run against ' + workingDir + ' to verify reconciliation gate behavior.');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyZip: classifyZip,
  deriveExerciseMode: deriveExerciseMode,
  rewriteZip: rewriteZip,
  backupDirFor: backupDirFor,
  ensureBackup: ensureBackup
};
