#!/usr/bin/env node
/**
 * salvage-es-chartcount.js — fix the theme/slug defect on the 52 published es
 * chart-count decks (plan the-previous-session-was-declarative-charm, Phase 1).
 *
 * DEFECT: all 52 carry a wrong manifest.theme (one of 3 default labels —
 * accessories / post_office / occupations) + matching wrong seo_trace.themeName,
 * while their actual images span 50 real themes. The §15.16 reconcile gate is
 * BLIND to it (chart-count's exercises[0] is an object with an `icons` array,
 * not the .image/.path shape reconcileManifestTheme inspects).
 *
 * Per deck (URL-safe, the migrate-native-mode-slugs.js skeleton + theme fix):
 *   0. derive correct theme from icons[].theme (cross-checked vs path); halt
 *      on ambiguous (icons span 2+ themes) / unparseable (no signal).
 *   1. fix manifest.theme = correct; fix seo_trace.{title,description}.themeName
 *      .value = axes.theme.<correct>.name.es; set variant_id per collision policy
 *      (bare slug for the unique theme; keep existing variant_id for the LATER
 *      member of a same-theme collision pair so it disambiguates).
 *   2. new slug = slugify(deriveSeedFromManifest(corrected)). Skip if == current.
 *   3. rename <old>-vN → <new>-vN ; rewrite deck.html /es/decks/<old>/→/<new>/
 *      (atomic) ; symlink <new>→<new>-vN ; re-point <old>→<new>-vN (old URL
 *      stays 200, canonical→new — gen-old-slug-redirects.js then emits the 301
 *      map) ; DB Deck.slug=<new>.
 *
 * Idempotent (skip if already at new slug). Collision-safe (halt if <new> belongs
 * to a DIFFERENT deck, §15.13). Per-deck error isolation. Backs up each manifest
 * to manifest.json.salvage-backup before writing.
 *
 * Deck SEO regen (title/desc/og/alt/end-links from the corrected manifest) runs
 * AFTER, separately, as the documented cascade (republish-seo.js +
 * regenerate-og-images.js + rewrite-deck-html-alt-text.js +
 * inject-deck-end-topic-links.js), then gen-old-slug-redirects.js.
 *
 * Usage (on Hetzner, env loaded for DATABASE_URL):
 *   node scripts/publish-cli/salvage-es-chartcount.js --dry-run
 *   node scripts/publish-cli/salvage-es-chartcount.js --confirm
 */
'use strict';

var fs = require('fs');
var path = require('path');
var slug = require('./slug');
var db = require('./db');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE = 'es';
var PREFIX = 'contar-en-grafico';

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var CONFIRM = argv.includes('--confirm');
if (!DRY_RUN && !CONFIRM) { console.error('USAGE: --dry-run or --confirm required.'); process.exit(2); }
if (DRY_RUN && CONFIRM) { console.error('USAGE: --dry-run and --confirm are mutually exclusive.'); process.exit(2); }

function atomicWrite(p, content) {
  var tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, p);
}
function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch (e) { return false; } }

// Localized es display name for a theme axis-key, from the taxonomy slug.js loads.
function localizedThemeName(themeKey) {
  try {
    var entry = slug._TAXONOMY.axes.theme[themeKey];
    return (entry && entry.name && entry.name[LOCALE]) ? entry.name[LOCALE] : null;
  } catch (e) { return null; }
}

// Derive the single correct content theme from a chart-count manifest's icons.
// Returns { theme } or { halt, note }.
function deriveCorrectTheme(manifest) {
  var iconThemes = {}, pathThemes = {}, iconCount = 0;
  (manifest.exercises || []).forEach(function (ex) {
    var icons = (ex && ex.icons) || [];
    icons.forEach(function (ic) {
      iconCount++;
      if (ic.theme) iconThemes[ic.theme] = (iconThemes[ic.theme] || 0) + 1;
      var pt = ic.path ? slug.parseThemeFromImagePath(ic.path) : null;
      if (pt) pathThemes[pt] = (pathThemes[pt] || 0) + 1;
    });
  });
  var di = Object.keys(iconThemes), dp = Object.keys(pathThemes);
  if (iconCount === 0 || (di.length === 0 && dp.length === 0)) return { halt: 'halt-unparseable', note: 'no icon theme/path signal' };
  var theme = null;
  if (di.length === 1) theme = di[0];
  else if (di.length === 0 && dp.length === 1) theme = dp[0];
  if (!theme) return { halt: 'halt-ambiguous', note: 'icons span ' + di.length + ' themes: ' + di.join(',') };
  var disagree = dp.filter(function (t) { return t !== theme; });
  if (disagree.length) return { halt: 'halt-ambiguous', note: 'icon.theme=' + theme + ' but path themes also: ' + disagree.join(',') };
  return { theme: theme };
}

function bareSlugFor(manifest, correctTheme) {
  var m2 = Object.assign({}, manifest, { theme: correctTheme });
  delete m2.variant_id;
  return slug.slugify(slug.deriveSeedFromManifest(m2));
}
function variantSlugFor(manifest, correctTheme) {
  var m2 = Object.assign({}, manifest, { theme: correctTheme });
  return slug.slugify(slug.deriveSeedFromManifest(m2)); // keeps variant_id
}

// Apply the corrected theme + themeName to a manifest object in place.
function applyThemeFix(manifest, correctTheme, keepVariantId) {
  manifest.theme = correctTheme;
  var nm = localizedThemeName(correctTheme);
  if (nm && manifest.seo_trace) {
    ['title', 'description'].forEach(function (sec) {
      var t = manifest.seo_trace[sec] && manifest.seo_trace[sec].themeName;
      if (t && typeof t === 'object') { t.value = nm; t.source = 'salvage:taxonomy.axes.theme.' + correctTheme + '.name.es'; }
    });
  }
  if (!keepVariantId) delete manifest.variant_id;
  return nm;
}

function listDecks() {
  var localeDir = path.join(DECKS_ROOT, LOCALE);
  return fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    if (n.indexOf(PREFIX) !== 0) return false;
    if (/-v\d+$/.test(n)) return false; // bare slug symlinks only
    return true;
  });
}

async function main() {
  console.log('=== salvage-es-chartcount — ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + ' ===\n');
  var localeDir = path.join(DECKS_ROOT, LOCALE);
  var oldSlugs = listDecks();

  // PASS 1 — classify + read manifests
  var recs = []; // {oldSlug, targetDir, dirName, manifest, correctTheme, themeName, bareSlug, halt}
  var halts = [];
  oldSlugs.forEach(function (oldSlug) {
    var symlinkPath = path.join(localeDir, oldSlug);
    var st;
    try { st = fs.lstatSync(symlinkPath); } catch (e) { return; }
    if (!st.isSymbolicLink()) { return; }
    var target = fs.readlinkSync(symlinkPath);
    var dirName = path.basename(target);
    var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
    var mfp = path.join(targetDir, 'manifest.json');
    if (!fs.existsSync(mfp)) { halts.push({ oldSlug: oldSlug, halt: 'halt-no-manifest' }); return; }
    var m;
    try { m = JSON.parse(fs.readFileSync(mfp, 'utf8')); }
    catch (e) { halts.push({ oldSlug: oldSlug, halt: 'halt-parse', note: e.message }); return; }
    var d = deriveCorrectTheme(m);
    if (d.halt) { halts.push({ oldSlug: oldSlug, halt: d.halt, note: d.note }); return; }
    var bare = bareSlugFor(m, d.theme);
    recs.push({ oldSlug: oldSlug, targetDir: targetDir, dirName: dirName, manifest: m,
                correctTheme: d.theme, themeName: localizedThemeName(d.theme), bareSlug: bare });
  });

  // resolve bare-slug collisions: group by bareSlug, first (sorted) keeps bare,
  // rest keep variant_id (disambiguated slug).
  var byBare = {};
  recs.forEach(function (r) { (byBare[r.bareSlug] = byBare[r.bareSlug] || []).push(r); });
  Object.keys(byBare).forEach(function (b) {
    var group = byBare[b].sort(function (a, c) { return a.oldSlug < c.oldSlug ? -1 : 1; });
    group.forEach(function (r, i) {
      if (i === 0) { r.keepVariantId = false; r.newSlug = r.bareSlug; }
      else { r.keepVariantId = true; r.newSlug = variantSlugFor(r.manifest, r.correctTheme); }
    });
  });

  // PASS 2 — per deck: collision-check, (apply), report
  var stats = { reslug: 0, alreadyDone: 0, collisions: 0, errors: 0, missingThemeName: 0 };
  var preview = [], collisionList = [], errorList = [];

  for (var i = 0; i < recs.length; i++) {
    var r = recs[i];
    if (!r.themeName) { stats.missingThemeName++; errorList.push(r.oldSlug + ': no taxonomy name.es for theme ' + r.correctTheme); }
    if (r.newSlug === r.oldSlug) { stats.alreadyDone++; continue; }

    var newSymlink = path.join(localeDir, r.newSlug);
    var vm = /-v(\d+)$/.exec(r.dirName);
    var vSuffix = vm ? vm[0] : '-v1';
    var newDirName = r.newSlug + vSuffix;

    // collision: <new> symlink exists pointing at a DIFFERENT deck
    if (fs.existsSync(newSymlink)) {
      var existingTarget = fs.readlinkSync(newSymlink);
      if (path.basename(existingTarget) !== newDirName) {
        stats.collisions++; collisionList.push(r.oldSlug + ' → ' + r.newSlug + ' (symlink exists → ' + existingTarget + ')'); continue;
      }
    }
    try {
      var existingRow = await db.findExistingBySlug(LOCALE, r.newSlug);
      if (existingRow && existingRow.slug === r.newSlug) {
        // tolerate if it's THIS deck's row already migrated; else halt
        var thisRow = await db.findExistingBySlug(LOCALE, r.oldSlug);
        if (!thisRow || thisRow.id !== existingRow.id) {
          stats.collisions++; collisionList.push(r.oldSlug + ' → ' + r.newSlug + ' (DB row owns <new>)'); continue;
        }
      }
    } catch (e) { stats.errors++; errorList.push(r.oldSlug + ' db: ' + e.message); continue; }

    preview.push(r.oldSlug + '  →  ' + r.newSlug + '   [' + r.correctTheme + ' / ' + r.themeName + (r.keepVariantId ? ' / +variant_id' : '') + ']');

    if (CONFIRM) {
      try {
        // 1. fix manifest (backup first)
        var mfp = path.join(r.targetDir, 'manifest.json');
        if (!fs.existsSync(mfp + '.salvage-backup')) fs.copyFileSync(mfp, mfp + '.salvage-backup');
        applyThemeFix(r.manifest, r.correctTheme, r.keepVariantId);
        atomicWrite(mfp, JSON.stringify(r.manifest, null, 2));
        // 2. rename version dir
        var newDir = path.join(localeDir, newDirName);
        fs.renameSync(r.targetDir, newDir);
        // 3. rewrite deck.html URL frags
        var dh = path.join(newDir, 'deck.html');
        var html = fs.readFileSync(dh, 'utf8');
        var rewritten = html.split('/' + LOCALE + '/decks/' + r.oldSlug + '/').join('/' + LOCALE + '/decks/' + r.newSlug + '/');
        atomicWrite(dh, rewritten);
        // also move the manifest backup into the renamed dir is automatic (dir rename moves contents)
        // 4. symlinks: new self + old re-pointed
        try { fs.symlinkSync(newDirName, newSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }
        var oldSymlink = path.join(localeDir, r.oldSlug);
        try { fs.unlinkSync(oldSymlink); } catch (e) {}
        try { fs.symlinkSync(newDirName, oldSymlink); } catch (e) { if (e.code !== 'EEXIST') throw e; }
        // 5. DB slug
        var row = await db.findExistingBySlug(LOCALE, r.oldSlug);
        if (row && row.id) { await db.client().deck.update({ where: { id: row.id }, data: { slug: r.newSlug } }); }
        stats.reslug++;
      } catch (e) { stats.errors++; errorList.push(r.oldSlug + ' APPLY: ' + e.message); continue; }
    } else {
      stats.reslug++;
    }
  }

  console.log('decks scanned: ' + oldSlugs.length + ' | classified: ' + recs.length + ' | halts: ' + halts.length);
  console.log('re-slug' + (DRY_RUN ? ' (would)' : ' (applied)') + ': ' + stats.reslug + ' | already-done: ' + stats.alreadyDone + ' | collisions: ' + stats.collisions + ' | errors: ' + stats.errors + ' | missing-themeName: ' + stats.missingThemeName);
  if (halts.length) { console.log('\n=== HALTS (operator ruling) ==='); halts.forEach(function (h) { console.log('  ' + h.halt + ' | ' + h.oldSlug + (h.note ? ' | ' + h.note : '')); }); }
  if (collisionList.length) { console.log('\n=== COLLISIONS ==='); collisionList.forEach(function (c) { console.log('  - ' + c); }); }
  if (errorList.length) { console.log('\n=== ERRORS ==='); errorList.forEach(function (e) { console.log('  - ' + e); }); }
  console.log('\n=== old → new (all ' + preview.length + ') ===');
  preview.forEach(function (p) { console.log('  ' + p); });

  await db.disconnect();
  process.exit((stats.collisions > 0 || stats.errors > 0 || halts.length > 0) && CONFIRM ? 1 : 0);
}

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(1); });
