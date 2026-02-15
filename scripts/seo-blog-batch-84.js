#!/usr/bin/env node
/**
 * seo-blog-batch-84.js — Part 84: Hand-crafted SEO metadata for blog posts 21-30
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-84.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'advanced-differentiation-managing-multi-level-classrooms',
    metaTitle: 'Differentiated Instruction Strategies for Teachers | LCS',
    metaDescription: 'Manage multi-level classrooms with tiered worksheets, flexible grouping, and scaffolded activities. Practical differentiation for mixed-ability learners.',
    focusKeyword: 'differentiated instruction strategies',
  },
  {
    slug: 'integrating-multiple-subjects-through-worksheets',
    metaTitle: 'Cross-Curricular Worksheet Activities for Teachers | LCS',
    metaDescription: 'Connect math, reading, science, and art through unified thematic units. Cross-curricular worksheets that build deeper understanding across multiple subjects.',
    focusKeyword: 'cross-curricular worksheet activities',
  },
  {
    slug: 'first-week-of-school-getting-started-with-routines-expectations-using-worksheets',
    metaTitle: 'First Week of School Activities and Routines Guide | LCS',
    metaDescription: 'Launch your school year with printable routines charts, expectation-setting worksheets, and icebreaker activities that build community from day one in class.',
    focusKeyword: 'first week of school activities',
  },
  {
    slug: 'year-end-review-reflection-using-worksheets-to-celebrate-growth-learning',
    metaTitle: 'End of Year Classroom Review and Reflection Ideas | LCS',
    metaDescription: 'Celebrate student growth with year-end reflection worksheets, portfolio activities, and memory book printables. Meaningful closure ideas for PreK to 2nd grade.',
    focusKeyword: 'end of year classroom review',
  },
  {
    slug: 'budget-friendly-classroom-resources-maximizing-learning-on-minimal-budget',
    metaTitle: 'Budget Friendly Classroom Resources for Teachers | LCS',
    metaDescription: 'Stretch your classroom budget with free worksheet generators, reusable activity systems, and smart purchasing strategies that deliver quality without the cost.',
    focusKeyword: 'budget friendly classroom resources',
  },
  {
    slug: 'classroom-celebrations-motivational-systems-rewarding-progress-with-worksheets',
    metaTitle: 'Classroom Reward and Motivation Systems That Work | LCS',
    metaDescription: 'Build intrinsic motivation with printable reward charts, celebration worksheets, and progress tracking tools. Proven systems that keep young students engaged.',
    focusKeyword: 'classroom reward and motivation systems',
  },
  {
    slug: 'substitute-teacher-emergency-plans-ready-made-worksheet-lesson-plans',
    metaTitle: 'Substitute Teacher Lesson Plans Ready to Print | LCS',
    metaDescription: 'Create grab-and-go sub plans with pre-made worksheets, clear instructions, and classroom management tips. Emergency lesson kits any substitute can follow.',
    focusKeyword: 'substitute teacher lesson plans',
  },
  {
    slug: 'professional-development-teacher-training-using-worksheets-for-pd-practice',
    metaTitle: 'Teacher Professional Development Activities Guide | LCS',
    metaDescription: 'Elevate your PD sessions with hands-on practice worksheets, reflection templates, and collaborative learning activities designed for educator training days.',
    focusKeyword: 'teacher professional development activities',
  },
  {
    slug: 'peer-tutoring-student-teaching-leveraging-worksheets-for-student-led-learning',
    metaTitle: 'Peer Tutoring Strategies for Elementary Students | LCS',
    metaDescription: 'Set up effective peer tutoring with structured worksheets, partner activities, and student-led learning routines. Build collaboration and reinforce content.',
    focusKeyword: 'peer tutoring strategies elementary',
  },
  {
    slug: 'social-emotional-learning-sel-integrating-sel-with-academic-worksheets',
    metaTitle: 'SEL Academic Worksheet Integration for Teachers | LCS',
    metaDescription: 'Blend social-emotional learning with math and reading using dual-purpose worksheets. Teach empathy, cooperation, and self-regulation alongside academics.',
    focusKeyword: 'SEL academic worksheet integration',
  },
];

async function main() {
  console.log('Part 84: Updating SEO metadata for blog posts 21-30\n');

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
