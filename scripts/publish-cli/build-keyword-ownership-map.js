#!/usr/bin/env node
'use strict';

/**
 * build-keyword-ownership-map.js (v2) — LOCKED keyword-ownership map.
 *
 * Part 4 of the thin-page remediation. Consumes the native-expert per-locale
 * keyword GRAMMAR in keyword-specs.js and assigns every LIVE page exactly one
 * primary keyword (+ 3 secondaries), collision-free within locale:
 *   - single-axis  : primary = grammar[axis](localized name); secondaries from template
 *   - intersection : primary composed from the two localized axis names per pair template
 *   - hub          : per-locale hub primary
 *   - activity     : the activity's localized page_title
 * Runs keyword-ownership.detectPrimaryCollisions; exits nonzero if any LOCKED
 * entry collides (or always, with --strict). Data artifact only — no deploy.
 *
 * Usage:
 *   node scripts/publish-cli/build-keyword-ownership-map.js --baseline=docs/audit-results/seo-100pct-baseline-XXXX.json
 *   node scripts/publish-cli/build-keyword-ownership-map.js --strict
 */

var path = require('path');
var fs = require('fs');
var thin = require('./audit-thin-pages');
var ko = require('./keyword-ownership');
var specsMod = require('./keyword-specs');

var SPECS = specsMod.SPECS, PAIR_AXES = specsMod.PAIR_AXES, fill = specsMod.fill;

var REPO_ROOT = path.resolve(__dirname, '..', '..');
var TAXONOMY_PATH = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');
var AUDIT_DIR = path.join(REPO_ROOT, 'docs', 'audit-results');
var MINI_TOOLS_DIR = path.join(REPO_ROOT, 'mini tools');
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

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

// Keyword-facing name: level overrides (descriptor-differentiation locales) +
// parenthetical strip; falls back to the raw axis key.
function nameForKeyword(tx, axis, key, locale) {
  if (axis === 'educational-level') {
    var ov = specsMod.LEVEL_KEYWORD[locale] && specsMod.LEVEL_KEYWORD[locale][key];
    if (ov) return ov;
  }
  return specsMod.cleanName(axisName(tx, axis, key, locale) || key);
}

function loadActivityTitles() {
  var map = {};
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

function derive(page, tx, activityTitles) {
  var loc = page.locale;
  var spec = SPECS[loc];
  if (!spec) return { primary: null, secondaries: [], source: 'no-spec' };

  if (page.pageType === 'topic-single') {
    var nm = nameForKeyword(tx, page.axis, page.axisKey, loc);
    var primary = fill(spec.grammar[page.axis], { name: nm });
    var secondaries = (spec.secondaryTemplate || []).map(function (t) { return fill(t, { name: nm }); });
    return { primary: primary, secondaries: secondaries, source: 'grammar' };
  }

  if (page.pageType === 'topic-intersection') {
    var axes = PAIR_AXES[page.axisPair];
    var parts = String(page.axisKey).split('__');
    if (!axes || parts.length !== 2) return { primary: null, secondaries: [], source: 'intersection-unresolved' };
    var n1 = nameForKeyword(tx, axes[0], parts[0], loc);
    var n2 = nameForKeyword(tx, axes[1], parts[1], loc);
    var vars = {};
    if (axes[0] === 'theme' && axes[1] === 'educational-level') { vars = { theme: n1, level: n2 }; }
    else if (axes[0] === 'theme' && axes[1] === 'exercise-type') { vars = { theme: n1, type: n2 }; }
    else { vars = { level: n1, type: n2 }; }
    var pairKey = axes[0] + '__' + axes[1];
    var iprimary = fill(spec.intersection[pairKey], vars);
    // secondaries: each component's single-axis primary + one generic
    var sec = [
      fill(spec.grammar[axes[0]], { name: n1 }),
      fill(spec.grammar[axes[1]], { name: n2 }),
    ];
    if ((spec.secondaryTemplate || [])[0]) sec.push(fill(spec.secondaryTemplate[0], { name: (vars.type || n2) }));
    return { primary: iprimary, secondaries: sec.filter(Boolean), source: 'grammar-intersection' };
  }

  if (page.pageType === 'hub') {
    return { primary: (spec.hub && spec.hub[page.axisKey]) || page.axisKey, secondaries: [], source: 'hub' };
  }

  if (page.pageType === 'activity') {
    var titles = activityTitles[page.axisKey] || {};
    return { primary: titles[loc] || titles.en || page.axisKey, secondaries: [], source: 'activity' };
  }

  return { primary: page.axisKey, secondaries: [], source: 'unknown' };
}

function main() {
  var opts = parseArgs(process.argv);
  var baselinePath = opts.baseline || findLatestBaseline(opts.outDir);
  if (!baselinePath || !fs.existsSync(baselinePath)) {
    console.error('[fatal] No baseline JSON found. Pass --baseline=<path>.');
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
  var lockedAt = new Date().toISOString();

  var map = {
    $schemaVersion: 2,
    generatedAt: lockedAt,
    baseline: baselinePath,
    config: { locales: opts.locales, minSecondary: 3 },
    pages: {},
    collisions: [],
  };

  var noPrimary = 0;
  pages.forEach(function (page) {
    var d = derive(page, tx, activityTitles);
    if (!d.primary) noPrimary++;
    map.pages[page.pageKey] = {
      locale: page.locale,
      pageType: page.pageType,
      axis: page.axis,
      axisKey: page.axisKey,
      url: page.url,
      primaryKeyword: d.primary,
      secondaryKeywords: d.secondaries || [],
      source: d.source,
      needsReview: (d.source === 'activity'),
      lockedAt: lockedAt,
    };
  });

  var collisions = ko.detectPrimaryCollisions(map);
  map.collisions = collisions;

  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir, { recursive: true });
  var outPath = path.join(opts.outDir, 'keyword-ownership-map.json');
  fs.writeFileSync(outPath, JSON.stringify(map, null, 2));

  var pageCount = Object.keys(map.pages).length;
  console.log('[keyword-ownership-map v2] pages: ' + pageCount + ' across ' + opts.locales.length + ' locales');
  console.log('[keyword-ownership-map v2] pages with no primary: ' + noPrimary);
  console.log('[keyword-ownership-map v2] within-locale primary collisions: ' + collisions.length);
  collisions.slice(0, 25).forEach(function (c) {
    console.log('  - [' + c.locale + '] "' + c.primaryKeyword + '" -> ' + c.pageKeys.length + ' pages: ' + c.pageKeys.slice(0, 4).join(', '));
  });
  console.log('[output] ' + outPath);

  process.exit((opts.strict && collisions.length > 0) || noPrimary > 0 ? 1 : 0);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error('[fatal] ' + (e.stack || e.message || String(e))); process.exit(2); }
}

module.exports = { derive: derive };
