import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Finnish Content (Sanansekoitus Tehtävät)
 *
 * File: frontend/content/product-pages/fi/sanansekoitus-tyoarkit.ts
 * URL: /fi/apps/sanansekoitus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sanansekoitus-tyoarkit',
    appId: 'word-scramble',
    title: 'Ilmainen Sanansekoitus Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia sanansekoitustehtäviä oikeinkirjoituksen harjoitteluun. Muokattava vaikeustaso esikoulusta 3. luokalle. Kuvallinen ja ilmainen.',
    keywords: 'sanansekoitus generaattori, sanansekoitus tehtävät, kirjoitusharjoitukset lapsille, oikeinkirjoitus harjoittelu, sana-arvoitus tulostettava, sanapelit lapsille tulostettava, sananmuodostus tehtävät, lukemaan oppiminen tehtävät, kirjoittamisen harjoittelu, sanasto harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sanansekoitus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish word-scramble.md
  hero: {
    title: 'Sanansekoitus Generaattori',
    subtitle: 'Tulostettavat Oikeinkirjoitusharjoitukset Kuvilla',
    description: `Luo ammattimaisia sanansekoitustehtäviä helposti verkossa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman per-tehtävä maksuja. Generoi mukautettuja tulostettavia sanansekoitustehtäviä täydellisiksi esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle kolmessa minuutissa.

Sanansekoitus-generaattorimme sopii täydellisesti opettajille jotka tarvitsevat tulostettavat tehtävät lapsille ilmainen -formaatissa. Jokainen tehtävä sisältää kuvavihjeitä jotka helpottavat oppimista. Mukautettava vaikeus tekee tehtävistä sopivia kaikille ikätasoille. Lapsesi oppivat kirjaimia ja sanoja hauskalla tavalla.

Sovellus tukee 11 kieltä täysin mukautetulla sisällöllä. Kuvapohjainen lähestymistapa auttaa visuaalisia oppijoita. Kukin sanansekoitustehtävä voidaan muokata täysin luomisen jälkeen. Tallenna aikaa ja luo ammattimaisia tehtäviä minuuteissa tuntien sijaan.

Opettajat käyttävät tätä työkalua kirjainharjoitteluun esikoulussa. Vanhemmat luovat mukautettuja tehtäviä kotiopetukseen. Kielenopettajat rakentavat sanasto-opetusta 11 kielellä. Erityisopettajat säätävät vaikeustason jokaisen oppilaan tarpeisiin. Yrittäjäopettajat myyvät tehtäviä Teachers Pay Teachers ja Etsy -alustoilla.`,
    previewImageSrc: '/samples/finnish/word scramble/sample-1.jpeg',
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
        videoId: 'Hc3g5VsSHEU',
        buttonText: 'Sanapulmapeli Toiminnot',
        modalTitle: 'Sanapulmapeli Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
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

  // Features Grid - FULL text from Finnish word-scramble.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Sanansekoitus-generaattorimme tarjoaa kaikki työkalut joita tarvitset ammattimaisten tehtävien luomiseen. Peruspaketti-tilauksesi sisältää kaikki nämä ominaisuudet ilman lisämaksuja. Luo rajattomasti tulostettavia tehtäviä lapsille ilmainen -formaatissa. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan oppimistuloksia.',
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

  // How-To Guide - FULL text from Finnish word-scramble.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaisia sanansekoitustehtäviä alle kolmessa minuutissa. Nämä viisi yksinkertaista vaihetta johdattavat sinut valmiiseen tehtävään. Ei tarvitse suunnitteluosaamista tai teknistä tietämystä. Seuraa näitä ohjeita ja sinulla on tulostettavat tehtävät lapsille ilmainen käytettävissä välittömästi.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Tehtäväsi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Sanansekoitustehtäviisi',
        description: `Aloita valitsemalla miten haluat luoda tehtäväsi. Kolme vaihtoehtoa on saatavilla kaikille käyttäjille. Kukin vaihtoehto sopii erilaisiin opetustarpeisiin.

Ensimmäinen vaihtoehto on valita teema kuvakirjastosta. Klikkaa "Valitse teema" -pudotusvalikosta. Näet luettelon teemoista kuten eläimet, ruoka, ajoneuvot ja luonto. Valitse teema ja kaikki sen kuvat näkyvät automaattisesti. Klikkaa kuvia valitaksesi ne tehtävääsi.

Toinen vaihtoehto on selata yksittäisiä kuvia teeman sijaan. Käytä hakutoimintoa löytääksesi tiettyjä kuvia nopeasti. Kirjoita "koira" ja näet kaikki koirakuvat. Valitse juuri ne kuvat jotka sopivat oppituntiisi. Tämä antaa täyden hallinnan tehtävän sisällöstä.

Kolmas vaihtoehto on käyttää omaa sanalistaa ilman kuvia. Aktivoi "Käytä omaa sanalistaa" -valintaruutu. Kirjoita sanat tekstikenttään yksi per rivi. Maksimissaan kahdeksan sanaa per sivu. Tämä sopii täydellisesti viikoittaisiin oikeinkirjoituslistoihin.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset',
        description: `Säädä tehtävän asetukset sopimaan oppilaidesi tarpeisiin. Valitse kuinka monta tehtävää haluat sivulle. Liukusäädin antaa valita yhdestä kymmeneen tehtävää. Useampi tehtävä sopii lyhyempiin sanoihin.

Valitse vaikeustaso neljästä vaihtoehdosta. "Ei vihjeitä" sekoittaa kaikki kirjaimet täysin. "Helppo" paljastaa puolet kirjaimista oikeissa paikoissa. "Normaali" paljastaa neljänneksen kirjaimista. "Vaikea" paljastaa vain yhden kuudesosan kirjaimista.

Valitse käytätkö isoja vai pieniä kirjaimia. Isot kirjaimet ovat helpompia nuorille oppilaille. Pienet kirjaimet sopivat vanhemmille lapsille. Voit myös valita kirjainten värityksen.

Värjää vokaalit ja konsonantit eri väreillä oppimisen tueksi. Tämä auttaa lapsia tunnistamaan kirjaintyypit. Tai valitse kaikki kirjaimet mustiksi klassiseen tyyliin. Molemmat vaihtoehdot toimivat hyvin.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtäväsi',
        description: `Klikkaa "Generoi uusi tehtävä" -painiketta kun olet valmis. Järjestelmä luo tehtäväsi automaattisesti sekunneissa. Näet esikatselun välittömästi pääpohjalla. Ei odottelua tai latausaikoja.

Sanansekoitus-generaattori luo sekoitetut kirjaimet automaattisesti. Jokainen sana sekoitetaan satunnaisesti joka kerta. Kuvavihjeet sijoitetaan tehtävän yläpuolelle. Kaikki elementit asetellaan ammattimaisesti sivulle.

Jos valitsit vihjetason, oikeat kirjaimet näkyvät valituissa paikoissa. Helppo taso näyttää monta kirjainta valmiiksi. Vaikea taso näyttää vain yhden tai kaksi kirjainta. Oppilaat täyttävät loput kirjaimet.

Tehtävä näkyy nyt muokkauspohjallla. Voit katsoa sitä ja varmistaa että kaikki näyttää hyvältä. Jos haluat tehdä muutoksia, siirry vaiheeseen 4. Jos tehtävä on täydellinen, siirry suoraan vaiheeseen 5.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Muokkaa mitä tahansa elementtiä tehtävässä luomisen jälkeen. Klikkaa mitä tahansa kuvaa, tekstiä tai kirjainta muokataksesi sitä. Vedä objekteja uusiin paikkoihin hiirellä. Pyöritä ja skaalaa elementtejä tarpeen mukaan.

Muuta tekstin ominaisuuksia valitsemalla teksti ensin. Vaihda väriä, kokoa tai fonttia oikean puolen työkaluista. Lisää reunaviivoja tekstiin korostusta varten. Kaikki muutokset näkyvät välittömästi pohjalla.

Lisää omaa tekstiäsi tehtävään "Lisää teksti" -painikkeella. Kirjoita ohjeita, vihjeitä tai opetuskommentteja. Siirrä teksti täydelliseen paikkaan. Mukauta fontti ja koko luettavuuden varmistamiseksi.

Lisää taustoja ja reunuksia ammattimaiseen ulkoasuun. Valitse teema taustakirjastosta. Säädä läpinäkyvyyttä tarpeen mukaan. Reunukset kehystävät tehtävän kauniisti.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa" -pudotusvalikosta kun tehtävä on valmis. Valitse "Tehtävä (PDF)" ammattimaiseen tulostukseen. Tai valitse "Tehtävä (JPEG)" digitaaliseen jakamiseen. Molemmat formaatit ladataan 300 DPI -laadulla.

Valitse "Mustavalkoinen" -valintaruutu ennen lataamista musteen säästämiseksi. Järjestelmä muuntaa väritehtävän harmaasävyiksi automaattisesti. Säilyttää kaikki yksityiskohdat ilman värejä. Säästää jopa 90% musteen kustannuksista.

Lataa myös vastausavain samalla tavalla. Klikkaa "Vastausavain (PDF)" tai "Vastausavain (JPEG)". Vastausavain näyttää kaikki sanat ratkaistuina. Sama asettelu kuin tehtävässä helpottaen tarkistamista.

Tulosta tehtävät välittömästi tavallisella toimistotulostimella. 300 DPI -laatu näyttää ammattimaiselta millä tahansa tulostimella. Kirjaimet ovat teräviä ja helppolukuisia. Kuvat näyttävät kirkkailta ja selkeiltä.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Sanansekoitus-generaattori palvelee monia erilaisia käyttäjiä suomalaisessa koulutusjärjestelmässä. Esiopettajista alakoulun opettajiin ja kotiopettavista vanhemmista erityisopettajiin. Jokainen käyttäjäryhmä hyötyy ainutlaatuisilla tavoilla. Tulostettavat tehtävät lapsille ilmainen -muodossa sopivat kaikkiin tilanteisiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish word-scramble.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset sanansekoitus-generaattorista ja tehtävien luomisesta.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Finnish Core Bundle terminology
  pricing: {
    title: 'Peruspaketti',
    price: '144€',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sanansekoitustehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Tehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia tehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default wordScrambleFiContent;
