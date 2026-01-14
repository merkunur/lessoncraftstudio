import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Finnish Content (Aarteenetsintä Tehtävät)
 *
 * File: frontend/content/product-pages/fi/aarteenetsinta-tyoarkit.ts
 * URL: /fi/apps/aarteenetsinta-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access (Täysi Käyttöoikeus) - €240/year
 */

export const treasureHuntFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'aarteenetsinta-tyoarkit',
    appId: 'treasure-hunt',
    title: 'Aarteenetsintä-tehtävät Lapsille - Tulostettavat Tehtävät Lapsille Ilmainen Suunnittelija - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia aarteenetsintä-tehtäviä tulostettavat tehtävät lapsille ilmainen suunnittelijalla. Full Access -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Lataa 300 DPI PDF alle 3 minuutissa.',
    keywords: 'aarteenetsintä tehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, suuntasanasto, hienomotoriikka harjoitukset, lukemaan oppiminen tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/aarteenetsinta-tyoarkit',
  },

  // Hero Section - FULL text from Finnish treasure-hunt.md
  hero: {
    title: 'Aarteenetsintä Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia aarteenetsintä-tehtäviä tulostettavat tehtävät lapsille ilmainen suunnittelijalla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Luo räätälöityjä tulostettavia aarteenetsintä-tehtäviä täydellisiä esiopetukseen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Aarteenetsintä-tehtävät opettavat suuntasanastoa ja visuaalista tunnistamista. Lapset tunnistavat kuvia ruudukossa ja kuvaavat niiden sijainteja käyttäen suuntakieltä. Valitse kuusi kuvaa teemoista tai lataa omia kuvia. Sovellus luo ruudukon jossa oppilaat harjoittelevat "ylös", "alas", "vasen", "oikea" tai "pohjoinen", "etelä", "itä", "länsi" -sanastoa. Täydellinen esikoululaisille, ensimmäisen luokan ja toisen luokan oppilaille.

Tulostettavat tehtävät lapsille ilmainen suunnittelija tekee aarteenetsintä-tehtävien luomisesta helppoa. Valitse kuusi kuvaa yli 3000 lapsille sopivasta kuvasta. Tai lataa omia kuvia yhdistääksesi luokan aiheisiin. Jokainen tehtävä on täysin muokattavissa canvasilla. Vedä, kierrä, skaalaa tai poista mitä tahansa elementtiä. Lisää tekstielementtejä, vaihda taustoja ja reunuksia. Luo rajattomasti ainutlaatuisia esiopetus materiaali ilmainen tehtäviä.`,
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Aarteenetsintä Tehtävät Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkityöarkit nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases - FULL text from Finnish treasure-hunt.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Värityskuvia Lapsille Tulostettava Jokaiseen Tarpeeseen',
    sectionDescription: 'Aarteenetsintä-tehtävät palvelevat monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat, kielenopettajat, erityisopettajat ja opettajayrittäjät. Jokainen ryhmä hyötyy suuntasanaston opetuksesta. Täysi Käyttöoikeus -tilaus antaa kaikille rajattoman pääsyn.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä aarteenetsintä-tehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Tehtävämonisteitä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia tehtävämonisteitä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default treasureHuntFiContent;
