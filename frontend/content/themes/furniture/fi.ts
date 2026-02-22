import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Huonekalut',
  title: 'Huonekalutehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  description: 'Tutustu huonekalutehtäviin lapsille: huonejärjestelyt, muodot, koot ja avaruudelliset käsitteet. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  keywords: 'huonekalutehtävät lapsille, huonekalut oppimateriaali, kodin esineet harjoitus, huonesanasto esikoulu, huoneiden tunnistaminen, kodin tilat tehtävä, sijainnin ilmaiseminen, arjen esineet oppiminen, huonekalut ja muodot, huonekalu työlehdet tulostettava, huonejärjestely tehtävät esikoulu',
  heading: 'Huonekaluaiheiset Tehtävät ja Työlehdet Lapsille',

  // -- Rich narrative content --
  intro: 'Huonekalut tarjoavat yllättävän rikkaan kontekstin varhaiskasvatukselle, koska ne sijaitsevat avaruudellisen hahmottamisen, geometrian, toiminnallisen luokittelun ja arkikokemuksen risteyskohdassa. Jokainen lapsi käyttää huonekaluja koko päivän: he istuvat tuoleilla, nukkuvat sängyissä, säilyttävät leluja hyllyillä ja syövät pöytien ääressä. Tämä jatkuva, suora vuorovaikutus tarkoittaa, että huonekalupohjaiset oppimistehtävät hyödyntävät syvää henkilökohtaisen kokemuksen varaa tehden abstrakteista käsitteistä kuten muodosta, koosta, sijainnista ja toiminnasta konkreettisia ja välittömästi merkityksellisiä. Tulostettavat huonekalutyölehtimme esittelevät yksityiskohtaisia kuvituksia tuoleista, pöydistä, sängyistä, sohvista, hyllyistä, kirjoituspöydistä, lipasoista ja lampuista huonetilanteissa, jotka lapset tunnistavat omasta kodistaan. Avaruudellinen hahmotus on huonekaluaiheisten työlehden tunnusmerkki, koska huonekalut ovat olemassa järjesteltäviksi tilassa – ja sen ymmärtäminen, minne esineet menevät ja miksi, on pohjimmiltaan avaruudellinen tehtävä. Prepositiotyölehdet onnistuvat erinomaisesti huonekalukonteksteissa: kirja on pöydällä, kengät ovat sängyn alla, lamppu on pöydän vieressä, kissa on tuolien välissä. Nämä avaruudelliset kuvaukset eivät ole abstrakteja kielioppiharjoituksia vaan tarkkoja kuvauksia kohtauksista, joita lapset näkevät joka päivä, mikä tekee huonekaluista ihanteellisen välineen avaruudellisen sanaston rakentamiseen, joka tukee geometriaa, kartanlukua ja kuvailevien tekstien luetun ymmärtämistä. Muotojen tunnistus yhdistyy luonnostaan huonekaluihin, koska huonekalut on rakennettu geometrisista muodoista: pöytälevy on suorakulmio tai ympyrä, tuolin jalat ovat lieriöitä, kirjahylly koostuu neliöistä ja suorakulmioista ja pyöreä peili on ympyrä. Suomalaisessa kodissa muotoilu ja huonekalujen suunnittelu on kulttuurisesti merkittävää – Alvar Aalto, Eero Aarnio ja muiden suomalaisten suunnittelijoiden työ tekee huonekaluista erityisen kiinnostavan aiheen suomalaisille lapsille. Opettajille ja vanhemmille huonekalutyölehdet tarjoavat teeman, joka on samanaikaisesti akateeminen ja käytännöllinen – ne opettavat avaruudellisia käsitteitä ja luokittelutaitoja, joita lapset voivat välittömästi soveltaa katsomalla ympärilleen missä tahansa huoneessa ja kuvailemalla näkemäänsä.',

  educationalOverview: 'Huonekaluaiheiset työlehdet tuottavat erottuvia pedagogisia tuloksia kehittämällä avaruudellista hahmotusta, geometrista tietoisuutta ja toiminnallista luokittelua kontekstissa, jonka kanssa lapset ovat fyysisesti tekemisissä joka päivä. Avaruudellinen hahmotus on laajalti tunnustettu kriittiseksi ennustajaksi menestyksestä matematiikassa ja luonnontieteissä, ja huonekalut tarjoavat vertaansa vailla olevan opetusvälineen, koska huonekalujen järjestely on luontaisesti avaruudellista. Kun lapset harjoittelevat prepositioita huonekalukohtauksilla, he rakentavat mentaalisia avaruudellisia malleja, jotka tukevat geometriaa, koordinaattijärjestelmiä ja kartanlukua. Geometriset käsitteet saavat välittömän merkityksen huonekalujen kautta, koska jokainen huonekalu ilmentää matemaattisia muotoja. Sen tunnistaminen, että lipasto on suorakulmainen särmiö, kellon taulu on ympyrä ja lampunvarjostin on kartio tai puolisuunnikas, auttaa lapsia ymmärtämään, että geometria kuvaa todellista maailmaa – ei pelkästään oppikirjojen kaavioita. Tämä yhteys abstraktien muotojen ja konkreettisten esineiden välillä vahvistaa merkittävästi geometrisen tiedon muistiin jäämistä ja siirtymistä. Perusopetuksen opetussuunnitelman perusteet (POPS) korostavat ympäristön havainnointia ja tutkivaa oppimista, ja huonekalutyölehdet tukevat näitä tavoitteita tarjoamalla lapsille tutun kontekstin, jossa soveltaa matemaattisia ja kielellisiä taitojaan.',

  parentGuide: 'Huonekalutyölehdet yhdistyvät kotiympäristöönne poikkeuksellisen välittömästi, koska huonekalut ovat kaikkialla, minne lapsenne katsoo. Huonelajittelutyölehden jälkeen kävelkää talonne läpi ja pyytäkää lastanne nimeämään jokainen huonekalu jokaisessa huoneessa ja kuvailemaan sen toimintaa: sohva on istumista varten, hylly on kirjojen säilyttämistä varten, sänky on nukkumista varten. Harjoitelkaa prepositioita luonnostaan arkitilanteissa: kysykää, missä kaukosäädin on televisiota katsoessa, mihin shampoo menee kylpyhetken jälkeen tai mihin kengät kuuluvat sisälle tullessa. Muotojen tunnistamisesta tulee kotiarvoitushunta: löydätkö ympyrän muodon huonekalusta, minkä muotoinen pöytälevy on, ovatko tuolin jalat samaa muotoa kuin pöydän jalat. Antakaa lapsenne auttaa järjestämään huonetta tai perustamaan lukunurkkauksen keskustellen, miksi tietyt huonekalut kuuluvat tiettyihin paikkoihin ja mikä tekee hyvän järjestelyn. Suomalaisten kotien selkeä ja toiminnallinen muotoilu tarjoaa erinomaisen kontekstin näille keskusteluille. Pitäkää työlehtihetket kymmenestä viiteentoista minuuttiin ja yhdistäkää aina tehtävä johonkin kotinne todelliseen huonekaluun. Tämä konkreettinen yhteys paperioppimisen ja fyysisen ympäristön välillä tekee huonekaluteemasta epätavallisen tehokkkaan kestävän avaruudellisen tietoisuuden ja luokittelutaitojen rakentamisessa.',

  // -- Curated apps (IDENTICAL to English) --
  curatedAppIds: [
    'coloring', 'matching-app', 'picture-sort', 'shadow-match', 'grid-match',
    'image-addition',
    'word-search', 'prepositions',
    'pattern-worksheet', 'odd-one-out',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-search', 'prepositions'] },
    { category: 'visual', appIds: ['coloring', 'matching-app', 'picture-sort', 'shadow-match', 'grid-match'] },
    { category: 'puzzles', appIds: ['pattern-worksheet', 'odd-one-out'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Suunnittele unelmaluokkajärjestely', description: 'Avaruudellisen hahmotuksen työlehden jälkeen anna oppilaille lintuperspektiivinen ääriviiva tyhjästä luokkahuoneesta. Tarjoa leikattuja huonekalupaloja kuten pulpetteja, tuoleja, opettajan pöytä, matto ja kirjahyllyjä. Oppilaat järjestävät huonekalut mielestään parhaaseen asetteluun ja selittävät sitten valintansa parille harjoitellen avaruudellista sanastoa, vakuuttavaa perustelua ja yhteisöllistä keskustelua samanaikaisesti.', audience: 'teacher' },
    { title: 'Huonekalumuotoetsivät', description: 'Muotojen tunnistustehtävän jälkeen lähettäkää oppilaat luokkahuoneen arvoitushuintaan, jossa heidän on löydettävä vähintään viisi eri geometrista muotoa, jotka ovat piilossa huonekaluissa ja huoneen piirteissä: neliönmuotoinen ikkuna, suorakaiteen muotoinen pulpetti, pyöreä kello, lieriönmuotoinen tuolinjalka. He kirjaavat löydöksensä tukkimiehen kirjanpitoon vahvistaen sekä geometrista sanastoa että havainnointitaitoja välittömässä ympäristössään.', audience: 'teacher' },
    { title: 'Rakenna kenkälaatikkohuone', description: 'Huonejärjestely- tai huonekalulajittelutehtävän jälkeen auttakaa lastanne rakentamaan pienoishuone kenkälaatikon sisälle. Käyttäkää pieniä rasioita huonekaluina, kangastilkkuja mattoina ja verhoina sekä kartonkia hyllyinä ja pöytinä. Kun lapsenne asettaa jokaisen esineen paikalleen, kysykää, mihin se pitäisi laittaa ja miksi, vahvistaen avaruudellista hahmotusta ja toiminnallista luokittelua käytännön kolmiulotteisen rakentamisen kautta.', audience: 'parent' },
    { title: 'Kuvaile huone -leikki', description: 'Istukaa missä tahansa huoneessa ja vuorottelkaa lapsenne kanssa huonekalujen sijainnin kuvaamisessa tarkalla avaruudellisella kielellä: lamppu on pöydällä sohvan vieressä, matto on sohvapöydän alla, taulu on kirjahyllyn yläpuolella. Haastakaa toisianne käyttämään mahdollisimman monta eri prepositiota. Tämä nopea leikki vahvistaa työlehtioppimista avaruudellisesta sanastosta sekä luokkahuoneessa että kotona.', audience: 'both' },
  ],
  activities: [
    {
      title: 'Huonejärjestelyn suunnitteluhaaste',
      description: 'Anna jokaiselle lapselle suuri suorakaiteen muotoinen paperi, joka edustaa tyhjää huonetta. Tarjoa mittakaavaisia huonekaluleikkeitä, joihin kuuluu sänky, kirjoituspöytä, tuoli, kirjahylly, matto ja lamppu. Lapset järjestävät huonekalut huonesuunnitelmaansa päättäen, mitä menee minne ja selittäen perustelunsa. Asettelun valmistuttua lapset kirjoittavat tai sanelevat kolme lausetta, jotka kuvaavat huonekalujen sijaintia prepositioita käyttäen. Vertailkaa erilaisia suunnitelmia luokassa nähdäksenne, miten eri järjestelyt käyttävät tilaa eri tavoin.',
      materials: ['suuret suorakaiteen muotoiset huoneen ääriviivat', 'mittakaavaiset huonekaluleikkeet', 'liimatikut', 'kynät'],
      duration: '25-30 minuuttia',
      skillAreas: ['cognitive', 'literacy'],
    },
    {
      title: 'Huonekalumuotojen metsästys',
      description: 'Luo työlehti, jossa on ruudukko, jossa näkyy yleisiä geometrisia muotoja: ympyrä, neliö, suorakulmio, kolmio ja lieriö. Lapset kävelevät luokkahuoneen ympäri tai tutkivat huonekuvajulisteita löytääkseen huonekaluja, jotka sisältävät kutakin muotoa. He piirtävät tai kirjoittavat huonekalun vastaavan muodon viereen ruudukossaan: suorakaiteen muotoinen pöytälevy, pyöreä kello, lieriönmuotoinen lampunjalka, neliönmuotoinen valokuvakehys ja kolmionmuotoinen hyllyn kannatin. Keskustelkaa, miten huonekalusuunnittelijat käyttävät muotoja sekä toimintaan että kauneuteen.',
      materials: ['muodonetsintäruudukko-työlehdet', 'kynät', 'huonekuvajulisteet tai pääsy luokkahuoneeseen'],
      duration: '15-20 minuuttia',
      skillAreas: ['math', 'cognitive'],
    },
    {
      title: 'Huonekalujen toimintolajittelu',
      description: 'Tulosta kuvia kahdestatoista-viideentoista huonekalusta, mukaan lukien tuolit, sohvat, sängyt, hyllyt, pöydät, kirjoituspöydät, vaatekaapit ja yöpöydät. Luo neljä luokkamattoa: istumiseen tarkoitetut, nukkumiseen tarkoitetut, säilyttämiseen tarkoitetut ja työskentelyyn tai syömiseen tarkoitetut. Lapset lajittelevat jokaisen huonekalun oikeaan luokkaan keskustellen esineistä, jotka voisivat kuulua useampaan ryhmään, kuten kirjoituspöytä, jossa on sekä työtaso että säilytyslaatikot. Tämä monimääritteinen päättely rakentaa joustavaa luokittelutaitoa.',
      materials: ['tulostetut huonekalukuvat', 'neljä nimettyä luokkamattoa', 'liimatikut tai teippi'],
      duration: '15-20 minuuttia',
      skillAreas: ['cognitive', 'social'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa avaruudellisia suhteita ja sijainteja huonekalujen avulla',
      relatedAppIds: ['prepositions'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua kodin tiloihin ja niiden käyttötarkoituksiin',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laajentaa huonekaluihin liittyvää sanastoa',
      relatedAppIds: ['word-search'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      seoTitle: 'Huonekalutehtävät Esikouluun — Laske ja Väritä | LCS',
      seoDescription: 'Tulostettavia huonekalutehtäviä esikouluun (3–4v). Laske huonekaluja, väritä tuoleja, yhdistä huonekaluvarjoja ja lajittele esineitä. Ilmaisia työlehtiä.',
      seoKeywords: 'huonekalutehtävät esikoululaisille, hienomotoriikka harjoitus, väritys ja jäljentäminen, koon tunnistaminen, yksinkertainen laskeminen, kodin esineet, sijainnin ilmaiseminen, huonesanasto, huonekalutehtävät esikoulu, huonekalujen oppiminen 3-4v',
      intro: 'Kolme-neljävuotiaat esikoululaiset ovat tekemisissä huonekalujen kanssa jatkuvasti päivän aikana – istuvat tuoleilla, kiipeilevät sohville, avaavat laatikoita ja nukkuvat sängyissä – mikä tekee huonekaluista syvästi tutun kontekstin avaruudellisten käsitteiden, muotojen ja luokittelun esittelyyn. Tässä kehitysvaiheessa lapset oppivat nimeämään tuttuja esineitä, kehittävät avaruudellista sanastoa kuten päällä ja alla ja alkavat tunnistaa perusmuotoja ympäristössään. Esikoulun huonekalutyölehdet esittävät suuria, ystävällisiä kuvituksia sängyistä, tuoleista, pöydistä, hyllyistä ja lampuista, jotka lapset voivat välittömästi yhdistää omien kotiensa ja luokkiensa esineisiin. Tyypillinen tehtävä voi näyttää kuvan makuuhuoneesta ja pyytää lasta ympyröimään huonekalut erottaen ne muista esineistä kuten leluista ja vaatteista. Yhdistämistehtävät yhdistävät identtisiä huonekalupaloja tai huonekalun sen varjoon rakentaen visuaalista erottelukykyä ja muotojen tunnistamista samanaikaisesti. Yksinkertaiset prepositiotehtävät näyttävät nallen istumassa tuolilla, makaamassa pöydän alla tai seisomassa kirjahyllyn vieressä, ja pyytävät lasta osoittamaan tai ympyröimään oikean sijaintisanan. Kokovertailutehtävät esittävät kaksi erikokoista tuolia ja kysyvät kumpi on suurempi, tai kolme sänkyä pienimmästä suurimpaan pyytäen lasta tunnistamaan kunkin. Huonetilojen värityssivut kehittävät hienomotoriikkaa samalla kun ne kutsuvat lapsia huomaamaan esineiden väliset avaruudelliset suhteet. Opettajien ja vanhempien kannattaa pitää tuokiot kahdeksasta kahteentoista minuuttiin ja vahvistaa työlehden käsitteitä kysymällä kysymyksiä oikeista huonekaluista arjen tilanteissa: millä istut, minkä muotoinen pöytä on, onko iso tuoli vai pieni tuoli sinun.',
      objectives: [
        { skill: 'Tunnistaa ja nimetä yleisiä huonekaluja kuvituksissa ja oikeassa elämässä', area: 'literacy' },
        { skill: 'Käyttää perusasentosanoja huonekalujen sijaintien kuvailemiseen: päällä, alla, sisällä, vieressä', area: 'cognitive' },
        { skill: 'Vertailla huonekalujen kokoja sanoilla suurempi, pienempi, korkeampi ja matalampi', area: 'math' },
      ],
      developmentalNotes: 'Kolme-neljävuotiaat rakentavat avaruudellista tietoisuutta fyysisen vuorovaikutuksen kautta huonekalujen kanssa – kiipeilemällä yli, ryömimällä alle ja puristautumalla väliin. Huonekalutyölehdet kanavoivat tämän fyysisen avaruudellisen tiedon sanallisiksi ja visuaalisiksi esityksiksi. Hienomotoriikka hyötyy huonekalukuvitusten värittämisestä, jossa on useita suoria ja kaarevia viivoja, jotka vaativat hallittuja käden liikkeitä.',
      teachingTips: [
        'Käyttäkää nukkekotia tai luokkahuoneen huonekalunurkkia työlehden rinnalla, jotta lapset voivat fyysisesti asettaa leluhuonekaluja ennen paperitehtävän tekemistä rakentaen sillan fyysisen avaruudellisen kokemuksen ja symbolisen esityksen välille.',
        'Huonekalujen yhdistämis- tai lajittelutehtävän jälkeen pyytäkää lapsia löytämään yksi huonekalu huoneesta, joka vastaa jotain työlehden esineistä yhdistäen paperikuvitukset todellisiin kolmiulotteisiin esineisiin ympärillään.',
      ],
      faq: [
        { question: 'Miten huonekalutyölehdet auttavat esikoululaisia oppimaan muotoja?', answer: 'Huonekalut on rakennettu geometrisista muodoista, joita lapset voivat nähdä ja koskettaa. Pöytälevy on suorakulmio, kello on ympyrä ja kirjahylly koostuu neliöistä ja suorakulmioista. Työlehdet, jotka pyytävät lapsia löytämään nämä muodot huonekalukuvituksista, opettavat geometriaa konkreettisten, tuttujen esimerkkien kautta abstraktien kaavioiden sijaan.' },
        { question: 'Sopivatko huonekalutyölehdet kolmevuotiaille?', answer: 'Kyllä, kun niissä on suuria kuvituksia tutuista esineistä kuten sängyistä, tuoleista ja pöydistä yksinkertaisine yksivaiheisine tehtävineen. Kolmevuotiaiden huonekalutehtävät keskittyvät esineiden nimeämiseen, huonetilojen värittämiseen, identtisten palojen yhdistämiseen ja peruskoon vertailuun – kaikki käyttäen esineitä, joiden kanssa lapset ovat tekemisissä päivittäin ja jotka he tunnistavat helposti.' },
        { question: 'Miten huonekalutyölehdet kehittävät avaruudellista sanastoa?', answer: 'Huonekalut ovat luonnostaan paikoillaan huoneissa, joita lapset voivat kuvailla: lamppu on pöydällä, kengät ovat sängyn alla. Nimeämällä toistuvasti näitä järjestelyjä sijaintisanoilla työlehden tehtävissä lapset rakentavat avaruudellisen sanaston, joka tukee sekä matemaattista avaruudellista hahmottamista että kuvailevien tekstien luetun ymmärtämistä.' },
      ],

      snippetAnswer: 'Huonekaluaiheiset työlehdet esikoululaisille (3–4-vuotiaat) opettavat tunnistamaan ja nimeämään huonekaluja, lajittelemaan niitä huoneen mukaan ja laskemaan huonekalujen osia. Tutut esineet luovat turvallisen oppimisympäristön, jossa geometriset muodot tulevat näkyviksi.',
      uniqueGradeAngle: 'Huonekaluteema on esikoululaisen geometrisen ajattelun arkipäiväinen harjoituskenttä, koska kolme- ja neljävuotiaat istuvat, nukkuvat ja leikkivät huonekalujen päällä joka päivä — ja jokainen huonekalu on geometristen muotojen yhdistelmä: suorakaiteen muotoinen pöytä, ympyrämäinen jakkara, sylinterin muotoinen jalka. Huonekaluteema tekee geometriasta näkyvää arjessa tavalla, jota abstraktit muotoharjoitukset eivät saavuta. VASU:n matemaattisen ajattelun ja tilakäsitteiden (päällä, alla, vieressä, edessä, takana) harjoittelu toteutuu luontevasti huonekalukontekstissa. Tilakäsitteet ovat esikoululaisen kielellisen ja matemaattisen kehityksen risteyskohdassa: "nalle on tuolin ALLA" yhdistää kielen ja avaruudellisen ajattelun. Suomalaisessa kodissa huonekalut ovat yksinkertaisia ja selkealinjaisia, mikä tekee niiden muodoista helposti tunnistettavia. Huonekalujen piirtäminen kehittää suorien viivojen ja kulmien hallintaa, jotka ovat kirjoitusvalmiuden tärkeitä osatekijöitä.',
      developmentalMilestones: [
        { milestone: 'Tilakäsitteiden oppiminen (3–4-vuotiaat alkavat ymmärtää suhteellista sijaintia)', howWeAddress: 'Tehtävät, joissa sijoitetaan esineitä huonekaluihin nähden (pallo PÖYDÄN ALLA, kirja HYLLYN PÄÄLLÄ), konkretisoivat tilakäsitteet' },
        { milestone: 'Huonekalujen luokittelu huoneittain (esikoululaiset ymmärtävät, että huonekalut kuuluvat tiettyihin tiloihin)', howWeAddress: 'Lajittelutehtävät, joissa huonekalut ryhmätään huoneeseen (sänky = makuuhuone, jääkaappi = keittiö), syventävät tilallista luokittelua' },
        { milestone: 'Geometristen muotojen löytäminen esineistä (esikoululaiset näkevät muodot konkreettisissa esineissä)', howWeAddress: 'Tehtävät, joissa huonekalusta etsitään ympyröitä, neliöitä ja suorakaiteita, yhdistävät geometrian arkitodellisuuteen' },
        { milestone: 'Suorien viivojen ja kulmien piirtäminen (esikoululaiset kehittävät kulmikaiden muotojen hallintaa)', howWeAddress: 'Huonekalujen jäljentämistehtävät, joissa piirretään pöytiä ja tuoleja suorista viivoista, harjoittavat kulmikaiden muotojen motorista hallintaa' },
      ],
      differentiationNotes: 'Tukea tarvitseville esikoululaisille aloita kolmella tutuimmalla huonekalulla (tuoli, pöytä, sänky), käytä nukkekotia tai leikkihuonekaluja fyysisenä tukena ja yksinkertaista tilakäsitteet kahteen (päällä ja alla). Edistyneille esikoululaisille lisää useampia tilakäsitteitä (edessä, takana, vieressä, välissä), pyydä piirtämään oma huone huonekaluineen ja haasta kertomaan kunkin huonekalun sijainnista kokonaisilla lauseilla.',
      parentTakeaway: 'Huonekaluteema muuttaa jokaisen huoneen oppimisympäristöksi. Leikkiä piilojen etsimistä tilakäsitteillä: "nalle on sohvan TAKANA, löydätkö?" Laskekaa yhdessä tuoleja pöydän ympärillä, etsikää muotoja huonekaluista ("onko pöytä neliö vai suorakaide?") ja järjestäkää nukkekotia huonekaluineen. Tämä arjessa tapahtuva oppiminen on tehokkainta, koska lapsi käyttää oppimaansa välittömästi.',
      classroomIntegration: 'Huonekaluteema nivoutuu esikoulun nukkekoti- ja rakennusleikkeihin: nukkekodissa harjoitellaan tilakäsitteitä ja huoneiden sisästustä, rakennuspisteessä rakennetaan huonekaluja palikoista. Aamupiirissä pelataan "missä on nalle?" -peliä tilakäsitteillä, oppimispisteissä lajitellaan huonekalukuvia huoneisiin ja väritetään huonekaluja. Tämä leikkipohjainen lähestymistapa toteuttaa VASU:n matemaattisen ajattelun ja kielenkehityksen tavoitteita.',
      assessmentRubric: [
        { skill: 'Tilakäsitteiden hallinta', emerging: 'ymmärtää käsitteet päällä ja alla aikuisen tuella', proficient: 'käyttää itsenäisesti 3–4 tilakäsitettä oikein', advanced: 'käyttää 5+ tilakäsitettä sujuvasti ja ohjeistaa toisia niiden avulla' },
        { skill: 'Huonekalujen luokittelu', emerging: 'lajittelee 2–3 huonekalua oikeaan huoneeseen aikuisen avulla', proficient: 'lajittelee itsenäisesti 5–6 huonekalua ja nimeää huoneet', advanced: 'lajittelee useita huonekaluja, perustelee sijainnin ja piirtää oman huonejärjestyksen' },
        { skill: 'Suorien muotojen piirtäminen', emerging: 'jäljentää suorakulmaisia muotoja katkoviivojen avulla karkeasti', proficient: 'piirtää tunnistettavan pöydän ja tuolin suorilla viivoilla', advanced: 'piirtää useita huonekaluja oikeilla mittasuhteilla ja lisää yksityiskohtia' },
      ],
    },
    'kindergarten': {
      seoTitle: 'Huonekalutehtävät Esiopetukseen — Lue ja Järjestä | LCS',
      seoDescription: 'Tulostettavia huonekalutehtäviä esiopetukseen (5–6v). Harjoittele huonekalusanastoa, laske esineitä ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'huonekalutehtävät esiopetukseen, alkuäänteet harjoitus, kirjaintunnistus oppiminen, lukuvalmius tukeminen, yhteenlasku kymmeneen, kodin esineet, sijainnin ilmaiseminen, huonesanasto, huonekalutehtävät esiopetus, huonekalujen oppiminen 5-6v',
      intro: 'Esiopetusikäiset tuovat kasvavat analyyttiset kyvyt huonekalutyölehtiin, valmiina tehtäviin, jotka yhdistävät avaruudellisen hahmotuksen perustavanlaatuiseen matematiikkaan, lukutaitoon ja luokittelutaitoihin. Viisi-kuusivuotiaat osaavat lajitella useiden ominaisuuksien mukaan, käyttää laajempaa valikoimaa prepositioita, laskea kahteenkymmeneen ja pidemmälle ja alkavat tunnistaa geometrisia muotoja itsenäisesti. Tämän tason huonekalutyölehdet esittelevät monimutkaisempia avaruudellisia kuvauksia käyttäen prepositioita kuten välissä, takana, yläpuolella ja edessä yksityiskohtaisissa huonetiloissa, joissa useat huonekalut luovat kerroksellisia avaruudellisia suhteita. Luokittelutehtävistä tulee monikriteerisiä: lapset lajittelevat huonekalut sekä huoneen että toiminnon mukaan tunnistaen, mitkä esineet on tarkoitettu istumiseen makuuhuoneessa verrattuna istumiseen keittiössä, tai erottaen säilytyshuonekalut pinta-huonekaluista. Yhteenlasku- ja laskutehtävät käyttävät huonekaluskenaarioita: jos jokaisessa huoneessa on kaksi tuolia ja huoneita on viisi, kuinka monta tuolia laskemme kävellessämme talon läpi. Muotojen tunnistustehtävät pyytävät lapsia jäljentämään huonekalukuvituksista löytämiään geometrisia muotoja yhdistäen visuaalisen havainnoinnin geometriasanastoon. Ruudukkohaasteet huonekaluesineillä kehittävät avaruudellista muistia ja kuvioiden tunnistamista. Sanahaut sisältävät huonekalu- ja huonesanastoa kuten kirjahylly, vaatekaappi, nojatuoli ja yöpöytä kehittäen lukusujuvuutta käytännön sanaston rinnalla. Perusopetuksen opetussuunnitelman perusteet (POPS) painottavat ympäristön tutkimista ja loogisen ajattelun kehittämistä, ja huonekalutyölehdet tarjoavat tähän erinomaisen kontekstin.',
      objectives: [
        { skill: 'Käyttää ja ymmärtää prepositioita mukaan lukien välissä, takana, yläpuolella ja edessä huonekalujen sijaintien kuvaamiseen', area: 'literacy' },
        { skill: 'Tunnistaa geometrisia muotoja huonekaluista ja kuvailla niiden ominaisuuksia', area: 'math' },
        { skill: 'Lajitella huonekaluja useiden ominaisuuksien mukaan mukaan lukien huone, toiminto ja materiaali', area: 'cognitive' },
      ],
      developmentalNotes: 'Esiopetusikäiset kehittävät avaruudellista visualisointia, jota tarvitaan huonejärjestelyjen mentaaliseen suunnitteluun ennen esineiden fyysistä sijoittamista. Tämä mentaalinen kierto ja avaruudellinen suunnittelu on vahva ennustaja myöhemmälle matemaattiselle menestykselle, erityisesti geometriassa ja mittaamisessa. Heidän kasvava sanastonsa mahdollistaa tarkkojen huonekalutermien ja avaruudellisten prepositioiden käyttämisen tarkasti ja luovasti.',
      teachingTips: [
        'Anna oppilaille tyhjä huoneen ääriviiva ja joukko huonekalutarroja tai -leikkeitä oman huonejärjestelyn luomiseen, ja pyydä heitä sitten kirjoittamaan tai sanelemaan kolme lausetta kuvaten, minne he sijoittivat huonekalut käyttäen vähintään kolmea eri prepositiota.',
        'Huonekalumuotojen tunnistustehtävän jälkeen viekää oppilaat luokkahuoneen muotokävelylle, jossa he tunnistavat ja kirjaavat oikeista huonekaluista löytyviä geometrisia muotoja luoden tukkimiehen kirjanpidon ympyröiden, suorakulmioiden ja neliöiden löytömääristä.',
      ],
      faq: [
        { question: 'Miten huonekalutyölehdet tukevat geometrian oppimista esiopetuksessa?', answer: 'Jokainen huonekalu ilmentää geometrisia muotoja: suorakaiteen muotoiset pöytälevyt, pyöreät kellot, lieriönmuotoiset jalat ja neliönmuotoiset laatikoiden etuosat. Työlehdet, jotka pyytävät lapsia tunnistamaan, jäljentämään ja nimeämään näitä muotoja huonekalukonteksteissa, opettavat geometriaa todellisten esineiden kautta abstraktien kaavioiden sijaan tehden muotojen tunnistamisesta intuitiivisempaa ja mieleenpainuvampaa.' },
        { question: 'Mitä avaruudellisia taitoja esiopetuksen huonekalutyölehdet kehittävät?', answer: 'Ne rakentavat prepositioiden ymmärtämistä monimutkaisin sijaintitermein, avaruudellista visualisointia huonejärjestelytehtävien kautta, mentaalista kiertoa varjojen yhdistämisessä eri kulmista ja avaruudellista muistia ruudukkoyhdistämishaasteissa. Nämä yhdistetyt avaruudelliset taidot muodostavat perustan geometrialle, mittaamiselle ja myöhemmälle matemaattiselle päättelylle.' },
        { question: 'Voivatko huonekalutyölehdet opettaa erilaisista kodeista?', answer: 'Kyllä, työlehdet, joissa on huonekaluja erilaisista kodeista kuten kerrostaloista, omakotitaloista ja eri kulttuurien perinteisistä asunnoista, tutustuttavat lapset asuintilojen moninaisuuteen samalla kun ne vahvistavat samoja luokittelu- ja avaruudellisen hahmottamisen taitoja. Tämä yhteys tukee POPS:n yhteiskuntaopin tavoitteita yhteisöistä ja kulttuuritietoisuudesta.' },
      ],
    },
    'first-grade': {
      seoTitle: 'Huonekalutehtävät 1. Luokalle — Kodin Sanat ja Laskut | LCS',
      seoDescription: 'Tulostettavia huonekalutehtäviä 1. luokalle (6–7v). Ratkaise huonekalulaskuja, opettele kodinsanastoa ja täytä ristikköja. Ilmaisia työlehtiä.',
      seoKeywords: 'huonekalutehtävät 1. luokalle, yhteenlasku vähennyslasku, näkösanat tunnistaminen, luetun ymmärtäminen, oikeinkirjoitus harjoitus, kodin esineet, sijainnin ilmaiseminen, huonesanasto, huonekalutehtävät 1. luokka, huonekalujen oppiminen 6-7v',
      intro: 'Ensimmäisen luokan oppilaat ovat valmiita huonekalutyölehdille, jotka haastavat heitä monimutkaisilla avaruudellisilla kuvauksilla, monivaiheisilla matemaattisilla ongelmilla ja analyyttisillä luokittelutehtävillä. Kuusi-seitsemänvuotiaat osaavat kirjoittaa kuvailevia lauseita, laskea yhteen ja vähentää kahdenkymmenen sisällä, lukea lyhyitä tietokatkelmia ja pohtia, miksi esineet on suunniteltu ja järjestetty tietyllä tavalla. Huonekaluaiheiset matemaattiset työlehdet tällä tasolla esittävät sanallisia tehtäviä kuten luokkahuoneessa on kuusi pulpettia kahdessa rivissä – kuinka monta pulpettia on kussakin rivissä tai kirjahyllyssä on kolme hyllyä ja jokaiselle hyllylle mahtuu viisi kirjaa – kuinka monta kirjaa mahtuu hyllyyn yhteensä. Nämä skenaariot esittelevät sekä jakolaskuvalmiutta että kertolaskuajattelua konkreettisissa huonekalukonteksteissa. Avaruudellisen kuvauksen tehtävät muuttuvat hienostuneemmiksi pyytäen lapsia kirjoittamaan kappaleen, joka kuvailee huonejärjestelyä käyttäen vähintään viittä eri prepositiota. Lukutehtäviin kuuluu lyhyitä katkelmia siitä, miten huonekaluja suunnitellaan, miten huonejärjestelyt vaikuttavat tilojen tunnelmaan tai miten huonekalut ovat muuttuneet historian saatossa. Suomalainen muotoiluperinne Aallon koivuisista kaarevista tuoleista moderneihin kestävän kehityksen huonekaluihin tarjoaa rikkaan kontekstin näille lukemisille.',
      objectives: [
        { skill: 'Ratkaista kertolaskuvalmiutta kehittäviä sanallisia tehtäviä huonekalujärjestelyistä huoneissa', area: 'math' },
        { skill: 'Kirjoittaa kuvailevia kappaleita huonejärjestelyistä käyttäen viittä tai useampaa eri prepositiota', area: 'literacy' },
        { skill: 'Luokitella huonekaluja useiden ominaisuuksien mukaan ja selittää perustelu kirjallisesti', area: 'cognitive' },
      ],
      developmentalNotes: 'Ensimmäisen luokan oppilaat ovat kehittäneet avaruudellisen visualisoinnin huonejärjestelyjen mentaaliseen suunnitteluun ja arviointiin ottaen huomioon sekä toiminnalliset että esteettiset tekijät. Heidän kasvavat kirjoitustaitonsa mahdollistavat avaruudellisten kuvausten ilmaisemisen lauseissa ja kappaleissa, ja heidän matemaattinen päättelykykynsä tukee monivaiheisia ongelmia, joihin liittyy huonekalujen määriä, järjestelyjä ja ryhmittelyjä.',
      teachingTips: [
        'Haastakaa oppilaat suunnittelemaan uudelleen oma makuuhuoneensa ruutupaperille sijoittaen huonekaluleikkeitä ruudukolle avaruudellisen suunnittelun harjoittelemiseksi ja kirjoittamaan sitten kappale, jossa selitetään suunnittelupäätökset ja miksi he järjestivät huonekalut valitsemallaan tavalla.',
        'Käyttäkää huonekalujen sanallisia tehtäviä johdantona kertolaskun käsitteisiin: jos pöydän ympärillä on neljä tuolia ja pöytiä on neljä – kuinka monta tuolia on yhteensä, rohkaisee toistettua yhteenlaskua, joka johtaa luonnostaan kertolaskun ymmärtämiseen.',
      ],
      faq: [
        { question: 'Miten huonekalutyölehdet valmistavat kertolaskuun?', answer: 'Huonekalut luovat luonnostaan yhtä suuria ryhmiä: tuolit pöytien ympärillä, kirjat hyllyillä, laatikot lipasoissa. Sanalliset tehtävät kuten kolme hyllyä, joissa on neljä kirjaa kussakin, johdattavat lapset toistetun yhteenlaskun kautta löytämään yhteensä kaksitoista, rakentaen käsitteellisen perustan kertolaskulle ennen sen virallista esittelyä. Tämä konkreettinen konteksti tekee siirtymisestä kertolaskuun intuitiivisen.' },
        { question: 'Mitä kirjoitustaitoja ensimmäisen luokan huonekalutyölehdet kehittävät?', answer: 'Ne kehittävät kuvailevaa kirjoittamista tarkan avaruudellisen sanaston avulla, vakuuttavaa kirjoittamista, kun lapset selittävät huonejärjestelyvalintojaan, ja ohjeistavaa kirjoittamista huonekalujen järjestelyn kuvailemisessa. Rikas huonetilojen visuaalinen sisältö tarjoaa runsaasti materiaalia yksityiskohtaiseen, tarkkaan kirjoittamiseen, joka täyttää ensimmäisen luokan äidinkielen tavoitteet kuvailevalle ja tietotekstille.' },
        { question: 'Voivatko huonekalutyölehdet liittyä teknologian ja insinöörityön käsitteisiin?', answer: 'Kyllä. Keskustelu siitä, miksi pöydissä on neljä jalkaa vakauden vuoksi, miksi hyllyt ovat litteitä ja miksi tuoleissa on selkänojat, esittelee rakenteen ja toiminnon perus-insinööriperiaatteita. Ekaluokkalaiset voivat analysoida, miksi huonekalut on suunniteltu tietyillä tavoilla, rakentaen suunnitteluajattelua, jota STEM-kasvatus painottaa yhä enemmän perinteisten akateemisten taitojen rinnalla.' },
      ],
    },
    'second-grade': {
      seoTitle: 'Huonekalutehtävät 2. Luokalle — Mittaus ja Tilastot | LCS',
      seoDescription: 'Tulostettavia huonekalutehtäviä 2. luokalle (7–8v). Mittaa huonekaluja, analysoi tilastoja ja kirjoita kodinkuvauksia. Ilmaisia työlehtiä.',
      seoKeywords: 'huonekalutehtävät 2. luokalle, kertotaulu harjoittelu, data-analyysi oppiminen, tietoteksti lukeminen, paikka-arvo ymmärtäminen, kodin esineet, sijainnin ilmaiseminen, huonesanasto, huonekalutehtävät 2. luokka, huonekalujen oppiminen 7-8v',
      intro: 'Toisluokkalaiset tuovat mittaamisen sujuvuuden, monipolkuiset laskutoimitukset ja kasvavan avaruudellisen analyysikyvyn huonekalutyölehtiin mahdollistaen tehtäviä, jotka yhdistävät huonesuunnittelun pinta-alan ja piirin esittelyyn, standardiyksikkömittaamiseen ja analyyttiseen kirjoittamiseen avaruudellisista järjestelyistä. Seitsemän-kahdeksanvuotiaat osaavat laskea yhteen ja vähentää sadan sisällä, mitata viivoittimilla senttimetreinä ja tuumina ja kirjoittaa järjestettyjä monikappleita tehden heistä valmiita huonekalutehtäviin, jotka yhdistävät arkisen avaruudellisen kokemuksen muodollisiin matemaattisiin käsitteisiin. Matemaattiset työlehdet tällä tasolla esittelevät pinta-alan ja piirin huonekalukontekstien kautta: jos suorakaiteen muotoinen pöytälevy on sata kahtakymmentä senttimetriä pitkä ja kahdeksankymmentä senttimetriä leveä, mikä on etäisyys reunan ympäri, tai kuinka monta neliösenttimetrin laattaa peittäisi pöydän pinnan. Nämä käytännön geometriaongelmat tekevät abstrakteista mittauskäsitteistä konkreettisia, koska lapset voivat visualisoida ja jopa mitata kuvaillun todellisen huonekalun. Huonejärjestelytehtävät etenevät mittakaavapiirustuksiin, joissa yksi ruutu ruutupaperilla edustaa yhtä jalkaa, ja oppilaat suunnittelevat huonekalujärjestelyjä, joiden on mahduttava tiettyihin mittoihin harjoitellen sekä avaruudellista hahmotusta että laskutaitoja.',
      objectives: [
        { skill: 'Laskea suorakaiteen muotoisten huonekalupintojen piiri ja ratkaista kaksivaiheisia mittaus-sanallisia tehtäviä standardiyksiköillä', area: 'math' },
        { skill: 'Lukea tietokatkelmia huonekalusuunnittelusta, materiaaleista ja historiasta ja vertailla tietoja eri lähteistä', area: 'literacy' },
        { skill: 'Luoda mittakaavaisia huonejärjestelyjä ruutupaperille ja kirjoittaa analyyttisiä kuvauksia selittäen suunnittelupäätöksiä avaruudellisella päättelyllä', area: 'cognitive' },
      ],
      developmentalNotes: 'Toisluokkalaiset ovat kehittäneet avaruudellisen visualisointikyvyn työskennellä mittakaavaisten huone-esitysten kanssa ymmärtäen, että ruutupaperilla olevat ruudut edustavat todellisia yksikköjä. Heidän mittaamiskykynsä mahdollistaa viivoittimien tarkan käytön ja tiedon kirjaamisen järjestettyihin taulukoihin. Kyky kirjoittaa monikappaleisia tekstejä tarkoittaa, että he voivat tuottaa huonekuvauksia ja suunnittelun selityksiä, jotka osoittavat sekä avaruudellista ymmärrystä että viestintätaitoja samanaikaisesti.',
      teachingTips: [
        'Pyytäkää oppilaita mittaamaan kolme luokan huonekalua viivoittimilla, kirjaamaan kunkin pinnan pituuden ja leveyden ja laskemaan sitten piirin lisäämällä kaikki sivut yhteen – konkreettinen pinta-alan ja piirin esittely tuttujen esineiden kautta.',
        'Haastakaa oppilaat suunnittelemaan unelma-makuuhuoneensa senttimetriruutupaperille kiinteällä huonekoolla vaatien heitä sovittamaan tietyt huonekalut tilaan samalla kun he selittävät järjestelyvalintansa kirjallisessa kappaleessa.',
      ],
      faq: [
        { question: 'Miten toisen luokan huonekalutyölehdet esittelevät pinta-alan ja piirin?', answer: 'Suorakaiteen muotoiset huonekalupinnat kuten pöytälevyt, pulpetit ja matot tarjoavat täydellisiä konkreettisia malleja pinta-alalle ja piirille. Oppilaat mittaavat huonekalujen pituuden ja leveyden, laskevat yhteen kaikki neljä sivua piirin löytämiseksi ja laskevat pintaa peittävät ruudut pinta-alan tutkimiseksi. Nämä käytännön laskelmat tekevät abstrakteista geometrian käsitteistä konkreettisiksi ja henkilökohtaisesti merkityksellisiksi.' },
        { question: 'Mitä avaruudellisen hahmotuksen taitoja toisen luokan huonekalutyölehdet kehittävät ensimmäistä luokkaa pidemmälle?', answer: 'Ne etenevät sijaintien kuvailemisesta prepositioilla mittakaavaisten huonesuunnitelmien luomiseen ruutupaperilla, laskemiseen mahtuvatko huonekalut tiettyihin mittoihin ja avaruudellisen tehokkuuden analysointiin. Oppilaat kehittävät kykyä kääntää kolmiulotteisten tilojen ja kaksiulotteisten esitysten välillä – kriittinen taito geometrialle ja kartanluvulle.' },
        { question: 'Miten huonekalutyölehdet tukevat toisen luokan kirjoittamisen tavoitteita?', answer: 'Oppilaat kirjoittavat monikappaleisia huonekuvauksia tarkan mittaussanaston avulla, laativat vakuuttavia kappaleita puolustaen huonekalujärjestelyvalintojaan todistusperustaisella perustelulla ja tuottavat tietotekstiä huonekalumateriaaleista ja -suunnittelusta. Tämä kirjoitustarkoitusten moninaisuus rakentaa järjestettyä, todisteilla tuettua kirjoittamista, jota POPS:n toisen luokan kirjoitustavoitteet vaativat.' },
      ],
    },
    'third-grade': {
      seoTitle: 'Huonekalutehtävät 3. Luokalle — Suunnittelu ja Geometria | LCS',
      seoDescription: 'Tulostettavia huonekalutehtäviä 3. luokalle (8–9v). Suunnittele huoneita, laske pinta-aloja ja ratkaise mittauspulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'huonekalutehtävät 3. luokalle, kertolasku jakolasku, tutkimusraportti kirjoittaminen, mielipidekirjoitus harjoitus, kriittinen ajattelu, kodin esineet, sijainnin ilmaiseminen, huonesanasto, huonekalutehtävät 3. luokka, huonekalujen oppiminen 8-9v',
      intro: 'Kolmasluokkalaiset tuovat pinta-alan ja piirin sujuvuuden, kertolaskutaidot ja selittävän kirjoituskyvyn huonekalutyölehtiin, jotka muuttavat geometrian abstrakteista kaavoista konkreettisiksi suunnitteluhaasteiksi, joissa todellisia esineitä käytetään päivittäin. Kahdeksan-yhdeksänvuotiaat osaavat kertoa ja jakaa sadan sisällä, laskea suorakaiteen muotoisten kappaleiden pinta-alan ja piirin ja kirjoittaa rakenteellisia monikappaleisia tekstejä tarkoin mittauksin ja teknisellä sanastolla tehden heistä ihanteellisia ehdokkaita työlehille, jotka lähestyvät huonekaluja geometrisen päättelyn ja käsityötaidon analyysin käytännön sovelluksena. Pinta-alalaskelmat ohjaavat huonekalupinta-analyyseja: suorakaiteen muotoinen kirjoituspöydän levy on yhdeksänkymmentä senttimetriä kertaa kuusikymmentä senttimetriä – mikä on pinta-ala neliösenttimetreinä. Piirin laskut soveltuvat reunanauha- ja kehysmittauksiin, kun oppilaat määrittävät kuinka monta senttimetriä koristenauhaa tarvitaan kirjahyllyn aukon kehystämiseen. Kertolasku yhdistyy materiaalien määräongelmiin, kuten jos jokainen hylly tarvitsee kaksi kannatinta ja kirjahylly sisältää kuusi hyllyä – kuinka monta kannatinta tarvitaan yhteensä. Suomalaisessa kulttuurissa huonekalusuunnittelun arvostus on korkealla, ja kolmasluokkalaiset voivat tutkia, miten suomalaiset muotoilijat ovat yhdistäneet kauneuden ja toimivuuden – Artekin huonekaluista moderneihin kierrätysmateriaaleja hyödyntäviin suunnitteluratkaisuihin.',
      objectives: [
        { skill: 'Laskea huonekalupintojen pinta-ala ja piiri ja käyttää kertolaskua materiaalien määräongelmien ratkaisemiseen', area: 'math' },
        { skill: 'Kirjoittaa selittäviä monikappaleisia tekstejä huonekalusuunnitteluprosessista tarkkoja mittauksia ja teknisiä termejä käyttäen', area: 'literacy' },
        { skill: 'Analysoida geometrisia ominaisuuksia mukaan lukien symmetria, yhdensuuntaiset viivat ja suorat kulmat huonekalurakenteissa', area: 'cognitive' },
      ],
      developmentalNotes: 'Huonekalusuunnittelu tarjoaa kolmasluokkalaisille konkreettisen, kolmiulotteisen kontekstin geometrian käsitteille, jotka voivat muuten tuntua abstrakteilta. Todellisten huonekalujen mittaaminen ja pinta-alojen laskeminen tekee pinta-alasta ja piiristä henkilökohtaisesti merkityksellisiä, kun taas käsityöulottuvuus vetoaa heidän kasvavaan tarkkuuden ja laadun arvostukseensa.',
      teachingTips: [
        'Suunnitelkaa huonekalunvalmistajaprojekti, jossa oppilaat piirtävät kirjahyllysuunnitelman, laskevat kunkin hyllypinnan pinta-alan kertolaskua käyttäen, määrittävät kokonaispiirin reunanauhaa varten ja kirjoittavat selittävän raportin suunnitteluprosessistaan tarkoin mittauksin.',
        'Luokaa huonekalugeometrian tutkimus, jossa oppilaat mittaavat luokan huonekaluja, tunnistavat yhdensuuntaiset viivat, suorat kulmat ja symmetriakselit jokaisessa kappaleessa, kirjaavat löydökset tietotaulukkoon ja kirjoittavat analyyttisiä kappaleita vertaillen eri huonekalutyyppien geometrisia ominaisuuksia.',
      ],
      faq: [
        { question: 'Miten kolmannen luokan huonekalutyölehdet kehittävät pinta-alan ja piirin taitoja?', answer: 'Oppilaat laskevat pulpettien, pöytien ja hyllyjen pinta-alan käyttäen pituus kertaa leveys -kaavaa, määrittävät piirin reunanauha- ja kehysmittauksia varten, vertaavat huonekalujen kokoja laskemalla ja vertaamalla pinta-aloja ja ratkaisevat monivaiheisia ongelmia, jotka vaativat sekä pinta-alan että piirin laskelmia samasta huonekalusta.' },
        { question: 'Mitä selittävän kirjoittamisen taitoja huonekalutyölehdet rakentavat?', answer: 'Oppilaat kirjoittavat monikappaleisia tekstejä, jotka kuvaavat suunnitteluprosesseja konseptista valmiiseen tuotteeseen, käyttävät tarkkoja mittauksia ja teknistä sanastoa kuten liitos, symmetria ja kohtisuora, järjestävät vaiheet peräkkäin siirtymäsanojen avulla ja selittävät, miksi tietyt suunnittelupäätökset tehtiin geometrisen analyysinsä perusteella.' },
        { question: 'Miten huonekalutyölehdet tekevät geometrian käsitteistä konkreettisia ja merkityksellisiä?', answer: 'Jokainen geometrinen käsite yhdistyy esineisiin, joita oppilaat voivat nähdä ja koskettaa. Suorat kulmat näkyvät pöydänkulmissa, yhdensuuntaiset viivat hyllyn tuissa, symmetria tuolisuunnitteluissa ja pinta-ala pulpettipinnoissa. Tämä konkreettinen yhteys muuttaa abstraktin geometrian käytännön tiedoksi, jota oppilaat soveltavat aina katsoessaan ympärillään olevia huonekaluja.' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'Millaisia huonekalutyölehtiä voin luoda?', answer: 'Voit luoda monenlaisia huonekaluaiheisia työlehtiä, mukaan lukien huonejärjestelyn suunnittelutehtäviä, prepositioharjoituksia huonekalukohtauksilla, muotojen tunnistamista huonekaluissa, kokojen vertailua ja järjestämistä, huonekalujen yhdistämistä huoneisiin, varjojen yhdistämistä huonekalusilueteilla, värityssivuja huonetiloista, sananhakuja huonekalusanastolla, kuvioiden tunnistamista huonekalujärjestelyillä ja poikkeavuuspulmia, joissa tunnistetaan sopimaton esine.' },
    { question: 'Ovatko huonekalutyölehdet ilmaisia?', answer: 'Kyllä, LessonCraftStudion avulla voit luoda ja ladata huonekaluaiheisia työlehtiä maksutta. Valitse haluamasi työlehden tyyppi, valitse huonekaluteema, mukauta asetukset kuten vaikeustaso ja kohteiden määrä ja luo tulostettava PDF, joka on valmis luokkahuoneeseen tai kotiopetukseen.' },
    { question: 'Mille ikäryhmille huonekalutyölehdet sopivat?', answer: 'Huonekalutyölehdet on suunniteltu 3-9-vuotiaille lapsille kattaen esikoulun kolmannelle luokalle asti. Nuoremmat lapset työskentelevät yksinkertaisen yhdistämisen, perusprepositioiden ja värityksen parissa, kun taas vanhemmat oppilaat ratkaisevat huonejärjestelyn suunnittelutehtäviä, monivaiheisia sanallisia tehtäviä, monimutkaisia avaruudellisia kuvauksia ja luokittelua kirjallisine perusteluineen.' },
    { question: 'Miten huonekalutyölehdet opettavat avaruudellista hahmottamista?', answer: 'Huonekalujen järjestely on pohjimmiltaan avaruudellinen tehtävä, joka vaatii lapsia ajattelemaan sijainteja, suuntauksia ja esineiden välisiä suhteita tilassa. Prepositiotyölehdet kehittävät avaruudellista sanastoa, huonejärjestelytehtävät rakentavat avaruudellista suunnittelua ja varjojen yhdistäminen kehittää avaruudellista muistia. Nämä yhdistetyt taidot muodostavat perustan geometrialle, mittaamiselle ja matemaattiselle visualisoinnille.' },
    { question: 'Miten huonekalutyölehdet liittyvät geometriaan?', answer: 'Jokainen huonekalu on rakennettu geometrisista muodoista: suorakaiteen muotoiset pöytälevyt, pyöreät kellot, lieriönmuotoiset jalat, neliönmuotoiset laatikot ja kolmionmuotoiset hyllykannattimet. Työlehdet, jotka pyytävät lapsia löytämään, jäljentämään ja nimeämään näitä muotoja, osoittavat, että geometria kuvaa todellista maailmaa tehden abstrakteista muotokäsitteistä konkreettisia, mieleenpainuvia ja välittömästi todennettavissa katsomalla mitä tahansa lähellä olevaa huonekalua.' },
    { question: 'Voivatko huonekalutyölehdet opettaa huoneen järjestämisestä?', answer: 'Kyllä, huonekalutyölehdet opettavat luonnostaan avaruudellista järjestämistä pyytäen lapsia päättämään, mikä huonekalu kuuluu mihinkin huoneeseen ja miten esineet pitäisi järjestää. Tämä rakentaa käytännön elämäntaitoja akateemisen avaruudellisen hahmotuksen rinnalla, kun lapset oppivat, että harkittu järjestys tekee tiloista toimivampia ja mukavampia.' },
    { question: 'Mitä sanastoa lapset oppivat huonekalutyölehdistä?', answer: 'Lapset oppivat huonekalunimiä kuten kirjahylly, vaatekaappi, yöpöytä ja nojatuoli, avaruudellisia termejä kuten yläpuolella, vieressä, välissä ja edessä, muotosanastoa kuten suorakulmio, lieriö ja ympyrä sekä kuvailevia sanoja kuten puinen, pehmustettu, korkea ja leveä. Tämä rikas sanasto tukee sekä akateemista lukemista että arkiviestintää.' },
    { question: 'Miten huonekalutyölehdet eroavat kotitaloustyölehdistä?', answer: 'Huonekalutyölehdet keskittyvät erityisesti yksittäisten huonekalujen suunnitteluun, muotoihin ja avaruudelliseen järjestelyyn painottaen geometriaa, kokojen vertailua ja avaruudellista sanastoa. Kotitaloustyölehdet tarjoavat laajemman näkökulman koko kotiin kattaen huoneiden tunnistamisen, päivittäiset rutiinit, turvallisuuskäsitteet ja esineiden luokittelun kaikilla kotielämän osa-alueilla.' },
    { question: 'Ovatko huonekalutyölehdet hyviä visuaalisille oppijoille?', answer: 'Huonekalutyölehdet ovat erinomaisia visuaalisille oppijoille, koska ne nojaavat vahvasti avaruudelliseen visualisointiin, muotojen tunnistamiseen ja visuaalisiin järjestelytaitoihin. Huonejärjestelyn suunnittelu, varjojen yhdistäminen, ruudukkomatchaus ja kuvioiden tunnistaminen aktivoivat kaikki visuaalista prosessointia tehden huonekaluista yhden vahvimmista teemoista lapsille, jotka oppivat parhaiten avaruudellisten ja visuaalisten kokemusten kautta.' },
    { question: 'Kuinka usein lasten tulisi tehdä huonekalutyölehtiä?', answer: 'Kaksi-kolme tuokiota viikossa toimii hyvin avaruudellisen hahmotuksen ja geometriatietoisuuden rakentamiseen. Kunkin tuokion tulisi kestää kymmenestä kahteenkymmeneen minuuttiin iästä riippuen. Koska huonekalukäsitteitä vahvistetaan jatkuvasti lapsen fyysisessä ympäristössä, jopa lyhyet työlehtihetket tuottavat kestäviä avaruudellisen oppimisen tuloksia, kun ne yhdistetään satunnaisiin keskusteluihin todellisesta huonekalujärjestelystä ja suunnittelusta.' },
  ],

  // -- Cross-linking --
  relatedThemes: ['household', 'shapes', 'construction', 'colors', 'school'],
  relatedBlogCategories: [],

  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, että oppilaat sekoittavat avaruudellisia käsitteitä kuten päällä, alla ja vieressä eivätkä osaa kuvailla esineiden sijaintia huoneessa.',
      solution: 'Hän ottaa käyttöön huonekaluaiheiset työlehdet, joissa oppilaat sijoittavat huonekaluja pohjapiirustukseen, yhdistävät prepositioita huonekalukuviin ja lajittelevat huonekaluja huoneen ja toiminnon mukaan.',
      outcome: 'Kolmen viikon jälkeen oppilaat käyttävät avaruudellista sanastoa sujuvasti arjessa, kuvailevat huonekalujen sijainteja tarkoilla prepositioilla ja tunnistavat geometrisia muotoja huonekaluista.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdistää geometrian, sanaston ja käytännön elämäntaidot lapselle, joka on kiinnostunut rakentamisesta ja suunnittelusta.',
      solution: 'Vanhempi käyttää huonekalutyölehtiä yhdistettynä kodin tutkimiseen: lapsi mittaa huonekaluja, tunnistaa geometrisia muotoja esineistä, suunnittelee huonejärjesteljä ruutupaperille ja kirjoittaa kuvauksia huoneiden sisällöstä.',
      outcome: 'Lapsi ymmärtää geometrian käytännöllisen merkityksen, käyttää avaruudellista sanastoa luontevasti ja osaa suunnitella toimivia tilajärjesteljä huomioiden sekä toimivuuden että estetiikan.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ikähaarukka', value: '3–9 vuotta' },
    { label: 'Työlehtisovellusten määrä', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus–3. lk' },
    { label: 'Keskimääräinen työskentelyaika', value: '10–20 min' },
    { label: 'Huonekalutyyppien kirjo', value: '15+ huonekalua' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota huonejärjestelyn pohjapiirustuksia ja ruutupaperin mittakaavapiirustuksia. Valokuvat todellisista huoneista ja niiden vertailu piirustuksiin auttavat hahmottamaan kolmiulotteisen tilan kaksiulotteisena esityksenä.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Käytä nukkekotia tai luokkahuoneen huonekalunurkkia: oppilaat siirtävät fyysisesti pienioishuonekaluja ennen työlehtitehtävää. Oikeiden huonekalujen mittaaminen viivoittimella yhdistää konkreeettisen kokemuksen paperitehtävään.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Huonekalut ovat universaali aihe — jokaisella lapsella on kokemus tuoleista, pöydistä ja sängyistä. Aloita kuvapohjaisesta huonekalujen tunnistamisesta ja nimeämisestä ja lisää suomenkielisiä prepositioita asteittain. Kuvitetut sanakortit huonekalusanoista tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta mittakaavaisilla suunnittelutehtävillä: laske huonekalupintojen pinta-ala ja piiri, vertaile erilaisten järjestelyjen tilatehokkuutta ja tutki suomalaista muotoiluperinnettä Aallon koivuisista tuoleista moderneihin kestävän kehityksen ratkaisuihin.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Huonejärjestelyn suunnittelukansio',
      criteria: 'Kerää oppilaan huonejärjestelysuunnitelmat koko jakson ajalta. Arvioi avaruudellisen sanaston kehittymistä, geometristen muotojen tunnistamisen tarkkuutta ja kirjallisten kuvausten rikastumista.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Prepositioiden käyttötehtävä',
      criteria: 'Näytä oppilaalle valokuva huoneesta ja pyydä häntä kirjoittamaan viisi lausetta, jotka kuvaavat huonekalujen sijainteja eri prepositioita käyttäen. Arvioi prepositioiden oikeellisuutta, monipuolisuutta ja lauserakenteiden tarkkuutta.',
      gradeLevel: 'Esiopetus–2. lk',
    },
    {
      method: 'Geometristen muotojen tunnistuskoe',
      criteria: 'Pyydä oppilasta tunnistamaan vähintään kahdeksan geometrista muotoa luokkahuoneen huonekaluista ja nimeämään kunkin muodon. Arvioi muotojen tunnistamisen tarkkuutta, geometrisen sanaston käyttöä ja kykyä selittää muodon ominaisuuksia.',
      gradeLevel: '1.–3. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (geometria ja mittaaminen)',
      connection: 'Huonekalut ilmentävät geometrisia muotoja: suorakaiteen muotoiset pöytälevyt, pyöreät kellot, literiönmuotoiset jalat. POPS 2014:n matematiikan tavoitteet muotojen tunnistamisesta ja mittaamisesta toteutuvat luonnollisesti huonekalukontekstissa.',
      activity: 'Huonekalumuotojen tunnistustehtävän jälkeen oppilaat mittaavat luokan huonekaluja viivoittimilla ja laskevat pinta-aloja ja piirejä.',
    },
    {
      subject: 'Äidinkieli ja kirjallisuus',
      connection: 'Huonekalut rikastuttavat avaruudellista sanastoa: prepositiot, kokojen vertailu ja kuvaileva kirjoittaminen kehittyvät luonnollisesti huonetilojen kuvailussa.',
      activity: 'Prepositiotyölehden jälkeen oppilaat kirjoittavat kappaleen, jossa kuvaavat oman huoneensa järjestystä käyttäen vähintään viittä eri prepositiota.',
    },
    {
      subject: 'Käsityö ja muotoilu',
      connection: 'Suomalainen muotoiluperinne tekee huonekaluista kulttuurisesti merkityksellisen aiheen. Huonekalujen suunnitteluperiaatteet — toimivuus, kauneus ja materiaalivalinnat — yhdistävät käsityön ja matemaattisen ajattelun.',
      activity: 'Mittakaavapiirustuksen jälkeen oppilaat suunnittelevat oman huonekalun huomioiden toimivuuden, materiaalit ja geometriset muodot.',
    },
  ],

  uniqueAngle: 'Huonekaluaiheiset työlehdet ovat pedagogisesti poikkeuksellisia, koska ne sijaitsevat avaruudellisen hahmottamisen, geometrian ja toiminnallisen luokittelun risteyskohdassa — ja jokainen lapsi on fyysisessä vuorovaikutuksessa huonekalujen kanssa koko päivän. Tämä jatkuva, konkreettinen yhteys tekee huonekaluista yhden harvoista teemoista, joissa abstraktit matemaattiset käsitteet saavat välittömän merkityksen: suorakaiteen muotoinen pöytälevy, pyöreä kello, lieriönmäinen tuolinjalka. Suomessa huonekalusuunnittelun arvostus on poikkeuksellisen korkealla — Alvar Aalto, Eero Aarnio ja Marimekko ovat osa kansallista identiteettiä. Tämä kulttuurinen merkitys tekee huonekaluteemasta erityisen kiinnostavan suomalaisille lapsille. Avaruudellinen hahmotus on laajalti tunnustettu kriittiseksi ennustajaksi menestyksestä matematiikassa ja luonnontieteissä, ja huonekalujen järjestely on luontaisesti avaruudellista. Prepositioiden harjoittelu huonekalukonteksteissa rakentaa mentaalisia avaruudellisia malleja, jotka tukevat geometriaa, koordinaattijärjestelmiä ja kartanlukua. POPS 2014 korostaa ympäristön havainnointia ja tutkivaa oppimista, ja huonekalutyölehdet tarjoavat tähän ihanteellisen kontekstin.',

  researchCitation: 'Newcombe, N. S. & Frick, A. (2010). Early Education for Spatial Intelligence: Why, What, and How. Mind, Brain, and Education. Tutkimus osoitti, että avaruudellisten taitojen varhainen kehittäminen konkreettisten esineiden — kuten huonekalujen — järjestelyn kautta ennustaa merkittävästi myöhempää matemaattista ja tieteellistä menestystä.',

  culturalNotes: 'Suomessa huonekalumuotoilu on osa kansallista identiteettiä: Alvar Aallon koivuiset tuolit, Artekin huonekalut ja suomalainen minimalistinen suunnittelufilosofia ovat kansainvälisesti tunnettuja. POPS 2014 painottaa ympäristön havainnointia ja tutkivaa oppimista, ja kodin huonekalut tarjoavat lapsille välittömän, päivittäisen kontekstin geometrian ja avaruudellisen hahmotuksen harjoitteluun.',

  snippetDefinition: 'Huonekaluaiheiset työlehdet lapsille ovat tulostettavia oppimistehtäviä, jotka käyttävät tuoleja, pöytiä, sänkyjä, hyllyjä ja muita huonekaluja avaruudellisen hahmotuksen, geometrian ja sanaston opettamiseen. Ne on suunniteltu 3–9-vuotiaille ja sisältävät prepositioharjoituksia, muotojen tunnistamista, huonejärjestelyn suunnittelua ja laskutehtäviä.',

  snippetHowTo: [
    'Valitse työlehdet lapsen kehitystason mukaan: nuoremmille yksinkertaista yhdistämistä ja nimeämistä, vanhemmille mittakaavaisia suunnittelutehtäviä.',
    'Aloita tutustumalla huonekalukuvituksiin ja nimeämällä huonekalut yhdessä lapsen kanssa ennen tehtävän aloittamista.',
    'Yhdistä työlehti kodin tutkimiseen: tehtävän jälkeen kävelkää huoneesta toiseen ja etsikää vastaavia huonekaluja.',
    'Harjoittele prepositioita arkitilanteissa: kysy, missä kaukosäädin on, mihin kirjat kuuluvat ja miksi tietyt huonekalut ovat tietyissä paikoissa.',
    'Lisää geometrian ulottuvuus: pyydä lasta tunnistamaan ympäröitä, suorakulmioita ja kolmioita huonekaluista.',
    'Kierrä lapsen joukossa ja esitä avoimia kysymyksiä kuten Miksi tuolissa on neljä jalkaa tai Minkä muotoinen hylly on.',
    'Kerää valmiit työlehdet kansioon ja vertailkaa avaruudellisen sanaston ja geometrisen tietoisuuden kehittymistä ajan myötä.',
  ],

  limitations: 'Huonekalutyölehdet kuvaavat tyypillisesti länsimaisia huonekalutyyppejä, mikä voi olla rajoittavaa lapsille, joiden kodeissa käytetään eri kulttuurien perinteisiä huonekaluja tai asumismuotoja. Avaruudellisen hahmotuksen tehtävät voivat olla haastavia lapsille, joilla on visuospatiaalisia vaikeuksia — tällöin konkreettinen nukkekotiharjoittelu ennen paperitehtävää auttaa.',

  themeComparisons: [
    {
      vsThemeId: 'household',
      summary: 'Kotitaloustyölehdet kattavat kodin laajasti: rutiinit, turvallisuuden ja huoneiden tunnistamisen. Huonekalutyölehdet keskittyvät yksittäisiin huonekaluihin ja niiden geometriaan, avaruudelliseen järjestelyyn ja muotoiluun.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Muototyölehdet opettavat geometrisia muotoja abstrakteina käsitteinä. Huonekalutyölehdet osoittavat, mistä nämä muodot löytyvät todellisista esineistä tehden geometriasta konkreettista.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Rakennustyölehdet tutkivat rakentamisen prosessia ja materiaaleja. Huonekalutyölehdet keskittyvät valmiiden esineiden käyttöön, järjestelyyn ja suunnitteluun tilassa.',
    },
    {
      vsThemeId: 'colors',
      summary: 'Värityölehdet opettavat värien tunnistamista ja sekoittamista. Huonekalutyölehdet käyttävät värejä osana kokonaisvaltaista tilasuunnittelua, jossa väri on yksi monista suunnitteluelementeistä.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'huonekaluaiheiset väritystehtävät',
      context: 'Huonekaluaiheiset väritystehtävät kehittävät hienomotoriikkaa samalla kun lapset värittävät yksityiskohtaisia huonekuvia ja tunnistavat geometrisia muotoja huonekaluista.',
    },
    {
      appId: 'matching-app',
      anchorText: 'huonekalujen yhdistämispelit',
      context: 'Yhdistämistehtävät kehittävät visuaalista muistia ja erottelutaitoa, kun lapset yhdistävät identtisiä huonekalupareja tai huonekalun sen varjoon.',
    },
    {
      appId: 'word-search',
      anchorText: 'huonekalusanaston sanahaku-työlehdet',
      context: 'Sanahakutehtävät vahvistavat huonekalusanastoa, kun lapset etsivät termejä kuten kirjahylly, vaatekaappi, nojatuoli ja yöpöytä sanaruudukosta.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'huonekalujen lajittelutehtävät',
      context: 'Lajittelutehtävät kehittävät luokittelutaitoja, kun lapset lajittelevat huonekaluja huoneen, toiminnon tai koon mukaan.',
    },
  ],

  expertTips: [
    {
      tip: 'Käytä nukkekotia tai pahvilaatikkohuonetta työlehden rinnalla. Kun lapsi siirtää fyysisesti pienoishuonekaluja ennen paperitehtävää, avaruudellinen ymmärrys siirtyy luontevasti kaksiulotteiseen esitykseen.',
      source: 'Erityisopettaja, avaruudellinen hahmotus',
      gradeRange: 'Esiopetus–1. lk',
    },
    {
      tip: 'Yhdistä huonekalutyölehdet kodin muotoiluprojektiin: oppilaat kuvaavat oman huoneensa, piirtävät pohjapiirustuksen ja suunnittelevat parannuksia. Tämä antaa geometrialle ja avaruudelliselle ajattelulle todellisen merkityksen.',
      source: 'Luokanopettaja, tutkiva oppiminen',
      gradeRange: '1.–3. lk',
    },
    {
      tip: 'Tutustuta oppilaat suomalaiseen muotoiluun huonekalutehtävien kautta: Aallon koivuinen jakkara, Aarnion palloluoli ja Artekin hyllyjärjestelmät tarjoavat innostavia esimerkkejä muotoilun ja geometrian yhteydestä.',
      source: 'Taide- ja käsityöopettaja, suomalainen muotoilu',
      gradeRange: '2.–3. lk',
    },
  ],
};

registerThemeContent('furniture', 'fi', content);
