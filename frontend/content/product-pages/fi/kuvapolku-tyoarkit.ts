import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - Finnish Content (Kuvapolku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuvapolku-tyoarkit.ts
 * URL: /fi/apps/kuvapolku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/picture-path.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Picture Path requires Full Access subscription
 */

export const picturePathFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvapolku-tyoarkit',
    appId: 'picture-path',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Kuvapolku Tehtävät Esiopetus - Hienomotoriikka Harjoitukset',
    description: 'Luo ammattimaisia kuvapolkutehtäviä helposti. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Lataa tulostettavat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, kuvapolku tehtävät, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, sokkelotehtävät, labyrinttitehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvapolku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish picture-path.md
  hero: {
    title: 'Kuvapolku Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia kuvapolkutehtäviä helposti. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Generoi mukautettuja tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Kuvapolkugeneraattori tarjoaa kolme erilaista pelitilaa. Luo klassisia sokkeloita, kuvapolkuja tai valitse oikea polku -tehtäviä. Jokainen tehtävä yhdistää hienomotoriikan harjoituksia visuaaliseen oppimiseen. Lapset seuraavat polkua alusta loppuun keräten kuvia matkan varrelta.

Työkalumme tekee laadukkaiden tehtävien luomisesta nopeaa. Valitse teema tai yksittäisiä kuvia yli 3000 kuvan kirjastosta. Muokkaa kaikkea pohjalla suoraan. Lisää omia kuvia personoidaksesi tehtävät oppilaillesi. Vie valmiit tehtävät tulostettavana PDF-tiedostona tai JPEG-kuvana.`,
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

  // Sample Gallery - REAL file paths from samples/english/picture path/
  samples: {
    sectionTitle: 'Kuvapolku Tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish picture-path.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Värityskuvia Lapsille Tulostettava ja Kertotaulut Tulostettava',
    sectionDescription: 'Kuvapolkutehtävät palvelevat laajaa käyttäjäkuntaa. Esiopetuksen opettajat alakoulun opettajiin. Kotiopettajat kielenopettajiin. Erityisopettajat opettajayrittäjiin. Jokainen löytää arvoa tälle työkalulle.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvapolkutehtävät näihin täydentäviin generaattoreihin.',
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

export default picturePathFiContent;
