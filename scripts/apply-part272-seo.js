/**
 * Part 272: Swedish Product Pages SEO — Apps 1-7
 *
 * Updates SEO metadata for:
 * 1. addition-worksheets.ts
 * 2. alphabet-train-worksheets.ts
 * 3. coloring-worksheets.ts
 * 4. math-worksheets.ts
 * 5. word-scramble-worksheets.ts
 * 6. find-and-count-worksheets.ts
 * 7. matching-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');

const updates = [
  {
    file: 'addition-worksheets.ts',
    seo: {
      title: 'Gratis Additions\u00f6vning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara additions\u00f6vningar med bilder f\u00f6r f\u00f6rskola till \u00e5rskurs 3. 3 000+ bilder, anpassa sv\u00e5righetsgrad och f\u00e5 facit. Ladda ner gratis PDF.',
      keywords: 'additions\u00f6vning generator, additions\u00f6vningar gratis, addition arbetsblad f\u00f6rskola, bildbaserade additions\u00f6vningar, matematik arbetsblad gratis, plus\u00f6vningar med bilder, utskrivbara r\u00e4kne\u00f6vningar, addition facit, l\u00e4ra sig addera, plus\u00f6vningar \u00e5rskurs 1, additions\u00f6vningar barn',
    },
    hero: {
      title: 'Additions\u00f6vning Generator',
      subtitle: 'Skapa Bildbaserade Additions\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'alphabet-train-worksheets.ts',
    seo: {
      title: 'Gratis Alfabetst\u00e5g Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara alfabetst\u00e5g-\u00f6vningar f\u00f6r bokstavsinl\u00e4rning fr\u00e5n f\u00f6rskola till \u00e5rskurs 1. Roligt s\u00e4tt att l\u00e4ra bokst\u00e4ver med bilder. Gratis PDF.',
      keywords: 'alfabetst\u00e5g generator, alfabetst\u00e5g \u00f6vningar, bokst\u00e4ver \u00f6vning f\u00f6rskola, alfabet utskrivbar, alfabetst\u00e5g arbetsblad, bokstavigenk\u00e4nning, alfabetisk ordning \u00f6vning, bokstavs\u00f6vningar barn, l\u00e4ra sig l\u00e4sa, alfabet\u00f6vningar, begynnelsebokst\u00e4ver \u00f6vning',
    },
    hero: {
      title: 'Alfabetst\u00e5g Generator',
      subtitle: 'Utskrivbara Bokstavs\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 1',
    },
  },
  {
    file: 'coloring-worksheets.ts',
    seo: {
      title: 'Gratis M\u00e5larbilder Generator f\u00f6r Barn | LessonCraftStudio',
      description: 'Skapa utskrivbara m\u00e5larbilder f\u00f6r barn med 3 000+ bilder. 50 teman och 5 \u00e5ldersniv\u00e5er fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'm\u00e5larbilder generator, m\u00e5larbilder barn gratis, gratis m\u00e5larbilder skriv ut, m\u00e5larsidor utskrivbara, djur m\u00e5larbilder, utskrivbara m\u00e5larbilder, m\u00e5larbilder f\u00f6rskola, f\u00e4rgl\u00e4ggnings\u00f6vningar, m\u00e5larbilder till barn, finmotorik m\u00e5larbilder, barns m\u00e5larsidor',
    },
    hero: {
      title: 'M\u00e5larbilder Generator f\u00f6r Barn',
      subtitle: 'Skapa Utskrivbara M\u00e5larbilder med 50 Teman och 3 000+ Bilder',
    },
  },
  {
    file: 'math-worksheets.ts',
    seo: {
      title: 'Matematik\u00f6vning Generator f\u00f6r Barn | LessonCraftStudio',
      description: 'Skapa visuella matematik\u00f6vningar med bilder. Addition, subtraktion, j\u00e4mf\u00f6relse och talserier fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Facit ing\u00e5r. Gratis PDF.',
      keywords: 'matematik\u00f6vning generator, matematik \u00f6vningar l\u00e5gstadiet, r\u00e4kne\u00f6vningar utskrivbara, matematik arbetsblad, matematik\u00f6vningar f\u00f6rskola, visuella matematik\u00f6vningar, r\u00e4kne\u00f6vningar barn, matematik facit, grundl\u00e4ggande r\u00e4knes\u00e4tt \u00f6vning, matematik utskrivbar gratis, matematik tr\u00e4nings\u00f6vningar',
    },
    hero: {
      title: 'Matematik\u00f6vning Generator',
      subtitle: 'Visuella Matematik\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'word-scramble-worksheets.ts',
    seo: {
      title: 'Gratis Ordpussel Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara ordpussel-\u00f6vningar f\u00f6r stavning och r\u00e4ttskrivning. Anpassa sv\u00e5righetsgrad fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Med bilder. Gratis PDF.',
      keywords: 'ordpussel generator, ordpussel \u00f6vningar, skriv\u00f6vningar barn, r\u00e4ttskrivning \u00f6vning, ordg\u00e5ta utskrivbar, stavnings\u00f6vning, ordspel barn utskrivbar, ordbildning \u00f6vningar, l\u00e4ra sig l\u00e4sa \u00f6vningar, skrivning tr\u00e4ning, ordf\u00f6rr\u00e5d \u00f6vningar',
    },
    hero: {
      title: 'Ordpussel Generator',
      subtitle: 'Utskrivbara R\u00e4ttskrivnings\u00f6vningar med Bilder',
    },
  },
  {
    file: 'find-and-count-worksheets.ts',
    seo: {
      title: 'Hitta och R\u00e4kna Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara hitta och r\u00e4kna-\u00f6vningar f\u00f6r barn. Utveckla r\u00e4knef\u00e4rdigheter och visuell uppm\u00e4rksamhet med bilder. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
      keywords: 'hitta och r\u00e4kna generator, hitta och r\u00e4kna \u00f6vningar, r\u00e4kne\u00f6vningar f\u00f6rskola, visuell r\u00e4kning, antaligenk\u00e4nning, hitta och r\u00e4kna utskrivbar, r\u00e4knef\u00e4rdigheter barn, r\u00e4kne\u00f6vning med bilder, tal\u00f6vningar f\u00f6rskola, r\u00e4kning tr\u00e4ning, matematik s\u00f6k\u00f6vning',
    },
    hero: {
      title: 'Hitta och R\u00e4kna Generator',
      subtitle: 'Utveckla R\u00e4knef\u00e4rdigheter med Roliga S\u00f6k\u00f6vningar',
    },
  },
  {
    file: 'matching-worksheets.ts',
    seo: {
      title: 'Gratis Matchnings\u00f6vning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara matchnings\u00f6vningar med bilder. Utveckla minne och m\u00f6nsterigenk\u00e4nning fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. 50 teman. Ladda ner gratis PDF.',
      keywords: 'matchnings\u00f6vning generator, matchnings\u00f6vningar, parning barn, minnesspel utskrivbar, parnings\u00f6vning f\u00f6rskola, m\u00f6nsterigenk\u00e4nning \u00f6vning, visuell parning, bildparning \u00f6vning, par\u00f6vning utskrivbar, minne och parning, matchnings\u00f6vningar f\u00f6rskola',
    },
    hero: {
      title: 'Matchnings\u00f6vning Generator',
      subtitle: 'Utskrivbara Parnings\u00f6vningar med 50 Teman',
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
