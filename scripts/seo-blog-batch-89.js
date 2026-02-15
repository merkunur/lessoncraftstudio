#!/usr/bin/env node
/**
 * seo-blog-batch-89.js — Part 89: Hand-crafted SEO metadata for blog posts 71-80
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-89.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: '3rd-grade-advanced-math-symbolic-algebra-math-puzzles-code-addition',
    metaTitle: '3rd Grade Advanced Math Worksheets Algebra Puzzles | LCS',
    metaDescription: 'Challenge third graders with advanced math worksheets featuring symbolic algebra, math puzzles, and code addition. Problem-solving activities for ages 8 and 9.',
    focusKeyword: '3rd grade advanced math worksheets',
  },
  {
    slug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    metaTitle: 'Best Worksheet Generators for 3rd Grade Teachers | LCS',
    metaDescription: 'Find the best worksheet generators for 3rd grade teachers. Math, reading, logic, and vocabulary printables designed for students ages 8 to 9 in one toolkit.',
    focusKeyword: 'worksheet generators 3rd grade teachers',
  },
  {
    slug: '2nd-grade-critical-thinking-crosswords-cryptograms-logic-puzzles',
    metaTitle: '2nd Grade Critical Thinking Worksheets and Puzzles | LCS',
    metaDescription: 'Build critical thinking in second graders with crossword, cryptogram, and logic puzzle worksheets. Fun brain teasers and reasoning printables for ages 7 and 8.',
    focusKeyword: '2nd grade critical thinking worksheets puzzles',
  },
  {
    slug: 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8',
    metaTitle: 'Best Worksheet Generators for 2nd Grade Teachers | LCS',
    metaDescription: 'Explore the best worksheet generators for 2nd grade teachers. Printable math, reading, and puzzle activities tailored for students ages 7 to 8 in one place.',
    focusKeyword: 'worksheet generators 2nd grade teachers',
  },
  {
    slug: '1st-grade-literacy-tools-word-search-alphabet-train-writing-practice',
    metaTitle: '1st Grade Literacy Worksheets Word Search and Writing | LCS',
    metaDescription: 'Boost first grade literacy with word search, alphabet train, and writing practice worksheets. Fun phonics and reading printables designed for ages 6 and 7.',
    focusKeyword: '1st grade literacy worksheets word search',
  },
  {
    slug: 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7',
    metaTitle: 'Best Worksheet Generators for 1st Grade Teachers | LCS',
    metaDescription: 'Browse the best worksheet generators for 1st grade teachers. Phonics, math, and writing printables built for students ages 6 to 7 in one easy-to-use toolkit.',
    focusKeyword: 'worksheet generators 1st grade teachers',
  },
  {
    slug: 'kindergarten-math-fundamentals-addition-subtraction-patterns-sudoku',
    metaTitle: 'Kindergarten Math Worksheets Addition and Patterns | LCS',
    metaDescription: 'Teach kindergarten math with addition, subtraction, pattern, and sudoku worksheets. Fun number sense activities that build early confidence for ages 5 and 6.',
    focusKeyword: 'kindergarten math worksheets addition patterns',
  },
  {
    slug: 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6',
    metaTitle: 'Best Worksheet Generators for Kindergarten Teachers | LCS',
    metaDescription: 'Discover the best worksheet generators for kindergarten teachers. Counting, letters, shapes, and fine motor printables designed for students ages 5 to 6.',
    focusKeyword: 'worksheet generators kindergarten teachers',
  },
  {
    slug: 'pre-k-fine-motor-activities-drawing-lines-pattern-train-cutting-practice',
    metaTitle: 'Pre-K Fine Motor Worksheets Drawing and Cutting | LCS',
    metaDescription: 'Develop pre-K fine motor skills with drawing lines, pattern train, and cutting practice worksheets. Tracing and scissor activities for children ages 3 to 5.',
    focusKeyword: 'pre-K fine motor worksheets drawing cutting',
  },
  {
    slug: 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5',
    metaTitle: 'Best Worksheet Generators for Pre-K Teachers Ages 3-5 | LCS',
    metaDescription: 'Find the best worksheet generators for pre-K teachers. Coloring, tracing, matching, and early learning printables created for young learners ages 3 to 5.',
    focusKeyword: 'worksheet generators pre-K teachers',
  },
];

async function main() {
  console.log('Part 89: Updating SEO metadata for blog posts 71-80\n');

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
