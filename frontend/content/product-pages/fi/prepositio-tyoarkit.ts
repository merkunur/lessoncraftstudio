import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - Finnish Content (Prepositioharjoitukset)
 *
 * File: frontend/content/product-pages/fi/prepositio-tyoarkit.ts
 * URL: /fi/apps/prepositio-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/prepositions.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - Prepositions is a FULL ACCESS app ($240/year), NOT Core Bundle
 * - All UI labels in Finnish
 */

export const prepositionsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'prepositio-tyoarkit',
    appId: 'prepositions',
    title: 'Prepositioharjoitus Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia prepositioharjoituksia sijaintisanojen oppimiseen kuvilla. Edessä, takana, alla, päällä — visuaalinen kielenoppiminen. Ilmainen PDF.',
    keywords: 'prepositioharjoitus generaattori, sijaintikäsitteet oppiminen, avaruudellinen hahmottaminen, paikkasanat harjoitus, suuntakäsitteet esikoulu, edessä takana harjoitus, alla päällä tehtävä, kielellinen kehitys harjoitus, spatiaaliset suhteet, asemointi tehtävä, sijainnin kuvaileminen, prepositioharjoitukset, sijaintisanat lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/prepositio-tyoarkit',
  },

  // Hero Section - FULL text from Finnish prepositions.md
  hero: {
    title: 'Prepositioharjoitusten Generaattori',
    subtitle: 'Sijaintisanojen Oppimista Kuvilla',
    description: `Luo ammattimaisia prepositioiden harjoittelutehtäviä alakoululaisille ja esikoululaisille. Täysi Käyttöoikeus -tilaus antaa sinulle rajoittamattoman mahdollisuuden luoda tehtäviä ilman maksuja yksittäisistä tehtävistä. Generoi tulostettavia prepositioharjoituksia, jotka opettavat sijaintisuhteita hauska tavalla. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Prepositioiden tehtävägeneraattori tukee kahta harjoitustyyppiä. Valitse täydennysharjoitukset tai monivalintatehtävät. Molemmat muodot auttavat lapsia oppimaan sijaintisanat konkreettisten esimerkkien avulla. Tehtävät sopivat 1. luokasta 3. luokkaan sekä esiopetukseen.

Generaattori sisältää yli 3000 lapsille sopivaa kuvaa. Kaikki kuvat on järjestetty teemoittain helppoa valintaa varten. Valitse yksittäisiä kuvia tai anna generaattorin valita satunnaisesti kaikista teemoista. Voit myös ladata omia kuvia personoidaksesi tehtävät oppilaillesi.`,
    previewImageSrc: '/samples/finnish/prepositions/sample-1.jpeg',
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
        videoId: 'ifIXbViR5_o',
        buttonText: 'Prepositiot Toiminnot',
        modalTitle: 'Prepositiot Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/prepositions/
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

  // Features Grid - FULL text from Finnish prepositions.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Prepositioiden tehtävägeneraattori tarjoaa kattavat työkalut opettajille ja vanhemmille. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin ominaisuuksiin ilman rajoituksia. Luo esiopetuksen materiaaleja, alakoulun tehtäviä ja kielenoppimisen harjoituksia yhdellä alustalla. Kaikki ominaisuudet on suunniteltu helpottamaan opettajien arkea ja säästämään aikaa.',
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

  // How-To Guide - FULL text from Finnish prepositions.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Prepositioiden tehtävien luominen vie alle kolme minuuttia alusta loppuun. Täysi Käyttöoikeus -tilaus antaa sinulle rajoittamattoman pääsyn kaikkiin ominaisuuksiin. Viisi yksinkertaista vaihetta johtavat valmiiseen tehtävään. Ei suunnittelutaitoja tai teknistä osaamista tarvita. Seuraa näitä ohjeita luodaksesi ensimmäisen tehtäväsi minuuteissa.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Prepositioharjoituksesi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Prepositioharjoituksiin',
        description: `Aloita valitsemalla harjoitusten määrä. Säädä liukusäädintä 1-8 harjoituksen välillä per työarkki. Enemmän harjoituksia sopii pidempiin tuntijaksoihin. Vähemmän harjoituksia toimii lyhyempiin istuntoihin tai nuoremmille oppilaille.

Valitse harjoitustyyppi kahdesta vaihtoehdosta. Täydennysharjoitukset jättävät tyhjän tilan oikealle prepositiolle. Oppilaat kirjoittavat vastauksen itse. Tämä muoto sopii itsenäiseen työskentelyyn ja arviointiin.

Monivalintatehtävät tarjoavat useita vaihtoehtoja. Oppilaat valitsevat oikean preposition annetuista vaihtoehdoista. Tämä muoto sopii paremmin aloittelijoille ja tukea tarvitseville. Vähentää kirjoittamisen tarvetta ja tarjoaa vihjeitä.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse paperikoko tehtävälle. Letter Portrait sopii amerikkalaisiin tulostimiin. A4 Portrait on eurooppalainen standardi. Landscape-muodot sopivat laajempiin asetteluihin. Neliömuoto toimii sosiaalisessa mediassa.

Valitse taustateema tehtävälle. Selaa yli 3000 taustakuvaa teemoittain. Valitse aiheeseen sopiva tausta. Säädä taustan läpinäkyvyyttä luettavuuden takaamiseksi. Tyhjä tausta säästää mustetta tulostuksessa.

Lisää reunukset tehtävän ympärille. Selaa reunustyylejä teemoittain. Valitse lapsille houkutteleva reunus. Reunukset tekevät tehtävistä visuaalisesti kiinnostavampia.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä',
        description: `Napsauta "Generoi" -painiketta luodaksesi tehtävän. Generaattori luo tehtävän alle 3 sekunnissa. Näet välittömän esikatselun tehtävästä pohjalla. Kaikki elementit näkyvät täsmälleen kuten tulostetussa versiossa.

Generaattori valitsee automaattisesti sopivat kuvat. Jokainen kuva esittää eri sijaintisuhteen. Prepositiolauseet muodostuvat automaattisesti valitulla kielellä. Kaikki prepositiot ovat kieliopillisesti oikein.

Vastausavain luodaan automaattisesti. Napsauta "Vastausavain" -välilehteä nähdäksesi vastaukset. Vastausavain näyttää kaikki oikeat prepositiot. Tulosta vastausavain erikseen nopeaa tarkistusta varten.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Työalueella',
        description: `Jokainen elementti tehtävällä on täysin muokattavissa. Napsauta mitä tahansa kuvaa, tekstiä tai muotoa valitaksesi sen. Valitun objektin ympärille ilmestyy reunus. Muokkaustyökalut aktivoituvat automaattisesti.

Siirrä elementtejä vetämällä hiirellä. Aseta kuvat täsmälleen haluamaasi paikkaan. Tasaa elementtejä toisiinsa nähden tasaustyökaluilla. Luo ammattimaisen näköisiä asetteluita vaivattomasti.

Lisää omia tekstejä tehtävään. Kirjoita otsikko, ohje tai lisäselitys. Valitse sopiva fontti seitsemästä vaihtoehdosta. Säädä tekstin kokoa, väriä ja ääriviivaa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Napsauta "Lataa" -painiketta viedäksesi tehtävän. Valitse PDF- tai JPEG-muoto alasvetovalikosta. PDF säilyttää parhaan laadun kaikissa koissa. JPEG sopii digitaaliseen jakamiseen ja sosiaaliseen mediaan.

Valitse värillinen tai harmaasävytulostus. Harmaasävy säästää värimustetta merkittävästi. Oppilaat voivat värittää harmaasävyiset versiot. Luo värityskuvia lapsille tulostettava -tyyppisiä tehtäviä.

Kaikki tehtävät viedään 300 DPI -laadulla. Täydellinen terävyys kotitulostimilla ja ammattitulostimilla. Tekstit pysyvät luettavina kaikissa koissa. Kuvat näyttävät ammattimaisilta tulostetussa muodossa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish prepositions.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Prepositioiden tehtävägeneraattori palvelee laajaa opettajien ja vanhempien joukkoa. Täysi Käyttöoikeus -tilaus sopii esiopetuksen opettajille, alakoulun opettajille ja kotiopettajille. Luo matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät samalla alustalla. Jokainen käyttäjäryhmä hyötyy generaattorin ainutlaatuisista ominaisuuksista.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish prepositions.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset prepositioharjoitusten generaattorista ja prepositiotehtävistä.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Finnish terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton prepositioharjoitusten luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä prepositioharjoitukset näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Prepositioharjoituksia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia prepositioharjoituksia. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default prepositionsFiContent;
