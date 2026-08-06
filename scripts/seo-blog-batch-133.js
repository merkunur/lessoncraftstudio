#!/usr/bin/env node
/**
 * seo-blog-batch-133.js — Part 133: Finnish blog SEO metadata for posts 96-112 (FINAL BATCH)
 *
 * Updates translations.fi metaTitle, metaDescription, and focusKeyword
 * for the final batch of 17 Finnish blog post translations.
 * Completes all 112 Finnish blog posts (Parts 128-133).
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/seo-blog-batch-133.js
 */

const path = require('path');
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const updates = [
  {
    // #96: Tehtävägeneraattorit Haltuun
    slug: 'complete-how-to-guide-mastering-worksheet-generators-from-setup-to-print',
    metaTitle: 'Tehtävägeneraattorit Haltuun: Opas Aloituksesta Tulostukseen',
    metaDescription: 'Opi hallitsemaan tehtävägeneraattorit tällä kattavalla oppaalla. Asennuksesta tulostukseen — vaiheittaiset ohjeet auttavat luomaan laadukkaita oppimateriaaleja.',
    focusKeyword: 'tehtävägeneraattorit opas',
  },
  {
    // #97: Tekijänoikeudet ja Opetusmateriaalit
    slug: 'copyright-compliance-legal-use-of-educational-materials-and-worksheets',
    metaTitle: 'Tekijänoikeudet ja Opetusmateriaalit: Opettajan Opas',
    metaDescription: 'Ymmärrä tekijänoikeudet opetusmateriaalien käytössä kattavalla oppaalla. Lailliset käytännöt ja lisenssit auttavat opettajia hyödyntämään materiaaleja oikein.',
    focusKeyword: 'tekijänoikeudet opetusmateriaalit',
  },
  {
    // #98: Toimintaterapia
    slug: 'occupational-therapy-goals-fine-motor-worksheet-activities',
    metaTitle: 'Toimintaterapia: 8 Hienomotoriikan Tehtäväharjoitusta',
    metaDescription: 'Toimintaterapian hienomotoriikkaharjoitukset kehittävät lasten kädentaitoja tehokkaasti. Kahdeksan tutkimuspohjaista tehtävätyyppiä tukevat motorista kehitystä.',
    focusKeyword: 'toimintaterapia hienomotoriikka',
  },
  {
    // #99: Tulostettu vai Digitaalinen
    slug: 'print-vs-digital-worksheet-delivery-choosing-the-right-format-for-your-classroom',
    metaTitle: 'Tulostettu vai Digitaalinen: Oikea Muoto Opetukseen',
    metaDescription: 'Vertaa tulostettuja ja digitaalisia tehtävämonisteita opetuskäytössä. Tutkimuspohjainen analyysi auttaa valitsemaan oikean muodon luokkasi tarpeisiin sopivasti.',
    focusKeyword: 'tulostettu vai digitaalinen',
  },
  {
    // #100: Työmuistin Tukeminen
    slug: 'working-memory-accommodations-7-worksheets-with-visual-support',
    metaTitle: 'Työmuistin Tukeminen: 7 Tehtävätyyppiä Visuaalisella Tuella',
    metaDescription: 'Tue oppilaan työmuistia seitsemällä visuaalisesti tuetulla tehtävätyypillä. Tutkimuspohjaiset strategiat auttavat oppilaita keskittymään ja muistamaan paremmin.',
    focusKeyword: 'työmuisti visuaalinen tuki',
  },
  {
    // #101: Vaihtoehtoiset Arviointimenetelmät
    slug: 'creative-assessment-alternatives-beyond-traditional-tests',
    metaTitle: 'Vaihtoehtoiset Arviointimenetelmät: Toiminnallinen Arviointi',
    metaDescription: 'Toiminnalliset arviointimenetelmät tarjoavat vaihtoehtoja perinteisille kokeille. Luovat arviointitavat mittaavat osaamista autenttisesti ja motivoivasti.',
    focusKeyword: 'vaihtoehtoiset arviointi',
  },
  {
    // #102: Vanhempien Osallistuminen
    slug: 'parent-engagement-home-school-connection-worksheets-that-build-partnerships',
    metaTitle: 'Vanhempien Osallistuminen: Työkalut Koti-Koulu-Yhteistyöhön',
    metaDescription: 'Vahvista koti-koulu-yhteistyötä tehtävämonisteilla jotka osallistavat vanhempia. Käytännön työkalut rakentavat toimivan kumppanuuden kodin ja koulun välille.',
    focusKeyword: 'vanhempien osallistuminen koti-koulu',
  },
  {
    // #103: Varhaiskasvatus
    slug: 'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
    metaTitle: 'Varhaiskasvatus: Ikätasoiset Tehtävät 3–6-vuotiaille',
    metaDescription: 'Varhaiskasvatuksen ikätasoiset tehtävät tukevat 3–6-vuotiaiden kehitystä leikin kautta. Tutkimuspohjaiset tehtävät kehittävät motorisia ja kognitiivisia kykyjä.',
    focusKeyword: 'varhaiskasvatus tehtävät 3-6',
  },
  {
    // #104: Vertaisopetus
    slug: 'peer-tutoring-student-teaching-leveraging-worksheets-for-student-led-learning',
    metaTitle: 'Vertaisopetus: Tehtäväpohjaiset Menetelmät Oppimiseen',
    metaDescription: 'Vertaisopetus tehtäväpohjaisilla menetelmillä tehostaa oppimista kun oppilaat opettavat toisiaan. Käytännön ohjeet auttavat toteuttamaan vertaisoppimista hyvin.',
    focusKeyword: 'vertaisopetus tehtäväpohjat',
  },
  {
    // #105: Visuaalinen Hahmotus
    slug: 'visual-discrimination-activities-frostig-hornes-five-foundational-skills',
    metaTitle: 'Visuaalinen Hahmotus: Frostigin 5 Perustaitoa Lapsille',
    metaDescription: 'Visuaalisen hahmotuksen Frostigin viisi perustaitoa luovat pohjan oppimisvalmiuksille. Harjoitukset kehittävät lasten hahmotuskykyä ja tukevat lukutaitoa.',
    focusKeyword: 'visuaalinen hahmotus Frostig',
  },
  {
    // #106: Visuaalinen ja Verbaalinen Oppiminen
    slug: 'combining-visual-verbal-learning-for-23-better-recall',
    metaTitle: 'Visuaalinen ja Verbaalinen Oppiminen: 2,3x Tehostus',
    metaDescription: 'Yhdistä visuaalinen ja verbaalinen oppiminen 2,3-kertaiseen muistin tehostukseen. Tutkimuspohjaiset menetelmät auttavat oppilaita omaksumaan tietoa paremmin.',
    focusKeyword: 'visuaalinen verbaalinen oppiminen',
  },
  {
    // #107: Visuaaliset Työkalut Erityisopetukseen
    slug: 'visual-learning-tools-for-special-education-classrooms-8-research-backed-generators',
    metaTitle: 'Visuaaliset Työkalut Erityisopetukseen: 8 Generaattoria',
    metaDescription: 'Erityisopetuksen visuaaliset generaattorit tukevat erilaisia oppijoita tehokkaasti. Kahdeksan työkalua auttavat luomaan selkeitä ja saavutettavia materiaaleja.',
    focusKeyword: 'erityisopetus visuaaliset generaattorit',
  },
  {
    // #108: Visuaalis-spatiaaliset Taidot
    slug: 'visual-spatial-skills-development-7-worksheets-for-stem-foundation',
    metaTitle: 'Visuaalis-spatiaaliset Taidot: 7 Tehtävää STEM-pohjaan',
    metaDescription: 'Visuaalis-spatiaaliset taidot luovat perustan STEM-oppimiselle. Seitsemän tehtävätyyppiä kehittävät avaruudellista hahmottamista ja matemaattista ajattelua.',
    focusKeyword: 'visuaalis-spatiaaliset taidot STEM',
  },
  {
    // #109: Vuodenaikojen Tehtäväsuunnittelu
    slug: 'back-to-school-seasonal-worksheet-planning-year-round-content-strategy',
    metaTitle: 'Vuodenaikojen Tehtäväsuunnittelu: Koko Vuoden Strategia',
    metaDescription: 'Suunnittele tehtävämonisteet vuodenaikojen mukaan koko lukuvuodelle. Kausiluonteinen sisältöstrategia pitää oppimateriaalit tuoreina ja ajankohtaisina aina.',
    focusKeyword: 'vuodenaikojen tehtäväsuunnittelu',
  },
  {
    // #110: Yhteiskuntaopin Sanasto
    slug: 'social-studies-vocabulary-integration-7-generators-for-history-geography',
    metaTitle: 'Yhteiskuntaopin Sanasto: 7 Generaattoria Opetukseen',
    metaDescription: 'Yhteiskuntaopin sanaston opetus rikastuu 7 generaattorilla historian ja maantiedon aiheista. Interaktiiviset tehtävät syventävät oppilaiden sanavarastoa.',
    focusKeyword: 'yhteiskuntaopin sanasto generaattorit',
  },
  {
    // #111: Yksikäsitteinen Ratkeavuus
    slug: 'unique-solvability-validation-the-math-behind-frustration-free-algebra-worksheets',
    metaTitle: 'Yksikäsitteinen Ratkeavuus: Algoritmi Estää Turhautumisen',
    metaDescription: 'Yksikäsitteisen ratkeavuuden algoritmi varmistaa että algebratehtävillä on yksi oikea vastaus. Turhautumisen estävä matemaattinen menetelmä generaattoreissa.',
    focusKeyword: 'yksikäsitteinen ratkeavuus',
  },
  {
    // #112: Yläkouluun Siirtyminen
    slug: 'middle-school-transition-preparing-5th-graders-for-independent-learning',
    metaTitle: 'Yläkouluun Siirtyminen: Viidesluokkalaisen Valmistaminen',
    metaDescription: 'Valmista viidesluokkalainen yläkouluun siirtymiseen itsenäisen oppimisen taidoilla. Käytännön strategiat ja tehtävämonisteet helpottavat siirtymävaihetta hyvin.',
    focusKeyword: 'yläkouluun siirtyminen valmistelu',
  },
];

async function main() {
  console.log('Part 133 (FINAL): Updating Finnish SEO metadata for blog posts 96-112\n');

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
  console.log('All 112 Finnish blog posts now have SEO metadata (Parts 128-133 complete)!');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
