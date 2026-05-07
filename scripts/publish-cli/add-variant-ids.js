#!/usr/bin/env node
/**
 * One-shot manifest-variant_id assigner for catalog-export ZIPs whose
 * (exercise_type, exercise_mode, theme) tuples collapse onto identical
 * slugs at publish-time, producing the §15.13 within-batch slug-collision
 * pattern at scale.
 *
 * Salvage path commissioned for the 345-en-wave (alphabet-train 38 +
 * math-worksheet 206 + prepositions 101). Promotes the §11 future-arc-
 * candidate "Manifest-disambiguator-field for fresh-roll-variation slug
 * shape" to active doctrine — the 345-wave is the 2nd recurrence of the
 * fresh-roll collision pattern at scale (vs. the 443-wave's 3-pair
 * instance), satisfying the §11 trigger.
 *
 * Pairs with the slug.js extension landed in the same commit (variant_id
 * branch in deriveSeedFromManifest). Backwards-compatible: manifests
 * without variant_id slug exactly as before; existing 731+ catalog rows
 * unaffected.
 *
 * Usage:
 *   node scripts/publish-cli/add-variant-ids.js <directory> [--dry-run]
 *
 * --dry-run  performs all reads + classification + group projection;
 *            prints per-tuple counts + per-ZIP variant_id assignments;
 *            touches NO filesystem state. Exit 0 if all classified
 *            cleanly; 1 if any halt-class surfaced.
 *
 * Apply mode:
 *   1. Classify every ZIP first (full pre-pass, no FS writes).
 *   2. Group by (generator.app, exercise_mode, theme) tuple.
 *   3. For groups with > 1 member: assign sequential ordinals `001`, `002`, ...
 *      Sort within each group by manifest.generated_at ASC (operator's
 *      authoring order) for stable, predictable URLs.
 *   4. For groups with exactly 1 member: skip (no disambiguator needed;
 *      shorter SEO-clean slug preserved).
 *   5. Halt on any halt-class before backup creation.
 *   6. Create sibling <directory>.original/ backup; copy untouched ZIPs.
 *   7. For each ZIP needing rewrite: mutate manifest.variant_id; repack
 *      via adm-zip in-memory; write to <zip>.tmp; atomic rename.
 *
 * Halt-classes:
 *   A — unparseable: ZIP missing manifest.json OR manifest.generated_at
 *                    field absent (needed for stable ordinal sort)
 *   B — stable_id_conflict: a manifest already has variant_id != the one
 *                    the script would assign (defensive — surfaces
 *                    operator-authored disambiguators on a re-run that
 *                    would override them)
 *
 * Slug shape projection (per §17.8.5 + this script):
 *   math-worksheet (themeless single-mode):
 *     before: math-worksheet (×206 collisions)
 *     after:  math-worksheet-001 ... math-worksheet-206
 *   prepositions (themeless, mode varies):
 *     before: prepositions-multiplechoice (×N), prepositions-fillin (×M)
 *     after:  prepositions-multiplechoice-001 ... -<N>; -fillin-001 ... -<M>
 *   alphabet-train (themed, varies-per-deck):
 *     before: alphabet-train-<theme> (likely 0 collisions)
 *     after:  unchanged (groups-of-1 skipped)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

// -------------------------------------------------------------------------
// Per-ZIP classification — pure function; no FS writes
// -------------------------------------------------------------------------

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,        // 'pending-group' | 'halt-unparseable'
    app: null,
    exerciseMode: null,
    theme: null,
    generatedAt: null,
    existingVariantId: null,
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

  // Pluck the canonical app name from generator.app (per §14.10
  // canonical-name-vs-emission contract); fallback to exercise_type.
  result.app = (manifest.generator && manifest.generator.app)
    ? String(manifest.generator.app)
    : (manifest.exercise_type ? String(manifest.exercise_type) : null);

  if (!result.app) {
    result.action = 'halt-unparseable';
    result.note = 'manifest missing generator.app and exercise_type';
    return result;
  }

  result.exerciseMode = (manifest.exercise_mode == null || manifest.exercise_mode === '')
    ? null : String(manifest.exercise_mode);
  result.theme = (manifest.theme == null || manifest.theme === '')
    ? null : String(manifest.theme);

  if (!manifest.generated_at) {
    result.action = 'halt-unparseable';
    result.note = 'manifest missing generated_at field (needed for stable ordinal sort)';
    return result;
  }
  result.generatedAt = String(manifest.generated_at);

  result.existingVariantId = (manifest.variant_id == null || manifest.variant_id === '')
    ? null : String(manifest.variant_id);

  result.action = 'pending-group';
  return result;
}

// -------------------------------------------------------------------------
// Group + assign — pure function; takes classifications, returns assignments
// -------------------------------------------------------------------------

function tupleKey(c) {
  return c.app + '|' + (c.exerciseMode || '') + '|' + (c.theme || '');
}

function pad3(n) {
  var s = String(n);
  return s.length >= 3 ? s : ('000' + s).slice(-3);
}

function assignVariantIds(classifications) {
  // Group by tuple. Map preserves insertion order; we sort each group by
  // generatedAt ASC for stable assignment.
  var groups = new Map();
  classifications.forEach(function (c) {
    if (c.action !== 'pending-group') return;
    var k = tupleKey(c);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(c);
  });

  var assignments = []; // { file, app, mode, theme, oldVariantId, newVariantId, action, note }
  var conflicts = [];

  groups.forEach(function (members, key) {
    if (members.length <= 1) {
      // Group of 1 → no disambiguator needed; skip.
      members.forEach(function (m) {
        assignments.push({
          file: m.file, app: m.app, mode: m.exerciseMode, theme: m.theme,
          oldVariantId: m.existingVariantId, newVariantId: null,
          action: 'skip-clean',
          note: 'singleton group (no collision)'
        });
      });
      return;
    }

    // Sort by generatedAt ASC (operator's authoring order). Stable.
    members.sort(function (a, b) {
      if (a.generatedAt < b.generatedAt) return -1;
      if (a.generatedAt > b.generatedAt) return 1;
      // Tie-breaker: filename ASC for full determinism.
      if (a.file < b.file) return -1;
      if (a.file > b.file) return 1;
      return 0;
    });

    members.forEach(function (m, idx) {
      var newId = pad3(idx + 1);
      var action;
      if (m.existingVariantId == null) {
        action = 'rewrite';
      } else if (m.existingVariantId === newId) {
        action = 'skip-clean';
      } else {
        // Existing variant_id disagrees with the assignment — surface
        // for operator decision (don't silently overwrite).
        action = 'halt-stable-id-conflict';
        conflicts.push({
          file: m.file,
          existing: m.existingVariantId,
          would_assign: newId
        });
      }
      assignments.push({
        file: m.file, app: m.app, mode: m.exerciseMode, theme: m.theme,
        oldVariantId: m.existingVariantId, newVariantId: newId,
        action: action,
        note: 'group "' + key + '" position ' + (idx + 1) + ' of ' + members.length
      });
    });
  });

  // Sort assignments by filename for stable display.
  assignments.sort(function (a, b) {
    if (a.file < b.file) return -1;
    if (a.file > b.file) return 1;
    return 0;
  });

  return { assignments: assignments, conflicts: conflicts, groupCount: groups.size };
}

// -------------------------------------------------------------------------
// In-place rewrite of one ZIP
// -------------------------------------------------------------------------

function rewriteZip(zipPath, newVariantId) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    throw new Error('rewriteZip: manifest.json missing inside ' + zipPath);
  }

  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  manifest.variant_id = newVariantId;

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
  return s.length >= n ? s : s + ' '.repeat(n - s.length);
}

function printGroupSummary(assignments, groupCount) {
  // Aggregate by tuple → count + members-needing-rewrite + members-skipped.
  var byTuple = new Map();
  assignments.forEach(function (a) {
    var k = a.app + ' | ' + (a.mode || '(null)') + ' | ' + (a.theme || '(null)');
    if (!byTuple.has(k)) {
      byTuple.set(k, { total: 0, rewrite: 0, skip: 0, halt: 0 });
    }
    var s = byTuple.get(k);
    s.total++;
    if (a.action === 'rewrite') s.rewrite++;
    else if (a.action === 'skip-clean') s.skip++;
    else s.halt++;
  });

  console.log('');
  console.log('=== Tuple-distribution (' + groupCount + ' unique tuples across ' + assignments.length + ' ZIPs) ===');
  var maxKey = 'tuple (app | mode | theme)'.length;
  byTuple.forEach(function (_, k) { if (k.length > maxKey) maxKey = k.length; });
  console.log('  ' + pad('tuple (app | mode | theme)', maxKey) + '  total  rewrite  skip  halt');
  console.log('  ' + '-'.repeat(maxKey) + '  -----  -------  ----  ----');
  // Sort tuples by total DESC for visibility
  var entries = Array.from(byTuple.entries()).sort(function (a, b) { return b[1].total - a[1].total; });
  entries.forEach(function (e) {
    var k = e[0], s = e[1];
    console.log('  ' + pad(k, maxKey) + '  ' + pad(s.total, 5) + '  ' + pad(s.rewrite, 7) + '  ' + pad(s.skip, 4) + '  ' + pad(s.halt, 4));
  });
}

function printPerZipTable(assignments) {
  console.log('');
  console.log('=== Per-ZIP variant_id assignment ===');
  var maxFile = 0, maxApp = 0;
  assignments.forEach(function (a) {
    if (a.file.length > maxFile) maxFile = a.file.length;
    if (a.app && a.app.length > maxApp) maxApp = a.app.length;
  });
  console.log('  ' + pad('filename', maxFile) + '  ' + pad('app', maxApp) + '  mode             theme            old → new      action');
  console.log('  ' + '-'.repeat(maxFile) + '  ' + '-'.repeat(maxApp) + '  ---------------  ---------------  -----------    ------');
  assignments.forEach(function (a) {
    var oldId = a.oldVariantId == null ? '-'   : a.oldVariantId;
    var newId = a.newVariantId == null ? '-'   : a.newVariantId;
    console.log('  ' + pad(a.file, maxFile) + '  ' +
      pad(a.app || '?', maxApp) + '  ' +
      pad(a.mode || '(null)', 15) + '  ' +
      pad(a.theme || '(null)', 15) + '  ' +
      pad(oldId + ' → ' + newId, 11) + '    ' +
      a.action +
      (a.note ? '  // ' + a.note : ''));
  });
}

function printSummary(assignments, conflicts, mode) {
  var counts = { rewrite: 0, 'skip-clean': 0, 'halt-stable-id-conflict': 0, 'halt-unparseable': 0 };
  assignments.forEach(function (a) { counts[a.action]++; });
  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs assigned:     ' + assignments.length);
  console.log('  rewrite (will receive):  ' + counts.rewrite);
  console.log('  skip-clean (no need):    ' + counts['skip-clean']);
  console.log('  halt-stable-id-conflict: ' + counts['halt-stable-id-conflict']);
  console.log('  halt-unparseable:        ' + counts['halt-unparseable']);
  if (conflicts.length > 0) {
    console.log('');
    console.log('=== stable_id_conflict details ===');
    conflicts.forEach(function (c) {
      console.log('  ' + c.file + '  existing=' + c.existing + '  would_assign=' + c.would_assign);
    });
  }
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
    console.error('USAGE: node scripts/publish-cli/add-variant-ids.js <directory> [--dry-run]');
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

  console.log('add-variant-ids.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
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

  // Halt-class detection at classification phase.
  var unparseableHalts = classifications.filter(function (c) {
    return c.action === 'halt-unparseable';
  });

  if (unparseableHalts.length > 0) {
    console.log('');
    console.log('=== halt-unparseable details ===');
    unparseableHalts.forEach(function (c) {
      console.log('  ' + c.file + '  // ' + c.note);
    });
    console.log('');
    console.log('HALT — ' + unparseableHalts.length + ' ZIP(s) failed classification. No assignment performed.');
    process.exit(1);
  }

  // Group + assign.
  var result = assignVariantIds(classifications);
  var assignments = result.assignments;
  var conflicts = result.conflicts;

  printGroupSummary(assignments, result.groupCount);

  // Verbose per-ZIP table only if small batch (<50) OR --verbose flag (not implemented; reserved).
  if (zipFilenames.length <= 50) {
    printPerZipTable(assignments);
  } else {
    console.log('');
    console.log('(per-ZIP table suppressed for batches >50; see _summary.txt for full detail post-publish)');
  }

  var counts = printSummary(assignments, conflicts, dryRun ? 'DRY-RUN' : 'APPLY');

  if (counts['halt-stable-id-conflict'] > 0) {
    console.log('');
    console.log('HALT — ' + counts['halt-stable-id-conflict'] + ' ZIP(s) have pre-existing variant_id values that disagree with the assignment.');
    console.log('Resolve manually: either delete the existing variant_id from each affected manifest OR accept the existing values.');
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
    console.log('No ZIPs need rewriting (all groups singleton OR existing variant_ids match). Skipping backup + rewrite.');
    process.exit(0);
  }

  console.log('');
  console.log('Creating backup at ' + backupDirFor(workingDir) + '...');
  var backupDir = ensureBackup(workingDir, zipFilenames);
  console.log('  Backed up ' + zipFilenames.length + ' ZIPs.');

  console.log('');
  console.log('Rewriting ' + counts.rewrite + ' ZIPs...');
  var rewrittenCount = 0;
  assignments.forEach(function (a) {
    if (a.action !== 'rewrite') return;
    var zipPath = path.join(workingDir, a.file);
    rewriteZip(zipPath, a.newVariantId);
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
  console.log('Next: stage these ZIPs into publish-cli\'s input folder and run publish-bulk --dry-run.');
  console.log('Slug shape will incorporate the variant_id segment per slug.js deriveSeedFromManifest extension.');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyZip: classifyZip,
  assignVariantIds: assignVariantIds,
  rewriteZip: rewriteZip,
  backupDirFor: backupDirFor,
  ensureBackup: ensureBackup,
  tupleKey: tupleKey,
  pad3: pad3
};
