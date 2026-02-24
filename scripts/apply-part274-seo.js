/**
 * Part 274: Swedish Product Pages SEO — Apps 15-21
 *
 * Updates SEO metadata for:
 * 15. find-objects-worksheets.ts
 * 16. grid-match-worksheets.ts
 * 17. crossword-worksheets.ts
 * 18. cryptogram-worksheets.ts
 * 19. math-puzzle-worksheets.ts
 * 20. missing-pieces-worksheets.ts
 * 21. more-less-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');

const updates = [
  {
    file: 'find-objects-worksheets.ts',
    seo: {
      title: 'Hitta F\u00f6rem\u00e5l Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara hitta-f\u00f6rem\u00e5l-\u00f6vningar f\u00f6r barn. Utveckla visuell uppm\u00e4rksamhet och koncentration. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'hitta f\u00f6rem\u00e5l generator, hitta f\u00f6rem\u00e5l \u00f6vningar, s\u00f6k\u00f6vningar barn, visuell uppm\u00e4rksamhet, hitta dolda f\u00f6rem\u00e5l, koncentrations\u00f6vning barn, hitta f\u00f6rem\u00e5l utskrivbar, uppm\u00e4rksamhets\u00f6vning, dolda bilder \u00f6vning, visuell s\u00f6kning barn, hitta skillnaden \u00f6vning',
    },
    hero: {
      title: 'Hitta F\u00f6rem\u00e5l Generator',
      subtitle: 'Utveckla Visuell Uppm\u00e4rksamhet med S\u00f6k\u00f6vningar',
    },
  },
  {
    file: 'grid-match-worksheets.ts',
    seo: {
      title: 'Gratis Rutn\u00e4tspussel Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara rutn\u00e4tsmatchnings\u00f6vningar med bilder. Logisk t\u00e4nkande och probleml\u00f6sning fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'rutn\u00e4tspussel generator, rutn\u00e4tsmatchning \u00f6vningar, logikpussel barn, rutn\u00e4ts\u00f6vning utskrivbar, probleml\u00f6sning barn, m\u00f6nsterigenk\u00e4nning rutn\u00e4t, matris\u00f6vning barn, logisk t\u00e4nkande \u00f6vning, pussel arbetsblad, rutn\u00e4tsmatchning f\u00f6rskola, visuell logik barn',
    },
    hero: {
      title: 'Rutn\u00e4tspussel Generator',
      subtitle: 'Utskrivbara Logik\u00f6vningar med Rutn\u00e4tsmatchning',
    },
  },
  {
    file: 'crossword-worksheets.ts',
    seo: {
      title: 'Gratis Bildkorsord Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara bildkorsord f\u00f6r barn. Bildledtr\u00e5dar ist\u00e4llet f\u00f6r text. Utveckla ordf\u00f6rr\u00e5d fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'bildkorsord generator, bildkorsord \u00f6vningar, korsord barn utskrivbar, bildkorsord f\u00f6rskola, ordf\u00f6rr\u00e5d korsord, korsord med bilder, enkla korsord barn, bildbaserade korsord, stavnings-korsord, korsord gratis barn, korsord l\u00e5gstadiet',
    },
    hero: {
      title: 'Bildkorsord Generator',
      subtitle: 'Utskrivbara Korsord med Bildledtr\u00e5dar f\u00f6r Barn',
    },
  },
  {
    file: 'cryptogram-worksheets.ts',
    seo: {
      title: 'Gratis Bildkryptogram Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara bildkryptogram f\u00f6r barn. Knacka hemliga koder med bildledtr\u00e5dar. F\u00f6rskola till \u00e5rskurs 3. 50 teman. Ladda ner gratis PDF.',
      keywords: 'bildkryptogram generator, bildkryptogram \u00f6vningar, hemlig kod barn, kryptogram utskrivbar, avkodnings\u00f6vning barn, hemliga koder arbetsblad, kodknackare barn, bildkryptogram f\u00f6rskola, chiffer \u00f6vning, kryptering barn, hemliga meddelanden \u00f6vning',
    },
    hero: {
      title: 'Bildkryptogram Generator',
      subtitle: 'Hemliga Koder med Bildledtr\u00e5dar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'math-puzzle-worksheets.ts',
    seo: {
      title: 'Gratis Mattepussel Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara mattepussel f\u00f6r barn. Utveckla logisk t\u00e4nkande och probleml\u00f6sning med bilder. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'mattepussel generator, mattepussel \u00f6vningar, matematik pussel barn, logik matematik, matematik g\u00e5tor barn, mattepussel utskrivbar, probleml\u00f6sning matematik, algebra barn, matematik logik\u00f6vning, mattepussel l\u00e5gstadiet, symbolisk matematik barn',
    },
    hero: {
      title: 'Mattepussel Generator',
      subtitle: 'Logiska Mattepussel fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'missing-pieces-worksheets.ts',
    seo: {
      title: 'Gratis Saknade Bitar Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara saknade bitar-\u00f6vningar f\u00f6r barn. Utveckla rumsuppfattning och visuell analys. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'saknade bitar generator, saknade bitar \u00f6vningar, pussel komplettering barn, visuell analys \u00f6vning, saknade bitar utskrivbar, bildpussel barn, rumsuppfattning \u00f6vning, komplettera bilden, visuell uppm\u00e4rksamhet pussel, saknade delar \u00f6vning, bildanalys barn',
    },
    hero: {
      title: 'Saknade Bitar Generator',
      subtitle: 'Visuella Analys\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'more-less-worksheets.ts',
    seo: {
      title: 'Fler eller F\u00e4rre Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara j\u00e4mf\u00f6relse\u00f6vningar f\u00f6r barn. Mer, mindre eller lika med bildbaserade \u00f6vningar. F\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'fler eller f\u00e4rre generator, fler eller f\u00e4rre \u00f6vningar, j\u00e4mf\u00f6relse\u00f6vning barn, mer eller mindre matematik, st\u00f6rre \u00e4n mindre \u00e4n, antal j\u00e4mf\u00f6relse, j\u00e4mf\u00f6relse utskrivbar, mer f\u00e4rre lika \u00f6vning, j\u00e4mf\u00f6relse f\u00f6rskola, r\u00e4kning och j\u00e4mf\u00f6relse, talj\u00e4mf\u00f6relse barn',
    },
    hero: {
      title: 'Fler eller F\u00e4rre Generator',
      subtitle: 'J\u00e4mf\u00f6relse\u00f6vningar med Bilder fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
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
