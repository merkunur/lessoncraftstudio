import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'luo bingolautoja',
    secondaryKeywords: [
      'bingo-generaattori',
      'kuvabingo tulostaa',
      'oma bingo luoda',
      'bingopeli tulostaa',
    ],
    lsiKeywords: [
      'bingolauta',
      'kuvabingo',
      'peli',
      'tulostettava',
      'PDF',
    ],
    titleTag: 'Luo bingolautoja | Kuvabingogeneraattori',
    metaDescription: 'Luo bingolautoja 3 000+ teemakuvalla. Uniikit laudat per setti, tulostettavat PDF:t. Kokeile ilmaiseksi — kaupallinen lisenssi.',
  },

  hero: {
    title: 'Kuvabingo-korttien generaattori tulostettaviin bingoaktiviteetteihin',
    tagline: 'Luo 1–10 uniikkia bingokorttia per erä säädettävillä ruudukoilla 3×3:sta 5×5:een — kuva- tai sanatäyttö sekä korttisoluille että pyöreille pelimerkeille, erillinen huutolista pelinjohtajalle, ZIP-erävienti kaikista korteista ja 104 temaattista kuvakokoelmaa.',
    description:
      'Rakenna ammattimaisia kuvabingokortteja, joissa pelaajat merkitsevät vastaavia kuvia tai sanoja uniikkeihin kortteihinsa. Säädä rivit 3:sta 5:een ja sarakkeet 3:sta 5:een itsenäisesti, mikä tuottaa ruudukoita 3×3:sta (9 solua) 5×5:een (25 solua) oletusarvolla 4×4 (16 solua). Valitse kuvatäyttö tai sanatäyttö itsenäisesti sekä korttisoluille että pyöreille pelimerkeille — pelimerkeillä on katkoviivareunat ja Fisher-Yates-sekoitusjärjestys aitoa bingopeliä varten. Luo 1–10 uniikkia bingokorttia per erä, jokainen eri satunnaisella kuvavalikoimalla. Erillinen huutolista näyttää dynaamisen sanaruudukon pelinjohtajalle. Kuvabingo-korttien generaattori on kieliriippuvainen: sanatäyttö käyttää lokalisoituja kuvanimiä Kuvakirjastosta, joten kielen vaihto muuttaa sanat korteissa, pelimerkeissä ja huutolistassa. Tämä tarkoittaa, että sama kuvateema voi luoda uniikkeja bingokortteja 11 eri kielellä — jokainen kieliversio on erillinen tuote uudelle markkinalle. Täysi pääsy avaa kaikki 104 teemaa yli 3 100 kuvituksella ja kaikki 11 käyttöliittymäkieltä lokalisoituun sanasisältöön. Lisää taustateemoja ja kehysteemoja itsenäisillä läpinäkyvyyden säätimillä, sisällytä mukautettua tekstiä seitsemällä fonttivaihtoehdolla ja vie tulostusvalmiita PDF-tiedostoja ja JPEG-kuvia 300 DPI:llä Letter-, A4-, neliö- (1200×1200) tai mukautetuissa ko\'oissa. Vie kaikki luodut kortit yksittäisinä JPEG-kuvina yhdessä ZIP-tiedostossa. Olitpa myymässä bingokorttipaketteja Etsyssä, kokoamassa bingoaktiviteettikirjoja Amazon KDP:lle tai luomassa tuotelinjan bingosarjoja Gumroadiin — tämä generaattori tuottaa tuotantovalmiita bingokortteja minuuteissa. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  howItWorks: {
    title: 'Näin luot kuvabingokortteja viidessä vaiheessa',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivuasetukset-paneeli ja valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse sivuväri värinvalitsimella varataustaväriksi. Valitse taustateema ja säädä sen läpinäkyvyyttä (0–1 0,05:n välein), valitse sitten kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään. Nämä asetteluvalinnat kehystävät bingokorttisi ennen sisällön määritystä.',
      },
      {
        title: 'Määritä bingokortin asetukset',
        description:
          'Avaa Bingokortin Asetukset -paneeli ja aseta rivit (3–5) ja sarakkeet (3–5) ruudukon koon määrittämiseksi — oletusarvo on 4×4, jossa on 16 solua. Aseta korttien lukumäärä 1:stä 10:een useiden uniikkien bingokorttien eräluontia varten. Valitse korttisolun täyttö (Kuva tai Sana) ja pelimerkin täyttö (Kuva tai Sana) itsenäisesti — sekoita kuvakortteja sanapelimerkkeihin, sanakortteja kuvapelimerkkeihin tai käytä samaa molemmissa. Aktivoi "Käytä mukautettua valintaa" -valintaruutu tiettyjen kuvien käsinpoimintaan huutolistaa varten.',
      },
      {
        title: 'Valitse kuvat kirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 temaattista kokoelmaa yli 3 100 värikkäällä kuvituksella — eläimet, ruoka, ajoneuvot, luonto, juhlapyhät ja kymmeniä muita. Suodata teeman mukaan pudotusvalikosta tai hae avainsanalla. Napsauta kuvia valitaksesi ne bingokorteillesi. Kun mukautettu huutolista on aktivoitu, valitut kuvat näkyvät huutolistapoolissa elävällä laskurilla. Voit myös ladata omia PNG-, JPG- tai GIF-kuvia Lataa Omia Kuvia -paneelissa.',
      },
      {
        title: 'Luo bingokortit',
        description:
          'Napsauta Luo tuottaaksesi bingokorttisi. Sovellus täyttää määritetyn ruudukon kuvilla tai sanoilla valitusta teemasta ja luo sitten pyöreät pelimerkit katkoviivareunoilla kortin alle — pelimerkit sekoitetaan Fisher-Yates-järjestyksellä, joten ne eivät koskaan vastaa suoraan kortin asettelua. Jos pyysit useita kortteja, jokainen poimii eri satunnaisvalikoiman kuvapooleista, mikä takaa jokaisen kortin olevan uniikki. Ensimmäinen kortti näkyy kankaalla välittömästi; kaikki kortit sisältyvät erä-ZIP-vientiin.',
      },
      {
        title: 'Lataa kortit ja huutolista',
        description:
          'Vaihda Kortit + Pelimerkit- ja Huutolista-välilehtien välillä esikatsellaksesi molempia. Huutolista näyttää dynaamisen sanaruudukon yhtenäisellä fonttikoolla ja sarakkeilla, jotka lasketaan pisimmän sanan pituuden perusteella. Lataa yksittäisiä kortteja JPEG- tai PDF-muodossa erillisillä painikkeilla tai vie kaikki luodut kortit yksittäisinä JPEG-kuvina yhteen bingo_cards.zip-tiedostoon. Vaihda harmaasävy päälle musteystävällisiin versioihin. Jokainen vienti renderoidaan 300 DPI:llä ja on tuotantovalmis Etsy-ilmoituksiin, Amazon KDP -sisäsivuihin ja Gumroad-tuotetiedostoihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Kuvabingo-korttien generaattorin avainominaisuudet',
    features: [
      {
        title: 'Säädettävä bingoruudukko 3×3:sta 5×5:een itsenäisillä rivi- ja sarakesäätimillä',
        description:
          'Aseta rivit ja sarakkeet itsenäisesti 3:sta 5:een, mikä tuottaa ruudukoita 3×3:sta (9 solua) 5×5:een (25 solua). Oletusarvo on 4×4 (16 solua), joka toimii hyvin tavanomaisiin bingokortteihin. 3×3-ruudukko sopii nopeisiin bingokierroksiin vähemmillä seurattavilla kohteilla, kun taas 5×5-ruudukko tarjoaa klassisen 25 solun bingokokemuksen pidempiin peleihin. Ruudukkoalue käyttää 60 % käytettävissä olevasta kangaskorkeudesta (maks 500 px) optimaalisten korttisuhteiden vuoksi. Itsenäiset rivi- ja sarakesäätimet mahdollistavat ei-neliömäisten ruudukoiden kuten 3×5 tai 5×3 luomisen uniikkeihin bingomuotoihin, jotka erottuvat markkinapaikkojen ilmoituksissa.',
      },
      {
        title: 'Eräluonti 1–10 uniikkia bingokorttia per työlehti',
        description:
          'Luo 1–10 uniikkia bingokorttia yhdessä erässä. Jokainen kortti poimii eri satunnaisvalikoiman kuvapooleista, joten kahdellakin kortilla ei ole samaa asettelua. Tämä on olennaista bingolle: jokainen pelaaja tarvitsee eri kortin, jotta peli toimii. Ensimmäinen kortti näkyy työlehden kankaalla välittömästi. Kaikki luodut kortit ovat saatavilla erävientiin. Tämä erätoiminto tarkoittaa, että voit tuottaa täydellisen sarjan 10 uniikkia bingokorttia yhdellä napsautuksella sen sijaan, että loisit ja tallentaisit ne yksi kerrallaan.',
      },
      {
        title: 'ZIP-erävienti kaikista luoduista korteista yksittäisinä JPEG-tiedostoina',
        description:
          'Vie kaikki luodut bingokortit yhdessä bingo_cards.zip-latauksessa. Jokainen kortti tallennetaan yksittäisenä korkearesoluutioisena JPEG-tiedostona ZIP-arkiston sisälle, nimettyinä järjestyksessä helpottamaan organisointia. Tämä erävienti poistaa ikävän prosessin korttien lataamisesta yksi kerrallaan — luo 10 uniikkia korttia, napsauta yhtä painiketta ja saat valmiin bingokorttisarjan tuotteeksi pakattavaksi. ZIP-vienti käyttää JSZip-kirjastoa luotettavaan pakkaukseen selainten välillä ja toimii tavallisten yksittäisten JPEG- ja PDF-latauspainikkeiden rinnalla.',
      },
      {
        title: 'Kaksoistäyttötilat: Kuva tai Sana sekä korttisoluihin että pyöreisiin pelimerkkeihin',
        description:
          'Korttisolut ja pelimerkit tarjoavat kumpikin itsenäisen täyttötilan valinnan — Kuva tai Sana. Kuvatäyttö näyttää temaattisia kuvituksia korttisoluissa tai pyöreinä pelimerkkikuvioina. Sanatäyttö näyttää lokalisoituja kuvanimiä tekstinä. Sekoita tiloja luovaan vaihteluun: kuvakortit sanapelimerkeillä luovat visuaalista-tekstiksi-yhdistely-haasteen, kun taas sanakortit kuvapelimerkeillä kääntävät dynamiikan. Pyöreissä pelimerkeissä on katkoviivareunat (#666, strokeDashArray [5,5]) ja ne sekoitetaan Fisher-Yates-järjestyksellä varmistaen, etteivät ne koskaan peilaa kortin ruudukon asettelua. Tämä kaksoistäyttöjärjestelmä tuottaa neljä erillistä bingokorttityyliä yhdestä generaattorista.',
      },
      {
        title: 'Erillinen huutolista dynaamisella sanaruudukolla pelinjohtajalle',
        description:
          'Jokainen bingokorttisarja sisältää huutolistan erillisellä välilehdellä. Huutolista näyttää dynaamisen ruudukon kaikista uniikkeista sanoista kuvapoolista — pelinjohtaja lukee nämä ääneen, kun pelaajat merkitsevät korttejaan. Sarakkeet lasketaan pisimmän sanan pituuden perusteella (2–6 saraketta) yhtenäisellä fonttikoolla kaikkien merkintöjen välillä selkeää luettavuutta varten. Ruudukko on keskitetty sivulle ja perii sivureunat ja taustan työlehden kankaasta. Aktivoi mukautettu huutolistan valinta käsinpoimiaksesi tietyt kuvat huutolistapooliin elävällä laskurilla, joka näyttää valintamääräsi.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa, jotka kattavat eläimet, ruoan, ajoneuvot, luonnon, ammatit, juhlapyhät, urheilun, vuodenajat ja kymmeniä muita. Jokainen teema tarjoaa yhtenäisen värikkäiden kuvitusten sarjan, joka toimii yhdessä bingoaktiviteeteissa — temaattiset bingokortit ovat suosituimpien tulostettavien tuotteiden joukossa Etsyssä ja Gumroadissa. Suodata teeman mukaan pudotusvalikosta tai hae tiettyjä kuvia avainsanalla. Kaupallinen paketti sisältää 10 värikästä teemaa alkuun; Täysi pääsy avaa kaikki 104 teemaa maksimaalisen luovan vaihtelun takaamiseksi kaikille ruudukkoko\'oille ja täyttötiloille.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa bingokortteja ja huutolistoja korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:n tarkkuudella (6× kerroin, JPEG-laatu 1,0). Neljä erillistä painiketta vie Työlehti-JPEG, Huutolista-JPEG, Työlehti-PDF ja Huutolista-PDF erikseen. Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) ja täysin mukautetut mitat. PDF-suunta tunnistetaan automaattisesti. Vaihda harmaasävy päälle musteystävällisiin versioihin. Jokainen vienti on tuotantovalmis digitaalisiin latauksiin, painettuihin pelisarjoihin ja tuotantojakeluun.',
      },
      {
        title: 'Täysi kangasmuokkaus tekstityökaluilla, kohdistuksella ja kerrosten hallinnalla',
        description:
          'Fabric.js-kangas tarjoaa täyden hallinnan jokaiseen elementtiin bingokortillasi. Vedä, muuta kokoa, kierrä ja siirrä kuvia, tekstiä ja luotua sisältöä vapaasti. Kerrosten hallinta hoitaa pinoamisjärjestyksen — tuo elementtejä eteen tai lähetä taakse. Lukitse valmiit elementit muokatessasi muita. Lisää mukautettua tekstiä seitsemällä fonttivaihtoehdolla (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), säädettävällä koolla ja värillä sekä tekstin ääriviivan leveydellä 0–10 0,5:n tarkkuudella. Kuusi kohdistusvaihtoehtoa plus keskitä sivulle pitävät asettelut tarkkoina. Zoomaa 50 %:sta 200 %:iin 10 %:n välein yksityiskohtaista työtä varten. Kumoa ja tee uudelleen 20 historian tilalla Ctrl+Z:llä ja Ctrl+Y:llä.',
      },
    ],
  },

  businessUseCases: {
    title: 'Näin myyt kuvabingokortteja verkossa',
    cases: [
      {
        title: 'Temaattiset bingokorttipakettit Etsyssä',
        description:
          'Luo temaattisia bingokorttipaketteja 104 kuvakokoelmalla — eläinbingo, ruokabingo, ajoneuvobingo, juhlapyhäbingo ja kymmeniä muita. Jokainen teema tarjoaa riittävästi kuvituksia uniikkeihin kortteihin eri ruudukkoko\'oilla. Pakkaa 10–30 uniikkia bingokorttia teemaa kohden huutolistat mukaan lukien, ja myy 3–8 € per paketti. Käytä eräluontitoimintoa 10 uniikille kortille per sarja sekunneissa, sekoita sitten ruudukkokoot yhdessä paketissa: 3×3 pikapelikortit, 4×4 standardikortit ja 5×5 pidennetyn pelin kortit vaihtelun vuoksi. ZIP-erävienti tehostaa tuotantoa suurivolyymisille myyjille.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Bingoaktiviteettikirjat Amazon KDP:ssä',
        description:
          'Kokoa 40–80 bingokorttia painetuksi aktiviteettikirjaksi Amazon KDP -muodossa. Rakenna kirjasi teemakapitteittain: eläimet, ruoka, ajoneuvot, juhlapyhät ja muut. Sisällytä huutolistat jokaisen korttisarjan jälkeen, jotta kirja on itsenäinen peliä varten. Käytä harmaasävyvaihtoa musteystävällisiin sisäsivuihin, jotka pitävät tulostuskustannukset alhaisina. Sekoita ruudukkokoja tarjotaksesi asteittaista vaikeutta — aloita 3×3-korteilla nopeisiin kierroksiin ja etene 5×5:een pidempiin peleihin. Bingoaktiviteettikirjat myyvät hyvin ympäri vuoden ja huippuuntuvat juhlapyhäkausina, jolloin perheet etsivät ryhmäaktiviteetteja.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tuotelinjan bingoaktiviteetit Gumroadiin',
        description:
          'Rakenna pelivalmiita bingosarjoja uniikkeilla pelaajakorteilla ja pelinjohtajamateriaalilla. Gumroadissa bingoaktiviteetteja etsivät ostajat arvostavat tuotteita, jotka saapuvat käyttövalmiina — tulosta kortit, jaa ne ja aloita pelaaminen välittömästi. Luo tuotevalikoiman mukaisia sarjoja: sanastobingo sanatäyttötilalla, kuvantunnistusbingo kuvatäytöllä ja sekatilabingo tasoitetuille tuotepaketeille. Sisällytä 10 uniikkia korttia per sarja (riittävästi pienille ryhmille) huutolistan kanssa. Sanatäyttötila lokalisoiduilla kuvanimillä muuttaa bingon sanastonkertaustoiminnaksi.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausittaiset ja juhlapyhäbingokorttien kokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden — joulu, halloween, pääsiäinen, ystävänpäivä, koulun alku, kesäloma ja paljon muuta. Bingo on luontaisesti sosiaalinen peli, joka huippuuntuu juhlapyhinä, jolloin perheet ja tuotelinjat etsivät ryhmäaktiviteetteja. Julkaise halloween-bingosarjat syyskuussa, joulukokoelmat lokakuussa ja ystävänpäiväpaketit tammikuussa. Jokainen kausisarja sisältää useita ruudukkokoja, sekä kuva- että sanatäyttövariantit ja huutolistat. Kausibingotuotteet oikeuttavat premium-hinnat huippuaikoinaan.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausittainen)',
      },
      {
        title: 'Tapahtumabingokortit juhlapeleihin ja erikoistilaisuuksiin',
        description:
          'Luo bingokorttisarjoja juhliin, vauvakulkueisiin, polttareihin, tiimirakennustapahtumiin ja opetustyöpajoihin. Säädettävät ruudukkokoot ja temaattinen kuvakirjasto tekevät helpoksi tuottaa tilaisuuskohtaisia bingopelejä — vauvatarvikesbingo vauvajuhliin, ruokabingo kokkikursseille, eläinbingo eläintarharetkille. Luo eräluontina 10 uniikkia korttia per tapahtumapaketti huutolistan kanssa, pakkaa suorana latauksena PDF-pakettina ja myy Etsyssä, jossa tapahtumajärjestäjät aktiivisesti etsivät tulostettavia juhla-pelejä. Mukautettu huutolistan valintatoiminto mahdollistaa täsmälleen haluamiesi kohteiden kuratoimisen peliin.',
        platform: 'Etsy (tapahtumajärjestäjät)',
      },
    ],
  },

  faq: [
    {
      question: 'Mitkä ruudukkokoot ovat saatavilla bingokorteille?',
      answer:
        'Rivit ja sarakkeet ovat itsenäisesti säädettävissä 3:sta 5:een, mikä tuottaa ruudukoita 3×3:sta (9 solua) 5×5:een (25 solua). Oletusarvo on 4×4, jossa on 16 solua. Voit myös luoda ei-neliömäisiä ruudukoita kuten 3×5 (15 solua) tai 5×3 (15 solua) uniikkeihin bingokorttiformaatteihin. Pienemmät ruudukot sopivat nopeisiin peleihin, kun taas 5×5-ruudukot tarjoavat klassisen bingokokemuksen useammilla seurattavilla kohteilla.',
    },
    {
      question: 'Miten eräluonti toimii useille bingokorteille?',
      answer:
        'Aseta korttien lukumäärä 1:stä 10:een Bingokortin Asetukset -paneelissa. Jokainen kortti poimii eri satunnaisvalikoiman kuvapooleista, mikä takaa jokaisen kortin olevan uniikki — olennaista bingolle, jossa jokainen pelaaja tarvitsee eri kortin. Ensimmäinen kortti näkyy kankaalla välittömästi esikatselua varten. Kaikki luodut kortit ovat saatavilla ZIP-eräviennin kautta ladattaviksi yksittäisinä JPEG-tiedostoina.',
    },
    {
      question: 'Miten ZIP-erävienti toimii?',
      answer:
        'Useiden bingokorttien luomisen jälkeen napsauta erävientipainiketta ladataksesi kaikki kortit yksittäisinä korkearesoluutioisina JPEG-tiedostoina yhdessä bingo_cards.zip-arkistossa. Jokainen kortti nimetään järjestyksessä ZIP:n sisällä helpottamaan organisointia. Tämä poistaa tarpeen ladata kortteja yksi kerrallaan — luo täydellinen sarja 10 uniikkia korttia ja vie ne kaikki yhdellä napsautuksella JSZip-pakkauksella.',
    },
    {
      question: 'Mikä ero on korttisolun täytöllä ja pelimerkin täytöllä?',
      answer:
        'Korttisolut ja pelimerkit tarjoavat kumpikin itsenäisen täyttötilan: Kuva tai Sana. Korttisolun täyttö määrittää, mitä näkyy jokaisessa bingoruudukon solussa. Pelimerkin täyttö määrittää, mitä näkyy pyöreissä pelimerkeissä kortin alla, joita pelaajat käyttävät yhdistämiseen. Voit sekoittaa tiloja — kuvakortteja sanapelimerkeillä, sanakortteja kuvapelimerkeillä tai samaa molemmissa — mikä tuottaa neljä erillistä bingokorttityyliä yhdestä kuvasarjasta.',
    },
    {
      question: 'Mikä on huutolista ja miten se toimii?',
      answer:
        'Huutolista on erillinen sivu (saatavilla Huutolista-välilehdellä), joka näyttää dynaamisen sanaruudukon kaikista uniikkeista kohteista kuvapooleista. Pelinjohtaja lukee nämä sanat ääneen, kun pelaajat merkitsevät bingokorttejaan. Sarakkeet lasketaan pisimmän sanan pituuden perusteella (2–6 saraketta) yhtenäisellä fonttikoolla. Ruudukko on keskitetty sivulle ja perii sivureunat ja taustan työlehden kankaasta. Tämä EI ole vastausavain — se on viitelevy peliä johtavalle henkilölle.',
    },
    {
      question: 'Mikä on mukautettu huutolistan valinta?',
      answer:
        'Aktivoi "Käytä mukautettua valintaa" -valintaruutu Bingokortin Asetukset -paneelissa käsinpoimiaksesi, mitkä kuvat näkyvät huutolistapoolissa. Kun aktivoitu, napsauta kuvia Kuvakirjastossa lisätäksesi ne mukautettuun huutolistan valintaasi — elävä laskuri näyttää "Valittu mukautettuun huutolistaan: X" valinnan edetessä. Tämä antaa sinulle tarkan hallinnan siitä, mitkä kohteet näkyvät bingopelissä, hyödyllistä tuotevalikoiman mukaisiin aktiviteetteihin tai temaattisiin tapahtumiin.',
    },
    {
      question: 'Onko Kuvabingo-korttien generaattori kieliriippuvainen?',
      answer:
        'Kyllä. Kun sanatäyttötilaa käytetään korttisoluille tai pelimerkeille, näytetyt sanat ovat lokalisoituja kuvanimiä Kuvakirjastosta. Kielen vaihto Työlehden Asetuksissa muuttaa sanat korteissa, pelimerkeissä ja huutolistassa. Esimerkiksi kissakuva näyttää "Kissa" suomeksi, mutta "Cat" englanniksi ja "Katze" saksaksi. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa ja kaikki 11 kieltä lokalisoituun sanasisältöön.',
    },
    {
      question: 'Miksi bingokorteille ei ole vastausavainta?',
      answer:
        'Bingokortit käyttävät huutolistaa vastausavaimen sijaan. Bingossa pelinjohtaja lukee kohteita huutolistalta, kun pelaajat merkitsevät vastaavia kohteita uniikeille korteilleen — ei ole yhtä "oikeaa vastausta", koska jokaisen pelaajan kortissa on eri kohteet eri paikoissa. Huutolista toimii pelin viitedokumenttina, joka listaa kaikki mahdolliset kohteet, jotka pelinjohtaja voi ilmoittaa pelin aikana.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia ruudukkokoja, eräluontia 10 kortille asti, ZIP-erävientiä, sekä kuva- että sanatäyttötiloja, huutolistaa, koko kuvakirjastoa, mukautettua huutolistan valintaa, tausta- ja kehysteemoja, tekstityökaluja ja kaikkia latausmuotoja — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Voinko lisätä taustateemoja ja kehysteemoja bingokortteihin?',
      answer:
        'Kyllä. Sivuasetukset-paneeli sisältää sekä taustateemanvalitsimen läpinäkyvyysliukusäätimellä (0–1 0,05:n välein) että kehysteemanvalitsimen omalla itsenäisellä läpinäkyvyysliukusäätimellään. Taustateemat lisäävät koristeellisia kuvioita bingoruudukon taakse, kun taas kehysteemat kehystävät sivun. Huutolista perii sivureunat ja taustan pääkankaalta. Molemmilla on erilliset läpinäkyvyyden säätimet, joten voit luoda hienovaraisia taustoja näkyvillä reunoilla tai minkä tahansa yhdistelmän, joka sopii suunnitteluusi.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja bingokortteja Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä bingokorttisi digitaalisina latauksina Etsyssä, painettuina aktiviteettikirjoina Amazon KDP:ssä, tuotelinjaresursseina Gumroadissa tai millä tahansa muulla myyntikanavalla. Säädettävät ruudukkokoot, eräluonti, ZIP-vienti, kaksoistäyttötilat, huutolistat ja 104 temaattista kuvakokoelmaa antavat sinulle luovat työkalut alkuperäisten, myytävien bingotuotteiden tuottamiseen laajassa mittakaavassa.',
    },
    {
      question: 'Sopivatko bingotehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Kuvabingo sopii erinomaisesti esiopetukseen ja alkuopetukseen — se ei vaadi lukutaitoa, vain kuvatunnistusta. Pelillisyys tekee oppimisesta hauskaa kaikille ikäryhmille aina alakoulun loppuun.',
    },
    {
      question: 'Noudattavatko bingotehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Bingotehtävät tukevat OPS 2014:n laaja-alaista osaamista L1 (ajattelu ja oppimaan oppiminen) ja esiopetuksen pelillisen oppimisen tavoitteita. Kuvatunnistus ja tarkkaavaisuus kehittyvät pelaamisen kautta.',
    },
    {
      question: 'Miten luon bingolautoja nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuvat kirjastosta (suositeltu 24+ kuvaa), aseta ruudukon koko ja laudan määrä settiin. Generaattori luo automaattisesti uniikit laudat, joissa kuvat ovat eri paikoissa jokaisella laudalla.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata kaikkia ruudukkokoja, eräluontia, ZIP-vientiä, kuva- ja sanatäyttötiloja, huutolistaa, koko kuvakirjastoa, mukautettua huutolistan valintaa, tausta- ja kehysteemoja, tekstityökaluja ja kaikkia latausmuotoja ennen ostamista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'yhdistely-tyolehdat',
      anchorText: 'Yhdistely-työlehtigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'ruudukkopalapeli-tyolehdat',
      anchorText: 'Ruudukkoyhdistely-palapetigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'varjoyhdistely-tyolehdat',
      anchorText: 'Varjoyhdistely-työlehtigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'kuvalajittelu-tyolehdat',
      anchorText: 'Kuvalajittelu-työlehtigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'etsi-esineet-tyolehdat',
      anchorText: 'Etsi Esineet -työlehtigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'sanaristikko-tyolehdat',
      anchorText: 'Sanaristikko-työlehtigeneraattori',
    },
    {
      pageType: 'bundle',
      slug: 'yhdistely-lajittelu-paketti',
      anchorText: 'Yhdistely ja Lajittelu -paketti — Kaikki yhdistelysovellukset yhdessä',
    },
    {
      pageType: 'guide',
      slug: 'luo-bingokortteja',
      anchorText: 'Näin luot ja myyt bingokortteja verkossa',
    },
    {
      pageType: 'idea',
      slug: 'leirintaalue-tulosteideat',
      anchorText: 'Leirintäalue-tulosteideoita ulkoilmaoppimiseen',
    },
    {
      pageType: 'idea',
      slug: 'merielaimet-tulosteideat',
      anchorText: 'Merieläimet-tulosteideoita meriteemoihin',
    },
    {
      pageType: 'start',
      slug: 'tulostettava-liiketoiminnan-markkinointi',
      anchorText: 'Tulostettavan liiketoimintasi markkinointi',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/bingo/kuvabingo%201.webp',
      primaryAlt: 'Kuvabingokortti temaattisilla kuvilla ruudukossa ja pyöreillä pelimerkeillä katkoviivareunoilla alapuolella',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/bingo/kuvabingo%202.webp',
        alt: 'Kuvabingokortti kuvatäytöllä, jossa värikkäät temaattiset kuvitukset ruudukon soluissa ja pyöreissä kuvapelimerkeissä',
        caption: 'Kuvatäyttötila — värikkäät kuvitukset sekä korttisoluissa että pyöreissä pelimerkeissä',
      },
      {
        src: '/samples/finnish/bingo/kuvabingo%203.webp',
        alt: 'Kuvabingokortti sanatäytöllä, jossa lokalisoidut kuvanimet ruudukon soluissa ja sanapelimerkeissä',
        caption: 'Sanatäyttötila — lokalisoidut kuvanimet sanastoperusteiseen bingoon',
      },
      {
        src: '/samples/finnish/bingo/kuvabingo%201%20callout.webp',
        alt: 'Bingon huutolista dynaamisella sanaruudukolla, joka näyttää kaikki pelikohteet pelinjohtajalle',
        caption: 'Huutolista — dynaaminen sanaruudukko bingopeliä johtavalle henkilölle',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Näin luot kuvabingokortteja eräluonnilla ja huutolistoilla — Vaihe vaiheelta -opas',
  },
};

export default content;
