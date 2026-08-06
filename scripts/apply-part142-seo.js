/**
 * Part 142: Danish Product Pages SEO — Apps 1-4
 *
 * Updates SEO metadata for:
 * 1. addition-arbejdsark.ts
 * 2. alfabet-tog-arbejdsark.ts
 * 3. malebog-arbejdsark.ts
 * 4. matematikopgaver-arbejdsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'da');

const updates = [
  {
    file: 'addition-arbejdsark.ts',
    seo: {
      title: 'Gratis Addition Generator til B\u00f8rn | LessonCraftStudio',
      description: 'Lav printbare plusstykker med billeder til f\u00f8rskole\u20133. klasse. 3.000+ billeder, tilpas sv\u00e6rhedsgrad og f\u00e5 facitark. Download gratis PDF med det samme.',
      keywords: 'addition opgave generator, plusstykker arbejdsark gratis, addition opgaver b\u00f8rnehaveklasse, billedbaserede plusstykker, matematik arbejdsark gratis, plusstykker med billeder, printbare regneopgaver, addition facitark, l\u00e6re at l\u00e6gge sammen, plusstykker 1. klasse, addition \u00f8velser b\u00f8rn',
    },
    hero: {
      title: 'Addition Opgave Generator',
      subtitle: 'Lav Billedbaserede Plusstykker fra F\u00f8rskole til 3. Klasse',
    },
  },
  {
    file: 'alfabet-tog-arbejdsark.ts',
    seo: {
      title: 'Gratis Alfabet-Tog Generator | LessonCraftStudio',
      description: 'Lav printbare alfabet-tog opgaver til bogstavl\u00e6ring fra f\u00f8rskole til 1. klasse. Sjov m\u00e5de at l\u00e6re bogstaver med billeder. Download gratis PDF.',
      keywords: 'alfabet tog generator, alfabet tog opgaver, bogstaver \u00f8velse f\u00f8rskole, alfabet printbar, alfabet-tog arbejdsark, bogstavgenkendelse, alfabetisk r\u00e6kkef\u00f8lge \u00f8velse, bogstav\u00f8velser til b\u00f8rn, l\u00e6re at l\u00e6se, alfabet\u00f8velser, begyndelsesbogstaver opgave',
    },
    hero: {
      title: 'Alfabet-Tog Generator',
      subtitle: 'Printbare Bogstav\u00f8velser fra F\u00f8rskole til 1. Klasse',
    },
  },
  {
    file: 'malebog-arbejdsark.ts',
    seo: {
      title: 'Gratis Malebog Generator til B\u00f8rn | LessonCraftStudio',
      description: 'Lav printbare farvel\u00e6gningssider til b\u00f8rn med 3.000+ billeder. 50 temaer og 5 aldersniveauer fra f\u00f8rskole til 3. klasse. Download gratis PDF.',
      keywords: 'malebog generator, farvel\u00e6gningssider til b\u00f8rn gratis, gratis malebog print, farvel\u00e6gningsark printbar, dyr farvel\u00e6gning, printbare malebog sider, farvel\u00e6gning f\u00f8rskole, farvel\u00e6gnings\u00f8velser, farvel\u00e6gningsopgaver til b\u00f8rn, finmotorik farvel\u00e6gning, b\u00f8rns farvel\u00e6gningssider',
    },
    hero: {
      title: 'Malebog Generator til B\u00f8rn',
      subtitle: 'Lav Printbare Farvel\u00e6gningssider med 50 Temaer og 3.000+ Billeder',
    },
  },
  {
    file: 'matematikopgaver-arbejdsark.ts',
    seo: {
      title: 'Matematikopgave Generator til B\u00f8rn | LessonCraftStudio',
      description: 'Lav visuelle matematikopgaver med billeder. Addition, subtraktion, sammenligning og talr\u00e6kker fra f\u00f8rskole til 3. klasse. Facitark inkluderet. Gratis PDF.',
      keywords: 'matematikopgave generator, matematik opgaver indskoling, regneopgaver printbar, matematik arbejdsark, matematik\u00f8velser f\u00f8rskole, visuelle matematikopgaver, regneopgaver til b\u00f8rn, matematik facitark, grundl\u00e6ggende regnearter \u00f8velse, matematik printbar gratis, matematik tr\u00e6ningsopgaver',
    },
    hero: {
      title: 'Matematikopgave Generator',
      subtitle: 'Visuelle Matematik\u00f8velser fra F\u00f8rskole til 3. Klasse',
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
  const heroTitleRe = /(hero:\s*\{[^]*?title:\s*')([^']*?)(')/;
  const heroTitleReDouble = /(hero:\s*\{[^]*?title:\s*")([^"]*?)(")/;

  // Need more targeted approach - find the hero section first
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
