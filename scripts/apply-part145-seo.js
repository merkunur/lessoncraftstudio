/**
 * Part 145: Danish Product Pages SEO — Apps 13-16
 *
 * Updates SEO metadata for:
 * 1. kode-plusstykker-arbejdsark.ts
 * 2. tegn-og-farvelaeg-arbejdsark.ts
 * 3. find-objekterne-arbejdsark.ts
 * 4. raster-puslespil-arbejdsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'da');

const updates = [
  {
    file: 'kode-plusstykker-arbejdsark.ts',
    seo: {
      title: 'Kode-Plusstykker Generator | LessonCraftStudio',
      description: 'Lav printbare kode-plusstykker hvor billeder erstatter tal. Udvikler algebraisk t\u00e6nkning fra f\u00f8rskole til 3. klasse. Gratis PDF download.',
      keywords: 'kode-plusstykker generator, kode-plusstykker opgaver, symbolsk algebra til b\u00f8rn, billedbaseret matematik, kodeopgaver printbar, algebraisk t\u00e6nkning f\u00f8rskole, billede erstatter tal, hemmelig besked plusstykker, billedsymbol regneopgave, matematisk kodning, visuel algebra',
    },
    hero: {
      title: 'Kode-Plusstykker Generator',
      subtitle: 'Algebraisk T\u00e6nkning gennem Billedkodede Regneopgaver',
    },
  },
  {
    file: 'tegn-og-farvelaeg-arbejdsark.ts',
    seo: {
      title: 'Gratis Rastertegning Generator | LessonCraftStudio',
      description: 'Lav printbare rastertegningsopgaver. Tegn m\u00f8nstre i ruder efter model og farvel\u00e6g. Udvikler visuel opfattelse. F\u00f8rskole til 3. klasse. Gratis.',
      keywords: 'rastertegning generator, rastertegning opgaver, pixeltegning til b\u00f8rn, rudetegning, rutepapir tegning, visuel opfattelse \u00f8velse, rudetegning printbar, model kopiering til rude, tegning i ruder, kodet tegning, rasteropgaver til b\u00f8rn',
    },
    hero: {
      title: 'Rastertegning Generator',
      subtitle: 'Tegn og Farvel\u00e6g M\u00f8nstre i Rudem\u00f8nster efter Model',
    },
  },
  {
    file: 'find-objekterne-arbejdsark.ts',
    seo: {
      title: 'Find Objekterne Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lav printbare s\u00f8geopgaver til b\u00f8rn. Find skjulte objekter i billeder og udvikl visuel opm\u00e6rksomhed. 50 temaer fra f\u00f8rskole til 3. klasse.',
      keywords: 'find objekterne generator, find objekterne opgaver, puslespil billede printbar, visuel s\u00f8gning til b\u00f8rn, find skjulte objekter, opm\u00e6rksomhed \u00f8velse, visuel opfattelse f\u00f8rskole, find og opdage opgave, billedpuslespil\u00f8velser, s\u00f8gespil printbar, visuel opm\u00e6rksomhed',
    },
    hero: {
      title: 'Find Objekterne Generator',
      subtitle: 'Visuel Opm\u00e6rksomheds\u00f8velser med 50 Temaer',
    },
  },
  {
    file: 'raster-puslespil-arbejdsark.ts',
    seo: {
      title: 'Gratis Raster-Puslespil Generator | LessonCraftStudio',
      description: 'Lav printbare raster-puslespil til visuel opfattelse og rumlig forst\u00e5else. 50 temaer fra f\u00f8rskole til 3. klasse. Gratis PDF download.',
      keywords: 'raster-puslespil generator, raster-puslespil opgaver, visuelt puslespil til b\u00f8rn, rumlig forst\u00e5else, m\u00f8nster matchning, rasteropgaver printbar, opfattelse \u00f8velse, visuel logik til b\u00f8rn, matchnings\u00f8velser f\u00f8rskole, raster puslespil, rumlig opfattelse',
    },
    hero: {
      title: 'Raster-Puslespil Generator',
      subtitle: 'Visuel Opfattelse og Rumlig Forst\u00e5elses\u00f8velser',
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
