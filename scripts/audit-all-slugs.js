/**
 * STEPS 2+3: Match DB posts to source files and audit every slug
 *
 * Runs ON THE SERVER with database access.
 * Requires: ground-truth-slugs.json (uploaded alongside this script)
 *
 * What it does:
 * 1. Loads ground truth slugs from source files
 * 2. Queries ALL published blog posts from database
 * 3. Matches each DB post to a file number by English title (strict) then English slug
 * 4. Compares every DB locale slug against the ground truth
 * 5. Detects cross-locale slug contamination (e.g., German slug stored under Italian)
 * 6. Outputs mismatch-report.json with every fix needed
 *
 * Run: node scripts/audit-all-slugs.js
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../node_modules/@prisma/client');

const prisma = new PrismaClient();

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

/**
 * Normalize title for comparison
 */
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize slug for comparison (strip common suffixes that may differ)
 */
function normalizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/-(final-optimized|final|optimized)$/, '')
    .trim();
}

/**
 * Match a DB post to a ground truth file number
 * Strategy: strict English title match first, then English slug match
 */
function matchPostToFileNumber(post, groundTruth) {
  const dbEnTitle = post.translations?.en?.title;
  const dbEnSlug = post.slug;

  // Strategy 1: STRICT English title match (normalized)
  if (dbEnTitle) {
    const normalizedDbTitle = normalizeTitle(dbEnTitle);
    for (const [fileNum, locales] of Object.entries(groundTruth)) {
      if (locales.en && locales.en.title) {
        const normalizedFileTitle = normalizeTitle(locales.en.title);
        if (normalizedDbTitle === normalizedFileTitle) {
          return { fileNumber: fileNum, matchMethod: 'exact-title' };
        }
      }
    }
  }

  // Strategy 2: English slug match (normalized)
  if (dbEnSlug) {
    const normalizedDbSlug = normalizeSlug(dbEnSlug);
    for (const [fileNum, locales] of Object.entries(groundTruth)) {
      if (locales.en && locales.en.slug) {
        const normalizedFileSlug = normalizeSlug(locales.en.slug);
        if (normalizedDbSlug === normalizedFileSlug) {
          return { fileNumber: fileNum, matchMethod: 'exact-slug' };
        }
      }
    }
  }

  // Strategy 3: Match by ANY locale slug in DB matching ANY locale slug in ground truth
  // This catches posts whose primary slug was changed to a non-English slug
  for (const locale of ALL_LOCALES) {
    const dbLocaleSlug = post.translations?.[locale]?.slug;
    if (!dbLocaleSlug) continue;

    const normalizedDbLocaleSlug = normalizeSlug(dbLocaleSlug);
    for (const [fileNum, locales] of Object.entries(groundTruth)) {
      for (const [gtLocale, gtData] of Object.entries(locales)) {
        if (normalizeSlug(gtData.slug) === normalizedDbLocaleSlug) {
          return { fileNumber: fileNum, matchMethod: `slug-match-${locale}->${gtLocale}` };
        }
      }
    }
  }

  // Strategy 4: Substring title match (last resort, flagged as uncertain)
  if (dbEnTitle) {
    const normalizedDbTitle = normalizeTitle(dbEnTitle);
    for (const [fileNum, locales] of Object.entries(groundTruth)) {
      if (locales.en && locales.en.title) {
        const normalizedFileTitle = normalizeTitle(locales.en.title);
        if (normalizedDbTitle.length > 20 && normalizedFileTitle.length > 20) {
          if (normalizedFileTitle.includes(normalizedDbTitle) ||
              normalizedDbTitle.includes(normalizedFileTitle)) {
            return { fileNumber: fileNum, matchMethod: 'substring-title-UNCERTAIN' };
          }
        }
      }
    }
  }

  return null;
}

/**
 * For a given slug, find which locale it belongs to in the ground truth
 */
function detectSlugLocale(slug, fileNumber, groundTruth) {
  const normalizedSlug = normalizeSlug(slug);
  const postData = groundTruth[fileNumber];
  if (!postData) return null;

  for (const [locale, data] of Object.entries(postData)) {
    if (normalizeSlug(data.slug) === normalizedSlug) {
      return locale;
    }
  }
  return null; // Slug not found in any locale of this post
}

async function main() {
  console.log('=== BLOG SLUG AUDIT: DB vs Ground Truth ===\n');

  // Load ground truth
  const gtPath = path.join(__dirname, 'ground-truth-slugs.json');
  if (!fs.existsSync(gtPath)) {
    console.error('ERROR: ground-truth-slugs.json not found. Run build-ground-truth.js first.');
    process.exit(1);
  }
  const groundTruth = JSON.parse(fs.readFileSync(gtPath, 'utf8'));
  console.log(`Ground truth loaded: ${Object.keys(groundTruth).length} posts\n`);

  // Query all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });
  console.log(`Database posts: ${posts.length}\n`);

  const mapping = [];       // DB post ID -> file number mapping
  const mismatches = [];    // All slug mismatches found
  const unmatchedPosts = []; // Posts that couldn't be matched
  const stats = {
    totalComparisons: 0,
    matches: 0,
    mismatches: 0,
    missingSlugs: 0,
    seoImprovedSlugs: 0,
    wrongLanguageSlugs: 0,
    unknownSlugs: 0
  };

  for (const post of posts) {
    const match = matchPostToFileNumber(post, groundTruth);

    if (!match) {
      unmatchedPosts.push({
        postId: post.id,
        primarySlug: post.slug,
        enTitle: post.translations?.en?.title || 'NO EN TITLE'
      });
      continue;
    }

    const { fileNumber, matchMethod } = match;
    mapping.push({
      postId: post.id,
      fileNumber,
      matchMethod,
      primarySlug: post.slug
    });

    // Compare EVERY locale slug
    for (const locale of ALL_LOCALES) {
      const dbSlug = post.translations?.[locale]?.slug;
      const gtData = groundTruth[fileNumber]?.[locale];

      stats.totalComparisons++;

      if (!dbSlug) {
        // No slug stored for this locale in DB
        stats.missingSlugs++;
        if (gtData) {
          mismatches.push({
            postId: post.id,
            fileNumber,
            locale,
            currentSlug: null,
            expectedSlug: gtData.slug,
            issue: 'missing-slug',
            correctSlug: gtData.slug,
            action: 'add'
          });
        }
        continue;
      }

      if (!gtData) {
        // No ground truth for this locale (e.g., post 019/de)
        continue;
      }

      const normalizedDbSlug = normalizeSlug(dbSlug);
      const normalizedGtSlug = normalizeSlug(gtData.slug);

      if (normalizedDbSlug === normalizedGtSlug) {
        // Perfect match
        stats.matches++;
        continue;
      }

      // Slug differs - figure out why
      const detectedLocale = detectSlugLocale(dbSlug, fileNumber, groundTruth);

      if (detectedLocale && detectedLocale !== locale) {
        // WRONG LANGUAGE! This is the core bug.
        stats.wrongLanguageSlugs++;
        mismatches.push({
          postId: post.id,
          fileNumber,
          locale,
          currentSlug: dbSlug,
          detectedLanguage: detectedLocale,
          expectedSlug: gtData.slug,
          correctSlug: gtData.slug,
          issue: 'wrong-language',
          action: 'replace'
        });
      } else if (detectedLocale === locale) {
        // Same language but different slug - likely SEO improvement
        stats.seoImprovedSlugs++;
        // Don't flag as mismatch - this is intentional
      } else {
        // Slug not found in any ground truth locale for this post
        stats.unknownSlugs++;
        mismatches.push({
          postId: post.id,
          fileNumber,
          locale,
          currentSlug: dbSlug,
          detectedLanguage: null,
          expectedSlug: gtData.slug,
          correctSlug: gtData.slug,
          issue: 'unknown-slug',
          action: 'replace'
        });
      }
    }
  }

  // Print summary
  console.log('\n=== MATCHING RESULTS ===');
  console.log(`Matched to file numbers: ${mapping.length}`);
  console.log(`Unmatched posts: ${unmatchedPosts.length}`);
  if (unmatchedPosts.length > 0) {
    for (const p of unmatchedPosts) {
      console.log(`  UNMATCHED: ${p.primarySlug} - "${p.enTitle}"`);
    }
  }

  console.log('\n=== SLUG COMPARISON (${stats.totalComparisons} comparisons) ===');
  console.log(`Perfect matches: ${stats.matches}`);
  console.log(`Missing slugs: ${stats.missingSlugs}`);
  console.log(`WRONG LANGUAGE slugs: ${stats.wrongLanguageSlugs}`);
  console.log(`SEO-improved (same lang, diff slug): ${stats.seoImprovedSlugs}`);
  console.log(`Unknown slugs: ${stats.unknownSlugs}`);
  console.log(`Total mismatches to fix: ${mismatches.length}`);

  // Breakdown by locale
  console.log('\n=== MISMATCHES BY LOCALE ===');
  const byLocale = {};
  for (const m of mismatches) {
    byLocale[m.locale] = (byLocale[m.locale] || 0) + 1;
  }
  for (const [locale, count] of Object.entries(byLocale).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${locale}: ${count} mismatches`);
  }

  // Breakdown by issue type
  console.log('\n=== MISMATCHES BY ISSUE TYPE ===');
  const byIssue = {};
  for (const m of mismatches) {
    byIssue[m.issue] = (byIssue[m.issue] || 0) + 1;
  }
  for (const [issue, count] of Object.entries(byIssue)) {
    console.log(`  ${issue}: ${count}`);
  }

  // Show some examples
  console.log('\n=== SAMPLE WRONG-LANGUAGE MISMATCHES ===');
  const wrongLang = mismatches.filter(m => m.issue === 'wrong-language');
  for (const m of wrongLang.slice(0, 10)) {
    console.log(`  Post ${m.fileNumber} ${m.locale}: has "${m.currentSlug}" (${m.detectedLanguage}) -> should be "${m.correctSlug}"`);
  }

  // Write outputs
  const reportPath = path.join(__dirname, 'mismatch-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    stats,
    mismatches,
    unmatchedPosts,
    mapping
  }, null, 2), 'utf8');
  console.log(`\nReport written to: ${reportPath}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
