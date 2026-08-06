/**
 * Part 144: Danish Product Pages SEO — Apps 9-12
 *
 * Updates SEO metadata for:
 * 1. bingo-arbejdsark.ts
 * 2. sudoku-arbejdsark.ts
 * 3. stor-lille-arbejdsark.ts
 * 4. billediagram-arbejdsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'da');

const updates = [
  {
    file: 'bingo-arbejdsark.ts',
    seo: {
      title: 'Gratis Billed-Bingo Generator | LessonCraftStudio',
      description: 'Lav printbare billed-bingospil til b\u00f8rn. 50 temaer, tilpasselige gitre og billeder fra 3.000+ bibliotek. Perfekt til klasselokalet. Download gratis.',
      keywords: 'billed-bingo generator, bingo printbar til b\u00f8rn, billed-bingo spil, printbart bingospil, bingo f\u00f8rskole, klasse bingospil, billed-bingo gitter, bingo opgave til b\u00f8rn, gruppespil printbar, bingo billeder b\u00f8rn, bingospil klasselokale',
    },
    hero: {
      title: 'Billed-Bingo Generator',
      subtitle: 'Lav Printbare Bingospil med 50 Temaer',
    },
  },
  {
    file: 'sudoku-arbejdsark.ts',
    seo: {
      title: 'B\u00f8rne Sudoku Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lav printbare billed-sudokuer til b\u00f8rn. Nemme og mellemsvare logikspil fra f\u00f8rskole til 3. klasse. Billeder fra 3.000+ bibliotek. Gratis PDF.',
      keywords: 'b\u00f8rne sudoku generator, billed-sudoku til b\u00f8rn, sudoku printbar, b\u00f8rns logikspil, nem sudoku til b\u00f8rn, billed-sudoku printbar, sudoku f\u00f8rskole, logik\u00f8velser til b\u00f8rn, sudoku gitter til b\u00f8rn, t\u00e6nkningsf\u00e6rdigheder tr\u00e6ning, sudoku indskoling',
    },
    hero: {
      title: 'B\u00f8rne Sudoku Generator',
      subtitle: 'Printbare Billed-Sudokuer fra F\u00f8rskole til 3. Klasse',
    },
  },
  {
    file: 'stor-lille-arbejdsark.ts',
    seo: {
      title: 'St\u00f8rrelsessammenligning Generator | LessonCraftStudio',
      description: 'Lav printbare stor og lille sammenligningsopgaver med billeder. Udvikl st\u00f8rrelsesbegreber fra f\u00f8rskole til 1. klasse. Tilpas indstillinger. Gratis PDF.',
      keywords: 'st\u00f8rrelsessammenligning generator, stor og lille opgaver, st\u00f8rrelsessammenligning f\u00f8rskole, st\u00f8rrelser genkendelse, st\u00f8rre og mindre, st\u00f8rrelses sammenligning til b\u00f8rn, stor lille printbar, st\u00f8rrelsesforskel opgaver, st\u00f8rrelses\u00f8velser f\u00f8rskole, sammenligningsf\u00e6rdigheder \u00f8velse, st\u00f8rrelser sortering',
    },
    hero: {
      title: 'Stor og Lille Generator',
      subtitle: 'St\u00f8rrelsessammenlignings\u00f8velser med Billeder fra F\u00f8rskole til 1. Klasse',
    },
  },
  {
    file: 'billediagram-arbejdsark.ts',
    seo: {
      title: 'Gratis Billediagram Generator | LessonCraftStudio',
      description: 'Lav printbare billediagram-opgaver til t\u00e6lling og datavisualisering. T\u00e6l og farvel\u00e6g diagrammer fra f\u00f8rskole til 3. klasse. Gratis PDF.',
      keywords: 'billediagram generator, billediagram opgaver, t\u00e6l og farvel\u00e6g, datavisualisering til b\u00f8rn, s\u00f8jlediagram f\u00f8rskole, billediagram printbar, t\u00e6lling og farvel\u00e6gning, statistikopgaver til b\u00f8rn, diagram printbar, statistik f\u00f8rskole, billediagram \u00f8velse',
    },
    hero: {
      title: 'Billediagram \u2014 T\u00e6l og Farvel\u00e6g Generator',
      subtitle: 'Datavisualisering og T\u00e6lle\u00f8velser til B\u00f8rn',
    },
  },
];

let totalChanges = 0;

for (const upd of updates) {
  const filePath = path.join(BASE, upd.file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${upd.file}`);
  console.log('='.repeat(60));

  // Replace seo.title
  const titleRe = /(seo:\s*\{[^}]*?title:\s*')([^']*?)(')/s;
  const titleReDouble = /(seo:\s*\{[^}]*?title:\s*")([^"]*?)(")/s;

  if (titleRe.test(content)) {
    const oldTitle = content.match(titleRe)[2];
    content = content.replace(titleRe, `$1${upd.seo.title}$3`);
    console.log(`  seo.title: "${oldTitle}" -> "${upd.seo.title}"`);
  } else if (titleReDouble.test(content)) {
    const oldTitle = content.match(titleReDouble)[2];
    content = content.replace(titleReDouble, `$1${upd.seo.title}$3`);
    console.log(`  seo.title: "${oldTitle}" -> "${upd.seo.title}"`);
  }

  // Replace seo.description
  const descRe = /(seo:\s*\{[^}]*?description:\s*')([^']*?)(')/s;
  const descReDouble = /(seo:\s*\{[^}]*?description:\s*")([^"]*?)(")/s;

  if (descRe.test(content)) {
    const oldDesc = content.match(descRe)[2];
    content = content.replace(descRe, `$1${upd.seo.description}$3`);
    console.log(`  seo.description: "${oldDesc.substring(0, 50)}..." -> "${upd.seo.description.substring(0, 50)}..."`);
  } else if (descReDouble.test(content)) {
    const oldDesc = content.match(descReDouble)[2];
    content = content.replace(descReDouble, `$1${upd.seo.description}$3`);
    console.log(`  seo.description: "${oldDesc.substring(0, 50)}..." -> "${upd.seo.description.substring(0, 50)}..."`);
  }

  // Replace seo.keywords
  const kwRe = /(seo:\s*\{[^}]*?keywords:\s*')([^']*?)(')/s;
  const kwReDouble = /(seo:\s*\{[^}]*?keywords:\s*")([^"]*?)(")/s;

  if (kwRe.test(content)) {
    const oldKw = content.match(kwRe)[2];
    content = content.replace(kwRe, `$1${upd.seo.keywords}$3`);
    console.log(`  seo.keywords: ${oldKw.split(',').length} kw -> ${upd.seo.keywords.split(',').length} kw`);
  } else if (kwReDouble.test(content)) {
    const oldKw = content.match(kwReDouble)[2];
    content = content.replace(kwReDouble, `$1${upd.seo.keywords}$3`);
    console.log(`  seo.keywords: ${oldKw.split(',').length} kw -> ${upd.seo.keywords.split(',').length} kw`);
  }

  // Replace hero.title
  const heroStart = content.indexOf('hero: {');
  if (heroStart === -1) {
    console.log('  WARNING: Could not find hero section');
    continue;
  }

  // Find the title within hero (first title after hero: {)
  const heroContent = content.substring(heroStart);
  const heroTitleMatch = heroContent.match(/title:\s*'([^']*?)'/);
  const heroTitleMatchDouble = heroContent.match(/title:\s*"([^"]*?)"/);

  if (heroTitleMatch) {
    const oldHeroTitle = heroTitleMatch[1];
    const fullMatch = heroTitleMatch[0];
    const newMatch = `title: '${upd.hero.title}'`;
    content = content.substring(0, heroStart) + heroContent.replace(fullMatch, newMatch);
    console.log(`  hero.title: "${oldHeroTitle}" -> "${upd.hero.title}"`);
  } else if (heroTitleMatchDouble) {
    const oldHeroTitle = heroTitleMatchDouble[1];
    const fullMatch = heroTitleMatchDouble[0];
    const newMatch = `title: '${upd.hero.title}'`;
    content = content.substring(0, heroStart) + heroContent.replace(fullMatch, newMatch);
    console.log(`  hero.title: "${oldHeroTitle}" -> "${upd.hero.title}"`);
  }

  // Replace hero.subtitle - find it after hero title
  const heroStart2 = content.indexOf('hero: {');
  const heroContent2 = content.substring(heroStart2);
  const heroSubMatch = heroContent2.match(/subtitle:\s*'([^']*?)'/);
  const heroSubMatchDouble = heroContent2.match(/subtitle:\s*"([^"]*?)"/);

  if (heroSubMatch) {
    const oldHeroSub = heroSubMatch[1];
    const fullMatch = heroSubMatch[0];
    const newMatch = `subtitle: '${upd.hero.subtitle}'`;
    content = content.substring(0, heroStart2) + heroContent2.replace(fullMatch, newMatch);
    console.log(`  hero.subtitle: "${oldHeroSub}" -> "${upd.hero.subtitle}"`);
  } else if (heroSubMatchDouble) {
    const oldHeroSub = heroSubMatchDouble[1];
    const fullMatch = heroSubMatchDouble[0];
    const newMatch = `subtitle: '${upd.hero.subtitle}'`;
    content = content.substring(0, heroStart2) + heroContent2.replace(fullMatch, newMatch);
    console.log(`  hero.subtitle: "${oldHeroSub}" -> "${upd.hero.subtitle}"`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`  SAVED: ${upd.file}`);
  } else {
    console.log(`  WARNING: No changes detected for ${upd.file}`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Done! Updated ${totalChanges} of ${updates.length} files.`);
console.log('='.repeat(60));
