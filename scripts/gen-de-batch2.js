// Generate German app-content files: pattern-train, pattern-worksheet, draw-and-color, drawing-lines, coloring, chart-count
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function toEsc(c) {
  var r = '';
  for (var i = 0; i < c.length; i++) {
    var code = c.charCodeAt(i);
    if (code > 127) r += String.fromCharCode(92) + 'u' + ('0000' + code.toString(16)).slice(-4);
    else r += c[i];
  }
  return r;
}
function w(name, content) { fs.writeFileSync(path.join(dir, name), toEsc(content), 'utf8'); console.log('Created: ' + name); }
function buildFile(obj) {
  return "import type { AppDetailContent } from '../types';\n\nexport const content: AppDetailContent = " + JSON.stringify(obj, null, 2).replace(/"(\w+)":/g, '$1:') + ';\n';
}

function stdCommercialFaq() { return { question: 'Darf ich die erstellten Materialien kommerziell nutzen?', answer: 'Ja. Beide Pakete enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad und jeder anderen Plattform. Eine Person, unbegrenzte Erstellung.' }; }
function stdPricingFaq(name) { return { question: 'Was ist der Unterschied zwischen Kommerziellem und Vollzugriff-Paket?', answer: 'Das Kommerzielle Paket ($27) umfasst den ' + name + ' mit kommerzieller Lizenz, beliebte Bildthemen und alle 11 Sprachen. Das Vollzugriff-Paket ($47) f\u00fcgt alle 104 Themen, bevorzugten Zugang zu neuen Themen und alle Updates hinzu. Beide Einmalkauf.' }; }
function stdTryFaq() { return { question: 'Kann ich vor dem Kauf testen?', answer: 'Ja. Kostenlos ohne Anmeldung. Alle Funktionen verf\u00fcgbar \u2014 einziger Unterschied ist ein Wasserzeichen auf Exporten.' }; }
function stdLangFaq(visual) { return { question: 'Welche Sprachen werden unterst\u00fctzt?', answer: '11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.' + (visual ? ' Da die \u00dcbungen bildbasiert sind, funktioniert der Inhalt sprachunabh\u00e4ngig.' : '') }; }
function stdLimitFaq() { return { question: 'Gibt es ein Erstellungslimit?', answer: 'Nein. Unbegrenzte Erstellung bei beiden Stufen. Keine monatlichen Limits oder Kreditsysteme.' }; }
function stdRefundFaq() { return { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind aufgrund der digitalen Natur des Produkts endg\u00fcltig. Lizenzschl\u00fcssel k\u00f6nnen nach Aktivierung nicht zur\u00fcckgegeben werden. Testen Sie die kostenlose Version vorher.' }; }

// ============================================================
// pattern-train.ts
// ============================================================
w('pattern-train.ts', buildFile({
  appId: 'pattern-train', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Musterzug Arbeitsblatt-Generator | Muster-R\u00e4tsel Kostenlos',
    metaDescription: 'Erstellen Sie Muster-Sequenz-R\u00e4tsel im Zugformat. 4\u201310 konfigurierbare Hinweise, 104 Bildthemen, zuf\u00e4llige L\u00fcckenplatzierung. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Musterzug Arbeitsbl\u00e4tter',
    secondaryKeywords: ['Muster-Sequenz Arbeitsbl\u00e4tter','Zug-Muster R\u00e4tsel druckbar','visuelle Muster Arbeitsbl\u00e4tter Vorschule','Mustererkennung \u00dcbungen','Sequenz-Erg\u00e4nzungs\u00fcbungen'],
    lsiKeywords: ['Mustererkennung F\u00e4higkeiten','sequentielles Denken','Kindergarten Muster Aktivit\u00e4ten','AB Muster Arbeitsbl\u00e4tter','Wiederholungsmuster \u00dcbungen','logisches Denken Vorschule','visuelle Reihenfolge R\u00e4tsel','fr\u00fche Mathematik Muster'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/pattern train/pattern_train_worksheet (1).jpeg',
      primaryAlt: 'Musterzug-Arbeitsblatt mit farbenfrohen Bildsequenzen im Waggon-Format f\u00fcr Vorschulkinder',
      secondary: '/samples/english/pattern train/pattern_train_worksheet (2).jpeg',
      secondaryAlt: 'Muster-Sequenz-R\u00e4tsel im Zug-Layout mit leeren Zellen zum Vervollst\u00e4ndigen',
    },
    sampleGallery: [
      { src: '/samples/english/pattern train/pattern_train_worksheet (1).jpeg', alt: 'Musterzug mit Tierthema und wiederholendem Bildmuster', caption: 'Tierthema Musterzug' },
      { src: '/samples/english/pattern train/pattern_train_worksheet (2).jpeg', alt: 'Musterzug-R\u00e4tsel mit Lebensmittelbildern und leeren Zellen', caption: 'Lebensmittelthema mit L\u00fccken' },
      { src: '/samples/english/pattern train/pattern_train_worksheet (3).jpeg', alt: 'Musterzug mit 8 Bildpositionen', caption: '8-Hinweise-Konfiguration' },
      { src: '/samples/english/pattern train/pattern_train_worksheet (4).jpeg', alt: 'Musterzug mit Fahrzeugthema und zuf\u00e4lliger L\u00fcckenplatzierung', caption: 'Fahrzeugthema, zuf\u00e4llige L\u00fccken' },
      { src: '/samples/english/pattern train/pattern_train_worksheet (5).jpeg', alt: 'Einfacher 4-Hinweise-Musterzug f\u00fcr Anf\u00e4nger', caption: 'Einfacher 4-Hinweise-Zug' },
      { src: '/samples/english/pattern train/pattern_train_worksheet (6).jpeg', alt: 'Musterzug L\u00f6sungsschl\u00fcssel mit ausgef\u00fcllten L\u00f6sungen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '5A4aHvcC5u4',
    videoTitle: 'So erstellen Sie Musterzug-Arbeitsbl\u00e4tter mit Bildern',
  },
  hero: {
    title: 'Musterzug Arbeitsblatt-Generator',
    tagline: 'Mustererkennung spielerisch vermitteln \u2014 mit zugf\u00f6rmigen Sequenzr\u00e4tseln, die Kinder begeistern',
    description: 'Mustererkennung ist das Tor zum mathematischen Denken. Bevor Kinder addieren, subtrahieren oder multiplizieren, m\u00fcssen sie wiederkehrende Strukturen in ihrer Umgebung erkennen. Der Musterzug-Generator verwandelt diese entscheidende F\u00e4higkeit in ein spielerisches visuelles R\u00e4tsel, bei dem jede Sequenz in einem farbenfrohen Zug mitf\u00e4hrt.\n\nJeder Zug tr\u00e4gt ein sich wiederholendes Bildmuster, wobei einige Waggons absichtlich leer gelassen werden. Sch\u00fcler untersuchen die sichtbaren Bilder, erkennen die Wiederholungsregel und bestimmen, welche Bilder in die leeren Waggons geh\u00f6ren. Das Zugformat f\u00fcgt eine erz\u00e4hlerische Ebene hinzu, die junge Lernende fesselt \u2014 sie f\u00fcllen nicht einfach L\u00fccken, sie vervollst\u00e4ndigen eine Reise.\n\nSie steuern die Komplexit\u00e4t mit einer konfigurierbaren Hinweisanzahl von 4 bis 10 Positionen pro Zug. Ein 4-Hinweise-Zug mit einer L\u00fccke eignet sich perfekt f\u00fcr Dreij\u00e4hrige, die gerade AB-Muster lernen. Ein 8-Hinweise-Zug mit mehreren L\u00fccken fordert Kindergartenkinder mit ABC- oder AABB-Mustern heraus. Die L\u00fccken werden zuf\u00e4llig innerhalb der Sequenz platziert, sodass jeder generierte Zug ein leicht anderes R\u00e4tsel darstellt.\n\nW\u00e4hlen Sie aus 104 illustrierten Themen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und Dutzende mehr \u2014 um \u00dcbungssitzungen abwechslungsreich zu halten. Die themenbasierte Automatik w\u00e4hlt passende Bilder, oder Sie w\u00e4hlen manuell f\u00fcr gezielte \u00dcbungen. Der integrierte Canvas-Editor erm\u00f6glicht Titel, Farbanpassungen, Rahmen und Neupositionierung.\n\nArbeitsbl\u00e4tter werden als hochaufl\u00f6sendes JPEG und druckfertiges PDF exportiert, jeweils mit automatischem L\u00f6sungsschl\u00fcssel. Ob Vorschulklasse, Homeschool oder Etsy und Amazon KDP \u2014 dieser Generator liefert ansprechende Muster-R\u00e4tsel in Sekunden. Die kostenlose Version bietet vollen Funktionsumfang mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Musterzug-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: 'Hinweisanzahl festlegen', description: 'W\u00e4hlen Sie 4 bis 10 Positionen pro Zug. Weniger Positionen mit einer L\u00fccke f\u00fcr Anf\u00e4nger mit AB-Mustern. Mehr Positionen mit mehreren L\u00fccken f\u00fcr komplexe Sequenzen wie ABC oder AABB.' },
      { title: 'Thema ausw\u00e4hlen', description: '104 Bildthemen nach Kategorien \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur. Automatische Bildauswahl oder manueller Modus f\u00fcr gezielte \u00dcbungen.' },
      { title: 'Layout und L\u00fccken konfigurieren', description: 'Der Generator platziert L\u00fccken zuf\u00e4llig. Seitengr\u00f6\u00dfe (Letter, A4 oder individuell), Ausrichtung und Schriftart festlegen. Jeder generierte Zug ist einzigartig.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Titel, Namensfelder oder Anweisungen hinzuf\u00fcgen. Hintergrundfarben, Rahmen, Zoom und Ebenensteuerung nutzen.' },
      { title: 'Exportieren und Drucken', description: 'Arbeitsblatt als JPEG oder PDF herunterladen. L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndiger Sequenz wird automatisch erstellt.' },
    ],
  },
  features: [
    { title: 'Konfigurierbare Hinweisanzahl: 4 bis 10', description: '4 bis 10 Bildpositionen pro Zug. K\u00fcrzere Z\u00fcge mit einfachen AB-Mustern f\u00fcr Vorschulkinder. L\u00e4ngere Z\u00fcge mit ABC, AABB oder komplexeren Mustern f\u00fcr Kindergarten und erste Klasse.' },
    { title: 'Zuf\u00e4llige L\u00fcckenplatzierung', description: 'Der Generator w\u00e4hlt zuf\u00e4llig, welche Waggons leer bleiben. Jedes Arbeitsblatt ist einzigartig, auch bei gleichen Einstellungen. Sch\u00fcler k\u00f6nnen keine Positionen auswendig lernen.' },
    { title: 'Themenbasierte Automatik oder manuelle Auswahl', description: 'Im Automodus w\u00e4hlt der Generator Bilder aus dem gew\u00e4hlten Thema. Im manuellen Modus w\u00e4hlen Sie jedes Bild einzeln f\u00fcr maximale Kontrolle.' },
    { title: '104 illustrierte Bildthemen', description: 'Professionell gezeichnete Bilder in Kategorien wie Bauernhoftiere, Meeresbewohner, Fahrzeuge, Obst, Sportger\u00e4te und saisonale Motive.' },
    { title: 'Zugvorlage mit visuellem Reiz', description: 'Das Zugformat f\u00fcgt spielerische Erz\u00e4hlung hinzu. Jeder Waggon enth\u00e4lt ein Bild, leere Waggons sind klar markiert. Ansprechender als generische Gitter-Arbeitsbl\u00e4tter.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. R\u00fcckg\u00e4ngig und Wiederholen jederzeit verf\u00fcgbar.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes Arbeitsblatt kommt mit L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndiger Mustersequenz. Gleiches Layout, Thema und Schriftart f\u00fcr schnelle \u00dcberpr\u00fcfung.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung und Vorschauen. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
  ],
  businessUseCases: [
    { title: 'Muster-Aktivit\u00e4tspakete auf Etsy verkaufen', description: 'Thematische Musterzug-Pakete \u2014 10 Tiere, 10 Fahrzeuge, 10 Lebensmittel \u2014 als Sofort-Download. Schwierigkeitsgrade innerhalb jedes Pakets variieren.', platform: 'Etsy' },
    { title: 'Mustererkennung-B\u00fccher auf Amazon KDP', description: 'PDFs mit progressivem Schwierigkeitsgrad f\u00fcr 50\u2013100-Seiten-B\u00fccher. Von 4-Hinweise-Z\u00fcgen bis 10-Hinweise-Z\u00fcgen f\u00fcr nat\u00fcrliche Progression.', platform: 'Amazon KDP' },
    { title: 'Fr\u00fche Mathe-Pakete f\u00fcr Lehrerplattformen', description: 'Differenzierte Pakete: AB-Muster f\u00fcr Vorschule, ABC f\u00fcr Kindergarten, AABB f\u00fcr erste Klasse. Mit L\u00f6sungsschl\u00fcsseln b\u00fcndeln.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Muster-R\u00e4tsel', description: 'K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen zum Valentinstag, Blumen f\u00fcr Fr\u00fchling. Ganzj\u00e4hrig anbietbar.', platform: 'Multi-platform' },
    { title: 'Sequentielles Denken-Curriculum', description: '20\u201336 Wochen progressive Arbeitsbl\u00e4tter: von 4-Hinweise-AB-Z\u00fcgen bis 8\u201310-Hinweise-komplexe Sequenzen. Komplett als Fr\u00fchf\u00f6rder-Produkt.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Was ist ein Musterzug-Arbeitsblatt?', answer: 'Ein Musterzug zeigt ein sich wiederholendes Bildmuster im Zugformat, wobei einige Waggons leer bleiben. Sch\u00fcler analysieren die sichtbaren Bilder, erkennen das Muster und bestimmen die fehlenden Bilder.' },
    { question: 'Wie viele Hinweise kann ich pro Zug einstellen?', answer: '4 bis 10 Bildpositionen pro Zug. Weniger Positionen mit einer L\u00fccke f\u00fcr AB-Muster-Anf\u00e4nger. Mehr Positionen mit mehreren L\u00fccken f\u00fcr ABC, AABB oder komplexere Sequenzen.' },
    { question: 'Werden die L\u00fccken zuf\u00e4llig platziert?', answer: 'Ja. Der Generator platziert L\u00fccken zuf\u00e4llig innerhalb der Sequenz. Jedes Arbeitsblatt ist einzigartig, auch bei gleichen Einstellungen.' },
    { question: 'Wie viele Bildthemen gibt es?', answer: 'Das Vollzugriff-Paket umfasst alle 104 Themen. Das Kommerzielle Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen eigene Uploads.' },
    { question: 'Kann ich bestimmte Bilder ausw\u00e4hlen?', answer: 'Ja. Automatik w\u00e4hlt Bilder aus dem Thema. Manueller Modus erm\u00f6glicht individuelle Auswahl f\u00fcr jede Position.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch erstellt?', answer: 'Ja. Passender L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndiger Sequenz, gleichem Layout und Thema.' },
    stdCommercialFaq(),
    stdPricingFaq('Musterzug-Generator'),
    stdTryFaq(),
    { question: 'F\u00fcr welche Altersgruppe?', answer: 'Musterzug-Arbeitsbl\u00e4tter eignen sich f\u00fcr 3\u20137 Jahre (Vorschule bis erste Klasse). K\u00fcrzere Z\u00fcge f\u00fcr die J\u00fcngsten, l\u00e4ngere Z\u00fcge f\u00fcr \u00e4ltere Sch\u00fcler.' },
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien-Zeichnen-Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'pattern-train', pageType: 'tool', anchorText: 'Musterzug-Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten-Printable-Nischenideen' },
  ],
}));

// ============================================================
// pattern-worksheet.ts
// ============================================================
w('pattern-worksheet.ts', buildFile({
  appId: 'pattern-worksheet', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Muster-Arbeitsblatt-Generator | Multi-R\u00e4tsel-Bl\u00e4tter Kostenlos',
    metaDescription: 'Erstellen Sie Multi-R\u00e4tsel-Muster-Arbeitsbl\u00e4tter mit 1\u20138 R\u00e4tseln pro Blatt. Individuelle Themen und Muster pro R\u00e4tsel. 104 Bildthemen. Kostenlos mit PDF-Export.',
    primaryKeyword: 'Muster Arbeitsblatt Generator',
    secondaryKeywords: ['Muster Arbeitsbl\u00e4tter druckbar','visuelle Muster Arbeitsbl\u00e4tter','Mustererkennung Vorlagen','Wiederholungsmuster Arbeitsbl\u00e4tter','Multi-R\u00e4tsel Musterbl\u00e4tter'],
    lsiKeywords: ['Muster vervollst\u00e4ndigen \u00dcbungen','Reihenfolge Arbeitsbl\u00e4tter Vorschule','Kindergarten Muster\u00fcbungen','AB ABC Muster Aktivit\u00e4ten','logisches Denken Arbeitsbl\u00e4tter','fr\u00fche Mathe Musterf\u00e4higkeiten','visuelle Sequenzen druckbar','Musteridentifikation Aufgaben'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/pattern worksheet/pattern_worksheet (1).jpeg',
      primaryAlt: 'Multi-R\u00e4tsel-Muster-Arbeitsblatt mit farbenfrohen Bildsequenzen f\u00fcr Vorschul- und Kindergartenkinder',
      secondary: '/samples/english/pattern worksheet/pattern_worksheet (2).jpeg',
      secondaryAlt: 'Muster-Erg\u00e4nzungs-Arbeitsblatt mit verschiedenen Themen auf einer Seite',
    },
    sampleGallery: [
      { src: '/samples/english/pattern worksheet/pattern_worksheet (1).jpeg', alt: 'Muster-Arbeitsblatt mit 4 R\u00e4tseln im Tierthema', caption: '4 R\u00e4tsel, Tierthema' },
      { src: '/samples/english/pattern worksheet/pattern_worksheet (2).jpeg', alt: 'Multi-R\u00e4tsel-Blatt mit gemischten Themen und nummerierten R\u00e4tseln', caption: 'Gemischte Themen, nummeriert' },
      { src: '/samples/english/pattern worksheet/pattern_worksheet (3).jpeg', alt: 'Muster-Arbeitsblatt mit 8 R\u00e4tseln pro Seite', caption: '8 R\u00e4tsel pro Seite' },
      { src: '/samples/english/pattern worksheet/pattern_worksheet (4).jpeg', alt: 'Muster-Arbeitsblatt mit globaler Themen\u00fcberschreibung', caption: 'Globale Themen\u00fcberschreibung' },
      { src: '/samples/english/pattern worksheet/pattern_worksheet (5).jpeg', alt: 'Einfaches 2-R\u00e4tsel-Muster-Arbeitsblatt f\u00fcr Anf\u00e4nger', caption: '2 R\u00e4tsel f\u00fcr Anf\u00e4nger' },
      { src: '/samples/english/pattern worksheet/pattern_worksheet (6).jpeg', alt: 'Muster-Arbeitsblatt L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigen Sequenzen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'W94X5_RA3ug',
    videoTitle: 'So erstellen Sie Multi-R\u00e4tsel-Muster-Arbeitsbl\u00e4tter',
  },
  hero: {
    title: 'Muster-Arbeitsblatt-Generator',
    tagline: 'Multi-R\u00e4tsel-Musterbl\u00e4tter mit individueller Konfiguration pro R\u00e4tsel f\u00fcr maximale Flexibilit\u00e4t',
    description: 'Die meisten Muster-Arbeitsblatt-Tools erzeugen ein R\u00e4tsel gleichzeitig, sodass Sie Seiten manuell zusammenstellen m\u00fcssen. Der Muster-Arbeitsblatt-Generator geht einen anderen Weg: Er platziert 1 bis 8 Muster-R\u00e4tsel auf einer einzigen Seite, jedes mit eigenem Thema, Mustertyp und Schwierigkeitsgrad.\n\nDiese Konfiguration pro R\u00e4tsel macht den Generator einzigartig. Auf einem Arbeitsblatt k\u00f6nnen Sie ein AB-Tiermuster in Reihe eins, ein ABC-Fahrzeugmuster in Reihe zwei, ein AABB-Lebensmittelmuster in Reihe drei und ein ABB-Naturmuster in Reihe vier haben. Sch\u00fcler begegnen mehreren Mustertypen in einer \u00dcbung und entwickeln flexibles Denken.\n\nWenn Sie Konsistenz bevorzugen, wendet die globale Themen\u00fcberschreibung ein Thema auf alle R\u00e4tsel der Seite an. Das Nummerierungssystem beschriftet jede \u00dcbung klar f\u00fcr einfache Korrektur.\n\nW\u00e4hlen Sie aus 104 illustrierten Themen. Der Canvas-Editor erm\u00f6glicht Text, Farben, Rahmen und Neupositionierung. Jedes Arbeitsblatt wird als JPEG und PDF exportiert, mit automatischem L\u00f6sungsschl\u00fcssel. Ob Klassenzimmer, Homeschool oder Etsy und Amazon KDP \u2014 professionelle Multi-R\u00e4tsel-Bl\u00e4tter in Sekunden. Kostenlose Version mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Muster-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: 'R\u00e4tselanzahl festlegen', description: '1 bis 8 R\u00e4tsel pro Seite. Weniger R\u00e4tsel bieten mehr Platz. Mehr R\u00e4tsel packen effiziente \u00dcbung auf ein Blatt.' },
      { title: 'Jedes R\u00e4tsel konfigurieren', description: 'Mustertyp (AB, ABC, AABB, ABB und mehr) und Thema f\u00fcr jedes R\u00e4tsel einzeln festlegen. Oder globale Themen\u00fcberschreibung f\u00fcr einheitliches Aussehen.' },
      { title: 'Layout und Schriftart w\u00e4hlen', description: 'Seitengr\u00f6\u00dfe (Letter, A4 oder individuell), Ausrichtung und Schriftart aus 7 Optionen. Automatische Nummerierung jeder Reihe.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Titel, Anweisungen, Namensfelder hinzuf\u00fcgen. Hintergrundfarben, Rahmen, Zoom und Ebenensteuerung.' },
      { title: 'Exportieren und Drucken', description: 'JPEG oder PDF herunterladen. L\u00f6sungsschl\u00fcssel mit allen Sequenzen wird automatisch erstellt.' },
    ],
  },
  features: [
    { title: '1 bis 8 R\u00e4tsel pro Blatt', description: 'Von einem fokussierten R\u00e4tsel bis acht kompakte \u00dcbungen pro Seite. Weniger R\u00e4tsel f\u00fcr Tests. Mehr R\u00e4tsel f\u00fcr Haus\u00fcbungen oder Aktivit\u00e4tsb\u00fccher. Automatische Skalierung.' },
    { title: 'Individuelle Konfiguration pro R\u00e4tsel', description: 'Jedes R\u00e4tsel hat eigene Einstellungen f\u00fcr Mustertyp und Bildthema. Variierte, differenzierte \u00dcbung auf einem Blatt.' },
    { title: 'Globale Themen\u00fcberschreibung', description: 'Ein Thema f\u00fcr alle R\u00e4tsel bei unterschiedlichen Mustertypen. Thematische Einheitlichkeit mit kognitiver Vielfalt.' },
    { title: 'R\u00e4tsel-Nummerierungssystem', description: 'Automatische Nummerierung jedes R\u00e4tsels f\u00fcr klare Anweisungen und einfache Korrektur.' },
    { title: '104 illustrierte Bildthemen', description: 'Professionell gezeichnete Bilder f\u00fcr Mustersequenzen. Bauernhoftiere, Meeresbewohner, Fahrzeuge, Obst und saisonale Motive.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. R\u00fcckg\u00e4ngig und Wiederholen jederzeit verf\u00fcgbar.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Passender L\u00f6sungsschl\u00fcssel mit allen Sequenzen, gleichem Layout, Nummerierung, Thema und Schriftart.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung und Vorschauen. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
  ],
  businessUseCases: [
    { title: 'Differenzierte Muster-Pakete auf Etsy verkaufen', description: 'Thematische B\u00fcndel mit verschiedenen Schwierigkeitsgraden: einfache AB-Muster f\u00fcr Vorschule, gemischte ABC/AABB f\u00fcr Kindergarten. Multi-R\u00e4tsel-Seiten bieten mehr Wert pro Download.', platform: 'Etsy' },
    { title: 'Mustererkennung-B\u00fccher auf Amazon KDP', description: 'Multi-R\u00e4tsel-PDFs in 50\u2013100-Seiten-B\u00fcchern. 2\u20133 R\u00e4tsel pro Seite f\u00fcr j\u00fcngere, 6\u20138 pro Seite f\u00fcr fortgeschrittene Sch\u00fcler.', platform: 'Amazon KDP' },
    { title: 'Bewertungspakete f\u00fcr Lehrerplattformen', description: '\u00dcbungssets nach Mustertyp organisiert: AB-Bewertung, ABC-Bewertung, gemischte Bewertung. Mit L\u00f6sungsschl\u00fcsseln und Bewertungsb\u00f6gen.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Multi-R\u00e4tsel-Sammlungen', description: 'Globale Themen\u00fcberschreibung f\u00fcr saisonale Bl\u00e4tter: K\u00fcrbisse f\u00fcr Herbst, Schneeflocken f\u00fcr Winter, Blumen f\u00fcr Fr\u00fchling.', platform: 'Multi-platform' },
    { title: 'Progressives Muster-Curriculum', description: '20\u201336 Wochen: von 2-R\u00e4tsel-AB-Bl\u00e4ttern bis 8-R\u00e4tsel-komplexe Bewertungen. Vollst\u00e4ndiges Mustererkennung-Curriculum.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Wie viele R\u00e4tsel passen auf eine Seite?', answer: '1 bis 8 Muster-R\u00e4tsel pro Seite. Das Layout passt sich automatisch an. Weniger R\u00e4tsel bieten mehr Platz, mehr R\u00e4tsel maximieren die \u00dcbungsdichte.' },
    { question: 'Kann ich verschiedene Themen und Muster pro R\u00e4tsel einstellen?', answer: 'Ja. Jedes R\u00e4tsel hat eigene Einstellungen f\u00fcr Mustertyp und Thema. Oder globale Themen\u00fcberschreibung f\u00fcr einheitliches Aussehen bei verschiedenen Mustertypen.' },
    { question: 'Welche Mustertypen sind verf\u00fcgbar?', answer: 'AB, ABC, AABB, ABB und weitere. Verschiedene Typen pro R\u00e4tsel auf derselben Seite m\u00f6glich f\u00fcr vielseitige \u00dcbung.' },
    { question: 'Wie funktioniert die Nummerierung?', answer: 'Automatische sequentielle Nummerierung (1, 2, 3 usw.) f\u00fcr klare Anweisungen und einfache Korrektur.' },
    { question: 'Wie viele Bildthemen gibt es?', answer: 'Das Vollzugriff-Paket umfasst alle 104 Themen. Das Kommerzielle Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen eigene Uploads.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch erstellt?', answer: 'Ja. Passender L\u00f6sungsschl\u00fcssel mit allen Sequenzen, gleichem Layout und Thema.' },
    stdCommercialFaq(),
    stdPricingFaq('Muster-Arbeitsblatt-Generator'),
    stdTryFaq(),
    { question: 'Was ist der Unterschied zwischen Muster-Arbeitsblatt und Musterzug?', answer: 'Das Muster-Arbeitsblatt platziert 1\u20138 R\u00e4tsel auf einer Seite mit individueller Konfiguration \u2014 ideal f\u00fcr Bewertungen. Der Musterzug zeigt ein Muster im Waggon-Format mit 4\u201310 Positionen \u2014 visuell ansprechend f\u00fcr junge Lernende.' },
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien-Zeichnen-Generator' },
    { slug: 'pattern-worksheet', pageType: 'tool', anchorText: 'Muster-Arbeitsblatt-Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
    { slug: 'first-grade-printable-ideas', pageType: 'idea', anchorText: 'Erste-Klasse-Printable-Nischenideen' },
  ],
}));

// ============================================================
// draw-and-color.ts
// ============================================================
w('draw-and-color.ts', buildFile({
  appId: 'draw-and-color', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Zeichnen & Ausmalen Generator | Gitter-Zeichen\u00fcbungen Kostenlos',
    metaDescription: 'Erstellen Sie Gitter-Zeichen-Arbeitsbl\u00e4tter mit Symmetrie\u00fcbungen. 3\u201310 Zeilen und Spalten, 10\u201375% Hinweiszellen, Spiegelmodi. 104 Themen. Kostenlos mit PDF-Export.',
    primaryKeyword: 'Gitter Zeichen Arbeitsbl\u00e4tter',
    secondaryKeywords: ['Zeichnen und Ausmalen Arbeitsbl\u00e4tter','Symmetrie \u00dcbungen druckbar','Gitter-Kunst Aktivit\u00e4ten','Gitter ausf\u00fcllen Zeichen\u00fcbungen','Spiegel-Zeichnen Arbeitsbl\u00e4tter'],
    lsiKeywords: ['visuell-r\u00e4umliche F\u00e4higkeiten','Symmetrie-Kunst Aktivit\u00e4ten','Feinmotorik Arbeitsbl\u00e4tter','gitterbasierte Zeichen\u00fcbungen','r\u00e4umliches Denken Vorschule','Muster auf Gitter kopieren','Koordinaten-Kunst','visuelle Wahrnehmung Aktivit\u00e4ten'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/draw and color/grid-drawing_worksheet (1).jpeg',
      primaryAlt: 'Gitter-Zeichen-Arbeitsblatt mit farbigen Bild-Hinweisen und leeren Zellen zum Vervollst\u00e4ndigen',
      secondary: '/samples/english/draw and color/grid-drawing_worksheet (2).jpeg',
      secondaryAlt: 'Symmetrie-Zeichen\u00fcbung mit horizontalem Spiegelmodus auf einem Gitter',
    },
    sampleGallery: [
      { src: '/samples/english/draw and color/grid-drawing_worksheet (1).jpeg', alt: 'Gitter-Zeichen\u00fcbung mit Tierbildern und 50% Hinweiszellen', caption: '50% Hinweiszellen, Tierthema' },
      { src: '/samples/english/draw and color/grid-drawing_worksheet (2).jpeg', alt: 'Horizontaler Spiegel-Symmetrie Gitter-Zeichen-Arbeitsblatt', caption: 'Horizontaler Spiegelmodus' },
      { src: '/samples/english/draw and color/grid-drawing_worksheet (3).jpeg', alt: 'Vertikaler Spiegel-Symmetrie Zeichen-Arbeitsblatt mit Naturthema', caption: 'Vertikaler Spiegelmodus' },
      { src: '/samples/english/draw and color/grid-drawing_worksheet (4).jpeg', alt: 'Gro\u00dfes 10\u00d710-Gitter-Zeichen-R\u00e4tsel mit 25% Hinweisen', caption: '10\u00d710 Gitter, 25% Hinweise' },
      { src: '/samples/english/draw and color/grid-drawing_worksheet (5).jpeg', alt: 'Einfaches 3\u00d73-Gitter f\u00fcr Vorschulkinder', caption: '3\u00d73 Anf\u00e4nger-Gitter' },
      { src: '/samples/english/draw and color/grid-drawing_worksheet (6).jpeg', alt: 'Gitter-Zeichen L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigem Bild', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '1uZubAOGIkM',
    videoTitle: 'So erstellen Sie Gitter-Zeichen- und Symmetrie-Arbeitsbl\u00e4tter',
  },
  hero: {
    title: 'Zeichnen & Ausmalen Arbeitsblatt-Generator',
    tagline: 'Gitter-Zeichen-R\u00e4tsel mit Symmetriemodi, die r\u00e4umliches Denken st\u00e4rken',
    description: 'R\u00e4umliches Denken \u2014 die F\u00e4higkeit, visuelle Muster vorzustellen, zu bearbeiten und nachzubilden \u2014 sagt Erfolg in Mathematik, Naturwissenschaft und Technik voraus. Der Zeichnen & Ausmalen Generator entwickelt diese entscheidende F\u00e4higkeit durch ansprechende gitterbasierte Zeichen\u00fcbungen.\n\nJedes Arbeitsblatt zeigt ein Gitter, in dem einige Zellen Bild-Hinweise enthalten und andere leer bleiben. Sch\u00fcler studieren die sichtbaren Bilder und zeichnen oder malen die fehlenden Teile, um das Bild zu vervollst\u00e4ndigen. Sie steuern die Gittergr\u00f6\u00dfe von 3\u00d73 f\u00fcr Vorschulkinder bis 10\u00d710 f\u00fcr Fortgeschrittene und den Hinweisanteil von 10% bis 75%.\n\nDrei Spiegelmodi f\u00fcgen eine Symmetrie-Dimension hinzu. Kein Spiegel zeigt Hinweise zuf\u00e4llig im Gitter. Horizontaler Spiegel zeigt die obere H\u00e4lfte und fordert die untere. Vertikaler Spiegel zeigt die linke Seite und fordert die rechte. Beide vermitteln Symmetrie durch praktische \u00dcbung.\n\nDas teilbasierte Enth\u00fcllungssystem zeigt Bildfragmente statt vollst\u00e4ndiger Bilder in Hinweiszellen. W\u00e4hlen Sie aus 104 Themen. Canvas-Editor f\u00fcr Text, Farben, Rahmen. Export als JPEG und PDF mit automatischem L\u00f6sungsschl\u00fcssel. Kostenlos mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Gitter-Zeichen-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: 'Gitterma\u00dfe festlegen', description: 'Zeilen (3\u201310) und Spalten (3\u201310) w\u00e4hlen. Kleine Gitter wie 3\u00d73 f\u00fcr Vorschulkinder. Gro\u00dfe Gitter wie 10\u00d710 f\u00fcr \u00e4ltere Sch\u00fcler.' },
      { title: 'Hinweisanteil einstellen', description: '10% bis 75% vorgef\u00fcllte Zellen. H\u00f6here Prozents\u00e4tze als Hilfestellung f\u00fcr Anf\u00e4nger. Niedrigere f\u00fcr st\u00e4rkeres r\u00e4umliches Denken.' },
      { title: 'Spiegelmodus und Thema w\u00e4hlen', description: 'Kein Spiegel f\u00fcr zuf\u00e4llige Platzierung, Horizontal f\u00fcr Oben-Unten-Symmetrie, Vertikal f\u00fcr Links-Rechts-Symmetrie. 104 Bildthemen.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Titel, Anweisungen, Namensfelder. Hintergrundfarben, Rahmen, Zoom und Ebenensteuerung.' },
      { title: 'Exportieren und Drucken', description: 'JPEG oder PDF herunterladen. L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigem Gitter wird automatisch erstellt.' },
    ],
  },
  features: [
    { title: 'Konfigurierbares Gitter: 3\u201310 Zeilen \u00d7 3\u201310 Spalten', description: 'Zeilen und Spalten unabh\u00e4ngig einstellbar. 3\u00d73 ergibt ein einfaches 9-Zellen-R\u00e4tsel. 10\u00d710 eine 100-Zellen-Herausforderung. Automatische Skalierung.' },
    { title: 'Einstellbarer Hinweisanteil: 10\u201375%', description: 'Bei 75% ist das meiste Bild sichtbar \u2014 ideal f\u00fcr Anf\u00e4nger. Bei 10% m\u00fcssen Sch\u00fcler das Bild fast vollst\u00e4ndig rekonstruieren.' },
    { title: 'Drei Spiegelmodi f\u00fcr Symmetrie\u00fcbungen', description: 'Kein Spiegel testet r\u00e4umliches Ged\u00e4chtnis. Horizontaler Spiegel zeigt oben, fordert unten. Vertikaler Spiegel zeigt links, fordert rechts. Symmetrie durch praktische \u00dcbung.' },
    { title: 'Teilbasiertes Enth\u00fcllungssystem', description: 'Bildfragmente statt vollst\u00e4ndiger Bilder in Hinweiszellen. Sch\u00fcler interpretieren Teilinformationen \u2014 eine F\u00e4higkeit, die auf Geometrie, Kartenlesen und Beobachtung \u00fcbertragbar ist.' },
    { title: '104 illustrierte Bildthemen', description: 'Professionell gezeichnete Bilder f\u00fcr Gitterzellen. Bauernhoftiere, Meeresbewohner, Fahrzeuge, Obst und saisonale Motive.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. Vollst\u00e4ndige Kontrolle \u00fcber das Arbeitsblatt-Erscheinungsbild.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Passender L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigem Gitter. Gleiches Layout, Thema und Schriftart.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
  ],
  businessUseCases: [
    { title: 'Gitter-Zeichen-Pakete auf Etsy verkaufen', description: 'Thematische B\u00fcndel in verschiedenen Schwierigkeitsstufen: kleine Gitter mit hohem Hinweisanteil f\u00fcr Vorschule, mittlere f\u00fcr Kindergarten, gro\u00dfe mit niedrigem Hinweisanteil f\u00fcr erste Klasse.', platform: 'Etsy' },
    { title: 'Symmetrie-Aktivit\u00e4tsb\u00fccher auf Amazon KDP', description: 'Spiegel-PDFs in 50\u2013100-Seiten-B\u00fcchern. Progressive Schwierigkeit von 3\u00d73 bis 10\u00d710.', platform: 'Amazon KDP' },
    { title: 'Visuelle F\u00e4higkeiten-Pakete f\u00fcr Lehrerplattformen', description: 'Pakete f\u00fcr horizontale Symmetrie, vertikale Symmetrie und allgemeines r\u00e4umliches Denken. Mit L\u00f6sungsschl\u00fcsseln und Differenzierungshinweisen.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Gitter-Zeichen-Sammlungen', description: 'K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen zum Valentinstag, Blumen f\u00fcr Fr\u00fchling. Das Gitter-Format f\u00fchlt sich wie Kunstprojekt an.', platform: 'Multi-platform' },
    { title: 'R\u00e4umliches Denken-Curriculum', description: '20\u201336 Wochen: von 3\u00d73-Gittern bei 75% bis 10\u00d710-Gitter bei 25% mit Spiegelmodi. Vollst\u00e4ndiges Curriculum f\u00fcr r\u00e4umliche F\u00e4higkeiten.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Was ist ein Gitter-Zeichen-Arbeitsblatt?', answer: 'Ein Gitter mit Bild-Hinweisen und leeren Zellen. Sch\u00fcler studieren die Hinweise und zeichnen oder malen die fehlenden Teile. F\u00f6rdert r\u00e4umliches Denken, visuelles Ged\u00e4chtnis und Feinmotorik.' },
    { question: 'Wie funktionieren die Spiegelmodi?', answer: 'Kein Spiegel: zuf\u00e4llige Hinweisplatzierung. Horizontaler Spiegel: obere H\u00e4lfte gezeigt, untere zeichnen. Vertikaler Spiegel: linke Seite gezeigt, rechte zeichnen.' },
    { question: 'Welche Gittergr\u00f6\u00dfen sind verf\u00fcgbar?', answer: '3\u00d73 bis 10\u00d710, Zeilen und Spalten unabh\u00e4ngig einstellbar. Automatische Skalierung f\u00fcr klare Zellen.' },
    { question: 'Was steuert der Hinweisanteil?', answer: '10\u201375% bestimmt, wie viele Zellen vorgef\u00fcllt sind. Mehr Hinweise machen es leichter. Weniger Hinweise fordern st\u00e4rkeres r\u00e4umliches Denken.' },
    { question: 'Wie viele Bildthemen gibt es?', answer: 'Das Vollzugriff-Paket umfasst alle 104 Themen. Das Kommerzielle Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen eigene Uploads.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch erstellt?', answer: 'Ja. Passender L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigem Gitter, gleichem Layout und Thema.' },
    stdCommercialFaq(),
    stdPricingFaq('Zeichnen & Ausmalen Generator'),
    stdTryFaq(),
    { question: 'F\u00fcr welche Altersgruppe?', answer: '3\u20138 Jahre (Vorschule bis zweite Klasse). Kleine Gitter mit hohem Hinweisanteil f\u00fcr die J\u00fcngsten. Gro\u00dfe Gitter mit Spiegelmodi f\u00fcr \u00e4ltere Sch\u00fcler.' },
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien-Zeichnen-Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'draw-and-color', pageType: 'tool', anchorText: 'Zeichnen & Ausmalen Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-drawing-worksheets', pageType: 'guide', anchorText: 'Zeichen-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Vorschul-Printable-Nischenideen' },
  ],
}));

// ============================================================
// drawing-lines.ts
// ============================================================
w('drawing-lines.ts', buildFile({
  appId: 'drawing-lines', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Linien-Zeichnen Generator | Schreiblernlinien Kostenlos',
    metaDescription: 'Erstellen Sie Freihand-Zeichen-Arbeitsbl\u00e4tter mit Schreiblernlinien-Vorlagen. Auswahl- und Zeichenwerkzeuge, Pinselgr\u00f6\u00dfe 1\u201350px, Namensfeld. Kostenlos mit PDF-Export.',
    primaryKeyword: 'Schreiblernlinien Arbeitsbl\u00e4tter',
    secondaryKeywords: ['Schreiblernlinien Generator','Zeichen\u00fcbungen druckbar','Linien zeichnen Vorschule','Freihand-Zeichenfl\u00e4che','Schreib\u00fcbungen Bl\u00e4tter'],
    lsiKeywords: ['Feinmotorik Arbeitsbl\u00e4tter','Vor-Schreib\u00fcbungen','Stiftkontrolle \u00dcbungen','Nachspur-\u00dcbungen','Zeichenvorlagen Vorschule','Schreiblinien-F\u00fchrung','kreative Zeichen-Arbeitsbl\u00e4tter','Schreibvorbereitung Aktivit\u00e4ten'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/drawing lines/Line Drawing Practic.jpeg',
      primaryAlt: 'Linien-Zeichnen-Arbeitsblatt mit Schreiblernlinien und Freihand-Zeichenbereich',
      secondary: '/samples/english/drawing lines/Line Drawing Practice 2.jpeg',
      secondaryAlt: 'Freihand-Zeichenfl\u00e4che mit Namensfeld und Schreiblernlinien-Vorlagen',
    },
    sampleGallery: [
      { src: '/samples/english/drawing lines/Line Drawing Practic.jpeg', alt: 'Schreiblernlinien mit durchgezogenen und gestrichelten F\u00fchrungslinien', caption: 'Schreiblernlinien-F\u00fchrung' },
      { src: '/samples/english/drawing lines/Line Drawing Practice 2.jpeg', alt: 'Freihand-Zeichen-Arbeitsblatt mit Namensfeld oben', caption: 'Namensfeld aktiviert' },
      { src: '/samples/english/drawing lines/Line Drawing Practice 3.jpeg', alt: 'Zeichen\u00fcbung mit verschiedenen Linienstilen', caption: 'Verschiedene Linienstile' },
      { src: '/samples/english/drawing lines/Line Drawing Practice 4.jpeg', alt: 'Kreative Zeichenfl\u00e4che mit Pinsel-Illustrationen', caption: 'Freihand-Zeichnung' },
      { src: '/samples/english/drawing lines/Line Drawing Practice 5.jpeg', alt: 'Leeres Zeichen-Arbeitsblatt mit dicken Schreib\u00fcbungslinien', caption: 'Dicke \u00dcbungslinien' },
      { src: '/samples/english/drawing lines/Line Drawing Practice 6.jpeg', alt: 'Linien-Zeichnen-Arbeitsblatt mit Zierrahmen und Titel', caption: 'Mit Rahmen angepasst' },
    ],
    youtubeId: 'P9q3ymjFnOQ',
    videoTitle: 'So erstellen Sie Linien-Zeichnen- und Schreib\u00fcbungs-Arbeitsbl\u00e4tter',
  },
  hero: {
    title: 'Linien-Zeichnen Arbeitsblatt-Generator',
    tagline: 'Freihand-Zeichenfl\u00e4chen mit professionellen Schreiblernlinien-Vorlagen in Sekunden erstellen',
    description: 'Bevor Kinder Buchstaben und W\u00f6rter schreiben k\u00f6nnen, m\u00fcssen sie die Grundlagen beherrschen: Stift halten, Linienrichtung kontrollieren, innerhalb von Grenzen bleiben und die Feinmotorik entwickeln. Der Linien-Zeichnen Generator bietet die \u00dcbungsumgebung, in der diese grundlegenden F\u00e4higkeiten Form annehmen.\n\nDer Generator kombiniert zwei leistungsstarke Werkzeuge. Die Freihand-Zeichenfl\u00e4che erm\u00f6glicht individuelle Illustrationen, Nachspur-Demonstrationen und visuelle Anregungen direkt auf dem Arbeitsblatt. Der Zeichenpinsel von 1 bis 50 Pixel erzeugt alles von d\u00fcnnen \u00dcbungslinien bis zu fetten Zierelementen.\n\nDer Schreiblernlinien-Generator f\u00fcgt professionelle Linienvorlagen per Klick hinzu: durchgezogene Grundlinie, gestrichelte Mittellinie und optionale Oberlinie \u2014 das Drei-Linien-System, das weltweit in Schulen verwendet wird.\n\nEin optionales Namensfeld oben bietet einen Identifikationsbereich f\u00fcr Sch\u00fcler. Der Canvas-Editor kombiniert alle Werkzeuge frei. Export als JPEG oder PDF. Ob Vorschul-Schreibvorbereitung, Homeschool oder Etsy und Amazon KDP \u2014 professionelle Ergebnisse in Sekunden. Kostenlos mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Linien-Zeichnen-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: 'Werkzeuge w\u00e4hlen', description: 'Zeichenpinsel f\u00fcr Freihand-Illustration oder Auswahlwerkzeug zum Verschieben und Skalieren. Pinselgr\u00f6\u00dfe 1\u201350 Pixel.' },
      { title: 'Schreiblernlinien hinzuf\u00fcgen', description: 'Professionelle Linienvorlagen: durchgezogene Grundlinie, gestrichelte Mittellinie, optionale Oberlinie. Zeilenanzahl f\u00fcr Abstand einstellen.' },
      { title: 'Namensfeld aktivieren', description: 'Sch\u00fcler-Namensfeld oben mit professioneller Formatierung wie die Schreiblernlinien.' },
      { title: 'Zeichnen und Anpassen', description: 'Freihand-Illustrationen, visuelle Anregungen, Zierelemente. Pinselfarbe, Text, Rahmen, Zoom und Ebenensteuerung.' },
      { title: 'Exportieren und Drucken', description: 'JPEG oder PDF herunterladen. Sofort druckfertig f\u00fcr Klassenzimmer oder digitale Produkte.' },
    ],
  },
  features: [
    { title: 'Freihand-Zeichenfl\u00e4che', description: 'Direkt auf dem Arbeitsblatt zeichnen. Illustrationen, visuelle Anregungen, Nachspur-Demonstrationen oder Zierelemente. Druckqualit\u00e4t bei voller Aufl\u00f6sung.' },
    { title: 'Zeichenpinsel mit 1\u201350px', description: 'Von feinen 1-Pixel-Linien bis zu fetten 50-Pixel-Strichen. D\u00fcnne Einstellungen f\u00fcr pr\u00e4zise \u00dcbungslinien, dicke f\u00fcr \u00dcberschriften und Zierelemente. Beliebige Pinselfarbe.' },
    { title: 'Auswahl- und Zeichenwerkzeuge', description: 'Zeichenpinsel f\u00fcr neue Elemente und Auswahlwerkzeug zum Verschieben und Skalieren. Erst zeichnen, dann arrangieren.' },
    { title: 'Schreiblernlinien-Generator', description: 'Professionelle Drei-Linien-F\u00fchrung: Grundlinie, gestrichelte Mittellinie, optionale Oberlinie. Zeilenanzahl f\u00fcr altersgerechten Abstand.' },
    { title: 'Sch\u00fcler-Namensfeld', description: 'Formatiertes Namensfeld oben im Arbeitsblatt. Professioneller Stil wie die Schreiblernlinien. Ein-/Ausschaltbar.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. R\u00fcckg\u00e4ngig und Wiederholen jederzeit verf\u00fcgbar.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
    { title: '7 professionelle Schriftarten', description: 'Von abgerundeten Buchstaben f\u00fcr Vorschulkinder bis zu klaren Stilen f\u00fcr \u00e4ltere Sch\u00fcler. Gestochen scharf in beiden Formaten.' },
  ],
  businessUseCases: [
    { title: 'Schreib\u00fcbungs-Pakete auf Etsy verkaufen', description: 'Thematische B\u00fcndel mit Zeichen-Anregungen: \u201eMale ein Tier, dann schreibe dar\u00fcber.\u201c Freihand-Bereiche mit Schreiblernlinien kombinieren.', platform: 'Etsy' },
    { title: 'Vor-Schreib-Aktivit\u00e4tsb\u00fccher auf Amazon KDP', description: 'Zeichen- und Linien-PDFs in 50\u2013100-Seiten-B\u00fcchern. Progressive Schwierigkeit von breiten zu standardm\u00e4\u00dfigen Linienabst\u00e4nden.', platform: 'Amazon KDP' },
    { title: 'Schreibvorbereitung f\u00fcr Lehrerplattformen', description: 'Pakete nach F\u00e4higkeit: Stiftkontrolle, Liniennachfahren, Freihand-Zeichnen mit Schreibanregungen.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Zeichen- und Schreib-Sets', description: 'Feiertagsthemen: \u201eMale einen Schneemann und schreibe 3 W\u00f6rter \u00fcber Winter.\u201c Saisonale Zeichen-Anregungen mit Schreiblernlinien.', platform: 'Multi-platform' },
    { title: 'Feinmotorik-Curriculum', description: '20\u201336 Wochen: von breiten Linien mit einfachen Anregungen bis zu Standardlinien mit detaillierten Schreibaufgaben.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Welche Werkzeuge bietet der Generator?', answer: 'Freihand-Zeichenpinsel (1\u201350px, beliebige Farbe), Auswahlwerkzeug zum Verschieben und Skalieren, Schreiblernlinien-Generator und optionales Sch\u00fcler-Namensfeld. Alle auf einer Zeichenfl\u00e4che.' },
    { question: 'Wie funktioniert der Schreiblernlinien-Generator?', answer: 'Professionelle Drei-Linien-F\u00fchrung: Grundlinie, gestrichelte Mittellinie, optionale Oberlinie. Zeilenanzahl f\u00fcr altersgerechten Abstand.' },
    { question: 'Kann ich direkt auf dem Arbeitsblatt illustrieren?', answer: 'Ja. Freihand-Zeichenpinsel f\u00fcr beliebige Illustrationen, Nachspur-Demonstrationen und Zierelemente. Volle Aufl\u00f6sung f\u00fcr Druckqualit\u00e4t.' },
    { question: 'Wof\u00fcr ist das Namensfeld?', answer: 'Optionales formatiertes Sch\u00fcler-Identifikationsfeld oben. Professioneller Stil wie die Schreiblernlinien. F\u00fcr Klassenzimmer ein-/ausschaltbar.' },
    { question: 'Welche Pinselgr\u00f6\u00dfen gibt es?', answer: '1 Pixel (feine Details) bis 50 Pixel (fette Striche). Beliebige Pinselfarbe. F\u00fcr alles von pr\u00e4zisen \u00dcbungslinien bis zu dicken Zierr\u00e4ndern.' },
    { question: 'Welche Seitengr\u00f6\u00dfen werden unterst\u00fctzt?', answer: 'US Letter (8,5 \u00d7 11 Zoll), A4 oder individuelle Ma\u00dfe. Hoch- und Querformat. Export als JPEG und PDF.' },
    stdCommercialFaq(),
    stdPricingFaq('Linien-Zeichnen Generator'),
    stdTryFaq(),
    stdLangFaq(true),
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'drawing-lines', pageType: 'tool', anchorText: 'Linien-Zeichnen Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-handwriting-sheets', pageType: 'guide', anchorText: 'Schreib\u00fcbungs-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'homeschool-printable-ideas', pageType: 'idea', anchorText: 'Homeschool-Printable-Nischenideen' },
  ],
}));

// ============================================================
// coloring.ts
// ============================================================
w('coloring.ts', buildFile({
  appId: 'coloring', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Ausmalseiten-Generator | Malvorlagen Erstellen Kostenlos',
    metaDescription: 'Erstellen Sie Ausmalseiten mit Zeichenvorlagen und Auto-F\u00fcllung. Zeichen- und Auswahlwerkzeuge, Pinselfarbe und -breite, Vorlagenbibliothek. Kostenlos mit PDF-Export.',
    primaryKeyword: 'Ausmalseiten Generator',
    secondaryKeywords: ['Malvorlagen druckbar','Ausmalseiten Ersteller','Malvorlagen selbst erstellen','druckbare Ausmalseiten','Malbuch-Seiten Generator'],
    lsiKeywords: ['Ausmalen Aktivit\u00e4ten Vorschule','Feinmotorik Aktivit\u00e4ten','kreative Kunst Arbeitsbl\u00e4tter','Zeichenvorlagen Kinder','Handausmalen Arbeitsbl\u00e4tter','Kunst Aktivit\u00e4ten Kindergarten','druckbare Kunstseiten','Malbuch Vorlagen'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/coloring/Coloring Page 1.jpeg',
      primaryAlt: 'Ausmalseite mit detaillierter Zeichenvorlage zum Ausmalen',
      secondary: '/samples/english/coloring/Coloring Page 2.jpeg',
      secondaryAlt: 'Ausmal-Arbeitsblatt mit vorlagenbasierter Kontur und Zierrahmen',
    },
    sampleGallery: [
      { src: '/samples/english/coloring/Coloring Page 1.jpeg', alt: 'Ausmalseite mit Tier-Zeichenvorlage und dicken Konturen', caption: 'Tier-Vorlage Ausmalseite' },
      { src: '/samples/english/coloring/Coloring Page 2.jpeg', alt: 'Ausmal-Arbeitsblatt mit Naturszene-Vorlage', caption: 'Naturszene-Vorlage' },
      { src: '/samples/english/coloring/Coloring Page 3.jpeg', alt: 'Einfache Ausmalseite mit fetten Konturen f\u00fcr kleine Kinder', caption: 'Fette Konturen f\u00fcr Anf\u00e4nger' },
      { src: '/samples/english/coloring/Coloring Page 4.jpeg', alt: 'Ausmalseite mit Auto-F\u00fcllung-Demonstration', caption: 'Auto-F\u00fcllung Demonstration' },
      { src: '/samples/english/coloring/Coloring Page 5.jpeg', alt: 'Detaillierte Ausmalvorlage mit feinen Linien f\u00fcr \u00e4ltere Kinder', caption: 'Detaillierte Vorlage f\u00fcr \u00c4ltere' },
      { src: '/samples/english/coloring/Coloring Page 6.jpeg', alt: 'Ausmalseite mit individuellem Titel und Zierrahmen', caption: 'Individueller Titel und Rahmen' },
    ],
    youtubeId: 'ZdpCr2txHcc',
    videoTitle: 'So erstellen Sie individuelle Ausmalseiten',
  },
  hero: {
    title: 'Ausmalseiten-Generator',
    tagline: 'Individuelle Ausmalseiten mit Zeichenvorlagen, Auto-F\u00fcllung und professionellen Export-Tools',
    description: 'Ausmalseiten geh\u00f6ren zu den beliebtesten druckbaren Produkten \u2014 Etsy, Amazon KDP, Teachers Pay Teachers und dar\u00fcber hinaus. Eltern kaufen sie f\u00fcr ruhige Besch\u00e4ftigung, Lehrer nutzen sie als Belohnung und Feinmotorik\u00fcbung. Der Ausmalseiten-Generator bietet professionelle Werkzeuge ohne Grafikdesign-Software.\n\nStarten Sie mit der integrierten Vorlagenbibliothek: fertige Konturdesigns von einfachen fetten Formen f\u00fcr Kleinkinder bis zu detaillierten Szenen f\u00fcr \u00e4ltere Kinder. Klare schwarze Linien auf wei\u00dfem Hintergrund.\n\nZeichen- und Auswahlwerkzeuge erm\u00f6glichen Anpassung oder komplette Eigenkreationen. Der Zeichenpinsel bietet einstellbare Farbe und Breite. Auto-F\u00fcllung f\u00fcllt geschlossene Bereiche per Klick.\n\nCanvas-Editor mit Titel, Rahmen, Hintergrundfarben, Zoom und Ebenen. Export als JPEG und PDF. Ob Vorschulklasse, Feiertagspakete f\u00fcr Etsy oder Malb\u00fccher f\u00fcr Amazon KDP \u2014 professionelle Ergebnisse in Minuten. Kostenlos mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihre Ausmalseite in 5 Schritten',
    steps: [
      { title: 'Vorlagenbibliothek durchsuchen', description: 'Fertige Konturdesigns von einfachen Formen bis zu detaillierten Szenen. Klare schwarze Linien zum Ausmalen.' },
      { title: 'Mit Zeichenwerkzeugen anpassen', description: 'Zeichenpinsel f\u00fcr Details, Anpassungen oder komplett neue Elemente. Pinselfarbe und -breite einstellbar.' },
      { title: 'Auto-F\u00fcllung und Farben anwenden', description: 'Geschlossene Bereiche per Klick f\u00fcllen. F\u00fcr Beispielseiten oder teilweise ausgef\u00fcllte Arbeitsbl\u00e4tter.' },
      { title: 'Text und Rahmen hinzuf\u00fcgen', description: 'Individuelle Titel, \u00dcberschriften oder Namensfelder. Zierrahmen, Hintergrundfarben, Zoom und Ebenensteuerung.' },
      { title: 'Exportieren und Drucken', description: 'JPEG oder PDF herunterladen. Optimiert f\u00fcr sauberen Druck mit scharfen Linien.' },
    ],
  },
  features: [
    { title: 'Zeichenvorlagen-Bibliothek', description: 'Fertige Konturdesigns in verschiedenen Komplexit\u00e4tsstufen. Einfache fette Formen f\u00fcr Kleinkinder, detaillierte Szenen f\u00fcr \u00e4ltere Kinder. Klare schwarze Linien auf Wei\u00df.' },
    { title: 'Zeichen- und Auswahlwerkzeuge', description: 'Zeichenpinsel f\u00fcr Freihand-Linien und Konturen. Auswahlwerkzeug zum Verschieben und Skalieren.' },
    { title: 'Einstellbare Pinselfarbe und -breite', description: 'Beliebige Farbe und Breite. Schwarze Konturen auf Wei\u00df f\u00fcr Standard-Ausmalseiten.' },
    { title: 'Auto-F\u00fcllung', description: 'Geschlossene Bereiche per Klick mit Farbe f\u00fcllen. F\u00fcr Beispielseiten oder teilweise ausgef\u00fcllte Arbeitsbl\u00e4tter.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom. R\u00fcckg\u00e4ngig und Wiederholen.' },
    { title: 'Individuelle Text- und Titelfelder', description: 'Titel wie \u201eMeine Ausmalseite\u201c, thematische \u00dcberschriften oder Namensfelder. Beliebige Positionierung.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr scharfen Druck, KDP-Innenteile und Malbuch-Zusammenstellungen.' },
    { title: '7 professionelle Schriftarten', description: 'Spielerische Rundschriften f\u00fcr Kinderseiten und klare Stile f\u00fcr professionelle Produkte.' },
  ],
  businessUseCases: [
    { title: 'Thematische Ausmalpakete auf Etsy verkaufen', description: '10 Tier-, 10 Natur-, 10 Fahrzeugseiten als Sofort-Download.', platform: 'Etsy' },
    { title: 'Malb\u00fccher auf Amazon KDP', description: 'PDF-Ausmalseiten in 30\u2013100-Seiten-B\u00fcchern. Einfache und detaillierte Seiten f\u00fcr breite Altersspanne.', platform: 'Amazon KDP' },
    { title: 'Kunst-Aktivit\u00e4ten f\u00fcr Lehrerplattformen', description: 'Ausmalseiten passend zu Unterrichtsthemen: Naturwissenschaft, Sachkunde, Feiertage.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Ausmalsammlungen', description: 'K\u00fcrbisse f\u00fcr Halloween, Weihnachtsb\u00e4ume, Osterhasen, Fr\u00fchlingsblumen.', platform: 'Multi-platform' },
    { title: 'Ausmal-Mega-Paket', description: '200+ Ausmalseiten als Premium-Paket oder monatlich neue thematische Sets.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Was ist die Zeichenvorlagen-Bibliothek?', answer: 'Fertige Konturdesigns als Basis f\u00fcr Ausmalseiten. Von einfachen Formen bis zu detaillierten Szenen. Klare schwarze Linien auf Wei\u00df.' },
    { question: 'Kann ich Ausmalseiten von Grund auf erstellen?', answer: 'Ja. Zeichenpinsel f\u00fcr beliebige Konturen und Details. Bestehende Vorlagen \u00fcberzeichnen ist auch m\u00f6glich.' },
    { question: 'Was macht die Auto-F\u00fcllung?', answer: 'Geschlossene Bereiche per Klick mit Farbe f\u00fcllen. F\u00fcr Beispielseiten oder teilweise ausgef\u00fcllte Arbeitsbl\u00e4tter.' },
    { question: 'Welche Exportformate gibt es?', answer: 'JPEG und PDF in hoher Aufl\u00f6sung. JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr scharfen Druck und KDP-Innenteile.' },
    { question: 'Kann ich Text und Titel hinzuf\u00fcgen?', answer: 'Ja. Individuelle Titel, \u00dcberschriften, Namensfelder. Beliebige Positionierung, 7 Schriftarten.' },
    { question: 'Welche Seitengr\u00f6\u00dfen?', answer: 'US Letter (8,5 \u00d7 11 Zoll), A4 oder individuelle Ma\u00dfe. Hoch- und Querformat.' },
    stdCommercialFaq(),
    stdPricingFaq('Ausmalseiten-Generator'),
    stdTryFaq(),
    stdLangFaq(true),
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien-Zeichnen-Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen' },
    { slug: 'coloring', pageType: 'tool', anchorText: 'Ausmalseiten-Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-coloring-pages', pageType: 'guide', anchorText: 'Ausmalseiten erstellen, die sich verkaufen' },
    { slug: 'digital-download-printable-ideas', pageType: 'idea', anchorText: 'Digitaler Download Gesch\u00e4ftsideen' },
  ],
}));

// ============================================================
// chart-count.ts
// ============================================================
w('chart-count.ts', buildFile({
  appId: 'chart-count', locale: 'de', category: 'visual',
  seo: {
    titleTag: 'Diagramm Z\u00e4hlen & Ausmalen Generator | Grafik-Arbeitsbl\u00e4tter Kostenlos',
    metaDescription: 'Erstellen Sie Grafik- und Z\u00e4hl-Arbeitsbl\u00e4tter mit bildbasierten \u00dcbungen. Manuelle oder themenbasierte Bildauswahl, 6 Bilder pro \u00dcbung. Kostenlos mit PDF-Export.',
    primaryKeyword: 'Grafik Arbeitsbl\u00e4tter Generator',
    secondaryKeywords: ['Diagramm Z\u00e4hlen Arbeitsbl\u00e4tter','Bildgrafik Arbeitsbl\u00e4tter druckbar','Z\u00e4hl-Arbeitsbl\u00e4tter mit Bildern','Grafik Aktivit\u00e4ten Vorschule','Strichlisten Arbeitsbl\u00e4tter'],
    lsiKeywords: ['Datenverarbeitung Arbeitsbl\u00e4tter','Piktogramm Arbeitsbl\u00e4tter Kindergarten','Z\u00e4hlen und Grafik Aktivit\u00e4ten','visuelle Mathe Arbeitsbl\u00e4tter','Balkendiagramm Arbeitsbl\u00e4tter','Mathe Datensammlung','Bild-Z\u00e4hl\u00fcbungen','fr\u00fche Statistik Arbeitsbl\u00e4tter'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/chart count/Picture Graph 1.jpeg',
      primaryAlt: 'Diagramm-Z\u00e4hlen-Arbeitsblatt mit farbenfrohen Bildern f\u00fcr Grafik- und Z\u00e4hl\u00fcbungen',
      secondary: '/samples/english/chart count/Picture Graph 2.jpeg',
      secondaryAlt: 'Piktogramm-Arbeitsblatt mit themenbasierten Bildern und Z\u00e4hlanzeigen',
    },
    sampleGallery: [
      { src: '/samples/english/chart count/Picture Graph 1.jpeg', alt: 'Bildgrafik-Arbeitsblatt mit Tierbildern', caption: 'Tierthema Bildgrafik' },
      { src: '/samples/english/chart count/Picture Graph 2.jpeg', alt: 'Diagramm-Z\u00e4hlen mit Lebensmittelbildern', caption: 'Lebensmittelthema Z\u00e4hl\u00fcbung' },
      { src: '/samples/english/chart count/Picture Graph 3.jpeg', alt: 'Grafik-Arbeitsblatt mit 6 Fahrzeugbildern pro \u00dcbung', caption: '6 Bilder pro \u00dcbung' },
      { src: '/samples/english/chart count/Picture Graph 4.jpeg', alt: 'Themenbasierte Voreinstellung mit Naturbildern', caption: 'Themenbasierte Voreinstellung' },
      { src: '/samples/english/chart count/Picture Graph 5.jpeg', alt: 'Manuelle Bildauswahl mit gemischten Motiven', caption: 'Manuelle Bildauswahl' },
      { src: '/samples/english/chart count/Picture Graph 6.jpeg', alt: 'L\u00f6sungsschl\u00fcssel mit korrekten Z\u00e4hlergebnissen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'So erstellen Sie Diagramm-Z\u00e4hlen- und Grafik-Arbeitsbl\u00e4tter',
  },
  hero: {
    title: 'Diagramm Z\u00e4hlen & Ausmalen Generator',
    tagline: 'Bildgrafik- und Z\u00e4hl\u00fcbungen mit bildbasierten Daten, die junge Lernende sehen und anfassen k\u00f6nnen',
    description: 'Datenverarbeitung und Grafiken geh\u00f6ren zu den praktischsten Mathe-F\u00e4higkeiten, aber traditionelle Balkendiagramme bedeuten einem Vierj\u00e4hrigen nichts. Der Diagramm Z\u00e4hlen & Ausmalen Generator \u00fcberbr\u00fcckt diese L\u00fccke mit farbenfrohen Bildern aus 104 Themen als Daten zum Z\u00e4hlen, Sortieren und grafischen Darstellen.\n\nJede \u00dcbung pr\u00e4sentiert eine Bildsammlung: Wie viele Katzen? Wie viele Hunde? Sch\u00fcler z\u00e4hlen, notieren und vervollst\u00e4ndigen eine einfache Bildgrafik. Dieser visuelle Ansatz macht abstrakte Konzepte greifbar.\n\nZwei Bildauswahlmodi: Themenbasierte Voreinstellungen oder manuelle Auswahl f\u00fcr gezielte \u00dcbungen. 6 Bilder pro \u00dcbung, optimiert f\u00fcr Kindergarten und erste Klasse. Visueller Z\u00e4hlindikator, Canvas-Editor, automatischer L\u00f6sungsschl\u00fcssel. Export als JPEG und PDF. Kostenlos mit Wasserzeichen \u2014 jetzt testen.',
  },
  howItWorks: {
    title: 'Erstellen Sie Ihr Diagramm-Z\u00e4hlen-Arbeitsblatt in 5 Schritten',
    steps: [
      { title: 'Bildauswahlmodus w\u00e4hlen', description: 'Themenbasierte Voreinstellungen oder manuelle Auswahl aus 104 Kategorien.' },
      { title: '\u00dcbung konfigurieren', description: '6 Bilder pro \u00dcbung. Ausgewogene Mischung f\u00fcr z\u00e4hlbare Mengen.' },
      { title: 'Layout und Schriftart w\u00e4hlen', description: 'Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart aus 7 Optionen.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Titel, Namensfelder, Z\u00e4hlanweisungen. Hintergrundfarben, Rahmen, Zoom.' },
      { title: 'Exportieren und Drucken', description: 'JPEG oder PDF. L\u00f6sungsschl\u00fcssel mit korrekten Z\u00e4hlergebnissen automatisch.' },
    ],
  },
  features: [
    { title: 'Themenbasierte oder manuelle Bildauswahl', description: 'Themen-Voreinstellungen f\u00fcr schnelle, konsistente \u00dcbungen. Manuelle Auswahl f\u00fcr Lehrplan-\u00dcbungen.' },
    { title: 'Z\u00e4hlbasierte Auswahl mit 6 Bildern', description: '6 Bilder pro \u00dcbung \u2014 optimiert f\u00fcr kognitive Belastung von Kindergarten und erster Klasse.' },
    { title: 'Visueller Z\u00e4hlindikator', description: 'Eingebauter Indikator f\u00fcr Z\u00e4hlfortschritt. Reduziert Fehler und baut Selbstvertrauen auf.' },
    { title: '104 illustrierte Bildthemen', description: 'Bauernhoftiere, Meeresbewohner, Fahrzeuge, Obst, Sportger\u00e4te und saisonale Motive.' },
    { title: 'Canvas-Editor mit Ebenensteuerung', description: 'Text, Hintergrund, Rahmen, Ausrichtung, Ebenenreihenfolge und Zoom.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Korrekte Z\u00e4hlergebnisse f\u00fcr jede Bildkategorie. Gleiches Layout und Thema.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr professionellen Druck und KDP-Innenteile.' },
    { title: '7 professionelle Schriftarten', description: 'Von abgerundeten Buchstaben bis zu klaren Stilen. Gestochen scharf in beiden Formaten.' },
  ],
  businessUseCases: [
    { title: 'Grafik-Aktivit\u00e4tspakete auf Etsy', description: 'Thematische B\u00fcndel: Tier-, Lebensmittel-, Fahrzeug-Grafik-Arbeitsbl\u00e4tter als Sofort-Download.', platform: 'Etsy' },
    { title: 'Datenverarbeitungs-B\u00fccher auf Amazon KDP', description: 'PDF-Arbeitsbl\u00e4tter in 50\u2013100-Seiten-B\u00fcchern mit progressiven \u00dcbungen.', platform: 'Amazon KDP' },
    { title: 'Mathe-Daten-Pakete f\u00fcr Lehrerplattformen', description: 'Z\u00e4hlen, Bildgrafiken, einfache Balkendiagramme. Mit L\u00f6sungsschl\u00fcsseln.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Z\u00e4hl- und Grafik-Sets', description: '\u201eZ\u00e4hle die K\u00fcrbisse\u201c f\u00fcr Halloween, \u201eGrafik der Schneeflocken\u201c f\u00fcr Winter.', platform: 'Multi-platform' },
    { title: 'Fr\u00fche Datenkompetenz-Curriculum', description: 'Von Bild-Z\u00e4hlen \u00fcber Bildgrafiken bis Multi-Kategorie-Diagramme. 20\u201336 Wochen.', platform: 'Gumroad' },
  ],
  faq: [
    { question: 'Was ist ein Diagramm-Z\u00e4hlen-Arbeitsblatt?', answer: 'Bildsammlung zum Z\u00e4hlen und Eintragen in eine einfache Bildgrafik. Visueller Ansatz macht Datenverarbeitung greifbar.' },
    { question: 'Wie funktioniert die Bildauswahl?', answer: 'Themenbasierte Voreinstellungen oder manuelle Auswahl aus 104 Kategorien.' },
    { question: 'Warum 6 Bilder pro \u00dcbung?', answer: 'Optimiert f\u00fcr kognitive Belastung von Kindergarten und erster Klasse.' },
    { question: 'Was ist der visuelle Z\u00e4hlindikator?', answer: 'Eingebautes Tracking-Element f\u00fcr Z\u00e4hlfortschritt. Reduziert Fehler.' },
    { question: 'Wie viele Bildthemen gibt es?', answer: 'Vollzugriff: alle 104. Kommerziell: beliebte Themen. Beide mit eigenen Uploads.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel erstellt?', answer: 'Ja. Korrekte Z\u00e4hlergebnisse f\u00fcr jede Kategorie.' },
    stdCommercialFaq(),
    stdPricingFaq('Diagramm Z\u00e4hlen & Ausmalen Generator'),
    stdTryFaq(),
    { question: 'F\u00fcr welche Altersgruppe?', answer: '4\u20137 Jahre (Vorschule bis erste Klasse). Bildbasierter Ansatz f\u00fcr Z\u00e4hlanf\u00e4nger.' },
    stdLimitFaq(),
    stdRefundFaq(),
  ],
  internalLinks: [
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Musterzug-Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt-Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichnen & Ausmalen Generator' },
    { slug: 'addition', pageType: 'app', anchorText: 'Additions-Arbeitsblatt-Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalseiten-Generator' },
    { slug: 'chart-count', pageType: 'tool', anchorText: 'Diagramm Z\u00e4hlen Generator kostenlos testen' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket \u2014 Alle visuellen Generatoren' },
    { slug: 'create-counting-worksheets', pageType: 'guide', anchorText: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten-Printable-Nischenideen' },
  ],
}));

console.log('\nBatch 2 complete: pattern-train, pattern-worksheet, draw-and-color, drawing-lines, coloring, chart-count');
