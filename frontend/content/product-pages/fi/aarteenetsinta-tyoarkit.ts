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
    title: 'Aarteenetsintä-tehtävät Lapsille - Tulostettavat Tehtävät Lapsille Ilmainen Suunnittelija - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia aarteenetsintä-tehtäviä tulostettavat tehtävät lapsille ilmainen suunnittelijalla. Full Access -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Lataa 300 DPI PDF alle 3 minuutissa.',
    keywords: 'aarteenetsintä tehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, suuntasanasto, hienomotoriikka harjoitukset, lukemaan oppiminen tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/aarteenetsinta-tyoarkit',
  },

  // Hero Section - FULL text from Finnish treasure-hunt.md
  hero: {
    title: 'Aarteenetsintä Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia aarteenetsintä-tehtäviä tulostettavat tehtävät lapsille ilmainen suunnittelijalla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Luo räätälöityjä tulostettavia aarteenetsintä-tehtäviä täydellisiä esiopetukseen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Aarteenetsintä-tehtävät opettavat suuntasanastoa ja visuaalista tunnistamista. Lapset tunnistavat kuvia ruudukossa ja kuvaavat niiden sijainteja käyttäen suuntakieltä. Valitse kuusi kuvaa teemoista tai lataa omia kuvia. Sovellus luo ruudukon jossa oppilaat harjoittelevat "ylös", "alas", "vasen", "oikea" tai "pohjoinen", "etelä", "itä", "länsi" -sanastoa. Täydellinen esikoululaisille, ensimmäisen luokan ja toisen luokan oppilaille.

Tulostettavat tehtävät lapsille ilmainen suunnittelija tekee aarteenetsintä-tehtävien luomisesta helppoa. Valitse kuusi kuvaa yli 3000 lapsille sopivasta kuvasta. Tai lataa omia kuvia yhdistääksesi luokan aiheisiin. Jokainen tehtävä on täysin muokattavissa canvasilla. Vedä, kierrä, skaalaa tai poista mitä tahansa elementtiä. Lisää tekstielementtejä, vaihda taustoja ja reunuksia. Luo rajattomasti ainutlaatuisia esiopetus materiaali ilmainen tehtäviä.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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
  },

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Aarteenetsintä Tehtävät Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkityöarkit nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Aarteenetsintätehtävä perussuunnilla ylös alas vasen oikea esiopetukseen',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Aarteenetsintätehtävä ilmansuunnilla pohjoinen etelä itä länsi alakouluun',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish treasure-hunt.md feature sections
  features: {
    sectionTitle: 'Aarteenetsintä Tehtävät - Tulostettavat Tehtävät Lapsille Ilmainen ja Hienomotoriikka Harjoitukset',
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
        icon: '⚡',
        title: 'Luo Tulostettavat Tehtävät Lapsille Ilmainen Kolmessa Napsautuksessa - Esiopetus Materiaali Nopea',
        description: `Aarteenetsintä-tehtävien luominen vie alle kolme minuuttia. Valitse teema tai valitse kuusi kuvaa manuaalisesti. Valitse suuntatyyppi (perus tai ilmansuunnat). Napsauta "Luo" ja tehtäväsi ilmestyy. Ei muotoilua, ei asettelua, ei teknisiä taitoja tarvita. Pelkkää yksinkertaista, nopeaa tehtävien luomista.

Teemojen valinta tekee luomisesta vieläkin nopeammaksi. Sovellus valitsee automaattisesti kuusi kuvaa valitusta teemasta. Eläimet, ruoka, koulu, liikenne, välineet - yli 100 teemaa saatavilla. Tai valitse kuusi kuvaa manuaalisesti täydelliseen hallintaan. Esikatselu näyttää valintasi välittömästi. Yhdistä kirjastojen kuvia ja omia ladattuja kuvia.

Kaksi suuntavaihtoehtoa palvelee eri ikäryhmiä. Perussuunnat (ylös/alas/vasen/oikea) täydellisiä esikoululaisille ja ensimmäisen luokan oppilaille. Ilmansuunnat (pohjoinen/etelä/itä/länsi) sopivat toisen luokan ja vanhemmille oppilaille. Sovellus luo automaattisesti sopivan sanastotason.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Matematiikka Tehtävät Alakoulu Canvasilla - Täysi Räätälöinti',
        description: `Jokainen elementti aarteenetsintä-tehtävässäsi on täysin muokattavissa. Vedä kuvia uusiin sijainteihin. Kierrä tai skaalaa mitä tahansa kuvaa. Poista elementtejä yhdellä napsautuksella. Lisää uusia kuvia kirjastosta milloin tahansa. Canvasilla muokkaaminen antaa täydellisen hallinnan.

Tekstityökalut mahdollistavat otsikon tai ohjeiden lisäämisen. Valitse seitsemästä lapsille sopivasta fontista. Säädä fontin kokoa 8:sta rajattomaan. Vaihda tekstin väriä täsmälleen haluamaksesi. Vedä tekstielementit täydelliseen asentoon. Kaikki tekstit ovat täysin muokattavissa luomisen jälkeen.

Taustateemojen lisääminen tekee tehtävistäsi visuaalisesti houkuttelevia. Valitse kymmenistä taustateemoista. Säädä taustan läpinäkyvyyttä 10% - 100%. Reunusteemat lisäävät ammattimaista viimeistelyä. Yhdistä taustoja, reunuksia ja kuvia rajattomiin ainutlaatuisiin suunnitelmiin. Jokainen tehtävä voi näyttää erilaiselta.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia Hienomotoriikka Harjoitukset Personointiin - Yhdistä Kirjaston Kuvia Omiin',
        description: `Monikuva-lataus mahdollistaa omien kuvien lisäämisen nopeasti. Valitse useita tiedostoja kerralla. Tuetut formaatit: JPEG, PNG, GIF. Ladatut kuvat ilmestyvät esikatselualueelle välittömästi. Napsauta lisätäksesi ne aarteenetsintä-ruudukkoon.

Yhdistä ladattuja kuvia kirjaston kuviin. Lataa neljä luokkahuoneen esinekuvaa. Valitse kaksi kuvaa 3000+ kuvan kirjastosta. Luo personoituja tehtäviä jotka vastaavat opetussuunnitelmaasi. Täydellinen temaattisiin yksiköihin jotka liittyvät oppilaiden elämään.

Ladatut kuvat pysyvät istunnossa muokattavissa. Käytä niitä useissa tehtävissä. Vie korkealaatuisina 300 DPI tulosteina. Kaikki ladatut kuvat toimivat täsmälleen kuten kirjaston kuvat. Sama vedä-ja-pudota toiminnallisuus. Sama skaalaus ja kierto. Täysi integraatio tehtävien luomisprosessiin.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kieltä - Monikielinen Lukemaan Oppiminen Tehtävät Opetus',
        description: `Kielituki on kriittinen ominaisuus aarteenetsintä-tehtäville. Sovellus tukee 11 kieltä sekä käyttöliittymälle että sisällölle. Suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja. Suuntasanasto muuttuu valitun kielen mukaan automaattisesti.

Esikielenoppijat hyötyvät valtavasti monikielisistä tehtävistä. Opeta "ylös/alas/vasen/oikea" suomeksi. Opeta "up/down/left/right" englanniksi. Opeta "arriba/abajo/izquierda/derecha" espanjaksi. Sama visuaalinen ruudukkorakenne kaikilla kielillä. Johdonmukainen oppimiskokemus eri kielillä.

Kaksikieliset luokkahuoneet tarvitsevat materiaaleja molemmilla kielillä. Luo aarteenetsintä-tehtäviä suomeksi aamupäivällä. Luo samat tehtävät englanniksi iltapäivällä. Kestää vain muutaman minuutin luoda molemmat versiot. Kansainväliset koulut rakastavat monikielistä tukea.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen POD-Lisenssi Sisältyy - Myy Aarteenetsintä-tehtäviä Verkossa',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen print-on-demand -lisenssin. Myy luomiasi aarteenetsintä-tehtäviä Etsyssä. Myy Teachers Pay Teachersissa. Myy Amazon KDP:ssä. Ei lisälisensointimaksuja tilauksesi lisäksi. Täydellinen opettajayrittäjille.

Kaupallinen lisenssi kattaa kaikki luomasi tehtävät. Luo aarteenetsintä-tehtävät. Vie 300 DPI PDF:nä. Lataa myyntialustallesi. Ala myydä välittömästi. Ei attribuutiota tarvitaan. Ei rojalteja maksettavana. Yksinkertainen, suoraviivainen kaupallinen käyttö.

Monet opettajat tienaavat 500€ - 5000€ kuukaudessa myymällä tehtäviä. Aarteenetsintä-tehtävät ovat suosittuja myyntituotteita. Vanhemmat rakastavat suuntaharjoituksia. Opettajat tarvitsevat valmiita materiaaleja. Luo kerran, myy rajattomasti. Tilauksesi maksaa itsensä takaisin nopeasti.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto Värityskuvia Lapsille Tulostettava - Teemapohjaisesti Järjestetty',
        description: `Kuvakirjasto sisältää yli 3000 lapsille sopivaa kuvaa. Järjestetty teemoittain helppoa selaamista varten. Eläimet, ruoka, koulu, urheilu, ammattit, kulkuneuvot, luonto, muodot. Jokainen teema sisältää kymmeniä kuvia. Etsi avainsanoilla tiettyjen kuvien löytämiseksi nopeasti.

Kaikki kuvat on suunniteltu alakoulun oppilaille. Selkeät, yksinkertaiset piirrokset. Helposti tunnistettavat esineet. Ei monimutkaisia yksityiskohtia. Täydelliset esikoululaisille, ensimmäisen luokan ja toisen luokan oppilaille. Kulttuurisesti mukaan ottavia kuvia eri taustoista.

Taustakuvat ja reunukset lisäävät ammattimaista viimeistelyä. Kymmeniä taustateemoja: tähtitaivas, ruudukko, värilliset gradientit, luontoteemat. Reunusteemat: eläinkuviot, kukkateemat, lomakuviot, akateemiset teemat. Kaikki sisältyy tilaukseen. Ei per-kuva maksuja toisin kuin kilpailijoilla.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattilaatuinen 300 DPI - Täydellinen Tulostamiseen ja Myyntiin',
        description: `300 DPI vienti takaa ammattimaisen laadun. Terävät linjat tulostettaessa. Kirkkaat värit jotka näyttävät ammattimaisilta. Täydellinen laatu luokkahuoneen tulostukseen. Täydellinen laatu kaupalliseen myyntiin. Asiakkaasi eivät näe eroa ammattimaisen graafikon työstä.

PDF ja JPEG vientimuodot tarjoavat joustavuutta. PDF tulostukseen ja digitaalisiin työkirjoihin. JPEG kuvankäsittelyohjelmiin tai verkkopostauksiin. Molemmat formaatit 300 DPI laadulla. Valitse formaatti käyttötapaukseesi. Vie molemmissa formaateissa jos haluat.

Harmaasävyvaihtoehto säästää mustetta tulostettaessa. Täydellinen opettajille jotka tulostavat kotitulostimilla. Täydellinen tehtävävihkoille. Mustat ääriviivat pysyvät terävinä harmaasävytilassa. Oppilaat voivat silti värittää kuvat jos haluat. Joustavuus väri- ja harmaasävytulostukseen.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish treasure-hunt.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille Ilmainen 5 Helpossa Vaiheessa',
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
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Värityskuvia Lapsille Tulostettava Jokaiseen Tarpeeseen',
    sectionDescription: 'Aarteenetsintä-tehtävät palvelevat monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat, kielenopettajat, erityisopettajat ja opettajayrittäjät. Jokainen ryhmä hyötyy suuntasanaston opetuksesta. Täysi Käyttöoikeus -tilaus antaa kaikille rajattoman pääsyn.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Suuntasanasto Esiopetus Materiaali Ilmainen 6-vuotiaille',
        description: `Esiopetuksen opettajat tarvitsevat perussuuntasanaston materiaaleja. 6-vuotiaat oppilaat oppivat "ylös", "alas", "vasen", "oikea" -käsitteitä. Aarteenetsintä-tehtävät tekevät suunta-oppimisesta visuaalista ja hauskaa. Kuusiruutuinen ruudukko on täydellinen esiopetuksen taitotasolle. Ei liian monimutkainen, ei liian yksinkertainen.

Luo temaattisia aarteenetsintä-tehtäviä jotka sopivat esiopetuksen yksiköihin. Eläinteema luontokurssiin. Ruokateema terveysviikkoon. Kulkuneuvojen teema liikenneturvallisuusyksikköön. Jokainen tehtävä vahvistaa sekä suuntasanastoa että temaattista sanastoa.

Lataa omia kuvia luokkahuoneen esineistä. Luo aarteenetsintä-tehtävä jossa oppilaat löytävät tuttuja esineitä. "Missä on liimapuikko?" "Missä ovat sakset?" Oppilaat yhdistävät suuntasanaston todellisiin esineisiin. 11 kielen tuki auttaa monikielisiä luokkahuoneita.`,
        quote: 'Aarteenetsintä-tehtävät tekevät suuntien oppimisesta hauskaa!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1-3 Luokka',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Kartanlukutaidot',
        description: `Alakoulun opettajat 1.-3. luokilla tarvitsevat sekä perus- että ilmansuuntamateriaalia. 1. luokan oppilaat keskittyvät perussuuntiin. 2.-3. luokan oppilaat siirtyvät ilmansuuntiin. Aarteenetsintä-tehtävät sopivat molempiin tasoihin täydellisesti.

Yhdistä aarteenetsintä-tehtävät maantieteen ja kartanlukutaitoihin. Ilmansuunnat (pohjoinen, etelä, itä, länsi) luovat perustan kompassin käytölle. Oppilaat harjoittelevat sijaintien kuvaamista kartan termein. Valmistaa myöhemmille maantieteen kursseille.

Käytä aarteenetsintä-tehtäviä matematiikan koordinaatti-harjoituksena. Ruudukko esittelee koordinaattijärjestelmän käsitteitä. Oppilaat oppivat x-y -ajattelua. Täydellinen esialgebralaisille käsitteille. Luo sarjoja viikko-opetusta varten.`,
        quote: 'Kartanlukutaidot kehittyvät leikkien kautta.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Monitasoiset Esiopetus Materiaali Ilmainen Perheet',
        description: `Kotiopettajat opettavat usein useita ikäisiä lapsia samanaikaisesti. Aarteenetsintä-tehtävät sopivat 4-10 vuotiaille. Perussuunnat nuoremmille sisaruksille. Ilmansuunnat vanhemmille sisaruksille. Luo kaksi versiota samasta teemasta eri ikäryhmille.

Täysi Käyttöoikeus -tilaus tekee kotiopetuksesta kohtuuhintaista. 240€ vuodessa kaikista 33 tehtävien luojasta. Luo aarteenetsintä-tehtäviä, matematiikan tehtäviä, kirjoitustehtäviä, väritystehtäviä. Kaikki sisältyy yhteen tilaukseen.

Personoi aarteenetsintä-tehtävät lastesi kiinnostuksen kohteisiin. Dinosaurusteema dinosauruksia rakastaville. Avaruusteema tähtitieteen harrastajille. Lataa kuvia perheen harrastuksista. Yhdistä oppiminen lasten intohimoihin.`,
        quote: 'Personoidut tehtävät motivoivat lapsiani oppimaan.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL ja Kielenopettajat',
        subtitle: 'Monikielinen Lukemaan Oppiminen Tehtävät 11 Kielellä',
        description: `ESL-opettajat tarvitsevat suuntasanastomateriaaleja useilla kielillä. Aarteenetsintä-tehtävät tukevat 11 kieltä. Opeta "ylös/alas/vasen/oikea" suomeksi. Opeta "up/down/left/right" englanniksi. Sama visuaalinen rakenne kaikilla kielillä.

Suuntasanasto on perustavanlaatuista kielitaitoa. Oppilaat tarvitsevat näitä sanoja päivittäisessä kommunikaatiossa. "Käänny vasemmalle toiselta kadulta." "Kirja on hyllyn ylähyllyllä." Aarteenetsintä-tehtävät opettavat käytännöllistä sanastoa.

Luo rinnakkaisia tehtäviä kahdella kielellä vertailuun. Sama kuusiruutuinen ruudukko suomeksi ja englanniksi. Oppilaat näkevät suorat käännökset. Kansainväliset koulut hyötyvät valtavasti 11 kielen tuesta.`,
        quote: 'Monikielinen tuki on korvaamaton kielenopetuksessa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Mukautetut Värityskuvia Lapsille Tulostettava Erilaisille Oppijoille',
        description: `Erityisopettajat tarvitsevat mukautettavia materiaaleja erilaisille oppijoille. Aarteenetsintä-tehtävien canvasilla muokkaaminen mahdollistaa täydellisen räätälöinnin. Suurenna kuvia näkörajoitteisille oppilaille. Pienennä ruudukon monimutkaisuutta.

Visuaalinen oppiminen sopii monille erityistarpeita omaaville oppilaille. Kuvat ruudukossa tarjoavat konkreettisia visuaalisia viitteitä. Suuntasanasto tulee näkyväksi ja käsinkosketeltavaksi. Vähemmän abstraktia kuin pelkkä sanallinen opetus.

Toisto on kriittistä erityisopetuksessa. Luo kymmeniä aarteenetsintä-tehtäviä samoilla teemoilla. Sama rakenne, eri kuvat joka kerta. Johdonmukainen opettaminen toistolla. Käytä tuttuja kuvia turvallisuuden ja mukavuuden lisäämiseksi.`,
        quote: 'Voin räätälöidä tehtävät jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Aarteenetsintä-tehtäviä Etsyssä ja Teachers Pay Teachers',
        description: `Opettajayrittäjät myyvät tehtäviä verkossa lisätulojen saamiseksi. Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen lisenssin. Myy aarteenetsintä-tehtäviä Etsyssä. Myy Teachers Pay Teachersissa. Myy Amazon KDP:ssä. Ei lisälisensointimaksuja.

Aarteenetsintä-tehtävät myyvät hyvin verkkomarkkinapaikoilla. Vanhemmat etsivät suuntaharjoituksia kotiopetukseen. Opettajat tarvitsevat valmiita materiaaleja. 300 DPI laatu näyttää ammattimaiselta.

Luo temaattisia paketteja korkeampaan myyntihintaan. Eläinteemainen paketti 10 tehtävää. Vuodenaikateemainen paketti 12 tehtävää. Monet opettajat tienaavat 500€-5000€ kuukaudessa myymällä tehtäviä. Tilauksesi maksaa itsensä takaisin nopeasti.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish treasure-hunt.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset - Aarteenetsintä Tehtävät ja Esiopetus Materiaali',
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
        question: 'Vaatiiko Aarteenetsintä-tehtävien Suunnittelija Tilauksen?',
        answer: 'Aarteenetsintä-tehtävien suunnittelija vaatii Täysi Käyttöoikeus -tilauksen joka maksaa 240€ vuodessa tai 25€ kuukaudessa. Tilauksesi antaa rajattoman aarteenetsintä-tehtävien luomisen ilman per-tehtävä maksuja. Luo niin monta esiopetus materiaali ilmainen tehtävää kuin tarvitset ilman lisämaksuja. Täysi Käyttöoikeus sisältää kaikki 33 tehtävien luojaa. Molemmat tilaukset sisältävät kaupallisen lisensoinnin, 11 kielen tuen ja ammattimaisen 300 DPI laadun viennin.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Aarteenetsintä-tehtävät Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä. Aarteenetsintä-tehtävät tulostuvat täydellisesti millä tahansa kotitulostimella. Lataa 300 DPI PDF-tiedostona. Avaa tietokoneellasi tai tabletilla. Lähetä mihin tahansa tulostimeen. Terävät linjat ja kirkkaat värit tavallisilla kotitulostimilla. Ei erikoispaperitarvikkeita tarvitaan. Harmaasävyvaihtoehto säästää mustetta kotitulostuksessa.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Aarteenetsintä-tehtäviä?',
        answer: 'Ei. Nolla suunnittelutaitoja tarvitaan. Aarteenetsintä-tehtävien suunnittelija on rakennettu opettajille ja vanhemmille ilman grafiikkataustoilla. Napsauta teemaa. Valitse suuntatyyppi. Napsauta "Luo". Tehtäväsi ilmestyy välittömästi. Canvas-muokkaus on yhtä helppoa. Napsauta elementtiä valitaksesi sen. Vedä uuteen sijaintiin. Kaikki on intuitiivista.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Aarteenetsintä-tehtäviä Luokkahuoneessani Oppilaille?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Tulosta niin monta kopiota kuin tarvitset oppilaillesi. Ei rajoituksia montako tehtävää luot. Ei rajoituksia montako kopiota tulostat. Luo eri versioita eri oppilastasoryhmille. Jaa digitaalisesti myös. Lähetä sähköpostilla vanhemmille tai lataa Google Classroomiin.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Aarteenetsintä-tehtävät Ovat Saatavilla?',
        answer: 'Aarteenetsintä-tehtävät tukevat 11 kieltä sisällön luomiseen. Suomi, englanti, saksa, ranska, espanja, portugali (brasilialainen), italia, hollanti, ruotsi, tanska, norja. Suuntasanasto muuttuu automaattisesti valitun kielen mukaan. Sama visuaalinen ruudukkorakenne kaikilla kielillä. Kielituki on kriittinen ESL-opettajille ja kaksikielisille luokkahuoneille.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Aarteenetsintä-tehtäviä?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen print-on-demand -lisenssin ilman lisäkustannuksia. Myy luomiasi aarteenetsintä-tehtäviä Etsyssä, Teachers Pay Teachersissa, Amazon KDP:ssä. Ei lisälisensointimaksuja tilauksesi lisäksi. Ei rojalteja maksettavana. Ei attribuutiota tarvitaan. 300 DPI laatu takaa ammattimaisen ulkoasun.',
      },
      {
        id: '7',
        question: 'Kuinka Räätälöidä Aarteenetsintä-tehtäviä Oppilailleni?',
        answer: 'Canvas-muokkaus antaa täyden räätälöintivoiman. Napsauta mitä tahansa elementtiä valitaksesi sen. Vedä kuvat uusiin sijainteihin. Skaalaa suuremmiksi tai pienemmiksi. Kierrä minkä tahansa kulman. Poista ei-halutut elementit. Lisää uusia kuvia kirjastosta. Lisää tekstielementtejä personointiin. Taustateemojen ja reunusten lisääminen luo ainutlaatuisia suunnitelmia.',
      },
      {
        id: '8',
        question: 'Mitkä Ikäryhmät Toimivat Parhaiten Aarteenetsintä-tehtävien Kanssa?',
        answer: 'Aarteenetsintä-tehtävät sopivat 4-10 vuotiaille lapsille. Perussuunnat (ylös/alas/vasen/oikea) täydellisiä 4-7 vuotiaille. Esiopetus ja 1. luokan oppilaat oppivat näitä suuntia helposti. Ilmansuunnat (pohjoinen/etelä/itä/länsi) sopivat 7-10 vuotiaille. 2.-3. luokan oppilaat hallitsevat ilmansuunnat. Vaikeustasojen mukauttaminen palvelee laajempaa ikähaarukkaa.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Aarteenetsintä-tehtäviin?',
        answer: 'Kyllä voit ladata omia kuvia. Monikuva-lataus mahdollistaa omien kuvien lisäämisen. Valitse useita kuvia kerralla. JPEG, PNG, GIF formaatit kaikki toimivat. Ladatut kuvat ilmestyvät esikatselualueelle. Napsauta lisätäksesi ne aarteenetsintä-ruudukkoon. Yhdistä omia kuvia kirjaston kuviin personoiduille tehtäville.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Aarteenetsintä-tehtävän Luominen Kestää?',
        answer: 'Aarteenetsintä-tehtävän luominen vie alle 3 minuuttia alusta loppuun. Valitse teema tai 6 kuvaa. Valitse suuntatyyppi. Napsauta "Luo". Tehtävä ilmestyy välittömästi. Vie PDF:nä tai JPEG:nä. Koko prosessi vie 2-3 minuuttia. Canvasilla muokkaaminen lisää muutaman minuutin. Nopein tapa luoda ammattimaisia aarteenetsintä-tehtäviä.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Aarteenetsintä-tehtävät Vastausavaimet?',
        answer: 'Aarteenetsintä-tehtävät eivät sisällä automaattisia vastausavaimia. Oppilaat kuvaavat kuvien sijainteja suuntakielellä. Vastaukset vaihtelevat riippuen oppilaan kielenkäytöstä. Opettajat arvioivat vastaukset joustavasti. Tarkista että oppilaat käyttävät oikea suuntasanastoa. Hyväksy vaihtelevia sananmuotoja. Keskity sijaintien ymmärtämiseen.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Aarteenetsintä-tehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä. Valitse kuvia 3000+ kuvan kirjastosta aihekohtaisesti. Matematiikan tehtävät: valitse numeroita, muotoja, laskinta. Tieteen tehtävät: valitse eläimiä, kasveja, säähän liittyviä kuvia. Sosiaaliset tiedot: valitse karttoja, kulkuneuvoita, yhteisön työntekijöitä. Jokainen teema tukee eri aiheita. Lataa aihekohtaisia kuvia täsmällisempää räätälöintiä varten.',
      },
    ],
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
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
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
        slug: 'prepositions',
        name: 'Prepositiot',
        category: 'Kieli',
        icon: '📍',
        description: 'Yhdistä aarteenetsintä-tehtävät prepositioharjoituksiin sijaintisanaston kehittämiseen.',
      },
      {
        id: '2',
        slug: 'matching-app',
        name: 'Yhdistä Parit',
        category: 'Kognitiivinen',
        icon: '🔗',
        description: 'Täydennä aarteenetsintää yhdistämistehtävillä visuaalisen tunnistamisen vahvistamiseen.',
      },
      {
        id: '3',
        slug: 'picture-path',
        name: 'Kuvapolku',
        category: 'Hienomotoriikka',
        icon: '🛤️',
        description: 'Yhdistä suuntaharjoitukset sokkelotehtäviin hienomotoriikan kehittämiseen.',
      },
      {
        id: '4',
        slug: 'find-objects',
        name: 'Etsi Esineet',
        category: 'Visuaalinen',
        icon: '🔍',
        description: 'Laajenna etsintätehtäviä visuaalisen havainnointikyvyn harjoitteluun.',
      },
      {
        id: '5',
        slug: 'grid-match',
        name: 'Ruudukko Sovitus',
        category: 'Logiikka',
        icon: '🧩',
        description: 'Yhdistä ruudukkoajattelu sijaintitehtäviin spatiaalisen päättelyn kehittämiseksi.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Viivan Piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Täydennä suuntaharjoituksia viivan piirtämistehtävillä kynän hallinnan kehittämiseen.',
      },
    ],
  },
};

export default treasureHuntFiContent;
