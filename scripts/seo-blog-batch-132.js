#!/usr/bin/env node
/**
 * seo-blog-batch-132.js — Part 132: Finnish blog SEO metadata for posts 77-95
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the fifth batch of 19 Finnish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-132.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #77: Oppilaan tavoitteiden asettaminen
    slug: 'student-goal-setting-self-monitoring-building-self-directed-learners',
    metaTitle: 'Oppilaan Tavoitteet ja Itsearviointi: Itseohjautuva Oppija',
    metaDescription: 'Itseohjautuva oppija syntyy tavoitteiden asettamisella ja itsearvioinnilla. K\u00e4yt\u00e4nn\u00f6n strategiat auttavat oppilaita seuraamaan edistymist\u00e4\u00e4n tehokkaasti.',
    focusKeyword: 'oppilaan tavoitteet itsearviointi',
  },
  {
    // #78: Oppilaiden motivointi ja palkitseminen (title shortened from ~61 to \u226460)
    slug: 'classroom-celebrations-motivational-systems-rewarding-progress-with-worksheets',
    metaTitle: 'Oppilaiden Motivointi: Edistymisen Juhliminen Luokassa',
    metaDescription: 'Motivoi oppilaita juhlimalla edistymist\u00e4 luokkahuoneessa. Palkitsemisj\u00e4rjestelm\u00e4t ja teht\u00e4v\u00e4pohjaiset kannustimet tekev\u00e4t oppimisesta innostavaa ja palkitsevaa.',
    focusKeyword: 'oppilaiden motivointi teht\u00e4v\u00e4t',
  },
  {
    // #79: Oppimateriaalialustat vertailu (title shortened from ~62 to \u226460)
    slug: 'affordable-vs-expensive-worksheet-platforms',
    metaTitle: 'Oppimateriaalialustat: Edullinen vai Kallis \u2014 Vertailu',
    metaDescription: 'Vertaa oppimateriaalialustoja hinnan ja ominaisuuksien perusteella. Kattava analyysi auttaa valitsemaan parhaan alustan teht\u00e4v\u00e4monisteiden luomiseen ja jakoon.',
    focusKeyword: 'oppimateriaalialusta vertailu',
  },
  {
    // #80: Oppimispisteet ja kiertotyöskentely (title shortened from ~64 to \u226460)
    slug: 'learning-centers-station-rotation-efficient-independent-work-management',
    metaTitle: 'Oppimispisteet: Kiertotyöskentelyn Tehokas Hallinta',
    metaDescription: 'Oppimispisteet ja kiertotyöskentely tehostavat itsenäistä oppimista luokassa. Käytännön ohjeet pistetyöskentelyn suunnitteluun ja sujuvaan toteuttamiseen.',
    focusKeyword: 'oppimispisteet kiertotyöskentely',
  },
  {
    // #81: Oppimistulosten analysointi
    slug: 'data-analysis-for-instructional-decisions-using-worksheet-results-to-drive-teaching',
    metaTitle: 'Oppimistulosten Analysointi Opetuksen Kehitt\u00e4misess\u00e4',
    metaDescription: 'Analysoi oppimistuloksia ja kehit\u00e4 opetusta tietopohjaisesti. Teht\u00e4v\u00e4monisteiden tulokset ohjaavat pedagogisia p\u00e4\u00e4t\u00f6ksi\u00e4 ja auttavat kohdentamaan tuen oikein.',
    focusKeyword: 'oppimistulosten analysointi opetus',
  },
  {
    // #82: Räätälöity oppimateriaali 3 minuutissa
    slug: 'how-to-create-custom-worksheets-in-3-minutes-complete-tutorial',
    metaTitle: 'R\u00e4\u00e4t\u00e4l\u00f6ity Oppimateriaali 3 Minuutissa: T\u00e4ydellinen Opas',
    metaDescription: 'Luo r\u00e4\u00e4t\u00e4l\u00f6ity oppimateriaali vain kolmessa minuutissa t\u00e4ll\u00e4 kattavalla oppaalla. Vaiheittaiset ohjeet teht\u00e4v\u00e4monisteiden luomiseen ja muokkaamiseen helposti.',
    focusKeyword: 'r\u00e4\u00e4t\u00e4l\u00f6ity oppimateriaali opas',
  },
  {
    // #83: Ruudukkopiirustus: da Vinci
    slug: 'grid-drawing-with-smart-cell-detection-leonardo-da-vincis-technique-for-kids',
    metaTitle: 'Ruudukkopiirustus: Da Vincin 500 Vuotta Vanha Tekniikka',
    metaDescription: 'Ruudukkopiirustus perustuu Leonardo da Vincin 500 vuotta vanhaan tekniikkaan. \u00c4lyk\u00e4s solutunnistus auttaa lapsia oppimaan piirt\u00e4mist\u00e4 ruudukon avulla.',
    focusKeyword: 'ruudukkopiirustus da Vinci',
  },
  {
    // #84: S2-opetus visuaaliset strategiat
    slug: 'english-language-learners-ellesl-visual-worksheet-strategies-for-language-acquisition',
    metaTitle: 'S2-opetus: Visuaaliset Strategiat Kielenoppimisen Tukena',
    metaDescription: 'S2-opetuksen visuaaliset strategiat tukevat kielenoppimista tehokkaasti. Kuvapohjaiset teht\u00e4v\u00e4monisteet auttavat monikielisi\u00e4 oppilaita omaksumaan uutta kielt\u00e4.',
    focusKeyword: 'S2-opetus visuaaliset ty\u00f6kalut',
  },
  {
    // #85: 100 koulupäivän juhla
    slug: 'celebrating-100-days-of-school-milestone-activities-themed-worksheets',
    metaTitle: 'Sadan Koulup\u00e4iv\u00e4n Juhla: Aktiviteetteja ja Teemateht\u00e4vi\u00e4',
    metaDescription: 'Juhli sataa koulup\u00e4iv\u00e4\u00e4 monipuolisilla aktiviteeteilla ja teemateht\u00e4vill\u00e4. Valmiit teht\u00e4v\u00e4monisteet tekev\u00e4t merkkip\u00e4iv\u00e4st\u00e4 ikimuistoisen oppimiskokemuksen.',
    focusKeyword: '100 koulup\u00e4iv\u00e4n juhla',
  },
  {
    // #86: Salaviesti-yhteenlasku (title shortened from ~62 to \u226460)
    slug: 'cipher-based-addition-combining-cryptography-with-elementary-math',
    metaTitle: 'Salaviesti-Yhteenlasku: Kun Matikka Muuttuu Arvoitukseksi',
    metaDescription: 'Salaviesti-yhteenlasku yhdist\u00e4\u00e4 kryptografian ja alakoulun matematiikan. Salakooditeht\u00e4v\u00e4t tekev\u00e4t yhteenlaskusta j\u00e4nnitt\u00e4v\u00e4n seikkailun ja motivoivat lapsia.',
    focusKeyword: 'salaviesti yhteenlasku',
  },
  {
    // #87: Sanahaku-generaattori 90 sekunnissa
    slug: 'word-search-generator-create-custom-puzzles-with-answer-keys',
    metaTitle: 'Sanahaku-Generaattori: Muokattavat Teht\u00e4v\u00e4t 90 Sekunnissa',
    metaDescription: 'Luo muokattavia sanahakuteht\u00e4vi\u00e4 90 sekunnissa generaattorilla. R\u00e4\u00e4t\u00e4l\u00f6i sanaruudukot luokkasi tarpeisiin ja tulosta vastausavaimet yhdell\u00e4 napsautuksella.',
    focusKeyword: 'sanahaku generaattori opas',
  },
  {
    // #88: Sanansekoitus mukautuvalla vaikeustasolla
    slug: 'word-scramble-with-fractional-clue-algorithm-adaptive-difficulty-based-on-word-length',
    metaTitle: 'Sanansekoitus: \u00c4lykk\u00e4\u00e4t Vihjeet Sanan Pituuden Mukaan',
    metaDescription: 'Sanansekoitusteht\u00e4vien mukautuva vaikeustaso perustuu sanan pituuteen. \u00c4lyk\u00e4s algoritmi luo sopivan haastavia vihje- ja kirjainsotkulateht\u00e4vi\u00e4 oppilaille.',
    focusKeyword: 'sanansekoitus mukautuva vaikeustaso',
  },
  {
    // #89: Siirtymätilanteet ja rutiinit (title shortened from ~62 to \u226460)
    slug: 'transition-times-procedures-maintaining-flow-with-worksheet-based-routines',
    metaTitle: 'Siirtym\u00e4tilanteet: Rutiinit ja Sujuva Luokkatyöskentely',
    metaDescription: 'Hallitse siirtym\u00e4tilanteet luokkahuoneessa sujuvilla rutiineilla ja teht\u00e4v\u00e4monisteilla. K\u00e4yt\u00e4nn\u00f6n vinkit yll\u00e4pit\u00e4v\u00e4t oppimisen virtausta koko koulup\u00e4iv\u00e4n ajan.',
    focusKeyword: 'siirtym\u00e4tilanteet luokkahuone',
  },
  {
    // #90: Sijaisopettajan hätäsuunnitelmat
    slug: 'substitute-teacher-emergency-plans-ready-made-worksheet-lesson-plans',
    metaTitle: 'Sijaisopettajan H\u00e4t\u00e4suunnitelmat: Valmiit Teht\u00e4v\u00e4monisteet',
    metaDescription: 'Valmistaudu sijaisopettajan tarpeisiin h\u00e4t\u00e4suunnitelmilla ja valmiilla teht\u00e4v\u00e4monisteilla. Laadukkaat materiaalit varmistavat sujuvan opetuksen sijaisen aikana.',
    focusKeyword: 'sijaisopettajan suunnitelmat',
  },
  {
    // #91: Sosiaaliset ja tunnetaidot (SEL)
    slug: 'social-emotional-learning-sel-integrating-sel-with-academic-worksheets',
    metaTitle: 'Sosiaaliset ja Tunnetaidot: SEL-oppimisen Integrointi',
    metaDescription: 'Integroi sosiaaliset ja tunnetaidot (SEL) akateemisiin teht\u00e4v\u00e4monisteisiin. Tunnetaitoharjoitukset kehitt\u00e4v\u00e4t oppilaiden itsetuntemusta ja sosiaalisia taitoja.',
    focusKeyword: 'SEL-oppiminen teht\u00e4v\u00e4t',
  },
  {
    // #92: STEAM-opetus käytännössä
    slug: 'stemsteam-integration-connecting-worksheets-to-hands-on-engineering-art',
    metaTitle: 'STEAM-opetus: Kun Ty\u00f6arkit Tukevat Tekemist\u00e4 ja Luovuutta',
    metaDescription: 'STEAM-opetus yhdist\u00e4\u00e4 tieteen, teknologian, tekniikan, taiteen ja matematiikan. K\u00e4yt\u00e4nn\u00f6n ty\u00f6arkit tukevat k\u00e4sill\u00e4 tekemist\u00e4 ja ongelmanratkaisua luokassa.',
    focusKeyword: 'STEAM-opetus ty\u00f6arkit',
  },
  {
    // #93: Symbolinen algebra lapsille (title shortened from ~64 to \u226460)
    slug: 'symbolic-algebra-worksheets',
    metaTitle: 'Symbolinen Algebra: Matemaattiset Pulmat ja Ratkeavuus',
    metaDescription: 'Symbolinen algebra opettaa lapsille matemaattista ajattelua pulmateht\u00e4vill\u00e4. Ty\u00f6arkit tarjoavat ik\u00e4tasoisia teht\u00e4vi\u00e4 joissa jokaisella on taattu ratkeavuus.',
    focusKeyword: 'symbolinen algebra lapsille',
  },
  {
    // #94: Tavoitelähtöinen opetuksen suunnittelu
    slug: 'backward-design-curriculum-mapping-planning-with-end-goals-in-mind',
    metaTitle: 'Tavoitel\u00e4ht\u00f6inen Suunnittelu: Loppup\u00e4\u00e4st\u00e4 Aloittaminen',
    metaDescription: 'Tavoitel\u00e4ht\u00f6inen suunnittelu aloittaa opetuksen suunnittelun loppup\u00e4\u00e4st\u00e4. Backward design -menetelm\u00e4 auttaa kohdentamaan teht\u00e4v\u00e4monisteet oppimistavoitteisiin.',
    focusKeyword: 'tavoitel\u00e4ht\u00f6inen suunnittelu',
  },
  {
    // #95: Tehtävägeneraattoreiden vertailu
    slug: 'worksheet-generator-comparison-lessoncraftstudio-vs-competitors',
    metaTitle: 'Teht\u00e4v\u00e4generaattoreiden Vertailu: LCS vs Kilpailijat',
    metaDescription: 'Vertaa teht\u00e4v\u00e4generaattoreita kattavasti: LessonCraftStudio vastaan kilpailijat. Ominaisuudet, hinnoittelu ja k\u00e4ytett\u00e4vyys analysoituna opettajan n\u00e4k\u00f6kulmasta.',
    focusKeyword: 'LessonCraftStudio vertailu',
  },
];

async function main() {
  console.log('Part 132: Updating Finnish SEO metadata for blog posts 77-95\n');

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
