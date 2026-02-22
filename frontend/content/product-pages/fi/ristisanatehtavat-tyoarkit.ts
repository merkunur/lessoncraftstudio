import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - Finnish Content (Ristisanatehtävien Generaattori)
 *
 * File: frontend/content/product-pages/fi/ristisanatehtavat-tyoarkit.ts
 * URL: /fi/apps/ristisanatehtavat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const crosswordFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'ristisanatehtavat-tyoarkit',
    appId: 'crossword',
    title: 'Kuvaristisana Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia kuvaristisanatehtäviä, joissa kuvat toimivat vihjehinä. Kehittää sanavarastoa ja oikeinkirjoitusta. Esikoulusta 3. luokalle. Ilmainen.',
    keywords: 'kuvaristisana generaattori, ristikko lapsille, sanaristikko harjoitus, sanasto kehittäminen, oikeinkirjoitustaito, kielellinen päättely, sanapeli tulostettava, kirjaintaito harjoitus, lukemisen tukeminen, visuaalinen sanaharjoitus, suomen kielen sanasto, kuvaristisana tehtävät, ristisana lapsille tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/ristisanatehtavat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish crossword.md
  hero: {
    title: 'Kuvaristisana Generaattori',
    subtitle: 'Sanavaraston ja Oikeinkirjoituksen Harjoittelua Kuvilla',
    description: `Luo ammattimaisia ristisanatehtäviä kuvilla muutamassa minuutissa. Tulostettavat tehtävät lapsille ilmainen luominen Täysi Käyttöoikeus -tilauksella ilman maksua per tehtävä. Ristisanatehtävien generaattori on täydellinen työkalu esiopetuksen ja alakoulun opettajille. Luo räätälöityjä tehtäviä, jotka sopivat täydellisesti oppilaiden taitotasolle.

Ristisanatehtävät ovat loistava tapa opettaa sanastoa ja kirjainten tunnistusta. Generaattorimme luo automaattisesti ristikon valitsemistasi kuvista. Jokainen kuva muuttuu sanaksi ristikossa. Voit valita teemoja tai yksittäisiä kuvia yli 3000 kuvan kirjastosta. Esiopetus materiaali ilmainen luominen tilauksella tarkoittaa rajattomia tehtäviä ilman lisäkustannuksia.

Generaattori toimii täysin suomeksi. Kaikki kuvien nimet ja teemat näkyvät suomeksi. Voit myös ladata omia kuvia ja muokata niiden nimiä ennen ristikon luomista. Lataa valmiit tehtävät PDF- tai JPEG-muodossa. Tehtävät sopivat kotitulostimelle ja ammattilaistulosteelle. Täysi Käyttöoikeus -tilaus sisältää kaupallisen lisenssin, joten voit myydä luomiasi tehtäviä.`,
    previewImageSrc: '/samples/finnish/crossword/sample-1.jpeg',
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
        videoId: 'b3WKDrzif-w',
        buttonText: 'Ristisanatehtävät Toiminnot',
        modalTitle: 'Ristisanatehtävät Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/crossword/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtäväsivu',
    answerKeyLabel: 'Vastaussivu',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish crossword.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Ristisanatehtävien generaattori tarjoaa kaiken mitä tarvitset ammattimaisten tehtävien luomiseen. Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kaikkiin ominaisuuksiin. Luo tulostettavat tehtävät lapsille ilmainen lisäkustannuksista. Ei maksuja per tehtävä. Ei rajoituksia luomien tehtävien määrässä. Generaattori sisältää työkalut esiopetus materiaali ilmainen luomiseen ja alakoulun tehtäviin.',
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

  // How-To Guide - FULL text from Finnish crossword.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaisia ristisanatehtäviä alle kolmessa minuutissa. Ei tarvita suunnittelutaitoja. Ei tarvita erikoisohjelmistoja. Kaikki toimii suoraan selaimessasi. Seuraa näitä viittä vaihetta luodaksesi tulostettavat tehtävät lapsille ilmainen ristisanatehtäviä. Generaattori tekee vaikean työn puolestasi.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Ristisanatehtäväsi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Ristisanatehtävään - Kirjaimet Harjoittelu Esikoulu ja Matematiikka Tehtävät Alakoulu',
        description: `Aloita valitsemalla kuvat ristisanatehtävääsi. Kolme tapaa valita kuvat. Valitse teema nopeaa luomista varten. Valitse yksittäisiä kuvia tarkempaa kontrollia varten. Lataa omia kuvia henkilökohtaisia tehtäviä varten. Kaikki kolme tapaa toimivat erinomaisesti.

Teemavaihtoehto on nopein. Avaa Kuvakirjasto-osio. Klikkaa "Generoi teemasta" -valikko. Näet kaikki saatavilla olevat teemat. Aakkoset, Eläimet, Ruoka, Kulkuneuvot, Numerot, Muodot. Klikkaa mitä tahansa teemaa. Generaattori valitsee automaattisesti 8 kuvaa kyseisestä teemasta. Täydellinen kirjaimet harjoittelu esikoulu tehtäviin valitsemalla Aakkoset-teema. Täydellinen matematiikka tehtävät alakoulu aiheisiin valitsemalla Numerot tai Muodot.

Yksittäisten kuvien valinta antaa tarkan kontrollin. Avaa Kuvakirjasto-osio. Valitse teema pudotusvalikosta. Selaa saatavilla olevia kuvia. Klikkaa mitä tahansa kuvaa lisätäksesi sen valintaasi. Valitut kuvat näkyvät Valitut kuvat -esikatselussa. Klikkaa uudelleen poistaaksesi. Valitse 8-15 kuvaa optimaaliselle ristikolle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Esiopetus Materiaali Ilmainen Kaikille Ikäryhmille',
        description: `Mukauta tehtävä oppilaiden taitotasolle. Valitse paperikoko. Letter Portrait yhdysvaltalaisille tulostimille. A4 Portrait eurooppalaisille tulostimille. Vaaka-asento leveämmille ristikoille. Pystyasento perinteisille ristikoille. Vaihda milloin tahansa.

Lisää tausta teemallisia tehtäviä varten. Avaa Sivu-osio. Klikkaa Taustateema-valikko. Valitse mistä tahansa teemasta. Kevät, Kesä, Syksy, Talvi, Juhlapyhät, Eläimet. Tausta näkyy esikatselussa välittömästi. Säädä läpinäkyvyyttä liukusäätimellä.

Lisää reunus ammattimaiseen ulkonäköön. Klikkaa Reunusteema-valikko. Valitse mistä tahansa reunuskuviosta. Tähdet, Sydämet, Eläimet, Kukat, Geometriset kuviot. Reunus kehystää tehtävän kauniisti. Täydellinen värityskuvia lapsille tulostettava yhdistämiseen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Ristisanatehtäväsi - Tulostettavat Tehtävät Lapsille Alle Minuutissa',
        description: `Klikkaa vihreää "Generoi" -painiketta. Generaattori luo ristikon automaattisesti. Kestää 3-10 sekuntia. Generaattori laskee optimaalisen asettelun. Sanat risteävät automaattisesti. Jokainen ristikko on uniikki. Ei kahta samanlaista.

Ristikko ilmestyy Tehtävä-välilehdelle. Jokaisessa ruudussa on kirjain. Tyhjät ruudut mustat. Täytetyt ruudut valkoiset. Numerot osoittavat sanojen aloituskohdat. Täydellinen perinteinen ristikkoulkoasu. Oppilaiden tuttu formaatti.

Kuvat näkyvät vihjelistana ristikon alla. Numerot vastaavat ristikon numeroita. "1 Vaaka" tarkoittaa ensimmäistä vaakasuoraa sanaa. "2 Pysty" tarkoittaa toista pystysuoraa sanaa. Oppilaat katsovat kuvaa. Tunnistavat kuvan. Kirjoittavat sanan ristikkoon.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Hienomotoriikka Harjoitukset ja Räätälöinnin Vapaus',
        description: `Muokkaa mitä tahansa elementtiä pohjalla. Klikkaa valitaksesi. Raahaa siirtääksesi. Skaalaa nurkista. Kierrä vapaasti. Täysi muokkausvapaus jokaisessa tehtävässä. Mukauta täydellisesti oppilaidesi tarpeisiin.

Lisää otsikko tai ohjeteksti. Avaa Tekstityökalut-osio. Kirjoita teksti kenttään. Klikkaa "Lisää teksti tehtävään". Teksti ilmestyy pohjalle. Raahaa oikeaan paikkaan. Muuta fonttikokoa. Vaihda fonttia. Muuta väriä. Lisää ääriviiva terävyyttä varten.

Muokkaa vihjekuvia. Klikkaa mitä tahansa vihjekuvaa. Muuta kokoa isommaksi tai pienemmäksi. Raahaa uuteen asentoon. Järjestä uudelleen vihjeiden järjestystä. Luo hienomotoriikka harjoitukset pyytämällä oppilaita leikkaamaan ja liimaamaan vihjeet.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Kertotaulut Tulostettava ja Yhteenlasku Vähennyslasku Tehtävät',
        description: `Lataa tehtävä kun olet tyytyväinen. Klikkaa "Lataa" -painiketta. Valitse formaatti. JPEG yksinkertainen kuva. PDF ammattitulostukseen. Molemmat 300 DPI korkealaatuisia. Täydellinen kotitulostimelle ja ammattitulostusstudiolle.

Lataa tehtävä ja vastausavain erikseen. Klikkaa "Ristisanatehtävä (JPEG)" tehtävää varten. Klikkaa "Vastausavain (JPEG)" vastauksia varten. Tai valitse PDF-versiot. PDF suositeltu tulostusta varten. JPEG suositeltu digitaaliseen käyttöön.

Harmaasävyvaihtoehto säästää mustetta. Rastita "Harmaasävy" ennen lataamista. Värilliset elementit muuttuvat harmaaksi. Tausta ja reunukset harmaita. Säästää mustekuluja merkittävästi. Täydellinen suurille luokille tai massatulosteille.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish crossword.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Ristisanatehtävien generaattori palvelee monia käyttäjiä. Esiopetuksen opettajat. Alakoulun opettajat. Kotiopettajat. Kielenopettajat. Erityisopettajat. Opettajayrittäjät. Jokainen ryhmä hyötyy eri tavalla. Kaikki saavat tulostettavat tehtävät lapsille ilmainen työkalun, joka säästää tunteja aikaa viikoittain.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish crossword.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä - Tulostettavat Tehtävät Lapsille Ilmainen ja Värityskuvia Lapsille Tulostettava',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä generaattorista. Tässä ovat vastaukset kaikkiin yleisimpiin kysymyksiin. Lue nämä ennen tilaamista. Saat selkeän kuvan siitä, miten generaattori toimii.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Finnish Full Access terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton ristisanatehtävien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastaussivut sisältyvät',
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
    sectionDescription: 'Ristisanatehtävien todellinen voima tulee esiin yhdistettynä muihin generaattoreihin. Täysi Käyttöoikeus antaa sinulle pääsyn kaikkiin 33 generaattoriin. Luo kattavia opetuspaketteja.',
    ctaTitle: 'Valmiina Luomaan Upeita Ristisanatehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia ristisanatehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default crosswordFiContent;
