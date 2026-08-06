/**
 * Part 121: Finnish Theme+Grade SEO — Themes 25–28
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for household, insects, jobs, music Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  household: {
    preschool: {
      seoTitle: 'Kotitalousteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia kotitalousteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske kotiesineit\u00e4, v\u00e4rit\u00e4 astioita, yhdist\u00e4 kotitalousvarjoja ja lajittele tavaroita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu kotitalous laskeminen ty\u00f6lehdet astiat v\u00e4lineet 3-4v, kotiesineiden v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, kotitalousvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, kotiesineiden lajittelu ty\u00f6lehdet huoneen mukaan vertailu esikoulu, kotitalouskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Kotitalousteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja J\u00e4rjest\u00e4 | LCS',
      seoDescription: 'Tulostettavia kotitalousteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele kotisanastoa, laske esineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus kotitalous sanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, kotiesineiden yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, kotitalous sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, kotitalouskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, kotitalous poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Kotitalousteht\u00e4v\u00e4t 1. Luokalle \u2014 Kodin Sanat ja Laskut | LCS',
      seoDescription: 'Tulostettavia kotitalousteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise kotilaskuja, opettele kotisanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka kotitalous yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, kotitalousristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, kotitalous sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, kotifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, kotiesineiden luokittelu ty\u00f6lehdet keitti\u00f6 kylpyhuone 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Kotitalousteht\u00e4v\u00e4t 2. Luokalle \u2014 Mittaus ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kotitalousteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Mittaa kotiesineit\u00e4, analysoi tilastoja ja kirjoita kodinkuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka kotiesineiden mittaus ty\u00f6lehdet pituus paino tilavuus 7-8v, kotitaloustilastot taulukkotyölehdet data-analyysi v\u00e4lineet materiaalit 2. luokka tulostettava, kodinkuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit huoneet 2. luokka, kotitalouden kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, kotitalousv\u00e4lineiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Kotitalousteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Arjen Taidot | LCS',
      seoDescription: 'Tulostettavia kotitalousteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Tutki kodin toimintoja, laske budjetteja ja ratkaise arjen pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka kotitaloustutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kodin energiankulutus ty\u00f6lehdet s\u00e4hk\u00f6 vesi kierr\u00e4tys 3. luokka tulostettava, kodin budjetointi ty\u00f6lehdet rahat hinnat ostoslista 3. luokka, kotitalous monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, kodinhoito ty\u00f6lehdet siivous j\u00e4rjestely vastuullisuus 3. luokka harjoitukset',
    },
  },
  insects: {
    preschool: {
      seoTitle: 'Hy\u00f6nteisteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia hy\u00f6nteisteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske perhosia, v\u00e4rit\u00e4 lepp\u00e4kerttuja, yhdist\u00e4 hy\u00f6nteisvarjoja ja lajittele \u00f6t\u00f6k\u00f6it\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu hy\u00f6nteinen laskeminen ty\u00f6lehdet perhoset lepp\u00e4kertut 3-4v, hy\u00f6nteisten v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, hy\u00f6nteisvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, hy\u00f6nteisten lajittelu ty\u00f6lehdet v\u00e4rin mukaan vertailu esikoulu, hy\u00f6nteiskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Hy\u00f6nteisteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia hy\u00f6nteisteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele hy\u00f6nteissanastoa, laske \u00f6t\u00f6k\u00f6it\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus hy\u00f6nteissanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, hy\u00f6nteisten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, hy\u00f6nteinen sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, hy\u00f6nteiskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, hy\u00f6nteinen poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Hy\u00f6nteisteht\u00e4v\u00e4t 1. Luokalle \u2014 Luonto ja Laskut | LCS',
      seoDescription: 'Tulostettavia hy\u00f6nteisteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise hy\u00f6nteislaskuja, opettele \u00f6t\u00f6kk\u00e4sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka hy\u00f6nteinen yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, hy\u00f6nteisristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, hy\u00f6nteinen sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, hy\u00f6nteisfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, hy\u00f6nteisten luokittelu ty\u00f6lehdet jalat siivet tuntosarvet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Hy\u00f6nteisteht\u00e4v\u00e4t 2. Luokalle \u2014 Elinymp\u00e4rist\u00f6t ja Data | LCS',
      seoDescription: 'Tulostettavia hy\u00f6nteisteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki hy\u00f6nteisten elinymp\u00e4rist\u00f6j\u00e4, analysoi tilastoja ja kirjoita \u00f6t\u00f6kk\u00e4kuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka hy\u00f6nteisten elinymp\u00e4rist\u00f6t ty\u00f6lehdet niitty mets\u00e4 puutarha 7-8v, hy\u00f6nteistilastot taulukkotyölehdet data-analyysi lajit jalkojen m\u00e4\u00e4r\u00e4 2. luokka tulostettava, hy\u00f6nteiskuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit rakenne 2. luokka, hy\u00f6nteisten kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, hy\u00f6nteislajien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Hy\u00f6nteisteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Ekologia | LCS',
      seoDescription: 'Tulostettavia hy\u00f6nteisteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita hy\u00f6nteistutkimuksia, tutki ekosysteemej\u00e4 ja ratkaise luontopulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka hy\u00f6nteistutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, hy\u00f6nteisten ekosysteemi ty\u00f6lehdet p\u00f6lytt\u00e4j\u00e4t ravintoketju 3. luokka tulostettava, hy\u00f6nteisten elinkaari ty\u00f6lehdet toukka kotelo aikuinen 3. luokka, hy\u00f6nteinen monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, hy\u00f6nteisten suojelu ty\u00f6lehdet monimuotoisuus ymp\u00e4rist\u00f6 3. luokka harjoitukset',
    },
  },
  jobs: {
    preschool: {
      seoTitle: 'Ammattiteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia ammattiteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske ty\u00f6v\u00e4lineit\u00e4, v\u00e4rit\u00e4 ammatteja, yhdist\u00e4 ammattivarjoja ja lajittele v\u00e4lineit\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu ammatti laskeminen ty\u00f6lehdet palomies l\u00e4\u00e4k\u00e4ri 3-4v, ammattien v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, ammattivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, ammattien lajittelu ty\u00f6lehdet ty\u00f6paikan mukaan vertailu esikoulu, ammattikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Ammattiteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Tutki | LCS',
      seoDescription: 'Tulostettavia ammattiteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele ammattisanastoa, laske ty\u00f6v\u00e4lineit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus ammattisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, ammattien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, ammatti sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, ammattikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, ammatti poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Ammattiteht\u00e4v\u00e4t 1. Luokalle \u2014 Yhteiskunta ja Laskut | LCS',
      seoDescription: 'Tulostettavia ammattiteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise ammattilaskuja, opettele ammattisanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka ammatti yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, ammattiristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, ammatti sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, ammattifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, ammattien luokittelu ty\u00f6lehdet ty\u00f6paikat v\u00e4lineet 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Ammattiteht\u00e4v\u00e4t 2. Luokalle \u2014 Ty\u00f6el\u00e4m\u00e4 ja Tilastot | LCS',
      seoDescription: 'Tulostettavia ammattiteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki ammatteja, analysoi tilastoja ja kirjoita ammattikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka ammatit ty\u00f6el\u00e4m\u00e4 ty\u00f6lehdet ty\u00f6paikat teht\u00e4v\u00e4t 7-8v, ammattitilastot taulukkotyölehdet data-analyysi palvelut tuotteet 2. luokka tulostettava, ammattikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit ty\u00f6v\u00e4lineet 2. luokka, ammattien kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, ammattien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Ammattiteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Yhteiskunta | LCS',
      seoDescription: 'Tulostettavia ammattiteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita ammattitutkimuksia, vertaile ty\u00f6el\u00e4m\u00e4\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka ammattitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, yhteiskunnan ammatit ty\u00f6lehdet palvelut turvallisuus terveys 3. luokka tulostettava, yritt\u00e4jyys ty\u00f6lehdet tuotteet palvelut suunnittelu 3. luokka, ammatti monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, ammattien historia ty\u00f6lehdet perinteet nykyaika tulevaisuus 3. luokka harjoitukset',
    },
  },
  music: {
    preschool: {
      seoTitle: 'Musiikkiteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia musiikkiteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske soittimia, v\u00e4rit\u00e4 nuotteja, yhdist\u00e4 musiikkivarjoja ja lajittele \u00e4\u00e4ni\u00e4. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu musiikki laskeminen ty\u00f6lehdet soittimet nuotit 3-4v, musiikin v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, musiikkivarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, soitinten lajittelu ty\u00f6lehdet \u00e4\u00e4nen mukaan vertailu esikoulu, musiikkikuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Musiikkiteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Soita | LCS',
      seoDescription: 'Tulostettavia musiikkiteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele musiikkisanastoa, laske soittimia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus musiikkisanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, musiikin yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, musiikki sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, musiikkikuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, musiikki poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Musiikkiteht\u00e4v\u00e4t 1. Luokalle \u2014 Soittimet ja Laskut | LCS',
      seoDescription: 'Tulostettavia musiikkiteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise musiikkilaskuja, opettele soitinsanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka musiikki yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, musiikkiristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, musiikki sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, musiikkifaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, soitinten luokittelu ty\u00f6lehdet jousi puhallin ly\u00f6m\u00e4 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Musiikkiteht\u00e4v\u00e4t 2. Luokalle \u2014 Rytmi ja Tilastot | LCS',
      seoDescription: 'Tulostettavia musiikkiteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki rytmej\u00e4, analysoi tilastoja ja kirjoita musiikkikuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka musiikin rytmi ty\u00f6lehdet tahti tempo nuottiarvot 7-8v, musiikkitilastot taulukkotyölehdet data-analyysi soittimet genret 2. luokka tulostettava, musiikkikuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit \u00e4\u00e4net 2. luokka, musiikin kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, musiikkityylien vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Musiikkiteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja S\u00e4velt\u00e4minen | LCS',
      seoDescription: 'Tulostettavia musiikkiteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita musiikkitutkimuksia, tutki s\u00e4vellajeja ja ratkaise rytmipulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka musiikkitutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, musiikin teoria ty\u00f6lehdet nuotit s\u00e4vellajit asteikot 3. luokka tulostettava, suomalainen musiikki ty\u00f6lehdet kansanmusiikki Sibelius perinteet 3. luokka, musiikki monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, maailman musiikkikulttuurit ty\u00f6lehdet soittimet tyylit perinteet 3. luokka harjoitukset',
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
