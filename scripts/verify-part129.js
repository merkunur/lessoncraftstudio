#!/usr/bin/env node
/**
 * verify-part129.js — Verify Part 129 Finnish blog SEO metadata (posts 20-38)
 *
 * Queries 5 sample posts to confirm Finnish translations were written correctly.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/verify-part129.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const sampleSlugs = [
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'fisher-yates-shuffle-algorithm-the-science-of-perfect-word-scrambles',
  'independent-work-time-teaching-self-directed-learning-with-worksheets',
  'commercial-license-selling-worksheets-on-tpt-etsy-and-teacher-marketplaces',
  'writing-across-curriculum-integrating-writing-practice-into-every-subject',
];

async function main() {
  console.log('Part 129 Verification: Checking 5 sample Finnish blog posts\n');

  let pass = 0;
  let fail = 0;

  for (const slug of sampleSlugs) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`FAIL: ${slug} not found`);
      fail++;
      continue;
    }

    const fi = post.translations?.fi;
    if (!fi) {
      console.log(`FAIL: ${slug} has no Finnish translation`);
      fail++;
      continue;
    }

    const issues = [];
    if (!fi.metaTitle || fi.metaTitle.length < 50 || fi.metaTitle.length > 60) {
      issues.push(`metaTitle length ${fi.metaTitle?.length || 0}`);
    }
    if (!fi.metaDescription || fi.metaDescription.length < 150 || fi.metaDescription.length > 160) {
      issues.push(`metaDescription length ${fi.metaDescription?.length || 0}`);
    }
    if (!fi.focusKeyword) {
      issues.push('missing focusKeyword');
    }

    if (issues.length > 0) {
      console.log(`FAIL: ${slug}: ${issues.join(', ')}`);
      fail++;
    } else {
      console.log(`PASS: ${slug}`);
      console.log(`  title:   ${fi.metaTitle} (${fi.metaTitle.length})`);
      console.log(`  desc:    ${fi.metaDescription.substring(0, 60)}... (${fi.metaDescription.length})`);
      console.log(`  keyword: ${fi.focusKeyword}`);
      pass++;
    }
  }

  console.log(`\nResults: ${pass} passed, ${fail} failed out of ${sampleSlugs.length}`);
  await prisma.$disconnect();
  process.exit(fail > 0 ? 1 : 0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
