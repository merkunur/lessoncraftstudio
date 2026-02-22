import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Finnish Content (Matematiikka Tehtävät)
 *
 * File: frontend/content/product-pages/fi/matematiikka-tyoarkit.ts
 * URL: /fi/apps/matematiikka-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathWorksheetsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'matematiikka-tyoarkit',
    appId: 'math-worksheet',
    title: 'Matematiikkatehtävä Generaattori | LessonCraftStudio',
    description: 'Luo visuaalisia matematiikkatehtäviä kuvilla. Yhteenlasku, vähennyslasku, vertailu ja lukujonot esikoulusta 3. luokalle. Vastausavaimet mukana. Ilmainen PDF.',
    keywords: 'matematiikkatehtävä generaattori, laskutoimitukset harjoittelu, matemaattiset perustaidot, numerotaju kehittäminen, laskuharjoitukset tulostettava, matematiikan oppiminen, laskutaidon vahvistaminen, perusmatematiikka lapset, aritmetiikka harjoitus, lukumääräkäsite oppiminen, matematiikkapeli tulostettava, matematiikka tehtävät alakoulu, matikka tehtävät tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/matematiikka-tyoarkit',
  },

  // Hero Section - FULL text from Finnish math-worksheet.md
  hero: {
    title: 'Matematiikkatehtävien Generaattori',
    subtitle: 'Visuaalisia Matematiikkaharjoituksia Esikoulusta 3. Luokalle',
    description: `Luo ammattimaisia visuaalisia matematiikkatehtäviä minuuteissa. Peruspaketti-tilauksesi antaa sinulle rajattoman matematiikkatehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä jotka sopivat täydellisesti esiopetuksen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Visuaaliset matematiikkatehtävät auttavat lapsia oppimaan yhteenlaskua ja vähennyslaskua kuvien avulla. Jokainen tehtävä käyttää kuvia numeroiden esittämiseen. Lapset laskevat kuvia ja ratkaisevat matemaattisia ongelmia. Tämä visualisoinnin menetelmä tekee abstraktista matematiikasta konkreettista ja ymmärrettävää.

Matematiikkatehtävien generaattori tarjoaa neljä vaikeustasoa. Hyvin helppo ja helppo taso käyttävät kahta symbolia per tehtävä. Keskitaso käyttää kolmea symbolia. Vaikea taso käyttää neljää symbolia. Valitse vaikeustaso joka sopii oppilaittesi taitotasolle.

Luo tehtäviä joko pelkästään yhteenlaskusta tai yhteenlaskun ja vähennyslasku yhdistelmästä. Aseta minimiarvo ja maksimiarvo numeroille. Päätä salliiko tehtävät negatiiviset tulokset. Nämä asetukset antavat sinulle täydellisen kontrollin tehtävien sopivuudesta.`,
    previewImageSrc: '/samples/finnish/math worksheet/sample-1.jpeg',
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
        videoId: '-JIawojGNr0',
        buttonText: 'Matematiikkatehtävät Toiminnot',
        modalTitle: 'Matematiikkatehtävät Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
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

  // Features Grid - FULL text from Finnish math-worksheet.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Visuaalinen matematiikkatehtävien generaattori yhdistää helppokäyttöisyyden ja ammattimaisen laadun. Seitsemän pääominaisuutta tekevät matematiikkatehtävien luonnista nopeaa ja tehokasta. Jokainen ominaisuus on suunniteltu opettajien tarpeisiin. Luo tulostettavia matematiikkatehtäviä minuuteissa ilman graafisen suunnittelun taitoja.',
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

  // How-To Guide - FULL text from Finnish math-worksheet.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Visuaalisten matematiikkatehtävien luonti on nopeaa ja yksinkertaista. Koko prosessi alusta loppuun kestää alle kolme minuuttia. Ei tarvitse graafisen suunnittelun taitoja. Ei monimutkaisia ohjelmia. Vain viisi helppoa vaihetta ammattimaisilta näyttäviin matematiikkatehtäviin.',
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
        description: `Aloita valitsemalla kuinka haluat valita kuvat. Kaksi pääasiallista tapaa on käytettävissä. Teemapohjainen valinta on nopein tapa. Yksittäinen kuvavalinta antaa tarkemman kontrollin.

Teemapohjaisessa valinnassa valitset yhden teeman pudotusvalikosta. Kaikki kuvat tulevat automaattisesti siitä teemasta. Eläimet, ruoka, lelut, kulkuneuvot tai luonto. Yli kolmekymmentä teemaa valittavana. Generaattori käyttää satunnaisia kuvia valitusta teemasta.

Yksittäinen kuvavalinta antaa sinulle täyden kontrollin. Selaa kuvakirjastoa ja klikkaa kuvia jotka haluat käyttää. Suodata kirjasto teeman mukaan kaventaaksesi vaihtoehtoja. Hae tiettyjä kuvia hakutoiminnolla. Lisää vähintään kolme kuvaa luodaksesi mielenkiintoisia tehtäviä.

Lataa omia kuvia personoidaksesi matematiikkatehtävät. Klikkaa "Valitse Tiedostot" painiketta. Selaa kuvat tietokoneeltasi tai tabletiltasi. Lataa useita kuvia kerralla. Ladatut kuvat näkyvät omassa osiossaan. Klikkaa niitä lisätäksesi valittuun kuvapoolin.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse vaikeustaso joka sopii oppilaidesi taitotasolle. Hyvin helppo käyttää kahta symbolia per laskutoimitus. Helppo taso myös kahta symbolia mutta suurempia numeroita. Keskitaso käyttää kolmea symbolia. Vaikea taso käyttää neljää symbolia per laskutoimitus.

Aseta tehtävien lukumääräksi yksi kuuteen. Aloittelijoille yksi tai kaksi tehtävää per sivu toimii hyvin. Edistyneemmät oppilaat voivat tehdä kolmesta kuuteen tehtävää per sivu. Enemmän tehtäviä tarkoittaa enemmän harjoittelua yhdellä työarkilla.

Määritä minimiarvo ja maksimiarvo numeroille. Oletusarvot ovat nolla ja kaksikymmentä. Muuta näitä arvoja mukauttaaksesi vaikeutta. Esiopetukselle käytä nollasta kymmeneen. Alakoulun toiselle luokalle kokeile nollasta sataan. Numeroalue vaikuttaa suoraan tehtävien vaikeuteen.

Mukauta sivuasetus tulostintasi mukaan. Letter Portrait sopii amerikkalaisille tulostimille. A4 Portrait sopii eurooppalaisille tulostimille. Landscape-suuntaus antaa enemmän tilaa suurille kuvilla. Valitse koko joka sopii luokkahuoneesi tarpeisiin.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Työarkkisi',
        description: `Klikkaa "Generoi Työarkki" painiketta. Generaattori luo matematiikkatehtävän välittömästi. Prosessi kestää muutaman sekunnin. Näet esikatselun heti kun se on valmis.

Tarkista että kaikki näyttää oikealta. Ovatko kuvat selkeitä ja tunnistettavia? Ovatko laskutoimitukset sopivan vaikeita? Onko asettelu tasapainoinen ja ammattimaisen näköinen? Jos kaikki näyttää hyvältä, siirry seuraavaan vaiheeseen.

Jos haluat erilaisia kuvia, klikkaa "Generoi Työarkki" uudelleen. Generaattori luo täysin uuden version satunnaisilla kuvilla. Kokeile useita kertoja löytääksesi täydellisen yhdistelmän. Ei rajoituksia kuinka monta kertaa voit generoida.

Generoi erillinen vastausavain klikkaamalla "Generoi Vastausavain". Vastausavain näyttää samat tehtävät vastausten kanssa. Tämä nopeuttaa tehtävien tarkistamista merkittävästi. Säästä vastausavain opettajan avustajille tai omaan arkistoosi.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Nyt voit muokata jokaista elementtiä suoraan pohjalla. Klikkaa mitä tahansa kuvaa valitaksesi sen. Raahaa kuvat uusiin paikkoihin. Kierrä kuvia kulmasta. Skaalaa kuvia suuremmiksi tai pienemmiksi vetämällä kulmia.

Muokkaa tekstejä klikkaamalla niitä. Vaihda väriä vasemmassa sivupalkissa olevan värivalitsimen avulla. Muuta fonttikokoa numero-kentässä. Valitse eri fontti pudotusvalikosta. Lisää reunuksia teksteihin liukusäätimellä.

Lisää uutta tekstiä "Lisää Teksti" -työkalulla. Kirjoita haluamasi teksti syöttökenttään. Klikkaa "Lisää Teksti" painiketta. Uusi teksti ilmestyy pohjalle. Raahaa se haluamaasi paikkaan. Mukauta väri, koko ja fontti.

Kumoa virheet "Kumoa" painikkeella. Tee uudelleen "Tee uudelleen" painikkeella. Nämä painikkeet suojaavat vahingollisilta muutoksilta. Tee rohkeita muokkauksia ilman pelkoa. Voit aina palata edelliseen tilaan.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Kun olet tyytyväinen työarkkiin, on aika ladata se. Klikkaa "Lataa" pudotusvalikkoa. Valitse haluamasi formaatti ja versio. Neljä vaihtoehtoa on käytettävissä.

Lataa työarkki JPEG-muodossa nopeaan jakamiseen. JPEG-tiedostot ovat pieniä ja latautuvat nopeasti sähköpostissa. Täydelliset yksittäisiin sivuihin. Toimivat erinomaisesti verkkokaupoissa. Säilyttävät 300 DPI laadun.

Lataa työarkki PDF-muodossa ammattimaiseen tulostukseen. PDF säilyttää tekstin terävyyden täydellisesti. Yhteensopiva kaikkien tulostimien kanssa. Paras vaihtoehto useampisivuisiin dokumentteihin. Säilyttää korkean laadun millä tahansa koolla.

Tulosta tehtävät kotona tavallisella tulostimella. Valitse harmaasävy säästääksesi väriä. Tulosta värillisiin lomakkeisiin lisätäksesi visuaalista kiinnostusta. Tai lähetä tiedostot ammattimaiseen tulostuspalveluun suurta määrää varten.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Visuaalinen matematiikkatehtävien generaattori palvelee monia eri käyttäjäryhmiä. Jokainen ryhmä hyötyy työkalun joustavuudesta ja helppokäyttöisyydestä. Opettajat säästävät tunteja valmistelua viikossa. Vanhemmat löytävät laadukasta oppimateriaalia kotiin. Kasvattajat luovat ammattimaisilta näyttäviä tehtäviä ilman graafisen suunnittelun taitoja.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish math-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset visuaalisesta matematiikkatehtävägeneraattorista ja tulostettavista tehtävistä.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä visuaaliset matematiikka työarkit näihin täydentäviin generaattoreihin.',
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

export default mathWorksheetsFiContent;
