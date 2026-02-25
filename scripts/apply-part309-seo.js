/**
 * Part 309: Dutch Product Pages SEO — Apps 29-33
 *
 * Updates SEO metadata for:
 * 29. aftrekken-werkbladen.ts
 * 30. schattenjacht-werkbladen.ts
 * 31. woordraadsel-werkbladen.ts
 * 32. schrijfoefeningen-werkbladen.ts
 * 33. word-search-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const updates = [
  {
    file: 'aftrekken-werkbladen.ts',
    seo: {
      title: 'Gratis Aftreksommen Generator | LessonCraftStudio',
      description: 'Maak uitprintbare aftreksommen met afbeeldingen voor kleuterschool tot groep 5. Pas het niveau aan, kies afbeeldingen en krijg antwoorden. Download gratis PDF.',
      keywords: 'aftreksommen gratis, aftrekken werkbladen kleuterschool, beeldgebaseerde aftreksommen, minsommen kinderen, aftrekken met afbeeldingen, uitprintbare minsommen, aftrekken antwoorden, leren aftrekken, aftreksommen groep 3, aftrekken oefeningen kinderen',
    },
    hero: {
      title: 'Aftreksommen Generator',
      subtitle: 'Beeldgebaseerde Aftreksommen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'schattenjacht-werkbladen.ts',
    seo: {
      title: 'Gratis Schattenjacht Generator | LessonCraftStudio',
      description: 'Maak uitprintbare schattenjacht-oefeningen voor kinderen. Combineer probleemoplossing met avontuur. Kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
      keywords: 'schattenjacht oefeningen kinderen, schattenjacht uitprintbaar, schattenjacht werkbladen, schatzoeken kinderen, avontuurpuzzel kinderen, schattenjacht kleuterschool, schattenjacht klas, opdrachten en aanwijzingen, schattenjacht met afbeeldingen, schattenjacht gratis',
    },
    hero: {
      title: 'Schattenjacht Generator',
      subtitle: 'Uitprintbare Schattenjachtoefeningen met 50 Thema\'s',
    },
  },
  {
    file: 'woordraadsel-werkbladen.ts',
    seo: {
      title: 'Gratis Woordraadsel Generator | LessonCraftStudio',
      description: 'Maak uitprintbare woordraadseloefeningen voor kinderen. Ontwikkel woordenschat en redeneervermogen. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'woordraadsel oefeningen, woordpuzzel kinderen, woordenschat oefening kinderen, woordraadsel uitprintbaar, woordenschat werkbladen, beeldaanwijzing woordspel, woordspel uitprintbaar, woordraadsel kleuterschool, taaloefening kinderen, woordraadsel met afbeeldingen',
    },
    hero: {
      title: 'Woordraadsel Generator',
      subtitle: 'Woordenschatoefeningen met Beeldaanwijzingen',
    },
  },
  {
    file: 'schrijfoefeningen-werkbladen.ts',
    seo: {
      title: 'Gratis Schrijfoefening Generator | LessonCraftStudio',
      description: 'Maak uitprintbare schrijfoefeningen voor kinderen. Lettervorming, woordschrijven en zinsbouw. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'schrijfoefeningen kinderen, lettervorming oefening, handschrifttraining, letters schrijven oefening, schrijfoefening kleuterschool, schrijftraining uitprintbaar, voorbereidend schrijven oefening, letters en woorden, schrijfoefeningen groep 3, handschrift werkbladen',
    },
    hero: {
      title: 'Schrijfoefening Generator',
      subtitle: 'Uitprintbare Schrijfoefeningen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'word-search-worksheets.ts',
    seo: {
      title: 'Gratis Woordzoeker Generator | LessonCraftStudio',
      description: 'Maak uitprintbare woordzoekers in 11 talen. Aanpasbare woorden, afmetingen en niveaus. Woordenschat en spelling. Download gratis PDF.',
      keywords: 'woordzoeker uitprintbaar, woordzoeker kinderen, woordspel generator, woordzoeker oefening, woordpuzzel uitprintbaar, woordzoekspel kinderen, woordenschat woordzoeker, spelling woordzoeker, woordzoeker basisschool, woordzoeker kleuterschool',
    },
    hero: {
      title: 'Woordzoeker Generator',
      subtitle: 'Uitprintbare Woordzoekers voor Woordenschatoefening',
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
