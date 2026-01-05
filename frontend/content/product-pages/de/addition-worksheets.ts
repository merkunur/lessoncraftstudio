import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/addition-worksheets.ts
 * URL: /de/apps/addition-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/addition.md
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

export const additionDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'addition-arbeitsblaetter',
    appId: 'image-addition',
    title: 'Additions-Generator - Kostenlose Mathe-Arbeitsblätter Grundschule - Rechnen lernen 1. Klasse',
    description: 'Erstellen Sie professionelle Additions-Arbeitsblätter für Grundschule und Vorschule mit unserem kostenlosen Generator. Perfekt für Rechnen lernen, Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Additions-Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse.',
    keywords: 'additions generator, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/addition-arbeitsblaetter',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Additions-Generator',
    subtitle: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Rechnen lernen 1. Klasse',
    description: `Erstellen Sie professionelle Additions-Arbeitsblätter für Grundschule und Vorschule mit unserem kostenlosen Generator. Perfekt für Rechnen lernen, Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Additions-Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse. Mathe-Arbeitsblätter mit Bildern machen Rechnen lernen anschaulich und motivierend.

Mit dem Additions-Generator erstellen Sie in weniger als 3 Minuten druckfertige Arbeitsblätter Grundschule. Der Generator kombiniert spielerisch Rechnen lernen mit visuellen Bilddarstellungen. Laden Sie fertige Additions-Arbeitsblätter als PDF oder JPEG herunter. Jedes Arbeitsblatt enthält automatisch ein Lösungsblatt für schnelle Korrektur.

Unser kostenloser Additions-Generator bietet über 3000 kindgerechte Bilder für Mathe-Arbeitsblätter. Erstellen Sie thematische Additions-Übungen für Vorschul-Arbeitsblätter oder Arbeitsblätter Grundschule. Der Generator funktioniert in 11 Sprachen und ist ideal für mehrsprachigen Mathematikunterricht geeignet.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Additions-Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Additions-Arbeitsblatt im Hochformat mit bildbasierter Addition für Vorschul-Arbeitsblätter und Rechnen lernen',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Additions-Arbeitsblatt im Querformat mit bunten Bildern für die Grundschule',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Bild-plus-Zahl Additions-Arbeitsblatt für den Übergang von konkretem zu abstraktem Rechnen',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Addend-finden Arbeitsblatt für fortgeschrittenes Rechnen lernen in der 1. Klasse',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Gemischte Additions-Modi Arbeitsblatt für differenzierten Mathematikunterricht',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Funktionen des Additions-Generators - Kostenlose Mathe-Arbeitsblätter für Rechnen lernen',
    sectionDescription: 'Der Additions-Generator bietet alle wichtigen Funktionen für kostenlose Mathe-Arbeitsblätter. Erstellen Sie professionelle Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter in wenigen Minuten. Jede Funktion wurde speziell für Lehrkräfte entwickelt.',
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
        icon: '🖼️',
        title: 'Bildbasierte Addition - Visuelle Mathe-Arbeitsblätter für Rechnen lernen',
        description: `Junge Lernende verstehen Zahlen durch konkrete Bilder. Unser Additions-Generator verwendet Tierbilder, Fahrzeuge, Früchte und über 3000 weitere Motive für Arbeitsblätter Grundschule. Visuelle Addition macht Mathe-Arbeitsblätter greifbar und verständlich für Vorschul-Arbeitsblätter.

Die Methodik folgt bewährten pädagogischen Grundsätzen für Rechnen lernen 1. Klasse. Konkrete Darstellungen ermöglichen Begriffsverständnis. Schüler zählen Bilder vor der Abstraktion zu Zahlen. Das Basis-Paket für 144 € jährlich bietet Zugang zu allen Bildern ohne Beschränkungen.

Vorschulkinder und Erstklässler profitieren enorm von bildbasiertem Lernen. Traditionelle Mathe-Arbeitsblätter mit nur Zahlen überfordern oft junge Lernende. Mit Bildern bauen Schüler Zahlensinn und Selbstvertrauen auf. Kostenlose Arbeitsblätter machen diese Methode allen zugänglich.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '⚙️',
        title: 'Fünf Übungsmodi - Differenzierte Additions-Arbeitsblätter für alle Niveaus',
        description: `Wählen Sie zwischen fünf Übungsmodi für differenzierte Arbeitsblätter Grundschule. Bild-plus-Bild zeigt beide Operanden als Bildgruppen. Bild-plus-Zahl kombiniert konkrete und abstrakte Darstellung. Zahl-plus-Bild kehrt die Reihenfolge um. Addend-Finden fordert Schüler, fehlende Summanden zu ermitteln. Der gemischte Modus kombiniert alle Typen auf einem Arbeitsblatt.

Verschiedene Modi sprechen unterschiedliche Lernstadien an für Mathe-Arbeitsblätter. Anfänger beginnen mit Bild-plus-Bild. Fortgeschrittene arbeiten mit Bild-plus-Zahl. Meister lösen Addend-Finden-Aufgaben. Jeder Modus unterstützt progressive Entwicklung für Rechnen lernen.

Differenzierte Vorschul-Arbeitsblätter entstehen durch Modi-Auswahl. Gleiche Themen, unterschiedliche Schwierigkeiten. Lehrkräfte verteilen passende Arbeitsblätter nach Schülerniveau. Alle arbeiten am gleichen Thema, aber auf ihrem eigenen Niveau. Das Basis-Paket macht Differenzierung einfach.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Anpassbare Zahlenbereiche - Vorschul-Arbeitsblätter bis Grundschul-Niveau',
        description: `Stellen Sie Minimum- und Maximum-Werte für Operanden ein für kostenlose Arbeitsblätter. Vorschulkinder arbeiten mit 1-3 für einfache Summen. Erstklässler nutzen 1-10 für Mathe-Arbeitsblätter. Fortgeschrittene Schüler rechnen mit 1-20 oder höher für Arbeitsblätter Grundschule.

Die Schwierigkeitsanpassung ermöglicht individualisiertes Lernen für Rechnen lernen. Kämpfende Schüler üben mit kleinen Zahlen. Begabte Lernende erhalten anspruchsvollere Aufgaben. Jedes Arbeitsblatt passt zum Entwicklungsstand des Kindes. Keine generischen Einheitslösungen mehr.

Summen-Obergrenzen verhindern zu schwere Aufgaben für Vorschul-Arbeitsblätter. Stellen Sie maximale Summen auf 5 für Anfänger ein. Erhöhen Sie auf 10, 20 oder mehr nach Fortschritt. Der Generator erstellt Aufgaben innerhalb Ihrer Parameter. Perfekte Kontrolle über Schwierigkeit für Mathe-Arbeitsblätter.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '✨',
        title: 'Automatische Lösungsblätter - Zeitsparende Korrektur für Arbeitsblätter Grundschule',
        description: `Jedes generierte Arbeitsblatt erstellt automatisch ein Lösungsblatt für Mathe-Arbeitsblätter. Die Antworten erscheinen klar in den Lösungsfeldern. Wechseln Sie zwischen Arbeitsblatt und Lösung mit einem Klick. Beide laden als separate Dateien für kostenlose Arbeitsblätter herunter.

Lehrkräfte sparen enorme Korrekturzeit mit Vorschul-Arbeitsblättern. Keine manuelle Berechnung jeder Aufgabe mehr nötig. Schnelle visuelle Überprüfung mit dem Lösungsblatt. Mehr Zeit für eigentlichen Unterricht statt Korrektur. Das Basis-Paket maximiert Ihre Zeiteffizienz für Arbeitsblätter Grundschule.

Selbstkorrektur wird mit Lösungsblättern möglich für Rechnen lernen. Schüler können ihre Arbeit eigenständig überprüfen. Fördert Verantwortung und Selbstständigkeit. Eltern helfen bei Hausaufgaben ohne Mathe-Angst. Lösungsblätter machen Additions-Übung für alle zugänglicher.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '📐',
        title: 'Flexibles Layout - Hochformat und Querformat für alle Druckbedürfnisse',
        description: `Wählen Sie zwischen Hochformat und Querformat für Arbeitsblätter Grundschule. Hochformat passt mehr Aufgaben auf eine Seite. Querformat bietet größere Bilder für bessere Sichtbarkeit. Beide Formate drucken auf Standard A4 oder Letter Papier für Mathe-Arbeitsblätter.

Die Aufgabenanzahl ist ebenfalls anpassbar für Vorschul-Arbeitsblätter. Weniger Aufgaben für Anfänger oder kurze Übungen. Mehr Aufgaben für Hausaufgaben oder Tests. Das Layout passt sich automatisch an Ihre Wahl an. Professionelle Formatierung ohne Designkenntnisse.

A4 und Letter Größen decken alle Druckerbedürfnisse ab für kostenlose Arbeitsblätter. Europäische Schulen nutzen A4. Amerikanische Schulen bevorzugen Letter. Der Generator unterstützt beides. Perfekte Kompatibilität mit jedem Schuldrucker für Rechnen lernen.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder - Thematische Mathe-Arbeitsblätter für jeden Lehrplan',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Organisiert nach Themen wie Tiere, Fahrzeuge, Essen, Natur und mehr. Durchsuchen Sie Bilder nach Kategorien oder nutzen Sie die Suchfunktion. Neue Bilder werden regelmäßig hinzugefügt.

Erstellen Sie thematische Mathe-Arbeitsblätter passend zum Lehrplan. Zoo-Einheit bekommt Tier-Additions-Aufgaben. Herbst-Thema verwendet Blätter und Kürbisse. Ostern integriert Hasen und Eier. Thematische Kohärenz verstärkt Lernen über Fächer hinweg.

Hochwertige Bilder machen Vorschul-Arbeitsblätter attraktiv. Klare, farbenfrohe Darstellungen motivieren junge Lernende. Schüler freuen sich auf Mathe mit bunten Bildern. Visuelle Anziehungskraft steigert Engagement und Lernbereitschaft für Rechnen lernen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle Qualität - 300 DPI Druckauflösung für alle Arbeitsblätter',
        description: `Alle heruntergeladenen Arbeitsblätter exportieren in 300 DPI Auflösung für Mathe-Arbeitsblätter. Professioneller Druckstandard garantiert scharfe Bilder. Text bleibt klar bei jeder Größe. Farben drucken lebendig auf Standard-Schuldruckern.

PDF-Exporte bewahren Qualität über Geräte und Plattformen hinweg für Arbeitsblätter Grundschule. Senden Sie Arbeitsblätter per E-Mail ohne Qualitätsverlust. Laden Sie zu Lernmanagementsystemen ohne Komprimierung hoch. Drucken Sie auf verschiedenen Druckern mit konsistenten Ergebnissen.

Professionelle Qualität baut Lehrkraft-Glaubwürdigkeit auf für kostenlose Arbeitsblätter. Eltern respektieren polierte, professionell aussehende Materialien. Administratoren bemerken Qualitätsmaterialien während Beobachtungen. Ihre Mathe-Arbeitsblätter repräsentieren Ihren professionellen Standard.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Additions-Arbeitsblätter erstellen in 5 Schritten - Kostenlose Mathe-Arbeitsblätter',
    sectionDescription: 'Erstellen Sie professionelle Arbeitsblätter Grundschule in unter 3 Minuten. Folgen Sie diesen 5 einfachen Schritten. Kein Design-Wissen erforderlich. Perfekt für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter.',
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
        title: 'Bilder wählen - Thematische Mathe-Arbeitsblätter erstellen',
        description: `Wählen Sie ein Thema aus der Dropdown-Liste oder durchsuchen Sie die Bildkategorien für Arbeitsblätter Grundschule. Über 50 Themen verfügbar: Tiere, Fahrzeuge, Essen, Natur und mehr. Der Generator wählt automatisch passende Bilder für Ihre Additions-Aufgaben.

Alternativ wählen Sie einzelne Bilder manuell aus der Bibliothek für Mathe-Arbeitsblätter. Nutzen Sie die Suchfunktion für spezifische Motive. Kombinieren Sie verschiedene Kategorien für abwechslungsreiche Vorschul-Arbeitsblätter. Ihre Auswahl bestimmt das visuelle Thema des Arbeitsblatts.

Laden Sie eigene Bilder hoch für personalisierte kostenlose Arbeitsblätter. Klassenfotos, Projektbilder oder thematische Grafiken. Die Multi-Upload-Funktion spart Zeit. Kombinieren Sie hochgeladene Bilder mit Bibliotheksbildern für maximale Flexibilität.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Übungsmodus wählen - Differenzierte Additions-Arbeitsblätter',
        description: `Wählen Sie einen der fünf Übungsmodi für Ihre Arbeitsblätter Grundschule. Bild-plus-Bild für Anfänger: beide Operanden als Bildgruppen. Bild-plus-Zahl für den Übergang: ein Operand als Bild, einer als Zahl. Zahl-plus-Bild: umgekehrte Reihenfolge für Variation.

Addend-Finden für fortgeschrittene Lernende für Mathe-Arbeitsblätter. Schüler sehen die Summe und einen Operanden, müssen den fehlenden finden. Diese Umkehraufgaben entwickeln tieferes Zahlenverständnis. Gemischter Modus kombiniert alle Typen für maximale Übungsvielfalt.

Jeder Modus unterstützt unterschiedliche Lernphasen für Rechnen lernen. Beginnen Sie mit konkreten Bild-plus-Bild-Aufgaben. Steigern Sie progressiv zu abstrakteren Modi. Der Übungsmodus bestimmt, wie Additions-Aufgaben präsentiert werden.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schwierigkeit einstellen - Vorschule bis Grundschule anpassen',
        description: `Stellen Sie Minimum- und Maximum-Werte für Operanden ein für Vorschul-Arbeitsblätter. Kleine Zahlen (1-3) für Vorschulkinder und Anfänger. Mittlere Bereiche (1-10) für 1. Klasse. Größere Zahlen (1-20) für fortgeschrittene Arbeitsblätter Grundschule.

Die Summen-Obergrenze verhindert zu schwere Aufgaben für Mathe-Arbeitsblätter. Stellen Sie die maximale Summe auf 5, 10 oder höher ein. Der Generator erstellt nur Aufgaben, die diese Grenze respektieren. Perfekte Kontrolle über die Schwierigkeit.

Wählen Sie die Anzahl der Aufgaben pro Arbeitsblatt für kostenlose Arbeitsblätter. Weniger Aufgaben für kurze Übungen oder Anfänger. Mehr Aufgaben für Hausaufgaben oder Tests. Das Layout passt sich automatisch an Ihre Wahl an.`,
        icon: '🔢',
      },
      {
        id: '4',
        number: 4,
        title: 'Generieren und Vorschau - Sofortiges Ergebnis für Arbeitsblätter Grundschule',
        description: `Klicken Sie auf "Erstellen" und Ihr Additions-Arbeitsblatt erscheint sofort auf der Arbeitsfläche für Mathe-Arbeitsblätter. Die Aufgaben werden automatisch mit Ihren gewählten Bildern und Einstellungen generiert. Das Lösungsblatt wird gleichzeitig erstellt.

Nutzen Sie die Arbeitsflächen-Bearbeitung für Anpassungen an Vorschul-Arbeitsblättern. Verschieben Sie Elemente per Drag & Drop. Ändern Sie Größen durch Ziehen der Ecken. Drehen Sie Bilder nach Belieben. Fügen Sie eigene Texte oder Überschriften hinzu.

Wechseln Sie zwischen Arbeitsblatt und Lösungsblatt mit einem Klick für kostenlose Arbeitsblätter. Überprüfen Sie, ob alle Aufgaben Ihren Anforderungen entsprechen. Generieren Sie erneut für neue Aufgaben-Kombinationen. Jede Generation ist einzigartig.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und Drucken - Professionelle Mathe-Arbeitsblätter',
        description: `Klicken Sie auf "Herunterladen" für Ihre fertigen Arbeitsblätter Grundschule. Wählen Sie zwischen PDF und JPEG Format. Beide exportieren in professioneller 300 DPI Auflösung. Aktivieren Sie die Graustufen-Option für Tintenersparnis bei farbigen Bildern.

Laden Sie sowohl das Arbeitsblatt als auch das Lösungsblatt herunter für Mathe-Arbeitsblätter. Beide Dateien sind druckbereit ohne weitere Bearbeitung. Perfekt formatiert für A4 oder Letter Papier. Drucken Sie beliebig viele Kopien für Ihre Klasse.

Mit dem Basis-Paket für 144 € jährlich erhalten Sie wasserzeichenfreie Downloads für Rechnen lernen. Die kostenlose Version enthält ein kleines Wasserzeichen. Kommerzielle Lizenz inklusive für den Verkauf Ihrer Arbeitsblätter auf Teachers Pay Teachers oder Etsy.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Mathe-Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Additions-Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in Vorschule und Kindergarten',
        subtitle: 'Vorschul-Arbeitsblätter und Rechnen lernen',
        description: `Vorschulerzieher benötigen sanfte Einführung in Mathe-Konzepte für Vorschul-Arbeitsblätter. Unser Additions-Generator schafft altersgerechte Materialien mit Bildern. Kinder zählen Tierbilder statt abstrakter Zahlen. Summen bleiben klein (1-5) für frühe Erfolge beim Rechnen lernen.

Erstellen Sie Vorschul-Arbeitsblätter passend zu Wochen- oder Monatsthemen für Mathe-Arbeitsblätter. Zoo-Woche bekommt Tier-Additions-Aufgaben. Herbst-Monat verwendet Blätter und Kürbisse. Visuelle Konsistenz verstärkt Lernen über Aktivitäten hinweg.

Kombinieren Sie Additions-Übungen mit Ausmalbildern für umfassende Vorschul-Aktivitäten. Nach Abschluss der Mathe-Aufgaben malen Kinder die Bilder aus. Schwungübungen können als Aufwärmaktivität vor Mathe dienen. Das Basis-Paket bietet alle Generatoren für ganzheitliche Vorschulbildung.`,
        quote: 'Meine Vorschulkinder lieben die bunten Tier-Additions-Arbeitsblätter!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse',
        subtitle: 'Mathe-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Grundschullehrkräfte benötigen differenzierte Additions-Materialien für Arbeitsblätter Grundschule. Der Generator ermöglicht schnelle Anpassung an verschiedene Leistungsniveaus für Mathe-Arbeitsblätter. Erstellen Sie einfache Aufgaben für kämpfende Schüler. Schwierigere Aufgaben fordern Begabte. Alle arbeiten am gleichen Thema.

Nutzen Sie verschiedene Übungsmodi für progressives Lernen beim Rechnen lernen 1. Klasse. Beginnen Sie das Schuljahr mit Bild-plus-Bild. Steigern Sie zu Bild-plus-Zahl. Beenden Sie mit Addend-Finden. Die fünf Modi unterstützen natürlichen Lernfortschritt für Mathe-Arbeitsblätter.

Erstellen Sie wöchentliche Übungsblätter in Minuten statt Stunden für kostenlose Arbeitsblätter. Montags-Diagnose, mittwochs Übung, freitags Assessment. Verschiedene Themen halten Schüler engagiert. Das Basis-Paket spart durchschnittlich 10-15 Stunden wöchentlich an Vorbereitungszeit.`,
        quote: 'Die fünf Übungsmodi machen Differenzierung so einfach.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschooling-Eltern',
        subtitle: 'Kostenlose Arbeitsblätter für individuelles Lernen',
        description: `Homeschooling-Eltern schätzen kostenlose Additions-Arbeitsblätter für Mathe-Unterricht. Keine Abonnement-Kosten für Basis-Nutzung bei Vorschul-Arbeitsblättern. Erstellen Sie unbegrenzt viele Übungsblätter. Passen Sie Schwierigkeit an Ihr Kind an. Visuelle Addition macht Mathe zugänglich.

Mehrere Kinder unterschiedlichen Alters benötigen verschiedene Niveaus für Arbeitsblätter Grundschule. Der Generator erstellt angepasste Mathe-Arbeitsblätter für jedes Kind. Gleiche Themen, unterschiedliche Schwierigkeiten. Geschwister arbeiten am selben Tisch an ihrem Niveau.

Kombinieren Sie Additions-Übungen mit anderen Homeschool-Aktivitäten für Rechnen lernen. Thematische Kohärenz über Fächer verstärkt Lernen. Zoo-Tag kombiniert Tier-Mathe mit Tier-Sachkunde. Das Basis-Paket bietet zusätzlich Ausmalbilder, Schwungübungen und Buchstaben lernen.`,
        quote: 'Ein Werkzeug deckt alle Mathematik-Niveaus meiner drei Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ und Fremdsprachenlehrkräfte',
        subtitle: 'Mehrsprachige Mathe-Arbeitsblätter',
        description: `DaZ-Lehrkräfte nutzen Additions-Arbeitsblätter für Sprachintegration bei Mathe-Arbeitsblättern. Die 11-Sprachen-Funktion zeigt Bildnamen in der Zielsprache. Schüler lernen Zahlwörter und Objektnamen gleichzeitig. Mathe wird Sprachübung für Vorschul-Arbeitsblätter.

Erstellen Sie dieselben Arbeitsblätter in Muttersprache und Deutsch für Arbeitsblätter Grundschule. Schüler sehen vertraute Konzepte in neuer Sprache. Visuelles Lernen überbrückt Sprachbarrieren. Addition funktioniert gleich in jeder Sprache.

Bildbasierte Mathe-Arbeitsblätter ermöglichen Teilnahme vor Sprachbeherrschung für Rechnen lernen. Schüler verstehen Aufgaben durch Bilder. Zählen funktioniert ohne Lesekompetenz. Frühe Erfolgserlebnisse bauen Selbstvertrauen auf. Das Basis-Paket unterstützt mehrsprachige Klassenzimmer.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Sonderpädagogen',
        subtitle: 'Angepasste Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Sonderpädagogen benötigen individualisierbare Materialien für diverse Lernende bei Vorschul-Arbeitsblättern. Unser Generator ermöglicht präzise Anpassung an Schülerbedürfnisse für Mathe-Arbeitsblätter. Sehr kleine Zahlen (1-3) für Anfänger. Wenige Aufgaben pro Seite für Fokus. Große, klare Bilder für visuelle Lernende.

Verschiedene Übungsmodi sprechen unterschiedliche Lernstile an für Arbeitsblätter Grundschule. Bild-plus-Bild für konkrete Denker. Gemischter Modus für Abwechslung. Die Flexibilität des Generators unterstützt IEP-Ziele. Dokumentieren Sie Fortschritt mit angepassten Mathe-Arbeitsblättern.

Visuelle Addition reduziert Mathe-Angst bei sensiblen Schülern für Rechnen lernen. Bilder machen Aufgaben weniger einschüchternd als reine Zahlen. Frühe Erfolge bauen Selbstvertrauen auf. Kostenlose Arbeitsblätter mit anpassbarer Schwierigkeit unterstützen jedes Lerntempo.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden IEP erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrkräfte-Unternehmer',
        subtitle: 'Verkaufen Sie Mathe-Arbeitsblätter',
        description: `Viele Lehrkräfte verdienen Nebeneinkommen durch den Verkauf von Unterrichtsmaterialien bei Mathe-Arbeitsblättern. Das Basis-Paket für 144 € jährlich beinhaltet vollständige kommerzielle Lizenz. Verkaufen Sie Ihre Additions-Arbeitsblätter auf Teachers Pay Teachers, Etsy oder Amazon KDP ohne Einschränkungen für Arbeitsblätter Grundschule.

Erstellen Sie thematische Additions-Pakete für verschiedene Jahreszeiten und Anlässe für kostenlose Arbeitsblätter. 20 Herbst-Additions-Arbeitsblätter. 30 Zoo-Tier-Mathe-Übungen. Käufer schätzen umfangreiche, thematisch kohärente Ressourcen. Die 300 DPI Qualität rechtfertigt Premium-Preise.

Viele Lehrkräfte verdienen 500-5000 € monatlich mit druckbaren Ressourcen für Rechnen lernen. Das Abonnement zahlt sich nach wenigen Verkäufen selbst. Keine Per-Download-Gebühren oder Lizenzgebühren. Behalten Sie 100% Ihrer Einnahmen nach Plattformgebühren.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from addition.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Mathe-Arbeitsblättern und kostenlosen Arbeitsblättern Grundschule',
    sectionDescription: 'Lehrkräfte und Eltern haben viele Fragen zum Additions-Generator und Basis-Paket Abonnement. Hier beantworten wir die häufigsten Fragen zu Arbeitsblätter Grundschule, Vorschul-Arbeitsblättern und kommerzieller Lizenzierung.',
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
        question: 'Ist der Additions-Generator wirklich kostenlos für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter?',
        answer: 'Der Generator ist kostenlos mit Wasserzeichen für persönliche, nicht-kommerzielle Nutzung. Erstellen Sie unbegrenzt Vorschul-Arbeitsblätter und Mathe-Aktivitäten für Ihr eigenes Klassenzimmer oder Homeschool. Kostenlose Arbeitsblätter enthalten ein kleines Wasserzeichen in der Ecke. Ideal für Lehrkräfte, die Materialien für ihre eigenen Schüler benötigen. Das Basis-Paket Abonnement kostet 144 Euro jährlich oder 15 Euro monatlich. Abonnenten erhalten wasserzeichenfreie Arbeitsblätter Grundschule in professioneller Qualität. Zugang zu 10 Premium-Generatoren inklusive. Kommerzielle Lizenzierung für den Verkauf Ihrer Arbeitsblätter enthalten.',
      },
      {
        id: '2',
        question: 'Kann ich Additions-Arbeitsblätter auf normalem Drucker drucken für kostenlose Arbeitsblätter Grundschule?',
        answer: 'Ja, alle Arbeitsblätter Grundschule drucken perfekt auf Standard-Schuldruckern. Die 300 DPI Auflösung garantiert scharfe Bilder auf jedem Drucker. Farbdrucker produzieren lebendige, ansprechende Mathe-Arbeitsblätter. Schwarz-Weiß-Drucker funktionieren ebenso gut mit der Graustufen-Option. Aktivieren Sie den Graustufen-Modus vor dem Herunterladen für Tintenersparnis. Konvertiert alle Farben in Schwarz-Weiß, während Bildklarheit erhalten bleibt. Perfekt für Schulen mit Budgetbeschränkungen oder großen Klassensätzen. Standard A4 und Letter Größen passen auf normale Drucker.',
      },
      {
        id: '3',
        question: 'Benötige ich Design-Kenntnisse für Mathe-Arbeitsblätter und Arbeitsblätter Grundschule Erstellung?',
        answer: 'Nein, absolut keine Design-Erfahrung erforderlich. Der Generator ist speziell für Lehrkräfte ohne Designhintergrund entwickelt. Wählen Sie Optionen aus Dropdown-Menüs. Klicken Sie Buttons. Sehen Sie sofortige Vorschau. Alles ist visuell und intuitiv. Erstellen Sie professionelle Vorschul-Arbeitsblätter in drei einfachen Schritten. Wählen Sie Bilder. Passen Sie Einstellungen an. Generieren und laden Sie herunter. Kein Photoshop benötigt. Keine Grafiksoftware zu erlernen. Der Generator handhabt alle technischen Aspekte automatisch.',
      },
      {
        id: '4',
        question: 'Kann ich Additions-Arbeitsblätter in meinem Klassenzimmer verwenden für Rechnen lernen 1. Klasse?',
        answer: 'Ja, alle Abonnements beinhalten unbegrenzte Klassennutzung. Drucken Sie so viele Kopien wie Sie für Ihre Schüler benötigen. Verwenden Sie Mathe-Arbeitsblätter für tägliche Übung, Mathe-Zentren oder Hausaufgaben. Keine Mengenbeschränkung für Arbeitsblätter Grundschule. Ihre Abonnementgebühr deckt alle Klassenzimmer-Nutzung. Teilen Sie digitale Kopien mit Schülern über Lernmanagementsysteme. Laden Sie PDFs zu Google Classroom oder Seesaw hoch. Senden Sie Arbeitsblätter für Rechnen lernen per E-Mail an Eltern für Heimübung.',
      },
      {
        id: '5',
        question: 'Welche Sprachen sind verfügbar für kostenlose Arbeitsblätter und Deutsch-Arbeitsblätter Erstellung?',
        answer: 'Der Generator unterstützt 11 Sprachen für Arbeitsblattinhalte. Deutsch, Englisch, Spanisch, Französisch, Italienisch, Portugiesisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Bildnamen erscheinen automatisch in der gewählten Sprache. Perfekt für Deutsch-Arbeitsblätter und mehrsprachige Klassenzimmer. Die Oberflächensprache ändert sich unabhängig vom Arbeitsblattinhalt. Lehren Sie auf Deutsch, erstellen Sie aber Arbeitsblätter Grundschule auf Englisch für bilinguale Schüler. Mehrsprachige Unterstützung ist ideal für DaZ-Unterricht.',
      },
      {
        id: '6',
        question: 'Kann ich selbst erstellte Arbeitsblätter verkaufen auf Teachers Pay Teachers mit Mathe-Arbeitsblättern?',
        answer: 'Ja, Ihr Basis-Paket Abonnement beinhaltet vollständige kommerzielle Print-on-Demand-Lizenzierung. Verkaufen Sie Arbeitsblätter Grundschule auf Teachers Pay Teachers, Etsy oder Amazon KDP. Keine Namensnennung erforderlich. Keine Lizenzgebühren. Keine zusätzlichen Gebühren. Behalten Sie 100% der Einnahmen nach Plattformgebühren. Erstellen Sie Mathe-Arbeitsblätter-Bundles für kommerzielle Verkäufe. Viele Lehrkräfte verdienen 500-5000 Euro monatlich mit dem Verkauf druckbarer Ressourcen.',
      },
      {
        id: '7',
        question: 'Wie passe ich Additions-Arbeitsblätter an meine Schüler an für Vorschul-Arbeitsblätter und Rechnen lernen?',
        answer: 'Passen Sie Schwierigkeit mit Min/Max-Operanden-Einstellungen an. Kleine Zahlen (1-3) für Vorschul-Arbeitsblätter. Größere Bereiche (1-10) für Arbeitsblätter Grundschule 1. Klasse. Jedes Arbeitsblatt generiert sich innerhalb Ihrer angegebenen Parameter. Wählen Sie Übungsmodi basierend auf Schülerbereitschaft. Bild-plus-Bild für beginnende Addition. Bild-plus-Zahl für Übergang zu Symbolen. Addend-Finden für fortgeschrittene Lernende. Personalisieren Sie Mathe-Arbeitsblätter mit eigenen Bildern.',
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Additions-Arbeitsblätter mit Mathe-Arbeitsblättern und Ausmalbilder?',
        answer: 'Additions-Arbeitsblätter funktionieren von Vorschule bis 3. Klasse. Vorschulkinder (5-6 Jahre) nutzen einfache Aufgaben mit Summen bis 5. Erstklässler (6-7 Jahre) bewältigen Summen bis 10 oder 20. Zweit- und Drittklässler (7-9 Jahre) üben zweistellige Addition. Passen Sie Schwierigkeit an jede Altersgruppe an. Kombinieren Sie Mathe-Arbeitsblätter mit altersgerechten Aktivitäten. Junge Lernende bekommen Ausmalbilder nach Mathe-Übung.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder hochladen für Arbeitsblätter Grundschule und kostenlose Arbeitsblätter Erstellung?',
        answer: 'Ja, laden Sie unbegrenzt eigene Bilder hoch für personalisierte Mathe-Arbeitsblätter. Akzeptieren Sie alle gängigen Formate (JPEG, PNG, GIF). Multi-Upload-Funktion lädt mehrere Dateien gleichzeitig. Kombinieren Sie hochgeladene Bilder mit Bibliotheksbildern. Ihre Bilder bleiben für zukünftige Arbeitsblätter Grundschule verfügbar. Verwenden Sie Klassenfotos für ultra-personalisierte Vorschul-Arbeitsblätter. Laden Sie Schülerzeichnungen hoch für motivierende Materialien.',
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Mathe-Arbeitsblättern für Rechnen lernen und Vorschul-Arbeitsblätter?',
        answer: 'Professionelle Arbeitsblätter Grundschule generieren in unter 3 Minuten. Wählen Sie Bilder (30 Sekunden). Passen Sie Einstellungen an (30 Sekunden). Klicken Sie Generieren (10 Sekunden). Laden Sie herunter (30 Sekunden). Lösungsblätter erstellen sich automatisch gleichzeitig. Traditionelle Mathe-Arbeitsblätter-Erstellung dauert 30-60 Minuten pro Arbeitsblatt. Der Generator reduziert Zeit um 90%. Erstellen Sie wöchentliche kostenlose Arbeitsblätter in 15 Minuten statt 5-6 Stunden.',
      },
      {
        id: '11',
        question: 'Enthalten Additions-Arbeitsblätter Lösungsblätter für schnelle Korrektur?',
        answer: 'Ja, jedes generierte Arbeitsblatt erstellt automatisch ein Lösungsblatt. Die Antworten erscheinen klar in den Lösungsfeldern. Wechseln Sie zwischen Arbeitsblatt und Lösung mit einem Klick. Beide laden als separate Dateien herunter. Lehrkräfte sparen enorme Korrekturzeit. Keine manuelle Berechnung jeder Aufgabe mehr nötig. Schnelle visuelle Überprüfung mit dem Lösungsblatt. Selbstkorrektur wird möglich für selbstständiges Lernen.',
      },
      {
        id: '12',
        question: 'Welche Dateiformate sind für den Download verfügbar?',
        answer: 'Exportieren Sie Ihre Mathe-Arbeitsblätter als PDF oder JPEG. Beide Formate sind in 300 DPI Qualität für professionellen Druck. PDF eignet sich ideal für direkte Weitergabe und Druck. JPEG ist perfekt für digitale Plattformen und Präsentationen. Die Graustufen-Option spart Druckertinte bei farbigen Bildern. Alle Downloads sind sofort druckbereit ohne weitere Bearbeitung.',
      },
    ],
  },

  // Pricing - Addition is FREE but needs subscription for no-watermark/commercial
  pricing: {
    title: 'Voller Zugang',
    price: '144€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Arbeitsblatterstellung',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
      'Lösungsblätter inklusive',
    ],
    ctaText: 'Jetzt Erstellen',
    guaranteeText: '30 Tage Geld-zurück-Garantie',
  },

  // Related Apps - Kombinieren Sie Additions-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Additions-Arbeitsblätter mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Premium-Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Additions-Arbeitsblätter mit Ausmalbilder für kreative Pausen. Integrieren Sie Schwungübungen für Schreibvorbereitung. Verbinden Sie mit Einmaleins-Übungen für ältere Schüler.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Mathe-Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
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
        slug: 'subtraction',
        name: 'Subtraktion',
        category: 'Mathematik',
        icon: '➖',
        description: 'Ergänzen Sie Additions-Arbeitsblätter mit Subtraktions-Übungen für umfassenden frühen Mathe-Unterricht.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Kombinieren Sie Rechnen lernen mit kreativer Auszeit durch passende Ausmalbilder als Belohnung.',
      },
      {
        id: '3',
        slug: 'writing-app',
        name: 'Schwungübungen',
        category: 'Schreibvorbereitung',
        icon: '✏️',
        description: 'Integrieren Sie Schwungübungen mit Additions-Arbeitsblättern für umfassende motorische Entwicklung.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Verbinden Sie Rechnen lernen mit Buchstaben lernen für integrierte frühkindliche Bildung.',
      },
      {
        id: '5',
        slug: 'chart-count-color',
        name: 'Diagramm-Zählen',
        category: 'Mathematik',
        icon: '📊',
        description: 'Erweitern Sie Additions-Fähigkeiten mit Diagramm-Lesen und Zählaktivitäten.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Suchen und Zählen',
        category: 'Mathematik',
        icon: '🔍',
        description: 'Verstärken Sie Zählfähigkeiten mit Suchbildern als Vorbereitung für Addition.',
      },
    ],
  },
};

export default additionDeContent;
