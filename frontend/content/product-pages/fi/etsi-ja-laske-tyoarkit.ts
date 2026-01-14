import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Finnish Content (Etsi ja Laske Tehtävät)
 *
 * File: frontend/content/product-pages/fi/etsi-ja-laske-tyoarkit.ts
 * URL: /fi/apps/etsi-ja-laske-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/find-and-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'etsi-ja-laske-tyoarkit',
    appId: 'find-and-count',
    title: 'Etsi ja Laske -tehtävät Generaattori | Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu',
    description: 'Luo ammattimaisia etsi ja laske -tehtäviä muutamassa minuutissa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Generoi tulostettavia etsi ja laske -tehtäviä täydellisiä esiopetukseen ja alakouluun.',
    keywords: 'etsi ja laske tehtävät, tulostettavat tehtävät lapsille ilmainen, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, visuaalinen havainnointi',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/etsi-ja-laske-tyoarkit',
  },

  // Hero Section - FULL text from Finnish find-and-count.md
  hero: {
    title: 'Etsi ja Laske -tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu',
    description: `Luo ammattimaisia etsi ja laske -tehtäviä muutamassa minuutissa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Generoi tulostettavia etsi ja laske -tehtäviä täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.

Etsi ja laske -tehtävät kehittävät laskutaitoja ja visuaalista havainnointia. Lapset etsivät ja laskevat tiettyjä kuvia ruudukosta. Tehtävät sopivat esiopetukseen ja alakoulun alimpiin luokkiin. Voit muokata jokaista elementtiä tehtävässä.

Generaattori käyttää 3000+ lapsille sopivaa kuvaa. Voit valita teemat tai yksittäiset kuvat. Voit myös ladata omia kuvia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen ilman lisämaksuja.

Jokainen tehtävä latautuu 300 DPI -laadulla. Täydellinen tulostamiseen ja myyntiin. PDF- ja JPEG-muodot saatavilla. Peruspaketti sisältää kaupallisen POD-lisenssin ilman lisäkustannuksia.`,
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Etsi ja Laske -tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Etsi ja laske -generaattori palvelee monenlaisia käyttäjiä. Esiopettajat luovat matematiikka tehtävät alakoulu -materiaaleja. Kotiopettajavanhemmat räätälöivät tehtäviä lapsilleen. Erityisopettajat eriyttävät tehtäviä oppilaidensa tasoille. Peruspaketti-tilaus palvelee kaikkia näitä ryhmiä tasavertaisesti.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä etsi ja laske -työarkit näihin täydentäviin generaattoreihin.',
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

export default findAndCountFiContent;
