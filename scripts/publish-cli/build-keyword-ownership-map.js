#!/usr/bin/env node
'use strict';

/**
 * build-keyword-ownership-map.js — seed the per-page primary-keyword ownership
 * map (docs/audit-results/keyword-ownership-map.json) for the thin-page
 * remediation program (Part 1).
 *
 * One live page -> exactly one primary keyword, unique within locale. The map
 * is the anti-cannibalization backbone: Phase 3 prose is authored TO each
 * page's assigned primary, and the Phase 5 gate rejects any new page that
 * steals an owned primary.
 *
 * SEED behaviour: the primary is auto-derived from the page's localized axis
 * NAME (the natural head term) — a starting anchor flagged source:"seed-derived"
 * + needsReview:true. Native-expert ensembles (§A.13.48) refine each primary +
 * add secondaries during the per-locale Phase 3 commissions, then set
 * lockedAt. The seller-era keyword-ownership-baseline.json (2026-02-20) is NOT
 * imported as page inventory (its theme-hub/product pages predate the K-3
 * pivot); it is referenced by humans only as a keyword-vocabulary hint.
 *
 * Collision policy: detectPrimaryCollisions runs on every build and is written
 * into the map. The process exits nonzero only when a LOCKED entry collides
 * (lockedAt != null) OR --strict is passed — so the Part-1 seed run succeeds
 * while still surfacing any seed collisions for Phase 2 to resolve.
 *
 * Read-only except for the map output. Usage:
 *   node scripts/publish-cli/build-keyword-ownership-map.js
 *   node scripts/publish-cli/build-keyword-ownership-map.js --baseline=<path> --locales=en,es,pt
 *   node scripts/publish-cli/build-keyword-ownership-map.js --strict
 */

var path = require('path');
var fs = require('fs');

var thin = require('./audit-thin-pages');
var ko = require('./keyword-ownership');

var REPO_ROOT = path.resolve(__dirname, '..', '..');
var TAXONOMY_PATH = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');
var AUDIT_DIR = path.join(REPO_ROOT, 'docs', 'audit-results');
var MINI_TOOLS_DIR = path.join(REPO_ROOT, 'mini tools');
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Pair label -> [axis1, axis2] so we can resolve intersection key1__key2 names.
var PAIR_AXES = {
  'theme×educational-level': ['theme', 'educational-level'],
  'theme×exercise-type': ['theme', 'exercise-type'],
  'educational-level×exercise-type': ['educational-level', 'exercise-type'],
};

// English hub primaries (other locales seed with the localized hub label +
// needsReview; native review supplies the real head term).
var HUB_PRIMARY_EN = {
  worksheets: 'printable worksheets',
  topic: 'worksheet topics',
  activities: 'interactive learning activities',
};

function parseArgs(argv) {
  var out = { baseline: null, locales: ALL_LOCALES.slice(), outDir: AUDIT_DIR, strict: false };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--baseline=') === 0) out.baseline = path.resolve(a.slice('--baseline='.length));
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice('--out-dir='.length));
    else if (a === '--strict') out.strict = true;
    else if (a === '--help' || a === '-h') { console.log('Usage: node build-keyword-ownership-map.js [--baseline=path] [--locales=..] [--strict]'); process.exit(0); }
  });
  return out;
}

function findLatestBaseline(dir) {
  if (!fs.existsSync(dir)) return null;
  var files = fs.readdirSync(dir).filter(function (f) { return /^seo-100pct-baseline-.*\.json$/.test(f); });
  if (files.length === 0) return null;
  files.sort();
  return path.join(dir, files[files.length - 1]);
}

function axisName(tx, axis, key, locale) {
  var block = tx.axes && tx.axes[axis];
  var entry = block && block[key];
  if (!entry || !entry.name) return null;
  return entry.name[locale] || entry.name.en || null;
}

function loadActivityTitles() {
  var map = {}; // "<tool>:<id>" -> {locale: page_title}
  if (!fs.existsSync(MINI_TOOLS_DIR)) return map;
  fs.readdirSync(MINI_TOOLS_DIR).filter(function (f) { return /-activities\.json$/.test(f); }).forEach(function (f) {
    try {
      var data = JSON.parse(fs.readFileSync(path.join(MINI_TOOLS_DIR, f), 'utf8'));
      var arr = Array.isArray(data) ? data : (data.rows || data.activities || []);
      arr.forEach(function (r) { map[(r.tool || 'engine') + ':' + (r.id || '')] = r.page_title || {}; });
    } catch (e) { /* skip */ }
  });
  return map;
}

function derivePrimary(page, tx, activityTitles) {
  var loc = page.locale;
  var isEn = loc === 'en';

  if (page.pageType === 'topic-single') {
    var nm = axisName(tx, page.axis, page.axisKey, loc) || page.axisKey;
    return isEn ? (nm + ' worksheets') : nm; // non-en: localized head term (needsReview)
  }
  if (page.pageType === 'topic-intersection') {
    var axes = PAIR_AXES[page.axisPair] || null;
    var parts = String(page.axisKey).split('__');
    var n1 = axes ? (axisName(tx, axes[0], parts[0], loc) || parts[0]) : parts[0];
    var n2 = axes ? (axisName(tx, axes[1], parts[1], loc) || parts[1]) : parts[1];
    var joined = n1 + ' ' + n2;
    return isEn ? (joined + ' worksheets') : joined;
  }
  if (page.pageType === 'hub') {
    if (isEn) return HUB_PRIMARY_EN[page.axisKey] || page.axisKey;
    return page.axisKey; // localized label resolved at review time
  }
  if (page.pageType === 'activity') {
    var titles = activityTitles[page.axisKey] || {};
    return titles[loc] || titles.en || page.axisKey;
  }
  return page.axisKey;
}

function main() {
  var opts = parseArgs(process.argv);
  var baselinePath = opts.baseline || findLatestBaseline(opts.outDir);
  if (!baselinePath || !fs.existsSync(baselinePath)) {
    console.error('[fatal] No baseline JSON found. Run audit-published-baseline.js on Hetzner first, or pass --baseline=<path>.');
    process.exit(2);
  }
  var tx = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  var baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  var decks = Array.isArray(baseline.decks) ? baseline.decks : [];

  var liveness = thin.buildLivenessIndex(decks, tx);
  var pages = thin.enumerateLivePages(tx, liveness, {
    baseUrl: 'https://www.lessoncraftstudio.com',
    locales: opts.locales,
    pageTypes: ['topic-single', 'topic-intersection', 'hub', 'activity'],
  });
  var activityTitles = loadActivityTitles();

  var map = {
    $schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    baseline: baselinePath,
    config: { locales: opts.locales, minSecondary: 3, maxSecondary: 9 },
    pages: {},
    collisions: [],
  };

  pages.forEach(function (page) {
    var primary = derivePrimary(page, tx, activityTitles);
    map.pages[page.pageKey] = {
      locale: page.locale,
      pageType: page.pageType,
      axis: page.axis,
      axisKey: page.axisKey,
      url: page.url,
      primaryKeyword: primary,
      secondaryKeywords: [],
      source: 'seed-derived',
      needsReview: true,
      lockedAt: null,
    };
  });

  var collisions = ko.detectPrimaryCollisions(map);
  map.collisions = collisions;

  var stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir, { recursive: true });
  var outPath = path.join(opts.outDir, 'keyword-ownership-map.json');
  fs.writeFileSync(outPath, JSON.stringify(map, null, 2));

  var pageCount = Object.keys(map.pages).length;
  console.log('[keyword-ownership-map] pages: ' + pageCount + ' across ' + opts.locales.length + ' locales');
  console.log('[keyword-ownership-map] collisions (within-locale primary): ' + collisions.length);
  collisions.slice(0, 20).forEach(function (c) {
    console.log('  - [' + c.locale + '] "' + c.primaryKeyword + '" -> ' + c.pageKeys.join(', '));
  });
  console.log('[output] ' + outPath + ' (stamp ' + stamp + ')');

  var lockedCollisions = collisions.filter(function (c) {
    return c.pageKeys.some(function (pk) { return map.pages[pk] && map.pages[pk].lockedAt; });
  });
  var fail = opts.strict ? collisions.length > 0 : lockedCollisions.length > 0;
  process.exit(fail ? 1 : 0);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error('[fatal] ' + (e.stack || e.message || String(e))); process.exit(2); }
}

module.exports = { derivePrimary: derivePrimary };
