#!/usr/bin/env node
/**
 * One-shot comprehensive SEO retrofit for staged ZIPs that hit defect classes
 * on the 920-ZIP en wave (2026-05-09). Per CLAUDE.md §11 + §15.17 + §17.8.5
 * + the operator's recurring-failure-pattern critique:
 *
 *   "ten times the same thing happened... It is your fault and you should fix
 *    them and publish and make sure that the same problem never appears in
 *    the future when I generate new decks."
 *
 * Defect classes addressed (per app's bundle.appType):
 *
 *   Class A — sudoku-medium title-discriminator missing (50 ZIPs)
 *     Bundle has post-Phase-3a.2 SEO surface; manifest.exercise_mode='medium'
 *     correctly captured; deck.html title misses "Medium" segment.
 *     Fix: rewrite title to include modeName + variation_id.
 *
 *   Class B — find-and-count exercise_mode emit-broken + fresh-roll (334 ZIPs)
 *     manifest.exercise_mode=null universally; bundle.targets[*].taskType
 *     encodes mode pattern (uniform 'circle' = letter-spotting; mixed = default).
 *     Fix: derive mode from taskType + variation_id from bundle content; rewrite.
 *
 *   Class C — missing-pieces + odd-one-out source HTML pre-Phase-3a.2 (388 ZIPs)
 *     deck.html has multi-h1 (lcs-celebration__title still h1) + zero OG tags +
 *     no SEO_INSERTION_POINT markers.
 *     Fix: inject full SEO surface (markers + 14 OG/Twitter tags) + h1→h2 flip
 *     + variation_id in title.
 *
 *   Class D — sudoku-hard empty exercises (51 ZIPs)
 *     bundle.exercises=[]; manifest.images_used=[]; bundle missing structurally.
 *     Halt-class: NOT salvageable; surface to operator for sudoku.html "hard"
 *     mode Shape A authoring fix.
 *
 * Per §15.17 pattern: Phase 1 classification (no FS writes); halt on any
 * unparseable; Phase 2 backup-then-rewrite atomic.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-full-seo-retrofit.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));
var buildSeoHeadMod = require('./build-seo-head');
var topicsTaxonomy = require(path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));

var SUFFIX = ' | LessonCraftStudio';
var EM = ' — ';
var SEO_MARKER_START = '<!-- SEO_INSERTION_POINT_START -->';
var SEO_MARKER_END = '<!-- SEO_INSERTION_POINT_END -->';

var TITLE_RE = /<title>([^<]*)<\/title>/;
var META_DESC_RE = /<meta\s+name="description"\s+content="([^"]*)">/;
var LD_BLOCK_RE = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/;
var BUNDLE_RE = /var\s+DECK_BUNDLE\s*=\s*(\{[\s\S]*?\});\s*<\/script>/;
var SEO_BLOCK_RE = new RegExp(SEO_MARKER_START + '[\\s\\S]*?' + SEO_MARKER_END);
// Celebration h1 patterns: both raw and JS-string-escaped forms (Phase 4a Checkpoint 1)
var CELEB_H1_RAW_OPEN = /<h1(\s[^>]*class="[^"]*lcs-celebration__title[^"]*"[^>]*)>/g;
var CELEB_H1_RAW_CLOSE = /<\/h1>(\s*<!--\s*lcs-celebration[^>]*-->)?(?=[\s\S]{0,200}lcs-celebration)/g;
var CELEB_H1_ESCAPED_OPEN = /<h1(\s[^>]*class=\\"[^"]*lcs-celebration__title[^"]*\\"[^>]*)>/g;

// Per-locale forWord (mirror rewrite-deck-html-title.js)
var FOR_WORD_BY_LOCALE = {
  en: 'for', de: 'für', es: 'para', nl: 'voor', it: 'per',
  fr: 'pour', pt: 'para', sv: 'för', da: 'til', no: 'for', fi: 'varten'
};

var WORKSHEET_WORD_BY_LOCALE = {
  en: 'Worksheet', de: 'Arbeitsblatt', es: 'Hoja de ejercicios', nl: 'Werkblad',
  it: 'Scheda di esercizi', fr: "Fiche d'exercices", pt: 'Folha de exercícios',
  sv: 'Övningsblad', da: 'Opgaveark', no: 'Oppgaveark', fi: 'Tehtävämoniste'
};

var FREE_INTERACTIVE_BY_LOCALE = {
  en: 'Free interactive', de: 'Kostenloses interaktives', es: 'Hoja interactiva gratuita',
  nl: 'Gratis interactief', it: 'Scheda interattiva gratuita', fr: 'Fiche interactive gratuite',
  pt: 'Folha interativa grátis', sv: 'Gratis interaktivt', da: 'Gratis interaktivt',
  no: 'Gratis interaktivt', fi: 'Ilmainen interaktiivinen'
};

var PRINT_OR_PLAY_BY_LOCALE = {
  en: 'Print or play online', de: 'Drucken oder online spielen', es: 'Imprime o juega en línea',
  nl: 'Afdrukken of online spelen', it: 'Stampa o gioca online', fr: 'Imprimer ou jouer en ligne',
  pt: 'Imprima ou jogue online', sv: 'Skriv ut eller spela online', da: 'Udskriv eller spil online',
  no: 'Skriv ut eller spill online', fi: 'Tulosta tai pelaa verkossa'
};

// =====================================================================
// Helpers
// =====================================================================

function titleCaseSnake(s) {
  return String(s || '').split('_').map(function (w) {
    if (w.length === 0) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

function titleCaseWord(s) {
  if (!s) return '';
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

/** Theme display name from topics-taxonomy.json. */
function deriveThemeName(themeKey, locale) {
  if (!themeKey) return null;
  // Compound theme (picture-sort vs mode)
  if (typeof themeKey === 'string' && themeKey.indexOf('-vs-') !== -1) {
    var parts = themeKey.split('-vs-');
    return parts.map(function (p) { return deriveThemeName(p, locale); }).join(' vs ');
  }
  var node = topicsTaxonomy.axes && topicsTaxonomy.axes.theme && topicsTaxonomy.axes.theme[themeKey];
  var name = (node && node.name && node.name[locale]) || (node && node.name && node.name.en);
  return name ? String(name) : titleCaseSnake(themeKey);
}

/** Educational level display name. Per §17.8.6 mapping table. */
var EDU_LEVEL_BY_AGE = {
  '3-5': { en: 'Preschool', de: 'Vorschule', es: 'Preescolar', nl: 'Peuterklas',
           it: "Scuola dell'infanzia (3-5 anni)", fr: 'École maternelle (petite/moyenne section, 3-5 ans)',
           pt: 'Educação infantil (creche, 3-5 anos)', sv: 'Förskola', da: 'Børnehave',
           no: 'Barnehage (3-5 år)', fi: 'Varhaiskasvatus' },
  '5-7': { en: 'Kindergarten', de: 'Kindergarten', es: 'Jardín infantil', nl: 'Kleuterklas',
           it: "Scuola dell'infanzia (5-7 anni)", fr: 'École maternelle (grande section, 5-7 ans)',
           pt: 'Educação infantil (pré-escola, 5-7 anos)', sv: 'Förskoleklass', da: 'Børnehaveklasse',
           no: 'Barnehage (5-7 år)', fi: 'Esiopetus' },
  '6-8': { en: 'Grade 1', de: '1. Klasse', es: 'Grado 1', nl: 'Groep 3',
           it: 'Scuola primaria classe prima', fr: 'CP (cours préparatoire)',
           pt: '1º ano do ensino fundamental', sv: 'Årskurs 1', da: '1. klasse',
           no: '1. trinn', fi: '1. luokka' },
  '7-9': { en: 'Grade 2', de: '2. Klasse', es: 'Grado 2', nl: 'Groep 4',
           it: 'Scuola primaria classe seconda', fr: 'CE1 (cours élémentaire 1)',
           pt: '2º ano do ensino fundamental', sv: 'Årskurs 2', da: '2. klasse',
           no: '2. trinn', fi: '2. luokka' },
  '8-10': { en: 'Grade 3', de: '3. Klasse', es: 'Grado 3', nl: 'Groep 5',
            it: 'Scuola primaria classe terza', fr: 'CE2 (cours élémentaire 2)',
            pt: '3º ano do ensino fundamental', sv: 'Årskurs 3', da: '3. klasse',
            no: '3. trinn', fi: '3. luokka' }
};

var EDU_LEVEL_EN_BY_AGE = {
  '3-5': 'Preschool', '5-7': 'Kindergarten',
  '6-8': 'Grade 1', '7-9': 'Grade 2', '8-10': 'Grade 3'
};

function deriveEducationalLevel(ageRange, locale) {
  if (!ageRange) return { english: null, localized: null };
  var entry = EDU_LEVEL_BY_AGE[ageRange];
  if (!entry) return { english: null, localized: null };
  return {
    english: EDU_LEVEL_EN_BY_AGE[ageRange] || null,
    localized: entry[locale] || entry.en
  };
}

/** Auto-derive ageRange when missing per topics-taxonomy.json apps.<app>.default_age_range. */
function deriveDefaultAgeRange(app) {
  var node = topicsTaxonomy.apps && topicsTaxonomy.apps[app];
  return node && node.default_age_range ? node.default_age_range : '5-7';
}

/** Exercise type display name from topics-taxonomy.json. */
function deriveExerciseTypeName(typeKey, locale) {
  var et = topicsTaxonomy.axes && topicsTaxonomy.axes['exercise-type'];
  var node = et && et[typeKey];
  if (node && node.name) return String(node.name[locale] || node.name.en || titleCaseSnake(typeKey));
  return titleCaseSnake(typeKey);
}

function deriveExerciseTypeSlug(typeKey, locale) {
  var et = topicsTaxonomy.axes && topicsTaxonomy.axes['exercise-type'];
  var node = et && et[typeKey];
  if (node && node.slug) return String(node.slug[locale] || node.slug.en || typeKey);
  return typeKey;
}

/**
 * Derive variation_id (4-char hex prefix of SHA-256) from bundle content.
 * Hashes the deterministic content-bearing fields per app type.
 *
 * For each fresh roll the operator generates, this hash will differ because
 * the underlying image set / target placement / puzzle layout differs. Same
 * content → same hash (idempotent).
 */
function deriveVariationId(bundle) {
  if (!bundle) return null;
  // Universal approach: hash a deterministic content-bearing subset.
  // Per-app subset keys (in priority order; first existing key wins):
  var contentKeys = [
    'targets', 'cells', 'cutoutsData', 'holes', 'uniqueImageKeys',
    'problems', 'exercises', 'placedWordsInfo', 'words',
    'imageRefs', 'imagePlacements'
  ];
  var contentObj = {};
  contentKeys.forEach(function (k) {
    if (bundle[k] !== undefined) contentObj[k] = bundle[k];
  });
  // If no content keys found, fall back to the entire bundle minus volatile fields
  if (Object.keys(contentObj).length === 0) {
    var b2 = {};
    Object.keys(bundle).forEach(function (k) {
      if (k === 'createdAt' || k === 'attribution' || k === 'worksheetImage' ||
          k === 'bundleVersion' || k === 'schemaFormat' || k === 'loadingMode' ||
          k === 'seoMeta' || k === 'page' || k === 'gridRect' || k === 'gridDims') return;
      b2[k] = bundle[k];
    });
    contentObj = b2;
  }
  var json = JSON.stringify(contentObj);
  var hash = crypto.createHash('sha256').update(json).digest('hex');
  return hash.slice(0, 4);
}

/**
 * Derive exercise_mode for find-and-count from bundle.targets[*].taskType pattern.
 *  - All same taskType (uniform 'circle') → 'letter-spotting'
 *  - Mixed taskTypes → null (default mode)
 *  - No targets → null
 */
function deriveFindAndCountMode(bundle) {
  if (!bundle || !Array.isArray(bundle.targets) || bundle.targets.length === 0) return null;
  var taskTypes = bundle.targets.map(function (t) { return t && t.taskType; }).filter(Boolean);
  if (taskTypes.length === 0) return null;
  var unique = Array.from(new Set(taskTypes));
  if (unique.length === 1 && unique[0] === 'circle') return 'letter-spotting';
  // Other uniform variants could be classified here; default to null for mixed
  if (unique.length === 1 && unique[0] === 'count') return 'count-only';
  return null;
}

/** Title-case mode slug like 'find-addend' → 'Find Addend' (mirror build-seo-head.deriveExerciseModeName). */
function deriveExerciseModeName(rawMode) {
  if (!rawMode || typeof rawMode !== 'string') return null;
  var s = rawMode.trim();
  if (!s) return null;
  return s.split('-').map(function (w) {
    if (!w) return '';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Parse manifest.json from a ZIP. */
function readManifest(zip) {
  var entry = zip.getEntry('manifest.json');
  if (!entry) return null;
  try {
    return JSON.parse(entry.getData().toString('utf8'));
  } catch (e) { return null; }
}

/** Parse deck.html from a ZIP. */
function readDeckHtml(zip) {
  var entry = zip.getEntry('deck.html');
  if (!entry) return null;
  return entry.getData().toString('utf8');
}

/** Extract bundle JSON from deck.html. */
function extractBundle(html) {
  var m = html.match(BUNDLE_RE);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch (e) { return null; }
}

// =====================================================================
// Per-class processing
// =====================================================================

/**
 * Build the full new SEO surface block + replacement title shape with
 * variation_id segment.
 *
 * Returns { titleFull, descFull, ldJson, ogTitleEsc, ogDescEsc, ogImageAlt,
 *           ogLocale, canonicalUrl, eduLevelEnglish, eduLevelLocalized,
 *           variationId, slug }
 */
function computeNewSeoSurface(opts) {
  // opts: { manifest, bundle, app, locale, theme, ageRange, exerciseMode }
  var locale = opts.locale;
  var theme = opts.theme;
  var app = opts.app;
  var exerciseMode = opts.exerciseMode;

  var typeName = deriveExerciseTypeName(app, locale);
  var typeSlug = deriveExerciseTypeSlug(app, locale);
  var modeName = deriveExerciseModeName(exerciseMode);
  var themeName = theme ? deriveThemeName(theme, locale) : null;
  var ageRange = opts.ageRange || deriveDefaultAgeRange(app);
  var eduLevel = deriveEducationalLevel(ageRange, locale);
  var worksheetWord = WORKSHEET_WORD_BY_LOCALE[locale] || 'Worksheet';
  var freeInteractive = FREE_INTERACTIVE_BY_LOCALE[locale] || 'Free interactive';
  var forWord = FOR_WORD_BY_LOCALE[locale] || 'for';
  var printOrPlay = PRINT_OR_PLAY_BY_LOCALE[locale] || 'Print or play online';

  var variationId = deriveVariationId(opts.bundle);

  // Title shape: {Type} {Mode?} {Worksheet} — {Theme?} — {Level} — Set {variationId} | LessonCraftStudio
  var titleHead = typeName + (modeName ? ' ' + modeName : '') + ' ' + worksheetWord;
  var titleSegments = [titleHead];
  if (themeName) titleSegments.push(themeName);
  titleSegments.push(eduLevel.localized);
  if (variationId) titleSegments.push('Set ' + variationId);
  var titleCore = titleSegments.join(EM);
  var titleFull = titleCore + SUFFIX;

  // Description: same shape with variation_id appended
  var descLead = freeInteractive + ' ' + typeName + (modeName ? ' ' + modeName : '') + ' ' + worksheetWord;
  if (themeName) descLead += ' (' + themeName + ')';
  descLead += ' ' + forWord + ' ' + eduLevel.localized;
  var description = descLead + '.' + ' ' + printOrPlay + (variationId ? ' (Set ' + variationId + ').' : '.');

  // JSON-LD
  var ld = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: titleCore,
    description: description,
    learningResourceType: 'Worksheet',
    educationalLevel: eduLevel.english || 'Kindergarten',
    teaches: typeSlug,
    inLanguage: locale,
    isAccessibleForFree: true,
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://lessoncraftstudio.com' },
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    url: '__CANONICAL_URL__'
  };

  return {
    titleFull: titleFull,
    titleCore: titleCore,
    description: description,
    ldJson: JSON.stringify(ld),
    variationId: variationId,
    eduLevelEnglish: eduLevel.english,
    eduLevelLocalized: eduLevel.localized,
    typeName: typeName,
    modeName: modeName,
    themeName: themeName
  };
}

/**
 * Build full SEO insertion block (markers + content + 14 OG tags).
 * Used for Class C decks (missing-pieces, odd-one-out) that have NO existing markers.
 */
function buildFullSeoBlock(seo) {
  return [
    SEO_MARKER_START,
    '<title>' + escapeHtml(seo.titleFull) + '</title>',
    '<meta name="description" content="' + escapeAttr(seo.description) + '">',
    '<link rel="canonical" href="__CANONICAL_URL__">',
    '<script type="application/ld+json">' + seo.ldJson + '<\/script>',
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
    SEO_MARKER_END
  ].join('\n');
}

/**
 * Class A/B fix: post-Phase-3a.2 deck.html — has SEO markers; just replace
 * title + meta description + JSON-LD.
 */
function applyClassAB(html, seo) {
  // Replace within marker block
  var newSeoBlock = buildFullSeoBlock(seo);
  if (SEO_BLOCK_RE.test(html)) {
    html = html.replace(SEO_BLOCK_RE, newSeoBlock);
  } else {
    // No marker block — fall through to insert before </head>
    html = html.replace(/<\/head>/i, newSeoBlock + '\n</head>');
  }
  return html;
}

/**
 * Class C fix: pre-Phase-3a.2 deck.html — strip pre-existing SEO elements
 * outside markers + inject markers + flip celebration h1→h2.
 */
function applyClassC(html, seo) {
  // 1. Strip pre-existing SEO elements (title, meta description, link canonical, OG/Twitter, ld+json)
  html = html.replace(/<title>[^<]*<\/title>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  // 2. Inject SEO block before </head>
  var newSeoBlock = buildFullSeoBlock(seo);
  html = html.replace(/<\/head>/i, newSeoBlock + '\n</head>');

  // 3. Flip celebration h1 → h2 (both raw and JS-string-escaped variants)
  html = html.replace(/<h1(\s[^>]*class="[^"]*lcs-celebration__title[^"]*"[^>]*)>/g, '<h2$1>');
  html = html.replace(/<h1(\s[^>]*class=\\"[^"]*lcs-celebration__title[^"]*\\"[^>]*)>/g, '<h2$1>');
  // Close tags: best-effort using line-context (within JS string template lines that include lcs-celebration)
  html = html.replace(/(\blcs-celebration[^"\\]*[\\"]*[\s\S]{0,800}?)<\/h1>/g, '$1</h2>');
  html = html.replace(/(\blcs-celebration[^"\\]*[\\"]*[\s\S]{0,800}?)<\/h1>"/g, '$1</h2>"');

  return html;
}

// =====================================================================
// Per-ZIP classification + apply
// =====================================================================

function classifyZip(zipPath) {
  var zip;
  try {
    zip = new AdmZip(zipPath);
  } catch (e) {
    return { action: 'halt-zip-error', note: e.message };
  }
  var manifest = readManifest(zip);
  var html = readDeckHtml(zip);
  if (!manifest) return { action: 'halt-no-manifest' };
  if (!html) return { action: 'halt-no-deck-html' };
  var bundle = extractBundle(html);
  if (!bundle) return { action: 'halt-no-bundle' };

  var app = manifest.exercise_type || bundle.appType;
  var locale = (manifest.language || bundle.contentLanguage || 'en').slice(0, 2);
  var theme = manifest.theme;
  var ageRange = manifest.age_range;
  var exerciseMode = manifest.exercise_mode;

  // Class D: sudoku with completely empty bundle content (no images_used + no usable bundle)
  // Distinguishes "sudoku-hard with generation defect" from regular sudoku (which has
  // bundle.uniqueImageKeys + bundle.holes populated even though manifest.exercises is empty).
  var imagesUsedEmpty = !manifest.images_used || (Array.isArray(manifest.images_used) && manifest.images_used.length === 0);
  var bundleHasContent = bundle && (
    (Array.isArray(bundle.uniqueImageKeys) && bundle.uniqueImageKeys.length > 0) ||
    (Array.isArray(bundle.holes) && bundle.holes.length > 0) ||
    (Array.isArray(bundle.targets) && bundle.targets.length > 0) ||
    (Array.isArray(bundle.cells) && bundle.cells.length > 0) ||
    (Array.isArray(bundle.problems) && bundle.problems.length > 0) ||
    (Array.isArray(bundle.cutoutsData) && bundle.cutoutsData.length > 0) ||
    (Array.isArray(bundle.placedWordsInfo) && bundle.placedWordsInfo.length > 0) ||
    (Array.isArray(bundle.imageRefs) && bundle.imageRefs.length > 0)
  );
  if (imagesUsedEmpty && !bundleHasContent) {
    return { action: 'halt-empty-bundle', app: app };
  }

  // Class B: find-and-count + null exercise_mode → derive from taskType
  if (app === 'find-and-count' && !exerciseMode) {
    exerciseMode = deriveFindAndCountMode(bundle);
  }

  // Class C indicator: deck.html has no SEO_INSERTION_POINT markers
  var hasMarkers = html.indexOf(SEO_MARKER_START) !== -1;

  return {
    action: hasMarkers ? 'rewrite-class-AB' : 'rewrite-class-C',
    app: app, locale: locale, theme: theme,
    ageRange: ageRange, exerciseMode: exerciseMode,
    bundle: bundle, manifest: manifest, html: html, zip: zip
  };
}

function applyZip(zipPath, classified, opts) {
  var seo = computeNewSeoSurface({
    manifest: classified.manifest,
    bundle: classified.bundle,
    app: classified.app,
    locale: classified.locale,
    theme: classified.theme,
    ageRange: classified.ageRange,
    exerciseMode: classified.exerciseMode
  });

  var html = classified.html;
  if (classified.action === 'rewrite-class-AB') {
    html = applyClassAB(html, seo);
  } else {
    html = applyClassC(html, seo);
  }

  // Update manifest: variation_id + exercise_mode (if find-and-count derived) + age_range fallback
  var manifest = JSON.parse(JSON.stringify(classified.manifest));
  manifest.variation_id = seo.variationId;
  if (classified.app === 'find-and-count' && classified.exerciseMode && !classified.manifest.exercise_mode) {
    manifest.exercise_mode = classified.exerciseMode;
  }
  if (!manifest.age_range) {
    manifest.age_range = classified.ageRange || deriveDefaultAgeRange(classified.app);
  }

  if (opts.dryRun) return { variationId: seo.variationId, mode: classified.exerciseMode };

  // Atomic re-zip via temp + rename
  var zip = classified.zip;
  zip.deleteFile('manifest.json');
  zip.deleteFile('deck.html');
  zip.addFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));
  zip.addFile('deck.html', Buffer.from(html, 'utf8'));
  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);

  return { variationId: seo.variationId, mode: classified.exerciseMode };
}

// =====================================================================
// CLI
// =====================================================================

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.indexOf('--dry-run') !== -1;
  var workdir = args.filter(function (a) { return !a.startsWith('--'); })[0];
  if (!workdir) {
    console.error('Usage: node rewrite-deck-html-full-seo-retrofit.js <directory> [--dry-run]');
    process.exit(1);
  }
  if (!fs.existsSync(workdir)) {
    console.error('Directory not found: ' + workdir);
    process.exit(1);
  }

  var zips = fs.readdirSync(workdir).filter(function (n) { return n.endsWith('.zip'); }).sort();
  console.error('rewrite-deck-html-full-seo-retrofit.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.error('  working dir: ' + path.resolve(workdir));
  console.error('  zip count:   ' + zips.length);
  console.error('');

  // Phase 1: classify all
  var classifications = {};
  zips.forEach(function (zipName) {
    var p = path.join(workdir, zipName);
    classifications[zipName] = classifyZip(p);
  });

  // Categorize
  var counts = {};
  Object.keys(classifications).forEach(function (z) {
    var a = classifications[z].action;
    counts[a] = (counts[a] || 0) + 1;
  });

  console.error('=== Classification ===');
  Object.keys(counts).sort().forEach(function (k) {
    console.error('  ' + k.padEnd(40) + ' : ' + counts[k]);
  });
  console.error('');

  // Sample first 5
  console.error('=== Sample 5 ZIPs ===');
  zips.slice(0, 5).forEach(function (z) {
    var c = classifications[z];
    console.error('  ' + z + ': action=' + c.action + ' app=' + (c.app || '?') + ' theme=' + (c.theme || '?') + ' mode=' + (c.exerciseMode || 'null'));
  });
  console.error('');

  // Halt if any halt-class
  var halts = Object.keys(classifications).filter(function (z) { return classifications[z].action.startsWith('halt-'); });
  if (halts.length > 0) {
    console.error('=== HALTS (' + halts.length + ') ===');
    halts.slice(0, 10).forEach(function (z) {
      console.error('  ' + z + ': ' + classifications[z].action + (classifications[z].note ? ' (' + classifications[z].note + ')' : ''));
    });
    if (!dryRun && halts.length === zips.length) {
      console.error('All ZIPs in halt-class; aborting.');
      process.exit(1);
    }
  }

  if (dryRun) {
    console.error('DRY-RUN clean. Re-run without --dry-run to apply.');
    process.exit(0);
  }

  // Phase 2: backup + apply
  var backupDir = workdir.replace(/[\\\/]+$/, '') + '.original';
  if (!fs.existsSync(backupDir)) {
    console.error('Creating backup at: ' + backupDir);
    fs.mkdirSync(backupDir, { recursive: true });
    zips.forEach(function (zipName) {
      var src = path.join(workdir, zipName);
      var dst = path.join(backupDir, zipName);
      if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
    });
  } else {
    console.error('Backup already exists at: ' + backupDir + ' (re-using)');
  }

  console.error('=== Applying ===');
  var rewritten = 0;
  var skippedHalts = 0;
  zips.forEach(function (zipName, i) {
    var c = classifications[zipName];
    if (c.action.startsWith('halt-')) {
      skippedHalts++;
      return;
    }
    var p = path.join(workdir, zipName);
    try {
      applyZip(p, c, { dryRun: false });
      rewritten++;
      if (rewritten % 50 === 0) console.error('  ' + rewritten + '/' + zips.length + ' rewritten');
    } catch (e) {
      console.error('  ERROR ' + zipName + ': ' + e.message);
      skippedHalts++;
    }
  });

  console.error('');
  console.error('=== APPLY complete ===');
  console.error('  rewritten:     ' + rewritten);
  console.error('  halt-skipped:  ' + skippedHalts);
  console.error('  backup at:     ' + backupDir);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyZip: classifyZip,
  applyZip: applyZip,
  computeNewSeoSurface: computeNewSeoSurface,
  deriveVariationId: deriveVariationId,
  deriveFindAndCountMode: deriveFindAndCountMode
};
