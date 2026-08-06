/**
 * Part 123: Finnish Theme+Grade SEO — Themes 33–36
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for pirates, robots, school, seasons Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  pirates: {
    preschool: {
      seoTitle: 'Merirosvoteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia merirosvoteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske aarteita, v\u00e4rit\u00e4 merirosvolaivoja, yhdist\u00e4 merirosvovarjoja ja lajittele esineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu merirosvo laskeminen ty\u00f6lehdet aarteet laivat 3-4v, merirosvojen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, merirosvovarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, merirosvoesineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, merirosvokuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Merirosvoteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Seikkaile | LCS',
      seoDescription: 'Tulostettavia merirosvoteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele merirosvosanastoa, laske aarteita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus merirosvosanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, merirosvojen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, merirosvo sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, merirosvokuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, merirosvo poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Merirosvoteht\u00e4v\u00e4t 1. Luokalle \u2014 Seikkailut ja Laskut | LCS',
      seoDescription: 'Tulostettavia merirosvoteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise merirosvolaskuja, opettele merirosvosanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka merirosvo yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, merirosvokryptogrammi ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, merirosvo sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, merirosvofaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, merirosvoesineiden luokittelu ty\u00f6lehdet aarteet aseet kartat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Merirosvoteht\u00e4v\u00e4t 2. Luokalle \u2014 Kartat ja Tilastot | LCS',
      seoDescription: 'Tulostettavia merirosvoteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki aarrekarttoja, analysoi tilastoja ja kirjoita seikkailukuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka merirosvojen aarrekartat ty\u00f6lehdet koordinaatit suunnat mittaus 7-8v, merirosvotilastot taulukkotyölehdet data-analyysi laivat aarteet 2. luokka tulostettava, merirosvokuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit seikkailut 2. luokka, merirosvojen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, merirosvolaivotyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Merirosvoteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Historia | LCS',
      seoDescription: 'Tulostettavia merirosvoteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita merirosvotarinoita, tutki merenk\u00e4vij\u00f6it\u00e4 ja ratkaise seikkailupulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka merirosvotarinat ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, merirosvojen historia ty\u00f6lehdet l\u00f6yt\u00f6retket purjelaivat navigointi 3. luokka tulostettava, merirosvoseikkailut ty\u00f6lehdet kartat kompassi suuntaviiva 3. luokka, merirosvo monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, merenkulun historia ty\u00f6lehdet kauppatiet tutkimusmatkat 3. luokka harjoitukset',
    },
  },
  robots: {
    preschool: {
      seoTitle: 'Robottiteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia robottiteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske robotteja, v\u00e4rit\u00e4 koneita, yhdist\u00e4 robottivarjoja ja lajittele osia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu robotti laskeminen ty\u00f6lehdet koneet tekniikka 3-4v, robottien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, robottivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, robottien lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, robottikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Robottiteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Rakenna | LCS',
      seoDescription: 'Tulostettavia robottiteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele robottisanastoa, laske osia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus robottisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, robottien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, robotti sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, robottikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, robotti poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Robottiteht\u00e4v\u00e4t 1. Luokalle \u2014 Tekniikka ja Laskut | LCS',
      seoDescription: 'Tulostettavia robottiteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise robottilaskuja, opettele robottisanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka robotti yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, robottikryptogrammi ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, robotti sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, robottifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, robottien luokittelu ty\u00f6lehdet osat toiminnot 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Robottiteht\u00e4v\u00e4t 2. Luokalle \u2014 Ohjelmointi ja Tilastot | LCS',
      seoDescription: 'Tulostettavia robottiteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki robottitekniikkaa, analysoi tilastoja ja kirjoita robottikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka robottien ohjelmointi ty\u00f6lehdet k\u00e4skyt logiikka algoritmit 7-8v, robottitilastot taulukkotyölehdet data-analyysi osat toiminnot 2. luokka tulostettava, robottikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, robottien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, robottityyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Robottiteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Teko\u00e4ly | LCS',
      seoDescription: 'Tulostettavia robottiteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita robottitutkimuksia, tutki teknologian historiaa ja ratkaise koodipulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka robottitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, teko\u00e4ly ja automaatio ty\u00f6lehdet koneet anturit ohjelmointi 3. luokka tulostettava, teknologian historia ty\u00f6lehdet keksinn\u00f6t innovaatiot tulevaisuus 3. luokka, robotti monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, robotiikka ty\u00f6lehdet suunnittelu rakentaminen testaus 3. luokka harjoitukset',
    },
  },
  school: {
    preschool: {
      seoTitle: 'Kouluteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kouluteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske koulutarvikkeita, v\u00e4rit\u00e4 luokkakuvia, yhdist\u00e4 kouluvarjoja ja lajittele esineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu koulu laskeminen ty\u00f6lehdet koulutarvikkeet luokka 3-4v, koulun v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kouluvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, koulutarvikkeiden lajittelu ty\u00f6lehdet k\u00e4ytt\u00f6tarkoitus vertailu esikoulu, koulukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kouluteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Opettele | LCS',
      seoDescription: 'Tulostettavia kouluteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele koulusanastoa, laske tarvikkeita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus koulusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, koulun yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, koulu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, koulukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, koulu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kouluteht\u00e4v\u00e4t 1. Luokalle \u2014 Oppiminen ja Laskut | LCS',
      seoDescription: 'Tulostettavia kouluteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise koululaskuja, opettele koulusanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka koulu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kouluristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, koulu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, koulufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, koulutarvikkeiden luokittelu ty\u00f6lehdet kirjoitus piirt\u00e4minen laskeminen 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kouluteht\u00e4v\u00e4t 2. Luokalle \u2014 Lukuj\u00e4rjestys ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kouluteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kouluaineita, analysoi tilastoja ja kirjoita koulukuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kouluaineet ty\u00f6lehdet lukuj\u00e4rjestys oppitunnit v\u00e4litunti 7-8v, koulutilastot taulukkotyölehdet data-analyysi aineet tarvikkeet 2. luokka tulostettava, koulukuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luokkahuone 2. luokka, koulun kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kouluaineiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kouluteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Projektit | LCS',
      seoDescription: 'Tulostettavia kouluteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita koulututkimuksia, tutki oppimistapoja ja ratkaise kouluarjen pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka koulututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, koulun historia ty\u00f6lehdet oppiminen opetus perinteet 3. luokka tulostettava, kouluarjen rutiinit ty\u00f6lehdet lukuj\u00e4rjestys aikataulut vastuu 3. luokka, koulu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, oppimistyylit ty\u00f6lehdet visuaalinen auditiivinen kinesteettinen 3. luokka harjoitukset',
    },
  },
  seasons: {
    preschool: {
      seoTitle: 'Vuodenaikateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia vuodenaikateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske luontoaiheita, v\u00e4rit\u00e4 vuodenaikakuvia, yhdist\u00e4 varjoja ja lajittele esineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu vuodenajat laskeminen ty\u00f6lehdet kev\u00e4t kes\u00e4 syksy talvi 3-4v, vuodenaikojen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, vuodenaikavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, vuodenaikojen lajittelu ty\u00f6lehdet vaatteet s\u00e4\u00e4 vertailu esikoulu, vuodenaikakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Vuodenaikateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia vuodenaikateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele vuodenaikasanastoa, laske esineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus vuodenaikasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, vuodenaikojen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, vuodenaika sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, vuodenaikakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, vuodenaika poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Vuodenaikateht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia vuodenaikateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise vuodenaikalaskuja, opettele vuodenaikasanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka vuodenajat yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, vuodenaikaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, vuodenaika sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, vuodenaikafaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, vuodenaikojen luokittelu ty\u00f6lehdet s\u00e4\u00e4 vaatteet luonto 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Vuodenaikateht\u00e4v\u00e4t 2. Luokalle \u2014 S\u00e4\u00e4 ja Tilastot | LCS',
      seoDescription: 'Tulostettavia vuodenaikateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki vuodenaikojen vaihtelua, analysoi tilastoja ja kirjoita luontokuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka vuodenaikojen vaihtelu ty\u00f6lehdet l\u00e4mp\u00f6tila p\u00e4iv\u00e4npituus sade 7-8v, vuodenaikatilastot taulukkotyölehdet data-analyysi s\u00e4\u00e4 luonto 2. luokka tulostettava, vuodenaikakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luontomuutokset 2. luokka, vuodenaikojen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, vuodenaikojen vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Vuodenaikateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ilmasto | LCS',
      seoDescription: 'Tulostettavia vuodenaikateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita vuodenaikatutkimuksia, tutki ilmastoa ja ratkaise luontopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka vuodenaikatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, Suomen ilmasto ty\u00f6lehdet vuodenajat s\u00e4\u00e4tilat fenologia 3. luokka tulostettava, luonnon kiertokulku ty\u00f6lehdet kasvukaudet el\u00e4inten sopeutuminen 3. luokka, vuodenaika monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, ilmastonmuutos ty\u00f6lehdet kest\u00e4vyys ymp\u00e4rist\u00f6 luonnonsuojelu 3. luokka harjoitukset',
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
