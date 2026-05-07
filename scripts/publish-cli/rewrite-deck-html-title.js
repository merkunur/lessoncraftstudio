#!/usr/bin/env node
/**
 * One-shot retrofitter: injects the theme display name into the deck.html SEO
 * surface (title + meta description + Schema.org name + description) for decks
 * that were generated BEFORE commit 0e5f1560 (2026-05-07T13:40Z) — when the
 * 28-app sweep added bundle.seoMeta.themeName population. Pre-sweep bundles
 * are baked WITHOUT seoMeta, so LCSCatalogExport.buildSeoHead() falls back to
 * the no-theme title format.
 *
 * Affected decks: ~1,200 of 1,629 published per the §A.14.8 audit run on
 * 2026-05-07. Operator regeneration of all affected decks is impractical
 * (hours of manual click-flow); in-place patch is the canonical §15.17
 * salvage-script path.
 *
 * Per-deck pipeline (per CLAUDE.md §15.17):
 *   1. Read deck.html
 *   2. Extract DECK_BUNDLE via regex; parse JSON
 *   3. Theme signal: bundle.imagePlacements[0].theme (raw snake_case slug)
 *   4. Display name: lookup axes.theme.<key>.name.<locale> in topics-taxonomy.json,
 *      fallback to title-case snake_case if missing
 *   5. Rewrite 4 SEO surfaces: <title>, <meta name="description">,
 *      Schema.org JSON-LD `name`, JSON-LD `description`
 *   6. Atomic write (tmp + rename) per rewrite-canonical-host.js precedent
 *   7. Idempotent: re-runs report skip-already-themed
 *
 * Cloudflare 5-min TTL refreshes edge cache automatically per §15.8.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-title.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');

// Path to topics-taxonomy.json — relative to this script file.
var TAXONOMY_PATH = path.join(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

// Lazy-loaded; failure here halts the script (no fallback to filesystem search).
var TAXONOMY = null;
function loadTaxonomy() {
  if (TAXONOMY) return TAXONOMY;
  var raw = fs.readFileSync(TAXONOMY_PATH, 'utf8');
  TAXONOMY = JSON.parse(raw);
  return TAXONOMY;
}

var SUFFIX = ' | LessonCraftStudio';
var EM = ' — ';                             // " — "
var TITLE_RE = /<title>([^<]+)<\/title>/;
var META_DESC_RE = /<meta name="description" content="([^"]+)">/;
var LD_BLOCK_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
var BUNDLE_RE = /var\s+DECK_BUNDLE\s*=\s*(\{[\s\S]*?\});\s*<\/script>/;

/** Title-case fallback: "4th_of_july" → "4th Of July", "farm_animals" → "Farm Animals". */
function titleCaseSnake(s) {
  return String(s || '').split('_').map(function (w) {
    if (w.length === 0) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

/** Look up display name; fallback to title-case if missing in taxonomy. */
function deriveThemeName(themeKey, locale) {
  if (!themeKey) return null;
  var tax = loadTaxonomy();
  var node = tax && tax.axes && tax.axes.theme && tax.axes.theme[themeKey];
  var name = node && node.name && node.name[locale];
  if (name) return String(name);
  // Fallback: english name in taxonomy if locale-specific missing
  var nameEn = node && node.name && node.name.en;
  if (nameEn) return String(nameEn);
  // Final fallback: title-case the snake_case slug
  return titleCaseSnake(themeKey);
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/** Parse the bundle JSON. Returns { bundle, raw } or null on parse failure. */
function extractBundle(html) {
  var m = html.match(BUNDLE_RE);
  if (!m) return null;
  try {
    return { bundle: JSON.parse(m[1]), raw: m[1] };
  } catch (e) {
    return null;
  }
}

/**
 * Rebuild title with theme injected. Handles both 2-segment (no theme) and
 * 3-segment (already-themed) source titles.
 *
 * Returns { newTitleCore, newTitleFull, prefix, eduLevel } or null if title
 * structure is unparseable.
 */
function rebuildTitle(oldTitle, themeName) {
  if (!oldTitle.endsWith(SUFFIX)) return null;
  var core = oldTitle.slice(0, -SUFFIX.length);
  var parts = core.split(EM);
  if (parts.length < 2 || parts.length > 3) return null;
  var prefix = parts[0];                          // "Word Guess Practice Worksheet"
  var eduLevel = parts[parts.length - 1];         // "Kindergarten"
  var newCore = prefix + EM + themeName + EM + eduLevel;
  return {
    newTitleCore: newCore,
    newTitleFull: newCore + SUFFIX,
    prefix: prefix,
    eduLevel: eduLevel
  };
}

/**
 * Rewrite meta description content with theme injected. Anchored on
 * "Worksheet for" (no theme) or "Worksheet (Old) for" (already-themed).
 *
 * Returns the new description string or null if not parseable.
 */
function rebuildDescription(oldDesc, themeName) {
  // Pattern 1: ' (...) for ' (already has theme parens) — replace contents
  var withTheme = / \(([^)]+)\) for /;
  if (withTheme.test(oldDesc)) {
    return oldDesc.replace(withTheme, ' (' + themeName + ') for ');
  }
  // Pattern 2: 'Worksheet for ' (no theme) — insert ' (Theme)' before ' for '
  // Use first occurrence of ' for ' as the anchor
  var idx = oldDesc.indexOf(' for ');
  if (idx === -1) return null;
  return oldDesc.slice(0, idx) + ' (' + themeName + ')' + oldDesc.slice(idx);
}

function processFile(filepath, dryRun) {
  var html;
  try {
    html = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    return { file: filepath, action: 'skip-read-error', note: e.message };
  }

  var bundleInfo = extractBundle(html);
  if (!bundleInfo) {
    return { file: filepath, action: 'halt-bundle-parse-failed' };
  }
  var bundle = bundleInfo.bundle;
  var imagePlacements = bundle && bundle.imagePlacements;
  var theme = imagePlacements && imagePlacements[0] && imagePlacements[0].theme;
  if (!theme) {
    return { file: filepath, action: 'skip-themeless' };
  }
  var locale = (bundle.contentLanguage || 'en').slice(0, 2);
  var themeName = deriveThemeName(theme, locale);
  if (!themeName) {
    return { file: filepath, action: 'halt-no-display-name', note: 'theme=' + theme };
  }

  // Title rewrite
  var titleMatch = html.match(TITLE_RE);
  if (!titleMatch) return { file: filepath, action: 'halt-no-title' };
  var oldTitle = titleMatch[1];
  // Decode HTML entities (the served title is HTML-escaped: &mdash; or &#x2014;)
  var oldTitleDecoded = oldTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var titleResult = rebuildTitle(oldTitleDecoded, themeName);
  if (!titleResult) return { file: filepath, action: 'halt-title-unparseable', note: oldTitleDecoded };

  // Idempotency: if already-themed and the old theme === new theme, skip
  if (oldTitleDecoded === titleResult.newTitleFull) {
    return { file: filepath, action: 'skip-already-themed' };
  }

  // Meta description rewrite
  var descMatch = html.match(META_DESC_RE);
  var newDesc = null;
  if (descMatch) {
    newDesc = rebuildDescription(descMatch[1], themeName);
    if (!newDesc) return { file: filepath, action: 'halt-desc-unparseable', note: descMatch[1] };
  }

  // Schema.org JSON-LD rewrite
  var ldMatch = html.match(LD_BLOCK_RE);
  var newLdString = null;
  if (ldMatch) {
    try {
      var ld = JSON.parse(ldMatch[1]);
      ld.name = titleResult.newTitleCore;
      if (newDesc) ld.description = newDesc;
      newLdString = JSON.stringify(ld);
    } catch (e) {
      return { file: filepath, action: 'halt-ld-parse-failed', note: e.message };
    }
  }

  if (dryRun) {
    return {
      file: filepath,
      action: 'would-rewrite',
      themeKey: theme,
      themeName: themeName,
      locale: locale,
      oldTitle: oldTitleDecoded,
      newTitle: titleResult.newTitleFull
    };
  }

  // Apply changes
  var newHtml = html;
  newHtml = newHtml.replace(TITLE_RE, '<title>' + escapeHtml(titleResult.newTitleFull) + '</title>');
  if (descMatch && newDesc) {
    newHtml = newHtml.replace(META_DESC_RE, '<meta name="description" content="' + escapeAttr(newDesc) + '">');
  }
  if (ldMatch && newLdString) {
    newHtml = newHtml.replace(LD_BLOCK_RE, '<script type="application/ld+json">' + newLdString + '</script>');
  }

  // Atomic write
  var tmp = filepath + '.tmp';
  try {
    fs.writeFileSync(tmp, newHtml, 'utf8');
    fs.renameSync(tmp, filepath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    return { file: filepath, action: 'write-error', note: e.message };
  }
  return {
    file: filepath,
    action: 'rewritten',
    themeKey: theme,
    themeName: themeName,
    locale: locale
  };
}

function walkDecksDir(rootDir, accumulator) {
  var entries;
  try {
    entries = fs.readdirSync(rootDir);
  } catch (e) {
    return;
  }
  entries.forEach(function (name) {
    if (name.charAt(0) === '.') return;
    var p = path.join(rootDir, name);
    var stat;
    try { stat = fs.statSync(p); } catch (_) { return; }
    if (!stat.isDirectory()) return;
    var deckHtml = path.join(p, 'deck.html');
    if (fs.existsSync(deckHtml)) {
      accumulator.push(deckHtml);
    } else {
      walkDecksDir(p, accumulator);
    }
  });
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var rootDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].charAt(0) === '-') {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (rootDir == null) { rootDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!rootDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-deck-html-title.js <directory> [--dry-run]');
    process.exit(2);
  }
  rootDir = path.resolve(rootDir);
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + rootDir);
    process.exit(2);
  }

  console.log('rewrite-deck-html-title.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  root: ' + rootDir);
  console.log('  taxonomy: ' + TAXONOMY_PATH);
  console.log('');

  // Pre-load taxonomy (fail fast if missing)
  try {
    loadTaxonomy();
  } catch (e) {
    console.error('ERROR: failed to load topics-taxonomy.json: ' + e.message);
    process.exit(2);
  }

  var deckHtmlPaths = [];
  walkDecksDir(rootDir, deckHtmlPaths);
  console.log('Found ' + deckHtmlPaths.length + ' deck.html files');
  console.log('');

  var counts = {};
  var halts = [];
  var dryRunSamples = [];
  deckHtmlPaths.forEach(function (p, idx) {
    var r = processFile(p, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    if (r.action.indexOf('halt-') === 0) {
      halts.push('  ' + r.action + '  ' + p + (r.note ? '  // ' + r.note : ''));
    }
    if (r.action === 'write-error' || r.action === 'skip-read-error') {
      halts.push('  ' + r.action + '  ' + p + (r.note ? '  // ' + r.note : ''));
    }
    if (dryRun && r.action === 'would-rewrite' && dryRunSamples.length < 8) {
      dryRunSamples.push('  ' + path.basename(path.dirname(p)) + '  [' + r.locale + ']  ' + r.themeKey + ' → "' + r.themeName + '"\n    OLD: ' + r.oldTitle + '\n    NEW: ' + r.newTitle);
    }
    if ((idx + 1) % 200 === 0) console.log('  processed ' + (idx + 1) + '/' + deckHtmlPaths.length);
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).sort().forEach(function (k) {
    if (counts[k] > 0) console.log('  ' + k + ':  ' + counts[k]);
  });

  if (dryRunSamples.length > 0) {
    console.log('');
    console.log('=== Sample rewrites (first 8) ===');
    dryRunSamples.forEach(function (s) { console.log(s); });
  }

  if (halts.length > 0) {
    console.log('');
    console.log('=== Halts / errors ===');
    halts.forEach(function (h) { console.log(h); });
  }

  var exitCode = ((counts['write-error'] || 0) > 0 || (counts['halt-bundle-parse-failed'] || 0) > 0 || (counts['halt-no-title'] || 0) > 0 || (counts['halt-no-display-name'] || 0) > 0 || (counts['halt-title-unparseable'] || 0) > 0 || (counts['halt-desc-unparseable'] || 0) > 0 || (counts['halt-ld-parse-failed'] || 0) > 0) ? 1 : 0;
  process.exit(exitCode);
}

if (require.main === module) {
  main();
}

module.exports = {
  processFile: processFile,
  rebuildTitle: rebuildTitle,
  rebuildDescription: rebuildDescription,
  deriveThemeName: deriveThemeName,
  titleCaseSnake: titleCaseSnake
};
