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
    title: 'Etsi ja Laske Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia etsi ja laske -tehtäviä lapsille. Kehitä laskemistaitoja ja visuaalista havainnointia kuvilla. Esikoulusta 3. luokalle. Ilmainen PDF.',
    keywords: 'etsi ja laske generaattori, laskeminen kuvasta harjoitus, tarkkaavaisuus tehtävä, havainnointitaito lapset, visuaalinen etsintä, lukumäärän selvittäminen, keskittymiskyky harjoittelu, esineiden tunnistaminen, kuvan tutkiminen tehtävä, laskutaito visuaalinen, yksityiskohtien havaitseminen, etsi ja laske tehtävät, laskemisharjoitukset esikoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/etsi-ja-laske-tyoarkit',
  },

  // Hero Section - FULL text from Finnish find-and-count.md
  hero: {
    title: 'Etsi ja Laske Tehtävien Generaattori',
    subtitle: 'Kehitä Laskemistaitoja Hauskalla Etsintätehtävällä',
    description: `Luo ammattimaisia etsi ja laske -tehtäviä muutamassa minuutissa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Generoi tulostettavia etsi ja laske -tehtäviä täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.

Etsi ja laske -tehtävät kehittävät laskutaitoja ja visuaalista havainnointia. Lapset etsivät ja laskevat tiettyjä kuvia ruudukosta. Tehtävät sopivat esiopetukseen ja alakoulun alimpiin luokkiin. Voit muokata jokaista elementtiä tehtävässä.

Generaattori käyttää 3000+ lapsille sopivaa kuvaa. Voit valita teemat tai yksittäiset kuvat. Voit myös ladata omia kuvia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen ilman lisämaksuja.

Jokainen tehtävä latautuu 300 DPI -laadulla. Täydellinen tulostamiseen ja myyntiin. PDF- ja JPEG-muodot saatavilla. Peruspaketti sisältää kaupallisen POD-lisenssin ilman lisäkustannuksia.`,
    previewImageSrc: '/samples/finnish/find and count/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Katso miten se toimii',
        modalTitle: 'Toimintojen yleiskatsaus',
      },
      appSpecific: {
        videoId: '0cOPi7eajLs',
        buttonText: 'Etsi ja Laske Toiminnot',
        modalTitle: 'Etsi ja Laske Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Työarkki',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish find-and-count.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Etsi ja laske -generaattori tarjoaa kaikki työkalut ammattimaisten tehtävien luomiseen. Voit luoda esiopetus materiaali ilmainen -tehtäviä tai alakoulun matematiikka tehtäviä. Jokainen ominaisuus on suunniteltu säästämään aikaasi. Peruspaketti-tilauksesi antaa täyden pääsyn kaikkiin näihin ammattimaisen tason työkaluihin.',
    highlightBadgeText: 'Tärkeä Ominaisuus',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    badgeText: 'Ominaisuudet',
    trustBadges: {
      allFeatures: 'Kaikki ominaisuudet sisältyvät',
      noHiddenFees: 'Ei piilomaksuja',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from Finnish find-and-count.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Etsi ja laske -tehtävien luominen on nopeaa ja yksinkertaista. Koko prosessi kestää alle kolme minuuttia. Ei suunnitteluosaamista tarvita. Ei monimutkaisia työkaluja. Viisi yksinkertaista vaihetta ammattimaisiin esiopetus materiaali ilmainen -tehtäviin.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Työarkkisi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö',
        description: `Aloita valitsemalla kuvat tehtävääsi. Kolme tapaa valita sisältö. Valitse teema nopeaan luomiseen. Valitse yksittäiset kuvat tarkempaan hallintaan. Tai lataa omia kuvia täydelliseen personointiin.

Teemavalinta on nopein tapa. Klikkaa "Kuvakirjasto" -painiketta. Selaa yli 50 teemaa. Eläimet, ruoka, lelut, välineet, ajoneuvot, kasvit. Valitse teema ja generaattori täyttää ruudukon automaattisesti.

Matematiikka tehtävät alakoulu toimivat hyvin teemavalinnalla. Valitse "Hedelmät" laskemaan omenoita ja banaaneja. Valitse "Eläimet" laskemaan kissoja ja koiria. Oppilaat rakastavat tunnistettavia kuvia. Voit vaihtaa kieltä tässä vaiheessa kielten opetukseen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset',
        description: `Säädä tehtävän asetuksia tarpeisiisi. Ruudukon koko määrittää kuinka monta kuvaa tehtävässä on. Sivukoko määrittää tulostusmuodon. Kysymykset määrittävät mitä oppilaat laskevat.

Ruudukon rivit ja sarakkeet säätävät vaikeustasoa. 5x5 ruudukko = 25 kuvaa = helpompi esikouluun. 6x6 ruudukko = 36 kuvaa = keskivaikea 1. luokalle. 10x10 ruudukko = 100 kuvaa = vaikeampi vanhemmille lapsille.

Sivukoko määrittää tulostusmuodon. A4 Pysty on yleisin Euroopassa. Valitse mitkä kuvat oppilaat laskevat. Klikkaa "Etsi ja laske -kysymykset" -painiketta. Valitse 3-5 eri kuvaa kysymyksiksi.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävä',
        description: `Klikkaa "Luo tehtävä" -painiketta. Generaattori luo tehtävän alle kymmenessä sekunnissa. Välitön esikatselu näyttää lopputuloksen. Tarkista että kaikki näyttää hyvältä.

Generaattori sijoittaa kuvat satunnaisesti ruudukkoon. Jokainen tehtävä on ainutlaatuinen. Luo sama tehtävä kahdesti ja kuvat ovat eri paikoissa. Täydellinen luokkahuoneisiin joissa tarvitaan useita versioita.

Laskentakysymykset näkyvät tehtävän alareunassa. "Kuinka monta omenaa näet?" Selkeät ohjeet lapsille. Jos tehtävä ei miellytä, luo uusi. Rajaton luominen tilauksellasi. Vastausavain luodaan automaattisesti.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Nyt muokkaa tehtävää täydelliseksi. Kaikki pohjalla on muokattavissa. Vedä kuvia uusiin paikkoihin. Kierrä kuvia. Skaalaa kuvia suuremmiksi tai pienemmiksi. Poista kuvia. Lisää uusia kuvia.

Lisää tekstielementtejä. Klikkaa "Lisää teksti" -painiketta. Kirjoita mitä tahansa haluat. Oppilaiden nimet. Luokkahuoneen numero. Erityisohjeet. Kannustavia viestejä.

Lisää taustateemat tehtävään. Klikkaa "Taustateema" -painiketta. Valitse yli 100 taustasta. Lisää reunuksia ammattimaiseen ulkoasuun. Käytä tasaustyökaluja täydelliseen asetteluun.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Tehtäväsi on valmis. Aika ladata ja tulostaa. Kaksi muotovaihtoehtoa - PDF ja JPEG. Kaksi sisältövaihtoehtoa - tehtävä ja vastausavain. Molemmat ladataan korkealla 300 DPI -laadulla.

PDF-muoto on paras tulostamiseen. Säilyttää täydellisen laadun. Skaalautuu minkä tahansa kokoiseksi. JPEG-muoto toimii monissa sovelluksissa. Lisää PowerPointiin. Jaa sähköpostilla.

Harmaasävyvaihtoehto säästää mustetta dramaattisesti. Valitse "Harmaasävy" ennen lataamista. Täydellinen luokkahuoneisiin joissa tulostetaan paljon. Jaa digitaalisesti Google Classroomiin tai Microsoft Teamsiin.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Etsi ja laske -generaattori palvelee monenlaisia käyttäjiä. Esiopettajat luovat matematiikka tehtävät alakoulu -materiaaleja. Kotiopettajavanhemmat räätälöivät tehtäviä lapsilleen. Erityisopettajat eriyttävät tehtäviä oppilaidensa tasoille. Peruspaketti-tilaus palvelee kaikkia näitä ryhmiä tasavertaisesti.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish find-and-count.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset etsi ja laske -tehtävägeneraattorista ja tulostettavista tehtävistä.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Finnish Core Bundle terminology
  pricing: {
    title: 'Peruspaketti',
    price: '144€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton työarkkien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
    ],
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
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default findAndCountFiContent;
