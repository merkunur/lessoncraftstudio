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
    items: [
      {
        id: '1',
        icon: '🛤️',
        title: 'Kuvapolku-sokkelotehtävämuoto',
        description: 'Generaattori luo ruudukkopohjaisia polkutehtäviä, joissa oppilaat kulkevat aloituspisteestä maaliin kuvia seuraten. Polkusäännöt määrittävät mitkä kuvat ovat sallittuja. Kehittää visuaalista seurantaa ja avaruudellista hahmottamista.',
      },
      {
        id: '2',
        icon: '📐',
        title: 'Säädettävä ruudukkokoko',
        description: 'Valitse ruudukon koko oppilaiden taitotason mukaan. Pieni ruudukko sopii esiopetukseen yksinkertaisilla poluilla. Suurempi ruudukko haastaa vanhempia oppilaita monimutkaisi lla reiteillä. Rivien ja sarakkeiden määrä säädetään erikseen.',
      },
      {
        id: '3',
        icon: '🔍',
        title: 'Monipuoliset polkusäännöt',
        description: 'Valitse polkusääntö: kulje vain tiettyjä kuvia pitkin, vältä tiettejä kuvia tai seuraa tiettyä kuviosekvenssiä. Säännöt vaihtelevat vaikeustason mukaan. Monipuolisuus kehittää loogista ajattelua.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa polkutehtäviin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta polkutehtävien luomiseen. Eläimet, hedelmät, muodot ja kymmenet muut teemat. Kuvat täyttävät ruudukon automaattisesti valitun teeman mukaan.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen polkutehtävä generoi automaattisesti vastausavaimen, jossa oikea polku on korostettu. Opettajat tarkistavat oppilastöitä sekunneissa. Vastausavaimet näyttävät koko reitin selkeästi.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää omaa tekstiä, fontteja, värejä ja taustakuvia ammattimaiseen lopputulokseen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä polkutehtäviä verkossa. Kuvapolkutehtävät ovat suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo polkutehtäviä 11 kielellä mukaan lukien suomi, ruotsi ja tanska. Käyttöliittymä kääntyy valitulle kielelle. Täydellinen monikielisiin luokkiin.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Visuaalisen seurannan perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia polkutehtäviä pienillä ruudukoilla ja selvällä polkusäännöllä. Esiopetuksen oppilaat harjoittelevat kynänhallintaa ja visuaalista seurantaa. Polun piirtäminen kehittää hienomotoriikkaa. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Avaruudellista päättelyä 1.–3. luokalla',
        description: 'Generoi suurempia ruudukoita monimutkaisilla polkusäännöillä. Oppilaat suunnittelevat reitin ennakkoon ja kehittävät strategista ajattelua. Monitasoiset polut haastavat avaruudellista hahmottamista.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja polkupulmia kotiin',
        description: 'Luo temaattisia polkutehtäviä lasten suosikkiaiheilla. Eläin- ja seikkailuteemat motivoivat polun löytämistä. Polkutehtävät ovat hauskoja pulmia koko perheelle.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Visuaalista harjoittelua ilman kielirajoitusta',
        description: 'Polkutehtävät eivät vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Kuvapohjaiset polut kehittävät avaruudellista hahmottamista universaalisti. 11 kielen tuki tukee monikielisiä luokkia.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävät polkuharjoitukset',
        description: 'Säädä ruudukon kokoa ja polkusääntöjä HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja selvät polut tukevat heikompia oppilaita. Polkutehtävät kehittävät hienomotoriikkaa ja hahmottamista.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy polkupaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia polkukokoelmia myytäväksi verkossa. Kuvapolkutehtävät ovat suosittuja materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit ilman lisäkuluja.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten kuvapolkugeneraattori toimii?',
        answer: 'Generaattori luo ruudukon, jossa jokaisessa solussa on kuva. Oppilas kulkee aloituspisteestä maaliin polkusäännön mukaan. Sääntö määrittää mitkä kuvat ovat sallittuja polulla.',
      },
      {
        id: '2',
        question: 'Miten ruudukon kokoa säädetään?',
        answer: 'Valitse rivien ja sarakkeiden määrä erikseen. Pieni ruudukko (4×4) sopii esiopetukseen. Suurempi ruudukko (8×8 tai 10×10) haastaa vanhempia oppilaita. Säädä kokoa taitotason mukaan.',
      },
      {
        id: '3',
        question: 'Mitkä polkusäännöt ovat käytettävissä?',
        answer: 'Useita sääntöjä: kulje vain tiettyjä kuvia pitkin, vältä tiettejä kuvia, seuraa kuviosekvenssiä tai kulje vain viereisiin soluihin. Säännöt määrittävät vaikeustason.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen polkutehtävä generoi automaattisesti vastausavaimen. Oikea polku on korostettu selkeästi ruudukossa. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille polkutehtävät sopivat?',
        answer: 'Polkutehtävät palvelevat 4–10-vuotiaita. Esikoululaiset kulkevat yksinkertaisia polkuja pienissä ruudukoissa. 1.–3. luokan oppilaat ratkaisevat monimutkaisia reittejä suuremmissa ruudukoissa.',
      },
      {
        id: '6',
        question: 'Miten polkutehtävät kehittävät taitoja?',
        answer: 'Polkutehtävät kehittävät visuaalista seurantaa, avaruudellista hahmottamista, strategista ajattelua ja hienomotoriikkaa. Polun suunnittelu vaatii ennakointia ja päättämistä.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori täyttää ruudukon automaattisesti valituilla kuvilla. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa.',
      },
      {
        id: '8',
        question: 'Miten tulostan polkutehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Ammattimaiset tulosteet kotitulostimella.',
      },
      {
        id: '9',
        question: 'Sopiiko generaattori erityisopetukseen?',
        answer: 'Erinomaisesti. Säädä ruudukon kokoa ja polkusääntöjä HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja selvät säännöt tukevat heikompia oppilaita. Polkutehtävät kehittävät hienomotoriikkaa.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden polkutehtävän luominen vie alle 3 minuuttia. Valitse kuvat ja polkusääntö 30 sekunnissa. Generaattori rakentaa tehtävän välittömästi. Viikon tehtävät valmistuvat nopeasti.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani polkutehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin polkutehtävien myyntiin verkossa. Luo teemallisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten polkutehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Polkutehtävät kehittävät avaruudellista hahmottamista, visuaalista seurantaa ja hienomotoriikkaa. POPS 2014 korostaa monipuolisia työtapoja ja toiminnallista oppimista. Polkutehtävät toteuttavat molempia tavoitteita.',
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
    items: [
      {
        id: '1',
        slug: 'viivojen-piirtaminen-tyoarkit',
        name: 'Viivojen piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Viivanpiirtotehtävät kehittävät kynänhallintaa ennen polkutehtäviä. Yhdistä molemmat hienomotoriikan kattavaan harjoitteluun.',
      },
      {
        id: '2',
        slug: 'ruudukkopiirustus-tyoarkit',
        name: 'Ruudukkopiirustus',
        category: 'Hahmottaminen',
        icon: '📐',
        description: 'Ruudukkopiirustus kehittää samoja avaruudellisia taitoja kuin polkutehtävät. Yhdistä molemmat visuaalisen hahmottamisen pakettiin.',
      },
      {
        id: '3',
        slug: 'etsi-esineet-tyoarkit',
        name: 'Etsi esineet',
        category: 'Tarkkaavaisuus',
        icon: '🔎',
        description: 'Etsintätehtävät kehittävät visuaalista tarkkaavaisuutta, joka tukee polkutehtävissä tarvittavaa skannausta.',
      },
      {
        id: '4',
        slug: 'kuvalajittelu-tyoarkit',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📋',
        description: 'Kuvalajittelu kehittää kuvien tunnistamista ja luokittelua, joka tukee polkusääntöjen noudattamista.',
      },
      {
        id: '5',
        slug: 'varjoyhdistely-tyoarkit',
        name: 'Varjoyhdistely',
        category: 'Hahmottaminen',
        icon: '👻',
        description: 'Varjoyhdistely kehittää visuaalista erottelua ja muodon tunnistamista. Yhdistä polkutehtävien kanssa hahmottamisen harjoitteluun.',
      },
      {
        id: '6',
        slug: 'ruudukko-sovitus-tyoarkit',
        name: 'Ruudukkosovitus',
        category: 'Logiikka',
        icon: '🧩',
        description: 'Ruudukkosovitus laajentaa ruudukkotaitoja kuvan palojen sijoittamiseen. Molemmat kehittävät avaruudellista hahmottamista.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 177) ------------------------------------

  aiOverviewSnippet: 'Kuvapolku-generaattori on verkkotyokalu, jolla luodaan tulostettavia ruudukkopohjaisia polkutehtavia esiopetukseen ja alakouluun. Oppilaat kulkevat aloituspisteesta maaliin seuraten polkusaantoa, joka maarittelee sallitut kuvat. Opettajat valitsevat ruudukon koon, polkusaannon ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Ruudukkokoko',
      ourApp: 'Säädettävä 4×4–10×10',
      typical: 'Kiinteä koko',
    },
    {
      feature: 'Polkusäännöt',
      ourApp: 'Useita vaihtoehtoja ja vaikeustasoja',
      typical: 'Yksi sääntö',
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
      claim: 'Ruudukkopohjaisten polkutehtävien ratkaiseminen kehittää avaruudellista navigointia ja toiminnanohjausta, jotka ovat matemaattisen ja tieteellisen ajattelun perusedellytyksiä.',
      source: 'Lepola, J. et al., "Avaruudellisen hahmottamisen ja oppimisen yhteydet," Turun yliopisto',
    },
    {
      claim: 'Polkutehtävät kehittävät suunnittelukykyä ja ennakoivaa ajattelua, jotka ovat toiminnanohjauksen keskeisiä osataitoja varhaiskasvatusikäisillä.',
      source: 'Lehto, J. et al., "Toiminnanohjaus ja oppiminen," Jyväskylän yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuvapolkutehtavat ovat oppilaitteni suosikkeja. Lapset rakastavat etsia oikeaa reittia ruudukossa ja kehittavat samalla visuaalista hahmottamista. Saadettava ruudukkokoko tekee eriyttamisesta helppoa esiopetuksessa ja alakoulussa.',
      name: 'Leena Härkönen',
      role: 'Esiopetuksen opettaja',
      school: 'Puistokaaren päiväkoti, Jyväskylä',
    },
    {
      quote: 'Kaytan polkutehtavia aamutyoskentelyssa ja matikkapajassa. Oppilaat suunnittelevat reittia ennakkoon ja kehittavat strategista ajattelua. Monipuoliset polkusaannot pitavat tehtavat mielenkiintoisina viikosta toiseen.',
      name: 'Vesa Niskanen',
      role: '2. luokan opettaja',
      school: 'Niittykummun koulu, Espoo',
    },
  ],

  tips: {
    sectionTitle: 'Polkustrategiat luokka-asteittain',
    sectionDescription: 'Säädä kuvapolkugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset ruudukon koon, polkusäännön ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Pienet ruudukot selvällä polulla',
        description: 'Kaytta 4x4 tai 5x5 ruudukkoa yhdella polkusaannolla (esim. kulje vain kissoja pitkin). Esikoululaiset harjoittelevat visuaalista seurantaa ja kynanhallintaa. Yksinkertainen saanto rakentaa hahmottamisen perustaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Keskikokoiset ruudukot ja monipuolisemmat säännöt',
        description: 'Luo 5x5 tai 6x6 ruudukkotehtavia kahdella polkusaannolla. Esiopetuksen oppilaat kehittavat strategista suunnittelua ja visuaalista analysointia. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Suuremmat ruudukot ja haastavammat säännöt',
        description: 'Generoi 6x6 tai 7x7 ruudukkotehtavia monimutkaisemmilla polkusaannoilla. Ekaluokkalaiset suunnittelevat reittia ennakkoon ja kehittavat avaruudellista paattelya.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Monimutkaiset reitit ja sekvenssipolut',
        description: 'Luo 7x7 tai 8x8 ruudukkotehtavia sekvenssisaannoilla. Toisluokkalaiset noudattavat kuviosekvenssia (esim. kissa-koira-kissa-koira) reitin aikana. Kehittaa monimutkaista ajattelua.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Vaativat sokkelot useilla säännöillä',
        description: 'Kaytta 8x8 tai suurempia ruudukoita useilla samanaikaisilla polkusaannoilla. Kolmasluokkalaiset ratkaisevat monimutkaisia reitteja itsenaisesti. Tehtavat kehittavat systemaattista ajattelua ja ongelmanratkaisua.',
      },
    ],
  },
};

export default picturePathFiContent;
