/**
 * Part 243: Norwegian Product Pages SEO — Apps 22-28
 *
 * Updates SEO metadata for:
 * 22. finn-den-ulike-arbeidsark.ts
 * 23. monstertog-arbeidsark.ts
 * 24. monsteroppgaver-arbeidsark.ts
 * 25. bildesti-arbeidsark.ts
 * 26. bildesortering-arbeidsark.ts
 * 27. preposisjoner-arbeidsark.ts
 * 28. skyggematching-arbeidsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'no');

const updates = [
  {
    file: 'finn-den-ulike-arbeidsark.ts',
    seo: {
      title: 'Finn den Ulike Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare finn den ulike-oppgaver til visuell oppfatning og klassifisering. 50 temaer og tilpassbare innstillinger. Gratis PDF.',
      keywords: 'finn den ulike generator, finn den ulike oppgaver, hva passer ikke inn, klassifisering \u00f8velse, visuell skjelning, annerledes bilde oppgave, klassifiseringstrening til barn, forskjellig i gruppen, m\u00f8nstergjenkjenning og klassifisering, sortering og skjelning, finn den ulike printbar',
    },
    hero: {
      title: 'Finn den Ulike Generator',
      subtitle: 'Klassifiserings- og Oppfatnings\u00f8velser med Bilder',
    },
  },
  {
    file: 'monstertog-arbeidsark.ts',
    seo: {
      title: 'Gratis M\u00f8nstertog Generator | LessonCraftStudio',
      description: 'Lag printbare m\u00f8nstertog-oppgaver til m\u00f8nstergjenkjenning. Togformede oppgaver med 3 000+ bilder. F\u00f8rskole til 2. klasse. Gratis PDF.',
      keywords: 'm\u00f8nstertog generator, m\u00f8nstertog oppgaver, m\u00f8nstre fortsettelse, m\u00f8nstergjenkjenning tog, m\u00f8nstergjenkjenning f\u00f8rskole, m\u00f8nster fortsettelse \u00f8velse, m\u00f8nstertog printbar, m\u00f8nsterserier til barn, m\u00f8nstre gjenkjenning, matematisk oppfatning, m\u00f8nsterrekke \u00f8velse',
    },
    hero: {
      title: 'M\u00f8nstertog Generator',
      subtitle: 'M\u00f8nstergjenkjennings\u00f8velser i Togformat',
    },
  },
  {
    file: 'monsteroppgaver-arbeidsark.ts',
    seo: {
      title: 'M\u00f8nsteroppgave Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare m\u00f8nsteroppgaver til m\u00f8nstergjenkjenning og -fortsettelse. Varierte serier fra f\u00f8rskole til 3. klasse. 50 temaer. Gratis PDF.',
      keywords: 'm\u00f8nsteroppgave generator, m\u00f8nsteroppgaver printbar, m\u00f8nsterserier til barn, m\u00f8nstre fortsettelse, m\u00f8nstergjenkjenning \u00f8velse, matematiske m\u00f8nstre, m\u00f8nsterrekke oppgaver, m\u00f8nster kopiark, oppfatningsferdigheter f\u00f8rskole, m\u00f8nstergjenkjenning 1. klasse, m\u00f8nstre og serier',
    },
    hero: {
      title: 'M\u00f8nsteroppgave Generator',
      subtitle: 'M\u00f8nstergjenkjenning og -fortsettelse med 50 Temaer',
    },
  },
  {
    file: 'bildesti-arbeidsark.ts',
    seo: {
      title: 'Gratis Bildesti Generator | LessonCraftStudio',
      description: 'Lag printbare bildesti-oppgaver der barnet f\u00f8lger bilderuter. Utvikler logisk tenkning og finmotorikk. F\u00f8rskole til 2. klasse. Gratis.',
      keywords: 'bildesti generator, bildesti oppgaver, labyrint oppgaver til barn, labyrint printbar, rutef\u00f8lging, bilde-labyrint \u00f8velse, sti oppgaver f\u00f8rskole, labyrint\u00f8velser til barn, labyrint printbar barn, rute\u00f8velser, visuell rutef\u00f8lging',
    },
    hero: {
      title: 'Bildesti Generator',
      subtitle: 'Logisk Tenknings\u00f8velser med Bilderuter',
    },
  },
  {
    file: 'bildesortering-arbeidsark.ts',
    seo: {
      title: 'Bildesortering Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare bildesorteringsoppgaver der barnet klassifiserer bilder i kategorier. Utvikler klassifiseringsferdigheter. F\u00f8rskole til 2. klasse.',
      keywords: 'bildesortering generator, bildesortering oppgaver, sorterings\u00f8velser til barn, kategorisering oppgave, bilde klassifisering, sortering f\u00f8rskole, gruppering \u00f8velse, bilde kategorisering, klassifisering printbar, sorteringsferdigheter til barn, gruppering med bilder',
    },
    hero: {
      title: 'Bildesortering Generator',
      subtitle: 'Klassifiserings- og Sorterings\u00f8velser med Bilder',
    },
  },
  {
    file: 'preposisjoner-arbeidsark.ts',
    seo: {
      title: 'Preposisjons\u00f8velse Generator | LessonCraftStudio',
      description: 'Lag printbare preposisjons\u00f8velser med stedsord og bilder. Foran, bak, under, over \u2014 visuell spr\u00e5kl\u00e6ring for barn. Last ned gratis PDF med en gang.',
      keywords: 'preposisjons\u00f8velse generator, preposisjons\u00f8velser, stedsord til barn, preposisjoner f\u00f8rskole, stedsord \u00f8velse, foran bak oppgaver, stedsbegreper til barn, preposisjoner printbar, grammatikk \u00f8velser f\u00f8rskole, visuell spr\u00e5kl\u00e6ring, stedsbeskrivelse',
    },
    hero: {
      title: 'Preposisjons\u00f8velse Generator',
      subtitle: 'Stedsord L\u00e6ring med Bilder',
    },
  },
  {
    file: 'skyggematching-arbeidsark.ts',
    seo: {
      title: 'Gratis Skyggematching Generator | LessonCraftStudio',
      description: 'Lag printbare skyggeparringsoppgaver der barnet matcher bilde til korrekt skygge. Utvikler visuell oppfatning. 50 temaer. Last ned gratis PDF.',
      keywords: 'skyggematching generator, skyggematching oppgaver, skyggeparring, skygge oppgaver til barn, silhuettoppgaver printbar, skyggegjenkjenning, visuell parring skygge, skygge\u00f8velser f\u00f8rskole, silhuett \u00f8velse, bilde og skygge matching, skyggeoppgaver',
    },
    hero: {
      title: 'Skyggematching Generator',
      subtitle: 'Visuell Oppfatnings\u00f8velser med Skyggebilder',
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
