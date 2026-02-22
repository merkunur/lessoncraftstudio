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
    keywords: 'matematiikkapulma generaattori, laskupulma lapsille, matemaattinen ongelmanratkaisu, ajattelupeli matematiikka, lukupulma harjoitus, matemaattinen logiikka, päässälaskuharjoitus, matemaattinen haaste, kriittinen ajattelu matematiikka, numeropulma tulostettava, matemaattinen päättelytaito, matematiikkapulmat lapsille, matemaattiset ongelmanratkaisut',
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
    items: [
      {
        id: '1',
        icon: '🧩',
        title: 'Visuaalinen yhtälöpulmamuoto',
        description: 'Jokainen pulmatehtävä yhdistää kuvapohjaisen palapelin ja matemaattiset yhtälöt. Oppilaat ratkaisevat laskutehtäviä löytääkseen oikeat lukuarvot kuville. Yhdistää visuaalisen oppimisen ja matemaattisen harjoittelun.',
      },
      {
        id: '2',
        icon: '📐',
        title: 'Säädettävä ruudukkokoko 2×2–4×4',
        description: 'Valitse ruudukon koko oppilaiden taitotason mukaan. 2×2 ruudukko sopii esikoululaisille yksinkertaisilla laskuilla. 3×3 ja 4×4 ruudukot haastavat vanhempia oppilaita monimutkaisemmilla yhtälöillä.',
      },
      {
        id: '3',
        icon: '➕',
        title: 'Yhteenlasku, vähennyslasku ja sekalaskut',
        description: 'Valitse laskutyyppi oppilaiden harjoittelutarpeen mukaan. Yhteenlasku peruslaskujen harjoitteluun. Vähennyslasku vaikeampaan harjoitteluun. Sekalaskut yhdistävät molemmat monipuoliseen harjoitteluun.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa pulmiin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta matemaattisten pulmien luomiseen. Kuva toistuu kaikissa ruudukon soluissa eri laskutehtävillä. Teemapohjaiset pulmat motivoivat oppilaita.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen pulmatehtävä generoi automaattisesti vastausavaimen, jossa kaikki vastaukset näkyvät. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää tekstejä ja ohjeita. Ammattimaiset muokkaustyökalut.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä matematiikkapulmia verkossa. Luo temaattisia laskupulmapaketteja myytäväksi. Ei attribuutiovaatimuksia.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo matematiikkapulmia 11 kielellä. Käyttöliittymä kääntyy valitulle kielelle. Matematiikka on universaali kieli, mutta ohjeet ovat suomeksi.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Laskutaidon perusteet visuaalisilla pulmilla',
        description: 'Luo 2×2 pulmia yksinkertaisilla yhteenlaskuilla summilla 10 asti. Esiopetuksen oppilaat harjoittelevat laskemista motivoivassa pulmamuodossa. Tukee POPS 2014 matemaattisen ajattelun tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Laskusujuvuuden kehittäminen 1.–3. luokalla',
        description: 'Generoi 3×3 ja 4×4 pulmia yhteenlaskuilla ja vähennyslaskuilla. Oppilaat kehittävät laskusujuvuutta visuaalisessa ongelmanratkaisukontekstissa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja laskuharjoituksia kotiin',
        description: 'Luo temaattisia laskupulmia lasten suosikkiaiheilla. Pulmamuoto motivoi lapsia harjoittelemaan laskemista. Generoi viikon tehtävät nopeasti.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kielirajat ylittävä matematiikkaharjoittelu',
        description: 'Matematiikkapulmat eivät vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Numerot ja kuvia ovat universaaleja. Ohjeet kääntyvät 11 kielelle.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt laskuharjoitukset',
        description: 'Säädä ruudukon kokoa ja laskutyyppiä HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja yksinkertaiset laskut tukevat heikompia oppilaita. Visuaalinen muoto motivoi oppimista.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy laskupulmapaketteja',
        description: 'Luo teemallisia matematiikkapulmakokoelmia myytäväksi verkossa. Matemaattiset pulmat ovat jatkuvasti kysyttyjä. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten matematiikkapulmageneraattori toimii?',
        answer: 'Generaattori luo ruudukon, jossa kuva toistuu jokaisessa solussa eri laskutehtävällä. Oppilaat ratkaisevat laskut ja löytävät oikeat vastaukset. Jokainen pulma sisältää vastausavaimen.',
      },
      {
        id: '2',
        question: 'Mitkä laskutoimitukset ovat saatavilla?',
        answer: 'Kolme vaihtoehtoa: yhteenlasku, vähennyslasku ja sekalaskut (molemmat). Valitse oppilaiden harjoittelutarpeen mukaan. Sekalaskut tarjoavat monipuolisimman harjoittelun.',
      },
      {
        id: '3',
        question: 'Mitkä ruudukkokoot ovat saatavilla?',
        answer: '2×2 (4 laskua), 3×3 (9 laskua) ja 4×4 (16 laskua). Pienempi ruudukko sopii nuoremmille. Suurempi ruudukko haastaa vanhempia oppilaita.',
      },
      {
        id: '4',
        question: 'Sisältävätkö pulmat vastausavaimet?',
        answer: 'Kyllä, jokainen pulma generoi automaattisesti vastausavaimen, jossa kaikki vastaukset näkyvät. Tulosta vastausavain erikseen tarkistusta varten.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille matematiikkapulmat sopivat?',
        answer: 'Matematiikkapulmat palvelevat 5–10-vuotiaita. Esikoululaiset harjoittelevat 2×2 pulmilla summilla 10 asti. 1.–3. luokan oppilaat ratkaisevat suurempia pulmia laajemmilla lukualueilla.',
      },
      {
        id: '6',
        question: 'Miten lukualuetta säädetään?',
        answer: 'Lukualue mukautuu automaattisesti ruudukon koon ja laskutyypin mukaan. 2×2 ruudukko käyttää pieniä lukuja. 4×4 ruudukko käyttää suurempia lukuja.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Kuva toistuu kaikissa ruudukon soluissa eri laskutehtävillä.',
      },
      {
        id: '8',
        question: 'Miten tulostan matematiikkapulmat?',
        answer: 'Lataa PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää mustetta.',
      },
      {
        id: '9',
        question: 'Sopivatko matematiikkapulmat erityisopetukseen?',
        answer: 'Kyllä, säädettävä vaikeustaso tekee pulmista erinomaisia erityisopetukseen. Pienet ruudukot ja yksinkertaiset laskut tukevat heikompia oppilaita motivoivassa muodossa.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden matematiikkapulman luominen vie alle 3 minuuttia. Valitse kuva ja asetukset nopeasti. Generaattori luo pulman välittömästi.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani matematiikkapulmia?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy temaattisia laskupulmapaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten matematiikkapulmat tukevat POPS 2014 tavoitteita?',
        answer: 'Matematiikkapulmat tukevat laskusujuvuuden, ongelmanratkaisun ja matemaattisen ajattelun kehittämistä. POPS 2014 korostaa matematiikan yhteyksiä arkielämään ja motivoivien työtapojen käyttöä.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        slug: 'yhteenlasku-tyoarkit',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhteenlaskutehtävät täydentävät matematiikkapulmia perinteisellä laskuharjoittelulla. Oppilaat harjoittelevat samoja laskufaktoja eri muodoissa.',
      },
      {
        id: '2',
        slug: 'vahennyslasku-tyoarkit',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Vähennyslaskutehtävät laajentavat pulmia vähennyslaskuoperaatioihin. Molemmat kehittävät laskusujuvuutta.',
      },
      {
        id: '3',
        slug: 'matematiikka-tyoarkit',
        name: 'Matematiikkamonisteet',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Matematiikkamonisteet tarjoavat perinteisen laskuharjoittelun. Yhdistä pulmiin monipuoliseen matemaattiseen harjoitteluun.',
      },
      {
        id: '4',
        slug: 'kuva-yhteenlasku-tyoarkit',
        name: 'Kuva-yhteenlasku',
        category: 'Matematiikka',
        icon: '🖼️',
        description: 'Kuva-yhteenlasku yhdistää kuvasymbolit ja yhteenlaskun. Molemmat käyttävät visuaalista muotoa matemaattisessa kontekstissa.',
      },
      {
        id: '5',
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske yhdistää visuaalisen etsinnän ja laskemisen. Täydentää matematiikkapulmia eri muodossa.',
      },
      {
        id: '6',
        slug: 'kuvakaavio-tyoarkit',
        name: 'Kuvakaavio',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Kaaviotehtävät laajentavat kuvapohjaista matematiikkaa tiedonkäsittelyn suuntaan. Molemmat kehittävät matemaattista ajattelua.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 176) ------------------------------------

  aiOverviewSnippet: 'Matematiikkapulma-generaattori on verkkotyokalu, jolla luodaan tulostettavia visuaalisia laskupulmatehtavia esiopetukseen ja alakouluun. Oppilaat ratkaisevat yhteenlasku- ja vahennyslaskutehtavia kuvapohjaisten pulmien sisalla. Opettajat valitsevat ruudukon koon, laskutyypin ja teemakuvan, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Tehtävämuoto',
      ourApp: 'Visuaalinen yhtälöpulma kuvilla',
      typical: 'Pelkät numerotehtävät',
    },
    {
      feature: 'Laskutyypit',
      ourApp: 'Yhteenlasku, vähennyslasku ja sekalaskut',
      typical: 'Yksi laskutyyppi',
    },
    {
      feature: 'Ruudukkokoko',
      ourApp: '2×2–4×4 säädettävästi',
      typical: 'Kiinteä muoto',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
      typical: 'Lisämaksu',
    },
    {
      feature: 'Kielituki',
      ourApp: '11 kieltä mukaan lukien suomi',
      typical: 'Vain englanti',
    },
  ],

  researchBacking: [
    {
      claim: 'Visuaalinen matemaattinen pulmamuoto kehittää laskusujuvuutta ja matemaattista itseluottamusta erityisesti oppilailla, joilla on vaikeuksia perinteisten laskutehtävien kanssa.',
      source: 'Aunio, P. & Räsänen, P., "Matemaattiset oppimisvaikeudet ja niiden tukeminen," Niilo Mäki Instituutti',
    },
    {
      claim: 'Kuvapohjaiset laskutehtävät lisäävät oppilaiden sisäistä motivaatiota matematiikan harjoitteluun, mikä johtaa pitkäjänteisempään harjoitteluun ja parempiin oppimistuloksiin.',
      source: 'Lehtinen, E. & Hannula-Sormunen, M., "Matemaattisen oppimisen motivaatio," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Matematiikkapulmat ovat muuttaneet luokkani suhtautumisen laskemiseen. Oppilaat kokevat ratkaisevansa hauskoja pulmia eivatkaa huomaa harjoittelevansa yhteenlaskua. Motivaatio ja laskusujuvuus ovat parantuneet huomattavasti.',
      name: 'Nina Parviainen',
      role: '1. luokan opettaja',
      school: 'Haagan koulu, Helsinki',
    },
    {
      quote: 'Kaytan matematiikkapulmia eriyttamiseen. 2x2 ruudukot sopivat heikommille oppilaille ja 4x4 ruudukot haastavat edistyneita. Kaikki oppilaat ratkaisevat samantyyppisiä tehtavia omalla tasollaan.',
      name: 'Tomi Koivunen',
      role: '2. luokan opettaja',
      school: 'Karjulan koulu, Joensuu',
    },
  ],

  tips: {
    sectionTitle: 'Matematiikkapulmastrategiat luokka-asteittain',
    sectionDescription: 'Säädä matematiikkapulma-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset ruudukon koon, laskutyypin ja lukualueen esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: 2×2 pulmat yksinkertaisilla yhteenlaskuilla',
        description: 'Kaytta 2x2 ruudukkoa yhteenlaskuilla summilla 5 asti. Esikoululaiset harjoittelevat laskemista motivoivassa pulmamuodossa. Neljan solun pulma on hallittava mutta haastava aloittelijoille.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: 2×2 pulmat summilla 10 asti',
        description: 'Luo 2x2 pulmia yhteenlaskuilla summilla 10 asti. Esiopetuksen oppilaat kehittavat laskusujuvuutta visuaalisessa kontekstissa. Tukee POPS 2014 matemaattisen ajattelun kehittamista.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: 3×3 pulmat yhteenlaskuilla ja vähennyslaskuilla',
        description: 'Generoi 3x3 pulmia yhteenlaskuilla ja vahennyslaskuilla summilla 20 asti. Ekaluokkalaiset kehittavat laskusujuvuutta ja strategista ajattelua yhdeksansolun pulmilla.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: 3×3–4×4 pulmat sekalaskuilla',
        description: 'Luo 3x3 tai 4x4 pulmia sekalaskuilla suuremmilla lukualueilla. Toisluokkalaiset harjoittelevat joustavaa laskemista ja ongelmanratkaisua vaativammilla pulmilla.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: 4×4 haastavat laskupulmat',
        description: 'Kaytta 4x4 ruudukkoa sekalaskuilla laajalla lukualueella. Kolmasluokkalaiset ratkaisevat vaativia kuudentoista solun pulmia itsenaisesti. Tehtavat kehittavat matemaattista ajattelua ja ongelmanratkaisua.',
      },
    ],
  },
};

export default mathPuzzleFiContent;
