/**
 * Part 306: Verify Dutch Product Pages SEO — Apps 8-14
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const expected = [
  {
    file: 'lijnen-trekken-werkbladen.ts',
    seoTitle: 'Lijnen Trekken Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare lijntrekoefeningen voor fijne motoriek-ontwikkeling. Rechte lijnen, bogen en golven van kleuterschool tot groep 3. Download gratis PDF.',
    heroTitle: 'Lijnen Trekken Generator',
    heroSubtitle: 'Fijne Motoriek Oefeningen van Kleuterschool tot Groep 3',
    primaryKw: 'lijnen trekken generator',
  },
  {
    file: 'plaatjes-bingo-werkbladen.ts',
    seoTitle: 'Gratis Plaatjesbingo Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare plaatjesbingospellen voor kinderen. 50 thema\'s, aanpasbare rasters en afbeeldingen uit 3.000+ bibliotheek. Perfect voor de klas. Download gratis.',
    heroTitle: 'Plaatjesbingo Generator',
    heroSubtitle: 'Maak Uitprintbare Bingospellen met 50 Thema\'s',
    primaryKw: 'plaatjesbingo generator',
  },
  {
    file: 'sudoku-werkbladen.ts',
    seoTitle: 'Kindersudoku Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare plaatjessudoku voor kinderen. Eenvoudige en gemiddelde logicaspellen van kleuterschool tot groep 5. Afbeeldingen uit 3.000+ bibliotheek. Gratis PDF.',
    heroTitle: 'Kindersudoku Generator',
    heroSubtitle: 'Uitprintbare Plaatjessudoku van Kleuterschool tot Groep 5',
    primaryKw: 'kindersudoku generator',
  },
  {
    file: 'groot-klein-werkbladen.ts',
    seoTitle: 'Groottevergelijking Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare groot-en-klein vergelijkingsoefeningen met afbeeldingen. Ontwikkel groottebegrippen van kleuterschool tot groep 3. Pas instellingen aan. Gratis PDF.',
    heroTitle: 'Groot en Klein Generator',
    heroSubtitle: 'Groottevergelijkingsoefeningen met Afbeeldingen van Kleuterschool tot Groep 3',
    primaryKw: 'groottevergelijking generator',
  },
  {
    file: 'telgrafieken-werkbladen.ts',
    seoTitle: 'Gratis Telgrafieken Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare telgrafiekoefeningen met afbeeldingen. Tellen, kleuren en data aflezen voor kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Telgrafieken Generator',
    heroSubtitle: 'Uitprintbare Telgrafiekoefeningen met Afbeeldingen',
    primaryKw: 'telgrafieken generator',
  },
  {
    file: 'visuele-optelsommen-werkbladen.ts',
    seoTitle: 'Gratis Code-optellen Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare code-opteloefeningen waarbij kinderen geheime berichten ontcijferen door optellen. Kleuterschool tot groep 5. Met afbeeldingen. Gratis PDF.',
    heroTitle: 'Code-optellen Generator',
    heroSubtitle: 'Geheime Berichten door Opteloefeningen',
    primaryKw: 'code-optellen generator',
  },
  {
    file: 'rastertekenen-werkbladen.ts',
    seoTitle: 'Gratis Rastertekenen Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare rastertekenoefeningen voor pixelkunst. Ontwikkel ruimtelijk inzicht en fijne motoriek van kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Rastertekenen Generator',
    heroSubtitle: 'Uitprintbare Pixelkunstoefeningen van Kleuterschool tot Groep 5',
    primaryKw: 'rastertekenen generator',
  },
];

let pass = 0;
let fail = 0;

for (const exp of expected) {
  const filePath = path.join(BASE, exp.file);
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  // Check seo.title
  if (!content.includes(exp.seoTitle)) {
    errors.push(`seo.title missing: "${exp.seoTitle}"`);
  }

  // Check seo.description
  if (!content.includes(exp.seoDesc)) {
    errors.push(`seo.description missing: "${exp.seoDesc.substring(0, 60)}..."`);
  }

  // Check hero.title
  const heroIdx = content.indexOf('hero: {');
  if (heroIdx !== -1) {
    const heroSection = content.substring(heroIdx, content.indexOf('},', heroIdx) + 2);
    if (!heroSection.includes(exp.heroTitle)) {
      if (!content.includes(exp.heroTitle)) {
        errors.push(`hero.title missing: "${exp.heroTitle}"`);
      }
    }
  }

  // Check hero.subtitle
  if (!content.includes(exp.heroSubtitle)) {
    errors.push(`hero.subtitle missing: "${exp.heroSubtitle}"`);
  }

  // Check primary keyword in seo.keywords
  if (!content.includes(exp.primaryKw)) {
    errors.push(`primary keyword missing: "${exp.primaryKw}"`);
  }

  if (errors.length === 0) {
    console.log(`PASS: ${exp.file}`);
    pass++;
  } else {
    console.log(`FAIL: ${exp.file}`);
    errors.forEach(e => console.log(`  - ${e}`));
    fail++;
  }
}

console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${pass} PASS, ${fail} FAIL out of ${expected.length}`);
console.log('='.repeat(40));

if (fail > 0) process.exit(1);
