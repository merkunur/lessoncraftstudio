#!/usr/bin/env node
/**
 * seo-blog-batch-86.js — Part 86: Hand-crafted SEO metadata for blog posts 41-50
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-86.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets',
    metaTitle: 'Upper Elementary Worksheets for Advanced Learners | LCS',
    metaDescription: 'Challenge grades 4-5 students with complex worksheets that build higher-order thinking. Multi-step problems, logic puzzles, and extension activities included.',
    focusKeyword: 'upper elementary advanced learner worksheets',
  },
  {
    slug: 'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
    metaTitle: 'PreK-K Developmentally Appropriate Worksheet Ideas | LCS',
    metaDescription: 'Design age-appropriate worksheets for PreK and kindergarten learners. Fine motor activities, sensory-friendly layouts, and play-based learning printables.',
    focusKeyword: 'prek kindergarten developmentally appropriate worksheets',
  },
  {
    slug: 'parent-engagement-home-school-connection-worksheets-that-build-partnerships',
    metaTitle: 'Parent Engagement Worksheets for Home-School Links | LCS',
    metaDescription: 'Strengthen the home-school connection with take-home worksheets parents love. Family activity pages, bilingual instructions, and progress sharing templates.',
    focusKeyword: 'parent engagement home school worksheets',
  },
  {
    slug: 'formative-assessment-progress-monitoring-using-worksheets-for-data-driven-instruction',
    metaTitle: 'Formative Assessment Worksheets for Progress Checks | LCS',
    metaDescription: 'Use quick formative assessment worksheets to monitor student progress in real time. Exit tickets, skill checks, and tracking sheets for daily instruction.',
    focusKeyword: 'formative assessment progress monitoring worksheets',
  },
  {
    slug: 'reading-comprehension-vocabulary-building-6-worksheet-strategies',
    metaTitle: 'Reading Comprehension Vocabulary Worksheets K-5 | LCS',
    metaDescription: 'Boost reading comprehension and vocabulary with six proven worksheet strategies. Context clues, graphic organizers, and word-building activities for K-5.',
    focusKeyword: 'reading comprehension vocabulary worksheets',
  },
  {
    slug: 'summer-learning-preventing-summer-slide-with-take-home-worksheet-packets',
    metaTitle: 'Summer Learning Packets to Prevent Summer Slide | LCS',
    metaDescription: 'Send students home with engaging summer worksheet packets that prevent learning loss. Weekly review bundles, reading logs, and fun math practice pages.',
    focusKeyword: 'summer learning packets prevent summer slide',
  },
  {
    slug: 'co-teaching-resource-room-collaborative-worksheet-planning-strategies',
    metaTitle: 'Co-Teaching Collaborative Worksheet Planning Guide | LCS',
    metaDescription: 'Plan differentiated worksheets with your co-teacher using collaborative strategies. Shared templates, resource room adaptations, and role-based prep tips.',
    focusKeyword: 'co-teaching collaborative worksheet planning',
  },
  {
    slug: 'print-vs-digital-worksheet-delivery-choosing-the-right-format-for-your-classroom',
    metaTitle: 'Print vs Digital Worksheets: Choosing the Best Fit | LCS',
    metaDescription: 'Compare print and digital worksheet formats to find what works for your classroom. Cost analysis, engagement data, and practical hybrid delivery models.',
    focusKeyword: 'print vs digital worksheets classroom',
  },
  {
    slug: 'time-saving-workflow-batch-preparation-monthly-planning-strategies',
    metaTitle: 'Time Saving Worksheet Batch Prep and Planning Tips | LCS',
    metaDescription: 'Save hours each week with batch worksheet preparation and monthly planning workflows. Templates, scheduling systems, and prep-day checklists for teachers.',
    focusKeyword: 'time saving worksheet batch preparation',
  },
  {
    slug: 'classroom-management-using-worksheets-for-transitions-early-finishers-behavior-support',
    metaTitle: 'Classroom Management Worksheets for Transitions | LCS',
    metaDescription: 'Use targeted worksheets to manage transitions, engage early finishers, and support positive behavior. Ready-to-use anchor activities and cool-down pages.',
    focusKeyword: 'classroom management worksheets transitions',
  },
];

async function main() {
  console.log('Part 86: Updating SEO metadata for blog posts 41-50\n');

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
