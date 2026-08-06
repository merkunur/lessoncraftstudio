#!/usr/bin/env node
/**
 * seo-blog-batch-168.js — Part 168: Danish blog SEO metadata for posts 1-19
 *
 * Updates translations.da metaTitle, metaDescription, and focusKeyword
 * for the first 19 Danish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-168.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #1: 10 Bedste Opgavegeneratorer til 2. Klasse
    slug: 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8',
    metaTitle: '10 Bedste Opgavegeneratorer til 2. Klasse (7\u20138 \u00e5r)',
    metaDescription: 'Find 10 opgavegeneratorer til 2. klasse med matematik og logik. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgavegeneratorer 2. klasse',
  },
  {
    // #2: 10 Bedste Opgavegeneratorer til 3. Klasse
    slug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    metaTitle: '10 Bedste Opgavegeneratorer til 3. Klasse (8\u20139 \u00e5r)',
    metaDescription: 'Oplev 10 opgavegeneratorer til 3. klasse med algebra og ordspil. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgavegeneratorer 3. klasse',
  },
  {
    // #3: 10 Bedste Opgavegeneratorer til 4.\u20135. Klasse
    slug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
    metaTitle: '10 Bedste Opgavegeneratorer til 4.\u20135. Klasse (9\u201311 \u00e5r)',
    metaDescription: 'Sammenlign 10 opgavegeneratorer til 4.\u20135. klasse med sudoku og logik. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgavegeneratorer 4.\u20135. klasse',
  },
  {
    // #4: 10 Bedste Opgavegeneratorer til B\u00f8rnehaveklassen
    slug: 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6',
    metaTitle: '10 Bedste Opgavegeneratorer til B\u00f8rnehaveklassen (5\u20136 \u00e5r)',
    metaDescription: 'Find 10 opgavegeneratorer til b\u00f8rnehaveklassen med tal og bogstaver. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgavegeneratorer b\u00f8rnehaveklasse',
  },
  {
    // #5: 10 Bedste Opgavegeneratorer til F\u00f8rskolen
    slug: 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5',
    metaTitle: '10 Bedste Opgavegeneratorer til F\u00f8rskolen (3\u20135 \u00e5r)',
    metaDescription: 'Find 10 opgavegeneratorer til f\u00f8rskolen med farver og motorik. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgavegeneratorer f\u00f8rskole',
  },
  {
    // #6: 10 Bedste Opgaveskabelonv\u00e6rkt\u00f8jer til 1. Klasses L\u00e6rere
    slug: 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7',
    metaTitle: '10 Bedste Opgaveskabelonv\u00e6rkt\u00f8jer til 1. Klasses L\u00e6rere',
    metaDescription: 'Sammenlign 10 opgaveskabelonv\u00e6rkt\u00f8jer til 1. klasses l\u00e6rere. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'opgaveskabeloner 1. klasse',
  },
  {
    // #7: 1. Klasses L\u00e6sef\u00e6rdigheder
    slug: '1st-grade-literacy-tools-word-search-alphabet-train-writing-practice',
    metaTitle: '1. Klasses L\u00e6sef\u00e6rdigheder: Ordleg, Alfabettog og Skrivning',
    metaDescription: 'Udvikl l\u00e6sef\u00e6rdigheder i 1. klasse med ordleg og alfabettog. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'l\u00e6sef\u00e6rdigheder 1. klasse',
  },
  {
    // #8: 33 Tilpasselige Opgavegeneratorer til Indskolingsl\u00e6reren
    slug: '33-editable-worksheet-generators-every-elementary-teacher-needs',
    metaTitle: '33 Tilpasselige Opgavegeneratorer til Indskolingsl\u00e6reren',
    metaDescription: 'Udforsk 33 tilpasselige opgavegeneratorer til indskolingsl\u00e6rere. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: '33 opgavegeneratorer til l\u00e6rere',
  },
  {
    // #9: 3. Klasses Matematik: Algebraisk T\u00e6nkning og Puslespil
    slug: '3rd-grade-advanced-math-symbolic-algebra-math-puzzles-code-addition',
    metaTitle: '3. Klasses Matematik: Algebraisk T\u00e6nkning og Puslespil',
    metaDescription: 'Tr\u00e6n algebraisk t\u00e6nkning i 3. klasse med puslespil og koder. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'algebraisk t\u00e6nkning 3. klasse',
  },
  {
    // #10: 7 Billedbaserede Generatorer til Sprogundervisningens Begyndere
    slug: '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
    metaTitle: '7 Billedbaserede Opgavegeneratorer til Sprogundervisning',
    metaDescription: 'Brug 7 billedbaserede generatorer til sprogundervisning p\u00e5 11 sprog. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'sprogundervisning generatorer',
  },
  {
    // #11: ADHD-st\u00f8tte: 9 Generatorer til Kognitiv Aflastning
    slug: 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
    metaTitle: 'ADHD-st\u00f8tte: 9 Generatorer til Kognitiv Aflastning',
    metaDescription: 'St\u00f8t ADHD-elever med 9 visuelle generatorer til kognitiv aflastning. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'ADHD visuelle opgaver',
  },
  {
    // #12: Intelligent Cellegenkendelse i Rastertegning: Pixelanalyse
    slug: 'smart-cell-detection-in-grid-drawing-how-pixel-analysis-prevents-blank-clue-cells',
    metaTitle: 'Intelligent Cellegenkendelse i Rastertegning: Pixelanalyse',
    metaDescription: 'L\u00e6r om intelligent cellegenkendelse i rastertegning med pixelanalyse. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'rastertegning algoritme',
  },
  {
    // #13: 4.\u20135. Klasse: Rastertegning, Sudoku og Logik
    slug: 'upper-elementary-challenges-grid-drawing-complex-patterns-multi-step-logic',
    metaTitle: '4.\u20135. Klasses Udfordringer: Rastertegning, Sudoku og Logik',
    metaDescription: 'Udfordr 4.\u20135. klasse med rastertegning, sudoku og logikopgaver. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'udfordringsopgaver 4.\u20135. klasse',
  },
  {
    // #14: Avancerede Opgaver til Dygtige Elever (4.\u20135. Klasse)
    slug: 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets',
    metaTitle: 'Avancerede Opgaver til Dygtige Elever (4.\u20135. Klasse)',
    metaDescription: 'Giv dygtige elever avancerede udfordringsopgaver i 4.\u20135. klasse. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'udfordringsopgaver avancerede',
  },
  {
    // #15: Den Nye L\u00e6rers Guide: Systemer og Opgaveskabeloner
    slug: 'getting-started-guide-for-new-teachers-essential-worksheet-systems',
    metaTitle: 'Den Nye L\u00e6rers Guide: Systemer og Opgaveskabeloner',
    metaDescription: 'Ny l\u00e6rers guide til systemer, rutiner og opgaveskabeloner i skolen. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'den nye l\u00e6rers guide',
  },
  {
    // #16: Evaluering og L\u00e6ringsfremskridt med Opgaveark
    slug: 'assessment-progress-tracking-using-worksheets-for-data-collection',
    metaTitle: 'Evaluering og Sporing af L\u00e6ringsfremskridt med Opgaveark',
    metaDescription: 'Brug opgaveark til evaluering af l\u00e6ring og sporing af fremskridt. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'l\u00e6ringsevaluering opgaveark',
  },
  {
    // #17: Autismespektrum St\u00f8tte: 8 Visuelle Generatorer
    slug: 'autism-friendly-visual-learning-8-predictable-worksheet-generators',
    metaTitle: 'Autismespektrum St\u00f8tte: 8 Visuelle Opgavegeneratorer',
    metaDescription: 'St\u00f8t autismespektrumelever med 8 visuelle og forudsigelige opgaver. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'autisme visuelle opgaver',
  },
  {
    // #18: Billige Undervisningsmaterialer: Maksim\u00e9r L\u00e6ring p\u00e5 Budget
    slug: 'budget-friendly-classroom-resources-maximizing-learning-on-minimal-budget',
    metaTitle: 'Billige Undervisningsmaterialer: Maksim\u00e9r L\u00e6ring p\u00e5 Budget',
    metaDescription: 'Maksim\u00e9r l\u00e6ring med \u00f8konomiske undervisningsmaterialer p\u00e5 budget. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'billige undervisningsmaterialer',
  },
  {
    // #19: Differentiering i Praksis: Undervisning p\u00e5 Flere Niveauer
    slug: 'advanced-differentiation-managing-multi-level-classrooms',
    metaTitle: 'Differentiering i Praksis: Undervisning p\u00e5 Flere Niveauer',
    metaDescription: 'Differenti\u00e9r undervisningen med tilpassede opgaver til alle niveauer. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.',
    focusKeyword: 'differentiering opgaveark',
  },
];

async function main() {
  console.log('Part 168: Updating Danish SEO metadata for blog posts 1-19\n');

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
    if (!translations.da) {
      console.log(`SKIP: ${u.slug} has no Danish translation`);
      skipped++;
      continue;
    }

    translations.da.metaTitle = u.metaTitle;
    translations.da.metaDescription = u.metaDescription;
    translations.da.focusKeyword = u.focusKeyword;

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
