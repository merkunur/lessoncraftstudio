#!/usr/bin/env node
/**
 * seo-blog-batch-85.js — Part 85: Hand-crafted SEO metadata for blog posts 31-40
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-85.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'blended-learning-technology-integration-combining-digital-and-print-worksheets',
    metaTitle: 'Blended Learning With Digital and Print Worksheets | LCS',
    metaDescription: 'Combine digital tools with printable worksheets for effective blended learning. Station models, tech rotation tips, and offline-online activity pairings.',
    focusKeyword: 'blended learning digital print worksheets',
  },
  {
    slug: 'stemsteam-integration-connecting-worksheets-to-hands-on-engineering-art',
    metaTitle: 'STEM STEAM Integration Worksheets for Teachers | LCS',
    metaDescription: 'Connect hands-on engineering and art projects with structured worksheets. STEAM lesson ideas that bridge creative exploration and academic documentation.',
    focusKeyword: 'STEM STEAM integration worksheets',
  },
  {
    slug: 'student-goal-setting-self-monitoring-building-self-directed-learners',
    metaTitle: 'Student Goal Setting and Self-Monitoring Activities | LCS',
    metaDescription: 'Build self-directed learners with printable goal trackers, progress charts, and reflection worksheets. Teach young students to own their learning journey.',
    focusKeyword: 'student goal setting self-monitoring',
  },
  {
    slug: 'writing-across-curriculum-integrating-writing-practice-into-every-subject',
    metaTitle: 'Writing Across the Curriculum Strategies for K-2 | LCS',
    metaDescription: 'Integrate meaningful writing practice into math, science, and social studies. Journal prompts, labeling activities, and sentence starters for every subject.',
    focusKeyword: 'writing across the curriculum strategies',
  },
  {
    slug: 'growth-mindset-development-using-challenge-worksheets-to-build-persistence',
    metaTitle: 'Growth Mindset Worksheets and Activities for Kids | LCS',
    metaDescription: 'Develop persistence and resilience with challenge-level worksheets, mistake-friendly activities, and printable affirmation tools designed for early learners.',
    focusKeyword: 'growth mindset worksheets activities kids',
  },
  {
    slug: 'data-analysis-for-instructional-decisions-using-worksheet-results-to-drive-teaching',
    metaTitle: 'Data Driven Instruction Using Worksheet Results | LCS',
    metaDescription: 'Turn worksheet data into actionable teaching decisions. Track student progress, identify skill gaps, and adjust instruction with simple analysis methods.',
    focusKeyword: 'data driven instruction worksheet analysis',
  },
  {
    slug: 'middle-school-transition-preparing-5th-graders-for-independent-learning',
    metaTitle: 'Middle School Transition Activities for 5th Graders | LCS',
    metaDescription: 'Prepare fifth graders for middle school with independence-building worksheets, organizational skill activities, and self-management practice templates.',
    focusKeyword: 'middle school transition activities',
  },
  {
    slug: 'backward-design-curriculum-mapping-planning-with-end-goals-in-mind',
    metaTitle: 'Backward Design Curriculum Planning for Teachers | LCS',
    metaDescription: 'Plan effective units using backward design and curriculum mapping. Start with learning goals, align assessments, then select worksheets that match outcomes.',
    focusKeyword: 'backward design curriculum planning',
  },
  {
    slug: 'learning-centers-station-rotation-efficient-independent-work-management',
    metaTitle: 'Learning Centers and Station Rotation Management | LCS',
    metaDescription: 'Set up efficient learning centers with rotation schedules, self-check worksheets, and management tools. Keep students engaged during independent station work.',
    focusKeyword: 'learning centers station rotation',
  },
  {
    slug: 'test-preparation-standardized-assessment-low-stress-practice-strategies',
    metaTitle: 'Low Stress Test Prep Strategies for Young Students | LCS',
    metaDescription: 'Reduce test anxiety with gradual practice worksheets, familiar formats, and confidence-building activities. Prepare students for standardized tests calmly.',
    focusKeyword: 'low stress test prep strategies',
  },
];

async function main() {
  console.log('Part 85: Updating SEO metadata for blog posts 31-40\n');

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
