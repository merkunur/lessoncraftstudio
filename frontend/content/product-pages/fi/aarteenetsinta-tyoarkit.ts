import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Finnish Content (Aarteenetsintä Tehtävät)
 *
 * File: frontend/content/product-pages/fi/aarteenetsinta-tyoarkit.ts
 * URL: /fi/apps/aarteenetsinta-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access (Täysi Käyttöoikeus) - €240/year
 */

export const treasureHuntFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'aarteenetsinta-tyoarkit',
    appId: 'treasure-hunt',
    title: 'Aarteenetsintä Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia aarteenetsintä-tehtäviä suuntasanaston ja ohjeiden ymmärtämisen harjoitteluun. Hauska seikkailutehtävä esikoulusta 2. luokalle. Ilmainen.',
    keywords: 'aarteenetsintä generaattori, suunnistuspeli lapsille, vihjepeli tulostettava, tutkimustehtävä esikoulu, seikkailupeli oppiminen, reitinhaku harjoitus, looginen päättelyketju, etsintätehtävä luokkaan, ongelmanratkaisu seikkailu, perustelutaito harjoitus, vihjeiden seuraaminen, aarteenetsintä tehtävät, suuntasanasto harjoitus',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/aarteenetsinta-tyoarkit',
  },

  // Hero Section - FULL text from Finnish treasure-hunt.md
  hero: {
    title: 'Aarteenetsintä Generaattori',
    subtitle: 'Suuntasanaston ja Ohjeiden Ymmärtämisen Seikkailuharjoituksia',
    description: `Luo ammattimaisia aarteenetsintä-tehtäviä tulostettavat tehtävät lapsille ilmainen suunnittelijalla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Luo räätälöityjä tulostettavia aarteenetsintä-tehtäviä täydellisiä esiopetukseen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Aarteenetsintä-tehtävät opettavat suuntasanastoa ja visuaalista tunnistamista. Lapset tunnistavat kuvia ruudukossa ja kuvaavat niiden sijainteja käyttäen suuntakieltä. Valitse kuusi kuvaa teemoista tai lataa omia kuvia. Sovellus luo ruudukon jossa oppilaat harjoittelevat "ylös", "alas", "vasen", "oikea" tai "pohjoinen", "etelä", "itä", "länsi" -sanastoa. Täydellinen esikoululaisille, ensimmäisen luokan ja toisen luokan oppilaille.

Tulostettavat tehtävät lapsille ilmainen suunnittelija tekee aarteenetsintä-tehtävien luomisesta helppoa. Valitse kuusi kuvaa yli 3000 lapsille sopivasta kuvasta. Tai lataa omia kuvia yhdistääksesi luokan aiheisiin. Jokainen tehtävä on täysin muokattavissa canvasilla. Vedä, kierrä, skaalaa tai poista mitä tahansa elementtiä. Lisää tekstielementtejä, vaihda taustoja ja reunuksia. Luo rajattomasti ainutlaatuisia esiopetus materiaali ilmainen tehtäviä.`,
    previewImageSrc: '/samples/finnish/treasure hunt/sample-1.jpeg',
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
        videoId: 'flHiBXsYLLA',
        buttonText: 'Aarteenetsintä Toiminnot',
        modalTitle: 'Aarteenetsintä Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
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

  // Features Grid - FULL text from Finnish treasure-hunt.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Aarteenetsintä-tehtävien suunnittelija sisältää kaiken tarvitsemasi esiopetus materiaali ilmainen luomiseen. Luo ammattimaisia tehtäviä kolmessa napsautuksessa. Muokkaa kaikkea canvasilla täydellä vapaudella. Lataa omia kuvia tai valitse yli 3000 kuvasta. Jokainen ominaisuus on suunniteltu opettajille jotka tarvitsevat nopeita, laadukkaita tulostettavia tehtäviä. Täysi Käyttöoikeus -tilauksesi antaa rajattoman käytön kaikkiin ominaisuuksiin.',
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
        icon: '🗺️',
        title: 'Seikkailupohjainen suunnistus- ja etsintätehtävämuoto',
        description: 'Generaattori luo 5×5-ruudukon jossa kuusi kuvaa on sijoitettu eri paikkoihin. Oppilaat seuraavat kuuden askeleen suuntaohjeita löytääkseen aarteen. Seikkailuteema motivoi oppilaita harjoittelemaan suuntasanastoa.',
      },
      {
        id: '2',
        icon: '🧭',
        title: 'Kaksi suuntatyyppiä: perus- ja ilmansuunnat',
        description: 'Perussuunnat (ylös, alas, vasen, oikea) sopivat 4–7-vuotiaille. Ilmansuunnat (pohjoinen, etelä, itä, länsi) haastavat vanhempia oppilaita. Valitse sopiva taso oppilaidesi kehitysvaiheelle.',
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Kuuden askeleen suuntaohjesarjat',
        description: 'Jokainen tehtävä sisältää kuusi suuntaohjetta, jotka johdattavat oppilaan aarteelle. Ohjeet harjoittavat monivaiheisten ohjeiden seuraamista ja avaruudellista päättelyä. Satunnaistaminen varmistaa uniikkeja tehtäviä.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa seikkailuruudukkoihin',
        description: 'Valitse yli 3000 lapsiystavellisesta kuvasta seikkailun luomiseen. Eläin-, ruoka- ja kulkuneuvoteemat tekevät jokaisesta aarteenetsinnästä ainutlaatuisen. Lataa omia kuvia luokkahuoneen esineistä.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet piirretyllä reitillä',
        description: 'Jokainen aarteenetsintätehtävä generoi automaattisesti vastausavaimen, jossa oikea reitti on piirretty ruudukkoon. Opettajat tarkistavat oppilastöitä sekunneissa. Reitin piirtaminen havainnollistaa oikean vastauksen.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Klikkaa mitä tahansa elementtiä muokataksesi sitä suoraan. Siirrä, skaalaa, kierrä tai poista osia. Lisää omia tekstejä, vaihda fontteja ja värejä. Tausta- ja reunusteemat lisäävät visuaalista kiinnostavuutta.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi ja rajaton käyttö',
        description: 'Tilauksesi sisältää kaupallisen lisenssin myydä aarteenetsintätehtäviä verkossa. Luo temaattisia seikkailupaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eikä lisämaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo aarteenetsintätehtäviä 11 kielellä. Suuntaohjeet kääntyvät valitulle kielelle automaattisesti. Täydellinen monikielisille luokkahuoneille ja suuntasanaston opetukseen eri kielillä.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish treasure-hunt.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Aarteenetsintä-tehtävien luominen vie alle kolme minuuttia alusta loppuun. Seuraa näitä viittä yksinkertaista vaihetta. Ei teknisiä taitoja tarvita. Ei monimutkaista muotoilua. Pelkkää suoraviivaista, nopeaa tehtävien luomista. Täysi Käyttöoikeus -tilauksesi antaa rajattoman pääsyn kaikkiin vaiheisiin.',
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
        title: 'Valitse Kuusi Kuvaa Lukemaan Oppiminen Tehtävät - Teema, Kuvakirjasto tai Omat Kuvat',
        description: `Aloita valitsemalla kuusi kuvaa aarteenetsintä-ruudukkoosi. Kolme vaihtoehtoa tekevät tästä helpoksi. Valitse teema nopeaa luomista varten. Valitse kuusi kuvaa manuaalisesti täydelliseen hallintaan. Tai lataa omia kuvia personoituja tehtäviä varten.

Teemojen valinta on nopein tapa. Avaa "Arvoituksen Asetukset" -osio. Napsauta "Luo Teemasta" -alasvetovalikkoa. Selaa yli 100 teemaa. Eläimet, ruoka, koulu, liikenne, ammattit, luonto, urheilu. Valitse mikä tahansa teema. Sovellus valitsee automaattisesti kuusi kuvaa kyseisestä teemasta. Täydellinen nopeaan tehtävien luomiseen.

Manuaalinen kuvan valinta antaa täydellisen hallinnan. Avaa "Kuvakirjasto" -osio. Valitse teema alasvetovalikosta. Tai etsi kuvia avainsanalla. Napsauta kuvia lisätäksesi ne valintaasi. Esikatselu näyttää valitut kuvat. Napsauta uudelleen poistaaksesi kuvan. Valitse täsmälleen kuusi kuvaa jatkaaksesi.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Valitse Suuntatyyppi Matematiikka Tehtävät Alakoulu - Perus tai Ilmansuunnat',
        description: `Suuntatyypin valinta määrittää sanastotason. Kaksi vaihtoehtoa palvelee eri ikäryhmiä. Perussuunnat esikoululaisille ja ensimmäisen luokan oppilaille. Ilmansuunnat toisen luokan ja vanhemmille oppilaille. Valitse sopiva taso oppilaillesi.

Perussuunnat käyttävät "ylös", "alas", "vasen", "oikea" -sanastoa. Täydellinen esiopetukseen ja alakoulun alkuun. Lapset oppivat näitä suuntia päivittäin. Helppoa ymmärtää ja harjoitella. Luo vahvan perustan suunta-ajattelulle. Sopii 4-7 vuotiaille oppilaille.

Ilmansuunnat käyttävät "pohjoinen", "etelä", "itä", "länsi" -sanastoa. Sopii toisen luokan ja vanhemmille. Vaatii abstraktimpaa ajattelua. Yhdistää karttaitoihin ja maantieteeseen. Valmistaa kompassin käyttöön. Täydellinen 7-10 vuotiaille oppilaille.`,
        icon: '🧭',
      },
      {
        id: '3',
        number: 3,
        title: 'Mukauta Sivun Asetukset Pisteestä Pisteeseen Tehtävät - Koko, Taustat ja Reunukset',
        description: `Sivun asetukset määrittävät tehtäväsi ulkoasun. Valitse sivun koko tulostustarpeidesi mukaan. Lisää taustoja ja reunuksia visuaalista vetovoimaa varten. Kaikki asetukset ovat valinnaiset. Perusruudukko toimii ilman koristeita.

Sivun koko vaikuttaa tulostukseen. Letter Portrait amerikkalaisille tulostimille. A4 Portrait eurooppalaisille tulostimille. Landscape-orientaatiot leveämmille asetteluille. Neliö 1200x1200 Instagram-jakoihin. Mukautettu koko täydelliseen hallintaan. Valitse alasvetovalikosta "Sivun Asetukset" -osiossa.

Taustateemojen lisääminen tekee tehtävistä houkuttelevia. Valitse taustateema alasvetovalikosta. Tähtitaivas, ruudukko, gradientit, luontoteemat. Säädä taustan läpinäkyvyyttä liukusäätimellä. Reunusteemat lisäävät ammattimaista viimeistelyä.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Luo Tehtävä ja Muokkaa Canvasilla - Täysi Räätälöinti Hienomotoriikka Harjoitukset',
        description: `Napsauta "Luo" -välilehteä nähdäksesi tehtäväsi. Kuusi kuvaa ilmestyvät ruudukkoon. Satunnainen sijoittelu jokaisella luomisella. Esikatselu näyttää täsmälleen miltä tuloste näyttää. Nyt täysi muokkausvoima on käsissäsi.

Kaikki kuusi kuvaa ovat täysin muokattavissa. Napsauta mitä tahansa kuvaa valitaksesi sen. Vedä uuteen sijaintiin. Käytä kulmakahvoja skaalaamiseen. Pyöritä kahvat kiertoihin. Poista-painike poistaa ei-haluttuja kuvia. Lisää uusia kuvia kirjastosta milloin tahansa.

Tekstielementtien lisääminen personoi tehtäviä. Napsauta "Lisää Teksti" -painiketta. Kirjoita otsikko tai ohjeet. Valitse fontista seitsemästä lapsille sopivasta fontista. Säädä fontin kokoa. Vaihda tekstin väriä. Vedä teksti täydelliseen asentoon.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa Tulostettavat Tehtävät Lapsille Ilmainen PDF tai JPEG - Korkealaatuinen Vienti',
        description: `Kun tehtäväsi näyttää täydelliseltä, on aika viedä. Kaksi vientimuotoa palvelee eri tarpeita. PDF tulostukseen ja digitaalisiin työkirjoihin. JPEG kuvankäsittelyyn tai verkkopostauksiin. Molemmat 300 DPI ammattimaista laatua.

PDF-vienti on yleisin valinta. Napsauta "Lataa" -pudotusvalikkoa. Valitse "Lataa PDF". Tiedosto latautuu välittömästi. Avaa ja tulosta millä tahansa tulostimella. Terävät linjat ja kirkkaat värit. Täydellinen laatu kotitulostimilla. Ammattimainen laatu kaupalliseen myyntiin.

Harmaasävyvaihtoehto säästää mustetta. Valitse harmaasävyn valintaruutu ennen lataamista. Mustat ääriviivat pysyvät terävinä. Värikuvat muuttuvat harmaasävyiksi. Täydellinen massatulostukseen. Sekä PDF että JPEG tukevat harmaasävyä.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish treasure-hunt.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Aarteenetsintä-tehtävät palvelevat monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat, kielenopettajat, erityisopettajat ja opettajayrittäjät. Jokainen ryhmä hyötyy suuntasanaston opetuksesta. Täysi Käyttöoikeus -tilaus antaa kaikille rajattoman pääsyn.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Suuntasanaston perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia aarteenetsintätehtäviä perussuunnilla (ylös, alas, vasen, oikea). Esiopetuksen oppilaat oppivat suuntasanastoa seikkailun kautta. Hauska pelimuoto motivoi harjoittelemaan ohjeiden seuraamista. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Ilmansuunnat ja karttaitaidot 1.–2. luokalla',
        description: 'Generoi tehtäviä ilmansuunnilla (pohjoinen, etelä, itä, länsi). Oppilaat kehittävät karttaitaitoja ja avaruudellista päättelyä. Aarteenetsintä yhdistää maantieteen ja kielitaidon harjoittelun.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja suunnistusseikkailuja kotiin',
        description: 'Luo temaattisia aarteenetsintätehtäviä lasten suosikkiaiheilla. Seikkailumuoto tekee suuntasanaston oppimisesta hauskaa. Viikon tehtävät valmistuvat nopeasti eri teemoilla ja vaikeustasoin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Suuntasanastoa visuaalisesti',
        description: 'Aarteenetsintätehtävät opettavat suuntasanastoa kuvapohjaisesti. Oppilaat oppivat suunnat konkreettisesti ruudukkoliikkumisen kautta. 11 kielen tuki mahdollistaa monikielisen suuntasanaston opetuksen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävät suunnistusharjoitukset',
        description: 'Valitse perussuunnat ja selvät kuvat HOJKS-tavoitteiden mukaisesti. Ruudukon visuaalisuus tukee suuntien hahmottamista. Asteittain vaikeutuvat tehtävät rakentavat avaruudellista ymmärtämistä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy seikkailupaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia aarteenetsintäpaketteja myytäväksi verkossa. Seikkailutehtävät ovat suosittuja esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish treasure-hunt.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Vastaukset yleisimpiin kysymyksiin aarteenetsintä-tehtävistä. Hinnoittelusta ominaisuuksiin. Käytöstä räätälöintiin. Kaikki mitä tarvitset tietää ennen aloittamista.',
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
        question: 'Miten aarteenetsintägeneraattori toimii?',
        answer: 'Generaattori luo 5×5-ruudukon jossa kuusi kuvaa on sijoitettu eri paikkoihin. Oppilas seuraa kuuden askeleen suuntaohjeita löytääkseen aarteen. Vastausavain näyttää oikean reitin piirrettynä.',
      },
      {
        id: '2',
        question: 'Mitkä suuntatyypit ovat saatavilla?',
        answer: 'Kaksi tyyppiä: perussuunnat (ylös, alas, vasen, oikea) sopivat esikoululaisille ja ensimmäisen luokan oppilaille. Ilmansuunnat (pohjoinen, etelä, itä, länsi) haastavat toisen luokan ja vanhempia oppilaita.',
      },
      {
        id: '3',
        question: 'Kuinka monta suuntaohjetta per tehtävä?',
        answer: 'Jokainen tehtävä sisältää kuusi suuntaohjetta jotka johdattavat oppilaan ruudukon läpi aarteelle. Kuuden askeleen sarja harjoittaa monivaiheisten ohjeiden seuraamista ja muistamista.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen tehtävä generoi automaattisesti vastausavaimen jossa oikea reitti on piirretty ruudukkoon. Opettajat tarkistavat oppilastöitä nopeasti vertaamalla reitttejä.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille aarteenetsintä sopii?',
        answer: 'Aarteenetsintätehtävät palvelevat 4–10-vuotiaita. Esikoululaiset käyttävät perussuuntia. 1. luokan oppilaat vahvistavat suuntasanastoa. 2.–3. luokkalaiset siirtyvät ilmansuuntiin.',
      },
      {
        id: '6',
        question: 'Miten kuvat valitaan ruudukkoon?',
        answer: 'Kolme tapaa: valitse teema automaattiseen kuuden kuvan valintaan, selaa kuvakirjastoa manuaalisesti tai lataa omia kuvia. Generaattori sijoittaa kuusi kuvaa satunnaisesti 5×5-ruudukkoon.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Luokkahuoneen esineet, oppilaiden piirustukset tai aihekohtaiset kuvat tekevät tehtävistä merkityksellisempiä.',
      },
      {
        id: '8',
        question: 'Miten tulostan aarteenetsintätehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Ammattimaiset tulosteet kotitulostimella.',
      },
      {
        id: '9',
        question: 'Sopiiko generaattori erityisopetukseen?',
        answer: 'Erinomaisesti. Perussuunnat ja selvät kuvat tukevat heikompia oppilaita. Ruudukon visuaalisuus auttaa suuntien hahmottamisessa. Säädä suuntatyyppiä HOJKS-tavoitteiden mukaisesti.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden aarteenetsintätehtävän luominen vie alle 3 minuuttia. Valitse kuvat ja suuntatyyppi 30 sekunnissa. Generaattori luo ruudukon ja suuntaohjeet välittömästi.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani tehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy seikkailupaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Aarteenetsintätehtävät ovat suosittuja opetusmateriaaleja.',
      },
      {
        id: '12',
        question: 'Miten aarteenetsintä tukee POPS 2014 tavoitteita?',
        answer: 'Aarteenetsintä kehittää avaruudellista hahmotusta, suuntasanastoa ja ohjeiden seuraamista. POPS 2014 korostaa toiminnallisuutta ja monipuolisia oppimistapoja. Seikkailumuoto toteuttaa molempia tavoitteita motivoivasti.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä aarteenetsintä-tehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'etsi-esineet-tyoarkit',
        name: 'Etsi esineet',
        category: 'Tarkkaavaisuus',
        icon: '🔎',
        description: 'Etsintätehtävät kehittävät visuaalista havainnointia ja kohteiden paikantamista. Täydentää aarteenetsinnän spatiaalista harjoittelua.',
      },
      {
        id: '2',
        slug: 'kuvapolku-tyoarkit',
        name: 'Kuvapolku',
        category: 'Logiikka',
        icon: '🛤️',
        description: 'Kuvapolku kehittää reitin seuraamista ja loogista etenemistä. Molemmat harjoittavat avaruudellista navigointia eri muodoissa.',
      },
      {
        id: '3',
        slug: 'prepositio-tyoarkit',
        name: 'Prepositiot',
        category: 'Kieli',
        icon: '📍',
        description: 'Paikkasanatehtävät laajentavat avaruudellista sanastoa. Yhdistä aarteenetsinnän suuntasanaston kanssa kattavaan spatiaaliseen kielenoppimiseen.',
      },
      {
        id: '4',
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske yhdistää laskemisen ja etsinnän. Täydentää aarteenetsinnän etsintätaitoja matemaattisella ulottuvuudella.',
      },
      {
        id: '5',
        slug: 'ruudukko-sovitus-tyoarkit',
        name: 'Ruudukkoyhdistäminen',
        category: 'Hahmottaminen',
        icon: '📲',
        description: 'Ruudukkoyhdistäminen kehittää ruudukkopohjaista avaruudellista ajattelua. Molemmat käyttävät ruudukkomuotoa spatiaalisten taitojen harjoitteluun.',
      },
      {
        id: '6',
        slug: 'varjoyhdistely-tyoarkit',
        name: 'Varjoyhdistely',
        category: 'Hahmottaminen',
        icon: '👻',
        description: 'Varjoyhdistely kehittää visuaalista hahmotusta joka tukee aarteenetsinnän kohteiden tunnistamista ruudukossa.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 178) ------------------------------------

  aiOverviewSnippet: 'Aarteenetsintgeneraattori on verkkotyokalu, jolla luodaan tulostettavia suunnistus- ja etsintatehtavia esiopetukseen ja alakouluun. Oppilaat seuraavat kuuden askeleen suuntaohjeita 5x5-ruudukossa loytaakseen aarteen. Valitse perussuunnat tai ilmansuunnat, kuusi kuvaa teemoista, ja lataa valmis PDF-tehtava vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Suuntatyypit',
      ourApp: 'Perussuunnat ja ilmansuunnat',
      typical: 'Vain yksi suuntatyyppi',
    },
    {
      feature: 'Suuntaohjesarjat',
      ourApp: '6 askeleen sarjat automaattisesti',
      typical: 'Yksittäisiä ohjeita',
    },
    {
      feature: 'Ruudukkomuoto',
      ourApp: '5×5-ruudukko visuaalisella reitinpiirtolla',
      typical: 'Vapaamuotoinen tai ei ruudukkoa',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Piirretty reitti automaattisesti',
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
      claim: 'Monivaiheisten suuntaohjeiden seuraaminen kehittää avaruudellista kieltä ja työmuistia, jotka ovat keskeisiä oppimisen edellytyksiä varhaiskasvatusikäisillä.',
      source: 'Lehtinen, E. et al., "Spatiaalisen ajattelun kehitys ja tukeminen varhaiskasvatuksessa," Turun yliopisto',
    },
    {
      claim: 'Ilmansuuntien ja karttaitaitojen harjoittelu ruudukkotehtävillä vahvistaa avaruudellista hahmotusta ja matemaattista ajattelua konkreettisella tavalla.',
      source: 'Hannula-Sormunen, M., "Matemaattisen ja spatiaalisen ajattelun yhteys," Jyväskylän yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Aarteenetsintatehtavat ovat loistava tapa opettaa suuntasanastoa seikkailun kautta. Oppilaani oppivat ylos, alas, vasen ja oikea luontevasti ruudukkonavigaation avulla. Pelimuoto pitaa motivaation korkealla.',
      name: 'Kaisa Turunen',
      role: 'Esiopetuksen opettaja',
      school: 'Katajanokka päiväkoti, Helsinki',
    },
    {
      quote: 'Kaytan aarteenetsintatehtavia maantiedon tunneilla ilmansuuntien opettamiseen. Toisluokkalaiset oppivat pohjoinen, etela, ita ja lansi konkreettisesti ruudukkonavigaation kautta. Vastausavaimen piirretty reitti tekee tarkistuksesta helppoa.',
      name: 'Outi Pitkänen',
      role: '2. luokan opettaja',
      school: 'Puistolan koulu, Helsinki',
    },
  ],

  tips: {
    sectionTitle: 'Aarteenetsintästrategiat luokka-asteittain',
    sectionDescription: 'Säädä aarteenetsintägeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset suuntatyypin, kuvat ja ohjesarjan monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Perussuunnat selväillä kuvilla',
        description: 'Kaytta perussuuntia (ylos, alas, vasen, oikea) selvasti erottuvilla kuvilla. Esikoululaiset oppivat neljaa perussuuntaa seikkailun kautta. Lyhyet ohjeet rakentavat suuntasanaston perustaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Suuntasanaston vahvistaminen',
        description: 'Luo tehtavia perussuunnilla ja monipuolisilla teemakuvilla. Esiopetuksen oppilaat vahvistavat suuntasanastoa seuraamalla kuuden askeleen ohjeita. Tukee POPS 2014 avaruudellisen ajattelun tavoitteita.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Siirtyminen ilmansuuntiin',
        description: 'Generoi tehtavia jotka esittelevat ilmansuuntia asteittain. Ekaluokkalaiset siirtyvat perussuunnista ilmansuuntiin opettajan tuella. Yhdista karttaitaitojen opetukseen.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Ilmansuunnat ja karttaitaidot',
        description: 'Luo tehtavia ilmansuunnilla. Toisluokkalaiset hallitsevat pohjoinen, etela, ita ja lansi ja kayttavat niita ruudukkonavigaatiossa. Kehittaa karttaitaitoja ja avaruudellista paattelya.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Haastavat suunnistusseikkailut',
        description: 'Kaytta ilmansuuntia monimutkaisilla reiteilla. Kolmasluokkalaiset navigoivat nopeasti ja tarkasti. Luo tehtavia jotka vaativat strategista suunnittelua ja usean askeleen muistamista.',
      },
    ],
  },
};

export default treasureHuntFiContent;
