import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'salainen viesti laskutehtävillä tulostaa',
    secondaryKeywords: [
      'koodinmurtaja matikka',
      'salakoodi pluslaskuilla',
      'matikka-arvoitus tehtävämoniste',
      'kooditehtäviä matematiikka',
    ],
    lsiKeywords: [
      'alakoulu',
      'yhteenlasku',
      'pulmatehtävä',
      'vastaukset',
    ],
    titleTag: 'Salaisen koodin generaattori | LessonCraftStudio',
    metaDescription: 'Luo tehtäviä, joissa lapset ratkovat yhteenlaskuja murtaakseen salaisia viestejä. Teemakuvat, vastaukset mukana. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Salaisen koodin generaattori — Luo tulostettavia Etsy- ja KDP-myyntiin',
    tagline: 'Muuta yhteenlasku etsivätehtäväksi, jossa jokainen kuva piilottaa salaisen numeron.',
    description:
      'Luo kryptaritmeettisiä yhteenlaskutyöarkkeja, jotka haastavat käyttäjät murtamaan visuaalisen koodin. Jokainen kuva työarkissa edustaa salaa tiettyä numeroa — käyttäjät ratkaisevat yhteenlaskutehtäviä selvittääkseen, minkä numeron kukin kuva edustaa, yhdistäen laskutaitoja ja loogista ajattelua samassa harjoituksessa. Vaihda Paljasta Sana -tilaan, ja haaste kasvaa: kirjoita salainen sana enintään kymmenellä kirjaimella, ja jokainen oikein ratkaistu yhtälö paljastaa kirjaimen vastauksessa, kun taas kolme harhauttavaa yhtälöä väärillä summilla lisäävät jännitystä. Generaattori tukee yhtätoista kielikohtaista aakkostoa, mikä tekee Paljasta Sana -tilasta toimivan sisäänrakennetusti suomeksi, ruotsiksi, englanniksi, saksaksi, ranskaksi ja seitsemällä muulla kielellä. Suomen aakkoset sisältävät ä ja ö, joten salaiset sanat näillä kirjaimilla toimivat luonnollisesti. Valitse yli 3 100 kuvasta 104 teemassa, määrittele lukualueet 1:sta 20:een kahdesta viiteen koodisymboliin työarkkia kohti, ja vie tulostusvalmiita PDF- tai JPEG-tiedostoja yli 400 DPI:nä automaattisilla vastausavaimilla. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Lataukset sisältävät vesileiman; osta lisenssi sen poistamiseksi.',
  },

  ctaHeading: 'Luo salaisen koodin laskutehtäviä',

  howItWorks: {
    title: 'Näin Luot Koodiyhteenlasku Työarkkeja Viidessä Vaiheessa',
    steps: [
      {
        title: 'Määrittele sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Neliö (1200x1200) tai mukautettu koko. Valitse taustaväri tai valitse koristeellinen teema kuvakirjastosta ja säädä läpinäkyvyyttä, jotta yhtälöt pysyvät luettavina. Lisää yhteensopiva kehys antaaksesi työarkeillesi ammattimaisen ulkoasun ennen sisällön lisäämistä.',
      },
      {
        title: 'Valitse tila ja määrittele koodi',
        description:
          'Avaa Harjoitusasetukset ja valitse Klassinen Tila puhtaaseen koodimurtamiseen tai Paljasta Sana -tila salaisen sanan upottamiseen. Klassisessa Tilassa asetat minimi- ja maksimiarvot yhteenlaskettaville (1–20) ja valitset kuinka monta uniikkia kuvasymboolia työarkkia kohti (2–5). Paljasta Sana -tilassa kirjoitat salaisen sanan enintään kymmenellä kirjaimella — sovellus luo yhden yhtälön jokaista kirjainta kohti, jonka summa vastaa kyseistä kirjainta, plus kolme harhauttavaa yhtälöä väärillä summilla haasteen lisäämiseksi.',
      },
      {
        title: 'Valitse kuvia teemakirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa — eläimistä ja dinosauruksista avaruuteen ja juhlapyhiin. Valitsemasi kuvat tulevat koodisymboleiksi työarkkiisi: jokainen kuva vastaa piilotettua numeroa, jonka käyttäjien pitää selvittää. Voit myös ladata omia PNG- tai JPEG-kuvia henkilökohtaisiin ja kausiluonteisiin pulmiin.',
      },
      {
        title: 'Lisää tekstiä, otsikoita ja asetuksia',
        description:
          'Käytä Työkalut-paneelia lisätäksesi otsikon, nimi- ja päivämääräkentät, ohjeet tai mukautetun tekstin. Valitse seitsemästä selkeästä fontista. Ota käyttöön tai poista käytöstä tehtävänumerot, näytä tai piilota otsikko ja kehys, ja ota käyttöön harmaa-astetila kustannustehokkaaseen tulostukseen. Jokainen asetus päivittää piirtoalustan esikatselun reaaliajassa.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle ja napsauta Luo luodaksesi ratkaistun version työarkistasi. Vastausavain toistaa työarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin päälle, tehden ratkaisuista täysin selviä. Paljasta Sana -tilassa vastausavain näyttää myös puretun sanan ja tunnistaa harhauttavat yhtälöt. Vie sekä työarkki että vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona yli 400 DPI:nä.',
      },
    ],
  },

  keyFeatures: {
    title: 'Koodiyhteenlasku Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Koodimurtamismekanismi — kuvat piilotettuja numeroina',
        description:
          'Tämän generaattorin määrittelevä ominaisuus on sen kryptaritmeettinen moottori. Jokainen kuva työarkissa edustaa salaa tiettyä numeroa. Käyttäjät ratkaisevat yhteenlaskuyhtälöitä, joissa yhteenlaskettavat ja summat näkyvät kuvina numeroiden sijaan, ja käyttävät sitten loogista päättelyä selvittääkseen, mitkä numerot kukin kuva edustaa. Tämä muuttaa rutiininomaisen yhteenlaskuharjoituksen etsivätyyliseksi pulmaksi.',
      },
      {
        title: 'Paljasta Sana -tila salaisilla sanoilla',
        description:
          'Aktivoi Paljasta Sana -tila ja kirjoita salainen sana enintään kymmenellä kirjaimella. Generaattori luo yhden yhteenlaskuyhtälön jokaista kirjainta kohti — jokaisen yhtälön summa vastaa tiettyä kirjainta purkutaulukossa. Käyttäjät ratkaisevat yhtälöt, etsivät jokaisen summan taulukosta ja muodostavat piilotetun sanan. Kolme harhauttavaa yhtälöä väärillä summilla lisätään automaattisesti, pakottaen käyttäjät tarkistamaan jokaisen vastauksen.',
      },
      {
        title: 'Kielikohtaiset aakkoset 11 kielelle',
        description:
          'Paljasta Sana -tila on täysin räätälöity jokaiselle kielelle. Suomessa aakkoset sisältävät ä ja ö. Saksa lisää Ä, Ö, Ü ja ß. Ranska sisältää à, â, ç, é, è ja muita aksenttimerkkejä. Jokainen yhdestätoista tuetusta kielestä käyttää omaa oikeaa aakkostoaan, joten salaiset sanat diakriittisillä merkeillä toimivat luonnollisesti. Tämä tekee Koodiyhteenlaskusta ainoan markkinoilla olevan työarkkigeneraattorin, joka tuottaa monikielisiä koodimurtamispulmia.',
      },
      {
        title: 'Säädettävät lukualueet ja symbolimäärät',
        description:
          'Aseta minimi- ja maksimiarvot yhteenlaskettaville 1:sta 20:een hallitaksesi tehtävien vaikeustasoa. Valitse kahdesta viiteen uniikkia kuvasymboolia työarkkia kohti säätääksesi päättelyn monimutkaisuutta — kaksi symbolia luo helpon pulman nuoremmille käyttäjille, kun taas viisi symbolia vaatii useiden tuntemattomien seurantaa läpi useiden yhtälöiden.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla',
        description:
          'Tutustu kirjastoon, jossa on yli 3 100 kuvitusta 104 teemassa. Koodiyhteenlaskussa kuvat toimivat itse koodisymboleina — käyttäjät näkevät kissan, raketin ja muffinin ja heidän täytyy päätellä, että kissa on 3, raketti 7 ja muffini 5. Teemapulmat ovat vastustamattomia lapsille ja erittäin myytäviä tulostettavina tuotteina.',
      },
      {
        title: 'Automaattinen vastausavain numeropeitteellä',
        description:
          'Luo täysin vastausavain yhdellä napsautuksella. Vastausavain toistaa työarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin päälle. Paljasta Sana -tilassa vastausavain näyttää myös puretun sanan ja tunnistaa harhauttavat yhtälöt. Vie vastausavain erillisenä tiedostona kaupallisiin tuotepaketteihin.',
      },
      {
        title: 'Tulostuvalmis vienti 400+ DPI:nä harmaa-asteilla',
        description:
          'Lataa työarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina. Vientimoottori renderöi yli 400 DPI:nä. Ota käyttöön harmaa-astetila musteystävällisiin versioihin. Letter, A4, Neliö ja mukautetut sivukoot ovat kaikki tuettuja.',
      },
      {
        title: 'Täysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisäänrakennettu Fabric.js-piirtoalusta antaa sinun vetää, skaalata, kiertää ja siirtää jokaista elementtiä. Zoomaa sisään prosenttinäytöllä tarkkaan sijoitteluun ja käytä Ctrl+Z ja Ctrl+Y rajattomaan kumoa- ja tee uudelleen -toimintoon. Lukitse elementtejä, käytä justeraustyökaluja ja objektiryhmittelyä graafisen suunnitteluohjelman joustavuudella.',
      },
    ],
  },

  businessUseCases: {
    title: 'Näin Myyt Koodiyhteenlasku Työarkkeja Verkossa',
    cases: [
      {
        title: 'Koodimurtamispulmapaketit Etsyssä',
        description:
          'Luo teemakohtaisia paketteja 10–20 koodiyhteenlaskupulmasta — dinosaurusetsivät, meritutkijat, avaruusmissiot — ja tarjoa niitä suorana latauksena Etsyssä. Jokainen paketti sisältää työarkit plus vastausavaimet erillisinä tiedostoina. Koodimurtamismuoto erottuu visuaalisesti hakutuloksissa tavallisista yhteenlaskutyöarkeista. Sisällytä sekä Klassinen Tila että Paljasta Sana -pulmat jokaiseen pakettiin. Hinnoittele teemakohtaiset paketit 3–5 euroon ja moniteemaiset megapaketit 12–18 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Pulmatyökirjat Amazon KDP:ssä',
        description:
          'Kokoa 50–100 koodiyhteenlaskupulmaa aktiviteettikirjaksi Amazon KDP -muodossa. Rakenteista kirja nousevalla vaikeustasolla: aloita kahdella symbolilla ja matalilla alueilla (1–5), etene viiteen symboliin alueilla 20:een asti, ja päätä Paljasta Sana -haasteisiin. Koodimurtamis-matikkakirjat täyttävät nichen, jossa on vähemmän kilpailua kuin tavallisissa yhteenlaskutyökirjoissa.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut matematiikkatuotteet Gumroadiin',
        description:
          'Luo koodiyhteenlaskusarjoja tasoittain: Taso 1 (kaksi symbolia, summat alle 10), Taso 2 (kolme symbolia, summat alle 15), Taso 3 (neljä tai viisi symbolia, summat 20:een asti) ja bonustaso Paljasta Sana, jossa käyttäjät purkavat sanastosanoja. Jokainen taso vastausavaimella ja edistymisen seurantalomakkeella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Monikieliset pulmapaketit omassa verkkokaupassa',
        description:
          'Hyödynnä monikielistä Paljasta Sana -ominaisuutta luodaksesi koodiyhteenlaskupaketteja eri kielillä ja myy ne Gumroadin, Shopifyn tai Payhipin kautta. Suomenkielinen paketti käyttää oikeaa suomalaista aakkostoa ä:llä ja ö:llä; saksankielinen paketti sisältää umlautit. Tämä on markkinamahdollisuus — käytännössä mikään kilpaileva generaattori ei tarjoa kielikohtaisia koodimurtamispulmia.',
        platform: 'Gumroad / Shopify / Payhip',
      },
      {
        title: 'Sitouttavaa laskentaa verkossa ja yksityisopetuksessa',
        description:
          'Käytä koodiyhteenlasku työarkkeja muuttamaan päivittäinen matematiikkaharjoittelu peliksi. Jaa Klassinen Tila -pulma lämmittelyhaasteen, jossa ensimmäinen koodin murtava käyttäjä voittaa. Käytä Paljasta Sana -tilaa koodaamaan sanastosanan, tosiseikan tai motivoivan viestin. Pulmamuoto muuttaa rutiininomaisen harjoitusarkin mysteerioaktiviteetiksi.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Miten koodimurtamismekanismi toimii?',
      answer:
        'Jokainen kuva työarkissa edustaa salaa tiettyä numeroa. Työarkki näyttää yhteenlaskuyhtälöitä, joissa yhteenlaskettavat ja summat näkyvät kuvina numeroiden sijaan. Käyttäjät ratkaisevat yhtälöt logiikalla ja päättelyllä: jos kissa plus koira on seitsemän ja kissa plus kissa on kuusi, niin kissa on kolme ja koira neljä.',
    },
    {
      question: 'Mikä on Paljasta Sana -tila?',
      answer:
        'Paljasta Sana -tila antaa sinun kirjoittaa salaisen sanan enintään kymmenellä kirjaimella. Generaattori luo yhden yhtälön jokaista kirjainta kohti — jokaisen yhtälön summa vastaa tiettyä kirjainta purkutaulukossa. Käyttäjät ratkaisevat yhtälöt, etsivät jokaisen summan taulukosta ja muodostavat piilotetun sanan. Kolme harhauttavaa yhtälöä lisätään automaattisesti.',
    },
    {
      question: 'Miten kuvasymbolit vastaavat numeroita?',
      answer:
        'Kun luot työarkin, sovellus määrää satunnaisesti uniikin numeron jokaiselle valitulle kuvalle. Esimerkiksi kolmella kuvalla ja alueella 1–10 kissa voi olla 3, raketti 7 ja tähti 5. Määritys on satunnainen jokaisella kerralla. Vastausavain paljastaa yhteyden asettamalla jokaisen numeron kuvansa päälle.',
    },
    {
      question: 'Mitä lukualueita voin asettaa koodiyhteenlaskutehtäviin?',
      answer:
        'Voit asettaa minimi- ja maksimiarvot 1:sta 20:een. Alueen on oltava riittävän laaja tarjotakseen uniikit numerot kaikille symboleillesi — jos valitset viisi symbolia, tarvitset vähintään viisi eri numeroa alueellasi. Sovellus validoi tämän automaattisesti.',
    },
    {
      question: 'Kuinka monta symbolia voin käyttää työarkkia kohti?',
      answer:
        'Voit valita kahdesta viiteen uniikkia kuvasymboolia työarkkia kohti. Vähemmät symbolit luovat helpompia pulmia; useammat symbolit luovat monimutkaisia haasteita, jotka vaativat useiden tuntemattomien seurantaa.',
    },
    {
      question: 'Onko Koodiyhteenlasku kieliriippuvainen?',
      answer:
        'Kyllä — Koodiyhteenlasku on ainoa kieliriippuvainen sovellus Matematiikan Mestaripaketti -kategoriassa. Klassisessa Tilassa työarkit ovat puhtaasti visuaalisia ja toimivat kaikilla kielillä. Paljasta Sana -tila kuitenkin käyttää valitun kielen aakkostoa summien yhdistämiseen kirjaimiin. Suomi sisältää ä ja ö; saksa sisältää Ä, Ö, Ü ja ß. Kaikilla yhdellätoista tuetulla kielellä on omat täysin oikeat aakkostonsa sisäänrakennettuina.',
    },
    {
      question: 'Miten vastausavain näyttää ratkaisut?',
      answer:
        'Vastausavain toistaa työarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin päälle. Paljasta Sana -tilassa vastausavain näyttää myös puretun salaisen sanan ja tunnistaa harhauttavat yhtälöt. Vie se erillisenä JPEG- tai PDF-tiedostona.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kyllä. Sinulla on pääsy kaikkiin ominaisuuksiin — molempiin tiloihin, kaikkiin symbolimääriin, täyteen kuvakirjastoon, Paljasta Sana -tilaan kaikilla yhdellätoista kielellä, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisältävät pienen vesileiman.',
    },
    {
      question: 'Tarvitseeko ohjelmistoa asentaa?',
      answer:
        'Ei. Koodiyhteenlasku Työarkkien Generaattori toimii täysin selaimessasi. Mitään ei tarvitse ladata, asentaa tai päivittää. Se toimii kaikissa moderneissa selaimissa, mukaan lukien Chrome, Firefox, Safari ja Edge. Avaa sivu ja aloita matemaattisten koodimurtamispulmien luominen.',
    },
    {
      question: 'Sopivatko koodiyhteenlaskutehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Tehtävät sopivat parhaiten alkuopetukseen (1.–2. luokka) ja alakouluun (3.–6. luokka), koska ne yhdistävät laskemisen ja koodinpurun. Esiopetukseen lukualueen kannattaa rajoittaa 1–5:een ja käyttää Paljasta Sana -tilaa.',
    },
    {
      question: 'Noudattavatko koodiyhteenlaskutehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät yhdistävät OPS 2014:n matematiikan peruslaskutoimitukset (T5, T6) ja laaja-alaisen osaamisen ongelmanratkaisutaitoja (L1). Koodinpurkumekanismi kehittää loogista ajattelua ja päättelykykyä, joita opetussuunnitelma painottaa.',
    },
    {
      question: 'Miten luon koodiyhteenlaskutehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse tila (Paljasta Sana tai muu), aseta lukualue ja symbolien määrä, kirjoita viesti ja valitse teemakuvat. Napsauta Luo — generaattori yhdistää laskutehtävät ja salaisen viestin automaattisesti.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Kokeile ennen ostamista ilmaisella kokeilulla — kaikki ominaisuudet ovat saatavilla työkalun täydelliseen arviointiin ennen ostoa. Koska ilmainen kokeilu antaa täyden pääsyn, emme tarjoa palautuksia lisenssiostoista. Varmista, että työkalu sopii tarpeisiisi käytä ilmaista kokeilua ennen ostamista.',
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
      slug: 'matikkapulmapeli-tyoarkit',
      anchorText: 'Matikkapulmapeli Työarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'matematiikan-mestaripaketti',
      anchorText: 'Matematiikan Mestaripaketti — Kaikki Matematiikkatyökalut',
    },
    {
      pageType: 'guide',
      slug: 'luo-yhteenlaskutyoarkkeja',
      anchorText: 'Näin Luot Yhteenlaskutyöarkkeja, Jotka Myyvät',
    },
    {
      pageType: 'guide',
      slug: 'myy-matematiikkatyoarkkeja-etsy',
      anchorText: 'Opas Matematiikkatyöarkkien Myymiseen Etsyssä',
    },
    {
      pageType: 'idea',
      slug: 'avaruus-tulostettavat-ideat',
      anchorText: 'Avaruus tulostettavat ideat opetuksellisiin työarkkeihin',
    },
    {
      pageType: 'start',
      slug: 'luo-tyoarkkeja-jotka-myyvat',
      anchorText: 'Luo työarkkeja, jotka myyvät',
    },
    {
      pageType: 'tool',
      slug: 'koodi-yhteenlasku-generaattori',
      anchorText: 'Looking for the free browser version? Try the free maker tool.',
    },
    {
      pageType: 'tool',
      slug: 'kdp-royalty-calculator',
      anchorText: 'Calculate KDP royalties for your activity books',
    },
    {
      pageType: 'tool',
      slug: 'kdp-size-calculator',
      anchorText: 'Pick the right KDP book size & margins',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/code%20addition/salainen-koodi-yhteenlasku-1.webp',
      primaryAlt: 'Koodiyhteenlasku työarkki eläinkuvilla, jotka piilottavat salaisia numeroita koodimurtamispulmassa',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/code%20addition/salainen-koodi-yhteenlasku-1.webp',
        alt: 'Koodiyhteenlasku työarkki Klassisessa Tilassa temaattisilla eläinkuvilla koodisymboleina',
        caption: 'Klassinen Tila — käyttäjät murtavat koodin päättelemällä, mitkä numerot kuvat edustavat',
      },
      {
        src: '/samples/finnish/code%20addition/salainen-koodi-yhteenlasku-2.webp',
        alt: 'Koodiyhteenlasku työarkki toisella visuaalisella teemalla kryptaritmeettisilla yhtälöillä',
        caption: 'Monisymbolihaaste — useammat kuvat lisäävät päättelyn monimutkaisuutta',
      },
      {
        src: '/samples/finnish/code%20addition/salainen-koodi-yhteenlasku-1-answer-key.webp',
        alt: 'Koodiyhteenlaskupulma työarkki värikkäillä teemakuvilla ja yhtälöillä',
        caption: 'Teemapulmat — 104 visuaalista teemaa tekevät jokaisesta työarkista ainutlaatuisen ja sitouttavan',
      },
    ],
    youtubeId: 'vVd11Kjk9iA',
    videoTitle: 'Luo Koodiyhteenlasku Työarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
