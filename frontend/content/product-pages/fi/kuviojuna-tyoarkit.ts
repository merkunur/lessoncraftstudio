import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - Finnish Content (Kuviojuna Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuviojuna-tyoarkit.ts
 * URL: /fi/apps/kuviojuna-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/kuviojuna.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Pääsy)
 */

export const patternTrainFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuviojuna-tyoarkit',
    appId: 'pattern-train',
    title: 'Ilmainen Kuviojuna Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia kuviojunatehtäviä kuvionhahmotuksen harjoitteluun. Junamuotoiset tehtävät 3 000+ kuvalla. Esikoulusta 2. luokalle. Ilmainen PDF-lataus.',
    keywords: 'kuviojuna generaattori, kuviosarja lapsille, toistuvuus tunnistaminen, sekvenssi harjoitus, kuviokierto oppiminen, jatkuva kuvio tehtävä, algebrallinen ajattelu johdanto, säännönmukaisuus harjoitus, sarjan jatkaminen, visuaalinen kaava, kuvion täydentäminen, kuviojuna tehtävät, kuvioiden jatkaminen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuviojuna-tyoarkit',
  },

  // Hero Section - FULL text from Finnish kuviojuna.md
  hero: {
    title: 'Kuviojuna Generaattori',
    subtitle: 'Kuvionhahmotuksen Harjoituksia Junamuodossa',
    description: `Luo ammattimaisia kuviojuna tehtävämonisteet kuviontunnistusjärjestelmällämme. Täysi Pääsy -tilauksesi antaa sinulle rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo tulostettavia kuviojuna tehtäviä lapsille, jotka sopivat täydellisesti esikoululaisille ja alakouluikäisille. Lataa korkealaatuisia PDF-tehtävämonisteitä alle kolmessa minuutissa.

Kuviojuna on visuaalinen matematiikan työkalu, joka opettaa kuviontunnistusta junan teemalla. Lapset harjoittelevat AB-, AAB-, ABB-, ABC- ja AABB-kuvioita hauskan junamallin avulla. Tämä menetelmä yhdistää matematiikan oppimisen visuaaliseen ajatteluun.

Tehtävämonisteet tukevat esiopetuksen ja alakoulun matematiikan opetussuunnitelmaa. Kuviontunnistus on perustaito, joka johtaa algebran ymmärtämiseen. Opettajat käyttävät kuviojunaa havainnollisten matematiikkatehtävien luomiseen, jotka pitävät lapset kiinnostuneina.

Jokaisessa tehtävässä on selkeät esimerkit ja vastausavain. Voit mukauttaa vaikeustasoa valitsemalla kuviotyypin ja vihjeiden määrän. Täydellinen sekä esiopetukseen että alakoulun ensimmäisille luokille.`,
    previewImageSrc: '/samples/finnish/pattern train/sample-1.jpeg',
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
        videoId: '5A4aHvcC5u4',
        buttonText: 'Kuviojuna Toiminnot',
        modalTitle: 'Kuviojuna Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/pattern train/
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

  // Features Grid - FULL text from Finnish kuviojuna.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuviojuna tehtävämonisteen luoja tarjoaa ammattimaiset työkalut kuviontunnistuksen opettamiseen. Täysi Pääsy -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävämonisteen luojaan, mukaan lukien kuviojuna. Luo rajattomasti tulostettavia tehtäviä lapsille ilman lisämaksuja. Jokainen ominaisuus on suunniteltu helpottamaan esiopetuksen ja alakoulun opettajien työtä.',
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
        icon: '🚂',
        title: 'Junapohjainen kuviosarjamuoto',
        description: 'Generaattori luo junavaunuista koostuvan kuviosarjan, jossa jokainen vaunu sisältää kuvan. Oppilaat tunnistavat kuvion ja täydentävät sarjan leikkaa ja liimaa -menetelmällä. Junamuoto tekee kuviosarjoista konkreettisia ja motivoivia.',
      },
      {
        id: '2',
        icon: '🔣',
        title: 'Viisi kuviotyyppiä: AB, AAB, ABB, ABC ja AABB',
        description: 'Valitse viidestä kuviotyypistä oppilaiden taitotason mukaan. AB on yksinkertaisin kahdella vuorottelevalla kuvalla. ABC käyttää kolmea eri kuvaa. AABB ja AAB lisäävät toiston vaihtelua.',
      },
      {
        id: '3',
        icon: '✂️',
        title: 'Leikkaa ja liimaa -toiminnallisuus',
        description: 'Tehtävät sisältävät leikattavat kuvapalat sivun alareunassa. Oppilaat leikkaavat kuvat irti, tunnistavat oikean paikan ja liimaavat tyhjään vaunuun. Käsillä tekeminen vahvistaa oppimista.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa junavaunuihin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta kuviosarjojen luomiseen. Eläimet, hedelmät, kulkuneuvot ja muodot sopivat erinomaisesti kuviosarjoihin. Teemavalinnat luovat visuaalisesti houkuttelevia tehtäviä.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen kuviosarjatehtävä generoi automaattisesti vastausavaimen, jossa täydellinen kuviosarja näkyy valmiina. Opettajat tarkistavat oppilastöitä sekunneissa ilman laskemista.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Klikkaa mitä tahansa elementtiä muokataksesi. Siirrä, skaalaa ja kierrä kuvia ja vaunuja. Lisää tekstejä, taustakuvia ja kehyksiä ammattimaiseen lopputulokseen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä kuviosarjatehtäviä verkossa. Kuviojunatehtävät ovat suosittuja esiopetusmateriaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo kuviosarjatehtäviä 11 kielellä. Käyttöliittymä kääntyy valitulle kielelle. Täydellinen monikielisiin luokkahuoneisiin ja kansainväliseen käyttöön.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish kuviojuna.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Kuviojuna tehtävämonisteen luominen kestää alle kolme minuuttia alusta loppuun. Ei vaadita suunnittelutaitoja tai teknistä kokemusta. Seuraa viittä yksinkertaista vaihetta ammattimaiseen tehtävämonistiin. Jokainen vaihe on suunniteltu nopeaksi ja intuitiiviseksi.',
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
        title: 'Valitse Kuviotyppi ja Vihjeet - Yhteenlasku ja Vähennyslasku Tehtävät Kuviontunnistuksella',
        description: `Aloita valitsemalla kuviotyppi viidestä vaihtoehdosta. AB-kuvio on yksinkertaisin, täydellinen esikoululaisille. AAB ja ABB ovat keskivaikeita, sopivia alakoulun 1. luokalle. ABC ja AABB ovat haastavia, parhaita alakoulun 2-3. luokalle.

Kuviotyyppi määrittää tehtävän vaikeustason. AB-kuvio: omena, banaani, omena, banaani. AAB-kuvio: omena, omena, banaani, omena, omena, banaani. AABB-kuvio: omena, omena, banaani, banaani. ABC-kuvio: omena, banaani, kirsi. Oppilaat oppivat kuviontunnistuksen näiden esimerkkien kautta.

Valitse seuraavaksi vihjeiden määrä liukusäätimestä. 4-10 vihjesäädin antaa sinun säätää vaikeutta. Vähemmän vihjeitä = vaikeampi tehtävä. Enemmän vihjeitä = helpompi tehtävä. Esiopetuksen opettajat käyttävät yleensä 6-8 vihjettä. Alakoulun opettajat käyttävät 4-6 vihjettä.

Kuviontunnistus on perusmatematiikan taito. Se johtaa algebran ymmärtämiseen. Lapset, jotka hallitsevat kuviot, pärjäävät paremmin yhteenlasku ja vähennyslasku tehtävät -oppimisessa. Kuviojuna tekee abstraktista matematiikasta konkreettista.`,
        icon: '⚙️',
      },
      {
        id: '2',
        number: 2,
        title: 'Valitse Kuvat Kuviolle - Värityskuvia Lapsille Tulostettava ja Kirjaimet Harjoittelu Esikoulu',
        description: `Valitse kuvat kuviolle kolmesta vaihtoehdosta. Ensimmäinen vaihtoehto: valitse teema pudotusvalikosta. Järjestelmä valitsee automaattisesti sopivat kuvat kyseisestä teemasta. Nopein tapa luoda tehtävämoniste.

Toinen vaihtoehto: selaa kuvakirjastoa manuaalisesti. Valitse teema nähdäksesi kaikki kyseisen teeman kuvat. Vedä kuvat kuviojuna tehtävään. Tämä antaa sinulle täydellisen hallinnan siitä, mitkä kuvat näkyvät. Täydellinen teemayksiköihin.

Kolmas vaihtoehto: lataa omia kuvia. Klikkaa Lataa Omia Kuvia -painiketta. Valitse JPEG, PNG tai GIF -kuvia tietokoneeltasi. Lataa niin monta kuin tarvitset. Käytä oppilaittesi valokuvia, paikallisia maamerkkejä tai mitä tahansa haluamaasi.

Yhdistä eri kuvalähteitä. Käytä kirjaston eläinkuvia A-kuviona. Lataa värityskuvia lapsille tulostettava B-kuviona. Tai yhdistä kirjaimet harjoittelu esikoulu -kuviin kuviontunnistuksen kanssa. Rajattomat yhdistelmät.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävämoniste - Kertotaulut Tulostettava ja Pisteestä Pisteeseen Tehtävät',
        description: `Klikkaa Luo-painiketta, kun olet valinnut asetukset ja kuvat. Järjestelmä luo kuviojuna tehtävämonisteen välittömästi. Ei odottelua, ei lataamista. Tehtävämoniste ilmestyy kankaalle 1-2 sekunnissa.

Tehtävämoniste sisältää junamallin kuvioruutuineen. Ensimmäiset ruudut näyttävät kuvion esimerkkejä. Viimeiset ruudut ovat tyhjiä oppilaiden täytettäväksi. Selkeä visuaalinen muoto auttaa lapsia ymmärtämään tehtävän.

Järjestelmä luo myös vastausavaimen automaattisesti. Klikkaa Vastausavain-välilehteä nähdäksesi sen. Vastausavain näyttää kaikki ruudut täytettyinä. Opettajat käyttävät tätä tarkistaakseen oppilaiden työt nopeasti.

Molemmat versiot ovat täysin muokattavissa. Siirrä junamallia. Muuta kokoa. Lisää tekstiä tai lisäkuvia. Järjestelmä ei lukitse mitään. Kaikki elementit ovat vapaasti siirrettäviä ja muokattavia. Kuviojuna tehtävämonisteet toimivat hyvin yhdessä muiden matematiikan tehtävien kanssa. Yhdistä kertotaulut tulostettava -tehtäviin viikottaisissa paketeissa. Yhdistä pisteestä pisteeseen tehtävät -harjoituksiin.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Hienomotoriikka Harjoitukset ja Lukemaan Oppiminen Tehtävät',
        description: `Kangas on täysin interaktiivinen työtila. Klikkaa mitä tahansa elementtiä valitaksesi sen. Vedä siirtääksesi. Vedä nurkista skaalataksesi. Vedä kierrä-kuvakkeesta kierrättääksesi. Kaikki muokkaus tapahtuu suoraan kankaalla.

Lisää otsikkoteksti tehtävämonisteen yläosaan. Kirjoita "Kuviojuna" tai "Kuvioharjoitus". Valitse fontti, koko ja väri. Siirrä teksti täydelliseen kohtaan. Muotoile se näyttämään ammattimaiselta.

Lisää ohjeteksti oppilaita varten. "Katso kuviota ja täytä tyhjät ruudut" suomeksi. Tai millä tahansa kielellä opettamasi mukaan. Tekstityökalut tukevat kaikkia Unicoden merkkejä. Kirjoita ohjeita suomeksi, englanniksi tai missä tahansa kielessä.

Muokkaa taustaa ja reunuksia. Valitse taustateema Sivu Asetukset -paneelista. Säädä läpinäkyvyyttä. Lisää juhlavat reunukset jouluna tai pääsiäisenä. Luo värikkäitä tehtävämonisteitä, jotka motivoivat oppilaita. Yhdistä hienomotoriikka harjoitukset -elementtejä tehtävään. Lisää leikattavia viivoja. Lisää värityskuvia reunoille. Luo lukemaan oppiminen tehtävät -tekstejä kuvion alle.`,
        icon: '🔧',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Tulostettavat Tehtävät Lapsille Ilmainen PDF ja JPEG Muodossa',
        description: `Klikkaa Lataa-painiketta, kun tehtävämoniste on valmis. Valitse joko Tehtävämoniste (PDF) tai Tehtävämoniste (JPEG). PDF säilyttää tekstin terävänä. JPEG on pienempi tiedostokoko. Molemmat ovat 300 DPI -laadulla.

Lataa myös vastausavain. Klikkaa Vastausavain (PDF) tai Vastausavain (JPEG). Tallenna molemmat tiedostot tietokoneellesi. Järjestä ne kansioihin aiheittain tai viikoittain. Rakenna digitaalinen tehtävämonisteiden kirjasto.

Harmaasävy-vaihtoehto säästää värimusteita. Klikkaa Harmaasävy-valintaruutua ennen lataamista. Järjestelmä muuntaa kaikki värit harmaasävyiksi. Täydellinen kouluille, joilla on rajalliset mustebudjetit. Kaikki tulostettavat tehtävät lapsille ilmainen tulostuvat taloudellisesti.

Tulosta kotitulostimella tai koulukopiokoneella. 300 DPI -laatu näyttää ammattimaiselta molemmilla. A4- tai Letter-koko sopii kaikille tavallisille tulostimille. Ei erikoispaperia tai erikoisasetuksia tarvita.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish kuviojuna.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuviojuna palvelee monipuolisesti eri käyttäjäryhmiä. Esiopetuksen opettajista alakoulun opettajiin, kotiopettajavanhemmista erityisopettajiin. Jokainen käyttäjäryhmä löytää oman tapansa hyödyntää kuviojuna tehtävämonisteitä. Matematiikka tehtävät alakoulu sopivat kaikille ikätasoille ja oppimistarpeille.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Kuviosarjojen perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia AB-kuviosarjoja junateemalla. Esiopetuksen oppilaat harjoittelevat toistuvien kuvioiden tunnistamista leikkaa ja liimaa -menetelmällä. Junamuoto motivoi ja tekee oppimisesta konkreettista. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Kuviosarjojen syventäminen 1.–2. luokalla',
        description: 'Generoi monimutkaisempia kuviosarjoja (AAB, ABB, ABC, AABB) 1.–2. luokalle. Oppilaat analysoivat monimutkaisia sarjoja ja ennustavat seuraavat kuvat. Kehittää algebrallista valmiutta.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Toiminnallisia kuviosarjoja kotiin',
        description: 'Luo temaattisia kuviojunatehtäviä lasten kiinnostuksen mukaan. Leikkaa ja liimaa -muoto pitää lapset aktiivisina. Eläin- ja kulkuneuvoteemat motivoivat harjoittelua kotona.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kielirajat ylittävä kuviosarjaharjoittelu',
        description: 'Kuviojunatehtävät eivät vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Kuvasarjat opettavat sarjojen logiikkaa universaalisti. 11 kielen tuki mahdollistaa monikielisen opetuksen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt kuviosarjaharjoitukset',
        description: 'Säädä kuviotyyppiä ja sarjan pituutta HOJKS-tavoitteiden mukaisesti. AB-kuvio sopii perusharjoitteluun. Leikkaa ja liimaa -menetelmä kehittää samalla hienomotoriikkaa.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy kuviosarjapaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia kuviojunapaketteja myytäväksi verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti suosittuja. Kaupallinen lisenssi kattaa rajattomat myynnit ilman lisäkuluja.',
      },
    ]
    
  },

  // FAQ Section - FULL FAQs from Finnish kuviojuna.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu ja Esiopetus',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuviojuna tehtävämonisteiden luojasta. Tässä osiossa vastataan 12 yleisimpään kysymykseen. Vastaukset perustuvat todellisiin opettajien kokemuksiin. Kaikki tulostettavat tehtävät lapsille ilmainen ja matematiikka tehtävät alakoulu -vastaukset täällä.',
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
        question: 'Miten kuviojunageneraattori toimii?',
        answer: 'Generaattori luo junavaunuista koostuvan kuviosarjan. Osa vaunuista on tyhjinä oppilaan täytettäväksi. Leikattavat kuvapalat ovat sivun alareunassa. Oppilas leikkaa, tunnistaa kuvion ja liimaa oikeaan vaunuun.',
      },
      {
        id: '2',
        question: 'Mitkä kuviotyypit ovat saatavilla?',
        answer: 'Viisi kuviotyyppiä: AB (kahden kuvan vuorottelu), AAB (kaksi samaa ja eri), ABB (yksi eri ja kaksi samaa), ABC (kolmen kuvan sarja) ja AABB (kaksi parillista). Valitse taitotason mukaan.',
      },
      {
        id: '3',
        question: 'Miten vaikeustasoa säädetään?',
        answer: 'Kuviotyypin valinta määrittää vaikeustason. AB on helpoin, ABC ja AABB haastavimmat. Sarjan pituus vaikuttaa myös: pidempi sarja vaatii enemmän hahmottamista.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen kuviosarjatehtävä generoi automaattisesti vastausavaimen. Täydellinen kuviosarja näkyy valmiina vastausavaimessa. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille kuviojuna sopii?',
        answer: 'Kuviojuna palvelee 4–8-vuotiaita. Esikoululaiset harjoittelevat AB-kuvioita. 1. luokan oppilaat siirtyvät AAB- ja ABB-kuvioihin. 2. luokan oppilaat ratkaisevat ABC- ja AABB-kuvioita.',
      },
      {
        id: '6',
        question: 'Miten leikkaa ja liimaa -tehtävät toimivat?',
        answer: 'Sivun alareunassa on leikattavat kuvapalat katkoviivoin merkittyinä. Oppilaat leikkaavat kuvat irti saksilla. Sitten he tunnistavat oikean paikan junavaunuissa ja liimaavat kuvan paikalleen.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori sijoittaa kuvat junavaunuihin automaattisesti. Yhdistä omia kuvia kirjaston 3000+ kuvan kanssa.',
      },
      {
        id: '8',
        question: 'Miten tulostan kuviojunatehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. PDF-muoto säilyttää tarkan ulkoasun tulostamiseen ja leikkaamiseen.',
      },
      {
        id: '9',
        question: 'Sopiiko kuviojuna erityisopetukseen?',
        answer: 'Erinomaisesti. Yksinkertainen AB-kuvio ja leikkaa ja liimaa -menetelmä sopivat erityisopetukseen. Säädä kuviotyyppiä HOJKS-tavoitteiden mukaisesti. Toiminnallisuus kehittää myös hienomotoriikkaa.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden kuviojunatehtävän luominen vie alle 3 minuuttia. Valitse kuvat ja kuviotyyppi 30 sekunnissa. Generaattori rakentaa tehtävän välittömästi leikattavine osineen.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani kuviojunatehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Kuviojunapaketit ovat suosittuja esiopetusmateriaaleja verkossa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
      {
        id: '12',
        question: 'Miten kuviojuna tukee POPS 2014 tavoitteita?',
        answer: 'Kuviojuna kehittää kuviosarjojen tunnistamista, algebrallista valmiutta ja hienomotoriikkaa. POPS 2014 korostaa matemaattisen ajattelun ja toiminnallisen oppimisen merkitystä. Kuviojuna yhdistää molemmat tehokkaasti.',
      },
    ]
    
  },

  // Pricing - Finnish Full Access terminology (€240/year or €25/month)
  pricing: {
    title: 'Täysi Pääsy',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'tai 25€/kk',
    benefits: [
      'Rajoittamaton työarkkien luonti',
      'Kaupallinen POD-lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
      'Kaikki 33 työkalua käytettävissä',
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
    sectionDescription: 'Täysi Pääsy sisältää 33 ilmaista työkalua. Yhdistä kuviojuna tehtävät muihin generaattoreihin täydellisiin oppimispaketteihin. Luo viikon tehtäväpaketti kaikilla työkaluilla. Luo teemakohtaisia paketteja jotka yhdistävät useita taitoja.',
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
        slug: 'kuviotehtava-tyoarkit',
        name: 'Kuviotehtävät',
        category: 'Logiikka',
        icon: '🔣',
        description: 'Kuviotehtävät laajentavat kuviosarjojen harjoittelua monipuolisempiin muotoihin. Yhdistä kuviojunan kanssa kattavaan kuvioharjoitteluun.',
      },
      {
        id: '2',
        slug: 'aakkosjuna-tyoarkit',
        name: 'Aakkosjuna',
        category: 'Lukutaito',
        icon: '🚂',
        description: 'Aakkosjuna käyttää samaa junateemaa aakkosten oppimiseen. Yhdistä molemmat junateemai siin oppimispaketteihin.',
      },
      {
        id: '3',
        slug: 'kuvalajittelu-tyoarkit',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📋',
        description: 'Kuvalajittelu kehittää luokittelutaitoja, jotka tukevat kuviosarjoissa tarvittavaa ryhmittelykykyä.',
      },
      {
        id: '4',
        slug: 'yhdista-parit-tyoarkit',
        name: 'Yhdistä parit',
        category: 'Logiikka',
        icon: '🔗',
        description: 'Yhdistä parit -tehtävät kehittävät yhteenkuuluvuuden tunnistamista. Yhdistä kuviojunan kanssa visuaalisten yhteyksien harjoitteluun.',
      },
      {
        id: '5',
        slug: 'kuva-bingo-tyoarkit',
        name: 'Kuvabingo',
        category: 'Sanasto',
        icon: '🎲',
        description: 'Kuvabingo yhdistää kuvan tunnistamisen pelimuotoon. Molemmat käyttävät visuaalisia kuvia oppimisen tukena.',
      },
      {
        id: '6',
        slug: 'poikkea-joukosta-tyoarkit',
        name: 'Poikkea joukosta',
        category: 'Logiikka',
        icon: '🧠',
        description: 'Poikkea joukosta -tehtävät kehittävät luokittelua, joka tukee kuviosarjojen ymmärtämistä ja analyyttistä ajattelua.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 177) ------------------------------------

  aiOverviewSnippet: 'Kuviojuna-generaattori on verkkotyokalu, jolla luodaan tulostettavia leikkaa ja liimaa -kuviosarjatehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat junavaunujen kuviosarjan (AB, AAB, ABB, ABC, AABB) ja taydentavat puuttuvat kohdat leikkaamalla ja liimaamalla. Opettajat valitsevat kuviotyypin, teeman ja kuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Kuviotyypit',
      ourApp: '5 tyyppiä: AB, AAB, ABB, ABC, AABB',
      typical: 'Vain AB-kuvio',
    },
    {
      feature: 'Muoto',
      ourApp: 'Leikkaa ja liimaa junateemalla',
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
      claim: 'Kuviosarjojen tunnistaminen ja täydentäminen kehittävät algebrallista valmiutta, joka on myöhemmän matemaattisen menestyksen ennustaja.',
      source: 'Mattinen, A. et al., "Matemaattisen ajattelun kehitys esiopetusikäisillä," Turun yliopisto',
    },
    {
      claim: 'Leikkaa ja liimaa -menetelmä yhdistää hienomotoriikan ja kognitiivisen prosessoinnin, mikä vahvistaa oppimista moniaistikanavaisen prosessoinnin kautta.',
      source: 'Ahonen, T. et al., "Toiminnallisen oppimisen merkitys varhaiskasvatuksessa," Niilo Mäki Instituutti',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuviojuna on oppilaitteni ehdoton suosikki. Junamuoto motivoi lapsia ja leikkaa-liimaa -menetelma tekee oppimisesta toiminnallista. AB-kuviosta ABC-kuvioon siirtyminen on ollut sujuvaa generaattorin avulla.',
      name: 'Maarit Penttinen',
      role: 'Esiopetuksen opettaja',
      school: 'Koivulan päiväkoti, Oulu',
    },
    {
      quote: 'Kaytan kuviojunatehtavia matematiikan alkuopetuksessa viikoittain. Oppilaat kehittavat kuviosarjojen ymmartamista samalla kun harjoittelevat leikkaamista ja liimaamista. Viisi kuviotyyppia mahdollistaa monipuolisen eriyttamisen.',
      name: 'Hannu Seppälä',
      role: '1. luokan opettaja',
      school: 'Mäntymäen koulu, Kuopio',
    },
  ],

  tips: {
    sectionTitle: 'Kuviosarjastrategiat luokka-asteittain',
    sectionDescription: 'Säädä kuviojunageneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset kuviotyypin, sarjan pituuden ja monimutkaisuuden esikoulusta toiseen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: AB-kuviot tutuilla kuvilla',
        description: 'Kaytta AB-kuviotyyppia tutuilla elain- tai hedelmakuvilla. Esikoululaiset tunnistavat kahden kuvan vuorottelun ja taydentavat sarjan leikkaamalla. Lyhyt sarja (4-6 vaunua) sopii alkuun.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: AAB- ja ABB-kuviot',
        description: 'Luo tehtavia AAB- ja ABB-kuviotyypeilla. Esiopetuksen oppilaat kehittavat monimutkaisempien toistojen tunnistamista. Pidemmat sarjat (6-8 vaunua) haastavat sopivasti POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: ABC-kuviot ja pidempään sarjat',
        description: 'Generoi ABC-kuvioita 8-10 vaunun sarjoilla. Ekaluokkalaiset analysoivat kolmen kuvan sarjoja ja ennustavat seuraavat kuvat. Kehittaa algebrallista valmiutta ja jarjestelmallista ajattelua.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: AABB-kuviot ja vaihtelevat sarjat',
        description: 'Luo AABB-kuvioita ja yhdista eri kuviotyyppeja samaan tehtavaan. Toisluokkalaiset vertailevat erilaisia kuviosarjoja ja tunnistavat niiden saannonmukaisuudet.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monimutkaiset yhdistelmäkuviot',
        description: 'Kaytta kaikkia kuviotyyppeja sekoitettuina. Kolmasluokkalaiset tunnistavat ja nimeavat kuviotyypit itsenaisesti. Tehtavat valmistavat algebrallisen ajattelun perusteisiin.',
      },
    ],
  },
};

export default patternTrainFiContent;
