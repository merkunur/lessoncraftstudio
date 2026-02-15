#!/usr/bin/env node
/**
 * seo-blog-batch-90.js — Part 90: Hand-crafted SEO metadata for blog posts 81-90
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-90.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'fisher-yates-shuffle-algorithm-the-science-of-perfect-word-scrambles',
    metaTitle: 'Fisher-Yates Shuffle Algorithm for Word Scrambles | LCS',
    metaDescription: 'Learn how the Fisher-Yates shuffle algorithm creates perfectly random word scrambles for classroom worksheets. The science behind fair puzzle generation.',
    focusKeyword: 'Fisher-Yates shuffle algorithm word scrambles',
  },
  {
    slug: 'anti-adjacent-scattering-why-randomness-improves-educational-worksheet-quality',
    metaTitle: 'Anti-Adjacent Scattering Improves Worksheet Quality | LCS',
    metaDescription: 'Discover how anti-adjacent scattering prevents answer clustering in educational worksheets. Randomness techniques that improve puzzle quality and learning.',
    focusKeyword: 'anti-adjacent scattering educational worksheets',
  },
  {
    slug: 'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
    metaTitle: 'Variance Detection Algorithm for Puzzle Worksheets | LCS',
    metaDescription: 'Explore how variance detection algorithms ensure every puzzle piece is meaningful and distinct. Image analysis for creating high-quality visual worksheets.',
    focusKeyword: 'variance detection algorithm puzzle worksheets',
  },
  {
    slug: 'unique-solvability-validation-the-math-behind-frustration-free-algebra-worksheets',
    metaTitle: 'Unique Solvability Validation Algebra Worksheets | LCS',
    metaDescription: 'See how unique solvability validation guarantees every algebra worksheet has exactly one answer. The math behind frustration-free problem sets for students.',
    focusKeyword: 'unique solvability validation algebra worksheets',
  },
  {
    slug: 'smart-cell-detection-in-grid-drawing-how-pixel-analysis-prevents-blank-clue-cells',
    metaTitle: 'Smart Cell Detection in Grid Drawing Worksheets | LCS',
    metaDescription: 'Learn how smart cell detection uses pixel analysis to prevent blank clue cells in grid drawing worksheets. Automated processing for flawless puzzle results.',
    focusKeyword: 'smart cell detection grid drawing worksheets',
  },
  {
    slug: 'creating-professional-i-spy-worksheets',
    metaTitle: 'How to Create Professional I Spy Worksheets Free | LCS',
    metaDescription: 'Create professional I Spy worksheets with high-quality images and themes. Step-by-step guide to designing engaging visual search activities for young learners.',
    focusKeyword: 'create professional I Spy worksheets',
  },
  {
    slug: 'millers-72-rule-why-our-image-crosswords-use-exactly-8-pictures',
    metaTitle: 'Millers 7 Plus 2 Rule for Image Crossword Design | LCS',
    metaDescription: 'Discover why image crosswords use exactly 8 pictures based on Millers 7 plus or minus 2 cognitive rule. Research-backed design for effective worksheet puzzles.',
    focusKeyword: 'Millers 7 plus 2 rule image crosswords',
  },
  {
    slug: 'cognitive-load-theory-in-worksheet-design-why-44-picture-sudoku-works-for-age-4',
    metaTitle: 'Cognitive Load Theory in Worksheet Design Sudoku | LCS',
    metaDescription: 'Apply cognitive load theory to worksheet design and see why 4 by 4 picture sudoku works for ages 4 and up. Match puzzle complexity to student age and ability.',
    focusKeyword: 'cognitive load theory worksheet design',
  },
  {
    slug: 'orthographic-learning-theory-how-word-puzzles-create-sight-word-automaticity',
    metaTitle: 'Orthographic Learning Theory Word Puzzles for Kids | LCS',
    metaDescription: 'Explore how orthographic learning theory explains why word puzzles build sight word automaticity. Research linking word search and scramble to reading skill.',
    focusKeyword: 'orthographic learning theory word puzzles',
  },
  {
    slug: 'fine-motor-development-through-educational-worksheets-benbows-six-pre-writing-strokes',
    metaTitle: 'Fine Motor Development Worksheets Pre-Writing Strokes | LCS',
    metaDescription: 'Support fine motor development with worksheets based on Benbows six pre-writing strokes. Tracing and drawing activities backed by occupational therapy research.',
    focusKeyword: 'fine motor development worksheets pre-writing strokes',
  },
];

async function main() {
  console.log('Part 90: Updating SEO metadata for blog posts 81-90\n');

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
