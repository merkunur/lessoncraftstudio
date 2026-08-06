#!/usr/bin/env node
/**
 * verify-part132.js — Verify Part 132 Finnish blog SEO metadata (posts 77-95)
 *
 * Queries 5 sample posts to confirm Finnish metadata was written correctly.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/verify-part132.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const sampleSlugs = [
  'student-goal-setting-self-monitoring-building-self-directed-learners',
  'cipher-based-addition-combining-cryptography-with-elementary-math',
  'social-emotional-learning-sel-integrating-sel-with-academic-worksheets',
  'symbolic-algebra-worksheets',
  'worksheet-generator-comparison-lessoncraftstudio-vs-competitors',
];

async function main() {
  console.log('Verifying Part 132: Finnish blog SEO metadata (posts 77-95)\n');

  for (const slug of sampleSlugs) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`NOT FOUND: ${slug}\n`);
      continue;
    }

    const fi = post.translations?.fi;
    if (!fi) {
      console.log(`NO FI TRANSLATION: ${slug}\n`);
      continue;
    }

    console.log(`SLUG: ${slug}`);
    console.log(`  metaTitle:       ${fi.metaTitle} (${(fi.metaTitle || '').length} chars)`);
    console.log(`  metaDescription: ${(fi.metaDescription || '').substring(0, 80)}... (${(fi.metaDescription || '').length} chars)`);
    console.log(`  focusKeyword:    ${fi.focusKeyword}`);
    console.log();
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
