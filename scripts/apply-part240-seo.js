/**
 * Part 240: Norwegian Product Pages SEO — Apps 1-7
 *
 * Updates SEO metadata for:
 * 1. addisjon-arbeidsark.ts
 * 2. alfabet-tog-arbeidsark.ts
 * 3. fargeleggingsbilder-arbeidsark.ts
 * 4. matematikk-oppgaver-arbeidsark.ts
 * 5. bokstavoppgaver-arbeidsark.ts
 * 6. finn-og-tell-arbeidsark.ts
 * 7. kobling-arbeidsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'no');

const updates = [
  {
    file: 'addisjon-arbeidsark.ts',
    seo: {
      title: 'Gratis Addisjon Generator til Barn | LessonCraftStudio',
      description: 'Lag printbare plussoppgaver med bilder til f\u00f8rskole\u20133. klasse. 3 000+ bilder, tilpass vanskelighetsgrad og f\u00e5 fasit. Last ned gratis PDF med en gang.',
      keywords: 'addisjon oppgave generator, plussoppgaver arbeidsark gratis, addisjon oppgaver barnehage, bildebaserte plussoppgaver, matematikk arbeidsark gratis, plussoppgaver med bilder, printbare regneoppgaver, addisjon fasit, l\u00e6re \u00e5 legge sammen, plussoppgaver 1. klasse, addisjon \u00f8velser barn',
    },
    hero: {
      title: 'Addisjon Oppgave Generator',
      subtitle: 'Lag Bildebaserte Plussoppgaver fra F\u00f8rskole til 3. Klasse',
    },
  },
  {
    file: 'alfabet-tog-arbeidsark.ts',
    seo: {
      title: 'Gratis Alfabet-Tog Generator | LessonCraftStudio',
      description: 'Lag printbare alfabet-tog-oppgaver til bokstavl\u00e6ring fra f\u00f8rskole til 1. klasse. Morsom m\u00e5te \u00e5 l\u00e6re bokstaver med bilder. Last ned gratis PDF.',
      keywords: 'alfabet tog generator, alfabet tog oppgaver, bokstaver \u00f8velse f\u00f8rskole, alfabet printbar, alfabet-tog arbeidsark, bokstavgjenkjenning, alfabetisk rekkef\u00f8lge \u00f8velse, bokstav\u00f8velser til barn, l\u00e6re \u00e5 lese, alfabet\u00f8velser, begynnelsesbokstaver oppgave',
    },
    hero: {
      title: 'Alfabet-Tog Generator',
      subtitle: 'Printbare Bokstav\u00f8velser fra F\u00f8rskole til 1. Klasse',
    },
  },
  {
    file: 'fargeleggingsbilder-arbeidsark.ts',
    seo: {
      title: 'Gratis Fargelegging Generator til Barn | LessonCraftStudio',
      description: 'Lag printbare fargeleggingssider til barn med 3 000+ bilder. 50 temaer og 5 aldersniv\u00e5er fra f\u00f8rskole til 3. klasse. Last ned gratis PDF.',
      keywords: 'fargelegging generator, fargeleggingssider til barn gratis, gratis fargelegging print, fargeleggingsark printbar, dyr fargelegging, printbare fargeleggingssider, fargelegging f\u00f8rskole, fargeleggings\u00f8velser, fargeleggingsoppgaver til barn, finmotorikk fargelegging, barns fargeleggingssider',
    },
    hero: {
      title: 'Fargelegging Generator til Barn',
      subtitle: 'Lag Printbare Fargeleggingssider med 50 Temaer og 3 000+ Bilder',
    },
  },
  {
    file: 'matematikk-oppgaver-arbeidsark.ts',
    seo: {
      title: 'Matematikkoppgave Generator til Barn | LessonCraftStudio',
      description: 'Lag visuelle matematikkoppgaver med bilder. Addisjon, subtraksjon, sammenligning og tallrekker fra f\u00f8rskole til 3. klasse. Fasit inkludert. Gratis PDF.',
      keywords: 'matematikkoppgave generator, matematikk oppgaver sm\u00e5skolen, regneoppgaver printbar, matematikk arbeidsark, matematikk\u00f8velser f\u00f8rskole, visuelle matematikkoppgaver, regneoppgaver til barn, matematikk fasit, grunnleggende regnearter \u00f8velse, matematikk printbar gratis, matematikk treningsoppgaver',
    },
    hero: {
      title: 'Matematikkoppgave Generator',
      subtitle: 'Visuelle Matematikk\u00f8velser fra F\u00f8rskole til 3. Klasse',
    },
  },
  {
    file: 'bokstavoppgaver-arbeidsark.ts',
    seo: {
      title: 'Gratis Bokstavblanding Generator | LessonCraftStudio',
      description: 'Lag printbare bokstavblanding-oppgaver til staving og rettskriving. Tilpass vanskelighetsgrad fra f\u00f8rskole til 3. klasse. Med bilder. Gratis PDF.',
      keywords: 'bokstavblanding generator, bokstavblanding oppgaver, skrive\u00f8velser til barn, rettskriving \u00f8velse, ordg\u00e5te printbar, stavelse\u00f8velse, ordspill til barn printbar, orddanning oppgaver, l\u00e6re \u00e5 lese oppgaver, skriving trening, ordforr\u00e5d \u00f8velser',
    },
    hero: {
      title: 'Bokstavblanding Generator',
      subtitle: 'Printbare Rettskrivings\u00f8velser med Bilder',
    },
  },
  {
    file: 'finn-og-tell-arbeidsark.ts',
    seo: {
      title: 'Finn og Tell Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare finn og tell-oppgaver til barn. Utvikl telleferdigheter og visuell oppmerksomhet med bilder. F\u00f8rskole til 3. klasse. Gratis PDF.',
      keywords: 'finn og tell generator, finn og tell oppgaver, telle\u00f8velser f\u00f8rskole, visuell telling, antallgjenkjenning, finn og tell printbar, telleferdigheter til barn, telle\u00f8velse med bilder, tall\u00f8velser f\u00f8rskole, telling trening, matematikk s\u00f8keoppgave',
    },
    hero: {
      title: 'Finn og Tell Generator',
      subtitle: 'Utvikl Telleferdigheter med Morsomme S\u00f8keoppgaver',
    },
  },
  {
    file: 'kobling-arbeidsark.ts',
    seo: {
      title: 'Gratis Koblingsoppgave Generator til Barn | LessonCraftStudio',
      description: 'Lag printbare koblingsoppgaver med bilder. Utvikl hukommelse og m\u00f8nstergjenkjenning fra f\u00f8rskole til 3. klasse. 50 temaer. Last ned gratis PDF.',
      keywords: 'koblingsoppgave generator, koblingsoppgaver, parring til barn, hukommelsesspill printbar, parrings\u00f8velse f\u00f8rskole, m\u00f8nstergjenkjenning \u00f8velse, visuell parring, bildeparring oppgave, par\u00f8velse printbar, hukommelse og parring, koblingsoppgaver f\u00f8rskole',
    },
    hero: {
      title: 'Koblingsoppgave Generator',
      subtitle: 'Printbare Parrings\u00f8velser med 50 Temaer',
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
