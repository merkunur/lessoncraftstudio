/**
 * Part 244: Norwegian Product Pages SEO — Apps 29-33
 *
 * Updates SEO metadata for:
 * 29. subtraksjon-arbeidsark.ts
 * 30. skattejakt-arbeidsark.ts
 * 31. gjetteoppgaver-arbeidsark.ts
 * 32. skriveark-arbeidsark.ts
 * 33. ordsoek-arbeidsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'no');

const updates = [
  {
    file: 'subtraksjon-arbeidsark.ts',
    seo: {
      title: 'Gratis Subtraksjon Generator | LessonCraftStudio',
      description: 'Lag printbare subtraksjonsoppgaver med bilder fra f\u00f8rskole til 3. klasse. Tilpassbare tallomr\u00e5der, fasit og visuelle hjelpemidler. Gratis PDF.',
      keywords: 'subtraksjon generator, subtraksjon oppgaver, subtraksjons\u00f8velser, minusoppgaver printbar, subtraksjon med bilder, matematikk subtraksjon, subtraksjon 1. klasse, subtraksjons\u00f8velser f\u00f8rskole, minusoppgave \u00f8velse, subtraksjon fasit, grunnleggende subtraksjon',
    },
    hero: {
      title: 'Subtraksjon Generator',
      subtitle: 'Visuelle Subtraksjons\u00f8velser med Bilder',
    },
  },
  {
    file: 'skattejakt-arbeidsark.ts',
    seo: {
      title: 'Skattejakt Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare skattejakt-oppgaver til retningsord og forst\u00e5else av instruksjoner. Morsomt eventyrspill fra f\u00f8rskole til 2. klasse. Gratis.',
      keywords: 'skattejakt generator, skattejakt oppgaver, retningsord \u00f8velse, instruksjoner forst\u00e5else, skattejakt printbar, retningsbegreper til barn, eventyroppgaver f\u00f8rskole, skattejakt klasserom, retning og posisjon, eventyrspill printbar, instruksjonsforst\u00e5else',
    },
    hero: {
      title: 'Skattejakt Generator',
      subtitle: 'Retningsord og Instruksjonsforst\u00e5else Eventyroppgaver',
    },
  },
  {
    file: 'gjetteoppgaver-arbeidsark.ts',
    seo: {
      title: 'Gratis Gjett Ordet Generator | LessonCraftStudio',
      description: 'Lag printbare gjett-ordet-oppgaver der barnet gjetter ord ut fra bildelededtr\u00e5der. Utvikler ordforr\u00e5d og slutningsferdigheter. Gratis PDF.',
      keywords: 'gjett ordet generator, gjett ordet oppgaver, ordg\u00e5te med bilder, ordforr\u00e5d \u00f8velse, bildebasert ordoppgave, gjetteoppgave til barn, bildelededtr\u00e5d oppgave, ords slutning, ordg\u00e5te printbar, ordforr\u00e5d utvidelse, bildelededtr\u00e5d ordoppgave',
    },
    hero: {
      title: 'Gjett Ordet Generator',
      subtitle: 'Ordforr\u00e5d og Slutnings\u00f8velser med Bildelededtr\u00e5der',
    },
  },
  {
    file: 'skriveark-arbeidsark.ts',
    seo: {
      title: 'Skrive\u00f8velse Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare skrive\u00f8velser til bokstavdanning og h\u00e5ndskrift. Bokstaver, ord og blyantgrep fra f\u00f8rskole til 2. klasse. Last ned gratis PDF.',
      keywords: 'skrive\u00f8velse generator, h\u00e5ndskrift \u00f8velse, bokstaver \u00f8velse f\u00f8rskole, bokstavdanning, blyantgrep trening, skriving trening, bokstav\u00f8velser printbar, finmotorikk skriving, alfabet skriving, h\u00e5ndskrift printbar, skriveforberedelse f\u00f8rskole',
    },
    hero: {
      title: 'Skrive\u00f8velse Generator',
      subtitle: 'Bokstav- og Ordskrivings\u00f8velser fra F\u00f8rskole til 2. Klasse',
    },
  },
  {
    file: 'ordsoek-arbeidsark.ts',
    seo: {
      title: 'Gratis Ords\u00f8k Generator | LessonCraftStudio',
      description: 'Lag printbare ords\u00f8k-oppgaver p\u00e5 11 spr\u00e5k. Tilpassbare ord, st\u00f8rrelser og vanskelighetsgrader. Ordforr\u00e5d og staving. Last ned gratis PDF.',
      keywords: 'ords\u00f8k generator, ords\u00f8k printbar, ords\u00f8k til barn, ordspill generator, ords\u00f8k oppgave, ordpuslespill printbar, ordleterspill til barn, ordforr\u00e5d ords\u00f8k, staving ords\u00f8k, ords\u00f8k sm\u00e5skolen, ords\u00f8k f\u00f8rskole',
    },
    hero: {
      title: 'Ords\u00f8k Generator',
      subtitle: 'Printbare Ords\u00f8k-oppgaver til Ordforr\u00e5ds\u00f8ving',
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
