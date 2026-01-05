import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/find-and-count-worksheets.ts
 * URL: /de/apps/suchen-und-zaehlen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/suchen-und-zaehlen.md
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

export const findAndCountDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchen-und-zaehlen-arbeitsblaetter',
    appId: 'find-and-count',
    title: 'Zählübungen-Generator - Kostenlose Arbeitsblätter Grundschule für Vorschule und Mathe-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Kombinieren Sie visuelle Diskriminierung mit Zählübungen für Vorschul-Arbeitsblätter. Perfekt für Mathe-Arbeitsblätter und kostenlose Arbeitsblätter 1. Klasse.',
    keywords: 'suchen und zählen generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, ich sehe was was du nicht siehst, zählen lernen, visuelle wahrnehmung, einmaleins',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
  },

  // Hero Section - FULL text from suchen-und-zaehlen.md paragraphs 1-4
  hero: {
    title: 'Zählübungen-Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule für Vorschule und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator. Ihr Basis-Paket-Abonnement ermöglicht unbegrenzte Arbeitsblatters erstellung ohne zusätzliche Gebühren pro Arbeitsblatt. Generieren Sie individuelle druckbare Arbeitsblätter für Grundschule und Vorschule. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter.

Das Suchen-und-Zählen-Format kombiniert visuelle Diskriminierung mit Zählübungen. Kinder suchen versteckte Objekte in einem Bildraster und führen verschiedene Aufgaben aus. Sie können Objekte einkreisen, mit einem Quadrat umrahmen, durchstreichen oder zählen. Perfekt für Erzieher in der Vorschule und Grundschullehrer.

Unser Generator erstellt Arbeitsblätter Grundschule in wenigen Sekunden. Wählen Sie 1-4 Objekte aus unserer Bildbibliothek oder laden Sie eigene Bilder hoch. Passen Sie die Rastergröße an die Fähigkeiten Ihrer Schüler an. Das System erstellt automatisch einen Lösungsschlüssel mit visuellen Markierungen. Jedes Arbeitsblatt ist vollständig editierbar auf der Leinwand.

Die Arbeitsblätter unterstützen verschiedene pädagogische Ziele. Fördern Sie visuelle Wahrnehmung und Aufmerksamkeit für Details. Üben Sie Zahlenerkennung und grundlegende Zählfähigkeiten. Entwickeln Sie Feinmotorik durch Zeichenaufgaben. Kombinieren Sie Suchen-und-Zählen mit thematischem Lernen in allen Schulfächern.`,
    previewImageSrc: '/samples/english/find and count/find and count portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Zählübungen Beispiele',
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
        worksheetSrc: '/samples/english/find and count/find and count portrait.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count portrait answer_key.jpeg',
        altText: 'Hochformat Suchen und Zählen Arbeitsblatt für Vorschul-Arbeitsblätter und visuelle Wahrnehmung',
        pdfDownloadUrl: '/samples/english/find and count/find and count portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find and count/find and count landscape.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count landscape answer_key.jpeg',
        altText: 'Querformat Suchen und Zählen Arbeitsblatt für Arbeitsblätter Grundschule und Mathe-Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/find and count/find and count landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from suchen-und-zaehlen.md feature sections
  features: {
    sectionTitle: 'Zählübungen-Generator Funktionen - Alles für Kostenlose Arbeitsblätter Grundschule',
    sectionDescription: 'Der Suchen-und-Zählen-Generator bietet umfassende Funktionen für die Erstellung von Arbeitsblättern Grundschule. Alle Werkzeuge sind intuitiv gestaltet und erfordern keine Designkenntnisse. Erstellen Sie in 3 Minuten professionelle Vorschul-Arbeitsblätter für Ihre Schüler.',
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
        icon: '🔍',
        title: 'Arbeitsblätter Grundschule in 3 Klicks erstellen - Schneller Mathe-Arbeitsblätter Generator',
        description: `Unser Generator erstellt Arbeitsblätter Grundschule in drei einfachen Schritten. Wählen Sie zuerst Bilder aus unserer Bibliothek mit 3000+ kinderfreundlichen Bildern. Wählen Sie 1 bis 4 Objekte als versteckte Suchziele aus. Klicken Sie auf Generieren und Ihr Arbeitsblatt erscheint sofort.

Die Benutzeroberfläche ist klar strukturiert. Alle Optionen sind logisch angeordnet. Dropdown-Menüs zeigen verfügbare Themen. Bildvorschauen erleichtern die Auswahl. Ein Zähler zeigt wie viele Objekte Sie ausgewählt haben.

Keine technischen Kenntnisse erforderlich. Kindergärtnerinnen und Grundschullehrer können sofort loslegen. Der Generator führt Sie durch jeden Schritt. Innerhalb von Minuten haben Sie ein fertiges Arbeitsblatt.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Kostenlose Arbeitsblätter vollständig bearbeiten - Komplette Anpassung für Vorschul-Arbeitsblätter',
        description: `Jedes Element auf dem Arbeitsblatt ist vollständig editierbar. Klicken Sie auf ein Bild um es auszuwählen. Ziehen Sie es an eine neue Position. Verwenden Sie die Eck-Griffe zum Skalieren. Der Rotationsgriff ermöglicht freies Drehen.

Die Bearbeitungswerkzeuge funktionieren intuitiv. Mehrfachauswahl durch Klicken und Ziehen. Gruppen von Objekten gemeinsam verschieben. Ebenenkontrollen für die Z-Reihenfolge. Ausrichtungswerkzeuge für präzise Platzierung.

Text überall auf der Leinwand hinzufügen. 7 kinderfreundliche Schriftarten verfügbar. Passen Sie Farbe, Größe und Kontur an. Ziehen Sie Text per Drag-and-Drop. Perfekt für personalisierte Arbeitsblätter Grundschule.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen - Individuelle Mathe-Arbeitsblätter für Ihre Klasse',
        description: `Laden Sie eigene Fotos und Bilder hoch. Unterstützt alle gängigen Bildformate (JPEG, PNG, GIF). Mehrfach-Upload für schnelles Hinzufügen mehrerer Bilder. Hochgeladene Bilder können als versteckte Objekte verwendet werden.

Diese Funktion ermöglicht themenbezogene Arbeitsblätter. Fotografieren Sie Objekte aus Ihrem Klassenzimmer. Verwenden Sie Bilder passend zu aktuellen Unterrichtsthemen. Erstellen Sie personalisierte Arbeitsblätter mit Schülernamen.

Kombinieren Sie Bibliotheksbilder mit eigenen Uploads. Mischen Sie verschiedene Bildquellen im gleichen Arbeitsblatt. Alle Bilder lassen sich gleich bearbeiten. Perfekt für individualisierte Vorschul-Arbeitsblätter.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Arbeitsblätter Grundschule in 11 Sprachen - Mehrsprachiger Deutsch-Arbeitsblätter Generator',
        description: `Der Generator unterstützt 11 Sprachen vollständig. UI-Sprache und Inhaltssprache getrennt wählbar. Alle Beschriftungen und Anweisungen übersetzt. Bildnamen in der gewählten Sprache angezeigt.

Unterstützte Sprachen: Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Schwedisch, Dänisch, Norwegisch, Finnisch. Der Titel passt sich automatisch der Sprache an. Deutsch: "Ich sehe was, was du nicht siehst", Englisch: "I Spy".

Besonders wertvoll für mehrsprachige Grundschulen. Erstellen Sie Deutsch-Arbeitsblätter für DaF-Unterricht. Unterstützen Sie zweisprachigen Immersionsunterricht. Ideal für internationale Schulen und Sprachförderung.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '💼',
        title: 'POD-Lizenz inklusive - Kostenlose Arbeitsblätter kommerziell nutzen für Vorschule',
        description: `Das Basis-Paket enthält eine vollständige Print-on-Demand-Lizenz. Verkaufen Sie Ihre erstellten Arbeitsblätter Grundschule legal. Keine Namensnennung erforderlich. Professionelle 300-DPI-Qualität für den Druck.

Verkaufen Sie auf Teachers Pay Teachers, Etsy oder Amazon KDP. Erstellen Sie Arbeitsmappen und Lernpakete. Bauen Sie ein passives Einkommen als Lehrerunternehmer auf. Die Lizenz ist im Abonnement ohne Aufpreis enthalten.

Viele Konkurrenzplattformen berechnen 100-200€ extra pro Jahr für kommerzielle Lizenzen. Bei LessonCraft Studio ist alles in den 144€ jährlich enthalten. Verkaufen Sie unbegrenzt viele Arbeitsblätter ohne zusätzliche Gebühren.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🖼️',
        title: '3000+ Bildbibliothek - Kostenlose Arbeitsblätter mit vielfältigen Motiven erstellen',
        description: `Zugriff auf über 3000 kinderfreundliche Bilder. Thematisch organisiert für einfaches Finden. Tiere, Essen, Spielzeug, Fahrzeuge, Natur und mehr. Alle Bilder sind für Kinder geeignet und klar gezeichnet.

Suchfunktion über alle Bilder. Filtern nach Thema oder alle Themen durchsuchen. Bildnamen in Ihrer gewählten Sprache. Alphabetische Sortierung für schnellen Zugriff.

Hintergründe und Rahmen inklusive. Hunderte dekorative Rahmenvorlagen. Themenbasierte Hintergründe verfügbar. Deckkraft von Hintergrund und Rahmen einstellbar (0-100%). Perfekt für ansprechende Mathe-Arbeitsblätter.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '📥',
        title: '300 DPI Druckqualität - Professionelle Arbeitsblätter Grundschule für Rechnen lernen',
        description: `Alle Exporte in professioneller 300-DPI-Auflösung. Perfekte Qualität für Heimdrucker und Kopierer. Gestochen scharfe Bilder und klare Linien. Sowohl PDF- als auch JPEG-Format verfügbar.

Graustufen-Option spart Druckertinte. Mit einem Klick Farbarbeitsblätter in Schwarz-Weiß umwandeln. Behält alle Details und Klarheit bei. Ideal für Klassensätze und Kopien.

Download von Arbeitsblatt und Lösungsschlüssel getrennt. Jedes als separate Datei verfügbar. Drucken Sie nur was Sie brauchen. Professionelle Qualität für Vorschul-Arbeitsblätter und Grundschule.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from suchen-und-zaehlen.md step sections
  howTo: {
    sectionTitle: 'Arbeitsblätter Grundschule erstellen in 5 einfachen Schritten - Kostenlose Arbeitsblätter für Vorschule',
    sectionDescription: 'Erstellen Sie professionelle Arbeitsblätter Grundschule in unter 3 Minuten. Der Generator führt Sie durch fünf einfache Schritte. Keine Designkenntnisse erforderlich. Perfekt für Erzieher in Vorschule und Grundschule.',
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
        title: 'Inhalte wählen für Kostenlose Arbeitsblätter - Thema, Bilder oder Buchstaben lernen',
        description: `Der erste Schritt ist die Auswahl Ihrer Inhalte. Öffnen Sie das Themen-Dropdown-Menü im Generator. Wählen Sie aus über 30 Themen wie Tiere, Essen, Fahrzeuge, Natur. Jedes Thema enthält dutzende passende Bilder.

Die Bildbibliothek ist thematisch organisiert. Vorschau-Miniaturen zeigen jedes Bild mit Namen. Klicken Sie auf 1 bis 4 Bilder um sie als versteckte Objekte auszuwählen. Ein Zähler zeigt Ihre aktuelle Auswahl.

Für Buchstaben lernen Aktivitäten wählen Sie Alphabet-Bilder. Für Rechnen lernen verwenden Sie Zahlen und Formen. Für Schwungübungen kombinieren Sie mit Schreibaktivitäten. Die Bildauswahl bestimmt den pädagogischen Fokus Ihrer Vorschul-Arbeitsblätter.`,
        icon: '🎨',
      },
      {
        id: '2',
        number: 2,
        title: 'Einstellungen anpassen für Arbeitsblätter Grundschule - Rastergröße und Ausmalbilder',
        description: `Passen Sie die Arbeitsblatt-Einstellungen an Ihre Schüler an. Wählen Sie die Rastergröße zwischen 5×5 und 10×10 Zellen. Kleinere Raster (5×5, 6×6) sind ideal für Vorschulkinder. Größere Raster (8×8, 10×10) fordern ältere Grundschüler heraus.

Wählen Sie für jedes versteckte Objekt eine Aufgabe. Vier Aufgabentypen verfügbar: Einkreisen, Quadrat zeichnen, Durchstreichen, Zählen. Diese Aufgaben fördern verschiedene Fähigkeiten. Einkreisen und Quadrate trainieren Feinmotorik und Schwungübungen.

Wählen Sie Seitengröße und Ausrichtung. Letter Hochformat ist Standard für US-Schulen. A4 Hochformat für europäische Grundschulen. Querformat bietet mehr Platz für größere Raster.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Arbeitsblatt generieren für Vorschul-Arbeitsblätter - Sofortige Vorschau',
        description: `Klicken Sie auf die Schaltfläche "Generieren". Das System erstellt Ihr Arbeitsblatt sofort. Die Generierung dauert nur wenige Sekunden. Ihr Arbeitsblatt Grundschule erscheint auf der Leinwand.

Das System platziert die versteckten Objekte zufällig im Raster. Jedes ausgewählte Objekt erscheint 2-mal im Raster. Die verbleibenden Zellen werden mit verschiedenen Bildern aus dem gewählten Thema gefüllt. Der Algorithmus sorgt für gleichmäßige Verteilung.

Der automatische Lösungsschlüssel wird gleichzeitig erstellt. Wechseln Sie zum Antwortschlüssel-Tab um ihn zu sehen. Visuelle Markierungen zeigen wo die versteckten Objekte sind.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Auf Leinwand bearbeiten für Deutsch-Arbeitsblätter - Volle Anpassung',
        description: `Jetzt kommt die vollständige Bearbeitung. Klicken Sie auf jedes Element um es auszuwählen. Ziehen Sie Bilder an neue Positionen. Verwenden Sie Eck-Griffe zum Skalieren. Der Rotationsgriff ermöglicht Drehen.

Fügen Sie benutzerdefinierten Text hinzu. Klicken Sie auf "Text hinzufügen". Geben Sie Namen, Anweisungen oder Fragen ein. Wählen Sie aus 7 kinderfreundlichen Schriftarten. Passen Sie Farbe, Größe und Konturenbreite an.

Die Ausrichtungswerkzeuge helfen bei präziser Platzierung. Links, Mitte, Rechts für horizontale Ausrichtung. Oben, Mitte, Unten für vertikale Ausrichtung. Ideal für symmetrische Deutsch-Arbeitsblätter.`,
        icon: '📝',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und Drucken von Arbeitsblätter Grundschule - PDF und JPEG für Einmaleins',
        description: `Das fertige Arbeitsblatt ist bereit zum Download. Wählen Sie Ihr bevorzugtes Dateiformat. PDF eignet sich perfekt für professionellen Druck. JPEG ist ideal für digitale Nutzung und Einbettung.

Alle Exporte sind in 300 DPI Qualität. Diese professionelle Auflösung garantiert gestochen scharfe Ausdrucke. Perfekt für Heimdrucker und Schulkopierer. Auch geeignet für kommerzielle Druckdienste.

Laden Sie Arbeitsblatt und Antwortschlüssel getrennt herunter. Jedes als separate PDF- oder JPEG-Datei. Drucken Sie den Antwortschlüssel für Ihre Unterlagen. Geben Sie nur das Arbeitsblatt an Schüler aus.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from suchen-und-zaehlen.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Erzieher, Eltern und Pädagogen - Kostenlose Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Suchen-und-Zählen-Generator eignet sich für verschiedene Bildungskontexte. Erzieher in der Vorschule nutzen ihn täglich. Grundschullehrer erstellen differenzierte Materialien. Eltern unterstützen ihre Kinder zu Hause. Jede Gruppe profitiert von unterschiedlichen Funktionen.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in Vorschule',
        subtitle: 'Schwungübungen und Ausmalbilder für Vorschul-Arbeitsblätter',
        description: `Erzieher in der Vorschule verwenden Suchen-und-Zählen-Arbeitsblätter täglich. Die visuellen Suchaufgaben fördern Aufmerksamkeit und Konzentration. Kinder lernen Details zu beobachten. Sie entwickeln visuelle Diskriminierungsfähigkeiten die fürs Lesen wichtig sind.

Die Einkreis-Aufgabe trainiert Schwungübungen perfekt. Kinder üben kreisförmige Bewegungen. Diese Bewegungen sind Vorstufen zum Schreiben. Schwungübungen bereiten auf Buchstaben lernen vor. Die motorische Kontrolle verbessert sich durch wiederholtes Üben.

Kombinieren Sie Suchen-und-Zählen mit Ausmalbilder Aktivitäten. Nach dem Finden können Kinder die Objekte ausmalen. Dies verbindet kognitive mit motorischen Fähigkeiten. Malvorlagen fördern Feinmotorik und Kreativität gleichzeitig.`,
        quote: 'Die Suchen-und-Zählen-Arbeitsblätter sind perfekt für unsere Vorschulgruppe!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer 1. bis 3. Klasse',
        subtitle: 'Einmaleins und Rechnen lernen mit Mathe-Arbeitsblätter',
        description: `Grundschullehrer der 1. bis 3. Klasse integrieren Suchen-und-Zählen in den Mathematikunterricht. Die Zählaufgabe trainiert Rechnen lernen praktisch. Kinder zählen versteckte Objekte und schreiben die Zahl auf. Dies festigt Zahlenverständnis und Zahlschreibung.

Erstellen Sie Einmaleins-Übungen mit dem Generator. Platzieren Sie Objekte in bestimmten Mengen. Kinder zählen und multiplizieren die Ergebnisse. Einmaleins wird visuell greifbar.

Die anpassbare Rastergröße ermöglicht Differenzierung. Leistungsschwächere Schüler erhalten 5×5 Raster mit wenigen Objekten. Leistungsstärkere Schüler bekommen 10×10 Raster mit komplexen Zählaufgaben. Alle arbeiten am gleichen Thema auf verschiedenen Niveaus.`,
        quote: 'Die Zählaufgaben verstärken perfekt unser Einmaleins-Training.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern',
        subtitle: 'Buchstaben lernen und Deutsch-Arbeitsblätter für zu Hause',
        description: `Homeschool-Eltern schätzen die Flexibilität des Generators. Erstellen Sie morgens frische Arbeitsblätter passend zur Tagesstimmung. Keine Vorbereitung am Vorabend nötig. Drei Minuten genügen für ein komplettes Arbeitsblatt.

Integrieren Sie Buchstaben lernen in Suchaufgaben. Verwenden Sie Objekte die mit bestimmten Buchstaben beginnen. "Finde alle Objekte die mit B beginnen." Kinder verbinden visuelle Suche mit Phonetik. Buchstaben lernen wird spielerisch.

Erstellen Sie thematische Lernpakete für die Woche. Montag: Bauernhoftiere für Deutsch-Arbeitsblätter. Dienstag: Formen für Geometrie. Mittwoch: Essen für Ernährungskunde. Freitag: Wiederholung mit Lieblingsthemen.`,
        quote: 'Meine Kinder lieben die personalisierten Suchen-und-Zählen-Arbeitsblätter!',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'DaF- und Fremdsprachenlehrer',
        subtitle: 'Mehrsprachige Deutsch-Arbeitsblätter und Vokabeln',
        description: `DaF-Lehrer (Deutsch als Fremdsprache) nutzen den Generator für Vokabeltraining. Die Bildnamen erscheinen in der gewählten Sprache. Schüler lernen Wörter mit visueller Unterstützung. Der Kontext hilft beim Erinnern.

Erstellen Sie identische Arbeitsblätter in zwei Sprachen. Schüler vergleichen deutsche und englische Versionen. Sie erkennen Wortunterschiede und Ähnlichkeiten. Dies fördert metalinguistisches Bewusstsein.

Die 11 Sprachen ermöglichen vielfältige Sprachkombinationen. Deutsch-Französisch für Grenzregionen. Deutsch-Türkisch für mehrsprachige Klassen. Jede Kombination ist möglich.`,
        quote: 'Die visuellen Suchaufgaben sind perfekt für meine DaZ-Schüler.',
      },
      {
        id: '5',
        icon: '🎯',
        title: 'Sonderpädagogen',
        subtitle: 'Differenzierte Vorschul-Arbeitsblätter und visuelle Unterstützung',
        description: `Sonderpädagogen nutzen die anpassbare Komplexität. Schüler mit Aufmerksamkeitsschwierigkeiten erhalten 5×5 Raster. Weniger visuelle Ablenkung hilft bei Fokussierung. Klare, große Bilder erleichtern Erkennung.

Die Aufgabenvielfalt unterstützt verschiedene Fähigkeiten. Einkreisen für Schüler mit guter Feinmotorik. Durchstreichen für Schüler die Kreise schwierig finden. Zählen für Schüler die Schreiben vermeiden. Jeder findet eine passende Aufgabe.

Erstellen Sie personalisierte Arbeitsblätter mit vertrauten Objekten. Laden Sie Fotos von Gegenständen aus dem Klassenzimmer hoch. Vertraute Objekte reduzieren Angst. Erfolgserlebnisse steigern Motivation.`,
        quote: 'Die anpassbare Schwierigkeit ist ideal für meine diversen Lernenden.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrerunternehmer',
        subtitle: 'Kostenlose Arbeitsblätter verkaufen mit POD-Lizenz',
        description: `Lehrerunternehmer verkaufen selbsterstellte Materialien auf Teachers Pay Teachers und Etsy. Der Generator mit POD-Lizenz ist ideal für dieses Geschäftsmodell. Erstellen Sie unbegrenzt viele Arbeitsblätter ohne zusätzliche Kosten.

Erstellen Sie thematische Bundles für bessere Verkäufe. "20 Herbst-Suchaufgaben für Vorschul-Arbeitsblätter". "15 Weihnachts-Themen für Grundschule". Bundles erzielen höhere Preise als einzelne Arbeitsblätter.

Die 300-DPI-Qualität ist essenziell für kommerzielle Produkte. Käufer erwarten gestochen scharfe Ausdrucke. Professionelle Qualität rechtfertigt höhere Preise. Ihre Produkte stechen hervor.`,
        quote: 'Meine Suchen-und-Zählen-Bundles verkaufen sich hervorragend auf TPT!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from suchen-und-zaehlen.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Arbeitsblätter Grundschule und Vorschule',
    sectionDescription: 'Diese häufigen Fragen helfen bei der Entscheidung ob der Generator für Sie geeignet ist. Wir beantworten Fragen zu Kosten, Nutzung und technischen Details.',
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
        question: 'Ist dieser Suchen-und-Zählen-Generator wirklich kostenlos für Vorschul-Arbeitsblätter und Schwungübungen zu verwenden?',
        answer: 'Der Suchen-und-Zählen-Generator erfordert ein Basis-Paket-Abonnement für 144€ jährlich oder 15€ monatlich. Ihr Abonnement ermöglicht unbegrenzte Arbeitsblatt-Erstellung ohne zusätzliche Gebühren pro Blatt. Generieren Sie so viele Vorschul-Arbeitsblätter und Schwungübungen wie Sie benötigen ohne Extrakosten. Das Basis-Paket enthält 10 beliebte Arbeitsblatt-Generatoren inklusive Suchen-und-Zählen.',
      },
      {
        id: '2',
        question: 'Kann ich Arbeitsblätter Grundschule und Mathe-Arbeitsblätter zu Hause auf einem normalen Drucker ausdrucken?',
        answer: 'Ja, alle Arbeitsblätter Grundschule und Mathe-Arbeitsblätter sind für Heimdrucker optimiert. Die PDF-Exporte funktionieren mit jedem Standarddrucker. Wählen Sie Letter- oder A4-Format je nach Region. Die Dateien öffnen sich in jedem PDF-Reader problemlos. Die Graustufen-Option ist ideal für Heimdruck um Tinte zu sparen.',
      },
      {
        id: '3',
        question: 'Benötige ich Designkenntnisse um Deutsch-Arbeitsblätter und Einmaleins-Übungen zu erstellen?',
        answer: 'Nein, keinerlei Designkenntnisse erforderlich für Deutsch-Arbeitsblätter und Einmaleins-Übungen. Die Benutzeroberfläche ist intuitiv gestaltet. Alle Optionen sind klar beschriftet. Dropdown-Menüs zeigen verfügbare Auswahlmöglichkeiten. Der Generator führt Sie durch jeden Schritt. Die 3-Minuten-Erstellung ist keine Übertreibung.',
      },
      {
        id: '4',
        question: 'Kann ich Vorschul-Arbeitsblätter und Schwungübungen in meinem Klassenzimmer für Schüler verwenden?',
        answer: 'Das Basis-Paket-Abonnement umfasst unbegrenzte Klassenzimmer-Nutzung. Drucken Sie so viele Kopien wie Sie benötigen für alle Schüler. Nutzen Sie die Vorschul-Arbeitsblätter und Schwungübungen in Vorschulgruppen, Kindergarten und Grundschule. Keine Einschränkungen bei der Anzahl der Schüler.',
      },
      {
        id: '5',
        question: 'Welche Sprachen sind verfügbar für Mathe-Arbeitsblätter und Rechnen lernen Aktivitäten?',
        answer: 'Der Generator unterstützt 11 Sprachen vollständig für Mathe-Arbeitsblätter und Rechnen lernen. Verfügbare Sprachen: Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Schwedisch, Dänisch, Norwegisch, Finnisch. Sowohl UI als auch Bildnamen sind übersetzt.',
      },
      {
        id: '6',
        question: 'Kann ich selbsterstellte Arbeitsblätter Grundschule und Ausmalbilder verkaufen die ich mit diesem Generator erstelle?',
        answer: 'Ja, das Basis-Paket enthält vollständige Print-on-Demand-Lizenz ohne Extrakosten. Verkaufen Sie alle erstellten Arbeitsblätter Grundschule und Ausmalbilder legal. Plattformen wie Teachers Pay Teachers, Etsy und Amazon KDP sind erlaubt. Keine Namensnennung erforderlich. Keine Verkaufslimits oder Umsatzbeteiligungen.',
      },
      {
        id: '7',
        question: 'Für welche Altersgruppen eignen sich Vorschul-Arbeitsblätter und Einmaleins-Übungen am besten?',
        answer: 'Vorschul-Arbeitsblätter eignen sich ideal für 3-6-jährige Kinder. Diese Altersgruppe liebt visuelle Suchspiele. Einfache Einkreis-Aufgaben trainieren Feinmotorik. Einmaleins-Übungen funktionieren am besten für 6-9-Jährige in der Grundschule. Die anpassbare Schwierigkeit unterstützt alle Entwicklungsstufen perfekt.',
      },
      {
        id: '8',
        question: 'Kann ich eigene Fotos hochladen für Mathe-Arbeitsblätter und Schwungübungen?',
        answer: 'Ja, die Upload-Funktion unterstützt eigene Fotos für Mathe-Arbeitsblätter und Schwungübungen. Klicken Sie auf "Bilder hochladen" und wählen Sie mehrere Dateien aus. Alle gängigen Formate werden akzeptiert (JPEG, PNG, GIF). Ihre Bilder erscheinen sofort zur Verwendung als versteckte Objekte.',
      },
      {
        id: '9',
        question: 'Wie lange dauert es Kostenlose Arbeitsblätter und Rechnen lernen Übungen zu erstellen?',
        answer: 'Das Erstellen von Kostenlose Arbeitsblätter und Rechnen lernen Übungen dauert unter 3 Minuten vom Start bis Download. Mit Übung wird es noch schneller. Erfahrene Nutzer erstellen Arbeitsblätter in 90 Sekunden. Die Zeitersparnis gegenüber traditioneller Erstellung (30-60 Minuten) ist erheblich.',
      },
      {
        id: '10',
        question: 'Enthalten Arbeitsblätter Grundschule und Ausmalbilder automatische Lösungsschlüssel?',
        answer: 'Ja, alle Arbeitsblätter Grundschule werden mit automatischen Lösungsschlüsseln generiert. Der Antwortschlüssel zeigt visuelle Markierungen wo versteckte Objekte sind. Aufgabenspezifische Indikatoren (Kreise, Quadrate, Kreuze, Zahlen) sind deutlich sichtbar. Beide Downloads sind getrennt verfügbar.',
      },
      {
        id: '11',
        question: 'Kann ich Mathe-Arbeitsblätter und Buchstaben lernen Aktivitäten über spezifische Schulfächer erstellen?',
        answer: 'Ja, erstellen Sie Mathe-Arbeitsblätter und Buchstaben lernen Aktivitäten zu jedem Schulfach. Die 3000+ Bildbibliothek deckt alle Themen ab. Mathematik: Zahlen, Formen, Muster. Deutsch: Buchstaben, Objekte für Phonetik. Sachunterricht: Tiere, Pflanzen, Wetter. Jedes Fach profitiert vom visuellen Suchformat.',
      },
      {
        id: '12',
        question: 'Wie kann ich Deutsch-Arbeitsblätter und Buchstaben lernen Aktivitäten für meine Schüler anpassen?',
        answer: 'Deutsch-Arbeitsblätter und Buchstaben lernen Aktivitäten sind vollständig anpassbar. Wählen Sie Buchstaben-Bilder aus der Bibliothek für Phonetik-Übungen. Laden Sie eigene Fotos von Gegenständen hoch die mit bestimmten Buchstaben beginnen. Fügen Sie benutzerdefinierten Text für spezielle Anweisungen hinzu.',
      },
    ],
  },

  // Pricing - Find and Count is CORE BUNDLE (German: Basis-Paket)
  pricing: {
    title: 'Basis-Paket',
    price: '144€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Suchen-und-Zählen-Erstellung',
      'Über 3000 Bilder in Bibliothek',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '300 DPI Druckqualität',
      'Alle 10 Core-Generatoren inklusive',
    ],
    ctaText: 'Jetzt Erstellen',
    guaranteeText: '30 Tage Geld-zurück-Garantie',
  },

  // Related Apps - Kombinieren Sie Suchen-und-Zählen mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Suchen-und-Zählen mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Suchen-und-Zählen mit Mathe-Arbeitsblättern für Rechnen lernen. Verbinden Sie mit Schwungübungen für Feinmotorik-Training. Erstellen Sie thematische Lernpakete.',
    ctaTitle: 'Bereit, fantastische Suchen-und-Zählen-Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlos Testen',
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
        name: 'Mathe-Arbeitsblätter',
        category: 'Mathematik',
        icon: '➕',
        description: 'Kombinieren Sie Suchen-und-Zählen mit Additions-Arbeitsblättern für ganzheitliches Rechnen lernen.',
      },
      {
        id: '2',
        slug: 'writing-app',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✏️',
        description: 'Verbinden Sie visuelle Suche mit Schwungübungen für umfassende Feinmotorik-Entwicklung.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Nutzen Sie Suchen-und-Zählen für Phonetik-Übungen mit dem Alphabet-Zug Generator.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Erweitern Sie Suchaufgaben mit Ausmalbilder für kreative Feinmotorik-Aktivitäten.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Zuordnungs-Arbeitsblätter',
        category: 'Kognitive Entwicklung',
        icon: '🔗',
        description: 'Kombinieren Sie visuelle Diskriminierung mit Zuordnungsübungen für konzentriertes Lernen.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Linien zeichnen',
        category: 'Feinmotorik',
        icon: '📏',
        description: 'Verbinden Sie Suchen-und-Zählen mit Linien-Übungen für motorische Entwicklung.',
      },
    ],
  },
};

export default findAndCountDeContent;
