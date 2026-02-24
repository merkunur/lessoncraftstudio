/**
 * Part 275: Swedish Product Pages SEO — Apps 22-28
 *
 * Updates SEO metadata for:
 * 22. odd-one-out-worksheets.ts
 * 23. pattern-train-worksheets.ts
 * 24. pattern-worksheets.ts
 * 25. picture-path-worksheets.ts
 * 26. picture-sort-worksheets.ts
 * 27. prepositions-worksheets.ts
 * 28. shadow-match-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');

const updates = [
  {
    file: 'odd-one-out-worksheets.ts',
    seo: {
      title: 'Hitta Udda Bilden Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara hitta udda bilden-\u00f6vningar f\u00f6r barn. Utveckla logiskt t\u00e4nkande och kategorisering. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
      keywords: 'hitta udda bilden generator, hitta udda bilden \u00f6vningar, udda bilden ut barn, kategorisering \u00f6vning, logiskt t\u00e4nkande barn, hitta skillnaden, klassificering \u00f6vning, visuell diskriminering, hitta udda utskrivbar, sortering och gruppering, logik\u00f6vning f\u00f6rskola',
    },
    hero: {
      title: 'Hitta Udda Bilden Generator',
      subtitle: 'Logiska Kategoriserings\u00f6vningar med Bilder',
    },
  },
  {
    file: 'pattern-train-worksheets.ts',
    seo: {
      title: 'Gratis M\u00f6nstert\u00e5g Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara m\u00f6nstert\u00e5gs\u00f6vningar f\u00f6r barn. Utveckla m\u00f6nsterigenk\u00e4nning och sekvensering fr\u00e5n f\u00f6rskola till \u00e5rskurs 2. Gratis PDF.',
      keywords: 'm\u00f6nstert\u00e5g generator, m\u00f6nstert\u00e5g \u00f6vningar, m\u00f6nsterigenk\u00e4nning barn, sekvensering \u00f6vning, m\u00f6nster f\u00f6rskola, t\u00e5g m\u00f6nster utskrivbar, m\u00f6nsterf\u00f6ljd \u00f6vning, repetitivt m\u00f6nster, m\u00f6nstertr\u00e4ning barn, sekvens\u00f6vning f\u00f6rskola, bildm\u00f6nster \u00f6vning',
    },
    hero: {
      title: 'M\u00f6nstert\u00e5g Generator',
      subtitle: 'M\u00f6nsterigenk\u00e4nning och Sekvenserings\u00f6vningar med Bilder',
    },
  },
  {
    file: 'pattern-worksheets.ts',
    seo: {
      title: 'Gratis M\u00f6nster\u00f6vning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara m\u00f6nster\u00f6vningar med bilder. Utveckla logik och m\u00f6nsterigenk\u00e4nning fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. 50 teman. Ladda ner gratis PDF.',
      keywords: 'm\u00f6nster\u00f6vning generator, m\u00f6nster \u00f6vningar barn, m\u00f6nsterigenk\u00e4nning \u00f6vning, m\u00f6nster arbetsblad, logiskt m\u00f6nster barn, m\u00f6nster f\u00f6ljd \u00f6vning, m\u00f6nster utskrivbar, sekvens och m\u00f6nster, m\u00f6nster\u00f6vning f\u00f6rskola, matematik m\u00f6nster, bildm\u00f6nster arbetsblad',
    },
    hero: {
      title: 'M\u00f6nster\u00f6vning Generator',
      subtitle: 'Utskrivbara M\u00f6nster\u00f6vningar med 50 Teman',
    },
  },
  {
    file: 'picture-path-worksheets.ts',
    seo: {
      title: 'Gratis Bildlabyrint Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara bildlabyrint\u00f6vningar f\u00f6r barn. Utveckla probleml\u00f6sning och visuell planering fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'bildlabyrint generator, bildlabyrint \u00f6vningar, labyrint barn utskrivbar, labyrint f\u00f6rskola, visuell planering \u00f6vning, labyrintpussel barn, bildsti \u00f6vning, probleml\u00f6sning labyrint, labyrint arbetsblad, v\u00e4ghittning \u00f6vning, labyrint gratis barn',
    },
    hero: {
      title: 'Bildlabyrint Generator',
      subtitle: 'Utskrivbara Labyrint\u00f6vningar med Bilder',
    },
  },
  {
    file: 'picture-sort-worksheets.ts',
    seo: {
      title: 'Gratis Bildsortering Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara bildsorteringss\u00f6vningar f\u00f6r barn. Utveckla kategorisering och klassificering. F\u00f6rskola till \u00e5rskurs 3. 50 teman. Gratis PDF.',
      keywords: 'bildsortering generator, bildsortering \u00f6vningar, sortering barn, kategorisering \u00f6vning barn, klassificering arbetsblad, bildsortering utskrivbar, sortering f\u00f6rskola, gruppering \u00f6vning, sortera och klassificera, kategorier \u00f6vning barn, visuell sortering',
    },
    hero: {
      title: 'Bildsortering Generator',
      subtitle: 'Kategoriserings\u00f6vningar med Bilder fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'prepositions-worksheets.ts',
    seo: {
      title: 'Prepositions\u00f6vning Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara prepositions\u00f6vningar med bilder. L\u00e4gesord som p\u00e5, i, under och bredvid. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'prepositions\u00f6vning generator, prepositions\u00f6vning barn, l\u00e4gesord \u00f6vning, prepositioner arbetsblad, p\u00e5 i under bredvid \u00f6vning, rumsuppfattning spr\u00e5k, prepositioner f\u00f6rskola, l\u00e4gesord med bilder, spr\u00e5k\u00f6vning prepositioner, prepositions\u00f6vning utskrivbar, grammatik barn',
    },
    hero: {
      title: 'Prepositions\u00f6vning Generator',
      subtitle: 'L\u00e4gesords\u00f6vningar med Bilder fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'shadow-match-worksheets.ts',
    seo: {
      title: 'Gratis Skuggmatchning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara skuggmatchnings\u00f6vningar f\u00f6r barn. Matcha bilder med sina skuggor. Utveckla visuell perception. F\u00f6rskola till \u00e5rskurs 2. Gratis PDF.',
      keywords: 'skuggmatchning generator, skuggmatchning \u00f6vningar, skugga matchning barn, visuell perception \u00f6vning, skuggpussel utskrivbar, bild och skugga matchning, skuggmatchning f\u00f6rskola, visuell diskriminering, skugg\u00f6vning barn, kontur matchning, siluett matchning',
    },
    hero: {
      title: 'Skuggmatchning Generator',
      subtitle: 'Visuella Skuggmatchnings\u00f6vningar med Bilder',
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
