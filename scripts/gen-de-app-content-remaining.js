const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const apps = {
  bingo: {
    category: 'matching',
    content: `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'bingo',
  locale: 'de',
  category: 'matching',

  seo: {
    titleTag: 'Bingo-Karten Generator | Eigene Bingo-Karten Gratis Erstellen',
    metaDescription: 'Erstellen Sie druckbare Bingo-Karten mit Bildern oder W\u00f6rtern. 3\u20135 Zeilen und Spalten, 1\u201310 Karten pro Blatt, Ausrufchips. Kostenloser Bingo-Karten-Maker mit PDF-Export.',
    primaryKeyword: 'Bingo-Karten Generator',
    secondaryKeywords: [
      'druckbare Bingo-Karten',
      'Bingo-Karten mit Bildern',
      'Bingo Arbeitsbl\u00e4tter erstellen',
      'Bingo-Karten Maker',
      'Bingo-Spiel Generator',
    ],
    lsiKeywords: [
      'Bingo f\u00fcr den Unterricht',
      'Bilder-Bingo',
      'Vokabel-Bingo',
      'Bingo-Spiel drucken',
      'Bingo-Karten Ausrufchips',
      'Gruppenspiel Arbeitsbl\u00e4tter',
      'p\u00e4dagogisches Bingo',
      'Party-Bingo druckbar',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/bingo/bingo_card word.jpeg',
      primaryAlt: 'Bingo-Karte mit Wortfeldern in einem bunten Rasterlayout f\u00fcr den Unterricht',
    },
    sampleGallery: [
      { src: '/samples/english/bingo/bingo_card word.jpeg', alt: 'Bingo-Karte mit Wortfeldern und Vokabelbegriffen im Rasterformat', caption: 'Wortbasierte Bingo-Karte' },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'So erstellen Sie Bingo-Karten mit Bildern',
  },

  hero: {
    title: 'Bingo-Karten Generator',
    tagline: 'Erstellen Sie individuelle Bingo-Karten mit Bildern oder W\u00f6rtern f\u00fcr Unterricht, Partys und druckbare Produkte',
    description: \`Bingo geh\u00f6rt zu den beliebtesten Gruppenaktivit\u00e4ten f\u00fcr jedes Alter, und dieser Generator erm\u00f6glicht es Ihnen, vollst\u00e4ndig individualisierte Bingo-Karten in Sekunden zu erstellen. Ob Sie Bilder-Bingo f\u00fcr Vorschulkinder, Vokabel-Bingo f\u00fcr Sprachlernende oder thematisches Bingo f\u00fcr Partyunterhaltung ben\u00f6tigen \u2014 der Bingo-Karten Generator produziert professionelle Karten mit passenden Ausrufchips, sofort einsatzbereit.

Zwei Generierungsmodi decken jedes Bingo-Szenario ab. Der Karten & Chips Modus erstellt Bingo-Karten zusammen mit einem separaten Ausrufchip-Blatt zum Ausschneiden. Der Ausruf-Modus generiert nur das Auswahlblatt, wenn Sie bereits Karten haben oder eine eigene Zugliste erstellen m\u00f6chten. Beide Modi erg\u00e4nzen sich zu einem kompletten Bingo-Spielsystem aus einem einzigen Generator.

Passen Sie jeden Aspekt Ihrer Bingo-Karten an. Legen Sie das Raster von 3 Zeilen \u00d7 3 Spalten bis 5 \u00d7 5 fest und erstellen Sie alles von einem schnellen 9-Felder-Spiel bis zum klassischen 25-Felder-Bingo-Erlebnis. Generieren Sie zwischen 1 und 10 einzigartige Karten pro Arbeitsblatt \u2014 jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung derselben Bilder oder W\u00f6rter, sodass jeder Spieler ein einzigartiges Brett hat. W\u00e4hlen Sie, ob Felder Bilder aus der 104-Themen-Bibliothek oder Textw\u00f6rter f\u00fcr Vokabel- und Recht\u00adschreib\u00fcbungen anzeigen.

Der integrierte Canvas-Editor erm\u00f6glicht die Anpassung von Farben, Schriftarten, Rahmen und Positionierung vor dem Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Ein passendes Ausrufblatt wird automatisch mit denselben Bildern oder W\u00f6rtern generiert. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 testen Sie jede Rastergr\u00f6\u00dfe, Kartenanzahl und jedes Thema vor dem Kauf.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie Ihre Bingo-Karten in 5 Schritten',
    steps: [
      {
        title: 'W\u00e4hlen Sie den Generierungsmodus',
        description: 'W\u00e4hlen Sie Karten & Chips, um Bingo-Karten mit passenden Ausrufchips zu generieren, oder Ausrufe, um nur das Auswahlblatt zu erstellen. Der Karten & Chips Modus erzeugt ein komplettes Bingo-Spielsystem; der Ausruf-Modus ist n\u00fctzlich, wenn Sie eine eigene Zugliste ben\u00f6tigen.',
      },
      {
        title: 'Rastergr\u00f6\u00dfe und Kartenanzahl festlegen',
        description: 'W\u00e4hlen Sie ein Raster von 3\u00d73 (9 Felder) bis 5\u00d75 (25 Felder). Legen Sie dann fest, wie viele einzigartige Karten generiert werden sollen, von 1 bis 10. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung desselben Inhalts, sodass jeder Spieler ein einzigartiges Brett bekommt.',
      },
      {
        title: 'Feldinhalt w\u00e4hlen: Bild oder Wort',
        description: 'W\u00e4hlen Sie, ob Bingo-Felder Bilder aus der 104-Themen-Bibliothek oder Textw\u00f6rter anzeigen. Der Bildmodus erstellt visuelles Bingo f\u00fcr j\u00fcngere Kinder und Sprachlernende. Der Wortmodus trainiert Wortschatz, Rechtschreibung und Lesekompetenz.',
      },
      {
        title: 'Im Canvas-Editor anpassen',
        description: 'Verfeinern Sie Ihre Bingo-Karten mit dem integrierten Editor. F\u00fcgen Sie einen eigenen Titel hinzu, \u00e4ndern Sie Rasterfarben, passen Sie Schriftarten an, wenden Sie Rahmen an und positionieren Sie Elemente neu. Optimieren Sie das Layout vor dem Export.',
      },
      {
        title: 'Exportieren und Drucken',
        description: 'Laden Sie Ihre Bingo-Karten als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Das Ausrufchip-Blatt wird automatisch als separate Datei generiert. Drucken, Chips ausschneiden \u2014 und Ihr Bingo-Spiel ist spielbereit.',
      },
    ],
  },

  features: [
    {
      title: 'Zwei Modi: Karten & Chips und Ausrufe',
      description: 'Der Karten & Chips Modus generiert komplette Bingo-Karten zusammen mit einem passenden Ausrufchip-Blatt zum Ausschneiden. Der Ausruf-Modus erstellt nur das Auswahlblatt, wenn Sie bereits Karten haben oder eine eigene Zugliste ben\u00f6tigen. Zusammen bilden diese Modi ein komplettes Bingo-Spielsystem.',
    },
    {
      title: 'Flexibles Raster: 3\u00d73 bis 5\u00d75',
      description: 'Stellen Sie Ihr Raster von 3 Zeilen \u00d7 3 Spalten (9 Felder) bis 5 \u00d7 5 (25 Felder) ein. Ein 3\u00d73-Raster erzeugt schnelle Spiele f\u00fcr junge Kinder. Ein 4\u00d74-Raster passt f\u00fcr die meisten Unterrichtsaktivit\u00e4ten. Ein 5\u00d75-Raster liefert das traditionelle Bingo-Erlebnis mit 25 einzigartigen Feldern pro Karte.',
    },
    {
      title: '1\u201310 einzigartige Karten pro Blatt',
      description: 'Erstellen Sie mehrere einzigartige Bingo-Karten in einer einzigen Generierung. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung derselben Bilder oder W\u00f6rter, sodass jeder Spieler ein einzigartiges Brett hat. Generieren Sie bis zu 10 Karten auf einmal f\u00fcr eine ganze Klasse oder Party.',
    },
    {
      title: 'Bild- oder Wortf\u00fcllung',
      description: 'W\u00e4hlen Sie, ob Felder farbenfrohe Bilder aus der 104-Themen-Bibliothek oder Textw\u00f6rter anzeigen. Bilder-Bingo begeistert Leseanf\u00e4nger und Sprachlernende visuell. Wort-Bingo trainiert Wortschatz, Rechtschreibung und Lesekompetenz. Wechseln Sie zwischen den Modi f\u00fcr verschiedene Versionen desselben Spiels.',
    },
    {
      title: '104 illustrierte Bildthemen',
      description: 'Jedes Thema bietet professionell gezeichnete Bilder, die in Bingo-Feldgr\u00f6\u00dfe klar dargestellt werden. W\u00e4hlen Sie aus Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport, Musik, Jahreszeiten und mehr. Themen erm\u00f6glichen fachspezifische Bingo-Spiele zu Unterrichtsthemen oder Partymottos.',
    },
    {
      title: 'Eigene Ausrufchip-Auswahl',
      description: 'Bestimmen Sie, welche Elemente als Ausrufchips erscheinen. W\u00e4hlen Sie bestimmte Bilder oder W\u00f6rter aus Ihrem Thema zum Ein- oder Ausschlie\u00dfen und erstellen Sie fokussierte Spiele, die bestimmte Vokabeln oder Konzepte trainieren. Das Chipblatt wird als separate druckbare Seite generiert.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung',
      description: 'F\u00fcgen Sie eigenen Text mit einstellbarer Schriftart, Gr\u00f6\u00dfe, Farbe und Umriss hinzu. \u00c4ndern Sie Kartenhintergr\u00fcnde, wenden Sie Rahmen an, verschieben Sie Elemente per Drag-and-Drop und nutzen Sie Ausrichtungswerkzeuge. Ebenenordnung, Sperrsteuerungen, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelle Ergebnisse.',
    },
    {
      title: 'Doppelter Export: JPEG und PDF',
      description: 'Exportieren Sie Bingo-Karten als hochaufl\u00f6sende JPEG-Bilder oder druckfertige PDF-Dokumente. JPEG eignet sich f\u00fcr digitale Nutzung und Listing-Vorschaubilder. PDF bietet scharfe Ausgabe f\u00fcr den Unterrichtsdruck, Partyvorbereitung und mehrseitige Zusammenstellungen.',
    },
  ],

  businessUseCases: [
    {
      title: 'Bingo-Spielpakete auf Etsy verkaufen',
      description: 'Erstellen Sie thematische Bingo-B\u00fcndel mit 30 einzigartigen Karten \u2014 Tier-Bingo, Lebensmittel-Bingo, Feiertags-Bingo \u2014 und listen Sie sie als Sofort-Download-Produkte. Inklusive Ausrufchips und einfacher Anleitung. Bingo-Pakete sind beliebt bei Lehrern, Eltern und Partyplanern.',
      platform: 'Etsy',
    },
    {
      title: 'KDP-Bingo-Aktivit\u00e4tenb\u00fccher ver\u00f6ffentlichen',
      description: 'Stellen Sie mehrere thematische Bingo-Spiele zu Aktivit\u00e4tenb\u00fcchern f\u00fcr Amazon KDP zusammen. Eine \u201eKlassenzimmer-Bingo-Sammlung\u201c oder ein \u201eParty-Bingo-Bundle\u201c mit 10 Themen und 30 Karten pro Thema schafft ein hochwertiges Produkt. Inklusive Ausrufchip-Seiten zum einfachen Ausschneiden.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Vokabel-Bingo-Sets f\u00fcr TPT erstellen',
      description: 'Nutzen Sie den Wortmodus, um lehrplanorientierte Vokabel-Bingo-Spiele f\u00fcr Teachers Pay Teachers zu erstellen. Erstellen Sie Sets f\u00fcr spezifische F\u00e4cher: Naturwissenschafts-Vokabeln, Mathe-Begriffe, Grundwortschatz oder Fremdsprachen\u00fcbungen. B\u00fcndeln Sie 30 einzigartige Karten mit Ausrufchips.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Party- und Event-Bingo-Sammlungen erstellen',
      description: 'Erstellen Sie thematische Bingo-Kartensets f\u00fcr Geburtstage, Babypartys, Feiertagsfeiern und Firmenevents. Verwenden Sie eigene Bilder oder W\u00f6rter, die zum Event-Thema passen. Party-Bingo-Produkte erreichen ein breiteres Publikum \u00fcber den Bildungsbereich hinaus.',
      platform: 'Multi-platform',
    },
    {
      title: 'Monatliches Bingo-Spiel-Abonnement starten',
      description: 'Liefern Sie monatlich neue thematische Bingo-Spielsets \u00fcber Gumroads Mitgliedschaftsfunktion. Jeden Monat ein anderes Thema mit 30 einzigartigen Karten und Ausrufchips. Lehrer sch\u00e4tzen frische, sofort einsetzbare Spielaktivit\u00e4ten auf regelm\u00e4\u00dfiger Basis.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Welche zwei Generierungsmodi gibt es?',
      answer: 'Der Karten & Chips Modus erstellt Bingo-Karten zusammen mit einem passenden Ausrufchip-Blatt. Der Ausruf-Modus generiert nur das Auswahlblatt, wenn Sie bereits Karten haben oder eine eigene Zugliste ben\u00f6tigen. Beide Modi verwenden dieselben Bilder oder W\u00f6rter aus Ihrem gew\u00e4hlten Thema.',
    },
    {
      question: 'Welche Rastergr\u00f6\u00dfen sind verf\u00fcgbar?',
      answer: 'Sie k\u00f6nnen das Raster von 3 Zeilen \u00d7 3 Spalten (9 Felder) bis 5 \u00d7 5 (25 Felder) einstellen. Zeilen und Spalten k\u00f6nnen unabh\u00e4ngig eingestellt werden, sodass auch rechteckige Raster wie 3\u00d75 oder 4\u00d73 m\u00f6glich sind.',
    },
    {
      question: 'Wie viele einzigartige Karten kann ich auf einmal generieren?',
      answer: 'Sie k\u00f6nnen zwischen 1 und 10 einzigartige Bingo-Karten pro Sitzung generieren. Jede Karte erh\u00e4lt eine andere zuf\u00e4llige Anordnung derselben Bilder oder W\u00f6rter, sodass jeder Spieler ein einzigartiges Brett hat. F\u00fcr gr\u00f6\u00dfere Gruppen generieren Sie mehrere Durchg\u00e4nge.',
    },
    {
      question: 'Kann ich Bilder oder W\u00f6rter in den Bingo-Feldern verwenden?',
      answer: 'Ja. W\u00e4hlen Sie zwischen Bildmodus (farbenfrohe Bilder aus der 104-Themen-Bibliothek) und Wortmodus (Textbeschriftungen). Bilder-Bingo eignet sich f\u00fcr Leseanf\u00e4nger und visuelle Lernende. Wort-Bingo trainiert Wortschatz, Rechtschreibung und Lesekompetenz.',
    },
    {
      question: 'Wie viele Bildthemen sind verf\u00fcgbar?',
      answer: 'Das Full Access Paket enth\u00e4lt alle 104 illustrierten Themen mit Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport, Musik, Jahreszeiten und mehr. Das Commercial Paket enth\u00e4lt eine kuratierte Auswahl beliebter Themen. Beide Pakete unterst\u00fctzen eigene Bild-Uploads.',
    },
    {
      question: 'Kann ich die Bingo-Karten kommerziell nutzen?',
      answer: 'Ja. Sowohl das Commercial Pack als auch das Full Access Pack enthalten eine kommerzielle Lizenz. Sie k\u00f6nnen die erstellten Bingo-Karten auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Ihrer eigenen Website und jeder anderen Plattform verkaufen.',
    },
    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Bingo-Generator mit kommerzieller Lizenz, beliebte Bildthemen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Bildthemen, bevorzugten Zugang zu neuen Themen und alle zuk\u00fcnftigen Updates. Beide Pakete sind Einmalk\u00e4ufe ohne Abo.',
    },
    {
      question: 'Kann ich den Generator vor dem Kauf testen?',
      answer: 'Absolut. Der Generator ist jetzt kostenlos nutzbar, ohne Anmeldung. Die kostenlose Version enth\u00e4lt alle Funktionen, Rastergr\u00f6\u00dfen und Kartenanzahlen \u2014 der einzige Unterschied ist ein kleines Wasserzeichen auf exportierten Dateien.',
    },
    {
      question: 'Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?',
      answer: 'W\u00e4hlen Sie zwischen US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat sind verf\u00fcgbar. Bingo-Karten werden als hochaufl\u00f6sendes JPEG und druckfertiges PDF in professioneller Qualit\u00e4t exportiert.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che und Wortmodus-Beschriftungen unterst\u00fctzen 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Bilder-Bingo funktioniert sprachunabh\u00e4ngig, da es auf Bildern statt Text basiert.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version mit Wasserzeichen, um alle Funktionen auszuprobieren.',
    },
  ],

  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Arbeitsblatt Generator' },
    { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: 'Bilder-Sortieren Generator' },
    { slug: 'bingo', pageType: 'tool', anchorText: 'Bingo-Generator kostenlos testen' },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Zuordnung & Sortierung Bundle \u2014 Sparen Sie bei allen 5 Generatoren' },
    { slug: 'create-bingo-cards', pageType: 'guide', anchorText: 'Bingo-Karten erstellen, die sich verkaufen' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide', anchorText: 'Etsy Druckvorlagen-Shop starten' },
    { slug: 'party-supply-printable-ideas', pageType: 'idea', anchorText: 'Party-Druckvorlagen Nischen-Ideen' },
    { slug: 'complete-guide-printable-business', pageType: 'start', anchorText: 'Kompletter Leitfaden f\u00fcr Druckvorlagen-Business' },
  ],
};`,
  },

  crossword: {
    category: 'search',
    content: `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'crossword',
  locale: 'de',
  category: 'search',

  seo: {
    titleTag: 'Kreuzwortr\u00e4tsel Generator | Bildr\u00e4tsel-Kreuzworte Gratis',
    metaDescription: 'Erstellen Sie Kreuzwortr\u00e4tsel mit Bildhinweisen oder eigenen Wortlisten. Automatisches Layout, Drag-Drop-Bearbeitung, Hoch- und Querformat. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Kreuzwortr\u00e4tsel Generator',
    secondaryKeywords: [
      'Kreuzwortr\u00e4tsel mit Bildern erstellen',
      'druckbare Kreuzwortr\u00e4tsel',
      'Kreuzwortr\u00e4tsel Maker',
      'Kreuzwort-Arbeitsblatt Generator',
      'Bildr\u00e4tsel Kreuzwort Generator',
    ],
    lsiKeywords: [
      'Kreuzwortr\u00e4tsel f\u00fcr Kinder',
      'Vokabel-Kreuzwortr\u00e4tsel',
      'Rechtschreib\u00fcbung Kreuzwort',
      'Wortr\u00e4tsel Generator',
      'p\u00e4dagogischer Kreuzwort-Maker',
      'Kreuzwortr\u00e4tsel Unterricht',
      'Kreuzwortr\u00e4tsel druckbar',
      'Kreuzwortr\u00e4tsel-B\u00fccher f\u00fcr Kinder',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/crossword/crossword_worksheet (1).jpeg',
      primaryAlt: 'Kreuzwortr\u00e4tsel mit Bildhinweisen rund um das Raster mit Tiervokabeln',
      secondary: '/samples/english/crossword/crossword_worksheet (2).jpeg',
      secondaryAlt: 'Kreuzwortr\u00e4tsel-L\u00f6sungsschl\u00fcssel mit allen ausgef\u00fcllten W\u00f6rtern',
    },
    sampleGallery: [
      { src: '/samples/english/crossword/crossword_worksheet (3).jpeg', alt: 'Kreuzwortr\u00e4tsel mit Lebensmittel-Thema und 4 Bildhinweisen', caption: 'Bildhinweis-Kreuzwortr\u00e4tsel' },
      { src: '/samples/english/crossword/crossword_worksheet (4).jpeg', alt: 'Kreuzwortr\u00e4tsel im eigenen Wortlisten-Modus mit Texthinweisen', caption: 'Eigene Wortliste Modus' },
      { src: '/samples/english/crossword/crossword_worksheet (5).jpeg', alt: 'Kreuzwortr\u00e4tsel im Querformat mit thematischem Rahmen', caption: 'Querformat-Layout' },
      { src: '/samples/english/crossword/crossword_worksheet (6).jpeg', alt: 'Kreuzwortr\u00e4tsel mit Drag-Drop-Bearbeitung der Wortpositionen', caption: 'Drag-Drop manuelle Bearbeitung' },
      { src: '/samples/english/crossword/crossword_worksheet (7).jpeg', alt: 'Kreuzwortr\u00e4tsel mit Fahrzeug-Thema und dekorativem Rahmen', caption: 'Fahrzeug-Thema mit Rahmen' },
      { src: '/samples/english/crossword/crossword_worksheet (8).jpeg', alt: 'Kreuzwortr\u00e4tsel-L\u00f6sungsschl\u00fcssel mit ausgef\u00fclltem Raster', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'b3WKDrzif-w',
    videoTitle: 'So erstellen Sie Kreuzwortr\u00e4tsel mit Bildhinweisen',
  },

  hero: {
    title: 'Kreuzwortr\u00e4tsel Generator',
    tagline: 'Bildbasierte Kreuzwortr\u00e4tsel, die Vokabel\u00fcbungen in ein verkn\u00fcpftes Wortpuzzle verwandeln',
    description: \`Kreuzwortr\u00e4tsel sind seit \u00fcber einem Jahrhundert ein Eckpfeiler des Vokabeltrainings und bleiben eines der effektivsten Formate f\u00fcr Rechtschreib\u00fcbungen und Worterkennung. Der Kreuzwortr\u00e4tsel Generator hebt das klassische Format auf eine neue Ebene mit Bildhinweisen aus der 104-Themen-Bibliothek und erstellt visuell ansprechende R\u00e4tsel, bei denen Sch\u00fcler Bilder erkennen und deren Namen in das verkn\u00fcpfte Raster einschreiben.

Die Auto-Layout-Engine platziert W\u00f6rter automatisch in einem verkn\u00fcpften Kreuzwortmuster. W\u00e4hlen Sie Bilder aus einem Thema und der Generator verwendet deren Namen als Kreuzwortw\u00f6rter, ordnet sie mit gemeinsamen Buchstaben an und erzeugt ein korrektes, ineinandergreifendes Raster. Vier Bildhinweise werden um das Raster positioniert, nummeriert f\u00fcr ihre waagerechten oder senkrechten Positionen. Das Ergebnis sieht aus wie ein professionelles Kreuzwortr\u00e4tsel, dessen manuelle Gestaltung Stunden dauern w\u00fcrde.

Der Eigene-Wortliste-Modus erlaubt die Eingabe beliebiger W\u00f6rter mit textbasierten Hinweisen statt Bildern. Dies \u00f6ffnet den Generator f\u00fcr jedes Fachvokabular: Naturwissenschaftsbegriffe, Sachkunde-Schl\u00fcsselw\u00f6rter, Fremdsprachenw\u00f6rter oder eigene Rechtschreibleisten. Die manuelle Bearbeitungsfunktion nutzt Drag-and-Drop zur Anpassung der Wortpositionen nach der automatischen Generierung und gibt Ihnen pr\u00e4zise Kontrolle \u00fcber das finale Layout.

Hoch- und Querformat werden mit automatischer Layout-Anpassung unterst\u00fctzt. Der vollst\u00e4ndige Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Jedes R\u00e4tsel generiert einen passenden L\u00f6sungsschl\u00fcssel mit allen ausgef\u00fcllten W\u00f6rtern. Export als JPEG oder PDF mit Graustufen-Option f\u00fcr tintensparendes Drucken. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung, mit nur einem kleinen Wasserzeichen.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein Kreuzwortr\u00e4tsel in 5 Schritten',
    steps: [
      {
        title: 'W\u00e4hlen Sie die Wortquelle',
        description: 'W\u00e4hlen Sie Bilder aus der 104-Themen-Bibliothek (deren Namen werden zu Kreuzwortw\u00f6rtern) oder geben Sie eine eigene Wortliste mit Texthinweisen ein. Bildhinweise machen das R\u00e4tsel visuell. Eigene W\u00f6rter machen es fachspezifisch.',
      },
      {
        title: 'Layout automatisch generieren',
        description: 'Die Engine ordnet W\u00f6rter in einem verkn\u00fcpften Kreuzwortmuster an und maximiert Buchstaben-\u00dcberschneidungen. Vier Bildhinweise werden um das Raster mit nummerierten waagerecht/senkrecht-Referenzen positioniert. Das Layout funktioniert automatisch.',
      },
      {
        title: 'Mit Drag-and-Drop bearbeiten',
        description: 'Passen Sie optional Wortpositionen mit dem manuellen Drag-and-Drop-Editor an. Verschieben Sie W\u00f6rter, um das Layout zu verbessern, \u00e4ndern Sie \u00dcberschneidungen oder positionieren Sie Bildhinweise um. Der Editor beh\u00e4lt die g\u00fcltige Kreuzwortstruktur bei.',
      },
      {
        title: 'Ausrichtung und Stil w\u00e4hlen',
        description: 'W\u00e4hlen Sie Hoch- oder Querformat. Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfeld und Anweisungen. Wenden Sie thematische Hintergr\u00fcnde und Rahmen f\u00fcr ein professionelles Design an.',
      },
      {
        title: 'R\u00e4tsel und L\u00f6sung exportieren',
        description: 'Laden Sie das Kreuzwortr\u00e4tsel und seinen L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel zeigt alle W\u00f6rter im Raster. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck umschalten.',
      },
    ],
  },

  features: [
    {
      title: 'Automatisch generiertes Kreuzwort-Layout',
      description: 'Die Layout-Engine ordnet W\u00f6rter in einem verkn\u00fcpften Muster an und maximiert gemeinsame Buchstaben zwischen waagerechten und senkrechten Eintr\u00e4gen. Der Algorithmus erzeugt automatisch korrekte Kreuzwortstrukturen aus jeder Wortliste oder Themenauswahl.',
    },
    {
      title: 'Bildhinweise aus 104 Themen',
      description: 'Vier Bildhinweise werden um das Raster positioniert, nummeriert f\u00fcr ihren waagerechten oder senkrechten Eintrag. Sch\u00fcler erkennen das Bild und schreiben dessen Namen ins Raster. Dies kombiniert visuelle Erkennung mit Rechtschreib\u00fcbung.',
    },
    {
      title: 'Eigene Wortliste mit Texthinweisen',
      description: 'Geben Sie beliebige W\u00f6rter mit textbasierten Hinweisbeschreibungen f\u00fcr fachspezifische Kreuzwortr\u00e4tsel ein. Erstellen Sie Naturwissenschafts-Vokabelr\u00e4tsel, Sachkunde-\u00dcbungen, Fremdsprachen\u00fcbungen oder eigene Rechtschreibleisten. Die Auto-Layout-Engine \u00fcbernimmt die Wortplatzierung.',
    },
    {
      title: 'Drag-and-Drop manuelle Bearbeitung',
      description: 'Passen Sie nach der automatischen Generierung Wortpositionen mit intuitiven Drag-and-Drop-Steuerungen an. Verschieben Sie W\u00f6rter, um \u00dcberschneidungen zu verbessern, Hinweise umzupositionieren oder das Layout zu verfeinern. Der Editor beh\u00e4lt die g\u00fcltige Kreuzwortstruktur bei.',
    },
    {
      title: 'Hoch- und Querformat',
      description: 'W\u00e4hlen Sie Hoch- oder Querformat mit automatischer Layout-Anpassung. Hochformat eignet sich f\u00fcr den Standard-Unterrichtsdruck. Querformat bietet einen breiteren Rasterbereich f\u00fcr R\u00e4tsel mit l\u00e4ngeren W\u00f6rtern.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor',
      description: 'F\u00fcgen Sie eigene Titel, Namensfelder und Anweisungen hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie thematische Rahmen an und positionieren Sie Elemente per Drag-and-Drop. Ebenensteuerung, Ausrichtungswerkzeuge, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelles Design.',
    },
    {
      title: 'Automatischer L\u00f6sungsschl\u00fcssel',
      description: 'Jedes Kreuzwortr\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel mit allen ausgef\u00fcllten W\u00f6rtern im Raster. Der L\u00f6sungsschl\u00fcssel entspricht exakt dem R\u00e4tsel-Layout und erm\u00f6glicht einfache Korrektur und Selbstkontrolle.',
    },
    {
      title: 'Doppelter Export mit Graustufen-Option',
      description: 'Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Die Graustufen-Umschaltung erzeugt Schwarz-Wei\u00df-Ausgabe f\u00fcr tintensparendes Drucken. R\u00e4tsel und L\u00f6sungsschl\u00fcssel werden separat in voller Qualit\u00e4t exportiert.',
    },
  ],

  businessUseCases: [
    {
      title: 'Kreuzwortr\u00e4tsel-B\u00fccher f\u00fcr Amazon KDP erstellen',
      description: 'Stellen Sie 50\u2013100 thematische Kreuzwortr\u00e4tsel zu Vokabel-B\u00fcchern zusammen: \u201eTier-Kreuzwortr\u00e4tsel f\u00fcr Kinder\u201c, \u201eBild-Kreuzwortr\u00e4tsel \u2014 Lebensmittel-Ausgabe\u201c. Bildr\u00e4tsel-Kreuzworte erzeugen visuell ansprechende KDP-Vorschaubilder, die sich von reinen Text-Kreuzwortb\u00fcchern abheben.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Vokabel-Kreuzwort-Pakete auf Etsy verkaufen',
      description: 'B\u00fcndeln Sie 10\u201320 thematische Kreuzwortr\u00e4tsel als Sofort-Download-Pakete. Erstellen Sie fachspezifische Sets im Eigene-Wortliste-Modus: Naturwissenschafts-Vokabeln, Mathe-Begriffe, Sachkunde-Schl\u00fcsselw\u00f6rter. \u201eKreuzwortr\u00e4tsel druckbar\u201c und \u201eVokabel-Arbeitsbl\u00e4tter\u201c sind beliebte Etsy-Suchbegriffe.',
      platform: 'Etsy',
    },
    {
      title: 'Fachbereichs-Ressourcen f\u00fcr TPT erstellen',
      description: 'Nutzen Sie den Eigene-Wortliste-Modus f\u00fcr lehrplanorientierte Kreuzwort-Pakete zu jedem Fach. Inklusive L\u00f6sungsschl\u00fcssel, Vokabellisten und differenzierten Schwierigkeitsgraden. TPT-K\u00e4ufer suchen nach \u201eVokabel-Kreuzwort\u201c nach Fach und Klassenstufe.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Saisonale Kreuzwortr\u00e4tsel-Sammlungen gestalten',
      description: 'Nutzen Sie thematische Bilder f\u00fcr saisonale Kreuzwort-Pakete: Fr\u00fchlings-Gartenvokabeln, Sommer-Strandw\u00f6rter, Herbst-Erntebegriffe, Winter-Feiertagsr\u00e4tsel. Saisonale Vokabelr\u00e4tsel erzeugen konzentrierte Nachfrage w\u00e4hrend ihrer Saison.',
      platform: 'Multi-platform',
    },
    {
      title: 'Mehrsprachige Kreuzwort-Sets erstellen',
      description: 'Nutzen Sie die 11-Sprachen-Unterst\u00fctzung und Bildhinweise f\u00fcr Kreuzwort-Pakete f\u00fcr Sprachlernende. Bildhinweise ersetzen \u00fcbersetzte Texthinweise \u2014 Sch\u00fcler sehen das Bild und buchstabieren das Wort in ihrer Zielsprache.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Wie funktioniert das automatische Layout?',
      answer: 'Die Engine nimmt Ihre W\u00f6rter (aus Themenbildern oder einer eigenen Liste) und ordnet sie in einem verkn\u00fcpften Kreuzwortmuster an. Sie maximiert gemeinsame Buchstaben zwischen waagerechten und senkrechten Eintr\u00e4gen f\u00fcr eine korrekte Kreuzwortstruktur.',
    },
    {
      question: 'Was sind Bildhinweise?',
      answer: 'Vier thematische Bilder werden um das Kreuzwortraster positioniert. Jedes Bild ist nummeriert f\u00fcr einen waagerechten oder senkrechten Eintrag. Sch\u00fcler erkennen das Bild und schreiben dessen Namen ins Raster \u2014 visuelle Erkennung kombiniert mit Rechtschreib\u00fcbung.',
    },
    {
      question: 'Kann ich eigene W\u00f6rter statt Bilder verwenden?',
      answer: 'Ja. Der Eigene-Wortliste-Modus erlaubt die Eingabe beliebiger W\u00f6rter mit Texthinweisen. Die Auto-Layout-Engine ordnet Ihre W\u00f6rter zu einem verkn\u00fcpften Kreuzwort an. Ideal f\u00fcr fachspezifisches Vokabular, Rechtschreibleisten oder jede Sprache.',
    },
    {
      question: 'Kann ich das Layout nach der Generierung bearbeiten?',
      answer: 'Ja. Der Drag-and-Drop-Editor erlaubt die Anpassung von Wortpositionen, \u00c4nderung von \u00dcberschneidungen und Umpositionierung von Hinweisen nach der automatischen Generierung. Der Editor beh\u00e4lt die g\u00fcltige Kreuzwortstruktur bei.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel automatisch generiert?',
      answer: 'Ja. Jedes Kreuzwortr\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel mit allen ausgef\u00fcllten W\u00f6rtern im Raster. Der L\u00f6sungsschl\u00fcssel verwendet dasselbe Layout und wird als separate Datei exportiert.',
    },
    {
      question: 'Wie viele Bildthemen sind verf\u00fcgbar?',
      answer: 'Das Full Access Paket enth\u00e4lt alle 104 Bildthemen. Das Commercial Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen den Eigene-Wortliste-Modus und eigene Bild-Uploads.',
    },
    {
      question: 'Kann ich die erstellten Kreuzwortr\u00e4tsel kommerziell nutzen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers und jeder anderen Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Kreuzwort-Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang zu neuen Inhalten und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich den Generator vor dem Kauf testen?',
      answer: 'Ja. Sowohl Bildhinweis- als auch Eigene-Wortliste-Modus funktionieren in der kostenlosen Version. Der einzige Unterschied ist ein Wasserzeichen auf exportierten Dateien. Keine Anmeldung erforderlich.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Der Eigene-Wortliste-Modus funktioniert mit jeder Sprache, da Sie die W\u00f6rter selbst eingeben.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Finden & Z\u00e4hlen Generator' },
    { slug: 'find-objects', pageType: 'app', anchorText: 'Objekte Finden Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Schatzsuche Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Wortsuche Generator' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Buchstabensalat Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Wortr\u00e4tsel Generator' },
    { slug: 'crossword', pageType: 'tool', anchorText: 'Kreuzwortr\u00e4tsel-Generator kostenlos testen' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Suchen & Finden Bundle \u2014 Sparen Sie bei allen Such-Generatoren' },
    { slug: 'create-crossword-books', pageType: 'guide', anchorText: 'Kreuzwortr\u00e4tsel-B\u00fccher erstellen' },
    { slug: 'word-puzzle-ideas', pageType: 'idea', anchorText: 'Wortr\u00e4tsel Druckvorlagen-Ideen' },
  ],
};`,
  },

  'find-and-count': {
    category: 'search',
    content: `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'find-and-count',
  locale: 'de',
  category: 'search',

  seo: {
    titleTag: 'Finden & Z\u00e4hlen Generator | I Spy Arbeitsbl\u00e4tter Gratis',
    metaDescription: 'Erstellen Sie I Spy Z\u00e4hl-Arbeitsbl\u00e4tter mit drei Modi: Manuell, Auto, Buchstabenerkennung. Raster 5\u201310, 1\u20134 versteckte Objekte. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'I Spy Arbeitsblatt Generator',
    secondaryKeywords: [
      'Finden und Z\u00e4hlen Arbeitsbl\u00e4tter',
      'I Spy druckbar',
      'Z\u00e4hl-Arbeitsblatt Generator',
      'versteckte Objekte Arbeitsbl\u00e4tter',
      'Suchen und Z\u00e4hlen Aktivit\u00e4ten',
    ],
    lsiKeywords: [
      'Z\u00e4hl\u00fcbungen f\u00fcr Kinder',
      'visuelles Scannen Arbeitsbl\u00e4tter',
      'Beobachtungsf\u00e4higkeiten Aktivit\u00e4ten',
      'Zahlenerkennung \u00dcbung',
      'I Spy B\u00fccher druckbar',
      'Z\u00e4hlspiele Vorschule',
      'Suchbilder Arbeitsbl\u00e4tter',
      'visuelle Aufmerksamkeit \u00dcbungen',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find and count/I Spy 1.jpeg',
      primaryAlt: 'I Spy Z\u00e4hl-Arbeitsblatt mit einem Bildraster und Z\u00e4hlaufgaben darunter',
      secondary: '/samples/english/find and count/I Spy 2.jpeg',
      secondaryAlt: 'I Spy L\u00f6sungsschl\u00fcssel mit eingekreisten Zielobjekten im Raster',
    },
    sampleGallery: [
      { src: '/samples/english/find and count/I Spy 3.jpeg', alt: 'I Spy Arbeitsblatt im Auto-Modus mit Tier-Thema und Z\u00e4hlfeldern', caption: 'Auto-Modus mit Z\u00e4hlaufgaben' },
      { src: '/samples/english/find and count/I Spy 4.jpeg', alt: 'I Spy Arbeitsblatt im manuellen Modus mit eigener Bildplatzierung', caption: 'Manueller Modus \u2014 eigenes Layout' },
      { src: '/samples/english/find and count/I Spy 5.jpeg', alt: 'Buchstabenerkennungs-Modus mit versteckten Buchstaben im Bildraster', caption: 'Buchstabenerkennungs-Modus' },
      { src: '/samples/english/find and count/I Spy 6.jpeg', alt: 'I Spy Arbeitsblatt mit 10\u00d710 Raster und mehreren versteckten Objekten', caption: '10\u00d710 Raster mit 4 Zielobjekten' },
      { src: '/samples/english/find and count/I Spy 7.jpeg', alt: 'I Spy Arbeitsblatt mit thematischem Rahmen und Lebensmittelbildern', caption: 'Thematisches Rahmendesign' },
      { src: '/samples/english/find and count/I Spy 8.jpeg', alt: 'I Spy L\u00f6sungsschl\u00fcssel mit allen eingekreisten und gez\u00e4hlten versteckten Objekten', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '0cOPi7eajLs',
    videoTitle: 'So erstellen Sie I Spy Z\u00e4hl-Arbeitsbl\u00e4tter',
  },

  hero: {
    title: 'Finden & Z\u00e4hlen Generator',
    tagline: 'I Spy Z\u00e4hl-Arbeitsbl\u00e4tter, die visuelles Scannen mit Zahlenkompetenz verbinden',
    description: \`I Spy Arbeitsbl\u00e4tter geh\u00f6ren zu den beliebtesten druckbaren Produkten f\u00fcr junge Kinder, weil sie den Reiz eines Suchspiels mit echtem Z\u00e4hl\u00fcben verbinden. Der Finden & Z\u00e4hlen Generator erstellt professionelle I Spy Arbeitsbl\u00e4tter, bei denen Sch\u00fcler ein Raster mit Bildern durchsuchen, um bestimmte Zielobjekte zu finden und zu z\u00e4hlen. Das Raster f\u00fcllt sich mit thematischen Bildern und darunter erscheinen Z\u00e4hlaufgaben, die Sch\u00fcler auffordern, jedes Ziel zu finden und zusammenzuz\u00e4hlen.

Drei Generierungsmodi bieten unterschiedliche Kontrollstufen. Der Auto-Modus generiert das gesamte Raster automatisch aus einem gew\u00e4hlten Thema \u2014 w\u00e4hlen Sie Tierbilder und der Generator f\u00fcllt ein Raster mit gemischten Tieren und erstellt Z\u00e4hlaufgaben f\u00fcr bestimmte davon. Der Manuelle Modus erlaubt das Platzieren jedes einzelnen Bildes f\u00fcr pr\u00e4zise Kontrolle \u00fcber Platzierung und Schwierigkeit. Der Buchstabenerkennungs-Modus versteckt Alphabetbuchstaben im Bildraster und kombiniert Buchstabenerkennung mit der visuellen Such-Herausforderung.

Die Rastergr\u00f6\u00dfe reicht von 5 bis 10 Zeilen und 5 bis 10 Spalten und erzeugt Arbeitsbl\u00e4tter mit 25 bis 100 Feldern. Sie legen zwischen 1 und 4 versteckte Zielobjekte zum Finden und Z\u00e4hlen fest. Verschiedene Aufgabentypen f\u00fcr jedes Bild halten das Format abwechslungsreich. Der L\u00f6sungsschl\u00fcssel kreist alle Zielobjekte im Raster ein und zeigt die korrekten Anzahlen.

Der vollst\u00e4ndige Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Export als JPEG f\u00fcr digitale Aufgaben oder PDF f\u00fcr druckfertige Arbeitsbl\u00e4tter. Eine Graustufen-Umschaltung erzeugt tintensparende Versionen. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung, mit nur einem kleinen Wasserzeichen.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein I Spy Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'Generierungsmodus w\u00e4hlen',
        description: 'W\u00e4hlen Sie den Auto-Modus f\u00fcr schnelle Generierung aus einem Thema, den manuellen Modus f\u00fcr pr\u00e4zise Bildplatzierung oder den Buchstabenerkennungs-Modus, um Buchstaben im Raster zu verstecken. Jeder Modus erzeugt eine andere Such-und-Z\u00e4hl-Erfahrung.',
      },
      {
        title: 'Bildthema ausw\u00e4hlen',
        description: 'Durchsuchen Sie 104 Bildthemen \u2014 Tiere, Lebensmittel, Fahrzeuge, Natur und mehr. Im Auto-Modus f\u00fcllt das Thema das Raster automatisch. Im manuellen Modus w\u00e4hlen Sie einzelne Bilder f\u00fcr jedes Feld.',
      },
      {
        title: 'Rastergr\u00f6\u00dfe konfigurieren',
        description: 'Stellen Sie Zeilen von 5 bis 10 und Spalten von 5 bis 10 ein. Kleinere Raster (5\u00d75) eignen sich f\u00fcr Vorschulkinder. Gr\u00f6\u00dfere Raster (10\u00d710) fordern \u00e4ltere Sch\u00fcler mit 100 Bildern zum Durchsuchen heraus.',
      },
      {
        title: 'Zielobjekte festlegen',
        description: 'W\u00e4hlen Sie 1 bis 4 Zielobjekte, die Sch\u00fcler im Raster finden und z\u00e4hlen m\u00fcssen. Mehr Ziele erzeugen l\u00e4ngere Arbeitsbl\u00e4tter mit mehreren Z\u00e4hlaufgaben. Der Generator variiert die Aufgabenformulierung f\u00fcr jedes Ziel.',
      },
      {
        title: 'Arbeitsblatt und L\u00f6sung exportieren',
        description: 'Laden Sie das I Spy Arbeitsblatt und seinen L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel kreist alle Zielobjekte ein und zeigt korrekte Anzahlen. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck umschalten.',
      },
    ],
  },

  features: [
    {
      title: 'Drei Generierungsmodi',
      description: 'Der Auto-Modus f\u00fcllt das Raster automatisch aus einem Thema f\u00fcr schnelle Erstellung. Der manuelle Modus gibt pr\u00e4zise Kontrolle \u00fcber jedes Feld. Der Buchstabenerkennungs-Modus versteckt Alphabetbuchstaben im Bildraster f\u00fcr kombinierte Buchstaben- und visuelle Such\u00fcbung.',
    },
    {
      title: 'Anpassbares Raster (5\u00d75 bis 10\u00d710)',
      description: 'Stellen Sie Zeilen und Spalten unabh\u00e4ngig von 5 bis 10 ein und erzeugen Raster von 25 bis 100 Feldern. Kleine Raster eignen sich f\u00fcr Vorschul-Z\u00e4hl\u00fcbungen. Gro\u00dfe Raster fordern \u00e4ltere Sch\u00fcler mit dichten visuellen Suchaufgaben heraus.',
    },
    {
      title: 'Mehrere Zielobjekte (1\u20134)',
      description: 'Legen Sie zwischen 1 und 4 versteckte Objekte fest, die Sch\u00fcler finden und z\u00e4hlen sollen. Ein einzelnes Ziel erzeugt eine fokussierte Suchaufgabe. Mehrere Ziele erweitern das Arbeitsblatt mit verschiedenen Z\u00e4hl-Herausforderungen.',
    },
    {
      title: 'Aufgabentyp-Variationen',
      description: 'Der Generator erstellt variierende Formulierungen f\u00fcr jede Z\u00e4hlaufgabe und h\u00e4lt das Format \u00fcber die \u00dcbungen hinweg abwechslungsreich. Verschiedene Fragestile halten das Engagement der Sch\u00fcler aufrecht.',
    },
    {
      title: '104 Bildthemen',
      description: 'Jedes Thema bietet illustrierte Elemente, die das Raster f\u00fcllen. Tiere, Lebensmittel, Fahrzeuge, Natur, Sport und saisonale Themen richten Arbeitsbl\u00e4tter an Unterrichtsthemen aus. Die Themenbibliothek sorgt f\u00fcr endlose Vielfalt.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor',
      description: 'F\u00fcgen Sie eigene Titel, Namensfelder und Anweisungen hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie thematische Rahmen an und positionieren Sie Elemente per Drag-and-Drop. Ebenensteuerung, Ausrichtungswerkzeuge, Zoom und R\u00fcckg\u00e4ngig f\u00fcr komplette Designkontrolle.',
    },
    {
      title: 'L\u00f6sungsschl\u00fcssel mit eingekreisten Zielen',
      description: 'Jedes Arbeitsblatt generiert einen L\u00f6sungsschl\u00fcssel, der alle Zielobjekte im Raster einkreist und die korrekte Anzahl f\u00fcr jedes anzeigt. Das visuelle Einkreisen erm\u00f6glicht sofortige Korrektur und Selbstkontrolle.',
    },
    {
      title: 'Doppelter Export mit Graustufen-Option',
      description: 'Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Die Graustufen-Umschaltung erzeugt Schwarz-Wei\u00df-Ausgabe f\u00fcr tintensparendes Drucken. Arbeitsblatt und L\u00f6sungsschl\u00fcssel werden separat in voller Qualit\u00e4t exportiert.',
    },
  ],

  businessUseCases: [
    {
      title: 'I Spy Aktivit\u00e4tenb\u00fccher f\u00fcr Amazon KDP erstellen',
      description: 'Stellen Sie 50\u2013100 I Spy Z\u00e4hl-Arbeitsbl\u00e4tter zu thematischen B\u00fcchern zusammen: \u201eI Spy Tiere\u201c, \u201eFinden und Z\u00e4hlen \u2014 Lebensmittel-Ausgabe\u201c. I Spy B\u00fccher sind eine bew\u00e4hrte KDP-Kategorie mit konstanter Nachfrage. Das bildreiche Format erzeugt ansprechende Vorschaubilder.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Z\u00e4hl-Arbeitsblatt-Pakete auf Etsy verkaufen',
      description: 'B\u00fcndeln Sie 15\u201320 I Spy Arbeitsbl\u00e4tter als Sofort-Download-Pakete. Bieten Sie Schwierigkeitsstufen nach Rastergr\u00f6\u00dfe: Leicht (5\u00d75), Mittel (7\u00d77), Schwer (10\u00d710). \u201eI Spy druckbar\u201c und \u201eZ\u00e4hl-Arbeitsbl\u00e4tter\u201c sind beliebte Etsy-Suchbegriffe.',
      platform: 'Etsy',
    },
    {
      title: 'Z\u00e4hl-Ressourcen f\u00fcr TPT erstellen',
      description: 'Erstellen Sie lehrplanorientierte I Spy Pakete f\u00fcr Z\u00e4hlstandards. Inklusive Erfassungsb\u00f6gen, Fortschrittstracker und differenzierte Arbeitsbl\u00e4tter nach Rastergr\u00f6\u00dfe und Zielanzahl. TPT-Vorschul- und Kindergartenlehrer suchen nach \u201eI Spy Lernstationen\u201c und \u201eZ\u00e4hlaktivit\u00e4ten\u201c.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Saisonale I Spy Sammlungen gestalten',
      description: 'Nutzen Sie thematische Bilder f\u00fcr saisonale I Spy Pakete: Fr\u00fchlingsgarten-I-Spy, Sommer-Strand-Z\u00e4hlen, Herbst-Ernte-Finden-und-Z\u00e4hlen, Winter-Feiertags-Suchbilder. Saisonale Produkte erzeugen konzentrierte Nachfrage.',
      platform: 'Multi-platform',
    },
    {
      title: 'Z\u00e4hlf\u00e4higkeiten-Programm erstellen',
      description: 'Strukturieren Sie Arbeitsbl\u00e4tter zu einem progressiven Programm: Beginnen Sie mit 5\u00d75-Rastern und 1 Ziel, steigern Sie zu 10\u00d710-Rastern mit 4 Zielen. Inklusive Buchstabenerkennungs-Arbeitsbl\u00e4tter. Verpacken Sie es als 12-Wochen Z\u00e4hl- und Beobachtungscurriculum.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Welche drei Generierungsmodi gibt es?',
      answer: 'Der Auto-Modus f\u00fcllt das Raster automatisch aus einem gew\u00e4hlten Thema. Der manuelle Modus erlaubt das Platzieren jedes Bildes einzeln f\u00fcr pr\u00e4zise Kontrolle. Der Buchstabenerkennungs-Modus versteckt Alphabetbuchstaben im Bildraster f\u00fcr kombinierte Buchstaben- und Z\u00e4hl\u00fcbung.',
    },
    {
      question: 'Wie gro\u00df kann das Raster sein?',
      answer: 'Stellen Sie Zeilen und Spalten unabh\u00e4ngig von 5 bis 10 ein und erzeugen Raster von 5\u00d75 (25 Feldern) bis 10\u00d710 (100 Feldern). Kleinere Raster eignen sich f\u00fcr Vorschulkinder. Gr\u00f6\u00dfere Raster fordern \u00e4ltere Sch\u00fcler heraus.',
    },
    {
      question: 'Wie viele Zielobjekte kann ich festlegen?',
      answer: 'Sie k\u00f6nnen zwischen 1 und 4 Zielobjekte pro Arbeitsblatt festlegen. Jedes Ziel erh\u00e4lt eine eigene Z\u00e4hlaufgabe. Mehr Ziele erzeugen l\u00e4ngere Arbeitsbl\u00e4tter mit mehreren Such-und-Z\u00e4hl-\u00dcbungen.',
    },
    {
      question: 'Wie funktioniert der L\u00f6sungsschl\u00fcssel?',
      answer: 'Der L\u00f6sungsschl\u00fcssel kreist alle Instanzen jedes Zielobjekts im Raster ein und zeigt die korrekte Anzahl darunter. Dies erm\u00f6glicht sofortige Korrektur und hilft Sch\u00fclern bei der Selbstkontrolle.',
    },
    {
      question: 'Was ist der Buchstabenerkennungs-Modus?',
      answer: 'Der Buchstabenerkennungs-Modus versteckt Alphabetbuchstaben im Bildraster. Sch\u00fcler suchen bestimmte Buchstaben und z\u00e4hlen, wie oft jeder vorkommt. Er kombiniert Buchstabenerkennungs-\u00dcbung mit der visuellen Suchherausforderung von I Spy.',
    },
    {
      question: 'Wie viele Bildthemen sind verf\u00fcgbar?',
      answer: 'Das Full Access Paket enth\u00e4lt alle 104 Bildthemen. Das Commercial Paket enth\u00e4lt beliebte Themen. Beide erlauben eigene Bild-Uploads f\u00fcr individualisierte Arbeitsbl\u00e4tter.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell nutzen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers und jeder anderen Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Finden-und-Z\u00e4hlen-Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich den Generator vor dem Kauf testen?',
      answer: 'Ja. Alle Modi, Rastergr\u00f6\u00dfen und Themen funktionieren in der kostenlosen Version. Der einzige Unterschied ist ein Wasserzeichen auf exportierten Dateien. Testen Sie alles, bevor Sie kaufen.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Bildbasierte I Spy Inhalte funktionieren sprachunabh\u00e4ngig.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'find-objects', pageType: 'app', anchorText: 'Objekte Finden Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Kreuzwortr\u00e4tsel Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Schatzsuche Generator' },
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was Passt Nicht Generator' },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen Generator' },
    { slug: 'find-and-count', pageType: 'tool', anchorText: 'Finden & Z\u00e4hlen Generator kostenlos testen' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Suchen & Finden Bundle \u2014 Sparen Sie bei allen Such-Generatoren' },
    { slug: 'create-i-spy-books', pageType: 'guide', anchorText: 'I Spy B\u00fccher erstellen' },
    { slug: 'counting-printable-ideas', pageType: 'idea', anchorText: 'Z\u00e4hl-Druckvorlagen Nischen-Ideen' },
  ],
};`,
  },
};

// I'll add the remaining apps inline to keep the script self-contained
// The script continues with all 13 apps

const allApps = {};

// Copy already defined ones
Object.assign(allApps, apps);

// Now define the remaining 10 apps
allApps['find-objects'] = {
  content: `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'find-objects',
  locale: 'de',
  category: 'search',

  seo: {
    titleTag: 'Objekte Finden Generator | I Spy & Was Passt Nicht Gratis',
    metaDescription: 'Erstellen Sie I Spy und Was-Passt-Nicht Sucharbeitsbl\u00e4tter. I Spy: 8\u201312 Ablenkungen, 1\u20135 versteckte. Was Passt Nicht: 8\u201312 Paare, 1\u20133 ungerade. Kostenloser Generator mit PDF.',
    primaryKeyword: 'Objekte Finden Arbeitsblatt Generator',
    secondaryKeywords: [
      'I Spy versteckte Objekte',
      'Suchbild Arbeitsbl\u00e4tter',
      'versteckte Objekte R\u00e4tsel Generator',
      'Suchen und Finden Arbeitsbl\u00e4tter',
      'visuelle Such-R\u00e4tsel',
    ],
    lsiKeywords: [
      'versteckte Objekte Aktivit\u00e4ten',
      'visuelle Wahrnehmung Arbeitsbl\u00e4tter',
      'Beobachtungsspiele f\u00fcr Kinder',
      'Suchbilder druckbar',
      'Aufmerksamkeitstraining',
      'visuelles Scannen \u00dcbungen',
      'Such-Arbeitsbl\u00e4tter druckbar',
      'verstecktes Bild finden',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find objects/spotworks_worksheet (1).jpeg',
      primaryAlt: 'I Spy Arbeitsblatt mit versteckten Objekten zwischen Ablenkungen in einer thematischen Szene',
      secondary: '/samples/english/find objects/spotworks_worksheet (2).jpeg',
      secondaryAlt: 'Objekte-Finden L\u00f6sungsschl\u00fcssel mit eingekreisten und beschrifteten versteckten Elementen',
    },
    sampleGallery: [
      { src: '/samples/english/find objects/spotworks_worksheet (3).jpeg', alt: 'I Spy Modus mit Tier-Ablenkungen und versteckten Lebensmitteln', caption: 'I Spy Modus \u2014 versteckte Objekte finden' },
      { src: '/samples/english/find objects/spotworks_worksheet (4).jpeg', alt: 'Was-Passt-Nicht Modus mit gepaarten Bildern und ungepaarten Elementen', caption: 'Was-Passt-Nicht Modus \u2014 ungepaarte finden' },
      { src: '/samples/english/find objects/spotworks_worksheet (5).jpeg', alt: 'I Spy Arbeitsblatt mit 12 Ablenkungen und 5 versteckten Objekten', caption: 'Dichtes Layout mit 5 versteckten Elementen' },
      { src: '/samples/english/find objects/spotworks_worksheet (6).jpeg', alt: 'Objekte-Finden Arbeitsblatt mit thematischem Rahmen und Naturbildern', caption: 'Natur-Thema mit Rahmen' },
      { src: '/samples/english/find objects/spotworks_worksheet (7).jpeg', alt: 'Was-Passt-Nicht Arbeitsblatt mit 12 gepaarten Elementen und 3 ungeraden', caption: '12 Paare mit 3 ungeraden Elementen' },
      { src: '/samples/english/find objects/spotworks_worksheet (8).jpeg', alt: 'Objekte-Finden L\u00f6sungsschl\u00fcssel mit allen markierten Zielen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'So erstellen Sie Objekte-Finden Sucharbeitsbl\u00e4tter',
  },

  hero: {
    title: 'Objekte Finden Generator',
    tagline: 'Zwei Suchmodi, die visuelle Wahrnehmung herausfordern \u2014 versteckte Elemente finden oder das ungepaarte Objekt erkennen',
    description: \`Visuelle Suchaktivit\u00e4ten geh\u00f6ren zu den wirksamsten Werkzeugen f\u00fcr die Entwicklung von Aufmerksamkeit, Beobachtungsf\u00e4higkeit und visueller Wahrnehmung. Der Objekte Finden Generator erstellt zwei grunds\u00e4tzlich verschiedene Such-R\u00e4tseltypen in einem Werkzeug: Der I Spy Modus versteckt Zielobjekte zwischen Ablenkungsbildern, w\u00e4hrend der Was-Passt-Nicht Modus ungepaarte Elemente unter Paaren verstreut, die Sch\u00fcler identifizieren m\u00fcssen.

Im I Spy Modus legen Sie zwischen 8 und 12 Ablenkungsbilder fest, die die Szene f\u00fcllen. Dann werden 1 bis 5 versteckte Zielobjekte zwischen den Ablenkungen platziert. Sch\u00fcler scannen das gesamte Feld, um jedes versteckte Element zu finden. Die Ziele stammen aus einem anderen Thema als die Ablenkungen und schaffen eine kategoriebasierte Suchherausforderung. Sie k\u00f6nnen Themen manuell w\u00e4hlen oder den Generator f\u00fcr schnelle Erstellung automatisch w\u00e4hlen lassen.

Der Was-Passt-Nicht Modus funktioniert anders. Er platziert 8 bis 12 gepaarte Bilder \u2014 jedes Bild erscheint genau zweimal \u2014 plus 1 bis 3 ungerade Elemente ohne Partner. Sch\u00fcler m\u00fcssen herausfinden, welche Elemente nur einmal vorkommen. Dies erfordert eine andere kognitive Strategie: Statt nach einem bestimmten Ziel zu suchen, m\u00fcssen Sch\u00fcler verfolgen, welche Elemente sie bereits gesehen haben, und die ohne Partner identifizieren.

Beide Modi nutzen die 104-Themen-Bildbibliothek f\u00fcr visuell reichhaltige Szenen. Jedes Arbeitsblatt generiert einen L\u00f6sungsschl\u00fcssel, der alle Zielobjekte einkreist (I Spy) oder alle ungepaarten Elemente markiert (Was Passt Nicht). Der Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein Objekte-Finden Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'Suchmodus w\u00e4hlen',
        description: 'W\u00e4hlen Sie den I Spy Modus, um Zielobjekte zwischen Ablenkungen zu verstecken, oder den Was-Passt-Nicht Modus, um ungepaarte Elemente unter Paaren zu verstreuen. Jeder Modus entwickelt unterschiedliche visuelle Suchstrategien.',
      },
      {
        title: 'Bildthemen ausw\u00e4hlen',
        description: 'W\u00e4hlen Sie Themen f\u00fcr die Hauptszene und die Ziel-/ungeraden Elemente. Im I Spy Modus stammen Ablenkungen aus einem Thema und versteckte Objekte aus einem anderen. Im Was-Passt-Nicht Modus k\u00f6nnen gepaarte und ungerade Elemente dasselbe oder verschiedene Themen nutzen.',
      },
      {
        title: 'Objektanzahlen konfigurieren',
        description: 'Im I Spy Modus: 8\u201312 Ablenkungen und 1\u20135 versteckte Objekte. Im Was-Passt-Nicht Modus: 8\u201312 gepaarte Bilder und 1\u20133 ungerade Elemente. Mehr Objekte erzeugen dichtere, anspruchsvollere Szenen.',
      },
      {
        title: 'Layout anpassen',
        description: 'Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfeld und Anweisungen. Wenden Sie thematische Hintergr\u00fcnde und Rahmen an. Positionieren Sie Elemente per Drag-and-Drop f\u00fcr ein professionelles Design.',
      },
      {
        title: 'Arbeitsblatt und L\u00f6sung exportieren',
        description: 'Laden Sie das Sucharbeitsblatt und seinen L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel kreist alle Ziele ein oder markiert alle ungeraden Elemente. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck umschalten.',
      },
    ],
  },

  features: [
    {
      title: 'Zwei Suchmodi: I Spy und Was Passt Nicht',
      description: 'Der I Spy Modus versteckt 1\u20135 Zielobjekte zwischen 8\u201312 Ablenkungen \u2014 Sch\u00fcler finden bestimmte Elemente in einer vollen Szene. Der Was-Passt-Nicht Modus platziert 1\u20133 ungepaarte Elemente unter 8\u201312 Paaren \u2014 Sch\u00fcler identifizieren, welche nur einmal vorkommen.',
    },
    {
      title: 'I Spy: Ablenkungs- und Versteckt-Objekt-Steuerung',
      description: 'Legen Sie die genaue Anzahl der Ablenkungsbilder (8\u201312) und versteckten Zielobjekte (1\u20135) fest. Mehr Ablenkungen erzeugen dichtere Szenen. Mehr versteckte Objekte verl\u00e4ngern die Suchaufgabe.',
    },
    {
      title: 'Was Passt Nicht: Paar- und Ungerade-Steuerung',
      description: 'Legen Sie die Anzahl der gepaarten Bilder (8\u201312, jedes zweimal) und ungepaarten Elemente (1\u20133) fest. Sch\u00fcler m\u00fcssen verfolgen, welche Elemente sie gesehen haben, um die ohne Partner zu identifizieren. Dies trainiert Arbeitsged\u00e4chtnis und systematisches Scannen.',
    },
    {
      title: 'Themenbasierte oder manuelle Auswahl',
      description: 'W\u00e4hlen Sie Themen f\u00fcr automatische Bildbef\u00fcllung oder w\u00e4hlen Sie jedes Bild manuell f\u00fcr pr\u00e4zise Kontrolle. Themenbasierte Auswahl erm\u00f6glicht schnelle Erstellung, manuelle Auswahl erlaubt gezielte Schwierigkeitsgrade.',
    },
    {
      title: '104 Bildthemen',
      description: 'Jedes Thema bietet illustrierte Elemente f\u00fcr Suchszenen. Tiere, Lebensmittel, Fahrzeuge, Natur, Sport und saisonale Themen erzeugen visuell reichhaltige Arbeitsbl\u00e4tter.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor',
      description: 'F\u00fcgen Sie eigene Titel, Namensfelder und Anweisungen hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie thematische Rahmen an und positionieren Sie Elemente per Drag-and-Drop. Ebenensteuerung, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelle Ergebnisse.',
    },
    {
      title: 'Automatischer L\u00f6sungsschl\u00fcssel',
      description: 'Jedes Arbeitsblatt erzeugt einen L\u00f6sungsschl\u00fcssel. Im I Spy Modus werden Zielobjekte eingekreist. Im Was-Passt-Nicht Modus werden ungepaarte Elemente markiert. Der L\u00f6sungsschl\u00fcssel entspricht dem Arbeitsblatt-Layout.',
    },
    {
      title: 'Doppelter Export mit Graustufen-Option',
      description: 'Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Die Graustufen-Umschaltung erzeugt Schwarz-Wei\u00df-Ausgabe f\u00fcr tintensparendes Drucken. Arbeitsblatt und L\u00f6sungsschl\u00fcssel werden separat exportiert.',
    },
  ],

  businessUseCases: [
    {
      title: 'Versteckte-Objekte-B\u00fccher f\u00fcr Amazon KDP erstellen',
      description: 'Stellen Sie 50\u2013100 Objekte-Finden Arbeitsbl\u00e4tter zu thematischen Such-und-Find-B\u00fcchern zusammen: \u201eI Spy Tiere\u201c, \u201eVersteckte Objekte \u2014 Lebensmittel-Ausgabe\u201c. Mischen Sie I Spy und Was-Passt-Nicht Modi f\u00fcr Abwechslung innerhalb eines Buches.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Visuelle Such-Pakete auf Etsy verkaufen',
      description: 'B\u00fcndeln Sie 15\u201320 Objekte-Finden Arbeitsbl\u00e4tter als Sofort-Download-Pakete. Erstellen Sie modusspezifische oder gemischte Pakete. \u201eVersteckte Objekte druckbar\u201c und \u201eSuchbilder Arbeitsbl\u00e4tter\u201c sind beliebte Etsy-Suchbegriffe.',
      platform: 'Etsy',
    },
    {
      title: 'Visuelle Wahrnehmungs-Ressourcen f\u00fcr TPT erstellen',
      description: 'Erstellen Sie pr\u00fcfungsgerechte visuelle Such-Pakete f\u00fcr Beobachtungs- und Wahrnehmungsf\u00e4higkeiten. Inklusive Bewertungsb\u00f6gen, Fortschrittstracking und differenzierten Arbeitsbl\u00e4ttern. TPT-K\u00e4ufer in Sonderp\u00e4dagogik und Ergotherapie suchen nach visuellen Wahrnehmungsressourcen.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Thematische Such-und-Find-Sammlungen gestalten',
      description: 'Nutzen Sie thematische Bilder f\u00fcr gezielte Suchpakete: Ozean-Suchszenen, Dschungel-versteckte-Objekte, Weltraumstation-Suchbilder. Thematische Sammlungen sprechen spezifische Interessen an.',
      platform: 'Multi-platform',
    },
    {
      title: 'Visuelles Aufmerksamkeitstraining erstellen',
      description: 'Strukturieren Sie Arbeitsbl\u00e4tter zu einem progressiven Programm: Beginnen Sie mit I Spy (wenige Ablenkungen, 1 Ziel), steigern Sie zu dichten Szenen mit 5 Zielen, dann f\u00fchren Sie den Was-Passt-Nicht Modus ein. Verpacken Sie es als 12-Wochen Curriculum.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Was ist der Unterschied zwischen I Spy und Was-Passt-Nicht Modus?',
      answer: 'Im I Spy Modus finden Sch\u00fcler bestimmte versteckte Objekte zwischen Ablenkungen. Im Was-Passt-Nicht Modus identifizieren Sch\u00fcler, welche Elemente nur einmal unter Paaren vorkommen. Jeder Modus entwickelt unterschiedliche visuelle Such- und kognitive Strategien.',
    },
    {
      question: 'Wie viele Objekte kann ich im I Spy Modus platzieren?',
      answer: 'Legen Sie zwischen 8 und 12 Ablenkungsbilder und 1 bis 5 versteckte Zielobjekte fest. Mehr Ablenkungen erzeugen dichtere Szenen. Mehr Ziele erweitern die Suchherausforderung.',
    },
    {
      question: 'Wie funktioniert der Was-Passt-Nicht Modus?',
      answer: 'Der Generator platziert 8 bis 12 Bilder in Paaren (jedes zweimal) plus 1 bis 3 ungerade Elemente ohne Partner. Sch\u00fcler m\u00fcssen die Elemente finden, die nur einmal vorkommen.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel automatisch generiert?',
      answer: 'Ja. I Spy L\u00f6sungsschl\u00fcssel kreisen alle versteckten Zielobjekte ein. Was-Passt-Nicht L\u00f6sungsschl\u00fcssel markieren alle ungepaarten Elemente. Der L\u00f6sungsschl\u00fcssel wird als separate Datei exportiert.',
    },
    {
      question: 'Wie viele Bildthemen sind verf\u00fcgbar?',
      answer: 'Das Full Access Paket enth\u00e4lt alle 104 Bildthemen. Das Commercial Paket enth\u00e4lt beliebte Themen. Beide erlauben eigene Bild-Uploads.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell nutzen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers und jeder anderen Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Objekte-Finden Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich den Generator vor dem Kauf testen?',
      answer: 'Ja. Beide Suchmodi, alle Objektanzahlen und alle Themen funktionieren in der kostenlosen Version. Der einzige Unterschied ist ein Wasserzeichen auf exportierten Dateien.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Da die Arbeitsbl\u00e4tter bildbasiert sind, funktioniert der Inhalt sprachunabh\u00e4ngig.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Finden & Z\u00e4hlen Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Kreuzwortr\u00e4tsel Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Schatzsuche Generator' },
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was Passt Nicht Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
    { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Generator' },
    { slug: 'find-objects', pageType: 'tool', anchorText: 'Objekte-Finden Generator kostenlos testen' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Suchen & Finden Bundle \u2014 Sparen Sie bei allen Such-Generatoren' },
    { slug: 'create-hidden-object-books', pageType: 'guide', anchorText: 'Versteckte-Objekte-B\u00fccher erstellen' },
    { slug: 'search-printable-ideas', pageType: 'idea', anchorText: 'Suchbild-Druckvorlagen Nischen-Ideen' },
  ],
};`
};

// Due to the massive size, I'll generate the remaining files using a helper function pattern
// Each file follows the exact same TypeScript structure

const remainingApps = {
  'grid-match': { category: 'matching', title: 'Raster-Zuordnung Generator', germanTitle: 'Raster-Zuordnung R\u00e4tsel Generator' },
  'matching': { category: 'matching', title: 'Zuordnungs-Arbeitsblatt Generator', germanTitle: 'Zuordnungs-Arbeitsblatt Generator' },
  'missing-pieces': { category: 'puzzle', title: 'Fehlende Teile R\u00e4tsel Generator', germanTitle: 'Fehlende Teile R\u00e4tsel Generator' },
  'odd-one-out': { category: 'puzzle', title: 'Was Passt Nicht Generator', germanTitle: 'Was Passt Nicht Generator' },
  'picture-path': { category: 'puzzle', title: 'Bildpfad Generator', germanTitle: 'Bildpfad & Labyrinth Generator' },
  'picture-sort': { category: 'matching', title: 'Bilder-Sortieren Generator', germanTitle: 'Bilder-Sortieren Arbeitsblatt Generator' },
  'shadow-match': { category: 'matching', title: 'Schatten-Zuordnung Generator', germanTitle: 'Schatten-Zuordnung Arbeitsblatt Generator' },
  'sudoku': { category: 'puzzle', title: 'Sudoku Generator', germanTitle: 'Sudoku Generator' },
  'treasure-hunt': { category: 'search', title: 'Schatzsuche Generator', germanTitle: 'Schatzsuche Generator' },
};

// Generate grid-match
allApps['grid-match'] = { content: generateGridMatch() };
allApps['matching'] = { content: generateMatching() };
allApps['missing-pieces'] = { content: generateMissingPieces() };
allApps['odd-one-out'] = { content: generateOddOneOut() };
allApps['picture-path'] = { content: generatePicturePath() };
allApps['picture-sort'] = { content: generatePictureSort() };
allApps['shadow-match'] = { content: generateShadowMatch() };
allApps['sudoku'] = { content: generateSudoku() };
allApps['treasure-hunt'] = { content: generateTreasureHunt() };

function generateGridMatch() {
  return `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'grid-match',
  locale: 'de',
  category: 'matching',

  seo: {
    titleTag: 'Raster-Zuordnung Generator | Raster-R\u00e4tsel Gratis Erstellen',
    metaDescription: 'Erstellen Sie druckbare Raster-Zuordnungsr\u00e4tsel mit Hinweisfeldern und visueller R\u00fcckmeldung. 2\u00d72 bis 4\u00d74 Raster, 104 Themen, L\u00f6sungsschl\u00fcssel. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Raster-Zuordnung R\u00e4tsel Generator',
    secondaryKeywords: [
      'Raster-R\u00e4tsel f\u00fcr Kinder',
      'druckbare Raster-R\u00e4tsel',
      'Raster-R\u00e4tsel Arbeitsblatt Maker',
      'visuelle Raster-Zuordnung',
      'Raster-Logik-R\u00e4tsel',
    ],
    lsiKeywords: [
      'rasterbasierte R\u00e4tsel',
      'r\u00e4umliches Denken Arbeitsbl\u00e4tter',
      'Hinweisfeld-R\u00e4tsel',
      'visuelle Logik Aktivit\u00e4ten',
      'Muster-Zuordnung Raster',
      'kritisches Denken Arbeitsbl\u00e4tter',
      'kognitive F\u00e4higkeiten R\u00e4tsel',
      'Fr\u00fchf\u00f6rderung Raster-Aktivit\u00e4ten',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/grid match/Grid Match (1).jpeg',
      primaryAlt: 'Raster-Zuordnungsr\u00e4tsel mit bunten Bildhinweisen und leeren Feldern zum L\u00f6sen',
    },
    sampleGallery: [
      { src: '/samples/english/grid match/Grid Match (1).jpeg', alt: 'Raster-Zuordnungsr\u00e4tsel mit Tier-Thema und Hinweisfeldern auf einem quadratischen Raster', caption: 'Tier-Thema Rasterr\u00e4tsel' },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'So erstellen Sie Raster-Zuordnungsr\u00e4tsel mit Bildern',
  },

  hero: {
    title: 'Raster-Zuordnung R\u00e4tsel Generator',
    tagline: 'Rasterbasierte Zuordnungsr\u00e4tsel, die r\u00e4umliches Denken und logisches Schlie\u00dfen f\u00f6rdern',
    description: \`Raster-Zuordnungsr\u00e4tsel fordern Sch\u00fcler heraus, ein Raster auszuf\u00fcllen, indem sie Bildhinweisfelder nutzen, um zu erschlie\u00dfen, was in jedes leere Feld geh\u00f6rt. Anders als einfache Linienzuordnungs-Aktivit\u00e4ten erfordern Rasterr\u00e4tsel r\u00e4umliches Denken, Mustererkennung und Ausschlusslogik \u2014 F\u00e4higkeiten, die direkt auf Mathematik und Naturwissenschaften \u00fcbertragbar sind. Dieser Generator produziert professionelle Raster-Zuordnungsr\u00e4tsel in Sekunden, komplett mit Hinweisfeldern, visueller R\u00fcckmeldung bei falschen Antworten und automatisch generierten L\u00f6sungsschl\u00fcsseln.

W\u00e4hlen Sie Ihre Rastergr\u00f6\u00dfe von 2\u00d72 bis 4\u00d74 \u2014 immer ein perfektes Quadrat \u2014 und legen Sie die Anzahl der Hinweisfelder von 1 bis 5 fest. Hinweisfelder zeigen bereits platzierte Bilder und geben Sch\u00fclern Ausgangsinformationen. Weniger Hinweisfelder bedeuten schwierigere R\u00e4tsel, da Sch\u00fcler mehr Positionen durch reine Logik erschlie\u00dfen m\u00fcssen. Die visuelle Feld-R\u00fcckmeldung hebt falsche Antworten hervor und macht die R\u00e4tsel selbstkorrigierend.

Der Generator greift auf 104 professionell illustrierte Bildthemen zu \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur, Sport und Dutzende mehr. Jedes Thema bietet klare, erkennbare Bilder, die perfekt in Rasterfeld-Gr\u00f6\u00dfe funktionieren. Der integrierte Canvas-Editor erlaubt die Anpassung von Farben, Schriftarten, Rahmen und Positionierung vor dem Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Jedes R\u00e4tsel enth\u00e4lt einen automatisch generierten L\u00f6sungsschl\u00fcssel.

Ob Sie kritisches Denken im Unterricht f\u00f6rdern, R\u00e4tselb\u00fccher f\u00fcr Amazon KDP erstellen oder p\u00e4dagogische Druckvorlagen auf Etsy verkaufen \u2014 der Raster-Zuordnung Generator produziert einzigartigen, ansprechenden Inhalt. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 testen Sie jede Rastergr\u00f6\u00dfe und Themenkombination ohne Anmeldung.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie Ihr Raster-Zuordnungsr\u00e4tsel in 5 Schritten',
    steps: [
      { title: 'Rastergr\u00f6\u00dfe w\u00e4hlen', description: 'W\u00e4hlen Sie ein Raster von 2\u00d72 (4 Felder) bis 4\u00d74 (16 Felder). Alle Raster sind perfekte Quadrate. Kleinere Raster eignen sich f\u00fcr j\u00fcngere Kinder. Gr\u00f6\u00dfere Raster bieten eine echte Logik-Herausforderung.' },
      { title: 'Anzahl der Hinweisfelder festlegen', description: 'W\u00e4hlen Sie, wie viele Felder mit Bildern vorausgef\u00fcllt starten, von 1 bis 5. Mehr Hinweisfelder machen das R\u00e4tsel einfacher. Weniger Hinweisfelder erh\u00f6hen die Schwierigkeit und erfordern tieferes logisches Denken.' },
      { title: 'Thema und Layout w\u00e4hlen', description: 'Durchsuchen Sie 104 nach Kategorie sortierte Bildthemen. W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator weist Bilder aus Ihrem gew\u00e4hlten Thema den Rasterpositionen zu.' },
      { title: 'Im Canvas-Editor anpassen', description: 'Verfeinern Sie Ihr R\u00e4tsel mit dem integrierten Editor. F\u00fcgen Sie eigene Titel oder Anweisungen hinzu, \u00e4ndern Sie Raster- und Hintergrundfarben, wenden Sie Rahmen an und nutzen Sie Zoom-, R\u00fcckg\u00e4ngig- und Ebenensteuerungen.' },
      { title: 'Exportieren und Drucken', description: 'Laden Sie Ihr fertiges Rasterr\u00e4tsel als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Der Generator erstellt einen L\u00f6sungsschl\u00fcssel als separate Datei. Beide sind sofort druck- oder verteilbar.' },
    ],
  },

  features: [
    { title: 'Skalierbare Rastergr\u00f6\u00dfen von 2\u00d72 bis 4\u00d74', description: 'Jedes Raster ist ein perfektes Quadrat, von einem einfachen 2\u00d72 mit 4 Feldern bis zu einem anspruchsvollen 4\u00d74 mit 16 Feldern. Das 2\u00d72-Raster f\u00fchrt das Konzept f\u00fcr Vorschulkinder ein. Das 3\u00d73-Raster passt f\u00fcr Kindergarten und 1. Klasse. Das 4\u00d74-Raster fordert \u00e4ltere Sch\u00fcler heraus.' },
    { title: 'Einstellbare Hinweisfeld-Anzahl (1\u20135)', description: 'Steuern Sie die R\u00e4tsel-Schwierigkeit, indem Sie festlegen, wie viele Felder mit Bildern vorausgef\u00fcllt starten. F\u00fcnf Hinweisfelder auf einem 4\u00d74-Raster sind perfekt f\u00fcr Anf\u00e4nger. Ein Hinweisfeld auf demselben Raster erzeugt eine echte Logik-Herausforderung.' },
    { title: 'Visuelle R\u00fcckmeldung bei falschen Antworten', description: 'Bei digitaler Nutzung l\u00f6sen falsche Platzierungen visuelle Feld-R\u00fcckmeldung aus, die Fehler sofort hervorhebt. Diese selbstkorrigierende Funktion l\u00e4sst Sch\u00fcler aus Fehlern lernen, ohne auf Lehrer\u00fcberpr\u00fcfung zu warten.' },
    { title: '104 illustrierte Bildthemen', description: 'Jedes Thema bietet professionell gezeichnete Bilder, die auch in Rasterfeld-Gr\u00f6\u00dfe klar und erkennbar sind. W\u00e4hlen Sie aus Tieren, Fahrzeugen, Lebensmitteln, Natur, Sport, Musik, Jahreszeiten und mehr.' },
    { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes R\u00e4tsel enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel, der das korrekte Bild in jeder Feldposition zeigt. Der Schl\u00fcssel verwendet dasselbe Rasterlayout, Thema und Design.' },
    { title: 'Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung', description: 'F\u00fcgen Sie eigenen Text mit einstellbarer Schriftart, Gr\u00f6\u00dfe, Farbe und Umriss hinzu. \u00c4ndern Sie Seitenhintergr\u00fcnde, wenden Sie dekorative Rahmen an und nutzen Sie Ausrichtungswerkzeuge, Ebenenordnung, Zoom und R\u00fcckg\u00e4ngig.' },
    { title: 'Doppelter Export: JPEG und PDF', description: 'Exportieren Sie R\u00e4tsel als hochaufl\u00f6sende JPEG-Bilder oder druckfertige PDF-Dokumente. JPEG eignet sich f\u00fcr digitale Nutzung und Listing-Vorschaubilder. PDF bietet scharfe Ausgabe f\u00fcr Unterrichtsdruck und KDP-Innenseiten.' },
    { title: '7 professionelle Schriftarten', description: 'W\u00e4hlen Sie aus sieben Schriftarten, die f\u00fcr Lesbarkeit in verschiedenen Altersstufen entwickelt wurden. Jede Schrift wird in JPEG und PDF gestochen scharf dargestellt.' },
  ],

  businessUseCases: [
    { title: 'Raster-R\u00e4tsel-Pakete auf Etsy verkaufen', description: 'Erstellen Sie thematische Rasterr\u00e4tsel-B\u00fcndel in mehreren Schwierigkeitsstufen \u2014 Leicht (2\u00d72, 5 Hinweise), Mittel (3\u00d73, 3 Hinweise), Schwer (4\u00d74, 1 Hinweis) \u2014 und listen Sie sie als Sofort-Download-Produkte.', platform: 'Etsy' },
    { title: 'KDP Logik-R\u00e4tselb\u00fccher ver\u00f6ffentlichen', description: 'Stellen Sie 50\u2013100 Raster-Zuordnungsr\u00e4tsel zu thematischen R\u00e4tselb\u00fcchern f\u00fcr Amazon KDP zusammen. Inklusive progressiver Schwierigkeit und L\u00f6sungsschl\u00fcssel am Ende.', platform: 'Amazon KDP' },
    { title: 'Kritisches-Denken-Pakete f\u00fcr TPT erstellen', description: 'Erstellen Sie differenzierte Rasterr\u00e4tsel-Sets sortiert nach Schwierigkeit: ein Paket f\u00fcr Anf\u00e4nger, eins f\u00fcr Fortgeschrittene, eins f\u00fcr Experten. B\u00fcndeln Sie mit L\u00f6sungsschl\u00fcsseln und Lehreranleitung.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Raster-R\u00e4tsel-Sammlungen erstellen', description: 'Nutzen Sie thematische Bilder f\u00fcr feiertagsspezifische Rasterr\u00e4tsel-Sets: K\u00fcrbisse f\u00fcr Halloween, Schneeflocken f\u00fcr Winter, Herzen f\u00fcr Valentinstag.', platform: 'Multi-platform' },
    { title: 'W\u00f6chentliches R\u00e4tsel-Abo auf Gumroad starten', description: 'Liefern Sie w\u00f6chentlich neue Raster-Zuordnungsr\u00e4tsel \u00fcber Gumroads Mitgliedschaftsfunktion. Jede Woche ein anderes Thema und Schwierigkeitsgrad.', platform: 'Gumroad' },
  ],

  faq: [
    { question: 'Welche Rastergr\u00f6\u00dfen unterst\u00fctzt der Generator?', answer: 'Der Generator unterst\u00fctzt quadratische Raster von 2\u00d72 (4 Felder) bis 4\u00d74 (16 Felder). Kleinere Raster eignen sich f\u00fcr j\u00fcngere Kinder, w\u00e4hrend 4\u00d74-Raster echte Logik-Herausforderungen bieten.' },
    { question: 'Wie funktionieren Hinweisfelder?', answer: 'Hinweisfelder sind Rasterpositionen, die mit einem bereits platzierten Bild starten. Sie geben Sch\u00fclern Ausgangsinformationen zum Erschlie\u00dfen der \u00fcbrigen Positionen. Sie k\u00f6nnen 1 bis 5 Hinweisfelder pro R\u00e4tsel festlegen.' },
    { question: 'Was ist die visuelle R\u00fcckmeldungsfunktion?', answer: 'Bei digitaler Nutzung l\u00f6sen falsche Bildplatzierungen visuelle Feld-R\u00fcckmeldung aus, die den Fehler hervorhebt. Dies macht die R\u00e4tsel selbstkorrigierend.' },
    { question: 'Wie viele Bildthemen sind verf\u00fcgbar?', answer: 'Das Full Access Paket enth\u00e4lt alle 104 illustrierten Themen. Das Commercial Paket enth\u00e4lt beliebte Themen. Beide unterst\u00fctzen eigene Bild-Uploads.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch generiert?', answer: 'Ja. Jedes Rasterr\u00e4tsel enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel, der das korrekte Bild in jedem Feld zeigt. Er wird als separate Datei exportiert.' },
    { question: 'Kann ich die R\u00e4tsel kommerziell nutzen?', answer: 'Ja. Sowohl das Commercial Pack als auch das Full Access Pack enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, TPT und jeder anderen Plattform.' },
    { question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?', answer: 'Das Commercial Pack ($27) enth\u00e4lt den Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe.' },
    { question: 'Kann ich den Generator vor dem Kauf testen?', answer: 'Absolut. Der Generator ist jetzt kostenlos nutzbar, ohne Anmeldung. Die kostenlose Version enth\u00e4lt alle Funktionen \u2014 der einzige Unterschied ist ein kleines Wasserzeichen.' },
    { question: 'Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?', answer: 'W\u00e4hlen Sie zwischen US Letter, A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat. Export als JPEG und PDF in professioneller Qualit\u00e4t.' },
    { question: 'Welche Sprachen werden unterst\u00fctzt?', answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen. Raster-Zuordnungsr\u00e4tsel sind haupts\u00e4chlich visuell, daher funktioniert der Inhalt sprachunabh\u00e4ngig.' },
    { question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.' },
  ],

  internalLinks: [
    { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Arbeitsblatt Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: 'Bilder-Sortieren Generator' },
    { slug: 'grid-match', pageType: 'tool', anchorText: 'Raster-Zuordnung Generator kostenlos testen' },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Zuordnung & Sortierung Bundle \u2014 Sparen Sie bei allen 5 Generatoren' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
    { slug: 'publish-puzzle-books-kdp', pageType: 'guide', anchorText: 'R\u00e4tselb\u00fccher auf Amazon KDP ver\u00f6ffentlichen' },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten Druckvorlagen Nischen-Ideen' },
    { slug: 'create-worksheets-that-sell', pageType: 'start', anchorText: 'Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
  ],
};`;
}

// Due to context size, generate the remaining files more compactly
// Each follows the same pattern with German content

function generateMatching() { return generateAppFile('matching', 'matching', 'Zuordnungs-Arbeitsblatt Generator', 'Erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter mit Verbindungslinien-Paaren', 'Zuordnungs-Arbeitsblatt Generator | Zuordnungs\u00fcbungen Erstellen', 'Erstellen Sie druckbare Zuordnungs-Arbeitsbl\u00e4tter mit Verbindungslinien-Paaren. 4 Zuordnungsmodi, 104 Themen, anpassbare Paaranzahl. Kostenloser Generator mit PDF-Export.', 'Zuordnungs-Arbeitsblatt Generator', ['druckbare Zuordnungs-Arbeitsbl\u00e4tter','Zuordnungs\u00fcbungen Maker','Verbindungslinien Aktivit\u00e4ten','Linie-Ziehen Zuordnungs\u00fcbungen','Zuordnungs-Arbeitsbl\u00e4tter f\u00fcr Kinder'], ['Linie ziehen zwischen','Anfangsbuchstaben Zuordnung','Bild-Wort Zuordnung','Kindergarten Zuordnung','Vorschule Zuordnungsaktivit\u00e4ten','Feinmotorik Arbeitsbl\u00e4tter','visuelle Unterscheidung','Paare verbinden'], '/samples/english/matching/Match Up 1.jpeg', 'Zuordnungs-Arbeitsblatt mit bunten Bildern und Verbindungslinien f\u00fcr junge Lernende', [{ src: '/samples/english/matching/Match Up 1.jpeg', alt: 'Zuordnungs-Arbeitsblatt mit Bild-Anfangsbuchstaben-Paaren im Linie-Ziehen-Format', caption: 'Bild-Anfangsbuchstaben Modus' }], 'y3ghkjt_67s', 'So erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter mit Bildern',
    'Verbindungslinien-Zuordnungsaktivit\u00e4ten, die visuelle Unterscheidung und Lesekompetenz f\u00f6rdern',
    `Zuordnungs-Arbeitsbl\u00e4tter geh\u00f6ren zu den vielseitigsten Werkzeugen in der Fr\u00fchp\u00e4dagogik, und dieser Generator erm\u00f6glicht es Ihnen, sie in Sekunden statt Stunden zu erstellen. Der Zuordnungs-Arbeitsblatt Generator produziert professionelle Linie-Ziehen-Aktivit\u00e4ten, bei denen Sch\u00fcler Elemente in der linken Spalte mit ihren korrekten Partnern in der rechten Spalte verbinden. Ob Sie Bild-Anfangsbuchstaben-Paare, Bild-und-Wort-Kombinationen oder vollst\u00e4ndig eigene Wortzuordnungen ben\u00f6tigen \u2014 jedes Layout wird automatisch aus Ihren Einstellungen erstellt.

Vier verschiedene Zuordnungsmodi decken ein breites Spektrum an Lernzielen ab. Der Bild \u2014 Anfangsbuchstabe Modus zeigt ein Bild links und einen Buchstaben rechts und st\u00e4rkt Phonetik und Buchstabenerkennung. Der Bild + Wort \u2014 Bild + Wort Modus zeigt beschriftete Bilder auf beiden Seiten, ideal f\u00fcr Wortschatzaufbau. Der Bild/Wort \u2014 Bild/Wort Modus wechselt zuf\u00e4llig zwischen Bildern und W\u00f6rtern f\u00fcr anspruchsvollere Unterscheidung. Der Bild \u2014 Eigenes Wort Modus erlaubt eigene rechte-Spalte-Beschriftungen, perfekt f\u00fcr Rechtschreibleisten, Vokabeltests oder Fremdsprachen\u00fcbungen.

Sie steuern die Anzahl der Paare pro Arbeitsblatt \u2014 w\u00e4hlen Sie 4, 5 oder 6 \u2014 und schalten individuelle Optionen wie Aufz\u00e4hlungspunkte, Name- und Datumsfelder und Sichtbarkeit der rechten Spalte pro Paar um. Der integrierte Canvas-Editor erlaubt Feinabstimmung von Farben, Schriftarten, Rahmen und Positionierung vor dem Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Jedes Arbeitsblatt enth\u00e4lt einen automatisch generierten L\u00f6sungsschl\u00fcssel.

W\u00e4hlen Sie aus 104 professionell illustrierten Bildthemen mit Tieren, Fahrzeugen, Lebensmitteln, Natur und Dutzenden weiteren Kategorien. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 testen Sie jetzt alle Features ohne Anmeldung oder Zahlungsinformationen.`,
    [
      { title: 'W\u00e4hlen Sie den Zuordnungsmodus', description: 'W\u00e4hlen Sie aus vier Modi: Bild \u2014 Anfangsbuchstabe f\u00fcr Phonetik\u00fcbung, Bild + Wort \u2014 Bild + Wort f\u00fcr Wortschatz, Bild/Wort \u2014 Bild/Wort f\u00fcr gemischte Unterscheidung oder Bild \u2014 Eigenes Wort f\u00fcr Rechtschreibleisten.' },
      { title: 'Paaranzahl und Optionen festlegen', description: 'W\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Schalten Sie Aufz\u00e4hlungspunkte, Name-/Datumsfelder und die Sichtbarkeit der rechten Spalte pro Paar um.' },
      { title: 'Thema und Layout w\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen. W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator ordnet Bilder in ein sauberes Zwei-Spalten-Layout an.' },
      { title: 'Im Canvas-Editor anpassen', description: 'F\u00fcgen Sie eigene Anweisungen oder Titel hinzu, \u00e4ndern Sie Farben, wenden Sie Rahmen an und positionieren Sie Elemente per Drag-and-Drop. Zoom, R\u00fcckg\u00e4ngig und Ebenensteuerung f\u00fcr pr\u00e4zise Kontrolle.' },
      { title: 'Exportieren und Drucken', description: 'Laden Sie Ihr Zuordnungs-Arbeitsblatt als hochaufl\u00f6sendes JPEG oder druckfertiges PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit Verbindungslinien wird automatisch als separate Datei generiert.' },
    ],
    [
      { title: 'Vier Zuordnungsmodi f\u00fcr verschiedene F\u00e4higkeiten', description: 'Bild \u2014 Anfangsbuchstabe paart Bilder mit ihrem Startbuchstaben. Bild + Wort zeigt beschriftete Bilder auf beiden Seiten. Bild/Wort wechselt zuf\u00e4llig f\u00fcr schwierigere Unterscheidung. Bild \u2014 Eigenes Wort erlaubt eigenen rechte-Spalte-Text.' },
      { title: 'Flexible Paaranzahl: 4, 5 oder 6', description: 'Vier Paare eignen sich f\u00fcr j\u00fcngere Kinder. F\u00fcnf Paare bieten eine Standard-Aktivit\u00e4tsl\u00e4nge. Sechs Paare fordern \u00e4ltere Sch\u00fcler heraus.' },
      { title: 'Pro-Paar Sichtbarkeits-Umschaltung', description: 'Steuern Sie, ob jede rechte-Spalte-Antwort sichtbar oder verborgen ist. Zeigen Sie alle Antworten f\u00fcr Standardzuordnung, verbergen Sie einige f\u00fcr gemischte Schwierigkeit.' },
      { title: '104 illustrierte Bildthemen', description: 'Jedes Thema enth\u00e4lt professionell gezeichnete Bilder f\u00fcr die Zuordnungsspalten. Themen machen Arbeitsbl\u00e4tter visuell ansprechend und verbinden Zuordnungs\u00fcbungen mit Sachunterricht.' },
      { title: 'Name, Datum und Aufz\u00e4hlungspunkte', description: 'F\u00fcgen Sie Name- und Datumsfelder mit einem Klick hinzu. Schalten Sie Aufz\u00e4hlungspunkte ein oder aus. Diese Layout-Optionen machen Arbeitsbl\u00e4tter unterrichtsfertig.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'F\u00fcgen Sie eigenen Text mit einstellbarer Schrift, Gr\u00f6\u00dfe, Farbe und Umriss hinzu. \u00c4ndern Sie Hintergr\u00fcnde, wenden Sie Rahmen an, nutzen Sie Ausrichtungswerkzeuge und Ebenenordnung.' },
      { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes Zuordnungs-Arbeitsblatt enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel mit den korrekten Verbindungslinien. Gleiches Layout, Thema und Schriftart.' },
      { title: 'Doppelter Export: JPEG und PDF', description: 'Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr Unterrichtsdruck und KDP-Innenseiten.' },
    ],
    [
      { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
      { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
      { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
      { slug: 'picture-sort', pageType: 'app', anchorText: 'Bilder-Sortieren Generator' },
      { slug: 'matching', pageType: 'tool', anchorText: 'Zuordnungs-Generator kostenlos testen' },
      { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Zuordnung & Sortierung Bundle \u2014 Sparen Sie bei allen 5 Generatoren' },
      { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
      { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: 'P\u00e4dagogische Druckvorlagen auf Etsy verkaufen' },
      { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Vorschul-Druckvorlagen Nischen-Ideen' },
      { slug: 'etsy-printable-business', pageType: 'start', anchorText: 'Etsy Druckvorlagen-Business starten' },
    ]
  );
}

// Helper to generate a complete app file with the standard structure
function generateAppFile(appId, category, title, tagline, titleTag, metaDesc, primaryKw, secondaryKws, lsiKws, heroImg, heroAlt, gallery, ytId, ytTitle, heroTagline, heroDesc, steps, features, internalLinks) {
  const faq = generateStandardFaq(appId, title);
  const businessUseCases = generateStandardBusinessCases(title);

  return `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: '${appId}',
  locale: 'de',
  category: '${category}',

  seo: {
    titleTag: '${titleTag}',
    metaDescription: '${metaDesc}',
    primaryKeyword: '${primaryKw}',
    secondaryKeywords: ${JSON.stringify(secondaryKws, null, 6).replace(/\n/g, '\n    ')},
    lsiKeywords: ${JSON.stringify(lsiKws, null, 6).replace(/\n/g, '\n    ')},
  },

  visuals: {
    heroImages: {
      primary: '${heroImg}',
      primaryAlt: '${heroAlt}',
    },
    sampleGallery: ${JSON.stringify(gallery, null, 6).replace(/\n/g, '\n    ')},
    youtubeId: '${ytId}',
    videoTitle: '${ytTitle}',
  },

  hero: {
    title: '${title}',
    tagline: '${heroTagline}',
    description: \`${heroDesc}\`,
  },

  howItWorks: {
    title: 'Erstellen Sie Ihr Arbeitsblatt in 5 Schritten',
    steps: ${JSON.stringify(steps, null, 6).replace(/\n/g, '\n    ')},
  },

  features: ${JSON.stringify(features, null, 4).replace(/\n/g, '\n  ')},

  businessUseCases: ${JSON.stringify(businessUseCases, null, 4).replace(/\n/g, '\n  ')},

  faq: ${JSON.stringify(faq, null, 4).replace(/\n/g, '\n  ')},

  internalLinks: ${JSON.stringify(internalLinks, null, 4).replace(/\n/g, '\n  ')},
};`;
}

function generateStandardFaq(appId, title) {
  return [
    { question: 'Wie viele Bildthemen sind verf\u00fcgbar?', answer: 'Das Full Access Paket enth\u00e4lt alle 104 illustrierten Themen. Das Commercial Paket enth\u00e4lt eine kuratierte Auswahl beliebter Themen. Beide erlauben eigene Bild-Uploads.' },
    { question: `Kann ich die erstellten Arbeitsbl\u00e4tter kommerziell nutzen?`, answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers und jeder anderen Plattform.' },
    { question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?', answer: `Das Commercial Pack ($27) enth\u00e4lt den ${title} mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang zu neuen Themen und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe.` },
    { question: 'Kann ich den Generator vor dem Kauf testen?', answer: 'Absolut. Der Generator ist jetzt kostenlos nutzbar, ohne Anmeldung. Die kostenlose Version enth\u00e4lt alle Funktionen \u2014 der einzige Unterschied ist ein kleines Wasserzeichen auf exportierten Dateien.' },
    { question: 'Welche Seitengr\u00f6\u00dfen und Formate werden unterst\u00fctzt?', answer: 'W\u00e4hlen Sie zwischen US Letter (8,5 \u00d7 11 Zoll), A4 oder benutzerdefinierten Ma\u00dfen. Hoch- und Querformat sind verf\u00fcgbar. Export als hochaufl\u00f6sendes JPEG und druckfertiges PDF.' },
    { question: 'Welche Sprachen werden unterst\u00fctzt?', answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.' },
    { question: 'Werden L\u00f6sungsschl\u00fcssel automatisch generiert?', answer: 'Ja. Jedes Arbeitsblatt enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel im gleichen Layout. Er wird als separate Datei exportiert.' },
    { question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.' },
  ];
}

function generateStandardBusinessCases(title) {
  return [
    { title: 'Arbeitsblatt-Pakete auf Etsy verkaufen', description: `Erstellen Sie thematische ${title}-B\u00fcndel und listen Sie sie als Sofort-Download Digitalprodukte. Verschiedene Schwierigkeitsgrade und Themen erm\u00f6glichen vielf\u00e4ltige Produktlinien.`, platform: 'Etsy' },
    { title: 'KDP-Aktivit\u00e4tenb\u00fccher ver\u00f6ffentlichen', description: `Stellen Sie 50\u2013100 Arbeitsbl\u00e4tter zu thematischen Aktivit\u00e4tenb\u00fcchern f\u00fcr Amazon KDP zusammen. Inklusive progressiver Schwierigkeit und L\u00f6sungsschl\u00fcsseln am Ende.`, platform: 'Amazon KDP' },
    { title: 'Unterrichtsmaterial f\u00fcr TPT erstellen', description: 'Teachers Pay Teachers K\u00e4ufer suchen differenzierte, druckfertige Materialien. B\u00fcndeln Sie nach F\u00e4higkeit sortiert mit L\u00f6sungsschl\u00fcsseln und Deckblatt.', platform: 'Teachers Pay Teachers' },
    { title: 'Saisonale Aktivit\u00e4ten-Sets erstellen', description: 'Nutzen Sie thematische Bilder f\u00fcr feiertagsspezifische Sammlungen. Saisonale Produkte haben konzentrierte Nachfrage und k\u00f6nnen ganzj\u00e4hrig gelistet werden.', platform: 'Multi-platform' },
    { title: 'Curriculum-Programm auf Gumroad starten', description: 'Strukturieren Sie Arbeitsbl\u00e4tter nach Woche und Schwierigkeit f\u00fcr ein progressives Lernprogramm. Verpacken Sie als mehrw\u00f6chiges Curriculum.', platform: 'Gumroad' },
  ];
}

// For the remaining 7 apps, use simplified but complete generation
function generateMissingPieces() { return generateAppFile('missing-pieces', 'puzzle', 'Fehlende Teile R\u00e4tsel Generator', 'Finden Sie das fehlende Teil im Bild \u2014 eine visuelle Denk-Herausforderung f\u00fcr jeden Lernenden', 'Fehlende Teile R\u00e4tsel Generator | R\u00e4tsel Gratis Erstellen', 'Erstellen Sie Fehlende-Teile-R\u00e4tsel mit Multiple-Choice-Antworten. 1\u20135 fehlende Teile, 2\u20136 Antwortoptionen, 4 Teilformen. Kostenloser Generator mit L\u00f6sungsschl\u00fcsseln und PDF-Export.', 'Fehlende Teile R\u00e4tsel Generator', ['Fehlende-Teile Arbeitsbl\u00e4tter','visuelles R\u00e4tsel Maker','druckbare Fehlende-Teile-R\u00e4tsel','Bilder-R\u00e4tsel Arbeitsbl\u00e4tter','Multiple-Choice R\u00e4tsel Generator'], ['visuelles Denken Aktivit\u00e4ten','r\u00e4umliche Wahrnehmung','kritisches Denken R\u00e4tsel','Mustererkennung','Logik-R\u00e4tsel f\u00fcr Kinder','druckbare Denksportaufgaben','visuelle Wahrnehmung','Probleml\u00f6sung Arbeitsbl\u00e4tter'], '/samples/english/missing pieces/Missing Pieces (1).jpeg', 'Fehlende-Teile-R\u00e4tsel mit Multiple-Choice-Antwortoptionen unter dem Hauptbild', [{ src: '/samples/english/missing pieces/Missing Pieces (3).jpeg', alt: 'Fehlende-Teile-R\u00e4tsel mit Tier-Thema und quadratischen Aussparungen', caption: 'Quadratische Teilformen' },{ src: '/samples/english/missing pieces/Missing Pieces (5).jpeg', alt: 'Fehlende-Teile-R\u00e4tsel mit mehreren entfernten Teilen aus einem Fahrzeugbild', caption: 'Mehrere fehlende Teile' },{ src: '/samples/english/missing pieces/Missing Pieces (8).jpeg', alt: 'Fehlende-Teile L\u00f6sungsschl\u00fcssel mit markierten korrekten Antworten', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' }], 'gb-xE_Ay4fc', 'So erstellen Sie Fehlende-Teile-R\u00e4tsel', 'Finden Sie das fehlende Teil \u2014 eine visuelle Denkaufgabe f\u00fcr jedes Alter',
    `Fehlende-Teile-R\u00e4tsel geh\u00f6ren zu den wirksamsten Methoden, visuelles Denken und r\u00e4umliche Wahrnehmung bei jungen Lernenden zu entwickeln. Der Fehlende Teile R\u00e4tsel Generator erstellt Arbeitsbl\u00e4tter, bei denen ein Bildabschnitt entfernt wird und Sch\u00fcler das korrekte Teil aus Multiple-Choice-Optionen identifizieren m\u00fcssen. Es klingt einfach, aber die erforderliche visuelle Unterscheidung baut grundlegende kognitive F\u00e4higkeiten auf, die auf Lesen, Mathematik und Naturwissenschaften \u00fcbertragbar sind.

Der Generator entfernt zwischen 1 und 5 Teile aus jedem Bild der 104-Themen-Bibliothek. Jedes entfernte Teil hinterl\u00e4sst eine klar umrissene L\u00fccke, und die Antwortoptionen erscheinen unter dem Bild. Sie steuern die Anzahl der L\u00f6sungsoptionen von 2 (einfache Bin\u00e4rentscheidung) bis 6 (anspruchsvoller visueller Vergleich). Die falschen Optionen werden aus benachbarten Bereichen desselben Bildes generiert, sodass sie visuell \u00e4hnlich genug sind, um sorgf\u00e4ltige Beobachtung zu erfordern.

Vier Teilformen halten das Format \u00fcber Arbeitsbl\u00e4tter hinweg abwechslungsreich: Quadrat, Kreis, Rechteck und Ellipse. Verschiedene Formen ver\u00e4ndern die Art, wie Sch\u00fcler den fehlenden Bereich analysieren. Jedes R\u00e4tsel generiert einen passenden L\u00f6sungsschl\u00fcssel. Der Canvas-Editor f\u00fcgt Titel, Namensfelder, Anweisungen und dekorative Elemente hinzu. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.`,
    [
      { title: 'Bildthema w\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und mehr. W\u00e4hlen Sie das Bild, aus dem Teile entfernt werden. Sie k\u00f6nnen auch eigene Bilder hochladen.' },
      { title: 'Anzahl fehlender Teile festlegen', description: 'W\u00e4hlen Sie zwischen 1 und 5 zu entfernende Teile. Ein fehlendes Teil eignet sich f\u00fcr Anf\u00e4nger. Mehrere fehlende Teile erh\u00f6hen die Schwierigkeit.' },
      { title: 'Antwortoptionen konfigurieren', description: 'Legen Sie die Anzahl der L\u00f6sungsoptionen von 2 bis 6 fest. Weniger Optionen machen das R\u00e4tsel einfacher. Mehr Optionen erfordern feinere visuelle Unterscheidung.' },
      { title: 'Teilformen w\u00e4hlen', description: 'W\u00e4hlen Sie aus Quadrat, Kreis, Rechteck oder Ellipse f\u00fcr die Aussparungs-bereiche. Jede Form erzeugt eine andere visuelle Herausforderung.' },
      { title: 'R\u00e4tsel und L\u00f6sung exportieren', description: 'Laden Sie das R\u00e4tsel und den L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck umschalten.' },
    ],
    [
      { title: 'Einstellbare fehlende Teile (1\u20135)', description: 'Entfernen Sie zwischen 1 und 5 Teile aus jedem Bild. Ein einzelnes fehlendes Teil erzeugt eine fokussierte Beobachtungsaufgabe. Mehrere fehlende Teile erfordern systematische Bildanalyse.' },
      { title: 'Multiple-Choice Antwortoptionen (2\u20136)', description: 'Legen Sie die Anzahl der Antwortm\u00f6glichkeiten von 2 bis 6 fest. Zwei Optionen erzeugen eine einfache Bin\u00e4rentscheidung. Sechs Optionen erfordern sorgf\u00e4ltigen Vergleich visuell \u00e4hnlicher Teile.' },
      { title: 'Vier Teilformen', description: 'W\u00e4hlen Sie Quadrat, Kreis, Rechteck oder Ellipse. Jede Form erzeugt unterschiedliche Kanten-Zuordnungs-Herausforderungen.' },
      { title: '104 Bildthemen', description: 'Jedes Thema bietet hochwertige Bilder f\u00fcr die R\u00e4tselerstellung. Tiere, Fahrzeuge, Lebensmittel und saisonale Themen machen jedes R\u00e4tsel visuell einzigartig.' },
      { title: 'Intelligente Ablenker-Generierung', description: 'Falsche Antwortoptionen werden automatisch aus benachbarten Bildbereichen generiert. Dies stellt sicher, dass Ablenker visuell \u00e4hnlich genug sind f\u00fcr echte Beobachtung.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'F\u00fcgen Sie eigene Titel, Namensfelder und Anweisungen hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie Rahmen an und nutzen Sie Drag-and-Drop, Zoom und R\u00fcckg\u00e4ngig.' },
      { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes R\u00e4tsel erzeugt einen L\u00f6sungsschl\u00fcssel, der die korrekten Teile an ihren Positionen zeigt. Gleiches Layout f\u00fcr einfachen visuellen Vergleich.' },
      { title: 'Doppelter Export mit Graustufen-Option', description: 'Export als JPEG oder PDF. Graustufen-Umschaltung f\u00fcr Schwarz-Wei\u00df-Druck. R\u00e4tsel und L\u00f6sung werden separat in voller Qualit\u00e4t exportiert.' },
    ],
    [
      { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was Passt Nicht Generator' },
      { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
      { slug: 'picture-path', pageType: 'app', anchorText: 'Bildpfad Generator' },
      { slug: 'math-puzzle', pageType: 'app', anchorText: 'Mathe-R\u00e4tsel Generator' },
      { slug: 'find-objects', pageType: 'app', anchorText: 'Objekte Finden Generator' },
      { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
      { slug: 'missing-pieces', pageType: 'tool', anchorText: 'Fehlende-Teile Generator kostenlos testen' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Bundle \u2014 Sparen Sie bei allen R\u00e4tsel-Generatoren' },
      { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'R\u00e4tselb\u00fccher erstellen' },
      { slug: 'puzzle-printable-ideas', pageType: 'idea', anchorText: 'R\u00e4tsel-Druckvorlagen Nischen-Ideen' },
    ]
  );
}

function generateOddOneOut() { return generateAppFile('odd-one-out', 'puzzle', 'Was Passt Nicht Generator', 'Finden Sie das Element, das nicht dazu geh\u00f6rt \u2014 zwei Modi, endlose visuelle Denkaufgaben', 'Was Passt Nicht Generator | R\u00e4tsel Gratis Erstellen', 'Erstellen Sie Was-Passt-Nicht-R\u00e4tsel mit zwei Modi: identisch und \u00e4hnlich. 5\u201310 \u00dcbungen pro Blatt, Zwei-Themen-System, Pro-\u00dcbung \u00dcberschreibungen. Kostenloser Generator mit PDF-Export.', 'Was Passt Nicht Generator', ['Was Passt Nicht Arbeitsbl\u00e4tter','Finde den Au\u00dfenseiter Maker','druckbare Was-Passt-Nicht R\u00e4tsel','Unterschiede finden Arbeitsbl\u00e4tter','Was-Passt-Nicht R\u00e4tsel Ersteller'], ['visuelle Unterscheidung Aktivit\u00e4ten','kritisches Denken Arbeitsbl\u00e4tter','Beobachtungsr\u00e4tsel f\u00fcr Kinder','Klassifikations-Aktivit\u00e4ten','Sortieren und Kategorisieren','Logik-R\u00e4tsel druckbar','kognitive F\u00e4higkeiten','Vorschule Denksportaufgaben'], '/samples/english/odd one out/Find the Odd One Out (1).jpeg', 'Was-Passt-Nicht R\u00e4tsel-Arbeitsblatt mit Bildreihen, in denen ein Element sich von den anderen unterscheidet', [{ src: '/samples/english/odd one out/Find the Odd One Out (3).jpeg', alt: 'Was-Passt-Nicht im Identisch-Modus mit Tier-Thema', caption: 'Identisch-Modus \u2014 die Variante finden' },{ src: '/samples/english/odd one out/Find the Odd One Out (4).jpeg', alt: 'Was-Passt-Nicht im \u00c4hnlich-Modus mit gemischten Themen', caption: '\u00c4hnlich-Modus \u2014 andere Kategorie' },{ src: '/samples/english/odd one out/Find the Odd One Out (8).jpeg', alt: 'Was-Passt-Nicht L\u00f6sungsschl\u00fcssel mit allen markierten Au\u00dfenseitern', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' }], '0R6WFUfY7Mk', 'So erstellen Sie Was-Passt-Nicht R\u00e4tsel', 'Finden Sie das Element, das nicht dazugeh\u00f6rt \u2014 zwei Modi f\u00fcr endlose visuelle Denkherausforderungen',
    `Was-Passt-Nicht R\u00e4tsel sind ein Grundpfeiler der Fr\u00fchp\u00e4dagogik, weil sie Klassifikation, Beobachtung und logisches Denken gleichzeitig entwickeln. Der Was Passt Nicht Generator erstellt Arbeitsbl\u00e4tter, bei denen Sch\u00fcler eine Reihe von Bildern untersuchen und das Element identifizieren, das nicht dazugeh\u00f6rt. Was diesen Generator einzigartig macht, ist das Zwei-Modi-System, das grunds\u00e4tzlich verschiedene kognitive Herausforderungen erzeugt.

Im Identisch-Modus stammt jedes Bild in einer Reihe aus demselben Thema, aber eines ist eine visuelle Variante \u2014 ein leicht anderes Bild aus derselben Kategorie. Sch\u00fcler m\u00fcssen feine visuelle Details beobachten, um den Unterschied zu erkennen. Im \u00c4hnlich-Modus stammen die meisten Bilder aus einem Thema und das Au\u00dfenseiter-Element aus einem v\u00f6llig anderen. Sch\u00fcler m\u00fcssen kategorisieren und klassifizieren, um zu erkennen, welches Element zu einer anderen Gruppe geh\u00f6rt.

Das Zwei-Themen-System erlaubt die Auswahl eines Prim\u00e4rthemas und eines Sekund\u00e4rthemas. Das Prim\u00e4rthema liefert die Mehrheitsbilder, das Sekund\u00e4rthema die Au\u00dfenseiter-Elemente im \u00c4hnlich-Modus. Eine Pro-\u00dcbung-Modus-\u00dcberschreibung erlaubt das Mischen von Identisch- und \u00c4hnlich-Herausforderungen auf demselben Arbeitsblatt mit 5 bis 10 \u00dcbungen pro Seite.

Der Canvas-Editor f\u00fcgt Titel, Anweisungen und dekorative Elemente hinzu. Jedes R\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel mit klar markierten Au\u00dfenseitern. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.`,
    [
      { title: 'Zwei Themen ausw\u00e4hlen', description: 'W\u00e4hlen Sie ein Prim\u00e4r- und ein Sekund\u00e4rthema aus der 104-Themen-Bibliothek. Das Prim\u00e4rthema liefert die Mehrheitsbilder. Das Sekund\u00e4rthema liefert Au\u00dfenseiter im \u00c4hnlich-Modus.' },
      { title: 'Standardmodus w\u00e4hlen', description: 'Stellen Sie den Standardmodus auf Identisch (visuelle Variante) oder \u00c4hnlich (Element aus anderem Thema) ein. Sie k\u00f6nnen den Modus pro \u00dcbung \u00fcberschreiben.' },
      { title: '\u00dcbungsanzahl festlegen', description: 'W\u00e4hlen Sie zwischen 5 und 10 \u00dcbungen pro Arbeitsblatt. F\u00fcnf \u00dcbungen f\u00fcr j\u00fcngere Lernende. Zehn \u00dcbungen f\u00fcr eine dichtere Herausforderung.' },
      { title: 'Modi pro \u00dcbung \u00fcberschreiben', description: 'Schalten Sie einzelne \u00dcbungen optional zwischen Identisch- und \u00c4hnlich-Modus um f\u00fcr variierte Schwierigkeit auf einem einzigen Blatt.' },
      { title: 'R\u00e4tsel und L\u00f6sung exportieren', description: 'Laden Sie R\u00e4tsel und L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel kreist den Au\u00dfenseiter in jeder Reihe ein. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck.' },
    ],
    [
      { title: 'Zwei R\u00e4tselmodi: Identisch und \u00c4hnlich', description: 'Im Identisch-Modus ist ein Bild eine visuelle Variante aus demselben Thema. Im \u00c4hnlich-Modus stammt der Au\u00dfenseiter aus einem v\u00f6llig anderen Thema. Zwei grunds\u00e4tzlich verschiedene kognitive Herausforderungen.' },
      { title: 'Zwei-Themen-System', description: 'W\u00e4hlen Sie ein Prim\u00e4rthema f\u00fcr die Mehrheitsbilder und ein Sekund\u00e4rthema f\u00fcr die Au\u00dfenseiter. Die Doppel-Themen-Methode stellt sinnvollen Kontrast im \u00c4hnlich-Modus sicher.' },
      { title: 'Pro-\u00dcbung Modus-\u00dcberschreibung', description: '\u00dcberschreiben Sie den Standardmodus f\u00fcr einzelne \u00dcbungen auf demselben Arbeitsblatt. Mischen Sie Identisch- und \u00c4hnlich-Herausforderungen f\u00fcr variierte Schwierigkeit.' },
      { title: '5\u201310 \u00dcbungen pro Arbeitsblatt', description: 'Weniger \u00dcbungen bieten mehr Platz pro Reihe f\u00fcr j\u00fcngere Lernende. Mehr \u00dcbungen erzeugen dichtere Arbeitsbl\u00e4tter f\u00fcr \u00e4ltere Sch\u00fcler.' },
      { title: '104 Bildthemen', description: 'Jedes Thema bietet illustrierte Elemente f\u00fcr R\u00e4tselreihen. Tiere, Lebensmittel, Fahrzeuge und saisonale Themen f\u00fcr lehrplanbezogene R\u00e4tsel.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'F\u00fcgen Sie Titel, Namensfelder und Anweisungen hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie Rahmen an und nutzen Sie Drag-and-Drop, Zoom und R\u00fcckg\u00e4ngig.' },
      { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes R\u00e4tsel erzeugt einen L\u00f6sungsschl\u00fcssel, der den Au\u00dfenseiter in jeder Reihe klar markiert. Gleiches Layout f\u00fcr einfachen visuellen Vergleich.' },
      { title: 'Doppelter Export mit Graustufen-Option', description: 'Export als JPEG oder PDF. Graustufen f\u00fcr tintensparendes Schwarz-Wei\u00df-Drucken. Beide Dateien separat in voller Qualit\u00e4t.' },
    ],
    [
      { slug: 'missing-pieces', pageType: 'app', anchorText: 'Fehlende Teile R\u00e4tsel Generator' },
      { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
      { slug: 'picture-path', pageType: 'app', anchorText: 'Bildpfad Generator' },
      { slug: 'find-objects', pageType: 'app', anchorText: 'Objekte Finden Generator' },
      { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
      { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Generator' },
      { slug: 'odd-one-out', pageType: 'tool', anchorText: 'Was-Passt-Nicht Generator kostenlos testen' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Bundle \u2014 Sparen Sie bei allen R\u00e4tsel-Generatoren' },
      { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'R\u00e4tselb\u00fccher erstellen' },
      { slug: 'puzzle-printable-ideas', pageType: 'idea', anchorText: 'R\u00e4tsel-Druckvorlagen Nischen-Ideen' },
    ]
  );
}

function generatePicturePath() { return generateAppFile('picture-path', 'puzzle', 'Bildpfad Generator', 'Drei Spielmodi, die Labyrinth-L\u00f6sen in ein visuelles Abenteuer mit thematischen Bildern verwandeln', 'Bildpfad & Labyrinth Generator | Labyrinthe Gratis Erstellen', 'Erstellen Sie Bildpfad-, klassische Labyrinth- und W\u00e4hle-den-richtigen-Weg-R\u00e4tsel. Raster 15\u201320, 1\u20133 Pfade, 1\u20134 Sammelobjekte. Kostenloser Generator mit L\u00f6sungsschl\u00fcsseln und PDF-Export.', 'Labyrinth Generator f\u00fcr Kinder', ['Bildpfad R\u00e4tsel Maker','druckbarer Labyrinth Generator','Labyrinth Arbeitsbl\u00e4tter f\u00fcr Kinder','Pfadfinder R\u00e4tsel','Labyrinth Aktivit\u00e4ten Ersteller'], ['Labyrinth Arbeitsbl\u00e4tter druckbar','Feinmotorik Aktivit\u00e4ten','Probleml\u00f6sung f\u00fcr Kinder','visuelles Verfolgen','Richtungs\u00fcbungen','Pfad-Nachfahr Aktivit\u00e4ten','r\u00e4umliches Denken R\u00e4tsel','Vorschule Labyrinth'], '/samples/english/picture path/Picture Pathway  (18).jpeg', 'Bildpfad-R\u00e4tsel mit Bildsequenz zum Folgen durch ein Labyrinth-Raster', [{ src: '/samples/english/picture path/Picture Pathway  (3).jpeg', alt: 'Bildpfad-Modus mit Tier-Thema Bildern in einer Sequenz', caption: 'Bildpfad-Modus' },{ src: '/samples/english/picture path/Picture Pathway  (5).jpeg', alt: 'Klassisches Labyrinth mit Lebensmittel-Sammelobjekten entlang der Route', caption: 'Klassisches Labyrinth mit Sammelobjekten' },{ src: '/samples/english/picture path/Picture Pathway  (15).jpeg', alt: 'Bildpfad L\u00f6sungsschl\u00fcssel mit hervorgehobenem korrektem Weg', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' }], 'Sl1o0uPBDCg', 'So erstellen Sie Bildpfad- und Labyrinth-R\u00e4tsel', 'Drei Spielmodi verwandeln Labyrinth-L\u00f6sen in ein visuelles Abenteuer',
    `Labyrinthe geh\u00f6ren zu den beliebtesten R\u00e4tseltypen f\u00fcr Kinder, aber traditionelle Schwarz-Wei\u00df-Linienlabyrinthe fehlen visuelle Anziehungskraft und p\u00e4dagogische Tiefe. Der Bildpfad Generator erstellt drei verschiedene Spielmodi, die Labyrinth-Navigation mit Bilderkennung, Sammeln und Entscheidungsfindung kombinieren \u2014 und verwandelt eine einfache Pfad-Nachfahr-Aktivit\u00e4t in eine Multi-Skill-Herausforderung.

Der Bildpfad-Modus fordert Sch\u00fcler auf, eine Sequenz von Bildern in der richtigen Reihenfolge durch ein Raster zu verbinden. Sie m\u00fcssen jedes Bild in der Sequenz erkennen, es im Raster finden und einen durchgehenden Pfad nachzeichnen, der jedes Bild in der Reihenfolge besucht. Der Klassische Labyrinth-Modus generiert ein traditionelles Labyrinth mit einem besonderen Dreh: Sammelbare Bilder sind entlang des korrekten Pfads platziert. Sch\u00fcler navigieren von Start zu Ziel und sammeln dabei thematische Elemente.

Der W\u00e4hle-den-richtigen-Weg Modus pr\u00e4sentiert mehrere sich verzweigende Routen von Start zu Ziel, aber nur ein Weg ist korrekt. Sch\u00fcler m\u00fcssen jede Route visuell bewerten, um herauszufinden, welche zum Ziel f\u00fchrt. Das Labyrinth-Raster reicht von 15 bis 20 Feldern, mit 1 bis 3 Pfaden und 1 bis 4 Sammelobjekten pro Labyrinth.

Der Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Jedes R\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel mit hervorgehobenem korrektem Pfad. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.`,
    [
      { title: 'Spielmodus w\u00e4hlen', description: 'W\u00e4hlen Sie aus drei Modi: Bildpfad (Bilder in Reihenfolge verbinden), Klassisches Labyrinth (navigieren mit Sammelobjekten) oder W\u00e4hle den richtigen Weg (den einen korrekten Pfad aus mehreren finden).' },
      { title: 'Bildthema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen f\u00fcr Sammelobjekte und Pfadmarkierungen. Tiere, Lebensmittel, Fahrzeuge und Natur machen jedes Labyrinth visuell einzigartig.' },
      { title: 'Labyrinth-Raster konfigurieren', description: 'Stellen Sie die Rastergr\u00f6\u00dfe von 15 bis 20 Feldern ein. Konfigurieren Sie 1 bis 3 Pfade und 1 bis 4 Sammelobjekte. Gr\u00f6\u00dfere Raster und mehr Pfade erh\u00f6hen die Herausforderung.' },
      { title: 'Layout anpassen', description: 'Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfeld und Anweisungen. Wenden Sie thematische Hintergr\u00fcnde und Rahmen an. Positionieren Sie Start- und Zielmarkierungen deutlich.' },
      { title: 'R\u00e4tsel und L\u00f6sung exportieren', description: 'Laden Sie das Labyrinth-R\u00e4tsel und seinen L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel hebt den korrekten Pfad hervor. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck.' },
    ],
    [
      { title: 'Drei Spielmodi', description: 'Bildpfad: Bilder in Sequenz verbinden. Klassisches Labyrinth: Sammelobjekte entlang des korrekten Wegs. W\u00e4hle den richtigen Weg: Mehrere verzweigte Pfade, nur einer f\u00fchrt zum Ziel.' },
      { title: 'Konfigurierbares Labyrinth-Raster (15\u201320 Felder)', description: 'Kleinere Raster f\u00fcr j\u00fcngere Lernende. Gr\u00f6\u00dfere Raster erzeugen l\u00e4ngere Pfade und mehr Entscheidungspunkte f\u00fcr fortgeschrittene Sch\u00fcler.' },
      { title: 'Mehrere Pfade (1\u20133)', description: 'Ein einzelner Pfad erzeugt eine geradlinige Navigationsaufgabe. Mehrere Pfade f\u00fcgen Verzweigungen und Sackgassen hinzu, die Vorausplanung erfordern.' },
      { title: 'Sammelbare Bilder (1\u20134)', description: 'Platzieren Sie 1 bis 4 thematische Sammelbilder entlang des korrekten Pfads. Sch\u00fcler m\u00fcssen das Labyrinth navigieren und dabei alle Sammelobjekte einsammeln.' },
      { title: '104 Bildthemen', description: 'Jedes Thema bietet Bilder f\u00fcr Pfadmarkierungen und Sammelobjekte. Tiere, Lebensmittel, Fahrzeuge und saisonale Themen f\u00fcr visuell ansprechende Labyrinthe.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'Titel, Namensfelder, Anweisungen. Hintergrundfarben, thematische Rahmen. Drag-and-Drop, Zoom, R\u00fcckg\u00e4ngig f\u00fcr professionelles Design.' },
      { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes Labyrinth erzeugt einen L\u00f6sungsschl\u00fcssel, der den korrekten Pfad von Start bis Ziel hervorhebt. Im Bildpfad-Modus zeigt er die korrekte Bildsequenz.' },
      { title: 'Doppelter Export mit Graustufen-Option', description: 'Export als JPEG oder PDF. Graustufen f\u00fcr tintensparendes Drucken. Labyrinth und L\u00f6sung separat in voller Qualit\u00e4t.' },
    ],
    [
      { slug: 'missing-pieces', pageType: 'app', anchorText: 'Fehlende Teile Generator' },
      { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was Passt Nicht Generator' },
      { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
      { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Schatzsuche Generator' },
      { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien Zeichnen Generator' },
      { slug: 'find-and-count', pageType: 'app', anchorText: 'Finden & Z\u00e4hlen Generator' },
      { slug: 'picture-path', pageType: 'tool', anchorText: 'Bildpfad Generator kostenlos testen' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Bundle \u2014 Sparen Sie bei allen R\u00e4tsel-Generatoren' },
      { slug: 'create-maze-books', pageType: 'guide', anchorText: 'Labyrinth-B\u00fccher erstellen' },
      { slug: 'maze-printable-ideas', pageType: 'idea', anchorText: 'Labyrinth-Druckvorlagen Nischen-Ideen' },
    ]
  );
}

function generatePictureSort() { return generateAppFile('picture-sort', 'matching', 'Bilder-Sortieren Arbeitsblatt Generator', 'Zwei-Spalten-Kategorisierungs-Aktivit\u00e4ten, die Klassifikation, Vergleich und logisches Denken lehren', 'Bilder-Sortieren Generator | Sortier-Aktivit\u00e4ten Erstellen', 'Erstellen Sie druckbare Bilder-Sortier-Arbeitsbl\u00e4tter mit Zwei-Spalten-Kategorisierung. Auto- und Manuell-Modus, 104 Themen, max. 12 Bilder. Kostenloser Sortier-Arbeitsblatt Maker mit PDF-Export.', 'Bilder-Sortieren Arbeitsblatt Generator', ['Sortier-Arbeitsbl\u00e4tter f\u00fcr Kinder','Kategorisierungs-Arbeitsbl\u00e4tter druckbar','Bilder sortieren Aktivit\u00e4ten','Sortieren und Klassifizieren','Kategorien-Sortierung druckbar'], ['Klassifizieren und Sortieren','Zwei-Spalten Sortierung','Kategorisierungsf\u00e4higkeiten','Vorschule Sortier-Aktivit\u00e4ten','Kindergarten Klassifikation','Vergleichen und Gegen\u00fcberstellen','Gruppierungs-Aktivit\u00e4ten','logisches Denken Arbeitsbl\u00e4tter'], '/samples/english/picture sort/Picture Sort (1).jpeg', 'Bilder-Sortier-Arbeitsblatt mit zwei Kategoriespalten und bunten Bildern zum Klassifizieren', [{ src: '/samples/english/picture sort/Picture Sort (1).jpeg', alt: 'Bilder-Sortier-Arbeitsblatt mit zwei thematischen Kategorien und Bildern zum Klassifizieren', caption: 'Zwei-Spalten Sortier-Aktivit\u00e4t' }], '9kzmlABtNVQ', 'So erstellen Sie Bilder-Sortier-Arbeitsbl\u00e4tter', 'Zwei-Spalten-Kategorisierung, die Klassifikation und logisches Denken lehrt',
    `Sortieren und Kategorisieren sind grundlegende kognitive F\u00e4higkeiten, die Kinder f\u00e4cher\u00fcbergreifend einsetzen. Wenn Sch\u00fcler ein Bild betrachten und entscheiden, zu welcher von zwei Kategorien es geh\u00f6rt, \u00fcben sie Vergleich, logisches Denken und Wortschatzentwicklung gleichzeitig. Der Bilder-Sortieren Generator erstellt professionelle Zwei-Spalten-Kategorisierungs-Arbeitsbl\u00e4tter in Sekunden mit farbenfrohen Bildern, die Sch\u00fcler in die richtige Gruppe sortieren.

Zwei Generierungsmodi machen die Arbeitsblatt-Erstellung schnell und flexibel. Der Auto-Modus l\u00e4sst Sie ein Thema f\u00fcr die linke und ein anderes f\u00fcr die rechte Spalte w\u00e4hlen \u2014 der Generator w\u00e4hlt Bilder aus jedem Thema und mischt sie zum Sortieren. Der Manuelle Modus gibt volle Kontrolle: Durchsuchen Sie die gesamte 104-Themen-Bibliothek, w\u00e4hlen Sie bis zu 12 einzelne Bilder aus und ordnen Sie jedes der linken oder rechten Kategorie zu.

Sch\u00fcler erhalten ein Arbeitsblatt mit zwei beschrifteten Spalten oben und einem gemischten Bilderpool darunter. Ihre Aufgabe: Identifizieren, zu welcher Kategorie jedes Bild geh\u00f6rt, und entsprechend sortieren. Dieses einfache Format ist sofort verst\u00e4ndlich f\u00fcr Kinder von der Vorschule bis zur 3. Klasse und dank des visuellen Charakters auch f\u00fcr DaZ-Lernende und Sch\u00fcler mit Leseschwierigkeiten zug\u00e4nglich.

Der Canvas-Editor erlaubt Anpassung von Farben, Schriftarten, Rahmen und Positionierung. Jedes Arbeitsblatt generiert einen automatischen L\u00f6sungsschl\u00fcssel. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 testen Sie jetzt alle Modi und Themen ohne Anmeldung.`,
    [
      { title: 'Generierungsmodus w\u00e4hlen', description: 'W\u00e4hlen Sie Auto-Modus f\u00fcr schnelle Erstellung mit zwei Themen oder Manuell-Modus zum Handverlesen von bis zu 12 spezifischen Bildern und Zuordnung zu Kategorien.' },
      { title: 'Kategorien und Bilder festlegen', description: 'Im Auto-Modus w\u00e4hlen Sie ein Thema pro Spalte. Im Manuell-Modus durchsuchen Sie die 104-Themen-Bibliothek, w\u00e4hlen einzelne Bilder und ordnen sie der linken oder rechten Kategorie zu. Maximum 12 Bilder.' },
      { title: 'Layout und Optionen konfigurieren', description: 'W\u00e4hlen Sie Seitengr\u00f6\u00dfe (Letter, A4 oder benutzerdefiniert), Ausrichtung und Schriftart. Der Generator ordnet Kategorien oben an und mischt die Bilder darunter zum Sortieren.' },
      { title: 'Im Canvas-Editor anpassen', description: 'F\u00fcgen Sie eigene Anweisungen oder Kategorienbeschriftungen hinzu. \u00c4ndern Sie Seiten- und Spaltenfarben, wenden Sie Rahmen an und positionieren Sie Elemente per Drag-and-Drop.' },
      { title: 'Exportieren und Drucken', description: 'Laden Sie Ihr Sortier-Arbeitsblatt als JPEG oder PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit korrekter Kategorie f\u00fcr jedes Bild wird automatisch als separate Datei generiert.' },
    ],
    [
      { title: 'Zwei Modi: Auto und Manuell', description: 'Auto-Modus w\u00e4hlt zwei Themen und generiert sofort eine Sortier-Aktivit\u00e4t. Manuell-Modus erlaubt handverlesene Auswahl von bis zu 12 Bildern mit eigener Kategorie-Zuordnung.' },
      { title: 'Zwei-Spalten Kategorisierungsformat', description: 'Zwei beschriftete Kategoriespalten oben, gemischter Bilderpool darunter. Sch\u00fcler analysieren jedes Bild und sortieren es in die richtige Kategorie. Dieses Format lehrt Vergleich, Klassifikation und logisches Denken.' },
      { title: 'Bis zu 12 Bilder pro Arbeitsblatt', description: 'Weniger Bilder eignen sich f\u00fcr j\u00fcngere Kinder. Mehr Bilder erzeugen l\u00e4ngere, anspruchsvollere Sortier\u00fcbungen f\u00fcr \u00e4ltere Sch\u00fcler oder Pr\u00fcfungszwecke.' },
      { title: '104 illustrierte Bildthemen', description: 'Verwenden Sie kontrastierende Themen wie \u201eLandtiere vs. Meerestiere\u201c oder \u201eObst vs. Gem\u00fcse\u201c f\u00fcr nat\u00fcrliche Sortier-Aktivit\u00e4ten.' },
      { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes Sortier-Arbeitsblatt enth\u00e4lt einen L\u00f6sungsschl\u00fcssel mit korrekter Kategorie-Zuordnung f\u00fcr jedes Bild. Gleiches Layout und Design.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung', description: 'Text mit einstellbarer Schrift, Farbe und Umriss. Hintergr\u00fcnde, Rahmen, Drag-and-Drop. Ausrichtung, Ebenenordnung, Zoom und R\u00fcckg\u00e4ngig.' },
      { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Nutzung. PDF f\u00fcr scharfen Unterrichtsdruck und KDP-Innenseiten.' },
      { title: '7 professionelle Schriftarten', description: 'Sieben Schriftarten f\u00fcr Lesbarkeit in verschiedenen Altersstufen. Jede Schrift gestochen scharf in JPEG und PDF.' },
    ],
    [
      { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Arbeitsblatt Generator' },
      { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
      { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnung Generator' },
      { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
      { slug: 'picture-sort', pageType: 'tool', anchorText: 'Bilder-Sortieren Generator kostenlos testen' },
      { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Zuordnung & Sortierung Bundle \u2014 Sparen Sie bei allen 5 Generatoren' },
      { slug: 'create-sorting-worksheets', pageType: 'guide', anchorText: 'Sortier-Arbeitsbl\u00e4tter erstellen, die sich verkaufen' },
      { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: 'P\u00e4dagogische Druckvorlagen auf Etsy verkaufen' },
      { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten Druckvorlagen Nischen-Ideen' },
      { slug: 'printable-business-blueprint', pageType: 'start', anchorText: 'Druckvorlagen-Business Bauplan' },
    ]
  );
}

function generateShadowMatch() { return generateAppFile('shadow-match', 'matching', 'Schatten-Zuordnung Arbeitsblatt Generator', 'Silhouetten-Zuordnungs-Aktivit\u00e4ten, die visuelle Wahrnehmung und Formerkennung trainieren', 'Schatten-Zuordnung Generator | Silhouetten-Zuordnung Erstellen', 'Erstellen Sie druckbare Schatten-Zuordnungs-Arbeitsbl\u00e4tter mit Silhouetten-Paaren. 4\u20136 Paare pro Blatt, 104 Themen, Linie-Ziehen-Format. Kostenloser Generator mit PDF-Export.', 'Schatten-Zuordnung Arbeitsblatt Generator', ['Schatten-Zuordnung f\u00fcr Kinder','Silhouetten-Zuordnung Aktivit\u00e4ten','druckbare Schatten-Arbeitsbl\u00e4tter','Schatten zuordnen Arbeitsblatt Maker','Schatten-Zuordnungs-R\u00e4tsel'], ['visuelle Wahrnehmung Arbeitsbl\u00e4tter','Silhouetten-Erkennung','Schatten-Identifikation','Vorschule Zuordnungsspiele','visuelle Unterscheidung','Formerkennung Arbeitsbl\u00e4tter','Beobachtungsf\u00e4higkeiten','Figur-Grund Wahrnehmung'], '/samples/english/shadow match/shadow-match-horizontal.jpeg', 'Schatten-Zuordnungs-Arbeitsblatt mit bunten Bildern links und ihren Silhouetten rechts f\u00fcr Linie-Ziehen-Zuordnung', [{ src: '/samples/english/shadow match/shadow-match-horizontal.jpeg', alt: 'Schatten-Zuordnungs-Arbeitsblatt mit Tierbildern und abgedunkelten Silhouetten', caption: 'Tier Schatten-Zuordnung' }], 'TYvUXJeMI98', 'So erstellen Sie Schatten-Zuordnungs-Arbeitsbl\u00e4tter', 'Silhouetten-Zuordnung, die visuelle Wahrnehmung und Formerkennung trainiert',
    `Schatten-Zuordnung ist eine der wirksamsten Methoden, visuelle Wahrnehmung bei jungen Kindern zu entwickeln. Sch\u00fcler betrachten ein detailliertes, farbenfrohes Bild links und identifizieren den passenden Schatten oder die Silhouette rechts, dann zeichnen sie eine Verbindungslinie zwischen dem Paar. Diese Art von Aktivit\u00e4t st\u00e4rkt Figur-Grund-Wahrnehmung, Formerkennung und Aufmerksamkeit f\u00fcr Details \u2014 grundlegende F\u00e4higkeiten f\u00fcr Lesen, Schreiben und Mathematik.

Der Generator nimmt Ihre ausgew\u00e4hlten Bilder und rendert automatisch Schattenversionen durch invertierte und abgedunkelte Verarbeitung. Jeder Schatten bewahrt die Umrisse und Proportionen des Originalbildes, entfernt dabei Farbe und innere Details und erzeugt eine echte visuelle Herausforderung. Sch\u00fcler m\u00fcssen sich auf Gesamtform, markante Merkmale und relative Proportionen konzentrieren \u2014 F\u00e4higkeiten, die direkt auf Buchstaben- und Zahlenerkennung \u00fcbertragbar sind.

W\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Die linke Spalte zeigt farbenfrohe Detailbilder und die rechte Spalte ihre entsprechenden Schatten in gemischter Reihenfolge. Sch\u00fcler zeichnen Linien, um jedes Bild mit seiner Silhouette zu verbinden. W\u00e4hlen Sie aus 104 professionell illustrierten Themen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und mehr \u2014 mit markanten Silhouetten, die im Schattenformat wunderbar funktionieren.

Der Canvas-Editor erlaubt Anpassung von Farben, Schriftarten, Rahmen und Positionierung. Jedes Arbeitsblatt generiert einen automatischen L\u00f6sungsschl\u00fcssel. Die kostenlose Version enth\u00e4lt alle Funktionen mit Wasserzeichen \u2014 testen Sie jetzt alle Themen und Einstellungen ohne Anmeldung.`,
    [
      { title: 'Thema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen nach Kategorie. W\u00e4hlen Sie ein Thema mit markanten Formen f\u00fcr die beste Schatten-Zuordnungserfahrung.' },
      { title: 'Paaranzahl festlegen', description: 'W\u00e4hlen Sie 4, 5 oder 6 Zuordnungspaare pro Arbeitsblatt. Vier Paare f\u00fcr Vorschulkinder. F\u00fcnf f\u00fcr Standard-Aktivit\u00e4ten. Sechs f\u00fcr eine l\u00e4ngere Herausforderung.' },
      { title: 'Layout-Optionen konfigurieren', description: 'W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. Der Generator ordnet farbenfrohe Bilder links und automatisch gerenderte Schatten rechts an.' },
      { title: 'Im Canvas-Editor anpassen', description: 'F\u00fcgen Sie Anweisungen oder Titel hinzu, \u00e4ndern Sie Farben, wenden Sie dekorative Rahmen an und positionieren Sie Elemente per Drag-and-Drop.' },
      { title: 'Exportieren und Drucken', description: 'Laden Sie Ihr Schatten-Zuordnungs-Arbeitsblatt als JPEG oder PDF herunter. Ein L\u00f6sungsschl\u00fcssel mit korrekten Verbindungslinien wird automatisch generiert.' },
    ],
    [
      { title: 'Automatisches Schatten-Rendering', description: 'Der Generator verarbeitet jedes Bild durch invertierte und abgedunkelte Darstellung f\u00fcr realistische Silhouetten. Schatten bewahren Umrisse und Proportionen, entfernen Farbe und innere Details f\u00fcr echte visuelle Herausforderung.' },
      { title: 'Flexible Paaranzahl: 4, 5 oder 6', description: 'Vier Paare halten die Aktivit\u00e4t fokussiert f\u00fcr j\u00fcngere Kinder. F\u00fcnf Paare bieten Standard-L\u00e4nge. Sechs Paare bieten eine erweiterte Herausforderung und f\u00fcllen die Seite f\u00fcr ein professionelles Druckprodukt.' },
      { title: 'Linie-Ziehen Zuordnungsformat', description: 'Klassisches Zwei-Spalten-Layout mit farbenfrohen Bildern links und gemischten Schatten rechts. Sch\u00fcler zeichnen Verbindungslinien und \u00fcben dabei Feinmotorik neben visueller Unterscheidung.' },
      { title: '104 illustrierte Bildthemen', description: 'Jedes Thema bietet professionell gezeichnete Bilder mit markanten Formen f\u00fcr klare, erkennbare Silhouetten. Themen mit vielf\u00e4ltigen Formen erzeugen die ansprechendsten Schatten-R\u00e4tsel.' },
      { title: 'Automatische L\u00f6sungsschl\u00fcssel', description: 'Jedes Arbeitsblatt enth\u00e4lt einen L\u00f6sungsschl\u00fcssel mit den korrekten Verbindungslinien. Gleiches Layout und Design f\u00fcr einfache Korrektur oder Selbstlernen.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor mit Ebenensteuerung', description: 'Text mit Schrift, Gr\u00f6\u00dfe, Farbe und Umriss. Hintergr\u00fcnde, Rahmen, Drag-and-Drop, Ausrichtung, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelle Ergebnisse.' },
      { title: 'Doppelter Export: JPEG und PDF', description: 'JPEG f\u00fcr digitale Aktivit\u00e4ten und Etsy-Vorschaubilder. PDF f\u00fcr scharfen Unterrichtsdruck, KDP-Innenseiten und Aktivit\u00e4tenb\u00fccher.' },
      { title: '7 professionelle Schriftarten', description: 'Sieben Schriftarten f\u00fcr Lesbarkeit in verschiedenen Altersstufen. Gestochen scharf in JPEG und PDF.' },
    ],
    [
      { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Arbeitsblatt Generator' },
      { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
      { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten Generator' },
      { slug: 'picture-sort', pageType: 'app', anchorText: 'Bilder-Sortieren Generator' },
      { slug: 'shadow-match', pageType: 'tool', anchorText: 'Schatten-Zuordnung Generator kostenlos testen' },
      { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Zuordnung & Sortierung Bundle \u2014 Sparen Sie bei allen 5 Generatoren' },
      { slug: 'create-shadow-matching-worksheets', pageType: 'guide', anchorText: 'Schatten-Zuordnungs-Arbeitsbl\u00e4tter erstellen' },
      { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: 'P\u00e4dagogische Druckvorlagen auf Etsy verkaufen' },
      { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Vorschul-Druckvorlagen Nischen-Ideen' },
      { slug: 'amazon-kdp-activity-books', pageType: 'start', anchorText: 'Aktivit\u00e4tenb\u00fccher auf Amazon KDP ver\u00f6ffentlichen' },
    ]
  );
}

function generateSudoku() { return generateAppFile('sudoku', 'puzzle', 'Sudoku Generator', 'Bilder-Sudoku im 4\u00d74-Format, das Logik-R\u00e4tsel f\u00fcr junge Lernende zug\u00e4nglich macht', 'Sudoku Generator | 4\u00d74 Bilder-Sudoku R\u00e4tsel Gratis', 'Erstellen Sie 4\u00d74 bildbasierte Sudoku-R\u00e4tsel mit Zahlen oder Bildern. Leicht, mittel, schwer. 104 Themen, Querformat. Kostenloser Generator mit PDF-Export.', 'Sudoku Generator f\u00fcr Kinder', ['Bilder-Sudoku Maker','Bild-Sudoku Arbeitsbl\u00e4tter','druckbarer Sudoku Generator','4x4 Sudoku R\u00e4tsel','einfache Sudoku Arbeitsbl\u00e4tter'], ['Logik-R\u00e4tsel f\u00fcr Kinder','Sudoku f\u00fcr Anf\u00e4nger','kritisches Denken Aktivit\u00e4ten','Probleml\u00f6sung Arbeitsbl\u00e4tter','Mathe-Logik Spiele','Denksport druckbar','Gehirntraining f\u00fcr Kinder','Zahlensetzungs-R\u00e4tsel'], '/samples/english/sudoku/sudoku hard.jpeg', '4\u00d74 bildbasiertes Sudoku-R\u00e4tsel mit Tier-Thema und teilweise ausgef\u00fclltem Raster', [{ src: '/samples/english/sudoku/sudoku easy.jpeg', alt: 'Einfaches 4\u00d74 Sudoku mit 4 leeren Feldern und Lebensmittel-Thema', caption: 'Leicht \u2014 4 leere Felder' },{ src: '/samples/english/sudoku/sudoku medium.jpeg', alt: 'Mittleres 4\u00d74 Sudoku mit 6 leeren Feldern und Fahrzeug-Thema', caption: 'Mittel \u2014 6 leere Felder' },{ src: '/samples/english/sudoku/sudoku hard.jpeg', alt: 'Schweres 4\u00d74 Sudoku mit 8 leeren Feldern und Natur-Thema', caption: 'Schwer \u2014 8 leere Felder' },{ src: '/samples/english/sudoku/sudoku answer.jpeg', alt: 'Sudoku L\u00f6sungsschl\u00fcssel mit ausgef\u00fclltem Raster', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' }], 'bqVioFbkYbA', 'So erstellen Sie Bilder-Sudoku-R\u00e4tsel', 'Bilder-Sudoku im 4\u00d74-Format f\u00fcr junge Lernende',
    `Traditionelles 9\u00d79-Sudoku ist f\u00fcr junge Kinder zu komplex, aber die zugrundeliegende Logik \u2014 jedes Element erscheint genau einmal in jeder Zeile und Spalte \u2014 ist eine leistungsstarke Denkf\u00e4higkeit, die selbst Vorschulkinder erlernen k\u00f6nnen. Der Sudoku Generator erstellt 4\u00d74 bildbasierte Sudoku-R\u00e4tsel, die abstrakte Zahlen durch farbenfrohe Bilder aus der 104-Themen-Bibliothek ersetzen und logisches Schlie\u00dfen visuell und intuitiv machen.

Zwei F\u00fclltypen passen das R\u00e4tsel an verschiedene Schwierigkeitsgrade an. Der Bildmodus verwendet vier thematische Bilder, die Sch\u00fcler in leere Felder platzieren, wobei die Regel gilt, dass jedes Bild einmal pro Zeile und einmal pro Spalte vorkommt. Dieser Modus ist ideal f\u00fcr Leseanf\u00e4nger und visuelle Lernende. Der Zahlenmodus verwendet die Ziffern 1 bis 4 f\u00fcr Sch\u00fcler, die bereit sind, mit numerischen Darstellungen zu arbeiten und den \u00dcbergang zum Standard-Sudoku zu schaffen.

Drei Schwierigkeitsstufen steuern, wie viele Felder leer starten. Leicht entfernt 4 Felder und l\u00e4sst den Gro\u00dfteil des Rasters als Hilfestellung gef\u00fcllt. Mittel entfernt 6 Felder und erfordert mehr Schlussfolgerungsschritte. Schwer entfernt 8 Felder \u2014 die H\u00e4lfte des Rasters \u2014 und verlangt systematisches Denken zum L\u00f6sen. Das Standard-Querformat bietet einen breiten Arbeitsbereich, der gut auf Standardpapier passt.

Der Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Jedes R\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel mit dem vollst\u00e4ndig ausgef\u00fcllten Raster. Export als JPEG oder PDF. Graustufen f\u00fcr tintensparende Versionen. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.`,
    [
      { title: 'Bildthema w\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen und w\u00e4hlen Sie die vier Bilder f\u00fcr das 4\u00d74-Raster. Tiere, Lebensmittel und Fahrzeuge machen R\u00e4tsel visuell ansprechend.' },
      { title: 'F\u00fclltyp w\u00e4hlen', description: 'W\u00e4hlen Sie zwischen Bildmodus (thematische Bilder) oder Zahlenmodus (Ziffern 1\u20134). Bildmodus f\u00fcr Leseanf\u00e4nger. Zahlenmodus als Br\u00fccke zum Standard-Sudoku.' },
      { title: 'Schwierigkeitsgrad festlegen', description: 'W\u00e4hlen Sie Leicht (4 leere Felder), Mittel (6 leere Felder) oder Schwer (8 leere Felder). Leicht bietet starke Hilfestellung. Schwer erfordert echtes logisches Schlie\u00dfen.' },
      { title: 'Layout anpassen', description: 'Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfeld oder Anweisungen. Wenden Sie thematische Hintergr\u00fcnde und Rahmen an. Standard-Querformat f\u00fcr breiten, sauberen Arbeitsbereich.' },
      { title: 'R\u00e4tsel und L\u00f6sung exportieren', description: 'Laden Sie das R\u00e4tsel und den L\u00f6sungsschl\u00fcssel mit vollst\u00e4ndigem Raster als JPEG oder PDF herunter. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck.' },
    ],
    [
      { title: 'Zwei F\u00fclltypen: Bilder oder Zahlen', description: 'Bildmodus platziert thematische Bilder in Feldern \u2014 Sch\u00fcler erschlie\u00dfen durch visuelle Logik, welches Bild wohin geh\u00f6rt. Zahlenmodus verwendet Ziffern 1\u20134 f\u00fcr den \u00dcbergang zum Standard-Sudoku. Beide Modi lehren dieselbe Zeilen-Spalten-Logik.' },
      { title: 'Drei Schwierigkeitsstufen', description: 'Leicht entfernt 4 Felder (25% des Rasters), Mittel 6 Felder (37,5%), Schwer 8 Felder (50%). Jede Stufe erfordert progressiv mehr Schlussfolgerung. Der Generator stellt sicher, dass jedes R\u00e4tsel genau eine g\u00fcltige L\u00f6sung hat.' },
      { title: '4\u00d74 Raster f\u00fcr junge Lernende', description: 'Das 4\u00d74-Raster ist die ideale Einf\u00fchrung in Sudoku-Logik. Klein genug f\u00fcr Vorschulkinder, erfordert aber echtes deduktives Denken. Vier einzigartige Elemente pro Zeile und Spalte bauen die Grundf\u00e4higkeit auf, die sp\u00e4ter auf 9\u00d79-R\u00e4tsel skaliert.' },
      { title: '104 Bildthemen', description: 'Jedes Thema bietet hochwertige Bilder f\u00fcr die vier Rasterpositionen. Tiere, Lebensmittel, Fahrzeuge, Weltraum und saisonale Themen machen jedes R\u00e4tsel visuell ansprechend.' },
      { title: 'Standard-Querformat', description: 'Die Standard-Querformat-Ausrichtung bietet einen breiten Arbeitsbereich, der sauber auf Standardpapier druckt. Hochformat ebenfalls verf\u00fcgbar.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'Eigene Titel, Namensfelder, Anweisungen. Hintergrundfarben, thematische Rahmen. Drag-and-Drop, Ausrichtung, Zoom, R\u00fcckg\u00e4ngig f\u00fcr professionelle Ergebnisse.' },
      { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes R\u00e4tsel erzeugt einen L\u00f6sungsschl\u00fcssel mit dem vollst\u00e4ndigen 4\u00d74-Raster. Gleiches Layout f\u00fcr einfachen visuellen Vergleich.' },
      { title: 'Doppelter Export mit Graustufen-Option', description: 'Export als JPEG oder PDF. Graustufen-Umschaltung f\u00fcr Schwarz-Wei\u00df-Druck. R\u00e4tsel und L\u00f6sung werden separat in voller Qualit\u00e4t exportiert.' },
    ],
    [
      { slug: 'missing-pieces', pageType: 'app', anchorText: 'Fehlende Teile R\u00e4tsel Generator' },
      { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was Passt Nicht Generator' },
      { slug: 'picture-path', pageType: 'app', anchorText: 'Bildpfad Generator' },
      { slug: 'math-puzzle', pageType: 'app', anchorText: 'Mathe-R\u00e4tsel Generator' },
      { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Muster-Arbeitsblatt Generator' },
      { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
      { slug: 'sudoku', pageType: 'tool', anchorText: 'Sudoku Generator kostenlos testen' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Bundle \u2014 Sparen Sie bei allen R\u00e4tsel-Generatoren' },
      { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'R\u00e4tselb\u00fccher erstellen' },
      { slug: 'logic-printable-ideas', pageType: 'idea', anchorText: 'Logik-Druckvorlagen Nischen-Ideen' },
    ]
  );
}

function generateTreasureHunt() { return generateAppFile('treasure-hunt', 'search', 'Schatzsuche Generator', 'Folgen Sie den Richtungsanweisungen durch ein 5\u00d75 Raster, um den versteckten Schatz zu finden \u2014 einfache oder Himmelsrichtungen', 'Schatzsuche Generator | Richtungs-R\u00e4tsel Gratis Erstellen', 'Erstellen Sie Schatzsuche-Richtungsr\u00e4tsel auf einem 5\u00d75-Raster. Basis- oder Himmelsrichtungen, Keine-Nachbar-Duplikate. Kostenloser Generator mit L\u00f6sungsschl\u00fcsseln und PDF-Export.', 'Schatzsuche Arbeitsblatt Generator', ['Richtungs-Pfad R\u00e4tsel','Richtungs-Arbeitsbl\u00e4tter f\u00fcr Kinder','Schatzsuche druckbar','Himmelsrichtungen Arbeitsbl\u00e4tter','Wegfindungs-Aktivit\u00e4ten'], ['Richtungsanweisungen folgen Arbeitsbl\u00e4tter','r\u00e4umliche Orientierung','Kompass-Arbeitsbl\u00e4tter','Kartenkompetenz','Richtungs-Wortschatz','Navigations-R\u00e4tsel f\u00fcr Kinder','links rechts oben unten','Himmelsrichtungen Aktivit\u00e4ten'], '/samples/english/treasure hunt/Treasure Hunt 1.jpeg', 'Schatzsuche-Richtungsr\u00e4tsel auf einem 5\u00d75 Raster mit Pfeilrichtungen zum Schatz', [{ src: '/samples/english/treasure hunt/Treasure Hunt 3.jpeg', alt: 'Schatzsuche mit Basisrichtungen Oben Unten Links Rechts f\u00fcr junge Lernende', caption: 'Basisrichtungen-Modus' },{ src: '/samples/english/treasure hunt/Treasure Hunt 4.jpeg', alt: 'Schatzsuche mit Himmelsrichtungen Nord S\u00fcd Ost West', caption: 'Himmelsrichtungen-Modus' },{ src: '/samples/english/treasure hunt/Treasure Hunt 8.jpeg', alt: 'Schatzsuche L\u00f6sungsschl\u00fcssel mit hervorgehobenem korrektem Pfad', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' }], 'flHiBXsYLLA', 'So erstellen Sie Schatzsuche-Richtungsr\u00e4tsel', 'Folgen Sie den Richtungen durch ein 5\u00d75 Raster zum versteckten Schatz',
    `Das Erlernen von Richtungsanweisungen ist eine grundlegende F\u00e4higkeit, die Kinder zum Kartenlesen, Verstehen r\u00e4umlicher Beziehungen und Navigieren in ihrer Welt brauchen. Der Schatzsuche Generator erstellt Richtungs-Pfad-R\u00e4tsel auf einem 5\u00d75-Raster, bei denen Sch\u00fcler einer Folge von Richtungsbefehlen folgen, um einen Pfad von Start zu Ziel nachzuzeichnen und am Ende den versteckten Schatz zu erreichen.

Zwei Richtungstypen passen das R\u00e4tsel an verschiedene Altersstufen und F\u00e4higkeiten an. Basisrichtungen verwenden Oben, Unten, Links und Rechts \u2014 einfaches Vokabular ideal f\u00fcr Vorschule bis 1. Klasse, die r\u00e4umliche Orientierung lernen. Himmelsrichtungen verwenden Nord, S\u00fcd, Ost und West \u2014 Kartenlesevokabular f\u00fcr 2. Klasse und dar\u00fcber hinaus. Beide Modi lehren dieselbe Pfad-Folge-Logik, aber mit altersgerechtem Richtungsvokabular.

Das 5\u00d75-Raster bietet 25 Felder mit thematischen Bildern aus der 104-Themen-Bibliothek. Eine Keine-Nachbar-Duplikate-Regel stellt sicher, dass dasselbe Bild nie in zwei benachbarten Feldern erscheint, wodurch das Raster visuell klar bleibt und Verwechslungen verhindert werden. Sch\u00fcler lesen jeden Richtungsbefehl, bewegen sich zum n\u00e4chsten Feld und setzen fort, bis sie den Schatz an der festgelegten Endposition erreichen.

Jedes R\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel, der den korrekten Pfad durch das Raster nachzeichnet. Der Canvas-Editor f\u00fcgt Titel, Anweisungen und thematische Dekorationen hinzu. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen jetzt kostenlos \u2014 ohne Anmeldung.`,
    [
      { title: 'Richtungstyp w\u00e4hlen', description: 'W\u00e4hlen Sie Basisrichtungen (Oben/Unten/Links/Rechts) f\u00fcr Vorschule bis 1. Klasse oder Himmelsrichtungen (Nord/S\u00fcd/Ost/West) f\u00fcr 2. Klasse und dar\u00fcber. Beide Modi lehren Richtungsfolgen mit altersgerechtem Vokabular.' },
      { title: 'Bildthema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 Bildthemen f\u00fcr das 5\u00d75-Raster. Tiere, Lebensmittel, Fahrzeuge und Natur machen das Raster visuell ansprechend. Die Keine-Nachbar-Duplikate-Regel h\u00e4lt Bilder gut verteilt.' },
      { title: 'Start- und Endpositionen konfigurieren', description: 'Legen Sie fest, wo der Pfad beginnt und wo der Schatz liegt. Der Generator erstellt eine g\u00fcltige Folge von Richtungsbefehlen, die Start und Ende verbindet.' },
      { title: 'Layout anpassen', description: 'Nutzen Sie den Canvas-Editor f\u00fcr Titel, Namensfeld und Anweisungen. Wenden Sie thematische Hintergr\u00fcnde und Rahmen an. Positionieren Sie die Richtungsliste deutlich neben dem Raster.' },
      { title: 'R\u00e4tsel und L\u00f6sung exportieren', description: 'Laden Sie das Schatzsuche-R\u00e4tsel und seinen L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel zeichnet den korrekten Pfad nach. Graustufen f\u00fcr Schwarz-Wei\u00df-Druck.' },
    ],
    [
      { title: 'Zwei Richtungstypen: Basis und Himmelsrichtungen', description: 'Basismodus verwendet Oben, Unten, Links und Rechts f\u00fcr junge Lernende. Himmelsrichtungen-Modus verwendet Nord, S\u00fcd, Ost und West f\u00fcr \u00e4ltere Sch\u00fcler, die Kartenlesevokabular lernen.' },
      { title: '5\u00d75 Raster mit thematischen Bildern', description: 'Das 25-Felder-Raster f\u00fcllt sich mit thematischen Bildern. Jedes Feld zeigt ein Bild, durch das Sch\u00fcler beim Richtungsfolgen passieren. Die ideale Gr\u00f6\u00dfe f\u00fcr Richtungsr\u00e4tsel.' },
      { title: 'Keine-Nachbar-Duplikate-Regel', description: 'Der Generator stellt sicher, dass dasselbe Bild nie in zwei benachbarten Feldern erscheint (horizontal, vertikal oder diagonal). Dies h\u00e4lt das Raster visuell klar.' },
      { title: 'Konfigurierbare Start- und Endpositionen', description: 'Legen Sie Startfeld und Schatzposition \u00fcberall im Raster fest. Der Generator erstellt eine g\u00fcltige Richtungsfolge. Verschiedene Positionen erzeugen jedes Mal einzigartige Pfade.' },
      { title: '104 Bildthemen', description: 'Jedes Thema bietet Bilder, die die Rasterfelder f\u00fcllen. Tiere, Lebensmittel, Fahrzeuge und saisonale Themen f\u00fcr visuell ansprechende Raster.' },
      { title: 'Vollst\u00e4ndiger Canvas-Editor', description: 'Titel, Namensfelder, Anweisungen. Hintergrundfarben, thematische Rahmen. Drag-and-Drop, Zoom, R\u00fcckg\u00e4ngig f\u00fcr professionelles Design.' },
      { title: 'Automatischer L\u00f6sungsschl\u00fcssel', description: 'Jedes R\u00e4tsel generiert einen L\u00f6sungsschl\u00fcssel, der den korrekten Pfad von Start bis Schatz durch das Raster hervorhebt.' },
      { title: 'Doppelter Export mit Graustufen-Option', description: 'Export als JPEG oder PDF. Graustufen f\u00fcr tintensparendes Drucken. R\u00e4tsel und L\u00f6sung separat in voller Qualit\u00e4t.' },
    ],
    [
      { slug: 'find-and-count', pageType: 'app', anchorText: 'Finden & Z\u00e4hlen Generator' },
      { slug: 'find-objects', pageType: 'app', anchorText: 'Objekte Finden Generator' },
      { slug: 'crossword', pageType: 'app', anchorText: 'Kreuzwortr\u00e4tsel Generator' },
      { slug: 'picture-path', pageType: 'app', anchorText: 'Bildpfad Generator' },
      { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien Zeichnen Generator' },
      { slug: 'grid-match', pageType: 'app', anchorText: 'Raster-Zuordnung Generator' },
      { slug: 'treasure-hunt', pageType: 'tool', anchorText: 'Schatzsuche Generator kostenlos testen' },
      { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Suchen & Finden Bundle \u2014 Sparen Sie bei allen Such-Generatoren' },
      { slug: 'create-treasure-hunt-books', pageType: 'guide', anchorText: 'Schatzsuche-B\u00fccher erstellen' },
      { slug: 'direction-printable-ideas', pageType: 'idea', anchorText: 'Richtungs-Aktivit\u00e4ten Druckvorlagen-Ideen' },
    ]
  );
}

// Write all files
let count = 0;
for (const [appId, data] of Object.entries(allApps)) {
  const filePath = path.join(outDir, `${appId}.ts`);
  fs.writeFileSync(filePath, data.content, 'utf8');
  count++;
  console.log(`Created: ${filePath}`);
}

console.log(`\nDone! Created ${count} German app-content files.`);
