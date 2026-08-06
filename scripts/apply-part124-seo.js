#!/usr/bin/env node
/**
 * Part 124: Finnish Theme+Grade SEO — Themes 37–40 (shapes, space, sports, spring)
 * Adds seoTitle, seoDescription, seoKeywords to gradeContent entries.
 */
const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  'shapes': {
    'preschool': {
      seoTitle: 'Muototeht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia muototeht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske muotoja, v\u00e4rit\u00e4 geometrisia kuvioita, yhdist\u00e4 muotovarjoja ja lajittele kappaleita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu muodot laskeminen ty\u00f6lehdet ympyr\u00e4 neli\u00f6 kolmio 3-4v, muotojen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, muotovarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, muotojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, muotokuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Muototeht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Rakenna | LCS',
      seoDescription: 'Tulostettavia muototeht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele muotosanastoa, laske sivuja ja kulmia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus muotosanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, muotojen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, muoto sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, muotokuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, muoto poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Muototeht\u00e4v\u00e4t 1. Luokalle \u2014 Geometria ja Laskut | LCS',
      seoDescription: 'Tulostettavia muototeht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise muotolaskuja, opettele geometriasanastoa ja t\u00e4yt\u00e4 ristikk\u00f6j\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka muodot yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, muotoristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, muoto sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, muotofaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, muotojen luokittelu ty\u00f6lehdet sivut kulmat symmetria 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Muototeht\u00e4v\u00e4t 2. Luokalle \u2014 Symmetria ja Tilastot | LCS',
      seoDescription: 'Tulostettavia muototeht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki symmetriaa, analysoi muototilastoja ja kirjoita geometriakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka symmetria muodot ty\u00f6lehdet peilikuvat k\u00e4\u00e4nn\u00f6kset siirrot 7-8v, muototilastot taulukkotyölehdet data-analyysi sivut kulmat 2. luokka tulostettava, geometriakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ominaisuudet 2. luokka, muotojen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kolmiulotteiset muodot ty\u00f6lehdet kuutio pallo lieri\u00f6 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Muototeht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Piiri | LCS',
      seoDescription: 'Tulostettavia muototeht\u00e4vi\u00e4 3. luokalle (8\u20139v). Laske piirej\u00e4 ja pinta-aloja, tutki monikulmioita ja ratkaise geometriapulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka piiri ja pinta-ala ty\u00f6lehdet mittaaminen laskeminen 8-9v, monikulmiot ty\u00f6lehdet viisikulmio kuusikulmio s\u00e4\u00e4nn\u00f6lliset 3. luokka tulostettava, geometrian k\u00e4sitteet ty\u00f6lehdet yhdensuuntaiset kohtisuorat 3. luokka, muoto monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, koordinaatisto ty\u00f6lehdet pisteet kuviot sijainti 3. luokka harjoitukset',
    },
  },
  'space': {
    'preschool': {
      seoTitle: 'Avaruusteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia avaruusteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske t\u00e4hti\u00e4, v\u00e4rit\u00e4 raketteja, yhdist\u00e4 avaruusvarjoja ja lajittele planeettoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu avaruus laskeminen ty\u00f6lehdet t\u00e4hdet planeetat raketit 3-4v, avaruuden v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, avaruusvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, planeettojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, avaruuskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Avaruusteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia avaruusteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele avaruussanastoa, laske planeettoja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus avaruussanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, avaruuden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, avaruus sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, avaruuskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, avaruus poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Avaruusteht\u00e4v\u00e4t 1. Luokalle \u2014 Planeetat ja Laskut | LCS',
      seoDescription: 'Tulostettavia avaruusteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise avaruuslaskuja, opettele avaruussanastoa ja t\u00e4yt\u00e4 ristikk\u00f6j\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka avaruus yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, avaruusristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, avaruus sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, avaruusfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, planeettojen luokittelu ty\u00f6lehdet koko et\u00e4isyys 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Avaruusteht\u00e4v\u00e4t 2. Luokalle \u2014 Aurinkokunta ja Tilastot | LCS',
      seoDescription: 'Tulostettavia avaruusteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki aurinkokuntaa, analysoi tilastoja ja kirjoita avaruuskuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka aurinkokunta ty\u00f6lehdet planeetat kuut et\u00e4isyydet 7-8v, avaruustilastot taulukkotyölehdet data-analyysi koko l\u00e4mp\u00f6tila 2. luokka tulostettava, avaruuskuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit planeetat 2. luokka, avaruuden kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, planeettatyyppien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Avaruusteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja T\u00e4htitiede | LCS',
      seoDescription: 'Tulostettavia avaruusteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita avaruustutkimuksia, tutki t\u00e4hti\u00e4 ja ratkaise avaruuspulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka avaruustutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, t\u00e4htitiede ty\u00f6lehdet t\u00e4htikuviot galaksit universumi 3. luokka tulostettava, avaruuslentojen historia ty\u00f6lehdet astronautit kuulento 3. luokka, avaruus monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, Maan ja Kuun ty\u00f6lehdet vuorovesi pimennykset kiertorata 3. luokka harjoitukset',
    },
  },
  'sports': {
    'preschool': {
      seoTitle: 'Urheiluteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia urheiluteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske palloja, v\u00e4rit\u00e4 urheilijoita, yhdist\u00e4 urheiluvarjoja ja lajittele v\u00e4lineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu urheilu laskeminen ty\u00f6lehdet pallot v\u00e4lineet 3-4v, urheilun v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, urheiluvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, urheiluv\u00e4lineiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, urheilukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Urheiluteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Liiku | LCS',
      seoDescription: 'Tulostettavia urheiluteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele urheilusanastoa, laske pisteit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus urheilusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, urheilun yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, urheilu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, urheilukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, urheilu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Urheiluteht\u00e4v\u00e4t 1. Luokalle \u2014 Lajit ja Laskut | LCS',
      seoDescription: 'Tulostettavia urheiluteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise urheilulaskuja, opettele urheilusanastoa ja t\u00e4yt\u00e4 ristikk\u00f6j\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka urheilu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, urheiluristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, urheilu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, urheilufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, urheilulajien luokittelu ty\u00f6lehdet joukkue yksil\u00f6 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Urheiluteht\u00e4v\u00e4t 2. Luokalle \u2014 Tulokset ja Tilastot | LCS',
      seoDescription: 'Tulostettavia urheiluteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki urheilutuloksia, analysoi tilastoja ja kirjoita lajikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka urheilutulokset ty\u00f6lehdet pisteet ajat enn\u00e4tykset 7-8v, urheilutilastot taulukkotyölehdet data-analyysi lajit pelaajat 2. luokka tulostettava, urheilukuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit liikkeet 2. luokka, urheilun kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, urheilulajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Urheiluteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Olympialaiset | LCS',
      seoDescription: 'Tulostettavia urheiluteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita urheilututkimuksia, tutki olympialaisia ja ratkaise tilastopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka urheilututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, olympialaiset ty\u00f6lehdet historia lajit maat mitalit 3. luokka tulostettava, urheilun s\u00e4\u00e4nn\u00f6t ty\u00f6lehdet reiluus joukkuehenki strategia 3. luokka, urheilu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, suomalainen urheilu ty\u00f6lehdet hiihtolajit yleisurheilu j\u00e4\u00e4kiekko 3. luokka harjoitukset',
    },
  },
  'spring': {
    'preschool': {
      seoTitle: 'Kev\u00e4tteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kev\u00e4tteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kukkia, v\u00e4rit\u00e4 perhosia, yhdist\u00e4 kev\u00e4tvarjoja ja lajittele luontoaiheita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kev\u00e4t laskeminen ty\u00f6lehdet kukat perhoset 3-4v, kev\u00e4\u00e4n v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kev\u00e4tvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kev\u00e4taiheiden lajittelu ty\u00f6lehdet kasvu s\u00e4\u00e4 vertailu esikoulu, kev\u00e4tkuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    'kindergarten': {
      seoTitle: 'Kev\u00e4tteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia kev\u00e4tteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele kev\u00e4tsanastoa, laske kukkia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kev\u00e4tsanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kev\u00e4\u00e4n yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, kev\u00e4t sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kev\u00e4tkuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, kev\u00e4t poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kev\u00e4tteht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia kev\u00e4tteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise kev\u00e4\u00e4laskuja, opettele kev\u00e4tsanastoa ja t\u00e4yt\u00e4 ristikk\u00f6j\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka kev\u00e4t yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kev\u00e4tristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kev\u00e4t sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kev\u00e4tfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kev\u00e4taiheiden luokittelu ty\u00f6lehdet kukat hy\u00f6nteiset s\u00e4\u00e4 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kev\u00e4tteht\u00e4v\u00e4t 2. Luokalle \u2014 Kasvu ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kev\u00e4tteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki kev\u00e4\u00e4n muutoksia, analysoi tilastoja ja kirjoita luontokuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kev\u00e4\u00e4n muutokset ty\u00f6lehdet kasvu kukinta muuttolinnut 7-8v, kev\u00e4\u00e4tilastot taulukkotyölehdet data-analyysi l\u00e4mp\u00f6tila p\u00e4iv\u00e4npituus 2. luokka tulostettava, kev\u00e4tkuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit luontomuutokset 2. luokka, kev\u00e4\u00e4n kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kev\u00e4tilmi\u00f6iden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kev\u00e4tteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ekologia | LCS',
      seoDescription: 'Tulostettavia kev\u00e4tteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita kev\u00e4ttutkimuksia, tutki luonnon her\u00e4\u00e4mist\u00e4 ja ratkaise ekologiapulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka kev\u00e4ttutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kev\u00e4\u00e4n ekologia ty\u00f6lehdet p\u00f6lytys siemenet it\u00e4minen 3. luokka tulostettava, Suomen kev\u00e4t ty\u00f6lehdet j\u00e4idenl\u00e4ht\u00f6 muuttolinnut fenologia 3. luokka, kev\u00e4t monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, kev\u00e4tseuranta ty\u00f6lehdet luontop\u00e4iv\u00e4kirja havainnointi mittaus 3. luokka harjoitukset',
    },
  },
};

const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

function processFile(theme) {
  const filePath = path.join(THEMES_DIR, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const result = [];

  let inGradeContent = false;
  let currentGrade = null;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect gradeContent block
    if (line.includes('gradeContent:') && line.includes('{')) {
      inGradeContent = true;
    }

    if (inGradeContent) {
      // Detect grade key
      for (const grade of GRADES) {
        if (line.includes(`'${grade}'`) && line.includes('{')) {
          currentGrade = grade;
          break;
        }
      }

      // Detect intro: line — insert SEO fields before it
      if (currentGrade && line.match(/^\s+intro:\s*'/)) {
        // Check if previous line already has seoKeywords (guard against double-insertion)
        const prevLine = result[result.length - 1] || '';
        if (prevLine.includes('seoKeywords:')) {
          console.log(`  SKIP ${theme}/${currentGrade} — already has SEO fields`);
        } else {
          const data = seoData[theme][currentGrade];
          if (data) {
            const indent = line.match(/^(\s*)/)[1];
            result.push(`${indent}seoTitle: '${data.seoTitle}',`);
            result.push(`${indent}seoDescription: '${data.seoDescription}',`);
            result.push(`${indent}seoKeywords: '${data.seoKeywords}',`);
            console.log(`  ADD ${theme}/${currentGrade}`);
          }
        }
        currentGrade = null; // Reset after inserting
      }
    }

    result.push(line);
  }

  fs.writeFileSync(filePath, result.join('\n'), 'utf8');
  console.log(`  Written: ${filePath}`);
}

console.log('Part 124: Finnish Theme+Grade SEO — shapes, space, sports, spring\n');

for (const theme of Object.keys(seoData)) {
  console.log(`Processing ${theme}/fi.ts:`);
  processFile(theme);
  console.log();
}

console.log('Done! Run scripts/verify-part124.js to validate.');
