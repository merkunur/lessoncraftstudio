#!/usr/bin/env node
/**
 * F1 Commission B retrofit: inject deck-end suggestion strip into existing
 * deck.html files generated BEFORE Phase 4 fan-out (commit `c2662966`).
 *
 * Why this script: Phase 4 added the strip-emit logic to apps' renderStandaloneHTML
 * + the un-hide guard to showCelebration. New publishes after `c2662966` get the
 * strip natively. Existing ~906 decks predating Phase 4 don't have the strip in
 * their static deck.html; this script retrofits them.
 *
 * Per CLAUDE.md §15.17 salvage scripts pattern. Architecturally similar to
 * rewrite-canonical-host.js + rewrite-deck-html-title.js: in-place content
 * rewrite on existing deck.html files (no new versioned dir; no symlink swap;
 * no DB version bump). Atomic per-file write via .tmp sibling + rename.
 *
 * Pipeline:
 *   1. warmUpIndices() once (DB query bounded by published-deck count)
 *   2. Iterate /var/www/lcs-media/decks/<locale>/<slug> symlinks
 *   3. For each: resolve to <slug>-v<N>/deck.html target; idempotency-check;
 *      inject strip HTML + un-hide guard; atomic write
 *   4. Per-deck error isolation; final summary
 *
 * Idempotent: skips files that already contain `lcs-deckend-suggestions` substring.
 *
 * Usage:
 *   node scripts/publish-cli/inject-deck-end-strip.js [--dry-run] [--locale=<code>] [--limit=<N>]
 *
 * Flags:
 *   --dry-run         Preview only; no file writes. Reports per-deck what WOULD happen.
 *   --locale=<code>   Limit to single locale (e.g., --locale=en). Default: all 11.
 *   --limit=<N>       Limit to first N decks (post-locale filter). Default: no limit.
 *
 * Exit code: 0 = all decks processed (skip-or-success); 1 = any deck failed.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var deckEndSuggestions = require('./deck-end-suggestions');
var i18n = require('./i18n');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

// Parse command-line flags.
var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;

// Build the strip HTML structure (mirror buildDeckEndSuggestionsPlaceholder
// from REFERENCE TRANSLATIONS/catalog-export.js, but inline so this script
// has no operator-PC dependency on catalog-export.js loading).
function buildStripWithCss() {
  var slots = [];
  for (var i = 1; i <= 6; i++) {
    slots.push(
      '    <li><a href="__SUGGESTION_' + i + '_URL__" class="lcs-deckend-tile">' +
      '<img src="__SUGGESTION_' + i + '_THUMB__" alt="" class="lcs-deckend-thumb">' +
      '<span class="lcs-deckend-title">__SUGGESTION_' + i + '_TITLE__</span>' +
      '</a></li>'
    );
  }
  var css = [
    '<style>',
    '.lcs-deckend-suggestions{margin:24px 16px 96px;padding:20px;background:#FFF;border:2px solid #DCE1E6;border-radius:14px}',
    '.lcs-deckend-suggestions[hidden]{display:none}',
    '.lcs-deckend-suggestions h2{font-size:1.15rem;margin:0 0 12px;color:#1C1C1E;text-align:center}',
    '.lcs-deckend-suggestions ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(6,1fr);gap:10px}',
    '@media (max-width:767px){.lcs-deckend-suggestions ul{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:140px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;-webkit-overflow-scrolling:touch}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar{height:6px}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar-thumb{background:#DCE1E6;border-radius:3px}}',
    '.lcs-deckend-tile{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;border-radius:10px;background:#F4F6FB;color:#4E5FE8;text-decoration:none;font-weight:500;transition:background-color .15s,transform .1s;min-height:44px;scroll-snap-align:start}',
    '.lcs-deckend-tile:hover{background:#E8ECF7;transform:translateY(-2px)}',
    '.lcs-deckend-tile:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
    '.lcs-deckend-thumb{display:block;width:100%;max-width:120px;height:80px;object-fit:cover;border-radius:8px;background:#FFF}',
    '.lcs-deckend-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-align:center;font-size:.875rem;line-height:1.3}',
    '@media print{.lcs-deckend-suggestions{display:none !important}}',
    '</style>'
  ].join('');
  var html = [
    css,
    '<section class="lcs-deckend-suggestions" hidden aria-label="__DECK_END_SUGGESTIONS_HEADER__">',
    '  <h2>__DECK_END_SUGGESTIONS_HEADER__</h2>',
    '  <ul>',
    slots.join('\n'),
    '  </ul>',
    '</section>'
  ].join('\n');
  return html;
}

// Substitute 19 placeholders in the strip HTML with localized header + 6 suggestions.
function substituteStripPlaceholders(stripHtml, locale, suggestions) {
  // 1. Header
  var headerResolution = i18n.resolve(locale, 'deckEndSuggestionsHeader', 'Try one of these next:');
  var html = stripHtml.split('__DECK_END_SUGGESTIONS_HEADER__').join(headerResolution.value);
  // 2. 6 × URL/TITLE/THUMB triplets
  for (var i = 0; i < 6; i++) {
    var slot = suggestions[i];
    var urlPh = '__SUGGESTION_' + (i + 1) + '_URL__';
    var titlePh = '__SUGGESTION_' + (i + 1) + '_TITLE__';
    var thumbPh = '__SUGGESTION_' + (i + 1) + '_THUMB__';
    if (slot) {
      var titleLocalized = (slot.title && (slot.title[locale] || slot.title.en)) || slot.slug;
      html = html.split(urlPh).join(slot.canonicalURL || ('/' + slot.language + '/decks/' + slot.slug + '/'));
      html = html.split(titlePh).join(titleLocalized);
      html = html.split(thumbPh).join(slot.thumbnailUrl || '');
    }
    // else: placeholders left raw (graceful degradation)
  }
  return html;
}

// The un-hide guard JavaScript fragment to inject after `classList.add("lcs-celebration--shown");`
var UN_HIDE_GUARD_JS =
  'var stripEl=document.querySelector(".lcs-deckend-suggestions");' +
  'if(stripEl){var fh=stripEl.querySelector("a[href]");' +
  'if(fh&&fh.getAttribute("href").indexOf("__SUGGESTION_")===-1){' +
  'var mi=celebrationEl.querySelector(".lcs-celebration__inner");' +
  'if(mi){stripEl.hidden=false;mi.appendChild(stripEl);}}}';

// Per-deck retrofit logic.
function injectStripIntoDeckHtml(deckHtmlContent, locale, suggestions) {
  // Idempotency check: skip if strip already present
  if (deckHtmlContent.indexOf('lcs-deckend-suggestions') !== -1) {
    return { changed: false, alreadyApplied: true };
  }

  // 1. Build strip HTML + substitute placeholders
  var stripHtml = buildStripWithCss();
  var substitutedStrip = substituteStripPlaceholders(stripHtml, locale, suggestions);

  // 2. Inject strip HTML before `<div class="lcs-celebration"`
  var celebrationAnchor = '<div class="lcs-celebration"';
  var celIdx = deckHtmlContent.indexOf(celebrationAnchor);
  if (celIdx === -1) {
    return { changed: false, alreadyApplied: false, error: 'celebration anchor not found' };
  }

  var beforeCel = deckHtmlContent.substring(0, celIdx);
  var fromCel = deckHtmlContent.substring(celIdx);
  var withStrip = beforeCel + substitutedStrip + '\n' + fromCel;

  // 3. Inject un-hide guard after celebrationEl.classList.add("lcs-celebration--shown");
  var classAddAnchor = 'celebrationEl.classList.add("lcs-celebration--shown");';
  var classIdx = withStrip.indexOf(classAddAnchor);
  if (classIdx === -1) {
    return { changed: false, alreadyApplied: false, error: 'classList.add anchor not found' };
  }

  var insertPos = classIdx + classAddAnchor.length;
  var withGuard = withStrip.substring(0, insertPos) + UN_HIDE_GUARD_JS + withStrip.substring(insertPos);

  return { changed: true, alreadyApplied: false, content: withGuard };
}

function atomicWrite(filePath, content) {
  var tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, content, 'utf8');
  fs.renameSync(tmpPath, filePath);
}

async function processDeck(locale, slug) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var symlinkPath = path.join(localeDir, slug);
  var stat;
  try {
    stat = fs.lstatSync(symlinkPath);
  } catch (e) {
    return { ok: false, error: 'lstat failed: ' + e.message };
  }
  if (!stat.isSymbolicLink()) {
    return { ok: false, error: 'not a symlink (skipped; expected per §15.7 architecture)' };
  }
  var target = fs.readlinkSync(symlinkPath);
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var deckHtmlPath = path.join(targetDir, 'deck.html');
  if (!fs.existsSync(deckHtmlPath)) {
    return { ok: false, error: 'deck.html not found at ' + deckHtmlPath };
  }
  var content = fs.readFileSync(deckHtmlPath, 'utf8');

  // Fetch suggestions for this deck
  var suggestions = [];
  try {
    suggestions = await deckEndSuggestions.selectDeckEndSuggestions(locale, slug, 6);
  } catch (e) {
    return { ok: false, error: 'selectDeckEndSuggestions: ' + e.message };
  }

  var result = injectStripIntoDeckHtml(content, locale, suggestions);
  if (result.error) {
    return { ok: false, error: result.error };
  }
  if (result.alreadyApplied) {
    return { ok: true, alreadyApplied: true, suggestionCount: suggestions.length };
  }
  if (result.changed) {
    if (!DRY_RUN) {
      atomicWrite(deckHtmlPath, result.content);
    }
    return { ok: true, alreadyApplied: false, suggestionCount: suggestions.length, deckHtmlPath: deckHtmlPath };
  }
  return { ok: false, error: 'unexpected result shape' };
}

async function main() {
  console.log('=== F1 inject-deck-end-strip ===');
  console.log('mode:    ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE'));
  console.log('locale:  ' + (TARGET_LOCALE || 'all 11'));
  console.log('limit:   ' + (TARGET_LIMIT === Infinity ? 'no limit' : TARGET_LIMIT));
  console.log('');

  console.log('Warming deck-end-suggestions indices...');
  await deckEndSuggestions.warmUpIndices();
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var totalProcessed = 0;
  var totalApplied = 0;
  var totalAlreadyApplied = 0;
  var totalFailed = 0;
  var failures = [];
  var perLocaleStats = {};

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) {
      continue;
    }
    var entries = fs.readdirSync(localeDir);
    // Filter to symlinks (slug aliases pointing to -v<N> dirs).
    var slugs = entries.filter(function (name) {
      if (name.startsWith('.')) return false;
      // -v<N> suffix means it's the version dir, not the symlink.
      // We want the bare slug symlinks.
      return !/-v\d+$/.test(name);
    });
    perLocaleStats[locale] = { total: slugs.length, applied: 0, alreadyApplied: 0, failed: 0 };
    console.log('[' + locale + '] ' + slugs.length + ' deck symlinks');
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      var slug = slugs[si];
      totalProcessed++;
      try {
        var r = await processDeck(locale, slug);
        if (!r.ok) {
          totalFailed++;
          perLocaleStats[locale].failed++;
          failures.push(locale + '/' + slug + ': ' + r.error);
        } else if (r.alreadyApplied) {
          totalAlreadyApplied++;
          perLocaleStats[locale].alreadyApplied++;
        } else {
          totalApplied++;
          perLocaleStats[locale].applied++;
        }
      } catch (e) {
        totalFailed++;
        perLocaleStats[locale].failed++;
        failures.push(locale + '/' + slug + ': ' + e.message);
      }
    }
    if (totalProcessed >= TARGET_LIMIT) break;
  }

  console.log('');
  console.log('=== summary ===');
  console.log('  processed:           ' + totalProcessed);
  console.log('  applied:             ' + totalApplied);
  console.log('  already-applied:     ' + totalAlreadyApplied);
  console.log('  failed:              ' + totalFailed);
  console.log('');
  console.log('=== per-locale ===');
  Object.keys(perLocaleStats).forEach(function (loc) {
    var s = perLocaleStats[loc];
    console.log('  ' + loc + ':  total=' + s.total + ' applied=' + s.applied + ' already=' + s.alreadyApplied + ' failed=' + s.failed);
  });
  if (failures.length > 0) {
    console.log('');
    console.log('=== failures ===');
    failures.forEach(function (f) { console.log('  - ' + f); });
  }

  await deckEndSuggestions.disconnect();
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch(function (e) {
  console.error('FATAL: ' + e.message);
  if (e.stack) console.error(e.stack);
  process.exit(1);
});
