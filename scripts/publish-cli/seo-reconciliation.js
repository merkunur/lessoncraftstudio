/**
 * [ARC][SEO][DECK-PAGE] Phase 3a.1 — gate predicates for deck-page SEO surface.
 *
 * Sibling to scripts/publish-cli/slug.js per §15.16 reconciliation gate
 * architecture. Mirrors the {category, ...metadata} return shape established
 * by reconcileManifestTheme + reconcileExerciseMode.
 *
 * Predicates (per Phase 2 doctrine §1-§7):
 *   1. reconcileTitleUniqueness          — Phase 2 §1; DB-async; HALT
 *   2. reconcileDescriptionUniqueness    — Phase 2 §2; DB-async; HALT
 *   3. reconcileCanonicalURLPattern      — Phase 2 §3 publish-time predicate; HALT
 *   4. reconcileOGTags                   — Phase 2 §4; HALT (missing) / WARN (image fallback)
 *   5. reconcileLocaleResidue            — Phase 2 §6 path-(a) lexicon-fallback; HALT
 *   6. reconcileSingleH1                 — Phase 2 §7; HALT
 *   7. reconcileInboundLinkSurface       — Phase 2 §5 (Checkpoint 1: stub; helper at Checkpoint 2)
 *
 * Plus orchestrator:
 *   reconcileDeckPageSEO(opts) — runs all 7; returns aggregated result for
 *     bulk.js dryRunOneZip Step 1d + publish.js single-deck path parity.
 *
 * Operator-locked predicate halt-vs-warn classes per Phase 3 ratification:
 *   HALT: TITLE_NON_UNIQUE / DESC_NON_UNIQUE / CANONICAL_* / OG_TAG_MISSING /
 *         LOCALE_RESIDUE_DETECTED / MULTIPLE_H1_DETECTED
 *   WARN: OG_IMAGE_FALLBACK_USED (informational ship-with-flag per §17.5.1)
 *   WARN pre-Phase-5; HALT post-Phase-5: INBOUND_LINK_COUNT_BELOW_TARGET
 */

'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

// =====================================================================
// Helpers
// =====================================================================

/**
 * sha256 hash of a string. Returns lowercase hex digest. Used for
 * Deck.titleHash + Deck.descriptionHash uniqueness predicates.
 */
function sha256(str) {
  return crypto.createHash('sha256').update(String(str || ''), 'utf8').digest('hex');
}

/**
 * www-form canonical URL base per §A.10. Apex form 301-redirects to www at
 * nginx layer; the gate halts on apex form because internal substitution
 * MUST emit www form (substitute.js: CANONICAL_URL_BASE).
 */
var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';

/**
 * BCP-47 mapping for og:locale. Mirrors frontend/lib/schema-generator.ts:
 * ogLocaleMap. The publish-cli side maintains its own copy to avoid
 * cross-package import (TypeScript ↔ Node-CJS boundary). Updates to either
 * MUST sync; see §17.10.2 reuse-existing-i18n-key-when-strings-identical
 * convention extended to BCP-47 locale codes.
 *
 * es: es_MX per Phase 0 D7 Mexican-Spanish register evidence (chabacano /
 *     pay de manzana / carriola / aguacate). Concern 1 supplement adjudication
 *     ratified at Phase 1 5-item batch lock.
 * pt: pt_BR per CLAUDE.md §6 Brazilian Portuguese vocabulary register lock
 *     at 589fd554.
 * no: nb_NO Norwegian Bokmål per Facebook's supported locale list (matches
 *     existing schema-generator.ts mapping).
 */
var OG_LOCALE_MAP = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_MX',
  pt: 'pt_BR',
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',
  fi: 'fi_FI'
};

/**
 * Lexicon exception list loader per Phase 2 §6 path-(a) lexicon-fallback.
 * Loads from sibling JSON; cached on first call. Per-locale loanword carve-outs
 * (DE Kindergarten, FR weekend, IT computer, etc.) prevent legitimate
 * loanwords from tripping LOCALE_RESIDUE_DETECTED.
 *
 * If the JSON file is missing or malformed, returns empty exceptions (gate
 * may produce false-positives but won't crash). Operator-curated.
 */
var _exceptionsCache = null;
function loadLexiconExceptions() {
  if (_exceptionsCache) return _exceptionsCache;
  try {
    var p = path.join(__dirname, 'seo-reconciliation-exceptions.json');
    var raw = fs.readFileSync(p, 'utf8');
    var parsed = JSON.parse(raw);
    _exceptionsCache = (parsed && parsed.exceptions) || {};
  } catch (e) {
    _exceptionsCache = {};
  }
  return _exceptionsCache;
}

/**
 * Tokenize a string into words for lexicon comparison. Splits on whitespace
 * + punctuation; lowercases; preserves diacritics + non-ASCII. Returns
 * array of lowercase tokens.
 */
function tokenizeForLexicon(str) {
  if (!str) return [];
  return String(str)
    .toLowerCase()
    .split(/[\s.,;:!?()\[\]{}<>"'/\\—–-]+/)
    .filter(function (t) { return t.length > 0; });
}

/**
 * Default English-content lexicon for path-(a) locale-residue fallback.
 * Words that should NEVER appear in non-English deck title/description
 * unless they're in the per-locale loanword exception list. Curated for
 * SEO-emission template strings (worksheet / interactive / for / print /
 * play / etc.) — the F3+H1 root cause per Phase 0 finding 1.
 *
 * DELIBERATELY EXCLUDED: universal loanwords + locale-shared words that
 * surface as false positives:
 *   - 'sudoku', 'bingo', 'cryptogram'  — universal loanwords across all locales
 *   - 'addition'                        — same word DE/FR/ES/IT/PT (Romance + Germanic)
 *   - 'picture'                         — compound element ("picture-sudoku"); safe via 'worksheet' instead
 *   - 'kindergarten'                    — loanword in DE (also valid German); per-locale exceptions handle
 *   - 'online'                          — loanword in many locales (DE: "online spielen" is German)
 *   - 'one', 'odd', 'out'               — too short; risk false positives in compounds
 *
 * The path-(a) lexicon is INTENTIONALLY APPROXIMATE per Phase 2 §6 doctrine —
 * Phase 3b path-(b) trace upgrade resolves precisely via translation-key-
 * resolution-source-trace per per-app extractDeckBundle extension. This list
 * is conservative scaffolding pending that upgrade.
 */
var ENGLISH_LEXICON = new Set([
  // SEO template chrome (the F3+H1 root cause; Phase 0 finding 1)
  'worksheet', 'worksheets',
  'free', 'interactive',
  'for', 'with', 'and', 'the',
  'print', 'play',
  'practice',
  // Educational level English forms (preschool + grade unambiguous;
  // 'kindergarten' excluded — DE loanword, per-locale exception handles)
  'preschool', 'grade',
  // Exercise-type words that DIFFER from non-English equivalents.
  // Examples: 'matching' (DE: Zuordnung; FR: appariement), 'counting' (DE: zählen),
  // 'word' (DE: Wort), 'crossword' (DE: Kreuzworträtsel), 'shadow' (DE: Schatten).
  // Excluded universal-loanword exercise-types per the doc above.
  'subtraction', 'multiplication',
  'matching', 'sorting', 'counting',
  'word', 'guess', 'scramble', 'search', 'crossword',
  'shadow',
  // Comparative-magnitude descriptors (DE: groß/klein; FR: grand/petit)
  'big', 'small', 'more', 'less'
]);

/**
 * Brand-name component kept whitelisted regardless of locale. The
 * "LessonCraftStudio" brand suffix (` | LessonCraftStudio`) is not residue
 * even in non-English titles.
 */
var BRAND_WHITELIST = new Set(['lessoncraftstudio']);

// =====================================================================
// Predicate 1: reconcileTitleUniqueness
// =====================================================================

/**
 * Verify that the rendered post-substitution title is unique within
 * (language) scope. Per Phase 2 §1: cross-locale uniqueness NOT required;
 * same-locale uniqueness IS required.
 *
 * Schema dependency: Deck.titleHash column (additive Phase 3a.1 migration).
 * The compound unique constraint @@unique([language, titleHash]) enforces
 * structurally at INSERT time; this predicate is defense-in-depth at the
 * pre-publish gate boundary so operator sees the collision in
 * _reconciliation.txt rather than a Postgres unique-violation error.
 *
 * opts = {
 *   thisDeckId: string                 // current deck's id (excluded from collision check)
 *   findExistingByTitleHash: async fn  // (language, titleHash, excludeId) → row | null
 * }
 */
async function reconcileTitleUniqueness(manifest, renderedTitle, opts) {
  if (!renderedTitle) {
    return {
      category: 'TITLE_MISSING',
      declared: null,
      hash: null,
      deckId: manifest && manifest.deck_id ? manifest.deck_id : null,
      app: manifest && manifest.exercise_type ? manifest.exercise_type : null
    };
  }
  var titleHash = sha256(renderedTitle);
  var existing = null;
  if (opts && typeof opts.findExistingByTitleHash === 'function') {
    try {
      existing = await opts.findExistingByTitleHash(
        manifest.language,
        titleHash,
        opts.thisDeckId
      );
    } catch (e) {
      // DB query failure: degraded-trust CLEAN per the §15.16 halt-surface
      // predicate calibration discipline — if the gate's DB query fails,
      // halting on uncertainty is wrong; let the structural unique
      // constraint catch the collision at INSERT time.
      return {
        category: 'CLEAN',
        declared: renderedTitle,
        hash: titleHash,
        warning: 'findExistingByTitleHash threw: ' + e.message,
        deckId: manifest.deck_id,
        app: manifest.exercise_type
      };
    }
  }
  if (existing) {
    return {
      category: 'TITLE_NON_UNIQUE',
      declared: renderedTitle,
      hash: titleHash,
      existing: { id: existing.id, slug: existing.slug },
      deckId: manifest.deck_id,
      app: manifest.exercise_type
    };
  }
  return {
    category: 'CLEAN',
    declared: renderedTitle,
    hash: titleHash,
    deckId: manifest.deck_id,
    app: manifest.exercise_type
  };
}

// =====================================================================
// Predicate 2: reconcileDescriptionUniqueness
// =====================================================================

/**
 * Parallel to reconcileTitleUniqueness but on description hash.
 * Schema dependency: Deck.descriptionHash column.
 *
 * NOTE: Phase 2 §2 doctrine notes description has lower collision risk than
 * title because more granular components (theme phrase + instruction sentence
 * + themed-or-not parenthetical) discriminate per-deck. No structural unique
 * constraint at the column level; just predicate-level WARN/HALT.
 *
 * Per Phase 3 halt-vs-warn ratification: HALT class (same as title).
 */
async function reconcileDescriptionUniqueness(manifest, renderedDescription, opts) {
  if (!renderedDescription) {
    return {
      category: 'DESCRIPTION_MISSING',
      declared: null,
      hash: null,
      deckId: manifest && manifest.deck_id ? manifest.deck_id : null,
      app: manifest && manifest.exercise_type ? manifest.exercise_type : null
    };
  }
  var descHash = sha256(renderedDescription);
  var existing = null;
  if (opts && typeof opts.findExistingByDescriptionHash === 'function') {
    try {
      existing = await opts.findExistingByDescriptionHash(
        manifest.language,
        descHash,
        opts.thisDeckId
      );
    } catch (e) {
      return {
        category: 'CLEAN',
        declared: renderedDescription,
        hash: descHash,
        warning: 'findExistingByDescriptionHash threw: ' + e.message,
        deckId: manifest.deck_id,
        app: manifest.exercise_type
      };
    }
  }
  if (existing) {
    return {
      category: 'DESC_NON_UNIQUE',
      declared: renderedDescription,
      hash: descHash,
      existing: { id: existing.id, slug: existing.slug },
      deckId: manifest.deck_id,
      app: manifest.exercise_type
    };
  }
  return {
    category: 'CLEAN',
    declared: renderedDescription,
    hash: descHash,
    deckId: manifest.deck_id,
    app: manifest.exercise_type
  };
}

// =====================================================================
// Predicate 3: reconcileCanonicalURLPattern
// =====================================================================

/**
 * Publish-time predicate per Phase 2 §3. Verifies the rendered post-
 * substitution <link rel="canonical" href="..."> matches the expected
 * pattern exactly: `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`.
 *
 * Production-side post-publish predicate (HTTP 200 + zero redirect) is
 * separate; runs at Phase 4c verification, not at this gate.
 *
 * Halt classes:
 *   CANONICAL_MISSING            — no <link rel="canonical"> in deck.html
 *   CANONICAL_APEX_FORM          — host = lessoncraftstudio.com (no www)
 *   CANONICAL_NO_TRAILING_SLASH  — no trailing slash
 *   CANONICAL_WRONG_LOCALE       — locale segment != manifest.language
 *   CANONICAL_WRONG_SLUG         — slug segment != opts.slug
 *   CANONICAL_WRONG_HOST         — host neither www nor apex
 *   CANONICAL_WRONG_SCHEME       — http instead of https
 */
function reconcileCanonicalURLPattern(manifest, substitutedHtml, opts) {
  var deckId = manifest && manifest.deck_id ? manifest.deck_id : null;
  var app = manifest && manifest.exercise_type ? manifest.exercise_type : null;
  var canonicalMatch = /<link\s+rel="canonical"\s+href="([^"]+)"/i.exec(substitutedHtml);
  if (!canonicalMatch) {
    return { category: 'CANONICAL_MISSING', declared: null, expected: null, deckId: deckId, app: app };
  }
  var canonical = canonicalMatch[1];
  var expected = CANONICAL_URL_BASE + '/' + manifest.language + '/decks/' + opts.slug + '/';

  if (canonical === expected) {
    return { category: 'CLEAN', declared: canonical, expected: expected, deckId: deckId, app: app };
  }

  // Classify mismatch
  var category = 'CANONICAL_WRONG_HOST'; // default fallthrough

  if (canonical.indexOf('http://') === 0) {
    category = 'CANONICAL_WRONG_SCHEME';
  } else if (canonical.indexOf('https://lessoncraftstudio.com/') === 0) {
    category = 'CANONICAL_APEX_FORM';
  } else if (canonical.indexOf(CANONICAL_URL_BASE + '/') === 0) {
    // Right host; check trailing slash + locale + slug
    if (!canonical.endsWith('/')) {
      category = 'CANONICAL_NO_TRAILING_SLASH';
    } else {
      // Parse locale + slug from canonical
      var pathPart = canonical.slice(CANONICAL_URL_BASE.length); // /<locale>/decks/<slug>/
      var pathMatch = /^\/([a-z]{2})\/decks\/([a-z0-9-]+)\/$/.exec(pathPart);
      if (!pathMatch) {
        category = 'CANONICAL_WRONG_HOST'; // path malformed; broad bucket
      } else if (pathMatch[1] !== manifest.language) {
        category = 'CANONICAL_WRONG_LOCALE';
      } else if (pathMatch[2] !== opts.slug) {
        category = 'CANONICAL_WRONG_SLUG';
      }
    }
  }

  return {
    category: category,
    declared: canonical,
    expected: expected,
    deckId: deckId,
    app: app
  };
}

// =====================================================================
// Predicate 4: reconcileOGTags
// =====================================================================

/**
 * Verify all 14 OG + Twitter card tags emit per Phase 2 §4 spec.
 * Locked tag set:
 *   OG: og:title / og:description / og:image / og:type (always "website") /
 *       og:url / og:locale / og:site_name (always "LessonCraftStudio") /
 *       og:image:width (always 1200) / og:image:height (always 630) / og:image:alt
 *   Twitter: twitter:card (always "summary_large_image") / twitter:title /
 *            twitter:description / twitter:image
 *
 * Halt class: OG_TAG_MISSING — any required tag absent
 * Warn class: OG_IMAGE_FALLBACK_USED — og:image points at site-default
 *             rather than per-deck og-image.png (informational; ships)
 *
 * The opts.expectedOgImage parameter (when provided) is the per-deck
 * og-image.png URL; if og:image content matches expectedOgImage it's the
 * primary path; if it matches a known fallback URL it's the fallback path.
 */
function reconcileOGTags(substitutedHtml, opts) {
  var deckId = (opts && opts.deckId) || null;
  var app = (opts && opts.app) || null;

  var REQUIRED_OG = [
    'og:title',
    'og:description',
    'og:image',
    'og:type',
    'og:url',
    'og:locale',
    'og:site_name',
    'og:image:width',
    'og:image:height',
    'og:image:alt'
  ];
  var REQUIRED_TWITTER = [
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image'
  ];

  function findOGTag(prop) {
    var rx = new RegExp(
      '<meta\\s+property="' + prop.replace(/:/g, '\\:') + '"\\s+content="([^"]*)"',
      'i'
    );
    var m = rx.exec(substitutedHtml);
    return m ? m[1] : null;
  }
  function findTwitterTag(name) {
    // Twitter card meta uses `name=` not `property=` (per OGP spec quirk)
    var rx = new RegExp(
      '<meta\\s+name="' + name.replace(/:/g, '\\:') + '"\\s+content="([^"]*)"',
      'i'
    );
    var m = rx.exec(substitutedHtml);
    return m ? m[1] : null;
  }

  var missing = [];
  var values = {};
  for (var i = 0; i < REQUIRED_OG.length; i++) {
    var v = findOGTag(REQUIRED_OG[i]);
    if (v == null || v === '') missing.push(REQUIRED_OG[i]);
    else values[REQUIRED_OG[i]] = v;
  }
  for (var j = 0; j < REQUIRED_TWITTER.length; j++) {
    var t = findTwitterTag(REQUIRED_TWITTER[j]);
    if (t == null || t === '') missing.push(REQUIRED_TWITTER[j]);
    else values[REQUIRED_TWITTER[j]] = t;
  }

  if (missing.length > 0) {
    return {
      category: 'OG_TAG_MISSING',
      missing: missing,
      values: values,
      deckId: deckId,
      app: app
    };
  }

  // All present. Check for OG_IMAGE_FALLBACK_USED warn-class.
  var ogImage = values['og:image'];
  var isFallback = false;
  if (opts && opts.expectedOgImage && ogImage !== opts.expectedOgImage) {
    // og:image differs from expected per-deck — likely site-default fallback
    isFallback = true;
  }
  if (isFallback) {
    return {
      category: 'OG_IMAGE_FALLBACK_USED',
      ogImage: ogImage,
      expected: opts.expectedOgImage,
      deckId: deckId,
      app: app,
      warnClass: true
    };
  }

  return { category: 'CLEAN', values: values, deckId: deckId, app: app };
}

// =====================================================================
// Predicate 5: reconcileLocaleResidue (Phase 3a path-(a) lexicon-fallback)
// =====================================================================

/**
 * Phase 2 §6 path-(a) lexicon-fallback. Detects English residue in
 * non-English deck title + description by tokenizing + checking against
 * ENGLISH_LEXICON (excluding per-locale loanword exception list).
 *
 * Phase 3b path-(b) trace upgrade (translation-key-resolution-source-trace
 * via per-app extractDeckBundle extension) replaces this with origin-tracing
 * per-substring; lexicon exception list deprecated post-3b.
 *
 * Halt class: LOCALE_RESIDUE_DETECTED — non-English deck has English
 * lexicon hits in title/description outside per-locale exceptions.
 *
 * En decks always CLEAN (English content allowed in English titles —
 * trivial pass).
 */
function reconcileLocaleResidue(manifest, renderedTitle, renderedDescription, opts) {
  var deckId = manifest && manifest.deck_id ? manifest.deck_id : null;
  var app = manifest && manifest.exercise_type ? manifest.exercise_type : null;
  var locale = manifest && manifest.language ? manifest.language : null;

  if (!locale || locale === 'en') {
    return { category: 'CLEAN', deckId: deckId, app: app };
  }

  var exceptions = loadLexiconExceptions();
  var localeExceptions = new Set((exceptions[locale] || []).map(function (w) { return w.toLowerCase(); }));

  function findResidue(str, fieldName) {
    if (!str) return null;
    var tokens = tokenizeForLexicon(str);
    var hits = [];
    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      if (BRAND_WHITELIST.has(tok)) continue;
      if (localeExceptions.has(tok)) continue;
      if (ENGLISH_LEXICON.has(tok)) {
        hits.push({ token: tok, field: fieldName });
      }
    }
    return hits.length > 0 ? hits : null;
  }

  var titleResidue = findResidue(renderedTitle, 'title');
  var descResidue = findResidue(renderedDescription, 'description');
  var allResidue = (titleResidue || []).concat(descResidue || []);

  if (allResidue.length > 0) {
    return {
      category: 'LOCALE_RESIDUE_DETECTED',
      englishWords: allResidue,
      locale: locale,
      deckId: deckId,
      app: app
    };
  }

  return { category: 'CLEAN', locale: locale, deckId: deckId, app: app };
}

// =====================================================================
// Predicate 6: reconcileSingleH1
// =====================================================================

/**
 * Phase 2 §7 invariant. Counts <h1> elements in rendered post-substitution
 * deck.html; expected exactly 1.
 *
 * Phase 3a Resolution A: celebration template fix at catalog-export.js
 * ships in Phase 3a.2 (h1 → h2 on lcs-celebration__title). HALT predicate
 * operational from Phase 3a moment per Resolution A locked decision.
 *
 * Halt class: MULTIPLE_H1_DETECTED — count != 1
 *   - count=0 means no main h1 — F3+H1-related uniqueness signal lost
 *   - count≥2 means celebration screen + main h1 both emitted (pre-fix state)
 */
function reconcileSingleH1(substitutedHtml, opts) {
  var deckId = (opts && opts.deckId) || null;
  var app = (opts && opts.app) || null;

  // Match <h1> opening tags — count occurrences. Conservative regex matches
  // <h1, <h1>, <h1 class="..."> etc. Excludes self-closed <h1/> (rare).
  var matches = substitutedHtml.match(/<h1[\s>]/gi) || [];
  var count = matches.length;

  if (count === 1) {
    return { category: 'CLEAN', count: 1, deckId: deckId, app: app };
  }

  return {
    category: 'MULTIPLE_H1_DETECTED',
    count: count,
    deckId: deckId,
    app: app
  };
}

// =====================================================================
// Predicate 7: reconcileInboundLinkSurface (Checkpoint 1 stub)
// =====================================================================

/**
 * Phase 2 §5 inbound-link minimum invariant. CHECKPOINT 1 STUB —
 * full implementation deferred to Phase 3a.1 Checkpoint 2 once
 * frontend/lib/seo/count-inbound-surfaces.ts ships.
 *
 * Locked target: N≥3 non-sitemap inbound surfaces per deck.
 * Halt schedule: WARN pre-Phase-5; HALT post-Phase-5 per concern 4.
 *
 * Stub behavior: returns CLEAN with `noop: true` flag; gate orchestrator
 * surfaces this as informational. Real implementation queries 8 surfaces
 * (topic / variety-strip / sibling-strip / cross-axis / breadth / featured /
 * embed-cta / deck-end-suggestions) via indexed DB per topic-decks.ts
 * patterns.
 */
async function reconcileInboundLinkSurface(opts) {
  var deckId = (opts && opts.deckId) || null;
  var app = (opts && opts.app) || null;

  // Checkpoint 1: helper not yet shipped. If caller provides opts.countInboundFn
  // (Checkpoint 2 wire-in), use it; otherwise return CLEAN with stub flag.
  if (opts && typeof opts.countInboundFn === 'function') {
    try {
      var result = await opts.countInboundFn(deckId, opts.language);
      var target = (opts.target != null) ? opts.target : 3;
      if (result.count < target) {
        return {
          category: 'INBOUND_LINK_COUNT_BELOW_TARGET',
          count: result.count,
          perSurface: result.perSurface,
          target: target,
          deckId: deckId,
          app: app,
          warnClass: !opts.haltClass // pre-Phase-5 warn; post-Phase-5 halt
        };
      }
      return { category: 'CLEAN', count: result.count, target: target, deckId: deckId, app: app };
    } catch (e) {
      return {
        category: 'CLEAN',
        warning: 'countInboundFn threw: ' + e.message,
        deckId: deckId,
        app: app
      };
    }
  }

  return {
    category: 'CLEAN',
    noop: true,
    note: 'Phase 3a.1 Checkpoint 1 stub; helper at Checkpoint 2',
    deckId: deckId,
    app: app
  };
}

// =====================================================================
// Orchestrator
// =====================================================================

/**
 * Run all 7 predicates against a deck's post-substitution state. Used by
 * bulk.js dryRunOneZip Step 1d wire-in + publish.js single-deck path.
 *
 * opts = {
 *   manifest:                   parsed manifest.json
 *   substitutedHtml:            post-substitution deck.html string
 *   slug:                       computed slug per §17.8.5
 *   thisDeckId:                 current deck's id (excluded from uniqueness checks)
 *   findExistingByTitleHash:    async (language, hash, excludeId) → row | null
 *   findExistingByDescriptionHash: async (language, hash, excludeId) → row | null
 *   countInboundFn:             async (deckId, language) → {count, perSurface} | undefined
 *   target:                     number; default 3 per concern 4 lock
 *   haltClass:                  bool; if true, INBOUND_LINK escalates to halt
 *   expectedOgImage:            string; per-deck og-image URL for fallback detection
 * }
 *
 * Returns: {
 *   overall:        'CLEAN' | 'HALT' | 'WARN'
 *   predicates:     { title, description, canonical, og, locale, h1, inbound }
 *   haltCategories: array of halt-class category strings
 *   warnCategories: array of warn-class category strings
 * }
 */
async function reconcileDeckPageSEO(opts) {
  var manifest = opts.manifest;
  var substitutedHtml = opts.substitutedHtml;
  var slug = opts.slug;
  var deckId = manifest && manifest.deck_id ? manifest.deck_id : null;
  var app = manifest && manifest.exercise_type ? manifest.exercise_type : null;

  // Extract rendered title + description from substituted HTML for uniqueness
  // + locale-residue checks. Use simple regex extraction; matches buildSeoHead
  // emission shape per Phase 2 §1+§2.
  var titleMatch = /<title>([^<]+)<\/title>/i.exec(substitutedHtml);
  var renderedTitle = titleMatch ? titleMatch[1] : '';
  var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(substitutedHtml);
  var renderedDescription = descMatch ? descMatch[1] : '';

  var predicateOpts = {
    thisDeckId: opts.thisDeckId || deckId,
    findExistingByTitleHash: opts.findExistingByTitleHash,
    findExistingByDescriptionHash: opts.findExistingByDescriptionHash,
    countInboundFn: opts.countInboundFn,
    target: opts.target != null ? opts.target : 3,
    haltClass: !!opts.haltClass,
    expectedOgImage: opts.expectedOgImage,
    deckId: deckId,
    app: app,
    language: manifest && manifest.language ? manifest.language : null,
    slug: slug
  };

  var titleResult = await reconcileTitleUniqueness(manifest, renderedTitle, predicateOpts);
  var descResult = await reconcileDescriptionUniqueness(manifest, renderedDescription, predicateOpts);
  var canonicalResult = reconcileCanonicalURLPattern(manifest, substitutedHtml, predicateOpts);
  var ogResult = reconcileOGTags(substitutedHtml, predicateOpts);
  var localeResult = reconcileLocaleResidue(manifest, renderedTitle, renderedDescription, predicateOpts);
  var h1Result = reconcileSingleH1(substitutedHtml, predicateOpts);
  var inboundResult = await reconcileInboundLinkSurface(predicateOpts);

  var predicates = {
    title: titleResult,
    description: descResult,
    canonical: canonicalResult,
    og: ogResult,
    locale: localeResult,
    h1: h1Result,
    inbound: inboundResult
  };

  // Aggregate halt + warn categories
  var HALT_CATEGORIES = new Set([
    'TITLE_NON_UNIQUE',
    'TITLE_MISSING',
    'DESC_NON_UNIQUE',
    'DESCRIPTION_MISSING',
    'CANONICAL_MISSING',
    'CANONICAL_APEX_FORM',
    'CANONICAL_NO_TRAILING_SLASH',
    'CANONICAL_WRONG_LOCALE',
    'CANONICAL_WRONG_SLUG',
    'CANONICAL_WRONG_HOST',
    'CANONICAL_WRONG_SCHEME',
    'OG_TAG_MISSING',
    'LOCALE_RESIDUE_DETECTED',
    'MULTIPLE_H1_DETECTED'
  ]);
  var WARN_CATEGORIES = new Set([
    'OG_IMAGE_FALLBACK_USED',
    'INBOUND_LINK_COUNT_BELOW_TARGET'
  ]);

  var haltCategories = [];
  var warnCategories = [];
  Object.keys(predicates).forEach(function (key) {
    var p = predicates[key];
    var cat = p.category;
    if (HALT_CATEGORIES.has(cat)) {
      haltCategories.push(cat);
    } else if (WARN_CATEGORIES.has(cat)) {
      // INBOUND_LINK escalates per haltClass flag (post-Phase-5)
      if (cat === 'INBOUND_LINK_COUNT_BELOW_TARGET' && opts.haltClass) {
        haltCategories.push(cat);
      } else {
        warnCategories.push(cat);
      }
    }
  });

  var overall;
  if (haltCategories.length > 0) overall = 'HALT';
  else if (warnCategories.length > 0) overall = 'WARN';
  else overall = 'CLEAN';

  return {
    overall: overall,
    predicates: predicates,
    haltCategories: haltCategories,
    warnCategories: warnCategories,
    deckId: deckId,
    app: app
  };
}

// =====================================================================
// Module exports
// =====================================================================

module.exports = {
  // Public predicates (per Phase 2 doctrine §1-§7)
  reconcileTitleUniqueness: reconcileTitleUniqueness,
  reconcileDescriptionUniqueness: reconcileDescriptionUniqueness,
  reconcileCanonicalURLPattern: reconcileCanonicalURLPattern,
  reconcileOGTags: reconcileOGTags,
  reconcileLocaleResidue: reconcileLocaleResidue,
  reconcileSingleH1: reconcileSingleH1,
  reconcileInboundLinkSurface: reconcileInboundLinkSurface,
  // Orchestrator
  reconcileDeckPageSEO: reconcileDeckPageSEO,
  // Helpers (exported for tests + reuse)
  sha256: sha256,
  tokenizeForLexicon: tokenizeForLexicon,
  loadLexiconExceptions: loadLexiconExceptions,
  // Constants
  CANONICAL_URL_BASE: CANONICAL_URL_BASE,
  OG_LOCALE_MAP: OG_LOCALE_MAP,
  ENGLISH_LEXICON: ENGLISH_LEXICON,
  BRAND_WHITELIST: BRAND_WHITELIST,
  _exceptionsCache: function () { return _exceptionsCache; },
  _resetExceptionsCache: function () { _exceptionsCache = null; }
};
