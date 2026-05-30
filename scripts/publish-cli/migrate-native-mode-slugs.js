#!/usr/bin/env node
/**
 * Migration (audit P2-04 / R7, FULL migration per operator): re-slug existing
 * non-EN deck URLs whose slug carries an English exercise-mode token, now that
 * topics-taxonomy.json axes.exercise-mode carries native slugs (Part 5A).
 *
 * Per deck: new slug = slugify(deriveSeedFromManifest(manifest)) using the
 * filled taxonomy. If it differs from the current slug, migrate URL-safely:
 *   1. rename version dir   <old>-vN          → <new>-vN
 *   2. create symlink       <new>             → <new>-vN
 *   3. re-point old symlink <old>             → <new>-vN   (old URL stays 200,
 *      canonical→new = soft consolidation; NO 404, no nginx 301 map needed)
 *   4. rewrite deck.html    /<loc>/decks/<old>/ → /<loc>/decks/<new>/ (atomic)
 *   5. DB                   Deck.slug = <new>
 *
 * Idempotent (skip if new==old, or if <new> symlink already resolves to this
 * deck). Collision-safe (halt-class if <new> belongs to a DIFFERENT deck —
 * §15.13). Per-deck error isolation. Per-locale staging.
 *
 * Cascade (run AFTER, separately): inject-deck-end-strip.js --rewrite +
 * populate-and-inject-hreflang.js --confirm (both re-query DB for fresh slugs).
 *
 * Usage:
 *   node scripts/publish-cli/migrate-native-mode-slugs.js --locale=de --dry-run
 *   node scripts/publish-cli/migrate-native-mode-slugs.js --locale=de --confirm
 * (env: frontend/.env.production loaded for DATABASE_URL)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var slug = require('./slug');
var db = require('./db');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var CANONICAL_BASE = 'https://www.lessoncraftstudio.com';
var NON_EN = ['de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var CONFIRM = argv.includes('--confirm');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;

if (!DRY_RUN && !CONFIRM) { console.error('USAGE: --dry-run or --confirm required.'); process.exit(2); }
if (DRY_RUN && CONFIRM) { console.error('USAGE: --dry-run and --confirm are mutually exclusive.'); process.exit(2); }

function atomicWrite(p, content) {
  var tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, p);
}

function deriveNativeSlug(manifest) {
  return slug.slugify(slug.deriveSeedFromManifest(manifest));
}

// Classify one deck. Returns { action, oldSlug, newSlug, ... }.
async function classify(locale, oldSlug) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var symlinkPath = path.join(localeDir, oldSlug);
  var stat;
  try { stat = fs.lstatSync(symlinkPath); } catch (e) { return { action: 'skip-no-symlink' }; }
  if (!stat.isSymbolicLink()) return { action: 'skip-not-symlink' };
  var target = fs.readlinkSync(symlinkPath); // e.g. "<old>-vN"
  var dirName = path.basename(target);
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var manifestPath = path.join(targetDir, 'manifest.json');
  var deckHtmlPath = path.join(targetDir, 'deck.html');
  if (!fs.existsSync(manifestPath) || !fs.existsSync(deckHtmlPath)) return { action: 'skip-missing-files' };

  var manifest;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
  catch (e) { return { action: 'error', note: 'manifest parse: ' + e.message }; }

  var newSlug = deriveNativeSlug(manifest);
  if (!newSlug) return { action: 'error', note: 'empty derived slug' };
  if (newSlug === oldSlug) return { action: 'skip-already-native', oldSlug: oldSlug };

  // Version suffix (-vN) from the current dir name.
  var vm = /-v(\d+)$/.exec(dirName);
  var vSuffix = vm ? vm[0] : '-v1';
  var newDirName = newSlug + vSuffix;

  // Collision: does <new> already exist as a different deck?
  var newSymlink = path.join(localeDir, newSlug);
  if (fs.existsSync(newSymlink)) {
    var existingTarget = fs.readlinkSync(newSymlink);
    if (path.basename(existingTarget) !== newDirName) {
      return { action: 'halt-collision', oldSlug: oldSlug, newSlug: newSlug, note: 'symlink <new> exists → ' + existingTarget };
    }
    return { action: 'skip-already-migrated', oldSlug: oldSlug, newSlug: newSlug };
  }
  // DB collision (a different published row already owns <new>).
  try {
    var existingRow = await db.findExistingBySlug(locale, newSlug);
    if (existingRow && existingRow.slug === newSlug) {
      return { action: 'halt-collision', oldSlug: oldSlug, newSlug: newSlug, note: 'DB row already owns <new>' };
    }
  } catch (e) { return { action: 'error', note: 'db lookup: ' + e.message }; }

  return {
    action: 're-slug', oldSlug: oldSlug, newSlug: newSlug,
    localeDir: localeDir, oldDir: targetDir, oldDirName: dirName, newDirName: newDirName,
    deckHtmlOldPath: deckHtmlPath,
  };
}

async function apply(locale, c) {
  var localeDir = c.localeDir;
  var newDir = path.join(localeDir, c.newDirName);
  var oldDir = c.oldDir;
  var oldSymlink = path.join(localeDir, c.oldSlug);
  var newSymlink = path.join(localeDir, c.newSlug);

  // 1. rename version dir <old>-vN → <new>-vN
  fs.renameSync(oldDir, newDir);
  // 2. deck.html slug rewrite (atomic) — global replace of /<loc>/decks/<old>/
  var dh = path.join(newDir, 'deck.html');
  var html = fs.readFileSync(dh, 'utf8');
  var oldUrlFrag = '/' + locale + '/decks/' + c.oldSlug + '/';
  var newUrlFrag = '/' + locale + '/decks/' + c.newSlug + '/';
  var rewritten = html.split(oldUrlFrag).join(newUrlFrag);
  atomicWrite(dh, rewritten);
  // 3. create new symlink <new> → <new>-vN
  try { fs.symlinkSync(c.newDirName, newSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }
  // 4. re-point old symlink <old> → <new>-vN (keep old URL alive, canonical→new)
  try { fs.unlinkSync(oldSymlink); } catch (e) { /* may already be gone */ }
  try { fs.symlinkSync(c.newDirName, oldSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }
  // 5. DB slug update
  var row = await db.findExistingBySlug(locale, c.oldSlug);
  if (row && row.id) {
    await db.client().deck.update({ where: { id: row.id }, data: { slug: c.newSlug } });
  }
}

async function main() {
  console.log('=== migrate-native-mode-slugs — ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + ' ===');
  console.log('locale: ' + (TARGET_LOCALE || 'all non-EN') + '  limit: ' + (LIMIT === Infinity ? 'none' : LIMIT));
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : NON_EN;
  var grand = { reslug: 0, alreadyNative: 0, alreadyMigrated: 0, collisions: 0, skipped: 0, errors: 0 };
  var collisionList = [];
  var sampleByLocale = {};
  var errorList = [];

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) continue;
    var slugs = fs.readdirSync(localeDir).filter(function (n) {
      if (n.charAt(0) === '.') return false;
      return !/-v\d+$/.test(n); // bare slug symlinks only
    });
    var per = { reslug: 0, alreadyNative: 0, collisions: 0, errors: 0, processed: 0 };
    for (var si = 0; si < slugs.length; si++) {
      if (per.processed >= LIMIT) break;
      per.processed++;
      var c;
      try { c = await classify(locale, slugs[si]); }
      catch (e) { grand.errors++; per.errors++; errorList.push(locale + '/' + slugs[si] + ': ' + e.message); continue; }
      if (c.action === 're-slug') {
        if (!sampleByLocale[locale]) sampleByLocale[locale] = c.oldSlug + ' → ' + c.newSlug;
        if (CONFIRM) {
          try { await apply(locale, c); }
          catch (e) { grand.errors++; per.errors++; errorList.push(locale + '/' + c.oldSlug + ' APPLY: ' + e.message); continue; }
        }
        grand.reslug++; per.reslug++;
      } else if (c.action === 'skip-already-native') { grand.alreadyNative++; per.alreadyNative++; }
      else if (c.action === 'skip-already-migrated') { grand.alreadyMigrated++; }
      else if (c.action === 'halt-collision') { grand.collisions++; per.collisions++; collisionList.push(locale + ': ' + c.oldSlug + ' → ' + c.newSlug + ' (' + c.note + ')'); }
      else if (c.action === 'error') { grand.errors++; per.errors++; errorList.push(locale + '/' + slugs[si] + ': ' + c.note); }
      else { grand.skipped++; }
    }
    console.log('[' + locale + '] ' + slugs.length + ' decks | re-slug=' + per.reslug + ' already-native=' + per.alreadyNative + ' collisions=' + per.collisions + ' errors=' + per.errors + (sampleByLocale[locale] ? ('  e.g. ' + sampleByLocale[locale]) : ''));
  }

  console.log('');
  console.log('=== TOTAL ===');
  console.log('  re-slug' + (DRY_RUN ? ' (would)' : ' (applied)') + ': ' + grand.reslug);
  console.log('  already-native:   ' + grand.alreadyNative);
  console.log('  already-migrated: ' + grand.alreadyMigrated);
  console.log('  COLLISIONS:       ' + grand.collisions);
  console.log('  errors:           ' + grand.errors);
  if (collisionList.length) { console.log('\n=== COLLISIONS (review per §15.13) ==='); collisionList.slice(0, 40).forEach(function (c) { console.log('  - ' + c); }); }
  if (errorList.length) { console.log('\n=== ERRORS (first 20) ==='); errorList.slice(0, 20).forEach(function (e) { console.log('  - ' + e); }); }

  await db.disconnect();
  process.exit((grand.collisions > 0 || grand.errors > 0) && CONFIRM ? 1 : 0);
}

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(1); });
