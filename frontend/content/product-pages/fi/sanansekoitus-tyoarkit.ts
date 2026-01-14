import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Finnish Content (Sanansekoitus Tehtävät)
 *
 * File: frontend/content/product-pages/fi/sanansekoitus-tyoarkit.ts
 * URL: /fi/apps/sanansekoitus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sanansekoitus-tyoarkit',
    appId: 'word-scramble',
    title: 'Sanansekoitus-tehtävät Generaattori | Tulostettavat Tehtävät Lapsille Ilmainen ja Esiopetus Materiaali',
    description: 'Luo ammattimaisia sanansekoitustehtäviä helposti verkossa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Generoi mukautettuja tulostettavia sanansekoitustehtäviä täydellisiksi esiopetukseen ja alakouluun.',
    keywords: 'sanansekoitus tehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, kirjaimet harjoittelu esikoulu, lukemaan oppiminen tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sanansekoitus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish word-scramble.md
  hero: {
    title: 'Sanansekoitus-tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen ja Esiopetus Materiaali',
    description: `Luo ammattimaisia sanansekoitustehtäviä helposti verkossa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Generoi mukautettuja tulostettavia sanansekoitustehtäviä täydellisiksi esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle kolmessa minuutissa.

Sanansekoitus-generaattorimme sopii täydellisesti opettajille jotka tarvitsevat tulostettavat tehtävät lapsille ilmainen -formaatissa. Jokainen tehtävä sisältää kuvavihjeitä jotka helpottavat oppimista. Mukautettava vaikeus tekee tehtävistä sopivia kaikille ikätasoille. Lapsesi oppivat kirjaimia ja sanoja hauskalla tavalla.

Sovellus tukee 11 kieltä täysin mukautetulla sisällöllä. Kuvapohjainen lähestymistapa auttaa visuaalisia oppijoita. Kukin sanansekoitustehtävä voidaan muokata täysin luomisen jälkeen. Tallenna aikaa ja luo ammattimaisia tehtäviä minuuteissa tuntien sijaan.

Opettajat käyttävät tätä työkalua kirjainharjoitteluun esikoulussa. Vanhemmat luovat mukautettuja tehtäviä kotiopetukseen. Kielenopettajat rakentavat sanasto-opetusta 11 kielellä. Erityisopettajat säätävät vaikeustason jokaisen oppilaan tarpeisiin. Yrittäjäopettajat myyvät tehtäviä Teachers Pay Teachers ja Etsy -alustoilla.`,
    previewImageSrc: '',
    ctaLabels: {
      tryFree: 'Kokeile Ilmaiseksi',
      viewSamples: 'Katso Esimerkkejä',
    },
    trustBadges: {
      languages: '11 Kieltä',
      images: '3000+ Kuvaa',
      license: 'Kaupallinen Lisenssi',
    },
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    floatingStats: {
      time: '3 min',
      action: 'Luo & Lataa',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Sanansekoitus-tehtävät Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkityöarkit nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Työarkki',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases - FULL text from Finnish word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Sanansekoitus-generaattori palvelee monia erilaisia käyttäjiä suomalaisessa koulutusjärjestelmässä. Esiopettajista alakoulun opettajiin ja kotiopettavista vanhemmista erityisopettajiin. Jokainen käyttäjäryhmä hyötyy ainutlaatuisilla tavoilla. Tulostettavat tehtävät lapsille ilmainen -muodossa sopivat kaikkiin tilanteisiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [],
    ctaText: 'Aloita Luominen Nyt',
    bundleDescription: 'Tilauksesi sisaltaa paasyn 10 tyoarkkigeneraattoriin:',
    bundleApps: [
      'Kuvayhdistely',
      'Aakkosjuna',
      'Varityskuvat',
      'Matematiikkatehtavat',
      'Sanansekoitus',
      'Etsi ja Laske',
      'Yhdistelypeli',
      'Piirralainjoja',
      'Kuvabingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Yhdistä Muihin Tehtävä Generaattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sanansekoitustehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Tehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia tehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    badgeText: 'Toimii Hyvin Yhdessä',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [],
  },
};

export default wordScrambleFiContent;
