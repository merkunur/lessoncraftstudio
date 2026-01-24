import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/matching-worksheets.ts
 * URL: /de/apps/zuordnungs-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/matching.md
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

export const matchingDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'zuordnungs-arbeitsblaetter',
    appId: 'matching',
    title: 'Zuordnungs-Arbeitsblätter | Kostenlose Arbeitsblätter Grundschule',
    description: 'Erstellen Sie Zuordnungs-Arbeitsblätter in 3 Minuten. Kostenlose Arbeitsblätter Grundschule, Vorschule und Buchstaben lernen. 3000+ Bilder, 11 Sprachen.',
    keywords: 'zuordnungs arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/matching/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Zuordnungs-Arbeitsblätter kostenlos - Bild-zu-Buchstabe-Zuordnung für Arbeitsblätter Grundschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/matching/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Arbeitsblätter für Kinder - Zuordnungsübungen für Vorschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/matching/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblatt für Kinder - Bild-Wort-Zuordnung für Deutsch-Arbeitsblätter'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/matching/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Druckvorlagen Zuordnung - Mathe-Arbeitsblätter mit visueller Zuordnung für Rechnen lernen'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/matching/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblatt für Vorschule - Zuordnungsarbeitsblatt mit Bildern für kostenlose Arbeitsblätter Grundschule'
      }
    ],
  },

  // Hero Section - FULL text from matching.md paragraphs 1-4
  hero: {
    title: 'Zuordnungs-Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Zuordnungsübungen für Vorschule und Buchstaben lernen',
    description: `Erstellen Sie professionelle Zuordnungsübungen mit unserem Zuordnungs-Generator. Mit Ihrem Basis-Paket Abonnement können Sie unbegrenzt Arbeitsblätter erstellen ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Arbeitsblätter zum Ausdrucken, perfekt für Vorschule und Grundschule. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter. Sparen Sie jede Woche Stunden an Vorbereitungszeit.

Unser Zuordnungsübungen-Generator hilft Lehrkräften beim Erstellen von Arbeitsblättern, bei denen Schüler Linien ziehen, um passende Paare zu verbinden. Wählen Sie aus vier verschiedenen Zuordnungsmodi, einschließlich Bild-zu-Buchstabe für Arbeitsblätter zum Buchstaben lernen. Nutzen Sie Bild-zu-Wort-Zuordnung für Deutsch-Arbeitsblätter und Leseübungen. Verwenden Sie eigene Vokabeln für Mathe-Arbeitsblätter und Sachunterricht. Perfekt für die Entwicklung von Lese- und Schreibfähigkeiten in der Grundschule.

Der Zuordnungs-Generator bietet flexible Inhaltserstellung für jedes Fach. Erstellen Sie Mathe-Arbeitsblätter mit visueller Zuordnung für Zahlenerkennung und Rechnen lernen. Generieren Sie Arbeitsblätter, bei denen Schüler Aufgaben den Lösungen zuordnen. Gestalten Sie Arbeitsblätter zum Buchstaben lernen für die Vorschule. Kombinieren Sie Schwungübungen mit Zuordnungsaktivitäten für die Entwicklung der Feinmotorik. Alle Inhalte nutzen unsere Bibliothek mit über 3000 kindgerechten Bildern.`,
    previewImageSrc: '/samples/german/matching/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Kostenlose Arbeitsblätter und Kostenlose Druckvorlagen',
    sectionDescription: 'Laden Sie kostenlose Druckvorlagen herunter - Kostenloses Arbeitsblatt für Kinder in professioneller Qualität für Arbeitsblatt für Vorschule',
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
        worksheetSrc: '/samples/german/matching/sample-1.jpeg',
        answerKeySrc: '/samples/german/matching/sample-1-answer.jpeg',
        altText: 'Zuordnungs-Arbeitsblätter kostenlos zum Ausdrucken - Hochformat Bild-zu-Buchstabe-Zuordnung für Arbeitsblätter Grundschule und Vorschule',
        pdfDownloadUrl: '/samples/german/matching/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/german/matching/sample-2.jpeg',
        answerKeySrc: '/samples/german/matching/sample-2-answer.jpeg',
        altText: 'Kostenlose Arbeitsblätter für Kinder - Zuordnungsübungen mit bunten Bildern für Vorschul-Arbeitsblätter',
        pdfDownloadUrl: '/samples/german/matching/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/german/matching/sample-3.jpeg',
        answerKeySrc: '/samples/german/matching/sample-3-answer.jpeg',
        altText: 'Arbeitsblatt für Kinder - Bild-Wort-Zuordnung für Deutsch-Arbeitsblätter und Buchstaben lernen',
        pdfDownloadUrl: '/samples/german/matching/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/german/matching/sample-4.jpeg',
        answerKeySrc: '/samples/german/matching/sample-4-answer.jpeg',
        altText: 'Kostenlose Druckvorlagen Zuordnung - Mathe-Arbeitsblätter mit visueller Zuordnung für Rechnen lernen',
        pdfDownloadUrl: '/samples/german/matching/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/german/matching/sample-5.jpeg',
        answerKeySrc: '/samples/german/matching/sample-5-answer.jpeg',
        altText: 'Arbeitsblatt für Vorschule - Zuordnungsarbeitsblatt mit Bildern für kostenlose Arbeitsblätter Grundschule',
        pdfDownloadUrl: '/samples/german/matching/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Zuordnungsarbeitsblätter-Generator enthält professionelle Funktionen speziell für Lehrkräfte entwickelt, die Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter erstellen. Jede Funktion hilft Ihnen beim schnelleren Erstellen kostenloser Arbeitsblätter als mit traditionellen Methoden. Erstellen Sie Arbeitsblätter zum Buchstaben lernen, Deutsch-Arbeitsblätter, Mathe-Arbeitsblätter und mehr mit demselben benutzerfreundlichen Werkzeug. Greifen Sie auf alle Premium-Funktionen mit Ihrem Basis-Paket Abonnement zu. Keine Gebühren pro Arbeitsblatt, keine Bildkosten, keine Vorlagengebühren. Generieren Sie unbegrenzt Zuordnungsübungen für alle Ihre Unterrichtsbedürfnisse in der Grundschule.',
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
        title: 'Erstellen Sie Arbeitsblätter Grundschule in 3 Klicks - Kostenlose Arbeitsblätter für jedes Fach',
        description: `Generieren Sie vollständige Zuordnungsarbeitsblätter in unter drei Minuten vom Start bis zum Download. Wählen Sie Ihren Zuordnungsmodus aus vier Optionen. Wählen Sie Ihre Bilder aus unserer 3000+ Bibliothek oder laden Sie eigene hoch. Klicken Sie auf Generieren und Ihr Arbeitsblatt erscheint sofort auf der Arbeitsfläche. Keine Designkenntnisse erforderlich für professionelle Arbeitsblätter Grundschule.

Unsere Ein-Klick-Generierung funktioniert für alle Arbeitsblatttypen. Erstellen Sie Arbeitsblätter zum Buchstaben lernen, bei denen Schüler Bilder den Anfangsbuchstaben zuordnen. Gestalten Sie Deutsch-Arbeitsblätter für Phonetik und Lautverbindungen. Entwickeln Sie Mathe-Arbeitsblätter zur Zahlenzuordnung mit visuellen Darstellungen. Generieren Sie Vokabelarbeitsblätter, die Wörter mit Bildern verbinden. Alle Zuordnungsarbeitsblatt-Typen verwenden denselben einfachen Drei-Klick-Prozess.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bearbeiten Sie alles auf Ihren Vorschul-Arbeitsblättern - Vollständige Anpassung für Mathe-Arbeitsblätter',
        description: `Jedes Element auf Ihrem Zuordnungsarbeitsblatt ist vollständig editierbar auf der Arbeitsfläche. Klicken Sie auf ein beliebiges Bild zum Verschieben, Skalieren oder Drehen. Ziehen Sie Textelemente überall auf die Seite. Löschen Sie Elemente, die Sie nicht benötigen. Fügen Sie benutzerdefinierte Textanweisungen für Schüler hinzu. Ändern Sie Farben passend zu Ihrem Klassenraum-Thema. Fügen Sie Ihr Schullogo oder Klassenmaskottchen ein.

Die vollständige Bearbeitung funktioniert für alle kostenlosen Arbeitsblätter. Passen Sie Vorschul-Arbeitsblätter mit größeren Bildern für jüngere Schüler an. Modifizieren Sie Mathe-Arbeitsblätter zur Betonung bestimmter Konzepte. Personalisieren Sie Arbeitsblätter mit vertrauten Objekten aus Ihrem Klassenzimmer. Machen Sie jedes Arbeitsblatt einzigartig für Ihre Schüler.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Laden Sie eigene Bilder hoch für Deutsch-Arbeitsblätter und Arbeitsblätter zum Buchstaben lernen',
        description: `Laden Sie Ihre eigenen Bilder hoch, um personalisierte Zuordnungsarbeitsblätter für Ihre spezifischen Schüler zu erstellen. Multi-Datei-Upload akzeptiert JPEG, PNG und GIF Formate. Fügen Sie Fotos von Klassenzimmerobjekten für vertraute Deutsch-Arbeitsblätter hinzu. Integrieren Sie Bilder von Schülerkunstwerken für mehr Engagement. Laden Sie Bilder von Lernmaterialien für praktische Verbindungen zu Mathe-Arbeitsblättern hoch.

Der benutzerdefinierte Bild-Upload funktioniert nahtlos mit Bibliotheksbildern. Kombinieren Sie Ihre Fotos mit unserer 3000+ Bildersammlung. Erstellen Sie Arbeitsblätter zum Buchstaben lernen, die Schülernamenfotos mit Buchstabenbildern mischen. Gestalten Sie Deutsch-Arbeitsblätter mit Klassenzimmergegenständen, die Schüler erkennen.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprachen für Vorschul-Arbeitsblätter - Mehrsprachiger Unterricht mit kostenlosen Arbeitsblättern',
        description: `Generieren Sie Zuordnungsarbeitsblätter in 11 verschiedenen Sprachen für mehrsprachige Klassenzimmer. Vollständige Oberflächenübersetzung und Inhaltslokalisierung enthalten. Erstellen Sie Vorschul-Arbeitsblätter auf Deutsch, Englisch, Französisch, Spanisch oder Italienisch. Gestalten Sie Arbeitsblätter Grundschule auf Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch oder Finnisch.

Die Sprachunterstützung geht über einfache Übersetzung hinaus. Bildbeschriftungen wechseln automatisch zur gewählten Sprache. Anfangsbuchstaben-Zuordnungsarbeitsblätter zeigen korrekte Buchstaben für jedes Sprachalphabet. Deutsch-Arbeitsblätter spiegeln sprachspezifische Lautmuster wider. Alle Arbeitsblätter zum Buchstaben lernen passen sich an Sprachanforderungen an.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz enthalten - Verkaufen Sie Ihre Arbeitsblätter Grundschule auf Eduki',
        description: `Ihr Basis-Paket Abonnement beinhaltet Print-on-Demand-Lizenzierung für kommerzielle Nutzung ohne Aufpreis. Verkaufen Sie Zuordnungsarbeitsblätter, die Sie erstellen, auf Eduki, Teachers Pay Teachers, Etsy oder Amazon KDP. Keine zusätzlichen Lizenzgebühren über Ihr 144€ jährliches Abonnement hinaus. Erstellen Sie unbegrenzt Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter für den kommerziellen Verkauf.

Die kommerzielle Lizenzierung deckt alle von Ihnen generierten Arbeitsblatttypen ab. Verkaufen Sie Arbeitsblätter zum Buchstaben lernen in thematischen Bundles. Vermarkten Sie Deutsch-Arbeitsblätter als Lehrplanergänzungen. Bieten Sie Mathe-Arbeitsblätter in saisonalen Sammlungen an. Jedes Zuordnungsarbeitsblatt qualifiziert sich für die kommerzielle Nutzung.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Bilderbibliothek für Mathe-Arbeitsblätter, Schwungübungen und Ausmalbilder',
        description: `Greifen Sie mit Ihrem Basis-Paket Abonnement auf unsere vollständige 3000+ kinderfreundliche Bilderbibliothek zu. Keine Pro-Bild-Gebühren wie bei Stock-Foto-Websites. Keine Download-Limits wie bei Clipart-Abonnements. Durchsuchen Sie nach Themen organisierte Bilder einschließlich Tiere, Essen, Transport, Schule, Natur und Jahreszeiten. Suchen Sie nach Stichwort, um spezifische Bilder schnell zu finden.

Jedes Bild funktioniert perfekt für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule. Kindgerechte Illustrationen mit klaren, einfachen Designs. Helle Farben, die junge Lernende ansprechen. Erkennbare Objekte, denen Schüler täglich begegnen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität - Arbeitsblätter für Rechnen lernen und Einmaleins Übungen',
        description: `Alle Zuordnungsarbeitsblätter werden mit 300 DPI professioneller Qualität heruntergeladen. Perfekte Klarheit für Klassenzimmerdruck oder kommerziellen Verkauf. Scharfe Bilder, die beim Drucken zu Hause auf normalen Druckern scharf aussehen. Professionelles Erscheinungsbild für auf Eduki oder Teachers Pay Teachers verkaufte Arbeitsblätter.

Erstellen Sie Arbeitsblätter für Rechnen lernen mit kristallklaren Zahlen und Rechenzeichen. Entwickeln Sie Einmaleins Übungsarbeitsblätter mit perfekt lesbaren Multiplikationstabellen. Generieren Sie Mathe-Arbeitsblätter mit scharfen visuellen Darstellungen mathematischer Konzepte. Alle Arbeitsblätter Grundschule erfüllen professionelle Veröffentlichungsstandards.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Vier Zuordnungsmodi für Buchstaben lernen, Deutsch-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Wählen Sie aus vier verschiedenen Zuordnungsmodi, die Ihren Unterrichtszielen entsprechen. Der Bild-zu-Anfangsbuchstabe-Modus erstellt perfekte Arbeitsblätter zum Buchstaben lernen für die Buchstabenerkennung. Schüler ordnen Bilder dem ersten Buchstaben jedes Wortes zu. Apfel passt zu A, Ball passt zu B.

Der Bild-plus-Wort zu Bild-plus-Wort-Modus baut Gedächtnis- und Erkennungs-Vokabelarbeitsblätter auf. Der Bild-oder-Wort zu Bild-oder-Wort-Modus erstellt die flexibelsten Zuordnungsarbeitsblätter. Der Bild-zu-benutzerdefiniertem-Wort-Modus baut Vokabel-Zuordnungsarbeitsblätter für jedes Fach auf. Perfekt für Mathe-Arbeitsblätter, Deutsch-Arbeitsblätter und mehr.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '✅',
        title: 'Vollständiges Lösungsblatt-System für Arbeitsblätter Rechnen 1. Klasse und Einmaleins Übungen',
        description: `Jedes Zuordnungsarbeitsblatt beinhaltet automatische Lösungsblatt-Generierung. Klicken Sie auf die Schaltfläche "Lösungsblatt generieren" nach dem Erstellen des Arbeitsblatts. Das System generiert ein Lösungsblatt, das korrekte Paare mit bereits gezeichneten Verbindungslinien zeigt.

Lösungsblätter spiegeln Ihr Arbeitsblatt-Layout genau wider und behalten dieselben Elementpositionen bei. Lehrkräfte sehen Lösungen auf einen Blick für schnelles Bewerten. Lösungsblätter sparen Zeit während der Korrektur und Schülerkonferenzen. Perfekt für Arbeitsblätter Rechnen 1. Klasse und Einmaleins Übungen.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '🔗',
        title: 'Schwungübungen und Buchstaben lernen Integration für ganzheitliche Vorschul-Arbeitsblätter',
        description: `Kombinieren Sie Zuordnungsarbeitsblätter mit Schwungübungen für vollständige Feinmotorikentwicklung. Erstellen Sie Buchstaben-Zuordnung gefolgt von koordinierten Schwungübungen für Schreibvorbereitung. Gestalten Sie Arbeitsblätter zum Buchstaben lernen, die Buchstabenerkennung und Schreibfähigkeiten gleichzeitig aufbauen.

Integrieren Sie Ausmalbilder mit Zuordnungsaktivitäten für erweiterte Engagementperioden. Schüler vervollständigen pädagogische Zuordnung gefolgt von verwandten Ausmalbilder-Aktivitäten. Erstellen Sie umfassende Vorschul-Arbeitsblätter Pakete, die Zuordnung, Schwungübungen und Ausmalbilder kombinieren.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Das Erstellen von Zuordnungsarbeitsblättern dauert weniger als 3 Minuten vom Start bis zum Download. Folgen Sie fünf einfachen Schritten, um professionelle Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter zu generieren. Keine Designerfahrung erforderlich für die Erstellung von Arbeitsblättern zum Buchstaben lernen, Deutsch-Arbeitsblättern oder Mathe-Arbeitsblättern.',
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
        title: 'Schritt 1: Wählen Sie Inhalte für Ihre Arbeitsblätter zum Buchstaben lernen',
        description: `Wählen Sie zuerst Ihren Zuordnungsmodus, um den Arbeitsblattinhaltstyp festzulegen. Klicken Sie auf das Dropdown-Menü "Zuordnungsmodus" in der linken Seitenleiste unter Arbeitsblatt-Konfiguration. Vier Modi verfügbar für verschiedene Lernziele bei Vorschul-Arbeitsblättern und Arbeitsblättern Grundschule.

Wählen Sie den Bild-zu-Anfangsbuchstabe-Modus für Arbeitsblätter zum Buchstaben lernen und Buchstabenerkennungspraxis. Perfekt für ABC-Arbeitsblätter, die Buchstablaute lehren. Wählen Sie den Bild-plus-Wort zu Bild-plus-Wort-Modus für Deutsch-Arbeitsblätter und Vokabelverstärkung. Wählen Sie den Bild-zu-benutzerdefiniertem-Wort-Modus für Vokabel-Zuordnungsarbeitsblätter.

Wählen Sie nach der Modusauswahl Ihre Bildauswahlmethode. Klicken Sie auf "Zufälliges Thema & Bilder" für vollständig automatische Generierung von Vorschul-Arbeitsblättern. Wählen Sie "Zufällig aus gewähltem Thema" für thematische Arbeitsblätter zum Buchstaben lernen. Wählen Sie "Spezifische Bilder auswählen" für vollständige Kontrolle über kostenlose Arbeitsblätter.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Passen Sie Einstellungen an für Mathe-Arbeitsblätter und Rechnen 1. Klasse',
        description: `Legen Sie die Anzahl der Zuordnungspaare für Ihr Arbeitsblatt fest. Klicken Sie auf das Dropdown-Menü "Maximale Anzahl der Paare". Wählen Sie 4, 5 oder 6 Paare je nach Schülerfähigkeitsniveau. Vier Paare funktionieren gut für beginnende Vorschul-Arbeitsblätter. Sechs Paare fordern fortgeschrittene Arbeitsblätter Grundschule Benutzer heraus.

Wählen Sie Ihre Seitengröße und Ausrichtung. Klicken Sie auf das Dropdown-Menü "Seitengröße" oben in der Seitenleiste. Wählen Sie Letter Hochformat für vertikale Standard-Arbeitsblätter. Wählen Sie A4 Hochformat oder A4 Querformat für europäisches Standardpapier.

Konfigurieren Sie Namens- und Datumsfelder für Klassenzimmerverwaltung. Aktivieren Sie das Kontrollkästchen "Namens-/Datumsfelder einschließen", um Schülerinformationszeilen hinzuzufügen. Hilfreich beim Sammeln und Bewerten von Arbeitsblättern zum Buchstaben lernen und Deutsch-Arbeitsblättern.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Generieren Sie Ihr Arbeitsblatt - Sofortige kostenlose Arbeitsblätter',
        description: `Klicken Sie auf die Schaltfläche "Generieren" in der oberen rechten Bildschirmecke. Ein Dropdown-Menü erscheint mit zwei Optionen. Klicken Sie auf "Arbeitsblatt generieren", um Ihr Zuordnungsarbeitsblatt zu erstellen. Das System verarbeitet Ihre Einstellungen und erstellt das Arbeitsblatt in Sekunden.

Beobachten Sie, wie Ihr Zuordnungsarbeitsblatt auf der Arbeitsfläche erscheint. Bilder laden in linken und rechten Spalten. Textelemente erscheinen bei Verwendung wortbasierter Modi. Seitenrand, Hintergrund und dekorative Elemente fügen sich automatisch hinzu.

Die Arbeitsblatt-Arbeitsfläche zeigt Ihre Arbeitsblätter Grundschule genau so, wie Schüler sie sehen werden. Die Generierung dauert 10-15 Sekunden für die meisten Vorschul-Arbeitsblätter.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Bearbeiten Sie Arbeitsblätter auf der Arbeitsfläche - Passen Sie Ausmalbilder an',
        description: `Klicken Sie auf ein beliebiges Bild auf Ihrem Zuordnungsarbeitsblatt, um es auszuwählen. Ein blauer Begrenzungsrahmen mit Eckgriffen erscheint um das ausgewählte Objekt. Ziehen Sie das Bild an eine neue Position irgendwo auf der Arbeitsfläche. Ändern Sie die Bildgröße durch Ziehen der Eckgriffe. Drehen Sie das Bild durch Greifen der Drehsteuerung über dem Objekt.

Fügen Sie benutzerdefinierte Textanweisungen überall auf Ihren Vorschul-Arbeitsblättern hinzu. Klicken Sie auf "Text-Tools" in der linken Seitenleiste. Geben Sie Anweisungstext in das Eingabefeld ein. Wählen Sie Schriftart, Größe und Farbe. Klicken Sie auf "Text hinzufügen", um Text auf der Arbeitsfläche zu platzieren.

Wenden Sie Hintergründe an, um Zuordnungsarbeitsblätter ansprechender zu machen. Klicken Sie auf das Dropdown-Menü "Hintergrund-Thema" im Seiteneinrichtungsbereich. Wählen Sie aus Dutzenden themenbasierter Hintergründe.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Laden Sie druckbare Arbeitsblätter herunter - Hochwertige PDF für Einmaleins',
        description: `Generieren Sie das Lösungsblatt vor dem Herunterladen. Klicken Sie auf die Dropdown-Schaltfläche "Generieren" in der oberen rechten Ecke. Wählen Sie die Option "Lösungsblatt generieren". Das System erstellt ein passendes Lösungsblatt, das korrekte Paare mit Verbindungslinien zeigt.

Klicken Sie auf die Dropdown-Schaltfläche "Herunterladen" nach dem Generieren von Arbeitsblatt und Lösungsblatt. Vier Download-Formatoptionen erscheinen. Wählen Sie JPEG- oder PDF-Format für das Arbeitsblatt. Wählen Sie JPEG- oder PDF-Format für das Lösungsblatt. Wählen Sie das PDF-Format zum Drucken kostenloser Arbeitsblätter in höchster Qualität.

Aktivieren Sie die Graustufenoption vor dem Herunterladen, um Druckertinte zu sparen. Drucken Sie Ihre heruntergeladenen Zuordnungsarbeitsblätter auf jedem Heim- oder Schuldrucker. Alle Arbeitsblätter laden mit 300 DPI professioneller Qualität herunter.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from matching.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Zuordnungsarbeitsblätter dienen verschiedenen Bildungsbedürfnissen in verschiedenen Unterrichtsumgebungen. Erzieher in der Vorschule nutzen Zuordnungsarbeitsblätter für Buchstabenerkennung und phonetische Praxis. Grundschullehrkräfte gestalten Deutsch-Arbeitsblätter für Leseentwicklung. Homeschool-Eltern erstellen Arbeitsblätter zum Buchstaben lernen, die an das individuelle Lerntempo angepasst sind. DaZ-Lehrkräfte entwickeln Mathe-Arbeitsblätter mit visueller Vokabelunterstützung.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in Vorschule und Kindergarten',
        subtitle: 'Vorschul-Arbeitsblätter und Buchstaben lernen für frühe Bildung',
        description: `Erzieher in der Vorschule benötigen ständig Vorschul-Arbeitsblätter für tägliche Buchstabeneinführung. Erstellen Sie Zuordnungsarbeitsblätter, die Bilder mit Anfangsbuchstaben für phonetische Grundlagen verbinden. Generieren Sie Arbeitsblätter zum Buchstaben lernen für jeden Buchstaben des Alphabets im Laufe des Jahres. Gestalten Sie kostenlose Arbeitsblätter für Stationsaktivitäten und Kleingruppenunterricht.

Der Bild-zu-Anfangsbuchstabe-Modus erstellt perfekte Vorschul-Arbeitsblätter für Lernzentren. Schüler ordnen Apfel zu A, Ball zu B, Katze zu K zu. Visuelle Verbindungen helfen Vorlesern, Buchstaben-Laut-Beziehungen zu verstehen. Generieren Sie wöchentlich neue Arbeitsblätter zum Buchstaben lernen, um das Engagement der Schüler aufrechtzuerhalten.

Kombinieren Sie Vorschul-Arbeitsblätter mit Schwungübungen für vollständige Schreibvorbereitung. Erstellen Sie Buchstaben-Zuordnung gefolgt von koordinierten Schwungübungen. Integrieren Sie Ausmalbilder für erweiterte feinmotorische Praxis.`,
        quote: 'Meine Kinder lieben die bunten Zuordnungsübungen mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse',
        subtitle: 'Arbeitsblätter Grundschule, Deutsch-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Grundschullehrkräfte in der 1. Klasse benötigen Deutsch-Arbeitsblätter für Dolch- und Fry-Wortlisten. Erstellen Sie Zuordnungsarbeitsblätter, die Sichtwörter mit Bilddarstellungen verbinden. Gestalten Sie Arbeitsblätter zum Buchstaben lernen für Mischungen, Digraphen und Wortfamilien. Generieren Sie Vokabel-Zuordnung für Sachunterrichts- und Sozialkundeeinheiten. Entwickeln Sie Mathe-Arbeitsblätter, die Zahlwörter mit Ziffern zuordnen.

Lehrkräfte in der 2. Klasse verwenden den benutzerdefinierten Wortmodus für fachspezifische Vokabel-Zuordnung. Ordnen Sie Bundesländer zu Hauptstädten für Geografie zu. Verbinden Sie mathematische Begriffe mit Definitionen. Verknüpfen Sie naturwissenschaftliches Vokabular mit Beispielen.

Erstellen Sie differenzierte kostenlose Arbeitsblätter für gemischte Fähigkeitsklassen. Gestalten Sie einfachere Versionen mit Bildhinweisen für schwächere Leser. Generieren Sie härtere Versionen mit reiner Vokabel-Zuordnung für fortgeschrittene Schüler.`,
        quote: 'Ich erstelle differenzierte Arbeitsblätter für alle meine Lesegruppen in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern',
        subtitle: 'Individuelles Lerntempo mit Vorschul-Arbeitsblättern und Ausmalbilder-Integration',
        description: `Homeschool-Eltern erstellen personalisierte Zuordnungsarbeitsblätter, die zum Lernniveau jedes Kindes passen. Generieren Sie Arbeitsblätter zum Buchstaben lernen, wenn Schüler Buchstabenerkennung meistern. Gestalten Sie Deutsch-Arbeitsblätter nach gewählter Lehrplansequenz. Entwickeln Sie Vokabel-Zuordnung im individuellen Lesetempo. Erstellen Sie Mathe-Arbeitsblätter, die auf das aktuelle Fähigkeitsniveau des Schülers abgestimmt sind.

Laden Sie Familienfotos für hochgradig personalisierte Vorschul-Arbeitsblätter hoch. Ordnen Sie den Namen des Kindes dem Foto für Namenserkennung zu. Verbinden Sie Familienmitglieder mit Beziehungswörtern. Verknüpfen Sie Haushaltsgegenstände mit Vokabelwörtern. Personalisierung erhöht Engagement für Heimlernende.

Generieren Sie Zuordnungsarbeitsblätter für mehrere Kinder gleichzeitig. Erstellen Sie altersgerechte Vorschul-Arbeitsblätter für Kindergartenkind. Das Basis-Paket Abonnement unterstützt mehrere Klassenstufen in einem Haushalt.`,
        quote: 'Ein Werkzeug deckt alle Klassenstufen meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ- und Fremdsprachenlehrkräfte',
        subtitle: 'Deutsch-Arbeitsblätter und mehrsprachige Vorschul-Arbeitsblätter',
        description: `DaZ-Lehrkräfte nutzen Zuordnungsarbeitsblätter für visuellen Vokabelunterricht. Bilder bieten Kontexthinweise, die Deutschlernende benötigen. Ordnen Sie Bilder deutschen Wörtern für grundlegenden Vokabelaufbau zu. Erstellen Sie Arbeitsblätter zum Buchstaben lernen, die Buchstaben-Laut-Verbindungen zeigen. Gestalten Sie Deutsch-Arbeitsblätter, die deutsche Aussprachemuster verstärken.

Mehrsprachige Zuordnungsarbeitsblätter unterstützen Herkunftssprachenprogramme. Erstellen Sie türkische Arbeitsblätter zum Buchstaben lernen für zweisprachige Klassenzimmer. Generieren Sie polnische Vokabel-Zuordnung für Immersionsprogramme. Alle 11 Sprachen verfügbar mit derselben einfachen Oberfläche.

Zweisprachige Lehrkräfte erstellen parallele Zuordnungsarbeitsblätter in zwei Sprachen. Generieren Sie deutsche Version für Sprachübertragungsaktivitäten. Erstellen Sie türkische Version für Grundlagenbildung. Vergleichen Sie Vokabular über Sprachen hinweg.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderlehrkräfte',
        subtitle: 'Differenzierte Mathe-Arbeitsblätter und angepasste Arbeitsblätter Grundschule',
        description: `Förderlehrkräfte benötigen hochgradig anpassbare Zuordnungsarbeitsblätter für Förderplanziele. Erstellen Sie Vier-Paar-Arbeitsblätter für Schüler mit Aufmerksamkeitsherausforderungen. Generieren Sie Großbild-Arbeitsblätter zum Buchstaben lernen für visuelle Verarbeitungsunterstützung. Gestalten Sie einfache Vokabel-Zuordnung für modifizierten Leseunterricht. Entwickeln Sie konkrete Mathe-Arbeitsblätter mit visuellen Darstellungen.

Laden Sie Fotos von Klassenzimmer-Lernmaterialien für praktische Lernverbindung hoch. Ordnen Sie echte Zählbären zu Zahlwörtern zu. Verbinden Sie tatsächliche Formblöcke mit Geometriebegriffen. Überbrücken Sie konkrete Lernmaterial-Arbeit zu abstrakter Arbeitsblatt-Praxis.

Generieren Sie Fortschrittsüberwachungs-kostenlose Arbeitsblätter zur Verfolgung der Förderplan-Zielerreichung. Erstellen Sie konsistentes Format-Zuordnungsarbeitsblätter für zuverlässige Datenerfassung.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrer-Unternehmer',
        subtitle: 'Verkauf von kostenlosen Arbeitsblättern auf Eduki mit Einmaleins und Rechnen lernen Inhalten',
        description: `Lehrer-Unternehmer bauen erfolgreiche Geschäfte mit dem Verkauf von Zuordnungsarbeitsblatt-Bundles online auf. Erstellen Sie thematische Arbeitsblätter zum Buchstaben lernen Pakete für saisonale Nachfrage. Generieren Sie umfassende Deutsch-Arbeitsblätter Sets, organisiert nach Fähigkeitsprogression. Gestalten Sie Vokabel-Zuordnungs-Bundles sortiert nach Lesestufe.

Eduki-Verkäufer preisen Zuordnungsarbeitsblatt-Bundles bei 3-8€ pro Paket. Erstellen Sie 10-seitige Arbeitsblätter zum Buchstaben lernen Bundle, das A-Z Buchstaben abdeckt. Generieren Sie 15-seitige Deutsch-Arbeitsblätter Set, das Phonetik lehrt. Verkaufen Sie Hunderte Exemplare monatlich, die erhebliches passives Einkommen generieren.

Erstellen Sie Produkte mit Einmaleins und Rechnen lernen Inhalten für Mathe-fokussierte Käufer. Gestalten Sie Einmaleins-Übungsarbeitsblätter für Multiplikationsfluenz. Generieren Sie Rechnen-1.-Klasse-Zuordnung für frühe mathematische Fähigkeiten.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from matching.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrkräfte stellen häufige Fragen zum Erstellen von Zuordnungsarbeitsblättern mit Zuordnungs-Generator. Hier finden Sie Antworten zu kostenlosen Arbeitsblättern, Ausmalbilder, Schwungübungen und mehr. Erfahren Sie, wie Sie Arbeitsblätter zum Buchstaben lernen erstellen, Deutsch-Arbeitsblätter generieren und Mathe-Arbeitsblätter für Einmaleins-Praxis gestalten.',
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
        question: 'Kann ich Schwungübungen mit Zuordnungsarbeitsblättern kombinieren für Vorschul-Arbeitsblätter?',
        answer: 'Ja, das Basis-Paket Abonnement beinhaltet sowohl Zuordnungs-Generator als auch den Schwungübungen-Generator. Erstellen Sie Zuordnungsarbeitsblätter für Buchstabenerkennung, dann fügen Sie passende Schwungübungen für Schreibvorbereitung hinzu. Koordinieren Sie Schwungübungen-Themen mit Zuordnungsaktivitäten. Schüler vervollständigen Buchstaben-Zuordnung gefolgt von verwandten Schwungübungen. Kombinierte Aktivitäten bauen sowohl Erkennungs- als auch Schreibfähigkeiten auf. Generieren Sie beide Materialien von demselben Abonnement ohne zusätzliche Kosten.',
      },
      {
        id: '2',
        question: 'Wie erstelle ich Arbeitsblätter zum Buchstaben lernen für Alphabet-Unterricht mit Anfangsbuchstaben-Zuordnung?',
        answer: 'Wählen Sie den Bild-zu-Anfangsbuchstabe-Modus im Zuordnungs-Generator. Wählen Sie das "Zufällig aus gewähltem Thema" und wählen Sie ein Thema wie Tiere oder Essen. Klicken Sie auf Generieren und das System erstellt automatisch Arbeitsblätter zum Buchstaben lernen. Bilder ordnen sich Anfangsbuchstaben zu (Apfel zu A, Ball zu B). Perfekt für phonetische Instruktion und Buchstabenerkennung. Generieren Sie wöchentlich neue Arbeitsblätter zum Buchstaben lernen für jeden Buchstaben des Alphabets. Kombinieren Sie mit Schwungübungen für vollständige Alphabetinstruktion.',
      },
      {
        id: '3',
        question: 'Kann ich Deutsch-Arbeitsblätter für Wortschatz und Leseverständnis mit benutzerdefinierten Wörtern erstellen?',
        answer: 'Ja, verwenden Sie den Bild-zu-benutzerdefiniertem-Wort-Modus für Deutsch-Arbeitsblätter. Wählen Sie Bilder aus der Bibliothek. Geben Sie benutzerdefinierte deutsche Vokabelwörter für jedes Bild ein. Erstellen Sie Zuordnung von Bildern zu Dolch-Wörtern, Fry-Wörtern oder thematischem Vokabular. Gestalten Sie Deutsch-Arbeitsblätter für phonetische Muster wie Mischungen oder Digraphen. Generieren Sie Vokabel-Zuordnung für Literatureinheiten. Vollständige Kontrolle über Wortauswahl für zielgerichtete Deutsch-Arbeitsblätter.',
      },
      {
        id: '4',
        question: 'Sind Ausmalbilder und Malvorlagen im Basis-Paket für thematische Aktivitäten enthalten?',
        answer: 'Ja, das Basis-Paket beinhaltet unbegrenzten Zugriff auf den Ausmalbilder-Generator. Erstellen Sie benutzerdefinierte Ausmalbilder und Malvorlagen, die Zuordnungsarbeitsblätter thematisch ergänzen. Generieren Sie Ausmalbilder mit denselben Bildern, die in Zuordnung erscheinen. Koordinieren Sie Malvorlagen mit Unterrichtsthemen. Schüler vervollständigen Zuordnung, dann kolorieren verwandte Ausmalbilder. Verkaufen Sie Ausmalbilder-Bundles zusammen mit Zuordnungsarbeitsblättern auf Eduki. Unbegrenzte Malvorlagen-Generierung ohne zusätzliche Kosten.',
      },
      {
        id: '5',
        question: 'Wie erstelle ich Mathe-Arbeitsblätter für Zahlenerkennung und visuelles Zählen?',
        answer: 'Verwenden Sie den Bild-zu-benutzerdefiniertem-Wort-Modus für Mathe-Arbeitsblätter. Wählen Sie Bilder, die Mengen zeigen (drei Äpfel, fünf Bälle). Geben Sie entsprechende Ziffern oder Zahlwörter ein. Erstellen Sie Zuordnung von visuellen Mengen zu Zahlen. Gestalten Sie Mathe-Arbeitsblätter, die Punkte-Mengen Ziffern zuordnen. Generieren Sie Zahlwort-zu-Ziffer-Zuordnung. Entwickeln Sie mathematische Vokabel-Zuordnung für Geometrie-Begriffe. Alle Mathe-Arbeitsblätter passen sich an Ihr Lehrplan-Sequenzieren an.',
      },
      {
        id: '6',
        question: 'Kann ich Einmaleins-Arbeitsblätter mit visueller Zuordnung für Multiplikationspraxis erstellen?',
        answer: 'Ja, erstellen Sie Einmaleins-Arbeitsblätter mit dem benutzerdefinierten Wortmodus. Wählen Sie Bilder, die Multiplikation darstellen (Gruppen von Objekten). Geben Sie Einmaleins-Aufgaben oder Antworten ein. Ordnen Sie Multiplikationsaufgaben zu Lösungen zu. Gestalten Sie Einmaleins-Zuordnung von 3×4 zu 12. Generieren Sie visuelle Darstellungen mit Antworten. Entwickeln Sie Einmaleins-Arbeitsblätter für alle Multiplikationstabellen 1-12. Verkaufen Sie Einmaleins-Bundles auf Eduki für passives Einkommen.',
      },
      {
        id: '7',
        question: 'Wie viele kostenlose Arbeitsblätter kann ich monatlich mit dem Basis-Paket erstellen?',
        answer: 'Unbegrenzt. Das Basis-Paket Abonnement beinhaltet unbegrenzte Arbeitsblatt-Generierung ohne Monatslimits. Erstellen Sie 10, 100 oder 1.000 kostenlose Arbeitsblätter pro Monat. Generieren Sie so viele Zuordnungsarbeitsblätter wie Ihre Schüler benötigen. Keine Download-Beschränkungen, keine Nutzungsgrenzen, keine versteckten Gebühren. Produzieren Sie tägliche Arbeitsblätter für alle Fächer. Entwickeln Sie umfangreiche Arbeitsblatt-Bibliotheken für zukünftige Verwendung. 144€ jährliches Abonnement deckt unbegrenzte Generierung ab.',
      },
      {
        id: '8',
        question: 'Kann ich Arbeitsblätter Rechnen 1. Klasse für Addition und Subtraktion mit visuellen Hilfsmitteln erstellen?',
        answer: 'Ja, erstellen Sie Arbeitsblätter Rechnen 1. Klasse mit visuellen Zuordnungsaktivitäten. Verwenden Sie den benutzerdefinierten Wortmodus. Wählen Sie Bilder, die Rechenoperationen darstellen. Geben Sie Additionen oder Subtraktionsaufgaben ein. Ordnen Sie visuelle Darstellungen zu Zahlengleichungen zu. Gestalten Sie Rechnen 1. Klasse Materialien mit konkreten Bildern. Generieren Sie Zuordnung von 3+2 zu Bildern mit fünf Objekten. Entwickeln Sie altersgerechte Arbeitsblätter Rechnen 1. Klasse.',
      },
      {
        id: '9',
        question: 'Welche Schwungübungen-Typen kann ich für feinmotorische Entwicklung erstellen?',
        answer: 'Der Schwungübungen-Generator im Basis-Paket erstellt verschiedene Schwungübungen-Typen. Generieren Sie Wellenlinienmuster für horizontale Stiftbewegung. Gestalten Sie Zickzack-Schwungübungen für wechselnde Richtungen. Entwickeln Sie Kreismuster-Schwungübungen für Schreibvorbereitung. Erstellen Sie buchstabenähnliche Schwungübungen, die zu Alphabet-Formung führen. Kombinieren Sie verschiedene Schwungübungen-Typen in thematischen Paketen. Alle Schwungübungen passen sich an Schülerfähigkeitsniveau an.',
      },
      {
        id: '10',
        question: 'Kann ich Deutsch-Arbeitsblätter auf anderen Sprachen für zweisprachigen Unterricht erstellen?',
        answer: 'Ja, generieren Sie Zuordnungsarbeitsblätter in 11 verschiedenen Sprachen. Wählen Sie Spracheinstellung für UI und Bildbeschriftungen. Erstellen Sie englische, französische oder spanische Vokabel-Zuordnung. Gestalten Sie türkische, polnische oder italienische Deutsch-Arbeitsblätter. Generieren Sie parallele Versionen in zwei Sprachen für Vergleich. Unterstützen Sie DaZ-Schüler mit muttersprachlichen Materialien. Alle Deutsch-Arbeitsblätter verfügbar in mehreren Sprachen für bilinguale Programme.',
      },
      {
        id: '11',
        question: 'Wie erstelle ich Arbeitsblätter zum Buchstaben lernen mit hochgeladenen Fotos meiner Schüler?',
        answer: 'Laden Sie Schülerfotos über die Upload-Funktion hoch. Klicken Sie auf "Bilder hochladen" und wählen Sie mehrere Dateien. Wählen Sie den Bild-zu-Anfangsbuchstabe-Modus für Arbeitsblätter zum Buchstaben lernen. Wählen Sie "Spezifische Bilder auswählen" als Auswahlmethode. Wählen Sie hochgeladene Schülerfotos aus der Bibliothek. Das System ordnet Fotos automatisch Anfangsbuchstaben der Schülernamen zu. Erstellen Sie hochgradig personalisierte Arbeitsblätter zum Buchstaben lernen mit vertrauten Gesichtern.',
      },
      {
        id: '12',
        question: 'Kann ich Einmaleins und Rechnen 1. Klasse Materialien für kommerzielle Verkäufe auf Eduki erstellen?',
        answer: 'Ja, das Basis-Paket beinhaltet vollständige kommerzielle Lizenzierung für alle generierten Materialien. Erstellen Sie Einmaleins-Arbeitsblätter und verkaufen Sie sie auf Eduki, Teachers Pay Teachers oder Etsy. Generieren Sie Rechnen 1. Klasse Bundles für Amazon KDP. Gestalten Sie Mathematik-Pakete, die Einmaleins und grundlegende Rechenoperationen kombinieren. Keine zusätzlichen Lizenzgebühren über 144€ jährliches Abonnement hinaus. Behalten Sie 100% Verkaufseinnahmen. Bauen Sie erfolgreiche Mathematik-Ressourcen-Geschäfte mit Rechnen lernen Produkten.',
      },
      {
        id: '13',
        question: 'Welche Bildformate und Themen sind für Arbeitsblätter Grundschule verfügbar?',
        answer: 'Die Bilderbibliothek enthält über 3000 kindgerechte Illustrationen, organisiert nach Themen. Verfügbare Kategorien umfassen Tiere, Obst und Gemüse, Transport, Schulsachen, Natur, Jahreszeiten, Berufe und Alltagsgegenstände. Alle Bilder sind speziell für Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter optimiert. Klare Umrisse und leuchtende Farben sprechen junge Lernende an. Suchen Sie nach Stichworten oder durchstöbern Sie Themenkategorien. Neue Bilder werden regelmäßig zur Bibliothek hinzugefügt.',
      },
      {
        id: '14',
        question: 'Wie unterscheiden sich Zuordnungs-Arbeitsblätter von anderen Arbeitsblatttypen für Buchstaben lernen?',
        answer: 'Zuordnungs-Arbeitsblätter fokussieren auf visuelle Verbindungen und Linienziehen zwischen zusammengehörenden Elementen. Im Gegensatz zu Lückentexten oder Multiple-Choice-Aufgaben fördern sie räumliches Denken und Feinmotorik. Für Buchstaben lernen sind Zuordnungsübungen besonders effektiv, da Schüler Bilder aktiv mit Buchstaben verbinden müssen. Diese handlungsorientierte Methode verstärkt Buchstaben-Laut-Beziehungen besser als passive Wiederholung. Kombinieren Sie Zuordnung mit Schwungübungen für ganzheitliches Buchstaben lernen.',
      },
      {
        id: '15',
        question: 'Kann ich kostenlose Arbeitsblätter mit verschiedenen Schwierigkeitsstufen für differenzierten Unterricht erstellen?',
        answer: 'Ja, passen Sie Schwierigkeitsstufen für differenzierten Unterricht an. Wählen Sie 4 Paare für Einsteiger und jüngere Vorschul-Arbeitsblätter Benutzer. Verwenden Sie 5-6 Paare für fortgeschrittene Arbeitsblätter Grundschule. Kombinieren Sie Bilder mit Buchstaben für einfachere Versionen oder nur Text für Herausforderungen. Erstellen Sie separate Versionen desselben Themas für verschiedene Leistungsniveaus. Generieren Sie kostenlose Arbeitsblätter in Minuten für alle Schülergruppen Ihrer Klasse.',
      },
      {
        id: '16',
        question: 'Welche Vorteile bieten Vorschul-Arbeitsblätter mit Zuordnungsübungen für die frühe Entwicklung?',
        answer: 'Vorschul-Arbeitsblätter mit Zuordnung fördern multiple Entwicklungsbereiche gleichzeitig. Kognitive Fähigkeiten: Mustererkennung, logisches Denken, visuelle Diskriminierung. Feinmotorik: präzises Linienziehen, Stifthaltung, Hand-Auge-Koordination. Sprachentwicklung: Vokabelerweiterung, Buchstabenerkennung, phonemisches Bewusstsein. Vorschul-Arbeitsblätter mit bunten Bildern erhöhen Motivation und Aufmerksamkeitsspanne. Regelmäßige Zuordnungsübungen bereiten optimal auf Mathe-Arbeitsblätter und Schreiben vor.',
      },
      {
        id: '17',
        question: 'Wie integriere ich Mathe-Arbeitsblätter mit Zuordnungsübungen in meinen Unterricht?',
        answer: 'Mathe-Arbeitsblätter mit Zuordnung eignen sich hervorragend für Mengenlehre und Zahlverständnis. Ordnen Sie Zahlen zu Mengenbildern für konkrete Zahlenvorstellung zu. Verbinden Sie Rechenaufgaben mit Ergebnissen für Kopfrechnen-Training. Erstellen Sie Geometrie-Zuordnung von Formen zu Namen. Verwenden Sie Mathe-Arbeitsblätter als Stationsarbeit oder Hausaufgaben. Generieren Sie täglich neue Aufgaben für abwechslungsreiches Üben. Einmaleins-Zuordnung macht Multiplikation spielerisch lernbar.',
      },
      {
        id: '18',
        question: 'Gibt es Tipps für effektive Arbeitsblätter zum Buchstaben lernen mit dem Zuordnungs-Generator?',
        answer: 'Für optimale Arbeitsblätter zum Buchstaben lernen folgen Sie diesen Empfehlungen. Beginnen Sie mit häufigen Buchstaben und bekannten Wörtern. Verwenden Sie eindeutige Bilder, die den Anfangslaut klar darstellen. Beschränken Sie anfänglich auf 4 Paare und steigern Sie graduell. Wählen Sie thematisch zusammenhängende Bilder für bessere Merkbarkeit. Kombinieren Sie Groß- und Kleinbuchstaben erst nach sicherer Einzelerkennung. Integrieren Sie regelmäßig Wiederholungsarbeitsblätter für nachhaltiges Buchstaben lernen.',
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
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
      'Lösungsblätter inklusive',
    ],
    ctaText: 'Jetzt Erstellen',
    bundleDescription: 'Ihr Abonnement umfasst Zugriff auf 10 Arbeitsblatt-Generatoren:',
    bundleApps: [
      'Bildzusatz',
      'Alphabet-Zug',
      'Malvorlagen',
      'Mathe-Arbeitsblatter',
      'Wortsalat',
      'Finden und Zahlen',
      'Zuordnungsspiel',
      'Linien Zeichnen',
      'Bilder-Bingo',
      'Sudoku',
    ],
  },

  // Related Apps - FULL text from matching.md combine apps section
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Das Basis-Paket Abonnement beinhaltet zehn verschiedene Arbeitsblatt-Generator-Apps, die zusammenarbeiten, um vollständige Unterrichtspakete zu erstellen. Kombinieren Sie Zuordnungs-Generator mit anderen Generatoren für umfassende Lehrplan-Bundles. Erstellen Sie koordinierte Materialien über mehrere Arbeitsblatttypen hinweg. Generieren Sie thematische Pakete, die alle Fähigkeitsbereiche abdecken. Verkaufen Sie Multi-App-Bundles auf Eduki für höhere Preispunkte.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlose Testversion Starten',
    secondaryCtaText: 'Alle 10 Apps Ansehen',
    badgeText: 'Funktioniert hervorragend mit',
    exploreText: 'Alle Apps erkunden',
    trustBadges: {
      securePayment: 'Sichere Bezahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'drawing-lines',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✍️',
        description: 'Erstellen Sie Schwungübungen für Schreibvorbereitung kombiniert mit Buchstaben-Zuordnung für vollständige Vorschul-Arbeitsblätter.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Kombinieren Sie Zuordnungsarbeitsblätter mit thematischen Ausmalbilder für erweiterte Lernzeit und Feinmotorik.',
      },
      {
        id: '3',
        slug: 'word-search',
        name: 'Wortsuche',
        category: 'Sprache',
        icon: '🔍',
        description: 'Erweitern Sie Deutsch-Arbeitsblätter mit Wortsuche-Puzzles für umfassendes Vokabeltraining.',
      },
      {
        id: '4',
        slug: 'crossword',
        name: 'Kreuzworträtsel',
        category: 'Sprache',
        icon: '📝',
        description: 'Ergänzen Sie Zuordnung mit Kreuzworträtseln zum gleichen Wortschatz für intensives Worttraining.',
      },
      {
        id: '5',
        slug: 'addition',
        name: 'Addition',
        category: 'Mathematik',
        icon: '➕',
        description: 'Kombinieren Sie Zuordnung mit Additions-Arbeitsblättern für umfassende Rechnen lernen Pakete.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alphabet-Zug',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Ergänzen Sie Zuordnungs-Training mit Buchstabenerkennung-Aktivitäten für umfassendes Buchstaben lernen.',
      },
    ],
  },
};

export default matchingDeContent;
