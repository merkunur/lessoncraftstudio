/**
 * Part 241: Norwegian Product Pages SEO — Apps 8-14
 *
 * Updates SEO metadata for:
 * 8. bildlotto-arbeidsark.ts
 * 9. sudoku-arbeidsark.ts
 * 10. stor-og-liten-arbeidsark.ts
 * 11. bildediagram-arbeidsark.ts
 * 12. bildeaddisjon-arbeidsark.ts
 * 13. rutenetttegning-arbeidsark.ts
 * 14. finn-objektene-arbeidsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'no');

const updates = [
  {
    file: 'bildlotto-arbeidsark.ts',
    seo: {
      title: 'Gratis Bildebingo Generator | LessonCraftStudio',
      description: 'Lag printbare bildebingospill til barn. 50 temaer, tilpassbare rutenett og bilder fra 3\u00a0000+ bibliotek. Perfekt til klasserommet. Last ned gratis.',
      keywords: 'bildebingo generator, bingo printbar til barn, bildebingo spill, printbart bingospill, bingo f\u00f8rskole, klasse bingospill, bildebingo rutenett, bingo oppgave til barn, gruppespill printbar, bingo bilder barn, bingospill klasserom',
    },
    hero: {
      title: 'Bildebingo Generator',
      subtitle: 'Lag Printbare Bingospill med 50 Temaer',
    },
  },
  {
    file: 'sudoku-arbeidsark.ts',
    seo: {
      title: 'Barne-Sudoku Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare bilde-sudokuer til barn. Enkle og middels logikkspill fra f\u00f8rskole til 3. klasse. Bilder fra 3\u00a0000+ bibliotek. Gratis PDF.',
      keywords: 'barne-sudoku generator, bilde-sudoku til barn, sudoku printbar, barns logikkspill, enkel sudoku til barn, bilde-sudoku printbar, sudoku f\u00f8rskole, logikk\u00f8velser til barn, sudoku rutenett til barn, tenkningsferdigheter trening, sudoku sm\u00e5skolen',
    },
    hero: {
      title: 'Barne-Sudoku Generator',
      subtitle: 'Printbare Bilde-Sudokuer fra F\u00f8rskole til 3. Klasse',
    },
  },
  {
    file: 'stor-og-liten-arbeidsark.ts',
    seo: {
      title: 'St\u00f8rrelsessammenligning Generator | LessonCraftStudio',
      description: 'Lag printbare stor og liten sammenligningsoppgaver med bilder. Utvikl st\u00f8rrelsesbegreper fra f\u00f8rskole til 1. klasse. Tilpass innstillinger. Gratis PDF.',
      keywords: 'st\u00f8rrelsessammenligning generator, stor og liten oppgaver, st\u00f8rrelsessammenligning f\u00f8rskole, st\u00f8rrelser gjenkjenning, st\u00f8rre og mindre, st\u00f8rrelsessammenligning til barn, stor liten printbar, st\u00f8rrelsesforsker oppgaver, st\u00f8rrelses\u00f8velser f\u00f8rskole, sammenligningsferdigheter \u00f8velse, st\u00f8rrelser sortering',
    },
    hero: {
      title: 'Stor og Liten Generator',
      subtitle: 'St\u00f8rrelsessammenlignings\u00f8velser med Bilder fra F\u00f8rskole til 1. Klasse',
    },
  },
  {
    file: 'bildediagram-arbeidsark.ts',
    seo: {
      title: 'Gratis Bildediagram Generator | LessonCraftStudio',
      description: 'Lag printbare bildediagram-oppgaver til telling og datavisualisering. Tell og fargelegg diagrammer fra f\u00f8rskole til 3. klasse. Gratis PDF.',
      keywords: 'bildediagram generator, bildediagram oppgaver, tell og fargelegg, datavisualisering til barn, s\u00f8ylediagram f\u00f8rskole, bildediagram printbar, telling og fargelegging, statistikkoppgaver til barn, diagram printbar, statistikk f\u00f8rskole, bildediagram \u00f8velse',
    },
    hero: {
      title: 'Bildediagram \u2014 Tell og Fargelegg Generator',
      subtitle: 'Datavisualisering og Telle\u00f8velser til Barn',
    },
  },
  {
    file: 'bildeaddisjon-arbeidsark.ts',
    seo: {
      title: 'Bildeaddisjon Generator | LessonCraftStudio',
      description: 'Lag printbare bildeaddisjon-oppgaver der bilder erstatter tall. Utvikler algebraisk tenkning fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.',
      keywords: 'bildeaddisjon generator, bildeaddisjon oppgaver, symbolsk algebra til barn, bildebasert matematikk, kodeoppgaver printbar, algebraisk tenkning f\u00f8rskole, bilde erstatter tall, hemmelig melding plussoppgaver, bildesymbol regneoppgave, matematisk koding, visuell algebra',
    },
    hero: {
      title: 'Bildeaddisjon Generator',
      subtitle: 'Algebraisk Tenkning gjennom Bildekodede Regneoppgaver',
    },
  },
  {
    file: 'rutenetttegning-arbeidsark.ts',
    seo: {
      title: 'Gratis Rutenetttegning Generator | LessonCraftStudio',
      description: 'Lag printbare rutenetttegningsoppgaver. Tegn m\u00f8nstre i ruter etter modell og fargelegg. Utvikler visuell oppfatning. F\u00f8rskole til 3. klasse. Gratis.',
      keywords: 'rutenetttegning generator, rutenetttegning oppgaver, pikseltegning til barn, rutetegning, rutepapir tegning, visuell oppfatning \u00f8velse, rutetegning printbar, modellkopiering til rute, tegning i ruter, kodet tegning, ruteoppgaver til barn',
    },
    hero: {
      title: 'Rutenetttegning Generator',
      subtitle: 'Tegn og Fargelegg M\u00f8nstre i Rutem\u00f8nster etter Modell',
    },
  },
  {
    file: 'finn-objektene-arbeidsark.ts',
    seo: {
      title: 'Finn Objektene Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare s\u00f8keoppgaver til barn. Finn gjemte objekter i bilder og utvikl visuell oppmerksomhet. 50 temaer fra f\u00f8rskole til 3. klasse.',
      keywords: 'finn objektene generator, finn objektene oppgaver, puslespill bilde printbar, visuelt s\u00f8k til barn, finn gjemte objekter, oppmerksomhet \u00f8velse, visuell oppfatning f\u00f8rskole, finn og oppdag oppgave, bildepuslespill\u00f8velser, s\u00f8kespill printbar, visuell oppmerksomhet',
    },
    hero: {
      title: 'Finn Objektene Generator',
      subtitle: 'Visuell Oppmerksomhets\u00f8velser med 50 Temaer',
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
