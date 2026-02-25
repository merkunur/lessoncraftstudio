/**
 * Part 305: Verify Dutch Product Pages SEO — Apps 1-7
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const expected = [
  {
    file: 'optellen-werkbladen.ts',
    seoTitle: 'Gratis Opteloefening Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare opteloefeningen met afbeeldingen voor kleuterschool tot groep 5. 3.000+ afbeeldingen, pas het niveau aan en krijg antwoorden. Download gratis PDF.',
    heroTitle: 'Opteloefening Generator',
    heroSubtitle: 'Maak Beeldgebaseerde Opteloefeningen van Kleuterschool tot Groep 5',
    primaryKw: 'opteloefening generator',
  },
  {
    file: 'alphabet-train-worksheets.ts',
    seoTitle: 'Gratis Alfabettrein Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare alfabettrein-oefeningen voor letterherkenning van kleuterschool tot groep 3. Leuk leren met afbeeldingen. Gratis PDF.',
    heroTitle: 'Alfabettrein Generator',
    heroSubtitle: 'Uitprintbare Letteroefeningen van Kleuterschool tot Groep 3',
    primaryKw: 'alfabettrein generator',
  },
  {
    file: 'kleurplaten-werkbladen.ts',
    seoTitle: 'Gratis Kleurplaten Generator voor Kinderen | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare kleurplaten voor kinderen met 3.000+ afbeeldingen. 50 thema\'s en 5 leeftijdsniveaus van kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Kleurplaten Generator voor Kinderen',
    heroSubtitle: 'Maak Uitprintbare Kleurplaten met 50 Thema\'s en 3.000+ Afbeeldingen',
    primaryKw: 'kleurplaten generator',
  },
  {
    file: 'rekenen-werkbladen.ts',
    seoTitle: 'Rekenoefening Generator voor Kinderen | LessonCraftStudio',
    seoDesc: 'Maak visuele rekenoefeningen met afbeeldingen. Optellen, aftrekken, vergelijken en getallenreeksen van kleuterschool tot groep 5. Antwoorden inbegrepen. Gratis PDF.',
    heroTitle: 'Rekenoefening Generator',
    heroSubtitle: 'Visuele Rekenoefeningen van Kleuterschool tot Groep 5',
    primaryKw: 'rekenoefening generator',
  },
  {
    file: 'woordkruisel-werkbladen.ts',
    seoTitle: 'Gratis Woordkruisel Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare woordkruisel-oefeningen voor spelling en woordenschat. Pas het niveau aan van kleuterschool tot groep 5. Met afbeeldingen. Gratis PDF.',
    heroTitle: 'Woordkruisel Generator',
    heroSubtitle: 'Uitprintbare Spellingoefeningen met Afbeeldingen',
    primaryKw: 'woordkruisel generator',
  },
  {
    file: 'zoek-en-tel-werkbladen.ts',
    seoTitle: 'Zoek en Tel Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare zoek-en-tel-oefeningen voor kinderen. Ontwikkel telvaardigheden en visuele aandacht met afbeeldingen. Kleuterschool tot groep 5. Gratis PDF.',
    heroTitle: 'Zoek en Tel Generator',
    heroSubtitle: 'Ontwikkel Telvaardigheden met Leuke Zoekoefeningen',
    primaryKw: 'zoek en tel generator',
  },
  {
    file: 'verbindings-werkbladen.ts',
    seoTitle: 'Gratis Verbindingsoefening Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare verbindingsoefeningen met afbeeldingen. Ontwikkel geheugen en patroonherkenning van kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
    heroTitle: 'Verbindingsoefening Generator',
    heroSubtitle: 'Uitprintbare Koppeloefeningen met 50 Thema\'s',
    primaryKw: 'verbindingsoefening generator',
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
      // Check full content as fallback
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
