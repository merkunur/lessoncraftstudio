const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const apps = [
  { appId: 'bingo', category: 'matching', title: 'Bingo-Karten Generator', tagline: 'Erstellen Sie individuelle Bingo-Karten mit Bildern oder W\u00f6rtern f\u00fcr Unterricht, Feste und druckbare Produkte', youtubeId: 'd6AOiDXoK1c', primaryKeyword: 'Bingo-Karten Generator', secondaryKeywords: ['druckbare Bingo-Karten', 'Bingo-Karten erstellen', 'Bingo mit Bildern', 'Lern-Bingo Generator', 'Bingo Arbeitsblatt Ersteller'], heroImg: '/samples/english/bingo/bingo_card word.jpeg', heroAlt: 'Individuelle Bingo-Karte mit Wort-Zellen in farbenfrohem Raster' },
  { appId: 'crossword', category: 'search', title: 'Kreuzwortr\u00e4tsel Generator', tagline: 'Erstellen Sie bildbasierte Kreuzwortr\u00e4tsel mit 104 Themen', youtubeId: '36keBFzJbPo', primaryKeyword: 'Kreuzwortr\u00e4tsel Generator', secondaryKeywords: ['Kreuzwortr\u00e4tsel erstellen', 'Bild-Kreuzwortr\u00e4tsel', 'druckbare Kreuzwortr\u00e4tsel', 'Kreuzwortr\u00e4tsel Arbeitsblatt', 'Vokabel-Kreuzwortr\u00e4tsel'], heroImg: '/samples/english/crossword/Crossword 1.jpeg', heroAlt: 'Bildbasiertes Kreuzwortr\u00e4tsel mit Tierbildern als Hinweise' },
  { appId: 'find-and-count', category: 'search', title: 'Suchen-und-Z\u00e4hlen Generator', tagline: 'Erstellen Sie Suchbilder zum Z\u00e4hlen mit thematischen Illustrationen', youtubeId: 'hwMKyCpVzSQ', primaryKeyword: 'Suchen und Z\u00e4hlen Generator', secondaryKeywords: ['Suchbild Z\u00e4hlen Arbeitsblatt', 'Bilder z\u00e4hlen \u00dcbung', 'visuelles Z\u00e4hlen', 'Suchen und Z\u00e4hlen Vorschule', 'Z\u00e4hlaufgaben mit Bildern'], heroImg: '/samples/english/find and count/Find and Count 1.jpeg', heroAlt: 'Suchen-und-Z\u00e4hlen Arbeitsblatt mit bunten Tierbildern' },
  { appId: 'find-objects', category: 'search', title: 'Suchbild Generator', tagline: 'Erstellen Sie versteckte Objekte-R\u00e4tsel mit professionellen Illustrationen', youtubeId: 'hwMKyCpVzSQ', primaryKeyword: 'Suchbild Generator', secondaryKeywords: ['versteckte Objekte Arbeitsblatt', 'Suchbild erstellen', 'Hidden Objects R\u00e4tsel', 'Konzentrations\u00fcbung Kinder', 'Wimmelbilder Arbeitsblatt'], heroImg: '/samples/english/find objects/Hidden Objects 1.jpeg', heroAlt: 'Suchbild-Arbeitsblatt mit versteckten Gegenst\u00e4nden' },
  { appId: 'grid-match', category: 'matching', title: 'Gitter-Zuordnung Generator', tagline: 'Erstellen Sie Gitter-Puzzle-Arbeitsbl\u00e4tter zum Zuordnen von Bildern', youtubeId: 'gQEk7dPTZUA', primaryKeyword: 'Gitter-Zuordnung Generator', secondaryKeywords: ['Raster-Puzzle Arbeitsblatt', 'Gitter Zuordnung \u00dcbung', 'visuelles Puzzle Kinder', 'Muster-Gitter Aufgaben', 'Rasterbilder zuordnen'], heroImg: '/samples/english/grid match/Grid Match 1.jpeg', heroAlt: 'Gitter-Zuordnungs-Puzzle mit bunten Bildern in einem Raster' },
  { appId: 'matching', category: 'matching', title: 'Zuordnungs-Arbeitsblatt Generator', tagline: 'Erstellen Sie Bild-zu-Bild, Bild-zu-Wort und Bild-zu-Anfangsbuchstaben Zuordnungs\u00fcbungen', youtubeId: 'gQEk7dPTZUA', primaryKeyword: 'Zuordnungs-Arbeitsblatt Generator', secondaryKeywords: ['Zuordnungs\u00fcbungen erstellen', 'Bild-Wort Zuordnung', 'Matching Arbeitsblatt', 'Zuordnung Vorschule', 'Verbindungs\u00fcbungen Kinder'], heroImg: '/samples/english/matching/Matching 1.jpeg', heroAlt: 'Zuordnungs-Arbeitsblatt mit Bild-zu-Wort-Verbindungen' },
  { appId: 'missing-pieces', category: 'puzzle', title: 'Fehlende-Teile Generator', tagline: 'Erstellen Sie Puzzle-Arbeitsbl\u00e4tter zum Finden des fehlenden Puzzleteils', youtubeId: 'VXGKFQRT2rA', primaryKeyword: 'Fehlende Teile Generator', secondaryKeywords: ['Puzzleteile Arbeitsblatt', 'fehlende Teile R\u00e4tsel', 'visuelles Puzzle Kinder', 'Wahrnehmungs\u00fcbung', 'Puzzle Arbeitsblatt erstellen'], heroImg: '/samples/english/missing pieces/Missing Pieces 1.jpeg', heroAlt: 'Fehlende-Teile Puzzle-Arbeitsblatt' },
  { appId: 'odd-one-out', category: 'puzzle', title: 'Was-Passt-Nicht Generator', tagline: 'Erstellen Sie Ausschluss-R\u00e4tsel zum Finden des Bildes das nicht zur Gruppe geh\u00f6rt', youtubeId: 'VXGKFQRT2rA', primaryKeyword: 'Was Passt Nicht Generator', secondaryKeywords: ['Ausschluss-R\u00e4tsel Arbeitsblatt', 'Was geh\u00f6rt nicht dazu', 'Logik \u00dcbung Kinder', 'Odd One Out R\u00e4tsel', 'Kategorisierung Arbeitsblatt'], heroImg: '/samples/english/odd one out/Odd One Out 1.jpeg', heroAlt: 'Was-Passt-Nicht Arbeitsblatt mit Bilderreihen' },
  { appId: 'picture-path', category: 'puzzle', title: 'Bilderpfad Generator', tagline: 'Erstellen Sie Labyrinth-Arbeitsbl\u00e4tter zum Finden des richtigen Wegs durch Bilder', youtubeId: 'VXGKFQRT2rA', primaryKeyword: 'Bilderpfad Generator', secondaryKeywords: ['Labyrinth Arbeitsblatt', 'Bilderpfad R\u00e4tsel', 'Wegfindung Kinder', 'Maze Arbeitsblatt', 'Pfadfinder \u00dcbung'], heroImg: '/samples/english/picture path/Picture Path 1.jpeg', heroAlt: 'Bilderpfad-Labyrinth mit bunten Bildern' },
  { appId: 'picture-sort', category: 'matching', title: 'Bilder-Sortieren Generator', tagline: 'Erstellen Sie Sortier- und Kategorisierungs-Arbeitsbl\u00e4tter mit thematischen Bildern', youtubeId: 'gQEk7dPTZUA', primaryKeyword: 'Bilder Sortieren Generator', secondaryKeywords: ['Sortier-Arbeitsblatt', 'Kategorisierung \u00dcbung', 'Bilder gruppieren', 'Sortieren Vorschule', 'Klassifizierung Arbeitsblatt'], heroImg: '/samples/english/picture sort/Picture Sort 1.jpeg', heroAlt: 'Bilder-Sortieren Arbeitsblatt mit Kategorien' },
  { appId: 'shadow-match', category: 'matching', title: 'Schattenbilder-Zuordnung Generator', tagline: 'Erstellen Sie Schattenbilder-Zuordnungs\u00fcbungen zum Zuordnen von Bildern zu ihren Schatten', youtubeId: 'gQEk7dPTZUA', primaryKeyword: 'Schattenbilder Zuordnung Generator', secondaryKeywords: ['Schatten zuordnen Arbeitsblatt', 'Schattenbilder \u00dcbung', 'visuelle Wahrnehmung', 'Schatten-Matching', 'Silhouetten R\u00e4tsel'], heroImg: '/samples/english/shadow match/Shadow Match 1.jpeg', heroAlt: 'Schattenbilder-Zuordnungs-Arbeitsblatt' },
  { appId: 'sudoku', category: 'puzzle', title: 'Kinder-Sudoku Generator', tagline: 'Erstellen Sie bildbasierte 4x4 Sudoku-R\u00e4tsel f\u00fcr logisches Denken', youtubeId: 'VXGKFQRT2rA', primaryKeyword: 'Kinder Sudoku Generator', secondaryKeywords: ['Bilder-Sudoku Kinder', 'Sudoku Arbeitsblatt', '4x4 Sudoku erstellen', 'Logik-R\u00e4tsel Kinder', 'Sudoku Vorschule'], heroImg: '/samples/english/sudoku/Sudoku 1.jpeg', heroAlt: 'Kinder-Sudoku mit bunten Bildern in einem 4x4 Raster' },
  { appId: 'treasure-hunt', category: 'search', title: 'Schatzsuche Generator', tagline: 'Erstellen Sie Schatzsuche-Arbeitsbl\u00e4tter mit Richtungsanweisungen und Bildern', youtubeId: 'hwMKyCpVzSQ', primaryKeyword: 'Schatzsuche Generator', secondaryKeywords: ['Schatzsuche Arbeitsblatt', 'Richtungs\u00fcbung Kinder', 'Schatzsuche erstellen', 'Orientierung \u00dcbung', 'Treasure Hunt Arbeitsblatt'], heroImg: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg', heroAlt: 'Schatzsuche-Arbeitsblatt mit Richtungspfeilen' },
];

const categoryLinks = {
  matching: ['matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort'],
  search: ['find-and-count', 'find-objects', 'crossword', 'treasure-hunt'],
  puzzle: ['missing-pieces', 'odd-one-out', 'sudoku', 'picture-path'],
};

function generateFile(app) {
  const relatedApps = (categoryLinks[app.category] || []).filter(a => a !== app.appId).slice(0, 3);
  const relatedLinks = relatedApps.map(a => {
    const name = a.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `    { slug: '${a}', pageType: 'app' as const, anchorText: '${name} Generator' }`;
  }).join(',\n');

  return `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: '${app.appId}',
  locale: 'de',
  category: '${app.category}',

  seo: {
    titleTag: '${app.title} | Kostenlos Arbeitsbl\u00e4tter Erstellen',
    metaDescription: 'Erstellen Sie professionelle ${app.title.replace(' Generator', '')}-Arbeitsbl\u00e4tter in Sekunden. 104 Themen, Canvas-Editor, PDF-Export. Kostenloser Online-Generator f\u00fcr Lehrer und Verk\u00e4ufer.',
    primaryKeyword: '${app.primaryKeyword}',
    secondaryKeywords: ${JSON.stringify(app.secondaryKeywords)},
    lsiKeywords: [
      'Arbeitsbl\u00e4tter Grundschule',
      'Vorschule \u00dcbungen',
      'druckbare Lernmaterialien',
      'Lernspiele zum Ausdrucken',
      'p\u00e4dagogische Arbeitsbl\u00e4tter',
      'visuelle Lern\u00fcbungen',
      'Arbeitsblatt erstellen kostenlos',
      'Unterrichtsmaterial Generator',
    ],
  },

  visuals: {
    heroImages: {
      primary: '${app.heroImg}',
      primaryAlt: '${app.heroAlt}',
    },
    sampleGallery: [
      { src: '${app.heroImg}', alt: '${app.heroAlt}', caption: '${app.title} Beispiel' },
    ],
    youtubeId: '${app.youtubeId}',
    videoTitle: 'So erstellen Sie ${app.title.replace(' Generator', '')}-Arbeitsbl\u00e4tter',
  },

  hero: {
    title: '${app.title}',
    tagline: '${app.tagline}',
    description: \`Dieser ${app.title} verwandelt abstrakte \u00dcbungen in ein visuelles Erlebnis, das Kinder begeistert. Statt langweiliger Aufgaben auf einem Blatt Papier arbeiten Sch\u00fcler mit farbenfrohen, thematischen Illustrationen \u2014 von Tieren \u00fcber Fahrzeuge bis hin zu Lebensmitteln und Weltraumbildern. Jedes Arbeitsblatt wird als hochaufl\u00f6sendes JPEG und druckfertiges PDF exportiert, komplett mit automatisch generiertem L\u00f6sungsschl\u00fcssel.

W\u00e4hlen Sie aus 104 professionell illustrierten Themen und passen Sie jedes Detail an: Seitengr\u00f6\u00dfe (Letter, A4 oder benutzerdefiniert), Ausrichtung (Hoch- oder Querformat), Schriftarten und Farbschema. Der integrierte Canvas-Editor erm\u00f6glicht es Ihnen, eigene Texte hinzuzuf\u00fcgen, Elemente zu verschieben, Farben anzupassen und Rahmen hinzuzuf\u00fcgen \u2014 alles bevor Sie exportieren.

Ob Sie Lehrmaterialien f\u00fcr den Unterricht erstellen, eine Homeschool-Gruppe betreuen oder druckbare Lernmaterialien auf Etsy und Amazon KDP verkaufen \u2014 dieser Generator produziert Arbeitsbl\u00e4tter in professioneller Qualit\u00e4t in einem Bruchteil der Zeit. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Testen Sie jetzt alle Features ohne Anmeldung und ohne Kreditkarte.

Der ${app.title} eignet sich besonders gut f\u00fcr die Erstellung von differenzierten Lernmaterialien. Lehrer k\u00f6nnen schnell Arbeitsbl\u00e4tter f\u00fcr verschiedene Schwierigkeitsstufen erstellen, w\u00e4hrend Eltern die Materialien f\u00fcr das Lernen zu Hause nutzen k\u00f6nnen. Verkaufen Sie Ihre erstellten Materialien auf Etsy, Amazon KDP oder Teachers Pay Teachers und bauen Sie sich ein passives Einkommen mit druckbaren Lernmaterialien auf.

Jeder Export enth\u00e4lt automatisch einen L\u00f6sungsschl\u00fcssel, sodass Sie keine zus\u00e4tzliche Zeit f\u00fcr die manuelle Erstellung von L\u00f6sungen aufwenden m\u00fcssen. Die 104 Bildthemen decken alle beliebten Kategorien ab: Tiere (Bauernhof, Safari, Meerestiere, Dinosaurier), Fahrzeuge, Lebensmittel, Natur, Weltraum, Sport, Musik, Jahreszeiten und Feiertage. So k\u00f6nnen Sie thematische Pakete erstellen, die bei K\u00e4ufern besonders beliebt sind.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie Ihr ${app.title.replace(' Generator', '')}-Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'Thema und Modus w\u00e4hlen',
        description: 'Durchsuchen Sie 104 illustrierte Themen nach Kategorie \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und mehr. W\u00e4hlen Sie den passenden \u00dcbungsmodus f\u00fcr Ihren Unterrichtszweck.',
      },
      {
        title: 'Schwierigkeitsgrad einstellen',
        description: 'Passen Sie den Schwierigkeitsgrad an die Altersgruppe Ihrer Sch\u00fcler an. Von einfachen Aufgaben f\u00fcr die Vorschule bis zu anspruchsvollen \u00dcbungen f\u00fcr die Grundschule.',
      },
      {
        title: 'Layout und Format w\u00e4hlen',
        description: 'W\u00e4hlen Sie Seitengr\u00f6\u00dfe (Letter, A4 oder benutzerdefiniert), Ausrichtung (Hoch- oder Querformat), Aufgabenanzahl pro Seite und eine der 7 verf\u00fcgbaren Schriftarten.',
      },
      {
        title: 'Im Canvas-Editor anpassen',
        description: 'Verfeinern Sie Ihr Arbeitsblatt mit dem integrierten Editor. F\u00fcgen Sie Titel und Anweisungen hinzu, \u00e4ndern Sie Farben, wenden Sie Rahmen an und nutzen Sie Zoom- und R\u00fcckg\u00e4ngig-Funktionen.',
      },
      {
        title: 'Exportieren und Drucken',
        description: 'Laden Sie Ihr Arbeitsblatt als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel wird automatisch als separate Datei generiert. Drucken Sie die Materialien oder nutzen Sie sie digital.',
      },
    ],
  },

  features: [
    { title: '104 illustrierte Bildthemen', description: 'Jedes Thema bietet professionell gezeichnete Bilder. W\u00e4hlen Sie aus Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport, Musik, Jahreszeiten und vielem mehr f\u00fcr thematisch passende Arbeitsbl\u00e4tter.' },
    { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'F\u00fcgen Sie benutzerdefinierten Text hinzu, \u00e4ndern Sie Farben und Hintergr\u00fcnde, wenden Sie Rahmen an, verschieben Sie Elemente und verwenden Sie Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig f\u00fcr pr\u00e4zise Layouts.' },
    { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes generierte Arbeitsblatt kommt mit passendem L\u00f6sungsschl\u00fcssel. Keine manuelle Arbeit \u2014 exportieren Sie Aufgabenblatt und L\u00f6sung gleichzeitig f\u00fcr schnelle Korrektur.' },
    { title: 'Doppelexport: JPEG und PDF', description: 'Exportieren Sie als hochaufl\u00f6sende JPEG-Bilder oder druckfertige PDF-Dokumente. JPEG f\u00fcr digitale Nutzung, PDF f\u00fcr den Klassenzimmerdruck und professionelle Druckprodukte.' },
    { title: 'Flexible Seitenformate', description: 'US Letter, A4 oder benutzerdefiniert. Hoch- und Querformat verf\u00fcgbar. Passen Sie die Aufgabenanzahl pro Seite an Ihre Bed\u00fcrfnisse an.' },
    { title: '7 professionelle Schriftarten', description: 'Speziell f\u00fcr Arbeitsbl\u00e4tter ausgew\u00e4hlte Schriftarten, darunter Handschrift-Varianten f\u00fcr j\u00fcngere Kinder und klare Sans-Serif-Schriften f\u00fcr \u00e4ltere Sch\u00fcler.' },
    { title: '11 Sprachen unterst\u00fctzt', description: 'Benutzeroberfl\u00e4che in Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch verf\u00fcgbar.' },
    { title: 'Kommerzielle Lizenz inklusive', description: 'Verkaufen Sie die erstellten Arbeitsbl\u00e4tter auf Etsy, Amazon KDP, TPT, Gumroad und jeder anderen Plattform. Einmalkauf, unbegrenzte Nutzung.' },
  ],

  businessUseCases: [
    { title: 'Thematische Pakete auf Etsy verkaufen', description: 'Erstellen Sie thematische Arbeitsblatt-Pakete und listen Sie sie als Sofort-Download-Produkte. Pakete mit 20-30 Arbeitsbl\u00e4ttern erzielen h\u00f6here Preise als Einzelbl\u00e4tter.', platform: 'Etsy' },
    { title: 'Aktivit\u00e4tenb\u00fccher f\u00fcr Amazon KDP', description: 'Kompilieren Sie Arbeitsbl\u00e4tter zu Aktivit\u00e4tenb\u00fcchern f\u00fcr Amazon KDP. Erstellen Sie altersgerechte Sammlungen f\u00fcr Vorschule, Kindergarten und Grundschule.', platform: 'Amazon KDP' },
    { title: 'Lernmaterialien f\u00fcr TPT', description: 'Erstellen Sie lehrplanorientierte Materialien f\u00fcr Teachers Pay Teachers. Bieten Sie differenzierte Pakete mit verschiedenen Schwierigkeitsgraden an.', platform: 'Teachers Pay Teachers' },
    { title: 'Monatliche Aboboxen auf Gumroad', description: 'Liefern Sie monatlich neue thematische Arbeitsblatt-Sets \u00fcber Gumroads Mitgliedschaftsfunktion. Lehrer sch\u00e4tzen frische, sofort einsetzbare Materialien.', platform: 'Gumroad' },
    { title: 'Mehrsprachige Produkte f\u00fcr internationale M\u00e4rkte', description: 'Nutzen Sie die mehrsprachige Unterst\u00fctzung, um Produkte in verschiedenen Sprachen zu erstellen und international zu verkaufen. Weniger Wettbewerb in nicht-englischen M\u00e4rkten.', platform: 'Multi-Plattform' },
  ],

  faq: [
    { question: 'Wie viele Bildthemen sind verf\u00fcgbar?', answer: 'Das Full Access Pack enth\u00e4lt alle 104 illustrierten Themen. Das Commercial Pack enth\u00e4lt eine kuratierte Auswahl beliebter Themen. Beide Packs werden regelm\u00e4\u00dfig mit neuen Themen aktualisiert.' },
    { question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell nutzen?', answer: 'Ja. Beide Packs beinhalten eine kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsbl\u00e4tter auf Etsy, Amazon KDP, TPT, Gumroad und jeder anderen Plattform. Einmalkauf, unbegrenzte Nutzung.' },
    { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Das Commercial Pack (27 $) enth\u00e4lt den Generator mit kommerzieller Lizenz und ausgew\u00e4hlten Bildthemen. Das Full Access Pack (47 $) bietet alle 104 Bildthemen, Priorit\u00e4tszugang zu neuen Themen und alle Updates.' },
    { question: 'Kann ich den Generator vor dem Kauf testen?', answer: 'Auf jeden Fall. Der Generator ist kostenlos nutzbar ohne Anmeldung. Die kostenlose Version enth\u00e4lt alle Funktionen \u2014 der einzige Unterschied ist ein kleines Wasserzeichen auf exportierten Dateien.' },
    { question: 'Welche Seitenformate werden unterst\u00fctzt?', answer: 'US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierte Abmessungen. Hoch- und Querformat verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG und druckfertiges PDF.' },
    { question: 'Welche Sprachen werden unterst\u00fctzt?', answer: 'Die Benutzeroberfl\u00e4che unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.' },
    { question: 'Wird ein L\u00f6sungsschl\u00fcssel automatisch generiert?', answer: 'Ja. Jedes Arbeitsblatt wird automatisch mit einem L\u00f6sungsschl\u00fcssel exportiert. Keine manuelle Arbeit f\u00fcr die L\u00f6sungserstellung n\u00f6tig.' },
    { question: 'Funktioniert der Generator auf Mobilger\u00e4ten?', answer: 'Der Generator ist f\u00fcr Desktop-Browser optimiert. Auf Tablets funktioniert er ebenfalls gut. F\u00fcr Smartphones empfehlen wir die Desktop-Ansicht.' },
    { question: 'Wie viele Arbeitsbl\u00e4tter kann ich erstellen?', answer: 'Unbegrenzt. Sowohl die kostenlose Version als auch die bezahlten Packs haben keine Begrenzung der Arbeitsblattanzahl. Generieren Sie so viele wie Sie ben\u00f6tigen.' },
    { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\u00fcltig. Nutzen Sie die kostenlose Version, um alles vorher zu testen \u2014 probieren Sie vor dem Kauf.' },
  ],

  internalLinks: [
${relatedLinks},
    { slug: '${app.appId}', pageType: 'tool' as const, anchorText: '${app.title} Kostenlos Testen' },
    { slug: '${app.category}-bundle', pageType: 'bundle' as const, anchorText: '${app.category.charAt(0).toUpperCase() + app.category.slice(1)}-Paket \u2014 Alle Generatoren im Sparpaket' },
    { slug: 'complete-guide-printable-business', pageType: 'start' as const, anchorText: 'Kompletter Leitfaden zum Druckbaren Gesch\u00e4ft' },
    { slug: 'create-worksheets-that-sell', pageType: 'start' as const, anchorText: 'Arbeitsbl\u00e4tter erstellen die sich verkaufen' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide' as const, anchorText: 'Etsy-Shop f\u00fcr Druckbare starten' },
    { slug: 'farm-animals-printable-ideas', pageType: 'idea' as const, anchorText: 'Bauernhof-Tiere Druckbare Ideen' },
  ],
};
`;
}

let count = 0;
for (const app of apps) {
  const filePath = path.join(outDir, `${app.appId}.ts`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateFile(app), 'utf8');
    console.log(`Created: ${app.appId}.ts`);
    count++;
  } else {
    console.log(`Exists: ${app.appId}.ts`);
  }
}
console.log(`\nDone: ${count} new files created, ${apps.length - count} already existed`);
