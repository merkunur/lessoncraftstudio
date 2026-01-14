import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - Finnish Content (Prepositioharjoitukset)
 *
 * File: frontend/content/product-pages/fi/prepositio-tyoarkit.ts
 * URL: /fi/apps/prepositio-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/prepositions.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - Prepositions is a FULL ACCESS app ($240/year), NOT Core Bundle
 * - All UI labels in Finnish
 */

export const prepositionsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'prepositio-tyoarkit',
    appId: 'prepositions',
    title: 'Prepositioharjoitukset - Tulostettavat Tehtävät Lapsille Ilmainen | Esiopetus Materiaali',
    description: 'Luo ammattimaisia prepositioharjoituksia alakoululaisille ja esikoululaisille. Täysi Käyttöoikeus -tilauksesi antaa rajattoman mahdollisuuden luoda tulostettavia tehtäviä lapsille. Prepositioharjoitukset sopivat täydellisesti esiopetukseen ja alakoulun 1-3 luokille.',
    keywords: 'prepositioharjoitukset, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, sijaintisanat, prepositiot lapsille, kielioppi tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/prepositio-tyoarkit',
  },

  // Hero Section - FULL text from Finnish prepositions.md
  hero: {
    title: 'Prepositioharjoitukset',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: `Luo ammattimaisia prepositioiden harjoittelutehtäviä alakoululaisille ja esikoululaisille. Täysi Käyttöoikeus -tilaus antaa sinulle rajoittamattoman mahdollisuuden luoda tehtäviä ilman maksuja yksittäisistä tehtävistä. Generoi tulostettavia prepositioharjoituksia, jotka opettavat sijaintisuhteita hauska tavalla. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Prepositioiden tehtävägeneraattori tukee kahta harjoitustyyppiä. Valitse täydennysharjoitukset tai monivalintatehtävät. Molemmat muodot auttavat lapsia oppimaan sijaintisanat konkreettisten esimerkkien avulla. Tehtävät sopivat 1. luokasta 3. luokkaan sekä esiopetukseen.

Generaattori sisältää yli 3000 lapsille sopivaa kuvaa. Kaikki kuvat on järjestetty teemoittain helppoa valintaa varten. Valitse yksittäisiä kuvia tai anna generaattorin valita satunnaisesti kaikista teemoista. Voit myös ladata omia kuvia personoidaksesi tehtävät oppilaillesi.`,
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Prepositioharjoitukset Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkitehtävät nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtäväsivu',
    answerKeyLabel: 'Vastaussivu',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases - FULL text from Finnish prepositions.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Prepositioiden tehtävägeneraattori palvelee laajaa opettajien ja vanhempien joukkoa. Täysi Käyttöoikeus -tilaus sopii esiopetuksen opettajille, alakoulun opettajille ja kotiopettajille. Luo matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät samalla alustalla. Jokainen käyttäjäryhmä hyötyy generaattorin ainutlaatuisista ominaisuuksista.',
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
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä prepositioharjoitukset näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Prepositioharjoituksia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia prepositioharjoituksia. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default prepositionsFiContent;
