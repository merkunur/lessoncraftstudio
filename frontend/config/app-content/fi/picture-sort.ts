import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'lajittelutehtävä tulostaa',
    secondaryKeywords: [
      'lajittele ja ryhmittele tehtävä',
      'luokittele kuvat',
      'järjestä ja lajittele tehtävämoniste',
      'lajitteluaktiviteetti esiopetus',
    ],
    lsiKeywords: [
      'lajittelu',
      'ryhmittely',
      'luokittelu',
      'esiopetus',
      'vastaukset',
    ],
    titleTag: 'Lajittelutehtävä tulostaa | Luokittelugeneraattori',
    metaDescription: 'Luo lajittelu- ja luokittelutehtäviä teemakuvilla. Automaattiset vastaukset, tulostettavat PDF:t. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Kuvalajittelu-työlehtigeneraattori kahden kategorian lajittelutoimintoihin',
    tagline: 'Kahden kategorian lajittelu tehokkaassa generaattorissa — teemapohjainen tai manuaalinen kuvavalinta — automaattisilla vastausavaimilla, 4–12 säädettävällä kuvalla, lokalisoidulla "Lajittele kuvat" -otsikolla 11 kielellä ja 104 temaattisella kuvakokoelmalla.',
    description:
      'Rakenna ammattimaisia lajittelutyölehtia, joissa käyttäjät luokittelevat kuvia kahteen kategoriaan lajittelemalla leikattuja kuvia oikeaan vasempaan tai oikeaan ryhmään. Valitse teematila täyttääksesi kategoriat automaattisesti kuvakirjastosta — valitse vasen teema ja oikea teema, ja sovellus hakee 4–6 satunnaista kuvaa per teema — tai vaihda manuaalitilaan käsinvalitaksesi yksittäisiä kuvia ja määrätäksesi jokaisen kategoriaan. Jokaisella työlehdellä on kaksi katkoviivakehyksellistä kategoriaraamia yläosassa lajittelukohteina ja sekoitettu leikkausruudukko alhaalla sekoitetuilla kuvilla valmiina leikattaviksi ja lajiteltaviksi. Kaksoiskangasjärjestelmä luo sekä työlehti-välilehden että vastausavain-välilehden 6× suuremmilla kuvilla kategorialaatikoissa. Kuvalajittelu-generaattori on kieliriippuvainen: kategoriatunnisteet käyttävät lokalisoituja kuvanimiä, joten kielen vaihto muuttaa työlehden tekstin. Täysi pääsy avaa kaikki 104 teemaa yli 3 100 kuvituksella ja kaikki 11 käyttöliittymäkieltä. Lisää taustateemoja ja kehysteemoja, sisällytä nimi- ja päivämääräkentät ja vie tulostusvalmiita PDF-tiedostoja ja JPEG-kuvia 300 DPI:llä. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  howItWorks: {
    title: 'Näin luot kuvalajittelutyölehtia viidessä vaiheessa',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivuasetukset-paneeli ja valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse sivuväri värinvalitsimella. Valitse taustateema ja säädä sen läpinäkyvyyttä, valitse sitten kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään. Valitse "Sisällytä nimi/päivämäärä -kentät" lisätäksesi nimi- ja päivämäärärivit. Nämä asetteluvalinnat kehystävät lajittelutyölehtesi ennen sisällön määritystä.',
      },
      {
        title: 'Valitse lajittelukategoriat',
        description:
          'Avaa Lajittelukategoriat-paneeli ja valitse kaksi teemaa — yksi vasemmalle kategorialle ja yksi oikealle. Sovellus luo automaattisesti 4–6 satunnaista kuvaa per teema kuvakirjastosta. Valitse esimerkiksi Eläimet vasemmalle ja Ruoka oikealle luodaksesi lajittelutyölehden, jossa käyttäjät luokittelevat kuvat oikeaan ryhmään. Vaihtoehtoisesti vaihda manuaalitilaan käsinvalitaksesi yksittäisiä kuvia ja määrätäksesi jokaisen vasempaan tai oikeaan kategoriaan.',
      },
      {
        title: 'Valitse kuvia kirjastosta tai lataa omia',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 temaattista kokoelmaa yli 3 100 värikkäällä kuvituksella — eläimet, ruoka, ajoneuvot, luonto, juhlapyhät ja kymmeniä muita. Suodata teeman mukaan pudotusvalikosta tai hae avainsanalla. Napsauta kuvia lisätäksesi ne työlehteesi ja määrää jokainen vasempaan tai oikeaan kategoriaan. Kuvien kokonaismäärä vaihtelee 4:stä 12:een, 2–10 kuvaa per kategoria. Voit myös ladata omia PNG-, JPG- tai GIF-kuvia kirjastosisällön rinnalle.',
      },
      {
        title: 'Luo lajittelutyölehti',
        description:
          'Napsauta Luo tuottaaksesi kaksiosaisen lajitteluasettelun. Sovellus järjestää sisältösi kategoriaraameihin yläosaan (kaksi vierekkäistä katkoviivakehystä #FAFAFA-täytöllä) ja sekoitettuun leikkausruudukkoon alhaalle (valkoiset solut katkoviiva-#666-reunoilla). Tyylikäs "Lajittele kuvat" -otsikko näkyy yläosassa mintunvihreällä taustalla (#4DB6AC), turkoosilla otsikolla (#00796B) Fredoka-fontilla ja oranssilla kuvauksella (#FF7043) Quicksand-fontilla. Turkoosi ulkokehys (#26A69A, 8 px viiva) kehystää koko sivun.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle nähdäksesi automaattisesti luodun ratkaisun 6× suuremmilla kuvilla oikeissa kategorialaatikoissa maks 2 sarakkeella per laatikko. Lataa molemmat versiot neljällä erillisellä painikkeella: Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF. Tiedostot viedään 300 DPI:llä JPEG-laadulla 1,0. Vaihda harmaasävy päälle musteystävällisiin versioihin. Jokainen vienti on tuotantovalmis Etsy-ilmoituksiin, Amazon KDP -sisäsivuihin ja Gumroad-tuotetiedostoihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Kuvalajittelu-työlehtigeneraattorin avainominaisuudet',
    features: [
      {
        title: 'Kahden kategorian lajittelu teemapohjaisella tai manuaalisella kuvavalinnalla',
        description:
          'Luo lajittelutyölehtia tasan kahdella kategorialla — vasen ja oikea — kahdella erillisellä valintatilalla. Teematila mahdollistaa teeman valinnan kummallekin kategorialle (esim. Eläimet vs Ruoka, Maa vs Vesi, Hedelmät vs Vihannekset), ja sovellus valitsee automaattisesti 4–6 satunnaista kuvaa per teema kuvakirjastosta. Manuaalitila antaa täyden hallinnan: käsinvalitse yksittäisiä kuvia mistä tahansa teemasta ja määrää jokainen vasempaan tai oikeaan kategoriaan. Molemmat tilat tuottavat saman ammattimaisen lajitteluasettelun kategoriaraameineen ja sekoitettuine leikkausruudukkoineen.',
      },
      {
        title: 'Säädettävä kuvamäärä 4:stä 12:een 2–10 per kategoria',
        description:
          'Hallitse lajittelukuvien kokonaismäärää minimistä 4 maksimiin 12 per työlehti, jokaisen kategorian sisältäessä 2–10 kuvaa. Teematila hakee automaattisesti 4–6 kuvaa per teema, tuottaen työlehtia 8–12 kuvalla yhteensä. Manuaalitila mahdollistaa tarkkojen lukumäärien asettamisen per kategoria. Vähemmän kuvia tuottaa yksinkertaisempia lajittelutehtäviä; enemmän kuvia lisää vaikeutta ja sisältötiheyttä. Leikkausruudukko säätää automaattisesti sarakeasetteluaan (3–4 saraketta kokonaismäärän perusteella) ylläpitääkseen selkeää visuaalista välistystä.',
      },
      {
        title: 'Automaattisesti luotu vastausavain 6× suuremmilla kuvilla kategorialaatikoissa',
        description:
          'Jokainen lajittelutyölehti luo automaattisesti vastausavaimen erilliselle kangas-välilehdelle. Vastausavain näyttää kaksi kategorialaatikkoa (yksi per kategoria, tasalevyiset) kuvat lajiteltuina oikeaan ryhmäänsä — renderöity 6× leikkausruudukon solujen koossa selkeää verifiointia varten. Jokainen kategorialaatikko käyttää maks 2 saraketta ja säilyttää saman katkoviivakehystyylin (#FAFAFA-täyttö, #444-viiva, 12 px kulmasäde). Ei manuaalista lajittelua, ei erillistä tiedoston luontia — vastausavain pysyy täydellisesti synkronoituna työlehden sisällön kanssa.',
      },
      {
        title: 'Lokalisoitu "Lajittele kuvat" -otsikko turkoosilla suunnittelulla 11 kielellä',
        description:
          'Jokainen luotu työlehti sisältää tyylikään otsikon mintunvihreällä taustalla (#4DB6AC), valkoisella pillerikontilla, turkoosilla otsikolla (#00796B) Fredoka Bold -fontilla ja oranssilla kuvauksella (#FF7043) Quicksand-fontilla. Pystysuuntaiset työlehdet näyttävät 100 px otsikon dynaamisella otsikokoolla (28–48 px); vaakasuuntaiset käyttävät kompaktia 70 px otsikkoa 24–36 px otsikolla. Otsikko "Lajittele kuvat" ja kuvaus "Lajittele kuvat oikeisiin ryhmiin!" kääntyvät automaattisesti kaikille 11 tuetulle kielelle. Turkoosi ulkokehys (#26A69A, 8 px viiva, 12 px säde) kehystää koko sivun.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa, jotka kattavat eläimet, ruoan, ajoneuvot, luonnon, ammatit, juhlapyhät, urheilun, vuodenajat ja kymmeniä muita. Jokainen teema tarjoaa yhtenäisen värikkäiden kuvitusten sarjan, joka toimii lajittelukategorioina. Teemapohjainen kategoriavalintatoiminto tekee helpoksi luoda lajittelutyölehtia luonnollisilla kategoriapareil la — maaeläimet vs merieläimet, terveellinen ruoka vs epäterveellinen ruoka, kesätavarat vs talvitavarat. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa.',
      },
      {
        title: 'Nimi- ja päivämääräkentät tuotelinjan vastuullisuuteen',
        description:
          'Valitse "Sisällytä nimi/päivämäärä -kentät" -valintaruutu Sivuasetukset-paneelissa lisätäksesi nimi- ja päivämäärärivit lajittelutyölehdelle. Nämä kentät varmistavat jäljitettävyyden tuotelinjaympäristöissä ja tekevät työlehdet valmiiksi keräämistä ja arviointia varten ilman lisävalmistelua. Lajittelutoimintoja etsivät ostajat arvostavat työlehtia, jotka saapuvat tuotelinjavalmiina, ja nimi/päivämäärävaihtoehto tekee tuotteistasi houkuttelevampia markkinoilla.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa lajittelutyölehtia ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:n tarkkuudella JPEG-laadulla 1,0 ja automaattisella suunnalla. Neljä erillistä latauspainiketta vie Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF erikseen. Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Neliö (1200×1200) ja täysin mukautetut mitat. Vaihda harmaasävy päälle musteystävällisiin versioihin. Jokainen vienti on tuotantovalmis.',
      },
      {
        title: 'Täysi kangasmuokkaus tekstityökaluilla, kohdistuksella ja kerrosten hallinnalla',
        description:
          'Fabric.js-kangas tarjoaa täyden hallinnan jokaiseen elementtiin lajittelutyölehdilläsi. Vedä, muuta kokoa, kierrä ja siirrä kuvia, tekstiä ja luotua sisältöä vapaasti. Kerrosten hallinta hoitaa pinoamisjärjestyksen. Lukitse valmiit elementit muokatessasi muita. Lisää mukautettua tekstiä seitsemällä fonttivaihtoehdolla (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), säädettävällä koolla ja värillä sekä tekstin ääriviivan leveydellä 0–10 0,5:n tarkkuudella. Kuusi kohdistusvaihtoehtoa plus keskitä sivulle pitävät asettelut tarkkoina. Zoomaa 25 %:sta 300 %:iin. Kumoa ja tee uudelleen 20 historian tilalla Ctrl+Z:llä ja Ctrl+Y:llä.',
      },
    ],
  },

  businessUseCases: {
    title: 'Näin myyt kuvalajittelutyölehtia verkossa',
    cases: [
      {
        title: 'Temaattiset lajittelutyölehtipakettit Etsyssä',
        description:
          'Luo temaattisia lajittelutoimintapaketteja luonnollisilla kategoripareilla 104 kuvakokoelmasta — eläimet vs ruoka, maa vs vesi, hedelmät vs vihannekset, sisällä vs ulkona ja kymmeniä muita. Jokainen teemaparitus tuottaa useita uniikkeja lajittelutyölehtia vaihtelemalla kuvavalintoja ja -määriä. Pakkaa 10–20 lajittelutyölehteä per paketti vastausavaimet mukaan lukien, ja myy 3–7 € per paketti. Teemapohjainen kategoriavalitsin nopeuttaa työlehtigenerointia selkeillä vasen/oikea-ryhmittelyillä.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Luokittelutyökirjat Amazon KDP:ssä',
        description:
          'Kokoa 40–80 lajittelutyölehteä painetuksi työkirjaksi Amazon KDP -muodossa. Rakenna vaikeuden mukaan: varhaiset luvut käyttävät 4–6 kuvaa selkeillä kategoriaeroilla (eläimet vs ajoneuvot), keskitason luvut 8–10 kuvaa hienovaraisemmilla eroilla (kotieläimet vs villieläimet), ja edistyneet luvut 12 kuvaa haastavilla kategorioilla. Sisällytä vastausavaimet kirjan loppuun. Harmaasävyvaihto tuottaa musteystävällisiä sivuja mustavalkoisten kirjansisäsivujen valmiiksi.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tuotelinjan lajittelutoimintoja Gumroadiin',
        description:
          'Rakenna valmiita lajitteluasema-työlehtia nimi/päivämääräkentillä ja tulostetuilla vastausavaimilla. Gumroadissa lajittelutoimintoja etsivät ostajat arvostavat tulostusvalmiita työlehtia. Luo tuotevalikoiman mukaisia sarjoja: elollinen vs eloton, terveellinen vs epäterveellinen ruoka, päivä- vs yöeläimet, lämmin vs kylmä vaatetus. Jokainen sarja sisältää työlehtia ja vastausavaimia sekä PDF- että JPEG-muodossa.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausittaiset ja juhlapyhälajittelukokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden — joulu, halloween, pääsiäinen, ystävänpäivä, koulun alku, kesäloma ja muut. Luo kausittaisia lajittelutyölehtia, joissa käyttäjät luokittelevat juhlapyhäesineitä kategorioihin: joulukoristeet vs jouluruoka, halloween-asut vs halloween-karkit, kesätoiminnot vs talvitoiminnot. Julkaise halloween-lajittelupaketit syyskuussa, joulukokoelmat lokakuussa ja ystävänpäiväpaketit tammikuussa.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausittainen)',
      },
      {
        title: 'Monikieliset lajittelutyölehdet kielikoulutus- ja kaksikielisille markkinoille',
        description:
          'Hyödynnä kieliriippuvaisia kategoriatunnisteita luodaksesi lajittelutyölehtia 11 kielellä. Samat kuvat tuottavat eri kategoriatunnisteet kielen vaihtuessa — kuvanimet ja "Lajittele kuvat" -otsikko päivittyvät automaattisesti. Luo monikielisiä lajittelupaketteja, joissa jokainen kieliversio käyttää samoja temaattisia kuvia mutta lokalisoitua tekstiä. Tämä on erityisen arvokasta kansainvälisille markkinoille ja kaksikielisille tuotelinjoille. Myy kielikohtaisia paketteja tai monikielisiä megapaketteja premium-hintaan.',
        platform: 'Etsy / Gumroad (monikielinen markkina)',
      },
    ],
  },

  faq: [
    {
      question: 'Miten kahden kategorian lajittelumekanismi toimii?',
      answer:
        'Jokaisella lajittelutyölehdellä on tasan kaksi kategoriaa — vasen ja oikea. Työlehti näyttää kaksi katkoviivakehyksellistä kategoriaraamia yläosassa, joihin käyttäjät lajittelevat kuvansa, ja sekoitetun leikkausruudukon alhaalla kaikki kuvat sekoitettuina. Käyttäjät leikkaavat kuvat ruudukosta ja asettavat jokaisen oikeaan kategoriaraamiin. Kahden kategorian muoto luo selkeän binääriluokittelutehtävän, joka toimii kaikkiin aiheisiin.',
    },
    {
      question: 'Mikä ero on teematilalla ja manuaalitilalla?',
      answer:
        'Teematila mahdollistaa teeman valinnan vasemmalle kategorialle ja toisen teeman oikealle kategorialle. Sovellus valitsee automaattisesti 4–6 satunnaista kuvaa per teema kuvakirjastosta, tuottaen työlehtia 8–12 kuvalla yhteensä. Manuaalitila antaa täyden hallinnan: käsinvalitse yksittäisiä kuvia mistä tahansa teemasta ja määrää jokainen vasempaan tai oikeaan kategoriaan. Teematila on nopeampi massamuotantoon; manuaalitila on ihanteellinen spesifisten, räätälöityjen lajittelutoimintojen luomiseen.',
    },
    {
      question: 'Montako kuvaa voin sisällyttää jokaiselle lajittelutyölehdelle?',
      answer:
        'Jokainen työlehti tukee 4–12 kuvaa yhteensä, jokaisen kategorian sisältäessä 2–10 kuvaa. Teematila hakee automaattisesti 4–6 kuvaa per teema. Manuaalitila mahdollistaa tarkkojen lukumäärien asettamisen per kategoria. Leikkausruudukko säätää sarakeasetteluaan (3–4 saraketta määrän perusteella). Vähemmän kuvia luo yksinkertaisempia lajittelutehtäviä; enemmän kuvia lisää vaikeutta.',
    },
    {
      question: 'Miten sekoitettu leikkausruudukko toimii?',
      answer:
        'Leikkausruudukko vie sisältöalueen alaosan 55 % ja näyttää kaikki valitut kuvat satunnaisjärjestyksessä. Kuvat näkyvät valkoisissa soluissa katkoviiva-#666-reunoilla ja 4 px pyöristetyillä kulmilla, järjestettynä 3–4 sarakkeeseen kuvien kokonaismäärän perusteella. Jokainen kuva täyttää 85 % solustaan. Käyttäjät leikkaavat kuvat katkoviivojen mukaan ja lajittelevat ne oikeaan kategoriaraamiin yläpuolella.',
    },
    {
      question: 'Miten automaattisesti luotu vastausavain toimii?',
      answer:
        'Generaattori käyttää kaksikangas-järjestelmää Työlehti-välilehdellä ja Vastausavain-välilehdellä. Vastausavain näyttää kaksi kategorialaatikkoa (yksi per kategoria, tasalevyiset) kuvat oikeassa ryhmässään. Vastausavaimen kuvat renderöidään 6× leikkausruudukon solujen koossa maks 2 sarakkeella per kategorialaatikko. Molemmat versiot viedään erikseen neljällä erillisellä latauspainikkeella.',
    },
    {
      question: 'Miten lokalisoitu otsikko toimii?',
      answer:
        'Jokainen luotu työlehti sisältää tyylikään "Lajittele kuvat" -otsikon mintunvihreällä taustalla (#4DB6AC), valkoisella pillerikontilla, turkoosilla otsikolla (#00796B) Fredoka Bold -fontilla ja oranssilla kuvauksella (#FF7043) Quicksand-fontilla. Otsikko ja kuvaus kääntyvät automaattisesti kaikille 11 tuetulle kielelle: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja.',
    },
    {
      question: 'Onko Kuvalajittelu-generaattori kieliriippuvainen?',
      answer:
        'Kyllä. Kategoriatunnisteet käyttävät lokalisoituja kuvanimiä Kuvakirjastosta, joten kielen vaihto muuttaa työlehden tekstin. Esimerkiksi kissakuva näkyy "Kissa" suomeksi, mutta "Cat" englanniksi ja "Katze" saksaksi. Lokalisoitu "Lajittele kuvat" -otsikko vaihtuu myös valitun kielen mukaan. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa ja kaikki 11 kieltä lokalisoituihin kategoriatunnisteisiin.',
    },
    {
      question: 'Voinko sisällyttää nimi- ja päivämääräkentät lajittelutyölehteen?',
      answer:
        'Kyllä. Valitse "Sisällytä nimi/päivämäärä -kentät" -valintaruutu Sivuasetukset-paneelissa lisätäksesi nimi- ja päivämäärärivit työlehteen. Nämä kentät varmistavat jäljitettävyyden tuotelinjaympäristöissä ja tekevät lajittelutyölehdet valmiiksi keräämistä ja arviointia varten.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — teemapohjaista ja manuaalista kategoriavalintaa, säädettäviä kuvamääriä, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja, nimi/päivämääräkenttiä ja kaikkia latausmuotoja — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Voinko lisätä taustateemoja ja kehysteemoja lajittelutyölehteen?',
      answer:
        'Kyllä. Sivuasetukset-paneeli sisältää sekä taustateemanvalitsimen läpinäkyvyysliukusäätimellä (0–1 0,05:n välein) että kehysteemanvalitsimen omalla itsenäisellä läpinäkyvyysliukusäätimellään. Taustateemat lisäävät koristeellisia kuvioita lajittelusisällön taakse, kun taas kehysteemat kehystävät sivun. Molemmilla on erilliset läpinäkyvyyden säätimet.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja lajittelutyölehtia Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä lajittelutyölehtisi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, tuotelinjaresursseina Gumroadissa tai millä tahansa muulla myyntikanavalla. Kahden kategorian lajittelumekanismi, automaattisesti luodut vastausavaimet ja 104 temaattista kuvakokoelmaa antavat sinulle luovat työkalut alkuperäisten, myytävien lajittelutoimintatuotteiden tuottamiseen.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata teemapohjaista ja manuaalista kategoriavalintaa, säädettäviä kuvamääriä, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja, nimi/päivämääräkenttiä ja kaikkia latausmuotoja ennen ostamista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
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
      slug: 'bingo-tyolehdat',
      anchorText: 'Kuvabingo-korttien generaattori',
    },
    {
      pageType: 'app',
      slug: 'etsi-ja-laske-tyolehdat',
      anchorText: 'Etsi ja Laske -työlehtigeneraattori',
    },
    {
      pageType: 'app',
      slug: 'varityskirja-tyolehdat',
      anchorText: 'Värityskirja-työlehtigeneraattori',
    },
    {
      pageType: 'bundle',
      slug: 'yhdistely-lajittelu-paketti',
      anchorText: 'Yhdistely ja Lajittelu -paketti — Kaikki yhdistelysovellukset yhdessä',
    },
    {
      pageType: 'guide',
      slug: 'luo-lajittelu-tyolehtia',
      anchorText: 'Näin luot myytäviä lajittelutyölehtia',
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
      primary: '/samples/finnish/picture%20sort/Lajittele%20Kuvat%201.webp',
      primaryAlt: 'Kahden kategorian kuvalajittelutyölehti temaattisilla kategoriaraamilla, sekoitetulla leikkausruudukolla ja lokalisoidulla Lajittele kuvat -otsikolla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/picture%20sort/Lajittele%20Kuvat%202.webp',
        alt: 'Teematilan lajittelutyölehti eläimillä vasemmalla ja ruoalla oikealla kategorioissa',
        caption: 'Teematila — automaattisesti täytetyt kategoriat kuvakirjastosta',
      },
      {
        src: '/samples/finnish/picture%20sort/Lajittele%20Kuvat%203.webp',
        alt: 'Manuaalitilan lajittelutyölehti käsinvalituilla kuvilla vasempaan ja oikeaan kategoriaan',
        caption: 'Manuaalitila — käsinvalitse kuvat ja määrää kategorioihin',
      },
      {
        src: '/samples/finnish/picture%20sort/Lajittele%20Kuvat%201%20answer_key.webp',
        alt: 'Kuvalajittelun vastausavain 6x suuremmilla kuvilla oikeissa kategorialaatikoissa',
        caption: 'Automaattisesti luotu vastausavain — 6× suuremmat kuvat kategorialaatikoissa',
      },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: 'Näin luot kuvalajittelutyölehtia kahden kategorian lajittelulla ja automaattisilla vastausavaimilla — Vaihe vaiheelta -opas',
  },
};

export default content;
