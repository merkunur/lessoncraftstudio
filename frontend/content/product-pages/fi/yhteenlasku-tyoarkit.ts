import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Finnish Content (Yhteenlasku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/yhteenlasku-tyoarkit.ts
 * URL: /fi/apps/yhteenlasku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'yhteenlasku-tyoarkit',
    appId: 'addition',
    title: 'Yhteenlaskun Tehtävät Generaattori | Tulostettavat Matematiikka',
    description: 'Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja.',
    keywords: 'yhteenlasku tehtävät, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, tulostettavat tehtävät lapsille ilmainen, yhteenlasku ja vähennyslasku tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/yhteenlasku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish addition.md
  hero: {
    title: 'Yhteenlaskun Tehtävät',
    subtitle: 'Tulostettavat Matematiikka Tehtävät Alakoulu ja Esiopetus',
    description: `Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikka tehtävät alakoulu ja esiopetus materiaali ilmainen -oppilaille. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Yhteenlaskun tehtävätyökalu tekee matematiikan oppimisesta visuaalista ja hauskaa. Luo yhteenlaskutehtäviä käyttäen yli 3000 lapsystävällistä kuvaa. Valitse eläinten, ruoan, lelujen tai kouluvälineiden kuvista. Jokainen yhteenlaskun tehtävä on täysin mukautettavissa. Muokkaa kaikkea pohjasta, reunoista ja tekstiin.

Generaattori luo sekä oppilaiden työarkin että opettajan vastausavaimen. Valitse 1-10 tehtävää per työarkki. Säädä vaikeustasoa muuttamalla esineiden määrää ryhmissä. Minimi 1 esine ja maksimi 10 esinettä per ryhmä. Neljä erilaista tehtävätyyppiä sopivat kaikille oppijatasoille.

Kuva-kuva -tila näyttää yhteenlaskut pelkillä kuvilla. Kuva-numero -tila yhdistää kuvat numeroihin. Puuttuva yhteenlaskettava -tila opettaa käänteistä ajattelua. Sekoitettu tila tarjoaa vaihtelua yhdessä työarkissa. Jokainen tila tukee erilaista oppimistyyliä ja kehitysvaihetta.`,
    previewImageSrc: '/samples/finnish/addition/sample-1.jpeg',
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
        videoId: '6O5aCzHkh8M',
        buttonText: 'Yhteenlasku-toiminnot',
        modalTitle: 'Yhteenlasku-opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/addition/
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

  // Features Grid - FULL text from Finnish addition.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Yhteenlaskun tehtävägeneraattori tarjoaa kaikki työkalut tulostettavat tehtävät lapsille ilmainen luontiin. Luo yhteenlasku ja vähennyslasku tehtävät minuuteissa. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan oppimistuloksia. Peruspaketti-tilauksesi antaa täyden pääsyn kaikkiin näihin ammattimaisen tason työkaluihin.',
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

  // How-To Guide - FULL text from Finnish addition.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Yhteenlaskutehtävien luominen vie alle 3 minuuttia alusta loppuun. Seuraa näitä viittä yksinkertaista vaihetta. Ei suunnittelukokemusta tarvita. Ei monimutkaista ohjelmistoa opittavaksi. Jokainen vaihe on selkeä ja intuitiivinen. Peruspaketti-tilauksesi antaa välittömän pääsyn kaikkiin työkaluihin.',
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
        description: `Aloita valitsemalla kuvat yhteenlaskutehtävillesi. Klikkaa "Kuvakirjasto" -välilehteä sivupaneelissa. Näet pudotusvalikon yli 50 teemalla. Valitse teema nähdäksesi kaikki sen kategorian kuvat. Eläimet, ruoka, koulu, lelut, ajoneuvot ja paljon muuta.

Klikkaa yksittäisiä kuvia valitaksesi ne. Valitut kuvat näkyvät "Valitut kuvat ongelmille" -alueella. Tarvitset yhden kuvan per yhteenlaskutehtävä. Jos luot 6 tehtävää, valitse 6 kuvaa. Laskuri näyttää: "Valittu: 6 / 6". Poista kuva klikkaamalla sitä uudestaan.

Hakutoiminto nopeuttaa kuvien löytämistä. Kirjoita hakukenttään "kissa" tai "auto". Generaattori suodattaa kuvat avainsanan mukaan. Nopeampi kuin selaaminen satojen kuvien läpi. Matematiikka tehtävät alakoulu -luonti alkaa oikeilla kuvilla.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Avaa "Tehtävien Konfigurointi" -välilehti. Valitse tehtävätila pudotusvalikosta. Neljä vaihtoehtoa: Kuva + Kuva, Kuva + Numero, Etsi Yhteenlaskettava, Sekoitettu tila. Kuva + Kuva sopii esiopetukseen. Kuva + Numero sopii alakoulun 1. luokalle. Etsi yhteenlaskettava haastavampi vanhemmille oppilaille.

Aseta tehtävien määrä. Liukusäädin 1-10 tehtävää. Aloittelijat tarvitsevat 3-4 tehtävää. Edistyneet oppilaat voivat tehdä 8-10 tehtävää. Säädä vaikeustasoa oppilaiden ikätason mukaan. Matematiikka tehtävät alakoulu vaativat enemmän tehtäviä kuin esiopetus materiaali ilmainen.

Säädä esineiden määrää ryhmissä. Minimi 1 esine, maksimi 10 esinettä. Aloittelijoille aseta min=1, max=3. Edistyneille oppijoille aseta min=3, max=10. Pienempi määrä = helpompi. Suurempi määrä = vaikeampi. Yhteenlasku ja vähennyslasku tehtävät mukautuvat jokaiselle tasolle.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Työarkkisi',
        description: `Avaa "Sivun Asetus" -välilehti ennen generointia. Valitse sivukoko pudotusvalikosta. Letter Portrait (US-standardi), A4 Portrait (kansainvälinen), tai Landscape-versiot. Square-koko sosiaaliseen mediaan. Mukautettu koko erityistarpeisiin.

Valitse taustan teema jos haluat. Klikkaa "Taustan Teema" -pudotusvalikkoa. Valitse teema nähdäksesi esikatselun. Klikkaa taustakuvaa valitaksesi sen. Säädä taustan läpinäkyvyyttä liukusäätimellä. Sama prosessi reunateemoille. Tulostettavat tehtävät lapsille ilmainen näyttävät ammattimaisilta taustoilla ja reunoilla.

Klikkaa "Generoi" -painiketta. Generaattori luo yhteenlaskutehtäväsi välittömästi. Näet esikatselun pääpohjalla. Jokainen tehtävä asemoituu automaattisesti. Kuvat skaalautuvat oikeaan kokoon. Tekstit tasataan kauniisti. Matematiikka tehtävät alakoulu -työarkki on valmis muutamassa sekunnissa.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Jokainen elementti pohjalla on klikattavissa ja muokattavissa. Klikkaa mitä tahansa kuvaa valitaksesi sen. Raahaa kuvaa uuteen paikkaan hiirellä. Kierrä kuvaa kulmakahvoilla. Skaalaa kuvaa koon muuttamiseksi. Paina Delete poistaaksesi elementin kokonaan.

Lisää tekstiä klikkaamalla "Tekstityökalut" -välilehteä. Kirjoita sisältö tekstikenttään. Klikkaa "Lisää Teksti". Teksti ilmestyy pohjan keskelle. Raahaa se haluttuun paikkaan. Säädä fonttikokoa numerokentällä. Valitse seitsemän fontin väliltä pudotusvalikosta.

Muuta tekstin väriä värivalitsimella. Lisää tekstin ääriviiva erottumiseen. Säädä ääriviivan leveyttä 0-10 pikseliä. Täydellinen otsikkojen lisäämiseen. Täydellinen mukautettujen ohjeiden kirjoittamiseen. Esiopetus materiaali ilmainen -työarkit hyötyvät selkeistä ohjeista.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa" -pudotusvalikkonappia. Neljä latausvaihtoehtoa näkyy. "Työarkki (JPEG)" lataa oppilaan version kuvana. "Vastausavain (JPEG)" lataa opettajan version kuvana. "Työarkki (PDF)" lataa oppilaan version asiakirjana. "Vastausavain (PDF)" lataa opettajan version asiakirjana.

PDF-formaatti sopii parhaiten tulostukseen. JPEG-formaatti sopii digitaaliseen jakamiseen. Molemmat formaatit viedään 300 DPI resoluutiolla. Täydellinen tulostamiseen kotitulostimella. Täydellinen tulostamiseen ammattilaispainopalvelulla. Yhteenlasku ja vähennyslasku tehtävät näyttävät ammattimaisilta joka kerta.

Valitse "Harmaasävy" -valintaruutu ennen lataamista. Muuntaa värilliset tehtävät mustavalkoisiksi. Säästää mustetta tulostuksessa. Säästää rahaa kotitulostuksessa. Ympäristöystävällinen valinta kouluille. Esiopetus materiaali ilmainen -työkalut tukevat kustannustehokasta tulostusta.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish addition.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Yhteenlaskutehtävägeneraattori palvelee erilaisia käyttäjäryhmiä koulutusjärjestelmän läpi. Esiopetuksen opettajista alakoulun opettajiin. Kotiopettajista erikoisopettajiin. Jokainen ryhmä hyötyy mukautetuista matematiikka tehtävät alakoulu -työkaluista. Peruspaketti-tilaus antaa kaikille pääsyn samoihin ammattimaisiin ominaisuuksiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish addition.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset yhteenlaskutehtävägeneraattorista ja matematiikkatyöarkeista.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä yhteenlasku työarkit näihin täydentäviin generaattoreihin.',
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

export default additionFiContent;
