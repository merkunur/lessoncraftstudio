/**
 * Part 242: Norwegian Product Pages SEO — Apps 15-21
 *
 * Updates SEO metadata for:
 * 15. tegning-av-linjer-arbeidsark.ts
 * 16. rutenett-tilpasning-arbeidsark.ts
 * 17. bildekryssord-arbeidsark.ts
 * 18. kryptogram-arbeidsark.ts
 * 19. matematikkgater-arbeidsark.ts
 * 20. manglende-biter-arbeidsark.ts
 * 21. sammenligningsoppgaver-arbeidsark.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'no');

const updates = [
  {
    file: 'tegning-av-linjer-arbeidsark.ts',
    seo: {
      title: 'Linjetegning Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare linjetegningsoppgaver til finmotorikk-utvikling. Rette linjer, buer og b\u00f8lger fra f\u00f8rskole til 1. klasse. Last ned gratis PDF.',
      keywords: 'linjetegning generator, linjetegning oppgaver, finmotorikk \u00f8velser, linjef\u00f8lging oppgave, blyantgrep \u00f8velser, tegning trening f\u00f8rskole, finmotorikk f\u00f8rskole, skriveforberedelse \u00f8velse, blyantgrep trening, linjer og former \u00f8velse, tegnetrening til barn',
    },
    hero: {
      title: 'Linjetegning Generator',
      subtitle: 'Finmotorikk \u00d8velser fra F\u00f8rskole til 1. Klasse',
    },
  },
  {
    file: 'rutenett-tilpasning-arbeidsark.ts',
    seo: {
      title: 'Gratis Rutenett-Puslespill Generator | LessonCraftStudio',
      description: 'Lag printbare rutenett-puslespill til visuell oppfatning og romlig forst\u00e5else. 50 temaer fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.',
      keywords: 'rutenett-puslespill generator, rutenett-puslespill oppgaver, visuelt puslespill til barn, romlig forst\u00e5else, m\u00f8nster matching, ruteoppgaver printbar, oppfatning \u00f8velse, visuell logikk til barn, matchings\u00f8velser f\u00f8rskole, rutenett puslespill, romlig oppfatning',
    },
    hero: {
      title: 'Rutenett-Puslespill Generator',
      subtitle: 'Visuell Oppfatning og Romlig Forst\u00e5elses\u00f8velser',
    },
  },
  {
    file: 'bildekryssord-arbeidsark.ts',
    seo: {
      title: 'Gratis Bildekryssord Generator | LessonCraftStudio',
      description: 'Lag printbare bildekryssord der bilder er ledetr\u00e5der. Utvikler ordforr\u00e5d og staving fra f\u00f8rskole til 3. klasse. Last ned gratis PDF med en gang.',
      keywords: 'bildekryssord generator, bildekryssord oppgaver, kryssord til barn printbar, bildebaserte kryssord, kryssord f\u00f8rskole, ordforr\u00e5d kryssord, bilde-kryssord printbar, staving kryssord, kryssord med bilder, barns kryssord, kryssord oppgave f\u00f8rskole',
    },
    hero: {
      title: 'Bildekryssord Generator',
      subtitle: 'Ordforr\u00e5d og Staving med Bildeledetr\u00e5der',
    },
  },
  {
    file: 'kryptogram-arbeidsark.ts',
    seo: {
      title: 'Bildekryptogram Generator | LessonCraftStudio',
      description: 'Lag printbare bildekryptogrammer der bokstaver erstattes av bilder. Utvikler avkodingsferdigheter og leseberedskap. F\u00f8rskole til 3. klasse.',
      keywords: 'bildekryptogram generator, bildekryptogram oppgaver, hemmelig skrift til barn, avkodingsoppgave, hemmelig spr\u00e5k l\u00f8sning, bildekoding \u00f8velse, hemmeligord oppgave, kryptogram printbar, symbol avkoding, hemmelig melding \u00f8velse, leseberedskaps\u00f8velse',
    },
    hero: {
      title: 'Bildekryptogram Generator',
      subtitle: 'Hemmelig Skrift-oppgaver med Bilder \u2014 Avkod og L\u00e6r \u00e5 Lese',
    },
  },
  {
    file: 'matematikkgater-arbeidsark.ts',
    seo: {
      title: 'Matematikk Puslespill Generator | LessonCraftStudio',
      description: 'Lag printbare matematikk-puslespill til addisjon og subtraksjon. Probleml\u00f8sningsferdigheter fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.',
      keywords: 'matematikk puslespill generator, matematikk puslespill til barn, matematisk probleml\u00f8sning, mattepuslespill printbar, regnepuslespill f\u00f8rskole, matematisk tenkning, logikkpuslespill matematikk, matematikk g\u00e5teoppgaver, regnepuslespill fasit, probleml\u00f8sning matematikk, mattepuslespill sm\u00e5skolen',
    },
    hero: {
      title: 'Matematikk Puslespill Generator',
      subtitle: 'Utvikl Probleml\u00f8sningsferdigheter med Matematiske Puslespill',
    },
  },
  {
    file: 'manglende-biter-arbeidsark.ts',
    seo: {
      title: 'Manglende Biter Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Lag printbare manglende biter-oppgaver til visuell oppfatning. Finn den manglende delen i m\u00f8nsteret. F\u00f8rskole til 2. klasse. Gratis PDF.',
      keywords: 'manglende biter generator, manglende biter oppgaver, puslespill oppgave til barn, manglende del \u00f8velse, visuell slutning, bildepuslespill printbar, m\u00f8nstergjenkjenning \u00f8velse, manglende bilde oppgave, visuell logisk tenkning, puslespill\u00f8velser f\u00f8rskole, oppfatningsferdigheter til barn',
    },
    hero: {
      title: 'Manglende Biter Generator',
      subtitle: 'Visuell Oppfatnings\u00f8velser med Bildepuslespill',
    },
  },
  {
    file: 'sammenligningsoppgaver-arbeidsark.ts',
    seo: {
      title: 'Flere eller F\u00e6rre Generator | LessonCraftStudio',
      description: 'Lag printbare flere og f\u00e6rre sammenligningsoppgaver med bilder. Utvikler mengdesammenligning og matematisk tenkning. F\u00f8rskole til 2. klasse.',
      keywords: 'flere eller f\u00e6rre generator, flere eller f\u00e6rre oppgaver, mengde sammenligning, st\u00f8rre mindre \u00f8velse, sammenligningsoppgaver f\u00f8rskole, mengder sammenligning med bilder, tallsammenligning til barn, flere eller f\u00e6rre, matematisk sammenligning, mengdevurdering, sammenligningsferdigheter f\u00f8rskole',
    },
    hero: {
      title: 'Flere eller F\u00e6rre Generator',
      subtitle: 'Mengdesammenligning med Bilder fra F\u00f8rskole til 2. Klasse',
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
