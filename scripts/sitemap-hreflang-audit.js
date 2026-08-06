#!/usr/bin/env node
/**
 * Sitemap & Hreflang Audit Script for LessonCraftStudio
 *
 * Part 1: Sitemap completeness audit (all 112 posts x 11 locales = 1,232 blog URLs)
 * Part 2: Hreflang spot-check (5 random + 4 known problem posts)
 * Part 3: Cross-locale hreflang symmetry verification
 */

const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Configuration ──────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];
const EXPECTED_PER_LOCALE = 112;
const REQUEST_DELAY_MS = 500;
const REQUEST_TIMEOUT_MS = 10000;

const PROBLEM_POSTS = [
  'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
  'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
  'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
  'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
];

// Affected locales for each problem post (for targeted checking)
const PROBLEM_LOCALES = {
  'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces': ['es'],
  'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9': ['da'],
  'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11': ['it'],
  'early-childhood-prek-k-developmentally-appropriate-worksheet-activities': ['fi'],
};

// ─── Utilities ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUrl(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs, headers: { 'User-Agent': 'LCS-SEO-Audit/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        fetchUrl(redirectUrl, timeoutMs).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout after ${timeoutMs}ms for ${url}`));
    });
  });
}

function extractFromXml(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'g');
  const results = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

function extractHreflangTags(html) {
  // Match <link rel="alternate" hreflang="..." href="..." />
  const regex = /<link\s+[^>]*rel=["']alternate["'][^>]*>/gi;
  const tags = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const hreflangMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hreflangMatch && hrefMatch) {
      tags.push({
        hreflang: hreflangMatch[1],
        href: hrefMatch[1],
      });
    }
  }
  return tags;
}

function parseBlogUrl(url) {
  // Pattern: https://www.lessoncraftstudio.com/{locale}/blog/{slug}
  const match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/blog\/([^/?#]+)/);
  if (match) {
    return { locale: match[1], slug: match[2] };
  }
  return null;
}

// ─── Load DB Data ───────────────────────────────────────────────────────────────

function loadDbSlugs() {
  const filePath = path.join(__dirname, 'db-slugs-dump.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
}

// ─── PART 1: Sitemap Audit ──────────────────────────────────────────────────────

async function auditSitemap(dbPosts) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PART 1: SITEMAP AUDIT');
  console.log('='.repeat(80));
  console.log('');

  // Step 1: Fetch sitemap index
  console.log('[1.1] Fetching sitemap index...');
  let sitemapXml;
  try {
    sitemapXml = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  } catch (err) {
    console.log(`  ERROR: Could not fetch sitemap.xml: ${err.message}`);
    return { blogUrls: new Map() };
  }

  // Check if it's a sitemap index (contains <sitemapindex>)
  const isSitemapIndex = sitemapXml.includes('<sitemapindex');
  console.log(`  Type: ${isSitemapIndex ? 'Sitemap Index' : 'Single Sitemap'}`);

  let allSitemapUrls = [];

  if (isSitemapIndex) {
    // Extract child sitemap URLs
    const childSitemaps = extractFromXml(sitemapXml, 'loc');
    console.log(`  Found ${childSitemaps.length} child sitemaps:`);
    childSitemaps.forEach(url => console.log(`    - ${url}`));
    console.log('');

    // Fetch each child sitemap
    console.log('[1.2] Fetching child sitemaps...');
    for (const childUrl of childSitemaps) {
      await sleep(REQUEST_DELAY_MS);
      try {
        const childXml = await fetchUrl(childUrl);
        const urls = extractFromXml(childXml, 'loc');
        console.log(`  ${childUrl.split('/').pop()}: ${urls.length} URLs`);
        allSitemapUrls.push(...urls);
      } catch (err) {
        console.log(`  ERROR fetching ${childUrl}: ${err.message}`);
      }
    }
  } else {
    allSitemapUrls = extractFromXml(sitemapXml, 'loc');
    console.log(`  Found ${allSitemapUrls.length} URLs in single sitemap`);
  }

  console.log(`\n  Total URLs across all sitemaps: ${allSitemapUrls.length}`);

  // Step 2: Filter blog URLs
  console.log('\n[1.3] Analyzing blog URLs...');
  const blogUrlsByLocale = new Map();
  ALL_LOCALES.forEach(loc => blogUrlsByLocale.set(loc, []));

  let nonBlogCount = 0;
  for (const url of allSitemapUrls) {
    const parsed = parseBlogUrl(url);
    if (parsed && ALL_LOCALES.includes(parsed.locale)) {
      blogUrlsByLocale.get(parsed.locale).push(parsed.slug);
    } else if (url.includes('/blog/')) {
      // Blog URL with unexpected locale
      console.log(`  WARNING: Blog URL with unknown locale: ${url}`);
    } else {
      nonBlogCount++;
    }
  }

  // Step 3: Count per locale
  console.log('\n  Blog URLs per locale:');
  console.log('  ' + '-'.repeat(50));
  let totalBlogUrls = 0;
  const localesWithIssues = [];
  for (const locale of ALL_LOCALES) {
    const count = blogUrlsByLocale.get(locale).length;
    totalBlogUrls += count;
    const status = count === EXPECTED_PER_LOCALE ? 'OK' : `MISMATCH (expected ${EXPECTED_PER_LOCALE})`;
    const flag = count === EXPECTED_PER_LOCALE ? '  ' : '!!';
    console.log(`  ${flag} ${locale}: ${count} ${count !== EXPECTED_PER_LOCALE ? '  <-- ' + status : ''}`);
    if (count !== EXPECTED_PER_LOCALE) {
      localesWithIssues.push({ locale, count });
    }
  }
  console.log('  ' + '-'.repeat(50));
  console.log(`  Total blog URLs: ${totalBlogUrls} (expected ${EXPECTED_PER_LOCALE * ALL_LOCALES.length})`);
  console.log(`  Non-blog URLs: ${nonBlogCount}`);

  if (localesWithIssues.length > 0) {
    console.log('\n  ISSUES FOUND:');
    localesWithIssues.forEach(({ locale, count }) => {
      const diff = count - EXPECTED_PER_LOCALE;
      console.log(`  - ${locale}: ${diff > 0 ? '+' : ''}${diff} (${count} vs expected ${EXPECTED_PER_LOCALE})`);
    });
  } else {
    console.log('\n  All locales have exactly 112 blog entries.');
  }

  // Step 4: Cross-reference with DB
  console.log('\n[1.4] Cross-referencing with database...');

  // Build DB slug sets per locale
  const dbSlugsByLocale = new Map();
  ALL_LOCALES.forEach(loc => dbSlugsByLocale.set(loc, new Set()));
  for (const post of dbPosts) {
    for (const locale of ALL_LOCALES) {
      if (post.localeSlugs[locale]) {
        dbSlugsByLocale.get(locale).add(post.localeSlugs[locale]);
      }
    }
  }

  let totalMissing = 0;
  let totalExtra = 0;

  for (const locale of ALL_LOCALES) {
    const sitemapSlugs = new Set(blogUrlsByLocale.get(locale));
    const dbSlugs = dbSlugsByLocale.get(locale);

    const missingFromSitemap = [...dbSlugs].filter(slug => !sitemapSlugs.has(slug));
    const notInDb = [...sitemapSlugs].filter(slug => !dbSlugs.has(slug));

    if (missingFromSitemap.length > 0 || notInDb.length > 0) {
      console.log(`\n  [${locale}]:`);
      if (missingFromSitemap.length > 0) {
        totalMissing += missingFromSitemap.length;
        console.log(`    DB slugs MISSING from sitemap (${missingFromSitemap.length}):`);
        missingFromSitemap.forEach(slug => console.log(`      - ${slug}`));
      }
      if (notInDb.length > 0) {
        totalExtra += notInDb.length;
        console.log(`    Sitemap URLs NOT in DB (${notInDb.length}):`);
        notInDb.forEach(slug => console.log(`      - ${slug}`));
      }
    }
  }

  if (totalMissing === 0 && totalExtra === 0) {
    console.log('  Perfect match: All DB slugs found in sitemap, no extra URLs in sitemap.');
  } else {
    console.log(`\n  SUMMARY: ${totalMissing} DB slugs missing from sitemap, ${totalExtra} sitemap URLs not in DB`);
  }

  return { blogUrlsByLocale };
}

// ─── PART 2: Hreflang Spot-Check ────────────────────────────────────────────────

async function auditHreflang(dbPosts) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PART 2: HREFLANG SPOT-CHECK');
  console.log('='.repeat(80));
  console.log('');

  // Pick 5 random posts
  const shuffled = [...dbPosts].sort(() => Math.random() - 0.5);
  const randomPosts = shuffled.slice(0, 5);

  console.log('[2.1] Selected 5 random posts for hreflang check:');
  randomPosts.forEach((p, i) => console.log(`  ${i + 1}. ${p.primarySlug}`));
  console.log('');

  const allCheckResults = [];

  // Check random posts (English page only)
  console.log('[2.2] Checking hreflang tags on random posts (English page)...\n');
  for (const post of randomPosts) {
    const result = await checkHreflangForPost(post, 'en', dbPosts);
    allCheckResults.push(result);
  }

  // Check problem posts
  console.log('\n[2.3] Checking 4 known problem posts...\n');
  for (const primarySlug of PROBLEM_POSTS) {
    const post = dbPosts.find(p => p.primarySlug === primarySlug);
    if (!post) {
      console.log(`  ERROR: Problem post not found in DB: ${primarySlug}`);
      continue;
    }

    // Check English page
    const enResult = await checkHreflangForPost(post, 'en', dbPosts);
    allCheckResults.push(enResult);

    // Check affected locale pages
    const affectedLocales = PROBLEM_LOCALES[primarySlug] || [];
    for (const locale of affectedLocales) {
      const locResult = await checkHreflangForPost(post, locale, dbPosts);
      allCheckResults.push(locResult);

      // Compare hreflang tags between English and affected locale
      if (enResult.tags && locResult.tags) {
        console.log(`    Comparing EN vs ${locale.toUpperCase()} hreflang tags:`);
        const enHreflangs = new Set(enResult.tags.map(t => `${t.hreflang}=${t.href}`));
        const locHreflangs = new Set(locResult.tags.map(t => `${t.hreflang}=${t.href}`));

        const onlyInEn = [...enHreflangs].filter(x => !locHreflangs.has(x));
        const onlyInLoc = [...locHreflangs].filter(x => !enHreflangs.has(x));

        if (onlyInEn.length === 0 && onlyInLoc.length === 0) {
          console.log(`      Hreflang tags are IDENTICAL between EN and ${locale.toUpperCase()} pages.`);
        } else {
          if (onlyInEn.length > 0) {
            console.log(`      Only in EN page (${onlyInEn.length}):`);
            onlyInEn.forEach(x => console.log(`        - ${x}`));
          }
          if (onlyInLoc.length > 0) {
            console.log(`      Only in ${locale.toUpperCase()} page (${onlyInLoc.length}):`);
            onlyInLoc.forEach(x => console.log(`        - ${x}`));
          }
        }
        console.log('');
      }
    }
  }

  return allCheckResults;
}

async function checkHreflangForPost(post, fetchLocale, dbPosts) {
  const slug = post.localeSlugs[fetchLocale];
  const url = `${BASE_URL}/${fetchLocale}/blog/${slug}`;
  const label = `${post.primarySlug.substring(0, 50)}... [${fetchLocale}]`;

  console.log(`  Checking: /${fetchLocale}/blog/${slug.substring(0, 60)}...`);

  await sleep(REQUEST_DELAY_MS);

  let html;
  try {
    html = await fetchUrl(url);
  } catch (err) {
    console.log(`    ERROR: ${err.message}`);
    return { post, fetchLocale, error: err.message, tags: null };
  }

  const tags = extractHreflangTags(html);
  const issues = [];

  // Check 1: All 11 locales present
  const foundLocales = tags.filter(t => t.hreflang !== 'x-default').map(t => t.hreflang);
  const missingLocales = ALL_LOCALES.filter(loc => !foundLocales.includes(loc));
  const extraLocales = foundLocales.filter(loc => !ALL_LOCALES.includes(loc));

  if (missingLocales.length > 0) {
    issues.push(`MISSING locales: ${missingLocales.join(', ')}`);
  }
  if (extraLocales.length > 0) {
    issues.push(`UNEXPECTED locales: ${extraLocales.join(', ')}`);
  }

  // Check 2: Correct slugs
  for (const tag of tags) {
    if (tag.hreflang === 'x-default') continue;
    const locale = tag.hreflang;
    const expectedSlug = post.localeSlugs[locale];
    if (expectedSlug) {
      const parsed = parseBlogUrl(tag.href);
      if (parsed) {
        if (parsed.slug !== expectedSlug) {
          issues.push(`WRONG SLUG for ${locale}: got "${parsed.slug}" expected "${expectedSlug}"`);
        }
        if (parsed.locale !== locale) {
          issues.push(`WRONG LOCALE PREFIX for ${locale}: href uses /${parsed.locale}/ instead of /${locale}/`);
        }
      } else {
        issues.push(`UNPARSEABLE href for ${locale}: ${tag.href}`);
      }
    }
  }

  // Check 3: No duplicate hreflang entries
  const hreflangValues = tags.map(t => t.hreflang);
  const duplicates = hreflangValues.filter((v, i) => hreflangValues.indexOf(v) !== i);
  if (duplicates.length > 0) {
    issues.push(`DUPLICATE hreflang entries: ${[...new Set(duplicates)].join(', ')}`);
  }

  // Check 4: x-default points to English
  const xDefault = tags.find(t => t.hreflang === 'x-default');
  if (!xDefault) {
    issues.push('MISSING x-default hreflang');
  } else {
    const parsed = parseBlogUrl(xDefault.href);
    if (parsed && parsed.locale !== 'en') {
      issues.push(`x-default points to /${parsed.locale}/ instead of /en/`);
    }
    if (parsed) {
      const expectedEnSlug = post.localeSlugs['en'];
      if (parsed.slug !== expectedEnSlug) {
        issues.push(`x-default has wrong slug: "${parsed.slug}" expected "${expectedEnSlug}"`);
      }
    }
  }

  // Report
  if (issues.length === 0) {
    console.log(`    PASS: ${tags.length} hreflang tags, all correct (${ALL_LOCALES.length} locales + x-default)`);
  } else {
    console.log(`    FAIL: ${issues.length} issue(s):`);
    issues.forEach(issue => console.log(`      - ${issue}`));
  }

  return { post, fetchLocale, tags, issues };
}

// ─── PART 3: Cross-Locale Hreflang Consistency ──────────────────────────────────

async function auditCrossLocaleConsistency(dbPosts, checkResults) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PART 3: CROSS-LOCALE HREFLANG CONSISTENCY (SYMMETRY CHECK)');
  console.log('='.repeat(80));
  console.log('');

  // Collect unique posts we've already checked
  const checkedPosts = new Map();
  for (const result of checkResults) {
    if (result.post && !result.error) {
      checkedPosts.set(result.post.primarySlug, result.post);
    }
  }

  console.log(`Checking symmetry for ${checkedPosts.size} posts across 2-3 locale versions each...\n`);

  let totalAsymmetries = 0;
  let totalChecked = 0;

  for (const [primarySlug, post] of checkedPosts) {
    console.log(`  Post: ${primarySlug.substring(0, 65)}...`);

    // Pick 3 locales to check (en + 2 others)
    const localesToCheck = ['en'];
    const otherLocales = ALL_LOCALES.filter(l => l !== 'en').sort(() => Math.random() - 0.5);
    localesToCheck.push(otherLocales[0], otherLocales[1]);

    // Fetch hreflang tags for each locale version
    const localeTagsMap = new Map();

    for (const locale of localesToCheck) {
      const slug = post.localeSlugs[locale];
      const url = `${BASE_URL}/${locale}/blog/${slug}`;

      await sleep(REQUEST_DELAY_MS);

      try {
        const html = await fetchUrl(url);
        const tags = extractHreflangTags(html);
        localeTagsMap.set(locale, tags);
      } catch (err) {
        console.log(`    ERROR fetching ${locale}: ${err.message}`);
      }
    }

    // Check symmetry between all pairs
    const fetchedLocales = [...localeTagsMap.keys()];
    let postAsymmetries = 0;

    for (let i = 0; i < fetchedLocales.length; i++) {
      for (let j = i + 1; j < fetchedLocales.length; j++) {
        const locA = fetchedLocales[i];
        const locB = fetchedLocales[j];
        const tagsA = localeTagsMap.get(locA);
        const tagsB = localeTagsMap.get(locB);

        // Does page A point to page B?
        const slugB = post.localeSlugs[locB];
        const aPointsToB = tagsA.some(t => {
          const parsed = parseBlogUrl(t.href);
          return parsed && parsed.locale === locB && parsed.slug === slugB;
        });

        // Does page B point to page A?
        const slugA = post.localeSlugs[locA];
        const bPointsToA = tagsB.some(t => {
          const parsed = parseBlogUrl(t.href);
          return parsed && parsed.locale === locA && parsed.slug === slugA;
        });

        totalChecked++;

        if (aPointsToB && bPointsToA) {
          // Symmetric - good
        } else {
          postAsymmetries++;
          totalAsymmetries++;
          if (!aPointsToB) {
            console.log(`    ASYMMETRY: /${locA}/ page does NOT link to /${locB}/ version`);
          }
          if (!bPointsToA) {
            console.log(`    ASYMMETRY: /${locB}/ page does NOT link to /${locA}/ version`);
          }
        }
      }
    }

    // Also verify all locale versions have the same set of hreflang tags
    if (localeTagsMap.size >= 2) {
      const tagSets = [...localeTagsMap.entries()].map(([locale, tags]) => {
        const sorted = tags
          .map(t => `${t.hreflang}=${t.href}`)
          .sort()
          .join('|');
        return { locale, fingerprint: sorted };
      });

      const allSame = tagSets.every(ts => ts.fingerprint === tagSets[0].fingerprint);
      if (allSame) {
        console.log(`    Hreflang tags IDENTICAL across ${fetchedLocales.join(', ')} - SYMMETRIC`);
      } else {
        console.log(`    Hreflang tags DIFFER across locale versions:`);
        for (const ts of tagSets) {
          const count = ts.fingerprint.split('|').length;
          console.log(`      ${ts.locale}: ${count} entries`);
        }
      }
    }

    if (postAsymmetries === 0) {
      console.log(`    PASS: All locale pairs symmetric`);
    }
    console.log('');
  }

  console.log(`  SYMMETRY SUMMARY: ${totalChecked} pairs checked, ${totalAsymmetries} asymmetries found`);
  if (totalAsymmetries === 0) {
    console.log('  All cross-locale hreflang links are properly symmetric.');
  }
}

// ─── MAIN ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('='.repeat(80));
  console.log('  LESSONCRAFTSTUDIO SITEMAP & HREFLANG AUDIT');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(80));

  const dbPosts = loadDbSlugs();
  console.log(`\nLoaded ${dbPosts.length} posts from DB dump with ${ALL_LOCALES.length} locales each.`);
  console.log(`Expected total blog URLs in sitemap: ${dbPosts.length * ALL_LOCALES.length}`);

  // Part 1
  const { blogUrlsByLocale } = await auditSitemap(dbPosts);

  // Part 2
  const checkResults = await auditHreflang(dbPosts);

  // Part 3
  await auditCrossLocaleConsistency(dbPosts, checkResults);

  // Final summary
  console.log('');
  console.log('='.repeat(80));
  console.log('  AUDIT COMPLETE');
  console.log('='.repeat(80));
  console.log('');

  // Count issues from Part 2
  const part2Issues = checkResults.filter(r => r.issues && r.issues.length > 0);
  const part2Errors = checkResults.filter(r => r.error);

  console.log(`  Part 1 (Sitemap): See details above`);
  console.log(`  Part 2 (Hreflang): ${checkResults.length} pages checked, ${part2Issues.length} with issues, ${part2Errors.length} fetch errors`);
  console.log(`  Part 3 (Symmetry): See details above`);
  console.log('');
}

main().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
