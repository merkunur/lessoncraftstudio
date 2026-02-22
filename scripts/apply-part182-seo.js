/**
 * SEO Part 182: Enrich FI theme hub pages 22-28 with 14 enrichment fields each
 * Themes: furniture, easter, halloween, xmas, winter, farm, ocean
 */
const fs = require('fs');
const path = require('path');

// ── 1. Furniture (huonekalut) ────────────────────────────────────────────

const furnitureFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 oppilaat sekoittavat avaruudellisia k\u00e4sitteit\u00e4 kuten p\u00e4\u00e4ll\u00e4, alla ja vieress\u00e4 eiv\u00e4tk\u00e4 osaa kuvailla esineiden sijaintia huoneessa.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n huonekaluaiheiset ty\u00f6lehdet, joissa oppilaat sijoittavat huonekaluja pohjapiirustukseen, yhdist\u00e4v\u00e4t prepositioita huonekalukuviin ja lajittelevat huonekaluja huoneen ja toiminnon mukaan.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat k\u00e4ytt\u00e4v\u00e4t avaruudellista sanastoa sujuvasti arjessa, kuvailevat huonekalujen sijainteja tarkoilla prepositioilla ja tunnistavat geometrisia muotoja huonekaluista.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 geometrian, sanaston ja k\u00e4yt\u00e4nn\u00f6n el\u00e4m\u00e4ntaidot lapselle, joka on kiinnostunut rakentamisesta ja suunnittelusta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 huonekaluty\u00f6lehti\u00e4 yhdistettyn\u00e4 kodin tutkimiseen: lapsi mittaa huonekaluja, tunnistaa geometrisia muotoja esineist\u00e4, suunnittelee huonej\u00e4rjestelj\u00e4 ruutupaperille ja kirjoittaa kuvauksia huoneiden sis\u00e4ll\u00f6st\u00e4.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 geometrian k\u00e4yt\u00e4nn\u00f6llisen merkityksen, k\u00e4ytt\u00e4\u00e4 avaruudellista sanastoa luontevasti ja osaa suunnitella toimivia tilaj\u00e4rjestelj\u00e4 huomioiden sek\u00e4 toimivuuden ett\u00e4 estetiikan.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Huonekalutyyppien kirjo', value: '15+ huonekalua' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota huonej\u00e4rjestelyn pohjapiirustuksia ja ruutupaperin mittakaavapiirustuksia. Valokuvat todellisista huoneista ja niiden vertailu piirustuksiin auttavat hahmottamaan kolmiulotteisen tilan kaksiulotteisena esityksen\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'K\u00e4yt\u00e4 nukkekotia tai luokkahuoneen huonekalunurkkia: oppilaat siirt\u00e4v\u00e4t fyysisesti pienioishuonekaluja ennen ty\u00f6lehtiteht\u00e4v\u00e4\u00e4. Oikeiden huonekalujen mittaaminen viivoittimella yhdist\u00e4\u00e4 konkreeettisen kokemuksen paperiteht\u00e4v\u00e4\u00e4n.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Huonekalut ovat universaali aihe \u2014 jokaisella lapsella on kokemus tuoleista, p\u00f6ydist\u00e4 ja s\u00e4ngyist\u00e4. Aloita kuvapohjaisesta huonekalujen tunnistamisesta ja nime\u00e4misest\u00e4 ja lis\u00e4\u00e4 suomenkielisi\u00e4 prepositioita asteittain. Kuvitetut sanakortit huonekalusanoista tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta mittakaavaisilla suunnitteluteht\u00e4vill\u00e4: laske huonekalupintojen pinta-ala ja piiri, vertaile erilaisten j\u00e4rjestelyjen tilatehokkuutta ja tutki suomalaista muotoiluperinnett\u00e4 Aallon koivuisista tuoleista moderneihin kest\u00e4v\u00e4n kehityksen ratkaisuihin.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Huonej\u00e4rjestelyn suunnittelukansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan huonej\u00e4rjestelysuunnitelmat koko jakson ajalta. Arvioi avaruudellisen sanaston kehittymist\u00e4, geometristen muotojen tunnistamisen tarkkuutta ja kirjallisten kuvausten rikastumista.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Prepositioiden k\u00e4ytt\u00f6teht\u00e4v\u00e4',
      criteria: 'N\u00e4yt\u00e4 oppilaalle valokuva huoneesta ja pyyd\u00e4 h\u00e4nt\u00e4 kirjoittamaan viisi lausetta, jotka kuvaavat huonekalujen sijainteja eri prepositioita k\u00e4ytt\u00e4en. Arvioi prepositioiden oikeellisuutta, monipuolisuutta ja lauserakenteiden tarkkuutta.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'Geometristen muotojen tunnistuskoe',
      criteria: 'Pyyd\u00e4 oppilasta tunnistamaan v\u00e4hint\u00e4\u00e4n kahdeksan geometrista muotoa luokkahuoneen huonekaluista ja nime\u00e4m\u00e4\u00e4n kunkin muodon. Arvioi muotojen tunnistamisen tarkkuutta, geometrisen sanaston k\u00e4ytt\u00f6\u00e4 ja kyky\u00e4 selitt\u00e4\u00e4 muodon ominaisuuksia.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (geometria ja mittaaminen)',
      connection: 'Huonekalut ilment\u00e4v\u00e4t geometrisia muotoja: suorakaiteen muotoiset p\u00f6yt\u00e4levyt, py\u00f6re\u00e4t kellot, literi\u00f6nmuotoiset jalat. POPS 2014:n matematiikan tavoitteet muotojen tunnistamisesta ja mittaamisesta toteutuvat luonnollisesti huonekalukontekstissa.',
      activity: 'Huonekalumuotojen tunnistusteht\u00e4v\u00e4n j\u00e4lkeen oppilaat mittaavat luokan huonekaluja viivoittimilla ja laskevat pinta-aloja ja piirej\u00e4.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Huonekalut rikastuttavat avaruudellista sanastoa: prepositiot, kokojen vertailu ja kuvaileva kirjoittaminen kehittyv\u00e4t luonnollisesti huonetilojen kuvailussa.',
      activity: 'Prepositioty\u00f6lehden j\u00e4lkeen oppilaat kirjoittavat kappaleen, jossa kuvaavat oman huoneensa j\u00e4rjestyst\u00e4 k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 eri prepositiota.',
    },
    {
      subject: 'K\u00e4sity\u00f6 ja muotoilu',
      connection: 'Suomalainen muotoiluperinne tekee huonekaluista kulttuurisesti merkityksellisen aiheen. Huonekalujen suunnitteluperiaatteet \u2014 toimivuus, kauneus ja materiaalivalinnat \u2014 yhdist\u00e4v\u00e4t k\u00e4sity\u00f6n ja matemaattisen ajattelun.',
      activity: 'Mittakaavapiirustuksen j\u00e4lkeen oppilaat suunnittelevat oman huonekalun huomioiden toimivuuden, materiaalit ja geometriset muodot.',
    },
  ],

  uniqueAngle: 'Huonekaluaiheiset ty\u00f6lehdet ovat pedagogisesti poikkeuksellisia, koska ne sijaitsevat avaruudellisen hahmottamisen, geometrian ja toiminnallisen luokittelun risteyskohdassa \u2014 ja jokainen lapsi on fyysisess\u00e4 vuorovaikutuksessa huonekalujen kanssa koko p\u00e4iv\u00e4n. T\u00e4m\u00e4 jatkuva, konkreettinen yhteys tekee huonekaluista yhden harvoista teemoista, joissa abstraktit matemaattiset k\u00e4sitteet saavat v\u00e4litt\u00f6m\u00e4n merkityksen: suorakaiteen muotoinen p\u00f6yt\u00e4levy, py\u00f6re\u00e4 kello, lieri\u00f6nm\u00e4inen tuolinjalka. Suomessa huonekalusuunnittelun arvostus on poikkeuksellisen korkealla \u2014 Alvar Aalto, Eero Aarnio ja Marimekko ovat osa kansallista identiteetti\u00e4. T\u00e4m\u00e4 kulttuurinen merkitys tekee huonekaluteemasta erityisen kiinnostavan suomalaisille lapsille. Avaruudellinen hahmotus on laajalti tunnustettu kriittiseksi ennustajaksi menestyksest\u00e4 matematiikassa ja luonnontieteiss\u00e4, ja huonekalujen j\u00e4rjestely on luontaisesti avaruudellista. Prepositioiden harjoittelu huonekalukonteksteissa rakentaa mentaalisia avaruudellisia malleja, jotka tukevat geometriaa, koordinaattij\u00e4rjestelmi\u00e4 ja kartanlukua. POPS 2014 korostaa ymp\u00e4rist\u00f6n havainnointia ja tutkivaa oppimista, ja huonekaluty\u00f6lehdet tarjoavat t\u00e4h\u00e4n ihanteellisen kontekstin.',

  researchCitation: 'Newcombe, N. S. & Frick, A. (2010). Early Education for Spatial Intelligence: Why, What, and How. Mind, Brain, and Education. Tutkimus osoitti, ett\u00e4 avaruudellisten taitojen varhainen kehitt\u00e4minen konkreettisten esineiden \u2014 kuten huonekalujen \u2014 j\u00e4rjestelyn kautta ennustaa merkitt\u00e4v\u00e4sti my\u00f6hemp\u00e4\u00e4 matemaattista ja tieteellist\u00e4 menestyst\u00e4.',

  culturalNotes: 'Suomessa huonekalumuotoilu on osa kansallista identiteetti\u00e4: Alvar Aallon koivuiset tuolit, Artekin huonekalut ja suomalainen minimalistinen suunnittelufilosofia ovat kansainv\u00e4lisesti tunnettuja. POPS 2014 painottaa ymp\u00e4rist\u00f6n havainnointia ja tutkivaa oppimista, ja kodin huonekalut tarjoavat lapsille v\u00e4litt\u00f6m\u00e4n, p\u00e4ivitt\u00e4isen kontekstin geometrian ja avaruudellisen hahmotuksen harjoitteluun.',

  snippetDefinition: 'Huonekaluaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t tuoleja, p\u00f6yti\u00e4, s\u00e4nkyj\u00e4, hyllyj\u00e4 ja muita huonekaluja avaruudellisen hahmotuksen, geometrian ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t prepositioharjoituksia, muotojen tunnistamista, huonej\u00e4rjestelyn suunnittelua ja laskuteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille yksinkertaista yhdist\u00e4mist\u00e4 ja nime\u00e4mist\u00e4, vanhemmille mittakaavaisia suunnitteluteht\u00e4vi\u00e4.',
    'Aloita tutustumalla huonekalukuvituksiin ja nime\u00e4m\u00e4ll\u00e4 huonekalut yhdess\u00e4 lapsen kanssa ennen teht\u00e4v\u00e4n aloittamista.',
    'Yhdist\u00e4 ty\u00f6lehti kodin tutkimiseen: teht\u00e4v\u00e4n j\u00e4lkeen k\u00e4velk\u00e4\u00e4 huoneesta toiseen ja etsik\u00e4\u00e4 vastaavia huonekaluja.',
    'Harjoittele prepositioita arkitilanteissa: kysy, miss\u00e4 kaukos\u00e4\u00e4din on, mihin kirjat kuuluvat ja miksi tietyt huonekalut ovat tietyiss\u00e4 paikoissa.',
    'Lis\u00e4\u00e4 geometrian ulottuvuus: pyyd\u00e4 lasta tunnistamaan ymp\u00e4r\u00f6it\u00e4, suorakulmioita ja kolmioita huonekaluista.',
    'Kierr\u00e4 lapsen joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi tuolissa on nelj\u00e4 jalkaa tai Mink\u00e4 muotoinen hylly on.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet kansioon ja vertailkaa avaruudellisen sanaston ja geometrisen tietoisuuden kehittymist\u00e4 ajan my\u00f6t\u00e4.',
  ],

  limitations: 'Huonekaluty\u00f6lehdet kuvaavat tyypillisesti l\u00e4nsimaisia huonekalutyyppej\u00e4, mik\u00e4 voi olla rajoittavaa lapsille, joiden kodeissa k\u00e4ytet\u00e4\u00e4n eri kulttuurien perinteisi\u00e4 huonekaluja tai asumismuotoja. Avaruudellisen hahmotuksen teht\u00e4v\u00e4t voivat olla haastavia lapsille, joilla on visuospatiaalisia vaikeuksia \u2014 t\u00e4ll\u00f6in konkreettinen nukkekotiharjoittelu ennen paperiteht\u00e4v\u00e4\u00e4 auttaa.',

  themeComparisons: [
    {
      vsThemeId: 'household',
      summary: 'Kotitalousty\u00f6lehdet kattavat kodin laajasti: rutiinit, turvallisuuden ja huoneiden tunnistamisen. Huonekaluty\u00f6lehdet keskittyv\u00e4t yksitt\u00e4isiin huonekaluihin ja niiden geometriaan, avaruudelliseen j\u00e4rjestelyyn ja muotoiluun.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Muototy\u00f6lehdet opettavat geometrisia muotoja abstrakteina k\u00e4sittein\u00e4. Huonekaluty\u00f6lehdet osoittavat, mist\u00e4 n\u00e4m\u00e4 muodot l\u00f6ytyv\u00e4t todellisista esineist\u00e4 tehden geometriasta konkreettista.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Rakennusty\u00f6lehdet tutkivat rakentamisen prosessia ja materiaaleja. Huonekaluty\u00f6lehdet keskittyv\u00e4t valmiiden esineiden k\u00e4ytt\u00f6\u00f6n, j\u00e4rjestelyyn ja suunnitteluun tilassa.',
    },
    {
      vsThemeId: 'colors',
      summary: 'V\u00e4rity\u00f6lehdet opettavat v\u00e4rien tunnistamista ja sekoittamista. Huonekaluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t v\u00e4rej\u00e4 osana kokonaisvaltaista tilasuunnittelua, jossa v\u00e4ri on yksi monista suunnitteluelementeist\u00e4.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'huonekaluaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Huonekaluaiheiset v\u00e4ritysteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hienomotoriikkaa samalla kun lapset v\u00e4ritt\u00e4v\u00e4t yksityiskohtaisia huonekuvia ja tunnistavat geometrisia muotoja huonekaluista.',
    },
    {
      appId: 'matching-app',
      anchorText: 'huonekalujen yhdist\u00e4mispelit',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista muistia ja erottelutaitoa, kun lapset yhdist\u00e4v\u00e4t identtisi\u00e4 huonekalupareja tai huonekalun sen varjoon.',
    },
    {
      appId: 'word-search',
      anchorText: 'huonekalusanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat huonekalusanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten kirjahylly, vaatekaappi, nojatuoli ja y\u00f6p\u00f6yt\u00e4 sanaruudukosta.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'huonekalujen lajitteluteht\u00e4v\u00e4t',
      context: 'Lajitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelutaitoja, kun lapset lajittelevat huonekaluja huoneen, toiminnon tai koon mukaan.',
    },
  ],

  expertTips: [
    {
      tip: 'K\u00e4yt\u00e4 nukkekotia tai pahvilaatikkohuonetta ty\u00f6lehden rinnalla. Kun lapsi siirt\u00e4\u00e4 fyysisesti pienoishuonekaluja ennen paperiteht\u00e4v\u00e4\u00e4, avaruudellinen ymm\u00e4rrys siirtyy luontevasti kaksiulotteiseen esitykseen.',
      source: 'Erityisopettaja, avaruudellinen hahmotus',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 huonekaluty\u00f6lehdet kodin muotoiluprojektiin: oppilaat kuvaavat oman huoneensa, piirt\u00e4v\u00e4t pohjapiirustuksen ja suunnittelevat parannuksia. T\u00e4m\u00e4 antaa geometrialle ja avaruudelliselle ajattelulle todellisen merkityksen.',
      source: 'Luokanopettaja, tutkiva oppiminen',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Tutustuta oppilaat suomalaiseen muotoiluun huonekaluteht\u00e4vien kautta: Aallon koivuinen jakkara, Aarnion palloluoli ja Artekin hyllyj\u00e4rjestelm\u00e4t tarjoavat innostavia esimerkkej\u00e4 muotoilun ja geometrian yhteydest\u00e4.',
      source: 'Taide- ja k\u00e4sity\u00f6opettaja, suomalainen muotoilu',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 2. Easter (pääsiäinen) ───────────────────────────────────────────────

const easterFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja haluaa hy\u00f6dynt\u00e4\u00e4 p\u00e4\u00e4si\u00e4isen innostusta oppimiseen, mutta tarvitsee teht\u00e4vi\u00e4, jotka yhdist\u00e4v\u00e4t juhlatunnelman akateemisiin taitoihin.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 p\u00e4\u00e4si\u00e4isaiheisia ty\u00f6lehti\u00e4, joissa oppilaat laskevat p\u00e4\u00e4si\u00e4ismunia kuvista, etsiv\u00e4t p\u00e4\u00e4si\u00e4issanastoa sanahauista, t\u00e4ytt\u00e4v\u00e4t kuviologiikkateht\u00e4vi\u00e4 p\u00e4\u00e4si\u00e4iskuvioilla ja v\u00e4ritt\u00e4v\u00e4t p\u00e4\u00e4si\u00e4iskohtauksia.',
      outcome: 'Oppilaat tekev\u00e4t teht\u00e4vi\u00e4 innokkaasti, koska aihe on ajankohtainen ja juhlatunnelmainen. Matemaattiset taidot, sanasto ja hienomotoriikka kehittyv\u00e4t luonnollisesti p\u00e4\u00e4si\u00e4iskontekstissa.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa tehd\u00e4 p\u00e4\u00e4si\u00e4isviikosta opettavaisen ilman, ett\u00e4 lapsi tuntee olevansa koulussa loman aikana.',
      solution: 'Vanhempi piilottaa p\u00e4\u00e4si\u00e4ismunajahdissa ty\u00f6lehti\u00e4 munien sis\u00e4\u00e4n: laskuteht\u00e4vi\u00e4, sanapelit\u00e4, v\u00e4ritysteht\u00e4vi\u00e4 ja kuviopulmia. Jokainen l\u00f6ydetty muna sis\u00e4lt\u00e4\u00e4 lyhyen, hauskan teht\u00e4v\u00e4n.',
      outcome: 'Lapsi nauttii p\u00e4\u00e4si\u00e4ismunajahdista ja oppii samalla. P\u00e4\u00e4si\u00e4isviikko yhdist\u00e4\u00e4 juhlimisen ja oppimisen niin luonnollisesti, ettei lapsi edes huomaa harjoittelevansa akateemisia taitoja.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'P\u00e4\u00e4si\u00e4issymbolien kirjo', value: '10+ symbolia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4rtysteht\u00e4vi\u00e4 p\u00e4\u00e4si\u00e4iskohtauksilla ja kuvallisia laskuteht\u00e4vi\u00e4, joissa p\u00e4\u00e4si\u00e4ismunat, tiput ja puput tarjoavat visuaalisesti rikkaan ymp\u00e4rist\u00f6n laskemiselle ja luokittelulle.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet p\u00e4\u00e4si\u00e4ismunajahtiin: piilota teht\u00e4vi\u00e4 muovimunien sis\u00e4\u00e4n tai j\u00e4rjest\u00e4 p\u00e4\u00e4si\u00e4isaskartelupiste, jossa lajittelut ja laskemiset tapahtuvat oikeilla esineill\u00e4 ennen paperiteht\u00e4v\u00e4\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'P\u00e4\u00e4si\u00e4inen on visuaalisesti rikas teema, joka ei vaadi laajaa kielitaitoa alkuun. Aloita kuvien yhdist\u00e4misest\u00e4 ja laskemisesta, lis\u00e4\u00e4 p\u00e4\u00e4si\u00e4issanastoa asteittain: muna, pupu, tippu, kori, pajunoksa. Kuvitetut sanakortit tukevat sanaston oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta loogisilla p\u00e4\u00e4si\u00e4ispulmilla: munien v\u00e4rikoodattuja sarjoja, symmetristen kuvioiden suunnittelua munille ja monivaiheisia sanallisia teht\u00e4vi\u00e4, joissa p\u00e4\u00e4si\u00e4ismunajahtien tuloksia vertaillaan taulukoissa.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'P\u00e4\u00e4si\u00e4isprojektikansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan p\u00e4\u00e4si\u00e4isaiheiset ty\u00f6lehdet kokonaisuudeksi. Arvioi matemaattisten taitojen, sanaston ja kuvioajattelun kehittymist\u00e4 teht\u00e4vien monipuolisuuden kautta.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'P\u00e4\u00e4si\u00e4ismunajahtiraportti',
      criteria: 'Oppilas kirjoittaa raportin p\u00e4\u00e4si\u00e4ismunajahdista: montako munaa l\u00f6ytyi, mist\u00e4 ne l\u00f6ytyiv\u00e4t ja mink\u00e4v\u00e4risi\u00e4 ne olivat. Arvioi lukujen k\u00e4ytt\u00f6\u00e4, paikkatietojen kuvailua ja sanaston rikkautta.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Kuviologiikkateht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta jatkamaan p\u00e4\u00e4si\u00e4iskuviosarjaa ja selitt\u00e4m\u00e4\u00e4n s\u00e4\u00e4nt\u00f6. Arvioi kuvion tunnistamisen tarkkuutta, selityksen selkeytt\u00e4 ja kyky\u00e4 luoda omia kuviosarjoja.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (kev\u00e4\u00e4n merkit)',
      connection: 'P\u00e4\u00e4si\u00e4inen osuu kev\u00e4\u00e4seen, jolloin luonto her\u00e4\u00e4: muuttolinnut palaavat, lumi sulaa ja kasvit alkavat versoa. POPS 2014:n ymp\u00e4rist\u00f6oppi hy\u00f6tyy p\u00e4\u00e4si\u00e4isteeman yhdist\u00e4misest\u00e4 kev\u00e4\u00e4n luonnonilmi\u00f6iden havainnointiin.',
      activity: 'P\u00e4\u00e4si\u00e4isty\u00f6lehden j\u00e4lkeen oppilaat menevj\u00e4t ulos havainnoimaan kev\u00e4\u00e4n merkkej\u00e4 ja kirjaavat l\u00f6yd\u00f6ksens\u00e4 havainnointilomakkeelle.',
    },
    {
      subject: 'Matematiikka',
      connection: 'P\u00e4\u00e4si\u00e4ismunat tarjoavat erinomaisen kontekstin laskemiselle, lajittelulle ja kuvioajattelulle: munien jakaminen yht\u00e4 suuriin ryhmiin, symmetristen kuvioiden luominen ja tilastollinen vertailu yhdist\u00e4v\u00e4t matemaattiset taidot juhlateemaan.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat j\u00e4rjest\u00e4v\u00e4t p\u00e4\u00e4si\u00e4ismunajahdiin kerj\u00e4tyt esineet ryhm\u00e4ksi ja laativat pylv\u00e4sdiagrammin l\u00f6yd\u00f6ksist\u00e4.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'P\u00e4\u00e4si\u00e4issanasto on rikas ja kulttuurisesti merkityksellinen: pajunoksa, virpominen, tippu, kori, v\u00e4rj\u00e4tty muna. Sanahaut ja sanapelit rikastuttavat p\u00e4\u00e4si\u00e4iseen liittyv\u00e4\u00e4 sanastoa.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan p\u00e4\u00e4si\u00e4ispupun seikkailusta k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 p\u00e4\u00e4si\u00e4issanaa.',
    },
  ],

  uniqueAngle: 'P\u00e4\u00e4si\u00e4isaiheiset ty\u00f6lehdet ovat pedagogisesti arvokkaita, koska ne hy\u00f6dynt\u00e4v\u00e4t lasten luonnollista innostusta juhlakauteen ja kanavoivat sen akateemiseksi oppimiseksi. P\u00e4\u00e4si\u00e4inen on Suomessa erityisen rikas teema: se yhdist\u00e4\u00e4 kev\u00e4\u00e4n her\u00e4\u00e4misen, perinteiset virpomistavan, koristeltujen pajunoksien tekemisen ja munajahtien j\u00e4rjest\u00e4misen. T\u00e4m\u00e4 kulttuurinen monikerroksisuus tarjoaa ty\u00f6lehdille ep\u00e4tavallisen rikkaan kontekstin: matemaattisia sarjoja p\u00e4\u00e4si\u00e4ismunakuvioilla, kev\u00e4\u00e4n luonnontieteen havainnointia, perinnesanaston oppimista ja luovaa ilmaisua koristelun kautta. P\u00e4\u00e4si\u00e4isen ajallinen rajoittuneisuus \u2014 se kest\u00e4\u00e4 vain muutaman viikon \u2014 luo luonnollisen motivaation intensiiviselle opiskelujaksolle, jossa lapset tekev\u00e4t teht\u00e4vi\u00e4 erityisen innokkaasti. POPS 2014:n kulttuuriperinteen tuntemus ja ymp\u00e4rist\u00f6opin kev\u00e4\u00e4n merkkien havainnointi yhdistyv\u00e4t luontevasti p\u00e4\u00e4si\u00e4isteemassa. Suomalaiset p\u00e4\u00e4si\u00e4isperinteet kuten virpominen ja pajunoksien koristelu ovat ainutlaatuisia kulttuurisia elementtej\u00e4, jotka rikastuttavat oppimiskokemusta.',

  researchCitation: 'Pugh, K. J. & Bergin, D. A. (2006). Motivational Influences on Transfer. Educational Psychologist. Tutkimus osoitti, ett\u00e4 teemoitettu opetus, joka hy\u00f6dynt\u00e4\u00e4 lasten henkil\u00f6kohtaisia kiinnostuksen kohteita ja kulttuurisia juhlia, lis\u00e4\u00e4 merkitt\u00e4v\u00e4sti oppimisen siirtovaikutusta arkiel\u00e4m\u00e4\u00e4n.',

  culturalNotes: 'Suomessa p\u00e4\u00e4si\u00e4inen on rikas perinteiden juhla: lapset virpovat pajunoksilla, koristelevat koti\u00e4, v\u00e4rj\u00e4\u00e4v\u00e4t munia ja osallistuvat munajahtiin. POPS 2014 korostaa kulttuuriperinteen tuntemusta, ja p\u00e4\u00e4si\u00e4isty\u00f6lehdet tukevat t\u00e4t\u00e4 tavoitetta yhdist\u00e4m\u00e4ll\u00e4 perinteiset tavat akateemisiin teht\u00e4viin. Suomalaisen p\u00e4\u00e4si\u00e4isen ainutlaatuisuus \u2014 virpominen ja pajut \u2014 tekee teemasta kulttuurisesti erityisen.',

  snippetDefinition: 'P\u00e4\u00e4si\u00e4isaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t p\u00e4\u00e4si\u00e4ismunia, pupuja, tippuja ja kev\u00e4\u00e4n symboleita matematiikan, lukutaidon ja kuvioajattelun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuteht\u00e4vi\u00e4, sanahakuja, v\u00e4ritysteht\u00e4vi\u00e4 ja kuviologiikkaa.',

  snippetHowTo: [
    'Ajoita p\u00e4\u00e4si\u00e4isty\u00f6lehdet p\u00e4\u00e4si\u00e4ist\u00e4 edelt\u00e4ville viikoille, jolloin lasten innostus on korkeimmillaan.',
    'Valitse kaksi tai kolme eri taitoalueen ty\u00f6lehtityyppi\u00e4 \u2014 esimerkiksi laskuteht\u00e4v\u00e4, sanahaku ja kuviojatkoteht\u00e4v\u00e4.',
    'Aloita p\u00e4\u00e4si\u00e4issymbolien tunnistamisella: k\u00e4yk\u00e4\u00e4 l\u00e4pi munat, puput, tiput, korit ja pajunoksat.',
    'Yhdist\u00e4 ty\u00f6lehti p\u00e4\u00e4si\u00e4isaskarteluun: v\u00e4ritysteht\u00e4v\u00e4n j\u00e4lkeen tehk\u00e4\u00e4 oikeita p\u00e4\u00e4si\u00e4ismunia tai pajukoristeit\u00e4.',
    'J\u00e4rjest\u00e4 p\u00e4\u00e4si\u00e4ismunajahteja, joissa l\u00f6ydetyt munat sis\u00e4lt\u00e4v\u00e4t piilotettuja teht\u00e4vi\u00e4 ja pulmia.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi p\u00e4\u00e4si\u00e4inen on kev\u00e4\u00e4ll\u00e4 tai Montako munaa tarvitaan, jos jokainen saa kolme.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet ja reflektoikaa yhdess\u00e4, mit\u00e4 opittiin p\u00e4\u00e4si\u00e4isteeman kautta.',
  ],

  limitations: 'P\u00e4\u00e4si\u00e4inen on uskonnollinen juhla, ja osa perheist\u00e4 ei viet\u00e4 sit\u00e4. Opettajien tulee tarjota vaihtoehtoisia kev\u00e4\u00e4tteemaisia teht\u00e4vi\u00e4 n\u00e4ille oppilaille. P\u00e4\u00e4si\u00e4isen ajallinen rajoittuneisuus tarkoittaa, ett\u00e4 ty\u00f6lehdet ovat relevantteja vain muutaman viikon vuodessa \u2014 suunnittele k\u00e4ytt\u00f6 ennakkoon.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Juhlaty\u00f6lehdet kattavat monia juhlapyhi\u00e4 ympj\u00e4ri vuoden. P\u00e4\u00e4si\u00e4isty\u00f6lehdet syventyv\u00e4t yhteen juhlaan ja sen yksityiskohtiin: munajahdista virpomiseen ja kev\u00e4\u00e4n luontoon.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Kev\u00e4tty\u00f6lehdet tutkivat kev\u00e4\u00e4n luonnonilmi\u00f6it\u00e4 laajasti. P\u00e4\u00e4si\u00e4isty\u00f6lehdet yhdist\u00e4v\u00e4t kev\u00e4\u00e4n perinteisiin ja juhlatapoihin, tarjoten kulttuurisesti rikkaamman kontekstin.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Kukkaty\u00f6lehdet keskittyv\u00e4t kasvien tunnistamiseen ja luonnontieteen k\u00e4sitteisiin. P\u00e4\u00e4si\u00e4isty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t kev\u00e4\u00e4n kukkimista osana laajempaa juhlateem\u00e4\u00e4.',
    },
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet tutkivat el\u00e4inkuntaa laajasti. P\u00e4\u00e4si\u00e4isty\u00f6lehdet keskittyv\u00e4t kev\u00e4\u00e4n symboliel\u00e4imiin \u2014 pupuihin, tippuihin ja karitsoihin \u2014 juhlakontekstissa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'p\u00e4\u00e4si\u00e4isaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'P\u00e4\u00e4si\u00e4isaiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan kehitt\u00e4misen juhlatunnelmaan, kun lapset v\u00e4ritt\u00e4v\u00e4t p\u00e4\u00e4si\u00e4ismunakuvioita, pupuja ja kev\u00e4tkohtauksia.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'p\u00e4\u00e4si\u00e4ismunien laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t aritmetiikkaa p\u00e4\u00e4si\u00e4iskuvien kautta, kun lapset etsiv\u00e4t ja laskevat piilotettuja munia, tippuja ja koreja kohtauskuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'p\u00e4\u00e4si\u00e4issanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat p\u00e4\u00e4si\u00e4issanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten pajunoksa, virpominen, tippu ja munajahtiin sanaruudukosta.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'p\u00e4\u00e4si\u00e4isen kuviojuna-teht\u00e4v\u00e4t',
      context: 'Kuviojunateht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t p\u00e4\u00e4si\u00e4issymboleita toistuvien sarjojen harjoitteluun, opettaen matemaattista kuvioajattelua juhlacontekstissa.',
    },
  ],

  expertTips: [
    {
      tip: 'Ajoita p\u00e4\u00e4si\u00e4isty\u00f6lehdet niin, ett\u00e4 ne alkavat kaksi viikkoa ennen p\u00e4\u00e4si\u00e4ist\u00e4 ja huipentuvat munajahtiin viimeisen\u00e4 p\u00e4iv\u00e4n\u00e4. T\u00e4m\u00e4 luo luonnollisen motivaatiokaaren.',
      source: 'Luokanopettaja, teemaopetus',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Yhdist\u00e4 p\u00e4\u00e4si\u00e4isty\u00f6lehdet todellisiin perinteisiin: virpomiskorttien kirjoittaminen, munien v\u00e4rj\u00e4\u00e4minen ja pajunoksien koristelu. T\u00e4m\u00e4 antaa teht\u00e4ville autenttisen kulttuurisen merkityksen.',
      source: 'Kulttuurikasvatuksen asiantuntija, suomalaiset perinteet',
      gradeRange: 'Esiopetus\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 p\u00e4\u00e4si\u00e4ismunajahtia matemaattisena tutkimuksena: oppilaat dokumentoivat l\u00f6yd\u00f6ksens\u00e4, lajittelevat v\u00e4rin ja koon mukaan ja luovat tilastograafeja. T\u00e4m\u00e4 yhdist\u00e4\u00e4 leikin data-analyysiin.',
      source: 'Matematiikan opettaja, tutkiva oppiminen',
      gradeRange: '1.\u20133. lk',
    },
  ],`;

// ── 3. Halloween ─────────────────────────────────────────────────────────

const halloweenFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Tokaluokan opettaja haluaa hy\u00f6dynt\u00e4\u00e4 halloween-innostusta luovaan kirjoittamiseen ja matemaattiseen ongelmanratkaisuun.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 halloween-aiheisia ty\u00f6lehti\u00e4, joissa oppilaat ratkaisevat arvoituspulmia h\u00e4m\u00e4h\u00e4kki- ja lepakkokuvilla, etsiv\u00e4t piilotettuja esineit\u00e4 kummitustalokohtauksista, t\u00e4ytt\u00e4v\u00e4t halloween-sanastolla sanapelit\u00e4 ja suunnittelevat omia halloween-kuvioitaan.',
      outcome: 'Oppilaat tekev\u00e4t teht\u00e4vi\u00e4 poikkeuksellisen innokkaasti halloween-teeman ansiosta. Ongelmanratkaisutaidot, sanasto ja luova ajattelu kehittyv\u00e4t kiehtovassa kontekstissa.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa tarjota halloween-viikolla opettavaista sis\u00e4lt\u00f6\u00e4, joka ei ole liian pelottavaa herk\u00e4lle lapselle.',
      solution: 'Vanhempi valitsee yst\u00e4v\u00e4llisi\u00e4 halloween-ty\u00f6lehti\u00e4: hymyilevia kurpitsoita laskuteht\u00e4viss\u00e4, s\u00f6p\u00f6j\u00e4 lepakkoja kuvioharjoituksissa, hassuja kummituksia v\u00e4ritysteht\u00e4viss\u00e4 ja halloween-esineit\u00e4 lajittelupulmissa.',
      outcome: 'Lapsi nauttii halloween-teemasta pelk\u00e4\u00e4m\u00e4tt\u00e4 ja oppii samalla. Teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t juhlatunnelman matemaattisiin ja kielellisiin taitoihin sopivalla intensiteetill\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Halloween-symbolien kirjo', value: '12+ symbolia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota piilokuvateht\u00e4vi\u00e4 halloween-kohtauksissa ja yksityiskohtaisia v\u00e4ritysteht\u00e4vi\u00e4 kurpitsataloista ja halloween-maisemista. Visuaaliset etsint\u00e4teht\u00e4v\u00e4t aktivoivat tarkkaa havainnointia kiehtovissa kuvissa.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet halloween-askarteluun: kurpitsankaivaminen, lepakko-origami ja h\u00e4m\u00e4h\u00e4kinverkkoaskartelu. Lajitteluteht\u00e4v\u00e4t voivat k\u00e4ytt\u00e4\u00e4 oikeita halloween-esineeit\u00e4 ennen paperiteht\u00e4v\u00e4\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Halloween-kuvasto on universaalisti tunnistettavaa: kurpitsat, lepakot, h\u00e4m\u00e4h\u00e4kit. Aloita kuvien yhdist\u00e4misest\u00e4 ja nime\u00e4misest\u00e4 ja lis\u00e4\u00e4 halloween-sanastoa asteittain. Kuvitetut sanakortit ja teht\u00e4v\u00e4t minimaalisella kielisis\u00e4ll\u00f6ll\u00e4 tukevat alkuvaiheen oppijoita.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta loogisilla pulmateht\u00e4vill\u00e4: sudokuilla halloween-kuvilla, kryptogrammeilla, reittipulmilla kummitustalossa ja monivaiheisilla sanallisilla teht\u00e4vill\u00e4, joissa halloween-karkkien jakaminen vaatii ker\u00e4t\u00e4\u00e4n ja jakolaskua.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Halloween-pulmavihko',
      criteria: 'Ker\u00e4\u00e4 oppilaan halloween-teht\u00e4v\u00e4t kokoelmaksi. Arvioi ongelmanratkaisustrategioiden kehittymist\u00e4, sanaston laajuutta ja luovuutta omissa halloween-kuvioissa.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Halloween-tarinan kirjoitus',
      criteria: 'Oppilas kirjoittaa halloween-tarinan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n kahdeksaa halloween-sanaa. Arvioi sanaston rikkautta, tarinan rakennetta ja kuvailevien ilmausten k\u00e4ytt\u00f6\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Piilokuvien etsint\u00e4haaste',
      criteria: 'Anna oppilaalle halloween-kohtauskuva ja pyyd\u00e4 l\u00f6yt\u00e4m\u00e4\u00e4n kaikki piilotetut esineet tietyn ajan kuluessa. Arvioi havainnointitarkkuutta, systemaattista etsint\u00e4strategiaa ja l\u00f6yt\u00f6jen nime\u00e4mist\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Kuvataide ja k\u00e4sity\u00f6',
      connection: 'Halloween tarjoaa rikkaan visuaalisen kontekstin luovalle ilmaisulle: kurpitsankaivaminen, naamioiden valmistus ja kummitusmaisten kohtausten piirt\u00e4minen yhdist\u00e4v\u00e4t kuvallisen ilmaisun ja mielikuvituksen.',
      activity: 'V\u00e4ritysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat ja toteuttavat oman halloween-naamion k\u00e4ytt\u00e4en eri tekniikoita: leikkaamista, liimaamista ja maalaamista.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Halloween-symbolit tarjoavat motivoivan kontekstin laskemiselle, lajittelulle ja loogiselle p\u00e4\u00e4ttelylle: kurpitsoiden laskeminen, karkkien jakaminen ja halloween-sudokut kehitt\u00e4v\u00e4t matemaattista ajattelua.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat pelaavat halloween-bingoa, jossa voittaminen vaatii matemaattisten teht\u00e4vien ratkaisemista.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Halloween-sanasto on rikas ja mielikuvituksellinen: kummitus, noita, lepakko, h\u00e4m\u00e4h\u00e4kinverkko, kurpitsalyhty. Luova kirjoittaminen ja kuvaileva kieli kehittyv\u00e4t luontevasti halloween-tarinoiden kirjoittamisessa.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen halloween-tarinan k\u00e4ytt\u00e4en mahdollisimman monta oppimaansa sanaa.',
    },
  ],

  uniqueAngle: 'Halloween-aiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t lasten luontaista kiehtoutumista salaperist\u00e4, j\u00e4nnitt\u00e4vist\u00e4 ja mielikuvituksellisista aiheista, kanavoiden t\u00e4m\u00e4n energian akateemiseksi oppimiseksi. Halloween-teema on pedagogisesti erityinen, koska se aktivoi mielikuvitusta ja luovaa ajattelua tavoilla, joihin monet muut teemat eiv\u00e4t pysty. Kummitustalot, lepakot ja h\u00e4m\u00e4h\u00e4kinverkot luovat kohtauksia, joissa piilokuvateht\u00e4v\u00e4t, loogiseet pulmat ja luova kirjoittaminen saavat tavallista intensiivisemm\u00e4n motivaatiotaustan. Suomessa halloween on suhteellisen uusi mutta nopeasti kasvanut juhla, ja lapset ovat erityisen innostuneita siit\u00e4. T\u00e4m\u00e4 innostus muuttuu opettajan ty\u00f6kaluksi, kun se kanavoidaan matemaattisiin etsint\u00e4teht\u00e4viin, sanaston rikastamiseen ja loogiseen p\u00e4\u00e4ttelyyn. Halloween-teeman ajallinen rajoittuneisuus luo samanlaisen intensiivisen oppimisjakson kuin p\u00e4\u00e4si\u00e4inen, ja lasten motivaatio on huipussaan lokakuussa.',

  researchCitation: 'Hidi, S. & Renninger, K. A. (2006). The Four-Phase Model of Interest Development. Educational Psychologist. Tutkimus osoitti, ett\u00e4 tilannekohtainen kiinnostus \u2014 jollaista halloween-teema luontaisesti her\u00e4tt\u00e4\u00e4 \u2014 voidaan kanavoida syvemm\u00e4ksi ainekohtaiseksi kiinnostukseksi oikein suunniteltujen teht\u00e4vien avulla.',

  culturalNotes: 'Halloween on Suomessa suhteellisen tuore juhla, mutta se on kasvanut nopeasti lasten suosioon. POPS 2014 ei mainitse halloweenia nimelt\u00e4, mutta sen luovan ilmaisun, mielikuvituksen ja kulttuuritietoisuuden tavoitteet toteutuvat luontevasti halloween-teemassa. Opettajien kannattaa huomioida, ett\u00e4 osa perheist\u00e4 ei viet\u00e4 halloweenia, ja tarjota vaihtoehtoisia teht\u00e4vi\u00e4.',

  snippetDefinition: 'Halloween-aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kurpitsoja, kummituksia, lepakoita ja h\u00e4m\u00e4h\u00e4kkej\u00e4 matematiikan, lukutaidon ja loogisen p\u00e4\u00e4ttelyn opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t etsint\u00e4teht\u00e4vi\u00e4, sanahakuja, pulmia ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Ajoita halloween-ty\u00f6lehdet lokakuun viimeisille viikoille, jolloin lasten innostus on suurimmillaan.',
    'Valitse sopiva intensiteettitaso: nuoremmille yst\u00e4v\u00e4llisi\u00e4 hymyilevia kurpitsoja, vanhemmille j\u00e4nnitt\u00e4v\u00e4mpi\u00e4 kummitustalokohtauksia.',
    'Aloita v\u00e4ritysteht\u00e4v\u00e4ll\u00e4 tai piilokuvaetsinn\u00e4ll\u00e4 halloween-tunnelman luomiseksi ennen vaativampia teht\u00e4vi\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehti halloween-askarteluun: naamioiden tekeminen, kurpitsankaivaminen tai h\u00e4m\u00e4h\u00e4kinverkkoaskartelu.',
    'K\u00e4yt\u00e4 halloween-teht\u00e4vi\u00e4 ryhm\u00e4ty\u00f6n\u00e4: oppilaat ratkaisevat pulmia yhdess\u00e4 ja vertailevat strategioitaan.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Montako lepakkoa l\u00f6ysit tai Mik\u00e4 halloween-hahmo on suosikkisi ja miksi.',
    'P\u00e4\u00e4t\u00e4 halloween-jakso kokoavalla teht\u00e4v\u00e4ll\u00e4, jossa oppilaat k\u00e4ytt\u00e4v\u00e4t kaikkia oppimiaan taitoja.',
  ],

  limitations: 'Halloween voi olla kulttuurisesti vieras tai uskonnollisista syist\u00e4 ei-toivottu teema osalle perheist\u00e4. Opettajien tulee tarjota vaihtoehtoisia syysteemaisia teht\u00e4vi\u00e4. Pelottavat kuvat voivat ahdistaa herkki\u00e4 lapsia \u2014 valitse ik\u00e4tasolle sopivat, yst\u00e4v\u00e4llisemm\u00e4t kuvitukset nuoremmille.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Juhlaty\u00f6lehdet kattavat vuoden juhlapyh\u00e4t laajasti. Halloween-ty\u00f6lehdet syventyv\u00e4t yhteen juhlaan ja sen ainutlaatuiseen kuvastoon: kurpitsoihin, kummituksiin ja h\u00e4m\u00e4h\u00e4kkeihin.',
    },
    {
      vsThemeId: 'fairy-tales',
      summary: 'Satuty\u00f6lehdet tutkivat perinteisi\u00e4 tarinahahmoja ja narratiiveja. Halloween-ty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t samankaltaista mielikuvituksellista kuvastoa mutta yhdist\u00e4v\u00e4t sen konkreettiseen juhlaan ja sen perinteisiin.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Mets\u00e4ty\u00f6lehdet tutkivat mets\u00e4ekosysteemi\u00e4 ja sen el\u00e4imi\u00e4 luonnontieteellisesti. Halloween-ty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t mets\u00e4n y\u00f6llisi\u00e4 el\u00e4imi\u00e4 kuten lepakoita ja p\u00f6ll\u00f6j\u00e4 mielikuvituksellisessa juhlakontekstissa.',
    },
    {
      vsThemeId: 'emotions',
      summary: 'Tunnety\u00f6lehdet k\u00e4sittelev\u00e4t tunteita laajasti ja syvj\u00e4llisesti. Halloween-ty\u00f6lehdet tarjoavat turvallisen kontekstin j\u00e4nnityksen ja pelon k\u00e4sittelylle leikkis\u00e4ss\u00e4 ymp\u00e4rist\u00f6ss\u00e4.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'halloween-aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Halloween-aiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan juhlatunnelmaan, kun lapset v\u00e4ritt\u00e4v\u00e4t kurpitsoja, kummituksia ja halloween-maisemia.',
    },
    {
      appId: 'find-objects',
      anchorText: 'halloween-piilokuvateht\u00e4v\u00e4t',
      context: 'Piilokuvateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t havainnointitaitoja ja tarkkaavaisuutta, kun lapset etsiv\u00e4t piilotettuja esineit\u00e4 yksityiskohtaisista kummitustalokohtauksista.',
    },
    {
      appId: 'word-search',
      anchorText: 'halloween-sanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat halloween-sanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten kummitus, noita, kurpitsalyhty ja h\u00e4m\u00e4h\u00e4kinverkko sanaruudukosta.',
    },
    {
      appId: 'sudoku',
      anchorText: 'halloween-sudokuteht\u00e4v\u00e4t',
      context: 'Sudokuteht\u00e4v\u00e4t halloween-kuvilla kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttelj\u00e4 ja eliminointitaitoja kiehtovassa kontekstissa.',
    },
  ],

  expertTips: [
    {
      tip: 'S\u00e4\u00e4d\u00e4 halloween-teht\u00e4vien intensiteetti ik\u00e4tason mukaan: esiopetukselle hymyilevia kurpitsoja ja s\u00f6p\u00f6j\u00e4 lepakoita, kouluik\u00e4isille asteittain j\u00e4nnitt\u00e4v\u00e4mpi\u00e4 kohtauksia. Kukaan ei saa pelj\u00e4t\u00e4.',
      source: 'Lastentarhanopettaja, tunnekasvatus',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 halloween-ty\u00f6lehdet tutkivaan oppimiseen: oppilaat tutkivat lepakoiden todellista bilogiaa, h\u00e4m\u00e4h\u00e4kkien verkonkudontaa ja kurpitsojen kasvatusta. Myytt\u00e4 ja todellisuus -vertailu kehitt\u00e4\u00e4 kriittist\u00e4 ajattelua.',
      source: 'Luokanopettaja, tutkiva oppiminen',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 halloween-viikkoa ryhmj\u00e4ty\u00f6n harjoitteluun: ratkaise pulmateht\u00e4vi\u00e4 pareittain, rakenna yhteinen halloween-n\u00e4yttely ja reflektoikaa oppimisprosessia yhdess\u00e4.',
      source: 'Yhteistoiminnallisen oppimisen asiantuntija',
      gradeRange: '1.\u20133. lk',
    },
  ],`;

// ── 4. Xmas (joulu) ─────────────────────────────────────────────────────

const xmasFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Tokaluokan opettaja haluaa k\u00e4ytt\u00e4\u00e4 jouluodotusaikaa matemaattiseen ja kielelliseen harjoitteluun ilman, ett\u00e4 juhlatunnelma h\u00e4vi\u00e4\u00e4.',
      solution: 'H\u00e4n luo joulukalenterin, jossa joka luukun takana on jouluaiheinen ty\u00f6lehti: laskuteht\u00e4vi\u00e4 joulukoristeilla, sanahakuja joulusanastolla, kuviologiikkaa joulukuvioilla ja kirjoitusteht\u00e4vi\u00e4 joululahjoista.',
      outcome: 'Oppilaat odottavat innolla jokaista p\u00e4iv\u00e4\u00e4 ja kalenterin avaamista. Joulukuussa matemaattiset ja kielelliset taidot kehittyv\u00e4t huomaamatta jouluisen motivaation ansiosta.',
    },
    {
      situation: 'Kotikouluvanhempi etsii jouluaiheista sis\u00e4lt\u00f6\u00e4, joka pit\u00e4\u00e4 lapsen oppimassa jouluvalmistelujen keskell\u00e4.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 jouluaiheiset ty\u00f6lehdet joululahjavalmisteluihin: lahjakorttien kirjoittaminen harjoittaa kirjoitustaitoa, koristeiden laskeminen matematiikkaa, joulukorttien suunnittelu luovuutta ja joulusanastopulmat sanavarastoa.',
      outcome: 'Lapsi oppii joululahjojen valmistelun ohessa. Akateemiset taidot kehittyv\u00e4t jouluvalmistelujen luonnollisena osana.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Joulusymbolien kirjo', value: '15+ symbolia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4ritysteht\u00e4vi\u00e4 joulumaisemilla ja yksityiskohtaisia joulukohtauksia, joissa visuaalinen rikkaus motivoi. Joulukalenteripohjan suunnittelu yhdist\u00e4\u00e4 visuaalisen luovuuden matemaattisiin rakenteisiin.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet jouluaskarteluun: joulukoristeiden valmistaminen, piparkakkutalon rakentaminen ja lahjapaketointi. Laskuteht\u00e4v\u00e4t voivat k\u00e4ytt\u00e4\u00e4 oikeita joulukoristeit\u00e4 laskuv\u00e4linein\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Joulu on visuaalisesti rikas ja kulttuurisesti universaali juhla. Aloita joulusymbolien tunnistamisesta kuvista: kuusi, t\u00e4hti, lahjapaketti, joulupukki. Lis\u00e4\u00e4 suomalaista joulusanastoa asteittain kuvitettujen sanakorttien avulla.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta monivaiheisilla jouluaiheisilla sanallisilla teht\u00e4vill\u00e4: budjetin laskeminen joululahjoille, koristeiden jakaminen symmetrisesti kuuseen ja joulukalenterin matemaattisten sarjojen analysoiminen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Joulukalenteri-portfolio',
      criteria: 'Ker\u00e4\u00e4 oppilaan joulukuun ty\u00f6lehdet joulukalenterivihkoksi. Arvioi taitojen kehittymist\u00e4 kuukauden aikana: matemaattisen tarkkuuden, sanaston laajuuden ja luovan ilmaisun kasvua.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Joulukirje',
      criteria: 'Oppilas kirjoittaa joulukirjeen, jossa kuvailee lempijoululahjaansa tai -perintteit\u00e4\u00e4n. Arvioi kirjoituksen rakennetta, kuvailevaa kieltj\u00e4 ja joulusanaston k\u00e4ytt\u00f6\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Joulukoristeiden kuvioteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta luomaan ja jatkamaan joulukoristekuviosarjoja. Arvioi kuvion tunnistamisen tarkkuutta, luovuutta omien sarjojen luomisessa ja kyky\u00e4 selitt\u00e4\u00e4 s\u00e4\u00e4nt\u00f6.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Musiikki',
      connection: 'Joulu on musiikin kultakautta: joululaulut, kantelekappaleet ja joulusoinnut yhdist\u00e4v\u00e4t musiikin joulunodotukseen. POPS 2014:n musiikin tavoitteet toteutuvat luontevasti joulukonserttien ja -laulujen kautta.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat opettelevat joululaulun, jossa esiintyv\u00e4t ty\u00f6lehden joulusanat, yhdist\u00e4en sanaston musiikin kautta.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Joulu tarjoaa rikkaan laskukontekstin: joululahjojen budjetointi, koristeiden laskeminen, piparkakkutalon mittaaminen ja joulukalenterin p\u00e4iv\u00e4laskenta kehitt\u00e4v\u00e4t matemaattista ajattelua.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat laskevat, montako koristetta kuuseen mahtuu, jos jokaiselle oksalle laitetaan kolme palloa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Joulusanasto on rikas: joulukuusi, koristeet, piparkakku, joulutervehdys, lahjapaketti. Joulukorttien ja -kirjeiden kirjoittaminen kehitt\u00e4\u00e4 kirjallista ilmaisua autenttisessa kontekstissa.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat joulukortin l\u00e4heiselle k\u00e4ytt\u00e4en monipuolista joulusanastoa.',
    },
  ],

  uniqueAngle: 'Jouluaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t vuoden voimakkainta motivaatiokautta lasten oppimisessa. Suomessa joulu on kulttuurin ytimess\u00e4: joulukalenterit, adventtikynttil\u00e4t, piparkakkujen leipominen, joululaulujen harjoittelu ja joulupukin odottaminen luovat nelj\u00e4n viikon intensiivisen jakson, jolloin lasten motivaatio ja innostus ovat huipussaan. T\u00e4m\u00e4 tekee joulukuusta pedagogisesti ainutlaatuisen kuukauden, jossa oppiminen voi tapahtua jouluvalmistelujen luonnollisena osana. Joulukalenteri-formaatti mahdollistaa 24 p\u00e4iv\u00e4n rakenteisen oppimisjakson, jossa jokainen p\u00e4iv\u00e4 tuo uuden teht\u00e4v\u00e4n \u2014 t\u00e4m\u00e4 toistuva rakenne on pedagogisesti ihanteellinen taitojen systemaattiseen kehitt\u00e4miseen. Suomalaiset jouluperinteet \u2014 joulurauha, saunominen, jouluruoat ja joulukirkko \u2014 tarjoavat kulttuurisesti rikkaan kontekstin \u00e4idinkielen ja yhteiskuntaopin sis\u00e4ll\u00f6ille. POPS 2014:n kulttuuriperinteen tuntemus ja luova ilmaisu yhdistyv\u00e4t luontevasti jouluteemassa.',

  researchCitation: 'Reeve, J. (2012). A Self-determination Theory Perspective on Student Engagement. Handbook of Research on Student Engagement. Tutkimus osoitti, ett\u00e4 sis\u00e4inen motivaatio \u2014 jollaista joulun odotus luontaisesti her\u00e4tt\u00e4\u00e4 \u2014 johtaa syvempj\u00e4\u00e4n sitoutumiseen ja parempiin oppimistuloksiin kuin ulkoiset palkkiot.',

  culturalNotes: 'Suomessa joulu on vuoden merkitt\u00e4vin juhla: joulukalenteri, joulurauha, jouluruoat ja joulupukin kotimaan imago tekev\u00e4t Suomesta joulukulttuurin ydinalueen. POPS 2014 korostaa kulttuuriperinteen tuntemusta ja luovaa ilmaisua, ja jouluty\u00f6lehdet tukevat n\u00e4it\u00e4 tavoitteita yhdist\u00e4m\u00e4ll\u00e4 perinteiset tavat akateemisiin teht\u00e4viin.',

  snippetDefinition: 'Jouluaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t joulukuusia, koristeit\u00e4, lahjapaketteja ja joulusymboleita matematiikan, lukutaidon ja luovan ajattelun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuteht\u00e4vi\u00e4, sanahakuja, kuviosarjoja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Aloita joulukalenteri-formaatilla: jaa ty\u00f6lehdet 24 p\u00e4iv\u00e4lle niin, ett\u00e4 joka p\u00e4iv\u00e4 tuo uuden teht\u00e4v\u00e4n.',
    'Valitse eri taitoalueiden ty\u00f6lehti\u00e4 \u2014 esimerkiksi laskuteht\u00e4v\u00e4, sanahaku, kuvioteht\u00e4v\u00e4 ja v\u00e4ritysteht\u00e4v\u00e4 vuorotellen.',
    'Yhdist\u00e4 ty\u00f6lehdet jouluvalmisteluihin: joulukorttien kirjoittaminen, koristeiden laskeminen ja piparkakkujen mittaaminen.',
    'Aloita tutustumalla joulusymboleihin yhdess\u00e4 lapsen kanssa: kuusi, t\u00e4hti, pallo, enkelid, joulupukki.',
    'K\u00e4yt\u00e4 joulukoristeit\u00e4 konkreettisina laskuv\u00e4linein\u00e4: laske palloja, t\u00e4hti\u00e4 ja kynttil\u00f6it\u00e4 ennen ty\u00f6lehtiteht\u00e4v\u00e4\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Montako koristetta kuusessa on tai Mik\u00e4 on lempijouluperinteesi.',
    'P\u00e4\u00e4t\u00e4 joulujakso kokoavalla projektilla, jossa oppilaat esittelev\u00e4t oppimansa jouluportfolion muodossa.',
  ],

  limitations: 'Joulu on kristillinen juhla, ja osa perheist\u00e4 ei viet\u00e4 sit\u00e4 tai viejtt\u00e4\u00e4 eri tavalla. Opettajien tulee tarjota vaihtoehtoisia talviteemaisia teht\u00e4vi\u00e4 ja k\u00e4sitell\u00e4 joulua monikulttuurisesti. Kaupallisen joulukulttuurin kriittinen tarkastelu on hy\u00f6dyllist\u00e4 vanhempien oppilaiden kanssa.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Juhlaty\u00f6lehdet kattavat vuoden juhlapyh\u00e4t laajasti. Jouluty\u00f6lehdet syventyv\u00e4t yhteen juhlaan ja sen rikkaaseen symboliikkaan: kuusista koristeisiin, piparkakuista lahjoihin.',
    },
    {
      vsThemeId: 'winter',
      summary: 'Talvity\u00f6lehdet tutkivat lumeen, j\u00e4\u00e4h\u00e4n ja talviseen luontoon liittyvi\u00e4 aiheita. Jouluty\u00f6lehdet keskittyv\u00e4t joulun kulttuurisiin ja sosiaalisiin ulottuvuuksiin talvimaisemassa.',
    },
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikaty\u00f6lehdet tutkivat nelj\u00e4\u00e4 vuodenaikaa kokonaisuutena. Jouluty\u00f6lehdet syventyv\u00e4t talven huippuhetkeen ja sen ainutlaatuiseen juhlakulttuuriin.',
    },
    {
      vsThemeId: 'toys',
      summary: 'Leluty\u00f6lehdet tutkivat leikkiv\u00e4lineit\u00e4 ja niiden ominaisuuksia. Jouluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t leluja osana laajempaa joulukontekstia: lahjatoivelistoja, lahjojen jakamista ja koristeiden luokittelua.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'jouluaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Jouluaiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan joulutunnelmaan, kun lapset v\u00e4ritt\u00e4v\u00e4t kuusia, koristeit\u00e4 ja joulumaisemia.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'joulukoristeiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t aritmetiikkaa joulukuvien kautta, kun lapset etsiv\u00e4t ja laskevat joulupalloja, t\u00e4hti\u00e4, kynttil\u00f6it\u00e4 ja lahjapaketteja.',
    },
    {
      appId: 'word-search',
      anchorText: 'joulusanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat joulusanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten joulukuusi, piparkakku, joulukoriste ja lahjapaketti sanaruudukosta.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'joulusanojen kirjainsotku-teht\u00e4v\u00e4t',
      context: 'Kirjainsotkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t oikeinkirjoitusta ja kirjaintietoisuutta, kun lapset j\u00e4rjest\u00e4v\u00e4t sekoitettuja joulusanoja oikeaan muotoon.',
    },
  ],

  expertTips: [
    {
      tip: 'Luo joulukalenteri-formaatti, jossa joka p\u00e4iv\u00e4 tuo uuden tyyppisen ty\u00f6lehden. Toistuva rakenne ja yll\u00e4tyselementti pit\u00e4v\u00e4t motivaation korkealla koko joulukuun ajan.',
      source: 'Luokanopettaja, jouluteemaopetus',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Yhdist\u00e4 jouluty\u00f6lehdet aitoon jouluvalmisteluun: korttien kirjoittaminen, koristeiden valmistaminen ja piparkakkujen leipominen. T\u00e4m\u00e4 antaa teht\u00e4ville autenttisen merkityksen ja motivaation.',
      source: 'Kulttuurikasvatuksen asiantuntija, suomalaiset perinteet',
      gradeRange: 'Esiopetus\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 jouluteemaa matemaattisen ajattelun syvent\u00e4miseen: lahjabudjettien laskeminen, koristeiden symmetrinen asettelu ja joulukalenteri-laskenta tarjoavat autenttisia matemaattisia ongelmia.',
      source: 'Matematiikan opettaja, arjen matematiikka',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 5. Winter (talvi) ────────────────────────────────────────────────────

const winterFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja haluaa hy\u00f6dynt\u00e4\u00e4 talven luonnonilmi\u00f6it\u00e4 luonnontieteen ja matematiikan opetuksessa, mutta oppilaat ovat v\u00e4syneit\u00e4 pimeyteen.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 talviaiheisia ty\u00f6lehti\u00e4, jotka tekev\u00e4t talvesta tutkimuskohteen: lumihiutaleiden symmetrian tutkimista, l\u00e4mp\u00f6tilojen vertailua, talviel\u00e4inten sopeutumisen tutkimista ja talviurheilulaskuja.',
      outcome: 'Oppilaat alkavat n\u00e4hd\u00e4 talven kiehtovana tutkimuskohteena pimeyden sijaan. Luonnontieteen ymm\u00e4rrys syvenee, ja matemaattiset taidot kehittyv\u00e4t talven konkreettisissa konteksteissa.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 ulkoleikit ja sis\u00e4oppimisen pitkin\u00e4 talvikuukausina.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 talvity\u00f6lehti\u00e4 osana ulko-sis\u00e4-kierrosta: ulkona havainnoida lumikristalleja ja mitata lumen syvyytt\u00e4, sis\u00e4ll\u00e4 t\u00e4ytet\u00e4\u00e4n l\u00e4mp\u00f6tilavertailuja, lumihiutalev\u00e4ritysteht\u00e4vi\u00e4 ja talviel\u00e4insanastopulmia.',
      outcome: 'Lapsi kokee talven aktiivisena oppimiskautena ja yhdist\u00e4\u00e4 ulkohavainnot sis\u00e4teht\u00e4viin. Pitkj\u00e4 talvi tuntuu rikkaalta ja kiinnostavalta tutkimuskaudelta.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Talviaiheiden kirjo', value: 'Lumi, j\u00e4\u00e4, el\u00e4imet, urheilu' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota lumihiutaleiden symmetriakuvioita ja talvimaisemien v\u00e4ritysteht\u00e4vi\u00e4. Valokuvat lumikiteist\u00e4 mikroskoopin alla ja talvimaisemien vertailu ennen ja j\u00e4lkeen lumisateen tarjoavat visuaalisesti rikkaan l\u00e4ht\u00f6kohdan.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Vie oppilaat ulos: mittakaa lumen syvyytt\u00e4, rakentakaa lumiveistoksia ja havainnoikaa j\u00e4\u00e4n muodostumista. Yhdist\u00e4 ulkohavainnot ty\u00f6lehden l\u00e4mp\u00f6tilavertailuihin ja luonnontieteellisiin havaintoihin.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Talvi on universaali kokemus monille lapsille, mutta joillekin se voi olla uusi. Aloita visuaalisista talvikohtauksista ja nime\u00e4 talvisanastoa asteittain: lumi, j\u00e4\u00e4, pakkanen, lumihiutale. Kuvitetut sanakortit ja kokemusperustainen oppiminen tukevat ymm\u00e4rryst\u00e4.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tieteellisill\u00e4 tutkimuksilla: lumikiteiden rakenne, veden olomuodonmuutokset, el\u00e4inten talvehtimisstrategiat ja ilmastodatan analysointi. L\u00e4mp\u00f6tiladatan ker\u00e4\u00e4minen ja graafien piirt\u00e4minen tarjoavat syvemm\u00e4n haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Talvitutkimuskansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan talviaiheiset ty\u00f6lehdet ja ulkohavainnot kansioksi. Arvioi luonnontieteellisen sanaston kehittymist\u00e4, matemaattisten taitojen soveltamista talvikontekstiin ja havainnoinnin tarkkuutta.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'L\u00e4mp\u00f6tilap\u00e4iv\u00e4kirja',
      criteria: 'Oppilas mittaa ja kirjaa ulkol\u00e4mp\u00f6tilan viikon ajan, piirt\u00e4\u00e4 viivakaavion ja kirjoittaa yhteenvedon havainnoistaan. Arvioi mittauksen tarkkuutta, graafin oikeellisuutta ja kirjallisen pohdinnan syvyytt\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Lumihiutalesymmetriateht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta piirt\u00e4m\u00e4\u00e4n symmetrinen lumihiutale ja selitt\u00e4m\u00e4\u00e4n symmetriaks\u00e4lit. Arvioi symmetrian tarkkuutta, geometrisen sanaston k\u00e4ytt\u00f6\u00e4 ja luovuutta kuviossa.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (talven luonnonilmi\u00f6t)',
      connection: 'Talvi tarjoaa rikkaan tutkimuskontekstin luonnontieteelle: veden olomuodonmuutokset, el\u00e4inten talvehtiminen ja lumikiteiden rakenne. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet toteutuvat luontevasti talven ilmi\u00f6iden havainnoinnissa.',
      activity: 'Talviel\u00e4inty\u00f6lehden j\u00e4lkeen oppilaat tutkivat, miten eri el\u00e4imet selvi\u00e4v\u00e4t talvesta: talviunessa, muuttamalla tai sopeutumalla.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Talvi tarjoaa konkreettisia mittauskonteksteja: l\u00e4mp\u00f6tila, lumen syvyys, p\u00e4iv\u00e4nvalon tunnit. Lumihiutaleiden symmetria yhdist\u00e4\u00e4 geometrian luonnontieteeseen.',
      activity: 'L\u00e4mp\u00f6tilavertailuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t viikon l\u00e4mp\u00f6tilat pylv\u00e4sdiagrammiksi ja vertailevat eri viikkojen tuloksia.',
    },
    {
      subject: 'Liikunta',
      connection: 'Talviurheilu \u2014 hiihto, luistelu, m\u00e4enlasku ja lumileikit \u2014 yhdist\u00e4v\u00e4t fyysisen aktiivisuuden talviteemaan. POPS 2014:n liikunnan tavoitteet toteutuvat luontevasti talviliikunnassa.',
      activity: 'Talviurheiluty\u00f6lehden j\u00e4lkeen oppilaat tekev\u00e4t talviurheilup\u00e4iv\u00e4kirjaa, jossa he kirjaavat ulkoilunsa ja laskevat aktiiviset minuutit viikossa.',
    },
  ],

  uniqueAngle: 'Talviaiheiset ty\u00f6lehdet ovat Suomessa pedagogisesti erityisen merkityksellisi\u00e4, koska talvi hallitsee maan vuodesta viidest\u00e4 kuuteen kuukautta ja m\u00e4\u00e4ritt\u00e4\u00e4 lasten arkikokemusta syvj\u00e4llisesti. Pimeys, pakkanen, lumi ja j\u00e4\u00e4 eiv\u00e4t ole Suomessa ohimenexi\u00e4 ilmi\u00f6it\u00e4 vaan pitk\u00e4kestoisia olosuhteita, joiden ymm\u00e4rt\u00e4minen ja arvostaminen on osa suomalaista identiteetti\u00e4. Talvity\u00f6lehdet muuttavat t\u00e4m\u00e4n arjen tutkimuskohteeksi: lumihiutaleiden symmetria opettaa geometriaa, l\u00e4mp\u00f6tilojen vertailu opettaa negatiivisia lukuja ja mittaamista, talviel\u00e4inten sopeutumisstrategiat opettavat biologiaa ja talviurheilulaskut yhdist\u00e4v\u00e4t liikunnan ja matematiikan. Erityisesti Suomessa, miss\u00e4 lapset kasvavat lumileikkien, hiihdon ja j\u00e4\u00e4ll\u00e4 liikkumisen parissa, talvity\u00f6lehtien aiheet resonoivat syvj\u00e4sti omakohtaisten kokemusten kanssa. POPS 2014:n ymp\u00e4rist\u00f6oppi korostaa luonnon vuodenaikaisrytmin ymm\u00e4rt\u00e4mist\u00e4, ja talviteema tarjoaa t\u00e4h\u00e4n pisimm\u00e4n ja intensiivisimm\u00e4n tutkimusjakson.',

  researchCitation: 'Louv, R. (2008). Last Child in the Woods: Saving Our Children from Nature-Deficit Disorder. Algonquin Books. Tutkimus korosti ulkona oppimisen merkityst\u00e4 lasten kehitykselle, ja talvi tarjoaa ainutlaatuisen sensorisen ymp\u00e4rist\u00f6n, jossa lumi, j\u00e4\u00e4 ja pakkanen aktivoivat aisteja tavoilla, joita muut vuodenajat eiv\u00e4t tarjoa.',

  culturalNotes: 'Suomessa talvi on el\u00e4m\u00e4ntapa: hiihto, luistelu, avantouinti ja lumileikit kuuluvat arkeen. POPS 2014 korostaa luonnon vuodenaikaisrytmin ymm\u00e4rt\u00e4mist\u00e4 ja ulkona oppimista, ja talvity\u00f6lehdet tukevat n\u00e4it\u00e4 tavoitteita yhdist\u00e4m\u00e4ll\u00e4 suomalaisen talvielj\u00e4m\u00e4n akateemisiin sis\u00e4lt\u00f6ihin. Suomen pitk\u00e4 talvi tekee teemasta erityisen merkityksellisen.',

  snippetDefinition: 'Talviaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t lunta, j\u00e4\u00e4t\u00e4, talviel\u00e4imi\u00e4 ja talviurheilua matematiikan, luonnontieteen ja lukutaidon opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t l\u00e4mp\u00f6tilavertailuja, lumihiutalesymmetrioita, laskuteht\u00e4vi\u00e4 ja sanahakuja.',

  snippetHowTo: [
    'Ajoita talvity\u00f6lehdet talvikuukausille marraskuusta maaliskuuhun, jolloin luonnonilmi\u00f6t ovat havaittavissa ulkona.',
    'Aloita ulkohavainnolla: menkj\u00e4\u00e4 ulos ja havainnoikaa lunta, j\u00e4\u00e4t\u00e4 tai pakkasta ennen sis\u00e4teht\u00e4v\u00e4\u00e4.',
    'Valitse eri taitoalueiden ty\u00f6lehti\u00e4: l\u00e4mp\u00f6tilavertailu matematiikkaan, lumihiutale geometriaan, talvisanahaku sanastoon.',
    'Yhdist\u00e4 ty\u00f6lehti mittaamiseen: mittaa lumen syvyytt\u00e4, ulkol\u00e4mp\u00f6tilaa tai j\u00e4\u00e4n paksuutta.',
    'K\u00e4yt\u00e4 talviurheilua kontekstina: hiihtokilometrien laskeminen, luisteluajan mittaaminen ja m\u00e4enlaskunopeuden vertailu.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi lumi on valkoista tai Miten linnut selvi\u00e4v\u00e4t talvesta.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet talvitutkimuskansioon ja reflektoikaa kev\u00e4\u00e4ll\u00e4, mit\u00e4 talvesta opittiin.',
  ],

  limitations: 'Talvity\u00f6lehdet olettavat tyypillisesti pohjoismaista talvea lumella ja pakkasella, mik\u00e4 voi olla vierasta lapsille, jotka ovat kotoisin l\u00e4mpimist\u00e4 maista. Ulkoteht\u00e4v\u00e4t vaativat asianmukaista varustusta ja valvontaa pakkasella. Negatiiviset l\u00e4mp\u00f6tilat voivat olla k\u00e4sitteellisesti haastavia nuorimmille oppilaille.',

  themeComparisons: [
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikaty\u00f6lehdet kattavat kaikki nelj\u00e4 vuodenaikaa. Talvity\u00f6lehdet syventyv\u00e4t yhteen vuodenaikaan ja sen ainutlaatuisiin ilmi\u00f6ihin: lumeen, j\u00e4\u00e4h\u00e4n, pakkaseen ja talviel\u00e4imiin.',
    },
    {
      vsThemeId: 'weather',
      summary: 'S\u00e4\u00e4ty\u00f6lehdet tutkivat s\u00e4\u00e4ilmi\u00f6it\u00e4 yleisesti. Talvity\u00f6lehdet keskittyv\u00e4t talven erityisiin s\u00e4\u00e4ilmi\u00f6ihin ja niiden vaikutuksiin el\u00e4m\u00e4\u00e4n.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet tutkivat ekosysteemej\u00e4 ja el\u00e4imi\u00e4 yleisell\u00e4 tasolla. Talvity\u00f6lehdet keskittyv\u00e4t luonnon talvisiin sopeutumisiin ja talven vaikutuksiin ekosysteemeihin.',
    },
    {
      vsThemeId: 'xmas',
      summary: 'Jouluty\u00f6lehdet keskittyv\u00e4t joulun kulttuurisiin perinteisiin. Talvity\u00f6lehdet tutkivat talvea luonnontieteellisen\u00e4 ilmi\u00f6n\u00e4: lumikiteet, l\u00e4mp\u00f6tilat, el\u00e4inten sopeutuminen ja talviurheilu.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'talviaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Talviaiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan talvimaisemiin, kun lapset v\u00e4ritt\u00e4v\u00e4t lumista mets\u00e4\u00e4, talviel\u00e4imi\u00e4 ja talviurheilukohtauksia.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'talviesineiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t aritmetiikkaa talvikuvien kautta, kun lapset etsiv\u00e4t ja laskevat lumihiutaleita, talviel\u00e4imi\u00e4 ja talviurheiluv\u00e4lineit\u00e4.',
    },
    {
      appId: 'word-search',
      anchorText: 'talvisanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat talvisanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten lumihiutale, pakkanen, j\u00e4\u00e4tikkj\u00f6 ja talviuni sanaruudukosta.',
    },
    {
      appId: 'sudoku',
      anchorText: 'talviaiheiset sudokuteht\u00e4v\u00e4t',
      context: 'Sudokuteht\u00e4v\u00e4t talvisymboleilla kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttely\u00e4 ja eliminointitaitoja talvisessa kontekstissa.',
    },
  ],

  expertTips: [
    {
      tip: 'Perusta luokkaan talvitutkimuspiste, johon ker\u00e4t\u00e4\u00e4n j\u00e4\u00e4t\u00e4 ja lunta tutkittavaksi. Ty\u00f6lehtien l\u00e4mp\u00f6tila- ja olomuodonmuutosteht\u00e4v\u00e4t saavat konkreettisen vastineen, kun oppilaat voivat seurata sulamista luokassa.',
      source: 'Luokanopettaja, tutkiva oppiminen',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 talvip\u00e4iv\u00e4kirjaa koko talven ajan: oppilaat kirjaavat l\u00e4mp\u00f6tilan, s\u00e4\u00e4n ja luontohavainnot p\u00e4ivitt\u00e4in. Talvity\u00f6lehdet sy-ventyv\u00e4t, kun niill\u00e4 on pitk\u00e4aikainen havaintoaineisto taustalla.',
      source: 'Ymp\u00e4rist\u00f6kasvattaja, pitk\u00e4kestoiset projektit',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 talvity\u00f6lehdet koulun ulkop\u00e4iv\u00e4\u00e4n: lumiveistoskilpailu, hiihtop\u00e4iv\u00e4 ja talviretki mets\u00e4\u00e4n. Ty\u00f6lehtiteht\u00e4v\u00e4t valmistavat ulkotoimintaan ja ulkohavainnot rikastuttavat sis\u00e4teht\u00e4vi\u00e4.',
      source: 'Ulkopedagogiikan asiantuntija, luontokasvatus',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 6. Farm (maatila) ────────────────────────────────────────────────────

const farmFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja haluaa opettaa el\u00e4inten luokittelua ja ruoantuotannon perusteita, mutta kaupunkilapsilla on v\u00e4h\u00e4n kokemusta maatiloista.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 maatila-aiheisia ty\u00f6lehti\u00e4, joissa oppilaat lajittelevat maatilael\u00e4imi\u00e4 ominaisuuksien mukaan, laskevat tuotantoel\u00e4imi\u00e4 kohtauskuvista, yhdist\u00e4v\u00e4t el\u00e4imet niiden tuotteisiin ja v\u00e4ritt\u00e4v\u00e4t maatilakohtauksia.',
      outcome: 'Oppilaat ymm\u00e4rt\u00e4v\u00e4t, mist\u00e4 ruoka tulee, osaavat luokitella maatilael\u00e4imi\u00e4 ja k\u00e4ytt\u00e4v\u00e4t maatilasanastoa sujuvasti. Luokkahuoneen maatilanurkkaus t\u00e4ydentyy oppilaiden t\u00f6ill\u00e4.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa vastuullisuutta ja luonnon kiert\u00e4\u00e4 lapselle, joka on kiinnostunut el\u00e4imist\u00e4.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 maatilaty\u00f6lehdet kotipuutarhan hoitoon ja l\u00e4himaatilavierailuun: el\u00e4inten hoitoteht\u00e4v\u00e4t, sadonkorjuulaskut, vuodenkiertoty\u00f6lehdet ja maatilael\u00e4inten \u00e4\u00e4nten tunnistaminen.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 ruoantuotannon perusteita, arvostaa maanvilj\u00e4\u00e4n ty\u00f6t\u00e4 ja yhdist\u00e4\u00e4 matemaattiset ja luonnontieteelliset taidot maatilakontekstiin.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Maatilael\u00e4inten kirjo', value: '10+ el\u00e4int\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota maatilakohtausten v\u00e4ritysteht\u00e4vi\u00e4 ja yksityiskohtaisia kuvallisia laskuteht\u00e4vi\u00e4, joissa navetta, pelto ja laidun tarjoavat visuaalisesti rikkaan ymp\u00e4rist\u00f6n el\u00e4inten laskemiselle ja luokittelulle.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'J\u00e4rjest\u00e4 maatilavierailu tai k\u00e4yt\u00e4 leluel\u00e4imi\u00e4 lajitteluteht\u00e4viss\u00e4. Kasvihuoneen tai yrttipuutarhan hoitaminen luokassa antaa konkreettisen kokemuksen kasvattamisesta ja sadonkorjuusta.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Maatilael\u00e4imet ovat universaalisti tunnistettavia: leh m\u00e4, sika, kana ja hevonen ovat tuttuja kulttuurista riippumatta. Aloita el\u00e4inkuvien nime\u00e4misest\u00e4 ja \u00e4\u00e4nten tunnistamisesta, lis\u00e4\u00e4 suomenkielist\u00e4 maatilasanastoa asteittain.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tuotantoketjun tutkimuksella: mist\u00e4 maito tulee kauppaan, kuinka monta vaihetta viljan matka pellolta leiipj\u00e4ksi vaatii ja miten luomutuotanto eroaa tavanomaisesta. Data-analyysi sadonkorjuutilastoista tarjoaa matemaattisen haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Maatilaprojektikansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan maatila-aiheiset ty\u00f6lehdet ja tutkimukset kansioksi. Arvioi luokittelutaitojen kehittymist\u00e4, maatilasanaston laajuutta ja luonnontieteellisen ymm\u00e4rryksen syvenemist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'El\u00e4in-tuote -yhdist\u00e4misteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta yhdist\u00e4m\u00e4\u00e4n maatilael\u00e4in sen tuotteeseen ja selitt\u00e4m\u00e4\u00e4n tuotantoprosessi. Arvioi yhteyksien oikeellisuutta, selityksen tarkkuutta ja kielellisen ilmaisun selkeytt\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Maatilael\u00e4inten luokitteluteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta lajittelemaan 12 el\u00e4int\u00e4 eri luokkiin itse valitsemillaan kriteereill\u00e4. Arvioi luokittelun johdonmukaisuutta, kriteerien selkeytt\u00e4 ja kyky\u00e4 perustella valintoja.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (ruoantuotanto ja el\u00e4inten hoito)',
      connection: 'Maatilateema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin ruoan alkuper\u00e4st\u00e4, el\u00e4inten hyvinvoinnista ja kest\u00e4v\u00e4st\u00e4 kehityksest\u00e4. Ty\u00f6lehdet tekev\u00e4t ruoantuotannon konkreettiseksi.',
      activity: 'El\u00e4in-tuote-yhdist\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat kouluruoan raaka-aineita ja j\u00e4ljitt\u00e4v\u00e4t ne takaisin maatilalle.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Maatila tarjoaa rikkaan laskukontekstin: el\u00e4inten laskeminen, sadonkorjuun mittaaminen, tuotantom\u00e4\u00e4rien vertailu ja ruokinnan jakoteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t aritmetiikan arkitodellisuuteen.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat ratkaisevat sanallisen teht\u00e4v\u00e4n: jos jokaiselle kanalle annetaan kaksi ruokakuppia p\u00e4iv\u00e4ss\u00e4 ja kanoja on kaksitoista, kuinka monta kuppia tarvitaan viikossa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Maatilasanasto on rikas ja monipuolinen: navetta, laidun, sadonkorjuu, maanviljelij\u00e4, traktori. Maatilatarinoiden lukeminen ja el\u00e4inkuvausten kirjoittaminen kehitt\u00e4v\u00e4t kieltj\u00e4.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan p\u00e4iv\u00e4st\u00e4 maatilalla k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n kuutta maatilasanaa.',
    },
  ],

  uniqueAngle: 'Maatila-aiheiset ty\u00f6lehdet yhdist\u00e4v\u00e4t luonnontieteen, matematiikan ja yhteiskunnallisen ymm\u00e4rryksen ainutlaatuisella tavalla, koska maatila on paikka, jossa biologia, taloustiede ja k\u00e4yt\u00e4nn\u00f6n ty\u00f6 kohtaavat konkreettisesti. Suomessa maatalous on historiallisesti ollut kansallisen identiteetin ydin, ja vaikka kaupungistuminen on lis\u00e4\u00e4ntynyt, suomalaisten yhteys maaseutuun on edelleen vahva: kes\u00e4m\u00f6kit, marjastus ja sienestys ovat osa arkiel\u00e4m\u00e4\u00e4. Maatilaty\u00f6lehdet tarjoavat kaupunkilapsille ikkunan ruoantuotantoon ja opettavat, mist\u00e4 p\u00e4ivitt\u00e4inen ravinto tulee. El\u00e4inten luokittelu \u2014 tuotantoel\u00e4imet, lemmikkiel\u00e4imet, villiel\u00e4imet \u2014 kehitt\u00e4\u00e4 tieteellist\u00e4 luokittelutaitoa, ja sadonkorjuulaskut yhdist\u00e4v\u00e4t aritmetiikan todellisiin m\u00e4\u00e4riin. POPS 2014 korostaa kest\u00e4v\u00e4n kehityksen ymm\u00e4rt\u00e4mist\u00e4, ja maatilateema tarjoaa t\u00e4h\u00e4n konkreettisen kontekstin: luomuviljely, el\u00e4inten hyvinvointi ja l\u00e4hiruoka.',

  researchCitation: 'Williams, D. R. & Dixon, P. S. (2013). Impact of Garden-Based Learning on Academic Outcomes in Schools. Review of Educational Research. Tutkimus osoitti, ett\u00e4 maatalous- ja puutarhaperustaiset oppimiskokemukset parantavat merkitt\u00e4v\u00e4sti oppilaiden luonnontieteellist\u00e4 ymm\u00e4rryst\u00e4 ja matemaattisia taitoja.',

  culturalNotes: 'Suomessa maatalous on osa kansallista identiteetti\u00e4: suomalaiset arvostavat l\u00e4hiruokaa, luomutuotantoa ja el\u00e4inten hyvinvointia. POPS 2014 korostaa kest\u00e4v\u00e4n kehityksen ymm\u00e4rt\u00e4mist\u00e4 ja ruoan alkuper\u00e4n tuntemusta. Maatilaty\u00f6lehdet tukevat n\u00e4it\u00e4 tavoitteita ja yhdist\u00e4v\u00e4t suomalaisen maaseudun perinteet moderniin ruokaketjun ymm\u00e4rt\u00e4miseen.',

  snippetDefinition: 'Maatila-aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t maatilael\u00e4imi\u00e4, sadonkorjuuta ja ruoantuotantoa luokittelun, laskemisen ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t el\u00e4inten lajittelua, laskuteht\u00e4vi\u00e4, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille el\u00e4inten nime\u00e4mist\u00e4 ja v\u00e4ritt\u00e4mist\u00e4, vanhemmille tuotantoketjun tutkimista.',
    'Aloita maatilael\u00e4inten tunnistamisella: k\u00e4yk\u00e4\u00e4 l\u00e4pi lehm\u00e4, sika, kana, hevonen, lammas ja vuohi yhdess\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehti maatilavierailuun tai l\u00e4hiruokaostoksiin: tutustukaa ruoan alkuper\u00e4\u00e4n konkreettisesti.',
    'Harjoitelkaa luokittelua arjessa: lajitelkaa kaupan tuotteita el\u00e4inper\u00e4isiin ja kasvipohjaisiin.',
    'Lis\u00e4\u00e4 matematiikan ulottuvuus: laskekaa el\u00e4imi\u00e4, mittatkaa sadonkorjuuta ja vertailkaa m\u00e4\u00e4ri\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mist\u00e4 maito tulee tai Miksi maanviljelij\u00e4n ty\u00f6 on t\u00e4rke\u00e4\u00e4.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet maatilaprojektikansioon ja esitelk\u00e4\u00e4 ne vanhempainillassa.',
  ],

  limitations: 'Maatilaty\u00f6lehdet kuvaavat tyypillisesti idealisoitua maatilaa, joka ei vastaa aina modernin maatalouden todellisuutta. Kaupunkilapsilla voi olla hyvin v\u00e4h\u00e4n kokemusta maatilael\u00e4imist\u00e4. El\u00e4inten hyvinvointikysymykset ja ruoantuotannon eettiset n\u00e4k\u00f6kulmat vaativat ik\u00e4tasoista k\u00e4sittely\u00e4.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet tutkivat el\u00e4inkuntaa laajasti. Maatilaty\u00f6lehdet keskittyv\u00e4t kotiel\u00e4imiin ja tuotantoel\u00e4imiin sek\u00e4 niiden rooliin ruoantuotannossa.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet tutkivat kasvien kasvatusta ja hoitoa. Maatilaty\u00f6lehdet yhdist\u00e4v\u00e4t kasvinviljelyn el\u00e4intenhoitoon ja laajempaan ruoantuotannon kokonaisuuteen.',
    },
    {
      vsThemeId: 'food',
      summary: 'Ruokaty\u00f6lehdet tutkivat ruokaa kuluttajan n\u00e4k\u00f6kulmasta. Maatilaty\u00f6lehdet n\u00e4ytt\u00e4v\u00e4t, mist\u00e4 ruoka tulee, yhdist\u00e4en tuottajan ja kuluttajan perspektiivit.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Hy\u00f6nteisty\u00f6lehdet tutkivat pieneliit\u00e4 ja niiden biologiaa. Maatilaty\u00f6lehdet tarkastelevat hy\u00f6nteisi\u00e4 maatilan ekosysteemin osana: p\u00f6lytt\u00e4j\u00e4t, tuholaiset ja hy\u00f6dyllliset hy\u00f6nteiset.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'maatila-aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Maatila-aiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan maatilakohtauksiin, kun lapset v\u00e4ritt\u00e4v\u00e4t navettoja, eJ\u00e4imi\u00e4 ja laitumia.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'maatilael\u00e4inten laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t aritmetiikkaa maatilakuvien kautta, kun lapset etsiv\u00e4t ja laskevat lehmi\u00e4, sikoja, kanoja ja lampaita kohtauskuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'maatilasanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat maatilasanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten navetta, laidun, sadonkorjuu ja traktori sanaruudukosta.',
    },
    {
      appId: 'alphabet-train',
      anchorText: 'maatila-aiheiset aakkosjunateht\u00e4v\u00e4t',
      context: 'Aakkosjunateht\u00e4v\u00e4t yhdist\u00e4v\u00e4t kirjaintunnistuksen maatilael\u00e4imiin, kun lapset j\u00e4rjest\u00e4v\u00e4t el\u00e4innimet aakkosj\u00e4rjestykseen junaan.',
    },
  ],

  expertTips: [
    {
      tip: 'J\u00e4rjest\u00e4 maatilavierailu tai kutsukaa maanviljelij\u00e4 luokkaan. Ty\u00f6lehtiteht\u00e4v\u00e4t saavat konkreettisen merkityksen, kun oppilaat voivat yhdist\u00e4\u00e4 paperiteht\u00e4v\u00e4t todellisiin kokemuksiin.',
      source: 'Luokanopettaja, kokemuksellinen oppiminen',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Perusta luokkaan kasvuhuoneprojekti: kylv\u00e4k\u00e4\u00e4 hern\u00e4it\u00e4 tai yrttej\u00e4 ja seuratkaa kasvua. Maatilaty\u00f6lehtien sadonkorjuulaskut saavat merkityksen, kun oppilaat mittaavat omien kasviensa kasvua.',
      source: 'Puutarhakasvattaja, pitk\u00e4kestoiset projektit',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 ruokaketjun j\u00e4ljitt\u00e4mist\u00e4 kriittisen ajattelun harjoituksena: oppilaat tutkivat kouluruoan raaka-aineiden alkuper\u00e4n ja piirt\u00e4v\u00e4t ruokaketjun pellolta lautaselle.',
      source: 'Ymp\u00e4rist\u00f6kasvattaja, kest\u00e4v\u00e4 kehitys',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 7. Ocean (valtameri) ─────────────────────────────────────────────────

const oceanFields = `
  // -- SEO Enrichment (Part 182) --

  classroomScenarios: [
    {
      situation: 'Tokaluokan opettaja haluaa laajentaa oppilaiden ymp\u00e4rist\u00f6tietoisuutta merten suojelusta ja merenel\u00e4vist\u00e4, mutta sis\u00e4maassa el\u00e4v\u00e4t oppilaat kokevat meren kaukaiseksi.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 valtameriaiheisia ty\u00f6lehti\u00e4, joissa oppilaat tunnistavat merenel\u00e4ivi\u00e4, lajittelevat niit\u00e4 ominaisuuksien mukaan, ratkaisevat meriaiheisia laskuteht\u00e4vi\u00e4 ja tutkivat merten ekosysteemej\u00e4.',
      outcome: 'Oppilaat kiinnostuvat merenel\u00e4mist\u00e4 ja ymm\u00e4rt\u00e4v\u00e4t merten merkityksen ekosysteemeille. Luokittelutaidot, luonnontieteellinen sanasto ja ymp\u00e4rist\u00f6tietoisuus kehittyv\u00e4t.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka kiehtoo lasta ja yhdist\u00e4\u00e4 luonnontieteen, sanaston ja mielikuvituksen.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 valtamerety\u00f6lehti\u00e4 yhdistettyn\u00e4 meriteemaisiin kirjoihin ja dokumentteihin: merenel\u00e4inten tunnistaminen, korallibarrieriin piirt\u00e4minen, merenalaisten kohtausten v\u00e4ritt\u00e4minen ja merisanaston oppiminen.',
      outcome: 'Lapsi innostuu merenel\u00e4m\u00e4st\u00e4 ja oppii luonnontieteellist\u00e4 sanastoa sek\u00e4 luokittelutaitoja meriteeman kautta.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Merenel\u00e4inten kirjo', value: '20+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota merenalaisten kohtausten v\u00e4ritysteht\u00e4vi\u00e4 ja yksityiskohtaisia kuvallisia etsint\u00e4teht\u00e4vi\u00e4. Valokuvat todellisista merenel\u00e4imist\u00e4 ja korallibarrieereista tarjoavat visuaalisesti h\u00e4mm\u00e4stytt\u00e4v\u00e4n oppimisymp\u00e4rist\u00f6n.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Rakenna luokkaan merenalainentutkimusasema leluel\u00e4imiin. Vesikokeeet \u2014 esineiden kelluminen ja uppoaminen \u2014 yhdist\u00e4v\u00e4t fyysisen kokeilun ty\u00f6lehden luonnontieteellisiin k\u00e4sitteisiin.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Merenel\u00e4imet ovat visuaalisesti kiehtovia ja tunnistettavia kulttuurista riippumatta. Aloita kuvien yhdist\u00e4misest\u00e4 ja nime\u00e4misest\u00e4: valas, hai, meduusa, meritj\u00e4hti, mustekala. Kuvitetut sanakortit tukevat merisanaston oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta ekosysteemitutkimuksella: ravintoketjut meriekosysteemiss\u00e4, muovij\u00e4tteen vaikutus merenel\u00e4miin ja syvj\u00e4nmeren olosuhteet. Data-analyysi uhanalaisista merilajista tarjoaa matemaattisen ja eettisen haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Meritutkimuskansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan valtameriaiheiset ty\u00f6lehdet ja tutkimukset kansioksi. Arvioi luokittelutaitojen kehittymist\u00e4, merisanaston laajuutta ja ymp\u00e4rist\u00f6tietoisuuden syvenemist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Merenel\u00e4inesitelmj\u00e4',
      criteria: 'Oppilas valitsee yhden merenel\u00e4imen, tutkii sit\u00e4 ja esittelee l\u00f6yd\u00f6ksens\u00e4 luokalle. Arvioi tiedon tarkkuutta, esityksen rakennetta ja kielellisen ilmaisun selkeytt\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Merenalaisen kohtauksen piirtj\u00e4minen',
      criteria: 'Pyyd\u00e4 oppilasta piirt\u00e4m\u00e4\u00e4n merenalainen kohtaus v\u00e4hint\u00e4\u00e4n kymmenell\u00e4 eri el\u00e4imell\u00e4 ja nime\u00e4m\u00e4\u00e4n ne. Arvioi el\u00e4inten tunnistamisen tarkkuutta, piirustuksen yksityiskohtaisuutta ja sanaston k\u00e4ytt\u00f6\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (merten ekosysteemit)',
      connection: 'Valtameriteema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin ekosysteemien ymm\u00e4rt\u00e4misest\u00e4, lajien monimuotoisuudesta ja ymp\u00e4rist\u00f6nsuojelusta. Ty\u00f6lehdet tekev\u00e4t merten ekologiasta konkreettista.',
      activity: 'Merenel\u00e4inten lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat yksinkertaisen merekosysteemin ravintoketjun ja piirt\u00e4v\u00e4t sen kaaviona.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Meri tarjoaa vaikuttavia lukuja laskemiselle ja vertailulle: valaiden pituudet, merten syvyydet, el\u00e4inten lukum\u00e4\u00e4r\u00e4t ja et\u00e4isyydet. Suurten lukujen k\u00e4sittely ja vertailu kehittyv\u00e4t luonnollisesti merikontekstissa.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat vertailevat eri merenel\u00e4inten kokoja ja piirt\u00e4v\u00e4t mittakaavadiagrammin pienimmj\u00e4st\u00e4 suurimpaan.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Merisanasto on rikas ja kiehtova: korallibarrieri, meduusa, syvj\u00e4nmeri, mustekala, merikilpikonna. Meriteemaiset tarinat ja tietotekstit rikastuttavat sanaston laajuutta.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat mielikuvitustarinan sukelluksesta merenpohjaan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n kuutta merisanaa.',
    },
  ],

  uniqueAngle: 'Valtameri-aiheiset ty\u00f6lehdet kiehtovat lapsia, koska meri edustaa maailman suurinta tutkimatonta aluetta \u2014 se on todellinen seikkailumaailma, joka on samaan aikaan todellinen ja mysteerinen. Merenel\u00e4imet ovat luontaisesti kiinnostavia: valaiden valtavuus, mustekalojen \u00e4lykkyys, korallibarrieerin v\u00e4rikkyys ja syv\u00e4nmeren olennot vetoavat lasten mielikuvitukseen voimakkaasti. T\u00e4m\u00e4 luontainen kiehtoutuminen tekee merenel\u00e4in-teemaisista ty\u00f6lehdist\u00e4 erityisen tehokkaita oppimisen motivoijia. Suomessa meri on l\u00e4sn\u00e4 Saaristomeren, It\u00e4meren ja tuhansien j\u00e4rvien kautta, vaikkakaan valtameri ei ole suoraan saavutettavissa. It\u00e4meren suojelu on ajankohtainen aihe, ja merenel\u00e4inty\u00f6lehdet tarjoavat luontevan siltayhteyden globaaliin ymp\u00e4rist\u00f6tietoisuuteen. POPS 2014 korostaa kest\u00e4v\u00e4n kehityksen ymm\u00e4rt\u00e4mist\u00e4 ja lajien monimuotoisuuden arvostamista, ja valtameriteema tarjoaa t\u00e4h\u00e4n erityisen vaikuttavan kontekstin.',

  researchCitation: 'Keller, H. & Reiss, M. J. (2014). The Effects of an Aquarium Visit on Primary School Children. International Journal of Science Education. Tutkimus osoitti, ett\u00e4 merenel\u00e4imiin liittyv\u00e4t oppimiskokemukset lis\u00e4\u00e4v\u00e4t merkitt\u00e4v\u00e4sti lasten ymp\u00e4rist\u00f6tietoisuutta ja motivaatiota luonnontieteen opiskeluun.',

  culturalNotes: 'Suomi on It\u00e4meren valtio, ja meriluonnon suojelu on ajankohtainen aihe. POPS 2014 korostaa kest\u00e4v\u00e4n kehityksen ymm\u00e4rt\u00e4mist\u00e4 ja ymp\u00e4rist\u00f6nsuojelua. Valtameriteema laajentaa It\u00e4meri-n\u00e4k\u00f6kulmaa globaaliin meriymmp\u00e4rist\u00f6\u00f6n ja opettaa lapsille valtamerien merkityksen maapallon ekosysteemille.',

  snippetDefinition: 'Valtameri-aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t merenel\u00e4imi\u00e4, korallibarriereja ja merenalaisia kohtauksia luokittelun, laskemisen ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t el\u00e4inten lajittelua, laskuteht\u00e4vi\u00e4, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille merenel\u00e4inten tunnistamista ja v\u00e4ritt\u00e4mist\u00e4, vanhemmille ekosysteemitutkimusta.',
    'Aloita katsomalla lyhyt video tai kuvakirja merenel\u00e4imist\u00e4, jotta lapset p\u00e4\u00e4sev\u00e4t meriteemaan sis\u00e4\u00e4n ennen ty\u00f6lehte\u00e4.',
    'Valitse kaksi tai kolme eri taitoalueen ty\u00f6lehtityyppi\u00e4 \u2014 esimerkiksi laskuteht\u00e4v\u00e4, sanahaku ja ristikk\u00f6.',
    'Yhdist\u00e4 ty\u00f6lehti akvaariovierailuun tai merenalaisten dokumenttien katseluun konkreettisen kokemuksen luomiseksi.',
    'Rakentakaa luokkaan merenalainen tutkimusasema: sini-set\u00e4 kankaita, paperisia merenel\u00e4imi\u00e4 ja ty\u00f6lehtien tuloksia.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi valaat ovat niin suuria tai Miten merenel\u00e4imet hengitt\u00e4v\u00e4t vedess\u00e4.',
    'P\u00e4\u00e4t\u00e4 teemajakso merentsuojelupohdinnalla: mit\u00e4 voimme tehd\u00e4 merten hy\u00e4n\u00e4ksi.',
  ],

  limitations: 'Valtameriteema voi tuntua kaukaiselta sis\u00e4maassa eliville lapsille, joilla ei ole omakohtaista merikokemusta. Jotkin merenel\u00e4imet \u2014 kuten hait \u2014 voivat aiheuttaa pelkoja nuorimmissa oppilaissa. Merten ymp\u00e4rist\u00f6ongelmien k\u00e4sittely vaatii ik\u00e4tasoista l\u00e4hestymistapaa, jottei lapsille synny ilmastoahdistusta.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet tutkivat el\u00e4inkuntaa laajasti. Valtamerety\u00f6lehdet keskittyv\u00e4t merenel\u00e4miin ja meren ekosysteemiin, tarjoten syvemm\u00e4n sukelluksen vedenalaiseen maailmaan.',
    },
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaurusty\u00f6lehdet tutkivat menneisyyden j\u00e4ttil\u00e4isi\u00e4. Valtamerety\u00f6lehdet tutkivat nykyp\u00e4iv\u00e4n j\u00e4ttil\u00e4isi\u00e4 \u2014 valaat ja hait \u2014 ja el\u00e4v\u00e4\u00e4 ekosysteemi\u00e4.',
    },
    {
      vsThemeId: 'zoo',
      summary: 'El\u00e4intarhaty\u00f6lehdet tutkivat eksoottisia el\u00e4imi\u00e4 ihmisen luomassa ymp\u00e4rist\u00f6ss\u00e4. Valtamerety\u00f6lehdet esittelev\u00e4t el\u00e4imet niiden luonnollisessa elinympp\u00e4rist\u00f6ss\u00e4 \u2014 valtameress\u00e4.',
    },
    {
      vsThemeId: 'summer',
      summary: 'Kes\u00e4ty\u00f6lehdet tutkivat kes\u00e4n aktiviteetteja kuten uimista ja rantailu\u00e4. Valtamerety\u00f6lehdet syventyv\u00e4t meren ekosysteemiin ja sen el\u00e4mj\u00e4\u00e4n, pinnan alle.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'meriaiheiest v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Meriaiheisett v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t hienomotoriikan merenalaisen maailman v\u00e4rikkyyteen, kun lapset v\u00e4ritt\u00e4v\u00e4t koralleja, kaloja ja merenel\u00e4imi\u00e4.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'merenel\u00e4inten laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t aritmetiikkaa merikuvien kautta, kun lapset etsiv\u00e4t ja laskevat kaloja, merit\u00e4hti\u00e4, simpukoita ja meduusoja kohtauskuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'merisanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t rikastuttavat merisanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten korallibarrieri, mustekala, merikilpikonna ja syvj\u00e4nmeri sanaruudukosta.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'merenel\u00e4inristikk\u00f6teht\u00e4v\u00e4t',
      context: 'Kuvaristikk\u00f6teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t merenel\u00e4inten tunnistamisen oikeinkirjoitukseen, kun lapset nime\u00e4v\u00e4t kuvien perusteella merenel\u00e4imi\u00e4 ja t\u00e4ytt\u00e4v\u00e4t ruudukon.',
    },
  ],

  expertTips: [
    {
      tip: 'J\u00e4rjest\u00e4 virtuaalinen akvaariovierailu tai katsokaa merendokumentti ennen ty\u00f6lehti\u00e4. Visuaalinen kokemus antaa ty\u00f6lehtiteht\u00e4ville konkreettisen pohjan ja motivoi lapsia oppimaan lis\u00e4\u00e4.',
      source: 'Luokanopettaja, teknologia-avusteinen opetus',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Yhdist\u00e4 meriteema It\u00e4meren suojeluun: oppilaat tutkivat, miten heid\u00e4n arkivalintansa vaikuttavat It\u00e4mereen. T\u00e4m\u00e4 tekee globaalista meriteemasta paikallisesti merkityksellisen.',
      source: 'Ymp\u00e4rist\u00f6kasvattaja, It\u00e4meren suojelu',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 kokoerojia merenel\u00e4imiss\u00e4 matemaattisena tutkimuskohteena: planktonista sinivalaaseen. Oppilaat piirt\u00e4v\u00e4t mittakaavavertailuja ja oppivat samalla suuruusluokkien k\u00e4sitett\u00e4.',
      source: 'Matematiikan opettaja, mittakaava ja suuruusluokat',
      gradeRange: '1.\u20133. lk',
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
  { id: 'furniture', fields: furnitureFields },
  { id: 'easter', fields: easterFields },
  { id: 'halloween', fields: halloweenFields },
  { id: 'xmas', fields: xmasFields },
  { id: 'winter', fields: winterFields },
  { id: 'farm', fields: farmFields },
  { id: 'ocean', fields: oceanFields },
];

console.log('Part 182: Enriching 7 FI theme hub pages with 14 fields each...\n');
themes.forEach((t, i) => {
  console.log(`${i + 1}. Injecting fields into ${t.id}/fi.ts...`);
  injectFields(path.join(base, t.id, 'fi.ts'), t.fields);
});
console.log('\nDone! All 7 FI theme hub files enriched.');
