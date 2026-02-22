import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - Finnish Content (Etsi Esineet -tehtävät)
 *
 * File: frontend/content/product-pages/fi/etsi-esineet-tyoarkit.ts
 * URL: /fi/apps/etsi-esineet-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/find-objects.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Pääsy)
 */

export const findObjectsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'etsi-esineet-tyoarkit',
    appId: 'find-objects',
    title: 'Etsi Esineet Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia etsintätehtäviä lapsille. Etsi piilotetut esineet kuvista ja kehitä visuaalista havainnointia. 50 teemaa esikoulusta 3. luokalle.',
    keywords: 'etsi esineet generaattori, piilotetut esineet tehtävä, visuaalinen etsintätehtävä, tarkkaavaisuusharjoitus lapset, yksityiskohtien löytäminen, keskittyminen kuvatehtävä, silmän liikkeen harjoitus, havainnointitaito kehittäminen, etsimispeli tulostettava, visuaalinen skannaus, esineiden tunnistamispeli, etsi esineet tehtävät, piilokuva tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/etsi-esineet-tyoarkit',
  },

  // Hero Section - FULL text from Finnish find-objects.md
  hero: {
    title: 'Etsi Esineet Tehtävien Generaattori',
    subtitle: 'Visuaalisen Havainnoinnin Harjoituksia 50 Teemalla',
    description: `Luo ammattimaisia etsintätehtäviä Find Objects -työkalumallamme. Täysi Pääsy -tilauksesi antaa sinulle rajoittamattoman tehtävien luomisen ilman maksua tehtävää kohden. Generoi mukautettuja tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle 3 minuutissa.

Find Objects -generaattorimme luo kaksi erityyppistä visuaalista havainnointi tehtävää. I Spy -tilassa lapset etsivät 1-5 kätkettyä esinettä 8-12 häiritsevan kuvan joukosta. Odd One Out -tilassa lapset löytävät parittomat kuvat 8-12 kuvaparrin joukosta. Molemmat toiminnot kehittävät visuaalista havainnointia ja tarkkaavaisuustaitoja.

Työkalumme sisältää yli 3000 lapsille sopivaa kuvaa 11 kielellä. Kuvien tiedostonimet ovat suomeksi, mikä tekee työkalusta erinomaisen kieltenoppimiseen. Täysi Pääsy -tilauksesi sisältää kaupallisen lisenssin, 11 kielen tuen ja ammattimaisen 300 DPI laadun. Luo tulostettavat tehtävät lapsille ilmainen hakusanalla, mutta Täysi Pääsy -tilaus antaa rajattomat mahdollisuudet.`,
    previewImageSrc: '/samples/finnish/find objects/sample-1.jpeg',
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
        videoId: '8Y3jrVr1Phs',
        buttonText: 'Etsi Esineet Toiminnot',
        modalTitle: 'Etsi Esineet Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/find objects/
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

  // Features Grid - FULL text from Finnish find-objects.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Find Objects -generaattorimme tarjoaa kaikki työkalut, joita tarvitset ammattimaisten hienomotoriikka harjoitusten ja visuaalisen havainnointitehtävien luomiseen. Tilauksesi sisältää kaikki nämä premium-ominaisuudet ilman lisämaksuja.',
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

  // How-To Guide - FULL text from Finnish find-objects.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Find Objects -generaattorimme tekee ammattimaisten havainnointitehtävien luomisesta nopeaa ja helppoa. Koko prosessi alusta lataukseen kestää alle 3 minuuttia. Ei suunnittelutaitoja tai teknistä osaamista tarvita. Seuraa näitä viittä vaihetta luodaksesi täydellisiä esiopetus materiaali ilmainen -tehtäviä.',
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
        title: 'Valitse Toimintatila - Esiopetus Materiaali Ilmainen Hienomotoriikka Harjoitukset',
        description: `Valitse ensin I Spy tai Odd One Out -tila yhdellä klikkauksella. I Spy -tila luo klassisia etsintätehtäviä, joissa oppilaat etsivät kätketyt esineet. Odd One Out -tila luo parittomuustehtäviä, joissa oppilaat löytävät parittomat kuvat.

I Spy sopii täydellisesti visuaalisen havainnointikyvyn kehittämiseen. Lapset oppivat keskittymään ja skannaamaan kuvia järjestelmällisesti. Sopii esiopetus materiaali ilmainen -paketteihin ja hienomotoriikka harjoitukset -kokonaisuuksiin.

Odd One Out kehittää luokittelutaitoja ja loogista ajattelua. Oppilaat vertaavat kuvia ja tunnistavat samankaltaisuudet ja erot. Yhdistä matematiikka tehtävät alakoulu -opetukseen. Molemmat tilat ovat yhtä helppoja käyttää.`,
        icon: '🎯',
      },
      {
        id: '2',
        number: 2,
        title: 'Valitse Kuvat Tehtävään - Värityskuvia Lapsille Tulostettava',
        description: `Valitse kuvat kolmella tavalla. Ensinnäkin valitse teema ja generaattori täyttää kuvat automaattisesti. Toiseksi selaa kuvakirjastoa ja klikkaa yksittäisiä kuvia. Kolmanneksi lataa omia kuvia tietokoneeltasi.

I Spy -tilassa valitse 8-12 häiritsevää kuvaa ja 1-5 kätkettyä esinettä. Enemmän häiritseviä kuvia tekee tehtävästä vaikeamman. Vähemmän kuvia sopii nuoremmille lapsille. Täydellinen joustavuus vaikeustason säätämiseen.

Odd One Out -tilassa valitse 8-12 kuvapaaria ja 1-3 paritonta kuvaa. Kuvakirjastossamme on yli 3000 kuvaa teemoittain. Yhdistä värityskuvia lapsille tulostettava -toimintoon. Lataa omia luokkahuonekuvia personoidaksesi tehtävät.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Mukauta Asetukset - Matematiikka Tehtävät Alakoulu Pisteestä Pisteeseen Tehtävät',
        description: `Valitse sivun koko tarpeidesi mukaan. Letter Portrait tai Landscape amerikkalaista tulostusta varten. A4 Portrait tai Landscape eurooppalaisiin tulostimiin. Custom-koko antaa täyden vapauden.

Valitse taustateema tai käytä yksivärisiä taustoja. Säädä taustan läpinäkyvyyttä täydellisen ulkonäön saavuttamiseksi. Lisää reunateemoja dekoratiivisuuden lisäämiseksi. Kaikki teemat sisältyvät tilaukseen.

Lisää tekstiä ohjeita varten. Muokkaa fonttia, kokoa ja väriä. Lisää nimi- ja päivämääräkentät oppilaille. Luo matematiikka tehtävät alakoulu -paketteja ja pisteestä pisteeseen tehtävät -kokonaisuuksia. Kaikki asetukset tallentuvat automaattisesti.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Generoi ja Muokkaa - Tulostettavat Tehtävät Lapsille Ilmainen Lukemaan Oppiminen Tehtävät',
        description: `Klikkaa Create-nappia generoidaksesi tehtävän välittömästi. Generaattori asettaa kuvat automaattisesti sivulle luonnollisessa asetelmassa. Esikatselu näkyy heti kankaalla. Vastausavain luodaan automaattisesti.

Muokkaa mitä tahansa elementtiä kankaalla klikkauksella. Vedä kuvia uusiin paikkoihin. Kierrä esineitä parempaan kulmaan. Skaalaa kuvia suuremmiksi tai pienemmiksi. Lukitse elementit kun olet tyytyväinen.

Lisää lisätekstiä tarpeen mukaan. Muuta värejä ja tyylejä. Kohdista elementit toisiinsa nähden. Luo tulostettavat tehtävät lapsille ilmainen -materiaaleja ja lukemaan oppiminen tehtävät -paketteja. Kaikki muutokset tapahtuvat reaaliajassa.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Yhteenlasku ja Vähennyslasku Tehtävät Kertotaulut Tulostettava',
        description: `Valitse latausformaatti tarpeidesi mukaan. JPEG nopeaan jakamiseen ja tulostukseen. PDF täydelliseen laatuun ja ammattimaisen julkaisun. Molemmat formaatit ovat 300 DPI -laatua.

Lataa tehtävä ja vastausavain erikseen. Tulosta molemmat tai vain toinen. Harmaasävy-vaihtoehto säästää mustetta kotitulostuksessa. Väritulostus antaa elävämmän ilmeen.

Tulosta tehtävät kotona tai kopiokeskuksessa. Myy ne Teachers Pay Teachers tai Etsy -alustoilla. Yhdistä yhteenlasku ja vähennyslasku tehtävät ja kertotaulut tulostettava -materiaalit. Täysi Pääsy -lisenssi kattaa kaupallisen käytön.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish find-objects.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Find Objects -generaattori palvelee laajaa käyttäjäkuntaa esiopetuksen opettajista kotiopettajiin. Jokainen käyttäjäryhmä hyötyy eri tavalla työkalun monipuolisuudesta. Täysi Pääsy -tilaus antaa kaikille pääsyn kaikkiin ominaisuuksiin ja kaupalliseen lisenssiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from Finnish find-objects.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä - Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Find Objects -generaattorista kysytään usein samoja kysymyksiä. Tässä osiossa vastataan 12 yleisimpään kysymykseen. Täysi Pääsy -tilaus antaa pääsyn kaikkiin ominaisuuksiin ja kaupalliseen lisenssiin.',
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
    sectionDescription: 'LessonCraft Studio tarjoaa 33 työkalua opettajille. Yhdistä Find Objects -etsintätehtävät muihin työkaluihin luodaksesi täydellisiä oppimispaketteja. Täysi Pääsy -tilaus antaa pääsyn kaikkiin työkaluihin yhteen hintaan.',
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

export default findObjectsFiContent;
