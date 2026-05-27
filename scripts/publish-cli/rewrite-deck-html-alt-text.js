#!/usr/bin/env node
/**
 * Retrofit script for the alt-text SEO commission 2026-05-27.
 *
 * Phase 8 per the commission plan. Walks all published deck.html files at
 * /var/www/lcs-media/decks/<locale>/<slug>/, applies three structural
 * rewrites for the new placeholders introduced in this commission, then
 * re-runs substitute.apply() to fill them.
 *
 * Rewrites (all idempotent — re-running on already-retrofitted deck is no-op):
 *
 *   R1. <main id="lcs-app">                          (no role/aria-label)
 *       → <main id="lcs-app" role="application" aria-label="__APP_ARIA_LABEL__">
 *
 *   R2. <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt=""…>
 *       → <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__"…>
 *
 *   R3. <img src="…" alt="" class="lcs-deckend-thumb">  (6 per deck)
 *       → <img src="…" alt="__SUGGESTION_i_ALT__" class="lcs-deckend-thumb">
 *       Where i = 1..6 enumerated by position. Since deck-end strip already
 *       has the URL placeholders __SUGGESTION_<i>_URL__ filled OR raw, we
 *       match against the surrounding <a href="…__SUGGESTION_<i>_URL__…">
 *       (raw) OR the substituted URL. Simpler approach: enumerate `lcs-deckend-thumb`
 *       img tags in order; assign __SUGGESTION_1_ALT__ through __SUGGESTION_6_ALT__.
 *
 *   R4. (Celebration mini img) — handled by REFERENCE APPS codemod which embedded
 *       a runtime-resolved JS expression. The retrofit can detect the pre-codemod
 *       English literal "Your completed worksheet" inside the JS string template
 *       and rewrite it to the same runtime expression. See REWRITE_CELEBRATION_REGEX.
 *
 * After structural rewrites, re-run substitute.apply() with the deck's manifest
 * (loaded from sibling manifest.json) to substitute the placeholders into final
 * locale-resolved values.
 *
 * Per §15.13 dry-run-vs-real parity + §15.17 salvage-script pattern + §15.5
 * atomicity (temp + rename(2)). Backup originals to .bak sibling per §A.13.
 *
 * Usage (run on Hetzner; --decks-root defaults to /var/www/lcs-media/decks):
 *   node scripts/publish-cli/rewrite-deck-html-alt-text.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-alt-text.js --dry-run --locales=no,da,fi
 *   node scripts/publish-cli/rewrite-deck-html-alt-text.js --confirm --locales=no
 *
 * Locale chunking per §A.13.13: low-traffic locales first to surface bugs cheap.
 * Default order: no → da → fi → sv → nl → it → pt → es → fr → de → en.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var substitute = require('./substitute');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE_CHUNK_ORDER = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];

// ============================================================
// Regex patterns
// ============================================================

// R1: <main id="lcs-app"> without role="application"
var MAIN_NO_ROLE_REGEX = /<main\s+id="lcs-app"(\s*>|\s+(?!.*role="application")[^>]*>)/;
var MAIN_NO_ROLE_LITERAL = '<main id="lcs-app">';

// R2: main worksheet <img alt="" ...>
// Match the specific img with class="lcs-worksheet__img" id="lcs-worksheet-img" alt=""
var WORKSHEET_IMG_ALT_EMPTY_REGEX = /(<img\s+class="lcs-worksheet__img"\s+id="lcs-worksheet-img"\s+)alt=""(\s+src="[^"]*">)/g;

// R3: deck-end suggestion thumbnails with empty alt
var DECKEND_THUMB_ALT_EMPTY_REGEX = /(<img\s+src="[^"]*"\s+)alt=""(\s+class="lcs-deckend-thumb"\s*\/?>)/g;

// R4: celebration mini img with hardcoded English literal
// Matches the JS-string template inside showCelebration()
var CELEBRATION_LITERAL_REGEX = /(<img class=\\"lcs-mini\\" )alt=\\"Your completed worksheet\\"(\s+src=)/g;

// R5: og:image:alt + twitter:image:alt + Schema.org image.caption — these
// were substituted at ORIGINAL publish time with the old title-mirror value
// per pre-commission substitute.js logic. To allow re-substitution with the
// new composeOgImageAlt formula, reset their content back to the
// __OG_IMAGE_ALT__ placeholder. substitute.apply() then fills with the
// composed locale-correct rich alt.
var OG_META_ALT_REGEX = /(<meta\s+property="og:image:alt"\s+content=)"[^"]*"/g;
var TWITTER_META_ALT_REGEX = /(<meta\s+name="twitter:image:alt"\s+content=)"[^"]*"/g;
// JSON-LD caption field inside the <script type="application/ld+json"> block.
// Match `"caption":"…"` inside the image object — the schema fragment varies
// but the caption always appears as a JSON string value.
var JSONLD_CAPTION_REGEX = /("caption"\s*:\s*)"[^"]*"/g;
var CELEBRATION_REPLACEMENT_PREFIX = '$1alt=\\"';
var CELEBRATION_REPLACEMENT_SUFFIX = '\\"$2';
// The runtime alt resolution per Phase 2 codemod:
var CELEBRATION_RUNTIME_EXPR = '"+(window.translations&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"]&&window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)||"en"].celebrationMiniAlt||(window.translations&&window.translations.en&&window.translations.en.celebrationMiniAlt)||"Your completed worksheet")+"';

// ============================================================
// CLI args
// ============================================================

function parseArgs(argv) {
  var out = {
    dryRun: true,
    confirm: false,
    decksRoot: DEFAULT_DECKS_ROOT,
    locales: LOCALE_CHUNK_ORDER.slice(),
    sample: null,
    skipSubstitute: false,
  };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) {
      out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    } else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10);
    else if (a === '--skip-substitute') out.skipSubstitute = true;
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-alt-text.js [--dry-run | --confirm]');
      console.log('         [--locales=no,da,fi]   (default: all 11; low-traffic-first order)');
      console.log('         [--decks-root=path]    (default: /var/www/lcs-media/decks)');
      console.log('         [--sample=N]           (limit each locale to N decks; spot-check)');
      console.log('         [--skip-substitute]    (only inject placeholders; do NOT run substitute.apply)');
      process.exit(0);
    }
  });
  return out;
}

// ============================================================
// Per-deck classifier (Phase 1 — no writes)
// ============================================================

function classify(htmlText) {
  var report = {
    r1Applies: false, r1AlreadyDone: false,
    r2Applies: false, r2AlreadyDone: false,
    r3Applies: 0, r3AlreadyDone: false,
    r4Applies: false, r4AlreadyDone: false,
    r5Applies: false, r5AlreadyDone: false,
    notes: []
  };

  // R1 check
  if (htmlText.indexOf(MAIN_NO_ROLE_LITERAL) !== -1) {
    report.r1Applies = true;
  } else if (htmlText.indexOf('id="lcs-app" role="application"') !== -1) {
    report.r1AlreadyDone = true;
  } else {
    report.notes.push('R1: no <main id="lcs-app"> tag found at all');
  }

  // R2 check
  var workhseetMatches = htmlText.match(WORKSHEET_IMG_ALT_EMPTY_REGEX);
  if (workhseetMatches && workhseetMatches.length > 0) {
    report.r2Applies = true;
  } else if (htmlText.indexOf('id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__"') !== -1
          || /id="lcs-worksheet-img"\s+alt="[^"]+"/.test(htmlText)) {
    report.r2AlreadyDone = true;
  }

  // R3 check — count empty-alt deckend thumbs
  var deckendEmpty = htmlText.match(DECKEND_THUMB_ALT_EMPTY_REGEX);
  if (deckendEmpty && deckendEmpty.length > 0) {
    report.r3Applies = deckendEmpty.length;
  }
  // Detect already-done state: presence of __SUGGESTION_i_ALT__ placeholder OR
  // non-empty alt on lcs-deckend-thumb suggests prior retrofit.
  if (htmlText.indexOf('__SUGGESTION_1_ALT__') !== -1
      || /class="lcs-deckend-thumb"[^>]*alt="[^"]+"/.test(htmlText)) {
    report.r3AlreadyDone = true;
  }

  // R4 check — celebration literal
  if (htmlText.indexOf('alt=\\"Your completed worksheet\\"') !== -1) {
    report.r4Applies = true;
  } else if (htmlText.indexOf('window.translations[(DECK_BUNDLE&&DECK_BUNDLE.contentLanguage)') !== -1) {
    report.r4AlreadyDone = true;
  }

  // R5 check — meta-tag alt-text was substituted at original publish time
  // (pre-commission code used title-mirror; we need to reset to placeholder
  // so substitute.apply() can re-fill with the new composeOgImageAlt formula).
  if (/<meta\s+property="og:image:alt"\s+content="__OG_IMAGE_ALT__"/.test(htmlText)) {
    report.r5AlreadyDone = true;
  } else if (/<meta\s+property="og:image:alt"\s+content="[^"]+"/.test(htmlText)) {
    report.r5Applies = true;
  }

  return report;
}

// ============================================================
// Per-deck rewrite (Phase 2 — applies all 4 rewrites)
// ============================================================

function rewriteHtml(htmlText, deckId) {
  var changes = [];

  // R1: inject role + aria-label placeholder on <main>
  if (htmlText.indexOf(MAIN_NO_ROLE_LITERAL) !== -1) {
    htmlText = htmlText.split(MAIN_NO_ROLE_LITERAL).join(
      '<main id="lcs-app" role="application" aria-label="__APP_ARIA_LABEL__">'
    );
    changes.push('R1');
  }

  // R2: inject __WORKSHEET_MAIN_ALT__ placeholder
  if (WORKSHEET_IMG_ALT_EMPTY_REGEX.test(htmlText)) {
    htmlText = htmlText.replace(
      WORKSHEET_IMG_ALT_EMPTY_REGEX,
      '$1alt="__WORKSHEET_MAIN_ALT__"$2'
    );
    changes.push('R2');
  }

  // R3: enumerate deck-end thumbs and assign __SUGGESTION_i_ALT__ placeholders
  // Walk through the empty-alt occurrences in order; replace each with the
  // corresponding placeholder.
  var thumbIdx = 0;
  htmlText = htmlText.replace(DECKEND_THUMB_ALT_EMPTY_REGEX, function (_, pre, post) {
    thumbIdx++;
    return pre + 'alt="__SUGGESTION_' + thumbIdx + '_ALT__"' + post;
  });
  if (thumbIdx > 0) changes.push('R3(' + thumbIdx + ')');

  // R4: celebration mini literal → runtime expression
  if (htmlText.indexOf('alt=\\"Your completed worksheet\\"') !== -1) {
    htmlText = htmlText.split('alt=\\"Your completed worksheet\\"').join(
      'alt=\\"' + CELEBRATION_RUNTIME_EXPR + '\\"'
    );
    changes.push('R4');
  }

  // R5: reset og:image:alt + twitter:image:alt + JSON-LD caption back to
  // __OG_IMAGE_ALT__ placeholder so substitute.apply() can re-fill with the
  // composeOgImageAlt formula. Pre-commission code substituted these to the
  // title-mirror value at original publish; the placeholder needs to be
  // restored for re-substitution to take effect.
  var r5Hits = 0;
  if (OG_META_ALT_REGEX.test(htmlText)) {
    htmlText = htmlText.replace(OG_META_ALT_REGEX, '$1"__OG_IMAGE_ALT__"');
    r5Hits++;
  }
  if (TWITTER_META_ALT_REGEX.test(htmlText)) {
    htmlText = htmlText.replace(TWITTER_META_ALT_REGEX, '$1"__OG_IMAGE_ALT__"');
    r5Hits++;
  }
  if (JSONLD_CAPTION_REGEX.test(htmlText)) {
    htmlText = htmlText.replace(JSONLD_CAPTION_REGEX, '$1"__OG_IMAGE_ALT__"');
    r5Hits++;
  }
  if (r5Hits > 0) changes.push('R5(' + r5Hits + ')');

  return { html: htmlText, changes: changes };
}

// ============================================================
// Manifest load + substitute.apply
// ============================================================

function applySubstitution(deckDir, htmlText, slugCandidate) {
  var manifestPath = path.join(deckDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return { html: htmlText, substituted: false, error: 'manifest.json missing' };
  }
  var manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    return { html: htmlText, substituted: false, error: 'manifest parse: ' + e.message };
  }
  try {
    var result = substitute.apply({
      manifest: manifest,
      metadata: { age_range: manifest.metadata && manifest.metadata.age_range || manifest.age_range },
      deckHtml: htmlText,
      slugCandidate: slugCandidate,
      suggestions: [],  // suggestions left raw; retrofit can re-run with real suggestions later
    });
    return { html: result.html, substituted: true, warnings: result.warnings, errors: result.errors };
  } catch (e) {
    return { html: htmlText, substituted: false, error: 'substitute.apply: ' + e.message };
  }
}

// ============================================================
// FS walk
// ============================================================

function listDeckDirs(decksRoot, locale, sampleN) {
  var localeDir = path.join(decksRoot, locale);
  if (!fs.existsSync(localeDir)) return [];
  var entries = fs.readdirSync(localeDir, { withFileTypes: true });
  var dirs = entries
    .filter(function (e) { return e.isDirectory() && !e.name.startsWith('.'); })
    .map(function (e) { return path.join(localeDir, e.name); });
  if (sampleN && sampleN > 0 && dirs.length > sampleN) dirs = dirs.slice(0, sampleN);
  return dirs;
}

function processDeck(deckDir, slug, opts) {
  var htmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(htmlPath)) {
    return { skip: 'deck.html missing', deckDir: deckDir };
  }
  var raw = fs.readFileSync(htmlPath, 'utf8');
  var classified = classify(raw);

  // Skip if everything already done
  var allDone = !classified.r1Applies && !classified.r2Applies && classified.r3Applies === 0
    && !classified.r4Applies && !classified.r5Applies;
  if (allDone) {
    return { idempotent: true, deckDir: deckDir, classified: classified };
  }

  var rewritten = rewriteHtml(raw, slug);
  var finalHtml = rewritten.html;

  if (!opts.skipSubstitute) {
    var subResult = applySubstitution(deckDir, finalHtml, slug);
    finalHtml = subResult.html;
    if (subResult.error) {
      return {
        deckDir: deckDir,
        classified: classified,
        rewrites: rewritten.changes,
        substituteError: subResult.error,
        wouldWrite: opts.dryRun,
      };
    }
  }

  if (opts.dryRun) {
    return {
      deckDir: deckDir,
      classified: classified,
      rewrites: rewritten.changes,
      wouldWrite: true,
    };
  }

  // Atomic write: backup → write temp → rename
  var bakPath = htmlPath + '.bak.alt-text-retrofit';
  var tmpPath = htmlPath + '.tmp.alt-text-retrofit';
  try {
    if (!fs.existsSync(bakPath)) fs.copyFileSync(htmlPath, bakPath);
    fs.writeFileSync(tmpPath, finalHtml, 'utf8');
    fs.renameSync(tmpPath, htmlPath);
  } catch (e) {
    return { deckDir: deckDir, error: 'fs write: ' + e.message };
  }
  return {
    deckDir: deckDir,
    classified: classified,
    rewrites: rewritten.changes,
    written: true,
  };
}

// ============================================================
// Main
// ============================================================

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== alt-text retrofit ===');
  console.log('mode:        ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root:  ' + opts.decksRoot);
  console.log('locales:     ' + opts.locales.join(', '));
  console.log('sample:      ' + (opts.sample || 'all'));
  console.log('substitute:  ' + (opts.skipSubstitute ? 'SKIPPED (placeholders left raw)' : 'apply via substitute.apply'));
  console.log('');

  var totals = {};
  opts.locales.forEach(function (locale) {
    var t = { total: 0, written: 0, idempotent: 0, errors: 0, wouldWrite: 0 };
    var dirs = listDeckDirs(opts.decksRoot, locale, opts.sample);
    dirs.forEach(function (deckDir) {
      var slug = path.basename(deckDir).replace(/-v\d+$/, '');
      var result = processDeck(deckDir, slug, opts);
      t.total++;
      if (result.skip) { /* missing */ }
      else if (result.idempotent) t.idempotent++;
      else if (result.error || result.substituteError) t.errors++;
      else if (result.written) t.written++;
      else if (result.wouldWrite) t.wouldWrite++;
    });
    totals[locale] = t;
    console.log('[' + locale + '] ' + t.total + ' decks; ' +
      (opts.dryRun
        ? t.wouldWrite + ' would-rewrite, '
        : t.written + ' written, ') +
      t.idempotent + ' idempotent, ' + t.errors + ' errors');
  });

  console.log('');
  console.log('=== Summary ===');
  var grand = { total: 0, written: 0, idempotent: 0, errors: 0, wouldWrite: 0 };
  Object.keys(totals).forEach(function (loc) {
    var t = totals[loc];
    grand.total += t.total;
    grand.written += t.written;
    grand.idempotent += t.idempotent;
    grand.errors += t.errors;
    grand.wouldWrite += t.wouldWrite;
  });
  console.log('Grand total:   ' + grand.total + ' decks across ' + opts.locales.length + ' locales');
  if (opts.dryRun) {
    console.log('Would rewrite: ' + grand.wouldWrite);
  } else {
    console.log('Rewritten:     ' + grand.written);
  }
  console.log('Idempotent:    ' + grand.idempotent);
  console.log('Errors:        ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = {
  classify: classify,
  rewriteHtml: rewriteHtml,
  applySubstitution: applySubstitution,
  LOCALE_CHUNK_ORDER: LOCALE_CHUNK_ORDER,
};
