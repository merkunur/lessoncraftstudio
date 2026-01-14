import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Sudoku Worksheets - Finnish Content (Lasten Sudoku -Tehtävät)
 *
 * File: frontend/content/product-pages/fi/sudoku-tyoarkit.ts
 * URL: /fi/apps/sudoku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/sudoku.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Core Bundle" → "Peruspaketti" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const sudokuFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sudoku-tyoarkit',
    appId: 'sudoku',
    title: 'Lasten Sudoku - Tulostettavat Tehtävät Lapsille Ilmainen | Esiopetus Materiaali',
    description: 'Luo värikkäitä kuvasudokuja lapsille ammattimaisella tehtävägeneraattorillamme. Peruspaketti-tilauksesi antaa rajattoman mahdollisuuden luoda tulostettavia tehtäviä lapsille. Sudoku-tehtävät sopivat täydellisesti esiopetukseen ja alakoulun 1-3 luokille.',
    keywords: 'lasten sudoku, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, kuvasudoku, sudoku lapsille, logiikkatehtävät lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sudoku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish sudoku.md
  hero: {
    title: 'Lasten Sudoku',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: `Luo värikkäitä kuvasudokuja lapsille ammattimaisella tehtävägeneraattorillamme. Peruspaketti-tilauksesi antaa rajattoman mahdollisuuden luoda tulostettavia tehtäviä lapsille. Ei tehtäväkohtaisia maksuja. Ei piilokuluja lainkaan. Sudoku-tehtävät sopivat täydellisesti esiopetukseen ja alakoulun 1-3 luokille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa. Jokainen tehtäväsivu sisältää automaattisesti luodun vastaussivun opettajalle.

Lasten sudoku on hauska tapa opettaa loogista ajattelua. Generaattorimme luo 4×4-ruudukoita värikkäillä kuvilla numeroiden sijaan. Tämä tekee sudokuista houkuttelevia ja sopivia 5-9-vuotiaille lapsille. Valitse kolmesta vaikeustasosta oppilaidesi taitojen mukaan. Helppo taso sopii esiopetukseen neljällä tyhjällä ruudulla. Keskitaso sopii ensimmäiselle luokalle kuudella tyhjällä ruudulla. Vaikea taso haastaa toisen ja kolmannen luokan oppilaat kahdeksalla tyhjällä ruudulla. Jokainen vaikeustaso kehittää hahmottamista ja keskittymiskykyä. Peruspaketti-tilauksesi sisältää kaupallisen lisenssin.

Tulostettavat tehtävät lapsille ilmainen on tärkein hakusana suomalaisille opettajille. Lasten sudoku -generaattorimme yhdistää esiopetus materiaalin tehokkaaseen luomiseen. Voit luoda matematiikka tehtäviä alakouluun samalla tilauksella. Voit luoda hienomotoriikka harjoituksia esiopetusryhmällesi. Voit luoda värityskuvia lapsille tulostettava muodossa. Kaikki tämä sisältyy Peruspaketti-tilaukseen. Ei lisämaksuja 3000+ kuvan käytöstä. Ei lisämaksuja 11 kielen tuesta. Ei lisämaksuja kaupallisesta lisenssistä. Vain 144 dollaria vuodessa tai 15 dollaria kuukaudessa. Peruspaketti sisältää 10 suosittua tehtävägeneraattoria. Luo niin monta sudoku-tehtävää kuin luokkasi tarvitsee.`,
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

  // Sample Gallery - REAL file paths from samples/english/sudoku/
  samples: {
    sectionTitle: 'Lasten Sudoku Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkisudokut nähdäksesi ammattimaisen laatumme',
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

  // Use Cases - FULL text from Finnish sudoku.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Lasten sudoku -generaattori palvelee monia käyttäjäryhmiä. Esiopetuksen opettajat luovat hienomotoriikka harjoituksia ja kirjaimet harjoittelu esikoulu -tehtäviä. Alakoulun opettajat luovat matematiikka tehtäviä alakouluun ja lukemaan oppiminen tehtäviä. Kotiopettajat käyttävät generaattoria kaikilla luokka-asteilla. Kieltenopettajat hyödyntävät 11 kielen tukea. Erityisopettajat eriyttävät tehtäviä yksilöllisesti. Opettajayrittäjät myyvät tehtäviä kaupallisella lisenssillä. Peruspaketti-tilaus sopii kaikille näille ryhmille.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sudoku-tehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Sudoku-Tehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia lasten sudoku -tehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default sudokuFiContent;
