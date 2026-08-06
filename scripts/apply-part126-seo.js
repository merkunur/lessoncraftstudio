#!/usr/bin/env node
/**
 * Part 126: Finnish Theme+Grade SEO — Themes 45–48
 * travel, vegetables, weather, winter
 * Adds seoTitle, seoDescription, seoKeywords to gradeContent entries
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  'travel/fi.ts': {
    'preschool': {
      seoTitle: 'Matkailuteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia matkailuteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske matkalaukkuja, v\u00e4rit\u00e4 lentokoneita, yhdist\u00e4 matkavarjoja ja lajittele matkaesineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu matkailu laskeminen ty\u00f6lehdet matkalaukut lentokoneet passit 3-4v, matkailun v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, matkavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, matkaesineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, matkakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Matkailuteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Matkusta | LCS',
      seoDescription: 'Tulostettavia matkailuteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele matkasanastoa, laske matkaesineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus matkasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, matkailun yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, matkailu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, matkakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, matkailu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Matkailuteht\u00e4v\u00e4t 1. Luokalle \u2014 Maat ja Laskut | LCS',
      seoDescription: 'Tulostettavia matkailuteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise matkalaskuja, opettele matkasanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka matkailu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, matkailuristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, matkailu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, matkafaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, matkakohteiden luokittelu ty\u00f6lehdet maanosat maat kaupungit 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Matkailuteht\u00e4v\u00e4t 2. Luokalle \u2014 Maantieto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia matkailuteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki maailman maita, analysoi tilastoja ja kirjoita matkakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka maailman maat ty\u00f6lehdet maantieto kulttuuri kielet 7-8v, matkailutilastot taulukkotyölehdet data-analyysi et\u00e4isyydet ajat 2. luokka tulostettava, matkakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit el\u00e4mykset 2. luokka, matkailun kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, matkakohteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Matkailuteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Maantieto | LCS',
      seoDescription: 'Tulostettavia matkailuteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita matkatutkimuksia, tutki kulttuureja ja ratkaise maantietopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka matkatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, maailman kulttuurit ty\u00f6lehdet perinteet tavat kielet 3. luokka tulostettava, matkasuunnitelma ty\u00f6lehdet budjetointi aikataulu reitti 3. luokka, matkailu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen matkailu ty\u00f6lehdet Lappi saaristo j\u00e4rvialue 3. luokka harjoitukset',
    },
  },
  'vegetables/fi.ts': {
    'preschool': {
      seoTitle: 'Vihannesteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia vihannesteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske porkkanoita, v\u00e4rit\u00e4 tomaatteja, yhdist\u00e4 vihannesvarjoja ja lajittele kasviksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu vihannekset laskeminen ty\u00f6lehdet porkkanat tomaatit kurkut 3-4v, vihannesten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, vihannesvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, vihannesten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, vihanneskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Vihannesteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Opi | LCS',
      seoDescription: 'Tulostettavia vihannesteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele vihannessanastoa, laske kasviksia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus vihannessanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, vihannesten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, vihannes sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, vihanneskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, vihannes poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Vihannesteht\u00e4v\u00e4t 1. Luokalle \u2014 Kasvikset ja Laskut | LCS',
      seoDescription: 'Tulostettavia vihannesteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise vihanneslaskuja, opettele kasvissanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka vihannekset yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, vihannesristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, vihannes sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, vihannesfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, vihannesten luokittelu ty\u00f6lehdet v\u00e4ri muoto kasvupaikka 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Vihannesteht\u00e4v\u00e4t 2. Luokalle \u2014 Ravinto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia vihannesteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kasvisten ravintoa, analysoi tilastoja ja kirjoita vihanneskuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kasvisten ravinto ty\u00f6lehdet vitamiinit mineraalit terveys 7-8v, vihannestilastot taulukkotyölehdet data-analyysi suosituimmat lajit 2. luokka tulostettava, vihanneskuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, vihannesten kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, vihanneslajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Vihannesteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ravinto | LCS',
      seoDescription: 'Tulostettavia vihannesteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita kasvistutkimuksia, tutki ravintoarvoja ja ratkaise puutarhapulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka kasvistutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, vihannesten kasvatus ty\u00f6lehdet siemenet multa kasvuolosuhteet 3. luokka tulostettava, ravitsemustiede ty\u00f6lehdet ravintoaineet lautasmalli terveellisyys 3. luokka, vihannes monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen puutarha ty\u00f6lehdet viljelykausi sato kausivihannes 3. luokka harjoitukset',
    },
  },
  'weather/fi.ts': {
    'preschool': {
      seoTitle: 'S\u00e4\u00e4teht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia s\u00e4\u00e4teht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske pilvi\u00e4, v\u00e4rit\u00e4 sateenkaaria, yhdist\u00e4 s\u00e4\u00e4varjoja ja lajittele s\u00e4\u00e4ilmi\u00f6it\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu s\u00e4\u00e4 laskeminen ty\u00f6lehdet pilvet aurinko sade 3-4v, s\u00e4\u00e4n v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, s\u00e4\u00e4varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, s\u00e4\u00e4ilmi\u00f6iden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, s\u00e4\u00e4kuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'S\u00e4\u00e4teht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia s\u00e4\u00e4teht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele s\u00e4\u00e4sanastoa, laske s\u00e4\u00e4symboleja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus s\u00e4\u00e4sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, s\u00e4\u00e4n yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, s\u00e4\u00e4 sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, s\u00e4\u00e4kuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, s\u00e4\u00e4 poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'S\u00e4\u00e4teht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia s\u00e4\u00e4teht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise s\u00e4\u00e4laskuja, opettele s\u00e4\u00e4sanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka s\u00e4\u00e4 yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, s\u00e4\u00e4ristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, s\u00e4\u00e4 sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, s\u00e4\u00e4faktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, s\u00e4\u00e4ilmi\u00f6iden luokittelu ty\u00f6lehdet vuodenajat l\u00e4mp\u00f6tila sade 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'S\u00e4\u00e4teht\u00e4v\u00e4t 2. Luokalle \u2014 Ilmasto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia s\u00e4\u00e4teht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki s\u00e4\u00e4ilmi\u00f6it\u00e4, analysoi l\u00e4mp\u00f6tilatilastoja ja kirjoita s\u00e4\u00e4kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka s\u00e4\u00e4ilmi\u00f6t ty\u00f6lehdet pilvet tuuli sade lumi 7-8v, l\u00e4mp\u00f6tilatilastot taulukkotyölehdet data-analyysi s\u00e4\u00e4kaaviot 2. luokka tulostettava, s\u00e4\u00e4kuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luontoelämykset 2. luokka, s\u00e4\u00e4n kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, s\u00e4\u00e4ilmi\u00f6iden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'S\u00e4\u00e4teht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ilmatiede | LCS',
      seoDescription: 'Tulostettavia s\u00e4\u00e4teht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita s\u00e4\u00e4tutkimuksia, tutki ilmakeh\u00e4\u00e4 ja ratkaise ilmastopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka s\u00e4\u00e4tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ilmakeh\u00e4 ty\u00f6lehdet vesikierto pilvenmuodostus sade 3. luokka tulostettava, s\u00e4\u00e4ennuste ty\u00f6lehdet mittarit havainnointi data-analyysi 3. luokka, s\u00e4\u00e4 monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen ilmasto ty\u00f6lehdet vuodenajat nelj\u00e4 kautta l\u00e4mp\u00f6tilavaihtelu 3. luokka harjoitukset',
    },
  },
  'winter/fi.ts': {
    'preschool': {
      seoTitle: 'Talviteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia talviteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske lumihiutaleita, v\u00e4rit\u00e4 lumiukkoja, yhdist\u00e4 talvivarjoja ja lajittele talviesineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu talvi laskeminen ty\u00f6lehdet lumihiutaleet lumiukot k\u00e4sineet 3-4v, talven v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, talvivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, talviesineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, talvikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Talviteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Leiki | LCS',
      seoDescription: 'Tulostettavia talviteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele talvisanastoa, laske lumipalloja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus talvisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, talven yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, talvi sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, talvikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, talvi poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Talviteht\u00e4v\u00e4t 1. Luokalle \u2014 Lumi ja Laskut | LCS',
      seoDescription: 'Tulostettavia talviteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise talvilaskuja, opettele talvisanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka talvi yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, talviristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, talvi sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, talvifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, talviaiheiden luokittelu ty\u00f6lehdet luonto el\u00e4imet vaatteet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Talviteht\u00e4v\u00e4t 2. Luokalle \u2014 Luonto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia talviteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki talven luontoa, analysoi l\u00e4mp\u00f6tilatilastoja ja kirjoita talvikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka talven luonto ty\u00f6lehdet el\u00e4imet talvehtiminen lumi 7-8v, talvitilastot taulukkotyölehdet data-analyysi l\u00e4mp\u00f6tila lumisade 2. luokka tulostettava, talvikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luontoelämykset 2. luokka, talven kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, talvi-ilmi\u00f6iden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Talviteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Luonto | LCS',
      seoDescription: 'Tulostettavia talviteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita talvitutkimuksia, tutki arktista luontoa ja ratkaise luontopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka talvitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, arktinen luonto ty\u00f6lehdet talvehtiminen muuttaminen sopeutuminen 3. luokka tulostettava, Suomen talvi ty\u00f6lehdet kaamos revontulet j\u00e4\u00e4tyminen 3. luokka, talvi monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, talviekologia ty\u00f6lehdet lumi j\u00e4\u00e4 elinymp\u00e4rist\u00f6t el\u00e4imist\u00f6 3. luokka harjoitukset',
    },
  },
};

const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalInserted = 0;

for (const [relPath, gradeData] of Object.entries(seoData)) {
  const filePath = path.join(BASE, relPath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];

  let inGradeContent = false;
  let currentGrade = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect gradeContent block
    if (trimmed.startsWith('gradeContent:') || trimmed.startsWith('gradeContent :')) {
      inGradeContent = true;
    }

    // Detect grade key
    if (inGradeContent) {
      for (const g of grades) {
        if (trimmed === `'${g}': {`) {
          currentGrade = g;
          break;
        }
      }
    }

    // Insert SEO fields before intro line
    if (inGradeContent && currentGrade && trimmed.startsWith('intro:')) {
      const seo = gradeData[currentGrade];
      if (seo) {
        // Check if previous line already has seoKeywords (guard against double insertion)
        const prevLine = newLines[newLines.length - 1] || '';
        if (!prevLine.includes('seoKeywords')) {
          // Detect indentation from the intro line
          const indent = line.match(/^(\s*)/)[1];
          newLines.push(`${indent}seoTitle: '${seo.seoTitle}',`);
          newLines.push(`${indent}seoDescription: '${seo.seoDescription}',`);
          newLines.push(`${indent}seoKeywords: '${seo.seoKeywords}',`);
          totalInserted++;
          console.log(`  ✓ ${relPath} → ${currentGrade}`);
        } else {
          console.log(`  ⊘ ${relPath} → ${currentGrade} (already has SEO)`);
        }
        currentGrade = null;
      }
    }

    newLines.push(line);
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`  Written: ${relPath}`);
}

console.log(`\nDone! Inserted SEO fields for ${totalInserted} grade entries.`);
