import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - Finnish Content (Kuvalajittelu Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuvalajittelu-tyoarkit.ts
 * URL: /fi/apps/kuvalajittelu-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/picture-sort.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Picture Sort requires Full Access subscription
 */

export const pictureSortFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvalajittelu-tyoarkit',
    appId: 'picture-sort',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Kuvalajittelu ja Hienomotoriikka Harjoitukset Esikouluun',
    description: 'Luo ammattimaisia kuvalajittelutehtäviä helposti. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Lataa tulostettavat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, kuvalajittelu tehtävät, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, lajittelutehtävät, kategorisointi tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvalajittelu-tyoarkit',
  },

  // Hero Section - FULL text from Finnish picture-sort.md
  hero: {
    title: 'Kuvalajittelu Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia kuvalajittelutehtäviä helposti. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille ilmainen, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Kuvalajittelugeneraattori auttaa lapsia oppimaan luokittelua ja kategorisointia. Lapset lajittelevat kuvia kahteen ryhmään. Vasen ja oikea kategoria. Jokainen tehtävä harjoittaa kriittistä ajattelua ja visuaalista erottelukykyä.

Työkalumme tekee laadukkaiden esiopetus materiaali ilmainen -tehtävien luomisesta nopeaa. Valitse kaksi teemaa automaattista generointia varten. Tai valitse yksittäisiä kuvia manuaalisesti 3000+ kuvan kirjastosta. Muokkaa kaikkea pohjalla suoraan. Lisää omia kuvia personoidaksesi tehtävät oppilaillesi.`,
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

  // Sample Gallery - REAL file paths from samples/english/picture sort/
  samples: {
    sectionTitle: 'Kuvalajittelu Tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Alakoulu Kaikille Tarpeille',
    sectionDescription: 'Kuvalajittelutehtävät toimivat kaikilla koulutustasoilla. Esiopetuksesta alakouluun. Kotiopetuksesta luokkahuoneeseen. Monikielisestä opetuksesta erityisopetukseen. Jokainen opettaja löytää arvon näistä tehtävistä.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvalajittelutehtävät näihin täydentäviin generaattoreihin.',
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

export default pictureSortFiContent;
