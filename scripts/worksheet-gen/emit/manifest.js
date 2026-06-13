/**
 * emit/manifest.js — build the publish-contract manifest.json for a rendered
 * printable worksheet instance (schema 1.1, printable_only).
 *
 * Contract notes (verified against scripts/publish-cli/):
 * - exercise_type = the collapsed family key (taxonomy-registered, Gate-1);
 *   generator.app mirrors it (publish.js appConfig fallback + selfMeta).
 * - variant_id = compact lowercase type id ('k002') — slug tail only; gains a
 *   '-N' suffix for variant >1 (the variant axis — N distinct worksheets of one
 *   type+theme+difficulty; v1 unchanged).
 * - exercise_mode: d2 → null (default-mode-emits-null §17.8.5), d1 → 'easy',
 *   d3 → 'hard' (both registered ×11 in axes.exercise-mode).
 * - age_range derives from the catalog id prefix (K/G1/G2/G3) and is emitted
 *   BOTH top-level (substitute.js / og-images / publish.js DB row) and under
 *   metadata (pdf-metadata / republish-seo readers).
 * - theme uses the AXIS-KEY form (spaces → underscores: 'animals bw' →
 *   'animals_bw') so declared theme, exercises[0].image.theme, AND
 *   parseThemeFromImagePath(path) all agree at the §15.16 gate.
 */
'use strict';

const SCHEMA_VERSION = '1.1';
const MODE_BY_DIFFICULTY = { 1: 'easy', 2: null, 3: 'hard' };
const AGE_BY_ID_PREFIX = { K: '5-7', G1: '6-8', G2: '7-9', G3: '8-10' };

/** 'animals bw' → 'animals_bw' (taxonomy axes.theme key form). */
function themeAxisKey(cacheTheme) {
  if (!cacheTheme) return null;
  return String(cacheTheme).trim().toLowerCase().replace(/\s+/g, '_');
}

function ageRangeForSpec(spec) {
  const prefix = String(spec.id).split('-')[0];
  const age = AGE_BY_ID_PREFIX[prefix];
  if (!age) throw new Error('manifest: unknown id prefix for ' + spec.id);
  return age;
}

function variantIdForSpec(spec) {
  return String(spec.id).toLowerCase().replace(/-/g, '');
}

/**
 * Scrape the rendered page HTML for image-cache references and resolve them
 * to {noun, vocabKey} via the cache manifest. Captures themes, themes-512,
 * and silhouettes paths (file:// URLs percent-encode spaces).
 */
function scrapeImagesUsed(html, cacheManifest) {
  const re = /cache\/(themes(?:-512)?|silhouettes)\/([^/"']+)\/([^/"']+\.(?:webp|png))/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const theme = decodeURIComponent(m[2]);
    const file = decodeURIComponent(m[3]);
    const noun = file.replace(/@3x\.(webp|png)$/i, '').replace(/\.(webp|png)$/i, '');
    const key = theme + '/' + noun;
    if (seen.has(key)) continue;
    seen.add(key);
    const themeEntry = cacheManifest.themes[theme];
    const nounEntry = themeEntry && themeEntry.nouns[noun];
    out.push({
      theme: theme,
      noun: noun,
      vocabKey: (nounEntry && nounEntry.vocabKey) || null,
    });
  }
  return out;
}

/**
 * @param {object} o {spec, cacheTheme (cache form, null for themeless),
 *   difficulty, locale, deckId, generatedAt, strings, imagesUsed
 *   ([{theme, noun, vocabKey}] from scrapeImagesUsed)}
 */
function buildManifest(o) {
  const { spec, difficulty, locale, deckId, generatedAt, strings } = o;
  const variant = o.variant || 1;
  const themeKey = themeAxisKey(o.cacheTheme);
  const ageRange = ageRangeForSpec(spec);
  const imagesUsed = o.imagesUsed || [];

  // images_used: clean vocab-resolvable paths (/images/<themeKey>/<noun>.webp)
  // — deck-rich-alt imagePathToVocabKey takes the basename, so the noun (with
  // its trailing-number variant stripped by the composer) is the key surface.
  const imagePaths = imagesUsed.map(function (img) {
    return '/images/' + themeAxisKey(img.theme) + '/' + img.noun + '.webp';
  });
  const vocabulary = imagesUsed
    .map(function (img) { return img.vocabKey; })
    .filter(function (v, i, a) { return v && a.indexOf(v) === i; });

  // exercises[0].image drives the §15.16 theme gate (declared vs primary vs
  // path). Themeless types emit [] — legitimate-null CLEAN.
  const exercises = themeKey && imagePaths.length
    ? [{ image: { path: imagePaths[0], theme: themeKey } }]
    : [];

  const manifest = {
    schema_version: SCHEMA_VERSION,
    printable_only: true,
    deck_id: deckId,
    generated_at: generatedAt,
    generator: {
      app: spec.exerciseType,
      app_version: 'worksheet-gen/1.0',
      bundle_version: null,
    },
    language: locale,
    content_language: null,
    content_language_name: null,
    exercise_type: spec.exerciseType,
    exercise_mode: MODE_BY_DIFFICULTY[difficulty] !== undefined ? MODE_BY_DIFFICULTY[difficulty] : null,
    settings: {
      worksheet_type: spec.id,
      grade_band: spec.gradeBand,
      difficulty: difficulty,
    },
    theme: themeKey,
    age_range: ageRange,
    metadata: { age_range: ageRange },
    title: strings ? { [locale]: strings.title } : {},
    images_used: imagePaths,
    vocabulary: vocabulary,
    exercises: exercises,
    assets: {
      html: 'deck.html',
      pdf: 'printable.pdf',
      answer_key_pdf: null,
      thumbnail: 'thumbnail.png',
    },
    content_family_id: null,
    // variant_id is appended BARE to the slug seed (slug.js deriveSeedFromManifest)
    // and (via deck-html.js) drives the "Set N" title/description disambiguator —
    // so variant >1 yields a unique deterministic slug/title/desc, clearing the
    // §17.8.17 uniqueness HALT gates. variant 1 keeps the legacy compact type id.
    variant_id: variant > 1 ? variantIdForSpec(spec) + '-' + variant : variantIdForSpec(spec),
    variant: variant,
    seo_trace: null,
  };
  // Round-trip check (catalog-export.js convention): must JSON-serialize cleanly.
  JSON.parse(JSON.stringify(manifest));
  return manifest;
}

module.exports = {
  buildManifest,
  scrapeImagesUsed,
  themeAxisKey,
  ageRangeForSpec,
  variantIdForSpec,
  MODE_BY_DIFFICULTY,
  SCHEMA_VERSION,
};
