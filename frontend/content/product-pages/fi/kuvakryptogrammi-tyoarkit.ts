import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Cryptogram Worksheets - Finnish Content (Kuvakryptogrammi Generaattori)
 *
 * File: frontend/content/product-pages/fi/kuvakryptogrammi-tyoarkit.ts
 * URL: /fi/apps/kuvakryptogrammi-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const cryptogramFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvakryptogrammi-tyoarkit',
    appId: 'cryptogram',
    title: 'Kuvakryptogrammi Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Kehittää dekoodaustaitoja ja lukemisvalmiutta. Esikoulusta 3. luokalle.',
    keywords: 'kuvakryptogrammi generaattori, salakirjoitus lapsille, koodipulma oppiminen, symbolikirjoitus harjoitus, koodinpurkaminen lukutaito, looginen kielitehtävä, visuaalinen koodaus, dekoodaus lukeminen, kirjaintunnistus pulmalla, koodisanasto harjoitus, ajattelutaito kehittäminen, kuvakryptogrammi tehtävät, dekoodaus tehtävä',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvakryptogrammi-tyoarkit',
  },

  // Hero Section - FULL text from Finnish cryptogram.md
  hero: {
    title: 'Kuvakryptogrammi Generaattori',
    subtitle: 'Salakirjoitustehtäviä Kuvilla — Dekoodaa ja Opi Lukemaan',
    description: `Luo ammattimaisia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman kryptogrammi-tehtävien luonnin ilman ylimääräisiä maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille, jotka ovat täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Kuvakryptogrammit yhdistävät kirjainten harjoittelun ja ongelmanratkaisun. Oppilaat purkavat salatun viestin tunnistamalla, mikä kuva edustaa mitäkin kirjainta. Täydellinen lukemaan oppimisen tehtäville ja kirjainten tunnistuksen harjoittelulle.

Tehtävägeneraattori toimii 11 kielellä. Valitse esiopetus materiaali ja matematiikka tehtävät alakouluun suomeksi. Luo värityskuvia lapsille tulostettavia ja yhteenlasku ja vähennyslasku tehtäviä samalla alustalla. Jokainen kryptogrammitehtävä sisältää sekä tehtävän että vastausavaimen.`,
    previewImageSrc: '/samples/finnish/cryptogram/sample-1.jpeg',
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
        videoId: '9U0BIIjCnco',
        buttonText: 'Kuvakryptogrammi Toiminnot',
        modalTitle: 'Kuvakryptogrammi Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtäväsivu',
    answerKeyLabel: 'Vastaussivu',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish cryptogram.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuvakryptogrammi-generaattori sisältää kaikki työkalut, joita tarvitset ammattimaisten tehtävien luomiseen. Luo esiopetus materiaali ilmainen ja lukemaan oppiminen tehtävät minuuteissa. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Jokainen ominaisuus on suunniteltu nopeuttamaan tehtävien luomista ja parantamaan laatua.',
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

  // How-To Guide - FULL text from Finnish cryptogram.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimainen kuvakryptogrammi alle 3 minuutissa. Viisi yksinkertaista vaihetta vie sinut tyhjästä kankaasta valmiiseen tulostettavaan tehtävään. Ei tarvita teknistä osaamista. Ei tarvita suunnittelutaitoa. Seuraa näitä vaiheita luodaksesi kertotaulut tulostettava, yhteenlasku ja vähennyslasku tehtävät sekä lukemaan oppiminen tehtävät.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Kuvakryptogrammisi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Kuvakryptogrammille - Lauseet Kirjaimet Harjoittelu Esikoulu ja Lukemaan Oppiminen Tehtävät Varten',
        description: `Kirjoita lauseet tai fraasit, jotka haluat salata. Yksi lause per rivi. Voit kirjoittaa mitä tahansa - sananlaskuja, matematiikan faktoja tai opetusviestejä. Luo kertotaulut tulostettava fraaseja kuten "seitsemän kertaa kahdeksan on viisikymmentäkuusi". Kirjoita yhteenlasku ja vähennyslasku tehtävät lauseita kuten "kymmenen plus viisi on viisitoista".

Fraasien pituus vaikuttaa vaikeuteen. Lyhyet fraasit sopivat esiopetukseen. Pitkät lauseet haastavat vanhempia oppilaita. Käytä yksinkertaisia sanoja lukemaan oppiminen tehtävät aloittelijoille. Sisällytä matematiikan sanastoa matematiikka tehtävät alakoulu oppilaille.

Voit luoda teemallisia kryptogrammeja. Eläinaiheet värityskuvia lapsille tulostettava ja hienomotoriikka harjoitukset yhdistelmiin. Vuodenaikateema pisteestä pisteeseen tehtävät kanssa. Juhlapäiväfraasit esiopetus materiaali ilmainen paketteihin. Valitse aihe, joka kiinnostaa oppilaitasi ja motivoi heitä ratkaisemaan arvoituksen.`,
        icon: '📝',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Kertotaulut Tulostettava ja Yhteenlasku ja Vähennyslasku Tehtävät Vaikeustasolla',
        description: `Valitse kuinka monta kirjainta paljastetaan vihjeiksi. Nolla vihjettä luo vaikeimman arvoituksen. Yksi tai kaksi vihjettä auttaa aloittelijoita pääsemään alkuun. Useammat vihjeet tekevät tehtävästä helpomman esiopetus materiaali ilmainen oppilaille.

Aseta rivien enimmäismäärä per arvoitus. Tämä kontrolloi ulkoasua ja vaikeutta. Vähemmän rivejä tiivistää arvoituksen. Enemmän rivejä jakaa sen helpommin luettavaksi. Säädä tätä asetusta luodaksesi kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät eri tasoille.

Valitse sivun koko ja suunta. A4 pysty Euroopassa. Letter pysty Yhdysvalloissa. Vaaka-asento antaa enemmän tilaa leveille kryptogrammeille. Neliökoko toimii hyvin värityskuvia lapsille tulostettava ja pisteestä pisteeseen tehtävät yhdistelmissä.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Kuvakryptogrammi - Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Alakoulu Välittömästi',
        description: `Klikkaa Luo-painiketta. Generaattori käsittelee fraasisi ja luo kryptogrammin sekunnissa. Kaksi versiota luodaan automaattisesti - tehtäväversio kuvilla ja vastausavain kirjaimilla. Molemmat versiot näkyvät välilehtinä.

Tehtäväversio näyttää kuvat kirjainten sijasta. Tämä on versio, jonka oppilaat saavat. He ratkaisevat arvoituksen tunnistamalla, mikä kuva vastaa mitäkin kirjainta. Täydellinen lukemaan oppiminen tehtävät ja kirjaimet harjoittelu esikoulu harjoituksiin.

Vastausavain näyttää fraasit oikeilla kirjaimilla. Tämä on opettajan versio tarkistusta varten. Tulosta molemmat versiot tai vain tehtäväversio. Säilytä vastausavain digitaalisena tai tulosta se myöhemmin.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Räätälöi Hienomotoriikka Harjoitukset, Pisteestä Pisteeseen Tehtävät ja Värityskuvia Lapsille Tulostettava',
        description: `Nyt kun kryptogrammi on luotu, muokkaa sitä kankaalla. Vedä elementtejä uusiin sijainteihin. Skaalaa kuvia suuremmiksi tai pienemmiksi. Kierrä tekstejä tai kuvia kiinnostavuuden lisäämiseksi. Kaikki muutokset näkyvät välittömästi.

Lisää mukautettuja tekstejä työkalujen osiosta. Kirjoita otsikot kuten "Kertotaulut Tulostettava" tai "Yhteenlasku ja Vähennyslasku Tehtävät". Lisää ohjeita oppilaille. Muuta fonttia, kokoa ja väriä tekstityökaluilla. Luo selkeitä ohjeita esiopetus materiaali ilmainen ja lukemaan oppiminen tehtävät oppilaille.

Lisää tausta sivuasetusten osiosta. Selaa taustakirjastoa. Klikkaa taustaa lisätäksesi sen. Säädä läpinäkyvyyttä liukusäätimellä. Haaleat taustat toimivat hyvin hienomotoriikka harjoitukset ja pisteestä pisteeseen tehtävät yhdistelmissä.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Tulostettavat Tehtävät Lapsille Ilmainen PDF tai JPEG Muodossa',
        description: `Kun olet tyytyväinen kryptogrammiisi, lataa se. Klikkaa Lataa-painiketta oikeassa yläkulmassa. Avautuvasta valikosta valitse haluamasi formaatti. JPEG nopeaan jakamiseen. PDF ammattimaiseen tulostukseen.

Valitse kumpi versio ladataan. Tehtäväversio oppilaille. Vastausavain opettajalle. Tai lataa molemmat kerralla. Molemmat versiot ovat 300 DPI laatua. Täydellinen kotitulostimille ja ammattitulostukselle.

Harmaasävyvalintaruutu muuttaa värikuvat mustavalkoisiksi. Tämä säästää värimustetta tulostuksessa. Harmaasävy toimii hyvin hienomotoriikka harjoitukset ja pisteestä pisteeseen tehtävät tehtävissä. Värillinen versio on parempi värityskuvia lapsille tulostettava ja visuaalisesti kiinnostaville tehtäville.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuvakryptogrammit toimivat monenlaisissa opetustilanteissa. Esiopetuksen opettajat käyttävät niitä kirjainten harjoitteluun. Alakoulun opettajat luovat kertotaulut tulostettava ja yhteenlasku ja vähennyslasku tehtävät materiaaleja. Kotiopettajat rakentavat kokonaisvaltaisia oppimispaketteja. Jokainen käyttäjäryhmä hyötyy eri tavoin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish cryptogram.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät säännöllisesti samoista asioista. Onko generaattori ilmainen. Miten tulostus toimii. Voinko myydä luomiani materiaaleja. Tässä osiossa vastataan kaikkiin yleisimpiin kysymyksiin kuvakryptogrammi-generaattorista.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Finnish Full Access terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton kryptogrammien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
    ],
    ctaText: 'Aloita Luominen Nyt',
    bundleDescription: 'Tilauksesi sisältää pääsyn kaikkiin 33 työarkkigeneraattoriin:',
    bundleApps: [
      'Kuvalaskut',
      'Aakkosjuna',
      'Iso vai pieni',
      'Kuvabingo',
      'Kaaviot laske ja väritä',
      'Koodiyhteenlasku',
      'Värityssivut',
      'Kuvasanaristikko',
      'Kuvakryptogrammi',
      'Piirtäminen ja värittäminen',
      'Viivojen piirtäminen',
      'Etsi ja laske',
      'Etsi esineet',
      'Ruudukkoyhdistäminen',
      'Yhdistämispeli',
      'Matematiikkapulma',
      'Matematiikkamonisteet',
      'Puuttuvat palaset',
      'Enemmän vai vähemmän',
      'Mikä ei kuulu joukkoon',
      'Kuviojuna',
      'Kuviomonisteet',
      'Kuvapolku',
      'Kuvien lajittelu',
      'Prepositiot',
      'Varjopari',
      'Vähennyslasku',
      'Lasten sudoku',
      'Aarteenmetsästys',
      'Arvaa sana',
      'Sanojen sekoitus',
      'Sanaristikko',
      'Kirjoitusharjoitukset',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Kuvakryptogrammit toimivat vielä paremmin yhdistettynä muihin tehtävätyyppeihin. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin 33 generaattoriin. Rakenna kokonaisvaltaisia oppimispaketteja jotka käsittelevät samaa teemaa eri tavoin.',
    ctaTitle: 'Valmiina Luomaan Upeita Kuvakryptogrammeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia kuvakryptogrammeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default cryptogramFiContent;
