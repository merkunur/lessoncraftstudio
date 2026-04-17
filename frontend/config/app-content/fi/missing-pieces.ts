import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'palapeli puuttuvat palat tulostaa',
    secondaryKeywords: [
      'mikä pala sopii tehtävä',
      'palapeli tehtävämoniste',
      'visuaalinen logiikka tehtävä',
      'palapelipalat etsiä',
    ],
    lsiKeywords: [
      'hahmottaminen',
      'visuaalinen',
      'logiikka',
      'esiopetus',
      'vastaukset',
    ],
    titleTag: 'Puuttuvien palojen kone | LessonCraftStudio',
    metaDescription: 'Luo puuttuvat palat -tehtäviä teemakuvilla ja automaattisilla vastauksilla. 300 DPI PDF tulostettavat. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Puuttuvien palojen kone — Luo tulostettavia Etsy- ja KDP-myyntiin',
    tagline: 'Luo palapeli-tyylisiä palapeleja, joissa palat leikataan kuvista ja ratkaisijat tunnistavat oikean numeroidun vaihtoehdon — 6 palan muotoa, 1–5 puuttuvaa palaa, 2–6 ratkaisuvaihtoehtoa häiriöpalojen kanssa, automaattisesti luodut vastausavaimet ja puhtaasti visuaalinen suunnittelu, joka toimii kaikilla kielillä.',
    description:
      'Puuttuvat palat -palapelit ovat erottuva muoto Amazon KDP -aktiviteettikirjoihin — ratkaisijat tunnistavat mikä pala täydentää kuvan, kehittäen havainto- ja visuaalisia erottelutaitoja, joita vanhemmat aktiivisesti etsivät. Tämä generaattori luo ammattimaisia puuttuvien palojen työlehtiä säädettävillä ruudukkoko\'oilla ja automaattisilla vastausavaimilla alle 3 minuutissa. Valitse yli 3 000 temaattisesta kuvituksesta 104 kokoelmasta mihin tahansa nicheen tai kausitrenkiin. Jokainen palapeli viedään 300 DPI:n tulostusvalmiina PDF:nä kaupallisella lisenssillä Etsyyn, Amazon KDP:hen tai mille tahansa markkinapaikalle. Puhtaasti visuaalinen muoto toimii maailmanlaajuisesti ilman käännöstä, ja uniikki palapelityyppi kohtaa paljon vähemmän kilpailua kuin tavalliset työlehdet. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  ctaHeading: 'Luo puuttuvien palojen tehtäviä',

  howItWorks: {
    title: 'Näin luot Puuttuvat Palat -palapeleja vaihe vaiheelta',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivuasetukset-paneeli ja valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse sivuväri värinvalitsimella varataustaväriksi. Valitse taustateema ja säädä sen läpinäkyvyyttä (0–1 0,05:n välein), valitse sitten kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään.',
      },
      {
        title: 'Määritä palapeli',
        description:
          'Avaa Palapelinasetukset-paneeli ja aseta puuttuvien palojen lukumäärä 1:stä 5:een — tämä hallitsee, montako reikää leikataan kuvasta. Aseta ratkaisuvaihtoehtojen lukumäärä 2:sta 6:een, mikä sisältää oikeat palat plus häiriöpalat, jotka lisäävät vaikeutta. Valitse palan muoto 6 vaihtoehdosta: neliö (oletus), ympyrä, pystysuorakulmio, vaakasuorakulmio, pystyellipsi tai vaakaellipsi. Jokainen muoto luo erilaisen visuaalisen haasteen.',
      },
      {
        title: 'Valitse kuva kirjastosta tai lataa oma',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 temaattista kokoelmaa yli 3 100 värikkäällä kuvituksella — eläimet, ruoka, ajoneuvot, luonto, juhlapyhät ja kymmeniä muita. Suodata teeman mukaan pudotusvalikosta tai hae avainsanalla. Napsauta kuvaa valitaksesi sen palapeelin lähteeksi. Voit myös ladata omia PNG-, JPG- tai GIF-kuvia täydelliseen luovaan vapauteen.',
      },
      {
        title: 'Luo palapeli',
        description:
          'Sovellus leikkaa automaattisesti reikiä valitusta kuvasta älykkäällä palan erottamisella. Algoritmi yrittää jopa 150 sijoitusyritystä löytääkseen paloja riittävällä värivarianssilla (vähimmäiskirkkausvarianssi 15) ja vähintään 250 pikselin etäisyydellä toisistaan päällekkäisyyden estämiseksi. Valkoiset reiät mustalla viivalla (2 px) näkyvät alkuperäisissä sijainneissa. Numeroidut ratkaisuvaihtoehdot — oikeat palat plus häiriöpalat — näytetään keltaisilla numerotunnisteilla.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle nähdäksesi automaattisesti luodun vastausavaimen. Sama palapeli-kuva näkyy reikien kanssa, ja keltaiset numerotunnisteet (rgba(255,255,0,0.7)) jokaisen reiän sisällä näyttävät oikean vaihtoehdon indeksin. Lataa molemmat versiot neljällä erillisellä painikkeella: Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF — kaikki renderöity 300 DPI:llä JPEG-laadulla 1,0. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi Puuttuvat Palat -palapelit erottuvat Etsyssä ja KDP:ssä',
    features: [
      {
        title: 'Palapeli-tyyliset puuttuvien palojen palapelit säädettävällä vaikeudella',
        description:
          'Luo palapeleja, joissa kuvasta on leikattu reikiä ja ratkaisijat tunnistavat mikä numeroitu vaihtoehto täyttää kunkin aukon. Hallitse vaikeutta kahdella itsenäisellä säätimellä: aseta 1–5 puuttuvaa palaa palapelin monimutkaisuuden hallitsemiseksi ja 2–6 ratkaisuvaihtoehtoa hallitaksesi montako valintaa ratkaisija arvioi. Enemmän puuttuvia paloja tarkoittaa enemmän tilallista päättelyä; enemmän ratkaisuvaihtoehtoja (häiriöpalat mukaan lukien) tarkoittaa tarkempaa visuaalista erottelua.',
      },
      {
        title: 'Kuusi palan muotoa: Neliö, Ympyrä, Suorakulmio ja Ellipsivariantit',
        description:
          'Valitse 6 erilaisesta palan muodosta, jotka muuttavat jokaisen palapelin visuaalista luonnetta. Neliö (oletus) ja ympyrä tarjoavat siistit geometriset leikkaukset. Pystysuorakulmio ja vaakasuorakulmio luovat pitkänomaisia reikiä eri suuntiin — pysty käyttää 80 % leveyttä ja 100 % korkeutta, vaaka käyttää 100 % leveyttä ja 80 % korkeutta. Pysty- ja vaakaellipsit tarjoavat pehmeämmät kaarevat leikkaukset samoilla mittasuhteilla.',
      },
      {
        title: 'Älykäs palan erottaminen värivarianssitunnistuksella',
        description:
          'Palan erottamisalgoritmi varmistaa, että jokainen palapeli on visuaalisesti ratkaistavissa ja mukaansatempaava. Se yrittää jopa 150 sijoitusyritystä löytääkseen paloja vähimmäiskirkkausvarianssikynnyksen 15 — takaamaan, että jokainen erotettu pala sisältää riittävästi visuaalista yksityiskohtaa ollakseen tunnistettavissa. Palat säilyttävät vähintään 250 pikselin etäisyyden toisistaan päällekkäisyyden estämiseksi.',
      },
      {
        title: 'Automaattisesti luotu vastausavain keltaisilla numerotunnisteilla',
        description:
          'Jokainen puuttuvien palojen palapeli luo automaattisesti vastausavaimen erilliselle kangas-välilehdelle. Vastausavain näyttää saman palapeli-kuvan reikien kanssa ja asettaa keltaiset numerotunnisteet (rgba(255,255,0,0.7)) jokaisen reiän sisälle osoittaen oikean 1-pohjaisen vaihtoehdon indeksin. Fonttikoko skaalautuu 60 %:iin palan koosta selkeää luettavuutta varten.',
      },
      {
        title: 'Numeroidut ratkaisuvaihtoehdot häiriöpalojen kanssa',
        description:
          'Ratkaisuvaihtoehdot näytetään numeroiduissa konteissa (1–N) keltaisilla numerotunnisteilla selkeää tunnistamista varten. Kun ratkaisuvaihtoehtoja on enemmän kuin puuttuvia paloja, ylimääräiset ovat häiriöpaloja — erotettu kuvan eri alueilta, jotka eivät vastaa mitään reikää. Häiriöpalat pakottavat ratkaisijat vertaamaan tarkasti visuaalisia yksityiskohtia pelkän eliminoinnin sijaan.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa, jotka kattavat eläimet, ruoan, ajoneuvot, luonnon, ammatit, juhlapyhät, urheilun, vuodenajat ja kymmeniä muita. Jokainen teema tarjoaa värikkäitä kuvituksia, jotka toimivat palapelilähteinä — kuvat, joissa on vaihtelevia värejä ja erottuvia alueita, tuottavat mukaansatempaavimmat puuttuvien palojen palapelit. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa puuttuvien palojen palapeleja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:n tarkkuudella (6× kerroin) JPEG-laadulla 1,0. Neljä erillistä latauspainiketta vie työlehti- ja vastausavaintiedostot erikseen. Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) ja täysin mukautetut mitat. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
      {
        title: 'Täysi kangasmuokkaus tekstityökaluilla, kohdistuksella ja kerrosten hallinnalla',
        description:
          'Fabric.js-kangas tarjoaa täyden hallinnan jokaiseen elementtiin palapeelityölehdilläsi. Vedä, muuta kokoa, kierrä ja siirrä kuvia, tekstiä ja luotua sisältöä vapaasti. Lisää mukautettua tekstiä seitsemällä fonttivaihtoehdolla (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), säädettävällä koolla ja värillä. Zoomaa 25 %:sta 300 %:iin 25 %:n välein. Kumoa ja tee uudelleen 50 historian tilalla Ctrl+Z:llä ja Ctrl+Y:llä.',
      },
    ],
  },

  businessUseCases: {
    title: 'Myy visuaalisia palapeliaktiviteettikirjoja Etsyssä ja KDP:ssä',
    cases: [
      {
        title: 'Temaattiset puuttuvien palojen palapelipaketit Etsyssä',
        description:
          'Luo temaattisia palapelipaketteja 104 kuvakokoelmalla — eläinpalapelit, ajoneuvopalapelit, ruokapalapelit, luontopalapelit ja kymmeniä muita. Pakkaa 15–25 palapeleja per teema vastausavaimet mukaan lukien, vaihdellen vaikeutta 1 puuttuvasta palasta 2 vaihtoehdolla (helppo) 5 puuttuvaan palaan 6 vaihtoehdolla (vaikea). Sekoita palan muotoja paketin sisällä visuaaliseen vaihteluun. Automaattisesti luotu vastausavain poistaa palapeelituotannon suurimman aikakulun.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuaaliset palapelikirjat Amazon KDP:ssä',
        description:
          'Kokoa 50–100 puuttuvien palojen palapeleja painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna kirjasi asteittaisella vaikeudella: Luku 1 käyttää 1 puuttuvaa palaa 2 vaihtoehdolla aloittelijoille, Luku 2 käyttää 3 puuttuvaa palaa 4 vaihtoehdolla keskitasolle ja Luku 3 käyttää 5 puuttuvaa palaa 6 vaihtoehdolla edistyneille ratkaisijoille. Sisällytä vastausavaimet kirjan loppuun. Puhtaasti visuaaliset palapelit eivät vaadi käännöstä, mikä tekee yhdestä kirjasta myytävän jokaiselle markkinalle.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Niche-palapelikauppa Gumroadissa',
        description:
          'Rakenna kohdistettu palapelikauppa Gumroadiin visuaalisen erottelun ja kriittisen ajattelun aktiviteeteilla. Puuttuvien palojen palapelit vahvistavat tilallista päättelyä, visuaalista analyysiä ja tarkkuutta yksityiskohtiin. Luo niche-kohtaisia sarjoja: eläinten elinympäristöpalapelit, kausittaiset maisemapalapelit, yhteisöauttajapalapelit ja ruokaryhmäpalapelit. Jokainen sarja sisältää palapeliä ja vastausavaimia sekä PDF- että JPEG-muodossa.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausittaiset ja juhlapyhäpalapelikokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden. Luo aikarajoitettuja palapelikokoelmia, jotka ajoittuvat huippuostosjaksoihin. Julkaise halloween-palapelipaketit syyskuussa, joulukokoelmat lokakuussa ja ystävänpäiväpaketit tammikuussa. Vaihtele palan muotoja ja vaikeustasoja jokaisessa kausisarjassa maksimaalisen arvon takaamiseksi. Kausituotteet oikeuttavat korkeammat hinnat huippuaikoinaan.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausittainen)',
      },
      {
        title: 'Globaali markkinaveto — visuaaliset palapelit eivät vaadi käännöstä',
        description:
          'Puuttuvat Palat -palapelit ovat puhtaasti visuaalisia ilman tekstisisältöä itse työlehdellä — ei sanoja, ei kirjaimia, ei kieliriippuvaisia elementtejä. Englanniksi luotu palapeli toimii identtisesti asiakkaille Saksassa, Ranskassa, Japanissa tai Brasiliassa. Tämä tekee palapeelituotteistasi heti myytäviä jokaisella kansainvälisellä markkinapaikalla ilman erillisiä kieliversioita. Yksi tuote, kaikki markkinat — maksimaalinen tavoittavuus ilman lisätuotantotyötä.',
        platform: 'Globaalit markkinapaikat (kaikki alustat)',
      },
    ],
  },

  faq: [
    {
      question: 'Miten puuttuvien palojen palapeelimekanismi toimii?',
      answer:
        'Generaattori ottaa kuvan kirjastosta (tai latauksestasi) ja leikkaa 1–5 palaa jättäen valkoiset reiät mustilla viivakehyksillä alkuperäisiin sijainteihin. Se näyttää sitten 2–6 numeroitua ratkaisuvaihtoehtoa työlehden vierelle tai alle — oikeat palat plus häiriöpalat, jotka on erotettu saman kuvan muilta alueilta. Ratkaisijat tutkivat reiät ja numeroidut vaihtoehdot ja tunnistavat mikä vaihtoehto täyttää kunkin aukon värin, kuvion ja visuaalisen yksityiskohdan perusteella.',
    },
    {
      question: 'Mitkä 6 palan muotoa ovat saatavilla?',
      answer:
        'Voit valita neliön (oletus), ympyrän, pystysuorakulmion (80 % leveys, 100 % korkeus), vaakasuorakulmion (100 % leveys, 80 % korkeus), pystyellipsin (80 % rx, 100 % ry) ja vaakaellipsin (100 % rx, 80 % ry). Jokainen muoto luo erilaisen visuaalisen haasteen. Neliö ja ympyrä tarjoavat siistit geometriset leikkaukset, kun taas suorakulmio- ja ellipsivariantit luovat pitkänomaisia tai kaarevia muotoja.',
    },
    {
      question: 'Miten vaikeusasetukset toimivat?',
      answer:
        'Vaikeutta hallitaan kahdella itsenäisellä asetuksella. Puuttuvien palojen lukumäärä (1–5) määrittää montako reikää leikataan kuvasta — enemmän paloja tarkoittaa enemmän tilallista päättelyä. Ratkaisuvaihtoehtojen lukumäärä (2–6) määrittää montako numeroitua vaihtoehtoa ratkaisija arvioi — kun vaihtoehtoja on enemmän kuin puuttuvia paloja, ylimääräiset ovat häiriöpaloja, jotka vaativat tarkkaa visuaalista vertailua.',
    },
    {
      question: 'Mitä häiriöpalat ovat ja miten ne luodaan?',
      answer:
        'Häiriöpalat ovat ylimääräisiä ratkaisuvaihtoehtoja, jotka eivät vastaa mitään palapelin reikää. Ne erotetaan saman lähdekuvan eri alueilta jopa 200 sijoitusyrityksellä, varmistaen etteivät ne mene päällekkäin oikeiden palojen kanssa. Häiriöpalat estävät ratkaisua pelkällä eliminoinnilla — ratkaisijan on tarkasti verrattava värejä, kuvioita ja visuaalisia yksityiskohtia oikeiden vaihtoehtojen erottamiseksi samankaltaisista vaihtoehdoista.',
    },
    {
      question: 'Ovatko puuttuvien palojen palapelit kieliriippuvaisia?',
      answer:
        'Ei. Puuttuvat Palat on puhtaasti visuaalinen palapelimuoto ilman tekstisisältöä itse työlehdellä — ei sanoja, ei kirjaimia, ei kieliriippuvaisia elementtejä. Ainoa kieliriippuvainen elementti on automaattisesti luotu otsikkoteksti ("Puuttuvat Palat"), joka on lokalisoitu kaikilla 11 tuetulla kielellä. Itse palapeli toimii identtisesti kaikilla kielillä, mikä tekee siitä ihanteellisen globaaleille markkinoille.',
    },
    {
      question: 'Miten automaattisesti luotu vastausavain toimii?',
      answer:
        'Generaattori käyttää kaksikangas-järjestelmää Työlehti-välilehdellä ja Vastausavain-välilehdellä. Vastausavain näyttää saman palapeli-kuvan reikien kanssa, mutta jättää pois ratkaisuvaihtoehdot. Sen sijaan keltaiset numerotunnisteet (rgba(255,255,0,0.7)) asetetaan jokaisen reiän sisälle osoittaen oikean 1-pohjaisen vaihtoehdon indeksin. Fonttikoko skaalautuu 60 %:iin palan koosta selkeää luettavuutta varten.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia 6 palan muotoa, säädettäviä puuttuvia paloja ja ratkaisuvaihtoehtoja, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja ja kaikkia latausmuotoja — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Sopivatko puuttuvat palat -tehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Puuttuvat palat -tehtävät sopivat erinomaisesti esiopetukseen ja alkuopetukseen — ne kehittävät visuaalista hahmottamista ilman lukutaitovaatimusta. Monimutkaisemmat kuvat haastavat myös alakoulun oppilaita.',
    },
    {
      question: 'Noudattavatko puuttuvat palat -tehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Tehtävät tukevat OPS 2014:n laaja-alaista osaamista L1 (ajattelu ja oppimaan oppiminen) sekä matematiikan geometrian hahmottamisen tavoitteita. Visuaalinen päättely ja osa-kokonaisuus-suhteen ymmärtäminen ovat keskeisiä taitoja.',
    },
    {
      question: 'Miten luon puuttuvat palat -tehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuva kirjastosta, aseta palojen määrä ja napsauta Luo. Generaattori leikkaa kuvan automaattisesti ja poistaa yhden palan. Vastausavain syntyy samalla.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata kaikkia 6 palan muotoa, säädettäviä vaikeusasetuksia, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja ja kaikkia latausmuotoja ennen ostamista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'ruudukkopalapeli-tyolehdat',
      anchorText: 'Ruudukkoyhdistely-palapeleja visuaalisiin palapeelipaketteihin',
    },
    {
      pageType: 'app',
      slug: 'kumpi-ei-kuulu-tyolehdat',
      anchorText: 'Kumpi ei kuulu -palapeleja havaintotaitopaketteihin',
    },
    {
      pageType: 'guide',
      slug: 'luo-puuttuvat-palat-palapeleja',
      anchorText: 'Opas myytävien puuttuvien palojen palapelien luomiseen',
    },
    {
      pageType: 'app',
      slug: 'varjoleikki-tyolehdat',
      anchorText: 'Varjoleikkitehtäviä visuaalisen hahmottamisen paketteihin',
    },
    {
      pageType: 'app',
      slug: 'etsi-esineet-tyolehdat',
      anchorText: 'Etsi esineet -tehtäviä havaintotaitopaketteihin',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/missing%20pieces/puuttuvat-palat-1.webp',
      primaryAlt: 'Puuttuvien palojen palapeelityölehti reikiä leikattuina kuvasta ja numeroiduilla ratkaisuvaihtoehdoilla häiriöpalojen kanssa',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-2.webp',
        alt: 'Puuttuvien palojen palapeli neliönmuotoisilla reíillä leikattuna värikkäästä kuvituksesta',
        caption: 'Neliömäinen palan muoto — siistit geometriset leikkaukset selkeään visuaaliseen tunnistamiseen',
      },
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-3.webp',
        alt: 'Puuttuvien palojen palapeli pyöreillä reíillä ja numeroiduilla ratkaisuvaihtoehdoilla',
        caption: 'Ympyräpalan muoto — pyöristetyt leikkaukset häiriövaihtoehdoilla lisähaasteeseen',
      },
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-1-answer-key.webp',
        alt: 'Puuttuvien palojen palapelin vastausavain keltaisilla numeroilla jokaisen reiän sisällä',
        caption: 'Automaattisesti luotu vastausavain — keltaiset merkinnät näyttävät oikean vaihtoehdon jokaiselle reiälle',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Näin luot Puuttuvat Palat -palapeleja 6 muodolla ja automaattisilla vastausavaimilla — Vaihe vaiheelta -opas',
  },
};

export default content;
