/**
 * Part 120: Finnish Theme+Grade SEO — Themes 21–24
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for furniture, garden, halloween, holidays Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  furniture: {
    preschool: {
      seoTitle: 'Huonekaluteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia huonekaluteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske huonekaluja, v\u00e4rit\u00e4 tuoleja, yhdist\u00e4 huonekaluvarjoja ja lajittele esineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu huonekalu laskeminen ty\u00f6lehdet tuolit p\u00f6yd\u00e4t 3-4v, huonekalujen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, huonekaluvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, huonekalujen lajittelu ty\u00f6lehdet huoneen mukaan vertailu esikoulu, huonekalukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Huonekaluteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja J\u00e4rjest\u00e4 | LCS',
      seoDescription: 'Tulostettavia huonekaluteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele huonekalusanastoa, laske esineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus huonekalusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, huonekalujen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, huonekalu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, huonekalukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, huonekalu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Huonekaluteht\u00e4v\u00e4t 1. Luokalle \u2014 Kodin Sanat ja Laskut | LCS',
      seoDescription: 'Tulostettavia huonekaluteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise huonekalulaskuja, opettele kodinsanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka huonekalu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, huonekaluristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, huonekalu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kodinfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, huonekalujen luokittelu ty\u00f6lehdet materiaalit muodot 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Huonekaluteht\u00e4v\u00e4t 2. Luokalle \u2014 Mittaus ja Tilastot | LCS',
      seoDescription: 'Tulostettavia huonekaluteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Mittaa huonekaluja, analysoi tilastoja ja kirjoita kodinkuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka huonekalujen mittaus ty\u00f6lehdet pituus leveys korkeus 7-8v, huonekalutilastot taulukkotyölehdet data-analyysi materiaalit tyylit 2. luokka tulostettava, kodinkuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit huoneet 2. luokka, huonekalujen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, huonekalutyylien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Huonekaluteht\u00e4v\u00e4t 3. Luokalle \u2014 Suunnittelu ja Geometria | LCS',
      seoDescription: 'Tulostettavia huonekaluteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Suunnittele huoneita, laske pinta-aloja ja ratkaise mittauspulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka huonesuunnittelu ty\u00f6lehdet pohjapiirros mittakaava 8-9v, huonekalujen geometria ty\u00f6lehdet pinta-ala tilavuus 3. luokka tulostettava, kodin materiaalit ty\u00f6lehdet puu metalli kangas 3. luokka, huonekalu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, huonekalujen historia ty\u00f6lehdet muotoilu k\u00e4sity\u00f6 perinteet 3. luokka harjoitukset',
    },
  },
  garden: {
    preschool: {
      seoTitle: 'Puutarhateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia puutarhateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kukkia, v\u00e4rit\u00e4 kasveja, yhdist\u00e4 puutarhavarjoja ja lajittele siemeni\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu puutarha laskeminen ty\u00f6lehdet kukat kasvit 3-4v, puutarhan v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, puutarhavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, puutarhakasvien lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, puutarhakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Puutarhateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Istuta | LCS',
      seoDescription: 'Tulostettavia puutarhateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele puutarhasanastoa, laske siemeni\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus puutarhasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, puutarhan yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, puutarha sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, puutarhakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, puutarha poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Puutarhateht\u00e4v\u00e4t 1. Luokalle \u2014 Kasvit ja Laskut | LCS',
      seoDescription: 'Tulostettavia puutarhateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise puutarhalaskuja, opettele kasvien sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka puutarha yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, puutarharistikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, puutarha sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kasvifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, puutarhakasvien luokittelu ty\u00f6lehdet hedelm\u00e4t vihannekset 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Puutarhateht\u00e4v\u00e4t 2. Luokalle \u2014 Kasvu ja Tilastot | LCS',
      seoDescription: 'Tulostettavia puutarhateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kasvien kasvua, analysoi satokausia ja kirjoita puutarhakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kasvien kasvu puutarha ty\u00f6lehdet siemenet vesi valo 7-8v, puutarhatilastot taulukkotyölehdet data-analyysi sadot vuodenajat 2. luokka tulostettava, puutarhakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit kasvit 2. luokka, puutarhan kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet rivit sarjat 2. luokka, puutarhatyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Puutarhateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ekologia | LCS',
      seoDescription: 'Tulostettavia puutarhateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Suunnittele puutarhoja, tutki ekosysteemej\u00e4 ja ratkaise mittauspulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka puutarhatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, puutarhan ekosysteemi ty\u00f6lehdet p\u00f6lytt\u00e4j\u00e4t ravintoketju 3. luokka tulostettava, kest\u00e4v\u00e4 puutarhanhoito ty\u00f6lehdet kompostointi kierr\u00e4tys 3. luokka, puutarha monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, puutarhasuunnittelu ty\u00f6lehdet pinta-ala mittaus geometria 3. luokka harjoitukset',
    },
  },
  halloween: {
    preschool: {
      seoTitle: 'Halloween-teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia halloween-teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kurpitsoja, v\u00e4rit\u00e4 haamuja, yhdist\u00e4 halloween-varjoja ja lajittele olentoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu halloween laskeminen ty\u00f6lehdet kurpitsat haamut 3-4v, halloween v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, halloween-varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, halloween-hahmojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, halloween-kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Halloween-teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Pelottele | LCS',
      seoDescription: 'Tulostettavia halloween-teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele halloween-sanastoa, laske kummituksia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus halloween-sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, halloween yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, halloween sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, halloween-kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, halloween poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Halloween-teht\u00e4v\u00e4t 1. Luokalle \u2014 Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia halloween-teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise halloween-laskuja, opettele sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka halloween yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, halloween-ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, halloween sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, halloween-faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, halloween-hahmojen luokittelu ty\u00f6lehdet hirvi\u00f6t kummitukset 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Halloween-teht\u00e4v\u00e4t 2. Luokalle \u2014 Tarinat ja Tilastot | LCS',
      seoDescription: 'Tulostettavia halloween-teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Kirjoita kummitustarinoita, analysoi tilastoja ja tutki halloween-perinteit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka halloween-perinteet ty\u00f6lehdet tavat kulttuuri syksy 7-8v, halloween-tilastot taulukkotyölehdet data-analyysi asut karkit 2. luokka tulostettava, kummitustarina kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet luova kerronta 2. luokka, halloween kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, halloween-perinteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Halloween-teht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Kulttuuri | LCS',
      seoDescription: 'Tulostettavia halloween-teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita halloween-tutkimuksia, vertaile perinteit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka halloween-tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, halloween-perinteet eri maissa ty\u00f6lehdet kulttuuri vertailu 3. luokka tulostettava, syksyn luonnonilmi\u00f6t ty\u00f6lehdet vuodenajat pimenev\u00e4t illat 3. luokka, halloween monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, halloween-taide ty\u00f6lehdet koristelu kurpitsat symbolit 3. luokka harjoitukset',
    },
  },
  holidays: {
    preschool: {
      seoTitle: 'Juhlateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia juhlateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske lahjoja, v\u00e4rit\u00e4 koristeita, yhdist\u00e4 juhlavarjoja ja lajittele juhla-aiheita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu juhlap\u00e4iv\u00e4 laskeminen ty\u00f6lehdet lahjat koristeet 3-4v, juhla v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, juhlavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, juhla-aiheiden lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, juhlakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Juhlateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Juhli | LCS',
      seoDescription: 'Tulostettavia juhlateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele juhlasanastoa, laske koristeita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus juhlasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, juhlap\u00e4ivien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, juhla sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, juhlakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, juhla poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Juhlateht\u00e4v\u00e4t 1. Luokalle \u2014 Perinteet ja Laskut | LCS',
      seoDescription: 'Tulostettavia juhlateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise juhla-aiheisia laskuja, opettele sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka juhlap\u00e4iv\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, juhlaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, juhla sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, juhlafaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, juhlap\u00e4ivien luokittelu ty\u00f6lehdet vuodenajat perinteet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Juhlateht\u00e4v\u00e4t 2. Luokalle \u2014 Kulttuuri ja Tilastot | LCS',
      seoDescription: 'Tulostettavia juhlateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki juhlap\u00e4ivi\u00e4, analysoi tilastoja ja kirjoita juhla-aiheisia kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka juhlap\u00e4iv\u00e4t kulttuuri ty\u00f6lehdet perinteet tavat 7-8v, juhlatilastot taulukkotyölehdet data-analyysi vuodenajat kalenterit 2. luokka tulostettava, juhlakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit perinteet 2. luokka, juhlap\u00e4ivien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, juhlaperinteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Juhlateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Maailman Juhlat | LCS',
      seoDescription: 'Tulostettavia juhlateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita juhlatutkimuksia, vertaile kulttuurien perinteit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka juhlatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, maailman juhlap\u00e4iv\u00e4t ty\u00f6lehdet kulttuuri vertailu perinteet 3. luokka tulostettava, suomen juhlap\u00e4iv\u00e4t ty\u00f6lehdet itsen\u00e4isyysp\u00e4iv\u00e4 vappu juhannus 3. luokka, juhla monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, juhlakulttuurien vertailu ty\u00f6lehdet eri maat perinteet tavat 3. luokka harjoitukset',
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
