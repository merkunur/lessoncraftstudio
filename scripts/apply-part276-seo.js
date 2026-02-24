/**
 * Part 276: Swedish Product Pages SEO — Apps 29-33 (Final 5)
 *
 * Updates SEO metadata for:
 * 29. subtraction-worksheets.ts
 * 30. treasure-hunt-worksheets.ts
 * 31. word-guess-worksheets.ts
 * 32. writing-worksheets.ts
 * 33. word-search-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');

const updates = [
  {
    file: 'subtraction-worksheets.ts',
    seo: {
      title: 'Gratis Subtraktion Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara subtraktions\u00f6vningar med bilder f\u00f6r f\u00f6rskola till \u00e5rskurs 3. Anpassa sv\u00e5righetsgrad, bilder och facit. Ladda ner gratis PDF.',
      keywords: 'subtraktion generator, subtraktions\u00f6vningar gratis, subtraktion arbetsblad f\u00f6rskola, bildbaserade subtraktions\u00f6vningar, minus\u00f6vningar barn, subtraktion med bilder, utskrivbara minus\u00f6vningar, subtraktion facit, l\u00e4ra sig subtrahera, subtraktions\u00f6vningar \u00e5rskurs 1, subtraktion \u00f6vningar barn',
    },
    hero: {
      title: 'Subtraktion Generator',
      subtitle: 'Bildbaserade Subtraktions\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'treasure-hunt-worksheets.ts',
    seo: {
      title: 'Gratis Skattjakt Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara skattjakt-\u00f6vningar f\u00f6r barn. Kombinera probleml\u00f6sning med \u00e4ventyr. F\u00f6rskola till \u00e5rskurs 3. 50 teman. Ladda ner gratis PDF.',
      keywords: 'skattjakt generator, skattjakt \u00f6vningar barn, skattjakt utskrivbar, skattjakt arbetsblad, skattletning barn, \u00e4ventyrspussel barn, skattjakt f\u00f6rskola, skattjakt klassrum, uppdrag och ledtr\u00e5dar, skattjakt med bilder, skattjakt gratis',
    },
    hero: {
      title: 'Skattjakt Generator',
      subtitle: 'Utskrivbara Skattjakt\u00f6vningar med 50 Teman',
    },
  },
  {
    file: 'word-guess-worksheets.ts',
    seo: {
      title: 'Gratis Gissa Ordet Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara gissa-ordet-\u00f6vningar f\u00f6r barn. Utveckla ordf\u00f6rr\u00e5d och slutledningsf\u00f6rm\u00e5ga. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'gissa ordet generator, gissa ordet \u00f6vningar, ordg\u00e5ta barn, ordf\u00f6rr\u00e5d \u00f6vning barn, gissa ordet utskrivbar, ordf\u00f6rr\u00e5d arbetsblad, bildledtr\u00e5d ordspel, ordspel utskrivbar, ordg\u00e5tor f\u00f6rskola, spr\u00e5k\u00f6vning barn, gissa ordet med bilder',
    },
    hero: {
      title: 'Gissa Ordet Generator',
      subtitle: 'Ordf\u00f6rr\u00e5ds\u00f6vningar med Bildledtr\u00e5dar',
    },
  },
  {
    file: 'writing-worksheets.ts',
    seo: {
      title: 'Gratis Skriv\u00f6vning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara skriv\u00f6vningar f\u00f6r barn. Bokstavsformning, ordskrivning och meningsbyggnad. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'skriv\u00f6vning generator, skriv\u00f6vningar barn, bokstavsformning \u00f6vning, handstilstr\u00e4ning, skriva bokst\u00e4ver \u00f6vning, skriv\u00f6vning f\u00f6rskola, skrivtr\u00e4ning utskrivbar, f\u00f6rskrivning \u00f6vning, bokst\u00e4ver och ord, skriv\u00f6vningar \u00e5rskurs 1, handstil arbetsblad',
    },
    hero: {
      title: 'Skriv\u00f6vning Generator',
      subtitle: 'Utskrivbara Skriv\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'word-search-worksheets.ts',
    seo: {
      title: 'Gratis Ordletare Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara ordletare p\u00e5 11 spr\u00e5k. Anpassningsbara ord, storlekar och sv\u00e5righetsgrader. Ordf\u00f6rr\u00e5d och stavning. Ladda ner gratis PDF.',
      keywords: 'ordletare generator, ordletare utskrivbar, ordletare barn, ordspel generator, ordletare \u00f6vning, ordpussel utskrivbar, ords\u00f6kspel barn, ordf\u00f6rr\u00e5d ordletare, stavning ordletare, ordletare l\u00e5gstadiet, ordletare f\u00f6rskola',
    },
    hero: {
      title: 'Ordletare Generator',
      subtitle: 'Utskrivbara Ordletare f\u00f6r Ordf\u00f6rr\u00e5ds\u00f6vning',
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
