#!/usr/bin/env node
/**
 * seo-blog-batch-129.js — Part 129: Finnish blog SEO metadata for posts 20-38
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the second batch of 19 Finnish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-129.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #20: Eriytt\u00e4minen: muokattavat generaattorit
    slug: 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
    metaTitle: 'Eriytt\u00e4minen K\u00e4yt\u00e4nn\u00f6ss\u00e4: Muokattavat Generaattorit',
    metaDescription: 'Hy\u00f6dynn\u00e4 muokattavia generaattoreita eriytt\u00e4miseen. Luo eritasoisia teht\u00e4vi\u00e4 samasta aiheesta hetkess\u00e4 \u2013 oppilaat saavat juuri oikean haasteen taitotasolleen.',
    focusKeyword: 'eriytt\u00e4minen generaattoreilla',
  },
  {
    // #21: Esiopetuksen hienomotoriset harjoitukset
    slug: 'pre-k-fine-motor-activities-drawing-lines-pattern-train-cutting-practice',
    metaTitle: 'Esiopetuksen Hienomotoriikka: Viivat, Kuviojuna ja Leikkaus',
    metaDescription: 'Kehit\u00e4 esiopetuksen hienomotoriikkaa viivanpiirto- ja kuviojunaharjoituksilla. Tutkimuspohjaiset menetelm\u00e4t tukevat lasten kouluvalmiutta ja kirjoittamista.',
    focusKeyword: 'hienomotoriikka esiopetus',
  },
  {
    // #22: Esiopetuksen matematiikan perusteet
    slug: 'kindergarten-math-fundamentals-addition-subtraction-patterns-sudoku',
    metaTitle: 'Esiopetuksen Matematiikka: Yhteenlasku, Kuviot ja Sudoku',
    metaDescription: 'Rakenna esiopetuksen matematiikan perusteet yhteenlaskun, kuvioiden ja sudokun avulla. Generaattorit luovat ik\u00e4tasoisia harjoituksia, jotka innostavat oppimaan.',
    focusKeyword: 'esiopetuksen matematiikka',
  },
  {
    // #23: Etsi ja l\u00f6yd\u00e4 -teht\u00e4v\u00e4t
    slug: 'i-spy-worksheets-with-professional-layouts-in-3-minutes',
    metaTitle: 'Etsi ja L\u00f6yd\u00e4 -teht\u00e4v\u00e4t: Ammattilaatuiset 3 Minuutissa',
    metaDescription: 'Luo ammattilaatuiset etsi ja l\u00f6yd\u00e4 -teht\u00e4v\u00e4t kolmessa minuutissa. Visuaaliset hakuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lasten tarkkaavaisuutta ja hahmottamiskyky\u00e4 tehokkaasti.',
    focusKeyword: 'etsi ja l\u00f6yd\u00e4 teht\u00e4v\u00e4t',
  },
  {
    // #24: Fisher\u2013Yates-sekoitusalgoritmi
    slug: 'fisher-yates-shuffle-algorithm-the-science-of-perfect-word-scrambles',
    metaTitle: 'Fisher\u2013Yates-sekoitus: Satunnaisuus Sanansekoitusteht\u00e4viss\u00e4',
    metaDescription: 'Tutustu Fisher-Yates-sekoitusalgoritmiin, joka takaa tasaisen satunnaisuuden sanansekoitusteht\u00e4viss\u00e4. Matemaattisesti todistettu menetelm\u00e4 parantaa laatua.',
    focusKeyword: 'Fisher-Yates sekoitusalgoritmi',
  },
  {
    // #25: Formatiivinen arviointi (title shortened from ~71)
    slug: 'formative-assessment-progress-monitoring-using-worksheets-for-data-driven-instruction',
    metaTitle: 'Formatiivinen Arviointi: Teht\u00e4v\u00e4monisteet Opetuksessa',
    metaDescription: 'K\u00e4yt\u00e4 teht\u00e4v\u00e4monisteita formatiivisen arvioinnin v\u00e4lineen\u00e4. Ker\u00e4\u00e4 oppimisdataa systemaattisesti ja r\u00e4\u00e4t\u00e4l\u00f6i opetusta tulosten perusteella tehokkaasti.',
    focusKeyword: 'formatiivinen arviointi',
  },
  {
    // #26: Hajautusalgoritmi oppimateriaalien sijoittelussa
    slug: 'anti-adjacent-scattering-why-randomness-improves-educational-worksheet-quality',
    metaTitle: 'Hajautusalgoritmi: Satunnainen Sijoittelu Parantaa Laatua',
    metaDescription: 'Tutustu hajautusalgoritmiin, joka parantaa oppimateriaalien laatua. Satunnainen sijoittelu est\u00e4\u00e4 vierekk\u00e4isi\u00e4 vastauksia ja tekee teht\u00e4vist\u00e4 ammattimaisia.',
    focusKeyword: 'hajautusalgoritmi oppimateriaalit',
  },
  {
    // #27: Hienomotoriikan kehitys Benbown mukaan
    slug: 'fine-motor-development-through-educational-worksheets-benbows-six-pre-writing-strokes',
    metaTitle: 'Hienomotoriikan Kehitys: Benbown 6 Esikirjoitusliikerataa',
    metaDescription: 'Opi hienomotoriikan kehityksest\u00e4 Benbown kuuden esikirjoitusliikeradan avulla. Tutkimuspohjaiset harjoitukset vahvistavat lasten kyn\u00e4otetta ja kirjoitustaitoja.',
    focusKeyword: 'hienomotoriikka Benbow',
  },
  {
    // #28: Yhteisopetus ja tukiopetus (title shortened from ~62)
    slug: 'co-teaching-resource-room-collaborative-worksheet-planning-strategies',
    metaTitle: 'Yhteisopetus: Teht\u00e4v\u00e4suunnittelu Kahdelle Opettajalle',
    metaDescription: 'Tehosta yhteisopetusta suunnittelemalla teht\u00e4v\u00e4monisteet yhdess\u00e4. K\u00e4yt\u00e4nn\u00f6n strategiat kahden opettajan yhteisty\u00f6h\u00f6n \u2013 roolit ja tehokas materiaalien jako.',
    focusKeyword: 'yhteisopetus teht\u00e4v\u00e4suunnittelu',
  },
  {
    // #29: Hybridiopetus ja teknologia (title shortened from ~69)
    slug: 'blended-learning-technology-integration-combining-digital-and-print-worksheets',
    metaTitle: 'Hybridiopetus: Digitaalisten ja Tulostettujen Yhdist\u00e4minen',
    metaDescription: 'Yhdist\u00e4 digitaaliset ja tulostetut teht\u00e4v\u00e4t hybridiopetuksessa. K\u00e4yt\u00e4nn\u00f6n vinkkej\u00e4 teknologian integrointiin alakoulussa \u2013 parasta molemmista oppimismuodoista.',
    focusKeyword: 'hybridiopetus teht\u00e4v\u00e4t',
  },
  {
    // #30: Itsen\u00e4inen ty\u00f6skentely alakoulussa
    slug: 'independent-work-time-teaching-self-directed-learning-with-worksheets',
    metaTitle: 'Itsen\u00e4inen Ty\u00f6skentely: Itseohjautuvuuden Kehitt\u00e4minen',
    metaDescription: 'Opeta itsen\u00e4ist\u00e4 ty\u00f6skentely\u00e4 alakoulussa teht\u00e4v\u00e4monisteiden avulla. Selke\u00e4t ohjeet ja porrastetut teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t oppilaiden itseohjautuvuutta tehokkaasti.',
    focusKeyword: 'itsen\u00e4inen ty\u00f6skentely alakoulu',
  },
  {
    // #31: Kaksi harjoitusmuotoa: prepositiot
    slug: 'dual-mode-preposition-worksheets-fill-in-the-blank-multiple-choice-in-one-tool',
    metaTitle: 'Prepositiot: T\u00e4ydennett\u00e4v\u00e4t ja Monivalintaharjoitukset',
    metaDescription: 'Harjoittele prepositioita kahdella tavalla: t\u00e4ydennys- ja monivalintateht\u00e4vill\u00e4. Kaksi harjoitusmuotoa yhdess\u00e4 ty\u00f6kalussa tekee kielenopetuksesta monipuolista.',
    focusKeyword: 'prepositioharjoitukset',
  },
  {
    // #32: Kasvuajattelutapa teht\u00e4vill\u00e4 (title shortened from ~62)
    slug: 'growth-mindset-development-using-challenge-worksheets-to-build-persistence',
    metaTitle: 'Kasvuajattelutapa: Sinnikkyyden Rakentaminen Teht\u00e4vill\u00e4',
    metaDescription: 'Rakenna kasvuajattelutapaa haasteteht\u00e4vill\u00e4, jotka kehitt\u00e4v\u00e4t sinnikkytt\u00e4. Oppilaat oppivat n\u00e4kem\u00e4\u00e4n virheet oppimismahdollisuuksina ja yritt\u00e4m\u00e4\u00e4n uudelleen.',
    focusKeyword: 'kasvuajattelutapa haasteteht\u00e4v\u00e4t',
  },
  {
    // #33: Kattava vuosisuunnitelma opettajalle
    slug: 'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
    metaTitle: 'Opettajan Vuosisuunnitelma: Teht\u00e4v\u00e4monisteiden Hallinta',
    metaDescription: 'Laadi opettajan vuosisuunnitelma teht\u00e4v\u00e4monisteiden hallintaan. Kuukausikohtaiset teemat ja strategiat takaavat monipuolisen materiaalitarjonnan lukuvuodelle.',
    focusKeyword: 'opettajan vuosisuunnitelma',
  },
  {
    // #34: Kaupallinen lisenssi: passiivituloja
    slug: 'commercial-license-selling-worksheets-on-tpt-etsy-and-teacher-marketplaces',
    metaTitle: 'Kaupallinen Lisenssi: Myy Teht\u00e4vi\u00e4 ja Luo Passiivituloja',
    metaDescription: 'Myy teht\u00e4vi\u00e4 opettajana ja luo passiivituloja kaupallisella lisenssill\u00e4. K\u00e4yt\u00e4nn\u00f6n opas TPT- ja Etsy-markkinapaikoille \u2013 aloita oma oppimateriaalien myynti.',
    focusKeyword: 'teht\u00e4vien myynti opettajana',
  },
  {
    // #35: Kausiluonteiset aktiviteetit
    slug: 'seasonal-activities-year-round-engagement-with-themed-worksheets',
    metaTitle: 'Kausiluonteiset Aktiviteetit: Oppimisen Into L\u00e4pi Vuoden',
    metaDescription: 'Hy\u00f6dynn\u00e4 kausiluonteiset teht\u00e4v\u00e4t oppimisen innostajina l\u00e4pi vuoden. Teemateht\u00e4v\u00e4t syksyst\u00e4 kes\u00e4\u00e4n pit\u00e4v\u00e4t oppilaat motivoituneina ja sitoutuneina opiskeluun.',
    focusKeyword: 'kausiluonteiset teht\u00e4v\u00e4t',
  },
  {
    // #36: Kes\u00e4n oppimiskato (title shortened from ~61)
    slug: 'summer-learning-preventing-summer-slide-with-take-home-worksheet-packets',
    metaTitle: 'Kes\u00e4n Oppimiskato: Taitojen Yll\u00e4pito Kotiharjoituksilla',
    metaDescription: 'Ehk\u00e4ise kes\u00e4n oppimiskato kotiharjoituspaketeilla. Monipuoliset harjoitukset yll\u00e4pit\u00e4v\u00e4t lukuvuoden aikana opittuja taitoja ja valmistavat seuraavaan luokkaan.',
    focusKeyword: 'kes\u00e4n oppimiskato harjoitukset',
  },
  {
    // #37: Kinesteettinen oppiminen (title shortened from ~63)
    slug: 'kinesthetic-learning-6-movement-integrated-worksheet-generators',
    metaTitle: 'Kinesteettinen Oppiminen: Liikett\u00e4 Sis\u00e4lt\u00e4v\u00e4t Generaattorit',
    metaDescription: 'Yhdist\u00e4 kinesteettinen oppiminen ja generaattorit liikuntaa sis\u00e4lt\u00e4viin teht\u00e4viin. Kuusi liikepohjaista harjoitustyyppi\u00e4 aktivoi oppilaat ja syvent\u00e4\u00e4 oppimista.',
    focusKeyword: 'kinesteettinen oppiminen generaattorit',
  },
  {
    // #38: Kirjoittaminen oppiaineiden v\u00e4lill\u00e4 (title shortened from ~70)
    slug: 'writing-across-curriculum-integrating-writing-practice-into-every-subject',
    metaTitle: 'Kirjoittaminen Oppiaineiden V\u00e4lill\u00e4: K\u00e4yt\u00e4nn\u00f6n Vinkkej\u00e4',
    metaDescription: 'Integroi kirjoittaminen oppiaineiden v\u00e4lill\u00e4 jokaiseen oppituntiin. K\u00e4yt\u00e4nn\u00f6n strategiat ja teht\u00e4v\u00e4pohjat tekev\u00e4t kirjoitusharjoittelusta osan kaikkia aineita.',
    focusKeyword: 'kirjoittaminen oppiaineiden v\u00e4lill\u00e4',
  },
];

async function main() {
  console.log('Part 129: Updating Finnish SEO metadata for blog posts 20-38\n');

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
