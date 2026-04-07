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
    titleTag: 'Salainen viesti laskutehtävillä | Koodinmurtaja-generaattori',
    metaDescription: 'Luo tehtäviä, joissa lapset ratkovat yhteenlaskuja murtaakseen salaisia viestejä. Teemakuvat, vastaukset mukana. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Koodiyhteenlasku Tyoarkkien Generaattori — Matikkapulmia Ratkottavaksi',
    tagline: 'Muuta yhteenlasku etsivatehtavaksi, jossa jokainen kuva piilottaa salaisen numeron.',
    description:
      'Luo kryptaritmeettisia yhteenlaskutyoarkkeja, jotka haastavat kayttajat murtamaan visuaalisen koodin. Jokainen kuva tyoarkissa edustaa salaa tiettyä numeroa — kayttajat ratkaisevat yhteenlaskutehtavia selvittaakseen, minkä numeron kukin kuva edustaa, yhdistäen laskutaitoja ja loogista ajattelua samassa harjoituksessa. Vaihda Paljasta Sana -tilaan, ja haaste kasvaa: kirjoita salainen sana enintaan kymmenella kirjaimella, ja jokainen oikein ratkaistu yhtalö paljastaa kirjaimen vastauksessa, kun taas kolme harhauttavaa yhtaloa vaaräillä summilla lisaavat jännitystä. Generaattori tukee yhtätoista kielikohtaista aakkostoa, mikä tekee Paljasta Sana -tilasta toimivan sisaanrakennetusti suomeksi, ruotsiksi, englanniksi, saksaksi, ranskaksi ja seitsemalla muulla kielella. Suomen aakkoset sisaltavat ä ja ö, joten salaiset sanat nailla kirjaimilla toimivat luonnollisesti. Valitse yli 3 100 kuvasta 104 teemassa, maarittele lukualueet 1:sta 20:een kahdesta viiteen koodisymboliin tyoarkkia kohti, ja vie tulostusvalmiita PDF- tai JPEG-tiedostoja yli 400 DPI:na automaattisilla vastausavaimilla. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteroitymista, ei luottokorttia. Lataukset sisaltavat vesileiman; osta lisenssi sen poistamiseksi.',
  },

  howItWorks: {
    title: 'Nain Luot Koodiyhteenlasku Tyoarkkeja Viidessa Vaiheessa',
    steps: [
      {
        title: 'Maarittele sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Nelio (1200x1200) tai mukautettu koko. Valitse taustavari tai valitse koristeellinen teema kuvakirjastosta ja saada lapinakyvyytta, jotta yhtalöt pysyvat luettavina. Lisaa yhteensopiva kehys antaaksesi tyoarkeillesi ammattimaisen ulkoasun ennen sisallon lisaamista.',
      },
      {
        title: 'Valitse tila ja maarittele koodi',
        description:
          'Avaa Harjoitusasetukset ja valitse Klassinen Tila puhtaaseen koodimurtamiseen tai Paljasta Sana -tila salaisen sanan upottamiseen. Klassisessa Tilassa asetat minimi- ja maksimiarvot yhteenlaskettaville (1–20) ja valitset kuinka monta uniikkia kuvasymboolia tyoarkkia kohti (2–5). Paljasta Sana -tilassa kirjoitat salaisen sanan enintaan kymmenella kirjaimella — sovellus luo yhden yhtalön jokaista kirjainta kohti, jonka summa vastaa kyseista kirjainta, plus kolme harhauttavaa yhtaloa vaarilla summilla haasteen lisaamiseksi.',
      },
      {
        title: 'Valitse kuvia teemakirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa — elaimista ja dinosauruksista avaruuteen ja juhlapyhiin. Valitsemasi kuvat tulevat koodisymboleiksi tyoarkkiisi: jokainen kuva vastaa piilotettua numeroa, jonka kayttajien pitaa selvittaa. Voit myos ladata omia PNG- tai JPEG-kuvia henkilökohtaisiin ja kausiluonteisiin pulmiin.',
      },
      {
        title: 'Lisaa tekstia, otsikoita ja asetuksia',
        description:
          'Kaytta Tyokalut-paneelia lisataksesi otsikon, nimi- ja paivamaarakentat, ohjeet tai mukautetun tekstin. Valitse seitsemasta selkeasta fontista. Ota kayttoon tai poista kaytosta tehtavanumerot, nayta tai piilota otsikko ja kehys, ja ota kayttoon harmaa-astetila kustannustehokkaaseen tulostukseen. Jokainen asetus paivittaa piirtoalustan esikatselun reaaliajassa.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-valilehdelle ja napsauta Luo luodaksesi ratkaistun version tyoarkistasi. Vastausavain toistaa tyoarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin paalle, tehden ratkaisuista taysin selvia. Paljasta Sana -tilassa vastausavain nayttaa myos puretun sanan ja tunnistaa harhauttavat yhtalöt. Vie seka tyoarkki etta vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona yli 400 DPI:na.',
      },
    ],
  },

  keyFeatures: {
    title: 'Koodiyhteenlasku Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Koodimurtamismekanismi — kuvat piilotettuja numeroina',
        description:
          'Taman generaattorin maaritteleva ominaisuus on sen kryptaritmeettinen moottori. Jokainen kuva tyoarkissa edustaa salaa tiettyä numeroa. Kayttajat ratkaisevat yhteenlaskuyhtalöita, joissa yhteenlaskettavat ja summat nakyyvat kuvina numeroiden sijaan, ja kayttavat sitten loogista paattelya selvittaakseen, mitka numerot kukin kuva edustaa. Tama muuttaa rutiininomaisen yhteenlaskuharjoituksen etsivatyyliseksi pulmaksi.',
      },
      {
        title: 'Paljasta Sana -tila salaisilla sanoilla',
        description:
          'Aktivoi Paljasta Sana -tila ja kirjoita salainen sana enintaan kymmenella kirjaimella. Generaattori luo yhden yhteenlaskuyhtalön jokaista kirjainta kohti — jokaisen yhtalön summa vastaa tiettyä kirjainta purkutaulukossa. Kayttajat ratkaisevat yhtalöt, etsivat jokaisen summan taulukosta ja muodostavat piilotetun sanan. Kolme harhauttavaa yhtalöä vaarillä summilla lisataan automaattisesti, pakottaen kayttajat tarkistamaan jokaisen vastauksen.',
      },
      {
        title: 'Kielikohtaiset aakkoset 11 kielelle',
        description:
          'Paljasta Sana -tila on taysin raataloity jokaiselle kielelle. Suomessa aakkoset sisaltavat ä ja ö. Saksa lisaa Ä, Ö, Ü ja ß. Ranska sisaltaa a, a, c, e, e ja muita aksenttimerkkeja. Jokainen yhtätoista tuetusta kielesta kayttaa omaa oikeaa aakkostoaan, joten salaiset sanat diakriittisillä merkeilla toimivat luonnollisesti. Tama tekee Koodiyhteenlaskusta ainoan markkinoilla olevan tyoarkkigeneraattorin, joka tuottaa monikielisia koodimurtamispulmia.',
      },
      {
        title: 'Saadettavat lukualueet ja symbolimaarat',
        description:
          'Aseta minimi- ja maksimiarvot yhteenlaskettaville 1:sta 20:een hallitaksesi tehtavien vaikeustasoa. Valitse kahdesta viiteen uniikkia kuvasymboolia tyoarkkia kohti saataaksesi paattelyn monimutkaisuutta — kaksi symbolia luo helpon pulman nuoremmille kayttajille, kun taas viisi symbolia vaatii useiden tuntemattomien seurantaa lapi useiden yhtalöiden.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla',
        description:
          'Tutustu kirjastoon, jossa on yli 3 100 kuvitusta 104 teemassa. Koodiyhteenlaskussa kuvat toimivat itse koodisymboleina — kayttajat nakevat kissan, raketin ja muffinin ja heidän taytyy paatella, etta kissa on 3, raketti 7 ja muffini 5. Teemapulmat ovat vastustamattomia lapsille ja erittain myytavia tulostettavina tuotteina.',
      },
      {
        title: 'Automaattinen vastausavain numeropeitteella',
        description:
          'Luo taysin vastausavain yhdella napsautuksella. Vastausavain toistaa tyoarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin paalle. Paljasta Sana -tilassa vastausavain nayttaa myos puretun sanan ja tunnistaa harhauttavat yhtalöt. Vie vastausavain erillisenä tiedostona kaupallisiin tuotepaketteihin.',
      },
      {
        title: 'Tulostuvalmis vienti 400+ DPI:na harmaa-asteilla',
        description:
          'Lataa tyoarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina. Vientimoottori renderoi yli 400 DPI:na. Ota kayttoon harmaa-astetila musteystävallisiin versioihin. Letter, A4, Nelio ja mukautetut sivukoot ovat kaikki tuettuja.',
      },
      {
        title: 'Taysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisaanrakennettu Fabric.js-piirtoalusta antaa sinun vetaa, skaalata, kiertaa ja siirtaa jokaista elementtia. Zoomaa sisaan prosenttinäytöllä tarkkaan sijoitteluun ja kaytta Ctrl+Z ja Ctrl+Y rajattomaan kumoa- ja tee uudelleen -toimintoon. Lukitse elementteja, kaytta justeraustyokaluja ja objektiryhmittelya graafisen suunnitteluohjelman joustavuudella.',
      },
    ],
  },

  businessUseCases: {
    title: 'Nain Myyat Koodiyhteenlasku Tyoarkkeja Verkossa',
    cases: [
      {
        title: 'Koodimurtamispulmapaketit Etsyssa',
        description:
          'Luo teemakohtaisia paketteja 10–20 koodiyhteenlaskupulmasta — dinosaurusetsivat, meritutkijat, avaruusmissiot — ja tarjoa niita suorana latauksena Etsyssa. Jokainen paketti sisaltaa tyoarkit plus vastausavaimet erillisinä tiedostoina. Koodimurtamismuoto erottuu visuaalisesti hakutuloksissa tavallisista yhteenlaskutyoarkeista. Sisallyta seka Klassinen Tila etta Paljasta Sana -pulmat jokaiseen pakettiin. Hinnoittele teemakohtaiset paketit 3–5 euroon ja moniteemaiset megapaketit 12–18 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Pulmatyokirjat Amazon KDP:ssa',
        description:
          'Kokoa 50–100 koodiyhteenlaskupulmaa aktiviteettikirjaksi Amazon KDP -muodossa. Rakenteista kirja nousevalla vaikeustasolla: aloita kahdella symbolilla ja matalilla alueilla (1–5), etene viiteen symboliin alueilla 20:een asti, ja paata Paljasta Sana -haasteisiin. Koodimurtamis-matikkakirjat tayttavat nichen, jossa on vahemman kilpailua kuin tavallisissa yhteenlaskutyokirjoissa.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut matematiikkatuotteet Gumroadiin',
        description:
          'Luo koodiyhteenlaskusarjoja tasoittain: Taso 1 (kaksi symbolia, summat alle 10), Taso 2 (kolme symbolia, summat alle 15), Taso 3 (nelja tai viisi symbolia, summat 20:een asti) ja bonustaso Paljasta Sana, jossa kayttajat purkavat sanastosanoja. Jokainen taso vastausavaimella ja edistymisen seurantalomakkeella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Monikiellset pulmapaketit omassa verkkokaupassa',
        description:
          'Hyodynna monikielista Paljasta Sana -ominaisuutta luodaksesi koodiyhteenlaskupaketteja eri kielilla ja myy ne Gumroadin, Shopifyn tai Payhipin kautta. Suomenkielinen paketti kayttaa oikeaa suomalaista aakkostoa ä:lla ja ö:lla; saksankielinen paketti sisaltaa umlautit. Tama on markkinamahdollisuus — kaytannossa mikaan kilpaileva generaattori ei tarjoa kielikohtaisia koodimurtamispulmia.',
        platform: 'Gumroad / Shopify / Payhip',
      },
      {
        title: 'Sitouttavaa laskentaa verkossa ja yksityisopetuksessa',
        description:
          'Kaytta koodiyhteenlasku tyoarkkeja muuttamaan paivittainen matematiikkaharjoittelu peliksi. Jaa Klassinen Tila -pulma lämmittelyhaasteen, jossa ensimmainen koodin murtava kayttaja voittaa. Kaytta Paljasta Sana -tilaa koodaamaan sanastosanan, tosiseikan tai motivoivan viestin. Pulmamuoto muuttaa rutiininomaisen harjoitusarkin mysteerioaktiviteetiksi.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Miten koodimurtamismekanismi toimii?',
      answer:
        'Jokainen kuva tyoarkissa edustaa salaa tiettyä numeroa. Tyoarkki nayttaa yhteenlaskuyhtalöita, joissa yhteenlaskettavat ja summat nakyyvat kuvina numeroiden sijaan. Kayttajat ratkaisevat yhtalöt logiikalla ja paattelyllä: jos kissa plus koira on seitseman ja kissa plus kissa on kuusi, niin kissa on kolme ja koira nelja.',
    },
    {
      question: 'Mikä on Paljasta Sana -tila?',
      answer:
        'Paljasta Sana -tila antaa sinun kirjoittaa salaisen sanan enintaan kymmenella kirjaimella. Generaattori luo yhden yhtalön jokaista kirjainta kohti — jokaisen yhtalön summa vastaa tiettyä kirjainta purkutaulukossa. Kayttajat ratkaisevat yhtalöt, etsivat jokaisen summan taulukosta ja muodostavat piilotetun sanan. Kolme harhauttavaa yhtalöä lisataan automaattisesti.',
    },
    {
      question: 'Miten kuvasymbolit vastaavat numeroita?',
      answer:
        'Kun luot tyoarkin, sovellus maaraa satunnaisesti uniikin numeron jokaiselle valitulle kuvalle. Esimerkiksi kolmella kuvalla ja alueella 1–10 kissa voi olla 3, raketti 7 ja tahti 5. Maaritys on satunnainen jokaisella kerralla. Vastausavain paljastaa yhteyden asettamalla jokaisen numeron kuvansa paalle.',
    },
    {
      question: 'Mitä lukualueita voin asettaa koodiyhteenlaskutehtaviin?',
      answer:
        'Voit asettaa minimi- ja maksimiarvot 1:sta 20:een. Alueen on oltava riittavan laaja tarjotakseen uniikit numerot kaikille symboleillesi — jos valitset viisi symbolia, tarvitset vahintaan viisi eri numeroa alueellasi. Sovellus validoi taman automaattisesti.',
    },
    {
      question: 'Kuinka monta symbolia voin kayttaa tyoarkkia kohti?',
      answer:
        'Voit valita kahdesta viiteen uniikkia kuvasymboolia tyoarkkia kohti. Vahemmat symbolit luovat helpompia pulmia; useammat symbolit luovat monimutkaisia haasteita, jotka vaativat useiden tuntemattomien seurantaa.',
    },
    {
      question: 'Onko Koodiyhteenlasku kieliriippuvainen?',
      answer:
        'Kylla — Koodiyhteenlasku on ainoa kieliriippuvainen sovellus Matematiikan Mestaripaketti -kategoriassa. Klassisessa Tilassa tyoarkit ovat puhtaasti visuaalisia ja toimivat kaikilla kielilla. Paljasta Sana -tila kuitenkin kayttaa valitun kielen aakkostoa summien yhdistamiseen kirjaimiin. Suomi sisaltaa ä ja ö; saksa sisaltaa Ä, Ö, Ü ja ß. Kaikilla yhdellatoista tuetulla kielella on omat taysin oikeat aakkostonsa sisaanrakennettuina.',
    },
    {
      question: 'Miten vastausavain nayttaa ratkaisut?',
      answer:
        'Vastausavain toistaa tyoarkin suunnittelun ja asettaa piilotetun numeron suoraan kunkin kuvasymboolin paalle. Paljasta Sana -tilassa vastausavain nayttaa myos puretun salaisen sanan ja tunnistaa harhauttavat yhtalöt. Vie se erillisenä JPEG- tai PDF-tiedostona.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kylla. Sinulla on paasy kaikkiin ominaisuuksiin — molempiin tiloihin, kaikkiin symbolimaariin, tayteen kuvakirjastoon, Paljasta Sana -tilaan kaikilla yhdellatoista kielella, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisaltavat pienen vesileiman.',
    },
    {
      question: 'Mitä kaupallinen lisenssi sisaltaa?',
      answer:
        'Kaupallinen lisenssi poistaa vesileiman kaikista latauksista ja antaa rajoittamattomat oikeudet myyda luomiasi tyoarkkeja — Etsyssa, Amazon KDP:ssa, Gumroadissa, omalla verkkosivustollasi tai millä tahansa muulla alustalla. Ei rojalteja, ei kuukausimaksuja eika rajoituksia.',
    },
    {
      question: 'Voinko myyda talla tyokalulla luotuja tyoarkkeja Etsyssa ja Amazon KDP:ssa?',
      answer:
        'Kylla. Kaupallisella lisenssilla sinulla on taydet oikeudet myyda koodiyhteenlaskutyoarkkejasi digitaalisina latauksina Etsyssa, pulmakirjoina Amazon KDP:ssa, Gumroadissa tai millä tahansa muulla myyntikanavalla. Koodimurtamismuoto on todistetusti tehokas, koska se erottuu tavallisista yhteenlaskutyoarkeista hakutuloksissa.',
    },
    {
      question: 'Tarvitseeko ohjelmistoa asentaa?',
      answer:
        'Ei. Koodiyhteenlasku Tyoarkkien Generaattori toimii taysin selaimessasi. Mitaan ei tarvitse ladata, asentaa tai paivittaa. Se toimii kaikissa moderneissa selaimissa, mukaan lukien Chrome, Firefox, Safari ja Edge. Avaa sivu ja aloita matemaattisten koodimurtamispulmien luominen.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Kokeile ennen ostamista ilmaisella kokeilulla — kaikki ominaisuudet ovat saatavilla tyokalun taydelliseen arviointiin ennen ostoa. Koska ilmainen kokeilu antaa tayden pääsyn, emme tarjoa palautuksia lisenssiostoista. Varmista, etta tyokalu sopii tarpeisiisi kaytta ilmaista kokeilua ennen ostamista.',
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
      slug: 'matikkapulmapeli-tyoarkit',
      anchorText: 'Matikkapulmapeli Tyoarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'matematiikan-mestaripaketti',
      anchorText: 'Matematiikan Mestaripaketti — Kaikki Matematiikkatyokalut',
    },
    {
      pageType: 'guide',
      slug: 'luo-yhteenlaskutyoarkkeja',
      anchorText: 'Nain Luot Yhteenlaskutyoarkkeja, Jotka Myyvat',
    },
    {
      pageType: 'guide',
      slug: 'myy-matematiikkatyoarkkeja-etsy',
      anchorText: 'Opas Matematiikkatyoarkkien Myymiseen Etsyssa',
    },
    {
      pageType: 'idea',
      slug: 'avaruus-tulostettavat-ideat',
      anchorText: 'Avaruus tulostettavat ideat opetuksellisiin tyoarkkeihin',
    },
    {
      pageType: 'start',
      slug: 'luo-tyoarkkeja-jotka-myyvat',
      anchorText: 'Luo tyoarkkeja, jotka myyvat',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/code%20addition/Salainen%20Koodi%20Yhteenlasku%201.webp',
      primaryAlt: 'Koodiyhteenlasku tyoarkki elainkuvilla, jotka piilottavat salaisia numeroita koodimurtamispulmassa',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/code%20addition/Salainen%20Koodi%20Yhteenlasku%201.webp',
        alt: 'Koodiyhteenlasku tyoarkki Klassisessa Tilassa temaattisilla elainkuvilla koodisymboleina',
        caption: 'Klassinen Tila — kayttajat murtavat koodin paattelemalla, mitka numerot kuvat edustavat',
      },
      {
        src: '/samples/finnish/code%20addition/Salainen%20Koodi%20Yhteenlasku%202.webp',
        alt: 'Koodiyhteenlasku tyoarkki toisella visuaalisella teemalla kryptaritmeettisilla yhtalöilla',
        caption: 'Monisymbolihaaste — useammat kuvat lisaavat paattelyn monimutkaisuutta',
      },
      {
        src: '/samples/finnish/code%20addition/Salainen%20Koodi%20Yhteenlasku%201%20answer_key.webp',
        alt: 'Koodiyhteenlaskupulma tyoarkki varikkäilla teemakuvilla ja yhtalöilla',
        caption: 'Teemapulmat — 104 visuaalista teemaa tekevat jokaisesta tyoarkista ainutlaatuisen ja sitouttavan',
      },
    ],
    youtubeId: 'vVd11Kjk9iA',
    videoTitle: 'Luo Koodiyhteenlasku Tyoarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
