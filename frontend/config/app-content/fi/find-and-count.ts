import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'etsi ja laske tehtävä tulostaa',
    secondaryKeywords: [
      'laske esineet tehtävä',
      'montako on? tehtävä',
      'laskuharjoitus esiopetus',
      'etsi ja laske lapset',
    ],
    lsiKeywords: [
      'laskeminen',
      'esiopetus',
      'alakoulu',
      'havainnointi',
      'vastaukset',
    ],
    titleTag: 'Etsi ja laske tehtävä tulostaa | Laskuharjoitusgeneraattori',
    metaDescription: 'Luo etsi-ja-laske tehtäviä, joissa lapset etsivät ja laskevat teemakuvia. Automaattiset vastaukset. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Luo Etsi ja Laske -työlehtia myytäväksi Etsyssä ja KDP:ssä',
    tagline: 'Kaksi aktiviteettitilaa yhdessä generaattorissa — Piilotettu Esine -etsintä ja Kirjainetsintä — neljällä sekoitettavalla tehtävätyypillä (ympyröi, neliö, ruksaa, laske), kielikohtaisilla aakkosilla kirjaimilla, lokalisoiduilla kuvanimillä 11 kielellä ja automaattisilla vastausavaimilla visuaalisilla merkinnöillä.',
    description:
      'Etsi-ja-laske-työlehdet yhdistävät Etsi ja Löydä -muodon vetovoimaan laskentaharjoituksen — formaatti, joka myy tasaisesti Etsyssä ja tekee erinomaisia Amazon KDP -aktiviteettikirjoja. Tämä generaattori luo ammattimaisia etsi-ja-laske-työlehtia, joissa ratkaisijat etsivät tiettyjä esineitä hajautetusta kohtauksesta ja suorittavat tehtäviä kuten ympyröiminen, laskeminen tai ruksiiminen. Kirjainetsintä-tila lisää aakkosoppimisen kielikohtaisilla merkistöillä mukaan lukien saksalaiset umlautit ja ranskan aksenttimerkit. Valitse yli 3 000 temaattisesta kuvituksesta 104 kokoelmasta ja vie 300 DPI:n tulostusvalmiita PDF-tiedostoja automaattisilla merkityillä vastausavaimilla. 11 kielen tuki lokalisoiduilla kuvaetiketeillä luo erillisiä tuotteita per kieli. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  howItWorks: {
    title: 'Näin luot Etsi ja Laske -työlehtia vaihe vaiheelta',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivuasetukset-paneeli ja valitse sivukoko: Oletus (800×1000), Letter, A4, Neliö (1200×1200) tai mukautettu koko. Määritä ruudukon tiheys riveillä (5–10) ja sarakkeilla (5–10) — oletus on 6×6. Valitse sivuväri, taustateema läpinäkyvyydellä ja kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään.',
      },
      {
        title: 'Valitse aktiviteettitila',
        description:
          'Valitse kahdesta tilasta. Piilotettu Esine -tila (oletus) luo klassisia Etsi ja Löydä -kohtauksia — hajautetut kuvat ruudukossa, jossa ratkaisijat etsivät tiettyjä esineitä. Kirjainetsintä-tila aktivoi kielikohtaisen aakkosruudukon aksenttikirjaimilla ja luo kohtauksia käyttäen kuvia, jotka alkavat valitulla kirjaimella. Otsikko vaihtuu automaattisesti "Etsi ja Löydä" ja "Kirjainetsintä" välillä (lokalisoitu kaikilla 11 kielellä).',
      },
      {
        title: 'Valitse kuvat ja määrää tehtävätyypit',
        description:
          'Piilotettu Esine -tilassa valitse enintään 4 kohdetta Kuvakirjaston 104 temaattisesta kokoelmasta. Jokaiselle valitulle kuvalle määrää tehtävätyyppi pudotusvalikosta: ympyröi (piirrä ympyrä sen ympärille), neliö (laita neliö ympärille), ruksaa (vedä ruksi yli) tai laske (laske montako esiintymää löytyy). Ruudukko täyttää loput solut satunnaisilla häiriökuvilla teemasta. Kirjainetsintä-tilassa napsauta kirjainta aakkosruudukosta, jolloin kohdekuvat ja häiriökuvat täyttyvät automaattisesti.',
      },
      {
        title: 'Luo Etsi ja Löydä -työlehti',
        description:
          'Sovellus automaattisesti luo eläinteeman, 4 satunnaista kuvaa ja satunnaiset tehtävätyypit sivulatauksen yhteydessä. Napsauta Luo rakentaaksesi uudelleen mukautetuilla asetuksillasi. Hajautettu kuvakohtaus täyttää ruudukon kohdeobjekteilla satunnaisesti jaettuna (1–5 esiintymää kutakin) häiriökuvien joukossa. Tyylikäs otsikko näkyy yläosassa sinisellä reunuksella (#2196F3), keltaisella sisäkorostuksella ja lokalisoidulla otsikolla ja ohjeilla Fredoka- ja Quicksand-fonteilla.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle nähdäksesi automaattiset merkinnät: punaiset ympyrät ympyröintitehtävien kohteiden ympärillä, punaiset neliöt neliöintitehtävien kohteiden ympärillä, punaiset ruksit ruksattavien kohteiden yli ja lukumäärät laskentatehtävien kohteille. Lataa molemmat versiot neljällä painikkeella: Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF 300 DPI:llä. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi Etsi ja Laske -työlehdet myyvät Etsyssä ja KDP:ssä',
    features: [
      {
        title: 'Kaksi aktiviteettitilaa: Piilotettu Esine -etsintä ja Kirjainetsintä',
        description:
          'Yksi generaattori kattaa kaksi erillistä aktiviteettimuotoa. Piilotettu Esine -tila luo klassisia Etsi ja Löydä -kohtauksia, joissa ratkaisijat etsivät enintään 4 kohdetta ja suorittavat määrättyjä tehtäviä. Kirjainetsintä-tila aktivoi kielikohtaisen aakkosruudukon — suomi A–Ö (29 kirjainta), englanti A–Z (26 kirjainta), saksa A–Z + ÄÖÜ (29 kirjainta), espanja A–Z + Ñ (27 kirjainta), ruotsi A–Ö (29 kirjainta), tanska/norja A–Z + ÆØÅ (29 kirjainta) — ja luo kohtauksia kuvilla, jotka alkavat valitulla kirjaimella.',
      },
      {
        title: 'Neljä tehtävätyyppiä: Ympyröi, Neliö, Ruksaa ja Laske — sekoitettavissa yhdellä työlehdellä',
        description:
          'Määrää eri tehtävätyyppi jokaiselle enintään 4 kohdeobjektille yhdellä työlehdellä. Ympyröintitehtävät kehottavat piirtämään ympyrän kohteen ympärille. Neliöintitehtävät kehottavat laittamaan neliön ympärille. Ruksaustehtävät kehottavat vetämään ruksin yli. Laskentatehtävät kehottavat laskemaan montako esiintymää löytyy ja kirjoittamaan numeron. Sekoita kaikki neljä tehtävätyyppiä yhdellä työlehdellä monipuolisiin kognitiivisiin haasteisiin.',
      },
      {
        title: 'Kielikohtaiset aakkoset aksenttikirjaimilla Kirjainetsintää varten',
        description:
          'Kirjainetsintä-tila näyttää aakkosruudukon, joka on räätälöity kunkin kielen merkistölle. Suomessa ja ruotsissa on Å, Ä ja Ö normaalien 26 kirjaimen lisäksi. Saksassa on Ä, Ö ja Ü. Espanjassa on Ñ. Tanskassa ja norjassa on Æ, Ø ja Å. Aakkosruudukko renderöi 7 sarakkeessa ja säätää automaattisesti rivimäärän kielen kirjainmäärän perusteella. Valitse kirjain, ja generaattori luo Etsi ja Löydä -kohtauksen kuvilla, jotka alkavat kyseisellä kirjaimella valitulla kielellä.',
      },
      {
        title: 'Lokalisoidut kuvanimietiketit 11 kielellä Image Vocabulary -järjestelmän kautta',
        description:
          'Etsi ja Laske -generaattori on kieliriippuvainen. Kuvanimietiketit työlehdellä renderöidään valitulla kielellä Image Vocabulary -järjestelmän (image-vocabulary.js) kautta. Kielen vaihto englanniksi vaihtaa "kissa" -> "cat", "koira" -> "dog", ja ensimmäiset kirjaimet päivittyvät vastaavasti Kirjainetsintä-tilassa. Kaikkia 11 kieltä tuetaan. Kaupallinen paketti sisältää vain englannin; Täysi pääsy avaa kaikki 11 kieltä lokalisoituihin etiketteihin.',
      },
      {
        title: 'Automaattisesti luotu vastausavain visuaalisilla merkinnöillä ja lukumäärillä',
        description:
          'Jokainen Etsi ja Löydä -työlehti luo automaattisesti vastausavaimen erilliselle kangas-välilehdelle. Vastausavain toistaa tarkan työlehtiasettelu ja lisää punaisia visuaalisia merkintöjä: ympyrät ympyröintitehtävien kohteiden ympärille, neliöt neliöintitehtävien kohteiden ympärille, ruksit ruksattavien yli ja lukumäärät laskentatehtävien kohteille. Ei manuaalista merkintää, ei erillistä tiedoston luontia.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa. Jokainen teema tarjoaa yhtenäisen värikkäiden kuvitusten sarjan, joka toimii sekä kohdeobjekteina että häiriökuvina Etsi ja Löydä -kohtauksissa. Kaupallinen paketti sisältää 10 värikästä teemaa (~300 kuvaa); Täysi pääsy avaa kaikki 104 teemaa yli 3 100 kuvituksella.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa työlehtia ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:n tarkkuudella (6× kerroin). Sivukoot sisältävät Oletus (800×1000), Letter, A4, Neliö (1200×1200) ja täysin mukautetut mitat. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
      {
        title: 'Säädettävä ruudukon tiheys 5–10 rivillä ja 5–10 sarakkeella',
        description:
          'Hallitse Etsi ja Löydä -työlehtiesi vaikeutta ja visuaalista tiheyttä säätämällä ruudukon mittoja. Aseta rivit 5:stä 10:een ja sarakkeet 5:stä 10:een — oletus on 6×6 (36 solua). 5×5-ruudukko (25 solua) luo helpompia työlehtia suuremmilla kuvilla aloitustason tuotteisiin. 10×10-ruudukko (100 solua) luo haastavia tiheitä kohtauksia edistystason tuotteisiin. Kohdeobjektit jaetaan satunnaisesti 1–5 esiintymällä kutakin.',
      },
    ],
  },

  businessUseCases: {
    title: 'Rakenna Etsi ja Löydä -laskentabisnes Etsyssä ja KDP:ssä',
    cases: [
      {
        title: 'Temaattiset Etsi ja Löydä -aktiviteettipaketit Etsyssä',
        description:
          'Luo temaattisia Etsi ja Löydä -työlehipaketteja 104 kuvakokoelmalla — eläinetsintä, juhlapyhäetsintä, ruokaetsintä, ajoneuvoetsintä ja kymmeniä muita. Sekoita kaikki neljä tehtävätyyppiä paketin sisällä vaihteluun. Pakkaa 10–20 työlehtä per teema vastausavaimet mukaan lukien, ja myy 3–7 € per paketti.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Etsi ja Löydä -aktiviteettityökirjat Amazon KDP:ssä',
        description:
          'Kokoa 40–80 Etsi ja Löydä -työlehtä painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna asteittaisella vaikeudella: varhaiset luvut 5×5-ruudukoilla ja 2 kohdeobjektilla, keskitason luvut 7×7-ruudukoilla ja 3 kohteella, edistyneet luvut 10×10-ruudukoilla kaikilla 4 kohteella ja sekatehtävätyypeillä. Sisällytä vastausavaimet kirjan loppuun. Harmaasävyvaihto tuottaa musteystävällisiä sivuja mustavalkoisten kirjansisäsivujen valmiiksi.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Etsi ja Löydä -laskentaaktiviteettipaketit Gumroadiin',
        description:
          'Rakenna valmiita Etsi ja Löydä -laskenta-työlehtä, joissa ratkaisijat etsivät, löytävät ja laskevat esineitä hajautetussa kohtauksessa. Laskentatehtävätyyppi pyytää käyttäjiä kirjoittamaan montako esiintymää he löytävät. Luo temaattisia sarjoja: maatilaeläinten laskenta, yhteisöauttajien laskenta, merieläinten laskenta ja kausiesineiders laskenta.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kirjainetsintä- ja fonetiikkapaketit aakkostietoisuuteen',
        description:
          'Hyödynnä Kirjainetsintä-tilaa luodaksesi etsintätyölehtä, jotka keskittyvät alkukirjainten tunnistamiseen. Jokainen työlehti kohdistaa tiettyyn kirjaimeen — ratkaisijat etsivät kaikki kohteet, jotka alkavat kyseisellä kirjaimella hajautetusta kuvakohtauksesta. Luo täydellinen A–Ö Kirjainetsintä -paketti 29 työlehdellä (yksi per kirjain) ja vastausavaimilla. Kielikohtaiset aakkoset aksenttikirjaimilla mahdollistavat kielikohtaisten fonetiikkapakettien luomisen suomelle ja muille kielille.',
        platform: 'Etsy / Gumroad (lukutaitomarkkina)',
      },
      {
        title: 'Monikieliset Etsi ja Löydä -kokoelmat globaaleille markkinoille',
        description:
          'Hyödynnä kieliriippuvaisia kuvanimietikettejä luodaksesi Etsi ja Löydä -työlehtä 11 kielellä. Samat kuvat tuottavat eri etiketit kielen vaihtuessa — kuvanimet, Kirjainetsinnän ensimmäiset kirjaimet ja otsikkoteksti päivittyvät automaattisesti. Luo monikielisiä paketteja, joissa jokainen kieliversio käyttää samoja temaattisia kuvia mutta lokalisoituja etikettejä. Myy kielikohtaisia paketteja tai monikielisiä megapaketteja premium-hintaan.',
        platform: 'Etsy / Gumroad (monikielinen markkina)',
      },
    ],
  },

  faq: [
    {
      question: 'Mitkä ovat kaksi aktiviteettitilaa ja miten ne eroavat?',
      answer:
        'Generaattori tarjoaa kaksi erillistä tilaa. Piilotettu Esine -tila (oletus) luo klassisia Etsi ja Löydä -kohtauksia — hajautetut kuvat säädettävässä ruudukossa, jossa ratkaisijat etsivät enintään 4 kohdetta ja suorittavat määrättyjä tehtäviä (ympyröi, neliö, ruksaa tai laske). Kirjainetsintä-tila aktivoi kielikohtaisen aakkosruudukon ja luo kohtauksia käyttäen kuvia, jotka alkavat valitulla kirjaimella. Otsikko vaihtuu automaattisesti "Etsi ja Löydä" ja "Kirjainetsintä" välillä (lokalisoitu kaikilla 11 kielellä).',
    },
    {
      question: 'Mitkä ovat neljä tehtävätyyppiä ja voinko sekoittaa niitä yhdellä työlehdellä?',
      answer:
        'Neljä tehtävätyyppiä ovat ympyröi (piirrä ympyrä kohteen ympärille), neliö (laita neliö kohteen ympärille), ruksaa (vedä ruksi kohteen yli) ja laske (laske montako esiintymää löytyy ja kirjoita numero). Kyllä, voit määrätä eri tehtävätyypin jokaiselle enintään 4 kohdeobjektille yhdellä työlehdellä.',
    },
    {
      question: 'Miten Kirjainetsintä toimii eri kielillä?',
      answer:
        'Kirjainetsintä-tila näyttää kielikohtaisen aakkosruudukon. Suomi ja ruotsi näyttävät A–Ö (29 kirjainta), englanti A–Z (26 kirjainta), saksa lisää Ä, Ö ja Ü (29 kirjainta), espanja lisää Ñ (27 kirjainta) ja tanska/norja lisäävät Æ, Ø ja Å (29 kirjainta). Ruudukko renderöi 7 sarakkeessa automaattisella rivisäädöllä. Kun valitset kirjaimen, generaattori näyttää kuvia, jotka alkavat kyseisellä kirjaimella valitulla kielellä.',
    },
    {
      question: 'Onko Etsi ja Laske -generaattori kieliriippuvainen?',
      answer:
        'Kyllä. Kuvanimietiketit renderöidään valitulla kielellä Image Vocabulary -järjestelmän kautta. Esimerkiksi kissakuva näyttää "Kissa" suomeksi, "Cat" englanniksi, "Katze" saksaksi. Kirjainetsintä-tilassa myös ensimmäiset kirjaimet vaihtuvat kielen mukaan. Kaupallinen paketti tukee vain englantia; Täysi pääsy avaa kaikki 11 kieltä.',
    },
    {
      question: 'Miten automaattisesti luotu vastausavain toimii?',
      answer:
        'Generaattori käyttää kaksikangas-järjestelmää Työlehti-välilehdellä ja Vastausavain-välilehdellä. Työlehti näyttää hajautetun kuvakohtauksen ilman merkintöjä. Vastausavain toistaa identtisen asettelun ja lisää punaisia visuaalisia merkintöjä: ympyrät ympyröintitehtävien kohteiden ympärille, neliöt neliöintitehtävien kohteiden ympärille, ruksit ruksattavien yli ja lukumäärät laskentatehtävien kohteille.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — molempia aktiviteettitiloja, kaikkia neljää tehtävätyyppiä, Kirjainetsintää kielikohtaisilla aakkosilla, säädettäviä ruudukon mittoja, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja ja kaikkia latausmuotoja — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja Etsi ja Löydä -työlehtä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä Etsi ja Löydä- ja etsi-ja-laske-työlehtiäsi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, tuotteina Gumroadissa tai millä tahansa muulla myyntikanavalla.',
    },
    {
      question: 'Sopivatko etsi ja laske -tehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Etsi ja laske -tehtävät sopivat erinomaisesti esiopetukseen (laskeminen 1–5), alkuopetukseen (laskeminen 1–10) ja alakoulun alkuun. Tehtävät yhdistävät visuaalisen havainnoinnin ja laskemisen konkreettisesti.',
    },
    {
      question: 'Noudattavatko etsi ja laske -tehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät tukevat OPS 2014:n matematiikan tavoitteita T5 (laskutaidon kehittäminen) ja esiopetuksen lukumäärien hahmottamisen tavoitteita. Esineiden laskeminen kuvasta on konkreettista matematiikkaa, jota opetussuunnitelma painottaa.',
    },
    {
      question: 'Miten luon etsi ja laske -tehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuvat kirjastosta, aseta etsittävien kuvien määrä ja napsauta Luo. Generaattori sijoittaa kuvat automaattisesti ja luo laskentatehtävän vastausavaimineen.',
    },
    {
      question: 'Sisältyvätkö vastaukset automaattisesti?',
      answer:
        'Kyllä. Jokainen tehtävä sisältää automaattisesti luodun vastausavaimen, jossa oikeat lukumäärät on merkitty. Vastausavain on erillisellä sivulla.',
    },
    {
      question: 'Voinko myydä näitä tehtäviä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä etsi ja laske -tehtäviä digitaalisina latauksina Etsyssä, painettuina aktiviteettikirjoina Amazon KDP:ssä tai millä tahansa muulla alustalla.',
    },
    {
      question: 'Kuinka monella kielellä voin luoda tehtäviä?',
      answer:
        'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja. Kuvanimet ja otsikot kääntyvät automaattisesti valitulle kielelle. Jokainen kieliversio on erillinen tuote.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'etsi-esineet-tyolehdat',
      anchorText: 'Etsi Esineet -työlehtia täydentäviin etsintäpaketteihin',
    },
    {
      pageType: 'app',
      slug: 'kuvio-laske-tyolehdat',
      anchorText: 'Kuviodiagrammi-työlehtia täydellisiin laskentatuotteisiin',
    },
    {
      pageType: 'app',
      slug: 'aarteenetsinta-tyolehdat',
      anchorText: 'Aarteenetsintä-työlehtia etsintäteemaisiin paketteihin',
    },
    {
      pageType: 'app',
      slug: 'ruudukkopalapeli-tyolehdat',
      anchorText: 'Ruutupiirrostehtäviä visuaalisiin hahmottamispaketteihin',
    },
    {
      pageType: 'guide',
      slug: 'luo-laskenta-tyolehtia',
      anchorText: 'Opas etsi ja laske -työlehien luomiseen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/find%20and%20count/minä-näen-1.webp',
      primaryAlt: 'Etsi ja Löydä etsi-ja-laske-työlehti hajautetuilla kuvilla ruudukossa, sinisellä otsikkokehyksellä ja neljän tehtävätyypin ohjeilla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/find%20and%20count/minä-näen-1.webp',
        alt: 'Piilotettu esine -työlehti pystytilassa hajautetuilla eläinkuvilla ja tehtäväohjeilla',
        caption: 'Piilotettu Esine -tila — klassinen Etsi ja Löydä ympyröi-, neliö-, ruksaa- ja laskentatehtävillä',
      },
      {
        src: '/samples/finnish/find%20and%20count/minä-näen-2.webp',
        alt: 'Etsi-ja-laske-työlehti vaakatilassa leveämmällä ruudukkoasettelulla',
        caption: 'Vaakatila — leveämpi ruudukkoasettelu useammilla sarakkeilla ja vaihtelevalla visuaalisella tiheydellä',
      },
      {
        src: '/samples/finnish/find%20and%20count/minä-näen-1-answer-key.webp',
        alt: 'Etsi-ja-laske-vastausavain punaisilla ympyrä-, neliö- ja ruksimerkinnöillä oikeiden kohteiden yli',
        caption: 'Automaattisesti luotu vastausavain — punaiset merkinnät ja lukumäärät osoittavat oikeat vastaukset',
      },
    ],
    youtubeId: '0cOPi7eajLs',
    videoTitle: 'Näin luot Etsi ja Löydä Etsi ja Laske -työlehtia 4 tehtävätyypillä ja Kirjainetsinnällä — Vaihe vaiheelta -opas',
  },
};

export default content;
