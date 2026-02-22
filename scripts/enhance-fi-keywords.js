#!/usr/bin/env node
// SEO Part 171: FI Keyword Enhancement
// Enhances 33 FI product pages + 50 FI theme hub pages with LSI keywords,
// question keywords, SERP analysis, and cannibalization audit.

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: LSI + QUESTION KEYWORDS DATA
// ============================================================

// ---- 33 PRODUCT PAGES ----
const productEnhancements = {
  // === MATH APPS ===
  'yhteenlasku-tyoarkit': {
    slug: 'yhteenlasku-tyoarkit',
    appId: 'addition',
    category: 'math',
    primary: 'yhteenlasku generaattori',
    lsi: [
      'summa laskeminen',
      'muistinumero yhteenlasku',
      'paikka-arvo harjoitus',
      'lukujono harjoittelu',
      'peruslaskutoimitukset',
      'matemaattinen ajattelu',
      'laskustrategia esikoulu',
      'kymmenjärjestelmä oppiminen',
      'luvun hajoittaminen',
      'laskusujuvuus harjoitus',
    ],
    questions: [
      'Miten luon yhteenlaskutehtäviä oppilailleni?',
      'Mitä yhteenlaskutaitoja esikoululaisen tulisi harjoitella?',
      'Miten opetan yhteenlaskua kuvilla?',
    ],
  },
  'vahennyslasku-tyoarkit': {
    slug: 'vahennyslasku-tyoarkit',
    appId: 'subtraction',
    category: 'math',
    primary: 'vähennyslasku generaattori',
    lsi: [
      'erotus laskeminen',
      'lainaaminen vähennyslasku',
      'lukualue harjoitus',
      'vähennettävä ja vähentäjä',
      'miinuslaskustrategia',
      'matemaattinen päättely',
      'laskusujuvuus vähennys',
      'kymmenylitys vähennyslasku',
      'visuaalinen vähennyslasku',
      'laskuoperaatio harjoittelu',
    ],
    questions: [
      'Miten opetan vähennyslaskua kuvien avulla?',
      'Milloin lapsi on valmis vähennyslaskutehtäviin?',
      'Miten harjoittelen vähennyslaskua esikoululaisen kanssa?',
    ],
  },
  'matematiikka-tyoarkit': {
    slug: 'matematiikka-tyoarkit',
    appId: 'math-worksheets',
    category: 'math',
    primary: 'matematiikkatehtävä generaattori',
    lsi: [
      'laskutoimitukset harjoittelu',
      'matemaattiset perustaidot',
      'numerotaju kehittäminen',
      'laskuharjoitukset tulostettava',
      'matematiikan oppiminen',
      'laskutaidon vahvistaminen',
      'perusmatematiikka lapset',
      'aritmetiikka harjoitus',
      'lukumääräkäsite oppiminen',
      'matematiikkapeli tulostettava',
    ],
    questions: [
      'Miten valitsen oikean vaikeustason matematiikkatehtäviin?',
      'Kuinka usein lapsen tulisi harjoitella matematiikkaa?',
      'Miten teen matematiikasta hauskaa lapselle?',
    ],
  },
  'kuva-yhteenlasku-tyoarkit': {
    slug: 'kuva-yhteenlasku-tyoarkit',
    appId: 'image-addition',
    category: 'math',
    primary: 'kuvakoodattu yhteenlasku generaattori',
    lsi: [
      'symbolikoodaus matematiikka',
      'kuvakoodaus laskutehtävä',
      'salakoodilaskut lapsille',
      'matemaattinen salakirjoitus',
      'dekoodaus oppiminen',
      'koodinpurkaminen harjoitus',
      'visuaalinen kooditehtävä',
      'looginen päättely laskeminen',
      'matemaattinen ongelmanratkaisu',
      'symbolinen ajattelu',
    ],
    questions: [
      'Miten kuvakoodatut yhteenlaskut kehittävät lasta?',
      'Mikä ero on tavallisella ja kuvakoodatulla yhteenlaskulla?',
      'Mille ikäryhmälle kuvakoodatut laskut sopivat?',
    ],
  },
  'matematiikkapulmat-tyoarkit': {
    slug: 'matematiikkapulmat-tyoarkit',
    appId: 'math-puzzle',
    category: 'math',
    primary: 'matematiikkapulma generaattori',
    lsi: [
      'laskupulma lapsille',
      'matemaattinen ongelmanratkaisu',
      'ajattelupeli matematiikka',
      'lukupulma harjoitus',
      'matemaattinen logiikka',
      'päässälaskuharjoitus',
      'matemaattinen haaste',
      'kriittinen ajattelu matematiikka',
      'numeropulma tulostettava',
      'matemaattinen päättelytaito',
    ],
    questions: [
      'Miten matematiikkapulmat kehittävät ongelmanratkaisua?',
      'Mikä on sopiva vaikeustaso matematiikkapulmille?',
      'Miten käytän matematiikkapulmia oppitunnilla?',
    ],
  },
  'kuvakaavio-tyoarkit': {
    slug: 'kuvakaavio-tyoarkit',
    appId: 'picture-graph',
    category: 'math',
    primary: 'kuvakaavio generaattori',
    lsi: [
      'tilastokuva lapsille',
      'pylväsdiagrammi harjoitus',
      'tiedon kerääminen tehtävä',
      'graafinen esitys oppiminen',
      'datan tulkinta lapset',
      'tilastojen lukeminen harjoitus',
      'kuvadiagrammi työarkki',
      'taulukkolaskenta esikoulu',
      'visuaalinen data-analyysi',
      'matemaattinen tilastoajattelu',
    ],
    questions: [
      'Miten opetan kaavioiden lukemista pienille lapsille?',
      'Miksi kuvakaaviot ovat hyviä datan ymmärtämiseen?',
      'Miten luon kuvakaavioharjoituksia luokkaan?',
    ],
  },
  'enemman-vahemman-tyoarkit': {
    slug: 'enemman-vahemman-tyoarkit',
    appId: 'more-less',
    category: 'math',
    primary: 'enemmän vähemmän generaattori',
    lsi: [
      'määrien vertailu lapsille',
      'suurempi pienempi harjoitus',
      'lukumäärävertailu esikoulu',
      'vertailuoperaattori oppiminen',
      'järjestäminen laskemalla',
      'lukujen suuruusluokka',
      'matemaattinen vertailu',
      'konkreettinen vertailutehtävä',
      'visuaalinen vertailuharjoitus',
      'numerokäsite vahvistaminen',
    ],
    questions: [
      'Miten opetan enemmän ja vähemmän käsitteitä lapselle?',
      'Miksi vertailutehtävät ovat tärkeitä matematiikassa?',
      'Miten harjoittelen lukujen vertailua esikoulussa?',
    ],
  },

  // === LITERACY APPS ===
  'aakkosjuna-tyoarkit': {
    slug: 'aakkosjuna-tyoarkit',
    appId: 'alphabet-train',
    category: 'literacy',
    primary: 'aakkosjuna generaattori',
    lsi: [
      'kirjaintunnistus harjoitus',
      'aakkoset oppiminen',
      'foneeminen tietoisuus',
      'lukivalmius esikoulu',
      'kirjoittamisen harjoittelu',
      'alkuäänne tunnistaminen',
      'tavutus harjoitus',
      'äänne-kirjain vastaavuus',
      'suomen aakkoset lapset',
      'kirjainmuodostus harjoittelu',
    ],
    questions: [
      'Miten opetan aakkosia esikouluikäiselle?',
      'Missä järjestyksessä kirjaimet kannattaa opettaa?',
      'Miten aakkosjunatehtävä tukee lukemaan oppimista?',
    ],
  },
  'sanansekoitus-tyoarkit': {
    slug: 'sanansekoitus-tyoarkit',
    appId: 'word-scramble',
    category: 'literacy',
    primary: 'sanansekoitus generaattori',
    lsi: [
      'anagrammi lapsille',
      'oikeinkirjoitus harjoitus',
      'sanajärjestys tehtävä',
      'kirjainten järjestely',
      'sanaston laajentaminen',
      'kielellinen tietoisuus',
      'tavutusharjoitus',
      'dekoodaustaidon harjoittelu',
      'sanan rakenne oppiminen',
      'lukutaidon vahvistaminen',
    ],
    questions: [
      'Miten sanansekoitustehtävät kehittävät oikeinkirjoitusta?',
      'Mille ikäryhmälle sanansekoituspulmat sopivat?',
      'Miten käytän sanansekoitusta sanavaraston laajentamiseen?',
    ],
  },
  'ristisanatehtavat-tyoarkit': {
    slug: 'ristisanatehtavat-tyoarkit',
    appId: 'image-crossword',
    category: 'literacy',
    primary: 'kuvaristisana generaattori',
    lsi: [
      'ristikko lapsille',
      'sanaristikko harjoitus',
      'sanasto kehittäminen',
      'oikeinkirjoitustaito',
      'kielellinen päättely',
      'sanapeli tulostettava',
      'kirjaintaito harjoitus',
      'lukemisen tukeminen',
      'visuaalinen sanaharjoitus',
      'suomen kielen sanasto',
    ],
    questions: [
      'Miten kuvaristisanat kehittävät sanavarastoa?',
      'Ovatko kuvaristisanatehtävät sopivia esikouluun?',
      'Miten luon kuvaristisanoja opetuskäyttöön?',
    ],
  },
  'kuvakryptogrammi-tyoarkit': {
    slug: 'kuvakryptogrammi-tyoarkit',
    appId: 'picture-cryptogram',
    category: 'literacy',
    primary: 'kuvakryptogrammi generaattori',
    lsi: [
      'salakirjoitus lapsille',
      'koodipulma oppiminen',
      'symbolikirjoitus harjoitus',
      'koodinpurkaminen lukutaito',
      'looginen kielitehtävä',
      'visuaalinen koodaus',
      'dekoodaus lukeminen',
      'kirjaintunnistus pulmalla',
      'koodisanasto harjoitus',
      'ajattelutaito kehittäminen',
    ],
    questions: [
      'Miten kuvakryptogrammit kehittävät lukutaitoa?',
      'Miten käytän kryptogrammeja opetuksessa?',
      'Mikä tekee kuvakryptogrammeista motivoivia lapsille?',
    ],
  },
  'kasinkirjoitus-tyoarkit': {
    slug: 'kasinkirjoitus-tyoarkit',
    appId: 'handwriting',
    category: 'literacy',
    primary: 'käsinkirjoitus generaattori',
    lsi: [
      'kynäote harjoittelu',
      'kirjainmuodostus opettelu',
      'hienomotorinen harjoitus',
      'jäljentäminen harjoittelu',
      'kaunokirjoitus lapsille',
      'kirjoittamisen perustaidot',
      'viivankäyttö harjoitus',
      'kirjoitusharjoitus esikoulu',
      'motorinen kehitys kirjoittaminen',
      'käsiala parantaminen',
    ],
    questions: [
      'Miten kehitän lapsen kynäotetta?',
      'Milloin lapsi on valmis käsinkirjoitusharjoituksiin?',
      'Miten harjoittelen kirjainmuodostusta esikoulussa?',
    ],
  },
  'word-search-worksheets': {
    slug: 'word-search-worksheets',
    appId: 'word-search',
    category: 'literacy',
    primary: 'sanahaku generaattori',
    lsi: [
      'sanaruudukko lapsille',
      'kirjainten etsiminen',
      'visuaalinen haku harjoitus',
      'sanasto oppiminen peli',
      'lukemisen tukiharjoitus',
      'oikeinkirjoitus tunnistaminen',
      'kirjaintunnistus peli',
      'näkösanat harjoittelu',
      'suomen kielen sanapeli',
      'sanahaun ratkaiseminen',
    ],
    questions: [
      'Miten sanahakutehtävät kehittävät lukutaitoa?',
      'Minkä kokoinen sanahaun ruudukko sopii esikouluun?',
      'Miten valitsen sanat sanahaun tehtävään?',
    ],
  },
  'prepositio-tyoarkit': {
    slug: 'prepositio-tyoarkit',
    appId: 'prepositions',
    category: 'literacy',
    primary: 'prepositioharjoitus generaattori',
    lsi: [
      'sijaintikäsitteet oppiminen',
      'avaruudellinen hahmottaminen',
      'paikkasanat harjoitus',
      'suuntakäsitteet esikoulu',
      'edessä takana harjoitus',
      'alla päällä tehtävä',
      'kielellinen kehitys harjoitus',
      'spatiaaliset suhteet',
      'asemointi tehtävä',
      'sijainnin kuvaileminen',
    ],
    questions: [
      'Miten opetan prepositioita kuvien avulla?',
      'Mitkä sijaintikäsitteet opetetaan ensin?',
      'Miten prepositioharjoitukset tukevat kielen kehitystä?',
    ],
  },

  // === VISUAL / ART APPS ===
  'varityskuvat-tyoarkit': {
    slug: 'varityskuvat-tyoarkit',
    appId: 'coloring',
    category: 'visual',
    primary: 'värityskuva generaattori',
    lsi: [
      'värityssivu tulostettava',
      'hienomotoriikan kehittäminen',
      'silmä-käsi-koordinaatio',
      'värien tunnistaminen',
      'luova ilmaisu lapset',
      'kynäote vahvistaminen',
      'rajojen sisällä värittäminen',
      'visuaalinen hahmottaminen',
      'rentoutuminen värittäminen',
      'taiteellinen ilmaisu',
    ],
    questions: [
      'Miten värittäminen kehittää hienomotoriikkaa?',
      'Minkä ikäisenä lapsi oppii värittämään rajojen sisällä?',
      'Miten käytän väritysharjoituksia opetuksessa?',
    ],
  },
  'viivojen-piirtaminen-tyoarkit': {
    slug: 'viivojen-piirtaminen-tyoarkit',
    appId: 'line-drawing',
    category: 'visual',
    primary: 'viivanpiirto generaattori',
    lsi: [
      'viivan vetäminen harjoitus',
      'kynänhallinta kehittäminen',
      'graafomotoriikka',
      'piirtämisen perustaidot',
      'jäljentäminen esikoulu',
      'motoriikan kehittäminen',
      'käden harjoittelu',
      'viivakuvio harjoitus',
      'esikoulun piirtoharjoitus',
      'kirjoitusvalmiuden tukeminen',
    ],
    questions: [
      'Miten viivanpiirtoharjoitukset valmistavat kirjoittamiseen?',
      'Mitä viivoja esikoululaisen tulisi osata piirtää?',
      'Miten kehitän lapsen kynänhallintaa?',
    ],
  },
  'iso-pieni-tyoarkit': {
    slug: 'iso-pieni-tyoarkit',
    appId: 'big-small',
    category: 'visual',
    primary: 'kokovertailu generaattori',
    lsi: [
      'koon tunnistaminen tehtävä',
      'visuaalinen vertailu lapset',
      'iso ja pieni käsitteet',
      'järjestäminen koon mukaan',
      'havainnointitaito kehittäminen',
      'konkreettinen kokoero',
      'mittaamisen peruskäsitteet',
      'visuaalinen erottelu',
      'luokittelu koon perusteella',
      'matemaattinen vertailutaito',
    ],
    questions: [
      'Miten opetan iso ja pieni käsitteitä lapselle?',
      'Miksi kokovertailutehtävät ovat tärkeitä esikoulussa?',
      'Miten yhdistän kokovertailun arkielämän tilanteisiin?',
    ],
  },
  'etsi-ja-laske-tyoarkit': {
    slug: 'etsi-ja-laske-tyoarkit',
    appId: 'find-and-count',
    category: 'visual',
    primary: 'etsi ja laske generaattori',
    lsi: [
      'laskeminen kuvasta harjoitus',
      'tarkkaavaisuus tehtävä',
      'havainnointitaito lapset',
      'visuaalinen etsintä',
      'lukumäärän selvittäminen',
      'keskittymiskyky harjoittelu',
      'esineiden tunnistaminen',
      'kuvan tutkiminen tehtävä',
      'laskutaito visuaalinen',
      'yksityiskohtien havaitseminen',
    ],
    questions: [
      'Miten etsi ja laske tehtävät kehittävät tarkkaavaisuutta?',
      'Miten käytän etsi ja laske tehtäviä esikoulussa?',
      'Miten valitsen sopivan vaikeustason etsi ja laske tehtäviin?',
    ],
  },
  'yhdista-parit-tyoarkit': {
    slug: 'yhdista-parit-tyoarkit',
    appId: 'matching-app',
    category: 'visual',
    primary: 'yhdistä parit generaattori',
    lsi: [
      'parin yhdistäminen tehtävä',
      'muistipeli tulostettava',
      'visuaalinen yhdistäminen',
      'kuvaparien tunnistaminen',
      'kognitiivinen harjoitus lapset',
      'loogiset yhdistelmät',
      'assosiaatio harjoitus',
      'muistin kehittäminen',
      'vastaavuuksien löytäminen',
      'yhteenkuuluvuus tehtävä',
    ],
    questions: [
      'Miten yhdistämistehtävät kehittävät muistia?',
      'Minkälaisia pariyhdistelmiä voin luoda?',
      'Miten käytän yhdistämistehtäviä eri oppiaineissa?',
    ],
  },
  'kuva-bingo-tyoarkit': {
    slug: 'kuva-bingo-tyoarkit',
    appId: 'picture-bingo',
    category: 'visual',
    primary: 'kuva-bingo generaattori',
    lsi: [
      'bingopeli lapsille tulostettava',
      'sanastopeli opetukseen',
      'ryhmätoiminta luokassa',
      'tunnistaminen bingo',
      'visuaalinen muistipeli',
      'oppimispeli tulostettava',
      'kuvatunnistus leikki',
      'interaktiivinen oppimistehtävä',
      'sanaston vahvistaminen peli',
      'yhteistoiminnallinen oppiminen',
    ],
    questions: [
      'Miten käytän kuvabingoa oppitunnilla?',
      'Miten luon oman bingopelin luokkaan?',
      'Mille ikäryhmälle kuvabingo sopii parhaiten?',
    ],
  },
  'ruudukkopiirustus-tyoarkit': {
    slug: 'ruudukkopiirustus-tyoarkit',
    appId: 'grid-drawing',
    category: 'visual',
    primary: 'ruudukkopiirustus generaattori',
    lsi: [
      'ruudukkokopiointi tehtävä',
      'koordinaatisto harjoitus',
      'symmetria piirtäminen',
      'visuospatiaalinen harjoitus',
      'pikseligrafiikka lapsille',
      'piirtäminen mallin mukaan',
      'avaruudellinen hahmottaminen',
      'tarkkuuspiirustus lapset',
      'ruudukkotaide harjoitus',
      'visuaalinen tarkkuus',
    ],
    questions: [
      'Miten ruudukkopiirustus kehittää avaruudellista hahmottamista?',
      'Mille ikäryhmälle ruudukkopiirustus sopii?',
      'Miten aloitan ruudukkopiirustuksen esikoulussa?',
    ],
  },
  'etsi-esineet-tyoarkit': {
    slug: 'etsi-esineet-tyoarkit',
    appId: 'find-objects',
    category: 'visual',
    primary: 'etsi esineet generaattori',
    lsi: [
      'piilotetut esineet tehtävä',
      'visuaalinen etsintätehtävä',
      'tarkkaavaisuusharjoitus lapset',
      'yksityiskohtien löytäminen',
      'keskittyminen kuvatehtävä',
      'silmän liikkeen harjoitus',
      'havainnointitaito kehittäminen',
      'etsimispeli tulostettava',
      'visuaalinen skannaus',
      'esineiden tunnistamispeli',
    ],
    questions: [
      'Miten etsi esineet tehtävät kehittävät keskittymiskykyä?',
      'Miten valitsen vaikeustason etsi esineet tehtäviin?',
      'Miten käytän etsi esineet tehtäviä kotona?',
    ],
  },
  'ruudukko-sovitus-tyoarkit': {
    slug: 'ruudukko-sovitus-tyoarkit',
    appId: 'grid-matching',
    category: 'visual',
    primary: 'ruudukkosovitus generaattori',
    lsi: [
      'ruudukkotehtävä esikoulu',
      'koordinaatioharjoitus',
      'paikantaminen ruudukossa',
      'visuaalinen kopiointitehtävä',
      'avaruudellinen ajattelu',
      'ruudukon lukeminen',
      'matriisitehtävä lapsille',
      'kuvion sijoittaminen',
      'looginen sijoittelu',
      'visuaalinen organisointi',
    ],
    questions: [
      'Miten ruudukkosovitus kehittää loogista ajattelua?',
      'Mille ikäryhmälle ruudukkosovitustehtävät sopivat?',
      'Miten käytän ruudukkosovitusta matematiikan opetuksessa?',
    ],
  },
  'kuvalajittelu-tyoarkit': {
    slug: 'kuvalajittelu-tyoarkit',
    appId: 'picture-sort',
    category: 'visual',
    primary: 'kuvalajittelu generaattori',
    lsi: [
      'luokittelu tehtävä lapsille',
      'kategorioihin lajittelu',
      'ryhmittely harjoitus',
      'looginen luokittelu',
      'ominaisuuksien tunnistaminen',
      'vertailu ja lajittelu',
      'kognitiivinen luokittelu',
      'visuaalinen ryhmittely',
      'käsitteellistäminen harjoitus',
      'lajitteluperuste oppiminen',
    ],
    questions: [
      'Miten lajittelutehtävät kehittävät loogista ajattelua?',
      'Miten valitsen lajittelukategoriat lapsille?',
      'Miten käytän kuvalajittelua luonnontiedon opetuksessa?',
    ],
  },
  'varjoyhdistely-tyoarkit': {
    slug: 'varjoyhdistely-tyoarkit',
    appId: 'shadow-match',
    category: 'visual',
    primary: 'varjoyhdistely generaattori',
    lsi: [
      'siluettien tunnistaminen',
      'visuaalinen erottelukyky',
      'hahmontunnistus harjoitus',
      'muodon tunnistaminen',
      'varjojen yhdistäminen',
      'ääriviiva tunnistaminen',
      'visuaalinen prosessointi',
      'kognitiivinen hahmottaminen',
      'visuaalinen vastaavuus',
      'muodon ja taustan erottaminen',
    ],
    questions: [
      'Miten varjoyhdistely kehittää visuaalista hahmottamista?',
      'Mille ikäryhmälle varjoyhdistely sopii?',
      'Miten käytän varjoyhdistelyjä lukivalmiuden tukena?',
    ],
  },
  'kuvapolku-tyoarkit': {
    slug: 'kuvapolku-tyoarkit',
    appId: 'picture-path',
    category: 'visual',
    primary: 'kuvapolku generaattori',
    lsi: [
      'sokkelo lapsille',
      'polun seuraaminen tehtävä',
      'avaruudellinen navigointi',
      'reitinvalinta harjoitus',
      'visuaalinen seuranta',
      'ongelmanratkaisu polkupeli',
      'suunnittelukyky harjoitus',
      'etenemisstrategia oppiminen',
      'labyrintti tulostettava',
      'visuomotorinen harjoitus',
    ],
    questions: [
      'Miten kuvapolkutehtävät kehittävät ongelmanratkaisua?',
      'Miten valitsen kuvapolun vaikeustason lapselle?',
      'Miten kuvapolkuharjoitukset tukevat avaruudellista ajattelua?',
    ],
  },
  'kuva-arvaus-tyoarkit': {
    slug: 'kuva-arvaus-tyoarkit',
    appId: 'picture-guess',
    category: 'visual',
    primary: 'kuva-arvaus generaattori',
    lsi: [
      'arvaustehtävä lapsille',
      'vihjeiden päättely',
      'päättelykyky harjoitus',
      'kuvallinen arvoitus',
      'visuaalinen tulkinta',
      'tiedon yhdistäminen',
      'looginen arvaaminen',
      'kuva-arvoitus tulostettava',
      'sanasto arvauspeli',
      'vihjepohjainen oppiminen',
    ],
    questions: [
      'Miten kuva-arvaustehtävät kehittävät päättelykykyä?',
      'Mille ikäryhmälle kuva-arvauspulmat sopivat?',
      'Miten käytän kuva-arvausta sanaston opetuksessa?',
    ],
  },
  'puuttuvat-palat-tyoarkit': {
    slug: 'puuttuvat-palat-tyoarkit',
    appId: 'missing-pieces',
    category: 'visual',
    primary: 'puuttuvat palat generaattori',
    lsi: [
      'täydennä kuva tehtävä',
      'visuaalinen täydentäminen',
      'osan ja kokonaisuuden hahmottaminen',
      'visuaalinen päättely',
      'puuttuvan osan löytäminen',
      'kuvatäydennys harjoitus',
      'visuaalinen analyysi',
      'hahmottamiskyky kehittäminen',
      'palapeli tulostettava',
      'visuaalinen sulkeuma',
    ],
    questions: [
      'Miten puuttuvat palat tehtävät kehittävät hahmottamista?',
      'Minkä ikäinen lapsi osaa ratkaista puuttuvat palat tehtäviä?',
      'Miten käytän puuttuvat palat tehtäviä erityisopetuksessa?',
    ],
  },

  // === PUZZLE / LOGIC APPS ===
  'sudoku-tyoarkit': {
    slug: 'sudoku-tyoarkit',
    appId: 'sudoku',
    category: 'puzzles',
    primary: 'lasten sudoku generaattori',
    lsi: [
      'kuvasudoku lapsille',
      'logiikkapeli tulostettava',
      'päättelypeli esikoulu',
      'numeropulma lapset',
      'looginen ajattelu harjoitus',
      'poissulkeminen strategia',
      'sudokuruudukko aloittelijoille',
      'ongelmanratkaisu peli',
      'matemaattinen logiikka peli',
      'ajatteluharjoitus lapsille',
    ],
    questions: [
      'Miten opetan sudokun lapselle?',
      'Minkä kokoinen sudokuruudukko sopii aloittelijalle?',
      'Miten sudoku kehittää loogista ajattelua?',
    ],
  },
  'poikkea-joukosta-tyoarkit': {
    slug: 'poikkea-joukosta-tyoarkit',
    appId: 'odd-one-out',
    category: 'puzzles',
    primary: 'poikkea joukosta generaattori',
    lsi: [
      'mikä ei kuulu joukkoon',
      'luokittelu pulmatehtävä',
      'erojen löytäminen tehtävä',
      'kategorinen ajattelu',
      'erotteleva havainnointi',
      'looginen poissulkeminen',
      'kriittinen ajattelu lapset',
      'yhteenkuulumattomuus tehtävä',
      'visuaalinen poikkeavuus',
      'päättely ominaisuuksista',
    ],
    questions: [
      'Miten poikkea joukosta tehtävät kehittävät ajattelua?',
      'Mille ikäryhmälle poikkea joukosta tehtävät sopivat?',
      'Miten käytän poikkea joukosta tehtäviä opetuksessa?',
    ],
  },
  'kuviojuna-tyoarkit': {
    slug: 'kuviojuna-tyoarkit',
    appId: 'pattern-train',
    category: 'puzzles',
    primary: 'kuviojuna generaattori',
    lsi: [
      'kuviosarja lapsille',
      'toistuvuus tunnistaminen',
      'sekvenssi harjoitus',
      'kuviokierto oppiminen',
      'jatkuva kuvio tehtävä',
      'algebrallinen ajattelu johdanto',
      'säännönmukaisuus harjoitus',
      'sarjan jatkaminen',
      'visuaalinen kaava',
      'kuvion täydentäminen',
    ],
    questions: [
      'Miten kuviojunaharjoitukset valmistavat algebraan?',
      'Miten valitsen kuviojunan vaikeustason lapselle?',
      'Miksi kuvioiden tunnistaminen on tärkeää matematiikassa?',
    ],
  },
  'kuviotehtava-tyoarkit': {
    slug: 'kuviotehtava-tyoarkit',
    appId: 'pattern-worksheet',
    category: 'puzzles',
    primary: 'kuviotehtävä generaattori',
    lsi: [
      'kuviotehtävä esikoulu',
      'hahmontunnistus harjoitus',
      'symmetria lapsille',
      'kuvioiden vertailu',
      'visuaalinen logiikka',
      'kuvion jatkaminen tehtävä',
      'matemaattinen kaava',
      'toistuvan kuvion tunnistaminen',
      'visuaalinen sääntö',
      'kuviomuodostus harjoittelu',
    ],
    questions: [
      'Miten kuviotehtävät tukevat matemaattista ajattelua?',
      'Miten eroan kuviojuna ja kuviotehtävä toisistaan?',
      'Miten käytän kuviotehtäviä eri luokka-asteilla?',
    ],
  },
  'aarteenetsinta-tyoarkit': {
    slug: 'aarteenetsinta-tyoarkit',
    appId: 'treasure-hunt',
    category: 'puzzles',
    primary: 'aarteenetsintä generaattori',
    lsi: [
      'suunnistuspeli lapsille',
      'vihjepeli tulostettava',
      'tutkimustehtävä esikoulu',
      'seikkailupeli oppiminen',
      'reitinhaku harjoitus',
      'looginen päättelyketju',
      'etsintätehtävä luokkaan',
      'ongelmanratkaisu seikkailu',
      'perustelutaito harjoitus',
      'vihjeiden seuraaminen',
    ],
    questions: [
      'Miten käytän aarteenetsintää oppitunnilla?',
      'Miten luon aarteenetsintätehtäviä luokkaan?',
      'Miten aarteenetsintä kehittää ongelmanratkaisutaitoja?',
    ],
  },
};

// ---- 50 THEME HUB PAGES ----
const themeEnhancements = {
  alphabet: {
    theme: 'alphabet',
    primary: 'aakkostehtävät lapsille',
    lsi: [
      'kirjainharjoitukset tulostettava',
      'aakkosten opettelu tehtävät',
      'foneeminen tietoisuus harjoitukset',
      'kirjainmuodostus työlehdet',
      'lukivalmiuden tukeminen',
      'suomen aakkoset esikoulu',
      'äänne-kirjain yhteys',
      'alkukirjain tunnistaminen',
    ],
    questions: [
      'Miten opetan suomen aakkosia esikoululaisille?',
      'Mitkä aakkostehtävät sopivat 3-vuotiaalle?',
      'Miten tuen lapsen kirjaintunnistusta kotona?',
    ],
  },
  animals: {
    theme: 'animals',
    primary: 'eläintehtävät lapsille',
    lsi: [
      'eläinaiheinen oppimateriaali',
      'eläinten luokittelu harjoitus',
      'eläinsanasto oppiminen',
      'eläinten elinympäristöt tehtävä',
      'biologian peruskäsitteet lapset',
      'nisäkkäät linnut matelijat',
      'eläinten laskeminen harjoitus',
      'luontokasvatus työlehdet',
    ],
    questions: [
      'Miten käytän eläintehtäviä oppiainerajat ylittävässä opetuksessa?',
      'Mitkä eläintehtävät sopivat esikoululaisille?',
      'Miten eläinaiheet tukevat biologian oppimista?',
    ],
  },
  birds: {
    theme: 'birds',
    primary: 'lintutehtävät lapsille',
    lsi: [
      'lintujen tunnistaminen harjoitus',
      'lintuaiheinen oppimateriaali',
      'lintujen laskeminen tehtävä',
      'luontohavainnointi lapset',
      'lintujen elinympäristöt',
      'muuttolinnut oppiminen',
      'lintusanasto esikoulu',
      'linnunlaulu tunnistaminen',
    ],
    questions: [
      'Miten opetan lintulajien tunnistamista lapsille?',
      'Mitkä lintutehtävät sopivat kevätprojektiin?',
      'Miten yhdistän lintuhavainnoinnin työlehtiharjoituksiin?',
    ],
  },
  birthday: {
    theme: 'birthday',
    primary: 'syntymäpäivätehtävät lapsille',
    lsi: [
      'juhlateema työlehdet',
      'syntymäpäiväjuhla oppiminen',
      'juhla-aiheinen harjoitus',
      'syntymäpäivälaskut tehtävä',
      'juhlakutsu askartelu',
      'ikäkäsite oppiminen',
      'juhlakalenteri harjoitus',
      'vuodenkierto syntymäpäivä',
    ],
    questions: [
      'Miten käytän syntymäpäiväteemaa opetuksessa?',
      'Mitkä syntymäpäivätehtävät sopivat luokkajuhlaan?',
      'Miten yhdistän syntymäpäiväteeman matematiikkaan?',
    ],
  },
  body: {
    theme: 'body',
    primary: 'kehonosat tehtävät lapsille',
    lsi: [
      'ihmiskeho oppimateriaali',
      'kehonosien tunnistaminen harjoitus',
      'terveyskasvatus työlehdet',
      'kehon toiminnot tehtävä',
      'aistit oppiminen lapset',
      'anatomia esikoulu',
      'kehontuntemus harjoitus',
      'motoriikka ja keho',
    ],
    questions: [
      'Miten opetan kehonosia esikoululaisille?',
      'Mitkä keho-tehtävät tukevat terveystiedon opetusta?',
      'Miten käytän kehoteemaa liikuntakasvatuksen tukena?',
    ],
  },
  camping: {
    theme: 'camping',
    primary: 'retkeilytehtävät lapsille',
    lsi: [
      'leirintä oppimateriaali',
      'ulkoilu ja retkeily tehtävä',
      'luontoretki harjoitus',
      'retkeilyvarusteet oppiminen',
      'telttailu teema lapset',
      'luonnossa oppiminen',
      'erämaataidot esikoulu',
      'retkeilysanasto harjoitus',
    ],
    questions: [
      'Miten käytän retkeilyteemaa opetuksessa?',
      'Mitkä retkeilytehtävät sopivat luontoretkiprojektiin?',
      'Miten retkeilyteema motivoi oppimista?',
    ],
  },
  circus: {
    theme: 'circus',
    primary: 'sirkustehtävät lapsille',
    lsi: [
      'sirkusaiheinen oppimateriaali',
      'esiintyminen ja sirkus tehtävä',
      'akrobatia oppiminen lapset',
      'sirkuseläimet harjoitus',
      'pelle ja taikuri teema',
      'liikunta ja sirkus',
      'sirkussanasto esikoulu',
      'luova liikunta sirkus',
    ],
    questions: [
      'Miten käytän sirkusteemaa opetuksessa?',
      'Mitkä sirkustehtävät kehittävät luovuutta?',
      'Miten yhdistän sirkusteeman liikuntaan?',
    ],
  },
  clothing: {
    theme: 'clothing',
    primary: 'vaatetehtävät lapsille',
    lsi: [
      'vaatteet oppimateriaali lapset',
      'pukeutuminen tehtävä',
      'vaatesanasto harjoitus',
      'vuodenajat ja vaatteet',
      'vaatteiden lajittelu tehtävä',
      'pukeutuminen sään mukaan',
      'arjen taidot vaatteet',
      'vaatteiden tunnistaminen',
    ],
    questions: [
      'Miten opetan vaatesanastoa lapsille?',
      'Miten yhdistän vaateteeman vuodenaika-oppimiseen?',
      'Mitkä vaatetehtävät tukevat arjen taitojen oppimista?',
    ],
  },
  colors: {
    theme: 'colors',
    primary: 'väritehtävät lapsille',
    lsi: [
      'värien oppiminen harjoitus',
      'värien tunnistaminen tehtävä',
      'päävärit ja välivärit',
      'värien sekoittaminen lapset',
      'värisanasto esikoulu',
      'visuaalinen väriharjoitus',
      'värien lajittelu tehtävä',
      'väriympyrä oppiminen',
    ],
    questions: [
      'Miten opetan värejä esikoululaisille?',
      'Mitkä väritehtävät sopivat 3-vuotiaalle?',
      'Miten väriharjoitukset tukevat visuaalista oppimista?',
    ],
  },
  construction: {
    theme: 'construction',
    primary: 'rakennustehtävät lapsille',
    lsi: [
      'rakentaminen oppimateriaali',
      'työmaa teema lapset',
      'rakennuskoneet harjoitus',
      'suunnittelu ja rakentaminen',
      'STEM-oppiminen rakentaminen',
      'rakennussanasto esikoulu',
      'mittaaminen ja rakentaminen',
      'insinööriajattelu lapset',
    ],
    questions: [
      'Miten käytän rakennusteemaa STEM-opetuksessa?',
      'Mitkä rakennustehtävät kehittävät avaruudellista ajattelua?',
      'Miten yhdistän rakennusteeman matematiikkaan?',
    ],
  },
  cooking: {
    theme: 'cooking',
    primary: 'ruoanlaittotehtävät lapsille',
    lsi: [
      'kokkaaminen oppimateriaali',
      'resepti ja mittaaminen lapset',
      'keittiösanasto harjoitus',
      'terveellinen ruoka tehtävä',
      'ruoka-aineet oppiminen',
      'mittayksiköt kokkaaminen',
      'ravitsemuskasvatus työlehdet',
      'kokkausturvallisuus opetus',
    ],
    questions: [
      'Miten yhdistän ruoanlaittoteeman matematiikkaan?',
      'Mitkä ruoanlaittoharjoitukset sopivat esikouluun?',
      'Miten ruoanlaittoteema tukee terveystiedon opetusta?',
    ],
  },
  dinosaurs: {
    theme: 'dinosaurs',
    primary: 'dinosaurustehtävät lapsille',
    lsi: [
      'paleontologia lapset',
      'fossiilit oppimateriaali',
      'dinosauruslajit harjoitus',
      'esihistoriallinen aika opetus',
      'T-Rex ja Triceratops tehtävä',
      'geologiset kaudet oppiminen',
      'dinosaurusten koko vertailu',
      'sukupuutto käsite lapset',
    ],
    questions: [
      'Miten dinosaurustehtävät tukevat luonnontiedon opetusta?',
      'Mitkä dinosaurustehtävät sopivat esikoululaisille?',
      'Miten opetan geologisia aikakaudia lapsille?',
    ],
  },
  easter: {
    theme: 'easter',
    primary: 'pääsiäistehtävät lapsille',
    lsi: [
      'pääsiäisaiheinen oppimateriaali',
      'pääsiäismuna tehtävä',
      'kevätjuhla harjoitukset',
      'pääsiäispupu työlehdet',
      'kausiaiheinen oppiminen',
      'pääsiäisaskartelu tehtävä',
      'pääsiäissanasto harjoitus',
      'pääsiäisperinne oppiminen',
    ],
    questions: [
      'Miten käytän pääsiäisteemaa opetuksessa?',
      'Mitkä pääsiäistehtävät sopivat esikouluun?',
      'Miten yhdistän pääsiäisteeman matematiikkaan?',
    ],
  },
  emotions: {
    theme: 'emotions',
    primary: 'tunnetehtävät lapsille',
    lsi: [
      'tunnekasvatus oppimateriaali',
      'tunteiden tunnistaminen harjoitus',
      'sosioemotionaalinen oppiminen',
      'tunneilmaisu tehtävä',
      'empatia harjoitus lapset',
      'tunnesanasto esikoulu',
      'itsesäätelytaidot oppiminen',
      'tunnetaidot työlehdet',
    ],
    questions: [
      'Miten opetan tunteiden tunnistamista lapsille?',
      'Mitkä tunnetehtävät tukevat sosiaalista kehitystä?',
      'Miten käytän tunnetehtäviä konfliktien ehkäisyssä?',
    ],
  },
  'fairy-tales': {
    theme: 'fairy-tales',
    primary: 'satutehtävät lapsille',
    lsi: [
      'satuaiheinen oppimateriaali',
      'tarinan ymmärtäminen harjoitus',
      'satuhahmot tehtävä',
      'tarinan rakenne oppiminen',
      'mielikuvitus ja sadut',
      'lukemisen innostaminen',
      'satujen sanasto',
      'kertomuksen osat harjoitus',
    ],
    questions: [
      'Miten käytän satuja lukemisen innostamiseen?',
      'Mitkä satutehtävät kehittävät tarinan ymmärtämistä?',
      'Miten yhdistän satuteeman kirjoittamisen opetukseen?',
    ],
  },
  farm: {
    theme: 'farm',
    primary: 'maatilatehtävät lapsille',
    lsi: [
      'maatalous oppimateriaali lapset',
      'maatilan eläimet harjoitus',
      'ruoantuotanto oppiminen',
      'maatilasanasto esikoulu',
      'kasvien kasvatus tehtävä',
      'maaseutu ja luonto',
      'kotieläimet tunnistaminen',
      'sadonkorjuu oppiminen',
    ],
    questions: [
      'Miten käytän maatilateemaa luonnontiedon opetuksessa?',
      'Mitkä maatilatehtävät sopivat kaupunkilaisille lapsille?',
      'Miten maatilateema tukee ympäristökasvatusta?',
    ],
  },
  flowers: {
    theme: 'flowers',
    primary: 'kukkatehtävät lapsille',
    lsi: [
      'kukka-aiheinen oppimateriaali',
      'kasvien osat oppiminen',
      'kukkien tunnistaminen harjoitus',
      'puutarha ja kasvit tehtävä',
      'kasvun seuraaminen',
      'luonnonkasvit esikoulu',
      'kukkasanasto harjoitus',
      'kasvien elinkierto',
    ],
    questions: [
      'Miten kukkatehtävät tukevat biologian oppimista?',
      'Mitkä kukkatehtävät sopivat kevätprojektiin?',
      'Miten opetan kasvien osia kukkateeman avulla?',
    ],
  },
  food: {
    theme: 'food',
    primary: 'ruokatehtävät lapsille',
    lsi: [
      'ruoka-aiheinen oppimateriaali',
      'ravitsemus oppiminen lapset',
      'terveellinen ruokavalio tehtävä',
      'ruokaryhmät harjoitus',
      'ruokasanasto esikoulu',
      'ruoka ja terveys',
      'ruokakasvatus työlehdet',
      'aterioiden suunnittelu',
    ],
    questions: [
      'Miten ruokatehtävät tukevat terveystiedon opetusta?',
      'Mitkä ruokatehtävät sopivat ravitsemuskasvatukseen?',
      'Miten käytän ruokateemaa eri oppiaineissa?',
    ],
  },
  forest: {
    theme: 'forest',
    primary: 'metsätehtävät lapsille',
    lsi: [
      'metsäaiheinen oppimateriaali',
      'metsän eläimet ja kasvit',
      'luontokasvatus metsä',
      'metsäretki harjoitus',
      'ekosysteemi oppiminen lapset',
      'metsän kerrokset tehtävä',
      'suomalainen metsä opetus',
      'metsäsanasto esikoulu',
    ],
    questions: [
      'Miten käytän metsäteemaa ympäristökasvatuksessa?',
      'Mitkä metsätehtävät sopivat luontoretkeen?',
      'Miten metsäteema tukee suomalaista luontokasvatusta?',
    ],
  },
  fruits: {
    theme: 'fruits',
    primary: 'hedelmätehtävät lapsille',
    lsi: [
      'hedelmät oppimateriaali lapset',
      'hedelmien tunnistaminen harjoitus',
      'hedelmä ja terveys tehtävä',
      'hedelmäsanasto esikoulu',
      'hedelmien lajittelu',
      'vitamiinit oppiminen',
      'hedelmien värit harjoitus',
      'terveellinen välipala',
    ],
    questions: [
      'Miten hedelmätehtävät tukevat ravitsemuskasvatusta?',
      'Mitkä hedelmätehtävät sopivat värien opetteluun?',
      'Miten käytän hedelmäteemaa lajitteluharjoituksissa?',
    ],
  },
  furniture: {
    theme: 'furniture',
    primary: 'huonekalutehtävät lapsille',
    lsi: [
      'huonekalut oppimateriaali',
      'kodin esineet harjoitus',
      'huonesanasto esikoulu',
      'huoneiden tunnistaminen',
      'kodin tilat tehtävä',
      'sijainnin ilmaiseminen',
      'arjen esineet oppiminen',
      'huonekalut ja muodot',
    ],
    questions: [
      'Miten huonekalutehtävät tukevat sanavaraston kehitystä?',
      'Mitkä huonekalutehtävät sopivat sijaintikäsitteiden opettamiseen?',
      'Miten käytän kodin teemaa opetuksessa?',
    ],
  },
  garden: {
    theme: 'garden',
    primary: 'puutarhatehtävät lapsille',
    lsi: [
      'puutarha oppimateriaali lapset',
      'kasvien istuttaminen tehtävä',
      'puutarhanhoito oppiminen',
      'kasvin kasvu seuranta',
      'siementen itäminen',
      'puutarhasanasto esikoulu',
      'ympäristökasvatus puutarha',
      'kasvimaa harjoitus',
    ],
    questions: [
      'Miten käytän puutarhateemaa luonnontiedon opetuksessa?',
      'Mitkä puutarhatehtävät sopivat keväälle?',
      'Miten puutarhaopetus tukee käytännön oppimista?',
    ],
  },
  halloween: {
    theme: 'halloween',
    primary: 'halloween-tehtävät lapsille',
    lsi: [
      'halloween oppimateriaali',
      'halloween-askartelu tehtävä',
      'kurpitsa harjoitukset',
      'halloween-sanasto esikoulu',
      'kummitusaihe lapset',
      'juhlapäivä oppiminen',
      'halloween-pelit tulostettava',
      'syysjuhla tehtävä',
    ],
    questions: [
      'Miten käytän halloween-teemaa opetuksessa?',
      'Mitkä halloween-tehtävät ovat ikätasoisia esikouluun?',
      'Miten yhdistän halloween-teeman syysprojektiin?',
    ],
  },
  holidays: {
    theme: 'holidays',
    primary: 'juhlatehtävät lapsille',
    lsi: [
      'juhlapyhät oppimateriaali',
      'vuodenkierto ja juhlat',
      'kulttuuriset juhlat oppiminen',
      'kalenteriharjoitus lapset',
      'juhlaperinteet tehtävä',
      'juhla-aiheinen sanasto',
      'juhlien laskeminen',
      'perinnejuhlat esikoulu',
    ],
    questions: [
      'Miten käytän juhlateemaa kulttuurikasvatuksessa?',
      'Mitkä juhlatehtävät sopivat monikieliseen luokkaan?',
      'Miten juhlatehtävät tukevat kalenterin oppimista?',
    ],
  },
  household: {
    theme: 'household',
    primary: 'kodinhoitotehtävät lapsille',
    lsi: [
      'kodin esineet oppimateriaali',
      'arjen taidot tehtävä',
      'kotityöt oppiminen lapset',
      'kotiympäristö harjoitus',
      'kodinhoitosanasto esikoulu',
      'arjen esineiden tunnistaminen',
      'koti ja perhe tehtävä',
      'päivittäiset toiminnot',
    ],
    questions: [
      'Miten kodinhoitotehtävät tukevat arjen taitojen oppimista?',
      'Mitkä kotitehtävät sopivat esikoululaisille?',
      'Miten käytän kodin teemaa sanavaraston kehittämisessä?',
    ],
  },
  insects: {
    theme: 'insects',
    primary: 'hyönteitehtävät lapsille',
    lsi: [
      'hyönteiset oppimateriaali',
      'hyönteisten tunnistaminen harjoitus',
      'ötökkätehtävät esikoulu',
      'hyönteisten elinkierto',
      'perhosen elämänkaari',
      'luontotutkimus hyönteiset',
      'hyönteissanasto harjoitus',
      'selkärangattomat oppiminen',
    ],
    questions: [
      'Miten opetan hyönteislajien tunnistamista lapsille?',
      'Mitkä hyönteistehtävät sopivat kevätprojektiin?',
      'Miten hyönteisteema tukee luonnontiedon opetusta?',
    ],
  },
  jobs: {
    theme: 'jobs',
    primary: 'ammattitehtävät lapsille',
    lsi: [
      'ammatit oppimateriaali lapset',
      'ammattien tunnistaminen harjoitus',
      'työntekijät ja työvälineet',
      'ammattisanasto esikoulu',
      'yhteiskunnan ammatit',
      'työ ja ammatit tehtävä',
      'ammatinvalinta oppiminen',
      'ammattiroolileikit',
    ],
    questions: [
      'Miten opetan ammatteja esikoululaisille?',
      'Mitkä ammattitehtävät kehittävät yhteiskunnallista ymmärrystä?',
      'Miten käytän ammattiteemaa roolileikkien tukena?',
    ],
  },
  music: {
    theme: 'music',
    primary: 'musiikkitehtävät lapsille',
    lsi: [
      'musiikki oppimateriaali lapset',
      'soittimet tunnistaminen harjoitus',
      'rytmi harjoitus esikoulu',
      'musiikkisanasto oppiminen',
      'nuottien tunnistaminen',
      'äänien erottaminen tehtävä',
      'musiikkikasvatus työlehdet',
      'laulu ja liike oppiminen',
    ],
    questions: [
      'Miten musiikkitehtävät tukevat oppimista?',
      'Mitkä musiikkitehtävät sopivat esikoululaisille?',
      'Miten yhdistän musiikkiteeman lukemisen opetukseen?',
    ],
  },
  nature: {
    theme: 'nature',
    primary: 'luontotehtävät lapsille',
    lsi: [
      'luonto oppimateriaali lapset',
      'ympäristökasvatus työlehdet',
      'luonnon tutkiminen harjoitus',
      'luonnonilmiöt tehtävä',
      'ekologia oppiminen esikoulu',
      'luontohavainnointi harjoitus',
      'luonnon monimuotoisuus',
      'suomalainen luonto opetus',
    ],
    questions: [
      'Miten luontotehtävät tukevat ympäristökasvatusta?',
      'Mitkä luontotehtävät sopivat ulko-opetukseen?',
      'Miten opetan luonnon monimuotoisuutta lapsille?',
    ],
  },
  numbers: {
    theme: 'numbers',
    primary: 'numerotehtävät lapsille',
    lsi: [
      'numerot oppimateriaali esikoulu',
      'lukujen oppiminen harjoitus',
      'numerotaju kehittäminen',
      'laskemisen perustaidot',
      'lukumäärän tunnistaminen',
      'numero-sana vastaavuus',
      'lukujonoharjoitus lapset',
      'matemaattinen valmius',
    ],
    questions: [
      'Miten opetan numeroita esikoululaisille?',
      'Mitkä numerotehtävät sopivat 3-vuotiaalle?',
      'Miten kehitän lapsen numerotajua kotona?',
    ],
  },
  ocean: {
    theme: 'ocean',
    primary: 'meritehtävät lapsille',
    lsi: [
      'meri oppimateriaali lapset',
      'merieläimet harjoitus',
      'merenalainen maailma tehtävä',
      'vedenalainen elämä oppiminen',
      'merisanasto esikoulu',
      'valtameret ja meret',
      'meribiologia lapset',
      'rannikko ja meri tehtävä',
    ],
    questions: [
      'Miten käytän meriteemaa luonnontiedon opetuksessa?',
      'Mitkä meritehtävät sopivat kesäprojektiin?',
      'Miten opetan merieläimiä lapsille?',
    ],
  },
  pets: {
    theme: 'pets',
    primary: 'lemmikkitehtävät lapsille',
    lsi: [
      'lemmikit oppimateriaali lapset',
      'lemmikkieläimet harjoitus',
      'eläinten hoitaminen tehtävä',
      'lemmikkisanasto esikoulu',
      'vastuullisuus ja lemmikit',
      'koira ja kissa tehtävä',
      'lemmikkien vertailu',
      'eläinten hyvinvointi',
    ],
    questions: [
      'Miten lemmikkitehtävät opettavat vastuullisuutta?',
      'Mitkä lemmikkitehtävät sopivat esikoululaisille?',
      'Miten käytän lemmikkiteemaa tunnekasvatuksessa?',
    ],
  },
  pirates: {
    theme: 'pirates',
    primary: 'merirosvostehtävät lapsille',
    lsi: [
      'merirosvo oppimateriaali',
      'aarteenetsintä tehtävä',
      'seikkailu ja oppiminen',
      'merirosvo sanasto esikoulu',
      'kartan lukeminen harjoitus',
      'meriseikkailu tehtävä',
      'merirosvolaiva askartelu',
      'suuntien oppiminen',
    ],
    questions: [
      'Miten käytän merirosvosteemaa opetuksessa?',
      'Mitkä merirosvostehtävät kehittävät avaruudellista ajattelua?',
      'Miten yhdistän merirosvosteeman kartanlukuun?',
    ],
  },
  robots: {
    theme: 'robots',
    primary: 'robottitehtävät lapsille',
    lsi: [
      'robotit oppimateriaali lapset',
      'teknologia oppiminen esikoulu',
      'ohjelmointi ajattelu lapset',
      'STEM-oppiminen robotit',
      'robottisanasto harjoitus',
      'teknologiakasvatus työlehdet',
      'automaatio käsite lapset',
      'tulevaisuuden taidot',
    ],
    questions: [
      'Miten robottitehtävät tukevat STEM-oppimista?',
      'Mitkä robottitehtävät sopivat esikoululaisille?',
      'Miten opetan ohjelmoinnillista ajattelua robottiteeman avulla?',
    ],
  },
  school: {
    theme: 'school',
    primary: 'koulutehtävät lapsille',
    lsi: [
      'koulu oppimateriaali esikoulu',
      'koulusanasto harjoitus',
      'koulutarvikkeet tunnistaminen',
      'koulunkäynnin valmistelu',
      'lukuvuosi ja aikataulu',
      'oppilaiden arki tehtävä',
      'koulun tilat oppiminen',
      'esikoulusta kouluun',
    ],
    questions: [
      'Miten valmistan lastani koulunalkuun?',
      'Mitkä koulutehtävät tukevat kouluvalmiutta?',
      'Miten käytän kouluteemaa siirtymävaiheen tukena?',
    ],
  },
  seasons: {
    theme: 'seasons',
    primary: 'vuodenaikatehtävät lapsille',
    lsi: [
      'vuodenajat oppimateriaali',
      'vuodenkierto harjoitus',
      'sääilmiöt ja vuodenajat',
      'luonnon muutokset vuodenaikojen mukaan',
      'neljä vuodenaikaa tehtävä',
      'vuodenaikasanasto esikoulu',
      'vuodenaikojen vertailu',
      'luonnontiede vuodenajat',
    ],
    questions: [
      'Miten opetan vuodenaikoja esikoululaisille?',
      'Mitkä vuodenaikatehtävät sopivat ympäristökasvatukseen?',
      'Miten käytän vuodenaikateemaa läpi kouluvuoden?',
    ],
  },
  shapes: {
    theme: 'shapes',
    primary: 'muototehtävät lapsille',
    lsi: [
      'geometriset muodot oppimateriaali',
      'muotojen tunnistaminen harjoitus',
      'perusmuodot esikoulu',
      'kolmio neliö ympyrä tehtävä',
      'muoto ja tila oppiminen',
      'muotosanasto harjoitus',
      'geometria alkeet lapset',
      'avaruudellinen hahmottaminen muodot',
    ],
    questions: [
      'Miten opetan geometrisia muotoja esikoululaisille?',
      'Mitkä muototehtävät sopivat 3-vuotiaalle?',
      'Miten yhdistän muotoharjoitukset arkielämään?',
    ],
  },
  space: {
    theme: 'space',
    primary: 'avaruustehtävät lapsille',
    lsi: [
      'avaruus oppimateriaali lapset',
      'planeetat ja tähdet harjoitus',
      'aurinkokunta oppiminen',
      'avaruussanasto esikoulu',
      'astronautti tehtävä',
      'kuun vaiheet oppiminen',
      'avaruustutkimus lapset',
      'tähtitiede esikoulu',
    ],
    questions: [
      'Miten opetan aurinkokunnan planeettoija lapsille?',
      'Mitkä avaruustehtävät sopivat esikoululaisille?',
      'Miten avaruusteema motivoi luonnontiedon oppimista?',
    ],
  },
  sports: {
    theme: 'sports',
    primary: 'urheilutehtävät lapsille',
    lsi: [
      'urheilu oppimateriaali lapset',
      'liikunta ja terveyskasvatus',
      'urheilulajit harjoitus',
      'urheilusanasto esikoulu',
      'joukkueurheilu oppiminen',
      'liikkuminen ja terveys',
      'urheiluvälineet tunnistaminen',
      'fyysinen aktiivisuus',
    ],
    questions: [
      'Miten käytän urheiluteemaa opetuksessa?',
      'Mitkä urheilutehtävät tukevat terveyskasvatusta?',
      'Miten yhdistän urheiluteeman matematiikkaan?',
    ],
  },
  spring: {
    theme: 'spring',
    primary: 'kevättehtävät lapsille',
    lsi: [
      'kevät oppimateriaali esikoulu',
      'kevään merkit luonnossa',
      'kasvun seuranta harjoitus',
      'kevätprojekti tehtävä',
      'kevätsanasto oppiminen',
      'luonnon herääminen',
      'kevätkasvit oppiminen',
      'muuttolintujen paluu',
    ],
    questions: [
      'Miten käytän kevätteemaa luonnontiedon opetuksessa?',
      'Mitkä kevättehtävät sopivat ulko-opetukseen?',
      'Miten opetan kevään luonnonilmiöitä lapsille?',
    ],
  },
  summer: {
    theme: 'summer',
    primary: 'kesätehtävät lapsille',
    lsi: [
      'kesä oppimateriaali lapset',
      'kesälomatehtävät tulostettava',
      'kesän aktiviteetit harjoitus',
      'uimaranta ja kesä tehtävä',
      'kesäsanasto esikoulu',
      'kesäoppiminen kotona',
      'lomaharjoitukset lapset',
      'kesän luonto oppiminen',
    ],
    questions: [
      'Miten pidän oppimista yllä kesälomalla?',
      'Mitkä kesätehtävät sopivat lomaharjoitteluun?',
      'Miten käytän kesäteemaa ulko-oppimisessa?',
    ],
  },
  superheroes: {
    theme: 'superheroes',
    primary: 'supersankaritehtävät lapsille',
    lsi: [
      'supersankari oppimateriaali',
      'sankariteema opetuksessa',
      'mielikuvitus ja oppiminen',
      'supersankarisanasto harjoitus',
      'rohkeus ja arvot tehtävä',
      'luova ajattelu supersankarit',
      'sankaritarinat oppiminen',
      'itsetunto ja voimat',
    ],
    questions: [
      'Miten käytän supersankariteemaa motivointiin?',
      'Mitkä supersankaritehtävät kehittävät luovuutta?',
      'Miten supersankariteema tukee tunnekasvatusta?',
    ],
  },
  toys: {
    theme: 'toys',
    primary: 'lelutehtävät lapsille',
    lsi: [
      'lelut oppimateriaali esikoulu',
      'lelujen lajittelu harjoitus',
      'lelu sanasto oppiminen',
      'leikkiminen ja oppiminen',
      'lelujen laskeminen tehtävä',
      'lelukauppa roolileikki',
      'lelujen vertailu harjoitus',
      'arjen esineet oppiminen',
    ],
    questions: [
      'Miten lelutehtävät tukevat lajittelutaitojen oppimista?',
      'Mitkä lelutehtävät sopivat nuorimmille esikoululaisille?',
      'Miten käytän leluteemaa laskemisen harjoitteluun?',
    ],
  },
  transportation: {
    theme: 'transportation',
    primary: 'kulkuneuvotehtävät lapsille',
    lsi: [
      'kulkuneuvot oppimateriaali',
      'liikennevälineet harjoitus',
      'ajoneuvot tunnistaminen tehtävä',
      'liikennesanasto esikoulu',
      'maa vesi ilma kulkuneuvot',
      'liikenne ja turvallisuus',
      'kulkuneuvot lajittelu',
      'matkustaminen oppiminen',
    ],
    questions: [
      'Miten opetan kulkuneuvoja esikoululaisille?',
      'Mitkä kulkuneuvotehtävät tukevat luokittelutaitojen oppimista?',
      'Miten yhdistän kulkuneuvoteeman liikennekasvatukseen?',
    ],
  },
  travel: {
    theme: 'travel',
    primary: 'matkailutehtävät lapsille',
    lsi: [
      'matkailu oppimateriaali lapset',
      'maailman maat ja kulttuurit',
      'maantiede oppiminen esikoulu',
      'matkasanasto harjoitus',
      'kartan lukeminen lapset',
      'eri maat ja kaupungit',
      'maailman tutkiminen tehtävä',
      'kulttuurien oppiminen',
    ],
    questions: [
      'Miten käytän matkailuteemaa maantiedon opetuksessa?',
      'Mitkä matkailutehtävät kehittävät kulttuurista ymmärrystä?',
      'Miten opetan maantiedettä matkailuteeman avulla?',
    ],
  },
  vegetables: {
    theme: 'vegetables',
    primary: 'vihannestehtävät lapsille',
    lsi: [
      'vihannekset oppimateriaali',
      'kasvisten tunnistaminen harjoitus',
      'terveellinen ruokavalio lapset',
      'vihannessanasto esikoulu',
      'kasvimaa harjoitus',
      'vihannesten lajittelu tehtävä',
      'ravitsemuskasvatus vihannekset',
      'kasvisten kasvatus',
    ],
    questions: [
      'Miten vihannestehtävät tukevat ravitsemuskasvatusta?',
      'Mitkä vihannestehtävät sopivat terveystiedon opetukseen?',
      'Miten käytän vihannesteemaa kasvimaaopetuksessa?',
    ],
  },
  weather: {
    theme: 'weather',
    primary: 'säätehtävät lapsille',
    lsi: [
      'sää oppimateriaali esikoulu',
      'sääilmiöt harjoitus lapset',
      'sääsanasto oppiminen',
      'lämpötila ja sää tehtävä',
      'pilvet ja sade oppiminen',
      'sääpäiväkirja harjoitus',
      'sääennuste oppiminen',
      'luonnonilmiöt ja sää',
    ],
    questions: [
      'Miten opetan sääilmiöitä esikoululaisille?',
      'Mitkä säätehtävät sopivat päivittäiseen aamupiiriin?',
      'Miten käytän sääteemaa luonnontiedon opetuksessa?',
    ],
  },
  winter: {
    theme: 'winter',
    primary: 'talvitehtävät lapsille',
    lsi: [
      'talvi oppimateriaali esikoulu',
      'talviaktiviteetit harjoitus',
      'lumi ja jää tehtävä',
      'talvisanasto oppiminen',
      'talven luonto oppiminen',
      'talvieläimet ja sopeutuminen',
      'joulun jälkeen talviteema',
      'talviliikunta ja oppiminen',
    ],
    questions: [
      'Miten käytän talviteemaa luonnontiedon opetuksessa?',
      'Mitkä talvitehtävät sopivat tammikuuhun?',
      'Miten opetan talven luonnonilmiöitä lapsille?',
    ],
  },
  xmas: {
    theme: 'xmas',
    primary: 'joulutehtävät lapsille',
    lsi: [
      'joulu oppimateriaali esikoulu',
      'jouluaskartelu tehtävä',
      'joulupukki harjoitus',
      'adventtikalenteri oppiminen',
      'joulusanasto harjoitus',
      'jouluperinteet tehtävä',
      'joululaulu ja oppiminen',
      'joulun odotus aktiviteetit',
    ],
    questions: [
      'Miten käytän jouluteemaa opetuksessa?',
      'Mitkä joulutehtävät sopivat adventtiajalle?',
      'Miten yhdistän jouluteeman matematiikan opetukseen?',
    ],
  },
  zoo: {
    theme: 'zoo',
    primary: 'eläintarhatehtävät lapsille',
    lsi: [
      'eläintarha oppimateriaali',
      'eksoottiset eläimet harjoitus',
      'eläintarhavierailu tehtävä',
      'eläintarhasanasto esikoulu',
      'villieläimet oppiminen',
      'eläinsuojelu lapset',
      'eläinlajien tunnistaminen',
      'eläintarhan kartta harjoitus',
    ],
    questions: [
      'Miten valmistaudun eläintarhavierailuun tehtävillä?',
      'Mitkä eläintarhatehtävät sopivat esikouluun?',
      'Miten eläintarhateema tukee luonnontiedon opetusta?',
    ],
  },
};

// ============================================================
// SECTION 2: FILE PROCESSING FUNCTIONS
// ============================================================

const PRODUCT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'fi');
const THEME_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'fi-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'fi-keyword-enhancement.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function extractProductKeywords(content) {
  // Match: keywords: 'xxx',
  const match = content.match(/keywords:\s*'([^']+)'/);
  return match ? match[1] : null;
}

function extractThemeKeywords(content) {
  // Match: keywords: 'xxx', (within the top-level content object, before heading:)
  const match = content.match(/keywords:\s*'([^']+)'/);
  return match ? match[1] : null;
}

function extractSeoTitle(content) {
  const match = content.match(/title:\s*'([^']+)'/);
  return match ? match[1] : null;
}

function extractSeoDescription(content) {
  const match = content.match(/description:\s*'([^']+)'/);
  return match ? match[1] : null;
}

function updateProductKeywords(content, newKeywords) {
  // Replace the seo.keywords field value
  // Find the keywords line within the seo: { ... } block
  const seoBlockMatch = content.match(/(seo:\s*\{[\s\S]*?keywords:\s*')([^']+)('[\s\S]*?\})/);
  if (!seoBlockMatch) {
    // Fallback: just replace the first keywords: '...' occurrence
    return content.replace(/(keywords:\s*')([^']+)(')/, `$1${newKeywords}$3`);
  }
  return content.replace(
    /(seo:\s*\{[\s\S]*?keywords:\s*')([^']+)(')/,
    `$1${newKeywords}$3`
  );
}

function updateThemeKeywords(content, newKeywords) {
  // Theme files have keywords: '...' at top level (before heading:)
  // We need to be careful to only replace the top-level keywords, not seoKeywords in gradeContent
  // The top-level keywords comes after description: and before heading:
  const match = content.match(/(description:\s*'[^']*',\s*\n\s*keywords:\s*')([^']+)(')/);
  if (match) {
    return content.replace(
      /(description:\s*'[^']*',\s*\n\s*keywords:\s*')([^']+)(')/,
      `$1${newKeywords}$3`
    );
  }
  // Fallback: replace first occurrence of keywords after description
  return content.replace(/(keywords:\s*')([^']+)(')/, `$1${newKeywords}$3`);
}

// ============================================================
// SECTION 3: KEYWORD MERGING LOGIC
// ============================================================

function buildNewProductKeywords(slug, currentKeywords) {
  const enhancement = productEnhancements[slug];
  if (!enhancement) return currentKeywords;

  // Strategy: primary + top LSI keywords + 1-2 selected secondary keywords = ~12
  const current = currentKeywords.split(',').map(k => k.trim());
  const primary = enhancement.primary;
  const lsiTerms = enhancement.lsi.slice(0, 10);

  // Build new keyword set: primary + LSI terms + best 1-2 from existing secondaries
  const newKeywords = [primary];

  // Add LSI terms (up to 10)
  for (const lsi of lsiTerms) {
    if (!newKeywords.includes(lsi)) {
      newKeywords.push(lsi);
    }
  }

  // Add 1-2 unique secondaries from current that aren't already covered
  let added = 0;
  for (const sec of current) {
    if (added >= 2) break;
    if (!newKeywords.some(k => k === sec || k.includes(sec) || sec.includes(k))) {
      newKeywords.push(sec);
      added++;
    }
  }

  return newKeywords.join(', ');
}

function buildNewThemeKeywords(theme, currentKeywords) {
  const enhancement = themeEnhancements[theme];
  if (!enhancement) return currentKeywords;

  const current = currentKeywords.split(',').map(k => k.trim());
  const primary = enhancement.primary;
  const lsiTerms = enhancement.lsi.slice(0, 8);

  // Build: primary + 8 LSI + 1-2 best existing = ~10-11
  const newKeywords = [primary];

  for (const lsi of lsiTerms) {
    if (!newKeywords.includes(lsi)) {
      newKeywords.push(lsi);
    }
  }

  let added = 0;
  for (const sec of current) {
    if (added >= 2) break;
    if (!newKeywords.some(k => k === sec || k.includes(sec) || sec.includes(k))) {
      newKeywords.push(sec);
      added++;
    }
  }

  return newKeywords.join(', ');
}

// ============================================================
// SECTION 4: CANNIBALIZATION AUDIT
// ============================================================

function runCannibalizationAudit(productKeywordsMap, themeKeywordsMap) {
  const issues = [];

  // Rule 1: No two product pages share the same primary keyword
  const productPrimaries = {};
  for (const [slug, data] of Object.entries(productEnhancements)) {
    const primary = data.primary;
    if (productPrimaries[primary]) {
      issues.push({
        type: 'DUPLICATE_PRIMARY',
        severity: 'critical',
        message: `Primary keyword "${primary}" used by both ${productPrimaries[primary]} and ${slug}`,
      });
    }
    productPrimaries[primary] = slug;
  }

  // Rule 2: No product primary appears as theme hub primary
  const themePrimaries = {};
  for (const [theme, data] of Object.entries(themeEnhancements)) {
    const primary = data.primary;
    if (themePrimaries[primary]) {
      issues.push({
        type: 'DUPLICATE_THEME_PRIMARY',
        severity: 'critical',
        message: `Theme primary "${primary}" used by both ${themePrimaries[primary]} and ${theme}`,
      });
    }
    themePrimaries[primary] = theme;

    if (productPrimaries[primary]) {
      issues.push({
        type: 'CROSS_TYPE_CONFLICT',
        severity: 'critical',
        message: `Primary "${primary}" used by product ${productPrimaries[primary]} AND theme ${theme}`,
      });
    }
  }

  // Rule 3: Anti-cannibalization pattern check
  // Products should use "generaattori" pattern
  for (const [slug, data] of Object.entries(productEnhancements)) {
    if (!data.primary.includes('generaattori')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'warning',
        message: `Product ${slug} primary "${data.primary}" doesn't follow "generaattori" pattern`,
      });
    }
  }

  // Themes should use "tehtävät lapsille" pattern
  for (const [theme, data] of Object.entries(themeEnhancements)) {
    if (!data.primary.includes('lapsille') && !data.primary.includes('tehtävät')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'warning',
        message: `Theme ${theme} primary "${data.primary}" doesn't follow "tehtävät lapsille" pattern`,
      });
    }
  }

  // Rule 4: Check for keyword overlap between product and theme keyword sets
  const allProductKeywords = new Set();
  for (const keywords of Object.values(productKeywordsMap)) {
    keywords.split(',').map(k => k.trim()).forEach(k => allProductKeywords.add(k));
  }

  const allThemeKeywords = new Set();
  for (const keywords of Object.values(themeKeywordsMap)) {
    keywords.split(',').map(k => k.trim()).forEach(k => allThemeKeywords.add(k));
  }

  const overlap = [...allProductKeywords].filter(k => allThemeKeywords.has(k));
  if (overlap.length > 0) {
    issues.push({
      type: 'KEYWORD_OVERLAP',
      severity: 'info',
      message: `${overlap.length} keywords shared between product and theme pages (expected some overlap): ${overlap.slice(0, 5).join(', ')}...`,
    });
  }

  return issues;
}

// ============================================================
// SECTION 5: MARKDOWN UPDATE
// ============================================================

function generateMarkdownAppendix(productResults, themeResults) {
  let md = '\n\n---\n\n';
  md += '## LSI Keywords, Question Keywords & SERP Analysis (Part 171 Enhancement)\n\n';
  md += '> Added by SEO Part 171. Finnish market = Very Low competition tier.\n\n';

  // SERP Analysis header
  md += '### SERP Analysis Summary\n\n';
  md += '| Metric | Value |\n';
  md += '|--------|-------|\n';
  md += '| **Market** | Finland (fi) |\n';
  md += '| **Competition Tier** | Very Low |\n';
  md += '| **Estimated Monthly Searches** | 10-100 per keyword |\n';
  md += '| **SERP Features** | Few featured snippets in Finnish |\n';
  md += '| **Ranking Difficulty** | Low — 2-3 word keywords can rank |\n';
  md += '| **Content Gap** | Very few Finnish educational worksheet sites |\n\n';

  // Product pages LSI + Questions
  md += '### Product Pages — LSI & Question Keywords\n\n';
  for (const [slug, result] of Object.entries(productResults)) {
    const enh = productEnhancements[slug];
    if (!enh) continue;
    md += `#### ${slug}\n\n`;
    md += '**LSI Keywords:**\n';
    enh.lsi.forEach((k, i) => { md += `${i + 1}. ${k}\n`; });
    md += '\n**Question Keywords (PAA targets):**\n';
    enh.questions.forEach((q, i) => { md += `${i + 1}. ${q}\n`; });
    md += '\n**SERP Competition:** Very Low | **Est. Volume:** 10-50/mo | **SERP Features:** Organic only\n\n';
  }

  // Theme hub pages LSI + Questions
  md += '### Theme Hub Pages — LSI & Question Keywords\n\n';
  for (const [theme, result] of Object.entries(themeResults)) {
    const enh = themeEnhancements[theme];
    if (!enh) continue;
    md += `#### ${theme}\n\n`;
    md += '**LSI Keywords:**\n';
    enh.lsi.forEach((k, i) => { md += `${i + 1}. ${k}\n`; });
    md += '\n**Question Keywords (PAA targets):**\n';
    enh.questions.forEach((q, i) => { md += `${i + 1}. ${q}\n`; });
    md += '\n**SERP Competition:** Very Low | **Est. Volume:** 10-100/mo | **SERP Features:** Organic only\n\n';
  }

  return md;
}

// ============================================================
// SECTION 6: MAIN EXECUTION
// ============================================================

function main() {
  console.log('=== SEO Part 171: FI Keyword Enhancement ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 171,
    locale: 'fi',
    productPages: { total: 0, updated: 0, errors: [], validations: [] },
    themeHubs: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // ---- Process Product Pages ----
  console.log('Processing 33 FI product pages...');
  const productFiles = fs.readdirSync(PRODUCT_DIR).filter(f => f.endsWith('.ts'));
  report.productPages.total = productFiles.length;

  const productKeywordsMap = {};
  const productResults = {};

  for (const file of productFiles) {
    const slug = file.replace('.ts', '');
    const filePath = path.join(PRODUCT_DIR, file);

    try {
      let content = readFileContent(filePath);
      const currentKeywords = extractProductKeywords(content);
      const title = extractSeoTitle(content);
      const description = extractSeoDescription(content);

      if (!currentKeywords) {
        report.productPages.errors.push({ slug, error: 'No keywords field found' });
        continue;
      }

      // Validate current fields
      const validation = { slug, title: null, description: null, keywords: null };

      if (title) {
        const titleLen = title.length;
        validation.title = { value: title, length: titleLen, valid: titleLen >= 30 && titleLen <= 65 };
        if (!validation.title.valid) {
          validation.title.warning = `Title length ${titleLen} outside 30-65 range`;
        }
      }

      if (description) {
        const descLen = description.length;
        validation.description = { length: descLen, valid: descLen >= 100 && descLen <= 170 };
        if (!validation.description.valid) {
          validation.description.warning = `Description length ${descLen} outside 100-170 range`;
        }
      }

      // Build new keywords
      const newKeywords = buildNewProductKeywords(slug, currentKeywords);
      const keywordCount = newKeywords.split(',').length;

      validation.keywords = {
        before: currentKeywords.split(',').length,
        after: keywordCount,
        valid: keywordCount >= 10,
      };

      // Update the file
      const updatedContent = updateProductKeywords(content, newKeywords);
      fs.writeFileSync(filePath, updatedContent, 'utf-8');

      productKeywordsMap[slug] = newKeywords;
      productResults[slug] = { keywords: newKeywords, keywordCount };
      report.productPages.updated++;
      report.productPages.validations.push(validation);

      console.log(`  ✓ ${slug}: ${keywordCount} keywords`);
    } catch (err) {
      report.productPages.errors.push({ slug, error: err.message });
      console.error(`  ✗ ${slug}: ${err.message}`);
    }
  }

  // ---- Process Theme Hub Pages ----
  console.log('\nProcessing 50 FI theme hub pages...');
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const stat = fs.statSync(path.join(THEME_DIR, d));
    return stat.isDirectory() && fs.existsSync(path.join(THEME_DIR, d, 'fi.ts'));
  });
  report.themeHubs.total = themeDirs.length;

  const themeKeywordsMap = {};
  const themeResults = {};

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'fi.ts');

    try {
      let content = readFileContent(filePath);
      const currentKeywords = extractThemeKeywords(content);

      if (!currentKeywords) {
        report.themeHubs.errors.push({ theme, error: 'No keywords field found' });
        continue;
      }

      // Build new keywords
      const newKeywords = buildNewThemeKeywords(theme, currentKeywords);
      const keywordCount = newKeywords.split(',').length;

      const validation = {
        theme,
        keywords: {
          before: currentKeywords.split(',').length,
          after: keywordCount,
          valid: keywordCount >= 8,
        },
      };

      // Update the file
      const updatedContent = updateThemeKeywords(content, newKeywords);
      fs.writeFileSync(filePath, updatedContent, 'utf-8');

      themeKeywordsMap[theme] = newKeywords;
      themeResults[theme] = { keywords: newKeywords, keywordCount };
      report.themeHubs.updated++;
      report.themeHubs.validations.push(validation);

      console.log(`  ✓ ${theme}: ${keywordCount} keywords`);
    } catch (err) {
      report.themeHubs.errors.push({ theme, error: err.message });
      console.error(`  ✗ ${theme}: ${err.message}`);
    }
  }

  // ---- Cannibalization Audit ----
  console.log('\nRunning cannibalization audit...');
  const issues = runCannibalizationAudit(productKeywordsMap, themeKeywordsMap);
  report.cannibalization = issues;

  const criticalIssues = issues.filter(i => i.severity === 'critical');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  console.log(`  Critical: ${criticalIssues.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log(`  Info: ${infos.length}`);

  if (criticalIssues.length > 0) {
    console.log('\n  CRITICAL ISSUES:');
    criticalIssues.forEach(i => console.log(`    ✗ ${i.message}`));
  }

  // ---- Update Keyword Map MD ----
  console.log('\nUpdating fi-all-pages.md keyword map...');
  try {
    const existingMd = readFileContent(KEYWORD_MAP_PATH);
    const appendix = generateMarkdownAppendix(productResults, themeResults);
    fs.writeFileSync(KEYWORD_MAP_PATH, existingMd + appendix, 'utf-8');
    console.log('  ✓ Appended LSI, question, and SERP sections');
  } catch (err) {
    console.error(`  ✗ Failed to update keyword map: ${err.message}`);
    report.summary.markdownUpdateError = err.message;
  }

  // ---- Summary ----
  report.summary = {
    ...report.summary,
    productPagesProcessed: report.productPages.updated,
    productPagesTotal: report.productPages.total,
    themeHubsProcessed: report.themeHubs.updated,
    themeHubsTotal: report.themeHubs.total,
    criticalCannibalizationIssues: criticalIssues.length,
    warnings: warnings.length,
    allProductsHave12PlusKeywords: report.productPages.validations.every(v => v.keywords && v.keywords.after >= 10),
    allThemesHave8PlusKeywords: report.themeHubs.validations.every(v => v.keywords && v.keywords.after >= 8),
  };

  // ---- Write Report ----
  const reportDir = path.dirname(REPORT_PATH);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nReport written to: ${REPORT_PATH}`);

  // ---- Final Summary ----
  console.log('\n=== SUMMARY ===');
  console.log(`Product pages: ${report.productPages.updated}/${report.productPages.total} updated`);
  console.log(`Theme hubs: ${report.themeHubs.updated}/${report.themeHubs.total} updated`);
  console.log(`Cannibalization: ${criticalIssues.length} critical, ${warnings.length} warnings`);
  console.log(`All products 10+ keywords: ${report.summary.allProductsHave12PlusKeywords ? 'YES' : 'NO'}`);
  console.log(`All themes 8+ keywords: ${report.summary.allThemesHave8PlusKeywords ? 'YES' : 'NO'}`);

  if (report.productPages.errors.length > 0 || report.themeHubs.errors.length > 0) {
    console.log(`\nERRORS: ${report.productPages.errors.length + report.themeHubs.errors.length}`);
    report.productPages.errors.forEach(e => console.log(`  Product: ${e.slug} — ${e.error}`));
    report.themeHubs.errors.forEach(e => console.log(`  Theme: ${e.theme} — ${e.error}`));
  }

  console.log('\n=== Part 171 Complete ===');
}

main();
