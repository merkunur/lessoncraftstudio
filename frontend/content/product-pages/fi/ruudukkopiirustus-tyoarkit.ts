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
    title: 'Ruudukkopiirustus Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia ruudukkopiirustustehtäviä. Piirrä kuvioita ruutuihin mallin mukaan ja väritä. Kehittää visuaalista hahmotusta. Esikoulusta 3. luokalle.',
    keywords: 'ruudukkopiirustus generaattori, ruudukkokopiointi tehtävä, koordinaatisto harjoitus, symmetria piirtäminen, visuospatiaalinen harjoitus, pikseligrafiikka lapsille, piirtäminen mallin mukaan, avaruudellinen hahmottaminen, tarkkuuspiirustus lapset, ruudukkotaide harjoitus, visuaalinen tarkkuus, ruudukkopiirustus tehtävät, pikselipiirustus lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/ruudukkopiirustus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish draw-and-color.md
  hero: {
    title: 'Ruudukkopiirustus Generaattori',
    subtitle: 'Piirrä ja Väritä Kuvioita Ruudukkoon Mallin Mukaan',
    description: `Luo ammattimaisia ruudukkopiirustustehtäviä värityskuvia lapsille tulostettava -generaattorillamme. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä -maksuja. Generoi mukautettuja tulostettavat tehtävät lapsille ilmainen, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Ruudukkopiirustustehtävät yhdistävät taiteen, matematiikan ja hienomotoriikan kehittämisen yhdessä sitouttavassa aktiviteetissa. Oppilaat tarkastelevat vihjepikseleitä ja luovat piirustuksen uudelleen värittämällä vastaavat ruudut tyhjään ruudukkoon. Tämä opettaa ruudukkokoordinaatteja, hahmontunnistusta ja tarkkuutta.

Ruudukkopiirustustehtävämme on suunniteltu erityisesti esiopetukseen ja alakoulun ensimmäisille luokille. Tehtävät kehittävät visuaalista hahmotuskykyä, hienomotorisia taitoja ja keskittymiskykyä. Säädä vaikeustasoa helposti muuttamalla vihjepikselien määrää - vähemmän vihjeitä tekee tehtävästä haastavamman.

Generaattori luo kaksi vierekkäistä ruudukkoa: viheruudukko paljastaa osan kuvasta pikselöitynä, ja piirustusruudukko on tyhjä oppilaan täytettäväksi. Oppilas kopioi mallin värittämällä oikeat ruudut. Tämä kehittää koordinaattien ymmärtämistä, spatiaalista päättelyä ja visuomotorisia taitoja.`,
    previewImageSrc: '/samples/finnish/draw and color/sample-1.jpeg',
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
        videoId: '1uZubAOGIkM',
        buttonText: 'Ruudukkopiirustus Toiminnot',
        modalTitle: 'Ruudukkopiirustus Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/draw and color/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävä',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish draw-and-color.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Ruudukkopiirustustehtävien generaattorimme sisältää kaikki ominaisuudet, joita tarvitset ammattimaisten esiopetus materiaali ilmainen -tehtävien luomiseen. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin 33 tehtävägeneraattoriin sekä kaupallisen lisenssin. Luo tulostettavat tehtävät lapsille ilmainen, jotka sopivat täydellisesti hienomotoriikka harjoitukset -aktiviteetteihin.',
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

  // How-To Guide - FULL text from Finnish draw-and-color.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Ruudukkopiirustustehtävien luominen on yksinkertainen viisivaiheinen prosessi. Koko prosessi kestää alle 3 minuuttia alusta loppuun. Ei tarvitse suunnittelukokemusta tai teknisiä taitoja. Generaattori opastaa sinut jokaisen vaiheen läpi luodaksesi ammattilaatuisia esiopetus materiaali ilmainen -tehtäviä.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Tehtäväsi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö',
        description: `Aloita valitsemalla kuva ruudukkopiirustustehtävällesi. Sinulla on kolme vaihtoehtoa: valitse teema, selaa yksittäisiä kuvia tai lataa oma kuva.

Teemavalinnat tekevät sisällön valinnasta nopeaa. Klikkaa "Eläimet"-teema nähdäksesi kaikki eläinkuvat. Valitse "Ajoneuvot"-teema autoille ja junille. Yli 50 teemaa saatavilla kattaen kaikki aiheet esiopetus materiaali ilmainen -tehtäviin.

Yksittäinen kuvaselaus antaa tarkan kontrollin. Hae "kissa" nähdäksesi kaikki kissakuvat. Hae "puu" löytääksesi luontoaiheet. Hakutoiminto toimii kaikilla 11 kielellä. Hae suomeksi tai millä tahansa tuetulla kielellä.

Henkilökohtaiset kuvien lataukset personoivat tehtäviä. Lataa luokkahuoneen lemmikkieläimen kuva. Käytä koulun logoissa olevia kuvia. Luo tulostettavat tehtävät lapsille ilmainen käyttäen oppilaittesi suosikkihahmoja.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset',
        description: `Säädä ruudukon kokoa oppilaittesi taitotason mukaan. Pienempi ruudukko (3×3 tai 4×4) sopii nuoremmille lapsille. Suurempi ruudukko (9×9 tai 10×10) haastaa vanhempia oppilaita.

Vihjeprosentin säätäminen kontrolloi vaikeustasoa. 70-90% vihjeitä tekee tehtävästä helpomman esiopetusikäisille. 20-40% vihjeitä luo haastavan matematiikka tehtävät alakoulu -aktiviteetin.

Peilausasetukset luovat symmetrisiä kuvioita. Valitse vaakapeilaus vasemmasta oikealle symmetrialle. Valitse pystypeilaus ylhäältä alas symmetrialle.

Sivukoko vaikuttaa tulostuskokoon. Letter Portrait (8.5×11") on standardi Yhdysvalloissa. A4 Portrait (210×297mm) on standardi Euroopassa ja Suomessa.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä',
        description: `Klikkaa "Generoi Tehtävä" -nappia luodaksesi ruudukkopiirustustehtäväsi. Generaattori luo automaattisesti kaksi ruudukkoa: viheruudukko ja piirustusruudukko. Koko prosessi kestää sekunteja.

Viheruudukko näyttää pikselöidyn version kuvastasi. Valitut solut paljastettu oppilaalle kopioitavaksi. Paljastettujen solujen määrä vastaa vihjeprosentin asetustasi.

Piirustusruudukko on tyhjä oppilaan täytettäväksi. Samat ruudukon mitat kuin viheruudukko. Oppilas kopioi kuvion viheruudukosta piirustusruudukkoon.

Välitön esikatselu näyttää täsmälleen miltä tulostettu tehtävä näyttää. Ei yllätyksiä tulostuksen jälkeen. Näet tasan mitä oppilaat näkevät.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Generoidun tehtävän jälkeen kaikki on täysin muokattavissa pohjalla. Klikkaa mitä tahansa elementtiä valitaksesi sen. Kontekstinauha ilmestyy tarjoten muokkaustyökalut.

Lisää ohjeteksti esiopetusikäisille lapsille. Kirjoita "Kopioi kuvio alla olevaan ruudukkoon". Muuta fonttikokoa luettavuuden parantamiseksi. Valitse seitsemästä lapsille sopivasta fontista.

Siirrä elementtejä vedä ja pudota -toiminnolla. Aseta otsikko uuteen paikkaan. Keskitä ohjeteksti täydellisesti. Kohdistustyökalut helpottavat täydellistä asettelua.

Kumoa ja toista -nappit tallentavat 20 muokkausta. Tee rohkeita muutoksia tietäen, että voit peruuttaa. Kokeile erilaisia asetteluja.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa"-nappia avataksesi vientivalikot. Valitse PDF ammattilaatuisia tulostuksia varten. Valitse JPEG digitaalista jakamista varten. Molemmat formaatit viedään 300 DPI -laadulla.

PDF-vienti säilyttää vektorlaadun tekstille ja terävät reunat ruudukoille. Täydellinen tulostamiseen kotitulostimella. Täydellinen myyntiin Teachers Pay Teachers -palvelussa.

JPEG-vienti luo korkearesoluutioisen rasterikuvan. Helppo jakaa sähköpostilla tai Google Classroomissa. Yhteensopiva kaikkien laitteiden kanssa.

Harmaasävyvaihtoehto säästää mustetta tulostettaessa. Valitse ennen lataamista muuntaaksesi mustavalkoiseksi. Säilyttää kaikki yksityiskohdat käyttäen 70% vähemmän mustetta.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section - FULL text from Finnish draw-and-color.md
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Ruudukkopiirustustehtävägeneraattori palvelee laajaa käyttäjäkuntaa. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat, kieltenopettajat, erityisopettajat ja opettajayrittäjät kaikki hyötyvät. Jokainen käyttäjäryhmä löytää ainutlaatuisia tapoja käyttää esiopetus materiaali ilmainen -tehtäviä.',
    badgeText: 'Kenelle Soveltuu',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from Finnish draw-and-color.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät usein samoja kysymyksiä ruudukkopiirustustehtävägeneraattorista. Hinnoittelu, tulostaminen, mukautus ja käyttö ovat yleisimpiä aiheita.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Yhdistä ruudukkopiirustustehtävät muihin tehtävägeneraattoreihin kokonaisvaltaisten oppimispakettien luomiseen',
    badgeText: 'Yhteensopivat Sovellukset',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    ctaTitle: 'Valmis Aloittamaan?',
    ctaDescription: 'Luo ammattimaisia ruudukkopiirustustehtäviä alle 3 minuutissa. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin 33 tehtävägeneraattoriin.',
    primaryCtaText: 'Aloita Nyt',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    trustBadges: {
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section - Full Access (draw-and-color requires Full Access tier)
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Kaikki 33 tehtävägeneraattoria',
      'Ruudukkopiirustus sisältyy',
      'Kaupallinen lisenssi',
      '11 kielen tuki',
      '3000+ kuvan kirjasto',
      '300 DPI ammattilaatuinen vienti',
      'Rajattomat lataukset',
      'Täysi muokattavuus',
    ],
    ctaText: 'Tilaa Nyt',
    bundleDescription: 'Tilauksesi sisältää pääsyn kaikkiin 33 työarkkigeneraattoriin:',
    bundleApps: [
      'Kuvalaskut', 'Aakkosjuna', 'Iso vai pieni', 'Kuvabingo',
      'Kaaviot laske ja väritä', 'Koodiyhteenlasku', 'Värityssivut', 'Kuvasanaristikko',
      'Kuvakryptogrammi', 'Piirtäminen ja värittäminen', 'Viivojen piirtäminen', 'Etsi ja laske',
      'Etsi esineet', 'Ruudukkoyhdistäminen', 'Yhdistämispeli', 'Matematiikkapulma',
      'Matematiikkamonisteet', 'Puuttuvat palaset', 'Enemmän vai vähemmän', 'Mikä ei kuulu joukkoon',
      'Kuviojuna', 'Kuviomonisteet', 'Kuvapolku', 'Kuvien lajittelu',
      'Prepositiot', 'Varjopari', 'Vähennyslasku', 'Lasten sudoku',
      'Aarteenmetsästys', 'Arvaa sana', 'Sanojen sekoitus', 'Sanaristikko', 'Kirjoitusharjoitukset',
    ],
  },
};

export default drawAndColorFiContent;
