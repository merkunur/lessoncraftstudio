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
    items: [
      {
        id: '1',
        icon: '🔎',
        title: 'I Spy -etsintätila kätketyillä esineillä',
        description: 'I Spy -tila luo etsintätehtäviä, joissa 1–5 kohdetta on piilotettu 8–12 häiritsevän kuvan joukkoon. Oppilaat skannaavat kuvaa järjestelmällisesti tunnistaakseen piilokuvat. Kehittää visuaalista tarkkaavaisuutta ja keskittymiskykyä.',
      },
      {
        id: '2',
        icon: '❓',
        title: 'Odd One Out -poikkeava kuva -tila',
        description: 'Odd One Out -tila luo tehtäviä, joissa oppilaat tunnistavat kuvan, joka ei kuulu joukkoon. 8–12 kuvaparista 1–3 on parittomia. Kehittää luokittelutaitoja ja loogista ajattelua.',
      },
      {
        id: '3',
        icon: '⚙️',
        title: 'Säädettävä vaikeustaso',
        description: 'Kontrolloi vaikeustasoa häiritsevien kuvien ja kohteiden määrällä. Vähemmän kuvia ja kohdetta sopii nuoremmille lapsille. Enemmän kuvia ja kohteita haastaa vanhempia oppilaita. Säädä täydellisesti oppilaiden taitotason mukaan.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa etsintätehtäviin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta etsintätehtävien luomiseen. Eläimet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Teemavalinnat täyttävät kuvat automaattisesti.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen etsintätehtävä generoi automaattisesti vastausavaimen, jossa oikeat kohteet on korostettu. Opettajat tarkistavat oppilastöitä sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää omaa tekstiä, valitse fontteja ja värejä. Lataa taustakuvia ammattimaiseen lopputulokseen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä etsintätehtäviä verkossa. Luo temaattisia etsintäpaketteja myytäväksi opettajakauppoihin. Ei attribuutiovaatimuksia eikä lisämaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo etsintätehtäviä 11 kielellä. Käyttöliittymä ja kuvien nimet kääntyvät valitulle kielelle. Täydellinen monikielisille luokkahuoneille ja S2-opetukseen.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Visuaalisen havainnointikyvyn kehittäminen 5–6-vuotiaille',
        description: 'Luo yksinkertaisia I Spy -tehtäviä vähäisellä häiritsevien kuvien määrällä. Esiopetuksen oppilaat harjoittelevat visuaalista skannausta ja yksityiskohtien havainnointia. Tukee POPS 2014 tarkkaavaisuustaitojen kehittämistä.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Keskittymisharjoituksia 1.–3. luokalle',
        description: 'Generoi monimutkaisia etsintätehtäviä useammilla kohteilla ja häiritsevillä kuvilla. Oppilaat kehittävät pitkäjänteistä tarkkaavaisuutta ja järjestelmällistä etsintästrategiaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja etsintäharjoituksia kotiin',
        description: 'Luo temaattisia etsintätehtäviä lasten suosikkiaiheilla. Eläin- ja kulkuneuvoteemat pitävät lapset motivoituneina. Generoi viikon tehtävät nopeasti eri vaikeustasoin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Sanastoharjoittelua visuaalisella etsinnällä',
        description: 'Etsintätehtävät tarjoavat sanastoaltistusta kuvapohjaisesti. Oppilaat oppivat uusia sanoja tunnistaessaan kuvia. 11 kielen tuki mahdollistaa monikielisen opetuksen saumattomasti.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävä tarkkaavaisuusharjoittelu',
        description: 'Säädä kohteiden ja häiritsevien kuvien määrää HOJKS-tavoitteiden mukaisesti. Vähän kuvia tukee heikompia oppilaita. Etsintätehtävät kehittävät visuaalista tarkkaavaisuutta oppimisen tuen piirissä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy etsintäpaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia etsintäkokoelmia myytäväksi verkossa. I Spy -paketit ovat jatkuvasti suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        question: 'Miten etsintätehtävägeneraattori toimii?',
        answer: 'Generaattori luo kohtauksia, joissa kohde-esineet on piilotettu häiritsevien kuvien joukkoon. Valitse I Spy tai Odd One Out -tila, määritä kuvien määrä ja valitse teema. Generaattori luo valmiin tehtävän vastausavaimineen sekunneissa.',
      },
      {
        id: '2',
        question: 'Mitkä toimintatilat ovat saatavilla?',
        answer: 'Kaksi tilaa: I Spy luo etsintätehtäviä, joissa oppilaat etsivät piilotettuja esineitä. Odd One Out luo tehtäviä, joissa oppilaat tunnistavat joukkoon kuulumattoman kuvan. Molemmat kehittävät visuaalista havainnointia.',
      },
      {
        id: '3',
        question: 'Kuinka monta kohdetta ja häiritsevää kuvaa voi olla?',
        answer: 'I Spy -tilassa valitse 1–5 piilotettua kohdetta ja 8–12 häiritsevää kuvaa. Odd One Out -tilassa valitse 8–12 kuvapaaria ja 1–3 paritonta kuvaa. Säädä määriä vaikeustason mukaan.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen etsintätehtävä generoi automaattisesti vastausavaimen. Oikeat kohteet korostetaan selkeästi. Opettajat voivat tulostaa vastausavaimen erikseen tai näyttää sen dokumenttikameralla.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille etsintätehtävät sopivat?',
        answer: 'Etsintätehtävät palvelevat 4–10-vuotiaita. Esikoululaiset etsivät yksinkertaisia kohteita vähäisellä häirinnillä. 1.–3. luokan oppilaat ratkaisevat monimutkaisempia kohtauksia useilla kohteilla.',
      },
      {
        id: '6',
        question: 'Miten etsintätehtävät tukevat oppimista?',
        answer: 'Etsintätehtävät kehittävät visuaalista tarkkaavaisuutta, järjestelmällistä etsintästrategiaa ja keskittymiskykyä. Odd One Out -tila kehittää luokittelutaitoja ja loogista ajattelua.',
      },
      {
        id: '7',
        question: 'Voiko etsintätehtäviä luoda useilla kielillä?',
        answer: 'Generaattori luo tehtäviä 11 kielellä mukaan lukien suomi, ruotsi, norja, tanska ja englanti. Kuvien nimet ja käyttöliittymä vaihdetaan valitun kielen mukaisesti.',
      },
      {
        id: '8',
        question: 'Miten tulostan etsintätehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Kaikki tehtävät tulostuvat ammattimaisesti.',
      },
      {
        id: '9',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa. Käytä luokkavalokuvia tai oppilaiden piirustuksia.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden etsintätehtävän luominen vie alle 3 minuuttia. Valitse tila ja kuvat 30 sekunnissa. Generaattori rakentaa tehtävän välittömästi. Viikon tehtävät valmistuvat 15 minuutissa.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani etsintätehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin etsintätehtävien myyntiin verkossa. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja.',
      },
      {
        id: '12',
        question: 'Miten etsintätehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Etsintätehtävät tukevat tarkkaavaisuuden, visuaalisen havainnointikyvyn ja keskittymisen kehittämistä. POPS 2014 korostaa sisäistä motivaatiota ja monipuolisia oppimistapoja. Etsintätehtävät toteuttavat molempia tavoitteita.',
      },
    ]
    
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
    items: [
      {
        id: '1',
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske yhdistää visuaalisen etsinnän ja laskemisen. Täydentää etsintätehtäviä matemaattisella ulottuvuudella.',
      },
      {
        id: '2',
        slug: 'varjoyhdistely-tyoarkit',
        name: 'Varjoyhdistely',
        category: 'Hahmottaminen',
        icon: '👻',
        description: 'Varjoyhdistely kehittää visuaalista erottelua tunnistamalla kuvan varjon. Täydentää etsintätehtäviä hahmottamisharjoituksilla.',
      },
      {
        id: '3',
        slug: 'poikkea-joukosta-tyoarkit',
        name: 'Poikkea joukosta',
        category: 'Logiikka',
        icon: '🧠',
        description: 'Poikkea joukosta -tehtävät laajentavat Odd One Out -tilan konseptia eri muotoihin. Yhdistä molemmat luokittelutaitojen kehittämiseen.',
      },
      {
        id: '4',
        slug: 'kuvalajittelu-tyoarkit',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📋',
        description: 'Kuvalajittelu kehittää luokittelutaitoja, jotka tukevat etsintätehtävien vaatimaa kategorisointia. Yhdistä monipuolisiin ajatteluharjoituksiin.',
      },
      {
        id: '5',
        slug: 'kuva-bingo-tyoarkit',
        name: 'Kuvabingo',
        category: 'Sanasto',
        icon: '🎲',
        description: 'Kuvabingo yhdistää kuvan tunnistamisen pelimuotoon. Etsintätehtävät ja bingo kehittävät molemmat visuaalista tarkkaavaisuutta.',
      },
      {
        id: '6',
        slug: 'kuvapolku-tyoarkit',
        name: 'Kuvapolku',
        category: 'Hahmottaminen',
        icon: '🛤️',
        description: 'Kuvapolkutehtävät kehittävät visuaalista seurantaa ja polun löytämistä. Yhdistä etsintätehtävien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 176) ------------------------------------

  aiOverviewSnippet: 'Etsi esineet -generaattori on verkkotyokalu, jolla luodaan tulostettavia visuaalisen havainnoinnin tehtavia esiopetukseen ja alakouluun. I Spy -tila piilottaa esineet hairitsevien kuvien joukkoon, Odd One Out -tila haastaa tunnistamaan joukkoon kuulumattoman kuvan. Opettajat valitsevat tilan, kuvat ja vaikeustason, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Toimintatilat',
      ourApp: '2 tilaa: I Spy ja Odd One Out',
      typical: 'Vain yksi etsintätyyppi',
    },
    {
      feature: 'Kuvakirjasto',
      ourApp: '3000+ teemakuvaa 50 teemasta',
      typical: 'Rajallinen kuvavalinta',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen tai lisämaksullinen',
    },
    {
      feature: 'Vaikeustason säätö',
      ourApp: 'Kohteiden ja häiritsevien kuvien määrä säädettävissä',
      typical: 'Kiinteä vaikeustaso',
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
      claim: 'Visuaalisen etsinnän tehtävät kehittävät pitkäjänteistä tarkkaavaisuutta ja järjestelmällistä skannausta, jotka ovat lukemisen ja oppimisen perusedellytyksiä varhaiskasvatusikäisillä.',
      source: 'Ahonen, T. et al., "Tarkkaavaisuuden ja oppimisen yhteydet," Niilo Mäki Instituutti',
    },
    {
      claim: 'Kuvapohjaisten etsintätehtävien säännöllinen harjoittelu parantaa visuaalista erottelukykyä ja yksityiskohtien havainnointia, jotka tukevat kirjainten tunnistamista ja lukutaidon kehittymistä.',
      source: 'Holopainen, L., "Visuaalisen havainnoinnin merkitys lukemaan oppimisessa," Jyväskylän yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'I Spy -tehtavat ovat ehdottomasti luokkani suosikkeja. Lapset keskittyvat etsintaan pitkaan ja kehittavat samalla visuaalista havainnointia. Odd One Out -tila on loistava loogisen ajattelun kehittamiseen.',
      name: 'Johanna Väisänen',
      role: '1. luokan opettaja',
      school: 'Puistolan koulu, Kuopio',
    },
    {
      quote: 'Kaytan etsintatehtavia aamutyoskentelyssa ja odotusaikoina. Oppilaani ovat oppineet skannaamaan kuvia jarjestelmallisesti eivatkaa enaa katsele satunnaisesti. Tama taito siirtyy lukemiseenkin.',
      name: 'Heikki Leppänen',
      role: 'Erityisopettaja',
      school: 'Keski-Suomen sairaanhoitopiiri, Jyväskylä',
    },
  ],

  tips: {
    sectionTitle: 'Etsintästrategiat luokka-asteittain',
    sectionDescription: 'Säädä etsintätehtävägeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset tilan, kohteiden määrän ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Yksinkertaiset etsintätehtävät',
        description: 'Kaytta I Spy -tilaa yhdella kohteella ja 6-8 hairitsevalla kuvalla. Esikoululaiset harjoittelevat kuvan tunnistamista ja visuaalista skannausta. Yksinkertainen muoto rakentaa tarkkaavaisuuden perustaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Teemapohjaiset etsintähaasteet',
        description: 'Luo I Spy -tehtavia 2-3 kohteella ja 8-10 hairitsevalla kuvalla. Esiopetuksen oppilaat kehittavat jarjestelmallista etsintastrategiaa. Lisa Odd One Out -tehtavia luokittelutaitojen tukemiseen POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Monimutkaisemmat kohtaukset',
        description: 'Generoi I Spy -tehtavia 3-4 kohteella ja 10-12 hairitsevalla kuvalla. Ekaluokkalaiset kehittavat pitkajanteista tarkkaavaisuutta ja visuaalista erottelua. Odd One Out haastaa luokittelutaitoja.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Haastavat etsintäpulmat',
        description: 'Luo molempia tiloja 4-5 kohteella tai 3 parittomalla kuvalla. Toisluokkalaiset hioivat visuaalista analysointia ja loogista paattelya. Tehtavat kehittavat systemaattista ajattelua.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monipuoliset visuaaliset haasteet',
        description: 'Kaytta molempia tiloja maksimaalisilla kuvamaarilla. Kolmasluokkalaiset harjoittelevat vaativaa visuaalista analysointia ja luokittelua. Kaytta tehtavia laaja-alaisen osaamisen kehittamiseen.',
      },
    ],
  },
};

export default findObjectsFiContent;
