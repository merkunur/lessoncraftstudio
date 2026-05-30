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
var topicsTaxonomy = require(path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));

// --force-divergent flag: overrides skip-divergent safety. Use when operator
// confirms image content is truth + manifest emit was buggy. Set by CLI arg.
var FORCE_DIVERGENT = false;

// --themeless-ok flag: reclassify the legitimately-themeless subset of
// halt-unparseable (zero image-bearing objects + no fallback signal, e.g.
// cryptogram text-decode puzzles) into the non-fatal `skip-themeless` class so
// it does not block an automated wave. Does NOT relax halt-ambiguous (images
// present but un-themed) or the corruption sub-cases. publish-bulk's §15.16
// legitimate-null path independently re-validates theme, so this only relaxes
// the over-conservative pre-flight. Set by CLI arg.
var THEMELESS_OK = false;

// --fail-on-rewrite flag: in dry-run, exit 1 when any `rewrite`-class
// (recoverable theme-emit defect) is present, so an orchestrator pre-flight
// halts and the operator salvages BEFORE the SEO re-band step (which rebuilds
// SEO from manifest.theme and would otherwise bake themeless SEO). Set by CLI arg.
var FAIL_ON_REWRITE = false;

// -------------------------------------------------------------------------
// Topics-taxonomy lookup tables — built once at module load
// -------------------------------------------------------------------------

// Set of all registered theme axis-keys; used by settings-field signal-recovery
// path to validate a settings value resolves to a real axis-key before adopting.
var THEME_AXIS_KEYS = new Set(Object.keys(topicsTaxonomy.axes && topicsTaxonomy.axes.theme || {}));

// Reverse-lookup from displayName (per locale) to axis-key. Keyed by
// "<locale>:<lowercased-displayName>". Used by deck.html seoMeta.themeName
// reverse-lookup path (Class F — big-small).
var DISPLAY_NAME_TO_AXIS_KEY = (function () {
  var map = new Map();
  var themeAxes = (topicsTaxonomy.axes && topicsTaxonomy.axes.theme) || {};
  Object.keys(themeAxes).forEach(function (axisKey) {
    var nameMap = themeAxes[axisKey].name || {};
    Object.keys(nameMap).forEach(function (locale) {
      var displayName = nameMap[locale];
      if (typeof displayName === 'string' && displayName.length > 0) {
        map.set(locale + ':' + displayName.toLowerCase(), axisKey);
      }
    });
  });
  return map;
})();

function lookupAxisKeyByDisplayName(displayName, locale) {
  if (!displayName || !locale) return null;
  return DISPLAY_NAME_TO_AXIS_KEY.get(locale + ':' + String(displayName).toLowerCase()) || null;
}

// Per-app settings-field signal-recovery map. Each app entry is an
// ordered list of theme-bearing settings field names; first matching
// field whose value is a registered axis-key wins. Currently registered:
//   matching — settings.letter_theme (Class E in the 2026-05-09 wave)
//              + settings.dict_theme as secondary for non-letter modes
//              (image-image, pair, etc.) per 2026-05-14 es wave Shape A fix.
// Future apps register here as the source-side emit-defect surfaces:
// the salvage script preserves operator's existing generation hours
// while authoring-side fixes ship asynchronously per §A.13.10.
var SETTINGS_THEME_FIELDS = {
  'matching': ['letter_theme', 'dict_theme']
};

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

  // Walk ALL exercises (not just first) to collect every theme present in the
  // deck's images. Theme set size determines outcome:
  //   0  → halt-ambiguous (no recoverable signal)
  //   1  → rewrite manifest.theme to the single theme
  //   ≥2 → skip-multi-theme (deck is genuinely multi-theme per "all themes"
  //        operator-mode, e.g. prepositions settings.theme_select === "all";
  //        rewriting would mislabel — leave manifest.theme=null)
  //
  // Recognized image-shape patterns (extended at this commit for the
  // 2026-05-09 9-app en wave: pattern-worksheet uniqueImages + chart-count
  // icons + pattern-train elementToImage shapes):
  //   exercise = [{path, theme}, ...]                          — code-addition
  //   exercise = { image: {path, theme} }                      — addition, subtraction, etc.
  //   exercise = { path, theme }                               — direct image-bearing object (picture-sort)
  //   exercise = { imageMap: {symbol: {path, theme}} }         — math-worksheet
  //   exercise = { letterToImage: {letter: {path, theme}} }    — alphabet-train
  //   exercise = { item: {path, theme} }                       — prepositions
  //   exercise = { uniqueImages: [{path, theme}, ...] }        — pattern-worksheet  [NEW]
  //   exercise = { icons: [{path, theme}, ...] }               — chart-count        [NEW]
  //   exercise = { elementToImage: {key: {path, theme}} }      — pattern-train      [NEW]
  var imageBearingObjects = [];
  if (manifest.exercises && manifest.exercises.length > 0) {
    manifest.exercises.forEach(function (e) {
      collectImagesFromExercise(e, imageBearingObjects);
    });
  }

  // Build the theme set per image. Per-image: primary = image.theme;
  // secondary = parseThemeFromImagePath(image.path). Use primary when present,
  // fall back to secondary, skip if both null. (Empty imageBearingObjects
  // produces empty themeSet, which falls through to the fallback chain
  // below — Class E settings + Class F seoMeta paths.)
  var themeSet = new Set();
  imageBearingObjects.forEach(function (img) {
    var primary = (img.theme && String(img.theme).length > 0) ? String(img.theme) : null;
    var secondary = img.path ? slug.parseThemeFromImagePath(img.path) : null;
    var t = primary || secondary;
    if (t) themeSet.add(t);
  });

  // Fallback chain when image-walk yields no themes (either no recognized
  // image-shape OR all images had CUID-shaped paths with no .theme field).
  // Two signal sources tried in order: per-app settings-field, then
  // deck.html seoMeta.themeName reverse-lookup. First non-empty match wins.
  var fallbackSource = null;
  var fallbackNote = null;
  if (themeSet.size === 0) {
    // 1. Settings-field signal-recovery (Class E — matching).
    var appName = manifest.generator && manifest.generator.app;
    var settingsFields = SETTINGS_THEME_FIELDS[appName] || [];
    var settings = manifest.settings || {};
    for (var sfi = 0; sfi < settingsFields.length; sfi++) {
      var fieldName = settingsFields[sfi];
      var fieldValue = settings[fieldName];
      if (typeof fieldValue === 'string' && fieldValue.length > 0 && fieldValue !== 'all' && THEME_AXIS_KEYS.has(fieldValue)) {
        themeSet.add(fieldValue);
        fallbackSource = 'settings.' + fieldName;
        fallbackNote = 'recovered from settings.' + fieldName + '=' + JSON.stringify(fieldValue);
        break;
      }
    }
  }

  if (themeSet.size === 0) {
    // 2. deck.html seoMeta.themeName reverse-lookup (Class F — big-small).
    var deckHtmlEntry = zip.getEntry('deck.html');
    if (deckHtmlEntry) {
      var deckHtml;
      try {
        deckHtml = deckHtmlEntry.getData().toString('utf8');
      } catch (e) {
        deckHtml = null;
      }
      if (deckHtml) {
        var seoMatch = deckHtml.match(/"seoMeta"\s*:\s*\{[^}]*"themeName"\s*:\s*"([^"]+)"/);
        if (seoMatch) {
          var displayName = seoMatch[1];
          var locale = manifest.language || 'en';
          var axisKeyByName = lookupAxisKeyByDisplayName(displayName, locale);
          if (axisKeyByName) {
            themeSet.add(axisKeyByName);
            fallbackSource = 'deck.html seoMeta';
            fallbackNote = 'recovered from deck.html seoMeta.themeName="' + displayName + '" (locale=' + locale + ') -> ' + axisKeyByName;
          } else {
            // displayName present but no matching axis-key in registry —
            // surface as distinct halt-class for operator attention.
            result.action = 'halt-seometa-unmatched';
            result.note = 'deck.html seoMeta.themeName="' + displayName + '" but no matching axis-key in topics-taxonomy.json axes.theme.*.name.' + locale;
            return result;
          }
        }
      }
    }
  }

  if (themeSet.size === 0) {
    // Neither image-walk nor settings nor seoMeta yielded a theme.
    // Differentiate halt-class by which signal sources were tried:
    //   imageBearingObjects.length === 0 → halt-unparseable (no recognized shape)
    //   imageBearingObjects.length > 0   → halt-ambiguous (CUID-shaped paths)
    if (imageBearingObjects.length === 0) {
      if (THEMELESS_OK) {
        // Legitimately-themeless deck (no images at all, e.g. cryptogram text
        // puzzle). Non-fatal: publish-bulk's §15.16 legitimate-null path passes
        // these. Only reachable under --themeless-ok.
        result.action = 'skip-themeless';
        result.note = 'legitimately themeless (no image-bearing objects); waved through per --themeless-ok';
      } else {
        result.action = 'halt-unparseable';
        result.note = 'no image-bearing objects across exercises[] AND no settings-field/seoMeta fallback signal';
      }
    } else {
      result.action = 'halt-ambiguous';
      result.note = 'no recoverable theme across ' + imageBearingObjects.length + ' images (all CUID-shaped or .theme missing) AND no settings-field/seoMeta fallback signal';
    }
    return result;
  }

  if (themeSet.size > 1) {
    // Multi-theme deck — operator picked "all themes" mode (e.g. prepositions
    // settings.theme_select="all" with a random-pull across multiple themes).
    // Rewriting to a single theme would mislabel; leave theme=null. variant_id
    // alone disambiguates these decks within their (app, mode) tuple.
    result.action = 'skip-multi-theme';
    result.note = 'multi-theme deck (' + themeSet.size + ' distinct themes across ' + imageBearingObjects.length + ' images): ' + Array.from(themeSet).slice(0, 5).join(', ') + (themeSet.size > 5 ? ', ...' : '');
    return result;
  }

  var corrected = Array.from(themeSet)[0];
  result.newTheme = corrected;

  if (result.oldTheme === corrected) {
    result.action = 'skip-clean';
    if (fallbackNote) result.note = fallbackNote;
    return result;
  }

  // Preserve compound themes (picture-sort A-vs-B pattern). Image-walk only
  // sees one component when the other side's items are theme-less; rewriting
  // to a single theme corrupts operator's compound-theme intent.
  if (result.oldTheme && result.oldTheme.indexOf('-vs-') !== -1) {
    result.action = 'skip-compound';
    result.note = 'compound oldTheme preserved (image-walk found "' + corrected + '" but compound "' + result.oldTheme + '" is operator intent)';
    return result;
  }

  // Preserve non-null oldTheme that diverges from image-walk corrected.
  // Operator's explicit manifest selection takes priority over inferred
  // image-pool theme; surface for operator visibility but do not rewrite.
  // Salvage script's primary use case is recovering manifest.theme=null
  // (the recurring emit-defect class), not overriding populated values.
  // EXCEPTION: --force-divergent flag overrides this safety when the
  // operator explicitly confirms image content is truth (e.g., 2026-05-11
  // ES code-addition wave: 99 ZIPs declared theme="4th_of_july" but
  // image content shows different themes; operator confirmed images are
  // correct + manifest emit was buggy).
  if (result.oldTheme) {
    if (FORCE_DIVERGENT) {
      result.action = 'rewrite';
      result.note = 'force-divergent: oldTheme "' + result.oldTheme + '" overridden by image-walk "' + corrected + '" per --force-divergent flag';
      return result;
    }
    result.action = 'skip-divergent';
    result.note = 'oldTheme "' + result.oldTheme + '" differs from image-walk corrected "' + corrected + '" — preserving operator manifest (no rewrite)';
    return result;
  }

  result.action = 'rewrite';
  if (fallbackNote) result.note = fallbackNote;
  return result;
}

/**
 * Helper: collect all image-bearing objects from one exercise into accumulator.
 * Recognizes the 5 shape patterns enumerated in classifyZip's comment block.
 * Each pushed object has at least one of {path, theme} populated.
 */
function collectImagesFromExercise(exercise, accumulator) {
  if (!exercise) return;
  if (Array.isArray(exercise)) {
    // code-addition shape: array of image objects
    exercise.forEach(function (img) {
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
    return;
  }
  if (typeof exercise !== 'object') return;

  // Single image: { image: {} } or direct {path, theme}
  if (exercise.image && typeof exercise.image === 'object' && (exercise.image.path || exercise.image.theme)) {
    accumulator.push(exercise.image);
  } else if (exercise.path || exercise.theme) {
    accumulator.push(exercise);
  }

  // Map-of-images: imageMap (math-worksheet) or letterToImage (alphabet-train)
  if (exercise.imageMap && typeof exercise.imageMap === 'object') {
    Object.keys(exercise.imageMap).forEach(function (k) {
      var img = exercise.imageMap[k];
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
  }
  if (exercise.letterToImage && typeof exercise.letterToImage === 'object') {
    Object.keys(exercise.letterToImage).forEach(function (k) {
      var img = exercise.letterToImage[k];
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
  }

  // Single-image-named-field: item (prepositions)
  if (exercise.item && typeof exercise.item === 'object' && (exercise.item.path || exercise.item.theme)) {
    accumulator.push(exercise.item);
  }

  // Array shape: uniqueImages (pattern-worksheet)
  if (Array.isArray(exercise.uniqueImages)) {
    exercise.uniqueImages.forEach(function (img) {
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
  }

  // Array shape: icons (chart-count)
  if (Array.isArray(exercise.icons)) {
    exercise.icons.forEach(function (img) {
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
  }

  // Map shape: elementToImage (pattern-train; mirror of letterToImage)
  if (exercise.elementToImage && typeof exercise.elementToImage === 'object') {
    Object.keys(exercise.elementToImage).forEach(function (k) {
      var img = exercise.elementToImage[k];
      if (img && typeof img === 'object' && (img.path || img.theme)) {
        accumulator.push(img);
      }
    });
  }
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
  var counts = { rewrite: 0, 'skip-clean': 0, 'skip-multi-theme': 0, 'skip-compound': 0, 'skip-divergent': 0, 'skip-themeless': 0, 'halt-unparseable': 0, 'halt-ambiguous': 0, 'halt-seometa-unmatched': 0 };
  classifications.forEach(function (c) { counts[c.action] = (counts[c.action] || 0) + 1; });
  var themeDist = {};
  classifications.forEach(function (c) {
    if (c.action === 'rewrite' || c.action === 'skip-clean' || c.action === 'skip-compound' || c.action === 'skip-divergent') {
      var t = c.newTheme || c.oldTheme || '(unknown)';
      themeDist[t] = (themeDist[t] || 0) + 1;
    } else if (c.action === 'skip-multi-theme') {
      themeDist['(multi-theme)'] = (themeDist['(multi-theme)'] || 0) + 1;
    }
  });

  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs:              ' + classifications.length);
  console.log('  rewrite:                 ' + counts.rewrite);
  console.log('  skip-clean:              ' + counts['skip-clean']);
  console.log('  skip-multi-theme:        ' + counts['skip-multi-theme']);
  console.log('  skip-compound:           ' + counts['skip-compound']);
  console.log('  skip-divergent:          ' + counts['skip-divergent']);
  console.log('  skip-themeless:          ' + counts['skip-themeless']);
  console.log('  halt-unparseable:        ' + counts['halt-unparseable']);
  console.log('  halt-ambiguous:          ' + counts['halt-ambiguous']);
  console.log('  halt-seometa-unmatched:  ' + counts['halt-seometa-unmatched']);
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
    if (args[i] === '--force-divergent') { FORCE_DIVERGENT = true; continue; }
    if (args[i] === '--themeless-ok') { THEMELESS_OK = true; continue; }
    if (args[i] === '--fail-on-rewrite') { FAIL_ON_REWRITE = true; continue; }
    if (args[i].startsWith('--')) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (workingDir == null) { workingDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-manifest-theme.js <directory> [--dry-run] [--force-divergent] [--themeless-ok] [--fail-on-rewrite]');
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
    return c.action === 'halt-unparseable' || c.action === 'halt-ambiguous' || c.action === 'halt-seometa-unmatched';
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

  if (dryRun && FAIL_ON_REWRITE && counts.rewrite > 0) {
    console.log('');
    console.log('HALT (--fail-on-rewrite) — ' + counts.rewrite + ' ZIP(s) carry a recoverable theme-emit defect (manifest.theme null/wrong).');
    console.log('Salvage before publishing:');
    console.log('  node scripts/publish-cli/rewrite-manifest-theme.js "' + workingDir + '" --themeless-ok');
    console.log('then re-run the wave. Theme defects MUST be fixed before the SEO re-band step (it rebuilds SEO from manifest.theme).');
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
  ensureBackup: ensureBackup,
  collectImagesFromExercise: collectImagesFromExercise
};
