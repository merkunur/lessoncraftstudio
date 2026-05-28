/**
 * Node-CJS port of REFERENCE TRANSLATIONS/catalog-export.js `buildSeoHead`.
 *
 * Used by Phase 4a `republish-seo` retrofit mode. The browser-side helper at
 * catalog-export.js lines 387-481 cannot be required() from Node because it
 * uses `window.LCSCatalogExport = ...` IIFE-pattern globals; this module
 * mirrors the SEO block emission shape verbatim so retrofit can produce
 * byte-equivalent output to fresh publishes.
 *
 * Public API:
 *   module.exports.buildSeoHead(opts)
 *     opts: {
 *       language:           'en' | 'de' | ... | ISO 639-1
 *       exerciseTypeName:   'Addition'              // localized
 *       exerciseTypeSlug:   'addition'              // raw slug; JSON-LD "teaches"
 *       themeName:          'Animals' | null        // localized; null = no theme
 *       worksheetWord:      'Worksheet'             // localized t('worksheet')
 *       instruction:        'Add the numbers ...'   // localized; OK to be empty
 *       freeInteractive:    'Free interactive'      // t('seoFreeInteractive')
 *       forWord:            'for'                   // t('seoFor')
 *       printOrPlay:        'Print or play online'  // t('seoPrintOrPlayOnline')
 *     }
 *     returns: string — SEO block content, newline-separated, surrounded by
 *              SEO_INSERTION_POINT_START/END marker pair. Placeholders
 *              `__CANONICAL_URL__`, `__EDUCATIONAL_LEVEL__`,
 *              `__EDUCATIONAL_LEVEL_LOCALIZED__`, `__OG_TITLE__`,
 *              `__OG_DESCRIPTION__`, `__OG_IMAGE__`, `__OG_LOCALE__`,
 *              `__OG_IMAGE_ALT__` are emitted as literals; downstream
 *              substitute.apply() fills them.
 *
 * Mirroring discipline: when REFERENCE TRANSLATIONS/catalog-export.js
 * `buildSeoHead` changes (e.g., new placeholder added, marker shape
 * modified), this module's `buildSeoHead` must be updated in parallel.
 * Tests assert byte-equivalence against synthetic manifests at
 * scripts/publish-cli/build-seo-head.test.js.
 */

'use strict';

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Commission 16b: rendered length of a description as it appears in the
// `<meta name="description" content="...">` attribute — i.e. after escapeAttr
// (& → &amp; +4, " → &quot; +5, < / > +3; apostrophe stays literal). This is
// exactly what audit-deck-html.js Check 15 measures from the deck.html.
function descLenRendered(s) {
  return escapeAttr(s).length;
}

// Commission 19: an exercise-mode name is REDUNDANT when it shares a
// significant word (≥3 letters, case-insensitive) with the exercise-type
// name — e.g. type "Shadow Match" + mode "Match the Shadow", type "Find the
// Odd One Out" + mode "Find the Odd One", type "Picture Path" + mode "Picture
// Pathway", type "Code Addition" + mode "Addition". Such a mode just repeats
// the type's keywords in the title + description (reads like stuffing, hurts
// CTR), so it is suppressed. Genuinely-distinct modes (Find Addend, Cross Out,
// Image-Image, Classic Maze, Letter, 2 Symbols…) share no word and are kept.
function tokensOf(s) {
  return String(s || '').toLowerCase().split(/[^a-z0-9]+/).filter(function (t) { return t.length >= 3; });
}
function modeRedundant(typeName, modeName) {
  if (!modeName) return false;
  var tt = tokensOf(typeName);
  var mt = tokensOf(modeName);
  if (!tt.length || !mt.length) return false;
  for (var i = 0; i < mt.length; i++) { if (tt.indexOf(mt[i]) !== -1) return true; }
  return false;
}

// Commission 16b + 19: compose a deck meta description that lands in the
// 120-170 band as a COMPLETE sentence — never a mid-phrase truncation. The
// "core" (lead-with-theme + tail-with-variant) is uniqueness-complete and
// always retained; the adjustable middle is chosen from an ordered list of
// WHOLE sentences (instruction, full skill, short skill) — the richest that
// fits is used, else none. C19 replaced the earlier word-by-word truncation
// (which left dangling fragments like "…to build early.") with this tiered
// whole-sentence selection. When the core itself exceeds the ceiling and a
// variant_id is present (which alone distinguishes theme-differing decks), the
// theme parenthetical may be dropped — never when it would collide.
function bandedDescription(spec) {
  var FLOOR = 120;
  var CEIL = 170;
  function assemble(lead, mid) {
    if (!mid) return lead + '.' + spec.descTail;
    var m = String(mid).replace(/\s*[.!?]+\s*$/, '');
    return lead + '. ' + m + '.' + spec.descTail;
  }
  // middles: ordered preference of complete sentences (richest first).
  var middles = (spec.middles || []).filter(function (m) { return m && String(m).trim(); });
  // Returns { desc, inBand } or null when the lead's bare core exceeds the
  // ceiling (signals the caller to try dropping the theme).
  function bestForLead(lead) {
    var core = assemble(lead, '');
    var coreLen = descLenRendered(core);
    if (coreLen > CEIL) return null;
    var cands = [{ d: core, len: coreLen }];
    for (var i = 0; i < middles.length; i++) {
      var d = assemble(lead, middles[i]);
      cands.push({ d: d, len: descLenRendered(d) });
    }
    // In-band (120-170): take the longest (richest) complete option.
    var inBand = cands.filter(function (c) { return c.len >= FLOOR && c.len <= CEIL; });
    if (inBand.length) { inBand.sort(function (a, b) { return b.len - a.len; }); return { desc: inBand[0].d, inBand: true }; }
    // None in band (core < FLOOR and no whole middle lands in [FLOOR,CEIL]):
    // best-effort = the longest complete option still under the ceiling.
    var underCeil = cands.filter(function (c) { return c.len <= CEIL; });
    underCeil.sort(function (a, b) { return b.len - a.len; });
    return { desc: (underCeil[0] || cands[0]).d, inBand: false };
  }
  // Priority 1: retain the theme (primary keyword + uniqueness) — size the middle.
  var withTheme = bestForLead(spec.descLead);
  if (withTheme && withTheme.inBand) return withTheme.desc;
  // Priority 2: drop the theme ONLY when a variant_id is present (it alone makes
  // descriptions of theme-differing decks unique) and the theme-lead could not
  // reach the band (its bare core exceeds the ceiling).
  if (spec.hasVariant && spec.descLeadNoTheme) {
    var noTheme = bestForLead(spec.descLeadNoTheme);
    if (noTheme && noTheme.inBand) return noTheme.desc;
  }
  // Best-effort: prefer the theme-retaining result, else the no-theme result, else bare core.
  if (withTheme && withTheme.desc) return withTheme.desc;
  if (spec.descLeadNoTheme) {
    var nt2 = bestForLead(spec.descLeadNoTheme);
    if (nt2 && nt2.desc) return nt2.desc;
  }
  return assemble(spec.descLead, '');
}

function buildSeoHead(opts) {
  if (!opts) throw new Error('buildSeoHead: opts is required.');
  var language        = String(opts.language || 'en');
  var typeName        = String(opts.exerciseTypeName || '');
  var typeSlug        = String(opts.exerciseTypeSlug || '');
  var themeName       = opts.themeName ? String(opts.themeName) : null;
  // Phase 4a Checkpoint 2.5 (θ): exercise_mode discriminator. Non-null
  // when manifest.exercise_mode is non-null (per §17.8.5 default-mode-
  // emits-null contract). Mirrors catalog-export.js buildSeoHead change.
  var modeName        = (opts.exerciseModeName !== undefined && opts.exerciseModeName !== null && opts.exerciseModeName !== '')
                          ? String(opts.exerciseModeName) : null;
  // Commission 19: suppress the mode segment when it just repeats the type's
  // keywords (e.g. "Shadow Match" + "Match the Shadow"). Applies to title +
  // description so neither carries redundant keyword repetition.
  var effectiveModeName = (modeName && !modeRedundant(typeName, modeName)) ? modeName : null;
  // §11 commission: variant_id discriminator (4-char hex hash of bundle content).
  // Mirrors catalog-export.js. Title/description gain "Set {variantId}" segment
  // when present.
  var variantId       = (opts.variantId !== undefined && opts.variantId !== null && opts.variantId !== '')
                          ? String(opts.variantId) : null;
  var worksheetWord   = String(opts.worksheetWord || 'Worksheet');
  var instruction     = String(opts.instruction || '');
  var freeInteractive = String(opts.freeInteractive || 'Free interactive');
  var forWord         = String(opts.forWord || 'for');
  var printOrPlay     = String(opts.printOrPlay || 'Print or play online');
  // Variant-id label localized per locale (es: "Conjunto", de: "Satz", etc.).
  // Defaults to English "Set" for backwards compat with callers that don't
  // pass variantLabel (e.g., legacy republish-seo invocations pre-locale-fix).
  var variantLabel    = String(opts.variantLabel || 'Set');

  // Title: "{Type} {Mode?} {Worksheet} — {Theme} — __EDUCATIONAL_LEVEL_LOCALIZED__ — Set {variantId}? | LessonCraftStudio"
  // Mode segment included when non-null (non-default mode); omitted for default mode.
  // Theme segment + its em-dashes are omitted when no theme is set.
  // Variant segment included when non-null (§11 commission); omitted for legacy decks.
  var titleHead = typeName + (effectiveModeName ? ' ' + effectiveModeName : '') + ' ' + worksheetWord;
  var titleSegments = [titleHead];
  if (themeName) titleSegments.push(themeName);
  titleSegments.push('__EDUCATIONAL_LEVEL_LOCALIZED__');
  if (variantId) titleSegments.push(variantLabel + ' ' + variantId);
  var titleCore = titleSegments.join(' — ');
  var titleFull = titleCore + ' | LessonCraftStudio';

  // Description: "{freeInteractive} {type} {mode?} {worksheet} ({theme}) {for} {LEVEL}. {middle}. {printOrPlay} (Set {variantId})?."
  // Preserve input casing — German requires capitalized nouns; lowercasing
  // breaks grammar in 5+ of the 11 supported languages.
  //
  // Commission 16b: when the caller supplies a RESOLVED educational level
  // (opts.educationalLevelLocalized) the description length is final at compose
  // time, so bandedDescription() enforces the 120-170 band — sizing the
  // adjustable instruction/skill middle against a uniqueness-complete core. The
  // republish-seo retrofit path supplies the resolved level + a per-type skill
  // sentence. When the level is NOT supplied (app-gen path emits the
  // __EDUCATIONAL_LEVEL_LOCALIZED__ placeholder), the legacy composition is
  // preserved byte-for-byte; the §17.8.17 publish-time length gate catches any
  // out-of-band result there.
  var levelProvided = (opts.educationalLevelLocalized !== undefined && opts.educationalLevelLocalized !== null && String(opts.educationalLevelLocalized) !== '');
  var levelText = levelProvided ? String(opts.educationalLevelLocalized) : '__EDUCATIONAL_LEVEL_LOCALIZED__';
  // Commission 19: two complete skill-sentence tiers (full + short). The band
  // logic picks the richest WHOLE sentence that fits — never truncates.
  var skillSentence = String(opts.skillSentence || '');
  var skillSentenceShort = String(opts.skillSentenceShort || '');

  var descLeadBase = freeInteractive + ' ' + typeName + (effectiveModeName ? ' ' + effectiveModeName : '') + ' ' + worksheetWord;
  var descLeadNoTheme = descLeadBase + ' ' + forWord + ' ' + levelText;
  var descLead = (themeName ? descLeadBase + ' (' + themeName + ')' : descLeadBase) + ' ' + forWord + ' ' + levelText;
  var descTail = ' ' + printOrPlay + (variantId ? ' (' + variantLabel + ' ' + variantId + ')' : '') + '.';

  var description;
  if (levelProvided) {
    description = bandedDescription({
      descLead: descLead,
      descLeadNoTheme: themeName ? descLeadNoTheme : null,
      descTail: descTail,
      middles: [instruction, skillSentence, skillSentenceShort],
      hasVariant: !!variantId
    });
  } else {
    description = descLead + '.' + (instruction ? ' ' + instruction + (/[.!?]$/.test(instruction) ? '' : '.') : '') + descTail;
  }

  // Schema.org LearningResource. Placeholders sit INSIDE string-quoted JSON
  // values so JSON.parse stays valid both before and after publish-cli's
  // literal-token substitution (CLAUDE.md §17.8.1.6 / Brief A §4.6).
  //
  // Image enrichment (2026-05-19 SEO-thumbnail commission): `image` expanded
  // from bare URL string to full ImageObject with width/height/caption +
  // separate `thumbnailUrl` field + `keywords` + `typicalAgeRange` +
  // `publisher`. Drives Google search-result thumbnail display + image-search
  // discoverability. Mirrors REFERENCE TRANSLATIONS/catalog-export.js per §A.2.
  var ld = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: titleCore,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: '__OG_IMAGE__',
      contentUrl: '__OG_IMAGE__',
      width: 1200,
      height: 630,
      caption: '__OG_IMAGE_ALT__'
    },
    thumbnailUrl: '__THUMBNAIL_URL__',
    datePublished: '__DATE_PUBLISHED__',
    learningResourceType: 'Worksheet',
    educationalLevel: '__EDUCATIONAL_LEVEL__',
    typicalAgeRange: '__AGE_RANGE__',
    teaches: typeSlug,
    keywords: '__SEO_KEYWORDS__',
    inLanguage: language,
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: 'https://www.lessoncraftstudio.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: 'https://www.lessoncraftstudio.com'
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student'
    },
    url: '__CANONICAL_URL__'
  };

  return [
    '<!-- SEO_INSERTION_POINT_START -->',
    '<title>' + escapeHtml(titleFull) + '</title>',
    '<meta name="description" content="' + escapeAttr(description) + '">',
    '<link rel="canonical" href="__CANONICAL_URL__">',
    '<link rel="image_src" href="__OG_IMAGE__">',
    '<script type="application/ld+json">' + JSON.stringify(ld) + '<\/script>',
    '<meta property="og:title" content="__OG_TITLE__">',
    '<meta property="og:description" content="__OG_DESCRIPTION__">',
    '<meta property="og:image" content="__OG_IMAGE__">',
    '<meta property="og:image:secure_url" content="__OG_IMAGE__">',
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="__OG_IMAGE_ALT__">',
    '<meta property="og:type" content="website">',
    '<meta property="og:url" content="__CANONICAL_URL__">',
    '<meta property="og:locale" content="__OG_LOCALE__">',
    '<meta property="og:site_name" content="LessonCraftStudio">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="__OG_TITLE__">',
    '<meta name="twitter:description" content="__OG_DESCRIPTION__">',
    '<meta name="twitter:image" content="__OG_IMAGE__">',
    '<meta name="twitter:image:alt" content="__OG_IMAGE_ALT__">',
    '<!-- SEO_INSERTION_POINT_END -->'
  ].join('\n');
}

/**
 * Convert raw exercise_mode slug to localized human-readable form for SEO
 * surfaces. Reads name from topics-taxonomy.json `axes.exercise-mode.<key>.name.<locale>`
 * with fallback chain: locale → en → title-cased slug.
 *
 * Phase 4a Checkpoint 2.5 (θ) shipped title-case-only fallback; Phase 5+
 * (this commission) layers locale-aware lookup on top so es/de/etc. titles
 * render localized mode names instead of leaking raw English ('Easy', 'FindBig').
 *
 * Args:
 *   rawMode  — manifest.exercise_mode raw slug (e.g., 'find-addend', 'easy')
 *   locale   — deck's content language ('en' | 'es' | ...); optional, defaults to 'en'
 *   taxonomy — frontend/config/topics-taxonomy.json object; optional. When
 *              omitted, falls through to title-case-only behavior (legacy).
 *
 * Returns null when input is null/empty/non-string. Empty string trips
 * the fallback path (default-mode contract per §17.8.5).
 */
function deriveExerciseModeName(rawMode, locale, taxonomy) {
  if (!rawMode || typeof rawMode !== 'string') return null;
  var s = rawMode.trim();
  if (!s) return null;
  // Taxonomy lookup: locale → en → title-cased slug
  if (taxonomy && taxonomy.axes && taxonomy.axes['exercise-mode']) {
    var entry = taxonomy.axes['exercise-mode'][s];
    if (entry && entry.name) {
      var loc = locale || 'en';
      if (entry.name[loc]) return entry.name[loc];
      if (entry.name.en) return entry.name.en;
    }
  }
  // Final fallback: title-case the raw slug
  return s.split('-').map(function (w) {
    if (!w) return '';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

/**
 * §11 commission Node-CJS port: derive variant_id from bundle content.
 * Mirrors catalog-export.js LCSCatalogExport.deriveVariantId. FNV-1a 32-bit
 * over deterministic content-bearing subset; first 4 hex chars returned.
 *
 * Browser-portable + sync (no async crypto.subtle dependency).
 *
 * Returns: 4-char lowercase hex string, OR null if bundle is empty/missing.
 */
function deriveVariantId(bundle) {
  if (!bundle || typeof bundle !== 'object') return null;
  var contentKeys = ['targets', 'cells', 'cutoutsData', 'holes', 'uniqueImageKeys',
                     'problems', 'exercises', 'placedWordsInfo', 'words',
                     'imageRefs', 'imagePlacements'];
  var contentObj = {};
  contentKeys.forEach(function (k) {
    if (bundle[k] !== undefined) contentObj[k] = bundle[k];
  });
  if (Object.keys(contentObj).length === 0) {
    var skipFields = {
      createdAt: 1, attribution: 1, worksheetImage: 1, bundleVersion: 1,
      schemaFormat: 1, loadingMode: 1, seoMeta: 1, page: 1,
      gridRect: 1, gridDims: 1, variantId: 1
    };
    Object.keys(bundle).forEach(function (k) {
      if (!skipFields[k]) contentObj[k] = bundle[k];
    });
  }
  if (Object.keys(contentObj).length === 0) return null;
  var json;
  try { json = JSON.stringify(contentObj); }
  catch (e) { return null; }
  // FNV-1a 32-bit
  var hash = 2166136261;
  for (var i = 0; i < json.length; i++) {
    hash ^= json.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  var hex = (hash >>> 0).toString(16);
  while (hex.length < 8) hex = '0' + hex;
  return hex.slice(0, 4);
}

module.exports = {
  buildSeoHead: buildSeoHead,
  deriveExerciseModeName: deriveExerciseModeName,
  deriveVariantId: deriveVariantId,
  escapeHtml: escapeHtml,
  escapeAttr: escapeAttr
};
