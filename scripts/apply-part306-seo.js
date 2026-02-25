/**
 * Part 306: Dutch Product Pages SEO — Apps 8-14
 *
 * Updates SEO metadata for:
 * 8. lijnen-trekken-werkbladen.ts
 * 9. plaatjes-bingo-werkbladen.ts
 * 10. sudoku-werkbladen.ts
 * 11. groot-klein-werkbladen.ts
 * 12. telgrafieken-werkbladen.ts
 * 13. visuele-optelsommen-werkbladen.ts
 * 14. rastertekenen-werkbladen.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const updates = [
  {
    file: 'lijnen-trekken-werkbladen.ts',
    seo: {
      title: 'Lijnen Trekken Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare lijntrekoefeningen voor fijne motoriek-ontwikkeling. Rechte lijnen, bogen en golven van kleuterschool tot groep 3. Download gratis PDF.',
      keywords: 'lijnen trekken generator, lijnen trekken oefeningen, fijne motoriek oefeningen, lijnvolgen oefening, pengreep oefeningen, tekenen training kleuterschool, fijne motoriek kleuterschool, schrijfvoorbereiding oefening, pengreep training, lijnen en vormen oefening, tekentraining kinderen',
    },
    hero: {
      title: 'Lijnen Trekken Generator',
      subtitle: 'Fijne Motoriek Oefeningen van Kleuterschool tot Groep 3',
    },
  },
  {
    file: 'plaatjes-bingo-werkbladen.ts',
    seo: {
      title: 'Gratis Plaatjesbingo Generator | LessonCraftStudio',
      description: 'Maak uitprintbare plaatjesbingospellen voor kinderen. 50 thema\'s, aanpasbare rasters en afbeeldingen uit 3.000+ bibliotheek. Perfect voor de klas. Download gratis.',
      keywords: 'plaatjesbingo generator, bingo uitprintbaar kinderen, plaatjesbingo spel, uitprintbaar bingospel, bingo kleuterschool, klassenbingo, plaatjesbingo raster, bingo oefening kinderen, groepsspel uitprintbaar, bingo afbeeldingen kinderen, bingospel klas',
    },
    hero: {
      title: 'Plaatjesbingo Generator',
      subtitle: 'Maak Uitprintbare Bingospellen met 50 Thema\'s',
    },
  },
  {
    file: 'sudoku-werkbladen.ts',
    seo: {
      title: 'Kindersudoku Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare plaatjessudoku voor kinderen. Eenvoudige en gemiddelde logicaspellen van kleuterschool tot groep 5. Afbeeldingen uit 3.000+ bibliotheek. Gratis PDF.',
      keywords: 'kindersudoku generator, plaatjessudoku kinderen, sudoku uitprintbaar, logicaspellen kinderen, eenvoudige sudoku kinderen, plaatjessudoku uitprintbaar, sudoku kleuterschool, logicaoefeningen kinderen, sudoku raster kinderen, denkvaardigheden training, sudoku basisschool',
    },
    hero: {
      title: 'Kindersudoku Generator',
      subtitle: 'Uitprintbare Plaatjessudoku van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'groot-klein-werkbladen.ts',
    seo: {
      title: 'Groottevergelijking Generator | LessonCraftStudio',
      description: 'Maak uitprintbare groot-en-klein vergelijkingsoefeningen met afbeeldingen. Ontwikkel groottebegrippen van kleuterschool tot groep 3. Pas instellingen aan. Gratis PDF.',
      keywords: 'groottevergelijking generator, groot en klein oefeningen, groottevergelijking kleuterschool, grootte herkenning, groter en kleiner, groottevergelijking kinderen, groot klein uitprintbaar, grootteverkenner oefeningen, grootte-oefeningen kleuterschool, vergelijkingsvaardigheden oefening, grootte sorteren',
    },
    hero: {
      title: 'Groot en Klein Generator',
      subtitle: 'Groottevergelijkingsoefeningen met Afbeeldingen van Kleuterschool tot Groep 3',
    },
  },
  {
    file: 'telgrafieken-werkbladen.ts',
    seo: {
      title: 'Gratis Telgrafieken Generator | LessonCraftStudio',
      description: 'Maak uitprintbare telgrafiekoefeningen met afbeeldingen. Tellen, kleuren en data aflezen voor kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'telgrafieken generator, telgrafieken oefeningen, staafdiagram kinderen, data aflezen kleuterschool, tellen en kleuren, grafiek oefening, beelddiagram werkbladen, statistiek kinderen, grafiektolking oefening, rekenen grafiek, beelddiagram uitprintbaar',
    },
    hero: {
      title: 'Telgrafieken Generator',
      subtitle: 'Uitprintbare Telgrafiekoefeningen met Afbeeldingen',
    },
  },
  {
    file: 'visuele-optelsommen-werkbladen.ts',
    seo: {
      title: 'Gratis Code-optellen Generator | LessonCraftStudio',
      description: 'Maak uitprintbare code-opteloefeningen waarbij kinderen geheime berichten ontcijferen door optellen. Kleuterschool tot groep 5. Met afbeeldingen. Gratis PDF.',
      keywords: 'code-optellen generator, code-optellen oefeningen, geheim bericht rekenen, codeeroefening kinderen, optellen codekraken, geheime codes rekenen, optelcode werkbladen, rekenpuzzel kinderen, ontcijferoefening, code-optellen uitprintbaar, rekenspel kinderen',
    },
    hero: {
      title: 'Code-optellen Generator',
      subtitle: 'Geheime Berichten door Opteloefeningen',
    },
  },
  {
    file: 'rastertekenen-werkbladen.ts',
    seo: {
      title: 'Gratis Rastertekenen Generator | LessonCraftStudio',
      description: 'Maak uitprintbare rastertekenoefeningen voor pixelkunst. Ontwikkel ruimtelijk inzicht en fijne motoriek van kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'rastertekenen generator, rastertekenen oefeningen, pixelkunst kinderen, rastertekening uitprintbaar, ruimtelijk inzicht oefening, tekenen op raster, pixeltekening werkbladen, symmetrie oefening, co\u00f6rdinatenoefeningen kinderen, rastertekenen kleuterschool, rasteroefeningen uitprintbaar',
    },
    hero: {
      title: 'Rastertekenen Generator',
      subtitle: 'Uitprintbare Pixelkunstoefeningen van Kleuterschool tot Groep 5',
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
