#!/usr/bin/env node
/**
 * Topic-page meta-description audit. Sibling to audit-deck-html.js but for
 * Next.js SSR topic pages (single-axis + intersection). Fetches each page
 * from production via HTTPS, extracts <meta name="description">, runs the
 * same length + uniqueness + fallback-template invariants used on decks.
 *
 * Designed for the meta-description SEO arc launched 2026-05-28 per the
 * §A.13.48 plan-mode-per-locale cadence. First commission authors EN
 * single-axis exercise-type entries; this audit verifies the cohort + tracks
 * baseline state for subsequent commissions (themes, educational-level, then
 * the 10 non-EN locales, then intersections).
 *
 * Read-only. Output:
 *   docs/audit-results/topic-meta-curl-<utc>.json     per-page JSON
 *   docs/audit-results/topic-meta-curl-<utc>.md       aggregate summary
 *
 * Usage:
 *   node scripts/publish-cli/audit-topic-pages.js
 *   node scripts/publish-cli/audit-topic-pages.js --locales=en
 *   node scripts/publish-cli/audit-topic-pages.js --axes=exercise-type
 *   node scripts/publish-cli/audit-topic-pages.js --concurrency=8
 *   node scripts/publish-cli/audit-topic-pages.js --base-url=https://www.lessoncraftstudio.com
 *   node scripts/publish-cli/audit-topic-pages.js --sample=10
 *   node scripts/publish-cli/audit-topic-pages.js --include-intersections   (FUTURE — single-axis only by default)
 */

'use strict';

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var https = require('https');
var http = require('http');
var url = require('url');

var DEFAULT_BASE_URL = 'https://www.lessoncraftstudio.com';
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var ALL_AXES = ['exercise-type', 'theme', 'educational-level'];
var TAXONOMY_PATH = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

// Cannibalized fallback template — see audit-deck-html.js Check 16. The full
// template at frontend/messages/en.json:934 ICU-substitutes {topic}; this regex
// matches the framing words around it. Non-EN locales have analogous fallback
// templates with similar shape — we extend the regex to catch each locale's
// idiomatic equivalent if/when surfaced.
var FALLBACK_PATTERNS = {
  en: /Free .{1,40} worksheets and printable PDFs\. Interactive activities for early-childhood classrooms/i,
  // Other locale fallback templates: detected only after their topicPage.meta.description shapes
  // are reviewed in later commissions. Until then we conservatively skip detection on non-EN.
};

function sha1Normalized(s) {
  var normalized = String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized ? crypto.createHash('sha1').update(normalized).digest('hex') : null;
}

function utcStamp() {
  var d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

function parseArgs(argv) {
  var out = {
    baseUrl: DEFAULT_BASE_URL,
    locales: ALL_LOCALES.slice(),
    axes: ALL_AXES.slice(),
    outDir: path.resolve(__dirname, '..', '..', 'docs', 'audit-results'),
    concurrency: 8,
    sample: null,
    includeIntersections: false,
    timeoutMs: 15000
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--base-url=') === 0) out.baseUrl = a.slice('--base-url='.length).replace(/\/$/, '');
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--axes=') === 0) out.axes = a.slice('--axes='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice('--out-dir='.length));
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice('--concurrency='.length), 10);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10);
    else if (a.indexOf('--timeout-ms=') === 0) out.timeoutMs = parseInt(a.slice('--timeout-ms='.length), 10);
    else if (a === '--include-intersections') out.includeIntersections = true;
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node audit-topic-pages.js [--base-url=URL] [--locales=en,de,...] [--axes=exercise-type,theme,educational-level] [--concurrency=N] [--sample=N] [--include-intersections]');
      process.exit(0);
    }
  });
  return out;
}

// =====================================================================
// Taxonomy loading
// =====================================================================

function loadTaxonomy() {
  var raw = fs.readFileSync(TAXONOMY_PATH, 'utf8');
  return JSON.parse(raw);
}

function enumerateSingleAxisURLs(tx, opts) {
  // Returns array of { locale, axis, axisKey, slug, url }
  var out = [];
  opts.axes.forEach(function (axisName) {
    var axisBlock = tx.axes && tx.axes[axisName];
    if (!axisBlock) return;
    Object.keys(axisBlock).forEach(function (axisKey) {
      var entry = axisBlock[axisKey];
      if (!entry || !entry.slug) return;
      opts.locales.forEach(function (locale) {
        var slug = entry.slug[locale];
        if (!slug) return;  // locale not yet substrate-substantiated for this axis-key
        out.push({
          locale: locale,
          axis: axisName,
          axisKey: axisKey,
          slug: slug,
          url: opts.baseUrl + '/' + locale + '/topic/' + slug + '/'
        });
      });
    });
  });
  return out;
}

// =====================================================================
// HTTP fetch with timeout
// =====================================================================

function fetchURL(targetUrl, timeoutMs) {
  return new Promise(function (resolve, reject) {
    var parsed = url.parse(targetUrl);
    var client = parsed.protocol === 'https:' ? https : http;
    var req = client.get({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      headers: { 'User-Agent': 'lcs-audit-topic-pages/1.0' }
    }, function (res) {
      var status = res.statusCode;
      // Follow 308 redirects (Next.js trailingSlash, canonical-axis-order)
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
      res.on('end', function () {
        resolve({ status: status, body: Buffer.concat(chunks).toString('utf8') });
      });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, function () {
      req.destroy(new Error('timeout after ' + timeoutMs + 'ms: ' + targetUrl));
    });
  });
}

// =====================================================================
// Per-URL audit
// =====================================================================

function extractMetaDescription(htmlText) {
  // Two variants — Next.js may emit name="description" or property="description"
  var m1 = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(htmlText);
  if (m1) return m1[1];
  var m2 = /<meta\s+content="([^"]*)"\s+name="description"/i.exec(htmlText);
  if (m2) return m2[1];
  return null;
}

function runChecks(rec, ctx) {
  var checks = {};
  var defects = [];

  if (rec.status !== 200) {
    checks.fetch = { pass: false, category: 'HTTP_' + rec.status };
    defects.push('PAGE_HTTP_' + rec.status);
    return { url: rec.url, locale: rec.locale, axis: rec.axis, axisKey: rec.axisKey, slug: rec.slug, status: rec.status, checks: checks, defectClasses: defects, defectCount: defects.length, passAll: false };
  }

  var desc = extractMetaDescription(rec.body || '');
  if (!desc) {
    checks.metaDescriptionPresent = { pass: false, category: 'NO_META_DESCRIPTION' };
    defects.push('META_DESCRIPTION_MISSING');
    return {
      url: rec.url, locale: rec.locale, axis: rec.axis, axisKey: rec.axisKey, slug: rec.slug,
      status: rec.status, checks: checks, defectClasses: defects, defectCount: defects.length, passAll: false
    };
  }
  checks.metaDescriptionPresent = { pass: true };

  // Check 1: length 120-170
  var len = desc.length;
  if (len < 120) {
    checks.length = { pass: false, category: 'TOO_SHORT', length: len, value: desc };
    defects.push('META_DESCRIPTION_LENGTH_TOO_SHORT');
  } else if (len > 170) {
    checks.length = { pass: false, category: 'TOO_LONG', length: len, value: desc };
    defects.push('META_DESCRIPTION_LENGTH_TOO_LONG');
  } else {
    checks.length = { pass: true, length: len };
  }

  // Check 2: fallback-template detection (per-locale regex)
  var fallbackRe = FALLBACK_PATTERNS[rec.locale];
  if (fallbackRe && fallbackRe.test(desc)) {
    checks.fallbackTemplate = { pass: false, category: 'CANNIBALIZED_FALLBACK_DETECTED', value: desc };
    defects.push('META_DESCRIPTION_FALLBACK_TEMPLATE_DETECTED');
  } else if (fallbackRe) {
    checks.fallbackTemplate = { pass: true };
  } else {
    checks.fallbackTemplate = { pass: true, skip: 'no per-locale pattern (locale=' + rec.locale + ')' };
  }

  // Check 3: uniqueness (collide against accumulated hash set per locale)
  var hash = sha1Normalized(desc);
  if (!hash) {
    checks.uniqueness = { pass: false, category: 'EMPTY_AFTER_NORMALIZE', value: desc };
    defects.push('META_DESCRIPTION_EMPTY_AFTER_NORMALIZE');
  } else {
    var seen = ctx.hashSetByLocale[rec.locale] || new Map();
    var prior = seen.get(hash);
    if (prior && prior !== rec.url) {
      checks.uniqueness = { pass: false, category: 'COLLIDES_WITH', collidesWith: prior, hash: hash };
      defects.push('META_DESCRIPTION_NON_UNIQUE');
    } else {
      seen.set(hash, rec.url);
      ctx.hashSetByLocale[rec.locale] = seen;
      checks.uniqueness = { pass: true, hash: hash };
    }
  }

  return {
    url: rec.url, locale: rec.locale, axis: rec.axis, axisKey: rec.axisKey, slug: rec.slug,
    status: rec.status, descriptionLength: len, descriptionPreview: desc.slice(0, 200),
    checks: checks, defectClasses: defects, defectCount: defects.length, passAll: defects.length === 0
  };
}

// =====================================================================
// Concurrency control
// =====================================================================

async function runWithConcurrency(items, concurrency, perItemFn) {
  var results = [];
  var idx = 0;
  async function worker() {
    while (idx < items.length) {
      var myIdx = idx++;
      try {
        results[myIdx] = await perItemFn(items[myIdx], myIdx);
      } catch (e) {
        results[myIdx] = { error: e.message || String(e), input: items[myIdx] };
      }
    }
  }
  var workers = [];
  for (var i = 0; i < concurrency; i++) workers.push(worker());
  await Promise.all(workers);
  return results;
}

// =====================================================================
// Aggregation + markdown summary
// =====================================================================

function summarizeByLocale(perPage) {
  var byLocale = {};
  perPage.forEach(function (r) {
    if (!r || !r.locale) return;
    if (!byLocale[r.locale]) {
      byLocale[r.locale] = {
        locale: r.locale, total: 0, pass: 0, fail: 0,
        byAxis: { 'exercise-type': { total: 0, pass: 0 }, 'theme': { total: 0, pass: 0 }, 'educational-level': { total: 0, pass: 0 } },
        defectCounts: {}, fallbackCount: 0, tooShortCount: 0, tooLongCount: 0, nonUniqueCount: 0, missingCount: 0,
        sampleFailures: []
      };
    }
    var b = byLocale[r.locale];
    b.total++;
    if (b.byAxis[r.axis]) {
      b.byAxis[r.axis].total++;
      if (r.passAll) b.byAxis[r.axis].pass++;
    }
    if (r.passAll) {
      b.pass++;
    } else {
      b.fail++;
      (r.defectClasses || []).forEach(function (d) {
        b.defectCounts[d] = (b.defectCounts[d] || 0) + 1;
        if (d === 'META_DESCRIPTION_FALLBACK_TEMPLATE_DETECTED') b.fallbackCount++;
        else if (d === 'META_DESCRIPTION_LENGTH_TOO_SHORT') b.tooShortCount++;
        else if (d === 'META_DESCRIPTION_LENGTH_TOO_LONG') b.tooLongCount++;
        else if (d === 'META_DESCRIPTION_NON_UNIQUE') b.nonUniqueCount++;
        else if (d === 'META_DESCRIPTION_MISSING') b.missingCount++;
      });
      if (b.sampleFailures.length < 5) {
        b.sampleFailures.push({ url: r.url, axisKey: r.axisKey, defects: r.defectClasses, length: r.descriptionLength, preview: r.descriptionPreview });
      }
    }
  });
  return byLocale;
}

function buildMarkdown(perPage, byLocale, opts, stamp) {
  var lines = [];
  lines.push('# Topic-page meta-description audit — ' + stamp);
  lines.push('');
  lines.push('Base URL: `' + opts.baseUrl + '`  ');
  lines.push('Locales: `' + opts.locales.join(',') + '`  ');
  lines.push('Axes: `' + opts.axes.join(',') + '`  ');
  lines.push('Total pages audited: **' + perPage.length + '**');
  lines.push('');
  lines.push('## Per-locale summary');
  lines.push('');
  lines.push('| Locale | Total | Pass | Fail | Fallback | Too short | Too long | Non-unique | Missing |');
  lines.push('|---|---:|---:|---:|---:|---:|---:|---:|---:|');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    lines.push('| ' + loc + ' | ' + b.total + ' | ' + b.pass + ' | ' + b.fail + ' | ' + b.fallbackCount + ' | ' + b.tooShortCount + ' | ' + b.tooLongCount + ' | ' + b.nonUniqueCount + ' | ' + b.missingCount + ' |');
  });
  lines.push('');
  lines.push('## Per-axis breakdown');
  lines.push('');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    lines.push('**' + loc + '**:');
    Object.keys(b.byAxis).forEach(function (ax) {
      var a = b.byAxis[ax];
      lines.push('- ' + ax + ': ' + a.pass + ' / ' + a.total + ' pass');
    });
    lines.push('');
  });
  lines.push('## Sample failures (up to 5 per locale)');
  lines.push('');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    if (b.sampleFailures.length === 0) return;
    lines.push('### ' + loc);
    lines.push('');
    b.sampleFailures.forEach(function (sf) {
      lines.push('- `' + sf.url + '` (' + sf.axisKey + ', ' + (sf.length || 0) + ' chars): ' + (sf.defects || []).join(', '));
      if (sf.preview) lines.push('  > ' + sf.preview);
    });
    lines.push('');
  });
  return lines.join('\n');
}

// =====================================================================
// Main
// =====================================================================

async function main() {
  var opts = parseArgs(process.argv);
  var tx = loadTaxonomy();
  var targets = enumerateSingleAxisURLs(tx, opts);
  if (opts.includeIntersections) {
    console.warn('[warn] --include-intersections requested but intersection enumeration is deferred to a later commission. Auditing single-axis only.');
  }
  if (opts.sample && targets.length > opts.sample) {
    targets = targets.slice(0, opts.sample);
  }
  console.log('[info] Topic-page audit start: ' + targets.length + ' single-axis URLs across ' + opts.locales.length + ' locales × ' + opts.axes.length + ' axes.');
  console.log('[info] Concurrency: ' + opts.concurrency + '. Base URL: ' + opts.baseUrl);

  var ctx = { hashSetByLocale: {} };
  var t0 = Date.now();

  var perPage = await runWithConcurrency(targets, opts.concurrency, async function (rec) {
    try {
      var res = await fetchURL(rec.url, opts.timeoutMs);
      return runChecks(Object.assign({}, rec, { status: res.status, body: res.body }), ctx);
    } catch (e) {
      return {
        url: rec.url, locale: rec.locale, axis: rec.axis, axisKey: rec.axisKey, slug: rec.slug,
        status: 0, checks: { fetch: { pass: false, error: e.message || String(e) } },
        defectClasses: ['FETCH_FAILED'], defectCount: 1, passAll: false
      };
    }
  });

  var elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('[info] Audit complete in ' + elapsed + 's.');

  var byLocale = summarizeByLocale(perPage);
  var stamp = utcStamp();

  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir, { recursive: true });
  var jsonPath = path.join(opts.outDir, 'topic-meta-curl-' + stamp + '.json');
  var mdPath = path.join(opts.outDir, 'topic-meta-curl-' + stamp + '.md');
  fs.writeFileSync(jsonPath, JSON.stringify({ opts: opts, byLocale: byLocale, perPage: perPage }, null, 2));
  fs.writeFileSync(mdPath, buildMarkdown(perPage, byLocale, opts, stamp));

  // Console summary
  console.log('');
  console.log('[summary]');
  Object.keys(byLocale).sort().forEach(function (loc) {
    var b = byLocale[loc];
    console.log('  ' + loc + ': ' + b.pass + ' / ' + b.total + ' pass (' + b.fail + ' fail; ' + b.fallbackCount + ' fallback, ' + b.tooShortCount + ' too short, ' + b.tooLongCount + ' too long, ' + b.nonUniqueCount + ' non-unique, ' + b.missingCount + ' missing)');
  });
  console.log('');
  console.log('[output] JSON: ' + jsonPath);
  console.log('[output] MD:   ' + mdPath);

  // Exit code: nonzero if any fail (useful for CI gate, but not required for first commission)
  var totalFail = perPage.reduce(function (n, r) { return n + (r.passAll ? 0 : 1); }, 0);
  process.exit(totalFail === 0 ? 0 : 1);
}

if (require.main === module) {
  main().catch(function (e) {
    console.error('[fatal] ' + (e.stack || e.message || String(e)));
    process.exit(2);
  });
}

module.exports = {
  sha1Normalized: sha1Normalized,
  extractMetaDescription: extractMetaDescription,
  enumerateSingleAxisURLs: enumerateSingleAxisURLs,
  FALLBACK_PATTERNS: FALLBACK_PATTERNS
};
