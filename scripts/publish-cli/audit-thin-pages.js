#!/usr/bin/env node
'use strict';

/**
 * audit-thin-pages.js — thin-page SEO audit across LIVE catalog pages.
 *
 * Part 1 of the thin-page remediation program. For every page that actually
 * renders (single-axis topic, 2-axis intersection, hub, activity) across the
 * requested locales it: fetches the page, counts rendered crawlable words in
 * the editorial region (page-content.js), bands them
 * (CRITICAL_THIN/THIN/RICH/OVER), detects fallback-template meta descriptions,
 * and records <title> + meta description for cannibalization analysis. Then it
 * emits a ranked authoring queue prioritized by published-deck volume.
 *
 * Liveness is DB-known, NOT fetch-then-bucket: topic pages 404 unless the
 * locale has ≥1 published deck for that axis-key (§16.6.1). We read the
 * published-deck snapshot from a seo-100pct-baseline-*.json produced by
 * audit-published-baseline.js (run on Hetzner) and build the live page set +
 * per-page volume from it, so we never crawl substrate-honest 404s.
 *
 * Reuses the fetch/enumerate harness exported by audit-topic-pages.js and the
 * word-count helper in page-content.js. Read-only — writes only reports under
 * docs/audit-results/.
 *
 * Usage:
 *   node scripts/publish-cli/audit-thin-pages.js                       (auto-find latest baseline)
 *   node scripts/publish-cli/audit-thin-pages.js --baseline=docs/audit-results/seo-100pct-baseline-XXXX.json
 *   node scripts/publish-cli/audit-thin-pages.js --locales=en,es,pt --concurrency=8
 *   node scripts/publish-cli/audit-thin-pages.js --no-intersections   (skip 2-axis pages)
 *   node scripts/publish-cli/audit-thin-pages.js --page-types=topic-single,hub
 *   node scripts/publish-cli/audit-thin-pages.js --thin-floor=200 --critical-floor=50
 *   node scripts/publish-cli/audit-thin-pages.js --sample=50          (cap total URLs, smoke test)
 */

var path = require('path');
var fs = require('fs');
var https = require('https');
var http = require('http');
var url = require('url');

var topicAudit = require('./audit-topic-pages');
var pageContent = require('./page-content');

var DEFAULT_BASE_URL = 'https://www.lessoncraftstudio.com';
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var ALL_PAGE_TYPES = ['topic-single', 'topic-intersection', 'hub', 'activity'];
var REPO_ROOT = path.resolve(__dirname, '..', '..');
var TAXONOMY_PATH = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');
var AUDIT_DIR = path.join(REPO_ROOT, 'docs', 'audit-results');
var MINI_TOOLS_DIR = path.join(REPO_ROOT, 'mini tools');

// §17.8.6 age-range -> educational-level axis-key (canonical, stable).
var LEVEL_TO_RANGES = {
  preschool: ['3-5'],
  kindergarten: ['5-7'],
  'grade-1': ['6-8'],
  'grade-2': ['7-9'],
  'grade-3': ['8-10'],
};

// Canonical intersection pairs (locked §16.5.3) — MUST match
// audit-topic-pages.js enumerateIntersectionURLs ordering exactly so the
// liveness keys line up.
var INTERSECTION_PAIRS = [
  ['theme', 'educational-level'],
  ['theme', 'exercise-type'],
  ['educational-level', 'exercise-type'],
];

var LOCALE_WEIGHT = { en: 4, es: 3, pt: 3, de: 2, nl: 2, fr: 1, it: 1, sv: 1, da: 1, no: 1, fi: 1 };
var AXIS_TIER = { 'topic-single': 3, hub: 3, 'topic-intersection': 2, activity: 1 };

// ---------------------------------------------------------------------------
// args
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  var out = {
    baseUrl: DEFAULT_BASE_URL,
    locales: ALL_LOCALES.slice(),
    pageTypes: ALL_PAGE_TYPES.slice(),
    baseline: null,
    outDir: AUDIT_DIR,
    concurrency: 8,
    sample: null,
    timeoutMs: 20000,
    thinFloor: 200,
    criticalFloor: 50,
    overCeiling: 600,
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--base-url=') === 0) out.baseUrl = a.slice('--base-url='.length).replace(/\/$/, '');
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--page-types=') === 0) out.pageTypes = a.slice('--page-types='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--baseline=') === 0) out.baseline = path.resolve(a.slice('--baseline='.length));
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice('--out-dir='.length));
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice('--concurrency='.length), 10);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10);
    else if (a.indexOf('--timeout-ms=') === 0) out.timeoutMs = parseInt(a.slice('--timeout-ms='.length), 10);
    else if (a.indexOf('--thin-floor=') === 0) out.thinFloor = parseInt(a.slice('--thin-floor='.length), 10);
    else if (a.indexOf('--critical-floor=') === 0) out.criticalFloor = parseInt(a.slice('--critical-floor='.length), 10);
    else if (a === '--no-intersections') out.pageTypes = out.pageTypes.filter(function (p) { return p !== 'topic-intersection'; });
    else if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
  });
  return out;
}

function printHelp() {
  console.log('Usage: node audit-thin-pages.js [--baseline=path] [--locales=en,..] [--page-types=topic-single,topic-intersection,hub,activity] [--concurrency=N] [--sample=N] [--thin-floor=200] [--critical-floor=50] [--no-intersections]');
}

function utcStamp() {
  var d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

// ---------------------------------------------------------------------------
// fetch (local copy; audit-topic-pages does not export fetchURL)
// ---------------------------------------------------------------------------

function fetchURL(targetUrl, timeoutMs) {
  return new Promise(function (resolve, reject) {
    var parsed = url.parse(targetUrl);
    var client = parsed.protocol === 'https:' ? https : http;
    var req = client.get({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      headers: { 'User-Agent': 'lcs-audit-thin-pages/1.0' },
    }, function (res) {
      var status = res.statusCode;
      if ((status === 301 || status === 302 || status === 307 || status === 308) && res.headers.location) {
        res.resume();
        var redirectTarget = res.headers.location;
        if (redirectTarget.indexOf('://') === -1) {
          redirectTarget = parsed.protocol + '//' + parsed.hostname + redirectTarget;
        }
        fetchURL(redirectTarget, timeoutMs).then(resolve, reject);
        return;
      }
      var chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () { resolve({ status: status, body: Buffer.concat(chunks).toString('utf8') }); });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, function () { req.destroy(new Error('timeout after ' + timeoutMs + 'ms: ' + targetUrl)); });
  });
}

async function runWithConcurrency(items, concurrency, perItemFn) {
  var results = [];
  var idx = 0;
  async function worker() {
    while (idx < items.length) {
      var myIdx = idx++;
      try { results[myIdx] = await perItemFn(items[myIdx], myIdx); }
      catch (e) { results[myIdx] = { error: e.message || String(e), input: items[myIdx] }; }
    }
  }
  var workers = [];
  for (var i = 0; i < concurrency; i++) workers.push(worker());
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// baseline + liveness
// ---------------------------------------------------------------------------

function findLatestBaseline(dir) {
  if (!fs.existsSync(dir)) return null;
  var files = fs.readdirSync(dir).filter(function (f) { return /^seo-100pct-baseline-.*\.json$/.test(f); });
  if (files.length === 0) return null;
  files.sort();
  return path.join(dir, files[files.length - 1]);
}

function loadBaselineDecks(baselinePath) {
  var raw = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  // audit-published-baseline.js writes { decks: [{ language, exerciseType, ageRange, subjectTags, ... }] }
  return Array.isArray(raw.decks) ? raw.decks : [];
}

function buildRangeToLevel() {
  var m = {};
  Object.keys(LEVEL_TO_RANGES).forEach(function (lk) {
    LEVEL_TO_RANGES[lk].forEach(function (r) { m[r] = lk; });
  });
  return m;
}

function buildLivenessIndex(decks, tx) {
  var rangeToLevel = buildRangeToLevel();
  var themeRegistry = new Set(Object.keys((tx.axes && tx.axes.theme) || {}));
  var etRegistry = new Set(Object.keys((tx.axes && tx.axes['exercise-type']) || {}));

  var liveSingle = new Set();        // "loc|axis|axisKey"
  var liveIntersection = new Set();  // "loc|axis1×axis2|key1__key2"
  var axisVolume = new Map();        // "loc|axis|axisKey" -> count
  var intersectionVolume = new Map();
  var localeDeckTotal = {};          // loc -> count

  function bump(map, key) { map.set(key, (map.get(key) || 0) + 1); }

  function keysFor(axis, d) {
    if (axis === 'exercise-type') return etRegistry.has(d.exerciseType) ? [d.exerciseType] : [];
    if (axis === 'theme') return (d.subjectTags || []).filter(function (t) { return themeRegistry.has(t); });
    if (axis === 'educational-level') { var lk = rangeToLevel[d.ageRange]; return lk ? [lk] : []; }
    return [];
  }

  decks.forEach(function (d) {
    var loc = d.language;
    if (!loc) return;
    localeDeckTotal[loc] = (localeDeckTotal[loc] || 0) + 1;

    keysFor('exercise-type', d).forEach(function (k) {
      var key = loc + '|exercise-type|' + k; liveSingle.add(key); bump(axisVolume, key);
    });
    keysFor('educational-level', d).forEach(function (k) {
      var key = loc + '|educational-level|' + k; liveSingle.add(key); bump(axisVolume, key);
    });
    keysFor('theme', d).forEach(function (k) {
      var key = loc + '|theme|' + k; liveSingle.add(key); bump(axisVolume, key);
    });

    INTERSECTION_PAIRS.forEach(function (pair) {
      var ks1 = keysFor(pair[0], d);
      var ks2 = keysFor(pair[1], d);
      ks1.forEach(function (k1) {
        ks2.forEach(function (k2) {
          var key = loc + '|' + pair[0] + '×' + pair[1] + '|' + k1 + '__' + k2;
          liveIntersection.add(key);
          bump(intersectionVolume, key);
        });
      });
    });
  });

  return {
    liveSingle: liveSingle,
    liveIntersection: liveIntersection,
    axisVolume: axisVolume,
    intersectionVolume: intersectionVolume,
    localeDeckTotal: localeDeckTotal,
  };
}

// ---------------------------------------------------------------------------
// enumerate live pages
// ---------------------------------------------------------------------------

function loadActivityRows() {
  if (!fs.existsSync(MINI_TOOLS_DIR)) return [];
  var files = fs.readdirSync(MINI_TOOLS_DIR).filter(function (f) { return /-activities\.json$/.test(f); });
  var rows = [];
  files.forEach(function (f) {
    try {
      var data = JSON.parse(fs.readFileSync(path.join(MINI_TOOLS_DIR, f), 'utf8'));
      var arr = Array.isArray(data) ? data : (data.rows || data.activities || []);
      arr.forEach(function (r) { rows.push(r); });
    } catch (e) { /* skip malformed */ }
  });
  return rows;
}

function enumerateLivePages(tx, liveness, opts) {
  var pages = [];
  var want = new Set(opts.pageTypes);

  if (want.has('topic-single')) {
    topicAudit.enumerateSingleAxisURLs(tx, { axes: ['exercise-type', 'theme', 'educational-level'], locales: opts.locales, baseUrl: opts.baseUrl })
      .forEach(function (rec) {
        var lk = rec.locale + '|' + rec.axis + '|' + rec.axisKey;
        if (!liveness.liveSingle.has(lk)) return;
        pages.push({
          locale: rec.locale, pageType: 'topic-single', axis: rec.axis, axisKey: rec.axisKey,
          slug: rec.slug, url: rec.url, volume: liveness.axisVolume.get(lk) || 0,
          pageKey: rec.locale + '|topic-single|' + rec.axis + ':' + rec.axisKey,
        });
      });
  }

  if (want.has('topic-intersection')) {
    topicAudit.enumerateIntersectionURLs(tx, { locales: opts.locales, baseUrl: opts.baseUrl })
      .forEach(function (rec) {
        var lk = rec.locale + '|' + rec.axisPair + '|' + rec.axisKey;
        if (!liveness.liveIntersection.has(lk)) return;
        pages.push({
          locale: rec.locale, pageType: 'topic-intersection', axis: 'intersection', axisPair: rec.axisPair,
          axisKey: rec.axisKey, slug: rec.slug, url: rec.url, volume: liveness.intersectionVolume.get(lk) || 0,
          pageKey: rec.locale + '|topic-intersection|' + rec.axisKey, isIntersection: true,
        });
      });
  }

  if (want.has('hub')) {
    opts.locales.forEach(function (loc) {
      // Hubs only render meaningfully where the locale has a catalog; but the
      // routes exist for every enabled locale. Treat hub as live where the
      // locale has ≥1 deck (else the hub is substrate-honest sparse).
      var total = liveness.localeDeckTotal[loc] || 0;
      [['worksheets', 'worksheets'], ['topic', 'topic'], ['activities', 'activities']].forEach(function (h) {
        pages.push({
          locale: loc, pageType: 'hub', axis: 'hub', axisKey: h[0],
          slug: h[1], url: opts.baseUrl + '/' + loc + '/' + h[1] + '/', volume: total,
          pageKey: loc + '|hub|' + h[0],
        });
      });
    });
  }

  if (want.has('activity')) {
    var rows = loadActivityRows();
    rows.forEach(function (row) {
      var slugMap = row.slug || {};
      var idKey = (row.tool || 'engine') + ':' + (row.id || '');
      opts.locales.forEach(function (loc) {
        var slug = slugMap[loc];
        if (!slug) return;
        pages.push({
          locale: loc, pageType: 'activity', axis: 'activity', axisKey: idKey,
          slug: slug, url: opts.baseUrl + '/' + loc + '/activities/' + slug + '/', volume: 1,
          pageKey: loc + '|activity|' + idKey,
        });
      });
    });
  }

  return pages;
}

// ---------------------------------------------------------------------------
// per-page checks
// ---------------------------------------------------------------------------

function extractTitle(htmlText) {
  var m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(htmlText || '');
  return m ? pageContent.tagsToText(m[1]) : null;
}

function severityForBand(band) {
  if (band === 'CRITICAL_THIN') return 2;
  if (band === 'THIN') return 1;
  return 0;
}

function scorePage(rec, band) {
  var localeWeight = LOCALE_WEIGHT[rec.locale] != null ? LOCALE_WEIGHT[rec.locale] : 1;
  var axisTier = AXIS_TIER[rec.pageType] != null ? AXIS_TIER[rec.pageType] : 1;
  return 10 * (rec.volume || 0) + 5 * severityForBand(band) + 3 * localeWeight + 2 * axisTier;
}

function runChecks(rec, ctx, opts) {
  var base = {
    url: rec.url, pageKey: rec.pageKey, locale: rec.locale, pageType: rec.pageType,
    axis: rec.axis, axisKey: rec.axisKey, slug: rec.slug, volume: rec.volume || 0,
    status: rec.status,
  };

  if (rec.status === 404) {
    // Pre-filtered to live pages — a 404 here means the baseline is stale
    // relative to live catalog (deck unpublished, or new live page absent).
    base.notLive = true;
    base.band = null;
    base.defectClasses = [];
    base.passAll = true;
    base.note = 'STALE_BASELINE_404';
    return base;
  }
  if (rec.status !== 200) {
    base.defectClasses = ['PAGE_HTTP_' + rec.status];
    base.passAll = false;
    return base;
  }

  var wc = pageContent.countRenderedWords(rec.body || '', rec.pageType);
  var band = pageContent.bandWordCount(wc.words, opts);
  var meta = topicAudit.extractMetaDescription(rec.body || '');
  var title = extractTitle(rec.body || '');

  var defects = [];
  if (band === 'CRITICAL_THIN') defects.push('PAGE_CONTENT_CRITICAL_THIN');
  else if (band === 'THIN') defects.push('PAGE_CONTENT_THIN');

  var fallbackRe = topicAudit.FALLBACK_PATTERNS[rec.locale];
  var fallbackUsed = !!(fallbackRe && meta && fallbackRe.test(meta));
  if (fallbackUsed) defects.push('PAGE_FALLBACK_TEMPLATE_USED');
  if (!meta) defects.push('META_DESCRIPTION_MISSING');

  // Title cannibalization tracking (per locale, normalized).
  if (title) {
    var tHash = topicAudit.sha1Normalized(title);
    if (tHash) {
      ctx.titleSeen[rec.locale] = ctx.titleSeen[rec.locale] || new Map();
      var prior = ctx.titleSeen[rec.locale].get(tHash);
      if (prior && prior !== rec.url) {
        defects.push('TITLE_NON_UNIQUE');
        base.titleCollidesWith = prior;
      } else {
        ctx.titleSeen[rec.locale].set(tHash, rec.url);
      }
    }
  }

  base.words = wc.words;
  base.region = wc.region;
  base.preview = wc.preview;
  base.band = band;
  base.title = title;
  base.metaDescription = meta;
  base.metaDescriptionLength = meta ? meta.length : 0;
  base.fallbackTemplate = fallbackUsed;
  base.defectClasses = defects;
  base.passAll = defects.length === 0;
  base.score = scorePage(rec, band);
  return base;
}

// ---------------------------------------------------------------------------
// aggregation + reports
// ---------------------------------------------------------------------------

function summarize(perPage) {
  var byLocale = {};
  perPage.forEach(function (r) {
    if (!r || !r.locale) return;
    var b = byLocale[r.locale] || (byLocale[r.locale] = {
      locale: r.locale, total: 0, notLive: 0,
      bands: { CRITICAL_THIN: 0, THIN: 0, RICH: 0, OVER: 0 },
      byPageType: {},
      defectCounts: {},
    });
    if (r.notLive) { b.notLive++; return; }
    b.total++;
    if (r.band) b.bands[r.band] = (b.bands[r.band] || 0) + 1;
    var pt = b.byPageType[r.pageType] || (b.byPageType[r.pageType] = { total: 0, CRITICAL_THIN: 0, THIN: 0, RICH: 0, OVER: 0 });
    pt.total++;
    if (r.band) pt[r.band] = (pt[r.band] || 0) + 1;
    (r.defectClasses || []).forEach(function (d) { b.defectCounts[d] = (b.defectCounts[d] || 0) + 1; });
  });
  return byLocale;
}

function buildQueue(perPage) {
  return perPage
    .filter(function (r) { return r && !r.notLive && (r.band === 'CRITICAL_THIN' || r.band === 'THIN'); })
    .sort(function (a, b) { return (b.score || 0) - (a.score || 0); })
    .map(function (r, i) {
      return {
        rank: i + 1, pageKey: r.pageKey, url: r.url, locale: r.locale, pageType: r.pageType,
        axis: r.axis, axisKey: r.axisKey, words: r.words, band: r.band, volume: r.volume,
        score: r.score, title: r.title || null, metaDescription: r.metaDescription || null,
      };
    });
}

function buildMarkdown(perPage, byLocale, queue, opts, stamp) {
  var L = [];
  L.push('# Thin-page audit — ' + stamp);
  L.push('');
  L.push('Base URL: `' + opts.baseUrl + '`  ');
  L.push('Locales: `' + opts.locales.join(',') + '`  ');
  L.push('Page types: `' + opts.pageTypes.join(',') + '`  ');
  L.push('Thin floor: **' + opts.thinFloor + '** words · Critical floor: **' + opts.criticalFloor + '** words  ');
  L.push('Live pages audited: **' + perPage.filter(function (r) { return r && !r.notLive; }).length + '** (stale-baseline 404s: ' + perPage.filter(function (r) { return r && r.notLive; }).length + ')  ');
  L.push('Thin pages queued for authoring: **' + queue.length + '**');
  L.push('');
  L.push('## Per-locale word-count bands');
  L.push('');
  L.push('| Locale | Live | CRITICAL_THIN | THIN | RICH | OVER |');
  L.push('|---|---:|---:|---:|---:|---:|');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    L.push('| ' + loc + ' | ' + b.total + ' | ' + b.bands.CRITICAL_THIN + ' | ' + b.bands.THIN + ' | ' + b.bands.RICH + ' | ' + b.bands.OVER + ' |');
  });
  L.push('');
  L.push('## Per-locale × page-type');
  L.push('');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    L.push('**' + loc + '**');
    Object.keys(b.byPageType).sort().forEach(function (pt) {
      var p = b.byPageType[pt];
      L.push('- ' + pt + ': ' + p.total + ' live (' + p.CRITICAL_THIN + ' critical-thin, ' + p.THIN + ' thin, ' + p.RICH + ' rich, ' + p.OVER + ' over)');
    });
    L.push('');
  });
  L.push('## Top 40 authoring-queue rows');
  L.push('');
  L.push('| # | Locale | Type | Axis key | Words | Band | Deck vol | Score |');
  L.push('|---:|---|---|---|---:|---|---:|---:|');
  queue.slice(0, 40).forEach(function (q) {
    L.push('| ' + q.rank + ' | ' + q.locale + ' | ' + q.pageType + ' | ' + q.axisKey + ' | ' + q.words + ' | ' + q.band + ' | ' + q.volume + ' | ' + q.score + ' |');
  });
  L.push('');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  var opts = parseArgs(process.argv);
  var baselinePath = opts.baseline || findLatestBaseline(opts.outDir);
  if (!baselinePath || !fs.existsSync(baselinePath)) {
    console.error('[fatal] No baseline JSON found. Run audit-published-baseline.js on Hetzner first, or pass --baseline=<path>.');
    process.exit(2);
  }
  console.log('[info] Baseline: ' + baselinePath);

  var tx = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  var decks = loadBaselineDecks(baselinePath);
  console.log('[info] Baseline decks: ' + decks.length);

  var liveness = buildLivenessIndex(decks, tx);
  var pages = enumerateLivePages(tx, liveness, opts);
  if (opts.sample && pages.length > opts.sample) pages = pages.slice(0, opts.sample);
  console.log('[info] Live pages to audit: ' + pages.length + ' across ' + opts.locales.length + ' locales (concurrency ' + opts.concurrency + ')');

  var ctx = { titleSeen: {} };
  var t0 = Date.now();
  var perPage = await runWithConcurrency(pages, opts.concurrency, async function (rec) {
    try {
      var res = await fetchURL(rec.url, opts.timeoutMs);
      return runChecks(Object.assign({}, rec, { status: res.status, body: res.body }), ctx, opts);
    } catch (e) {
      return { url: rec.url, pageKey: rec.pageKey, locale: rec.locale, pageType: rec.pageType, axisKey: rec.axisKey, status: 0, defectClasses: ['FETCH_FAILED'], passAll: false, error: e.message || String(e) };
    }
  });
  console.log('[info] Crawl complete in ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');

  var byLocale = summarize(perPage);
  var queue = buildQueue(perPage);
  var stamp = utcStamp();
  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir, { recursive: true });

  var jsonPath = path.join(opts.outDir, 'thin-pages-' + stamp + '.json');
  var mdPath = path.join(opts.outDir, 'thin-pages-' + stamp + '.md');
  var queueJsonPath = path.join(opts.outDir, 'thin-page-authoring-queue-' + stamp + '.json');
  var queueMdPath = path.join(opts.outDir, 'thin-page-authoring-queue-' + stamp + '.md');

  fs.writeFileSync(jsonPath, JSON.stringify({ opts: opts, baseline: baselinePath, byLocale: byLocale, perPage: perPage }, null, 2));
  fs.writeFileSync(mdPath, buildMarkdown(perPage, byLocale, queue, opts, stamp));
  fs.writeFileSync(queueJsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), baseline: baselinePath, total: queue.length, queue: queue }, null, 2));
  var qmd = ['# Thin-page authoring queue — ' + stamp, '', 'Total thin pages: **' + queue.length + '**', '', '| # | Locale | Type | Axis key | URL | Words | Band | Deck vol | Score |', '|---:|---|---|---|---|---:|---|---:|---:|'];
  queue.forEach(function (q) { qmd.push('| ' + q.rank + ' | ' + q.locale + ' | ' + q.pageType + ' | ' + q.axisKey + ' | ' + q.url + ' | ' + q.words + ' | ' + q.band + ' | ' + q.volume + ' | ' + q.score + ' |'); });
  fs.writeFileSync(queueMdPath, qmd.join('\n'));

  console.log('');
  console.log('[summary]');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    console.log('  ' + loc + ': ' + b.total + ' live — ' + b.bands.CRITICAL_THIN + ' critical-thin, ' + b.bands.THIN + ' thin, ' + b.bands.RICH + ' rich, ' + b.bands.OVER + ' over (' + b.notLive + ' stale-404)');
  });
  console.log('');
  console.log('[output] ' + jsonPath);
  console.log('[output] ' + mdPath);
  console.log('[output] ' + queueJsonPath);
  console.log('[output] ' + queueMdPath);

  var thinTotal = queue.length;
  process.exit(thinTotal === 0 ? 0 : 1);
}

if (require.main === module) {
  main().catch(function (e) { console.error('[fatal] ' + (e.stack || e.message || String(e))); process.exit(2); });
}

module.exports = {
  buildLivenessIndex: buildLivenessIndex,
  enumerateLivePages: enumerateLivePages,
  runChecks: runChecks,
  buildQueue: buildQueue,
  fetchURL: fetchURL,
  runWithConcurrency: runWithConcurrency,
};
