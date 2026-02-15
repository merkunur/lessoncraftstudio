#!/usr/bin/env node
/**
 * seo-blog-batch-93.js — Part 93: Hand-crafted SEO metadata for blog posts 111-112 (FINAL)
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the last 2
 * published English blog posts. This completes Phase 4 of the SEO plan.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-93.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'how-to-create-custom-worksheets-in-3-minutes-complete-tutorial',
    metaTitle: 'Create Custom Worksheets in 3 Minutes Full Tutorial | LCS',
    metaDescription: 'Learn how to create custom worksheets in three minutes with this complete tutorial. Auto-generate, edit every element, and export print-ready PDF worksheets.',
    focusKeyword: 'create custom worksheets 3 minutes tutorial',
  },
  {
    slug: '33-editable-worksheet-generators-every-elementary-teacher-needs',
    metaTitle: '33 Editable Worksheet Generators Elementary Teachers | LCS',
    metaDescription: 'Explore 33 editable worksheet generators built for elementary teachers. Every tool offers post-generation editing so you can customize content before printing.',
    focusKeyword: 'editable worksheet generators elementary teachers',
  },
];

async function main() {
  console.log('Part 93 (FINAL): Updating SEO metadata for blog posts 111-112\n');

  // Validate lengths before applying
  let hasError = false;
  for (const u of updates) {
    const tLen = u.metaTitle.length;
    const dLen = u.metaDescription.length;
    const issues = [];
    if (tLen < 50 || tLen > 60) issues.push(`title ${tLen} chars (need 50-60)`);
    if (dLen < 150 || dLen > 160) issues.push(`desc ${dLen} chars (need 150-160)`);
    if (issues.length > 0) {
      console.log(`WARNING: ${u.slug}: ${issues.join(', ')}`);
      hasError = true;
    }
  }

  if (hasError) {
    console.log('\nFix length issues before proceeding. Aborting.');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log('All lengths validated OK\n');

  // Check for duplicate focusKeywords
  const kwSet = new Set();
  for (const u of updates) {
    if (kwSet.has(u.focusKeyword)) {
      console.log(`ERROR: Duplicate focusKeyword "${u.focusKeyword}"`);
      await prisma.$disconnect();
      process.exit(1);
    }
    kwSet.add(u.focusKeyword);
  }
  console.log('All focus keywords unique\n');

  let updated = 0;
  let skipped = 0;

  for (const u of updates) {
    const post = await prisma.blogPost.findUnique({ where: { slug: u.slug } });
    if (!post) {
      console.log(`SKIP: ${u.slug} not found`);
      skipped++;
      continue;
    }

    const translations = post.translations;
    if (!translations.en) {
      console.log(`SKIP: ${u.slug} has no English translation`);
      skipped++;
      continue;
    }

    translations.en.metaTitle = u.metaTitle;
    translations.en.metaDescription = u.metaDescription;
    translations.en.focusKeyword = u.focusKeyword;

    await prisma.blogPost.update({
      where: { slug: u.slug },
      data: { translations },
    });

    console.log(`UPDATED: ${u.slug}`);
    console.log(`  title:   ${u.metaTitle} (${u.metaTitle.length} chars)`);
    console.log(`  desc:    ${u.metaDescription.substring(0, 70)}... (${u.metaDescription.length} chars)`);
    console.log(`  keyword: ${u.focusKeyword}`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
  console.log('\n*** Phase 4 COMPLETE — All 112 English blog posts now have hand-crafted SEO metadata ***');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
