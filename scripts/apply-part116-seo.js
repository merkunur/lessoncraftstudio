/**
 * Part 116: Finnish Theme+Grade SEO — Themes 5–8
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for body, camping, circus, clothing Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  body: {
    preschool: {
      seoTitle: 'Kehoteht\u00e4v\u00e4t Esikouluun \u2014 Nime\u00e4 ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kehoteht\u00e4vi\u00e4 esikouluun (3\u20134v). Nime\u00e4 kehonosia, v\u00e4rit\u00e4 hahmoja, yhdist\u00e4 varjoja ja lajittele kokoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kehonosien nime\u00e4minen ty\u00f6lehdet kasvot k\u00e4det jalat 3-4v, kehon v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kehovarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kehonosien lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, kehonosien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kehoteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Piirr\u00e4 | LCS',
      seoDescription: 'Tulostettavia kehoteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Opettele kehonosanastoa, piirr\u00e4 kehon osia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kehosanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kehon piirt\u00e4minen ty\u00f6lehdet ohjeiden seuraaminen esiopetus tulostettava, kehon sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kehonosien laskeminen ty\u00f6lehdet kuvamatematiikka esiopetus, kehon poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kehoteht\u00e4v\u00e4t 1. Luokalle \u2014 Aistit ja Sanat | LCS',
      seoDescription: 'Tulostettavia kehoteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Opettele aisteista, t\u00e4yt\u00e4 kehoristikkoja ja kirjoita kehonosista. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka aistit ty\u00f6lehdet n\u00e4k\u00f6 kuulo haju maku tunto 6-7v, kehoristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kehon sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kehonosien lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kehon luokittelu ty\u00f6lehdet luut lihakset elimet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kehoteht\u00e4v\u00e4t 2. Luokalle \u2014 Elimist\u00f6 ja Terveys | LCS',
      seoDescription: 'Tulostettavia kehoteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki elimist\u00f6n toimintaa, analysoi ravintoa ja kirjoita terveyskuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka elimist\u00f6 ty\u00f6lehdet syd\u00e4n keuhkot lihakset 7-8v, ravinto terveys ty\u00f6lehdet ruokaryhmät vitamiinit 2. luokka tulostettava, kehon toiminta kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet kuvaus 2. luokka, kehon mittaaminen ty\u00f6lehdet pituus paino data-analyysi 2. luokka, kehon vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kehoteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Anatomia | LCS',
      seoDescription: 'Tulostettavia kehoteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita tutkimuksia elimist\u00f6st\u00e4, analysoi ruuansulatusta ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka ihmiskehon tutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ruuansulatusj\u00e4rjestelm\u00e4 ty\u00f6lehdet elimet toiminta 3. luokka tulostettava, luusto lihaksisto ty\u00f6lehdet anatomia nime\u00e4minen 3. luokka, kehon kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet monivaiheinen ongelmanratkaisu 3. luokka, terveyskasvatus ty\u00f6lehdet hygienia ravinto liikunta 3. luokka harjoitukset',
    },
  },
  camping: {
    preschool: {
      seoTitle: 'Retkeilyteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia retkeilyteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske telttoja, v\u00e4rit\u00e4 nuotioita ja yhdist\u00e4 retkeilyvarusteiden varjoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu retkeily laskeminen ty\u00f6lehdet teltat nuotiot 3-4v, retkeily v\u00e4rityssivut ty\u00f6lehdet luontokuvat hienomotoriikka esikoulu tulostettava, retkeilyvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, retkeilyvarusteiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, retkeilykuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Retkeilyteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia retkeilyteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele retkeilysanastoa, laske varusteita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus retkeilysanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, retkeilyvarusteiden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, retkeily sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, retkeilykuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, retkeily poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Retkeilyteht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia retkeilyteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise luontolaskuja, opettele retkeilysanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka retkeily yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet luontolaskut 6-7v, retkeilyristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, retkeily sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, retkeilyfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, retkeilyvarusteiden luokittelu ty\u00f6lehdet k\u00e4ytt\u00f6tarkoitus 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Retkeilyteht\u00e4v\u00e4t 2. Luokalle \u2014 Kartat ja Luonto | LCS',
      seoDescription: 'Tulostettavia retkeilyteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Lue karttoja, analysoi s\u00e4\u00e4tilastoja ja kirjoita retkikertomuksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kartan lukeminen ty\u00f6lehdet kompassi ilmansuunnat retkeily 7-8v, s\u00e4\u00e4tilastot taulukkotyölehdet data-analyysi retkeily 2. luokka tulostettava, retkikertomus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet kuvaus adjektiivit 2. luokka, retkeilyn kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet varusteet ryhm\u00e4t 2. luokka, luonnon vertailu ty\u00f6lehdet elinymp\u00e4rist\u00f6t ekosysteemit 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Retkeilyteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Selviytyminen | LCS',
      seoDescription: 'Tulostettavia retkeilyteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita luontotutkimuksia, ratkaise suunnistuspulmia ja analysoi reittej\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka luontotutkimus ty\u00f6lehdet raporttikirjoitus retkeily 8-9v, suunnistus karttateht\u00e4v\u00e4t ty\u00f6lehdet koordinaatit mittakaava 3. luokka tulostettava, selviytymistaidot ty\u00f6lehdet ensiapu turvallisuus luonto 3. luokka, retkeily monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, ymp\u00e4rist\u00f6kasvatus ty\u00f6lehdet j\u00e4t\u00e4 ei j\u00e4lke\u00e4 luonnonsuojelu 3. luokka harjoitukset',
    },
  },
  circus: {
    preschool: {
      seoTitle: 'Sirkusteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia sirkusteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske pellej\u00e4, v\u00e4rit\u00e4 sirkusel\u00e4imi\u00e4 ja yhdist\u00e4 varjoja. Ilmaisia ty\u00f6lehti\u00e4 lapsille.',
      seoKeywords: 'esikoulu sirkus laskeminen ty\u00f6lehdet pellet akrobaatit 3-4v, sirkus v\u00e4rityssivut ty\u00f6lehdet el\u00e4imet teltta hienomotoriikka esikoulu tulostettava, sirkusvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, sirkushahmojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, sirkuskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Sirkusteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia sirkusteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele sirkussanastoa, laske esineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus sirkussanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, sirkusesineiden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, sirkus sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, sirkuskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, sirkus poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Sirkusteht\u00e4v\u00e4t 1. Luokalle \u2014 Matematiikka ja Sanat | LCS',
      seoDescription: 'Tulostettavia sirkusteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise sirkuslaskuja, opettele sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka sirkus yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, sirkusristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, sirkus sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, sirkusfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, sirkusesitysten luokittelu ty\u00f6lehdet taikurit akrobaatit 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Sirkusteht\u00e4v\u00e4t 2. Luokalle \u2014 Esitykset ja Tarinat | LCS',
      seoDescription: 'Tulostettavia sirkusteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Kirjoita sirkuskuvauksia, ratkaise sanateht\u00e4vi\u00e4 ja analysoi esitystilastoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka sirkus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet kuvaus adjektiivit 7-8v, sirkus sanateht\u00e4v\u00e4t ty\u00f6lehdet oikeinkirjoitus sanasto 2. luokka tulostettava, sirkustilastot taulukkotyölehdet data-analyysi pylv\u00e4sdiagrammit 2. luokka, sirkus kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, sirkusesitysten vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Sirkusteht\u00e4v\u00e4t 3. Luokalle \u2014 Pulmia ja Historia | LCS',
      seoDescription: 'Tulostettavia sirkusteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Ratkaise haastavia pulmia, kirjoita sirkushistoriasta ja analysoi budjetteja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka sirkus pulmateht\u00e4v\u00e4t ty\u00f6lehdet looginen p\u00e4\u00e4ttely haastava 8-9v, sirkushistoria tutkimusteht\u00e4v\u00e4t ty\u00f6lehdet perinteet kulttuurit 3. luokka tulostettava, sirkusbudjetti laskuteht\u00e4v\u00e4t ty\u00f6lehdet rahanlasku ongelmanratkaisu 3. luokka, sirkus ristikko ty\u00f6lehdet pitk\u00e4t sanat tavutus 3. luokka, sirkustaide ty\u00f6lehdet luova kirjoittaminen kerronta 3. luokka harjoitukset',
    },
  },
  clothing: {
    preschool: {
      seoTitle: 'Vaateteht\u00e4v\u00e4t Esikouluun \u2014 Lajittele ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia vaateteht\u00e4vi\u00e4 esikouluun (3\u20134v). Lajittele vaatteita, v\u00e4rit\u00e4 asuja, yhdist\u00e4 varjoja ja laske kappaleita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu vaatteiden lajittelu ty\u00f6lehdet vuodenaika s\u00e4\u00e4 3-4v, vaatteiden v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka v\u00e4ritunnistus esikoulu tulostettava, vaatevarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen hahmottaminen esikoulu, vaatteiden lajittelu koon mukaan ty\u00f6lehdet vertailu j\u00e4rjest\u00e4minen esikoulu, vaatekuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Vaateteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Pukeudu | LCS',
      seoDescription: 'Tulostettavia vaateteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Opettele vaatesanastoa, laske vaatekappaleita ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus vaatesanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, vaatteiden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, vaate sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, vaatekuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, vaatteiden poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Vaateteht\u00e4v\u00e4t 1. Luokalle \u2014 Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia vaateteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise vaatelaskuja, opettele vaatesanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka vaatteiden yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, vaateristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, vaate sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, vaatelukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, vaatteiden luokittelu ty\u00f6lehdet vuodenaika materiaali 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Vaateteht\u00e4v\u00e4t 2. Luokalle \u2014 Materiaalit ja Muoti | LCS',
      seoDescription: 'Tulostettavia vaateteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kangasmateriaaleja, analysoi muotitilastoja ja kirjoita vaatekuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kangasmateriaalit ty\u00f6lehdet puuvilla villa silkki 7-8v, muotitilastot taulukkotyölehdet data-analyysi pylv\u00e4sdiagrammit 2. luokka tulostettava, vaatekuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, vaatteiden kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet hinnat ryhm\u00e4t 2. luokka, vaatteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Vaateteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Suunnittelu | LCS',
      seoDescription: 'Tulostettavia vaateteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita muotitutkimuksia, suunnittele asuja ja ratkaise budjettipulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka muotitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, vaatesuunnittelu ty\u00f6lehdet luovuus materiaalit v\u00e4rit 3. luokka tulostettava, vaatebudjetti laskuteht\u00e4v\u00e4t ty\u00f6lehdet rahanlasku ongelmanratkaisu 3. luokka, vaate ristikko ty\u00f6lehdet pitk\u00e4t sanat tavutus 3. luokka, vaatehistoria ty\u00f6lehdet perinteet kulttuurit eri maat 3. luokka harjoitukset',
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
