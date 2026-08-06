/**
 * Part 119: Finnish Theme+Grade SEO — Themes 17–20
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for flowers, food, forest, fruits Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  flowers: {
    preschool: {
      seoTitle: 'Kukkateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kukkateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kukkia, v\u00e4rit\u00e4 ruusuja, yhdist\u00e4 kukkavarjoja ja lajittele kasveja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kukka laskeminen ty\u00f6lehdet ruusut tulppaanit 3-4v, kukkien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kukkavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kukkien lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, kukkakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kukkateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Istuta | LCS',
      seoDescription: 'Tulostettavia kukkateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele kukkasanastoa, laske ter\u00e4lehti\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kukkasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kukkien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, kukka sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kukkakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, kukka poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kukkateht\u00e4v\u00e4t 1. Luokalle \u2014 Kasvit ja Laskut | LCS',
      seoDescription: 'Tulostettavia kukkateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise kukkalaskuja, opettele kasvien sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka kukka yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kukkaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kukka sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kasvien faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kukkien luokittelu ty\u00f6lehdet ter\u00e4lehdet varret juuret 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kukkateht\u00e4v\u00e4t 2. Luokalle \u2014 Kasvu ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kukkateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kasvien kasvua, analysoi tilastoja ja kirjoita kukkakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kasvien kasvu ty\u00f6lehdet siemenet vesi valo 7-8v, kukkatilastot taulukkotyölehdet data-analyysi ter\u00e4lehdet v\u00e4rit 2. luokka tulostettava, kukkakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, kukkien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kukkien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kukkateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Kasvioppi | LCS',
      seoDescription: 'Tulostettavia kukkateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita kasvitutkimuksia, vertaile kukkalajeja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka kasvitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kukkien p\u00f6lytys ty\u00f6lehdet hy\u00f6nteiset ekosysteemi 3. luokka tulostettava, kasvien elinkaari ty\u00f6lehdet siemen kukinta hedelm\u00e4 3. luokka, kukka monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, puutarhasuunnittelu ty\u00f6lehdet mittaus geometria lajit 3. luokka harjoitukset',
    },
  },
  food: {
    preschool: {
      seoTitle: 'Ruokateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia ruokateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske hedelmi\u00e4, v\u00e4rit\u00e4 ruokia, yhdist\u00e4 ruokavarjoja ja lajittele ainesosia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu ruoka laskeminen ty\u00f6lehdet hedelm\u00e4t vihannekset 3-4v, ruokien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, ruokavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, ruokien lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, ruokakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Ruokateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Maista | LCS',
      seoDescription: 'Tulostettavia ruokateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele ruokasanastoa, laske ainesosia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus ruokasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, ruokien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, ruoka sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, ruokakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, ruoka poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Ruokateht\u00e4v\u00e4t 1. Luokalle \u2014 Ravinto ja Laskut | LCS',
      seoDescription: 'Tulostettavia ruokateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise ruokalaskuja, opettele ruokasanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka ruoka yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, ruokaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, ruoka sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, ruokafaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, ruokien luokittelu ty\u00f6lehdet ruokaryhm\u00e4t ravinto 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Ruokateht\u00e4v\u00e4t 2. Luokalle \u2014 Ravitsemus ja Data | LCS',
      seoDescription: 'Tulostettavia ruokateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki ravitsemusta, analysoi ruokatilastoja ja kirjoita reseptikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka ravitsemus ty\u00f6lehdet ruokaryhm\u00e4t terveellisyys 7-8v, ruokatilastot taulukkotyölehdet data-analyysi ateriat ravintoaineet 2. luokka tulostettava, reseptikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet ohjeet vaiheet 2. luokka, ruoan kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet annokset ryhm\u00e4t 2. luokka, ruokakulttuurien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Ruokateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ruokakulttuuri | LCS',
      seoDescription: 'Tulostettavia ruokateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita ruokatutkimuksia, vertaile ruokakulttuureja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka ruokatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ruokaketju pellolta p\u00f6yt\u00e4\u00e4n ty\u00f6lehdet tuotanto kuluttaja 3. luokka tulostettava, terveellinen ravinto ty\u00f6lehdet ravintoaineet lautasmalli 3. luokka, ruoka monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, ruokakulttuuri ty\u00f6lehdet perinteet eri maat maailma 3. luokka harjoitukset',
    },
  },
  forest: {
    preschool: {
      seoTitle: 'Mets\u00e4teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia mets\u00e4teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske puita, v\u00e4rit\u00e4 el\u00e4imi\u00e4, yhdist\u00e4 mets\u00e4varjoja ja lajittele lehti\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu mets\u00e4 laskeminen ty\u00f6lehdet puut el\u00e4imet 3-4v, mets\u00e4n v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, mets\u00e4varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, mets\u00e4el\u00e4inten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, mets\u00e4kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Mets\u00e4teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia mets\u00e4teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele mets\u00e4sanastoa, laske el\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus mets\u00e4sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, mets\u00e4el\u00e4inten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, mets\u00e4 sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, mets\u00e4kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, mets\u00e4 poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Mets\u00e4teht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia mets\u00e4teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise mets\u00e4laskuja, opettele luontosanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka mets\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, mets\u00e4ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, mets\u00e4 sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, mets\u00e4faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, mets\u00e4el\u00e4inten luokittelu ty\u00f6lehdet nis\u00e4kk\u00e4\u00e4t linnut 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Mets\u00e4teht\u00e4v\u00e4t 2. Luokalle \u2014 Ekosysteemit ja Data | LCS',
      seoDescription: 'Tulostettavia mets\u00e4teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki mets\u00e4n ekosysteemi\u00e4, analysoi tilastoja ja kirjoita luontokuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka mets\u00e4n ekosysteemi ty\u00f6lehdet ravintoketju eli\u00f6t 7-8v, mets\u00e4tilastot taulukkotyölehdet data-analyysi puulajit el\u00e4imet 2. luokka tulostettava, mets\u00e4kuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luonto 2. luokka, mets\u00e4n kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, mets\u00e4tyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Mets\u00e4teht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ekologia | LCS',
      seoDescription: 'Tulostettavia mets\u00e4teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita mets\u00e4tutkimuksia, analysoi ekosysteemej\u00e4 ja ratkaise ymp\u00e4rist\u00f6pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka mets\u00e4tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, mets\u00e4n ekosysteemi ty\u00f6lehdet ravintoketju monimuotoisuus 3. luokka tulostettava, suomen mets\u00e4t ty\u00f6lehdet havumets\u00e4 lehtimets\u00e4 puulajit 3. luokka, mets\u00e4 monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, mets\u00e4nsuojelu ty\u00f6lehdet ymp\u00e4rist\u00f6 kest\u00e4vyys kierr\u00e4tys 3. luokka harjoitukset',
    },
  },
  fruits: {
    preschool: {
      seoTitle: 'Hedelm\u00e4teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia hedelm\u00e4teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske hedelmi\u00e4, v\u00e4rit\u00e4 marjoja, yhdist\u00e4 hedelm\u00e4varjoja ja lajittele tuotteita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu hedelm\u00e4 laskeminen ty\u00f6lehdet omenat banaanit 3-4v, hedelmien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, hedelm\u00e4varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, hedelmien lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, hedelm\u00e4kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Hedelm\u00e4teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Maista | LCS',
      seoDescription: 'Tulostettavia hedelm\u00e4teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele hedelm\u00e4sanastoa, laske marjoja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus hedelm\u00e4sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, hedelmien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, hedelm\u00e4 sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, hedelm\u00e4kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, hedelm\u00e4 poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Hedelm\u00e4teht\u00e4v\u00e4t 1. Luokalle \u2014 Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia hedelm\u00e4teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise hedelm\u00e4laskuja, opettele marjasanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka hedelm\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, hedelm\u00e4ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, hedelm\u00e4 sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, hedelm\u00e4faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, hedelmien luokittelu ty\u00f6lehdet marjat sitrushedelm\u00e4t 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Hedelm\u00e4teht\u00e4v\u00e4t 2. Luokalle \u2014 Ravinto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia hedelm\u00e4teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki hedelmien ravintoa, analysoi tilastoja ja kirjoita hedelm\u00e4kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka hedelmien ravinto ty\u00f6lehdet vitamiinit terveellisyys 7-8v, hedelm\u00e4tilastot taulukkotyölehdet data-analyysi suosikit viljelymaat 2. luokka tulostettava, hedelm\u00e4kuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit maku 2. luokka, hedelmien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, hedelmien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Hedelm\u00e4teht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Kasvioppi | LCS',
      seoDescription: 'Tulostettavia hedelm\u00e4teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita hedelm\u00e4tutkimuksia, vertaile viljelykasveja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka hedelm\u00e4tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, hedelmien viljely ty\u00f6lehdet kasvuolosuhteet maantiede 3. luokka tulostettava, hedelmien ravintosis\u00e4lt\u00f6 ty\u00f6lehdet vitamiinit terveellinen ravinto 3. luokka, hedelm\u00e4 monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, hedelm\u00e4lajien vertailu ty\u00f6lehdet alkuper\u00e4maat kasvuvy\u00f6hykkeet 3. luokka harjoitukset',
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
