#!/usr/bin/env node
/**
 * seo-blog-batch-128.js — Part 128: Finnish blog SEO metadata for posts 1-19
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the first 19 Finnish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-128.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #1: 10 parasta teht\u00e4v\u00e4generaattoria 2. luokalle
    slug: 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4generaattoria 2. Luokalle (7\u20138 v.)',
    metaDescription: 'L\u00f6yd\u00e4 10 parasta teht\u00e4v\u00e4generaattoria 2. luokan opetukseen. Matematiikka, lukutaito ja logiikkapulmat \u2013 luo valmiit teht\u00e4v\u00e4monisteet minuuteissa 7\u20138-vuotiaille.',
    focusKeyword: 'teht\u00e4v\u00e4generaattorit 2. luokka',
  },
  {
    // #2: 10 parasta teht\u00e4v\u00e4generaattoria 3. luokan opettajille
    slug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4generaattoria 3. Luokalle (8\u20139 v.)',
    metaDescription: 'Tutustu 10 parhaaseen teht\u00e4v\u00e4generaattoriin 3. luokan opetukseen. Algebra, sanateht\u00e4v\u00e4t ja matemaattiset pulmat \u2013 monipuolisia harjoituksia 8\u20139-vuotiaille.',
    focusKeyword: 'teht\u00e4v\u00e4generaattorit 3. luokka',
  },
  {
    // #3: 10 parasta teht\u00e4v\u00e4generaattoria 4\u20135. luokkalaisille
    slug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4generaattoria 4\u20135. Luokalle (9\u201311 v.)',
    metaDescription: 'Vertaile 10 parasta teht\u00e4v\u00e4generaattoria 4\u20135. luokan opetukseen. Sudoku, ruudukkopiirustus ja logiikka \u2013 motivoivia teht\u00e4vi\u00e4 9\u201311-vuotiaille oppilaille.',
    focusKeyword: 'teht\u00e4v\u00e4generaattorit 4\u20135. luokka',
  },
  {
    // #4: 10 parasta teht\u00e4v\u00e4generaattoria esiopetukseen
    slug: 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4generaattoria Esiopetukseen (5\u20136 v.)',
    metaDescription: 'L\u00f6yd\u00e4 10 parasta teht\u00e4v\u00e4generaattoria esiopetukseen. Numerot, kirjaimet ja hahmottaminen \u2013 ik\u00e4tasoisia harjoituksia 5\u20136-vuotiaille esi- ja alkuopetukseen.',
    focusKeyword: 'teht\u00e4v\u00e4generaattorit esiopetus',
  },
  {
    // #5: 10 parasta teht\u00e4v\u00e4generaattoria esikouluun
    slug: 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4generaattoria Esikouluun (3\u20135 v.)',
    metaDescription: 'Tutustu 10 parhaaseen teht\u00e4v\u00e4generaattoriin esikoulun opetukseen. V\u00e4ritys, kuviot ja motoriikka \u2013 leikkisi\u00e4 oppimisharjoituksia 3\u20135-vuotiaille lapsille.',
    focusKeyword: 'teht\u00e4v\u00e4generaattorit esikoulu',
  },
  {
    // #6: 10 parasta teht\u00e4v\u00e4pohjaty\u00f6kalua 1. luokalle
    slug: 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7',
    metaTitle: '10 Parasta Teht\u00e4v\u00e4pohjaty\u00f6kalua 1. Luokan Opettajille',
    metaDescription: 'Vertaile 10 parasta teht\u00e4v\u00e4pohjaty\u00f6kalua 1. luokan opettajille. Yhteenlasku, aakkoset ja kirjoitus \u2013 r\u00e4\u00e4t\u00e4l\u00f6it\u00e4v\u00e4t teht\u00e4v\u00e4pohjat 6\u20137-vuotiaiden opetukseen.',
    focusKeyword: 'teht\u00e4v\u00e4pohjat 1. luokka',
  },
  {
    // #7: 1. luokan lukutaidon kehitt\u00e4minen
    slug: '1st-grade-literacy-tools-word-search-alphabet-train-writing-practice',
    metaTitle: '1. Luokan Lukutaito: Sanaeliö, Aakkosjuna ja Kirjoittaminen',
    metaDescription: 'Kehit\u00e4 1. luokan lukutaitoa sanaeliö- ja aakkosjunaharjoituksilla. Tutkimuspohjaiset menetelm\u00e4t tukevat sujuvan lukemisen ja kirjoittamisen oppimista koulussa.',
    focusKeyword: 'lukutaito 1. luokka',
  },
  {
    // #8: 33 muokattavaa teht\u00e4v\u00e4kirjageneraattoria
    slug: '33-editable-worksheet-generators-every-elementary-teacher-needs',
    metaTitle: '33 Muokattavaa Teht\u00e4v\u00e4generaattoria Alakoulun Opettajalle',
    metaDescription: 'Tutustu 33 muokattavaan teht\u00e4v\u00e4generaattoriin alakoulun opettajalle. Matematiikka, lukutaito, logiikka ja visuaaliset teht\u00e4v\u00e4t \u2013 kaikki yhdest\u00e4 paikasta.',
    focusKeyword: '33 teht\u00e4v\u00e4generaattoria opettajalle',
  },
  {
    // #9: 3. luokan matematiikka: algebrallinen ajattelu
    slug: '3rd-grade-advanced-math-symbolic-algebra-math-puzzles-code-addition',
    metaTitle: '3. Luokan Matematiikka: Algebrallinen Ajattelu ja Pulmat',
    metaDescription: 'Opi 3. luokan algebrallista ajattelua matemaattisten pulmien ja koodilaskujen avulla. Haasteteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t symbolista p\u00e4\u00e4ttely\u00e4 ja ongelmanratkaisutaitoja.',
    focusKeyword: 'algebrallinen ajattelu 3. luokka',
  },
  {
    // #10: 7 kuvapohjaista generaattoria kieltenopetukseen
    slug: '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
    metaTitle: '7 Kuvapohjaista Generaattoria Kieltenopetukseen (11 kielt\u00e4)',
    metaDescription: 'L\u00f6yd\u00e4 7 kuvapohjaista generaattoria kieltenopetukseen. Visuaaliset teht\u00e4v\u00e4t 11 kielell\u00e4 \u2013 sanaristikot, kuvabingo ja sanaeliö helpottavat kielen oppimista.',
    focusKeyword: 'kieltenopetus generaattorit',
  },
  {
    // #11: ADHD-tukea visuaalisilla teht\u00e4vill\u00e4
    slug: 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
    metaTitle: 'ADHD ja Visuaaliset Teht\u00e4v\u00e4t: 9 Generaattoria Kouluun',
    metaDescription: 'Tue ADHD-oppijoita visuaalisilla teht\u00e4vill\u00e4, jotka kevent\u00e4v\u00e4t kognitiivista kuormaa. 9 generaattoria selke\u00e4\u00e4n ja ennakoitavaan oppimiseen alakoulussa.',
    focusKeyword: 'ADHD visuaaliset teht\u00e4v\u00e4t',
  },
  {
    // #12: \u00c4lyk\u00e4s soluntunnistus ruudukkopiirustuksessa
    slug: 'smart-cell-detection-in-grid-drawing-how-pixel-analysis-prevents-blank-clue-cells',
    metaTitle: 'Ruudukkopiirustus: \u00c4lyk\u00e4s Soluntunnistus Pikselianalyysill\u00e4',
    metaDescription: 'Tutustu ruudukkopiirustuksen \u00e4lykk\u00e4\u00e4seen soluntunnistusalgoritmiin. Pikselianalyysi est\u00e4\u00e4 tyhj\u00e4t vihjesolut ja varmistaa laadukkaat teht\u00e4v\u00e4monisteet joka kerta.',
    focusKeyword: 'ruudukkopiirustus algoritmi',
  },
  {
    // #13: Alakoulun 4\u20135. luokkien haasteet
    slug: 'upper-elementary-challenges-grid-drawing-complex-patterns-multi-step-logic',
    metaTitle: 'Alakoulun 4\u20135. Luokka: Ruudukkopiirustus, Sudoku ja Logiikka',
    metaDescription: 'Haasta 4\u20135. luokan oppilaat ruudukkopiirustuksella, sudokulla ja logiikkapulmilla. Monipuoliset haasteteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kriittist\u00e4 ajattelua ja p\u00e4\u00e4ttely\u00e4.',
    focusKeyword: 'haasteteht\u00e4v\u00e4t 4\u20135. luokka',
  },
  {
    // #14: Alakoulun yl\u00e4luokat: haastavia teht\u00e4vi\u00e4
    slug: 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets',
    metaTitle: 'Haastavia Teht\u00e4vi\u00e4 Edistyneille Oppijoille (4\u20135. Luokka)',
    metaDescription: 'Tarjoa haastavia teht\u00e4vi\u00e4 edistyneille 4\u20135. luokan oppijoille. Logiikkapulmat, monimutkaiset kuviot ja ongelmanratkaisuteht\u00e4v\u00e4t pit\u00e4v\u00e4t motivaation yll\u00e4.',
    focusKeyword: 'haasteteht\u00e4v\u00e4t edistyneille',
  },
  {
    // #15: Aloittelevan opettajan opas
    slug: 'getting-started-guide-for-new-teachers-essential-worksheet-systems',
    metaTitle: 'Aloittelevan Opettajan Opas: J\u00e4rjestelm\u00e4t ja Teht\u00e4v\u00e4pohjat',
    metaDescription: 'Aloittelevan opettajan k\u00e4yt\u00e4nn\u00f6n opas j\u00e4rjestelmiin ja teht\u00e4v\u00e4pohjiin. Valmistaudu ensimm\u00e4iseen lukuvuoteen selkeill\u00e4 rutiineilla ja valmiilla materiaaleilla.',
    focusKeyword: 'aloittelevan opettajan opas',
  },
  {
    // #16: Arviointi ja edistymisen seuranta
    slug: 'assessment-progress-tracking-using-worksheets-for-data-collection',
    metaTitle: 'Arviointi ja Edistymisen Seuranta Teht\u00e4v\u00e4monisteilla',
    metaDescription: 'Hy\u00f6dynn\u00e4 teht\u00e4v\u00e4monisteet oppimisen arvioinnissa ja edistymisen seurannassa. Ker\u00e4\u00e4 tietoa oppilaiden osaamisesta ja r\u00e4\u00e4t\u00e4l\u00f6i opetusta tulosten perusteella.',
    focusKeyword: 'oppimisen arviointi teht\u00e4v\u00e4monisteet',
  },
  {
    // #17: Autismikirjon tukeminen
    slug: 'autism-friendly-visual-learning-8-predictable-worksheet-generators',
    metaTitle: 'Autismikirjon Tukeminen: 8 Visuaalista Generaattoria',
    metaDescription: 'Tue autismikirjon oppilaita 8 visuaalisella generaattorilla. Ennakoitavat rakenteet ja selke\u00e4t teht\u00e4v\u00e4t luovat turvallisen oppimisymp\u00e4rist\u00f6n koulussa.',
    focusKeyword: 'autismi visuaaliset teht\u00e4v\u00e4t',
  },
  {
    // #18: Edulliset oppimateriaalit
    slug: 'budget-friendly-classroom-resources-maximizing-learning-on-minimal-budget',
    metaTitle: 'Edulliset Oppimateriaalit: Oppiminen Pienell\u00e4 Budjetilla',
    metaDescription: 'Maksimoi oppiminen edullisilla oppimateriaaleilla ja ilmaisilla generaattoreilla. Laadukkaat teht\u00e4v\u00e4monisteet pienell\u00e4 budjetilla \u2013 s\u00e4\u00e4st\u00e4 tinkim\u00e4tt\u00e4 laadusta.',
    focusKeyword: 'edulliset oppimateriaalit',
  },
  {
    // #19: Eriytt\u00e4minen k\u00e4yt\u00e4nn\u00f6ss\u00e4: eritasoiset oppilaat
    slug: 'advanced-differentiation-managing-multi-level-classrooms',
    metaTitle: 'Eriytt\u00e4minen K\u00e4yt\u00e4nn\u00f6ss\u00e4: Eritasoisten Oppilaiden Opetus',
    metaDescription: 'Toteuta eriytt\u00e4minen k\u00e4yt\u00e4nn\u00f6ss\u00e4 teht\u00e4v\u00e4monisteiden avulla. R\u00e4\u00e4t\u00e4l\u00f6i harjoitukset eritasoisille oppilaille ja tue jokaisen oppilaan yksil\u00f6llist\u00e4 edistymist\u00e4.',
    focusKeyword: 'eriytt\u00e4minen teht\u00e4v\u00e4monisteet',
  },
];

async function main() {
  console.log('Part 128: Updating Finnish SEO metadata for blog posts 1-19\n');

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
