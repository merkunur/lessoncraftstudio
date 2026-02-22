import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - Finnish Content (Kuvalajittelu Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuvalajittelu-tyoarkit.ts
 * URL: /fi/apps/kuvalajittelu-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/picture-sort.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Picture Sort requires Full Access subscription
 */

export const pictureSortFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvalajittelu-tyoarkit',
    appId: 'picture-sort',
    title: 'Kuvalajittelu Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia kuvalajittelutehtäviä, joissa lapsi luokittelee kuvat kategorioihin. Kehittää luokittelutaitoja. Esikoulusta 2. luokalle. Ilmainen PDF.',
    keywords: 'kuvalajittelu generaattori, luokittelu tehtävä lapsille, kategorioihin lajittelu, ryhmittely harjoitus, looginen luokittelu, ominaisuuksien tunnistaminen, vertailu ja lajittelu, kognitiivinen luokittelu, visuaalinen ryhmittely, käsitteellistäminen harjoitus, lajitteluperuste oppiminen, kuvalajittelu tehtävät, lajitteluharjoitukset lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvalajittelu-tyoarkit',
  },

  // Hero Section - FULL text from Finnish picture-sort.md
  hero: {
    title: 'Kuvalajittelu Generaattori',
    subtitle: 'Luokittelu- ja Lajitteluharjoituksia Kuvilla',
    description: `Luo ammattimaisia kuvalajittelutehtäviä helposti. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille ilmainen, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Kuvalajittelugeneraattori auttaa lapsia oppimaan luokittelua ja kategorisointia. Lapset lajittelevat kuvia kahteen ryhmään. Vasen ja oikea kategoria. Jokainen tehtävä harjoittaa kriittistä ajattelua ja visuaalista erottelukykyä.

Työkalumme tekee laadukkaiden esiopetus materiaali ilmainen -tehtävien luomisesta nopeaa. Valitse kaksi teemaa automaattista generointia varten. Tai valitse yksittäisiä kuvia manuaalisesti 3000+ kuvan kirjastosta. Muokkaa kaikkea pohjalla suoraan. Lisää omia kuvia personoidaksesi tehtävät oppilaillesi.`,
    previewImageSrc: '/samples/finnish/picture sort/sample-1.jpeg',
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
        videoId: '9kzmlABtNVQ',
        buttonText: 'Kuvien Lajittelu Toiminnot',
        modalTitle: 'Kuvien Lajittelu Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/picture sort/
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

  // Features Grid - FULL text from Finnish picture-sort.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuvalajittelutyökalumme sisältää kaiken mitä tarvitset ammattimaisten tehtävien luomiseen. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Luo esiopetus materiaali ilmainen, matematiikka tehtävät alakoulu ja hienomotoriikka harjoitukset. Kaikki samalla alustalla. Kaikki samalla tilauksella.',
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
        icon: '📋',
        title: 'Lajittelu- ja luokittelutehtävämuoto',
        description: 'Generaattori luo tehtäviä, joissa oppilaat lajittelevat kuvia 2–4 ryhmään määritettyjen ominaisuuksien mukaan. Leikkaa ja liimaa -muoto tekee oppimisesta toiminnallista. Kehittää luokittelutaitoja ja kategorista ajattelua.',
      },
      {
        id: '2',
        icon: '🔢',
        title: 'Säädettävä ryhmämäärä ja lajitteluperuste',
        description: 'Valitse 2–4 lajitteluryhmää tehtävään. Kaksi ryhmää sopii nuoremmille lapsille. Neljä ryhmää haastaa vanhempia oppilaita. Lajitteluperusteena voi olla teema, väri, muoto tai koko.',
      },
      {
        id: '3',
        icon: '✂️',
        title: 'Leikkaa ja liimaa -toiminnallisuus',
        description: 'Tehtävät sisältävät leikattavat kuvapalat ja kohderyhmien lokerot. Oppilaat leikkaavat kuvat irti ja liimaavat oikeisiin ryhmiin. Käsillä tekeminen vahvistaa luokittelun oppimista.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa lajittelutehtäviin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta lajittelutehtävien luomiseen. Eläimet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Kuvat sijoittuvat lajitteluryhmiin automaattisesti.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen lajittelutehtävä generoi automaattisesti vastausavaimen, jossa kuvat näkyvät oikeissa ryhmissä. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää omaa tekstiä, fontteja, värejä ja kehyksiä ammattimaiseen lopputulokseen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä lajittelutehtäviä verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo lajittelutehtäviä 11 kielellä mukaan lukien suomi, ruotsi ja tanska. Käyttöliittymä kääntyy valitulle kielelle. Täydellinen monikielisiin luokkiin.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish picture-sort.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaiset kuvalajittelutehtävät alle 3 minuutissa. Viisi yksinkertaista vaihetta alusta loppuun. Ei monimutkaisia asetuksia. Ei pitkää oppimiskäyrää. Pelkkä nopea, helppo tehtävien luominen.',
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
        title: 'Valitse Kategoriat - Esiopetus Materiaali Ilmainen ja Pisteestä Pisteeseen Tehtävät Teemalliset',
        description: `Aloita valitsemalla vasemman kategorian teema. Yli 50 teemaa saatavilla. Eläimet, ruoka, ajoneuvot, luonto. Lelut, vaatteet, urheilu, juhlapäivät. Valitse teema joka sopii oppituntiisi.

Valitse oikean kategorian teema. Voi olla sama kategoria kuin vasen tai erilainen. Esimerkiksi: lemmikkieläimet vasemmalla, villit eläimet oikealla. Tai hedelmiä vasemmalla, vihanneksia oikealla. Rajattomat mahdollisuudet.

Automaattinen tila luo tehtävän välittömästi. Generaattori valitsee satunnaisesti sopivat kuvat. 3-6 kuvaa per kategoria. Yhteensä 6-12 kuvaa. Nopea tapa luoda esiopetus materiaali ilmainen -tehtäviä.

Tai valitse manuaalinen tila täydelle kontrollille. Selaa kuvakirjastoa. Klikkaa kuvia lisätäksesi valintaan. Määritä jokaisen kuvan kategoria. Luo pisteestä pisteeseen tehtävät tarkasti haluamallasi tavalla. Täysi kontrolli sisällöstä.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Muokkaa Asetuksia - Kertotaulut Tulostettava ja Matematiikka Tehtävät Alakoulu Mukautettavia',
        description: `Valitse sivun koko A4 tai Letter-muodossa. Pysty- tai vaakasuunta. Neliö 1200x1200 pikseliä. Tai määritä oma mukautettu koko. Kaikki standardikoot tuettu.

Sisällytä Nimi ja Päivämäärä -kentät. Valintaruutu lisää nämä kentät automaattisesti. Lapset kirjoittavat nimensä ennen aloittamista. Hyvä seuranta tehtävien järjestämiseen. Luo kertotaulut tulostettava henkilökohtaisilla nimikentillä.

Valitse taustan väri tai teema. Satoja valmiita taustoja saatavilla. Säädä läpinäkyvyyttä visuaalisen tasapainon saavuttamiseksi. Lisää reunoja koristeluun. Kymmenittäin reunateemoja mukana. Luo matematiikka tehtävät alakoulu kauniilla visuaalisilla elementeillä.

Lisää omat kuvat tässä vaiheessa. Lataa useita tiedostoja kerralla. Yhdistä omasi kirjaston kuviin. Personoi tehtävät oppilaillesi. Parempi sitoutuminen tunnetuilla kuvilla.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä - Hienomotoriikka Harjoitukset ja Lukemaan Oppiminen Tehtävät Valmiina',
        description: `Klikkaa "Luo Tehtävä" -painiketta. Generaattori rakentaa tehtävän välittömästi. Ei latautumisaikaa. Ei viivettä. Valmis alle sekunnissa.

Tehtävä näkyy pohjalla. Vasen ja oikea lajittelukehys näkyvät. Leikkuukuvat näkyvät alhaalla. Otsikko ja ohjeet luodaan automaattisesti. Kaikki elementit paikoillaan. Luo hienomotoriikka harjoitukset yhden klikkauksen nopeudella.

Esikatsele tehtävää pohjalla. Zoomaa lähemmäs yksityiskohtien näkemiseksi. Zoomaa ulos kokonaiskuvan hahmottamiseksi. Kumoamis- ja tekemis uudelleen -painikkeet saatavilla. Täysi hallinta muokkaukseen.

Luo vastausavain erillisellä klikkauksella. "Luo Vastausavain" -painike aktivoituu. Vastausavain näyttää oikean lajittelun. Kuvat oikeissa kategorioissa. Täydellinen opettajan arviointiin. Luo lukemaan oppiminen tehtävät vastausavaimilla.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Kirjaimet Harjoittelu Esikoulu ja Yhteenlasku ja Vähennyslasku Tehtävät Mukautettavat',
        description: `Raahaa elementtejä uusiin paikkoihin. Siirrä lajittelukehyksiä. Järjestä leikkuukuvia uudelleen. Jokainen elementti on muokattavissa. Täysi editointivapaus.

Kierrä ja skaalaa kuvia. Valitse kuva klikkaamalla. Raahaa kulmista koon muuttamiseen. Kierrä kiertämiskahvalla. Poista ei-toivotut elementit Delete-näppäimellä. Luo kirjaimet harjoittelu esikoulu -tehtäviä lisäämällä kirjaimia.

Lisää tekstielementtejä. Kirjoita teksti tekstikenttään. Klikkaa "Lisää Teksti". Teksti ilmestyy pohjalle. Raahaa haluamaasi paikkaan. Muuta väriä, kokoa, fonttia. Seitsemän fonttia saatavilla. Luo yhteenlasku ja vähennyslasku tehtävät lisäämällä numeroita ja laskutoimituksia.

Lukitse elementit estääksesi vahingossa tapahtuvan muokkauksen. Valitse elementti. Klikkaa lukituspainiketta. Lukitut elementit eivät siirry vahingossa. Avaa kaikki lukot tarvittaessa yhdellä klikkauksella. Säilytä ammattimaiset asettelut.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Värityskuvia Lapsille Tulostettava ja Kertotaulut Tulostettava PDF',
        description: `Valitse latausmuoto. PDF säilyttää vektorigrafiikan. JPEG toimii kaikissa sovelluksissa. Molemmat 300 DPI laadulla. Ammattimainen tulostuslaatu molemmissa.

Lataa tehtävä yhdellä klikkauksella. "Lataa Tehtävä JPEG" tai "Lataa Tehtävä PDF". Tiedosto latautuu välittömästi. Valmis tulostettavaksi tai myytäväksi. Luo värityskuvia lapsille tulostettava ja tallenna muutamassa sekunnissa.

Lataa vastausavain erikseen. Sama muotoilut saatavilla. JPEG tai PDF. Opettajat lataavat molemmat tiedostot. Tehtävä oppilaille, vastausavain itselleen. Nopea arviointi luokkahuoneessa.

Valitse harmaasävyvaihtoehto säästääksesi mustetta. Valintaruutu muuntaa värit harmaasävyiksi. Vähennä tulostuskustannuksia 60-80 prosenttia. Säilytä silti selkeä, luettava tehtävä. Luo kertotaulut tulostettava musteksi ystävällisessä muodossa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuvalajittelutehtävät toimivat kaikilla koulutustasoilla. Esiopetuksesta alakouluun. Kotiopetuksesta luokkahuoneeseen. Monikielisestä opetuksesta erityisopetukseen. Jokainen opettaja löytää arvon näistä tehtävistä.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Luokittelun perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia lajittelutehtäviä kahdella ryhmällä ja selvällä lajitteluperusteella. Esiopetuksen oppilaat harjoittelevat kuvien ryhmään sijoittamista leikkaa ja liimaa -menetelmällä. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Kategorista ajattelua 1.–3. luokalla',
        description: 'Generoi lajittelutehtäviä 3–4 ryhmällä hienommilla lajitteluperusteilla. Oppilaat analysoivat kuvien ominaisuuksia ja perustelevat valintansa. Kehittää tieteellistä ajattelutapaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Toiminnallisia lajittelupulmia kotiin',
        description: 'Luo temaattisia lajittelutehtäviä lasten suosikkiaiheilla. Leikkaa ja liimaa -muoto pitää lapset aktiivisina. Eläin- ja ruokateema motivoi lajittelua kotona.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Sanastoharjoittelua lajittelun kautta',
        description: 'Lajittelutehtävät opettavat luokittelua ja sanastoa kuvapohjaisesti. Oppilaat oppivat ryhmään kuuluvat ja kuulumattomat sanat. 11 kielen tuki mahdollistaa monikielisen opetuksen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävät lajitteluharjoitukset',
        description: 'Säädä ryhmien määrää ja lajitteluperustetta HOJKS-tavoitteiden mukaisesti. Kaksi ryhmää selvällä erolla tukee heikompia oppilaita. Leikkaa ja liimaa kehittää hienomotoriikkaa.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy lajittelupaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia lajittelukokoelmia myytäväksi verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti kysyttyjä. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish picture-sort.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuvalajittelugeneraattorista. Hinnoittelu, käyttö, räätälöinti, tulostus. Kaupallinen käyttö, kielet, ikäryhmät. Alla vastaukset 12 yleisimpään kysymykseen.',
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
        question: 'Miten kuvalajittelugeneraattori toimii?',
        answer: 'Generaattori luo tehtäviä, joissa kuvat lajitellaan ryhmiin määritettyjen ominaisuuksien mukaan. Leikattavat kuvapalat sijaitsevat sivun alareunassa. Oppilaat leikkaavat ja liimaavat kuvat oikeisiin loketoihin.',
      },
      {
        id: '2',
        question: 'Kuinka monta lajitteluryhmää voi olla?',
        answer: 'Valitse 2–4 lajitteluryhmää per tehtävä. Kaksi ryhmää sopii esiopetukseen. Kolme tai neljä ryhmää haastaa vanhempia oppilaita. Säädä määrää taitotason mukaan.',
      },
      {
        id: '3',
        question: 'Miten lajitteluperusteet toimivat?',
        answer: 'Generaattori luo ryhmiä eri perusteilla: teema (eläimet vs ruoka), ominaisuus (iso vs pieni), väri tai muoto. Oppilaat tunnistavat lajitteluperusteen ja sijoittavat kuvat oikeisiin ryhmiin.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen lajittelutehtävä generoi automaattisesti vastausavaimen. Kuvat näkyvät oikeissa ryhmissä. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille lajittelutehtävät sopivat?',
        answer: 'Lajittelutehtävät palvelevat 4–10-vuotiaita. Esikoululaiset lajittelevat kahteen ryhmään. 1.–3. luokan oppilaat lajittelevat 3–4 ryhmään hienommilla perusteilla.',
      },
      {
        id: '6',
        question: 'Miten leikkaa ja liimaa -tehtävät toimivat?',
        answer: 'Sivun alareunassa on leikattavat kuvapalat katkoviivoin merkittyinä. Sivun yläosassa on lajitteluryhmien lokerot otsikoilla. Oppilaat leikkaavat kuvat ja liimaavat ne oikeisiin loketoihin.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa. Luokkahuoneen kuvat tekevät lajittelusta merkityksellisempaa.',
      },
      {
        id: '8',
        question: 'Miten tulostan lajittelutehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. PDF-muoto säilyttää tarkan ulkoasun leikkaamiseen ja liimaamiseen.',
      },
      {
        id: '9',
        question: 'Sopiiko generaattori erityisopetukseen?',
        answer: 'Erinomaisesti. Säädä ryhmien määrää ja kuvien selvyyttä HOJKS-tavoitteiden mukaisesti. Kaksi ryhmää selvällä erolla tukee heikompia oppilaita. Toiminnallisuus kehittää hienomotoriikkaa.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden lajittelutehtävän luominen vie alle 3 minuuttia. Valitse kuvat ja ryhmitys 30 sekunnissa. Generaattori rakentaa tehtävän välittömästi leikattavine osineen.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani lajittelutehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin lajittelutehtävien myyntiin verkossa. Leikkaa ja liimaa -paketit ovat kysyttyjä opettajakauppoissa. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten lajittelutehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Lajittelutehtävät kehittävät luokittelutaitoja, kategorista ajattelua ja hienomotoriikkaa. POPS 2014 korostaa toiminnallista oppimista ja ajattelun taitoja. Leikkaa ja liimaa -lajittelu yhdistää molemmat.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvalajittelutehtävät näihin täydentäviin generaattoreihin.',
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
    items: [
      {
        id: '1',
        slug: 'poikkea-joukosta-tyoarkit',
        name: 'Poikkea joukosta',
        category: 'Logiikka',
        icon: '🧠',
        description: 'Poikkea joukosta -tehtävät kehittävät samaa luokitteluajattelua eri muodossa. Yhdistä lajittelun kanssa kattavaan luokitteluharjoitteluun.',
      },
      {
        id: '2',
        slug: 'etsi-esineet-tyoarkit',
        name: 'Etsi esineet',
        category: 'Tarkkaavaisuus',
        icon: '🔎',
        description: 'Etsintätehtävät kehittävät visuaalista tunnistamista, joka tukee lajittelutehtävissä tarvittavaa kuvan analysointia.',
      },
      {
        id: '3',
        slug: 'kuviotehtava-tyoarkit',
        name: 'Kuviotehtävät',
        category: 'Logiikka',
        icon: '🔣',
        description: 'Kuviotehtävät kehittävät sarjojen tunnistamista ja loogista ajattelua. Yhdistä lajittelun kanssa monipuoliseen ajatteluharjoitteluun.',
      },
      {
        id: '4',
        slug: 'kuva-bingo-tyoarkit',
        name: 'Kuvabingo',
        category: 'Sanasto',
        icon: '🎲',
        description: 'Kuvabingo yhdistää kuvan tunnistamisen pelimuotoon. Molemmat kehittävät kuvien tunnistamista ja luokittelua.',
      },
      {
        id: '5',
        slug: 'enemman-vahemman-tyoarkit',
        name: 'Enemmän vai vähemmän',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Vertailutehtävät kehittävät lukumäärien vertailua, joka täydentää lajittelun vaatimaa luokitteluajattelua.',
      },
      {
        id: '6',
        slug: 'yhdista-parit-tyoarkit',
        name: 'Yhdistä parit',
        category: 'Logiikka',
        icon: '🔗',
        description: 'Yhdistä parit -tehtävät harjoittavat yhteenkuuluvuuden tunnistamista. Molemmat kehittävät kategorista ajattelua eri muodoissa.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 177) ------------------------------------

  aiOverviewSnippet: 'Kuvalajittelu-generaattori on verkkotyokalu, jolla luodaan tulostettavia leikkaa ja liimaa -lajittelutehtavia esiopetukseen ja alakouluun. Oppilaat leikkaavat kuvia ja liimaavat ne oikeisiin luokkiin maaritetyn ominaisuuden mukaan. Opettajat valitsevat ryhmien maaran, lajitteluperusteen ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Lajitteluryhmmät',
      ourApp: '2–4 ryhmää säädettävästi',
      typical: 'Kiinteä 2 ryhmää',
    },
    {
      feature: 'Muoto',
      ourApp: 'Leikkaa ja liimaa -toiminnallinen',
      typical: 'Pelkkä kuvio ilman toimintaa',
    },
    {
      feature: 'Kuvakirjasto',
      ourApp: '3000+ teemakuvaa 50 teemasta',
      typical: 'Rajallinen kuvavalinta',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen tai ei saatavilla',
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
      claim: 'Luokittelu- ja lajittelutehtävät kehittävät kategorista ajattelua, joka on tieteellisen menetelmän ja loogisen päättelyn perusedellytys varhaiskasvatuksessa.',
      source: 'Hautamäki, J. et al., "Luokittelutaitojen kehitys ja merkitys," Helsingin yliopisto',
    },
    {
      claim: 'Leikkaa ja liimaa -menetelmä yhdistää hienomotoriikan ja kognitiivisen luokittelun, mikä vahvistaa oppimista monikanavaisen prosessoinnin kautta.',
      source: 'Ahonen, T. et al., "Toiminnallisen oppimisen vaikuttavuus," Niilo Mäki Instituutti',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuvalajittelutehtavat ovat erinomaisia luokittelutaitojen kehittamiseen. Oppilaani rakastavat leikkaa ja liimaa -muotoa ja oppivat samalla kategorisointia. Saadettava ryhmien maara tekee eriyttamisesta helppoa eri-ikaisille oppilaille.',
      name: 'Pirjo Savola',
      role: '1. luokan opettaja',
      school: 'Kaukajärven koulu, Tampere',
    },
    {
      quote: 'Kaytan lajittelutehtavia esiopetuksessa paivittain. Lapset oppivat tunnistamaan yhteisia piirteita ja lajittelemaan kuvia ryhmiin. Leikkaaminen ja liimaaminen kehittaa samalla hienomotoriikkaa, mika on tarkeaa ennen koulun alkua.',
      name: 'Ilkka Karppinen',
      role: 'Esiopetuksen opettaja',
      school: 'Kartanon päiväkoti, Oulu',
    },
  ],

  tips: {
    sectionTitle: 'Lajittelustrategiat luokka-asteittain',
    sectionDescription: 'Säädä kuvalajittelugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset ryhmien määrän, lajitteluperusteen ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Kaksi ryhmää selvällä erolla',
        description: 'Kaytta kahtaa lajitteluryhm aa selvalla erolla (esim. elaimet vs ruoka). Esikoululaiset harjoittelevat kuvan tunnistamista ja ryhm aan sijoittamista. Leikkaa ja liimaa kehittaa hienomotoriikkaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Kolme ryhmää ja monipuolisemmat teemat',
        description: 'Luo lajittelutehtavia kolmella ryhmalla ja vaihtelevilla teemoilla. Esiopetuksen oppilaat kehittavat kategorisointia ja perustelutaitoja. Tukee POPS 2014 ajattelutaitojen kehittamista.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Kolme ryhmää hienommilla perusteilla',
        description: 'Generoi lajittelutehtavia kolmella ryhmalla ja hienommilla eroilla. Ekaluokkalaiset analysoivat kuvien ominaisuuksia tarkemmin ja perustelevat lajittelun suullisesti.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Neljä ryhmää ja moniperusteiset lajittelut',
        description: 'Luo tehtavia neljalla ryhmalla, joissa lajitteluperuste on hienojakoisempi. Toisluokkalaiset oppivat etta samoja kuvia voi lajitella eri tavoin eri perusteilla.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monimutkaiset luokitteluhaasteet',
        description: 'Kaytta neljaa ryhmaa monimutkaisilla lajitteluperusteilla. Kolmasluokkalaiset perustelevat valintansa kirjallisesti ja luovat omia luokitteluperusteita. Kehittaa tieteellista ajattelua.',
      },
    ],
  },
};

export default pictureSortFiContent;
