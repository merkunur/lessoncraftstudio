import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Ruudukko Sovitus Worksheets - Finnish Content (Ruudukkotehtävät)
 *
 * File: frontend/content/product-pages/fi/ruudukko-sovitus-tyoarkit.ts
 * URL: /fi/apps/ruudukko-sovitus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/grid-match.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Käyttöoikeus)
 */

export const gridMatchFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'ruudukko-sovitus-tyoarkit',
    appId: 'grid-match',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Visuaalinen Palapelityökalu Esiopetus Materiaali',
    description: 'Luo ammattimaisia ruudukon sovitustehtäviä visuaalisen havainnon ja ongelmanratkaisun kehittämiseen. Ruudukko Sovitus -työkalu tuottaa tehtäviä, joissa lapset sovittavat puuttuvia kuvapaloja ruudukkoon. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, ruudukkotehtävät, esiopetus materiaali, visuaalinen havainnointi, avaruudellinen päättely, matematiikka tehtävät alakoulu, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/ruudukko-sovitus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish grid-match.md
  hero: {
    title: 'Ruudukko Sovitus -tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Visuaalinen Palapelityökalu Esiopetus Materiaali',
    description: `Luo ammattimaisia ruudukon sovitustehtäviä visuaalisen havainnon ja ongelmanratkaisun kehittämiseen. Ruudukko Sovitus -työkalu tuottaa tehtäviä, joissa lapset sovittavat puuttuvia kuvapaloja ruudukkoon. Täydellinen esiopetuksen ja alakoulun oppilaille. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman maksua per tehtävä.

Lataa valmiit tehtävät PDF- tai JPEG-muodossa alle 3 minuutissa. Ruudukko Sovitus kehittää visuaalista havainnointikykyä, avaruudellista päättelyä ja keskittymiskykyä lapsilla. Tilaus sisältää kaikki 33 työkalutyyppiä, kaupallisen lisenssin ja 11 kielen tuen. Säästä tunteja aikaa joka viikko luomalla mukautettuja tehtäviä nopeasti.

Ruudukko Sovitus jakaa kuvan ruudukkoon ja poistaa joitain soluja. Lapset tunnistavat, mitkä palaset kuuluvat mihinkin paikkaan. Tämä harjoitus kehittää yksityiskohtien havainnointia, avaruudellista suuntautumista ja loogista ajattelua. Käytä yli 3000 lapsille sopivaa kuvaa tai lataa omia kuvia henkilökohtaiseen opetukseen.`,
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

  // Sample Gallery - REAL file paths from samples/english/grid match/
  samples: {
    sectionTitle: 'Ruudukko Sovitus -tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish grid-match.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille - Tulostettavat Tehtävät Lapsille Ilmainen Jokaiseen Tarpeeseen',
    sectionDescription: 'Ruudukko Sovitus palvelee erilaisia käyttäjiä esiopetuksen kasvattajista alakoulun opettajiin. Jokainen käyttäjäryhmä hyötyy mukautetuista ruudukkotehtävistä räätälöidyille oppimiskäyttöihin. Visuaalinen havainnointikyky kehittyy kaikissa ikäryhmissä tehtävien adaptiivisella vaikeustasolla. Luo esiopetus materiaali ilmaiseksi lisämaksuista tai luo haastavampia tehtäviä vanhemmille alakoulun oppilaille.',
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
};

export default gridMatchFiContent;
