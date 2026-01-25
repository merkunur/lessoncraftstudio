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
    appId: 'addition',
    title: 'Additions-Arbeitsblätter Generator - Kostenlose Mathe-Arbeitsblätter',
    description: 'Erstellen Sie Additions-Arbeitsblätter für Grundschule und Vorschule. Kostenlose Mathe-Arbeitsblätter mit Lösungsblatt. PDF in 3 Minuten herunterladen.',
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
    previewImageSrc: '/samples/german/addition/sample-1.jpeg',
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

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
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
        title: 'Bilder wählen - Kostenloses Arbeitsblatt für Kinder erstellen',
        description: `Wählen Sie ein Thema aus der Dropdown-Liste oder durchsuchen Sie die Bildkategorien für Arbeitsblätter Grundschule. Über 50 Themen verfügbar: Tiere, Fahrzeuge, Essen, Natur und mehr. Der Generator wählt automatisch passende Bilder für Ihre Additions-Aufgaben.

Alternativ wählen Sie einzelne Bilder manuell aus der Bibliothek für Mathe-Arbeitsblätter. Nutzen Sie die Suchfunktion für spezifische Motive. Kombinieren Sie verschiedene Kategorien für abwechslungsreiche Vorschul-Arbeitsblätter. Ihre Auswahl bestimmt das visuelle Thema des Arbeitsblatts.

Laden Sie eigene Bilder hoch für personalisierte kostenlose Arbeitsblätter. Klassenfotos, Projektbilder oder thematische Grafiken. Die Multi-Upload-Funktion spart Zeit. Kombinieren Sie hochgeladene Bilder mit Bibliotheksbildern für maximale Flexibilität.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Übungsmodus wählen - Arbeitsblatt für Vorschule oder Grundschule',
        description: `Wählen Sie einen der fünf Übungsmodi für Ihre Arbeitsblätter Grundschule. Bild-plus-Bild für Anfänger: beide Operanden als Bildgruppen. Bild-plus-Zahl für den Übergang: ein Operand als Bild, einer als Zahl. Zahl-plus-Bild: umgekehrte Reihenfolge für Variation.

Addend-Finden für fortgeschrittene Lernende für Mathe-Arbeitsblätter. Schüler sehen die Summe und einen Operanden, müssen den fehlenden finden. Diese Umkehraufgaben entwickeln tieferes Zahlenverständnis. Gemischter Modus kombiniert alle Typen für maximale Übungsvielfalt.

Jeder Modus unterstützt unterschiedliche Lernphasen für Rechnen lernen. Beginnen Sie mit konkreten Bild-plus-Bild-Aufgaben. Steigern Sie progressiv zu abstrakteren Modi. Der Übungsmodus bestimmt, wie Additions-Aufgaben präsentiert werden.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schwierigkeit einstellen - Kostenlose Druckvorlagen anpassen',
        description: `Stellen Sie Minimum- und Maximum-Werte für Operanden ein für Vorschul-Arbeitsblätter. Kleine Zahlen (1-3) für Vorschulkinder und Anfänger. Mittlere Bereiche (1-10) für 1. Klasse. Größere Zahlen (1-20) für fortgeschrittene Arbeitsblätter Grundschule.

Die Summen-Obergrenze verhindert zu schwere Aufgaben für Mathe-Arbeitsblätter. Stellen Sie die maximale Summe auf 5, 10 oder höher ein. Der Generator erstellt nur Aufgaben, die diese Grenze respektieren. Perfekte Kontrolle über die Schwierigkeit.

Wählen Sie die Anzahl der Aufgaben pro Arbeitsblatt für kostenlose Arbeitsblätter. Weniger Aufgaben für kurze Übungen oder Anfänger. Mehr Aufgaben für Hausaufgaben oder Tests. Das Layout passt sich automatisch an Ihre Wahl an.`,
        icon: '🔢',
      },
      {
        id: '4',
        number: 4,
        title: 'Generieren und Vorschau - Kostenloses Arbeitsblatt sofort erstellen',
        description: `Klicken Sie auf "Erstellen" und Ihr Additions-Arbeitsblatt erscheint sofort auf der Arbeitsfläche für Mathe-Arbeitsblätter. Die Aufgaben werden automatisch mit Ihren gewählten Bildern und Einstellungen generiert. Das Lösungsblatt wird gleichzeitig erstellt.

Nutzen Sie die Arbeitsflächen-Bearbeitung für Anpassungen an Vorschul-Arbeitsblättern. Verschieben Sie Elemente per Drag & Drop. Ändern Sie Größen durch Ziehen der Ecken. Drehen Sie Bilder nach Belieben. Fügen Sie eigene Texte oder Überschriften hinzu.

Wechseln Sie zwischen Arbeitsblatt und Lösungsblatt mit einem Klick für kostenlose Arbeitsblätter. Überprüfen Sie, ob alle Aufgaben Ihren Anforderungen entsprechen. Generieren Sie erneut für neue Aufgaben-Kombinationen. Jede Generation ist einzigartig.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und Drucken - Arbeitsblatt für Kinder als PDF',
        description: `Klicken Sie auf "Herunterladen" für Ihre fertigen Arbeitsblätter Grundschule. Wählen Sie zwischen PDF und JPEG Format. Beide exportieren in professioneller 300 DPI Auflösung. Aktivieren Sie die Graustufen-Option für Tintenersparnis bei farbigen Bildern.

Laden Sie sowohl das Arbeitsblatt als auch das Lösungsblatt herunter für Mathe-Arbeitsblätter. Beide Dateien sind druckbereit ohne weitere Bearbeitung. Perfekt formatiert für A4 oder Letter Papier. Drucken Sie beliebig viele Kopien für Ihre Klasse.

Mit dem Basis-Paket für 144 € jährlich erhalten Sie wasserzeichenfreie Downloads für Rechnen lernen. Die kostenlose Version enthält ein kleines Wasserzeichen. Kommerzielle Lizenz inklusive für den Verkauf Ihrer Arbeitsblätter auf Teachers Pay Teachers oder Etsy.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Additions-Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from addition.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrkräfte und Eltern haben viele Fragen zum Additions-Generator und Basis-Paket Abonnement. Hier beantworten wir die häufigsten Fragen zu Arbeitsblätter Grundschule, Vorschul-Arbeitsblättern und kommerzieller Lizenzierung.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Addition is FREE but needs subscription for no-watermark/commercial
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

  // Related Apps - Kombinieren Sie Additions-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Premium-Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Additions-Arbeitsblätter mit Ausmalbilder für kreative Pausen. Integrieren Sie Schwungübungen für Schreibvorbereitung. Verbinden Sie mit Einmaleins-Übungen für ältere Schüler.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Mathe-Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlos Testen',
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

export default additionDeContent;
