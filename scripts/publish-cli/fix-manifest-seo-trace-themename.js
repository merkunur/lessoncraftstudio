/**
 * Post-republish manifest hygiene fix: updates manifest.seo_trace.title.themeName
 * + manifest.seo_trace.description.themeName whenever the value is a raw
 * axis-key (snake_case) — replaces with the locale-localized theme name from
 * topics-taxonomy.json. The seo_trace was set at app gen-time before the
 * authoring side knew the localized name; republish-seo regenerated the
 * rendered HTML correctly but doesn't touch the manifest meta-record.
 *
 * Predicate-calibration backstop in seo-reconciliation.js (lines 567-589)
 * fires LOCALE_RESIDUE_DETECTED on themeName.value matching /^[a-z0-9_]{2,}$/
 * (raw axis-key shape). Updating to the localized name closes the audit's
 * LOCALE_RESIDUE_TRACE_HYGIENE flag.
 *
 * Usage:
 *   node scripts/publish-cli/fix-manifest-seo-trace-themename.js --locales=es,pt --dry-run
 *   node scripts/publish-cli/fix-manifest-seo-trace-themename.js --locales=es,pt --confirm
 */

'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';

function parseArgs(argv) {
  var out = { locales: ['es', 'pt'], decksRoot: DEFAULT_DECKS_DIR, dryRun: false, confirm: false };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',');
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
  });
  if (!out.dryRun && !out.confirm) { console.error('USAGE: --dry-run or --confirm required'); process.exit(2); }
  return out;
}

function isAxisKeyShape(v) {
  return typeof v === 'string' && /^[a-z0-9_]{2,}$/.test(v);
}

function loadTaxonomy() {
  var p = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function localizedThemeName(taxonomy, axisKey, locale) {
  var entry = taxonomy && taxonomy.axes && taxonomy.axes.theme && taxonomy.axes.theme[axisKey];
  if (!entry || !entry.name) return null;
  return entry.name[locale] || entry.name.en || null;
}

function walk(decksRoot, locale) {
  var localeDir = path.join(decksRoot, locale);
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
      slug: n.replace(/-v\d+$/, ''),
      manifestPath: path.join(localeDir, n, 'manifest.json')
    };
  });
}

function main() {
  var args = parseArgs(process.argv);
  var taxonomy = loadTaxonomy();
  console.log('[fix-trace-themename] taxonomy loaded; ' + Object.keys(taxonomy.axes.theme).length + ' theme axes');

  var planned = 0;
  var skipped = 0;
  var unparseable = 0;
  var applied = 0;
  var failed = 0;
  var sample = [];

  args.locales.forEach(function (locale) {
    var entries = walk(args.decksRoot, locale);
    console.log('[fix-trace-themename] ' + locale + ': ' + entries.length + ' versioned dirs');

    entries.forEach(function (e) {
      var raw;
      try { raw = JSON.parse(fs.readFileSync(e.manifestPath, 'utf8')); }
      catch (err) { unparseable++; return; }

      var trace = raw.seo_trace;
      if (!trace) return;

      var changed = false;

      ['title', 'description'].forEach(function (section) {
        var s = trace[section];
        if (!s) return;
        var t = s.themeName;
        if (!t || t.value == null) return;
        if (!isAxisKeyShape(t.value)) return;
        var localized = localizedThemeName(taxonomy, t.value, locale);
        if (!localized) return;
        // Update in place.
        t.value = localized;
        t.source = 'taxonomy.axes.theme.<key>.name.' + locale + ' (retrofit)';
        t.isLocalized = true;
        changed = true;
      });

      if (changed) {
        planned++;
        if (sample.length < 5) sample.push({ locale: locale, slug: e.slug });
        if (!args.dryRun) {
          try {
            var tmp = e.manifestPath + '.new';
            fs.writeFileSync(tmp, JSON.stringify(raw, null, 2));
            fs.renameSync(tmp, e.manifestPath);
            applied++;
          } catch (err) {
            failed++;
            console.error('  WRITE-FAIL ' + locale + '/' + e.slug + ': ' + err.message);
          }
        }
      } else {
        skipped++;
      }
    });
  });

  console.log('[fix-trace-themename] planned: ' + planned + ', skipped: ' + skipped + ', unparseable: ' + unparseable);
  if (sample.length) {
    console.log('[fix-trace-themename] sample affected:');
    sample.forEach(function (s) { console.log('  ' + s.locale + '/' + s.slug); });
  }
  if (args.dryRun) {
    console.log('[fix-trace-themename] DRY-RUN — no writes.');
  } else {
    console.log('[fix-trace-themename] applied: ' + applied + ', failed: ' + failed);
  }
}

main();
