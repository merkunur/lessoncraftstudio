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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default patternTrainFiContent;
