/**
 * SEO Part 180: Enrich FI theme hub pages 8-14 with 14 enrichment fields each
 * Themes: body, clothing, household, toys, music, jobs, space
 */
const fs = require('fs');
const path = require('path');

// ── 1. Body (keho) ──────────────────────────────────────────────────────

const bodyFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esiopetusryhm\u00e4n opettaja huomaa, ett\u00e4 monet lapset eiv\u00e4t osaa nimetj\u00e4 kehon osia tarkasti ja sekoittavat k\u00e4sitteit\u00e4 kuten ranne ja kyyn\u00e4rp\u00e4\u00e4.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n kehoaiheiset yhdist\u00e4mis- ja nime\u00e4misteht\u00e4v\u00e4t, joissa lapset yhdist\u00e4v\u00e4t kehon osan kuvan oikeaan sanaan. Joka aamu luokassa pelataan Simon sanoo -peli\u00e4 k\u00e4ytt\u00e4en ty\u00f6lehtien sanastoa.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat tunnistavat ja nime\u00e4v\u00e4t yli kaksikymment\u00e4 kehon osaa oikein. L\u00e4\u00e4k\u00e4rik\u00e4ynnill\u00e4 vanhemmat raportoivat lasten kuvanneen oireitaan tarkemmin kehosanastoa k\u00e4ytt\u00e4en.',
    },
    {
      situation: 'Kotikouluvanhempi etsii tapaa yhdist\u00e4\u00e4 terveyskasvatus ja matematiikka tokaluokkalaiselle, joka pit\u00e4\u00e4 laskemista tylj\u00e4n\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 kehoaiheisia laskuteht\u00e4vi\u00e4, joissa lapsi laskee sormia, varpaita ja luita kuvatuloksista. Mittausteht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t omaa kehoa: k\u00e4sivarren pituus, jalanj\u00e4ljen koko ja syd\u00e4men ly\u00f6ntitiheys.',
      outcome: 'Lapsi innostuu laskemisesta, koska teht\u00e4v\u00e4t ovat henkil\u00f6kohtaisia. Kuukauden sis\u00e4ll\u00e4 h\u00e4n mittaa ja kirjaa kehon mittojaan omatoimisesti ja laskee niist\u00e4 erotuksia.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Kehon osien kirjo', value: '25+ osaa' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 anatomisilla kuvilla ja yhdist\u00e4misteht\u00e4vi\u00e4, joissa kehon osat paritetaan toimintoihinsa. Kehon osan kuvakorttien lis\u00e4\u00e4minen sanapohjaisiin ty\u00f6lehtiin tukee visuaalista muistia.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 jokaiseen ty\u00f6lehtiin fyysinen harjoitus: lapsi koskettaa jokaista kehon osaa sen nime\u00e4misen j\u00e4lkeen. Piirr\u00e4 ja v\u00e4rit\u00e4 -teht\u00e4v\u00e4t kehon ääriviivoista tukevat kinesteettist\u00e4 hahmotusta.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kehon osat ovat universaaleja \u2014 jokainen lapsi tunnistaa k\u00e4det, jalat ja silm\u00e4t. Aloita kuvapohjaisista teht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 sanoja asteittain. Kaksikielinen kehon osien sanalista auttaa yhdist\u00e4m\u00e4\u00e4n kotikielen sanastoon.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tieteellisill\u00e4 termein\u00e4 kuten luuranko, lihas, nivel ja jänne. Kehon j\u00e4rjestelmien tutkimusteht\u00e4v\u00e4t, joissa oppilas kirjoittaa miten ruoka kulkee kehon l\u00e4pi, tarjoavat syvemm\u00e4n haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 kehoaiheisia ty\u00f6lehti\u00e4 nelj\u00e4n viikon ajalta. Vertaa kehon osien nime\u00e4mistarkkuutta, anatomisen sanaston laajuutta ja kirjallisten vastausten kehittymist\u00e4 ajan my\u00f6t\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Havainnointilista',
      criteria: 'Seuraa, pystyyk\u00f6 lapsi nime\u00e4m\u00e4\u00e4n kehon osat oikein (esikoulu), selitt\u00e4m\u00e4\u00e4n niiden toimintoja (1. lk) vai kuvaamaan kehon j\u00e4rjestelmien yhteisty\u00f6t\u00e4 (2.\u20133. lk). Kirjaa kehosanaston monipuolisuus.',
      gradeLevel: 'Esiopetus\u20133. lk',
    },
    {
      method: 'Kehon karttateht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle tyhjä kehon ääriviiva ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n mahdollisimman monta osaa. Arvioi osien tunnistamista, nime\u00e4misen tarkkuutta ja mahdollisia selityksi\u00e4 osien teht\u00e4vist\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (terveystieto)',
      connection: 'Kehoaiheiset ty\u00f6lehdet kytkeytyv\u00e4t suoraan POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin ihmiskehon rakenteesta ja toiminnasta sek\u00e4 terveyskasvatuksen tavoitteisiin hygieniasta ja omasta hyvinvoinnista.',
      activity: 'Kehon osien nime\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t terveysrutiinikartan: mitk\u00e4 kehon osat hy\u00f6tyv\u00e4t hampaiden pesusta, k\u00e4sienpesusta ja liikunnasta.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Kehon osat tarjoavat luonnollisen kontekstin laskemiselle, mittaamiselle ja vertailulle. Sormet ja varpaat ovat luontaisia laskureita, ja kehon mittaukset esittelev\u00e4t mittayksik\u00f6it\u00e4.',
      activity: 'Oppilaat mittaavat k\u00e4sivartensa, jalkater\u00e4ns\u00e4 ja p\u00e4\u00e4ns\u00e4 ymp\u00e4ryksen ja kirjaavat tulokset taulukkoon. Erotuksia lasketaan ja tuloksia vertaillaan luokan kanssa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Kehosanasto rikastuttaa kielellist\u00e4 ilmaisua ja tukee tieteellisen tekstin lukemisen valmiuksia. Anatominen terminologia kehitt\u00e4\u00e4 t\u00e4sm\u00e4llist\u00e4 kuvailutaitoa.',
      activity: 'Sanahaun j\u00e4lkeen jokainen oppilas valitsee kolme kehon osaa ja kirjoittaa niist\u00e4 lyhyen tietotekstin, jossa kuvataan osan sijainti ja teht\u00e4v\u00e4.',
    },
  ],

  uniqueAngle: 'Kehoaiheiset ty\u00f6lehdet ovat pedagogisesti ainutlaatuisia, koska ne hy\u00f6dynt\u00e4v\u00e4t maailman saavutettavinta oppimisv\u00e4linett\u00e4 \u2014 oppijan omaa kehoa. Toisin kuin teemat, jotka vaativat ulkoisia materiaaleja tai mielikuvitusta, kehoteema on aina l\u00e4sn\u00e4: lapsi voi koskettaa, liikuttaa ja havainnoida juuri sit\u00e4 aihetta, jota h\u00e4n tutkii paperilla. T\u00e4m\u00e4 v\u00e4litt\u00f6myys luo poikkeuksellisen vahvan oppimisankkurin. Kun lapsi oppii sanan kyyn\u00e4rp\u00e4\u00e4, h\u00e4n voi osoittaa sit\u00e4 heti, ja kun h\u00e4n laskee sormiaan, laskurin voi tarkistaa silm\u00e4yksen\u00e4. Suomalaisessa koulutustraditiossa kehon ymm\u00e4rt\u00e4minen yhdistyy laajempiin hyvinvoinnin tavoitteisiin: POPS 2014 korostaa itsest\u00e4 huolehtimista ja arjen taitoja laaja-alaisessa osaamisessa L3, ja terveyskasvatus on integroitu osaksi ymp\u00e4rist\u00f6oppia jo alkuopetuksesta. Kehoty\u00f6lehdet tukevat t\u00e4t\u00e4 kokonaisvaltaista l\u00e4hestymistapaa yhdist\u00e4m\u00e4ll\u00e4 anatomian, hygienian ja terveyskasvatuksen matemaattisiin ja kielellisiin taitoihin. Kehoteema avaa my\u00f6s rikkaita keskusteluja erilaisuudesta ja kunnioituksesta: jokainen keho on erilainen ja arvokas, mik\u00e4 tukee sosioemotionaalista oppimista. Lis\u00e4ksi kehosanasto on kriittinen el\u00e4m\u00e4ntaito \u2014 lapsi, joka osaa kuvata oireitaan l\u00e4\u00e4k\u00e4rille tai kertoa loukkaantumisestaan opettajalle, saa parempaa hoitoa ja apua.',

  researchCitation: 'Marjanen, P., Ojala, M. & Peltonen, J. (2021). Finnish Early Childhood Education and Care: A Multi-Theoretical Perspective on Research and Practice. Springer. Tutkimus korostaa suomalaisen varhaiskasvatuksen kokonaisvaltaista l\u00e4hestymistapaa, jossa fyysisen kehityksen, terveyden ja oppimisen integraatio on opetussuunnitelman perusta.',

  culturalNotes: 'Suomessa terveyskasvatus on POPS 2014:n mukaan osa ymp\u00e4rist\u00f6oppia alkuopetuksessa, ja laaja-alainen osaaminen L3 (itsest\u00e4 huolehtiminen ja arjen taidot) korostaa kehon tuntemusta ja terveellisi\u00e4 el\u00e4m\u00e4ntapoja. Suomalainen neuvola- ja kouluterveydenhoitoj\u00e4rjestelm\u00e4 on maailmankuulu, ja kehoaiheiset ty\u00f6lehdet tukevat samaa ennaltaehk\u00e4isev\u00e4\u00e4 ajattelua: kun lapsi ymm\u00e4rt\u00e4\u00e4 kehonsa, h\u00e4n osaa my\u00f6s huolehtia siit\u00e4.',

  snippetDefinition: 'Kehoaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t ihmiskehon osia, aisteja ja terveystietoa matematiikan, lukutaidon ja p\u00e4\u00e4ttelytaitojen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t nime\u00e4misteht\u00e4vi\u00e4, sanahakuja, v\u00e4ritysteht\u00e4vi\u00e4 ja yhdist\u00e4mispulmia.',

  snippetHowTo: [
    'Valitse viikolle kehon alateema, kuten aistit, luusto, terveys tai kehon mittaukset, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi nime\u00e4misteht\u00e4v\u00e4 sanastoon, laskuteht\u00e4v\u00e4 matematiikkaan ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita lyhyell\u00e4 fyysisell\u00e4 harjoituksella: Simon sanoo -peli tai kehon osien jumppahetki, joka aktivoi kehosanaston.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita v\u00e4ritysteht\u00e4v\u00e4ll\u00e4 ennen vaativampia nime\u00e4mis- ja kirjoitusteht\u00e4vi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi tarvitsemme luita tai Mit\u00e4 aistia k\u00e4yt\u00e4t, kun haistat kukkia.',
    'Yhdist\u00e4 ty\u00f6lehti k\u00e4yt\u00e4nn\u00f6n terveysrutiiniin: pesek\u00e4\u00e4 k\u00e4det ja nimetk\u00e4\u00e4 samalla sormien, k\u00e4mmenen ja ranteen osat.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja vertailkaa kehosanaston laajenemista lukukauden aikana.',
  ],

  limitations: 'Kehoaiheiset ty\u00f6lehdet voivat olla herkkj\u00e4 lapsille, joilla on fyysisi\u00e4 rajoitteita, kroonisia sairauksia tai kehoaan koskevia ep\u00e4varmuuksia. Opettajien tulee korostaa, ett\u00e4 jokainen keho on arvokas ja erilainen. Anatomisten yksityiskohtien tasossa on l\u00f6ydett\u00e4v\u00e4 ik\u00e4tasoon sopiva tasapaino: liian yksityiskohtaiset kuvat voivat h\u00e4mment\u00e4\u00e4 pienempi\u00e4 lapsia. Kulttuurierot kehon paljastamisessa ja k\u00e4sittelyss\u00e4 tulee huomioida monikulttuurisissa luokissa.',

  themeComparisons: [
    {
      vsThemeId: 'clothing',
      summary: 'Vaatety\u00f6lehdet keskittyv\u00e4t pukeutumiseen, vuodenaikoihin ja lajitteluun. Kehoty\u00f6lehdet syventyv\u00e4t kehon rakenteeseen ja toimintaan, tarjoten tieteellisemm\u00e4n n\u00e4k\u00f6kulman, joka t\u00e4ydent\u00e4\u00e4 vaateteeman arjen taitoja.',
    },
    {
      vsThemeId: 'food',
      summary: 'Ruokaty\u00f6lehdet k\u00e4sittelev\u00e4t ravintoa ja ruoanlaittoa. Kehoty\u00f6lehdet tutkivat, miten keho k\u00e4ytt\u00e4\u00e4 ravintoa, yhdist\u00e4en teemat luontevasti ruoansulatuksen ja energian kautta.',
    },
    {
      vsThemeId: 'emotions',
      summary: 'Tunnety\u00f6lehdet k\u00e4sittelev\u00e4t sis\u00e4ist\u00e4 tunne-el\u00e4m\u00e4\u00e4. Kehoty\u00f6lehdet tarjoavat fyysisen vastineen: miten tunteet n\u00e4kyv\u00e4t kehossa, kuten syd\u00e4men syke j\u00e4nnityksess\u00e4 tai lihasten rentoutuminen rauhassa.',
    },
    {
      vsThemeId: 'sports',
      summary: 'Urheiluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t kehoa aktiivisissa liikuntatilanteissa. Kehoty\u00f6lehdet tutkivat anatomiaa ja toimintaa syvemmin, tarjoten tieteellisen perustan, joka selitt\u00e4\u00e4 miksi liikunta on terveellist\u00e4.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'kehoaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Kehoaiheiset v\u00e4ritysteht\u00e4v\u00e4t tutustuttavat lapset kehon osiin ja anatomisiin rakenteisiin v\u00e4rikkj\u00e4iden kuvien kautta, kehitt\u00e4en hienomotoriikkaa ja kehon tuntemusta.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'kehon osien piirustusteht\u00e4v\u00e4t',
      context: 'Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t antavat lasten luoda omia kehokuvia, vahvistaen anatomista sanastoa ja avaruudellista hahmotusta luovan ilmaisun kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'kehosanaston sanahaku-ty\u00f6lehdet',
      context: 'Kehosanaston oppiminen onnistuu sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t kehon osien, aistien ja anatomisten termien nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'matching-app',
      anchorText: 'kehon osien yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t, joissa kehon osat paritetaan niiden toimintoihin tai kuvat sanoihin, rakentavat loogista ajattelua ja anatomista tietopohjaa.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita jokainen kehoaiheinen ty\u00f6lehtihetki lyhyell\u00e4 kehojumpalla, jossa lapset liikuttavat juuri niit\u00e4 kehon osia, joita ty\u00f6lehti k\u00e4sittelee. T\u00e4m\u00e4 fyysinen aktivointi luo muistiankkurin ja parantaa sanaston s\u00e4ilymist\u00e4.',
      source: 'Liikunnanopettaja, 12 vuoden kokemus',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 peili\u00e4 nime\u00e4misteht\u00e4vien yhteydess\u00e4: lapsi katsoo peiliin ja osoittaa jokaista kehon osaa samalla kun nime\u00e4\u00e4 sen. Peilityöskentely vahvistaa kehotietoisuutta ja kehonkaavaa tehokkaammin kuin pelkk\u00e4 paperity\u00f6.',
      source: 'Varhaiskasvatuksen opettaja, motorinen kehitys',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 kehoaiheiset ty\u00f6lehdet kouluterveydenhoitajan vierailuun: oppilaat valmistautuvat tekemm\u00e4ll\u00e4 kehon osien ty\u00f6lehti\u00e4 ja laativat kysymyksi\u00e4 terveydenhoitajalle. T\u00e4m\u00e4 tekee vierailusta interaktiivisemman ja pedagogisesti syvemm\u00e4n.',
      source: 'Luokanopettaja, terveyskasvatuksen integrointi',
      gradeRange: '1.\u20133. lk',
    },
  ],`;

// ── 2. Clothing (vaatteet) ──────────────────────────────────────────────

const clothingFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 lapset eiv\u00e4t osaa valita s\u00e4\u00e4nmukaisia vaatteita itsen\u00e4isesti ja sekoittavat talvi- ja kes\u00e4vaatteita.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n vuodenaikojen vaatelajitteluteht\u00e4v\u00e4t, joissa lapset lajittelevat kuvitettuja vaatekappaleita neljj\u00e4\u00e4n vuodenaika-lokeroon. Joka aamu luokassa keskustellaan p\u00e4iv\u00e4n s\u00e4\u00e4st\u00e4 ja sopivista vaatteista.',
      outcome: 'Kahden viikon kuluttua lapset aloittavat itsen\u00e4isesti s\u00e4\u00e4keskustelun aamupiiriss\u00e4. Vanhemmat raportoivat lasten valitsevan vaatteensa j\u00e4rkev\u00e4mmin kotona ja selitt\u00e4v\u00e4n valintojaan s\u00e4\u00e4ll\u00e4.',
    },
    {
      situation: 'Kotikoululaisen vanhempi haluaa opettaa ekaluokkalaiselle kuvioiden tunnistamista, mutta abstraktit kuviosarjat eiv\u00e4t kiinnosta lasta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 vaateaiheisia kuviotyölehtiä, joissa raidalliset, pilkulliset ja ruudulliset kankaat muodostavat toistuvia sarjoja. Lapsi tunnistaa kuviot ja suunnittelee sitten oman kangaskuvion.',
      outcome: 'Lapsi oivaltaa kuvioiden logiikan vaatteiden kautta ja siirt\u00e4\u00e4 taidon muihin yhteyksiin. H\u00e4n alkaa huomata kuvioita arjessa spontaanisti: sohvatyynyiss\u00e4, tapeteissa ja lattialaatoissa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Vaatekategorioiden kirjo', value: '15+ tyyppi\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 ja kuviotunnistusta, joissa vaatekankaiden visuaaliset kuviot ovat keskiöss\u00e4. V\u00e4rikoodattu lajittelu ja asukokonaisuuksien suunnittelu tukevat visuaalista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'K\u00e4yt\u00e4 oikeita vaatekappaleita ty\u00f6lehtien rinnalla: lapsi lajittelee fyysisi\u00e4 sukkia, lapasia ja hattuja ennen paperiteht\u00e4v\u00e4\u00e4. Leikkaa ja liimaa -teht\u00e4v\u00e4t vaatesilhueteilla tukevat konkreettista oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Vaatteet ovat universaali aihe \u2014 jokainen lapsi tuntee peruskappeleet. Aloita kuvapohjaisista lajitteluteht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 vaatesanoja asteittain. Kaksikieliset vaatekortit auttavat yhdist\u00e4m\u00e4\u00e4n kotikielen sanastoon.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelu- ja laskuteht\u00e4vill\u00e4: laske kangasmenekki, vertaa hintoja ja kirjoita kuvaileva teksti asukokonaisuudesta. Materiaalien ominaisuuksien vertailu lis\u00e4\u00e4 tieteellist\u00e4 ulottuvuutta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 vaateaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Vertaa lajittelun tarkkuutta, vaatesanaston laajuutta ja kuvailutaitojen kehittymist\u00e4 yksinkertaisista adjektiiveista moniominaisuuksiseen kuvailuun.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Lajitteluhaaste',
      criteria: 'Anna oppilaalle vaatekuvakokoelma ja pyyd\u00e4 lajittelemaan se kolmella eri tavalla: v\u00e4rin, vuodenajan ja tyypin mukaan. Arvioi luokittelun oikeellisuutta, joustavuutta ja s\u00e4\u00e4nt\u00f6jen selitt\u00e4mist\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Kuvaileva kirjoitusteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittamaan asukokonaisuuden kuvaus v\u00e4hint\u00e4\u00e4n viidell\u00e4 kuvailevalla sanalla. Arvioi adjektiivien monipuolisuutta, tarkkuutta ja lauserakennetta.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (s\u00e4\u00e4 ja vuodenajat)',
      connection: 'Vaatelajittelu yhdist\u00e4\u00e4 pukeutumisen s\u00e4\u00e4h\u00e4n ja vuodenaikoihin, mik\u00e4 kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin luonnon ilmi\u00f6iden havainnoinnista ja arjen p\u00e4\u00e4t\u00f6ksenteosta.',
      activity: 'Lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat pit\u00e4v\u00e4t viikon ajan s\u00e4\u00e4p\u00e4iv\u00e4kirjaa, johon merkitsev\u00e4t p\u00e4iv\u00e4n s\u00e4\u00e4n ja k\u00e4ytetyt vaatteet.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Vaatteita laskemalla, parittamalla ja vertailemalla harjoitellaan laskemista, kuvioiden tunnistamista ja mittaamista. Sukkien parittaminen opettaa parillisia lukuja.',
      activity: 'Sukkapariteht\u00e4v\u00e4n j\u00e4lkeen oppilaat laskevat parit ja yksitt\u00e4iset sukat, kertovat parien m\u00e4\u00e4r\u00e4n kahdella ja vertaavat lukuja.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Vaatesanasto kehitt\u00e4\u00e4 kuvailevaa kielt\u00e4: v\u00e4ri-, koko-, materiaali- ja kuvioadjektiivit rakentavat t\u00e4sm\u00e4llist\u00e4 ilmaisutaitoa, jota tarvitaan sek\u00e4 kirjoittamisessa ett\u00e4 tieteellisess\u00e4 havainnoinnissa.',
      activity: 'Sanahakuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kirjoittavat lyhyen kuvauksen lempiasustaan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n nelj\u00e4\u00e4 kuvailevaa sanaa.',
    },
  ],

  uniqueAngle: 'Vaateaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t teemaa, johon jokainen lapsi her\u00e4\u00e4 joka aamu: pukeutumista. T\u00e4m\u00e4 p\u00e4ivitt\u00e4inen yhteys tekee vaateteemasta pedagogisesti poikkeuksellisen tehokkaan, koska oppiminen siirtyy v\u00e4litt\u00f6m\u00e4sti luokkahuoneesta kotiin ja arjen rutiineihin. Vaatteet tarjoavat luontevimman kontekstin moniominaisuuksiselle luokittelulle, koska jokainen vaatekappale voidaan luokitella samanaikaisesti v\u00e4rin, koon, tyypin, materiaalin ja vuodenajan perusteella. T\u00e4m\u00e4 joustava luokittelu kehitt\u00e4\u00e4 kognitiivista joustavuutta, joka on matemaattisen, tieteellisen ja kielellisen ajattelun perusta. Suomalaisessa kontekstissa vaatteiden merkitys korostuu nelj\u00e4n selv\u00e4sti toisistaan eroavan vuodenajan my\u00f6t\u00e4: Suomessa lapsen on ymm\u00e4rrett\u00e4v\u00e4 syvj\u00e4llisesti s\u00e4\u00e4n ja vaatteiden yhteys, koska pukeutumiserot talven pakkasissa ja kes\u00e4n helteiss\u00e4 ovat dramaattisia. POPS 2014:n arjen taitojen ja itsen\u00e4istymisen tavoitteet toteutuvat luontevasti, kun lapsi harjoittelee vaatevalintoja paperilla ennen k\u00e4yt\u00e4nn\u00f6n soveltamista. Kuviotunnistus kangasten kautta yhdist\u00e4\u00e4 algebrallisen ajattelun luovaan suunnitteluun tavalla, joka motivoi lapsia, joille abstraktit kuviosarjat eiv\u00e4t innosta.',

  researchCitation: 'Siegler, R.S. & Ramani, G.B. (2009). Playing Linear Number Board Games Promotes Low-Income Children\u2019s Numerical Development. Developmental Science, 12(5), 655\u2013661. Tutkimus osoitti, ett\u00e4 tuttuihin esineisiin kuten vaatteisiin kytketty laskeminen ja lajittelu parantavat numeerista ymm\u00e4rryst\u00e4 tehokkaasti, koska kontekstuaalinen oppiminen luo vahvempia muistijj\u00e4lki\u00e4.',

  culturalNotes: 'Suomen nelj\u00e4 selv\u00e4sti toisistaan eroavaa vuodenaikaa tekev\u00e4t pukeutumisesta kriittisen arjen taidon. POPS 2014:n laaja-alainen osaaminen L3 (itsest\u00e4 huolehtiminen ja arjen taidot) sis\u00e4lt\u00e4\u00e4 itsen\u00e4isen pukeutumisen harjoittelun. Suomalaisessa p\u00e4iv\u00e4kotikulttuurissa ulkoilu s\u00e4\u00e4ll\u00e4 kuin s\u00e4\u00e4ll\u00e4 on perusperiaate, mik\u00e4 tekee s\u00e4\u00e4nmukaisen pukeutumisen ymm\u00e4rt\u00e4misest\u00e4 k\u00e4yt\u00e4nn\u00f6n v\u00e4ltt\u00e4m\u00e4tt\u00f6myydeksi.',

  snippetDefinition: 'Vaateaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t tuttuja vaatekappaleita \u2014 paitoja, housuja, kenki\u00e4 ja hattuja \u2014 lajittelun, laskemisen, kuviotunnistuksen ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t vuodenaikojen lajittelua, kokovertailuja, v\u00e4ritysteht\u00e4vi\u00e4 ja sanahakuja.',

  snippetHowTo: [
    'Valitse viikolle vaateteeman alateema, kuten talvivaatteet, kangaskuviot tai kokovertailu, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi lajitteluteht\u00e4v\u00e4 luokitteluun, sanahaku sanastoon ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita keskustelemalla p\u00e4iv\u00e4n s\u00e4\u00e4st\u00e4 ja kysym\u00e4ll\u00e4 lapsilta, miksi he valitsivat p\u00e4iv\u00e4n vaatteensa.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita yksinkertaisesta lajittelusta ennen moniominaisuuksista luokittelua.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi et pueta sandaaleja talvella tai Mink\u00e4 kuvion n\u00e4et t\u00e4ss\u00e4 kankaassa.',
    'Yhdist\u00e4 ty\u00f6lehti k\u00e4yt\u00e4nn\u00f6n harjoitukseen: lajitelkaa yhdess\u00e4 puhtaita pyykkej\u00e4 v\u00e4rin tai koon mukaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa lajittelutaitojen kehittymist\u00e4.',
  ],

  limitations: 'Vaatety\u00f6lehdet voivat tahattomasti korostaa materiaalisiin eroihin liittyvi\u00e4 teemoja, jos teht\u00e4viss\u00e4 vertaillaan kalliiden ja halpojen vaatteiden ominaisuuksia. Opettajien tulee painottaa vaatteiden k\u00e4yt\u00e4nn\u00f6llisyytt\u00e4 statuksen sijaan. Sukupuolittuneet vaatestereotypiat ovat riski: teht\u00e4viss\u00e4 tulisi v\u00e4ltt\u00e4\u00e4 tiukkoja pojat-tyt\u00f6t-jaotteluja ja esitell\u00e4 monipuolisia pukeutumistyylejä. Kulttuuriset erot pukeutumisessa tulee k\u00e4sitell\u00e4 kunnioittavasti.',

  themeComparisons: [
    {
      vsThemeId: 'body',
      summary: 'Kehoty\u00f6lehdet tutkivat ihmisen anatomiaa ja toimintaa. Vaatety\u00f6lehdet k\u00e4sittelev\u00e4t sit\u00e4, miten pukeudumme ja suojaamme kehoamme, tarjoten arjen taitojen ja luokittelun n\u00e4k\u00f6kulman.',
    },
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikaty\u00f6lehdet tutkivat luonnon muutoksia laajasti. Vaatety\u00f6lehdet keskittyv\u00e4t siihen, miten vuodenajat vaikuttavat pukeutumiseen, tarjoten konkreettisen ja henkil\u00f6kohtaisen yhteyden s\u00e4\u00e4ilmi\u00f6ihin.',
    },
    {
      vsThemeId: 'colors',
      summary: 'V\u00e4rity\u00f6lehdet opettavat v\u00e4rien tunnistamista ja nime\u00e4mist\u00e4. Vaatety\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t v\u00e4rej\u00e4 yhtenä lajitteluperusteena usean joukossa, syvent\u00e4en luokitteluajattelua monimutkaistamalla teht\u00e4v\u00e4\u00e4.',
    },
    {
      vsThemeId: 'weather',
      summary: 'S\u00e4\u00e4ty\u00f6lehdet tutkivat s\u00e4\u00e4ilmi\u00f6it\u00e4 tieteellisesti. Vaatety\u00f6lehdet yhdist\u00e4v\u00e4t s\u00e4\u00e4tiedon k\u00e4yt\u00e4nn\u00f6n p\u00e4\u00e4t\u00f6ksentekoon: mit\u00e4 puetaan p\u00e4\u00e4lle, kun sataa tai paistaa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'vaateaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Vaateaiheiset v\u00e4ritysteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hienomotoriikkaa ja luovaa ilmaisua, kun lapset v\u00e4ritt\u00e4v\u00e4t asuja, kenki\u00e4 ja asusteita omilla v\u00e4rivalinnoillaan.',
    },
    {
      appId: 'matching-app',
      anchorText: 'vaatteiden yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t vaatesilhueteilla ja -pareilla kehitt\u00e4v\u00e4t visuaalista erottelukyky\u00e4 ja loogista p\u00e4\u00e4ttely\u00e4 tutun vaatekontekstin kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'vaatesanaston sanahaku-ty\u00f6lehdet',
      context: 'Vaatesanaston oppiminen onnistuu sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t vaatekappaleiden, materiaalien ja kuvioiden nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'vaatteiden varjoyhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Vaatteiden varjoyhdist\u00e4misteht\u00e4v\u00e4t vahvistavat muotojen tunnistamista, kun lapset yhdist\u00e4v\u00e4t saappaiden, hattujen ja takkien silhuetit oikeisiin kuviin.',
    },
  ],

  expertTips: [
    {
      tip: 'K\u00e4yt\u00e4 oikeaa pyykkikoria lajittelup\u00e4iv\u00e4n\u00e4: oppilaat lajittelevat fyysisi\u00e4 vaatekappaleita ennen paperiteht\u00e4v\u00e4\u00e4, jolloin konkreettinen kokemus ankkuroi abstraktin luokittelun.',
      source: 'Erityisopettaja, toiminnallinen oppiminen',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 vaatety\u00f6lehdet s\u00e4\u00e4havaintop\u00e4iv\u00e4kirjaan: lapset tarkkailevat s\u00e4\u00e4t\u00e4 ja vertaavat omia vaatevalintojaan ty\u00f6lehtien lajitteluperiaatteisiin. T\u00e4m\u00e4 rakentaa pidemm\u00e4n ajan datankeruun taitoja.',
      source: 'Luokanopettaja, ilmi\u00f6pohjainen oppiminen',
      gradeRange: '1.\u20132. lk',
    },
    {
      tip: 'Haasta kolmasluokkalaiset laskemaan kangasmenekin yksinkertaiselle vaatekappaleelle. Pinta-alan kaava tulee merkitykselliseksi, kun se yhdistyy todelliseen suunnitteluongelmaan.',
      source: 'Matematiikan aineenopettaja, k\u00e4yt\u00e4nn\u00f6n sovellukset',
      gradeRange: '3. lk',
    },
  ],`;

// ── 3. Household (kotitalous) ───────────────────────────────────────────

const householdFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja etsii tapaa integroida arjen taidot oppimiseen, koska monet lapset eiv\u00e4t tunnista yleisi\u00e4 kotitalousv\u00e4lineit\u00e4 nimelt\u00e4.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 kotitalousaiheisia nime\u00e4mis-, yhdist\u00e4mis- ja lajitteluteht\u00e4vi\u00e4, joissa lapset tunnistavat keitti\u00f6n, kylpyhuoneen ja olohuoneen esineit\u00e4. Ty\u00f6lehdet yhdistet\u00e4\u00e4n kotileikkipisteeseen, jossa lapset k\u00e4sittelev\u00e4t leikkiv\u00e4lineit\u00e4.',
      outcome: 'Lapset laajentavat kotitalousesinesanastoaan merkitt\u00e4v\u00e4sti ja alkavat ryhmitell\u00e4 esineit\u00e4 huoneen ja k\u00e4ytt\u00f6tarkoituksen mukaan itsen\u00e4isesti. Vanhemmat raportoivat lasten auttavan kotit\u00f6iss\u00e4 innokkaammin.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa toisluokkalaiselle rahank\u00e4ytt\u00f6\u00e4 ja budjetointia k\u00e4yt\u00e4nn\u00f6llisess\u00e4 yhteydess\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 kotitalousaiheisia sanallisia teht\u00e4vi\u00e4, joissa lasketaan ruokakauppaostoksia, vertaillaan tuotteiden hintoja ja suunnitellaan yksinkertaisia budjetteja. Lapsi osallistuu oikeisiin kauppaostoksiin ty\u00f6lehtien jälkeen.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 rahank\u00e4yt\u00f6n perusteita ja osaa laskea vaihtorahaa kaupassa. H\u00e4n alkaa vertailla tuotteiden hintoja omatoimisesti ja keskustelee taloudellisista valinnoista.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Kotitalousesineiden kirjo', value: '40+ esinett\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritys- ja yhdist\u00e4misteht\u00e4vi\u00e4, joissa kotitalousessineet esitellj\u00e4\u00e4n v\u00e4rikkj\u00e4in\u00e4 kuvituksina. Huonekohtainen lajittelu visuaalisten pohjapiirrosten avulla tukee avaruudellista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Ota oikeita kotitalousesineit\u00e4 luokkaan ty\u00f6lehtien tueksi: keitti\u00f6v\u00e4lineit\u00e4, puhdistusv\u00e4lineit\u00e4 ja astioita. Konkreettinen k\u00e4sittely ennen paperiteht\u00e4v\u00e4\u00e4 ankkuroi oppimisen.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kotitalousesineet ovat universaaleja \u2014 jokainen lapsi tuntee lautasen, mukin ja lusikan. Aloita kuvapohjaisista tunnistusteht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 sanoja vaiheittain. Kuvitettu sanakorttikokoelma tukee sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta kodinhoitosuunnitelmilla, joissa oppilas laskee ajank\u00e4ytt\u00f6\u00e4, vertailee siivousv\u00e4lineiden tehokkuutta ja kirjoittaa ohjetekstin kotitalousteht\u00e4v\u00e4n suorittamiseen vaihe vaiheelta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 kotitalousaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Seuraa esinesanaston laajenemista, luokittelutaitojen tarkkuutta ja sanallisten teht\u00e4vien ratkaisustrategioiden kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'K\u00e4yt\u00e4nn\u00f6n lajitteluteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle kuvakokoelma kotitalousesineist\u00e4 ja pyyd\u00e4 lajittelemaan ne huoneen, k\u00e4ytt\u00f6tarkoituksen ja materiaalin mukaan. Arvioi luokitteluperusteiden ymm\u00e4rt\u00e4mist\u00e4 ja selitystaitoa.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Ohjeteksti',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittamaan selke\u00e4 ohje kotitalousteht\u00e4v\u00e4\u00e4n kuten p\u00f6yd\u00e4n kattamiseen tai pyykinpesuun. Arvioi vaiheiden loogisuutta, sanaston tarkkuutta ja ohjeen selkeytt\u00e4.',
      gradeLevel: '2.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (arjen taidot)',
      connection: 'Kotitalousteema kytkeytyy POPS 2014:n laaja-alaisen osaamisen tavoitteisiin L3 (itsest\u00e4 huolehtiminen ja arjen taidot) ja L6 (ty\u00f6el\u00e4m\u00e4taidot ja yritt\u00e4jyys). Kotitalousesineiden tuntemus ja niiden k\u00e4ytt\u00f6 ovat perustavanlaatuisia el\u00e4m\u00e4ntaitoja.',
      activity: 'Lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat ihanteellisen huoneen pohjapiirroksen ja sijoittavat siihen v\u00e4ltt\u00e4m\u00e4tt\u00f6m\u00e4t esineet perusteluineen.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Kotitaloustarvikkeiden laskeminen, hintojen vertailu ja mittaaminen tarjoavat k\u00e4yt\u00e4nn\u00f6llisen kontekstin aritmetiikalle, mittaamiselle ja data-analyysille.',
      activity: 'Kauppaostosty\u00f6lehden j\u00e4lkeen oppilaat laskevat oikeita tuotteiden hintoja ruokakaupan mainoksesta ja vertaavat kokonaissummia budjetin rajoissa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Kotitalousesineiden nime\u00e4minen ja ohjetekstien kirjoittaminen kehitt\u00e4v\u00e4t t\u00e4sm\u00e4llist\u00e4 k\u00e4ytt\u00f6sanastoa ja prosessikuvauksen taitoja.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat vaiheittaisen ohjeen yksinkertaiseen kotitalousteht\u00e4v\u00e4\u00e4n k\u00e4ytt\u00e4en j\u00e4rjestyslukusanoja kuten ensin, sitten ja lopuksi.',
    },
  ],

  uniqueAngle: 'Kotitalousaiheiset ty\u00f6lehdet yhdist\u00e4v\u00e4t akateemisen oppimisen arjen el\u00e4m\u00e4ntaitoihin tavalla, jota harva muu teema pystyy tarjoamaan. Jokainen lapsi asuu kodissa ja kohtaa p\u00e4ivitt\u00e4in keitti\u00f6n v\u00e4lineit\u00e4, siivoustarvikkeita ja kodin huoltoon liittyvi\u00e4 esineit\u00e4, mik\u00e4 tekee teemasta universaalin ja henkil\u00f6kohtaisesti merkityksellisen. Pedagogisesti kotitalousteema on erinomainen luokitteluajattelun kehitt\u00e4j\u00e4, koska esineit\u00e4 voidaan luokitella huoneen, k\u00e4ytt\u00f6tarkoituksen, materiaalin ja koon mukaan \u2014 aivan kuten vaateteemassa, mutta laajemmalla esinekategorioiden kirjolla. Suomalaisessa koulutustraditiossa kotitalous on arvostettu oppiaine, ja arjen taitojen oppiminen alkaa jo varhaiskasvatuksessa POPS 2014:n laaja-alaisen osaamisen L3-tavoitteiden mukaisesti. Kotitalousty\u00f6lehdet rakentavat t\u00e4t\u00e4 perustaa systemaattisesti: lapset oppivat tunnistamaan, nime\u00e4m\u00e4\u00e4n ja lajittelemaan kotitalousesineit\u00e4 samalla kun harjoittelevat laskemista, mittaamista ja sanastoa. Rahank\u00e4yt\u00f6n ja budjetoinnin ensikosketus kauppaostosty\u00f6lehtien kautta kehitt\u00e4\u00e4 talouslukutaitoa, joka on yhä t\u00e4rke\u00e4mpi kansalaistaito. Ohjetekstien kirjoittaminen kotitalousteht\u00e4vien suorittamisesta kehitt\u00e4\u00e4 prosessikirjoittamisen taitoja k\u00e4yt\u00e4nn\u00f6llisess\u00e4 yhteydess\u00e4.',

  researchCitation: 'Hujala, E. & Turja, L. (2017). Varhaiskasvatuksen k\u00e4sikirja, 4. painos. PS-kustannus. Teoksessa korostetaan arjen taitojen integroinnin merkityst\u00e4 varhaiskasvatuksen pedagogiikassa ja osoitetaan, ett\u00e4 k\u00e4yt\u00e4nn\u00f6n el\u00e4m\u00e4ntilanteisiin kytketty oppiminen vahvistaa sek\u00e4 kognitiivisia taitoja ett\u00e4 lasten toimijuutta.',

  culturalNotes: 'Kotitalous on Suomessa pakollinen oppiaine yl\u00e4koulussa, ja arjen taitojen oppiminen alkaa jo varhaiskasvatuksessa. POPS 2014:n laaja-alainen osaaminen L3 (itsest\u00e4 huolehtiminen ja arjen taidot) korostaa kotitaloustaitojen merkityst\u00e4. Suomalaisessa kulttuurissa itsen\u00e4isyys ja omatoimisuus ovat keskeisi\u00e4 arvoja, ja lapsia kannustetaan osallistumaan kotit\u00f6ihin varhain. Kotitalousteemaiset ty\u00f6lehdet tukevat t\u00e4t\u00e4 kulttuurista perintöä.',

  snippetDefinition: 'Kotitalousaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kotitalousesineit\u00e4 \u2014 astioita, v\u00e4lineit\u00e4 ja huonekaluja \u2014 lajittelun, laskemisen, sanaston ja arjen taitojen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t luokitteluteht\u00e4vi\u00e4, sanahakuja, laskuharjoituksia ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse viikolle kotitalousteeman alateema, kuten keitti\u00f6n esineet, siivous tai ruokaostokset, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi lajitteluteht\u00e4v\u00e4 luokitteluun, laskuteht\u00e4v\u00e4 matematiikkaan ja sanahaku sanastoon.',
    'Aloita keskustelulla kotitalouden rutiineista: kysy lapsilta, miss\u00e4 kotit\u00f6iss\u00e4 he auttavat tai mitk\u00e4 esineet ovat tutuja keit\u00f6lt\u00e4.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita esineiden tunnistamisesta ennen moniominaisuuksista lajittelua.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mihin huoneeseen t\u00e4m\u00e4 esine kuuluu tai Mist\u00e4 materiaalista t\u00e4m\u00e4 on tehty.',
    'Yhdist\u00e4 ty\u00f6lehti k\u00e4yt\u00e4nn\u00f6n harjoitukseen: kattakaa p\u00f6yt\u00e4 yhdess\u00e4 tai j\u00e4rjestelk\u00e4\u00e4 lelulaatikko ty\u00f6lehden lajitteluperiaatteiden mukaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa esinesanaston ja lajittelutaitojen kehittymist\u00e4.',
  ],

  limitations: 'Kotitalousteema voi tahattomasti korostaa sosioekonomisia eroja, jos teht\u00e4viss\u00e4 esitell\u00e4\u00e4n eriarvoisesti kodin varustelutasoja. Opettajien tulee painottaa perusesineit\u00e4, jotka l\u00f6ytyv\u00e4t jokaisesta kodista. Sukupuolittuneet kotity\u00f6stereotypiat ovat riski: teht\u00e4viss\u00e4 tulisi esitell\u00e4 tasapuolisesti kaikkia perheenj\u00e4seni\u00e4 kotit\u00f6iden tekij\u00f6in\u00e4. Turvallisuusn\u00e4k\u00f6kulma on t\u00e4rke\u00e4: vaarallisia esineit\u00e4 kuten veitsi\u00e4 tulee k\u00e4sitell\u00e4 asianmukaisesti.',

  themeComparisons: [
    {
      vsThemeId: 'furniture',
      summary: 'Huonekaluty\u00f6lehdet keskittyv\u00e4t huonekalujen tunnistamiseen ja avaruudelliseen hahmotukseen. Kotitalousty\u00f6lehdet kattavat laajemmin kaikki kodin esineet ja arjen taidot, tarjoten rikkaamman luokittelukontekstin.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Ruoanlaittotyölehdet syventyv\u00e4t keitti\u00f6toimintaan ja resepteihin. Kotitalousty\u00f6lehdet kattavat koko kodin ymp\u00e4rist\u00f6n sis\u00e4lt\u00e4en siivouksen, j\u00e4rjestelyn ja huollon, tarjoten laajemman el\u00e4m\u00e4ntaitojen kattavuuden.',
    },
    {
      vsThemeId: 'clothing',
      summary: 'Vaatety\u00f6lehdet keskittyv\u00e4t pukeutumiseen ja s\u00e4\u00e4nmukaisiin valintoihin. Kotitalousty\u00f6lehdet laajentavat arjen taidot koko kodin ymp\u00e4rist\u00f6\u00f6n sis\u00e4lt\u00e4en siivouksen, ruokahuollon ja organisoinnin.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet keskittyv\u00e4t ulkotiloihin ja kasvien hoitoon. Kotitalousty\u00f6lehdet k\u00e4sittelev\u00e4t sis\u00e4tilojen hoitoa ja esineiden k\u00e4ytt\u00f6\u00e4, tarjoten kodin kokonaiskuvan puutarhan t\u00e4ydent\u00e4ess\u00e4 ulkoilman\u00e4k\u00f6kulman.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'kotitalousaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Kotitalousaiheiset v\u00e4ritysteht\u00e4v\u00e4t tutustuttavat lapset keitti\u00f6n v\u00e4lineisiin ja kodin esineisiin v\u00e4rikk\u00e4iden kuvien kautta, kehitt\u00e4en hienomotoriikkaa ja esinesanastoa.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'kotitalousesineiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t visuaalisen etsinn\u00e4n ja aritmetiikan, kun lapset laskevat astioita, v\u00e4lineit\u00e4 ja tarvikkeita keitti\u00f6kohtauksista.',
    },
    {
      appId: 'word-search',
      anchorText: 'kotitalouden sanahaku-ty\u00f6lehdet',
      context: 'Kotitalousesinesanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t keitti\u00f6v\u00e4lineiden, astioiden ja kodinhoitotarvikkeiden nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'matching-app',
      anchorText: 'kotitalousesineiden yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t, joissa kotitalousesineet paritetaan niiden k\u00e4ytt\u00f6tarkoituksiin tai huoneisiin, kehitt\u00e4v\u00e4t luokittelutaitoja ja arjen ymm\u00e4rryst\u00e4.',
    },
  ],

  expertTips: [
    {
      tip: 'J\u00e4rjest\u00e4 kotileikkipiste luokkaan oikeiden tai leikkiv\u00e4lineiden kanssa. Ty\u00f6lehden j\u00e4lkeen lapset siirtyv\u00e4t leikkipisteelle harjoittelemaan samoja lajittelu- ja nime\u00e4misteht\u00e4vi\u00e4 konkreettisesti.',
      source: 'Varhaiskasvatuksen opettaja, toiminnallinen oppiminen',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 ruokakauppamainoksia rinnakkaismateriaalina: oppilaat leikkaavat tuotteita, laskevat hintoja ja vertailevat kokonaissummia. T\u00e4m\u00e4 yhdist\u00e4\u00e4 kotitalousteeman todelliseen talouslukutaitoon.',
      source: 'Luokanopettaja, arjen matematiikka',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'Anna kotitalouden tutkimusprojekti: oppilaat haastattelevat perheenj\u00e4seni\u00e4 kotit\u00f6ist\u00e4, kirjaavat tulokset ja laativat pylv\u00e4skaavion. T\u00e4m\u00e4 yhdist\u00e4\u00e4 datan keruun, analyysin ja kotitaloustaidot.',
      source: 'Matematiikan aineenopettaja, tutkiva oppiminen',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 4. Toys (lelut) ────────────────────────────────────────────────────

const toysFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esikoulun opettaja huomaa, ett\u00e4 useat lapset eiv\u00e4t osaa lajitella esineit\u00e4 useamman kuin yhden ominaisuuden mukaan ja k\u00e4ytt\u00e4v\u00e4t vain v\u00e4ri\u00e4 lajitteluperusteena.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n leluaiheiset lajittelu- ja luokitteluteht\u00e4v\u00e4t, joissa lapset ryhmittelev\u00e4t leluja koon, v\u00e4rin, materiaalin ja tyypin mukaan. Jokainen lajittelukierros k\u00e4ytt\u00e4\u00e4 eri kriteeri\u00e4, ja lapset selitt\u00e4v\u00e4t valintansa.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat lajittelevat joustavasti kahdella tai kolmella kriteerill\u00e4 samanaikaisesti. Luokittelutaidot siirtyv\u00e4t muihin teemoihin ja matematiikan teht\u00e4viin.',
    },
    {
      situation: 'Kotikouluvanhempi etsii motivoivaa tapaa harjoitella yhteenlaskua ja v\u00e4hennyslaskua esikoululaisen kanssa, joka pit\u00e4\u00e4 laskemista tylj\u00e4n\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 leluaiheisia laskuteht\u00e4vi\u00e4, joissa lapsi laskee nallekarhuja, autoja ja palikoita kuvista. Oikeiden lelujen k\u00e4ytt\u00f6 fyysisen\u00e4 laskurina tukee paperiteht\u00e4v\u00e4\u00e4.',
      outcome: 'Lapsi innostuu laskemisesta, koska tutut lelut tekev\u00e4t teht\u00e4vist\u00e4 leikinomaisia. Kuukauden sis\u00e4ll\u00e4 h\u00e4n hallitsee yhteenlaskun kymmeneen ja alkaa itse keksi\u00e4 leluaiheisia laskuteht\u00e4vi\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Lelutyyppien kirjo', value: '20+ tyyppi\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 ja etsi ja laske -ty\u00f6lehti\u00e4, joissa v\u00e4rikk\u00e4\u00e4t lelukohtaukset tarjoavat visuaalisen \u00e4rsykkeen. Lajitteluteht\u00e4v\u00e4t v\u00e4rikoodattuine kategorioineen tukevat visuaalista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'K\u00e4yt\u00e4 oikeita leluja ty\u00f6lehtien rinnalla: lapsi lajittelee nallekarhuja, autoja ja palikoita fyysisesti ennen paperiteht\u00e4v\u00e4\u00e4. Rakennuspalikoilla laskeminen tukee konkreettista ymmm\u00e4rryst\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Lelut ovat universaali aihe \u2014 jokainen lapsi tunnistaa nallen, pallon ja auton. Aloita kuvapohjaisista laskuteht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 lelusanoja asteittain. Kuvitetut sanakortit tukevat sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta monimutkaisilla luokitteluteht\u00e4vill\u00e4, joissa leluja ryhmitell\u00e4\u00e4n kolmen ominaisuuden mukaan samanaikaisesti. Sanallisset laskuteht\u00e4v\u00e4t lelukaupan kontekstissa lis\u00e4\u00e4v\u00e4t matemaattista haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 leluaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Vertaa lajittelun joustavuutta, lelusanaston laajuutta ja matemaattisten ratkaisustrategioiden kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Lajittelun joustavuusarviointi',
      criteria: 'Anna oppilaalle kokoelma lelukuvia ja pyyd\u00e4 lajittelemaan ne kolmella eri tavalla. Arvioi luokitteluperusteiden monipuolisuutta, oikeellisuutta ja selitysten tarkkuutta.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Sanallinen teht\u00e4v\u00e4nluonti',
      criteria: 'Pyyd\u00e4 oppilasta keksim\u00e4\u00e4n oma leluaiheinen laskuteht\u00e4v\u00e4 ja ratkaisu. Arvioi matemaattista ajattelua, teht\u00e4v\u00e4n loogisuutta ja kielellist\u00e4 ilmaisua.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (materiaalit ja teknologia)',
      connection: 'Leluteema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin materiaalien tunnistamisesta ja teknologian ymm\u00e4rt\u00e4misest\u00e4. Lelujen materiaalien (muovi, puu, kangas, metalli) vertailu rakentaa tieteellist\u00e4 luokittelutaitoa.',
      activity: 'Lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat oikeita leluja ja ryhmittelev\u00e4t niit\u00e4 materiaalin mukaan, keskustellen mist\u00e4 kukin materiaali on tehty ja mitk\u00e4 ovat sen ominaisuudet.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Lelujen laskeminen, ryhmittely ja vertailu tarjoavat konkreettisen kontekstin aritmetiikalle, luokittelulle ja kuvioiden tunnistamiselle.',
      activity: 'Etsi ja laske -ty\u00f6lehden tulosten pohjalta oppilaat luovat pylv\u00e4skaavion eri lelutyyppien m\u00e4\u00e4rist\u00e4 ja vastaavat vertailukysymyksiin.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Lelusanasto laajentaa kuvailevaa kielt\u00e4 ja tukee tarinankerronnan taitoja. Lelujen kuvailuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t adjektiivien k\u00e4ytt\u00f6\u00e4 ja kirjoittamisen rakennetta.',
      activity: 'Sanahaun j\u00e4lkeen jokainen oppilas kirjoittaa lyhyen kuvauksen suosikkilelustaan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n kolmea kuvailevaa sanaa.',
    },
  ],

  uniqueAngle: 'Leluaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t lapsen maailman keskeisinnt\u00e4 motivaattoria: leikkij\u00e4. Toisin kuin teemat, jotka vaativat lapsilta siirtymist\u00e4 tuntemattomaan aiheeseen, leluteema kohtaa lapsen siell\u00e4, miss\u00e4 h\u00e4n jo on \u2014 nallekarhut, autot, palikat ja nuket ovat p\u00e4ivitt\u00e4isen el\u00e4m\u00e4n kumppaneita. T\u00e4m\u00e4 tuttuus alentaa oppimisen kynnyst\u00e4 merkitt\u00e4v\u00e4sti, koska lapsen ei tarvitse ensin oppia kontekstia voidakseen keskittyj\u00e4 itse taitoihin. Leluteeman ainutlaatuinen pedagoginen vahvuus on sen luonteva yhteys leikkiin, joka on suomalaisen varhaiskasvatuksen perusperiaate. POPS 2014 ja varhaiskasvatussuunnitelma korostavat leikin merkityst\u00e4 oppimisen v\u00e4lineen\u00e4, ja leluaiheiset ty\u00f6lehdet rakentavat sillan leikin ja j\u00e4sennellyn oppimisen v\u00e4lill\u00e4 \u2014 lapsi siirtyy leikkimisen ilosta luokittelun, laskemisen ja sanaston harjoitteluun kuin itsest\u00e4\u00e4n. Lis\u00e4ksi leluteema tarjoaa ainutlaatuisen materiaalitieteen kontekstin: muovi, puu, kangas ja metalli ovat konkreettisesti koettavia ominaisuuksia, jotka rakentavat tieteellisen havainnoinnin perustaa. Lelukaupan ja syntym\u00e4p\u00e4iv\u00e4lahjojen konteksti esittelee talouslukutaidon perusteita luontevasti.',

  researchCitation: 'Hirsh-Pasek, K., Golinkoff, R.M. & Eyer, D. (2003). Einstein Never Used Flash Cards: How Our Children Really Learn\u2014and Why They Need to Play More and Memorize Less. Rodale Books. Tutkimus osoitti, ett\u00e4 leikillisiss\u00e4 konteksteissa tapahtuva oppiminen, johon kuuluu tuttujen lelujen k\u00e4ytt\u00f6, tuottaa pysyv\u00e4mpi\u00e4 oppimistuloksia kuin abstraktit harjoitukset.',

  culturalNotes: 'Suomalaisessa varhaiskasvatuksessa leikki on oppimisen perusmuoto, ja Varhaiskasvatussuunnitelman perusteet (2022) korostavat leikin arvoa kaikessa oppimisessa. POPS 2014 tukee leikillisyytt\u00e4 alkuopetuksessa. Suomessa on vahva lautapeli- ja leikkiperinne: perheilliss\u00e4 pelien pelaaminen on yleist\u00e4, ja lelut n\u00e4hd\u00e4\u00e4n oppimisv\u00e4linein\u00e4 viihteen lis\u00e4ksi. Leluaiheiset ty\u00f6lehdet sopivat luontevasti t\u00e4h\u00e4n kulttuuriseen yhteyteen.',

  snippetDefinition: 'Leluaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t tuttuja leluja \u2014 nallekarhuja, autoja, palikoita ja peliä \u2014 laskemisen, lajittelun, lukutaidon ja ongelmanratkaisun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuharjoituksia, luokitteluteht\u00e4vi\u00e4, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse viikolle leluteeman alateema, kuten pehmolelut, rakennuspalikat tai lautapelit, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi laskuteht\u00e4v\u00e4 matematiikkaan, sanahaku sanastoon ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita tuomalla oikeita leluja luokkaan: lapset tutkivat, nime\u00e4v\u00e4t ja lajittelevat fyysisi\u00e4 esineit\u00e4 ennen paperiteht\u00e4v\u00e4\u00e4.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita yksinkertaisesta laskemisesta ennen moniominaisuuksista luokittelua.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mist\u00e4 materiaalista t\u00e4m\u00e4 lelu on tehty tai Montako eri v\u00e4ri\u00e4 leluissa on.',
    'Yhdist\u00e4 ty\u00f6lehti vapaaleikkihetkeen: lapset k\u00e4ytt\u00e4v\u00e4t ty\u00f6lehdell\u00e4 laskemiaan leluja leikkiskenaariossa.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa lajittelutaitojen ja lelusanaston kehittymist\u00e4.',
  ],

  limitations: 'Leluteema voi tahattomasti korostaa materiaalisiin eroihin liittyvi\u00e4 er\u00e4rvoisksia, jos teht\u00e4viss\u00e4 esitell\u00e4\u00e4n kalliita tai trenditietoisisa leluja. Opettajien tulee painottaa yksinkertaisia, universaaleja leluja kuten pallot, palikat ja pehmolelut. Elektronisten laitteiden luokittelu leluiksi voi olla kiistanalaista \u2014 on hyv\u00e4 keskustella eron perinteisten ja digitaalisten lelujen v\u00e4lill\u00e4. Turvallisuusn\u00e4k\u00f6kulma on t\u00e4rke\u00e4 pienille lapsille: pienet osat ovat tukehtumisriski.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'Tunnety\u00f6lehdet k\u00e4sittelev\u00e4t sis\u00e4ist\u00e4 tunne-el\u00e4m\u00e4\u00e4. Leluty\u00f6lehdet l\u00e4hestyv\u00e4t tunteita leikin kautta \u2014 nukkeleikki ja roolipelit ovat luontaisia tunneilmaisun v\u00e4yli\u00e4 ty\u00f6lehtikontekstissa.',
    },
    {
      vsThemeId: 'colors',
      summary: 'V\u00e4rity\u00f6lehdet opettavat v\u00e4rien tunnistamista puhtaassa muodossa. Leluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t v\u00e4rej\u00e4 yhten\u00e4 lajitteluperusteena usean joukossa, syvent\u00e4en luokitteluajattelua tutun kontekstin kautta.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Muototy\u00f6lehdet opettavat geometrisi\u00e4 perusmuotoja. Leluty\u00f6lehdet yhdist\u00e4v\u00e4t muodot konkreettisiin esineisiin \u2014 palikat ovat kuutioita, pallot ovat palloja \u2014 mik\u00e4 ankkuroi abstraktin geometrian k\u00e4sin kosketeltavaan todellisuuteen.',
    },
    {
      vsThemeId: 'birthday',
      summary: 'Syntym\u00e4p\u00e4iv\u00e4ty\u00f6lehdet k\u00e4sittelev\u00e4t juhlimista kokonaisvaltaisesti. Leluty\u00f6lehdet syventyv\u00e4t leikkiv\u00e4lineisiin ja niiden luokitteluun, tarjoten systemaattisemman l\u00e4hestymistavan lajittelutaitoihin.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'leluaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Leluaiheiset v\u00e4ritysteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hienomotoriikkaa ja luovaa ilmaisua, kun lapset v\u00e4ritt\u00e4v\u00e4t nallekarhuja, autoja ja palikoita omilla v\u00e4rivalinnoillaan.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'lelujen laskuteht\u00e4v\u00e4t',
      context: 'Lelujen laskuteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t visuaalisen etsinn\u00e4n ja aritmetiikan, kun lapset laskevat eri lelutyyppej\u00e4 monipuolisista leikkikohtauksista.',
    },
    {
      appId: 'word-search',
      anchorText: 'lelusanaston sanahaku-ty\u00f6lehdet',
      context: 'Lelusanaston oppiminen onnistuu sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t lelujen, pelien ja leikkiv\u00e4lineiden nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'matching-app',
      anchorText: 'lelujen yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t, joissa identtiset leluparit tai lelut ja niiden varjokuvat paritetaan, kehitt\u00e4v\u00e4t visuaalista erottelukyky\u00e4 ja muistia.',
    },
  ],

  expertTips: [
    {
      tip: 'Tuo luokkaan lelulaatikko, josta lapset valitsevat esineit\u00e4 fyysiseen lajitteluun ennen ty\u00f6lehti\u00e4. Konkreettinen k\u00e4sittely vahvistaa luokittelutaitoja ja luo sillan leikin ja oppimisen v\u00e4lille.',
      source: 'Varhaiskasvatuksen opettaja, leikkipedagogiikka',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 lelukauppaleikki\u00e4 matematiikan kontekstina: laita leluille hintalappuja ja anna lasten laskea ostoksia. T\u00e4m\u00e4 yhdist\u00e4\u00e4 leluteeman rahamatematiikkaan luontevasti.',
      source: 'Luokanopettaja, toiminnallinen matematiikka',
      gradeRange: '1.\u20132. lk',
    },
    {
      tip: 'Anna lelujen materiaalitutkimusprojekti: oppilaat ryhmittelev\u00e4t leluja materiaalin mukaan, tutkivat ominaisuuksia kuten kovuus ja joustavuus ja kirjoittavat havaintoraportin. T\u00e4m\u00e4 yhdist\u00e4\u00e4 luonnontieteen ja \u00e4idinkielen.',
      source: 'Luonnontieteen opettaja, tutkiva oppiminen',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 5. Music (musiikki) ────────────────────────────────────────────────

const musicFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja huomaa, ett\u00e4 ekaluokkalaiset kamppailevat kuvioiden tunnistamisessa matematiikassa ja eiv\u00e4t l\u00f6yd\u00e4 toistuvia rakenteita.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 musiikkiaiheisia ty\u00f6lehti\u00e4, joissa rytmikuviot esitet\u00e4\u00e4n visuaalisina sarjoina: nuotit, tauot ja lyöm\u00e4soitinkuvat muodostavat toistuvia kuvioita. Lapset tunnistavat kuvion ja taputtavat sen ennen paperille merkitsemist\u00e4.',
      outcome: 'Oppilaat oivaltavat kuvioajattelun musiikin kautta ja siirt\u00e4v\u00e4t taidon matemaattisiin kuviosarjoihin. Musiikillinen konteksti tekee abstraktista algebrallisesta ajattelusta konkreettista ja hauskaa.',
    },
    {
      situation: 'Kotikoululaisen vanhempi etsii tapaa rikastuttaa esikoululaisen sanastoa ja itseilmaisua, mutta perinteiset sanalistat eiv\u00e4t kiinnosta lasta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 musiikkiaiheisia sanahaku- ja nime\u00e4misteht\u00e4vi\u00e4, joissa lapsi etsii soittimien nimi\u00e4 ja yhdist\u00e4\u00e4 kuvia sanoishin. Taustalla soi musiikkia, ja jokaisen l\u00f6ydetyn soittimen kohdalla kuunnellaan sen \u00e4\u00e4ninäyte.',
      outcome: 'Lapsi oppii laajan soittimisanaston ja alkaa kuvailemaan \u00e4\u00e4ni\u00e4 rikkaammin: matala, korkea, hiljainen, voimakas. Sanasto laajenee my\u00f6s muihin yhteyksiin.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Soitinryhmien kirjo', value: '5+ ryhm\u00e4\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 soittimista ja visuaalisia rytmikuvioita. Nuottikuvien ja soitinkuvien yhdist\u00e4minen tukee visuaalista muistia ja soitintuntemusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehtiin rytminen taputtaminen ja kehosoittimet: lapsi taputtaa kuvion ennen sen merkitsemist\u00e4 paperille. Aidot soittimet koskettavaksi ty\u00f6lehtien rinnalla vahvistavat oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Musiikki on universaali kieli \u2014 melodiat ja rytmit ylitt\u00e4v\u00e4t kielimuurit. Aloita soittimien kuvapohjaisesta tunnistamisesta ja lis\u00e4\u00e4 suomenkielisi\u00e4 sanoja asteittain. \u00c4\u00e4nin\u00e4ytteet auttavat yhdist\u00e4m\u00e4\u00e4n sanan konkreettiseen kokemukseen.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta s\u00e4vellysteht\u00e4vill\u00e4, joissa oppilas luo oman rytmikuvion ja kirjoittaa sen ylös k\u00e4ytt\u00e4en yksinkertaista notaatiota. Soitinryhmien vertailu ja \u00e4\u00e4nten luokittelu lis\u00e4\u00e4v\u00e4t tieteellist\u00e4 ulottuvuutta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 musiikkiaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Vertaa soitinsanaston laajuutta, rytmikuvioiden tunnistamisen tarkkuutta ja luovien tuotosten kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Rytmikuvion tuottaminen',
      criteria: 'Pyyd\u00e4 oppilasta taputtamaan annettu rytmikuvio, jatkamaan sit\u00e4 ja sitten luomaan oma kuvio. Arvioi kuvion s\u00e4\u00e4nn\u00f6nmukaisuutta, toistoa ja kyky\u00e4 kuvailla kuviota sanallisesti.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Soitinluokittelu',
      criteria: 'Anna oppilaalle kuvia eri soittimista ja pyyd\u00e4 luokittelemaan ne jousi-, puhallin-, lyöm\u00e4- ja n\u00e4pp\u00e4ilysoittimiin. Arvioi luokittelun oikeellisuutta ja perustelujen tarkkuutta.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Musiikki (POPS 2014)',
      connection: 'Musiikkity\u00f6lehdet kytkeytyv\u00e4t suoraan POPS 2014:n musiikkikasvatuksen tavoitteisiin rytmin, melodian ja soittimien tuntemuksesta. Visuaaliset rytmikuviot tukevat musiikillista lukutaitoa.',
      activity: 'Rytmikuvioty\u00f6lehden j\u00e4lkeen oppilaat taputtavat kuvion ja luovat siit\u00e4 musiikkiesityksen kehosoittimilla tai rytmisoittimilla.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Rytmikuviot ovat matemaattisia sarjoja \u00e4\u00e4ness\u00e4. Musiikkity\u00f6lehdet kehitt\u00e4v\u00e4t algebrallista ajattelua kuviotunnistuksen kautta ja tarjoavat laskemisen kontekstin soittimien ja nuottien parissa.',
      activity: 'Kuviotyölehden j\u00e4lkeen oppilaat tunnistavat vastaavia kuviosarjoja numerosarjoista, yhdist\u00e4en musiikillisen ja matemaattisen kuvioajattelun.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Soitinsanasto ja musiikkitermit rikastuttavat kielellist\u00e4 ilmaisua. \u00c4\u00e4nten kuvailu adjektiivein kuten matala, korkea, voimakas ja hiljainen kehitt\u00e4\u00e4 t\u00e4sm\u00e4llist\u00e4 kuvailutaitoa.',
      activity: 'Sanahakuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan, jossa p\u00e4\u00e4henkil\u00f6 soittaa l\u00f6ydetty\u00e4 soitinta, k\u00e4ytt\u00e4en musiikkisanastoa.',
    },
  ],

  uniqueAngle: 'Musiikkiaiheiset ty\u00f6lehdet ovat pedagogisesti ainutlaatuisia, koska ne yhdist\u00e4v\u00e4t auditiivisen, visuaalisen ja kinesteettisen oppimisen yhdeksi kokonaisuudeksi. Rytmikuviot ovat matemaattisia sarjoja \u00e4\u00e4nen muodossa, mik\u00e4 tarjoaa voimakkaan sillan musiikin ja algebran v\u00e4lill\u00e4. Suomalaisessa koulutustraditiossa musiikki on POPS 2014:n mukaan pakollinen oppiaine kaikilla luokka-asteilla, ja se n\u00e4hd\u00e4\u00e4n olennaisena osana lapsen kokonaisvaltaista kehityst\u00e4. Musiikkity\u00f6lehdet tukevat t\u00e4t\u00e4 perinnett\u00e4 tarjoamalla visuaalisia ja kirjallisia v\u00e4lineit\u00e4 musiikillisten k\u00e4sitteiden k\u00e4sittelyyn. Tunteiden ilmaisu musiikin kautta on syvj\u00e4sti inhimillist\u00e4 \u2014 lapset, jotka eiv\u00e4t l\u00f6yd\u00e4 sanoja tunteilleen, voivat ilmaista ne rytmin ja melodian avulla. Ty\u00f6lehdet toimivat siltana t\u00e4m\u00e4n tunnekokemuksen ja analyyttisen ajattelun v\u00e4lill\u00e4: lapsi, joka tunnistaa surullisen kappaleen, harjoittelee samalla tunneilmaisun ja \u00e4\u00e4nen ominaisuuksien luokittelua. Lis\u00e4ksi musiikki on kulttuurisesti inklusiivinen teema, koska jokainen kulttuuri jakaa musiikin, vaikkakaan ei samoja soittimia tai s\u00e4velj\u00e4rjestelmi\u00e4.',

  researchCitation: 'Hallam, S. (2010). The Power of Music: Its Impact on the Intellectual, Social and Personal Development of Children and Young People. International Journal of Music Education, 28(3), 269\u2013289. Laaja katsaus osoitti, ett\u00e4 aktiivinen musiikin harjoittaminen parantaa matemaattisia taitoja, kielellist\u00e4 kehityst\u00e4 ja sosiaalisia valmiuksia lapsilla.',

  culturalNotes: 'Suomessa musiikkikasvatus on POPS 2014:n mukaan pakollinen oppiaine kaikilla luokka-asteilla, ja se on integroitu vahvasti varhaiskasvatukseen. Suomalainen musiikkiperinne on rikas: kansanmusiikki, Sibeliuksen perint\u00f6 ja nykyaikainen musiikkikoulutus tekev\u00e4t musiikista kulttuurisesti arvostetun osan opetusta. Musiikkity\u00f6lehdet tukevat t\u00e4t\u00e4 perintöä tarjoamalla visuaalisia ja kirjallisia v\u00e4lineit\u00e4 musiikillisten k\u00e4sitteiden k\u00e4sittelyyn.',

  snippetDefinition: 'Musiikkiaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t soittimia, rytmej\u00e4 ja musiikkisanastoa matematiikan, lukutaidon ja luovan ajattelun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t rytmikuvioita, soitinten nime\u00e4misteht\u00e4vi\u00e4, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse viikolle musiikkiteeman alateema, kuten soitinryhm\u00e4t, rytmikuviot tai musiikkilajit, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi kuviotyölehti algebralliseen ajatteluun, sanahaku sanastoon ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita kuuntelemalla lyhyt musiikkin\u00e4yte ja keskustelemalla: mitk\u00e4 soittimet kuulet ja milt\u00e4 musiikki tuntuu.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita soittimien v\u00e4ritt\u00e4misest\u00e4 ennen vaativampia rytmikuvio- ja luokitteluteht\u00e4vi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Onko t\u00e4m\u00e4n soittimen \u00e4\u00e4ni matala vai korkea tai Miten jatkaisit t\u00e4t\u00e4 rytmikuviota.',
    'Yhdist\u00e4 ty\u00f6lehti musiikkihetkeen: taputtakaa yhdess\u00e4 ty\u00f6lehdell\u00e4 harjoitellut rytmikuviot.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa soitinsanaston ja rytmitaitojen kehittymist\u00e4.',
  ],

  limitations: 'Musiikkity\u00f6lehdet keskittyv\u00e4t visuaaliseen ja kirjalliseen k\u00e4sittelyyn, mik\u00e4 ei korvaa aitoa musiikillista kokemusta soittamisesta ja kuuntelusta. Opettajien tulee yhdist\u00e4\u00e4 ty\u00f6lehdet aina \u00e4\u00e4nellisiin harjoituksiin. Kulttuurinen herkkyys on t\u00e4rke\u00e4\u00e4: joillakin perheill\u00e4 voi olla uskonnollisia tai kulttuurisia rajoitteita tiettyjen musiikkityyppien suhteen. Nuottikirjoituksen esittely tulee suhteuttaa ik\u00e4tasoon: liian monimutkainen notaatio voi turhauttaa.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'Tunnety\u00f6lehdet k\u00e4sittelev\u00e4t tunteita suoraan nime\u00e4misen ja lajittelun kautta. Musiikkity\u00f6lehdet l\u00e4hestyv\u00e4t tunteita ep\u00e4suorasti \u00e4\u00e4nen ja rytmin kautta, tarjoten vaihtoehtoisen kanavan tunneilmaisuun.',
    },
    {
      vsThemeId: 'toys',
      summary: 'Leluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t leikkiv\u00e4lineit\u00e4 lajittelun ja laskemisen kontekstina. Musiikkity\u00f6lehdet tuovat ainutlaatuisen auditiivisen ulottuvuuden, jossa \u00e4\u00e4net ja rytmit muodostavat oppimisen perustan.',
    },
    {
      vsThemeId: 'circus',
      summary: 'Sirkusty\u00f6lehdet yhdist\u00e4v\u00e4t esityksen ja viihteen. Musiikkity\u00f6lehdet syventyv\u00e4t \u00e4\u00e4nen ominaisuuksiin, soittimiin ja rytmiseen rakenteeseen, tarjoten analyyttisemm\u00e4n l\u00e4hestymistavan taideoppimiseen.',
    },
    {
      vsThemeId: 'holidays',
      summary: 'Juhlaty\u00f6lehdet k\u00e4sittelev\u00e4t juhlia kokonaisvaltaisesti. Musiikkity\u00f6lehdet keskittyv\u00e4t musiikin rooliin kulttuurissa ja juhlissa, tarjoten syvemm\u00e4n n\u00e4k\u00f6kulman musiikilliseen perinteeseen.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'musiikkiaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Musiikkiaiheiset v\u00e4ritysteht\u00e4v\u00e4t tutustuttavat lapset soittimiin ja musiikillisiin symboleihin v\u00e4rikk\u00e4iden kuvien kautta, kehitt\u00e4en hienomotoriikkaa ja soitintuntemusta.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'soittimien piirustusteht\u00e4v\u00e4t',
      context: 'Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t antavat lasten luoda omia soitinkuvia, vahvistaen visuaalista muistia ja musiikkisanastoa luovan ilmaisun kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'musiikkisanaston sanahaku-ty\u00f6lehdet',
      context: 'Musiikkisanaston oppiminen onnistuu sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t soittimien, musiikkitermien ja \u00e4\u00e4nten kuvausten nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'musiikkisanojen sekoitusteht\u00e4v\u00e4t',
      context: 'Sanojen sekoitusteht\u00e4v\u00e4t haastavat lapsia j\u00e4rjest\u00e4m\u00e4\u00e4n kirjaimet musiikkisanoiksi, kehitt\u00e4en oikeinkirjoitustaitoja ja musiikkisanastoa samanaikaisesti.',
    },
  ],

  expertTips: [
    {
      tip: 'Taputa jokainen rytmikuvio \u00e4\u00e4neen ennen paperille merkitsemist\u00e4. Auditiivinen ja kinesteettinen kokemus vahvistaa kuvion ymm\u00e4rt\u00e4mist\u00e4 moninkertaisesti pelkk\u00e4\u00e4n visuaaliseen tunnistamiseen verrattuna.',
      source: 'Musiikkikasvattaja, 15 vuoden kokemus',
      gradeRange: 'Kaikki luokka-asteet',
    },
    {
      tip: 'Yhdist\u00e4 musiikkity\u00f6lehdet kuunteluharjoituksiin: soita lyhyi\u00e4 kappaleita ja pyyd\u00e4 lapsia tunnistamaan ty\u00f6lehdill\u00e4 opittuja soittimia. T\u00e4m\u00e4 siirt\u00e4\u00e4 visuaalisen tiedon auditiiviseen tunnistamiseen.',
      source: 'Luokanopettaja, taiteiden integrointi',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Anna lasten luoda oma soitinkokoelma arjen esineist\u00e4: purkkirummut, riisit\u00e4ytetyt pullot ja kumilenkkirytmisoittimet. Ty\u00f6lehdet tarjoavat teoreettisen pohjan, ja itse tehdyt soittimet tuovat sen el\u00e4v\u00e4ksi.',
      source: 'Varhaiskasvatuksen opettaja, luova oppiminen',
      gradeRange: 'Esiopetus\u20131. lk',
    },
  ],`;

// ── 6. Jobs (ammatit) ──────────────────────────────────────────────────

const jobsFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Ekaluokan opettaja valmistelee ymp\u00e4rist\u00f6opin jaksoa yhteiskunnasta ja ammateista, mutta oppilailla on suppea k\u00e4sitys ammattien kirjosta.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 ammattiaiheisia nime\u00e4mis-, yhdist\u00e4mis- ja lajitteluteht\u00e4vi\u00e4, joissa lapset tunnistavat eri ammattien edustajia, yhdist\u00e4v\u00e4t heid\u00e4t ty\u00f6v\u00e4lineisiins\u00e4 ja lajittelevat ammatteja ty\u00f6ymp\u00e4rist\u00f6n mukaan. Luokkaan kutsutaan vierailevia ammattilaisia.',
      outcome: 'Oppilaat tunnistavat ja kuvailevat yli kaksikymment\u00e4 eri ammattia. Haaveiltujen ammattien kirjo laajenee merkitt\u00e4v\u00e4sti, ja lapset alkavat yhdist\u00e4\u00e4 koulun oppiaineita tulevaisuuden ammatteihin.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa lapselle yhtiskunnallista ymm\u00e4rryst\u00e4 ja samalla harjoitella kuvailevaa kirjoittamista.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 ammattiaiheisia kirjoitus- ja piirustusteht\u00e4vi\u00e4, joissa lapsi kuvaa unelma-ammattiaan, piirt\u00e4\u00e4 ammattilaisentyöv\u00e4lineet ja kirjoittaa p\u00e4iv\u00e4n kyseisess\u00e4 ammatissa.',
      outcome: 'Lapsi tuottaa rikkaita kuvailutekstej\u00e4 ja oppii samalla ammattisanastoa. Perhe-keskustelut ammateista laajenevat, ja lapsi alkaa huomata ammatteja arkiel\u00e4m\u00e4ss\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Ammattien kirjo', value: '25+ ammattia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 ammattilaisista ja heidn\u00e4 ty\u00f6ymp\u00e4rist\u00f6ist\u00e4\u00e4n. Yhdist\u00e4misteht\u00e4v\u00e4t, joissa ammattilaiset paritetaan ty\u00f6v\u00e4lineisiins\u00e4 tai ty\u00f6paikkoihinsa, tukevat visuaalista muistia.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'J\u00e4rjest\u00e4 ammattiroolileikkipisteit\u00e4 ty\u00f6lehtien tueksi: l\u00e4\u00e4k\u00e4ri-, kokki- ja rakentajapisteet. Lapset kokeilevat ammattia k\u00e4yt\u00e4nn\u00f6ss\u00e4 ennen tai j\u00e4lkeen ty\u00f6lehden t\u00e4yt\u00f6n.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Ammatit ovat universaaleja \u2014 jokainen lapsi tuntee l\u00e4\u00e4k\u00e4rin, opettajan ja palomehen. Aloita kuvapohjaisesta tunnistamisesta ja lis\u00e4\u00e4 suomenkielisi\u00e4 ammattinimiä asteittain. Kuvitetut ammattikortit tukevat sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4, joissa oppilas tutkii yht\u00e4 ammattia syvemmin: mit\u00e4 koulutusta tarvitaan, millainen ty\u00f6p\u00e4iv\u00e4 on ja mit\u00e4 ty\u00f6v\u00e4lineit\u00e4 k\u00e4ytet\u00e4\u00e4n. Kirjallinen ammattiraportti lis\u00e4\u00e4 haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 ammattiaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Vertaa ammattisanaston laajuutta, ammattienvlisen yhteyksien ymm\u00e4rt\u00e4mist\u00e4 ja kuvailutaitojen kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Ammattien yhdist\u00e4misarviointi',
      criteria: 'Anna oppilaalle kuvia ammattilaisista, ty\u00f6v\u00e4lineist\u00e4 ja ty\u00f6paikoista. Pyyd\u00e4 yhdist\u00e4m\u00e4\u00e4n oikeat kolmikot ja selitt\u00e4m\u00e4\u00e4n valinnat. Arvioi tunnistamisen tarkkuutta ja perustelujen syvyytt\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Unelma-ammatin esitys',
      criteria: 'Pyyd\u00e4 oppilasta piirt\u00e4m\u00e4\u00e4n ja kirjoittamaan unelma-ammatistaan: mit\u00e4 ty\u00f6 sis\u00e4lt\u00e4\u00e4, mitk\u00e4 taidot ovat t\u00e4rkeit\u00e4 ja miksi t\u00e4m\u00e4 ammatti kiinnostaa. Arvioi kuvailun rikkautta ja yhteytt\u00e4 oppiaineisiin.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (yhteiskunta)',
      connection: 'Ammattiteema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin yhteiskunnallisiin tavoitteisiin ja laaja-alaisen osaamisen L6 (ty\u00f6el\u00e4m\u00e4taidot ja yritt\u00e4jyys) -tavoitteisiin. Ammattien tunteminen rakentaa yhteiskunnallista ymm\u00e4rryst\u00e4.',
      activity: 'Ammattien nime\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen oppilaat haastattelevat perheenj\u00e4sent\u00e4 h\u00e4nen ammatistaan ja esittelev\u00e4t tulokset luokalle.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Ammattien kautta voidaan harjoitella rahamatematiikkaa, mittaamista ja ongelmanratkaisua k\u00e4yt\u00e4nn\u00f6llisiss\u00e4 yhteyksissä: rakentajan mittaamista, kauppiaan rahanlaskua ja kokin reseptien skaalausta.',
      activity: 'Laskuteht\u00e4vien j\u00e4lkeen oppilaat leikkiv\u00e4t ammattiroolipeliä, jossa eri ammateissa k\u00e4ytet\u00e4\u00e4n eri matemaattisia taitoja k\u00e4yt\u00e4nn\u00f6ss\u00e4.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Ammattisanasto laajentaa kielellist\u00e4 ilmaisua ja tukee kuvailevaa ja asiatekstin kirjoittamista. Haastattelutekniikka kehitt\u00e4\u00e4 vuorovaikutustaitoja.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat p\u00e4iv\u00e4n ammatissa -tarinan, jossa kuvaavat valitsemansa ammattilaisen ty\u00f6p\u00e4iv\u00e4n.',
    },
  ],

  uniqueAngle: 'Ammattiaiheisett ty\u00f6lehdet ovat pedagogisesti arvokkaita, koska ne yhdist\u00e4v\u00e4t akateemisen oppimisen suoraan lasten tulevaisuuden haaveisiin ja yhteiskunnalliseen ymm\u00e4rrykseen. Kun lapsi piirt\u00e4\u00e4 palomiehen, h\u00e4n ei vain v\u00e4rit\u00e4 kuvaa vaan rakentaa mielikuvaa itsest\u00e4\u00e4n toimijana yhteiskunnassa. Suomalaisessa koulutustraditiossa ty\u00f6el\u00e4m\u00e4taidot ja yritt\u00e4jyys ovat POPS 2014:n laaja-alaisen osaamisen L6-tavoitteena jo alkuopetuksesta alkaen, mik\u00e4 tekee ammattiteemasta opetussuunnitelmaa suoraan tukevaan resurssin. Ammattiteema on my\u00f6s erinomainen tasa-arvo-oppimisen v\u00e4line: kun ty\u00f6lehdiss\u00e4 esitell\u00e4\u00e4n monipuolisesti eri sukupuolten edustajia eri ammateissa, lapset omaksuvat laajan k\u00e4sityksen mahdollisuuksistaan. Ammattien yhdist\u00e4minen oppiaineisiin motivoi oppimista: matematiikka saa merkityksen, kun lapsi ymm\u00e4rt\u00e4\u00e4, ett\u00e4 arkkitehti laskee pinta-aloja ja kokki mittaa ainesosia. Yhteiskunnallinen ymm\u00e4rrys syvenee, kun lapsi oppii, miten eri ammatit palvelevat toisiaan ja muodostavat toimivan kokonaisuuden. Ammattiteema tarjoaa my\u00f6s luonnollisen yhteyden yrittäjyyskasvatukseen, joka on suomalaisen koulutuksen kasvava painopiste.',

  researchCitation: 'Helwig, A.A. (2001). A Test of Gottfredson\u2019s Theory Using a Ten-Year Longitudinal Study. Journal of Career Development, 28(2), 77\u201395. Tutkimus osoitti, ett\u00e4 varhaislapsuuden ammattikuva vaikuttaa pitk\u00e4aikaisesti uravalintoihin, ja monipuolinen ammattien esittely laajentaa lasten k\u00e4sityst\u00e4 heille avoimista mahdollisuuksista.',

  culturalNotes: 'Suomessa ty\u00f6el\u00e4m\u00e4taidot ja yritt\u00e4jyys ovat POPS 2014:n laaja-alaisen osaamisen L6-tavoitteena kaikilla luokka-asteilla. Suomalainen yhteiskunta arvostaa moniammatillista yhteisty\u00f6t\u00e4 ja tasa-arvoista ty\u00f6el\u00e4m\u00e4\u00e4, mik\u00e4 heijastuu opetuksessa. Ammattip\u00e4iv\u00e4t ja ty\u00f6el\u00e4m\u00e4\u00e4n tutustumisj\u00e4akot ovat vakiintunut osa suomalaista koulutusta. Ammattiaiheisett ty\u00f6lehdet tukevat t\u00e4t\u00e4 perinnett\u00e4 jo varhaisessa vaiheessa.',

  snippetDefinition: 'Ammattiaiheisett ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t eri ammatteja, ty\u00f6v\u00e4lineit\u00e4 ja ty\u00f6ymp\u00e4rist\u00f6j\u00e4 laskemisen, sanaston, luokittelun ja yhteiskunnallisen ymm\u00e4rryksen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t nime\u00e4misteht\u00e4vi\u00e4, yhdist\u00e4mispulmia, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse viikolle ammattiteeman alateema, kuten turvallisuusammatit, terveydenhuolto tai rakentaminen, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi yhdist\u00e4misteht\u00e4v\u00e4 luokitteluun, laskuteht\u00e4v\u00e4 matematiikkaan ja sanahaku sanastoon.',
    'Aloita keskustelulla: kysy lapsilta, mit\u00e4 ammatteja heid\u00e4n perheess\u00e4\u00e4n on tai mik\u00e4 ammatti heitj\u00e4 kiinnostaisi.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita ammattien tunnistamisesta ennen ty\u00f6v\u00e4lineiden yhdist\u00e4mist\u00e4 ja ammattikuvausten kirjoittamista.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mitk\u00e4 ty\u00f6v\u00e4lineet kuuluvat t\u00e4h\u00e4n ammattiin tai Mit\u00e4 matikkaa t\u00e4m\u00e4 ammattilainen k\u00e4ytt\u00e4\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehti roolileikkiin: lapset leikkiv\u00e4t ty\u00f6lehdell\u00e4 opittua ammattia draaman ja mielikuvituksen keinoin.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja lis\u00e4tk\u00e4\u00e4 lapsen oma unelma-ammatin piirros tai kirjoitus.',
  ],

  limitations: 'Ammattity\u00f6lehdet voivat tahattomasti vahvistaa sukupuoli- tai statusstereotypioita, jos ammatit esitell\u00e4\u00e4n yksipuolisesti. Opettajien tulee varmistaa, ett\u00e4 naisia ja miehi\u00e4 n\u00e4kyy monipuolisesti kaikissa ammateissa. Sosioekonominen herkkyys on t\u00e4rke\u00e4\u00e4: kaikkia ammatteja tulee esitell\u00e4 arvostavasti riippumatta palkka- tai statustasosta. Ammattien kuvauksissa tulisi v\u00e4ltt\u00e4\u00e4 liiallista yksinkertaistamista.',

  themeComparisons: [
    {
      vsThemeId: 'construction',
      summary: 'Rakennusty\u00f6lehdet syventyv\u00e4t yhteen ammattialaan: rakentamiseen, v\u00e4lineisiin ja rakenteisiin. Ammattity\u00f6lehdet kattavat laajasti eri ammattialoja ja niiden v\u00e4lisi\u00e4 yhteyksi\u00e4.',
    },
    {
      vsThemeId: 'transportation',
      summary: 'Liikennety\u00f6lehdet keskittyv\u00e4t kulkuv\u00e4lineisiin ja liikkumiseen. Ammattity\u00f6lehdet tutkivat liikenneammatteja (kuljettaja, lentäjä, merenkulkija) osana laajempaa ammattien kirjoa.',
    },
    {
      vsThemeId: 'school',
      summary: 'Kouluty\u00f6lehdet keskittyv\u00e4t oppimisymp\u00e4rist\u00f6\u00f6n ja taitoihin. Ammattity\u00f6lehdet laajentavat n\u00e4k\u00f6kulman siihen, mihin koulutaidot johtavat, yhdist\u00e4en kouluoppimisen tulevaisuuden ammatteihin.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Maatilaty\u00f6lehdet syventyv\u00e4t maatalousty\u00f6h\u00f6n ja el\u00e4intenhoitoon. Ammattity\u00f6lehdet esittelev\u00e4t maanviljelij\u00e4n yhten\u00e4 monista ammateista, tarjoten laajemman yhteiskunnallisen kontekstin.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'ammattiaiheisett v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Ammattiaiheisett v\u00e4ritysteht\u00e4v\u00e4t tutustuttavat lapset eri ammatteihin ja niiden ty\u00f6asuihin v\u00e4rikk\u00e4iden kuvien kautta, kehitt\u00e4en hienomotoriikkaa ja ammattisanastoa.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'ammattiv\u00e4lineiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t visuaalisen etsinn\u00e4n ja aritmetiikan, kun lapset laskevat ty\u00f6v\u00e4lineit\u00e4 ja ammattilaishahmoja monipuolisista ty\u00f6paikkakohtauksista.',
    },
    {
      appId: 'word-search',
      anchorText: 'ammattisanaston sanahaku-ty\u00f6lehdet',
      context: 'Ammattisanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t ammattien, ty\u00f6v\u00e4lineiden ja ty\u00f6paikkojen nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'ammattien kuvaristikot',
      context: 'Kuvaristikot yhdist\u00e4v\u00e4t ammattikuvat sanastoon: lapset tunnistavat ammattilaisen kuvasta ja kirjoittavat ammatin nimen ristikoruudukkoon.',
    },
  ],

  expertTips: [
    {
      tip: 'Kutsu vierailevia ammattilaisia luokkaan ty\u00f6lehtien jj\u00e4lkeen: lapset ovat valmistautuneet ammattisanastolla ja voivat esitt\u00e4\u00e4 syvempi\u00e4 kysymyksi\u00e4. Vierailijoista tulee el\u00e4v\u00e4 oppimateriaali.',
      source: 'Luokanopettaja, yhteiskunnallinen kasvatus',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 ammattity\u00f6lehdet yrittj\u00e4jyyskasvatukseen: oppilaat keksiv\u00e4t oman ammatin tai yritysidean, piirt\u00e4v\u00e4t logon ja kirjoittavat lyhyen kuvauksen. T\u00e4m\u00e4 tukee luovaa ajattelua ja POPS 2014:n L6-tavoitteita.',
      source: 'Yritt\u00e4jyyskasvattaja, perusopetus',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 ammattity\u00f6lehti\u00e4 motivaation rakentajina: kysy lapsilta, mit\u00e4 matematiikkaa palomies tai mit\u00e4 lukutaitoa el\u00e4inl\u00e4\u00e4k\u00e4ri tarvitsee. T\u00e4m\u00e4 antaa oppiaineille merkityksen tulevaisuuden haaveiden kautta.',
      source: 'Opinto-ohjaaja, alkuopetus',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 7. Space (avaruus) ─────────────────────────────────────────────────

const spaceFields = `
  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Tokaluokan opettaja huomaa, ett\u00e4 oppilaat ovat kiinnostuneita avaruudesta iltauutisten Mars-uutisten j\u00e4lkeen, mutta tieteellinen ymm\u00e4rrys on ep\u00e4m\u00e4\u00e4r\u00e4ist\u00e4.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 avaruusaiheisia ty\u00f6lehti\u00e4, joissa lapset opettelevat aurinkokunta, laskevat planeettojen lukum\u00e4\u00e4ri\u00e4 ja vertailevat kokoja. T\u00e4htitaivaan kartoitusteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t geometrian ja luonnontieteen.',
      outcome: 'Oppilaat hallitsevat aurinkokunnan perusrakenteen ja osaavat nimetj\u00e4 kahdeksan planeettaa j\u00e4rjestyksess\u00e4. Tieteellinen sanasto laajenee, ja oppilaat esitt\u00e4v\u00e4t syvempi\u00e4 kysymyksi\u00e4 avaruudesta.',
    },
    {
      situation: 'Kotikouluvanhempi etsii motivoivaa teemaa, joka yhdist\u00e4\u00e4 luonnontieteen, matematiikan ja lukutaidon kolmasluokkalaisen opetuksessa.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 avaruusaiheisia moniaineteht\u00e4vi\u00e4: planeettojen et\u00e4isyyksien kertolaskuja, avaruusseikkailutarinoiden kirjoittamista ja aurinkokuntaa k\u00e4sittelevi\u00e4 tietotekstej\u00e4 ymm\u00e4rt\u00e4miskysymyksineen.',
      outcome: 'Lapsi innostuu oppimisesta, koska avaruusteema yhdist\u00e4\u00e4 kaikki oppiaineet kiehtovaan kontekstiin. H\u00e4n kirjoittaa oma-aloitteisesti avaruusseikkailutarinoita ja tutkii planeettojen ominaisuuksia it\u00e4n\u00e4isesti.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Avaruuskohteiden kirjo', value: '15+ kohdetta' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota planeettojen v\u00e4ritys- ja piirustusteht\u00e4vi\u00e4 sek\u00e4 kokovertailua. Aurinkokunnan karttateht\u00e4v\u00e4t, joissa planeetat sijoitetaan j\u00e4rjestykseen, tukevat visuaalista ja avaruudellista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Rakenna luokkaan aurinkokunnan pienoisallinen palloja k\u00e4ytt\u00e4en: oppilaat j\u00e4rjest\u00e4v\u00e4t planeetat oikeaan j\u00e4rjestykseen fyysisesti ennen paperiteht\u00e4v\u00e4\u00e4. T\u00e4htikartan piirt\u00e4minen suurelle lattiapinnalle tukee kinesteettist\u00e4 oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Avaruuskuvat ovat universaaleja \u2014 planeetat, t\u00e4hdet ja kuut tunnistetaan kulttuurista riippumatta. Aloita kuvapohjaisista teht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 avaruustermej\u00e4 asteittain. Kuvitetut sanakortit helpottavat sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4 planeettojen ominaisuuksista: l\u00e4mp\u00f6tila, et\u00e4isyys auringosta ja kuiden lukum\u00e4\u00e4r\u00e4. Vertailutaulukot ja graafien luominen lis\u00e4\u00e4v\u00e4t tieteellist\u00e4 haastetta. Avaruusseikkailutarinan kirjoittaminen yhdist\u00e4\u00e4 tieteen ja luovuuden.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 avaruusaiheisia ty\u00f6lehti\u00e4 lukukauden ajalta. Vertaa avaruussanaston laajuutta, planeettatiedon tarkkuutta ja matemaattisten ratkaisustrategioiden kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Aurinkokunnan j\u00e4rjestysarviointi',
      criteria: 'Pyyd\u00e4 oppilasta j\u00e4rjest\u00e4m\u00e4\u00e4n planeettakortit oikeaan j\u00e4rjestykseen auringosta l\u00e4htien ja nime\u00e4m\u00e4\u00e4n ne suomeksi. Arvioi j\u00e4rjestyksen oikeellisuutta, nimeämisen tarkkuutta ja lis\u00e4tietojen antamista.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Avaruustutkimusraportti',
      criteria: 'Pyyd\u00e4 oppilasta valitsemaan yksi planeetta ja kirjoittamaan tutkimusraportti: koko, et\u00e4isyys, l\u00e4mp\u00f6tila, kuut ja erityispiirteet. Arvioi tiedon tarkkuutta, l\u00e4hteiden k\u00e4ytt\u00f6\u00e4 ja raportin rakennetta.',
      gradeLevel: '2.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (avaruus ja maapallo)',
      connection: 'Avaruusteema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin maapallosta avaruuskappaleena, vuorokauden ja vuodenaikojen syist\u00e4 sek\u00e4 aurinkokunnan rakenteesta. Avaruusty\u00f6lehdet tukevat tieteellist\u00e4 ajattelua.',
      activity: 'Planeettojen j\u00e4rjestysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat rakentavat aurinkokunnan pienoismallin eri kokoisista palloista ja laskevat suhteelliset et\u00e4isyydet.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Avaruuden suuret luvut (et\u00e4isyydet, l\u00e4mp\u00f6tilat, planeettojen koot) tarjoavat motivoivan kontekstin lukujen vertailulle, kertolaskulle ja paikka-arvon ymm\u00e4rt\u00e4miselle.',
      activity: 'Planeettojen et\u00e4isyysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat vertailevat lukuja, j\u00e4rjest\u00e4v\u00e4t planeettat koon mukaan ja laskevat et\u00e4isyyseroja.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Avaruusteema inspiroi luovaa kirjoittamista seikkailutarinoiden muodossa ja kehitt\u00e4\u00e4 tietotekstien lukemisen taitoja. Avaruussanasto kuten planeetta, galaksi ja asteroidi laajentaa tieteellist\u00e4 terminologiaa.',
      activity: 'Sanahakuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kirjoittavat lyhyen avaruusseikkailutarinan, jossa k\u00e4ytet\u00e4\u00e4n v\u00e4hint\u00e4\u00e4n viitt\u00e4 opittua avaruussanaa.',
    },
  ],

  uniqueAngle: 'Avaruusaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t yht\u00e4 inhimillisyyden syvimmist\u00e4 motivaattoreista: ihmetyst\u00e4 tuntemattoman edess\u00e4. Avaruus kiehtoo lapsia kaikkialla maailmassa, koska se edustaa rajatonta tutkimusta \u2014 aina on uusi planeetta l\u00f6ydett\u00e4v\u00e4n\u00e4 tai t\u00e4hti n\u00e4ht\u00e4v\u00e4n\u00e4. T\u00e4m\u00e4 luontainen motivaatio tekee avaruusteemasta poikkeuksellisen tehokkaan oppimisen kontekstin, koska lasten ei tarvitse pakottaa kiinnostustaan \u2014 se on jo valmiina. Pedagogisesti avaruusteema on harvinaisen monipuolinen: se yhdist\u00e4\u00e4 luonnontieteen (aurinkokunnan rakenne, painovoima), matematiikan (suuret luvut, et\u00e4isyydet, kokovertailut), lukutaidon (tietotekstit, seikkailutarinat) ja luovan ilmaisun (avaruuskuvat, tarinankkerronta) yhdeksi kokonaisuudeksi. Suomessa avaruustutkimuksella on vahva perinne \u2014 suomalaiset ovat osallistuneet ESA:n ohjelmiin ja aurinkokuntaan tutustuminen on osa POPS 2014:n ymp\u00e4rist\u00f6oppia. Avaruusteeman suuret luvut tarjoavat luonnollisen kontekstin lukuj\u00e4rjestykselle ja kertolaskulle, koska planeettojen et\u00e4isyydet ja koot ovat niin suuria, ett\u00e4 ne haastavat matemaattista ajattelua kiehtovalla tavalla. T\u00e4htitaivaan havainnointi yhdist\u00e4\u00e4 luokkahuoneen oppimisen iltaisin n\u00e4ht\u00e4v\u00e4\u00e4n todellisuuteen.',

  researchCitation: 'Vosniadou, S. & Brewer, W.F. (1992). Mental Models of the Earth: A Study of Conceptual Change in Childhood. Cognitive Psychology, 24(4), 535\u2013585. Tutkimus osoitti, ett\u00e4 lasten maapallo- ja avaruusk\u00e4sitykset muuttuvat systemaattisesti opetuksen my\u00f6t\u00e4, ja visuaaliset ty\u00f6lehdet tukevat k\u00e4sitteellisen muutoksen prosessia tehokkaasti.',

  culturalNotes: 'Suomessa avaruusteema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin maapallosta avaruuskappaleena ja aurinkokunnan rakenteesta. Suomi on ESA:n j\u00e4senmaa, ja avaruustutkimus n\u00e4kyy mediassa s\u00e4\u00e4nn\u00f6llisesti. Pitkäj\u00e4t talviy\u00f6t Pohjois-Suomessa tekev\u00e4t t\u00e4htitaivaan havainnoinnista erityisen palkitsevaa ja luonnollisen osan opetusta. Revontulien tieteellinen selitt\u00e4minen yhdist\u00e4\u00e4 avaruusteeman suomalaiseen luontokokemukseen.',

  snippetDefinition: 'Avaruusaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t planeettoja, t\u00e4hti\u00e4 ja avaruustutkimusta matematiikan, lukutaidon ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuharjoituksia, sanahakuja, kokovertailuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse viikolle avaruusteeman alateema, kuten planeetat, t\u00e4hdet tai avaruustutkimus, jotta oppitunneilla on yhten\u00e4inen fokus.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi kokovertailuteht\u00e4v\u00e4 matematiikkaan, sanahaku sanastoon ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita n\u00e4ytt\u00e4m\u00e4ll\u00e4 kuva avaruudesta tai t\u00e4htitaivaasta ja keskustelemalla: mit\u00e4 n\u00e4et ja mit\u00e4 tied\u00e4t avaruudesta.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita planeettojen v\u00e4ritt\u00e4misest\u00e4 ennen vaativampia lasku- ja tutkimusteht\u00e4vi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mik\u00e4 planeetta on suurin tai Miksi Maapallolla on el\u00e4m\u00e4\u00e4 mutta Marsilla ei.',
    'Yhdist\u00e4 ty\u00f6lehti iltaiseen t\u00e4htitaivaan havainnointiin: anna kotiteht\u00e4v\u00e4ksi katsoa iltataivasta ja piirt\u00e4\u00e4 n\u00e4htyj\u00e4 t\u00e4hti\u00e4.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa avaruussanaston ja tieteellisen ajattelun kehittymist\u00e4.',
  ],

  limitations: 'Avaruusty\u00f6lehdet voivat sis\u00e4lt\u00e4\u00e4 mittakaavavirheit\u00e4, jos planeettojen kokoja ja et\u00e4isyyksi\u00e4 ei esitet\u00e4 realistisesti. Opettajien tulee korostaa, ett\u00e4 kuvitukset ovat yksinkertaistettuja. Avaruuden valtavat et\u00e4isyydet ja abstraktit k\u00e4sitteet kuten painottomuus voivat olla vaikeita pienille lapsille \u2014 konkreettiset vertailut auttavat ymm\u00e4rt\u00e4misess\u00e4. Luonnontieteen ja mielikuvituksen raja tulee pit\u00e4\u00e4 selke\u00e4n\u00e4: scifi-elementit eiv\u00e4t saa sekoittua tieteellisiin faktoihin.',

  themeComparisons: [
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaurusty\u00f6lehdet tutkivat menneisyyden el\u00e4imi\u00e4 ja aikak\u00e4sityksii\u00e4. Avaruusty\u00f6lehdet suuntaavat katseen tulevaisuuteen ja universumin rakenteeseen, yhdist\u00e4en historian ja tulevaisuuden tieteellisen tutkimuksen.',
    },
    {
      vsThemeId: 'robots',
      summary: 'Robottity\u00f6lehdet keskittyv\u00e4t teknologiaan ja koodaamiseen. Avaruusty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t teknologiaa kontekstina \u2014 avaruusrobotit ja -luotaimet yhdist\u00e4v\u00e4t molemmat teemat luontevasti.',
    },
    {
      vsThemeId: 'numbers',
      summary: 'Numeroty\u00f6lehdet opettavat lukuja puhtaassa muodossa. Avaruusty\u00f6lehdet antavat suurille luvuille merkityksen: planeettojen et\u00e4isyydet ja koot tekev\u00e4t lukuk\u00e4sitteist\u00e4 kiehtovia ja konkreettisia.',
    },
    {
      vsThemeId: 'weather',
      summary: 'S\u00e4\u00e4ty\u00f6lehdet tutkivat maapallon ilmaston ilmi\u00f6it\u00e4. Avaruusty\u00f6lehdet laajentavat perspektiivin koko aurinkokuntaan, selitt\u00e4en miksi Maapallolla on s\u00e4\u00e4 mutta esimerkiksi Kuulla ei.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'avaruusaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Avaruusaiheiset v\u00e4ritysteht\u00e4v\u00e4t tutustuttavat lapset planeettoihin, t\u00e4htiin ja avaruusaluksiin v\u00e4rikk\u00e4iden kuvien kautta, kehitt\u00e4en hienomotoriikkaa ja avaruussanastoa.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'planeettojen piirustusteht\u00e4v\u00e4t',
      context: 'Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t antavat lasten luoda omia avaruuskuvia, vahvistaen visuaalista muistia ja tieteellist\u00e4 sanastoa luovan ilmaisun kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'avaruussanaston sanahaku-ty\u00f6lehdet',
      context: 'Avaruussanaston oppiminen onnistuu sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t planeettojen, t\u00e4htien ja avaruusk\u00e4sitteiden nimi\u00e4 sanaruudukosta.',
    },
    {
      appId: 'sudoku',
      anchorText: 'avaruusaiheiset sudoku-pulmat',
      context: 'Avaruusteemaiset sudoku-pulmat kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttely\u00e4 ja ongelmanratkaisua, kun lapset sijoittavat planeettoja ja avaruuskohteita ruudukkoon s\u00e4\u00e4nt\u00f6jen mukaisesti.',
    },
  ],

  expertTips: [
    {
      tip: 'Rakenna luokkaan aurinkokunnan mittakaavamalli pitkj\u00e4lle k\u00e4yt\u00e4v\u00e4lle: oppilaat laskevat et\u00e4isyydet ja sijoittavat planeetat oikeisiin kohtiin. T\u00e4m\u00e4 tekee abstrakteista et\u00e4isyyksist\u00e4 konkreettisia.',
      source: 'Luonnontieteen opettaja, havainnollistaminen',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 avaruusty\u00f6lehdet iltaiseen t\u00e4htitaivaan havainnointiin. Anna kotiteht\u00e4v\u00e4ksi tunnistaa Pohjant\u00e4hti tai Otava ja piirt\u00e4\u00e4 n\u00e4kem\u00e4ns\u00e4. T\u00e4m\u00e4 yhdist\u00e4\u00e4 luokkahuoneen oppimisen todelliseen kokemukseen.',
      source: 'Luokanopettaja, tutkiva oppiminen',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 avaruusteemaa luovan kirjoittamisen inspiraationa: seikkailutarinat avaruudessa motivoivat kirjoittamiseen lapsia, joita perinteiset aiheet eiv\u00e4t kiinnosta. Tieteelliset faktat voidaan kutoa osaksi tarinaa.',
      source: '\u00c4idinkielen opettaja, luova kirjoittaminen',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── Injection Logic ──────────────────────────────────────────────────────

function injectFields(filePath, newFields) {
  const src = fs.readFileSync(filePath, 'utf8');
  const marker = /\n\};\s*\n\nregisterThemeContent/;
  const match = src.match(marker);
  if (!match) {
    throw new Error(`Could not find closing marker in ${filePath}`);
  }
  const insertPos = match.index;
  const updated = src.slice(0, insertPos) + '\n' + newFields + '\n};\n\nregisterThemeContent' + src.slice(match.index + match[0].length);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`  Updated ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────

const base = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  { id: 'body', fields: bodyFields },
  { id: 'clothing', fields: clothingFields },
  { id: 'household', fields: householdFields },
  { id: 'toys', fields: toysFields },
  { id: 'music', fields: musicFields },
  { id: 'jobs', fields: jobsFields },
  { id: 'space', fields: spaceFields },
];

console.log('Part 180: Enriching 7 FI theme hub pages with 14 fields each...\n');
themes.forEach((t, i) => {
  console.log(`${i + 1}. Injecting fields into ${t.id}/fi.ts...`);
  injectFields(path.join(base, t.id, 'fi.ts'), t.fields);
});
console.log('\nDone! All 7 FI theme hub files enriched.');
