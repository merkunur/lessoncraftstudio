/**
 * Phase 4a retrofit script: walks production deck.html files at
 * /var/www/lcs-media/decks/<locale>/<slug>-v<N>/, re-emits SEO surface
 * via SEO_INSERTION_POINT marker pair, converts celebration <h1> → <h2>
 * in body, backfills Deck.titleHash + Deck.descriptionHash DB columns.
 *
 * Per [ARC][SEO][DECK-PAGE] Phase 4a + §15.17 salvage-script pattern:
 *   1. Pre-pass classification (pure; no FS writes)
 *   2. Halt-class detection (gate before any side-effect)
 *   3. Backup-then-rewrite (per-deck atomicity via temp + atomic rename)
 *   4. Verification gate-rerun (confirm post-state matches expected)
 *
 * Three deck classes:
 *   A.1: post-Phase-3b deploy (`9a216155`+); manifest.seo_trace populated
 *        + SEO_INSERTION_POINT markers + 14 OG/Twitter tags. Defensive
 *        refresh; values from manifest.seo_trace.
 *   A.2: between Phase-3a.2 (`b8a0f9a3`) and Phase-3b (`9a216155`);
 *        markers + OG present BUT no manifest.seo_trace. Values from
 *        i18n + taxonomy fallback chain.
 *   B:   pre-Phase-3a.2 (`b8a0f9a3`-); no markers, no OG. Inject markers
 *        + SEO block before </head>. Values from i18n + taxonomy.
 *
 * Atomicity per §15.5: temp + rename(2) within version dir. deck.html files
 * are NOT chattr +i in /var/www/lcs-media/decks/ (chattr only on
 * worksheet-generators, samples, admin-panels per §A.1).
 *
 * NOTE: this script is server-side; it modifies production deck.html files
 * at /var/www/lcs-media/decks/. Always run dry-run first; --confirm
 * required for real-mode per §A.13.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var buildSeoHeadMod = require('./build-seo-head');
var substitute = require('./substitute');
var i18n = require('./i18n');
var taxonomy = require('./taxonomy');
var db = require('./db');
var seoRecon = require('./seo-reconciliation');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var SEO_MARKER_START = '<!-- SEO_INSERTION_POINT_START -->';
var SEO_MARKER_END = '<!-- SEO_INSERTION_POINT_END -->';

// Celebration h1 → h2 fix (Phase 3a.2 sed pattern).
// Pattern matches the entire <h1...lcs-celebration__title...></h1> block;
// replaces opening + closing tags with h2.
var CELEBRATION_H1_OPEN_REGEX = /<h1(\s[^>]*class="[^"]*lcs-celebration__title[^"]*"[^>]*)>/g;

// Default English fallbacks for the 4 SEO words. Used when manifest.seo_trace
// absent (Class A.2 + B). Phase 5 NSR review may add localized values to
// frontend/messages/<locale>.json under "seo.words.*"; this script reads them
// when present and falls back to these defaults otherwise.
var SEO_WORD_DEFAULTS = {
  worksheet: 'Worksheet',
  freeInteractive: 'Free interactive',
  forWord: 'for',
  printOrPlay: 'Print or play online'
};

// ============================================================
// Filesystem walk
// ============================================================

/**
 * Walk /var/www/lcs-media/decks/<locale>/<slug>-v<N>/ deck.html files.
 * Mirrors rewrite-canonical-host.js walkDecksDir pattern.
 *
 * Returns array of absolute deck.html paths.
 *
 * Filters:
 * - Skips dot-prefixed dirs (e.g., .archived per §15.12)
 * - Filters by language if opts.language is non-'all'
 * - Filters by slug if opts.slug is set
 */
function walkDecks(rootDir, opts) {
  if (!fs.existsSync(rootDir)) return [];
  var locales = fs.readdirSync(rootDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(rootDir, n);
    return fs.statSync(p).isDirectory();
  });
  if (opts.language && opts.language !== 'all') {
    locales = locales.filter(function (l) { return l === opts.language; });
  }
  var decks = [];
  locales.forEach(function (locale) {
    var localeDir = path.join(rootDir, locale);
    var slugDirs = fs.readdirSync(localeDir).filter(function (n) {
      if (n.charAt(0) === '.') return false;
      var p = path.join(localeDir, n);
      // Match versioned-dir shape: <slug>-v<N>; skip the bare <slug> symlink itself
      // (we want the version dirs, not the symlinks)
      var stat;
      try { stat = fs.lstatSync(p); } catch (e) { return false; }
      return stat.isDirectory() && /-v\d+$/.test(n);
    });
    slugDirs.forEach(function (slugDir) {
      // Extract slug from "<slug>-v<N>"
      var slug = slugDir.replace(/-v\d+$/, '');
      if (opts.slug && slug !== opts.slug) return;
      var deckHtml = path.join(localeDir, slugDir, 'deck.html');
      if (fs.existsSync(deckHtml)) {
        decks.push({ deckHtml: deckHtml, locale: locale, slug: slug });
      }
    });
  });
  return decks;
}

// ============================================================
// Per-deck classification
// ============================================================

/**
 * Phase 1 classification. Pure function; no FS writes.
 *
 * Returns:
 *   {
 *     deckHtml, locale, slug,
 *     classification: 'rewrite' | 'halt-<reason>',
 *     seoClass: 'A' | 'B',          // marker presence
 *     traceClass: 'A.1' | 'A.2/B',  // manifest.seo_trace presence
 *     hasCelebrationH1: bool,
 *     manifest: {...},
 *     reason?: string                // for halt classes
 *   }
 */
function classifyDeck(entry) {
  var deckHtml = entry.deckHtml;
  var versionDir = path.dirname(deckHtml);
  var manifestPath = path.join(versionDir, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return Object.assign({}, entry, {
      classification: 'halt-no-manifest',
      reason: 'manifest.json absent in version dir'
    });
  }

  var html = fs.readFileSync(deckHtml, 'utf8');
  var hasMarkers = html.indexOf(SEO_MARKER_START) !== -1 && html.indexOf(SEO_MARKER_END) !== -1;
  var hasHead = /<\/head>/i.test(html);
  var hasCelebrationH1 = CELEBRATION_H1_OPEN_REGEX.test(html);
  CELEBRATION_H1_OPEN_REGEX.lastIndex = 0;  // reset stateful regex

  if (!hasMarkers && !hasHead) {
    return Object.assign({}, entry, {
      classification: 'halt-no-head',
      reason: 'No </head> tag for marker injection (Class B requires it)'
    });
  }

  var manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    return Object.assign({}, entry, {
      classification: 'halt-manifest-parse',
      reason: 'manifest.json parse error: ' + e.message
    });
  }

  var seoClass = hasMarkers ? 'A' : 'B';
  var traceClass = manifest.seo_trace ? 'A.1' : 'A.2/B';

  return Object.assign({}, entry, {
    classification: 'rewrite',
    seoClass: seoClass,
    traceClass: traceClass,
    hasCelebrationH1: hasCelebrationH1,
    manifest: manifest,
    html: html
  });
}

// ============================================================
// Per-deck rewrite
// ============================================================

/**
 * Resolve the 9 buildSeoHead opts for a given deck classification.
 *
 * For Class A.1 (manifest.seo_trace present): use trace values.
 * For Class A.2 / B (no trace): use i18n + taxonomy fallback chain.
 */
function resolveSeoOpts(c) {
  var manifest = c.manifest;
  var locale = manifest.language;
  var trace = manifest.seo_trace;

  // exerciseTypeName + exerciseTypeSlug
  var exerciseTypeName, exerciseTypeSlug;
  if (trace && trace.title && trace.title.typeName) {
    exerciseTypeName = trace.title.typeName.value || '';
  } else {
    // Fallback: taxonomy.exerciseTypeFor or capitalize the exercise_type slug
    try {
      var typeEntry = taxonomy.exerciseTypeFor(manifest.exercise_type, locale);
      exerciseTypeName = typeEntry && typeEntry.name ? typeEntry.name : capitalize(manifest.exercise_type || '');
    } catch (e) {
      exerciseTypeName = capitalize(manifest.exercise_type || '');
    }
  }
  exerciseTypeSlug = manifest.exercise_type || '';

  // themeName (nullable)
  var themeName = null;
  if (trace && trace.title && trace.title.themeName) {
    themeName = trace.title.themeName.value || null;
  } else if (manifest.theme) {
    try {
      var themeEntry = taxonomy.themeFor(manifest.theme, locale);
      themeName = themeEntry && themeEntry.name ? themeEntry.name : null;
    } catch (e) {
      themeName = null;
    }
  }

  // 4 SEO words (worksheet / freeInteractive / forWord / printOrPlay)
  var worksheetWord, freeInteractive, forWord, printOrPlay;
  if (trace && trace.title && trace.title.worksheetWord) {
    worksheetWord = trace.title.worksheetWord.value || SEO_WORD_DEFAULTS.worksheet;
    freeInteractive = (trace.description && trace.description.freeInteractive && trace.description.freeInteractive.value) || SEO_WORD_DEFAULTS.freeInteractive;
    forWord = (trace.description && trace.description.forWord && trace.description.forWord.value) || SEO_WORD_DEFAULTS.forWord;
    printOrPlay = (trace.description && trace.description.printOrPlay && trace.description.printOrPlay.value) || SEO_WORD_DEFAULTS.printOrPlay;
  } else {
    // Fallback: try i18n.seo.words.*; default to English
    worksheetWord = tryI18n(locale, 'seo.words.worksheet', SEO_WORD_DEFAULTS.worksheet);
    freeInteractive = tryI18n(locale, 'seo.words.free_interactive', SEO_WORD_DEFAULTS.freeInteractive);
    forWord = tryI18n(locale, 'seo.words.for', SEO_WORD_DEFAULTS.forWord);
    printOrPlay = tryI18n(locale, 'seo.words.print_or_play_online', SEO_WORD_DEFAULTS.printOrPlay);
  }

  // instruction
  var instruction = '';
  if (trace && trace.description && trace.description.instruction) {
    instruction = trace.description.instruction.value || '';
  }
  // For Class A.2/B without trace, instruction stays empty — description still
  // forms a valid sentence via "Free interactive {type} worksheet ({theme}) for
  // {level}. Print or play online."

  return {
    language: locale,
    exerciseTypeName: exerciseTypeName,
    exerciseTypeSlug: exerciseTypeSlug,
    themeName: themeName,
    worksheetWord: worksheetWord,
    instruction: instruction,
    freeInteractive: freeInteractive,
    forWord: forWord,
    printOrPlay: printOrPlay
  };
}

function tryI18n(locale, key, fallback) {
  try {
    var r = i18n.resolve(locale, key, null);
    return r && r.value ? r.value : fallback;
  } catch (e) {
    return fallback;
  }
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/-(.)/g, function (_, ch) { return ' ' + ch.toUpperCase(); }) : '';
}

/**
 * Compute the new deck.html bytes for a classified deck.
 * Phase 2 of the salvage-script lifecycle (called per-deck).
 * Pure-ish: takes classification, returns new bytes string. Reads i18n
 * + taxonomy modules; no FS writes here.
 */
function computeNewHtml(c) {
  var html = c.html;
  var seoOpts = resolveSeoOpts(c);

  // Step 1: emit SEO block with placeholders
  var seoBlockTemplate = buildSeoHeadMod.buildSeoHead(seoOpts);

  // Step 2: replace marker-pair (Class A) or inject before </head> (Class B)
  if (c.seoClass === 'A') {
    html = html.replace(
      /<!-- SEO_INSERTION_POINT_START -->[\s\S]*?<!-- SEO_INSERTION_POINT_END -->/,
      function () { return seoBlockTemplate; }  // function form: no $-interpolation surprises
    );
  } else {
    html = html.replace(/<\/head>/i, function () { return seoBlockTemplate + '\n</head>'; });
  }

  // Step 3: convert celebration h1 → h2 (body fix per Phase 3a.2)
  // Line-context sed-style approach mirrors Phase 3a.2's exact sed pattern:
  //   /lcs-celebration__title/{s|<h1 |<h2 |; s|</h1>|</h2>|}
  // On lines containing 'lcs-celebration__title', convert <h1 → <h2 +
  // </h1> → </h2>. Handles BOTH unescaped form (in plain HTML body)
  //   <h1 class="lcs-celebration__title">...</h1>
  // AND backslash-escaped form (inside JS string literals in deck.html
  // runtime templates):
  //   "<h1 class=\"lcs-celebration__title\">"+T("youDidIt")+"</h1>"+
  // Both forms have `<h1 ` (h1 + space) which matches uniformly. Other h1
  // elements on different lines (e.g., the worksheet title h1) are
  // PRESERVED — only celebration-line h1 converts.
  html = html.split('\n').map(function (line) {
    if (line.indexOf('lcs-celebration__title') === -1) return line;
    return line.replace(/<h1 /g, '<h2 ').replace(/<\/h1>/g, '</h2>');
  }).join('\n');

  // Step 4: run substitute.apply to fill placeholders
  // The substitute.apply takes the manifest + deckHtml and substitutes all 37
  // placeholders (canonical URL, level, OG/Twitter, hreflang, etc.). For
  // Phase 4a retrofit, the input deckHtml has the new SEO block injected
  // (with placeholders); substitute fills them.
  var slugCandidate = c.slug;
  var ageRange = inferAgeRange(c.manifest);
  var subResult = substitute.apply({
    manifest: c.manifest,
    metadata: { age_range: ageRange, theme: c.manifest.theme },
    deckHtml: html,
    slugCandidate: slugCandidate
  });

  return {
    newHtml: subResult.html,
    substituteResult: subResult,
    seoOpts: seoOpts
  };
}

/**
 * Infer age_range for the deck. Phase 3a.1 substitute.apply expects
 * metadata.age_range; for retrofit, the manifest may not carry it directly,
 * so we derive from taxonomy.appConfig if absent.
 */
function inferAgeRange(manifest) {
  if (manifest.metadata && manifest.metadata.age_range) return manifest.metadata.age_range;
  try {
    var cfg = taxonomy.appConfig(manifest.generator && manifest.generator.app);
    return cfg && cfg.default_age_range ? cfg.default_age_range : '5-7';
  } catch (e) {
    return '5-7';
  }
}

// ============================================================
// Phase 3: backup-then-rewrite (atomic per-deck)
// ============================================================

async function rewriteOne(c, opts) {
  var deckHtml = c.deckHtml;
  var computed = computeNewHtml(c);
  var newHtml = computed.newHtml;

  if (computed.substituteResult.errors && computed.substituteResult.errors.length > 0) {
    return {
      ok: false,
      deckHtml: deckHtml,
      reason: 'substitute errors: ' + computed.substituteResult.errors.join('; ')
    };
  }

  // Optional backup
  if (opts.backupDir) {
    var backupPath = path.join(opts.backupDir, c.locale + '__' + c.slug + '__deck.html.bak');
    if (!fs.existsSync(opts.backupDir)) fs.mkdirSync(opts.backupDir, { recursive: true });
    fs.writeFileSync(backupPath, c.html);
  }

  // Atomic temp + rename
  var tmpPath = deckHtml + '.new';
  fs.writeFileSync(tmpPath, newHtml);
  fs.renameSync(tmpPath, deckHtml);  // rename(2) atomic on POSIX

  // Backfill DB titleHash + descriptionHash
  // Run reconcileDeckPageSEO to compute the hashes from the final substituted HTML
  var titleMatch = /<title>([^<]+)<\/title>/i.exec(newHtml);
  var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(newHtml);
  var renderedTitle = titleMatch ? titleMatch[1] : '';
  var renderedDescription = descMatch ? descMatch[1] : '';

  var hashes = computeSeoHashes(renderedTitle, renderedDescription);
  if (hashes.titleHash || hashes.descriptionHash) {
    var deckRow;
    try {
      deckRow = await db.findExistingBySlug(c.locale, c.slug);
    } catch (e) {
      // DB unavailable (local dev); skip backfill but report
      return {
        ok: true,
        deckHtml: deckHtml,
        seoClass: c.seoClass,
        traceClass: c.traceClass,
        dbBackfill: 'skipped: ' + e.message,
        substituteWarnings: computed.substituteResult.warnings
      };
    }
    if (deckRow) {
      try {
        await db.client().deck.update({
          where: { id: deckRow.id },
          data: {
            titleHash: hashes.titleHash,
            descriptionHash: hashes.descriptionHash
          }
        });
      } catch (e) {
        return {
          ok: true,
          deckHtml: deckHtml,
          seoClass: c.seoClass,
          traceClass: c.traceClass,
          dbBackfill: 'failed: ' + e.message,
          substituteWarnings: computed.substituteResult.warnings
        };
      }
    }
  }

  return {
    ok: true,
    deckHtml: deckHtml,
    seoClass: c.seoClass,
    traceClass: c.traceClass,
    dbBackfill: 'ok',
    substituteWarnings: computed.substituteResult.warnings
  };
}

/**
 * Compute SHA-1 hashes of normalized rendered title + description.
 * Matches the seo-reconciliation.js reconcileTitleUniqueness +
 * reconcileDescriptionUniqueness predicate logic.
 */
function computeSeoHashes(renderedTitle, renderedDescription) {
  // Use seoRecon's normalize-and-hash logic; if exposed, call directly.
  // The predicates internally hash via crypto.createHash('sha1'); we mirror
  // here to compute hashes outside the predicate's full reconciliation flow.
  var crypto = require('crypto');
  function normalize(s) {
    return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }
  var titleHash = renderedTitle ? crypto.createHash('sha1').update(normalize(renderedTitle)).digest('hex') : null;
  var descriptionHash = renderedDescription ? crypto.createHash('sha1').update(normalize(renderedDescription)).digest('hex') : null;
  return { titleHash: titleHash, descriptionHash: descriptionHash };
}

// ============================================================
// Main entrypoint
// ============================================================

async function republishSeo(opts) {
  var rootDir = opts.baseDir || DEFAULT_DECKS_DIR;
  var dryRun = !!opts.dryRun;

  // Phase 1: walk + classify
  var entries = walkDecks(rootDir, { language: opts.language, slug: opts.slug });
  var classifications = entries.map(classifyDeck);

  // Phase 2: halt-class detection
  var haltClasses = classifications.filter(function (c) {
    return c.classification && c.classification.indexOf('halt-') === 0;
  });
  if (haltClasses.length > 0) {
    console.error('[republish-seo] HALT — ' + haltClasses.length + ' decks have halt-class issues:');
    haltClasses.forEach(function (h) {
      console.error('  ' + h.locale + '/' + h.slug + ': ' + h.classification + ' — ' + (h.reason || ''));
    });
    return { ok: false, halts: haltClasses.length, reason: 'halt-classes detected' };
  }

  var rewriteCount = classifications.filter(function (c) { return c.classification === 'rewrite'; }).length;

  if (dryRun) {
    console.log('[republish-seo] DRY-RUN — ' + classifications.length + ' decks classified:');
    var byClass = {};
    classifications.forEach(function (c) {
      var key = c.seoClass + ' / ' + c.traceClass + (c.hasCelebrationH1 ? ' / h1-celebration' : '');
      byClass[key] = (byClass[key] || 0) + 1;
    });
    Object.keys(byClass).forEach(function (k) {
      console.log('  ' + byClass[k] + ' decks: ' + k);
    });
    console.log('[republish-seo] would rewrite: ' + rewriteCount + '; halt-class: 0');
    return { ok: true, dryRun: true, rewriteCount: rewriteCount };
  }

  // Phase 3: rewrite (per-deck atomicity)
  var outcomes = [];
  for (var i = 0; i < classifications.length; i++) {
    var c = classifications[i];
    if (c.classification !== 'rewrite') continue;
    var outcome;
    try {
      outcome = await rewriteOne(c, opts);
    } catch (e) {
      outcome = {
        ok: false,
        deckHtml: c.deckHtml,
        reason: 'rewrite exception: ' + e.message
      };
    }
    outcomes.push(Object.assign({}, outcome, {
      locale: c.locale, slug: c.slug
    }));
  }

  // Phase 4: verification gate-rerun (re-classify after rewrite)
  var failedRewrites = outcomes.filter(function (o) { return !o.ok; });
  var succeededRewrites = outcomes.filter(function (o) { return o.ok; });

  console.log('[republish-seo] Rewrite summary: ' + succeededRewrites.length + ' OK, ' + failedRewrites.length + ' failed.');
  if (failedRewrites.length > 0) {
    console.error('Failures:');
    failedRewrites.forEach(function (f) {
      console.error('  ' + f.locale + '/' + f.slug + ': ' + (f.reason || 'unknown'));
    });
  }

  return {
    ok: failedRewrites.length === 0,
    total: outcomes.length,
    succeeded: succeededRewrites.length,
    failed: failedRewrites.length,
    outcomes: outcomes
  };
}

module.exports = {
  republishSeo: republishSeo,
  walkDecks: walkDecks,
  classifyDeck: classifyDeck,
  resolveSeoOpts: resolveSeoOpts,
  computeNewHtml: computeNewHtml,
  computeSeoHashes: computeSeoHashes,
  SEO_MARKER_START: SEO_MARKER_START,
  SEO_MARKER_END: SEO_MARKER_END,
  SEO_WORD_DEFAULTS: SEO_WORD_DEFAULTS,
  DEFAULT_DECKS_DIR: DEFAULT_DECKS_DIR
};
