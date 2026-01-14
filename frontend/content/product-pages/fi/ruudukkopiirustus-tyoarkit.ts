import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Draw and Color Worksheets - Finnish Content (Ruudukkopiirustus)
 *
 * File: frontend/content/product-pages/fi/ruudukkopiirustus-tyoarkit.ts
 * URL: /fi/apps/ruudukkopiirustus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/draw-and-color.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const drawAndColorFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'ruudukkopiirustus-tyoarkit',
    appId: 'draw-and-color',
    title: 'Ruudukkopiirustus Tehtävät | Värityskuvia Lapsille Tulostettava - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia ruudukkopiirustustehtäviä värityskuvia lapsille tulostettava -generaattorillamme. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.',
    keywords: 'ruudukkopiirustus tehtävät, värityskuvia lapsille tulostettava, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, matematiikka tehtävät alakoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/ruudukkopiirustus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish draw-and-color.md
  hero: {
    title: 'Ruudukkopiirustus Tehtävät',
    subtitle: 'Värityskuvia Lapsille Tulostettava - Esiopetus Materiaali Ilmainen',
    description: `Luo ammattimaisia ruudukkopiirustustehtäviä värityskuvia lapsille tulostettava -generaattorillamme. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä -maksuja. Generoi mukautettuja tulostettavat tehtävät lapsille ilmainen, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Ruudukkopiirustustehtävät yhdistävät taiteen, matematiikan ja hienomotoriikan kehittämisen yhdessä sitouttavassa aktiviteetissa. Oppilaat tarkastelevat vihjepikseleitä ja luovat piirustuksen uudelleen värittämällä vastaavat ruudut tyhjään ruudukkoon. Tämä opettaa ruudukkokoordinaatteja, hahmontunnistusta ja tarkkuutta.

Ruudukkopiirustustehtävämme on suunniteltu erityisesti esiopetukseen ja alakoulun ensimmäisille luokille. Tehtävät kehittävät visuaalista hahmotuskykyä, hienomotorisia taitoja ja keskittymiskykyä. Säädä vaikeustasoa helposti muuttamalla vihjepikselien määrää - vähemmän vihjeitä tekee tehtävästä haastavamman.

Generaattori luo kaksi vierekkäistä ruudukkoa: viheruudukko paljastaa osan kuvasta pikselöitynä, ja piirustusruudukko on tyhjä oppilaan täytettäväksi. Oppilas kopioi mallin värittämällä oikeat ruudut. Tämä kehittää koordinaattien ymmärtämistä, spatiaalista päättelyä ja visuomotorisia taitoja.`,
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

  // Sample Gallery - REAL file paths from samples/english/draw and color/
  samples: {
    sectionTitle: 'Ruudukkopiirustus Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkitehtävät nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävä',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases Section - FULL text from Finnish draw-and-color.md
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille',
    sectionDescription: 'Ruudukkopiirustustehtävägeneraattori palvelee laajaa käyttäjäkuntaa. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat, kieltenopettajat, erityisopettajat ja opettajayrittäjät kaikki hyötyvät. Jokainen käyttäjäryhmä löytää ainutlaatuisia tapoja käyttää esiopetus materiaali ilmainen -tehtäviä.',
    badgeText: 'Kenelle Soveltuu',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [],
    ctaText: 'Tilaa Nyt',
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
};

export default drawAndColorFiContent;
