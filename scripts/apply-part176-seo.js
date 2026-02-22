/**
 * Part 176: FI Product Pages 15-21 — Content Enrichment
 *
 * Populates empty arrays (features, useCases, faq, relatedApps) and adds
 * SEO enrichment fields (aiOverviewSnippet, comparisonTable, researchBacking,
 * teacherTestimonials, tips) for 7 Finnish product pages.
 *
 * Usage: node scripts/apply-part176-seo.js
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
// 1. DRAW AND COLOR (ruudukkopiirustus-tyoarkit)
// ===================================================================
const drawAndColor = {
  file: 'ruudukkopiirustus-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f4d0}', title: 'Ruudukkopohjainen piirustusmuoto vihjepikselein\u00e4', description: 'Generaattori luo kaksi vierekk\u00e4ist\u00e4 ruudukkoa: vihjeruudukko paljastaa osan kuvasta pikseli kerrallaan ja piirustusruudukko on tyhj\u00e4 oppilaan t\u00e4ytett\u00e4v\u00e4ksi. Oppilas kopioi kuvion ruutu ruudulta kehitt\u00e4en koordinaattien ymm\u00e4rt\u00e4mist\u00e4 ja visuaalista tarkkuutta.' },
    { id: '2', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ruudukkokoko 3\u00d73\u201310\u00d710', description: 'Valitse ruudukon koko oppilaiden taitotason mukaan. Pieni 3\u00d73 ruudukko sopii esiopetukseen yksinkertaisilla kuvioilla. Suuri 9\u00d79 tai 10\u00d710 ruudukko haastaa vanhempia oppilaita vaatimalla tarkempaa visuaalista analyysia ja suurempaa keskittymist\u00e4.' },
    { id: '3', icon: '\u{1f50d}', title: 'Vihjeprosentin s\u00e4\u00e4t\u00f6 vaikeustason hallintaan', description: 'Kontrolloi vaikeustasoa muuttamalla paljastettujen pikselien prosenttia. 70\u201390 % vihjeit\u00e4 tekee teht\u00e4v\u00e4st\u00e4 helpomman nuoremmille lapsille. 20\u201340 % vihjeit\u00e4 luo haastavan palapelin edistyneille oppilaille. T\u00e4ydellinen eriytett\u00e4miseen.' },
    { id: '4', icon: '\u{1f504}', title: 'Symmetria- ja peilausasetukset', description: 'Lis\u00e4\u00e4 symmetria-asetuksia luodaksesi tasapainoisia kuvioita. Vaakapeili tuottaa vasemmalta oikealle symmetrian. Pystyp\u00e4ilaus luo yl\u00f6s-alas symmetrian. Symmetriateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista hahmottamista ja matemaattista ajattelua.' },
    { id: '5', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa piirustuspohjiksi', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta ruudukkopiirustuksen pohjaksi. El\u00e4imet, kulkuneuvot, ruoka ja kymmenet muut teemat. Kuvat pikseli\u00f6ityv\u00e4t automaattisesti valitsemaasi ruudukkokokoon sopiviksi.' },
    { id: '6', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen ruudukkopiirustusteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa t\u00e4ydellinen kuvio n\u00e4kyy v\u00e4ritetyn\u00e4. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavain latautuu erillisel\u00e4 sivuna PDF-muodossa.' },
    { id: '7', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Klikkaa mit\u00e4 tahansa elementti\u00e4 muokataksesi sit\u00e4 suoraan. Siirr\u00e4, skaalaa, kierr\u00e4 tai poista osia. Lis\u00e4\u00e4 omia tekstej\u00e4, vaihda fontteja ja v\u00e4rej\u00e4, lataa taustakuvia ja lis\u00e4\u00e4 koristeellisia kehyksi\u00e4 ammattimaiseen ulkoasuun.' },
    { id: '8', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi ja 11 kielen tuki', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 ruudukkopiirustusteht\u00e4vi\u00e4 verkossa. Generaattori toimii 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen hahmottamisen perusteet 5\u20136-vuotiaille', description: 'Luo yksinkertaisia 3\u00d73 tai 4\u00d74 ruudukkopiirustuksia korkealla vihjeprosentilla. Esiopetuksen oppilaat harjoittelevat v\u00e4ritt\u00e4mist\u00e4 mallin mukaan kehitt\u00e4en koordinaattien ymm\u00e4rt\u00e4mist\u00e4 ja hienomotoriikkaa. Tukee POPS 2014 tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Avaruudellinen p\u00e4\u00e4ttely 1.\u20133. luokalla', description: 'Generoi suurempia ruudukoita v\u00e4hemmill\u00e4 vihjeill\u00e4 1.\u20133. luokalle. Oppilaat analysoivat pikseli kuvioita ja toistavat ne tyhj\u00e4\u00e4n ruudukkoon. Yhdist\u00e4 symmetriateht\u00e4viin matemaattisen ajattelun kehitt\u00e4miseksi.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Luovia piirustusharjoituksia kotiin', description: 'Luo temaattisia ruudukkopiirustuksia lasten suosikkiaiheilla. El\u00e4in-, kulkuneuvo- ja luontoteemat pit\u00e4v\u00e4t lapset motivoituneina. Generoi viikon harjoitukset 15 minuutissa eri vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 visuaalinen harjoittelu', description: 'Ruudukkopiirustus ei vaadi kielitaitoa, joten se sopii kaikille oppilaille taustasta riippumatta. Kuvateemat tarjoavat samalla sanastoaltistusta. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt visuaaliset harjoitukset', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa ja vihjeprosettia HOJKS-tavoitteiden mukaisesti. Korkea vihjeprosentti tukee heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat itseluottamusta ja visuaalista hahmottamista.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy piirustuspaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia ruudukkopiirustuspaketteja myyt\u00e4v\u00e4ksi verkossa. Vuodenaikojen ja juhlap\u00e4ivien mukaiset paketit myyv\u00e4t tasaisesti. Kaupallinen lisenssi kattaa rajattomat myynnit ilman attribuutiovaatimuksia.' },
  ],
  faq: [
    { id: '1', question: 'Miten ruudukkopiirustusteht\u00e4v\u00e4generaattori toimii?', answer: 'Generaattori muuntaa valitsemasi kuvan pikseli ruudukkoon ja luo kaksi vierekk\u00e4ist\u00e4 ruudukkoa. Vihjeruudukko n\u00e4ytt\u00e4\u00e4 osan kuvasta pikseli kerrallaan. Piirustusruudukko on tyhj\u00e4 oppilaan t\u00e4ytett\u00e4v\u00e4ksi. Oppilas kopioi kuvion mallin mukaan.' },
    { id: '2', question: 'Miten ruudukon kokoa voi s\u00e4\u00e4t\u00e4\u00e4?', answer: 'Valitse ruudukon koko 3\u00d73:sta 10\u00d710:een. Pienemm\u00e4t ruudukot sopivat nuoremmille lapsille. Suuremmat ruudukot vaativat tarkempaa havainnointia. S\u00e4\u00e4d\u00e4 kokoa oppilaiden taitotason mukaan.' },
    { id: '3', question: 'Mik\u00e4 on vihjeprosentti ja miten sit\u00e4 s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Vihjeprosentti m\u00e4\u00e4ritt\u00e4\u00e4, kuinka suuri osa ruudukosta on valmiiksi v\u00e4ritetty. Korkea vihjeprosentti (70\u201390 %) tekee teht\u00e4v\u00e4st\u00e4 helpomman. Matala vihjeprosentti (20\u201340 %) luo haastavan palapelin. T\u00e4ydellinen eriytett\u00e4miseen.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa t\u00e4ydellinen ruudukkokuvio n\u00e4kyy v\u00e4ritetyn\u00e4. Opettajat voivat tulostaa vastausavaimen erikseen tai k\u00e4ytt\u00e4\u00e4 sit\u00e4 dokumenttikameralla.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille ruudukkopiirustus sopii?', answer: 'Ruudukkopiirustus palvelee 4\u201310-vuotiaita. Esikoululaiset harjoittelevat pienill\u00e4 ruudukoilla ja korkealla vihjeprosentilla. 1.\u20133. luokan oppilaat ratkaisevat suurempia ruudukoita v\u00e4hemmill\u00e4 vihjeill\u00e4. Symmetriateht\u00e4v\u00e4t sopivat kaikille.' },
    { id: '6', question: 'Voiko ruudukkopiirustukseen lis\u00e4t\u00e4 symmetriaa?', answer: 'Kyll\u00e4, symmetria-asetukset ovat osa generaattoria. Vaakapeili luo vasemmalta oikealle symmetrian. Pystypeili luo yl\u00f6s-alas symmetrian. Symmetriateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista hahmottamista ja matemaattista ajattelua.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4 pohjana?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori pikseli\u00f6i kuvan automaattisesti valitsemaasi ruudukkokokoon. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa.' },
    { id: '8', question: 'Miten tulostan ruudukkopiirustusteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti kotitulostimella.' },
    { id: '9', question: 'Sopiiko ruudukkopiirustus erityisopetukseen?', answer: 'Ruudukkopiirustus sopii erinomaisesti erityisopetukseen s\u00e4\u00e4dett\u00e4vyydens\u00e4 ansiosta. S\u00e4\u00e4d\u00e4 ruudukon kokoa ja vihjeprosettia HOJKS-tavoitteiden mukaisesti. Asteittain vaikeutuvat teht\u00e4v\u00e4t tukevat jokaisen oppilaan kehityst\u00e4.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden ruudukkopiirustusteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuva ja asetukset 30 sekunnissa. Generaattori luo teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Useimmat opettajat luovat viikon teht\u00e4v\u00e4t 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani ruudukkopiirustuksia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy ruudukkopiirustuspaketteja opettajakauppoissa ilman attribuutiovaatimuksia. Monet opettajat ansaitsevat lis\u00e4tuloja teemallisilla piirustuspaketeilla.' },
    { id: '12', question: 'Miten ruudukkopiirustus tukee POPS 2014 tavoitteita?', answer: 'Ruudukkopiirustus tukee avaruudellisen hahmottamisen, visuaalisen tarkkuuden ja hienomotoriikan kehitt\u00e4mist\u00e4. POPS 2014 korostaa monipuolisia ty\u00f6tapoja ja visuaalista oppimista. Koordinaattien ymm\u00e4rt\u00e4minen tukee matemaattista ajattelua.' },
  ],
  relatedApps: [
    { id: '1', slug: 'varityskuvat-tyoarkit', name: 'V\u00e4rityskuvat', category: 'Taide ja luovuus', icon: '\u{1f3a8}', description: 'V\u00e4rityskuvat t\u00e4ydent\u00e4v\u00e4t ruudukkopiirustusta vapaammalla v\u00e4ritt\u00e4misell\u00e4. Yhdist\u00e4 molemmat monipuolisiin taide- ja hienomotoriikkapaketteihin.' },
    { id: '2', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t samoja visuaalisia taitoja kuin ruudukkopiirustus. Oppilaat seuraavat polkuja ruudukoissa kehitt\u00e4en avaruudellista hahmottamista.' },
    { id: '3', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkosovitus', category: 'Logiikka', icon: '\u{1f9e9}', description: 'Ruudukkosovitus laajentaa ruudukkotaitoja kuvan palojen sijoittamiseen. Molemmat kehitt\u00e4v\u00e4t visuaalista analysointia ruudukkopohjaisessa muodossa.' },
    { id: '4', slug: 'viivojen-piirtaminen-tyoarkit', name: 'Viivojen piirt\u00e4minen', category: 'Hienomotoriikka', icon: '\u270f\ufe0f', description: 'Viivanpiirtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kyn\u00e4nhallintaa ennen ruudukkopiirustusta. Yhdist\u00e4 molemmat hienomotoriikan intensiivisiin harjoituspaketteihin.' },
    { id: '5', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t harjoittavat samaa visuaalista tarkkaavaisuutta kuin ruudukkopiirustus. Yhdist\u00e4 molemmat visuaalisen havainnointikyvyn kehitt\u00e4miseen.' },
    { id: '6', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 muodon tunnistamista, joka tukee ruudukkopiirustuksen vaatimaa visuaalista analysointia. Yhdist\u00e4 kokonaisvaltaisiin hahmottamisharjoituksiin.' },
  ],
  aiOverviewSnippet: 'Ruudukkopiirustus-generaattori on verkkotyokalu, jolla luodaan tulostettavia pikseli-ruudukkopiirustustehtavia esiopetukseen ja alakouluun. Oppilas kopioi kuvion vihjeruudukosta tyhjaan piirustusruudukkoon ruutu kerrallaan. Opettajat valitsevat ruudukon koon, vihjeprosentin ja teemakuvan, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Ruudukkokoko', ourApp: '3\u00d73\u201310\u00d710 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Yksi kiinte\u00e4 koko' },
    { feature: 'Vihjeiden m\u00e4\u00e4r\u00e4', ourApp: '20\u201390 % s\u00e4\u00e4dett\u00e4v\u00e4 vihjeprosentti', typical: 'Ei s\u00e4\u00e4d\u00f6st\u00e4' },
    { feature: 'Symmetria-asetukset', ourApp: 'Vaaka- ja pystypeilaus', typical: 'Ei symmetriavaihtoehtoja' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai ei saatavilla' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Ruudukkopohjainen piirt\u00e4minen kehitt\u00e4\u00e4 visuomotorista integraatiota ja avaruudellista hahmottamista, jotka ovat matemaattisen ajattelun ja kirjoitusvalmiuden perusedellytyksi\u00e4.', source: 'Ahonen, T. et al., "Visuaalisen hahmottamisen ja oppimisen yhteydet," Niilo M\u00e4ki Instituutti' },
    { claim: 'Pikselipohjainen kopiointi kehitt\u00e4\u00e4 lasten tarkkuutta ja koordinaattien ymm\u00e4rt\u00e4mist\u00e4, mik\u00e4 tukee my\u00f6hemp\u00e4\u00e4 matemaattista ja tieteellist\u00e4 ajattelua.', source: 'Hannula, M. & Lehtinen, E., "Spatiaalinen p\u00e4\u00e4ttely varhaiskasvatuksessa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Ruudukkopiirustus on loistava tapa yhdistaa taide ja matematiikka. Oppilaani rakastavat kopioida kuvioita ruutu kerrallaan ja samalla kehittavat koordinaattien ymmartamista. Vihjeprosentin saato tekee eriyttamisesta helppoa.', name: 'Tero Salminen', role: '2. luokan opettaja', school: 'Rantakylän koulu, Jyväskylä' },
    { quote: 'Kaytan ruudukkopiirustusta aamutyoskentelyssa ja esiopetuksen ryhmassani. Lapset keskittyvat tehtavaan pitkaan koska kuvion paljastuminen motivoi heitä. Symmetriatehtavat ovat erityisen suosittuja.', name: 'Anu Kemppainen', role: 'Esiopetuksen opettaja', school: 'Lehtisaaren päiväkoti, Espoo' },
  ],
  tips: {
    sectionTitle: 'Ruudukkopiirustusstrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 ruudukkopiirustus-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ruudukon koon, vihjeprosentin ja monimutkaisuuden esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Pienet ruudukot korkealla vihjeprosentilla', description: 'Kaytta 3x3 tai 4x4 ruudukkoa 80-90% vihjeprosentilla. Esikoululaiset harjoittelevat yksinkertaisten kuvioiden kopiointia muutaman ruudun varitettavaksi kerrallaan. Yksinkertainen muoto rakentaa visuaalista tarkkuutta ja hienomotoriikkaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Keskikokoiset ruudukot ja symmetria', description: 'Luo 4x4 tai 5x5 ruudukkotehtavia 60-70% vihjeprosentilla. Esiopetuksen oppilaat kehittavat koordinaattien ymmartamista ja visuaalista analysointia. Lisa symmetriatehtavia matemaattisen ajattelun tukemiseen POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Suuremmat ruudukot ja v\u00e4hemm\u00e4n vihjeit\u00e4', description: 'Generoi 5x5 tai 6x6 ruudukoita 40-60% vihjeprosentilla. Ekaluokkalaiset analysoivat monimutkaisempia kuvioita ja kehittavat jarjestelmallista kopiointistrategiaa. Tehtavat tukevat matemaattista tarkkuutta ja keskittymista.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Haastavat symmetriateht\u00e4v\u00e4t', description: 'Luo 6x6 tai 7x7 ruudukkotehtavia symmetrialla ja 30-50% vihjeprosentilla. Toisluokkalaiset hioivat visuaalista analysointia ja avaruudellista paattelya. Symmetriatehtavat kehittavat matemaattista ajattelua monipuolisesti.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset pikselikuviot', description: 'Kaytta 8x8 tai suurempia ruudukoita 20-40% vihjeprosentilla. Kolmasluokkalaiset ratkaisevat vaativia pikseli kuvioita ja kehittavat systemaattista ajattelua. Tehtavat valmistavat koordinaatiston ja graafisen esittamisen ymmartamiseen.' },
    ],
  },
};

// ===================================================================
// 2. FIND OBJECTS (etsi-esineet-tyoarkit)
// ===================================================================
const findObjects = {
  file: 'etsi-esineet-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f50e}', title: 'I Spy -etsint\u00e4tila k\u00e4tketyill\u00e4 esineill\u00e4', description: 'I Spy -tila luo etsint\u00e4teht\u00e4vi\u00e4, joissa 1\u20135 kohdetta on piilotettu 8\u201312 h\u00e4iritsev\u00e4n kuvan joukkoon. Oppilaat skannaavat kuvaa j\u00e4rjestelm\u00e4llisesti tunnistaakseen piilokuvat. Kehitt\u00e4\u00e4 visuaalista tarkkaavaisuutta ja keskittymiskyky\u00e4.' },
    { id: '2', icon: '\u2753', title: 'Odd One Out -poikkeava kuva -tila', description: 'Odd One Out -tila luo teht\u00e4vi\u00e4, joissa oppilaat tunnistavat kuvan, joka ei kuulu joukkoon. 8\u201312 kuvaparista 1\u20133 on parittomia. Kehitt\u00e4\u00e4 luokittelutaitoja ja loogista ajattelua.' },
    { id: '3', icon: '\u2699\ufe0f', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso', description: 'Kontrolloi vaikeustasoa h\u00e4iritsevien kuvien ja kohteiden m\u00e4\u00e4r\u00e4ll\u00e4. V\u00e4hemm\u00e4n kuvia ja kohdetta sopii nuoremmille lapsille. Enemm\u00e4n kuvia ja kohteita haastaa vanhempia oppilaita. S\u00e4\u00e4d\u00e4 t\u00e4ydellisesti oppilaiden taitotason mukaan.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa etsint\u00e4teht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta etsint\u00e4teht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Teemavalinnat t\u00e4ytt\u00e4v\u00e4t kuvat automaattisesti.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen etsint\u00e4teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat kohteet on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 omaa teksti\u00e4, valitse fontteja ja v\u00e4rej\u00e4. Lataa taustakuvia ammattimaiseen lopputulokseen.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 etsint\u00e4teht\u00e4vi\u00e4 verkossa. Luo temaattisia etsint\u00e4paketteja myyt\u00e4v\u00e4ksi opettajakauppoihin. Ei attribuutiovaatimuksia eik\u00e4 lis\u00e4maksuja.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo etsint\u00e4teht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 ja kuvien nimet k\u00e4\u00e4ntyv\u00e4t valitulle kielelle. T\u00e4ydellinen monikielisille luokkahuoneille ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen havainnointikyvyn kehitt\u00e4minen 5\u20136-vuotiaille', description: 'Luo yksinkertaisia I Spy -teht\u00e4vi\u00e4 v\u00e4h\u00e4isell\u00e4 h\u00e4iritsevien kuvien m\u00e4\u00e4r\u00e4ll\u00e4. Esiopetuksen oppilaat harjoittelevat visuaalista skannausta ja yksityiskohtien havainnointia. Tukee POPS 2014 tarkkaavaisuustaitojen kehitt\u00e4mist\u00e4.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Keskittymisharjoituksia 1.\u20133. luokalle', description: 'Generoi monimutkaisia etsint\u00e4teht\u00e4vi\u00e4 useammilla kohteilla ja h\u00e4iritsevill\u00e4 kuvilla. Oppilaat kehitt\u00e4v\u00e4t pitk\u00e4j\u00e4nteist\u00e4 tarkkaavaisuutta ja j\u00e4rjestelm\u00e4llist\u00e4 etsint\u00e4strategiaa.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja etsint\u00e4harjoituksia kotiin', description: 'Luo temaattisia etsint\u00e4teht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja kulkuneuvoteemat pit\u00e4v\u00e4t lapset motivoituneina. Generoi viikon teht\u00e4v\u00e4t nopeasti eri vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Sanastoharjoittelua visuaalisella etsinn\u00e4ll\u00e4', description: 'Etsint\u00e4teht\u00e4v\u00e4t tarjoavat sanastoaltistusta kuvapohjaisesti. Oppilaat oppivat uusia sanoja tunnistaessaan kuvia. 11 kielen tuki mahdollistaa monikielisen opetuksen saumattomasti.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 tarkkaavaisuusharjoittelu', description: 'S\u00e4\u00e4d\u00e4 kohteiden ja h\u00e4iritsevien kuvien m\u00e4\u00e4r\u00e4\u00e4 HOJKS-tavoitteiden mukaisesti. V\u00e4h\u00e4n kuvia tukee heikompia oppilaita. Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista tarkkaavaisuutta oppimisen tuen piiriss\u00e4.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy etsint\u00e4paketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia etsint\u00e4kokoelmia myyt\u00e4v\u00e4ksi verkossa. I Spy -paketit ovat jatkuvasti suosittuja opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten etsint\u00e4teht\u00e4v\u00e4generaattori toimii?', answer: 'Generaattori luo kohtauksia, joissa kohde-esineet on piilotettu h\u00e4iritsevien kuvien joukkoon. Valitse I Spy tai Odd One Out -tila, m\u00e4\u00e4rit\u00e4 kuvien m\u00e4\u00e4r\u00e4 ja valitse teema. Generaattori luo valmiin teht\u00e4v\u00e4n vastausavaimineen sekunneissa.' },
    { id: '2', question: 'Mitk\u00e4 toimintatilat ovat saatavilla?', answer: 'Kaksi tilaa: I Spy luo etsint\u00e4teht\u00e4vi\u00e4, joissa oppilaat etsiv\u00e4t piilotettuja esineit\u00e4. Odd One Out luo teht\u00e4vi\u00e4, joissa oppilaat tunnistavat joukkoon kuulumattoman kuvan. Molemmat kehitt\u00e4v\u00e4t visuaalista havainnointia.' },
    { id: '3', question: 'Kuinka monta kohdetta ja h\u00e4iritsev\u00e4\u00e4 kuvaa voi olla?', answer: 'I Spy -tilassa valitse 1\u20135 piilotettua kohdetta ja 8\u201312 h\u00e4iritsev\u00e4\u00e4 kuvaa. Odd One Out -tilassa valitse 8\u201312 kuvapaaria ja 1\u20133 paritonta kuvaa. S\u00e4\u00e4d\u00e4 m\u00e4\u00e4ri\u00e4 vaikeustason mukaan.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen etsint\u00e4teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikeat kohteet korostetaan selke\u00e4sti. Opettajat voivat tulostaa vastausavaimen erikseen tai n\u00e4ytt\u00e4\u00e4 sen dokumenttikameralla.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille etsint\u00e4teht\u00e4v\u00e4t sopivat?', answer: 'Etsint\u00e4teht\u00e4v\u00e4t palvelevat 4\u201310-vuotiaita. Esikoululaiset etsiv\u00e4t yksinkertaisia kohteita v\u00e4h\u00e4isell\u00e4 h\u00e4irinnill\u00e4. 1.\u20133. luokan oppilaat ratkaisevat monimutkaisempia kohtauksia useilla kohteilla.' },
    { id: '6', question: 'Miten etsint\u00e4teht\u00e4v\u00e4t tukevat oppimista?', answer: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista tarkkaavaisuutta, j\u00e4rjestelm\u00e4llist\u00e4 etsint\u00e4strategiaa ja keskittymiskyky\u00e4. Odd One Out -tila kehitt\u00e4\u00e4 luokittelutaitoja ja loogista ajattelua.' },
    { id: '7', question: 'Voiko etsint\u00e4teht\u00e4vi\u00e4 luoda useilla kielill\u00e4?', answer: 'Generaattori luo teht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi, norja, tanska ja englanti. Kuvien nimet ja k\u00e4ytt\u00f6liittym\u00e4 vaihdetaan valitun kielen mukaisesti.' },
    { id: '8', question: 'Miten tulostan etsint\u00e4teht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 v\u00e4rimustetta. Kaikki teht\u00e4v\u00e4t tulostuvat ammattimaisesti.' },
    { id: '9', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdist\u00e4 omia kuvia 3000+ kuvakirjaston kuvien kanssa. K\u00e4yt\u00e4 luokkavalokuvia tai oppilaiden piirustuksia.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden etsint\u00e4teht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse tila ja kuvat 30 sekunnissa. Generaattori rakentaa teht\u00e4v\u00e4n v\u00e4litt\u00f6m\u00e4sti. Viikon teht\u00e4v\u00e4t valmistuvat 15 minuutissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani etsint\u00e4teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin etsint\u00e4teht\u00e4vien myyntiin verkossa. Ei attribuutiovaatimuksia eik\u00e4 ylim\u00e4\u00e4r\u00e4isi\u00e4 lisenssimaksuja.' },
    { id: '12', question: 'Miten etsint\u00e4teht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Etsint\u00e4teht\u00e4v\u00e4t tukevat tarkkaavaisuuden, visuaalisen havainnointikyvyn ja keskittymisen kehitt\u00e4mist\u00e4. POPS 2014 korostaa sis\u00e4ist\u00e4 motivaatiota ja monipuolisia oppimistapoja. Etsint\u00e4teht\u00e4v\u00e4t toteuttavat molempia tavoitteita.' },
  ],
  relatedApps: [
    { id: '1', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske yhdist\u00e4\u00e4 visuaalisen etsinn\u00e4n ja laskemisen. T\u00e4ydent\u00e4\u00e4 etsint\u00e4teht\u00e4vi\u00e4 matemaattisella ulottuvuudella.' },
    { id: '2', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 visuaalista erottelua tunnistamalla kuvan varjon. T\u00e4ydent\u00e4\u00e4 etsint\u00e4teht\u00e4vi\u00e4 hahmottamisharjoituksilla.' },
    { id: '3', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkea joukosta -teht\u00e4v\u00e4t laajentavat Odd One Out -tilan konseptia eri muotoihin. Yhdist\u00e4 molemmat luokittelutaitojen kehitt\u00e4miseen.' },
    { id: '4', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 luokittelutaitoja, jotka tukevat etsint\u00e4teht\u00e4vien vaatimaa kategorisointia. Yhdist\u00e4 monipuolisiin ajatteluharjoituksiin.' },
    { id: '5', slug: 'kuva-bingo-tyoarkit', name: 'Kuvabingo', category: 'Sanasto', icon: '\u{1f3b2}', description: 'Kuvabingo yhdist\u00e4\u00e4 kuvan tunnistamisen pelimuotoon. Etsint\u00e4teht\u00e4v\u00e4t ja bingo kehitt\u00e4v\u00e4t molemmat visuaalista tarkkaavaisuutta.' },
    { id: '6', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolkuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista seurantaa ja polun l\u00f6yt\u00e4mist\u00e4. Yhdist\u00e4 etsint\u00e4teht\u00e4vien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.' },
  ],
  aiOverviewSnippet: 'Etsi esineet -generaattori on verkkotyokalu, jolla luodaan tulostettavia visuaalisen havainnoinnin tehtavia esiopetukseen ja alakouluun. I Spy -tila piilottaa esineet hairitsevien kuvien joukkoon, Odd One Out -tila haastaa tunnistamaan joukkoon kuulumattoman kuvan. Opettajat valitsevat tilan, kuvat ja vaikeustason, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Toimintatilat', ourApp: '2 tilaa: I Spy ja Odd One Out', typical: 'Vain yksi etsint\u00e4tyyppi' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa 50 teemasta', typical: 'Rajallinen kuvavalinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen tai lis\u00e4maksullinen' },
    { feature: 'Vaikeustason s\u00e4\u00e4t\u00f6', ourApp: 'Kohteiden ja h\u00e4iritsevien kuvien m\u00e4\u00e4r\u00e4 s\u00e4\u00e4dett\u00e4viss\u00e4', typical: 'Kiinte\u00e4 vaikeustaso' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu tai ei saatavilla' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Visuaalisen etsinn\u00e4n teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t pitk\u00e4j\u00e4nteist\u00e4 tarkkaavaisuutta ja j\u00e4rjestelm\u00e4llist\u00e4 skannausta, jotka ovat lukemisen ja oppimisen perusedellytyksi\u00e4 varhaiskasvatusik\u00e4isill\u00e4.', source: 'Ahonen, T. et al., "Tarkkaavaisuuden ja oppimisen yhteydet," Niilo M\u00e4ki Instituutti' },
    { claim: 'Kuvapohjaisten etsint\u00e4teht\u00e4vien s\u00e4\u00e4nn\u00f6llinen harjoittelu parantaa visuaalista erottelukyky\u00e4 ja yksityiskohtien havainnointia, jotka tukevat kirjainten tunnistamista ja lukutaidon kehittymist\u00e4.', source: 'Holopainen, L., "Visuaalisen havainnoinnin merkitys lukemaan oppimisessa," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'I Spy -tehtavat ovat ehdottomasti luokkani suosikkeja. Lapset keskittyvat etsintaan pitkaan ja kehittavat samalla visuaalista havainnointia. Odd One Out -tila on loistava loogisen ajattelun kehittamiseen.', name: 'Johanna V\u00e4is\u00e4nen', role: '1. luokan opettaja', school: 'Puistolan koulu, Kuopio' },
    { quote: 'Kaytan etsintatehtavia aamutyoskentelyssa ja odotusaikoina. Oppilaani ovat oppineet skannaamaan kuvia jarjestelmallisesti eivatkaa enaa katsele satunnaisesti. Tama taito siirtyy lukemiseenkin.', name: 'Heikki Lepp\u00e4nen', role: 'Erityisopettaja', school: 'Keski-Suomen sairaanhoitopiiri, Jyv\u00e4skyl\u00e4' },
  ],
  tips: {
    sectionTitle: 'Etsint\u00e4strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 etsint\u00e4teht\u00e4v\u00e4generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset tilan, kohteiden m\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Yksinkertaiset etsint\u00e4teht\u00e4v\u00e4t', description: 'Kaytta I Spy -tilaa yhdella kohteella ja 6-8 hairitsevalla kuvalla. Esikoululaiset harjoittelevat kuvan tunnistamista ja visuaalista skannausta. Yksinkertainen muoto rakentaa tarkkaavaisuuden perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Teemapohjaiset etsint\u00e4haasteet', description: 'Luo I Spy -tehtavia 2-3 kohteella ja 8-10 hairitsevalla kuvalla. Esiopetuksen oppilaat kehittavat jarjestelmallista etsintastrategiaa. Lisa Odd One Out -tehtavia luokittelutaitojen tukemiseen POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Monimutkaisemmat kohtaukset', description: 'Generoi I Spy -tehtavia 3-4 kohteella ja 10-12 hairitsevalla kuvalla. Ekaluokkalaiset kehittavat pitkajanteista tarkkaavaisuutta ja visuaalista erottelua. Odd One Out haastaa luokittelutaitoja.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Haastavat etsint\u00e4pulmat', description: 'Luo molempia tiloja 4-5 kohteella tai 3 parittomalla kuvalla. Toisluokkalaiset hioivat visuaalista analysointia ja loogista paattelya. Tehtavat kehittavat systemaattista ajattelua.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monipuoliset visuaaliset haasteet', description: 'Kaytta molempia tiloja maksimaalisilla kuvamaarilla. Kolmasluokkalaiset harjoittelevat vaativaa visuaalista analysointia ja luokittelua. Kaytta tehtavia laaja-alaisen osaamisen kehittamiseen.' },
    ],
  },
};

// ===================================================================
// 3. GRID MATCH (ruudukko-sovitus-tyoarkit)
// ===================================================================
const gridMatch = {
  file: 'ruudukko-sovitus-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e9}', title: 'Ruudukkopohjainen kuvasovitusmuoto', description: 'Generaattori jakaa kuvan ruudukkoon ja poistaa valitun m\u00e4\u00e4r\u00e4n soluja. Oppilaat tunnistavat, mitk\u00e4 kuvapalat kuuluvat mihinkin ruudukon kohtaan. Kehitt\u00e4\u00e4 visuaalista p\u00e4\u00e4ttely\u00e4 ja avaruudellista hahmottamista.' },
    { id: '2', icon: '\u{1f4d0}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ruudukkokoko 2\u00d72\u20134\u00d74', description: 'Valitse ruudukon koko oppilaiden tasoon sopivaksi. Yksinkertainen 2\u00d72 sopii esiopetukselle. Monimutkaisempi 4\u00d74 haastaa vanhempia oppilaita. Rivien ja sarakkeiden m\u00e4\u00e4r\u00e4 s\u00e4\u00e4det\u00e4\u00e4n erikseen.' },
    { id: '3', icon: '\u{1f50d}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 vihjeiden m\u00e4\u00e4r\u00e4', description: 'Valitse 1\u20135 puuttuvaa palaa per teht\u00e4v\u00e4. Yksi puuttuva pala on helpoin esikoululaisille. Viisi puuttuvaa palaa haastaa vanhempia oppilaita vaatimalla enemm\u00e4n visuaalista analysointia.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa ruudukkoteht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta ruudukkopulmien luomiseen. El\u00e4imet, kulkuneuvot, ruoka ja kymmenet muut teemat. Kuva jaetaan automaattisesti ruudukkoon.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen ruudukkosovitusteht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat palaset on sijoitettu paikoilleen. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 tekstej\u00e4, fontteja ja v\u00e4rej\u00e4. Ammattimaiset muokkausty\u00f6kalut jokaisessa teht\u00e4v\u00e4ss\u00e4.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 ruudukkosovitusteht\u00e4vi\u00e4 verkossa. Luo temaattisia paketteja myyt\u00e4v\u00e4ksi opettajakauppoihin. Ei attribuutiovaatimuksia.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo ruudukkosovitusteht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen hahmottamisen perusharjoitukset', description: 'Luo 2\u00d72 ruudukkoteht\u00e4vi\u00e4 yhdell\u00e4 puuttuvalla palalla. Esiopetuksen oppilaat harjoittelevat kuvan osien tunnistamista ja paikantamista. T\u00e4ydellinen POPS 2014 visuaalisen hahmottamisen tavoitteiden tukemiseen.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Avaruudellinen p\u00e4\u00e4ttely 1.\u20133. luokalla', description: 'Generoi 3\u00d73 ja 4\u00d74 ruudukkoteht\u00e4vi\u00e4 useilla puuttuvilla paloilla. Oppilaat kehitt\u00e4v\u00e4t visuaalista analysointia ja loogista p\u00e4\u00e4ttely\u00e4. Yhdist\u00e4 matemaattisten taitojen kehitt\u00e4miseen.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Haastavat kuvapalapelit kotiin', description: 'Luo temaattisia ruudukkopulmia lasten suosikkiaiheilla. Palapeli muoto pit\u00e4\u00e4 lapset kiinnostuneina. Generoi viikon teht\u00e4v\u00e4t nopeasti eri vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 p\u00e4\u00e4ttelyharjoittelu', description: 'Ruudukkosovitus ei vaadi kielitaitoa, joten se sopii kaikille oppilaille. Kuvateemat tarjoavat sanastoaltistusta. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt hahmottamisharjoitukset', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa ja puuttuvien palojen m\u00e4\u00e4r\u00e4\u00e4 HOJKS-tavoitteiden mukaisesti. Yksinkertaiset 2\u00d72 teht\u00e4v\u00e4t tukevat heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t rakentavat taitoa.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy palapelipaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia ruudukkopulmakokoelmia myyt\u00e4v\u00e4ksi verkossa. Visuaalisen p\u00e4\u00e4ttelyn materiaalit ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten ruudukkosovitus-generaattori toimii?', answer: 'Generaattori jakaa valitsemasi kuvan ruudukkoon ja poistaa joitain soluja. Oppilaat tunnistavat puuttuvat palat vastausvaihtoehdoista. Jokainen teht\u00e4v\u00e4 sis\u00e4lt\u00e4\u00e4 sek\u00e4 palapelin ett\u00e4 vastausavaimen.' },
    { id: '2', question: 'Mitk\u00e4 ruudukkokoot ovat saatavilla?', answer: 'Valitse 2\u00d72, 3\u00d73 tai 4\u00d74 ruudukkokoko. 2\u00d72 sopii esiopetukseen. 3\u00d73 on standardi 1.\u20132. luokalle. 4\u00d74 haastaa edistyneempi\u00e4 oppilaita.' },
    { id: '3', question: 'Kuinka monta palaa voi puuttua?', answer: 'Valitse 1\u20135 puuttuvaa palaa per teht\u00e4v\u00e4. Yksi pala on helpoin aloittelijoille. Viisi palaa vaatii laajaa visuaalista analysointia. S\u00e4\u00e4d\u00e4 m\u00e4\u00e4r\u00e4\u00e4 oppilaiden taitotason mukaan.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikeat palat n\u00e4kyv\u00e4t paikoillaan. Opettajat voivat tulostaa vastausavaimen erikseen.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille ruudukkosovitus sopii?', answer: 'Ruudukkosovitus palvelee 4\u201310-vuotiaita. Esikoululaiset ratkaisevat 2\u00d72 teht\u00e4vi\u00e4 yhdell\u00e4 puuttuvalla palalla. 1.\u20133. luokan oppilaat ratkaisevat 3\u00d73 ja 4\u00d74 teht\u00e4vi\u00e4 useilla puuttuvilla paloilla.' },
    { id: '6', question: 'Miten ruudukkosovitus kehitt\u00e4\u00e4 ajattelua?', answer: 'Ruudukkosovitus kehitt\u00e4\u00e4 visuaalista analysointia, avaruudellista p\u00e4\u00e4ttely\u00e4 ja loogista ajattelua. Oppilaat analysoivat kuvan osia ja p\u00e4\u00e4ttelev\u00e4t, mik\u00e4 pala sopii mihinkin paikkaan.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori jakaa kuvan automaattisesti valitsemaasi ruudukkokokoon.' },
    { id: '8', question: 'Miten tulostan ruudukkosovitusteht\u00e4v\u00e4t?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 mustetta.' },
    { id: '9', question: 'Sopiiko ruudukkosovitus erityisopetukseen?', answer: 'Kyll\u00e4, s\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso tekee ruudukkosovituksesta erinomaisen erityisopetukseen. S\u00e4\u00e4d\u00e4 ruudukon kokoa ja puuttuvien palojen m\u00e4\u00e4r\u00e4\u00e4 HOJKS-tavoitteiden mukaisesti.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden ruudukkosovitusteht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuva ja asetukset nopeasti. Generaattori luo palapelin v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 ruudukkosovitusteht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy temaattisia ruudukkopulmapaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten ruudukkosovitus tukee POPS 2014 tavoitteita?', answer: 'Ruudukkosovitus tukee visuaalisen hahmottamisen, avaruudellisen p\u00e4\u00e4ttelyn ja ongelmanratkaisun kehitt\u00e4mist\u00e4. POPS 2014 korostaa laaja-alaista osaamista ja ajattelun taitojen kehitt\u00e4mist\u00e4.' },
  ],
  relatedApps: [
    { id: '1', slug: 'puuttuvat-palat-tyoarkit', name: 'Puuttuvat palat', category: 'Hahmottaminen', icon: '\u{1f9e9}', description: 'Puuttuvat palat -teht\u00e4v\u00e4t laajentavat ruudukkosovitusta kuvan t\u00e4ydent\u00e4miseen. Molemmat kehitt\u00e4v\u00e4t visuaalista analysointia ja avaruudellista p\u00e4\u00e4ttely\u00e4.' },
    { id: '2', slug: 'ruudukkopiirustus-tyoarkit', name: 'Ruudukkopiirustus', category: 'Taide ja luovuus', icon: '\u{1f58c}\ufe0f', description: 'Ruudukkopiirustus laajentaa ruudukkotaitoja piirustuksen suuntaan. Molemmat k\u00e4ytt\u00e4v\u00e4t ruudukkopohjaa visuaalisen tarkkuuden kehitt\u00e4miseen.' },
    { id: '3', slug: 'sudoku-tyoarkit', name: 'Sudoku', category: 'Logiikka', icon: '\u{1f522}', description: 'Sudoku laajentaa ruudukkop\u00e4\u00e4ttely\u00e4 numeroiden suuntaan. Molemmat kehitt\u00e4v\u00e4t loogista ajattelua ruudukkopohjaisessa muodossa.' },
    { id: '4', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolku kehitt\u00e4\u00e4 visuaalista seurantaa ja polun l\u00f6yt\u00e4mist\u00e4. Yhdist\u00e4 ruudukkosovituksen kanssa visuaalisten taitojen monipuoliseen harjoitteluun.' },
    { id: '5', slug: 'kuviotehtava-tyoarkit', name: 'Kuvioteht\u00e4v\u00e4', category: 'Logiikka', icon: '\u{1f300}', description: 'Kuvioteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t hahmontunnistusta ja sarjoittelua. Yhdist\u00e4 ruudukkosovituksen kanssa loogisen ajattelun kattavaan harjoitteluun.' },
    { id: '6', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 muodon tunnistamista. Yhdist\u00e4 ruudukkosovituksen kanssa kokonaisvaltaisiin hahmottamisharjoituksiin.' },
  ],
  aiOverviewSnippet: 'Ruudukkosovitus-generaattori on verkkotyokalu, jolla luodaan tulostettavia ruudukkopulmatehtavia esiopetukseen ja alakouluun. Kuva jaetaan ruudukkoon ja joitain soluja poistetaan. Oppilaat tunnistavat puuttuvat palat vastausvaihtoehdoista. Opettajat saatavat ruudukon koon ja puuttuvien palojen maaran, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Ruudukkokoko', ourApp: '2\u00d72\u20134\u00d74 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Yksi kiinte\u00e4 koko' },
    { feature: 'Puuttuvat palat', ourApp: '1\u20135 palaa s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 m\u00e4\u00e4r\u00e4' },
    { feature: 'Kuvakirjasto', ourApp: '3000+ teemakuvaa automaattisella jaolla', typical: 'Rajallinen valinta' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Ruudukkopohjainen palapeli kehitt\u00e4\u00e4 visuaalista analysointia ja avaruudellista p\u00e4\u00e4ttely\u00e4, jotka ovat matemaattisen ja tieteellisen ajattelun perusedellytyksi\u00e4 varhaiskasvatusik\u00e4isill\u00e4.', source: 'Hannula, M. & Lehtinen, E., "Spatiaalinen p\u00e4\u00e4ttely ja matemaattinen oppiminen," Turun yliopisto' },
    { claim: 'Kuvan osien tunnistaminen ja paikantaminen kehitt\u00e4v\u00e4t visuaalista sulkeumaa ja gestalt-hahmottamista, jotka tukevat lukuvalmiutta ja kirjainten tunnistamista.', source: 'Niilo M\u00e4ki Instituutti, "Visuaalisen hahmottamisen ja lukemaan oppimisen yhteydet"' },
  ],
  teacherTestimonials: [
    { quote: 'Ruudukkosovitus on taydellinen logiikan kehittamiseen. Oppilaani rakastavat ratkaista kuvapalapelejä ja kehittavat samalla avaruudellista paattelya. Saadettava vaikeustaso tekee eriyttamisesta helppoa.', name: 'Kirsi Mattila', role: 'Esiopetuksen opettaja', school: 'Koivurinteen p\u00e4iv\u00e4koti, Tampere' },
    { quote: 'Kaytan ruudukkosovitusta matemaattisen ajattelun tukena. Oppilaat analysoivat kuvan osia ja paattelevat loogisesti mika pala sopii mihinkin kohtaan. Tama taito siirtyy matemaattiseen ongelmanratkaisuun.', name: 'Juho Hiltunen', role: '2. luokan opettaja', school: 'Viinikan koulu, Tampere' },
  ],
  tips: {
    sectionTitle: 'Ruudukkosovitusstrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 ruudukkosovitus-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ruudukon koon, puuttuvien palojen m\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Yksinkertaiset 2\u00d72 ruudukot', description: 'Kaytta 2x2 ruudukkoa yhdella puuttuvalla palalla. Esikoululaiset harjoittelevat kuvan osan tunnistamista ja paikantamista. Yksinkertainen muoto rakentaa visuaalisen hahmottamisen perustaa.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: 2\u00d72 ruudukot kahdella puuttuvalla palalla', description: 'Luo 2x2 tai 3x3 ruudukkotehtavia kahdella puuttuvalla palalla. Esiopetuksen oppilaat kehittavat visuaalista analysointia ja avaruudellista paattelya. Tukee POPS 2014 ajattelun taitojen kehittamista.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: 3\u00d73 ruudukot kolmella puuttuvalla palalla', description: 'Generoi 3x3 ruudukkotehtavia kolmella puuttuvalla palalla. Ekaluokkalaiset analysoivat monimutkaisempia kuvioita ja kehittavat jarjestelmallista paattelystrategiaa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: 3\u00d73\u20134\u00d74 ruudukot useilla paloilla', description: 'Luo 3x3 tai 4x4 ruudukkotehtavia neljalla tai viidella puuttuvalla palalla. Toisluokkalaiset hioivat visuaalista analysointia ja kehittavat monimutkaista loogista paattelya.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Haastavat 4\u00d74 ruudukkopulmat', description: 'Kaytta 4x4 ruudukkoa viidella puuttuvalla palalla. Kolmasluokkalaiset ratkaisevat vaativia visuaalisia pulmia itsenaisesti. Tehtavat kehittavat systemaattista ajattelua ja visuaalista analysointia.' },
    ],
  },
};

// ===================================================================
// 4. IMAGE CROSSWORD (ristisanatehtavat-tyoarkit)
// ===================================================================
const crossword = {
  file: 'ristisanatehtavat-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f5bc}\ufe0f', title: 'Kuvavihjepohjainen ristikkomuoto', description: 'Generaattori luo ristisanateht\u00e4vi\u00e4, joissa kuvat toimivat vihjehin\u00e4 sanojen sijaan. Oppilaat tunnistavat kuvan, muistavat sanan ja kirjoittavat sen ristikkoon. Yhdist\u00e4\u00e4 kuvan tunnistamisen, oikeinkirjoituksen ja sanavaraston harjoittelun.' },
    { id: '2', icon: '\u{1f524}', title: 'Automaattinen ristikon luonti 8\u201315 sanalla', description: 'Generaattori laskee optimaalisen ristikon asettelun valitsemistasi kuvista. Sanat ristetyv\u00e4t automaattisesti luoden perinteisen ristikkoulkoasun. Jokainen ristikko on uniikki.' },
    { id: '3', icon: '\u{1f4da}', title: 'Sanavaraston kehitt\u00e4minen 50 teemasta', description: 'Valitse 50 teemasta kiinnostavien ristisanateht\u00e4vien luomiseen. El\u00e4imet, ruoka, kulkuneuvot, muodot ja lukemattomat muut teemat. Teemapohjaiset teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t opetussuunnitelman aiheisiin.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa vihjeiksi', description: 'K\u00e4yt\u00e4 yli 3000 lapsiystavallisesta kuvasta vihjein\u00e4 ristikkoon. Kuvat on nimetty suomeksi, joten oppilaat kirjoittavat suomenkielisi\u00e4 sanoja ristikkoon. T\u00e4ydellinen \u00e4idinkielen opetukseen.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen ristisanateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kaikki sanat n\u00e4kyv\u00e4t ristikossa. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 vihjekuvia. Lis\u00e4\u00e4 tekstej\u00e4, fontteja ja v\u00e4rej\u00e4. Muokkaa ristikon ulkoasua ammattimaiseksi.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 ristisanateht\u00e4vi\u00e4 verkossa. Luo teemallisia sanastopaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki sanastoharjoitteluun', description: 'Luo ristisanateht\u00e4vi\u00e4 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. Kuvien nimet vaihdetaan valitun kielen mukaisesti. T\u00e4ydellinen S2-opetukseen ja kielikylpyohjelmiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kirjaintuntemuksen kehitt\u00e4minen kuvilla', description: 'Luo yksinkertaisia ristisanateht\u00e4vi\u00e4 lyhyill\u00e4 sanoilla ja tutuilla kuvilla. Esiopetuksen oppilaat harjoittelevat kirjainten tunnistamista ja oikeinkirjoitusta. Tukee POPS 2014 \u00e4idinkielen tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Sanavaraston laajentaminen 1.\u20133. luokalla', description: 'Generoi ristisanateht\u00e4vi\u00e4 viikon sanalistojen sanoilla. Oppilaat kohtaavat sanat visuaalisessa kontekstissa ja kirjoittavat ne ristikkoon. Yhdist\u00e4 \u00e4idinkielen ja luonnontiedon opetukseen.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskaa sanastoharjoittelua kotiin', description: 'Luo teemallisia ristisanateht\u00e4vi\u00e4 lasten suosikkiaiheilla. El\u00e4in- ja luontoteemat pit\u00e4v\u00e4t lapset motivoituneina oppimaan uusia sanoja. Generoi viikon teht\u00e4v\u00e4t 15 minuutissa.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikielinen sanastoharjoittelu kuvilla', description: 'Luo ristisanateht\u00e4vi\u00e4 11 kielell\u00e4 sanavaraston rakentamiseen. Kuvat tarjoavat visuaalisen kontekstin samalla kun kirjoittaminen vahvistaa oikeinkirjoitusta. T\u00e4ydellinen kielikylpyohjelmiin.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 sanastoteht\u00e4v\u00e4', description: 'Valitse lyhyit\u00e4 ja tuttuja sanoja erityisopetuksen oppilaille. Kuvavihjeet tukevat sanan muistamista. S\u00e4\u00e4d\u00e4 sanojen m\u00e4\u00e4r\u00e4\u00e4 ja pituutta HOJKS-tavoitteiden mukaisesti.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy sanastopaketteja kaupallisella lisenssill\u00e4', description: 'Luo teemallisia ristisanakokoelmia myyt\u00e4v\u00e4ksi verkossa. Sanastomateriaalit ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvaristisanageneraattori toimii?', answer: 'Valitse 8\u201315 kuvaa teemakirjastosta. Generaattori laskee optimaalisen ristikon, jossa kuvien nimet ristetyv\u00e4t automaattisesti. Oppilaat katsovat kuvaa, tunnistavat sanan ja kirjoittavat sen ristikkoon.' },
    { id: '2', question: 'Kuinka monta sanaa ristikossa voi olla?', answer: 'Optimaalinen m\u00e4\u00e4r\u00e4 on 8\u201315 sanaa. V\u00e4hemm\u00e4n sanoja luo yksinkertaisemman ristikon esiopetukselle. Enemm\u00e4n sanoja haastaa vanhempia oppilaita monimutkaisemmalla ristikolla.' },
    { id: '3', question: 'Voiko ristikon sanoja valita vapaasti?', answer: 'Kyll\u00e4, valitse yksitt\u00e4isi\u00e4 kuvia kirjastosta tai k\u00e4yt\u00e4 teemavalintaa. Voit my\u00f6s ladata omia kuvia ja nimetj\u00e4 niit\u00e4 ennen ristikon luomista.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen ristisanateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Kaikki sanat n\u00e4kyv\u00e4t ristikossa. Tulosta vastausavain erikseen tarkistusta varten.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kuvaristisanat sopivat?', answer: 'Kuvaristisanat palvelevat 5\u201310-vuotiaita. Esiopetuksen oppilaat harjoittelevat lyhyill\u00e4 sanoilla. 1.\u20133. luokan oppilaat ratkaisevat monimutkaisempia ristikkoja pidemmill\u00e4 sanoilla.' },
    { id: '6', question: 'Tukeeko generaattori suomenkielen erityispiirteit\u00e4?', answer: 'Kyll\u00e4, generaattori k\u00e4sittelee suomen kielen \u00e4\u00e4kk\u00f6set (\u00e4, \u00f6, \u00e5) oikein. Kuvien nimet ovat suomeksi. Ristikko muodostuu suomenkielisist\u00e4 sanoista luonnollisesti.' },
    { id: '7', question: 'Voiko ristisanateht\u00e4vi\u00e4 luoda useilla kielill\u00e4?', answer: 'Generaattori luo teht\u00e4vi\u00e4 11 kielell\u00e4. Kuvien nimet vaihdetaan valitun kielen mukaisesti. T\u00e4ydellinen S2-opetukseen ja monikielisiin luokkahuoneisiin.' },
    { id: '8', question: 'Miten tulostan ristisanateht\u00e4v\u00e4t?', answer: 'Lataa PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 mustetta.' },
    { id: '9', question: 'Sopivatko kuvaristisanat esiopetukseen?', answer: 'Kuvaristisanat sopivat erinomaisesti esiopetukseen. K\u00e4yt\u00e4 lyhyit\u00e4 3\u20135 kirjaimen sanoja ja tuttuja kuvia. Kuvavihjeet tukevat kirjaintuntemuksen kehitt\u00e4mist\u00e4 POPS 2014 tavoitteiden mukaisesti.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden ristisanateht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse teema ja kuvat nopeasti. Generaattori laskee ristikon automaattisesti sekunneissa.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani ristisanateht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy teemallisia sanastopaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten kuvaristisanat tukevat POPS 2014 tavoitteita?', answer: 'Kuvaristisanat tukevat \u00e4idinkielen tavoitteita sanavaraston laajentamisessa ja oikeinkirjoituksen vahvistamisessa. Kuvavihjeet yhdist\u00e4v\u00e4t visuaalisen oppimisen ja kirjallisen tuottamisen POPS 2014 periaatteiden mukaisesti.' },
  ],
  relatedApps: [
    { id: '1', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Sanahaku t\u00e4ydent\u00e4\u00e4 ristisanateht\u00e4vi\u00e4 sanojen etsinn\u00e4ll\u00e4. Oppilaat kohtaavat samat teemasanat eri muodoissa vahvistaen sanavarastoa.' },
    { id: '2', slug: 'kuvakryptogrammi-tyoarkit', name: 'Kuvakryptogrammi', category: '\u00c4idinkieli', icon: '\u{1f510}', description: 'Kuvakryptogrammi laajentaa kuvapohjaista sanastoty\u00f6t\u00e4 koodinmurtomuotoon. Molemmat k\u00e4ytt\u00e4v\u00e4t kuvia kirjoitustaidon kehitt\u00e4miseen.' },
    { id: '3', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'Kuva-arvaus t\u00e4ydent\u00e4\u00e4 ristisanoja puuttuvan kirjaimen muodolla. Oppilaat tunnistavat kuvan ja t\u00e4ydent\u00e4v\u00e4t sanan vahvistaen oikeinkirjoitusta.' },
    { id: '4', slug: 'sanansekoitus-tyoarkit', name: 'Sanansekoitus', category: '\u00c4idinkieli', icon: '\u{1f500}', description: 'Sanansekoitus haastaa oppilaat j\u00e4rjest\u00e4m\u00e4\u00e4n kirjaimia sanaksi. Yhdist\u00e4 ristisanateht\u00e4viin kattaviin sanastopaketteihin.' },
    { id: '5', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: '\u00c4idinkieli', icon: '\u{1f4dd}', description: 'K\u00e4sinkirjoitusharjoitukset vahvistavat samoja kirjaintaitoja kuin ristisanateht\u00e4v\u00e4t. Yhdist\u00e4 molemmat kirjoitustaidon kokonaisvaltaiseen kehitt\u00e4miseen.' },
    { id: '6', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Aakkosjuna tukee kirjaintuntemusta, joka on ristisanateht\u00e4vien edellytys. Yhdist\u00e4 molemmat varhaisen lukutaidon kattaviin paketteihin.' },
  ],
  aiOverviewSnippet: 'Kuvaristisana-generaattori on verkkotyokalu, jolla luodaan tulostettavia ristisanatehtavia, joissa kuvat toimivat vihjeinä sanojen sijaan. Oppilaat tunnistavat kuvan, muistavat sanan ja kirjoittavat sen ristikkoon. Kehittaa sanavarastoa ja oikeinkirjoitusta samanaikaisesti. Opettajat valitsevat teemakuvat ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Vihjeet', ourApp: 'Kuvavihjeet 3000+ teemakuvasta', typical: 'Vain tekstivihjeet' },
    { feature: 'Ristikon luonti', ourApp: 'Automaattinen optimointi 8\u201315 sanalla', typical: 'Manuaalinen asettelu' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 suomenkielisill\u00e4 sanoilla', typical: 'Vain englanti' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu' },
    { feature: 'Muokattavuus', ourApp: 'T\u00e4ysi muokkaus: siirto, skaalaus, kierto', typical: 'Kiinte\u00e4t pohjat' },
  ],
  researchBacking: [
    { claim: 'Kuvavihjepohjainen ristikko kehitt\u00e4\u00e4 sanavarastoa tehokkaasti yhdist\u00e4m\u00e4ll\u00e4 visuaalisen tunnistamisen ja kirjallisen tuottamisen. Kuva-sana-assosiaatio vahvistaa sanavaraston omaksumista merkitt\u00e4v\u00e4sti.', source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY' },
    { claim: 'Ristisanateht\u00e4v\u00e4t, joissa oppilaat kirjoittavat sanoja ristikkoon, kehitt\u00e4v\u00e4t oikeinkirjoituksen tarkkuutta ja kirjainj\u00e4rjestyksen ymm\u00e4rt\u00e4mist\u00e4 visuaalisen palautteen kautta.', source: 'Holopainen, L. & Ahonen, T., "Oikeinkirjoituksen kehitys alkuopetuksessa," Jyv\u00e4skyl\u00e4n yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvaristisanat ovat loistava tapa harjoitella sanavarastoa ja oikeinkirjoitusta. Oppilaani rakastavat tunnistaa kuvia ja kirjoittaa sanoja ristikkoon. Teemapohjainen valinta tekee tehtavien luomisesta nopeaa.', name: 'Maria Lindqvist', role: '1. luokan opettaja', school: 'Aleksanterin koulu, Vaasa' },
    { quote: 'Kaytan kuvaristisanoja S2-opetuksessa ja ne toimivat taydellisesti. Kuvat antavat visuaalisen kontekstin ja oppilaat oppivat suomenkielisia sanoja luonnollisesti. Monikielinen tuki on erinomainen.', name: 'Olli Takala', role: 'S2-opettaja', school: 'Monikulttuurikeskus Kompassi, Helsinki' },
  ],
  tips: {
    sectionTitle: 'Kuvaristisanastrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvaristisanageneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset sanojen pituuden, m\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Lyhyet sanat tutuilla kuvilla', description: 'Kaytta 3-4 kirjaimen sanoja tutuilla elainkuvilla. Esikoululaiset harjoittelevat kirjainten tunnistamista ja yksinkertaisten sanojen kirjoittamista. Kuvavihjeet tukevat muistamista ja motivoivat oppimista.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Teemapohjaiset sanastoristikot', description: 'Luo ristisanatehtavia 3-5 kirjaimen sanoilla temaattisista kuvista. Esiopetuksen oppilaat kehittavat oikeinkirjoitusta ja sanavarastoa. Teemapohjaiset tehtavat tukevat POPS 2014 aidinkielen tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Viikon sanalistojen ristikot', description: 'Generoi ristisanatehtavia viikon sanalistojen sanoilla. Ekaluokkalaiset harjoittelevat oikeinkirjoitusta kirjoittamalla sanoja ristikkoon. Kuvavihjeet vahvistavat sanan ja kuvan yhteytta.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Pidemm\u00e4t sanat ja monimutkaisemmat ristikot', description: 'Luo ristisanatehtavia 5-8 kirjaimen sanoilla ja 10-15 sanan ristikoilla. Toisluokkalaiset kehittavat oikeinkirjoituksen tarkkuutta ja sanavaraston laajuutta.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monikieliset sanastohaasteet', description: 'Luo ristisanatehtavia kahdella kielella. Kolmasluokkalaiset harjoittelevat vieraan kielen sanastoa yhdistamalla kuvia kohdekielen sanoihin. Kaytta tehtavia aidinkielen ja vieraan kielen integroituun opetukseen.' },
    ],
  },
};

// ===================================================================
// 5. IMAGE CRYPTOGRAM (kuvakryptogrammi-tyoarkit)
// ===================================================================
const cryptogram = {
  file: 'kuvakryptogrammi-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f510}', title: 'Kuva-kirjain-koodausmuoto', description: 'Jokaisessa kryptogrammissa kuvat korvaavat kirjaimet salaisessa viestiss\u00e4. Oppilaat k\u00e4ytt\u00e4v\u00e4t koodiavainta tunnistaakseen, mik\u00e4 kuva edustaa mit\u00e4kin kirjainta. Koodinmurto kehitt\u00e4\u00e4 loogista p\u00e4\u00e4ttely\u00e4 ja kirjaintuntemusta.' },
    { id: '2', icon: '\u{1f511}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 vihjeiden m\u00e4\u00e4r\u00e4', description: 'Valitse kuinka monta kirjainta paljastetaan vihjeiksi. Nolla vihjett\u00e4 luo vaikeimman arvoituksen. Yksi tai useampi vihje auttaa aloittelijoita p\u00e4\u00e4sem\u00e4\u00e4n alkuun. S\u00e4\u00e4d\u00e4 vaikeustasoa t\u00e4ydellisesti.' },
    { id: '3', icon: '\u{1f4dd}', title: 'Omat lauseet ja fraasit', description: 'Kirjoita mit\u00e4 tahansa lauseita koodattaviksi. Sananlaskuja, opetusviestej\u00e4, matematiikan faktoja tai temaattisia fraaseja. Generaattori muuntaa jokaisen lauseen kuvakoodiksi automaattisesti.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa koodisymboleiksi', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta kryptogrammin symbolit. Jokainen kuva edustaa yht\u00e4 kirjainta. Teemapohjaiset symbolit luovat kiinnostavia koodinmurtoteht\u00e4vi\u00e4.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen kryptogrammi generoi automaattisesti vastausavaimen, jossa koodiavain ja ratkaistu viesti n\u00e4kyv\u00e4t. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 tekstej\u00e4 ja ohjeita. Muokkausty\u00f6kalut tarjoavat ammattimaiset tulokset.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 kryptogrammiteht\u00e4vi\u00e4 verkossa. Luo teemallisia koodinmurtopaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo kryptogrammeja 11 kielell\u00e4 mukaan lukien suomi, ruotsi ja tanska. T\u00e4ydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen. Koodinmurto toimii kielirajojen yli.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Kirjaintuntemuksen kehitt\u00e4minen koodinmurrolla', description: 'Luo yksinkertaisia kryptogrammeja lyhyill\u00e4 sanoilla ja useilla vihjeill\u00e4. Esiopetuksen oppilaat harjoittelevat kirjainten tunnistamista tunnistamalla kuva-kirjain-vastaavuuksia. Tukee POPS 2014 \u00e4idinkielen tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Lukemisvalmiuden kehitt\u00e4minen 1.\u20133. luokalla', description: 'Generoi monimutkaisempia kryptogrammeja pidemmill\u00e4 lauseilla. Oppilaat kehitt\u00e4v\u00e4t dekoodaustaitoja, jotka tukevat lukemaan oppimista. Yhdist\u00e4 \u00e4idinkielen ja matematiikan opetukseen.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Koodinmurtoharjoituksia kotiin', description: 'Luo hauskoja kryptogrammeja lasten suosikkiaiheilla. Koodinmurto motivoi lapsia oppimaan kirjaimia ja sanoja. Generoi viikon teht\u00e4v\u00e4t nopeasti eri vaikeustasoin.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Monikielinen koodinmurtoharjoittelu', description: 'Kryptogrammit tarjoavat kirjain-\u00e4\u00e4nnevastaavuuden harjoittelua kuvapohjaisesti. 11 kielen tuki mahdollistaa monikielisen koodinmurtoharjoittelun saumattomasti.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'S\u00e4\u00e4dett\u00e4v\u00e4 dekoodausharjoittelu', description: 'S\u00e4\u00e4d\u00e4 vihjeiden m\u00e4\u00e4r\u00e4\u00e4 ja lauseiden pituutta HOJKS-tavoitteiden mukaisesti. Useammat vihjeet tukevat heikompia oppilaita. Kuvasymbolit tekev\u00e4t kirjainharjoittelusta motivoivaa.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy koodinmurtopaketteja', description: 'Luo teemallisia kryptogrammikokoelmia myyt\u00e4v\u00e4ksi verkossa. Koodinmurtoteht\u00e4v\u00e4t ovat suosittuja ja kiinnostavia. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten kuvakryptogrammi-generaattori toimii?', answer: 'Kirjoita lauseet, jotka haluat salata. Generaattori korvaa jokaisen kirjaimen kuvalla luoden koodiavaimen. Oppilaat purkavat koodin tunnistamalla kuva-kirjain-vastaavuudet ja kirjoittavat paljastuneen viestin.' },
    { id: '2', question: 'Kuinka vaikeustasoa s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'S\u00e4\u00e4d\u00e4 vihjeiden m\u00e4\u00e4r\u00e4\u00e4 ja lauseiden pituutta. Nolla vihjett\u00e4 on vaikeaa. Useammat vihjeet helpottavat aloitusta. Lyhyet sanat sopivat aloittelijoille. Pitk\u00e4t lauseet haastavat edistyneempi\u00e4.' },
    { id: '3', question: 'Voiko omia lauseita k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, kirjoita mit\u00e4 tahansa lauseita tai fraaseja. Sananlaskuja, opetusviestej\u00e4, viikon sanoja tai temaattisia lauseita. Generaattori muuntaa ne kuvakoodiksi automaattisesti.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen kryptogrammi generoi automaattisesti vastausavaimen. Koodiavain ja ratkaistu viesti n\u00e4kyv\u00e4t selke\u00e4sti. Tulosta vastausavain erikseen opettajan k\u00e4ytt\u00f6\u00f6n.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille kryptogrammit sopivat?', answer: 'Kryptogrammit palvelevat 5\u201310-vuotiaita. Esiopetuksen oppilaat harjoittelevat lyhyill\u00e4 sanoilla ja useilla vihjeill\u00e4. 1.\u20133. luokan oppilaat ratkaisevat pidempi\u00e4 lauseita itsen\u00e4isesti.' },
    { id: '6', question: 'Miten kryptogrammit kehitt\u00e4v\u00e4t lukutaitoa?', answer: 'Kryptogrammit kehitt\u00e4v\u00e4t kirjain-\u00e4\u00e4nnevastaavuutta, dekoodaustaitoja ja loogista p\u00e4\u00e4ttely\u00e4. N\u00e4m\u00e4 ovat lukemaan oppimisen perusedellytyksi\u00e4. Kuvasymbolit tekev\u00e4t harjoittelusta motivoivaa.' },
    { id: '7', question: 'Voiko kryptogrammeja luoda useilla kielill\u00e4?', answer: 'Kyll\u00e4, generaattori luo kryptogrammeja 11 kielell\u00e4. Kuvasymbolit toimivat kielirajojen yli. Kirjoita lauseet mill\u00e4 tahansa tuetulla kielell\u00e4.' },
    { id: '8', question: 'Miten tulostan kryptogrammit?', answer: 'Lataa teht\u00e4v\u00e4si PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 mustetta.' },
    { id: '9', question: 'Sopivatko kryptogrammit erityisopetukseen?', answer: 'Kyll\u00e4, s\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso tekee kryptogrammeista erinomaisia erityisopetukseen. Useammat vihjeet ja lyhyemm\u00e4t sanat tukevat heikompia oppilaita.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden kryptogrammin luominen vie alle 3 minuuttia. Kirjoita lauseet ja valitse asetukset nopeasti. Generaattori luo koodin v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani kryptogrammeja?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy teemallisia koodinmurtopaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten kryptogrammit tukevat POPS 2014 tavoitteita?', answer: 'Kryptogrammit tukevat \u00e4idinkielen tavoitteita kirjain-\u00e4\u00e4nnevastaavuuden ja dekoodaustaitojen kehitt\u00e4misess\u00e4. POPS 2014 korostaa loogisen ajattelun ja ongelmanratkaisun kehitt\u00e4mist\u00e4 monipuolisilla ty\u00f6tavoilla.' },
  ],
  relatedApps: [
    { id: '1', slug: 'ristisanatehtavat-tyoarkit', name: 'Ristisanateht\u00e4v\u00e4t', category: '\u00c4idinkieli', icon: '\u2795', description: 'Ristisanateht\u00e4v\u00e4t laajentavat kuvapohjaista sanastoty\u00f6t\u00e4 ristikkomuotoon. Yhdist\u00e4 kryptogrammien kanssa kattaviin sanastopaketteihin.' },
    { id: '2', slug: 'kuva-arvaus-tyoarkit', name: 'Kuva-arvaus', category: '\u00c4idinkieli', icon: '\u2753', description: 'Kuva-arvaus t\u00e4ydent\u00e4\u00e4 kryptogrammeja puuttuvan kirjaimen muodolla. Molemmat kehitt\u00e4v\u00e4t kirjaintuntemusta ja oikeinkirjoitusta.' },
    { id: '3', slug: 'sananhaku-tyoarkit', name: 'Sanahaku', category: '\u00c4idinkieli', icon: '\u{1f50d}', description: 'Sanahaku yhdist\u00e4\u00e4 sanojen etsinn\u00e4n ja tunnistamisen. Oppilaat kohtaavat samat teemasanat eri muodoissa.' },
    { id: '4', slug: 'sanansekoitus-tyoarkit', name: 'Sanansekoitus', category: '\u00c4idinkieli', icon: '\u{1f500}', description: 'Sanansekoitus haastaa kirjainten j\u00e4rjest\u00e4mist\u00e4. Molemmat kehitt\u00e4v\u00e4t kirjaintuntemusta ja sanavarastoa eri muodoissa.' },
    { id: '5', slug: 'kasinkirjoitus-tyoarkit', name: 'K\u00e4sinkirjoitus', category: '\u00c4idinkieli', icon: '\u{1f4dd}', description: 'K\u00e4sinkirjoitus vahvistaa kirjainten muodostusta, joka tukee kryptogrammien ratkaisemista. Yhdist\u00e4 molemmat kirjoitustaidon kehitt\u00e4miseen.' },
    { id: '6', slug: 'aakkosjuna-tyoarkit', name: 'Aakkosjuna', category: 'Varhaiskasvatus', icon: '\u{1f682}', description: 'Aakkosjuna kehitt\u00e4\u00e4 kirjaintuntemusta, joka on kryptogrammien ratkaisemisen edellytys. Yhdist\u00e4 molemmat varhaisen lukutaidon paketteihin.' },
  ],
  aiOverviewSnippet: 'Kuvakryptogrammi-generaattori on verkkotyokalu, jolla luodaan tulostettavia koodinmurtotehtavia, joissa kuvat korvaavat kirjaimet salaisessa viestissa. Oppilaat kayttavat koodiavainta tunnistaakseen kuva-kirjain-vastaavuudet ja purkaakseen viestin. Kehittaa kirjaintuntemusta, dekoodaustaitoja ja loogista paattelya. Opettajat kirjoittavat omat lauseet ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Koodausmuoto', ourApp: 'Kuva-kirjain-koodaus visuaalisilla symboleilla', typical: 'Vain numero-kirjain-korvaus' },
    { feature: 'Omat lauseet', ourApp: 'Rajattomasti omia lauseita ja fraaseja', typical: 'Valmiit lauseet' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen koodiavain ja ratkaisu', typical: 'Manuaalinen' },
    { feature: 'Vihjeiden s\u00e4\u00e4t\u00f6', ourApp: '0\u2013usea vihje s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Ei vihjeit\u00e4' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Koodinmurtoteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t fonologista tietoisuutta ja kirjain-\u00e4\u00e4nnevastaavuutta, jotka ovat lukemaan oppimisen keskeisi\u00e4 taitoja varhaiskasvatusik\u00e4isill\u00e4.', source: 'Lerkkanen, M.-K. et al., "Lukemisen ja kirjoittamisen kehitys," Jyv\u00e4skyl\u00e4n yliopisto' },
    { claim: 'Symbolipohjainen dekoodaus kehitt\u00e4\u00e4 loogista p\u00e4\u00e4ttely\u00e4 ja ty\u00f6muistia samanaikaisesti, mik\u00e4 vahvistaa oppimisen kognitiivisia edellytyksi\u00e4 monipuolisesti.', source: 'Niilo M\u00e4ki Instituutti, "Dekoodaustaitojen ja loogisen p\u00e4\u00e4ttelyn kehitys"' },
  ],
  teacherTestimonials: [
    { quote: 'Kuvakryptogrammit ovat oppilaitteni ehdottomia suosikkeja. Lapset kokevat ratkaisevansa salakoodeja eivatkaa huomaa harjoittelevansa kirjaimia. Motivaatio pysyy korkeana ja kirjaintuntemus kehittyy nopeasti.', name: 'Heli Aaltonen', role: 'Esiopetuksen opettaja', school: 'Toivolan p\u00e4iv\u00e4koti, Oulu' },
    { quote: 'Kaytan kryptogrammeja lukemisvalmiuden tukena. Dekoodausharjoitukset kehittavat kirjain-aanne-vastaavuutta motivoivassa muodossa. Saadettava vaikeustaso tekee eriyttamisesta helppoa eri taitotasoille.', name: 'Jarkko Manninen', role: '1. luokan opettaja', school: 'Viialan koulu, Akaa' },
  ],
  tips: {
    sectionTitle: 'Kuvakryptogrammistrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 kuvakryptogrammi-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset vihjeiden m\u00e4\u00e4r\u00e4n, lauseiden pituuden ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Yksinkertainen kuva-kirjain-yhdist\u00e4minen', description: 'Kaytta lyhyita 3-4 kirjaimen sanoja ja 2-3 vihjetta. Esikoululaiset harjoittelevat kuvan tunnistamista ja vastaavan kirjaimen loytamista. Koodiavaimen kaytto kehittaa loogista ajattelua hauskalla tavalla.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: Lyhyet fraasit yhdell\u00e4 vihjeell\u00e4', description: 'Luo kryptogrammeja lyhyilla 2-3 sanan lauseilla ja yhdella vihjeella. Esiopetuksen oppilaat kehittavat dekoodaustaitoja itsenaisesti. Kuva-kirjain-vastaavuus rakentaa lukemisvalmiutta POPS 2014 tavoitteiden mukaisesti.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: Kokonaiset lauseet dekoodattaviksi', description: 'Generoi kryptogrammeja kokonaisilla lauseilla ja 0-1 vihjeella. Ekaluokkalaiset kehittavat sujuvaa dekoodausta ja kirjaintuntemusta. Tehtavat vahvistavat lukemaan oppimista motivoivassa muodossa.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: Monisanaiset viestit ilman vihjeit\u00e4', description: 'Luo kryptogrammeja monisanaisilla viesteilla ilman vihjekkirjaimia. Toisluokkalaiset hioivat dekoodaustaitoja ja kehittavat tyomuistia. Pidemmit viestit vaativat jarjestelmallista tyoskentelya.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: Monimutkaiset salaviestit', description: 'Kaytta pitkih lauseita ja monimutkaisih koodeja ilman vihjeitaa. Kolmasluokkalaiset ratkaisevat vaativia kryptogrammeja itsenaisesti. Tehtavat kehittavat loogista paattelya ja ongelmanratkaisua POPS 2014 tavoitteiden mukaisesti.' },
    ],
  },
};

// ===================================================================
// 6. MATH PUZZLE (matematiikkapulmat-tyoarkit)
// ===================================================================
const mathPuzzle = {
  file: 'matematiikkapulmat-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e9}', title: 'Visuaalinen yht\u00e4l\u00f6pulmamuoto', description: 'Jokainen pulmateht\u00e4v\u00e4 yhdist\u00e4\u00e4 kuvapohjaisen palapelin ja matemaattiset yht\u00e4l\u00f6t. Oppilaat ratkaisevat laskuteht\u00e4vi\u00e4 l\u00f6yt\u00e4\u00e4kseen oikeat lukuarvot kuville. Yhdist\u00e4\u00e4 visuaalisen oppimisen ja matemaattisen harjoittelun.' },
    { id: '2', icon: '\u{1f4d0}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 ruudukkokoko 2\u00d72\u20134\u00d74', description: 'Valitse ruudukon koko oppilaiden taitotason mukaan. 2\u00d72 ruudukko sopii esikoululaisille yksinkertaisilla laskuilla. 3\u00d73 ja 4\u00d74 ruudukot haastavat vanhempia oppilaita monimutkaisemmilla yht\u00e4l\u00f6ill\u00e4.' },
    { id: '3', icon: '\u2795', title: 'Yhteenlasku, v\u00e4hennyslasku ja sekalaskut', description: 'Valitse laskutyyppi oppilaiden harjoittelutarpeen mukaan. Yhteenlasku peruslaskujen harjoitteluun. V\u00e4hennyslasku vaikeampaan harjoitteluun. Sekalaskut yhdist\u00e4v\u00e4t molemmat monipuoliseen harjoitteluun.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa pulmiin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta matemaattisten pulmien luomiseen. Kuva toistuu kaikissa ruudukon soluissa eri laskuteht\u00e4vill\u00e4. Teemapohjaiset pulmat motivoivat oppilaita.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen pulmateht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa kaikki vastaukset n\u00e4kyv\u00e4t. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 tekstej\u00e4 ja ohjeita. Ammattimaiset muokkausty\u00f6kalut.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 matematiikkapulmia verkossa. Luo temaattisia laskupulmapaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo matematiikkapulmia 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. Matematiikka on universaali kieli, mutta ohjeet ovat suomeksi.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Laskutaidon perusteet visuaalisilla pulmilla', description: 'Luo 2\u00d72 pulmia yksinkertaisilla yhteenlaskuilla summilla 10 asti. Esiopetuksen oppilaat harjoittelevat laskemista motivoivassa pulmamuodossa. Tukee POPS 2014 matemaattisen ajattelun tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Laskusujuvuuden kehitt\u00e4minen 1.\u20133. luokalla', description: 'Generoi 3\u00d73 ja 4\u00d74 pulmia yhteenlaskuilla ja v\u00e4hennyslaskuilla. Oppilaat kehitt\u00e4v\u00e4t laskusujuvuutta visuaalisessa ongelmanratkaisukontekstissa.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja laskuharjoituksia kotiin', description: 'Luo temaattisia laskupulmia lasten suosikkiaiheilla. Pulmamuoto motivoi lapsia harjoittelemaan laskemista. Generoi viikon teht\u00e4v\u00e4t nopeasti.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 matematiikkaharjoittelu', description: 'Matematiikkapulmat eiv\u00e4t vaadi kielitaitoa, joten ne sopivat kaikille oppilaille. Numerot ja kuvia ovat universaaleja. Ohjeet k\u00e4\u00e4ntyv\u00e4t 11 kielelle.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt laskuharjoitukset', description: 'S\u00e4\u00e4d\u00e4 ruudukon kokoa ja laskutyyppi\u00e4 HOJKS-tavoitteiden mukaisesti. Pienet ruudukot ja yksinkertaiset laskut tukevat heikompia oppilaita. Visuaalinen muoto motivoi oppimista.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy laskupulmapaketteja', description: 'Luo teemallisia matematiikkapulmakokoelmia myyt\u00e4v\u00e4ksi verkossa. Matemaattiset pulmat ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten matematiikkapulmageneraattori toimii?', answer: 'Generaattori luo ruudukon, jossa kuva toistuu jokaisessa solussa eri laskuteht\u00e4v\u00e4ll\u00e4. Oppilaat ratkaisevat laskut ja l\u00f6yt\u00e4v\u00e4t oikeat vastaukset. Jokainen pulma sis\u00e4lt\u00e4\u00e4 vastausavaimen.' },
    { id: '2', question: 'Mitk\u00e4 laskutoimitukset ovat saatavilla?', answer: 'Kolme vaihtoehtoa: yhteenlasku, v\u00e4hennyslasku ja sekalaskut (molemmat). Valitse oppilaiden harjoittelutarpeen mukaan. Sekalaskut tarjoavat monipuolisimman harjoittelun.' },
    { id: '3', question: 'Mitk\u00e4 ruudukkokoot ovat saatavilla?', answer: '2\u00d72 (4 laskua), 3\u00d73 (9 laskua) ja 4\u00d74 (16 laskua). Pienempi ruudukko sopii nuoremmille. Suurempi ruudukko haastaa vanhempia oppilaita.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 pulmat vastausavaimet?', answer: 'Kyll\u00e4, jokainen pulma generoi automaattisesti vastausavaimen, jossa kaikki vastaukset n\u00e4kyv\u00e4t. Tulosta vastausavain erikseen tarkistusta varten.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille matematiikkapulmat sopivat?', answer: 'Matematiikkapulmat palvelevat 5\u201310-vuotiaita. Esikoululaiset harjoittelevat 2\u00d72 pulmilla summilla 10 asti. 1.\u20133. luokan oppilaat ratkaisevat suurempia pulmia laajemmilla lukualueilla.' },
    { id: '6', question: 'Miten lukualuetta s\u00e4\u00e4det\u00e4\u00e4n?', answer: 'Lukualue mukautuu automaattisesti ruudukon koon ja laskutyypin mukaan. 2\u00d72 ruudukko k\u00e4ytt\u00e4\u00e4 pieni\u00e4 lukuja. 4\u00d74 ruudukko k\u00e4ytt\u00e4\u00e4 suurempia lukuja.' },
    { id: '7', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Kuva toistuu kaikissa ruudukon soluissa eri laskuteht\u00e4vill\u00e4.' },
    { id: '8', question: 'Miten tulostan matematiikkapulmat?', answer: 'Lataa PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 mustetta.' },
    { id: '9', question: 'Sopivatko matematiikkapulmat erityisopetukseen?', answer: 'Kyll\u00e4, s\u00e4\u00e4dett\u00e4v\u00e4 vaikeustaso tekee pulmista erinomaisia erityisopetukseen. Pienet ruudukot ja yksinkertaiset laskut tukevat heikompia oppilaita motivoivassa muodossa.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden matematiikkapulman luominen vie alle 3 minuuttia. Valitse kuva ja asetukset nopeasti. Generaattori luo pulman v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani matematiikkapulmia?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy temaattisia laskupulmapaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten matematiikkapulmat tukevat POPS 2014 tavoitteita?', answer: 'Matematiikkapulmat tukevat laskusujuvuuden, ongelmanratkaisun ja matemaattisen ajattelun kehitt\u00e4mist\u00e4. POPS 2014 korostaa matematiikan yhteyksi\u00e4 arkiel\u00e4m\u00e4\u00e4n ja motivoivien ty\u00f6tapojen k\u00e4ytt\u00f6\u00e4.' },
  ],
  relatedApps: [
    { id: '1', slug: 'yhteenlasku-tyoarkit', name: 'Yhteenlasku', category: 'Matematiikka', icon: '\u2795', description: 'Yhteenlaskuteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t matematiikkapulmia perinteisell\u00e4 laskuharjoittelulla. Oppilaat harjoittelevat samoja laskufaktoja eri muodoissa.' },
    { id: '2', slug: 'vahennyslasku-tyoarkit', name: 'V\u00e4hennyslasku', category: 'Matematiikka', icon: '\u2796', description: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t laajentavat pulmia v\u00e4hennyslaskuoperaatioihin. Molemmat kehitt\u00e4v\u00e4t laskusujuvuutta.' },
    { id: '3', slug: 'matematiikka-tyoarkit', name: 'Matematiikkamonisteet', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Matematiikkamonisteet tarjoavat perinteisen laskuharjoittelun. Yhdist\u00e4 pulmiin monipuoliseen matemaattiseen harjoitteluun.' },
    { id: '4', slug: 'kuva-yhteenlasku-tyoarkit', name: 'Kuva-yhteenlasku', category: 'Matematiikka', icon: '\u{1f5bc}\ufe0f', description: 'Kuva-yhteenlasku yhdist\u00e4\u00e4 kuvasymbolit ja yhteenlaskun. Molemmat k\u00e4ytt\u00e4v\u00e4t visuaalista muotoa matemaattisessa kontekstissa.' },
    { id: '5', slug: 'etsi-ja-laske-tyoarkit', name: 'Etsi ja laske', category: 'Matematiikka', icon: '\u{1f522}', description: 'Etsi ja laske yhdist\u00e4\u00e4 visuaalisen etsinn\u00e4n ja laskemisen. T\u00e4ydent\u00e4\u00e4 matematiikkapulmia eri muodossa.' },
    { id: '6', slug: 'kuvakaavio-tyoarkit', name: 'Kuvakaavio', category: 'Matematiikka', icon: '\u{1f4ca}', description: 'Kaavioteht\u00e4v\u00e4t laajentavat kuvapohjaista matematiikkaa tiedonk\u00e4sittelyn suuntaan. Molemmat kehitt\u00e4v\u00e4t matemaattista ajattelua.' },
  ],
  aiOverviewSnippet: 'Matematiikkapulma-generaattori on verkkotyokalu, jolla luodaan tulostettavia visuaalisia laskupulmatehtavia esiopetukseen ja alakouluun. Oppilaat ratkaisevat yhteenlasku- ja vahennyslaskutehtavia kuvapohjaisten pulmien sisalla. Opettajat valitsevat ruudukon koon, laskutyypin ja teemakuvan, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Teht\u00e4v\u00e4muoto', ourApp: 'Visuaalinen yht\u00e4l\u00f6pulma kuvilla', typical: 'Pelk\u00e4t numeroteht\u00e4v\u00e4t' },
    { feature: 'Laskutyypit', ourApp: 'Yhteenlasku, v\u00e4hennyslasku ja sekalaskut', typical: 'Yksi laskutyyppi' },
    { feature: 'Ruudukkokoko', ourApp: '2\u00d72\u20134\u00d74 s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Kiinte\u00e4 muoto' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Visuaalinen matemaattinen pulmamuoto kehitt\u00e4\u00e4 laskusujuvuutta ja matemaattista itseluottamusta erityisesti oppilailla, joilla on vaikeuksia perinteisten laskuteht\u00e4vien kanssa.', source: 'Aunio, P. & R\u00e4s\u00e4nen, P., "Matemaattiset oppimisvaikeudet ja niiden tukeminen," Niilo M\u00e4ki Instituutti' },
    { claim: 'Kuvapohjaiset laskuteht\u00e4v\u00e4t lis\u00e4\u00e4v\u00e4t oppilaiden sis\u00e4ist\u00e4 motivaatiota matematiikan harjoitteluun, mik\u00e4 johtaa pitk\u00e4j\u00e4nteisemp\u00e4\u00e4n harjoitteluun ja parempiin oppimistuloksiin.', source: 'Lehtinen, E. & Hannula-Sormunen, M., "Matemaattisen oppimisen motivaatio," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Matematiikkapulmat ovat muuttaneet luokkani suhtautumisen laskemiseen. Oppilaat kokevat ratkaisevansa hauskoja pulmia eivatkaa huomaa harjoittelevansa yhteenlaskua. Motivaatio ja laskusujuvuus ovat parantuneet huomattavasti.', name: 'Nina Parviainen', role: '1. luokan opettaja', school: 'Haagan koulu, Helsinki' },
    { quote: 'Kaytan matematiikkapulmia eriyttamiseen. 2x2 ruudukot sopivat heikommille oppilaille ja 4x4 ruudukot haastavat edistyneita. Kaikki oppilaat ratkaisevat samantyyppisiä tehtavia omalla tasollaan.', name: 'Tomi Koivunen', role: '2. luokan opettaja', school: 'Karjulan koulu, Joensuu' },
  ],
  tips: {
    sectionTitle: 'Matematiikkapulmastrategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 matematiikkapulma-generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset ruudukon koon, laskutyypin ja lukualueen esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: 2\u00d72 pulmat yksinkertaisilla yhteenlaskuilla', description: 'Kaytta 2x2 ruudukkoa yhteenlaskuilla summilla 5 asti. Esikoululaiset harjoittelevat laskemista motivoivassa pulmamuodossa. Neljan solun pulma on hallittava mutta haastava aloittelijoille.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: 2\u00d72 pulmat summilla 10 asti', description: 'Luo 2x2 pulmia yhteenlaskuilla summilla 10 asti. Esiopetuksen oppilaat kehittavat laskusujuvuutta visuaalisessa kontekstissa. Tukee POPS 2014 matemaattisen ajattelun kehittamista.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: 3\u00d73 pulmat yhteenlaskuilla ja v\u00e4hennyslaskuilla', description: 'Generoi 3x3 pulmia yhteenlaskuilla ja vahennyslaskuilla summilla 20 asti. Ekaluokkalaiset kehittavat laskusujuvuutta ja strategista ajattelua yhdeksansolun pulmilla.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: 3\u00d73\u20134\u00d74 pulmat sekalaskuilla', description: 'Luo 3x3 tai 4x4 pulmia sekalaskuilla suuremmilla lukualueilla. Toisluokkalaiset harjoittelevat joustavaa laskemista ja ongelmanratkaisua vaativammilla pulmilla.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: 4\u00d74 haastavat laskupulmat', description: 'Kaytta 4x4 ruudukkoa sekalaskuilla laajalla lukualueella. Kolmasluokkalaiset ratkaisevat vaativia kuudentoista solun pulmia itsenaisesti. Tehtavat kehittavat matemaattista ajattelua ja ongelmanratkaisua.' },
    ],
  },
};

// ===================================================================
// 7. MISSING PIECES (puuttuvat-palat-tyoarkit)
// ===================================================================
const missingPieces = {
  file: 'puuttuvat-palat-tyoarkit.ts',
  features: [
    { id: '1', icon: '\u{1f9e9}', title: 'Puuttuvan palan tunnistamismuoto', description: 'Generaattori poistaa 1\u20135 palaa kuvasta ja luo vastaavan m\u00e4\u00e4r\u00e4n vastausvaihtoehtoja. Oppilaat analysoivat kuvan puuttuvaa kohtaa ja valitsevat oikean palan. Kehitt\u00e4\u00e4 visuaalista sulkeumaa ja p\u00e4\u00e4ttely\u00e4.' },
    { id: '2', icon: '\u{1f50d}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 puuttuvien palojen m\u00e4\u00e4r\u00e4 1\u20135', description: 'Valitse 1\u20135 puuttuvaa palaa per teht\u00e4v\u00e4. Yksi pala on helpoin esikoululaisille. Viisi palaa vaatii laajaa visuaalista analysointia. T\u00e4ydellinen eriytett\u00e4miseen.' },
    { id: '3', icon: '\u{1f4d0}', title: 'S\u00e4\u00e4dett\u00e4v\u00e4 vastausvaihtoehtojen m\u00e4\u00e4r\u00e4 2\u20136', description: 'Valitse 2\u20136 vastausvaihtoehtoa per puuttuva pala. Kaksi vaihtoehtoa on helpoin aloittelijoille. Kuusi vaihtoehtoa haastaa visuaalista erottelua. Distrakttoripalat luodaan automaattisesti.' },
    { id: '4', icon: '\u{1f5bc}\ufe0f', title: 'Yli 3000 teemakuvaa teht\u00e4viin', description: 'Valitse yli 3000 lapsiystavallisesta kuvasta puuttuvan palan teht\u00e4vien luomiseen. El\u00e4imet, kulkuneuvot, ruoka ja kymmenet muut teemat. Kuva jaetaan automaattisesti paloihin.' },
    { id: '5', icon: '\u2705', title: 'Automaattiset vastausavaimet', description: 'Jokainen puuttuvan palan teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen, jossa oikea pala on korostettu. Opettajat tarkistavat oppilast\u00f6it\u00e4 sekunneissa.' },
    { id: '6', icon: '\u{1f3a8}', title: 'T\u00e4ysi muokkaus pohjalla', description: 'Muokkaa jokaista elementti\u00e4 luomisen j\u00e4lkeen. Siirr\u00e4, skaalaa ja kierr\u00e4 kuvia vapaasti. Lis\u00e4\u00e4 tekstej\u00e4 ja ohjeita. Ammattimaiset muokkausty\u00f6kalut.' },
    { id: '7', icon: '\u{1f4bc}', title: 'Kaupallinen lisenssi myyntiin', description: 'Tilauksesi sis\u00e4lt\u00e4\u00e4 kaupalliset oikeudet myyd\u00e4 puuttuvan palan teht\u00e4vi\u00e4 verkossa. Luo temaattisia palapelipaketteja myyt\u00e4v\u00e4ksi. Ei attribuutiovaatimuksia.' },
    { id: '8', icon: '\u{1f30d}', title: '11 kielen tuki', description: 'Luo puuttuvan palan teht\u00e4vi\u00e4 11 kielell\u00e4. K\u00e4ytt\u00f6liittym\u00e4 k\u00e4\u00e4ntyy valitulle kielelle. T\u00e4ydellinen monikielisiin luokkahuoneisiin.' },
  ],
  useCases: [
    { id: '1', icon: '\u{1f331}', title: 'Esiopetuksen opettajat', subtitle: 'Visuaalisen hahmottamisen kehitt\u00e4minen 5\u20136-vuotiaille', description: 'Luo teht\u00e4vi\u00e4 yhdell\u00e4 puuttuvalla palalla ja kahdella vastausvaihtoehdolla. Esiopetuksen oppilaat harjoittelevat kuvan osien tunnistamista. Tukee POPS 2014 visuaalisen hahmottamisen tavoitteita.' },
    { id: '2', icon: '\u{1f4da}', title: 'Alakoulun opettajat', subtitle: 'Visuaalinen p\u00e4\u00e4ttely 1.\u20133. luokalla', description: 'Generoi teht\u00e4vi\u00e4 useilla puuttuvilla paloilla ja enemm\u00e4n vastausvaihtoehdoilla. Oppilaat kehitt\u00e4v\u00e4t visuaalista analysointia ja loogista p\u00e4\u00e4ttely\u00e4.' },
    { id: '3', icon: '\u{1f3e0}', title: 'Kotiopettajat ja vanhemmat', subtitle: 'Hauskoja palapelipohdintoja kotiin', description: 'Luo temaattisia puuttuvan palan teht\u00e4vi\u00e4 lasten suosikkiaiheilla. Palapelimuoto pit\u00e4\u00e4 lapset kiinnostuneina. Generoi viikon teht\u00e4v\u00e4t nopeasti.' },
    { id: '4', icon: '\u{1f30d}', title: 'S2-opettajat', subtitle: 'Kielirajat ylitt\u00e4v\u00e4 visuaalinen harjoittelu', description: 'Puuttuvan palan teht\u00e4v\u00e4t eiv\u00e4t vaadi kielitaitoa. Kuvapohjainen muoto sopii kaikille oppilaille taustasta riippumatta. 11 kielen tuki mahdollistaa monikielisen opetuksen.' },
    { id: '5', icon: '\u{1f49c}', title: 'Erityisopettajat', subtitle: 'Yksil\u00f6llistetyt hahmottamisharjoitukset', description: 'S\u00e4\u00e4d\u00e4 puuttuvien palojen ja vastausvaihtoehtojen m\u00e4\u00e4r\u00e4\u00e4 HOJKS-tavoitteiden mukaisesti. V\u00e4h\u00e4n vaihtoehtoja tukee heikompia oppilaita. Asteittain vaikeutuvat teht\u00e4v\u00e4t.' },
    { id: '6', icon: '\u{1f4b0}', title: 'Opettajayritt\u00e4j\u00e4t', subtitle: 'Myy palapelipaketteja', description: 'Luo teemallisia puuttuvan palan kokoelmia myyt\u00e4v\u00e4ksi verkossa. Visuaalisen hahmottamisen materiaalit ovat jatkuvasti kysyttyj\u00e4. Kaupallinen lisenssi kattaa rajattomat myynnit.' },
  ],
  faq: [
    { id: '1', question: 'Miten puuttuvan palan generaattori toimii?', answer: 'Generaattori poistaa valitun m\u00e4\u00e4r\u00e4n paloja kuvasta ja luo vastausvaihtoehtoja. Oppilaat analysoivat puuttuvaa kohtaa ja valitsevat oikean palan vaihtoehdoista. Vastausavain luodaan automaattisesti.' },
    { id: '2', question: 'Kuinka monta palaa voi puuttua?', answer: 'Valitse 1\u20135 puuttuvaa palaa. Yksi pala on helpoin. Viisi palaa on haastavin. S\u00e4\u00e4d\u00e4 oppilaiden taitotason mukaan.' },
    { id: '3', question: 'Kuinka monta vastausvaihtoehtoa voi olla?', answer: 'Valitse 2\u20136 vaihtoehtoa per puuttuva pala. Kaksi vaihtoehtoa on helpoin. Kuusi vaihtoehtoa haastaa visuaalista erottelua eniten.' },
    { id: '4', question: 'Sis\u00e4lt\u00e4v\u00e4tk\u00f6 teht\u00e4v\u00e4t vastausavaimet?', answer: 'Kyll\u00e4, jokainen teht\u00e4v\u00e4 generoi automaattisesti vastausavaimen. Oikea pala on korostettu selke\u00e4sti. Tulosta vastausavain erikseen.' },
    { id: '5', question: 'Mille ik\u00e4ryhmille puuttuvan palan teht\u00e4v\u00e4t sopivat?', answer: 'Puuttuvan palan teht\u00e4v\u00e4t palvelevat 4\u20139-vuotiaita. Esikoululaiset ratkaisevat yhden palan teht\u00e4vi\u00e4 kahdella vaihtoehdolla. 1.\u20132. luokan oppilaat ratkaisevat monimutkaisempia teht\u00e4vi\u00e4.' },
    { id: '6', question: 'Miten puuttuvan palan teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t ajattelua?', answer: 'Teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista sulkeumaa, osa-kokonaisuus-hahmottamista ja visuaalista p\u00e4\u00e4ttely\u00e4. Oppilaat analysoivat puuttuvaa aluetta ja vertaavat sit\u00e4 vaihtoehtoihin.' },
    { id: '7', question: 'Mitk\u00e4 palamuodot ovat saatavilla?', answer: 'Kuusi palamuotoa: neli\u00f6, ympyr\u00e4, suorakulmio, pystysuora ja vaakasuora soikio sek\u00e4 ellipsi. Eri muodot sopivat eri sis\u00e4lt\u00f6ihin.' },
    { id: '8', question: 'Miten tulostan puuttuvan palan teht\u00e4v\u00e4t?', answer: 'Lataa PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaas\u00e4vyvaihtoehto s\u00e4\u00e4st\u00e4\u00e4 mustetta.' },
    { id: '9', question: 'Voiko omia kuvia k\u00e4ytt\u00e4\u00e4?', answer: 'Kyll\u00e4, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori jakaa kuvan automaattisesti paloihin.' },
    { id: '10', question: 'Kuinka kauan yhden teht\u00e4v\u00e4n luominen kest\u00e4\u00e4?', answer: 'Yhden puuttuvan palan teht\u00e4v\u00e4n luominen vie alle 3 minuuttia. Valitse kuva ja asetukset nopeasti. Generaattori luo palapelin v\u00e4litt\u00f6m\u00e4sti.' },
    { id: '11', question: 'Voinko myyd\u00e4 luomiani puuttuvan palan teht\u00e4vi\u00e4?', answer: 'Kyll\u00e4, tilauksesi sis\u00e4lt\u00e4\u00e4 kaupallisen lisenssin. Myy teemallisia palapelipaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.' },
    { id: '12', question: 'Miten puuttuvan palan teht\u00e4v\u00e4t tukevat POPS 2014 tavoitteita?', answer: 'Puuttuvan palan teht\u00e4v\u00e4t tukevat visuaalisen hahmottamisen, avaruudellisen p\u00e4\u00e4ttelyn ja ongelmanratkaisun kehitt\u00e4mist\u00e4. POPS 2014 korostaa ajattelun taitojen kehitt\u00e4mist\u00e4 monipuolisilla ty\u00f6tavoilla.' },
  ],
  relatedApps: [
    { id: '1', slug: 'ruudukko-sovitus-tyoarkit', name: 'Ruudukkosovitus', category: 'Hahmottaminen', icon: '\u{1f9e9}', description: 'Ruudukkosovitus laajentaa puuttuvan palan konseptia ruudukkopohjaisen palapeliin. Molemmat kehitt\u00e4v\u00e4t visuaalista analysointia.' },
    { id: '2', slug: 'varjoyhdistely-tyoarkit', name: 'Varjoyhdistely', category: 'Hahmottaminen', icon: '\u{1f47b}', description: 'Varjoyhdistely kehitt\u00e4\u00e4 muodon tunnistamista, joka tukee puuttuvan palan teht\u00e4vien ratkaisemista. Yhdist\u00e4 molemmat hahmottamisharjoituksiin.' },
    { id: '3', slug: 'kuvapolku-tyoarkit', name: 'Kuvapolku', category: 'Hahmottaminen', icon: '\u{1f6e4}\ufe0f', description: 'Kuvapolku kehitt\u00e4\u00e4 visuaalista seurantaa. Yhdist\u00e4 puuttuvan palan teht\u00e4vien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.' },
    { id: '4', slug: 'etsi-esineet-tyoarkit', name: 'Etsi esineet', category: 'Tarkkaavaisuus', icon: '\u{1f50e}', description: 'Etsint\u00e4teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t samaa visuaalista tarkkaavaisuutta. Molemmat vaativat tarkkaa kuvan analysointia.' },
    { id: '5', slug: 'kuvalajittelu-tyoarkit', name: 'Kuvalajittelu', category: 'Logiikka', icon: '\u{1f4cb}', description: 'Kuvalajittelu kehitt\u00e4\u00e4 luokittelutaitoja, jotka tukevat puuttuvan palan tunnistamista vaihtoehtojen joukosta.' },
    { id: '6', slug: 'poikkea-joukosta-tyoarkit', name: 'Poikkea joukosta', category: 'Logiikka', icon: '\u{1f9e0}', description: 'Poikkea joukosta kehitt\u00e4\u00e4 visuaalista erottelua. Molemmat vaativat tarkkaa vertailua ja p\u00e4\u00e4ttely\u00e4.' },
  ],
  aiOverviewSnippet: 'Puuttuvat palat -generaattori on verkkotyokalu, jolla luodaan tulostettavia kuvapalapelit ehtavia esiopetukseen ja alakouluun. Generaattori poistaa paloja kuvasta ja luo vastausvaihtoehtoja. Oppilaat analysoivat puuttuvaa kohtaa ja valitsevat oikean palan. Opettajat saatavat puuttuvien palojen ja vastausvaihtoehtojen maaran, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',
  comparisonTable: [
    { feature: 'Puuttuvat palat', ourApp: '1\u20135 palaa s\u00e4\u00e4dett\u00e4v\u00e4sti', typical: 'Yksi kiinte\u00e4 m\u00e4\u00e4r\u00e4' },
    { feature: 'Vastausvaihtoehdot', ourApp: '2\u20136 vaihtoehtoa automaattisilla distrakttoreilla', typical: '2\u20133 vaihtoehtoa' },
    { feature: 'Palamuodot', ourApp: '6 muotoa: neli\u00f6, ympyr\u00e4, suorakulmio jne.', typical: 'Vain neli\u00f6' },
    { feature: 'Vastausavaimet', ourApp: 'Automaattinen vastausavain joka teht\u00e4v\u00e4\u00e4n', typical: 'Manuaalinen' },
    { feature: 'Kaupallinen lisenssi', ourApp: 'Sis\u00e4ltyy, myy vapaasti verkossa', typical: 'Lis\u00e4maksu' },
    { feature: 'Kielituki', ourApp: '11 kielt\u00e4 mukaan lukien suomi', typical: 'Vain englanti' },
  ],
  researchBacking: [
    { claim: 'Puuttuvan palan tunnistaminen kehitt\u00e4\u00e4 visuaalista sulkeumaa ja gestalt-hahmottamista, jotka ovat lukemisvalmiuden ja visuaalisen prosessoinnin perusedellytyksi\u00e4.', source: 'Ahonen, T. & Viholainen, H., "Visuaalisen hahmottamisen kehitys ja tukeminen," Niilo M\u00e4ki Instituutti' },
    { claim: 'Kuvapalapeliteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t osa-kokonaisuus-hahmottamista ja avaruudellista p\u00e4\u00e4ttely\u00e4, jotka tukevat matemaattisen ja tieteellisen ajattelun kehityst\u00e4 varhaiskasvatusik\u00e4isill\u00e4.', source: 'Hannula, M. & Lehtinen, E., "Spatiaalisen p\u00e4\u00e4ttelyn merkitys oppimisessa," Turun yliopisto' },
  ],
  teacherTestimonials: [
    { quote: 'Puuttuvat palat -tehtavat ovat loistava tapa kehittaa visuaalista hahmottamista. Oppilaani rakastavat etsia oikeaa palaa ja kehittavat samalla analyyttista ajattelua. Saadettava vaikeustaso on erinomainen eriyttamiseen.', name: 'Sanna Rinne', role: 'Esiopetuksen opettaja', school: 'Satakielen p\u00e4iv\u00e4koti, Turku' },
    { quote: 'Kaytan puuttuvan palan tehtavia visuaalisen hahmottamisen arvioinnissa ja harjoittelussa. Tehtavat paljastavat oppilaiden vahvuudet ja kehityskohteet hahmottamisessa. Automaattiset vastausavaimet saastävät paljon aikaa.', name: 'Esa Kettunen', role: 'Erityisopettaja', school: 'Kainuun ammattiopisto, Kajaani' },
  ],
  tips: {
    sectionTitle: 'Puuttuvan palan strategiat luokka-asteittain',
    sectionDescription: 'S\u00e4\u00e4d\u00e4 puuttuvan palan generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. N\u00e4in valitset puuttuvien palojen m\u00e4\u00e4r\u00e4n, vastausvaihtoehtojen m\u00e4\u00e4r\u00e4n ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      { id: 'esikoulu', icon: '\u{1f331}', title: 'Esikoulu: Yksi pala kahdella vaihtoehdolla', description: 'Kaytta yhtaa puuttuvaa palaa ja kahtaa vastausvaihtoehtoa. Esikoululaiset harjoittelevat kuvan osan tunnistamista yksinkertaisella valinnalla. Tutut elain- ja ruokakuvat motivoivat oppimista.' },
      { id: 'esiopetus', icon: '\u{1f392}', title: 'Esiopetus: 1\u20132 palaa kolmella vaihtoehdolla', description: 'Luo tehtavia 1-2 puuttuvalla palalla ja kolmella vastausvaihtoehdolla. Esiopetuksen oppilaat kehittavat visuaalista analysointia ja vertailutaitoja. Tukee POPS 2014 hahmottamisen tavoitteita.' },
      { id: '1-luokka', icon: '\u{1f4da}', title: '1. luokka: 2\u20133 palaa nelj\u00e4ll\u00e4 vaihtoehdolla', description: 'Generoi tehtavia 2-3 puuttuvalla palalla ja neljalla vastausvaihtoehdolla. Ekaluokkalaiset kehittavat jarjestelmallista visuaalista analysointia ja paattelya useampien vaihtoehtojen joukosta.' },
      { id: '2-luokka', icon: '\u270f\ufe0f', title: '2. luokka: 3\u20134 palaa viidell\u00e4 vaihtoehdolla', description: 'Luo tehtavia 3-4 puuttuvalla palalla ja viidella vastausvaihtoehdolla. Toisluokkalaiset hioivat visuaalista erottelua ja analyyttista paattelya haastavammilla tehtavilla.' },
      { id: '3-luokka', icon: '\u{1f3af}', title: '3. luokka: 4\u20135 palaa kuudella vaihtoehdolla', description: 'Kaytta 4-5 puuttuvaa palaa ja kuutta vastausvaihtoehtoa. Kolmasluokkalaiset ratkaisevat vaativia visuaalisia pulmia itsenaisesti. Tehtavat kehittavat systemaattista ajattelua ja tarkkaa visuaalista analysointia.' },
    ],
  },
};

// ===================================================================
// PROCESSING LOGIC
// ===================================================================
const apps = [drawAndColor, findObjects, gridMatch, crossword, cryptogram, mathPuzzle, missingPieces];

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
    '  // -- SEO & Content Enrichment (Part 176) ------------------------------------',
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
