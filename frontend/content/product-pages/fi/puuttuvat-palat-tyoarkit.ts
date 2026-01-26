import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Missing Pieces Worksheets - Finnish Content (Puuttuvat Palat -tehtävät)
 *
 * File: frontend/content/product-pages/fi/puuttuvat-palat-tyoarkit.ts
 * URL: /fi/apps/puuttuvat-palat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/missing-pieces.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Käyttöoikeus)
 */

export const missingPiecesFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'puuttuvat-palat-tyoarkit',
    appId: 'missing-pieces',
    title: 'Puuttuvan Palan Tehtävät - Tulostettavat Tehtävät Lapsille Ilmainen -',
    description: 'Luo ammattimaisia puuttuvan palan tehtäviä ilmaisella generoinnilla Täysi Käyttöoikeus -tilauksellasi. Puuttuvan palan tehtävät kehittävät visuaalista.',
    keywords: 'puuttuvan palan tehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, visuaalinen hahmottaminen, ongelmanratkaisu, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/puuttuvat-palat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish missing-pieces.md
  hero: {
    title: 'Puuttuvat Palat',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali Ilmainen',
    description: `Luo ammattimaisia puuttuvan palan tehtäviä ilmaisella generoinnilla Täysi Käyttöoikeus -tilauksellasi. Puuttuvan palan tehtävät kehittävät visuaalista hahmottamista ja ongelmanratkaisua. Lapset tunnistavat puuttuvan palan kuvasta ja valitsevat oikean vaihtoehdon. Lataa tulostettavat tehtävät lapsille PDF- tai JPEG-muodossa alle kolmessa minuutissa.

Puuttuvan palan tehtävät sopivat esiopetukseen ja alakoulun ala-asteelle. Voit luoda tehtäviä millä tahansa aiheella. Valitse kuva yli 3000 kuvasta tai lataa omat kuvasi. Säädä vaikeustasoa 1-5 puuttuvalla palalla ja 2-6 vastausvaihtoehdolla. Jokainen tehtävä sisältää vastausavaimen.

Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Luo niin monta puuttuvan palan tehtävää kuin tarvitset. Tilaus sisältää kaupalliset käyttöoikeudet. Myy tehtäviäsi Teachers Pay Teachersissa, Etsyssä tai Amazon KDP:ssä. Kaikki tehtävät ovat 300 DPI:n ammattilaatuisia.`,
    previewImageSrc: '/samples/finnish/missing pieces/sample-1.jpeg',
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
        videoId: 'gb-xE_Ay4fc',
        buttonText: 'Puuttuvat Palat Toiminnot',
        modalTitle: 'Puuttuvat Palat Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/missing pieces/
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

  // Features Grid - FULL text from Finnish missing-pieces.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Puuttuvan palan tehtävien generaattori tarjoaa kaiken tarvitsemasi esiopetus materiaalin ja alakoulun tehtävien luomiseen. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan oppimistuloksia.',
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

  // How-To Guide - FULL text from Finnish missing-pieces.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Puuttuvan palan tehtävien luominen on nopeaa ja helppoa. Seuraa näitä viittä yksinkertaista vaihetta. Koko prosessi vie alle kolme minuuttia alusta loppuun. Ei suunnitteluosaamista tarvita. Ei monimutkaisia työkaluja opittavaksi.',
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
        title: 'Valitse Sisältö Tulostettaville Tehtäville Lapsille - Matematiikka Tehtävät Alakoulu tai Esiopetus Materiaali',
        description: `Aloita valitsemalla kuva puuttuvan palan tehtävääsi varten. Sinulla on kolme vaihtoehtoa. Valitse koko teema yhdellä napsautuksella. Selaa yli 3000 yksittäistä kuvaa. Tai lataa omat kuvasi.

Teemavalinta on nopein tapa aloittaa. Valitse "Eläimet" matematiikka tehtävät alakoulu varten. Valitse "Ruoka" esiopetus materiaali ilmainen generoinnille. Valitse "Kulkuneuvot" tai "Luonto" tai mikä tahansa muu teema. Ohjelma valitsee satunnaisesti kuvan teemasta.

Yksittäinen kuvavalinta antaa täydellisen hallinnan. Käytä hakutoimintoa löytääksesi tarkan kuvan. Kirjoita "kissa" ja näe kaikki kissakuvat. Kirjoita "omena" ja näe kaikki omenakuvat. Valitse täydellinen kuva tulostettaville tehtäville lapsille.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Hienomotoriikka Harjoitukset ja Kirjaimet Harjoittelu Esikoulu Vaikeustasolla',
        description: `Säädä tehtävän vaikeustasoa oppilaittesi tarpeisiin. Valitse 1-5 puuttuvaa palaa. Yksi pala on helpoin esiopetukselle. Viisi palaa haastaa vanhempia oppilaita. Säädä vaikeutta täydellisesti.

Valitse vastauksien määrä. 2-6 vaihtoehtoa saatavilla. Kaksi vaihtoehtoa on helpoin hienomotoriikka harjoitukset aloittelijoille. Kuusi vaihtoehtoa lisää haastetta. Enemmän vaihtoehtoja tarkoittaa vaikeampaa tehtävää.

Valitse palan muoto kuudesta vaihtoehdosta. Neliö, ympyrä tai suorakulmio. Pystysuora tai vaakasuora. Ellipsi kahdessa suunnassa. Eri muodot sopivat eri sisältöön. Neliö toimii hyvin kirjaimet harjoittelu esikoulu tehtäville. Ympyrä sopii numeroille.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä - Lukemaan Oppiminen Tehtävät ja Värityskuvia Lapsille Tulostettava Versiot',
        description: `Napsauta "Luo tehtävä" generoidaksesi puuttuvan palan tehtävän. Generaattori käsittelee asetuksesi välittömästi. Näet esikatselu muutamassa sekunnissa. Ei odotusaikaa. Ei latauspainikkeiden pyörimistä.

Ohjelma poistaa satunnaisen palan tai palat kuvastasi. Luo distrakttorivaihtoehdot automaattisesti. Järjestää oikeat ja väärät vastaukset satunnaisessa järjestyksessä. Kaikki tapahtuu automaattisesti. Luo lukemaan oppiminen tehtävät tai värityskuvia lapsille tulostettava versioita vaivattomasti.

Vastausavain luodaan samanaikaisesti. Napsauta "Vastausavain" välilehteä nähdäksesi sen. Näyttää täydellisen kuvan oikeilla vastauksilla merkittyinä. Molemmat pohjat ovat täysin muokattavissa. Muokkaa ennen lataamista.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Yhteenlasku ja Vähennyslasku Tehtävät sekä Kertotaulut Tulostettava Versiot',
        description: `Kaikki pohjalla on täysin muokattavissa. Vedä kohteet uuteen paikkaan. Kierrä hiirellä. Skaalaa vetämällä kulmista. Poista kohteet painamalla Delete-näppäintä. Täydellinen hallinta jokaisesta elementistä.

Lisää tekstielementtejä yhteenlasku ja vähennyslasku tehtävät ohjeiden antamiseen. Valitse seitsemästä fontista. Muuta tekstin väriä. Säädä fonttikokoa 8-200. Lisää ääriviivat luettavuuden parantamiseksi. Luo ammattimaisen näköisiä kertotaulut tulostettava tehtäviä.

Kontekstuaalinen työkalupalkki ilmestyy valitessasi kohteet. Tasaa kohteet vasemmalle, keskelle tai oikealle. Tasaa ylös, keskelle tai alas. Keskitä sivulle vaakasuoraan tai pystysuoraan. Täydelliset työkalut tarkkaan muokkaukseen.`,
        icon: '🔧',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Pisteestä Pisteeseen Tehtävät ja Tulostettavat Tehtävät Lapsille PDF-muodossa',
        description: `Valitse latausmuoto. JPEG tai PDF. Molemmat saatavilla 300 DPI:n laadulla. JPEG on paras yksittäisille tehtäville. PDF on paras monisivuisille asiakirjoille.

Lataa sekä tehtävä että vastausavain erikseen. Molemmat samalla ammattilaatuisella tarkkuudella. Oppilaasi saavat tehtävän. Sinä säilytät vastausavaimen. Täydellinen pisteestä pisteeseen tehtävät arviointiin.

Harmaasävyvaihtoehto säästää mustetta. Valitse harmaasävy-valintaruutu ennen lataamista. Mikä tahansa tehtävä muuttuu harmaasävyksi. Säästä 60-80% musteen käytössä. Täydellinen suurille määrille tulostettavia tehtäviä lapsille.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish missing-pieces.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Puuttuvan palan tehtävät palvelevat monenlaisia käyttäjiä. Esiopettajat luovat visuaalisen hahmottamisen tehtäviä. Alakoulun opettajat rakentavat ongelmanratkaisutaitoja. Kotiopettajavanhemmat personoivat oppimista. Kielenopettajat kehittävät sanastoa. Erityisopettajat eriyttävät materiaalia.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from Finnish missing-pieces.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä Tulostettavista Tehtävistä Lapsille ja Esiopetus Materiaali Ilmainen Generoinnista',
    sectionDescription: 'Tässä ovat vastaukset yleisimpiin kysymyksiin puuttuvan palan tehtävistä. Opettajat, vanhemmat ja kasvattajat kysyvät näitä kysymyksiä usein. Lue nämä vastaukset ennen tilaamista. Opi kuinka generaattori toimii.',
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
    title: 'Täysi Käyttöoikeus',
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
      'Kuvalaskut', 'Aakkosjuna', 'Iso vai pieni', 'Kuvabingo',
      'Kaaviot laske ja väritä', 'Koodiyhteenlasku', 'Värityssivut', 'Kuvasanaristikko',
      'Kuvakryptogrammi', 'Piirtäminen ja värittäminen', 'Viivojen piirtäminen', 'Etsi ja laske',
      'Etsi esineet', 'Ruudukkoyhdistäminen', 'Yhdistämispeli', 'Matematiikkapulma',
      'Matematiikkamonisteet', 'Puuttuvat palaset', 'Enemmän vai vähemmän', 'Mikä ei kuulu joukkoon',
      'Kuviojuna', 'Kuviomonisteet', 'Kuvapolku', 'Kuvien lajittelu',
      'Prepositiot', 'Varjopari', 'Vähennyslasku', 'Lasten sudoku',
      'Aarteenmetsästys', 'Arvaa sana', 'Sanojen sekoitus', 'Sanaristikko', 'Kirjoitusharjoitukset',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Täysi Käyttöoikeus sisältää 33 ilmaista työkalua. Yhdistä puuttuvan palan tehtävät muihin generaattoreihin täydellisiin oppimispaketteihin. Luo viikon tehtäväpaketti kaikilla työkaluilla. Luo teemakohtaisia paketteja jotka yhdistävät useita taitoja.',
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

export default missingPiecesFiContent;
