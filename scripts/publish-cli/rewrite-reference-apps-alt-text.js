#!/usr/bin/env node
/**
 * One-shot codemod for the 29 REFERENCE APPS HTML files (alt-text SEO
 * commission 2026-05-27, Phase 2 producer-side emit changes).
 *
 * Applies 3 mechanical replacements per file:
 *
 *   (1) `parts.push('<main id="lcs-app">');`
 *       →  `parts.push('<main id="lcs-app" role="application" aria-label="__APP_ARIA_LABEL__">');`
 *       Adds `role="application"` + a publish-cli-substituted aria-label
 *       to the top-level interactive deck container per CLAUDE.md §A.13.X
 *       Dimension 2(b). Deck-side rollout ships first because worksheet
 *       buttons are already <button> elements (keyboard-complete).
 *
 *   (2) `'      <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="" src="' + bundle.worksheetImage + '">'`
 *       →  `'      <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__" src="' + bundle.worksheetImage + '">'`
 *       Replaces hardcoded empty alt on the largest <img> on every deck
 *       page (~9,200 pages) with a publish-time-substituted placeholder.
 *
 *   (3) `'      "<img class=\\"lcs-mini\\" alt=\\"Your completed worksheet\\" src=\\""+DECK_BUNDLE.worksheetImage+"\\" />"+',`
 *       →  `'      "<img class=\\"lcs-mini\\" alt=\\""+(window.translations&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"]&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"].celebrationMiniAlt||"Your completed worksheet")+"\\" src=\\""+DECK_BUNDLE.worksheetImage+"\\" />"+',`
 *       Reads celebrationMiniAlt from window.translations (deck.html-runtime
 *       merge of translations-shared.js) at runtime using the deck's
 *       contentLanguage, NOT the hardcoded English string. Falls back to
 *       "Your completed worksheet" if translations dict is empty (defensive).
 *
 * Idempotent: re-running on already-rewritten files finds nothing to
 * replace — safe to invoke twice.
 *
 * Per CLAUDE.md §A.13.12 mechanical-fan-out discipline + §A.13.13
 * 6-grep-dimension verification. Run from repo root.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var REFERENCE_APPS_DIR = path.join(__dirname, '..', '..', 'REFERENCE APPS');

var APPS = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count',
  'find-objects', 'grid-match', 'matching', 'math-puzzle', 'math-worksheet',
  'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess',
  'word-scramble', 'wordsearch'
];

// Mechanical replacements — each tuple is [needle, replacement, label].
// The needles MUST be byte-exact strings; we use String.indexOf + split
// rather than regex to avoid any escaping ambiguity per CLAUDE.md
// §A.13.46 (full-phrase forbidden tokens; same discipline applied here).
var REWRITES = [
  {
    label: 'main role="application" aria-label',
    needle: 'parts.push(\'<main id="lcs-app">\');',
    replacement: 'parts.push(\'<main id="lcs-app" role="application" aria-label="__APP_ARIA_LABEL__">\');'
  },
  {
    label: 'main worksheet <img alt>',
    needle: '\'      <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="" src="\' + bundle.worksheetImage + \'">\'',
    replacement: '\'      <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__" src="\' + bundle.worksheetImage + \'">\''
  },
  {
    label: 'celebration mini <img alt>',
    // On-disk bytes carry `\\"` (2 backslashes + quote) because the
    // surrounding deck.html template is doubly-escaped at gen-time.
    // Each `\\\\` in this JS source → `\\` on disk. Verified via hex
    // dump of REFERENCE APPS/matching.html:4243 (commission start).
    needle: '\'      "<img class=\\\\"lcs-mini\\\\" alt=\\\\"Your completed worksheet\\\\" src=\\\\""+DECK_BUNDLE.worksheetImage+"\\\\" />"+\',',
    // Runtime-resolves alt from window.translations[contentLanguage].celebrationMiniAlt
    // per §A.13.46 _seoT-like pattern (content-locale-direct lookup).
    // Falls back to English literal if translations dict empty.
    replacement: '\'      "<img class=\\\\"lcs-mini\\\\" alt=\\\\""+(window.translations&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"]&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"].celebrationMiniAlt||(window.translations&&window.translations.en&&window.translations.en.celebrationMiniAlt)||"Your completed worksheet")+"\\\\" src=\\\\""+DECK_BUNDLE.worksheetImage+"\\\\" />"+\','
  }
];

function rewriteFile(filePath) {
  var raw = fs.readFileSync(filePath, 'utf8');
  var changed = 0;
  var report = [];
  REWRITES.forEach(function (r) {
    if (raw.indexOf(r.replacement) !== -1) {
      report.push('  [' + r.label + '] already rewritten — skipping');
      return;
    }
    if (raw.indexOf(r.needle) === -1) {
      report.push('  [' + r.label + '] NEEDLE NOT FOUND');
      return;
    }
    var occurrences = raw.split(r.needle).length - 1;
    if (occurrences !== 1) {
      report.push('  [' + r.label + '] HALT: expected 1 occurrence, found ' + occurrences);
      return;
    }
    raw = raw.split(r.needle).join(r.replacement);
    changed++;
    report.push('  [' + r.label + '] rewritten');
  });
  if (changed > 0) {
    fs.writeFileSync(filePath, raw, 'utf8');
  }
  return { changed: changed, report: report };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.indexOf('--dry-run') !== -1;
  var totals = { changed: 0, files: 0, skipped: 0 };

  if (dryRun) {
    console.log('DRY-RUN MODE — no files written');
  } else {
    console.log('APPLY MODE — files will be rewritten in place');
  }
  console.log('');

  APPS.forEach(function (app) {
    var filePath = path.join(REFERENCE_APPS_DIR, app + '.html');
    if (!fs.existsSync(filePath)) {
      console.log('[' + app + '] MISSING FILE — skipped');
      totals.skipped++;
      return;
    }
    if (dryRun) {
      // Simulate: read but never write
      var raw = fs.readFileSync(filePath, 'utf8');
      var report = [];
      REWRITES.forEach(function (r) {
        var hasNeedle = raw.indexOf(r.needle) !== -1;
        var hasReplacement = raw.indexOf(r.replacement) !== -1;
        if (hasReplacement) report.push('  [' + r.label + '] already rewritten');
        else if (hasNeedle) report.push('  [' + r.label + '] WOULD rewrite');
        else report.push('  [' + r.label + '] NEEDLE NOT FOUND');
      });
      console.log('[' + app + ']');
      report.forEach(function (l) { console.log(l); });
    } else {
      var result = rewriteFile(filePath);
      console.log('[' + app + '] ' + result.changed + ' replacement(s)');
      result.report.forEach(function (l) { console.log(l); });
      totals.changed += result.changed;
      totals.files++;
    }
  });
  console.log('');
  console.log('=== Summary ===');
  console.log('Apps processed: ' + APPS.length);
  if (!dryRun) {
    console.log('Files written: ' + totals.files);
    console.log('Total replacements: ' + totals.changed);
  }
  console.log('Skipped: ' + totals.skipped);
}

if (require.main === module) {
  main();
}

module.exports = { REWRITES: REWRITES, APPS: APPS, rewriteFile: rewriteFile };
