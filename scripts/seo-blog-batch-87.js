#!/usr/bin/env node
/**
 * seo-blog-batch-87.js — Part 87: Hand-crafted SEO metadata for blog posts 51-60
 *
 * Updates metaTitle, metaDescription, and focusKeyword for the next 10
 * published English blog posts with informational-intent optimized metadata.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-87.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    slug: 'back-to-school-seasonal-worksheet-planning-year-round-content-strategy',
    metaTitle: 'Back to School Seasonal Worksheet Planning Guide | LCS',
    metaDescription: 'Plan worksheets for every season with a year-round content calendar. Back to school, holiday, and seasonal activity ideas organized by month and theme.',
    focusKeyword: 'back to school seasonal worksheet planning',
  },
  {
    slug: 'assessment-progress-tracking-using-worksheets-for-data-collection',
    metaTitle: 'Worksheet Assessment and Progress Tracking Methods | LCS',
    metaDescription: 'Turn daily worksheets into powerful assessment tools for tracking student growth. Data collection templates, progress charts, and skill mastery checklists.',
    focusKeyword: 'worksheet assessment progress tracking',
  },
  {
    slug: 'social-studies-vocabulary-integration-7-generators-for-history-geography',
    metaTitle: 'Social Studies Vocabulary Worksheets for History | LCS',
    metaDescription: 'Build history and geography vocabulary with cross-curricular worksheet generators. Timeline activities, map labeling, and content-area word walls for K-5.',
    focusKeyword: 'social studies vocabulary worksheets history',
  },
  {
    slug: 'science-vocabulary-integration-8-cross-curricular-worksheet-generators',
    metaTitle: 'Science Vocabulary Cross-Curricular Worksheets K-5 | LCS',
    metaDescription: 'Integrate science vocabulary into literacy practice with cross-curricular worksheets. Lab report templates, science journals, and observation recording sheets.',
    focusKeyword: 'science vocabulary cross-curricular worksheets',
  },
  {
    slug: 'commercial-license-selling-worksheets-on-tpt-etsy-and-teacher-marketplaces',
    metaTitle: 'Selling Worksheets on TPT Etsy Teacher Marketplaces | LCS',
    metaDescription: 'Learn how to create, license, and sell original worksheets on TPT, Etsy, and other teacher marketplaces. Pricing, formatting, and listing optimization tips.',
    focusKeyword: 'selling worksheets TPT Etsy marketplaces',
  },
  {
    slug: 'parent-homeschool-worksheet-generators-complete-curriculum-support',
    metaTitle: 'Homeschool Worksheet Generators for Full Curriculum | LCS',
    metaDescription: 'Support your homeschool curriculum with printable worksheet generators covering math, reading, and more. Flexible tools that adapt to any teaching approach.',
    focusKeyword: 'homeschool worksheet generators curriculum',
  },
  {
    slug: 'visual-spatial-skills-development-7-worksheets-for-stem-foundation',
    metaTitle: 'Visual Spatial Skills Worksheets for STEM Learners | LCS',
    metaDescription: 'Develop visual-spatial reasoning with worksheets designed for early STEM foundations. Pattern recognition, grid work, and spatial rotation activities for kids.',
    focusKeyword: 'visual spatial skills worksheets STEM',
  },
  {
    slug: 'kinesthetic-learning-6-movement-integrated-worksheet-generators',
    metaTitle: 'Kinesthetic Learning Movement Worksheet Activities | LCS',
    metaDescription: 'Combine movement with learning using kinesthetic worksheet activities. Cut-and-sort tasks, hands-on manipulatives, and active response sheets for busy learners.',
    focusKeyword: 'kinesthetic learning movement worksheets',
  },
  {
    slug: 'autism-friendly-visual-learning-8-predictable-worksheet-generators',
    metaTitle: 'Autism Friendly Visual Learning Worksheets for Kids | LCS',
    metaDescription: 'Create predictable, low-sensory worksheets for autistic learners. Visual schedules, structured layouts, and consistent formats that reduce cognitive overload.',
    focusKeyword: 'autism friendly visual learning worksheets',
  },
  {
    slug: 'working-memory-accommodations-7-worksheets-with-visual-support',
    metaTitle: 'Working Memory Support Worksheets With Visual Aids | LCS',
    metaDescription: 'Help students with working memory challenges using visually supported worksheets. Step-by-step prompts, chunked instructions, and reference strips included.',
    focusKeyword: 'working memory support worksheets visual',
  },
];

async function main() {
  console.log('Part 87: Updating SEO metadata for blog posts 51-60\n');

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
