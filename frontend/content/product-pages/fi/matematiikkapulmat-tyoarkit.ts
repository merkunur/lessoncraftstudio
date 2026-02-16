import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - Finnish Content (Matematiikkapulmat Tehtävät)
 *
 * File: frontend/content/product-pages/fi/matematiikkapulmat-tyoarkit.ts
 * URL: /fi/apps/matematiikkapulmat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/math-puzzle.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Math Puzzle is a FULL ACCESS app ($240/year or $25/month)
 * Finnish: "Täysi Käyttöoikeus" = Full Access
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus"
 * - All UI labels in Finnish
 */

export const mathPuzzleFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'matematiikkapulmat-tyoarkit',
    appId: 'math-puzzle',
    title: 'Matematiikkapulma Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia matematiikkapulmia yhteenlaskun ja vähennyslaskun harjoitteluun. Ongelmanratkaisutaitoja kehittävät pulmat esikoulusta 3. luokalle.',
    keywords: 'matematiikkapulmat lapsille, matemaattiset ongelmanratkaisut, matikkapulma tulostettava, laskupulmat esikoulu, matemaattinen ajattelu, logiikkapulmat matematiikka, matematiikka pulmatehtävät, laskupulma vastausavain, ongelmanratkaisu matematiikka, matikkapulmat alakoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/matematiikkapulmat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish math-puzzle.md
  hero: {
    title: 'Matematiikkapulma Generaattori',
    subtitle: 'Kehitä Ongelmanratkaisutaitoja Matemaattisilla Pulmilla',
    description: `Luo ammattimaisia matemaattisia pulmatehtäviä yhteenlaskun ja vähennyslaskun harjoitteluun. Täysi Käyttöoikeus -tilauksesi (240 € vuodessa tai 25 € kuukaudessa) antaa rajattoman määrän tehtävien luomista ilman tehtäväkohtaisia maksuja. Generoi mukautettavia tulostettavia matematiikka tehtäviä alakoululaisille. Lataa korkealaatuiset PDF-tiedostot alle 3 minuutissa.

Matematiikkapulmat yhdistävät laskutehtävät visuaaliseen oppimiseen. Oppilaasi ratkaisevat yhteenlasku- ja vähennyslaskutehtäviä etsimällä oikeita lukuarvoja kuville. Jokaisessa pulmassa on 2×2 - 4×4 ruudukko. Kukin ruutu sisältää kuvan ja matemaattisen yhtälön. Oppilaat laskevat vastauksen ja yhdistävät sen oikeaan kuvaan.

Generaattori tukee esiopetuksesta 3. luokkaan. Valitse vaikeustaso säätämällä ruudukon kokoa ja laskutyyppiä. Käytä 3000+ lasten kuvakirjastoa. Lataa omat kuvat henkilökohtaista oppimista varten. Muokkaa kaikkea pohjalla olevalla editorilla. Jokaiselle tehtävälle luodaan automaattisesti vastausavain. Lataa sekä oppilastehtävä että opettajan vastausavain erikseen. Molemmat PDF- ja JPEG-muodoissa 300 DPI -tarkkuudella. Täysi Käyttöoikeus sisältää kaupalliset oikeudet. Myy tehtäviäsi Teachers Pay Teachers -palvelussa, Etsyssä tai Amazon KDP:ssä.`,
    previewImageSrc: '/samples/finnish/math puzzle/sample-1.jpeg',
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
        videoId: 'n5QO39Lq5l8',
        buttonText: 'Matematiikkapulmat Toiminnot',
        modalTitle: 'Matematiikkapulmat Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
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

  // Features Grid - FULL text from Finnish math-puzzle.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Matematiikkapulmageneraattori tarjoaa kattavan työkalusetin alakoulun matematiikan opetukseen. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin. Luo yhteenlasku ja vähennyslasku tehtäviä kolmella klikkauksella. Muokkaa jokaista elementtiä pohjalla. Lataa rajattomasti ammattimaisia PDF-tiedostoja.',
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

  // How-To Guide - FULL text from Finnish math-puzzle.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaisia matemaattisia pulmatehtäviä alle 3 minuutissa. Ei teknisiä taitoja tarvita. Ei suunnittelukokemusta vaadita. Seuraa näitä viittä yksinkertaista vaihetta. Generaattori tekee kaiken vaikean työn puolestasi.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Matematiikkapulmasi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Matematiikkapulmiin - Teemat, Kuvat tai Esiopetus Materiaali',
        description: `Aloita valitsemalla kuva pulmatehtävääsi varten. Generaattori käyttää yhtä kuvaa koko pulmassa. Kuva toistuu eri ruuduissa eri numeroarvoilla. Oppilaasi laskevat vastaukset ja etsivät kuvan jossa on oikea numero.

Valitse teema nopeaa luomista varten. Klikkaa "Eläimet" niin näet kaikki eläinkuvat. Klikkaa "Ruoka" niin näet kaikki ruokakuvat. Teemavalinta näyttää kymmeniä samankaltaisia kuvia. Täydellinen temaattisiin oppitunteihin.

Tai selaa yksittäisiä kuvia yksi kerrallaan. Vieritä läpi 3000+ kuvan kirjastoa. Jokainen kuva nimetty suomeksi. Helppo löytää juuri oikea kuva. Klikkaa kuvaa valitaksesi sen pulmaan.

Tai lataa omat kuvat henkilökohtaista oppimista varten. Klikkaa "Valitse ladattavat kuvat" -nappia. Selaa tietokoneesi kuvia. Valitse JPEG, PNG tai GIF -tiedosto.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset Yhteenlasku ja Vähennyslasku Tehtäviin - Kaikille Tasoille',
        description: `Valitse ruudukon koko oppilaittesi tasoon sopivaksi. Ruudukon koko määrittää vaikeustason. Pienempi ruudukko helpompi aloittelijoille. Suurempi ruudukko haastavampi kehittyneemmille oppilaille.

2×2 ruudukko täydellinen esikoululaisille. Vain neljä ruutua ratkottavaksi. Yksinkertaiset yhteenlaskut numeroilla 1-10. Loistava johdatus matemaattisiin pulmiin.

3×3 ruudukko sopii 1. ja 2. luokkalaisille. Yhdeksän ruutua monipuolisempaan harjoitteluun. Numerot laajentuvat 1-20 alueelle. Enemmän haasteita laskemiseen.

4×4 ruudukko haastaa 3. luokkalaisia. Kuusitoista ruutua täydellistä harjoittelua varten. Numeroalue laajenee 1-50 tai enemmän.

Valitse matemaattinen laskutoimitus. Klikkaa "Yhteenlasku" harjoitellaksesi yhteenlaskua. Klikkaa "Vähennyslasku" harjoitellaksesi vähennyslaskua. Tai klikkaa "Yhteenlasku ja vähennyslasku" sekoittaaksesi molemmat.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Matematiikkapulma - Välitön Esikatselu Matematiikka Tehtävät Alakoulu',
        description: `Klikkaa "Luo uusi tehtävä" -nappia. Generaattori laskee välittömästi kaikki matemaattiset yhtälöt. Luo numerot valitsemasi vaikeustason mukaan. Sijoittaa ne ruudukkoon loogisesti.

Pulmasi ilmestyy pohjalle alle sekunnissa. Näet täydellisen esikatselun välittömästi. Ei odotusaikaa. Ei latauspyöriä. Vain välitön tulos.

Generaattori varmistaa että jokainen pulma on ratkaistavissa. Kaikki numerot sopivat valittuun vaikeustasoon. Ei liian helppoja eikä liian vaikeita lukuja.

Tarkista tehtävä pohjalla. Näet ruudukon kaikkine yhtälöineen. Kuva näkyy jokaisessa ruudussa. Numerot selvästi näkyvillä.

Jos haluat erilaisen pulmatehtävän klikkaa "Luo uusi tehtävä" uudelleen. Generaattori luo täysin uuden pulmatehtävän uusilla numeroilla.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla Tulostettavat Tehtävät Lapsille - Täysi Muokkaus',
        description: `Muokkaa mitä tahansa pohjan elementtiä. Raahaa kuvia uusiin paikkoihin. Klikkaa kuvaa valitaksesi sen. Raahaa hiirellä uuteen paikkaan. Vapauta päivittääksesi sijainnin.

Säädä kuvien kokoa tarpeen mukaan. Klikkaa elementtiä valitaksesi sen. Vedä kulmakarkkoja suurentaaksesi tai pienentääksesi. Säilyttää kuvasuhteen automaattisesti.

Lisää tekstielementtejä ohjeita varten. Klikkaa "Lisää teksti" -nappia. Kirjoita ohjetekstisi suomeksi. Valitse fontti alakoululaisille sopivaksi.

Lisää taustateema visuaalista kiinnostavuutta varten. Klikkaa "Taustateema" -valikko. Selaa satoja taustoja. Klikkaa nähdäksesi esikatselun välittömästi.

Lisää reunusteema ammattimaiseen ulkoasuun. Valitse yli sadasta reunuksesta.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta Matematiikkapulmat - Ammattimainen PDF Esiopetus Materiaali',
        description: `Lataa tehtävä kun olet tyytyväinen siihen. Klikkaa "Lataa" -painiketta yläreunassa. Valitse muoto: JPEG tai PDF. Molemmat muodot 300 DPI ammattimaiseen laatuun.

Lataa JPEG nopeaa jakamista varten. Täydellinen sähköpostiliitteiksi. Jaa Google Classroomissa helposti. Lähetä vanhemmille kotitehtäviksi.

Lataa PDF ammattimaista tulostusta varten. PDF säilyttää täydellisen laadun. Ei pikselöintiä suurennettaessa. Täydellinen kaupalliseen tulostukseen.

Lataa vastausavain erikseen. Klikkaa "Vastausavain" -välilehti yläreunassa. Näet saman pulmatehtävän kaikilla vastauksilla näkyvillä. Lataa opettajan versio tarkistusta varten.

Tulosta tehtävä kotitulostimella. 300 DPI -laatu näkyy terävänä ja selkeänä. Tulostuu kauniisti tavalliselle paperille.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish math-puzzle.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Matematiikkapulmageneraattori palvelee monia käyttäjiä. Esiopetuksen opettajat rakentavat laskutaitoja. Alakoulun opettajat vahvistavat matematiikan perusteita. Kotiopettajat luovat monipuolisia oppimispaketteja. Täysi Käyttöoikeus -tilaus (240 € vuodessa) antaa rajattoman pääsyn.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish math-puzzle.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset matematiikkapulmageneraattorista ja matematiikkapulmatehtävistä.',
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
      'Rajoittamaton matematiikkapulmien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä matematiikkapulmat näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Matematiikkapulmia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia matematiikkapulmatehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default mathPuzzleFiContent;
