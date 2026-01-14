import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Finnish Content
 *
 * File: frontend/content/product-pages/fi/word-search-worksheets.ts
 * URL: /fi/apps/sananhaku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sananhaku-tyoarkit',
    appId: 'word-search',
    title: 'Ilmainen Sanapeli Generaattori | Tulostettavat Tehtävät Lapsille Esiopetus ja Alakoulu',
    description: 'Luo ammattimaisia sanapelitehtäviä ilmaiseksi verkossa. Sanapeli generaattori on täydellinen esiopetuksen ja alakoulun opettajille. Tulostettavat tehtävät lapsille ilmainen versio sisältää vesileiman. Generoi mukautettuja sanapelitehtäviä alle 3 minuutissa.',
    keywords: 'sanapeli generaattori, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu, kertotaulut tulostettava, värityskuvia lapsille tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sananhaku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish wordsearch.md paragraphs 1-4
  hero: {
    title: 'Ilmainen Sanapeli Generaattori',
    subtitle: 'Tulostettavat Tehtävät Esiopetus ja Alakoulu',
    description: `Luo ammattimaisia sanapelitehtäviä ilmaiseksi verkossa. Sanapeli generaattori on täydellinen esiopetuksen ja alakoulun opettajille. Tulostettavat tehtävät lapsille ilmainen versio sisältää vesileiman. Generoi mukautettuja sanapelitehtäviä alle 3 minuutissa.

Valitse teema tai yksittäiset kuvat yli 3000 kuvan kirjastosta. Sanapeli generaattori luo automaattisesti sanastoristikon. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa. Täydellinen esiopetus materiaali ilmainen työväline opettajille.

Sanapelitehtävät sopivat esikoululaisille ja alakoululaisille. Tue lukemaan oppiminen tehtävät ja kirjaimet harjoittelu esikoulu tavoitteita. Käytä matematiikka tehtävät alakoulu sanastoa tai värityskuvia lapsille tulostettava nimiä. Kaikki tehtävät tulostuvat korkealla 300 DPI laadulla.

Ilmainen perusversio sisältää vesileiman henkilökohtaiseen käyttöön. Peruspaketti tai Täysi Pääsy tilaus poistaa vesileiman. Tilaus sisältää kaupallisen lisenssin ja kaikki premium-ominaisuudet. Luo rajoittamattomasti tulostettavat tehtävät lapsille ilmainen tilauksen kanssa.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Sanapeli Työarkit Esimerkit',
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

  // Use Cases - FULL text from Finnish wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Sanapeli generaattori palvelee monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat ja kotiopettajat. Erityisopettajat ja kielenopettajat. Opettajayrittäjät myyvät tehtäviä verkossa. Jokainen ryhmä hyötyy ainutlaatuisilla tavoilla.',
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
    sectionTitle: 'Yhdistä Muihin Työarkki Generaattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sanapeli työarkit näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Työarkkeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia työarkkeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default wordSearchFiContent;
