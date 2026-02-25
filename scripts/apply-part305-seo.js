/**
 * Part 305: Dutch Product Pages SEO — Apps 1-7
 *
 * Updates SEO metadata for:
 * 1. optellen-werkbladen.ts
 * 2. alphabet-train-worksheets.ts
 * 3. kleurplaten-werkbladen.ts
 * 4. rekenen-werkbladen.ts
 * 5. woordkruisel-werkbladen.ts
 * 6. zoek-en-tel-werkbladen.ts
 * 7. verbindings-werkbladen.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'nl');

const updates = [
  {
    file: 'optellen-werkbladen.ts',
    seo: {
      title: 'Gratis Opteloefening Generator | LessonCraftStudio',
      description: 'Maak uitprintbare opteloefeningen met afbeeldingen voor kleuterschool tot groep 5. 3.000+ afbeeldingen, pas het niveau aan en krijg antwoorden. Download gratis PDF.',
      keywords: 'opteloefening generator, opteloefeningen gratis, optellen werkbladen kleuterschool, beeldgebaseerde opteloefeningen, rekenen werkbladen gratis, plussommen met afbeeldingen, uitprintbare rekenoefeningen, optellen antwoorden, leren optellen, plussommen groep 3, opteloefeningen kinderen',
    },
    hero: {
      title: 'Opteloefening Generator',
      subtitle: 'Maak Beeldgebaseerde Opteloefeningen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'alphabet-train-worksheets.ts',
    seo: {
      title: 'Gratis Alfabettrein Generator | LessonCraftStudio',
      description: 'Maak uitprintbare alfabettrein-oefeningen voor letterherkenning van kleuterschool tot groep 3. Leuk leren met afbeeldingen. Gratis PDF.',
      keywords: 'alfabettrein generator, alfabettrein oefeningen, letters oefening kleuterschool, alfabet uitprintbaar, alfabettrein werkbladen, letterherkenning, alfabetische volgorde oefening, letteroefeningen kinderen, leren lezen, alfabetoefeningen, beginletters oefening',
    },
    hero: {
      title: 'Alfabettrein Generator',
      subtitle: 'Uitprintbare Letteroefeningen van Kleuterschool tot Groep 3',
    },
  },
  {
    file: 'kleurplaten-werkbladen.ts',
    seo: {
      title: 'Gratis Kleurplaten Generator voor Kinderen | LessonCraftStudio',
      description: 'Maak uitprintbare kleurplaten voor kinderen met 3.000+ afbeeldingen. 50 thema\'s en 5 leeftijdsniveaus van kleuterschool tot groep 5. Download gratis PDF.',
      keywords: 'kleurplaten generator, kleurplaten kinderen gratis, gratis kleurplaten uitprinten, kleurpagina\'s uitprintbaar, dieren kleurplaten, uitprintbare kleurplaten, kleurplaten kleuterschool, inkleuroefeningen, kleurplaten voor kinderen, fijne motoriek kleurplaten, kleuroefeningen kinderen',
    },
    hero: {
      title: 'Kleurplaten Generator voor Kinderen',
      subtitle: 'Maak Uitprintbare Kleurplaten met 50 Thema\'s en 3.000+ Afbeeldingen',
    },
  },
  {
    file: 'rekenen-werkbladen.ts',
    seo: {
      title: 'Rekenoefening Generator voor Kinderen | LessonCraftStudio',
      description: 'Maak visuele rekenoefeningen met afbeeldingen. Optellen, aftrekken, vergelijken en getallenreeksen van kleuterschool tot groep 5. Antwoorden inbegrepen. Gratis PDF.',
      keywords: 'rekenoefening generator, rekenen oefeningen basisschool, rekenoefeningen uitprintbaar, rekenen werkbladen, rekenoefeningen kleuterschool, visuele rekenoefeningen, rekenoefeningen kinderen, rekenen antwoorden, basisbewerkingen oefening, rekenen uitprintbaar gratis, rekenen trainingsoefeningen',
    },
    hero: {
      title: 'Rekenoefening Generator',
      subtitle: 'Visuele Rekenoefeningen van Kleuterschool tot Groep 5',
    },
  },
  {
    file: 'woordkruisel-werkbladen.ts',
    seo: {
      title: 'Gratis Woordkruisel Generator | LessonCraftStudio',
      description: 'Maak uitprintbare woordkruisel-oefeningen voor spelling en woordenschat. Pas het niveau aan van kleuterschool tot groep 5. Met afbeeldingen. Gratis PDF.',
      keywords: 'woordkruisel generator, woordkruisel oefeningen, schrijfoefeningen kinderen, spelling oefening, woordpuzzel uitprintbaar, spellingoefening, woordspel kinderen uitprintbaar, woordvorming oefeningen, leren lezen oefeningen, schrijven training, woordenschat oefeningen',
    },
    hero: {
      title: 'Woordkruisel Generator',
      subtitle: 'Uitprintbare Spellingoefeningen met Afbeeldingen',
    },
  },
  {
    file: 'zoek-en-tel-werkbladen.ts',
    seo: {
      title: 'Zoek en Tel Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Maak uitprintbare zoek-en-tel-oefeningen voor kinderen. Ontwikkel telvaardigheden en visuele aandacht met afbeeldingen. Kleuterschool tot groep 5. Gratis PDF.',
      keywords: 'zoek en tel generator, zoek en tel oefeningen, teloefeningen kleuterschool, visueel tellen, hoeveelheidsherkenning, zoek en tel uitprintbaar, telvaardigheden kinderen, teloefening met afbeeldingen, getallenoefeningen kleuterschool, tellen training, rekenen zoekoefening',
    },
    hero: {
      title: 'Zoek en Tel Generator',
      subtitle: 'Ontwikkel Telvaardigheden met Leuke Zoekoefeningen',
    },
  },
  {
    file: 'verbindings-werkbladen.ts',
    seo: {
      title: 'Gratis Verbindingsoefening Generator | LessonCraftStudio',
      description: 'Maak uitprintbare verbindingsoefeningen met afbeeldingen. Ontwikkel geheugen en patroonherkenning van kleuterschool tot groep 5. 50 thema\'s. Download gratis PDF.',
      keywords: 'verbindingsoefening generator, verbindingsoefeningen, koppelen kinderen, geheugenspel uitprintbaar, koppeloefening kleuterschool, patroonherkenning oefening, visueel koppelen, beeldkoppeling oefening, koppeloefening uitprintbaar, geheugen en koppelen, verbindingsoefeningen kleuterschool',
    },
    hero: {
      title: 'Verbindingsoefening Generator',
      subtitle: 'Uitprintbare Koppeloefeningen met 50 Thema\'s',
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
