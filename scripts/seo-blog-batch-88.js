#!/usr/bin/env node
/**
 * seo-blog-batch-88.js — Part 88: Hand-crafted SEO metadata for blog posts 61-70
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-88.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'gifted-education-8-challenge-extension-generators',
    metaTitle: 'Gifted Education Challenge Extension Worksheets | LCS',
    metaDescription: 'Challenge gifted students with extension worksheets beyond grade level. Logic puzzles, open-ended projects, and enrichment activities for advanced learners.',
    focusKeyword: 'gifted education extension worksheets',
  },
  {
    slug: 'math-anxiety-reduction-6-low-stakes-worksheet-generators',
    metaTitle: 'Math Anxiety Reduction Low Stakes Worksheets K-5 | LCS',
    metaDescription: 'Reduce math anxiety with low-stakes worksheet activities that build confidence step by step. Number sense games, practice alternatives, and stress-free formats.',
    focusKeyword: 'math anxiety reduction low stakes worksheets',
  },
  {
    slug: 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
    metaTitle: 'Dyslexia Friendly Worksheets With Phonics Support | LCS',
    metaDescription: 'Design dyslexia-friendly worksheets with built-in phonics support. Larger fonts, structured layouts, and multisensory reading activities for struggling readers.',
    focusKeyword: 'dyslexia friendly worksheets phonics support',
  },
  {
    slug: 'occupational-therapy-goals-fine-motor-worksheet-activities',
    metaTitle: 'Fine Motor Worksheet Activities for OT Goals K-5 | LCS',
    metaDescription: 'Support occupational therapy goals with fine motor worksheet activities. Tracing paths, cutting lines, and pencil-grip exercises aligned to classroom skills.',
    focusKeyword: 'fine motor worksheet activities occupational therapy',
  },
  {
    slug: 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
    metaTitle: 'ADHD Friendly Worksheets That Reduce Cognitive Load | LCS',
    metaDescription: 'Create ADHD-friendly worksheets that lower cognitive load and boost focus. Chunked tasks, visual timers, movement breaks, and clear step-by-step instructions.',
    focusKeyword: 'ADHD friendly worksheets reduce cognitive load',
  },
  {
    slug: 'visual-learning-tools-for-special-education-classrooms-8-research-backed-generators',
    metaTitle: 'Visual Learning Tools for Special Education Classes | LCS',
    metaDescription: 'Equip special education classrooms with research-backed visual learning worksheets. Picture supports, graphic organizers, and structured visual task sequences.',
    focusKeyword: 'visual learning tools special education worksheets',
  },
  {
    slug: 'multi-language-worksheet-generation-serving-scandinavian-markets',
    metaTitle: 'Multi Language Worksheets for Scandinavian Markets | LCS',
    metaDescription: 'Generate worksheets in multiple Scandinavian languages with one click. Danish, Norwegian, Swedish, and Finnish templates with localized vocabulary built in.',
    focusKeyword: 'multi language worksheets Scandinavian markets',
  },
  {
    slug: '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
    metaTitle: 'Picture Based ESL Worksheet Generators 11 Languages | LCS',
    metaDescription: 'Teach ESL beginners with picture-based worksheets in 11 languages. Visual matching, word labeling, and image association activities for early language learners.',
    focusKeyword: 'picture based ESL worksheet generators',
  },
  {
    slug: 'upper-elementary-challenges-grid-drawing-complex-patterns-multi-step-logic',
    metaTitle: 'Upper Elementary Grid Drawing and Logic Worksheets | LCS',
    metaDescription: 'Push upper elementary students with grid drawing, complex patterns, and multi-step logic worksheets. Advanced challenge activities designed for grades 4 and 5.',
    focusKeyword: 'upper elementary grid drawing logic worksheets',
  },
  {
    slug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
    metaTitle: 'Best Worksheet Generators for 4th and 5th Graders | LCS',
    metaDescription: 'Discover the top worksheet generators for 4th and 5th grade teachers. Age-appropriate math, literacy, logic, and vocabulary tools for students ages 9 to 11.',
    focusKeyword: 'worksheet generators 4th 5th grade teachers',
  },
];

async function main() {
  console.log('Part 88: Updating SEO metadata for blog posts 61-70\n');

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
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
