import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Missing Pieces (Fehlende Puzzleteile) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/missing-pieces-worksheets.ts
 * URL: /de/apps/fehlende-puzzleteile-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/fehlende-puzzleteile.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * German Keywords (from keywords.txt):
 * 1. Arbeitsblätter Grundschule
 * 2. Mathe-Arbeitsblätter
 * 3. Vorschul-Arbeitsblätter
 * 4. Einmaleins
 * 5. Schwungübungen
 * 6. Buchstaben lernen
 * 7. Ausmalbilder / Malvorlagen
 * 8. Kostenlose Arbeitsblätter
 * 9. Rechnen lernen / Rechnen 1. Klasse
 * 10. Deutsch-Arbeitsblätter
 */

export const missingPiecesDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'fehlende-puzzleteile-arbeitsblaetter',
    appId: 'missing-pieces',
    title: 'Fehlende Puzzleteile Generator - Kostenlose Arbeitsblätter Grundschule - Vorschule Arbeitsblätter zum Ausdrucken',
    description: 'Erstellen Sie professionelle Puzzle-Arbeitsblätter mit unserem Generator für fehlende Puzzleteile. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Generieren Sie visuelle Wahrnehmungs-Aktivitäten. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
    keywords: 'fehlende puzzleteile arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, visuelle wahrnehmung, puzzle arbeitsblätter, schwungübungen, ausmalbilder, buchstaben lernen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter',
  },

  // Hero Section - FULL text from fehlende-puzzleteile.md
  hero: {
    title: 'Fehlende Puzzleteile Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Puzzle-Generator für Vorschule Arbeitsblätter und Mathe Arbeitsblätter',
    description: `Erstellen Sie professionelle Puzzle-Arbeitsblätter mit unserem Generator für fehlende Puzzleteile. Mit Ihrem Vollzugriff Abonnement können Sie unbegrenzt Arbeitsblätter erstellen. Es fallen keine zusätzlichen Kosten pro Arbeitsblatt an. Laden Sie hochwertige PDF-Arbeitsblätter in weniger als 3 Minuten herunter. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.

Puzzles mit fehlenden Teilen fördern die visuelle Wahrnehmung von Kindern. Die Kleinen erkennen, welches Teil das Bild vervollständigt. Diese Aktivität stärkt das räumliche Denken und die Problemlösungsfähigkeiten. Lehrkräfte nutzen Puzzle-Arbeitsblätter zur Förderung der Beobachtungsgabe in der Vorschule und Grundschule.

Unser Arbeitsblatt-Generator erstellt automatisch das Puzzle und den Lösungsschlüssel. Wählen Sie ein Bild aus unserer Bibliothek mit über 3000 kindgerechten Motiven. Bestimmen Sie, wie viele Teile fehlen sollen. Legen Sie den Schwierigkeitsgrad fest. Der Generator erstellt das Arbeitsblatt sofort. Download als PDF oder JPEG für den Ausdruck zu Hause oder in der Schule.

Ideal für Erzieherinnen in der Vorschule, Grundschullehrkräfte und Eltern im Homeschooling. Erstellen Sie unbegrenzt Puzzle-Arbeitsblätter für Mathe Arbeitsblätter, Buchstaben lernen oder Deutsch Arbeitsblätter. Jedes Arbeitsblatt enthält den Lösungsschlüssel. Keine Designkenntnisse erforderlich. Professionelle Ergebnisse in wenigen Minuten.`,
    previewImageSrc: '/samples/english/missing pieces/worksheet.jpeg',
    ctaLabels: {
      tryFree: 'Kostenlos Testen',
      viewSamples: 'Beispiele Ansehen',
    },
    trustBadges: {
      languages: '11 Sprachen',
      images: '3000+ Bilder',
      license: 'Kommerzielle Lizenz',
    },
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    floatingStats: {
      time: '3 Min',
      action: 'Erstellen & Herunterladen',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/missing pieces/
  samples: {
    sectionTitle: 'Fehlende Puzzleteile Arbeitsblätter Beispiele',
    sectionDescription: 'Laden Sie kostenlose Beispiel-Arbeitsblätter herunter, um unsere professionelle Qualität zu sehen',
    downloadLabel: 'Kostenloses Beispiel Herunterladen',
    worksheetLabel: 'Arbeitsblatt',
    answerKeyLabel: 'Lösungsblatt',
    viewAllLabel: 'Größer anzeigen',
    noPdfLabel: 'Nur Vorschau',
    freePdfCountLabel: 'kostenlose Downloads',
    badgeText: 'Kostenlose Beispiele',
    downloadingLabel: 'Wird heruntergeladen...',
    ofLabel: 'von',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/missing pieces/worksheet.jpeg',
        answerKeySrc: '/samples/english/missing pieces/answer_key.jpeg',
        altText: 'Fehlende Puzzleteile Arbeitsblatt für Vorschule Arbeitsblätter und visuelle Wahrnehmung',
        pdfDownloadUrl: '/samples/english/missing pieces/worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/missing pieces/worksheet (1).jpeg',
        answerKeySrc: '/samples/english/missing pieces/answer_key (1).jpeg',
        altText: 'Arbeitsblätter Grundschule Puzzle mit fehlenden Teilen für Problemlösung',
        pdfDownloadUrl: '/samples/english/missing pieces/worksheet (1).pdf',
      },
    ],
  },

  // Features Grid - FULL text from fehlende-puzzleteile.md feature sections
  features: {
    sectionTitle: 'Funktionen des Puzzle-Generators - Kostenlose Arbeitsblätter für Mathe Arbeitsblätter und Vorschule Arbeitsblätter erstellen',
    sectionDescription: 'Unser Generator für fehlende Puzzleteile vereint leistungsstarke Funktionen mit einfacher Bedienung. Lehrkräfte erstellen professionelle Arbeitsblätter Grundschule ohne Designerfahrung. Die Plattform enthält alles für kostenlose Arbeitsblätter in allen Fächern. Das Vollzugriff Abonnement schaltet alle 33 Arbeitsblatt-Typen frei. Erstellen Sie unbegrenzt Materialien für den Unterricht oder zum Verkauf. Jede Funktion spart Lehrkräften wöchentlich Stunden an Vorbereitungszeit.',
    highlightBadgeText: 'Hauptfunktion',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    badgeText: 'Funktionen',
    trustBadges: {
      allFeatures: 'Alle Funktionen inklusive',
      noHiddenFees: 'Keine versteckten Kosten',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Arbeitsblätter Grundschule in 3 Klicks erstellen - Schneller Puzzle-Generator für Rechnen lernen',
        description: `Wählen Sie Ihr Bildthema und der Generator erstellt Ihr Arbeitsblatt sofort. Entscheiden Sie sich für Tiere, Essen, Fahrzeuge oder saisonale Themen. Bestimmen Sie den Schwierigkeitsgrad durch die Anzahl der fehlenden Teile. Konfigurieren Sie die Lösungsoptionen von 2 bis 6 Auswahlmöglichkeiten. Der gesamte Vorgang dauert unter 3 Minuten vom Start bis zum Download.

Klicken Sie auf das Themen-Dropdown und durchsuchen Sie die organisierten Kategorien. Wählen Sie ein Bild mit einem Klick aus. Das Bild erscheint sofort in Ihrem Vorschaubereich. Passen Sie die Puzzle-Einstellungen im Konfigurationsfeld an. Klicken Sie auf Generieren und sehen Sie, wie Ihr Arbeitsblatt Grundschule auf der Leinwand erscheint. Arbeitsblatt und Lösungsschlüssel werden gleichzeitig erstellt. Keine komplizierten Schritte oder technisches Wissen erforderlich.

Perfekt für vielbeschäftigte Lehrkräfte, die schnell hochwertige Materialien benötigen. Erstellen Sie täglich neue Arbeitsblätter ohne stundenlange Designarbeit. Generieren Sie mehrere Versionen desselben Puzzles mit unterschiedlichen Schwierigkeitsgraden. Nutzen Sie dasselbe Bild mit verschiedenen Teilezahlen für differenzierten Unterricht.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Mathe Arbeitsblätter und Rechnen 1. Klasse auf der Leinwand bearbeiten - Volle Anpassung für Kostenlose Arbeitsblätter',
        description: `Jedes Element auf Ihrer Arbeitsblatt-Leinwand ist vollständig bearbeitbar. Ziehen Sie Bilder mit der Maus an neue Positionen. Ändern Sie die Größe von Teilen durch Ziehen der Eckpunkte. Drehen Sie Elemente in jeden beliebigen Winkel. Löschen Sie unerwünschte Objekte mit einem Klick. Der visuelle Editor gibt Ihnen volle kreative Kontrolle.

Klicken Sie auf ein Objekt, um die kontextuelle Werkzeugleiste zu aktivieren. Nutzen Sie Ausrichtungsschaltflächen für perfekte Positionierung. Ebenensteuerungen verschieben Elemente nach vorne oder hinten. Sperren Sie wichtige Elemente gegen versehentliche Änderungen. Die Leinwand speichert Ihre letzten 50 Aktionen für unbegrenztes Rückgängigmachen.

Fügen Sie Textfelder für Anweisungen oder Schülernamen hinzu. Ändern Sie Schriftarten, Farben und Größen sofort. Wenden Sie Umrandungseffekte für bessere Sichtbarkeit an. Positionieren Sie Text überall auf der Mathe Arbeitsblätter Leinwand. Alle Änderungen erscheinen in Echtzeit während der Bearbeitung.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Buchstaben lernen und Deutsch Arbeitsblätter - Visuelle Lernaktivitäten für die Vorschule',
        description: `Puzzles mit fehlenden Teilen eignen sich hervorragend für Buchstaben lernen und Sprachunterricht. Wählen Sie Bilder, die mit bestimmten Buchstabenlauten beginnen. Erstellen Sie Deutsch Arbeitsblätter mit A wie Apfel visuellen Puzzles. Nutzen Sie Wortschatz-Arbeitsblätter mit Bildern für häufige Wörter.

Kinder identifizieren das fehlende Teil während sie Buchstabenerkennung üben. Das visuelle Format verstärkt Buchstaben lernen Konzepte durch Bilder. Kombinieren Sie mehrere Puzzles auf einer Seite für umfassende Übung. Generieren Sie thematische Sets wie B-Wörter oder kurze Vokal-Arbeitsblätter.

Perfekt für Lesestationen und Kleingruppenunterricht in der Vorschule. Kinder entwickeln phonologisches Bewusstsein beim Lösen visueller Puzzles. Das ansprechende Format hält die Aufmerksamkeit der Schüler länger als traditionelle Arbeitsblätter. Erstellen Sie differenzierte Deutsch Arbeitsblätter für gemischte Lerngruppen.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kostenlose Arbeitsblätter in 11 Sprachen - DaZ-Unterricht braucht Mathe Arbeitsblätter und Einmaleins',
        description: `Generieren Sie Arbeitsblätter in Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Schwedisch, Dänisch, Norwegisch oder Finnisch. Die Benutzeroberfläche übersetzt sich automatisch in Ihre gewählte Sprache. Bilddateinamen spiegeln die Sprachwahl für bessere Organisation wider. Perfekt für DaZ-Lehrkräfte, die Materialien für mehrsprachige Schüler erstellen.

Zweisprachige Klassenräume profitieren vom sofortigen Sprachwechsel. Erstellen Sie dasselbe Mathe Arbeitsblatt auf Deutsch und Türkisch zum Vergleich. Zweisprachige Programme nutzen parallele Arbeitsblätter in beiden Sprachen. Schüler sehen visuelle Puzzles mit kulturell angemessenen Bildern für jede Sprache.

Internationale Schulen in Deutschland finden altersgerechte Inhalte in der Muttersprache. Englische Arbeitsblätter für Immersionsprogramme sind sofort verfügbar. Die 11-Sprachen-Unterstützung macht Puzzle-Arbeitsblätter weltweit zugänglich.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz für den Verkauf von Ausmalbilder und Schwungübungen auf Lehrermarktplätzen',
        description: `Das Vollzugriff Abonnement enthält eine vollständige kommerzielle Print-on-Demand-Lizenz. Verkaufen Sie Puzzle-Arbeitsblätter auf Lehrermarktplätzen ohne zusätzliche Gebühren. Listen Sie Produkte auf Etsy, Amazon KDP oder Ihrer eigenen Website. Schaffen Sie passive Einkommensströme aus Arbeitsblatt-Produkten. Keine Quellenangabe oder Wasserzeichen auf kommerziellen Produkten erforderlich.

Viele Lehrkräfte verdienen 500 bis 5000 Euro monatlich mit druckbaren Arbeitsblättern. Puzzles mit fehlenden Teilen gehören zu den meistverkauften Bildungsressourcen. Bündeln Sie Arbeitsblätter Grundschule in thematischen Paketen für höhere Preise. Erstellen Sie saisonale Sammlungen, die Jahr für Jahr verkauft werden. Kombinieren Sie mit Schwungübungen und Ausmalbilder für komplette Aktivitätenhefte.

Die kommerzielle Lizenz deckt unbegrenzte Produkterstellung ab. Generieren Sie Hunderte einzigartiger Arbeitsblätter für Ihren Shop. Die professionelle 300 DPI Qualität sichert Kundenzufriedenheit.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder für Einmaleins Arbeitsblätter und Rechnen lernen in der 1. Klasse',
        description: `Durchsuchen Sie über 3000 kindgerechte Bilder, organisiert nach Themen. Suchen Sie per Stichwort, um sofort spezifische Inhalte zu finden. Klicken Sie auf ein Bild, um es in voller Größe anzuzeigen. Wählen Sie Bilder, die perfekt zu Ihren Lernzielen passen. Alle Bilder funktionieren wunderbar in Puzzles mit fehlenden Teilen.

Themenkategorien umfassen Tiere, Essen, Fahrzeuge, Jahreszeiten, Feiertage, Formen, Zahlen und Buchstaben. Jedes Thema enthält Dutzende verwandter Bilder. Erstellen Sie zusammenhängende Arbeitsblätter mit visuell konsistenten Grafiken. Mischen Sie Themen für kreative Kombinationen. Die umfangreiche Bibliothek ersetzt die Suche auf Stockfoto-Websites.

Jedes Bild ist für den pädagogischen Einsatz mit jungen Lernenden konzipiert. Grafiken zeigen klare Umrisse und leuchtende Farben. Einfache Illustrationen funktionieren besser als komplexe Fotos für visuelle Puzzles. Regelmäßige Ergänzungen erweitern die Bibliothek kontinuierlich.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität für Arbeitsblätter Grundschule - PDF- und JPEG-Downloads',
        description: `Exportieren Sie fertige Arbeitsblätter in professioneller 300 DPI Auflösung. Diese hohe Qualität ist perfekt für den Klassenzimmer-Ausdruck. Bilder bleiben scharf und klar auch bei großen Papierformaten. Text bleibt gestochen und lesbar für junge Schüler. Professionelle Druckdienste akzeptieren unsere Dateien ohne Qualitätsbedenken.

Laden Sie als PDF für universelle Kompatibilität herunter. PDF-Dateien behalten die exakte Formatierung auf allen Geräten. Senden Sie Dateien direkt an Schuldrucker. Teilen Sie digital mit Eltern für das Lernen zu Hause. Das PDF-Format bewahrt alle Farben, Bilder und Texte perfekt.

Wählen Sie das JPEG-Format für maximale Flexibilität. Fügen Sie JPEG-Arbeitsblätter in PowerPoint-Präsentationen ein. Aktivieren Sie den Graustufen-Modus für druckerfreundliche Versionen. Sparen Sie Farbdruckkosten ohne Qualitätseinbußen.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Eigene Bilder hochladen für Vorschule Arbeitsblätter und Schwungübungen',
        description: `Laden Sie beliebige Bilder von Ihrem Computer oder Gerät hoch. Der Generator akzeptiert JPEG-, PNG- und GIF-Formate. Wählen Sie mehrere Bilder gleichzeitig für schnelleren Arbeitsablauf. Ihre hochgeladenen Bilder erscheinen in einem eigenen Vorschaubereich. Klicken Sie auf ein hochgeladenes Bild, um es in Ihrem Puzzle zu verwenden.

Perfekt für personalisierte Vorschule Arbeitsblätter mit Schülerfotos. Erstellen Sie Arbeitsblätter mit Klassenzimmer-Objekten. Nutzen Sie Ausflugsfotos für unvergessliche Lernerfahrungen. Laden Sie Bilder lokaler Sehenswürdigkeiten für Gemeinschaftsthemen hoch. Schüler engagieren sich stärker, wenn sie vertraute Menschen und Orte wiedererkennen.

Kombinieren Sie hochgeladene Bilder mit Bibliotheksbildern im selben Arbeitsblatt. Lehrkräfte, die kommerzielle Produkte erstellen, laden gebrandete Grafiken hoch. Alle hochgeladenen Bilder behalten ihre hohe Qualität durch den 300 DPI Exportprozess.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '🔑',
        title: 'Duales Leinwand-System für Einmaleins und Rechnen lernen - Arbeitsblatt und Lösungsschlüssel',
        description: `Die Plattform generiert automatisch zwei separate Leinwände. Die Arbeitsblatt-Leinwand zeigt das Puzzle mit fehlenden Teilen und Lösungsoptionen. Die Lösungsschlüssel-Leinwand zeigt das vollständige Bild mit markierten korrekten Antworten. Beide Leinwände bleiben unabhängig voneinander vollständig bearbeitbar.

Wechseln Sie zwischen Arbeitsblatt und Lösungsschlüssel mit Tab-Schaltflächen. Bearbeiten Sie jede Leinwand ohne die andere zu beeinflussen. Passen Sie den Lösungsschlüssel mit zusätzlichen Lehrernotizen an. Fügen Sie Bewertungsrubriken oder Punktwerte direkt auf dem Lösungsblatt hinzu. Beide Versionen werden als separate Dateien für einfache Organisation heruntergeladen.

Lehrkräfte sparen Zeit durch automatisierte Lösungsschlüssel-Erstellung. Keine manuelle Erstellung von Lösungsblättern erforderlich. Der Lösungsschlüssel kreist korrekte Teile ein und nummeriert sie deutlich. Perfekt für Vertretungsmappen und Hausaufgabenpakete.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '📊',
        title: 'Anpassbare Schwierigkeit für Deutsch-Arbeitsblätter und Buchstaben lernen',
        description: `Legen Sie fest, wie viele Teile aus Ihrem Bild entfernt werden. Nutzen Sie den Zähler für fehlende Teile, um 1 bis 5 Teile zu wählen. Beginnen Sie mit 1 fehlendem Teil für einfache Vorschule Arbeitsblätter. Erhöhen Sie auf 3-5 Teile für fortgeschrittene Grundschüler. Der Schwierigkeitsgrad skaliert perfekt mit den Fähigkeiten der Schüler.

Wählen Sie Lösungsoptionen von 2 bis 6 Auswahlmöglichkeiten. Weniger Optionen schaffen einfachere Puzzles für junge Lernende. Mehr Optionen fordern Schüler heraus, genauer auf Details zu achten. Passen Sie diese Einstellung an Ihre Unterrichtsziele an. Die Flexibilität unterstützt differenzierten Unterricht mühelos.

Wählen Sie Ihre Teilform aus sechs Optionen. Quadratische Formen eignen sich gut für geometrische Mathe Arbeitsblätter. Kreise passen zu Buchstaben lernen und Buchstabenerkennung. Die Seiteneinrichtung gewährleistet jedes Mal perfekten Ausdruck.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from fehlende-puzzleteile.md step sections
  howTo: {
    sectionTitle: 'Anleitung: Kostenlose Arbeitsblätter und Mathe Arbeitsblätter in 5 einfachen Schritten erstellen',
    sectionDescription: 'Das Erstellen von Puzzles mit fehlenden Teilen dauert weniger als 3 Minuten vom Start bis zum fertigen Arbeitsblatt. Der Schritt-für-Schritt-Prozess funktioniert identisch für Deutsch Arbeitsblätter, Rechnen lernen und Buchstaben lernen Aktivitäten. Lehrkräfte benötigen keine Designerfahrung oder technische Schulung. Jeder Schritt nutzt einfache Klick-Steuerungen. Der gesamte Ablauf fühlt sich intuitiv an, selbst für Erstnutzer.',
    ctaText: 'Jetzt Erstellen',
    badgeText: 'So funktioniert es',
    stepLabel: 'Schritt',
    completionTitle: 'Fertig!',
    completionSubtitle: 'Ihr Arbeitsblatt ist bereit',
    readyTime: 'In unter 3 Minuten fertig',
    noSkillsNeeded: 'Keine Designkenntnisse nötig',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Schritt 1: Bild auswählen für Buchstaben lernen und Deutsch Arbeitsblätter - Themenauswahl oder eigener Upload',
        description: `Beginnen Sie mit der Auswahl des Bildes, das zu Ihrem Puzzle wird. Klicken Sie auf das Themen-Dropdown im Bildbibliotheksbereich. Durchsuchen Sie organisierte Kategorien wie Tiere, Essen, Fahrzeuge, Formen und Buchstaben. Jedes Thema enthält Dutzende kindgerechter Bilder, perfekt für Arbeitsblätter Grundschule.

Wählen Sie Bilder, die zu Ihren Lernzielen passen. Wählen Sie Äpfel für Rechnen lernen Arbeitsblätter zum Zählen. Nehmen Sie Buchstabenbilder für Buchstaben lernen Aktivitäten. Finden Sie Fahrzeuge für den Wortschatzaufbau. Die thematische Organisation macht das Finden relevanter Bilder schnell und einfach.

Nutzen Sie das Suchfeld, um spezifische Inhalte zu finden. Tippen Sie Katze ein, um sofort alle Katzenbilder zu sehen. Suchen Sie Zahlen für Mathe Arbeitsblätter Grafiken. Laden Sie eigene Bilder für personalisierte Puzzles hoch.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Puzzle-Einstellungen für Schwungübungen und Ausmalbilder konfigurieren - Schwierigkeit und Teilform anpassen',
        description: `Legen Sie fest, wie viele Teile aus Ihrem Bild entfernt werden. Nutzen Sie den Zähler für fehlende Teile, um 1 bis 5 Teile zu wählen. Beginnen Sie mit 1 fehlendem Teil für einfache Vorschule Arbeitsblätter. Erhöhen Sie auf 3-5 Teile für fortgeschrittene Grundschüler.

Wählen Sie Lösungsoptionen von 2 bis 6 Auswahlmöglichkeiten. Weniger Optionen schaffen einfachere Puzzles für junge Lernende. Mehr Optionen fordern Schüler heraus, genauer auf Details zu achten.

Wählen Sie Ihre Teilform aus sechs Optionen. Quadratische Formen eignen sich gut für geometrische Mathe Arbeitsblätter. Kreise passen zu Buchstaben lernen und Buchstabenerkennung. Konfigurieren Sie Seitengröße und Ausrichtungseinstellungen. Fügen Sie Hintergründe und Rahmen aus thematischen Sammlungen hinzu.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Kostenlose Arbeitsblätter generieren - Soforterstellung von Einmaleins und Rechnen 1. Klasse Puzzles',
        description: `Klicken Sie auf die Schaltfläche Arbeitsblatt generieren, um Ihr Puzzle zu erstellen. Die Plattform verarbeitet Ihr Bild sofort. Beobachten Sie, wie fehlende Teile an strategischen Stellen ausgeschnitten werden. Sehen Sie, wie sich die Lösungsoptionen unterhalb des Hauptbildes anordnen. Die gesamte Generierung dauert weniger als 5 Sekunden.

Die Arbeitsblatt-Leinwand zeigt Ihr vollständiges Puzzle sofort an. Das Hauptbild zeigt entfernte Teile als weiße Flächen. Lösungsoptionen erscheinen in einem Raster darunter. Eine Option enthält das korrekte fehlende Teil. Andere zeigen plausible, aber falsche Alternativen.

Arbeitsblatt und Lösungsschlüssel werden gleichzeitig generiert. Wechseln Sie zur Lösungsschlüssel-Registerkarte, um das vollständige Bild zu sehen. Korrekte Antworten sind deutlich eingekreist und nummeriert.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Arbeitsblätter Grundschule und Vorschule Arbeitsblätter auf der Leinwand bearbeiten',
        description: `Klicken Sie auf ein beliebiges Element auf Ihrem Arbeitsblatt, um es auszuwählen. Ziehen Sie Bilder mit der Maus an neue Positionen. Ändern Sie die Größe von Teilen durch Ziehen der Eckpunkte. Drehen Sie Elemente durch Bewegen des Drehgriffs. Die intuitiven Steuerungen fühlen sich sofort natürlich an.

Fügen Sie Textanweisungen direkt auf dem Arbeitsblatt hinzu. Klicken Sie auf die Schaltfläche Text hinzufügen im Textwerkzeugbereich. Tippen Sie Ihre Anweisungen für die Schüler ein. Positionieren Sie das Textfeld überall auf der Seite.

Nutzen Sie Ausrichtungswerkzeuge für professionelle Layouts. Zentrieren Sie alle Elemente horizontal auf der Seite. Richten Sie Lösungsoptionen in perfekten Reihen aus. Sperren Sie Elemente, die Sie bewahren möchten.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Druckbare Malvorlagen und Mathe Arbeitsblätter herunterladen - Hochwertige PDF- und JPEG-Dateien',
        description: `Öffnen Sie das Download-Dropdown, wenn die Bearbeitung abgeschlossen ist. Wählen Sie zwischen Arbeitsblatt- und Lösungsschlüssel-Downloads. Wählen Sie PDF-Format für universelle Kompatibilität. Nehmen Sie JPEG für maximale Flexibilität bei Präsentationen. Beide Formate exportieren in professioneller 300 DPI Auflösung.

Laden Sie zuerst das Arbeitsblatt für die Schülerverteilung herunter. Speichern Sie die Datei in Ihrem vorgesehenen Ordner. Das Arbeitsblatt enthält das Puzzle und die Lösungsoptionen. Laden Sie den Lösungsschlüssel separat für den Lehrergebrauch herunter.

Aktivieren Sie den Graustufen-Modus vor dem Download, wenn gewünscht. Diese Option spart erheblich Farbdruckkosten. Drucken Sie sofort oder speichern Sie für die spätere Verwendung. Ihr Vollzugriff Abonnement (240€/Jahr) deckt unbegrenzte Downloads ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from fehlende-puzzleteile.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte, Eltern und Pädagogen - Arbeitsblätter Grundschule und Vorschule Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Puzzle-Arbeitsblätter mit fehlenden Teilen dienen vielfältigen pädagogischen Umgebungen und Unterrichtsstilen. Erzieherinnen in der Vorschule nutzen sie für Lernstationen und erste Mathematik. Grundschullehrkräfte erstellen mühelos differenzierte Aufgaben. Homeschooling-Eltern generieren individuelle Materialien passend zu ihrem Lehrplan.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieherinnen in der Vorschule - Buchstaben lernen und Schwungübungen für den täglichen Morgenkreis',
        subtitle: 'Vorschule Arbeitsblätter für kognitive Entwicklung',
        description: `Erzieherinnen in der Vorschule stehen vor ständigem Bedarf an frischen, ansprechenden Materialien. Kinder brauchen tägliche Übung mit Buchstabenerkennung und Lauten. Puzzles mit fehlenden Teilen machen Buchstaben lernen interaktiv und unterhaltsam. Kinder identifizieren fehlende Buchstabenteile während sie visuelle Unterscheidungsfähigkeiten entwickeln.

Nutzen Sie Buchstaben lernen Arbeitsblätter während der Morgenarbeit. Richten Sie Lernstationen mit verschiedenen Schwungübungen für jede Station ein. Erstellen Sie wöchentliche thematische Sets passend zu Ihren Wochenplänen. Kinder bearbeiten Puzzles selbstständig, während Sie mit Kleingruppen arbeiten.

Generieren Sie neue Vorschule Arbeitsblätter in Minuten statt Stunden. Wechseln Sie Bilder wöchentlich, um das Interesse der Kinder aufrechtzuerhalten. Passen Sie die Schwierigkeit an, wenn Kinder im Laufe des Jahres Fortschritte machen.`,
        quote: 'Meine Vorschulkinder lieben die bunten Puzzle-Arbeitsblätter mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte der 1. bis 3. Klasse - Mathe Arbeitsblätter und Einmaleins für differenzierten Unterricht',
        subtitle: 'Arbeitsblätter Grundschule für 1. bis 3. Klasse',
        description: `Grundschullehrkräfte benötigen Materialien, die große Leistungsunterschiede abdecken. Manche Schüler zählen bis 10, während andere bereits zweistellig rechnen. Puzzles mit fehlenden Teilen passen sich jedem Mathe-Niveau an. Nutzen Sie Zahlenbilder für Zählübungen. Erstellen Sie Einmaleins Arbeitsblätter mit visuellen Darstellungen.

Lehrkräfte generieren Mathe Arbeitsblätter passend zu spezifischen Lehrplanvorgaben. Wählen Sie Bilder mit Mengen für die Zahlenraumentwicklung. Nehmen Sie Formen für geometrische Erkennungsübungen. Die Bibliothek mit über 3000 Bildern unterstützt jedes Mathematikkonzept.

Erstellen Sie schnell gestufte Aufgaben für differenzierten Matheunterricht. Machen Sie drei Versionen desselben Arbeitsblatts mit unterschiedlichen Schwierigkeitsgraden. Lehrkräfte der 1. Klasse nutzen Puzzles für Lernstandserhebungen.`,
        quote: 'Ich erstelle differenzierte Puzzle-Arbeitsblätter für alle meine Schüler in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschooling-Eltern - Kostenlose Arbeitsblätter und Deutsch Arbeitsblätter für den Unterricht mehrerer Klassenstufen',
        subtitle: 'Buchstaben lernen und Feinmotorik für zu Hause',
        description: `Homeschooling-Eltern unterrichten mehrere Klassenstufen gleichzeitig. Erstellen Sie Vorschule Arbeitsblätter für Ihr jüngstes Kind. Generieren Sie Deutsch Arbeitsblätter für ältere Schüler. Nutzen Sie dieselbe Plattform für alle Altersgruppen und Fächer. Die Effizienz spart wertvolle Homeschooling-Planungszeit.

Personalisieren Sie Materialien mit Familienfotos und bedeutungsvollen Bildern. Laden Sie Urlaubsbilder für Erdkundeunterricht hoch. Nutzen Sie Haustierfotos für naturwissenschaftlichen Wortschatzaufbau. Individuelle visuelle Inhalte machen das Lernen persönlich und ansprechend.

Bauen Sie komplette Lehrplaneinheiten effizient auf. Erstellen Sie Deutsch Arbeitsblätter für den Sprachunterricht. Generieren Sie Mathe Arbeitsblätter für den Mathematikunterricht. Die Plattform ersetzt mehrere Arbeitsblatt-Quellen durch ein umfassendes Werkzeug.`,
        quote: 'Perfekt für alle meine Kinder auf unterschiedlichen Niveaus!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ-Lehrkräfte - Buchstaben lernen und Einmaleins Arbeitsblätter in 11 Sprachen',
        subtitle: 'Deutsch-Arbeitsblätter für mehrsprachigen Unterricht',
        description: `DaZ-Lehrkräfte brauchen ständig Materialien in mehreren Sprachen. Generieren Sie an einem Tag Arbeitsblätter auf Deutsch. Erstellen Sie am nächsten Tag türkische Buchstaben lernen Arbeitsblätter für Herkunftssprachenunterricht. Die 11-Sprachen-Unterstützung bedient vielfältige mehrsprachige Klassenräume mühelos.

Neu zugewanderte Schüler lernen Wortschatz durch visuelle Verknüpfung. Puzzles mit fehlenden Teilen verbinden Bilder natürlich mit Wörtern. Schüler sehen Bilder, die Vokabelbegriffe darstellen. Das visuelle Format unterstützt den Spracherwerb effektiv für DaZ-Anfänger.

Erstellen Sie parallele Arbeitsblätter für Übersetzungsübungen. Generieren Sie dasselbe Puzzle auf Deutsch und in der Herkunftssprache. Internationale Schulen in Deutschland bedienen Schüler aus vielen Sprachhintergründen.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderschullehrkräfte - Rechnen lernen und Ausmalbilder für individuelle Förderpläne',
        subtitle: 'Differenzierte Materialien für individuelle Förderung',
        description: `Förderschullehrkräfte brauchen hochgradig anpassbare Materialien. Passen Sie die Schwierigkeit für individuelle Förderziele einfach an. Erstellen Sie extrem einfache Puzzles mit 1 fehlendem Teil und 2 großen Optionen. Bauen Sie komplexe Herausforderungen für Hochbegabten-Förderpläne. Jeder Schüler erhält angemessene Materialien.

Ziele zur visuellen Verarbeitung profitieren vom Puzzle-Format. Schüler üben natürlich Figur-Grund-Unterscheidung. Teil-Ganzes-Beziehungen werden durch Puzzles konkret. Räumliches Denken entwickelt sich durch wiederholte Übung.

Generieren Sie Materialien für Schüler ohne Lesefähigkeit einfach. Nutzen Sie reine Bild-Ausmalbilder ohne Textbeschriftungen. Erstellen Sie Zahlenerkennung Rechnen lernen Arbeitsblätter mit Mengenbildern. Verfolgen Sie Datenerhebungsanforderungen effizient.`,
        quote: 'Ich kann schnell individualisierte Puzzle-Arbeitsblätter für jeden Schüler erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrkräfte mit Nebenerwerb - Malvorlagen und Schwungübungen auf Lehrermarktplätzen verkaufen',
        subtitle: 'Kommerzielle Lizenz für passive Einnahmen',
        description: `Lehrkräfte mit Nebenerwerb verdienen passives Einkommen durch den Verkauf von Arbeitsblatt-Produkten. Erstellen Sie professionelle Puzzle-Sets für Lehrermarktplätze. Generieren Sie thematische Malvorlagen Pakete für Etsy-Shops. Bauen Sie saisonale Schwungübungen Pakete für ganzjährige Verkäufe.

Top-Verkäufer auf Lehrermarktplätzen verdienen 500 bis 5000 Euro monatlich. Puzzles mit fehlenden Teilen gehören zu den meistverkauften Ressourcentypen. Bündeln Sie 20-30 Arbeitsblätter in thematischen Paketen. Bepreisen Sie Sets mit 4 bis 8 Euro für starke Gewinnmargen.

Bauen Sie charakteristische Produktlinien mit konsistentem Branding auf. Laden Sie eigene Rahmen für erkennbaren visuellen Stil hoch. Die 300 DPI Exportqualität sichert Kundenzufriedenheit.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from fehlende-puzzleteile.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zum Puzzle-Generator - Vorschule Arbeitsblätter, Mathe Arbeitsblätter und Kostenlose Arbeitsblätter FAQ',
    sectionDescription: 'Lehrkräfte und Eltern stellen regelmäßig Fragen zu den Möglichkeiten von Puzzle-Arbeitsblättern mit fehlenden Teilen. Die folgenden Antworten behandeln häufige Fragen zu Fähigkeiten, Kompatibilität und Unterrichtseinsatz.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [
      {
        id: '1',
        question: 'Kann ich Mathe Arbeitsblätter und Rechnen lernen Aktivitäten für Vorschulkinder erstellen?',
        answer: 'Ja, der Puzzle-Generator erstellt perfekte Mathe Arbeitsblätter für die Vorschule. Wählen Sie Bilder mit zählbaren Objekten wie Äpfeln, Sternen oder Tieren. Konfigurieren Sie einfache Puzzles mit 1 fehlendem Teil und 2-3 Lösungsoptionen. Vorschulkinder identifizieren das fehlende Teil während sie Zahlen und Mengen visuell verarbeiten. Rechnen lernen beginnt mit visueller Zahlenerkennung in der frühen Kindheit.',
      },
      {
        id: '2',
        question: 'Gibt es Kostenlose Arbeitsblätter für Schwungübungen und Feinmotorik?',
        answer: 'Die Plattform bietet im Rahmen des Vollzugriff Abonnements unbegrenzte Arbeitsblatterstellung. Alle erstellten Materialien sind in der Abonnementgebühr enthalten. Generieren Sie so viele Schwungübungen verwandte Puzzles wie benötigt. Kombinieren Sie Puzzle-Aktivitäten mit traditionellen Schwungübungen für umfassende Feinmotorik-Programme. Das Abonnement amortisiert sich schnell durch die enorme Zeitersparnis.',
      },
      {
        id: '3',
        question: 'Wie erstelle ich Deutsch Arbeitsblätter und Buchstaben lernen Puzzles für den Anfangsunterricht?',
        answer: 'Wählen Sie Bilder aus der Buchstaben-Kategorie in der Bildbibliothek. Jeder Buchstabe hat mehrere zugehörige Bilder verfügbar. Erstellen Sie A wie Apfel Puzzles für den Buchstaben A. Generieren Sie B wie Ball Arbeitsblätter für den nächsten Buchstaben. Das systematische Vorgehen unterstützt den Buchstaben lernen Prozess perfekt. Das visuelle Puzzle-Format verstärkt die Buchstabe-Laut-Verbindung natürlich.',
      },
      {
        id: '4',
        question: 'Funktionieren Einmaleins und Rechnen 1. Klasse Arbeitsblätter mit diesem Generator?',
        answer: 'Der Puzzle-Generator eignet sich hervorragend für visuelle Mathematik-Unterstützung. Einmaleins Lernen profitiert von bildlicher Darstellung der Multiplikation. Zeigen Sie 3 Gruppen mit je 4 Äpfeln für die Aufgabe 3×4. Kinder sehen die Mengen konkret statt abstrakt. Rechnen 1. Klasse Konzepte werden durch visuelle Puzzles greifbar. Nutzen Sie Zahlenbilder für Addition und Subtraktion im Zahlenraum bis 20.',
      },
      {
        id: '5',
        question: 'Kann ich Ausmalbilder und Malvorlagen als Puzzle-Basis verwenden?',
        answer: 'Ja, laden Sie eigene Ausmalbilder als Puzzle-Grundlage hoch. Der Generator akzeptiert jedes Bildformat einschließlich Schwarz-Weiß-Grafiken. Ausmalbilder mit klaren Konturen funktionieren besonders gut für Puzzles. Kinder lösen das Puzzle und können das Bild anschließend ausmalen. Kombinieren Sie Puzzle-Aktivität mit Malvorlagen für erweiterte Beschäftigung.',
      },
      {
        id: '6',
        question: 'Eignen sich Arbeitsblätter Grundschule mit fehlenden Teilen für alle Klassenstufen?',
        answer: 'Der Generator erstellt Arbeitsblätter Grundschule für alle Klassenstufen von der 1. bis zur 4. Klasse. Passen Sie die Schwierigkeit durch die Anzahl fehlender Teile an. Erstklässler arbeiten mit 1-2 fehlenden Teilen und 3 Optionen. Viertklässler bewältigen 4-5 fehlende Teile mit 6 Optionen problemlos. Das konsistente Format ermöglicht klassenübergreifende Nutzung.',
      },
      {
        id: '7',
        question: 'Wie unterstützen Schwungübungen und Vorschule Arbeitsblätter die Schulvorbereitung?',
        answer: 'Puzzle-Aktivitäten entwickeln kritische Vorläuferfähigkeiten für den Schulerfolg. Visuelle Unterscheidung ist grundlegend für das Lesenlernen. Teil-Ganzes-Verständnis bereitet auf mathematisches Denken vor. Konzentrationsfähigkeit wächst durch fokussierte Puzzle-Arbeit. Vorschule Arbeitsblätter mit Puzzles trainieren all diese Fähigkeiten gleichzeitig. Das spielerische Format versteckt den Übungscharakter geschickt.',
      },
      {
        id: '8',
        question: 'Kann ich Buchstaben lernen und Einmaleins Arbeitsblätter in verschiedenen Sprachen erstellen?',
        answer: 'Die Plattform unterstützt 11 Sprachen für Buchstaben lernen und Einmaleins Arbeitsblätter. Wechseln Sie die Spracheinstellung im Dropdown-Menü. Die Benutzeroberfläche übersetzt sich automatisch. Bildnamen reflektieren die gewählte Sprache für bessere Organisation. DaZ-Lehrkräfte erstellen parallele Buchstaben lernen Arbeitsblätter in Deutsch und der Herkunftssprache.',
      },
      {
        id: '9',
        question: 'Sind Malvorlagen und Kostenlose Arbeitsblätter für den Förderschulunterricht geeignet?',
        answer: 'Puzzle-Arbeitsblätter eignen sich hervorragend für den Förderschulunterricht. Passen Sie Schwierigkeitsgrade präzise an individuelle Förderpläne an. Erstellen Sie extrem einfache Puzzles mit 1 Teil und 2 großen Optionen. Nutzen Sie kontrastreiche Malvorlagen als Grundlage für bessere Sichtbarkeit. Generieren Sie wöchentlich neue Puzzles zum selben Lernziel für wiederholte Übung.',
      },
      {
        id: '10',
        question: 'Wie verkaufe ich Rechnen lernen und Deutsch Arbeitsblätter auf Lehrermarktplätzen?',
        answer: 'Das Vollzugriff Abonnement enthält eine vollständige kommerzielle Lizenz. Erstellen Sie Rechnen lernen Puzzle-Pakete für Ihren Online-Shop. Generieren Sie Deutsch Arbeitsblätter Sammlungen für den Verkauf. Listen Sie Produkte auf Lehrermarktplätzen, Etsy oder Amazon KDP. Keine zusätzlichen Lizenzgebühren. Erfolgreiche Verkäufer bündeln 20-30 thematische Arbeitsblätter pro Produkt.',
      },
      {
        id: '11',
        question: 'Enthalten Mathe Arbeitsblätter und Arbeitsblätter Grundschule automatisch Lösungsschlüssel?',
        answer: 'Ja, jedes generierte Arbeitsblatt enthält automatisch einen Lösungsschlüssel. Klicken Sie auf Generieren und beide Versionen werden erstellt. Die Arbeitsblatt-Registerkarte zeigt das Puzzle mit Lösungsoptionen. Die Lösungsschlüssel-Registerkarte zeigt das vollständige Bild mit markierten korrekten Antworten. Laden Sie beide Versionen separat als PDF oder JPEG herunter.',
      },
      {
        id: '12',
        question: 'Funktionieren Ausmalbilder und Kostenlose Arbeitsblätter auch für Homeschooling-Familien?',
        answer: 'Homeschooling-Eltern gehören zu den begeistertsten Nutzern der Plattform. Erstellen Sie personalisierte Ausmalbilder Puzzles mit Familienfotos. Generieren Sie thematische Arbeitsblätter passend zum individuellen Lehrplan. Das Abonnement deckt unbegrenzte Arbeitsblatterstellung für alle Fächer und Altersstufen ab. Familien mit mehreren Kindern profitieren besonders stark.',
      },
    ],
  },

  // Pricing - Vollzugriff pricing (240€/year)
  pricing: {
    title: 'Voller Zugang',
    price: '240€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Arbeitsblatterstellung',
      'Alle 33 Apps inklusive',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
      'Lösungsblätter inklusive',
    ],
    ctaText: 'Jetzt Erstellen',
    guaranteeText: '30 Tage Geld-zurück-Garantie',
  },

  // Related Apps - Apps that work well with missing-pieces
  relatedApps: {
    sectionTitle: 'Fehlende Puzzleteile mit 32 anderen Generatoren kombinieren - Einmaleins, Schwungübungen und Arbeitsblätter Grundschule',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Puzzle-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlose Testversion Starten',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert hervorragend mit',
    exploreText: 'Alle Apps erkunden',
    trustBadges: {
      guarantee: '30 Tage Geld-zurück-Garantie',
      securePayment: 'Sichere Bezahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Additions-Generator',
        category: 'Mathematik',
        icon: '➕',
        description: 'Kombinieren Sie Rechnen lernen und Rechnen 1. Klasse mit visueller Wahrnehmung. Schüler lösen Puzzles dann vervollständigen sie Additionsaufgaben.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✍️',
        description: 'Ergänzen Sie Puzzles mit Schwungübungen für vollständige Vorschule Arbeitsblätter. Beide Apps trainieren Feinmotorik und visuelle Wahrnehmung.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Sprache',
        icon: '🔤',
        description: 'Kombinieren Sie Buchstaben lernen Aktivitäten mit Puzzles. Verstecken Sie Buchstabenbilder für Alphabet-Pakete.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Erstellen Sie Ausmalbilder und Malvorlagen Kombi-Pakete. Kinder lösen Puzzles dann malen das Arbeitsblatt aus.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Zuordnungs-Generator',
        category: 'Logik',
        icon: '🔗',
        description: 'Ergänzen Sie Puzzles mit Vorschule Arbeitsblätter für Matching-Übungen. Beide trainieren visuelle Unterscheidung.',
      },
      {
        id: '6',
        slug: 'math-puzzle',
        name: 'Mathe-Arbeitsblätter',
        category: 'Mathematik',
        icon: '🧮',
        description: 'Kombinieren Sie Mathe Arbeitsblätter mit Puzzles für unterhaltsame Übungspakete. Einmaleins und Zahlenrätsel inklusive.',
      },
      {
        id: '7',
        slug: 'word-search',
        name: 'Deutsch-Arbeitsblätter',
        category: 'Sprache',
        icon: '🔍',
        description: 'Erstellen Sie Deutsch Arbeitsblätter mit Wortsuche und Puzzles. Perfekt für Rechtschreibung und Vokabeltraining.',
      },
      {
        id: '8',
        slug: 'sudoku',
        name: 'Rechnen lernen',
        category: 'Logik',
        icon: '🔢',
        description: 'Kombinieren Sie Rechnen lernen mit logischem Denken. Sudoku und Puzzles trainieren Konzentration.',
      },
      {
        id: '9',
        slug: 'subtraction',
        name: 'Einmaleins Generator',
        category: 'Mathematik',
        icon: '➖',
        description: 'Ergänzen Sie Einmaleins Übungen mit visuellen Puzzles. Mathe Arbeitsblätter für die Grundschule.',
      },
      {
        id: '10',
        slug: 'pattern-train',
        name: 'Schwungübungen Ergänzung',
        category: 'Muster',
        icon: '🚂',
        description: 'Kombinieren Sie Musterzüge mit Schwungübungen. Perfekt für Feinmotorik und visuelle Wahrnehmung.',
      },
      {
        id: '11',
        slug: 'writing',
        name: 'Buchstaben lernen Schrift',
        category: 'Schreiben',
        icon: '📝',
        description: 'Ergänzen Sie Buchstaben lernen mit Schreibübungen. Deutsch Arbeitsblätter für die Vorschule.',
      },
      {
        id: '12',
        slug: 'treasure-hunt',
        name: 'Rechnen 1. Klasse',
        category: 'Spiele',
        icon: '🗺️',
        description: 'Kombinieren Sie Schatzsuche mit Rechnen 1. Klasse Übungen. Spielerisches Rechnen lernen.',
      },
      {
        id: '13',
        slug: 'crossword',
        name: 'Deutsch-Arbeitsblätter Rätsel',
        category: 'Sprache',
        icon: '✏️',
        description: 'Erstellen Sie Deutsch Arbeitsblätter mit Kreuzworträtseln. Kombinieren Sie mit Schwungübungen.',
      },
      {
        id: '14',
        slug: 'find-objects',
        name: 'Suchbilder Generator',
        category: 'Logik',
        icon: '🔎',
        description: 'Ergänzen Sie Puzzles mit Suchbildern für visuelle Wahrnehmung. Buchstaben lernen und Konzentration kombiniert.',
      },
    ],
  },
};

export default missingPiecesDeContent;
