#!/usr/bin/env node
/**
 * Part 125 — Finnish Theme+Grade SEO for themes 41–44
 * (summer, superheroes, toys, transportation)
 *
 * Inserts seoTitle, seoDescription, seoKeywords before each grade's intro: line
 * inside the gradeContent block.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const SEO = {
  /* ────────────────── 41. summer ────────────────── */
  'summer/fi.ts': {
    preschool: {
      seoTitle: 'Kes\u00e4teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kes\u00e4teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske auringoita, v\u00e4rit\u00e4 j\u00e4\u00e4tel\u00f6it\u00e4, yhdist\u00e4 kes\u00e4varjoja ja lajittele rantaesineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kes\u00e4 laskeminen ty\u00f6lehdet aurinko j\u00e4\u00e4tel\u00f6 ranta 3-4v, kes\u00e4n v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kes\u00e4varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kes\u00e4esineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, kes\u00e4kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kes\u00e4teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Leiki | LCS',
      seoDescription: 'Tulostettavia kes\u00e4teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele kes\u00e4sanastoa, laske simpukoita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kes\u00e4sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kes\u00e4n yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, kes\u00e4 sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kes\u00e4kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, kes\u00e4 poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kes\u00e4teht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia kes\u00e4teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise kes\u00e4laskuja, opettele kes\u00e4sanastoa ja t\u00e4yt\u00e4 ristikkoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka kes\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kes\u00e4ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kes\u00e4 sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kes\u00e4faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kes\u00e4aiheiden luokittelu ty\u00f6lehdet ranta mets\u00e4 puutarha 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kes\u00e4teht\u00e4v\u00e4t 2. Luokalle \u2014 Luonto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kes\u00e4teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kes\u00e4n luontoa, analysoi tilastoja ja kirjoita kes\u00e4kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kes\u00e4n luonto ty\u00f6lehdet kasvit hy\u00f6nteiset linnut 7-8v, kes\u00e4tilastot taulukkoty\u00f6lehdet data-analyysi l\u00e4mp\u00f6tila aurinko 2. luokka tulostettava, kes\u00e4kuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luontoelämykset 2. luokka, kes\u00e4n kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kes\u00e4ilmi\u00f6iden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kes\u00e4teht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ekologia | LCS',
      seoDescription: 'Tulostettavia kes\u00e4teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita kes\u00e4tutkimuksia, tutki ekosysteemej\u00e4 ja ratkaise luontopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka kes\u00e4tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kes\u00e4n ekologia ty\u00f6lehdet ekosysteemit ravintoketjut elinymp\u00e4rist\u00f6t 3. luokka tulostettava, Suomen kes\u00e4 ty\u00f6lehdet y\u00f6tt\u00f6m\u00e4t y\u00f6t j\u00e4rvet m\u00f6kkeily 3. luokka, kes\u00e4 monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, kes\u00e4seuranta ty\u00f6lehdet luontop\u00e4iv\u00e4kirja havainnointi mittaus 3. luokka harjoitukset',
    },
  },

  /* ────────────────── 42. superheroes ────────────────── */
  'superheroes/fi.ts': {
    preschool: {
      seoTitle: 'Supersankariteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia supersankariteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske sankareita, v\u00e4rit\u00e4 viittoja, yhdist\u00e4 sankarien varjoja ja lajittele voimia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu supersankarit laskeminen ty\u00f6lehdet sankarit viitat naamiot 3-4v, supersankarien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, supersankarivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, supersankariesineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, supersankarikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Supersankariteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Pelasta | LCS',
      seoDescription: 'Tulostettavia supersankariteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele sankarisanastoa, laske voimia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus supersankarisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, supersankarien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, supersankari sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, supersankarikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, supersankari poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Supersankariteht\u00e4v\u00e4t 1. Luokalle \u2014 Voimat ja Laskut | LCS',
      seoDescription: 'Tulostettavia supersankariteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise sankarilaskuja, opettele sankarisanastoa ja t\u00e4yt\u00e4 ristikkoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka supersankarit yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, supersankariristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, supersankari sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, supersankarifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, supersankarien luokittelu ty\u00f6lehdet voimat kyvyt varusteet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Supersankariteht\u00e4v\u00e4t 2. Luokalle \u2014 Tarinat ja Tilastot | LCS',
      seoDescription: 'Tulostettavia supersankariteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki sankaritarinoita, analysoi tilastoja ja kirjoita hahmokuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka supersankaritarinat ty\u00f6lehdet juoni hahmot seikkailut 7-8v, supersankaritilastot taulukkoty\u00f6lehdet data-analyysi voimat kyvyt 2. luokka tulostettava, supersankarikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, supersankarien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, supersankarityyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Supersankariteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Tarinat | LCS',
      seoDescription: 'Tulostettavia supersankariteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita sankaritarinoita, tutki myyttej\u00e4 ja ratkaise logiikkapulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka supersankaritarinat ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, myyttiset sankarit ty\u00f6lehdet Kalevala kansantarinat legendat 3. luokka tulostettava, supersankarin luominen ty\u00f6lehdet hahmosuunnittelu taustatarina 3. luokka, supersankari monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, sankarin matka ty\u00f6lehdet juonirakenne kerronta konflikti 3. luokka harjoitukset',
    },
  },

  /* ────────────────── 43. toys ────────────────── */
  'toys/fi.ts': {
    preschool: {
      seoTitle: 'Leluteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia leluteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske palikoita, v\u00e4rit\u00e4 nukkeja, yhdist\u00e4 leluvarjoja ja lajittele leikkikaluja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu lelut laskeminen ty\u00f6lehdet palikat nuket autot 3-4v, lelujen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, leluvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, lelujen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, lelukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Leluteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Leiki | LCS',
      seoDescription: 'Tulostettavia leluteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele lelusanastoa, laske leikkikaluja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus lelusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, lelujen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, lelu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, lelukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, lelu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Leluteht\u00e4v\u00e4t 1. Luokalle \u2014 Leikkikalut ja Laskut | LCS',
      seoDescription: 'Tulostettavia leluteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise lelulaskuja, opettele lelusanastoa ja t\u00e4yt\u00e4 ristikkoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka lelut yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, leluristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, lelu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, lelufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, lelujen luokittelu ty\u00f6lehdet materiaali koko tyyppi 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Leluteht\u00e4v\u00e4t 2. Luokalle \u2014 Suunnittelu ja Tilastot | LCS',
      seoDescription: 'Tulostettavia leluteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki lelujen historiaa, analysoi tilastoja ja kirjoita lelukuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka lelujen historia ty\u00f6lehdet vanhat uudet materiaalit 7-8v, lelutilastot taulukkoty\u00f6lehdet data-analyysi suosituimmat tyypit 2. luokka tulostettava, lelukuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, lelujen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, lelutyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Leluteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Keksinn\u00f6t | LCS',
      seoDescription: 'Tulostettavia leluteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita lelututkimuksia, tutki keksint\u00f6j\u00e4 ja ratkaise suunnittelupulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka lelututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, lelujen keksinn\u00f6t ty\u00f6lehdet suunnittelu teknologia materiaalit 3. luokka tulostettava, lelun suunnittelu ty\u00f6lehdet luovuus ongelmanratkaisu prototyyppi 3. luokka, lelu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, leluteollisuus ty\u00f6lehdet tuotanto kierr\u00e4tys kest\u00e4vyys 3. luokka harjoitukset',
    },
  },

  /* ────────────────── 44. transportation ────────────────── */
  'transportation/fi.ts': {
    preschool: {
      seoTitle: 'Kulkuneuvoteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kulkuneuvoteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske autoja, v\u00e4rit\u00e4 lentokoneita, yhdist\u00e4 ajoneuvovarjoja ja lajittele kulkupelej\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kulkuneuvot laskeminen ty\u00f6lehdet autot junat lentokoneet 3-4v, kulkuneuvojen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, ajoneuvovarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kulkuneuvojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, kulkuneuvokuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kulkuneuvoteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Matkusta | LCS',
      seoDescription: 'Tulostettavia kulkuneuvoteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele liikennesanastoa, laske ajoneuvoja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus liikennesanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kulkuneuvojen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, kulkuneuvo sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kulkuneuvokuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, kulkuneuvo poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kulkuneuvoteht\u00e4v\u00e4t 1. Luokalle \u2014 Liikenne ja Laskut | LCS',
      seoDescription: 'Tulostettavia kulkuneuvoteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise liikenelaskuja, opettele liikennesanastoa ja t\u00e4yt\u00e4 ristikkoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka kulkuneuvot yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kulkuneuvoristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kulkuneuvo sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kulkuneuvofaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kulkuneuvojen luokittelu ty\u00f6lehdet maa vesi ilma 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kulkuneuvoteht\u00e4v\u00e4t 2. Luokalle \u2014 Matkat ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kulkuneuvoteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki liikennevälineit\u00e4, analysoi tilastoja ja kirjoita matkakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka liikennev\u00e4lineet ty\u00f6lehdet nopeus et\u00e4isyys polttoaine 7-8v, liikennetilastot taulukkoty\u00f6lehdet data-analyysi matkustajat reitit 2. luokka tulostettava, matkakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit kokemukset 2. luokka, kulkuneuvojen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kulkuneuvotyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kulkuneuvoteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Tekniikka | LCS',
      seoDescription: 'Tulostettavia kulkuneuvoteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita liikennetutkimuksia, tutki kulkuneuvojen historiaa ja ratkaise tekniikkapulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka liikennetutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kulkuneuvojen historia ty\u00f6lehdet h\u00f6yrykone auto lentokone 3. luokka tulostettava, liikenneturvallisuus ty\u00f6lehdet s\u00e4\u00e4nn\u00f6t merkit turvalaitteet 3. luokka, kulkuneuvo monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen liikenne ty\u00f6lehdet rautatiet laivat saaristolautat 3. luokka harjoitukset',
    },
  },
};

const GRADE_KEYS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalInserted = 0;

for (const [relPath, grades] of Object.entries(SEO)) {
  const filePath = path.join(BASE, relPath);
  const src = fs.readFileSync(filePath, 'utf8');
  const lines = src.split('\n');
  const out = [];

  let inGradeContent = false;
  let currentGrade = null;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect gradeContent block
    if (/^\s*gradeContent\s*:\s*\{/.test(line)) {
      inGradeContent = true;
      braceDepth = 1;
      out.push(line);
      continue;
    }

    if (inGradeContent) {
      // Track brace depth
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      if (braceDepth <= 0) {
        inGradeContent = false;
        currentGrade = null;
        out.push(line);
        continue;
      }

      // Detect grade key
      for (const gk of GRADE_KEYS) {
        const pat = new RegExp(`['"]${gk}['"]\\s*:\\s*\\{`);
        if (pat.test(line)) {
          currentGrade = gk;
          break;
        }
      }

      // Insert SEO fields before intro: line
      if (currentGrade && /^\s+intro:\s*'/.test(line) && grades[currentGrade]) {
        // Guard against duplicate
        const prevLine = out.length > 0 ? out[out.length - 1] : '';
        if (prevLine.includes('seoKeywords')) {
          out.push(line);
          continue;
        }

        const indent = line.match(/^(\s*)/)[1];
        const g = grades[currentGrade];
        out.push(`${indent}seoTitle: '${g.seoTitle}',`);
        out.push(`${indent}seoDescription: '${g.seoDescription}',`);
        out.push(`${indent}seoKeywords: '${g.seoKeywords}',`);
        totalInserted += 3;
        console.log(`  + ${relPath} > ${currentGrade}: 3 SEO fields`);
      }
    }

    out.push(line);
  }

  fs.writeFileSync(filePath, out.join('\n'), 'utf8');
  console.log(`  Written: ${relPath}`);
}

console.log(`\nDone! Inserted ${totalInserted} SEO fields across ${Object.keys(SEO).length} files (expected 60).`);
