import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big and Small Worksheets - Finnish Content (Iso ja Pieni Tehtävät)
 *
 * File: frontend/content/product-pages/fi/iso-pieni-tyoarkit.ts
 * URL: /fi/apps/iso-pieni-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const bigSmallFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'iso-pieni-tyoarkit',
    appId: 'big-small',
    title: 'Kokovertailu Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia iso ja pieni -vertailutehtäviä kuvilla. Kehitä kokojen vertailutaitoja esikoulusta 1. luokalle. Muokattavat asetukset. Lataa PDF.',
    keywords: 'kokovertailu generaattori, koon tunnistaminen tehtävä, visuaalinen vertailu lapset, iso ja pieni käsitteet, järjestäminen koon mukaan, havainnointitaito kehittäminen, konkreettinen kokoero, mittaamisen peruskäsitteet, visuaalinen erottelu, luokittelu koon perusteella, matemaattinen vertailutaito, iso ja pieni tehtävät, kokovertailu esikoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/iso-pieni-tyoarkit',
  },

  // Hero Section - FULL text from Finnish big-small.md
  hero: {
    title: 'Iso ja Pieni Tehtävien Generaattori',
    subtitle: 'Kokovertailuharjoituksia Kuvilla Esikoulusta 1. Luokalle',
    description: `Iso ja pieni -tehtävämonisteiden luominen on helppoa tälle kokovertailutyökalulle. Luo ammattimaisia tehtäviä, joissa lapset oppivat erottamaan koot toisistaan. Täysi Käyttöoikeus -tilaus antaa rajattoman pääsyn kaikkiin 33 tehtävämonisteen luontityökaluun. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa alle 3 minuutissa.

Kokovertailutehtävät ovat tärkeitä esiopetuksen ja alakoulun matematiikassa. Lapset oppivat ymmärtämään käsitteet iso, pieni ja keskikokoinen. Tämä työkalu luo automaattisesti tehtäviä, joissa on 2-3 kuvaa eri kokoina. Valitse viidestä eri tehtävätyypistä. Ympyröi pienin, ympyröi suurin tai järjestä kuvat kokonsa mukaan.

Jokainen tehtävä sopii esiopetukseen ja matematiikan alkuopetukseen alakoulussa. Mukauta jokaista tehtävää täydellisesti. Vedä, kierrä ja muuta kaikkia elementtejä. Lisää omia kuvia. Valitse yli 3000 lapsille sopivasta kuvasta. Luo ainutlaatuisia tehtävämonsteita, jotka sopivat juuri sinun oppilaiden tarpeisiin.`,
    previewImageSrc: '/samples/finnish/big small/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Kokeile Ilmaiseksi',
      viewSamples: 'Katso Esimerkkejä',
    },
    trustBadges: {
      languages: '11 Kieltä',
      images: '3000+ Kuvaa',
      license: 'Kaupallinen Lisenssi',
    },
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Katso miten se toimii',
        modalTitle: 'Toimintojen yleiskatsaus',
      },
      appSpecific: {
        videoId: 'S2s2U6Nb7FI',
        buttonText: 'Iso-Pieni Toiminnot',
        modalTitle: 'Iso-Pieni Opas',
      },
    },
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    floatingStats: {
      time: '3 min',
      action: 'Luo & Lataa',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/big small/
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

  // Features Grid - FULL text from Finnish big-small.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kokovertailutyökalumme tarjoaa kaiken tarvitsemasi ammattimaisten tehtävämonisteiden luomiseen. Täysi Käyttöoikeus -tilaus sisältää seitsemän tehokasta ominaisuutta. Nämä ominaisuudet tekevät tehtävien luomisesta nopeaa ja helppoa. Luo tulostettavat tehtävät lapsille alle kolmessa minuutissa. Jokainen ominaisuus on suunniteltu opettajien tarpeisiin.',
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
        icon: '📏',
        title: 'Viisi kokovertailun tehtävätyyppiä',
        description: 'Valitse viidestä tehtävätyypistä: ympyäri suurin, ympyäri pienin, etsi keskikokoinen, järjestä suurimmasta pienimpaan ja järjestä pienimmästä suurimpaan. Jokainen tyyppi kehittää eri vertailutaitoja. Yhdistä tyyppejä samaan tehtävään monipuoliseen harjoitteluun.',
      },
      {
        id: '2',
        icon: '🔢',
        title: 'Säädettävä kuvamäärä 2–5 per harjoitus',
        description: 'Aseta 2–5 kuvaa per harjoitus hallitaksesi vaikeustasoa. Kaksi kuvaa sopii esikoululaisille yksinkertaiseen vertailuun. Kolmesta viiteen kuvaa haastaa vanhempia oppilaita vaatimalla järjestämistä ja vertailua usean kuvan kesken.',
      },
      {
        id: '3',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa vertailuharjoituksiin',
        description: 'Selaa yli 3000 lapsiystavallista kuvaa kokovertailuharjoitusten luomiseen. Kuvat näytetään eri kokoina samalla sivulla. Teemapohjaiset harjoitukset yhdistävät sanastonharjoittelun ja matemaattisen vertailun.',
      },
      {
        id: '4',
        icon: '📊',
        title: 'Harjoitusten määrä 1–10 per sivu',
        description: 'Valitse 1–10 harjoitusta per sivua hallitaksesi tehtävän laajuutta. Vähemmän harjoituksia tarjoaa suuremmat kuvat ja selkeämmän asettelun nuoremmille oppilaille. Enemmän harjoituksia sopii itsenäiseen työskentelyyn vanhemmille oppilaille.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen kokovertailutehtävä generoi automaattisesti vastausavaimen. Oikeat vastaukset näkyvät selkeästi merkittyinaa. Opettajat tarkistavat oppilastöiden ratkaisut sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysin muokattavat tehtävät',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia ja tekstiä vapaasti. Lisää taustavärejä, koristeellisia kehyksiä ja omaa tekstiä ammattimaiseen ulkoasuun.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä kokovertailutehtäviä verkossa. Luo matemaattisten peruskäsitteiden paketteja myytäväksi. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo kokovertailutehtäviä 11 kielellä mukaan lukien suomi. Käyttöliittymä ja ohjeet kääntyvät valitulle kielelle. Kokovertailu toimii universaalisti kielirajoista riippumatta.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish big-small.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Kokovertailutehtävän luominen kestää alle 3 minuuttia. Viisi yksinkertaista vaihetta vie sinut tyhjästä valmiiseen tulostettavaan tehtävään. Ei monimutkaisia asetuksia. Ei pitkää opettelukäyrää. Aloittelijat luovat ammattilaatuisia tehtäviä ensimmäisellä yrityksellä. Seuraa näitä vaiheita ja tehtäväsi on valmis.',
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
        title: 'Valitse Sisältö Esiopetus Materiaali Ilmainen - Kirjaimet Harjoittelu Esikoulu Tehtävät',
        description: `Aloita valitsemalla kuinka monta tehtävää haluat. Yksi tehtävä harjoitussivulle. Kymmenen tehtävää kattavaan arviointiin. Useimmille opettajille 4-6 tehtävää per sivu toimii parhaiten. Tämä antaa tarpeeksi harjoitusta ilman ylikuormitusta. Sopiva määrä esiopetuksen ja alakoulun 1. luokan oppilaille.

Valitse sitten montako kuvaa per tehtävä. Kaksi kuvaa on yksinkertaisin vaihtoehto. Sopii nuorimmille lapsille jotka opettelevat perusvertailua. Kolme kuvaa lisää vaikeusastetta. Mahdollistaa "keskikokoinen" -käsitteen opettamisen. Myös järjestämistehtävät vaativat kolme kuvaa.

Valitse kuvamoodi seuraavaksi. "Identtiset kuvat" -tila näyttää saman esineen eri kokoina. Täydellinen puhtaaseen kokovertailuun. Lapset keskittyvät vain kokoon, ei muihin eroihin. "Erilaiset kuvat" -tila näyttää eri esineitä. Haastavampi vaihtoehto. Opettaa vertailemaan kokoja riippumatta siitä mitä esinettä vertaillaan.

Valitse tehtävätyyppi viidestä vaihtoehdosta. "Ympyröi pienin" on helpoin aloittelijoille. "Ympyröi suurin" on yhtä yleinen. "Ympyröi keskikokoinen" vaatii kolmea kuvaa ja on haastavampi. Järjestämistehtävät "Numeroi 1-2-3" opettavat sarjallista järjestämistä. Valitse mikä sopii oppilaidesi taitotasolle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia Lukemaan Oppiminen Tehtävät - Hienomotoriikka Harjoitukset',
        description: `Valitse sivun koko seuraavaksi. Letter Portrait (8.5×11 tuumaa) on amerikkalainen standardi. A4 Portrait (210×297mm) on eurooppalainen standardi. Suomessa käytetään A4-kokoa. Valitse mitä tulostimesi käyttää. Voit myös valita vaakasuuntaisen asettelun jos haluat enemmän tehtäviä vierekkäin.

Muokkaa sivun väriä tarvittaessa. Valkoinen on oletusarvo. Toimii parhaiten tulostamiseen. Voit valita kevyen taustavärin tehdäksesi tehtävästä visuaalisesti mielenkiintoisen. Vaalea keltainen tai vaaleansininen toimivat hyvin. Älä valitse liian tummaa väriä. Se kuluttaa mustetta ja vaikeuttaa lukemista.

Lisää nimi- ja päivämääräkentät tehtävän yläreunaan. Nämä ovat tärkeitä kouluympäristössä. Lapset kirjoittavat nimensä ja päivämäärän ennen tehtävän aloittamista. Opettaa vastuullisuutta omasta työstä. Helpottaa myös opettajaa järjestämään ja tallentamaan tehtäviä. Nimi- ja päivämääräkentät näkyvät automaattisesti oikeassa kohdassa.

Valitse taustateema jos haluat. Kymmeniä teemoja saatavilla. Eläimet, luonto, avaruus ja paljon muuta. Taustat tekevät tehtävästä houkuttelevan ilman häirintää. Säädä taustan läpinäkyvyyttä liukusäätimellä. 20-40 prosenttia on yleensä hyvä. Tarpeeksi näkyvä luomaan tunnelmaa, mutta ei häiritse tehtävää.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävä - Välitön Esikatselu',
        description: `Klikkaa "Luo" -painiketta generoidaksesi tehtävän. Järjestelmä luo tehtävän välittömästi. Alle 10 sekuntia odotusaikaa. Näet tehtävän ilmestyvän canvasille silmiesi edessä. Jokainen kuva asetetaan automaattisesti oikeaan kokoon. Pieni, keskikokoinen ja iso versiot ovat selvästi erotettavissa.

Tehtävät sijoitetaan automaattisesti ruudukkoon. Pystysuuntaisilla sivuilla kaksi saraketta. Vaakasuuntaisilla sivuilla kolme saraketta. Rivejä lisätään automaattisesti tehtävien määrän mukaan. Välistys on optimoitu. Ei liian tiivistä, ei liian väljää. Täydellinen tasapaino luettavuuden kannalta.

Jos valitsit kuvia kirjastosta, järjestelmä käyttää niitä. Jos et valinnut kuvia, järjestelmä valitsee satunnaisesti valitsemastasi teemasta. "Eläimet"-teema antaa eläinkuvia. "Hedelmät"-teema antaa hedelmäkuvia. Jokainen tehtävä saa eri kuvat. Ei toistoa sivun sisällä. Pitää tehtävän mielenkiintoisena.

Vastausmerkinnät ilmestyvät jos valitsit ne. Tyhjät ympyrät oikeassa kohdassa "ympyröi"-tehtävissä. Tyhjät ruudut oikein sijoitettuina "numeroi"-tehtävissä. Tehtävänumerot näkyvät jos valitsit ne. Numerot ovat selkeitä ja hyvin sijoitettuja. Eivät häiritse tehtävää mutta ovat helposti nähtävissä.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Canvasilla - Personoi Kokovertailutehtävät',
        description: `Nyt voit muokata tehtävää täydellisesti. Klikkaa mitä tahansa kuvaa valitaksesi sen. Valitun kuvan ympärillä näkyy sininen kehys. Vedä kuvaa uuteen paikkaan. Suurenna tai pienennä vetämällä kulmista. Kierrä kuvaa vetämällä kiertoköydestä. Kaikki muutokset tapahtuvat reaaliajassa.

Tasaustyökalut auttavat luomaan siistejä asetelmia. Valitse useita kuvia pitämällä Shift pohjassa. Tasaa valitut kuvat vasemmalle, keskelle tai oikealle. Tasaa ne yläreunaan, keskelle tai alareunaan. Keskitä elementit koko sivulle. Nämä työkalut tekevät ammattimaisista asetelmista helppoja luoda.

Lisää tekstielementtejä klikkaamalla "Lisää teksti" -painiketta. Kirjoita otsikko tehtävälle. "Ympyröi pienin eläin" tai "Numeroi hedelmät pienimmästä suurimpaan". Muuta tekstin kokoa 8-72 pikseliä. Valitse selkeä fontti kuudesta vaihtoehdosta. Muuta tekstin väriä sopimaan teemaasi. Lisää reunaviiva tekstiin korostamaan sitä.

Kumoa-painike on ystäväsi. Teit virheen? Paina Kumoa. Muutit mieltäsi asettelusta? Kumoa viimeiset 5 muutosta. Kumoa tallentaa 20 viimeistä toimintoa. Tee uudelleen -painike palauttaa kumotun toiminnon. Kokeile rohkeasti erilaisia asetteluja. Kumoa-toiminto antaa sinulle vapauden kokeilla ilman pelkoa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta Esiopetus Materiaali Ilmainen - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Kun tehtävä on valmis, klikkaa "Lataa" -pudotusvalikkoa. Valitse "Tehtävä (PDF)" tai "Tehtävä (JPEG)". PDF on paras useimmille tulostimille. JPEG toimii hyvin nopeaan jakamiseen. Molemmat formaatit ladataan 300 DPI -tarkkuudella. Täydellinen ammattilaatuinen tuloste.

Rastita "Harmaasävy" -valintaruutu jos haluat säästää värimustetta. Järjestelmä muuntaa tehtävän mustavalkoiseksi ennen latausta. Säästää jopa 60 prosenttia musteen kustannuksista. Tärkeää kouluille jotka tulostavat satoja sivuja kuukaudessa. Harmaasävytehtävät ovat yhtä selkeitä kuin värilliset.

Luo vastausavain klikkaamalla "Luo vastausavain". Järjestelmä luo identtisen tehtävän vastauksin merkittynä. "Ympyröi suurin" -tehtävissä vihreä rasti näyttää oikean vastauksen. "Numeroi" -tehtävissä numerot 1-2-3 näkyvät oikeissa kohdissa. Lataa vastausavain samalla tavalla kuin tehtävä. PDF tai JPEG, väri tai harmaasävy.

Tallenna molemmat tiedostot tietokoneellesi. Anna niille selkeät nimet. "Iso-ja-pieni-esikoulu-1.pdf" tai "Kokovertailu-alakoulu-vastaukset.pdf". Järjestä tiedostot kansioihin aiheen mukaan. "Matematiikka", "Esiopetus", "Kokovertailu". Näin löydät ne helposti myöhemmin. Rakenna kirjastoa tehtäviä joita voit käyttää uudelleen vuodesta toiseen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish big-small.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kokovertailutehtävät palvelevat monenlaisia opettajia ja kasvattajia. Esiopetuksen opettajat käyttävät niitä päivittäin. Alakoulun opettajat rakentavat matematiikan oppimista niiden avulla. Kotiopettajat personoivat oppimisen omille lapsilleen. Kieltenopettajat yhdistävät kielenoppimisen ja käsitteiden oppimisen. Erityisopettajat eriyttävät materiaalin jokaisen oppilaan tasolle. Opettajayrittäjät myyvät niitä tulona.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Kokojeäsitteiden opettaminen 5–6-vuotiaille',
        description: 'Luo ympyäri suurin/pienin -tehtäviä kahdella kuvalla esiopetuksen matemaattisten peruskäsitteiden opettamiseen. Oppilaat oppivat iso, pieni ja keskikokoinen -käsitteet konkreettisten kuvien avulla POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Järjestäminen ja vertailu 1. luokalle',
        description: 'Generoi järjestämistehtäviä 3–5 kuvalla 1. luokan matematiikan opetukseen. Oppilaat järjestävät kuvia suurimmasta pienimpaan tai päinvastoin. Tehtävät kehittävät vertailutaitoja ja matemaattista ajattelua.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Kokokäsitteiden harjoittelu kotona',
        description: 'Luo hauskoja kokovertailutehtäviä tuttujen teemojen kuvilla. Eläin- ja kulkuneuvokuvat tekevät matemaattisista käsitteistä konkreettisia. Lapset oppivat vertailutaitoja luonnollisesti pelaten.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kokovertailu ilman kielitaitovaatimusta',
        description: 'Kokovertailutehtävät eivät vaadi lukutaitoa, joten ne sopivat kaikille oppilaille. Visuaalinen vertailu on kieliriippumatonta. Opettaja voi lisätä kokokäsitteiden sanastoa kahdella kielellä.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävät matemaattiset peruskäsitteet',
        description: 'Säädä kuvamäärää ja tehtävätyyppiä HOJKS-tavoitteiden mukaisesti. Kaksi kuvaa ja ympyäri suurin -tyyppi tukevat heikompia oppilaita. Asteittain vaikeutuvat tehtävät rakentavat itseluottamusta.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy matemaattisten peruskäsitteiden paketteja',
        description: 'Luo teemallisia kokovertailupaketteja myyntiin verkossa. Matemaattiset peruskäsitepaketti esiopetukseen ja 1. luokalle ovat suosittuja tuotteita. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish big-small.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kokovertailutehtävistä. Tässä ovat vastaukset 12 yleisimpään kysymykseen. Nämä vastaukset auttavat sinua ymmärtämään työkalun täydellisesti. Täysi Käyttöoikeus -tilaus antaa kaiken tarvitsemasi. Ei piilomaksuja, ei yllätyksiä. Kaikki on selkeästi selitetty.',
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
        question: 'Mitkä tehtävätyypit ovat saatavilla kokovertailuun?',
        answer: 'Viisi tehtävätyyppiä: ympyäri suurin kuva, ympyäri pienin kuva, etsi keskikokoinen, järjestä suurimmasta pienimpaan ja järjestä pienimmästä suurimpaan. Yhdistä eri tyyppejä samaan tehtävään monipuoliseen harjoitteluun.',
      },
      {
        id: '2',
        question: 'Mille ikäryhmille kokovertailutehtävät sopivat?',
        answer: 'Kokovertailutehtävät palvelevat 4–7-vuotiaita. Esikoululaiset vertaavat kahta kuvaa. Esiopetuksen oppilaat hallitsevat kolmen kuvan vertailun. 1. luokan oppilaat järjestävät 4–5 kuvaa kokonsa mukaan.',
      },
      {
        id: '3',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen kokovertailutehtävä generoi automaattisesti vastausavaimen. Oikeat vastaukset näkyvät selkeästi merkittyinaa. Opettajat tarkistavat oppilastöiden ratkaisut sekunneissa.',
      },
      {
        id: '4',
        question: 'Kuinka monta kuvaa voi olla yhdessä harjoituksessa?',
        answer: 'Valitse 2–5 kuvaa per harjoitus. Kaksi kuvaa sopii yksinkertaiseen iso-pieni-vertailuun. Kolmesta viiteen kuvaa mahdollistaa järjestämisen ja monimutkaisen vertailun.',
      },
      {
        id: '5',
        question: 'Miten kokovertailu opettaa matemaattisia käsitteitä?',
        answer: 'Kokovertailutehtävät kehittävät seriointitaitoja (järjestäminen koon mukaan), vertailutaitoja ja matemaattista sanastoa. Nämä ovat varhaisen matematiikan perusedellytyksiä POPS 2014 mukaisesti.',
      },
      {
        id: '6',
        question: 'Voiko omia kuvia käyttää tehtävissä?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdistä omia kuvia kirjaston kuvien kanssa. Luo personoituja kokovertailutehtäviä luokan teemojen mukaan.',
      },
      {
        id: '7',
        question: 'Miten tulostan kokovertailutehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta suurissa erissä.',
      },
      {
        id: '8',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden kokovertailutehtävän luominen vie alle 3 minuuttia. Valitse teema ja tehtävätyyppi 20 sekunnissa. Generaattori luo tehtävän välittömästi. Useimmat opettajat luovat viikon harjoitukset 15 minuutissa.',
      },
      {
        id: '9',
        question: 'Sopivatko kokovertailutehtävät esiopetukseen?',
        answer: 'Kokovertailutehtävät sopivat erinomaisesti esiopetukseen. Käytä ympyäri suurin/pienin -tehtävätyyppiä kahdella kuvalla. Visuaalinen vertailu tukee matemaattisten peruskäsitteiden omaksumista POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '10',
        question: 'Voinko myydä luomiani kokovertailutehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy matemaattisten peruskäsitteiden paketteja verkossa ilman attribuutiovaatimuksia. Luo kokovertailukokoelmia digitaalisina latauksina.',
      },
      {
        id: '11',
        question: 'Voinko yhdistää eri tehtävätyyppejä samaan tehtävään?',
        answer: 'Kyllä, voit luoda tehtäviä, joissa eri harjoitukset käyttävät eri tehtävätyyppejä. Esimerkiksi ympyäri suurin -harjoitukset yhdistettynä järjestämistehtäviin samalla sivulla.',
      },
      {
        id: '12',
        question: 'Miten kokovertailu tukee POPS 2014 tavoitteita?',
        answer: 'Kokovertailutehtävät tukevat POPS 2014 matematiikan tavoitteita vertailun, serioimisen ja luokittelun osa-alueilla. Visuaalinen kokovertailu kehittää matemaattista ajattelua konkreettisten kuvien avulla.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kokovertailutehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'enemman-vahemman-tyoarkit',
        name: 'Enemmän-vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Enemmän-vähemmän -tehtävät laajentavat kokovertailua lukumäärävertailuksi. Molemmat kehittävät matemaattista vertailutaitoa eri konteksteissa.',
      },
      {
        id: '2',
        slug: 'kuvalajittelu-tyoarkit',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📊',
        description: 'Kuvalajittelutehtävät laajentavat kokovertailua muihin luokitteluperusteisiin. Oppilaat lajittelevat kuvia koon lisäksi värin, muodon ja kategorian mukaan.',
      },
      {
        id: '3',
        slug: 'yhteenlasku-tyoarkit',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhteenlaskutehtävät jatkavat matemaattista oppimista kokovertailun jälkeen. Kokokäsitteiden ymmärrys tukee lukumäärän ymmärtämistä yhteenlaskussa.',
      },
      {
        id: '4',
        slug: 'kuviotehtava-tyoarkit',
        name: 'Kuviotehtävät',
        category: 'Logiikka',
        icon: '🔣',
        description: 'Kuviotehtävät täydentävät kokovertailua hahmontunnistuksella. Molemmat kehittävät visuaalista päättelykykyä ja luokittelutaitoja.',
      },
      {
        id: '5',
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske -tehtävät yhdistävät visuaalisen etsinnän ja laskemisen. Oppilaat laskevat kuvia ja vertaavat lukumääriä kokovertailun tavoin.',
      },
      {
        id: '6',
        slug: 'varityskuvat-tyoarkit',
        name: 'Värityskuvat',
        category: 'Taide ja luovuus',
        icon: '🎨',
        description: 'Värityskuvat tarjoavat palkitsevan jatkon kokovertailutehtävien jälkeen. Yhdistä matemaattinen harjoittelu ja luova ilmaisu tasapainoisiksi oppitunneiksi.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 175) ------------------------------------

  aiOverviewSnippet: 'Iso ja pieni -generaattori on verkkotyokalu, jolla luodaan tulostettavia kokovertailutehtavia esiopetukseen ja alakouluun. Opettajat valitsevat tehtavatyypin, kuvamaaran ja teeman, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Tehtävätyypit',
      ourApp: '5 tyyppiä: ympyäri, etsi, järjestä (2 suuntaa)',
      typical: '1–2 perustyyppiä',
    },
    {
      feature: 'Kuvamäärä',
      ourApp: '2–5 kuvaa per harjoitus säädettävästi',
      typical: 'Kiinteä kuvamäärä',
    },
    {
      feature: 'Kuvavihjeet',
      ourApp: '3000+ teemakuvaa eri kokoina',
      typical: 'Yksinkertaiset geometriset muodot',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Usein lisämaksullinen',
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
      claim: 'Kokovertailu- ja seriointitehtävät ovat varhaisen matemaattisen ajattelun perusedellytyksiä. Järjestäminen koon mukaan rakentaa lukujonon ymmärrystä ja vertailutaitoja.',
      source: 'Aunio, P. & Räsänen, P., "Varhaisten matemaattisten taitojen arviointi ja tukeminen," NMI-bulletin',
    },
    {
      claim: 'Visuaalinen vertailu konkreettisilla kuvilla tuottaa vahvemman käsitteellisen ymmärryksen kuin abstraktit symbolit, erityisesti 4–7-vuotiailla oppijoilla siirtyessä konkreettisesta abstraktiin.',
      source: 'Mattinen, A., "Matemaattisten taitojen kehittyminen varhaiskasvatuksessa," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Viisi tehtavatyyppia samalla sivulla tekee kokovertailusta monipuolista. Esiopetuksen oppilaani oppivat iso ja pieni -kasitteet viikossa kun tehtavat yhdistetaan konkreettisiin kokemuksiin.',
      name: 'Jenni Toivonen',
      role: 'Esiopetuksen opettaja',
      school: 'Satumetsaan paivakoti, Espoo',
    },
    {
      quote: 'Jarjestamistehtavat ovat loistava lammittely ennen lukujonoharjoituksia. Ekaluokkalaiseni ymmartavat paremmin lukujen suuruusjarjestyksen kun he ensin jarjestavat kuvia kokonsa mukaan.',
      name: 'Ville Rantanen',
      role: '1. luokan opettaja',
      school: 'Keltinmaan koulu, Oulu',
    },
  ],

  tips: {
    sectionTitle: 'Kokovertailustrategiat luokka-asteittain',
    sectionDescription: 'Säädä kokovertailugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset tehtävätyypin, kuvamäärän ja vaikeustason esikoulusta toiseen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Iso ja pieni kahdella kuvalla',
        description: 'Kaytta ympyroi suurin/pienin -tehtavatyyppia kahdella kuvalla. Esikoululaiset oppivat peruskasitteet iso ja pieni konkreettisten kuvien avulla. Valitse tuttuja teemoja kuten elaimet tai kulkuneuvot motivaation yllapitamiseksi.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Kolme kuvaa ja keskikokoinen',
        description: 'Luo kolmen kuvan tehtavia lisaamalla keskikokoinen-kasitteen. Esiopetuksen oppilaat harjoittelevat kolmeen koon erottelua. Ympyroi-tehtavat kehittavat visuaalista erottelua POPS 2014 matemaattisten peruskasitteiden tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Järjestäminen 4–5 kuvalla',
        description: 'Generoi jarjestamistehtavia 4–5 kuvalla suurimmasta pienimpaan tai painvastoin. Ekaluokkalaiset kehittavat seriointitaitoja ja lukujonon ymmarysta. Kaytta tehtavia lammittelyna ennen lukujonoharjoituksia.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Monipuoliset tehtävätyypit',
        description: 'Yhdista eri tehtavatyyppeja samaan tehtavaan. Toisluokkalaiset vertaavat, jarjestavat ja luokittelevat kuvia kokonsa mukaan. Tehtavat toimivat matemaattisen sanaston harjoitteluna.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Soveltavat vertailutehtävät',
        description: 'Kaytta kokovertailua soveltavissa tehtavissa, joissa oppilaat vertaavat mittoja ja suuruuksia. Kolmasluokkalaiset siirtyvat visuaalisesta vertailusta numeeriseen vertailuun POPS 2014 mittaamisen tavoitteiden mukaisesti.',
      },
    ],
  },
};

export default bigSmallFiContent;
