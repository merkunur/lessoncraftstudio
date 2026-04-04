import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'aakkosjuna-työarkit',
    secondaryKeywords: [
      'luo aakkosjuna-työarkkeja myyntiin',
      'aakkosjuna-työarkkien generaattori kaupalliseen käyttöön',
      'tulostettava kirjaintunnistus junatyökalu Etsyyn ja KDP:hen',
      'kielitietoinen kirjainparitus-työarkki vastausavaimilla',
    ],
    lsiKeywords: [
      'yksitoista värikästä junavaunua kirjain-kuvaparitus työarkkigeneraattori',
      'automaattinen luonti manuaalinen valinta kaksi luontitilaa aakkosgeneraattori',
      'konfiguroitava kolmesta yhteentoista vihjeiden määrä vaikeustason skaalaus',
      'myy aakkosjuna-työarkkeja Etsyssä',
      'Amazon KDP kirjaintunnistus juna-harjoituskirjat',
      'kaupallinen lisenssi aakkosjuna-työkalu',
    ],
    titleTag: 'Aakkosjuna-työarkit — Opas — Kattava myyjän opas',
    metaDescription: 'Näin luot aakkosjuna-työarkkeja junavaunuilla, kahdella luontitilalla, konfiguroitavalla vaikeustasolla ja 104 teemakuvakokoelmalla. Myy Etsyssä, KDP:ssä ja Gumroadissa.',
  },

  hero: {
    title: 'Näin luot aakkosjuna-työarkkeja',
    tagline: 'Vaihe vaiheelta -opas kirjaintunnistustyöarkkien luomiseen 11 värikkäällä junavaunulla, kahdella luontitilalla, konfiguroitavalla vihjelukumäärällä ja kielitietoisella kirjainparittamisella 11 kielellä',
    description: 'Aakkosjuna-työarkit ovat visuaalisesti erottuva kirjaintunnistusaktiviteetti, jossa käyttäjät yhdistävät hajautettuja vihjekuvia oikeaan junavaunuun sen mukaan, millä kirjaimella kukin kuva alkaa. Aakkosjuna-generaattori tarjoaa kaksi luontitilaa — Automaattinen luonti nopeaan massatuotantoon ja Manuaalinen valinta käsin valittuihin kirjainryhmiin — sekä konfiguroitavan vihjeliukusäätimen 3–11 vaikeustasoon.',
  },

  introduction: 'Kirjaintunnistus on peruslukutaito, jolle kaikki muu rakentuu. Ennen kuin lapset voivat lukea sanoja, dekoodata lauseita tai kirjoittaa tarinoita, heidän on luotettavasti tunnistettava yksittäisiä kirjaimia ja yhdistettävä ne äänteisiinsä. Aakkostyöarkit kuuluvat eniten kysyttyihin tulostettaviin tuotteisiin. Haaste myyjille on erottuminen — markkinat ovat kyllästyneet identtisillä kirjainharjoitteluarkeilla. Aakkosjuna-työarkit ratkaisevat tämän visuaalisesti erottuvalla muodolla.\n\nAakkosjuna-generaattorin erityinen vahvuus on sen kaksi luontitilaa. Automaattinen luontitila valitsee satunnaisesti 11 kirjainta ja osoittaa vastaavat kuvat — ihanteellinen nopeaan massatuotantoon. Manuaalinen valintatila näyttää koko aakkoston ja antaa sinun valita tarkasti 11 kirjainta — olennainen räätälöidyille tuotteille.\n\nKonfiguroitava vihjeliukusäädin lisää sisäänrakennetun vaikeusjärjestelmän. Kolme vihjettä tarkoittaa helpointa tasoa. Viidestä seitsemään vihjettä antaa keskitason. Yhdeksästä yhteentoista vihjettä tarkoittaa vaikeinta tasoa.\n\nMerkittävin kilpailuetu on kielitietoinen kirjainparitus. Koirakuva vastaa D:tä englanniksi mutta H:ta saksaksi (Hund), C:tä ranskaksi (Chien) ja P:tä espanjaksi (Perro). Tämä tarkoittaa, että yksi suunnitteluistunto tuottaa aidosti erilaista pulmasisältöä 11 kielellä.\n\nJokainen tässä oppaassa mainittu ominaisuus on käytettävissä ilmaisessa kokeilussa vesileimalla.',

  tutorial: [
    {
      heading: 'Avaa aakkosjuna-generaattori',
      content: 'Navigoi aakkosjuna-generaattoriin ja napsauta aloituspainiketta. Työkalu latautuu välittömästi asetuspaneelilla vasemmalla ja live-esikatselutyöalueella oikealla. Ei tiliä, ei ohjelmistolatausta, ei asennusta vaadita.\n\nTyöalue näyttää esikatselun, joka päivittyy asetuksia muuttaessasi. Sivupaneeli sisältää kaikki säätimet: luontitilan valinta, kirjain- ja kuvakonfiguraatio, vihjeliukusäädin, sivuasetteluvaihtoehdot, fontti- ja tekstiasetukset sekä vientisäätimet.\n\nAakkosjuna-generaattori käyttää Fabric.js-työaluetta ammattimaisilla asettelutyökaluilla sisältäen 6 kohdistusvaihtoehtoa plus sivulle keskitys, tasot lukitsemisella ja lukituksen poistolla, zoomaus 25–300 prosenttiin ja kumoa/tee uudelleen 50 vaiheella.',
    },
    {
      heading: 'Aseta sivuasettelu',
      content: 'Sivuasetukset-osiossa valitse sivukoko. Vaihtoehdot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, neliö (1200 × 1200 pikseliä) ja mukautetut mitat. Letter on standardi Pohjois-Amerikan ostajille. A4 eurooppalaisille ja kansainvälisille markkinoille.\n\nAseta sivun taustaväri. Lisää sitten temaattinen taustakuvio taustakirjastosta säädettävällä läpinäkyvyyslukusäätimellä (0–1, 0,05 välein). Hienovarainen tausta 15–25 prosentin läpinäkyvyydellä lisää visuaalista lämpöä kilpailematta värikkäiden junavaunujen kanssa. Lisää koristeellinen kehys kehyskirjastosta 80–100 prosentin läpinäkyvyydellä.\n\nTausta- ja kehysteemat toimivat toisistaan riippumattomasti, joten voit sekoittaa vapaasti.',
    },
    {
      heading: 'Valitse luontitilasi',
      content: 'Aakkosjuna-generaattori tarjoaa kaksi luontitilaa.\n\nAutomaattinen luontitila valitsee satunnaisesti 11 kirjainta valitun kielen aakkostosta ja osoittaa automaattisesti vastaavat kuvat valitusta teemasta. Jokainen napsautus Luo-painikkeella tuottaa täysin erilaisen kirjainkokoonpanon. Ihanteellinen nopeaan massatuotantoon.\n\nManuaalinen valintatila näyttää koko aakkoston valitulle kielelle ja antaa sinun käsin valita tarkasti 11 kirjainta. Aakkosruudukko mukautuu kielikohtaisesti — saksa näyttää 30 kirjainta inklusiivit Ä, Ö, Ü ja ß; ruotsi 29 inklusiivit Å, Ä ja Ö; suomi näyttää samat 29 kirjainta kuin ruotsi; tanska 29 inklusiivit Æ, Ø ja Å; espanja sisältää Ñ:n. Olennaista räätälöidyille tuotteille: vain vokaalit, vain konsonantit, tietyn opetusviikon kirjaimet.\n\nMolemmat tilat tuottavat saman värikkään 11-vaunun junamuodon samalla ammattimaisella laadulla.',
    },
    {
      heading: 'Valitse kirjaimet junaan',
      content: 'Manuaalisessa valintatilassa koko aakkosten ruudukko näkyy. Jokainen kirjain näkyy napsautettavana laatikkona. Napsauta tarkasti 11 kirjainta junavaunujen täyttämiseksi.\n\nAakkosruudukko mukautuu automaattisesti valitun kielen natiiviin merkistöön ja järjestykseen. Englanti näyttää 26 kirjainta (A–Z). Saksa näyttää 30 inklusiivit Ä, Ö, Ü ja ß. Ruotsi näyttää 29 inklusiivit Å, Ä ja Ö lopussa kuten ruotsalainen konventio vaatii. Suomi näyttää 29 kirjainta inklusiivit Å, Ä ja Ö.\n\nStrateginen kirjainvalinta luo premium-tuotteita. Valitse vain vokaalit (A, E, I, O, U) plus 6 konsonanttia vokaalikeskeiseen työarkkiin. Valitse yleisesti sekoitettuja kirjainpareja (b/d, p/q, m/n) korjaavaan työarkkiin.\n\nAutomaattisessa luontitilassa kirjainvalinta on automaattinen.',
    },
    {
      heading: 'Valitse kuvat ja teema',
      content: 'Kun 11 kirjainta on valittu (tai automaattisessa luontitilassa), valitse temaattinen kuvakokoelma kuvien lähteeksi. Teemavalitsin sisältää yli 104 kokoelmaa ja yli 3 100 kuvitusta kattaen eläimet, ruoat, ajoneuvot, luonnon, juhlapyhät ja kymmeniä muita kategorioita.\n\nGeneraattori yhdistää automaattisesti kunkin kirjaimen kuvaan, jonka nimi alkaa kyseisellä kirjaimella valitulla kielellä. Koirakuva yhdistyy K-kirjaimeen suomeksi (Koira), D-kirjaimeen englanniksi (Dog) ja H-kirjaimeen saksaksi (Hund). Tämä kielitietoinen paritus tarkoittaa, että sama kuvakirjasto tuottaa aidosti erilaista pulmasisältöä jokaisella kielellä.\n\nManuaalisessa valintatilassa voit myös käsin valita tietyt kuvat yksittäisille kirjaimille selaamalla kuvakirjastoa ja napsauttamalla haluttua kuvaa kunkin kirjaimen kohdalle.',
    },
    {
      heading: 'Säädä vihjelukumäärä vaikeustason hallitsemiseksi',
      content: 'Vihjeliukusäädin (3–11) on ensisijainen vaikeustason hallintakontrolli ja luonnollinen differentioinnin akseli tasoitetuille tuotteille.\n\n3 vihjettä: Vain 3 vaunua vaatii yhdistämistehtävän. Helpoin taso, ihanteellinen esikouluikäisille.\n\n5–7 vihjettä: Kohtalainen haaste. Keskitaso useimmille päiväkoti-ikäisille.\n\n9–11 vihjettä: Lähes jokainen vaunu vaatii yhdistämisen. Vaikein taso edistyneelle kirjaintunnistuksen harjoittelulle.\n\nTämä yksi säädin luo helppo, keskitaso ja vaikea -versiot sekunneissa. Tuotestrategiassa kolme vaikeustasoa samasta teemasta tuottavat kolme erillistä listattavaa tuotetta — tai yhden tasoitetun paketin, joka palvelee kaikkia ikäryhmiä.',
    },
    {
      heading: 'Esikatsele ja vie tulostuskelpoiset tiedostot',
      content: 'Live-esikatselu näyttää valmiin aakkosjuna-työarkin kaikkien asetusten kanssa. Tarkista: ovatko junavaunut selkeästi luettavissa, ovatko vihjekuvat tunnistettavissa, onko kokonaisasettelu visuaalisesti houkutteleva.\n\nLuo vastausavain automaattisesti — se näyttää jokaisen kirjaimen yhdistettynä oikeaan kuvaan. Vastausavain on erillinen sivullaan, valmiina sisällytettäväksi tuotepakettiin.\n\nVie tiedostot 300 DPI -resoluutiolla ammattilaatuista tulostusta varten. PDF-muoto sisältää työarkin ja vastausavaimen erillisinä sivuina yhdessä dokumentissa. JPEG-muoto tuottaa erilliset kuvatiedostot.',
    },
    {
      heading: 'Skaalaa monikielisillä ja teemavariaatioilla',
      content: 'Aakkosjuna-generaattorin kielitietoinen paritus on tehokkain skalausominaisuus. Vaihda kieli suomesta englanniksi — sama kuvakirjasto, mutta täysin erilainen pulmasisältö, koska kirjain-kuvaparitukset muuttuvat kielen mukaan. 11 kieltä × 10 teemaa × 3 vaikeustasoa = 330 uniikkia tuotetta yhdestä generaattorista.\n\nTemaattiset variaatiot laajentavat katalogia edelleen. Eläin-aakkosjunat, kulkuneuvo-aakkosjunat, ruoka-aakkosjunat — jokainen teema kohdistaa eri hakukyselyjä ja ostajien kiinnostuksen kohteita.\n\nPaketointi: Niputa 10 uniikkia aakkosjuna-sivua samalla teemalla ja kielellä yhdeksi paketiksi. Luo mega-paketteja, jotka sisältävät kaikki kolme vaikeustasoa. Tarjoa monikielisiä paketteja kaksikielisille perheille.',
    },
  ],

  platformTips: [
    {
      heading: 'Optimoi Etsy-listaukset aakkosjuna-tuotteille',
      content: 'Etsy-listausten otsikot aakkosjuna-työarkeille hyötyvät tarkasta kohdennuksesta. Sisällytä ikäryhmä, teema ja aktiviteettityyppi: "Alphabet Train Worksheet — Animal Theme — Preschool Letter Recognition — 10 Pages with Answer Keys." Käytä kaikki 13 tagia kohdentaen hakutermeihin kuten "letter recognition worksheet", "alphabet activity preschool", "letter matching printable." Listausten esikatselukuvissa näytä värikkäät junavaunut näkyvästi — erottuva visuaalinen muoto pysäyttää selaamisen.',
    },
    {
      heading: 'Julkaise Amazon KDP:ssä aakkosaktiviteettikirjana',
      content: 'Kokoa 40–60 aakkosjuna-työarkkisivua KDP-kirjaan. Sisällytä progressiiviset vaikeustasot, useita teemoja ja kaikki vastausavaimet. Aakkosjunaformaatti erottuu KDP:n kirjaintunnistuskategoriassa, joka on kyllästynyt tavallisilla kirjainharjoitteluarkeilla. Kohdeavainsanat: "alphabet train activity book", "letter recognition workbook preschool".',
    },
    {
      heading: 'Monikieliset Gumroad-tuotteet kaksikielisille perheille',
      content: 'Gumroadissa tarjoa monikielisiä aakkosjunapaketteja, jotka palvelevat kaksikielisiä perheitä. Paketti, joka sisältää englannin ja suomen versiot samasta teemasta, kohdistaa alipalvellun monikielisen perheiden markkinan. Gumroadin joustavat tuotemuotoilut mahdollistavat kielivariaatioiden niputtamisen yhdeksi houkuttelevaksi premium-tuotteeksi.',
    },
  ],

  monetization: [
    {
      heading: 'Kielitietoinen paritus moninkertaistaa katalogin',
      content: 'Aakkosjuna-generaattorin kielitietoinen kirjainparitus on ainutlaatuinen skalausmekanismi. Sama kuvakirjasto tuottaa aidosti erilaista pulmasisältöä jokaisella 11 kielellä — ei pelkkää käännöstä, vaan kokonaan erilaisia kirjain-kuvaparituksia. Tämä tarkoittaa, että jokainen tuote moninkertaistuu 11-kertaiseksi minimaalisella lisätyöllä. Myyjä, jolla on 10 englanninkielistä aakkosjunatuotetta, voi luoda 110 listausta 11 kielellä — jokainen kohdistaa eri hakukyselyjä ja kilpailualttiita kansainvälisiä markkinoita.',
    },
    {
      heading: 'Vaikeustason variaatiot kolminkertaistavat tuotteet',
      content: 'Jokainen teema ja kieli tuottaa kolme erillistä tuotetta vihjeliukusäätimen kautta: helppo (3 vihjettä), keskitaso (5–7 vihjettä) ja vaikea (9–11 vihjettä). Kolme vaikeustasoa voidaan myydä yksittäin tai paketoituna tasoitetuksi paketiksi, joka palvelee kaikkia ikäryhmiä.',
    },
    {
      heading: 'Premium-paketit räätälöidyille kirjainryhmille',
      content: 'Manuaalinen valintatila mahdollistaa erikoistuneiden premium-tuotteiden luomisen: vain vokaali -aakkosjunat, yleisesti sekoitetut kirjaimet (b/d, p/q) -korjaavat työarkit, fonetiikkaohjelman viikkojen mukaiset kirjainryhmät. Nämä kohdistetut tuotteet perustelevat korkeamman hinnan ja palvelevat erityisiä ostajatyhnittyjä.',
    },
  ],

  examples: [
    {
      heading: 'Esimerkki: Monikielisen aakkosjunakatalogin rakentaminen',
      content: 'Myyjä päättää rakentaa aakkosjunakatalogin kolmella kielellä: suomi, englanti ja saksa. Automaattisella luontitilalla hän tuottaa 10 uniikkia sivua eläinteemalla kullakin kielellä — 30 uniikkia sivua. Sitten hän toistaa kulkuneuvo- ja ruokateemoilla — 90 uniikkia sivua yhteensä. Hän paketoi ne 9 tuotteeksi (3 kieltä × 3 teemaa) ja lisää tasoitetut paketit jokaiselle kielelle. Lopullinen katalogi: 12 listattavaa tuotetta yhdestä tuotantoistunnosta.',
    },
    {
      heading: 'Esimerkki: Tasoitetun kirjaintunnistuspaketin luominen',
      content: 'Myyjä käyttää manuaalista valintatilaa luodakseen tasoitetun kirjaintunnistuspaketin. Helppo taso: 3 vihjettä, perusvokaalit ja yleiset konsonantit. Keskitaso: 7 vihjettä, kaikki vokaalit ja laajempi konsonanttijoukko. Vaikea taso: 11 vihjettä, mukaan lukien harvemmin esiintyvät kirjaimet. Jokainen taso tuotetaan 10 uniikissa sivussa eläinteemalla. Paketti "Aakkosjuna — 30 sivua, 3 tasoa vastausavaimineen" hinnoitellaan premium-hintaan 6,99 dollaria yksittäisten arkkien 2,99 dollarin sijaan.',
    },
  ],

  faq: [
    {
      question: 'Mitä kieliä aakkosjuna-generaattori tukee?',
      answer: '11 kieltä natiiveilla aakkostoilla: englanti (26 kirjainta), saksa (30 sis. Ä, Ö, Ü, ß), ruotsi (29 sis. Å, Ä, Ö), suomi (29 sis. Å, Ä, Ö), tanska (29 sis. Æ, Ø, Å), espanja (sis. Ñ), ranska, portugali, italia, hollanti ja norja. Jokainen kieli tuottaa aidosti erilaista pulmasisältöä kielitietoisen kirjainparituksen kautta.',
    },
    {
      question: 'Mikä ero on automaattisella luonnilla ja manuaalisella valinnalla?',
      answer: 'Automaattinen luonti valitsee satunnaisesti 11 kirjainta ja osoittaa kuvat automaattisesti — ihanteellinen nopeaan massatuotantoon. Manuaalinen valinta antaa sinun käsin valita tarkasti 11 kirjainta aakkosten ruudukosta — ihanteellinen räätälöidyille tuotteille kuten vokaaliharjoitukset tai korjaavat kirjainryhmät.',
    },
    {
      question: 'Voinko luoda useita uniikkeja sivuja samalla konfiguraatiolla?',
      answer: 'Kyllä. Automaattisessa luontitilassa jokainen napsautus Luo-painikkeella tuottaa täysin erilaisen kirjainkokoonpanon. Voit luoda 10, 20 tai useampia uniikkeja sivuja samalla teemalla ja kielellä monisivuisten pakettien rakentamiseksi.',
    },
    {
      question: 'Sisältyvätkö vastausavaimet automaattisesti?',
      answer: 'Kyllä. Generaattori tuottaa automaattisen vastausavaimen, joka näyttää jokaisen kirjaimen yhdistettynä oikeaan kuvaan. Vastausavain on erillisellä sivulla valmiina tuotepakettiin sisällytettäväksi.',
    },
    {
      question: 'Mikä on kaupallisen lisenssin palautuskäytäntö?',
      answer: 'Jokainen generaattori tarjoaa ilmaisen kokeilun vesileimalla, jotta voit testata kaikkia ominaisuuksia ennen ostamista. Koska voit arvioida tuotteen täysin ennen ostoa, kaikki kaupallisen lisenssin myynnit ovat lopullisia.',
    },
  ],

  nextSteps: [
    {
      slug: 'luo-kirjoitusharjoituksia',
      title: 'Luo kirjoitusharjoituksia',
      description: 'Lukutaidon täydentäjä — lapset, jotka tunnistavat kirjaimia aakkosjunalla, voivat edetä samojen kirjainten jäljentämiseen ja kirjoittamiseen.',
    },
    {
      slug: 'luo-sananetsintapulmia',
      title: 'Luo sananetsintäpulmia',
      description: 'Sanatasolla lukutaidon täydentäjä — käyttäjät etenevät kirjaintasolta sanatasolle piilotettujen sanojen pulmilla.',
    },
    {
      slug: 'myy-opetusaineistoja-etsy',
      title: 'Myy opetusaineistoja Etsyssä',
      description: 'Kattava opas opetuksellisten tulostettavien tuotteiden myymiseen Etsyssä optimoiduilla listauksilla ja SEO:lla.',
    },
  ],

  internalLinks: [
    { pageType: 'start', slug: 'kattava-opas-tulostettava-liiketoiminta', anchorText: 'Kattava opas tulostettavan liiketoiminnan aloittamiseen' },
    { pageType: 'start', slug: 'luo-tyoarkkeja-jotka-myyvat', anchorText: 'Näin luot ammattimaisia työarkkeja, jotka myyvät' },
    { pageType: 'start', slug: 'etsy-tulostettava-liiketoiminta', anchorText: 'Etsy-tulostettavien liiketoiminnan mestarikurssi' },
    { pageType: 'start', slug: 'amazon-kdp-aktiviteettikirjat', anchorText: 'Amazon KDP -aktiviteettikirjaliiketoimintaopas' },
    { pageType: 'start', slug: 'kaupallisen-lisenssin-opas', anchorText: 'Kaupallisen lisenssin opas' },
    { pageType: 'app', slug: 'aakkosjuna-tyoarkit', anchorText: 'Aakkosjuna-työarkkien generaattori — Kaikki tiedot' },
    { pageType: 'app', slug: 'kirjoitusharjoitukset-tyoarkit', anchorText: 'Kirjoitusharjoitusten generaattori — Kaikki tiedot' },
    { pageType: 'tool', slug: 'aakkosjuna-luoja', anchorText: 'Kokeile aakkosjuna-työarkkien luojaa' },
  ],

  toolsRecommended: [
    {
      appId: 'alphabet-train',
      title: 'Aakkosjuna-työarkkien generaattori',
      description: 'Tämän oppaan ensisijainen työkalu. Luo kirjaintunnistustyöarkkeja 11 värikkäällä junavaunulla, kahdella luontitilalla, konfiguroitavalla vihjelukumäärällä 3–11 ja kielitietoisella kirjainparittamisella 11 natiivilla aakkostolla automaattisine vastausavaimineen.',
    },
    {
      appId: 'writing-app',
      title: 'Kirjoitusharjoitusten generaattori',
      description: 'Lukutaidon täydentäjä, joka luo ohjattua kirjainmuodostusharjoittelua. Käyttäjät, jotka tunnistavat kirjaimia aakkosjunalla, voivat edetä samojen kirjainten jäljentämiseen.',
    },
    {
      appId: 'wordsearch',
      title: 'Sananetsintätyöarkkien generaattori',
      description: 'Sanatasolla lukutaidon täydentäjä — piilotettujen sanojen pulmia. Käyttäjät etenevät kirjaintasolta sanatasolle.',
    },
    {
      appId: 'pattern-train',
      title: 'Kuvionjuna-työarkkien generaattori',
      description: 'Sama värikäs junavaunumuoto sovellettuna kuvioiden tunnistamiseen. Paketoi aakkos- ja kuviojunatyöarkit yhtenäiseksi "Juna-aktiviteetit" -tuotelinjaksi.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/english/alphabet train/Alphabet Train 1.webp', alt: 'Aakkosjuna-työarkki 11 värikkäällä junavaunulla, joissa kirjaimia ja vastaavia vihjekuvia kirjaintunnistukseen' },
    samples: [
      { src: '/samples/english/alphabet train/Alphabet Train 1.webp', alt: 'Värikäs aakkosjuna-työarkki 11 vaunulla ja kirjain-kuvayhdistämisvihjein', caption: 'Aakkosjuna-työarkki 11 värikkäällä vaunulla ja kirjain-kuvaparittamisvihjeillä' },
      { src: '/samples/english/alphabet train/Alphabet Train 5.webp', alt: 'Aakkosjuna-työarkki temaattisilla kuvilla keskitason vaikeustasolla', caption: 'Temaattinen aakkosjuna konfiguroitavalla vihjelukumäärällä vaikeustason skaalaamiseen' },
      { src: '/samples/english/alphabet train/Alphabet Train 10.webp', alt: 'Edistynyt aakkosjuna-työarkki 11 vihjeellä maksimivaikeustasolle', caption: 'Täyden 11 vihjeen vaikeustaso edistyneeseen kirjaintunnistusharjoitteluun' },
    ],
    youtubeId: '_dDQegRq9JQ',
    videoTitle: 'Näin luot aakkosjuna-työarkkeja — Täydellinen opas',
  },

  themeImages: [
    { src: '/image-library/farm%20animals/bee.webp', alt: 'Mehiläinen — temaattinen opetuskuva', caption: 'Mehiläinen' },
    { src: '/image-library/farm%20animals/bull.webp', alt: 'Härkä — temaattinen opetuskuva', caption: 'Härkä' },
    { src: '/image-library/farm%20animals/calf.webp', alt: 'Vasikka — temaattinen opetuskuva', caption: 'Vasikka' },
    { src: '/image-library/farm%20animals/cat.webp', alt: 'Kissa — temaattinen opetuskuva', caption: 'Kissa' },
    { src: '/image-library/farm%20animals/cat%202.webp', alt: 'Kissa 2 — temaattinen opetuskuva', caption: 'Kissa 2' },
  ],
};

export default content;
