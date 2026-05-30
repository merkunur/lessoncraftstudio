#!/usr/bin/env node
/**
 * SEO Remediation Part 2B retrofit (audit P5-01 + P5-04): inject the
 * deck→topic end-links section + a BreadcrumbList JSON-LD into already-published
 * deck.html files.
 *
 * Why: the 29 apps call buildEndDeckLinks() with no args (returns ''), so the
 * <aside class="lcs-end-deck"> topic-links block was never emitted — published
 * decks link deck→deck (suggestion strip) but never deck→topic. The forward fix
 * (catalog-export.js autoInjectEndDeckLinks) makes NEW publishes correct; this
 * script retrofits the ~16k existing decks.
 *
 * Per CLAUDE.md §15.17 salvage pattern + §17.8.16 atomic rewrite. Architecturally
 * a sibling of inject-deck-end-strip.js (same symlink walk / atomic .tmp+rename /
 * idempotency / per-locale summary). NO DB dependency: link resolution consumes
 * taxonomy.js + i18n.js directly (same SoT as substitute.js:179-253), so the
 * substitute.js publish path is left UNTOUCHED.
 *
 * On-disk manifest.json is generation.json-shaped (no age_range). The level is
 * read from the deck's own JSON-LD "educationalLevel" (accurate), falling back to
 * taxonomy.appConfig(app).default_age_range.
 *
 * Usage:
 *   node scripts/publish-cli/inject-deck-end-topic-links.js [--dry-run] [--locale=<code>] [--limit=<N>] [--rewrite]
 *
 * Exit: 0 = all processed (skip-or-success); 1 = any deck failed.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var taxonomy = require('./taxonomy');
var i18n = require('./i18n');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
var CANONICAL_BASE = 'https://www.lessoncraftstudio.com';

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var REWRITE = argv.includes('--rewrite');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;

// Insertion anchors / markers.
var ASIDE_CLASS = 'class="lcs-end-deck"';
var SUGGEST_ANCHOR = '<section class="lcs-deckend-suggestions"';
var CELEBRATION_ANCHOR = '<div class="lcs-celebration"';
var BC_START = '<!--LCS_BC_START-->';
var BC_END = '<!--LCS_BC_END-->';

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(s) { return escapeHtml(s); }

// Build English-level → age_range inverse (e.g. "Kindergarten" -> "5-7").
var EN_LEVEL_TO_AGE = {};
try {
  var m = taxonomy.AGE_RANGE_TO_LEVEL_EN || {};
  Object.keys(m).forEach(function (age) { EN_LEVEL_TO_AGE[String(m[age]).toLowerCase()] = age; });
} catch (e) { /* defensive: leave empty, fall back to app default */ }

// Parse the deck's rendered educationalLevel (English) from its JSON-LD.
function ageRangeFromDeckHtml(deckHtml) {
  var mt = /"educationalLevel"\s*:\s*"([^"]+)"/.exec(deckHtml);
  if (mt && mt[1]) {
    var age = EN_LEVEL_TO_AGE[mt[1].toLowerCase()];
    if (age) return age;
  }
  return null;
}

function deckTitleFromHtml(deckHtml) {
  var mt = /<title>([^<]+)<\/title>/.exec(deckHtml);
  if (!mt) return null;
  var t = mt[1].replace(/\s*\|\s*LessonCraftStudio\s*$/i, '').trim();
  return t || null;
}

// Resolve the end-deck links + breadcrumb data for one deck, mirroring
// substitute.js:179-253 (same taxonomy + i18n SoT). Returns null on a hard
// error (no usable type link).
function resolveDeck(manifest, deckHtml) {
  var locale = manifest.language;
  var app = manifest.generator && manifest.generator.app;
  if (!locale || !app) return null;

  // Type axis (always required — drop the whole deck if it can't resolve).
  var typeAxis;
  try { typeAxis = taxonomy.exerciseTypeFor(app, locale); } catch (e) { typeAxis = null; }
  if (!typeAxis || !typeAxis.slug) return null;

  // Age range: prefer the deck's own rendered level, else app default.
  var ageRange = ageRangeFromDeckHtml(deckHtml);
  if (!ageRange) {
    try { ageRange = taxonomy.appConfig(app).default_age_range; } catch (e) { ageRange = null; }
  }

  // Theme axis (conditional: null or compound -vs- is skipped).
  var theme = manifest.theme;
  var themeIsCompound = (typeof theme === 'string' && theme.indexOf('-vs-') !== -1);
  var themeAxis = null;
  if (theme && !themeIsCompound) {
    try { themeAxis = taxonomy.themeFor(theme, locale); } catch (e) { themeAxis = null; }
  }

  // Level axis (conditional on a resolvable age range).
  var levelAxis = null;
  if (ageRange) {
    try { levelAxis = taxonomy.levelFor(ageRange, locale); } catch (e) { levelAxis = null; }
  }

  var heading = i18n.resolve(locale, 'endDeck.heading', 'Want more?').value;

  var links = [];
  var typeName = typeAxis.name || typeAxis.slug || manifest.exercise_type;
  links.push({
    href: '/' + locale + '/topic/' + typeAxis.slug + '/',
    text: i18n.interpolate(i18n.resolve(locale, 'endDeck.moreType', 'More {type} worksheets').value, { type: typeName }),
  });
  if (themeAxis && themeAxis.slug) {
    var themeName = themeAxis.name || themeAxis.slug || theme;
    links.push({
      href: '/' + locale + '/topic/' + themeAxis.slug + '/',
      text: i18n.interpolate(i18n.resolve(locale, 'endDeck.moreTheme', 'More {theme}-themed worksheets').value, { theme: themeName }),
    });
  }
  if (levelAxis && levelAxis.slug) {
    var levelName = levelAxis.name || levelAxis.slug;
    links.push({
      href: '/' + locale + '/topic/' + levelAxis.slug + '/',
      text: i18n.interpolate(i18n.resolve(locale, 'endDeck.moreLevel', 'More worksheets for {level}').value, { level: levelName }),
    });
  }
  links.push({
    href: '/' + locale + '/',
    text: i18n.resolve(locale, 'endDeck.browseAll', 'Browse all worksheets').value,
  });

  return {
    locale: locale,
    heading: heading,
    links: links,
    typeAxis: typeAxis,
    typeName: typeName,
    deckTitle: deckTitleFromHtml(deckHtml),
  };
}

function buildAside(resolved) {
  var lis = resolved.links.map(function (l) {
    return '    <li><a href="' + escapeAttr(l.href) + '">' + escapeHtml(l.text) + '</a></li>';
  }).join('\n');
  return [
    '<aside class="lcs-end-deck">',
    '  <div class="end-deck-links">',
    '    <h2>' + escapeHtml(resolved.heading) + '</h2>',
    '    <ul>',
    lis,
    '    </ul>',
    '  </div>',
    '</aside>',
    ''
  ].join('\n');
}

function buildBreadcrumbScript(resolved) {
  var homeLabel = i18n.resolve(resolved.locale, 'topicPage.breadcrumb.home', 'Home').value;
  var items = [
    { '@type': 'ListItem', position: 1, name: homeLabel, item: CANONICAL_BASE + '/' + resolved.locale + '/' },
    { '@type': 'ListItem', position: 2, name: resolved.typeName, item: CANONICAL_BASE + '/' + resolved.locale + '/topic/' + resolved.typeAxis.slug + '/' },
  ];
  if (resolved.deckTitle) {
    items.push({ '@type': 'ListItem', position: 3, name: resolved.deckTitle });
  }
  var jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
  return BC_START + '<script type="application/ld+json">' + JSON.stringify(jsonld) + '</script>' + BC_END;
}

// Returns { changed, content } | { alreadyApplied } | { error }.
function injectIntoDeckHtml(content, manifest) {
  var resolved = resolveDeck(manifest, content);
  if (!resolved) return { error: 'could not resolve type axis (app/locale/taxonomy)' };

  var hasAside = content.indexOf(ASIDE_CLASS) !== -1;
  var hasBc = content.indexOf('"BreadcrumbList"') !== -1 || content.indexOf(BC_START) !== -1;

  if (REWRITE) {
    // Strip prior injections so we can re-emit with current logic.
    content = content.replace(/<aside class="lcs-end-deck">[\s\S]*?<\/aside>\n?/, '');
    content = content.replace(new RegExp(BC_START + '[\\s\\S]*?' + BC_END, 'g'), '');
    hasAside = false; hasBc = false;
  }

  if (hasAside && hasBc) return { alreadyApplied: true };

  // 1. Inject the end-deck aside (if missing) before the suggestion strip,
  //    else before the celebration modal.
  if (!hasAside) {
    var aside = buildAside(resolved);
    var idx = content.indexOf(SUGGEST_ANCHOR);
    if (idx === -1) idx = content.indexOf(CELEBRATION_ANCHOR);
    if (idx === -1) return { error: 'no suggestion/celebration anchor for aside insertion' };
    content = content.slice(0, idx) + aside + content.slice(idx);
  }

  // 2. Inject the BreadcrumbList JSON-LD (if missing) before </head>.
  if (!hasBc) {
    var headClose = content.indexOf('</head>');
    if (headClose === -1) return { error: 'no </head> for breadcrumb insertion' };
    var bc = buildBreadcrumbScript(resolved) + '\n';
    content = content.slice(0, headClose) + bc + content.slice(headClose);
  }

  return { changed: true, content: content };
}

function atomicWrite(filePath, content) {
  var tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, filePath);
}

function processDeck(locale, slug) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var symlinkPath = path.join(localeDir, slug);
  var stat;
  try { stat = fs.lstatSync(symlinkPath); } catch (e) { return { ok: false, error: 'lstat: ' + e.message }; }
  if (!stat.isSymbolicLink()) return { ok: false, error: 'not a symlink (skipped)' };
  var target = fs.readlinkSync(symlinkPath);
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var deckHtmlPath = path.join(targetDir, 'deck.html');
  var manifestPath = path.join(targetDir, 'manifest.json');
  if (!fs.existsSync(deckHtmlPath)) return { ok: false, error: 'deck.html missing' };
  if (!fs.existsSync(manifestPath)) return { ok: false, error: 'manifest.json missing' };

  var content = fs.readFileSync(deckHtmlPath, 'utf8');
  var manifest;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
  catch (e) { return { ok: false, error: 'manifest parse: ' + e.message }; }

  var result = injectIntoDeckHtml(content, manifest);
  if (result.error) return { ok: false, error: result.error };
  if (result.alreadyApplied) return { ok: true, alreadyApplied: true };
  if (result.changed) {
    if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
    return { ok: true, applied: true };
  }
  return { ok: false, error: 'unexpected result shape' };
}

function main() {
  console.log('=== inject-deck-end-topic-links ===');
  console.log('mode:   ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + (REWRITE ? ' (rewrite=ON)' : ''));
  console.log('locale: ' + (TARGET_LOCALE || 'all 11'));
  console.log('limit:  ' + (TARGET_LIMIT === Infinity ? 'no limit' : TARGET_LIMIT));
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var totalProcessed = 0, totalApplied = 0, totalAlready = 0, totalFailed = 0;
  var failures = [];
  var perLocale = {};

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) continue;
    var slugs = fs.readdirSync(localeDir).filter(function (name) {
      if (name.startsWith('.')) return false;
      return !/-v\d+$/.test(name);
    });
    perLocale[locale] = { total: slugs.length, applied: 0, already: 0, failed: 0 };
    console.log('[' + locale + '] ' + slugs.length + ' deck symlinks');
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      var slug = slugs[si];
      totalProcessed++;
      try {
        var r = processDeck(locale, slug);
        if (!r.ok) { totalFailed++; perLocale[locale].failed++; failures.push(locale + '/' + slug + ': ' + r.error); }
        else if (r.alreadyApplied) { totalAlready++; perLocale[locale].already++; }
        else { totalApplied++; perLocale[locale].applied++; }
      } catch (e) {
        totalFailed++; perLocale[locale].failed++; failures.push(locale + '/' + slug + ': ' + e.message);
      }
    }
    if (totalProcessed >= TARGET_LIMIT) break;
  }

  console.log('');
  console.log('=== summary ===');
  console.log('  processed:       ' + totalProcessed);
  console.log('  applied:         ' + totalApplied);
  console.log('  already-applied: ' + totalAlready);
  console.log('  failed:          ' + totalFailed);
  console.log('');
  console.log('=== per-locale ===');
  Object.keys(perLocale).forEach(function (loc) {
    var s = perLocale[loc];
    console.log('  ' + loc + ':  total=' + s.total + ' applied=' + s.applied + ' already=' + s.already + ' failed=' + s.failed);
  });
  if (failures.length > 0) {
    console.log('');
    console.log('=== failures (first 40) ===');
    failures.slice(0, 40).forEach(function (f) { console.log('  - ' + f); });
    console.log('  (' + failures.length + ' total failures)');
  }
  process.exit(failures.length > 0 ? 1 : 0);
}

main();
