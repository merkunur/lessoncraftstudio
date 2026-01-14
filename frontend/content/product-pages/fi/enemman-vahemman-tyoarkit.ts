import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - Finnish Content (Enemmän vai Vähemmän Tehtävät)
 *
 * File: frontend/content/product-pages/fi/enemman-vahemman-tyoarkit.ts
 * URL: /fi/apps/enemman-vahemman-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const moreLessFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'enemman-vahemman-tyoarkit',
    appId: 'more-less',
    title: 'Matematiikka Tehtävät Alakoulu - Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia vertailutehtäviä lukujen ja määrien vertailuun. Täysi Käyttöoikeus -tilauksella saat rajattomasti tehtäviä ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä, jotka sopivat täydellisesti esiopetukseen ja alakoulun ensimmäisille luokille. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'matematiikka tehtävät alakoulu, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, vertailutehtävät, enemmän vähemmän, suurempi pienempi, lukujen vertailu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/enemman-vahemman-tyoarkit',
  },

  // Hero Section - FULL text from Finnish more-less.md
  hero: {
    title: 'Enemmän vai Vähemmän Tehtävät',
    subtitle: 'Matematiikka Tehtävät Alakoulu - Tulostettavat Tehtävät Lapsille Ilmainen',
    description: `Luo ammattimaisia vertailutehtäviä lukujen ja määrien vertailuun. Täysi Käyttöoikeus -tilauksella saat rajattomasti tehtäviä ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä, jotka sopivat täydellisesti esiopetukseen ja alakoulun ensimmäisille luokille. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Lukujen vertailu on perustavanlaatuinen matemaattinen taito. Lapset oppivat ymmärtämään suurempi, pienempi ja yhtä suuri -käsitteet. Tehtävägeneraattorimme tekee vertailutehtävien luomisesta helppoa. Valitse kuvat tai teemat, aseta asetukset, ja tehtävä on valmis. Jokainen tehtävä sisältää visuaalisia elementtejä, jotka auttavat lapsia hahmottamaan määriä.

Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävägeneraattoriin yhteen hintaan. Luo niin monta matematiikkatehtävää kuin tarvitset. Ei piilotettuja kuluja tai rajoituksia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen. 300 DPI:n laatu takaa ammattimaiset tulosteet.`,
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

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Enemmän vai Vähemmän Tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish more-less.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Matematiikka Tehtävät Alakoulu Jokaiseen Tarpeeseen',
    sectionDescription: 'Vertailutehtävägeneraattori palvelee monenlaisia käyttäjiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erityisopettajat hyötyvät kaikki. Jokainen käyttäjäryhmä löytää ainutlaatuista arvoa. Seuraavat käyttötapaukset osoittavat, kuinka erilaiset opettajat käyttävät työkalua. Tulostettavat tehtävät sopivat kaikkiin opetustilanteisiin.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä vertailutehtävät näihin täydentäviin generaattoreihin.',
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

export default moreLessFiContent;
