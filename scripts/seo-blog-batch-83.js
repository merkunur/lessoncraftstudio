#!/usr/bin/env node
/**
 * seo-blog-batch-83.js — Part 83: Hand-crafted SEO metadata for blog posts 11-20
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-83.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'transition-times-procedures-maintaining-flow-with-worksheet-based-routines',
    metaTitle: 'Classroom Transition Strategies Using Worksheets | LCS',
    metaDescription: 'Reduce downtime between lessons with worksheet-based transition routines. Includes countdown systems, silent starters, and procedures that keep kids on task.',
    focusKeyword: 'classroom transition strategies',
  },
  {
    slug: 'worksheet-generator-comparison-lessoncraftstudio-vs-competitors',
    metaTitle: 'Worksheet Generator Comparison: Find the Best | LCS',
    metaDescription: 'Compare worksheet generator features, pricing, and output quality side by side. See how LessonCraftStudio measures up against other popular tools for teachers.',
    focusKeyword: 'worksheet generator comparison',
  },
  {
    slug: 'celebrating-100-days-of-school-milestone-activities-themed-worksheets',
    metaTitle: '100 Days of School Activities and Themed Worksheets | LCS',
    metaDescription: 'Plan an unforgettable 100th day celebration with themed math challenges, counting collections, STEM experiments, and creative printable projects for students.',
    focusKeyword: '100 days of school activities',
  },
  {
    slug: 'homework-vs-classwork-finding-the-balanced-approach-with-worksheets',
    metaTitle: 'Homework vs Classwork: Finding the Right Balance | LCS',
    metaDescription: 'Discover research-backed strategies for balancing homework and classwork. Covers meaningful assignment design, workload management, and family engagement tips.',
    focusKeyword: 'homework vs classwork balance',
  },
  {
    slug: 'mental-health-social-emotional-support-worksheets-for-whole-child-wellness',
    metaTitle: 'Social Emotional Learning Worksheets for Students | LCS',
    metaDescription: 'Help students build emotional intelligence with printable feelings worksheets, coping strategy cards, mindfulness activities, and daily emotion check-in tools.',
    focusKeyword: 'social emotional learning worksheets',
  },
  {
    slug: 'independent-work-time-teaching-self-directed-learning-with-worksheets',
    metaTitle: 'Self-Directed Learning Worksheets for Young Kids | LCS',
    metaDescription: 'Build student independence with self-paced worksheets, choice boards, and time management tools. Practical strategies for teaching autonomous work habits early.',
    focusKeyword: 'self-directed learning worksheets',
  },
  {
    slug: 'english-language-learners-ellesl-visual-worksheet-strategies-for-language-acquisition',
    metaTitle: 'ELL and ESL Visual Worksheet Strategies for Class | LCS',
    metaDescription: 'Support English language learners with visual worksheets, vocabulary scaffolding, picture-supported activities, and sentence frames that accelerate acquisition.',
    focusKeyword: 'ELL ESL worksheet strategies',
  },
  {
    slug: 'classroom-tools-digital-integration-with-printable-worksheets',
    metaTitle: 'Digital and Printable Worksheet Integration Guide | LCS',
    metaDescription: 'Combine digital tools with printable worksheets for hybrid learning. Create QR code activities, interactive stations, and blended classroom experiences easily.',
    focusKeyword: 'digital printable worksheet integration',
  },
  {
    slug: 'creative-assessment-alternatives-beyond-traditional-tests',
    metaTitle: 'Creative Assessment Alternatives Beyond Testing | LCS',
    metaDescription: 'Move beyond traditional tests with performance tasks, portfolio reviews, and project-based assessments. Practical alternatives that truly measure understanding.',
    focusKeyword: 'creative assessment alternatives',
  },
  {
    slug: 'intervention-strategies-response-to-intervention',
    metaTitle: 'Response to Intervention Worksheets and Strategies | LCS',
    metaDescription: 'Implement RTI with progress monitoring worksheets, tiered intervention activities, and targeted skill practice. Data-tracking tools for each intervention level.',
    focusKeyword: 'response to intervention worksheets',
  },
];

async function main() {
  console.log('Part 83: Updating SEO metadata for blog posts 11-20\n');

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
