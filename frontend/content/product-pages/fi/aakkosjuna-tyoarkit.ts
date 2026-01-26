import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - Finnish Content (Aakkosjuna Tehtävät)
 *
 * File: frontend/content/product-pages/fi/aakkosjuna-tyoarkit.ts
 * URL: /fi/apps/aakkosjuna-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const alphabetTrainFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'aakkosjuna-tyoarkit',
    appId: 'alphabet-train',
    title: 'Aakkosjuna Tehtävät Generaattori | Tulostettavat Kirjaimet',
    description: 'Luo ammattitasoisia aakkosjuna-tehtäviä esiopetukseen ja alakouluun. Peruspaketti-tilauksellasi saat luoda rajattomasti kirjainten harjoittelutehtäviä ilman.',
    keywords: 'aakkosjuna tehtävät, kirjaimet harjoittelu esikoulu, esiopetus materiaali ilmainen, tulostettavat tehtävät lapsille ilmainen, kirjainten tunnistus, aakkosharjoittelu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/aakkosjuna-tyoarkit',
  },

  // Hero Section - FULL text from Finnish alphabet-train.md
  hero: {
    title: 'Aakkosjuna Tehtävät',
    subtitle: 'Tulostettavat Kirjaimet Harjoittelu Esikoulu ja Esiopetus Materiaali',
    description: `Luo ammattitasoisia aakkosjuna-tehtäviä esiopetukseen ja alakouluun. Peruspaketti-tilauksellasi ($15/kuukausi) saat luoda rajattomasti kirjainten harjoittelutehtäviä ilman lisämaksuja per tehtävä. Tulostettavat tehtävät lapsille soveltuvat täydellisesti esikouluikäisille ja 1. luokan oppilaille. Lataa korkealaatuiset PDF-tehtävät alle 3 minuutissa.

Aakkosjuna-sovelluksemme yhdistää kirjaimet harjoittelun hauskaan junateemaan. Jokainen tehtävä sisältää täsmälleen 11 kirjainta juna-aiheisessa asettelussa. Valitse joko satunnaiset kirjaimet tai tietyt kirjaimet, jotka haluat harjoitella. Liitä kullekin kirjaimelle kuva yli 3000 lapsille sopivan kuvan kirjastosta. Esiopetus materiaali on täysin muokattavissa ja sisältää vastausavaimen opettajille.

Kirjainten tunnistus ja aakkosharjoittelu onnistuvat nopeasti. Luo, muokkaa ja lataa tulostettavat tehtävät minuuteissa. Ei tarvita suunnittelutaitoja. Peruspaketti sisältää 10 suosittua tehtävätyökalua ja kaupallisen lisenssin.`,
    previewImageSrc: '/samples/finnish/alphabet train/sample-1.jpeg',
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
        videoId: '_dDQegRq9JQ',
        buttonText: 'Aakkosjuna-toiminnot',
        modalTitle: 'Aakkosjuna-opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
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

  // Features Grid - FULL text from Finnish alphabet-train.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Aakkosjuna-sovelluksemme yhdistää kirjainten harjoittelun hauskaan ja visuaaliseen muotoon. Jokainen ominaisuus on suunniteltu esiopettajien ja alakoulun opettajien tarpeisiin. Esiopetus materiaali ilmainen tilauksesi aikana. Luo rajattomasti tulostettavat tehtävät lapsille kolmessa minuutissa. Kaikki ominaisuudet sisältyvät Peruspaketti-tilaukseesi.',
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

  // How-To Guide - FULL text from Finnish alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Aakkosjuna-tehtävän luominen vie alle 3 minuuttia alusta loppuun. Nämä viisi vaihetta opettavat sinulle koko prosessin. Ei tarvita teknisiä taitoja tai suunnitteluosaamista. Esiopetus materiaali ilmainen syntyy nopeasti ja vaivattomasti. Jokainen vaihe on suoraviivainen ja intuitiivinen.',
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
        description: `Aloita valitsemalla luomistila. Automaattinen tila valitsee 11 satunnaista kirjainta. Sovellus valitsee myös kuvat automaattisesti. Tämä on nopein tapa luoda tulostettavat tehtävät lapsille. Yksi klikkaus ja sisältö on valmis.

Manuaalinen tila antaa täyden kontrollin. Valitse täsmälleen 11 kirjainta aakkosruudukosta. Klikkaa haluamiasi kirjaimia niiden valitsemiseksi. Laskuri näyttää "Valittu: X/11" reaaliajassa. Valitse juuri ne kirjaimet joita haluat harjoitella.

Kun kirjaimet on valittu, valitse teema kuvalistasta. Eläin-teema sisältää vain eläinkuvia. Ruoka-teema sisältää ruokakuvia. Kulkuneuvo-teema sisältää autoja ja junia. Esiopetus materiaali ilmainen mukautuu oppitunnin aiheeseen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse paperikoko valikosta. Letter Portrait on amerikkalainen standardi. A4 Portrait on eurooppalainen standardi. Landscape-muodot toimivat leveille tehtäville. Neliö-muoto luo tasapainoisen asettelun.

Mukauta sivun taustaväri värivalitsimella. Valkoinen on klassinen valinta tulostettavat tehtävät lapsille. Vaaleansininen tai vaaleanvihreä tuo väriä. Muista että värilliset taustat kuluttavat enemmän mustetta. Harmaasävyvaihtoehto tulee myöhemmin käyttöön.

Aseta vihjeiden määrä 3-11 välillä. 3 vihje tarkoittaa vain 3 kirjainta näkyy. Oppilaat täyttävät loput 8 kirjainta. 11 vihje näyttää kaikki kirjaimet. Tämä toimii vastausavaimena tai mallipohjana.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Työarkkisi',
        description: `Klikkaa "Luo tehtävä" -painiketta. Sovellus luo aakkosjunan välittömästi. Kaikki 11 kirjainta ilmestyvät juna-asetelmaan. Valitut kuvat liittyvät oikeisiin kirjaimiin. Esikatselu ilmestyy canvas-alueelle.

Tehtävän luominen kestää 2-3 sekuntia. Ei latausaikoja. Ei odottelua. Kirjaimet harjoittelu esikoulu materiaali ilmestyy välittömästi. Näet tarkalleen miltä tulostettu tehtävä näyttää.

Vihjeiden määrä määrää montako kirjainta näkyy. Piilotetut kirjaimet näkyvät tyhjinä laatikoina. Oppilaat täyttävät puuttuvat kirjaimet. Esiopetus materiaali ilmainen luo automaattisesti sopivan vaikeustason.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Canvasilla',
        description: `Kaikki canvas-elementit ovat muokattavissa. Klikkaa mitä tahansa elementtiä valitaksesi sen. Valitun elementin ympärillä näkyy kehys. Vedä elementti uuteen paikkaan hiirellä. Asettelu mukautuu juuri sinun mieltymystesi mukaan.

Muuta elementin kokoa vetämällä kulmista. Suurenna kuvia paremman näkyvyyden vuoksi. Pienennä tekstiä säästääksesi tilaa. Pyöritä elementtejä kiinnostavaa asettelua varten. Kirjaimet harjoittelu esikoulu muokkautuu täydellisesti.

Lisää omaa tekstiä "Tekstityökalut"-osiosta. Kirjoita tehtävän otsikko tai ohjeet. Valitse fontti seitsemästä lapsille sopivasta fontista. Säädä fonttikoko, väri ja reunaviiva. Tulostettavat tehtävät lapsille saavat ammattimaisen ulkoasun.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa"-painiketta avataksesi latausvalikko. Neljä vaihtoehtoa ovat saatavilla. Tehtävä (JPEG) lataa tehtävän kuvatiedostona. Vastausavain (JPEG) lataa vastausavaimen kuvatiedostona.

Tehtävä (PDF) lataa tehtävän PDF-muodossa. Vastausavain (PDF) lataa vastausavaimen PDF-muodossa. PDF on paras tulostukseen. JPEG sopii digitaaliseen jakamiseen. Esiopetus materiaali ilmainen ladataan 300 DPI:n tarkkuudella.

Rastita "Harmaasävy" ennen lataamista säästääksesi mustetta. Kaikki värit muuttuvat harmaasävyiksi automaattisesti. Tulostettavat tehtävät lapsille käyttävät 70% vähemmän värimustetta. Kotitulostimella tämä säästää huomattavasti.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Aakkosjuna-sovellus palvelee monenlaisia opettajia ja vanhempia. Esiopetuksen opettajat käyttävät sitä päivittäin. Alakoulun opettajat rakentavat sillä lukutaitoa. Kotikouluvanhemmat räätälöivät opetusta lapsilleen. Erityisopettajat eriyttävät materiaalin. Opettajayrittäjät myyvät luomiaan tehtäviä. Esiopetus materiaali ilmainen mukautuu jokaiseen tilanteeseen.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish alphabet-train.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset aakkosjuna-tehtävägeneraattorista ja kirjainten harjoittelutyöarkeista.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä aakkosjuna työarkit näihin täydentäviin generaattoreihin.',
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

export default alphabetTrainFiContent;
