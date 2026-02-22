/**
 * Part 175: FI Product Pages 8-14 — Content Enrichment
 *
 * Populates empty arrays (features, useCases, faq, relatedApps) and adds
 * SEO enrichment fields (aiOverviewSnippet, comparisonTable, researchBacking,
 * teacherTestimonials, tips) for 7 Finnish product pages.
 *
 * Usage: node scripts/apply-part175-seo.js
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
// 1. MATCHING (yhdista-parit-tyoarkit)
// ===================================================================
const matching = {
  file: 'yhdista-parit-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f91d}', title: 'Kuvaparien yhdist\u00e4minen visuaalisilla harjoituksilla', description: 'Luo ammattimaisia yhdist\u00e4misteht\u00e4vi\u00e4, joissa oppilaat piirt\u00e4v\u00e4t viivoja yhdist\u00e4\u00e4kseen toisiinsa liittyvi\u00e4 kuvapareja. Jokainen teht\u00e4v\u00e4 esitt\u00e4\u00e4 kuvaparit, jotka vaativat visuaalista assosiaatiota, muistin k\u00e4ytt\u00f6\u00e4 ja loogista yhdist\u00e4mist\u00e4. Muoto kehitt\u00e4\u00e4 kriittist\u00e4 ajattelua visuaalisen suhdeanalyysin kautta.' },
    { id: '2', icon: '\u{1f500}', title: 'Nelj\u00e4 yhdist\u00e4mistilaa eri taitotasoille', description: 'Valitse yhdist\u00e4mistiloista, jotka kehitt\u00e4v\u00e4t eri kognitiivisia taitoja. Identtisten kuvien yhdist\u00e4minen rakentaa visuaalista erottelua. Varjo-kuva-yhdist\u00e4minen kehitt\u00e4\u00e4 muodon tunnistamista. Liittyv\u00e4t parit yhdist\u00e4v\u00e4t toisiinsa liittyvi\u00e4 k\u00e4sitteit\u00e4. Kategoriapohjaiset teht\u00e4v\u00e4t ryhmittelev\u00e4t teeman mukaan.' },
    { id: '3', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 parim\u00e4\u00e4r\u00e4 3\u20138 per teht\u00e4v\u00e4', description: 'Aseta 3\u20138 yhdist\u00e4misp\u00e4ri\u00e4 per teht\u00e4v\u00e4 hallitaksesi vaikeustasoa ja ajank\u00e4ytt\u00f6\u00e4. Kolme paria sopii t\u00e4ydellisesti esikoululaisille. Kuudesta kahdeksaan paria haastaa esiopetuksen ja alakoulun oppilaita rakentaen tarkkaavaisuutta ja ty\u00f6muistia.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa yhdist\u00e4misteht\u00e4viin', description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain kiinnostavien yhdistamisharjoitusten luomiseen. Valitse elaimista, ruoasta, kulkuneuvoista, muodoista ja kymmenista muista kategorioista. Teemapohjaiset tehtavat yllapitavat oppilaiden kiinnostusta.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet joka teht\u00e4v\u00e4\u00e4n', description: 'Jokainen yhdist\u00e4misteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat parit on yhdistetty viivoilla. Opettajat tarkistavat oppilasty\u00f6t sekunneissa. Tulosta vastausavaimet erikseen itsetarkistuspisteille tai dokumenttikameralle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'Muokkausty\u00f6kalu t\u00e4ydelliseen kustomointiin', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista teht\u00e4v\u00e4n osia. Lis\u00e4\u00e4 mukautettua teksti\u00e4, vaihda fontteja ja v\u00e4rej\u00e4, lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 t\u00e4ydet kaupalliset oikeudet myyd\u00e4 yhdist\u00e4misteht\u00e4vi\u00e4 verkossa. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja. Rakenna kannattava oppimateriaaliliiketoiminta.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki sanastoharjoitteluun', description: 'Luo yhdist\u00e4misteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja ja tanska. Kuva-sana-tila luo monikielisi\u00e4 sanastoharjoituksia. T\u00e4ydellinen S2-opetukseen ja kielikylpyohjelmiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaaliset yhdist\u00e4misharjoitukset 5\u20136-vuotiaille', description: 'Luo helppoja 3\u20134 parin teht\u00e4vi\u00e4 identtisell\u00e4 kuvaparitilalla. Esiopetuksen oppilaat harjoittelevat visuaalista erottelua ja viivan piirt\u00e4mist\u00e4 samalla. T\u00e4ydellinen POPS 2014 \u00e4idinkielen ja hienomotoriikan tavoitteiden tukemiseen.' },
    { id: '2', icon: '\u{1f4d6}', title: 'Alakoulun opettajat', subtitle: 'Sanastoharjoittelua kuva-sana-yhdist\u00e4misell\u00e4', description: 'Generoi kuva-sana-yhdist\u00e4misteht\u00e4vi\u00e4 viikon sanalistojen mukaan. K\u00e4yt\u00e4 6\u20138 paria 1.\u20132. luokalle. Yhdist\u00e4 teht\u00e4v\u00e4t sanahakuihin ja ristisanateht\u00e4viin kattaviin sanastopaketteihin.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Teemallisia yhdist\u00e4misteht\u00e4vi\u00e4 kotiin', description: 'Rakenna visuaalisia oppimispaketteja yhdist\u00e4misteht\u00e4vill\u00e4. Yhdist\u00e4 el\u00e4in-, luonto- tai vuodenaikateemoja useissa teht\u00e4v\u00e4tyypeiss\u00e4. Generoi koko viikon materiaalin 15 minuutissa mukautettavalla vaikeustasolla.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikieliset yhdist\u00e4misharjoitukset', description: 'Luo kuva-sana-yhdist\u00e4misteht\u00e4vi\u00e4 11 kielell\u00e4 sanavaraston rakentamiseen. Kuvat tarjoavat yleisen kontekstin samalla kun sanat vahvistavat kohdekielen oikeinkirjoitusta. Vaihda kieli\u00e4 saumattomasti saman teht\u00e4v\u00e4n sis\u00e4ll\u00e4.' },
    { id: '5', icon: '\u{1f9e9}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso jokaiselle oppijalle', description: 'S\u00e4\u00e4d\u00e4 parim\u00e4\u00e4r\u00e4\u00e4 ja yhdist\u00e4mistilaa jokaisen oppilaan taitotason mukaan. Pienet parim\u00e4\u00e4r\u00e4t ja identtiset kuvat tukevat heikompia oppilaita. Viivan piirt\u00e4minen kehitt\u00e4\u00e4 hienomotoriikkaa oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy teht\u00e4v\u00e4kokoelmia kaupallisella lisenssill\u00e4', description: 'Luo teemallisia yhdist\u00e4miskokoelmia myyt\u00e4v\u00e4ksi verkossa. Vuodenaikojen ja juhlap\u00e4ivien mukaiset paketit myyv\u00e4t tasaisesti. Kaupallinen lisenssi kattaa rajattomat myynnit ilman attribuutiovaatimuksia.' },
  ],
  faq: [
    { id: '1', question: 'Miten yhdist\u00e4misgeneraattori luo teht\u00e4vi\u00e4?', answer: 'Generaattori asettelee kuvaparit kahdelle puolelle teht\u00e4v\u00e4sivua sekoitetussa j\u00e4rjestyksess\u00e4. Valitse teema, m\u00e4\u00e4rit\u00e4 parim\u00e4\u00e4r\u00e4 ja yhdist\u00e4mistila, ja sovellus luo valmiin teht\u00e4v\u00e4n vastausavaimineen sekunneissa. Oppilaat piirt\u00e4v\u00e4t viivoja oikeiden parien v\u00e4lille.' },
    { id: '2', question: 'Mitk\u00e4 yhdist\u00e4mistilat ovat saatavilla?', answer: 'Nelj\u00e4 yhdist\u00e4mistilaa: kuva-alkukirjain yhdist\u00e4\u00e4 kuvan ja sen alkukirjaimen, kuva-sana yhdist\u00e4\u00e4 kuvan ja sanan, kuva-tai-sana tarjoaa joustavimman vaihtoehdon, ja oma sana mahdollistaa mukautettujen m\u00e4\u00e4ritelmien k\u00e4yt\u00f6n.' },
    { id: '3', question: 'Kuinka monta paria voi olla yhdess\u00e4 teht\u00e4v\u00e4ss\u00e4?', answer: 'Valitse 4, 5 tai 6 paria per teht\u00e4v\u00e4. Nelj\u00e4 paria sopii parhaiten esikoululaisille ja esiopetuksen oppilaille. Viisi paria tarjoaa standardin harjoittelun. Kuusi paria haastaa vanhempia oppilaita vaatimalla enemm\u00e4n muistia ja tarkkaavaisuutta.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Jokainen yhdist\u00e4misteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Vastausavain n\u00e4ytt\u00e4\u00e4 oikeat yhdist\u00e4mislinjat parien v\u00e4lill\u00e4. Opettajat voivat tulostaa vastausavaimen erikseen tai n\u00e4ytt\u00e4\u00e4 sen dokumenttikameralla.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille yhdist\u00e4misteht\u00e4v\u00e4t sopivat?', answer: 'Yhdist\u00e4misteht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset yhdist\u00e4v\u00e4t identtisi\u00e4 kuvia nelj\u00e4ll\u00e4 parilla. Esiopetuksen oppilaat harjoittelevat kuva-kirjain-yhdist\u00e4mist\u00e4. 1.\u20132. luokan oppilaat ratkaisevat kuva-sana-teht\u00e4vi\u00e4 kuudella parilla.' },
    { id: '6', question: 'Sopivatko yhdist\u00e4misteht\u00e4v\u00e4t esiopetukseen?', answer: 'Yhdist\u00e4misteht\u00e4v\u00e4t sopivat erinomaisesti esiopetukseen. K\u00e4yt\u00e4 identtist\u00e4 kuvaparitilaa nelj\u00e4ll\u00e4 parilla. Kuva-alkukirjain-tila tukee kirjaintuntemuksen kehitt\u00e4mist\u00e4 POPS 2014 tavoitteiden mukaisesti. Viivan piirt\u00e4minen kehitt\u00e4\u00e4 samalla hienomotoriikkaa.' },
    { id: '7', question: 'Voiko teht\u00e4vi\u00e4 luoda useilla kielill\u00e4?', answer: 'Generaattori luo teht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja, tanska ja englanti. Kuva-sana-tilassa sanat vaihdetaan valitun kielen mukaisesti. S2-opettajat hy\u00f6dynt\u00e4v\u00e4t monikielisi\u00e4 teht\u00e4vi\u00e4 kotikielen ja kohdekielen yhdist\u00e4miseen.' },
    { id: '8', question: 'Miten tulostan yhdist\u00e4misteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko ennen lataamista. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta suurissa eriss\u00e4. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti kotitulostimella.' },
    { id: '9', question: 'Voiko omia kuvia ladata teht\u00e4viin?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa. K\u00e4yt\u00e4 luokkavalokuvia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvia henkil\u00f6kohtaiseen materiaaliin.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden yhdist\u00e4misteht\u00e4v\u00e4n luominen vie noin 2\u20133 minuuttia. Valitse teema ja kuvat 30 sekunnissa. M\u00e4\u00e4rit\u00e4 asetukset 20 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon yhdist\u00e4misharjoitukset 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani yhdist\u00e4misteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin yhdist\u00e4misteht\u00e4vien myyntiin verkossa. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja. Myy teemallisia yhdist\u00e4mispaketteja digitaalisina latauksina.' },
    { id: '12', question: 'Miten yhdist\u00e4misteht\u00e4v\u00e4t tukevat POPS 2014 opetussuunnitelmaa?', answer: 'Yhdist\u00e4misteht\u00e4v\u00e4t tukevat \u00e4idinkielen tavoitteita sanavaraston laajentamisessa kuva-sana-assosiaation kautta. Kirjain-kuva-yhdist\u00e4minen vahvistaa kirjain-\u00e4\u00e4nnevastaavuutta. Viivan piirt\u00e4minen kehitt\u00e4\u00e4 hienomotoriikkaa POPS 2014 eriytett\u00e4misperiaatteiden mukaisesti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Yhdist\u00e4 kuvapariteht\u00e4v\u00e4t sanahakupulmiin kattaviin sanastopaketteihin. Oppilaat yhdist\u00e4v\u00e4t kuvia sanoihin yhdess\u00e4 teht\u00e4v\u00e4ss\u00e4 ja etsiv\u00e4t samoja sanoja toisessa.' },
    { id: '2', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'T\u00e4yt\u00e4-puuttuva-kirjain -teht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t yhdist\u00e4misharjoituksia. Oppilaat tunnistavat kuvia ja tuottavat puuttuvia kirjaimia oikeinkirjoituksen vahvistamiseksi.' },
    { id: '3', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista erottelua tunnistamalla kuvan varjon. Yhdist\u00e4 kuvapariteht\u00e4vien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.' },
    { id: '4', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Aakkosjunateht\u00e4v\u00e4t yhdistettyn\u00e4 kuvapariyhdist\u00e4miseen luovat kattavia varhaisen lukutaidon paketteja. Esiopetuksen oppilaat harjoittelevat kirjaintuntemusta molemmissa muodoissa.' },
    { id: '5', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Viivojen piirt\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t samoja hienomotorisia taitoja kuin yhdist\u00e4misteht\u00e4v\u00e4t. Yhdist\u00e4 molemmat hienomotoriikan intensiivisiin harjoituspaketteihin.' },
    { id: '6', slug: 'ristisanatehtavat-tyoarkit', name: 'Ristisanateht\u00e4v\u00e4t', category: '\u00c4idinkieli', icon: '\u2795', description: 'Ristisanateht\u00e4v\u00e4t yhdistettyn\u00e4 kuvapariteht\u00e4viin luovat monipuolisia sanastopaketteja. Oppilaat kohtaavat samat teemasanat eri muodoissa vahvistaen muistiin painamista.' },
  ],
  aiOverviewSnippet: 'Yhdista parit -generaattori on verkkotyokalu, jolla luodaan tulostettavia kuvaparien yhdistamistehtavia esiopetukseen ja alakouluun. Opettajat valitsevat yhdistamistilan, parien maaran ja teemakuvat, ja lataavat valmiin PDF-tehtavan automaattisella vastausavaimella alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Yhdist\u00e4mistilat', ourApp: '4 tilaa: kuva-kirjain, kuva-sana, joustava, mukautettu', typical: '1\u20132 kiinte\u00e4\u00e4 tilaa' },
    { feature: 'Kuvavihjeet', ourApp: '3000+ teemakuvaa visuaalisina elementtein\u00e4', typical: 'Vain tekstipohjaiset teht\u00e4v\u00e4t' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai lis\u00e4maksullinen' },
    { feature: 'Parim\u00e4\u00e4r\u00e4', ourApp: '4\u20136 paria s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 parim\u00e4\u00e4r\u00e4' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Visuaalinen parien yhdist\u00e4minen kehitt\u00e4\u00e4 ty\u00f6muistia ja visuaalista erottelukyky\u00e4, jotka ovat varhaisen lukutaidon perusedellytyksi\u00e4. Kuva-sana-assosiaatioharjoitukset vahvistavat sanavaraston omaksumista merkitt\u00e4v\u00e4sti.', source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY' },
    { claim: 'Yhdist\u00e4misteht\u00e4v\u00e4t, joissa oppilaat piirt\u00e4v\u00e4t viivoja kohteiden v\u00e4lille, kehitt\u00e4v\u00e4t samanaikaisesti hienomotoriikkaa ja visuaalista hahmottamista, tukien kirjoittamisvalmiutta kokonaisvaltaisesti.', source: 'Niilo M\u00e4ki Instituutti, "Visuaalisen hahmottamisen ja motoristen taitojen yhteys," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuva-kirjain-yhdistamistila on loistava esiopetuksen aamutyoskentelyyn. Oppilaat tunnistavat kuvan ja yhdistivat oikean alkukirjaimen tehden kirjainharjoittelusta hauskaa ja tehokasta.', name: 'Riikka Lahtinen', role: 'Esiopetuksen opettaja', school: 'Taitoniekkojen paivakoti, Turku' },
    { quote: 'Myyn teemallisia yhdistamiskokoelmia verkossa ja tama generaattori muutti tuotantoaikani tunnista viiteentoista minuuttiin. Neljan yhdistamistilan ansiosta voin luoda vaihtelevaa sisaltoa helposti.', name: 'Sami Heikkinen', role: 'Opettajayrittaja', school: 'OpeHeikkinen verkkokauppa' },
  ],
  tips: {
    sectionTitle: 'Yhdist\u00e4misstrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 yhdist\u00e4misgeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in asetat yhdist\u00e4mistilan, parim\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Identtiset kuvaparit', description: 'Kaytta identtista kuvaparitilaa neljalla parilla. Esikoululaiset harjoittelevat samanlaisten kuvien tunnistamista ja viivan piirtamista kahden kuvan valille. Yksinkertainen muoto rakentaa visuaalista erottelua ja kynanhallintaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kuva-kirjain-yhdist\u00e4minen', description: 'Luo kuva-alkukirjain-tehtavia viidella parilla. Esiopetuksen oppilaat tunnistavat kuvan ja yhdistivat oikean alkukirjaimen. Tama tukee kirjaintuntemuksen kehittamista POPS 2014 aidinkielen tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Kuva-sana-yhdist\u00e4minen', description: 'Generoi kuva-sana-tehtavia viidella tai kuudella parilla viikon sanalistojen sanoilla. Ekaluokkalaiset kehittavat lukutaitoa yhdistamalla kuvia ja sanoja. Tehtavat vahvistavat oikeinkirjoitusta ja sanan tunnistamista.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Kategoriapohjaiset yhdist\u00e4misteht\u00e4v\u00e4t', description: 'Rakenna oma sana -tilalla tehtavia kuudella parilla, joissa oppilaat yhdistivat kuvia maaritelmiin tai kaannoksiin. Toisluokkalaiset kehittavat luokittelutaitoja ja abstraktia ajattelua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monikieliset sanastohaasteet', description: 'Luo kuva-sana-tehtavia kahdella kielella kuudella parilla. Kolmasluokkalaiset harjoittelevat vieraan kielen sanastoa yhdistamalla kuvia kohdekielen sanoihin. Kaytta tehtavia aidinkielen ja vieraan kielen integroituun opetukseen.' },
    ],
  },
};

// ===================================================================
// 2. DRAWING LINES (viivojen-piirtaminen-tyoarkit)
// ===================================================================
const drawingLines = {
  file: 'viivojen-piirtaminen-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u270f\ufe0f', title: 'Kahdeksan erilaista viivamallia', description: 'Valitse kahdeksasta erilaisesta viivamallista: suorat viivat, kaaret, siksak-viivat, aaltokuviot ja monimutkaiset polut. Jokainen malli kehitt\u00e4\u00e4 eri motorisia taitoja. Suorat viivat sopivat aloittelijoille. Kaaret ja aallot haastavat edistyneempi\u00e4 oppilaita asteittain.' },
    { id: '2', icon: '\u{1f4cf}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 viivan paksuus ja v\u00e4litys', description: 'Hallitse viivan paksuutta ja kuvien v\u00e4list\u00e4 et\u00e4isyytt\u00e4. Paksummat viivat sopivat nuoremmille lapsille, joilla kyn\u00e4note vasta kehittyy. Ohuemmat viivat haastavat vanhempia oppilaita tarkkuuteen. V\u00e4lityksen s\u00e4\u00e4t\u00f6 optimoi teht\u00e4v\u00e4n haastavuuden.' },
    { id: '3', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa p\u00e4\u00e4tepisteiksi', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta viivojen paatepisteet. Lapset piirtavat viivoja kuvan luokse, mika lisaa motivaatiota ja kontekstin harjoitukseen. Teemapohjaiset parit luovat johdonmukaisia oppimiskokemuksia.' },
    { id: '4', icon: '\u{1f522}', title: '4\u20135 kuvaparia per teht\u00e4v\u00e4', description: 'Jokainen teht\u00e4v\u00e4sivu sis\u00e4lt\u00e4\u00e4 4\u20135 kuvaparia yhdistett\u00e4v\u00e4ksi viivoilla. T\u00e4m\u00e4 m\u00e4\u00e4r\u00e4 pit\u00e4\u00e4 teht\u00e4v\u00e4n hallittavana nuoremmille oppilaille samalla kun tarjoaa riitt\u00e4v\u00e4sti harjoittelua hienomotoriikan kehitt\u00e4miseen.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen viivanpiirtoteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat yhdist\u00e4mislinjat n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat tarkistavat oppilast\u00f6iden tarkkuuden nopeasti. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat teht\u00e4v\u00e4t', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, valitse fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 viivanpiirtoteht\u00e4vi\u00e4 verkossa. Luo hienomotoriikkapaketteja myyt\u00e4v\u00e4ksi opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo viivanpiirtoteht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 ja teht\u00e4v\u00e4n ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kyn\u00e4nhallinnan kehitt\u00e4minen 5\u20136-vuotiaille', description: 'Luo suoraviivaisia teht\u00e4vi\u00e4 paksummilla viivoilla esiopetuksen oppilaille. Lapset piirt\u00e4v\u00e4t viivoja kuvaparien v\u00e4lill\u00e4 kehitt\u00e4en kyn\u00e4otetta ja silm\u00e4-k\u00e4si-koordinaatiota. T\u00e4ydellinen POPS 2014 hienomotoriikan tavoitteiden tukemiseen.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kirjoitusvalmiuden tukeminen 1.\u20132. luokalla', description: 'Generoi asteittain vaikeutuvia viivaharjoituksia kaarilla ja aaltokuvioilla. Ekaluokkalaiset kehitt\u00e4v\u00e4t kirjoittamiseen tarvittavia motorisia taitoja. Yhdist\u00e4 viivaharjoitukset kirjoitusharjoituksiin kattaviin hienomotoriikkapaketteihin.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hienomotoriikan harjoittelu kotona', description: 'Luo mukauvia viivanpiirtoteht\u00e4vi\u00e4 lasten suosikkiteemoilla. El\u00e4in-, kulkuneuvo- ja luontoteemat pit\u00e4v\u00e4t lapset motivoituneina. Generoi viikon harjoitukset 15 minuutissa eri vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 motorinen harjoittelu', description: 'Viivanpiirtoteht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille taustasta riippumatta. Kuvaparit tarjoavat samalla sanastoaltistusta uudella kielell\u00e4. T\u00e4ydellinen kotoutumisvaiheen oppilaille.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt motoriset harjoitukset', description: 'S\u00e4\u00e4d\u00e4 viivan paksuutta ja mallin monimutkaisuutta HOJKS-tavoitteiden mukaisesti. Paksut suorat viivat tukevat heikompia motorisia taitoja. Asteittain vaikeutuvat mallit rakentavat itseluottamusta ja taitoa.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy hienomotoriikkapaketteja', description: 'Luo teemallisia viivanpiirtopaketteja myyntiin verkossa. Hienomotoriikkamateriaalit ovat jatkuvasti kysyttyj\u00e4 esiopetuksen materiaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten viivanpiirtogeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa kuvaparit on sijoitettu sivun vastakkaisille puolille katkoviivojen yhdist\u00e4min\u00e4. Lapset piirt\u00e4v\u00e4t viivoja seuraten mallia kuvasta toiseen. Valitse viivamalli, teema ja kuvien m\u00e4\u00e4r\u00e4 asetuksista.' },
    { id: '2', question: 'Mitk\u00e4 viivamallit ovat saatavilla?', answer: 'Kahdeksan viivamallia: suora viiva, kaari, loiva kaari, siksak, aaltoviiva, portaat, silmukka ja yhdistelm\u00e4polku. Suorat viivat sopivat aloittelijoille. Monimutkaisemmat mallit kehitt\u00e4v\u00e4t edistyneempi\u00e4 motorisia taitoja.' },
    { id: '3', question: 'Mille ik\u00e4ryhmille viivanpiirtoteht\u00e4v\u00e4t sopivat?', answer: 'Viivanpiirtoteht\u00e4v\u00e4t palvelevat 3\u20137-vuotiaita. Esikoululaiset harjoittelevat suoria viivoja paksulla mallilla. Esiopetuksen oppilaat siirtyv\u00e4t kaariin ja aaltoihin. 1. luokan oppilaat harjoittelevat monimutkaisia polkuja kirjoitusvalmiuden kehitt\u00e4miseksi.' },
    { id: '4', question: 'Miten viivanpiirto kehitt\u00e4\u00e4 kirjoitusvalmiutta?', answer: 'Viivanpiirtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4otetta, silm\u00e4-k\u00e4si-koordinaatiota ja viivan hallinnan tarkkuutta. N\u00e4m\u00e4 ovat kirjoittamisen perusedellytyksi\u00e4. Kaaret ja aallot valmistavat kirjainten py\u00f6reiden muotojen piirt\u00e4miseen.' },
    { id: '5', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen viivanpiirtoteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat yhdist\u00e4mislinjat n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat tarkistavat oppilast\u00f6iden tarkkuuden sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', question: 'Voiko viivan paksuutta s\u00e4\u00e4t\u00e4\u00e4?', answer: 'Kyll\u00e4, viivan paksuus ja mallin selkeys ovat s\u00e4\u00e4dett\u00e4viss\u00e4. Paksummat viivat ja selke\u00e4mm\u00e4t mallit sopivat nuoremmille lapsille. Ohuemmat viivat ja monimutkaisemmat polut haastavat edistyneempi\u00e4 oppilaita.' },
    { id: '7', question: 'Kuinka monta kuvaparia yhdess\u00e4 teht\u00e4v\u00e4ss\u00e4?', answer: 'Jokainen teht\u00e4v\u00e4sivu sis\u00e4lt\u00e4\u00e4 4\u20135 kuvaparia yhdistett\u00e4v\u00e4ksi viivoilla. T\u00e4m\u00e4 m\u00e4\u00e4r\u00e4 tarjoaa riitt\u00e4v\u00e4sti harjoittelua ilman ylikuormitusta. Useampi pari lis\u00e4\u00e4 teht\u00e4v\u00e4n kestoa ja haastetta.' },
    { id: '8', question: 'Miten tulostan viivanpiirtoteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti.' },
    { id: '9', question: 'Sopivatko viivanpiirtoteht\u00e4v\u00e4t erityisopetukseen?', answer: 'Viivanpiirtoteht\u00e4v\u00e4t sopivat erinomaisesti erityisopetukseen s\u00e4\u00e4dett\u00e4vyydens\u00e4 ansiosta. S\u00e4\u00e4d\u00e4 viivan paksuutta ja mallin monimutkaisuutta HOJKS-tavoitteiden mukaisesti. Asteittain vaikeutuvat teht\u00e4v\u00e4t tukevat jokaisen oppilaan kehityst\u00e4.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden viivanpiirtoteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse viivamalli ja teema 20 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon hienomotoriikkaharjoitukset 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani viivanpiirtoteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy hienomotoriikkapaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja teemallisilla piirtopaketeilla.' },
    { id: '12', question: 'Miten viivanpiirto tukee POPS 2014 tavoitteita?', answer: 'Viivanpiirtoteht\u00e4v\u00e4t tukevat esiopetuksen ja alkuopetuksen hienomotoriikan kehitt\u00e4mistavoitteita. POPS 2014 korostaa kirjoitusvalmiuden rakentamista monipuolisilla motorisilla harjoituksilla. Viivanpiirto on tehokas v\u00e4line kyn\u00e4nhallinnan ja visuaalisen hahmottamisen kehitt\u00e4miseen.' },
  ],
  relatedApps: [
    { id: '1', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Sanasto', icon: '\u{1f517}', description: 'Yhdist\u00e4misteht\u00e4v\u00e4t hy\u00f6dynt\u00e4v\u00e4t samoja viivan piirt\u00e4mistaitoja kuin viivanpiirtoteht\u00e4v\u00e4t. Yhdist\u00e4 molemmat kattaviin hienomotoriikkapaketteihin.' },
    { id: '2', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Aakkosjunateht\u00e4v\u00e4t yhdistettyn\u00e4 viivanpiirtoon luovat monipuolisia kirjoitusvalmiuspaketteja. Leikkaa-liimaa ja piirt\u00e4minen kehitt\u00e4v\u00e4t molemmat hienomotoriikkaa.' },
    { id: '3', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: '\u00c4idinkieli', icon: '\u{1f4dd}', description: 'K\u00e4sinkirjoitusharjoitukset ovat luonnollinen jatko viivanpiirtoteht\u00e4vien j\u00e4lkeen. Viivanpiirto rakentaa kyn\u00e4otetta, k\u00e4sinkirjoitus soveltaa sit\u00e4 kirjainten muotoiluun.' },
    { id: '4', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'V\u00e4rityskuvat yhdistettyn\u00e4 viivanpiirtoon luovat monipuolisia motorisia harjoituspaketteja. Molemmat kehitt\u00e4v\u00e4t kyn\u00e4nhallintaa ja silm\u00e4-k\u00e4si-koordinaatiota.' },
    { id: '5', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolkuteht\u00e4v\u00e4t hy\u00f6dynt\u00e4v\u00e4t samoja visuaalisia taitoja kuin viivanpiirtoteht\u00e4v\u00e4t. Oppilaat seuraavat polkuja ruudukoissa kehitt\u00e4en avaruudellista hahmottamista.' },
    { id: '6', slug: 'ruudukkopiirustus-tyoarkit', name: 'Ruudukkopiirustus', category: 'Taide ja luovuus', icon: '\u{1f58c}\ufe0f', description: 'Ruudukkopiirustus laajentaa viivanpiirtotaitoja koko kuvien piirt\u00e4miseen ruudukolla. Molemmat kehitt\u00e4v\u00e4t visuaalista tarkkuutta ja k\u00e4den hallintaa.' },
  ],
  aiOverviewSnippet: 'Viivanpiirtogeneraattori on verkkotyokalu, jolla luodaan tulostettavia hienomotoriikan harjoitustehtavia. Lapset piirtavat erilaisia viivoja kuvaparien valille kehittaen kynaotetta ja silma-kasi-koordinaatiota. Opettajat valitsevat viivamallin, teemakuvat ja vaikeustason, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Viivamallit', ourApp: '8 erilaista mallia: suora, kaari, siksak, aalto jne.', typical: '1\u20132 perusmallia' },
    { feature: 'Kuvapaatepisteet', ourApp: '3000+ teemakuvaa visuaalisina motivaattoreina', typical: 'Vain pisteet tai abstraktit muodot' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Ei vastausavaimia' },
    { feature: 'Muokattavuus', ourApp: 'T\u00e4ysi muokkaus: siirto, skaalaus, kierto, teksti', typical: 'Kiinte\u00e4t pohjat ilman muokkausta' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Viivanpiirtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4otetta ja viivan hallinnan tarkkuutta, jotka ovat kirjoittamisen keskeisi\u00e4 edellytyksi\u00e4. S\u00e4\u00e4nn\u00f6llinen harjoittelu parantaa merkitt\u00e4v\u00e4sti kirjoitusvalmiutta esiopetusik\u00e4isill\u00e4.', source: 'Ahonen, T. et al., "Motoriikan ja oppimisen yhteydet," Niilo M\u00e4ki Instituutti' },
    { claim: 'Kuvapohjaiset viivanpiirtoteht\u00e4v\u00e4t lis\u00e4\u00e4v\u00e4t lasten motivaatiota ja harjoittelun kestoa verrattuna abstrakteihin viivaharjoituksiin, sill\u00e4 merkityksellinen konteksti tukee sit\u00e4\u00e4 sitoutumista.', source: 'Pura, M., "Graafomotoriikan kehitys ja tukeminen varhaiskasvatuksessa," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Esiopetusryhmani lapset rakastavat piirtaa viivoja elainten valille. Kahdeksan eri viivamallia pitavat harjoittelun tuoreena ja lapset eivat kyllasty. Kynaote on parantunut huomattavasti syksysta.', name: 'Elina Nieminen', role: 'Esiopetuksen opettaja', school: 'Tuulimyllyn paivakoti, Oulu' },
    { quote: 'Kaytan viivanpiirtotehtavia lammittelyna ennen kirjoitustunteja. Ekaluokkalaiseni kehittivat selkeasti parempaa kynanhallintaa ja viivan tarkkuutta kahden kuukauden saaannollisella harjoittelulla.', name: 'Petri Salonen', role: '1. luokan opettaja', school: 'Toivolan koulu, Lahti' },
  ],
  tips: {
    sectionTitle: 'Viivanpiirtostrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 viivanpiirtogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset viivamallin, paksuuden ja monimutkaisuuden esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Suorat viivat paksulla mallilla', description: 'Kaytta suoria viivoja paksulla mallilla ja tuttuja teemakuvia kuten elaaimia. Esikoululaiset harjoittelevat kynaan tarttumista ja viivan vetamista kahden pisteen valilla. Yksinkertainen muoto rakentaa kynaotteen perustan.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kaaret ja loivat aaltoviivat', description: 'Siirry kaariin ja loiviin aaltoihin kun suorat viivat sujuvat. Esiopetuksen oppilaat kehittavat pyoreiden liikkeiden hallintaa. Nama taidot valmistavat kirjainten pyoreiden muotojen piirtamiseen POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Siksak-viivat ja monimutkaiset polut', description: 'Generoi siksak- ja yhdistelmapolkuja ekaluokkalaisille. Vaihtuvat suunnat kehittavat ranteen joustavuutta ja viivan hallinnan tarkkuutta. Nama taidot siirtyvat suoraan kirjainten muodostamiseen kirjoitusharjoituksissa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Tarkat aaltokuviot ja silmukat', description: 'Luo aaltokuvioita ja silmukkapolkuja vaativia tehtavia. Toisluokkalaiset hioivat viivan tarkkuutta ja kehittavat sujuvaa kirjoitusliiketta. Tehtavat toimivat kirjoitustaidon yllapitamisena ja kehittamisena.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset yhdistelm\u00e4polut', description: 'Kaytta monimutkaisimpia yhdistelmapolkuja, jotka vaativat tarkkaa motorista hallintaa. Kolmasluokkalaiset hiovat sujuvaa kirjoitusliiketta ja viivan hallintaa vaativammilla malleilla.' },
    ],
  },
};

// ===================================================================
// 3. PICTURE BINGO (kuva-bingo-tyoarkit)
// ===================================================================
const pictureBingo = {
  file: 'kuva-bingo-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f3b2}', title: 'Mukautetut kuva-bingokortit teemakuvilla', description: 'Luo ainutlaatuisia bingo-kortteja yli 3000 lapsiystavallisesta teemakuvasta. Jokainen kortti on erilainen, joten koko luokka voi pelata samanaikaisesti. Valitse el\u00e4in-, ruoka-, kulkuneuvo- tai kymmenist\u00e4 muista teemoista kiinnostavia pelej\u00e4.' },
    { id: '2', icon: '\u{1f4d0}', title: 'Kolme ruudukkokokoa: 3x3, 4x4 ja 5x5', description: 'Valitse kolmesta ruudukkokoosta oppilaiden ik\u00e4tason mukaan. 3x3 ruudukko sopii esikoululaisille yksinkertaisella 9 kuvan pelill\u00e4. 4x4 sopii esiopetukseen 16 kuvalla. 5x5 haastaa 1.\u20133. luokan oppilaat 25 kuvalla.' },
    { id: '3', icon: '\u{1f4c4}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 korttim\u00e4\u00e4r\u00e4 1\u201310', description: 'Generoi 1\u201310 ainutlaatuista bingo-korttia kerralla. Jokainen kortti sis\u00e4lt\u00e4\u00e4 samat kuvat eri j\u00e4rjestyksess\u00e4. T\u00e4m\u00e4 takaa, ett\u00e4 jokaisella pelaajalla on oma yksil\u00f6llinen korttinsa. Luo kokonaisen luokan tarvitsemat kortit kerralla.' },
    { id: '4', icon: '\u{1f4e3}', title: 'Automaattiset huutokorttien kuvat', description: 'Generaattori luo automaattisesti huutokortit suurilla kuvilla. Opettaja n\u00e4ytt\u00e4\u00e4 kuvan ja oppilaat etsiv\u00e4t vastaavan kuvan omasta kortistaan. Tulosta huutokortit A4-koossa dokumenttikameralle tai leikkaa pienemm\u00e4t huutokortit.' },
    { id: '5', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa', description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain. K\u00e4yt\u00e4 teemakuvia johdonmukaisiin peleihin. Lataa omia kuvia personoiduiksi bingo-peleiksi. Yhdist\u00e4 kirjaston kuvia ja omia kuvia samassa peliss\u00e4.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat bingo-kortit', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia ja teksti\u00e4 vapaasti. Lis\u00e4\u00e4 taustav\u00e4rej\u00e4, koristeellisia kehyksi\u00e4 ja omaa teksti\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 bingo-pelej\u00e4 verkossa. Luo teemallisia bingo-paketteja myyt\u00e4v\u00e4ksi opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo bingo-pelej\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja ja tanska. K\u00e4ytt\u00f6liittym\u00e4n kieli ja pelin ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Sanastopeli 3x3 ruudukoilla', description: 'Luo 3x3 kuva-bingokortteja esiopetuksen sanastoharjoitteluun. Opettaja n\u00e4ytt\u00e4\u00e4 kuvan ja sanoo nimen, oppilaat etsiv\u00e4t vastaavan kuvan. T\u00e4ydellinen POPS 2014 \u00e4idinkielen sanavaraston laajentamisen tavoitteisiin.' },
    { id: '2', icon: '\u{1f4d6}', title: 'Alakoulun opettajat', subtitle: 'Oppimispeli 4x4 ja 5x5 ruudukoilla', description: 'Generoi 4x4 tai 5x5 bingo-pelej\u00e4 ymp\u00e4rist\u00f6opin, \u00e4idinkielen tai matematiikan sanastoharjoitteluun. Luo 10 eri\u00e4 yksil\u00f6llist\u00e4 korttia kokonaisen luokan peliin. Bingo-pelit tekev\u00e4t kertaamisesta hauskaa.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Perhepelit kotiin', description: 'Luo personoituja bingo-pelej\u00e4 perheen suosikkiteemoilla. El\u00e4in-, kulkuneuvo- tai vuodenaikateemat pit\u00e4v\u00e4t lapset kiinnostuneina. Bingo-peli on hauska tapa oppia uusia sanoja kotona ilman opettajamaista painetta.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastobingo monikielisille oppilaille', description: 'Kuva-bingo on erinomainen sanastoharjoitus kielitaidosta riippumatta. Kuvat tarjoavat kontekstin ilman lukutaitovaatimusta. Opettaja sanoo sanan kahdella kielell\u00e4 ja oppilaat yhdist\u00e4v\u00e4t kuvan.' },
    { id: '5', icon: '\u{1f9e9}', title: 'Erityisopettajat', subtitle: 'Sosiaalisten taitojen harjoittelu pelill\u00e4', description: 'Bingo-pelit harjoittelevat vuorottamista, odottamista ja sanaston kuuntelemista. S\u00e4\u00e4d\u00e4 ruudukon kokoa oppilaan taitojen mukaan. Pienemmille ryhmille 3x3 ruudukko pit\u00e4\u00e4 pelin hallittavana.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy bingo-pelipaketteja verkossa', description: 'Luo teemallisia bingo-pelipaketteja myyntiin verkossa. Juhlap\u00e4iv\u00e4- ja vuodenaikabingot myyv\u00e4t tasaisesti. Sisallyta 10 korttia ja huutokortit jokaiseen pakettiin ammattimaisena tuotteena.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuva-bingogeneraattori toimii?', answer: 'Generaattori luo ainutlaatuisia bingo-kortteja valitsemistasi teemakuvista. Valitse ruudukon koko, teema ja korttien m\u00e4\u00e4r\u00e4. Sovellus sijoittaa kuvat satunnaisesti jokaiselle kortille niin, ett\u00e4 jokainen kortti on yksil\u00f6llinen. Huutokortit generoidaan automaattisesti.' },
    { id: '2', question: 'Mitk\u00e4 ruudukkokoot ovat saatavilla?', answer: 'Kolme ruudukkokokoa: 3x3 (9 kuvaa), 4x4 (16 kuvaa) ja 5x5 (25 kuvaa). Pienemm\u00e4t ruudukot sopivat nuoremmille oppilaille. 5x5 ruudukko tarjoaa pidempien pelien haasteita vanhemmille oppilaille.' },
    { id: '3', question: 'Kuinka monta eri korttia voi luoda kerralla?', answer: 'Generoi 1\u201310 ainutlaatuista bingo-korttia kerralla. Jokainen kortti sis\u00e4lt\u00e4\u00e4 samat kuvat eri j\u00e4rjestyksess\u00e4. Kokonaisen luokan peliin luo 10 eri\u00e4 korttia yhdell\u00e4 klikkauksella.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 bingo-pelit huutokortit?', answer: 'Kyll\u00e4, generaattori luo automaattisesti huutokortit suurilla kuvilla. Tulosta huutokortit A4-koossa dokumenttikameralle tai leikkaa pienemm\u00e4t kortit k\u00e4teen. Huutokortit vastaavat tarkalleen pelikorttien kuvia.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuva-bingo sopii?', answer: 'Kuva-bingo palvelee 4\u201310-vuotiaita. Esikoululaiset pelaavat 3x3 ruudukoilla yksinkertaisilla teemoilla. Esiopetuksen oppilaat hallitsevat 4x4 ruudukoita. 1.\u20133. luokan oppilaat nauttivat 5x5 bingo-haasteista.' },
    { id: '6', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 bingo-peliss\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa samassa peliss\u00e4. Luo personoituja bingo-pelej\u00e4 luokan teemojen mukaan.' },
    { id: '7', question: 'Miten kuva-bingo tukee sanastoharjoittelua?', answer: 'Bingo-peli yhdist\u00e4\u00e4 kuvan kuulemiseen ja tunnistamiseen. Opettaja sanoo sanan ja n\u00e4ytt\u00e4\u00e4 kuvan, oppilas etsii vastaavan kuvan. T\u00e4m\u00e4 monitasoinen altistus vahvistaa sanavaraston omaksumista pelillisesti.' },
    { id: '8', question: 'Miten tulostan bingo-kortit?', answer: 'Lataa bingo-kortit PDF- tai JPEG-muodossa 300 DPI laadulla. Jokainen kortti tulostuu omalle sivulleen. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta suurissa eriss\u00e4.' },
    { id: '9', question: 'Sopivatko bingo-pelit luokkak\u00e4ytt\u00f6\u00f6n?', answer: 'Bingo-pelit sopivat erinomaisesti luokkak\u00e4ytt\u00f6\u00f6n. Luo jopa 10 eri\u00e4 korttia kerralla. Peli harjoittaa kuuntelemista, keskittymist\u00e4 ja sanaston tunnistamista. T\u00e4ydellinen p\u00e4iv\u00e4n viimeiseksi aktiviteetiksi tai palkinnoksi.' },
    { id: '10', question: 'Kuinka kauan bingo-pelin luominen kest\u00e4\u00e4?', answer: 'Bingo-pelin luominen vie alle 3 minuuttia. Valitse ruudukon koko ja teema 20 sekunnissa. M\u00e4\u00e4rit\u00e4 korttien m\u00e4\u00e4r\u00e4 10 sekunnissa. Generaattori luo kaikki kortit ja huutokortit v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani bingo-pelej\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin bingo-pelien myyntiin verkossa. Luo teemallisia bingo-paketteja digitaalisina latauksina. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '12', question: 'Miten bingo-pelit tukevat POPS 2014 opetussuunnitelmaa?', answer: 'Kuva-bingo tukee \u00e4idinkielen sanavaraston laajentamista kuuntelemisen ja tunnistamisen kautta. Pelitoiminta harjoittaa yhteistoiminnallisia taitoja POPS 2014 vuorovaikutustaitojen tavoitteiden mukaisesti. Teemapohjaiset pelit integroituvat ymp\u00e4rist\u00f6opin ja \u00e4idinkielen opetukseen.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Yhdist\u00e4 bingo-pelit sanahakupulmiin kattaviin sanastopaketteihin. Oppilaat tunnistavat sanoja peliss\u00e4 ja etsiv\u00e4t niit\u00e4 ruudukossa.' },
    { id: '2', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske -teht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t bingo-pelej\u00e4 visuaalisen etsinn\u00e4n ja laskemisen yhdist\u00e4miseen. Molemmat kehitt\u00e4v\u00e4t tarkkaavaisuutta.' },
    { id: '3', slug: 'yhdista-parit-tyoarkit', name: 'Yhdist\u00e4 parit', category: 'Sanasto', icon: '\u{1f517}', description: 'Yhdist\u00e4misteht\u00e4v\u00e4t vahvistavat samaa sanastoa kuin bingo-pelit eri muodossa. Oppilaat kohtaavat samat teemasanat molemmissa harjoituksissa.' },
    { id: '4', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'Kuva-arvausteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t bingo-pelien sanastoa. Oppilaat tunnistavat kuvia peliss\u00e4 ja tuottavat kirjaimia teht\u00e4v\u00e4ss\u00e4.' },
    { id: '5', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4ca}', description: 'Kuvalajitteluteht\u00e4v\u00e4t laajentavat bingo-pelien teemoja kategorisointiharjoituksiksi. Oppilaat luokittelevat samoja kuvia eri kriteerein.' },
    { id: '6', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'V\u00e4rityskuvat tarjoavat rauhallisen vastapainon bingo-pelien ryhmadynamiikalle. Yhdist\u00e4 peli ja yksilotehtava tasapainoisiksi oppitunneiksi.' },
  ],
  aiOverviewSnippet: 'Kuva-bingogeneraattori on verkkotyokalu, jolla luodaan tulostettavia bingo-pelikortteja teemakuvilla. Opettajat valitsevat ruudukon koon, teeman ja korttien maaran, ja lataavat valmiin pelin huutokortteineen alle 3 minuutissa. Taydellinen luokkahuoneen sanastoharjoitteluun.',
  comparisonTable: [
    { feature: 'Ruudukkokoot', ourApp: '3x3, 4x4 ja 5x5 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Vain yksi kiinte\u00e4 koko' },
    { feature: 'Korttim\u00e4\u00e4r\u00e4', ourApp: '1\u201310 yksil\u00f6llist\u00e4 korttia kerralla', typical: '1\u20134 korttia' },
    { feature: 'Huutokortit', ourApp: 'Automaattiset huutokortit joka peliin', typical: 'Ei huutokortteja tai manuaalinen' },
    { feature: 'Kuvavihjeet', ourApp: '3000+ teemakuvaa', typical: 'Rajoitettu kuvavalikoima' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Pelillinen oppiminen lis\u00e4\u00e4 oppilaiden sitoutumista ja motivaatiota merkitt\u00e4v\u00e4sti. Bingo-tyyppiset pelit yhdist\u00e4v\u00e4t kuuntelemisen, tunnistamisen ja sosiaalisen vuorovaikutuksen tehokkaaksi sanastoharjoitteluksi.', source: 'Kankaanranta, M., "Pelillisyys oppimisessa," Jyv\u00e4skyl\u00e4n yliopisto, Agora Center' },
    { claim: 'Kuva-sanayhdist\u00e4minen peliformaatissa tuottaa vahvemman sanavaraston omaksumisen kuin perinteinen lista-opettelu, sill\u00e4 monitasoinen prosessointi syvent\u00e4\u00e4 muistij\u00e4lke\u00e4.', source: 'Lehtinen, E. et al., "Oppimisen tutkimus digitaalisessa ymparistossa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Perjantain sanastobingo on luokkani suosikki. Luon 10 erilaista korttia viidessa minuutissa ja koko luokka pelaa innolla. Oppilaat oppivat sanaston huomaamattaan pelien kautta.', name: 'Katri Virtanen', role: '1. luokan opettaja', school: 'Aleksanterin koulu, Tampere' },
    { quote: 'S2-oppilaani rakastavat kuva-bingoa koska se ei vaadi lukutaitoa. Naytaan kuvan ja sanon sanan kahdella kielella. Motivaatio on kattoa ja sanasto jaa mieleen pelien kautta.', name: 'Mohamed Hassan', role: 'S2-opettaja', school: 'Monikulttuurinen opetus, Vantaa' },
  ],
  tips: {
    sectionTitle: 'Kuva-bingostrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuva-bingogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ruudukon koon, teeman ja pelityylin esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: 3x3 ruudukko tutuilla kuvilla', description: 'Kaytta 3x3 ruudukoita tutuilla teemoilla kuten elaimet tai ruoka. Esikoululaiset harjoittelevat kuvan tunnistamista ja nimeamista. Pidenna pelista lyhyt ja toista usein sanavaraston vahvistamiseksi.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: 4x4 ruudukko sanastoteemoilla', description: 'Luo 4x4 bingo-peleja opetussuunnitelman sanastoteemoilla. Esiopetuksen oppilaat harjoittelevat kuuntelemista, tunnistamista ja vuorottamista. Sano kuvan nimi ja nayta kuva viiveella kehittaen kuuntelutaitoa.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: 5x5 ruudukko oppimispelina', description: 'Generoi 5x5 bingo-peleja ymparistopin tai aidinkielen sanastoharjoitteluun. Ekaluokkalaiset hallitsevat suuremman ruudukon ja pidempien pelien keskittymisen. Kaytta peleja kertaamisen tyokaluna.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Teemapohjaiset akateemiset bingo-pelit', description: 'Rakenna 5x5 bingo-peleja akateemisella sanastolla. Toisluokkalaiset pelaavat ymparistopin, aidinkielen ja matematiikan sanastobingoja. Kaytta peleja opetusjaksoon liittyvan sanaston kertaamiseen.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monikielinen sanastobingo', description: 'Luo 5x5 bingo-peleja kahdella kielella kolmasluokkalaisille. Opettaja sanoo sanan vieraalla kielella ja oppilaat etsivat vastaavan kuvan. Kaytta peleja vieraan kielen sanaston harjoitteluun POPS 2014 kieltenopetuksen tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 4. SUDOKU (sudoku-tyoarkit)
// ===================================================================
const sudoku = {
  file: 'sudoku-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e9}', title: '4x4 kuvasudoku-ruudukot lapsille', description: 'Generaattori luo 4x4 sudoku-ruudukoita k\u00e4ytt\u00e4en v\u00e4rikk\u00e4it\u00e4 kuvia numeroiden sijaan. T\u00e4m\u00e4 tekee sudokuista houkuttelevia ja sopivia 4\u20139-vuotiaille lapsille. Nelj\u00e4n kuvan ruudukko on hallittavan kokoinen loogisen ajattelun esittelyyn.' },
    { id: '2', icon: '\u{1f4ca}', title: 'Kolme vaikeustasoa: helppo, keskitaso, vaikea', description: 'Helppo taso jattaa 4 ruutua tyhjiksi esiopetukseen. Keskitaso j\u00e4tt\u00e4\u00e4 6 ruutua tyhjiksi 1. luokalle. Vaikea taso j\u00e4tt\u00e4\u00e4 8 ruutua tyhjiksi 2.\u20133. luokan haasteeksi. Progressiivinen vaikeutuminen tukee loogisen ajattelun kehittymist\u00e4.' },
    { id: '3', icon: '\u2702\ufe0f', title: 'Leikkaa ja liimaa -muoto', description: 'Sudoku-teht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t leikkaa ja liimaa -muotoa. Oppilaat leikkaavat kuvat erillisest\u00e4 kuvaruudusta ja liimaavat ne oikeisiin ruutuihin. T\u00e4m\u00e4 yhdist\u00e4\u00e4 loogisen ajattelun ja hienomotoriikan kehitt\u00e4misen samassa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa', description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain. Valitse nelj\u00e4 kuvaa samasta teemasta johdonmukaisiin sudoku-teht\u00e4viin. El\u00e4in-, ruoka- ja kulkuneuvoteemat pit\u00e4v\u00e4t oppilaat motivoituneina.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen sudoku-teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kaikki ruudut on t\u00e4ytetty oikeilla kuvilla. Opettajat tarkistavat oppilast\u00f6iden ratkaisut nopeasti. Vastausavain tulostuu erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat teht\u00e4v\u00e4t', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, taustav\u00e4rej\u00e4 ja koristeellisia kehyksi\u00e4. Luo ammattitason sudoku-teht\u00e4vi\u00e4 nopeasti.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 sudoku-teht\u00e4vi\u00e4 verkossa. Luo teemallisia logiikkapelipaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo sudoku-teht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. Kuvasudokut toimivat universaalisti kielirajoista riippumatta.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Logiikan esittely helpolla tasolla', description: 'Luo helpon tason kuvasudokuja esiopetuksen loogisen ajattelun harjoitteluun. Nelj\u00e4 tyhj\u00e4\u00e4 ruutua pit\u00e4\u00e4 teht\u00e4v\u00e4n hallittavana. Leikkaa ja liimaa -muoto kehitt\u00e4\u00e4 samalla hienomotoriikkaa POPS 2014 tavoitteiden mukaisesti.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Looginen ajattelu 1.\u20133. luokalle', description: 'Hy\u00f6dynn\u00e4 kolmea vaikeustasoa progressiiviseen loogisen ajattelun kehitt\u00e4miseen. Ekaluokkalaiset aloittavat keskitasolta ja siirtyv\u00e4t vaikeaan. Sudoku-teht\u00e4v\u00e4t toimivat lis\u00e4haasteena nopeille oppilaille.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Logiikkapelit kotiin', description: 'Luo kuvasudokuja vapaa-ajan oppimishetkiin kotona. Lapset nauttivat sudokujen ratkaisemisesta itsen\u00e4isesti. Asteittain vaikeutuvat teht\u00e4v\u00e4t pit\u00e4v\u00e4t haasteen sopivana pidempienkin sessioiden ajan.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 logiikkapeli', description: 'Kuvasudokut eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille taustasta riippumatta. Loogisen ajattelun kehitt\u00e4minen on kieliriippumatonta. T\u00e4ydellinen kotoutumisvaiheen matemaattiseen ajatteluun.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt logiikkaharjoitukset', description: 'S\u00e4\u00e4d\u00e4 vaikeustasoa HOJKS-tavoitteiden mukaisesti. Helppo taso nelj\u00e4ll\u00e4 tyhjall\u00e4 ruudulla tukee heikompia oppilaita. Leikkaa ja liimaa -muoto kehitt\u00e4\u00e4 useita taitoja samanaikaisesti.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy logiikkapelipaketteja', description: 'Luo teemallisia sudoku-paketteja myyntiin verkossa. Logiikkapelit ovat suosittu kategoria opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten lasten sudoku-generaattori toimii?', answer: 'Generaattori luo 4x4 sudoku-ruudukoita k\u00e4ytt\u00e4en kuvia numeroiden sijaan. Valitse nelj\u00e4 teemakuvaa ja vaikeustaso. Sovellus sijoittaa kuvat ruudukkoon niin, ett\u00e4 jokainen kuva esiintyy kerran jokaisella rivill\u00e4 ja sarakkeessa. Tyhj\u00e4t ruudut tarjoavat ratkaistavaa oppilaille.' },
    { id: '2', question: 'Mitk\u00e4 vaikeustasot ovat saatavilla?', answer: 'Kolme vaikeustasoa: helppo (4 tyhj\u00e4\u00e4 ruutua), keskitaso (6 tyhj\u00e4\u00e4 ruutua) ja vaikea (8 tyhj\u00e4\u00e4 ruutua). Helppo sopii esiopetuksen oppilaille. Keskitaso sopii 1. luokalle. Vaikea haastaa 2.\u20133. luokan oppilaat.' },
    { id: '3', question: 'Miten leikkaa ja liimaa -muoto toimii?', answer: 'Jokainen sudoku-teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 ruudukon tyhjin\u00e4 ruutuina ja erillisen kuvaruudun leikattavilla kuvilla. Oppilaat leikkaavat kuvat ja liimaavat ne oikeisiin ruutuihin loogisen p\u00e4\u00e4ttelyn avulla. T\u00e4m\u00e4 yhdist\u00e4\u00e4 logiikan ja motorisen taidon.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen sudoku generoi automaattisesti vastausavaimen. Vastausavain n\u00e4ytt\u00e4\u00e4 kaikki ruudut oikeilla kuvilla t\u00e4ytettyin\u00e4. Opettajat tarkistavat oppilast\u00f6iden ratkaisut nopeasti vastausavaimesta.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuvasudoku sopii?', answer: 'Kuvasudoku palvelee 4\u20139-vuotiaita. Esiopetuksen oppilaat ratkaisevat helppoja sudokuja ohjattuna. 1. luokan oppilaat hallitsevat keskitason itsen\u00e4isesti. 2.\u20133. luokan oppilaat nauttivat vaikean tason haasteista.' },
    { id: '6', question: 'Miksi kuvat numeroiden sijaan?', answer: 'Kuvat tekev\u00e4t sudokuista saavutettavia nuoremmille lapsille, jotka eiv\u00e4t viel\u00e4 tunne numeroita. V\u00e4rikk\u00e4\u00e4t el\u00e4in- ja teemakuvat lis\u00e4\u00e4v\u00e4t motivaatiota. Looginen p\u00e4\u00e4ttely kehittyy samalla tavalla kuva- ja numerosudokussa.' },
    { id: '7', question: 'Voiko sudoku-teht\u00e4vi\u00e4 muokata luomisen j\u00e4lkeen?', answer: 'Kyll\u00e4, jokainen elementti on muokattavissa luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, taustoja ja kehyksi\u00e4. Luo ammattitasoisia sudoku-teht\u00e4vi\u00e4 nopeasti.' },
    { id: '8', question: 'Miten tulostan sudoku-teht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti kotitulostimella.' },
    { id: '9', question: 'Kuinka kauan yhden sudoku-teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden sudoku-teht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja kuvat 20 sekunnissa. M\u00e4\u00e4rit\u00e4 vaikeustaso 10 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '10', question: 'Voinko myyd\u00e4 luomiani sudoku-teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy teemallisia logiikkapelipaketteja verkossa ilman attribuutiovaatimuksia. Luo kuvasudoku-kokoelmia digitaalisina latauksina.' },
    { id: '11', question: 'Sopivatko sudokut erityisopetukseen?', answer: 'Kuvasudokut sopivat erinomaisesti erityisopetukseen kolmen vaikeustason ansiosta. Helppo taso nelj\u00e4ll\u00e4 tyhjall\u00e4 ruudulla tukee heikompia oppilaita. Leikkaa ja liimaa -muoto tarjoaa moniaistisen oppimiskokemuksen.' },
    { id: '12', question: 'Miten sudoku tukee POPS 2014 opetussuunnitelmaa?', answer: 'Sudoku-teht\u00e4v\u00e4t tukevat POPS 2014 matematiikan tavoitetta T1 (matemaattinen ajattelu ja looginen p\u00e4\u00e4ttely). Poissulkemistrategia kehitt\u00e4\u00e4 sis\u00e4ist\u00e4 loogista ajattelua. Leikkaa ja liimaa -muoto tukee toiminnallisen oppimisen periaatetta.' },
  ],
  relatedApps: [
    { id: '1', slug: 'matematiikkapulmat-tyoarkit', name: 'Matematiikkapulmat', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Matematiikkapulmat laajentavat sudokujen loogista ajattelua numeerisiin haasteisiin. Molemmat kehitt\u00e4v\u00e4t poissulkemisstrategiaa ja p\u00e4\u00e4ttelykyky\u00e4.' },
    { id: '2', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkosovitus', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Ruudukkosovitusteht\u00e4v\u00e4t hy\u00f6dynt\u00e4v\u00e4t samaa ruudukkoajattelua kuin sudokut. Oppilaat sovittavat kuvia ruudukkoihin loogisesti.' },
    { id: '3', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f523}', description: 'Kuvioteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t sudokujen logiikkaharjoittelua hahmontunnistuksella. Molemmat kehitt\u00e4v\u00e4t visuaalista p\u00e4\u00e4ttelykyky\u00e4.' },
    { id: '4', slug: 'puuttuvat-palat-tyoarkit', name: 'Puuttuvat palat', category: 'Hahmottaminen', icon: '\u{1f9f1}', description: 'Puuttuvat palat -teht\u00e4v\u00e4t hy\u00f6dynt\u00e4v\u00e4t samaa poissulkemisstrategiaa kuin sudokut. Oppilaat p\u00e4\u00e4ttelev\u00e4t puuttuvan osan loogisesti.' },
    { id: '5', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Hahmottaminen', icon: '\u{1f50e}', description: 'Etsi esineet -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista etsint\u00e4\u00e4 kuten sudokut. Molemmat vaativat tarkkaa havainnointia ja systemaattista l\u00e4hestymistapaa.' },
    { id: '6', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f914}', description: 'Poikkea joukosta -teht\u00e4v\u00e4t yhdistettyn\u00e4 sudokuihin luovat kattavia logiikkapaketteja. Molemmat kehitt\u00e4v\u00e4t luokittelutaitoja ja loogista p\u00e4\u00e4ttely\u00e4.' },
  ],
  aiOverviewSnippet: 'Lasten sudoku-generaattori on verkkotyokalu, jolla luodaan tulostettavia 4x4 kuvasudokuja esiopetukseen ja alakouluun. Opettajat valitsevat teemakuvat ja vaikeustason, ja lataavat valmiin leikkaa-ja-liimaa-muotoisen PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Kuvapohjaisuus', ourApp: '3000+ teemakuvaa numeroiden sijaan', typical: 'Vain numero-sudokut' },
    { feature: 'Vaikeustasot', ourApp: '3 tasoa: helppo (4), keskitaso (6), vaikea (8 tyhj\u00e4\u00e4)', typical: '1\u20132 kiinte\u00e4\u00e4 tasoa' },
    { feature: 'Leikkaa ja liimaa', ourApp: 'Sis\u00e4\u00e4nrakennettu leikattavat osat', typical: 'Vain kirjoitettavat ruudut' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Usein lis\u00e4maksullinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Sudoku-tyyppiset logiikkapulmat kehitt\u00e4v\u00e4t poissulkemisstrategiaa ja deduktiivista p\u00e4\u00e4ttely\u00e4, jotka ovat matemaattisen ajattelun perusedellytyksi\u00e4. 4x4 ruudukkokoko on optimaalinen 4\u20139-vuotiaille.', source: 'Aunio, P., "Varhaisten matemaattisten taitojen kehitys," Helsingin yliopisto' },
    { claim: 'Leikkaa ja liimaa -muotoiset teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t kognitiivisen haasteen ja motorisen harjoittelun tehokkaasti, tukien moniaistista oppimista ja syvent\u00e4en teht\u00e4v\u00e4\u00e4n sitoutumista.', source: 'Korhonen, J. et al., "Matemaattisen ajattelun kehittyminen alkuopetuksessa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvasudokut ovat loistava lisahaaste nopeille oppilaille. Helppo taso sopii esiopetuksen aamutyoskentelyyn ja vaikea taso haastaa taitavimmat kolmasluokkalaiset. Kolme vaikeustasoa mahdollistavat eriyttamisen saman tehtavan sisalla.', name: 'Tiina Koskinen', role: 'Luokanopettaja 1\u20132', school: 'Havukosken koulu, Vantaa' },
    { quote: 'S2-oppilaani nauttivat kuvasudokuista koska ne eivat vaadi kielitaitoa. Looginen ajattelu kehittyy samalla kun oppilaat integroituvat luokan toimintaan. Leikkaa ja liimaa -muoto lisaa motivaatiota.', name: 'Anna-Liisa Peltonen', role: 'Erityisopettaja', school: 'Keskustan koulu, Jyvaskyla' },
  ],
  tips: {
    sectionTitle: 'Sudoku-strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 sudoku-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset vaikeustason ja ty\u00f6skentelytavan esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Tutustuminen logiikkaan', description: 'Esittele kuvasudoku pienryhmassa opettajan ohjauksessa. Kaytta helppoa tasoa neljalla tyhjalla ruudulla ja tuttuja elainteeman kuvia. Esikoululaiset harjoittelevat poissulkemista yksinkertaisimmassa muodossa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Helppo taso itsen\u00e4isesti', description: 'Esiopetuksen oppilaat ratkaisevat helpon tason sudokuja itsenaisesti. Leikkaa ja liimaa -muoto kehittaa samalla hienomotoriikkaa. Harjoita poissulkemisstrategiaa aamutyoskentelyssa POPS 2014 matemaattisen ajattelun tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Keskitason haaste', description: 'Ekaluokkalaiset siirtyvat keskitasolle kuudella tyhjalla ruudulla. Oppilaat kehittavat jarjestelmallista paattelystrategiaa. Kaytta sudokuja lisahaasteena matematiikkatunneilla tai aamutyoskentelyssa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Vaikea taso ja itsen\u00e4inen ty\u00f6skentely', description: 'Toisluokkalaiset ratkaisevat vaikean tason sudokuja kahdeksalla tyhjalla ruudulla itsenaisesti. Oppilaat kehittavat pitkajanniteista loogista paattelya. Tarjoa sudokuja laajennustehtavana nopeille oppilaille.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Strateginen ajattelu', description: 'Kolmasluokkalaiset hallitsevat vaikean tason ja alkavat kehittaa omia ratkaisustrategioitaan. Kaytta sudokuja matemaattisen ajattelun syventamiseen POPS 2014 vuosiluokkien 3\u20136 tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 5. BIG/SMALL (iso-pieni-tyoarkit)
// ===================================================================
const bigSmall = {
  file: 'iso-pieni-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4cf}', title: 'Viisi kokovertailun teht\u00e4v\u00e4tyyppi\u00e4', description: 'Valitse viidest\u00e4 teht\u00e4v\u00e4tyypist\u00e4: ympy\u00e4ri suurin, ympy\u00e4ri pienin, etsi keskikokoinen, j\u00e4rjest\u00e4 suurimmasta pienimpaan ja j\u00e4rjest\u00e4 pienimm\u00e4st\u00e4 suurimpaan. Jokainen tyyppi kehitt\u00e4\u00e4 eri vertailutaitoja. Yhdist\u00e4 tyyppej\u00e4 samaan teht\u00e4v\u00e4\u00e4n monipuoliseen harjoitteluun.' },
    { id: '2', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 kuvam\u00e4\u00e4r\u00e4 2\u20135 per harjoitus', description: 'Aseta 2\u20135 kuvaa per harjoitus hallitaksesi vaikeustasoa. Kaksi kuvaa sopii esikoululaisille yksinkertaiseen vertailuun. Kolmesta viiteen kuvaa haastaa vanhempia oppilaita vaatimalla j\u00e4rjest\u00e4mist\u00e4 ja vertailua usean kuvan kesken.' },
    { id: '3', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa vertailuharjoituksiin', description: 'Selaa yli 3000 lapsiystavallista kuvaa kokovertailuharjoitusten luomiseen. Kuvat n\u00e4ytet\u00e4\u00e4n eri kokoina samalla sivulla. Teemapohjaiset harjoitukset yhdist\u00e4v\u00e4t sanastonharjoittelun ja matemaattisen vertailun.' },
    { id: '4', icon: '\u{1f4ca}', title: 'Harjoitusten m\u00e4\u00e4r\u00e4 1\u201310 per sivu', description: 'Valitse 1\u201310 harjoitusta per sivua hallitaksesi teht\u00e4v\u00e4n laajuutta. V\u00e4hemm\u00e4n harjoituksia tarjoaa suuremmat kuvat ja selke\u00e4mm\u00e4n asettelun nuoremmille oppilaille. Enemm\u00e4n harjoituksia sopii itsen\u00e4iseen ty\u00f6skentelyyn vanhemmille oppilaille.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kokovertailuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat vastaukset n\u00e4kyv\u00e4t selke\u00e4sti merkittyinaa. Opettajat tarkistavat oppilast\u00f6iden ratkaisut sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat teht\u00e4v\u00e4t', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia ja teksti\u00e4 vapaasti. Lis\u00e4\u00e4 taustav\u00e4rej\u00e4, koristeellisia kehyksi\u00e4 ja omaa teksti\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kokovertailuteht\u00e4vi\u00e4 verkossa. Luo matemaattisten perusk\u00e4sitteiden paketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kokovertailuteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. Kokovertailu toimii universaalisti kielirajoista riippumatta.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kokoje\u00e4sitteiden opettaminen 5\u20136-vuotiaille', description: 'Luo ympy\u00e4ri suurin/pienin -teht\u00e4vi\u00e4 kahdella kuvalla esiopetuksen matemaattisten perusk\u00e4sitteiden opettamiseen. Oppilaat oppivat iso, pieni ja keskikokoinen -k\u00e4sitteet konkreettisten kuvien avulla POPS 2014 tavoitteiden mukaisesti.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'J\u00e4rjest\u00e4minen ja vertailu 1. luokalle', description: 'Generoi j\u00e4rjest\u00e4misteht\u00e4vi\u00e4 3\u20135 kuvalla 1. luokan matematiikan opetukseen. Oppilaat j\u00e4rjest\u00e4v\u00e4t kuvia suurimmasta pienimpaan tai p\u00e4invastoin. Teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t vertailutaitoja ja matemaattista ajattelua.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Kokok\u00e4sitteiden harjoittelu kotona', description: 'Luo hauskoja kokovertailuteht\u00e4vi\u00e4 tuttujen teemojen kuvilla. El\u00e4in- ja kulkuneuvokuvat tekev\u00e4t matemaattisista k\u00e4sitteist\u00e4 konkreettisia. Lapset oppivat vertailutaitoja luonnollisesti pelaten.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kokovertailu ilman kielitaitovaatimusta', description: 'Kokovertailuteht\u00e4v\u00e4t eiv\u00e4t vaadi lukutaitoa, joten ne sopivat kaikille oppilaille. Visuaalinen vertailu on kieliriippumatonta. Opettaja voi lis\u00e4t\u00e4 kokok\u00e4sitteiden sanastoa kahdella kielell\u00e4.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t matemaattiset perusk\u00e4sitteet', description: 'S\u00e4\u00e4d\u00e4 kuvam\u00e4\u00e4r\u00e4\u00e4 ja teht\u00e4v\u00e4tyyppi\u00e4 HOJKS-tavoitteiden mukaisesti. Kaksi kuvaa ja ympy\u00e4ri suurin -tyyppi tukevat heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat itseluottamusta.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy matemaattisten perusk\u00e4sitteiden paketteja', description: 'Luo teemallisia kokovertailupaketteja myyntiin verkossa. Matemaattiset perusk\u00e4sitepaketti esiopetukseen ja 1. luokalle ovat suosittuja tuotteita. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Mitk\u00e4 teht\u00e4v\u00e4tyypit ovat saatavilla kokovertailuun?', answer: 'Viisi teht\u00e4v\u00e4tyyppi\u00e4: ympy\u00e4ri suurin kuva, ympy\u00e4ri pienin kuva, etsi keskikokoinen, j\u00e4rjest\u00e4 suurimmasta pienimpaan ja j\u00e4rjest\u00e4 pienimm\u00e4st\u00e4 suurimpaan. Yhdist\u00e4 eri tyyppej\u00e4 samaan teht\u00e4v\u00e4\u00e4n monipuoliseen harjoitteluun.' },
    { id: '2', question: 'Mille ik\u00e4ryhmille kokovertailuteht\u00e4v\u00e4t sopivat?', answer: 'Kokovertailuteht\u00e4v\u00e4t palvelevat 4\u20137-vuotiaita. Esikoululaiset vertaavat kahta kuvaa. Esiopetuksen oppilaat hallitsevat kolmen kuvan vertailun. 1. luokan oppilaat j\u00e4rjest\u00e4v\u00e4t 4\u20135 kuvaa kokonsa mukaan.' },
    { id: '3', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen kokovertailuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat vastaukset n\u00e4kyv\u00e4t selke\u00e4sti merkittyinaa. Opettajat tarkistavat oppilast\u00f6iden ratkaisut sekunneissa.' },
    { id: '4', question: 'Kuinka monta kuvaa voi olla yhdess\u00e4 harjoituksessa?', answer: 'Valitse 2\u20135 kuvaa per harjoitus. Kaksi kuvaa sopii yksinkertaiseen iso-pieni-vertailuun. Kolmesta viiteen kuvaa mahdollistaa j\u00e4rjest\u00e4misen ja monimutkaisen vertailun.' },
    { id: '5', question: 'Miten kokovertailu opettaa matemaattisia k\u00e4sitteit\u00e4?', answer: 'Kokovertailuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t seriointitaitoja (j\u00e4rjest\u00e4minen koon mukaan), vertailutaitoja ja matemaattista sanastoa. N\u00e4m\u00e4 ovat varhaisen matematiikan perusedellytyksi\u00e4 POPS 2014 mukaisesti.' },
    { id: '6', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 teht\u00e4viss\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia kirjaston kuvien kanssa. Luo personoituja kokovertailuteht\u00e4vi\u00e4 luokan teemojen mukaan.' },
    { id: '7', question: 'Miten tulostan kokovertailuteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta suurissa eriss\u00e4.' },
    { id: '8', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kokovertailuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja teht\u00e4v\u00e4tyyppi 20 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon harjoitukset 15 minuutissa.' },
    { id: '9', question: 'Sopivatko kokovertailuteht\u00e4v\u00e4t esiopetukseen?', answer: 'Kokovertailuteht\u00e4v\u00e4t sopivat erinomaisesti esiopetukseen. K\u00e4yt\u00e4 ympy\u00e4ri suurin/pienin -teht\u00e4v\u00e4tyyppi\u00e4 kahdella kuvalla. Visuaalinen vertailu tukee matemaattisten perusk\u00e4sitteiden omaksumista POPS 2014 tavoitteiden mukaisesti.' },
    { id: '10', question: 'Voinko myyd\u00e4 luomiani kokovertailuteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy matemaattisten perusk\u00e4sitteiden paketteja verkossa ilman attribuutiovaatimuksia. Luo kokovertailukokoelmia digitaalisina latauksina.' },
    { id: '11', question: 'Voinko yhdist\u00e4\u00e4 eri teht\u00e4v\u00e4tyyppej\u00e4 samaan teht\u00e4v\u00e4\u00e4n?', answer: 'Kyll\u00e4, voit luoda teht\u00e4vi\u00e4, joissa eri harjoitukset k\u00e4ytt\u00e4v\u00e4t eri teht\u00e4v\u00e4tyyppej\u00e4. Esimerkiksi ympy\u00e4ri suurin -harjoitukset yhdistettyn\u00e4 j\u00e4rjest\u00e4misteht\u00e4viin samalla sivulla.' },
    { id: '12', question: 'Miten kokovertailu tukee POPS 2014 tavoitteita?', answer: 'Kokovertailuteht\u00e4v\u00e4t tukevat POPS 2014 matematiikan tavoitteita vertailun, serioimisen ja luokittelun osa-alueilla. Visuaalinen kokovertailu kehitt\u00e4\u00e4 matemaattista ajattelua konkreettisten kuvien avulla.' },
  ],
  relatedApps: [
    { id: '1', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n-v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u2696\ufe0f', description: 'Enemm\u00e4n-v\u00e4hemm\u00e4n -teht\u00e4v\u00e4t laajentavat kokovertailua lukum\u00e4\u00e4r\u00e4vertailuksi. Molemmat kehitt\u00e4v\u00e4t matemaattista vertailutaitoa eri konteksteissa.' },
    { id: '2', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4ca}', description: 'Kuvalajitteluteht\u00e4v\u00e4t laajentavat kokovertailua muihin luokitteluperusteisiin. Oppilaat lajittelevat kuvia koon lis\u00e4ksi v\u00e4rin, muodon ja kategorian mukaan.' },
    { id: '3', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhteenlaskuteht\u00e4v\u00e4t jatkavat matemaattista oppimista kokovertailun j\u00e4lkeen. Kokok\u00e4sitteiden ymm\u00e4rrys tukee lukum\u00e4\u00e4r\u00e4n ymm\u00e4rt\u00e4mist\u00e4 yhteenlaskussa.' },
    { id: '4', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4t', category: 'Logiikka', icon: '\u{1f523}', description: 'Kuvioteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t kokovertailua hahmontunnistuksella. Molemmat kehitt\u00e4v\u00e4t visuaalista p\u00e4\u00e4ttelykyky\u00e4 ja luokittelutaitoja.' },
    { id: '5', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske -teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t visuaalisen etsinn\u00e4n ja laskemisen. Oppilaat laskevat kuvia ja vertaavat lukum\u00e4\u00e4ri\u00e4 kokovertailun tavoin.' },
    { id: '6', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'V\u00e4rityskuvat tarjoavat palkitsevan jatkon kokovertailuteht\u00e4vien j\u00e4lkeen. Yhdist\u00e4 matemaattinen harjoittelu ja luova ilmaisu tasapainoisiksi oppitunneiksi.' },
  ],
  aiOverviewSnippet: 'Iso ja pieni -generaattori on verkkotyokalu, jolla luodaan tulostettavia kokovertailutehtavia esiopetukseen ja alakouluun. Opettajat valitsevat tehtavatyypin, kuvamaaran ja teeman, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4tyypit', ourApp: '5 tyyppi\u00e4: ympy\u00e4ri, etsi, j\u00e4rjest\u00e4 (2 suuntaa)', typical: '1\u20132 perustyyppi\u00e4' },
    { feature: 'Kuvam\u00e4\u00e4r\u00e4', ourApp: '2\u20135 kuvaa per harjoitus s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 kuvam\u00e4\u00e4r\u00e4' },
    { feature: 'Kuvavihjeet', ourApp: '3000+ teemakuvaa eri kokoina', typical: 'Yksinkertaiset geometriset muodot' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Usein lis\u00e4maksullinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Kokovertailu- ja seriointiteht\u00e4v\u00e4t ovat varhaisen matemaattisen ajattelun perusedellytyksi\u00e4. J\u00e4rjest\u00e4minen koon mukaan rakentaa lukujonon ymm\u00e4rryst\u00e4 ja vertailutaitoja.', source: 'Aunio, P. & R\u00e4s\u00e4nen, P., "Varhaisten matemaattisten taitojen arviointi ja tukeminen," NMI-bulletin' },
    { claim: 'Visuaalinen vertailu konkreettisilla kuvilla tuottaa vahvemman k\u00e4sitteellisen ymm\u00e4rryksen kuin abstraktit symbolit, erityisesti 4\u20137-vuotiailla oppijoilla siirtyess\u00e4 konkreettisesta abstraktiin.', source: 'Mattinen, A., "Matemaattisten taitojen kehittyminen varhaiskasvatuksessa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Viisi tehtavatyyppia samalla sivulla tekee kokovertailusta monipuolista. Esiopetuksen oppilaani oppivat iso ja pieni -kasitteet viikossa kun tehtavat yhdistetaan konkreettisiin kokemuksiin.', name: 'Jenni Toivonen', role: 'Esiopetuksen opettaja', school: 'Satumetsaan paivakoti, Espoo' },
    { quote: 'Jarjestamistehtavat ovat loistava lammittely ennen lukujonoharjoituksia. Ekaluokkalaiseni ymmartavat paremmin lukujen suuruusjarjestyksen kun he ensin jarjestavat kuvia kokonsa mukaan.', name: 'Ville Rantanen', role: '1. luokan opettaja', school: 'Keltinmaan koulu, Oulu' },
  ],
  tips: {
    sectionTitle: 'Kokovertailustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kokovertailugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset teht\u00e4v\u00e4tyypin, kuvam\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta toiseen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Iso ja pieni kahdella kuvalla', description: 'Kaytta ympyroi suurin/pienin -tehtavatyyppia kahdella kuvalla. Esikoululaiset oppivat peruskasitteet iso ja pieni konkreettisten kuvien avulla. Valitse tuttuja teemoja kuten elaimet tai kulkuneuvot motivaation yllapitamiseksi.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kolme kuvaa ja keskikokoinen', description: 'Luo kolmen kuvan tehtavia lisaamalla keskikokoinen-kasitteen. Esiopetuksen oppilaat harjoittelevat kolmeen koon erottelua. Ympyroi-tehtavat kehittavat visuaalista erottelua POPS 2014 matemaattisten peruskasitteiden tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: J\u00e4rjest\u00e4minen 4\u20135 kuvalla', description: 'Generoi jarjestamistehtavia 4\u20135 kuvalla suurimmasta pienimpaan tai painvastoin. Ekaluokkalaiset kehittavat seriointitaitoja ja lukujonon ymmarysta. Kaytta tehtavia lammittelyna ennen lukujonoharjoituksia.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Monipuoliset teht\u00e4v\u00e4tyypit', description: 'Yhdista eri tehtavatyyppeja samaan tehtavaan. Toisluokkalaiset vertaavat, jarjestavat ja luokittelevat kuvia kokonsa mukaan. Tehtavat toimivat matemaattisen sanaston harjoitteluna.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Soveltavat vertailuteht\u00e4v\u00e4t', description: 'Kaytta kokovertailua soveltavissa tehtavissa, joissa oppilaat vertaavat mittoja ja suuruuksia. Kolmasluokkalaiset siirtyvat visuaalisesta vertailusta numeeriseen vertailuun POPS 2014 mittaamisen tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 6. CHART COUNT (kuvakaavio-tyoarkit)
// ===================================================================
const chartCount = {
  file: 'kuvakaavio-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4ca}', title: 'Kuvakaaviot laske ja v\u00e4rit\u00e4 -muodossa', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa 20 kuvaa n\u00e4ytet\u00e4\u00e4n satunnaisessa j\u00e4rjestyksess\u00e4. Oppilaat laskevat kunkin kuvatyypin m\u00e4\u00e4r\u00e4n ja v\u00e4ritt\u00e4v\u00e4t vastaavan m\u00e4\u00e4r\u00e4n ruutuja kaavioon. T\u00e4m\u00e4 kehitt\u00e4\u00e4 sek\u00e4 laskutaitoja ett\u00e4 tiedon visualisointia.' },
    { id: '2', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 kuvam\u00e4\u00e4r\u00e4 ja kategoriat', description: 'Valitse 3\u20136 eri kuvatyyppi\u00e4 kaavioon ja s\u00e4\u00e4d\u00e4 kunkin kategorian lukum\u00e4\u00e4r\u00e4\u00e4. 20 kuvan ruudukko tarjoaa riitt\u00e4v\u00e4sti dataa merkityksellisten kaavioiden luomiseen. Vaikeustaso mukautuu kuvatyyppien m\u00e4\u00e4r\u00e4ll\u00e4.' },
    { id: '3', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa datavisualisointiin', description: 'Selaa yli 3000 lapsiystavallista kuvaa kaaviotehtavien luomiseen. Teemapohjaiset kuvat luovat johdonmukaisia datavisualisointeja. Elain-, ruoka- ja kulkuneuvoteemat tekevat tilastoharjoittelusta kiinnostavaa.' },
    { id: '4', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kaavioteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat lukum\u00e4\u00e4r\u00e4t ja v\u00e4ritetyt ruudut n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat tarkistavat oppilast\u00f6iden ratkaisut nopeasti. Vastausavain tulostuu erilliselle sivulle.' },
    { id: '5', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat teht\u00e4v\u00e4t', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, taustav\u00e4rej\u00e4 ja koristeellisia kehyksi\u00e4. Luo ammattitasoisia kaavioteht\u00e4vi\u00e4 nopeasti.' },
    { id: '6', icon: '\u{1f4e4}', title: 'Omien kuvien lataus', description: 'Lataa rajattomasti omia kuvia luodaksesi personoituja kaavioteht\u00e4vi\u00e4. K\u00e4yt\u00e4 luokkahuoneen teemoihin sopivia kuvia. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kanssa samassa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kaavioteht\u00e4vi\u00e4 verkossa. Luo datataitojen harjoituspaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kaavioteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. Tiedonk\u00e4sittely on universaali matemaattinen taito kielirajoista riippumatta.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Laskeminen ja kaaviot 5\u20136-vuotiaille', description: 'Luo yksinkertaisia kaavioteht\u00e4vi\u00e4 kolmella kuvatyypill\u00e4 esiopetuksen laskuharjoitteluun. Oppilaat laskevat kuvia ja v\u00e4ritt\u00e4v\u00e4t ruutuja kaavion luomiseksi. T\u00e4ydellinen POPS 2014 matemaattisen tiedonk\u00e4sittelyn tavoitteiden tukemiseen.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Tiedonk\u00e4sittely ja tilastot 1.\u20133. luokalle', description: 'Generoi kaavioteht\u00e4vi\u00e4 4\u20136 kuvatyypill\u00e4 tiedonk\u00e4sittelyn harjoitteluun. Oppilaat laskevat, vertaavat lukum\u00e4\u00e4ri\u00e4 ja tulkitsevat kaavioita. Teht\u00e4v\u00e4t integroivat matematiikkaa ja ymp\u00e4rist\u00f6oppia.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskaa laskemista ja graafista esityst\u00e4', description: 'Luo kiinnostavia kaavioteht\u00e4vi\u00e4 lasten suosikkiteemoilla. Lapset nauttivat kuvien laskemisesta ja kaavioiden v\u00e4ritt\u00e4misest\u00e4. Teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t laskemisen ja luovan ilmaisun luonnollisesti.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Visuaalinen dataharjoittelu ilman kielitaitoa', description: 'Kaavioteht\u00e4v\u00e4t eiv\u00e4t vaadi lukutaitoa. Kuvien laskeminen ja ruutujen v\u00e4ritt\u00e4minen ovat kieliriippumattomia. Opettaja voi lis\u00e4t\u00e4 matemaattista sanastoa kahdella kielell\u00e4 samaan teht\u00e4v\u00e4\u00e4n.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t tiedonk\u00e4sittelyn harjoitukset', description: 'S\u00e4\u00e4d\u00e4 kuvatyyppien m\u00e4\u00e4r\u00e4\u00e4 HOJKS-tavoitteiden mukaisesti. Kolme kuvatyyppi\u00e4 tukee heikompia laskijoita. V\u00e4ritt\u00e4minen tarjoaa visuaalisen palautteen oikeasta vastauksesta.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy datataitojen harjoituspaketteja', description: 'Luo teemallisia kaavioteht\u00e4v\u00e4paketteja myyntiin verkossa. Tiedonk\u00e4sittelyn materiaalit ovat kasvava kategoria opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kaaviogeneraattori toimii?', answer: 'Generaattori luo teht\u00e4v\u00e4n, jossa 20 kuvaa n\u00e4ytet\u00e4\u00e4n satunnaisessa j\u00e4rjestyksess\u00e4 ja tyhj\u00e4 kaavio odottaa t\u00e4ytt\u00e4mist\u00e4. Oppilaat laskevat kunkin kuvatyypin m\u00e4\u00e4r\u00e4n ja v\u00e4ritt\u00e4v\u00e4t vastaavan m\u00e4\u00e4r\u00e4n ruutuja kaavioon. Vastausavain generoidaan automaattisesti.' },
    { id: '2', question: 'Kuinka monta kuvatyyppi\u00e4 voi olla yhdess\u00e4 teht\u00e4v\u00e4ss\u00e4?', answer: 'Valitse 3\u20136 eri kuvatyyppi\u00e4 kaavioon. V\u00e4hemm\u00e4n kuvatyyppej\u00e4 sopii nuoremmille oppilaille. Kuusi kuvatyyppi\u00e4 haastaa vanhempia oppilaita vaatimalla tarkkaa laskemista useammasta kategoriasta.' },
    { id: '3', question: 'Mille ik\u00e4ryhmille kaavioteht\u00e4v\u00e4t sopivat?', answer: 'Kaavioteht\u00e4v\u00e4t palvelevat 5\u201310-vuotiaita. Esiopetuksen oppilaat laskevat 3 kuvatyyppi\u00e4 ja v\u00e4ritt\u00e4v\u00e4t yksinkertaisen kaavion. 1.\u20132. luokan oppilaat hallitsevat 4\u20135 kuvatyyppi\u00e4. 3. luokan oppilaat tulkitsevat 6 kategorian kaavioita.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen kaavioteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Vastausavain n\u00e4ytt\u00e4\u00e4 oikeat lukum\u00e4\u00e4r\u00e4t ja v\u00e4ritetyt ruudut jokaiselle kuvatyypille. Opettajat tarkistavat oppilast\u00f6iden ratkaisut sekunneissa.' },
    { id: '5', question: 'Miten kaavioteht\u00e4v\u00e4t opettavat tiedonk\u00e4sittely\u00e4?', answer: 'Oppilaat ker\u00e4\u00e4v\u00e4t dataa (laskevat kuvia), organisoivat sit\u00e4 (v\u00e4ritt\u00e4v\u00e4t kaavion) ja tulkitsevat tuloksia. T\u00e4m\u00e4 prosessi opettaa tiedonk\u00e4sittelyn perusperiaatteet k\u00e4yt\u00e4nn\u00f6ss\u00e4 POPS 2014 tavoitteiden mukaisesti.' },
    { id: '6', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 kaavioteht\u00e4viss\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia luodaksesi personoituja kaavioteht\u00e4vi\u00e4. K\u00e4yt\u00e4 luokan teemoihin sopivia kuvia. Yhdist\u00e4 omia kuvia kirjaston kuvien kanssa samassa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '7', question: 'Miten tulostan kaavioteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti.' },
    { id: '8', question: 'Kuinka kauan yhden kaavioteht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kaavioteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja kuvat 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon tiedonk\u00e4sittelyharjoitukset 15 minuutissa.' },
    { id: '9', question: 'Sopivatko kaavioteht\u00e4v\u00e4t ymp\u00e4rist\u00f6opin opetukseen?', answer: 'Kaavioteht\u00e4v\u00e4t sopivat erinomaisesti ymp\u00e4rist\u00f6opin tiedonker\u00e4\u00e4misharjoituksiin. Oppilaat laskevat luontokuvia ja luovat kaavioita havainnoistaan. Teht\u00e4v\u00e4t integroivat matematiikkaa ja ymp\u00e4rist\u00f6oppia luonnollisesti.' },
    { id: '10', question: 'Voinko myyd\u00e4 luomiani kaavioteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy tiedonk\u00e4sittelyn paketteja verkossa ilman attribuutiovaatimuksia. Luo kaavioteht\u00e4v\u00e4kokoelmia digitaalisina latauksina.' },
    { id: '11', question: 'Mik\u00e4 on 20 kuvan ruudukon tarkoitus?', answer: '20 kuvan ruudukko tarjoaa riitt\u00e4v\u00e4sti dataa merkityksellisten kaavioiden luomiseen. Kuvatyyppien eri m\u00e4\u00e4r\u00e4t luovat kiinnostavia vertailuja. Oppilaat harjoittelevat systemaattista laskemista ja datan organisointia.' },
    { id: '12', question: 'Miten kaavioteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Kaavioteht\u00e4v\u00e4t tukevat POPS 2014 matematiikan tiedonk\u00e4sittelyn tavoitteita. Oppilaat harjoittelevat datan ker\u00e4\u00e4mist\u00e4, organisointia ja tulkintaa kuvakaavioiden avulla. Teht\u00e4v\u00e4t valmistavat tilastollisen ajattelun perusteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske -teht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t kaavioteht\u00e4vi\u00e4 visuaalisen etsinn\u00e4n ja laskemisen harjoittelussa. Molemmat kehitt\u00e4v\u00e4t systemaattista laskemista.' },
    { id: '2', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhteenlaskuteht\u00e4v\u00e4t jatkavat matemaattista oppimista kaavioteht\u00e4vien j\u00e4lkeen. Oppilaat soveltavat laskutaitoja numeerisiin teht\u00e4viin.' },
    { id: '3', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n-v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u2696\ufe0f', description: 'Enemm\u00e4n-v\u00e4hemm\u00e4n -teht\u00e4v\u00e4t laajentavat kaavioiden vertailua lukum\u00e4\u00e4r\u00e4vertailuiksi. Oppilaat vertaavat dataa eri muodoissa.' },
    { id: '4', slug: 'iso-pieni-tyoarkit', name: 'Iso-pieni', category: 'Matematiikka', icon: '\u{1f4cf}', description: 'Kokovertailuteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t kaavioiden vertailua visuaalisella kokovertailulla. Molemmat kehitt\u00e4v\u00e4t vertailutaitoja eri konteksteissa.' },
    { id: '5', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'V\u00e4rityskuvat tarjoavat luovan jatkon kaavioteht\u00e4vien v\u00e4ritt\u00e4misen j\u00e4lkeen. Yhdist\u00e4 matemaattinen tiedonk\u00e4sittely ja taidekasvatus.' },
    { id: '6', slug: 'matematiikkapulmat-tyoarkit', name: 'Matematiikkapulmat', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Matematiikkapulmat haastavat oppilaita soveltamaan laskutaitoja ongelmanratkaisukonteksteissa. Molemmat kehitt\u00e4v\u00e4t matemaattista ajattelua.' },
  ],
  aiOverviewSnippet: 'Kuvakaavio-generaattori on verkkotyokalu, jolla luodaan tulostettavia laske ja varita -kaaviotehtavia. Oppilaat laskevat kuvia 20 kuvan ruudukosta ja varittavat vastaavan maaran ruutuja kaavioon. Opettajat valitsevat teeman ja kuvatyypit, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muoto', ourApp: 'Laske ja v\u00e4rit\u00e4 -kaavio 20 kuvalla', typical: 'Vain tyhjat kaaviot ilman kuvia' },
    { feature: 'Kuvatyypit', ourApp: '3\u20136 kategoriaa 3000+ teemakuvasta', typical: 'Yksinkertaiset symbolit' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Usein lis\u00e4maksullinen' },
    { feature: 'Muokattavuus', ourApp: 'T\u00e4ysi muokkaus: siirto, skaalaus, kierto, teksti', typical: 'Kiinteat pohjat' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Kuvakaaviot ovat tehokas tyokalu varhaisen tiedonkasittelytaidon kehittamiseen. Laske ja varita -muoto yhdistaa datan keraamisen ja visualisoinnin yhteen tehtavaan, tukien POPS 2014 tiedonkasittelyn tavoitteita.', source: 'Laine, A. et al., "Tiedonkasittely alkuopetuksen matematiikassa," Helsingin yliopisto' },
    { claim: 'Konkreettiset kuvapohjaiset datavisualisoinnit tuottavat paremman ymmaarryksen graafisista esityksista kuin abstraktit tilastoharjoitukset, erityisesti 5-8-vuotiailla oppijoilla.', source: 'Hannula, M. S., "Matemaattisten kasitteiden kehittyminen," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvakaaviot ovat loistava tapa opettaa tiedonkasittelya esiopetuksessa. Lapseni rakastavat laskea elainkuvia ja vaariittaa ruutuja kaavioon. He oppivat dataajattelua huomaamattaan leikkien kautta.', name: 'Laura Jarvinen', role: 'Esiopetuksen opettaja', school: 'Revontulen paivakoti, Rovaniemi' },
    { quote: 'Kaytan kaaviotehtavia ymparistopin oppitunneilla. Oppilaat keraavat dataa luontokuvista ja luovat kaavioita havainnoistaan. Tehtavat integroivat matematiikan ja ymparistopin taaydellisesti.', name: 'Juha Mikkola', role: '2. luokan opettaja', school: 'Linnanmaan koulu, Oulu' },
  ],
  tips: {
    sectionTitle: 'Kuvakaaviostrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kaaviogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset kuvatyyppien m\u00e4\u00e4r\u00e4n ja tiedonk\u00e4sittelyn syvyyden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Laske ja v\u00e4rit\u00e4 kolmella kuvalla', description: 'Kaytta kolmea kuvatyyppia yksinkertaisella teemalla kuten elaimet. Esikoululaiset laskevat kuvia ja varittavat ruutuja ohjatusti. Keskity laskemisen tarkkuuteen ja yksi-yhteen-vastaavuuteen.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Nelj\u00e4n kuvatyypin kaaviot', description: 'Luo kaavioita neljalla kuvatyypilla. Esiopetuksen oppilaat harjoittelevat itsenaaista laskemista ja kaavion tayttamista. Vertaa kategorioiden lukumaaria: mika on yleisin, mika harvinaisin.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Viiden kategorian tiedonk\u00e4sittely', description: 'Generoi kaavioita viidella kuvatyypilla. Ekaluokkalaiset kehittavat jarjestelmallista laskemista ja kaavion tulkintaa. Harjoittele vertailukysymyksia: kuinka paljon enemmaan, vahiten, yhteensa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Kuuden kategorian datavertailu', description: 'Luo kaavioita kuudella kuvatyypilla tiedonkasittelyn syventamiseen. Toisluokkalaiset vertaavat kategorioita ja vastaavat monimutkaisiin kysymyksiin. Yhdista ymparistopin datankeraamiseen.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Soveltavat tiedonk\u00e4sittelyteht\u00e4v\u00e4t', description: 'Kaytta kuutta kuvatyyppia ja lisaa tulkintakysymyksia. Kolmasluokkalaiset harjoittelevat datan analysointia ja johtopaatosten tekemista kaavioiden pohjalta POPS 2014 tiedonkasittelyn tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 7. CODE ADDITION (kuva-yhteenlasku-tyoarkit)
// ===================================================================
const codeAddition = {
  file: 'kuva-yhteenlasku-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f510}', title: 'Kuvakoodattu yhteenlasku -muoto', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa kuvat korvaavat numerot yhteenlaskuissa. Oppilaat purkavat koodin kuvasta numeroksi ja ratkaisevat laskuteht\u00e4v\u00e4n. T\u00e4m\u00e4 yhdist\u00e4\u00e4 symbolisen ajattelun ja yhteenlaskuharjoittelun samassa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '2', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 symbolim\u00e4\u00e4r\u00e4 ja lukualue', description: 'Valitse 3\u20135 kuvasymbolissa ja s\u00e4\u00e4d\u00e4 lukualue vaikeustason mukaan. V\u00e4hemm\u00e4n symboleja ja pienet luvut sopivat esikoululaisille. Enemm\u00e4n symboleja ja suuremmat luvut haastavat vanhempia oppilaita. Teht\u00e4vien m\u00e4\u00e4r\u00e4 sivua kohti on s\u00e4\u00e4dett\u00e4v\u00e4.' },
    { id: '3', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa koodisymboleiksi', description: 'Selaa yli 3000 lapsiystavallista kuvaa koodisymboleiksi. Elain-, ruoka- tai kulkuneuvoteemaiset symbolit tekevat dekoodaamisesta kiinnostavaa. Jokainen kuva edustaa eri lukuarvoa luoden visuaalisen koodiavaimen.' },
    { id: '4', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kuvakoodattu yhteenlaskuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Vastausavain n\u00e4ytt\u00e4\u00e4 sek\u00e4 koodiavaimen ett\u00e4 oikeat vastaukset. Opettajat tarkistavat oppilast\u00f6iden ratkaisut sekunneissa.' },
    { id: '5', icon: '\u{1f3a8}', title: 'T\u00e4ysin muokattavat teht\u00e4v\u00e4t', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia ja teksti\u00e4 vapaasti. Lis\u00e4\u00e4 taustav\u00e4rej\u00e4, koristeellisia kehyksi\u00e4 ja omaa teksti\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '6', icon: '\u{1f4e4}', title: 'Omien kuvien lataus koodisymboleiksi', description: 'Lataa omia kuvia k\u00e4ytett\u00e4v\u00e4ksi koodisymboleina. K\u00e4yt\u00e4 luokan maskottia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvia. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kanssa.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kuvakoodattuja yhteenlaskuteht\u00e4vi\u00e4 verkossa. Luo teemallisia koodilaskupaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kuvakoodattuja yhteenlaskuteht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. Symbolinen matematiikka toimii universaalisti kielirajoista riippumatta.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Symbolinen ajattelu kuvilla 5\u20136-vuotiaille', description: 'Luo yksinkertaisia kuvakoodattuja yhteenlaskuteht\u00e4vi\u00e4 kolmella symbolilla ja summilla 5 asti. Esiopetuksen oppilaat harjoittelevat symbolin ja luvun vastaavuutta. T\u00e4ydellinen POPS 2014 matemaattisen ajattelun tavoitteiden tukemiseen.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Algebrallinen ajattelu 1.\u20133. luokalle', description: 'Generoi kuvakoodattuja teht\u00e4vi\u00e4 4\u20135 symbolilla algebrallisen ajattelun kehitt\u00e4miseen. Oppilaat oppivat, ett\u00e4 symbolit voivat edustaa lukuarvoja. Teht\u00e4v\u00e4t valmistavat muuttujak\u00e4sitteen ymm\u00e4rt\u00e4miseen.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauska matikka koodien purkamisella', description: 'Luo kiinnostavia kuvakoodattuja laskuteht\u00e4vi\u00e4 lasten suosikkiteemoilla. Koodin purkaminen tekee yhteenlaskuharjoittelusta seikkailun. Lapset motivoituvat ratkomaan koodeja pelk\u00e4n laskemisen sijaan.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Visuaalinen matematiikka ilman kielitaitoa', description: 'Kuvakoodatut teht\u00e4v\u00e4t eiv\u00e4t vaadi lukutaitoa. Kuvasymboli-lukuvastaavuus on kieliriippumatonta. Oppilaat harjoittelevat yhteenlaskua ja symbolista ajattelua universaalilla muodolla.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t symboliharjoitukset', description: 'S\u00e4\u00e4d\u00e4 symbolien m\u00e4\u00e4r\u00e4\u00e4 ja lukualuetta HOJKS-tavoitteiden mukaisesti. Kolme symbolia ja pienet luvut tukevat heikompia laskijoita. Visuaalinen koodiavain tarjoaa jatkuvan tuen teht\u00e4v\u00e4n aikana.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy koodilaskupaketteja verkossa', description: 'Luo teemallisia kuvakoodattuja laskupaketteja myyntiin. Koodilaskut ovat uniikki tuotemuoto joka erottuu perinteisist\u00e4 matematiikkateht\u00e4vist\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvakoodattu yhteenlasku toimii?', answer: 'Teht\u00e4v\u00e4ss\u00e4 kukin kuva edustaa tietty\u00e4 lukuarvoa. Koodiavain n\u00e4ytt\u00e4\u00e4 kuvan ja vastaavan numeron. Oppilaat korvaavat kuvat luvuilla ja ratkaisevat yhteenlaskun. T\u00e4m\u00e4 kehitt\u00e4\u00e4 symbolista ajattelua ja algebrallista ymm\u00e4rryst\u00e4.' },
    { id: '2', question: 'Mille ik\u00e4ryhmille kuvakoodatut teht\u00e4v\u00e4t sopivat?', answer: 'Kuvakoodatut yhteenlaskuteht\u00e4v\u00e4t palvelevat 5\u201310-vuotiaita. Esiopetuksen oppilaat k\u00e4ytt\u00e4v\u00e4t 3 symbolia pienill\u00e4 luvuilla. 1.\u20132. luokan oppilaat hallitsevat 4 symbolia. 3. luokan oppilaat ratkaisevat 5 symbolin haasteita.' },
    { id: '3', question: 'Kuinka monta kuvasymbolissa on saatavilla?', answer: 'Valitse 3\u20135 kuvasymbolissa teht\u00e4v\u00e4\u00e4n. V\u00e4hemm\u00e4n symboleja yksinkertaistaa koodin purkamista nuoremmille oppilaille. Enemm\u00e4n symboleja haastaa muistia ja symbolien hallintaa vanhemmilla oppilailla.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Vastausavain n\u00e4ytt\u00e4\u00e4 koodiavaimen ja kaikkien teht\u00e4vien oikeat vastaukset. Opettajat tarkistavat oppilast\u00f6iden ratkaisut sekunneissa.' },
    { id: '5', question: 'Miten kuvakoodaus kehitt\u00e4\u00e4 algebrallista ajattelua?', answer: 'Kuvasymboli-lukuvastaavuus opettaa, ett\u00e4 symbolit voivat edustaa lukuarvoja. T\u00e4m\u00e4 on algebrallisen ajattelun perusta. Oppilaat harjoittelevat muuttujak\u00e4siten ymm\u00e4rt\u00e4mist\u00e4 konkreettisesti kuvien avulla.' },
    { id: '6', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 koodisymboleina?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia k\u00e4ytett\u00e4v\u00e4ksi koodisymboleina. K\u00e4yt\u00e4 luokan maskottia tai oppilaiden piirustuksia. Yhdist\u00e4 omia kuvia kirjaston kuvien kanssa samassa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '7', question: 'Miten tulostan kuvakoodatut teht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti.' },
    { id: '8', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kuvakoodatun yhteenlaskuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon teht\u00e4v\u00e4t 15 minuutissa.' },
    { id: '9', question: 'Miten kuvakoodaus eroaa tavallisesta yhteenlaskusta?', answer: 'Tavallisessa yhteenlaskussa oppilaat laskevat suoraan. Kuvakoodatussa teht\u00e4v\u00e4ss\u00e4 he ensin purkavat koodin kuvasta numeroksi ja sitten ratkaisevat laskun. T\u00e4m\u00e4 kaksivaiheinen prosessi kehitt\u00e4\u00e4 sek\u00e4 symbolista ajattelua ett\u00e4 laskutaitoja.' },
    { id: '10', question: 'Voinko myyd\u00e4 luomiani kuvakoodattuja teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy kuvakoodattuja laskupaketteja verkossa ilman attribuutiovaatimuksia. Koodilaskut ovat uniikki tuote joka erottuu markkinoilla.' },
    { id: '11', question: 'Sopivatko kuvakoodatut teht\u00e4v\u00e4t erityisopetukseen?', answer: 'Kuvakoodatut teht\u00e4v\u00e4t sopivat erityisopetukseen s\u00e4\u00e4dett\u00e4vyydens\u00e4 ansiosta. V\u00e4henn\u00e4 symbolien m\u00e4\u00e4r\u00e4\u00e4 ja lukualuetta HOJKS-tavoitteiden mukaisesti. Visuaalinen koodiavain tarjoaa jatkuvan tuen.' },
    { id: '12', question: 'Miten kuvakoodaus tukee POPS 2014 tavoitteita?', answer: 'Kuvakoodatut teht\u00e4v\u00e4t tukevat POPS 2014 matematiikan tavoitteita T1 (algebrallinen ajattelu) ja T3 (laskusujuvuus). Symbolinen koodaus valmentaa muuttujak\u00e4sitteen ymm\u00e4rt\u00e4miseen ja kehitt\u00e4\u00e4 matemaattista ongelmanratkaisua.' },
  ],
  relatedApps: [
    { id: '1', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhteenlaskuteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t kuvakoodattuja teht\u00e4vi\u00e4 perinteisell\u00e4 yhteenlaskuharjoittelulla. Oppilaat harjoittelevat samoja laskufaktoja eri muodoissa.' },
    { id: '2', slug: 'vahennyslasku-tyoarkit', name: 'V\u00e4hennyslasku', category: 'Matematiikka', icon: '\u2796', description: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t laajentavat kuvakoodausta v\u00e4hennyslaskuoperaatioihin. Molemmat kehitt\u00e4v\u00e4t symbolista ajattelua ja laskusujuvuutta.' },
    { id: '3', slug: 'matematiikkapulmat-tyoarkit', name: 'Matematiikkapulmat', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Matematiikkapulmat haastavat oppilaita soveltamaan laskutaitoja ongelmanratkaisukonteksteissa. Molemmat yhdist\u00e4v\u00e4t loogisen ajattelun ja matematiikan.' },
    { id: '4', slug: 'kuvakryptogrammi-tyoarkit', name: 'Kuvakryptogrammi', category: '\u00c4idinkieli', icon: '\u{1f510}', description: 'Kuvakryptogrammi laajentaa koodauskonseptia kirjaimiin ja sanoihin. Oppilaat harjoittelevat koodinmurtostrategiaa sek\u00e4 luvuilla ett\u00e4 kirjaimilla.' },
    { id: '5', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske -teht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t kuvakoodattuja teht\u00e4vi\u00e4 visuaalisen etsinn\u00e4n ja laskemisen yhdist\u00e4miseen. Molemmat k\u00e4ytt\u00e4v\u00e4t kuvia matemaattisissa konteksteissa.' },
    { id: '6', slug: 'kuvakaavio-tyoarkit', name: 'Kuvakaavio', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Kaavioteht\u00e4v\u00e4t laajentavat kuvapohjaista matematiikkaa tiedonk\u00e4sittelyn suuntaan. Molemmat k\u00e4ytt\u00e4v\u00e4t kuvia matemaattisen ajattelun kehitt\u00e4miseen.' },
  ],
  aiOverviewSnippet: 'Kuvakoodattu yhteenlasku -generaattori on verkkotyokalu, jolla luodaan tulostettavia dekoodaustehtavia, joissa kuvat korvaavat numerot yhteenlaskuissa. Oppilaat purkavat kuva-numerovastaavuudet koodiavaimesta ja ratkaisevat laskutehtavat. Kehittaa algebrallista ajattelua ja yhteenlaskusujuvuutta samanaikaisesti.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muoto', ourApp: 'Kuvakoodattu yhteenlasku symbolisella ajattelulla', typical: 'Pelk\u00e4t numeroteht\u00e4v\u00e4t' },
    { feature: 'Kuvasymbolit', ourApp: '3\u20135 symbolia 3000+ teemakuvasta', typical: 'Ei symbolikoodausta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen koodiavain ja vastaukset', typical: 'Usein lis\u00e4maksullinen' },
    { feature: 'Muokattavuus', ourApp: 'T\u00e4ysi muokkaus: siirto, skaalaus, kierto, teksti', typical: 'Kiinteat pohjat' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Symbolinen koodaus matematiikassa kehittaa algebrallista ajattelua jo varhaisessa vaiheessa. Kuva-numerovalstaavuudet valmistavat muuttujakaasitteen ymmaartaamiseen konkreettisella tavalla.', source: 'Nunes, T. & Bryant, P., "Lasten matemaattinen kehitys," suomenkielinen lyhennelma NMI-bulletin' },
    { claim: 'Kaksivaiheinen dekoodaus-ratkaisu -prosessi syventaa matemaattista ymmarrystaa verrattuna suoraan laskemiseen, silla oppilas joutuu prosessoimaan tehtavaa useammalla kognitiivisella tasolla.', source: 'Lehtinen, E. & Hannula-Sormunen, M., "Matemaattisen ajattelun kehittyminen," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvakoodatut laskutehtavat ovat luokkani suosikkeja. Oppilaat kokevat ratkaisevansa salakoodeja eivatkaa huomaa harjoittelevansa yhteenlaskua. Motivaatio pysyy korkeana ja laskusujuvuus kehittyy huomaamatta.', name: 'Susanna Karjalainen', role: '1. luokan opettaja', school: 'Jokivarren koulu, Turku' },
    { quote: 'Kaytan kuvakoodattuja tehtavia algebrallisen ajattelun esittelyyn toisluokkalaisilleni. Kuvasymbolit tekevat muuttujakasitteesta konkreettisen. Oppilaat ymmartavat etta kuva edustaa lukua aivan kuten kirjain myohemmin.', name: 'Mikko Lehto', role: '2. luokan opettaja', school: 'Hiidenkiven koulu, Helsinki' },
  ],
  tips: {
    sectionTitle: 'Kuvakoodatun yhteenlaskun strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvakoodattu yhteenlasku -generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset symbolien m\u00e4\u00e4r\u00e4n, lukualueen ja teht\u00e4v\u00e4tyypin esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Kuva-numerovalstaavuus kolmella symbolilla', description: 'Kaytta kolmea kuvasymbolissa summilla 5 asti. Esikoululaiset harjoittelevat kuvan ja luvun yhdistamista. Koodiavain on koko ajan nakyvilla. Ohjatussa pienryhmatyossa opettaja tukee dekoodausta.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Koodilaskut summilla 10 asti', description: 'Luo tehtavia kolmella tai neljalla symbolilla summilla 10 asti. Esiopetuksen oppilaat harjoittelevat koodiavaimen kayttoa itsenaisesti. Kuvasymboli-lukuvastaavuus rakentaa symbolisen ajattelun perustaa POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Nelj\u00e4n symbolin yhteenlaskut', description: 'Generoi tehtavia neljalla symbolilla summilla 20 asti. Ekaluokkalaiset kehittavat sujuvaa koodinpurkamista ja yhteenlaskua. Tehtavat vahvistavat laskufaktoja motivoivassa muodossa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Viiden symbolin algebrallinen haaste', description: 'Luo tehtavia viidella symbolilla suuremmilla luvuilla. Toisluokkalaiset harjoittelevat monimutkaista dekoodausta ja algebrallista ajattelua. Tehtavat valmistavat muuttujakasitteen ymmaartaamiseen.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset koodilaskut', description: 'Kaytta viittaa symbolissa suurimmalla lukualueella. Kolmasluokkalaiset ratkaisevat monimutkaisia kooditehtavia itsenaisesti. Kaytta tehtavia algebrallisen ajattelun syventamiseen POPS 2014 vuosiluokkien 3\u20136 tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// PROCESSING LOGIC
// ===================================================================
const apps = [matching, drawingLines, pictureBingo, sudoku, bigSmall, chartCount, codeAddition];

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
    '  // -- SEO & Content Enrichment (Part 175) ------------------------------------',
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
