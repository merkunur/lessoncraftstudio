/**
 * Part 307: Dutch Product Pages SEO — Apps 15-21
 *
 * Updates SEO metadata for:
 * 15. zoek-voorwerpen-werkbladen.ts
 * 16. raster-puzzel-werkbladen.ts
 * 17. kruiswoordpuzzel-werkbladen.ts
 * 18. cryptogram-werkbladen.ts
 * 19. rekenpuzzels-werkbladen.ts
 * 20. ontbrekende-puzzelstukjes-werkbladen.ts
 * 21. meer-minder-werkbladen.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const updates = [
  {
    file: 'zoek-voorwerpen-werkbladen.ts',
    seo: {
      title: 'Zoek Voorwerpen Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare zoek-voorwerpen-oefeningen voor kinderen. Ontwikkel visuele aandacht en concentratie. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'zoek voorwerpen generator, zoek voorwerpen oefeningen, zoekoefeningen kinderen, visuele aandacht, zoek verborgen voorwerpen, concentratie-oefening kinderen, zoek voorwerpen uitprintbaar, aandachtsoefening, verborgen plaatjes oefening, visueel zoeken kinderen, zoek het verschil oefening',
    },
    hero: {
      title: 'Zoek Voorwerpen Generator',
      subtitle: 'Ontwikkel Visuele Aandacht met Zoekoefeningen',
    },
  },
  {
    file: 'raster-puzzel-werkbladen.ts',
    seo: {
      title: 'Gratis Rasterpuzzel Generator | LessonCraftStudio',
      description: 'Maak uitprintbare rasterpuzzeloefeningen met afbeeldingen. Logisch denken en probleemoplossing van kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'rasterpuzzel generator, rasterpuzzel oefeningen, logicapuzzel kinderen, rasteroefening uitprintbaar, probleemoplossing kinderen, patroonherkenning raster, matrixoefening kinderen, logisch denken oefening, puzzel werkbladen, rasterpuzzel kleuterschool, visuele logica kinderen',
    },
    hero: {
      title: 'Rasterpuzzel Generator',
      subtitle: 'Uitprintbare Logicaoefeningen met Rasterpuzzels',
    },
  },
  {
    file: 'kruiswoordpuzzel-werkbladen.ts',
    seo: {
      title: 'Gratis Kruiswoordpuzzel Generator | LessonCraftStudio',
      description: 'Maak uitprintbare beeldkruiswoorden voor kinderen. Afbeeldingsaanwijzingen in plaats van tekst. Ontwikkel woordenschat van kleuterschool tot groep 5. Gratis PDF.',
      keywords: 'kruiswoordpuzzel generator, kruiswoordpuzzel oefeningen, kruiswoord kinderen uitprintbaar, kruiswoordpuzzel kleuterschool, woordenschat kruiswoord, kruiswoord met afbeeldingen, eenvoudige kruiswoorden kinderen, beeldgebaseerde kruiswoorden, spelling-kruiswoord, kruiswoord gratis kinderen, kruiswoord basisschool',
    },
    hero: {
      title: 'Kruiswoordpuzzel Generator',
      subtitle: 'Uitprintbare Kruiswoorden met Beeldaanwijzingen voor Kinderen',
    },
  },
  {
    file: 'cryptogram-werkbladen.ts',
    seo: {
      title: 'Gratis Cryptogram Generator | LessonCraftStudio',
      description: 'Maak uitprintbare beeldcryptogrammen voor kinderen. Kraak geheime codes met beeldaanwijzingen. Kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
      keywords: 'cryptogram generator, cryptogram oefeningen, geheime code kinderen, cryptogram uitprintbaar, ontcijferoefening kinderen, geheime codes werkbladen, codekraker kinderen, cryptogram kleuterschool, cijferoefening, codering kinderen, geheime berichten oefening',
    },
    hero: {
      title: 'Cryptogram Generator',
      subtitle: 'Geheime Codes met Beeldaanwijzingen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'rekenpuzzels-werkbladen.ts',
    seo: {
      title: 'Gratis Rekenpuzzel Generator | LessonCraftStudio',
      description: 'Maak uitprintbare rekenpuzzels voor kinderen. Ontwikkel logisch denken en probleemoplossing met afbeeldingen. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'rekenpuzzel generator, rekenpuzzel oefeningen, wiskunde puzzel kinderen, logica rekenen, rekenraadsel kinderen, rekenpuzzel uitprintbaar, probleemoplossing rekenen, algebra kinderen, rekenen logicaoefening, rekenpuzzel basisschool, symbolisch rekenen kinderen',
    },
    hero: {
      title: 'Rekenpuzzel Generator',
      subtitle: 'Logische Rekenpuzzels van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'ontbrekende-puzzelstukjes-werkbladen.ts',
    seo: {
      title: 'Gratis Ontbrekende Stukjes Generator | LessonCraftStudio',
      description: 'Maak uitprintbare ontbrekende-stukjes-oefeningen voor kinderen. Ontwikkel ruimtelijk inzicht en visuele analyse. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'ontbrekende stukjes generator, ontbrekende stukjes oefeningen, puzzel aanvullen kinderen, visuele analyse oefening, ontbrekende stukjes uitprintbaar, beeldpuzzel kinderen, ruimtelijk inzicht oefening, maak het plaatje af, visuele aandacht puzzel, ontbrekende delen oefening, beeldanalyse kinderen',
    },
    hero: {
      title: 'Ontbrekende Stukjes Generator',
      subtitle: 'Visuele Analyse-oefeningen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'meer-minder-werkbladen.ts',
    seo: {
      title: 'Meer of Minder Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare vergelijkingsoefeningen voor kinderen. Meer, minder of evenveel met beeldgebaseerde oefeningen. Kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'meer of minder generator, meer of minder oefeningen, vergelijkingsoefening kinderen, meer of minder rekenen, groter dan kleiner dan, hoeveelheid vergelijking, vergelijking uitprintbaar, meer minder evenveel oefening, vergelijking kleuterschool, tellen en vergelijken, getalvergelijking kinderen',
    },
    hero: {
      title: 'Meer of Minder Generator',
      subtitle: 'Vergelijkingsoefeningen met Afbeeldingen van Kleuterschool tot Groep 5',
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
