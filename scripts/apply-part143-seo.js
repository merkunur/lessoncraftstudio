/**
 * Part 143: Danish Product Pages SEO — Apps 5-8
 *
 * Updates SEO metadata for:
 * 1. bogstavblanding-arbejdsark.ts
 * 2. find-og-tael-arbejdsark.ts
 * 3. matchning-arbejdsark.ts
 * 4. linjetraening-arbejdsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'da');

const updates = [
  {
    file: 'bogstavblanding-arbejdsark.ts',
    seo: {
      title: 'Gratis Bogstavblanding Generator | LessonCraftStudio',
      description: 'Lav printbare bogstavblanding-opgaver til stavning og retstavning. Tilpas sv\u00e6rhedsgrad fra f\u00f8rskole til 3. klasse. Med billeder. Gratis PDF.',
      keywords: 'bogstavblanding generator, bogstavblanding opgaver, skrive\u00f8velser til b\u00f8rn, retstavning \u00f8velse, ord-g\u00e5de printbar, stavelse\u00f8velse, ordspil til b\u00f8rn printbar, orddannelse opgaver, l\u00e6re at l\u00e6se opgaver, skrivning tr\u00e6ning, ordforr\u00e5d \u00f8velser',
    },
    hero: {
      title: 'Bogstavblanding Generator',
      subtitle: 'Printbare Retstavnings\u00f8velser med Billeder',
    },
  },
  {
    file: 'find-og-tael-arbejdsark.ts',
    seo: {
      title: 'Find og T\u00e6l Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lav printbare find og t\u00e6l-opgaver til b\u00f8rn. Udvikl t\u00e6llef\u00e6rdigheder og visuel opm\u00e6rksomhed med billeder. F\u00f8rskole til 3. klasse. Gratis PDF.',
      keywords: 'find og t\u00e6l generator, find og t\u00e6l opgaver, t\u00e6lle\u00f8velser f\u00f8rskole, visuel t\u00e6lling, antal genkendelse, find og t\u00e6l printbar, t\u00e6llef\u00e6rdigheder til b\u00f8rn, t\u00e6lle\u00f8velse med billeder, tal\u00f8velser f\u00f8rskole, t\u00e6lling tr\u00e6ning, matematik s\u00f8geopgave',
    },
    hero: {
      title: 'Find og T\u00e6l Generator',
      subtitle: 'Udvikl T\u00e6llef\u00e6rdigheder med Sjove S\u00f8geopgaver',
    },
  },
  {
    file: 'matchning-arbejdsark.ts',
    seo: {
      title: 'Gratis Matchning Generator til B\u00f8rn | LessonCraftStudio',
      description: 'Lav printbare matchningsopgaver med billeder. Udvikl hukommelse og m\u00f8nstergenkendelse fra f\u00f8rskole til 3. klasse. 50 temaer. Download gratis PDF.',
      keywords: 'matchning generator, matchning opgaver, parring til b\u00f8rn, hukommelsesspil printbar, parrings\u00f8velse f\u00f8rskole, m\u00f8nstergenkendelse \u00f8velse, visuel parring, billedparring opgave, par\u00f8velse printbar, hukommelse og parring, matchningsopgaver f\u00f8rskole',
    },
    hero: {
      title: 'Matchning Generator',
      subtitle: 'Printbare Parrings\u00f8velser med 50 Temaer',
    },
  },
  {
    file: 'linjetraening-arbejdsark.ts',
    seo: {
      title: 'Linjetr\u00e6ning Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lav printbare linjetr\u00e6ningsopgaver til finmotorik-udvikling. Lige linjer, buer og b\u00f8lger fra f\u00f8rskole til 1. klasse. Download gratis PDF.',
      keywords: 'linjetr\u00e6ning generator, linjetr\u00e6ning opgaver, finmotorik \u00f8velser, linje f\u00f8lgning opgave, blyantsgreb \u00f8velser, tegning tr\u00e6ning f\u00f8rskole, finmotorik f\u00f8rskole, skriveforberedelse \u00f8velse, blyantsgreb tr\u00e6ning, linjer og former \u00f8velse, tegnetr\u00e6ning til b\u00f8rn',
    },
    hero: {
      title: 'Linjetr\u00e6nings Generator',
      subtitle: 'Finmotorik \u00d8velser fra F\u00f8rskole til 1. Klasse',
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

  // Replace hero.subtitle
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
