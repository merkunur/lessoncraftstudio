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
    keywords: 'sanahaku generaattori, sanaruudukko lapsille, kirjainten etsiminen, visuaalinen haku harjoitus, sanasto oppiminen peli, lukemisen tukiharjoitus, oikeinkirjoitus tunnistaminen, kirjaintunnistus peli, näkösanat harjoittelu, suomen kielen sanapeli, sanahaun ratkaiseminen, sanahaku tulostettava, sanahaku lapsille',
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
    items: [
      {
        id: '1',
        icon: '📝',
        title: 'Mukautettavat sanalistat',
        description: 'Kirjoita omat sanastosanat tai anna generaattorin poimia sanat valituista kuvista. Rakenna sanahakupulmia minkä tahansa aiheen, sanastolistan tai opetussuunnitelman yksikön ympärille. Yhdistä kirjoitetut sanat ja kuvapohjaiset sanat samaan pulmaan joustavasti.',
      },
      {
        id: '2',
        icon: '📐',
        title: 'Säädettävä ruudukon koko',
        description: 'Valitse ruudukon koko 5x5 esikoululaisille aina 30x30 edistyneille oppilaille. Aseta rivit ja sarakkeet erikseen. Pienempi ruudukko pitää pulmat hallittavina alkavalle lukijalle, suurempi ruudukko haastaa vanhempia oppilaita.',
      },
      {
        id: '3',
        icon: '🔀',
        title: 'Sanasuunnan hallinta',
        description: 'Ota käyttöön tai poista vaakasuorat, pystysuorat, viistot ja käänteissanat itsenäisesti. Yksinkertaista pulmia alkavalle lukijalle rajoittamalla pelkästään vaakasuoriin. Lisää viistoja ja käänteisiä suuntia asteittain oppilaiden kehittyessä.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa vihjeiksi',
        description: 'Selaa yli 3000 lapsiystavallista kuvaa koulutusaiheittain. Käytä kuvavihjeitä sanalistojen sijaan, jotta esiopetuksen oppilaat ja S2-oppilaat voivat osallistua. Oppilas tunnistaa kuvan ja etsii vastaavan sanan kirjainruudukosta.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset värikoodatut vastausavaimet',
        description: 'Jokainen sanahakupulma tuottaa automaattisesti värikoodatun vastausavaimen. Jokainen piilotettu sana korostetaan omalla värillään näyttäen tarkan sijainnin ja suunnan. Opettajat tarkistavat oppilastyöt sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Muokkaustyökalu tehtävien kustomointiin',
        description: 'Klikkaa mitä tahansa elementtiä muokataksesi sitä suoraan. Siirrä, skaalaa, kierrä tai poista pulman osia. Lisää mukautettua tekstiä, vaihda fontteja ja värejä, lataa taustakuvia ja lisää koristeellisia kehyksiä.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää täydet kaupalliset oikeudet myydä sanahakutehtäviä verkossa. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja. Rakenna kannattava pulmakokoelmien liiketoiminta.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki sanastoharjoitteluun',
        description: 'Luo sanahakupulmia 11 kielellä mukaan lukien suomi, ruotsi, norja ja tanska. Vaihda kieltä luodaksesi monikielisiä pulmia, jotka yhdistävät kotikielen ja kohdekielen sanastoa. Täydellinen S2-opetukseen ja kielikylpyohjelmiin.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Pienet ruudukot ja kuvavihjeet alkavalle lukijalle',
        description: 'Luo pieniä 5x5 tai 8x8 ruudukoita vaakasuoralla sanasijoittelulla ja kuvavihjeinä. Esiopetuksen oppilaat tunnistavat kuvia ja etsivät 3–4 kirjaimen sanoja. Täydellinen lukemisvalmiuden ja kirjaintuntemuksen kehittämiseen POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '2',
        icon: '📖',
        title: 'Alakoulun opettajat',
        subtitle: 'Sanastoharjoittelu opetussuunnitelman mukaisesti',
        description: 'Generoi sanastoharjoituspulmia viikon sanalistojen ja lukuyksiköiden mukaan. Käytä 10x15 ruudukoita viistoilla sanoilla 1.–2. luokalle. Luo teemallisia sanahakuja, jotka yhdistävät ympäristöopin, äidinkielen ja matematiikan sanastoa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Teemapaketteja minuuteissa',
        description: 'Rakenna teemallisia oppimispaketteja sanahakupulmilla. Yhdistä eläin-, luonto- tai vuodenaikateemoja useissa tehtävätyypeissä. Generoi koko viikon sanastoharjoittelun 15 minuutissa mukautettavalla vaikeustasolla.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Monikieliset pulmat 11 kielellä',
        description: 'Luo sanahakupulmia 11 kielellä rakentaaksesi visuaalista sanastoa suomi toisena kielenä -oppijoille. Kuvavihjeet tarjoavat yleisen kontekstin samalla kun piilotetut sanat vahvistavat kohdekielen oikeinkirjoitusta.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävä vaikeustaso jokaiselle oppijalle',
        description: 'Säädä ruudukon kokoa, sanamäärää ja suuntavaihtoehtojen monimutkaisuutta jokaisen oppilaan lukutason mukaan. Pienet ruudukot vaakasuorilla sanoilla tukevat heikompia lukijoita. Visuaalinen etsintä vahvistaa kirjaintuntemusta oppimisen tuen piirissä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy pulmakokoelmia kaupallisella lisenssillä',
        description: 'Luo teemallisia sanahakukokoelmia myytäväksi verkossa. Vuodenaikojen, juhlapäivien ja opetussuunnitelman mukaiset pulmapaketit myyvät tasaisesti. Kaupallinen lisenssi kattaa rajattomat myynnit ilman attribuutiovaatimuksia.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten sanahakugeneraattori luo pulmia kuvista?',
        answer: 'Generaattori muuntaa kuvavihjeet automaattisesti piilotetuksi sanapulmaksi. Valitse teema kuten eläimet tai ruoka, ja sovellus tunnistaa jokaisen kuvan, sijoittaa vastaavan sanan ruudukkoon ja täyttää ympäröivät ruudut satunnaisilla kirjaimilla. Oppilaat katsovat kuvavihjeitä ja etsivät vastaavan sanan ruudukosta.',
      },
      {
        id: '2',
        question: 'Mitä ruudukon kokoja on saatavilla?',
        answer: 'Sanahakutehtävät tukevat ruudukon kokoja 5x5:stä aina 30x30:een. Pienemmät ruudukot kuten 5x5 tai 8x8 sopivat parhaiten esiopetuksen oppilaille. Keskikokoiset 10x15 ruudukot sopivat 1.–2. luokan sanastoharjoitteluun. Suuremmat ruudukot haastavat vanhempia oppilaita.',
      },
      {
        id: '3',
        question: 'Voivatko sanahakupulmat sisältää viistoja ja käänteisiä sanoja?',
        answer: 'Kyllä, voit hallita sanasuuntia jokaisessa pulmassa. Ota käyttöön vaakasuora, pystysuora, viisto ja käänteinen sanasijoittelu itsenäisesti. Esiopetuksen tehtävissä käytetään yleensä vain vaakasuoria ja pystysuoria sanoja. Alakoulun tehtäviin lisätään viistoja sanoja lisähaasteeksi.',
      },
      {
        id: '4',
        question: 'Kuinka monta sanaa mahtuu yhteen sanahakutehtävään?',
        answer: 'Sanamäärä riippuu ruudukon koosta ja sanojen pituudesta. 10x10 ruudukko sisältää mukavasti 8–12 sanaa. 15x15 ruudukko sopii 12–20 sanalle. Generaattori optimoi sanojen sijoittelun automaattisesti välttäen päällekkäisyyksiä.',
      },
      {
        id: '5',
        question: 'Sisältääkö generaattori vastausavaimet?',
        answer: 'Jokainen sanahakutehtävä generoi täydellisen vastausavaimen automaattisesti. Vastausavain korostaa kaikki piilotetut sanat värikoodatuin merkinnein näyttäen tarkat sijainnit ja suunnat. Opettajat voivat tulostaa vastausavaimen erikseen tai näyttää sen dokumenttikameralla.',
      },
      {
        id: '6',
        question: 'Mille ikäryhmille sanahakutehtävät sopivat?',
        answer: 'Sanahakutehtävät palvelevat 4–12-vuotiaita useilla taitotasoilla. Esikouluikäiset 4–5-vuotiaat käyttävät pieniä ruudukoita yksinkertaisilla sanoilla. Esiopetuksen ja 1. luokan oppilaat harjoittelevat sanastoa keskikokoisissa ruudukoissa. 2.–3. luokan oppilaat ratkaisevat haastavia pulmia.',
      },
      {
        id: '7',
        question: 'Sopivatko sanahakutehtävät esiopetukseen?',
        answer: 'Sanahakutehtävät sopivat erinomaisesti esiopetukseen oikein asetuksin. Käytä 5x5 tai 8x8 ruudukoita pelkällä vaakasuoralla sijoittelulla. Valitse 3–5 kirjaimen sanoja POPS 2014 äidinkielen tavoitteiden mukaisesti. Kuvavihjeet mahdollistavat osallistumisen ilman itsenäistä lukutaitoa.',
      },
      {
        id: '8',
        question: 'Voiko tehtäviä luoda useilla kielillä?',
        answer: 'Generaattori luo pulmia 11 kielellä mukaan lukien suomi, ruotsi, norja, tanska, englanti, saksa, ranska ja espanja. Vaihda kieltä luodaksesi sanastopulmia millä tahansa tuetulla kielellä. S2-opettajat hyödyntävät monikielisiä pulmia kotikielen ja kohdekielen yhdistämiseen.',
      },
      {
        id: '9',
        question: 'Miten tulostan sanahakutehtävät kotona?',
        answer: 'Lataa sanahakutehtäväsi korkealaatuisena PDF-tiedostona. Valitse A4 tai Letter-sivukoko ennen lataamista. Kaikki tehtävät ovat 300 DPI resoluutiolla terävän tekstin ja selkeiden ruudukkoviivojen varmistamiseksi. Harmaasävyvaihtoehto säästää värimustetta.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden sanahakutehtävän luominen kestää?',
        answer: 'Yhden sanahakutehtävän luominen vie noin 2–3 minuuttia. Valitse teema ja kuvat 30 sekunnissa. Määritä ruudukon koko ja suunnat 20 sekunnissa. Generaattori rakentaa pulman välittömästi. Useimmat opettajat luovat koko viikon sanahakuharjoitukset 15 minuutissa.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani sanahakutehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin sanahakutehtävien myyntiin verkossa. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja. Luo luokkahuonekelpoisia sanahakuja ja myy niitä digitaalisina latauksina.',
      },
      {
        id: '12',
        question: 'Miten sanahakutehtävät tukevat POPS 2014 opetussuunnitelmaa?',
        answer: 'Sanahakutehtävät tukevat äidinkielen ja kirjallisuuden (AI) tavoitteita sanavaraston laajentamisessa, oikeinkirjoituksen harjoittelussa ja sanan tunnistamisessa. Opettajat kohdistavat sanastoa lukuyksiköistä, ympäristöopin aiheista tai teemakokonaisuuksista. Kuvavihjeet tukevat visuaalisia oppijoita POPS 2014 eriytettämisperiaatteiden mukaisesti.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        slug: 'sanansekoitus-tyoarkit',
        name: 'Sanansekoitus',
        category: 'Äidinkieli',
        icon: '🔤',
        description: 'Yhdistä sanahakupulmat sanansekoitustehtäviin kaksinkertaiseen sanastoharjoitteluun. Oppilaat etsivät piilotettuja sanoja yhdessä pulmassa ja sekoittavat samoja sanoja toisessa.',
      },
      {
        id: '2',
        slug: 'kuva-arvaus-tyoarkit',
        name: 'Kuva-arvaus',
        category: 'Äidinkieli',
        icon: '❓',
        description: 'Yhdistä sanahaut täytä-puuttuva-kirjain -tehtäviin kattavaan oikeinkirjoitusharjoitteluun. Oppilaat tunnistavat sanoja ruudukossa ja tuottavat puuttuvia kirjaimia toisessa tehtävässä.',
      },
      {
        id: '3',
        slug: 'ristisanatehtavat-tyoarkit',
        name: 'Ristisanatehtävät',
        category: 'Äidinkieli',
        icon: '➕',
        description: 'Luo kattavia sanastopaketteja lisäämällä ristisanatehtäviä sanahakujen rinnalle. Oppilaat kohtaavat samat teemasanat eri tehtävämuodoissa, mikä vahvistaa muistiin painamista.',
      },
      {
        id: '4',
        slug: 'aakkosjuna-tyoarkit',
        name: 'Aakkosjuna',
        category: 'Varhaiskasvatus',
        icon: '🚂',
        description: 'Yhdistä sanahakupulmat aakkosjärjestysharjoituksiin varhaisen lukutaidon paketteihin. Esiopetuksen oppilaat harjoittelevat kirjaintuntemusta sanahauissa ja vahvistavat aakkosjärjestystä juna-tehtävillä.',
      },
      {
        id: '5',
        slug: 'kuvakryptogrammi-tyoarkit',
        name: 'Kuvakryptogrammi',
        category: 'Äidinkieli',
        icon: '🔐',
        description: 'Haasta edistyneempiä oppilaita kryptogrammi-koodinmurtoharjoituksilla sanahakupulmien rinnalla. Molemmat muodot kehittävät hahmontunnistusta ja kirjainanalyysiä eri konteksteissa.',
      },
      {
        id: '6',
        slug: 'yhdista-parit-tyoarkit',
        name: 'Yhdistä parit',
        category: 'Sanasto',
        icon: '🔗',
        description: 'Lisää kuva-sana-yhdistämistehtäviä täydentämään sanahakujen sanastoharjoittelua. Oppilaat yhdistävät kuvia sanoihin yhdessä tehtävässä ja etsivät samoja sanoja toisessa.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 174) ------------------------------------

  aiOverviewSnippet: 'Sanahakugeneraattori on verkkotyokalu, jolla luodaan tulostettavia kirjainruudukko-pulmia mukautetuista sanalistoista tai teemakuvavihjeista. Opettajat valitsevat ruudukon koon, sanasuunnat ja vaikeustason, ja lataavat valmiin PDF-tehtavan automaattisella varikoodatulla vastausavaimella alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Ruudukon joustavuus',
      ourApp: '5x5 – 30x30, itsenäinen rivi/sarake-hallinta',
      typical: 'Kiinteät ruudukkokoot (10x10 tai 15x15)',
    },
    {
      feature: 'Sanasuunnat',
      ourApp: 'Vaakasuora, pystysuora, viisto, käänteinen erikseen',
      typical: 'Kaikki suunnat aina päällä',
    },
    {
      feature: 'Kuvavihjeet',
      ourApp: '3000+ teemakuvaa visuaalisina vihjeinä',
      typical: 'Vain tekstipohjaiset sanalistat',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen värikoodattu avain joka pulmaan',
      typical: 'Manuaalinen tai lisämaksullinen',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
      typical: 'Lisämaksu tai ei saatavilla',
    },
    {
      feature: 'Kielituki',
      ourApp: '11 kieltä mukaan lukien suomi',
      typical: 'Vain englanti',
    },
  ],

  researchBacking: [
    {
      claim: 'Sanahakuharjoitukset vahvistavat sanantunnistusta ja visuaalista etsintää vaatimalla oppilaita tunnistamaan tarkkoja kirjainsarjoja häiriötekijöiden joukosta, mikä rakentaa ortografista prosessointisujuvuutta.',
      source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY',
    },
    {
      claim: 'Sanavaraston omaksuminen paranee kun oppilaat kohtaavat kohdisanoja useissa eri muodoissa mukaan lukien pulmat, sillä monipuolinen altistus syventää sanastollisia representaatioita pelkän ulkoa opettelun sijaan.',
      source: 'Niilo Mäki Instituutti, "Lukemisen ja kirjoittamisen tuen tutkimus," Jyväskylän yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Ekaluokkalaiseni pyytvat sanahakuharjoituksia joka lukutunnilla. Kuvavihjeet mahdollistavat heikompienkin lukijoiden osallistumisen ja voin saataa ruudukon kokoa niin etta jokainen onnistuu.',
      name: 'Minna Korhonen',
      role: '1. luokan opettaja',
      school: 'Puistolan koulu, Helsinki',
    },
    {
      quote: 'Myyn teemallisia sanahakukokoelmia verkossa ja tama generaattori pienensi tuotantoaikani kahdesta tunnista viiteentoista minuuttiin per paketti. Vastausavaimet yksinaan saastavat valtavasti muotoilutyota.',
      name: 'Antti Virtanen',
      role: 'Opettajayritttaja',
      school: 'OpeVirtanen verkkokauppa',
    },
  ],

  tips: {
    sectionTitle: 'Sanahakustrategiat luokka-asteittain',
    sectionDescription: 'Saada sanahakugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Nain asetat ruudukon koon, sanasuunnat ja sanavaraston monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Kirjaintunnistus ruudukossa',
        description: 'Kaytta 5x5 ruudukoita pelkalla vaakasuoralla sijoittelulla ja 3–4 yksinkertaisella kolmikirjaimisella sanalla. Valitse kuvavihjetta tutuista teemoista kuten elaimet tai varit. Esikoululaiset harjoittelevat yksittaisten kirjainten tunnistamista ruudukosta.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Nakosanahaut',
        description: 'Luo 8x8 ruudukoita vaaka- ja pystysanoilla kayttaen yleisia sanoja. Ota kuvavihjeet kayttoon jotta lukemaan oppivat tunnistavat kohdesanat visuaalisesti. Rajoita 5–6 sanaan per pulma keskittymisen ja itseluottamuksen rakentamiseksi.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Sanastoharjoituspulmat',
        description: 'Generoi 10x12 ruudukoita lisaamalla viisto sanasijoittelu lisahaasteeksi. Kaytta 8–10 sanaa viikon sanalistoista tai lukuyksikon sanastosta. Ekaluokkalaiset kehittavat jarjestelmallista etsintastrategiaa rivi riviltaa.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Teemapohjaiset akateemiset pulmat',
        description: 'Rakenna 12x15 ruudukoita kaikilla suunnilla mukaan lukien kaanteissanat. Sisallyta 10–15 ymparistopin tai aidinkielen sanastosanaa. Toisluokkalaiset vahvistavat oikeinkirjoitusta tunnistaessaan tarkkoja kirjainsarjoja.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Haastepulmat',
        description: 'Luo 15x20 tai suurempia ruudukoita kaanteisilla ja viistoilla sanoilla ja 15–20 monitavuisella sanalla. Kaytta akateemista sanastoa ja ainekohtaista terminologiaa POPS 2014 vuosiluokkien 3–6 tavoitteiden mukaisesti.',
      },
    ],
  },
};

export default wordSearchFiContent;
