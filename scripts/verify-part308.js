/**
 * Part 308: Verify Dutch Product Pages SEO — Apps 22-28
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const expected = [
  {
    file: 'welke-hoort-niet-bij-werkbladen.ts',
    seoTitle: 'Welke Hoort er Niet Bij Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare welke-hoort-niet-bij-oefeningen voor kinderen. Ontwikkel logisch denken en categorisering. Kleuterschool tot groep 5. Gratis PDF.',
    heroTitle: 'Welke Hoort er Niet Bij Generator',
    heroSubtitle: 'Logische Categoriseringsoefeningen met Afbeeldingen',
    primaryKw: 'welke hoort niet bij oefeningen',
  },
  {
    file: 'patroontrein-werkbladen.ts',
    seoTitle: 'Gratis Patroontrein Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare patroontreinoefeningen voor kinderen. Ontwikkel patroonherkenning en sequentie van kleuterschool tot groep 4. Gratis PDF.',
    heroTitle: 'Patroontrein Generator',
    heroSubtitle: 'Patroonherkenning en Sequentie-oefeningen met Afbeeldingen',
    primaryKw: 'patroontrein oefeningen',
  },
  {
    file: 'patronen-werkbladen.ts',
    seoTitle: 'Gratis Patronenoefening Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare patronenoefeningen met afbeeldingen. Ontwikkel logica en patroonherkenning van kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
    heroTitle: 'Patronenoefening Generator',
    heroSubtitle: 'Uitprintbare Patronenoefeningen met 50 Thema\'s',
    primaryKw: 'patronen oefeningen kinderen',
  },
  {
    file: 'doolhof-werkbladen.ts',
    seoTitle: 'Gratis Doolhof Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare doolhofoefeningen voor kinderen. Ontwikkel probleemoplossing en visuele planning van kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Doolhof Generator',
    heroSubtitle: 'Uitprintbare Doolhofoefeningen met Afbeeldingen',
    primaryKw: 'doolhof oefeningen',
  },
  {
    file: 'sorteer-werkbladen.ts',
    seoTitle: 'Gratis Sorteeroefening Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare sorteeroefeningen voor kinderen. Ontwikkel categorisering en classificatie. Kleuterschool tot groep 5. 50 thema\'s. Gratis PDF.',
    heroTitle: 'Sorteeroefening Generator',
    heroSubtitle: 'Categoriseringsoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
    primaryKw: 'sorteeroefeningen',
  },
  {
    file: 'voorzetsels-werkbladen.ts',
    seoTitle: 'Voorzetsels Oefening Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare voorzetsels-oefeningen met afbeeldingen. Plaatswoorden zoals op, in, onder en naast. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Voorzetsels Oefening Generator',
    heroSubtitle: 'Plaatswoordoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
    primaryKw: 'voorzetsels oefening kinderen',
  },
  {
    file: 'schaduw-matching-werkbladen.ts',
    seoTitle: 'Gratis Schaduwmatching Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare schaduwmatchingoefeningen voor kinderen. Match afbeeldingen met hun schaduwen. Ontwikkel visuele perceptie. Kleuterschool tot groep 4. Gratis PDF.',
    heroTitle: 'Schaduwmatching Generator',
    heroSubtitle: 'Visuele Schaduwmatchingoefeningen met Afbeeldingen',
    primaryKw: 'schaduwmatching oefeningen',
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
