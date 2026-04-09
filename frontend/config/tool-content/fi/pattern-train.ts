import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen kuviotehtävä verkossa',
    secondaryKeywords: [
      'kuviotehtäviä ilmaiseksi verkossa',
      'kuviogeneraattori ilman rekisteröitymistä',
      'kokeile kuviotehtäviä ilmaiseksi',
      'tulostettava kuviotehtävä ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'kuviojuna',
    ],
    titleTag: 'Ilmainen kuviotehtävä verkossa | Kokeile heti',
    metaDescription: 'Tee kuviotehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Kuviosarjajuna-generaattori',
    tagline: 'Luo toistuva kuvio -työkirjoja 11 temaattisella junavaunulla viidellä kuviotyypillä, säädettävällä vihjeluvulla ja täysin visuaalisella tekstittömällä tulosteella, joka myy maailmanlaajuisesti ilman käännöstä',
    description: 'Luo ammattimaisia kuvion tunnistus -työkirjoja, joissa käyttäjät tunnistavat ja täydentävät toistuvia sekvenssejä temaattisella junalla 11 vaunulla. Viisi erillistä kuviotyyppiä kattavat kaikki sekvenssimonimutkaisuuden tasot: AB vuorottelee kahta esinettä, AAB ryhmittää kaksi yhdestä seurattuna yhdestä toisesta, ABB kääntää ryhmittelyn, ABC kiertää kolmea eri esinettä ja AABB parittaa kaksi kustakin ennen toistoa. Junasommitelma järjestää 11 vaunua kolmelle riville (5 + 3 + 3), jossa jokainen vaunu sisältää kuvan toistuvasta kuviosta. Yksi vaunu jätetään tyhjäksi — käyttäjät tunnistavat kuvion ja päättävät puuttuvan esineen. Säädä vihjelukumäärä 4:stä 10:een vaikeustason hallitsemiseksi: 10 vihjeen näyttäminen tekee kuviosta ilmeisen, kun taas vain 4 vihjeen näyttäminen vaatii aitoa kuvionarviointia. Erottuva junavaunusommitelma on visuaalinen erottautumistekijä tavallisista ruudukkotyökirjoista. Hae yli 3 100 kuvituksesta 104 temaattisessa kokoelmassa tai lataa omia kuvia. Erillinen ratkaisuavainvälilehti näyttää kaikki 11 vaunua täytettyinä oikealla kuviosekvenssillä. Jokainen työkirja on täysin visuaalinen vain kuvilla junassa ja nollatekstillä tulosteessa — universaalisti myytävä ilman käännöstä. Vie tulostusvalmiita PDF- ja JPEG-tiedostoja korkealla DPI:llä Letter-, A4-, Neliö (1200x1200)- tai mukautetuissa koissa. Vaihda harmaasävy musteystävälliseen tulosteeseen. Ilmainen kokeilu sisältää kaikki ominaisuudet vesileimalla latauksissa. Osta lisenssi poistaaksesi vesileiman ja myydäksesi kaupallisesti.',
  },

  tutorial: {
    title: 'Näin luot kuviosarjajuna-työkirjoja 8 vaiheessa',
    steps: [
      {
        title: 'Avaa kuviosarjajuna-generaattori',
        description: 'Napsauta \"Kokeile ilmaiseksi nyt\" käynnistääksesi generaattorin selaimessasi. Työkalu latautuu välittömästi asetuspaneelilla vasemmalla ja live-esikatselutyöalueella oikealla. Ei tilejä, ei latauksia, ei asennuksia.',
      },
      {
        title: 'Aseta sivun asettelu ja tausta',
        description: 'Sivuasetukset-osiossa valitse sivun koko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200x1200) tai syötä mukautettu koko. Valitse taustaväri, valitse koristeellinen taustateema kuvakirjastosta säädettävällä läpinäkyvyydellä ja lisää kehys itsenäisellä läpinäkyvyyshallinnalla.',
      },
      {
        title: 'Valitse kuviotyyppi',
        description: 'Valitse yksi viidestä toistuvasta kuviotyypistä Sisältöpaneelista. AB vuorottelee kahta esinettä (A-B-A-B) yksinkertaisimpiin sekvensseihin. AAB ryhmittää kaksi yhdestä seurattuna yhdestä toisesta (A-A-B-A-A-B). ABB kääntää ryhmittelyn (A-B-B-A-B-B). ABC kiertää kolmea eri esinettä (A-B-C-A-B-C) monimutkaisempaan tunnistamiseen. AABB parittaa kaksi kustakin esineestä (A-A-B-B-A-A-B-B) laajennetussa syklissä.',
      },
      {
        title: 'Aseta vihjelukumäärä vaikeuden hallintaan',
        description: 'Säädä vihjelaskuria 4:stä 10:een hallitaksesi työkirjan vaikeutta. Kolme ensimmäistä vaunua ovat aina näkyvissä kuvion vahvistamiseksi. 10 vihjeellä vain 1 vaunu on tyhjä 10 täytetyn joukossa — kuvio on hyvin ilmeinen. 4 vihjeellä käyttäjät näkevät minimaalista tietoa ja joutuvat arvioimaan huolellisesti sekvenssin tunnistamiseksi.',
      },
      {
        title: 'Selaa teemoja tai lataa omia kuvia',
        description: 'Selaa 104 temaattista kuvakokoelmaa, joissa on yli 3 100 kuvitusta — eläimet, ruoka, ajoneuvot, luonto, juhlapäivät, ammatit ja kymmeniä muita. Jokainen teema tarjoaa visuaalisesti yhteensopivia kuvia, jotka näyttävät yhtenäisiltä junavaunuissa. Kuviotyyppi määrittää, kuinka monta erillistä kuvaa tarvitaan: AB käyttää 2:ta, ABC käyttää 3:a ja AABB käyttää 2:ta.',
      },
      {
        title: 'Vaihda nimi/päivämäärä-kentät ja harjoitusvaihtoehdot',
        description: 'Ota käyttöön valinnaiset nimi- ja päivämääräleikekentteja tunnistamista varten tulostetuissa työkirjoissa. Vaihda harjoitusnumero ja koristeelliset elementit päälle tai pois. Jokainen vaihtoehto tarkentaa työkirjan asettelua kohderyhmällesi.',
      },
      {
        title: 'Lisää tekstiä ja mukauta työaluetta',
        description: 'Käytä Tekstityökalut-paneelia lisätäksesi työkirjan otsikon, ohjeet tai koristeellisen tekstin. Valitse fonteista kuten Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial ja Verdana. Vedä, muuta kokoa, kierrä ja siirrä jokaista elementtiä Fabric.js-työalueella.',
      },
      {
        title: 'Tarkista ratkaisuavain ja lataa',
        description: 'Vaihda Ratkaisuavain-välilehdelle nähdäksesi täydellisen junan kaikilla 11 vaunulla täytettyinä — puuttuva paikka näyttää nyt oikean kuvioesineen. Sekä työkirja että ratkaisuavain ovat itsenäisesti muokattavissa erillisillä työalueilla. Vaihda harmaasävy musteystävälliseen tulosteeseen. Lataa korkearesoluutioisena JPEG:nä tai tulostusvalmiina PDF:nä 300 DPI:llä.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Temaattiset kuviosarjajunapaketit',
      description: 'Luo 15–25 kuviosarjajuna-työkirjan sarjoja teemoittain ryhmiteltyinä — maatilaeläimet, dinosaurukset, merieläimet, ajoneuvot, ruoka ja lisää. Vaihtele sekä kuviotyyppiä että vihjelukumäärää sarjan läpi progressiiviseen vaikeuteen: aloita AB-kuvioilla 10 vihjeellä, etene AAB ja ABB 7 vihjeellä ja lopeta ABC ja AABB-kuvioilla 4–5 vihjeellä. Sisällytä automaattisesti luotu ratkaisuavain jokaiseen työkirjaan.',
    },
    {
      title: 'KDP-kuvion tunnistus -työkirjat',
      description: 'Kokoa 60–100 kuviosarjajunaharjoitusta painetuksi työkirjaksi Amazon KDP:lle. Rakenna luvut taitoprogressiona: Luku 1 kattaa AB-kuviot korkeilla vihjeluvuilla, Luku 2 esittelee AAB ja ABB -epäsymmetriset ryhmittelyt, Luku 3 etenee ABC-kolmielementtikuvioihin, Luku 4 esittelee AABB-laajennettuja sekvenssejä ja Luku 5 vähentää vihjelukumäärää haastesivuille. Tekstivapaa visuaalinen muoto ei tarvitse käännöstä.',
    },
    {
      title: 'Tasoistetut kuvion tunnistus -asemat',
      description: 'Rakenna tasoitettuja kuvioharjoitussarjoja käyttäen kuviomonimutkaisuutta ja vihjelukumäärää kahtena eriytysakselin. Taso 1: AB-kuviot 8–10 vihjeellä. Taso 2: AAB ja ABB -kuviot 6–8 vihjeellä. Taso 3: ABC-kuviot 5–6 vihjeellä. Taso 4: AABB-kuviot 4–5 vihjeellä. Junavaunumuoto sitouttaa käyttäjiä, jotka pitävät ruudukkopohjaisia työkirjoja yksitoikkoisina.',
    },
    {
      title: 'Kausi- ja juhlapäiväkuviosarjajunasarjat',
      description: 'Käytä kausi- ja juhlapäiväkuvateemoja aikarajoitettujen kuviosarjajunapakettien luomiseen. \"Halloween-kuviosarjajuna\" -paketti kammottavilla teemakuvilla myy lokakuussa. Joulu, koulun alku, ystävänpäivä ja kesäteemat kukin ovat huippumyynti-ikkunoitaan.',
    },
    {
      title: 'Moniformaattiset visuaalisen oppimisen paketit',
      description: 'Parista kuviosarjajuna-työkirjat kuvioruudukko-työkirjojen, yhdistämistyökirjojen, poikkeava esine -aktiviteettien ja varjoyhdistämisaktiviteettien kanssa yhteensopivilla teemoilla. Jokainen formaatti harjoittaa eri visuaalista kognitiivista taitoa. Moniformaattiset visuaaliset paketit myyvät enemmän.',
    },
    {
      title: 'Mukautetut kuva-aihekohtaiset kuviosarjajunat',
      description: 'Lataa mukautettuja kuvia luodaksesi kuviosarjajuna-työkirjoja erikoistuneille yleisöille sisäänrakennetun kirjaston ulkopuolelle. Käytä kasvun vaiheita luonnontieteeseen, nuottisymboleja musiikkitunneille, geometrisia muotoja matematiikkaan tai historiallisia esinekuvia yhteiskuntaoppiin.',
    },
  ],

  businessIdeas: [
    {
      title: 'Kuviotyypittäin porrastettu Etsy-kauppa',
      description: 'Avaa Etsy-kauppa, joka on erikoistunut kuviosarjajuna-työkirjoihin kuviomonimutkaisuuden mukaan järjestettyinä. Aloittelijapaketit sisältävät AB-kuvioita 8–10 vihjeellä. Keskitason paketit käyttävät AAB ja ABB -kuvioita 6–7 vihjeellä. Edistyneet paketit sisältävät ABC ja AABB -kuvioita 4–5 vihjeellä. Ainutlaatuinen junavaunumuoto erottautuu suoraan ruudukkopohjaisten kilpailijoiden listauksista.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP -varhaisen matematiikan työkirjasarja',
      description: 'Kokoa 80+ kuviosarjajunaharjoitusta temaattisiksi työkirjoiksi Amazon KDP:lle. Rakenna sarja teemoittain: \"Eläinten kuviosarjajuna\", \"Ajoneuvojen sekvenssijuna\", \"Ruoan kuvion tunnistus\". Jokainen kirja etenee yksinkertaisista AB-kuvioista monimutkaisiin AABB-sekvensseihin ratkaisuavaimilla lopussa. Tekstivapaa visuaalinen muoto julkaistaan identtisenä kaikilla kansainvälisillä KDP-markkinapaikoilla.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad-kuvioasemat',
      description: 'Lataa kuviosarjajuna-työkirjapaketteja Gumroadiin järjestettyinä taitotason ja teeman mukaan. Sisällytä neljä vaikeustasoa teemaa kohden käyttäen kuviotyyppiä ja vihjelukumäärää eriytysakseleina. Pakkaa automaattisesti luoduilla ratkaisuavaimilla.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest-kuviosarjajunan visuaalinen suppilo',
      description: 'Kuviosarjajuna-työkirjat värikkäillä temaattisilla kuvilla junavaunuissa ovat luonnostaan pin-kelpoisia — erottuva junasommitelma kiinnittää huomion Pinterest-syötteissä. Pinnaa näytetyökirjoja, jotka esittelevät eri kuviotyyppejä vesileimalla.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad-täydellinen kuvion oppimisen työkalupaketti',
      description: 'Niputa kuviosarjajuna-työkirjat kuvioruudukko-työkirjojen, yhdistämistyökirjojen ja sekvenssitäydennysaktiviteettien kanssa kattavaksi kuvion oppimisen työkalupaketiksi Gumroadissa. Jokainen formaatti harjoittaa kuvion tunnistusta eri tavalla.',
      platform: 'Gumroad',
    },
    {
      title: 'Tekstivapaa maailmanlaajuinen tuotelinja',
      description: 'Koska kuviosarjajuna-työkirjat sisältävät vain kuvia junavaunuissa nollatekstillä tulosteessa, täsmälleen sama tuote toimii kaikilla kielillä ilman muutoksia. Luo sarja kuviosarjajunaharjoituksia ja myy se maailmanlaajuisesti. Yksi suunnitteluistunto tuottaa universaalisti myytävän tuotteen.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Käytä kuviotyyppiä ja vihjelukumäärää kahtena itsenäisenä vaikeusakselin',
      description: 'Kuviotyyppi hallitsee sekvenssimonimutkaisuutta (AB on helpoin, AABB on vaikein). Vihjelukumäärä hallitsee visuaalista tukea (10 vihjettä on helpoin, 4 on vaikein). Molempien yhdistäminen luo laajan vaikeusmatriisin: AB 10 vihjeellä absoluuttisille aloittelijoille, AABB 4 vihjeellä edistyneille käyttäjille.',
    },
    {
      title: 'Korosta junamuotoa markkinapaikkaerityispiirteenä',
      description: 'Useimmat kuviotyökirjat Etsyssä ja Gumroadissa käyttävät standardiruudukkosommitteluja riveillä ja sarakkeilla. 11 vaunun junamuoto on visuaalisesti erottuva ja välittömästi tunnistettava hakutuloksissa. Mainitse \"junavaunumuoto\" ja \"11 vaunun sommitelma\" tuoteotsikoissasi ja kuvauksissa.',
    },
    {
      title: 'Korosta tekstivapautta maailmanlaajuisen myytävyyden vuoksi',
      description: 'Kuviosarjajuna-työkirjat eivät sisällä tekstiä tulosteessa — vain kuvia junavaunuissa. Tämä on vahvin kilpailuetusi. Ilmoita selkeästi \"ei käännöstä tarvita — toimii maailmanlaajuisesti\" jokaisessa tuotekuvauksessa.',
    },
    {
      title: 'Luo sekä juna- että ruudukkokuviotuotteita',
      description: 'Kuviosarjajuna-generaattori ja Kuvio-työkirja-generaattori tuottavat perustavan erilaisia visuaalisia muotoja samalle taidolle — kuvion tunnistukselle. Junamuoto käyttää 11 vaunua yhdellä puuttuvalla paikalla. Ruudukkomuoto käyttää standardirivejä ja -sarakkeita. Myy molempia formaatteja erikseen tai niputettuna.',
    },
    {
      title: 'Sovita vihjelukumäärä kohderyhmän ikään',
      description: 'Esikoululaisille (3–4 vuotta) käytä AB-kuvioita 8–10 vihjeellä maksimaaliseen visuaaliseen tukeen. Lastentarhaaan (4–6 vuotta) käytä AAB/ABB-kuvioita 6–8 vihjeellä. Ensimmäiselle luokalle ja ylöspäin ABC ja AABB -kuviot 4–6 vihjeellä luovat aitoja arviointihaasteita.',
    },
    {
      title: 'Käytä harmaasävyä KDP:lle ja massatulostukseen',
      description: 'Ota harmaasävykytkin käyttöön työkirjoille, jotka on tarkoitettu Amazon KDP -sisäsivuiksi tai massatulostukseen. Mustavalkotuloste maksaa huomattavasti vähemmän tulostaa.',
    },
    {
      title: 'Lataa mukautettuja kuvia nichemarkkinoille',
      description: 'Käytä mukautettua kuvalatausta luodaksesi kuviosarjajuna-työkirjoja nicheyleisöille sisäänrakennetun kirjaston ulkopuolelle. Kasvun vaiheet luonnontieteeseen, nuottisymbolit musiikkitunneille, geometriset muodot matematiikkaan — mukautetut kuvat antavat sinun kohdistaa tiettyihin ostajanicheihin.',
    },
  ],

  faq: [
    {
      question: 'Onko tarjolla ilmainen kokeilu?',
      answer: 'Kyllä. Työkalu tarjoaa ilmaisen kokeilun kaikilla ominaisuuksilla — kaikki viisi kuviotyyppiä, säädettävä vihjelukumäärä 4:stä 10:een, kuvakirjasto, ratkaisuavaimen luominen ja kaikki vientimuodot. Ei rekisteröitymistä, ei luottokorttia. Ilmaisen kokeilun lataukset sisältävät vesileiman.',
    },
    {
      question: 'Mitkä ovat viisi kuviotyyppiä?',
      answer: 'AB vuorottelee kahta esinettä (A-B-A-B) yksinkertaisimpaan toistuvaan kuvioon. AAB ryhmittää kaksi yhdestä seurattuna yhdestä toisesta (A-A-B-A-A-B). ABB kääntää ryhmittelyn (A-B-B-A-B-B). ABC kiertää kolmea eri esinettä (A-B-C-A-B-C) vaatien pidemmän toistuvan yksikön seuraamista. AABB parittaa kaksi kustakin esineestä (A-A-B-B-A-A-B-B) laajennetussa syklissä.',
    },
    {
      question: 'Miten vihjelukumäärä hallitsee vaikeutta?',
      answer: 'Vihjelukumäärä asettaa, kuinka moni 11 junavaunusta näyttää kuvia. Kolme ensimmäistä vaunua ovat aina näkyvissä kuvion vahvistamiseksi. 10 vihjeellä vain 1 vaunu on tyhjä 10 täytetyn joukossa — kuvio on hyvin ilmeinen. 4 vihjeellä käyttäjät näkevät minimaalista tietoa ja joutuvat arvioimaan huolellisesti sekvenssin tunnistamiseksi.',
    },
    {
      question: 'Miten 11 junavaunua on järjestetty sivulle?',
      answer: 'Juna näyttää 11 vaunua kolmella rivillä: 5 vaunua ylärivillä, 3 keskellä vasemmalla ja 3 keskellä oikealla. Jokainen vaunu sisältää kuvan toistuvasta kuviosekvenssistä. Temaattinen junagrafiikka yhdistää vaunut visuaalisesti ja luo erottuvan sommitelman.',
    },
    {
      question: 'Miten kuviosarjajuna eroaa ruudukkopohjaisten kuviotyökirjojen?',
      answer: 'Kuviosarjajuna näyttää sekvenssejä 11 temaattisella junavaunulla erottuvassa visuaalisessa muodossa yhdellä puuttuvalla paikalla. Ruudukkopohjaiset kuviotyökirjat käyttävät standardirivejä ja -sarakkeita. Junamuoto on visuaalisesti sitouttavampi ja luo tuotteita, jotka erottuvat suoraan hakutuloksissa.',
    },
    {
      question: 'Miksi työkirjoissa ei ole tekstiä?',
      answer: 'Kuviosarjajuna-työkirjat ovat täysin visuaalisia suunnittelultaan. Vain kuvat näkyvät junavaunuissa — ei kirjoitettuja sanoja tulosteessa. Tämä tekee työkirjoista universaalisti käytettäviä kielestä tai lukutaidosta riippumatta. Myyjille tekstivapaa tuloste tarkoittaa, että sama tuote myy maailmanlaajuisesti ilman käännöstä.',
    },
    {
      question: 'Miten ratkaisuavain toimii?',
      answer: 'Ratkaisuavain löytyy erilliseltä työaluevälilehdeltä, joka näyttää täydellisen junan kaikilla 11 vaunulla täytettyinä — mukaan lukien paikka, joka oli tyhjä työkirjassa. Molemmat työalueet ovat itsenäisesti muokattavissa. Työkirja ja ratkaisuavain ladataan erillisinä tiedostoina.',
    },
    {
      question: 'Voinko ladata omia kuvia?',
      answer: 'Kyllä. Mukautettu kuvalataus antaa sinun lisätä minkä tahansa kuvan kuviosarjajunaharjoituksiin. Lataa valokuvia, kuvituksia tai grafiikkaa aiheeseesi tai yleisöösi sopivia. Mukautetut kuvat toimivat kaikkien viiden kuviotyypin kanssa.',
    },
    {
      question: 'Mitkä tiedostomuodot ja sivukoot ovat saatavilla?',
      answer: 'Lataa korkearesoluutioisena JPEG:nä tai tulostusvalmiina PDF:nä 300 DPI:llä 6x renderointikertoimella. Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200x1200) ja mukautetut mitat. Vaihda harmaasävy musteystävälliseen tulosteeseen.',
    },
    {
      question: 'Voinko myydä tällä työkalulla tehdyt työkirjat kaupallisesti?',
      answer: 'Ilmainen kokeilu vesileimalla on vain henkilökohtaiseen käyttöön. Myydäksesi kuviosarjajuna-työkirjoja Etsyssä, Gumroadissa, Amazon KDP:llä tai millä tahansa muulla markkinapaikalla tarvitset kaupallisen lisenssin. Lisenssi poistaa vesileiman ja myöntää täydet jälleenmyyntioikeudet.',
    },
    {
      question: 'Mikä on palautuskäytäntönne?',
      answer: 'Kokeile ennen ostoa ilmaisella kokeilullamme — kaikki ominaisuudet ovat käytettävissä, joten voit täysin arvioida työkalun ennen ostamista. Koska ilmainen kokeilu antaa sinulle täydellisen pääsyn, emme tarjoa palautuksia lisenssiostoista.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'pattern-train-worksheets', anchorText: 'Kuviosarjajuna-työkirjat — täydet tuotetiedot' },
    { pageType: 'tool', slug: 'big-small-worksheet-maker', anchorText: 'Iso ja pieni -työkirja-generaattori' },
    { pageType: 'tool', slug: 'pattern-worksheet-maker', anchorText: 'Kuvio-työkirja-generaattori' },
    { pageType: 'tool', slug: 'draw-and-color-maker', anchorText: 'Piirrä ja väritä -generaattori' },
    { pageType: 'tool', slug: 'matching-worksheet-maker', anchorText: 'Yhdistämis-työkirja-generaattori' },
    { pageType: 'tool', slug: 'odd-one-out-maker', anchorText: 'Poikkeava esine -generaattori' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/pattern%20train/kuviojuna-1.webp',
      primaryAlt: 'Kuviosarjajuna-työkirja temaattisilla junavaunuilla, jotka näyttävät toistuvan kuviosekvenssin yhden puuttuvan vaunun kanssa käyttäjien täydennettäväksi',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/pattern%20train/kuviojuna-2.webp',
        alt: 'Kuviosarjajuna-työkirja AB-vuorottelukuviotilassa eläinkuvilla 11 temaattisessa junavaunussa',
        caption: 'AB-kuvio eläinteemalla — tunnista vuorotteleva sekvenssi ja täydennä puuttuva vaunu',
      },
      {
        src: '/samples/finnish/pattern%20train/kuviojuna-3.webp',
        alt: 'Kuviosarjajuna-työkirja ABC-kolmielementtikuviolla temaattisilla kuvilla junavaunuissa',
        caption: 'ABC-kuvio — kolme kiertävää esinettä luovat monimutkaisemman toistuvan sekvenssin',
      },
      {
        src: '/samples/finnish/pattern%20train/kuviojuna-4.webp',
        alt: 'Kuviosarjajunan ratkaisuavain, joka näyttää kaikki 11 vaunua täytettyinä oikealla kuviosekvenssillä',
        caption: 'Ratkaisuavainnäkymä — kaikki 11 vaunua täytettyinä oikealla kuviolla varmistusta varten',
      },
    ],
    youtubeId: '5A4aHvcC5u4',
    videoTitle: 'Näin luot kuviosarjajuna-työkirjoja viidellä kuviotyypillä — vaiheittainen opas',
  },
};

export default content;
