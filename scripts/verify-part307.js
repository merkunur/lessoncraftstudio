/**
 * Part 307: Verify Dutch Product Pages SEO — Apps 15-21
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const expected = [
  {
    file: 'zoek-voorwerpen-werkbladen.ts',
    seoTitle: 'Zoek Voorwerpen Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare zoek-voorwerpen-oefeningen voor kinderen. Ontwikkel visuele aandacht en concentratie. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Zoek Voorwerpen Generator',
    heroSubtitle: 'Ontwikkel Visuele Aandacht met Zoekoefeningen',
    primaryKw: 'zoek voorwerpen generator',
  },
  {
    file: 'raster-puzzel-werkbladen.ts',
    seoTitle: 'Gratis Rasterpuzzel Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare rasterpuzzeloefeningen met afbeeldingen. Logisch denken en probleemoplossing van kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Rasterpuzzel Generator',
    heroSubtitle: 'Uitprintbare Logicaoefeningen met Rasterpuzzels',
    primaryKw: 'rasterpuzzel generator',
  },
  {
    file: 'kruiswoordpuzzel-werkbladen.ts',
    seoTitle: 'Gratis Kruiswoordpuzzel Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare beeldkruiswoorden voor kinderen. Afbeeldingsaanwijzingen in plaats van tekst. Ontwikkel woordenschat van kleuterschool tot groep 5. Gratis PDF.',
    heroTitle: 'Kruiswoordpuzzel Generator',
    heroSubtitle: 'Uitprintbare Kruiswoorden met Beeldaanwijzingen voor Kinderen',
    primaryKw: 'kruiswoordpuzzel generator',
  },
  {
    file: 'cryptogram-werkbladen.ts',
    seoTitle: 'Gratis Cryptogram Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare beeldcryptogrammen voor kinderen. Kraak geheime codes met beeldaanwijzingen. Kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
    heroTitle: 'Cryptogram Generator',
    heroSubtitle: 'Geheime Codes met Beeldaanwijzingen van Kleuterschool tot Groep 5',
    primaryKw: 'cryptogram generator',
  },
  {
    file: 'rekenpuzzels-werkbladen.ts',
    seoTitle: 'Gratis Rekenpuzzel Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare rekenpuzzels voor kinderen. Ontwikkel logisch denken en probleemoplossing met afbeeldingen. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Rekenpuzzel Generator',
    heroSubtitle: 'Logische Rekenpuzzels van Kleuterschool tot Groep 5',
    primaryKw: 'rekenpuzzel generator',
  },
  {
    file: 'ontbrekende-puzzelstukjes-werkbladen.ts',
    seoTitle: 'Gratis Ontbrekende Stukjes Generator | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare ontbrekende-stukjes-oefeningen voor kinderen. Ontwikkel ruimtelijk inzicht en visuele analyse. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Ontbrekende Stukjes Generator',
    heroSubtitle: 'Visuele Analyse-oefeningen van Kleuterschool tot Groep 5',
    primaryKw: 'ontbrekende stukjes generator',
  },
  {
    file: 'meer-minder-werkbladen.ts',
    seoTitle: 'Meer of Minder Generator \u2014 Gratis | LessonCraftStudio',
    seoDesc: 'Maak uitprintbare vergelijkingsoefeningen voor kinderen. Meer, minder of evenveel met beeldgebaseerde oefeningen. Kleuterschool tot groep 5. Download gratis PDF.',
    heroTitle: 'Meer of Minder Generator',
    heroSubtitle: 'Vergelijkingsoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
    primaryKw: 'meer of minder generator',
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
