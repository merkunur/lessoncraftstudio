/**
 * §17.8.5 ASCII-fold slug generator.
 *
 * Canonical implementation per Brief B Phase 2 (commit landing this file).
 * Diverges intentionally from REFERENCE TRANSLATIONS/catalog-export.js:90
 * slugify, which converts non-ASCII to hyphens (produces 'w-rter' from
 * 'Wörter') rather than ASCII-folding (produces 'worter'). Divergence
 * accepted for v1 because all 29 apps' bundle.title is currently
 * English-only literal — see project_deferred_items_queue.md
 * social-share-v1 family. Resolves at the apps + publish-cli touchpoint.
 *
 * Algorithm:
 *   1. lowercase
 *   2. NFD normalize + strip combining diacritical marks (handles most
 *      Romance accents: à → a + combining grave → a)
 *   3. explicit map for non-decomposable equivalents (ß → ss, æ → ae,
 *      ł → l, etc.)
 *   4. replace any remaining non-[a-z0-9-] with hyphen
 *   5. collapse runs of hyphens
 *   6. strip leading/trailing hyphens
 *
 * Order matters: explicit map BEFORE the regex strip so mapped output
 * (ASCII letters) survives.
 */

'use strict';

/**
 * App-classification for the §A.13 exerciseMode reconciliation gate.
 *
 * Two classes per Commission ε recon at 5078f491:
 *   - DERIVED:  app's emit-site reads exerciseMode from a UI element
 *               (selectElement.value OR equivalent). Non-null exerciseMode
 *               at publish-time is the expected state. If the gate sees
 *               a null declared mode from one of these apps, that's an
 *               emit-site regression.
 *   - HARDCODED_NULL: app's emit-site hardcodes exerciseMode=null at the
 *               LCSCatalogExport.export() call. Future multi-mode waves
 *               on these apps would collapse into shared slug-namespace.
 *               The gate halts on null mode from these apps to surface
 *               the missing emit-fix (Commission ε is parked on per-app
 *               taxonomy adjudication).
 *
 * Apps not present in either list (e.g., orphan deck_id, future apps,
 * Track A baseline themeless rows) trigger CLEAN-with-degraded-trust:
 * the gate doesn't know enough about that app to classify, so it lets
 * the deck through rather than halt on uncertainty.
 *
 * Total = 29 apps per §14.10 canonical list. When taxonomy adjudication
 * lands per-app, an app moves from HARDCODED_NULL to DERIVED here AND
 * its emit-site is fixed — the constant is the single source of truth
 * the gate consults.
 */
var EXERCISE_MODE_APP_CLASSIFICATION = {
  // DERIVED — emit-site reads from UI; non-null at publish is expected
  'addition':         'DERIVED',
  'big-small':        'DERIVED',
  'code-addition':    'DERIVED',  // post-fix at 5078f491
  'find-and-count':   'DERIVED',
  'find-objects':     'DERIVED',
  'math-puzzle':      'DERIVED',
  'math-worksheet':   'DERIVED',
  'matching':         'DERIVED',
  'more-less':        'DERIVED',
  'picture-path':     'DERIVED',
  'prepositions':     'DERIVED',
  'shadow-match':     'DERIVED',
  'subtraction':      'DERIVED',
  // HARDCODED_NULL — emit-site hardcodes null; awaiting Commission ε per-app fix
  'alphabet-train':   'HARDCODED_NULL',
  'bingo':            'HARDCODED_NULL',
  'chart-count':      'HARDCODED_NULL',
  'crossword':        'HARDCODED_NULL',
  'cryptogram':       'HARDCODED_NULL',
  'grid-match':       'HARDCODED_NULL',
  'missing-pieces':   'HARDCODED_NULL',
  'odd-one-out':      'HARDCODED_NULL',
  'pattern-train':    'HARDCODED_NULL',
  'pattern-worksheet':'HARDCODED_NULL',
  'picture-sort':     'HARDCODED_NULL',
  'sudoku':           'HARDCODED_NULL',
  'treasure-hunt':    'HARDCODED_NULL',
  'word-guess':       'HARDCODED_NULL',
  'word-scramble':    'HARDCODED_NULL',
  'wordsearch':       'HARDCODED_NULL'
};

var NON_DECOMPOSABLE_MAP = {
  'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
  'å': 'a', 'æ': 'ae', 'ø': 'o',
  'ñ': 'n', 'ç': 'c',
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u',
  'ý': 'y', 'ÿ': 'y',
  'ł': 'l'
};

function slugify(value) {
  var str = String(value == null ? '' : value).toLowerCase();
  var nfd = str.normalize('NFD').replace(/[̀-ͯ]/g, '');
  var mapped = nfd.split('').map(function (c) {
    return Object.prototype.hasOwnProperty.call(NON_DECOMPOSABLE_MAP, c)
      ? NON_DECOMPOSABLE_MAP[c]
      : c;
  }).join('');
  return mapped
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Slug-collision suffix algorithm per §17.8.5.
 *
 * Caller provides candidate + a function to check if a slug is taken in
 * the (language, slug) compound key. On collision, suffixes -2, -3, ...
 * until unique. Idempotency: if the candidate slug already exists for
 * the SAME deck_id (edit-in-place per Brief B v3 Decision 5), the
 * caller's isTaken function should return false for that case so the
 * existing slug is preserved.
 *
 * Phase 2 dry-run does NOT call this (kept hermetic, no DB reads). Phase
 * 3 publish-cli wires it against the real DB query.
 */
function resolveCollision(candidate, isTakenFn) {
  if (!candidate) {
    throw new Error('resolveCollision: candidate slug is empty (slugify returned empty string)');
  }
  if (!isTakenFn(candidate)) return candidate;
  for (var n = 2; n < 1000; n++) {
    var suffixed = candidate + '-' + n;
    if (!isTakenFn(suffixed)) return suffixed;
  }
  throw new Error('resolveCollision: exhausted suffix range 2..999 for candidate "' + candidate + '"');
}

/**
 * Canonical slug-seed derivation from a deck manifest.
 *
 * Single source-of-truth used by all publish-cli paths (bulk.js,
 * publish.js, index.js single-deck dry-run). Extracts the seed string
 * that is passed to slugify() downstream. The slugify pass is
 * unchanged.
 *
 * Composition (per §17.8.5 + theme-aware extension):
 *   <exercise-type> <exercise-mode> <theme-axis-key>?
 *
 * Theme is appended only when manifest.theme is non-null. Themeless
 * decks (per pattern-worksheet remediation precedent) preserve the
 * pre-extension shape: <exercise-type> <exercise-mode>.
 *
 * Slug shape rationale: operation-mechanic-content ordering reads as
 * a deck-identity claim ("an addition find-addend deck themed on
 * animals"), aligns with Google search-snippet leading-segment
 * prominence, and clusters related decks across alphabetic-sort
 * positions. Distinct from intersection-URL axis-ordering
 * (theme→level→type, navigation context); deck-page URLs are
 * leaf-level destinations with identity-claim grammar.
 *
 * Returns: space-joined seed string. Caller passes through slugify().
 */
function deriveSeedFromManifest(manifest) {
  var parts = [];
  if (manifest.exercise_type) parts.push(manifest.exercise_type);
  if (manifest.exercise_mode) parts.push(manifest.exercise_mode);
  if (manifest.theme) parts.push(manifest.theme);
  return parts.join(' ');
}

/**
 * Parse the theme directory component from an image path of shape
 * "/images/<dir>/<filename>". Returns the dir string, OR null when the
 * path is missing/malformed OR when the dir is CUID-shaped (the §14.3a
 * vocabKeyFromImage uploaded-image branch — user-uploaded images live
 * under /images/<cuid>/ and have no theme association).
 *
 * CUID detection: case-insensitive ^cm[a-z0-9]{20,}$. Real themes are
 * either lowercase ASCII words/underscores ("animals", "valentine_bw",
 * "4th_of_july") or hyphenated, never matching the CUID prefix shape.
 */
function parseThemeFromImagePath(p) {
  if (!p || typeof p !== 'string') return null;
  var m = p.match(/\/images\/([^\/]+)\//);
  if (!m) return null;
  var dir = m[1];
  if (/^cm[a-z0-9]{20,}$/i.test(dir)) return null;
  return dir;
}

/**
 * Reconcile manifest.theme (declared) against the actual content theme
 * inferred from manifest.exercises[0]. Per §A.13 verification-hygiene
 * extension, this gate fires at the publish-cli dry-run + real-publish
 * pre-flight boundary BEFORE slug derivation runs, halting any batch
 * whose authoring-tool emit-defect produced a metadata-content
 * disagreement. Closes the structural exposure surfaced by the
 * code-addition v6.0.0 emit-defect audit.
 *
 * Two manifest shapes supported:
 *   - addition/subtraction/most apps: exercises[i] = {operandA/B or
 *     similar, image: {path, theme, ...}}
 *   - code-addition: exercises[i] = [{path, theme}, {path, theme}, ...]
 *
 * Signals:
 *   declared  = manifest.theme
 *   primary   = first image-bearing exercise's image.theme (per-image
 *               semantic theme — strongest signal)
 *   secondary = parseThemeFromImagePath(image.path) (path-directory;
 *               null for uploaded-image CUID dirs per legitimate
 *               themeless case)
 *
 * Decision tree (per the gate spec):
 *   declared undefined + no themeless-app marker        → MISSING_THEME
 *   declared undefined + themeless (no primary OR
 *     secondary is CUID-shaped)                         → CLEAN
 *   declared defined + primary matches + (secondary
 *     matches OR secondary CUID-shaped)                 → CLEAN
 *   declared defined + primary undefined + secondary
 *     defined and matches declared                      → CLEAN
 *     (declared agrees with path-derived; image schema
 *      gap but data agrees)
 *   declared defined + primary undefined + secondary
 *     defined and disagrees                             → MISSING_PRIMARY
 *   declared !== primary                                → THEME_DISAGREE
 *
 * Returns: { category, declared, primary, secondary, deckId, app }.
 * Comparison is case-insensitive + hyphen/underscore-normalized so
 * "valentine-bw" and "valentine_bw" reconcile as equal.
 */
function reconcileManifestTheme(manifest) {
  var declared = (manifest && manifest.theme != null && manifest.theme !== '') ? String(manifest.theme) : null;
  var declaredDefined = declared !== null;

  var firstImg = null;
  if (manifest && manifest.exercises && manifest.exercises.length > 0) {
    var e0 = manifest.exercises[0];
    if (Array.isArray(e0)) {
      firstImg = e0[0] || null;
    } else if (e0 && typeof e0 === 'object') {
      if (e0.image) firstImg = e0.image;
      else if (e0.path || e0.theme) firstImg = e0;
    }
  }

  var primary = (firstImg && firstImg.theme != null && firstImg.theme !== '') ? String(firstImg.theme) : null;
  var primaryDefined = primary !== null;
  var secondary = (firstImg && firstImg.path) ? parseThemeFromImagePath(firstImg.path) : null;

  function norm(v) {
    return v == null ? null : String(v).replace(/-/g, '_').toLowerCase();
  }
  var decN = norm(declared);
  var priN = norm(primary);
  var secN = norm(secondary);

  var category;
  if (!declaredDefined) {
    if (!primaryDefined) {
      // No image-side theme signal either → legitimate themeless
      // (pattern-worksheet contract OR exercises array empty).
      category = 'CLEAN';
    } else if (secN === null) {
      // Image carries theme but path is CUID-shaped (uploaded images;
      // pre-440 Track A baseline pattern). Legitimate themeless.
      category = 'CLEAN';
    } else {
      // Image carries theme AND path points to real-theme dir → manifest
      // schema gap (operator forgot to declare theme).
      category = 'MISSING_THEME';
    }
  } else if (!primaryDefined) {
    // declared exists, image.theme missing.
    if (secN === null) {
      // Path uninformative (CUID or missing) → only declared signal;
      // not actively disagreeing.
      category = 'CLEAN';
    } else if (decN === secN) {
      // declared agrees with path-derived theme; image.theme schema
      // gap but data agrees.
      category = 'CLEAN';
    } else {
      // declared disagrees with path-derived theme AND image.theme is
      // missing — operator-action surface.
      category = 'MISSING_PRIMARY';
    }
  } else {
    // Both declared and primary defined.
    if (decN === priN) {
      category = 'CLEAN';
    } else {
      category = 'THEME_DISAGREE';
    }
  }

  return {
    category: category,
    declared: declared,
    primary: primary,
    secondary: secondary,
    deckId: manifest && manifest.deck_id ? manifest.deck_id : null,
    app: manifest && manifest.exercise_type ? manifest.exercise_type : null
  };
}

/**
 * Reconcile manifest.exerciseMode against the app's emit-site
 * classification per Commission δ (Interpretation Y, lenient-gate).
 * Pairs with reconcileManifestTheme at 580b0ca26; runs at the same
 * publish-cli pre-flight boundary, before slug derivation. Closes
 * structural exposure for the 16 HARDCODED_NULL apps surfaced by
 * Commission ε's recon.
 *
 * Decision tree (lenient-gate semantics):
 *   declared non-null + non-empty string → CLEAN
 *     (app emits a mode; theme reconciliation already validates the
 *     emitted value isn't garbage relative to content — exerciseMode
 *     reconciliation just trusts the non-null state.)
 *
 *   declared null + HARDCODED_NULL app → MODE_NULL_FROM_HARDCODED_APP
 *     (known emit-defect per Commission ε; halts pre-publish; surfaces
 *     operator commission-of-Commission ε for that app's per-app fix.)
 *
 *   all other cases (DERIVED+null, UNKNOWN+null, themeless-Track-A+null) → CLEAN
 *     (DERIVED apps may legitimately emit null for default-mode contracts —
 *     e.g., code-addition standard mode at 5078f491 emits null per operator
 *     2-mode adjudication. The DERIVED classification means "emit-site reads
 *     from UI" not "emit-site always non-null." UNKNOWN covers future-app
 *     shapes + Track A baseline rows.)
 *
 * The gate's purpose: catch HARDCODED_NULL emits (no operator-side intent
 * behind the null; structurally broken emit-site). DERIVED-null pass
 * because operator selected null intentionally.
 *
 * Returns: { category, declared, appClass, deckId, app }.
 */
function reconcileExerciseMode(manifest) {
  var declared = (manifest && manifest.exercise_mode != null && manifest.exercise_mode !== '')
    ? String(manifest.exercise_mode) : null;
  var declaredDefined = declared !== null;
  var app = manifest && manifest.exercise_type ? String(manifest.exercise_type) : null;
  var appClass = (app && Object.prototype.hasOwnProperty.call(EXERCISE_MODE_APP_CLASSIFICATION, app))
    ? EXERCISE_MODE_APP_CLASSIFICATION[app]
    : 'UNKNOWN';

  var category;
  if (declaredDefined) {
    // App emits a mode. Trust it. Theme reconciliation validates content
    // alignment; exerciseMode reconciliation only concerns null-vs-non-null.
    category = 'CLEAN';
  } else if (appClass === 'HARDCODED_NULL') {
    // Known emit-defect per Commission ε. Halts to surface the operator-
    // strategic per-app taxonomy decision needed before publish.
    category = 'MODE_NULL_FROM_HARDCODED_APP';
  } else {
    // DERIVED + null: legitimate per operator-shipped contracts (e.g.,
    // code-addition standard mode at 5078f491). UNKNOWN + null: degraded-
    // trust CLEAN for future apps + Track A baseline rows + orphan deck_ids.
    category = 'CLEAN';
  }

  return {
    category: category,
    declared: declared,
    appClass: appClass,
    deckId: manifest && manifest.deck_id ? manifest.deck_id : null,
    app: app
  };
}

module.exports = {
  slugify: slugify,
  resolveCollision: resolveCollision,
  deriveSeedFromManifest: deriveSeedFromManifest,
  parseThemeFromImagePath: parseThemeFromImagePath,
  reconcileManifestTheme: reconcileManifestTheme,
  reconcileExerciseMode: reconcileExerciseMode,
  EXERCISE_MODE_APP_CLASSIFICATION: EXERCISE_MODE_APP_CLASSIFICATION,
  _NON_DECOMPOSABLE_MAP: NON_DECOMPOSABLE_MAP
};
