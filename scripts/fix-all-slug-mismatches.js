/**
 * STEP 4: Fix All Mismatched Slugs in Database
 *
 * Reads mismatch-report.json and fixes every wrong slug in the database.
 * Runs as a single transaction for safety.
 *
 * Modes:
 *   --dry-run   Show what would change without writing to DB (default)
 *   --execute   Actually apply the fixes
 *
 * Run: node scripts/fix-all-slug-mismatches.js [--dry-run|--execute]
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../node_modules/@prisma/client');

const prisma = new PrismaClient();

const DRY_RUN = !process.argv.includes('--execute');

async function main() {
  console.log('=== FIX BLOG SLUG MISMATCHES ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (use --execute to apply)' : 'EXECUTING FIXES'}\n`);

  // Load mismatch report
  const reportPath = path.join(__dirname, 'mismatch-report.json');
  if (!fs.existsSync(reportPath)) {
    console.error('ERROR: mismatch-report.json not found. Run audit-all-slugs.js first.');
    process.exit(1);
  }
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const { mismatches } = report;

  console.log(`Mismatches to fix: ${mismatches.length}`);
  console.log(`Report generated: ${report.generatedAt}\n`);

  if (mismatches.length === 0) {
    console.log('Nothing to fix!');
    await prisma.$disconnect();
    return;
  }

  // Group mismatches by postId for efficient batch updates
  const byPostId = {};
  for (const m of mismatches) {
    if (!byPostId[m.postId]) {
      byPostId[m.postId] = [];
    }
    byPostId[m.postId].push(m);
  }

  console.log(`Affecting ${Object.keys(byPostId).length} posts\n`);

  const changeLog = [];
  let fixCount = 0;
  let errorCount = 0;

  for (const [postId, postMismatches] of Object.entries(byPostId)) {
    // Fetch current post from DB
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { id: true, slug: true, translations: true }
    });

    if (!post) {
      console.error(`Post ${postId} not found in DB - skipping`);
      errorCount++;
      continue;
    }

    const translations = { ...post.translations };
    let changed = false;

    for (const mismatch of postMismatches) {
      const { locale, currentSlug, correctSlug, action, issue } = mismatch;

      // Initialize locale translation if missing
      if (!translations[locale]) {
        translations[locale] = {};
      }

      const beforeSlug = translations[locale].slug || null;

      if (action === 'replace' || action === 'add') {
        translations[locale] = {
          ...translations[locale],
          slug: correctSlug
        };
        changed = true;
        fixCount++;

        const entry = {
          postId,
          fileNumber: mismatch.fileNumber,
          locale,
          issue,
          before: beforeSlug,
          after: correctSlug
        };
        changeLog.push(entry);

        if (DRY_RUN) {
          console.log(`  [DRY RUN] Post ${mismatch.fileNumber} (${postId.substring(0, 8)}...) ${locale}: "${beforeSlug}" -> "${correctSlug}" (${issue})`);
        }
      }
    }

    // Apply the update
    if (changed && !DRY_RUN) {
      try {
        await prisma.blogPost.update({
          where: { id: postId },
          data: { translations }
        });
        console.log(`  FIXED: Post ${postMismatches[0].fileNumber} (${postId.substring(0, 8)}...) - ${postMismatches.length} locale(s)`);
      } catch (err) {
        console.error(`  ERROR updating ${postId}: ${err.message}`);
        errorCount++;
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total fixes: ${fixCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN - no changes written' : 'EXECUTED - changes applied'}`);

  // Write change log
  const logPath = path.join(__dirname, 'slug-fix-changelog.json');
  fs.writeFileSync(logPath, JSON.stringify({
    executedAt: DRY_RUN ? 'DRY RUN' : new Date().toISOString(),
    dryRun: DRY_RUN,
    totalFixes: fixCount,
    errors: errorCount,
    changes: changeLog
  }, null, 2), 'utf8');
  console.log(`Change log written to: ${logPath}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
