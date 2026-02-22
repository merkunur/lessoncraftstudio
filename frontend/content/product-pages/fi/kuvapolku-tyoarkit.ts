import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - Finnish Content (Kuvapolku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuvapolku-tyoarkit.ts
 * URL: /fi/apps/kuvapolku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/picture-path.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Picture Path requires Full Access subscription
 */

export const picturePathFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvapolku-tyoarkit',
    appId: 'picture-path',
    title: 'Ilmainen Kuvapolku Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia kuvapolkutehtäviä, joissa lapsi seuraa kuvareittejä. Kehittää loogista ajattelua ja hienomotoriikkaa. Esikoulusta 2. luokalle. Ilmainen.',
    keywords: 'kuvapolku generaattori, sokkelo lapsille, polun seuraaminen tehtävä, avaruudellinen navigointi, reitinvalinta harjoitus, visuaalinen seuranta, ongelmanratkaisu polkupeli, suunnittelukyky harjoitus, etenemisstrategia oppiminen, labyrintti tulostettava, visuomotorinen harjoitus, kuvapolku tehtävät, sokkelotehtävät lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvapolku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish picture-path.md
  hero: {
    title: 'Kuvapolku Generaattori',
    subtitle: 'Loogisen Ajattelun Harjoituksia Kuvareiteillä',
    description: `Luo ammattimaisia kuvapolkutehtäviä helposti. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Generoi mukautettuja tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Kuvapolkugeneraattori tarjoaa kolme erilaista pelitilaa. Luo klassisia sokkeloita, kuvapolkuja tai valitse oikea polku -tehtäviä. Jokainen tehtävä yhdistää hienomotoriikan harjoituksia visuaaliseen oppimiseen. Lapset seuraavat polkua alusta loppuun keräten kuvia matkan varrelta.

Työkalumme tekee laadukkaiden tehtävien luomisesta nopeaa. Valitse teema tai yksittäisiä kuvia yli 3000 kuvan kirjastosta. Muokkaa kaikkea pohjalla suoraan. Lisää omia kuvia personoidaksesi tehtävät oppilaillesi. Vie valmiit tehtävät tulostettavana PDF-tiedostona tai JPEG-kuvana.`,
    previewImageSrc: '/samples/finnish/picture path/sample-1.jpeg',
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
        videoId: 'Sl1o0uPBDCg',
        buttonText: 'Kuvapolku Toiminnot',
        modalTitle: 'Kuvapolku Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/picture path/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish picture-path.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuvapolkutyökalumme sisältää kaiken mitä tarvitset ammattimaisten tehtävien luomiseen. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Luo esiopetus materiaali, matematiikka tehtävät alakoulu ja hienomotoriikka harjoitukset. Kaikki samalla alustalla. Kaikki samalla tilauksella.',
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

  // How-To Guide - FULL text from Finnish picture-path.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaiset kuvapolkutehtävät alle 3 minuutissa. Viisi yksinkertaista vaihetta alusta loppuun. Ei monimutkaisia asetuksia. Ei pitkää oppimiskäyrää. Pelkkä nopea, helppo tehtävien luominen.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Tehtävämoniste on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Kuvat - Värityskuvia Lapsille Tulostettava ja Pisteestä Pisteeseen Tehtävät Teemalliset',
        description: `Aloita valitsemalla pelitila. Klassinen sokkelo perinteisille labyrinttitehtäville. Kuvapolku kuvien keräämiseen matkan varrella. Valitse oikea polku -tila haastavampaan ongelmanratkaisuun. Päätä ensin, mitä tyyliä haluat.

Valitse teema kuvakirjastosta. Yli 50 teemaa saatavilla. Eläimet, ruoka, ajoneuvot, luonto. Lelut, vaatteet, urheilu, juhlapäivät. Generaattori valitsee automaattisesti sopivat kuvat teemasta.

Tai selaa yksittäisiä kuvia täydelle kontrollille. Haku auttaa löytämään tarkalleen oikeat kuvat. Valitse aloituskuva, lopetuskuva, polkukuvat. Lisää häiriökuvia haastavuuden lisäämiseksi.

Lataa omia kuvia personointiin. Käytä oppilaittesi valokuvia. Lisää luokkahuoneen esineitä. Tee tehtävistä merkityksellisiä lapsillesi. Parempi sitoutuminen tunnetuilla kuvilla.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Muokkaa Asetuksia - Kertotaulut Tulostettava ja Matematiikka Tehtävät Alakoulu',
        description: `Valitse sivun koko A4 tai Letter-muodossa. Pysty- tai vaakasuunta. Neliö 1200x1200 pikseliä. Tai määritä oma mukautettu koko. Kaikki standardikoot tuettu.

Säädä ruudukon kokoa vaikeustasolle. 12x12 helppoon alkuun. 13x13 keskivaikeaan. 14x14 tai 15x15 haastavampaan tehtävään. Suurempi ruudukko tarkoittaa pidempää polkua.

Klassinen sokkelo -tilassa säädä keräiltävien kuvien määrä. 1-4 erilaista kuvaa sokkelossa. Aseta minimi- ja maksimimäärät kopioille. Muokkaa seinien väriä ja paksuutta. Säädä läpinäkyvyyttä halutun ilmeen saavuttamiseksi.

Lisää nimi ja päivämäärä -kentät halutessasi. Hyödyllinen luokkahuonetyöskentelyyn. Oppilaat kirjoittavat nimensä ennen aloittamista.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä - Esiopetus Materiaali Ilmainen ja Hienomotoriikka Harjoitukset',
        description: `Klikkaa Generoi-painiketta. Tehtävä luodaan välittömästi. Ei odottelua. Ei latauspalkkia. Valmis muutamassa sekunnissa.

Generaattori luo automaattisesti toimivan polun. Polku kulkee alusta loppuun ilman umpikujia. Klassinen sokkelo -tilassa sokkelo on aina ratkaistavissa. Valitse oikea polku -tilassa vain yksi polku vie määränpäähän.

Esikatsele tehtävä välittömästi pohjalla. Näe tarkalleen miltä tulostettu versio näyttää. Tarkista että kaikki kuvat ovat oikein. Varmista että vaikeustaso sopii oppilaillesi.

Jos et ole tyytyväinen, klikkaa Generoi uudelleen. Uusi ulkoasu sekunnissa. Kokeile eri kuvayhdistelmiä. Säädä asetuksia ja generoi uudelleen. Rajaton määrä yrityksiä sisältyy tilaukseen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Lukemaan Oppiminen Tehtävät ja Kirjaimet Harjoittelu Esikoulu',
        description: `Kaikki pohjalla on täysin muokattavissa. Raahaa kuvia uusiin paikkoihin. Kierrä haluamaasi kulmaan. Skaalaa suuremmaksi tai pienemmäksi. Poista ei-toivotut elementit Delete-näppäimellä.

Lisää tekstielementtejä ohjeiden antamiseen. Kirjoita "Aloita tästä" tai "Loppu". Lisää kysymyksiä tai vihjeitä. Muuta fonttia, kokoa ja väriä. Neljä lapsille sopivaa fonttia saatavilla.

Lisää taustakuva luodaksesi teeman. Valitse yli 100 valmiista taustasta. Säädä läpinäkyvyyttä jotta tehtävä pysyy luettavana. Lisää reunateema visuaaliseen kiinnostavuuteen.

Kumoa-painike peruuttaa virheet. Kokeile rohkeasti eri asetteluja. Ei pelkoa pilata tehtävää. Aina mahdollista palata takaisin.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Matematiikka Tehtävät Alakoulu ja Yhteenlasku ja Vähennyslasku Tehtävät PDF',
        description: `Klikkaa Lataa-painiketta valmiin tehtävän saamiseksi. Valitse PDF täydelliseen laatuun. Valitse JPEG yleiseen yhteensopivuuteen. Molemmat 300 DPI ammattilaislaadussa.

PDF-muoto säilyttää terävät reunat. Ihanteellinen tulostukseen. Ihanteellinen myyntiin verkossa. Tekstit pysyvät terävinä kaikissa kokoissa.

JPEG-muoto toimii kaikkialla. Helppo jakaa sähköpostilla. Helppo ladata oppimisalustoille. Toimii kaikissa laitteissa.

Valitse harmaasävy säästääksesi mustetta. Erityisen hyödyllinen luokkahuoneessa. Tulosta kymmeniä kopioita taloudellisesti. Vähennetyt tulostuskustannukset 60-80 prosenttia.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish picture-path.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuvapolkutehtävät palvelevat laajaa käyttäjäkuntaa. Esiopetuksen opettajat alakoulun opettajiin. Kotiopettajat kielenopettajiin. Erityisopettajat opettajayrittäjiin. Jokainen löytää arvoa tälle työkalulle.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish picture-path.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Vastaukset yleisimpiin kysymyksiin kuvapolkutehtävistä. Hinnoittelusta ominaisuuksiin. Käytöstä räätälöintiin. Kaikki mitä tarvitset tietää ennen aloittamista.',
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
      'Rajoittamaton tehtävien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Kaikki 33 generaattoria',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvapolkutehtävät näihin täydentäviin generaattoreihin.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default picturePathFiContent;
