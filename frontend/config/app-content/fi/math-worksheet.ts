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
    titleTag: 'Matikkatehtävien generaattori | Luo laskutehtäviä tulostettavaksi',
    metaDescription: 'Luo räätälöityjä matikkatehtäviä automaattisilla vastauksilla. 300 DPI PDF, 11 kieltä. Kokeile ilmaiseksi — kaupallinen lisenssi Etsyyn & KDP:hen.',
  },

  hero: {
    title: 'Algebrapulmapeli Tyoarkkien Generaattori Visuaalisiin Yhtälöihin',
    tagline: 'Tee varhaisesta algebrasta visuaalinen seikkailu — kuvista tulee muuttujia, ja jokaisella pulmalla on tarkalleen yksi ratkaisu.',
    description:
      'Luo sitouttavia algebrallisia kuvapulmapeli tyoarkkeja, joissa kuvat toimivat tuntemattomina muuttujina yhtälöjärjestelmässä. Kayttajat ratkaisevat yhdistettyjä yhtälöitä maaritellakseen jokaisen kuvan numeerisen arvon — muuttaen abstraktin algebran konkreettiseksi, visuaaliseksi ajatteluprosessiksi. Valitse neljan vaikeustason valilta: Erittain Helppo ja Helppo kayttavat kahta symbolia, Keskitaso esittelee kolme symbolia ja Vaikea haastaa kayttajat neljalla samanaikaisella tuntemattomalla. Valitse tehtavat pelkalla yhteenlaskulla tai sekoita yhteen- ja vahennyslaskua edistyneeseen harjoitteluun, ja aseta lukualue tarkasti 0:sta 20:een valinnaisella negatiivisten tulosten kytkimella. Sisäänrakennettu algebrallinen ratkaisija takaa, etta jokaisella pulmalla on tarkalleen yksi oikea ratkaisu. Selaa yli 3 100 kuvitusta 104 teemassa algebrallisiksi symboleiksi. Jokainen tyoarkki luo automaattisen vastausavaimen. Vie tulostusvalmiita PDF- ja JPEG-tiedostoja 400+ DPI:na. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteroitymista, ei luottokorttia. Lataukset sisaltavat vesileiman; osta lisenssi sen poistamiseksi.',
  },

  ctaHeading: 'Luo matematiikkatehtäviä',

  howItWorks: {
    title: 'Nain Luot Algebrapulmapeli Tyoarkkeja Viidessa Vaiheessa',
    steps: [
      {
        title: 'Aseta sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Oletustyoarkki (800x1000), Nelio (1200x1200) tai mukautettu koko. Valitse taustavari, valitse koristeellinen taustateema kuvakirjastosta ja saada lapinakyvyytta. Lisaa yhteensopiva kehys ammattimaiseen ulkoasuun.',
      },
      {
        title: 'Maarittele vaikeustaso, laskutoimitus ja lukualue',
        description:
          'Avaa Tehtava-asetukset -paneeli ja valitse vaikeustaso. Erittain Helppo ja Helppo kayttavat kahta kuvasymboolia yhtälöjärjestelmässä, Keskitaso esittelee kolme symbolia ja kolme yhdistettyä yhtälöä, ja Vaikea kayttaa neljaa samanaikaista tuntematonta neljässä yhtälössä. Valitse Pelkka Yhteenlasku tai Yhteenlasku ja Vahennyslasku. Aseta minimi- ja maksimiarvot (oletus 0–20) ja ota kayttoon Salli Negatiiviset Tulokset edistyneille kayttajille. Valitse lopuksi pulmien maara sivua kohti — 1:sta 6:een.',
      },
      {
        title: 'Valitse kuvia algebrallisiksi symboleiksi',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa. Valitse kuvanvalintatilas: Valitse Kuvat Yksittain vahintaan 8 tietyn kuvan valitsemiseksi, tai Kaytta Koko Teemaa kaikkien teeman kuvien sisallyttamiseksi. Jokainen pulmapeli hyvaksyy valintasi maaratakseen kuvia muuttujasymboleiksi yhtälöissä. Voit myos ladata omia kuvia.',
      },
      {
        title: 'Lisaa tekstia, otsikoita ja pulmanumerointia',
        description:
          'Kaytta Tyokalut-paneelia lisataksesi tyoarkin otsikon, nimi- ja paivamaarakentat, ohjeita tai muuta mukautettua tekstia. Valitse seitsemasta fontista. Muokkaa pulmanumerointia omalla tunnustetekstillasi (esim. "Pulmapeli", "Tehtava", "Haaste") ja aseta aloitusnumero. Kaytta Fabric.js-piirtoalustaa elementtien vetamiseen ja sijoitteluun.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-valilehdelle ja napsauta Luo Vastausavain luodaksesi ratkaistun version, joka paljastaa jokaisen kuvasymboolin numeerisen arvon. Vie seka tyoarkki etta vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona. Ota kayttoon harmaa-astevienti musteystävallisiin versioihin. Jokainen vienti renderoidaan yli 400 DPI:na.',
      },
    ],
  },

  keyFeatures: {
    title: 'Algebrapulmapeli Tyoarkkien Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Algebrallinen kuvapulmamuoto',
        description:
          'Jokainen tyoarkki esittaa yhdistettyjen yhtälöiden järjestelman, jossa kuvat toimivat tuntemattomina muuttujina. Abstraktien kirjainten x, y ja z sijaan kayttajat nakevat tuttuja kuvia — elaimia, ajoneuvoja, ruokaa — jotka tekevat muuttuja-kasitteesta konkreettisen ja helpostilahestyttavan. Kayttajat analysoivat yhtälöiden valisia suhteita, paattelevat jokaisen kuvan numeerisen arvon ja kirjoittavat vastauksensa.',
      },
      {
        title: 'Nelja vaikeustasoa progressiiviseen oppimiseen',
        description:
          'Erittain Helppo ja Helppo kayttavat kahta kuvasymboolia, tarjoten lempeän johdannon yksinkertaisten kahden yhtälön järjestelmien ratkaisemiseen. Keskitaso nostaa haasteen kolmeen symboliin ja kolmeen yhdistettyyn yhtälöön. Vaikea esittaa neljä samanaikaista tuntematonta neljässä yhtälössä. Tama sisäänrakennettu eteneminen mahdollistaa tasoitettujen tuotepakettien tai vaikeustasojen mukaan jaoteltujen aktiviteettikirjojen luomisen yhdessa istunnossa.',
      },
      {
        title: 'Uniikin ratkaisun validointi',
        description:
          'Generaattorin sisäänrakennettu algebrallinen ratkaisija varmistaa, etta jokaisella luomallaan pulmalla on tarkalleen yksi oikea ratkaisu ennen sen sijoittamista tyoarkkiin. Ei moniselitteisia järjestelmiä, ei useita pateviä vastauksia eika ratkaisemattomia pulmia. Tama matemaattinen takuu saastaa manuaalisesta tarkistamisesta ja varmistaa, etta jokainen vastausavain on tarkka.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla algebrallisina symboleina',
        description:
          'Selaa yli 3 100 korkearesoluutioisen kuvituksen kirjastoa 104 teemassa. Jokainen kuva toimii algebrallisena muuttujana pulmayhtälöissä — ei koristeena, vaan itse pulman ytimena. Koska tyoarkin sisalto on taysin visuaalinen — kuvia ja numeroita, ei sanoja — tyoarkkisi toimivat kaikilla kielilla ja kaikilla markkinoilla.',
      },
      {
        title: 'Saadettava lukualue ja negatiiviset tulokset',
        description:
          'Aseta minimi- ja maksimiarvot ratkaisuille, oletuksena 0:sta 20:een, tarkan vaikeustasokontrollin saavuttamiseksi. Nuoremmille kayttajille pida luvut pieninä ja positiivisina. Edistyneille kayttajille ota kayttoon Salli Negatiiviset Tulokset etumerkillisten lukujen laskemisen esittelemiseksi.',
      },
      {
        title: 'Automaattinen vastausavaimen luominen',
        description:
          'Napsauta yhta painiketta luodaksesi tayden vastausavaimen, joka paljastaa jokaisen kuvasymboolin numeerisen arvon. Vastausavain-valilehti nayttaa reaaliaikaisen esikatselun tarkistettavaksi. Vie vastausavain erillisenä JPEG- tai PDF-tiedostona tuotepaketteihin.',
      },
      {
        title: 'Tulostuvalmis vienti 400+ DPI:na harmaa-asteilla',
        description:
          'Lataa tyoarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina yli 400 DPI:na. Ota kayttoon harmaa-astevienti musteystävallisiin versioihin. Letter, A4, Oletustyoarkki, Nelio ja mukautetut koot ovat kaikki tuettuja.',
      },
      {
        title: 'Taysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisaanrakennettu Fabric.js-piirtoalusta antaa sinun vetaa, skaalata, kiertaa ja siirtaa jokaista elementtia. Kaytta tasonhallintaa, justeraustyokaluja ja lukitus/avaus-toimintoja rajattomalla kumoa- ja tee uudelleen -toiminnolla graafisen suunnitteluohjelman joustavuudella.',
      },
    ],
  },

  businessUseCases: {
    title: 'Nain Myyat Algebrapulmapeli Tyoarkkeja Verkossa',
    cases: [
      {
        title: 'Teemakohtaiset algebrapulmapelipaketit Etsyssa',
        description:
          'Luo 10–20 algebrallisen kuvapulmapelin sarjoja vaikeustasoittain — Erittain Helposta Vaikeaan — ja tarjoa niita suorana latauksena Etsyssa. Sisallyta vastausavaimet bonustiedostoina. Algebrallinen pulmamuoto erottuu tavallisista laskuharjoitusarkeista. Hinnoittele vaikeustasopaketit 4–6 euroon ja megapaketit kaikilla neljalla tasolla 14–20 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Algebrapulmapeli aktiviteettikirjat Amazon KDP:ssa',
        description:
          'Kokoa 50–100 algebrapulmapeliä painetuksi aktiviteettikirjaksi Amazon KDP -muodossa. Kaytta nousevaa vaikeustasoa — aloita Erittain Helposta kahden symbolin yhteenlaskupulmista ja etene Vaikeisiin neljän symbolin sekalaskutoimitusjärjestelmiin. Kuvaalgebrakirjat tayttavat vahemman kilpaillun nichen kuin tavalliset laskutyokirjat.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut matematiikkatuotteet Gumroadiin',
        description:
          'Luo algebrapulmapelisarjoja tasoittain neljalla vaikeustasolla: Taso 1 (Erittain Helppo, 2 symbolia, yhteenlasku), Taso 2 (Helppo, 2 symbolia, sekalaskutoimitukset), Taso 3 (Keskitaso, 3 symbolia) ja Taso 4 (Vaikea, 4 symbolia). Pakkaa jokainen taso vastausavaimella ja edistymisen seurantalomakkeella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Digitaaliset tuotteet omassa verkkokaupassa',
        description:
          'Kaytta generaattoria tuottamaan viikottaisia algebrapulmapelipaketteja ja jakele ne oman verkkokauppasi kautta. Tilausmalli — uusi temaattinen pulmapelipaketti joka viikko — luo toistuvaa tuloa. Neljalla vaikeustasolla, kahdella laskutoimitustilalla, saadettavilla lukualueilla ja 104 teemalla on riittavasti yhdistelmia vuosien sisaltoon.',
        platform: 'Gumroad / Shopify / Payhip',
      },
      {
        title: 'Algebrapulmapelit verkossa ja yksityisopetuksessa',
        description:
          'Luo raataloityja algebrapulmapelejä jokaiselle kayttajalle taitotason mukaan. Tulosta Erittain Helppoja kahden symbolin tyoarkkeja 1. luokan aloittelijoille ja Vaikeita neljän symbolin järjestelmiä edistyneille 3.–4. luokkalaisille. Kuvamuuttujamuoto tekee varhaisesta algebrasta helpostilahestyttavan nuorille kayttajille, jotka eivat viela ole valmiita abstraktiin x-ja-y-merkintätapaan.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Miten algebrallinen kuvapulmamuoto toimii?',
      answer:
        'Jokainen pulmapeli esittaa yhdistettyjen yhtälöiden järjestelman, jossa kuvat edustavat tuntemattomia muuttujia. Esimerkiksi kahden symbolin pulmapeli voi nayttaa: omena + omena = 6, omena + banaani = 8. Kayttajat paattelevat, etta jokainen omena on 3 ja jokainen banaani 5. Korkeammat vaikeustasot lisaavat enemman symboleita ja yhtälöitä.',
    },
    {
      question: 'Mitä neljan vaikeustason tarkoittavat?',
      answer:
        'Erittain Helppo ja Helppo kayttavat kahta kuvasymboolia pienessä yhtälöjärjestelmässä. Keskitaso lisaa kolmannen symbolin kolmella yhdistetyllä yhtälöllä. Vaikea esittaa neljä symbolia neljässä samanaikaisessa yhtälössä. Jokainen taso tuottaa järjestelman, jonka generaattorin ratkaisija on varmistanut olevan uniikisti ratkaistavissa.',
    },
    {
      question: 'Onko jokaisella pulmalla todellakin tarkalleen yksi ratkaisu?',
      answer:
        'Kylla. Generaattori sisaltaa sisäänrakennetun algebrallisen ratkaisijan, joka validoi jokaisen pulman ennen sen sijoittamista tyoarkkiin. Jos satunnaisesti luotu järjestelmä olisi moniselitteinen tai ratkaisematon, generaattori hylkaa sen ja luo uuden.',
    },
    {
      question: 'Ovatko algebrapulmapeli tyoarkit kieliriippuvaisia?',
      answer:
        'Eivat. Nama tyoarkit ovat taysin visuaalisia — sisalto kayttaa kuvia ja numeroita, ei sanoja. Milla tahansa kieliasetuksella luotu pulmapeli toimii maailmanlaajuisesti.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kylla. Sinulla on paasy kaikkiin ominaisuuksiin — kaikkiin neljaan vaikeustasoon, molempiin laskutoimitustiloihin, tayteen kuvakirjastoon, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisaltavat pienen vesileiman.',
    },
    {
      question: 'Mitä kaupallinen lisenssi sisaltaa?',
      answer:
        'Kaupallinen lisenssi poistaa vesileiman kaikista latauksista ja antaa rajoittamattomat oikeudet myyda luomiasi tyoarkkeja — Etsyssa, Amazon KDP:ssa, Gumroadissa tai millä tahansa muulla alustalla. Ei rojalteja, ei kuukausimaksuja eika rajoituksia.',
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
      anchorText: 'Yhteenlasku Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'vahennyslasku-tyoarkit',
      anchorText: 'Vahennyslasku Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'koodiyhteenlasku-tyoarkit',
      anchorText: 'Koodiyhteenlasku Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'vertailutehtavat-tyoarkit',
      anchorText: 'Vertailutehtavat Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'matikkapulmapeli-tyoarkit',
      anchorText: 'Matikkapulmapeli Tyoarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'matematiikan-mestaripaketti',
      anchorText: 'Matematiikan Mestaripaketti — Kaikki Matematiikkatyokalut Yhdessa Paketissa',
    },
    {
      pageType: 'guide',
      slug: 'myy-matematiikkatyoarkkeja-etsy',
      anchorText: 'Opas Matematiikkatyoarkkien Myymiseen Etsyssa',
    },
    {
      pageType: 'start',
      slug: 'luo-tyoarkkeja-jotka-myyvat',
      anchorText: 'Luo tyoarkkeja, jotka myyvat',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/math%20worksheet/matematiikkalehti-1.webp',
      primaryAlt: 'Algebrallinen kuvapulmapeli tyoarkki kuvasymbooleilla, jotka edustavat tuntemattomia muuttujia yhtälöjärjestelmässä',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-2.webp',
        alt: 'Erittain Helppo algebrapulmapeli tyoarkki kahdella kuvasymbolilla ja pelkilla yhteenlaskuyhtälöillä',
        caption: 'Erittain Helppo taso — kaksi kuvasymboolia yksinkertaisessa yhtälöjärjestelmässä pelkalla yhteenlaskulla',
      },
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-3.webp',
        alt: 'Keskitason algebrapulmapeli tyoarkki kolmella kuvasymbolilla ja sekalaskutoimituksilla',
        caption: 'Keskitaso — kolme symbolia yhdistetyissä yhtälöissä yhteen- ja vahennyslaskulla',
      },
      {
        src: '/samples/finnish/math%20worksheet/matematiikkalehti-1.webp',
        alt: 'Vaikea algebrapulmapeli tyoarkki neljalla kuvasymbolilla neljän yhtälön järjestelmässä',
        caption: 'Vaikea taso — nelja samanaikaista tuntematonta edistyneeseen algebralliseen ongelmanratkaisuun',
      },
    ],
    youtubeId: '-JIawojGNr0',
    videoTitle: 'Luo Algebrallisia Kuvapulmapeli Tyoarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
