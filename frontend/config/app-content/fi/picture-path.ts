import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'labyrintti tulostaa',
    secondaryKeywords: [
      'labyrintti-generaattori',
      'labyrintti lapsille tulostaa',
      'luo labyrintti',
      'sokkelo tulostaa',
    ],
    lsiKeywords: [
      'sokkelo',
      'polku',
      'reitti',
      'lapset',
      'vastaukset',
      'PDF',
    ],
    titleTag: 'Labyrintti tulostaa | Labyrinttigeneraattori',
    metaDescription: 'Luo labyrintteja teemakuvilla. Automaattiset vastaukset, 300 DPI PDF. Kokeile ilmaiseksi — myy Etsyssä & Amazon KDP:ssä.',
  },

  hero: {
    title: 'Luo kuvapolku-sokkeloita myytäväksi Etsyssä ja Amazon KDP:ssä',
    tagline: 'Kolme pelitilaa yhdessä generaattorissa — Kuvapolku, Klassinen Sokkelo ja Valitse Oikea Polku — LPF (Pisin Polku Ensin) -sokkelo-algoritmilla, automaattisilla vastausavaimilla, seinien mukauttamisella ja puhtaasti visuaalisella suunnittelulla, joka toimii globaalisti ilman käännöstä.',
    description:
      'Kuvapolku-sokkelot yhdistävät sokkelopalapelien ajattoman vetovoiman temaattisiin kuviin — ratkaisijat navigoivat polkuja tiettyihin määränpäihin luoden mukaansatempaavan muodon, joka myy hyvin Etsyssä ja Amazon KDP -aktiviteettikirjoissa. Tämä generaattori luo ammattimaisia kuvapolku-työlehtia temaattisilla kuvamääränpäillä ja automaattisilla vastausavaimilla alle 3 minuutissa. Valitse yli 3 000 kuvituksesta 104 kokoelmasta. Jokainen sokkelo viedään 300 DPI:n tulostusvalmiina PDF:nä kaupallisella lisenssillä. Sokkelo-aktiviteettikirjat ovat todistettu KDP-kategoria tasaisella kysynnällä, ja kuvapolku-muoto lisää visuaalista vetovoimaa, jota tavallisilla viivasokkeloilla ei ole. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  ctaHeading: 'Luo labyrintteja',

  howItWorks: {
    title: 'Näin luot kuvapolku-sokkeloita vaihe vaiheelta',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivuasetukset-paneeli ja valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse sivuväri, taustateema läpinäkyvyydellä ja kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään.',
      },
      {
        title: 'Valitse pelitila ja määritä asetukset',
        description:
          'Avaa Polkuasetukset-paneeli ja valitse kolmesta pelitilasta. Kuvapolku luo kuvaruudukon yhdellä oikealla polulla alusta loppuun. Klassinen Sokkelo luo seinäpohjaisia sokkeloita LPF-algoritmilla — aseta ruudukon koko (15×15–20×20), polkujen lukumäärä (1, 2 tai 3), kerättävien kuvien lukumäärä ja kopiot, seinän väri, paksuus (1–10 px) ja läpinäkyvyys (10–100 %). Valitse Oikea Polku luo kolmen polun sokkeloita neljällä suuntavaihtoehdolla. Vaihda "Sisällytä nimi/päivämäärä -kentät" lisätäksesi nimi- ja päivämäärärivit.',
      },
      {
        title: 'Valitse kuvat rooleittain kirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja määrää kuvia viiteen erilliseen rooliin roolinvalitsimen avulla: Aloituskuva (sisääntulopiste), Loppukuva (määränpää — 1 Polulle/Sokkelolle, 3 Valitse Polulle), Polkukuvat (oikea reitti tai kerättävät), Häiriökuvat (väärät solut tai ei-polun täyte) ja Koriste (vapaa sijoittelu kankaalle). Selaa 104 temaattista kokoelmaa yli 3 100 kuvituksella tai lataa omia kuvia.',
      },
      {
        title: 'Luo sokkelo- tai polku-työlehti',
        description:
          'Napsauta Luo tuottaaksesi sokkelo-asettelun valitulle pelitilalle. Kuvapolku järjestää kuvat ruudukkoon yhdellä oikealla polulla polkukuvilla häiriökuvien joukossa. Klassinen Sokkelo rakentaa seinäpohjaisia käytäviä kerättävillä kuvilla polkujen varrella. Valitse Oikea Polku rakentaa kolme erillistä reittiä yhdellä oikealla polulla ja harhautusvaihtoehtoilla. Automaattisesti luotu otsikko näkyy yläosassa oranssilla ulkokehyksellä.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle nähdäksesi automaattisesti luodun ratkaisun. Vastausavain korostaa oikean polun vaaleanpunaisilla ympyröillä reitin varrella. Valitse Polku -tila lisää "✓ OIKEA POLKU" -merkinnän oikealle polulle. Klassinen Sokkelo sisältää kerättävien legendan kuvalukumäärineen. Lataa neljällä painikkeella: Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF 300 DPI:llä. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi kuvapolku-sokkelot myyvät Etsyssä ja Amazon KDP:ssä',
    features: [
      {
        title: 'Kolme pelitilaa: Kuvapolku, Klassinen Sokkelo ja Valitse Oikea Polku',
        description:
          'Yksi generaattori tuottaa kolme erillistä sokkelotyyppistä aktiviteettia. Kuvapolku luo kuvaruudukon, jossa ratkaisijat seuraavat oikeaa polkua alusta loppuun tunnistamalla polkukuvat häiriökuvien joukosta. Klassinen Sokkelo luo ammattimaisia seinäpohjaisia sokkeloita LPF-algoritmilla kerättävine kuvineen käytävillä. Valitse Oikea Polku esittää kolmen polun sokkeloita, joissa ratkaisijat tunnistavat ainoan oikean reitin harhautusten joukosta. Jokainen tila tuottaa erilaisen kognitiivisen haasteen samasta kuvakirjastosta.',
      },
      {
        title: 'Ammattimainen LPF-sokkeloalgoritmi laadun pistetyksellä ja umpikujien estolla',
        description:
          'LPF (Pisin Polku Ensin) -algoritmi luo korkealaatuisia seinäpohjaisia sokkeloita käytävä-solu-järjestelmällä ja dynaamisella seinän sijoittelulla. Polun laadunpisteytys arvioi käännöksiä, pituutta ja esteitä varmistaen haastavia mutta ratkaistavia sokkeloita joka kerta. Monipolkutuki luo 1, 2 tai 3 polkua automaattisella umpikujaestolla väärillä reiteillä. Ruudukon koot vaihtelevat 15×15:stä 20×20:een.',
      },
      {
        title: 'Viisi kuvaroolia: Alku, Loppu, Polku, Häiriö ja Koriste',
        description:
          'Jokainen työlehdelle asetettu kuva palvelee tiettyä roolia sokkelon suunnittelussa. Aloituskuva merkitsee sisääntulon. Loppukuvat merkitsevät määränpään — yksi Polku- ja Klassinen Sokkelo -tiloille, kolme Valitse Oikea Polku -tilalle. Polkukuvat määrittävät oikean reitin tai esiintyvät kerättävinä. Häiriökuvat täyttävät ei-polun solut. Koristekuvat sijoitetaan vapaasti kankaalle lisävisuaalisuutta varten.',
      },
      {
        title: 'Muokattava seinäsuunnittelu väri-, paksuus- ja läpinäkyvyyssäätimillä',
        description:
          'Klassinen Sokkelo ja Valitse Oikea Polku -tilat tarjoavat täyden seinämuokkauksen. Valitse mikä tahansa seinäväri värinvalitsimella. Säädä seinäpaksuutta 1:stä 10 pikseliin (oletus 3 px). Aseta seinän läpinäkyvyys 10 %:sta 100 %:iin (oletus 100 %). Nämä säätimet mahdollistavat erottuvia visuaalisia tyylejä — ohuet harmaat seinät hienostuneisiin palapelikirjoihin, paksut värilliset seinät nuoremmalle yleisölle tai puoliläpinäkyvät seinät kerrostettuihin suunnitteluefekteihin.',
      },
      {
        title: 'Automaattisesti luotu vastausavain ratkaisupolun korostuksella',
        description:
          'Jokainen sokkelo-työlehti luo automaattisesti vastausavaimen erilliselle kangas-välilehdelle. Vastausavain toistaa tarkan sokkelo-asettelun ja korostaa oikean ratkaisupolun vaaleanpunaisilla ympyröillä reitin varrella. Valitse Oikea Polku -tila lisää "✓ OIKEA POLKU" -merkinnän. Klassinen Sokkelo sisältää kerättävien legendan kunkin kerättävän kuvan lukumäärineen ratkaisupolun varrella.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa. Jokainen teema tarjoaa yhtenäisiä kuvituksia, jotka toimivat yhdessä sokkelotoiminnoissa — eläinsokkelot, joissa ratkaisijat seuraavat kissoja eläinhäiriöiden ruudukossa, juhlapyhäsokkelot kausittaisilla kerättävillä ja paljon muuta. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa sokkelo-työlehtia ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:llä 6× kertoimella teräville yksityiskohdille. Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) ja täysin mukautetut mitat. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
      {
        title: 'Täysi kangasmuokkaus tekstityökaluilla, nimi/päivämääräkentillä ja kumoa-historialla',
        description:
          'Fabric.js-kangas tarjoaa täyden hallinnan jokaiseen elementtiin. Vedä, muuta kokoa, kierrä ja siirrä kuvia, tekstiä ja sokkelo-sisältöä vapaasti. Lisää mukautettua tekstiä seitsemällä fonttivaihtoehdolla, säädettävällä koolla ja värillä. Vaihda nimi/päivämääräkentät tunnistusriveihin. Kumoa ja tee uudelleen 20 historian tilalla Ctrl+Z:llä ja Ctrl+Y:llä.',
      },
    ],
  },

  businessUseCases: {
    title: 'Myy sokkelo-aktiviteettikirjoja Etsyssä ja Amazon KDP:ssä',
    cases: [
      {
        title: 'Temaattiset sokkelo-aktiviteettipaketit Etsyssä',
        description:
          'Luo temaattisia sokkelopaketteja 104 kuvakokoelmalla — eläinsokkelot, juhlapyhäsokkelot, maatilasokkelot, merisokkelot ja kymmeniä muita. Pakkaa 10–20 sokkelo-työlehteä per teema vastausavaimet mukaan lukien, sekoittaen Kuvapolku-, Klassinen Sokkelo- ja Valitse Oikea Polku -tiloja vaihteluun jokaisessa paketissa. Myy 3–7 € per paketti.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Sokkelo-aktiviteettityökirjat Amazon KDP:ssä',
        description:
          'Kokoa 40–80 sokkelo-työlehteä painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna asteittaisella vaikeudella: aloita Kuvapolku-sokkeloilla aloittelijoille, etene Klassiseen Sokkeloon 15×15-ruudukoilla ja 1 polulla, lisää sitten 20×20-ruudukoihin 3 polulla edistyneille ratkaisijoille. Sisällytä vastausavaimet kirjan loppuun. Sokkelo-kirjat ovat todistettu KDP-kategoria — puhtaasti visuaalinen muoto toimii ostajille maailmanlaajuisesti ilman käännöstä.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Sokkelo-aktiviteettipaketit Gumroadiin',
        description:
          'Rakenna valmiita sokkelo-työlehtia nimi/päivämääräkentillä ja tulostetuilla vastausavaimilla. Luo temaattisia sarjoja: eläinten elinympäristöpolkutoimintoja, kausittaisia sokkelokokoelmia ja asteittain vaikeutuvia sokkelopaketteja. Klassinen Sokkelo kerättävine kuvineen lisää laskentaharjoitusta polunetsinnän rinnalle.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausittaiset ja juhlapyhäsokkelokokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden. Luo aikarajoitettuja sokkelokokoelmia, jotka ajoittuvat huippuostosjaksoihin. Sisällytä kaikki kolme pelitilaa jokaiseen kausisarjaan maksimaalisen arvon takaamiseksi. Kausituotteet oikeuttavat korkeammat hinnat huippuaikoinaan.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausittainen)',
      },
      {
        title: 'Globaali markkinaveto puhtaasti visuaalisella sokkelo-suunnittelulla',
        description:
          'Sokkelo-työlehdet ovat täysin visuaalisia — ratkaisijat navigoivat polkuja, seuraavat kuvia ja ratkaisevat tilallisia palapeleja lukematta tekstiä. Tämä tekee jokaisesta sokkelo-työlehdestä heti myytävän millä tahansa markkinalla maailmanlaajuisesti ilman käännöstä tai lokalisointia. Automaattisesti luotu otsikko kääntyy 11 kielelle automaattisesti, mutta sokkelo-sisältö itsessään on universaalisti ymmärrettävää.',
        platform: 'Kaikki alustat (globaali)',
      },
    ],
  },

  faq: [
    {
      question: 'Mitkä ovat kolme pelitilaa ja miten ne eroavat?',
      answer:
        'Generaattori tarjoaa kolme erillistä tilaa. Kuvapolku luo kuvaruudukon, jossa ratkaisijat seuraavat oikeaa polkua tunnistamalla polkukuvat häiriökuvien joukosta. Klassinen Sokkelo luo seinäpohjaisia sokkeloita LPF-algoritmilla kerättävine kuvineen, säädettävillä ruudukkoko\'oilla (15×15–20×20) ja 1–3 polulla umpikujaestolla. Valitse Oikea Polku esittää kolmen polun sokkeloita neljällä suuntavaihtoehdolla, joissa ratkaisijat tunnistavat ainoan oikean reitin.',
    },
    {
      question: 'Miten LPF-sokkeloalgoritmi toimii?',
      answer:
        'LPF (Pisin Polku Ensin) -algoritmi on ammattimainen seinäpohjaisen sokkelon luontijärjestelmä. Se käyttää käytävä-solurakennetta dynaamisella seinän sijoittelulla. Polun laadunpisteytys arvioi käännöksiä, pituutta ja esteitä. Monipolkutuki luo 1, 2 tai 3 polkua automaattisella umpikujaestolla väärillä reiteillä. Ruudukon koot vaihtelevat 15×15:stä 20×20:een ja seinätietoinen alku-/loppusijoittelu varmistaa siistit sisään- ja ulostulokohdat.',
    },
    {
      question: 'Mitkä ovat viisi kuvaroolia ja miten määrään ne?',
      answer:
        'Jokainen kuva palvelee tiettyä roolia. Aloituskuva merkitsee sisääntulon. Loppukuva merkitsee määränpään (1 Polulle ja Sokkelolle, 3 Valitse Polulle). Polkukuvat määrittävät oikean reitin tai esiintyvät kerättävinä. Häiriökuvat täyttävät ei-polun solut. Koristekuvat sijoitetaan vapaasti kankaalle. Käytä roolinvalitsinta Kuvakirjasto-paneelin yläosassa, napsauta sitten kuvia määrätäksesi ne.',
    },
    {
      question: 'Ovatko Kuvapolku-työlehdet kieliriippuvaisia?',
      answer:
        'Ei. Toisin kuin sanapohjaisten generaattorien, Kuvapolku-työlehdet ovat täysin visuaalisia. Ratkaisijat navigoivat sokkeloita ja seuraavat kuvapolkuja lukematta tekstiä. Automaattisesti luotu otsikko kääntyy 11 kielelle, mutta itse sokkelosisältö ei vaadi kielen ymmärrystä. Tämä tekee jokaisesta työlehdestä heti käytettävän ja myytävän millä tahansa markkinalla maailmanlaajuisesti ilman muokkauksia.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia kolmea pelitilaa, LPF-sokkeloalgoritmia, viittä kuvaroolia, seinämuokkausta, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja, nimi/päivämääräkenttiä ja kaikkia latausmuotoja — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja sokkelo-työlehtia Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä sokkelo-työlehtisi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, digitaalisina tuotteina Gumroadissa tai millä tahansa muulla myyntikanavalla. Kolme pelitilaa, LPF-algoritmi, 104 temaattista kuvakokoelmaa ja puhtaasti visuaalinen muoto antavat sinulle työkalut alkuperäisten, globaalisti myytävien sokkelotuotteiden tuottamiseen.',
    },
    {
      question: 'Sopivatko labyrinttitehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Yksinkertaiset polkutehtävät sopivat esiopetukseen (kynäotteen harjoittelu), keskitasoiset labyrintit alkuopetukseen ja monimutkaiset labyrintit alakouluun. Tehtävät kehittävät avaruudellista hahmottamista ja ongelmanratkaisua.',
    },
    {
      question: 'Noudattavatko labyrinttitehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Labyrintit tukevat OPS 2014:n laaja-alaista osaamista L1 (ajattelu ja oppimaan oppiminen) sekä matematiikan geometrian hahmottamisen tavoitteita. Reitin suunnittelu kehittää strategista ajattelua ja avaruudellista päättelyä.',
    },
    {
      question: 'Miten luon labyrinttitehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse teemakuvat kirjastosta alku- ja loppupisteiksi, aseta vaikeustaso ja napsauta Luo. Generaattori luo automaattisesti labyrintin ratkaisupolkuineen. Vastausavain syntyy samalla.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata kaikkia kolmea pelitilaa, LPF-sokkeloalgoritmia, viittä kuvaroolia, seinämuokkausta, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja, nimi/päivämääräkenttiä ja kaikkia latausmuotoja ennen ostamista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'aarteenetsinta-tyolehdat',
      anchorText: 'Aarteenetsintä-työlehtia seikkailuteemaisiin paketteihin',
    },
    {
      pageType: 'app',
      slug: 'etsi-esineet-tyolehdat',
      anchorText: 'Etsi Esineet -työlehtia täydentäviin etsintätoimintoihin',
    },
    {
      pageType: 'app',
      slug: 'ruudukkopalapeli-tyolehdat',
      anchorText: 'Ruudukkoyhdistely-palapelit visuaalisiin aktiviteettipaketteihin',
    },
    {
      pageType: 'bundle',
      slug: 'palapelit-pelit-paketti',
      anchorText: 'Palapelit & Pelit -paketti — Kaikki palapelisovellukset yhdessä',
    },
    {
      pageType: 'guide',
      slug: 'luo-sokkelo-tyolehtia',
      anchorText: 'Opas myytävien sokkelo-työlehien luomiseen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/picture%20path/kuvapolku-2.webp',
      primaryAlt: 'Kuvapolku-sokkelo-työlehti temaattisilla kuvilla ruudukossa oranssilla otsikkokehyksellä ja automaattisesti luodulla Kuvapolku-otsikolla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/picture%20path/kuvapolku-3.webp',
        alt: 'Kuvapolku-tilan työlehti kuvilla ruudukossa näyttäen oikean polun alusta loppuun',
        caption: 'Kuvapolku-tila — seuraa oikeaa kuvapolkua alusta loppuun',
      },
      {
        src: '/samples/finnish/picture%20path/kuvapolku-4.webp',
        alt: 'Klassinen Sokkelo -tilan työlehti seinäpohjaisilla käytävillä ja kerättävillä kuvilla pitkin sokkeloa',
        caption: 'Klassinen Sokkelo -tila — LPF-algoritmi luo seinäpohjaisia sokkeloita kerättävineen',
      },
      {
        src: '/samples/finnish/picture%20path/kuvapolku-2-answer-key.webp',
        alt: 'Kuvapolku-sokkelon vastausavain ratkaisupolulla korostettuna vaaleanpunaisilla ympyröillä oikean reitin varrella',
        caption: 'Automaattisesti luotu vastausavain — ratkaisupolku korostettuna vaaleanpunaisilla ympyröillä',
      },
    ],
    youtubeId: 'Sl1o0uPBDCg',
    videoTitle: 'Näin luot sokkelo-työlehtia 3 pelitilalla ja LPF-algoritmilla — Vaihe vaiheelta -opas',
  },
};

export default content;
