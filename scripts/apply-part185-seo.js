/**
 * SEO Part 185: Enrich FI theme hub pages 43-49 with 14 enrichment fields each
 * Themes: construction, cooking, travel, birthday, circus, forest, spring
 */
const fs = require('fs');
const path = require('path');

// ── 1. Construction (rakentaminen) ────────────────────────────────────────

const constructionFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa toteuttaa STEM-jakson, joka yhdist\u00e4\u00e4 matematiikan, tekniikan ja \u00e4idinkielen konkreettiseen projektiin, mutta koulun varastossa ei ole erikoismateriaaleja.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 rakentamisaiheisia ty\u00f6lehti\u00e4 viikon runkona: oppilaat laskevat tiili\u00e4 ja palkkeja, mittaavat rakennusten mittoja ruutupaperilla, v\u00e4ritt\u00e4v\u00e4t ty\u00f6maakuvituksia ja tekev\u00e4t sanahakuja rakennussanastolla kuten perustus, teline ja nosturi. Ty\u00f6lehtien ohessa oppilaat rakentavat pienoisrakenteita kierr\u00e4tysmateriaaleista.',
      outcome: 'Oppilaat ymm\u00e4rt\u00e4v\u00e4t suunnittelun, mittaamisen ja j\u00e4rjestyksen merkityksen rakentamisessa, matemaattiset taidot vahvistuvat k\u00e4yt\u00e4nn\u00f6n kontekstissa ja insin\u00f6\u00f6riajattelu kehittyy luontevasti.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka kanavoisi lapsen intohimon palikoilla ja LEGOilla rakentamiseen akateemisiksi taidoiksi ilman ett\u00e4 rakentamisen ilo katoaa.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 rakentamisty\u00f6lehdet lapsen omiin rakennusprojekteihin: ensin ty\u00f6lehden tiililaskenta, sitten oikea rakentaminen palikoilla. Piirustusteht\u00e4v\u00e4t ruutupaperilla edeltyv\u00e4t kolmiulotteista rakentamista, ja mittausteht\u00e4v\u00e4t yhdistyv\u00e4t huonekalujen mittaamiseen mittanauhalla.',
      outcome: 'Lapsi kokee ty\u00f6lehdet rakentamisleikin luonnollisena jatkumona, laskemis- ja mittaustaidot vahvistuvat huomaamatta ja suunnittelutaito kehittyy sek\u00e4 paperilla ett\u00e4 konkreettisessa rakentamisessa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Rakennusaiheet', value: '20+ aihepiiri\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 suuria poikkileikkauskuvia rakennuksista, ty\u00f6maakaavioita ja piirustusn\u00e4kymiE. V\u00e4rikoodaa rakennusvaiheet aikajanamuodossa, jotta kokonaisuus hahmottuu visuaalisesti ja j\u00e4rjestys selkiytyy.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet fyysiseen rakentamiseen: lapsi rakentaa palikoilla ty\u00f6lehdell\u00e4 n\u00e4kem\u00e4ns\u00e4 rakenteen, mittaa tulosta viivottimella ja vertaa fyysist\u00e4 rakennetta paperiversioon. Leluty\u00f6kalujen k\u00e4sittely vahvistaa sanastoa.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Rakennuskoneet ja ty\u00f6kalut ovat visuaalisesti tunnistettavia kaikissa kulttuureissa. Aloita ty\u00f6kalujen ja koneiden nime\u00e4misell\u00e4 kuvien avulla, lis\u00e4\u00e4 suomenkielist\u00e4 rakennussanastoa asteittain. Kuvakortit tukevat sanaston ankkuroitumista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kokonainen rakennus: laske materiaalim\u00e4\u00e4r\u00e4t kertolaskulla, budjetoi kustannukset, piirr\u00e4 pohjapiirros ruutupaperille ja kirjoita rakennusselostus. Sis\u00e4llyt\u00e4 pinta-alan ja piirin laskentaa sek\u00e4 rakenteellista analyysia.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Rakennusprojektikansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan rakentamisty\u00f6lehdet, piirustukset ja materiaalilaskelmat koko jakson ajalta. Arvioi rakennussanaston kehittymist\u00e4, mittaustarkkuuden parantumista ja kyky\u00e4 soveltaa matemaattisia taitoja rakennuskontekstissa.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Piirustus ja materiaalilaskelma',
      criteria: 'Pyyd\u00e4 oppilasta piirt\u00e4m\u00e4\u00e4n yksinkertainen rakennuksen pohjapiirros ruutupaperille ja laskemaan tarvittavien materiaalien m\u00e4\u00e4r\u00e4t. Arvioi tilallista hahmottamista, laskutarkkuutta ja kyky\u00e4 yhdist\u00e4\u00e4 suunnittelu ja laskenta.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Ty\u00f6kalujen tunnistus- ja lajitteluteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle joukko ty\u00f6kalukuvia ja pyyd\u00e4 lajittelemaan ne k\u00e4ytt\u00f6tarkoituksen mukaan. Arvioi luokittelutaitojen hallintaa, sanastoa ja kyky\u00e4 perustella lajitteluvalintoja.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (mittaaminen ja geometria)',
      connection: 'Rakentaminen on luonnostaan matemaattinen prosessi: mittaaminen, laskeminen ja geometriset muodot ovat jokaisen rakennusprojektin ytimess\u00e4. POPS 2014:n matematiikan mittaamisen ja geometrian tavoitteet toteutuvat suoraan rakennuskontekstissa.',
      activity: 'Tiililaskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t pohjapiirroksen ruutupaperille, laskevat huoneiden pinta-alat ja piirit sek\u00e4 m\u00e4\u00e4ritt\u00e4v\u00e4t tarvittavan materiaalim\u00e4\u00e4r\u00e4n.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Rakennussanasto kuten perustus, raudoitus, teline ja piirustus laajentaa teknist\u00e4 sanavarastoa. Proseduraalinen kirjoittaminen rakentamisvaiheista kehitt\u00e4\u00e4 j\u00e4rjestelm\u00e4llist\u00e4 ilmaisua.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat ohjeet yksinkertaisen rakennelman tekemiseen k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 rakennussanaa ja selkeit\u00e4 j\u00e4rjestyssanoja.',
    },
    {
      subject: 'K\u00e4sity\u00f6 ja teknologia',
      connection: 'Rakentamisteema yhdistyy suoraan POPS 2014:n k\u00e4sity\u00f6n ja teknologian tavoitteisiin: suunnittelu, materiaalintuntemus, ty\u00f6kalujen turvallinen k\u00e4ytt\u00f6 ja prosessin dokumentointi.',
      activity: 'Piirustusteht\u00e4v\u00e4n j\u00e4lkeen oppilaat rakentavat pienoismallin kierr\u00e4tysmateriaaleista noudattaen suunnitelmaansa, arvioivat rakennettaan ja dokumentoivat prosessin valokuvin.',
    },
  ],

  uniqueAngle: 'Rakentamisaiheiset ty\u00f6lehdet tarjoavat ainutlaatuisen pedagogisen ulottuvuuden, jota harva muu teema pystyy toistamaan: ne yhdist\u00e4v\u00e4t insin\u00f6\u00f6riajattelun, matemaattisen mittaamisen ja j\u00e4rjestelm\u00e4llisen suunnittelun yhdeksi johdonmukaiseksi oppimiskehykseksi. Rakennusprosessi on luonnostaan per\u00e4kk\u00e4inen \u2014 perustukset ennen seini\u00e4, sein\u00e4t ennen kattoa \u2014 ja t\u00e4m\u00e4 tarjoaa luonnollisen kontekstin proseduraalisen ajattelun, syy-seuraussuhteiden ja suunnittelutaitojen opettamiseen. Lapset, jotka rakastavat rakentamista palikoilla, LEGOilla tai kierr\u00e4tysmateriaaleilla, kokevat rakentamisty\u00f6lehdet oman intohimonsa akateemisena jatkeena eiv\u00e4tk\u00e4 irrallisina teht\u00e4vin\u00e4. Suomessa POPS 2014 painottaa k\u00e4sity\u00f6n, teknologian ja matematiikan integraatiota, ja rakentamisteema toteuttaa t\u00e4m\u00e4n poikkitieteellisen yhteyden konkreettisesti. Suomalainen rakentamiskulttuuri on korkealaatuista ja innovatiivista, ja rakentamisteemaiset ty\u00f6lehdet avaavat ikkunan ammatteihin, joissa tarkkuus, suunnittelu ja yhteisty\u00f6 ovat avainasemassa. Ty\u00f6lehtien moninaisuus \u2014 tiililaskennat, piirustusruudukot, ty\u00f6kalusanaston sanahaut, varjoyhdist\u00e4misteht\u00e4v\u00e4t \u2014 takaa, ett\u00e4 jokaiselle oppijalle l\u00f6ytyy sopiva haaste ja oppiminen pysyy motivoivana viikkojenkaan kuluessa.',

  researchCitation: 'Bagiati, A. & Evangelou, D. (2015). Engineering Curriculum in the Preschool Classroom: The Teacher\u2019s Experience. European Early Childhood Education Research Journal. Tutkimus osoitti, ett\u00e4 rakentamis- ja insin\u00f6\u00f6riteemaiset oppimiskokemukset esiopetusik\u00e4isille parantavat merkitt\u00e4v\u00e4sti ongelmanratkaisutaitoja, tilallista hahmottamista ja matemaattisen ajattelun kehittymist\u00e4.',

  culturalNotes: 'Suomessa rakentaminen on korkean osaamisen ala, ja suomalainen rakennuskulttuuri tunnetaan laadusta ja innovatiivisuudesta. POPS 2014 korostaa k\u00e4sity\u00f6n ja teknologian opetusta alkuopetuksesta l\u00e4htien, ja rakentamisteema yhdistyy luontevasti n\u00e4ihin tavoitteisiin. Suomalainen perinne rakentaa puusta, erityisesti hirsirakentaminen, tarjoaa kulttuurisen ankkkurin, joka yhdist\u00e4\u00e4 modernin rakentamisen perinteiseen k\u00e4sity\u00f6taitoon.',

  snippetDefinition: 'Rakentamisaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t nostureiden, kaivinkoneiden, ty\u00f6kalujen ja ty\u00f6maiden kuvituksia matematiikan, lukemisen ja insin\u00f6\u00f6riajattelun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t materiaalilaskentaa, mittausteht\u00e4vi\u00e4, sanahakuja ja piirustusharjoituksia.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille ty\u00f6koneiden v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista laskemista, vanhemmille materiaalilaskelmia ja piirustusteht\u00e4vi\u00e4.',
    'Esittele rakennusprosessin vaiheet lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 selitA, miksi perustukset tehd\u00e4\u00e4n ennen seini\u00e4.',
    'Anna lapsen v\u00e4ritt\u00e4\u00e4 ja laskea rauhallisesti ilman kiirett\u00e4, jotta rakentamisteema s\u00e4ilyy nautinnollisena oppimiskokemuksena.',
    'Yhdist\u00e4 ty\u00f6lehdet fyysiseen rakentamiseen palikoilla, LEGOilla tai kierr\u00e4tysmateriaaleilla konkreettisen yhteyden luomiseksi.',
    'Keskustele ty\u00f6kalujen nimist\u00e4 ja k\u00e4ytt\u00f6tarkoituksista teht\u00e4vien v\u00e4liss\u00e4 sanaston laajentamiseksi.',
    'Vie lapsi seuraamaan naapuruston rakennusprojektia ja verratakaa havaintoja ty\u00f6lehden rakennuskuviin.',
    'Toista suosikkiteht\u00e4vi\u00e4 vaikeustasoa lis\u00e4ten ja lis\u00e4\u00e4 uusia rakennussanoja sanavarastoon asteittain.',
  ],

  limitations: 'Rakentamisaiheiset ty\u00f6lehdet keskittyv\u00e4t tekniseen ja matemaattiseen n\u00e4k\u00f6kulmaan, mik\u00e4 saattaa olla vierasta lapsille, joiden kotiymP\u00e4rist\u00f6ss\u00e4 ei ole kokemusta rakentamisesta tai ty\u00f6kaluista. Turvallisuusn\u00e4k\u00f6kulma on huomioitava: ty\u00f6maita ei saa k\u00e4yd\u00e4 katsomassa ilman aikuisen valvontaa, ja fyysisiss\u00e4 rakennusprojekteissa on noudatettava ik\u00e4tasoisia turvallisuusohjeita.',

  themeComparisons: [
    { vsThemeId: 'jobs', summary: 'Rakentaminen on yksi ammattimaailman konkreettisimmista teemoista, kun ammattiteema kattaa laajemmin eri el\u00e4m\u00e4naloja. Rakentamisteema syventyy insin\u00f6\u00f6riajatteluun ja mittaamiseen, kun ammattiteema esittelee ty\u00f6el\u00e4m\u00e4n moninaisuutta.' },
    { vsThemeId: 'shapes', summary: 'Rakentaminen soveltaa geometrisia muotoja k\u00e4yt\u00e4nn\u00f6ss\u00e4 rakennusten, seinien ja pohjapiirrosten kautta, kun muototeema opettaa muotoja abstraktisti. Rakentamisteema tekee geometriasta v\u00e4litt\u00f6m\u00e4sti tarkoituksenmukaista.' },
    { vsThemeId: 'transportation', summary: 'Rakentaminen luo infrastruktuurin \u2014 tiet, sillat, rakennukset \u2014 jota liikennevälineet k\u00e4ytt\u00e4v\u00e4t. Molemmat teemat sis\u00e4lt\u00e4v\u00e4t suuria koneita, mutta rakentaminen korostaa luomista ja suunnittelua, kun liikenne korostaa liikkumista ja j\u00e4rjestelmi\u00e4.' },
    { vsThemeId: 'robots', summary: 'Rakentaminen yhdist\u00e4\u00e4 perinteisen insin\u00f6\u00f6ritieteen konkreettiseen rakentamiseen, kun robotiikkateema korostaa ohjelmointia ja automaatiota. Molemmat kehitt\u00e4v\u00e4t STEM-ajattelua eri n\u00e4k\u00f6kulmista: fyysinen rakentaminen vs. digitaalinen ohjelmointi.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Rakennuskoneiden v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 nostureiden, kaivinkoneiden ja py\u00f6r\u00e4kuormaajien yksityiskohtaisia kuvituksia samalla kehitt\u00e4en hienomotoriikkaa ja konetuntemusta.' },
    { appId: 'grid-match', anchorText: 'Rakennuskuvioiden ruudukkoyhdist\u00e4minen', context: 'Yhdist\u00e4 rakennusaiheisia kuvioita ruudukossa kehitt\u00e4en tilallista hahmottamista ja visuaalista muistia.' },
    { appId: 'word-search', anchorText: 'Rakennussanaston sanahaku', context: 'Etsi rakennussanastoa kuten perustus, nosturi, teline ja vasara kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'code-addition', anchorText: 'Piirustusruudukon koodilaskut', context: 'Ratkaise yhteenlaskuteht\u00e4vi\u00e4 piirustusruudukossa yhdist\u00e4en matemaattisen harjoittelun rakennusteemaiseen visualisointiin.' },
  ],

  expertTips: [
    { tip: 'Rakenna luokkaan ty\u00f6maanurkka rakennuspalikoilla, leluty\u00f6kaluilla ja kyp\u00e4rill\u00e4. Ty\u00f6lehtien j\u00e4lkeen oppilaat siirtyv\u00e4t ty\u00f6maalle rakentamaan paperilla suunnittelemiaan rakenteita, yhdist\u00e4en teoria ja k\u00e4yt\u00e4nt\u00f6.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 rakentamisty\u00f6lehdet todellisten rakennusprojektien seuraamiseen: naapuruston ty\u00f6maan dokumentointi valokuvin ja havaintojen vertaaminen ty\u00f6lehtien rakennuskuviin syvent\u00e4\u00e4 ymm\u00e4rryst\u00e4 rakennusprosessista.', source: 'Teknologiakasvatuksen asiantuntija', gradeRange: '2.\u20133. lk' },
    { tip: 'K\u00e4yt\u00e4 piirustusteht\u00e4vi\u00e4 toiminnanohjauksen tukena: kun lapsi opettelee ensin tutkimaan piirustusta, sitten suunnittelemaan ja lopuksi rakentamaan, h\u00e4n harjoittelee samaa ensin ajattele, sitten toimi -periaatetta, joka tukee kaikkea akateemista oppimista.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 2. Cooking (ruoanlaitto) ──────────────────────────────────────────────

const cookingFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa yhdist\u00e4\u00e4 matematiikan ja \u00e4idinkielen opetuksen konkreettiseen kontekstiin, joka innostaa kaikkia oppilaita sukupuolesta ja taustasta riippumatta.',
      solution: 'H\u00e4n valitsee ruoanlaittoteeman: oppilaat laskevat ainesosia resepteiss\u00e4, mittaavat m\u00e4\u00e4ri\u00e4 desilitroina ja ruokalusikoina, v\u00e4ritt\u00e4v\u00e4t keittikuvituksia ja tekev\u00e4t sanahakuja ruokasanastolla kuten vatkain, uuni ja taikiina. Lukuteht\u00e4v\u00e4t sis\u00e4lt\u00e4v\u00e4t yksinkertaisia reseptej\u00e4, joita oppilaat seuraavat vaihe vaiheelta.',
      outcome: 'Oppilaat ymm\u00e4rt\u00e4v\u00e4t mittaamisen k\u00e4yt\u00e4nn\u00f6n merkityksen, lukevat proseduraalista teksti\u00e4 tarkoituksenmukaisesti ja kehitt\u00e4v\u00e4t ravintotietoisuutta samalla kun harjoittelevat akateemisia taitoja.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa hy\u00f6dynt\u00e4\u00e4 p\u00e4ivitt\u00e4ist\u00e4 ruoanlaittoa oppimistilanteena, mutta lapsi ei jaksa tehd\u00e4 erillisi\u00e4 ty\u00f6lehti\u00e4 keittikokemuksen j\u00e4lkeen.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 ruoanlaittoty\u00f6lehti\u00e4 esivalmisteluun: lapsi t\u00e4ytt\u00e4\u00e4 ainesosien laskentateht\u00e4v\u00e4n ennen oikeaa ruoanlaittoa, tunnistaa v\u00e4lineit\u00e4 kuvista ja lukee reseptin askeleittain. Ty\u00f6lehti toimii esiharjoituksena, joka tekee todellisesta ruoanlaitosta sujuvampaa.',
      outcome: 'Lapsi kokee ty\u00f6lehdet osana ruoanlaiton seikkailua, mittaus- ja laskutaidot vahvistuvat luonnollisesti ja reseptien lukeminen kehitt\u00e4\u00e4 proseduraalisen tekstin ymm\u00e4rt\u00e4mist\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Ruoka-aiheet', value: '20+ aihepiiri\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4 ruokakuvituksia, reseptikaavioita ja keitti\u00f6v\u00e4lineiden kuvakortteja. Reseptien vaiheittainen kuvitus auttaa hahmottamaan prosessin kokonaisuutena ja tukee j\u00e4rjestyksen ymm\u00e4rt\u00e4mist\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet todelliseen ruoanlaittoon: lapsi mittaa jauhoja desilitramitalla, laskee kananmunat ja sekoittaa taikinaa ennen tai j\u00e4lkeen paperiteht\u00e4vi\u00e4. Moniaistisuus vahvistaa oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Ruoanlaitto on universaali teema kaikissa kulttuureissa, mik\u00e4 tarjoaa tutun l\u00e4ht\u00f6kohdan. Aloita keitti\u00f6v\u00e4lineiden ja peruselintarvikkeiden visuaalisella tunnistamisella, lis\u00e4\u00e4 suomenkielist\u00e4 ruokasanastoa asteittain. Eri kulttuurien ruokaperinteet rikastuttavat keskustelua.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kokonainen ateria: laske ainesosien m\u00e4\u00e4r\u00e4t kolminkertaisena annoksena, budjetoi ruokaostokset, kirjoita selke\u00e4 resepti ja analysoi ravintosis\u00e4lt\u00f6\u00e4. Sis\u00e4llyt\u00e4 murtolukuja ja mittayksik\u00f6iden muunnoksia.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Reseptikansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan ruoanlaittoty\u00f6lehdet ja itse kirjoitetut reseptit koko jakson ajalta. Arvioi ruokasanaston kehittymist\u00e4, mittaustarkkuuden parantumista ja kyky\u00e4 kirjoittaa selke\u00e4\u00e4 proseduraalista teksti\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Reseptin kirjoitusteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittamaan oma resepti m\u00e4\u00e4rineen, vaiheittaisine ohjeineen ja tarvittavine v\u00e4lineineen. Arvioi proseduraalisen tekstin rakennetta, mittayksik\u00f6iden oikeaa k\u00e4ytt\u00f6\u00e4 ja sanavalintojen tarkkuutta.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Ainesosien lajitteluleikki',
      criteria: 'Anna oppilaalle ruokakuvakortteja ja pyyd\u00e4 lajittelemaan ne ryhm\u00e4\u00e4n: hedelmAt, vihannekset, viljatuotteet, maitotuotteet. Arvioi ruokaryhmien tuntemusta ja lajitteluperustelujen selkeytt\u00e4.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (mittaaminen ja murtoluvut)',
      connection: 'Ruoanlaitto vaatii tarkkaa mittaamista desilitroina, ruokalusikoina ja grammoina sek\u00e4 annosten kertomista ja jakamista. POPS 2014:n mittaamisen ja murtolukujen tavoitteet toteutuvat luonnollisesti reseptikontekstissa.',
      activity: 'Ainesosien laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat kolminkertaistavat yksinkertaisen reseptin ja laskevat uudet m\u00e4\u00e4r\u00e4t kertolaskulla.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Reseptit ovat proseduraalisen tekstin malliesimerkkej\u00e4, ja ruoanlaittosanasto kuten vatkaus, hauduttaminen ja taikinan kohottaminen laajentaa teknist\u00e4 sanavarastoa motivoivassa kontekstissa.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat oman yksinkertaisen reseptin k\u00e4ytt\u00e4en selkeit\u00e4 j\u00e4rjestyssanoja ja tarkkoja mittam\u00e4\u00e4ri\u00e4.',
    },
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (ravitsemus ja terveys)',
      connection: 'Ruoanlaittoteema tukee POPS 2014:n terveyskasvatuksen tavoitteita: terveellisten valintojen tekeminen, ruoan alkuper\u00e4n ymm\u00e4rt\u00e4minen ja lautasmallin soveltaminen.',
      activity: 'Lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kokoavat terveellisen lautasen kuvakorteista ja perustelevat valintansa ravitsemussuositusten pohjalta.',
    },
  ],

  uniqueAngle: 'Ruoanlaittoteemaiset ty\u00f6lehdet tarjoavat pedagogisen yhdistelm\u00e4n, jota harva muu teema pystyy j\u00e4ljittelem\u00e4\u00e4n: ne yhdist\u00e4v\u00e4t matemaattisen mittaamisen, proseduraalisen lukutaidon ja ravitsemuskasvatuksen yhdeksi kokonaisvaltaiseksi oppimiskehykseksi. Ruoanlaitto on yksi harvoista teemoista, joissa mittaaminen on v\u00e4litt\u00f6m\u00e4sti merkityksellist\u00e4 \u2014 desilitran ylim\u00e4\u00e4r\u00e4inen jauhomAR\u00e4 muuttaa kakun lopputulosta, mik\u00e4 tekee tarkkuudesta konkreettisesti t\u00e4rke\u00e4\u00e4. Reseptien lukeminen on proseduraalisen tekstin malliharjoitus: vaiheittainen j\u00e4rjestys, tarkat m\u00e4\u00e4r\u00e4t ja looginen eteneminen ovat reseptien ytimess\u00e4. Suomessa ruoanlaittotaito on tasa-arvoisesti kaikkien opetettava taito, ja POPS 2014 sis\u00e4lt\u00e4\u00e4 kotitalouden alkuopetuksesta l\u00e4htien. Suomalaiset ruokaperinteet \u2014 karjalanpiirakat, korvapuustit, mustikkapiirakka \u2014 tarjoavat kulttuurisen ankkurin, joka yhdist\u00e4\u00e4 oppimisen omaan perinteeseen. Ravitsemuskasvatuksen n\u00e4k\u00f6kulma rikastuttaa oppimista: lapset oppivat ruokaryhmist\u00e4, terveellisist\u00e4 valinnoista ja ruoan alkuper\u00e4st\u00e4 samalla kun harjoittelevat laskemista ja lukemista.',

  researchCitation: 'Cunningham-Sabo, L. & Lohse, B. (2013). Cooking with Kids Positively Affects Fourth Graders\u2019 Vegetable Preferences and Attitudes and Self-Efficacy for Food and Cooking. Childhood Obesity. Tutkimus osoitti, ett\u00e4 ruoanlaittoon integroitu oppiminen parantaa lasten asenteita terveellist\u00e4 ruokaa kohtaan, kehitt\u00e4\u00e4 mittaustaitoja ja vahvistaa itsetuntoa ruoanlaitossa.',

  culturalNotes: 'Suomessa ruoanlaitto on osa peruskoulun opetussuunnitelmaa kotitalouden kautta, ja perusruoanlaittotaidot ovat tasa-arvoisesti kaikkien opetettavia. POPS 2014 korostaa terveellisten elintapojen opettamista alkuopetuksesta l\u00e4htien. Suomalaiset ruokaperinteet kuten karjalanpiirakat, pulla ja mustikkapiirakka tarjoavat kulttuurisen kontekstin, joka yhdist\u00e4\u00e4 oppimisen perheiden ruokaperinteisiin ja vuodenaikojen raaka-aineisiin.',

  snippetDefinition: 'Ruoanlaittoteemaiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t ruokien, keitti\u00f6v\u00e4lineiden ja reseptien kuvituksia matematiikan, lukemisen ja ravitsemustiedon opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t ainesosien laskemista, mittausteht\u00e4vi\u00e4, sanahakuja ja reseptien lukemista.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille ruokien v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista laskemista, vanhemmille reseptilaskelmia ja mittausteht\u00e4vi\u00e4.',
    'Esittele p\u00e4iv\u00e4n ruoka-aihe lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 n\u00e4yt\u00e4 oikea hedelmA tai vihannes, jos mahdollista.',
    'Anna lapsen laskea ja mitata rauhallisesti ilman kiirett\u00e4, jotta ruokateema s\u00e4ilyy nautinnollisena oppimiskokemuksena.',
    'Yhdist\u00e4 ty\u00f6lehdet todelliseen ruoanlaittoon: tee yksinkertainen resepti ty\u00f6lehden j\u00e4lkeen konkreettisen yhteyden luomiseksi.',
    'Keskustele ruokaryhmist\u00e4 ja terveellisist\u00e4 valinnoista teht\u00e4vien v\u00e4liss\u00e4 ravitsemustietoisuuden kasvattamiseksi.',
    'Luo oma reseptikirja, johon lapsi ker\u00e4\u00e4 suosikkireseptins\u00e4 ja kuvittaa ne itse.',
    'Toista suosikkiteht\u00e4vi\u00e4 eri ruoka-aiheilla ja lis\u00e4\u00e4 vaikeustasoa asteittain taitojen vahvistuessa.',
  ],

  limitations: 'Ruoanlaittoteemaiset ty\u00f6lehdet vaativat herkkyyt\u00e4 allergioiden ja ruokarajoitusten suhteen: jotkut lapset eiv\u00e4t voi k\u00e4sitell\u00e4 tiettyjA raaka-aineita. Todellisten ruoanlaittoteht\u00e4vien yhdist\u00e4minen vaatii aikuisen valvontaa ja keitti\u00f6turvallisuuden huomioimista. Kulttuuriset ruokarajoitukset on kunnioitettava ja vaihtoehtoja tarjottava.',

  themeComparisons: [
    { vsThemeId: 'food', summary: 'Ruoanlaitto korostaa valmistusprosessia, reseptej\u00e4 ja keitti\u00f6taitoja, kun ruokateema esittelee elintarvikkeita yleisemmin niiden tunnistamisen ja luokittelun kautta. Ruoanlaitto lis\u00e4\u00e4 proseduraalisen ulottuvuuden, jota pelkk\u00e4 ruokateema ei tarjoa.' },
    { vsThemeId: 'fruits', summary: 'Ruoanlaitto k\u00e4ytt\u00e4\u00e4 hedelmi\u00e4 raaka-aineina resepteiss\u00e4 ja mittausteht\u00e4viss\u00e4, kun hedelm\u00e4teema keskittyy tunnistamiseen, nime\u00e4miseen ja luokitteluun. Ruoanlaitto lis\u00e4\u00e4 valmistuksen ja mittaamisen n\u00e4k\u00f6kulman.' },
    { vsThemeId: 'vegetables', summary: 'Ruoanlaitto integrooi vihannekset osaksi ateriakokonaisuuksia ja reseptej\u00e4, kun kasvisteema syventyy yksitt\u00e4isten kasvisten tunnistamiseen ja kasvuun. Ruoanlaitto rikastuttaa ravitsemuskasvatusta k\u00e4yt\u00e4nn\u00f6n valmistuksen kautta.' },
    { vsThemeId: 'household', summary: 'Ruoanlaitto tapahtuu kotiymP\u00e4rist\u00f6ss\u00e4 keitti\u00f6ss\u00e4, kun kotiteema kattaa koko kodin tilat ja esineet laajemmin. Ruoanlaitto syventyy yhteen kodin toimintaan tarjoten rikkaamman kontekstin mittaamiselle ja reseptien lukemiselle.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Ruokien ja keitti\u00f6v\u00e4lineiden v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 kakkujen, hedelmien ja keitti\u00f6v\u00e4lineiden kuvituksia samalla kehitt\u00e4en hienomotoriikkaa ja ruokasanastoa.' },
    { appId: 'find-and-count', anchorText: 'Laske ainesosia reseptiss\u00e4', context: 'Etsi ja laske ainesosia, keitti\u00f6v\u00e4lineit\u00e4 ja ruokia harjoitellen lukum\u00e4\u00e4rien tunnistamista ruoanlaittokontekstissa.' },
    { appId: 'word-search', anchorText: 'Ruokasanaston sanahaku', context: 'Etsi ruokasanastoa kuten vatkain, uuni, taikina ja mauste kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'picture-sort', anchorText: 'Lajittele ruoat ryhmiin', context: 'Ryhmittele ruokia kategorioihin kuten hedelmAt, vihannekset ja viljatuotteet luokittelutaitojen ja ravintotietouden kehitt\u00e4miseksi.' },
  ],

  expertTips: [
    { tip: 'Aloita ruoanlaittoteemaviikko yksinkertaisella no-bake-reseptill\u00e4, joka vaatii vain mittaamista ja sekoittamista. Ennen oikeaa ruoanlaittoa t\u00e4yt\u00e4 ainesosien laskentaty\u00f6lehti, jotta matematiikka saa v\u00e4litt\u00f6m\u00e4n k\u00e4yt\u00e4nn\u00f6n yhteyden.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 ruoanlaittoty\u00f6lehdet ravitsemuskasvatukseen: kun oppilaat lajittelevat ruokia ruokaryhmiin ty\u00f6lehdell\u00e4, koosta terveellinen lautasmalli oikeista ruokakuvista ja keskustele lautasmallin periaatteista.', source: 'Ravitsemuskasvatuksen asiantuntija', gradeRange: '1.\u20133. lk' },
    { tip: 'K\u00e4yt\u00e4 reseptien lukemista proseduraalisen tekstin opettamiseen: kiinnit\u00e4 huomiota j\u00e4rjestyssanoihin, mittam\u00e4\u00e4riin ja ohjemuotoon. T\u00e4m\u00e4 siirtyy suoraan ohjeiden kirjoittamiseen muissa oppiaineissa.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 3. Travel (matkailu) ──────────────────────────────────────────────────

const travelFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa laajentaa oppilaiden maantieteellist\u00e4 ymm\u00e4rryst\u00e4 ja kulttuuritietoisuutta ilman oikeaa luokkaretkibudjettia.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 matkailuaiheisia ty\u00f6lehti\u00e4 kuvitteellisen maailmanmatkan runkona: oppilaat laskevat matkalaukkujen esineit\u00e4, v\u00e4ritt\u00e4v\u00e4t maamerkke j\u00e4 eri maista, tekev\u00e4t sanahakuja matkailusanastolla ja ratkaisevat reitinetsint\u00e4pulmia karttapohjilla. Jokainen p\u00e4iv\u00e4 kohdistuu eri maanosaan.',
      outcome: 'Oppilaat oppivat maanosien ja maiden nimet, kehitt\u00e4v\u00e4t kulttuurista lukutaitoa ja harjoittelevat matemaattisia taitoja motivoivassa matkailukontekstissa ilman oikeaa matkustamista.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa valmistella lasta perheen tulevaan ulkomaanmatkaan opettamalla kohdemaasta samalla kun harjoitellaan akateemisia taitoja.',
      solution: 'Vanhempi valitsee kohdemaahan liittyvi\u00e4 matkailuty\u00f6lehti\u00e4: lapsi v\u00e4ritt\u00e4\u00e4 maamerkkej\u00e4, laskee matkatavaroita, harjoittelee perusfraaseleja kohdekielell\u00e4 ja tutkii karttaa reittisuunnittelun avulla.',
      outcome: 'Lapsi saapuu matkalle innostuneena ja valmistautuneena, tunnistaa maamerkke j\u00e4 ja osaa k\u00e4ytt\u00e4\u00e4 karttaa, samalla kun matemaattiset ja lukutaidot ovat vahvistuneet matkan suunnittelun kontekstissa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Matkailuaiheet', value: '20+ kohdetta' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4 maamerkkikuvituksia, maailmankarttoja ja lippukuvakortteja. Matkakohteiden v\u00e4rikoodaus maanosittain auttaa hahmottamaan maantieteellisi\u00e4 kokonaisuuksia ja muistamaan maiden sijainnit.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet matkalaukun pakkaamisleikkiin: lapsi pakkaa oikeat esineet oikeaan maahan, j\u00e4rjest\u00e4\u00e4 matkakortit reitin mukaiseen j\u00e4rjestykseen ja rakentaa pienoismaamerkkej\u00e4 askartelumateriaalista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Matkailu on erityisen arvokas teema monikulttuurisessa luokassa, koska jokainen oppilas voi tuoda oman kotimaan kulttuuriperint\u00f6\u00e4 esille. Aloita tuttujen maiden tunnistamisella kartalta ja lippukuvista, lis\u00e4\u00e4 suomenkielist\u00e4 matkailusanastoa asteittain.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kokonainen matka: laske lentokentAlth\u00e4n et\u00e4isyyksi\u00e4, budjetoi matkakulut eri valuutoissa, kirjoita matkasuunnitelma aikatauluineen ja tutkI kohdemaan maantiedett\u00e4 ja kulttuuria.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Matkap\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan matkailuty\u00f6lehdet, karttateht\u00e4v\u00e4t ja maamerkkikuvitukset koko jakson ajalta. Arvioi maantieteellisen tiedon kehittymist\u00e4, matkailusanaston laajentumista ja kyky\u00e4 kuvata eri kulttuureja.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Matkasuunnitelmaprojekti',
      criteria: 'Pyyd\u00e4 oppilasta suunnitella kuvitteellinen matka: valitse kohde, tutki maamerkit, laske matkabudjetti ja kirjoita matkasuunnitelma aikatauluineen. Arvioi tiedonhaun, matemaattisten taitojen ja kirjallisen ilmaisun yhdist\u00e4mist\u00e4.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Maanosien tunnistusteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle maailmankartta ja maamerkkikortit. Pyyd\u00e4 sijoittamaan maamerkit oikeille maanosille. Arvioi maantieteellisen tiedon tarkkuutta ja perustelukyky\u00e4.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (maantiede ja kulttuurit)',
      connection: 'Matkailuteema avaa ikkunan maailman maanosiin, maihin, ilmastoihin ja kulttuureihin. POPS 2014:n ymp\u00e4rist\u00f6opin maantieteen tavoitteet toteutuvat suoraan matkailukontekstissa.',
      activity: 'Maamerkkien tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat sijoittavat maamerkkikortit maailmankartalle maanosittain ja merkitsev\u00e4t jokaisen maan pAAkaupungin.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Matkailusanasto kuten passi, lentokentt\u00e4, maamerkki ja kulttuuri laajentaa kansainv\u00e4list\u00e4 sanavarastoa. Matkakertomusten ja -p\u00e4iv\u00e4kirjojen kirjoittaminen kehitt\u00e4\u00e4 kuvailevaa kirjallista ilmaisua.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen matkakertomuksen kuvitteellisesta vierailusta valitsemaansa maahan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 matkailusanaa.',
    },
    {
      subject: 'Matematiikka (laskeminen ja mittaaminen)',
      connection: 'Matkailu tarjoaa luonnollisen kontekstin et\u00e4isyyksien laskemiselle, valuuttalaskelmille ja matkabudjettien suunnittelulle. Kartan mittakaavan ymm\u00e4rt\u00e4minen yhdist\u00e4\u00e4 matematiikan ja maantieteen.',
      activity: 'Matkatavaroiden laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat laskevat yksinkertaisen matkabudjetin lis\u00e4\u00e4m\u00e4ll\u00e4 lento-, hotelli- ja ruokakustannukset.',
    },
  ],

  uniqueAngle: 'Matkailuteemaiset ty\u00f6lehdet tarjoavat ainutlaatuisen pedagogisen ikkunan, jota harva muu teema pystyy avaamaan: ne yhdist\u00e4v\u00e4t maantieteellisen ajattelun, kulttuuritietoisuuden ja k\u00e4yt\u00e4nn\u00f6n matemaattiset taidot yhdeksi kokonaisvaltaiseksi oppimiskokemukseksi. Jokainen ty\u00f6lehti vie lapsen kuvitteelliselle matkalle, jossa h\u00e4n kohtaa eri maiden maamerkkej\u00e4, lippuja, karttoja ja kulttuuriperinteit\u00e4 samalla harjoitellen laskemista, lukemista ja ongelmanratkaisua. Suomessa kansainv\u00e4lisyyskasvatus on POPS 2014:n laaja-alaisen osaamisen keskeinen tavoite, ja matkailuteema toteuttaa t\u00e4m\u00e4n yhteyden konkreettisesti. Suomalainen n\u00e4k\u00f6kulma matkailuun on erityisen kiinnostava: Suomi sijaitsee Euroopan pohjoisreunalla, ja matkailu avaa ikkunan etel\u00e4isempiin maihin, l\u00e4mpim\u00e4mpiin ilmastoihin ja erilaisiin kulttuureihin. Monikulttuurisen luokan oppilaille matkailuteema tarjoaa arvokkaAn mahdollisuuden jakaa oman taustansa kulttuuria, mik\u00e4 vahvistaa osallisuutta ja identiteettiA.',

  researchCitation: 'Shin, E. K. (2006). Using Geographic Information System (GIS) to Improve Fourth Graders\u2019 Geographic Content Knowledge and Map Skills. Journal of Geography. Tutkimus osoitti, ett\u00e4 karttapohjaiseen oppimiseen ankkuroidut teht\u00e4v\u00e4t parantavat merkitt\u00e4v\u00e4sti oppilaiden maantieteellist\u00e4 sis\u00e4lt\u00f6tietoa, kartanlukutaitoja ja tilallista ajattelua.',

  culturalNotes: 'Suomessa kansainv\u00e4lisyyskasvatus on opetussuunnitelman laaja-alainen tavoite, ja matkailuteema tarjoaa luonnollisen portin maailman kulttuureihin, kieliin ja maantieteeseen. POPS 2014 painottaa kulttuurista osaamista ja vuorovaikutusta sek\u00e4 monikulttuurisuuden arvostamista. Suomen sijainti Euroopan pohjoisreunalla tekee matkailusta erityisen kiehtovan aiheen: lapset oppivat vertaamaan omaa ilmastoaan, luontoaan ja kulttuuriaan muiden maiden vastaaviin.',

  snippetDefinition: 'Matkailuaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t maamerkkien, karttojen, lippujen ja matkatavaroiden kuvituksia maantieteen, matematiikan ja lukemisen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t karttateht\u00e4vi\u00e4, matkabudjettilaskelmia, sanahakuja ja maamerkkien tunnistamista.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille maamerkkien v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista laskemista, vanhemmille karttateht\u00e4vi\u00e4 ja matkasuunnitelmia.',
    'Esittele p\u00e4iv\u00e4n kohdemaa lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 n\u00e4yt\u00e4 kartalta sijainti ja kerro yksi kiinnostava tosiasia.',
    'Anna lapsen tutkia ja v\u00e4ritt\u00e4\u00e4 rauhallisesti ilman kiirett\u00e4, jotta matkailuteema s\u00e4ilyy seikkailullisena oppimiskokemuksena.',
    'Yhdist\u00e4 ty\u00f6lehdet virtuaalisiin maamerkkikierroksiin tai valokuvaesityksiin monitasoisen kokemuksen luomiseksi.',
    'Keskustele eri maiden kulttuureista, kielistA ja tavoista teht\u00e4vien v\u00e4liss\u00e4 kulttuuritietoisuuden kasvattamiseksi.',
    'Luo sein\u00e4lle maailmankartta, johon lapsi lis\u00e4\u00e4 uuden maan jokaiselta ty\u00f6lehtikerralta matkan edistymisen seuraamiseksi.',
    'Toista suosikkiteht\u00e4vi\u00e4 uusilla kohdemailla ja lis\u00e4\u00e4 maantieteellist\u00e4 haastetta asteittain.',
  ],

  limitations: 'Matkailuteemaiset ty\u00f6lehdet saattavat korostaa taloudellisesti etuoikeutettua n\u00e4k\u00f6kulmaa, koska kaikki perheet eiv\u00e4t voi matkustaa ulkomaille. Kasvattajien tulee varmistaa, ett\u00e4 matkailua k\u00e4sitell\u00e4\u00e4n laajasti sis\u00e4lt\u00e4en my\u00f6s l\u00e4himatkailua ja virtuaalisia matkoja. Kulttuurien esitt\u00e4mist\u00e4 stereotypioiden kautta on v\u00e4ltett\u00e4v\u00e4.',

  themeComparisons: [
    { vsThemeId: 'transportation', summary: 'Matkailu keskittyy kohteisiin, kulttuureihin ja maantieteeseen, kun liikenneteema korostaa kulkuneuvoja ja niiden toimintaa. Matkailu vastaa kysymykseen minne menn\u00e4\u00e4n ja miksi, kun liikenne vastaa miten liikutaan.' },
    { vsThemeId: 'camping', summary: 'Matkailu kattaa kansainv\u00e4liset kohteet, maanostien kulttuurit ja kaupunkimaamerkit, kun retkeily keskittyy luontoon ja eR\u00e4maahan. Matkailu on maantieteellisesti laajempi, retkeily ekologisesti syvempi.' },
    { vsThemeId: 'food', summary: 'Matkailu esittelee eri maiden ruokakulttuureita osana kulttuurituntemusta, kun ruokateema keskittyy elintarvikkeiden tunnistamiseen ja luokitteluun. Matkailu lis\u00e4\u00e4 kansainv\u00e4lisen ulottuvuuden ruokakeskusteluun.' },
    { vsThemeId: 'holidays', summary: 'Matkailu ja juhlap\u00e4iv\u00e4t leikkaavat luonnollisesti: monet matkat liittyv\u00e4t lomiin ja juhliin. Matkailu korostaa maantieteellist\u00e4 liikkumista, kun juhlateema keskittyy perinteisiin ja seremonioihin paikasta riippumatta.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Maamerkkien v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 Eiffel-tornin, vapaudenpatsaan ja muiden maamerkkien kuvituksia samalla kehitt\u00e4en hienomotoriikkaa ja kulttuuritietoisuutta.' },
    { appId: 'find-objects', anchorText: 'Etsi matkatavarat kuvasta', context: 'Etsi piilotettuja matkatavaroita, passeja ja karttoja kuvista harjoitellen visuaalista tarkkaavaisuutta matkailukontekstissa.' },
    { appId: 'word-search', anchorText: 'Matkailusanaston sanahaku', context: 'Etsi matkailusanastoa kuten lentokenttA, passi, maamerkki ja hotelli kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'treasure-hunt', anchorText: 'Matkailun aarteenmetsastys', context: 'Ratkaise vihjeit\u00e4 ja etsi aarteita kartalta yhdist\u00e4en ongelmanratkaisun maantieteelliseen ajatteluun.' },
  ],

  expertTips: [
    { tip: 'Aloita matkailuteemaviikko ripustamalla sein\u00e4lle suuri maailmankartta. Jokaisen ty\u00f6lehtip\u00e4iv\u00e4n j\u00e4lkeen oppilaat lis\u00e4\u00e4v\u00e4t uuden maakohtaisen tarran kartalle, jolloin matka visualisoituu edistyv\u00e4n\u00e4 projektina.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 matkailuty\u00f6lehdet virtuaalisiin maamerkkikierroksiin: Google Earth -kuvien tutkiminen kohdemaan maamerkeist\u00e4 ennen tai j\u00e4lkeen ty\u00f6lehti\u00e4 syvent\u00e4\u00e4 maantieteellist\u00e4 ymm\u00e4rryst\u00e4 ja tekee oppimisesta monitasoista.', source: 'Maantieteen aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Monikulttuurisessa luokassa anna oppilaiden esitell\u00e4 oma kotimaansa tai vanhempien kotimaa matkailukohteena. T\u00e4m\u00e4 vahvistaa osallisuutta, identiteettiA ja arvostusta eri kulttuureja kohtaan.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 4. Birthday (syntymapaiva) ────────────────────────────────────────────

const birthdayFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa juhlistaa oppilaiden syntymp\u00e4ivi\u00e4 oppimisen kautta, mutta luokan s\u00e4\u00e4nn\u00f6t est\u00e4v\u00e4t makeisten tuomisen kouluun.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 syntymp\u00e4iv\u00e4aiheisia ty\u00f6lehti\u00e4 juhlahetken\u00e4: syntymp\u00e4iv\u00e4lapsi saa erityisen ty\u00f6lehtipaketin, jossa lasketaan lahjojen ja ilmapallojen m\u00e4\u00e4ri\u00e4, v\u00e4ritet\u00e4\u00e4n kakku ja tehd\u00e4\u00e4n syntymp\u00e4iv\u00e4sanaston sanahaku. Koko luokka osallistuu yhteiseen juhlamatikointiin.',
      outcome: 'Syntymp\u00e4iv\u00e4t saavat arvokkaan juhlahetken ilman makeisia, matemaattiset taidot vahvistuvat juhlatunnelmassa ja luokan yhteishenkI kasvaa jaetussa juhlakokemuksessa.',
    },
    {
      situation: 'Kotikouluvanhempi etsii tapaa yhdist\u00e4\u00e4 lapsen innostus tulevista syntymp\u00e4ivistA akateemiseen harjoitteluun ilman ett\u00e4 se tuntuu kouluty\u00f6lt\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 syntymp\u00e4iv\u00e4ty\u00f6lehti\u00e4 juhlien suunnitteluharjoituksena: lapsi laskee vieraiden m\u00e4\u00e4r\u00e4n, budjetoi koristeet, kirjoittaa kutsukortit ja suunnittelee juhlaohjelman. Ty\u00f6lehdet toimivat osana todellista juhlien valmistelua.',
      outcome: 'Lapsi kokee oppimisen osana juhlavalmisteluja, laskemis- ja kirjoitustaidot vahvistuvat luonnollisesti ja syntymp\u00e4iv\u00e4juhlista tulee kokonaisvaltainen oppimisprojekti.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Juhla-aiheet', value: '15+ aihepiiri\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4 juhlakuvituksia: kakkuja, ilmapalloja, lahjoja ja serpentiininauhoja. Juhlan suunnittelukaavio v\u00e4rikoodein auttaa hahmottamaan kokonaisuuden ja vaiheet.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet todelliseen juhlien valmisteluun: lapsi koristele huoneen, pakkaa lahjan, j\u00e4rjest\u00e4 p\u00f6yt\u00e4kattauksen ja laskee tarjottavat samalla kun t\u00e4ytt\u00e4\u00e4 vastaavat ty\u00f6lehtiteht\u00e4v\u00e4t.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Syntymp\u00e4iv\u00e4t ovat universaali juhla kaikissa kulttuureissa, mik\u00e4 tarjoaa tutun l\u00e4ht\u00f6kohdan. Aloita juhlaesineiden visuaalisella tunnistamisella, lis\u00e4\u00e4 suomenkielist\u00e4 juhlasanastoa asteittain. Eri kulttuurien syntymp\u00e4iv\u00e4perinteet rikastuttavat keskustelua.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kokonaiset syntymp\u00e4iv\u00e4juhlat: budjetoi kustannukset, laske tarjoilujen m\u00e4\u00e4r\u00e4t per vieras, suunnittele ohjelma aikatauluineen ja kirjoita kutsukortit. Sis\u00e4llyt\u00e4 kertolaskua ja budjetinhallintaa.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Juhlien suunnittelukansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan syntymp\u00e4iv\u00e4ty\u00f6lehdet, kutsukortit ja budjetit koko jakson ajalta. Arvioi juhlasanaston kehittymist\u00e4, laskutaitojen soveltamista ja kyky\u00e4 organisoida kokonaisvaltainen juhlatapahtuma.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kutsukortin kirjoitusteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta suunnitella ja kirjoittaa syntymp\u00e4iv\u00e4kutsu sis\u00e4lt\u00e4en p\u00e4iv\u00e4m\u00e4\u00e4r\u00e4n, kellonajan, paikan ja ohjelman. Arvioi kirjallisen ilmaisun selkeytt\u00e4, tietojen t\u00e4ydellisyytt\u00e4 ja visuaalista suunnittelua.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Ilmapallojen laskenta- ja v\u00e4rilajitteluleikki',
      criteria: 'Anna oppilaalle v\u00e4rillisi\u00e4 ilmapallokuvakortteja. Pyyd\u00e4 lajittelemaan v\u00e4reitt\u00e4in, laskemaan kukin ryhm\u00e4 ja kertomaan kokonaism\u00e4\u00e4r\u00e4. Arvioi lajittelu-, laskemis- ja yhteenlaskutaitoja.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (laskeminen ja budjetointi)',
      connection: 'Syntymp\u00e4iv\u00e4juhlat tarjoavat luonnollisen kontekstin laskemiselle, kertolaskulle ja yksinkertaiselle budjetoinnille. Vieraiden, ilmapallojen ja tarjoilujen laskeminen harjoittaa POPS 2014:n matemaattisia peruslaskutaitoja.',
      activity: 'Ilmapallojen laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat juhlabudjetin lis\u00e4\u00e4m\u00e4ll\u00e4 koristeiden, kakkujen ja leikkien kustannukset.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Syntymp\u00e4iv\u00e4kutsun kirjoittaminen on autenttinen kirjoitusteht\u00e4v\u00e4, joka harjoittaa tiedon j\u00e4sentelyA, asiointiteksti\u00e4 ja tarkkaa ilmaisua motivoivassa kontekstissa.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat syntymp\u00e4iv\u00e4kutsun sis\u00e4lt\u00e4en kaikki oleelliset tiedot ja kuvittavat sen itse.',
    },
    {
      subject: 'Musiikki ja kuvataide',
      connection: 'Syntymp\u00e4iv\u00e4teema yhdistyy POPS 2014:n taidekasvatuksen tavoitteisiin juhlien koristelusuunnittelun, kutsukorttien taiteellisen toteutuksen ja juhlamusiikin kautta.',
      activity: 'V\u00e4ritysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat ja askartelevat oman kutsukortin yhdist\u00e4en kuvataiteen ja kirjoittamisen.',
    },
  ],

  uniqueAngle: 'Syntymp\u00e4iv\u00e4aiheiset ty\u00f6lehdet tarjoavat pedagogisen ulottuvuuden, joka hy\u00f6dynt\u00e4\u00e4 lapsen voimakkainta henkil\u00f6kohtaista motivaatiota: omien juhliensa odotusta ja suunnittelua. Mikaan muu teema ei saa lasta laskemaan, kirjoittamaan ja suunnittelemaan yht\u00e4 innokkaasti kuin oman syntymp\u00e4iv\u00e4n konteksti. T\u00e4m\u00e4 emotionaalinen yhteys muuttaa matemaattiset teht\u00e4v\u00e4t merkityksellisiksi: ilmapallojen laskeminen on t\u00e4rke\u00e4\u00e4, koska niit\u00e4 tarvitaan oikeasti juhlissa, ja kutsukortin kirjoittaminen on autenttinen viestint\u00e4teht\u00e4v\u00e4. Suomessa syntymp\u00e4iv\u00e4perinteet ovat t\u00e4rke\u00e4 osa lasten sosiaalista el\u00e4m\u00e4\u00e4, ja syntymp\u00e4iv\u00e4juhlien suunnittelu opettaa organisointitaitoja, toisten huomioimista ja yhteisty\u00f6t\u00e4 \u2014 POPS 2014:n laaja-alaisen osaamisen ydintaitoja. Juhlasuunnittelun per\u00e4kk\u00e4isyys \u2014 kutsu, koristelu, tarjoilu, ohjelma \u2014 opettaa j\u00e4rjestelm\u00e4llist\u00e4 ajattelua luonnollisesti ja iloisessa kontekstissa.',

  researchCitation: 'Hidi, S. & Renninger, K. A. (2006). The Four-Phase Model of Interest Development. Educational Psychologist. Tutkimus osoitti, ett\u00e4 henkil\u00f6kohtaisesti merkityksellinen sis\u00e4lt\u00f6 \u2014 kuten syntymp\u00e4iv\u00e4t \u2014 laukaisee ja yll\u00e4pit\u00e4\u00e4 oppimismotivaatiota tehokkaammin kuin abstrakti sis\u00e4lt\u00f6, johtaen syvEmp\u00e4\u00e4n sitoutumiseen ja pidemp\u00e4\u00e4n muistamiseen.',

  culturalNotes: 'Suomessa syntymp\u00e4iv\u00e4t ovat lasten sosiaalisen el\u00e4m\u00e4n kohokohtia, ja kouluissa oppilaiden syntymp\u00e4ivi\u00e4 juhlistetaan usein yhdess\u00e4. POPS 2014 korostaa yhteis\u00f6llisyytt\u00e4 ja toisten huomioimista, ja syntymp\u00e4iv\u00e4teema toteuttaa n\u00e4it\u00e4 tavoitteita luonnollisesti. Suomalaisissa syntymp\u00e4iv\u00e4perinteiss\u00e4 korostuvat syntymAP\u00e4iv\u00e4kakku kynttil\u00f6ineen, pienet lahjat ja yhteiset leikit.',

  snippetDefinition: 'Syntymp\u00e4iv\u00e4aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kakkujen, ilmapallojen, lahjojen ja juhlien kuvituksia matematiikan, lukemisen ja sosiaalisten taitojen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lahjojen laskemista, kutsukorttien kirjoittamista, sanahakuja ja juhlasuunnittelua.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille kakkujen v\u00e4ritt\u00e4mist\u00e4 ja ilmapallojen laskemista, vanhemmille juhlabudjetteja ja kutsukorttien kirjoittamista.',
    'Yhdist\u00e4 ty\u00f6lehdet lapsen oikeisiin syntymp\u00e4iv\u00e4valmisteluihin konkreettisen yhteyden luomiseksi oppimisen ja juhlan v\u00e4lill\u00e4.',
    'Anna lapsen v\u00e4ritt\u00e4\u00e4 ja laskea rauhallisesti ilman kiirett\u00e4, jotta syntymp\u00e4iv\u00e4teema s\u00e4ilyy iloisena oppimiskokemuksena.',
    'Keskustele juhlien suunnittelun vaiheista: keitA kutsutaan, mit\u00e4 tarjotaan, miten koristellaan, mit\u00e4 leikitA\u00e4n.',
    'Harjoittele kutsukortin kirjoittamista: opeta p\u00e4iv\u00e4m\u00e4\u00e4r\u00e4n, kellonajan ja paikan kirjoittamisen taidot.',
    'Luo luokkaan syntymp\u00e4iv\u00e4kalenteri, johon merkitA\u00e4n kaikkien syntymp\u00e4iv\u00e4t ja lasketaan p\u00e4ivi\u00e4 seuraavaan juhlaan.',
    'Toista suosikkiteht\u00e4vi\u00e4 eri juhlatyyleill\u00e4 ja lis\u00e4\u00e4 haastetta budjetoinnin ja suunnittelun kautta.',
  ],

  limitations: 'Syntymp\u00e4iv\u00e4teema saattaa olla herkkA aihe lapsille, joiden perheiss\u00e4 syntymp\u00e4ivi\u00e4 ei juhlita uskonnollisista tai taloudellisista syist\u00e4. Kasvattajien tulee olla herkki\u00e4 eri perheiden perinteille ja tarjota vaihtoehtoisia n\u00e4k\u00f6kulmia. Vertailua juhlien laajuudesta tulee v\u00e4ltt\u00e4\u00e4.',

  themeComparisons: [
    { vsThemeId: 'holidays', summary: 'Syntymp\u00e4iv\u00e4 on henkil\u00f6kohtainen juhla, kun juhlap\u00e4iv\u00e4t ovat yhteiskunnallisia tai uskonnollisia merkkip\u00e4ivi\u00e4. Syntymp\u00e4iv\u00e4teema tarjoaa yksil\u00f6llisemm\u00e4n yhteyden ja emotionaalisemman motivaation, kun juhlateema kattaa laajemmin kulttuuriperinteen.' },
    { vsThemeId: 'food', summary: 'Syntymp\u00e4iv\u00e4 sis\u00e4lt\u00e4\u00e4 juhlaruokia kuten kakun ja tarjoilut, mutta p\u00e4\u00e4paino on juhlien suunnittelussa ja sosiaalisessa vuorovaikutuksessa. Ruokateema keskittyy elintarvikkeisiin laajemmin ilman juhlan kontekstia.' },
    { vsThemeId: 'cooking', summary: 'Syntymp\u00e4iv\u00e4 sis\u00e4lt\u00e4\u00e4 kakun leipomista, mutta p\u00e4\u00e4paino on kokonaisvaltaisessa juhlasuunnittelussa ja sosiaalisissa taidoissa. Ruoanlaittoteema syventyy resepteihin ja keitti\u00f6taitoihin laajemmin.' },
    { vsThemeId: 'music', summary: 'Syntymp\u00e4iv\u00e4juhlissa lauletaan ja soitetaan, mutta p\u00e4\u00e4paino on kokonaisvaltaisessa juhlakokemuksessa. Musiikkiteema syventyy rytmiin, melodiaan ja soittimiin itsen\u00e4isen\u00e4 taidemuotona.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Syntymp\u00e4iv\u00e4kakkujen v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 kakkuja, ilmapalloja ja juhlakoristeluja samalla kehitt\u00e4en hienomotoriikkaa ja juhlasanastoa.' },
    { appId: 'find-and-count', anchorText: 'Laske syntymp\u00e4iv\u00e4lahjoja', context: 'Etsi ja laske lahjoja, ilmapalloja ja kynttil\u00f6it\u00e4 harjoitellen lukum\u00e4\u00e4rien tunnistamista juhlakontekstissa.' },
    { appId: 'word-search', anchorText: 'Syntymp\u00e4iv\u00e4sanaston sanahaku', context: 'Etsi juhlasanastoa kuten kakku, ilmapallo, lahja ja kynttil\u00e4 kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'word-scramble', anchorText: 'Syntymp\u00e4iv\u00e4sanojen sekoituspeli', context: 'Ratkaise sekoitettuja syntymp\u00e4iv\u00e4sanoja harjoitellen oikeinkirjoitusta ja sanastoa juhlateemalla.' },
  ],

  expertTips: [
    { tip: 'K\u00e4yt\u00e4 syntymp\u00e4iv\u00e4ty\u00f6lehtiE luokassa jokaisen oppilaan syntymp\u00e4iv\u00e4n\u00e4: syntymp\u00e4iv\u00e4lapsi saa erityisen teht\u00e4v\u00e4paketin ja koko luokka laskee yhdess\u00e4, montako kynttil\u00e4\u00e4 kakkuun tulee. T\u00e4m\u00e4 luo juhlahetken ilman makeisia.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 syntymp\u00e4iv\u00e4teema matematiikan budjetointiprojektiin: oppilaat suunnittelevat juhlat budjetilla, laskevat kustannukset ja vertailevat eri vaihtoehtoja. T\u00e4m\u00e4 kehitt\u00e4\u00e4 taloudellista ajattelua motivoivassa kontekstissa.', source: 'Matematiikan aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Herkiss\u00e4 luokkatilanteissa mukauta syntymp\u00e4iv\u00e4teemaa: k\u00e4yt\u00e4 juhla-termi\u00e4 syntymp\u00e4iv\u00e4n sijaan ja keskity yleiseen juhlien suunnitteluun. T\u00e4m\u00e4 mahdollistaa kaikkien osallistumisen riippumatta perheen juhlatraditioista.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 5. Circus (sirkus) ───────────────────────────────────────────────────

const circusFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa yll\u00e4pit\u00e4\u00e4 oppilaiden motivaatiota kev\u00e4tlukukauden lopulla, kun v\u00e4symys on merkittAvA haaste ja perinteiset teemat eiv\u00e4t en\u00e4\u00e4 innosta.',
      solution: 'H\u00e4n valitsee sirkusteeman: oppilaat laskevat jongleerauspallojen ja akrobaattien m\u00e4\u00e4ri\u00e4, v\u00e4ritt\u00e4v\u00e4t sirkustelttoja ja pellej\u00e4, tekev\u00e4t sanahakuja sirkussanastolla ja ratkaisevat sirkusaiheisia pulmia. Dramaattinen ja v\u00e4rik\u00e4s teema her\u00e4tt\u00e4\u00e4 huomion uudelleen.',
      outcome: 'Oppilaiden innostus palaa, matemaattiset taidot vahvistuvat sirkuksen seikkailullisessa kontekstissa ja luokan energia s\u00e4ilyy korkealla lukukauden loppuun asti.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 liikkumisen, luovuuden ja akateemiset taidot lapselle, joka on kiinnostunut esitt\u00e4mist\u00e4 ja temppuilusta.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 sirkusty\u00f6lehdet k\u00e4yt\u00e4nn\u00f6n sirkustaitoihin: lapsi harjoittelee jongleerausta ja tasapainoilua, sitten t\u00e4ytt\u00e4\u00e4 sirkuslaskentateht\u00e4v\u00e4n ja kirjoittaa sirkusesityksen ohjelman.',
      outcome: 'Lapsi kokee oppimisen sirkusseikkailuna, fyysinen aktiivisuus ja akateemiset taidot yhdistyv\u00e4t luonnollisesti ja luovuus kukoistaa esitt\u00e4v\u00e4n taiteen kontekstissa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Sirkusaiheet', value: '15+ aihepiiri\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikylLaisi\u00e4 sirkuskuvituksia: telttoja, pellej\u00e4, akrobaatteja ja el\u00e4imi\u00e4. Sirkusohjelman visuaalinen esitys aikajanamuodossa auttaa hahmottamaan esityksen rakenteen.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet fyysisiin sirkustaitoihin: lapsi harjoittelee jongleerausta huiveilla, tasapainoilee naruilla ja esitt\u00e4\u00e4 pelleroolia ennen tai j\u00e4lkeen paperiteht\u00e4vi\u00e4. Kehollinen oppiminen vahvistaa sirkusteeman kokemuksellisuutta.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Sirkus on kansainv\u00e4linen taidemuoto, joka tunnetaan kaikissa kulttuureissa. Aloita sirkushahmojen visuaalisella tunnistamisella ja nime\u00e4misell\u00e4, lis\u00e4\u00e4 suomenkielist\u00e4 sirkussanastoa asteittain. Sirkusesityksen universaalius tukee osallisuutta.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kokonainen sirkusesitys: kirjoita ohjelma aikatauluineen, laske lipputulot eri hintaluokissa, suunnittele julisteen ulkoasu ja kirjoita arvostelu kuvitteellisesta esityksest\u00e4.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Sirkusesityksen suunnittelukansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan sirkusty\u00f6lehdet, esitysohjelmat ja julisteet koko jakson ajalta. Arvioi sirkussanaston kehittymist\u00e4, matemaattisten taitojen soveltamista ja kyky\u00e4 suunnitella kokonaisvaltainen esitys.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Sirkusesityksen ohjelmakirjoitus',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittaa sirkusesityksen ohjelma sis\u00e4lt\u00e4en numerot, esitt\u00e4j\u00e4t ja kestot. Arvioi proseduraalisen tekstin rakennetta, aikatauluttamisen taitoa ja sanaston monipuolisuutta.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Jongleerauspallojen laskentaleikki',
      criteria: 'Anna oppilaalle sirkuskuvakortteja eri esineill\u00e4 (pallot, keilat, renkaat). Pyyd\u00e4 lajittelemaan tyypeit\u00e4\u00e4n, laskemaan kukin ryhm\u00e4 ja laskemaan kokonaism\u00e4\u00e4r\u00e4. Arvioi lajittelu- ja laskutaitoja.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Liikunta ja motorinen kehitys',
      connection: 'Sirkusteema yhdistyy luontevasti POPS 2014:n liikunnan tavoitteisiin: tasapaino, koordinaatio, rytmi ja kehonhallinta. Sirkustaidot ovat pedagogisesti arvokkaita fyysisen kehityksen tukemisessa.',
      activity: 'Akrobaattien laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat harjoittelevat yksinkertaisia tasapainoasentoja ja huiviongleerausta liikuntasalissa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Sirkussanasto kuten akrobaatti, jongleerata, trapetsi ja areenateema laajentaa esitt\u00e4v\u00e4n taiteen sanavarastoa. Sirkusarvostelun kirjoittaminen kehitt\u00e4\u00e4 mielipidetekstin taitoja.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen arvostelun kuvitteellisesta sirkusesityksest\u00e4 k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 sirkussanaa.',
    },
    {
      subject: 'Matematiikka (laskeminen ja symmetria)',
      connection: 'Sirkuksen monet esineet \u2014 pallot, keilat, renkaat, klovnit \u2014 tarjoavat rikkaan laskemiskontekstin, ja sirkusteltan symmetrinen rakenne tukee geometrian oppimista.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t symmetrisen sirkusteltan ja tunnistavat symmetria-akselin.',
    },
  ],

  uniqueAngle: 'Sirkusaiheiset ty\u00f6lehdet tarjoavat pedagogisen energiapiikin, jota harva muu teema pystyy tuottamaan: ne yhdist\u00e4v\u00e4t draaman, liikkumisen, visuaalisen n\u00e4ytt\u00e4vyyden ja akateemiset taidot yhdeksi s\u00e4hk\u00f6ist\u00e4v\u00e4ksi oppimiskehykseksi. Sirkuksen v\u00e4rikkyys, jAnnitys ja ihmeellisyys vangitsevat huomion tehokkaasti my\u00f6s lapsilla, jotka eiv\u00e4t tavallisesti innostu paperiteht\u00e4vist\u00e4. Suomessa sirkustaide on arvostettu esitt\u00e4v\u00e4n taiteen muoto, ja monet koulut j\u00e4rjest\u00e4v\u00e4t sirkuspajoja liikuntatuntien osana. POPS 2014 korostaa ilmaisun rohkeutta, fyysist\u00e4 aktiivisuutta ja taiteellista ilmaisua, ja sirkusteema toteuttaa n\u00e4it\u00e4 kaikkia luonnollisesti. Sirkuksen luovuus ja seikkailullisuus tekev\u00e4t matemaattisista teht\u00e4vist\u00e4 j\u00e4nnitt\u00e4vi\u00e4: jongleerauspallojen laskeminen tuntuu taikurilta, ei aritmetiikalta. Esitt\u00e4v\u00e4n taiteen elementti lis\u00e4\u00e4 sosiaalisen oppimisen ulottuvuuden, kun lapset suunnittelevat ja esitt\u00e4v\u00e4t omia sirkusnumeroitaan.',

  researchCitation: 'Cadwell, N. (2015). New Directions in Circus: Handbook of Arts Education. Tutkimus osoitti, ett\u00e4 sirkustaiteen integrointi opetukseen parantaa merkitt\u00e4v\u00e4sti oppilaiden kehonhallintaa, luovaa itseluottamusta, ryhm\u00e4ty\u00f6taitoja ja positiivista suhtautumista oppimiseen.',

  culturalNotes: 'Suomessa sirkustaide on arvostettu esitt\u00e4v\u00e4n taiteen muoto, ja Sirkus Finlandia ja monet paikalliset sirkuskoulut tarjoavat lasten sirkuspajoja kautta maan. POPS 2014 sis\u00e4lt\u00e4\u00e4 ilmaisutaidon ja draaman elementtej\u00e4, joihin sirkusteema yhdistyy luontevasti. Suomalainen sirkusperinne korostaa uutta sirkusta, jossa fyysinen taito yhdistyy taiteelliseen ilmaisuun.',

  snippetDefinition: 'Sirkusaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t pellejen, akrobaattien, sirkusteltan ja el\u00e4inten kuvituksia matematiikan, lukemisen ja luovan ilmaisun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t sirkusesineiden laskemista, v\u00e4ritysteht\u00e4vi\u00e4, sanahakuja ja esityksen suunnittelua.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille pellejen v\u00e4ritt\u00e4mist\u00e4 ja pallojen laskemista, vanhemmille esitysohjelman kirjoittamista ja lipputulojen laskemista.',
    'Esittele sirkuksen maailma lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 n\u00e4yt\u00e4 kuvia tai videop\u00e4tki\u00e4 sirkusesityksist\u00e4.',
    'Anna lapsen v\u00e4ritt\u00e4\u00e4 ja laskea rauhallisesti ilman kiirett\u00e4, jotta sirkusteema s\u00e4ilyy seikkailullisena oppimiskokemuksena.',
    'Yhdist\u00e4 ty\u00f6lehdet fyysisiin sirkustaitoihin: huivijongleeraus, tasapainopuomi ja pellen roolileikki tuovat kokemuksellisuutta.',
    'Keskustele sirkuksen eri numeroista ja taitelijoista teht\u00e4vien v\u00e4liss\u00e4 sanaston laajentamiseksi.',
    'Suunnitelkaa ja esitt\u00e4k\u00e4\u00e4 pieni luokkasirkus, jossa jokainen oppilas esitt\u00e4\u00e4 oman numeron.',
    'Toista suosikkiteht\u00e4vi\u00e4 eri sirkusaiheilla ja lis\u00e4\u00e4 haastetta esityksen suunnittelun ja budjetoinnin kautta.',
  ],

  limitations: 'Sirkusaiheiset ty\u00f6lehdet saattavat her\u00e4tt\u00e4\u00e4 keskustelua el\u00e4inten k\u00e4yt\u00f6st\u00e4 sirkuksissa, mik\u00e4 on eettisesti kyseenalaista ja monissa maissa kiellettyA. Kasvattajien tulee painottaa modernia sirkusta, jossa k\u00e4ytet\u00e4\u00e4n ihmistaitelijoita. Fyysisten sirkustaitojen harjoittelu vaatii asianmukaista turvallisuusvalvontaa.',

  themeComparisons: [
    { vsThemeId: 'animals', summary: 'Sirkus voi sis\u00e4lt\u00e4\u00e4 el\u00e4imi\u00e4, mutta p\u00e4\u00e4paino on esitt\u00e4v\u00e4ss\u00e4 taiteessa ja fyysisiss\u00e4 taidoissa, kun el\u00e4inteema keskittyy el\u00e4inten tuntemukseen ja luonnontieteen oppimiseen. Moderni sirkusteema korostaa ihmisen taitoja.' },
    { vsThemeId: 'birthday', summary: 'Sirkus ja syntymp\u00e4iv\u00e4t jakavat juhlallisuuden ja ilon, mutta sirkus korostaa esitt\u00e4v\u00e4\u00e4 taidetta ja fyysist\u00e4 taitoa, kun syntymp\u00e4iv\u00e4teema keskittyy henkilokohtaiseen juhlaan ja sosiaaliseen vuorovaikutukseen.' },
    { vsThemeId: 'music', summary: 'Sirkus ja musiikki ovat molemmat esitt\u00e4vi\u00e4 taiteita, mutta sirkus yhdist\u00e4\u00e4 visuaalisen n\u00e4ytt\u00e4vyyden ja fyysisen taidon, kun musiikkiteema syventyy rytmiin, melodiaan ja soittimiin. Yhdess\u00e4 ne kattavat esitt\u00e4v\u00e4n taiteen monet ulottuvuudet.' },
    { vsThemeId: 'fairy-tales', summary: 'Sirkus ja sadut jakavat ihmeellisyyden ja mielikuvituksen, mutta sirkus on konkreettinen esitt\u00e4v\u00e4 taide, kun sadut ovat kertovaa kirjallisuutta. Sirkus korostaa fyysist\u00e4 taitoa, sadut kielellist\u00e4 ilmaisua.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Sirkuksen v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 pellejen, akrobaattien ja sirkusteltan v\u00e4rikk\u00e4it\u00e4 kuvituksia samalla kehitt\u00e4en hienomotoriikkaa ja sirkussanastoa.' },
    { appId: 'find-and-count', anchorText: 'Laske sirkusesineit\u00e4', context: 'Etsi ja laske jongleerauspalloNa, keiloja ja renkaita harjoitellen lukum\u00e4\u00e4rien tunnistamista sirkuskontekstissa.' },
    { appId: 'word-search', anchorText: 'Sirkussanaston sanahaku', context: 'Etsi sirkussanastoa kuten pelle, akrobaatti, trapetsi ja jongleerata kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'treasure-hunt', anchorText: 'Sirkuksen aarteenmetsastys', context: 'Ratkaise sirkusaiheisia vihjeit\u00e4 ja etsi aarteita sirkusteltasta yhdist\u00e4en ongelmanratkaisun seikkailulliseen teemaan.' },
  ],

  expertTips: [
    { tip: 'J\u00e4rjest\u00e4 luokkasirkusviikko: jokainen p\u00e4iv\u00e4 alkaa sirkusty\u00f6lehdell\u00e4 ja p\u00e4\u00e4ttyy fyysisen sirkustaidon harjoitteluun. Viikon lopussa oppilaat esitt\u00e4v\u00e4t pienen sirkusohjelman, jossa akateemiset taidot ja fyysinen taito yhdistyv\u00e4t.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 sirkusteema fysiikan alkeisiin: selitt\u00e4k\u00e4\u00e4 miten painovoima vaikuttaa jongleeraukseen, miksi tasapainopiste on t\u00e4rke\u00e4 akrobatiassa ja miten kitkA vaikuttaa k\u00f6ysiakrobatiaan. T\u00e4m\u00e4 avaa luonnontieteen ovialuonnollisesti.', source: 'Luonnontieteen aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Sirkusteema on erityisen tehokas ujommille oppilaille: pellerooli antaa luvan olla hassu ja kokeilla eri ilmaisutapoja turvallisessa kehyksess\u00e4. Aloita pienest\u00e4 ja anna itseluottamuksen kasvaa.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 6. Forest (metsa) ────────────────────────────────────────────────────

const forestFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa toteuttaa ymp\u00e4rist\u00f6kasvatuksen jakson, joka yhdist\u00e4\u00e4 luonnontieteet, matematiikan ja \u00e4idinkielen suomalaiseen mets\u00e4luontoon.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 mets\u00e4aiheisia ty\u00f6lehti\u00e4 sek\u00e4 luokkahuoneessa ett\u00e4 mets\u00e4retkill\u00e4: oppilaat laskevat puita ja el\u00e4imi\u00e4, v\u00e4ritt\u00e4v\u00e4t mets\u00e4maisemia, tekev\u00e4t sanahakuja mets\u00e4sanastolla kuten kuusi, koivu, k\u00e4py ja sammal. Mets\u00e4retkell\u00e4 ker\u00e4t\u00e4\u00e4n n\u00e4ytteit\u00e4, joita verrataan ty\u00f6lehtien kuviin.',
      outcome: 'Oppilaat oppivat tunnistamaan suomalaisen mets\u00e4n puulajit, el\u00e4imet ja kasvit, matemaattiset taidot vahvistuvat luontokontekstissa ja ymp\u00e4rist\u00f6suhde syvenee kokemuksellisen oppimisen kautta.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa yhdist\u00e4\u00e4 lapsen rakkauden mets\u00e4ss\u00e4 liikkumiseen akateemiseen harjoitteluun, mutta lapsesta tuntuu, ett\u00e4 ty\u00f6lehdet ovat luonnossa olemisen vastakohta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 mets\u00e4ty\u00f6lehti\u00e4 mets\u00e4retken valmisteluun ja j\u00e4lkipuintiin: ennen retkea tunnistusteht\u00e4v\u00e4 puulajeista, retken aikana laskentateht\u00e4v\u00e4 luontohavannoista ja retken j\u00e4lkeen mets\u00e4p\u00e4iv\u00e4kirjan kirjoittaminen.',
      outcome: 'Lapsi kokee ty\u00f6lehdet luonteva na osana mets\u00e4seikkailua, luonnontuntemus syvenee systemaattisesti ja akateemiset taidot vahvistuvat ilman ett\u00e4 ne tuntuvat irrallisilta mets\u00e4kokemuksesta.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Mets\u00e4n eliölajit', value: '30+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 yksityiskohtaisia mets\u00e4maisemakuvituksia, puulajien tunnistuskortteja ja mets\u00e4kerrosten poikkileikkauskuvia. Vuodenaikojen vertailukuvat samasta mets\u00e4n\u00e4kym\u00e4st\u00e4 auttavat hahmottamaan luonnon kiertokulkua.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet mets\u00e4retkiin: lapsi ker\u00e4\u00e4 lehtinAytteit\u00e4, tunnustelee puiden kaarnaa ja laskee k\u00e4pyjA koriin ennen tai j\u00e4lkeen paperiteht\u00e4vi\u00e4. Moniaistisuus ankkuroi oppimisen konkreettisesti.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Suomalainen mets\u00e4 saattaa olla uusi ymp\u00e4rist\u00f6 maahanmuuttajalapselle. Aloita tutummista puista ja el\u00e4imist\u00e4, lis\u00e4\u00e4 suomenkielist\u00e4 mets\u00e4sanastoa asteittain. Mets\u00e4retki tarjoaa konkreettisen kontekstin sanaston oppimiselle.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusprojektilla: kartoita mets\u00e4n ekosysteemi, laske puiden m\u00e4\u00e4ri\u00e4 lajeittiain, analysoi mets\u00e4n kerroksia ja kirjoita luonnontieteellinen raportti havainnoista. Sis\u00e4llyt\u00e4 mets\u00e4n hiilinieluroolin ymm\u00e4rt\u00e4minen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Mets\u00e4p\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan mets\u00e4ty\u00f6lehdet, luontohavainnot ja lehtinAytteet koko jakson ajalta. Arvioi mets\u00e4sanaston kehittymist\u00e4, lajintunnistuksen tarkkuutta ja kyky\u00e4 kuvata mets\u00e4n ekosysteemiA.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Mets\u00e4n ekosysteemiraportti',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittaa raportti mets\u00e4retken havainnoista: mit\u00e4 puulajeja l\u00f6ytyi, mit\u00e4 el\u00e4inten j\u00e4lki\u00e4 n\u00e4htiin ja miten mets\u00e4n kerrokset eroavat toisistaan. Arvioi tiedon soveltamista ja kirjallista ilmaisua.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Puulajien tunnistusteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle lehtikuvia tai oikeita lehtin\u00e4ytteit\u00e4 ja pyyd\u00e4 yhdist\u00e4m\u00e4\u00e4n ne oikeaan puulajiin. Arvioi lajintunnistuksen tarkkuutta, sanastoa ja tunnistamisen perusteluja.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja ekologia)',
      connection: 'Mets\u00e4 on suomalaisen luonnontieteen opetuksen ytimess\u00e4. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet l\u00e4hiluonnon tutkimisesta, ekosysteemien ymm\u00e4rt\u00e4misest\u00e4 ja kest\u00e4v\u00e4st\u00e4 kehityksest\u00e4 toteutuvat suoraan mets\u00e4kontekstissa.',
      activity: 'Puulajien tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat l\u00e4htev\u00e4t mets\u00e4\u00e4n keR\u00e4\u00e4m\u00e4\u00e4n lehtinAytteit\u00e4 ja vertaavat niit\u00e4 ty\u00f6lehden kuviin tunnistustarkkuuden testaamiseksi.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Mets\u00e4sanasto kuten kuusi, koivu, sammal, k\u00e4py ja sieni rakentaa rikasta luontosanastoa. Mets\u00e4p\u00e4iv\u00e4kirjan kirjoittaminen kehitt\u00e4\u00e4 kuvailevaa ilmaisua ja havainnointitaitoja.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen mets\u00e4kuvauksen k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 mets\u00e4sanaa ja kaikkia aistihavaintoja.',
    },
    {
      subject: 'Matematiikka (laskeminen ja tilastot)',
      connection: 'Mets\u00e4n puut, el\u00e4imet ja kasvit tarjoavat runsaan laskemiskontekstin. Mets\u00e4n inventointi \u2014 puiden laskeminen lajeittiain \u2014 on autenttinen tilastojen keruun harjoitus.',
      activity: 'Puiden laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat luovat pylv\u00e4skaavion l\u00e4himets\u00e4n puulajijakaumasta mets\u00e4retken havaintojen perusteella.',
    },
  ],

  uniqueAngle: 'Mets\u00e4aiheiset ty\u00f6lehdet tarjoavat suomalaisessa kontekstissa ainutlaatuisen pedagogisen merkityksen, jota mik\u00e4\u00e4n muu teema ei pysty vastaavasti tuottamaan: Suomi on Euroopan metsAisimpi\u00e4 maita, ja mets\u00e4 on suomalaisen identiteetin, kulttuurin ja hyvinvoinnin ytimess\u00e4. Jokamiehen oikeudet takaavat jokaiselle p\u00e4\u00e4syn mets\u00e4\u00e4n, mik\u00e4 tekee mets\u00e4st\u00e4 konkreettisen ja p\u00e4ivitt\u00e4isen oppimisymP\u00e4rist\u00f6n. Mets\u00e4ty\u00f6lehdet ovat ainoita, jotka voidaan l\u00e4hes aina yhdist\u00e4\u00e4 todelliseen mets\u00e4kokemukseen \u2014 Suomessa mets\u00e4 on l\u00e4hell\u00e4 liki jokaista koulua ja kotia. T\u00e4m\u00e4 teoria-k\u00e4yt\u00e4nt\u00f6-yhteys on pedagogisesti korvaamaton. POPS 2014 korostaa kest\u00e4v\u00e4\u00e4 kehityst\u00e4, ymp\u00e4rist\u00f6vastuullisuutta ja l\u00e4hiluonnon tutkimista, ja mets\u00e4teema on n\u00e4iden tavoitteiden luonnollinen toteuttaja. Mets\u00e4n vuodenaikavaihtelut tarjoavat aina ajankohtaisen n\u00e4k\u00f6kulman: syksyn v\u00e4rit, talven lumikuormitukset, kev\u00e4\u00e4n her\u00e4\u00e4minen ja kes\u00e4n rehevyys.',

  researchCitation: 'Kuo, M., Barnes, M. & Jordan, C. (2019). Do Experiences with Nature Promote Learning? Converging Evidence of a Cause-and-Effect Relationship. Frontiers in Psychology. Laaja meta-analyysi osoitti, ett\u00e4 luonnossa oppiminen parantaa merkitt\u00e4v\u00e4sti keskittymist\u00e4, motivaatiota, akateemista suoriutumista ja sosioemotionaalista hyvinvointia.',

  culturalNotes: 'Suomi on Euroopan metsAisimpi\u00e4 maita: noin 75 prosenttia pinta-alasta on mets\u00e4\u00e4. Mets\u00e4 on suomalaisen kulttuurin, identiteetin ja hyvinvoinnin ytimess\u00e4. Jokamiehen oikeudet mahdollistavat vapaan liikkumisen ja marjastamisen metSiss\u00e4. POPS 2014 korostaa l\u00e4hiluonnon tutkimista ja kest\u00e4v\u00e4\u00e4 kehityst\u00e4, ja mets\u00e4teema toteuttaa n\u00e4m\u00e4 tavoitteet suomalaisessa kontekstissa t\u00e4ydellisesti.',

  snippetDefinition: 'Mets\u00e4aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t puiden, mets\u00e4el\u00e4inten, sienten ja marjojen kuvituksia matematiikan, lukemisen ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t puulajien tunnistamista, el\u00e4inten laskemista, sanahakuja ja mets\u00e4n ekosysteemin tutkimista.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille mets\u00e4el\u00e4inten v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista laskemista, vanhemmille ekosysteemiraportteja ja lajintunnistusteht\u00e4vi\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehdet mets\u00e4retkeen: t\u00e4yt\u00e4 tunnistusteht\u00e4v\u00e4 mets\u00e4ss\u00e4 oikeiden puiden ja kasvien \u00e4\u00e4rell\u00e4.',
    'Esittele p\u00e4iv\u00e4n puulaji tai mets\u00e4el\u00e4in lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 n\u00e4yt\u00e4 oikea lehtinAyte tai kuva.',
    'Anna lapsen tutkia ja piirt\u00e4\u00e4 rauhallisesti ilman kiirett\u00e4, jotta mets\u00e4teema s\u00e4ilyy rauhallisena luontokokemuksena.',
    'Ker\u00e4tk\u00e4\u00e4 yhdess\u00e4 luontonAytteit\u00e4: k\u00e4pyj\u00e4, lehti\u00e4 ja kiviA, ja verratakaa niit\u00e4 ty\u00f6lehden kuviin.',
    'Pid\u00e4 mets\u00e4p\u00e4iv\u00e4kirjaa, johon lapsi piirt\u00e4\u00e4 ja kirjoittaa havaintoja jokaiselta mets\u00e4retkelt\u00e4.',
    'Toista teht\u00e4vi\u00e4 eri vuodenaikoina ja verrataan miten mets\u00e4 muuttuu vuoden kierrossa.',
  ],

  limitations: 'Mets\u00e4aiheiset ty\u00f6lehdet ovat tehokkaimmillaan mets\u00e4retken yhteydess\u00e4, mik\u00e4 vaatii sopivat s\u00e4\u00e4olosuhteet ja kuljetusj\u00e4rjestelyt. Allergiset reaktiot siitep\u00f6lyyn ja hy\u00f6nteisiin on huomioitava ulkoteht\u00e4viss\u00e4. Punkkialueilla on noudatettava suojautumisohjeita.',

  themeComparisons: [
    { vsThemeId: 'animals', summary: 'Mets\u00e4 tarjoaa ekosysteemin kokonaiskuvan, johon el\u00e4imet kuuluvat osana, kun el\u00e4inteema k\u00e4sittelee el\u00e4imi\u00e4 irrallaan elinymP\u00e4rist\u00f6st\u00e4\u00e4n. Mets\u00e4teema korostaa el\u00e4inten ja ymp\u00e4rist\u00f6n vuorovaikutusta.' },
    { vsThemeId: 'garden', summary: 'Mets\u00e4 on villiA luontoa, kun puutarha on ihmisen muokkaama kasvuymP\u00e4rist\u00f6. Mets\u00e4teema opettaa ekologiaa ja biodiversiteettiA, kun puutarha korostaa viljelyA ja vastuullisuutta.' },
    { vsThemeId: 'nature', summary: 'Mets\u00e4 on yksi luonnon ekosysteemeist\u00e4, kun luontoteema kattaa laajemmin kaikki ymp\u00e4rist\u00f6t vedest\u00e4 vuoristoon. Mets\u00e4teema syventyy yhteen ekosysteemiin perusteellisesti, kun luontoteema tarjoaa laajemman katsauksen.' },
    { vsThemeId: 'camping', summary: 'Mets\u00e4 on retkeily\u00e4 ymp\u00e4r\u00f6iv\u00e4 ekosysteemi, kun retkeily keskittyy ulkoilutaitoihin ja seikkailuun. Mets\u00e4teema painottaa ekologista ymm\u00e4rryst\u00e4, retkeily k\u00e4yt\u00e4nn\u00f6n selviytymistaitoja.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Mets\u00e4el\u00e4inten v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 kettujen, oravien, siilien ja hirviEn yksityiskohtaisia kuvituksia samalla kehitt\u00e4en hienomotoriikkaa ja lajintuntemusta.' },
    { appId: 'find-and-count', anchorText: 'Laske mets\u00e4n eliOit\u00e4', context: 'Etsi ja laske puita, el\u00e4imi\u00e4 ja sieni\u00e4 mets\u00e4kuvasta harjoitellen lukum\u00e4\u00e4rien tunnistamista luontokontekstissa.' },
    { appId: 'word-search', anchorText: 'Mets\u00e4sanaston sanahaku', context: 'Etsi mets\u00e4sanastoa kuten kuusi, koivu, kettu ja sammal kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'shadow-match', anchorText: 'Mets\u00e4el\u00e4inten varjoyhdistely', context: 'Yhdist\u00e4 mets\u00e4el\u00e4imet niiden varjoihin kehitt\u00e4en visuaalista erottelua ja el\u00e4inten tunnistamista.' },
  ],

  expertTips: [
    { tip: 'Aloita mets\u00e4teemaviikko l\u00e4himets\u00e4retkell\u00e4: oppilaat ker\u00e4\u00e4v\u00e4t viisi erilaista lehte\u00e4 tai k\u00e4py\u00e4 ja tuovat ne luokkaan, jossa ne yhdistet\u00e4\u00e4n ty\u00f6lehden puulajikuviin. T\u00e4m\u00e4 konkreettinen yhteys tekee tunnistamisesta merkityksellist\u00e4.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 mets\u00e4ty\u00f6lehdet kest\u00e4v\u00e4n kehityksen opetukseen: keskustelkaa mets\u00e4n roolista hiilinielan\u00e4, biodiversiteetin turvaajana ja virkistyksen l\u00e4hteen\u00e4. Suomen mets\u00e4talouden ja suojelun tasapaino on ajankohtainen ja kiinnostava aihe.', source: 'Luonnontieteen aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Maahanmuuttajataustaisille oppilaille mets\u00e4retki voi olla ensimm\u00e4inen kokemus suomalaisesta mets\u00e4st\u00e4. Anna aikaa ihmettelylle ja turvallisuuden kokemiselle ennen akateemisia teht\u00e4vi\u00e4. Mets\u00e4ty\u00f6lehdet toimivat siltana tuntemattoman ymp\u00e4rist\u00f6n ja oppimisen v\u00e4lill\u00e4.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── 7. Spring (kevat) ────────────────────────────────────────────────────

const springFields = `
  // -- SEO Enrichment (Part 185) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa hy\u00f6dynt\u00e4\u00e4 kev\u00e4\u00e4n her\u00e4\u00e4mist\u00e4 oppimisessa, mutta kylm\u00e4t p\u00e4iv\u00e4t rajoittavat viela ulko-opetusta huhtikuun alussa.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 kev\u00e4taiheisia ty\u00f6lehti\u00e4 tuomaan kev\u00e4\u00e4n luokkaan: oppilaat laskevat kev\u00e4tkukkia ja perhosIA, v\u00e4ritt\u00e4v\u00e4t kev\u00e4tmaisemia, tekev\u00e4t sanahakuja kev\u00e4tsanastolla kuten leskenlehti, sinivuokko ja muuttolIntu. Ikkunalaudan sipulien kasvun seuranta lis\u00e4\u00e4 konkreettisuutta.',
      outcome: 'Oppilaat kokevat kev\u00e4\u00e4n innostuksen luokassa, luonnon her\u00e4\u00e4misen seuraaminen kehitt\u00e4\u00e4 havainnointitaitoja ja matemaattiset sek\u00e4 kielelliset taidot vahvistuvat kev\u00e4\u00e4n motivoimina.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa hy\u00f6dynt\u00e4\u00e4 kev\u00e4\u00e4n vaihtelua oppimisessa, mutta lapsi haluaa vain olla ulkona eik\u00e4 istua ty\u00f6lehtien \u00e4\u00e4ress\u00e4.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 kev\u00e4tty\u00f6lehdet ulkohavainnointiin: lapsi etsii kev\u00e4\u00e4n merkkej\u00e4 pihalla ja t\u00e4ytt\u00e4\u00e4 havainnointiteht\u00e4v\u00e4n ulkona, laskee leskenlehdet ja perhosET poluNvarrella ja pit\u00e4\u00e4 kev\u00e4tp\u00e4iv\u00e4kirjaa.',
      outcome: 'Lapsi kokee ty\u00f6lehdet luonnollisena osana kev\u00e4\u00e4n tutkimista, havainnointitaidot ja luonnontuntemus kehittyv\u00e4t systemaattisesti ja kev\u00e4\u00e4n odotus lis\u00e4\u00e4 motivaatiota oppimiseen.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Kev\u00e4\u00e4n merkkien lajit', value: '20+ merkkiA' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4 kev\u00e4tkukkakuvituksia, muuttolintutauluja ja kev\u00e4\u00e4n merkkien kuvasarjoja. Talvi- ja kev\u00e4tmaisemien vertailukuvat auttavat hahmottamaan vuodenaikavaihtelun visuaalisesti.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet ulkohavainnointiin: lapsi etsii kev\u00e4\u00e4n merkkej\u00e4 pihalta, ker\u00e4\u00e4 kev\u00e4tkukkia ja koskettaa sulavan lumen alaista multaa. Kev\u00e4tsipulien istuttaminen ikkunalaudalle lis\u00e4\u00e4 kokemuksellisuutta.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kev\u00e4\u00e4n her\u00e4\u00e4minen on universaali ilmi\u00f6, mutta Suomen dramaattinen kev\u00e4\u00e4n muutos on ainutlaatuinen kokemus. Aloita konkreettisilla kev\u00e4\u00e4n merkeill\u00e4 kuten lumen sulaminen ja ensimm\u00e4iset kukat, lis\u00e4\u00e4 suomenkielist\u00e4 kev\u00e4tsanastoa asteittain.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusprojektilla: mittaa p\u00e4iv\u00e4n pituuden muutosta viikoittain, dokumentoi kev\u00e4\u00e4n eteneminen valokuvin, analysoi l\u00e4mp\u00f6tilatilastoja ja kirjoita kev\u00e4tkatsaus yhdist\u00e4en havainnonti ja tieteellinen raportointi.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Kev\u00e4tp\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan kev\u00e4tty\u00f6lehdet, luontohavainnot ja piirrokset koko jakson ajalta. Arvioi kev\u00e4tsanaston kehittymist\u00e4, havainnointitarkkuuden parantumista ja kyky\u00e4 kuvata luonnon muutoksia omin sanoin.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kev\u00e4\u00e4n merkkien tutkimusraportti',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittaa raportti kev\u00e4\u00e4n merkeist\u00e4 omassa lAhiymP\u00e4rist\u00f6ss\u00e4: mitkA kukat ovat ens imm\u00e4isi\u00e4, milloin muuttolinnut palaavat ja miten p\u00e4iv\u00e4n pituus muuttuu. Arvioi havainnointitaitoja ja tiedon j\u00e4sentelyA.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Kev\u00e4tkukkien tunnistusteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle kuvakortteja kev\u00e4tkukista. Pyyd\u00e4 tunnistamaan ja nime\u00e4m\u00e4\u00e4n kukat sek\u00e4 j\u00e4rjest\u00e4m\u00e4\u00e4n ne kukkimisj\u00e4rjestykseen. Arvioi lajintunnistusta ja vuodenaikay ymm\u00e4rryst\u00e4.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja vuodenajat)',
      connection: 'Kev\u00e4t on luonnon her\u00e4\u00e4misen vuodenaika, joka tarjoaa konkreettisen kontekstin kasvien elinkaaren, muuttolintujen ja vuodenaikavaihtelun opiskeluun. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet toteutuvat suoraan.',
      activity: 'Kev\u00e4tkukkien tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat l\u00e4htev\u00e4t etsim\u00e4\u00e4n kev\u00e4\u00e4n merkkej\u00e4 koulun pihalta ja merkitsev\u00e4t havainnot kev\u00e4tkarttaan.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Kev\u00e4tsanasto kuten leskenlehti, sinivuokko, muuttolintu ja sulamisvesi rakentaa kausittaista luontosanastoa. Kev\u00e4trunojen lukeminen ja kirjoittaminen yhdist\u00e4\u00e4 luonnontieteen ja kirjallisuuden.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat kev\u00e4truncn tai lyhyen kev\u00e4tkuvauksen k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 kev\u00e4tsanaa ja aistihavaintoja.',
    },
    {
      subject: 'Matematiikka (mittaaminen ja tilastot)',
      connection: 'Kev\u00e4\u00e4n muutokset tarjoavat luonnollisen kontekstin mittaamiselle ja tiedon ker\u00e4\u00e4miselle: p\u00e4iv\u00e4n pituuden mittaaminen, l\u00e4mp\u00f6tilan seuraaminen ja kev\u00e4\u00e4n merkkien tilastointi.',
      activity: 'Kev\u00e4tkukkien laskentateht\u00e4v\u00e4n j\u00e4lkeen oppilaat mittaavat p\u00e4iv\u00e4n pituutta viikon ajan ja piirt\u00e4v\u00e4t viivakaavion muutoksesta.',
    },
  ],

  uniqueAngle: 'Kev\u00e4taiheiset ty\u00f6lehdet tarjoavat pedagogisen hetken, jota ei voi siirt\u00e4\u00e4 toiseen ajankohtaan: kev\u00e4\u00e4n her\u00e4\u00e4minen on Suomessa niin dramaattinen ja emotionaalinen tapahtuma, ett\u00e4 sen hy\u00f6dynt\u00e4minen oppimisessa tuottaa poikkeuksellista motivaatiota. Pitkien, pimeiden talvikuukausien j\u00e4lkeen ensimm\u00e4isten leskenlehtien ilmestyminen, muuttolintujen paluu ja lumen sulaminen her\u00e4tt\u00e4v\u00e4t lapsissa voimakkaan tunnereaktion, joka kanavoituu oppimisenergiaksi. Kev\u00e4tty\u00f6lehdet ovat ainutlaatuisia siksi, ett\u00e4 ne yhdist\u00e4v\u00e4t vuodenaikavaihtelun, luonnon her\u00e4\u00e4misen ja lapsen tunnekokemuksen yhdeksi oppimiskehykseksi. POPS 2014 korostaa vuodenaikojen tutkimista ja l\u00e4hiluonnon havainnointia, ja kev\u00e4t on n\u00e4iden tavoitteiden intensiivisin toteutusajankohta. Suomen maantieteellinen sijainti tekee kev\u00e4\u00e4st\u00e4 erityisen opettavaisen: p\u00e4iv\u00e4n pituuden nopea kasvu, lumen sulamisen fysiikka ja ekosysteemien her\u00e4\u00e4minen ovat kaikki havainnoitavissa muutaman viikon aikana.',

  researchCitation: 'Sobel, D. (2008). Childhood and Nature: Design Principles for Educators. Stenhouse Publishers. Tutkimus osoitti, ett\u00e4 vuodenaikojen havainnointiin perustuva oppiminen vahvistaa lasten ymp\u00e4rist\u00f6suhdetta, kehitt\u00e4\u00e4 havainnointitaitoja ja parantaa luonnontieteellist\u00e4 ymm\u00e4rryst\u00e4 merkitt\u00e4v\u00e4sti.',

  culturalNotes: 'Suomessa kev\u00e4t on erityisen merkityksellinen vuodenaika: pitkien, pimeiden talvikuukausien j\u00e4lkeen valon paluu ja luonnon her\u00e4\u00e4minen ovat koko yhteiskunnan juhlimia tapahtumia. Vappu toukokuun alussa on kev\u00e4\u00e4n suuri juhla. POPS 2014 korostaa vuodenaikojen tutkimista osana ymp\u00e4rist\u00f6oppia, ja kev\u00e4t tarjoaa intensiivisimm\u00e4n havainnontijakson: p\u00e4iv\u00e4n pituus kasvaa nopeasti, lumi sulaa, muuttolinnut palaavat ja ensimm\u00e4iset kev\u00e4tkukat puhkeavat.',

  snippetDefinition: 'Kev\u00e4taiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kev\u00e4tkukkien, muuttolintujen, perhosten ja luonnon her\u00e4\u00e4misen kuvituksia matematiikan, lukemisen ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t kev\u00e4\u00e4n merkkien havainnointia, kukkien laskemista, sanahakuja ja kev\u00e4tp\u00e4iv\u00e4kirjan pit\u00e4mist\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille perhosten v\u00e4ritt\u00e4mist\u00e4 ja kukkien laskemista, vanhemmille kev\u00e4\u00e4n merkkien tutkimusraportteja ja mittausteht\u00e4vi\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehdet ulkohavainnointiin: etsi kev\u00e4\u00e4n merkkej\u00e4 koulun pihalta tai lAhimets\u00e4st\u00e4 ennen tai j\u00e4lkeen paperiteht\u00e4vi\u00e4.',
    'Esittele p\u00e4iv\u00e4n kev\u00e4tkukka tai muuttolintu lyhyesti ennen teht\u00e4v\u00e4n aloittamista \u2014 n\u00e4yt\u00e4 oikea kukka tai kuva.',
    'Anna lapsen havainnoida ja piirt\u00e4\u00e4 rauhallisesti ilman kiirett\u00e4, jotta kev\u00e4tteema s\u00e4ilyy rauhallisena luontokokemuksena.',
    'Mittaa p\u00e4iv\u00e4n pituutta viikoittain ja kirjaa muutokset kev\u00e4tp\u00e4iv\u00e4kirjaan luonnontieteen ja matematiikan yhdist\u00e4miseksi.',
    'Istuta kev\u00e4tsipuleita ikkunalaudalle ja seuraa kasvua mittauksin kev\u00e4tty\u00f6lehtien rinnalla.',
    'Toista teht\u00e4vi\u00e4 kev\u00e4\u00e4n edetess\u00e4 ja verrataan miten luonto muuttuu viikosta toiseen.',
  ],

  limitations: 'Kev\u00e4taiheiset ty\u00f6lehdet ovat ajankohtaisia l\u00e4hinn\u00e4 maalis\u2013toukokuussa, mik\u00e4 rajoittaa niiden k\u00e4ytt\u00f6\u00e4 muina vuodenaikoina. Suomen eri osissa kev\u00e4t etenee eri tahtiin: etel\u00e4ss\u00e4 jo maaliskuussa, Lapissa vasta toukokuussa. Siitep\u00f6lyallergiat on huomioitava ulkoteht\u00e4viss\u00e4.',

  themeComparisons: [
    { vsThemeId: 'flowers', summary: 'Kev\u00e4t sis\u00e4lt\u00e4\u00e4 kukat osana laajempaa vuodenaikavaihtelua, kun kukkateema keskittyy kasvilajeihin ymp\u00e4ri vuoden. Kev\u00e4t tarjoaa ajallisen kontekstin kukkien puhkeamiselle ja korostaa luonnon her\u00e4\u00e4mist\u00e4.' },
    { vsThemeId: 'garden', summary: 'Kev\u00e4t on puutarhaty\u00f6n aloitusaika, mutta kev\u00e4tteema kattaa laajemmin luonnon her\u00e4\u00e4misen, muuttolinnut ja s\u00e4\u00e4n muutoksen. Puutarha keskittyy viljelyyn ja kasvien hoitamiseen vuodenajasta riippumatta.' },
    { vsThemeId: 'insects', summary: 'Kev\u00e4t on hy\u00f6nteisten her\u00e4\u00e4misen aikaa, mutta kev\u00e4tteema kattaa koko ekosysteemin muutoksen. Hy\u00f6nteisteema syventyy yksitt\u00e4isten lajien elinkaariin ja ominaisuuksiin ymp\u00e4ri vuoden.' },
    { vsThemeId: 'nature', summary: 'Kev\u00e4t on luonnon intensiivisin muutosjakso, kun luontoteema k\u00e4sittelee ekosysteemejA kokonaisvaltaisemmin vuodenajasta riippumatta. Kev\u00e4tteema tarjoaa ajallisesti rajatun mutta syv\u00e4n havainnontijakson.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Kev\u00e4tkukkien v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 sinivuokkoja, leskenlehtI\u00e4 ja perhosia samalla kehitt\u00e4en hienomotoriikkaa ja kev\u00e4tkukkien tunnistamista.' },
    { appId: 'find-and-count', anchorText: 'Laske kev\u00e4\u00e4n merkkej\u00e4', context: 'Etsi ja laske perhosia, kukkia ja muuttolintuiA kev\u00e4tkuvasta harjoitellen lukum\u00e4\u00e4rien tunnistamista.' },
    { appId: 'word-search', anchorText: 'Kev\u00e4tsanaston sanahaku', context: 'Etsi kev\u00e4tsanastoa kuten sinivuokko, leskenlehti, perhonen ja muuttolintu kirjainruudukosta lukutaidon vahvistamiseksi.' },
    { appId: 'find-objects', anchorText: 'Etsi kev\u00e4\u00e4n piiloesineet', context: 'Etsi piilotettuja kev\u00e4\u00e4n merkkej\u00e4 \u2014 kukkia, perhosia ja lintuja \u2014 kev\u00e4tmaisemasta visuaalisen tarkkaavaisuuden harjoittamiseksi.' },
  ],

  expertTips: [
    { tip: 'Aloita kev\u00e4tteemaviikko kev\u00e4\u00e4n merkkien etsint\u00e4retkell\u00e4: oppilaat saavat tarkistuslistankev\u00e4\u00e4n merkeist\u00e4 ja etsiv\u00e4t niit\u00e4 koulun pihalta. Havainnot yhdistet\u00e4\u00e4n kev\u00e4tty\u00f6lehtiin luokassa.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 kev\u00e4tty\u00f6lehdet pitkittAistutkimukseen: mittaa p\u00e4iv\u00e4n pituutta, l\u00e4mp\u00f6tilaa ja kukkien m\u00e4\u00e4r\u00e4\u00e4 viikoittain koko kev\u00e4\u00e4n ajan. Tulokset kootaan yhteiseksi kev\u00e4tkaavioksi, joka yhdist\u00e4\u00e4 matematiikan ja luonnontieteen.', source: 'Luonnontieteen aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Kev\u00e4t on ihanteellinen aika maahanmuuttajalasten luontosuhteen rakentamiseen: Suomen dramaattinen kev\u00e4\u00e4n muutos on ainutlaatuinen kokemus, ja kev\u00e4tty\u00f6lehdet tarjoavat sanaston ja rakenteen havaintojen j\u00e4sent\u00e4miseen.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// ── Injection function ──────────────────────────────────────────────────

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
  { id: 'construction', fields: constructionFields },
  { id: 'cooking', fields: cookingFields },
  { id: 'travel', fields: travelFields },
  { id: 'birthday', fields: birthdayFields },
  { id: 'circus', fields: circusFields },
  { id: 'forest', fields: forestFields },
  { id: 'spring', fields: springFields },
];

console.log('Part 185: Enriching 7 FI theme hub pages with 14 fields each...\n');
themes.forEach((t, i) => {
  console.log(`${i + 1}. Injecting fields into ${t.id}/fi.ts...`);
  injectFields(path.join(base, t.id, 'fi.ts'), t.fields);
});
console.log('\nDone! All 7 FI theme hub pages enriched with 14 SEO fields each.');
