import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Drawing Lines Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/drawing-lines-worksheets.ts
 * URL: /de/apps/linien-ziehen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/linien-ziehen.md
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

export const drawingLinesDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'linien-ziehen-arbeitsblaetter',
    appId: 'drawing-lines',
    title: 'Kostenlose Arbeitsblätter für Schwungübungen - Vorschul-Arbeitsblätter Generator - Arbeitsblätter Grundschule',
    description: 'Erstellen Sie professionelle Schwungübungen und Zuordnungsaufgaben mit unserem einfachen Generator. Perfekt für Arbeitsblätter Grundschule, Vorschul-Arbeitsblätter und Buchstaben lernen. Laden Sie kostenlose Arbeitsblätter in unter 3 Minuten herunter.',
    keywords: 'schwungübungen, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, ausmalbilder, rechnen lernen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/linien-ziehen-arbeitsblaetter',
  },

  // Hero Section - FULL text from linien-ziehen.md paragraphs 1-4
  hero: {
    title: 'Schwungübungen-Generator',
    subtitle: 'Kostenlose Arbeitsblätter für Vorschule und Grundschule - Feinmotorik-Entwicklung',
    description: `Erstellen Sie professionelle Schwungübungen und Zuordnungsaufgaben mit unserem einfachen Generator für Arbeitsblätter. Ihr Basis-Paket Abonnement ermöglicht unbegrenzte Erstellung von Arbeitsblättern ohne Zusatzkosten pro Arbeitsblatt. Generieren Sie kostenlose Arbeitsblätter für Vorschule und Grundschule, die perfekt für die Entwicklung der Feinmotorik geeignet sind. Laden Sie hochwertige Arbeitsblätter als PDF oder JPEG herunter. Jedes Arbeitsblatt wird in professioneller 300 DPI Qualität exportiert.

Unser Generator für Schwungübungen hilft Kindern, wichtige feinmotorische Fähigkeiten durch ansprechende Zuordnungsübungen zu entwickeln. Kinder ziehen Linien, um passende Bilder zu verbinden, die in zwei Spalten auf dem Arbeitsblatt angeordnet sind. Diese einfache und effektive Aktivität stärkt die Stifthaltung und Hand-Augen-Koordination. Erzieher nutzen diese Arbeitsblätter für Vorschule und Grundschule täglich in ihrem Unterricht. Das Zuordnungsformat macht das Lernen spielerisch und hält junge Schüler bei der Sache. Schüler üben visuelle Unterscheidung und verbessern gleichzeitig ihre Fähigkeit, Linien zu ziehen. Jedes Arbeitsblatt bietet mehrere Zuordnungspaare zum Bearbeiten. Die Vielfalt an Linienmustern fordert Schüler auf unterschiedlichen Entwicklungsstufen.

Der Generator umfasst 8 verschiedene Vorlagen mit verschiedenen Linienmustern und Ausrichtungen. Wählen Sie Kurvenvorlagen für Arbeitsblätter im Querformat mit fließenden Linienmustern. Nutzen Sie Diagonalvorlagen für Hochformat-Layouts mit schrägen Verbindungslinien. Verwenden Sie Horizontalvorlagen für Links-nach-Rechts-Übungen. Setzen Sie Vertikalvorlagen für Auf-und-Ab-Zuordnungsübungen ein. Jede Vorlage erstellt eine einzigartige Zuordnungsaufgabe für Ihre Schüler. Passen Sie jedes Arbeitsblatt mit Ihren eigenen hochgeladenen Bildern an oder wählen Sie aus unserer Bibliothek. Fügen Sie Rahmen, Hintergründe und personalisierte Textelemente hinzu. Ihr Basis-Paket Abonnement beinhaltet Zugriff auf über 3000 kinderfreundliche Bilder, organisiert nach Themen. Erstellen Sie unbegrenzt viele Arbeitsblattsvariationen für verschiedene Schwierigkeitsstufen, Themen und Lehrplaninhalte. Generieren Sie Arbeitsblätter in 11 Sprachen für mehrsprachige Klassenzimmer.`,
    previewImageSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/drawing lines/
  samples: {
    sectionTitle: 'Schwungübungen Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
        answerKeySrc: '',
        altText: 'Schwungübungen Kurven-Arbeitsblatt mit fließenden Linienmustern für Vorschule Feinmotorik-Entwicklung',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_curve 1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_curve 2.jpeg',
        answerKeySrc: '',
        altText: 'Schwungübungen geschwungene Zuordnung für Vorschule und Kindergarten Schüler',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_curve 2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_diagonal 1.jpeg',
        answerKeySrc: '',
        altText: 'Schwungübungen Diagonalvorlage Arbeitsblatt für Feinmotorik-Kontrolle Übung',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_diagonal 1.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_diagonal 2.jpeg',
        answerKeySrc: '',
        altText: 'Diagonale Linien-Zuordnung Arbeitsblatt für Grundschule Schüler',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_diagonal 2.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_horizontal.jpeg',
        answerKeySrc: '',
        altText: 'Horizontale Schwungübungen Arbeitsblatt für Links-nach-Rechts Linienziehen Übung',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_horizontal.pdf',
      },
      {
        id: '6',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_vertical.jpeg',
        answerKeySrc: '',
        altText: 'Vertikale Schwungübungen Arbeitsblatt für Auf-und-Ab Zuordnungsübungen',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_vertical.pdf',
      },
    ],
  },

  // Features Grid - FULL text from linien-ziehen.md feature sections
  features: {
    sectionTitle: 'Schwungübungen-Generator Funktionen - Alles für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Unser Generator für Schwungübungen bietet umfassende Funktionen für die Erstellung professioneller Arbeitsblätter für Vorschule und Grundschule. Lehrkräfte erstellen maßgeschneiderte Zuordnungsübungen in weniger als 3 Minuten mit unserer benutzerfreundlichen Plattform. Jede Funktion konzentriert sich darauf, Zeit zu sparen und gleichzeitig hohe Qualität für den Unterrichtseinsatz zu gewährleisten. Ihr Basis-Paket Abonnement ermöglicht unbegrenzte Erstellung von Arbeitsblättern ohne Zusatzkosten pro Arbeitsblatt. Generieren Sie Schwungübungen zusammen mit anderen Arbeitsblättern für Buchstaben lernen, Mathe und Deutsch auf derselben Plattform. Das komplette Werkzeugset unterstützt alle Ihre Bedürfnisse für kostenlose Arbeitsblätter von der Vorschule bis zur 3. Klasse.',
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
        title: 'Erstellen Sie kostenlose Arbeitsblätter in 3 Klicks - Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Generieren Sie vollständige Schwungübungen mit nur drei einfachen Klicks. Zuerst wählen Sie eine der 8 Vorlagenmuster aus dem visuellen Vorlagenraster. Zweitens wählen Sie Ihre Zuordnungsbilder aus über 3000 Optionen oder laden Sie eigene Bilder hoch. Drittens klicken Sie auf die Generieren-Schaltfläche, um Ihr Arbeitsblatt sofort zu erstellen. Der gesamte Prozess dauert weniger als 90 Sekunden für grundlegende Arbeitsblätter.

Diese Geschwindigkeit macht den Generator perfekt für beschäftigte Lehrkräfte, die täglich Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule vorbereiten. Erstellen Sie mehrere Variationen für differenzierten Unterricht in wenigen Minuten. Die schnelle Generierung unterstützt die Unterrichtsplanung für verschiedene Fächer und Themen. Keine Designkenntnisse erforderlich, um jedes Mal professionell aussehende Zuordnungsübungen zu erstellen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bearbeiten Sie Schwungübungen und alle Arbeitsblätter - Vollständige Anpassung für Vorschule und Grundschule',
        description: `Jedes Element auf generierten Schwungübungen ist vollständig auf der Arbeitsfläche bearbeitbar. Ziehen Sie Bilder, um sie beliebig auf der Seite neu zu positionieren. Ändern Sie die Größe von Bildern mit einfachen Maussteuerungen. Drehen Sie Bilder in jeden Winkel für kreative Arbeitsblattlayouts. Fügen Sie benutzerdefinierte Textfelder für Schülernamen, Anweisungen oder Lerninhalte hinzu.

Ändern Sie Farben, Schriftarten und Textgrößen, um sie an Ihr Klassenthema anzupassen. Löschen Sie jedes Element, das Sie auf dem endgültigen Arbeitsblatt nicht möchten. Diese vollständige Bearbeitbarkeit unterscheidet unsere Plattform von starren vorlagenbasierten Generatoren. Lehrkräfte kombinieren Schwungübungen mit anderen Aktivitäten auf derselben Seite. Die Flexibilität funktioniert für die Erstellung umfassender Arbeitsblätter, die mehrere Lernziele gleichzeitig ansprechen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Laden Sie eigene Bilder hoch für Arbeitsblätter Grundschule, Mathe-Arbeitsblätter und Ausmalbilder',
        description: `Laden Sie unbegrenzt viele eigene Bilder hoch, um Ihre Arbeitsblätter für Ihre Schüler zu personalisieren. Die Mehrfachdatei-Upload-Funktion ermöglicht es Ihnen, Dutzende von Bildern auf einmal hinzuzufügen. Verwenden Sie Fotos von Klassenzimmerobjekten für relevante Zuordnungsübungen. Laden Sie Schülerkunstwerke hoch, um ansprechende personalisierte Arbeitsblätter zu erstellen.

Fügen Sie Bilder aus aktuellen Unterrichtseinheiten für thematische Zuordnungsaktivitäten hinzu. Kombinieren Sie hochgeladene Bilder mit unserer 3000+ Bildbibliothek für unbegrenzte Vielfalt. Diese Funktion macht den Generator unverzichtbar für die Erstellung maßgeschneiderter Mathe-Arbeitsblätter und Ausmalbilder mit vertrauten Bildern. Lehrkräfte fotografieren Unterrichtsmaterialien und laden sie hoch, um konkrete Lernprogression zu erstellen. Die benutzerdefinierte Upload-Funktion verwandelt generische Arbeitsblätter in zielgerichtete Lernwerkzeuge.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Arbeitsblätter in 11 Sprachen - Deutsch-Arbeitsblätter, Mathe und kostenlose Arbeitsblätter für alle',
        description: `Generieren Sie Schwungübungen in 11 verschiedenen Sprachen für mehrsprachige Klassenzimmer. Die Benutzeroberfläche und der Arbeitsblatttext werden automatisch in Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch und Finnisch übersetzt. DaZ-Lehrkräfte erstellen dieselbe Zuordnungsübung in mehreren Sprachen für differenzierten Unterricht.

Zweisprachige Immersionsprogramme nutzen den Generator für konsistente Materialien in beiden Sprachen. Herkunftssprachenprogramme erstellen Deutsch-Arbeitsblätter für den muttersprachlichen Unterricht. Fremdsprachenlehrkräfte generieren Vokabel-Zuordnungsübungen mit Zielsprachenbeschriftungen. Die mehrsprachige Unterstützung erstreckt sich über Schwungübungen hinaus auf alle Arbeitsblatttypen auf der Plattform. Erstellen Sie Mathe-Arbeitsblätter auf Deutsch, kostenlose Arbeitsblätter auf Englisch und mehr mit einem Abonnement.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz enthalten - Verkaufen Sie Ihre Arbeitsblätter auf Eduki und Etsy',
        description: `Ihr Basis-Paket Abonnement beinhaltet eine vollständige kommerzielle Lizenz für den Verkauf von Arbeitsblättern auf Plattformen wie Eduki, Etsy und Amazon KDP. Erstellen Sie Schwungübungen-Pakete und verkaufen Sie sie als digitale Downloads oder gedruckte Produkte. Die 300 DPI Export-Qualität gewährleistet professionelle Ergebnisse für den kommerziellen Einsatz.

Bündeln Sie Schwungübungen mit anderen Arbeitsblättern für umfassende Aktivitätspakete. Viele Lehrkräfte verdienen 500-5000 Euro monatlich durch den Verkauf thematischer Arbeitsblätter, die mit unseren Generatoren erstellt wurden. Die kommerzielle Lizenz deckt alle 10 Basis-Paket Apps ohne zusätzliche Lizenzgebühren ab. Die enthaltene POD-Lizenz beseitigt die Hürde teurer kommerzieller Rechtsgebühren, die andere Plattformen verlangen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Bilder für Ausmalbilder, Buchstaben lernen und Arbeitsblätter Grundschule',
        description: `Durchsuchen Sie über 3000 kinderfreundliche Bilder, die in Dutzende thematischer Kategorien organisiert sind. Durchsuchen Sie die Bildbibliothek nach Stichwörtern, um perfekte Bilder für jedes Thema zu finden. Kategorien umfassen Tiere, Lebensmittel, Transport, Jahreszeiten, Feiertage, Klassenzimmerobjekte und pädagogische Konzepte.

Jedes Bild funktioniert perfekt für Zuordnungsübungen in Schwungübungen. Dieselbe Bibliothek unterstützt die Erstellung von Arbeitsblättern mit visuellen Darstellungen. Verwenden Sie die Bilder für Ausmalbilder, wo Schüler Bildumrisse nachzeichnen. Erstellen Sie Arbeitsblätter für Buchstaben lernen mit Bildern, die mit Zielbuchstabenlauten beginnen. Die umfassende Bildbibliothek macht teure Clipart-Abonnements überflüssig. Alle Bilder sind in Ihrem Basis-Paket Abonnement ohne Zusatzkosten enthalten.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität - Druckfertige Vorschul-Arbeitsblätter und kostenlose Arbeitsblätter',
        description: `Exportieren Sie alle Schwungübungen in echter 300 DPI Auflösung für gestochen scharfen, professionellen Druck. Wählen Sie zwischen PDF-Format für einfaches Drucken im Klassenzimmer oder JPEG für digitale Verbreitung. Die hohe Auflösung gewährleistet klare Bilder und scharfen Text auf jeder gedruckten Seite.

Aktivieren Sie die Graustufenoption, um Druckertinte zu sparen und gleichzeitig die Arbeitsblattqualität beizubehalten. Der 300 DPI Standard macht Arbeitsblätter für kommerziellen Druck und Veröffentlichung geeignet. Erstellen Sie Vorschul-Arbeitsblätter und andere kostenlose Arbeitsblätter mit derselben professionellen Qualität. Drucken Sie Arbeitsblätter auf Standard-Klassendruckern oder senden Sie sie an kommerzielle Druckereien. Die Qualität entspricht teuren pädagogischen Verlagen und kostet einen Bruchteil des Preises mit Ihrem Abonnement.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: '8 verschiedene Vorlagenmuster für alle Schwierigkeitsstufen',
        description: `Wählen Sie aus 8 einzigartigen Vorlagenmustern, die für verschiedene Schwierigkeitsstufen und Lernziele entwickelt wurden. Kurvenvorlagen erstellen fließende, wellige Linien, die linke und rechte Spalten im Querformat verbinden. Diagonalvorlagen zeigen schräge Verbindungen im Hochformat für anspruchsvolle Zuordnungsübungen.

Horizontalvorlagen ordnen Bilder in Links-Rechts-Spalten mit geraden Verbindungen für Anfänger an. Vertikalvorlagen positionieren Bilder in Oben-Unten-Reihen für Auf-Ab-Linienziehen Übung. Jede Vorlagen-Miniaturansicht zeigt genau, wie die Zuordnungspaare auf Ihrem Arbeitsblatt angeordnet werden. Wählen Sie einfachere horizontale Muster für Vorschulkinder, die grundlegendes Linienziehen üben. Wählen Sie anspruchsvolle diagonale oder Kurvenmuster für fortgeschrittene Grundschule-Arbeitsblätter, wenn Schüler komplexere feinmotorische Herausforderungen benötigen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from linien-ziehen.md step sections
  howTo: {
    sectionTitle: 'So erstellen Sie kostenlose Arbeitsblätter in 5 einfachen Schritten',
    sectionDescription: 'Erstellen Sie professionelle Schwungübungen in weniger als 3 Minuten mit unserem schrittweisen Prozess. Der Generator führt Sie durch jeden Schritt von der Vorlagenauswahl bis zum endgültigen Download. Keine Designerfahrung erforderlich, um hochwertige Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule zu erstellen.',
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
        title: 'Wählen Sie Ihre Schwungübungen-Vorlage',
        description: `Klicken Sie auf den Abschnitt Vorlagen und Bilder in der linken Seitenleiste, um alle 8 Linienzieh-Vorlagen anzuzeigen. Das visuelle Raster zeigt Miniaturansichten jedes Vorlagenmusters. Kurvenvorlagen zeigen fließende, wellige Linien, die linke und rechte Spalten im Querformat verbinden. Diagonalvorlagen zeigen schräge Verbindungen im Hochformat für anspruchsvolle Zuordnungsübungen.

Horizontalvorlagen ordnen Bilder in Links-Rechts-Spalten mit geraden Verbindungen an. Vertikalvorlagen positionieren Bilder in Oben-Unten-Reihen für Auf-Ab-Linienziehen. Jede Vorlagen-Miniaturansicht zeigt genau, wie die Zuordnungspaare auf Ihrem Arbeitsblatt angeordnet werden. Klicken Sie auf eine beliebige Vorlage, um sie als Grundlage Ihres Arbeitsblatts auszuwählen. Wählen Sie einfachere horizontale Muster für Vorschulkinder, die grundlegendes Linienziehen üben. Wählen Sie anspruchsvolle diagonale oder Kurvenmuster für fortgeschrittene Arbeitsblätter Grundschule.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Weisen Sie Bildpaare zu',
        description: `Weisen Sie jedem Zuordnungspaar-Slot in der Paartabelle Bilder zu, die nach der Vorlagenauswahl erscheint. Jede Zeile zeigt zwei Slots mit den Bezeichnungen A1-A2, B1-B2, weiter für alle erforderlichen Paare. Klicken Sie auf einen beliebigen Paar-Slot, um ihn für die Bildauswahl zu aktivieren.

Durchsuchen Sie die über 3000 Bildbibliothek, die nach Themen organisiert ist, im Abschnitt Bildbibliothek. Suchen Sie nach bestimmten Bildern mit Stichwörtern wie Tiere, Essen oder Transport. Alternativ aktivieren Sie das Kontrollkästchen Auto-Ausfüllen für sofortige zufällige Bildzuweisung aus Ihrem ausgewählten Thema. Diese Ein-Klick-Option füllt alle Paare mit passenden Bildern in Sekunden. Laden Sie benutzerdefinierte Bilder im Abschnitt Eigene Bilder hochladen für personalisierte Vorschul-Arbeitsblätter hoch.`,
        icon: '🎯',
      },
      {
        id: '3',
        number: 3,
        title: 'Passen Sie Seiteneinstellungen an',
        description: `Passen Sie die Seiteneinrichtungsoptionen an, um das Erscheinungsbild Ihrer Schwungübungen zu perfektionieren. Öffnen Sie das Akkordeon Seiteneinrichtung, um auf alle Anpassungssteuerungen zuzugreifen. Wählen Sie Ihre bevorzugte Seitengröße aus Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat oder quadratischen Formaten.

Wählen Sie eine Seitenhintergrundfarbe mit dem Farbwähler für thematische Arbeitsblätter. Aktivieren Sie das Kontrollkästchen Name/Datum-Felder, um Schülerinformationsbereiche oben auf dem Arbeitsblatt hinzuzufügen. Wählen Sie Rahmenthemen aus dem Dropdown-Menü, um Ihre Vorschul-Arbeitsblätter mit dekorativen Elementen zu rahmen. Fügen Sie benutzerdefinierten Text im Abschnitt Textwerkzeuge für Titel, Anweisungen oder Lerninhalte hinzu.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Generieren und bearbeiten Sie Ihr Arbeitsblatt',
        description: `Klicken Sie auf die Schaltfläche Generieren in der oberen Symbolleiste, um Ihre Schwungübungen sofort zu erstellen. Der Generator platziert alle Bilder gemäß Ihrem ausgewählten Vorlagenmuster. Ein Titel und Anweisungen erscheinen oben in Ihrer ausgewählten Sprache. Alle Elemente werden auf die bearbeitbare Arbeitsfläche geladen und sind zur Anpassung bereit.

Jetzt bearbeiten Sie jedes Element direkt auf der Arbeitsfläche mit voller Kontrolle. Klicken Sie auf ein beliebiges Bild, um es zur Bearbeitung auszuwählen. Ziehen Sie Bilder an neue Positionen irgendwo auf dem Arbeitsblatt. Ändern Sie die Bildgröße durch Ziehen der Eckgriffe. Fügen Sie zusätzliche Textfelder für Vokabelwörter oder Anweisungen ein. Löschen Sie jedes Element, das Sie auf dem endgültigen Arbeitsblatt nicht möchten.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Laden Sie Ihre druckfertigen Arbeitsblätter herunter',
        description: `Klicken Sie auf das Download-Dropdown-Menü in der oberen Symbolleiste, wenn Ihr Arbeitsblatt fertig ist. Wählen Sie Als PDF herunterladen für einfaches Drucken im Klassenzimmer auf jedem Drucker. Wählen Sie Als JPEG herunterladen für digitale Verbreitung oder Online-Veröffentlichung. Aktivieren Sie das Kontrollkästchen Graustufen vor dem Herunterladen, um das Arbeitsblatt in Schwarz-Weiß umzuwandeln und Druckertinte zu sparen.

Alle Arbeitsblätter werden in professioneller 300 DPI Auflösung für gestochen scharfen, klaren Druck exportiert. PDF-Dateien enthalten die richtige Seitengröße für perfektes Drucken ohne Skalierungsprobleme. JPEG-Dateien funktionieren perfekt zum Einfügen in Präsentationen, Dokumente oder digitale Lernplattformen. Erstellen Sie mehrere Variationen, indem Sie zum Generator zurückkehren und Bilder oder Einstellungen ändern.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from linien-ziehen.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte, Eltern und Pädagogen',
    sectionDescription: 'Unser Schwungübungen-Generator dient verschiedenen Pädagogen, die täglich Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule erstellen. Klassenlehrkräfte nutzen die Plattform für Unterrichtsplanung und differenzierten Unterricht. Eltern, die mehrere Klassenstufen zu Hause unterrichten, erstellen maßgeschneiderte kostenlose Arbeitsblätter für jedes Kind. Sonderpädagogen entwerfen individualisierte Arbeitsblätter für spezifische Lernziele. DaZ-Lehrkräfte generieren mehrsprachige Zuordnungsübungen in 11 Sprachen.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Vorschule und Kindergarten-Erzieher',
        subtitle: 'Kostenlose Arbeitsblätter für Schwungübungen und Buchstaben lernen',
        description: `Kindergarten-Erzieher nutzen Schwungübungen täglich für Feinmotorik-Übungen und visuelle Unterscheidungstraining. Erstellen Sie Morgenarbeitspakete mit thematischen Zuordnungsübungen unter Verwendung saisonaler Bilder. Generieren Sie Stationsaktivitäten mit verschiedenen Schwierigkeitsstufen für differenzierte Kleingruppenarbeit. Drucken Sie Hausaufgaben-Übungsblätter für Schüler, die Schwierigkeiten mit der Stifthaltung haben.

Verwenden Sie die 8 verschiedenen Vorlagen, um das ganze Schuljahr über Abwechslung zu bieten. Beginnen Sie das Jahr mit einfachen horizontalen Vorlagen für grundlegendes Links-nach-Rechts-Linienziehen. Schreiten Sie zu anspruchsvollen diagonalen und Kurvenmustern fort, wenn sich die Schülerfähigkeiten verbessern. Kombinieren Sie Schwungübungen mit Arbeitsblättern für Buchstaben lernen für Buchstabenerkennungsstationen.`,
        quote: 'Meine Kinder lieben die bunten Zuordnungsübungen mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse',
        subtitle: 'Arbeitsblätter Grundschule für Deutsch-Arbeitsblätter, Mathe und Rechnen lernen',
        description: `Erstklasslehrkräfte integrieren Schwungübungen in Literacy-Stationen für Vokabelentwicklung. Erstellen Sie Zuordnungsübungen für Deutsch-Arbeitsblätter, die Wörter mit entsprechenden Bildern paaren. Generieren Sie Arbeitsblätter für Buchstaben lernen, die Anfangslaute mit Bildern für Laut-Buchstaben-Zuordnung abgleichen. Entwerfen Sie Mathe-Arbeitsblätter für Rechnen lernen unter Verwendung von Bildgruppen, die Schüler zählen, bevor sie Verbindungslinien ziehen.

Zweitklasslehrkräfte verwenden den Generator für fachspezifisches Vokabular in Sachkunde- und Sozialkundeeinheiten. Laden Sie Bilder aus aktuellen Einheiten hoch und erstellen Sie benutzerdefinierte Zuordnungs-Terminologieübungen. Generieren Sie differenzierte Versionen desselben Arbeitsblatts für Schüler mit Schwierigkeiten, auf Klassenstufe und fortgeschrittene Lernende gleichzeitig.`,
        quote: 'Ich erstelle differenzierte Arbeitsblätter für alle meine Lesegruppen in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern',
        subtitle: 'Vorschul-Arbeitsblätter, kostenlose Arbeitsblätter für Buchstaben lernen und Rechnen lernen zu Hause',
        description: `Homeschool-Eltern verwalten mehrere Kinder auf verschiedenen Klassenstufen unter Verwendung des Schwungübungen-Generators für individualisierten Unterricht. Erstellen Sie maßgeschneiderte Vorschul-Arbeitsblätter mit Familienfotos, Haustieren oder vertrauten Haushaltsobjekten für personalisiertes Lernen. Generieren Sie Arbeitsblätter Grundschule, die auf Ihren gewählten Lehrplanumfang und Ihre Reihenfolge abgestimmt sind.

Die 11-Sprachunterstützung hilft Familien, die Herkunftssprachen oder Weltsprachenprogramme zu Hause unterrichten. Generieren Sie dieselbe Zuordnungsübung auf Deutsch und Spanisch für zweisprachige Kompetenzentwicklung. Die Möglichkeit, eigene Bilder hochzuladen, macht jedes Arbeitsblatt für Ihre Schüler persönlich bedeutungsvoll. Drucken Sie unbegrenzt Arbeitsblätter ohne Kosten pro Arbeitsblatt und sparen Sie Hunderte im Vergleich zu Verbrauchsmaterial-Lehrplanbüchern.`,
        quote: 'Ein Werkzeug deckt alle Klassenstufen meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ- und Sprachlehrkräfte',
        subtitle: 'Mehrsprachige Deutsch-Arbeitsblätter und kostenlose Arbeitsblätter in 11 Sprachen',
        description: `DaZ-Lehrkräfte generieren Vokabel-Zuordnungsarbeitsblätter in den Herkunftssprachen der Schüler zur Verständnisunterstützung. Erstellen Sie zweisprachige Arbeitsblätter, die dieselben Bilder mit Beschriftungen sowohl auf Deutsch als auch in der Muttersprache zeigen. Entwerfen Sie Anfangs-Deutsch-Vokabelübungen unter Verwendung alltäglicher Objekte, die Neuankömmlingen vertraut sind.

Die 11-Sprachoberfläche ermöglicht es Schülern, Anweisungen in ihrer Muttersprache zu sehen, was Angst reduziert. Erstellen Sie gestaffelte Arbeitsblatt-Sets, bei denen Zuordnungspaare zunehmend anspruchsvoller werden. Zweisprachige Immersionsprogramme verwenden den Generator für konsistente Materialien in beiden Programmsprachen. Weltsprachenlehrkräfte auf Mittel- und Oberschulebene verwenden den Generator für Anfangsvokabelpraxis.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Sonderpädagogen',
        subtitle: 'Individualisierte Vorschul-Arbeitsblätter, Mathe-Arbeitsblätter für Einmaleins und Rechnen lernen',
        description: `Sonderpädagogen erstellen hochgradig individualisierte Schwungübungen, die auf spezifische Förderpläne-Ziele abzielen. Entwerfen Sie Lebenskompetenz-Zuordnungsübungen, die alltägliche Objekte mit ihren Verwendungen oder Standorten paaren. Generieren Sie funktionale Vokabel-Arbeitsblätter, die Sicherheitsschilder mit ihren Bedeutungen abgleichen. Laden Sie Fotos von tatsächlichen Klassenmaterialien für relevante, konkrete Übung hoch.

Die vollständige Bearbeitbarkeit der Arbeitsfläche ermöglicht Modifikationen nach der Generierung für perfekte Barrierefreiheit. Vergrößern Sie spezifische Bilder für Schüler mit Sehbeeinträchtigungen. Fügen Sie zusätzliche Texthinweise oder Farbcodierung für Schüler hinzu, die zusätzliche Unterstützung benötigen. Der Generator unterstützt die Erstellung mehrerer Versionen auf verschiedenen Schwierigkeitsstufen für Fortschrittsüberwachung.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrer-Unternehmer',
        subtitle: 'Verkauf von kostenlosen Arbeitsblättern auf Eduki mit Einmaleins und Rechnen lernen Inhalten',
        description: `Lehrkräfte, die Unterrichtsmaterialien verkaufen, bauen profitable Geschäfte auf, indem sie Arbeitsblätter-Pakete mit dem Schwungübungen-Generator erstellen. Entwerfen Sie thematische saisonale Arbeitsblätter-Bundles für Schuljahresbeginn, Halloween, Weihnachten und Schuljahresende-Verkäufe. Erstellen Sie umfassende Vorschul-Arbeitsblätter-Pakete, die nach Kompetenzprogression von einfach bis komplex organisiert sind.

Die enthaltene POD-Gewerbliche Lizenz erlaubt unbegrenzte Verkäufe ohne zusätzliche Lizenzgebühren. Viele Lehrkräfte verdienen 500-2000 Euro monatlich allein durch Verkäufe auf Eduki. Top-Verkäufer generieren 5000-10000 Euro monatlich mit umfassenden Arbeitsblätter-Sammlungen über mehrere Apps hinweg. Die 300 DPI Export-Qualität gewährleistet professionelle Ergebnisse, die teuren veröffentlichten Materialien entsprechen.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from linien-ziehen.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Schwungübungen, Mathe-Arbeitsblättern und Arbeitsblätter Grundschule',
    sectionDescription: 'Lehrkräfte stellen häufig Fragen zur Erstellung von Schwungübungen und anderen Arbeitsblättern mit unserem Generator. Dieser Abschnitt beantwortet die häufigsten Fragen zu Abonnementanforderungen, Druckfähigkeiten, Anpassungsoptionen und gewerblicher Lizenzierung.',
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
        question: 'Ist dieser Schwungübungen-Generator wirklich kostenlos für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule?',
        answer: 'Der Schwungübungen-Generator erfordert ein Basis-Paket Abonnement, das 144 Euro pro Jahr oder 15 Euro pro Monat kostet. Der Begriff "kostenlose Arbeitsblätter" bezieht sich auf das Such-Keyword, das Menschen verwenden, wenn sie nach Arbeitsblatt-Ressourcen suchen. Es bedeutet nicht, dass der Generator selbst keine Zahlung erfordert. Mit Ihrem Basis-Paket Abonnement erstellen Sie unbegrenzt Schwungübungen ohne Kosten pro Arbeitsblatt. Generieren Sie so viele Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule, wie Sie benötigen, ohne zusätzliche Gebühren. Das Abonnement beinhaltet Zugriff auf 10 verschiedene Arbeitsblatt-Generatoren einschließlich Mathe-Arbeitsblätter und mehr.',
      },
      {
        id: '2',
        question: 'Welche Sprachen sind verfügbar für Deutsch-Arbeitsblätter, Mathe-Arbeitsblätter und kostenlose Arbeitsblätter?',
        answer: 'Der Schwungübungen-Generator unterstützt 11 Sprachen für Benutzeroberfläche und Arbeitsblattinhalte. Generieren Sie Arbeitsblätter auf Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch und Finnisch. Der Sprachselektor in der Seitenleiste schaltet sowohl die Schnittstellensteuerungen als auch die Arbeitsblatttitel und Anweisungen um. Erstellen Sie dieselbe Zuordnungsübung in mehreren Sprachen für DaZ- und zweisprachige Klassenzimmer. Dasselbe Abonnement bietet Zugriff auf alle 11 Sprachen ohne zusätzliche Gebühren.',
      },
      {
        id: '3',
        question: 'Kann ich eigene Bilder hochladen für Mathe-Arbeitsblätter, Einmaleins-Übungen und Ausmalbilder?',
        answer: 'Ja, laden Sie unbegrenzt eigene Bilder im Abschnitt Eigene Bilder hochladen für personalisierte Arbeitsblätter hoch. Klicken Sie auf den Datei-Selektor, um mehrere Bilder gleichzeitig von Ihrem Computer auszuwählen. Alle gängigen Bildformate funktionieren einschließlich JPEG, PNG und GIF-Dateien. Hochgeladene Bilder erscheinen in einer Vorschaugalerie, bereit zur Zuweisung an Zuordnungspaar-Slots. Verwenden Sie hochgeladene Bilder allein oder kombinieren Sie sie mit der 3000+ Bildbibliothek für maximale Vielfalt.',
      },
      {
        id: '4',
        question: 'Kann ich Schwungübungen für bestimmte Schulfächer wie Deutsch-Arbeitsblätter, Rechnen lernen und Buchstaben lernen erstellen?',
        answer: 'Ja, erstellen Sie fachspezifische Schwungübungen unter Verwendung thematischer Bilder und benutzerdefinierter Uploads über alle Lehrplanbereiche hinweg. Entwerfen Sie Mathe-Arbeitsblätter, die Zahlensymbole mit Bildmengen für Rechnen lernen-Zentren abgleichen. Erstellen Sie Deutsch-Arbeitsblätter für Buchstaben lernen, die Anfangslaute mit entsprechenden Bildern für Literacy-Unterricht abgleichen. Die 3000+ Bildbibliothek umfasst pädagogische Kategorien, die mehrere Fachbereiche unterstützen. Laden Sie fachspezifische Bilder aus Ihrem Lehrplan für perfekte Abstimmung mit Unterrichtsinhalten hoch.',
      },
      {
        id: '5',
        question: 'Kann ich sowohl Farb- als auch Schwarz-Weiß-Ausmalbilder und Arbeitsblätter Grundschule erstellen?',
        answer: 'Ja, laden Sie jede Schwungübung in sowohl Voll-Farb- als auch Graustufen-Formaten für verschiedene Unterrichtszwecke herunter. Generieren Sie Ihr Arbeitsblatt in Farbe unter Verwendung der vollen Bildbibliothek und Farbhintergründe. Laden Sie zuerst als Voll-Farb-PDF für Schüler herunter, die von Farbhinweisen und ansprechenden Bildern profitieren. Kehren Sie zum Download-Menü zurück und aktivieren Sie das Kontrollkästchen Graustufen. Laden Sie erneut als Schwarz-Weiß-PDF für Hausaufgaben, Beurteilungen oder Tintenspar-Zwecke herunter.',
      },
      {
        id: '6',
        question: 'Wie unterstützen Schwungübungen Mathe-Arbeitsblätter für Einmaleins und Rechnen lernen in der 1. Klasse?',
        answer: 'Schwungübungen unterstützen Mathe-Arbeitsblätter für Einmaleins und Rechnen lernen, indem sie visuelle Unterscheidung mit Mathematikkonzepten kombinieren. Erstellen Sie Mathe-Arbeitsblätter, bei denen Schüler Ziffern mit Bildmengen zur Entwicklung des Zahlensinns abgleichen. Entwerfen Sie Zuordnungsübungen, die Rechenaufgaben mit bildlichen Darstellungen von Antworten für Rechnen lernen paaren. Das Zuordnungsformat bietet konkrete visuelle Unterstützung für abstraktes mathematisches Denken.',
      },
      {
        id: '7',
        question: 'Kann ich diesen Generator für Deutsch-Arbeitsblätter, Buchstaben lernen und Ausmalbilder-Sammlungen verwenden?',
        answer: 'Ja, der Generator zeichnet sich durch die Erstellung von Deutsch-Arbeitsblättern für Buchstaben lernen durch visuelle Zuordnungsübungen aus. Entwerfen Sie Arbeitsblätter für Buchstaben lernen, die Buchstabenlaute mit mehreren Bildbeispielen verbinden. Erstellen Sie Deutsch-Arbeitsblätter, die Hochfrequenzwörter mit visuellen Darstellungen paaren. Generieren Sie Zuordnungsübungen, die Groß- und Kleinbuchstabenpaare abgleichen. Die Bildbibliothek umfasst geeignete Bilder für alle Buchstabenlaute.',
      },
      {
        id: '8',
        question: 'Wie lange dauert es, Schwungübungen für Buchstaben lernen, Einmaleins und Ausmalbilder zu erstellen?',
        answer: 'Die Erstellung einer grundlegenden Schwungübung dauert 90 Sekunden bis 3 Minuten vom Start bis zum Download. Wählen Sie eine Vorlage in 10 Sekunden durch Klicken auf eine Miniaturansicht. Weisen Sie Bilder in 30-60 Sekunden mit der Auto-Ausfüllen-Funktion oder manueller Auswahl zu. Klicken Sie auf Generieren und das Arbeitsblatt erscheint in 5-10 Sekunden. Der Download als PDF dauert weitere 5-10 Sekunden. Die Gesamtzeit für ein grundlegendes Arbeitsblatt beträgt durchschnittlich 2 Minuten.',
      },
      {
        id: '9',
        question: 'Unterstützt die Plattform die Erstellung von Mathe-Arbeitsblättern für Rechnen lernen, Deutsch-Arbeitsblättern und Ausmalbilder zusammen?',
        answer: 'Ja, Ihr Basis-Paket Abonnement bietet Zugriff auf 10 verschiedene Arbeitsblatt-Generatoren auf einer Plattform. Generieren Sie Schwungübungen neben Mathe-Arbeitsblättern für Rechnen lernen, Deutsch-Arbeitsblättern und Ausmalbilder für kompletten täglichen Unterricht. Erstellen Sie thematische Lernpakete, die mehrere Arbeitsblatttypen um einzelne Themen organisieren. Die Fähigkeit, alle Arbeitsblatttypen aus einem Abonnement zu generieren, spart Zeit und gewährleistet visuelle Konsistenz über Materialien hinweg.',
      },
      {
        id: '10',
        question: 'Kann ich meine erstellten Schwungübungen und Arbeitsblätter kommerziell verkaufen?',
        answer: 'Ja, Ihr Basis-Paket Abonnement beinhaltet vollständige kommerzielle Lizenzierung für alle generierten Materialien. Erstellen Sie Schwungübungen-Arbeitsblätter und verkaufen Sie sie auf Eduki, Teachers Pay Teachers oder Etsy. Generieren Sie Arbeitsblätter-Bundles für Amazon KDP. Die kommerzielle Lizenz deckt alle 10 Basis-Paket Apps ohne zusätzliche Lizenzgebühren über das 144 Euro jährliche Abonnement hinaus. Behalten Sie 100% der Verkaufseinnahmen.',
      },
      {
        id: '11',
        question: 'Welche Altersgruppen profitieren am meisten von diesen Schwungübungen?',
        answer: 'Schwungübungen funktionieren perfekt für Vorschulkinder im Alter von 3-5 Jahren, Kindergartenkinder im Alter von 5-6 Jahren und Erstklässler im Alter von 6-7 Jahren. Vorschulerzieher verwenden einfachere horizontale Vorlagen mit weniger Paaren für beginnende Feinmotorik-Entwicklung. Kindergartenlehrkräfte schreiten von einfachen Vorlagen zu Beginn des Jahres zu anspruchsvollen diagonalen und Kurvenmustern im Frühling fort. Erstklasslehrkräfte verwenden komplexe Vorlagen für fortgeschrittene Stiftkontrolle und visuelle Unterscheidungspraxis.',
      },
      {
        id: '12',
        question: 'Benötige ich Designkenntnisse, um professionelle Arbeitsblätter Grundschule zu erstellen?',
        answer: 'Nein, keine Designerfahrung ist erforderlich, um professionelle Schwungübungen und Arbeitsblätter Grundschule zu erstellen. Der Generator verwendet eine einfache klickbasierte Oberfläche, die keine Grafikdesignkenntnisse erfordert. Wählen Sie eine Vorlage aus visuellen Miniaturansichten, die genau zeigen, wie Ihr Arbeitsblatt aussehen wird. Wählen Sie Bilder aus organisierten thematischen Kategorien durch Durchsuchen und Klicken. Alle Designentscheidungen über Abstände, Größen und Layout erfolgen automatisch.',
      },
    ],
  },

  // Pricing - Basis-Paket pricing
  pricing: {
    title: 'Basis-Paket',
    price: '144€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Arbeitsblatterstellung',
      '8 Schwungübungen-Vorlagen',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
    ],
    ctaText: 'Jetzt Erstellen',
  },

  // Related Apps - FULL text from linien-ziehen.md combine apps section
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Apps für umfassende Lehrplan-Bundles',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet zehn verschiedene Arbeitsblatt-Generator-Apps, die zusammenarbeiten, um vollständige Unterrichtspakete zu erstellen. Kombinieren Sie Schwungübungen mit anderen Generatoren für umfassende Lehrplan-Bundles. Erstellen Sie koordinierte Materialien über mehrere Arbeitsblatttypen hinweg.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlose Testversion Starten',
    secondaryCtaText: 'Alle 10 Apps Ansehen',
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
        slug: 'zuordnungs-arbeitsblaetter',
        name: 'Zuordnungs-Generator',
        category: 'Frühe Bildung',
        icon: '🎯',
        description: 'Kombinieren Sie Schwungübungen mit Zuordnungsarbeitsblättern für vollständige visuelle Unterscheidungspraxis und Feinmotorik-Entwicklung.',
      },
      {
        id: '2',
        slug: 'malvorlagen-arbeitsblaetter',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Bündeln Sie Schwungübungen mit Ausmalbilder für umfassende Feinmotorik-Kompetenzentwicklung in Vorschule und Grundschule.',
      },
      {
        id: '3',
        slug: 'alphabet-zug-arbeitsblaetter',
        name: 'Alphabet-Zug',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Erstellen Sie komplette ABC-Lernpakete, die Schwungübungen mit Alphabet-Zug Arbeitsblättern für Buchstaben lernen kombinieren.',
      },
      {
        id: '4',
        slug: 'addition-arbeitsblaetter',
        name: 'Addition',
        category: 'Mathematik',
        icon: '➕',
        description: 'Kombinieren Sie Schwungübungen mit Additions-Arbeitsblättern für umfassende Mathe-Lernpakete und Rechnen lernen.',
      },
      {
        id: '5',
        slug: 'wortsuche-arbeitsblaetter',
        name: 'Wortsuche',
        category: 'Sprache',
        icon: '🔍',
        description: 'Kombinieren Sie Schwungübungen mit Wortsuche-Puzzles für Vokabelverstärkung und Deutsch-Arbeitsblätter.',
      },
      {
        id: '6',
        slug: 'suchen-und-zaehlen-arbeitsblaetter',
        name: 'Suchen und Zählen',
        category: 'Mathematik',
        icon: '🔢',
        description: 'Paaren Sie Schwungübungen mit Suchen und Zählen Arbeitsblättern für Zahlenerkennung und visuelles Unterscheidungstraining.',
      },
    ],
  },
};

export default drawingLinesDeContent;
