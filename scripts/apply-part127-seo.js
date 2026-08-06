#!/usr/bin/env node
/**
 * Part 127: Finnish Theme+Grade SEO — Themes 49–50 (FINAL BATCH)
 * xmas, zoo
 * Adds seoTitle, seoDescription, seoKeywords to gradeContent entries
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  'xmas/fi.ts': {
    'preschool': {
      seoTitle: 'Jouluteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia jouluteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske joulukoristeita, v\u00e4rit\u00e4 kuusia, yhdist\u00e4 jouluvarjoja ja lajittele lahjoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu joulu laskeminen ty\u00f6lehdet joulukuusi koristeet lahjat 3-4v, joulun v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, jouluvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, jouluesineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, joulukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Jouluteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Askaroi | LCS',
      seoDescription: 'Tulostettavia jouluteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele joulusanastoa, laske jouluesineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus joulusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, joulun yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, joulu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, joulukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, joulu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Jouluteht\u00e4v\u00e4t 1. Luokalle \u2014 Perinteet ja Laskut | LCS',
      seoDescription: 'Tulostettavia jouluteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise joulumatematiikkaa, opettele joulusanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka joulu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, jouluristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, joulu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, joulufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, joulukoristeiden luokittelu ty\u00f6lehdet muoto v\u00e4ri materiaali 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Jouluteht\u00e4v\u00e4t 2. Luokalle \u2014 Kulttuuri ja Tilastot | LCS',
      seoDescription: 'Tulostettavia jouluteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki jouluperinteit\u00e4, analysoi tilastoja ja kirjoita joulukuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka jouluperinteet ty\u00f6lehdet kulttuurit tavat maailma 7-8v, joulutilastot taulukkotyölehdet data-analyysi lahjatoiveet suosikit 2. luokka tulostettava, joulukuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit tunnelmat 2. luokka, joulun kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, joulutraditioiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Jouluteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Perinteet | LCS',
      seoDescription: 'Tulostettavia jouluteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita joulututkimuksia, tutki perinteit\u00e4 ja ratkaise jouluaiheisia pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka joulututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, maailman jouluperinteet ty\u00f6lehdet kulttuurivertailu tavat 3. luokka tulostettava, jouluaskartelun ohjeet ty\u00f6lehdet selitt\u00e4v\u00e4 kirjoittaminen prosessi 3. luokka, joulu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen joulutraditiot ty\u00f6lehdet joulupukki sauna jouluruoat 3. luokka harjoitukset',
    },
  },
  'zoo/fi.ts': {
    'preschool': {
      seoTitle: 'El\u00e4intarhateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia el\u00e4intarhateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske leijonia, v\u00e4rit\u00e4 norsuja, yhdist\u00e4 el\u00e4invarjoja ja lajittele el\u00e4intarhael\u00e4imi\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu el\u00e4intarha laskeminen ty\u00f6lehdet leijonat norsut apinat 3-4v, el\u00e4intarhan v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, el\u00e4invarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, el\u00e4intarhael\u00e4inten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, el\u00e4intarhakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'El\u00e4intarhateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia el\u00e4intarhateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele el\u00e4insanastoa, laske el\u00e4intarhael\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus el\u00e4insanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, el\u00e4intarhan yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, el\u00e4intarha sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, el\u00e4intarhakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, el\u00e4intarha poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'El\u00e4intarhateht\u00e4v\u00e4t 1. Luokalle \u2014 El\u00e4imet ja Laskut | LCS',
      seoDescription: 'Tulostettavia el\u00e4intarhateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise el\u00e4inlaskuja, opettele el\u00e4insanastoa ja t\u00e4yt\u00e4 ristikkoj\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka el\u00e4intarha yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, el\u00e4inristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, el\u00e4intarha sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, el\u00e4infaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, el\u00e4intarhael\u00e4inten luokittelu ty\u00f6lehdet nis\u00e4kk\u00e4\u00e4t linnut matelijat 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'El\u00e4intarhateht\u00e4v\u00e4t 2. Luokalle \u2014 Luonto ja Tilastot | LCS',
      seoDescription: 'Tulostettavia el\u00e4intarhateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki el\u00e4inten elinymp\u00e4rist\u00f6j\u00e4, analysoi tilastoja ja kirjoita el\u00e4inkuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka el\u00e4inten elinymp\u00e4rist\u00f6t ty\u00f6lehdet savanni viidakko arktinen 7-8v, el\u00e4intarhatilastot taulukkotyölehdet data-analyysi el\u00e4inm\u00e4\u00e4r\u00e4t lajit 2. luokka tulostettava, el\u00e4inkuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, el\u00e4intarhan kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, el\u00e4inlajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'El\u00e4intarhateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja El\u00e4intiede | LCS',
      seoDescription: 'Tulostettavia el\u00e4intarhateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita el\u00e4intutkimuksia, tutki ekosysteemej\u00e4 ja ratkaise luontopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka el\u00e4intutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, uhanalaiset el\u00e4imet ty\u00f6lehdet suojeluty\u00f6 elinymp\u00e4rist\u00f6t lajit 3. luokka tulostettava, el\u00e4intarhan teht\u00e4v\u00e4 ty\u00f6lehdet el\u00e4intenhoitaja p\u00e4iv\u00e4 ruokinta 3. luokka, el\u00e4intarha monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Suomen el\u00e4intarhat ty\u00f6lehdet Korkeasaari villiel\u00e4imet luonnonsuojelu 3. luokka harjoitukset',
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
          console.log(`  \u2713 ${relPath} \u2192 ${currentGrade}`);
        } else {
          console.log(`  \u2298 ${relPath} \u2192 ${currentGrade} (already has SEO)`);
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
