#!/usr/bin/env node
/**
 * One-shot manifest-variant_id assigner for cryptogram-class waves where
 * the deck's identity is its operator-typed phrase (NOT a theme axis-key
 * NOR a sequential ordinal). Specialization of `add-variant-ids.js` that
 * writes phrase-derived slugs into `manifest.variant_id` instead of
 * sequential `001/002/003` ordinals.
 *
 * Why phrase-based for cryptogram specifically: cryptogram is a phrase-cipher
 * app where operator types the puzzle text. The phrase IS the deck's identity
 * in a way no other axis captures (no theme, no level beyond the default,
 * no mode variation). Ordinal slugs (`cryptogram-001`) work for collision
 * resolution but lose the SEO signal teachers search by ("cryptogram puzzle
 * <topic>"). Phrase-derived slugs (`cryptogram-the-cat-naps-on-my-warm-pillow`)
 * carry the search keyword inline.
 *
 * Slug-shape projection (per §17.8.5 + slug.js variant_id branch):
 *   cryptogram (themeless single-mode):
 *     before salvage: `cryptogram` (×N collisions)
 *     after salvage:  `cryptogram-<slugged-first-phrase>`
 *
 * Per-deck pipeline (mirrors add-variant-ids.js shape):
 *   1. Read manifest.json
 *   2. Extract first non-empty entry from `vocabulary[]` array
 *   3. Slugify: lowercase, ASCII-fold (NFD + combining-mark strip), strip
 *      punctuation, hyphenate spaces; truncate at MAX_SLUG_CHARS on word
 *      boundary
 *   4. Defensive: if slug yields empty string OR is < MIN_SLUG_CHARS, fall
 *      back to a sequential ordinal `001/002/...` per group
 *   5. Within-group collision detection: two decks with same first phrase
 *      slug collide → halt with diagnostic (operator decides)
 *   6. Atomic ZIP rewrite (mirrors add-variant-ids.js) — writes
 *      manifest.variant_id; backup at <dir>.original/
 *
 * Halt-classes:
 *   A — unparseable: ZIP missing manifest.json OR first vocabulary entry
 *                    OR manifest.generated_at field absent
 *   B — slug-collision: two ZIPs derive identical phrase slugs
 *   C — stable_id_conflict: existing variant_id != the one we'd assign
 *
 * Usage:
 *   node scripts/publish-cli/cryptogram-phrase-slug.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

var MAX_SLUG_CHARS = 50;
var MIN_SLUG_CHARS = 4;

// -------------------------------------------------------------------------
// Phrase → slug
// -------------------------------------------------------------------------

/**
 * Slugify a phrase for variant_id use. Mirrors slug.js's slugify but operates
 * on the variant_id input (not the full slug seed) and adds word-boundary
 * truncation at MAX_SLUG_CHARS.
 */
function slugifyPhrase(s) {
  if (!s || typeof s !== 'string') return '';
  // 1. lowercase
  var x = s.toLowerCase();
  // 2. NFD normalize + strip combining diacritical marks
  x = x.normalize('NFD').replace(/[̀-ͯ]/g, '');
  // 3. explicit map for non-decomposable equivalents (mirrors slug.js)
  x = x.replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').replace(/ł/g, 'l');
  // 4. replace non-[a-z0-9-] runs with hyphen
  x = x.replace(/[^a-z0-9-]+/g, '-');
  // 5. collapse runs of hyphens
  x = x.replace(/-+/g, '-');
  // 6. strip leading/trailing hyphens
  x = x.replace(/^-+|-+$/g, '');

  if (x.length <= MAX_SLUG_CHARS) return x;

  // Truncate at word boundary if possible
  var truncated = x.slice(0, MAX_SLUG_CHARS);
  var lastHyphen = truncated.lastIndexOf('-');
  if (lastHyphen >= MIN_SLUG_CHARS) {
    truncated = truncated.slice(0, lastHyphen);
  }
  return truncated;
}

function deriveVariantIdFromManifest(manifest) {
  // Cryptogram authors typically split a phrase across multiple lines for
  // visual layout (e.g., "I love \nhot pancakes \nwith syrup."). The
  // vocabulary[] array stores each line as a separate entry. Joining all
  // non-empty lines reconstructs the full phrase so distinguishing words
  // make it into the slug — without this, all phrases starting with
  // "I love" collapse to the same slug.
  var vocab = manifest && manifest.vocabulary;
  if (!Array.isArray(vocab) || vocab.length === 0) return '';
  var phrases = vocab.filter(function (v) { return typeof v === 'string' && v.trim() !== ''; });
  if (phrases.length === 0) return '';
  return slugifyPhrase(phrases.join(' '));
}

// -------------------------------------------------------------------------
// Per-ZIP classification — pure function; no FS writes
// -------------------------------------------------------------------------

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,
    app: null,
    exerciseMode: null,
    theme: null,
    generatedAt: null,
    existingVariantId: null,
    derivedVariantId: null,
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

  result.app = (manifest.generator && manifest.generator.app)
    ? String(manifest.generator.app)
    : (manifest.exercise_type ? String(manifest.exercise_type) : null);
  result.exerciseMode = (manifest.exercise_mode == null || manifest.exercise_mode === '')
    ? null : String(manifest.exercise_mode);
  result.theme = (manifest.theme == null || manifest.theme === '')
    ? null : String(manifest.theme);

  if (!manifest.generated_at) {
    result.action = 'halt-unparseable';
    result.note = 'manifest missing generated_at field (needed for fallback ordinal sort)';
    return result;
  }
  result.generatedAt = String(manifest.generated_at);

  result.existingVariantId = (manifest.variant_id == null || manifest.variant_id === '')
    ? null : String(manifest.variant_id);

  var derived = deriveVariantIdFromManifest(manifest);
  if (!derived || derived.length < MIN_SLUG_CHARS) {
    result.action = 'halt-unparseable';
    result.note = 'first vocabulary entry produced empty/too-short slug; phrase=' + JSON.stringify(manifest.vocabulary && manifest.vocabulary[0]);
    return result;
  }
  result.derivedVariantId = derived;

  result.action = 'pending-collision-check';
  return result;
}

// -------------------------------------------------------------------------
// Within-wave collision detection + assignment
// -------------------------------------------------------------------------

function tupleKey(c) {
  return c.app + '|' + (c.exerciseMode || '') + '|' + (c.theme || '') + '|' + c.derivedVariantId;
}

function assignVariantIds(classifications) {
  var assignments = [];
  var conflicts = [];
  var slugCollisions = [];

  // Group by full tuple (app, mode, theme, derivedVariantId)
  var slugGroups = new Map();
  classifications.forEach(function (c) {
    if (c.action !== 'pending-collision-check') return;
    var k = tupleKey(c);
    if (!slugGroups.has(k)) slugGroups.set(k, []);
    slugGroups.get(k).push(c);
  });

  // Detect within-wave slug collisions: two ZIPs with identical derived slug
  slugGroups.forEach(function (members, key) {
    if (members.length > 1) {
      slugCollisions.push({ key: key, files: members.map(function (m) { return m.file; }) });
    }
  });

  // Sort all classifications by generatedAt for stable display
  var sorted = classifications.filter(function (c) { return c.action === 'pending-collision-check'; })
    .slice()
    .sort(function (a, b) {
      if (a.generatedAt < b.generatedAt) return -1;
      if (a.generatedAt > b.generatedAt) return 1;
      return 0;
    });

  sorted.forEach(function (c) {
    var newId = c.derivedVariantId;
    var action;
    if (c.existingVariantId == null) {
      action = 'rewrite';
    } else if (c.existingVariantId === newId) {
      action = 'skip-clean';
    } else {
      action = 'halt-stable-id-conflict';
      conflicts.push({
        file: c.file,
        existing: c.existingVariantId,
        would_assign: newId
      });
    }
    assignments.push({
      file: c.file,
      app: c.app,
      mode: c.exerciseMode,
      theme: c.theme,
      oldVariantId: c.existingVariantId,
      newVariantId: newId,
      action: action,
      note: 'phrase-derived'
    });
  });

  // Sort assignments by filename
  assignments.sort(function (a, b) {
    if (a.file < b.file) return -1;
    if (a.file > b.file) return 1;
    return 0;
  });

  return { assignments: assignments, conflicts: conflicts, slugCollisions: slugCollisions };
}

// -------------------------------------------------------------------------
// In-place rewrite (mirrors add-variant-ids.js)
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
// Backup (mirrors add-variant-ids.js)
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
      'Manual cleanup required: rm -rf "' + backupDir + '"'
    );
  }
  fs.mkdirSync(backupDir, { recursive: true });
  zipFilenames.forEach(function (f) {
    fs.copyFileSync(path.join(workingDir, f), path.join(backupDir, f));
  });
  return backupDir;
}

// -------------------------------------------------------------------------
// Reporting
// -------------------------------------------------------------------------

function pad(s, n) { s = String(s); return s.length >= n ? s : s + ' '.repeat(n - s.length); }

function printSlugCollisions(slugCollisions) {
  if (slugCollisions.length === 0) return;
  console.log('');
  console.log('=== Within-wave slug collisions (phrase-derived slug duplicates) ===');
  slugCollisions.forEach(function (c) {
    console.log('  slug: "' + c.key + '" — ' + c.files.length + ' ZIPs:');
    c.files.forEach(function (f) { console.log('    ' + f); });
  });
}

function printPerZipTable(assignments) {
  console.log('');
  console.log('=== Per-ZIP variant_id assignment ===');
  var maxFile = 0;
  assignments.forEach(function (a) { if (a.file.length > maxFile) maxFile = a.file.length; });
  console.log('  ' + pad('filename', maxFile) + '  variant_id (= phrase slug)');
  console.log('  ' + '-'.repeat(maxFile) + '  ' + '-'.repeat(40));
  assignments.forEach(function (a) {
    console.log('  ' + pad(a.file, maxFile) + '  ' + (a.newVariantId || '-') + '  // ' + a.action);
  });
}

function printSummary(assignments, conflicts, slugCollisions, mode) {
  var counts = { rewrite: 0, 'skip-clean': 0, 'halt-stable-id-conflict': 0 };
  assignments.forEach(function (a) { counts[a.action] = (counts[a.action] || 0) + 1; });
  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs:              ' + assignments.length);
  console.log('  rewrite (will receive):  ' + (counts.rewrite || 0));
  console.log('  skip-clean (no need):    ' + (counts['skip-clean'] || 0));
  console.log('  halt-stable-id-conflict: ' + (counts['halt-stable-id-conflict'] || 0));
  console.log('  slug-collision groups:   ' + slugCollisions.length);
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
    console.error('USAGE: node scripts/publish-cli/cryptogram-phrase-slug.js <directory> [--dry-run]');
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

  console.log('cryptogram-phrase-slug.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  working dir: ' + workingDir);
  console.log('  zip count:   ' + zipFilenames.length);
  if (!dryRun) {
    console.log('  backup dir:  ' + backupDirFor(workingDir));
  }
  console.log('');

  console.log('Classifying ' + zipFilenames.length + ' ZIPs...');
  var classifications = zipFilenames.map(function (f) {
    return classifyZip(path.join(workingDir, f));
  });

  var unparseableHalts = classifications.filter(function (c) { return c.action === 'halt-unparseable'; });
  if (unparseableHalts.length > 0) {
    console.log('');
    console.log('=== halt-unparseable details ===');
    unparseableHalts.forEach(function (c) { console.log('  ' + c.file + '  // ' + c.note); });
    console.log('');
    console.log('HALT — ' + unparseableHalts.length + ' ZIP(s) failed classification.');
    process.exit(1);
  }

  var result = assignVariantIds(classifications);
  var assignments = result.assignments;
  var conflicts = result.conflicts;
  var slugCollisions = result.slugCollisions;

  printSlugCollisions(slugCollisions);

  if (zipFilenames.length <= 120) {
    printPerZipTable(assignments);
  }

  var counts = printSummary(assignments, conflicts, slugCollisions, dryRun ? 'DRY-RUN' : 'APPLY');

  if (slugCollisions.length > 0) {
    console.log('');
    console.log('HALT — phrase-derived slug collisions detected. Resolve manually:');
    console.log('  - Author distinct opening phrases on the colliding ZIPs, OR');
    console.log('  - Drop one ZIP per collision group, OR');
    console.log('  - Fall back to add-variant-ids.js (sequential ordinals)');
    process.exit(1);
  }

  if (counts['halt-stable-id-conflict'] > 0) {
    console.log('');
    console.log('HALT — ' + counts['halt-stable-id-conflict'] + ' ZIP(s) have pre-existing variant_id values that disagree.');
    conflicts.forEach(function (c) {
      console.log('  ' + c.file + '  existing=' + c.existing + '  would_assign=' + c.would_assign);
    });
    process.exit(1);
  }

  if (dryRun) {
    console.log('');
    console.log('DRY-RUN clean. No filesystem changes. Re-run without --dry-run to apply.');
    process.exit(0);
  }

  if (counts.rewrite === 0) {
    console.log('');
    console.log('No ZIPs need rewriting. Skipping backup + rewrite.');
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
    rewriteZip(path.join(workingDir, a.file), a.newVariantId);
    rewrittenCount++;
    if (rewrittenCount % 25 === 0 || rewrittenCount === counts.rewrite) {
      console.log('  ' + rewrittenCount + '/' + counts.rewrite + ' rewritten');
    }
  });

  console.log('');
  console.log('=== APPLY complete ===');
  console.log('  rewritten:     ' + rewrittenCount);
  console.log('  skipped-clean: ' + (counts['skip-clean'] || 0));
  console.log('  backup at:     ' + backupDir);
  console.log('');
  console.log('Next: stage these ZIPs into publish-inbound/ and run publish-bulk --dry-run.');
  console.log('Slug shape: cryptogram-<slugged-first-phrase> (themeless single-mode + variant_id segment).');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  slugifyPhrase: slugifyPhrase,
  deriveVariantIdFromManifest: deriveVariantIdFromManifest,
  classifyZip: classifyZip,
  assignVariantIds: assignVariantIds,
  rewriteZip: rewriteZip,
  MAX_SLUG_CHARS: MAX_SLUG_CHARS,
  MIN_SLUG_CHARS: MIN_SLUG_CHARS
};
