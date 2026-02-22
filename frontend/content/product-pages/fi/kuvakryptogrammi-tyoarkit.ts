import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Cryptogram Worksheets - Finnish Content (Kuvakryptogrammi Generaattori)
 *
 * File: frontend/content/product-pages/fi/kuvakryptogrammi-tyoarkit.ts
 * URL: /fi/apps/kuvakryptogrammi-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - All UI labels in Finnish
 */

export const cryptogramFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvakryptogrammi-tyoarkit',
    appId: 'cryptogram',
    title: 'Kuvakryptogrammi Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Kehittää dekoodaustaitoja ja lukemisvalmiutta. Esikoulusta 3. luokalle.',
    keywords: 'kuvakryptogrammi generaattori, salakirjoitus lapsille, koodipulma oppiminen, symbolikirjoitus harjoitus, koodinpurkaminen lukutaito, looginen kielitehtävä, visuaalinen koodaus, dekoodaus lukeminen, kirjaintunnistus pulmalla, koodisanasto harjoitus, ajattelutaito kehittäminen, kuvakryptogrammi tehtävät, dekoodaus tehtävä',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvakryptogrammi-tyoarkit',
  },

  // Hero Section - FULL text from Finnish cryptogram.md
  hero: {
    title: 'Kuvakryptogrammi Generaattori',
    subtitle: 'Salakirjoitustehtäviä Kuvilla — Dekoodaa ja Opi Lukemaan',
    description: `Luo ammattimaisia kuvakryptogrammi-tehtäviä, joissa kirjaimet korvataan kuvilla. Täysi Käyttöoikeus -tilauksesi antaa rajattoman kryptogrammi-tehtävien luonnin ilman ylimääräisiä maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille, jotka ovat täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Kuvakryptogrammit yhdistävät kirjainten harjoittelun ja ongelmanratkaisun. Oppilaat purkavat salatun viestin tunnistamalla, mikä kuva edustaa mitäkin kirjainta. Täydellinen lukemaan oppimisen tehtäville ja kirjainten tunnistuksen harjoittelulle.

Tehtävägeneraattori toimii 11 kielellä. Valitse esiopetus materiaali ja matematiikka tehtävät alakouluun suomeksi. Luo värityskuvia lapsille tulostettavia ja yhteenlasku ja vähennyslasku tehtäviä samalla alustalla. Jokainen kryptogrammitehtävä sisältää sekä tehtävän että vastausavaimen.`,
    previewImageSrc: '/samples/finnish/cryptogram/sample-1.jpeg',
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
        videoId: '9U0BIIjCnco',
        buttonText: 'Kuvakryptogrammi Toiminnot',
        modalTitle: 'Kuvakryptogrammi Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
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

  // Features Grid - FULL text from Finnish cryptogram.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuvakryptogrammi-generaattori sisältää kaikki työkalut, joita tarvitset ammattimaisten tehtävien luomiseen. Luo esiopetus materiaali ilmainen ja lukemaan oppiminen tehtävät minuuteissa. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Jokainen ominaisuus on suunniteltu nopeuttamaan tehtävien luomista ja parantamaan laatua.',
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
        icon: '🔐',
        title: 'Kuva-kirjain-koodausmuoto',
        description: 'Jokaisessa kryptogrammissa kuvat korvaavat kirjaimet salaisessa viestissä. Oppilaat käyttävät koodiavainta tunnistaakseen, mikä kuva edustaa mitäkin kirjainta. Koodinmurto kehittää loogista päättelyä ja kirjaintuntemusta.',
      },
      {
        id: '2',
        icon: '🔑',
        title: 'Säädettävä vihjeiden määrä',
        description: 'Valitse kuinka monta kirjainta paljastetaan vihjeiksi. Nolla vihjettä luo vaikeimman arvoituksen. Yksi tai useampi vihje auttaa aloittelijoita pääsemään alkuun. Säädä vaikeustasoa täydellisesti.',
      },
      {
        id: '3',
        icon: '📝',
        title: 'Omat lauseet ja fraasit',
        description: 'Kirjoita mitä tahansa lauseita koodattaviksi. Sananlaskuja, opetusviestejä, matematiikan faktoja tai temaattisia fraaseja. Generaattori muuntaa jokaisen lauseen kuvakoodiksi automaattisesti.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa koodisymboleiksi',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta kryptogrammin symbolit. Jokainen kuva edustaa yhtä kirjainta. Teemapohjaiset symbolit luovat kiinnostavia koodinmurtotehtäviä.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen kryptogrammi generoi automaattisesti vastausavaimen, jossa koodiavain ja ratkaistu viesti näkyvät. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää tekstejä ja ohjeita. Muokkaustyökalut tarjoavat ammattimaiset tulokset.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä kryptogrammitehtäviä verkossa. Luo teemallisia koodinmurtopaketteja myytäväksi. Ei attribuutiovaatimuksia.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo kryptogrammeja 11 kielellä mukaan lukien suomi, ruotsi ja tanska. Täydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen. Koodinmurto toimii kielirajojen yli.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish cryptogram.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimainen kuvakryptogrammi alle 3 minuutissa. Viisi yksinkertaista vaihetta vie sinut tyhjästä kankaasta valmiiseen tulostettavaan tehtävään. Ei tarvita teknistä osaamista. Ei tarvita suunnittelutaitoa. Seuraa näitä vaiheita luodaksesi kertotaulut tulostettava, yhteenlasku ja vähennyslasku tehtävät sekä lukemaan oppiminen tehtävät.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Kuvakryptogrammisi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Kuvakryptogrammille - Lauseet Kirjaimet Harjoittelu Esikoulu ja Lukemaan Oppiminen Tehtävät Varten',
        description: `Kirjoita lauseet tai fraasit, jotka haluat salata. Yksi lause per rivi. Voit kirjoittaa mitä tahansa - sananlaskuja, matematiikan faktoja tai opetusviestejä. Luo kertotaulut tulostettava fraaseja kuten "seitsemän kertaa kahdeksan on viisikymmentäkuusi". Kirjoita yhteenlasku ja vähennyslasku tehtävät lauseita kuten "kymmenen plus viisi on viisitoista".

Fraasien pituus vaikuttaa vaikeuteen. Lyhyet fraasit sopivat esiopetukseen. Pitkät lauseet haastavat vanhempia oppilaita. Käytä yksinkertaisia sanoja lukemaan oppiminen tehtävät aloittelijoille. Sisällytä matematiikan sanastoa matematiikka tehtävät alakoulu oppilaille.

Voit luoda teemallisia kryptogrammeja. Eläinaiheet värityskuvia lapsille tulostettava ja hienomotoriikka harjoitukset yhdistelmiin. Vuodenaikateema pisteestä pisteeseen tehtävät kanssa. Juhlapäiväfraasit esiopetus materiaali ilmainen paketteihin. Valitse aihe, joka kiinnostaa oppilaitasi ja motivoi heitä ratkaisemaan arvoituksen.`,
        icon: '📝',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Kertotaulut Tulostettava ja Yhteenlasku ja Vähennyslasku Tehtävät Vaikeustasolla',
        description: `Valitse kuinka monta kirjainta paljastetaan vihjeiksi. Nolla vihjettä luo vaikeimman arvoituksen. Yksi tai kaksi vihjettä auttaa aloittelijoita pääsemään alkuun. Useammat vihjeet tekevät tehtävästä helpomman esiopetus materiaali ilmainen oppilaille.

Aseta rivien enimmäismäärä per arvoitus. Tämä kontrolloi ulkoasua ja vaikeutta. Vähemmän rivejä tiivistää arvoituksen. Enemmän rivejä jakaa sen helpommin luettavaksi. Säädä tätä asetusta luodaksesi kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät eri tasoille.

Valitse sivun koko ja suunta. A4 pysty Euroopassa. Letter pysty Yhdysvalloissa. Vaaka-asento antaa enemmän tilaa leveille kryptogrammeille. Neliökoko toimii hyvin värityskuvia lapsille tulostettava ja pisteestä pisteeseen tehtävät yhdistelmissä.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Kuvakryptogrammi - Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Alakoulu Välittömästi',
        description: `Klikkaa Luo-painiketta. Generaattori käsittelee fraasisi ja luo kryptogrammin sekunnissa. Kaksi versiota luodaan automaattisesti - tehtäväversio kuvilla ja vastausavain kirjaimilla. Molemmat versiot näkyvät välilehtinä.

Tehtäväversio näyttää kuvat kirjainten sijasta. Tämä on versio, jonka oppilaat saavat. He ratkaisevat arvoituksen tunnistamalla, mikä kuva vastaa mitäkin kirjainta. Täydellinen lukemaan oppiminen tehtävät ja kirjaimet harjoittelu esikoulu harjoituksiin.

Vastausavain näyttää fraasit oikeilla kirjaimilla. Tämä on opettajan versio tarkistusta varten. Tulosta molemmat versiot tai vain tehtäväversio. Säilytä vastausavain digitaalisena tai tulosta se myöhemmin.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Räätälöi Hienomotoriikka Harjoitukset, Pisteestä Pisteeseen Tehtävät ja Värityskuvia Lapsille Tulostettava',
        description: `Nyt kun kryptogrammi on luotu, muokkaa sitä kankaalla. Vedä elementtejä uusiin sijainteihin. Skaalaa kuvia suuremmiksi tai pienemmiksi. Kierrä tekstejä tai kuvia kiinnostavuuden lisäämiseksi. Kaikki muutokset näkyvät välittömästi.

Lisää mukautettuja tekstejä työkalujen osiosta. Kirjoita otsikot kuten "Kertotaulut Tulostettava" tai "Yhteenlasku ja Vähennyslasku Tehtävät". Lisää ohjeita oppilaille. Muuta fonttia, kokoa ja väriä tekstityökaluilla. Luo selkeitä ohjeita esiopetus materiaali ilmainen ja lukemaan oppiminen tehtävät oppilaille.

Lisää tausta sivuasetusten osiosta. Selaa taustakirjastoa. Klikkaa taustaa lisätäksesi sen. Säädä läpinäkyvyyttä liukusäätimellä. Haaleat taustat toimivat hyvin hienomotoriikka harjoitukset ja pisteestä pisteeseen tehtävät yhdistelmissä.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Tulostettavat Tehtävät Lapsille Ilmainen PDF tai JPEG Muodossa',
        description: `Kun olet tyytyväinen kryptogrammiisi, lataa se. Klikkaa Lataa-painiketta oikeassa yläkulmassa. Avautuvasta valikosta valitse haluamasi formaatti. JPEG nopeaan jakamiseen. PDF ammattimaiseen tulostukseen.

Valitse kumpi versio ladataan. Tehtäväversio oppilaille. Vastausavain opettajalle. Tai lataa molemmat kerralla. Molemmat versiot ovat 300 DPI laatua. Täydellinen kotitulostimille ja ammattitulostukselle.

Harmaasävyvalintaruutu muuttaa värikuvat mustavalkoisiksi. Tämä säästää värimustetta tulostuksessa. Harmaasävy toimii hyvin hienomotoriikka harjoitukset ja pisteestä pisteeseen tehtävät tehtävissä. Värillinen versio on parempi värityskuvia lapsille tulostettava ja visuaalisesti kiinnostaville tehtäville.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuvakryptogrammit toimivat monenlaisissa opetustilanteissa. Esiopetuksen opettajat käyttävät niitä kirjainten harjoitteluun. Alakoulun opettajat luovat kertotaulut tulostettava ja yhteenlasku ja vähennyslasku tehtävät materiaaleja. Kotiopettajat rakentavat kokonaisvaltaisia oppimispaketteja. Jokainen käyttäjäryhmä hyötyy eri tavoin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Kirjaintuntemuksen kehittäminen koodinmurrolla',
        description: 'Luo yksinkertaisia kryptogrammeja lyhyillä sanoilla ja useilla vihjeillä. Esiopetuksen oppilaat harjoittelevat kirjainten tunnistamista tunnistamalla kuva-kirjain-vastaavuuksia. Tukee POPS 2014 äidinkielen tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Lukemisvalmiuden kehittäminen 1.–3. luokalla',
        description: 'Generoi monimutkaisempia kryptogrammeja pidemmillä lauseilla. Oppilaat kehittävät dekoodaustaitoja, jotka tukevat lukemaan oppimista. Yhdistä äidinkielen ja matematiikan opetukseen.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Koodinmurtoharjoituksia kotiin',
        description: 'Luo hauskoja kryptogrammeja lasten suosikkiaiheilla. Koodinmurto motivoi lapsia oppimaan kirjaimia ja sanoja. Generoi viikon tehtävät nopeasti eri vaikeustasoin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Monikielinen koodinmurtoharjoittelu',
        description: 'Kryptogrammit tarjoavat kirjain-äännevastaavuuden harjoittelua kuvapohjaisesti. 11 kielen tuki mahdollistaa monikielisen koodinmurtoharjoittelun saumattomasti.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävä dekoodausharjoittelu',
        description: 'Säädä vihjeiden määrää ja lauseiden pituutta HOJKS-tavoitteiden mukaisesti. Useammat vihjeet tukevat heikompia oppilaita. Kuvasymbolit tekevät kirjainharjoittelusta motivoivaa.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy koodinmurtopaketteja',
        description: 'Luo teemallisia kryptogrammikokoelmia myytäväksi verkossa. Koodinmurtotehtävät ovat suosittuja ja kiinnostavia. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish cryptogram.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät säännöllisesti samoista asioista. Onko generaattori ilmainen. Miten tulostus toimii. Voinko myydä luomiani materiaaleja. Tässä osiossa vastataan kaikkiin yleisimpiin kysymyksiin kuvakryptogrammi-generaattorista.',
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
        question: 'Miten kuvakryptogrammi-generaattori toimii?',
        answer: 'Kirjoita lauseet, jotka haluat salata. Generaattori korvaa jokaisen kirjaimen kuvalla luoden koodiavaimen. Oppilaat purkavat koodin tunnistamalla kuva-kirjain-vastaavuudet ja kirjoittavat paljastuneen viestin.',
      },
      {
        id: '2',
        question: 'Kuinka vaikeustasoa säädetään?',
        answer: 'Säädä vihjeiden määrää ja lauseiden pituutta. Nolla vihjettä on vaikeaa. Useammat vihjeet helpottavat aloitusta. Lyhyet sanat sopivat aloittelijoille. Pitkät lauseet haastavat edistyneempiä.',
      },
      {
        id: '3',
        question: 'Voiko omia lauseita käyttää?',
        answer: 'Kyllä, kirjoita mitä tahansa lauseita tai fraaseja. Sananlaskuja, opetusviestejä, viikon sanoja tai temaattisia lauseita. Generaattori muuntaa ne kuvakoodiksi automaattisesti.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen kryptogrammi generoi automaattisesti vastausavaimen. Koodiavain ja ratkaistu viesti näkyvät selkeästi. Tulosta vastausavain erikseen opettajan käyttöön.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille kryptogrammit sopivat?',
        answer: 'Kryptogrammit palvelevat 5–10-vuotiaita. Esiopetuksen oppilaat harjoittelevat lyhyillä sanoilla ja useilla vihjeillä. 1.–3. luokan oppilaat ratkaisevat pidempiä lauseita itsenäisesti.',
      },
      {
        id: '6',
        question: 'Miten kryptogrammit kehittävät lukutaitoa?',
        answer: 'Kryptogrammit kehittävät kirjain-äännevastaavuutta, dekoodaustaitoja ja loogista päättelyä. Nämä ovat lukemaan oppimisen perusedellytyksiä. Kuvasymbolit tekevät harjoittelusta motivoivaa.',
      },
      {
        id: '7',
        question: 'Voiko kryptogrammeja luoda useilla kielillä?',
        answer: 'Kyllä, generaattori luo kryptogrammeja 11 kielellä. Kuvasymbolit toimivat kielirajojen yli. Kirjoita lauseet millä tahansa tuetulla kielellä.',
      },
      {
        id: '8',
        question: 'Miten tulostan kryptogrammit?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää mustetta.',
      },
      {
        id: '9',
        question: 'Sopivatko kryptogrammit erityisopetukseen?',
        answer: 'Kyllä, säädettävä vaikeustaso tekee kryptogrammeista erinomaisia erityisopetukseen. Useammat vihjeet ja lyhyemmät sanat tukevat heikompia oppilaita.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden kryptogrammin luominen vie alle 3 minuuttia. Kirjoita lauseet ja valitse asetukset nopeasti. Generaattori luo koodin välittömästi.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani kryptogrammeja?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy teemallisia koodinmurtopaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten kryptogrammit tukevat POPS 2014 tavoitteita?',
        answer: 'Kryptogrammit tukevat äidinkielen tavoitteita kirjain-äännevastaavuuden ja dekoodaustaitojen kehittämisessä. POPS 2014 korostaa loogisen ajattelun ja ongelmanratkaisun kehittämistä monipuolisilla työtavoilla.',
      },
    ]
    
  },

  // Pricing - Finnish Full Access terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton kryptogrammien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
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
    sectionDescription: 'Kuvakryptogrammit toimivat vielä paremmin yhdistettynä muihin tehtävätyyppeihin. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin 33 generaattoriin. Rakenna kokonaisvaltaisia oppimispaketteja jotka käsittelevät samaa teemaa eri tavoin.',
    ctaTitle: 'Valmiina Luomaan Upeita Kuvakryptogrammeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia kuvakryptogrammeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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
        slug: 'ristisanatehtavat-tyoarkit',
        name: 'Ristisanatehtävät',
        category: 'Äidinkieli',
        icon: '➕',
        description: 'Ristisanatehtävät laajentavat kuvapohjaista sanastotyötä ristikkomuotoon. Yhdistä kryptogrammien kanssa kattaviin sanastopaketteihin.',
      },
      {
        id: '2',
        slug: 'kuva-arvaus-tyoarkit',
        name: 'Kuva-arvaus',
        category: 'Äidinkieli',
        icon: '❓',
        description: 'Kuva-arvaus täydentää kryptogrammeja puuttuvan kirjaimen muodolla. Molemmat kehittävät kirjaintuntemusta ja oikeinkirjoitusta.',
      },
      {
        id: '3',
        slug: 'sananhaku-tyoarkit',
        name: 'Sanahaku',
        category: 'Äidinkieli',
        icon: '🔍',
        description: 'Sanahaku yhdistää sanojen etsinnän ja tunnistamisen. Oppilaat kohtaavat samat teemasanat eri muodoissa.',
      },
      {
        id: '4',
        slug: 'sanansekoitus-tyoarkit',
        name: 'Sanansekoitus',
        category: 'Äidinkieli',
        icon: '🔀',
        description: 'Sanansekoitus haastaa kirjainten järjestämistä. Molemmat kehittävät kirjaintuntemusta ja sanavarastoa eri muodoissa.',
      },
      {
        id: '5',
        slug: 'kasinkirjoitus-tyoarkit',
        name: 'Käsinkirjoitus',
        category: 'Äidinkieli',
        icon: '📝',
        description: 'Käsinkirjoitus vahvistaa kirjainten muodostusta, joka tukee kryptogrammien ratkaisemista. Yhdistä molemmat kirjoitustaidon kehittämiseen.',
      },
      {
        id: '6',
        slug: 'aakkosjuna-tyoarkit',
        name: 'Aakkosjuna',
        category: 'Varhaiskasvatus',
        icon: '🚂',
        description: 'Aakkosjuna kehittää kirjaintuntemusta, joka on kryptogrammien ratkaisemisen edellytys. Yhdistä molemmat varhaisen lukutaidon paketteihin.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 176) ------------------------------------

  aiOverviewSnippet: 'Kuvakryptogrammi-generaattori on verkkotyokalu, jolla luodaan tulostettavia koodinmurtotehtavia, joissa kuvat korvaavat kirjaimet salaisessa viestissa. Oppilaat kayttavat koodiavainta tunnistaakseen kuva-kirjain-vastaavuudet ja purkaakseen viestin. Kehittaa kirjaintuntemusta, dekoodaustaitoja ja loogista paattelya. Opettajat kirjoittavat omat lauseet ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Koodausmuoto',
      ourApp: 'Kuva-kirjain-koodaus visuaalisilla symboleilla',
      typical: 'Vain numero-kirjain-korvaus',
    },
    {
      feature: 'Omat lauseet',
      ourApp: 'Rajattomasti omia lauseita ja fraaseja',
      typical: 'Valmiit lauseet',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen koodiavain ja ratkaisu',
      typical: 'Manuaalinen',
    },
    {
      feature: 'Vihjeiden säätö',
      ourApp: '0–usea vihje säädettävästi',
      typical: 'Ei vihjeitä',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
      typical: 'Lisämaksu',
    },
    {
      feature: 'Kielituki',
      ourApp: '11 kieltä mukaan lukien suomi',
      typical: 'Vain englanti',
    },
  ],

  researchBacking: [
    {
      claim: 'Koodinmurtotehtävät kehittävät fonologista tietoisuutta ja kirjain-äännevastaavuutta, jotka ovat lukemaan oppimisen keskeisiä taitoja varhaiskasvatusikäisillä.',
      source: 'Lerkkanen, M.-K. et al., "Lukemisen ja kirjoittamisen kehitys," Jyväskylän yliopisto',
    },
    {
      claim: 'Symbolipohjainen dekoodaus kehittää loogista päättelyä ja työmuistia samanaikaisesti, mikä vahvistaa oppimisen kognitiivisia edellytyksiä monipuolisesti.',
      source: 'Niilo Mäki Instituutti, "Dekoodaustaitojen ja loogisen päättelyn kehitys"',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuvakryptogrammit ovat oppilaitteni ehdottomia suosikkeja. Lapset kokevat ratkaisevansa salakoodeja eivatkaa huomaa harjoittelevansa kirjaimia. Motivaatio pysyy korkeana ja kirjaintuntemus kehittyy nopeasti.',
      name: 'Heli Aaltonen',
      role: 'Esiopetuksen opettaja',
      school: 'Toivolan päiväkoti, Oulu',
    },
    {
      quote: 'Kaytan kryptogrammeja lukemisvalmiuden tukena. Dekoodausharjoitukset kehittavat kirjain-aanne-vastaavuutta motivoivassa muodossa. Saadettava vaikeustaso tekee eriyttamisesta helppoa eri taitotasoille.',
      name: 'Jarkko Manninen',
      role: '1. luokan opettaja',
      school: 'Viialan koulu, Akaa',
    },
  ],

  tips: {
    sectionTitle: 'Kuvakryptogrammistrategiat luokka-asteittain',
    sectionDescription: 'Säädä kuvakryptogrammi-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset vihjeiden määrän, lauseiden pituuden ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Yksinkertainen kuva-kirjain-yhdistäminen',
        description: 'Kaytta lyhyita 3-4 kirjaimen sanoja ja 2-3 vihjetta. Esikoululaiset harjoittelevat kuvan tunnistamista ja vastaavan kirjaimen loytamista. Koodiavaimen kaytto kehittaa loogista ajattelua hauskalla tavalla.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Lyhyet fraasit yhdellä vihjeellä',
        description: 'Luo kryptogrammeja lyhyilla 2-3 sanan lauseilla ja yhdella vihjeella. Esiopetuksen oppilaat kehittavat dekoodaustaitoja itsenaisesti. Kuva-kirjain-vastaavuus rakentaa lukemisvalmiutta POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Kokonaiset lauseet dekoodattaviksi',
        description: 'Generoi kryptogrammeja kokonaisilla lauseilla ja 0-1 vihjeella. Ekaluokkalaiset kehittavat sujuvaa dekoodausta ja kirjaintuntemusta. Tehtavat vahvistavat lukemaan oppimista motivoivassa muodossa.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Monisanaiset viestit ilman vihjeitä',
        description: 'Luo kryptogrammeja monisanaisilla viesteilla ilman vihjekkirjaimia. Toisluokkalaiset hioivat dekoodaustaitoja ja kehittavat tyomuistia. Pidemmit viestit vaativat jarjestelmallista tyoskentelya.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monimutkaiset salaviestit',
        description: 'Kaytta pitkih lauseita ja monimutkaisih koodeja ilman vihjeitaa. Kolmasluokkalaiset ratkaisevat vaativia kryptogrammeja itsenaisesti. Tehtavat kehittavat loogista paattelya ja ongelmanratkaisua POPS 2014 tavoitteiden mukaisesti.',
      },
    ],
  },
};

export default cryptogramFiContent;
