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
    items: [],
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default matchingDeContent;
