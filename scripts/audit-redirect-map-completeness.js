#!/usr/bin/env node
/**
 * Cross-Locale Redirect Map Completeness Audit
 *
 * 4-phase pipeline:
 *   Phase 1: Load & parse both data sources (redirect map + DB dump)
 *   Phase 2: Cross-reference — find gaps, stale entries, mismatches
 *   Phase 3: Live redirect testing (sample of ~40 URLs)
 *   Phase 4: Summary & JSON report
 *
 * Usage: node scripts/audit-redirect-map-completeness.js
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── Configuration ──────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

const REQUEST_DELAY_MS = 300;
const REQUEST_TIMEOUT_MS = 15000;
const USER_AGENT = 'LCS-Redirect-Map-Audit/1.0';
const BACKOFF_MS = 1000;

const REDIRECT_SAMPLES_PER_LOCALE = 3;   // wrong-locale redirect tests
const NATIVE_SAMPLES = 10;                // native-locale 200 tests

// ─── Utilities (reused from audit-live-hreflang.js) ─────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Fetch URL WITHOUT following redirects. Returns { statusCode, headers, body }.
 */
function fetchUrlNoRedirect(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      port: 443,
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html',
      },
      timeout: timeoutMs,
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        res.resume();
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: '',
        });
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
    req.end();
  });
}

// ─── Phase 1: Load & Parse Both Data Sources ────────────────────────────────────

function phase1_loadData() {
  console.log('\n' + '='.repeat(70));
  console.log('PHASE 1: Load & Parse Data Sources');
  console.log('='.repeat(70));

  // Load redirect map
  const redirectMapPath = path.join(__dirname, '..', 'frontend', 'config', 'blog-cross-locale-redirects.js');
  const { crossLocaleSlugs } = require(redirectMapPath);

  // Load DB dump
  const dbDumpPath = path.join(__dirname, 'db-slugs-dump.json');
  const dbDump = JSON.parse(fs.readFileSync(dbDumpPath, 'utf-8'));

  // Build redirect map structures
  const redirectMapBySlug = new Map();
  for (const entry of crossLocaleSlugs) {
    redirectMapBySlug.set(entry.slug, {
      nativeLocale: entry.nativeLocale,
      wrongLocales: entry.wrongLocales,
    });
  }

  // Build DB structures
  const dbSlugToLocales = new Map();   // slug -> Set of locales that use it
  const dbLocaleSlugPairs = new Set(); // "locale:slug" pairs
  const dbPostSlugs = new Map();       // postId -> { locale -> slug }

  for (const post of dbDump) {
    const locales = post.localeSlugs || {};
    dbPostSlugs.set(post.id, locales);

    for (const [locale, slug] of Object.entries(locales)) {
      if (!slug) continue;
      dbLocaleSlugPairs.add(`${locale}:${slug}`);

      if (!dbSlugToLocales.has(slug)) {
        dbSlugToLocales.set(slug, new Set());
      }
      dbSlugToLocales.get(slug).add(locale);
    }
  }

  // Count unique slugs
  const allDbSlugs = new Set();
  for (const post of dbDump) {
    for (const slug of Object.values(post.localeSlugs || {})) {
      if (slug) allDbSlugs.add(slug);
    }
  }

  console.log(`\n  Redirect map: ${crossLocaleSlugs.length} entries from blog-cross-locale-redirects.js`);
  console.log(`  DB dump:      ${dbDump.length} posts, ${dbLocaleSlugPairs.size} locale:slug pairs, ${allDbSlugs.size} unique slugs`);

  return {
    crossLocaleSlugs,
    redirectMapBySlug,
    dbDump,
    dbSlugToLocales,
    dbLocaleSlugPairs,
    dbPostSlugs,
    allDbSlugs,
  };
}

// ─── Phase 2: Cross-Reference — Find Gaps ───────────────────────────────────────

function phase2_crossReference(data) {
  console.log('\n' + '='.repeat(70));
  console.log('PHASE 2: Cross-Reference — Find Gaps');
  console.log('='.repeat(70));

  const {
    crossLocaleSlugs,
    redirectMapBySlug,
    dbSlugToLocales,
    dbLocaleSlugPairs,
    allDbSlugs,
  } = data;

  const issues = {
    dbSlugsNotInMap: [],
    mapSlugsNotInDb: [],
    nativeLocaleMismatches: [],
    wrongLocalesIncomplete: [],
    sharedSlugs: [],
  };

  // ── Check 1: DB slugs NOT in redirect map ──
  console.log('\n  Check 1: DB slugs not in redirect map...');
  for (const slug of allDbSlugs) {
    if (!redirectMapBySlug.has(slug)) {
      const locales = [...dbSlugToLocales.get(slug)];
      issues.dbSlugsNotInMap.push({ slug, dbLocales: locales });
    }
  }
  console.log(`    ${issues.dbSlugsNotInMap.length === 0 ? 'PASS' : 'FAIL'}: ${issues.dbSlugsNotInMap.length} DB slugs missing from redirect map`);
  if (issues.dbSlugsNotInMap.length > 0) {
    for (const item of issues.dbSlugsNotInMap.slice(0, 5)) {
      console.log(`      - "${item.slug}" (locales: ${item.dbLocales.join(', ')})`);
    }
    if (issues.dbSlugsNotInMap.length > 5) {
      console.log(`      ... and ${issues.dbSlugsNotInMap.length - 5} more`);
    }
  }

  // ── Check 2: Redirect map slugs NOT in DB (stale entries) ──
  console.log('\n  Check 2: Redirect map slugs not in DB (stale)...');
  for (const entry of crossLocaleSlugs) {
    if (!dbSlugToLocales.has(entry.slug)) {
      issues.mapSlugsNotInDb.push({
        slug: entry.slug,
        mapNativeLocale: entry.nativeLocale,
      });
    }
  }
  console.log(`    ${issues.mapSlugsNotInDb.length === 0 ? 'PASS' : 'FAIL'}: ${issues.mapSlugsNotInDb.length} redirect map slugs not found in DB`);
  if (issues.mapSlugsNotInDb.length > 0) {
    for (const item of issues.mapSlugsNotInDb.slice(0, 5)) {
      console.log(`      - "${item.slug}" (map says: ${item.mapNativeLocale})`);
    }
    if (issues.mapSlugsNotInDb.length > 5) {
      console.log(`      ... and ${issues.mapSlugsNotInDb.length - 5} more`);
    }
  }

  // ── Check 3: Native locale mismatches ──
  console.log('\n  Check 3: Native locale mismatches...');
  for (const entry of crossLocaleSlugs) {
    const dbLocales = dbSlugToLocales.get(entry.slug);
    if (!dbLocales) continue; // Already caught in check 2

    // The native locale in the map should match one of the DB locales for this slug
    if (!dbLocales.has(entry.nativeLocale)) {
      issues.nativeLocaleMismatches.push({
        slug: entry.slug,
        mapNativeLocale: entry.nativeLocale,
        dbLocales: [...dbLocales],
      });
    }
  }
  console.log(`    ${issues.nativeLocaleMismatches.length === 0 ? 'PASS' : 'FAIL'}: ${issues.nativeLocaleMismatches.length} native locale mismatches`);
  if (issues.nativeLocaleMismatches.length > 0) {
    for (const item of issues.nativeLocaleMismatches.slice(0, 5)) {
      console.log(`      - "${item.slug}": map says ${item.mapNativeLocale}, DB has [${item.dbLocales.join(', ')}]`);
    }
  }

  // ── Check 4: Wrong locales incomplete ──
  console.log('\n  Check 4: Wrong locales completeness...');
  for (const entry of crossLocaleSlugs) {
    const dbLocales = dbSlugToLocales.get(entry.slug);
    if (!dbLocales) continue;

    // Expected wrongLocales = ALL_LOCALES minus the nativeLocale
    const expectedWrong = ALL_LOCALES.filter(l => l !== entry.nativeLocale);
    const actualWrong = new Set(entry.wrongLocales);

    const missingWrong = expectedWrong.filter(l => !actualWrong.has(l));
    const extraWrong = entry.wrongLocales.filter(l => l === entry.nativeLocale);

    if (missingWrong.length > 0 || extraWrong.length > 0) {
      issues.wrongLocalesIncomplete.push({
        slug: entry.slug,
        nativeLocale: entry.nativeLocale,
        missingWrongLocales: missingWrong,
        extraWrongLocales: extraWrong,
      });
    }
  }
  console.log(`    ${issues.wrongLocalesIncomplete.length === 0 ? 'PASS' : 'FAIL'}: ${issues.wrongLocalesIncomplete.length} entries with incomplete wrongLocales`);
  if (issues.wrongLocalesIncomplete.length > 0) {
    for (const item of issues.wrongLocalesIncomplete.slice(0, 5)) {
      console.log(`      - "${item.slug}" (native: ${item.nativeLocale}): missing=[${item.missingWrongLocales.join(',')}], extra=[${item.extraWrongLocales.join(',')}]`);
    }
  }

  // ── Check 5: Shared slugs (same slug used by multiple locales) ──
  console.log('\n  Check 5: Shared slugs (same slug, multiple locales)...');
  for (const [slug, locales] of dbSlugToLocales) {
    if (locales.size > 1) {
      const mapEntry = redirectMapBySlug.get(slug);
      issues.sharedSlugs.push({
        slug,
        dbLocales: [...locales],
        mapNativeLocale: mapEntry ? mapEntry.nativeLocale : null,
        inMap: !!mapEntry,
      });
    }
  }
  console.log(`    INFO: ${issues.sharedSlugs.length} slugs shared across multiple locales`);
  if (issues.sharedSlugs.length > 0) {
    for (const item of issues.sharedSlugs.slice(0, 5)) {
      console.log(`      - "${item.slug}" used by [${item.dbLocales.join(', ')}], map native: ${item.mapNativeLocale || 'NOT IN MAP'}`);
    }
    if (issues.sharedSlugs.length > 5) {
      console.log(`      ... and ${issues.sharedSlugs.length - 5} more`);
    }
  }

  // Summary
  const totalIssues = issues.dbSlugsNotInMap.length
    + issues.mapSlugsNotInDb.length
    + issues.nativeLocaleMismatches.length
    + issues.wrongLocalesIncomplete.length;

  console.log(`\n  Cross-reference total issues: ${totalIssues}`);

  return issues;
}

// ─── Phase 3: Live Redirect Testing ─────────────────────────────────────────────

async function phase3_liveTests(data) {
  console.log('\n' + '='.repeat(70));
  console.log('PHASE 3: Live Redirect Testing');
  console.log('='.repeat(70));

  const { crossLocaleSlugs } = data;
  const results = [];

  // ── Part A: Test wrong-locale redirects (should get 301) ──
  console.log(`\n  Part A: Wrong-locale redirect tests (${REDIRECT_SAMPLES_PER_LOCALE} per locale = ${REDIRECT_SAMPLES_PER_LOCALE * ALL_LOCALES.length} tests)...`);

  // Group entries by nativeLocale so we sample across all locales
  const byNativeLocale = new Map();
  for (const entry of crossLocaleSlugs) {
    if (!byNativeLocale.has(entry.nativeLocale)) {
      byNativeLocale.set(entry.nativeLocale, []);
    }
    byNativeLocale.get(entry.nativeLocale).push(entry);
  }

  const redirectTestPairs = [];
  for (const locale of ALL_LOCALES) {
    const entries = byNativeLocale.get(locale) || [];
    const sampled = shuffle(entries).slice(0, REDIRECT_SAMPLES_PER_LOCALE);
    for (const entry of sampled) {
      // Pick a random wrong locale for this slug
      const wrongLocale = shuffle(entry.wrongLocales)[0];
      redirectTestPairs.push({
        slug: entry.slug,
        nativeLocale: entry.nativeLocale,
        wrongLocale,
        expectRedirect: true,
      });
    }
  }

  // ── Part B: Test native-locale access (should get 200) ──
  console.log(`  Part B: Native-locale 200 tests (${NATIVE_SAMPLES} tests)...`);

  const nativeTestPairs = [];
  const allShuffled = shuffle(crossLocaleSlugs);
  for (const entry of allShuffled.slice(0, NATIVE_SAMPLES)) {
    nativeTestPairs.push({
      slug: entry.slug,
      nativeLocale: entry.nativeLocale,
      wrongLocale: null,
      expectRedirect: false,
    });
  }

  const allTests = [...redirectTestPairs, ...nativeTestPairs];
  console.log(`\n  Total live tests: ${allTests.length} (${redirectTestPairs.length} redirect + ${nativeTestPairs.length} native)\n`);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < allTests.length; i++) {
    const test = allTests[i];
    const testLocale = test.expectRedirect ? test.wrongLocale : test.nativeLocale;
    const url = `${BASE_URL}/${testLocale}/blog/${test.slug}`;

    const label = `[${i + 1}/${allTests.length}]`;
    let result;

    try {
      const response = await fetchUrlNoRedirect(url);

      if (test.expectRedirect) {
        // Expect 301 → /{nativeLocale}/blog/{slug}
        const expectedDest = `/${test.nativeLocale}/blog/${test.slug}`;
        const location = response.headers.location || '';
        // Location may be absolute or relative
        const locationPath = location.startsWith('http')
          ? new URL(location).pathname
          : location;

        if (response.statusCode === 301 && locationPath === expectedDest) {
          result = { status: 'PASS', detail: `301 → ${locationPath}` };
          passed++;
          console.log(`  ${label} PASS  /${testLocale}/blog/...  → 301 → /${test.nativeLocale}/blog/...`);
        } else {
          result = {
            status: 'FAIL',
            detail: `Expected 301→${expectedDest}, got ${response.statusCode}→${locationPath || '(none)'}`,
          };
          failed++;
          console.log(`  ${label} FAIL  /${testLocale}/blog/${test.slug.slice(0, 40)}...`);
          console.log(`         Expected: 301 → ${expectedDest}`);
          console.log(`         Got:      ${response.statusCode} → ${locationPath || '(no Location header)'}`);
        }
      } else {
        // Expect 200 (no redirect) for native locale
        if (response.statusCode === 200) {
          result = { status: 'PASS', detail: '200 OK' };
          passed++;
          console.log(`  ${label} PASS  /${testLocale}/blog/...  → 200 OK`);
        } else {
          result = {
            status: 'FAIL',
            detail: `Expected 200, got ${response.statusCode}`,
          };
          failed++;
          console.log(`  ${label} FAIL  /${testLocale}/blog/${test.slug.slice(0, 40)}...`);
          console.log(`         Expected: 200, Got: ${response.statusCode}`);
        }
      }
    } catch (err) {
      // Retry once on 429
      if (err.message && err.message.includes('429')) {
        console.log(`  ${label} 429 — backing off ${BACKOFF_MS}ms...`);
        await sleep(BACKOFF_MS);
        try {
          const retryResp = await fetchUrlNoRedirect(url);
          if (test.expectRedirect) {
            const expectedDest = `/${test.nativeLocale}/blog/${test.slug}`;
            const locationPath = (retryResp.headers.location || '').startsWith('http')
              ? new URL(retryResp.headers.location).pathname
              : (retryResp.headers.location || '');
            if (retryResp.statusCode === 301 && locationPath === expectedDest) {
              result = { status: 'PASS', detail: `301 → ${locationPath} (retry)` };
              passed++;
            } else {
              result = { status: 'FAIL', detail: `Retry: ${retryResp.statusCode}→${locationPath}` };
              failed++;
            }
          } else {
            if (retryResp.statusCode === 200) {
              result = { status: 'PASS', detail: '200 OK (retry)' };
              passed++;
            } else {
              result = { status: 'FAIL', detail: `Retry: ${retryResp.statusCode}` };
              failed++;
            }
          }
        } catch (retryErr) {
          result = { status: 'ERROR', detail: retryErr.message };
          failed++;
        }
      } else {
        result = { status: 'ERROR', detail: err.message };
        failed++;
        console.log(`  ${label} ERROR /${testLocale}/blog/${test.slug.slice(0, 40)}... — ${err.message}`);
      }
    }

    results.push({
      slug: test.slug,
      testLocale,
      nativeLocale: test.nativeLocale,
      expectRedirect: test.expectRedirect,
      ...result,
    });

    await sleep(REQUEST_DELAY_MS);
  }

  console.log(`\n  Live test results: ${passed} passed, ${failed} failed out of ${allTests.length}`);

  return { tested: allTests.length, passed, failed, results };
}

// ─── Phase 4: Summary & Report ──────────────────────────────────────────────────

function phase4_report(data, crossRefIssues, liveTestResults) {
  console.log('\n' + '='.repeat(70));
  console.log('PHASE 4: Summary & Report');
  console.log('='.repeat(70));

  const { crossLocaleSlugs, allDbSlugs, dbLocaleSlugPairs } = data;

  const totalIssues = crossRefIssues.dbSlugsNotInMap.length
    + crossRefIssues.mapSlugsNotInDb.length
    + crossRefIssues.nativeLocaleMismatches.length
    + crossRefIssues.wrongLocalesIncomplete.length;

  const report = {
    generatedAt: new Date().toISOString(),
    sources: {
      redirectMap: {
        entries: crossLocaleSlugs.length,
        file: 'frontend/config/blog-cross-locale-redirects.js',
        generated: '2026-02-11T14:35:02.426Z',
      },
      dbDump: {
        posts: data.dbDump.length,
        localeSlugPairs: dbLocaleSlugPairs.size,
        uniqueSlugs: allDbSlugs.size,
      },
    },
    crossReference: {
      dbSlugsNotInMap: crossRefIssues.dbSlugsNotInMap,
      mapSlugsNotInDb: crossRefIssues.mapSlugsNotInDb,
      nativeLocaleMismatches: crossRefIssues.nativeLocaleMismatches,
      wrongLocalesIncomplete: crossRefIssues.wrongLocalesIncomplete,
      sharedSlugs: crossRefIssues.sharedSlugs,
    },
    liveRedirectTests: liveTestResults,
    summary: {
      mapIsComplete: totalIssues === 0,
      totalCrossRefIssues: totalIssues,
      liveTestsPassed: liveTestResults.passed === liveTestResults.tested,
    },
  };

  // Write report
  const outputDir = path.join(__dirname, '..', 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'redirect-map-completeness.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n  Report written to: docs/audit-results/redirect-map-completeness.json`);

  // Final summary
  console.log('\n' + '='.repeat(70));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(70));

  const checks = [
    ['DB slugs in map', crossRefIssues.dbSlugsNotInMap.length === 0],
    ['No stale map entries', crossRefIssues.mapSlugsNotInDb.length === 0],
    ['Native locale correct', crossRefIssues.nativeLocaleMismatches.length === 0],
    ['Wrong locales complete', crossRefIssues.wrongLocalesIncomplete.length === 0],
    ['Live redirect tests', liveTestResults.passed === liveTestResults.tested],
  ];

  for (const [name, ok] of checks) {
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}`);
  }

  console.log(`\n  Shared slugs (info): ${crossRefIssues.sharedSlugs.length}`);
  console.log(`  Total cross-ref issues: ${totalIssues}`);
  console.log(`  Live tests: ${liveTestResults.passed}/${liveTestResults.tested} passed`);

  const allGood = totalIssues === 0 && liveTestResults.passed === liveTestResults.tested;
  console.log(`\n  Overall: ${allGood ? 'ALL CHECKS PASSED' : 'ISSUES FOUND — see report for details'}`);
  console.log('='.repeat(70) + '\n');

  return report;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Cross-Locale Redirect Map Completeness Audit');
  console.log('LessonCraftStudio — Part 4 of THE PERFECT SEO');

  // Phase 1
  const data = phase1_loadData();

  // Phase 2
  const crossRefIssues = phase2_crossReference(data);

  // Phase 3
  const liveTestResults = await phase3_liveTests(data);

  // Phase 4
  phase4_report(data, crossRefIssues, liveTestResults);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
