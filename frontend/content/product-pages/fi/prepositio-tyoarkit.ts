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
    items: [
      {
        id: '1',
        icon: '📍',
        title: 'Paikkasanojen harjoitusmuoto',
        description: 'Generaattori luo tehtäviä, joissa oppilaat tunnistavat esineiden sijainnin suhteessa toisiinsa. Kahdeksan paikkasanaa: päällä, alla, edessä, takana, vieressä, välissä, sisällä ja ulkona. Kehittää avaruudellista sanastoa.',
      },
      {
        id: '2',
        icon: '⚙️',
        title: 'Säädettävät paikkasanavalinnat',
        description: 'Valitse mitkä paikkasanat sisältyvät tehtävään. Aloita kahdella paikkasanalla (päällä, alla) ja laajenna asteittain. Täydellinen eriyttettävisiin oppimistilanteisiin taitotason mukaan.',
      },
      {
        id: '3',
        icon: '📝',
        title: 'Monipuoliset tehtävämuodot',
        description: 'Useita vastausmuotoja: ympyröi oikea kuva, valitse oikea paikkasana, piirrä esine oikeaan paikkaan tai yhdistä kuva paikkasanaan. Monipuolisuus pitää harjoittelun motivoivana.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa paikkasanatehtäviin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta paikkasanatehtävien luomiseen. Eläimet, huonekalut, lelut ja kymmenet muut teemat. Kuvat näyttävät sijainnin havainnollisesti.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen paikkasanatehtävä generoi automaattisesti vastausavaimen, jossa oikeat vastaukset on korostettu. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää omaa tekstiä, fontteja, värejä ja kehyksiä ammattimaiseen lopputulokseen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä paikkasanatehtäviä verkossa. Prepositioharjoitukset ovat suosittuja kielenopetuksen materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo paikkasanatehtäviä 11 kielellä mukaan lukien suomi, ruotsi ja tanska. Paikkasanat kääntyvät valitulle kielelle. Täydellinen S2-opetukseen ja monikielisiin luokkiin.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Paikkasanojen perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia paikkasanatehtäviä kahdella paikkasanalla (päällä, alla). Esiopetuksen oppilaat harjoittelevat sijainnin tunnistamista kuvien avulla. Visuaalinen muoto tekee paikkasanoista konkreettisia. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Avaruudellista sanastoa 1.–2. luokalla',
        description: 'Generoi paikkasanatehtäviä 4–8 paikkasanalla. Oppilaat oppivat käyttämään paikkasanoja lauseissa ja tunnistamaan spatiaalisia suhteita. Kehittää avaruudellista sanastoa ja kirjoitustaitoja.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja paikkasanaharjoituksia kotiin',
        description: 'Luo temaattisia paikkasanatehtäviä tutuilla kuvilla. Eläin- ja huonekalukuvat tekevät sijainnin oppimisesta konkreettista. Visuaaliset tehtävät sopivat itsenäiseen harjoitteluun kotona.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Suomen kielen paikkasanojen opetus',
        description: 'Paikkasanatehtävät ovat erinomaisia S2-opetukseen. Kuvat havainnollistavat paikkasanojen merkityksen konkreettisesti. 11 kielen tuki mahdollistaa vertailun oman äidinkielen paikkasanoihin.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt paikkasanaharjoitukset',
        description: 'Säädä paikkasanojen määrää ja tehtävämuotoa HOJKS-tavoitteiden mukaisesti. Kaksi paikkasanaa selvällä erolla tukee heikompia oppilaita. Visuaalinen muoto tekee oppimisesta konkreettista.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy paikkasanapaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia paikkasanapaketteja myytäväksi verkossa. Prepositioharjoitukset ovat jatkuvasti kysyttyjä kielenopetuksen materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten prepositiogeneraattori toimii?',
        answer: 'Generaattori luo tehtäviä, joissa kuvat näyttävät esineiden sijaintisuhteita. Oppilaat tunnistavat paikkasanan (päällä, alla, edessä jne.) kuvan perusteella. Valitse paikkasanat, tehtävämuoto ja kuvateema.',
      },
      {
        id: '2',
        question: 'Mitkä paikkasanat ovat käytettävissä?',
        answer: 'Kahdeksan paikkasanaa: päällä, alla, edessä, takana, vieressä, välissä, sisällä ja ulkona. Valitse mitkä sisältyvät tehtävään. Aloita kahdesta ja laajenna asteittain.',
      },
      {
        id: '3',
        question: 'Mitkä tehtävämuodot ovat saatavilla?',
        answer: 'Useita muotoja: ympyröi oikea kuva, valitse oikea paikkasana, piirrä esine oikeaan paikkaan ja yhdistä kuva paikkasanaan. Monipuoliset muodot pitävät harjoittelun vaihtelevana.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen paikkasanatehtävä generoi automaattisesti vastausavaimen. Oikeat vastaukset korostetaan selkeästi. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille paikkasanatehtävät sopivat?',
        answer: 'Paikkasanatehtävät palvelevat 4–8-vuotiaita. Esikoululaiset harjoittelevat 2–3 paikkasanaa. 1.–2. luokan oppilaat käyttävät kaikkia 8 paikkasanaa lauseissa.',
      },
      {
        id: '6',
        question: 'Miten paikkasanatehtävät tukevat kielenoppimista?',
        answer: 'Paikkasanat ovat kielellisen kehityksen perusosaamista. Visuaaliset kuvat tekevät abstrakteista paikkasanoista konkreettisia. Oppilaat ymmärtävät sijainnin käsitteen ennen sanallista ilmaisua.',
      },
      {
        id: '7',
        question: 'Sopivatko tehtävät S2-opetukseen?',
        answer: 'Erinomaisesti. Paikkasanat ovat keskeisiä S2-opetuksessa ja kuvat havainnollistavat merkityksen ilman käännöstä. 11 kielen tuki mahdollistaa vertailun oman äidinkielen paikkasanoihin.',
      },
      {
        id: '8',
        question: 'Miten tulostan paikkasanatehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Ammattimaiset tulosteet kotitulostimella.',
      },
      {
        id: '9',
        question: 'Sopiiko generaattori erityisopetukseen?',
        answer: 'Kyllä. Säädä paikkasanojen määrää ja tehtävämuotoa HOJKS-tavoitteiden mukaisesti. Kaksi paikkasanaa selvällä erolla tukee heikompia oppilaita. Kuvat tekevät oppimisesta konkreettista.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden paikkasanatehtävän luominen vie alle 3 minuuttia. Valitse paikkasanat ja kuvat 30 sekunnissa. Generaattori luo tehtävän välittömästi. Viikon tehtävät valmistuvat nopeasti.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani paikkasanatehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin paikkasanatehtävien myyntiin verkossa. Luo teemallisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten paikkasanatehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Paikkasanatehtävät kehittävät avaruudellista sanastoa, kielellisiä taitoja ja visuaalista hahmottamista. POPS 2014 korostaa monipuolista kielitietoisuutta ja avaruudellisen ajattelun kehittämistä. Paikkasanatehtävät toteuttavat molempia.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        slug: 'kasinkirjoitus-tyoarkit',
        name: 'Käsinkirjoitus',
        category: 'Lukutaito',
        icon: '✏️',
        description: 'Käsinkirjoitustehtävät laajentavat kielellisiä taitoja kirjoittamisen harjoitteluun. Yhdistä paikkasanatehtäviin kattavaan kielenoppimispakettiin.',
      },
      {
        id: '2',
        slug: 'viivojen-piirtaminen-tyoarkit',
        name: 'Viivojen piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Viivanpiirtotehtävät kehittävät kynänhallintaa paikkasanatehtävien rinnalla. Molemmat tukevat hienomotoriikan kehittymistä.',
      },
      {
        id: '3',
        slug: 'kuva-arvaus-tyoarkit',
        name: 'Kuva-arvaus',
        category: 'Sanasto',
        icon: '💡',
        description: 'Kuva-arvaustehtävät kehittävät sanastoa visuaalisesti. Yhdistä paikkasanatehtäviin kattavaan sanastoharjoitteluun.',
      },
      {
        id: '4',
        slug: 'kuvapolku-tyoarkit',
        name: 'Kuvapolku',
        category: 'Hahmottaminen',
        icon: '🛤️',
        description: 'Kuvapolkutehtävät kehittävät avaruudellista hahmottamista, joka tukee paikkasanojen ymmärtämistä.',
      },
      {
        id: '5',
        slug: 'iso-pieni-tyoarkit',
        name: 'Iso vai pieni',
        category: 'Hahmottaminen',
        icon: '📏',
        description: 'Iso vai pieni -tehtävät kehittävät visuaalista vertailua, joka tukee paikkasanojen vaatimaa sijainnin hahmottamista.',
      },
      {
        id: '6',
        slug: 'yhdista-parit-tyoarkit',
        name: 'Yhdistä parit',
        category: 'Logiikka',
        icon: '🔗',
        description: 'Yhdistä parit -tehtävät harjoittavat yhteenkuuluvuuden tunnistamista. Yhdistä paikkasanatehtäviin monipuoliseen kielioppipakettiin.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 177) ------------------------------------

  aiOverviewSnippet: 'Prepositio-generaattori on verkkotyokalu, jolla luodaan tulostettavia paikkasanatehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat esineiden sijaintisuhteita (paalla, alla, edessa, takana jne.) kuvien avulla. Opettajat valitsevat paikkasanat, tehtavamuodon ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Paikkasanat',
      ourApp: '8 paikkasanaa vapaasti valittavissa',
      typical: 'Kiinteä 4–5 paikkasanaa',
    },
    {
      feature: 'Tehtävämuodot',
      ourApp: '4 muotoa: ympyröi, valitse, piirrä, yhdistä',
      typical: 'Vain yksi muoto',
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
      claim: 'Paikkasanojen aktiivinen harjoittelu kehittää avaruudellista kielen ymmärtämistä, joka on yhteydessä matemaattiseen ja tieteelliseen ajatteluun.',
      source: 'Silvén, M. et al., "Kielen ja avaruudellisen ajattelun yhteydet varhaiskasvatuksessa," Turun yliopisto',
    },
    {
      claim: 'Visuaaliset paikkasanatehtävät rakentavat avaruudellisen kognition perustaa, joka tukee kartanluvun, geometrian ja avaruudellisen päättelyn kehittymistä.',
      source: 'Aunio, P. & Räsänen, P., "Avaruudellinen kognitio ja matemaattiset taidot," Niilo Mäki Instituutti',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Paikkasanatehtavat ovat korvaamattomia S2-opetuksessa. Kuvat havainnollistavat paikkasanojen merkityksen konkreettisesti ilman kaannosta. Oppilaat ymmartavat nopeasti eron paalla ja alla, edessa ja takana kuvien avulla.',
      name: 'Arja Toivola',
      role: 'S2-opettaja',
      school: 'Kallion koulu, Helsinki',
    },
    {
      quote: 'Kaytan prepositiotehtavia esiopetuksessa viikoittain. Lapset oppivat paikkasanoja leikkien kautta ja tehtavat vahvistavat oppimista. Saadettava paikkasanojen maara tekee eriyttamisesta helppoa eri-ikaisille lapsille.',
      name: 'Raimo Järvinen',
      role: 'Esiopetuksen opettaja',
      school: 'Koivukujan päiväkoti, Lahti',
    },
  ],

  tips: {
    sectionTitle: 'Paikkasanastrategiat luokka-asteittain',
    sectionDescription: 'Säädä prepositiogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset paikkasanojen määrän, tehtävämuodon ja monimutkaisuuden esikoulusta toiseen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Kaksi paikkasanaa visuaalisesti',
        description: 'Kaytta kahtaa paikkasanaa (paalla, alla) selvilla kuvilla. Esikoululaiset tunnistavat sijainnin kuvia katsomalla. Yksinkertainen muoto rakentaa avaruudellisen sanaston perustaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Neljä paikkasanaa ja ympyröintitehtävät',
        description: 'Luo tehtavia neljalla paikkasanalla (paalla, alla, edessa, takana) ympyrointitehtavina. Esiopetuksen oppilaat kehittavat avaruudellista sanastoa kuvia analysoimalla. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Kuusi paikkasanaa lauseissa',
        description: 'Generoi tehtavia kuudella paikkasanalla (lisa: vieressa, valissa). Ekaluokkalaiset kayttavat paikkasanoja lauseissa ja tunnistavat sijainnin monipuolisemmin. Kehittaa kirjallista ilmaisua.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Kaikki kahdeksan paikkasanaa',
        description: 'Luo tehtavia kaikilla kahdeksalla paikkasanalla (lisa: sisalla, ulkona). Toisluokkalaiset hallitsevat kaikki paikkasanat ja kayttavat niita monipuolisissa lauseissa. Vahvistaa avaruudellista sanastoa.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Soveltavat paikkasanatehtävät',
        description: 'Kaytta kaikkia paikkasanoja soveltavissa tehtavissa. Kolmasluokkalaiset kirjoittavat omia lauseita paikkasanoilla ja kuvaavat monimutkaisia sijaintisuhteita. Tukee kielellista kehitysta.',
      },
    ],
  },
};

export default prepositionsFiContent;
