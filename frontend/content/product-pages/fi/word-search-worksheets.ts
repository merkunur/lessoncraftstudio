import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Finnish Content
 *
 * File: frontend/content/product-pages/fi/word-search-worksheets.ts
 * URL: /fi/apps/sananhaku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sananhaku-tyoarkit',
    appId: 'wordsearch',
    title: 'Ilmainen Sanahaku Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia sanahakutehtäviä 11 kielellä. Muokattavat sanat, koot ja vaikeustasot. Sanavaraston ja oikeinkirjoituksen harjoittelua. Ilmainen PDF.',
    keywords: 'sanahaku tulostettava, sanahaku lapsille, sanapeli generaattori, sanahaku tehtävä, sananhaku tulostettava, sanaristikko lapsille, sanasto sanahaku, oikeinkirjoitus sanahaku, sanahaku alakoulu, sanahaku esikoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sananhaku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish wordsearch.md paragraphs 1-4
  hero: {
    title: 'Sanahaku Generaattori',
    subtitle: 'Tulostettavat Sanahakutehtävät Sanavaraston Harjoitteluun',
    description: `Luo ammattimaisia sanapelitehtäviä ilmaiseksi verkossa. Sanapeli generaattori on täydellinen esiopetuksen ja alakoulun opettajille. Tulostettavat tehtävät lapsille ilmainen versio sisältää vesileiman. Generoi mukautettuja sanapelitehtäviä alle 3 minuutissa.

Valitse teema tai yksittäiset kuvat yli 3000 kuvan kirjastosta. Sanapeli generaattori luo automaattisesti sanastoristikon. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa. Täydellinen esiopetus materiaali ilmainen työväline opettajille.

Sanapelitehtävät sopivat esikoululaisille ja alakoululaisille. Tue lukemaan oppiminen tehtävät ja kirjaimet harjoittelu esikoulu tavoitteita. Käytä matematiikka tehtävät alakoulu sanastoa tai värityskuvia lapsille tulostettava nimiä. Kaikki tehtävät tulostuvat korkealla 300 DPI laadulla.

Ilmainen perusversio sisältää vesileiman henkilökohtaiseen käyttöön. Peruspaketti tai Täysi Pääsy tilaus poistaa vesileiman. Tilaus sisältää kaupallisen lisenssin ja kaikki premium-ominaisuudet. Luo rajoittamattomasti tulostettavat tehtävät lapsille ilmainen tilauksen kanssa.`,
    previewImageSrc: '/samples/finnish/wordsearch/sample-1.jpeg',
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
    },
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
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

  // Features Grid - FULL text from Finnish wordsearch.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Sanapeli generaattori tarjoaa kaikki työkalut ammattimaisten tehtävien luomiseen. Luo tulostettavat tehtävät lapsille ilmainen tai premium-tilauksella. Kaikki ominaisuudet suunniteltu opettajien tarpeisiin. Helppokäyttöinen käyttöliittymä nopeuttaa tehtävien luomista.',
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

  // How-To Guide - FULL text from Finnish wordsearch.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaisia sanapelitehtäviä alle 3 minuutissa. Koko prosessi on yksinkertainen ja intuitiivinen. Ei tarvitse suunnitteluosaamista tai teknistä kokemusta. Seuraa näitä viittä vaihetta täydellisiin tulostettavat tehtävät lapsille ilmainen tuloksiin.',
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
        description: `Aloita valitsemalla kuvat sanapeliisi. Kolme vaihtoehtoa sisällön valintaan. Ensimmäinen vaihtoehto: valitse teema teemavalitsimesta. Toinen vaihtoehto: selaa yksittäisiä kuvia kirjastosta. Kolmas vaihtoehto: lataa omat kuvat.

Teemavalinta on nopein tapa aloittaa. Valitse matematiikka tehtävät alakoulu teemasta numerot tai laskutoimitukset. Valitse kirjaimet harjoittelu esikoulu teemasta aakkoset tai eläimet. Valitse värityskuvia lapsille tulostettava teemasta värikynät tai muodot. Jokainen teema sisältää 8 sopivaa kuvaa.

Yksittäinen kuvavalinta antaa enemmän kontrollia. Selaa yli 3000 kuvaa kategorioittain. Etsi kuvia hakusanalla. Valitse täsmälleen haluamasi 8 kuvaa. Yhdistä kertotaulut tulostettava numeroita ja yhteenlasku ja vähennyslasku tehtävät symboleita.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse ruudukon koko sanastoristikollesi. Rivit: 5-30, sarakkeet: 5-30. Pienempi ruudukko helpompi esikoululaisille. Suurempi ruudukko haastavampi alakoululaisille. Oletus 12x12 sopii useimmille.

Valitse sivun koko ja suunta. Letter Portrait kotitulostimille. A4 Portrait eurooppalaisille tulostimille. Landscape-suunta leveämmille tehtäville. Mukautettu koko erityistarpeisiin.

Aktivoi vaihtoehdot tehtävän vaikeustasoon. "Salli diagonaaliset sanat" lisää haastavuutta. "Salli käänteissanat" vaikeuttaa etsintää. "Näytä vain kuvat" luo visuaalisemman tehtävän. "Näytä vain sanat" luo tekstipohjaisen tehtävän.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi',
        description: `Klikkaa "Generoi Tehtävä" nappia. Generaattori luo sanastoristikon automaattisesti. Sijoittaa sanat vaakasuorasti, pystysuorasti ja diagonaalisesti. Täyttää tyhjät ruudut satunnaisilla kirjaimilla. Koko prosessi kestää 2-3 sekuntia.

Generaattori käyttää suomalaista aakkostoa. Sisältää Å, Ä, Ö kirjaimet. Kaikki skandinaaviset erikoismerkit tuettu. Sanat näkyvät oikein suomeksi. Täydellinen kirjaimet harjoittelu esikoulu tarkoituksiin.

Esikatsele tehtävä heti generoinnin jälkeen. Tarkista, että kaikki sanat sopivat ruudukkoon. Tarkista, että vaikeustaso on sopiva. Jos et ole tyytyväinen, klikkaa "Generoi Uudelleen". Jokainen generointi luo erilaisen asettelun.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa',
        description: `Kaikki elementit tehtävällä ovat muokattavissa. Raahaa sanastoristikkoa uuteen paikkaan. Skaalaa sitä suuremmaksi tai pienemmäksi. Kierrä sitä haluttuun kulmaan. Täysi vapaus asetteluun.

Muokkaa sanalistaa. Muuta fonttikokoa luettavuuden parantamiseksi. Vaihda fonttiperhe. Muuta tekstin väri. Lisää reunukset tekstiin. Tee listasta selkeämpi esikoululaisille.

Lisää omia tekstielementtejä. Kirjoita otsikko tehtävälle. Lisää ohjeet oppilaille. Kirjoita oppilaan nimi tai luokka. Lisää päivämäärä tai tehtävänumero. Kaikki teksti täysin muokattavissa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa" nappia valitaksesi latausvaihtoehto. Valitse PDF tai JPEG muoto. PDF säilyttää parhaan laadun kaikilla laitteilla. JPEG sopii nopeaan jakamiseen sähköpostilla.

Valitse ladataanko tehtävä vai vastausavain. Lataa molemmat myöhempää käyttöä varten. Kaikki ladattu 300 DPI laadulla. Täydellinen tulostuslaatu kotitulostimilla. Ammattimainen laatu kaupalliseen myyntiin.

Aktivoi harmaasävyvaihtoehto säästääksesi värimustetta. Tehtävät tulostuvat selkeästi mustavalkoisina. Säästää kustannuksia suurissa tulostusvolyymeissa. Värikuvat näkyvät silti tehtävässä selvästi.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Sanapeli generaattori palvelee monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat ja kotiopettajat. Erityisopettajat ja kielenopettajat. Opettajayrittäjät myyvät tehtäviä verkossa. Jokainen ryhmä hyötyy ainutlaatuisilla tavoilla.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset sanapeli generaattorista ja ilmaisista työarkeista.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sanapeli työarkit näihin täydentäviin generaattoreihin.',
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

export default wordSearchFiContent;
