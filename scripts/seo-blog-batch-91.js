#!/usr/bin/env node
/**
 * seo-blog-batch-91.js — Part 91: Hand-crafted SEO metadata for blog posts 91-100
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-91.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'visual-discrimination-activities-frostig-hornes-five-foundational-skills',
    metaTitle: 'Visual Discrimination Activities Frostig Horne Skills | LCS',
    metaDescription: 'Develop visual discrimination using Frostig and Hornes five foundational skills. Research-backed activities for figure-ground and spatial perception for kids.',
    focusKeyword: 'visual discrimination activities Frostig Horne',
  },
  {
    slug: 'how-pattern-recognition-builds-mathematical-thinking-research-from-pre-k-to-grade-5',
    metaTitle: 'Pattern Recognition Builds Mathematical Thinking | LCS',
    metaDescription: 'See how pattern recognition builds mathematical thinking from pre-K to grade 5. Research-backed activities that develop number sense and algebraic reasoning.',
    focusKeyword: 'pattern recognition mathematical thinking',
  },
  {
    slug: 'concrete-representational-abstract-progression-for-elementary-math',
    metaTitle: 'CRA Progression for Elementary Math Worksheets | LCS',
    metaDescription: 'Apply the concrete-representational-abstract progression to elementary math worksheets. Research-backed CRA framework for building deep number understanding.',
    focusKeyword: 'concrete representational abstract progression math',
  },
  {
    slug: 'how-to-scaffold-worksheet-difficulty',
    metaTitle: 'How to Scaffold Worksheet Difficulty for Students | LCS',
    metaDescription: 'Learn how to scaffold worksheet difficulty so every student progresses at the right pace. Practical strategies for adjusting complexity across grade levels.',
    focusKeyword: 'scaffold worksheet difficulty students',
  },
  {
    slug: 'combining-visual-verbal-learning-for-23-better-recall',
    metaTitle: 'Visual and Verbal Learning Dual Coding Worksheets | LCS',
    metaDescription: 'Combine visual and verbal learning for better recall with dual coding worksheets. Research shows pairing images with words boosts memory retention in students.',
    focusKeyword: 'visual verbal learning dual coding worksheets',
  },
  {
    slug: 'the-science-behind-word-scrambles-how-letter-rearrangement-accelerates-spelling-by-32',
    metaTitle: 'Science Behind Word Scrambles and Spelling Growth | LCS',
    metaDescription: 'Discover the science behind word scrambles and how letter rearrangement accelerates spelling growth. Research linking anagram practice to orthographic skill.',
    focusKeyword: 'science behind word scrambles spelling',
  },
  {
    slug: 'image-crossword-generator-post-generation-editing-feature',
    metaTitle: 'Image Crossword Generator With Editing Features | LCS',
    metaDescription: 'Use the image crossword generator with post-generation editing to customize puzzles. Swap clues, adjust grids, and create perfect visual crosswords for class.',
    focusKeyword: 'image crossword generator editing feature',
  },
  {
    slug: 'word-scramble-with-fractional-clue-algorithm-adaptive-difficulty-based-on-word-length',
    metaTitle: 'Word Scramble Fractional Clue Algorithm Explained | LCS',
    metaDescription: 'See how the fractional clue algorithm adapts word scramble difficulty based on word length. Adaptive hints that keep puzzles challenging but solvable for kids.',
    focusKeyword: 'word scramble fractional clue algorithm',
  },
  {
    slug: 'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition',
    metaTitle: 'Pattern Train Cut and Paste Multi-Sensory Learning | LCS',
    metaDescription: 'Boost pattern recognition with pattern train cut-and-paste worksheets. Multi-sensory learning combines visual, tactile, and cognitive skills in one activity.',
    focusKeyword: 'pattern train cut and paste multi-sensory learning',
  },
  {
    slug: 'cipher-based-addition-combining-cryptography-with-elementary-math',
    metaTitle: 'Cipher Based Addition Cryptography Math Worksheets | LCS',
    metaDescription: 'Combine cryptography with elementary math using cipher-based addition worksheets. Students decode number ciphers while practicing addition and problem solving.',
    focusKeyword: 'cipher based addition cryptography math worksheets',
  },
];

async function main() {
  console.log('Part 91: Updating SEO metadata for blog posts 91-100\n');

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
