#!/usr/bin/env node
/**
 * Part 108: Add SEO fields to insects/en.ts grade content
 *
 * Birds fixes (validator whitelist + species keyword) already applied via Edit tool.
 * This script adds seoTitle, seoDescription, seoKeywords to all 5 grades in insects/en.ts.
 */

const fs = require('fs');
const path = require('path');

const insectsFile = path.join(__dirname, '..', 'frontend', 'content', 'themes', 'insects', 'en.ts');

let content = fs.readFileSync(insectsFile, 'utf8');

// Grade SEO fields to insert
const gradeSEO = {
  preschool: {
    seoTitle: 'Insects Preschool Worksheets \u2014 Bug Counting & Tracing | LCS',
    seoDescription: 'Free printable insect worksheets for preschool (ages 3-4). Count ladybug spots, trace bug names, sort insects by color, and color butterfly wings. Get pages.',
    seoKeywords: 'preschool ladybug spot counting worksheets one-to-one correspondence ages 3-4, trace insect name vocabulary worksheets letter formation ant bee bug preschool free, sort bugs by color worksheets classification groups red green yellow preschool printable, color butterfly wing outline worksheets thick lines fine motor preschool pages, caterpillar and ladybug matching worksheets shadow silhouette recognition preschool activities',
  },
  kindergarten: {
    seoTitle: 'Insects Kindergarten Worksheets \u2014 Life Cycles & Sorting | LCS',
    seoDescription: 'Free printable insect worksheets for kindergarten (ages 5-6). Explore butterfly life cycles, sort bugs by habitat, add ladybug spots, and search insect words. Get sheets.',
    seoKeywords: 'kindergarten butterfly life cycle sequencing worksheets egg caterpillar chrysalis ages 5-6, sort insects versus non-insects worksheets leg counting classification kindergarten free, ladybug addition subtraction worksheets spot counters within 10 kindergarten printable, insect name word search worksheets moth wasp beetle cricket kindergarten pages, bug pattern sequence worksheets alternating insect types algebraic thinking kindergarten activities',
  },
  'first-grade': {
    seoTitle: 'Insects First Grade Worksheets \u2014 Bug Math & Reading | LCS',
    seoDescription: 'Free printable insect worksheets for first grade (ages 6-7). Solve bug word problems, read insect passages, build vocabulary, and write opinion paragraphs. Get pages.',
    seoKeywords: 'first grade insect word problems worksheets addition subtraction within 20 ages 6-7, bug habitat reading comprehension worksheets pollination defense mechanisms first grade free, insect vocabulary word scramble worksheets antenna thorax abdomen cocoon first grade printable, arthropod classification worksheets six legs three body segments distinguish grade 1 pages, favorite insect opinion writing prompt worksheets paragraph structure reasoning first grade activities',
  },
  'second-grade': {
    seoTitle: 'Insects Second Grade Worksheets \u2014 Data & Adaptation | LCS',
    seoDescription: 'Free printable insect worksheets for second grade (ages 7-8). Chart insect data, read about adaptations, write field guides, and measure wingspans. Get worksheets.',
    seoKeywords: 'second grade insect measurement worksheets millimeter growth caterpillar data ages 7-8, bug adaptation reading passages worksheets camouflage bioluminescence cause effect second grade free, insect field guide descriptive writing worksheets observation journal format second grade printable, insect tally chart bar graph worksheets schoolyard survey data collection grade 2 pages, dichotomous key insect identification worksheets systematic classification traits second grade activities',
  },
  'third-grade': {
    seoTitle: 'Insects Third Grade Worksheets \u2014 Research & Multiplication | LCS',
    seoDescription: 'Free printable insect worksheets for third grade (ages 8-9). Multiply colony populations, research entomology topics, compare metamorphosis essays, and measure precisely. Get pages.',
    seoKeywords: 'third grade ant colony multiplication worksheets population counts group totals ages 8-9, insect metamorphosis comparison essay worksheets complete incomplete multi-paragraph third grade free, butterfly wing symmetry geometry worksheets bilateral lines measurement third grade printable, bee pollination rate calculation worksheets daily flower visits multiplication grade 3 pages, entomology research report writing worksheets multiple sources evidence data third grade activities',
  },
};

let changeCount = 0;

for (const [grade, seo] of Object.entries(gradeSEO)) {
  // Pattern: find the grade key followed by intro (with no seoTitle before it)
  const gradeKey = grade === 'preschool' || grade === 'kindergarten'
    ? `'${grade}'`
    : `'${grade}'`;

  // Find the pattern: 'grade-name': {\n      intro:
  const searchPattern = `'${grade}': {\n      intro:`;

  if (!content.includes(searchPattern)) {
    console.error(`ERROR: Could not find grade section for ${grade}`);
    process.exit(1);
  }

  // Check if seoTitle already exists for this grade
  const gradeStart = content.indexOf(`'${grade}': {`);
  const nextGradeOrEnd = content.indexOf("    },\n    '", gradeStart + 1);
  const gradeSection = content.substring(gradeStart, nextGradeOrEnd > -1 ? nextGradeOrEnd : gradeStart + 500);

  if (gradeSection.includes('seoTitle:')) {
    console.log(`SKIP: ${grade} already has seoTitle`);
    continue;
  }

  const replacement = `'${grade}': {\n      seoTitle: '${seo.seoTitle}',\n      seoDescription: '${seo.seoDescription}',\n      seoKeywords: '${seo.seoKeywords}',\n      intro:`;

  content = content.replace(searchPattern, replacement);
  changeCount++;
  console.log(`ADDED: seoTitle, seoDescription, seoKeywords to ${grade}`);
}

fs.writeFileSync(insectsFile, content, 'utf8');
console.log(`\nDone! Modified ${changeCount} grade sections in insects/en.ts`);
