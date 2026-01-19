import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Grid Match (Raster-Puzzle) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/grid-match-worksheets.ts
 * URL: /de/apps/raster-puzzle-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/raster-puzzle.md
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

export const gridMatchDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'raster-puzzle-arbeitsblaetter',
    appId: 'grid-match',
    title: 'Raster-Puzzle Arbeitsblätter | Kostenlose Vorschul-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Raster-Puzzle-Arbeitsblätter für Grundschule und Vorschule. Räumliches Denken Generator. PDF Download in unter 3 Minuten.',
    keywords: 'raster-puzzle arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, räumliches denken, puzzle arbeitsblätter, schwungübungen, ausmalbilder, einmaleins',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/raster-puzzle-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/grid-match/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Raster-Puzzle Arbeitsblätter Grundschule - Kostenloses Arbeitsblatt für räumliches Denken'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/grid-match/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Arbeitsblätter Raster-Puzzle - Arbeitsblatt für Kinder Vorschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/grid-match/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Vorschul-Arbeitsblätter Raster-Puzzle - Kostenlose Druckvorlagen räumliches Denken'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/grid-match/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblatt für Vorschule Raster-Puzzle - Kostenloses Arbeitsblatt für Kinder'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/grid-match/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mathe-Arbeitsblätter Raster-Puzzle - Arbeitsblatt Grundschule zum Ausdrucken'
      },
    ],
  },

  // Hero Section - FULL text from raster-puzzle.md
  hero: {
    title: 'Raster-Puzzle-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Puzzle Generator für Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Raster-Puzzle-Arbeitsblätter mit unserem Generator. Mit Ihrem Vollzugriff Abo für 240 Euro im Jahr erstellen Sie unbegrenzt viele Arbeitsblätter Grundschule. Keine zusätzlichen Kosten pro Arbeitsblatt. Perfekt für Kinder in Vorschule und 1. Klasse. Das Raster-Puzzle fördert das räumliche Denken und die visuelle Wahrnehmung.

Kinder lieben Puzzle. Mit unserem Raster-Puzzle Generator erstellen Sie Lernmaterialien in wenigen Minuten. Die Kinder ordnen nummerierte Puzzleteile dem richtigen Rasterfeld zu. So trainieren sie spielerisch räumliches Denken. Das Puzzle bereitet auf Mathe-Arbeitsblätter und Einmaleins vor.

Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Raster-Puzzle mit Schwungübungen, Deutsch-Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
    previewImageSrc: '/samples/german/grid-match/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/grid match/
  samples: {
    sectionTitle: 'Raster-Puzzle-Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/german/grid-match/sample-1.jpeg',
        answerKeySrc: '/samples/german/grid-match/sample-1-answer.jpeg',
        altText: 'Raster-Puzzle Arbeitsblätter Grundschule - Kostenloses Arbeitsblatt für räumliches Denken',
        pdfDownloadUrl: '/samples/german/grid-match/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/german/grid-match/sample-2.jpeg',
        answerKeySrc: '/samples/german/grid-match/sample-2-answer.jpeg',
        altText: 'Kostenlose Arbeitsblätter Raster-Puzzle - Arbeitsblatt für Kinder Vorschule',
        pdfDownloadUrl: '/samples/german/grid-match/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/german/grid-match/sample-3.jpeg',
        answerKeySrc: '/samples/german/grid-match/sample-3-answer.jpeg',
        altText: 'Vorschul-Arbeitsblätter Raster-Puzzle - Kostenlose Druckvorlagen räumliches Denken',
        pdfDownloadUrl: '/samples/german/grid-match/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/german/grid-match/sample-4.jpeg',
        answerKeySrc: '/samples/german/grid-match/sample-4-answer.jpeg',
        altText: 'Arbeitsblatt für Vorschule Raster-Puzzle - Kostenloses Arbeitsblatt für Kinder',
        pdfDownloadUrl: '/samples/german/grid-match/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/german/grid-match/sample-5.jpeg',
        answerKeySrc: '/samples/german/grid-match/sample-5-answer.jpeg',
        altText: 'Mathe-Arbeitsblätter Raster-Puzzle - Arbeitsblatt Grundschule zum Ausdrucken',
        pdfDownloadUrl: '/samples/german/grid-match/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from raster-puzzle.md feature sections
  features: {
    sectionTitle: 'Funktionen des Raster-Puzzle Generators - Kostenlose Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Unser Raster-Puzzle Generator bietet alle Werkzeuge für professionelle Arbeitsblätter. Die Bedienung ist einfach und intuitiv. In wenigen Minuten erstellen Sie individuelle Lernmaterialien. Perfekt für Lehrer, Erzieher und Eltern. Das Vollzugriff Abonnement schaltet alle Funktionen frei.',
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
        title: 'Kostenlose Arbeitsblätter in 3 Klicks erstellen - Mathe-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Die Erstellung ist kinderleicht. Wählen Sie ein Bild aus der Bibliothek. Stellen Sie die Rastergröße ein. Klicken Sie auf Generieren. Ihr Arbeitsblatt ist fertig. Perfekt für Mathe-Arbeitsblätter und andere Fächer. Kostenlose Arbeitsblätter waren noch nie so einfach.

Das Raster kann 2x2 bis 4x4 Felder haben. Sie bestimmen die Schwierigkeit. Für Vorschul-Arbeitsblätter empfehlen wir 2x2 oder 3x3. Für die Grundschule eignen sich 3x3 oder 4x4 Raster. Die Hinweisfelder zeigen bereits platzierte Teile.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Vorschul-Arbeitsblätter vollständig bearbeiten - Einmaleins und Buchstaben lernen vorbereiten',
        description: `Jedes Element auf dem Arbeitsblatt ist bearbeitbar. Verschieben Sie Bilder mit der Maus. Drehen und skalieren Sie alle Objekte. Löschen Sie ungewollte Elemente. Diese Flexibilität ist ideal für Vorschul-Arbeitsblätter.

Die Bearbeitungsfunktion unterstützt das Einmaleins Training. Fügen Sie Zahlen und Symbole hinzu. Bereiten Sie Kinder auf Buchstaben lernen vor. Kombinieren Sie visuelle Puzzle mit Schriftzeichen. Das Kontextmenü bietet alle Optionen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen für Arbeitsblätter Grundschule - Schwungübungen personalisieren',
        description: `Laden Sie eigene Fotos und Grafiken hoch. Das macht Arbeitsblätter Grundschule persönlich. Verwenden Sie Klassenfotos oder Schullogos. Mehrere Dateien gleichzeitig sind möglich. Alle gängigen Bildformate werden unterstützt.

Personalisierte Puzzle motivieren die Kinder. Kombinieren Sie eigene Bilder mit Schwungübungen. Erstellen Sie thematische Lernpakete. Das Hochladen ist schnell und unkompliziert. Ihre Bilder erscheinen sofort in der Vorschau.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Deutsch-Arbeitsblätter in 11 Sprachen - Rechnen 1. Klasse international',
        description: `Die Bildbibliothek ist in 11 Sprachen verfügbar. Deutsch-Arbeitsblätter mit deutschen Bildnamen. Englische Begriffe für den Fremdsprachenunterricht. Französisch, Spanisch und weitere Sprachen. Perfekt für mehrsprachige Klassen.

Diese Funktion unterstützt auch Rechnen 1. Klasse mit Bildern. Die Bildnamen erscheinen in der gewählten Sprache. So lernen Kinder gleichzeitig neue Wörter. International einsetzbar für alle Schulformen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz für Arbeitsblätter Grundschule - Ausmalbilder und Malvorlagen verkaufen',
        description: `Mit dem Vollzugriff Abonnement erhalten Sie eine kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsblätter auf Teachers Pay Teachers. Bieten Sie Materialien auf Etsy an. Veröffentlichen Sie Arbeitsbücher auf Amazon KDP. Keine zusätzlichen Lizenzgebühren fallen an.

Die 300 DPI Qualität ist druckfertig. Ihre Arbeitsblätter sehen professionell aus. Die kommerzielle Nutzung ist unbegrenzt. Perfekt für Lehrer-Unternehmer. Verdienen Sie Geld mit Ihren Ausmalbilder und Malvorlagen Kreationen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder für Kostenlose Arbeitsblätter - Einmaleins bis Schwungübungen',
        description: `Die Bibliothek enthält über 3000 kinderfreundliche Bilder. Thematisch sortiert für schnelles Finden. Tiere, Fahrzeuge, Lebensmittel und mehr. Perfekt für Kostenlose Arbeitsblätter aller Art. Vom Einmaleins bis zu Schwungübungen.

Die Suchfunktion findet Bilder sofort. Geben Sie einfach einen Begriff ein. Hintergründe und Rahmen sind ebenfalls enthalten. Alles in Ihrem Abonnement inbegriffen. Keine zusätzlichen Kosten für Bildmaterial.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität - Rechnen lernen mit gestochen scharfen Arbeitsblättern',
        description: `Der Export erfolgt in höchster Qualität. 300 DPI garantiert scharfe Druckergebnisse. PDF und JPEG Format verfügbar. Die Graustufen-Option spart Druckertinte. Perfekt für den täglichen Schulgebrauch.

Rechnen lernen macht mehr Spaß mit klaren Bildern. Die hohe Auflösung zeigt jedes Detail. Auch kleine Zahlen sind gut lesbar. Ideal für Buchstaben lernen und feine Linien. Professionell drucken leicht gemacht.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Anpassbare Rastergröße für Mathe-Arbeitsblätter - Schwierigkeit individuell einstellen',
        description: `Navigieren Sie zu den Rasteroptionen. Hier stellen Sie Zeilen und Spalten ein. Für Arbeitsblätter Grundschule eignen sich 3x3 Raster. Jüngere Kinder beginnen mit 2x2. Ältere Schüler meistern auch 4x4.

Die Hinweisfelder bestimmen die Schwierigkeit. Ein Hinweisfeld zeigt ein bereits platziertes Teil. Mehr Hinweise machen das Puzzle einfacher. Für Einmaleins Übungen wählen Sie mittlere Schwierigkeit. So bleibt die Herausforderung motivierend.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '🔑',
        title: 'Automatische Lösungsblätter für Arbeitsblätter Grundschule und Einmaleins Übungen',
        description: `Jedes Arbeitsblatt enthält ein Lösungsblatt. Klicken Sie auf "Lösungsblatt generieren". Es zeigt das vollständige Bild mit Nummern. Perfekt für die schnelle Kontrolle im Unterricht.

Das Lösungsblatt laden Sie separat herunter. Arbeitsblätter Grundschule und Lösung in einem Paket. PDF oder JPEG Format nach Wahl. Die Korrektur wird zum Kinderspiel. Auch Einmaleins Übungen profitieren von dieser Automatisierung.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '📊',
        title: 'Räumliches Denken fördern mit Vorschul-Arbeitsblättern und Buchstaben lernen',
        description: `Das Raster-Puzzle fördert wichtige Vorläuferfertigkeiten. Es bereitet auf Mathe-Arbeitsblätter und Einmaleins vor. Auch Deutsch-Arbeitsblätter profitieren von dieser Methode. Kinder lernen, genau hinzusehen und zu vergleichen.

Das räumliche Denken hilft beim Buchstaben lernen. Die Schwungübungen werden durch Puzzle-Training verbessert. Kinder entwickeln eine bessere Hand-Auge-Koordination. Diese Fähigkeit ist wichtig für das Schreiben.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from raster-puzzle.md step sections
  howTo: {
    sectionTitle: 'Anleitung: Kostenlose Arbeitsblätter Grundschule erstellen in 5 einfachen Schritten - Raster-Puzzle Generator',
    sectionDescription: 'Generieren Sie professionelle Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule in unter drei Minuten. Diese Schritt-für-Schritt-Anleitung zeigt Ihnen den kompletten Erstellungsprozess. Keine Designkenntnisse erforderlich für kostenlose Arbeitsblätter. Der optimierte Workflow hilft Lehrkräften, Mathe-Arbeitsblätter und Puzzle effizient zu erstellen.',
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
        title: 'Schritt 1: Bild auswählen für Vorschul-Arbeitsblätter - Mathe-Arbeitsblätter mit Motiven',
        description: `Öffnen Sie den Raster-Puzzle Generator. Die Bildbibliothek erscheint automatisch. Wählen Sie ein Thema aus dem Dropdown-Menü. Tiere, Fahrzeuge oder Lebensmittel stehen zur Verfügung. Für Vorschul-Arbeitsblätter empfehlen wir einfache Motive.

Klicken Sie auf das gewünschte Bild. Es erscheint in der Vorschau. Auch eigene Bilder können Sie hochladen. Die Suche hilft beim Finden bestimmter Motive. Mathe-Arbeitsblätter mit Zahlenbildern sind besonders beliebt. Alternativ nutzen Sie die Suchfunktion für schnelles Finden.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Rastergröße einstellen für Arbeitsblätter Grundschule - Einmaleins Schwierigkeit anpassen',
        description: `Navigieren Sie zu den Rasteroptionen. Hier stellen Sie Zeilen und Spalten ein. Für Arbeitsblätter Grundschule eignen sich 3x3 Raster. Jüngere Kinder beginnen mit 2x2. Ältere Schüler meistern auch 4x4.

Die Hinweisfelder bestimmen die Schwierigkeit. Ein Hinweisfeld zeigt ein bereits platziertes Teil. Mehr Hinweise machen das Puzzle einfacher. Für Einmaleins Übungen wählen Sie mittlere Schwierigkeit. Wählen Sie auch das Seitenformat Letter oder A4.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt generieren - Deutsch-Arbeitsblätter und Ausmalbilder in Sekunden',
        description: `Klicken Sie auf "Neues Arbeitsblatt". Der Generator erstellt Ihr Puzzle sofort. Das Raster erscheint mit nummerierten Feldern. Die Puzzleteile zeigen sich daneben. Deutsch-Arbeitsblätter sind in Sekunden fertig.

Die Vorschau zeigt das komplette Layout. Prüfen Sie die Anordnung der Teile. Fragezeichen markieren die leeren Felder. Hinweisfelder zeigen bereits die Lösung. Ausmalbilder werden automatisch in Puzzleteile zerlegt.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Bearbeiten auf der Leinwand - Buchstaben lernen und Schwungübungen hinzufügen',
        description: `Jetzt beginnt die Feinarbeit. Alle Elemente sind verschiebbar. Ziehen Sie Objekte an die gewünschte Position. Vergrößern oder verkleinern Sie nach Bedarf. Drehen Sie Elemente mit dem Rotationsgriff.

Fügen Sie Text hinzu für Buchstaben lernen. Wählen Sie Schriftart und Größe. Farben und Umrandungen sind einstellbar. Schwungübungen können Sie als Linienmuster ergänzen. Das Kontextmenü bietet alle Bearbeitungsoptionen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Herunterladen und Drucken - Rechnen lernen mit Malvorlagen als PDF',
        description: `Ihr Arbeitsblatt ist fertig. Klicken Sie auf den Download-Button. Wählen Sie zwischen PDF und JPEG. Das PDF eignet sich perfekt zum Drucken. JPEG ist ideal für digitale Nutzung. Die Graustufen-Option spart Tinte.

Rechnen lernen Materialien drucken Sie so kostengünstig. Malvorlagen sehen auch in Schwarzweiß gut aus. Vergessen Sie nicht das Lösungsblatt. Ihr Vollzugriff Abonnement (240€/Jahr) deckt unbegrenzte Downloads von Arbeitsblätter Grundschule und allen anderen Arbeitsblatttypen ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from raster-puzzle.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Der Raster-Puzzle Generator eignet sich für viele Zielgruppen. Lehrer, Erzieher und Eltern nutzen ihn täglich. Die vielfältigen Einsatzmöglichkeiten überraschen immer wieder. Entdecken Sie, wie auch Sie profitieren können.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher und Vorschullehrer - Vorschul-Arbeitsblätter mit Schwungübungen kombinieren',
        subtitle: 'Vorschul-Arbeitsblätter für kognitive Entwicklung',
        description: `Erzieher in Kindertagesstätten lieben dieses Werkzeug. Vorschul-Arbeitsblätter entstehen in Minuten. Das Raster-Puzzle fördert wichtige Vorläuferfertigkeiten. Die visuelle Wahrnehmung wird spielerisch trainiert. Schwungübungen ergänzen das Puzzle perfekt.

Die 2x2 Raster sind ideal für Vorschulkinder. Einfache Motive halten die Aufmerksamkeit. Tiere und Fahrzeuge begeistern die Kleinen. Schwungübungen können Sie direkt hinzufügen. So entsteht ein komplettes Lernpaket für die Vorschule.`,
        quote: 'Meine Vorschulkinder lieben die bunten Puzzle mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer 1. bis 3. Klasse - Mathe-Arbeitsblätter und Einmaleins mit Puzzle',
        subtitle: 'Arbeitsblätter Grundschule für 1. bis 3. Klasse',
        description: `Lehrer der 1. Klasse bis 3. Klasse Grundschule setzen auf Abwechslung. Mathe-Arbeitsblätter werden durch Puzzle aufgelockert. Das Einmaleins üben Kinder motivierter mit Rätseln. Die Belohnung nach der Rechenaufgabe ist das fertige Bild.

Für die 1. Klasse eignen sich 3x3 Raster. In der 2. und 3. Klasse steigern Sie auf 4x4. Das Einmaleins Training wird so zum Spiel. Mathe-Arbeitsblätter mit Puzzle-Elementen sind beliebter. Die Kinder arbeiten konzentrierter und länger.`,
        quote: 'Ich erstelle differenzierte Puzzle für alle meine Schüler in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern - Buchstaben lernen und Kostenlose Arbeitsblätter für zu Hause',
        subtitle: 'Buchstaben lernen und Feinmotorik für zu Hause',
        description: `Homeschooling-Familien schätzen die Flexibilität. Kostenlose Arbeitsblätter passen sich dem Lernstand an. Buchstaben lernen wird mit Puzzle interessanter. Das Kind bleibt länger bei der Sache. Die Eltern sparen Zeit bei der Vorbereitung.

Erstellen Sie individuelle Lernpläne. Buchstaben lernen am Montag mit A-Puzzle. Dienstag folgt B mit neuem Motiv. Kostenlose Arbeitsblätter für die ganze Woche. So strukturieren Sie das Lernen zu Hause effektiv.`,
        quote: 'Perfekt für alle meine Kinder auf unterschiedlichen Niveaus!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ-Lehrer - Deutsch-Arbeitsblätter in 11 Sprachen für Sprachförderung',
        subtitle: 'Deutsch-Arbeitsblätter für mehrsprachigen Unterricht',
        description: `Deutsch als Fremdsprache Lehrer profitieren besonders. Deutsch-Arbeitsblätter mit Bildvokabeln sind effektiv. Die 11 Sprachen der Bildbibliothek helfen beim Übersetzen. Kinder lernen deutsche Begriffe mit Bildern. Das Puzzle macht den Wortschatz lebendig.

Die mehrsprachige Funktion ist einzigartig. Deutsch-Arbeitsblätter zeigen das Bild mit deutschem Namen. Der Vergleich zur Muttersprache ist möglich. DaZ-Kinder verstehen schneller den Zusammenhang. Sprachförderung wird spielerisch und effektiv.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderschullehrer - Rechnen lernen und Ausmalbilder für besondere Bedürfnisse',
        subtitle: 'Differenzierte Materialien für individuelle Förderung',
        description: `Kinder mit Förderbedarf brauchen angepasste Materialien. Rechnen lernen in kleinen Schritten ist wichtig. Die einstellbare Schwierigkeit hilft dabei. Ausmalbilder als Puzzle motivieren besonders gut. Erfolgserlebnisse stärken das Selbstvertrauen.

Die 2x2 Raster sind niedrigschwellig. Viele Hinweisfelder erleichtern den Einstieg. Rechnen lernen Aufgaben passen Sie individuell an. Ausmalbilder mit bekannten Motiven schaffen Vertrautheit. Jedes Kind kann ein Erfolgserlebnis haben.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Schüler erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrer-Unternehmer - Malvorlagen und Arbeitsblätter Grundschule verkaufen',
        subtitle: 'Kommerzielle Lizenz für passive Einnahmen',
        description: `Verdienen Sie Geld mit Ihren Kreationen. Malvorlagen als Puzzle sind auf Etsy beliebt. Arbeitsblätter Grundschule verkaufen sich auf Teachers Pay Teachers gut. Die kommerzielle Lizenz ist im Vollzugriff enthalten. Keine zusätzlichen Gebühren fallen an.

Erstellen Sie thematische Pakete. Malvorlagen zu Jahreszeiten verkaufen sich gut. Arbeitsblätter Grundschule für Ferienprogramme sind gefragt. Die 300 DPI Qualität überzeugt Käufer. Starten Sie Ihr Nebengeschäft mit professionellen Materialien.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from raster-puzzle.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zum Raster-Puzzle Generator - Vorschul-Arbeitsblätter, Mathe-Arbeitsblätter und Kostenlose Arbeitsblätter FAQ',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Raster-Puzzle Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter.',
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
        question: 'Ist der Raster-Puzzle Generator wirklich kostenlos für Arbeitsblätter Grundschule?',
        answer: 'Der Raster-Puzzle Generator erfordert ein Vollzugriff Abonnement. Die Kosten betragen 240 Euro pro Jahr oder 25 Euro monatlich. Mit Ihrem Abonnement erstellen Sie unbegrenzt viele Arbeitsblätter Grundschule. Keine zusätzlichen Kosten pro Arbeitsblatt fallen an. Das Vollzugriff Abo enthält alle 33 Arbeitsblatt-Generatoren.',
      },
      {
        id: '2',
        question: 'Kann ich Mathe-Arbeitsblätter zu Hause auf einem normalen Drucker drucken?',
        answer: 'Ja, alle Mathe-Arbeitsblätter sind für Heimdrucker optimiert. Die PDF-Dateien drucken Sie auf jedem Standarddrucker. Letter und A4 Format sind verfügbar. Die Graustufen-Option spart Tinte bei Mathe-Arbeitsblättern. Die 300 DPI Qualität garantiert scharfe Ergebnisse.',
      },
      {
        id: '3',
        question: 'Brauche ich Designkenntnisse für Vorschul-Arbeitsblätter mit Einmaleins?',
        answer: 'Nein, keinerlei Designkenntnisse sind erforderlich. Vorschul-Arbeitsblätter erstellen Sie in wenigen Klicks. Das Einmaleins Training fügen Sie einfach als Text hinzu. Der Generator übernimmt die komplette Gestaltung. Wählen Sie Bild und Rastergröße, dann klicken Sie auf Generieren.',
      },
      {
        id: '4',
        question: 'Darf ich Deutsch-Arbeitsblätter im Unterricht mit Schülern verwenden?',
        answer: 'Ja, das Vollzugriff Abonnement erlaubt unbegrenzte Unterrichtsnutzung. Deutsch-Arbeitsblätter für Ihre gesamte Klasse sind erlaubt. Kopieren und Verteilen ist inklusive. Keine Einschränkung bei der Schüleranzahl. Die Lizenz gilt für Ihre gesamte Lehrtätigkeit.',
      },
      {
        id: '5',
        question: 'In welchen Sprachen sind Schwungübungen und Buchstaben lernen Materialien verfügbar?',
        answer: 'Die Bildbibliothek unterstützt 11 Sprachen. Deutsch, Englisch, Französisch, Spanisch und Italienisch. Portugiesisch, Niederländisch, Schwedisch, Dänisch und Norwegisch. Finnisch rundet das Angebot ab. Schwungübungen funktionieren sprachunabhängig. Buchstaben lernen ist in jeder Sprache möglich.',
      },
      {
        id: '6',
        question: 'Kann ich Ausmalbilder und Malvorlagen mit dem Generator verkaufen?',
        answer: 'Ja, das Vollzugriff Abo enthält die kommerzielle Lizenz. Ausmalbilder als Puzzle dürfen Sie verkaufen. Malvorlagen auf Etsy oder Teachers Pay Teachers anbieten. Keine zusätzlichen Lizenzgebühren fallen an. Amazon KDP Aktivitätsbücher sind ebenfalls erlaubt.',
      },
      {
        id: '7',
        question: 'Wie passe ich Rechnen lernen Arbeitsblätter für meine Schüler an?',
        answer: 'Die Anpassung ist vielfältig möglich. Rechnen lernen Aufgaben fügen Sie als Text hinzu. Die Rastergröße bestimmt die Schwierigkeit. Hinweisfelder erleichtern oder erschweren das Puzzle. Eigene Bilder personalisieren das Material.',
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Rechnen 1. Klasse Puzzle-Arbeitsblätter?',
        answer: 'Das Raster-Puzzle eignet sich für Kinder von 4 bis 10 Jahren. Rechnen 1. Klasse Schüler meistern 3x3 Raster gut. Vorschulkinder starten mit 2x2 Rastern. Ältere Grundschüler lösen 4x4 Puzzles. Die Schwierigkeit passt sich dem Alter an.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder für Kostenlose Arbeitsblätter hochladen?',
        answer: 'Ja, der Upload eigener Bilder ist möglich. Kostenlose Arbeitsblätter werden so persönlich. Klassenfotos oder Schullogos verwenden Sie problemlos. Alle gängigen Bildformate werden unterstützt. Mehrere Dateien gleichzeitig hochladen ist möglich.',
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Einmaleins Arbeitsblättern?',
        answer: 'Die Erstellung dauert unter drei Minuten. Einmaleins Arbeitsblätter entstehen mit wenigen Klicks. Bild auswählen, Raster einstellen, generieren. Das Einmaleins Training fügen Sie als Text hinzu. Die Zeitersparnis gegenüber manueller Erstellung ist enorm.',
      },
      {
        id: '11',
        question: 'Enthalten die Arbeitsblätter Grundschule ein Lösungsblatt?',
        answer: 'Ja, jedes Arbeitsblatt Grundschule hat ein Lösungsblatt. Klicken Sie auf "Lösungsblatt generieren". Es zeigt das vollständige Bild mit Nummern. Perfekt für die schnelle Kontrolle im Unterricht. Das Lösungsblatt laden Sie separat herunter.',
      },
      {
        id: '12',
        question: 'Kann ich Deutsch-Arbeitsblätter zu bestimmten Schulfächern erstellen?',
        answer: 'Das Raster-Puzzle ist fächerübergreifend einsetzbar. Deutsch-Arbeitsblätter mit Vokabelbildern sind beliebt. Sachunterricht mit Tierbildern funktioniert hervorragend. Mathematik durch Zahlenbilder ergänzen. Die thematische Bildbibliothek hilft dabei.',
      },
    ],
  },

  // Pricing - Vollzugriff pricing (240€/year)
  pricing: {
    title: 'Vollzugriff',
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
    bundleDescription: 'Ihr Abonnement umfasst Zugriff auf alle 33 Arbeitsblatt-Generatoren:',
    bundleApps: [
      'Bildzusatz',
      'Alphabet-Zug',
      'Groß oder Klein',
      'Bilder-Bingo',
      'Bilddiagramm',
      'Code Addition',
      'Malvorlagen',
      'Kreuzworträtsel',
      'Kryptogramm',
      'Malen und Zeichnen',
      'Linien Zeichnen',
      'Finden und Zählen',
      'Suchbilder',
      'Raster-Puzzle',
      'Zuordnungsspiel',
      'Mathe-Rätsel',
      'Mathe-Arbeitsblätter',
      'Fehlende Teile',
      'Mehr oder Weniger',
      'Was passt nicht',
      'Muster-Zug',
      'Muster-Arbeitsblatt',
      'Bilderpfad',
      'Bilder Sortieren',
      'Präpositionen',
      'Schattenbilder',
      'Subtraktion',
      'Sudoku',
      'Schatzsuche',
      'Wörter Raten',
      'Wortsalat',
      'Wortsuche',
      'Schreibübungen',
    ],
  },

  // Related Apps - Apps that work well with grid-match
  relatedApps: {
    sectionTitle: 'Raster-Puzzle mit 32 anderen Generatoren kombinieren - Einmaleins, Schwungübungen und Arbeitsblätter Grundschule',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Raster-Puzzle-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlose Testversion Starten',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert hervorragend mit',
    exploreText: 'Alle Apps erkunden',
    trustBadges: {
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
        description: 'Kombinieren Sie Rechnen lernen und Rechnen 1. Klasse mit Puzzle. Schüler lösen Aufgaben dann vervollständigen sie das Puzzle.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✍️',
        description: 'Ergänzen Sie Puzzle mit Schwungübungen für vollständige Vorschul-Arbeitsblätter. Beide Apps trainieren Feinmotorik und visuelle Wahrnehmung.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Sprache',
        icon: '🔤',
        description: 'Kombinieren Sie Buchstaben lernen Aktivitäten mit Raster-Puzzle. Jeder Buchstabe erhält ein eigenes Puzzle-Arbeitsblatt.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Erstellen Sie Ausmalbilder und Malvorlagen Kombi-Pakete. Kinder lösen das Puzzle dann malen das Bild aus.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Zuordnungs-Generator',
        category: 'Logik',
        icon: '🔗',
        description: 'Ergänzen Sie Puzzle mit Vorschul-Arbeitsblätter für Matching-Übungen. Beide trainieren visuelle Unterscheidung.',
      },
      {
        id: '6',
        slug: 'math-puzzle',
        name: 'Mathe-Arbeitsblätter',
        category: 'Mathematik',
        icon: '🧮',
        description: 'Kombinieren Sie Mathe-Arbeitsblätter mit Raster-Puzzle für unterhaltsame Übungspakete. Einmaleins und Zahlenrätsel inklusive.',
      },
      {
        id: '7',
        slug: 'word-search',
        name: 'Deutsch-Arbeitsblätter',
        category: 'Sprache',
        icon: '🔍',
        description: 'Erstellen Sie Deutsch-Arbeitsblätter mit Wortsuche und Puzzle. Perfekt für Rechtschreibung und Vokabeltraining.',
      },
      {
        id: '8',
        slug: 'sudoku',
        name: 'Rechnen lernen',
        category: 'Logik',
        icon: '🔢',
        description: 'Kombinieren Sie Rechnen lernen mit logischem Denken. Sudoku und Puzzle trainieren Konzentration.',
      },
      {
        id: '9',
        slug: 'subtraction',
        name: 'Einmaleins Generator',
        category: 'Mathematik',
        icon: '➖',
        description: 'Ergänzen Sie Einmaleins Übungen mit Raster-Puzzle. Mathe-Arbeitsblätter für die Grundschule.',
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
        description: 'Ergänzen Sie Buchstaben lernen mit Schreibübungen. Deutsch-Arbeitsblätter für die Vorschule.',
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
        description: 'Erstellen Sie Deutsch-Arbeitsblätter mit Kreuzworträtseln. Kombinieren Sie mit Schwungübungen.',
      },
      {
        id: '14',
        slug: 'missing-pieces',
        name: 'Einmaleins Puzzle',
        category: 'Logik',
        icon: '🧩',
        description: 'Ergänzen Sie Einmaleins Übungen mit visuellen Puzzles. Buchstaben lernen und Rechnen kombiniert.',
      },
    ],
  },
};

export default gridMatchDeContent;
