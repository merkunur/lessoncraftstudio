#!/usr/bin/env node
/**
 * Retroactive exercise_mode salvage for 10 apps' already-published decks.
 *
 * Continuation of source-side commit `7e48779e` which fixed the per-app
 * mode-emit logic. That commit fixes FUTURE waves; this script retrofits
 * EXISTING already-published decks so the topic-page mode filter populates
 * immediately.
 *
 * 10 apps in scope:
 *   find-and-count, find-objects, math-puzzle, math-worksheet, missing-pieces,
 *   more-less, odd-one-out, shadow-match, treasure-hunt, picture-path
 *
 * Phase 1 audit found ALL 10 apps' buildCatalogManifestSettings reference
 * DOM ids that don't exist (e.g., `operationSelect` vs actual `opSelect`).
 * The capture function silently no-ops. No salvage signal exists in
 * manifest.settings.
 *
 * Operator-adjudicated salvage per §15.17 + this commission's plan:
 *   1. NULL-mode decks → default-to-most-common per app (deterministic):
 *      - find-and-count: null → 'letter-spotting'
 *      - find-objects:   null → 'i-spy'
 *      - math-puzzle:    null → 'mixed'
 *      - math-worksheet: null → 'three-symbols-add-sub'
 *      - missing-pieces: null → 'one-missing'
 *      - more-less:      null → 'image-image'
 *      - odd-one-out:    null → 'same-theme'
 *      - shadow-match:   null → 'find-shadow'
 *      - treasure-hunt:  null → 'cardinal-arrows'
 *      - picture-path:   null → 'pathway'
 *   2. find-objects existing 'odd-one-out' mode key → rename 'find-odd'
 *      (avoids collision with axes.exercise-type.odd-one-out per source-side
 *      commission's naming-collision-avoidance).
 *   3. ALL OTHER non-null modes already correct (per source-side fix's
 *      key compatibility): pass through unchanged.
 *
 * Updates per deck:
 *   - manifest.json on disk: exercise_mode field (atomic temp+rename)
 *   - DB Deck.exerciseMode (Prisma update by language+slug)
 *
 * SEO refresh (deck.html title regeneration + DB hash recompute) is the
 * SEPARATE republish-seo step that runs after this script.
 *
 * Backup: dot-prefixed sibling `.pre-mode-rewrite-2026-05-14/` snapshot of
 * touched manifest.json files per §15.5 atomicity.
 *
 * USAGE:
 *   node scripts/publish-cli/rewrite-mode-10-apps.js [--dry-run|--confirm]
 *                                                    [--app <name>]
 *                                                    [--language <locale>]
 *                                                    [--base-dir <path>]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var BACKUP_DIR_NAME = '.pre-mode-rewrite-2026-05-14';

// Per-app mode-derivation rules. Each entry maps null → default mode + any
// existing-non-null renames. New apps added here as they surface defects.
var APP_RULES = {
  'find-and-count':   { defaultMode: 'letter-spotting', renames: {} },
  'find-objects':     { defaultMode: 'i-spy',           renames: { 'odd-one-out': 'find-odd' } },
  'math-puzzle':      { defaultMode: 'mixed',           renames: {} },
  'math-worksheet':   { defaultMode: 'three-symbols-add-sub', renames: {} },
  'missing-pieces':   { defaultMode: 'one-missing',     renames: {} },
  'more-less':        { defaultMode: 'image-image',     renames: {} },
  'odd-one-out':      { defaultMode: 'same-theme',      renames: {} },
  'shadow-match':     { defaultMode: 'find-shadow',     renames: {} },
  'treasure-hunt':    { defaultMode: 'cardinal-arrows', renames: {} },
  'picture-path':     { defaultMode: 'pathway',         renames: {} },
};

// ============================================================
// Filesystem walk + classification
// ============================================================

function walkDecks(rootDir, opts) {
  if (!fs.existsSync(rootDir)) return [];
  var locales = fs.readdirSync(rootDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    return fs.statSync(path.join(rootDir, n)).isDirectory();
  });
  if (opts.language && opts.language !== 'all') {
    locales = locales.filter(function (l) { return l === opts.language; });
  }
  var decks = [];
  locales.forEach(function (locale) {
    var localeDir = path.join(rootDir, locale);
    var slugDirs = fs.readdirSync(localeDir).filter(function (n) {
      if (n.charAt(0) === '.') return false;
      var p = path.join(localeDir, n);
      var stat;
      try { stat = fs.lstatSync(p); } catch (e) { return false; }
      return stat.isDirectory() && /-v\d+$/.test(n);
    });
    slugDirs.forEach(function (slugDir) {
      var slug = slugDir.replace(/-v\d+$/, '');
      if (opts.slug && slug !== opts.slug) return;
      var manifestPath = path.join(localeDir, slugDir, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        decks.push({ manifestPath: manifestPath, locale: locale, slug: slug, slugDir: slugDir });
      }
    });
  });
  return decks;
}

function classifyDeck(entry, opts) {
  var result = {
    manifestPath: entry.manifestPath,
    locale: entry.locale,
    slug: entry.slug,
    app: null,
    oldMode: null,
    newMode: null,
    action: null,  // 'rewrite' | 'skip-clean' | 'skip-out-of-scope' | 'halt-unparseable'
    note: null
  };
  var manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(entry.manifestPath, 'utf8'));
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'manifest parse error: ' + e.message;
    return result;
  }
  var app = manifest.generator && manifest.generator.app;
  result.app = app;
  result.oldMode = manifest.exercise_mode === undefined ? null : manifest.exercise_mode;

  if (!APP_RULES[app]) {
    result.action = 'skip-out-of-scope';
    result.note = 'app "' + app + '" not in 10-app salvage scope';
    return result;
  }
  if (opts.app && opts.app !== app) {
    result.action = 'skip-out-of-scope';
    result.note = 'app filter excluded';
    return result;
  }

  var rule = APP_RULES[app];
  // Rename: existing non-null mode key matches a rename target
  if (result.oldMode && rule.renames[result.oldMode]) {
    result.newMode = rule.renames[result.oldMode];
    result.action = 'rewrite';
    result.note = 'rename: ' + result.oldMode + ' → ' + result.newMode;
    return result;
  }
  // Null → default
  if (result.oldMode === null) {
    result.newMode = rule.defaultMode;
    result.action = 'rewrite';
    result.note = 'null → default ' + result.newMode;
    return result;
  }
  // Non-null mode already correct (no rename target) → skip-clean
  result.action = 'skip-clean';
  result.note = 'mode "' + result.oldMode + '" already non-null and not a rename target';
  return result;
}

// ============================================================
// Apply phase: rewrite manifest.json + update DB
// ============================================================

function ensureBackupDir(rootDir) {
  var backupRoot = path.join(rootDir, BACKUP_DIR_NAME);
  if (!fs.existsSync(backupRoot)) fs.mkdirSync(backupRoot, { recursive: true });
  return backupRoot;
}

function backupManifest(c, backupRoot) {
  // Mirror locale/slugDir structure under backupRoot
  var rel = path.relative(path.dirname(path.dirname(c.manifestPath)), c.manifestPath);
  var dst = path.join(backupRoot, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(c.manifestPath, dst);
}

function rewriteManifest(c) {
  // Atomic per §15.5: write tmp, rename
  var manifest = JSON.parse(fs.readFileSync(c.manifestPath, 'utf8'));
  manifest.exercise_mode = c.newMode;
  var tmpPath = c.manifestPath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  fs.renameSync(tmpPath, c.manifestPath);
}

async function updateDb(c) {
  // Update Deck.exerciseMode by (language, slug).
  // Per §15.10 archive contract: only published rows; archived rows skipped.
  var existing = await db.client().deck.findFirst({
    where: { language: c.locale, slug: c.slug, status: 'published' },
    select: { id: true, exerciseMode: true },
  });
  if (!existing) {
    return { dbUpdated: false, note: 'no published row for (' + c.locale + ', ' + c.slug + ')' };
  }
  if (existing.exerciseMode === c.newMode) {
    return { dbUpdated: false, note: 'DB row already at new mode' };
  }
  await db.client().deck.update({
    where: { id: existing.id },
    data: { exerciseMode: c.newMode },
  });
  return { dbUpdated: true };
}

// ============================================================
// Reporting
// ============================================================

function pad(s, n) { s = String(s); return s.length >= n ? s : s + ' '.repeat(n - s.length); }

function summarize(classifications) {
  var perApp = {};
  classifications.forEach(function (c) {
    if (!c.app) return;
    if (!perApp[c.app]) perApp[c.app] = { rewrite: 0, 'skip-clean': 0, 'skip-out-of-scope': 0, 'halt-unparseable': 0 };
    perApp[c.app][c.action] = (perApp[c.app][c.action] || 0) + 1;
  });
  var totals = { rewrite: 0, 'skip-clean': 0, 'skip-out-of-scope': 0, 'halt-unparseable': 0 };
  Object.keys(perApp).forEach(function (app) {
    Object.keys(perApp[app]).forEach(function (k) { totals[k] = (totals[k] || 0) + perApp[app][k]; });
  });
  console.log('');
  console.log('=== Summary ===');
  console.log('  ' + pad('app', 22) + pad('rewrite', 10) + pad('skip-clean', 13) + pad('skip-oos', 11) + pad('halt', 8));
  console.log('  ' + '-'.repeat(64));
  Object.keys(perApp).sort().forEach(function (app) {
    var p = perApp[app];
    console.log('  ' + pad(app, 22) + pad(p.rewrite, 10) + pad(p['skip-clean'], 13) + pad(p['skip-out-of-scope'], 11) + pad(p['halt-unparseable'], 8));
  });
  console.log('  ' + '-'.repeat(64));
  console.log('  ' + pad('TOTAL', 22) + pad(totals.rewrite, 10) + pad(totals['skip-clean'], 13) + pad(totals['skip-out-of-scope'], 11) + pad(totals['halt-unparseable'], 8));
  return totals;
}

// ============================================================
// Main
// ============================================================

async function main() {
  var args = process.argv.slice(2);
  var opts = { dryRun: false, confirm: false, app: null, language: null, baseDir: DEFAULT_DECKS_DIR };
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') opts.dryRun = true;
    else if (args[i] === '--confirm') opts.confirm = true;
    else if (args[i] === '--app') { opts.app = args[++i]; }
    else if (args[i] === '--language') { opts.language = args[++i]; }
    else if (args[i] === '--base-dir') { opts.baseDir = args[++i]; }
    else { console.error('USAGE ERROR: unknown arg "' + args[i] + '"'); process.exit(2); }
  }
  if (!opts.dryRun && !opts.confirm) {
    console.error('rewrite-mode-10-apps.js — must specify --dry-run OR --confirm');
    process.exit(2);
  }

  console.log('rewrite-mode-10-apps.js — ' + (opts.dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  base dir:   ' + opts.baseDir);
  console.log('  app filter: ' + (opts.app || 'all 10 apps'));
  console.log('  language:   ' + (opts.language || 'all'));

  var entries = walkDecks(opts.baseDir, { language: opts.language });
  console.log('  walked ' + entries.length + ' deck dirs');

  var classifications = entries.map(function (e) { return classifyDeck(e, opts); });
  var halts = classifications.filter(function (c) { return c.action === 'halt-unparseable'; });
  if (halts.length > 0) {
    console.error('');
    console.error('HALT — ' + halts.length + ' decks failed classification:');
    halts.slice(0, 10).forEach(function (h) {
      console.error('  ' + h.manifestPath + ': ' + h.note);
    });
    process.exit(1);
  }

  summarize(classifications);

  var rewrites = classifications.filter(function (c) { return c.action === 'rewrite'; });

  if (opts.dryRun) {
    console.log('');
    console.log('DRY-RUN sample (first 20 rewrites):');
    rewrites.slice(0, 20).forEach(function (c) {
      console.log('  ' + c.locale + '/' + c.slug + ' [' + c.app + '] ' + JSON.stringify(c.oldMode) + ' → "' + c.newMode + '" — ' + c.note);
    });
    console.log('');
    console.log('Re-run with --confirm to apply.');
    await db.disconnect();
    return;
  }

  // APPLY phase
  console.log('');
  console.log('Backup root: ' + path.join(opts.baseDir, BACKUP_DIR_NAME));
  var backupRoot = ensureBackupDir(opts.baseDir);
  console.log('Backing up + rewriting ' + rewrites.length + ' manifests + DB updates...');

  var applied = 0;
  var dbUpdated = 0;
  var dbSkipped = 0;
  var errors = [];
  for (var idx = 0; idx < rewrites.length; idx++) {
    var c = rewrites[idx];
    try {
      backupManifest(c, backupRoot);
      rewriteManifest(c);
      var dbRes = await updateDb(c);
      if (dbRes.dbUpdated) dbUpdated++;
      else dbSkipped++;
      applied++;
    } catch (e) {
      errors.push({ entry: c, error: e.message });
    }
    if ((idx + 1) % 50 === 0 || idx + 1 === rewrites.length) {
      console.log('  [' + (idx + 1) + '/' + rewrites.length + '] applied=' + applied + ' dbUpdated=' + dbUpdated + ' dbSkipped=' + dbSkipped + ' errors=' + errors.length);
    }
  }

  console.log('');
  console.log('=== APPLY complete ===');
  console.log('  applied:    ' + applied);
  console.log('  dbUpdated:  ' + dbUpdated);
  console.log('  dbSkipped:  ' + dbSkipped + ' (DB row already at new mode OR no published row found)');
  console.log('  errors:     ' + errors.length);
  if (errors.length > 0) {
    console.log('');
    console.log('ERRORS (first 10):');
    errors.slice(0, 10).forEach(function (e) {
      console.log('  ' + e.entry.locale + '/' + e.entry.slug + ': ' + e.error);
    });
  }
  console.log('');
  console.log('Next: run republish-seo --language all --confirm to refresh deck.html SEO surfaces');
  console.log('      with the new mode-bearing titles + recompute DB hashes.');

  await db.disconnect();
}

if (require.main === module) {
  main().catch(function (e) { console.error('FATAL:', e); process.exit(1); });
}

module.exports = {
  walkDecks: walkDecks,
  classifyDeck: classifyDeck,
  APP_RULES: APP_RULES,
};
