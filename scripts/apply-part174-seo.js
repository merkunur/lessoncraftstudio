/**
 * Part 174: FI Product Pages 1-7 — Content Enrichment
 *
 * Populates empty arrays (features, useCases, faq, relatedApps) and adds
 * SEO enrichment fields (aiOverviewSnippet, comparisonTable, researchBacking,
 * teacherTestimonials, tips) for 7 Finnish product pages.
 *
 * Usage: node scripts/apply-part174-seo.js
 */

const fs = require('fs');
const path = require('path');

const FI_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'fi');

// ---------------------------------------------------------------------------
// Helper: Convert JS value to TypeScript-formatted string
// ---------------------------------------------------------------------------
function jsToTs(value, indent = 0) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);

  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => `${inner}${jsToTs(v, indent + 2)},`).join('\n');
    return `[\n${items}\n${pad}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    const props = entries.map(([k, v]) => `${inner}${k}: ${jsToTs(v, indent + 2)},`).join('\n');
    return `{\n${props}\n${pad}}`;
  }
  return String(value);
}

// ===================================================================
// 1. WORD SEARCH (sananhaku-tyoarkit)
// ===================================================================
const wordSearch = {
  file: 'word-search-worksheets.ts',
  features: [
    { id: '1', icon: '\u{1f4dd}', title: 'Mukautettavat sanalistat', description: 'Kirjoita omat sanastosanat tai anna generaattorin poimia sanat valituista kuvista. Rakenna sanahakupulmia mink\u00e4 tahansa aiheen, sanastolistan tai opetussuunnitelman yksik\u00f6n ymp\u00e4rille. Yhdist\u00e4 kirjoitetut sanat ja kuvapohjaiset sanat samaan pulmaan joustavasti.' },
    { id: '2', icon: '\u{1f4d0}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ruudukon koko', description: 'Valitse ruudukon koko 5x5 esikoululaisille aina 30x30 edistyneille oppilaille. Aseta rivit ja sarakkeet erikseen. Pienempi ruudukko pit\u00e4\u00e4 pulmat hallittavina alkavalle lukijalle, suurempi ruudukko haastaa vanhempia oppilaita.' },
    { id: '3', icon: '\u{1f500}', title: 'Sanasuunnan hallinta', description: 'Ota k\u00e4ytt\u00f6\u00f6n tai poista vaakasuorat, pystysuorat, viistot ja k\u00e4\u00e4nteissanat itsen\u00e4isesti. Yksinkertaista pulmia alkavalle lukijalle rajoittamalla pelk\u00e4st\u00e4\u00e4n vaakasuoriin. Lis\u00e4\u00e4 viistoja ja k\u00e4\u00e4nteisi\u00e4 suuntia asteittain oppilaiden kehittyess\u00e4.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa vihjeiksi', description: 'Selaa yli 3000 lapsiystavallista kuvaa koulutusaiheittain. K\u00e4yt\u00e4 kuvavihjeit\u00e4 sanalistojen sijaan, jotta esiopetuksen oppilaat ja S2-oppilaat voivat osallistua. Oppilas tunnistaa kuvan ja etsii vastaavan sanan kirjainruudukosta.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset v\u00e4rikoodatut vastausavaimet', description: 'Jokainen sanahakupulma tuottaa automaattisesti v\u00e4rikoodatun vastausavaimen. Jokainen piilotettu sana korostetaan omalla v\u00e4rill\u00e4\u00e4n n\u00e4ytt\u00e4en tarkan sijainnin ja suunnan. Opettajat tarkistavat oppilasty\u00f6t sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'Muokkausty\u00f6kalu teht\u00e4vien kustomointiin', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista pulman osia. Lis\u00e4\u00e4 mukautettua teksti\u00e4, vaihda fontteja ja v\u00e4rej\u00e4, lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 t\u00e4ydet kaupalliset oikeudet myyd\u00e4 sanahakuteht\u00e4vi\u00e4 verkossa. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja. Rakenna kannattava pulmakokoelmien liiketoiminta.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki sanastoharjoitteluun', description: 'Luo sanahakupulmia 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja ja tanska. Vaihda kielt\u00e4 luodaksesi monikielisi\u00e4 pulmia, jotka yhdist\u00e4v\u00e4t kotikielen ja kohdekielen sanastoa. T\u00e4ydellinen S2-opetukseen ja kielikylpyohjelmiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Pienet ruudukot ja kuvavihjeet alkavalle lukijalle', description: 'Luo pieni\u00e4 5x5 tai 8x8 ruudukoita vaakasuoralla sanasijoittelulla ja kuvavihjein\u00e4. Esiopetuksen oppilaat tunnistavat kuvia ja etsiv\u00e4t 3\u20134 kirjaimen sanoja. T\u00e4ydellinen lukemisvalmiuden ja kirjaintuntemuksen kehitt\u00e4miseen POPS 2014 tavoitteiden mukaisesti.' },
    { id: '2', icon: '\u{1f4d6}', title: 'Alakoulun opettajat', subtitle: 'Sanastoharjoittelu opetussuunnitelman mukaisesti', description: 'Generoi sanastoharjoituspulmia viikon sanalistojen ja lukuyksik\u00f6iden mukaan. K\u00e4yt\u00e4 10x15 ruudukoita viistoilla sanoilla 1.\u20132. luokalle. Luo teemallisia sanahakuja, jotka yhdist\u00e4v\u00e4t ymp\u00e4rist\u00f6opin, \u00e4idinkielen ja matematiikan sanastoa.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Teemapaketteja minuuteissa', description: 'Rakenna teemallisia oppimispaketteja sanahakupulmilla. Yhdist\u00e4 el\u00e4in-, luonto- tai vuodenaikateemoja useissa teht\u00e4v\u00e4tyypeiss\u00e4. Generoi koko viikon sanastoharjoittelun 15 minuutissa mukautettavalla vaikeustasolla.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikieliset pulmat 11 kielell\u00e4', description: 'Luo sanahakupulmia 11 kielell\u00e4 rakentaaksesi visuaalista sanastoa suomi toisena kielen\u00e4 -oppijoille. Kuvavihjeet tarjoavat yleisen kontekstin samalla kun piilotetut sanat vahvistavat kohdekielen oikeinkirjoitusta.' },
    { id: '5', icon: '\u{1f9e9}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso jokaiselle oppijalle', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa, sanam\u00e4\u00e4r\u00e4\u00e4 ja suuntavaihtoehtojen monimutkaisuutta jokaisen oppilaan lukutason mukaan. Pienet ruudukot vaakasuorilla sanoilla tukevat heikompia lukijoita. Visuaalinen etsint\u00e4 vahvistaa kirjaintuntemusta oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy pulmakokoelmia kaupallisella lisenssill\u00e4', description: 'Luo teemallisia sanahakukokoelmia myyt\u00e4v\u00e4ksi verkossa. Vuodenaikojen, juhlap\u00e4ivien ja opetussuunnitelman mukaiset pulmapaketit myyv\u00e4t tasaisesti. Kaupallinen lisenssi kattaa rajattomat myynnit ilman attribuutiovaatimuksia.' },
  ],
  faq: [
    { id: '1', question: 'Miten sanahakugeneraattori luo pulmia kuvista?', answer: 'Generaattori muuntaa kuvavihjeet automaattisesti piilotetuksi sanapulmaksi. Valitse teema kuten el\u00e4imet tai ruoka, ja sovellus tunnistaa jokaisen kuvan, sijoittaa vastaavan sanan ruudukkoon ja t\u00e4ytt\u00e4\u00e4 ymp\u00e4r\u00f6iv\u00e4t ruudut satunnaisilla kirjaimilla. Oppilaat katsovat kuvavihjeit\u00e4 ja etsiv\u00e4t vastaavan sanan ruudukosta.' },
    { id: '2', question: 'Mit\u00e4 ruudukon kokoja on saatavilla?', answer: 'Sanahakuteht\u00e4v\u00e4t tukevat ruudukon kokoja 5x5:st\u00e4 aina 30x30:een. Pienemm\u00e4t ruudukot kuten 5x5 tai 8x8 sopivat parhaiten esiopetuksen oppilaille. Keskikokoiset 10x15 ruudukot sopivat 1.\u20132. luokan sanastoharjoitteluun. Suuremmat ruudukot haastavat vanhempia oppilaita.' },
    { id: '3', question: 'Voivatko sanahakupulmat sis\u00e4lt\u00e4\u00e4 viistoja ja k\u00e4\u00e4nteisi\u00e4 sanoja?', answer: 'Kyll\u00e4, voit hallita sanasuuntia jokaisessa pulmassa. Ota k\u00e4ytt\u00f6\u00f6n vaakasuora, pystysuora, viisto ja k\u00e4\u00e4nteinen sanasijoittelu itsen\u00e4isesti. Esiopetuksen teht\u00e4viss\u00e4 k\u00e4ytet\u00e4\u00e4n yleens\u00e4 vain vaakasuoria ja pystysuoria sanoja. Alakoulun teht\u00e4viin lis\u00e4t\u00e4\u00e4n viistoja sanoja lis\u00e4haasteeksi.' },
    { id: '4', question: 'Kuinka monta sanaa mahtuu yhteen sanahakuteht\u00e4v\u00e4\u00e4n?', answer: 'Sanam\u00e4\u00e4r\u00e4 riippuu ruudukon koosta ja sanojen pituudesta. 10x10 ruudukko sis\u00e4lt\u00e4\u00e4 mukavasti 8\u201312 sanaa. 15x15 ruudukko sopii 12\u201320 sanalle. Generaattori optimoi sanojen sijoittelun automaattisesti v\u00e4ltt\u00e4en p\u00e4\u00e4llekk\u00e4isyyksi\u00e4.' },
    { id: '5', question: 'Sis\u00e4lt\u00e4\u00e4k\u00f6 generaattori vastausavaimet?', answer: 'Jokainen sanahakuteht\u00e4v\u00e4 generoi t\u00e4ydellisen vastausavaimen automaattisesti. Vastausavain korostaa kaikki piilotetut sanat v\u00e4rikoodatuin merkinnein n\u00e4ytt\u00e4en tarkat sijainnit ja suunnat. Opettajat voivat tulostaa vastausavaimen erikseen tai n\u00e4ytt\u00e4\u00e4 sen dokumenttikameralla.' },
    { id: '6', question: 'Mille ik\u00e4ryhmille sanahakuteht\u00e4v\u00e4t sopivat?', answer: 'Sanahakuteht\u00e4v\u00e4t palvelevat 4\u201312-vuotiaita useilla taitotasoilla. Esikouluik\u00e4iset 4\u20135-vuotiaat k\u00e4ytt\u00e4v\u00e4t pieni\u00e4 ruudukoita yksinkertaisilla sanoilla. Esiopetuksen ja 1. luokan oppilaat harjoittelevat sanastoa keskikokoisissa ruudukoissa. 2.\u20133. luokan oppilaat ratkaisevat haastavia pulmia.' },
    { id: '7', question: 'Sopivatko sanahakuteht\u00e4v\u00e4t esiopetukseen?', answer: 'Sanahakuteht\u00e4v\u00e4t sopivat erinomaisesti esiopetukseen oikein asetuksin. K\u00e4yt\u00e4 5x5 tai 8x8 ruudukoita pelk\u00e4ll\u00e4 vaakasuoralla sijoittelulla. Valitse 3\u20135 kirjaimen sanoja POPS 2014 \u00e4idinkielen tavoitteiden mukaisesti. Kuvavihjeet mahdollistavat osallistumisen ilman itsen\u00e4ist\u00e4 lukutaitoa.' },
    { id: '8', question: 'Voiko teht\u00e4vi\u00e4 luoda useilla kielill\u00e4?', answer: 'Generaattori luo pulmia 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja, tanska, englanti, saksa, ranska ja espanja. Vaihda kielt\u00e4 luodaksesi sanastopulmia mill\u00e4 tahansa tuetulla kielell\u00e4. S2-opettajat hy\u00f6dynt\u00e4v\u00e4t monikielisi\u00e4 pulmia kotikielen ja kohdekielen yhdist\u00e4miseen.' },
    { id: '9', question: 'Miten tulostan sanahakuteht\u00e4v\u00e4t kotona?', answer: 'Lataa sanahakuteht\u00e4v\u00e4si korkealaatuisena PDF-tiedostona. Valitse A4 tai Letter-sivukoko ennen lataamista. Kaikki teht\u00e4v\u00e4t ovat 300 DPI resoluutiolla ter\u00e4v\u00e4n tekstin ja selkeiden ruudukkoviivojen varmistamiseksi. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta.' },
    { id: '10', question: 'Kuinka kauan yhden sanahakuteht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden sanahakuteht\u00e4v\u00e4n luominen vie noin 2\u20133 minuuttia. Valitse teema ja kuvat 30 sekunnissa. M\u00e4\u00e4rit\u00e4 ruudukon koko ja suunnat 20 sekunnissa. Generaattori rakentaa pulman v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat koko viikon sanahakuharjoitukset 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani sanahakuteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin sanahakuteht\u00e4vien myyntiin verkossa. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja. Luo luokkahuonekelpoisia sanahakuja ja myy niit\u00e4 digitaalisina latauksina.' },
    { id: '12', question: 'Miten sanahakuteht\u00e4v\u00e4t tukevat POPS 2014 opetussuunnitelmaa?', answer: 'Sanahakuteht\u00e4v\u00e4t tukevat \u00e4idinkielen ja kirjallisuuden (AI) tavoitteita sanavaraston laajentamisessa, oikeinkirjoituksen harjoittelussa ja sanan tunnistamisessa. Opettajat kohdistavat sanastoa lukuyksik\u00f6ist\u00e4, ymp\u00e4rist\u00f6opin aiheista tai teemakokonaisuuksista. Kuvavihjeet tukevat visuaalisia oppijoita POPS 2014 eriytett\u00e4misperiaatteiden mukaisesti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sanansekoitus-tyoarkit', name: 'Sanansekoitus', category: '\u00c4idinkieli', icon: '\u{1f524}', description: 'Yhdist\u00e4 sanahakupulmat sanansekoitusteht\u00e4viin kaksinkertaiseen sanastoharjoitteluun. Oppilaat etsiv\u00e4t piilotettuja sanoja yhdess\u00e4 pulmassa ja sekoittavat samoja sanoja toisessa.' },
    { id: '2', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'Yhdist\u00e4 sanahaut t\u00e4yt\u00e4-puuttuva-kirjain -teht\u00e4viin kattavaan oikeinkirjoitusharjoitteluun. Oppilaat tunnistavat sanoja ruudukossa ja tuottavat puuttuvia kirjaimia toisessa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '3', slug: 'ristisanatehtavat-tyoarkit', name: 'Ristisanateht\u00e4v\u00e4t', category: '\u00c4idinkieli', icon: '\u2795', description: 'Luo kattavia sanastopaketteja lis\u00e4\u00e4m\u00e4ll\u00e4 ristisanateht\u00e4vi\u00e4 sanahakujen rinnalle. Oppilaat kohtaavat samat teemasanat eri teht\u00e4v\u00e4muodoissa, mik\u00e4 vahvistaa muistiin painamista.' },
    { id: '4', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Yhdist\u00e4 sanahakupulmat aakkosj\u00e4rjestysharjoituksiin varhaisen lukutaidon paketteihin. Esiopetuksen oppilaat harjoittelevat kirjaintuntemusta sanahauissa ja vahvistavat aakkosj\u00e4rjestyst\u00e4 juna-teht\u00e4vill\u00e4.' },
    { id: '5', slug: 'kuvakryptogrammi-tyoarkit', name: 'Kuvakryptogrammi', category: '\u00c4idinkieli', icon: '\u{1f510}', description: 'Haasta edistyneempi\u00e4 oppilaita kryptogrammi-koodinmurtoharjoituksilla sanahakupulmien rinnalla. Molemmat muodot kehitt\u00e4v\u00e4t hahmontunnistusta ja kirjainanalyysi\u00e4 eri konteksteissa.' },
    { id: '6', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Sanasto', icon: '\u{1f517}', description: 'Lis\u00e4\u00e4 kuva-sana-yhdist\u00e4misteht\u00e4vi\u00e4 t\u00e4ydent\u00e4m\u00e4\u00e4n sanahakujen sanastoharjoittelua. Oppilaat yhdist\u00e4v\u00e4t kuvia sanoihin yhdess\u00e4 teht\u00e4v\u00e4ss\u00e4 ja etsiv\u00e4t samoja sanoja toisessa.' },
  ],
  aiOverviewSnippet: 'Sanahakugeneraattori on verkkotyokalu, jolla luodaan tulostettavia kirjainruudukko-pulmia mukautetuista sanalistoista tai teemakuvavihjeista. Opettajat valitsevat ruudukon koon, sanasuunnat ja vaikeustason, ja lataavat valmiin PDF-tehtavan automaattisella varikoodatulla vastausavaimella alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Ruudukon joustavuus', ourApp: '5x5 \u2013 30x30, itsen\u00e4inen rivi/sarake-hallinta', typical: 'Kiinte\u00e4t ruudukkokoot (10x10 tai 15x15)' },
    { feature: 'Sanasuunnat', ourApp: 'Vaakasuora, pystysuora, viisto, k\u00e4\u00e4nteinen erikseen', typical: 'Kaikki suunnat aina p\u00e4\u00e4ll\u00e4' },
    { feature: 'Kuvavihjeet', ourApp: '3000+ teemakuvaa visuaalisina vihjein\u00e4', typical: 'Vain tekstipohjaiset sanalistat' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen v\u00e4rikoodattu avain joka pulmaan', typical: 'Manuaalinen tai lis\u00e4maksullinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Sanahakuharjoitukset vahvistavat sanantunnistusta ja visuaalista etsint\u00e4\u00e4 vaatimalla oppilaita tunnistamaan tarkkoja kirjainsarjoja h\u00e4iri\u00f6tekij\u00f6iden joukosta, mik\u00e4 rakentaa ortografista prosessointisujuvuutta.', source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY' },
    { claim: 'Sanavaraston omaksuminen paranee kun oppilaat kohtaavat kohdisanoja useissa eri muodoissa mukaan lukien pulmat, sill\u00e4 monipuolinen altistus syvent\u00e4\u00e4 sanastollisia representaatioita pelk\u00e4n ulkoa opettelun sijaan.', source: 'Niilo M\u00e4ki Instituutti, "Lukemisen ja kirjoittamisen tuen tutkimus," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Ekaluokkalaiseni pyytvat sanahakuharjoituksia joka lukutunnilla. Kuvavihjeet mahdollistavat heikompienkin lukijoiden osallistumisen ja voin saataa ruudukon kokoa niin etta jokainen onnistuu.', name: 'Minna Korhonen', role: '1. luokan opettaja', school: 'Puistolan koulu, Helsinki' },
    { quote: 'Myyn teemallisia sanahakukokoelmia verkossa ja tama generaattori pienensi tuotantoaikani kahdesta tunnista viiteentoista minuuttiin per paketti. Vastausavaimet yksinaan saastavat valtavasti muotoilutyota.', name: 'Antti Virtanen', role: 'Opettajayritttaja', school: 'OpeVirtanen verkkokauppa' },
  ],
  tips: {
    sectionTitle: 'Sanahakustrategiat luokka-asteittain',
    sectionDescription: 'Saada sanahakugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Nain asetat ruudukon koon, sanasuunnat ja sanavaraston monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kirjaintunnistus ruudukossa', description: 'Kaytta 5x5 ruudukoita pelkalla vaakasuoralla sijoittelulla ja 3\u20134 yksinkertaisella kolmikirjaimisella sanalla. Valitse kuvavihjetta tutuista teemoista kuten elaimet tai varit. Esikoululaiset harjoittelevat yksittaisten kirjainten tunnistamista ruudukosta.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Nakosanahaut', description: 'Luo 8x8 ruudukoita vaaka- ja pystysanoilla kayttaen yleisia sanoja. Ota kuvavihjeet kayttoon jotta lukemaan oppivat tunnistavat kohdesanat visuaalisesti. Rajoita 5\u20136 sanaan per pulma keskittymisen ja itseluottamuksen rakentamiseksi.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Sanastoharjoituspulmat', description: 'Generoi 10x12 ruudukoita lisaamalla viisto sanasijoittelu lisahaasteeksi. Kaytta 8\u201310 sanaa viikon sanalistoista tai lukuyksikon sanastosta. Ekaluokkalaiset kehittavat jarjestelmallista etsintastrategiaa rivi riviltaa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Teemapohjaiset akateemiset pulmat', description: 'Rakenna 12x15 ruudukoita kaikilla suunnilla mukaan lukien kaanteissanat. Sisallyta 10\u201315 ymparistopin tai aidinkielen sanastosanaa. Toisluokkalaiset vahvistavat oikeinkirjoitusta tunnistaessaan tarkkoja kirjainsarjoja.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Haastepulmat', description: 'Luo 15x20 tai suurempia ruudukoita kaanteisilla ja viistoilla sanoilla ja 15\u201320 monitavuisella sanalla. Kaytta akateemista sanastoa ja ainekohtaista terminologiaa POPS 2014 vuosiluokkien 3\u20136 tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 2. ADDITION (yhteenlasku-tyoarkit)
// ===================================================================
const addition = {
  file: 'yhteenlasku-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u26a1', title: 'Nelja tehtavatyyppia visuaaliseen laskemiseen', description: 'Valitse nelj\u00e4st\u00e4 teht\u00e4v\u00e4tyypist\u00e4: kuva+kuva, kuva+numero, puuttuva yhteenlaskettava ja sekamuoto. Kuva+kuva sopii konkreettisen vaiheen oppijoille. Puuttuvan yhteenlaskettavan etsint\u00e4 kehitt\u00e4\u00e4 algebrallista ajattelua.' },
    { id: '2', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa laskutehtaviin', description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain: elaimet, kulkuneuvot, ruoka, lelut ja kymmenia muita kategorioita. Valitse teema tai yksittaiset kuvat vastaamaan opetussuunnitelman aihealuetta. Kaikki kuvat soveltuvat esiopetukseen ja alakouluun.' },
    { id: '3', icon: '\u{1f4ca}', title: 'Saadettava vaikeustaso ja lukualue', description: 'Aseta yhteenlaskujen lukualue 1\u201320 ja teht\u00e4vien m\u00e4\u00e4r\u00e4 sivua kohti 1\u201310. Esiopetuksen oppilaille summat 5:een asti ja 1\u20132 teht\u00e4v\u00e4\u00e4 sivulla. Kolmasluokkalaisille kaikki yhteenlaskufaktat ja 8\u201310 teht\u00e4v\u00e4\u00e4 sivulla.' },
    { id: '4', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen yhteenlaskuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kaikki oikeat vastaukset n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat tarkistavat oppilasty\u00f6t sekunneissa. Tulosta vastausavaimet erikseen itsetarkistuspisteille.' },
    { id: '5', icon: '\u{1f3a8}', title: 'Taustakuvat ja koristeelliset kehykset', description: 'Valitse kymmenist\u00e4 taustamuodoista kuten liitutaulu, ruutuvihko, sateenkaari ja vuodenaikaisuunnittelu. Lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 t\u00e4hdin, sydamin tai koulutarvikkein. Ammattimainen ulkoasu lis\u00e4\u00e4 oppilaiden sitoutumista.' },
    { id: '6', icon: '\u{1f4e4}', title: 'Omien kuvien lataus', description: 'Lataa rajattomasti omia kuvia luodaksesi henkil\u00f6kohtaisia yhteenlaskuteht\u00e4vi\u00e4. K\u00e4yt\u00e4 luokkahuonekuvia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvia. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kanssa.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 luomiasi yhteenlaskuteht\u00e4vi\u00e4 verkossa. Luo teemapaketteja ja myy niit\u00e4 digitaalisina latauksina. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo yhteenlaskuteht\u00e4vi\u00e4 11 kielell\u00e4. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen. K\u00e4ytt\u00f6liittym\u00e4n kieli ja teht\u00e4v\u00e4n kieli vaihtuvat itsen\u00e4isesti. Vaihda kielen v\u00e4lill\u00e4 yhdell\u00e4 klikkauksella.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f469}\u200d\u{1f3eb}', title: 'Esiopetuksen opettajat', subtitle: 'Kuvapohjaiset yhteenlaskut 5\u20136-vuotiaille', description: 'Luo visuaalisia yhteenlaskuteht\u00e4vi\u00e4, joissa oppilaat laskevat kuvia summan l\u00f6yt\u00e4miseksi. Kuva+kuva-muoto tukee konkreettista laskemista. Summat 5:een asti ja 1\u20132 teht\u00e4v\u00e4\u00e4 sivulla. T\u00e4ydellinen POPS 2014 matematiikan tavoitteen T2 tukemiseen.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Laskusujuvuuden kehitt\u00e4minen 1.\u20133. luokalle', description: 'Hy\u00f6dynn\u00e4 nelj\u00e4\u00e4 teht\u00e4v\u00e4tyyppi\u00e4 progressiiviseen oppimiseen: kuva+kuva syksyll\u00e4, kuva+numero talvella, puuttuva yhteenlaskettava kev\u00e4\u00e4ll\u00e4. Eriyt\u00e4 teht\u00e4vi\u00e4 vaikeustason ja teht\u00e4v\u00e4tyypin mukaan.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Joustavia teht\u00e4vi\u00e4 useille luokka-asteille', description: 'Luo eri vaikeustason teht\u00e4vi\u00e4 kaikille lapsillesi yhdell\u00e4 tilauksella. Henkil\u00f6kohtaista teht\u00e4vi\u00e4 lataamalla perhekuvia tai lemmikkej\u00e4. Oppilaat sitoutuvat enemm\u00e4n tuttujen kuvien kanssa.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 matematiikan harjoittelu', description: 'Kuvapohjaiset teht\u00e4v\u00e4t mahdollistavat matematiikan harjoittelun ilman kielitaitovaatimuksia. Luo teht\u00e4vi\u00e4 oppilaan kotikielell\u00e4 ensin ja siirry asteittain suomeen. 11 kielen tuki kattaa yleisimm\u00e4t kotikielet.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt teht\u00e4v\u00e4t oppimisen tukeen', description: 'S\u00e4\u00e4d\u00e4 teht\u00e4vien m\u00e4\u00e4r\u00e4\u00e4, lukualuetta ja teht\u00e4v\u00e4tyyppi\u00e4 HOJKS-tavoitteiden mukaisesti. Luo selkeit\u00e4 teht\u00e4vi\u00e4 v\u00e4hemmill\u00e4 elementeill\u00e4 prosessointikuorman kevent\u00e4miseksi. Visuaaliset teht\u00e4v\u00e4t tukevat erilaisia oppijoita.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy matematiikkapaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia yhteenlaskupaketteja myyntiin verkossa. Matematiikkateht\u00e4v\u00e4t ovat jatkuvasti suosituimpia oppimateriaalikauppojen tuotteita. Yhteenlaskuteht\u00e4v\u00e4paketit 10\u201320 teht\u00e4v\u00e4\u00e4 per paketti myyv\u00e4t hyvin.' },
  ],
  faq: [
    { id: '1', question: 'Mitka tehtavatyypit ovat saatavilla yhteenlaskutehtaviin?', answer: 'Generaattori tarjoaa nelj\u00e4 teht\u00e4v\u00e4tyyppi\u00e4: kuva+kuva n\u00e4ytt\u00e4\u00e4 kuvat molemmista luvuista, kuva+numero yhdist\u00e4\u00e4 kuvia ja numeroita, puuttuva yhteenlaskettava luo t\u00e4yt\u00e4-aukkoteht\u00e4vi\u00e4, ja sekamuoto yhdist\u00e4\u00e4 eri tyyppej\u00e4 samalle sivulle.' },
    { id: '2', question: 'Miten saadan vaikeustasoa yhteenlaskutehtavissa?', answer: 'S\u00e4\u00e4d\u00e4 lukualuetta 1\u201320, valitse teht\u00e4vien m\u00e4\u00e4r\u00e4 sivua kohti (1\u201310) ja valitse teht\u00e4v\u00e4tyyppi. Esiopetukseen sopii kuva+kuva summilla 5 asti. Kolmasluokkalaisille k\u00e4yt\u00e4 sekamuotoa summilla 20 asti ja 8\u201310 teht\u00e4v\u00e4\u00e4 sivulla.' },
    { id: '3', question: 'Sisaltavatko yhteenlaskutehtavat vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kaikki oikeat vastaukset n\u00e4kyv\u00e4t selke\u00e4sti. Tulosta vastausavaimet erikseen tai n\u00e4yt\u00e4 dokumenttikameralla luokan yhteiseen tarkistukseen.' },
    { id: '4', question: 'Mille ikarryhmille yhteenlaskutehtavat sopivat?', answer: 'Yhteenlaskuteht\u00e4v\u00e4t palvelevat 4\u20139-vuotiaita. Esikouluik\u00e4iset harjoittelevat summia 5 asti kuvilla. Esiopetuksen oppilaat hallitsevat summat 10 asti. 1.\u20132. luokan oppilaat kehitt\u00e4v\u00e4t laskusujuvuutta summiin 20 asti. 3. luokan oppilaat vahvistavat automaattista faktojen muistamista.' },
    { id: '5', question: 'Voiko tehtavia luoda 11 kielella?', answer: 'Kyll\u00e4, generaattori tukee 11 kielt\u00e4 mukaan lukien suomi, ruotsi, norja ja tanska. K\u00e4ytt\u00f6liittym\u00e4n kieli ja teht\u00e4v\u00e4n sis\u00e4lt\u00f6kieli vaihtuvat itsen\u00e4isesti. Luo suomenkielisi\u00e4 teht\u00e4vi\u00e4 monikielisille luokkahuoneille.' },
    { id: '6', question: 'Tarvitaanko suunnitteluosaamista tehtavien luomiseen?', answer: 'Ei tarvita mit\u00e4\u00e4n suunnittelutaitoja. Generaattori hoitaa asettelun ja muotoilun automaattisesti. Valitse kuvat ja asetukset, klikkaa generoi, ja ammattimainen teht\u00e4v\u00e4 ilmestyy v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat oppivat k\u00e4ytt\u00e4m\u00e4\u00e4n generaattoria alle 10 minuutissa.' },
    { id: '7', question: 'Voinko ladata omia kuvia yhteenlaskutehtaviin?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia luodaksesi henkil\u00f6kohtaisia teht\u00e4vi\u00e4. K\u00e4yt\u00e4 luokkahuonekuvia, retk ikuvia tai lemmikkikuvia. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa samalla teht\u00e4v\u00e4ll\u00e4.' },
    { id: '8', question: 'Miten yhteenlaskutehtavat tukevat POPS 2014 tavoitteita?', answer: 'Teht\u00e4v\u00e4t tukevat suoraan POPS 2014 matematiikan tavoitteita T2 (lukum\u00e4\u00e4r\u00e4n ja laskemisen ymm\u00e4rrys) ja T3 (sujuvuus yhteen- ja v\u00e4hennyslaskussa). Kuvapohjaiset teht\u00e4v\u00e4t konkretisoivat matemaattisia k\u00e4sitteit\u00e4 POPS 2014 toiminnallisen oppimisen periaatteiden mukaisesti.' },
    { id: '9', question: 'Kuinka kauan yhden tehtavan luominen kestaa?', answer: 'Yhden yhteenlaskuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat 30 sekunnissa, m\u00e4\u00e4rit\u00e4 asetukset 30 sekunnissa, generoi teht\u00e4v\u00e4 10 sekunnissa. Luo 10\u201320 teht\u00e4v\u00e4\u00e4 30 minuutissa.' },
    { id: '10', question: 'Voinko myydaa luomiani yhteenlaskutehtavia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy teht\u00e4vi\u00e4 verkossa ilman attribuutiovaatimuksia tai lis\u00e4maksuja. Monet opettajat ansaitsevat lis\u00e4tuloja myym\u00e4ll\u00e4 teemallisia matematiikkapaketteja.' },
    { id: '11', question: 'Miten harmaasavyvaihtoehto toimii?', answer: 'Aktivoi harmaas\u00e4vyvaihtoehto ennen lataamista muuntaaksesi v\u00e4rilliset kuvat mustavalkoisiksi. Teht\u00e4v\u00e4t tulostuvat selke\u00e4sti s\u00e4\u00e4st\u00e4en v\u00e4rimustetta merkitt\u00e4v\u00e4sti. T\u00e4m\u00e4 s\u00e4\u00e4st\u00e4\u00e4 tulostuskustannuksia erityisesti suurissa eriss\u00e4.' },
    { id: '12', question: 'Mita kuvaformaatteja voi ladata?', answer: 'Lataa kuvia JPEG-, PNG- ja GIF-muodossa. Lataa useita tiedostoja kerralla nopeampaan ty\u00f6nkulkuun. Kaikki yleisimm\u00e4t kuvaformaatit ovat tuettuja. Lataamasi kuvat yhdistyv\u00e4t saumattomasti 3000+ kuvakirjaston kanssa.' },
  ],
  relatedApps: [
    { id: '1', slug: 'vahennyslasku-tyoarkit', name: 'V\u00e4hennyslasku', category: 'Matematiikka', icon: '\u2796', description: 'Yhdist\u00e4 yhteenlasku- ja v\u00e4hennyslaskuteht\u00e4v\u00e4t kattavaan lukukasiteen kehitt\u00e4miseen. Oppilaat harjoittelevat molempia peruslaskutoimituksia samoilla teemakuvilla.' },
    { id: '2', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'Yhdist\u00e4 yhteenlaskuteht\u00e4v\u00e4t v\u00e4rityskuviin palkitseviksi oppimispaketeiksi. Oppilaat ratkaisevat laskuteht\u00e4vi\u00e4 ja palkitaan v\u00e4ritett\u00e4v\u00e4ll\u00e4 sivulla.' },
    { id: '3', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Yhdist\u00e4 yhteenlaskuteht\u00e4v\u00e4t sanahakuteht\u00e4viin integroituihin oppimispaketteihin. Oppilaat harjoittelevat sek\u00e4 matematiikkaa ett\u00e4 lukemista aamuty\u00f6skentelyn aikana.' },
    { id: '4', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Yhdist\u00e4 yhteenlaskuteht\u00e4v\u00e4t aakkosharjoituksiin esiopetuksen kokonaisiin oppimispaketteihin. Nuorimmat oppijat tarvitsevat sek\u00e4 varhaista matematiikkaa ett\u00e4 lukutaitoa.' },
    { id: '5', slug: 'matematiikkapulmat-tyoarkit', name: 'Matematiikkapulmat', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Matematiikkapulmat haastavat oppilaita soveltamaan yhteenlaskufaktoja ongelmanratkaisukonteksteissa. Luo lukuruudukoita, joissa oppilaat t\u00e4ytt\u00e4v\u00e4t puuttuvat yhteenlaskettavat.' },
    { id: '6', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Viivojen piirt\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4otetta ja silm\u00e4-k\u00e4si-koordinaatiota, jotka ovat t\u00e4rkeit\u00e4 numeroiden kirjoittamisessa. Yhdist\u00e4 piirtamisteht\u00e4v\u00e4t ennen yhteenlaskuharjoittelua.' },
  ],
  aiOverviewSnippet: 'Yhteenlaskutehtavageneraattori on verkkotyokalu, jolla luodaan tulostettavia matematiikkatehtavia mukautettavilla yhteenlaskutehtavilla, visuaalisilla laskuapuvalineilla ja automaattisilla vastausavaimilla. Opettajat valitsevat vaikeustason, kuvateemat ja tehtavatyypit ja tuottavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Mukautettava vaikeustaso', ourApp: '4 teht\u00e4v\u00e4tyyppi\u00e4, lukualue 1\u201320', typical: 'Kiinte\u00e4t vaikeustasot' },
    { feature: 'Visuaaliset teht\u00e4v\u00e4t', ourApp: '3000+ teemakuvaa', typical: 'Vain numeroteht\u00e4v\u00e4t tai peruskuvitus' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattisesti joka teht\u00e4v\u00e4\u00e4n', typical: 'Usein lis\u00e4maksullisia' },
    { feature: 'Luontiaika', ourApp: 'Alle 3 minuuttia per teht\u00e4v\u00e4', typical: '30\u201360 minuuttia per teht\u00e4v\u00e4' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Visuaaliset matemaattisten kasitteiden esitykset parantavat merkittavasti oppilaiden ymmarrysta yhteenlaskuoperaatioista, erityisesti esiopetuksen ja alakoulun oppilailla konkreetista abstraktiin siirtyessa.', source: 'Aunio, P. & Rasanen, P., "Matemaattisten taitojen kehitys ja tukeminen," NMI-bulletin' },
    { claim: 'Vaihtelevat harjoitusmuodot ja hajautettu kertaus eri tehtavatyypeilla tuottavat vahvemman laskusujuvuuden kuin toistuva mekaaninen harjoittelu.', source: 'Kinnunen, R. & Vauras, M., "Oppimisen tukeminen matematiikassa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Esiopetuksen oppilaani siirtyivat peruslaskuista luottavaiseen yhteenlaskuun viikossa. Kuvapohjaiset tehtavat tekevat abstrakteista kasitteista konkreettisia visuaalisille oppijoille.', name: 'Paivi Makinen', role: 'Esiopetuksen opettaja', school: 'Metasalan koulu, Espoo' },
    { quote: 'Luon erilaistetut yhteenlaskupaketit koko ekaluokan tiimille 20 minuutissa. Ennen samaan valmistelutyohon kului koko sunnuntai-iltapaiva.', name: 'Janne Laine', role: '1. luokan opettaja', school: 'Kallaveden koulu, Kuopio' },
  ],
  tips: {
    sectionTitle: 'Yhteenlaskustrategiat luokka-asteittain',
    sectionDescription: 'Saada yhteenlaskutehtavageneraattori kullekin kehitysvaiheelle sopivaksi. Nain valitset lukualueen, tehtavatyypin ja kuvien kayton esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Ryhma ja yhdista', description: 'Esittele yhteenlasku kahden pienen ryhman yhdistamisena. Aseta lukualue 1\u20135 ja 1\u20132 tehtavaa sivulla. Kaytta kuva+kuva-muotoa niin lapset laskevat kuvia molemmissa ryhmissa. Rakentaa yksi-yhteen vastaavuutta ja ryhman yhdistamisen kasitetta.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Summat 10 asti visuaalisesti', description: 'Esiopetuksen oppilaat hallitsevat yhteenlaskufaktat 10 asti laskustrategioiden avulla. Aseta lukualue 1\u201310 ja 3\u20135 tehtavaa sivulla. Kaytta kuva+kuva-muotoa syyslukukaudella ja siirry kuva+numero-muotoon kevaalla.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Laskusujuvuus ja paikanarvo', description: 'Ekaluokkalaiset kehittavat yhteenlaskusujuvuutta 20 asti ja alkavat ymmartaa paikanarvoa. Aseta lukualue 1\u201320 ja 5\u20138 tehtavaa sivulla. Vuorottele kuva+numero ja puuttuva yhteenlaskettava -muotojen valilla.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Paalaskenta ja muistinumero', description: 'Toisluokkalaiset harjoittelevat paalaskentastrategioita ja valmistautuvat monipaikkaiseen yhteenlaskuun. Kaytta sekamuotoa 6\u201310 tehtavalla sivulla. Oppilaat soveltavat hajoittamisstrategioita kuten kymmenen tekeminen.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Faktojen hallinta ja soveltaminen', description: 'Kolmasluokkalaiset saavuttavat automaattisen muistamisen kaikissa yksinumeroisissa yhteenlaskufaktoissa. Kaytta korkeinta vaikeustasoa 8\u201310 sekamuodon tehtavalla. Tehtavat toimivat lammittelyna ennen kertolaskutunteja POPS 2014 tavoitteen T4 mukaisesti.' },
    ],
  },
};

// ===================================================================
// 3. ALPHABET TRAIN (aakkosjuna-tyoarkit)
// ===================================================================
const alphabetTrain = {
  file: 'aakkosjuna-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u2702\ufe0f', title: 'Leikkaa ja liimaa -kirjainyhdistely', description: 'Jokainen teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 v\u00e4rikk\u00e4\u00e4n junan kuvavaunuineen ja erilliset kirjainleikepalat alareunassa. Oppilaat leikkaavat kirjainruudut, tunnistavat mik\u00e4 kirjain vastaa kutakin kuvaa ja liimaavat kirjaimen oikeaan vaunuun. Kehitt\u00e4\u00e4 hienomotoriikkaa ja kirjain-\u00e4\u00e4nnevastaavuutta samanaikaisesti.' },
    { id: '2', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 vihjem\u00e4\u00e4r\u00e4 3\u201311 kirjainta', description: 'Hallitse teht\u00e4v\u00e4n vaikeustasoa valitsemalla 3\u201311 kirjainvihjet\u00e4 per aakkosjuna. Kolme vihjet\u00e4 esittelee muodon helpoiten esikoululaisille. 5\u20137 vihjet\u00e4 tarjoaa standardin esiopetusharjoittelun. 10\u201311 vihjet\u00e4 haastaa oppilaat koko aakkostoistoon.' },
    { id: '3', icon: '\u26a1', title: 'Automaattinen luontitila', description: 'Ota automaattinen luontitila k\u00e4ytt\u00f6\u00f6n luodaksesi t\u00e4ydellisen aakkosjuna-teht\u00e4v\u00e4n yhdell\u00e4 klikkauksella. Generaattori valitsee satunnaisesti kirjain-kuva-parit valitsemastasi teemasta. T\u00e4ydellinen opettajille, jotka tarvitsevat nopeasti materiaalia.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: '3000+ teemakuvaa kirjainparituksiin', description: 'Selaa yli 3000 kuvaa teemoittain. Jokainen kuva paritetaan automaattisesti alkukirjaimeensa. El\u00e4inteema tuottaa A-apina, K-koira, L-leijona -parituksia. Ruokateema tuottaa O-omena, B-banaani parituksia. Vaihda teemoja v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen aakkosjuna-teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 oikean kirjaimen jokaisen vaunun kuvan vieress\u00e4. Tulosta vastausavaimet itsetarkistuspisteille tai sijaisopettajan ohjeiksi.' },
    { id: '6', icon: '\u{1f3a8}', title: 'Muokkausty\u00f6kalu asettelujen kustomointiin', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 valitaksesi, raahaa siirt\u00e4\u00e4ksesi, skaalaa kulmakahvoista tai kierr\u00e4 mihin tahansa kulmaan. Lis\u00e4\u00e4 otsikoita ja ohjeita. Valitse seitsem\u00e4st\u00e4 fontista s\u00e4\u00e4dett\u00e4vill\u00e4 koilla ja v\u00e4reill\u00e4.' },
    { id: '7', icon: '\u{1f4b0}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 aakkosjuna-teht\u00e4vi\u00e4 verkossa. Teemakohtaiset aakkospaketit ovat suosittuja esikoulu- ja esiopetusmarkkinoilla. Luo 10\u201320 teemallista junaa per paketti.' },
    { id: '8', icon: '\u2702\ufe0f', title: 'Hienomotorinen kehitys leikkaamisen kautta', description: 'Leikkaa ja liimaa -muoto rakentaa hienomotorisia taitoja: leikkaamisen tarkkuutta, liiman hallintaa ja kirjainpalojen k\u00e4sittely\u00e4. Fyysinen kirjainpalojen k\u00e4sittely syvent\u00e4\u00e4 aakkosj\u00e4rjestyksen ymm\u00e4rt\u00e4mist\u00e4 kinesteettisen oppimisen kautta.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esikoulunopettajat', subtitle: 'Kirjainten esittely 3\u20134 kirjaimen junilla', description: 'Esittele kirjaimia yksinkertaisilla 3\u20134 kirjaimen aakkosjunilla tutuilla kuvateemoilla. Leikkaa ja liimaa -muoto kehitt\u00e4\u00e4 hienomotoriikkaa samalla kun rakennetaan kirjaintietoisuutta. Ohjatussa pienryhm\u00e4ty\u00f6skentelyss\u00e4 opettaja tukee leikkaamista ja \u00e4\u00e4nteiden tunnistamista.' },
    { id: '2', icon: '\u{1f392}', title: 'Esiopetuksen opettajat', subtitle: 'Itsen\u00e4inen lukutaitopiste 5\u20138 kirjaimella', description: 'K\u00e4yt\u00e4 aakkosjunia 5\u20138 kirjainvihjeell\u00e4 itsen\u00e4isiss\u00e4 lukutaitopisteiss\u00e4. Oppilaat ty\u00f6skentelev\u00e4t omaan tahtiin leikaten, tunnistaen ja liimaten ilman jatkuvaa opettajan ohjausta. Vaihda teemoja viikoittain sitoutumisen yll\u00e4pit\u00e4miseksi.' },
    { id: '3', icon: '\u{1f4da}', title: '1. luokan opettajat', subtitle: 'Koko aakkoston kertaus 10\u201311 kirjaimella', description: 'Luo 10\u201311 kirjaimen aakkosjunia kattavaan aakkosten kertaukseen ja ep\u00e4viralliseen arviointiin. Sis\u00e4llyt\u00e4 usein sekoittuvat kirjainparit kuten b/d ja p/q samaan junaan erottelutaidon rakentamiseksi. K\u00e4yt\u00e4 l\u00e4mmittelyin\u00e4 ennen ohjattua lukemista.' },
    { id: '4', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Teemapohjaiset aakkospaketit kotiopetukseen', description: 'Luo teemallisia aakkosjunapaketteja, jotka yhdist\u00e4v\u00e4t kirjainharjoittelun ajankohtaisiin opintoyksik\u00f6ihin. El\u00e4inaakkosjunat luontoyksik\u00f6ihin. Ruokateemaiset junat ravitsemustunneille. Teemojen vaihtelu pit\u00e4\u00e4 aakkosharjoittelun tuoreena.' },
    { id: '5', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikielinen aakkosharjoittelu 11 kielell\u00e4', description: 'Hy\u00f6dynn\u00e4 kuvavihjeit\u00e4 kirjain-\u00e4\u00e4nnesuhteiden opettamiseen ilman lukutaitovaatimuksia. Generaattori tukee 11 kielt\u00e4, joten voit luoda aakkosjunia oppilaan kotikielell\u00e4 ennen siirtymist\u00e4 suomeen. Kuva-kirjain-yhdist\u00e4minen toimii kielirajojen yli.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Suosituimmat tuotteet esikoulu- ja esiopetusmarkkinoilla', description: 'Luo teemallisia aakkosjunakokoelmia myyntiin. El\u00e4inaakkossetit, vuodenaikakokoelmat ja asteittain vaikeutuvat paketit myyv\u00e4t tasaisesti. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lis\u00e4maksuja.' },
  ],
  faq: [
    { id: '1', question: 'Miten aakkosjuna-tehtavat opettavat kirjaintuntemusta?', answer: 'Aakkosjuna-teht\u00e4v\u00e4t esitt\u00e4v\u00e4t kirjaimia yksitt\u00e4isiss\u00e4 junavaunuissa vastaavien kuvien rinnalla. Jokainen vaunu n\u00e4ytt\u00e4\u00e4 kuvan, jonka nimi alkaa kyseisell\u00e4 kirjaimella. Oppilaat leikkaavat kirjainpalat ja liimaavat ne oikeisiin vaunuihin. T\u00e4m\u00e4 moniaistinen l\u00e4hestymistapa vahvistaa kirjain-\u00e4\u00e4nnevastaavuutta.' },
    { id: '2', question: 'Mika on leikkaa ja liimaa -muoto?', answer: 'Jokainen teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 junan kuvavaunuineen ja erilliset kirjainleikeruudut sivun alareunassa. Oppilaat leikkaavat yksitt\u00e4iset kirjainruudut, tunnistavat mik\u00e4 kirjain vastaa kunkin vaunun kuvaa ja liimaavat kirjaimen oikeaan vaunuun. Toiminnallinen teht\u00e4v\u00e4muoto kehitt\u00e4\u00e4 hienomotoriikkaa.' },
    { id: '3', question: 'Kuinka monta kirjainvihjetta voi sisallyttaa per tehtava?', answer: 'S\u00e4\u00e4d\u00e4 vaikeustasoa valitsemalla 3\u201311 kirjainvihjet\u00e4 per aakkosjuna. Kolme vihjet\u00e4 sopii esikoululaisille. 5\u20136 vihjet\u00e4 on standardi esiopetusharjoitteluun. 8\u201311 vihjet\u00e4 haastaa oppilaat laajempaan kirjaintuntemuksen osoittamiseen.' },
    { id: '4', question: 'Sisaltaako generaattori vastausavaimet?', answer: 'Kyll\u00e4, jokainen aakkosjuna-teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 oikean kirjaimen jokaisen vaunun kuvan vieress\u00e4. Opettajat k\u00e4ytt\u00e4v\u00e4t vastausavaimia nopeaan tarkistukseen. Tulosta erikseen itsetarkistuspisteille.' },
    { id: '5', question: 'Mille ikarryhmille aakkosjuna-tehtavat sopivat?', answer: 'Aakkosjuna-teht\u00e4v\u00e4t palvelevat 3\u20137-vuotiaita esikoulusta 1. luokkaan. Esikoululaiset 3\u20134-vuotiaat ty\u00f6skentelev\u00e4t 3\u20134 kirjaimella ohjatusti. Esiopetusik\u00e4iset 5\u20136-vuotiaat suorittavat 5\u20138 kirjaimen teht\u00e4vi\u00e4 itsen\u00e4isesti. Ekaluokkalaiset harjoittelevat koko aakkostoa.' },
    { id: '6', question: 'Miten aakkosjunat tukevat foneettista tietoisuutta?', answer: 'Aakkosjuna-teht\u00e4v\u00e4t opettavat suoraan alkuaanteen tunnistamista, joka on foniikan ydintaito. Oppilaat analysoivat jokaisen vaunun kuvan, m\u00e4\u00e4ritt\u00e4v\u00e4t sen alkuaanteen ja yhdist\u00e4v\u00e4t oikean kirjaimen. S\u00e4\u00e4nn\u00f6llinen harjoittelu rakentaa automaattisia kirjain-\u00e4\u00e4nne-yhteyksi\u00e4.' },
    { id: '7', question: 'Voiko teemallisia aakkosjuna-tehtavia luoda?', answer: 'Kyll\u00e4, valitse kymmenist\u00e4 kuvateemoista kiinnostavia aakkosjunaharjoituksia. Luo el\u00e4inaakkosjunia luonto-opintoja varten. Rakenna ruoka-teemaisia junia ravitsemustunneille. Jokainen teema tarjoaa kirjaimelle sopivan kuvaparituksen.' },
    { id: '8', question: 'Kuinka kauan yhden tehtavan luominen kestaa?', answer: 'Yhden aakkosjuna-teht\u00e4v\u00e4n luominen vie alle 2 minuuttia. Valitse teema ja vihjem\u00e4\u00e4r\u00e4. K\u00e4yt\u00e4 automaattista luontia v\u00e4litt\u00f6m\u00e4\u00e4n satunnaiseen generointiin. Luo koko viikon aakkosharjoitukset alle 10 minuutissa.' },
    { id: '9', question: 'Sopivatko aakkosjunat esiopetuksen opetussuunnitelmaan?', answer: 'Aakkosjuna-teht\u00e4v\u00e4t vastaavat POPS 2014 \u00e4idinkielen tavoitetta T2 (lukutaidon kehitt\u00e4minen) sek\u00e4 esiopetuksen kirjaintuntemuksen tavoitteita. Junateema vetoaa lapsiin ja leikkaa-liimaa-muoto on kehityksellisesti sopiva 5\u20136-vuotiaille.' },
    { id: '10', question: 'Voinko ladata omia kuvia aakkosjuna-tehtaviin?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia luodaksesi henkil\u00f6kohtaisia aakkosjunateht\u00e4vi\u00e4. K\u00e4yt\u00e4 luokkakuvia, lemmikkikuvia tai opetussuunnitelmaan sopivia kuvia. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kanssa samalla teht\u00e4v\u00e4ll\u00e4.' },
    { id: '11', question: 'Miten aakkosjunat eroavat perinteisista aakkosharjoituksista?', answer: 'Perinteiset aakkosharjoitukset perustuvat j\u00e4ljent\u00e4miseen tai ympy\u00f6intiin. Aakkosjunat lis\u00e4\u00e4v\u00e4t toiminnallisen leikkaa-liimaa-elementin, joka aktivoi motorisen muistin visuaalisen ja auditiivisen prosessoinnin rinnalla. T\u00e4m\u00e4 moniaistinen l\u00e4hestymistapa tuottaa vahvemman kirjaintuntemuksen.' },
    { id: '12', question: 'Tukeeko generaattori suomen aakkostoa?', answer: 'Kyll\u00e4, generaattori tukee t\u00e4ysin suomen aakkostoa mukaan lukien kirjaimet \u00c5, \u00c4 ja \u00d6. Kaikki skandinaaviset erikoismerkit ovat tuettuja. Sanat n\u00e4kyv\u00e4t oikein suomeksi. T\u00e4ydellinen suomalaisten kirjainten harjoitteluun.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: '\u00c4idinkieli', icon: '\u270f\ufe0f', description: 'Yhdist\u00e4 aakkosjunan kirjaintunnistus k\u00e4sinkirjoitusharjoitteluun. Oppilaat tunnistavat kirjaimia junassa ja harjoittelevat sitten kirjainmuotoja kirjoitusteht\u00e4vill\u00e4.' },
    { id: '2', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Yhdist\u00e4 aakkosj\u00e4rjestys sanahakupulmiin kattavaan lukutaitoharjoitteluun. Oppilaat harjoittelevat kirjaintuntemusta junissa ja l\u00f6yt\u00e4v\u00e4t sitten kirjaimia sanaruudukoissa.' },
    { id: '3', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Sanasto', icon: '\u{1f517}', description: 'Laajenna kirjain-kuva-yhdist\u00e4mist\u00e4 kuva-sana-yhdist\u00e4misteht\u00e4viin. Oppilaat yhdist\u00e4v\u00e4t kirjaimia kuviin aakkosjunissa ja sitten kuvia sanoihin yhdistamisteht\u00e4viss\u00e4.' },
    { id: '4', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'Lis\u00e4\u00e4 v\u00e4rityssivuja samoilla teemakuvilla kuin aakkosjunissa. Oppilaat suorittavat kirjainyhdist\u00e4misen ja sitten v\u00e4ritt\u00e4v\u00e4t kohdekirjaimilla alkavia kuvia.' },
    { id: '5', slug: 'sanansekoitus-tyoarkit', name: 'Sanansekoitus', category: '\u00c4idinkieli', icon: '\u{1f524}', description: 'Haasta kirjaintuntemuksen hallitsevat oppilaat sanansekoitusteht\u00e4vill\u00e4. Kirjainten sekoittaminen sanoiksi rakentuu aakkosjunaharjoittelun kehitt\u00e4m\u00e4lle pohjalle.' },
    { id: '6', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u3030\ufe0f', description: 'Rakenna hienomotorista hallintaa, jota tarvitaan aakkosjunapalojen leikkaamiseen. Viivojen piirt\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4otetta ja silm\u00e4-k\u00e4si-koordinaatiota.' },
  ],
  aiOverviewSnippet: 'Aakkosjunageneraattori on verkkotyokalu, joka luo tulostettavia leikkaa ja liimaa -kirjainyhdistamistehtavia. Lapset yhdisttavat kirjainleikepaloja kuvavaunuihin. Opettajat valitsevat 3\u201311 kirjainta, teemakuvat 3000+ kirjastosta ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 2 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muoto', ourApp: 'Leikkaa ja liimaa kirjainyhdistely junavaunuissa', typical: 'J\u00e4ljent\u00e4minen tai ympy\u00f6inti paperilla' },
    { feature: 'Vihjem\u00e4\u00e4r\u00e4', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 3\u201311 kirjainvihjet\u00e4 per teht\u00e4v\u00e4', typical: 'Kiinte\u00e4 m\u00e4\u00e4r\u00e4 kohteita' },
    { feature: 'Kuva-kirjain-paritus', ourApp: '3000+ teemakuvaa automaattisesti paritettuna', typical: 'Yleiskuvat tai ei kuvia' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattisesti joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 lokalisoiduilla kirjain-kuva-pareilla', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Moniaistinen kirjainoppiminen, joka yhdistaa visuaalisen, taktiilisen ja kinesteettisen modaliteetin, tuottaa merkittavasti vahvempia kirjain-aanne-assosiaatioita kuin pelkka visuaalinen opetus, erityisesti 3\u20136-vuotiailla.', source: 'Lyytinen, H. et al., "Jyvaskylan pitkittaistutkimus lukivaikeuksista," Jyvaskylan yliopisto' },
    { claim: 'Kirjainkorttien fyysinen kasittely kuvien rinnalla nopeuttaa kirjain-aanne-vastaavuuden omaksumista aktivoimalla motorisen muistin visuaalisen ja auditiivisen prosessoinnin rinnalla.', source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY' },
  ],
  teacherTestimonials: [
    { quote: 'Leikkaa ja liimaa -muoto muutti lukutaitopisteeni. Oppilaat, jotka eivat jaksaneet istua jaljennystehtavien aarella, viettavat mielellaan 20 minuuttia leikaten ja liimaten aakkosjunakirjaimia. Kirjaintuntemus parani selkeasti kuukaudessa.', name: 'Sari Hamalainen', role: 'Esiopetuksen opettaja', school: 'Toivolan koulu, Tampere' },
    { quote: 'Luon teemallisia aakkosjunapaketteja ja ne myyvat jatkuvasti parhaiten. Automaattinen luontitila mahdollistaa kokonaisen elainaakkospaketin tuottamisen alle 30 minuutissa.', name: 'Tiina Jarvinen', role: 'Opettajayrittaja', school: 'TiinanOppimateriaali verkkokauppa' },
  ],
  tips: {
    sectionTitle: 'Aakkosjunastrategiat luokka-asteittain',
    sectionDescription: 'Saada aakkosjunageneraattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset kirjainmaaran, teemat ja ohjaustason esikoulusta ensimmaiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Ensimmainen kirjainaltistus', description: 'Aloita 3\u20134 kirjaimen junilla tunnistettavimmilla kirjaimilla kuten A, E, I ja S. Valitse elain- tai ruokateemoja selkein kuvavihjein. Ohjaa leikkaamista ja liimaamista opettajajohtoisena pienryhmatehtavana.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kirjaintuntemuksen pisteet', description: 'Luo 5\u20138 kirjaimen junia kohdistettuna foniikan opetussuunnitelman kirjaimiin. Kaytta itsenaisissa lukutaitopisteissa, joissa oppilaat leikkaavat, yhdistavat ja liimaavat ilman suoraa ohjausta. Vaihda teemoja viikoittain sitoutumisen yllapitamiseksi.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Koko aakkoston kertaus', description: 'Generoi 10\u201311 kirjaimen junia kattavaan aakkosten kertaukseen lukuvuoden alussa tai ennen arviointeja. Sisallyta usein sekoittuvat kirjainparit kuten b/d ja p/q samaan junaan erottelutaidon vahvistamiseksi.' },
      { id: '1-luokka-edistynyt', icon: '\u{1f3af}', title: '1. luokka edistynyt: Aakkosjarjestyksen harjoittelu', description: 'Luo junia, joissa kirjaimet on asetettava aakkosjarjestykseen kuvien yhdistamisen sijaan. Tama laajentaa tehtavan kirjaintuntemuksesta aakkosjarjestyksen hallintaan. Oppilaat leikkaavat kaikki 11 kirjainta ja jarjestavat ne ABC-jarjestykseen.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: S2-opetus ja kertaus', description: 'Kaytta aakkosjunia suomi toisena kielena -oppijoille ja kirjaintuntemuksen kertaukseen. Kuvavihjeet tarjoavat kontekstin ilman lukutaitovaatimuksia. Luo kaksikielisia junia 11 kielen tuella yhdistamaan kotikielen ja suomen kirjaintuntemusta.' },
    ],
  },
};

// ===================================================================
// 4. COLORING (varityskuvat-tyoarkit)
// ===================================================================
const coloring = {
  file: 'varityskuvat-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f5bc}\ufe0f', title: 'Teema-aariviivojen automaattinen luonti', description: 'Muunna t\u00e4ysiv\u00e4riset kuvat automaattisesti puhtaiksi v\u00e4ritett\u00e4viksi \u00e4\u00e4riviivoiksi. \u00c4\u00e4rviivamootori s\u00e4ilytt\u00e4\u00e4 olennaiset yksityiskohdat poistaen v\u00e4rit\u00e4yt\u00f6t. Ammattimaisia v\u00e4rityssivuja mist\u00e4 tahansa kuvakirjaston kuvasta.' },
    { id: '2', icon: '\u{1f4da}', title: 'Yli 3000 kuvaa v\u00e4ritysaiheiden luontiin', description: 'Selaa yli 3000 lapsiystavallista kuvaa luokiteltuina koulutuskategorioihin: elaimet, ruoka, kulkuneuvot, juhlapyhia ja luonto. Jokainen kuva on valittu ikaanmukaisia varitysharjoituksia varten esikoulusta toiseen luokkaan.' },
    { id: '3', icon: '\u{1f527}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 \u00e4\u00e4riviivan paksuus', description: 'Hallitse \u00e4\u00e4riviivan paksuutta ja yksityiskohtien tasoa oppilaiden taitojen mukaan. Paksut \u00e4\u00e4riviivat yksinkertaisilla yksityiskohdilla sopivat esikoululaisille kyn\u00e4otteen kehitt\u00e4miseen. Ohuemmat \u00e4\u00e4riviivat tarkemmilla yksityiskohdilla haastavat vanhempia oppilaita.' },
    { id: '4', icon: '\u{1f5b1}\ufe0f', title: 'T\u00e4ysi muokkausty\u00f6kalu asetteluihin', description: 'Raahaa, skaalaa, kierr\u00e4 ja kerrostaa jokainen elementti. Sijoita useita kuvia, j\u00e4rjest\u00e4 tekstimerkinnat ja kohdista objektit reunoihin. Intuitiiviset muokkausty\u00f6kalut eiv\u00e4t vaadi suunnittelukokemusta.' },
    { id: '5', icon: '\u270f\ufe0f', title: 'Mukautetut tekstit ja otsikot', description: 'Lis\u00e4\u00e4 otsikoita, sanastomerkinnat\u00e4, ohjeita ja nimikent\u00e4t mille tahansa v\u00e4rityssivulle. Valitse useista fonteista, koista ja v\u00e4reist\u00e4. Sis\u00e4llyt\u00e4 k\u00e4sinkirjoitusharjoitusrivej\u00e4 yhdist\u00e4\u00e4ksesi v\u00e4ritt\u00e4misen ja kirjoittamisen.' },
    { id: '6', icon: '\u{1f3a8}', title: 'V\u00e4rimallit ja viitekuvat', description: 'Generoi automaattisesti v\u00e4ritetyt viitekuvat, joiden avulla opettajat voivat tarkistaa oppilaiden ty\u00f6n ja n\u00e4ytt\u00e4\u00e4 valmiita esimerkkej\u00e4. Viitekuvat auttavat oppilaita ymm\u00e4rt\u00e4m\u00e4\u00e4n odotetun lopputuloksen ennen v\u00e4ritt\u00e4misen aloittamista.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi v\u00e4rityskokoelmiin', description: 'Myy v\u00e4ritysteht\u00e4vi\u00e4 verkossa tilaukseen sis\u00e4ltyv\u00e4ll\u00e4 kaupallisella lisenssill\u00e4. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4lisenssimaksuja. Luo rajattomasti v\u00e4rityskokoelmia passiiviseen tuloon.' },
    { id: '8', icon: '\u{1f58c}\ufe0f', title: 'Hienomotorinen kehitys v\u00e4ritt\u00e4misen kautta', description: 'V\u00e4ritysharjoitukset vahvistavat hienomotorista hallintaa vaatimalla lapsia koordinoimaan pieni\u00e4 k\u00e4silihaksia hallittuihin liikkeisiin m\u00e4\u00e4riteltyjen rajojen sis\u00e4ll\u00e4. Rakennetaan kyn\u00e4otetta ja tarkkuutta, joita tarvitaan k\u00e4sinkirjoitukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'P\u00e4iv\u00e4kodin ja esikoulun opettajat', subtitle: 'V\u00e4rintunnistus ja hienomotorinen l\u00e4mmittely', description: 'Luo suurikuvioisia v\u00e4rityssivuja yksinkertaisilla muodoilla ja kirkkaille viitekuville 3\u20134-vuotiaille. K\u00e4yt\u00e4 teemallisia v\u00e4ritysteht\u00e4vi\u00e4 aamurutiinaharjoituksina kyn\u00e4otteen, v\u00e4rien nime\u00e4misen ja kyn\u00e4n hallinnan kehitt\u00e4miseen.' },
    { id: '2', icon: '\u{1f392}', title: 'Esiopetuksen opettajat', subtitle: 'Teemapohjaiset v\u00e4ritysteht\u00e4v\u00e4t opetussuunnitelman tukena', description: 'Generoi v\u00e4rityssivuja viikon ymp\u00e4rist\u00f6opin, \u00e4idinkielen ja matematiikan teemoihin. Luo el\u00e4inv\u00e4ritysteht\u00e4vi\u00e4 el\u00e4inyksik\u00f6ihin, ruokav\u00e4rityssivuja ravitsemustunneille ja vuodenaikav\u00e4ritysteht\u00e4vi\u00e4 juhlapy\u00e4juhlistuksiin. Yhdist\u00e4 v\u00e4ritysteht\u00e4v\u00e4t sanastomerkint\u00f6ihin.' },
    { id: '3', icon: '\u{1f3a8}', title: 'Kuvataideopettajat', subtitle: 'Luova ilmaisu ohjatuilla harjoituksilla', description: 'Suunnittele j\u00e4senneltyj\u00e4 taideharjoituksia, joissa oppilaat harjoittelevat v\u00e4riteoriaa, varjostustekniikkaa ja luovaa ilmaisua ohjattujen \u00e4\u00e4riviivojen sis\u00e4ll\u00e4. POPS 2014 kuvataiteen tavoitteen T1 mukaista havainnointia ja visuaalista ilmaisua.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastonrakennus v\u00e4ritt\u00e4misen kautta', description: 'Luo v\u00e4rityssiivuja kaksikielisilla sanastomerkinn\u00f6ill\u00e4 11 kielell\u00e4. Oppilaat v\u00e4ritt\u00e4v\u00e4t teemakuvia oppiessaan suomenkielisi\u00e4 sanoja el\u00e4imist\u00e4, ruoasta ja arkiesineist\u00e4. Visuaalinen yhteys vahvistaa sanavaraston muistamista.' },
    { id: '5', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Teemapohjaiset taideprojektit opetussuunnitelman tueksi', description: 'Rakenna v\u00e4rityssivupaketteja kotiopetuksen teemoihin. Luo viikon merel\u00e4in-v\u00e4ritysteht\u00e4vi\u00e4 biologiaopintojen tueksi tai avaruusteemaisia v\u00e4rityssivuja t\u00e4htitieteeseen. Yhdist\u00e4 v\u00e4ritys kirjoitusharjoitteluun.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Vuodenaikakokoelmat myyntiin', description: 'Luo teemallisia v\u00e4ritysteht\u00e4v\u00e4kokoelmia verkkomyyntiin. Vuodenaika- ja juhlapy\u00e4kokoelmat mukaan lukien joulu, p\u00e4\u00e4si\u00e4inen, vappu ja juhannus myyv\u00e4t tasaisesti ymp\u00e4ri vuoden. Kaupallinen lisenssi kattaa kaikki myyntikanavat.' },
  ],
  faq: [
    { id: '1', question: 'Miten varityssivu generaattori eroaa ilmaisista varityskuvista verkossa?', answer: 'Generaattori luo t\u00e4ysin mukautettavia teht\u00e4vi\u00e4 3000+ teemakuvalla, koristeellisilla kehyksill\u00e4, tekstimerkinn\u00f6ill\u00e4 ja nimikentill\u00e4. Hallitset jokaista elementti\u00e4 mukaan lukien kuvan sijoittelua, kokoa ja kerrostusta. Ilmaiset v\u00e4rityskuvat verkossa eiv\u00e4t tarjoa mit\u00e4\u00e4n mukautusmahdollisuuksia.' },
    { id: '2', question: 'Voiko tehtaviin lisata tekstia ja nimikentttia?', answer: 'Kyll\u00e4, lis\u00e4\u00e4 mukautettua teksti\u00e4 minne tahansa v\u00e4ritysteht\u00e4v\u00e4\u00e4n. Sis\u00e4llyt\u00e4 otsikoita, ohjeita, sanastosanoja tai lausevihjeit\u00e4 kuvien yl\u00e4- tai alapuolelle. Lis\u00e4\u00e4 nimikent\u00e4t portfolion j\u00e4rjest\u00e4miseksi. K\u00e4sinkirjoitusrivit yhdist\u00e4v\u00e4t v\u00e4ritt\u00e4misen ja kirjoitustaidon.' },
    { id: '3', question: 'Mille ikarryhmille varitystehtavat sopivat?', answer: 'V\u00e4ritysteht\u00e4v\u00e4t palvelevat 2\u20138-vuotiaita. Taaperot ja esikoululaiset 2\u20134 kehitt\u00e4v\u00e4t kyn\u00e4otetta isoilla kuvioilla. Esiopetusik\u00e4iset 5\u20136 harjoittelevat viivojen sis\u00e4ll\u00e4 pysymist\u00e4. 1.\u20132. luokan oppilaat 6\u20138 nauttivat yksityiskohtaisista v\u00e4rityssivuista sanastomerkint\u00f6jen kanssa.' },
    { id: '4', question: 'Voiko teemallisia varitystehtavia luoda juhlaphyille?', answer: 'Kyll\u00e4, selaa 3000+ kuvakirjastoa teemoittain mukaan lukien joulu, p\u00e4\u00e4si\u00e4inen, vappu, juhannus ja itse\u00e4isyysp\u00e4iv\u00e4. Yhdist\u00e4 juhlap\u00e4iv\u00e4kuvat vastaaviin koristeellisiin kehyksiin. Valmistele vuodenaikav\u00e4ritysteht\u00e4v\u00e4t viikkoja etuk\u00e4teen.' },
    { id: '5', question: 'Miten tulostan varitystehtavia musteetta saastaen?', answer: 'Aktivoi harmaas\u00e4vyvaihtoehto ennen lataamista muuntaaksesi kuvat mustavalkoisiksi \u00e4\u00e4riviivoiksi. T\u00e4m\u00e4 s\u00e4\u00e4st\u00e4\u00e4 merkitt\u00e4v\u00e4sti v\u00e4rimustetta. Lataa PDF-muodossa 300 DPI resoluutiolla ter\u00e4vien \u00e4\u00e4riviivojen varmistamiseksi.' },
    { id: '6', question: 'Voiko useita kuvia jarjestaa yhdelle sivulle?', answer: 'Kyll\u00e4, raahaa kuvia minne tahansa sivulla. Skaalaa objekteja kulmakahvoista. Luo v\u00e4rityssivuja yhdell\u00e4 isolla kuvalla tai j\u00e4rjest\u00e4 4\u20136 pienempi\u00e4 kuvaa ruudukkoon. Kohdistusohjaimet auttavat siistiss\u00e4 asettelussa.' },
    { id: '7', question: 'Sopivatko varitystehtavat esiopetuksen opetussuunnitelmaan?', answer: 'V\u00e4ritysteht\u00e4v\u00e4t tukevat POPS 2014 kuvataiteen tavoitetta T1 (havainnoiminen ja visuaalinen ilmaisu) sek\u00e4 liikunnan tavoitetta T1 (motoristen perustaitojen kehitt\u00e4minen). Hienomotoristen taitojen kehitys on keskeist\u00e4 esiopetusik\u00e4isille.' },
    { id: '8', question: 'Kuinka kauan yhden varitystehtavan luominen kestaa?', answer: 'Yksinkertainen yhden kuvan v\u00e4rityssivu valmistuu alle 2 minuutissa. Monen kuvan teht\u00e4v\u00e4t tekstimerkinn\u00f6in ja kehyksin viev\u00e4t 3\u20135 minuuttia. Useimmat opettajat valmistelevat koko viikon v\u00e4ritysteht\u00e4v\u00e4t 15 minuutissa.' },
    { id: '9', question: 'Voinko ladata omia kuvia varityssivuille?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia. K\u00e4yt\u00e4 luokkakuvia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvituksia. Yhdist\u00e4 ladattuja kuvia 3000+ kuvakirjaston kanssa samalla sivulla. Kaikki muokkausty\u00f6kalut toimivat ladattujen kuvien kanssa.' },
    { id: '10', question: 'Voinko myydaa luomiani varitystehtavia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy v\u00e4ritysteht\u00e4vi\u00e4 verkossa ilman attribuutiovaatimuksia. Vuodenaika- ja juhlap\u00e4iv\u00e4kokoelmat ovat jatkuvasti suosituimpia tuotteita oppimateriaalikaupoissa.' },
    { id: '11', question: 'Miten varitystehtavat tukevat hienomotorista kehitysta?', answer: 'V\u00e4ritt\u00e4minen vahvistaa hienomotorista hallintaa vaatimalla koordinoituja liikkeit\u00e4 m\u00e4\u00e4riteltyjen rajojen sis\u00e4ll\u00e4. T\u00e4m\u00e4 rakentaa kyn\u00e4otetta ja tarkkuutta k\u00e4sinkirjoitukseen. Tutkimukset osoittavat v\u00e4ritt\u00e4misen parantavan kouluvalmiutta.' },
    { id: '12', question: 'Tukeeko generaattori 11 kielta?', answer: 'Kyll\u00e4, k\u00e4ytt\u00f6liittym\u00e4 ja tekstimerkinn\u00e4t toimivat 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja norja. Luo kaksikielisi\u00e4 v\u00e4rityssivuja sanastomerkinn\u00f6ill\u00e4 kahdella kielell\u00e4 S2-opetukseen.' },
  ],
  relatedApps: [
    { id: '1', slug: 'ruudukkopiirustus-tyoarkit', name: 'Ruudukkopiirustus', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'Yhdist\u00e4 v\u00e4ritysteht\u00e4v\u00e4t ruudukkopiirustusharjoituksiin j\u00e4senneltyyn taideopetukseen. Oppilaat kopioivat kuvia ruutu ruudulta kehitt\u00e4en tilallista hahmottamista v\u00e4ritt\u00e4misen rinnalla.' },
    { id: '2', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Yhdist\u00e4 v\u00e4ritysteht\u00e4v\u00e4t viivoj\u00e4ljennysharjoituksiin kattavaan hienomotoriseen kehitykseen. Oppilaat l\u00e4mmittelev\u00e4t ohjattujen viivojen avulla ja soveltavat sitten hallintaansa v\u00e4rityssivuilla.' },
    { id: '3', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Visuaaliset taidot', icon: '\u{1f50d}', description: 'Luo visuaalisia oppimispaketteja yhdist\u00e4m\u00e4ll\u00e4 v\u00e4rityssivut piiloesineiden etsint\u00e4teht\u00e4viin. Oppilaat kehitt\u00e4v\u00e4t havainnointitaitoja etsien piilotettuja esineit\u00e4 ja sitten v\u00e4ritt\u00e4v\u00e4t teemakuvia.' },
    { id: '4', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Kriittinen ajattelu', icon: '\u{1f4ca}', description: 'Yhdist\u00e4 v\u00e4ritysteht\u00e4v\u00e4t kuvalajitteluharjoituksiin luokittelu- ja luovan ilmaisun paketeiksi. Oppilaat lajittelevat kuvia kategorioihin ja sitten v\u00e4ritt\u00e4v\u00e4t aiheeseen liittyvi\u00e4 kuvia.' },
    { id: '5', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Varhaiskasvatus', icon: '\u{1f517}', description: 'Yhdist\u00e4 v\u00e4rityssivut yhdist\u00e4misteht\u00e4viin esiopetuksen oppimispaketteihin. Oppilaat yhdist\u00e4v\u00e4t kuvia ja sitten v\u00e4ritt\u00e4v\u00e4t niit\u00e4. Visuaalinen muisti ja sanastoyhteydet vahvistuvat.' },
    { id: '6', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Matematiikka ja logiikka', icon: '\u{1f501}', description: 'Luo teemapaketteja yhdist\u00e4m\u00e4ll\u00e4 v\u00e4ritysteht\u00e4v\u00e4t kuvionhavaitsemisharjoituksiin. Oppilaat tunnistavat ja jatkavat kuvioita ja sitten v\u00e4ritt\u00e4v\u00e4t teemakuvia hienomotorisen harjoittelun tueksi.' },
  ],
  aiOverviewSnippet: 'Varityssivugeneraattori lapsille on verkkotyokalu, joka muuntaa teemakuvat tulostettaviksi varitysaariviivoiksi mukautettavilla kehyksilla, tekstimerkinnnoilla ja nimikentilla. Opettajat valitsevat 3000+ kuvasta, jarjestavat elementteja muokattavalla pohjalla ja lataavat ammattimaisen 300 DPI PDF:n alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teemakuvat', ourApp: '3000+ valittua kuvaa kymmeniss\u00e4 teemoissa', typical: 'Rajallinen yleiskuvitus' },
    { feature: '\u00c4\u00e4riviivojen laatu', ourApp: 'Automaattisesti luodut puhtaat \u00e4\u00e4riviivat 300 DPI', typical: 'Matalresoluutioiset skannatut \u00e4\u00e4riviivat' },
    { feature: 'Muokkausty\u00f6kalut', ourApp: 'T\u00e4ysi muokkauspohja raahauksella ja skaalauksella', typical: 'Ei muokkausta, kiinte\u00e4t asettelut' },
    { feature: 'Viitekuvat', ourApp: 'Automaattiset v\u00e4ritetyt viitekuvat', typical: 'Ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti', typical: 'Vain henkil\u00f6kohtainen k\u00e4ytt\u00f6' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 merkinn\u00f6ille ja k\u00e4ytt\u00f6liittym\u00e4lle', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Varitysharjoitukset vahvistavat hienomotorista hallintaa vaatimalla lapsia koordinoimaan pienia kasilihaksia hallittuihin liikkeisiin maariteltyjen rajojen sisalla, rakentaen kynaotetta ja tarkkuutta kasinkirjoitukseen.', source: 'Ahonen, T. et al., "Motoriikan ja oppimisen yhteydet," Niilo Maki Instituutti' },
    { claim: 'Luova ilmaisu taideharjoitusten kuten varittamisen kautta tukee tunnesaatelya ja itseilmaisua pienilla lapsilla tarjoten ei-sanallisen kanavan tunteiden kasittelyyn.', source: 'Rusanen, S., "Visuaalinen kasvatus varhaiskasvatuksessa," Lasten Keskus' },
  ],
  teacherTestimonials: [
    { quote: 'Esikoululaiseni pyytavat varitysaikaa joka aamu. Teemakuvat vastaavat viikkoyksikkoitamme tayydellisesti ja voin luoda koko viikon varitystehtavat 10 minuutissa.', name: 'Elina Heikkinen', role: 'Paivaakodin opettaja', school: 'Suvilahden paivakoti, Jyvaskyla' },
    { quote: 'Myyn vuodenaika-varityskokoelmia verkossa ja tama generaattori muutti liiketoimintani. Kuvien laatu on taaysin eri luokkaa kuin itse piirtaen ja tuotan 10 kertaa enemman sisaltoa.', name: 'Mikko Koskinen', role: 'Opettajayrittaja', school: 'MikonMateriaalit verkkokauppa' },
  ],
  tips: {
    sectionTitle: 'Varitysstrategiat luokka-asteittain',
    sectionDescription: 'Saada varityssivugeneraattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset kuvan monimutkaisuuden, tekstimerkinnnat ja ohjaustason esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kynaote ja varien nimeaminen', description: 'Valitse suuria yksinkertaisia kuvia paksuilla aariviivoilla ja vahaisilla sisayksityiskohdilla. Kaytta 1\u20132 kuvaa sivulla, jotta lapsilla on riittavasti tilaa. Keskity perusvarien tunnistamiseen yhdistamalla varityssivut varien nimeamistehtaviin.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Rajojen sisalla pysyminen', description: 'Esittele keskitason yksityiskohtia selkein rajoin. Lisaa yksinkertaisia tekstimerkinttoja kuvien alle yhdistamaan varittaminen varhaiseen lukutaitoon. Oppilaat harjoittelevat rajojen sisalla pysymista kehittaen hallittuja kaden liikkeita kirjainmuotoilua edeltaen.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Teemavarittaminen ja sanasto', description: 'Luo 2\u20133 kuvan varityssivuja sanastomerkinnoin ja nimikentin. Yhdista viikon ymparistopin ja aidinkielen teemat niin oppilaat vahvistavat luonnontiedon kasitteita taiteen kautta. Lisaa kasinkirjoitusriveja kuvien alle yhdistettyihin varitys- ja kirjoitusharjoituksiin.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Yksityiskohtaiset kohtaukset ja luova valinta', description: 'Kaytta monimutkaisempia kuvia hienommilla yksityiskohdilla, jotka haastavat hioutunutta motorista hallintaa. Lisaa kirjallisia vihjeitaa, joissa oppilaat kuvaavat varivalintojaan yhdistaaen taiteen ja kirjoittamisen. POPS 2014 kuvataiteen tavoitteiden mukaista visuaalista ilmaisua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Taidearvostus ja itseilmaisu', description: 'Suunnittele varityssivuja yksityiskohtaisilla kuvilla ja varjostusmahdollisuuksilla. Sisallyta taideaiheisia vihjeitaa, jotka rohkaisevat oppilaita kokeilemaan varien sekoittamista. Tehtavat siirtavat oppilaita ohjatuista tehtavista kohti itsenaisttaa luovaa ilmaisua.' },
    ],
  },
};

// ===================================================================
// 5. MATH WORKSHEET (matematiikka-tyoarkit)
// ===================================================================
const mathWorksheet = {
  file: 'matematiikka-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e9}', title: 'Kuvapohjaiset logiikkapulmat', description: 'Visuaaliset logiikkapulmat, joissa kuvasymbolit edustavat piilotettuja lukuja yht\u00e4l\u00f6iss\u00e4. Oppilaat analysoivat kuvayht\u00e4l\u00f6it\u00e4, p\u00e4\u00e4ttelev\u00e4t mit\u00e4 kukin kuva edustaa ja ratkaisevat teht\u00e4v\u00e4t. Kehitt\u00e4\u00e4 algebrallisen ajattelun perusteita jo varhaisessa vaiheessa.' },
    { id: '2', icon: '\u{1f4ca}', title: 'Nelj\u00e4 vaikeustasoa jokaiselle oppijalle', description: 'Valitse nelj\u00e4st\u00e4 vaikeustasosta: eritt\u00e4in helppo, helppo, normaali ja vaikea. Eritt\u00e4in helppo k\u00e4ytt\u00e4\u00e4 kahta symbolia summilla 10 asti. Vaikea taso sis\u00e4lt\u00e4\u00e4 nelj\u00e4 symbolia sekaoperaatioilla. Tukee konkreetti-kuvallinen-abstrakti oppimispolkua.' },
    { id: '3', icon: '\u2795', title: 'Yhteen- ja v\u00e4hennyslasku sek\u00e4 sekaoperaatiot', description: 'Valitse pelk\u00e4t yhteenlaskut, yhteen- ja v\u00e4hennyslaskut tai sekamuoto. Esiopetuksen oppilaat aloittavat pelkill\u00e4 yhteenlaskuilla. 2.\u20133. luokan oppilaat haastavat itsens\u00e4 sekaoperaatioilla POPS 2014 tavoitteen T3 mukaisesti.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: '3000+ teemakuvaa muuttujina', description: 'K\u00e4yt\u00e4 el\u00e4imi\u00e4, kulkuneuvoja, ruokaa ja leluja matemaattisina muuttujina. Oppilaat n\u00e4kev\u00e4t tutut kuvat yht\u00e4l\u00f6iss\u00e4 perinteisten x- ja y-muuttujien sijaan. Visuaalinen esitys tekee algebrasta helposti l\u00e4hestytt\u00e4v\u00e4n.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet ratkaisuineen', description: 'Jokainen teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 kunkin kuvan numeerisen arvon. Opettajat tarkistavat oppilasty\u00f6t sekunneissa. Vastausavaimet sopivat itsetarkistuspisteille ja dokumenttikameran\u00e4ytt\u00f6\u00f6n.' },
    { id: '6', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 lukualue ja teht\u00e4v\u00e4m\u00e4\u00e4r\u00e4', description: 'Aseta lukualue 0\u2013100 ja valitse 1\u20136 pulmaa sivua kohti. Esiopetukseen sopii lukualue 1\u201310 ja 1\u20132 pulmaa. Kolmasluokkalaisille lukualue 1\u201350 ja 4\u20136 pulmaa tarjoaa riitt\u00e4v\u00e4n haasteen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Myy luomiasi matematiikkapulmakokoelmia verkossa. Kuvapulmat ovat ainutlaatuinen tuote, joka erottuu tavallisista laskuteht\u00e4vist\u00e4. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f9e0}', title: 'Algebrallisen ajattelun perusteet', description: 'Kuvapulmat opettavat algebrallista ajattelua ikaanmukaisesti. Oppilaat oppivat etta symbolit voivat edustaa tuntemattomia lukuja ja etta yhtaloita voi ratkaista loogisella paaattelyylla. Tama luo perustan myohemmalle algebra-opiskelulle.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f469}\u200d\u{1f3eb}', title: 'Esiopetuksen opettajat', subtitle: 'Kahden symbolin pulmat varhaiseen matemaattiseen ajatteluun', description: 'Luo eritt\u00e4in helpoja kahden symbolin pulmia luvuilla 1\u201310. Ohjaa oppilaita p\u00e4\u00e4ttelyprosessin l\u00e4pi koko luokan harjoituksena. Kuvapohjaiset pulmat innostavat matemaattiseen ajatteluun POPS 2014 tavoitteen T1 mukaisesti.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kriittisen ajattelun harjoittelu 1.\u20133. luokalle', description: 'K\u00e4yt\u00e4 kolmen ja nelj\u00e4n symbolin pulmia 1.\u20133. luokan kriittisen ajattelun harjoitteluun. Oppilaat soveltavat yhteen- ja v\u00e4hennyslaskutaitojaan ongelmanratkaisukontekstissa. Pulmat eriyttyv\u00e4t luontevasti vaikeustasovalinnalla.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Kiinnostava vaihtoehto perinteisille laskuharjoituksille', description: 'Kuvapohjaiset pulmat tarjoavat motivoivan vaihtoehdon oppilaille, jotka vastustavat perinteisi\u00e4 laskuteht\u00e4vi\u00e4. Pulmien ratkaiseminen tuntuu pelaamiselta, ei l\u00e4ksyilt\u00e4. Eri vaikeustasot palvelevat kaikkia lapsia samassa perheess\u00e4.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielet\u00f6n matemaattinen p\u00e4\u00e4ttely', description: 'Kuvapohjaiset pulmat eiv\u00e4t vaadi kielitaitoa. Matemaattinen p\u00e4\u00e4ttely toimii universaalisti kielirajojen yli. Oppilaat osoittavat matemaattista osaamistaan ilman kielimuurin est\u00e4miseen. T\u00e4ydellinen vastavalmistuneille maahanmuuttajille.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Vaihtoehtoinen arviointimuoto oppimisen tueksi', description: 'Kuvapulmat tarjoavat vaihtoehtoisen tavan arvioida matemaattista ymm\u00e4rrist\u00e4. Visuaalinen muoto v\u00e4hent\u00e4\u00e4 lukemisen kuormitusta. S\u00e4\u00e4dett\u00e4v\u00e4t vaikeustasot mahdollistavat HOJKS-tavoitteiden mukaisen eriyttamisen.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Ainutlaatuiset matematiikkatuotteet myyntiin', description: 'Kuvapohjaiset logiikkapulmat erottuvat tavallisista laskuteht\u00e4vist\u00e4 oppimateriaalikaupoissa. Luo teemapaketteja eri vaikeustasoilla. Pulmat ovat suosittuja koska ne yhdist\u00e4v\u00e4t viihteen ja oppimisen.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvapohjaisten logiikkapulmien ratkaiseminen toimii?', answer: 'Jokaisessa pulmassa kuvasymbolit edustavat piilotettuja lukuja. Oppilaat analysoivat kuvayht\u00e4l\u00f6it\u00e4, p\u00e4\u00e4ttelev\u00e4t kunkin kuvan numeerisen arvon ja ratkaisevat teht\u00e4v\u00e4t hy\u00f6dynt\u00e4en loogista p\u00e4\u00e4ttely\u00e4. T\u00e4m\u00e4 prosessi opettaa algebrallista ajattelua ik\u00e4\u00e4nmukaisesti.' },
    { id: '2', question: 'Mitka vaikeustasot ovat saatavilla?', answer: 'Nelj\u00e4 vaikeustasoa: eritt\u00e4in helppo (2 symbolia, summat 10 asti), helppo (3 symbolia, summat 15 asti), normaali (3 symbolia, yhteen- ja v\u00e4hennyslasku), vaikea (4 symbolia, sekaoperaatiot, laajempi lukualue).' },
    { id: '3', question: 'Mitka laskutoimitukset ovat mahdollisia?', answer: 'Valitse pelk\u00e4t yhteenlaskut, yhteen- ja v\u00e4hennyslaskut tai sekamuoto. Esiopetuksen oppilaat aloittavat yhteenlaskuilla. 2.\u20133. luokan oppilaat siirtyv\u00e4t sekaoperaatioihin, jotka vaativat joustavampaa matemaattista ajattelua.' },
    { id: '4', question: 'Sisaltavatko tehtavat vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 kunkin kuvan numeerisen arvon. Opettajat tarkistavat oppilasty\u00f6t nopeasti ja voivat tulostaa vastausavaimet itsetarkistuspisteille.' },
    { id: '5', question: 'Mille ikarryhmille kuvapulmat sopivat?', answer: 'Kuvapulmat palvelevat 5\u201310-vuotiaita. Esiopetusik\u00e4iset k\u00e4ytt\u00e4v\u00e4t eritt\u00e4in helppoja pulmia opettajajohtoisesti. 1. luokan oppilaat ratkaisevat helppoja pulmia itsen\u00e4isesti. 2.\u20133. luokan oppilaat haastavat itsens\u00e4 vaikeammilla tasoilla.' },
    { id: '6', question: 'Miten kuvapulmat kehittavat algebrallista ajattelua?', answer: 'Oppilaat oppivat ett\u00e4 symbolit (kuvat) voivat edustaa tuntemattomia lukuja ja ett\u00e4 yht\u00e4l\u00f6it\u00e4 voi ratkaista loogisella p\u00e4\u00e4ttelyyll\u00e4. T\u00e4m\u00e4 on suora perusta my\u00f6hemm\u00e4lle muuttujien ja yht\u00e4l\u00f6iden opiskelulle.' },
    { id: '7', question: 'Voiko teemakuvia valita vapaasti?', answer: 'Kyll\u00e4, valitse 3000+ kuvakirjastosta tai lataa omia kuvia muuttujiksi. El\u00e4imet, ruoka, kulkuneuvot ja muut tutut kuvat tekev\u00e4t abstrakteista matemaattisista k\u00e4sitteist\u00e4 konkreettisia ja kiinnostavia.' },
    { id: '8', question: 'Miten kuvapulmat tukevat POPS 2014 tavoitteita?', answer: 'Kuvapulmat tukevat matematiikan tavoitteita T1 (matemaattinen ajattelu ja ongelmanratkaisu) ja T3 (laskutaitojen sujuvuus). Visuaalinen ongelmanratkaisu on POPS 2014 toiminnallisen oppimisen periaatteiden mukaista.' },
    { id: '9', question: 'Kuinka kauan yhden tehtavan luominen kestaa?', answer: 'Yhden matematiikkapulmateht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teemakuvat, vaikeustaso ja lukualue. Generaattori rakentaa pulman automaattisesti. Luo koko viikon haasteteht\u00e4v\u00e4t 15 minuutissa.' },
    { id: '10', question: 'Voinko myydaa logiikkapulmakokoelmia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Kuvapulmat ovat ainutlaatuinen tuote, joka erottuu perinteisist\u00e4 laskuteht\u00e4vist\u00e4 oppimateriaalikaupoissa. Luo teemapaketteja eri vaikeustasoilla.' },
    { id: '11', question: 'Sopivatko kuvapulmat eriytettyyn opetukseen?', answer: 'Kyll\u00e4, nelj\u00e4 vaikeustasoa mahdollistavat luontevan eriyttamisen. Luo helpompia pulmia tukea tarvitseville ja haastavampia lahjakkaiden oppilaiden lis\u00e4teht\u00e4viksi. Kaikki teht\u00e4v\u00e4t n\u00e4ytt\u00e4v\u00e4t samanlaisilta, joten eriyttaminen on huomaamatonta.' },
    { id: '12', question: 'Mitka lukualueet ovat mahdollisia?', answer: 'Aseta lukualue 0\u2013100. Esiopetukseen sopii 1\u201310. Ekaluokkalaisille 1\u201315. Toisluokkalaisille 1\u201320. Kolmasluokkalaisille 1\u201350 tai jopa 1\u2013100 haasteteht\u00e4viin. Valitse 1\u20136 pulmaa sivua kohti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhdist\u00e4 logiikkapulmat perinteisiin yhteenlaskuteht\u00e4viin kattavaan laskuharjoitteluun. Oppilaat ratkaisevat ensin kuvamuuttujia ja sitten soveltavat taitoja tavallisiin yhteenlaskuihin.' },
    { id: '2', slug: 'vahennyslasku-tyoarkit', name: 'V\u00e4hennyslasku', category: 'Matematiikka', icon: '\u2796', description: 'Yhdist\u00e4 v\u00e4hennyslaskuteht\u00e4v\u00e4t matematiikkapulmiin, jotka sis\u00e4lt\u00e4v\u00e4t v\u00e4hennyslaskuoperaatioita. Oppilaat harjoittelevat samoja taitoja eri muodoissa.' },
    { id: '3', slug: 'matematiikkapulmat-tyoarkit', name: 'Matematiikkapulmat', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Laajenna matemaattista p\u00e4\u00e4ttely\u00e4 lis\u00e4pulmamuodoilla mukaan lukien lukuruudukot ja yht\u00e4l\u00f6sokkelo. Eri pulmaformaatit kehitt\u00e4v\u00e4t joustavaa ongelmanratkaisua.' },
    { id: '4', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f501}', description: 'Kehit\u00e4 samoja loogisen p\u00e4\u00e4ttelyn taitoja kuvapulmissa k\u00e4ytettyin\u00e4. Kuvioiden tunnistaminen ja jatkaminen vahvistaa matemaattista hahmontunnistusta.' },
    { id: '5', slug: 'sudoku-tyoarkit', name: 'Sudoku', category: 'Logiikka', icon: '\u{1f9e0}', description: 'T\u00e4ydenn\u00e4 kuvapulmia sudoku-teht\u00e4vill\u00e4, jotka kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttely\u00e4 ja deduktiotaitoja samankaltaisessa visuaalisessa kontekstissa.' },
    { id: '6', slug: 'kuva-yhteenlasku-tyoarkit', name: 'Kuva-yhteenlasku', category: 'Matematiikka', icon: '\u{1f511}', description: 'Kuva-yhteenlaskuteht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t samanlaista konseptia, jossa oppilaat ratkaisevat yhteenlaskuteht\u00e4vi\u00e4 koodatakseen piilotettuja viestej\u00e4. Molemmat muodot yhdist\u00e4v\u00e4t laskemisen ja ongelmanratkaisun.' },
  ],
  aiOverviewSnippet: 'Matematiikkapulmageneraattori luo tulostettavia logiikkapulmia, joissa kuvasymbolit edustavat piilotettuja lukuja yhtaloissa. Oppilaat analysoivat visuaalisia yhttaloita, paaatttelevat kunkin kuvan arvon ja ratkaisevat tehtavat. Opettajat valitsevat neljan vaikeustason ja teemakuvat 3000+ kirjastosta ja lataavat valmiin PDF:n vastausavaimineen.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muoto', ourApp: 'Visuaaliset logiikkapulmat kuvamuuttujilla', typical: 'Tavalliset numeroyht\u00e4l\u00f6t' },
    { feature: 'Vaikeustasot', ourApp: '4 tasoa: eritt\u00e4in helposta vaikeaan', typical: '1\u20132 kiinte\u00e4\u00e4 tasoa' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa muuttujina', typical: 'Ei visuaalista tukea' },
    { feature: 'Operaatiot', ourApp: 'Yhteenlasku, v\u00e4hennyslasku tai sekamuoto', typical: 'Vain yksi operaatio' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattisesti kuvaratkaisuineen', typical: 'Manuaalinen luonti' },
    { feature: 'Kaupallinen k\u00e4ytt\u00f6', ourApp: 'Myyntilisenssi sis\u00e4ltyy', typical: 'Lis\u00e4lisenssimaksu' },
  ],
  researchBacking: [
    { claim: 'Kuvallisten esitysten kayttoo matemaattisina muuttujina kehittaa varhaista algebrallista paattelya ilman muodollisen symboliikan aiheuttamaa kognitiivista kuormitusta.', source: 'Leino, K. et al., "Matemaattinen ajattelu ja ongelmanratkaisu perusopetuksessa," Koulutuksen tutkimuslaitos, Jyvaskyla' },
    { claim: 'Pulmapohjainen oppiminen lisaa oppilaiden sitoutumista ja motivaatiota erityisesti niilla oppilailla, jotka vastustavat perinteisia mekaanisia harjoituksia.', source: 'Hannula, M., "Motivaatio ja matematiikan oppiminen," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvapulmat esittelivat algebrallisen ajattelun ekaluokkalaisilleni ilman etta he edes tajusivat opetteleevansa algebraa. Oppilaat pyytavat lisaa pulmia joka tunti.', name: 'Laura Nieminen', role: '2. luokan opettaja', school: 'Ruusulan koulu, Turku' },
    { quote: 'Minulla on oppilaita, jotka kieltaytyivat tekemasta tavallisia matematiikkatehtavia mutta pyytavat nyt innokkaasti lisaa pulmia. Visuaalinen muoto muutti heidaan asenteensa matematiikkaa kohtaan.', name: 'Pekka Savolainen', role: 'Matematiikan opettaja', school: 'Rantalan koulu, Oulu' },
  ],
  tips: {
    sectionTitle: 'Matematiikkapulmastrategiat luokka-asteittain',
    sectionDescription: 'Saada matematiikkapulmageneraattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset vaikeustason, operaatiot ja lukualueen esiopetuksesta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Tutustu pulmiin opettajajohtoisesti', description: 'Kaytta erittain helppoja kahden symbolin pulmia luvuilla 1\u201310. Esittele pulmien ratkaisuprosessi koko luokan harjoituksena. Ohjaa oppilaita paattelemaan kuvasymbolien arvoja yhdessa. Toiminnallinen lahestymistapa POPS 2014 tavoitteen T1 mukaisesti.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kahden symbolin yhteenlasku', description: 'Luo helppoja kahden symbolin pulmia pelkilla yhteenlaskuilla ja luvuilla 1\u201310. Oppilaat ratkaisevat itsenaisesti kun prosessi on tuttu. Kaytta 1\u20132 pulmaa sivulla selkeyden vuoksi. Visuaaliset pulmat tukevat POPS 2014 matematiikan tavoitetta T2.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Kolme symbolia ja yhteenlasku', description: 'Siirry kolmen symbolin pulmiin pelkilla yhteenlaskuilla ja luvuilla 1\u201315. Oppilaat kehittavat jarjestelmallista paattelystrategiaa. Kaytta 2\u20134 pulmaa sivulla.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Sekaoperaatiot ja laajempi lukualue', description: 'Esittele yhteen- ja vahennyslasku samoissa pulmissa lukualueella 1\u201320. Oppilaat oppivat joustavaa laskemista ja kasien kaanteisoperaatioita. Normaali vaikeustaso sopii useimmille toisluokkalaisille.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Nelja symbolia ja haastepulmat', description: 'Kaytta vaikeita neljan symbolin sekaoperaatiopulmia lukualueella 1\u201350. Oppilaat kirjoittavat paattelyketjunsa yloes. POPS 2014 vuosiluokkien 3\u20136 tavoitteen T1 mukaista matemaattisen ajattelun vahvistamista.' },
    ],
  },
};

// ===================================================================
// 6. WORD SCRAMBLE (sanansekoitus-tyoarkit)
// ===================================================================
const wordScramble = {
  file: 'sanansekoitus-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f5bc}\ufe0f', title: 'Kuvavihje-sekoituspulmat', description: 'Jokainen pulma yhdist\u00e4\u00e4 teemakuvan ja sekoitetut kirjaimet. Kuva aktivoi visuaalisen sanavaraston ja antaa vihjeen oikeasta sanasta. Oppilaat j\u00e4rjest\u00e4v\u00e4t kirjaimet oikeaan j\u00e4rjestykseen rakentaen oikeinkirjoitustaitoja ja foneemista tietoisuutta.' },
    { id: '2', icon: '\u{1f4ca}', title: 'Nelj\u00e4 vaikeustasoa', description: 'Valitse nelj\u00e4st\u00e4 vaikeustasosta: ei vihjeit\u00e4, helppo, normaali ja vaikea. Helppo-tasolla useampi kirjain on oikealla paikallaan. Vaikea-tasolla vain yksi kirjain on vihjeen\u00e4. Ei vihjeit\u00e4 -taso on haastava ilman mit\u00e4\u00e4n kirjainvihjeit\u00e4.' },
    { id: '3', icon: '\u{1f3a8}', title: 'Vokaali-konsonantti-v\u00e4rikoodaus', description: 'Vokaalit n\u00e4kyv\u00e4t vaaleansinisin\u00e4 ja konsonantit valkoisina. V\u00e4rikoodaus korostaa vokaalien sijoittelua sanoissa ja auttaa oppilaita hahmottamaan sanan rakennetta. T\u00e4m\u00e4 tukee suomen kielen vokaaliharmonian ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '4', icon: '\u{1f4da}', title: 'Yli 3000 teemakuvaa', description: 'Selaa yli 3000 kuvaa teemoittain: el\u00e4imet, ruoka, kulkuneuvot, luonto ja kymmeni\u00e4 muita. Kuvavihjeet auttavat oppilaita tunnistamaan kohdesanan ennen kirjainten j\u00e4rjest\u00e4mist\u00e4. Vaihda teemoja vastaamaan opetussuunnitelman aihealuetta.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 oikein kirjoitetut sanat sekoitettujen versioiden rinnalla. Opettajat tarkistavat oppilasty\u00f6t nopeasti. Vastausavaimet sopivat itsetarkistuspisteille.' },
    { id: '6', icon: '\u{1f5b1}\ufe0f', title: 'T\u00e4ysi muokkausty\u00f6kalu', description: 'Siirr\u00e4, skaalaa, kierr\u00e4 tai poista yksitt\u00e4isi\u00e4 pulmia. Lis\u00e4\u00e4 mukautettua teksti\u00e4, vaihda fontteja ja v\u00e4rej\u00e4. Luo ammattimaisia asetteluja ilman suunnittelukokemusta. Kaikki elementit ovat t\u00e4ysin muokattavissa.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Myy sanansekoituskokoelmia verkossa tilaukseen sis\u00e4ltyv\u00e4ll\u00e4 kaupallisella lisenssill\u00e4. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja. Oikeinkirjoituspeliteht\u00e4v\u00e4t ovat jatkuvasti suosittuja tuotteita.' },
    { id: '8', icon: '\u270f\ufe0f', title: 'Oikeinkirjoituksen kehitt\u00e4minen', description: 'Sanansekoitusteht\u00e4v\u00e4t vahvistavat oikeinkirjoitustaitoja vaatimalla oppilaita j\u00e4rjest\u00e4m\u00e4\u00e4n kirjaimia oikeaan j\u00e4rjestykseen. Aktiivinen kirjainten k\u00e4sittely vahvistaa foneemi-grafeemi-yhteyksi\u00e4 tehokkaammin kuin passiivinen kopioiminen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'KVK-sanojen sekoituspulmat kuvavihjeill\u00e4', description: 'Luo helppoja sanansekoituksia 3\u20134 kirjaimen sanoilla kuvavihjeill\u00e4. Ota vokaali-konsonantti-v\u00e4rikoodaus k\u00e4ytt\u00f6\u00f6n auttamaan alkavia lukijoita hahmottamaan sanan rakennetta. Esiopetuksen oppilaat harjoittelevat kirjainj\u00e4rjestyst\u00e4 toiminnallisesti.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Oikeinkirjoitusharjoittelu teemakuvilla', description: 'Generoi sanansekoituspulmia viikon sanalistojen ja lukuyksik\u00f6iden sanastosta. K\u00e4yt\u00e4 normaalia vaikeustasoa 5\u20136 pulmalla sivulla. Oppilaat kohtaavat sanalistasanat pelilisess\u00e4 muodossa, mik\u00e4 parantaa oikeinkirjoituksen muistamista.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Eriytetyt oikeinkirjoituspaketit jokaiselle lapselle', description: 'Luo eri vaikeustason sanansekoituspulmia kaikille lapsillesi yhdell\u00e4 tilauksella. Helppoja 3-kirjaimisia sanoja nuorimmille, haastavia 6\u20137-kirjaimisia sanoja vanhemmille. Teemapohjaiset paketit pit\u00e4v\u00e4t harjoittelun tuoreena.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikieliset sanansekoitukset 11 kielell\u00e4', description: 'Luo sanansekoituspulmia 11 kielell\u00e4 rakentaaksesi visuaalista sanastoa. Kuvavihjeet tarjoavat universaalin kontekstin kielen yli. Aloita oppilaan kotikielell\u00e4 ja siirry asteittain suomenkielisiin pulmiin.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso ja visuaalinen tuki', description: 'S\u00e4\u00e4d\u00e4 vaikeustasoa ja kirjainvihjeiden m\u00e4\u00e4r\u00e4\u00e4 jokaisen oppilaan tarpeiden mukaan. Kuvavihjeet v\u00e4hent\u00e4v\u00e4t kognitiivista kuormitusta. V\u00e4rikoodaus auttaa oppilaita hahmottamaan sanan rakennetta oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy oikeinkirjoituspaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia sanansekoituskokoelmia myyntiin. Oikeinkirjoituspeliteht\u00e4v\u00e4t ovat jatkuvasti suosittuja oppimateriaalikaupoissa. Kaupallinen lisenssi kattaa kaikki myyntikanavat.' },
  ],
  faq: [
    { id: '1', question: 'Miten sanansekoitusgeneraattori luo pulmia?', answer: 'Generaattori valitsee kuvia valitsemastasi teemasta, tunnistaa niiden nimet ja sekoittaa kirjaimet satunnaiseen j\u00e4rjestykseen. Oppilas n\u00e4kee kuvan ja sekoitetut kirjaimet ja j\u00e4rjest\u00e4\u00e4 kirjaimet oikeaan j\u00e4rjestykseen sanan muodostamiseksi.' },
    { id: '2', question: 'Mitka vaikeustasot ovat saatavilla?', answer: 'Nelj\u00e4 vaikeustasoa: ei vihjeit\u00e4 (kaikki kirjaimet sekoitettu), helppo (useampi kirjain oikealla paikalla), normaali (muutama kirjainvihje) ja vaikea (vain yksi kirjainvihje). Vaikeustaso s\u00e4\u00e4telee kuinka monta kirjainta n\u00e4kyy jo oikealla paikallaan.' },
    { id: '3', question: 'Miten varikoodaus toimii sanansekoituksessa?', answer: 'Vokaalit n\u00e4kyv\u00e4t vaaleansinisin\u00e4 ja konsonantit valkoisina. V\u00e4rikoodaus korostaa vokaalien sijoittelua sanoissa. T\u00e4m\u00e4 auttaa oppilaita hahmottamaan sanan \u00e4\u00e4nnerakennetta ja tukee suomen kielen vokaaliharmonian ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '4', question: 'Sisaltavatko tehtavat vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi vastausavaimen, joka n\u00e4ytt\u00e4\u00e4 oikein kirjoitetut sanat sekoitettujen versioiden rinnalla. Opettajat tarkistavat ty\u00f6t nopeasti tai asettavat vastausavaimet itsetarkistuspisteille.' },
    { id: '5', question: 'Mille ikarryhmille sanansekoitustehtavat sopivat?', answer: 'Sanansekoituspulmat palvelevat 5\u201310-vuotiaita. Esiopetusik\u00e4iset aloittavat 3-kirjaimisilla sanoilla helpolla vaikeustasolla. 1.\u20132. luokan oppilaat harjoittelevat 4\u20136-kirjaimisia sanoja. 3. luokan oppilaat haastavat itsens\u00e4 monstavuisilla sanoilla ilman vihjeit\u00e4.' },
    { id: '6', question: 'Miten sanansekoitukset rakentavat oikeinkirjoitustaitoja?', answer: 'Sanansekoitusteht\u00e4v\u00e4t vaativat oppilaita tunnistamaan oikeat kirjainsarjat. Aktiivinen kirjainten j\u00e4rjest\u00e4minen vahvistaa foneemi-grafeemi-yhteyksi\u00e4 ja ortografista muistia tehokkaammin kuin passiivinen kopioiminen tai lukeminen.' },
    { id: '7', question: 'Voiko teemallisia sanansekoituksia luoda?', answer: 'Kyll\u00e4, valitse 3000+ kuvakirjastosta teemoja: el\u00e4imet, ruoka, kulkuneuvot, luonto ja kymmeni\u00e4 muita. Luo el\u00e4insanansekoituksia luontoyksikoihin tai ruokateemaisia pulmia ravitsemustunneille.' },
    { id: '8', question: 'Kuinka kauan yhden tehtavan luominen kestaa?', answer: 'Yhden sanansekoitusteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema, vaikeustaso ja pulmien m\u00e4\u00e4r\u00e4. Generaattori rakentaa pulmat automaattisesti. Luo koko viikon oikeinkirjoitusharjoitukset 15 minuutissa.' },
    { id: '9', question: 'Tukeeko generaattori suomen kielta?', answer: 'Kyll\u00e4, generaattori tukee t\u00e4ysin suomen kielt\u00e4 mukaan lukien \u00e4, \u00f6 ja muut erikoismerkit. Suomenkielisten sanojen sekoitukset toimivat moitteettomasti. Vokaali-konsonantti-v\u00e4rikoodaus tukee erityisesti suomen \u00e4\u00e4nnerakenteen ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '10', question: 'Miten sanansekoitukset tukevat POPS 2014 tavoitteita?', answer: 'Sanansekoitusteht\u00e4v\u00e4t tukevat \u00e4idinkielen ja kirjallisuuden (AI) tavoitetta T3 (kirjoittamisen harjoittelu). Aktiivinen kirjainten k\u00e4sittely kehitt\u00e4\u00e4 oikeinkirjoitustaitoja ja foneemista tietoisuutta POPS 2014 toiminnallisen oppimisen periaatteiden mukaisesti.' },
    { id: '11', question: 'Voinko myydaa sanansekoitustehtavia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Oikeinkirjoituspeliteht\u00e4v\u00e4t ovat jatkuvasti suosittuja oppimateriaalikaupoissa. Myy teemapaketteja ilman attribuutiovaatimuksia tai lis\u00e4maksuja.' },
    { id: '12', question: 'Voiko sanansekoituksia luoda ilman kuvia?', answer: 'Kyll\u00e4, k\u00e4yt\u00e4 tekstipohjaista tilaa luodaksesi sanansekoituksia omilla sanalistoillasi ilman kuvia. T\u00e4m\u00e4 sopii tilanteisiin, joissa haluat kohdistaa tiettyj\u00e4 sanastosanoja opetussuunnitelmasta ilman kuvallista tukea.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Yhdist\u00e4 sanansekoituspulmat sanahakuteht\u00e4viin kaksinkertaiseen sanastoharjoitteluun. Oppilaat sekoittavat sanoja yhdess\u00e4 pulmassa ja etsiv\u00e4t samoja sanoja piilotettuna toisessa.' },
    { id: '2', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'Yhdist\u00e4 sanansekoitukset t\u00e4yt\u00e4-puuttuva-kirjain -teht\u00e4viin. Oppilaat j\u00e4rjest\u00e4v\u00e4t kirjaimia yhdess\u00e4 pulmassa ja t\u00e4ytt\u00e4v\u00e4t puuttuvia kirjaimia toisessa.' },
    { id: '3', slug: 'ristisanatehtavat-tyoarkit', name: 'Ristisanateht\u00e4v\u00e4t', category: '\u00c4idinkieli', icon: '\u2795', description: 'Lis\u00e4\u00e4 ristisanateht\u00e4vi\u00e4 sanansekoituspaketteihin monipuoliseen sanastoharjoitteluun. Oppilaat kohtaavat saman sanavaraston eri pulmamuodoissa.' },
    { id: '4', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Yhdist\u00e4 sanansekoitukset aakkosj\u00e4rjestysharjoituksiin. Oppilaat, jotka hallitsevat kirjaintuntemuksen aakkosjunilla, siirtyv\u00e4t sanansekoituksin kokonaisten sanojen rakentamiseen.' },
    { id: '5', slug: 'kuvakryptogrammi-tyoarkit', name: 'Kuvakryptogrammi', category: '\u00c4idinkieli', icon: '\u{1f510}', description: 'Haasta edistyneit\u00e4 oppilaita kryptogrammi-koodinmurtoharjoituksilla sanansekoituspulmien rinnalla. Molemmat muodot kehitt\u00e4v\u00e4t kirjainanalyysi- ja oikeinkirjoitustaitoja.' },
    { id: '6', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: '\u00c4idinkieli', icon: '\u270f\ufe0f', description: 'Yhdist\u00e4 sanansekoituksen j\u00e4lkeen k\u00e4sinkirjoitusharjoittelu. Oppilaat ensin j\u00e4rjest\u00e4v\u00e4t sanan oikein ja sitten harjoittelevat sen kirjoittamista k\u00e4sinkirjoitusteht\u00e4v\u00e4ll\u00e4.' },
  ],
  aiOverviewSnippet: 'Sanansekoitusgeneraattori lapsille on verkkotyokalu, joka luo tulostettavia pulmia, joissa oppilaat jarjestavat sekoitetut kirjaimet oikeaan jarjestykseen sanan muodostamiseksi. Opettajat valitsevat vaikeustason, teemakuvavihjeet 3000+ kirjastosta ja lataavat valmiin PDF:n vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Vaikeustasot', ourApp: '4 tasoa (ei vihjeit\u00e4/helppo/normaali/vaikea)', typical: 'Yksi kiinte\u00e4 vaikeustaso' },
    { feature: 'V\u00e4rikoodaus', ourApp: 'Vokaali-konsonantti-v\u00e4rierottelu', typical: 'Kaikki samalla v\u00e4rill\u00e4' },
    { feature: 'Tekstipohjainen tila', ourApp: 'Omat sanalistat ilman kuvia', typical: 'Kuvat pakollisia tai ei kuvia' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattisesti joka teht\u00e4v\u00e4\u00e4n', typical: 'Usein lis\u00e4maksullisia' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Anagrammipohjaiset harjoitukset tuottavat vahvemman ortografisen muistin kuin passiivinen kopioiminen, koska aktiivinen kirjainten kasittely pakottaa oppilaan prosessoimaan jokaisen kirjaimen aseman ja jarjestyksen.', source: 'Lyytinen, H. et al., "Lukivaikeuksien ennaltaehkaisy ja varhainen tunnistaminen," Jyvaskylan yliopisto' },
    { claim: 'Aktiivinen kirjainten kasittely vahvistaa foneemi-grafeemi-yhteyyksia tehokkaammin kuin pelkka lukeminen tai kopioiminen, erityisesti alkavilla lukijoilla.', source: 'Aro, M. & Lerkkanen, M.-K., "Lukutaidon kehitys ja tukeminen," Niilo Maki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Nelja vaikeustasoa ovat pelastus sekaryhmalleni. Voin antaa saman teeman kaikille mutta saataa haastetta jokaisen oppilaan tason mukaan. Erityisesti vokaali-konsonantti-varikoodaus auttaa heikompia lukijoita.', name: 'Katja Lehtonen', role: 'Aidinkielen opettaja', school: 'Havukosken koulu, Vantaa' },
    { quote: 'Korvasin vanhan oikeinkirjoitustyokirjamme viikoittaisilla sanansekoituspaketeilla ja oppilaiden oikeinkirjoitustulokset paranivat selkeasti. Oppilaat pitavat tehtavia pelina, eivat laksyina.', name: 'Tuomas Rantanen', role: '2. luokan opettaja', school: 'Koivulan koulu, Lahti' },
  ],
  tips: {
    sectionTitle: 'Sanansekoitusstrategiat luokka-asteittain',
    sectionDescription: 'Saada sanansekoitusgeneraattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset vaikeustason, sanapituuden ja vihjemaaran esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kirjainten yhdistaminen kuviin', description: 'Kaytta helppoa vaikeustasoa kolmikirjaimisilla sanoilla ja selkeilla kuvavihjjilla. Ota vokaali-konsonantti-varikoodaus kayttoon. Esikoululaiset harjoittelevat kirjainjarjestysta tutuilla sanoilla kuten kissa, koira ja auto.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: KVK-sanojen sekoitukset', description: 'Kaytta helppoa tai normaalia vaikeustasoa KVK-sanoilla (konsonantti-vokaali-konsonantti). Valitse 4\u20136 pulmaa sivulla. Oppilaat kehittavat foneemista tietoisuutta jarjestamalla tuttuja sanoja oikein.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Sanalistojen ja lukusanastojen harjoittelu', description: 'Kaytta normaalia vaikeustasoa viikon sanalistojen sanoilla. 5\u20136 pulmaa sivulla. Oppilaat kohtaavat sanalistasanat pelillisessa muodossa, mika parantaa oikeinkirjoituksen muistamista kokeissa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Sanastonrakennus ja pidemmaat sanat', description: 'Siirry vaikeaan tasoon 5\u20136-kirjaimisilla sanoilla ymparistopin ja aidinkielen sanastosta. Oppilaat rakentavat akateemista sanastoa samalla kun vahvistavat oikeinkirjoitustaitojaan haastavammilla sanoilla.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Ilman vihjetta ja monitavuiset sanat', description: 'Kaytta ei vihjejta tai vaikea -tilaa monitavuisilla sanoilla ja akateemisella sanastolla. Oppilaat rakentavat syvalllista ortografista tietoisuutta POPS 2014 vuosiluokkien 3\u20136 aidinkielen tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 7. FIND AND COUNT (etsi-ja-laske-tyoarkit)
// ===================================================================
const findAndCount = {
  file: 'etsi-ja-laske-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f50d}', title: 'Etsi ja laske -pulmat yhdist\u00e4v\u00e4t visuaalisen etsinn\u00e4n ja matematiikan', description: 'Oppilaat etsiv\u00e4t tiettyj\u00e4 kuvia ruudukosta ja laskevat kuinka monta kutakin l\u00f6ytyy. Kehitt\u00e4\u00e4 visuaalista erottelukyky\u00e4, yksi-yhteen-vastaavuutta ja lukum\u00e4\u00e4r\u00e4n k\u00e4sitett\u00e4 samanaikaisesti. I Spy -formaatti pit\u00e4\u00e4 oppilaat sitoutuneina.' },
    { id: '2', icon: '\u{1f4ca}', title: 'Useita kohderyhmi\u00e4 per teht\u00e4v\u00e4', description: 'Valitse 2\u20136 kohdekategoriaa per teht\u00e4v\u00e4. Yksinkertainen kahdella kohteella sopii esikoululaisille. Monimutkaisempi kuudella kohteella haastaa edistyneit\u00e4 oppilaita. Jokainen kohde saa oman teht\u00e4v\u00e4tyyppins\u00e4.' },
    { id: '3', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 kuvatiheys', description: 'S\u00e4\u00e4d\u00e4 kokonaiskohteiden m\u00e4\u00e4r\u00e4\u00e4 10\u201350. Harvempi asettelu aloittelijoille, tihe\u00e4mpi edistyneille. Ruudukon koko 5x5\u201310x10 hallitsee kokonaishaastetta. Generaattori sijoittaa kohteet satunnaisesti tasaiseen jakaumaan.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa etsitt\u00e4viksi kohteiksi', description: 'Valitse etsitt\u00e4v\u00e4t kohteet 3000+ kuvakirjastosta: el\u00e4imet, ruoka, kulkuneuvot, lelut ja luonto. Tutut kuvat pit\u00e4v\u00e4t oppilaat kiinnostuneina. Vaihda teemoja vastaamaan viikon opintoyksikk\u00f6\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Vastausavaimet korostettuin kohtein ja tarkistetuin lukum\u00e4\u00e4rin', description: 'Jokainen teht\u00e4v\u00e4 generoi vastausavaimen, jossa kohdekohteet on korostettu ja oikeat lukum\u00e4\u00e4r\u00e4t n\u00e4kyv\u00e4t. Opettajat tarkistavat oppilasty\u00f6t nopeasti. Vastausavaimet sopivat itsetarkistuspisteille.' },
    { id: '6', icon: '\u{1f503}', title: 'Nelj\u00e4 teht\u00e4v\u00e4tyyppi\u00e4: ympyr\u00f6i, nelikulmio, rasti, laske', description: 'Jokaiselle kohteelle m\u00e4\u00e4r\u00e4t\u00e4\u00e4n oma teht\u00e4v\u00e4tyyppi: ympyr\u00f6i l\u00f6ydetyt, piirr\u00e4 nelikulmio ymp\u00e4rille, laita rasti p\u00e4\u00e4lle tai laske lukum\u00e4\u00e4r\u00e4. Useat teht\u00e4v\u00e4tyypit samalla sivulla kehitt\u00e4v\u00e4t toiminnanohjauksen taitoja.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Myy etsi ja laske -kokoelmia verkossa. I Spy -tyyppiset teht\u00e4v\u00e4t ovat suosittuja varhaiskasvatus- ja esiopetusmarkkinoilla. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo etsi ja laske -teht\u00e4vi\u00e4 11 kielell\u00e4. Visuaalinen muoto toimii kielirajojen yli, mutta ohjetekstit ja merkinn\u00e4t k\u00e4\u00e4ntyv\u00e4t automaattisesti. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f392}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen etsinn\u00e4n kehitt\u00e4minen 5\u20136-vuotiaille', description: 'Luo yksinkertaisia 6x6 ruudukoita kahdella kohteella ja ympyr\u00f6i-teht\u00e4v\u00e4tyypill\u00e4. Esiopetusik\u00e4iset kehitt\u00e4v\u00e4t visuaalista erottelukyky\u00e4 ja yksi-yhteen-vastaavuutta. I Spy -muoto pit\u00e4\u00e4 oppilaat motivoituneina POPS 2014 matematiikan tavoitteen T2 mukaisesti.' },
    { id: '2', icon: '\u{1f4da}', title: '1. luokan opettajat', subtitle: 'Itsen\u00e4inen laskuharjoittelu useilla teht\u00e4v\u00e4tyypeill\u00e4', description: 'K\u00e4yt\u00e4 8x8 ruudukoita kolmella kohteella. Osoita eri teht\u00e4v\u00e4tyypit kullekin kohteelle: ympyr\u00f6i yksi, laita rasti toiselle, laske kolmannelle. Oppilaat harjoittelevat ohjeiden noudattamista ja laskemista itsen\u00e4isesti.' },
    { id: '3', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Saavutettavat etsi ja laske -teht\u00e4v\u00e4t erilaisille oppijoille', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa, kohteiden m\u00e4\u00e4r\u00e4\u00e4 ja teht\u00e4v\u00e4tyyppi\u00e4 yksil\u00f6llisesti. Visuaalinen muoto v\u00e4hent\u00e4\u00e4 lukemisen kuormitusta. Pieni ruudukko yhdell\u00e4 kohteella on saavutettava l\u00e4ht\u00f6kohta kaikille oppilaille.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielest\u00e4 riippumaton laskuharjoittelu', description: 'Visuaaliset etsi ja laske -teht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa. Oppilaat etsiv\u00e4t ja laskevat kuvia ilman lukemista. Tutut kuvat ovat universaaleja kielirajojen yli. 11 kielen tuki ohjeteksteille.' },
    { id: '5', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Itseohjautuvat etsi ja laske -harjoitukset', description: 'Luo etsi ja laske -teht\u00e4vi\u00e4, joita lapset voivat tehd\u00e4 itsen\u00e4isesti. Visuaalinen muoto on intuitiivinen ilman ohjausta. Vastausavaimet mahdollistavat itsetarkistuksen. Eri vaikeustasot palvelevat kaikkia lapsia perheess\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'I Spy -kokoelmat varhaiskasvatusmarkkinoille', description: 'I Spy -tyyppiset teht\u00e4v\u00e4t ovat suosittuja varhaiskasvatus- ja esiopetusmarkkinoilla. Luo teemallisia kokoelmia eri vaikeustasoilla. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lis\u00e4maksuja.' },
  ],
  faq: [
    { id: '1', question: 'Miten etsi ja laske -tehtavat toimivat?', answer: 'Oppilaat saavat ruudukon t\u00e4ynn\u00e4 kuvia ja erillisen otsikkorivin, jossa n\u00e4kyy etsitt\u00e4v\u00e4t kohteet teht\u00e4v\u00e4tyyppeineen. Oppilaat etsiv\u00e4t kohteita ruudukosta ja suorittavat m\u00e4\u00e4r\u00e4tyn teht\u00e4v\u00e4n: ympyr\u00f6iv\u00e4t, piirt\u00e4v\u00e4t nelikulmion, laittavat rastin tai laskevat lukum\u00e4\u00e4r\u00e4n.' },
    { id: '2', question: 'Mitka tehtavatyypit ovat saatavilla?', answer: 'Nelj\u00e4 teht\u00e4v\u00e4tyyppi\u00e4: ympyr\u00f6i (piirr\u00e4 ympyr\u00e4 kohteen ymp\u00e4rille), nelikulmio (piirr\u00e4 laatikko kohteen ymp\u00e4rille), rasti (laita rasti kohteen p\u00e4\u00e4lle) ja laske (laske kohteiden lukum\u00e4\u00e4r\u00e4). Eri teht\u00e4v\u00e4tyypit samalla sivulla kehitt\u00e4v\u00e4t toiminnanohjauksen taitoja.' },
    { id: '3', question: 'Mitka ruudukon koot ovat saatavilla?', answer: 'Ruudukon koko on s\u00e4\u00e4dett\u00e4viss\u00e4 5x5\u201310x10. Pienemm\u00e4t 5x5 tai 6x6 ruudukot sopivat esikoululaisille. Keskikokoiset 7x7 tai 8x8 sopivat esiopetukseen ja 1. luokalle. Suuremmat 10x10 ruudukot haastavat edistyneit\u00e4 oppilaita.' },
    { id: '4', question: 'Kuinka monta etsittavaa kohdetta voi sisallyttaa?', answer: 'Valitse 2\u20136 etsitt\u00e4v\u00e4\u00e4 kohdetta per teht\u00e4v\u00e4. Kaksi kohdetta on yksinkertainen aloittelijoille. Nelj\u00e4 kohdetta on standardi esiopetukseen. Kuusi kohdetta haastaa edistyneit\u00e4 oppilaita useilla samanaikaisilla teht\u00e4vill\u00e4.' },
    { id: '5', question: 'Sisaltavatko tehtavat vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi vastausavaimen, jossa kohdekohteet on korostettu visuaalisesti ja oikeat lukum\u00e4\u00e4r\u00e4t n\u00e4kyv\u00e4t. Opettajat tarkistavat oppilasty\u00f6t sekunneissa.' },
    { id: '6', question: 'Mille ikarryhmille etsi ja laske -tehtavat sopivat?', answer: 'Etsi ja laske -teht\u00e4v\u00e4t palvelevat 4\u20139-vuotiaita. Esikoululaiset 4\u20135 k\u00e4ytt\u00e4v\u00e4t pieni\u00e4 ruudukoita yhdell\u00e4 kohteella. Esiopetusik\u00e4iset 5\u20136 harjoittelevat kahdella kohteella. 1.\u20132. luokan oppilaat haastavat itsens\u00e4 3\u20134 kohteella. 3. luokan oppilaat k\u00e4ytt\u00e4v\u00e4t suurimpia ruudukoita.' },
    { id: '7', question: 'Sopivatko etsi ja laske -tehtavat esiopetukseen?', answer: 'Etsi ja laske -teht\u00e4v\u00e4t sopivat erinomaisesti esiopetukseen. I Spy -muoto kehitt\u00e4\u00e4 visuaalista erottelukyky\u00e4, yksi-yhteen-vastaavuutta ja lukum\u00e4\u00e4r\u00e4n k\u00e4sitett\u00e4. T\u00e4m\u00e4 tukee POPS 2014 matematiikan tavoitteita T2 ja T7.' },
    { id: '8', question: 'Miten etsi ja laske -tehtavat kehittavat matematiikkataitoja?', answer: 'Oppilaat harjoittelevat yksi-yhteen-vastaavuutta laskiessaan kohteita, visuaalista erottelukyky\u00e4 etsiess\u00e4\u00e4n kuvia ja lukum\u00e4\u00e4r\u00e4n vertailua useiden kohteiden v\u00e4lill\u00e4. Useat teht\u00e4v\u00e4tyypit kehitt\u00e4v\u00e4t toiminnanohjauksen joustavuutta.' },
    { id: '9', question: 'Kuinka kauan yhden tehtavan luominen kestaa?', answer: 'Yhden etsi ja laske -teht\u00e4v\u00e4n luominen vie alle 2 minuuttia. Valitse kohteet, ruudukon koko ja teht\u00e4v\u00e4tyypit. Generaattori sijoittaa kohteet automaattisesti. Luo koko viikon laskuharjoitukset 10 minuutissa.' },
    { id: '10', question: 'Voiko teemakuvia valita vapaasti?', answer: 'Kyll\u00e4, valitse etsitt\u00e4v\u00e4t kohteet 3000+ kuvakirjastosta. El\u00e4imet, ruoka, kulkuneuvot ja muut tutut kuvat pit\u00e4v\u00e4t oppilaat kiinnostuneina. Vaihda teemoja vastaamaan viikon opintoyksikk\u00f6\u00e4.' },
    { id: '11', question: 'Voinko myydaa etsi ja laske -kokoelmia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. I Spy -tyyppiset teht\u00e4v\u00e4t ovat suosittuja varhaiskasvatusmarkkinoilla. Myy teemapaketteja ilman attribuutiovaatimuksia tai lis\u00e4maksuja.' },
    { id: '12', question: 'Miten etsi ja laske -tehtavat tukevat POPS 2014 tavoitteita?', answer: 'Teht\u00e4v\u00e4t tukevat matematiikan tavoitteita T2 (lukum\u00e4\u00e4r\u00e4n ja laskemisen ymm\u00e4rrys) ja T7 (luokittelu ja s\u00e4\u00e4nn\u00f6nmukaisuuksien tunnistaminen). Visuaalinen etsint\u00e4 ja laskeminen ovat POPS 2014 toiminnallisen oppimisen periaatteiden mukaisia.' },
  ],
  relatedApps: [
    { id: '1', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Visuaaliset taidot', icon: '\u{1f50d}', description: 'T\u00e4ydenn\u00e4 etsi ja laske -teht\u00e4vi\u00e4 piiloesineiden etsint\u00e4harjoituksilla tasapainoiseen opetukseen. Molemmat muodot kehitt\u00e4v\u00e4t visuaalista erottelukyky\u00e4 eri konteksteissa.' },
    { id: '2', slug: 'kuvakaavio-tyoarkit', name: 'Kuvakaavio', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Lis\u00e4\u00e4 kuvakaavioharjoituksia etsi ja laske -teht\u00e4vien rinnalle monipuoliseen laskuharjoitteluun. Oppilaat laskevat kohteita ja sitten esitt\u00e4v\u00e4t tuloksia kaaviomuodossa.' },
    { id: '3', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhdist\u00e4 etsi ja laske -teht\u00e4v\u00e4t yhteenlaskuharjoituksiin kattavaan tuntisuunnitteluun. Oppilaat laskevat kohteita ja sitten laskevat kohteet yhteen.' },
    { id: '4', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n vai v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u2696\ufe0f', description: 'Yhdist\u00e4 etsi ja laske -k\u00e4sitteet lukum\u00e4\u00e4r\u00e4n vertailuharjoituksiin. Oppilaat laskevat eri kohteita ja vertailevat lukum\u00e4\u00e4ri\u00e4 kesken\u00e4\u00e4n.' },
    { id: '5', slug: 'aarteenetsinta-tyoarkit', name: 'Aarteenetsint\u00e4', category: 'Visuaaliset taidot', icon: '\u{1f3f4}\u200d\u2620\ufe0f', description: 'Laajenna etsi ja laske -harjoittelua seikkailuteemaisilla etsint\u00e4pulmilla. Oppilaat kehitt\u00e4v\u00e4t samoja visuaalisia etsint\u00e4taitoja jiennitt\u00e4v\u00e4ss\u00e4 seikkailukontekstissa.' },
    { id: '6', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Varhaiskasvatus', icon: '\u{1f3b2}', description: 'Yhdist\u00e4 etsi ja laske -teht\u00e4v\u00e4t kuvabingoon kattavaan tuntisuunnitteluun. Molemmat muodot kehitt\u00e4v\u00e4t visuaalista tunnistamista ja tarkkaavaisuutta hauskassa kontekstissa.' },
  ],
  aiOverviewSnippet: 'Etsi ja laske -generaattori luo tulostettavia I Spy -ruudukoita, joissa oppilaat etsivat piilotettuja kohteita ja suorittavat nelja tehtavatyyppia: ympyroi, nelikulmio, rasti ja laske. Opettajat valitsevat 1\u20134 kohdetta 3000+ kuvakirjastosta, ruudukon koon 5x5\u201310x10 ja lataavat 300 DPI PDF:n vastausavaimineen alle 2 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4tyypit', ourApp: '4 teht\u00e4v\u00e4tyyppi\u00e4 per kohde (ympyr\u00f6i, nelikulmio, rasti, laske)', typical: 'Yksi teht\u00e4v\u00e4tyyppi per teht\u00e4v\u00e4' },
    { feature: 'Ruudukon koko', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 5x5\u201310x10', typical: 'Kiinte\u00e4 ruudukko ilman koon hallintaa' },
    { feature: 'I Spy -otsikkorivi', ourApp: 'Automaattisesti luotu otsikko kohteilla ja teht\u00e4v\u00e4ikoneilla', typical: 'Ei otsikkoa tai manuaalinen luonti' },
    { feature: 'Kohteiden sijoittelu', ourApp: 'Satunnainen tasainen jakautuminen ruudukkoon', typical: 'Satunnainen tai ep\u00e4tasainen sijoittelu' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattiset visuaalisin teht\u00e4v\u00e4merkinnoin ja lukum\u00e4\u00e4rin', typical: 'Usein ei mukana tai opettajan tekemi\u00e4' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy myyntiin', typical: 'Lis\u00e4maksu tai henkil\u00f6kohtainen k\u00e4ytt\u00f6' },
  ],
  researchBacking: [
    { claim: 'Upotettujen kohteiden laskeminen kehittaa yksi-yhteen-vastaavuutta ja subitisointitaitoja, jotka ovat matemaattisen ajattelun perustaitoja varhaislapsuudessa.', source: 'Aunio, P., "Matemaattisten taitojen kehitys ja tukeminen varhaiskasvatuksessa," Niilo Maki Instituutti' },
    { claim: 'Useiden samanaikaisten tehtavien suorittaminen kehittaa toiminnanohjauksen joustavuutta, mika vahvistaa kognitiivista kontrollia ja tarkkaavaisuuden siirtamista.', source: 'Lehto, J. et al., "Toiminnanohjaus ja oppiminen," Psykologia-lehti' },
  ],
  teacherTestimonials: [
    { quote: 'Nelja tehtavatyyppia yhdella sivulla ovat loistavat pistetyoskentelyyn. Oppilaat harjoittelevat eri taitoja samalla tehtavalla: visuaalista etsintaa, laskemista ja ohjeiden noudattamista. POPS 2014 toiminnallista oppimista parhaimmillaan.', name: 'Hanna Tuominen', role: 'Esiopetuksen opettaja', school: 'Tampereen normaalikoulu' },
    { quote: 'Kaytan 8x8 ruudukoita kolmella kohteella ekaluokkalaisilleni ja laskutehtava saa heidat kirjoittamaan lukuja joka kerta. Vastausavaimet tekevat tarkistuksesta nopeaa suurenkin ryhman kanssa.', name: 'Markus Aalto', role: '1. luokan opettaja', school: 'Jyvaskylan normaalikoulu' },
  ],
  tips: {
    sectionTitle: 'Etsi ja laske -strategiat luokka-asteittain',
    sectionDescription: 'Saada etsi ja laske -generaattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset ruudukon koon, kohteiden maaran ja tehtavatyypit esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: 5x5 ruudukko yhdella kohteella', description: 'Kaytta pienta 5x5 ruudukkoa yhdella etsittavalla kohteella ja ympyroi-tehtavatyypilla. Esikoululaiset harjoittelevat visuaalista etsintaa ja yksi-yhteen-vastaavuutta yksinkertaisimmassa muodossa. Ohjatussa pienryhmatyossa opettaja tukee laskemista.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: 6x6 ruudukko kahdella kohteella', description: 'Luo 6x6 tai 7x7 ruudukoita kahdella kohteella. Osoita ympyroi-tehtava toiselle ja laske-tehtava toiselle. Oppilaat harjoittelevat kahden eri ohjeen noudattamista samalla sivulla POPS 2014 matematiikan tavoitteen T2 mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: 8x8 ruudukko kolmella kohteella', description: 'Kaytta 8x8 ruudukkoa kolmella kohteella. Osoita eri tehtavatyypit kullekin: ympyroi, rasti ja laske. Ekaluokkalaiset kehittavat monitehtavakontrollia ja laskutaitoja itsenaisesti.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: 10x10 ruudukko neljalla kohteella', description: 'Luo 10x10 ruudukoita neljalla kohteella, joille kullekin oma tehtavatyyppi. Toisluokkalaiset harjoittelevat monimutkaista ohjeiden noudattamista ja tarkkaa laskemista suuremmassa ruudukossa.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Suurin ruudukko laskupainotteisesti', description: 'Kaytta 10x10 ruudukoita neljalla kohteella, joille kaikille osoitetaan laske-tehtavatyyppi. Kolmasluokkalaiset keskittyvat intensiiviseen laskuharjoitteluun ja lukumaarien vertailuun POPS 2014 vuosiluokkien 3\u20136 tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// PROCESSING LOGIC
// ===================================================================
const apps = [wordSearch, addition, alphabetTrain, coloring, mathWorksheet, wordScramble, findAndCount];

let updatedCount = 0;

for (const appData of apps) {
  const filePath = path.join(FI_DIR, appData.file);

  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace empty items arrays (skip first one = samples)
  let itemsCount = 0;
  const sectionKeys = ['features', 'useCases', 'faq', 'relatedApps'];

  content = content.replace(/items: \[\],?\s*\/\/ Samples loaded dynamically from content manager/g, (match) => {
    itemsCount++;
    if (itemsCount === 1) return match; // Keep samples.items empty

    const key = sectionKeys[itemsCount - 2];
    const data = appData[key];
    if (!data) return match;

    return 'items: ' + jsToTs(data, 4);
  });

  // Build enrichment string
  const enrichment = [
    '',
    '  // -- SEO & Content Enrichment (Part 174) ------------------------------------',
    '',
    `  aiOverviewSnippet: ${jsToTs(appData.aiOverviewSnippet)},`,
    '',
    `  comparisonTable: ${jsToTs(appData.comparisonTable, 2)},`,
    '',
    `  researchBacking: ${jsToTs(appData.researchBacking, 2)},`,
    '',
    `  teacherTestimonials: ${jsToTs(appData.teacherTestimonials, 2)},`,
    '',
    `  tips: ${jsToTs(appData.tips, 2)},`,
  ].join('\n');

  // Insert before closing }; (handle both \n and \r\n line endings)
  content = content.replace(/\r?\n};\r?\n\r?\nexport default/, `\n${enrichment}\n};\n\nexport default`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${appData.file} (${itemsCount} items sections found, ${itemsCount - 1} populated)`);
  updatedCount++;
}

console.log(`\nDone! ${updatedCount} of ${apps.length} files updated.`);
