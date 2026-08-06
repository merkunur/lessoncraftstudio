const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Map: appId -> DE slug filename (from tool-page-slugs.ts)
const toolSlugs = {
  'big-small': 'kostenloses-gross-und-klein-arbeitsblaetter-tool',
  'bingo': 'kostenloses-bingo-karten-tool',
  'chart-count': 'kostenloses-diagramm-zaehlen-tool',
  'coloring': 'kostenloses-ausmalbilder-tool',
  'crossword': 'kostenloses-kreuzwortraetsel-tool',
  'draw-and-color': 'kostenloses-malen-und-ausmalen-tool',
  'drawing-lines': 'kostenloses-linien-zeichnen-tool',
  'find-and-count': 'kostenloses-finden-und-zaehlen-tool',
  'find-objects': 'kostenloses-suchbild-tool',
  'grid-match': 'kostenloses-gitter-zuordnung-tool',
  'matching': 'kostenloses-zuordnungs-arbeitsblaetter-tool',
  'missing-pieces': 'kostenloses-fehlende-teile-tool',
  'odd-one-out': 'kostenloses-was-passt-nicht-tool',
  'pattern-train': 'kostenloses-muster-zug-tool',
  'pattern-worksheet': 'kostenloses-muster-arbeitsblaetter-tool',
  'picture-path': 'kostenloses-bilderpfad-tool',
  'picture-sort': 'kostenloses-bilder-sortieren-tool',
  'shadow-match': 'kostenloses-schatten-zuordnung-tool',
  'sudoku': 'kostenloses-sudoku-tool',
  'treasure-hunt': 'kostenloses-schatzsuche-tool',
};

const appNames = {
  'big-small': 'Gro\u00df-und-Klein Arbeitsbl\u00e4tter',
  'bingo': 'Bingo-Karten',
  'chart-count': 'Diagramm-Z\u00e4hlen Arbeitsbl\u00e4tter',
  'coloring': 'Ausmalbilder',
  'crossword': 'Kreuzwortr\u00e4tsel',
  'draw-and-color': 'Malen-und-Ausmalen Arbeitsbl\u00e4tter',
  'drawing-lines': 'Linien-Zeichnen Arbeitsbl\u00e4tter',
  'find-and-count': 'Suchen-und-Z\u00e4hlen Arbeitsbl\u00e4tter',
  'find-objects': 'Suchbilder',
  'grid-match': 'Gitter-Zuordnungs Arbeitsbl\u00e4tter',
  'matching': 'Zuordnungs-Arbeitsbl\u00e4tter',
  'missing-pieces': 'Fehlende-Teile R\u00e4tsel',
  'odd-one-out': 'Was-Passt-Nicht R\u00e4tsel',
  'pattern-train': 'Muster-Zug Arbeitsbl\u00e4tter',
  'pattern-worksheet': 'Muster-Arbeitsbl\u00e4tter',
  'picture-path': 'Bilderpfad Arbeitsbl\u00e4tter',
  'picture-sort': 'Bilder-Sortieren Arbeitsbl\u00e4tter',
  'shadow-match': 'Schattenbilder-Zuordnung',
  'sudoku': 'Kinder-Sudoku',
  'treasure-hunt': 'Schatzsuche Arbeitsbl\u00e4tter',
};

const youtubeIds = {
  'big-small': 'gQEk7dPTZUA', 'bingo': 'd6AOiDXoK1c', 'chart-count': 'gQEk7dPTZUA',
  'coloring': 'gQEk7dPTZUA', 'crossword': '36keBFzJbPo', 'draw-and-color': 'gQEk7dPTZUA',
  'drawing-lines': 'gQEk7dPTZUA', 'find-and-count': 'hwMKyCpVzSQ', 'find-objects': 'hwMKyCpVzSQ',
  'grid-match': 'gQEk7dPTZUA', 'matching': 'gQEk7dPTZUA', 'missing-pieces': 'VXGKFQRT2rA',
  'odd-one-out': 'VXGKFQRT2rA', 'pattern-train': 'gQEk7dPTZUA', 'pattern-worksheet': 'gQEk7dPTZUA',
  'picture-path': 'VXGKFQRT2rA', 'picture-sort': 'gQEk7dPTZUA', 'shadow-match': 'gQEk7dPTZUA',
  'sudoku': 'VXGKFQRT2rA', 'treasure-hunt': 'hwMKyCpVzSQ',
};

const samplePaths = {
  'big-small': '/samples/english/big small/Big Small 1.jpeg',
  'bingo': '/samples/english/bingo/bingo_card word.jpeg',
  'chart-count': '/samples/english/chart count/Chart Count 1.jpeg',
  'coloring': '/samples/english/coloring/Coloring 1.jpeg',
  'crossword': '/samples/english/crossword/Crossword 1.jpeg',
  'draw-and-color': '/samples/english/draw and color/Draw and Color 1.jpeg',
  'drawing-lines': '/samples/english/drawing lines/Drawing Lines 1.jpeg',
  'find-and-count': '/samples/english/find and count/Find and Count 1.jpeg',
  'find-objects': '/samples/english/find objects/Hidden Objects 1.jpeg',
  'grid-match': '/samples/english/grid match/Grid Match 1.jpeg',
  'matching': '/samples/english/matching/Matching 1.jpeg',
  'missing-pieces': '/samples/english/missing pieces/Missing Pieces 1.jpeg',
  'odd-one-out': '/samples/english/odd one out/Odd One Out 1.jpeg',
  'pattern-train': '/samples/english/pattern train/Pattern Train 1.jpeg',
  'pattern-worksheet': '/samples/english/pattern worksheet/Pattern Worksheet 1.jpeg',
  'picture-path': '/samples/english/picture path/Picture Path 1.jpeg',
  'picture-sort': '/samples/english/picture sort/Picture Sort 1.jpeg',
  'shadow-match': '/samples/english/shadow match/Shadow Match 1.jpeg',
  'sudoku': '/samples/english/sudoku/Sudoku 1.jpeg',
  'treasure-hunt': '/samples/english/treasure hunt/Treasure Hunt 1.jpeg',
};

function gen(appId) {
  const name = appNames[appId];
  const slug = toolSlugs[appId];
  const vid = youtubeIds[appId];
  const img = samplePaths[appId];

  return `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: '${appId}',
  locale: 'de',

  seo: {
    titleTag: 'Kostenloser ${name} Generator | Druckbare PDFs',
    metaDescription: 'Erstellen Sie kostenlose ${name} als PDF in Sekunden. 104 Themen, L\u00f6sungsschl\u00fcssel inklusive. Keine Anmeldung erforderlich \u2014 sofort herunterladen.',
    primaryKeyword: 'kostenloser ${name} Generator',
    secondaryKeywords: ['${name} erstellen kostenlos', '${name} zum Ausdrucken', '${name} PDF Generator', '${name} online erstellen', '${name} f\u00fcr Kinder'],
    lsiKeywords: ['Arbeitsbl\u00e4tter Grundschule', 'Vorschule \u00dcbungen', 'druckbare Lernmaterialien', 'Lernspiele zum Ausdrucken', 'p\u00e4dagogische Arbeitsbl\u00e4tter', 'visuelle Lern\u00fcbungen', 'kostenlose Unterrichtsmaterialien', 'Arbeitsblatt Generator'],
  },

  visuals: {
    heroImages: {
      primary: '${img}',
      primaryAlt: 'Kostenloses ${name} Beispiel mit farbenfrohen Illustrationen',
    },
    sampleGallery: [
      { src: '${img}', alt: '${name} Beispiel mit bunten Themenbildern', caption: '${name} \u2014 Themenbeispiel' },
    ],
    youtubeId: '${vid}',
    videoTitle: 'So erstellen Sie kostenlose ${name}',
  },

  hero: {
    title: 'Kostenloser ${name} Generator',
    tagline: 'Erstellen Sie ${name} und laden Sie sie sofort herunter \u2014 keine Anmeldung erforderlich',
    description: \`Dieser kostenlose ${name} Generator verwandelt Lern\u00fcbungen in ein visuelles Erlebnis, das Kinder begeistert. Statt langweiliger Standard-Arbeitsbl\u00e4tter arbeiten Sch\u00fcler mit farbenfrohen, thematischen Illustrationen \u2014 aus \u00fcber 104 Themen wie Tiere, Fahrzeuge, Lebensmittel, Weltraum und mehr. Jedes Arbeitsblatt wird als druckfertiges PDF mit passendem L\u00f6sungsschl\u00fcssel exportiert.

Sie kontrollieren jedes Detail: Seitengr\u00f6\u00dfe, Ausrichtung, Schriftart, Aufgabenanzahl und Schwierigkeitsgrad. Der integrierte Canvas-Editor erm\u00f6glicht das Hinzuf\u00fcgen von Titeln, das Anpassen von Farben und das Verschieben von Elementen vor dem Export. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgrade zum Commercial Pack, um das Wasserzeichen zu entfernen und unbegrenzt auf Etsy, Amazon KDP oder Teachers Pay Teachers zu verkaufen.

Ob f\u00fcr den Unterricht, das Homeschooling oder den Verkauf als digitale Produkte \u2014 dieser Generator erstellt professionelle ${name} in Sekunden statt Stunden. Testen Sie jetzt alle Funktionen kostenlos, ohne Anmeldung und ohne Kreditkarte.\`,
  },

  whatYouCanCreate: [
    { title: 'Thematische \u00dcbungsbl\u00e4tter', description: 'Generieren Sie ${name} mit jedem Thema \u2014 Tiere, Weltraum, Ozean, Feiertage \u2014 mit passenden Bildern, die junge Lernende begeistern.' },
    { title: 'Differenzierte \u00dcbungspakete', description: 'Erstellen Sie Arbeitsbl\u00e4tter in verschiedenen Schwierigkeitsstufen. Beginnen Sie einfach f\u00fcr Anf\u00e4nger und steigern Sie die Schwierigkeit f\u00fcr fortgeschrittene Sch\u00fcler.' },
    { title: '\u00dcbungsbl\u00e4tter mit L\u00f6sungsschl\u00fcssel', description: 'Jedes Arbeitsblatt enth\u00e4lt automatisch einen L\u00f6sungsschl\u00fcssel f\u00fcr schnelle Korrektur und Selbstkontrolle.' },
    { title: 'Morgenaufgaben und Aufw\u00e4rm\u00fcbungen', description: 'Produzieren Sie eine Woche voller Schnellstart-Arbeitsbl\u00e4tter in Minuten. Ideal f\u00fcr den t\u00e4glichen Unterrichtsbeginn.' },
    { title: 'Druckbare Arbeitshefte f\u00fcr Etsy', description: 'Kombinieren Sie mehrere thematische Arbeitsbl\u00e4tter zu herunterladbaren PDF-Arbeitsheften. Verkaufen Sie saisonale Pakete als digitale Produkte.' },
  ],

  tutorial: {
    title: 'So erstellen Sie ${name} in 5 Schritten',
    steps: [
      { title: 'Thema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 illustrierte Themen und w\u00e4hlen Sie das passende f\u00fcr Ihre Aufgabe.' },
      { title: 'Einstellungen anpassen', description: 'Stellen Sie Schwierigkeitsgrad, Aufgabenanzahl, Seitengr\u00f6\u00dfe und Schriftart ein.' },
      { title: 'Layout gestalten', description: 'Nutzen Sie den Canvas-Editor, um Titel, Farben und Rahmen anzupassen.' },
      { title: 'Vorschau pr\u00fcfen', description: '\u00dcberpr\u00fcfen Sie das fertige Arbeitsblatt in der Live-Vorschau.' },
      { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG. Der L\u00f6sungsschl\u00fcssel wird automatisch generiert.' },
    ],
  },

  businessIdeas: [
    { title: 'Thematische Pakete auf Etsy', description: 'Erstellen Sie ${name}-Pakete mit 20-30 Bl\u00e4ttern pro Thema und verkaufen Sie sie als Sofort-Downloads.', platform: 'Etsy' },
    { title: 'Aktivit\u00e4tenb\u00fccher f\u00fcr KDP', description: 'Kompilieren Sie Arbeitsbl\u00e4tter zu B\u00fcchern f\u00fcr Amazon KDP. Altersgerechte Sammlungen sind besonders beliebt.', platform: 'Amazon KDP' },
    { title: 'Lehrressourcen f\u00fcr TPT', description: 'Erstellen Sie lehrplanorientierte ${name} f\u00fcr Teachers Pay Teachers mit differenzierten Schwierigkeitsgraden.', platform: 'TPT' },
    { title: 'Monatliche Aboboxen', description: 'Liefern Sie monatlich neue ${name}-Sets \u00fcber Gumroads Mitgliedschaftsfunktion.', platform: 'Gumroad' },
    { title: 'Mehrsprachige Produkte', description: 'Nutzen Sie die 11 Sprachen, um ${name} in verschiedenen Sprachen anzubieten und internationale M\u00e4rkte zu erschlie\u00dfen.', platform: 'Multi-Plattform' },
  ],

  proTips: [
    { title: 'Themen saisonal anpassen', tip: 'Erstellen Sie saisonale ${name}-Pakete f\u00fcr Weihnachten, Ostern, Sommer und Schulbeginn. Saisonale Produkte verkaufen sich in Spitzenzeiten deutlich besser.' },
    { title: 'Schwierigkeitsstufen b\u00fcndeln', tip: 'Bieten Sie Pakete mit einfachen, mittleren und schwierigen Versionen an. Lehrer sch\u00e4tzen differenziertes Material.' },
    { title: 'L\u00f6sungsschl\u00fcssel hervorheben', tip: 'Betonen Sie in Ihren Produktbeschreibungen, dass L\u00f6sungsschl\u00fcssel inklusive sind. Dies ist ein wichtiges Kaufargument.' },
    { title: 'Vorschaubilder optimieren', tip: 'Exportieren Sie attraktive JPEG-Vorschaubilder f\u00fcr Ihre Marktplatz-Listings. Gute Vorschaubilder erh\u00f6hen die Klickrate.' },
  ],

  faq: [
    { question: 'Ist der Generator wirklich kostenlos?', answer: 'Ja. Die kostenlose Version enth\u00e4lt alle Funktionen, Themen und Exportoptionen. Der einzige Unterschied ist ein kleines Wasserzeichen auf den exportierten Dateien. Keine Anmeldung, keine Kreditkarte erforderlich.' },
    { question: 'Wie entferne ich das Wasserzeichen?', answer: 'Upgrade zum Commercial Pack (27 $) oder Full Access Pack (47 $). Beide entfernen das Wasserzeichen und enth\u00e4lt eine kommerzielle Lizenz f\u00fcr den Verkauf Ihrer Arbeitsbl\u00e4tter.' },
    { question: 'Wie viele Themen sind verf\u00fcgbar?', answer: 'Das Full Access Pack bietet alle 104 Themen. Das Commercial Pack enth\u00e4lt eine kuratierte Auswahl. Die kostenlose Version zeigt alle Themen in der Vorschau.' },
    { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Mit dem Commercial Pack oder Full Access Pack ja. Die kommerzielle Lizenz erlaubt den Verkauf auf Etsy, Amazon KDP, TPT und allen anderen Plattformen.' },
    { question: 'Welche Formate werden exportiert?', answer: 'JPEG (hochaufl\u00f6send) und PDF (druckfertig). Beide Formate eignen sich f\u00fcr professionelle Druckergebnisse.' },
    { question: 'Gibt es einen L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes Arbeitsblatt wird automatisch mit einem passenden L\u00f6sungsschl\u00fcssel exportiert.' },
    { question: 'Welche Sprachen sind verf\u00fcgbar?', answer: '11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.' },
    { question: 'Muss ich mich registrieren?', answer: 'Nein. Der Generator funktioniert sofort im Browser ohne Registrierung oder Anmeldung. Einfach \u00f6ffnen und loslegen.' },
    { question: 'Funktioniert es auf Tablets?', answer: 'Ja, der Generator funktioniert auf Tablets und Desktop-Computern. F\u00fcr die beste Erfahrung empfehlen wir einen Desktop-Browser.' },
    { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Nutzen Sie die kostenlose Version, um alles ausgiebig zu testen, bevor Sie kaufen.' },
  ],

  internalLinks: [
    { slug: '${appId}', pageType: 'app' as const, anchorText: '${name} Generator \u2014 Alle Details' },
    { slug: 'complete-guide-printable-business', pageType: 'start' as const, anchorText: 'Kompletter Leitfaden zum Druckbaren Gesch\u00e4ft' },
    { slug: 'create-worksheets-that-sell', pageType: 'start' as const, anchorText: 'Arbeitsbl\u00e4tter erstellen die sich verkaufen' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide' as const, anchorText: 'Etsy-Shop f\u00fcr Druckbare starten' },
    { slug: 'farm-animals-printable-ideas', pageType: 'idea' as const, anchorText: 'Bauernhof-Tiere Druckbare Ideen' },
    { slug: 'christmas-printable-ideas', pageType: 'idea' as const, anchorText: 'Weihnachts-Druckbare Ideen' },
    { slug: 'matching-bundle', pageType: 'bundle' as const, anchorText: 'Alle Generatoren im Sparpaket' },
    { slug: 'niche-selection-printables', pageType: 'guide' as const, anchorText: 'Nischen-Auswahl f\u00fcr Druckbare' },
  ],
};
`;
}

let count = 0;
for (const [appId, slug] of Object.entries(toolSlugs)) {
  const filePath = path.join(outDir, `${slug}.ts`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, gen(appId), 'utf8');
    console.log(`Created: ${slug}.ts`);
    count++;
  } else {
    console.log(`Exists: ${slug}.ts`);
  }
}
console.log(`\nDone: ${count} new files, ${Object.keys(toolSlugs).length - count} existed`);
