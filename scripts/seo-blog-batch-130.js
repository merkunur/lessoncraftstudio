#!/usr/bin/env node
/**
 * seo-blog-batch-130.js — Part 130: Finnish blog SEO metadata for posts 39-57
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the third batch of 19 Finnish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-130.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #39: Kognitiivinen kuormitusteoria
    slug: 'cognitive-load-theory-in-worksheet-design-why-44-picture-sudoku-works-for-age-4',
    metaTitle: 'Kognitiivinen Kuormitusteoria Teht\u00e4v\u00e4lehtien Suunnittelussa',
    metaDescription: 'Tutustu kognitiiviseen kuormitusteoriaan teht\u00e4v\u00e4lehtien suunnittelussa. Sopiva visuaalinen haastavuus parantaa oppimista \u2013 siksi 4\u00d74 kuvasudoku toimii.',
    focusKeyword: 'kognitiivinen kuormitusteoria',
  },
  {
    // #40: Kokeisiin valmistautuminen
    slug: 'test-preparation-standardized-assessment-low-stress-practice-strategies',
    metaTitle: 'Kokeisiin Valmistautuminen Ilman Stressi\u00e4: Strategioita',
    metaDescription: 'Valmistaudu kokeisiin ilman stressi\u00e4 alakoulussa. Matalan paineen harjoitusstrategiat rakentavat itseluottamusta ja vahvistavat osaamista ennen arviointeja.',
    focusKeyword: 'kokeisiin valmistautuminen alakoulu',
  },
  {
    // #41: Kolmiportainen tuki
    slug: 'intervention-strategies-response-to-intervention',
    metaTitle: 'Kolmiportainen Tuki: Kohdennettuja Teht\u00e4v\u00e4monistetukea',
    metaDescription: 'Hy\u00f6dynn\u00e4 kolmiportaista tukea kohdennetuilla teht\u00e4v\u00e4monisteilla. Eri tukitasoille r\u00e4\u00e4t\u00e4l\u00f6idyt harjoitukset auttavat jokaista oppilasta etenem\u00e4\u00e4n omalla tasolla.',
    focusKeyword: 'kolmiportainen tuki teht\u00e4v\u00e4monisteet',
  },
  {
    // #42: CPA-oppimispolku (title lengthened from ~41 to 52)
    slug: 'concrete-representational-abstract-progression-for-elementary-math',
    metaTitle: 'CPA-menetelm\u00e4 Alakoulun Matematiikassa: Oppimispolku',
    metaDescription: 'Sovella CPA-menetelm\u00e4\u00e4 alakoulun matematiikassa konkreettisesta abstraktiin. Oppimispolku auttaa oppilaita ymm\u00e4rt\u00e4m\u00e4\u00e4n matemaattisia k\u00e4sitteit\u00e4 k\u00e4yt\u00e4nn\u00f6ss\u00e4.',
    focusKeyword: 'CPA-menetelm\u00e4 matematiikka',
  },
  {
    // #43: Kotiopetuksen generaattorit (title shortened from ~66 to 58)
    slug: 'parent-homeschool-worksheet-generators-complete-curriculum-support',
    metaTitle: 'Kotiopetus: Teht\u00e4v\u00e4generaattorit Opetussuunnitelman Tueksi',
    metaDescription: 'Hy\u00f6dynn\u00e4 teht\u00e4v\u00e4generaattoreita kotiopetuksessa opetussuunnitelman tueksi. Luo monipuolisia harjoituksia kaikissa oppiaineissa \u2013 kattava tuki koko lukuvuodelle.',
    focusKeyword: 'kotiopetus teht\u00e4v\u00e4generaattorit',
  },
  {
    // #44: Kotiteht\u00e4v\u00e4t vai luokkaty\u00f6
    slug: 'homework-vs-classwork-finding-the-balanced-approach-with-worksheets',
    metaTitle: 'Kotiteht\u00e4v\u00e4t vai Luokkaty\u00f6: Tasapainoinen L\u00e4hestymistapa',
    metaDescription: 'Vertaile kotiteht\u00e4vi\u00e4 ja luokkaty\u00f6t\u00e4 \u2013 l\u00f6yd\u00e4 tasapainoinen l\u00e4hestymistapa. K\u00e4yt\u00e4nn\u00f6n vinkit teht\u00e4v\u00e4monisteiden tehokkaaseen k\u00e4ytt\u00f6\u00f6n sek\u00e4 koulussa ett\u00e4 kotona.',
    focusKeyword: 'kotiteht\u00e4v\u00e4t vai luokkaty\u00f6',
  },
  {
    // #45: Koulun ensimm\u00e4inen viikko (title lengthened from ~49 to 60)
    slug: 'first-week-of-school-getting-started-with-routines-expectations-using-worksheets',
    metaTitle: 'Koulun Ensimm\u00e4inen Viikko: Rutiinit ja Odotukset Ty\u00f6arkeilla',
    metaDescription: 'Aloita koulun ensimm\u00e4inen viikko sujuvasti rutiinien ja odotusten avulla. Teht\u00e4v\u00e4monisteet auttavat luomaan selke\u00e4t rakenteet ja positiivisen oppimisymp\u00e4rist\u00f6n.',
    focusKeyword: 'koulun aloitus teht\u00e4v\u00e4monisteet',
  },
  {
    // #46: Kriittinen ajattelu
    slug: 'critical-thinking-problem-solving-developing-higher-order-skills-with-worksheets',
    metaTitle: 'Kriittinen Ajattelu: Laaja-alaisten Taitojen Kehitt\u00e4minen',
    metaDescription: 'Kehit\u00e4 kriittist\u00e4 ajattelua ja ongelmanratkaisutaitoja teht\u00e4v\u00e4monisteilla. Laaja-alaiset harjoitukset haastavat oppilaita analysoimaan ja arvioimaan tietoa.',
    focusKeyword: 'kriittinen ajattelu teht\u00e4v\u00e4t',
  },
  {
    // #47: Kuvakryptogrammi (title shortened from ~64 to 54)
    slug: 'image-cryptogram-generator-patent-worthy-visual-substitution-cipher',
    metaTitle: 'Kuvakryptogrammi: Visuaalinen Salakirjoitus Esikouluun',
    metaDescription: 'Tutustu kuvakryptogrammiin \u2013 visuaaliseen salakirjoitukseen esikouluik\u00e4isille. Kuvapohjainen koodi kehitt\u00e4\u00e4 loogista ajattelua ja ongelmanratkaisua hauskasti.',
    focusKeyword: 'kuvakryptogrammi opas',
  },
  {
    // #48: Kuvapeli-sudoku
    slug: 'picture-sudoku-for-kids-ages-4-8-complete-teaching-guide',
    metaTitle: 'Kuvapeli-Sudoku Lapsille 4\u20138 v.: Kattava Opetusopas',
    metaDescription: 'Opeta kuvasudokua lapsille 4\u20138-vuotiaille kattavan oppaan avulla. Askel askeleelta -ohjeet kehitt\u00e4v\u00e4t loogista ajattelua ja ongelmanratkaisutaitoja hauskasti.',
    focusKeyword: 'kuvasudoku opas lapsille',
  },
  {
    // #49: Kuviojuna-teht\u00e4v\u00e4t
    slug: 'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition',
    metaTitle: 'Kuviojuna: Moniaistillinen Oppiminen ja Hahmottamistaito',
    metaDescription: 'Hy\u00f6dynn\u00e4 kuviojuna-teht\u00e4vi\u00e4 moniaistilliseen oppimiseen. Leikkaa ja liimaa -harjoitukset kehitt\u00e4v\u00e4t lasten hahmottamistaitoja ja kuvioiden tunnistamista.',
    focusKeyword: 'kuviojuna moniaistillinen oppiminen',
  },
  {
    // #50: L\u00e4hikehityksen vy\u00f6hyke
    slug: 'how-to-scaffold-worksheet-difficulty',
    metaTitle: 'L\u00e4hikehityksen Vy\u00f6hyke: Teht\u00e4vien Vaikeustason Eriytt\u00e4minen',
    metaDescription: 'Sovella l\u00e4hikehityksen vy\u00f6hykett\u00e4 teht\u00e4vien vaikeustason eriytt\u00e4miseen. Porrastetut harjoitukset ohjaavat oppilasta kohti itsen\u00e4ist\u00e4 osaamista tehokkaasti.',
    focusKeyword: 'l\u00e4hikehityksen vy\u00f6hyke eriytt\u00e4minen',
  },
  {
    // #51: Lahjakkaat oppilaat
    slug: 'gifted-education-8-challenge-extension-generators',
    metaTitle: 'Lahjakkaat Oppilaat: 8 Haastavaa Teht\u00e4v\u00e4generaattoria',
    metaDescription: 'Haasta lahjakkaat oppilaat kahdeksalla teht\u00e4v\u00e4generaattorilla. Tarjoa lis\u00e4haastetta ja laajennusteht\u00e4vi\u00e4 \u2013 pid\u00e4 nopeimmat oppijat motivoituneina ja innokkaina.',
    focusKeyword: 'lahjakkaat oppilaat generaattorit',
  },
  {
    // #52: Laskuahdistuksen v\u00e4hent\u00e4minen (title shortened from ~62 to 53)
    slug: 'math-anxiety-reduction-6-low-stakes-worksheet-generators',
    metaTitle: 'Laskuahdistus: 6 Matalan Paineen Teht\u00e4v\u00e4generaattoria',
    metaDescription: 'V\u00e4henn\u00e4 laskuahdistusta kuudella matalan paineen generaattorilla. Rento ja kannustava harjoittelu rakentaa itseluottamusta ja tekee matematiikasta mukavaa.',
    focusKeyword: 'laskuahdistus matalan paineen teht\u00e4v\u00e4t',
  },
  {
    // #53: Looginen ajattelu 2. luokalla
    slug: '2nd-grade-critical-thinking-crosswords-cryptograms-logic-puzzles',
    metaTitle: 'Looginen Ajattelu 2. Luokalla: Ristikoita ja Logiikkapelej\u00e4',
    metaDescription: 'Kehit\u00e4 loogista ajattelua 2. luokalla ristikoiden, kryptogrammien ja logiikkapelien avulla. Hauska ja haastava tapa vahvistaa p\u00e4\u00e4ttelytaitoja alakoulussa.',
    focusKeyword: 'looginen ajattelu 2. luokka',
  },
  {
    // #54: Lukemisen ymm\u00e4rt\u00e4minen
    slug: 'reading-comprehension-vocabulary-building-6-worksheet-strategies',
    metaTitle: 'Lukemisen Ymm\u00e4rt\u00e4minen: 6 Tehokasta Ty\u00f6kirjastrategiaa',
    metaDescription: 'Paranna lukemisen ymm\u00e4rt\u00e4mist\u00e4 ja sanastoa kuudella ty\u00f6kirjastrategialla. Monipuoliset harjoitukset syvent\u00e4v\u00e4t luetun ymm\u00e4rt\u00e4mist\u00e4 ja laajentavat sanavarastoa.',
    focusKeyword: 'lukemisen ymm\u00e4rt\u00e4minen ty\u00f6kirjat',
  },
  {
    // #55: Lukivaikeuden tukeminen
    slug: 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
    metaTitle: 'Lukivaikeuden Tukeminen: 7 Kuvapohjaista Generaattoria',
    metaDescription: 'Tue lukivaikeutta seitsem\u00e4ll\u00e4 kuvapohjaisella generaattorilla. Fonetiikkaa tukevat harjoitukset auttavat lukivaikeudesta k\u00e4rsivi\u00e4 lapsia edistym\u00e4\u00e4n lukemisessa.',
    focusKeyword: 'lukivaikeus kuvateht\u00e4v\u00e4t',
  },
  {
    // #56: Lukukauden p\u00e4\u00e4t\u00f6s (title shortened from ~62 to 55)
    slug: 'year-end-review-reflection-using-worksheets-to-celebrate-growth-learning',
    metaTitle: 'Lukukauden P\u00e4\u00e4t\u00f6s: Oppimisen Arviointi ja Juhlistaminen',
    metaDescription: 'P\u00e4\u00e4t\u00e4 lukukausi tyylill\u00e4 arvioinnin ja juhlistamisen avulla. Teht\u00e4v\u00e4monisteet auttavat oppilaita pohtimaan kasvuaan ja juhlimaan saavutuksia lukuvuoden lopussa.',
    focusKeyword: 'lukukauden p\u00e4\u00e4t\u00f6s arviointi',
  },
  {
    // #57: Luokanhallinta ty\u00f6arkeilla (title shortened from ~61 to 54)
    slug: 'classroom-management-using-worksheets-for-transitions-early-finishers-behavior-support',
    metaTitle: 'Luokanhallinta: Ty\u00f6arkit Siirtymiin ja K\u00e4ytt\u00e4ytymiseen',
    metaDescription: 'Tehosta luokanhallintaa teht\u00e4v\u00e4monisteiden avulla. Valmiit ty\u00f6arkit siirtymiin, nopeille tekij\u00f6ille ja k\u00e4ytt\u00e4ytymisen tukemiseen helpottavat opettajan arkea.',
    focusKeyword: 'luokanhallinta teht\u00e4v\u00e4monisteet',
  },
];

async function main() {
  console.log('Part 130: Updating Finnish SEO metadata for blog posts 39-57\n');

  // Validate lengths before applying
  let hasError = false;
  for (const u of updates) {
    const tLen = u.metaTitle.length;
    const dLen = u.metaDescription.length;
    const issues = [];
    if (tLen < 50 || tLen > 60) issues.push(`title ${tLen} chars (need 50-60)`);
    if (dLen < 150 || dLen > 160) issues.push(`desc ${dLen} chars (need 150-160)`);
    if (issues.length > 0) {
      console.log(`WARNING: ${u.slug}: ${issues.join(', ')}`);
      hasError = true;
    }
  }

  if (hasError) {
    console.log('\nFix length issues before proceeding. Aborting.');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log('All lengths validated OK\n');

  // Check for duplicate focusKeywords
  const kwSet = new Set();
  for (const u of updates) {
    if (kwSet.has(u.focusKeyword)) {
      console.log(`ERROR: Duplicate focusKeyword "${u.focusKeyword}"`);
      await prisma.$disconnect();
      process.exit(1);
    }
    kwSet.add(u.focusKeyword);
  }
  console.log('All focus keywords unique\n');

  let updated = 0;
  let skipped = 0;

  for (const u of updates) {
    const post = await prisma.blogPost.findUnique({ where: { slug: u.slug } });
    if (!post) {
      console.log(`SKIP: ${u.slug} not found`);
      skipped++;
      continue;
    }

    const translations = post.translations;
    if (!translations.fi) {
      console.log(`SKIP: ${u.slug} has no Finnish translation`);
      skipped++;
      continue;
    }

    translations.fi.metaTitle = u.metaTitle;
    translations.fi.metaDescription = u.metaDescription;
    translations.fi.focusKeyword = u.focusKeyword;

    await prisma.blogPost.update({
      where: { slug: u.slug },
      data: { translations },
    });

    console.log(`UPDATED: ${u.slug}`);
    console.log(`  title:   ${u.metaTitle} (${u.metaTitle.length} chars)`);
    console.log(`  desc:    ${u.metaDescription.substring(0, 70)}... (${u.metaDescription.length} chars)`);
    console.log(`  keyword: ${u.focusKeyword}`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
