import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Finnish Content (Matematiikka Tehtävät)
 *
 * File: frontend/content/product-pages/fi/matematiikka-tyoarkit.ts
 * URL: /fi/apps/matematiikka-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathWorksheetsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'matematiikka-tyoarkit',
    appId: 'math-worksheet',
    title: 'Matematiikka Tehtävät Alakoulu Generaattori | Tulostettavat Tehtävät Lapsille Ilmainen Yhteenlasku ja Vähennyslasku Tehtävät - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia visuaalisia matematiikkatehtäviä minuuteissa. Peruspaketti-tilauksesi antaa sinulle rajattoman matematiikkatehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä jotka sopivat täydellisesti esiopetuksen ja alakoulun oppilaille.',
    keywords: 'matematiikka tehtävät alakoulu, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, yhteenlasku ja vähennyslasku tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/matematiikka-tyoarkit',
  },

  // Hero Section - FULL text from Finnish math-worksheet.md
  hero: {
    title: 'Matematiikka Tehtävät Alakoulu',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Yhteenlasku ja Vähennyslasku',
    description: `Luo ammattimaisia visuaalisia matematiikkatehtäviä minuuteissa. Peruspaketti-tilauksesi antaa sinulle rajattoman matematiikkatehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä jotka sopivat täydellisesti esiopetuksen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Visuaaliset matematiikkatehtävät auttavat lapsia oppimaan yhteenlaskua ja vähennyslaskua kuvien avulla. Jokainen tehtävä käyttää kuvia numeroiden esittämiseen. Lapset laskevat kuvia ja ratkaisevat matemaattisia ongelmia. Tämä visualisoinnin menetelmä tekee abstraktista matematiikasta konkreettista ja ymmärrettävää.

Matematiikkatehtävien generaattori tarjoaa neljä vaikeustasoa. Hyvin helppo ja helppo taso käyttävät kahta symbolia per tehtävä. Keskitaso käyttää kolmea symbolia. Vaikea taso käyttää neljää symbolia. Valitse vaikeustaso joka sopii oppilaittesi taitotasolle.

Luo tehtäviä joko pelkästään yhteenlaskusta tai yhteenlaskun ja vähennyslasku yhdistelmästä. Aseta minimiarvo ja maksimiarvo numeroille. Päätä salliiko tehtävät negatiiviset tulokset. Nämä asetukset antavat sinulle täydellisen kontrollin tehtävien sopivuudesta.`,
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Matematiikka Tehtävät Alakoulu Esimerkit',
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

  // Use Cases - FULL text from Finnish math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Visuaalinen matematiikkatehtävien generaattori palvelee monia eri käyttäjäryhmiä. Jokainen ryhmä hyötyy työkalun joustavuudesta ja helppokäyttöisyydestä. Opettajat säästävät tunteja valmistelua viikossa. Vanhemmat löytävät laadukasta oppimateriaalia kotiin. Kasvattajat luovat ammattimaisilta näyttäviä tehtäviä ilman graafisen suunnittelun taitoja.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä visuaaliset matematiikka työarkit näihin täydentäviin generaattoreihin.',
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

export default mathWorksheetsFiContent;
