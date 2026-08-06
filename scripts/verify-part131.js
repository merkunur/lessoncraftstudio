#!/usr/bin/env node
/**
 * verify-part131.js — Verify Part 131 Finnish blog SEO metadata (posts 58-76)
 *
 * Queries 5 sample posts to confirm Finnish metadata was written correctly.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/verify-part131.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const sampleSlugs = [
  'blended-learning-technology-integration-combining-digital-and-print-worksheets',
  'millers-72-rule-why-our-image-crosswords-use-exactly-8-pictures',
  'creating-professional-i-spy-worksheets',
  'future-of-education-technology-trends-the-role-of-worksheet-generators',
  'integrating-multiple-subjects-through-worksheets',
];

async function main() {
  console.log('Verifying Part 131: Finnish blog SEO for posts 58-76\n');

  let allOk = true;

  for (const slug of sampleSlugs) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`MISSING: ${slug}`);
      allOk = false;
      continue;
    }

    const fi = post.translations?.fi;
    if (!fi) {
      console.log(`NO FI: ${slug}`);
      allOk = false;
      continue;
    }

    const tLen = (fi.metaTitle || '').length;
    const dLen = (fi.metaDescription || '').length;
    const hasKw = !!fi.focusKeyword;

    const issues = [];
    if (tLen < 50 || tLen > 60) issues.push(`title ${tLen} chars`);
    if (dLen < 150 || dLen > 160) issues.push(`desc ${dLen} chars`);
    if (!hasKw) issues.push('no focusKeyword');

    if (issues.length > 0) {
      console.log(`ISSUE: ${slug}: ${issues.join(', ')}`);
      allOk = false;
    } else {
      console.log(`OK: ${slug}`);
      console.log(`  title:   ${fi.metaTitle} (${tLen})`);
      console.log(`  desc:    ${fi.metaDescription.substring(0, 60)}... (${dLen})`);
      console.log(`  keyword: ${fi.focusKeyword}`);
    }
  }

  console.log(allOk ? '\nAll samples verified OK' : '\nSome issues found');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
