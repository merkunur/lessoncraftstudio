/**
 * Part 117: Finnish Theme+Grade SEO — Themes 9–12
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for colors, construction, cooking, dinosaurs Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  colors: {
    preschool: {
      seoTitle: 'V\u00e4riteht\u00e4v\u00e4t Esikouluun \u2014 Tunnista ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia v\u00e4riteht\u00e4vi\u00e4 esikouluun (3\u20134v). Tunnista v\u00e4rej\u00e4, v\u00e4rit\u00e4 kuvia, yhdist\u00e4 v\u00e4rivarjoja ja lajittele s\u00e4vyj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu v\u00e4rien tunnistaminen ty\u00f6lehdet perusv\u00e4rit sekoitus 3-4v, v\u00e4rien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka v\u00e4ritunnistus esikoulu tulostettava, v\u00e4rivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, v\u00e4rien lajittelu ty\u00f6lehdet s\u00e4vyt vertailu j\u00e4rjest\u00e4minen esikoulu, v\u00e4rikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'V\u00e4riteht\u00e4v\u00e4t Esiopetukseen \u2014 Sekoita ja Opi | LCS',
      seoDescription: 'Tulostettavia v\u00e4riteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Opettele v\u00e4rien sekoittamista, laske v\u00e4rikk\u00e4it\u00e4 esineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus v\u00e4rien sekoittaminen ty\u00f6lehdet p\u00e4\u00e4- ja v\u00e4liv\u00e4rit 5-6v, v\u00e4rikk\u00e4iden esineiden laskeminen ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, v\u00e4ri sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, v\u00e4rikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, v\u00e4rien poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'V\u00e4riteht\u00e4v\u00e4t 1. Luokalle \u2014 Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia v\u00e4riteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise v\u00e4rilaskuja, opettele v\u00e4risanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka v\u00e4rien yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, v\u00e4riristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, v\u00e4ri sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, v\u00e4rilukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, v\u00e4rien luokittelu ty\u00f6lehdet l\u00e4mpim\u00e4t kylm\u00e4t s\u00e4vyt 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'V\u00e4riteht\u00e4v\u00e4t 2. Luokalle \u2014 V\u00e4rioppi ja Taide | LCS',
      seoDescription: 'Tulostettavia v\u00e4riteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki v\u00e4rioppia, analysoi v\u00e4ritilastoja ja kirjoita v\u00e4rikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka v\u00e4rioppi ty\u00f6lehdet v\u00e4riympyr\u00e4 komplementtiv\u00e4rit 7-8v, v\u00e4ritilastot taulukkotyölehdet data-analyysi pylv\u00e4sdiagrammit 2. luokka tulostettava, v\u00e4rikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, v\u00e4rien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, v\u00e4rien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'V\u00e4riteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Luovuus | LCS',
      seoDescription: 'Tulostettavia v\u00e4riteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita v\u00e4ritutkimuksia, analysoi taideteoksia ja ratkaise v\u00e4ripulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka v\u00e4ritutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, taideteosten v\u00e4rianalyysi ty\u00f6lehdet kuvataide arviointi 3. luokka tulostettava, v\u00e4rien vaikutus ty\u00f6lehdet tunteet symboliikka kulttuuri 3. luokka, v\u00e4ri kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet monivaiheinen ongelmanratkaisu 3. luokka, luova v\u00e4risuunnittelu ty\u00f6lehdet sommittelu harmonia 3. luokka harjoitukset',
    },
  },
  construction: {
    preschool: {
      seoTitle: 'Rakennusteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia rakennusteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske ty\u00f6kaluja, v\u00e4rit\u00e4 ty\u00f6koneita ja yhdist\u00e4 rakennusvarjoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu rakennus laskeminen ty\u00f6lehdet ty\u00f6kalut ty\u00f6koneet 3-4v, rakennusten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, rakennusvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, ty\u00f6kalujen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, rakennuskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Rakennusteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Rakenna | LCS',
      seoDescription: 'Tulostettavia rakennusteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele rakennussanastoa, laske materiaaleja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus rakennussanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, rakennusmateriaalien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, rakennus sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, rakennuskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, rakennus poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Rakennusteht\u00e4v\u00e4t 1. Luokalle \u2014 Ty\u00f6kalut ja Laskut | LCS',
      seoDescription: 'Tulostettavia rakennusteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise rakennuslaskuja, opettele ty\u00f6kalusanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka rakennus yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, rakennusristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, rakennus sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, rakennusfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, ty\u00f6kalujen luokittelu ty\u00f6lehdet k\u00e4ytt\u00f6tarkoitus materiaalit 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Rakennusteht\u00e4v\u00e4t 2. Luokalle \u2014 Mittaus ja Suunnittelu | LCS',
      seoDescription: 'Tulostettavia rakennusteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Mittaa rakenteita, analysoi materiaalitilastoja ja kirjoita kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka rakentamisen mittaaminen ty\u00f6lehdet pituus leveys korkeus 7-8v, materiaalitilastot taulukkotyölehdet data-analyysi rakentaminen 2. luokka tulostettava, rakennuskuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, rakennuksen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet materiaalit ryhm\u00e4t 2. luokka, rakennusten vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Rakennusteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Tekniikka | LCS',
      seoDescription: 'Tulostettavia rakennusteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita rakennustutkimuksia, suunnittele rakenteita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka rakennustutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, rakenteiden suunnittelu ty\u00f6lehdet geometria mittakaava 3. luokka tulostettava, rakennusmateriaalit ty\u00f6lehdet ominaisuudet kest\u00e4vyys 3. luokka, rakennus monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, arkkitehtuuri ty\u00f6lehdet kuuluisat rakennukset historia 3. luokka harjoitukset',
    },
  },
  cooking: {
    preschool: {
      seoTitle: 'Ruoanlaittoteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia ruoanlaittoteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske ruokia, v\u00e4rit\u00e4 ainesosia ja yhdist\u00e4 keitti\u00f6varjoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu ruoanlaitto laskeminen ty\u00f6lehdet ruoat ainekset 3-4v, keitti\u00f6 v\u00e4rityssivut ty\u00f6lehdet hedelm\u00e4t vihannekset esikoulu tulostettava, keitti\u00f6varjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, ruokien lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, ruokakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Ruoanlaittoteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Kokkaa | LCS',
      seoDescription: 'Tulostettavia ruoanlaittoteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele ruokasanastoa, laske ainesosia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus ruokasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, ainesosien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, ruoka sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, ruokakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, ruoka poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Ruoanlaittoteht\u00e4v\u00e4t 1. Luokalle \u2014 Reseptit ja Laskut | LCS',
      seoDescription: 'Tulostettavia ruoanlaittoteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise keitti\u00f6laskuja, opettele ruokasanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka ruoanlaitto yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, ruokaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, ruoka sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, reseptien lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, ruokien luokittelu ty\u00f6lehdet ruokaryhmät ravinto 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Ruoanlaittoteht\u00e4v\u00e4t 2. Luokalle \u2014 Ravinto ja Mittaus | LCS',
      seoDescription: 'Tulostettavia ruoanlaittoteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Mittaa ainesosia, analysoi ravintotilastoja ja kirjoita reseptikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka ravinto mittaaminen ty\u00f6lehdet desilitrat gramma keitti\u00f6 7-8v, ravintotilastot taulukkotyölehdet data-analyysi ruokaryhmät 2. luokka tulostettava, reseptikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet ohjeet vaiheet 2. luokka, ruoanlaiton kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet annokset ryhm\u00e4t 2. luokka, ruokien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Ruoanlaittoteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Reseptit | LCS',
      seoDescription: 'Tulostettavia ruoanlaittoteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita ruokatutkimuksia, suunnittele aterioita ja ratkaise budjettipulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka ruokatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ateriasuunnittelu ty\u00f6lehdet ravintopyramidi terveellisyys 3. luokka tulostettava, ruokabudjetti laskuteht\u00e4v\u00e4t ty\u00f6lehdet rahanlasku ongelmanratkaisu 3. luokka, reseptikirjoitus ty\u00f6lehdet ohjeet mittayksik\u00f6t 3. luokka, ruokakulttuuri ty\u00f6lehdet perinteet eri maat maailma 3. luokka harjoitukset',
    },
  },
  dinosaurs: {
    preschool: {
      seoTitle: 'Dinosaurusteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia dinosaurusteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske dinosauruksia, v\u00e4rit\u00e4 liskoja ja yhdist\u00e4 varjoja. Ilmaisia ty\u00f6lehti\u00e4 lapsille.',
      seoKeywords: 'esikoulu dinosaurus laskeminen ty\u00f6lehdet t-rex triceratops 3-4v, dinosaurusten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, dinosaurusvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, dinosaurusten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, dinosauruskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Dinosaurusteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia dinosaurusteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele dinosaurussanastoa, laske lajeja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus dinosaurussanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, dinosaurusten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, dinosaurus sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, dinosauruskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, dinosaurus poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Dinosaurusteht\u00e4v\u00e4t 1. Luokalle \u2014 Lajit ja Laskut | LCS',
      seoDescription: 'Tulostettavia dinosaurusteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise dinosauruslaskuja, opettele lajisanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka dinosaurus yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, dinosaurusristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, dinosaurus sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, dinosaurusfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, dinosaurusten luokittelu ty\u00f6lehdet kasvinsyöjät lihansyöjät 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Dinosaurusteht\u00e4v\u00e4t 2. Luokalle \u2014 Fossiilit ja Data | LCS',
      seoDescription: 'Tulostettavia dinosaurusteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki fossiilejä, analysoi kokovertailuja ja kirjoita dinosauruskuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka fossiilit ty\u00f6lehdet kaivaukset l\u00f6yd\u00f6t dinosaurukset 7-8v, dinosaurustilastot taulukkotyölehdet data-analyysi kokoluokat 2. luokka tulostettava, dinosauruskuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, dinosaurusten kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, dinosaurusten vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Dinosaurusteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Paleontologia | LCS',
      seoDescription: 'Tulostettavia dinosaurusteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita dinosaurustutkimuksia, analysoi aikaj\u00e4noja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka dinosaurustutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, paleontologia ty\u00f6lehdet fossiilit kaivaukset aikakausi 3. luokka tulostettava, dinosaurusten sukupuutto ty\u00f6lehdet luonnonhistoria evoluutio 3. luokka, dinosaurus monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, dinosaurusten aikajana ty\u00f6lehdet geologiset kaudet historia 3. luokka harjoitukset',
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
