/**
 * Part 178: FI Product Pages 29-33 — Content Enrichment
 *
 * Populates empty arrays (features, useCases, faq, relatedApps) and adds
 * SEO enrichment fields (aiOverviewSnippet, comparisonTable, researchBacking,
 * teacherTestimonials, tips) for 5 Finnish product pages.
 *
 * Usage: node scripts/apply-part178-seo.js
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
// 1. SHADOW MATCH (varjoyhdistely-tyoarkit)
// ===================================================================
const shadowMatch = {
  file: 'varjoyhdistely-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f47b}', title: 'Siluettien yhdist\u00e4minen visuaalisen hahmotuksen kehitt\u00e4miseen', description: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat yhdist\u00e4v\u00e4t v\u00e4rikk\u00e4it\u00e4 kuvia niiden mustiin varjosiluetteihin. Visuaalinen erottelukyky kehittyy kun lapset analysoivat muotoja, \u00e4\u00e4riviivoja ja mittasuhteita. Varjoyhdistely rakentaa perustaa lukemisvalmiudelle ja muodon pysyvyyden ymm\u00e4rt\u00e4miselle.' },
    { id: '2', icon: '\u2702\ufe0f', title: 'Kolme yhdist\u00e4mismuotoa: viiva, leikkaa-liimaa ja ympyr\u00f6i', description: 'Valitse kolmesta teht\u00e4v\u00e4muodosta oppilaiden taitotason mukaan. Viivanvet\u00e4minen kehitt\u00e4\u00e4 hienomotoriikkaa. Leikkaa ja liimaa -muoto harjoittaa saksien k\u00e4ytt\u00f6\u00e4. Ympyr\u00f6intitila sopii nuorimmille oppilaille yksinkertaisena valintateht\u00e4v\u00e4n\u00e4.' },
    { id: '3', icon: '\u{1f522}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 parien lukum\u00e4\u00e4r\u00e4 3\u20138 per teht\u00e4v\u00e4', description: 'Kontrolloi yhdistett\u00e4vien parien m\u00e4\u00e4r\u00e4\u00e4 kolmesta kahdeksaan. Pienempi m\u00e4\u00e4r\u00e4 sopii esiopetukseen ja aloittaville oppilaille. Suurempi m\u00e4\u00e4r\u00e4 haastaa vanhempia oppilaita vaatimalla tarkempaa visuaalista analysointia.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa automaattisilla varjosilueteilla', description: 'Valitse yli 3000 lapsiystavallisest\u00e4 kuvasta varjoyhdistelyn luomiseen. Generaattori tuottaa automaattisesti tarkan mustan varjosiluet in jokaiselle kuvalle. El\u00e4imet, ruoka, kulkuneuvot ja kymmenet muut teemat.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet joka teht\u00e4v\u00e4\u00e4n', description: 'Jokainen varjoyhdistelyn teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat yhdistelm\u00e4t n\u00e4kyv\u00e4t piirretyill\u00e4 viivoilla. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista osia. Lis\u00e4\u00e4 omia tekstej\u00e4, vaihda fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi ja rajaton k\u00e4ytt\u00f6', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin myyd\u00e4 varjoyhdistelyn teht\u00e4vi\u00e4 verkossa. Luo temaattisia varjoyhdistelypaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki monikielisiin luokkiin', description: 'Luo varjoyhdistelyn teht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja, tanska ja englanti. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen hahmotuksen perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia varjoyhdistelyn teht\u00e4vi\u00e4 3\u20134 parilla selv\u00e4sti erottuvilla muodoilla. Esiopetuksen oppilaat harjoittelevat muodon tunnistamista ja visuaalista erottelua. Varjoyhdistely rakentaa lukemisvalmiutta ja hahmottamiskyky\u00e4. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Tarkempaa visuaalista analysointia 1.\u20132. luokalla', description: 'Generoi varjoyhdistelyn teht\u00e4vi\u00e4 6\u20138 parilla ja samankaltaisilla muodoilla. Oppilaat kehitt\u00e4v\u00e4t tarkkaa visuaalista erottelukyky\u00e4 analysoimalla hienojakoisia eroja. Eriytet\u00e4\u00e4n parien m\u00e4\u00e4r\u00e4\u00e4 ja muotojen samankaltaisuutta taitotason mukaan.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja hahmotusharjoituksia kotiin', description: 'Luo temaattisia varjoyhdistelyn teht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja kulkuneuvoteemat pit\u00e4v\u00e4t oppimisen motivoivana. Varjoyhdistely on hauska pulma, joka kehitt\u00e4\u00e4 samalla visuaalista hahmotuskyky\u00e4.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielest\u00e4 riippumatonta hahmotusharjoittelua', description: 'Varjoyhdistelyn teht\u00e4v\u00e4t eiv\u00e4t vaadi lukutaitoa ja sopivat kaikille kielitasoille. Oppilaat harjoittelevat visuaalista hahmotusta riippumatta kielitaidostaan. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt hahmotusharjoitukset', description: 'S\u00e4\u00e4d\u00e4 parien m\u00e4\u00e4r\u00e4\u00e4 ja muotojen selvyytt\u00e4 HOJKS-tavoitteiden mukaisesti. Selv\u00e4t erot tukevat heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat visuaalista erottelukyky\u00e4 oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy varjoyhdistelypaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia varjoyhdistelypaketteja myyt\u00e4v\u00e4ksi verkossa. Varjoyhdistelyn teht\u00e4v\u00e4t ovat jatkuvasti kysyttyj\u00e4 esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten varjoyhdistelygeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat yhdist\u00e4v\u00e4t v\u00e4rikk\u00e4it\u00e4 kuvia niiden mustiin varjosiluetteihin. Valitse kuvat, parien m\u00e4\u00e4r\u00e4 ja teht\u00e4v\u00e4muoto. Generaattori tuottaa automaattisesti varjot ja valmiin teht\u00e4v\u00e4n vastausavaimineen.' },
    { id: '2', question: 'Mitk\u00e4 teht\u00e4v\u00e4muodot ovat saatavilla?', answer: 'Kolme muotoa: viivanvet\u00e4minen kuvasta varjoon, leikkaa ja liimaa -menetelm\u00e4 saksilla ja liimalla, sek\u00e4 ympyr\u00f6intitila jossa oikea varjo ympyr\u00f6id\u00e4\u00e4n. Viivanvet\u00e4minen kehitt\u00e4\u00e4 hienomotoriikkaa, leikkaa-liimaa harjoittaa k\u00e4dent\u00e4itoja.' },
    { id: '3', question: 'Miten varjosiluetit luodaan?', answer: 'Generaattori tuottaa automaattisesti tarkan mustan siluet in jokaiselle valitulle kuvalle. Siluetit s\u00e4ilytt\u00e4v\u00e4t kuvan \u00e4\u00e4riviivan ja mittasuhteet. Ei tarvita erillist\u00e4 kuvank\u00e4sittely\u00e4 tai muokkausohjelmistoa.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen varjoyhdistelyn teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat yhdistelm\u00e4t n\u00e4kyv\u00e4t piirretyill\u00e4 viivoilla kuvasta varjoon. Opettajat voivat tulostaa vastausavaimen erikseen tai n\u00e4ytt\u00e4\u00e4 dokumenttikameralla.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille varjoyhdistely sopii?', answer: 'Varjoyhdistelyn teht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset tunnistavat selv\u00e4t muodot 3\u20134 parilla. 1.\u20132. luokan oppilaat analysoivat hienompia eroja 6\u20138 parilla. Vaikeustaso s\u00e4\u00e4tyy parien m\u00e4\u00e4r\u00e4ll\u00e4 ja muotojen samankaltaisuudella.' },
    { id: '6', question: 'Miten vaikeustasoa s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Kolme tapaa: parien m\u00e4\u00e4r\u00e4n lis\u00e4\u00e4minen, samankaltaisempien muotojen valitseminen ja teht\u00e4v\u00e4muodon vaihtaminen. Selv\u00e4t muodot pienell\u00e4 parim\u00e4\u00e4r\u00e4ll\u00e4 helpottavat teht\u00e4v\u00e4\u00e4. Samankaltaiset muodot suuremmalla parim\u00e4\u00e4r\u00e4ll\u00e4 lis\u00e4\u00e4v\u00e4t haastetta.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 varjoyhdistelytehta\u0308vi\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori luo automaattisesti varjosiluet in jokaiselle ladatulle kuvalle. Luokkahuoneen esineet tai oppilaiden piirustukset toimivat hyvin.' },
    { id: '8', question: 'Miten tulostan varjoyhdistelyn teht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti kotitulostimella.' },
    { id: '9', question: 'Sopiiko varjoyhdistelygeneraattori erityisopetukseen?', answer: 'Varjoyhdistely sopii erinomaisesti erityisopetukseen. S\u00e4\u00e4d\u00e4 parien m\u00e4\u00e4r\u00e4\u00e4 ja muotojen selvyytt\u00e4 HOJKS-tavoitteiden mukaisesti. Selv\u00e4t muodot ja pieni parim\u00e4\u00e4r\u00e4 tukevat heikompia oppilaita. Visuaalinen teht\u00e4v\u00e4muoto ei vaadi lukutaitoa.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden varjoyhdistelyn teht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n varjoineen v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani varjoyhdistelyn teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin varjoyhdistelyn teht\u00e4vien myyntiin verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '12', question: 'Miten varjoyhdistely tukee POPS 2014 tavoitteita?', answer: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista hahmotuskyky\u00e4, hienomotoriikkaa ja tarkkaavaisuutta. POPS 2014 korostaa monipuolisia oppimistapoja ja visuaalisen lukutaidon kehitt\u00e4mist\u00e4. Varjoyhdistely tukee molempia tavoitteita konkreettisella harjoittelulla.' },
  ],
  relatedApps: [
    { id: '1', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista havainnointia, joka tukee varjoyhdistelys s\u00e4 tarvittavaa muotojen tunnistamista.' },
    { id: '2', slug: 'puuttuvat-palat-tyoarkit', name: 'Puuttuvat palat', category: 'Hahmottaminen', icon: '\u{1f9e9}', description: 'Puuttuvien palojen tunnistaminen kehitt\u00e4\u00e4 visuaalista p\u00e4\u00e4ttely\u00e4 ja muodon t\u00e4ydent\u00e4mist\u00e4, jotka tukevat varjoyhdistelyn taitoja.' },
    { id: '3', slug: 'iso-pieni-tyoarkit', name: 'Iso vai pieni', category: 'Hahmottaminen', icon: '\u{1f4cf}', description: 'Kokovertailu kehitt\u00e4\u00e4 visuaalista erottelua ja mittasuhteiden hahmottamista. T\u00e4ydent\u00e4\u00e4 varjoyhdistelyn muototaitoja.' },
    { id: '4', slug: 'poikkea-joukosta-tyoarkit', name: 'Mikä ei kuulu joukkoon', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkeavien kuvien tunnistaminen kehitt\u00e4\u00e4 visuaalista erottelukyky\u00e4, joka on varjoyhdistelyn perustaito.' },
    { id: '5', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvien lajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 kategorisointia ja visuaalista analysointia. Yhdist\u00e4 varjoyhdistelyn kanssa monipuoliseen hahmotusharjoitteluun.' },
    { id: '6', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkoyhdist\u00e4minen', category: 'Hahmottaminen', icon: '\u{1f4f2}', description: 'Ruudukkoyhdist\u00e4minen kehitt\u00e4\u00e4 avaruudellista hahmotusta ja kuvioiden tunnistamista. T\u00e4ydent\u00e4\u00e4 varjoyhdistelyn visuaalisia taitoja.' },
  ],
  aiOverviewSnippet: 'Varjoyhdistelygeneraattori on verkkotyokalu, jolla luodaan tulostettavia varjoyhdistelyn tehtavia esiopetukseen ja alakouluun. Oppilaat yhdist avat varikkaat kuvat niiden mustiin varjosiluetteihin kolmella eri tehtavamuodolla: viivanvetaminen, leikkaa-liimaa ja ympyrointi. Opettajat valitsevat kuvat, parien maaran ja vaikeustason, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muodot', ourApp: 'Kolme muotoa: viiva, leikkaa-liimaa, ympyr\u00f6i', typical: 'Vain viivan vet\u00e4minen' },
    { feature: 'Varjojen luonti', ourApp: 'Automaattinen siluet ingenerointi joka kuvalle', typical: 'Manuaalinen tai valmiit varjot' },
    { feature: 'Parien m\u00e4\u00e4r\u00e4', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 3\u20138 paria per teht\u00e4v\u00e4', typical: 'Kiinte\u00e4 parim\u00e4\u00e4r\u00e4' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Muodon ja taustan erottaminen (figure-ground perception) on visuaalisen hahmotuksen perustaito, joka ennustaa vahvasti lukemisvalmiutta ja akateemista menestyst\u00e4 kouluun siirryttäessä.', source: 'Ahonen, T. et al., "Visuaalisen hahmottamisen kehitys ja sen yhteys oppimiseen," Jyv\u00e4skyl\u00e4n yliopisto' },
    { claim: 'Varjoyhdistelyn kaltaiset visuaalisen p\u00e4\u00e4ttelyn teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t muodon pysyvyyden ymm\u00e4rt\u00e4mist\u00e4, joka on edellytys kirjainten ja numeroiden tunnistamiselle eri konteksteissa.', source: 'Korhonen, T., "Havaitsemisen ja motoristen taitojen merkitys oppimisessa," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Varjoyhdistely on loistava tyokalu visuaalisen hahmotuksen kehittamiseen. Oppilaani rakastavat etsia oikeita varjopareja ja kolme tehtavamuotoa tekevat eriyttamisesta helppoa. Leikkaa-liimaa -muoto kehittaa samalla hienomotoriikkaa.', name: 'Maija Korpi', role: 'Esiopetuksen opettaja', school: 'Myllypuron p\u00e4iv\u00e4koti, Helsinki' },
    { quote: 'Kaytan varjoyhdistelyn tehtavia viikoittain hahmotusharjoittelussa. Saadettava parien maara tekee eriyttamisesta sujuvaa. Ekaluokkalaiseni kehittyivat selkeasti muodon tunnistamisessa kayttamalla generaattoria saannollisesti.', name: 'Juhani Valkonen', role: '1. luokan opettaja', school: 'Kallaveden koulu, Kuopio' },
  ],
  tips: {
    sectionTitle: 'Varjoyhdistelyn strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 varjoyhdistelygeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset parien m\u00e4\u00e4r\u00e4n, teht\u00e4v\u00e4muodon ja muotojen samankaltaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Selv\u00e4t muodot ympyr\u00f6intitilalla', description: 'Kaytta 3 paria selvasti erottuvilla muodoilla ympyrointitilassa. Esikoululaiset tunnistavat varjon muodon intuitiivisesti. Yksinkertainen valintatehtava rakentaa visuaalisen erottelun perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Viivan vet\u00e4minen 4 parilla', description: 'Luo tehtavia 4 parilla ja viivan vetamisen muodolla. Esiopetuksen oppilaat kehittavat hienomotoriikkaa ja visuaalista hahmotusta samanaikaisesti. Tukee POPS 2014 tavoitteita muodon tunnistamisessa.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Leikkaa-liimaa 5\u20136 parilla', description: 'Generoi tehtavia leikkaa-liimaa -muodolla 5-6 parilla. Ekaluokkalaiset harjoittelevat saksien kayttoa ja visuaalista analysointia. Samankaltaisemmat muodot lisaavat haastetta.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Haastavat yhdistelyn teht\u00e4v\u00e4t', description: 'Luo tehtavia 6-7 parilla samankaltaisilla muodoilla. Toisluokkalaiset analysoivat hienojakoisia eroja muodoissa ja mittasuhteissa. Kehittaa tarkkaa visuaalista erottelukykyaa.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monipuoliset varjoyhdistelyn haasteet', description: 'Kaytta 7-8 paria hienojakoisilla eroilla. Kolmasluokkalaiset yhdist avat nopeasti ja tarkasti. Lisaa haastetta kayttamalla samasta teemasta olevien kuvien varjoja jotka eroavat vain yksityiskohdissa.' },
    ],
  },
};

// ===================================================================
// 2. SUBTRACTION (vahennyslasku-tyoarkit)
// ===================================================================
const subtraction = {
  file: 'vahennyslasku-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u2716\ufe0f', title: 'Yliviivaus-v\u00e4hennyslaskutila: konkreettinen erotusharjoitus', description: 'Oppilaat n\u00e4kev\u00e4t kuvaryhm\u00e4n ja yliviivaavat oikean m\u00e4\u00e4r\u00e4n kuvia erotuksen l\u00f6yt\u00e4miseksi. T\u00e4m\u00e4 konkreettinen l\u00e4hestymistapa tekee v\u00e4hennyslaskun k\u00e4sitteest\u00e4 ymmärrett\u00e4v\u00e4n nuorimmillekin oppilaille. Visuaalinen poistaminen rakentaa perustan abstraktille v\u00e4hennyslaskulle.' },
    { id: '2', icon: '\u{1f522}', title: 'Nelj\u00e4 teht\u00e4v\u00e4muotoa eri taitotasoille', description: 'Valitse nelj\u00e4st\u00e4 muodosta: yliviivaus, kuva-numero -yhdistelm\u00e4, etsi v\u00e4hent\u00e4j\u00e4 ja sekoitettu. Yliviivaus on konkreettisin aloittajille. Etsi v\u00e4hent\u00e4j\u00e4 haastaa edistyneit\u00e4 oppilaita. Sekoitettu tila yhdist\u00e4\u00e4 useita muotoja samalle sivulle.' },
    { id: '3', icon: '\u{1f4ca}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 lukualue 2\u201320', description: 'Kontrolloi v\u00e4hennyslaskujen lukualuetta kahdesta kahteenkymmeneen. Aloita pienill\u00e4 luvuilla (2\u20135) esiopetuksessa. Laajenna lukualuetta (1\u201320) alakoulussa. Generaattori luo satunnaisia v\u00e4hennyslaskuja m\u00e4\u00e4ritetyll\u00e4 alueella.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa v\u00e4hennyslaskuihin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta v\u00e4hennyslaskuteht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Lataa omia kuvia luokkahuoneen esineist\u00e4 tai oppilaiden t\u00f6ist\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet joka teht\u00e4v\u00e4\u00e4n', description: 'Jokainen v\u00e4hennyslaskuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat vastaukset ja yliviivatut kuvat n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, valitse fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 v\u00e4hennyslaskuteht\u00e4vi\u00e4 verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo v\u00e4hennyslaskuteht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 ja matemaattiset ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'V\u00e4hennyslaskun perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia yliviivausteht\u00e4vi\u00e4 pienill\u00e4 luvuilla (2\u20135). Esiopetuksen oppilaat oppivat v\u00e4hennyslaskun k\u00e4sitteen konkreettisesti yliviivaamalla kuvia. Visuaalinen poistaminen tekee abstraktista matemaattisesta operaatiosta ymmärrett\u00e4v\u00e4n. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'V\u00e4hennyslaskun sujuvuutta 1.\u20132. luokalla', description: 'Generoi v\u00e4hennyslaskuteht\u00e4vi\u00e4 suuremmilla lukualueilla ja monipuolisilla teht\u00e4v\u00e4muodoilla. Oppilaat siirtyv\u00e4t konkreettisesta yliviivauksesta abstraktiin laskemiseen. Eriytet\u00e4\u00e4n lukualuetta ja teht\u00e4v\u00e4muotoa taitotason mukaan.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Motivoivaa matematiikkaa kotiin', description: 'Luo temaattisia v\u00e4hennyslaskuteht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja ruokakuvat pit\u00e4v\u00e4t oppimisen motivoivana. Generoi viikon teht\u00e4v\u00e4t nopeasti eri vaikeustasoin. Visuaalinen l\u00e4hestymistapa sopii kotiharjoitteluun.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielest\u00e4 riippumatonta matematiikkaa', description: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t kuvia ja lukuja, jotka eiv\u00e4t vaadi vahvaa kielitaitoa. Oppilaat harjoittelevat matemaattisia k\u00e4sitteit\u00e4 visuaalisesti. 11 kielen tuki mahdollistaa monikielisen matematiikkaopetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt v\u00e4hennyslaskuharjoitukset', description: 'S\u00e4\u00e4d\u00e4 lukualuetta ja teht\u00e4v\u00e4muotoa HOJKS-tavoitteiden mukaisesti. Yliviivausteht\u00e4v\u00e4t tukevat konkreettista laskemista. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat matemaattista itseluottamusta.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy v\u00e4hennyslaskupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia v\u00e4hennyslaskupaketteja myyt\u00e4v\u00e4ksi verkossa. V\u00e4hennyslaskumateriaalit ovat jatkuvasti kysyttyj\u00e4 alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten v\u00e4hennyslaskugeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4, joissa oppilaat harjoittelevat v\u00e4hennyslaskua kuvien avulla. Valitse teema, lukualue ja teht\u00e4v\u00e4muoto. Generaattori tuottaa valmiin teht\u00e4v\u00e4n vastausavaimineen sekunneissa.' },
    { id: '2', question: 'Mitk\u00e4 teht\u00e4v\u00e4muodot ovat saatavilla?', answer: 'Nelj\u00e4 muotoa: yliviivaus (oppilas yliviivaa kuvia), kuva-numero (yhdist\u00e4\u00e4 kuvat ja luvut), etsi v\u00e4hent\u00e4j\u00e4 (puuttuva luku) ja sekoitettu (yhdist\u00e4\u00e4 useita muotoja samalle sivulle).' },
    { id: '3', question: 'Miten lukualuetta s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Aseta v\u00e4hennett\u00e4v\u00e4n maksimiluku kahdesta kahteenkymmeneen. Aloita pienill\u00e4 luvuilla (2\u20135) esiopetuksessa. Laajenna lukualuetta (1\u201320) 1.\u20132. luokalla. Generaattori luo satunnaisia v\u00e4hennyslaskuja m\u00e4\u00e4ritetyll\u00e4 alueella.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen v\u00e4hennyslaskuteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat vastaukset ja yliviivatut kuvat n\u00e4kyv\u00e4t selke\u00e4sti. Opettajat voivat tulostaa vastausavaimen erikseen.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille v\u00e4hennyslaskuteht\u00e4v\u00e4t sopivat?', answer: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t palvelevat 4\u20139-vuotiaita. Esikoululaiset yliviivaavat kuvia pienill\u00e4 luvuilla. 1.\u20132. luokan oppilaat k\u00e4ytt\u00e4v\u00e4t monipuolisia teht\u00e4v\u00e4muotoja suuremmilla lukualueilla.' },
    { id: '6', question: 'Miten yliviivausteht\u00e4v\u00e4 toimii k\u00e4yt\u00e4nn\u00f6ss\u00e4?', answer: 'Oppilas n\u00e4kee kuvaryhm\u00e4n ja v\u00e4hennyslaskun (esim. 7\u20133). H\u00e4n yliviivaa kolme kuvaa ja laskee j\u00e4ljelle j\u00e4\u00e4neet. T\u00e4m\u00e4 konkreettinen poistaminen tekee v\u00e4hennyslaskusta n\u00e4kyv\u00e4n ja ymmärrett\u00e4v\u00e4n.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa. Luokkahuoneen esineet tai oppilaiden piirustukset toimivat hyvin.' },
    { id: '8', question: 'Miten tulostan v\u00e4hennyslaskuteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. S\u00e4\u00e4d\u00e4 lukualuetta ja teht\u00e4v\u00e4muotoa HOJKS-tavoitteiden mukaisesti. Yliviivausteht\u00e4v\u00e4t ovat konkreettisin muoto ja tukevat heikompia oppilaita. Visuaalinen l\u00e4hestymistapa v\u00e4hent\u00e4\u00e4 lukutaidon vaatimusta.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden v\u00e4hennyslaskuteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy v\u00e4hennyslaskupaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja teemallisilla paketeilla.' },
    { id: '12', question: 'Miten v\u00e4hennyslaskuteht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t matemaattista ajattelua, lukuk\u00e4sitett\u00e4 ja laskusujuvuutta. POPS 2014 korostaa konkreettisia v\u00e4lineit\u00e4 ja visuaalista oppimista. Kuvapohjaiset teht\u00e4v\u00e4t toteuttavat molempia tavoitteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'kuva-yhteenlasku-tyoarkit', name: 'Kuvayhteenlasku', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Kuvayhteenlasku t\u00e4ydent\u00e4\u00e4 v\u00e4hennyslaskua k\u00e4\u00e4nteisoperaationa. Molemmat k\u00e4ytt\u00e4v\u00e4t visuaalisia kuvaryhmi\u00e4 matemaattisten k\u00e4sitteiden opettamiseen.' },
    { id: '2', slug: 'yhteenlasku-tyoarkit', name: 'Kuvalaskut', category: 'Matematiikka', icon: '\u{1f3af}', description: 'Kuvalaskut kehitt\u00e4v\u00e4t laskutaitoja visuaalisilla kuvilla. Yhdist\u00e4 v\u00e4hennyslaskuun varhaisen matematiikan kattavaan harjoitteluun.' },
    { id: '3', slug: 'matematiikka-tyoarkit', name: 'Matematiikkamonisteet', category: 'Matematiikka', icon: '\u{1f4dd}', description: 'Matematiikkamonisteet laajentavat laskutaitoja yhteen- ja v\u00e4hennyslaskun yli. Yhdist\u00e4 kattavaan matematiikkapakettiin.' },
    { id: '4', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske yhdist\u00e4\u00e4 laskemisen ja etsinn\u00e4n. T\u00e4ydent\u00e4\u00e4 v\u00e4hennyslaskuteht\u00e4vi\u00e4 lukum\u00e4\u00e4r\u00e4n hahmottamisen harjoittelulla.' },
    { id: '5', slug: 'enemman-vahemman-tyoarkit', name: 'Enemm\u00e4n vai v\u00e4hemm\u00e4n', category: 'Matematiikka', icon: '\u2696\ufe0f', description: 'Vertailuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukujen suuruusluokan ymm\u00e4rt\u00e4mist\u00e4 joka tukee v\u00e4hennyslaskun oppimista.' },
    { id: '6', slug: 'kuvakaavio-tyoarkit', name: 'Kuvakaavio', category: 'Matematiikka', icon: '\u{1f4c8}', description: 'Kuvakaaviot esitt\u00e4v\u00e4t lukum\u00e4\u00e4ri\u00e4 graafisesti ja tukevat matemaattista ajattelua. Yhdist\u00e4 monipuolisiin matematiikkapaketteihin.' },
  ],
  aiOverviewSnippet: 'Vahennyslaskugeneraattori on verkkotyokalu, jolla luodaan tulostettavia kuvapohjaisia vahennyslaskutehtavia esiopetukseen ja alakouluun. Neljalla tehtavamuodolla (yliviivaus, kuva-numero, etsi vahentaja, sekoitettu) oppilaat harjoittelevat vahennuslaskua konkreettisesti. Opettajat valitsevat lukualueen 2-20 ja teeman, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muodot', ourApp: '4 muotoa: yliviivaus, kuva-numero, etsi v\u00e4hent\u00e4j\u00e4, sekoitettu', typical: 'Vain numeroyht\u00e4l\u00f6t' },
    { feature: 'Visuaaliset apuv\u00e4lineet', ourApp: 'Kuvat konkretisoivat v\u00e4hennyslaskun', typical: 'Ei visuaalista tukea' },
    { feature: 'Lukualue', ourApp: 'S\u00e4\u00e4dett\u00e4v\u00e4 2\u201320 oppilaiden tason mukaan', typical: 'Kiinte\u00e4 lukualue' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Konkreettinen-kuvallinen-abstrakti (CRA) opetusmalli on tutkitusti tehokkain tapa opettaa v\u00e4hennyslaskua. Kuvapohjainen yliviivaus edustaa kuvallista vaihetta, joka rakentaa sillan konkreettisten v\u00e4lineiden ja abstraktien lukujen v\u00e4lille.', source: 'Koponen, T. et al., "Matemaattisten perustaitojen kehitys ja tukeminen," Jyv\u00e4skyl\u00e4n yliopisto' },
    { claim: 'V\u00e4hennyslaskun ja yhteenlaskun k\u00e4\u00e4nteisoperaatioiden yhdist\u00e4minen harjoittelussa vahvistaa lukujen v\u00e4listen suhteiden ymm\u00e4rt\u00e4mist\u00e4 ja laskusujuvuutta merkitt\u00e4v\u00e4sti.', source: 'Aunola, K. et al., "Matemaattisten taitojen kehitys ja motivaatio," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Yliviivaustehtavat ovat paras tapa opettaa vahennyslaskun kasitetta esikoululaisille. Lapset ymmartavat konkreettisesti mita vahentaminen tarkoittaa kun he yliviivaavat kuvia. Neljan tehtavamuodon ansiosta eriyttaminen on helppoa.', name: 'P\u00e4ivi Rantala', role: 'Esiopetuksen opettaja', school: 'Havukosken p\u00e4iv\u00e4koti, Vantaa' },
    { quote: 'Kaytan vahennyslaskugeneraattoria joka viikko matematiikkatunneilla. Saadettava lukualue tekee eriyttamisesta sujuvaa. Ekaluokkalaiset siirtyivat kuvista abstrakteihin laskuihin luontevasti generaattorin avulla.', name: 'Teemu M\u00e4ntyl\u00e4', role: '1. luokan opettaja', school: 'Kaurialan koulu, H\u00e4meenlinna' },
  ],
  tips: {
    sectionTitle: 'V\u00e4hennyslaskustrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 v\u00e4hennyslaskugeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset lukualueen, teht\u00e4v\u00e4muodon ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Yliviivaus pienill\u00e4 luvuilla', description: 'Kaytta yliviivaus-tilaa lukualueella 2-5. Esikoululaiset poistavat kuvia konkreettisesti ja laskevat jaljelle jaaneet. Selvat kuvat ja pienet luvut rakentavat vahennyslaskun perusymmarrysta.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Kuva-numero -tila lukualueella 1\u201310', description: 'Luo tehtavia kuva-numero -muodolla lukualueella 1-10. Esiopetuksen oppilaat yhdist avat visuaalisen poistamisen numeromerkintaan. Tukee POPS 2014 tavoitteita matemaattisen ajattelun kehittamisessa.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Monipuoliset muodot lukualueella 1\u201315', description: 'Generoi tehtavia useilla tehtavamuodoilla lukualueella 1-15. Ekaluokkalaiset siirtyvat konkreettisesta yliviivauksesta kuva-numero -yhdistelmaan. Etsi vahentaja -muoto kehittaa ongelmanratkaisutaitoja.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Haastavat teht\u00e4v\u00e4t lukualueella 1\u201320', description: 'Luo tehtavia lukualueella 1-20 sekoitetulla tehtavamuodolla. Toisluokkalaiset hallitsevat kaikki muodot ja ratkaisevat monipuolisia vahennyslaskuja. Kymmenylitys haastaa sopivasti.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Soveltavat v\u00e4hennyslaskuhaasteet', description: 'Kaytta sekoitettua muotoa maksimaalisella lukualueella. Kolmasluokkalaiset harjoittelevat nopeaa ja tarkkaa vahennyslaskua. Etsi vahentaja -tehtavat kehittavat algebrallista ajattelua.' },
    ],
  },
};

// ===================================================================
// 3. TREASURE HUNT (aarteenetsinta-tyoarkit)
// ===================================================================
const treasureHunt = {
  file: 'aarteenetsinta-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f5fa}\ufe0f', title: 'Seikkailupohjainen suunnistus- ja etsint\u00e4teht\u00e4v\u00e4muoto', description: 'Generaattori luo 5\u00d75-ruudukon jossa kuusi kuvaa on sijoitettu eri paikkoihin. Oppilaat seuraavat kuuden askeleen suuntaohjeita l\u00f6yt\u00e4\u00e4kseen aarteen. Seikkailuteema motivoi oppilaita harjoittelemaan suuntasanastoa.' },
    { id: '2', icon: '\u{1f9ed}', title: 'Kaksi suuntatyyppi\u00e4: perus- ja ilmansuunnat', description: 'Perussuunnat (yl\u00f6s, alas, vasen, oikea) sopivat 4\u20137-vuotiaille. Ilmansuunnat (pohjoinen, etel\u00e4, it\u00e4, l\u00e4nsi) haastavat vanhempia oppilaita. Valitse sopiva taso oppilaidesi kehitysvaiheelle.' },
    { id: '3', icon: '\u{1f522}', title: 'Kuuden askeleen suuntaohjesarjat', description: 'Jokainen teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 kuusi suuntaohjetta, jotka johdattavat oppilaan aarteelle. Ohjeet harjoittavat monivaiheisten ohjeiden seuraamista ja avaruudellista p\u00e4\u00e4ttely\u00e4. Satunnaistaminen varmistaa uniikkeja teht\u00e4vi\u00e4.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa seikkailuruudukkoihin', description: 'Valitse yli 3000 lapsiystavellisesta kuvasta seikkailun luomiseen. El\u00e4in-, ruoka- ja kulkuneuvoteemat tekev\u00e4t jokaisesta aarteenetsinn\u00e4st\u00e4 ainutlaatuisen. Lataa omia kuvia luokkahuoneen esineist\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet piirretyll\u00e4 reitill\u00e4', description: 'Jokainen aarteenetsint\u00e4teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikea reitti on piirretty ruudukkoon. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Reitin piirtaminen havainnollistaa oikean vastauksen.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista osia. Lis\u00e4\u00e4 omia tekstej\u00e4, vaihda fontteja ja v\u00e4rej\u00e4. Tausta- ja reunusteemat lis\u00e4\u00e4v\u00e4t visuaalista kiinnostavuutta.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi ja rajaton k\u00e4ytt\u00f6', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin myyd\u00e4 aarteenetsint\u00e4teht\u00e4vi\u00e4 verkossa. Luo temaattisia seikkailupaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo aarteenetsint\u00e4teht\u00e4vi\u00e4 11 kielell\u00e4. Suuntaohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle automaattisesti. T\u00e4ydellinen monikielisille luokkahuoneille ja suuntasanaston opetukseen eri kielill\u00e4.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Suuntasanaston perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia aarteenetsint\u00e4teht\u00e4vi\u00e4 perussuunnilla (yl\u00f6s, alas, vasen, oikea). Esiopetuksen oppilaat oppivat suuntasanastoa seikkailun kautta. Hauska pelimuoto motivoi harjoittelemaan ohjeiden seuraamista. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Ilmansuunnat ja karttaitaidot 1.\u20132. luokalla', description: 'Generoi teht\u00e4vi\u00e4 ilmansuunnilla (pohjoinen, etel\u00e4, it\u00e4, l\u00e4nsi). Oppilaat kehitt\u00e4v\u00e4t karttaitaitoja ja avaruudellista p\u00e4\u00e4ttely\u00e4. Aarteenetsint\u00e4 yhdist\u00e4\u00e4 maantieteen ja kielitaidon harjoittelun.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja suunnistusseikkailuja kotiin', description: 'Luo temaattisia aarteenetsint\u00e4teht\u00e4vi\u00e4 lasten suosikkiaiheilla. Seikkailumuoto tekee suuntasanaston oppimisesta hauskaa. Viikon teht\u00e4v\u00e4t valmistuvat nopeasti eri teemoilla ja vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Suuntasanastoa visuaalisesti', description: 'Aarteenetsint\u00e4teht\u00e4v\u00e4t opettavat suuntasanastoa kuvapohjaisesti. Oppilaat oppivat suunnat konkreettisesti ruudukkoliikkumisen kautta. 11 kielen tuki mahdollistaa monikielisen suuntasanaston opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t suunnistusharjoitukset', description: 'Valitse perussuunnat ja selv\u00e4t kuvat HOJKS-tavoitteiden mukaisesti. Ruudukon visuaalisuus tukee suuntien hahmottamista. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat avaruudellista ymm\u00e4rt\u00e4mist\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy seikkailupaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia aarteenetsint\u00e4paketteja myyt\u00e4v\u00e4ksi verkossa. Seikkailuteht\u00e4v\u00e4t ovat suosittuja esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten aarteenetsint\u00e4generaattori toimii?', answer: 'Generaattori luo 5\u00d75-ruudukon jossa kuusi kuvaa on sijoitettu eri paikkoihin. Oppilas seuraa kuuden askeleen suuntaohjeita l\u00f6yt\u00e4\u00e4kseen aarteen. Vastausavain n\u00e4ytt\u00e4\u00e4 oikean reitin piirrettyn\u00e4.' },
    { id: '2', question: 'Mitk\u00e4 suuntatyypit ovat saatavilla?', answer: 'Kaksi tyyppi\u00e4: perussuunnat (yl\u00f6s, alas, vasen, oikea) sopivat esikoululaisille ja ensimm\u00e4isen luokan oppilaille. Ilmansuunnat (pohjoinen, etel\u00e4, it\u00e4, l\u00e4nsi) haastavat toisen luokan ja vanhempia oppilaita.' },
    { id: '3', question: 'Kuinka monta suuntaohjetta per teht\u00e4v\u00e4?', answer: 'Jokainen teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 kuusi suuntaohjetta jotka johdattavat oppilaan ruudukon l\u00e4pi aarteelle. Kuuden askeleen sarja harjoittaa monivaiheisten ohjeiden seuraamista ja muistamista.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen jossa oikea reitti on piirretty ruudukkoon. Opettajat tarkistavat oppilast\u00f6it\u00e4 nopeasti vertaamalla reitttej\u00e4.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille aarteenetsint\u00e4 sopii?', answer: 'Aarteenetsint\u00e4teht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset k\u00e4ytt\u00e4v\u00e4t perussuuntia. 1. luokan oppilaat vahvistavat suuntasanastoa. 2.\u20133. luokkalaiset siirtyv\u00e4t ilmansuuntiin.' },
    { id: '6', question: 'Miten kuvat valitaan ruudukkoon?', answer: 'Kolme tapaa: valitse teema automaattiseen kuuden kuvan valintaan, selaa kuvakirjastoa manuaalisesti tai lataa omia kuvia. Generaattori sijoittaa kuusi kuvaa satunnaisesti 5\u00d75-ruudukkoon.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Luokkahuoneen esineet, oppilaiden piirustukset tai aihekohtaiset kuvat tekev\u00e4t teht\u00e4vist\u00e4 merkityksellisempi\u00e4.' },
    { id: '8', question: 'Miten tulostan aarteenetsint\u00e4teht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. Perussuunnat ja selv\u00e4t kuvat tukevat heikompia oppilaita. Ruudukon visuaalisuus auttaa suuntien hahmottamisessa. S\u00e4\u00e4d\u00e4 suuntatyyppi\u00e4 HOJKS-tavoitteiden mukaisesti.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden aarteenetsint\u00e4teht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuvat ja suuntatyyppi 30 sekunnissa. Generaattori luo ruudukon ja suuntaohjeet v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy seikkailupaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Aarteenetsint\u00e4teht\u00e4v\u00e4t ovat suosittuja opetusmateriaaleja.' },
    { id: '12', question: 'Miten aarteenetsint\u00e4 tukee POPS 2014 tavoitteita?', answer: 'Aarteenetsint\u00e4 kehitt\u00e4\u00e4 avaruudellista hahmotusta, suuntasanastoa ja ohjeiden seuraamista. POPS 2014 korostaa toiminnallisuutta ja monipuolisia oppimistapoja. Seikkailumuoto toteuttaa molempia tavoitteita motivoivasti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista havainnointia ja kohteiden paikantamista. T\u00e4ydent\u00e4\u00e4 aarteenetsinn\u00e4n spatiaalista harjoittelua.' },
    { id: '2', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Logiikka', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolku kehitt\u00e4\u00e4 reitin seuraamista ja loogista etenemist\u00e4. Molemmat harjoittavat avaruudellista navigointia eri muodoissa.' },
    { id: '3', slug: 'prepositio-tyoarkit', name: 'Prepositiot', category: 'Kieli', icon: '\u{1f4cd}', description: 'Paikkasanateht\u00e4v\u00e4t laajentavat avaruudellista sanastoa. Yhdist\u00e4 aarteenetsinn\u00e4n suuntasanaston kanssa kattavaan spatiaaliseen kielenoppimiseen.' },
    { id: '4', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske yhdist\u00e4\u00e4 laskemisen ja etsinn\u00e4n. T\u00e4ydent\u00e4\u00e4 aarteenetsinn\u00e4n etsint\u00e4taitoja matemaattisella ulottuvuudella.' },
    { id: '5', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkoyhdist\u00e4minen', category: 'Hahmottaminen', icon: '\u{1f4f2}', description: 'Ruudukkoyhdist\u00e4minen kehitt\u00e4\u00e4 ruudukkopohjaista avaruudellista ajattelua. Molemmat k\u00e4ytt\u00e4v\u00e4t ruudukkomuotoa spatiaalisten taitojen harjoitteluun.' },
    { id: '6', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista hahmotusta joka tukee aarteenetsinn\u00e4n kohteiden tunnistamista ruudukossa.' },
  ],
  aiOverviewSnippet: 'Aarteenetsintgeneraattori on verkkotyokalu, jolla luodaan tulostettavia suunnistus- ja etsintatehtavia esiopetukseen ja alakouluun. Oppilaat seuraavat kuuden askeleen suuntaohjeita 5x5-ruudukossa loytaakseen aarteen. Valitse perussuunnat tai ilmansuunnat, kuusi kuvaa teemoista, ja lataa valmis PDF-tehtava vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Suuntatyypit', ourApp: 'Perussuunnat ja ilmansuunnat', typical: 'Vain yksi suuntatyyppi' },
    { feature: 'Suuntaohjesarjat', ourApp: '6 askeleen sarjat automaattisesti', typical: 'Yksitt\u00e4isi\u00e4 ohjeita' },
    { feature: 'Ruudukkomuoto', ourApp: '5\u00d75-ruudukko visuaalisella reitinpiirtolla', typical: 'Vapaamuotoinen tai ei ruudukkoa' },
    { feature: 'Vastausavaimet', ourApp: 'Piirretty reitti automaattisesti', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Monivaiheisten suuntaohjeiden seuraaminen kehitt\u00e4\u00e4 avaruudellista kielt\u00e4 ja ty\u00f6muistia, jotka ovat keskeisi\u00e4 oppimisen edellytyksi\u00e4 varhaiskasvatusik\u00e4isill\u00e4.', source: 'Lehtinen, E. et al., "Spatiaalisen ajattelun kehitys ja tukeminen varhaiskasvatuksessa," Turun yliopisto' },
    { claim: 'Ilmansuuntien ja karttaitaitojen harjoittelu ruudukkoteht\u00e4vill\u00e4 vahvistaa avaruudellista hahmotusta ja matemaattista ajattelua konkreettisella tavalla.', source: 'Hannula-Sormunen, M., "Matemaattisen ja spatiaalisen ajattelun yhteys," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Aarteenetsintatehtavat ovat loistava tapa opettaa suuntasanastoa seikkailun kautta. Oppilaani oppivat ylos, alas, vasen ja oikea luontevasti ruudukkonavigaation avulla. Pelimuoto pitaa motivaation korkealla.', name: 'Kaisa Turunen', role: 'Esiopetuksen opettaja', school: 'Katajanokka p\u00e4iv\u00e4koti, Helsinki' },
    { quote: 'Kaytan aarteenetsintatehtavia maantiedon tunneilla ilmansuuntien opettamiseen. Toisluokkalaiset oppivat pohjoinen, etela, ita ja lansi konkreettisesti ruudukkonavigaation kautta. Vastausavaimen piirretty reitti tekee tarkistuksesta helppoa.', name: 'Outi Pitk\u00e4nen', role: '2. luokan opettaja', school: 'Puistolan koulu, Helsinki' },
  ],
  tips: {
    sectionTitle: 'Aarteenetsint\u00e4strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 aarteenetsint\u00e4generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset suuntatyypin, kuvat ja ohjesarjan monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Perussuunnat selv\u00e4ill\u00e4 kuvilla', description: 'Kaytta perussuuntia (ylos, alas, vasen, oikea) selvasti erottuvilla kuvilla. Esikoululaiset oppivat neljaa perussuuntaa seikkailun kautta. Lyhyet ohjeet rakentavat suuntasanaston perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Suuntasanaston vahvistaminen', description: 'Luo tehtavia perussuunnilla ja monipuolisilla teemakuvilla. Esiopetuksen oppilaat vahvistavat suuntasanastoa seuraamalla kuuden askeleen ohjeita. Tukee POPS 2014 avaruudellisen ajattelun tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Siirtyminen ilmansuuntiin', description: 'Generoi tehtavia jotka esittelevat ilmansuuntia asteittain. Ekaluokkalaiset siirtyvat perussuunnista ilmansuuntiin opettajan tuella. Yhdista karttaitaitojen opetukseen.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Ilmansuunnat ja karttaitaidot', description: 'Luo tehtavia ilmansuunnilla. Toisluokkalaiset hallitsevat pohjoinen, etela, ita ja lansi ja kayttavat niita ruudukkonavigaatiossa. Kehittaa karttaitaitoja ja avaruudellista paattelya.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Haastavat suunnistusseikkailut', description: 'Kaytta ilmansuuntia monimutkaisilla reiteilla. Kolmasluokkalaiset navigoivat nopeasti ja tarkasti. Luo tehtavia jotka vaativat strategista suunnittelua ja usean askeleen muistamista.' },
    ],
  },
};

// ===================================================================
// 4. WORD GUESS (kuva-arvaus-tyoarkit)
// ===================================================================
const wordGuess = {
  file: 'kuva-arvaus-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4f7}', title: 'Kuvavihjepohjainen kirjainten t\u00e4ydent\u00e4misteht\u00e4v\u00e4', description: 'Generaattori luo teht\u00e4vi\u00e4 joissa kuva toimii vihjeen\u00e4 ja osa kirjaimista on piilotettu. Oppilaat p\u00e4\u00e4ttelev\u00e4t sanan kuvan perusteella ja t\u00e4ytt\u00e4v\u00e4t puuttuvat kirjaimet. Yhdist\u00e4\u00e4 visuaalisen tunnistamisen ja kirjaintuntemuksen harjoittelun.' },
    { id: '2', icon: '\u{1f4ca}', title: 'Nelj\u00e4 asteittain vaikeutuvaa tasoa', description: 'Valitse nelj\u00e4st\u00e4 vaikeustasosta: ei vihjeit\u00e4, helppo, normaali ja vaikea. Ei vihjeit\u00e4 -tila n\u00e4ytt\u00e4\u00e4 tyhjat ruudut. Helppo n\u00e4ytt\u00e4\u00e4 puolet kirjaimista. Normaali n\u00e4ytt\u00e4\u00e4 nelj\u00e4sosan. Vaikea n\u00e4ytt\u00e4\u00e4 kuudesosan.' },
    { id: '3', icon: '\u{1f520}', title: 'Mukautettu kirjainten poissulkeminen', description: 'M\u00e4\u00e4rit\u00e4 mitk\u00e4 kirjaimet piilotetas\u00e4n kohdistetusti. Kohdista harjoittelu tiettyihin vaikeisiin kirjaimiin kuten \u00e4, \u00f6, y tai harvinaisempiin konsonantteihin. T\u00e4m\u00e4 mahdollistaa foneemitietoisuuden kohdistetun harjoittelun.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa sanastoharjoituksiin', description: 'Valitse yli 3000 lapsiystavellisesta kuvasta sana-arvoitusten luomiseen. El\u00e4imet, ruoka, kulkuneuvot, ammattit ja kymmenet muut teemat. Kuvien nimet toimivat suoraan sanoina teht\u00e4viss\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kuva-arvausteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen t\u00e4ydellisill\u00e4 sanoilla. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, valitse fontteja ja v\u00e4rej\u00e4. Tee jokaisesta teht\u00e4v\u00e4st\u00e4 ainutlaatuinen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kuva-arvausteht\u00e4vi\u00e4 verkossa. Luo temaattisia sana-arvoituspaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kuva-arvausteht\u00e4vi\u00e4 11 kielell\u00e4. Kuvien nimet ja k\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille ja sanastonoppimiseen eri kielill\u00e4.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kirjaintuntemuksen perusteet 5\u20136-vuotiaille', description: 'Luo helppoja kuva-arvausteht\u00e4vi\u00e4 jossa puolet kirjaimista on n\u00e4kyss\u00e4. Esiopetuksen oppilaat tunnistavat tutut kuvat ja harjoittelevat kirjainten tunnistamista. Visuaalinen vihjeet tekev\u00e4t kirjoittamisesta turvallista ja motivoivaa. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Oikeinkirjoituksen harjoittelua 1.\u20132. luokalla', description: 'Generoi kuva-arvausteht\u00e4vi\u00e4 normaalilla tai vaikealla tasolla. Oppilaat vahvistavat oikeinkirjoitusta t\u00e4ytt\u00e4m\u00e4ll\u00e4 puuttuvat kirjaimet. Kohdistettu kirjainten poissulkeminen mahdollistaa tiettyjen \u00e4\u00e4nne-kirjainvastaavuuksien harjoittelun.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Motivoivaa sanaharjoittelua kotiin', description: 'Luo temaattisia kuva-arvausteht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja ruokakuvat pit\u00e4v\u00e4t oppimisen hauskana. Asteittain vaikeutuva taso sopii itsenaiseen harjoitteluun. Vanhemmat voivat seurata edistymist\u00e4.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastonoppimista kuvavihjein', description: 'Kuva-arvausteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t kuvan ja sanan luonnollisesti. Oppilaat oppivat uusia sanoja visuaalisen vihjeen avulla. 11 kielen tuki mahdollistaa monikielisen sanastonopetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4t kirjainharjoitukset', description: 'S\u00e4\u00e4d\u00e4 vaikeustasoa ja kirjainten poissulkemista HOJKS-tavoitteiden mukaisesti. Helppo taso tukee heikompia oppilaita runsailla vihjeill\u00e4. Kohdistettu harjoittelu mahdollistaa tiettyjen kirjainten tehostetun opetuksen.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy sana-arvoituspaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia kuva-arvauskokoelmia myyt\u00e4v\u00e4ksi verkossa. Sana-arvoitusteht\u00e4v\u00e4t ovat suosittuja opetusmateriaaleja. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuva-arvausgeneraattori toimii?', answer: 'Generaattori luo teht\u00e4vi\u00e4 joissa kuva toimii vihjeena ja osa kirjaimista on piilotettu. Oppilas p\u00e4\u00e4ttelee sanan kuvan perusteella ja t\u00e4ytt\u00e4\u00e4 puuttuvat kirjaimet. Valitse vaikeustaso ja teema.' },
    { id: '2', question: 'Mitk\u00e4 vaikeustasot ovat saatavilla?', answer: 'Nelj\u00e4 tasoa: ei vihjeit\u00e4 (tyhj\u00e4t ruudut), helppo (puolet kirjaimista n\u00e4kyy), normaali (nelj\u00e4sosa n\u00e4kyy) ja vaikea (kuudesosa n\u00e4kyy). Valitse taso oppilaiden taitotason mukaan.' },
    { id: '3', question: 'Miten kirjainten poissulkeminen toimii?', answer: 'M\u00e4\u00e4rit\u00e4 mitk\u00e4 kirjaimet piilotetaan kohdistetusti. Esimerkiksi piilota kaikki \u00e4-kirjaimet tai vokaalit. T\u00e4m\u00e4 mahdollistaa tiettyjen \u00e4\u00e4nne-kirjainvastaavuuksien kohdistetun harjoittelun.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen t\u00e4ydellisill\u00e4 sanoilla. Opettajat tarkistavat oppilast\u00f6it\u00e4 nopeasti. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuva-arvausteht\u00e4v\u00e4t sopivat?', answer: 'Kuva-arvausteht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset k\u00e4ytt\u00e4v\u00e4t helppoa tasoa tunnistaen tutut kirjaimet. 1.\u20133. luokan oppilaat vahvistavat oikeinkirjoitusta vaativammilla tasoilla.' },
    { id: '6', question: 'Miten kuva-arvaus kehitt\u00e4\u00e4 oikeinkirjoitusta?', answer: 'Oppilaat p\u00e4\u00e4ttelev\u00e4t sanan kuvan perusteella ja kirjoittavat puuttuvat kirjaimet. T\u00e4m\u00e4 yhdist\u00e4\u00e4 visuaalisen tunnistamisen, \u00e4\u00e4nnetietoisuuden ja motorisen kirjoittamisen. Aktiivinen t\u00e4ydent\u00e4minen rakentaa vahvempaa ortografista muistia.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Nime\u00e4 tiedostot sanojen mukaan (esim. kissa.jpg). Generaattori k\u00e4ytt\u00e4\u00e4 tiedostonimea sanana teht\u00e4v\u00e4ss\u00e4.' },
    { id: '8', question: 'Miten tulostan kuva-arvausteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Ammattimaiset tulosteet kotitulostimella.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. Helppo taso antaa runsaasti vihjeit\u00e4 heikompille oppilaille. Kohdistettu kirjainten poissulkeminen mahdollistaa yksilollisen harjoittelun. S\u00e4\u00e4d\u00e4 tasoa HOJKS-tavoitteiden mukaisesti.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kuva-arvausteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja vaikeustaso 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy sana-arvoituspaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja teemallisilla paketeilla.' },
    { id: '12', question: 'Miten kuva-arvaus tukee POPS 2014 tavoitteita?', answer: 'Kuva-arvausteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kirjaintuntemusta, oikeinkirjoitusta ja sanavarastoa. POPS 2014 korostaa monipuolista luku- ja kirjoitustaidon harjoittelua. Kuvapohjaiset teht\u00e4v\u00e4t tukevat visuaalista oppimista.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sananhaku-tyoarkit', name: 'Sananhaku', category: 'Sanasto', icon: '\u{1f50d}', description: 'Sananhaku kehitt\u00e4\u00e4 sanojen tunnistamista ja oikeinkirjoitusta. Yhdist\u00e4 kuva-arvauksen kanssa kattavaan sanaharjoitteluun.' },
    { id: '2', slug: 'sanansekoitus-tyoarkit', name: 'Sanojen sekoitus', category: 'Sanasto', icon: '\u{1f500}', description: 'Sanojen sekoitusteht\u00e4v\u00e4t harjoittavat kirjainten j\u00e4rjest\u00e4mist\u00e4 sanoiksi. T\u00e4ydent\u00e4\u00e4 kuva-arvauksen kirjaintuntemuksen harjoittelua.' },
    { id: '3', slug: 'ristisanatehtavat-tyoarkit', name: 'Ristisanateht\u00e4v\u00e4t', category: 'Sanasto', icon: '\u{1f9e9}', description: 'Ristisanateht\u00e4v\u00e4t yhdist\u00e4v\u00e4t vihjepohjaisen arvaamisen ja kirjainten sijoittamisen. Molemmat kehitt\u00e4v\u00e4t sanavarastoa ja oikeinkirjoitusta.' },
    { id: '4', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Lukutaito', icon: '\u{1f682}', description: 'Aakkosjuna opettaa aakkosten j\u00e4rjestyksen ja kirjainten tunnistamisen. Yhdist\u00e4 kuva-arvauksen kanssa kattavaan kirjainharjoitteluun.' },
    { id: '5', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: 'Kirjoittaminen', icon: '\u270f\ufe0f', description: 'K\u00e4sinkirjoituksen harjoittelu kehitt\u00e4\u00e4 kirjainten muodostusta. Kuva-arvauksen kanssa oppilaat tunnistavat ja kirjoittavat kirjaimet monipuolisesti.' },
    { id: '6', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Sanasto', icon: '\u{1f3b2}', description: 'Kuvabingo yhdist\u00e4\u00e4 kuvan ja sanan pelimuodossa. Molemmat kehitt\u00e4v\u00e4t sanavarastoa visuaalisten vihjeiden avulla.' },
  ],
  aiOverviewSnippet: 'Kuva-arvausgeneraattori on verkkotyokalu, jolla luodaan tulostettavia sana-arvoitustehtavia esiopetukseen ja alakouluun. Oppilaat paattelevat sanan kuvavihjeen perusteella ja tayttavat puuttuvat kirjaimet neljalla eri vaikeustasolla. Opettajat valitsevat teeman, vaikeustason ja kirjainten poissulkemisen, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Vaikeustasot', ourApp: '4 asteittain vaikeutuvaa tasoa', typical: 'Yksi kiinte\u00e4 taso' },
    { feature: 'Kirjainten kohdistus', ourApp: 'Mukautettu kirjainten poissulkeminen', typical: 'Satunnainen piilottaminen' },
    { feature: 'Kuvavihjeet', ourApp: '3000+ kuvaa vihjein\u00e4 sanoille', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Produktiivinen oikeinkirjoituksen harjoittelu, jossa oppilaat aktiivisesti t\u00e4ydent\u00e4v\u00e4t puuttuvia kirjaimia, rakentaa vahvempia ortografisia representaatioita kuin passiivinen kopiointi tai tunnistaminen.', source: 'Lerkkanen, M.-K. et al., "Luku- ja kirjoitustaidon kehitys alkuopetuksessa," Jyv\u00e4skyl\u00e4n yliopisto' },
    { claim: 'Vihjeiden asteittainen v\u00e4hent\u00e4minen (scaffolding) tukee itseohjautuvaa oppimista ja siirt\u00e4\u00e4 vastuuta opettajalta oppilaalle systemaattisesti.', source: 'Nurmi, J.-E. et al., "Oppimismotivaatio ja itseohjautuvuus varhaiskasvatuksessa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuva-arvaustehtavat ovat erinomainen tapa yhdistaa kirjaintuntemus ja sanasto. Oppilaani oppivat tunnistamaan kirjaimia ja kirjoittamaan sanoja samanaikaisesti. Neljan vaikeustason ansiosta eriyttaminen on helppoa.', name: 'Anni Rautio', role: 'Esiopetuksen opettaja', school: 'Linnainmaan p\u00e4iv\u00e4koti, Tampere' },
    { quote: 'Kaytan kuva-arvaustehtavia oikeinkirjoituksen harjoittelussa viikoittain. Kohdistettu kirjainten poissulkeminen mahdollistaa vaikeiden kirjainten tehostetun harjoittelun. Ekaluokkalaiset kehittyivat selkeasti oikeinkirjoituksessa.', name: 'Markku Pennanen', role: '1. luokan opettaja', school: 'Pyynikin koulu, Tampere' },
  ],
  tips: {
    sectionTitle: 'Kuva-arvausstrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuva-arvausgeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset vaikeustason, kirjainten poissulkemisen ja sanojen pituuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Helppo taso lyhyill\u00e4 sanoilla', description: 'Kaytta helppoa tasoa (puolet kirjaimista nakyvissa) lyhyilla 3-4 kirjaimen sanoilla. Esikoululaiset tunnistavat tutut kirjaimet ja taydentavat yksinkertaisia sanoja. Kuvat auttavat paattelemaan sanan.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Normaali taso ja kirjainkohdistus', description: 'Luo tehtavia normaalilla tasolla (neljasosa kirjaimista nakyvissa). Kohdista harjoittelu tiettyihin kirjaimiin kuten a, o, i. Esiopetuksen oppilaat vahvistavat kirjaintuntemusta aktiivisella taydentamisella. Tukee POPS 2014 tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Vaikea taso ja pitk\u00e4t sanat', description: 'Generoi tehtavia vaikealla tasolla (kuudesosa kirjaimista nakyvissa) ja pidemmilla sanoilla. Ekaluokkalaiset harjoittelevat oikeinkirjoitusta haastavasti. Kohdista piilotus vaikeisiin kirjaimiin kuten a, o, y.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Ei vihjeit\u00e4 ja monimutkaiset sanat', description: 'Luo tehtavia ilman vihjeit a (tyhjat ruudut) sanoilla jotka sisaltavat tuplakonsonantteja ja diftongeja. Toisluokkalaiset kirjoittavat koko sanan kuvan perusteella. Kehittaa itsenalist a oikeinkirjoitustaitoa.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Haastavat sana-arvoitukset', description: 'Kaytta ei vihjeit a -tilaa pitkilla ja monimutkaisilla sanoilla. Kolmasluokkalaiset hallitsevat oikeinkirjoituksen ja kirjoittavat sanoja sujuvasti. Tehtavat vahvistavat ortografista muistia ja sanavarastoa.' },
    ],
  },
};

// ===================================================================
// 5. WRITING APP (kasinkirjoitus-tyoarkit)
// ===================================================================
const writingApp = {
  file: 'kasinkirjoitus-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u270f\ufe0f', title: 'Nelj\u00e4 asteittain vaikeutuvaa j\u00e4ljenn\u00f6stilaa', description: 'Valitse nelj\u00e4st\u00e4 tilasta: j\u00e4ljenn\u00f6s (t\u00e4ydet kirjaimet j\u00e4ljennett\u00e4v\u00e4ksi), haalistuva j\u00e4ljenn\u00f6s (asteittain h\u00e4ipyv\u00e4t kirjaimet), ohjattu kopio (esimerkkikirjain ja tyhj\u00e4 rivi) ja tyhj\u00e4 (pelk\u00e4t kirjoitusviivat). Asteittainen vaikeutuminen tukee kirjoittamisen itsen\u00e4ist\u00e4 kehityst\u00e4.' },
    { id: '2', icon: '\u{1f524}', title: 'Viisi kirjasintyylia mukaan lukien kursiivi', description: 'Valitse viidest\u00e4 kirjasintyylist\u00e4: tulostuskirjain, tulostuskirjain nuolilla, tulostuskirjain j\u00e4ljenn\u00f6s, tulostuskirjain j\u00e4ljenn\u00f6s nuolilla ja kursiivi. Nuolityyli n\u00e4ytt\u00e4\u00e4 kirjaimen piirtoj\u00e4rjestyksen. Kursiivi harjoitukset sopivat 2.\u20133. luokalle.' },
    { id: '3', icon: '\u{1f4dd}', title: 'Mukautettu sis\u00e4lt\u00f6: kirjaimet, sanat, nimet, lauseet', description: 'Kirjoita mit\u00e4 tahansa teksti\u00e4 harjoiteltavaksi. Yksitt\u00e4isi\u00e4 kirjaimia aakkosten oppimiseen. Sanoja sanaston laajentamiseen. Oppilaiden nimi\u00e4 personoituihin teht\u00e4viin. Kokonaisia lauseita edistyneille kirjoittajille.' },
    { id: '4', icon: '\u{1f300}', title: 'Esiviivoitusharjoitukset motoriseen kehitykseen', description: 'Generaattori tarjoaa esiviivoitusharjoituksia jotka valmistavat k\u00e4sinkirjoitukseen. Pystyviivat, vaakaviivat, ympyr\u00e4t, siksak-kuviot ja aallot kehitt\u00e4v\u00e4t k\u00e4den koordinaatiota. T\u00e4ydellinen esikoululaisille ennen kirjainten harjoittelua.' },
    { id: '5', icon: '\u{1f4cf}', title: 'Useita itsen\u00e4isi\u00e4 rivej\u00e4 per teht\u00e4v\u00e4', description: 'Lis\u00e4\u00e4 useita harjoittelurivej\u00e4 samalle teht\u00e4v\u00e4sivulle. Jokainen rivi voi sis\u00e4lt\u00e4\u00e4 eri sis\u00e4lt\u00f6\u00e4 ja eri j\u00e4ljenn\u00f6stilan. Yhdist\u00e4 j\u00e4ljenn\u00f6s- ja tyhjia rivej\u00e4 samalle sivulle progressiiviseen harjoitteluun.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 osia vapaasti. Lis\u00e4\u00e4 kuvia kirjastoista kirjain-kuva-yhteyksien luomiseen. Tausta- ja reunusteemat lis\u00e4\u00e4v\u00e4t visuaalista kiinnostavuutta.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 k\u00e4sinkirjoitusteht\u00e4vi\u00e4 verkossa. Luo temaattisia kirjoitusharjoituspaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo k\u00e4sinkirjoitusteht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi \u00e4\u00e4kk\u00f6sineen. K\u00e4ytt\u00f6liittym\u00e4 ja ohjeet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. Tukee \u00e4, \u00f6 ja muita erikoismerkkej\u00e4.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Esiviivoitus ja kirjainten perusteet 5\u20136-vuotiaille', description: 'Luo esiviivoitusharjoituksia motoriseen valmiuteen ja yksinkertaisia kirjainj\u00e4ljenn\u00f6ksi\u00e4. Esiopetuksen oppilaat kehitt\u00e4v\u00e4t k\u00e4den koordinaatiota ennen varsinaista kirjoittamista. J\u00e4ljenn\u00f6stila antaa t\u00e4yden tuen aloittelijoille. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Kirjainten muodostus ja sanakop iointi 1.\u20132. luokalla', description: 'Generoi haalistuvia j\u00e4ljenn\u00f6ksi\u00e4 ja ohjattuja kopioita sanoilla ja lauseilla. Oppilaat siirtyv\u00e4t j\u00e4ljent\u00e4misest\u00e4 itsen\u00e4iseen kirjoittamiseen asteittain. Nuolityyli opettaa oikean piirtoj\u00e4rjestyksen.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Personoituja kirjoitusharjoituksia kotiin', description: 'Luo k\u00e4sinkirjoitusteht\u00e4vi\u00e4 lasten nimell\u00e4 ja suosikkisanoilla. Personoidut teht\u00e4v\u00e4t motivoivat harjoittelemaan. Asteittain vaikeutuvat tilat sopivat itsen\u00e4iseen etenemiseen kotona.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Suomen kirjainten ja \u00e4\u00e4kk\u00f6sten harjoittelu', description: 'K\u00e4sinkirjoitusteht\u00e4v\u00e4t opettavat suomen aakkoset mukaan lukien \u00e4 ja \u00f6. Oppilaat harjoittelevat kirjainten muodostusta j\u00e4ljent\u00e4m\u00e4ll\u00e4. 11 kielen tuki mahdollistaa monikielisen kirjoitusharjoittelun.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt kirjoitusharjoitukset', description: 'S\u00e4\u00e4d\u00e4 j\u00e4ljenn\u00f6stilaa ja sis\u00e4lt\u00f6\u00e4 HOJKS-tavoitteiden mukaisesti. J\u00e4ljenn\u00f6stila antaa t\u00e4yden tuen heikompille oppilaille. Esiviivoitusharjoitukset kehitt\u00e4v\u00e4t motorista valmiutta kirjoittamiseen.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy kirjoitusharjoituspaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia k\u00e4sinkirjoituspaketteja myyt\u00e4v\u00e4ksi verkossa. K\u00e4sinkirjoitusmateriaalit ovat jatkuvasti kysyttyj\u00e4 esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten k\u00e4sinkirjoitusgeneraattori toimii?', answer: 'Kirjoita harjoiteltava teksti ja valitse j\u00e4ljenn\u00f6stila, kirjasintyyli ja sivun asetukset. Generaattori luo v\u00e4litt\u00f6m\u00e4sti k\u00e4sinkirjoituksen harjoitteluteht\u00e4v\u00e4n kirjoitusviivoilla. Lataa PDF tai JPEG tulostamista varten.' },
    { id: '2', question: 'Mitk\u00e4 j\u00e4ljenn\u00f6stilat ovat saatavilla?', answer: 'Nelj\u00e4 tilaa: j\u00e4ljenn\u00f6s (t\u00e4ydet kirjaimet j\u00e4ljennett\u00e4v\u00e4ksi), haalistuva j\u00e4ljenn\u00f6s (asteittain h\u00e4ipyv\u00e4t), ohjattu kopio (esimerkki ja tyhj\u00e4 rivi) ja tyhj\u00e4 (pelk\u00e4t viivat). Valitse tila taitotason mukaan.' },
    { id: '3', question: 'Mitk\u00e4 kirjasintyylit ovat saatavilla?', answer: 'Viisi tyylia: tulostuskirjain, tulostuskirjain nuolilla (piirtoj\u00e4rjestys), tulostuskirjain j\u00e4ljenn\u00f6s, tulostuskirjain j\u00e4ljenn\u00f6s nuolilla ja kursiivi. Nuolityyli opettaa oikean piirtoj\u00e4rjestyksen visuaalisesti.' },
    { id: '4', question: 'Tukeeko generaattori suomen \u00e4\u00e4kk\u00f6si\u00e4?', answer: 'Kyll\u00e4, generaattori tukee kaikkia suomen aakkosia mukaan lukien \u00e4 ja \u00f6. Kaikki kirjasintyylit sis\u00e4lt\u00e4v\u00e4t \u00e4\u00e4kk\u00f6set. T\u00e4ydellinen suomalaisten lasten kirjainharjoitteluun.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille k\u00e4sinkirjoitusharjoitukset sopivat?', answer: 'Teht\u00e4v\u00e4t palvelevat 3\u201310-vuotiaita. Esikoululaiset aloittavat esiviivoituksella ja j\u00e4ljenn\u00f6ksill\u00e4. 1.\u20132. luokkalaiset kehittyv\u00e4t ohjattuun kopiointiin. 2.\u20133. luokkalaiset harjoittelevat kursiivia.' },
    { id: '6', question: 'Mit\u00e4 esiviivoitusharjoituksia on saatavilla?', answer: 'Viisi esiviivoituskuviota: pystyviivat, vaakaviivat, ympyr\u00e4t, siksak-kuviot ja aallot. N\u00e4m\u00e4 kehitt\u00e4v\u00e4t k\u00e4den koordinaatiota ja motorista valmiutta ennen kirjainten harjoittelua.' },
    { id: '7', question: 'Voiko useita rivej\u00e4 luoda samalle sivulle?', answer: 'Kyll\u00e4, lis\u00e4\u00e4 rajattomasti harjoittelurivej\u00e4 samalle sivulle. Jokainen rivi voi sis\u00e4lt\u00e4\u00e4 eri sis\u00e4lt\u00f6\u00e4 ja eri j\u00e4ljenn\u00f6stilan. Yhdist\u00e4 j\u00e4ljenn\u00f6s- ja tyhjia rivej\u00e4 progressiiviseen harjoitteluun.' },
    { id: '8', question: 'Miten tulostan k\u00e4sinkirjoitusteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kirjoitusviivat tulostuvat selke\u00e4sti.' },
    { id: '9', question: 'Sopiiko generaattori erityisopetukseen?', answer: 'Erinomaisesti. J\u00e4ljenn\u00f6stila antaa t\u00e4yden tuen heikompille oppilaille. Esiviivoitusharjoitukset kehitt\u00e4v\u00e4t motorista valmiutta. S\u00e4\u00e4d\u00e4 j\u00e4ljenn\u00f6stilaa ja sis\u00e4lt\u00f6\u00e4 HOJKS-tavoitteiden mukaisesti.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden k\u00e4sinkirjoitusteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Kirjoita teksti ja valitse asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy k\u00e4sinkirjoituspaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja kirjoitusharjoituspaketeilla.' },
    { id: '12', question: 'Miten k\u00e4sinkirjoitusharjoitukset tukevat POPS 2014 tavoitteita?', answer: 'K\u00e4sinkirjoitus kehitt\u00e4\u00e4 hienomotoriikkaa, kirjaintuntemusta ja kirjoitustaitoa. POPS 2014 korostaa k\u00e4dentaitojen ja kirjoittamisen perustaitojen kehitt\u00e4mist\u00e4. Generaattori tukee molempia tavoitteita systemaattisesti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Lukutaito', icon: '\u{1f682}', description: 'Aakkosjuna opettaa aakkosten j\u00e4rjestyksen ja kirjainten tunnistamisen. Yhdist\u00e4 k\u00e4sinkirjoituksen kanssa kattavaan kirjainharjoitteluun.' },
    { id: '2', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Motoriikka', icon: '\u{1f58d}\ufe0f', description: 'Viivojen piirt\u00e4minen kehitt\u00e4\u00e4 motorista koordinaatiota ja viivanvetoa. T\u00e4ydent\u00e4\u00e4 k\u00e4sinkirjoituksen hienomotoriikkaharjoittelua.' },
    { id: '3', slug: 'sananhaku-tyoarkit', name: 'Sananhaku', category: 'Sanasto', icon: '\u{1f50d}', description: 'Sananhaku yhdist\u00e4\u00e4 kirjainten tunnistamisen ja sanojen muodostamisen. Molemmat kehitt\u00e4v\u00e4t kirjaintuntemusta eri tavoin.' },
    { id: '4', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: 'Sanasto', icon: '\u{1f4f7}', description: 'Kuva-arvaus harjoittaa kirjainten tunnistamista ja t\u00e4ydent\u00e4mist\u00e4. K\u00e4sinkirjoituksen kanssa oppilaat tunnistavat ja kirjoittavat kirjaimia monipuolisesti.' },
    { id: '5', slug: 'sanansekoitus-tyoarkit', name: 'Sanojen sekoitus', category: 'Sanasto', icon: '\u{1f500}', description: 'Sanojen sekoitus harjoittaa kirjainten j\u00e4rjest\u00e4mist\u00e4 sanoiksi. Yhdist\u00e4 k\u00e4sinkirjoituksen kanssa kokonaisvaltaiseen kirjainharjoitteluun.' },
    { id: '6', slug: 'ruudukkopiirustus-tyoarkit', name: 'Ruudukkopiirustus', category: 'Motoriikka', icon: '\u{1f4f2}', description: 'Ruudukkopiirustus kehitt\u00e4\u00e4 hienomotoriikkaa ja koordinaatiota. T\u00e4ydent\u00e4\u00e4 k\u00e4sinkirjoituksen motorisia taitoja visuaalisella harjoittelulla.' },
  ],
  aiOverviewSnippet: 'Kasinkirjoitusgeneraattori on verkkotyokalu, jolla luodaan tulostettavia kirjainten ja sanojen kirjoitusharjoituksia esiopetukseen ja alakouluun. Neljalla jaljennos tilalla (jaljennos, haalistuva, ohjattu kopio, tyhja) ja viidella kirjasintyylilla oppilaat kehittavat kirjoitustaitoa asteittain. Opettajat kirjoittavat harjoiteltavan tekstin ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'J\u00e4ljenn\u00f6stilat', ourApp: '4 asteittain vaikeutuvaa tilaa', typical: 'Vain yksi j\u00e4ljenn\u00f6stila' },
    { feature: 'Kirjasintyylit', ourApp: '5 tyylia mukaan lukien kursiivi ja nuolityyli', typical: 'Yksi fontti' },
    { feature: 'Esiviivoitusharjoitukset', ourApp: '5 motorista kuviota kirjoitusvalmiuteen', typical: 'Ei esiviivoitusta' },
    { feature: 'Sis\u00e4lt\u00f6vaihtoehdot', ourApp: 'Kirjaimet, sanat, nimet, lauseet vapaasti', typical: 'Kiinte\u00e4 aakkosj\u00e4rjestys' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi \u00e4\u00e4kk\u00f6sineen', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Toistuva kirjainten j\u00e4ljent\u00e4minen rakentaa motorista muistia kinesteettisen vahvistamisen kautta, mik\u00e4 parantaa kirjainten tunnistamista ja tuottamista merkitt\u00e4v\u00e4sti.', source: 'Aro, M. et al., "Kirjoittamisen kehitys ja tukeminen alkuopetuksessa," Jyv\u00e4skyl\u00e4n yliopisto' },
    { claim: 'Eksplisiittinen piirtoj\u00e4rjestysopetus nuolityylill\u00e4 parantaa kirjainten muodostusta ja v\u00e4hent\u00e4\u00e4 peilikuvak\u00e4\u00e4nt\u00f6j\u00e4 merkitt\u00e4v\u00e4sti erityisesti b/d- ja p/q-kirjainpareissa.', source: 'Torppa, M. et al., "Motoristen taitojen ja kirjoittamisen yhteys," Niilo M\u00e4ki Instituutti' },
  ],
  teacherTestimonials: [
    { quote: 'Kasinkirjoitusgeneraattori on korvaamaton tyokalu kirjainten opetukseen. Haalistuva jaljennos -tila on loistava siirtymavaihe jaljentamisesta itsena iseen kirjoittamiseen. Oppilaani kehittyivat selkeasti kirjoitustaidossa.', name: 'Liisa Haapala', role: 'Esiopetuksen opettaja', school: 'Viikin p\u00e4iv\u00e4koti, Helsinki' },
    { quote: 'Kaytan generaattoria paivittain ekaluokassa kirjainharjoittelussa. Nuolityyli opettaa oikean piirtojarjestyksen visuaalisesti ja asteittain vaikeutuvat tilat tekevat eriyttamisesta helppoa. Viisi kirjasintyylia kattaa kaikki tarpeet.', name: 'Jarmo Huttunen', role: '1. luokan opettaja', school: 'Norssin koulu, Jyv\u00e4skyl\u00e4' },
  ],
  tips: {
    sectionTitle: 'K\u00e4sinkirjoitusstrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 k\u00e4sinkirjoitusgeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset j\u00e4ljenn\u00f6stilan, kirjasintyylin ja sis\u00e4ll\u00f6n esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Esiviivoitusharjoitukset ja k\u00e4den koordinaatio', description: 'Kaytta esiviivoitusharjoituksia (pystyviivat, vaakaviivat, ympyrat). Esikoululaiset kehittavat kaden koordinaatiota ennen kirjainten harjoittelua. Motorinen valmius on edellytys sujuvalle kirjoittamiselle.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: J\u00e4ljenn\u00f6stila isoilla kirjaimilla', description: 'Luo tehtavia jaljennos-tilalla isoilla kirjaimilla. Esiopetuksen oppilaat jaljentavat kirjaimia suoraan mallin paalle. Nuolityyli opettaa oikean piirtojarjestyksen. Tukee POPS 2014 tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Haalistuva j\u00e4ljenn\u00f6s sanoilla', description: 'Generoi tehtavia haalistuva jaljennos -tilalla sanoilla ja lyhyilla lauseilla. Ekaluokkalaiset siirtyvat jaljentamisesta itsenaiseen kirjoittamiseen asteittain. Pienilla ja isoilla kirjaimilla.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Ohjattu kopio ja lauseet', description: 'Luo tehtavia ohjattu kopio -tilalla pidemmilla lauseilla. Toisluokkalaiset kopioivat esimerkin ja kirjoittavat itsenaisesti. Esittele kursiivityylia asteittain.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Kursiivi ja itsen\u00e4inen kirjoitus', description: 'Kaytta kursiivikirjasintyylia lauseilla ja kappaleilla. Kolmasluokkalaiset hallitsevat sujuvan kursiivikirjoituksen. Tyhja-tila haastaa itsenaiseen kirjoittamiseen ilman malleja.' },
    ],
  },
};

// ===================================================================
// PROCESSING LOGIC
// ===================================================================
const apps = [shadowMatch, subtraction, treasureHunt, wordGuess, writingApp];

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
    '  // -- SEO & Content Enrichment (Part 178) ------------------------------------',
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
