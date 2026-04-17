import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'matikkapelejä tulostaa',
    secondaryKeywords: [
      'matikkapulmia tehtäviä',
      'matikka-arvoituksia tulostaa',
      'hauskoja matikkatehtäviä',
      'leikkisiä matikkatehtäviä',
    ],
    lsiKeywords: [
      'alakoulu',
      'yhteenlasku',
      'vähennyslasku',
      'kuvapulma',
      'vastaukset',
    ],
    titleTag: 'Matematiikkapulmakone | LessonCraftStudio',
    metaDescription: 'Luo matikkapulmia kuvilla, joissa lapset ratkovat laskuja yhdistääkseen kuvia. Vastaukset mukana. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Matematiikkapulmakone — Luo tulostettavia Etsy- ja KDP-myyntiin',
    tagline: 'Yhdistä matematiikkaharjoittelu pulmanratkaisun jännitykseen — jokainen palanen sisältää tehtävän, jokainen ratkaisu paljastaa kuvan.',
    description:
      'Luo sitouttavia matikkapulmapeli työarkkeja, joissa kuva jaetaan ruudukkoon palasia, joissa jokaisessa on yhteen- tai vähennyslaskutehtävä. Käyttäjät ratkaisevat tehtävät ja yhdistävät numeroidut vastaukset sekoitettuihin palapelin paloihin ruudukon alla — näin muutetaan rutiininomainen laskenta visuaaliseksi mysteeriksi. Määrittele ruudukon koot 2x2:sta 4x4:ään luodaksesi pulmia 4:stä 16 palaseen, ja valitse yhteenlasku, vähennyslasku tai sekalaskutoimitukset sopimaan mihin tahansa taitotasolle. Selaa yli 3 100 kuvitusta 104 teemassa. Jokainen työarkki luo automaattisen vastausavaimen ratkaistulla ruudukolla täysin kootun kuvan vierellä. Vie tulostusvalmiita PDF- ja JPEG-tiedostoja 400+ DPI:llä Letter-, A4- tai mukautetuissa koissa. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Lataukset sisältävät vesileiman; osta lisenssi sen poistamiseksi.',
  },

  ctaHeading: 'Luo matematiikkapulmia',

  howItWorks: {
    title: 'Näin Luot Matikkapulmapeli Työarkkeja Viidessä Vaiheessa',
    steps: [
      {
        title: 'Aseta sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Oletustyöarkki (800x1000) tai Neliö (1200x1200). Valitse taustaväri, valitse koristeellinen taustateema kuvakirjastosta ja säädä läpinäkyvyyttä. Lisää yhteensopiva koristeellinen kehys ammattimaiseen ulkoasuun.',
      },
      {
        title: 'Määrittele pulmaruudukko ja laskutoimitukset',
        description:
          'Avaa Pulma-asetukset -paneeli ja aseta rivien (2–4) ja sarakkeiden (2–4) määrä määritelläksesi kuinka monta palasta palapelissä on — yksinkertaisesta 2x2-ruudukosta 4 palasella haastavaan 4x4-ruudukkoon 16 palasella. Valitse sitten laskutoimitus: Yhteenlasku luo tehtäviä, joissa kaksi lukua lasketaan yhteen palan ratkaisuarvoon, Vähennyslasku luo tehtäviä, joissa erotus antaa ratkaisun, ja Sekatila yhdistää molemmat satunnaisesti ruudukkoon.',
      },
      {
        title: 'Valitse kuva teemakirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa. Käytä hakupalkkia löytääksesi tiettyjä kuvia. Valitse haluamasi kuva palapelin kuvaksi; generaattori jakaa sen automaattisesti määrittelemiisi ruudukkoruutuihin. Voit myös ladata omia kuvia täysin ainutlaatuisiin pulmiin.',
      },
      {
        title: 'Lisää tekstiä, otsikoita ja yksityiskohtia',
        description:
          'Käytä Työkalut-paneelia lisätäksesi työarkin otsikon, nimi- ja päivämääräkentät, ohjeet tai muuta mukautettua tekstiä. Valitse seitsemästä fontista. Säädä fonttikokoa, väriä ja ääriviivaa maksimaalisen luettavuuden saavuttamiseksi. Käytä Fabric.js-piirtoalustaa elementtien vetämiseen, skaalaamiseen ja sijoitteluun.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle ja napsauta Luo Vastausavain luodaksesi ratkaistun version pulmastasi valmiilla ruudukolla ja täysin kootulla kuvalla. Vie sekä työarkki että vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona. Ota käyttöön harmaa-astevienti musteystävällisiin versioihin. Jokainen vienti renderöidään yli 400 DPI:llä.',
      },
    ],
  },

  keyFeatures: {
    title: 'Matikkapulmapeli Työarkkien Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Kuvapalamuoto matematiikkatehtävillä',
        description:
          'Jokainen työarkki näyttää valitun kuvan jaettuna ruudukkoon soluja, joissa jokaisessa on matematiikkatehtävä. Ruudukon alla näkyvät sekoitetut palapelin palaset, jotka käyttäjien on yhdistettävä ratkaisemalla jokainen tehtävä ja sovittamalla vastaus oikeaan palaseen. Tämä kaksivaiheinen asettelu — ratkaise laskut, kokoa palapeli — muuttaa peruslaskennan visuaaliseksi haasteeksi, joka motivoi käyttäjiä suorittamaan jokaisen tehtävän.',
      },
      {
        title: 'Säädettävä ruudukon koko 4:stä 16 palaseen',
        description:
          'Aseta rivit 2:sta 4:ään ja sarakkeet 2:sta 4:ään luodaksesi pulmia aloittelijaystävällisestä 2x2-ruudukosta (4 palasta) haastavaan 4x4-ruudukkoon (16 palasta). Pienet ruudukot toimivat hyvin esikouluikäisille, kun taas suuret ruudukot tarjoavat laajaa harjoittelua 1. ja 2. luokkalaisille. Ruudukon koko määrää suoraan tehtävien määrän, mikä tekee vaikeustasojen erittelystä yhtä helppoa kuin kahden liukusäätimen säätämisen.',
      },
      {
        title: 'Kolme laskutoimitusta jokaiselle tasolle',
        description:
          'Valitse Yhteenlasku tehtäville, joissa kaksi lukua lasketaan yhteen palan arvoon, Vähennyslasku tehtäville, joissa erotus antaa vastauksen, tai Sekatila molempien laskutoimitusten satunnaistamiseen ruudukon yli. Ratkaisut luodaan automaattisesti sekoitettuna sarjana 2:sta N:ään (jossa N on palojen kokonaismäärä), varmistaen jokaisen vastauksen olevan uniikki.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla',
        description:
          'Selaa yli 3 100 korkearesoluutioisen kuvituksen kirjastoa 104 teemassa. Valitse kuva palapelin kuvaksi — generaattori hoitaa jakamisen automaattisesti. Koska pulmamuoto on täysin visuaalinen, työarkkisi toimivat moitteettomasti kaikilla kielillä ja kaikilla markkinoilla ilman muokkaamista.',
      },
      {
        title: 'Automaattinen vastausavaimen luominen',
        description:
          'Napsauta yhtä painiketta luodaksesi täyden vastausavaimen, joka näyttää ratkaistun ruudukon kaikilla oikein vastatuilla tehtävillä täysin kootun kuvan vierellä. Vastausavain tarjoaa välitöntä visuaalista vahvistusta. Vie vastausavain erillisenä JPEG- tai PDF-tiedostona tuotepaketteihin.',
      },
      {
        title: 'Tulostuvalmis vienti 400+ DPI:llä harmaa-asteilla',
        description:
          'Lataa työarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina yli 400 DPI:llä. Ota käyttöön harmaa-astevienti musteystävällisiin versioihin. Letter, A4, Oletustyöarkki, Neliö ja mukautetut koot ovat kaikki tuettuja.',
      },
      {
        title: 'Lataa omia kuvia ainutlaatuisiin pulmiin',
        description:
          'Lataa omia PNG- tai JPEG-kuvia suoraan generaattoriin. Ihanteellinen brändätyille pulmapeli työarkeille, kausiluonteiselle sisällölle tai mukautetulle clipartille. Ladatut kuvat integroituvat saumattomasti pulmaruudukkojärjestelmään.',
      },
      {
        title: 'Täysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisäänrakennettu Fabric.js-piirtoalusta antaa sinun vetää, skaalata, kiertää ja siirtää jokaista elementtiä — tekstiä, pulmaruudukkoa, kehyksiä ja taustoja. Käytä tasonhallintaa, justeraustyökaluja ja lukitus/avaus-toimintoja rajattomalla kumoa- ja tee uudelleen -toiminnolla.',
      },
    ],
  },

  businessUseCases: {
    title: 'Näin Myyt Matikkapulmapeli Työarkkeja Verkossa',
    cases: [
      {
        title: 'Teemakohtaiset matikkapulmapaketit Etsyssä',
        description:
          'Luo 10–20 matikkapulmapeli työarkin sarjoja ryhmiteltyinä teemoittain ja tarjoa niitä suorana latauksena Etsyssä. Sisällytä vastausavaimet bonustiedostoina. Pulmamuoto erottuu tavallisista harjoitusarkeista. Hinnoittele yksittäiset teemapaketit 3–5 euroon ja megapaketit 12–18 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Matikkapulmapeli aktiviteettikirjat Amazon KDP:ssä',
        description:
          'Kokoa 50–100 matikkapulmapeli työarkkia painetuksi aktiviteettikirjaksi Amazon KDP -muodossa. Käytä nousevaa vaikeustasoa — aloita 2x2 yhteenlaskupulmista ja etene 4x4 sekalaskutoimituksiin. Matikkapulmakirjat täyttävät vähemmän kilpaillun nichen kuin tavalliset työarkkikirjat.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut matematiikkatuotteet Gumroadiin',
        description:
          'Luo matikkapulmapelisarjoja tasoittain ruudukon koon mukaan: Taso 1 (2x2 yhteenlasku, 4 palasta), Taso 2 (2x3 yhteenlasku, 6 palasta), Taso 3 (3x3 vähennyslasku, 9 palasta) ja Taso 4 (4x4 sekatila, 16 palasta). Pakkaa jokainen taso vastausavaimella ja edistymisen seurantalomakkeella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Digitaaliset tuotteet omassa verkkokaupassa',
        description:
          'Käytä generaattoria tuottamaan viikottaisia matikkapulmapelipaketteja ja jakele ne oman verkkokauppasi kautta. Tilausmalli — uusi teemapulmapelipaketti joka viikko — luo toistuvaa tuloa. Kolme laskutoimitusta, vaihtelevat ruudukkokoot ja 104 teemaa tarjoavat riittävästi yhdistelmiä vuosien sisältöön.',
        platform: 'Gumroad / Shopify / Payhip',
      },
      {
        title: 'Matikkapulmapelit verkossa ja yksityisopetuksessa',
        description:
          'Luo räätälöityjä matikkapulmapelejä jokaiselle käyttäjälle taitotason mukaan. Tulosta yksinkertaisia 2x2 yhteenlaskupulmia aloittelijoille ja monimutkaisia 4x4 sekalaskutoimituspulmia edistyneille — kaikki samassa istunnossa. Pulmapaljastusmekanismi motivoi käyttäjiä suorittamaan jokaisen tehtävän nähdäkseen koko kuvan.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Miten matikkapulmapelimuoto toimii?',
      answer:
        'Valittu kuva jaetaan ruudukkoon soluja. Jokainen solu sisältää matematiikkatehtävän (yhteenlasku, vähennyslasku tai sekalaskutoimitus). Ruudukon alla näkyvät samat kuvapalat sekoitettuina ja numeroituina. Käyttäjät ratkaisevat jokaisen tehtävän ja yhdistävät vastauksen oikeaan sekoitettuun palaseen — kun kaikki palaset on oikein yhdistetty, palapeli on ratkaistu ja koko kuva paljastuu.',
    },
    {
      question: 'Mitä ruudukon kokoja on saatavilla?',
      answer:
        'Voit asettaa rivit 2:sta 4:ään ja sarakkeet 2:sta 4:ään, luoden pulmia 4 palasella (2x2) 16 palaseen (4x4). Pienet ruudukot ovat ihanteellisia nuoremmille käyttäjille, kun taas suuret ruudukot tarjoavat enemmän tehtäviä ja suuremman pulmapelihaasteen.',
    },
    {
      question: 'Mitä laskutoimituksia Matikkapulmapeli Generaattori tukee?',
      answer:
        'Generaattori tukee kolmea laskutoimitustilaa: Yhteenlasku (kaksi lukua, jotka lasketaan yhteen ratkaisuun), Vähennyslasku (erotus antaa ratkaisun) ja Sekatila (molemmat laskutoimitukset satunnaisesti ruudukon yli).',
    },
    {
      question: 'Ovatko matikkapulmapeli työarkit kieliriippuvaisia?',
      answer:
        'Eivät. Matikkapulmapeli työarkit ovat täysin visuaalisia — sisältö käyttää kuvia ja numeroita, ei sanoja. Millä tahansa kielellä luotu pulmapeli toimii maailmanlaajuisesti.',
    },
    {
      question: 'Luoko generaattori vastausavaimia pulmiin?',
      answer:
        'Kyllä. Napsauta Luo Vastausavain -painiketta luodaksesi ratkaistun version valmiilla ruudukolla, jossa kaikki matikkasvastaukset on täytetty, täysin kootun kuvan vierellä. Voit esikatsella ja ladata sen erillisenä JPEG- tai PDF-tiedostona.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kyllä. Sinulla on pääsy kaikkiin ominaisuuksiin — kaikkiin kolmeen laskutoimitustilaan, kaikkiin ruudukon kokoihin, täyteen kuvakirjastoon, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisältävät pienen vesileiman.',
    },
    {
      question: 'Sopivatko matikkapulmatehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Pienimmät ruudukot (3×3) ja yhteenlasku sopivat alkuopetukseen. Suuremmat ruudukot ja useat laskutoimitukset haastavat alakoulun ylemmät luokat. Kuvapohjaisuus tekee tehtävistä kiinnostavia kaikille ikäryhmille.',
    },
    {
      question: 'Noudattavatko matikkapulmatehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät yhdistävät OPS 2014:n matematiikan peruslaskutoimitukset (T5, T6) ja laaja-alaisen osaamisen ongelmanratkaisutaidot (L1). Ruudukkomuoto kehittää loogista päättelyä ja strategista ajattelua, joita opetussuunnitelma painottaa.',
    },
    {
      question: 'Miten luon matikkapulmatehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse ruudukon koko (3×3, 4×4 tai 5×5), valitse laskutoimitukset (yhteenlasku, vähennyslasku tai molemmat), aseta lukualue, valitse teemakuvat ja napsauta Luo. Pulma ja vastausavain syntyvät automaattisesti.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa sinulle pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata jokaisen laskutoimituksen, jokaisen ruudukon koon, jokaisen teeman ja jokaisen vientimuodon ennen ostamista. Ilmainen kokeilu on palautuskäytäntö.',
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
      pageType: 'idea',
      slug: 'matematiikan-perusteet-tulostettavat-ideat',
      anchorText: 'Matematiikan perusteet tulostettavat ideat myyjille',
    },
    {
      pageType: 'start',
      slug: 'luo-tyoarkkeja-jotka-myyvat',
      anchorText: 'Luo työarkkeja, jotka myyvät',
    },
    {
      pageType: 'tool',
      slug: 'math-puzzle-worksheet-maker',
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
      primary: '/samples/finnish/math%20puzzle/matematiikkapulmat-1.webp',
      primaryAlt: 'Matikkapulmapeli työarkki värikkäällä kuvalla jaettuna ruudukkopalasiin, joissa jokaisessa on yhteenlaskutehtävä',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/math%20puzzle/matematiikkapulmat-2.webp',
        alt: 'Matikkapulmapeli työarkki 3x3 yhteenlaskuruudukolla eläinteemalla',
        caption: 'Yhteenlaskutila — 3x3 ruudukko 9 palapelin palasella ja sekoitetuilla vastauksilla alla',
      },
      {
        src: '/samples/finnish/math%20puzzle/matematiikkapulmat-3.webp',
        alt: 'Matikkapulmapeli työarkki 2x3 vähennyslaskuruudukolla luontoteemalla',
        caption: 'Vähennyslaskutila — 2x3 ruudukko nopeaan 6 palan pulmahaasteeseen',
      },
      {
        src: '/samples/finnish/math%20puzzle/matematiikkapulmat-1-answer-key.webp',
        alt: 'Matikkapulmapeli työarkki 4x4 sekalaskutoimitusruudukolla ajoneuvoteemalla',
        caption: 'Sekatila — 4x4 ruudukko 16 palasella edistyneeseen matematiikkaharjoitteluun',
      },
    ],
    youtubeId: 'n5QO39Lq5l8',
    videoTitle: 'Luo Matikkapulmapeli Työarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
