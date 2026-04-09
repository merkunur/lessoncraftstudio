import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'piirrustustehtävä tulostaa',
    secondaryKeywords: [
      'piirtää ja värittää tehtävä',
      'vaihe-vaiheelta piirtäminen',
      'taidetehtävä tulostaa',
      'luova tehtävämoniste',
    ],
    lsiKeywords: [
      'piirtäminen',
      'väritys',
      'luovuus',
      'lapset',
      'PDF',
    ],
    titleTag: 'Piirtämis- ja väritystehtävä tulostaa | Luova generaattori',
    metaDescription: 'Luo piirtämis- ja väritystehtäviä teemakuvilla. 300 DPI PDF tulostettavat. Kokeile ilmaiseksi — kaupallinen lisenssi.',
  },

  hero: {
    title: 'Luo Piirustus- ja Väritystyöarkkeja Myyntiin Etsyssä ja KDP:ssä',
    tagline: 'Kaksoisruudukkojärjestelmä — harjoitusruudukko ja vihjeruudukko vierekkäin — säädettävällä vihjeprosentilla 10–75 %, vaaka- ja pystysymmetriatilat sekä yli 100 mustavalkoista ääriviivakokoelmaa piirustus- ja väritysharjoituksiin.',
    description:
      'Piirustus- ja väritystyöarkit yhdistävät kaksi aktiviteettia — piirtämisen ja värittämisen — yhdeksi tuotemuodoksi, joka erottuu Etsyssä. Tämä generaattori luo ammattimaisia ruudukkoperusteisia piirustusharjoituksia, joissa oppijat kopioivat kuvia solu solulta ja sitten värittävät luomuksensa. Valitse yli 3 000 kuvitusta 104 kokoelmasta piirustuksen referenssikuviksi. Jokainen työarkki viedään 300 DPI tulostusvalmiina PDF-tiedostona täydellä kaupallisella lisenssillä. Taideharjoitus-tulostettavat ovat kasvava niche vanhempien keskuudessa, jotka etsivät ruutuvapaita luovia aktiviteetteja. Kokeile ilmaiseksi kaikilla ominaisuuksilla — ei rekisteröintiä, ei luottokorttia. Lataukset sisältävät vesileiman; osta lisenssi sen poistamiseksi.',
  },

  howItWorks: {
    title: 'Näin Luot Piirustus- ja Väritystyöarkkeja Vaihe Vaiheelta',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse sivuväri, valitse koristeellinen taustateema ja säädä läpinäkyvyyttä, lisää sitten yhteensopiva koristeellinen kehys itsenäisellä läpinäkyvyyssäädöllä.',
      },
      {
        title: 'Konfiguroi ruudukon mitat ja vihjeprosentti',
        description:
          'Aseta ruudukon rivit (3–10) ja sarakkeet (3–10) itsenäisesti hallitaksesi solumäärää ja kuvasuhdetta. 3×3-ruudukko 9 suurella solulla on helppo aloittelijoille; 10×10-ruudukko 100 pienellä solulla haastaa edistyneet käyttäjät. Aseta sitten vihjeprosentti 10–75 %. 75 %:lla suurin osa referenssikuvasta on näkyvissä. 10 %:lla vain hajallaan olevat vihjeet näkyvät — aito haaste jopa aikuisille.',
      },
      {
        title: 'Valitse symmetriatila ja mustavalkoinen teemakuva',
        description:
          'Valitse symmetriatila: Ei Mitään (Satunnainen) hajottaa vihjesolut satunnaisesti yleiseen piirustusharjoitteluun, Vaaka peilaa vihjeet vasemmalta oikealle symmetrian opettamiseen, ja Pysty peilaa vihjeet ylhäältä alas. Selaa sitten yli 100 mustavalkoista ääriviivateemakokoelmaa yli 3 000 kuvitusta — eläimet, ajoneuvot, ruoka, luonto ja kymmeniä muita — tai lataa oma kuva.',
      },
      {
        title: 'Lisää tekstikoristeet ja muokkaa kangasta',
        description:
          'Käytä Tekstityökalut-paneelia lisätäksesi työarkin otsikon, nimi- ja päivämääräkentät tai piirustusohjeita fonteilla kuten Baloo 2, Fredoka, Lexend Deca, Nunito ja Quicksand. Automaattisesti generoitu otsikko näkyy lokalisoituna tekstinä valitulla kielellä. Vedä, muuta kokoa ja sijoita uudelleen elementtejä Fabric.js-kankaalla.',
      },
      {
        title: 'Lataa harjoitusruudukko ja vihjeruudukko',
        description:
          'Ota käyttöön harmaasävyvienti musteystävällisiä versioita varten. Vie työarkkisi korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona 300 DPI:llä. Jokainen lataus sisältää sekä harjoitusruudukon (tyhjät solut piirtämiseen) että vihjeruudukon (referenssisolut osittaisella kuvalla). Erillistä vastauslehteä ei tarvita — vihjeruudukko itse toimii ratkaisureferenssinä.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi Taideharjoitustyöarkit Myyvät Etsyssä ja KDP:ssä',
    features: [
      {
        title: 'Kaksoisruudukkojärjestelmä: Harjoitusruudukko ja Vihjeruudukko',
        description:
          'Jokainen kuva luo kaksi toisiaan täydentävää ruudukkoa. Harjoitusruudukko esittää tyhjät solut kevyin ääriviivoin piirtämistä varten. Vihjeruudukko näyttää konfiguroitavan osuuden referenssikuvasta — osa soluista täytettynä, osa tyhjinä — jotta käyttäjät näkevät osittaisia visuaalisia vihjeitä ja täydentävät loput. Tämä kaksoisruudukkomenettely opettaa havainnointia, spatiaalista päättelyä ja hienomotorista kontrollia samanaikaisesti. Myyjille kaksiruudukkolumuoto luo premium-tuotteen, joka erottuu tavallisista värityssivuista.',
      },
      {
        title: 'Säädettävä vihjeprosentti 10–75 %',
        description:
          'Yksi liukusäädin ohjaa, mikä osuus vihjeruudukon soluista paljastaa referenssikuvan. 75 %:lla suurin osa kuvasta on näkyvissä ja käyttäjät täydentävät vain puuttuvan neljänneksen — täydellinen aloittelijoille. 50 %:lla puolet soluista on näkyvissä kohtuulliseen haasteeseen. 10 %:lla tuskin mitään referenssiä on näkyvissä — aito palapeli jopa aikuisille. Tämä tarkka vaikeussäädin antaa myyjien luoda progressiivisia työkirjoja, jotka etenevät 75 %:sta 10 %:iin.',
      },
      {
        title: 'Symmetria- ja peilausltiilat spatiaaliseen oppimiseen',
        description:
          'Kolme symmetriatilaa muuttavat tavallisen ruudukkopiirrustuksen spatiaaliseksi päättelyharjoitukseksi. Satunnainen tila hajottaa vihjesolut mielivaltaisiin paikkoihin yleiseen piirustusharjoitteluun. Vaakatila peilaa vihjesolut vasemmalta oikealle symmetrian opettamiseen. Pystytila peilaa vihjesolut ylhäältä alas. Symmetriatyöarkit myyvät poikkeuksellisen hyvin matematiikan ja taiteen kategorioissa, koska ne yhdistävät visuaalisen taiteen matemaattisiin käsitteisiin.',
      },
      {
        title: 'Mustavalkoinen ääriviivakirjasto yli 100 kokoelmalla',
        description:
          'Pääsy yli 3 000 mustavalkoiseen ääriviivakuvitukseen yli 100 temaattisessa kokoelmassa — eläimet, ajoneuvot, ruoka, luonto, ammatit, juhlapyhät ja kymmeniä muita. Toisin kuin useimpien sovellusten käyttämät värilliset kuvakirjastot, Piirustus ja Väritys käyttää puhtaita mustavalkoisia ääriviivoja, jotka on suunniteltu nimenomaan piirustus- ja väritysharjoituksiin. Kaupallinen Paketti sisältää 10 mustavalkoista teemaa; Täysi Pääsy avaa kaikki yli 100 teemaa.',
      },
      {
        title: 'Konfiguroitava ruudukkokoko 3×3:sta 10×10:een',
        description:
          'Aseta rivit (3–10) ja sarakkeet (3–10) itsenäisesti luodaksesi ruudukoita 3×3:sta (9 suurta solua) 10×10:een (100 pientä solua). Suuremmat solut helpottavat piirtämistä aloittelijatason tuotteissa; pienemmät solut lisäävät tarkkuusvaatimuksia edistyneille. Ruudukkokoko ja vihjeprosentti yhdessä määrittävät kaksi itsenäistä vaikeusakselia.',
      },
      {
        title: 'Automaattisesti generoitu responsiivinen otsikko lokalisoidulla tekstillä',
        description:
          'Jokainen työarkki sisältää automaattisesti generoidun otsikon, joka mukautuu sivun suuntaukseen. Otsikkoteksti on automaattisesti lokalisoitu kaikille 11 tuetulle kielelle — "Piirrä ja Väritä" suomeksi, "Draw and Color" englanniksi ja niin edelleen. Otsikot ovat täysin muokattavissa kankaalla.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä',
        description:
          'Lataa työarkkeja korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:llä. Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Neliö (1200×1200) ja mukautetut koot ovat kaikki tuettuja. Ota käyttöön harmaasävyvienti musteystävällisiä versioita varten.',
      },
      {
        title: 'Täysi kangasmuokkaus teksti- ja koristetyökaluilla',
        description:
          'Sisäänrakennettu Fabric.js-kangas antaa sinun vetää, muuttaa kokoa, kiertää ja sijoittaa uudelleen jokaisen elementin sivulla. Lisää mukautettua tekstiä fonteilla kuten Lexend Deca, Baloo 2, Nunito, Quicksand ja Fredoka. Zoomaa 25 % — 300 % tarkkuussijoittelua varten rajattomalla kumoa/tee uudelleen -toiminnolla.',
      },
    ],
  },

  businessUseCases: {
    title: 'Myy Piirustusharjoituskirjoja Etsyssä ja Amazon KDP:ssä',
    cases: [
      {
        title: 'Ruudukkopiirrustuspaketit Etsyssä',
        description:
          'Luo temaattisia ruudukkopiirrustuspaketteja progressiivisella vaikeudella vihjeprosentilla vaikeusaksele. Paketoi jokainen teema kolmella tasolla: Helppo (75 % vihjeitä, 4×4-ruudukko), Keskitaso (40 % vihjeitä, 6×6-ruudukko) ja Vaikea (15 % vihjeitä, 8×8-ruudukko). Kaksoisruudukkolumuoto — harjoitusruudukko plus vihjeruudukko — luo premium-tuotteen, joka erottuu tavallisista värityssivuista. Hinnoittele yksittäiset temapaketit 3–5 € ja usean teeman progressiiviset paketit 12–18 €.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Piirustustaitojen työkirjat Amazon KDP:ssä',
        description:
          'Kokoa 60–100 ruudukkopiirrustusharjoitusta painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna kirja piirustuksen progressiona: aloita 3×3-ruudukoilla 75 % vihjein, etene 5×5-ruudukoiden 50 % vihjeisiin ja päätä 8×8- tai 10×10-ruudukoihin 10–15 % vihjein. Mustavalkoisten ääriviivakuvien tulostuslaatu on erinomainen.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut symmetria- ja spatiaalisen päättelyn paketit Gumroadiin',
        description:
          'Rakenna tasoitettuja spatiaalisen päättelyn harjoitussarjoja symmetriatilalla järjestävänä periaatteena. Taso 1: Satunnainen vihjesijoittelu yleiseen piirustusharjoitteluun. Taso 2: Vaakasymetriatila. Taso 3: Pystysymmetriatila. Taso 4: matala vihjeprosentti (10–15 %) symmetriatilalla äärimmäiseen haasteeseen.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Monikieliset visuaaliset työarkit globaaleille markkinoille',
        description:
          'Koska Piirustus ja Väritys -työarkit sisältävät vain ruudukkokuvia nollatekstillä tuloksessa, sama tuote toimii jokaisella kielellä ilman muutoksia. Mustavalkoinen ääriviivityyli on kulttuurisesti neutraali ja universaalisti ymmärrettävä. Yksi työnkulku tuottaa universaalisti myytävän tuotteen.',
        platform: 'Etsy / Amazon KDP / Gumroad (globaali)',
      },
      {
        title: 'Mukautetut ruudukkopiirrustustuotteet niche-kauppoihin',
        description:
          'Lataa omia kuvia luodaksesi ruudukkopiirrustustyöarkkeja mistä tahansa aiheesta. Solu solulta -menetelmä on klassinen tekniikka kuvataideopetuksessa, mikä tekee tuotteista houkuttelevia taide- ja käsityöostajille. Säädettävä vihjeprosentti antaa asettaa vaikeuden tarkasti.',
        platform: 'Gumroad / Etsy / Oma kauppa',
      },
    ],
  },

  faq: [
    {
      question: 'Miten kaksoisruudukkojärjestelmä toimii?',
      answer:
        'Jokainen valitsemasi kuva luo kaksi toisiaan täydentävää ruudukkoa. Harjoitusruudukko tarjoaa tyhjät solut kevyin ääriviivoin piirtämistä varten. Vihjeruudukko näyttää konfiguroitavan prosenttiosuuden referenssikuvasta — osa soluista täytettynä kuvan osilla, osa jätettyinä tyhjiksi. Käyttäjät katsovat vihjeruudukkoa ja piirtävät kokonaisen kuvan solu solulta harjoitusruudukkoon.',
    },
    {
      question: 'Mitä vihjeprosentti ohjaa?',
      answer:
        'Vihjeprosentti (10–75 %) määrittää, mikä osuus vihjeruudukon soluista paljastaa referenssikuvan. 75 %:lla kolme neljäsosaa soluista näyttää kuvan. 25 %:lla vain neljännes on näkyvissä. 10 %:lla tuskin mitään referenssiä on näkyvissä. Matalampi vihjeprosentti tarkoittaa vaikeampia harjoituksia.',
    },
    {
      question: 'Mitä ruudukkokokoja voin konfiguroida?',
      answer:
        'Rivit ja sarakkeet ovat itsenäisesti säädettävissä 3–10. 3×3-ruudukko tarjoaa 9 suurta solua — helppoa aloittelijoille. 10×10-ruudukko tarjoaa 100 pientä solua — vaativaa edistyneille. Ei-neliömäiset ruudukot kuten 4×6 mahtuvat eri kuvien kuvasuhteisiin.',
    },
    {
      question: 'Miten symmetria- ja peilausltiilat toimivat?',
      answer:
        'Kolme tilaa ohjaa vihjeSolujen sijoittelua. Ei Mitään (Satunnainen) hajottaa vihjesolut satunnaisesti. Vaaka peilaa vihjesolut vasemmalta oikealle — toinen puoli on näkyvissä ja peilikuva on piirrettävä. Pysty peilaa vihjesolut ylhäältä alas.',
    },
    {
      question: 'Miksi tämä sovellus käyttää mustavalkoisia ääriviivateemoja värikkäiden sijaan?',
      answer:
        'Piirustus ja Väritys käyttää mustavalkoisia ääriviivakuvituksia, jotka on suunniteltu nimenomaan piirustus- ja väritysharjoituksiin. Puhtaat ääriviivat ovat ihanteellisia solu solulta -kopiointiin — käyttäjät näkevät selkeästi kopioitavat viivat. Piirustuksen jälkeen käyttäjät voivat värittää luomuksensa lisäaktiviteettina.',
    },
    {
      question: 'Miksi tälle sovellukselle ei ole erillistä vastauslehteä?',
      answer:
        'Vihjeruudukko itse toimii ratkaisureferenssinä. Koska vihjeruudukko näyttää prosenttiosuuden valmista kuvaa, käyttäjät voivat verrata valmista harjoitusruukkoaan täysin näkyvään referenssiin milloin tahansa katsomalla alkuperäistä lähdekuvaa.',
    },
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia ruudukkokokoja, kaikkia vihjeprosentteja, kaikkia symmetriatiloja, mustavalkoista teemakirjastoa, oman kuvan latausta ja kaikkia vientimuotoja — ilman tilin luomista, luottokorttia tai ohjelmiston asentamista. Ilmaisen kokeilun lataukset sisältävät pienen vesileiman.',
    },
    {
      question: 'Onko Piirustus ja Väritys -generaattori kielitietoinen?',
      answer:
        'Ei. Piirustus ja Väritys on puhtaasti visuaalinen sovellus — työarkit sisältävät vain ruudukkokuvia nollatekstillä tuloksessa. Kaupallinen Paketti sisältää 10 mustavalkoista teemaa; Täysi Pääsy avaa kaikki yli 100 mustavalkoista teemaa ja kaikki 11 käyttöliittymäkieltä.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja työarkkeja Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä ruudukkopiirrustustyöarkkejasi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, tuotteina Gumroadissa tai minkä tahansa muun myyntikanavan kautta.',
    },
    {
      question: 'Sopivatko piirtämistehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Piirtämistehtävät sopivat kaikille ikäryhmille. Yksinkertaiset vaihe-vaiheelta-ohjeet sopivat esiopetukseen, monimutkaisemmat kuvat alkuopetukseen ja alakouluun. Piirtäminen ja väritys kehittävät hienomotoriikkaa ja luovuutta.',
    },
    {
      question: 'Noudattavatko piirtämistehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät tukevat OPS 2014:n kuvallisen ilmaisun (KU) tavoitteita: kuvallinen tuottaminen, värien käyttö ja visuaalinen viestintä. Vaihe-vaiheelta-piirtäminen kehittää ohjeiden seuraamista ja havainnointikykyä.',
    },
    {
      question: 'Miten luon piirtämistehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuva kirjastosta, aseta piirrosohjeiden tyyppi ja napsauta Luo. Generaattori luo automaattisesti vaihe-vaiheelta-ohjeet ja tyhjän tilan piirtämiseen.',
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
      slug: 'coloring-worksheets',
      anchorText: 'Värityssivut täydentäviin taidepaketteihin',
    },
    {
      pageType: 'app',
      slug: 'drawing-lines-worksheets',
      anchorText: 'Viivanjäljennystyöarkit hienomotoristen taitojen tuotteisiin',
    },
    {
      pageType: 'app',
      slug: 'pattern-worksheets',
      anchorText: 'Hahmontunnistustyöarkit visuaalisiin harjoituspaketteihin',
    },
    {
      pageType: 'app',
      slug: 'picture-bingo-worksheets',
      anchorText: 'Kuvabingogeneraattori pelillisiin tuotepaketteihin',
    },
    {
      pageType: 'app',
      slug: 'shadow-match-worksheets',
      anchorText: 'Varjoyhdistelygeneraattori visuaalisen hahmottamisen tuotteisiin',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-1.webp',
      primaryAlt: 'Piirustus ja väritys ruudukkopiirrustustyöarkki kaksoisruudukkojärjestelmällä näyttäen harjoitusruudukon ja vihjeruudukon mustavalkoisen ääriviivateeman kanssa',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-2.webp',
        alt: 'Ruudukkopiirrustustyöarkki eläimen mustavalkoisella ääriviivateemalla 25 % vihjeprosentilla',
        caption: 'Eläinteema 25 % vihjeillä — kopioi ääriviiva hajallaan olevista ruudukkohjeista',
      },
      {
        src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-3.webp',
        alt: 'Ruudukkopiirrustustyöarkki vaakasymetrian peilaustilassa vihjesolut peilattuina vasemmalta oikealle',
        caption: 'Vaakasymetriatila — vihjesolut peilaavat vasemmalta oikealle spatiaalisen päättelyn harjoitteluun',
      },
      {
        src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-4.webp',
        alt: 'Ruudukkopiirrustustyöarkki 10 % vihjeprosentilla näyttäen minimaaliset referenssisolut eksperttitason haasteeseen',
        caption: '10 % vihjehaaste — minimaaliset referenssisolut eksperttitason ruudukkokopiointiin',
      },
    ],
    youtubeId: '1uZubAOGIkM',
    videoTitle: 'Näin Luot Ruudukkopiirrustustyöarkkeja Säädettävällä Vihjeprosentilla ja Symmetriatiloilla — Vaiheittainen Opas',
  },
};

export default content;
