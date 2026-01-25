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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from raster-puzzle.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from raster-puzzle.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
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
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Raster-Puzzle Generator eignet sich für viele Zielgruppen. Lehrer, Erzieher und Eltern nutzen ihn täglich. Die vielfältigen Einsatzmöglichkeiten überraschen immer wieder. Entdecken Sie, wie auch Sie profitieren können.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from raster-puzzle.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Raster-Puzzle Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
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
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default gridMatchDeContent;
