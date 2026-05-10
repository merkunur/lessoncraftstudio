#!/usr/bin/env node
/**
 * Salvage script for the 2026-05-10 4-app English deck wave:
 *   find-objects (96) + crossword (44) + treasure-hunt (98) + picture-path (97) = 335 ZIPs.
 *
 * Recurring emit-defects surfaced (multi-defect; per §A.13.9 two-defect recon):
 *   1. find-objects: manifest.exercise_mode=null though exercises[0].mode is
 *      ispy/oddoneout (mode emit-defect — app emit-site doesn't propagate mode
 *      from exercises[0] to manifest).
 *   2. crossword: manifest.theme=null + manifest.exercises=[] though
 *      seo_trace.title.themeName.value carries operator-selected theme
 *      (theme emit-defect; salvageable from seo_trace per §15.17).
 *   3. treasure-hunt: manifest.theme stuck on '4th_of_july' across all 98
 *      (theme stuck-emit — visual content does match 4th_of_july; original
 *      operator intent of varied themes lost). Theme stays honest about
 *      visual content; no salvage attempted.
 *   4. picture-path: manifest.variant_id stuck on '98be' across all 97
 *      (variant_id stuck-emit; theme + content correct).
 *
 * Plus all 4 waves have within-batch slug-collision risk needing §11
 * variant_id disambiguation (active doctrine; slug.js + add-variant-ids.js).
 *
 * Strategy per §15.17 (manifest-only salvage; backup-then-rewrite):
 *   Phase 1 — pre-pass classification (no FS writes)
 *   Phase 2 — backup + rewrite
 *   Phase 3 — verification (post-apply re-classification + report)
 *
 * Per-app salvage rules:
 *   find-objects:  read exercises[0].mode; map ispy→null (default per §17.8.5
 *                  default-mode-emits-null), oddoneout→'odd-one-out'.
 *                  Strip stuck variant_id (none expected on find-objects).
 *   crossword:     read seo_trace.title.themeName.value; reverse-lookup
 *                  axis-key from topics-taxonomy.json axes.theme.*.name.en;
 *                  write manifest.theme; inject synthetic images_used[0] of
 *                  shape '/images/<axis-key>/seoseed.png' so §15.16 gate
 *                  sees parseable secondary signal matching declared theme.
 *                  Strip stuck variant_id (none expected on crossword).
 *   treasure-hunt: leave manifest.theme alone (4th_of_july); strip stuck
 *                  variant_id (existed natively but unique-per-deck — strip
 *                  for uniform ordinal assignment via add-variant-ids.js).
 *   picture-path:  leave manifest.theme alone; strip stuck variant_id
 *                  ('98be' for all 97 — emit-defect).
 *
 * After this script: operator runs add-variant-ids.js on each of the 4
 * working dirs to assign clean ordinal variant_ids per (app, mode, theme)
 * tuple. Then publish-bulk dry-run + confirm.
 *
 * Usage:
 *   node scripts/publish-cli/rescue-4-app-wave-2026-05-10.js <directory> [--dry-run]
 *
 *   <directory>  path to a working dir containing ONE app's ZIPs
 *                (e.g., decks/english/find\ objects/). Script classifies
 *                each ZIP via manifest.generator.app and routes to per-app
 *                salvage. Mixed-app dirs supported but report split per app.
 *
 *   --dry-run    full pre-pass + report; no FS writes; no backup.
 *
 * Halt-classes:
 *   A — unparseable: ZIP missing manifest.json OR manifest parse error
 *   B — unknown-app: manifest.generator.app not in {find-objects, crossword,
 *                    treasure-hunt, picture-path}
 *   C — crossword-theme-unrecoverable: seo_trace.title.themeName.value
 *                                       missing or doesn't reverse-lookup
 *                                       to axis-key
 *   D — find-objects-mode-unparseable: exercises[0].mode missing or not in
 *                                       {ispy, oddoneout}
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

// -------------------------------------------------------------------------
// Reverse-lookup table built from topics-taxonomy.json (loaded at startup).
// -------------------------------------------------------------------------

function loadThemeNameToAxisKeyMap() {
  var taxPath = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
  var raw = fs.readFileSync(taxPath, 'utf8');
  var tax;
  try {
    tax = JSON.parse(raw);
  } catch (e) {
    throw new Error('Failed to parse topics-taxonomy.json: ' + e.message);
  }
  var axes = (tax && tax.axes && tax.axes.theme) || {};
  var lookup = {};
  Object.keys(axes).forEach(function (key) {
    var entry = axes[key] || {};
    var name = entry.name || {};
    var en = name.en;
    if (en) {
      // Normalize: lowercase, trim. Stored value preserves operator case
      // for log clarity; lookup uses normalized.
      lookup[en.toLowerCase().trim()] = key;
    }
  });
  return lookup;
}

// -------------------------------------------------------------------------
// Per-app salvage rules
// -------------------------------------------------------------------------

var FIND_OBJECTS_MODE_MAP = {
  'ispy': null,            // default per §17.8.5 default-mode-emits-null
  'oddoneout': 'odd-one-out'
};

function classifyZip(zipPath, themeLookup) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,
    app: null,
    note: null,
    plan: {}            // { strip_variant_id, set_exercise_mode, set_theme, inject_images_used }
  };

  var zip;
  try {
    zip = new AdmZip(zipPath);
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'ZIP open failed: ' + e.message;
    return result;
  }

  var entry = zip.getEntry('manifest.json');
  if (!entry) {
    result.action = 'halt-unparseable';
    result.note = 'manifest.json missing';
    return result;
  }

  var manifest;
  try {
    manifest = JSON.parse(entry.getData().toString('utf8'));
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'manifest parse error: ' + e.message;
    return result;
  }

  var app = (manifest.generator && manifest.generator.app) || manifest.exercise_type || null;
  result.app = app;

  if (!app) {
    result.action = 'halt-unparseable';
    result.note = 'manifest missing generator.app and exercise_type';
    return result;
  }

  // Always strip variant_id (let add-variant-ids.js re-assign uniformly).
  if (manifest.variant_id != null && String(manifest.variant_id).trim() !== '') {
    result.plan.strip_variant_id = String(manifest.variant_id);
  }

  if (app === 'find-objects') {
    var ex = (manifest.exercises && manifest.exercises[0]) || {};
    var rawMode = (ex && typeof ex === 'object') ? ex.mode : null;
    if (rawMode == null) {
      // Defensive: find-objects without exercises[0].mode is unusual but
      // should be treated as default-null (no rescue needed).
      result.plan.set_exercise_mode = null; // no-op (already null)
    } else if (Object.prototype.hasOwnProperty.call(FIND_OBJECTS_MODE_MAP, rawMode)) {
      var mapped = FIND_OBJECTS_MODE_MAP[rawMode];
      // Only set if differs from current
      var current = (manifest.exercise_mode == null || manifest.exercise_mode === '') ? null : manifest.exercise_mode;
      if (current !== mapped) {
        result.plan.set_exercise_mode = mapped;
      }
    } else {
      result.action = 'halt-find-objects-mode-unparseable';
      result.note = 'exercises[0].mode = ' + JSON.stringify(rawMode) + ' not in {ispy, oddoneout}';
      return result;
    }
    result.action = 'rescue';
    return result;
  }

  if (app === 'crossword') {
    // Read seo_trace.title.themeName.value
    var trace = (manifest.seo_trace && manifest.seo_trace.title) || {};
    var themeName = trace.themeName;
    var themeNameVal = (themeName && typeof themeName === 'object') ? themeName.value : null;
    if (!themeNameVal) {
      // Defensive: crossword without seo_trace theme is unusual; could be
      // a themeless crossword (operator selected 'all'). Skip theme rescue.
      result.action = 'rescue';
      return result;
    }
    var axisKey = themeLookup[String(themeNameVal).toLowerCase().trim()];
    if (!axisKey) {
      result.action = 'halt-crossword-theme-unrecoverable';
      result.note = 'seo_trace themeName="' + themeNameVal + '" does not reverse-lookup to any topics-taxonomy.axes.theme axis-key';
      return result;
    }
    var currentTheme = (manifest.theme == null || manifest.theme === '') ? null : manifest.theme;
    if (currentTheme !== axisKey) {
      result.plan.set_theme = axisKey;
      // Inject synthetic images_used[0] to satisfy §15.16 gate's secondary
      // signal check. Per parseThemeFromImagePath: '/images/<dir>/<file>'
      // shape — dir = axis-key produces matching parsed theme.
      result.plan.inject_images_used = '/images/' + axisKey + '/seoseed.png';
    }
    result.action = 'rescue';
    return result;
  }

  if (app === 'treasure-hunt' || app === 'picture-path') {
    // No manifest-content rescue needed; just strip variant_id.
    result.action = 'rescue';
    return result;
  }

  // Unknown app
  result.action = 'halt-unknown-app';
  result.note = 'app="' + app + '" not in {find-objects, crossword, treasure-hunt, picture-path}';
  return result;
}

// -------------------------------------------------------------------------
// In-place rewrite
// -------------------------------------------------------------------------

function applyRescue(zipPath, plan) {
  var zip = new AdmZip(zipPath);
  var entry = zip.getEntry('manifest.json');
  if (!entry) throw new Error('applyRescue: manifest.json missing in ' + zipPath);
  var manifest = JSON.parse(entry.getData().toString('utf8'));

  var changed = false;
  if (Object.prototype.hasOwnProperty.call(plan, 'strip_variant_id')) {
    delete manifest.variant_id;
    changed = true;
  }
  if (Object.prototype.hasOwnProperty.call(plan, 'set_exercise_mode')) {
    manifest.exercise_mode = plan.set_exercise_mode; // may be null
    changed = true;
  }
  if (Object.prototype.hasOwnProperty.call(plan, 'set_theme')) {
    manifest.theme = plan.set_theme;
    changed = true;
  }
  if (Object.prototype.hasOwnProperty.call(plan, 'inject_images_used')) {
    if (!Array.isArray(manifest.images_used)) manifest.images_used = [];
    if (manifest.images_used.length === 0) {
      manifest.images_used.push(plan.inject_images_used);
    }
    changed = true;
  }
  if (!changed) return false;

  var newBuf = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  if (typeof zip.updateFile === 'function') {
    zip.updateFile(entry, newBuf);
  } else {
    zip.deleteFile('manifest.json');
    zip.addFile('manifest.json', newBuf);
  }
  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);
  return true;
}

// -------------------------------------------------------------------------
// Backup
// -------------------------------------------------------------------------

function backupDir(workingDir, files) {
  var name = path.basename(workingDir);
  var parent = path.dirname(workingDir);
  var bdir = path.join(parent, name + '.original');
  if (fs.existsSync(bdir)) {
    throw new Error('backup dir already exists at ' + bdir + '; manual cleanup required (rm -rf "' + bdir + '")');
  }
  fs.mkdirSync(bdir, { recursive: true });
  files.forEach(function (f) {
    fs.copyFileSync(path.join(workingDir, f), path.join(bdir, f));
  });
  return bdir;
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
    if (args[i].indexOf('--') === 0) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (workingDir == null) { workingDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/rescue-4-app-wave-2026-05-10.js <directory> [--dry-run]');
    process.exit(2);
  }
  workingDir = path.resolve(workingDir);
  if (!fs.existsSync(workingDir) || !fs.statSync(workingDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + workingDir);
    process.exit(2);
  }

  var files = fs.readdirSync(workingDir)
    .filter(function (f) { return f.toLowerCase().endsWith('.zip'); })
    .sort();
  if (files.length === 0) {
    console.error('ERROR: no .zip files in ' + workingDir);
    process.exit(2);
  }

  console.log('rescue-4-app-wave-2026-05-10.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  working dir: ' + workingDir);
  console.log('  zip count:   ' + files.length);
  console.log('');

  var themeLookup = loadThemeNameToAxisKeyMap();
  console.log('  loaded ' + Object.keys(themeLookup).length + ' theme name→axis-key mappings');
  console.log('');

  // Phase 1 — classify
  console.log('Phase 1: classifying ' + files.length + ' ZIPs...');
  var classifications = files.map(function (f) {
    return classifyZip(path.join(workingDir, f), themeLookup);
  });

  var halts = classifications.filter(function (c) {
    return c.action && c.action.indexOf('halt-') === 0;
  });

  // Aggregate per-app
  var perApp = {};
  classifications.forEach(function (c) {
    var key = c.app || '(unknown)';
    if (!perApp[key]) perApp[key] = { total: 0, rescue: 0, halt: 0, plans: {} };
    perApp[key].total++;
    if (c.action === 'rescue') {
      perApp[key].rescue++;
      Object.keys(c.plan).forEach(function (k) {
        perApp[key].plans[k] = (perApp[key].plans[k] || 0) + 1;
      });
    } else {
      perApp[key].halt++;
    }
  });

  console.log('');
  console.log('=== Per-app classification summary ===');
  Object.keys(perApp).sort().forEach(function (app) {
    var s = perApp[app];
    console.log('  ' + app + ': total=' + s.total + ', rescue=' + s.rescue + ', halt=' + s.halt);
    Object.keys(s.plans).sort().forEach(function (k) {
      console.log('    ' + k + ': ' + s.plans[k]);
    });
  });

  if (halts.length > 0) {
    console.log('');
    console.log('=== HALT details (' + halts.length + ') ===');
    halts.forEach(function (h) {
      console.log('  [' + h.action + '] ' + h.file + ' (app=' + h.app + ')  // ' + h.note);
    });
    console.log('');
    console.log('HALT — ' + halts.length + ' ZIP(s) failed classification. No filesystem writes.');
    process.exit(1);
  }

  if (dryRun) {
    console.log('');
    console.log('DRY-RUN clean. Re-run without --dry-run to apply.');
    process.exit(0);
  }

  // Phase 2 — backup + rewrite
  console.log('');
  console.log('Phase 2: creating backup at ' + path.basename(workingDir) + '.original/...');
  var bdir = backupDir(workingDir, files);
  console.log('  backed up ' + files.length + ' ZIPs to ' + bdir);

  console.log('');
  console.log('Phase 2: rewriting ZIPs...');
  var rewritten = 0;
  var unchanged = 0;
  classifications.forEach(function (c) {
    if (c.action !== 'rescue') return;
    var changed = applyRescue(path.join(workingDir, c.file), c.plan);
    if (changed) rewritten++;
    else unchanged++;
    if ((rewritten + unchanged) % 25 === 0) {
      console.log('  ' + (rewritten + unchanged) + '/' + classifications.length + ' processed');
    }
  });
  console.log('  ' + (rewritten + unchanged) + '/' + classifications.length + ' processed (' + rewritten + ' rewritten, ' + unchanged + ' no-op)');

  // Phase 3 — verification (re-classify post-apply)
  console.log('');
  console.log('Phase 3: re-classifying post-apply for verification...');
  var post = files.map(function (f) {
    return classifyZip(path.join(workingDir, f), themeLookup);
  });
  var stillNeed = post.filter(function (c) {
    return c.action === 'rescue' && Object.keys(c.plan).length > 0;
  });
  if (stillNeed.length > 0) {
    console.log('  WARNING — ' + stillNeed.length + ' ZIPs still report rescue plan post-apply');
    stillNeed.slice(0, 10).forEach(function (c) {
      console.log('    ' + c.file + ': ' + JSON.stringify(c.plan));
    });
  } else {
    console.log('  All ZIPs CLEAN post-apply (no further rescue needed).');
  }

  console.log('');
  console.log('=== APPLY complete ===');
  console.log('  rewritten: ' + rewritten);
  console.log('  no-op:     ' + unchanged);
  console.log('  backup:    ' + bdir);
  console.log('');
  console.log('Next: run add-variant-ids.js on this dir to assign ordinal variant_ids.');
  console.log('  node scripts/publish-cli/add-variant-ids.js "' + workingDir + '" --dry-run');
  console.log('  node scripts/publish-cli/add-variant-ids.js "' + workingDir + '"');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyZip: classifyZip,
  applyRescue: applyRescue,
  loadThemeNameToAxisKeyMap: loadThemeNameToAxisKeyMap,
  FIND_OBJECTS_MODE_MAP: FIND_OBJECTS_MODE_MAP
};
