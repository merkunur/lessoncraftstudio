// Generate all 20 German app-content files
// Writes with real Unicode, then converts to \uXXXX escape sequences
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function toEsc(c) {
  var r = '';
  for (var i = 0; i < c.length; i++) {
    var code = c.charCodeAt(i);
    if (code > 127) {
      r += String.fromCharCode(92) + 'u' + ('0000' + code.toString(16)).slice(-4);
    } else {
      r += c[i];
    }
  }
  return r;
}

function w(name, content) {
  fs.writeFileSync(path.join(dir, name), toEsc(content), 'utf8');
  console.log('Created: ' + name);
}

// Common building blocks for FAQ
function stdCommercialFaq() { return { question: 'Darf ich die erstellten Materialien kommerziell nutzen?', answer: 'Ja. Beide Pakete enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad und jeder anderen Plattform. Eine Person, unbegrenzte Erstellung.' }; }
function stdPricingFaq(name) { return { question: 'Was ist der Unterschied zwischen Kommerziellem und Vollzugriff-Paket?', answer: 'Das Kommerzielle Paket ($27) umfasst den ' + name + ' mit kommerzieller Lizenz, beliebte Bildthemen und alle 11 Sprachen. Das Vollzugriff-Paket ($47) f\u00fcgt alle 104 Themen, bevorzugten Zugang zu neuen Themen und alle Updates hinzu. Beide Einmalkauf.' }; }
function stdTryFaq() { return { question: 'Kann ich vor dem Kauf testen?', answer: 'Ja. Kostenlos ohne Anmeldung. Alle Funktionen verf\u00fcgbar \u2014 einziger Unterschied ist ein Wasserzeichen auf Exporten.' }; }
function stdLangFaq(visual) { return { question: 'Welche Sprachen werden unterst\u00fctzt?', answer: '11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.' + (visual ? ' Da die \u00dcbungen bildbasiert sind, funktioniert der Inhalt sprachunabh\u00e4ngig.' : '') }; }
function stdLimitFaq() { return { question: 'Gibt es ein Erstellungslimit?', answer: 'Nein. Unbegrenzte Erstellung bei beiden Stufen. Keine monatlichen Limits oder Kreditsysteme.' }; }
function stdRefundFaq() { return { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\u00fcltig. Lizenzschl\u00fcssel k\u00f6nnen nach Aktivierung nicht zur\u00fcckgegeben werden. Testen Sie die kostenlose Version vorher.' }; }

function buildFile(obj) {
  // Build TypeScript file content from object
  return "import type { AppDetailContent } from '../types';\n\nexport const content: AppDetailContent = " + JSON.stringify(obj, null, 2).replace(/"(\w+)":/g, '$1:') + ';\n';
}

// ============================================================
// 1. big-small.ts
// ============================================================
w('big-small.ts', buildFile({
  appId: 'big-small', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Gro\u00df & Klein Arbeitsblatt-Generator | Gr\u00f6\u00dfenvergleich Kostenlos',
    metaDescription: 'Erstellen Sie Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter mit 104 Bildthemen. Kreise das gro\u00dfe, kleine oder mittlere Objekt ein. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Gr\u00f6\u00dfenvergleich Arbeitsbl\u00e4tter',
    secondaryKeywords: ['gro\u00df und klein Arbeitsbl\u00e4tter','Gr\u00f6\u00dfen vergleichen \u00dcbungen','Gr\u00f6\u00dfensortierung Vorschule','Gr\u00f6\u00dfen zuordnen Arbeitsblatt','gro\u00df mittel klein Aktivit\u00e4ten'],
    lsiKeywords: ['visuelle Unterscheidung Arbeitsbl\u00e4tter','Vorschule Mathematik Konzepte','Gr\u00f6\u00dfenordnung \u00dcbungen','fr\u00fche Mathematik F\u00e4higkeiten','Kindergarten Gr\u00f6\u00dfen Arbeitsbl\u00e4tter','Messkonzepte Vorschule','Objekte vergleichen Arbeitsblatt','visuelle Vorschul-F\u00e4higkeiten'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/big small/big-small identical images.jpeg',
      primaryAlt: 'Gro\u00df-und-Klein-Arbeitsblatt mit identischen Tierbildern f\u00fcr Gr\u00f6\u00dfenvergleichs\u00fcbungen',
      secondary: '/samples/english/big small/big-small different images.jpeg',
      secondaryAlt: 'Gr\u00f6\u00dfenvergleich-Arbeitsblatt mit verschiedenen thematischen Bildern',
    },
    sampleGallery: [
      { src: '/samples/english/big small/big-small identical images.jpeg', alt: 'Gr\u00f6\u00dfenvergleich mit identischen Bildern in drei Gr\u00f6\u00dfen', caption: 'Modus: Identische Bilder' },
      { src: '/samples/english/big small/big-small different images.jpeg', alt: 'Gro\u00df-und-Klein mit verschiedenen Bildern', caption: 'Modus: Verschiedene Bilder' },
      { src: '/samples/english/big small/big-small medium.jpeg', alt: 'Kreise das mittlere Objekt ein', caption: 'Kreise das mittlere ein' },
      { src: '/samples/english/big small/big-small labels.jpeg', alt: 'Arbeitsblatt mit Nummernbeschriftungen', caption: 'Nummernbeschriftungen aktiviert' },
      { src: '/samples/english/big small/big-small animals.jpeg', alt: 'Tier-Thema Gro\u00df-und-Klein-Arbeitsblatt', caption: 'Bauernhoftiere-Thema' },
      { src: '/samples/english/big small/big-small answer-key.jpeg', alt: 'Automatischer L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'S2s2U6Nb7FI',
    videoTitle: 'So erstellen Sie Gro\u00df-und-Klein-Arbeitsbl\u00e4tter',
  },
  hero: {
    title: 'Gro\u00df & Klein Arbeitsblatt-Generator',
    tagline: 'Gr\u00f6\u00dfenvergleich spielerisch vermitteln \u2014 mit farbenfrohen Bild\u00fcbungen, die Kinder begeistern',
    description: 'Gr\u00f6\u00dfenverst\u00e4ndnis \u2014 welches Objekt ist gr\u00f6\u00dfer, welches kleiner, welches liegt in der Mitte \u2014 geh\u00f6rt zu den ersten mathematischen Konzepten, denen ein Kind begegnet. Der Gro\u00df & Klein Arbeitsblatt-Generator verwandelt diese grundlegende F\u00e4higkeit in eine praktische visuelle \u00dcbung, die junge Lernende vom ersten Kreis an fesselt.\n\nW\u00e4hlen Sie aus drei \u00dcbungsmodi. \u201eKreise das Gro\u00dfe ein\u201c fordert die Sch\u00fcler auf, das gr\u00f6\u00dfte Objekt in einer Reihe zu erkennen. \u201eKreise das Kleine ein\u201c kehrt die Aufgabe um. \u201eKreise das Mittlere ein\u201c f\u00fchrt eine dritte Denkebene ein \u2014 Kinder m\u00fcssen relative Gr\u00f6\u00dfen bewerten, statt nur Extreme zu bestimmen. Jeder Modus f\u00f6rdert r\u00e4umliches Vorstellungsverm\u00f6gen und legt den Grundstein f\u00fcr sp\u00e4teres Messen, Ordnen und Sch\u00e4tzen.\n\nZwei Bildstile steuern die visuelle Komplexit\u00e4t. \u201eIdentische Bilder\u201c zeigt dasselbe Bild in verschiedenen Gr\u00f6\u00dfen \u2014 ideal, um das Gr\u00f6\u00dfenkonzept isoliert zu vermitteln. \u201eVerschiedene Bilder\u201c verwendet unterschiedliche Objekte aus demselben Thema und fordert Sch\u00fcler heraus, Gr\u00f6\u00dfen \u00fcber verschiedene Formen hinweg zu vergleichen.\n\nMit 104 illustrierten Themen \u2014 Tiere, Lebensmittel, Fahrzeuge, Natur, Musikinstrumente und Dutzende mehr \u2014 wirkt jedes Arbeitsblatt frisch. Optionale Nummernbeschriftungen verbinden Gr\u00f6\u00dfenvergleich und Zahlverst\u00e4ndnis. Der integrierte Canvas-Editor erm\u00f6glicht Titel, Farbanpassungen, Rahmen und Neupositionierung.\n\nJedes Arbeitsblatt wird als hochaufl\u00f6sendes JPEG und druckfertiges PDF exportiert, mit automatischem L\u00f6sungsschl\u00fcssel. Ob Vorschulklasse, Homeschool oder Etsy und Amazon KDP \u2014 dieser Generator liefert professionelle Arbeitsbl\u00e4tter in Sekunden. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 jetzt testen ohne Anmeldung.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Gr\u00f6\u00dfenvergleich-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: '\u00dcbungsmodus w\u00e4hlen', description: 'W\u00e4hlen Sie aus drei Modi: \u201eKreise das Gro\u00dfe ein\u201c, \u201eKreise das Kleine ein\u201c oder \u201eKreise das Mittlere ein\u201c. Jeder Modus f\u00f6rdert ein anderes Niveau visuellen Denkens.' },
      { title: 'Bildstil ausw\u00e4hlen', description: '\u201eIdentische Bilder\u201c f\u00fcr dasselbe Bild in verschiedenen Gr\u00f6\u00dfen oder \u201eVerschiedene Bilder\u201c f\u00fcr unterschiedliche Objekte desselben Themas mit mehr Alltagsbezug.' },
      { title: 'Thema und Layout festlegen', description: '104 Bildthemen nach Kategorien \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur. Seitengr\u00f6\u00dfe (Letter, A4 oder individuell), Ausrichtung und \u00dcbungen pro Seite festlegen.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Titel oder Namensfelder hinzuf\u00fcgen, Hintergrundfarben \u00e4ndern, Rahmen anwenden, Elemente verschieben, Zoom- und Ebenensteuerung nutzen.' },
      { title: 'Exportieren und Drucken', description: 'Arbeitsblatt als JPEG oder PDF herunterladen. L\u00f6sungsschl\u00fcssel wird automatisch als separate Datei erstellt.' },
    ],
  },
  features: [
    { title: 'Drei Gr\u00f6\u00dfenvergleich-Modi', description: '\u201eKreise das Gro\u00dfe ein\u201c identifiziert das gr\u00f6\u00dfte Objekt. \u201eKreise das Kleine ein\u201c kehrt die Aufgabe um. \u201eKreise das Mittlere ein\u201c f\u00fchrt relativen Vergleich ein. Wechseln Sie Modi f\u00fcr progressive Lernziele.' },
    { title: 'Identische oder verschiedene Bildstile', description: '\u201eIdentische Bilder\u201c zeigt dasselbe Bild in unterschiedlichen Gr\u00f6\u00dfen. \u201eVerschiedene Bilder\u201c nutzt unterschiedliche Objekte desselben Themas f\u00fcr mehr Komplexit\u00e4t. Beide werden automatisch generiert.' },
    { title: '104 illustrierte Bildthemen', description: 'Professionell gezeichnete Bilder in Kategorien wie Bauernhoftiere, Meeresbewohner, Fahrzeuge, Obst, Sportger\u00e4te, Musikinstrumente und saisonale Motive.' },
    { title: 'Optionale Nummernbeschriftungen', description: 'Nummern unter jedem Bild verbinden visuelle Unterscheidung und Zahlverst\u00e4ndnis. Pro Arbeitsblatt ein- oder ausschaltbar.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. R\u00fcckg\u00e4ngig und Wiederholen jederzeit verf\u00fcgbar.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes Arbeitsblatt kommt mit L\u00f6sungsschl\u00fcssel mit gleichem Layout und Thema. Richtige Antwort deutlich markiert.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung und Vorschauen. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
    { title: '7 professionelle Schriftarten', description: 'Von abgerundeten Buchstaben f\u00fcr Vorschulkinder bis zu klaren Stilen f\u00fcr \u00e4ltere Sch\u00fcler. Gestochen scharf in beiden Exportformaten.' },
  ],
  businessUseCases: [
    { title: 'Vorschul-Aktivit\u00e4tspakete auf Etsy verkaufen', description: 'Thematische Gr\u00f6\u00dfenvergleich-Pakete \u2014 Tiere, Fahrzeuge, Lebensmittel \u2014 als Sofort-Download. Beide Bildmodi f\u00fcr Abwechslung. Etsy-K\u00e4ufer suchen tausendfach nach \u201eVorschule Arbeitsbl\u00e4tter\u201c.', platform: 'Etsy' },
    { title: 'Fr\u00fchf\u00f6rder-B\u00fccher auf Amazon KDP', description: 'PDFs mit progressivem Schwierigkeitsgrad f\u00fcr 50\u2013100-Seiten-B\u00fccher. Alle drei Modi f\u00fcr vollst\u00e4ndige Abdeckung.', platform: 'Amazon KDP' },
    { title: 'Differenzierte Pakete f\u00fcr Lehrerplattformen', description: 'Identische Bilder f\u00fcr 3-J\u00e4hrige, beide Stile f\u00fcr 4-J\u00e4hrige, Mittelwert-Vergleich f\u00fcr 5-J\u00e4hrige. Mit L\u00f6sungsschl\u00fcsseln b\u00fcndeln.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale \u00dcbungspakete', description: 'K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen zum Valentinstag, Blumen f\u00fcr Fr\u00fchling. Ganzj\u00e4hrig anbietbar.', platform: 'Multi-platform' },
    { title: 'Vor-Mathematik-Curriculum f\u00fcr Homeschooler', description: '20\u201336 Wochen progressive Arbeitsbl\u00e4tter als komplettes Fr\u00fchf\u00f6rder-Produkt.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Welche \u00dcbungsmodi bietet der Generator?', answer: 'Drei Modi: \u201eKreise das Gro\u00dfe ein\u201c, \u201eKreise das Kleine ein\u201c und \u201eKreise das Mittlere ein\u201c. Jeder f\u00f6rdert ein anderes Niveau visuellen Denkens.' },
    { question: 'Was ist der Unterschied zwischen identischen und verschiedenen Bildern?', answer: '\u201eIdentische Bilder\u201c zeigt dasselbe Bild in verschiedenen Gr\u00f6\u00dfen. \u201eVerschiedene Bilder\u201c nutzt unterschiedliche Objekte desselben Themas.' },
    { question: 'Wie viele Bildthemen sind verf\u00fcgbar?', answer: 'Das Vollzugriff-Paket umfasst alle 104 Themen. Das Kommerzielle Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen eigene Uploads.' },
    { question: 'F\u00fcr welche Altersgruppe?', answer: 'Prim\u00e4r 3\u20136 Jahre (Vorschule bis Kindergarten). Drei Modi erm\u00f6glichen Differenzierung.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch erstellt?', answer: 'Ja. Passender L\u00f6sungsschl\u00fcssel mit gleichem Layout und Thema.' },
    stdCommercialFaq(),
    stdPricingFaq('Gro\u00df & Klein Generator'),
    stdTryFaq(),
    stdLangFaq(true),
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien-Zeichnen-Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'big-small', pageType: 'tool', anchorText: 'Gro\u00df & Klein Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-size-comparison-worksheets', pageType: 'guide', anchorText: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Vorschul-Printable-Nischenideen' },
  ],
}));

console.log('\nFile 1/20 complete. Writing remaining 19 files...');
