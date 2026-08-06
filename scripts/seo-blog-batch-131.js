#!/usr/bin/env node
/**
 * seo-blog-batch-131.js — Part 131: Finnish blog SEO metadata for posts 58-76
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the fourth batch of 19 Finnish blog post translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-131.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #58: Hybridioppiminen
    slug: 'blended-learning-technology-integration-combining-digital-and-print-worksheets',
    metaTitle: 'Hybridioppiminen: Teknologia ja Tulostettavat K\u00e4yt\u00e4nn\u00f6ss\u00e4',
    metaDescription: 'Hybridioppiminen yhdist\u00e4\u00e4 teknologian ja tulostettavat teht\u00e4v\u00e4t. Integroi digitaaliset ja painetut materiaalit sujuvaksi oppimiskokonaisuudeksi alakoulussa.',
    focusKeyword: 'hybridioppiminen tulostettavat',
  },
  {
    // #59: Luonnontieteiden sanasto (title shortened from ~66 to \u226460)
    slug: 'science-vocabulary-integration-8-cross-curricular-worksheet-generators',
    metaTitle: 'Luonnontieteiden Sanasto: Teht\u00e4v\u00e4tyypit K\u00e4siteoppimiseen',
    metaDescription: 'Opeta luonnontieteiden sanastoa kahdeksalla teht\u00e4v\u00e4tyypill\u00e4. Monipuoliset harjoitukset auttavat oppilaita omaksumaan tieteelliset k\u00e4sitteet pysyv\u00e4sti.',
    focusKeyword: 'luonnontieteiden sanasto teht\u00e4v\u00e4t',
  },
  {
    // #60: Opettajien menestystarinat (title shortened from ~68 to \u226460)
    slug: 'success-stories-real-teachers-share-how-worksheets-transformed-their-classrooms',
    metaTitle: 'Opettajien Menestystarinat: Teht\u00e4v\u00e4monisteiden Vaikutus',
    metaDescription: 'Lue opettajien menestystarinoita teht\u00e4v\u00e4monisteiden k\u00e4yt\u00f6st\u00e4. Aidot kokemukset osoittavat miten ty\u00f6arkit muuttivat opetusta ja paransivat oppimistuloksia.',
    focusKeyword: 'opettajien menestystarinat',
  },
  {
    // #61: Mielenterveys ja tunnetaidot
    slug: 'mental-health-social-emotional-support-worksheets-for-whole-child-wellness',
    metaTitle: 'Mielenterveys ja Tunnetaidot: Hyvinvointi Luokkahuoneessa',
    metaDescription: 'Tue oppilaiden mielenterveytt\u00e4 ja tunnetaitoja luokkahuoneessa. Kokonaisvaltaisen hyvinvoinnin ty\u00f6arkit auttavat lapsia tunnistamaan ja s\u00e4\u00e4telem\u00e4\u00e4n tunteitaan.',
    focusKeyword: 'mielenterveys tunnetaidot luokka',
  },
  {
    // #62: Kuvapohjaiset teht\u00e4v\u00e4t (title lengthened to 50+)
    slug: 'why-picture-based-worksheets-produce-23-better-retention',
    metaTitle: 'Kuvapohjaiset Teht\u00e4v\u00e4t: Tutkitusti 2,3-kertainen Muistij\u00e4lki',
    metaDescription: 'Kuvapohjaiset teht\u00e4v\u00e4t tuottavat 2,3-kertaisen muistij\u00e4ljen tekstiin verrattuna. Selvit\u00e4 miksi visuaalinen oppiminen tehostaa muistamista merkitt\u00e4v\u00e4sti.',
    focusKeyword: 'kuvapohjainen oppiminen tutkimus',
  },
  {
    // #63: Millerin 7\u00b12 -s\u00e4\u00e4nt\u00f6 (title lengthened from ~49 to 50+)
    slug: 'millers-72-rule-why-our-image-crosswords-use-exactly-8-pictures',
    metaTitle: 'Millerin 7\u00b12 -S\u00e4\u00e4nt\u00f6: Miksi Kuvaristisanoissa On 8 Kuvaa',
    metaDescription: 'Millerin 7\u00b12 -s\u00e4\u00e4nt\u00f6 selitt\u00e4\u00e4 miksi kuvaristisanoissa k\u00e4ytet\u00e4\u00e4n juuri 8 kuvaa. Ty\u00f6muistin kapasiteetti m\u00e4\u00e4ritt\u00e4\u00e4 optimaalisen visuaalisen haasteen lapsille.',
    focusKeyword: 'Millerin s\u00e4\u00e4nt\u00f6 ristisanat',
  },
  {
    // #64: Hahmontunnistus
    slug: 'how-pattern-recognition-builds-mathematical-thinking-research-from-pre-k-to-grade-5',
    metaTitle: 'Hahmontunnistus ja Matemaattinen Ajattelu: Tutkimustietoa',
    metaDescription: 'Hahmontunnistus rakentaa matemaattista ajattelua esikoulusta 5. luokkaan. Kuvioharjoitukset kehitt\u00e4v\u00e4t p\u00e4\u00e4ttely- ja ongelmanratkaisutaitoja tutkimuspohjaisesti.',
    focusKeyword: 'hahmontunnistus matematiikka',
  },
  {
    // #65: Lukemaan oppiminen (title shortened from ~62 to \u226460)
    slug: 'orthographic-learning-theory-how-word-puzzles-create-sight-word-automaticity',
    metaTitle: 'Lukemaan Oppiminen: Ortografinen Oppiminen ja N\u00e4k\u00f6sanat',
    metaDescription: 'Lapsi oppii lukemaan ortografisen oppimisen kautta. Sanapulmat kehitt\u00e4v\u00e4t n\u00e4k\u00f6sanantunnistusta ja automaattista lukutaitoa \u2013 tutkimuspohjainen l\u00e4hestymistapa.',
    focusKeyword: 'lukemaan oppiminen ortografia',
  },
  {
    // #66: Sanansekoitus ja oikeinkirjoitus (title shortened from ~62 to \u226460)
    slug: 'the-science-behind-word-scrambles-how-letter-rearrangement-accelerates-spelling-by-32',
    metaTitle: 'Sanansekoitus Nopeuttaa Oikeinkirjoituksen Oppimista',
    metaDescription: 'Sanansekoitusteht\u00e4v\u00e4t nopeuttavat oikeinkirjoituksen oppimista merkitt\u00e4v\u00e4sti. Kirjainten uudelleenj\u00e4rjestely vahvistaa sanahahmojen tunnistamista tehokkaasti.',
    focusKeyword: 'sanansekoitus oikeinkirjoitus',
  },
  {
    // #67: Varianssin tunnistus
    slug: 'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
    metaTitle: 'Varianssin Tunnistus: Tyhjien Palapelin Palojen Est\u00e4minen',
    metaDescription: 'Varianssin tunnistusalgoritmi varmistaa jokaisen palapelin palan ainutlaatuisuuden. Generaattori luo merkityksellisi\u00e4 visuaalisia pulmapaloja lapsille.',
    focusKeyword: 'varianssin tunnistus algoritmi',
  },
  {
    // #68: Monikieliset generaattorit
    slug: 'multi-language-worksheet-generation-serving-scandinavian-markets',
    metaTitle: 'Monikieliset Generaattorit: Suomenkielinen K\u00e4ytt\u00f6liittym\u00e4',
    metaDescription: 'Monikieliset teht\u00e4v\u00e4generaattorit palvelevat pohjoismaisia markkinoita suomenkielisell\u00e4 k\u00e4ytt\u00f6liittym\u00e4ll\u00e4. Luo teht\u00e4vi\u00e4 suomeksi, ruotsiksi ja muilla kielill\u00e4.',
    focusKeyword: 'monikielinen teht\u00e4v\u00e4generaattori',
  },
  {
    // #69: Muokattava ristisanaruudukko (title shortened from ~64 to \u226460)
    slug: 'image-crossword-generator-post-generation-editing-feature',
    metaTitle: 'Muokattava Ristisanaruudukko: Generaattori Opettajille',
    metaDescription: 'Muokattava ristisanaruudukkogeneraattori on ainutlaatuinen ty\u00f6kalu opettajille. Muokkaa valmiita kuvaristisanoja tai luo uusia \u2013 r\u00e4\u00e4t\u00e4l\u00f6i teht\u00e4v\u00e4t tarpeisiisi.',
    focusKeyword: 'ristisanaruudukko generaattori',
  },
  {
    // #70: Musiikki ja taide
    slug: 'music-arts-integration-creative-worksheets-for-artistic-expression',
    metaTitle: 'Musiikki ja Taide: Luovat Teht\u00e4v\u00e4t Taiteelliseen Ilmaisuun',
    metaDescription: 'Integroi musiikki ja taide oppimiseen luovilla teht\u00e4v\u00e4monisteilla. Taiteellisen ilmaisun harjoitukset kehitt\u00e4v\u00e4t luovuutta ja monipuolista ajattelua koulussa.',
    focusKeyword: 'musiikki taide oppiminen',
  },
  {
    // #71: Nolla-p\u00e4\u00e4llekk\u00e4isyys (title shortened from ~62 to \u226460)
    slug: 'creating-professional-i-spy-worksheets',
    metaTitle: 'Nolla-p\u00e4\u00e4llekk\u00e4isyys: Ammattimaisten Etsint\u00e4teht\u00e4vien Luonti',
    metaDescription: 'Nolla-p\u00e4\u00e4llekk\u00e4isyysalgoritmi luo ammattimaisia etsi ja l\u00f6yd\u00e4 -teht\u00e4vi\u00e4. Jokainen elementti on ainutlaatuinen \u2013 generaattori varmistaa laadun automaattisesti.',
    focusKeyword: 'etsi ja l\u00f6yd\u00e4 algoritmi',
  },
  {
    // #72: Opettajan ajanhallinta
    slug: 'time-saving-workflow-batch-preparation-monthly-planning-strategies',
    metaTitle: 'Opettajan Ajanhallinta: Pakettivalmistelun Strategiat',
    metaDescription: 'S\u00e4\u00e4st\u00e4 aikaa opettajana pakettivalmistelun strategioilla. Kuukausittainen suunnittelu ja teht\u00e4v\u00e4monisteiden erivalmistelu tehostavat opetusajan k\u00e4ytt\u00f6\u00e4.',
    focusKeyword: 'opettajan ajanhallinta strategiat',
  },
  {
    // #73: Opettajan t\u00e4ydennyskoulutus (title shortened from ~62 to \u226460)
    slug: 'professional-development-teacher-training-using-worksheets-for-pd-practice',
    metaTitle: 'T\u00e4ydennyskoulutus: Ty\u00f6arkit Ammatillisessa Kehittymisess\u00e4',
    metaDescription: 'Hy\u00f6dynn\u00e4 t\u00e4ydennyskoulutuksessa ty\u00f6arkkeja ammatilliseen kehittymiseen. K\u00e4yt\u00e4nn\u00f6n harjoitukset parantavat opetustaitoja ja tuovat uusia menetelmi\u00e4 luokkaan.',
    focusKeyword: 'opettajan t\u00e4ydennyskoulutus',
  },
  {
    // #74: Opetuksen tulevaisuus (title shortened from ~62 to \u226460)
    slug: 'future-of-education-technology-trends-the-role-of-worksheet-generators',
    metaTitle: 'Opetuksen Tulevaisuus: Teknologiatrendit ja Generaattorit',
    metaDescription: 'Tutustu opetuksen tulevaisuuden teknologiatrendeihin ja generaattoreiden rooliin. Teko\u00e4ly ja digitaaliset ty\u00f6kalut muokkaavat oppimista vuoteen 2030 menness\u00e4.',
    focusKeyword: 'opetuksen tulevaisuus teknologia',
  },
  {
    // #75: Opetusajan maksimointi (title shortened from ~62 to \u226460)
    slug: 'maximizing-learning-time-efficiency-strategies-with-worksheets',
    metaTitle: 'Opetusajan Maksimointi: Tehokkuusstrategiat Ty\u00f6arkeilla',
    metaDescription: 'Maksimoi opetusaika tehokkuusstrategioilla ja teht\u00e4v\u00e4monisteilla. K\u00e4yt\u00e4nn\u00f6n vinkit auttavat hy\u00f6dynt\u00e4m\u00e4\u00e4n jokaisen oppitunnin minuutin mahdollisimman hyvin.',
    focusKeyword: 'opetusajan maksimointi strategiat',
  },
  {
    // #76: Oppiaineiden integrointi
    slug: 'integrating-multiple-subjects-through-worksheets',
    metaTitle: 'Oppiaineiden Integrointi: Monialaiset Oppimiskokonaisuudet',
    metaDescription: 'Integroi oppiaineet monialaisiksi oppimiskokonaisuuksiksi ty\u00f6arkeilla. Poikkitieteelliset harjoitukset syvent\u00e4v\u00e4t ymm\u00e4rryst\u00e4 ja tekev\u00e4t oppimisesta mielek\u00e4st\u00e4.',
    focusKeyword: 'oppiaineiden integrointi monialaisuus',
  },
];

async function main() {
  console.log('Part 131: Updating Finnish SEO metadata for blog posts 58-76\n');

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
