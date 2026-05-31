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
// --rewrite: corrective mode. Strips existing strip + un-hide guard from each
// deck.html (if present), then re-injects with current code's logic. Used to
// repair already-retrofitted decks after a structural fix in the script
// (e.g., i18n key correction; empty-suggestions handling).
var REWRITE = argv.includes('--rewrite');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;
// --by-version-dir: walk <slug>-v<N> version dirs instead of the bare-slug
// symlinks. Each deck is processed ONCE (the soft-consolidation migration leaves
// BOTH an old-redirect AND a new-canonical bare symlink per deck — walking
// symlinks would process the shared deck.html twice and use the wrong/old slug
// identity). The dir name minus -v<N> is the canonical slug. Use this for any
// post-slug-migration strip refresh.
var BY_VERSION_DIR = argv.includes('--by-version-dir');

// Build the strip HTML structure (mirror buildDeckEndSuggestionsPlaceholder
// from REFERENCE TRANSLATIONS/catalog-export.js, but inline so this script
// has no operator-PC dependency on catalog-export.js loading).
// `slotCount` controls how many <li> tiles get rendered. F1 dynamic-slot
// behavior: caller skips injection entirely when `slotCount === 0`; renders
// only available tiles when `slotCount` < 6 (avoids raw __SUGGESTION_
// placeholder leakage into the SEO-indexable HTML for thin-substrate locales
// like 'no' with 1 published deck — only-self → 0 suggestions → strip omitted).
function buildStripWithCss(slotCount) {
  var slots = [];
  for (var i = 1; i <= slotCount; i++) {
    slots.push(
      '    <li><a href="__SUGGESTION_' + i + '_URL__" class="lcs-deckend-tile">' +
      '<img src="__SUGGESTION_' + i + '_THUMB__" alt="" class="lcs-deckend-thumb">' +
      '<span class="lcs-deckend-title">__SUGGESTION_' + i + '_TITLE__</span>' +
      '</a></li>'
    );
  }
  // Showreel design: horizontal-scroll grid (all viewports), 140px tile,
  // portrait-oriented thumbnail matching the source 480×620 PNG aspect.
  // Replaces the prior 6-column desktop layout that overflowed the
  // celebration modal at typical desktop widths (operator screenshot
  // 2026-05-08; rightmost tile bleeding past modal right border).
  var css = [
    '<style>',
    '.lcs-deckend-suggestions{margin:24px 16px 96px;padding:18px 12px;background:#FFF;border:2px solid #DCE1E6;border-radius:14px;overflow:hidden}',
    '.lcs-deckend-suggestions[hidden]{display:none}',
    '.lcs-deckend-suggestions h2{font-size:1.1rem;margin:0 0 14px;color:#1C1C1E;text-align:center}',
    '.lcs-deckend-suggestions ul{list-style:none;padding:4px 4px 12px;margin:0;display:grid;grid-auto-flow:column;grid-auto-columns:140px;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scroll-padding-left:4px;scrollbar-color:#C9CFD6 transparent}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar{height:6px}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar-track{background:transparent}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar-thumb{background:#C9CFD6;border-radius:3px}',
    '.lcs-deckend-suggestions ul::-webkit-scrollbar-thumb:hover{background:#9AA3AD}',
    '.lcs-deckend-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 8px;border-radius:12px;background:#F4F6FB;color:#4E5FE8;text-decoration:none;font-weight:500;transition:transform .15s,box-shadow .15s,background-color .15s;scroll-snap-align:start;box-shadow:0 1px 3px rgba(0,0,0,0.05)}',
    '.lcs-deckend-tile:hover{background:#E8ECF7;transform:translateY(-3px);box-shadow:0 6px 14px rgba(78,95,232,0.18)}',
    '.lcs-deckend-tile:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
    '.lcs-deckend-thumb{display:block;width:100%;height:155px;object-fit:cover;object-position:center top;border-radius:8px;background:#FFF;box-shadow:0 1px 4px rgba(0,0,0,0.08)}',
    '.lcs-deckend-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-align:center;font-size:.825rem;line-height:1.3;width:100%}',
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

// Substitute placeholders in the strip HTML with localized header + N suggestions.
// `suggestions.length` defines slot count (matches buildStripWithCss(slotCount)).
function substituteStripPlaceholders(stripHtml, locale, suggestions) {
  // 1. Header — i18n key endDeck.suggestionsHeader (alongside other endDeck.* keys
  //    in messages/<locale>.json per Phase 2 wiring fix).
  var headerResolution = i18n.resolve(locale, 'endDeck.suggestionsHeader', 'Try one of these next:');
  var html = stripHtml.split('__DECK_END_SUGGESTIONS_HEADER__').join(headerResolution.value);
  // 2. N × URL/TITLE/THUMB triplets (one per suggestion)
  for (var i = 0; i < suggestions.length; i++) {
    var slot = suggestions[i];
    var urlPh = '__SUGGESTION_' + (i + 1) + '_URL__';
    var titlePh = '__SUGGESTION_' + (i + 1) + '_TITLE__';
    var thumbPh = '__SUGGESTION_' + (i + 1) + '_THUMB__';
    var titleLocalized = (slot.title && (slot.title[locale] || slot.title.en)) || slot.slug;
    html = html.split(urlPh).join(slot.canonicalURL || ('/' + slot.language + '/decks/' + slot.slug + '/'));
    html = html.split(titlePh).join(titleLocalized);
    html = html.split(thumbPh).join(slot.thumbnailUrl || '');
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

// Celebration modal widening: 520px → 800px (matches worksheet width per
// CLAUDE.md aspect-ratio:800/1400). Operator directive 2026-05-08. Idempotent.
// Applied during --rewrite alongside the strip rewrite. Source REFERENCE APPS
// also patched for new publishes via scripts/fan-out-celebration-modal-width.js.
var CELEBRATION_OLD = '.lcs-celebration__inner{position:relative;background:#FFFFFF;border-radius:24px;padding:32px 28px 24px;max-width:520px;width:100%;box-shadow:0 20px 60px rgba(28,28,30,.35);text-align:center;z-index:2}';
var CELEBRATION_NEW = '.lcs-celebration__inner{position:relative;background:#FFFFFF;border-radius:24px;padding:32px 28px 24px;max-width:800px;width:100%;box-shadow:0 20px 60px rgba(28,28,30,.35);text-align:center;z-index:2}';

function patchCelebrationModalWidth(content) {
  if (content.indexOf(CELEBRATION_OLD) === -1) return content; // already patched OR shape differs
  return content.split(CELEBRATION_OLD).join(CELEBRATION_NEW);
}

// Strip out a previously-injected strip HTML block + un-hide guard JS.
// Returns the cleaned content. Used by --rewrite mode for corrective re-inject.
function removeExistingStripAndGuard(content) {
  // ROBUST removal — wipes ALL prior strip artifacts so re-inject starts clean.
  // A prior buggy run (dual-symlink double-processing + non-robust single-strip
  // removal) could leave partial/duplicate strips, raw __SUGGESTION_ placeholder
  // leaks, or multiple un-hide guards. Regex-remove every artifact globally.
  // 1. Every <style>.lcs-deckend-suggestions{...}</style> block (non-greedy to
  //    first </style>; the style tag carries only strip CSS — no nesting).
  content = content.replace(/<style>\.lcs-deckend-suggestions\{[\s\S]*?<\/style>/g, '');
  // 2. Every <section class="lcs-deckend-suggestions" ...>...</section> block
  //    (non-greedy to its own </section>; strip tiles are anchors, no nested section).
  content = content.replace(/<section class="lcs-deckend-suggestions"[\s\S]*?<\/section>/g, '');
  // 3. Every un-hide guard JS fragment (exact-string split + tolerant regex).
  content = content.split(UN_HIDE_GUARD_JS).join('');
  content = content.replace(/var stripEl=document\.querySelector\("\.lcs-deckend-suggestions"\);if\(stripEl\)\{[\s\S]*?mi\.appendChild\(stripEl\);\}\}\}/g, '');
  return content;
}

// Per-deck retrofit logic.
function injectStripIntoDeckHtml(deckHtmlContent, locale, suggestions) {
  var originalContent = deckHtmlContent;

  // Patch celebration modal width unconditionally (idempotent; matters when
  // CSS shape was 520px). Applied across both default and --rewrite modes
  // because it's an orthogonal correction independent of the strip itself.
  deckHtmlContent = patchCelebrationModalWidth(deckHtmlContent);
  var celebrationPatched = deckHtmlContent !== originalContent;

  var hadExistingStrip = deckHtmlContent.indexOf('lcs-deckend-suggestions') !== -1;

  if (hadExistingStrip && !REWRITE) {
    // Idempotency check: skip strip work if strip already present (default
    // mode). But if celebration was patched, write that change.
    if (celebrationPatched) {
      return { changed: true, alreadyApplied: false, content: deckHtmlContent, celebrationOnly: true };
    }
    return { changed: false, alreadyApplied: true };
  }
  if (hadExistingStrip && REWRITE) {
    // Corrective mode: strip the prior injection so we can re-inject with
    // current code's logic (i18n key fix, dynamic-slot count, etc.).
    deckHtmlContent = removeExistingStripAndGuard(deckHtmlContent);
  }

  // Empty-suggestions short-circuit: thin-substrate locales (e.g., 'no' with
  // 1 published deck) return [] from selectDeckEndSuggestions because all
  // strategies require >=1 OTHER deck. Skip injection entirely rather than
  // emit an empty/raw-placeholder strip.
  if (!suggestions || suggestions.length === 0) {
    if (hadExistingStrip && REWRITE) {
      // We removed the existing (broken) strip and there's nothing to put
      // back. Write the cleaned content out (also contains celebration patch).
      return { changed: true, alreadyApplied: false, content: deckHtmlContent, rewroteAsRemoved: true };
    }
    if (celebrationPatched) {
      // No strip needed (or no existing strip to remove), but celebration
      // modal width was 520px and got patched to 800px. Write that change.
      return { changed: true, alreadyApplied: false, content: deckHtmlContent, celebrationOnly: true };
    }
    return { changed: false, alreadyApplied: false, skippedEmpty: true };
  }

  // 1. Build strip HTML (slot count = suggestions.length, capped at 6) +
  //    substitute placeholders
  var slotCount = Math.min(suggestions.length, 6);
  var stripHtml = buildStripWithCss(slotCount);
  var substitutedStrip = substituteStripPlaceholders(stripHtml, locale, suggestions.slice(0, slotCount));

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

async function processDeck(locale, slug, deckHtmlPathOverride) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var deckHtmlPath;
  if (deckHtmlPathOverride) {
    // Version-dir mode: caller already resolved the canonical deck.html path.
    deckHtmlPath = deckHtmlPathOverride;
    if (!fs.existsSync(deckHtmlPath)) {
      return { ok: false, error: 'deck.html not found at ' + deckHtmlPath };
    }
  } else {
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
    deckHtmlPath = path.join(targetDir, 'deck.html');
    if (!fs.existsSync(deckHtmlPath)) {
      return { ok: false, error: 'deck.html not found at ' + deckHtmlPath };
    }
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
  if (result.skippedEmpty) {
    return { ok: true, skippedEmpty: true, suggestionCount: suggestions.length };
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
  console.log('mode:    ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + (REWRITE ? ' (rewrite=ON)' : ''));
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
  var totalSkippedEmpty = 0;
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
    var slugs;
    if (BY_VERSION_DIR) {
      // Walk version dirs; derive canonical slug + explicit deck.html path.
      // One entry per deck (no old/new symlink double-processing).
      slugs = entries.filter(function (name) {
        if (name.startsWith('.')) return false;
        if (!/-v\d+$/.test(name)) return false;
        var p = path.join(localeDir, name);
        try { return fs.statSync(p).isDirectory(); } catch (e) { return false; }
      }).map(function (dirName) {
        return { slug: dirName.replace(/-v\d+$/, ''), deckHtmlPath: path.join(localeDir, dirName, 'deck.html') };
      });
    } else {
      // Filter to symlinks (slug aliases pointing to -v<N> dirs).
      slugs = entries.filter(function (name) {
        if (name.startsWith('.')) return false;
        // -v<N> suffix means it's the version dir, not the symlink.
        // We want the bare slug symlinks.
        return !/-v\d+$/.test(name);
      }).map(function (name) { return { slug: name, deckHtmlPath: null }; });
    }
    perLocaleStats[locale] = { total: slugs.length, applied: 0, alreadyApplied: 0, skippedEmpty: 0, failed: 0 };
    console.log('[' + locale + '] ' + slugs.length + (BY_VERSION_DIR ? ' version dirs' : ' deck symlinks'));
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      var slug = slugs[si].slug;
      var deckHtmlPathOverride = slugs[si].deckHtmlPath;
      totalProcessed++;
      try {
        var r = await processDeck(locale, slug, deckHtmlPathOverride);
        if (!r.ok) {
          totalFailed++;
          perLocaleStats[locale].failed++;
          failures.push(locale + '/' + slug + ': ' + r.error);
        } else if (r.alreadyApplied) {
          totalAlreadyApplied++;
          perLocaleStats[locale].alreadyApplied++;
        } else if (r.skippedEmpty) {
          totalSkippedEmpty++;
          perLocaleStats[locale].skippedEmpty++;
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
  console.log('  skipped-empty:       ' + totalSkippedEmpty);
  console.log('  failed:              ' + totalFailed);
  console.log('');
  console.log('=== per-locale ===');
  Object.keys(perLocaleStats).forEach(function (loc) {
    var s = perLocaleStats[loc];
    console.log('  ' + loc + ':  total=' + s.total + ' applied=' + s.applied + ' already=' + s.alreadyApplied + ' skipped-empty=' + s.skippedEmpty + ' failed=' + s.failed);
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
