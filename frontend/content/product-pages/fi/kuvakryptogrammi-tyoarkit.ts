import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Cryptogram Worksheets - Finnish Content (Kuvakryptogrammi Generaattori)
 *
 * File: frontend/content/product-pages/fi/kuvakryptogrammi-tyoarkit.ts
 * URL: /fi/apps/kuvakryptogrammi-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const cryptogramFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvakryptogrammi-tyoarkit',
    appId: 'image-cryptogram',
    title: 'Kuvakryptogrammi Generaattori - Tulostettavat Tehtävät Lapsille Ilmainen | Kirjaimet Harjoittelu Esikoulu',
    description: 'Luo ammattimaisia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman kryptogrammi-tehtävien luonnin. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'kuvakryptogrammi, tulostettavat tehtävät lapsille ilmainen, kirjaimet harjoittelu esikoulu, esiopetus materiaali ilmainen, lukemaan oppiminen tehtävät, matematiikka tehtävät alakoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvakryptogrammi-tyoarkit',
  },

  // Hero Section - FULL text from Finnish cryptogram.md
  hero: {
    title: 'Kuvakryptogrammi',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Kirjaimet Harjoittelu Esikoulu',
    description: `Luo ammattimaisia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman kryptogrammi-tehtävien luonnin ilman ylimääräisiä maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille, jotka ovat täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Kuvakryptogrammit yhdistävät kirjainten harjoittelun ja ongelmanratkaisun. Oppilaat purkavat salatun viestin tunnistamalla, mikä kuva edustaa mitäkin kirjainta. Täydellinen lukemaan oppimisen tehtäville ja kirjainten tunnistuksen harjoittelulle.

Tehtävägeneraattori toimii 11 kielellä. Valitse esiopetus materiaali ja matematiikka tehtävät alakouluun suomeksi. Luo värityskuvia lapsille tulostettavia ja yhteenlasku ja vähennyslasku tehtäviä samalla alustalla. Jokainen kryptogrammitehtävä sisältää sekä tehtävän että vastausavaimen.`,
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

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
  samples: {
    sectionTitle: 'Kuvakryptogrammi Esimerkit',
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

  // Use Cases - FULL text from Finnish cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali ja Matematiikka Tehtävät Alakoulu',
    sectionDescription: 'Kuvakryptogrammit toimivat monenlaisissa opetustilanteissa. Esiopetuksen opettajat käyttävät niitä kirjainten harjoitteluun. Alakoulun opettajat luovat kertotaulut tulostettava ja yhteenlasku ja vähennyslasku tehtävät materiaaleja. Kotiopettajat rakentavat kokonaisvaltaisia oppimispaketteja. Jokainen käyttäjäryhmä hyötyy eri tavoin.',
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
    sectionTitle: 'Yhdistä Muihin Generaattoreihin - Kertotaulut Tulostettava, Värityskuvia Lapsille Tulostettava ja Yhteenlasku ja Vähennyslasku Tehtävät',
    sectionDescription: 'Kuvakryptogrammit toimivat vielä paremmin yhdistettynä muihin tehtävätyyppeihin. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin 33 generaattoriin. Rakenna kokonaisvaltaisia oppimispaketteja jotka käsittelevät samaa teemaa eri tavoin.',
    ctaTitle: 'Valmiina Luomaan Upeita Kuvakryptogrammeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia kuvakryptogrammeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default cryptogramFiContent;
