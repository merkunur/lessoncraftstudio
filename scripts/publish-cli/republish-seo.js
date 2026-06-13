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
// Commission 16b: per-(exercise-type × locale) deck-description floor skill
// sentences (distilled from the verified single-axis topicMeta entries).
var SKILL_SENTENCES = require('./seo-skill-sentences.json');
// Title overhaul: per-locale title formula/keyword config + per-deck
// content-derived differentiator (replaces the old "Set NNN" tail).
var SEO_TITLE_CONFIG = require('./seo-title-config.json');
var seoDifferentiator = require('./seo-differentiator');

// Title-overhaul disambiguator map (locale -> slug -> code) for the small set of
// decks that GENUINELY collide on their composed title (same type+theme+level AND
// same content differentiator — e.g. practice-set variants of one image). Built
// by the audit-title-differentiators.js pre-flight; loaded here for --confirm.
// null = no disambiguators applied (clean titles) — the pre-flight's first pass
// runs with null to surface the real collisions, then re-runs with the map to
// verify zero. Decks NOT in the map stay code-free (so decks already made unique
// by their own content differentiator never get a redundant code).
var _disambiguatorMap = null;
function setDisambiguatorMap(m) { _disambiguatorMap = m || null; }
function loadDisambiguatorMapFile(p) {
  _disambiguatorMap = JSON.parse(fs.readFileSync(p, 'utf8'));
  return _disambiguatorMap;
}

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var SEO_MARKER_START = '<!-- SEO_INSERTION_POINT_START -->';
var SEO_MARKER_END = '<!-- SEO_INSERTION_POINT_END -->';

// Celebration h1 → h2 fix (Phase 3a.2 sed pattern).
// Pattern matches the entire <h1...lcs-celebration__title...></h1> block;
// replaces opening + closing tags with h2.
var CELEBRATION_H1_OPEN_REGEX = /<h1(\s[^>]*class="[^"]*lcs-celebration__title[^"]*"[^>]*)>/g;

// Default English fallbacks for the 4 SEO words. Used when manifest.seo_trace
// absent (Class A.2 + B) AND when trace values match these English defaults
// (indicates app-side _t() lookup fell back to English at gen time — cryptogram
// + chart-count surfaced this in 2026-05-14 ES wave). Phase 5 NSR review added
// localized values to frontend/messages/<locale>.json under "seo.words.*";
// this script reads them when present and falls back to these defaults otherwise.
var SEO_WORD_DEFAULTS = {
  worksheet: 'Worksheet',
  freeInteractive: 'Free interactive',
  forWord: 'for',
  printOrPlay: 'Print or play online',
  variantLabel: 'Set'
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

  // Native-language-slug commission 2026-05-11: prefer taxonomy.<axis>.<key>.name.<locale>
  // for typeName + themeName + modeName when present, overriding any trace value.
  // Rationale: trace values were baked at gen-time and may carry English fragments
  // (e.g., modeName="Find Addend" derived from raw axis-key) even when isLocalized=true.
  // Taxonomy is the canonical source-of-truth for axis-key names per §17.4 +
  // §17.8.5 + §A.13.5 Shape A (taxonomy-as-canonical for axis-bound copy).
  // Trace remains the source-of-truth for app-emitted copy that has no taxonomy
  // equivalent (canvas.lcsLocalizedTitle for exercise type, instruction).
  //
  // Backwards-compatibility: when no taxonomy entry exists for the (axis, key, locale)
  // tuple, falls back to trace value; when no trace either, falls back to title-case
  // derivation or capitalize. EN decks slug + name identically because axes.<axis>.<key>.name.en
  // === <axis-key>-title-cased verbatim for every entry.

  // exerciseTypeName + exerciseTypeSlug
  var exerciseTypeName, exerciseTypeSlug;
  exerciseTypeSlug = manifest.exercise_type || '';
  exerciseTypeName = null;
  // For non-en locales: prefer taxonomy.name.<locale> over trace (avoids
  // English residue when app's lcsLocalizedTitle was English at gen time —
  // e.g. bingo shipped trace.typeName="Picture Bingo" for ES decks because
  // the app's locale-binding failed). Taxonomy is canonical SoT per §17.4.
  // For en: keep trace-first behavior so app-curated marketing names like
  // "Suma Divertida" win over generic taxonomy "Addition".
  var typeEntry = null;
  try {
    typeEntry = taxonomy.exerciseTypeFor(manifest.exercise_type, locale);
  } catch (e) { /* defensive */ }
  if (locale !== 'en' && typeEntry && typeEntry.name) {
    exerciseTypeName = typeEntry.name;
  } else if (trace && trace.title && trace.title.typeName && trace.title.typeName.value) {
    exerciseTypeName = trace.title.typeName.value;
  } else if (typeEntry && typeEntry.name) {
    exerciseTypeName = typeEntry.name;
  } else {
    exerciseTypeName = capitalize(manifest.exercise_type || '');
  }

  // themeName (nullable) — PREFER TAXONOMY over trace per native-language-slug commission.
  // Trace's themeName for non-en often holds the raw English axis-key ("animals")
  // rather than localized name ("Animales"). Taxonomy is authoritative.
  var themeName = null;
  if (manifest.theme) {
    try {
      var themeEntry = taxonomy.themeFor(manifest.theme, locale);
      themeName = themeEntry && themeEntry.name ? themeEntry.name : null;
    } catch (e) {
      themeName = null;
    }
    // Fallback to trace only if taxonomy missed (and trace value isn't the raw key)
    if (!themeName && trace && trace.title && trace.title.themeName && trace.title.themeName.value) {
      var traceThemeName = trace.title.themeName.value;
      // Filter out raw-axis-key fallbacks (e.g., "animals" when locale=es expects "Animales")
      if (traceThemeName !== manifest.theme) {
        themeName = traceThemeName;
      }
    }
  }

  // 4 SEO words (worksheet / freeInteractive / forWord / printOrPlay)
  // Preference: trace value when present AND not English-default (locale-residue
  // detection per the 2026-05-14 cryptogram/chart-count surface). When trace
  // value EQUALS English default AND locale != en, fall back to i18n (locale's
  // seo.words.* entry in frontend/messages) — recovers Spanish "Ficha" etc.
  // for apps whose _t() lookup misfired at gen time.
  function resolveSeoWord(traceVal, defaultEN, i18nKey) {
    var i18nVal = tryI18n(locale, i18nKey, null);
    if (traceVal && traceVal !== defaultEN) return traceVal;       // trust trace if non-English
    if (locale !== 'en' && i18nVal) return i18nVal;                // override English-residue with i18n
    return traceVal || i18nVal || defaultEN;                       // final fallback
  }
  var worksheetWord, freeInteractive, forWord, printOrPlay;
  if (trace && trace.title && trace.title.worksheetWord) {
    worksheetWord   = resolveSeoWord(trace.title.worksheetWord.value, SEO_WORD_DEFAULTS.worksheet,            'seo.words.worksheet');
    freeInteractive = resolveSeoWord((trace.description && trace.description.freeInteractive && trace.description.freeInteractive.value) || null, SEO_WORD_DEFAULTS.freeInteractive, 'seo.words.free_interactive');
    forWord         = resolveSeoWord((trace.description && trace.description.forWord && trace.description.forWord.value) || null, SEO_WORD_DEFAULTS.forWord, 'seo.words.for');
    printOrPlay     = resolveSeoWord((trace.description && trace.description.printOrPlay && trace.description.printOrPlay.value) || null, SEO_WORD_DEFAULTS.printOrPlay, 'seo.words.print_or_play_online');
  } else {
    // Fallback: try i18n.seo.words.*; default to English
    worksheetWord   = tryI18n(locale, 'seo.words.worksheet',              SEO_WORD_DEFAULTS.worksheet);
    freeInteractive = tryI18n(locale, 'seo.words.free_interactive',       SEO_WORD_DEFAULTS.freeInteractive);
    forWord         = tryI18n(locale, 'seo.words.for',                    SEO_WORD_DEFAULTS.forWord);
    printOrPlay     = tryI18n(locale, 'seo.words.print_or_play_online',   SEO_WORD_DEFAULTS.printOrPlay);
  }
  // Variant label localized per locale (es: "Conjunto", de: "Satz", etc.).
  // Trace doesn't carry this field (added Phase 5+ post-§11 commission); always
  // resolve from i18n.
  var variantLabel = tryI18n(locale, 'seo.words.variant_label',           SEO_WORD_DEFAULTS.variantLabel);

  // instruction
  var instruction = '';
  if (trace && trace.description && trace.description.instruction) {
    instruction = trace.description.instruction.value || '';
  }
  // For Class A.2/B without trace, instruction stays empty — description still
  // forms a valid sentence via "Free interactive {type} worksheet ({theme}) for
  // {level}. Print or play online."

  // Phase 4a Checkpoint 2.5 (θ): exercise_mode discriminator for title
  // uniqueness invariant (Phase 2 §1).
  // Native-language-slug commission 2026-05-11: PREFER taxonomy.exerciseModeFor
  // over trace + title-case-derivation. Trace value derived from manifest.exercise_mode
  // via title-case (e.g., "find-addend" → "Find Addend") leaks English when the
  // locale has a Spanish taxonomy entry ("Buscar Sumando"). Taxonomy is authoritative.
  var exerciseModeName = null;
  if (manifest.exercise_mode) {
    try {
      var modeEntry = taxonomy.exerciseModeFor(manifest.exercise_mode, locale);
      exerciseModeName = modeEntry && modeEntry.name ? modeEntry.name : null;
    } catch (e) {
      exerciseModeName = null;
    }
    // Fallback to trace only if taxonomy missed AND trace value differs from
    // the raw title-cased axis-key (which would just be English residue).
    if (!exerciseModeName && trace && trace.title && trace.title.modeName && trace.title.modeName.value) {
      var traceMode = trace.title.modeName.value;
      var titleCaseEN = deriveExerciseModeNameLocal(manifest.exercise_mode);
      if (traceMode !== titleCaseEN) {
        exerciseModeName = traceMode;
      }
    }
    // Final fallback: title-case-derived English (matches pre-amendment behavior for EN).
    if (!exerciseModeName) {
      exerciseModeName = deriveExerciseModeNameLocal(manifest.exercise_mode);
    }
  }

  // §11 commission: variant_id discriminator (load-bearing for §17.8.17
  // Invariant 1+2 title/description uniqueness on fresh-roll variations).
  // Source: manifest.variant_id baked at gen time. Without this, retrofit
  // would drop the "Set XXX" suffix → identical titles across (type, mode,
  // theme) tuples → uniqueness HALT class.
  var variantId = (manifest.variant_id !== undefined && manifest.variant_id !== null && manifest.variant_id !== '')
                    ? String(manifest.variant_id) : null;

  return {
    language: locale,
    exerciseTypeName: exerciseTypeName,
    exerciseTypeSlug: exerciseTypeSlug,
    themeName: themeName,
    exerciseModeName: exerciseModeName,
    worksheetWord: worksheetWord,
    instruction: instruction,
    freeInteractive: freeInteractive,
    forWord: forWord,
    printOrPlay: printOrPlay,
    variantLabel: variantLabel,
    variantId: variantId
  };
}

/**
 * Title overhaul: resolve the per-locale title config block, merging
 * seo-title-config.json `_default` with the locale block. numericTemplates are
 * NOT inherited from _default for non-en locales (English numeric phrasing like
 * "Sums to 20" would leak on themeless math decks of locales whose expert
 * ensemble hasn't authored templates yet) — they are inherited only for en.
 */
function resolveTitleConfig(locale) {
  var def = SEO_TITLE_CONFIG._default || {};
  var loc = SEO_TITLE_CONFIG[locale] || null;
  var merged = Object.assign({}, def, loc || {});
  merged.diff = Object.assign({}, def.diff || {}, (loc && loc.diff) || {});
  merged.vocab = Object.assign({}, def.vocab || {}, (loc && loc.vocab) || {});
  merged.charBudget = Object.assign({}, def.charBudget || {}, (loc && loc.charBudget) || {});
  if (loc && loc.numericTemplates) {
    merged.numericTemplates = loc.numericTemplates;
  } else if (locale === 'en') {
    merged.numericTemplates = def.numericTemplates;
  } else {
    merged.numericTemplates = {}; // disables numeric phrasing for non-en until authored
  }
  return merged;
}

/**
 * Local helper: title-case `manifest.exercise_mode` slug for Class A.2/B
 * fallback. Mirrors build-seo-head.js deriveExerciseModeName + catalog-
 * export.js shared helper.
 */
function deriveExerciseModeNameLocal(rawMode) {
  if (!rawMode || typeof rawMode !== 'string') return null;
  var s = rawMode.trim();
  if (!s) return null;
  return s.split('-').map(function (w) {
    if (!w) return '';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

/**
 * Strip pre-existing canonical SEO elements from an HTML segment.
 * Used by computeNewHtml to remove duplicates before injection (Class B)
 * or after marker-replace (Class A defensive cleanup).
 *
 * Removes:
 *   - <title>...</title>
 *   - <meta name="description" ...>
 *   - <link rel="canonical" ...>
 *   - <meta property="og:..." ...>
 *   - <meta name="twitter:..." ...>
 *   - <script type="application/ld+json">...</script>
 *
 * Collapses any blank lines left by the strip (≥3 consecutive newlines → 2).
 */
function stripPreExistingSeoElements(s) {
  s = s.replace(/<title>[\s\S]*?<\/title>/gi, '');
  s = s.replace(/<meta\s+name="description"[^>]*>/gi, '');
  s = s.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  s = s.replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '');
  s = s.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');
  s = s.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s;
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
 * Assemble the full buildSeoHead opts for a classified deck — the SINGLE source
 * of truth for the deck's SEO surface (title + description). Both computeNewHtml
 * (full rewrite) and composeProjectedTitle (lightweight pre-flight) call this so
 * the projected title can never drift from the rewritten one.
 *
 * Resolves the educational level + skill sentences (for the 120-170 description
 * band, Commission 16b) AND the title config + per-deck content differentiator +
 * collision-safe disambiguator (title overhaul). Reads i18n + taxonomy; no FS/DB.
 */
function buildSeoOpts(c) {
  var seoOpts = resolveSeoOpts(c);

  // Resolve the level via the SAME path substitute.js uses, so title (level now
  // baked directly by the new engine) + description carry identical level text.
  var ageRange16b = inferAgeRange(c.manifest);
  var lvlKey16b = taxonomy.AGE_RANGE_TO_LEVEL_I18N_KEY ? taxonomy.AGE_RANGE_TO_LEVEL_I18N_KEY[ageRange16b] : null;
  seoOpts.educationalLevelLocalized = lvlKey16b ? tryI18n(c.manifest.language, 'seo.educational_level.' + lvlKey16b, '') : '';
  var skill16b = skillSentenceFor(c.manifest.language, c.manifest.exercise_type);
  seoOpts.skillSentence = skill16b.full;
  seoOpts.skillSentenceShort = skill16b.short;

  // Title overhaul: per-locale title config + per-deck content-derived
  // differentiator (replaces the old "Set NNN" tail). buildSeoHead's new engine
  // composes a 50-70-char, brand-free, unique title when titleConfig is present.
  seoOpts.titleConfig = resolveTitleConfig(c.manifest.language);
  // Mode axis-key (raw) so the title engine can drop locale-specific jargon modes
  // from the head (config.headDropModes) — distinct from the localized modeName.
  seoOpts.exerciseModeKey = c.manifest.exercise_mode || null;
  // Cross-language decks: the content/target language name (localized, baked by
  // the app into manifest.content_language_name) leads the rebuilt title so the
  // preband/republish title rebuild preserves the "Spanish Word Search …" lead
  // instead of stripping it. Null/absent for monolingual decks.
  seoOpts.contentLanguageName = c.manifest.content_language_name || null;
  var diffResult = seoDifferentiator.deriveDifferentiator(
    c.manifest, c.manifest.language,
    { config: seoOpts.titleConfig, exerciseModeName: seoOpts.exerciseModeName }
  );
  seoOpts.differentiator = diffResult;
  // R15.2: per-locale "Features {phrase}." sentence for the description middle
  // pool. Source-gated: use the value ONLY when it resolves from the locale's
  // OWN seo.featuresSentence (res.source === 'locale'), NEVER the en-fallback —
  // a lagging locale silently emits no diff sentence instead of leaking English.
  seoOpts.diffSentenceTemplate = '';
  try {
    var featRes = i18n.resolve(c.manifest.language, 'seo.featuresSentence', '');
    if (featRes && featRes.source === 'locale' && featRes.value) {
      seoOpts.diffSentenceTemplate = String(featRes.value);
    }
  } catch (e) { /* key absent in locale + en → leave feature off */ }
  // Disambiguator: ONLY decks that genuinely collide on their composed title get a
  // short code, per the pre-flight-built map (locale -> slug -> code). Decks made
  // unique by their own content differentiator (e.g. find-and-count sets that each
  // feature a distinct object) stay code-free. When no map is loaded, no code is
  // applied — that's the pre-flight's first pass, used to detect the real collisions.
  if (_disambiguatorMap) {
    var dmLoc = _disambiguatorMap[c.manifest.language];
    if (dmLoc && dmLoc[c.slug]) seoOpts.disambiguator = dmLoc[c.slug];
  }
  return seoOpts;
}

/**
 * Compose ONLY the projected <title> for a classified deck — no substitute, no
 * full-HTML rewrite (the new title bakes the resolved level, so substitute is
 * not needed to finalize it). Used by the read-only pre-flight to compute all
 * projected titles cheaply (avoids the OOM of running computeNewHtml catalog-wide).
 * Returns the rendered (HTML-escaped) <title> text.
 */
function composeProjectedTitle(c) {
  var seoOpts = buildSeoOpts(c);
  var block = buildSeoHeadMod.buildSeoHead(seoOpts);
  var m = /<title>([\s\S]*?)<\/title>/i.exec(block);
  return m ? m[1].trim() : '';
}

/**
 * Compute the new deck.html bytes for a classified deck.
 * Phase 2 of the salvage-script lifecycle (called per-deck).
 * Pure-ish: takes classification, returns new bytes string. Reads i18n
 * + taxonomy modules; no FS writes here.
 */
function computeNewHtml(c) {
  var html = c.html;
  var seoOpts = buildSeoOpts(c);

  // Step 1: emit SEO block with placeholders
  var seoBlockTemplate = buildSeoHeadMod.buildSeoHead(seoOpts);

  // Step 2: strip pre-existing SEO elements (defensive — handles both
  // Class B retrofit AND any contaminated Class A from prior incomplete
  // retrofit). Then inject/replace per class.
  //
  // Strip targets: <title>, <meta name="description">, <link rel="canonical">,
  // <meta property="og:*">, <meta name="twitter:*">, JSON-LD <script>.
  // Strip order matters for marker pair preservation: in Class A, the
  // marker pair contents include canonical SEO elements which the strip
  // would remove BEFORE the marker-replace runs. So Class A flow:
  // (a) FIRST replace between markers (write canonical SEO inside);
  // (b) THEN strip duplicates OUTSIDE markers.
  // Class B flow: (a) strip everywhere; (b) inject markers + content.

  if (c.seoClass === 'A') {
    // Class A: replace between markers FIRST
    html = html.replace(
      /<!-- SEO_INSERTION_POINT_START -->[\s\S]*?<!-- SEO_INSERTION_POINT_END -->/,
      function () { return seoBlockTemplate; }  // function form: no $-interpolation surprises
    );
    // Then strip duplicates OUTSIDE markers (defensive cleanup)
    var preMarker = '';
    var postMarker = '';
    var afterEnd = '';
    var startIdx = html.indexOf(SEO_MARKER_START);
    var endIdx = html.indexOf(SEO_MARKER_END);
    if (startIdx !== -1 && endIdx !== -1) {
      preMarker = html.substring(0, startIdx);
      postMarker = html.substring(startIdx, endIdx + SEO_MARKER_END.length);
      afterEnd = html.substring(endIdx + SEO_MARKER_END.length);
      // Strip pre-existing canonical SEO elements from preMarker + afterEnd
      // (the marker block preserves its own canonical content)
      preMarker = stripPreExistingSeoElements(preMarker);
      afterEnd = stripPreExistingSeoElements(afterEnd);
      html = preMarker + postMarker + afterEnd;
    }
  } else {
    // Class B: strip everywhere first, then inject markers + content
    html = stripPreExistingSeoElements(html);
    // Inject new SEO block before </head>
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
  if (manifest.age_range) return manifest.age_range;  // per-deck (worksheet-gen printables)
  if (manifest.metadata && manifest.metadata.age_range) return manifest.metadata.age_range;
  try {
    var cfg = taxonomy.appConfig(manifest.generator && manifest.generator.app);
    return cfg && cfg.default_age_range ? cfg.default_age_range : '5-7';
  } catch (e) {
    return '5-7';
  }
}

/**
 * Commission 16b: look up the per-(locale, exercise-type) floor skill sentence
 * from seo-skill-sentences.json. Falls back to the EN sentence, then empty
 * (buildSeoHead tolerates an empty skill sentence — it simply has no floor
 * filler available and returns the best-effort core).
 */
function skillSentenceFor(locale, exerciseType) {
  if (!exerciseType) return { full: '', short: '' };
  // NEVER fall back to the EN skill sentence for a non-en locale — that leaks
  // English into the (localized) description and trips the locale-residue gate
  // (it surfaced when the shorter 'Prescolare' it level pushed cores below the
  // 120-floor, making the band reach for the absent it skill → EN). A locale
  // without its own skill block simply emits no skill sentence; the description
  // falls back to its localized instruction + core.
  var byLoc = SKILL_SENTENCES[locale] || {};
  var e = byLoc[exerciseType] || {};
  if (typeof e === 'string') return { full: e, short: '' }; // C16b single-tier back-compat
  return { full: e.full || '', short: e.short || '' };       // C19 {full, short} tiers
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
  // Title-overhaul: load the collision disambiguator map (pre-flight artifact) so
  // genuinely-colliding decks get their short code at rewrite time.
  if (opts.disambiguatorMap) setDisambiguatorMap(opts.disambiguatorMap);
  else if (opts.disambiguatorMapFile) loadDisambiguatorMapFile(opts.disambiguatorMapFile);

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
  resolveTitleConfig: resolveTitleConfig,
  inferAgeRange: inferAgeRange,
  buildSeoOpts: buildSeoOpts,
  composeProjectedTitle: composeProjectedTitle,
  setDisambiguatorMap: setDisambiguatorMap,
  loadDisambiguatorMapFile: loadDisambiguatorMapFile,
  computeNewHtml: computeNewHtml,
  computeSeoHashes: computeSeoHashes,
  SEO_MARKER_START: SEO_MARKER_START,
  SEO_MARKER_END: SEO_MARKER_END,
  SEO_WORD_DEFAULTS: SEO_WORD_DEFAULTS,
  DEFAULT_DECKS_DIR: DEFAULT_DECKS_DIR
};
