#!/usr/bin/env node
/**
 * seo-blog-batch-82.js — Part 82: Hand-crafted SEO metadata for blog posts 1-10
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the 10 oldest
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-82.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
    metaTitle: 'Yearly Worksheet Planning: 12-Month Strategy | LCS',
    metaDescription: 'Plan every month of your school year with themed worksheets, seasonal activities, assessment milestones, and standards-aligned strategies for PreK to 2nd grade.',
    focusKeyword: 'yearly worksheet planning guide',
  },
  {
    slug: 'future-of-education-technology-trends-the-role-of-worksheet-generators',
    metaTitle: 'Education Technology Trends Reshaping Classrooms | LCS',
    metaDescription: 'Discover how AI tutoring, adaptive learning platforms, and digital worksheet tools are transforming early education and practical ways teachers can adapt today.',
    focusKeyword: 'education technology trends teachers',
  },
  {
    slug: 'success-stories-real-teachers-share-how-worksheets-transformed-their-classrooms',
    metaTitle: 'Teacher Worksheet Success Stories from Classrooms | LCS',
    metaDescription: 'Hear from real educators who cut prep time in half and boosted engagement with printable worksheets. Read their measurable before-and-after classroom results.',
    focusKeyword: 'teacher worksheet success stories',
  },
  {
    slug: 'copyright-compliance-legal-use-of-educational-materials-and-worksheets',
    metaTitle: 'Copyright Rules for Teachers Using Worksheets | LCS',
    metaDescription: 'Learn what educators can legally copy, share, and modify in the classroom. Covers fair use, Creative Commons, commercial licenses, and attribution basics.',
    focusKeyword: 'copyright rules for teachers',
  },
  {
    slug: 'complete-how-to-guide-mastering-worksheet-generators-from-setup-to-print',
    metaTitle: 'How to Use Worksheet Generators Step by Step | LCS',
    metaDescription: 'Follow this complete walkthrough to create custom worksheets \u2014 from choosing a generator and setting your options to downloading, printing, and organizing.',
    focusKeyword: 'how to use worksheet generators',
  },
  {
    slug: 'maximizing-learning-time-efficiency-strategies-with-worksheets',
    metaTitle: 'Maximize Classroom Learning Time with Worksheets | LCS',
    metaDescription: 'Cut prep time and reduce transitions with ready-to-use printable worksheets. Proven routines and strategies that keep young students engaged every minute.',
    focusKeyword: 'maximize classroom learning time',
  },
  {
    slug: 'seasonal-activities-year-round-engagement-with-themed-worksheets',
    metaTitle: 'Seasonal Themed Classroom Activities Year-Round | LCS',
    metaDescription: 'Keep students excited from fall to summer with themed worksheets tied to holidays, weather, and monthly celebrations. Printable activities for every season.',
    focusKeyword: 'seasonal themed classroom activities',
  },
  {
    slug: 'getting-started-guide-for-new-teachers-essential-worksheet-systems',
    metaTitle: 'New Teacher Worksheet Setup: Your First System | LCS',
    metaDescription: 'Starting your first teaching year? Build an organized worksheet system from day one with filing tips, printing schedules, and classroom distribution strategies.',
    focusKeyword: 'new teacher worksheet setup',
  },
  {
    slug: 'critical-thinking-problem-solving-developing-higher-order-skills-with-worksheets',
    metaTitle: 'Critical Thinking Activities for Young Learners | LCS',
    metaDescription: 'Develop higher-order thinking in PreK to 2nd grade students with logic puzzles, pattern challenges, and problem-solving worksheets that build reasoning skills.',
    focusKeyword: 'critical thinking activities for kids',
  },
  {
    slug: 'music-arts-integration-creative-worksheets-for-artistic-expression',
    metaTitle: 'Music and Arts Integration Worksheets for Class | LCS',
    metaDescription: 'Integrate music, drawing, color theory, and visual arts into daily lessons with creative printable worksheets that build artistic expression in young learners.',
    focusKeyword: 'music and arts integration worksheets',
  },
];

async function main() {
  console.log('Part 82: Updating SEO metadata for blog posts 1-10\n');

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
