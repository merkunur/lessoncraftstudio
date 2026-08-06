/**
 * Part 115: Finnish Theme+Grade SEO — Themes 1–4
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for alphabet, animals, birds, birthday Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  alphabet: {
    preschool: {
      seoTitle: 'Aakkosteht\u00e4v\u00e4t Esikouluun \u2014 J\u00e4ljenn\u00e4 ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia aakkosteht\u00e4vi\u00e4 esikouluun (3\u20134v). J\u00e4ljenn\u00e4 pistekirjaimia, v\u00e4rit\u00e4 isoja kirjaimia ja yhdist\u00e4 kirjainpareja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kirjainten j\u00e4ljent\u00e4minen ty\u00f6lehdet pisteviivat suuntanuolet isot kirjaimet 3-4v, v\u00e4rit\u00e4 isot kirjaimet ty\u00f6lehdet paksut muodot hienomotoriikka esikoulu tulostettava, yhdist\u00e4 isot pienet kirjaimet parit ty\u00f6lehdet visuaalinen muisti esikoulu, alku\u00e4\u00e4nteet kuvayhdist\u00e4minen ty\u00f6lehdet \u00e4\u00e4nnetietoisuus kirjain\u00e4\u00e4nteet esikoulu, oman nimen kirjaintunnistus ty\u00f6lehdet henkil\u00f6kohtaiset kirjaimet esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Aakkosteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Kirjoita | LCS',
      seoDescription: 'Tulostettavia aakkosteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Kirjoita kirjaimia viivoille, ratkaise kuvaristeikk\u00f6ja ja rakenna sanoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kirjoitusharjoitukset ty\u00f6lehdet viivasto oikea muoto kaikki 26 kirjainta 5-6v, kuvaristikot ty\u00f6lehdet \u00e4\u00e4nnejako tavutus esiopetus tulostettava, kolmikirjaimiset sananhaku ty\u00f6lehdet CVC-sanat visuaalinen lukeminen esiopetus, aakkosjuna j\u00e4rjest\u00e4minen ty\u00f6lehdet ABC-j\u00e4rjestys sanakirjavalmius esiopetus, sanansekoitus ty\u00f6lehdet kirjainten j\u00e4rjestely n\u00e4k\u00f6sanat esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Aakkosteht\u00e4v\u00e4t 1. Luokalle \u2014 Tavuta ja Kirjoita | LCS',
      seoDescription: 'Tulostettavia aakkosteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise sanansekoituksia, t\u00e4yt\u00e4 ristikk\u00f6ja ja harjoittele lausekirjoitusta. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka sanansekoitus ty\u00f6lehdet kirjainten j\u00e4rjestely tavutus CVC-sanat 6-7v, kuvaristikko ty\u00f6lehdet monivaiheinen \u00e4\u00e4nneanalyysi oikeinkirjoitus 1. luokka tulostettava, lausekirjoitus ty\u00f6lehdet selke\u00e4 kirjainmuoto v\u00e4listys 1. luokka, aakkosj\u00e4rjestys lajittelu ty\u00f6lehdet sanalistat ensimm\u00e4inen toinen kirjain 1. luokka, sana-arvaus kontekstivihje ty\u00f6lehdet sanasto p\u00e4\u00e4ttely kirjainkuviot 1. luokka',
    },
    'second-grade': {
      seoTitle: 'Aakkosteht\u00e4v\u00e4t 2. Luokalle \u2014 Tavut ja Sanat | LCS',
      seoDescription: 'Tulostettavia aakkosteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Purkaa monitavuisia sanoja, ratkaise ristikk\u00f6ja ja harjoittele kirjoittamista. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka monitavuiset sanat sanansekoitus ty\u00f6lehdet tavutus 7-8v, ristikkoteht\u00e4v\u00e4t ty\u00f6lehdet vokaaliparit oikeinkirjoitus akateeminen sanasto 2. luokka, akateeminen sananhaku ty\u00f6lehdet tietoaineet termit 2. luokka tulostettava, aakkosj\u00e4rjestys ty\u00f6lehdet toinen kolmas kirjain sanakirjataidot 2. luokka, kappalekirjoitus ty\u00f6lehdet oikeinkirjoitus j\u00e4sennelty teksti 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Aakkosteht\u00e4v\u00e4t 3. Luokalle \u2014 Juuret ja Tutkimus | LCS',
      seoDescription: 'Tulostettavia aakkosteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Analysoi sanojen juuria, tutki sanakirjaa ja kirjoita tutkimusraportteja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka sanojen juuret liitteet analyysi ty\u00f6lehdet etuliite j\u00e4lkiliite sanasto 8-9v, sanakirjan hakusanat ty\u00f6lehdet merkint\u00f6jen etsiminen \u00e4\u00e4nt\u00e4misohjeet 3. luokka, sanaperheet tutkimus ty\u00f6lehdet sanaverkko sukulaissanat morfologia 3. luokka, kaunokirjoitus ty\u00f6lehdet yhdistetyt vedot pienaakkoset 3. luokka tulostettava, monivaiheinen raporttikirjoitus ty\u00f6lehdet referointi l\u00e4hteet 3. luokka harjoitukset',
    },
  },
  animals: {
    preschool: {
      seoTitle: 'El\u00e4inteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia el\u00e4inteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske el\u00e4imi\u00e4, v\u00e4rit\u00e4 kuvia, tunnista varjoja ja yhdist\u00e4 pareja. Ilmaisia ty\u00f6lehti\u00e4 lapsille.',
      seoKeywords: 'esikoulu el\u00e4inten laskeminen ty\u00f6lehdet yhdest\u00e4 kymmeneen v\u00e4rikuvat 3-4v, el\u00e4inten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka v\u00e4rien tunnistus esikoulu tulostettava, el\u00e4invarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, el\u00e4inten lajittelu koon mukaan ty\u00f6lehdet vertailu j\u00e4rjest\u00e4minen esikoulu, el\u00e4inkuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'El\u00e4inteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia el\u00e4inteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele alku\u00e4\u00e4nteit\u00e4, laske el\u00e4inryhmi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus el\u00e4insanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, el\u00e4inten yhteenlasku ty\u00f6lehdet kuvamatematiikka laskeminen esiopetus tulostettava, el\u00e4inten sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, el\u00e4inkuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat hahmottaminen esiopetus, el\u00e4inten poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'El\u00e4inteht\u00e4v\u00e4t 1. Luokalle \u2014 Yhteenlasku ja Sanat | LCS',
      seoDescription: 'Tulostettavia el\u00e4inteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise yhteenlaskuja, opettele el\u00e4insanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka el\u00e4inten yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, el\u00e4inristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, el\u00e4inten sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, el\u00e4infaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, el\u00e4inten luokittelu ty\u00f6lehdet nis\u00e4kk\u00e4\u00e4t linnut matelijat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'El\u00e4inteht\u00e4v\u00e4t 2. Luokalle \u2014 Elinymp\u00e4rist\u00f6t ja Data | LCS',
      seoDescription: 'Tulostettavia el\u00e4inteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki elinymp\u00e4rist\u00f6j\u00e4, analysoi taulukoita ja kirjoita el\u00e4inkuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka el\u00e4inten elinymp\u00e4rist\u00f6t ty\u00f6lehdet ekosysteemit luokittelu 7-8v, el\u00e4intilastot taulukkotyölehdet data-analyysi pylv\u00e4sdiagrammit 2. luokka tulostettava, el\u00e4inkuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, el\u00e4inten ravintoketjut ty\u00f6lehdet saalistaja saalisel\u00e4in 2. luokka, el\u00e4inten vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'El\u00e4inteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Raportit | LCS',
      seoDescription: 'Tulostettavia el\u00e4inteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita el\u00e4intutkimuksia, analysoi sopeutumisia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka el\u00e4intutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, el\u00e4inten sopeutumiset ty\u00f6lehdet evoluutio elinymp\u00e4rist\u00f6 3. luokka tulostettava, el\u00e4inten luokitteluj\u00e4rjestelm\u00e4 ty\u00f6lehdet taksonomia selk\u00e4rankaiset 3. luokka, el\u00e4inten kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet monivaiheinen ongelmanratkaisu 3. luokka, uhanalaiset el\u00e4imet ty\u00f6lehdet luonnonsuojelu ymp\u00e4rist\u00f6kasvatus 3. luokka harjoitukset',
    },
  },
  birds: {
    preschool: {
      seoTitle: 'Lintuteht\u00e4v\u00e4t Esikouluun \u2014 V\u00e4rit\u00e4 ja Yhdist\u00e4 | LCS',
      seoDescription: 'Tulostettavia lintuteht\u00e4vi\u00e4 esikouluun (3\u20134v). V\u00e4rit\u00e4 lintuja, yhdist\u00e4 varjoja, laske munia ja tunnista v\u00e4rej\u00e4. Ilmaisia ty\u00f6lehti\u00e4 lapsille.',
      seoKeywords: 'esikoulu lintujen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka v\u00e4ritunnistus 3-4v, lintuvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu tulostettava, lintujen munien laskeminen ty\u00f6lehdet yhdest\u00e4 kymmeneen esikoulu, lintukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu, lintujen lajittelu koon mukaan ty\u00f6lehdet vertailu j\u00e4rjest\u00e4minen esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Lintuteht\u00e4v\u00e4t Esiopetukseen \u2014 Laske ja Kirjoita | LCS',
      seoDescription: 'Tulostettavia lintuteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Laske lintuja, harjoittele lintusanastoa ja ratkaise sanahakuja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus lintujen laskeminen ty\u00f6lehdet yhteenlasku kuvamatematiikka 5-6v, lintusanasto alku\u00e4\u00e4nteet ty\u00f6lehdet kirjaintunnistus esiopetus tulostettava, lintujen sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, lintukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat hahmottaminen esiopetus, lintujen poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Lintuteht\u00e4v\u00e4t 1. Luokalle \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia lintuteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise lintulaskuja, opettele lintusanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka lintujen yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, linturistikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, lintujen sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, lintufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, lintujen luokittelu ty\u00f6lehdet nokka sulat siivet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Lintuteht\u00e4v\u00e4t 2. Luokalle \u2014 Lajit ja Elinymp\u00e4rist\u00f6t | LCS',
      seoDescription: 'Tulostettavia lintuteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki lintulajeja, analysoi muuttoreittej\u00e4 ja kirjoita lintukuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka lintulajit ty\u00f6lehdet luokittelu elinymp\u00e4rist\u00f6t 7-8v, lintujen muuttoreitit ty\u00f6lehdet maantiede vuodenajat 2. luokka tulostettava, lintukuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, lintujen vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka, lintujen ravinto ty\u00f6lehdet ravintoketju luonnontiede 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Lintuteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Luonto | LCS',
      seoDescription: 'Tulostettavia lintuteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita lintututkimuksia, analysoi sopeutumisia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka lintututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, lintujen sopeutumiset ty\u00f6lehdet nokkamuodot siipirakenne 3. luokka tulostettava, lintubongaus havainnointiteht\u00e4v\u00e4t ty\u00f6lehdet luonnontiede 3. luokka, lintujen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet monivaiheinen ongelmanratkaisu 3. luokka, uhanalaiset linnut ty\u00f6lehdet luonnonsuojelu ymp\u00e4rist\u00f6kasvatus 3. luokka harjoitukset',
    },
  },
  birthday: {
    preschool: {
      seoTitle: 'Syntym\u00e4p\u00e4iv\u00e4teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia syntym\u00e4p\u00e4iv\u00e4teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kynttil\u00f6it\u00e4, v\u00e4rit\u00e4 kakkuja ja yhdist\u00e4 lahjapaketteja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu syntym\u00e4p\u00e4iv\u00e4 laskeminen ty\u00f6lehdet kynttil\u00e4t kakut 3-4v, syntym\u00e4p\u00e4iv\u00e4 v\u00e4rityssivut ty\u00f6lehdet kakku ilmapallot esikoulu tulostettava, lahjapakettien yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, syntym\u00e4p\u00e4iv\u00e4 lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, syntym\u00e4p\u00e4iv\u00e4kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Syntym\u00e4p\u00e4iv\u00e4teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia syntym\u00e4p\u00e4iv\u00e4teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Laske lahjoja, harjoittele sanastoa ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus syntym\u00e4p\u00e4iv\u00e4 yhteenlasku ty\u00f6lehdet kuvamatematiikka 5-6v, syntym\u00e4p\u00e4iv\u00e4sanasto alku\u00e4\u00e4nteet ty\u00f6lehdet kirjaintunnistus esiopetus tulostettava, syntym\u00e4p\u00e4iv\u00e4 sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, syntym\u00e4p\u00e4iv\u00e4kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, syntym\u00e4p\u00e4iv\u00e4 poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Syntym\u00e4p\u00e4iv\u00e4teht\u00e4v\u00e4t 1. Luokalle \u2014 Matematiikka | LCS',
      seoDescription: 'Tulostettavia syntym\u00e4p\u00e4iv\u00e4teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise yhteenlaskuja, kirjoita kutsukortteja ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka syntym\u00e4p\u00e4iv\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, syntym\u00e4p\u00e4iv\u00e4ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, syntym\u00e4p\u00e4iv\u00e4 sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kutsukortti kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet luova kirjoittaminen 1. luokka, syntym\u00e4p\u00e4iv\u00e4 laskuteht\u00e4v\u00e4t ty\u00f6lehdet kynttil\u00e4t lahjat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Syntym\u00e4p\u00e4iv\u00e4teht\u00e4v\u00e4t 2. Luokalle \u2014 Kirjoita ja Laske | LCS',
      seoDescription: 'Tulostettavia syntym\u00e4p\u00e4iv\u00e4teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Kirjoita kuvauksia, ratkaise sanateht\u00e4vi\u00e4 ja analysoi juhlatilastoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka syntym\u00e4p\u00e4iv\u00e4 kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet kuvaus adjektiivit 7-8v, syntym\u00e4p\u00e4iv\u00e4 sanateht\u00e4v\u00e4t ty\u00f6lehdet oikeinkirjoitus sanasto 2. luokka tulostettava, juhlatilastot taulukkotyölehdet data-analyysi pylv\u00e4sdiagrammit 2. luokka, syntym\u00e4p\u00e4iv\u00e4 kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, syntym\u00e4p\u00e4iv\u00e4 vertailuteht\u00e4v\u00e4t ty\u00f6lehdet enemm\u00e4n v\u00e4hemm\u00e4n 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Syntym\u00e4p\u00e4iv\u00e4teht\u00e4v\u00e4t 3. Luokalle \u2014 Pulmia ja Kirjoitus | LCS',
      seoDescription: 'Tulostettavia syntym\u00e4p\u00e4iv\u00e4teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Ratkaise haastavia pulmia, kirjoita tarinoita ja analysoi budjetteja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka syntym\u00e4p\u00e4iv\u00e4 pulmateht\u00e4v\u00e4t ty\u00f6lehdet looginen p\u00e4\u00e4ttely haastava 8-9v, syntym\u00e4p\u00e4iv\u00e4 tarinakirjoitus ty\u00f6lehdet kerronta luova kirjoittaminen 3. luokka tulostettava, juhlabudjetti laskuteht\u00e4v\u00e4t ty\u00f6lehdet rahanlasku ongelmanratkaisu 3. luokka, syntym\u00e4p\u00e4iv\u00e4 ristikko ty\u00f6lehdet pitk\u00e4t sanat tavutus 3. luokka, syntym\u00e4p\u00e4iv\u00e4 tutkimusteht\u00e4v\u00e4t ty\u00f6lehdet perinteet kulttuurit 3. luokka harjoitukset',
    },
  },
};

const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

function escapeForTs(str) {
  // Escape single quotes and backslashes for TS string literal
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

let totalInserted = 0;

for (const [theme, grades] of Object.entries(seoData)) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let inGradeContent = false;
  let currentGrade = null;
  let gradeLineFound = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Detect gradeContent section
    if (trimmed.startsWith('gradeContent:') || trimmed.startsWith('gradeContent :')) {
      inGradeContent = true;
    }

    if (inGradeContent) {
      // Detect grade start (4-space or more indent with grade id)
      for (const gradeId of gradeIds) {
        if (trimmed.startsWith(`'${gradeId}':`)) {
          currentGrade = gradeId;
          gradeLineFound = true;
          break;
        }
      }

      // Detect the grade's intro line (must be inside gradeContent, after grade identifier)
      if (currentGrade && gradeLineFound && trimmed.startsWith('intro:') && grades[currentGrade]) {
        // Check if seoTitle already exists (skip if already inserted)
        if (i > 0 && !lines[i - 1].includes('seoKeywords:')) {
          const data = grades[currentGrade];
          const indent = line.match(/^(\s*)/)[1]; // match indentation
          newLines.push(`${indent}seoTitle: '${escapeForTs(data.seoTitle)}',`);
          newLines.push(`${indent}seoDescription: '${escapeForTs(data.seoDescription)}',`);
          newLines.push(`${indent}seoKeywords: '${escapeForTs(data.seoKeywords)}',`);
          totalInserted++;
          console.log(`  + ${theme}/${currentGrade}: inserted SEO fields`);
        } else {
          console.log(`  ~ ${theme}/${currentGrade}: SEO fields already present, skipping`);
        }
        currentGrade = null;
        gradeLineFound = false;
      }
    }

    newLines.push(line);
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Updated ${theme}/fi.ts`);
}

console.log(`\nDone! Inserted SEO fields for ${totalInserted} grade entries.`);
