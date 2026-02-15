#!/usr/bin/env node
/**
 * seo-blog-batch-92.js — Part 92: Hand-crafted SEO metadata for blog posts 101-110
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-92.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'dual-mode-preposition-worksheets-fill-in-the-blank-multiple-choice-in-one-tool',
    metaTitle: 'Dual Mode Preposition Worksheets Fill in the Blank | LCS',
    metaDescription: 'Create dual mode preposition worksheets with fill-in-the-blank and multiple choice in one tool. Support 47 prepositions across 11 languages for ages 5 to 10.',
    focusKeyword: 'dual mode preposition worksheets fill in blank',
  },
  {
    slug: 'symbolic-algebra-worksheets',
    metaTitle: 'Symbolic Algebra Worksheets With Solvability Check | LCS',
    metaDescription: 'Create symbolic algebra worksheets with unique solvability validation. Every puzzle has exactly one solution so students build confidence in algebraic thinking.',
    focusKeyword: 'symbolic algebra worksheets solvability validation',
  },
  {
    slug: 'grid-drawing-with-smart-cell-detection-leonardo-da-vincis-technique-for-kids',
    metaTitle: 'Grid Drawing Smart Cell Detection for Kids Art Class | LCS',
    metaDescription: 'Use grid drawing with smart cell detection based on Leonardo da Vincis technique. Create professional art worksheets with auto-detected drawing cells for kids.',
    focusKeyword: 'grid drawing smart cell detection kids',
  },
  {
    slug: 'image-cryptogram-generator-patent-worthy-visual-substitution-cipher',
    metaTitle: 'Image Cryptogram Generator Visual Substitution Cipher | LCS',
    metaDescription: 'Generate image cryptograms using a visual substitution cipher that makes decoding fun from age 4. Letter-to-image puzzles with triple reinforcement encoding.',
    focusKeyword: 'image cryptogram generator visual substitution cipher',
  },
  {
    slug: 'why-picture-based-worksheets-produce-23-better-retention',
    metaTitle: 'Picture Based Worksheets Produce Better Retention | LCS',
    metaDescription: 'Discover why picture-based worksheets produce 2.3 times better retention than text only. Learn dual coding theory and the CRA progression for young learners.',
    focusKeyword: 'picture based worksheets better retention',
  },
  {
    slug: 'word-search-generator-create-custom-puzzles-with-answer-keys',
    metaTitle: 'Word Search Generator Custom Puzzles With Answers | LCS',
    metaDescription: 'Generate custom word search puzzles with automatic answer keys. Editable grids with diagonal and backwards options across 11 languages for any classroom topic.',
    focusKeyword: 'word search generator custom puzzles answer keys',
  },
  {
    slug: 'i-spy-worksheets-with-professional-layouts-in-3-minutes',
    metaTitle: 'I Spy Worksheets With Professional Layouts Free | LCS',
    metaDescription: 'Create professional I Spy worksheets in minutes using the zero-overlap algorithm. Includes ADHD-friendly strategies and visual perception activities for kids.',
    focusKeyword: 'I Spy worksheets professional layouts free',
  },
  {
    slug: 'picture-sudoku-for-kids-ages-4-8-complete-teaching-guide',
    metaTitle: 'Picture Sudoku for Kids Ages 4 to 8 Teaching Guide | LCS',
    metaDescription: 'Teach logic to young learners with picture sudoku for kids ages 4 to 8. Complete guide covering why images replace numbers and how grid sizes build reasoning.',
    focusKeyword: 'picture sudoku for kids ages 4 to 8 guide',
  },
  {
    slug: 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
    metaTitle: 'Differentiated Instruction With Worksheet Generators | LCS',
    metaDescription: 'Master differentiated instruction with editable worksheet generators. Create three leveled worksheets in ten minutes so every student learns at their own pace.',
    focusKeyword: 'differentiated instruction editable worksheet generators',
  },
  {
    slug: 'affordable-vs-expensive-worksheet-platforms',
    metaTitle: 'Affordable vs Expensive Worksheet Platforms Compared | LCS',
    metaDescription: 'Compare affordable and expensive worksheet platforms side by side. Feature analysis of LessonCraftStudio, TPT, Education.com, and Canva Pro with ROI breakdown.',
    focusKeyword: 'affordable vs expensive worksheet platforms compared',
  },
];

async function main() {
  console.log('Part 92: Updating SEO metadata for blog posts 101-110\n');

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
