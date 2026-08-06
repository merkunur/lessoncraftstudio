#!/usr/bin/env node
/**
 * verify-part130.js — Verify Part 130 Finnish blog SEO metadata (posts 39-57)
 *
 * Queries 5 sample posts to confirm Finnish metadata was written correctly.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/verify-part130.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const sampleSlugs = [
  'cognitive-load-theory-in-worksheet-design-why-44-picture-sudoku-works-for-age-4',
  'concrete-representational-abstract-progression-for-elementary-math',
  'image-cryptogram-generator-patent-worthy-visual-substitution-cipher',
  'how-to-scaffold-worksheet-difficulty',
  'classroom-management-using-worksheets-for-transitions-early-finishers-behavior-support',
];

async function main() {
  console.log('Verifying Part 130: Finnish blog SEO metadata (posts 39-57)\n');

  let passed = 0;
  let failed = 0;

  for (const slug of sampleSlugs) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`FAIL: ${slug} not found`);
      failed++;
      continue;
    }

    const fi = post.translations?.fi;
    if (!fi) {
      console.log(`FAIL: ${slug} has no Finnish translation`);
      failed++;
      continue;
    }

    const hasTitle = fi.metaTitle && fi.metaTitle.length >= 50 && fi.metaTitle.length <= 60;
    const hasDesc = fi.metaDescription && fi.metaDescription.length >= 150 && fi.metaDescription.length <= 160;
    const hasKw = fi.focusKeyword && fi.focusKeyword.length > 0;

    if (hasTitle && hasDesc && hasKw) {
      console.log(`PASS: ${slug}`);
      console.log(`  title:   ${fi.metaTitle} (${fi.metaTitle.length})`);
      console.log(`  desc:    ${fi.metaDescription.substring(0, 70)}... (${fi.metaDescription.length})`);
      console.log(`  keyword: ${fi.focusKeyword}`);
      passed++;
    } else {
      console.log(`FAIL: ${slug}`);
      if (!hasTitle) console.log(`  title issue: "${fi.metaTitle}" (${fi.metaTitle?.length})`);
      if (!hasDesc) console.log(`  desc issue: length=${fi.metaDescription?.length}`);
      if (!hasKw) console.log(`  keyword missing`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${sampleSlugs.length} samples`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
