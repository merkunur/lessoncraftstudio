/**
 * Regenerate og-image.png for every published deck — Phase 5.2 SEO-thumbnail
 * commission (2026-05-19).
 *
 * Walks /var/www/lcs-media/decks/<locale>/<slug>/ for the requested locales,
 * reads existing thumbnail.png + manifest, calls og-image.derive() with the
 * Phase 2 two-column composite + Phase 3 XMP embed, writes the new
 * og-image.png atomically (temp + rename).
 *
 * Sequential to bound memory at ~one image in flight. Estimate: ~300ms/deck
 * Sharp composite + SVG render + XMP embed. 9191 decks → ~45 min wall-clock.
 *
 * Idempotent — re-running re-derives from current thumbnail + manifest.
 *
 * Reads localized theme + level names from topics-taxonomy.json so the
 * right-column subhead shows e.g. "Animales — Jardín de infancia" on es decks.
 *
 * Usage:
 *   node scripts/publish-cli/regenerate-og-images.js --locales=en,es,pt
 *   node scripts/publish-cli/regenerate-og-images.js --locales=en --sample=10  (spot-check; first 10 per locale)
 *   node scripts/publish-cli/regenerate-og-images.js --dry-run  (no FS writes; reports counts)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var ogImage = require('./og-image');
var ogImageXmp = require('./og-image-xmp');
var taxonomy = require('./taxonomy');
var i18n = require('./i18n');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';

function parseArgs(argv) {
  var out = {
    locales: ['en', 'es', 'pt'],
    decksRoot: DEFAULT_DECKS_DIR,
    sample: 0,
    dryRun: false,
    landingLocale: null
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10) || 0;
    else if (a.indexOf('--landing-locale=') === 0) out.landingLocale = a.slice('--landing-locale='.length) || null;
    else if (a === '--dry-run') out.dryRun = true;
  });
  if (out.landingLocale) out.locales = [out.landingLocale];
  return out;
}

// Landing-aware mode (--landing-locale): source title + honest grade label from the
// landing entry (frontend/content/seo-landing/<loc>.json) instead of deck.html title
// + age_range-derived level. Fixes the SERP-thumbnail level/title to match the
// landing's honest re-graded/spanned grade (e.g. es "Preescolar (5 años)–Primer
// grado", not the age_range "Kínder"). Only landed slugs are regenerated.
var LANDING_LEVELS = {
  es: { 'preescolar': 'Preescolar (5 años)', 'primer-grado': 'Primer grado', 'segundo-grado': 'Segundo grado' }
};
function landingLevelName(locale, l) {
  var map = LANDING_LEVELS[locale] || {};
  var keys = (l.levels && l.levels.length) ? l.levels : [l.coordinate && l.coordinate.level];
  var labels = keys.map(function (k) { return map[k]; }).filter(Boolean);
  if (!labels.length) return null;
  return labels.length > 1 ? labels[0] + '–' + labels[labels.length - 1] : labels[0];
}
function loadLandingMap(locale) {
  var p = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', locale + '.json');
  var data = JSON.parse(fs.readFileSync(p, 'utf8'));
  var map = {};
  (data.landings || []).forEach(function (l) {
    map[l.slug] = { title: l.title || l.h1 || null, levelName: landingLevelName(locale, l), metaDescription: l.metaDescription || null };
  });
  return map;
}

function walkDecks(rootDir, locale) {
  var localeDir = path.join(rootDir, locale);
  if (!fs.existsSync(localeDir)) return [];
  var entries = fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(localeDir, n);
    var stat;
    try { stat = fs.lstatSync(p); } catch (e) { return false; }
    return stat.isDirectory() && /-v\d+$/.test(n);
  });
  return entries.map(function (n) {
    return {
      versionDirName: n,
      slug: n.replace(/-v\d+$/, ''),
      versionDir: path.join(localeDir, n)
    };
  });
}

function pickLocale(obj, locale) {
  if (!obj || typeof obj !== 'object') return null;
  return obj[locale] || obj.en || null;
}

function deriveContext(manifest, locale) {
  var title = null;
  var description = null;
  var themeName = null;
  var levelName = null;
  var exerciseTypeName = null;

  // Localized theme name via taxonomy.
  if (manifest && manifest.theme) {
    try {
      var th = taxonomy.themeFor(manifest.theme, locale);
      if (th && th.name) themeName = th.name;
    } catch (e) { /* swallow */ }
  }

  // Localized level name via taxonomy.
  var ageRange = manifest && (manifest.age_range || manifest.ageRange);
  if (ageRange) {
    try {
      var lv = taxonomy.levelFor(ageRange, locale);
      if (lv && lv.name) levelName = lv.name;
    } catch (e) { /* swallow */ }
  }

  // Localized exercise-type name (for keywords + XMP subject).
  var appName = manifest && manifest.generator && manifest.generator.app;
  if (appName) {
    try {
      var et = taxonomy.exerciseTypeFor(appName, locale);
      if (et && et.name) exerciseTypeName = et.name;
    } catch (e) { /* swallow */ }
  }

  return {
    title: title,
    description: description,
    themeName: themeName,
    levelName: levelName,
    exerciseTypeName: exerciseTypeName,
    locale: locale
  };
}

function extractTitleFromDeckHtml(versionDir) {
  // The deck.html title is the canonical SEO-rendered title (post-republish-seo).
  // Read from disk + strip the brand suffix via og-image-text's helper.
  var htmlPath = path.join(versionDir, 'deck.html');
  try {
    var html = fs.readFileSync(htmlPath, 'utf8');
    var m = /<title>([\s\S]*?)<\/title>/i.exec(html);
    if (m) return m[1].trim();
  } catch (e) { /* swallow */ }
  return null;
}

function extractDescriptionFromDeckHtml(versionDir) {
  var htmlPath = path.join(versionDir, 'deck.html');
  try {
    var html = fs.readFileSync(htmlPath, 'utf8');
    var m = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(html);
    if (m) return m[1].trim();
  } catch (e) { /* swallow */ }
  return null;
}

async function processOneDeck(rootDir, locale, entry, landingMap) {
  var versionDir = entry.versionDir;
  var slug = entry.slug;

  var thumbnailPath = path.join(versionDir, 'thumbnail.png');
  var manifestPath = path.join(versionDir, 'manifest.json');
  var ogImagePath = path.join(versionDir, 'og-image.png');

  if (!fs.existsSync(thumbnailPath)) {
    return { ok: false, slug: slug, reason: 'no thumbnail.png' };
  }
  if (!fs.existsSync(manifestPath)) {
    return { ok: false, slug: slug, reason: 'no manifest.json' };
  }

  var thumbnailBuffer = fs.readFileSync(thumbnailPath);
  var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  var ctx = deriveContext(manifest, locale);
  // Title + description sourced from rendered deck.html (post-republish-seo
  // canonical state); this guarantees XMP packet matches what Google sees.
  var title = extractTitleFromDeckHtml(versionDir);
  var description = extractDescriptionFromDeckHtml(versionDir);
  var levelName = ctx.levelName;

  // Landing-aware override: for landed decks, the SERP-thumbnail title + level must
  // match the LANDING's honest grade (not the deck.html title / age_range level).
  if (landingMap && landingMap[slug]) {
    if (landingMap[slug].title) title = landingMap[slug].title;
    if (landingMap[slug].levelName) levelName = landingMap[slug].levelName;
    if (landingMap[slug].metaDescription) description = landingMap[slug].metaDescription;
  }

  // Build XMP packet.
  var xmpPacket = ogImageXmp.buildXmpPacket({
    title: title,
    description: description,
    exerciseType: ctx.exerciseTypeName,
    themeName: ctx.themeName,
    levelName: levelName,
    locale: locale
  });

  // Derive og-image with two-column composite + XMP embed.
  var ogBuffer = await ogImage.derive(thumbnailBuffer, {
    title: title,
    themeName: ctx.themeName,
    levelName: levelName,
    locale: locale,
    xmpPacket: xmpPacket
  });

  // Atomic write.
  var tmpPath = ogImagePath + '.new';
  fs.writeFileSync(tmpPath, ogBuffer);
  fs.renameSync(tmpPath, ogImagePath);

  return { ok: true, slug: slug, size: ogBuffer.length };
}

async function main() {
  var args = parseArgs(process.argv);
  var t0 = Date.now();
  console.log('[regen-og] locales=' + args.locales.join(',') + ' decksRoot=' + args.decksRoot + (args.dryRun ? ' (dry-run)' : '') + (args.sample ? ' sample=' + args.sample : ''));

  var totalOk = 0;
  var totalFail = 0;
  var failures = [];

  for (var li = 0; li < args.locales.length; li++) {
    var loc = args.locales[li];
    var entries = walkDecks(args.decksRoot, loc);
    var landingMap = null;
    if (args.landingLocale) {
      landingMap = loadLandingMap(loc);
      entries = entries.filter(function (e) { return landingMap[e.slug]; });
      console.log('[regen-og] ' + loc + ': landing-aware mode — ' + Object.keys(landingMap).length + ' landings, ' + entries.length + ' matched decks');
    }
    if (args.sample) entries = entries.slice(0, args.sample);
    if (!args.landingLocale) console.log('[regen-og] ' + loc + ': ' + entries.length + ' decks');

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (args.dryRun) { totalOk++; continue; }
      try {
        var result = await processOneDeck(args.decksRoot, loc, entry, landingMap);
        if (result.ok) {
          totalOk++;
        } else {
          totalFail++;
          failures.push({ locale: loc, slug: result.slug, reason: result.reason });
        }
      } catch (e) {
        totalFail++;
        failures.push({ locale: loc, slug: entry.slug, reason: e.message });
      }
      if ((i + 1) % 200 === 0) {
        var elapsed = ((Date.now() - t0) / 1000).toFixed(1);
        console.log('[regen-og] ' + loc + ' progress ' + (i + 1) + '/' + entries.length + ' (' + elapsed + 's elapsed)');
      }
    }
  }

  var elapsedTotal = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('[regen-og] done — ok: ' + totalOk + ', failed: ' + totalFail + ' in ' + elapsedTotal + 's');
  if (failures.length > 0 && failures.length <= 20) {
    console.log('[regen-og] failures:');
    failures.forEach(function (f) { console.log('  ' + f.locale + '/' + f.slug + ': ' + f.reason); });
  } else if (failures.length > 20) {
    console.log('[regen-og] first 10 failures:');
    failures.slice(0, 10).forEach(function (f) { console.log('  ' + f.locale + '/' + f.slug + ': ' + f.reason); });
  }
}

main().catch(function (err) {
  console.error('[regen-og] FATAL:', err && err.stack || err);
  process.exit(1);
});
