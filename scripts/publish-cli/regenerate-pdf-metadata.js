/**
 * Regenerate PDF /Info metadata + canonical-URL link annotation for every
 * published deck — retrofit pass for the PDF-SEO commission 2026-05-27.
 *
 * Walks /var/www/lcs-media/decks/<locale>/<slug>-vN/ for the requested
 * locales, reads existing printable.pdf + answer-key.pdf (when present)
 * + manifest.json + rendered deck.html (for canonical title source),
 * calls pdf-metadata.enhancePdf() with the same composition logic as the
 * publish.js forward path, writes atomically (temp + rename per §15.5).
 *
 * Idempotent — re-running strips prior LCS-tagged link annotations before
 * re-adding (pdf-metadata.js LCS_LINK_ANNOT_TAG marker).
 *
 * Concurrent pool (default --concurrency=16) bounds wall-clock at ~5-10 min
 * for ~9000 decks (2 PDFs each at ~100-200ms per enhancePdf call).
 *
 * Reads localized exercise/theme/level names from topics-taxonomy.json so
 * keywords flow per locale; reads localized "Answer Key" string from
 * frontend/messages/<locale>.json topicPage.deckCard.answerKeyLink so the
 * answer-key.pdf title gets a per-locale suffix.
 *
 * Usage:
 *   node scripts/publish-cli/regenerate-pdf-metadata.js --locales=en,de,es
 *   node scripts/publish-cli/regenerate-pdf-metadata.js --locales=en --sample=10
 *   node scripts/publish-cli/regenerate-pdf-metadata.js --dry-run
 *   node scripts/publish-cli/regenerate-pdf-metadata.js --concurrency=8
 */

'use strict';

var fs = require('fs');
var path = require('path');
var pdfMetadata = require('./pdf-metadata');
var taxonomy = require('./taxonomy');
var i18n = require('./i18n');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var DEFAULT_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';

function parseArgs(argv) {
  var out = {
    locales: DEFAULT_LOCALES.slice(),
    decksRoot: DEFAULT_DECKS_DIR,
    sample: 0,
    dryRun: false,
    concurrency: 16
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10) || 0;
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice('--concurrency='.length), 10) || 16;
    else if (a === '--dry-run') out.dryRun = true;
  });
  return out;
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

function extractFromDeckHtml(versionDir) {
  var htmlPath = path.join(versionDir, 'deck.html');
  var out = { title: null, description: null };
  try {
    var html = fs.readFileSync(htmlPath, 'utf8');
    var mt = /<title>([\s\S]*?)<\/title>/i.exec(html);
    if (mt) out.title = mt[1].trim();
    var md = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(html);
    if (md) out.description = md[1].trim();
  } catch (e) { /* swallow */ }
  return out;
}

function composeKeywords(manifest, locale) {
  var parts = [];
  var appName = manifest && manifest.generator && manifest.generator.app;
  if (appName) {
    try {
      var et = taxonomy.exerciseTypeFor(appName, locale);
      if (et && et.name) parts.push(et.name);
    } catch (e) { /* gap — skip */ }
  }
  if (manifest && manifest.theme) {
    try {
      var th = taxonomy.themeFor(manifest.theme, locale);
      if (th && th.name) parts.push(th.name);
    } catch (e) { /* off-taxonomy — skip */ }
  }
  // age_range may live at manifest.age_range OR manifest.metadata.age_range
  // depending on which manifest layer is serialized at publish-cli; for
  // retrofit we fall back to the app default if neither carries it.
  var ageRange = (manifest && (manifest.age_range || (manifest.metadata && manifest.metadata.age_range))) || null;
  if (!ageRange && appName) {
    try { ageRange = taxonomy.appConfig(appName).default_age_range; } catch (e) { /* skip */ }
  }
  if (ageRange) {
    try {
      var lv = taxonomy.levelFor(ageRange, locale);
      if (lv && lv.name) parts.push(lv.name);
    } catch (e) { /* skip */ }
  }
  parts.push('worksheet', 'K-3');
  return parts.join(', ');
}

function canonicalUrlFor(locale, slug) {
  return CANONICAL_URL_BASE + '/' + locale + '/decks/' + slug + '/';
}

async function processOnePdf(filePath, opts) {
  var raw = fs.readFileSync(filePath);
  var enhanced = await pdfMetadata.enhancePdf(raw, opts);
  var tmpPath = filePath + '.new';
  fs.writeFileSync(tmpPath, enhanced);
  fs.renameSync(tmpPath, filePath);
  return { sizeBefore: raw.length, sizeAfter: enhanced.length };
}

async function processOneDeck(rootDir, locale, entry, args) {
  var versionDir = entry.versionDir;
  var slug = entry.slug;

  var manifestPath = path.join(versionDir, 'manifest.json');
  var printablePath = path.join(versionDir, 'printable.pdf');
  var answerKeyPath = path.join(versionDir, 'answer-key.pdf');

  if (!fs.existsSync(manifestPath)) {
    return { ok: false, slug: slug, reason: 'no manifest.json' };
  }
  if (!fs.existsSync(printablePath)) {
    return { ok: false, slug: slug, reason: 'no printable.pdf' };
  }

  var manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    return { ok: false, slug: slug, reason: 'manifest.json parse error: ' + e.message };
  }

  var deckHtmlMeta = extractFromDeckHtml(versionDir);
  var title = deckHtmlMeta.title;
  if (!title) {
    // Last-resort fallback: try manifest.title[locale].
    if (manifest.title && typeof manifest.title === 'object' && manifest.title[locale]) {
      title = manifest.title[locale];
    } else {
      return { ok: false, slug: slug, reason: 'no title source (deck.html + manifest.title both empty)' };
    }
  }
  var description = deckHtmlMeta.description || title;

  var keywords = composeKeywords(manifest, locale);
  var canonicalUrl = canonicalUrlFor(locale, slug);

  var basePdfOpts = {
    title: title,
    author: 'LessonCraftStudio',
    subject: description,
    keywords: keywords,
    canonicalUrl: canonicalUrl
  };

  if (args.dryRun) {
    return { ok: true, slug: slug, dryRun: true, hasAnswerKey: fs.existsSync(answerKeyPath) };
  }

  var printableResult, answerKeyResult = null;
  try {
    printableResult = await processOnePdf(printablePath, basePdfOpts);
  } catch (e) {
    return { ok: false, slug: slug, reason: 'printable.pdf enhance failed: ' + e.message };
  }

  if (fs.existsSync(answerKeyPath)) {
    var answerKeyLabel;
    try {
      answerKeyLabel = i18n.resolve(locale, 'topicPage.deckCard.answerKeyLink', 'Answer Key').value;
    } catch (e) {
      answerKeyLabel = 'Answer Key';
    }
    var answerKeyOpts = Object.assign({}, basePdfOpts, {
      title: title + ' — ' + answerKeyLabel
    });
    try {
      answerKeyResult = await processOnePdf(answerKeyPath, answerKeyOpts);
    } catch (e) {
      // Don't fail the whole deck on answer-key failure; printable already
      // succeeded. Log but continue.
      console.error('[regen-pdf] WARN ' + locale + '/' + slug + ' answer-key.pdf failed: ' + e.message);
    }
  }

  return {
    ok: true,
    slug: slug,
    printable: printableResult,
    answerKey: answerKeyResult
  };
}

/**
 * Simple concurrent pool — process `tasks` array up to N at a time, calling
 * `worker(task)` for each.
 */
async function pool(tasks, n, worker) {
  var results = [];
  var idx = 0;
  async function runOne() {
    while (idx < tasks.length) {
      var myIdx = idx++;
      try {
        results[myIdx] = await worker(tasks[myIdx]);
      } catch (e) {
        results[myIdx] = { ok: false, error: e.message || String(e) };
      }
    }
  }
  var runners = [];
  for (var i = 0; i < Math.min(n, tasks.length); i++) runners.push(runOne());
  await Promise.all(runners);
  return results;
}

async function main() {
  var args = parseArgs(process.argv);
  var t0 = Date.now();
  console.log('[regen-pdf] locales=' + args.locales.join(',') + ' decksRoot=' + args.decksRoot + ' concurrency=' + args.concurrency + (args.dryRun ? ' (dry-run)' : '') + (args.sample ? ' sample=' + args.sample : ''));

  var allFailures = [];
  var totalOk = 0;
  var totalFail = 0;
  var perLocale = {};

  for (var li = 0; li < args.locales.length; li++) {
    var loc = args.locales[li];
    var entries = walkDecks(args.decksRoot, loc);
    if (args.sample) entries = entries.slice(0, args.sample);
    console.log('[regen-pdf] ' + loc + ': ' + entries.length + ' decks');
    perLocale[loc] = { found: entries.length, ok: 0, fail: 0 };

    var lt0 = Date.now();
    var results = await pool(entries, args.concurrency, function (entry) {
      return processOneDeck(args.decksRoot, loc, entry, args);
    });

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      if (r && r.ok) {
        totalOk++;
        perLocale[loc].ok++;
      } else {
        totalFail++;
        perLocale[loc].fail++;
        allFailures.push({
          locale: loc,
          slug: (entries[i] && entries[i].slug) || '?',
          reason: (r && (r.reason || r.error)) || 'unknown'
        });
      }
    }
    var lElapsed = ((Date.now() - lt0) / 1000).toFixed(1);
    console.log('[regen-pdf] ' + loc + ' done: ok=' + perLocale[loc].ok + ' fail=' + perLocale[loc].fail + ' in ' + lElapsed + 's');
  }

  var elapsedTotal = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('');
  console.log('[regen-pdf] ============ SUMMARY ============');
  console.log('[regen-pdf] total: ok=' + totalOk + ' fail=' + totalFail + ' in ' + elapsedTotal + 's');
  args.locales.forEach(function (loc) {
    if (perLocale[loc]) {
      console.log('[regen-pdf]   ' + loc + ': found=' + perLocale[loc].found + ' ok=' + perLocale[loc].ok + ' fail=' + perLocale[loc].fail);
    }
  });
  if (allFailures.length > 0) {
    var sample = allFailures.slice(0, 20);
    console.log('[regen-pdf] failure sample (first ' + sample.length + ' of ' + allFailures.length + '):');
    sample.forEach(function (f) { console.log('  ' + f.locale + '/' + f.slug + ': ' + f.reason); });
  }
}

main().catch(function (err) {
  console.error('[regen-pdf] FATAL:', err && err.stack || err);
  process.exit(1);
});
