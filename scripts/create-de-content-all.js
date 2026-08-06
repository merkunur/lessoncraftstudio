const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(name, content) {
  fs.writeFileSync(path.join(dir, name), content);
  console.log('Created ' + name);
}

// ============================================================
// 2. subtraction.ts
// ============================================================
writeFile('subtraction.ts', `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'subtraction',
  locale: 'de',
  category: 'math',

  seo: {
    titleTag: 'Subtraktions-Arbeitsbl\u00e4tter Generator | Mathe \u00dcbungen Gratis',
    metaDescription: 'Erstellen Sie Subtraktions-Arbeitsbl\u00e4tter mit Durchstreich-Bildern in Sekunden. 4 \u00dcbungsmodi, 104 Themen, L\u00f6sungsschl\u00fcssel. Kostenloser Generator f\u00fcr Lehrer und Verk\u00e4ufer.',
    primaryKeyword: 'Subtraktions-Arbeitsbl\u00e4tter Generator',
    secondaryKeywords: [
      'Subtraktion Arbeitsbl\u00e4tter mit Bildern',
      'Durchstreichen Subtraktion \u00dcbungen',
      'druckbare Subtraktions\u00fcbungen',
      'visuelle Subtraktion Grundschule',
      'Minus Rechnen Arbeitsbl\u00e4tter',
    ],
    lsiKeywords: [
      'Wegnehmen Arbeitsbl\u00e4tter',
      'Vorschule Subtraktion',
      '1. Klasse Subtraktion',
      'R\u00fcckw\u00e4rts z\u00e4hlen \u00dcbungen',
      'Subtraktion mit Bildern',
      'Minus-Aufgaben Arbeitsbl\u00e4tter',
      'Kopfrechnen Subtraktion',
      'Bilder Subtraktion Aufgaben',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
      primaryAlt: 'Subtraktions-Arbeitsblatt mit durchgestrichenen Tierbildern f\u00fcr visuelle Wegnehm-Aufgaben',
      secondary: '/samples/english/subtraction/Subtraction Fun 2.jpeg',
      secondaryAlt: 'Subtraktions-Arbeitsblatt mit Lebensmittel-Thema im Durchstreich-Modus',
    },
    sampleGallery: [
      { src: '/samples/english/subtraction/Subtraction Fun 3.jpeg', alt: 'Durchstreich-Subtraktion mit Fahrzeugbildern und X-Markierungen', caption: 'Durchstreich-Modus mit X-Zeichen' },
      { src: '/samples/english/subtraction/Subtraction Fun 4.jpeg', alt: 'Bild-Zahl Subtraktions-Arbeitsblatt mit Bildern und Ziffern', caption: 'Bild-Zahl Mischmodus' },
      { src: '/samples/english/subtraction/Subtraction Fun 5.jpeg', alt: 'Finde den Subtrahenden: Arbeitsblatt mit Naturbildern', caption: 'Finde den fehlenden Subtrahenden' },
      { src: '/samples/english/subtraction/Subtraction Fun 6.jpeg', alt: 'Subtraktions-Arbeitsblatt im Querformat mit Weltraum-Thema', caption: 'Querformat mit Rahmen' },
      { src: '/samples/english/subtraction/Subtraction Fun 7.jpeg', alt: 'Gemischter Modus Subtraktions-Arbeitsblatt', caption: 'Gemischter Modus f\u00fcr Tests' },
      { src: '/samples/english/subtraction/Subtraction Fun 8.jpeg', alt: 'Subtraktions-Arbeitsblatt L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'til2mrWMUxk',
    videoTitle: 'So erstellen Sie Subtraktions-Arbeitsbl\u00e4tter mit Durchstreich-Bildern',
  },

  hero: {
    title: 'Subtraktions-Arbeitsblatt Generator',
    tagline: 'Visuelles Durchstreichen, das \\u201eWegnehmen\\u201c f\u00fcr jeden Lernenden begreifbar macht',
    description: \`Subtraktion ist das erste Mathekonzept, bei dem Kinder an eine Wand sto\\u00dfen. Addieren f\u00fchlt sich nat\u00fcrlich an \\u2014 man bekommt mehr. Wegnehmen f\u00fchlt sich abstrakt an, bis man es sehen kann. Der Subtraktions-Arbeitsblatt Generator l\u00f6st dieses Problem mit einem Durchstreich-Modus, der fette X-Markierungen durch die subtrahierten Bilder zeichnet und Sch\u00fclern genau zeigt, was \\u201eWegnehmen\\u201c auf dem Papier bedeutet.

Vier \\u00dcbungsmodi decken jede Stufe der Subtraktionsbeherrschung ab. Der Durchstreich-Modus zeigt eine Gruppe von Bildern und markiert X-Zeichen durch die weggenommenen \\u2014 die Rechenoperation wird physisch sichtbar. Der Bild \\u2013 Zahl Modus verbindet Bilder mit Ziffern. Finde den Subtrahenden fordert Sch\u00fcler heraus, herauszufinden, wie viele weggenommen wurden. Der gemischte Modus kombiniert alle drei f\u00fcr umfassende Tests.

Stellen Sie den maximalen Minuenden von 2 bis 20 ein, und der Generator berechnet automatisch g\u00fcltige Subtrahenden-Bereiche. W\u00e4hlen Sie aus 104 Bildthemen \\u2014 Tiere, Lebensmittel, Fahrzeuge, saisonale Motive \\u2014 um Mathe\u00fcbungen mit Unterrichtsthemen zu verkn\u00fcpfen. Sieben Schriftarten, einstellbare Seitengr\u00f6\\u00dfen und der Canvas-Editor erm\u00f6glichen individuelles Design.

Jeder Export enth\u00e4lt Arbeitsblatt und passenden L\u00f6sungsschl\u00fcssel als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Ein Graustufen-Schalter erzeugt tintenfreundliche Versionen. Testen Sie den Generator jetzt kostenlos \\u2014 alle Funktionen verf\u00fcgbar, nur mit Wasserzeichen.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie Ihr Subtraktions-Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'W\u00e4hlen Sie den \\u00dcbungsmodus',
        description: 'W\u00e4hlen Sie Durchstreichen f\u00fcr X-Markierungen durch subtrahierte Bilder \\u2014 die visuellste Art, Wegnehmen zu lehren. Oder w\u00e4hlen Sie Bild \\u2013 Zahl, Finde den Subtrahenden oder Gemischt f\u00fcr verschiedene Anforderungen.',
      },
      {
        title: 'Legen Sie den Zahlenbereich fest',
        description: 'Passen Sie den maximalen Minuenden von 2 bis 20 an. Der Generator begrenzt Subtrahenden automatisch, sodass jede Aufgabe ein nicht-negatives Ergebnis hat. Minuend 5 f\u00fcr Anf\u00e4nger, 10 f\u00fcr Vorschule, 20 f\u00fcr 1. Klasse.',
      },
      {
        title: 'W\u00e4hlen Sie Thema und Format',
        description: 'Durchsuchen Sie 104 Bildthemen nach Kategorie: Tiere, Fahrzeuge, Lebensmittel, Natur, Sport und mehr. W\u00e4hlen Sie Seitengr\u00f6\\u00dfe (Letter, A4), Hoch- oder Querformat, Aufgabenanzahl und Schriftart.',
      },
      {
        title: 'Verfeinern im Canvas-Editor',
        description: 'F\u00fcgen Sie eigene Titel, Anweisungen oder Namensfelder als Text-Overlays hinzu. \\u00c4ndern Sie Seiten- und Hintergrundfarben, wenden Sie Rahmen an, positionieren Sie Elemente per Drag-and-Drop mit Ausrichtungs- und Ebenenwerkzeugen.',
      },
      {
        title: 'Arbeitsblatt und L\u00f6sung exportieren',
        description: 'Laden Sie Arbeitsblatt und passenden L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Schalten Sie Graustufen f\u00fcr tintenfreundliche Schwarz-Wei\\u00df-Versionen ein. Beide Dateien sind druckfertig.',
      },
    ],
  },

  features: [
    {
      title: 'Durchstreich-Modus mit visuellen X-Markierungen',
      description: 'Das Alleinstellungsmerkmal dieses Generators. Der Durchstreich-Modus zeigt den vollst\u00e4ndigen Minuenden als Bilder und zeichnet dann fette X-Markierungen durch die subtrahierte Menge. Sch\u00fcler k\u00f6nnen genau sehen, welche Elemente \\u201eweggenommen\\u201c werden \\u2014 abstrakte Subtraktion wird greifbar und visuell.',
    },
    {
      title: 'Vier \\u00dcbungsmodi f\u00fcr stufenweises Lernen',
      description: 'Durchstreichen f\u00fcr visuelle Lerner. Bild \\u2013 Zahl verbindet Bilder mit Ziffern. Finde den Subtrahenden f\u00f6rdert fr\u00fches algebraisches Denken. Gemischt pr\u00fcft alle F\u00e4higkeiten in einem Arbeitsblatt. Wechseln Sie zwischen Modi f\u00fcr Differenzierung oder progressive Schwierigkeit.',
    },
    {
      title: 'Intelligente Minuend- und Subtrahend-Steuerung',
      description: 'Stellen Sie den maximalen Minuenden von 2 bis 20 ein, und der Generator stellt sicher, dass jeder Subtrahend g\u00fcltig ist. Keine negativen Ergebnisse, keine unm\u00f6glichen Aufgaben. Standard 10 f\u00fcr Vorschule, 20 f\u00fcr 1. Klasse, 5 f\u00fcr absolute Anf\u00e4nger.',
    },
    {
      title: '104 illustrierte Bildthemen',
      description: 'Jedes Thema bietet klare, kindgerechte Illustrationen f\u00fcr Subtraktionsaufgaben. Tiere, Fahrzeuge, Lebensmittel, Sport, Musikinstrumente, saisonale Motive und mehr halten Sch\u00fcler motiviert und verbinden Mathe mit anderen F\u00e4chern.',
    },
    {
      title: 'Graustufen-Export',
      description: 'Schalten Sie mit einem Klick auf Schwarz-Wei\\u00df um. Graustufen-Arbeitsbl\u00e4tter sind ideal f\u00fcr Schulen und Klassen, die in gro\\u00dfen Mengen auf Schwarz-Wei\\u00df-Druckern drucken. Alle Layout-Details bleiben erhalten.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung',
      description: 'Gehen Sie \u00fcber einfache Generierung hinaus. F\u00fcgen Sie Text-Overlays f\u00fcr Titel, Anweisungen oder Namensfelder hinzu. \\u00c4ndern Sie Hintergrund- und Seitenfarben. Wenden Sie Rahmen an. Nutzen Sie Drag-and-Drop, Ausrichtung, Ebenen, Zoom und R\u00fcckg\u00e4ngig.',
    },
    {
      title: 'Automatisch generierte L\u00f6sungsschl\u00fcssel',
      description: 'Jedes Arbeitsblatt erzeugt einen passenden L\u00f6sungsschl\u00fcssel im gleichen Thema, Layout und Schriftart. Antworten sind klar gedruckt. Der L\u00f6sungsschl\u00fcssel wird als separate Datei exportiert.',
    },
    {
      title: 'Doppelter Export in JPEG und PDF',
      description: 'Laden Sie Arbeitsbl\u00e4tter als hochaufl\u00f6sendes JPEG f\u00fcr digitale Nutzung oder als druckfertiges PDF f\u00fcr scharfen Klassenzimmerdruck und KDP-Buchinnenseiten herunter. Beide Formate behalten volle Qualit\u00e4t.',
    },
  ],

  businessUseCases: [
    {
      title: 'Subtraktions-Bilderarbeitsbl\u00e4tter f\u00fcr Etsy erstellen',
      description: 'B\u00fcndeln Sie thematische Subtraktions-Arbeitsbl\u00e4tter als Sofort-Download: 10 Tier-Subtraktionen, 10 Lebensmittel-Subtraktionen, 10 Fahrzeug-Subtraktionen. Der Durchstreich-Modus erzeugt ein einzigartiges visuelles Produkt, das sich von reinen Zahlen-Arbeitsbl\u00e4ttern abhebt.',
      platform: 'Etsy',
    },
    {
      title: 'Subtraktions-Aktivit\u00e4tenb\u00fccher auf Amazon KDP ver\u00f6ffentlichen',
      description: 'Stellen Sie PDF-Arbeitsbl\u00e4tter zu 50\\u2013100-seitigen Aktivit\u00e4tenb\u00fcchern zusammen: \\u201eSubtraktion bis 5 f\u00fcr Vorschulkinder\\u201c, \\u201eSubtraktion bis 10 f\u00fcr die Vorschule\\u201c, \\u201eSubtraktion bis 20 f\u00fcr die 1. Klasse\\u201c. L\u00f6sungsschl\u00fcssel am Ende einf\u00fcgen.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Differenzierte Mathe-Ressourcen f\u00fcr TPT verkaufen',
      description: 'Erstellen Sie ein dreistufiges Subtraktionspaket: Stufe 1 (Minuend bis 5, nur Durchstreichen), Stufe 2 (Minuend bis 10, gemischte Modi), Stufe 3 (Minuend bis 20, Finde den Subtrahenden). L\u00f6sungsschl\u00fcssel und Lehrerhinweise inklusive.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Saisonale Subtraktions-Sammlungen erstellen',
      description: 'Nutzen Sie Themenbilder f\u00fcr feiertagsspezifische Pakete: K\u00fcrbis-Subtraktion f\u00fcr Herbst, Schneeflocken-Subtraktion f\u00fcr Winter, Hasen-Subtraktion f\u00fcr Fr\u00fchling. Saisonale Mathe-Produkte haben konzentrierte Nachfrage.',
      platform: 'Multi-platform',
    },
    {
      title: 'W\u00f6chentlichen Subtraktions-Lehrplan erstellen',
      description: 'Strukturieren Sie Arbeitsbl\u00e4tter in ein progressives 12-Wochen-Programm. Starten Sie mit Durchstreichen bei Minuend 5, steigern Sie zu Bild \\u2013 Zahl bei 10, f\u00fchren Sie Finde den Subtrahenden bei 15 ein, enden Sie mit Gemischt bei 20.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Was ist der Durchstreich-Modus und wie funktioniert er?',
      answer: 'Der Durchstreich-Modus zeigt die volle Menge als Bilder und zeichnet fette X-Markierungen durch die subtrahierten Bilder. Zum Beispiel zeigt eine Aufgabe 7 \\u00c4pfel, wobei 3 durchgestrichen sind \\u2014 das verdeutlicht visuell 7 \\u2013 3 = 4. Dies entspricht dem Einsatz von Anschauungsmaterial im Unterricht.',
    },
    {
      question: 'Welche \\u00dcbungsmodi enth\u00e4lt der Subtraktions-Generator?',
      answer: 'Vier Modi: Durchstreichen (X-Markierungen durch subtrahierte Bilder), Bild \\u2013 Zahl (Bild neben Ziffer), Finde den Subtrahenden (wie viele wurden weggenommen?), und Gemischt (zuf\u00e4llige Kombination aller drei).',
    },
    {
      question: 'Wie steuere ich den Schwierigkeitsgrad?',
      answer: 'Stellen Sie den maximalen Minuenden von 2 bis 20 mit dem Schieberegler ein. Der Generator stellt automatisch sicher, dass alle Subtrahenden g\u00fcltige, nicht-negative Ergebnisse liefern. Minuend 5 f\u00fcr Vorschule, 10 f\u00fcr Kindergarten, 20 f\u00fcr 1. Klasse.',
    },
    {
      question: 'Kann ich Schwarz-Wei\\u00df-Arbeitsbl\u00e4tter zum Drucken erstellen?',
      answer: 'Ja. Der Graustufen-Export wandelt Ihr Arbeitsblatt in Schwarz-Wei\\u00df um und beh\u00e4lt alle Layout-Details bei. Diese Funktion ist speziell f\u00fcr Schulen und Klassen, die Druckkosten minimieren m\u00fcssen.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen passenden L\u00f6sungsschl\u00fcssel im gleichen Layout, Thema und Schriftart. Der L\u00f6sungsschl\u00fcssel wird als separate Datei exportiert.',
    },
    {
      question: 'Wie viele Bildthemen gibt es?',
      answer: 'Das Full Access Pack enth\u00e4lt alle 104 Bildthemen mit Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport, Jahreszeiten und mehr. Das Commercial Pack enth\u00e4lt eine kuratierte Auswahl. Beide erlauben eigene Bild-Uploads.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell nutzen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad oder jeder anderen Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen Commercial Pack und Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Subtraktions-Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang und alle Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich den Generator vor dem Kauf testen?',
      answer: 'Ja. Der Generator ist komplett kostenlos nutzbar ohne Anmeldung. Alle Modi, Themen, Einstellungen und der Canvas-Editor funktionieren \\u2014 der einzige Unterschied ist ein Wasserzeichen auf exportierten Dateien.',
    },
    {
      question: 'Welche Seitengr\u00f6\\u00dfen werden unterst\u00fctzt?',
      answer: 'US Letter (8,5 x 11 Zoll) und A4 sind die prim\u00e4ren Optionen, jeweils in Hoch- und Querformat. Standard ist Letter Querformat. Export als hochaufl\u00f6sendes JPEG und druckfertiges PDF.',
    },
    {
      question: 'Welche Sprachen unterst\u00fctzt der Generator?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Da Subtraktion eine visuelle Rechenoperation ist, funktionieren die Arbeitsbl\u00e4tter sprachunabh\u00e4ngig.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version mit Wasserzeichen.',
    },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Additions-Arbeitsblatt Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Mathe-R\\u00e4tsel Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\\u00e4hlen & Ausmalen Generator' },
    { slug: 'number-tracing', pageType: 'app', anchorText: 'Zahlen-Nachspuren Generator' },
    { slug: 'number-coloring', pageType: 'app', anchorText: 'Zahlen-Ausmalen Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Fehlende Zahlen Generator' },
    { slug: 'subtraction', pageType: 'tool', anchorText: 'Subtraktions-Generator kostenlos testen' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Mathe & Zahlen Bundle \\u2014 Sparen Sie bei allen Mathe-Generatoren' },
    { slug: 'amazon-kdp-activity-books', pageType: 'start', anchorText: 'Aktivit\\u00e4tenb\\u00fccher auf Amazon KDP ver\\u00f6ffentlichen' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Mathe-Druckvorlagen Nischen-Ideen' },
  ],
};
`);

// ============================================================
// 3. code-addition.ts
// ============================================================
writeFile('code-addition.ts', `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'code-addition',
  locale: 'de',
  category: 'math',

  seo: {
    titleTag: 'Code-Addition Generator | Code-Knacker Mathe Arbeitsbl\u00e4tter',
    metaDescription: 'Erstellen Sie Code-Knacker Additions-Arbeitsbl\u00e4tter, bei denen Symbole Zahlen darstellen. Wort-Enth\u00fcllung, 2-5 Symbole, 104 Themen. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Code-Addition Arbeitsblatt Generator',
    secondaryKeywords: [
      'Code-Knacker Mathe Arbeitsbl\u00e4tter',
      'Symbol-Addition Arbeitsbl\u00e4tter',
      'Geheimcode Mathe \u00dcbungen',
      'Zahlenr\u00e4tsel Arbeitsbl\u00e4tter',
      'Code entschl\u00fcsseln Mathe',
    ],
    lsiKeywords: [
      'algebraisches Denken Arbeitsbl\u00e4tter',
      'Variablen Mathe f\u00fcr Kinder',
      'Symbol Mathe Aufgaben',
      'Pr\u00e4-Algebra Arbeitsbl\u00e4tter',
      'Mathe Code R\u00e4tsel',
      'Geheimcode R\u00e4tsel',
      'Entschl\u00fcsselungs Arbeitsbl\u00e4tter',
      'Zahlen-Symbol Aktivit\u00e4ten',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/code addition/Code Breaker Addition 1.jpeg',
      primaryAlt: 'Code-Knacker Additions-Arbeitsblatt mit Tiersymbolen als versteckte Zahlen',
      secondary: '/samples/english/code addition/Code Breaker Addition 2.jpeg',
      secondaryAlt: 'Code-Addition L\u00f6sungsschl\u00fcssel mit Symbol-Zahlen-Zuordnung',
    },
    sampleGallery: [
      { src: '/samples/english/code addition/Code Breaker Addition 3.jpeg', alt: 'Code-Addition mit 3 Symbolen und Lebensmittelbildern', caption: '3 Symbole, nur Addition' },
      { src: '/samples/english/code addition/Code Breaker Addition 4.jpeg', alt: 'Code-Addition mit 5 Symbolen f\u00fcr Fortgeschrittene', caption: '5 Symbole, Fortgeschrittene' },
      { src: '/samples/english/code addition/image_addition_worksheet (1).jpeg', alt: 'Code-Addition im Querformat mit Naturthema', caption: 'Querformat-Option' },
      { src: '/samples/english/code addition/image_addition_worksheet (10).jpeg', alt: 'Code-Addition mit dekorativem Rahmen und Hintergrund', caption: 'Eigener Hintergrund und Rahmen' },
      { src: '/samples/english/code addition/image_addition_worksheet (11).jpeg', alt: 'Code-Addition mit 2 Summanden pro Gleichung', caption: '2 Summanden pro Gleichung' },
      { src: '/samples/english/code addition/image_addition_worksheet (12).jpeg', alt: 'Code-Addition L\u00f6sungsschl\u00fcssel mit allen Symbolwerten', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'vVd11Kjk9iA',
    videoTitle: 'So erstellen Sie Code-Knacker Additions-Arbeitsbl\u00e4tter',
  },

  hero: {
    title: 'Code-Addition Generator',
    tagline: 'Knack den Code \\u2014 wo jedes Bild eine geheime Zahl verbirgt, die entdeckt werden will',
    description: \`Standard-Additions\u00fcbungen testen nur Abruf. Code-Addition f\u00f6rdert logisches Denken. Statt 3 + 5 direkt zu l\u00f6sen, sehen Sch\u00fcler Gleichungen, in denen Bilder unbekannte Werte darstellen: Wenn eine Katze 3 bedeutet und ein Hund 5, was ergibt Katze + Hund? Dieser einfache Dreh verwandelt grundlegende Addition in ein Logikr\u00e4tsel, das pr\u00e4-algebraisches Denken von klein auf f\u00f6rdert.

Der Code-Addition Generator weist 2\\u20135 Bildsymbolen zuf\u00e4llige Zahlenwerte zu und erstellt dann Gleichungen mit diesen Symbolen. Sch\u00fcler analysieren die Gleichungen, leiten den Wert jedes Symbols ab und l\u00f6sen die Aufgaben. W\u00e4hlen Sie aus 104 illustrierten Themen und stellen Sie 2 bis 4 Summanden pro Gleichung ein. Der Generator unterst\u00fctzt 3\\u201310 Aufgaben pro Arbeitsblatt mit intelligenter Automatik.

Der Wort-Enth\u00fcllungsmodus geht noch weiter. Geben Sie ein Geheimwort ein, und der Generator erstellt Gleichungen, deren L\u00f6sungen bestimmten Buchstaben zugeordnet sind. Sch\u00fcler l\u00f6sen jede Gleichung, um einen Buchstaben des versteckten Worts zu enth\u00fcllen. Dieser Modus unterst\u00fctzt Unicode mit sprachspezifischen Sonderzeichen in allen 11 Sprachen.

Intelligente Duplikatpr\u00e4vention und automatische Anpassung sorgen f\u00fcr fehlerfreie Arbeitsbl\u00e4tter. Der Canvas-Editor erm\u00f6glicht Text, Hintergr\u00fcnde und Rahmen. Jedes Arbeitsblatt wird mit L\u00f6sungsschl\u00fcssel als JPEG oder PDF exportiert. Testen Sie alles kostenlos \\u2014 keine Anmeldung n\u00f6tig.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein Code-Knacker Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'Bilder als Code-Symbole w\u00e4hlen',
        description: 'W\u00e4hlen Sie 2\\u20135 Bilder aus der 104-Themen-Bibliothek oder laden Sie eigene hoch. Jedes Bild wird zum Symbol f\u00fcr eine versteckte Zahl. Der Generator weist jedem Symbol einen einzigartigen Zufallswert zu.',
      },
      {
        title: 'Gleichungseinstellungen konfigurieren',
        description: 'Legen Sie Aufgabenanzahl (3\\u201310), Summanden pro Gleichung (2, 3, 4 oder gemischt) und den Wertebereich f\u00fcr Symbolzuweisungen (1\\u201320) fest. Der Generator erstellt eindeutige Gleichungen durch Permutationslogik.',
      },
      {
        title: 'Optional: Wort-Enth\u00fcllung aktivieren',
        description: 'Aktivieren Sie den Wort-Enth\u00fcllungsmodus und geben Sie ein Geheimwort bis 10 Zeichen ein. Der Generator ordnet jeden Buchstaben einer Gleichungsl\u00f6sung zu und f\u00fcgt Ablenkungsbuchstaben mit anderen Summen hinzu.',
      },
      {
        title: 'Design anpassen',
        description: 'W\u00e4hlen Sie Seitengr\u00f6\\u00dfe, Ausrichtung und Schriftart. Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfelder und Anweisungen. Wenden Sie Hintergrund-Themen und dekorative Rahmen an.',
      },
      {
        title: 'Exportieren und verteilen',
        description: 'Laden Sie Arbeitsblatt und L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel zeigt alle Symbol-Zahlen-Zuordnungen. Graustufen-Schalter f\u00fcr Schwarz-Wei\\u00df-Druck.',
      },
    ],
  },

  features: [
    {
      title: 'Symbolbasiertes Gleichungssystem',
      description: 'Jedes ausgew\u00e4hlte Bild erh\u00e4lt einen einzigartigen Zahlenwert. Gleichungen verwenden diese Bildsymbole statt normaler Zahlen. Sch\u00fcler m\u00fcssen Symbolwerte verfolgen und Addition im Kopf durchf\u00fchren \\u2014 dieselben Denkf\u00e4higkeiten wie in der fr\u00fchen Algebra.',
    },
    {
      title: 'Wort-Enth\u00fcllungsmodus',
      description: 'Geben Sie ein Geheimwort bis 10 Zeichen ein. Der Generator erstellt Gleichungen, deren L\u00f6sungen einzelnen Buchstaben zugeordnet sind. Ablenkungsbuchstaben mit anderen Summenwerten erh\u00f6hen die Herausforderung. Unterst\u00fctzt Unicode inklusive deutscher Umlaute.',
    },
    {
      title: 'Intelligente automatische Anpassung',
      description: 'Wenn Ihre Einstellungen weniger eindeutige Gleichungen erzeugen w\u00fcrden als angefordert, erh\u00f6ht der Generator automatisch die Symbol- oder Summandenanzahl und zeigt eine Meldung. Keine leeren Arbeitsbl\u00e4tter, keine manuelle Fehlersuche.',
    },
    {
      title: 'Einstellbare Summanden pro Gleichung',
      description: 'Legen Sie 2, 3 oder 4 Summanden pro Gleichung fest oder w\u00e4hlen Sie Gemischt f\u00fcr zuf\u00e4llige Variation. Zwei Summanden eignen sich f\u00fcr Anf\u00e4nger. Drei und vier Summanden fordern Sch\u00fcler mit mehrstufigem Denken heraus.',
    },
    {
      title: '2\\u20135 Bildsymbole pro Arbeitsblatt',
      description: 'Steuern Sie die Komplexit\u00e4t durch die Anzahl verschiedener Symbole. Zwei Symbole erzeugen einfache R\u00e4tsel. F\u00fcnf Symbole erfordern, mehrere Werte gleichzeitig zu verfolgen \\u2014 Arbeitsged\u00e4chtnis und Mathe werden gleichzeitig trainiert.',
    },
    {
      title: '104 illustrierte Bildthemen',
      description: 'W\u00e4hlen Sie Symbole aus Tier-, Fahrzeug-, Lebensmittel-, Natur-, Sport- und Jahreszeitenbildern. Thematische Code-Knacker verbinden Mathe\u00fcbungen mit anderen Themen und halten Sch\u00fcler mit frischen Bildern motiviert.',
    },
    {
      title: 'Duplikatpr\u00e4vention mit Permutationslogik',
      description: 'Der Generator nutzt mathematische Permutationslogik (ohne Wiederholung im Standardmodus, mit Wiederholung bei Wort-Enth\u00fcllung), um jede Gleichung auf einem Arbeitsblatt einzigartig zu machen.',
    },
    {
      title: 'Canvas-Editor und Doppelexport',
      description: 'F\u00fcgen Sie Text-Overlays hinzu, \u00e4ndern Sie Farben, wenden Sie Hintergr\u00fcnde und Rahmen an. Export als JPEG oder PDF mit passendem L\u00f6sungsschl\u00fcssel. Graustufen-Schalter f\u00fcr tinteneffizienten Druck.',
    },
  ],

  businessUseCases: [
    {
      title: 'Code-Knacker Aktivit\u00e4tenb\u00fccher auf Amazon KDP verkaufen',
      description: 'Stellen Sie 50\\u2013100 Code-Additions-R\u00e4tsel zu thematischen B\u00fcchern zusammen: \\u201eKnack den Code: Tier-Mathe f\u00fcr die 1. Klasse\\u201c, \\u201eGeheimcode-Additions-Abenteuer\\u201c. Das einzigartige Symbolformat hebt Ihr Buch von Standard-Rechenb\u00fcchern ab.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Entschl\u00fcsselungs-Mathe-Pakete f\u00fcr Etsy erstellen',
      description: 'Nutzen Sie den Wort-Enth\u00fcllungsmodus f\u00fcr Pakete, bei denen jedes Arbeitsblatt ein Themenwort enth\u00fcllt: Tiernamen, Feiertagsw\u00f6rter oder Vokabelbegriffe. Eltern suchen nach \\u201eCode-Knacker Arbeitsbl\u00e4tter\\u201c und \\u201eGeheimcode Mathe\\u201c.',
      platform: 'Etsy',
    },
    {
      title: 'Pr\u00e4-Algebra Ressourcen f\u00fcr TPT erstellen',
      description: 'Positionieren Sie Code-Addition als Ressource f\u00fcr algebraisches Denken. Erstellen Sie gestufte Pakete: Stufe 1 (2 Symbole, 2 Summanden), Stufe 2 (3 Symbole, 3 Summanden), Stufe 3 (4\\u20135 Symbole, gemischt).',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Feiertags-Wort-Enth\u00fcllungs-Sammlungen erstellen',
      description: 'Erstellen Sie saisonale Pakete, bei denen Sch\u00fcler Gleichungen l\u00f6sen, um Feiertagsw\u00f6rter zu buchstabieren: \\u201eGEIST\\u201c f\u00fcr Halloween, \\u201eNIKOLAUS\\u201c f\u00fcr Weihnachten, \\u201eHERZ\\u201c f\u00fcr Valentinstag.',
      platform: 'Multi-platform',
    },
    {
      title: 'Mathe-Bereicherungs-Programm anbieten',
      description: 'Erstellen Sie eine w\u00f6chentliche Code-Knacker-Herausforderungsserie f\u00fcr Homeschool-Gruppen oder Nachmittagsprogramme. Jede Woche ein neues Thema und Geheimwort mit steigender Schwierigkeit.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Wie funktioniert Code-Addition?',
      answer: 'Jedem Bildsymbol wird ein versteckter Zahlenwert zugewiesen. Sch\u00fcler sehen Gleichungen mit diesen Symbolen (z.B. Katze + Hund = ?) und m\u00fcssen den Wert jedes Symbols herausfinden. Es ist wie fr\u00fche Algebra mit Bildern statt Variablen.',
    },
    {
      question: 'Was ist der Wort-Enth\u00fcllungsmodus?',
      answer: 'Der Wort-Enth\u00fcllungsmodus l\u00e4sst Sie ein Geheimwort bis 10 Zeichen eingeben. Der Generator erstellt Gleichungen, deren L\u00f6sungen bestimmten Buchstaben zugeordnet sind, plus Ablenkungsbuchstaben. Sch\u00fcler l\u00f6sen Gleichungen und enth\u00fcllen so das Wort.',
    },
    {
      question: 'Wie viele Symbole kann ich pro Arbeitsblatt verwenden?',
      answer: 'W\u00e4hlen Sie zwischen 2 und 5 Bildsymbolen. Zwei Symbole erzeugen einfache R\u00e4tsel f\u00fcr Anf\u00e4nger. F\u00fcnf Symbole erfordern gleichzeitiges Verfolgen mehrerer Werte f\u00fcr Fortgeschrittene.',
    },
    {
      question: 'Was passiert, wenn meine Einstellungen zu wenige Gleichungen erzeugen?',
      answer: 'Der Generator passt sich automatisch an. Wenn nicht gen\u00fcgend eindeutige Permutationen vorhanden sind, erh\u00f6ht er die Symbol- oder Summandenanzahl und zeigt eine Meldung. Sie erhalten nie leere oder wiederholte Aufgaben.',
    },
    {
      question: 'Kann ich die Summandenanzahl pro Gleichung festlegen?',
      answer: 'Ja. W\u00e4hlen Sie 2, 3 oder 4 Summanden pro Gleichung oder Gemischt f\u00fcr zuf\u00e4llige Variation. Zwei Summanden eignen sich f\u00fcr j\u00fcngere Sch\u00fcler, drei und vier Summanden fordern mehrstufiges Denken.',
    },
    {
      question: 'Unterst\u00fctzt die Wort-Enth\u00fcllung Sonderzeichen?',
      answer: 'Ja. Die Wort-Enth\u00fcllung unterst\u00fctzt vollst\u00e4ndiges Unicode in allen 11 Sprachen, einschlie\\u00dflich deutscher Umlaute, franz\u00f6sischer Akzente, spanischer Tilden und skandinavischer Zeichen.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, TPT, Gumroad oder jeder Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen Commercial Pack und Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Generator mit kommerzieller Lizenz, beliebte Themen und alle Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, den Wort-Enth\u00fcllungsmodus, bevorzugten Zugang und alle Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich es vor dem Kauf testen?',
      answer: 'Ja. Die kostenlose Version enth\u00e4lt alle Modi, Einstellungen und Themen \\u2014 nur mit Wasserzeichen auf Exporten. Testen Sie alles, einschlie\\u00dflich Wort-Enth\u00fcllung.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes Arbeitsblatt generiert einen passenden L\u00f6sungsschl\u00fcssel mit allen Symbol-Zahlen-Zuordnungen und vollst\u00e4ndigen Gleichungsl\u00f6sungen. Der L\u00f6sungsschl\u00fcssel wird als separate Datei exportiert.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Der Wort-Enth\u00fcllungsmodus unterst\u00fctzt sprachspezifische Alphabete und Sonderzeichen.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Additions-Arbeitsblatt Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Mathe-R\\u00e4tsel Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraktions-Arbeitsblatt Generator' },
    { slug: 'math-worksheet', pageType: 'app', anchorText: 'Mathe-Arbeitsblatt Generator' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Kryptogramm Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Fehlende Zahlen Generator' },
    { slug: 'code-addition', pageType: 'tool', anchorText: 'Code-Addition Generator kostenlos testen' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Mathe & Zahlen Bundle \\u2014 Sparen Sie bei allen Mathe-Generatoren' },
    { slug: 'create-math-workbooks', pageType: 'guide', anchorText: 'So erstellen Sie Mathe-Arbeitshefte' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Mathe-Druckvorlagen Nischen-Ideen' },
  ],
};
`);

console.log('Subtraction and code-addition created. Creating remaining files...');
`);

fs.writeFileSync(path.join(dir, 'subtraction.ts'), files['subtraction.ts'] || '');
console.log('Done with batch 1');
