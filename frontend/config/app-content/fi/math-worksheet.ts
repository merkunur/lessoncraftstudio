import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'matikkatehtävien generaattori',
    secondaryKeywords: [
      'luo matikkatehtäviä',
      'laskutehtäviä tulostaa',
      'tehtävägeneraattori matematiikka',
      'räätälöityjä matikkatehtäviä',
    ],
    lsiKeywords: [
      'laskutoimitukset',
      'päässälasku',
      'laskeminen',
      'peruskoulu',
      'vastaukset',
      'PDF',
    ],
    titleTag: 'Matematiikkatehtäväkone | LessonCraftStudio',
    metaDescription: 'Luo räätälöityjä matikkatehtäviä automaattisilla vastauksilla. 300 DPI PDF, 11 kieltä. Kokeile ilmaiseksi — kaupallinen lisenssi Etsyyn & KDP:hen.',
  },

  hero: {
    title: 'Matematiikkatehtäväkone — Luo tulostettavia Etsy- ja KDP-myyntiin',
    tagline: 'Tee varhaisesta algebrasta visuaalinen seikkailu — kuvista tulee muuttujia, ja jokaisella pulmalla on tarkalleen yksi ratkaisu.',
    description:
      'Luo sitouttavia algebrallisia kuvapulmapelityöarkkeja, joissa kuvat toimivat tuntemattomina muuttujina yhtälöjärjestelmässä. Käyttäjät ratkaisevat yhdistettyjä yhtälöitä määritelläkseen jokaisen kuvan numeerisen arvon — muuttaen abstraktin algebran konkreettiseksi, visuaaliseksi ajatteluprosessiksi. Valitse neljän vaikeustason väliltä: Erittäin Helppo ja Helppo käyttävät kahta symbolia, Keskitaso esittelee kolme symbolia ja Vaikea haastaa käyttäjät neljällä samanaikaisella tuntemattomalla. Valitse tehtävät pelkällä yhteenlaskulla tai sekoita yhteen- ja vähennyslaskua edistyneeseen harjoitteluun, ja aseta lukualue tarkasti 0:sta 20:een valinnaisella negatiivisten tulosten kytkimellä. Sisäänrakennettu algebrallinen ratkaisija takaa, että jokaisella pulmalla on tarkalleen yksi oikea ratkaisu. Selaa yli 3 100 kuvitusta 104 teemassa algebrallisiksi symboleiksi. Jokainen työarkki luo automaattisen vastausavaimen. Vie tulostusvalmiita PDF- ja JPEG-tiedostoja 400+ DPI:nä. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Lataukset sisältävät vesileiman; osta lisenssi sen poistamiseksi.',
  },

  ctaHeading: 'Luo matematiikkatehtäviä',

  howItWorks: {
    title: 'Näin Luot Algebrapulmapelityöarkkeja Viidessä Vaiheessa',
    steps: [
      {
        title: 'Aseta sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Oletustyöarkki (800x1000), Neliö (1200x1200) tai mukautettu koko. Valitse taustaväri, valitse koristeellinen taustateema kuvakirjastosta ja säädä läpinäkyvyyttä. Lisää yhteensopiva kehys ammattimaiseen ulkoasuun.',
      },
      {
        title: 'Määrittele vaikeustaso, laskutoimitus ja lukualue',
        description:
          'Avaa Tehtävä-asetukset -paneeli ja valitse vaikeustaso. Erittäin Helppo ja Helppo käyttävät kahta kuvasymboolia yhtälöjärjestelmässä, Keskitaso esittelee kolme symbolia ja kolme yhdistettyä yhtälöä, ja Vaikea käyttää neljää samanaikaista tuntematonta neljässä yhtälössä. Valitse Pelkkä Yhteenlasku tai Yhteenlasku ja Vähennyslasku. Aseta minimi- ja maksimiarvot (oletus 0–20) ja ota käyttöön Salli Negatiiviset Tulokset edistyneille käyttäjille. Valitse lopuksi pulmien määrä sivua kohti — 1:sta 6:een.',
      },
      {
        title: 'Valitse kuvia algebrallisiksi symboleiksi',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa. Valitse kuvanvalintatila: Valitse Kuvat Yksittäin vähintään 8 tietyn kuvan valitsemiseksi, tai Käytä Koko Teemaa kaikkien teeman kuvien sisällyttämiseksi. Jokainen pulmapeli hyväksyy valintasi määrätäkseen kuvia muuttujasymboleiksi yhtälöissä. Voit myös ladata omia kuvia.',
      },
      {
        title: 'Lisää tekstiä, otsikoita ja pulmanumerointia',
        description:
          'Käytä Työkalut-paneelia lisätäksesi työarkin otsikon, nimi- ja päivämääräkentät, ohjeita tai muuta mukautettua tekstiä. Valitse seitsemästä fontista. Muokkaa pulmanumerointia omalla tunnustetekstilläsi (esim. "Pulmapeli", "Tehtävä", "Haaste") ja aseta aloitusnumero. Käytä Fabric.js-piirtoalustaa elementtien vetämiseen ja sijoitteluun.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle ja napsauta Luo Vastausavain luodaksesi ratkaistun version, joka paljastaa jokaisen kuvasymboolin numeerisen arvon. Vie sekä työarkki että vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona. Ota käyttöön harmaa-astevienti musteystävällisiin versioihin. Jokainen vienti renderöidään yli 400 DPI:nä.',
      },
    ],
  },

  keyFeatures: {
    title: 'Algebrapulmapelityöarkkien Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Algebrallinen kuvapulmamuoto',
        description:
          'Jokainen työarkki esittää yhdistettyjen yhtälöiden järjestelmän, jossa kuvat toimivat tuntemattomina muuttujina. Abstraktien kirjainten x, y ja z sijaan käyttäjät näkevät tuttuja kuvia — eläimiä, ajoneuvoja, ruokaa — jotka tekevät muuttuja-käsitteestä konkreettisen ja helpostilähestyttävän. Käyttäjät analysoivat yhtälöiden välisiä suhteita, päättelevät jokaisen kuvan numeerisen arvon ja kirjoittavat vastauksensa.',
      },
      {
        title: 'Neljä vaikeustasoa progressiiviseen oppimiseen',
        description:
          'Erittäin Helppo ja Helppo käyttävät kahta kuvasymboolia, tarjoten lempeän johdannon yksinkertaisten kahden yhtälön järjestelmien ratkaisemiseen. Keskitaso nostaa haasteen kolmeen symboliin ja kolmeen yhdistettyyn yhtälöön. Vaikea esittää neljä samanaikaista tuntematonta neljässä yhtälössä. Tämä sisäänrakennettu eteneminen mahdollistaa tasoitettujen tuotepakettien tai vaikeustasojen mukaan jaoteltujen aktiviteettikirjojen luomisen yhdessä istunnossa.',
      },
      {
        title: 'Uniikin ratkaisun validointi',
        description:
          'Generaattorin sisäänrakennettu algebrallinen ratkaisija varmistaa, että jokaisella luomallaan pulmalla on tarkalleen yksi oikea ratkaisu ennen sen sijoittamista työarkkiin. Ei moniselitteisiä järjestelmiä, ei useita päteviä vastauksia eikä ratkaisemattomia pulmia. Tämä matemaattinen takuu säästää manuaalisesta tarkistamisesta ja varmistaa, että jokainen vastausavain on tarkka.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla algebrallisina symboleina',
        description:
          'Selaa yli 3 100 korkearesoluutioisen kuvituksen kirjastoa 104 teemassa. Jokainen kuva toimii algebrallisena muuttujana pulmayhtälöissä — ei koristeena, vaan itse pulman ytimenä. Koska työarkin sisältö on täysin visuaalinen — kuvia ja numeroita, ei sanoja — työarkkisi toimivat kaikilla kielillä ja kaikilla markkinoilla.',
      },
      {
        title: 'Säädettävä lukualue ja negatiiviset tulokset',
        description:
          'Aseta minimi- ja maksimiarvot ratkaisuille, oletuksena 0:sta 20:een, tarkan vaikeustasokontrollin saavuttamiseksi. Nuoremmille käyttäjille pidä luvut pieninä ja positiivisina. Edistyneille käyttäjille ota käyttöön Salli Negatiiviset Tulokset etumerkillisten lukujen laskemisen esittelemiseksi.',
      },
      {
        title: 'Automaattinen vastausavaimen luominen',
        description:
          'Napsauta yhtä painiketta luodaksesi täyden vastausavaimen, joka paljastaa jokaisen kuvasymboolin numeerisen arvon. Vastausavain-välilehti näyttää reaaliaikaisen esikatselun tarkistettavaksi. Vie vastausavain erillisenä JPEG- tai PDF-tiedostona tuotepaketteihin.',
      },
      {
        title: 'Tulostusvalmis vienti 400+ DPI:nä harmaa-asteilla',
        description:
          'Lataa työarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina yli 400 DPI:nä. Ota käyttöön harmaa-astevienti musteystävällisiin versioihin. Letter, A4, Oletustyöarkki, Neliö ja mukautetut koot ovat kaikki tuettuja.',
      },
      {
        title: 'Täysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisäänrakennettu Fabric.js-piirtoalusta antaa sinun vetää, skaalata, kiertää ja siirtää jokaista elementtiä. Käytä tasonhallintaa, justeraustyökaluja ja lukitus/avaus-toimintoja rajattomalla kumoa- ja tee uudelleen -toiminnolla graafisen suunnitteluohjelman joustavuudella.',
      },
    ],
  },

  businessUseCases: {
    title: 'Näin Myyt Algebrapulmapelityöarkkeja Verkossa',
    cases: [
      {
        title: 'Teemakohtaiset algebrapulmapelipaketit Etsyssä',
        description:
          'Luo 10–20 algebrallisen kuvapulmapelin sarjoja vaikeustasoittain — Erittäin Helposta Vaikeaan — ja tarjoa niitä suorana latauksena Etsyssä. Sisällytä vastausavaimet bonustiedostoina. Algebrallinen pulmamuoto erottuu tavallisista laskuharjoitusarkeista. Hinnoittele vaikeustasopaketit 4–6 euroon ja megapaketit kaikilla neljällä tasolla 14–20 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Algebrapulmapeli aktiviteettikirjat Amazon KDP:ssä',
        description:
          'Kokoa 50–100 algebrapulmapeliä painetuksi aktiviteettikirjaksi Amazon KDP -muodossa. Käytä nousevaa vaikeustasoa — aloita Erittäin Helposta kahden symbolin yhteenlaskupulmista ja etene Vaikeisiin neljän symbolin sekalaskutoimitusjärjestelmiin. Kuva-algebrakirjat täyttävät vähemmän kilpaillun nichen kuin tavalliset laskutyökirjat.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut matematiikkatuotteet Gumroadiin',
        description:
          'Luo algebrapulmapelisarjoja tasoittain neljällä vaikeustasolla: Taso 1 (Erittäin Helppo, 2 symbolia, yhteenlasku), Taso 2 (Helppo, 2 symbolia, sekalaskutoimitukset), Taso 3 (Keskitaso, 3 symbolia) ja Taso 4 (Vaikea, 4 symbolia). Pakkaa jokainen taso vastausavaimella ja edistymisen seurantalomakkeella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Digitaaliset tuotteet omassa verkkokaupassa',
        description:
          'Käytä generaattoria tuottamaan viikottaisia algebrapulmapelipaketteja ja jakele ne oman verkkokauppasi kautta. Tilausmalli — uusi temaattinen pulmapelipaketti joka viikko — luo toistuvaa tuloa. Neljällä vaikeustasolla, kahdella laskutoimitustilalla, säädettävillä lukualueilla ja 104 teemalla on riittävästi yhdistelmiä vuosien sisältöön.',
        platform: 'Gumroad / Shopify / Payhip',
      },
      {
        title: 'Algebrapulmapelit verkossa ja yksityisopetuksessa',
        description:
          'Luo räätälöityjä algebrapulmapelejä jokaiselle käyttäjälle taitotason mukaan. Tulosta Erittäin Helppoja kahden symbolin työarkkeja 1. luokan aloittelijoille ja Vaikeita neljän symbolin järjestelmiä edistyneille 3.–4. luokkalaisille. Kuvamuuttujamuoto tekee varhaisesta algebrasta helpostilähestyttävän nuorille käyttäjille, jotka eivät vielä ole valmiita abstraktiin x-ja-y-merkintätapaan.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Miten algebrallinen kuvapulmamuoto toimii?',
      answer:
        'Jokainen pulmapeli esittää yhdistettyjen yhtälöiden järjestelmän, jossa kuvat edustavat tuntemattomia muuttujia. Esimerkiksi kahden symbolin pulmapeli voi näyttää: omena + omena = 6, omena + banaani = 8. Käyttäjät päättelevät, että jokainen omena on 3 ja jokainen banaani 5. Korkeammat vaikeustasot lisäävät enemmän symboleita ja yhtälöitä.',
    },
    {
      question: 'Mitä neljän vaikeustason tarkoittavat?',
      answer:
        'Erittäin Helppo ja Helppo käyttävät kahta kuvasymboolia pienessä yhtälöjärjestelmässä. Keskitaso lisää kolmannen symbolin kolmella yhdistetyllä yhtälöllä. Vaikea esittää neljä symbolia neljässä samanaikaisessa yhtälössä. Jokainen taso tuottaa järjestelmän, jonka generaattorin ratkaisija on varmistanut olevan uniikisti ratkaistavissa.',
    },
    {
      question: 'Onko jokaisella pulmalla todellakin tarkalleen yksi ratkaisu?',
      answer:
        'Kyllä. Generaattori sisältää sisäänrakennetun algebrallisen ratkaisijan, joka validoi jokaisen pulman ennen sen sijoittamista työarkkiin. Jos satunnaisesti luotu järjestelmä olisi moniselitteinen tai ratkaisematon, generaattori hylkää sen ja luo uuden.',
    },
    {
      question: 'Ovatko algebrapulmapelityöarkit kieliriippuvaisia?',
      answer:
        'Eivät. Nämä työarkit ovat täysin visuaalisia — sisältö käyttää kuvia ja numeroita, ei sanoja. Millä tahansa kieliasetuksella luotu pulmapeli toimii maailmanlaajuisesti.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kyllä. Sinulla on pääsy kaikkiin ominaisuuksiin — kaikkiin neljään vaikeustasoon, molempiin laskutoimitustiloihin, täyteen kuvakirjastoon, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisältävät pienen vesileiman.',
    },
    {
      question: 'Mitä kaupallinen lisenssi sisältää?',
      answer:
        'Kaupallinen lisenssi poistaa vesileiman kaikista latauksista ja antaa rajoittamattomat oikeudet myydä luomiasi työarkkeja — Etsyssä, Amazon KDP:ssä, Gumroadissa tai millä tahansa muulla alustalla. Ei rojalteja, ei kuukausimaksuja eikä rajoituksia.',
    },
    {
      question: 'Sopivatko algebrapulmatehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Algebrapulmat sopivat parhaiten alkuopetuksen loppuun (2. luokka) ja alakouluun (3.–6. luokka). Neljä vaikeustasoa mahdollistaa eriyttämisen: helpoin taso sopii 2. luokalle, vaikein haastaa 5.–6.-luokkalaisia.',
    },
    {
      question: 'Noudattavatko algebrapulmatehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät tukevat OPS 2014:n matematiikan tavoitteita T5 (peruslaskutoimitukset), T6 (lukujonotaidot) ja erityisesti T9 (algebrallinen ajattelu). Kuvasymbolit valmistavat oppilaita muuttuja-ajatteluun, jota opetussuunnitelma painottaa 3. luokasta alkaen.',
    },
    {
      question: 'Miten luon matikkatehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse vaikeustaso (1–4), aseta lukualue, valitse teemakuvat symboliksi ja napsauta Luo. Generaattori luo automaattisesti pulman, jolla on tarkalleen yksi ratkaisu, sekä vastausavaimen.',
    },
    {
      question: 'Sisältyvätkö vastaukset automaattisesti?',
      answer:
        'Kyllä. Jokainen tehtäväarkki sisältää automaattisesti luodun vastausavaimen, joka näyttää jokaisen kuvasymboolin lukuarvon ja laskutoimituksen ratkaisun. Vastausavain vie oman sivunsa.',
    },
    {
      question: 'Voinko myydä näitä tehtäviä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä algebrapulmatehtäviä digitaalisina latauksina Etsyssä, painettuina aktiviteettikirjoina Amazon KDP:ssä tai millä tahansa muulla alustalla. Jokainen luomasi tehtävä on uniikki.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa sinulle pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata jokaisen vaikeustason, jokaisen laskutoimitustilan, jokaisen teeman ja jokaisen vientimuodon ennen ostamista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'yhteenlasku-tyoarkit',
      anchorText: 'Yhteenlasku Työarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'vahennyslasku-tyoarkit',
      anchorText: 'Vähennyslasku Työarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'koodiyhteenlasku-tyoarkit',
      anchorText: 'Koodiyhteenlasku Työarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'vertailutehtavat-tyoarkit',
      anchorText: 'Vertailutehtävät Työarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'matikkapulmapeli-tyoarkit',
      anchorText: 'Matikkapulmapeli Työarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'matematiikan-mestaripaketti',
      anchorText: 'Matematiikan Mestaripaketti — Kaikki Matematiikkatyökalut Yhdessä Paketissa',
    },
    {
      pageType: 'guide',
      slug: 'myy-matematiikkatyoarkkeja-etsy',
      anchorText: 'Opas Matematiikkatyöarkkien Myymiseen Etsyssä',
    },
    {
      pageType: 'start',
      slug: 'luo-tyoarkkeja-jotka-myyvat',
      anchorText: 'Luo työarkkeja, jotka myyvät',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/math%20worksheet/matematiikkalehti-1.webp',
      primaryAlt: 'Algebrallinen kuvapulmapelityöarkki kuvasymbooleilla, jotka edustavat tuntemattomia muuttujia yhtälöjärjestelmässä',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-2.webp',
        alt: 'Erittäin Helppo algebrapulmapelityöarkki kahdella kuvasymbolilla ja pelkillä yhteenlaskuyhtälöillä',
        caption: 'Erittäin Helppo taso — kaksi kuvasymboolia yksinkertaisessa yhtälöjärjestelmässä pelkällä yhteenlaskulla',
      },
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-3.webp',
        alt: 'Keskitason algebrapulmapelityöarkki kolmella kuvasymbolilla ja sekalaskutoimituksilla',
        caption: 'Keskitaso — kolme symbolia yhdistetyissä yhtälöissä yhteen- ja vähennyslaskulla',
      },
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-1.webp',
        alt: 'Vaikea algebrapulmapelityöarkki neljällä kuvasymbolilla neljän yhtälön järjestelmässä',
        caption: 'Vaikea taso — neljä samanaikaista tuntematonta edistyneeseen algebralliseen ongelmanratkaisuun',
      },
    ],
    youtubeId: '-JIawojGNr0',
    videoTitle: 'Luo Algebrallisia Kuvapulmapelityöarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
