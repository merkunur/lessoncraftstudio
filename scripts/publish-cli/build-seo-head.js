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
  var worksheetWord   = String(opts.worksheetWord || 'Worksheet');
  var instruction     = String(opts.instruction || '');
  var freeInteractive = String(opts.freeInteractive || 'Free interactive');
  var forWord         = String(opts.forWord || 'for');
  var printOrPlay     = String(opts.printOrPlay || 'Print or play online');

  // Title: "{Type} {Mode?} {Worksheet} — {Theme} — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"
  // Mode segment included when non-null (non-default mode); omitted for default mode.
  // Theme segment + its em-dashes are omitted when no theme is set.
  var titleHead = typeName + (modeName ? ' ' + modeName : '') + ' ' + worksheetWord;
  var titleSegments = [titleHead];
  if (themeName) titleSegments.push(themeName);
  titleSegments.push('__EDUCATIONAL_LEVEL_LOCALIZED__');
  var titleCore = titleSegments.join(' — ');
  var titleFull = titleCore + ' | LessonCraftStudio';

  // Description: "{freeInteractive} {type} {mode?} {worksheet} ({theme}) {for} __EDUCATIONAL_LEVEL_LOCALIZED__. {instruction}. {printOrPlay}."
  // Preserve input casing — German requires capitalized nouns; lowercasing
  // breaks grammar in 5+ of the 11 supported languages.
  var descLead = freeInteractive + ' ' + typeName + (modeName ? ' ' + modeName : '') + ' ' + worksheetWord;
  if (themeName) descLead += ' (' + themeName + ')';
  descLead += ' ' + forWord + ' __EDUCATIONAL_LEVEL_LOCALIZED__';
  var description = descLead + '.' + (instruction ? ' ' + instruction + (/[.!?]$/.test(instruction) ? '' : '.') : '') + ' ' + printOrPlay + '.';

  // Schema.org LearningResource. Placeholders sit INSIDE string-quoted JSON
  // values so JSON.parse stays valid both before and after publish-cli's
  // literal-token substitution (CLAUDE.md §17.8.1.6 / Brief A §4.6).
  var ld = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: titleCore,
    description: description,
    learningResourceType: 'Worksheet',
    educationalLevel: '__EDUCATIONAL_LEVEL__',
    teaches: typeSlug,
    inLanguage: language,
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: 'https://lessoncraftstudio.com'
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
    '<script type="application/ld+json">' + JSON.stringify(ld) + '<\/script>',
    '<meta property="og:title" content="__OG_TITLE__">',
    '<meta property="og:description" content="__OG_DESCRIPTION__">',
    '<meta property="og:image" content="__OG_IMAGE__">',
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
    '<!-- SEO_INSERTION_POINT_END -->'
  ].join('\n');
}

/**
 * Phase 4a Checkpoint 2.5 (θ): convert raw exercise_mode slug (e.g.,
 * 'find-addend') to title-case human-readable form (e.g., 'Find Addend').
 * Mirror of catalog-export.js deriveExerciseModeName for Node-side
 * republish-seo retrofit consumption.
 *
 * Returns null when input is null/empty/non-string. Empty string trips
 * the fallback path (default-mode contract per §17.8.5).
 */
function deriveExerciseModeName(rawMode) {
  if (!rawMode || typeof rawMode !== 'string') return null;
  var s = rawMode.trim();
  if (!s) return null;
  return s.split('-').map(function (w) {
    if (!w) return '';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

module.exports = {
  buildSeoHead: buildSeoHead,
  deriveExerciseModeName: deriveExerciseModeName,
  escapeHtml: escapeHtml,
  escapeAttr: escapeAttr
};
