#!/usr/bin/env node
/**
 * add-en-idea-keywords.js
 * Adds primaryKeyword, secondaryKeywords, and lsiKeywords to all 45 EN idea-content files.
 * Primary keyword must appear in the titleTag.
 */

const fs = require('fs');
const path = require('path');

const IDEA_DIR = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'en');

// Each entry: primaryKeyword (must be in titleTag), 4 secondaryKeywords, 3 lsiKeywords
const KEYWORD_MAP = {
  'back-to-school-printable-ideas': {
    primary: 'back to school printable ideas',
    secondary: [
      'back to school worksheets to sell',
      'school printable business ideas',
      'back to school activity sheets',
      'sell back to school printables online',
    ],
    lsi: [
      'classroom worksheet bundles',
      'teacher resource printables',
      'school supply themed activities',
    ],
  },
  'birds-printable-ideas': {
    primary: 'birds printable ideas',
    secondary: [
      'bird themed worksheets to sell',
      'bird printable business ideas',
      'sell bird activity sheets online',
      'bird worksheet niche for sellers',
    ],
    lsi: [
      'wildlife themed educational printables',
      'nature observation worksheets',
      'ornithology activities for kids',
    ],
  },
  'bulk-licensing-printable-ideas': {
    primary: 'bulk licensing printable',
    secondary: [
      'bulk license worksheet business',
      'school district printable licensing',
      'wholesale printable worksheet sales',
      'bulk educational printable deals',
    ],
    lsi: [
      'volume licensing for digital products',
      'institutional printable agreements',
      'district-wide worksheet packages',
    ],
  },
  'camping-printable-ideas': {
    primary: 'camping printable ideas',
    secondary: [
      'camping worksheets to sell',
      'camping activity sheets for sellers',
      'outdoor themed printable business',
      'sell camping printables on Etsy',
    ],
    lsi: [
      'outdoor adventure educational worksheets',
      'nature themed activity pages',
      'summer camp printable resources',
    ],
  },
  'christmas-printable-ideas': {
    primary: 'christmas printable ideas',
    secondary: [
      'Christmas worksheets to sell',
      'holiday printable business ideas',
      'Christmas activity sheets for sellers',
      'sell Christmas printables on Etsy',
    ],
    lsi: [
      'seasonal holiday worksheet bundles',
      'winter themed educational activities',
      'festive classroom printable resources',
    ],
  },
  'construction-printable-ideas': {
    primary: 'construction printable ideas',
    secondary: [
      'construction worksheets to sell',
      'building themed printable business',
      'construction activity sheets for sellers',
      'sell construction printables online',
    ],
    lsi: [
      'building site themed worksheets',
      'STEM construction activities for kids',
      'vehicle and machinery educational printables',
    ],
  },
  'custom-worksheet-service-ideas': {
    primary: 'custom worksheet service',
    secondary: [
      'custom worksheet business ideas',
      'bespoke printable creation service',
      'made-to-order worksheet business',
      'sell custom worksheets online',
    ],
    lsi: [
      'personalized educational printables',
      'on-demand worksheet creation',
      'freelance printable design service',
    ],
  },
  'digital-download-printable-ideas': {
    primary: 'digital download worksheet ideas',
    secondary: [
      'digital download printable business',
      'sell digital worksheets online',
      'digital printable product ideas',
      'downloadable worksheet business model',
    ],
    lsi: [
      'instant download educational products',
      'PDF worksheet marketplace selling',
      'automated digital product delivery',
    ],
  },
  'dinosaur-printable-ideas': {
    primary: 'dinosaur printable ideas',
    secondary: [
      'dinosaur worksheets to sell',
      'dinosaur themed printable business',
      'dinosaur activity sheets for sellers',
      'sell dinosaur printables on Etsy',
    ],
    lsi: [
      'prehistoric themed educational worksheets',
      'paleontology activities for kids',
      'Jurassic themed classroom printables',
    ],
  },
  'easter-printable-ideas': {
    primary: 'easter printable ideas',
    secondary: [
      'Easter worksheets to sell',
      'Easter themed printable business',
      'Easter activity sheets for sellers',
      'sell Easter printables on Etsy',
    ],
    lsi: [
      'spring holiday educational worksheets',
      'egg hunt themed activity pages',
      'seasonal Easter classroom resources',
    ],
  },
  'esl-printable-ideas': {
    primary: 'ESL printable ideas',
    secondary: [
      'ESL worksheets to sell',
      'ESL printable business ideas',
      'English learner activity sheets',
      'sell ESL printables on TPT',
    ],
    lsi: [
      'English language learner worksheets',
      'multilingual educational printables',
      'TESOL classroom activity resources',
    ],
  },
  'fairy-tale-printable-ideas': {
    primary: 'fairy tale printable ideas',
    secondary: [
      'fairy tale worksheets to sell',
      'storybook themed printable business',
      'fairy tale activity sheets for sellers',
      'sell fairy tale printables online',
    ],
    lsi: [
      'storybook themed educational worksheets',
      'classic tale literacy activities',
      'fantasy themed classroom printables',
    ],
  },
  'farm-animals-printable-ideas': {
    primary: 'farm animals printable ideas',
    secondary: [
      'farm animal worksheets to sell',
      'farm themed printable business',
      'farm activity sheets for sellers',
      'sell farm printables on Etsy',
    ],
    lsi: [
      'barnyard themed educational worksheets',
      'agriculture activities for kids',
      'livestock themed classroom printables',
    ],
  },
  'first-grade-printable-ideas': {
    primary: 'first grade printable ideas',
    secondary: [
      'first grade worksheets to sell',
      'grade 1 printable business ideas',
      'first grade activity sheets for sellers',
      'sell first grade printables on TPT',
    ],
    lsi: [
      'early elementary educational worksheets',
      'grade 1 curriculum printables',
      'age 6-7 learning activity pages',
    ],
  },
  'food-cooking-printable-ideas': {
    primary: 'food & cooking printable ideas',
    secondary: [
      'food themed worksheets to sell',
      'cooking printable business ideas',
      'kitchen activity sheets for sellers',
      'sell food printables on Etsy',
    ],
    lsi: [
      'culinary themed educational worksheets',
      'nutrition activities for kids',
      'recipe themed classroom printables',
    ],
  },
  'forest-animals-printable-ideas': {
    primary: 'forest animals printable ideas',
    secondary: [
      'forest animal worksheets to sell',
      'woodland themed printable business',
      'forest activity sheets for sellers',
      'sell forest animal printables online',
    ],
    lsi: [
      'woodland creature educational worksheets',
      'nature habitat activities for kids',
      'wildlife themed classroom printables',
    ],
  },
  'halloween-printable-ideas': {
    primary: 'halloween printable ideas',
    secondary: [
      'Halloween worksheets to sell',
      'Halloween themed printable business',
      'Halloween activity sheets for sellers',
      'sell Halloween printables on Etsy',
    ],
    lsi: [
      'spooky themed educational worksheets',
      'October classroom activity pages',
      'costume and pumpkin themed printables',
    ],
  },
  'homeschool-printable-ideas': {
    primary: 'homeschool printable ideas',
    secondary: [
      'homeschool worksheets to sell',
      'homeschool printable business ideas',
      'homeschool activity sheets for sellers',
      'sell homeschool printables online',
    ],
    lsi: [
      'home education curriculum worksheets',
      'parent-led learning printable resources',
      'homeschool co-op activity pages',
    ],
  },
  'insects-printable-ideas': {
    primary: 'insects printable ideas',
    secondary: [
      'insect themed worksheets to sell',
      'bug printable business ideas',
      'insect activity sheets for sellers',
      'sell insect printables on Etsy',
    ],
    lsi: [
      'entomology activities for kids',
      'bug themed educational worksheets',
      'creepy crawly classroom printables',
    ],
  },
  'kindergarten-printable-ideas': {
    primary: 'kindergarten printable ideas',
    secondary: [
      'kindergarten worksheets to sell',
      'K-level printable business ideas',
      'kindergarten activity sheets for sellers',
      'sell kindergarten printables on TPT',
    ],
    lsi: [
      'pre-K and K educational worksheets',
      'early childhood learning printables',
      'age 5-6 classroom activity pages',
    ],
  },
  'math-facts-printable-ideas': {
    primary: 'math facts printable ideas',
    secondary: [
      'math fact worksheets to sell',
      'math drill printable business ideas',
      'arithmetic activity sheets for sellers',
      'sell math facts printables on TPT',
    ],
    lsi: [
      'number fluency practice worksheets',
      'timed math drill printable pages',
      'basic arithmetic educational resources',
    ],
  },
  'music-printable-ideas': {
    primary: 'music printable ideas',
    secondary: [
      'music themed worksheets to sell',
      'music printable business ideas',
      'music activity sheets for sellers',
      'sell music printables on Etsy',
    ],
    lsi: [
      'instrument themed educational worksheets',
      'rhythm and note activities for kids',
      'music theory classroom printables',
    ],
  },
  'ocean-animals-printable-ideas': {
    primary: 'ocean animals printable ideas',
    secondary: [
      'ocean animal worksheets to sell',
      'sea creature printable business ideas',
      'ocean activity sheets for sellers',
      'sell ocean printables on Etsy',
    ],
    lsi: [
      'marine life educational worksheets',
      'underwater themed activity pages',
      'sea creature classroom printables',
    ],
  },
  'parents-day-printable-ideas': {
    primary: 'parents day printable ideas',
    secondary: [
      'Mother\'s Day worksheets to sell',
      'Father\'s Day printable business ideas',
      'parents day activity sheets for sellers',
      'sell parents day printables on Etsy',
    ],
    lsi: [
      'family celebration educational worksheets',
      'parent appreciation activity pages',
      'seasonal family themed printables',
    ],
  },
  'party-supply-printable-ideas': {
    primary: 'printable party supply',
    secondary: [
      'printable party supplies to sell',
      'party decoration printable business',
      'birthday party printable ideas',
      'sell party supply printables on Etsy',
    ],
    lsi: [
      'celebration themed printable products',
      'party invitation and banner templates',
      'event decoration digital downloads',
    ],
  },
  'pets-printable-ideas': {
    primary: 'pets printable ideas',
    secondary: [
      'pet themed worksheets to sell',
      'pets printable business ideas',
      'pet activity sheets for sellers',
      'sell pet printables on Etsy',
    ],
    lsi: [
      'domestic animal educational worksheets',
      'cat and dog themed activity pages',
      'pet care classroom printables',
    ],
  },
  'physical-printable-product-ideas': {
    primary: 'physical printable product ideas',
    secondary: [
      'printed worksheet product business',
      'physical printable products to sell',
      'tangible printable business ideas',
      'sell printed worksheets offline',
    ],
    lsi: [
      'print-and-ship educational products',
      'physical workbook publishing',
      'tangible classroom resource sales',
    ],
  },
  'pirates-printable-ideas': {
    primary: 'pirates printable ideas',
    secondary: [
      'pirate themed worksheets to sell',
      'pirate printable business ideas',
      'pirate activity sheets for sellers',
      'sell pirate printables on Etsy',
    ],
    lsi: [
      'treasure hunt educational worksheets',
      'nautical adventure activity pages',
      'swashbuckler themed classroom printables',
    ],
  },
  'preschool-printable-ideas': {
    primary: 'preschool printable ideas',
    secondary: [
      'preschool worksheets to sell',
      'pre-K printable business ideas',
      'preschool activity sheets for sellers',
      'sell preschool printables on TPT',
    ],
    lsi: [
      'early childhood educational worksheets',
      'toddler learning activity pages',
      'age 3-5 classroom printable resources',
    ],
  },
  'print-on-demand-printable-ideas': {
    primary: 'print-on-demand worksheet ideas',
    secondary: [
      'POD printable business ideas',
      'print-on-demand educational products',
      'sell worksheets with print-on-demand',
      'POD worksheet business model',
    ],
    lsi: [
      'automated printing and fulfillment',
      'on-demand educational product sales',
      'zero-inventory worksheet business',
    ],
  },
  'safari-animals-printable-ideas': {
    primary: 'safari animals printable ideas',
    secondary: [
      'safari animal worksheets to sell',
      'safari themed printable business',
      'jungle activity sheets for sellers',
      'sell safari printables on Etsy',
    ],
    lsi: [
      'African wildlife educational worksheets',
      'jungle and savanna activity pages',
      'exotic animal classroom printables',
    ],
  },
  'second-grade-printable-ideas': {
    primary: 'second grade printable ideas',
    secondary: [
      'second grade worksheets to sell',
      'grade 2 printable business ideas',
      'second grade activity sheets for sellers',
      'sell second grade printables on TPT',
    ],
    lsi: [
      'elementary math and reading worksheets',
      'grade 2 curriculum printable resources',
      'age 7-8 learning activity pages',
    ],
  },
  'space-printable-ideas': {
    primary: 'space printable ideas',
    secondary: [
      'space themed worksheets to sell',
      'space printable business ideas',
      'space activity sheets for sellers',
      'sell space printables on Etsy',
    ],
    lsi: [
      'astronomy educational worksheets',
      'planet and rocket activity pages',
      'solar system classroom printables',
    ],
  },
  'special-education-printable-ideas': {
    primary: 'special education printable ideas',
    secondary: [
      'special education worksheets to sell',
      'SPED printable business ideas',
      'special needs activity sheets for sellers',
      'sell special education printables on TPT',
    ],
    lsi: [
      'differentiated learning worksheets',
      'adaptive classroom activity pages',
      'IEP-aligned printable resources',
    ],
  },
  'sports-printable-ideas': {
    primary: 'sports printable ideas',
    secondary: [
      'sports themed worksheets to sell',
      'sports printable business ideas',
      'athletic activity sheets for sellers',
      'sell sports printables on Etsy',
    ],
    lsi: [
      'team sport educational worksheets',
      'ball game themed activity pages',
      'physical education classroom printables',
    ],
  },
  'spring-printable-ideas': {
    primary: 'spring printable ideas',
    secondary: [
      'spring worksheets to sell',
      'spring themed printable business',
      'spring activity sheets for sellers',
      'sell spring printables on Etsy',
    ],
    lsi: [
      'flower and garden educational worksheets',
      'seasonal nature activity pages',
      'springtime classroom printable resources',
    ],
  },
  'subscription-box-printable-ideas': {
    primary: 'subscription box printable ideas',
    secondary: [
      'printable subscription box business',
      'monthly worksheet subscription model',
      'recurring printable delivery service',
      'sell printable subscriptions online',
    ],
    lsi: [
      'monthly educational delivery products',
      'recurring worksheet revenue model',
      'curated printable package service',
    ],
  },
  'summer-learning-printable-ideas': {
    primary: 'summer learning printable ideas',
    secondary: [
      'summer learning worksheets to sell',
      'summer slide printable business',
      'summer practice sheets for sellers',
      'sell summer learning printables on TPT',
    ],
    lsi: [
      'summer brain prevention worksheets',
      'vacation learning activity pages',
      'skill retention printable resources',
    ],
  },
  'summer-printable-ideas': {
    primary: 'summer printable ideas',
    secondary: [
      'summer themed worksheets to sell',
      'summer printable business ideas',
      'summer activity sheets for sellers',
      'sell summer printables on Etsy',
    ],
    lsi: [
      'beach and sun educational worksheets',
      'warm weather activity pages',
      'vacation themed classroom printables',
    ],
  },
  'thanksgiving-printable-ideas': {
    primary: 'thanksgiving printable ideas',
    secondary: [
      'Thanksgiving worksheets to sell',
      'Thanksgiving printable business ideas',
      'Thanksgiving activity sheets for sellers',
      'sell Thanksgiving printables on Etsy',
    ],
    lsi: [
      'harvest and gratitude educational worksheets',
      'November themed classroom activity pages',
      'turkey and pilgrim themed printables',
    ],
  },
  'third-grade-printable-ideas': {
    primary: 'third grade printable ideas',
    secondary: [
      'third grade worksheets to sell',
      'grade 3 printable business ideas',
      'third grade activity sheets for sellers',
      'sell third grade printables on TPT',
    ],
    lsi: [
      'upper elementary educational worksheets',
      'grade 3 curriculum printable resources',
      'age 8-9 learning activity pages',
    ],
  },
  'transportation-printable-ideas': {
    primary: 'transportation printable ideas',
    secondary: [
      'transportation worksheets to sell',
      'vehicle themed printable business',
      'transportation activity sheets for sellers',
      'sell transportation printables on Etsy',
    ],
    lsi: [
      'car and truck educational worksheets',
      'vehicle themed activity pages',
      'travel and transport classroom printables',
    ],
  },
  'underwater-printable-ideas': {
    primary: 'underwater printable ideas',
    secondary: [
      'underwater worksheets to sell',
      'deep sea printable business ideas',
      'underwater activity sheets for sellers',
      'sell underwater printables on Etsy',
    ],
    lsi: [
      'deep sea creature educational worksheets',
      'coral reef activity pages',
      'aquatic themed classroom printables',
    ],
  },
  'valentines-day-printable-ideas': {
    primary: 'valentine printable ideas',
    secondary: [
      'Valentine\'s Day worksheets to sell',
      'Valentine printable business ideas',
      'Valentine activity sheets for sellers',
      'sell Valentine printables on Etsy',
    ],
    lsi: [
      'heart themed educational worksheets',
      'February classroom activity pages',
      'love and friendship themed printables',
    ],
  },
  'winter-printable-ideas': {
    primary: 'winter printable ideas',
    secondary: [
      'winter worksheets to sell',
      'winter themed printable business',
      'winter activity sheets for sellers',
      'sell winter printables on Etsy',
    ],
    lsi: [
      'snow and ice educational worksheets',
      'cold weather activity pages',
      'seasonal winter classroom printables',
    ],
  },
};

// Validate before applying
let errors = 0;
for (const [file, kw] of Object.entries(KEYWORD_MAP)) {
  const filePath = path.join(IDEA_DIR, `${file}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`ERROR: File not found: ${file}.ts`);
    errors++;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/titleTag:\s*['"]([^'"]*)['"]/);
  if (!titleMatch) {
    console.log(`ERROR: No titleTag found in ${file}.ts`);
    errors++;
    continue;
  }
  const title = titleMatch[1].toLowerCase();
  if (!title.includes(kw.primary.toLowerCase())) {
    console.log(`ERROR: primaryKeyword "${kw.primary}" not found in titleTag "${titleMatch[1]}" for ${file}.ts`);
    errors++;
  }
  if (kw.secondary.length !== 4) {
    console.log(`ERROR: ${file}.ts needs exactly 4 secondaryKeywords, got ${kw.secondary.length}`);
    errors++;
  }
  if (kw.lsi.length !== 3) {
    console.log(`ERROR: ${file}.ts needs exactly 3 lsiKeywords, got ${kw.lsi.length}`);
    errors++;
  }
}

if (errors > 0) {
  console.log(`\n${errors} validation errors. Fix before applying.`);
  process.exit(1);
}

// Apply keywords
let modified = 0;
for (const [file, kw] of Object.entries(KEYWORD_MAP)) {
  const filePath = path.join(IDEA_DIR, `${file}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has primaryKeyword
  if (/primaryKeyword:/.test(content)) {
    console.log(`SKIP: ${file}.ts already has primaryKeyword`);
    continue;
  }

  // Build the keyword block to insert after metaDescription line
  const kwBlock = `\n    primaryKeyword: '${kw.primary}',\n    secondaryKeywords: [\n      '${kw.secondary[0]}',\n      '${kw.secondary[1]}',\n      '${kw.secondary[2]}',\n      '${kw.secondary[3]}',\n    ],\n    lsiKeywords: [\n      '${kw.lsi[0]}',\n      '${kw.lsi[1]}',\n      '${kw.lsi[2]}',\n    ],`;

  // Find the metaDescription line and insert after it
  // Match the full metaDescription field (may span multiple lines but ends with ',')
  const metaDescRegex = /(\s*metaDescription:\s*['"][^'"]*['"],?\s*\n)/;
  const match = content.match(metaDescRegex);
  if (match) {
    content = content.replace(metaDescRegex, `$1${kwBlock}\n`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED: ${file}.ts`);
    modified++;
  } else {
    // Try double-quoted metaDescription
    const metaDescRegex2 = /(\s*metaDescription:\s*"[^"]*",?\s*\n)/;
    const match2 = content.match(metaDescRegex2);
    if (match2) {
      content = content.replace(metaDescRegex2, `$1${kwBlock}\n`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`FIXED: ${file}.ts (double-quoted)`);
      modified++;
    } else {
      console.log(`ERROR: Could not find metaDescription insertion point in ${file}.ts`);
    }
  }
}

console.log(`\nDone. Modified ${modified} files.`);
