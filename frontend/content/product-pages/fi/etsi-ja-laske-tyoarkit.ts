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
    items: [
      {
        id: '1',
        icon: '🔍',
        title: 'Etsi ja laske -pulmat yhdistävät visuaalisen etsinnän ja matematiikan',
        description: 'Oppilaat etsivät tiettyjä kuvia ruudukosta ja laskevat kuinka monta kutakin löytyy. Kehittää visuaalista erottelukykyä, yksi-yhteen-vastaavuutta ja lukumäärän käsitettä samanaikaisesti. I Spy -formaatti pitää oppilaat sitoutuneina.',
      },
      {
        id: '2',
        icon: '📊',
        title: 'Useita kohderyhmiä per tehtävä',
        description: 'Valitse 2–6 kohdekategoriaa per tehtävä. Yksinkertainen kahdella kohteella sopii esikoululaisille. Monimutkaisempi kuudella kohteella haastaa edistyneitä oppilaita. Jokainen kohde saa oman tehtävätyyppinsä.',
      },
      {
        id: '3',
        icon: '⚙️',
        title: 'Säädettävä kuvatiheys',
        description: 'Säädä kokonaiskohteiden määrää 10–50. Harvempi asettelu aloittelijoille, tiheämpi edistyneille. Ruudukon koko 5x5–10x10 hallitsee kokonaishaastetta. Generaattori sijoittaa kohteet satunnaisesti tasaiseen jakaumaan.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa etsittäviksi kohteiksi',
        description: 'Valitse etsittävät kohteet 3000+ kuvakirjastosta: eläimet, ruoka, kulkuneuvot, lelut ja luonto. Tutut kuvat pitävät oppilaat kiinnostuneina. Vaihda teemoja vastaamaan viikon opintoyksikköä.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Vastausavaimet korostettuin kohtein ja tarkistetuin lukumäärin',
        description: 'Jokainen tehtävä generoi vastausavaimen, jossa kohdekohteet on korostettu ja oikeat lukumäärät näkyvät. Opettajat tarkistavat oppilastyöt nopeasti. Vastausavaimet sopivat itsetarkistuspisteille.',
      },
      {
        id: '6',
        icon: '🔃',
        title: 'Neljä tehtävätyyppiä: ympyröi, nelikulmio, rasti, laske',
        description: 'Jokaiselle kohteelle määrätään oma tehtävätyyppi: ympyröi löydetyt, piirrä nelikulmio ympärille, laita rasti päälle tai laske lukumäärä. Useat tehtävätyypit samalla sivulla kehittävät toiminnanohjauksen taitoja.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Myy etsi ja laske -kokoelmia verkossa. I Spy -tyyppiset tehtävät ovat suosittuja varhaiskasvatus- ja esiopetusmarkkinoilla. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lisämaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo etsi ja laske -tehtäviä 11 kielellä. Visuaalinen muoto toimii kielirajojen yli, mutta ohjetekstit ja merkinnät kääntyvät automaattisesti. Täydellinen monikielisille luokkahuoneille ja S2-opetukseen.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🎒',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Visuaalisen etsinnän kehittäminen 5–6-vuotiaille',
        description: 'Luo yksinkertaisia 6x6 ruudukoita kahdella kohteella ja ympyröi-tehtävätyypillä. Esiopetusikäiset kehittävät visuaalista erottelukykyä ja yksi-yhteen-vastaavuutta. I Spy -muoto pitää oppilaat motivoituneina POPS 2014 matematiikan tavoitteen T2 mukaisesti.',
      },
      {
        id: '2',
        icon: '📚',
        title: '1. luokan opettajat',
        subtitle: 'Itsenäinen laskuharjoittelu useilla tehtävätyypeillä',
        description: 'Käytä 8x8 ruudukoita kolmella kohteella. Osoita eri tehtävätyypit kullekin kohteelle: ympyröi yksi, laita rasti toiselle, laske kolmannelle. Oppilaat harjoittelevat ohjeiden noudattamista ja laskemista itsenäisesti.',
      },
      {
        id: '3',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Saavutettavat etsi ja laske -tehtävät erilaisille oppijoille',
        description: 'Säädä ruudukon kokoa, kohteiden määrää ja tehtävätyyppiä yksilöllisesti. Visuaalinen muoto vähentää lukemisen kuormitusta. Pieni ruudukko yhdellä kohteella on saavutettava lähtökohta kaikille oppilaille.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kielestä riippumaton laskuharjoittelu',
        description: 'Visuaaliset etsi ja laske -tehtävät eivät vaadi kielitaitoa. Oppilaat etsivät ja laskevat kuvia ilman lukemista. Tutut kuvat ovat universaaleja kielirajojen yli. 11 kielen tuki ohjeteksteille.',
      },
      {
        id: '5',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Itseohjautuvat etsi ja laske -harjoitukset',
        description: 'Luo etsi ja laske -tehtäviä, joita lapset voivat tehdä itsenäisesti. Visuaalinen muoto on intuitiivinen ilman ohjausta. Vastausavaimet mahdollistavat itsetarkistuksen. Eri vaikeustasot palvelevat kaikkia lapsia perheessä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'I Spy -kokoelmat varhaiskasvatusmarkkinoille',
        description: 'I Spy -tyyppiset tehtävät ovat suosittuja varhaiskasvatus- ja esiopetusmarkkinoilla. Luo teemallisia kokoelmia eri vaikeustasoilla. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lisämaksuja.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten etsi ja laske -tehtavat toimivat?',
        answer: 'Oppilaat saavat ruudukon täynnä kuvia ja erillisen otsikkorivin, jossa näkyy etsittävät kohteet tehtävätyyppeineen. Oppilaat etsivät kohteita ruudukosta ja suorittavat määrätyn tehtävän: ympyröivät, piirtävät nelikulmion, laittavat rastin tai laskevat lukumäärän.',
      },
      {
        id: '2',
        question: 'Mitka tehtavatyypit ovat saatavilla?',
        answer: 'Neljä tehtävätyyppiä: ympyröi (piirrä ympyrä kohteen ympärille), nelikulmio (piirrä laatikko kohteen ympärille), rasti (laita rasti kohteen päälle) ja laske (laske kohteiden lukumäärä). Eri tehtävätyypit samalla sivulla kehittävät toiminnanohjauksen taitoja.',
      },
      {
        id: '3',
        question: 'Mitka ruudukon koot ovat saatavilla?',
        answer: 'Ruudukon koko on säädettävissä 5x5–10x10. Pienemmät 5x5 tai 6x6 ruudukot sopivat esikoululaisille. Keskikokoiset 7x7 tai 8x8 sopivat esiopetukseen ja 1. luokalle. Suuremmat 10x10 ruudukot haastavat edistyneitä oppilaita.',
      },
      {
        id: '4',
        question: 'Kuinka monta etsittavaa kohdetta voi sisallyttaa?',
        answer: 'Valitse 2–6 etsittävää kohdetta per tehtävä. Kaksi kohdetta on yksinkertainen aloittelijoille. Neljä kohdetta on standardi esiopetukseen. Kuusi kohdetta haastaa edistyneitä oppilaita useilla samanaikaisilla tehtävillä.',
      },
      {
        id: '5',
        question: 'Sisaltavatko tehtavat vastausavaimet?',
        answer: 'Kyllä, jokainen tehtävä generoi vastausavaimen, jossa kohdekohteet on korostettu visuaalisesti ja oikeat lukumäärät näkyvät. Opettajat tarkistavat oppilastyöt sekunneissa.',
      },
      {
        id: '6',
        question: 'Mille ikarryhmille etsi ja laske -tehtavat sopivat?',
        answer: 'Etsi ja laske -tehtävät palvelevat 4–9-vuotiaita. Esikoululaiset 4–5 käyttävät pieniä ruudukoita yhdellä kohteella. Esiopetusikäiset 5–6 harjoittelevat kahdella kohteella. 1.–2. luokan oppilaat haastavat itsensä 3–4 kohteella. 3. luokan oppilaat käyttävät suurimpia ruudukoita.',
      },
      {
        id: '7',
        question: 'Sopivatko etsi ja laske -tehtavat esiopetukseen?',
        answer: 'Etsi ja laske -tehtävät sopivat erinomaisesti esiopetukseen. I Spy -muoto kehittää visuaalista erottelukykyä, yksi-yhteen-vastaavuutta ja lukumäärän käsitettä. Tämä tukee POPS 2014 matematiikan tavoitteita T2 ja T7.',
      },
      {
        id: '8',
        question: 'Miten etsi ja laske -tehtavat kehittavat matematiikkataitoja?',
        answer: 'Oppilaat harjoittelevat yksi-yhteen-vastaavuutta laskiessaan kohteita, visuaalista erottelukykyä etsiessään kuvia ja lukumäärän vertailua useiden kohteiden välillä. Useat tehtävätyypit kehittävät toiminnanohjauksen joustavuutta.',
      },
      {
        id: '9',
        question: 'Kuinka kauan yhden tehtavan luominen kestaa?',
        answer: 'Yhden etsi ja laske -tehtävän luominen vie alle 2 minuuttia. Valitse kohteet, ruudukon koko ja tehtävätyypit. Generaattori sijoittaa kohteet automaattisesti. Luo koko viikon laskuharjoitukset 10 minuutissa.',
      },
      {
        id: '10',
        question: 'Voiko teemakuvia valita vapaasti?',
        answer: 'Kyllä, valitse etsittävät kohteet 3000+ kuvakirjastosta. Eläimet, ruoka, kulkuneuvot ja muut tutut kuvat pitävät oppilaat kiinnostuneina. Vaihda teemoja vastaamaan viikon opintoyksikköä.',
      },
      {
        id: '11',
        question: 'Voinko myydaa etsi ja laske -kokoelmia?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. I Spy -tyyppiset tehtävät ovat suosittuja varhaiskasvatusmarkkinoilla. Myy teemapaketteja ilman attribuutiovaatimuksia tai lisämaksuja.',
      },
      {
        id: '12',
        question: 'Miten etsi ja laske -tehtavat tukevat POPS 2014 tavoitteita?',
        answer: 'Tehtävät tukevat matematiikan tavoitteita T2 (lukumäärän ja laskemisen ymmärrys) ja T7 (luokittelu ja säännönmukaisuuksien tunnistaminen). Visuaalinen etsintä ja laskeminen ovat POPS 2014 toiminnallisen oppimisen periaatteiden mukaisia.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        slug: 'etsi-esineet-tyoarkit',
        name: 'Etsi esineet',
        category: 'Visuaaliset taidot',
        icon: '🔍',
        description: 'Täydennä etsi ja laske -tehtäviä piiloesineiden etsintäharjoituksilla tasapainoiseen opetukseen. Molemmat muodot kehittävät visuaalista erottelukykyä eri konteksteissa.',
      },
      {
        id: '2',
        slug: 'kuvakaavio-tyoarkit',
        name: 'Kuvakaavio',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Lisää kuvakaavioharjoituksia etsi ja laske -tehtävien rinnalle monipuoliseen laskuharjoitteluun. Oppilaat laskevat kohteita ja sitten esittävät tuloksia kaaviomuodossa.',
      },
      {
        id: '3',
        slug: 'yhteenlasku-tyoarkit',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhdistä etsi ja laske -tehtävät yhteenlaskuharjoituksiin kattavaan tuntisuunnitteluun. Oppilaat laskevat kohteita ja sitten laskevat kohteet yhteen.',
      },
      {
        id: '4',
        slug: 'enemman-vahemman-tyoarkit',
        name: 'Enemmän vai vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Yhdistä etsi ja laske -käsitteet lukumäärän vertailuharjoituksiin. Oppilaat laskevat eri kohteita ja vertailevat lukumääriä keskenään.',
      },
      {
        id: '5',
        slug: 'aarteenetsinta-tyoarkit',
        name: 'Aarteenetsintä',
        category: 'Visuaaliset taidot',
        icon: '🏴‍☠️',
        description: 'Laajenna etsi ja laske -harjoittelua seikkailuteemaisilla etsintäpulmilla. Oppilaat kehittävät samoja visuaalisia etsintätaitoja jiennittävässä seikkailukontekstissa.',
      },
      {
        id: '6',
        slug: 'kuva-bingo-tyoarkit',
        name: 'Kuvabingo',
        category: 'Varhaiskasvatus',
        icon: '🎲',
        description: 'Yhdistä etsi ja laske -tehtävät kuvabingoon kattavaan tuntisuunnitteluun. Molemmat muodot kehittävät visuaalista tunnistamista ja tarkkaavaisuutta hauskassa kontekstissa.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 174) ------------------------------------

  aiOverviewSnippet: 'Etsi ja laske -generaattori luo tulostettavia I Spy -ruudukoita, joissa oppilaat etsivat piilotettuja kohteita ja suorittavat nelja tehtavatyyppia: ympyroi, nelikulmio, rasti ja laske. Opettajat valitsevat 1–4 kohdetta 3000+ kuvakirjastosta, ruudukon koon 5x5–10x10 ja lataavat 300 DPI PDF:n vastausavaimineen alle 2 minuutissa.',

  comparisonTable: [
    {
      feature: 'Tehtävätyypit',
      ourApp: '4 tehtävätyyppiä per kohde (ympyröi, nelikulmio, rasti, laske)',
      typical: 'Yksi tehtävätyyppi per tehtävä',
    },
    {
      feature: 'Ruudukon koko',
      ourApp: 'Säädettävä 5x5–10x10',
      typical: 'Kiinteä ruudukko ilman koon hallintaa',
    },
    {
      feature: 'I Spy -otsikkorivi',
      ourApp: 'Automaattisesti luotu otsikko kohteilla ja tehtäväikoneilla',
      typical: 'Ei otsikkoa tai manuaalinen luonti',
    },
    {
      feature: 'Kohteiden sijoittelu',
      ourApp: 'Satunnainen tasainen jakautuminen ruudukkoon',
      typical: 'Satunnainen tai epätasainen sijoittelu',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattiset visuaalisin tehtävämerkinnoin ja lukumäärin',
      typical: 'Usein ei mukana tai opettajan tekemiä',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy myyntiin',
      typical: 'Lisämaksu tai henkilökohtainen käyttö',
    },
  ],

  researchBacking: [
    {
      claim: 'Upotettujen kohteiden laskeminen kehittaa yksi-yhteen-vastaavuutta ja subitisointitaitoja, jotka ovat matemaattisen ajattelun perustaitoja varhaislapsuudessa.',
      source: 'Aunio, P., "Matemaattisten taitojen kehitys ja tukeminen varhaiskasvatuksessa," Niilo Maki Instituutti',
    },
    {
      claim: 'Useiden samanaikaisten tehtavien suorittaminen kehittaa toiminnanohjauksen joustavuutta, mika vahvistaa kognitiivista kontrollia ja tarkkaavaisuuden siirtamista.',
      source: 'Lehto, J. et al., "Toiminnanohjaus ja oppiminen," Psykologia-lehti',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Nelja tehtavatyyppia yhdella sivulla ovat loistavat pistetyoskentelyyn. Oppilaat harjoittelevat eri taitoja samalla tehtavalla: visuaalista etsintaa, laskemista ja ohjeiden noudattamista. POPS 2014 toiminnallista oppimista parhaimmillaan.',
      name: 'Hanna Tuominen',
      role: 'Esiopetuksen opettaja',
      school: 'Tampereen normaalikoulu',
    },
    {
      quote: 'Kaytan 8x8 ruudukoita kolmella kohteella ekaluokkalaisilleni ja laskutehtava saa heidat kirjoittamaan lukuja joka kerta. Vastausavaimet tekevat tarkistuksesta nopeaa suurenkin ryhman kanssa.',
      name: 'Markus Aalto',
      role: '1. luokan opettaja',
      school: 'Jyvaskylan normaalikoulu',
    },
  ],

  tips: {
    sectionTitle: 'Etsi ja laske -strategiat luokka-asteittain',
    sectionDescription: 'Saada etsi ja laske -generaattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset ruudukon koon, kohteiden maaran ja tehtavatyypit esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: 5x5 ruudukko yhdella kohteella',
        description: 'Kaytta pienta 5x5 ruudukkoa yhdella etsittavalla kohteella ja ympyroi-tehtavatyypilla. Esikoululaiset harjoittelevat visuaalista etsintaa ja yksi-yhteen-vastaavuutta yksinkertaisimmassa muodossa. Ohjatussa pienryhmatyossa opettaja tukee laskemista.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: 6x6 ruudukko kahdella kohteella',
        description: 'Luo 6x6 tai 7x7 ruudukoita kahdella kohteella. Osoita ympyroi-tehtava toiselle ja laske-tehtava toiselle. Oppilaat harjoittelevat kahden eri ohjeen noudattamista samalla sivulla POPS 2014 matematiikan tavoitteen T2 mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: 8x8 ruudukko kolmella kohteella',
        description: 'Kaytta 8x8 ruudukkoa kolmella kohteella. Osoita eri tehtavatyypit kullekin: ympyroi, rasti ja laske. Ekaluokkalaiset kehittavat monitehtavakontrollia ja laskutaitoja itsenaisesti.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: 10x10 ruudukko neljalla kohteella',
        description: 'Luo 10x10 ruudukoita neljalla kohteella, joille kullekin oma tehtavatyyppi. Toisluokkalaiset harjoittelevat monimutkaista ohjeiden noudattamista ja tarkkaa laskemista suuremmassa ruudukossa.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Suurin ruudukko laskupainotteisesti',
        description: 'Kaytta 10x10 ruudukoita neljalla kohteella, joille kaikille osoitetaan laske-tehtavatyyppi. Kolmasluokkalaiset keskittyvat intensiiviseen laskuharjoitteluun ja lukumaarien vertailuun POPS 2014 vuosiluokkien 3–6 tavoitteiden mukaisesti.',
      },
    ],
  },
};

export default findAndCountFiContent;
