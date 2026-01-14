import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - Finnish Content (Ristisanatehtävien Generaattori)
 *
 * File: frontend/content/product-pages/fi/ristisanatehtavat-tyoarkit.ts
 * URL: /fi/apps/ristisanatehtavat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const crosswordFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'ristisanatehtavat-tyoarkit',
    appId: 'image-crossword',
    title: 'Ristisanatehtävien Generaattori - Tulostettavat Tehtävät Lapsille Ilmainen | Esiopetus Materiaali',
    description: 'Luo ammattimaisia ristisanatehtäviä kuvilla muutamassa minuutissa. Tulostettavat tehtävät lapsille ilmainen luominen Täysi Käyttöoikeus -tilauksella. Ristisanatehtävien generaattori on täydellinen työkalu esiopetuksen ja alakoulun opettajille.',
    keywords: 'ristisanatehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, ristisanatehtävien generaattori, ristikoita lapsille, kuvallinen ristisanatehtävä',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/ristisanatehtavat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish crossword.md
  hero: {
    title: 'Ristisanatehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: `Luo ammattimaisia ristisanatehtäviä kuvilla muutamassa minuutissa. Tulostettavat tehtävät lapsille ilmainen luominen Täysi Käyttöoikeus -tilauksella ilman maksua per tehtävä. Ristisanatehtävien generaattori on täydellinen työkalu esiopetuksen ja alakoulun opettajille. Luo räätälöityjä tehtäviä, jotka sopivat täydellisesti oppilaiden taitotasolle.

Ristisanatehtävät ovat loistava tapa opettaa sanastoa ja kirjainten tunnistusta. Generaattorimme luo automaattisesti ristikon valitsemistasi kuvista. Jokainen kuva muuttuu sanaksi ristikossa. Voit valita teemoja tai yksittäisiä kuvia yli 3000 kuvan kirjastosta. Esiopetus materiaali ilmainen luominen tilauksella tarkoittaa rajattomia tehtäviä ilman lisäkustannuksia.

Generaattori toimii täysin suomeksi. Kaikki kuvien nimet ja teemat näkyvät suomeksi. Voit myös ladata omia kuvia ja muokata niiden nimiä ennen ristikon luomista. Lataa valmiit tehtävät PDF- tai JPEG-muodossa. Tehtävät sopivat kotitulostimelle ja ammattilaistulosteelle. Täysi Käyttöoikeus -tilaus sisältää kaupallisen lisenssin, joten voit myydä luomiasi tehtäviä.`,
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

  // Sample Gallery - REAL file paths from samples/english/crossword/
  samples: {
    sectionTitle: 'Ristisanatehtävien Esimerkit',
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

  // Use Cases - FULL text from Finnish crossword.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Tulostettavat Tehtävät Lapsille Ilmainen Kaikille Tarpeille',
    sectionDescription: 'Ristisanatehtävien generaattori palvelee monia käyttäjiä. Esiopetuksen opettajat. Alakoulun opettajat. Kotiopettajat. Kielenopettajat. Erityisopettajat. Opettajayrittäjät. Jokainen ryhmä hyötyy eri tavalla. Kaikki saavat tulostettavat tehtävät lapsille ilmainen työkalun, joka säästää tunteja aikaa viikoittain.',
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
    sectionTitle: 'Yhdistä Muihin Generaattoreihin - Kirjaimet Harjoittelu Esikoulu ja Matematiikka Tehtävät Alakoulu Paketit',
    sectionDescription: 'Ristisanatehtävien todellinen voima tulee esiin yhdistettynä muihin generaattoreihin. Täysi Käyttöoikeus antaa sinulle pääsyn kaikkiin 33 generaattoriin. Luo kattavia opetuspaketteja.',
    ctaTitle: 'Valmiina Luomaan Upeita Ristisanatehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia ristisanatehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default crosswordFiContent;
