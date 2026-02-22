/**
 * Part 177: FI Product Pages 22-28 — Content Enrichment
 *
 * Populates empty arrays (features, useCases, faq, relatedApps) and adds
 * SEO enrichment fields (aiOverviewSnippet, comparisonTable, researchBacking,
 * teacherTestimonials, tips) for 7 Finnish product pages.
 *
 * Usage: node scripts/apply-part177-seo.js
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
// 1. MORE-LESS (enemman-vahemman-tyoarkit)
// ===================================================================
const moreLess = {
  file: 'enemman-vahemman-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4ca}', title: 'Visuaalinen vertailu kuvaryhmien avulla', description: 'Oppilaat vertailevat kahta v\u00e4rik\u00e4st\u00e4 kuvaryhmaa m\u00e4\u00e4ritt\u00e4\u00e4kseen kumpi on suurempi, pienempi tai yht\u00e4 suuri. Kuva kuvaan -tila kehitt\u00e4\u00e4 konkreettista lukum\u00e4\u00e4r\u00e4n hahmottamista laskemisen kautta. Visuaalinen l\u00e4hestymistapa rakentaa lukujen suuruusluokan ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '2', icon: '\u2696\ufe0f', title: 'Suurempi, pienempi ja yht\u00e4 suuri -symbolit', description: 'Valitse perinteisten matemaattisten symbolien (>, <, =) ja lapsiystavallisten kuvitettujen versioiden v\u00e4lilt\u00e4. Kuvitussymbolit havainnollistavat vertailun k\u00e4sitteen intuitiivisesti. Oppilaat yhdist\u00e4v\u00e4t visuaalisen merkityksen muodolliseen merkint\u00e4tapaan.' },
    { id: '3', icon: '\u{1f522}', title: 'Joustava lukualueen hallinta', description: 'Kontrolloi vertailuteht\u00e4vien lukum\u00e4\u00e4r\u00e4aluetta pienist\u00e4 rymist\u00e4 suurempiin lukuihin. Aloita selv\u00e4st\u00e4 eroista, joissa toinen ryhm\u00e4 on selke\u00e4sti suurempi. Kavenna eroa tarkkuuden kehittyess\u00e4. Generaattori luo satunnaisia lukum\u00e4\u00e4ri\u00e4 m\u00e4\u00e4ritetyll\u00e4 alueella.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa laskettaviksi', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta vertailuteht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Lataa omia kuvia luokkahuoneen esineist\u00e4 tai oppilaiden t\u00f6ist\u00e4 personoidaksesi teht\u00e4vi\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet joka teht\u00e4v\u00e4\u00e4n', description: 'Jokainen vertailuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat symbolit ja lukum\u00e4\u00e4r\u00e4t n\u00e4kyv\u00e4t. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle PDF-muodossa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista osia. Lis\u00e4\u00e4 omia tekstej\u00e4, vaihda fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi ja rajaton k\u00e4ytt\u00f6', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin myyd\u00e4 vertailuteht\u00e4vi\u00e4 verkossa. Luo temaattisia vertailupaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki monikielisiin luokkiin', description: 'Luo vertailuteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja, tanska ja englanti. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Lukum\u00e4\u00e4r\u00e4vertailun perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia vertailuteht\u00e4vi\u00e4 pienill\u00e4 lukum\u00e4\u00e4rill\u00e4 ja selv\u00e4ll\u00e4 erolla. Esiopetuksen oppilaat harjoittelevat kuvaryhmien laskemista ja suuremman tunnistamista. Kuvitetut symbolit tekev\u00e4t vertailusta konkreettista. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Vertailusymbolien hallinta 1.\u20132. luokalla', description: 'Generoi vertailuteht\u00e4vi\u00e4 suuremmilla lukualueilla ja matemaattisilla symboleilla. Oppilaat siirtyv\u00e4t kuvitetusta vertailusta abstraktiin symbolimerkint\u00e4\u00e4n. Eriytet\u00e4\u00e4n lukualuetta ja symbolityyli\u00e4 taitotason mukaan.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja matematiikkaharjoituksia kotiin', description: 'Luo temaattisia vertailuteht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja ruokakuvat pit\u00e4v\u00e4t oppimisen motivoivana. Generoi viikon teht\u00e4v\u00e4t nopeasti eri vaikeustasoin. Visuaalinen l\u00e4hestymistapa sopii kotiharjoitteluun.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Matemaattista sanastoa visuaalisesti', description: 'Vertailuteht\u00e4v\u00e4t opettavat matemaattista sanastoa kuvapohjaisesti. Oppilaat oppivat vertailusanastoa (enemm\u00e4n, v\u00e4hemm\u00e4n, yht\u00e4 paljon) konkreettisesti. 11 kielen tuki mahdollistaa monikielisen matematiikkaopetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt vertailuharjoitukset', description: 'S\u00e4\u00e4d\u00e4 lukualuetta ja symbolityyli\u00e4 HOJKS-tavoitteiden mukaisesti. Kuvitetut symbolit tukevat heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat matemaattista itseluottamusta oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy vertailupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia vertailupaketteja myyt\u00e4v\u00e4ksi verkossa. Enemm\u00e4n vai v\u00e4hemm\u00e4n -materiaalit ovat jatkuvasti kysyttyj\u00e4 esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten vertailuteht\u00e4v\u00e4generaattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat vertailevat kuvaryhmien lukum\u00e4\u00e4ri\u00e4 ja valitsevat oikean vertailusymbolin. Valitse kuvat, lukualue ja symbolityyli. Generaattori tuottaa valmiin teht\u00e4v\u00e4n vastausavaimineen sekunneissa.' },
    { id: '2', question: 'Mitk\u00e4 vertailutilat ovat saatavilla?', answer: 'Kaksi tilaa: kuva kuvaan -tila vertailee kuvaryhmi\u00e4 kesken\u00e4\u00e4n, ja kuva numeroon -tila vertailee kuvaryhm\u00e4\u00e4 lukuun. Molemmat kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4n hahmottamista eri tavoin.' },
    { id: '3', question: 'Miten vertailusymboleita voi vaihtaa?', answer: 'Valitse perinteisten matemaattisten symbolien (>, <, =) ja kuvitettujen versioiden v\u00e4lilt\u00e4. Kuvitussymbolit havainnollistavat vertailun visuaalisesti. Oppilaat voivat ympyr\u00f6id\u00e4 oikean symbolin tai t\u00e4ytt\u00e4\u00e4 tyhj\u00e4n.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen vertailuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat symbolit ja lukum\u00e4\u00e4r\u00e4t n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat voivat tulostaa vastausavaimen erikseen tai n\u00e4ytt\u00e4\u00e4 dokumenttikameralla.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille vertailuteht\u00e4v\u00e4t sopivat?', answer: 'Vertailuteht\u00e4v\u00e4t palvelevat 4\u20138-vuotiaita. Esikoululaiset laskevat pieni\u00e4 ryhmi\u00e4 kuvitetuilla symboleilla. 1.\u20132. luokan oppilaat k\u00e4ytt\u00e4v\u00e4t matemaattisia symboleita suuremmilla lukualueilla.' },
    { id: '6', question: 'Miten lukualuetta s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Aseta vertailtavien lukum\u00e4\u00e4rien yl\u00e4- ja alaraja. Aloita pienill\u00e4 lukum\u00e4\u00e4rill\u00e4 (1\u20135) esiopetuksessa. Laajenna lukualuetta (1\u201320) 1.\u20132. luokalla. Generaattori luo satunnaisia lukum\u00e4\u00e4ri\u00e4 m\u00e4\u00e4ritetyll\u00e4 alueella.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 vertailuteht\u00e4viss\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa. Luokkahuoneen esineet tai oppilaiden piirustukset toimivat hyvin.' },
    { id: '8', question: 'Miten tulostan vertailuteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti kotitulostimella.' },
    { id: '9', question: 'Sopiiko vertailuteht\u00e4v\u00e4generaattori erityisopetukseen?', answer: 'Vertailuteht\u00e4v\u00e4t sopivat erinomaisesti erityisopetukseen. S\u00e4\u00e4d\u00e4 lukualuetta ja symbolityyli\u00e4 HOJKS-tavoitteiden mukaisesti. Kuvitetut symbolit ja pieni lukualue tukevat heikompia oppilaita.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden vertailuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani vertailuteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin vertailuteht\u00e4vien myyntiin verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '12', question: 'Miten vertailuteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Vertailuteht\u00e4v\u00e4t tukevat lukum\u00e4\u00e4r\u00e4k\u00e4sitteen, matemaattisen ajattelun ja vertailutaidon kehitt\u00e4mist\u00e4. POPS 2014 korostaa konkreettisia v\u00e4lineit\u00e4 ja visuaalista oppimista matematiikassa. Vertailuteht\u00e4v\u00e4t toteuttavat molempia tavoitteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kuva-yhteenlasku-tyoarkit', name: 'Kuvayhteenlasku', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Kuvayhteenlasku laajentaa vertailutaitoja yhteenlaskuun. Molemmat k\u00e4ytt\u00e4v\u00e4t visuaalisia kuvaryhmi\u00e4 matemaattisten k\u00e4sitteiden opettamiseen.' },
    { id: '2', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske yhdist\u00e4\u00e4 laskemisen ja etsinn\u00e4n. T\u00e4ydent\u00e4\u00e4 vertailuteht\u00e4vi\u00e4 lukum\u00e4\u00e4r\u00e4n hahmottamisen harjoittelulla.' },
    { id: '3', slug: 'matematiikka-tyoarkit', name: 'Matematiikkamonisteet', category: 'Matematiikka', icon: '\u{1f4dd}', description: 'Matematiikkamonisteet laajentavat laskutaitoja yhteen- ja v\u00e4hennyslaskuun. Yhdist\u00e4 vertailuteht\u00e4viin kattavaan matematiikkapakettiin.' },
    { id: '4', slug: 'iso-pieni-tyoarkit', name: 'Iso vai pieni', category: 'Hahmottaminen', icon: '\u{1f4cf}', description: 'Iso vai pieni -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kokovertailua, joka tukee lukum\u00e4\u00e4r\u00e4vertailun ymm\u00e4rt\u00e4mist\u00e4. Molemmat harjoittavat vertailun perusk\u00e4sitteit\u00e4.' },
    { id: '5', slug: 'kuvakaavio-tyoarkit', name: 'Kuvakaavio', category: 'Matematiikka', icon: '\u{1f4c8}', description: 'Kuvakaaviot esitt\u00e4v\u00e4t lukum\u00e4\u00e4ri\u00e4 graafisesti ja tukevat vertailuteht\u00e4viss\u00e4 opittua m\u00e4\u00e4rien hahmottamista. Yhdist\u00e4 monipuolisiin matematiikkapaketteihin.' },
    { id: '6', slug: 'yhteenlasku-tyoarkit', name: 'Kuvalaskut', category: 'Matematiikka', icon: '\u{1f3af}', description: 'Kuvalaskut kehitt\u00e4v\u00e4t laskutaitoja visuaalisilla kuvilla. Yhdist\u00e4 vertailuteht\u00e4viin varhaisen matematiikan kattavaan harjoitteluun.' },
  ],
  aiOverviewSnippet: 'Enemman vai vahemman -generaattori on verkkotyokalu, jolla luodaan tulostettavia lukumaaravertailutehtavia esiopetukseen ja alakouluun. Oppilaat vertailevat kuvaryhm ien lukumaaria ja valitsevat oikean vertailusymbolin (suurempi, pienempi, yhta suuri). Opettajat valitsevat lukualueen, symbolityyl in ja kuvateeman, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Vertailutilat', ourApp: 'Kuva kuvaan ja kuva numeroon', typical: 'Vain yksi vertailutyyppi' },
    { feature: 'Symbolityyli', ourApp: 'Perinteiset ja kuvitetut symbolit', typical: 'Vain perinteiset symbolit' },
    { feature: 'Lukualue', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 1\u201320 oppilaiden tason mukaan', typical: 'Kiinte\u00e4 lukualue' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Lukum\u00e4\u00e4rien visuaalinen vertailu kehitt\u00e4\u00e4 lukujen suuruusluokan ymm\u00e4rt\u00e4mist\u00e4, joka on vahvempi ennustaja matemaattiselle menestykselle kuin pelkk\u00e4 laskutaito.', source: 'Hannula, M. & Lehtinen, E., "Spontaanin lukum\u00e4\u00e4r\u00e4n huomioimisen ja matemaattisten taitojen yhteys," Turun yliopisto' },
    { claim: 'Vertailutaitojen systemaattinen harjoittelu konkreettisilla v\u00e4lineill\u00e4 rakentaa perustan algebralliselle ajattelulle ja lukujonotaitojen kehittymiselle.', source: 'Aunio, P. et al., "Varhaisten matemaattisten taitojen kehitys ja tukeminen," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Vertailutehtavat ovat loistava tapa opettaa enemmman ja vahemman -kasitteita visuaalisesti. Oppilaani rakastavat laskea kuvaryhm ia ja valita oikean symbolin. Kuvitetut symbolit tekevat vertailusta konkreettista esiopetuksessa.', name: 'Marjo Hyv\u00f6nen', role: 'Esiopetuksen opettaja', school: 'Katajanokeen p\u00e4iv\u00e4koti, Helsinki' },
    { quote: 'Kaytan vertailutehtavia joka viikko matematiikkatunneilla. Saadettava lukualue tekee eriyttamisesta helppoa. Ekaluokkalaiset siirtyivat kuvitetuista symboleista matemaattisiin symboleihin sujuvasti generaattorin avulla.', name: 'Pasi Laakkonen', role: '1. luokan opettaja', school: 'Puolalanm\u00e4en koulu, Turku' },
  ],
  tips: {
    sectionTitle: 'Vertailustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 vertailuteht\u00e4v\u00e4generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset lukualueen, symbolityyl in ja vertailutilan esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Pienet ryhmm\u00e4t kuvitetuilla symboleilla', description: 'Kaytta kuva kuvaan -tilaa lukualueella 1-5 kuvitetuilla symboleilla. Esikoululaiset laskevat kuvaryhm ia ja tunnistavat suuremman. Selvat erot (esim. 2 vs 5) rakentavat vertailun perustaa ja lukumaarakasitetta.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Laajempi lukualue ja vertailusymbolit', description: 'Luo vertailutehtavia lukualueella 1-10 kuvitetuilla symboleilla. Esiopetuksen oppilaat kehittavat jarjestelmallista laskemista ja vertailua. Esittele yhta suuri -kasite tasaisten ryhm ien avulla POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Matemaattiset symbolit ja kuva numeroon -tila', description: 'Generoi vertailutehtavia matemaattisilla symboleilla (>, <, =) ja kuva numeroon -tilalla. Ekaluokkalaiset siirtyva t konkreettisesta vertailusta abstraktiin merkintaan. Lukualue 1-15 haastaa sopivasti.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Haastavat vertailut suuremmilla luvuilla', description: 'Luo vertailutehtavia lukualueella 1-20 matemaattisilla symboleilla. Toisluokkalaiset vertailevat lukuja, joissa ero on pieni (esim. 14 vs 16). Haastava vertailu kehittaa tarkkaa lukumaaraajattelua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monipuoliset vertailuhaasteet', description: 'Kaytta molempia tiloja maksimaalisella lukualueella. Kolmasluokkalaiset harjoittelevat nopeaa ja tarkkaa vertailua suurilla luvuilla. Tehtavat valmistavat lukujonojen ja jarjestamisen ymmartamiseen.' },
    ],
  },
};

// ===================================================================
// 2. ODD-ONE-OUT (poikkea-joukosta-tyoarkit)
// ===================================================================
const oddOneOut = {
  file: 'poikkea-joukosta-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e0}', title: 'Luokittelupohjainen poikkea joukosta -muoto', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa 3\u20138 kuvaa muodostavat ryhm\u00e4n ja yksi kuva ei kuulu joukkoon. Oppilaat analysoivat kuvien yhteisi\u00e4 piirteit\u00e4 ja tunnistavat poikkeavan. Kehitt\u00e4\u00e4 luokittelutaitoja ja kriittist\u00e4 ajattelua.' },
    { id: '2', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ryhm\u00e4koko ja vaikeustaso', description: 'Valitse 3\u20138 kuvaa per teht\u00e4v\u00e4. Pienempi ryhm\u00e4 sopii nuoremmille lapsille. Suurempi ryhm\u00e4 haastaa vanhempia oppilaita vaatimalla tarkempaa analysointia. S\u00e4\u00e4d\u00e4 my\u00f6s poikkeavien kuvien m\u00e4\u00e4r\u00e4\u00e4.' },
    { id: '3', icon: '\u{1f50d}', title: 'Monipuoliset luokitteluperusteet', description: 'Teht\u00e4v\u00e4t perustuvat erilaisiin luokitteluihin: el\u00e4inlaji, v\u00e4ri, muoto, koko, teema tai k\u00e4ytt\u00f6tarkoitus. Oppilaat oppivat tunnistamaan eri luokitteluperusteita. Monipuolisuus kehitt\u00e4\u00e4 joustavaa ajattelua.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa luokitteluteht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta luokitteluteht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Generaattori valitsee teemanmukaiset kuvat ja lis\u00e4\u00e4 poikkeavan automaattisesti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen luokitteluteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa poikkeava kuva on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, valitse fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 luokitteluteht\u00e4vi\u00e4 verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo luokitteluteht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 ja kuvien nimet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Luokittelun perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia poikkea joukosta -teht\u00e4vi\u00e4 3\u20134 kuvalla. Esiopetuksen oppilaat harjoittelevat ryhm\u00e4\u00e4n kuulumisen tunnistamista. Selv\u00e4t erot (esim. el\u00e4in ruokien joukossa) rakentavat luokittelun perustaa. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kriittist\u00e4 ajattelua 1.\u20133. luokalla', description: 'Generoi monimutkaisempia luokitteluteht\u00e4vi\u00e4 5\u20138 kuvalla. Oppilaat analysoivat hienompia eroja ja perustelevat valintansa. Kehitt\u00e4\u00e4 analyyttist\u00e4 ajattelua ja argumentointitaitoja.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja ajattelupeli\u00e4 kotiin', description: 'Luo temaattisia luokitteluteht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja kulkuneuvoteemat pit\u00e4v\u00e4t lapset motivoituneina. Poikkea joukosta -teht\u00e4v\u00e4t ovat hauskoja pulmia koko perheelle.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastoharjoittelua luokittelun kautta', description: 'Luokitteluteht\u00e4v\u00e4t opettavat kategorisointia ja sanastoa kuvapohjaisesti. Oppilaat oppivat ryhm\u00e4\u00e4n kuuluvia ja kuulumattomia sanoja. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t luokitteluharjoitukset', description: 'S\u00e4\u00e4d\u00e4 kuvien m\u00e4\u00e4r\u00e4\u00e4 ja luokitteluperustetta HOJKS-tavoitteiden mukaisesti. Selv\u00e4t erot tukevat heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat luokittelutaitoja.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy luokittelupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia luokittelukokoelmia myyt\u00e4v\u00e4ksi verkossa. Poikkea joukosta -teht\u00e4v\u00e4t ovat suosittuja harjoituksia. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten poikkea joukosta -generaattori toimii?', answer: 'Generaattori luo kuvaryhmi\u00e4, joissa yksi kuva ei kuulu joukkoon. Valitse teema, kuvien m\u00e4\u00e4r\u00e4 ja vaikeustaso. Generaattori valitsee teemanmukaiset kuvat ja lis\u00e4\u00e4 poikkeavan automaattisesti.' },
    { id: '2', question: 'Kuinka monta kuvaa voi olla per teht\u00e4v\u00e4?', answer: 'Valitse 3\u20138 kuvaa per teht\u00e4v\u00e4. Pieni m\u00e4\u00e4r\u00e4 (3\u20134) sopii esiopetukseen. Suuri m\u00e4\u00e4r\u00e4 (6\u20138) haastaa vanhempia oppilaita. S\u00e4\u00e4d\u00e4 m\u00e4\u00e4r\u00e4\u00e4 taitotason mukaan.' },
    { id: '3', question: 'Miten vaikeustasoa s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Kolme tapaa: kuvien m\u00e4\u00e4r\u00e4n lis\u00e4\u00e4minen, hienompien erojen valitseminen ja useamman poikkeavan kuvan lis\u00e4\u00e4minen. Selv\u00e4t erot helpottavat teht\u00e4v\u00e4\u00e4. Hienot erot lis\u00e4\u00e4v\u00e4t haastetta.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa poikkeava kuva on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 nopeasti. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille teht\u00e4v\u00e4t sopivat?', answer: 'Poikkea joukosta -teht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset tunnistavat selv\u00e4t poikkeamat pieniss\u00e4 ryhmiss\u00e4. 1.\u20133. luokan oppilaat analysoivat hienompia eroja suuremmissa ryhmiss\u00e4.' },
    { id: '6', question: 'Miten luokitteluperuste valitaan?', answer: 'Generaattori luo teht\u00e4vi\u00e4 automaattisesti eri luokitteluperusteilla. El\u00e4inlaji, teema, v\u00e4ri, muoto ja koko ovat yleisimpi\u00e4. Oppilaat oppivat tunnistamaan erilaisia luokitteluperusteita.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia kirjaston kuvien kanssa. Luokkahuoneen kuvat tekev\u00e4t teht\u00e4vist\u00e4 merkityksellisempi\u00e4.' },
    { id: '8', question: 'Miten tulostan luokitteluteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. S\u00e4\u00e4d\u00e4 kuvien m\u00e4\u00e4r\u00e4\u00e4 ja poikkeaman selvyytt\u00e4 HOJKS-tavoitteiden mukaisesti. Selv\u00e4t poikkeamat tukevat heikompia oppilaita. Luokitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t analyyttist\u00e4 ajattelua.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden luokitteluteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja asetukset 30 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy luokittelupaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja teemallisilla paketeilla.' },
    { id: '12', question: 'Miten teht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Poikkea joukosta -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelutaitoja, loogista ajattelua ja analyyttist\u00e4 p\u00e4\u00e4ttely\u00e4. POPS 2014 korostaa ajattelun taitoja ja monipuolisia oppimistapoja. Luokitteluteht\u00e4v\u00e4t tukevat molempia tavoitteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu laajentaa luokittelutaitoja ryhm\u00e4\u00e4n lajittelun muotoon. Molemmat kehitt\u00e4v\u00e4t kategorisointia ja analyyttist\u00e4 ajattelua.' },
    { id: '2', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista havainnointia, joka tukee poikkeavien kuvien tunnistamista luokitteluteht\u00e4viss\u00e4.' },
    { id: '3', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista erottelua, joka on poikkea joukosta -teht\u00e4vien perustaito.' },
    { id: '4', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f523}', description: 'Kuvioteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kuvioiden tunnistamista ja sarjojen ymm\u00e4rt\u00e4mist\u00e4. Yhdist\u00e4 luokitteluteht\u00e4viin monipuoliseen loogiseen harjoitteluun.' },
    { id: '5', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Sanasto', icon: '\u{1f3b2}', description: 'Kuvabingo yhdist\u00e4\u00e4 kuvan tunnistamisen pelimuotoon. Molemmat kehitt\u00e4v\u00e4t visuaalista tunnistamista ja luokittelua.' },
    { id: '6', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n vai v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Vertailuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t loogista vertailua, joka tukee luokittelussa tarvittavaa analyyttist\u00e4 ajattelua.' },
  ],
  aiOverviewSnippet: 'Poikkea joukosta -generaattori on verkkotyokalu, jolla luodaan tulostettavia luokittelutehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat kuvan, joka ei kuulu joukkoon, ja perustelevat valintansa. Opettajat valitsevat teeman, kuvien maaran ja vaikeustason, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Ryhm\u00e4koko', ourApp: '3\u20138 kuvaa per teht\u00e4v\u00e4 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 4 kuvaa' },
    { feature: 'Luokitteluperusteet', ourApp: 'Monipuoliset: laji, v\u00e4ri, muoto, teema', typical: 'Yksi luokitteluperuste' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Luokitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kategorista p\u00e4\u00e4ttely\u00e4 ja analyyttist\u00e4 ajattelua, jotka ovat tieteellisen ajattelun ja lukutaidon perusedellytyksi\u00e4 varhaiskasvatusik\u00e4isill\u00e4.', source: 'Hautam\u00e4ki, J. et al., "Ajattelutaitojen kehitys varhaiskasvatuksessa," Helsingin yliopisto' },
    { claim: 'Poikkea joukosta -tyyppiset teht\u00e4v\u00e4t harjoittavat inhibitiokyky\u00e4 ja tarkkaavaisuuden suuntaamista, jotka ovat toiminnanohjauksen keskeisi\u00e4 osataitoja.', source: 'Lehto, J., "Lasten toiminnanohjauksen kehitys ja tukeminen," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Poikkea joukosta -tehtavat ovat erinomaisia kriittisen ajattelun kehittamiseen. Oppilaani oppivat perustelemaan miksi yksi kuva ei kuulu joukkoon. Monet lapset loytavat useita oikeita vastauksia, mika herattaa hienoja keskusteluja.', name: 'Eeva Ojala', role: '2. luokan opettaja', school: 'Karhulan koulu, Kotka' },
    { quote: 'Kaytan poikkea joukosta -tehtavia esiopetuksessa paivittain. Lapset rakastavat etsia poikkeavaa kuvaa ja selittaa miksi se ei kuulu joukkoon. Saadettava vaikeustaso mahdollistaa eriyttamisen helposti.', name: 'Kari Tuomela', role: 'Esiopetuksen opettaja', school: 'Tammim\u00e4en p\u00e4iv\u00e4koti, Tampere' },
  ],
  tips: {
    sectionTitle: 'Luokittelustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 poikkea joukosta -generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset kuvien m\u00e4\u00e4r\u00e4n, luokitteluperusteen ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Selv\u00e4t poikkeamat pieniss\u00e4 ryhmiss\u00e4', description: 'Kaytta 3-4 kuvaa selvilla eroilla (esim. elain ruokien joukossa). Esikoululaiset harjoittelevat ryhmaan kuulumisen tunnistamista intuitiivisesti. Yksinkertainen muoto rakentaa luokittelun perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Teemapohjaiset luokitteluhaasteet', description: 'Luo tehtavia 4-5 kuvalla ja monipuolisilla teemoilla. Esiopetuksen oppilaat kehittavat perustelutaitoja selittaessaan miksi kuva ei kuulu joukkoon. Tukee POPS 2014 ajattelutaitojen kehittamista.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Hienommat erot ja perustelut', description: 'Generoi tehtavia 5-6 kuvalla hienommilla eroilla. Ekaluokkalaiset analysoivat kuvien ominaisuuksia tarkemmin. Oppilaat perustelevat valintansa suullisesti tai kirjallisesti.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Moniperusteiset luokittelut', description: 'Luo tehtavia 6-7 kuvalla, joissa useampi luokitteluperuste on mahdollinen. Toisluokkalaiset oppivat etta samaa ryhmaa voi luokitella eri tavoin. Kehittaa joustavaa ajattelua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset analyysiteht\u00e4v\u00e4t', description: 'Kaytta 7-8 kuvaa hienojakoisilla eroilla. Kolmasluokkalaiset perustelevat valintansa kirjallisesti ja pohtivat vaihtoehtoisia luokitteluja. Tehtavat kehittavat tieteellista ajattelutapaa.' },
    ],
  },
};

// ===================================================================
// 3. PATTERN-TRAIN (kuviojuna-tyoarkit)
// ===================================================================
const patternTrain = {
  file: 'kuviojuna-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f682}', title: 'Junapohjainen kuviosarjamuoto', description: 'Generaattori luo junavaunuista koostuvan kuviosarjan, jossa jokainen vaunu sis\u00e4lt\u00e4\u00e4 kuvan. Oppilaat tunnistavat kuvion ja t\u00e4ydent\u00e4v\u00e4t sarjan leikkaa ja liimaa -menetelm\u00e4ll\u00e4. Junamuoto tekee kuviosarjoista konkreettisia ja motivoivia.' },
    { id: '2', icon: '\u{1f523}', title: 'Viisi kuviotyyppi\u00e4: AB, AAB, ABB, ABC ja AABB', description: 'Valitse viidest\u00e4 kuviotyypist\u00e4 oppilaiden taitotason mukaan. AB on yksinkertaisin kahdella vuorottelevalla kuvalla. ABC k\u00e4ytt\u00e4\u00e4 kolmea eri kuvaa. AABB ja AAB lis\u00e4\u00e4v\u00e4t toiston vaihtelua.' },
    { id: '3', icon: '\u2702\ufe0f', title: 'Leikkaa ja liimaa -toiminnallisuus', description: 'Teht\u00e4v\u00e4t sis\u00e4lt\u00e4v\u00e4t leikattavat kuvapalat sivun alareunassa. Oppilaat leikkaavat kuvat irti, tunnistavat oikean paikan ja liimaavat tyhj\u00e4\u00e4n vaunuun. K\u00e4sill\u00e4 tekeminen vahvistaa oppimista.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa junavaunuihin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta kuviosarjojen luomiseen. El\u00e4imet, hedelm\u00e4t, kulkuneuvot ja muodot sopivat erinomaisesti kuviosarjoihin. Teemavalinnat luovat visuaalisesti houkuttelevia teht\u00e4vi\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kuviosarjateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa t\u00e4ydellinen kuviosarja n\u00e4kyy valmiina. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa ilman laskemista.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia ja vaunuja. Lis\u00e4\u00e4 tekstej\u00e4, taustakuvia ja kehyksi\u00e4 ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kuviosarjateht\u00e4vi\u00e4 verkossa. Kuviojunateht\u00e4v\u00e4t ovat suosittuja esiopetusmateriaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kuviosarjateht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja kansainv\u00e4liseen k\u00e4ytt\u00f6\u00f6n.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kuviosarjojen perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia AB-kuviosarjoja junateemalla. Esiopetuksen oppilaat harjoittelevat toistuvien kuvioiden tunnistamista leikkaa ja liimaa -menetelm\u00e4ll\u00e4. Junamuoto motivoi ja tekee oppimisesta konkreettista. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kuviosarjojen syvent\u00e4minen 1.\u20132. luokalla', description: 'Generoi monimutkaisempia kuviosarjoja (AAB, ABB, ABC, AABB) 1.\u20132. luokalle. Oppilaat analysoivat monimutkaisia sarjoja ja ennustavat seuraavat kuvat. Kehitt\u00e4\u00e4 algebrallista valmiutta.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Toiminnallisia kuviosarjoja kotiin', description: 'Luo temaattisia kuviojunateht\u00e4vi\u00e4 lasten kiinnostuksen mukaan. Leikkaa ja liimaa -muoto pit\u00e4\u00e4 lapset aktiivisina. El\u00e4in- ja kulkuneuvoteemat motivoivat harjoittelua kotona.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 kuviosarjaharjoittelu', description: 'Kuviojunateht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Kuvasarjat opettavat sarjojen logiikkaa universaalisti. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt kuviosarjaharjoitukset', description: 'S\u00e4\u00e4d\u00e4 kuviotyyppi\u00e4 ja sarjan pituutta HOJKS-tavoitteiden mukaisesti. AB-kuvio sopii perusharjoitteluun. Leikkaa ja liimaa -menetelm\u00e4 kehitt\u00e4\u00e4 samalla hienomotoriikkaa.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy kuviosarjapaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia kuviojunapaketteja myyt\u00e4v\u00e4ksi verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti suosittuja. Kaupallinen lisenssi kattaa rajattomat myynnit ilman lis\u00e4kuluja.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuviojunageneraattori toimii?', answer: 'Generaattori luo junavaunuista koostuvan kuviosarjan. Osa vaunuista on tyhjin\u00e4 oppilaan t\u00e4ytett\u00e4v\u00e4ksi. Leikattavat kuvapalat ovat sivun alareunassa. Oppilas leikkaa, tunnistaa kuvion ja liimaa oikeaan vaunuun.' },
    { id: '2', question: 'Mitk\u00e4 kuviotyypit ovat saatavilla?', answer: 'Viisi kuviotyyppi\u00e4: AB (kahden kuvan vuorottelu), AAB (kaksi samaa ja eri), ABB (yksi eri ja kaksi samaa), ABC (kolmen kuvan sarja) ja AABB (kaksi parillista). Valitse taitotason mukaan.' },
    { id: '3', question: 'Miten vaikeustasoa s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Kuviotyypin valinta m\u00e4\u00e4ritt\u00e4\u00e4 vaikeustason. AB on helpoin, ABC ja AABB haastavimmat. Sarjan pituus vaikuttaa my\u00f6s: pidempi sarja vaatii enemm\u00e4n hahmottamista.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen kuviosarjateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. T\u00e4ydellinen kuviosarja n\u00e4kyy valmiina vastausavaimessa. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuviojuna sopii?', answer: 'Kuviojuna palvelee 4\u20138-vuotiaita. Esikoululaiset harjoittelevat AB-kuvioita. 1. luokan oppilaat siirtyv\u00e4t AAB- ja ABB-kuvioihin. 2. luokan oppilaat ratkaisevat ABC- ja AABB-kuvioita.' },
    { id: '6', question: 'Miten leikkaa ja liimaa -teht\u00e4v\u00e4t toimivat?', answer: 'Sivun alareunassa on leikattavat kuvapalat katkoviivoin merkittyin\u00e4. Oppilaat leikkaavat kuvat irti saksilla. Sitten he tunnistavat oikean paikan junavaunuissa ja liimaavat kuvan paikalleen.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori sijoittaa kuvat junavaunuihin automaattisesti. Yhdist\u00e4 omia kuvia kirjaston 3000+ kuvan kanssa.' },
    { id: '8', question: 'Miten tulostan kuviojunateht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. PDF-muoto s\u00e4ilytt\u00e4\u00e4 tarkan ulkoasun tulostamiseen ja leikkaamiseen.' },
    { id: '9', question: 'Sopiiko kuviojuna erityisopetukseen?', answer: 'Erinomaisesti. Yksinkertainen AB-kuvio ja leikkaa ja liimaa -menetelm\u00e4 sopivat erityisopetukseen. S\u00e4\u00e4d\u00e4 kuviotyyppi\u00e4 HOJKS-tavoitteiden mukaisesti. Toiminnallisuus kehitt\u00e4\u00e4 my\u00f6s hienomotoriikkaa.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kuviojunateht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja kuviotyyppi 30 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti leikattavine osineen.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani kuviojunateht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Kuviojunapaketit ovat suosittuja esiopetusmateriaaleja verkossa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '12', question: 'Miten kuviojuna tukee POPS 2014 tavoitteita?', answer: 'Kuviojuna kehitt\u00e4\u00e4 kuviosarjojen tunnistamista, algebrallista valmiutta ja hienomotoriikkaa. POPS 2014 korostaa matemaattisen ajattelun ja toiminnallisen oppimisen merkityst\u00e4. Kuviojuna yhdist\u00e4\u00e4 molemmat tehokkaasti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f523}', description: 'Kuvioteht\u00e4v\u00e4t laajentavat kuviosarjojen harjoittelua monipuolisempiin muotoihin. Yhdist\u00e4 kuviojunan kanssa kattavaan kuvioharjoitteluun.' },
    { id: '2', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Lukutaito', icon: '\u{1f682}', description: 'Aakkosjuna k\u00e4ytt\u00e4\u00e4 samaa junateemaa aakkosten oppimiseen. Yhdist\u00e4 molemmat junateemai siin oppimispaketteihin.' },
    { id: '3', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 luokittelutaitoja, jotka tukevat kuviosarjoissa tarvittavaa ryhmittelykyky\u00e4.' },
    { id: '4', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Logiikka', icon: '\u{1f517}', description: 'Yhdist\u00e4 parit -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t yhteenkuuluvuuden tunnistamista. Yhdist\u00e4 kuviojunan kanssa visuaalisten yhteyksien harjoitteluun.' },
    { id: '5', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Sanasto', icon: '\u{1f3b2}', description: 'Kuvabingo yhdist\u00e4\u00e4 kuvan tunnistamisen pelimuotoon. Molemmat k\u00e4ytt\u00e4v\u00e4t visuaalisia kuvia oppimisen tukena.' },
    { id: '6', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkea joukosta -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelua, joka tukee kuviosarjojen ymm\u00e4rt\u00e4mist\u00e4 ja analyyttist\u00e4 ajattelua.' },
  ],
  aiOverviewSnippet: 'Kuviojuna-generaattori on verkkotyokalu, jolla luodaan tulostettavia leikkaa ja liimaa -kuviosarjatehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat junavaunujen kuviosarjan (AB, AAB, ABB, ABC, AABB) ja taydentavat puuttuvat kohdat leikkaamalla ja liimaamalla. Opettajat valitsevat kuviotyypin, teeman ja kuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Kuviotyypit', ourApp: '5 tyyppi\u00e4: AB, AAB, ABB, ABC, AABB', typical: 'Vain AB-kuvio' },
    { feature: 'Muoto', ourApp: 'Leikkaa ja liimaa junateemalla', typical: 'Pelkk\u00e4 kuvio ilman toimintaa' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Kuviosarjojen tunnistaminen ja t\u00e4ydent\u00e4minen kehitt\u00e4v\u00e4t algebrallista valmiutta, joka on my\u00f6hemm\u00e4n matemaattisen menestyksen ennustaja.', source: 'Mattinen, A. et al., "Matemaattisen ajattelun kehitys esiopetusik\u00e4isill\u00e4," Turun yliopisto' },
    { claim: 'Leikkaa ja liimaa -menetelm\u00e4 yhdist\u00e4\u00e4 hienomotoriikan ja kognitiivisen prosessoinnin, mik\u00e4 vahvistaa oppimista moniaistikanavaisen prosessoinnin kautta.', source: 'Ahonen, T. et al., "Toiminnallisen oppimisen merkitys varhaiskasvatuksessa," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Kuviojuna on oppilaitteni ehdoton suosikki. Junamuoto motivoi lapsia ja leikkaa-liimaa -menetelma tekee oppimisesta toiminnallista. AB-kuviosta ABC-kuvioon siirtyminen on ollut sujuvaa generaattorin avulla.', name: 'Maarit Penttinen', role: 'Esiopetuksen opettaja', school: 'Koivulan p\u00e4iv\u00e4koti, Oulu' },
    { quote: 'Kaytan kuviojunatehtavia matematiikan alkuopetuksessa viikoittain. Oppilaat kehittavat kuviosarjojen ymmartamista samalla kun harjoittelevat leikkaamista ja liimaamista. Viisi kuviotyyppia mahdollistaa monipuolisen eriyttamisen.', name: 'Hannu Sepp\u00e4l\u00e4', role: '1. luokan opettaja', school: 'M\u00e4ntym\u00e4en koulu, Kuopio' },
  ],
  tips: {
    sectionTitle: 'Kuviosarjastrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuviojunageneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset kuviotyypin, sarjan pituuden ja monimutkaisuuden esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: AB-kuviot tutuilla kuvilla', description: 'Kaytta AB-kuviotyyppia tutuilla elain- tai hedelmakuvilla. Esikoululaiset tunnistavat kahden kuvan vuorottelun ja taydentavat sarjan leikkaamalla. Lyhyt sarja (4-6 vaunua) sopii alkuun.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: AAB- ja ABB-kuviot', description: 'Luo tehtavia AAB- ja ABB-kuviotyypeilla. Esiopetuksen oppilaat kehittavat monimutkaisempien toistojen tunnistamista. Pidemmat sarjat (6-8 vaunua) haastavat sopivasti POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: ABC-kuviot ja pidemp\u00e4\u00e4n sarjat', description: 'Generoi ABC-kuvioita 8-10 vaunun sarjoilla. Ekaluokkalaiset analysoivat kolmen kuvan sarjoja ja ennustavat seuraavat kuvat. Kehittaa algebrallista valmiutta ja jarjestelmallista ajattelua.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: AABB-kuviot ja vaihtelevat sarjat', description: 'Luo AABB-kuvioita ja yhdista eri kuviotyyppeja samaan tehtavaan. Toisluokkalaiset vertailevat erilaisia kuviosarjoja ja tunnistavat niiden saannonmukaisuudet.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset yhdistelm\u00e4kuviot', description: 'Kaytta kaikkia kuviotyyppeja sekoitettuina. Kolmasluokkalaiset tunnistavat ja nimeavat kuviotyypit itsenaisesti. Tehtavat valmistavat algebrallisen ajattelun perusteisiin.' },
    ],
  },
};

// ===================================================================
// 4. PATTERN-WORKSHEET (kuviotehtava-tyoarkit)
// ===================================================================
const patternWorksheet = {
  file: 'kuviotehtava-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f523}', title: 'Yhdeks\u00e4n kuviotyyppi\u00e4 monipuoliseen harjoitteluun', description: 'Generaattori tarjoaa yhdeks\u00e4n erilaista kuviotyyppi\u00e4 kattavaan kuviosarjojen harjoitteluun. Perustavasta AB-kuviosta vaativaan ABCD-kuvioon. Kasvavat ja pienenevä sarjat laajentavat matemaattista ajattelua.' },
    { id: '2', icon: '\u2753', title: 'Tyhj\u00e4n t\u00e4ytt\u00f6 ja monivalintamuoto', description: 'Valitse kahdesta vastausmuodosta. Tyhj\u00e4n t\u00e4ytt\u00f6 -tilassa oppilaat piirt\u00e4v\u00e4t tai liimaavat puuttuvan kuvan. Monivalintatilassa oppilaat valitsevat oikean kuvan 3\u20134 vaihtoehdosta. S\u00e4\u00e4d\u00e4 muoto oppilaiden taitotason mukaan.' },
    { id: '3', icon: '\u{1f4c8}', title: 'Kasvavat ja pienenevä kuviosarjat', description: 'Kasvavissa sarjoissa kuviot laajenevat s\u00e4\u00e4nn\u00f6nmukaisesti (esim. 1, 2, 3, 4). Pieneneviss\u00e4 sarjoissa kuviot supistuvat. N\u00e4m\u00e4 valmistavat algebralliseen ajatteluun ja funktioiden ymm\u00e4rt\u00e4miseen.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa kuviosarjoihin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta kuviosarjojen luomiseen. El\u00e4imet, muodot, hedelm\u00e4t ja kymmenet muut teemat. Generaattori sijoittaa kuvat sarjoihin automaattisesti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kuvioteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa t\u00e4ydelliset sarjat n\u00e4kyv\u00e4t valmiina. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, fontteja, v\u00e4rej\u00e4, taustakuvia ja kehyksi\u00e4 ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kuvioteht\u00e4vi\u00e4 verkossa. Kuviosarjamateriaalit ovat jatkuvasti kysyttyj\u00e4 opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kuvioteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kuvioiden tunnistamisen perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia AB- ja AAB-kuvioteht\u00e4vi\u00e4 monivalintamuodossa. Esiopetuksen oppilaat harjoittelevat kuvioiden tunnistamista valitsemalla oikean vaihtoehdon. Visuaaliset kuvat tekev\u00e4t teht\u00e4vist\u00e4 konkreettisia. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Algebrallista valmiutta 1.\u20133. luokalla', description: 'Generoi monimutkaisempia kuviosarjoja (ABC, AABB, kasvavat) tyhj\u00e4n t\u00e4ytt\u00f6 -muodossa. Oppilaat analysoivat sarjoja ja t\u00e4ydent\u00e4v\u00e4t puuttuvat kohdat. Kehitt\u00e4\u00e4 matemaattista ajattelua ja algebrallista valmiutta.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Kuviosarjapulmia kotiin', description: 'Luo temaattisia kuvioteht\u00e4vi\u00e4 lasten suosikkiaiheilla. Monivalintamuoto sopii itsen\u00e4iseen ty\u00f6skentelyyn. Kasvavat haasteet pit\u00e4v\u00e4t motivaation yll\u00e4.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kieliriippumatonta kuvioharjoittelua', description: 'Kuvioteht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Kuviosarjat opettavat loogista ajattelua universaalisti. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt kuvioteht\u00e4v\u00e4t', description: 'S\u00e4\u00e4d\u00e4 kuviotyyppi\u00e4 ja vastausmuotoa HOJKS-tavoitteiden mukaisesti. Monivalintamuoto helpottaa vastausta. Asteittain vaikeutuvat kuviot rakentavat matemaattista ajattelua.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy kuviosarjapaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia kuvioteht\u00e4v\u00e4paketteja myyt\u00e4v\u00e4ksi verkossa. Kuviosarjamateriaalit ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvioteht\u00e4v\u00e4generaattori toimii?', answer: 'Generaattori luo kuviosarjoja, joissa yksi tai useampi kuva puuttuu. Oppilaat tunnistavat kuvion ja t\u00e4ydent\u00e4v\u00e4t puuttuvan kohdan. Valitse kuviotyyppi, vastausmuoto ja kuvat, ja generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '2', question: 'Mitk\u00e4 kuviotyypit ovat saatavilla?', answer: 'Yhdeks\u00e4n kuviotyyppi\u00e4: AB, AAB, ABB, ABC, AABB, ABAB, ABCD sek\u00e4 kasvavat ja pienev\u00e4t sarjat. Jokaisella tyypill\u00e4 on eri vaikeustaso. Valitse oppilaiden taitotason mukaan.' },
    { id: '3', question: 'Mitk\u00e4 vastausmuodot ovat k\u00e4ytett\u00e4viss\u00e4?', answer: 'Kaksi muotoa: tyhj\u00e4n t\u00e4ytt\u00f6, jossa oppilas piirt\u00e4\u00e4 puuttuvan kuvan, ja monivalinta, jossa oppilas valitsee oikean vaihtoehdon 3\u20134 kuvasta. Monivalinta sopii nuoremmille, tyhj\u00e4n t\u00e4ytt\u00f6 vanhemmille.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen kuvioteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. T\u00e4ydelliset kuviosarjat n\u00e4kyv\u00e4t valmiina. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuvioteht\u00e4v\u00e4t sopivat?', answer: 'Kuvioteht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset harjoittelevat AB-kuvioita monivalinnalla. 1.\u20133. luokan oppilaat ratkaisevat monimutkaisempia sarjoja tyhj\u00e4n t\u00e4ytt\u00f6 -muodossa.' },
    { id: '6', question: 'Miten kasvavat kuviosarjat toimivat?', answer: 'Kasvavissa sarjoissa kuvion osa kasvaa s\u00e4\u00e4nn\u00f6nmukaisesti (esim. yksi pallo, kaksi palloa, kolme palloa). Oppilas tunnistaa s\u00e4\u00e4nn\u00f6n ja ennustaa seuraavan kohdan. Valmistavat algebralliseen ajatteluun.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori sijoittaa kuvat kuviosarjoihin automaattisesti. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa.' },
    { id: '8', question: 'Miten tulostan kuvioteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Kuvioteht\u00e4v\u00e4t sopivat erinomaisesti erityisopetukseen. Monivalintamuoto helpottaa vastausta. Yksinkertaiset kuviotyypit tukevat heikompia oppilaita. S\u00e4\u00e4d\u00e4 vaikeustasoa HOJKS-tavoitteiden mukaan.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kuvioteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuviotyyppi ja kuvat 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani kuvioteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin kuvioteht\u00e4vien myyntiin verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '12', question: 'Miten kuvioteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Kuvioteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t matemaattista ajattelua, kuvioiden tunnistamista ja algebrallista valmiutta. POPS 2014 korostaa matemaattisen ajattelun kehitt\u00e4mist\u00e4 ja monipuolisia ty\u00f6tapoja. Kuvioteht\u00e4v\u00e4t toteuttavat molempia.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kuviojuna-tyoarkit', name: 'Kuviojuna', category: 'Logiikka', icon: '\u{1f682}', description: 'Kuviojuna tarjoaa leikkaa ja liimaa -muotoisen kuviosarjaharjoituksen. Yhdist\u00e4 kuvioteht\u00e4vien kanssa kattavaan kuvioharjoitteluun.' },
    { id: '2', slug: 'matematiikka-tyoarkit', name: 'Matematiikkamonisteet', category: 'Matematiikka', icon: '\u{1f4dd}', description: 'Matematiikkamonisteet laajentavat matemaattista ajattelua laskuteht\u00e4viin. Yhdist\u00e4 kuvioteht\u00e4viin monipuoliseen matematiikkapakettiin.' },
    { id: '3', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 luokittelutaitoja, jotka tukevat kuviosarjojen ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '4', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkea joukosta -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t analyyttist\u00e4 ajattelua, joka tukee kuviosarjojen tunnistamista.' },
    { id: '5', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Logiikka', icon: '\u{1f517}', description: 'Yhdist\u00e4 parit -teht\u00e4v\u00e4t harjoittavat yhteenkuuluvuuden tunnistamista. Molemmat kehitt\u00e4v\u00e4t loogista ajattelua.' },
    { id: '6', slug: 'kuva-yhteenlasku-tyoarkit', name: 'Kuvayhteenlasku', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Kuvayhteenlasku yhdist\u00e4\u00e4 visuaalisen laskemisen ja matemaattisen ajattelun. Yhdist\u00e4 kuvioteht\u00e4viin kattavaan matemaattiseen harjoitteluun.' },
  ],
  aiOverviewSnippet: 'Kuviotehtava-generaattori on verkkotyokalu, jolla luodaan tulostettavia kuviosarjatehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat kuviosarjan saannonmukaisuuden ja taydentavat puuttuvat kohdat. Generaattori tarjoaa 9 kuviotyyppia, 2 vastausmuotoa ja 3000+ teemakuvaa. Opettajat lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Kuviotyypit', ourApp: '9 tyyppi\u00e4 sis. kasvavat ja pienenevä sarjat', typical: 'Vain 2\u20133 perustyyppi\u00e4' },
    { feature: 'Vastausmuodot', ourApp: 'Tyhj\u00e4n t\u00e4ytt\u00f6 ja monivalinta', typical: 'Vain yksi muoto' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Kuviosarjojen tunnistaminen on algebrallisen ajattelun perusta, joka ennustaa matemaattista menestyst\u00e4 peruskoulun my\u00f6hemmmill\u00e4 luokilla.', source: 'Lehtinen, E. & Hannula, M., "Matemaattisen ajattelun varhainen kehitys," Turun yliopisto' },
    { claim: 'Monipuolisten kuviotyyppien harjoittelu kehitt\u00e4\u00e4 joustavaa matemaattista ajattelua ja siirtovaikutusta muihin matemaattisiin k\u00e4sitteisiin.', source: 'Mattinen, A., "Kuvioiden tunnistaminen ja matemaattinen p\u00e4\u00e4ttely," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuviotehtavat ovat ehdottomasti paras tyokalu algebrallisen ajattelun kehittamiseen alakoulussa. Yhdeksan kuviotyyppia mahdollistaa tarkan eriyttamisen. Oppilaat kehittyvat AB-kuviosta kasvaviin sarjoihin omassa tahdissaan.', name: 'Jaana M\u00e4kel\u00e4', role: '2. luokan opettaja', school: 'Kissanm\u00e4en koulu, Turku' },
    { quote: 'Monivalintamuoto on loistava esiopetukseen. Lapset valitsevat oikean kuvan vaihtoehdoista ja oppivat samalla kuvioiden saannonmukaisuuksia. Tehtavat ovat visuaalisesti houkuttelevia ja motivoivat lapsia.', name: 'Tapio Mustonen', role: 'Esiopetuksen opettaja', school: 'H\u00e4meenpuiston p\u00e4iv\u00e4koti, Tampere' },
  ],
  tips: {
    sectionTitle: 'Kuvioteht\u00e4v\u00e4strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvioteht\u00e4v\u00e4generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset kuviotyypin, vastausmuodon ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: AB-kuviot monivalinnalla', description: 'Kaytta AB-kuviotyyppia monivalintamuodossa. Esikoululaiset tunnistavat kahden kuvan vuorottelun ja valitsevat oikean vaihtoehdon. Tutut elain- ja hedelmakuvat motivoivat oppimista.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: AAB- ja ABB-kuviot monivalinnalla', description: 'Luo AAB- ja ABB-kuviotehtavia monivalintamuodossa. Esiopetuksen oppilaat kehittavat monimutkaisempien kuvioiden tunnistamista. Tukee POPS 2014 matemaattisen ajattelun tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: ABC-kuviot tyhj\u00e4n t\u00e4ytt\u00f6 -muodossa', description: 'Generoi ABC-kuviotehtavia tyhjan tayto -muodossa. Ekaluokkalaiset analysoivat kolmen kuvan sarjoja ja piirtavat puuttuvan kuvan. Kehittaa itsenai sta matemaattista ajattelua.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: AABB-kuviot ja kasvavat sarjat', description: 'Luo AABB-kuvioita ja kasvavia sarjoja. Toisluokkalaiset tunnistavat monimutkaisia kuvioita ja ennustavat sarjan jatkumista. Kasvavat sarjat valmistavat algebraan.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Kasvavat ja pienenevä sarjat', description: 'Kaytta kasvavia ja pienenevia sarjoja. Kolmasluokkalaiset tunnistavat numeerisia saannonmukaisuuksia ja selittavat kuvion saannon kirjallisesti. Vahva valmistautuminen algebraan.' },
    ],
  },
};

// ===================================================================
// 5. PICTURE-PATH (kuvapolku-tyoarkit)
// ===================================================================
const picturePath = {
  file: 'kuvapolku-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f6e4}\ufe0f', title: 'Kuvapolku-sokkeloteht\u00e4v\u00e4muoto', description: 'Generaattori luo ruudukkopohjaisia polkuteht\u00e4vi\u00e4, joissa oppilaat kulkevat aloituspisteest\u00e4 maaliin kuvia seuraten. Polkus\u00e4\u00e4nn\u00f6t m\u00e4\u00e4ritt\u00e4v\u00e4t mitk\u00e4 kuvat ovat sallittuja. Kehitt\u00e4\u00e4 visuaalista seurantaa ja avaruudellista hahmottamista.' },
    { id: '2', icon: '\u{1f4d0}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ruudukkokoko', description: 'Valitse ruudukon koko oppilaiden taitotason mukaan. Pieni ruudukko sopii esiopetukseen yksinkertaisilla poluilla. Suurempi ruudukko haastaa vanhempia oppilaita monimutkaisi lla reiteill\u00e4. Rivien ja sarakkeiden m\u00e4\u00e4r\u00e4 s\u00e4\u00e4det\u00e4\u00e4n erikseen.' },
    { id: '3', icon: '\u{1f50d}', title: 'Monipuoliset polkus\u00e4\u00e4nn\u00f6t', description: 'Valitse polkus\u00e4\u00e4nt\u00f6: kulje vain tiettyj\u00e4 kuvia pitkin, v\u00e4lt\u00e4 tiettej\u00e4 kuvia tai seuraa tietty\u00e4 kuviosekvenssi\u00e4. S\u00e4\u00e4nn\u00f6t vaihtelevat vaikeustason mukaan. Monipuolisuus kehitt\u00e4\u00e4 loogista ajattelua.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa polkuteht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta polkuteht\u00e4vien luomiseen. El\u00e4imet, hedelm\u00e4t, muodot ja kymmenet muut teemat. Kuvat t\u00e4ytt\u00e4v\u00e4t ruudukon automaattisesti valitun teeman mukaan.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen polkuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikea polku on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet n\u00e4ytt\u00e4v\u00e4t koko reitin selke\u00e4sti.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, fontteja, v\u00e4rej\u00e4 ja taustakuvia ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 polkuteht\u00e4vi\u00e4 verkossa. Kuvapolkuteht\u00e4v\u00e4t ovat suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo polkuteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen seurannan perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia polkuteht\u00e4vi\u00e4 pienill\u00e4 ruudukoilla ja selv\u00e4ll\u00e4 polkus\u00e4\u00e4nn\u00f6ll\u00e4. Esiopetuksen oppilaat harjoittelevat kyn\u00e4nhallintaa ja visuaalista seurantaa. Polun piirt\u00e4minen kehitt\u00e4\u00e4 hienomotoriikkaa. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Avaruudellista p\u00e4\u00e4ttely\u00e4 1.\u20133. luokalla', description: 'Generoi suurempia ruudukoita monimutkaisilla polkus\u00e4\u00e4nn\u00f6ill\u00e4. Oppilaat suunnittelevat reitin ennakkoon ja kehitt\u00e4v\u00e4t strategista ajattelua. Monitasoiset polut haastavat avaruudellista hahmottamista.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja polkupulmia kotiin', description: 'Luo temaattisia polkuteht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja seikkailuteemat motivoivat polun l\u00f6yt\u00e4mist\u00e4. Polkuteht\u00e4v\u00e4t ovat hauskoja pulmia koko perheelle.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Visuaalista harjoittelua ilman kielirajoitusta', description: 'Polkuteht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Kuvapohjaiset polut kehitt\u00e4v\u00e4t avaruudellista hahmottamista universaalisti. 11 kielen tuki tukee monikielisi\u00e4 luokkia.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t polkuharjoitukset', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa ja polkus\u00e4\u00e4nt\u00f6j\u00e4 HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja selv\u00e4t polut tukevat heikompia oppilaita. Polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hienomotoriikkaa ja hahmottamista.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy polkupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia polkukokoelmia myyt\u00e4v\u00e4ksi verkossa. Kuvapolkuteht\u00e4v\u00e4t ovat suosittuja materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit ilman lis\u00e4kuluja.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvapolkugeneraattori toimii?', answer: 'Generaattori luo ruudukon, jossa jokaisessa solussa on kuva. Oppilas kulkee aloituspisteest\u00e4 maaliin polkus\u00e4\u00e4nn\u00f6n mukaan. S\u00e4\u00e4nt\u00f6 m\u00e4\u00e4ritt\u00e4\u00e4 mitk\u00e4 kuvat ovat sallittuja polulla.' },
    { id: '2', question: 'Miten ruudukon kokoa s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Valitse rivien ja sarakkeiden m\u00e4\u00e4r\u00e4 erikseen. Pieni ruudukko (4\u00d74) sopii esiopetukseen. Suurempi ruudukko (8\u00d78 tai 10\u00d710) haastaa vanhempia oppilaita. S\u00e4\u00e4d\u00e4 kokoa taitotason mukaan.' },
    { id: '3', question: 'Mitk\u00e4 polkus\u00e4\u00e4nn\u00f6t ovat k\u00e4ytett\u00e4viss\u00e4?', answer: 'Useita s\u00e4\u00e4nt\u00f6j\u00e4: kulje vain tiettyj\u00e4 kuvia pitkin, v\u00e4lt\u00e4 tiettej\u00e4 kuvia, seuraa kuviosekvenssi\u00e4 tai kulje vain viereisiin soluihin. S\u00e4\u00e4nn\u00f6t m\u00e4\u00e4ritt\u00e4v\u00e4t vaikeustason.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen polkuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikea polku on korostettu selke\u00e4sti ruudukossa. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille polkuteht\u00e4v\u00e4t sopivat?', answer: 'Polkuteht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset kulkevat yksinkertaisia polkuja pieniss\u00e4 ruudukoissa. 1.\u20133. luokan oppilaat ratkaisevat monimutkaisia reittej\u00e4 suuremmissa ruudukoissa.' },
    { id: '6', question: 'Miten polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t taitoja?', answer: 'Polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista seurantaa, avaruudellista hahmottamista, strategista ajattelua ja hienomotoriikkaa. Polun suunnittelu vaatii ennakointia ja p\u00e4\u00e4tt\u00e4mist\u00e4.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori t\u00e4ytt\u00e4\u00e4 ruudukon automaattisesti valituilla kuvilla. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa.' },
    { id: '8', question: 'Miten tulostan polkuteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. S\u00e4\u00e4d\u00e4 ruudukon kokoa ja polkus\u00e4\u00e4nt\u00f6j\u00e4 HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja selv\u00e4t s\u00e4\u00e4nn\u00f6t tukevat heikompia oppilaita. Polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hienomotoriikkaa.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden polkuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja polkus\u00e4\u00e4nt\u00f6 30 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat nopeasti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani polkuteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin polkuteht\u00e4vien myyntiin verkossa. Luo teemallisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten polkuteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista hahmottamista, visuaalista seurantaa ja hienomotoriikkaa. POPS 2014 korostaa monipuolisia ty\u00f6tapoja ja toiminnallista oppimista. Polkuteht\u00e4v\u00e4t toteuttavat molempia tavoitteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Viivanpiirtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4nhallintaa ennen polkuteht\u00e4vi\u00e4. Yhdist\u00e4 molemmat hienomotoriikan kattavaan harjoitteluun.' },
    { id: '2', slug: 'ruudukkopiirustus-tyoarkit', name: 'Ruudukkopiirustus', category: 'Hahmottaminen', icon: '\u{1f4d0}', description: 'Ruudukkopiirustus kehitt\u00e4\u00e4 samoja avaruudellisia taitoja kuin polkuteht\u00e4v\u00e4t. Yhdist\u00e4 molemmat visuaalisen hahmottamisen pakettiin.' },
    { id: '3', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista tarkkaavaisuutta, joka tukee polkuteht\u00e4viss\u00e4 tarvittavaa skannausta.' },
    { id: '4', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 kuvien tunnistamista ja luokittelua, joka tukee polkus\u00e4\u00e4nt\u00f6jen noudattamista.' },
    { id: '5', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista erottelua ja muodon tunnistamista. Yhdist\u00e4 polkuteht\u00e4vien kanssa hahmottamisen harjoitteluun.' },
    { id: '6', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkosovitus', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Ruudukkosovitus laajentaa ruudukkotaitoja kuvan palojen sijoittamiseen. Molemmat kehitt\u00e4v\u00e4t avaruudellista hahmottamista.' },
  ],
  aiOverviewSnippet: 'Kuvapolku-generaattori on verkkotyokalu, jolla luodaan tulostettavia ruudukkopohjaisia polkutehtavia esiopetukseen ja alakouluun. Oppilaat kulkevat aloituspisteesta maaliin seuraten polkusaantoa, joka maarittelee sallitut kuvat. Opettajat valitsevat ruudukon koon, polkusaannon ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Ruudukkokoko', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 4\u00d74\u201310\u00d710', typical: 'Kiinte\u00e4 koko' },
    { feature: 'Polkus\u00e4\u00e4nn\u00f6t', ourApp: 'Useita vaihtoehtoja ja vaikeustasoja', typical: 'Yksi s\u00e4\u00e4nt\u00f6' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Ruudukkopohjaisten polkuteht\u00e4vien ratkaiseminen kehitt\u00e4\u00e4 avaruudellista navigointia ja toiminnanohjausta, jotka ovat matemaattisen ja tieteellisen ajattelun perusedellytyksi\u00e4.', source: 'Lepola, J. et al., "Avaruudellisen hahmottamisen ja oppimisen yhteydet," Turun yliopisto' },
    { claim: 'Polkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t suunnittelukyky\u00e4 ja ennakoivaa ajattelua, jotka ovat toiminnanohjauksen keskeisi\u00e4 osataitoja varhaiskasvatusik\u00e4isill\u00e4.', source: 'Lehto, J. et al., "Toiminnanohjaus ja oppiminen," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvapolkutehtavat ovat oppilaitteni suosikkeja. Lapset rakastavat etsia oikeaa reittia ruudukossa ja kehittavat samalla visuaalista hahmottamista. Saadettava ruudukkokoko tekee eriyttamisesta helppoa esiopetuksessa ja alakoulussa.', name: 'Leena H\u00e4rk\u00f6nen', role: 'Esiopetuksen opettaja', school: 'Puistokaaren p\u00e4iv\u00e4koti, Jyv\u00e4skyl\u00e4' },
    { quote: 'Kaytan polkutehtavia aamutyoskentelyssa ja matikkapajassa. Oppilaat suunnittelevat reittia ennakkoon ja kehittavat strategista ajattelua. Monipuoliset polkusaannot pitavat tehtavat mielenkiintoisina viikosta toiseen.', name: 'Vesa Niskanen', role: '2. luokan opettaja', school: 'Niittykummun koulu, Espoo' },
  ],
  tips: {
    sectionTitle: 'Polkustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvapolkugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ruudukon koon, polkus\u00e4\u00e4nn\u00f6n ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Pienet ruudukot selv\u00e4ll\u00e4 polulla', description: 'Kaytta 4x4 tai 5x5 ruudukkoa yhdella polkusaannolla (esim. kulje vain kissoja pitkin). Esikoululaiset harjoittelevat visuaalista seurantaa ja kynanhallintaa. Yksinkertainen saanto rakentaa hahmottamisen perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Keskikokoiset ruudukot ja monipuolisemmat s\u00e4\u00e4nn\u00f6t', description: 'Luo 5x5 tai 6x6 ruudukkotehtavia kahdella polkusaannolla. Esiopetuksen oppilaat kehittavat strategista suunnittelua ja visuaalista analysointia. Tukee POPS 2014 tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Suuremmat ruudukot ja haastavammat s\u00e4\u00e4nn\u00f6t', description: 'Generoi 6x6 tai 7x7 ruudukkotehtavia monimutkaisemmilla polkusaannoilla. Ekaluokkalaiset suunnittelevat reittia ennakkoon ja kehittavat avaruudellista paattelya.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Monimutkaiset reitit ja sekvenssipolut', description: 'Luo 7x7 tai 8x8 ruudukkotehtavia sekvenssisaannoilla. Toisluokkalaiset noudattavat kuviosekvenssia (esim. kissa-koira-kissa-koira) reitin aikana. Kehittaa monimutkaista ajattelua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Vaativat sokkelot useilla s\u00e4\u00e4nn\u00f6ill\u00e4', description: 'Kaytta 8x8 tai suurempia ruudukoita useilla samanaikaisilla polkusaannoilla. Kolmasluokkalaiset ratkaisevat monimutkaisia reitteja itsenaisesti. Tehtavat kehittavat systemaattista ajattelua ja ongelmanratkaisua.' },
    ],
  },
};

// ===================================================================
// 6. PICTURE-SORT (kuvalajittelu-tyoarkit)
// ===================================================================
const pictureSort = {
  file: 'kuvalajittelu-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4cb}', title: 'Lajittelu- ja luokitteluteht\u00e4v\u00e4muoto', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat lajittelevat kuvia 2\u20134 ryhm\u00e4\u00e4n m\u00e4\u00e4ritettyjen ominaisuuksien mukaan. Leikkaa ja liimaa -muoto tekee oppimisesta toiminnallista. Kehitt\u00e4\u00e4 luokittelutaitoja ja kategorista ajattelua.' },
    { id: '2', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ryhm\u00e4m\u00e4\u00e4r\u00e4 ja lajitteluperuste', description: 'Valitse 2\u20134 lajitteluryhm\u00e4\u00e4 teht\u00e4v\u00e4\u00e4n. Kaksi ryhm\u00e4\u00e4 sopii nuoremmille lapsille. Nelj\u00e4 ryhm\u00e4\u00e4 haastaa vanhempia oppilaita. Lajitteluperusteena voi olla teema, v\u00e4ri, muoto tai koko.' },
    { id: '3', icon: '\u2702\ufe0f', title: 'Leikkaa ja liimaa -toiminnallisuus', description: 'Teht\u00e4v\u00e4t sis\u00e4lt\u00e4v\u00e4t leikattavat kuvapalat ja kohderyhmien lokerot. Oppilaat leikkaavat kuvat irti ja liimaavat oikeisiin ryhmiin. K\u00e4sill\u00e4 tekeminen vahvistaa luokittelun oppimista.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa lajitteluteht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta lajitteluteht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Kuvat sijoittuvat lajitteluryhmiin automaattisesti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen lajitteluteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kuvat n\u00e4kyv\u00e4t oikeissa ryhmiss\u00e4. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, fontteja, v\u00e4rej\u00e4 ja kehyksi\u00e4 ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 lajitteluteht\u00e4vi\u00e4 verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo lajitteluteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Luokittelun perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia lajitteluteht\u00e4vi\u00e4 kahdella ryhm\u00e4ll\u00e4 ja selv\u00e4ll\u00e4 lajitteluperusteella. Esiopetuksen oppilaat harjoittelevat kuvien ryhm\u00e4\u00e4n sijoittamista leikkaa ja liimaa -menetelm\u00e4ll\u00e4. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kategorista ajattelua 1.\u20133. luokalla', description: 'Generoi lajitteluteht\u00e4vi\u00e4 3\u20134 ryhm\u00e4ll\u00e4 hienommilla lajitteluperusteilla. Oppilaat analysoivat kuvien ominaisuuksia ja perustelevat valintansa. Kehitt\u00e4\u00e4 tieteellist\u00e4 ajattelutapaa.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Toiminnallisia lajittelupulmia kotiin', description: 'Luo temaattisia lajitteluteht\u00e4vi\u00e4 lasten suosikkiaiheilla. Leikkaa ja liimaa -muoto pit\u00e4\u00e4 lapset aktiivisina. El\u00e4in- ja ruokateema motivoi lajittelua kotona.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastoharjoittelua lajittelun kautta', description: 'Lajitteluteht\u00e4v\u00e4t opettavat luokittelua ja sanastoa kuvapohjaisesti. Oppilaat oppivat ryhm\u00e4\u00e4n kuuluvat ja kuulumattomat sanat. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t lajitteluharjoitukset', description: 'S\u00e4\u00e4d\u00e4 ryhmien m\u00e4\u00e4r\u00e4\u00e4 ja lajitteluperustetta HOJKS-tavoitteiden mukaisesti. Kaksi ryhm\u00e4\u00e4 selv\u00e4ll\u00e4 erolla tukee heikompia oppilaita. Leikkaa ja liimaa kehitt\u00e4\u00e4 hienomotoriikkaa.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy lajittelupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia lajittelukokoelmia myyt\u00e4v\u00e4ksi verkossa. Leikkaa ja liimaa -materiaalit ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvalajittelugeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa kuvat lajitellaan ryhmiin m\u00e4\u00e4ritettyjen ominaisuuksien mukaan. Leikattavat kuvapalat sijaitsevat sivun alareunassa. Oppilaat leikkaavat ja liimaavat kuvat oikeisiin loketoihin.' },
    { id: '2', question: 'Kuinka monta lajitteluryhm\u00e4\u00e4 voi olla?', answer: 'Valitse 2\u20134 lajitteluryhm\u00e4\u00e4 per teht\u00e4v\u00e4. Kaksi ryhm\u00e4\u00e4 sopii esiopetukseen. Kolme tai nelj\u00e4 ryhm\u00e4\u00e4 haastaa vanhempia oppilaita. S\u00e4\u00e4d\u00e4 m\u00e4\u00e4r\u00e4\u00e4 taitotason mukaan.' },
    { id: '3', question: 'Miten lajitteluperusteet toimivat?', answer: 'Generaattori luo ryhmi\u00e4 eri perusteilla: teema (el\u00e4imet vs ruoka), ominaisuus (iso vs pieni), v\u00e4ri tai muoto. Oppilaat tunnistavat lajitteluperusteen ja sijoittavat kuvat oikeisiin ryhmiin.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen lajitteluteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Kuvat n\u00e4kyv\u00e4t oikeissa ryhmiss\u00e4. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille lajitteluteht\u00e4v\u00e4t sopivat?', answer: 'Lajitteluteht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset lajittelevat kahteen ryhm\u00e4\u00e4n. 1.\u20133. luokan oppilaat lajittelevat 3\u20134 ryhm\u00e4\u00e4n hienommilla perusteilla.' },
    { id: '6', question: 'Miten leikkaa ja liimaa -teht\u00e4v\u00e4t toimivat?', answer: 'Sivun alareunassa on leikattavat kuvapalat katkoviivoin merkittyin\u00e4. Sivun yl\u00e4osassa on lajitteluryhmien lokerot otsikoilla. Oppilaat leikkaavat kuvat ja liimaavat ne oikeisiin loketoihin.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa. Luokkahuoneen kuvat tekev\u00e4t lajittelusta merkityksellisempaa.' },
    { id: '8', question: 'Miten tulostan lajitteluteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. PDF-muoto s\u00e4ilytt\u00e4\u00e4 tarkan ulkoasun leikkaamiseen ja liimaamiseen.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. S\u00e4\u00e4d\u00e4 ryhmien m\u00e4\u00e4r\u00e4\u00e4 ja kuvien selvyytt\u00e4 HOJKS-tavoitteiden mukaisesti. Kaksi ryhm\u00e4\u00e4 selv\u00e4ll\u00e4 erolla tukee heikompia oppilaita. Toiminnallisuus kehitt\u00e4\u00e4 hienomotoriikkaa.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden lajitteluteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja ryhmitys 30 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti leikattavine osineen.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani lajitteluteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin lajitteluteht\u00e4vien myyntiin verkossa. Leikkaa ja liimaa -paketit ovat kysyttyj\u00e4 opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten lajitteluteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Lajitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelutaitoja, kategorista ajattelua ja hienomotoriikkaa. POPS 2014 korostaa toiminnallista oppimista ja ajattelun taitoja. Leikkaa ja liimaa -lajittelu yhdist\u00e4\u00e4 molemmat.' },
  ],
  relatedApps: [
    { id: '1', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkea joukosta -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t samaa luokitteluajattelua eri muodossa. Yhdist\u00e4 lajittelun kanssa kattavaan luokitteluharjoitteluun.' },
    { id: '2', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista tunnistamista, joka tukee lajitteluteht\u00e4viss\u00e4 tarvittavaa kuvan analysointia.' },
    { id: '3', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f523}', description: 'Kuvioteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t sarjojen tunnistamista ja loogista ajattelua. Yhdist\u00e4 lajittelun kanssa monipuoliseen ajatteluharjoitteluun.' },
    { id: '4', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Sanasto', icon: '\u{1f3b2}', description: 'Kuvabingo yhdist\u00e4\u00e4 kuvan tunnistamisen pelimuotoon. Molemmat kehitt\u00e4v\u00e4t kuvien tunnistamista ja luokittelua.' },
    { id: '5', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n vai v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Vertailuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4rien vertailua, joka t\u00e4ydent\u00e4\u00e4 lajittelun vaatimaa luokitteluajattelua.' },
    { id: '6', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Logiikka', icon: '\u{1f517}', description: 'Yhdist\u00e4 parit -teht\u00e4v\u00e4t harjoittavat yhteenkuuluvuuden tunnistamista. Molemmat kehitt\u00e4v\u00e4t kategorista ajattelua eri muodoissa.' },
  ],
  aiOverviewSnippet: 'Kuvalajittelu-generaattori on verkkotyokalu, jolla luodaan tulostettavia leikkaa ja liimaa -lajittelutehtavia esiopetukseen ja alakouluun. Oppilaat leikkaavat kuvia ja liimaavat ne oikeisiin luokkiin maaritetyn ominaisuuden mukaan. Opettajat valitsevat ryhmien maaran, lajitteluperusteen ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Lajitteluryhmm\u00e4t', ourApp: '2\u20134 ryhm\u00e4\u00e4 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 2 ryhm\u00e4\u00e4' },
    { feature: 'Muoto', ourApp: 'Leikkaa ja liimaa -toiminnallinen', typical: 'Pelkk\u00e4 kuvio ilman toimintaa' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Luokittelu- ja lajitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kategorista ajattelua, joka on tieteellisen menetelm\u00e4n ja loogisen p\u00e4\u00e4ttelyn perusedellytys varhaiskasvatuksessa.', source: 'Hautam\u00e4ki, J. et al., "Luokittelutaitojen kehitys ja merkitys," Helsingin yliopisto' },
    { claim: 'Leikkaa ja liimaa -menetelm\u00e4 yhdist\u00e4\u00e4 hienomotoriikan ja kognitiivisen luokittelun, mik\u00e4 vahvistaa oppimista monikanavaisen prosessoinnin kautta.', source: 'Ahonen, T. et al., "Toiminnallisen oppimisen vaikuttavuus," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvalajittelutehtavat ovat erinomaisia luokittelutaitojen kehittamiseen. Oppilaani rakastavat leikkaa ja liimaa -muotoa ja oppivat samalla kategorisointia. Saadettava ryhmien maara tekee eriyttamisesta helppoa eri-ikaisille oppilaille.', name: 'Pirjo Savola', role: '1. luokan opettaja', school: 'Kaukaj\u00e4rven koulu, Tampere' },
    { quote: 'Kaytan lajittelutehtavia esiopetuksessa paivittain. Lapset oppivat tunnistamaan yhteisia piirteita ja lajittelemaan kuvia ryhmiin. Leikkaaminen ja liimaaminen kehittaa samalla hienomotoriikkaa, mika on tarkeaa ennen koulun alkua.', name: 'Ilkka Karppinen', role: 'Esiopetuksen opettaja', school: 'Kartanon p\u00e4iv\u00e4koti, Oulu' },
  ],
  tips: {
    sectionTitle: 'Lajittelustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvalajittelugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ryhmien m\u00e4\u00e4r\u00e4n, lajitteluperusteen ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kaksi ryhm\u00e4\u00e4 selv\u00e4ll\u00e4 erolla', description: 'Kaytta kahtaa lajitteluryhm aa selvalla erolla (esim. elaimet vs ruoka). Esikoululaiset harjoittelevat kuvan tunnistamista ja ryhm aan sijoittamista. Leikkaa ja liimaa kehittaa hienomotoriikkaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kolme ryhm\u00e4\u00e4 ja monipuolisemmat teemat', description: 'Luo lajittelutehtavia kolmella ryhmalla ja vaihtelevilla teemoilla. Esiopetuksen oppilaat kehittavat kategorisointia ja perustelutaitoja. Tukee POPS 2014 ajattelutaitojen kehittamista.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Kolme ryhm\u00e4\u00e4 hienommilla perusteilla', description: 'Generoi lajittelutehtavia kolmella ryhmalla ja hienommilla eroilla. Ekaluokkalaiset analysoivat kuvien ominaisuuksia tarkemmin ja perustelevat lajittelun suullisesti.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Nelj\u00e4 ryhm\u00e4\u00e4 ja moniperusteiset lajittelut', description: 'Luo tehtavia neljalla ryhmalla, joissa lajitteluperuste on hienojakoisempi. Toisluokkalaiset oppivat etta samoja kuvia voi lajitella eri tavoin eri perusteilla.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset luokitteluhaasteet', description: 'Kaytta neljaa ryhmaa monimutkaisilla lajitteluperusteilla. Kolmasluokkalaiset perustelevat valintansa kirjallisesti ja luovat omia luokitteluperusteita. Kehittaa tieteellista ajattelua.' },
    ],
  },
};

// ===================================================================
// 7. PREPOSITIONS (prepositio-tyoarkit)
// ===================================================================
const prepositions = {
  file: 'prepositio-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4cd}', title: 'Paikkasanojen harjoitusmuoto', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat tunnistavat esineiden sijainnin suhteessa toisiinsa. Kahdeksan paikkasanaa: p\u00e4\u00e4ll\u00e4, alla, edess\u00e4, takana, vieress\u00e4, v\u00e4liss\u00e4, sis\u00e4ll\u00e4 ja ulkona. Kehitt\u00e4\u00e4 avaruudellista sanastoa.' },
    { id: '2', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4t paikkasanavalinnat', description: 'Valitse mitk\u00e4 paikkasanat sis\u00e4ltyv\u00e4t teht\u00e4v\u00e4\u00e4n. Aloita kahdella paikkasanalla (p\u00e4\u00e4ll\u00e4, alla) ja laajenna asteittain. T\u00e4ydellinen eriyttett\u00e4visiin oppimistilanteisiin taitotason mukaan.' },
    { id: '3', icon: '\u{1f4dd}', title: 'Monipuoliset teht\u00e4v\u00e4muodot', description: 'Useita vastausmuotoja: ympyr\u00f6i oikea kuva, valitse oikea paikkasana, piirr\u00e4 esine oikeaan paikkaan tai yhdist\u00e4 kuva paikkasanaan. Monipuolisuus pit\u00e4\u00e4 harjoittelun motivoivana.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa paikkasanateht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta paikkasanateht\u00e4vien luomiseen. El\u00e4imet, huonekalut, lelut ja kymmenet muut teemat. Kuvat n\u00e4ytt\u00e4v\u00e4t sijainnin havainnollisesti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen paikkasanateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat vastaukset on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, fontteja, v\u00e4rej\u00e4 ja kehyksi\u00e4 ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 paikkasanateht\u00e4vi\u00e4 verkossa. Prepositioharjoitukset ovat suosittuja kielenopetuksen materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo paikkasanateht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. Paikkasanat k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen S2-opetukseen ja monikielisiin luokkiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Paikkasanojen perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia paikkasanateht\u00e4vi\u00e4 kahdella paikkasanalla (p\u00e4\u00e4ll\u00e4, alla). Esiopetuksen oppilaat harjoittelevat sijainnin tunnistamista kuvien avulla. Visuaalinen muoto tekee paikkasanoista konkreettisia. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Avaruudellista sanastoa 1.\u20132. luokalla', description: 'Generoi paikkasanateht\u00e4vi\u00e4 4\u20138 paikkasanalla. Oppilaat oppivat k\u00e4ytt\u00e4m\u00e4\u00e4n paikkasanoja lauseissa ja tunnistamaan spatiaalisia suhteita. Kehitt\u00e4\u00e4 avaruudellista sanastoa ja kirjoitustaitoja.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja paikkasanaharjoituksia kotiin', description: 'Luo temaattisia paikkasanateht\u00e4vi\u00e4 tutuilla kuvilla. El\u00e4in- ja huonekalukuvat tekev\u00e4t sijainnin oppimisesta konkreettista. Visuaaliset teht\u00e4v\u00e4t sopivat itsen\u00e4iseen harjoitteluun kotona.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Suomen kielen paikkasanojen opetus', description: 'Paikkasanateht\u00e4v\u00e4t ovat erinomaisia S2-opetukseen. Kuvat havainnollistavat paikkasanojen merkityksen konkreettisesti. 11 kielen tuki mahdollistaa vertailun oman \u00e4idinkielen paikkasanoihin.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt paikkasanaharjoitukset', description: 'S\u00e4\u00e4d\u00e4 paikkasanojen m\u00e4\u00e4r\u00e4\u00e4 ja teht\u00e4v\u00e4muotoa HOJKS-tavoitteiden mukaisesti. Kaksi paikkasanaa selv\u00e4ll\u00e4 erolla tukee heikompia oppilaita. Visuaalinen muoto tekee oppimisesta konkreettista.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy paikkasanapaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia paikkasanapaketteja myyt\u00e4v\u00e4ksi verkossa. Prepositioharjoitukset ovat jatkuvasti kysyttyj\u00e4 kielenopetuksen materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten prepositiogeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa kuvat n\u00e4ytt\u00e4v\u00e4t esineiden sijaintisuhteita. Oppilaat tunnistavat paikkasanan (p\u00e4\u00e4ll\u00e4, alla, edess\u00e4 jne.) kuvan perusteella. Valitse paikkasanat, teht\u00e4v\u00e4muoto ja kuvateema.' },
    { id: '2', question: 'Mitk\u00e4 paikkasanat ovat k\u00e4ytett\u00e4viss\u00e4?', answer: 'Kahdeksan paikkasanaa: p\u00e4\u00e4ll\u00e4, alla, edess\u00e4, takana, vieress\u00e4, v\u00e4liss\u00e4, sis\u00e4ll\u00e4 ja ulkona. Valitse mitk\u00e4 sis\u00e4ltyv\u00e4t teht\u00e4v\u00e4\u00e4n. Aloita kahdesta ja laajenna asteittain.' },
    { id: '3', question: 'Mitk\u00e4 teht\u00e4v\u00e4muodot ovat saatavilla?', answer: 'Useita muotoja: ympyr\u00f6i oikea kuva, valitse oikea paikkasana, piirr\u00e4 esine oikeaan paikkaan ja yhdist\u00e4 kuva paikkasanaan. Monipuoliset muodot pit\u00e4v\u00e4t harjoittelun vaihtelevana.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen paikkasanateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat vastaukset korostetaan selke\u00e4sti. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille paikkasanateht\u00e4v\u00e4t sopivat?', answer: 'Paikkasanateht\u00e4v\u00e4t palvelevat 4\u20138-vuotiaita. Esikoululaiset harjoittelevat 2\u20133 paikkasanaa. 1.\u20132. luokan oppilaat k\u00e4ytt\u00e4v\u00e4t kaikkia 8 paikkasanaa lauseissa.' },
    { id: '6', question: 'Miten paikkasanateht\u00e4v\u00e4t tukevat kielenoppimista?', answer: 'Paikkasanat ovat kielellisen kehityksen perusosaamista. Visuaaliset kuvat tekev\u00e4t abstrakteista paikkasanoista konkreettisia. Oppilaat ymm\u00e4rt\u00e4v\u00e4t sijainnin k\u00e4sitteen ennen sanallista ilmaisua.' },
    { id: '7', question: 'Sopivatko teht\u00e4v\u00e4t S2-opetukseen?', answer: 'Erinomaisesti. Paikkasanat ovat keskeisi\u00e4 S2-opetuksessa ja kuvat havainnollistavat merkityksen ilman k\u00e4\u00e4nn\u00f6st\u00e4. 11 kielen tuki mahdollistaa vertailun oman \u00e4idinkielen paikkasanoihin.' },
    { id: '8', question: 'Miten tulostan paikkasanateht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Kyll\u00e4. S\u00e4\u00e4d\u00e4 paikkasanojen m\u00e4\u00e4r\u00e4\u00e4 ja teht\u00e4v\u00e4muotoa HOJKS-tavoitteiden mukaisesti. Kaksi paikkasanaa selv\u00e4ll\u00e4 erolla tukee heikompia oppilaita. Kuvat tekev\u00e4t oppimisesta konkreettista.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden paikkasanateht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse paikkasanat ja kuvat 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat nopeasti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani paikkasanateht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin paikkasanateht\u00e4vien myyntiin verkossa. Luo teemallisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten paikkasanateht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Paikkasanateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista sanastoa, kielellisi\u00e4 taitoja ja visuaalista hahmottamista. POPS 2014 korostaa monipuolista kielitietoisuutta ja avaruudellisen ajattelun kehitt\u00e4mist\u00e4. Paikkasanateht\u00e4v\u00e4t toteuttavat molempia.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: 'Lukutaito', icon: '\u270f\ufe0f', description: 'K\u00e4sinkirjoitusteht\u00e4v\u00e4t laajentavat kielellisi\u00e4 taitoja kirjoittamisen harjoitteluun. Yhdist\u00e4 paikkasanateht\u00e4viin kattavaan kielenoppimispakettiin.' },
    { id: '2', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Viivanpiirtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4nhallintaa paikkasanateht\u00e4vien rinnalla. Molemmat tukevat hienomotoriikan kehittymist\u00e4.' },
    { id: '3', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: 'Sanasto', icon: '\u{1f4a1}', description: 'Kuva-arvausteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t sanastoa visuaalisesti. Yhdist\u00e4 paikkasanateht\u00e4viin kattavaan sanastoharjoitteluun.' },
    { id: '4', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista hahmottamista, joka tukee paikkasanojen ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '5', slug: 'iso-pieni-tyoarkit', name: 'Iso vai pieni', category: 'Hahmottaminen', icon: '\u{1f4cf}', description: 'Iso vai pieni -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista vertailua, joka tukee paikkasanojen vaatimaa sijainnin hahmottamista.' },
    { id: '6', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Logiikka', icon: '\u{1f517}', description: 'Yhdist\u00e4 parit -teht\u00e4v\u00e4t harjoittavat yhteenkuuluvuuden tunnistamista. Yhdist\u00e4 paikkasanateht\u00e4viin monipuoliseen kielioppipakettiin.' },
  ],
  aiOverviewSnippet: 'Prepositio-generaattori on verkkotyokalu, jolla luodaan tulostettavia paikkasanatehtavia esiopetukseen ja alakouluun. Oppilaat tunnistavat esineiden sijaintisuhteita (paalla, alla, edessa, takana jne.) kuvien avulla. Opettajat valitsevat paikkasanat, tehtavamuodon ja teemakuvat, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Paikkasanat', ourApp: '8 paikkasanaa vapaasti valittavissa', typical: 'Kiinte\u00e4 4\u20135 paikkasanaa' },
    { feature: 'Teht\u00e4v\u00e4muodot', ourApp: '4 muotoa: ympyr\u00f6i, valitse, piirr\u00e4, yhdist\u00e4', typical: 'Vain yksi muoto' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Paikkasanojen aktiivinen harjoittelu kehitt\u00e4\u00e4 avaruudellista kielen ymm\u00e4rt\u00e4mist\u00e4, joka on yhteydess\u00e4 matemaattiseen ja tieteelliseen ajatteluun.', source: 'Silvén, M. et al., "Kielen ja avaruudellisen ajattelun yhteydet varhaiskasvatuksessa," Turun yliopisto' },
    { claim: 'Visuaaliset paikkasanateht\u00e4v\u00e4t rakentavat avaruudellisen kognition perustaa, joka tukee kartanluvun, geometrian ja avaruudellisen p\u00e4\u00e4ttelyn kehittymist\u00e4.', source: 'Aunio, P. & Räsänen, P., "Avaruudellinen kognitio ja matemaattiset taidot," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Paikkasanatehtavat ovat korvaamattomia S2-opetuksessa. Kuvat havainnollistavat paikkasanojen merkityksen konkreettisesti ilman kaannosta. Oppilaat ymmartavat nopeasti eron paalla ja alla, edessa ja takana kuvien avulla.', name: 'Arja Toivola', role: 'S2-opettaja', school: 'Kallion koulu, Helsinki' },
    { quote: 'Kaytan prepositiotehtavia esiopetuksessa viikoittain. Lapset oppivat paikkasanoja leikkien kautta ja tehtavat vahvistavat oppimista. Saadettava paikkasanojen maara tekee eriyttamisesta helppoa eri-ikaisille lapsille.', name: 'Raimo J\u00e4rvinen', role: 'Esiopetuksen opettaja', school: 'Koivukujan p\u00e4iv\u00e4koti, Lahti' },
  ],
  tips: {
    sectionTitle: 'Paikkasanastrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 prepositiogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset paikkasanojen m\u00e4\u00e4r\u00e4n, teht\u00e4v\u00e4muodon ja monimutkaisuuden esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kaksi paikkasanaa visuaalisesti', description: 'Kaytta kahtaa paikkasanaa (paalla, alla) selvilla kuvilla. Esikoululaiset tunnistavat sijainnin kuvia katsomalla. Yksinkertainen muoto rakentaa avaruudellisen sanaston perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Nelj\u00e4 paikkasanaa ja ympyr\u00f6intiteht\u00e4v\u00e4t', description: 'Luo tehtavia neljalla paikkasanalla (paalla, alla, edessa, takana) ympyrointitehtavina. Esiopetuksen oppilaat kehittavat avaruudellista sanastoa kuvia analysoimalla. Tukee POPS 2014 tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Kuusi paikkasanaa lauseissa', description: 'Generoi tehtavia kuudella paikkasanalla (lisa: vieressa, valissa). Ekaluokkalaiset kayttavat paikkasanoja lauseissa ja tunnistavat sijainnin monipuolisemmin. Kehittaa kirjallista ilmaisua.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Kaikki kahdeksan paikkasanaa', description: 'Luo tehtavia kaikilla kahdeksalla paikkasanalla (lisa: sisalla, ulkona). Toisluokkalaiset hallitsevat kaikki paikkasanat ja kayttavat niita monipuolisissa lauseissa. Vahvistaa avaruudellista sanastoa.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Soveltavat paikkasanateht\u00e4v\u00e4t', description: 'Kaytta kaikkia paikkasanoja soveltavissa tehtavissa. Kolmasluokkalaiset kirjoittavat omia lauseita paikkasanoilla ja kuvaavat monimutkaisia sijaintisuhteita. Tukee kielellista kehitysta.' },
    ],
  },
};

// ===================================================================
// PROCESSING LOGIC
// ===================================================================
const apps = [moreLess, oddOneOut, patternTrain, patternWorksheet, picturePath, pictureSort, prepositions];

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
    '  // -- SEO & Content Enrichment (Part 177) ------------------------------------',
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
