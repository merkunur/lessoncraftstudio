#!/usr/bin/env node
/**
 * Blog SEO Batch Processor
 *
 * Processes batches of blog posts for SEO optimization.
 * Designed to handle 10 posts at a time to prevent timeouts and allow progress tracking.
 */

const { PrismaClient } = require('@prisma/client');
const { optimizeBlogPost, getBlogPostsInRange } = require('./optimize-blog-post');
const { LANGUAGE_NAMES } = require('./config/keywords');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Process a batch of posts for a specific language
 */
async function processBatch(language, startIndex, endIndex, dryRun = false) {
  console.log('='.repeat(60));
  console.log(`BATCH PROCESSOR - ${LANGUAGE_NAMES[language] || language.toUpperCase()}`);
  console.log(`Processing posts ${startIndex} to ${endIndex}`);
  console.log(`Dry run: ${dryRun}`);
  console.log('='.repeat(60));

  const results = {
    language,
    startIndex,
    endIndex,
    processedAt: new Date().toISOString(),
    dryRun,
    posts: [],
    summary: {
      total: 0,
      success: 0,
      failed: 0,
      skipped: 0
    }
  };

  try {
    // Get posts in the specified range
    const posts = await getBlogPostsInRange(startIndex, endIndex);

    if (posts.length === 0) {
      console.log('No posts found in the specified range.');
      return results;
    }

    console.log(`Found ${posts.length} posts to process.\n`);
    results.summary.total = posts.length;

    // Process each post
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postNumber = startIndex + i;

      console.log(`\n[${postNumber}/${endIndex}] Processing: ${post.slug}`);
      console.log('-'.repeat(40));

      try {
        const result = await optimizeBlogPost(post.id, language, dryRun);

        results.posts.push({
          index: postNumber,
          postId: post.id,
          slug: post.slug,
          ...result
        });

        if (result.success) {
          results.summary.success++;
        } else if (result.reason === 'no_translation') {
          results.summary.skipped++;
        } else {
          results.summary.failed++;
        }
      } catch (error) {
        console.error(`Error processing post ${post.slug}:`, error.message);
        results.posts.push({
          index: postNumber,
          postId: post.id,
          slug: post.slug,
          success: false,
          error: error.message
        });
        results.summary.failed++;
      }

      // Add a small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('BATCH SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total posts: ${results.summary.total}`);
    console.log(`Successful: ${results.summary.success}`);
    console.log(`Skipped (no translation): ${results.summary.skipped}`);
    console.log(`Failed: ${results.summary.failed}`);

    // Save results to a log file
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(
      logDir,
      `batch_${language}_${startIndex}-${endIndex}_${Date.now()}.json`
    );
    fs.writeFileSync(logFile, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${logFile}`);

    return results;

  } catch (error) {
    console.error('Batch processing error:', error);
    throw error;
  }
}

/**
 * Process all posts for a language
 */
async function processAllForLanguage(language, dryRun = false) {
  console.log('='.repeat(60));
  console.log(`PROCESSING ALL POSTS - ${LANGUAGE_NAMES[language] || language.toUpperCase()}`);
  console.log('='.repeat(60));

  // Get total count of published posts
  const totalPosts = await prisma.blogPost.count({
    where: { status: 'published' }
  });

  console.log(`Total published posts: ${totalPosts}`);

  const batchSize = 10;
  const batches = Math.ceil(totalPosts / batchSize);
  const allResults = [];

  for (let batch = 0; batch < batches; batch++) {
    const start = batch * batchSize + 1;
    const end = Math.min((batch + 1) * batchSize, totalPosts);

    console.log(`\n\n${'#'.repeat(60)}`);
    console.log(`BATCH ${batch + 1} of ${batches}`);
    console.log(`${'#'.repeat(60)}`);

    const batchResult = await processBatch(language, start, end, dryRun);
    allResults.push(batchResult);

    // Add a delay between batches
    if (batch < batches - 1) {
      console.log('\nWaiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Calculate overall summary
  const overallSummary = {
    language,
    processedAt: new Date().toISOString(),
    dryRun,
    batches: allResults.length,
    total: allResults.reduce((sum, r) => sum + r.summary.total, 0),
    success: allResults.reduce((sum, r) => sum + r.summary.success, 0),
    failed: allResults.reduce((sum, r) => sum + r.summary.failed, 0),
    skipped: allResults.reduce((sum, r) => sum + r.summary.skipped, 0)
  };

  console.log('\n\n' + '='.repeat(60));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(60));
  console.log(JSON.stringify(overallSummary, null, 2));

  // Save overall summary
  const logDir = path.join(__dirname, 'logs');
  const summaryFile = path.join(logDir, `summary_${language}_${Date.now()}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify({
    ...overallSummary,
    batches: allResults
  }, null, 2));
  console.log(`\nOverall summary saved to: ${summaryFile}`);

  return overallSummary;
}

/**
 * Process all languages
 */
async function processAllLanguages(dryRun = false) {
  const allSummaries = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    console.log(`\n\n${'*'.repeat(80)}`);
    console.log(`STARTING LANGUAGE: ${LANGUAGE_NAMES[lang]} (${lang})`);
    console.log(`${'*'.repeat(80)}\n`);

    const summary = await processAllForLanguage(lang, dryRun);
    allSummaries.push(summary);

    // Longer delay between languages
    console.log('\nWaiting 5 seconds before next language...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Save master summary
  const logDir = path.join(__dirname, 'logs');
  const masterFile = path.join(logDir, `master_summary_${Date.now()}.json`);
  fs.writeFileSync(masterFile, JSON.stringify({
    processedAt: new Date().toISOString(),
    dryRun,
    languages: allSummaries
  }, null, 2));

  console.log('\n\n' + '='.repeat(80));
  console.log('MASTER SUMMARY - ALL LANGUAGES COMPLETE');
  console.log('='.repeat(80));
  allSummaries.forEach(s => {
    console.log(`${LANGUAGE_NAMES[s.language]}: ${s.success}/${s.total} successful`);
  });
  console.log(`\nMaster summary saved to: ${masterFile}`);

  return allSummaries;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Blog SEO Batch Processor

Usage:
  node batch-processor.js --language=<lang> --start=<n> --end=<n> [--dry-run]
  node batch-processor.js --language=<lang> --all [--dry-run]
  node batch-processor.js --all-languages [--dry-run]

Options:
  --language   Language code (en, de, fr, es, pt, it, nl, sv, da, no, fi)
  --start      Start index (1-based)
  --end        End index
  --all        Process all posts for the specified language
  --all-languages  Process all posts for all languages
  --dry-run    Show what would be done without making changes

Examples:
  node batch-processor.js --language=en --start=1 --end=10
  node batch-processor.js --language=de --all --dry-run
  node batch-processor.js --all-languages --dry-run
`);
    process.exit(0);
  }

  const langArg = args.find(a => a.startsWith('--language='));
  const startArg = args.find(a => a.startsWith('--start='));
  const endArg = args.find(a => a.startsWith('--end='));
  const allForLang = args.includes('--all');
  const allLanguages = args.includes('--all-languages');
  const dryRun = args.includes('--dry-run');

  async function run() {
    try {
      if (allLanguages) {
        await processAllLanguages(dryRun);
      } else if (langArg && allForLang) {
        const lang = langArg.split('=')[1];
        if (!SUPPORTED_LANGUAGES.includes(lang)) {
          console.error(`Invalid language: ${lang}`);
          console.error(`Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
          process.exit(1);
        }
        await processAllForLanguage(lang, dryRun);
      } else if (langArg && startArg && endArg) {
        const lang = langArg.split('=')[1];
        const start = parseInt(startArg.split('=')[1], 10);
        const end = parseInt(endArg.split('=')[1], 10);

        if (!SUPPORTED_LANGUAGES.includes(lang)) {
          console.error(`Invalid language: ${lang}`);
          console.error(`Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
          process.exit(1);
        }

        if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
          console.error('Invalid start/end range');
          process.exit(1);
        }

        await processBatch(lang, start, end, dryRun);
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
  processBatch,
  processAllForLanguage,
  processAllLanguages
};
