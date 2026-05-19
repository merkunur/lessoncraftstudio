/**
 * Apply substitutions to deck.html per Brief B Phase 2 brief + Commission B Phase 2.
 *
 * Canonical placeholder inventory (per REFERENCE TRANSLATIONS/catalog-export.js:34-46):
 *   1. __CANONICAL_URL__                  computed
 *   2. __EDUCATIONAL_LEVEL__              age_range → §17.8.6 mapping (English form)
 *   3. __EDUCATIONAL_LEVEL_LOCALIZED__    i18n seo.educational_level.<key>
 *   4. __END_DECK_HEADING__               i18n endDeck.heading
 *   5. __LINK_MORE_TYPE__                 taxonomy axis + locale → URL
 *   6. __LINK_TEXT_MORE_TYPE__            i18n endDeck.moreType + {type} interpolation
 *   7. __LINK_MORE_THEME__                taxonomy axis + locale → URL (or skip)
 *   8. __LINK_TEXT_MORE_THEME__           i18n endDeck.moreTheme + {theme} interpolation
 *   9. __LINK_MORE_LEVEL__                taxonomy axis + locale → URL
 *  10. __LINK_TEXT_MORE_LEVEL__           i18n endDeck.moreLevel + {level} interpolation
 *  11. __LINK_BROWSE_ALL__                computed: /<locale>/
 *  12. __LINK_TEXT_BROWSE_ALL__           i18n endDeck.browseAll
 *  13. <!-- HREFLANG_INSERTION_POINT -->  v1: empty string
 *
 * Commission B Phase 2 extension (placeholders 14-32; 19 added):
 *  14. __DECK_END_SUGGESTIONS_HEADER__    i18n deckEndSuggestionsHeader
 *  15-32. __SUGGESTION_<N>_URL__ / __SUGGESTION_<N>_TITLE__ / __SUGGESTION_<N>_THUMB__
 *         for N=1..6 (6 × 3 = 18 placeholders). Substituted from opts.suggestions
 *         array; if opts.suggestions absent or short, remaining placeholders left
 *         raw. App-side runtime guard in showCelebration() keeps strip hidden when
 *         placeholders unsubstituted (graceful degradation for direct-download decks).
 *
 * [ARC][SEO][DECK-PAGE] Phase 3a.1 Checkpoint 2 extension (placeholders 33-37):
 *  33. __OG_TITLE__              derived from <title> minus " | LessonCraftStudio" suffix
 *  34. __OG_DESCRIPTION__        mirrors <meta name="description"> content
 *  35. __OG_IMAGE__              computed canonical-relative og-image.png URL per §15.14
 *  36. __OG_LOCALE__             BCP-47 mapping per concern 1 supplement (es_MX, pt_BR, etc.)
 *  37. __OG_IMAGE_ALT__          mirrors __OG_TITLE__ at Phase 3a; Phase 3b refines
 *
 * Forward-compatible: placeholders 33-37 are no-ops until Phase 3a.2 ships
 * the catalog-export.js extension that emits them. Once emitted, substitution
 * activates; idempotent + correct.
 *
 * Constants emitted as literals at Phase 3a.2 in buildSeoHead template (NOT
 * substituted): og:type='website' / og:site_name='LessonCraftStudio' /
 * og:image:width='1200' / og:image:height='630' / twitter:card='summary_large_image'.
 * Twitter:title / twitter:description / twitter:image mirror og counterparts
 * (template-level identical-content; no separate placeholder needed).
 *
 * Idempotent: substitution iterates the explicit allowlist (NOT a generic
 * regex match). Running twice on the same input produces identical output.
 *
 * Order: substitute placeholder 3 (EDUCATIONAL_LEVEL_LOCALIZED) before
 * placeholder 10 (LINK_TEXT_MORE_LEVEL) because placeholder 10's resolved
 * value interpolates the localized educational level.
 */

'use strict';

var i18n = require('./i18n');
var taxonomy = require('./taxonomy');
var slugMod = require('./slug');

// www. form per CLAUDE.md §A.10. The apex variant 301-redirects to www at
// nginx layer, but that redirect breaks the embed iframe's auto-resize:
// the postMessage URL check rejects the resize message because location.href
// (www after redirect) ≠ f.src (apex from embed snippet) — iframe stays at
// default aspect-ratio:800/1400 producing visible bottom whitespace for
// sparse-content apps (alphabet-train, prepositions). Using www. form here
// directly = no redirect = postMessage URLs match = iframe auto-resizes.
var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';

/**
 * Returns:
 *   {
 *     html:       <substituted deck.html string>,
 *     report:     [{placeholder, source, value, fallbackFired, warning?}, ...],
 *     warnings:   [string, ...],
 *     errors:     [string, ...],
 *     resolved:   { canonicalURL, slug, level, levelLocalized, ... }
 *   }
 *
 * opts:
 *   manifest          parsed manifest.json (per bundle.parseManifest)
 *   metadata          { age_range, theme? }  (auto-derived from taxonomy if missing)
 *   deckHtml          raw deck.html string from bundle.readDeckHtml
 *   slugCandidate     pre-computed slug (caller calls slugMod.slugify on metadata.title[language])
 *
 * Phase 2 dry-run does NOT pass real `slugCandidate` — the candidate is
 * computed by index.js and the dry-run accepts it without DB collision check.
 */
function apply(opts) {
  var manifest = opts.manifest;
  var metadata = opts.metadata || {};
  var deckHtml = opts.deckHtml;
  var slug = opts.slugCandidate;
  var locale = manifest.language;

  var report = [];
  var warnings = [];
  var errors = [];

  function note(placeholder, source, value, fallbackFired, warning) {
    report.push({
      placeholder: placeholder,
      source: source,
      value: value,
      fallbackFired: !!fallbackFired,
      warning: warning || null
    });
    if (warning) warnings.push(placeholder + ': ' + warning);
  }

  // 1. __CANONICAL_URL__
  if (!slug) {
    errors.push('__CANONICAL_URL__: slug is empty (slugify produced no output for title)');
  }
  var canonicalURL = CANONICAL_URL_BASE + '/' + locale + '/decks/' + slug + '/';
  note('__CANONICAL_URL__', 'computed', canonicalURL, false);

  // 2. __EDUCATIONAL_LEVEL__
  var ageRange = metadata.age_range;
  if (!ageRange) {
    var appCfg;
    try {
      appCfg = taxonomy.appConfig(manifest.generator && manifest.generator.app);
      ageRange = appCfg.default_age_range;
    } catch (e) {
      errors.push('__EDUCATIONAL_LEVEL__: no age_range in metadata and taxonomy app lookup failed: ' + e.message);
    }
  }
  var levelEn = taxonomy.AGE_RANGE_TO_LEVEL_EN[ageRange];
  if (!levelEn) {
    errors.push('__EDUCATIONAL_LEVEL__: age_range "' + ageRange + '" not in §17.8.6 mapping');
    levelEn = '';
  }
  note('__EDUCATIONAL_LEVEL__', 'age_range mapping', levelEn, false);

  // 3. __EDUCATIONAL_LEVEL_LOCALIZED__
  var levelI18nKey = taxonomy.AGE_RANGE_TO_LEVEL_I18N_KEY[ageRange];
  var levelLocalized = '';
  if (levelI18nKey) {
    var r = i18n.resolve(locale, 'seo.educational_level.' + levelI18nKey, levelEn);
    levelLocalized = r.value;
    note('__EDUCATIONAL_LEVEL_LOCALIZED__', r.source, r.value, r.fallbackFired,
      r.fallbackFired ? 'fell back to ' + r.source : null);
  } else {
    note('__EDUCATIONAL_LEVEL_LOCALIZED__', 'error', '', true, 'age_range not in §17.8.6 mapping');
  }

  // 4. __END_DECK_HEADING__
  var rH = i18n.resolve(locale, 'endDeck.heading', 'Want more?');
  note('__END_DECK_HEADING__', rH.source, rH.value, rH.fallbackFired,
    rH.fallbackFired ? 'fell back to ' + rH.source : null);

  // 5. __LINK_MORE_TYPE__
  var typeAxis;
  try {
    typeAxis = taxonomy.exerciseTypeFor(manifest.generator && manifest.generator.app, locale);
  } catch (e) {
    errors.push('__LINK_MORE_TYPE__: ' + e.message);
    typeAxis = null;
  }
  var linkMoreType = typeAxis ? '/' + locale + '/topic/' + typeAxis.slug + '/' : null;
  note('__LINK_MORE_TYPE__', typeAxis ? 'taxonomy' : 'skip', linkMoreType || '', !typeAxis,
    typeAxis ? null : 'no taxonomy slug for locale "' + locale + '"; end-of-deck link skipped');

  // 6. __LINK_TEXT_MORE_TYPE__
  var typeName = (typeAxis && typeAxis.name) || (typeAxis && typeAxis.slug) || manifest.exercise_type;
  var rTypeText = i18n.resolve(locale, 'endDeck.moreType', 'More {type} worksheets');
  var linkTextMoreType = i18n.interpolate(rTypeText.value, { type: typeName });
  note('__LINK_TEXT_MORE_TYPE__', rTypeText.source, linkTextMoreType, rTypeText.fallbackFired,
    rTypeText.fallbackFired ? 'fell back to ' + rTypeText.source : null);

  // 7. __LINK_MORE_THEME__ (conditional)
  // Compound themes (A-vs-B pattern, e.g. picture-sort "vs" mode) don't
  // have a single topic page in the catalog — the theme link is degenerate
  // and gracefully skipped. Non-compound themes route through taxonomy.
  var theme = manifest.theme;
  var themeIsCompound = (typeof theme === 'string' && theme.indexOf('-vs-') !== -1);
  var themeAxis = null;
  if (theme && !themeIsCompound) {
    try {
      themeAxis = taxonomy.themeFor(theme, locale);
    } catch (e) {
      errors.push('__LINK_MORE_THEME__: ' + e.message);
    }
  }
  var linkMoreTheme = themeAxis ? '/' + locale + '/topic/' + themeAxis.slug + '/' : null;
  var themeNoteSource = themeAxis ? 'taxonomy'
    : (themeIsCompound ? 'compound skip (no single-topic page for A-vs-B)'
      : (theme ? 'skip' : 'conditional skip (theme=null)'));
  note('__LINK_MORE_THEME__', themeNoteSource, linkMoreTheme || '', !themeAxis,
    theme && !themeAxis && !themeIsCompound ? 'theme present but no taxonomy slug for locale; end-of-deck link skipped' : null);

  // 8. __LINK_TEXT_MORE_THEME__
  var themeName = (themeAxis && themeAxis.name) || (themeAxis && themeAxis.slug) || theme || '';
  var rThemeText = i18n.resolve(locale, 'endDeck.moreTheme', 'More {theme}-themed worksheets');
  var linkTextMoreTheme = themeAxis ? i18n.interpolate(rThemeText.value, { theme: themeName }) : '';
  note('__LINK_TEXT_MORE_THEME__', themeAxis ? rThemeText.source : 'conditional skip',
    linkTextMoreTheme, rThemeText.fallbackFired && !!themeAxis, null);

  // 9. __LINK_MORE_LEVEL__
  var levelAxis = null;
  if (ageRange) {
    try {
      levelAxis = taxonomy.levelFor(locale === 'placeholder' ? null : ageRange, locale);
    } catch (e) {
      errors.push('__LINK_MORE_LEVEL__: ' + e.message);
    }
  }
  var linkMoreLevel = levelAxis ? '/' + locale + '/topic/' + levelAxis.slug + '/' : null;
  note('__LINK_MORE_LEVEL__', levelAxis ? 'taxonomy' : 'skip', linkMoreLevel || '', !levelAxis,
    levelAxis ? null : 'no taxonomy slug for locale "' + locale + '"; end-of-deck link skipped');

  // 10. __LINK_TEXT_MORE_LEVEL__
  var levelName = (levelAxis && levelAxis.name) || levelLocalized;
  var rLevelText = i18n.resolve(locale, 'endDeck.moreLevel', 'More worksheets for {level}');
  var linkTextMoreLevel = i18n.interpolate(rLevelText.value, { level: levelName });
  note('__LINK_TEXT_MORE_LEVEL__', rLevelText.source, linkTextMoreLevel, rLevelText.fallbackFired,
    rLevelText.fallbackFired ? 'fell back to ' + rLevelText.source : null);

  // 11. __LINK_BROWSE_ALL__
  var linkBrowseAll = '/' + locale + '/';
  note('__LINK_BROWSE_ALL__', 'computed', linkBrowseAll, false);

  // 12. __LINK_TEXT_BROWSE_ALL__
  var rBrowse = i18n.resolve(locale, 'endDeck.browseAll', 'Browse all worksheets');
  note('__LINK_TEXT_BROWSE_ALL__', rBrowse.source, rBrowse.value, rBrowse.fallbackFired,
    rBrowse.fallbackFired ? 'fell back to ' + rBrowse.source : null);

  // 13. <!-- HREFLANG_INSERTION_POINT --> — v2 shipped at SEO-100pct commission Phase 4.
  // When opts.siblings is provided (list of {language, slug}), emit hreflang block:
  //   <!-- HREFLANG_BLOCK_START -->
  //   <link rel="alternate" hreflang="<lang>" href="<canonical>"/> per sibling
  //   <link rel="alternate" hreflang="x-default" href="<en | first>"/>
  //   <!-- HREFLANG_BLOCK_END -->
  // Empty when opts.siblings absent OR has 0 entries.
  var hreflangBlock = '';
  if (opts.siblings && Array.isArray(opts.siblings) && opts.siblings.length > 0) {
    var sortedSibs = opts.siblings.slice().sort(function (a, b) { return a.language.localeCompare(b.language); });
    var hlLines = ['<!-- HREFLANG_BLOCK_START -->'];
    sortedSibs.forEach(function (s) {
      var sUrl = CANONICAL_URL_BASE + '/' + s.language + '/decks/' + s.slug + '/';
      hlLines.push('<link rel="alternate" hreflang="' + s.language + '" href="' + sUrl + '"/>');
    });
    var xDef = sortedSibs.find(function (s) { return s.language === 'en'; }) || sortedSibs[0];
    if (xDef) {
      var xUrl = CANONICAL_URL_BASE + '/' + xDef.language + '/decks/' + xDef.slug + '/';
      hlLines.push('<link rel="alternate" hreflang="x-default" href="' + xUrl + '"/>');
    }
    hlLines.push('<!-- HREFLANG_BLOCK_END -->');
    hreflangBlock = hlLines.join('\n');
    note('<!-- HREFLANG_INSERTION_POINT -->', 'v2 siblings', String(sortedSibs.length) + ' alternates', false);
  } else if (manifest.content_family_id != null) {
    warnings.push('manifest has non-null content_family_id ("' + manifest.content_family_id +
      '") but no opts.siblings provided — emitting empty hreflang block. Caller should look up siblings via DB before substitute() to populate cross-locale alternates.');
    note('<!-- HREFLANG_INSERTION_POINT -->', 'v2 missing-siblings', '', true);
  } else {
    note('<!-- HREFLANG_INSERTION_POINT -->', 'no siblings', '', false);
  }

  // 14. __DECK_END_SUGGESTIONS_HEADER__ (Commission B Phase 2)
  // Key path: endDeck.suggestionsHeader — alongside other endDeck.* keys
  // in messages/<locale>.json. The translations-shared.js sibling carries
  // the same string for browser-side runtime use; both kept in sync.
  var rDeckEndHeader = i18n.resolve(locale, 'endDeck.suggestionsHeader', 'Try one of these next:');
  note('__DECK_END_SUGGESTIONS_HEADER__', rDeckEndHeader.source, rDeckEndHeader.value, rDeckEndHeader.fallbackFired,
    rDeckEndHeader.fallbackFired ? 'fell back to ' + rDeckEndHeader.source : null);

  // 15-32. __SUGGESTION_<N>_URL__ / __SUGGESTION_<N>_TITLE__ / __SUGGESTION_<N>_THUMB__
  // Substitute from opts.suggestions if provided. If absent, placeholders remain raw
  // and the app-side runtime guard keeps the strip hidden (graceful degradation for
  // direct-download decks where publish-cli isn't in the path).
  var suggestions = opts.suggestions || [];
  var suggestionSubstitutions = []; // [{placeholder, value}, ...]
  for (var sIdx = 1; sIdx <= 6; sIdx++) {
    var slot = suggestions[sIdx - 1];
    if (slot) {
      var slotTitleLocalized = (slot.title && (slot.title[locale] || slot.title.en)) || slot.slug;
      suggestionSubstitutions.push({
        placeholder: '__SUGGESTION_' + sIdx + '_URL__',
        value: slot.canonicalURL || (CANONICAL_URL_BASE + '/' + slot.language + '/decks/' + slot.slug + '/'),
      });
      suggestionSubstitutions.push({
        placeholder: '__SUGGESTION_' + sIdx + '_TITLE__',
        value: slotTitleLocalized,
      });
      suggestionSubstitutions.push({
        placeholder: '__SUGGESTION_' + sIdx + '_THUMB__',
        value: slot.thumbnailUrl || '',
      });
      note('__SUGGESTION_' + sIdx + '_*__', 'opts.suggestions[' + (sIdx - 1) + ']', slot.slug, false);
    } else {
      note('__SUGGESTION_' + sIdx + '_*__', 'no slot — placeholders left raw', '', true,
        'no suggestion for slot ' + sIdx + ' (suggestions array short or absent); placeholders remain raw');
    }
  }

  // Apply substitutions. Order matters for placeholder 3 vs 10 (3 must
  // resolve first because 10's value uses the localized level). The note()
  // calls above already resolved 3 before 10 so the levelLocalized variable
  // is correct here.
  var html = deckHtml
    .replace(/__CANONICAL_URL__/g, canonicalURL)
    .replace(/__EDUCATIONAL_LEVEL__/g, levelEn)
    .replace(/__EDUCATIONAL_LEVEL_LOCALIZED__/g, levelLocalized)
    .replace(/__END_DECK_HEADING__/g, rH.value)
    .replace(/__LINK_MORE_TYPE__/g, linkMoreType || '')
    .replace(/__LINK_TEXT_MORE_TYPE__/g, linkTextMoreType)
    .replace(/__LINK_MORE_THEME__/g, linkMoreTheme || '')
    .replace(/__LINK_TEXT_MORE_THEME__/g, linkTextMoreTheme)
    .replace(/__LINK_MORE_LEVEL__/g, linkMoreLevel || '')
    .replace(/__LINK_TEXT_MORE_LEVEL__/g, linkTextMoreLevel)
    .replace(/__LINK_BROWSE_ALL__/g, linkBrowseAll)
    .replace(/__LINK_TEXT_BROWSE_ALL__/g, rBrowse.value)
    .replace(/<!-- HREFLANG_INSERTION_POINT -->/g, hreflangBlock)
    .replace(/__DECK_END_SUGGESTIONS_HEADER__/g, rDeckEndHeader.value);

  // Apply per-suggestion-slot substitutions (placeholders 15-32 per Commission B).
  // Each substitution is a literal-string replace (placeholder is a unique token
  // by design; no regex-special chars). String.prototype.replace with a string
  // first-arg replaces only the first match, so we use split+join for global replace.
  for (var subIdx = 0; subIdx < suggestionSubstitutions.length; subIdx++) {
    var sub = suggestionSubstitutions[subIdx];
    html = html.split(sub.placeholder).join(sub.value);
  }

  // ============================================================
  // OG tag placeholders (33-37) per [ARC][SEO][DECK-PAGE] Phase 2 §4.
  // Composition runs AFTER main chain + suggestion loop because OG_TITLE
  // + OG_DESCRIPTION derive from the rendered post-substitution <title> +
  // <meta name="description"> (which themselves had __EDUCATIONAL_LEVEL_LOCALIZED__
  // substituted in the main chain). Forward-compatible: no-ops until Phase 3a.2
  // ships catalog-export.js extension that emits these placeholders.
  // ============================================================

  // 33. __OG_TITLE__ — extract from <title> post-substitution; strip brand suffix
  var ogTitle = '';
  var titleMatch = /<title>([^<]+)<\/title>/i.exec(html);
  if (titleMatch) {
    ogTitle = titleMatch[1].replace(/\s*\|\s*LessonCraftStudio\s*$/i, '').trim();
  }
  note('__OG_TITLE__', 'derived from post-substitution title', ogTitle, !ogTitle);

  // 34. __OG_DESCRIPTION__ — mirrors <meta name="description"> content post-substitution
  var ogDescription = '';
  var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(html);
  if (descMatch) ogDescription = descMatch[1];
  note('__OG_DESCRIPTION__', 'derived from post-substitution description', ogDescription, !ogDescription);

  // 35. __OG_IMAGE__ — canonical-relative og-image.png URL per §15.14
  // /var/www/lcs-media/decks/<locale>/<slug>-v<N>/og-image.png produced by publish-cli;
  // served via nginx symlink at canonicalURL/og-image.png
  var ogImage = canonicalURL + 'og-image.png';
  note('__OG_IMAGE__', 'computed from canonical', ogImage, false);

  // 36. __OG_LOCALE__ — BCP-47 mapping per concern 1 supplement
  // OG_LOCALE_MAP duplicate of frontend/lib/schema-generator.ts:ogLocaleMap +
  // scripts/publish-cli/seo-reconciliation.js:OG_LOCALE_MAP. See JSDoc
  // there on duplicate-state convention (Node-CJS / TypeScript boundary).
  var OG_LOCALE_MAP = {
    en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_MX', pt: 'pt_BR',
    it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', no: 'nb_NO', fi: 'fi_FI'
  };
  var ogLocale = OG_LOCALE_MAP[locale] || locale;
  note('__OG_LOCALE__', 'BCP-47 mapping', ogLocale, false);

  // 37. __OG_IMAGE_ALT__ — mirrors __OG_TITLE__ at Phase 3a.1; Phase 3b refines
  // (Phase 3b path-(b) trace upgrade may compose a more specific alt text)
  var ogImageAlt = ogTitle;
  note('__OG_IMAGE_ALT__', 'mirrors __OG_TITLE__', ogImageAlt, false);

  // 38. __DATE_PUBLISHED__ — ISO 8601 timestamp from manifest.generated_at per
  // §15.1 generation.json schema. Drives Schema.org LearningResource.datePublished
  // for Google freshness signal. Added 2026-05-14 alongside Schema.org image
  // field for Google search-result thumbnail surfacing.
  var datePublished = (manifest && manifest.generated_at) ? String(manifest.generated_at) : '';
  note('__DATE_PUBLISHED__', 'from manifest.generated_at', datePublished, !datePublished);

  // Apply OG substitutions (idempotent allowlist iteration per §15.13 dry-run-vs-real
  // parity guarantee). Forward-compatible: no-ops until catalog-export.js emits.
  html = html
    .replace(/__OG_TITLE__/g, ogTitle)
    .replace(/__OG_DESCRIPTION__/g, ogDescription)
    .replace(/__OG_IMAGE__/g, ogImage)
    .replace(/__OG_LOCALE__/g, ogLocale)
    .replace(/__OG_IMAGE_ALT__/g, ogImageAlt)
    .replace(/__DATE_PUBLISHED__/g, datePublished);

  return {
    html: html,
    report: report,
    warnings: warnings,
    errors: errors,
    resolved: {
      canonicalURL: canonicalURL,
      slug: slug,
      level: levelEn,
      levelLocalized: levelLocalized,
      linkMoreType: linkMoreType,
      linkMoreTheme: linkMoreTheme,
      linkMoreLevel: linkMoreLevel,
      linkBrowseAll: linkBrowseAll,
      ogTitle: ogTitle,
      ogDescription: ogDescription,
      ogImage: ogImage,
      ogLocale: ogLocale,
      ogImageAlt: ogImageAlt
    }
  };
}

module.exports = {
  apply: apply,
  CANONICAL_URL_BASE: CANONICAL_URL_BASE
};
