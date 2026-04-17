import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'ruutupiirros tehtävä tulostaa',
    secondaryKeywords: [
      'kopioi ruudukkoon tehtävä',
      'pikselitaide tulostaa',
      'peilaus ruudukossa',
      'hahmotuskyky tehtävä',
    ],
    lsiKeywords: [
      'ruudukko',
      'hahmottaminen',
      'visuaalinen',
      'esiopetus',
      'vastaukset',
    ],
    titleTag: 'Ruutupiirros tehtävä tulostaa | Ruudukkopiirrosgeneraattori',
    metaDescription: 'Luo ruutupiirrostehtäviä teemakuvilla. Automaattiset vastaukset, tulostettavat PDF:t. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Luo Ruudukkoyhdistämispulmia Myyntiin Etsyssä ja Amazon KDP:ssä',
    tagline: 'Muunna mikä tahansa kuva ruudukkoperusteiseksi kuvapulmaksi — jaa se ruuduiksi, paljasta konfiguroitavat vihjesolut, sekoita jäljelle jääneet ruudut numeroiduksi paletiksi ja generoi automaattisesti vastauslehti numeroiduilla ympyräpäällysteillä 104 temaattisesta kuvakokoelmasta.',
    description:
      'Ruudukkoyhdistämispulmat tarjoavat ainutlaatuisen visuaalisen muodon, joka erottuu standardeista työarkeista Etsyssä — ratkojat yhdistävät numeroidut ruudut takaisin oikeisiin paikkoihinsa jaetussa kuvaruudukossa, yhdistäen spatiaalisen päättelyn havainnointitaitoihin. Tämä generaattori luo ammattimaisia ruudukkoyhdistämispulmia tulostettavaan liiketoimintaasi konfiguroitavilla ruudukoilla 2×2:sta 4×4:ään, säädettävillä vihjesoluilla vaikeuden hallintaan ja automaattisilla vastauslehdillä numeroiduilla päällysteillä. Valitse yli 3 000 kuvitusta 104 kokoelmasta ja vie 300 DPI tulostusvalmiita PDF-tiedostoja täydellä kaupallisella lisenssillä. Puhtaasti visuaalinen muoto tarkoittaa, että jokainen pulma toimii maailmanlaajuisesti ilman käännöstä. Kokeile ilmaiseksi kaikilla ominaisuuksilla — ei rekisteröintiä, ei luottokorttia. Lataukset sisältävät vesileiman; osta lisenssi sen poistamiseksi.',
  },

  ctaHeading: 'Luo ruudukkotehtäviä',

  howItWorks: {
    title: 'Näin Luot Ruudukkoyhdistämispulmia Vaihe Vaiheelta',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse sivukoko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka tai mikä tahansa mukautettu koko. Valitse varaväri. Valitse taustateema ja säädä läpinäkyvyyttä, sitten valitse kehysteema itsenäisellä läpinäkyvyyssäädöllä. Huom: Neliö-sivukoko ei ole käytettävissä Ruudukkoyhdistämisessä.',
      },
      {
        title: 'Konfiguroi ruudukko',
        description:
          'Avaa Ruudukon Asetukset -paneeli ja aseta rivien (2–4, oletus 3) ja sarakkeiden (2–4, oletus 3) lukumäärä. Aseta sitten vihjesolujen lukumäärä (1–5, oletus 1) — nämä ovat ruutuja, jotka pysyvät näkyvissä työarkissa vihjeinä. 3×3-ruudukko yhdellä vihjeellä luo haastavan pulman 8 yhdistettävällä ruudulla, kun taas 2×2-ruudukko 3 vihjeellä luo helpon lämmittelyn vain 1 sijoitettavalla ruudulla.',
      },
      {
        title: 'Valitse kuva',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 temaattista kokoelmaa yli 3 100 värikästä kuvitusta. Suodata teeman alasvetovalikolla tai etsi avainsanalla. Napsauta kuvaa valitaksesi sen pulmasi lähteeksi. Voit myös ladata omia PNG-, JPG- tai GIF-kuvia Lataa Omat Kuvat -paneelista luodaksesi henkilökohtaisia ruudukkopulmia.',
      },
      {
        title: 'Generoi ruudukkopulmatyöarkki',
        description:
          'Napsauta Generoi luodaksesi ruudukkoyhdistämispulman. Sovellus jakaa valitsemasi kuvan konfiguroiduksi ruudukoksi, paljastaa vihjesolut todellisilla kuvaruuduilla näkyvissä ja merkitsee jäljelle jääneet solut "?" -paikkamerkeillä. Kaikki ruudut sekoitetaan Fisher-Yates-satunnaistamalla ja näytetään numeroituna palettina. Muotoiltu otsikko näkyy syaaninsinisellä taustalla ja lokalisoidulla "Ruudukkoyhdistäminen" -otsikolla.',
      },
      {
        title: 'Generoi vastauslehti ja lataa',
        description:
          'Vaihda Vastauslehti-välilehdelle nähdäksesi automaattisesti generoitu vastauslehti. Se näyttää kokonaisen, jakamattoman kuvan numeroiduilla ympyröillä jokaisen ruudukon solun päällä — keltaisella taustalla olevat ympyrät mustine ääriviivoineen näyttäen, mikä paletin numero kuuluu mihinkin paikkaan. Lataa molemmat versiot neljällä erillisellä painikkeella: Työarkki JPEG, Vastauslehti JPEG, Työarkki PDF ja Vastauslehti PDF — kaikki 300 DPI:llä.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi Ruudukkopulmat Erottuvat Tulostettavien Markkinoilla',
    features: [
      {
        title: 'Yksittäisen kuvan ruudukkopulma konfiguroitavilla riveillä ja sarakkeilla (2–4 × 2–4)',
        description:
          'Jokainen pulma alkaa yhdellä kuvalla jaettuna ruudukon ruuduiksi. Aseta 2–4 riviä ja 2–4 saraketta itsenäisesti, luoden ruudukoita 2×2:sta (4 ruutua) 4×4:ään (16 ruutua). Oletus 3×3-ruudukko tuottaa 9 ruutua — tasapainoinen vaikeustaso useimmille ikäryhmille. Pienemmät ruudukot toimivat hyvin aloittelupulmiin; suuremmat ruudukot lisäävät haastetta ja luovat premium-pulmatuotteita.',
      },
      {
        title: 'Säädettävä vihjesolujen lukumäärä skaalautuvaan vaikeuteen (1–5 paljastettua solua)',
        description:
          'Hallitse pulman vaikeutta asettamalla 1–5 vihjesolua, jotka pysyvät näkyvissä työarkissa vihjeinä. 3×3-ruudukolla ja 1 vihjeellä ratkojien on yhdistettävä 8 sekoitettua ruutua — aito haaste. 5 vihjeellä samalla ruudukolla vain 4 ruutua on yhdistettävä — helpommin lähestyttävä lämmittely. Tämä yksi liukusäädin muuttaa saman kuvan pulmiksi helposta vaikeaan.',
      },
      {
        title: 'Sekoitettu numeroitu ruutupaletti Fisher-Yates-satunnaistamalla',
        description:
          'Piilotetut ruudut sekoitetaan Fisher-Yates-algoritmilla ja näytetään numeroituna palettina ruudukon vieressä. Jokainen ruutu saa ainutlaatuisen numeron, jota ratkojat käyttävät vastauksia kirjoittaessaan. Satunnaistaminen varmistaa, että jokainen generoitu pulma saa eri ruutujärjestyksen, joten voit tuottaa useita ainutlaatuisia pulmatyöarkkeja yhdestä kuvasta.',
      },
      {
        title: 'Automaattisesti generoitu vastauslehti numeroiduilla ympyräpäällysteillä',
        description:
          'Jokainen ruudukkopulma generoi automaattisesti vastaavan vastauslehden erillisellä kangasvälilehdellä. Vastauslehti näyttää kokonaisen, jakamattoman kuvan numeroiduilla ympyröillä jokaisen ruudukon solun päällä — keltaisella taustalla olevat ympyrät mustine ääriviivoineen ja numeroteksteinä. Numerot vastaavat sekoitettua palettijärjestystä työarkista.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvitusta',
        description:
          'Selaa 104 temaattista kuvakokoelmaa, jotka kattavat eläimet, ruoan, ajoneuvot, luonnon, ammatit, juhlapyhät, urheilun, vuodenajat ja kymmeniä muita. Jokainen teema tarjoaa värikkäitä kuvituksia, jotka toimivat kauniisti ruudukkopulman lähdekuvina. Kaupallinen Paketti sisältää 10 värikästä teemaa; Täysi Pääsy avaa kaikki 104 teemaa.',
      },
      {
        title: 'Responsiivinen pysty- ja vaaka-asettelu automaattisella uudelleensijoittelulla',
        description:
          'Generaattori mukautuu automaattisesti sivun suuntauksen mukaan. Pystysivut sijoittavat ruudukon yläosaan ja numeroidun paletin alle. Vaakasivut sijoittavat ruudukon vasemmalle puoliskolle ja paletin oikealle. Tämä automaattinen uudelleensijoittelu varmistaa, että ruudukkopulmat näyttävät viimeistellyiltä kummassakin suuntauksessa.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä harmaasävykytkimellä',
        description:
          'Lataa ruudukkopulmia ja vastauslehtiä korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:llä (6x-kerroin). Neljä erillistä latauspainiketta vievät työarkin ja vastauslehden erikseen. Vaihda harmaasävy musteystävällisiin versioihin.',
      },
      {
        title: 'Täysi kangasmuokkaus teksti-, kohdistus- ja kerrossäätimillä',
        description:
          'Fabric.js-kangas tarjoaa täydellisen hallinnan jokaisesta elementistä. Vedä, muuta kokoa, kierrä ja sijoita uudelleen kuvia, tekstiä ja generoitua sisältöä vapaasti. Lisää mukautettua tekstiä seitsemällä fonttivaihtoehdolla. Zoomaa 25 % — 300 % yksityiskohtaiseen työhön 20 kumoa/tee uudelleen -historiatilalla.',
      },
    ],
  },

  businessUseCases: {
    title: 'Myy Ruudukkopulmakirjoja Etsyssä ja Amazon KDP:ssä',
    cases: [
      {
        title: 'Temaattiset ruudukkopulmapaketit Etsyssä',
        description:
          'Luo temaattisia ruudukkopulmapaketteja 104 kuvakokoelmalla — eläinruudukkopulmat, ajoneuvoruudukkopulmat, juhlapyhäkuvapulmat ja kymmeniä muita. Jokainen teema tarjoaa tarpeeksi kuvituksia 20–30 ainutlaatuiseen pulmatyöarkkiin eri ruudukkoko- ja vihjeasetuksilla. Pakkaa 15–25 ruudukkopulmaa per teema vastauslehdet mukaan lukien ja myy 3–7 € per paketti. Sisällytä sekoitus helppoja (2×2, 3 vihjettä), keskitasoisia (3×3, 2 vihjettä) ja vaikeita (4×4, 1 vihje) pulmia.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Kuvapulmatyökirjat Amazon KDP:ssä',
        description:
          'Kokoa 50–100 ruudukkoyhdistämispulmaa painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna kirja progressiivisella vaikeudella: Luku 1 käyttää 2×2-ruudukoita 3 vihjeellä aloittelijoille, Luku 2 käyttää 3×3-ruudukoita 2 vihjeellä keskitasolle ja Luku 3 käyttää 4×4-ruudukoita 1 vihjeellä edistyneille. Sisällytä vastauslehdet kirjan loppuun automaattisesti generoiduilla numeroiduilla ympyräpäällysteillä. Harmaasävykytkin tuottaa musteystävällisiä sivuja.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Ruudukkopulmaharjoituspaketit Gumroadiin',
        description:
          'Rakenna käyttövalmiita ruudukkopulmaharjoituksia pikaisiksi lisäharjoituksiksi, aamutöiksi tai rikastuttaviksi lisätehtäviksi. Luo temaattisia sarjoja: eläinkuvapulmat, maamerkkipulmat, ruokapulmat ja muut. Konfiguroitava vaikeus antaa sinun luoda tasoitettuja paketteja yhden tuotteen sisällä — sisällytä helpot, keskitasoiset ja vaikeat versiot samoista temaattisista pulmista.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausiruudukkopulmakokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden. Luo aikarajoitettuja ruudukkopulmakokoelmia huippuostoskausiin. Julkaise halloween-pulmapaketit syyskuussa, joulukokoelmat lokakuussa ja ystävänpäivän paketit tammikuussa. Sisällytä useita ruudukkokokoja ja vaikeustasoja jokaiseen kausisarjaan.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausiluonteinen)',
      },
      {
        title: 'Mukautetut valokuvaruudukkopulmat henkilökoityihin tuotteisiin',
        description:
          'Käytä Lataa Omat Kuvat -ominaisuutta luodaksesi ruudukkopulmia mistä tahansa valokuvasta tai taideteoksesta. Perhekuva-pulmat tekevät ainutlaatuisia henkilökohtaisia lahjoja. Myyjät voivat ladata brändättyjä kuvia mukautetuille tuotelinjoille. Tarjoa mukautettua ruudukkopulman luomista premium-Etsy-palveluna, jossa asiakkaat lähettävät valokuvansa.',
        platform: 'Etsy (henkilökoitetut tuotteet)',
      },
    ],
  },

  faq: [
    {
      question: 'Mitä ruudukkokokoja on saatavilla ruudukkoyhdistämispulmiin?',
      answer:
        'Generaattori tukee 2–4 riviä ja 2–4 saraketta itsenäisesti konfiguroituina. Tämä luo ruudukoita 2×2:sta (4 ruutua) 4×4:ään (16 ruutua). Oletus on 3×3 (9 ruutua). Pienemmät ruudukot ovat helpompia; suuremmat ruudukot lisäävät visuaalista monimutkaisuutta.',
    },
    {
      question: 'Miten vihjesolut ohjaavat pulman vaikeutta?',
      answer:
        'Vihjesolut ovat ruudukkopaikkoja, joissa kuvaruutu pysyy näkyvissä vihjeenä. Aseta 1–5 vihjesolua liukusäätimellä (oletus 1). Enemmän vihjeitä tekee pulmasta helpomman. 3×3-ruudukolla ja 1 vihjeellä on yhdistettävä 8 ruutua. 5 vihjeellä samalla ruudukolla vain 4 ruutua on yhdistettävä.',
    },
    {
      question: 'Miten ruudukkoyhdistämispulma toimii?',
      answer:
        'Työarkki näyttää ruudukon, jossa jotkut solut näyttävät todellisen kuvaruudun (vihjesolut) ja loput solut näyttävät "?" -paikkamerkit. Ruudukon alla tai vieressä numeroitu paletti näyttää kaikki piilotetut ruudut sekoitetussa järjestyksessä. Ratkojat tutkivat vihjesoluja, tutkivat numeroituja ruutuja ja määrittävät, mikä numero kuuluu mihinkin tyhjään ruudukon paikkaan.',
    },
    {
      question: 'Miten automaattisesti generoitu vastauslehti toimii?',
      answer:
        'Generaattori käyttää kaksoiskanvasjärjestelmää Työarkki- ja Vastauslehti-välilehdillä. Vastauslehti näyttää kokonaisen, jakamattoman kuvan numeroiduilla ympyröillä jokaisen ruudukon solun päällä. Jokainen ympyrä näyttää paletin numeron, joka kuuluu siihen paikkaan. Molemmat versiot viedään erikseen neljällä latauspainikkeella.',
    },
    {
      question: 'Voinko käyttää omia kuvia ruudukkopulmiin?',
      answer:
        'Kyllä. Lataa Omat Kuvat -paneeli antaa sinun ladata PNG-, JPG- tai GIF-tiedostoja. Ladatut kuvat näkyvät galleriassa. Napsauta ladattua kuvaa valitaksesi sen pulmasi lähteeksi. Tämä ominaisuus on ihanteellinen henkilökoitettujen pulmien luomiseen valokuvista tai brändätyistä kuvista.',
    },
    {
      question: 'Voinko generoida useita ainutlaatuisia pulmia samasta kuvasta?',
      answer:
        'Kyllä. Joka kerta kun napsautat Generoi, sovellus sekoittaa ruudut Fisher-Yates-satunnaistamalla, tuottaen eri numeroidun ruutujärjestyksen. Myös vihjesolujen paikat muuttuvat generointien välillä. Tämä tarkoittaa, että voit luoda useita erillisiä pulmatyöarkkeja yhdestä kuvasta muuttamatta mitään asetuksia.',
    },
    {
      question: 'Onko Ruudukkoyhdistämispulma-Generaattori kielitietoinen?',
      answer:
        'Ei. Ruudukkoyhdistäminen on puhtaasti visuaalinen — pulman tulos sisältää vain kuvaruutuja ja numeroita, eikä lokalisoitua sanasisältöä itse työarkissa. Sovelluksen käyttöliittymä (valikot, painikkeet, otsikkoteksti) tukee kaikkia 11 kieltä, mutta generoitu pulma toimii identtisesti kielen valinnasta riippumatta. Kaupallinen Paketti sisältää 10 värikästä teemaa; Täysi Pääsy avaa kaikki 104 teemaa ja kaikki 11 käyttöliittymäkieltä.',
    },
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia ruudukkokokoja, säädettäviä vihjesoluja, automaattista vastauslehteä numeroiduilla päällysteillä, täyttä kuvakirjastoa, tausta- ja kehysteemoja, omien kuvien latausta, tekstityökaluja ja kaikkia latausmuotoja — ilman tilin luomista, luottokorttia tai ohjelmiston asentamista. Ilmaisen kokeilun lataukset sisältävät pienen vesileiman.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja ruudukkoyhdistämispulmia Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä ruudukkoyhdistämispulmiasi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, tuotteina Gumroadissa tai minkä tahansa muun myyntikanavan kautta.',
    },
    {
      question: 'Sopivatko ruutupiirrostehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Yksinkertaiset ruudukot sopivat esiopetukseen ja alkuopetukseen, monimutkaisemmat peilaus- ja kopiointitehtävät haastavat alakoulun oppilaita. Ruutupiirros kehittää visuaalista hahmottamista kaikilla ikätasoilla.',
    },
    {
      question: 'Noudattavatko ruutupiirrostehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät tukevat OPS 2014:n matematiikan geometrian tavoitteita (T13, T14) sekä kuvallisen ilmaisun (KU) tavoitteita. Ruudukon kopioiminen kehittää avaruudellista hahmottamista ja symmetrian ymmärtämistä.',
    },
    {
      question: 'Miten luon ruutupiirrostehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuva kirjastosta, aseta ruudukon koko ja napsauta Luo. Generaattori luo automaattisesti mallikuvan ja tyhjän ruudukon kopiointia varten. Vastausavain syntyy samalla.',
    },
    {
      question: 'Sisältyvätkö vastaukset automaattisesti?',
      answer:
        'Kyllä. Jokainen ruutupiirrostehtävä sisältää automaattisesti luodun vastausavaimen, jossa malli on kopioitu valmiiksi ruudukkoon. Vastausavain on erillisellä sivulla.',
    },
    {
      question: 'Voinko myydä näitä tehtäviä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä ruutupiirrostehtäviä digitaalisina latauksina Etsyssä, painettuina aktiviteettikirjoina Amazon KDP:ssä tai millä tahansa muulla alustalla.',
    },
    {
      question: 'Kuinka monella kielellä voin luoda tehtäviä?',
      answer:
        'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja. Käyttöliittymä ja otsikot kääntyvät automaattisesti. Jokainen kieliversio on erillinen tuote.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa sinulle pääsyn kaikkiin ominaisuuksiin, emme tarjoa hyvityksiä kaupallisten lisenssien ostoista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'matching-worksheets',
      anchorText: 'Yhdistämistyöarkit täydentäviin yhdistämispaketteihin',
    },
    {
      pageType: 'app',
      slug: 'missing-pieces-worksheets',
      anchorText: 'Puuttuvien palojen pulmat visuaaliseen pulmavaihteluun',
    },
    {
      pageType: 'app',
      slug: 'etsi-esineet-tyolehdat',
      anchorText: 'Etsi Esineet -työlehtia havainnoinnin harjoitteluun',
    },
    {
      pageType: 'app',
      slug: 'kuvalajittelu-tyolehdat',
      anchorText: 'Kuvalajittelu-työlehtia visuaalisiin luokittelupaketteihin',
    },
    {
      pageType: 'guide',
      slug: 'luo-ruutupiirros-tyolehtia',
      anchorText: 'Opas myytävien ruutupiirrostehtävien luomiseen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/grid%20match/ruudukkopalapeli-1.webp',
      primaryAlt: 'Ruudukkoyhdistäminen kuvapulmatyöarkki kuvaruuduilla jaettuna ruudukkoon, vihjesolut paljastettuina ja numeroitu ruutupaletti yhdistämistä varten',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/grid%20match/ruudukkopalapeli-2.webp',
        alt: 'Kolme kertaa kolme ruudukkoyhdistämispulma yhdellä vihjesolulla ja kahdeksalla numeroidulla ruudulla paletissa',
        caption: '3×3 ruudukkopulma — yksi vihjesolu paljastettuna, kahdeksan ruutua yhdistettäväksi numeroidusta paletista',
      },
      {
        src: '/samples/finnish/grid%20match/ruudukkopalapeli-3.webp',
        alt: 'Neljä kertaa neljä edistynyt ruudukkoyhdistämispulma kuudellatoista ruudulla ja minimaalisilla vihjeillä',
        caption: '4×4 edistynyt pulma — suurin ruudukkokoko haastaviin visuaalisen havainnon harjoituksiin',
      },
      {
        src: '/samples/finnish/grid%20match/ruudukkopalapeli-1-answer-key.webp',
        alt: 'Ruudukkoyhdistämisen vastauslehti näyttäen kokonaisen kuvan numeroiduilla ympyröillä jokaisen ruudukon solun päällä',
        caption: 'Automaattisesti generoitu vastauslehti — numeroidut ympyrät näyttävät oikean ruudun sijoituksen kokonaisella kuvalla',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Näin Luot Ruudukkoyhdistäminen Kuvapulmia Konfiguroitavalla Vaikeudella — Vaiheittainen Opas',
  },
};

export default content;
