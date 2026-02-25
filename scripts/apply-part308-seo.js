/**
 * Part 308: Dutch Product Pages SEO — Apps 22-28
 *
 * Updates SEO metadata for:
 * 22. welke-hoort-niet-bij-werkbladen.ts
 * 23. patroontrein-werkbladen.ts
 * 24. patronen-werkbladen.ts
 * 25. doolhof-werkbladen.ts
 * 26. sorteer-werkbladen.ts
 * 27. voorzetsels-werkbladen.ts
 * 28. schaduw-matching-werkbladen.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const updates = [
  {
    file: 'welke-hoort-niet-bij-werkbladen.ts',
    seo: {
      title: 'Welke Hoort er Niet Bij Generator | LessonCraftStudio',
      description: 'Maak uitprintbare welke-hoort-niet-bij-oefeningen voor kinderen. Ontwikkel logisch denken en categorisering. Kleuterschool tot groep 5. Gratis PDF.',
      keywords: 'welke hoort niet bij oefeningen, vreemde eend kinderen, categorisering oefening, logisch denken kinderen, zoek het verschil, classificatie oefening, visuele discriminatie, welke hoort niet bij uitprintbaar, sorteren en groeperen, logicaoefening kleuterschool',
    },
    hero: {
      title: 'Welke Hoort er Niet Bij Generator',
      subtitle: 'Logische Categoriseringsoefeningen met Afbeeldingen',
    },
  },
  {
    file: 'patroontrein-werkbladen.ts',
    seo: {
      title: 'Gratis Patroontrein Generator | LessonCraftStudio',
      description: 'Maak uitprintbare patroontreinoefeningen voor kinderen. Ontwikkel patroonherkenning en sequentie van kleuterschool tot groep 4. Gratis PDF.',
      keywords: 'patroontrein oefeningen, patroonherkenning kinderen, sequentie oefening, patronen kleuterschool, trein patroon uitprintbaar, patroonreeks oefening, herhalend patroon, patroontraining kinderen, sequentie-oefening kleuterschool, beeldpatroon oefening',
    },
    hero: {
      title: 'Patroontrein Generator',
      subtitle: 'Patroonherkenning en Sequentie-oefeningen met Afbeeldingen',
    },
  },
  {
    file: 'patronen-werkbladen.ts',
    seo: {
      title: 'Gratis Patronenoefening Generator | LessonCraftStudio',
      description: 'Maak uitprintbare patronenoefeningen met afbeeldingen. Ontwikkel logica en patroonherkenning van kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
      keywords: 'patronen oefeningen kinderen, patroonherkenning oefening, patronen werkbladen, logisch patroon kinderen, patroon reeks oefening, patronen uitprintbaar, sequentie en patronen, patronenoefening kleuterschool, rekenen patronen, beeldpatroon werkbladen',
    },
    hero: {
      title: 'Patronenoefening Generator',
      subtitle: 'Uitprintbare Patronenoefeningen met 50 Thema\'s',
    },
  },
  {
    file: 'doolhof-werkbladen.ts',
    seo: {
      title: 'Gratis Doolhof Generator | LessonCraftStudio',
      description: 'Maak uitprintbare doolhofoefeningen voor kinderen. Ontwikkel probleemoplossing en visuele planning van kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'doolhof oefeningen, doolhof kinderen uitprintbaar, doolhof kleuterschool, visuele planning oefening, doolhofpuzzel kinderen, beeldpad oefening, probleemoplossing doolhof, doolhof werkbladen, wegvinden oefening, doolhof gratis kinderen',
    },
    hero: {
      title: 'Doolhof Generator',
      subtitle: 'Uitprintbare Doolhofoefeningen met Afbeeldingen',
    },
  },
  {
    file: 'sorteer-werkbladen.ts',
    seo: {
      title: 'Gratis Sorteeroefening Generator | LessonCraftStudio',
      description: 'Maak uitprintbare sorteeroefeningen voor kinderen. Ontwikkel categorisering en classificatie. Kleuterschool tot groep 5. 50 thema\'s. Gratis PDF.',
      keywords: 'sorteeroefeningen, sorteren kinderen, categorisering oefening kinderen, classificatie werkbladen, sorteeroefening uitprintbaar, sorteren kleuterschool, groepering oefening, sorteren en classificeren, categorie\u00ebn oefening kinderen, visueel sorteren',
    },
    hero: {
      title: 'Sorteeroefening Generator',
      subtitle: 'Categoriseringsoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'voorzetsels-werkbladen.ts',
    seo: {
      title: 'Voorzetsels Oefening Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare voorzetsels-oefeningen met afbeeldingen. Plaatswoorden zoals op, in, onder en naast. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'voorzetsels oefening kinderen, plaatswoorden oefening, voorzetsels werkbladen, op in onder naast oefening, ruimtelijk begrip taal, voorzetsels kleuterschool, plaatswoorden met afbeeldingen, taaloefening voorzetsels, voorzetsels oefening uitprintbaar, grammatica kinderen',
    },
    hero: {
      title: 'Voorzetsels Oefening Generator',
      subtitle: 'Plaatswoordoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'schaduw-matching-werkbladen.ts',
    seo: {
      title: 'Gratis Schaduwmatching Generator | LessonCraftStudio',
      description: 'Maak uitprintbare schaduwmatchingoefeningen voor kinderen. Match afbeeldingen met hun schaduwen. Ontwikkel visuele perceptie. Kleuterschool tot groep 4. Gratis PDF.',
      keywords: 'schaduwmatching oefeningen, schaduw koppelen kinderen, visuele perceptie oefening, schaduwpuzzel uitprintbaar, beeld en schaduw matching, schaduwmatching kleuterschool, visuele discriminatie, schaduw-oefening kinderen, contour matching, silhouet matching',
    },
    hero: {
      title: 'Schaduwmatching Generator',
      subtitle: 'Visuele Schaduwmatchingoefeningen met Afbeeldingen',
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
