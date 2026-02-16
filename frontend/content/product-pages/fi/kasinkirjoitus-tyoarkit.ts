import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - Finnish Content (Käsinkirjoitus Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kasinkirjoitus-tyoarkit.ts
 * URL: /fi/apps/kasinkirjoitus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const writingFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kasinkirjoitus-tyoarkit',
    appId: 'writing',
    title: 'Käsinkirjoitus Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia käsinkirjoituksen harjoittelutehtäviä. Kirjainten muodostus, sanan kirjoittaminen ja kynäote esikoulusta 2. luokalle. Ilmainen PDF.',
    keywords: 'käsinkirjoitus harjoittelu, kirjaimet harjoittelu esikoulu, kirjainten muodostus, kynäote harjoittelu, kirjoittamisen harjoittelu, kirjainharjoitukset tulostettava, hienomotoriikka kirjoittaminen, aakkosten kirjoittaminen, käsinkirjoitus tulostettava, kirjoitusvalmiudet esikoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kasinkirjoitus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish writing.md
  hero: {
    title: 'Käsinkirjoituksen Generaattori',
    subtitle: 'Kirjainten ja Sanojen Kirjoitusharjoituksia Esikoulusta 2. Luokalle',
    description: `Luo ammattitasoisia käsinkirjoituksen harjoittelutehtäviä kirjainten harjoitteluun esiopetuksessa. Täysi Pääsy -tilaus antaa sinulle rajattoman määrän käsinkirjoitustehtävien luomista ilman tehtäväkohtaisia maksuja. Generoi tulostettavia tehtäviä lapsille alakouluun ja esiopetukseen. Lataa korkealaatuisia PDF-tehtäviä alle kolmessa minuutissa.

Käsinkirjoituksen generaattori auttaa opettajia luomaan personoituja hienomotoriikka harjoituksia. Valitse viidestä kirjasintyylistä mukaan lukien kursiivi. Luo jäljennöstehtäviä kirjainten oppimiseen. Jokainen tehtävä ladataan tulostettavana PDF- tai JPEG-tiedostona.

Täysi Pääsy -tilaus sisältää kaikki 33 tehtävägeneraattoria. Käsinkirjoituksen harjoittelutehtävät täydentävät matematiikka tehtäviä alakouluun ja lukemaan oppiminen tehtäviä. Yhdistä eri tehtävätyypit kokonaisiksi oppimispaketeiksi. Luo esiopetus materiaali ilmaiseksi ilman tehtäväkohtaisia lisämaksuja.

Generaattori toimii 11 kielellä mukaan lukien suomi. Kaikki käyttöliittymän tekstit ja ohjeet suomeksi. Ihanteellinen suomalaisille opettajille ja vanhemmille. Lataa ammattitasoisia 300 DPI -tehtäviä kotitulostimella tulostettavaksi.`,
    previewImageSrc: '/samples/finnish/writing/sample-1.jpeg',
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
        videoId: '0b4WglqyXu0',
        buttonText: 'Kirjoitus Toiminnot',
        modalTitle: 'Kirjoitus Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävä',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish writing.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Käsinkirjoituksen harjoittelutyökalu tarjoaa kaiken tarvittavan ammattitasoisten tehtävien luomiseen. Valitse viidestä eri kirjasintyylistä. Luo jäljennös-, haalistuva jäljennös- tai ohjattu kopiointirivejä. Jokainen ominaisuus on suunniteltu nopeuttamaan tehtävien luomista ja säästämään opettajien aikaa.',
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

  // How-To Guide - FULL text from Finnish writing.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattitasoisia käsinkirjoitustehtäviä alle kolmessa minuutissa. Ei teknisiä taitoja tarvita. Ei monimutkaisia muotoiluohjelmia. Viisi yksinkertaista vaihetta alusta valmiiseen tehtävään. Jokainen vaihe on selkeä ja helppo seurata.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Käsinkirjoitustehtäväsi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Kirjainharjoitteluun - Hienomotoriikka Harjoitukset Esiopetukseen ja Alakouluun',
        description: `Aloita valitsemalla mitä lapset harjoittelevat. Kirjoita harjoiteltava teksti tekstikenttään. Voit kirjoittaa yksittäisiä kirjaimia, sanoja tai kokonaisia lauseita. Generaattori tukee kaikkia suomen aakkosia mukaan lukien ä ja ö.

Valitse rivityyppi oppilaan taitotason mukaan. Trace-rivit sopivat aloittelijoille täydellisesti. Täydet kirjaimet näkyvät jäljennettäväksi. Lapsi piirtää suoraan kirjainten päälle oppiakseen muodot.

Fading Trace -rivit sopivat edistyneemmille oppilaille. Ensimmäiset kirjaimet ovat täysiä. Seuraavat kirjaimet haalentuvat asteittain. Viimeiset kirjaimet ovat lähes näkymättömiä. Tämä asteittainen siirtymä tukee itsenäistä kirjoittamista.

Guided Copy -rivit ovat edistyneimmille. Ensimmäinen kirjain näkyy täytenä esimerkkinä. Loput rivistä ovat tyhjiä viivoja. Lapsi kopioi esimerkkikirjaimen itsenäisesti. Täydellinen itsenäisen kirjoittamisen harjoitteluun.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Esiopetus Materiaali Ilmainen ja Lukemaan Oppiminen Tehtävät',
        description: `Valitse sivun koko valikosta. Letter Portrait on standardi Yhdysvalloissa. A4 Portrait on standardi Euroopassa mukaan lukien Suomi. Landscape-vaihtoehdot sopivat leveämmille asetteluille. Valitse koko joka sopii tulostimeesi parhaiten.

Lisää taustateema halutessasi visuaalista kiinnostavuutta. Teemakirjasto sisältää satoja vaihtoehtoja. Vuodenajat, eläimet, ruoka ja paljon muuta. Tausta tekee tehtävästä houkuttelevamman lapsille.

Säädä taustan läpinäkyvyyttä liukusäätimellä. Täysi läpinäkyvyys tarkoittaa ei taustaa. Matala läpinäkyvyys näyttää vain himmean kuvion. Korkea läpinäkyvyys tekee taustasta näkyvän. Löydä täydellinen tasapaino luettavuuden ja visuaalisen kiinnostuksen välille.

Lisää kuva tehtävän yläosaan halutessasi. Kuva voi liittyä harjoiteltavaan sanaan. Jos harjoittelet sanaa "kissa", lisää kissakuva. Visuaalinen yhteys auttaa oppimista. Lapset yhdistävät sanan ja kuvan.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä Välittömästi - Tulostettavat Tehtävät Lapsille Ilmainen Esikatselutyökalu',
        description: `Kun olet valinnut sisällön ja asetukset, klikkaa generoi. Tehtävä ilmestyy välittömästi esikatseluun. Ei odotusaikoja tai lataamisia. Kaikki renderöinti tapahtuu selaimessasi välittömästi.

Esikatselu näyttää täsmälleen miltä tulostettu tehtävä näyttää. Zoomaa lähemmäs tarkistaaksesi yksityiskohdat. Tarkista että kirjaimet ovat selkeitä. Varmista että rivit ovat oikein sijoitettuja. Katso että kuvat ja taustat näyttävät hyvältä.

Jos jokin ei näytä oikealta, ei hätää. Palaa asetuksiin ja muuta. Muuta rivityyppiä tai kirjasintyyliä. Vaihda taustaa tai reunaa. Generoi uudelleen välittömästi. Kokeile eri vaihtoehtoja kunnes tehtävä on täydellinen.

Generaattori muistaa asetuksesi. Kun luot toisen tehtävän, samat asetukset ovat valmiina. Tämä nopeuttaa työnkulkua merkittävästi. Muuta vain harjoiteltavaa tekstiä. Pidä samat kirjasintyylit ja taustat. Luo sarja yhtenäisiä tehtäviä nopeasti.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Hienomotoriikka Harjoitukset ja Kirjaimet Harjoittelu Esikoulu Personointi',
        description: `Generoidun tehtävän jälkeen avautuu muokkaustyökalu. Kaikki tehtävän elementit ovat muokattavissa. Klikkaa mitä tahansa objektia valitaksesi sen. Valittu objekti näyttää kahvat ja reunat.

Siirrä objekteja hiirellä. Klikkaa ja vedä kuvaa uuteen paikkaan. Siirrä käsinkirjoitusrivejä ylös tai alas. Järjestä elementit täydelliseen asetteluun. Vedä ja pudota toimii välittömästi ja sujuvasti.

Muuta objektien kokoa vetämällä kulmista. Tee kuva suuremmaksi tai pienemmäksi. Sovita kuva täydellisesti tehtävään. Säilytä mittasuhteet automaattisesti. Tai venytä vapaasti tarvittaessa.

Lisää tekstiobjekteja otsikoiksi tai ohjeiksi. Kirjoita "Harjoittele kirjain A". Tai "Jäljennä huolellisesti". Valitse fontti ja fonttikoko. Muuta tekstin väriä. Lisää ääriviivat korostukseen. Jokainen teksti erikseen muokattavissa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Kirjaimet Harjoittelu Esikoulu PDF-tiedostot ja JPEG-vaihtoehdot',
        description: `Kun tehtävä on valmis, klikkaa lataa-painiketta. Valitse PDF tai JPEG muoto. PDF säilyttää täydellisen laadun vektoreille. JPEG toimii useimmissa sovelluksissa. Molemmat muodot ovat 300 DPI laadukkaita.

Harmaasävyvaihtoehto säästää mustetta tulostuksessa. Valitse harmaasävy ennen lataamista. Kaikki värit muunnetaan automaattisesti mustavalkoisiksi. Säästä jopa 70% värimustekuluissa. Ihanteellinen päivittäiseen luokkahuonekäyttöön.

Lataus alkaa välittömästi. Tiedosto tallentuu latauskansioosi. Avaa tiedosto ja tulosta. Toimii kaikilla tavallisilla kotitulostimilla. Ei erikoispainolaitteita tarvita. Normaali A4-paperi toimii täydellisesti.

Tallenna tiedosto tietokoneellesi myöhempää käyttöä varten. Luo tehtäväpankki suosikkitehtävistäsi. Tulosta sama tehtävä uudelleen milloin tahansa. Jaa tehtävät kollegoiden kanssa. Rakenna kattava käsinkirjoitusohjelma vuodeksi eteenpäin.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish writing.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Käsinkirjoitusgeneraattori palvelee laajaa käyttäjäkuntaa. Esiopetuksen opettajat luovat kirjainten tunnistusharjoituksia. Alakoulun opettajat rakentavat kirjoitustaidon ohjelmia. Kotiopettajat personoivat opetusmateriaalit. Jokainen käyttäjäryhmä hyötyy eri tavalla työkalusta.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from Finnish writing.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset käsinkirjoitusgeneraattorista ja tulostettavista tehtävistä.',
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
    title: 'Täysi Pääsy',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton käsinkirjoitustehtävien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Kaikki 33 tehtävägeneraattoria sisältyy',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä käsinkirjoitustehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Ammattimaisia Käsinkirjoitustehtäviä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattitasoisia käsinkirjoitustehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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

export default writingFiContent;
