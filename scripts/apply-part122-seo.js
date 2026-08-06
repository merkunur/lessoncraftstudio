/**
 * Part 122: Finnish Theme+Grade SEO — Themes 29–32
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for nature, numbers, ocean, pets Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  nature: {
    preschool: {
      seoTitle: 'Luontoteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia luontoteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske el\u00e4imi\u00e4, v\u00e4rit\u00e4 kasveja, yhdist\u00e4 luontovarjoja ja lajittele luontoaiheita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu luonto laskeminen ty\u00f6lehdet el\u00e4imet kasvit 3-4v, luonnon v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, luontovarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, luontoaiheiden lajittelu ty\u00f6lehdet el\u00e4v\u00e4 eloton vertailu esikoulu, luontokuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Luontoteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia luontoteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele luontosanastoa, laske el\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus luontosanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, luonnon yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, luonto sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, luontokuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, luonto poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Luontoteht\u00e4v\u00e4t 1. Luokalle \u2014 Ymp\u00e4rist\u00f6 ja Laskut | LCS',
      seoDescription: 'Tulostettavia luontoteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise luontolaskuja, opettele luontosanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka luonto yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, luontoristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, luonto sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, luontofaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, luontoaiheiden luokittelu ty\u00f6lehdet el\u00e4imet kasvit 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Luontoteht\u00e4v\u00e4t 2. Luokalle \u2014 Ekosysteemit ja Tilastot | LCS',
      seoDescription: 'Tulostettavia luontoteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki ekosysteemej\u00e4, analysoi tilastoja ja kirjoita luontokuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka luonnon ekosysteemit ty\u00f6lehdet mets\u00e4 niitty vesist\u00f6 7-8v, luontotilastot taulukkotyölehdet data-analyysi lajit elinymp\u00e4rist\u00f6t 2. luokka tulostettava, luontokuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit vuodenajat 2. luokka, luonnon kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, luontotyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Luontoteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ymp\u00e4rist\u00f6tiede | LCS',
      seoDescription: 'Tulostettavia luontoteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita luontotutkimuksia, tutki ravintoketjuja ja ratkaise ymp\u00e4rist\u00f6pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka luontotutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ravintoketjut ty\u00f6lehdet tuottajat kuluttajat hajottajat 3. luokka tulostettava, Suomen luonto ty\u00f6lehdet mets\u00e4t j\u00e4rvet suot 3. luokka, luonto monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, luonnonsuojelu ty\u00f6lehdet uhanalaiset lajit ymp\u00e4rist\u00f6 3. luokka harjoitukset',
    },
  },
  numbers: {
    preschool: {
      seoTitle: 'Numeroteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia numeroteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske esineit\u00e4, v\u00e4rit\u00e4 numeroita, yhdist\u00e4 lukuvarjoja ja lajittele m\u00e4\u00e4ri\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu numerot laskeminen ty\u00f6lehdet luvut m\u00e4\u00e4r\u00e4t 3-4v, numeroiden v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, lukuvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, lukum\u00e4\u00e4rien lajittelu ty\u00f6lehdet enemm\u00e4n v\u00e4hemm\u00e4n vertailu esikoulu, numerokuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Numeroteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia numeroteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele lukusanoja, laske esineit\u00e4 ja ratkaise numeropulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus numerosanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, numeroiden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, numerot sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, numerokuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, numerot poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Numeroteht\u00e4v\u00e4t 1. Luokalle \u2014 Laskut ja Lukujonot | LCS',
      seoDescription: 'Tulostettavia numeroteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise yhteen- ja v\u00e4hennyslaskuja, opettele lukujonoja ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka numerot yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, numeroristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, numerot sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, lukujonot lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, lukujen luokittelu ty\u00f6lehdet parilliset parittomat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Numeroteht\u00e4v\u00e4t 2. Luokalle \u2014 Kertolasku ja Tilastot | LCS',
      seoDescription: 'Tulostettavia numeroteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Harjoittele kertotauluja, analysoi tilastoja ja kirjoita lukuteht\u00e4vi\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kertolaskut numerot ty\u00f6lehdet kertotaulut jakaminen 7-8v, numerotilastot taulukkotyölehdet data-analyysi luvut kaaviot 2. luokka tulostettava, numerokuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet lukusanat j\u00e4rjestysluvut 2. luokka, numeroiden kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, lukualueiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Numeroteht\u00e4v\u00e4t 3. Luokalle \u2014 Murtoluvut ja Ongelmanratkaisu | LCS',
      seoDescription: 'Tulostettavia numeroteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Tutki murtolukuja, ratkaise monivaiheisia laskuja ja kehit\u00e4 matemaattista ajattelua. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka murtoluvut ty\u00f6lehdet osat kokonaisuudet vertailu 8-9v, desimaaliluvut ty\u00f6lehdet kymmenykset sadasosat laskeminen 3. luokka tulostettava, matemaattinen p\u00e4\u00e4ttely ty\u00f6lehdet sanallinen teht\u00e4v\u00e4 strategia 3. luokka, numerot monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, lukujen py\u00f6rist\u00e4minen ty\u00f6lehdet arviointi suuruusluokka 3. luokka harjoitukset',
    },
  },
  ocean: {
    preschool: {
      seoTitle: 'Valtameriteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia valtameriteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske meriel\u00e4imi\u00e4, v\u00e4rit\u00e4 kaloja, yhdist\u00e4 merivarjoja ja lajittele olentoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu valtameri laskeminen ty\u00f6lehdet kalat merit\u00e4hdet 3-4v, meriel\u00e4inten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, merivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, meriel\u00e4inten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, merikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Valtameriteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Sukella | LCS',
      seoDescription: 'Tulostettavia valtameriteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele merisanastoa, laske meriel\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus merisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, meriel\u00e4inten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, valtameri sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, merikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, valtameri poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Valtameriteht\u00e4v\u00e4t 1. Luokalle \u2014 Merenelävät ja Laskut | LCS',
      seoDescription: 'Tulostettavia valtameriteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise merilaskuja, opettele merisanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka valtameri yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, meriristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, valtameri sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, merifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, meriel\u00e4inten luokittelu ty\u00f6lehdet kalat nilvi\u00e4iset 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Valtameriteht\u00e4v\u00e4t 2. Luokalle \u2014 Syvyydet ja Tilastot | LCS',
      seoDescription: 'Tulostettavia valtameriteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki merielinymp\u00e4rist\u00f6j\u00e4, analysoi tilastoja ja kirjoita merikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka meren elinymp\u00e4rist\u00f6t ty\u00f6lehdet koralliriutta syv\u00e4nmeri ranta 7-8v, meritilastot taulukkotyölehdet data-analyysi lajit syvyydet 2. luokka tulostettava, merikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit vedenalainen 2. luokka, meren kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, meriel\u00e4inlajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Valtameriteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Meribiologia | LCS',
      seoDescription: 'Tulostettavia valtameriteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita meritutkimuksia, tutki merivirtoja ja ratkaise ekologisia pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka meritutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, merten ekosysteemit ty\u00f6lehdet ravintoketju plankton koralli 3. luokka tulostettava, It\u00e4meri ty\u00f6lehdet Suomen rannikko saaret vesist\u00f6t 3. luokka, valtameri monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, merten suojelu ty\u00f6lehdet muovisaaste ylikalastus 3. luokka harjoitukset',
    },
  },
  pets: {
    preschool: {
      seoTitle: 'Lemmikkiteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia lemmikkiteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske lemmikkej\u00e4, v\u00e4rit\u00e4 el\u00e4imi\u00e4, yhdist\u00e4 lemmikkivarjoja ja lajittele olentoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu lemmikki laskeminen ty\u00f6lehdet kissat koirat 3-4v, lemmikkien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, lemmikkivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, lemmikkien lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, lemmikkikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Lemmikkiteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Hoida | LCS',
      seoDescription: 'Tulostettavia lemmikkiteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele lemmikkisanastoa, laske el\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus lemmikkisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, lemmikkien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, lemmikki sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, lemmikkikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, lemmikki poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Lemmikkiteht\u00e4v\u00e4t 1. Luokalle \u2014 El\u00e4imet ja Laskut | LCS',
      seoDescription: 'Tulostettavia lemmikkiteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise lemmikkilaskuja, opettele el\u00e4insanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka lemmikki yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, lemmikkiristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, lemmikki sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, lemmikkifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, lemmikkien luokittelu ty\u00f6lehdet nis\u00e4kk\u00e4\u00e4t linnut kalat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Lemmikkiteht\u00e4v\u00e4t 2. Luokalle \u2014 Hoito ja Tilastot | LCS',
      seoDescription: 'Tulostettavia lemmikkiteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki lemmikkien hoitoa, analysoi tilastoja ja kirjoita el\u00e4inkuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka lemmikkien hoito ty\u00f6lehdet ruokinta ulkoilu terveys 7-8v, lemmikkitilastot taulukkotyölehdet data-analyysi lajit rodut 2. luokka tulostettava, lemmikkikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, lemmikkien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, lemmikkilajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Lemmikkiteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Vastuullisuus | LCS',
      seoDescription: 'Tulostettavia lemmikkiteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita el\u00e4intutkimuksia, vertaile lajeja ja ratkaise hoitopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka lemmikkitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, lemmikkien ravitsemus ty\u00f6lehdet ruokavalio tarpeet kasvu 3. luokka tulostettava, vastuullinen lemmikkienhoito ty\u00f6lehdet el\u00e4inl\u00e4\u00e4k\u00e4ri rokotukset 3. luokka, lemmikki monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, lemmikkien k\u00e4ytt\u00e4ytyminen ty\u00f6lehdet viestint\u00e4 tunteet koulutus 3. luokka harjoitukset',
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
      // Detect grade start (with grade id)
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
