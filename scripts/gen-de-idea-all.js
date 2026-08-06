// Generate ALL 45 German (de) idea content files
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function w(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content, 'utf8');
  console.log('Created: ' + filename);
}

const header = "import type { NicheIdeaContent } from '../types';\n\nexport const content: NicheIdeaContent = ";

// Common FAQ entries (reused across files)
const toolCostFaq = "    { question: 'Was kosten die Tools?', answer: 'Einzelne App-Lizenzen beginnen bei 27 $ f\\u00fcr die kommerzielle Stufe und 47 $ f\\u00fcr die Vollzugangs-Stufe. Kategorie-Bundles sind f\\u00fcr 79 $ (kommerziell) und 119 $ (Vollzugang) erh\\u00e4ltlich. Sie k\\u00f6nnen jeden Generator kostenlos testen, bevor Sie kaufen.' }";
const refundFaq = "    { question: 'Wie lautet Ihre R\\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\\u00fcltig. Sobald ein Lizenzschl\\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.' }";

// Helper to build a complete file
function buildFile(data) {
  let s = header + "{\n";
  s += `  ideaId: '${data.ideaId}',\n`;
  s += "  locale: 'de',\n\n";

  // SEO
  s += "  seo: {\n";
  s += `    titleTag: '${data.seo.titleTag}',\n`;
  s += `    metaDescription: '${data.seo.metaDescription}',\n`;
  s += `    primaryKeyword: '${data.seo.primaryKeyword}',\n`;
  s += "    secondaryKeywords: [\n";
  data.seo.secondaryKeywords.forEach(k => s += `      '${k}',\n`);
  s += "    ],\n";
  s += "    lsiKeywords: [\n";
  data.seo.lsiKeywords.forEach(k => s += `      '${k}',\n`);
  s += "    ],\n  },\n\n";

  // Visuals
  s += "  visuals: {\n    heroImages: {\n";
  s += `      primary: '${data.visuals.heroImages.primary}',\n`;
  s += `      primaryAlt: '${data.visuals.heroImages.primaryAlt}',\n`;
  s += `      secondary: '${data.visuals.heroImages.secondary}',\n`;
  s += `      secondaryAlt: '${data.visuals.heroImages.secondaryAlt}',\n`;
  s += "    },\n    sampleGallery: [\n";
  data.visuals.sampleGallery.forEach(g => {
    s += `      { src: '${g.src}', alt: '${g.alt}', caption: '${g.caption}' },\n`;
  });
  s += "    ],\n";
  s += `    youtubeId: '${data.visuals.youtubeId}',\n`;
  s += `    videoTitle: '${data.visuals.videoTitle}',\n`;
  s += "  },\n\n";

  // Hero
  s += "  hero: {\n";
  s += `    title: '${data.hero.title}',\n`;
  s += `    description: '${data.hero.description}',\n`;
  s += "  },\n\n";

  // Market overview
  s += `  marketOverview: '${data.marketOverview}',\n\n`;

  // Product ideas
  s += "  productIdeas: [\n";
  data.productIdeas.forEach(p => {
    s += `    { title: '${p.title}', description: '${p.description}', appId: '${p.appId}' },\n`;
  });
  s += "  ],\n\n";

  // How to create
  s += `  howToCreate: '${data.howToCreate}',\n\n`;

  // Platform tips
  s += "  platformTips: [\n";
  data.platformTips.forEach(t => {
    s += `    { platform: '${t.platform}', title: '${t.title}', description: '${t.description}' },\n`;
  });
  s += "  ],\n\n";

  // Pricing
  s += `  pricingIdeas: '${data.pricingIdeas}',\n\n`;

  // FAQ
  s += "  faq: [\n";
  data.faq.forEach(f => {
    s += `    { question: '${f.question}', answer: '${f.answer}' },\n`;
  });
  s += "  ],\n\n";

  // Internal links
  s += "  internalLinks: [\n";
  data.internalLinks.forEach(l => {
    s += `    { slug: '${l.slug}', pageType: '${l.pageType}', anchorText: '${l.anchorText}' },\n`;
  });
  s += "  ],\n};\n";

  return s;
}

// Common strings
const tc = 'Was kosten die Tools?';
const ta = 'Einzelne App-Lizenzen beginnen bei 27 $ f\\u00fcr die kommerzielle Stufe und 47 $ f\\u00fcr die Vollzugangs-Stufe. Kategorie-Bundles sind f\\u00fcr 79 $ (kommerziell) und 119 $ (Vollzugang) erh\\u00e4ltlich. Sie k\\u00f6nnen jeden Generator kostenlos testen, bevor Sie kaufen.';
const rc = 'Wie lautet Ihre R\\u00fcckerstattungsrichtlinie?';
const ra = 'Alle Verk\\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\\u00fcltig. Sobein ein Lizenzschl\\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.';

console.log('Starting generation of all 45 German idea content files...');
console.log('Files 1-2 already generated separately.');
console.log('Generating remaining 43 files...');

// We'll output them all now. Due to script size limits, using a more compact approach.

// 3. safari-animals
w('safari-animals-printable-ideas.ts', buildFile({
  ideaId: 'safari-animals-printable-ideas',
  seo: {
    titleTag: 'Safari-Tiere Druckvorlagen-Ideen \\u2014 Online verkaufen',
    metaDescription: 'Profitable Safari-Tiere Druckvorlagen-Ideen f\\u00fcr Etsy- und KDP-Verk\\u00e4ufer. Erstellen Sie Dschungel-Arbeitsbl\\u00e4tter, Wildtier-Ausmalbilder und Themenpakete.',
    primaryKeyword: 'Safari-Tiere Druckvorlagen Ideen',
    secondaryKeywords: ['Dschungeltiere Arbeitsbl\\u00e4tter', 'Safari-Thema Druckvorlagen', 'Wildtiere Aktivit\\u00e4ten Kinder', 'Zoo-Tiere Arbeitsbl\\u00e4tter', 'Afrikanische Tiere Ausmalbilder'],
    lsiKeywords: ['L\\u00f6we Elefant Giraffe Arbeitsbl\\u00e4tter', 'Dschungelthema Vorschule', 'Savannentiere Bildung', 'Zoo Lerneinheit Druckvorlagen', 'Wildtier Zuordnungsspiele', 'Afrikanische Tierwelt f\\u00fcr Kinder', 'Safari-Party Aktivit\\u00e4ten', 'Dschungel Z\\u00e4hl-Arbeitsbl\\u00e4tter'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/shadow-match/Shadow Match Fun 1.jpeg',
      primaryAlt: 'Safari-Tiere Schattenbilder-Arbeitsblatt mit L\\u00f6wen- und Elefanten-Silhouetten',
      secondary: '/samples/english/find-and-count/Find and Count Fun 1.jpeg',
      secondaryAlt: 'Dschungeltiere Finde-und-Z\\u00e4hle Aktivit\\u00e4tsblatt',
    },
    sampleGallery: [
      { src: '/samples/english/shadow-match/Shadow Match Fun 1.jpeg', alt: 'Safari-Tiere Schattenbilder Druckvorlage', caption: 'Schattenbilder mit Wildtieren sind ein Top-Verkaufsformat' },
      { src: '/samples/english/shadow-match/Shadow Match Fun 2.jpeg', alt: 'Wildtier-Silhouetten Arbeitsblatt', caption: 'Markante Tierformen machen Schattenbilder besonders spannend' },
      { src: '/samples/english/find-and-count/Find and Count Fun 1.jpeg', alt: 'Dschungeltiere Z\\u00e4hlaktivit\\u00e4t', caption: 'Finde-und-Z\\u00e4hle Arbeitsbl\\u00e4tter mit Safari-Tieren verkaufen sich ganzj\\u00e4hrig' },
      { src: '/samples/english/find-and-count/Find and Count Fun 2.jpeg', alt: 'Safari Z\\u00e4hl-Arbeitsblatt', caption: 'Jedes Arbeitsblatt enth\\u00e4lt zuf\\u00e4llig ausgew\\u00e4hlte Wildtier-Illustrationen' },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'So erstellen Sie Safari-Tiere Druckvorlagen zum Verkaufen',
  },
  hero: {
    title: 'Safari-Tiere Druckvorlagen-Ideen f\\u00fcr Ihr Gesch\\u00e4ft',
    description: 'L\\u00f6wen, Elefanten, Giraffen und Zebras geh\\u00f6ren zu den beliebtesten Tieren der Welt, was Safari-Tiere Druckvorlagen-Ideen zu einer \\u00e4u\\u00dferst starken Nische f\\u00fcr Druckvorlagen-Unternehmer macht. Kinder sind von afrikanischen Wildtieren fasziniert, und diese Faszination \\u00fcbersetzt sich direkt in K\\u00e4ufernachfrage von Eltern, Lehrkr\\u00e4ften und Homeschooling-Familien. Das Safari-Thema funktioniert \\u00fcber mehrere Produkttypen hinweg \\u2014 von Schattenbildern und Z\\u00e4hl-Arbeitsbl\\u00e4ttern bis hin zu Ausmalbildern und Wortsuche-R\\u00e4tseln. Zoobesuche, Dschungel-Lerneinheiten und Tierkunde-Unterricht schaffen wiederkehrende Kaufanl\\u00e4sse w\\u00e4hrend des gesamten Schuljahres. Mit automatisierten Generatoren k\\u00f6nnen Sie schneller einen tiefen Katalog einzigartiger Safari-Druckvorlagen aufbauen als jeder Wettbewerber, der von Hand gestaltet.',
  },
  marketOverview: 'Der Markt f\\u00fcr Safari- und Dschungeltier-Druckvorlagen profitiert von universeller Kinderanziehungskraft kombiniert mit starken Bildungsbez\\u00fcgen. Grundschullehrpl\\u00e4ne beinhalten h\\u00e4ufig Einheiten \\u00fcber Lebensr\\u00e4ume, afrikanische Geografie und Tierklassifizierung, was jedes Schuljahr eine feste Nachfrage schafft.\\n\\nK\\u00e4ufersegmente sind vielf\\u00e4ltig und kaufkr\\u00e4ftig. Klassen-Lehrkr\\u00e4fte kaufen gro\\u00dfe Pakete f\\u00fcr die Vorbereitung auf Zoo-Ausfl\\u00fcge und Tier-Lerneinheiten. Homeschooling-Familien suchen umfassende Themenpakete. Eltern von Vorschulkindern kaufen Safari-Druckvorlagen f\\u00fcr Geburtstagsfeiern und Ruhezeitbesch\\u00e4ftigungen.\\n\\nSuchdaten best\\u00e4tigen robuste Nachfrage. \\u201eZoo-Tiere Arbeitsbl\\u00e4tter\\u201c, \\u201eDschungel Aktivit\\u00e4ten Vorschule\\u201c und \\u201eSafari Ausmalbilder\\u201c generieren konstantes monatliches Suchvolumen. Die Nische erlebt einen leichten Aufschwung im Sommer, wenn Zoobesuche ihren H\\u00f6hepunkt erreichen, aber die Grundnachfrage bleibt ganzj\\u00e4hrig stark.\\n\\nDie Wettbewerbslandschaft beg\\u00fcnstigt vorbereitete Verk\\u00e4ufer. Die meisten bestehenden Safari-Druckvorlagen auf Etsy sind kleine, handgefertigte Pakete mit begrenzter Vielfalt. Verk\\u00e4ufer, die Generatoren nutzen, k\\u00f6nnen Pakete mit 20, 50 oder sogar 100 einzigartigen Seiten anbieten.\\n\\nDie Preisgestaltung in dieser Nische tendiert h\\u00f6her als bei generischen Themen, da Safari-Inhalte sich premium und spezialisiert anf\\u00fchlen.',
  productIdeas: [
    { title: 'Safari Schattenbilder-Aktivit\\u00e4ten', description: 'Erstellen Sie Schattenbilder-Arbeitsbl\\u00e4tter mit markanten Wildtier-Silhouetten. L\\u00f6wen, Elefanten, Giraffen und Nashh\\u00f6rner haben einzigartig erkennbare Formen, die dieses Format besonders \\u00fcberzeugend machen.', appId: 'shadow-match' },
    { title: 'Dschungel Finde-und-Z\\u00e4hle Arbeitsbl\\u00e4tter', description: 'Generieren Sie Seiten voller verstreuter Safari-Tiere, die Kinder finden und z\\u00e4hlen sollen. Mehrere Schwierigkeitsstufen decken Kleinkinder bis fr\\u00fche Grundschule ab.', appId: 'find-and-count' },
    { title: 'Wildtier Zuordnungsspiele', description: 'Gestalten Sie Zuordnungs-Arbeitsbl\\u00e4tter mit identischen Safari-Tieren. Variieren Sie die Rastergr\\u00f6\\u00dfe von einfachen 4-Paar-Bl\\u00e4ttern bis zu anspruchsvollen 12-Paar-Seiten.', appId: 'matching' },
    { title: 'Safari Ausmalbilder Paket', description: 'Produzieren Sie Ausmalbilder mit einzelnen Wildtieren, Savannenszenen und Dschungellandschaften. Ausmalbilder sind der absatzst\\u00e4rkste Produkttyp und funktionieren f\\u00fcr alle Altersgruppen.', appId: 'coloring' },
    { title: 'Dschungel Wortsuche-R\\u00e4tsel', description: 'Erstellen Sie Wortsuche-R\\u00e4tsel mit Safari-Vokabular: Savanne, Wasserl\\u00f6cher, Rudel, R\\u00fcssel, Streifen und M\\u00e4hne. Stufenpakete f\\u00fcr breite Marktabdeckung.', appId: 'wordsearch' },
    { title: 'Safari-Tiere Bingo-Karten', description: 'Generieren Sie Bingo-Sets mit Wildtier-Bildern f\\u00fcr Klassenaktivit\\u00e4ten, Zoo-Partys und Homeschooling-Spieletage. Genug Karten f\\u00fcr eine ganze Klasse von 30 Sch\\u00fclern.', appId: 'bingo' },
    { title: 'Wildtier Muster-Arbeitsbl\\u00e4tter', description: 'Erstellen Sie Muster-Arbeitsbl\\u00e4tter mit Sequenzen von Safari-Tieren. Kinder erkennen und setzen Muster fort und bauen fr\\u00fche Mathematikf\\u00e4higkeiten mit spannenden Wildtier-Themen auf.', appId: 'pattern-worksheet' },
    { title: 'Safari Linien-Zeichnen Aktivit\\u00e4ten', description: 'Gestalten Sie Nachfahr- und Linienzieh-Arbeitsbl\\u00e4tter, die Safari-Tiere mit ihren Lebensr\\u00e4umen, ihrer Nahrung oder ihren Namen verbinden. Feinmotorik-\\u00dcbung mit einem Thema, das Kinder lieben.', appId: 'drawing-lines' },
    { title: 'Dschungel Bildsortierung', description: 'Erstellen Sie Sortier-Arbeitsbl\\u00e4tter, bei denen Kinder Tiere nach Lebensraum, Ern\\u00e4hrung oder Gr\\u00f6\\u00dfe kategorisieren. F\\u00f6rdert Klassifizierungs- und kritisches Denkverm\\u00f6gen.', appId: 'picture-sort' },
    { title: 'Safari Fehlende-Teile R\\u00e4tsel', description: 'Gestalten Sie Puzzles, bei denen Teile von Wildtier-Bildern entfernt wurden und Kinder das richtige Teil identifizieren. R\\u00e4umliches Denken mit visuell beeindruckenden Safari-Bildern.', appId: 'missing-pieces' },
  ],
  howToCreate: 'Der Start einer Safari-Tiere-Druckvorlagen-Reihe erfordert strategische Produktauswahl und effiziente Produktion. So gehen Sie von null zu einem profitablen Katalog.\\n\\nIdentifizieren Sie zuerst Ihre Ankerprodukte. In der Safari-Nische nutzen Schattenbilder und Finde-und-Z\\u00e4hle Arbeitsbl\\u00e4tter die markanten Formen und die visuelle Attraktivit\\u00e4t von Wildtieren am effektivsten.\\n\\n\\u00d6ffnen Sie den Schattenbilder-Generator und w\\u00e4hlen Sie Safari-Bilder. W\\u00e4hlen Sie ikonische Tiere: L\\u00f6wen, Elefanten, Giraffen, Zebras, Nilpferde, Nashh\\u00f6rner, Affen und Krokodile. Generieren Sie 15\\u201320 einzigartige Arbeitsbl\\u00e4tter.\\n\\nWechseln Sie zum Finde-und-Z\\u00e4hle-Generator mit denselben Safari-Themen. Erstellen Sie weitere 15\\u201320 Arbeitsbl\\u00e4tter.\\n\\nGestalten Sie Listing-Bilder, die die wilde Energie von Safari-Themen einfangen. Verwenden Sie warme, erdige Hintergrundt\\u00f6ne.\\n\\nOptimieren Sie f\\u00fcr die Suche mit gezielten Keywords. Verwenden Sie Tags wie \\u201eSafari Arbeitsbl\\u00e4tter Vorschule\\u201c, \\u201eDschungeltier Aktivit\\u00e4ten\\u201c und \\u201eZoo-Thema Druckvorlagen\\u201c.\\n\\nSetzen Sie Preise, die den Premium-Charakter von Safari-Inhalten widerspiegeln. Einzelpakete bei 4,49\\u20135,99 $ und ein umfassendes Safari-Bundle bei 18,99\\u201324,99 $.\\n\\nErweitern Sie Ihren Katalog w\\u00f6chentlich mit neuen Produktformaten: Ausmalbilder, Wortsuche-R\\u00e4tsel, Bingo-Karten, Muster-Arbeitsbl\\u00e4tter und Sortier-Aktivit\\u00e4ten.',
  platformTips: [
    { platform: 'Etsy', title: 'Zoo-Ausflugs-Saison ansprechen', description: 'Fr\\u00fchling und Fr\\u00fchsommer sind die Hauptmonate f\\u00fcr Zoobesuche. Aktualisieren Sie Ihre Listings und verst\\u00e4rken Sie die Werbung von M\\u00e4rz bis Juni.' },
    { platform: 'Etsy', title: 'Safari-Party-Paket erstellen', description: 'B\\u00fcndeln Sie Bingo-Karten, Ausmalbilder und Zuordnungsspiele zu einem \\u201eSafari-Geburtstags-Party-Aktivit\\u00e4tspaket\\u201c. Party-Pakete verkaufen sich zu Premiumpreisen.' },
    { platform: 'Amazon KDP', title: 'Wildtier-Aktivit\\u00e4tsb\\u00fccher ver\\u00f6ffentlichen', description: 'Stellen Sie Safari-Arbeitsbl\\u00e4tter zu 60\\u2013100-seitigen Aktivit\\u00e4tsb\\u00fcchern zusammen. Preis bei 7,99\\u20139,99 $.' },
    { platform: 'Pinterest', title: 'Dschungel-Themen-Pinnw\\u00e4nde erstellen', description: 'Erstellen Sie Pinterest-Pinnw\\u00e4nde f\\u00fcr Safari- und Dschungel-Themen. Wildtier-Pins erhalten hohes Engagement.' },
  ],
  pricingIdeas: 'Safari-Druckvorlagen unterst\\u00fctzen Premium-Preise, da sie als Spezialinhalte wahrgenommen werden.\\n\\nEinzelpakete mit 15\\u201320 Seiten bei 4,49\\u20135,99 $ \\u2014 etwas h\\u00f6her als generische Themen. Das Safari-Thema rechtfertigt den Aufschlag.\\n\\nErstellen Sie thematische Unter-Bundles bei 9,99\\u201313,99 $. Eine \\u201eSafari Z\\u00e4hl-Sammlung\\u201c mit Finde-und-Z\\u00e4hle, Addition und Muster-Arbeitsbl\\u00e4ttern spricht Eltern an, die sich auf Mathematik konzentrieren.\\n\\nIhr ultimatives Produkt sollte ein \\u201eKomplettes Safari-Lern-Bundle\\u201c bei 19,99\\u201327,99 $ sein, das jeden Produkttyp enth\\u00e4lt.\\n\\nErw\\u00e4gen Sie ein \\u201eSafari-Party-Paket\\u201c bei 12,99\\u201316,99 $ mit Bingo, Ausmalbildern und Zuordnungsspielen. Party-Pakete sprechen ein v\\u00f6llig anderes K\\u00e4ufersegment an.',
  faq: [
    { question: 'Welche Safari-Tiere sind bei Kindern am beliebtesten?', answer: 'L\\u00f6wen, Elefanten, Giraffen, Zebras und Affen sind die Top F\\u00fcnf. Nilpferde, Nashh\\u00f6rner, Krokodile, Gorillas und Geparden runden die Top Zehn ab.' },
    { question: 'Ist die Safari-Nische saisonabh\\u00e4ngig?', answer: 'Safari-Druckvorlagen verkaufen sich ganzj\\u00e4hrig mit einem bescheidenen Aufschwung w\\u00e4hrend der Fr\\u00fchjahrs- und Sommer-Zoo-Saison. Die Grundnachfrage ist jeden Monat stark.' },
    { question: 'Kann ich dieselben Arbeitsbl\\u00e4tter auf Etsy und KDP verwenden?', answer: 'Ja. Ihre kommerzielle Lizenz deckt alle Plattformen ab. Viele Verk\\u00e4ufer verwandeln Etsy-Einzelpakete in zusammengestellte KDP-Aktivit\\u00e4tsb\\u00fccher.' },
    { question: 'Wie vergleichen sich Safari-Druckvorlagen mit Bauernhoftier-Druckvorlagen?', answer: 'Beides sind ausgezeichnete Nischen. Safari neigt zu etwas h\\u00f6heren Preisen aufgrund des wahrgenommenen Spezialwerts, w\\u00e4hrend Bauernhoftiere eine breitere Vorschul-Anziehungskraft haben.' },
    { question: 'Brauche ich spezielle Illustrationen f\\u00fcr Safari-Themen?', answer: 'Nein. Die Generatoren beinhalten eine umfangreiche Bibliothek von Safari- und Wildtier-Bildern. Sie w\\u00e4hlen Themen aus und das Tool bef\\u00fcllt die Arbeitsbl\\u00e4tter automatisch.' },
    { question: tc, answer: ta },
    { question: rc, answer: ra },
  ],
  internalLinks: [
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Schattenbilder-Zuordnung Ersteller' },
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Finde-und-Z\\u00e4hle Arbeitsblatt-Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalbilder-Generator' },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten-Generator' },
    { slug: 'farm-animals-printable-ideas', pageType: 'idea', anchorText: 'Bauernhoftiere Druckvorlagen-Ideen' },
    { slug: 'ocean-animals-printable-ideas', pageType: 'idea', anchorText: 'Meerestiere Druckvorlagen-Ideen' },
  ],
}));

console.log('Safari animals done. Continuing with remaining files...');
console.log('Due to script size, remaining files will be generated in subsequent scripts.');
