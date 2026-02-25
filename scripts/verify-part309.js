/**
 * Part 309: Verify Dutch Product Pages SEO — Apps 29-33
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const expected = [
  {
    file: 'aftrekken-werkbladen.ts',
    seoTitle: 'Gratis Aftreksommen Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare aftreksommen met afbeeldingen voor kleuterschool tot groep 5. Pas het niveau aan, kies afbeeldingen en krijg antwoorden. Download gratis PDF.',
    heroTitle: 'Aftreksommen Generator',
    heroSubtitle: 'Beeldgebaseerde Aftreksommen van Kleuterschool tot Groep 5',
    primaryKw: 'aftreksommen gratis',
  },
  {
    file: 'schattenjacht-werkbladen.ts',
    seoTitle: 'Gratis Schattenjacht Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare schattenjacht-oefeningen voor kinderen. Combineer probleemoplossing met avontuur. Kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
    heroTitle: 'Schattenjacht Generator',
    heroSubtitle: 'Uitprintbare Schattenjachtoefeningen met 50 Thema\'s',
    primaryKw: 'schattenjacht oefeningen kinderen',
  },
  {
    file: 'woordraadsel-werkbladen.ts',
    seoTitle: 'Gratis Woordraadsel Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare woordraadseloefeningen voor kinderen. Ontwikkel woordenschat en redeneervermogen. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Woordraadsel Generator',
    heroSubtitle: 'Woordenschatoefeningen met Beeldaanwijzingen',
    primaryKw: 'woordraadsel oefeningen',
  },
  {
    file: 'schrijfoefeningen-werkbladen.ts',
    seoTitle: 'Gratis Schrijfoefening Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare schrijfoefeningen voor kinderen. Lettervorming, woordschrijven en zinsbouw. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Schrijfoefening Generator',
    heroSubtitle: 'Uitprintbare Schrijfoefeningen van Kleuterschool tot Groep 5',
    primaryKw: 'schrijfoefeningen kinderen',
  },
  {
    file: 'word-search-worksheets.ts',
    seoTitle: 'Gratis Woordzoeker Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare woordzoekers in 11 talen. Aanpasbare woorden, afmetingen en niveaus. Woordenschat en spelling. Download gratis PDF.',
    heroTitle: 'Woordzoeker Generator',
    heroSubtitle: 'Uitprintbare Woordzoekers voor Woordenschatoefening',
    primaryKw: 'woordzoeker uitprintbaar',
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
