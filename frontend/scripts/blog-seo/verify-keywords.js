#!/usr/bin/env node
/**
 * Blog SEO Keyword Verification Script
 *
 * Audits blog posts to verify keyword placement meets requirements:
 * - 7 universal keywords (10+ occurrences each)
 * - 10 local keywords (10+ occurrences each)
 * - 20+ keywords in headings
 * - metaTitle (55-60 chars)
 * - metaDescription (155-160 chars)
 * - focusKeyword set
 */

const { PrismaClient } = require('@prisma/client');
const {
  getUniversalKeywords,
  getLocalKeywords,
  MINIMUM_KEYWORD_COUNT,
  MINIMUM_KEYWORDS_IN_HEADINGS,
  META_TITLE_MIN,
  META_TITLE_MAX,
  META_DESC_MIN,
  META_DESC_MAX,
  LANGUAGE_NAMES
} = require('./config/keywords');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Count occurrences of a keyword in content (case-insensitive)
 */
function countKeyword(content, keyword) {
  if (!content || !keyword) return 0;
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Extract headings from HTML content
 */
function extractHeadings(content) {
  if (!content) return [];
  const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
  const matches = content.match(headingRegex) || [];
  return matches.map(h => h.replace(/<[^>]*>/g, ''));
}

/**
 * Count keywords in headings
 */
function countKeywordsInHeadings(content, keywords) {
  const headings = extractHeadings(content);
  const headingText = headings.join(' ');
  let totalInHeadings = 0;

  keywords.forEach(kw => {
    totalInHeadings += countKeyword(headingText, kw);
  });

  return totalInHeadings;
}

/**
 * Verify a single blog post translation
 */
async function verifyPost(postId, lang) {
  const post = await prisma.blogPost.findUnique({
    where: { id: postId }
  });

  if (!post) {
    return { success: false, error: 'Post not found' };
  }

  const translation = post.translations[lang];
  if (!translation) {
    return { success: false, error: 'No translation', slug: post.slug };
  }

  const universalKeywords = getUniversalKeywords(lang);
  const localKeywords = getLocalKeywords(lang);
  const allKeywords = [...universalKeywords, ...localKeywords];

  const fullContent = `${translation.title || ''} ${translation.content || ''}`;

  const result = {
    postId,
    slug: post.slug,
    lang,
    title: translation.title,
    universal: {},
    local: {},
    metadata: {},
    issues: []
  };

  // Check universal keywords
  let universalPass = 0;
  universalKeywords.forEach(kw => {
    const count = countKeyword(fullContent, kw);
    result.universal[kw] = count;
    if (count >= MINIMUM_KEYWORD_COUNT) {
      universalPass++;
    } else {
      result.issues.push(`Universal keyword "${kw}" has ${count} occurrences (need ${MINIMUM_KEYWORD_COUNT})`);
    }
  });

  // Check local keywords
  let localPass = 0;
  localKeywords.forEach(kw => {
    const count = countKeyword(fullContent, kw);
    result.local[kw] = count;
    if (count >= MINIMUM_KEYWORD_COUNT) {
      localPass++;
    } else {
      result.issues.push(`Local keyword "${kw}" has ${count} occurrences (need ${MINIMUM_KEYWORD_COUNT})`);
    }
  });

  // Check keywords in headings
  const keywordsInHeadings = countKeywordsInHeadings(translation.content, allKeywords);
  result.keywordsInHeadings = keywordsInHeadings;
  if (keywordsInHeadings < MINIMUM_KEYWORDS_IN_HEADINGS) {
    result.issues.push(`Only ${keywordsInHeadings} keywords in headings (need ${MINIMUM_KEYWORDS_IN_HEADINGS})`);
  }

  // Check metaTitle
  const metaTitle = translation.metaTitle || '';
  result.metadata.metaTitle = {
    value: metaTitle,
    length: metaTitle.length,
    valid: metaTitle.length >= META_TITLE_MIN && metaTitle.length <= META_TITLE_MAX
  };
  if (!result.metadata.metaTitle.valid) {
    result.issues.push(`metaTitle is ${metaTitle.length} chars (need ${META_TITLE_MIN}-${META_TITLE_MAX})`);
  }

  // Check metaDescription
  const metaDesc = translation.metaDescription || '';
  result.metadata.metaDescription = {
    value: metaDesc.substring(0, 50) + '...',
    length: metaDesc.length,
    valid: metaDesc.length >= META_DESC_MIN && metaDesc.length <= META_DESC_MAX
  };
  if (!result.metadata.metaDescription.valid) {
    result.issues.push(`metaDescription is ${metaDesc.length} chars (need ${META_DESC_MIN}-${META_DESC_MAX})`);
  }

  // Check focusKeyword
  const focusKeyword = translation.focusKeyword || '';
  result.metadata.focusKeyword = {
    value: focusKeyword,
    valid: focusKeyword.length > 0
  };
  if (!result.metadata.focusKeyword.valid) {
    result.issues.push('focusKeyword is not set');
  }

  // Calculate overall status
  result.summary = {
    universalKeywordsPassing: universalPass,
    universalKeywordsTotal: universalKeywords.length,
    localKeywordsPassing: localPass,
    localKeywordsTotal: localKeywords.length,
    keywordsInHeadings,
    metadataValid: result.metadata.metaTitle.valid &&
                   result.metadata.metaDescription.valid &&
                   result.metadata.focusKeyword.valid,
    issueCount: result.issues.length,
    passed: result.issues.length === 0
  };

  return result;
}

/**
 * Verify all posts for a language
 */
async function verifyLanguage(lang, verbose = false) {
  console.log('='.repeat(60));
  console.log(`VERIFICATION - ${LANGUAGE_NAMES[lang] || lang.toUpperCase()}`);
  console.log('='.repeat(60));

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Total posts: ${posts.length}\n`);

  const results = {
    lang,
    verifiedAt: new Date().toISOString(),
    total: posts.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    posts: []
  };

  for (const post of posts) {
    const verification = await verifyPost(post.id, lang);

    if (verification.error === 'No translation') {
      results.skipped++;
      if (verbose) {
        console.log(`[SKIP] ${post.slug} - No ${lang} translation`);
      }
      continue;
    }

    results.posts.push(verification);

    if (verification.summary.passed) {
      results.passed++;
      if (verbose) {
        console.log(`[PASS] ${post.slug}`);
      }
    } else {
      results.failed++;
      console.log(`[FAIL] ${post.slug}`);
      verification.issues.forEach(issue => {
        console.log(`       - ${issue}`);
      });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total: ${results.total}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Pass rate: ${((results.passed / (results.total - results.skipped)) * 100).toFixed(1)}%`);

  return results;
}

/**
 * Verify all languages
 */
async function verifyAll(verbose = false) {
  const allResults = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const result = await verifyLanguage(lang, verbose);
    allResults.push(result);
    console.log('\n');
  }

  // Master summary
  console.log('='.repeat(80));
  console.log('MASTER VERIFICATION SUMMARY');
  console.log('='.repeat(80));

  let totalPassed = 0;
  let totalFailed = 0;
  let totalSkipped = 0;

  allResults.forEach(r => {
    const passRate = ((r.passed / (r.total - r.skipped)) * 100).toFixed(1);
    console.log(`${LANGUAGE_NAMES[r.lang]}: ${r.passed}/${r.total - r.skipped} passed (${passRate}%)`);
    totalPassed += r.passed;
    totalFailed += r.failed;
    totalSkipped += r.skipped;
  });

  const totalChecked = (allResults.length * allResults[0].total) - totalSkipped;
  console.log('\nOverall:');
  console.log(`  Total translations checked: ${totalChecked}`);
  console.log(`  Passed: ${totalPassed}`);
  console.log(`  Failed: ${totalFailed}`);
  console.log(`  Pass rate: ${((totalPassed / totalChecked) * 100).toFixed(1)}%`);

  return allResults;
}

/**
 * Generate deficiency report
 */
async function generateDeficiencyReport(lang) {
  console.log('Generating deficiency report...\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'asc' }
  });

  const deficiencies = [];

  for (const post of posts) {
    const verification = await verifyPost(post.id, lang);

    if (verification.error) continue;

    if (!verification.summary.passed) {
      deficiencies.push({
        postId: post.id,
        slug: post.slug,
        issues: verification.issues,
        universalKeywordsNeeded: Object.entries(verification.universal)
          .filter(([_, count]) => count < MINIMUM_KEYWORD_COUNT)
          .map(([kw, count]) => ({ keyword: kw, current: count, needed: MINIMUM_KEYWORD_COUNT - count })),
        localKeywordsNeeded: Object.entries(verification.local)
          .filter(([_, count]) => count < MINIMUM_KEYWORD_COUNT)
          .map(([kw, count]) => ({ keyword: kw, current: count, needed: MINIMUM_KEYWORD_COUNT - count })),
        metadataIssues: {
          metaTitle: !verification.metadata.metaTitle.valid,
          metaDescription: !verification.metadata.metaDescription.valid,
          focusKeyword: !verification.metadata.focusKeyword.valid
        }
      });
    }
  }

  console.log(`Found ${deficiencies.length} posts with issues.\n`);

  // Save report
  const reportPath = path.join(__dirname, 'logs', `deficiency_${lang}_${Date.now()}.json`);

  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify({
    lang,
    generatedAt: new Date().toISOString(),
    totalDeficiencies: deficiencies.length,
    posts: deficiencies
  }, null, 2));

  console.log(`Report saved to: ${reportPath}`);

  return deficiencies;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Blog SEO Keyword Verification

Usage:
  node verify-keywords.js --language=<lang> [--verbose]
  node verify-keywords.js --all [--verbose]
  node verify-keywords.js --deficiencies --language=<lang>
  node verify-keywords.js --post=<postId> --language=<lang>

Options:
  --language      Language code (en, de, fr, es, pt, it, nl, sv, da, no, fi)
  --all           Verify all languages
  --verbose       Show detailed output including passing posts
  --deficiencies  Generate deficiency report
  --post          Verify a specific post by ID
  --report        Generate full verification report

Examples:
  node verify-keywords.js --language=en
  node verify-keywords.js --all --verbose
  node verify-keywords.js --deficiencies --language=de
  node verify-keywords.js --post=abc123 --language=en
`);
    process.exit(0);
  }

  const langArg = args.find(a => a.startsWith('--language='));
  const postArg = args.find(a => a.startsWith('--post='));
  const verbose = args.includes('--verbose');
  const verifyAllLangs = args.includes('--all');
  const deficiencies = args.includes('--deficiencies');
  const report = args.includes('--report');

  async function run() {
    try {
      if (postArg && langArg) {
        const postId = postArg.split('=')[1];
        const lang = langArg.split('=')[1];
        const result = await verifyPost(postId, lang);
        console.log(JSON.stringify(result, null, 2));
      } else if (deficiencies && langArg) {
        const lang = langArg.split('=')[1];
        await generateDeficiencyReport(lang);
      } else if (verifyAllLangs) {
        const results = await verifyAll(verbose);
        if (report) {
          const reportPath = path.join(__dirname, 'logs', `verification_all_${Date.now()}.json`);
          fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
          console.log(`\nFull report saved to: ${reportPath}`);
        }
      } else if (langArg) {
        const lang = langArg.split('=')[1];
        if (!SUPPORTED_LANGUAGES.includes(lang)) {
          console.error(`Invalid language: ${lang}`);
          console.error(`Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
          process.exit(1);
        }
        const result = await verifyLanguage(lang, verbose);
        if (report) {
          const reportPath = path.join(__dirname, 'logs', `verification_${lang}_${Date.now()}.json`);
          fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
          console.log(`\nReport saved to: ${reportPath}`);
        }
      } else {
        console.error('Missing required arguments. Use --help for usage information.');
        process.exit(1);
      }
    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  run();
}

module.exports = {
  verifyPost,
  verifyLanguage,
  verifyAll,
  generateDeficiencyReport,
  countKeyword,
  extractHeadings,
  countKeywordsInHeadings
};
