/**
 * Part 118: Finnish Theme+Grade SEO — Themes 13–16
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for easter, emotions, fairy-tales, farm Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  easter: {
    preschool: {
      seoTitle: 'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske munia, v\u00e4rit\u00e4 pupuja, yhdist\u00e4 p\u00e4\u00e4si\u00e4isvarjoja ja lajittele koristeita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu p\u00e4\u00e4si\u00e4inen laskeminen ty\u00f6lehdet munat puput 3-4v, p\u00e4\u00e4si\u00e4is v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, p\u00e4\u00e4si\u00e4isvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, p\u00e4\u00e4si\u00e4iskoristeiden lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, p\u00e4\u00e4si\u00e4iskuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele p\u00e4\u00e4si\u00e4issanastoa, laske munia ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus p\u00e4\u00e4si\u00e4issanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, p\u00e4\u00e4si\u00e4ismunien yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, p\u00e4\u00e4si\u00e4inen sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, p\u00e4\u00e4si\u00e4iskuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, p\u00e4\u00e4si\u00e4inen poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t 1. Luokalle \u2014 Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise p\u00e4\u00e4si\u00e4islaskuja, opettele sanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka p\u00e4\u00e4si\u00e4inen yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, p\u00e4\u00e4si\u00e4isristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, p\u00e4\u00e4si\u00e4inen sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, p\u00e4\u00e4si\u00e4isfaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, p\u00e4\u00e4si\u00e4iskoristeiden luokittelu ty\u00f6lehdet muodot v\u00e4rit 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t 2. Luokalle \u2014 Perinteet ja Data | LCS',
      seoDescription: 'Tulostettavia p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki p\u00e4\u00e4si\u00e4isperinteit\u00e4, analysoi tilastoja ja kirjoita kertomuksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka p\u00e4\u00e4si\u00e4isperinteet ty\u00f6lehdet tavat kulttuuri kev\u00e4t 7-8v, p\u00e4\u00e4si\u00e4istilastot taulukkotyölehdet data-analyysi munat koristeet 2. luokka tulostettava, p\u00e4\u00e4si\u00e4iskertomus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, p\u00e4\u00e4si\u00e4isen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, p\u00e4\u00e4si\u00e4isperinteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Kulttuuri | LCS',
      seoDescription: 'Tulostettavia p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita p\u00e4\u00e4si\u00e4istutkimuksia, vertaile perinteit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka p\u00e4\u00e4si\u00e4istutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, p\u00e4\u00e4si\u00e4isperinteet eri maissa ty\u00f6lehdet kulttuuri vertailu 3. luokka tulostettava, kev\u00e4\u00e4n merkit ty\u00f6lehdet luonto vuodenajat p\u00e4\u00e4si\u00e4inen 3. luokka, p\u00e4\u00e4si\u00e4inen monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, p\u00e4\u00e4si\u00e4istaide ty\u00f6lehdet koristelu perinteet symbolit 3. luokka harjoitukset',
    },
  },
  emotions: {
    preschool: {
      seoTitle: 'Tunneteht\u00e4v\u00e4t Esikouluun \u2014 Tunnista ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia tunneteht\u00e4vi\u00e4 esikouluun (3\u20134v). Tunnista ilmeit\u00e4, v\u00e4rit\u00e4 kasvoja, yhdist\u00e4 tunnevarjoja ja lajittele tunteita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu tunteiden tunnistaminen ty\u00f6lehdet ilmeet kasvot 3-4v, tunne v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, tunnevarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, tunteiden lajittelu ty\u00f6lehdet iloiset suruliset vertailu esikoulu, tunnekuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Tunneteht\u00e4v\u00e4t Esiopetukseen \u2014 Nime\u00e4 ja Keskustele | LCS',
      seoDescription: 'Tulostettavia tunneteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele tunnesanastoa, tunnista ilmeit\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus tunnesanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, tunteiden nime\u00e4minen ty\u00f6lehdet ilmeet tilanteet esiopetus tulostettava, tunne sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, tunnekuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, tunne poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Tunneteht\u00e4v\u00e4t 1. Luokalle \u2014 Empatia ja Sanat | LCS',
      seoDescription: 'Tulostettavia tunneteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Opettele tunnesanastoa, t\u00e4yt\u00e4 ristikk\u00f6ja ja lue tunnetarinoita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka tunnesanasto ty\u00f6lehdet empatia my\u00f6t\u00e4tunto 6-7v, tunneristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, tunne sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, tunnetarinat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, tunteiden luokittelu ty\u00f6lehdet positiiviset negatiiviset 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Tunneteht\u00e4v\u00e4t 2. Luokalle \u2014 Tunnetaidot ja Data | LCS',
      seoDescription: 'Tulostettavia tunneteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Analysoi tunnetilastoja, kirjoita tunnekuvauksia ja harjoittele empatiaa. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka tunnetaidot ty\u00f6lehdet itses\u00e4\u00e4tely empatia 7-8v, tunnetilastot taulukkotyölehdet data-analyysi mielialat 2. luokka tulostettava, tunnekuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit tilanteet 2. luokka, tunteiden kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, tunteiden vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Tunneteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Hyvinvointi | LCS',
      seoDescription: 'Tulostettavia tunneteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita tunnetutkimuksia, analysoi tilanteita ja ratkaise sosiaalisia pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka tunnetutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, sosiaalisten tilanteiden analysointi ty\u00f6lehdet empatia ratkaisut 3. luokka tulostettava, tunnes\u00e4\u00e4tely ty\u00f6lehdet strategiat hyvinvointi 3. luokka, tunne monivaiheinen teht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, tunneilmaisun vertailu ty\u00f6lehdet kulttuuri taide kirjallisuus 3. luokka harjoitukset',
    },
  },
  'fairy-tales': {
    preschool: {
      seoTitle: 'Satuteht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia satuteht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske satuhahmoja, v\u00e4rit\u00e4 linnoja, yhdist\u00e4 satuvarjoja ja lajittele olentoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu satu laskeminen ty\u00f6lehdet prinsessat lohik\u00e4\u00e4rmeet 3-4v, satujen v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, satuvarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, satuhahmojen lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, satukuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Satuteht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Kuvittele | LCS',
      seoDescription: 'Tulostettavia satuteht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele satusanastoa, laske hahmoja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus satusanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, satuhahmojen yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, satu sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, satukuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, satu poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Satuteht\u00e4v\u00e4t 1. Luokalle \u2014 Tarinat ja Laskut | LCS',
      seoDescription: 'Tulostettavia satuteht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise satulaskuja, opettele satusanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka satu yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, saturistikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, satu sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, satufaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, satuhahmojen luokittelu ty\u00f6lehdet hyv\u00e4t pahat hahmot 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Satuteht\u00e4v\u00e4t 2. Luokalle \u2014 Kerronta ja Analyysi | LCS',
      seoDescription: 'Tulostettavia satuteht\u00e4vi\u00e4 2. luokalle (7\u20138v). Analysoi saturakenteita, kirjoita omia satuja ja tutki hahmoja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka satujen rakenne ty\u00f6lehdet alku keskikohta loppu 7-8v, satutilastot taulukkotyölehdet data-analyysi hahmot tapahtumat 2. luokka tulostettava, satukirjoitus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet luova kerronta 2. luokka, satujen kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet ryhm\u00e4t sarjat 2. luokka, satujen vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Satuteht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Kirjallisuus | LCS',
      seoDescription: 'Tulostettavia satuteht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita satututkimuksia, vertaile kansansatuja ja analysoi opetuksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka satututkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, kansansadut eri maista ty\u00f6lehdet kulttuuri vertailu 3. luokka tulostettava, satujen opetukset ty\u00f6lehdet moraali arvot kirjallisuus 3. luokka, satu monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, satujen analysointi ty\u00f6lehdet hahmokehitys juonirakenne 3. luokka harjoitukset',
    },
  },
  farm: {
    preschool: {
      seoTitle: 'Maatilateht\u00e4v\u00e4t Esikouluun \u2014 Laske ja V\u00e4rit\u00e4 | LCS',
      seoDescription: 'Tulostettavia maatilateht\u00e4vi\u00e4 esikouluun (3\u20134v). Laske el\u00e4imi\u00e4, v\u00e4rit\u00e4 traktoreita, yhdist\u00e4 maatilavarjoja ja lajittele tuotteita. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esikoulu maatila laskeminen ty\u00f6lehdet lehm\u00e4t kanat 3-4v, maatilan v\u00e4rityssivut ty\u00f6lehdet hienomotoriikka hahmottaminen esikoulu tulostettava, maatilavarjojen yhdist\u00e4minen ty\u00f6lehdet visuaalinen tunnistaminen esikoulu, maatilael\u00e4inten lajittelu ty\u00f6lehdet koon mukaan vertailu esikoulu, maatilakuvien parien yhdist\u00e4minen ty\u00f6lehdet muisti tarkkaavaisuus esikoulu harjoitukset',
    },
    kindergarten: {
      seoTitle: 'Maatilateht\u00e4v\u00e4t Esiopetukseen \u2014 Lue ja Laske | LCS',
      seoDescription: 'Tulostettavia maatilateht\u00e4vi\u00e4 esiopetukseen (5\u20136v). Harjoittele maatilasanastoa, laske el\u00e4imi\u00e4 ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: 'esiopetus maatilasanasto ty\u00f6lehdet alku\u00e4\u00e4nteet kirjaintunnistus 5-6v, maatilael\u00e4inten yhteenlasku ty\u00f6lehdet kuvamatematiikka esiopetus tulostettava, maatila sanahaku ty\u00f6lehdet kirjainten etsiminen lukuvalmius esiopetus, maatilakuvioiden jatkaminen ty\u00f6lehdet loogiset sarjat esiopetus, maatila poikkeavuus joukkoteht\u00e4v\u00e4t ty\u00f6lehdet p\u00e4\u00e4ttely luokittelu esiopetus harjoitukset',
    },
    'first-grade': {
      seoTitle: 'Maatilateht\u00e4v\u00e4t 1. Luokalle \u2014 El\u00e4imet ja Laskut | LCS',
      seoDescription: 'Tulostettavia maatilateht\u00e4vi\u00e4 1. luokalle (6\u20137v). Ratkaise maatilalaskuja, opettele el\u00e4insanastoa ja t\u00e4yt\u00e4 ristikk\u00f6ja. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '1. luokka maatila yhteenlasku v\u00e4hennyslasku ty\u00f6lehdet kuvalaskut 6-7v, maatilaristikko ty\u00f6lehdet oikeinkirjoitus sanasto 1. luokka tulostettava, maatila sanahaku ty\u00f6lehdet lukutaito sanojen tunnistus 1. luokka, maatilafaktat lukuteht\u00e4v\u00e4t ty\u00f6lehdet luetun ymm\u00e4rt\u00e4minen 1. luokka, maatilael\u00e4inten luokittelu ty\u00f6lehdet nis\u00e4kk\u00e4\u00e4t linnut 1. luokka harjoitukset',
    },
    'second-grade': {
      seoTitle: 'Maatilateht\u00e4v\u00e4t 2. Luokalle \u2014 Viljely ja Tilastot | LCS',
      seoDescription: 'Tulostettavia maatilateht\u00e4vi\u00e4 2. luokalle (7\u20138v). Tutki viljelyy, analysoi satokausia ja kirjoita maatilakuvauksia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '2. luokka maatilan viljely ty\u00f6lehdet kasvit sadot vuodenajat 7-8v, maatilatilastot taulukkotyölehdet data-analyysi tuotanto 2. luokka tulostettava, maatilakuvaus kirjoitusteht\u00e4v\u00e4t ty\u00f6lehdet adjektiivit 2. luokka, maatilan kertolaskuteht\u00e4v\u00e4t ty\u00f6lehdet el\u00e4inryhm\u00e4t sarjat 2. luokka, maatilojen vertailu ty\u00f6lehdet samankaltaisuudet erot 2. luokka harjoitukset',
    },
    'third-grade': {
      seoTitle: 'Maatilateht\u00e4v\u00e4t 3. Luokalle \u2014 Tutkimus ja Maatalous | LCS',
      seoDescription: 'Tulostettavia maatilateht\u00e4vi\u00e4 3. luokalle (8\u20139v). Kirjoita maatilatutkimuksia, analysoi ruokaketjuja ja ratkaise pulmia. Ilmaisia ty\u00f6lehti\u00e4.',
      seoKeywords: '3. luokka maatilatutkimus ty\u00f6lehdet raporttikirjoitus tiedonhaku 8-9v, ruokaketju pellolta p\u00f6yt\u00e4\u00e4n ty\u00f6lehdet tuotanto kuluttaja 3. luokka tulostettava, kest\u00e4v\u00e4 maatalous ty\u00f6lehdet ymp\u00e4rist\u00f6 luomu 3. luokka, maatila monivaiheinen laskuteht\u00e4v\u00e4t ty\u00f6lehdet ongelmanratkaisu 3. luokka, maatalouden historia ty\u00f6lehdet perinteet nykyaika teknologia 3. luokka harjoitukset',
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
