#!/usr/bin/env node
/*
 * classify-es-chartcount-themes.js — READ-ONLY pre-pass for the es chart-count
 * theme/slug salvage (Phase 1, plan the-previous-session-was-declarative-charm).
 *
 * The 52 published es chart-count decks carry a wrong manifest.theme (one of 3
 * default labels: accessories / post_office / occupations) while their actual
 * images span ~50 real themes. The §15.16 reconcile gate is BLIND to this
 * because chart-count's exercises[0] is an object with an `icons` array (not the
 * .image/.path shape reconcileManifestTheme inspects), so it reports CLEAN.
 *
 * This pre-pass derives the CORRECT theme from icons[].theme (cross-checked vs
 * parseThemeFromImagePath on icons[].path), classifies each deck, computes the
 * resulting new native-es slug via deriveSeedFromManifest, and surfaces:
 *   - halt-ambiguous: icons span 2+ distinct real themes (no single content theme)
 *   - halt-unparseable: no icons / no theme signal at all
 *   - rewrite: single clean correct theme != declared
 *   - clean: declared already correct
 *   - slug collisions: 2+ decks mapping to the same new slug (need variant_id)
 *
 * NO filesystem writes. Run on Hetzner where the decks live.
 *   node /tmp/classify-es-chartcount-themes.js
 */
'use strict';
var fs = require('fs');
var path = require('path');
var slug = require('/opt/lessoncraftstudio/scripts/publish-cli/slug.js');

var ROOT = '/var/www/lcs-media/decks/es';
var entries = fs.readdirSync(ROOT).filter(function (n) {
  return n.indexOf('contar-en-grafico') === 0 && n[0] !== '.';
});

function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch (e) { return false; } }

var rows = [];
entries.forEach(function (name) {
  var dir = path.join(ROOT, name);
  if (!isDir(dir)) return;
  // skip the raw -vN version dirs; classify by the slug-named symlink/dir
  if (/-v\d+$/.test(name)) return;
  var mfp = path.join(dir, 'manifest.json');
  if (!fs.existsSync(mfp)) return;
  var m;
  try { m = JSON.parse(fs.readFileSync(mfp, 'utf8')); } catch (e) {
    rows.push({ slug: name, action: 'halt-unparseable', note: 'manifest parse error' });
    return;
  }
  var declared = m.theme || null;

  // gather icon themes + path-derived themes across all exercises
  var iconThemes = {}, pathThemes = {}, iconCount = 0;
  (m.exercises || []).forEach(function (ex) {
    var icons = (ex && ex.icons) || [];
    icons.forEach(function (ic) {
      iconCount++;
      if (ic.theme) iconThemes[ic.theme] = (iconThemes[ic.theme] || 0) + 1;
      var pt = ic.path ? slug.parseThemeFromImagePath(ic.path) : null;
      if (pt) pathThemes[pt] = (pathThemes[pt] || 0) + 1;
    });
  });
  var distinctIcon = Object.keys(iconThemes);
  var distinctPath = Object.keys(pathThemes);

  var row = { slug: name, declared: declared, iconCount: iconCount,
              iconThemes: distinctIcon, pathThemes: distinctPath };

  if (iconCount === 0 || (distinctIcon.length === 0 && distinctPath.length === 0)) {
    row.action = 'halt-unparseable';
    row.note = 'no icon theme/path signal';
    rows.push(row); return;
  }
  // determine the single content theme
  var correct = null;
  if (distinctIcon.length === 1) correct = distinctIcon[0];
  else if (distinctIcon.length === 0 && distinctPath.length === 1) correct = distinctPath[0];

  if (!correct) {
    row.action = 'halt-ambiguous';
    row.note = 'icons span ' + distinctIcon.length + ' themes: ' + distinctIcon.join(',');
    rows.push(row); return;
  }
  // cross-check: every icon.theme==correct AND path agrees (when present)
  var pathDisagree = distinctPath.filter(function (t) { return t !== correct; });
  if (pathDisagree.length) {
    row.action = 'halt-ambiguous';
    row.note = 'icon.theme=' + correct + ' but path themes also: ' + pathDisagree.join(',');
    rows.push(row); return;
  }

  row.correct = correct;
  var decN = declared ? String(declared).replace(/-/g, '_').toLowerCase() : null;
  var corN = String(correct).replace(/-/g, '_').toLowerCase();
  row.action = (decN === corN) ? 'clean' : 'rewrite';

  // compute new slug seed with corrected theme
  var m2 = Object.assign({}, m, { theme: correct });
  delete m2.variant_id; // base slug (collisions get variant_id later)
  var seed = slug.deriveSeedFromManifest(m2);
  row.newSlug = slug.slugify(seed);
  rows.push(row);
});

// summary
var byAction = {};
rows.forEach(function (r) { byAction[r.action] = (byAction[r.action] || 0) + 1; });
console.log('=== es chart-count theme classification (', rows.length, 'decks) ===');
console.log('by action:', JSON.stringify(byAction));

var halts = rows.filter(function (r) { return /halt/.test(r.action); });
console.log('\n--- HALTS (need operator ruling) ---');
if (!halts.length) console.log('  none');
halts.forEach(function (r) { console.log('  ', r.action, '|', r.slug, '|', r.note, '| iconThemes=', JSON.stringify(r.iconThemes)); });

// distinct corrected themes
var themeSet = {};
rows.forEach(function (r) { if (r.correct) themeSet[r.correct] = (themeSet[r.correct] || 0) + 1; });
console.log('\n--- distinct CORRECTED content themes:', Object.keys(themeSet).length, '---');
console.log('  ', JSON.stringify(themeSet));

// new-slug collisions (decks mapping to same new slug → need variant_id)
var slugMap = {};
rows.forEach(function (r) { if (r.newSlug) (slugMap[r.newSlug] = slugMap[r.newSlug] || []).push(r.slug); });
var collisions = Object.keys(slugMap).filter(function (s) { return slugMap[s].length > 1; });
console.log('\n--- new-slug COLLISIONS (need variant_id):', collisions.length, '---');
collisions.forEach(function (s) { console.log('  ', s, '<-', slugMap[s].join(', ')); });

// full old->correct-theme->new map sample
console.log('\n--- sample old -> theme -> new (first 12 rewrites) ---');
rows.filter(function (r) { return r.action === 'rewrite'; }).slice(0, 12).forEach(function (r) {
  console.log('  ', r.slug, '->', r.correct, '->', r.newSlug, '(declared:', r.declared + ')');
});
console.log('\n--- clean (declared already correct):', byAction.clean || 0, '---');
rows.filter(function (r) { return r.action === 'clean'; }).forEach(function (r) {
  console.log('  ', r.slug, '(theme', r.correct + ')');
});
