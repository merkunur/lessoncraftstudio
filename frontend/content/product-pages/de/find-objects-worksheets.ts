import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects (Suchbilder) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/find-objects-worksheets.ts
 * URL: /de/apps/suchbilder-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/find-objects.md
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

export const findObjectsDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchbilder-arbeitsblaetter',
    appId: 'find-objects',
    title: 'Suchbilder Arbeitsblätter | Kostenlose Vorschul-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter für Grundschule und Vorschule. Ich-Sehe-Was Generator. PDF Download in unter 3 Minuten. Perfekt für Lehrer und Eltern.',
    keywords: 'suchbilder arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, ich sehe was, welches passt nicht, visuelle wahrnehmung, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/find-objects/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Suchbilder Arbeitsblätter Grundschule - Ich-Sehe-Was Vorschul-Arbeitsblätter zum kostenlosen Ausdrucken'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/find-objects/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Arbeitsblätter Suchbilder - Welches-Passt-Nicht Aktivitäten für Grundschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/find-objects/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Vorschul-Arbeitsblätter Suchbilder - Visuelle Wahrnehmung Arbeitsblätter für Kinder'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/find-objects/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblätter Grundschule Suchbilder - Kostenloses Arbeitsblatt für Konzentration'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/find-objects/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Druckvorlagen Suchbilder - Arbeitsblatt für Kinder visuelle Wahrnehmung'
      }
    ],
  },

  // Hero Section - FULL text from find-objects.md
  hero: {
    title: 'Suchbilder-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Generator für Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Ihr Vollzugriff Abonnement für 240 Euro im Jahr ermöglicht unbegrenzte Arbeitsblatterstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Arbeitsblätter für Vorschule und Grundschule in unter drei Minuten. Laden Sie hochwertige PDF-Arbeitsblätter im 300 DPI Format herunter.

Unser Suchbilder-Generator bietet Lehrkräften zwei bewährte Aktivitätsformate. Der Ich-Sehe-Was-Modus lässt Kinder versteckte Objekte unter Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, ungepaarte Bilder zu identifizieren. Beide Formate unterstützen Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule mit anpassbaren Schwierigkeitsstufen.

Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Suchbilder mit Mathe-Arbeitsblättern, Deutsch-Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
    previewImageSrc: '/samples/german/find-objects/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
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

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Suchbilder-Generator bietet vollständige Anpassungsmöglichkeiten für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule. Die Plattform enthält zwei verschiedene Aktivitätsmodi mit professionellen Bearbeitungswerkzeugen. Lehrkräfte erstellen druckbare Arbeitsblätter für visuelle Wahrnehmungsübungen in unter drei Minuten. Das Vollzugriff Abonnement schaltet alle Funktionen frei.',
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

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Generieren Sie professionelle Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule in unter drei Minuten. Diese Schritt-für-Schritt-Anleitung zeigt Ihnen den kompletten Erstellungsprozess. Keine Designkenntnisse erforderlich für kostenlose Arbeitsblätter. Der optimierte Workflow hilft Lehrkräften, Mathe-Arbeitsblätter und Ausmalbilder effizient zu erstellen.',
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
        title: 'Schritt 1: Aktivitätsmodus wählen für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter - Thema oder eigenes Foto',
        description: `Öffnen Sie den Suchbilder-Generator und wählen Sie zuerst Ihren Aktivitätsmodus. Wählen Sie den Ich-Sehe-Was-Modus für klassische Suchbild-Arbeitsblätter. Wählen Sie den Welches-Passt-Nicht-Modus für Matching- und visuelle Unterscheidungsübungen. Ihre Auswahl bestimmt die Struktur der Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule.

Für den Ich-Sehe-Was-Modus wählen Sie zuerst 8-12 Ablenkungsbilder aus der Bibliothek. Durchsuchen Sie Themen für gruppierte verwandte Bilder. Suchen Sie spezifische Objekte mit Schlüsselwörtern wie "Tiere" oder "Fahrzeuge". Dann wählen Sie 1-5 versteckte Objekte aus. Beginnen Sie mit 1-2 versteckten Objekten für Vorschulkinder. Nutzen Sie 3-5 Objekte für fortgeschrittene Erstklässler. Klicken Sie auf Themen-Dropdowns für automatische Bildbefüllung.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Seite und Hintergrund anpassen - Kostenlose Arbeitsblätter mit Malvorlagen Designs gestalten',
        description: `Wählen Sie zuerst Ihr Seitenformat aus Letter oder A4. Wählen Sie Hochformat für Standard-Arbeitsblätter für Schulordner. Wählen Sie Querformat für breitere visuelle Layouts. Die benutzerdefinierte Größenoption erlaubt exakte Pixelangaben. Die Seiteneinstellung beeinflusst alle Arbeitsblatttypen einschließlich Mathe-Arbeitsblätter gleichmäßig.

Fügen Sie als nächstes ein Hintergrundthema aus der thematischen Hintergrundbibliothek hinzu. Hintergrundbilder verleihen Vorschul-Arbeitsblättern visuelles Interesse. Wählen Sie saisonale Hintergründe für Feiertagseinheiten. Wählen Sie Rahmenthemen für professionelle Umrandung Ihrer kostenlose Arbeitsblätter. Diese Gestaltungsoptionen funktionieren identisch für Malvorlagen und Ausmalbilder. Fügen Sie Namens- und Datumsfelder für Schülerverantwortlichkeit hinzu.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt generieren mit Einmaleins und Rechnen lernen Themen - Kostenlose Arbeitsblätter erstellen',
        description: `Klicken Sie auf die Erstellen-Schaltfläche für automatische Arbeitsblattgenerierung. Der Generator ordnet alle ausgewählten Bilder auf Ihrem Seitenlayout an. Versteckte Objekte oder ungepaarte Bilder platzieren sich zufällig unter anderen Bildern. Auto-Skalierung stellt sicher, dass Bilder angemessen passen.

Der Generator erstellt gleichzeitig einen Lösungsschlüssel. Für den Ich-Sehe-Was-Modus umkreisen Lösungsschlüssel versteckte Objekte. Für den Welches-Passt-Nicht-Modus markieren Lösungsschlüssel ungepaarte Bilder. Diese Auto-Generierungsfunktion spart Stunden im Vergleich zur manuellen Erstellung. Kombinieren Sie mit Einmaleins Themen für mathematische Suchbilder. Rechnen lernen Materialien entstehen durch Zahlenbilder als versteckte Objekte.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Auf der Leinwand bearbeiten - Rechnen 1. Klasse und Deutsch-Arbeitsblätter präzise anpassen',
        description: `Klicken Sie auf ein Objekt auf Ihrem Arbeitsblatt zur Auswahl. Auswahlgriffe erscheinen um angeklickte Objekte. Ziehen Sie ausgewählte Objekte an neue Positionen durch Klicken und Halten. Drehen Sie Bilder in verschiedene Winkel für visuelle Vielfalt. Skalieren Sie Objekte größer oder kleiner durch Ziehen der Eckgriffe.

Ebenensteuerung passt an, welche Objekte bei Überlappung vorne erscheinen. Bringen Sie wichtige Elemente nach vorne mit der Nach-Vorne-Schaltfläche. Sperren Sie Objekte nach der Positionierung gegen versehentliche Änderungen. Fügen Sie Textelemente direkt auf der Leinwand hinzu. Diese Bearbeitungsfähigkeiten stellen sicher, dass Ihre Rechnen 1. Klasse und Deutsch-Arbeitsblätter Ihrer exakten Vision entsprechen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Ausmalbilder und Arbeitsblätter Grundschule als JPEG und PDF herunterladen - Export in Druckqualität',
        description: `Wählen Sie Ihr Download-Format aus dem Download-Dropdown-Menü. Wählen Sie JPEG für maximale Kompatibilität mit Bildbearbeitungsprogrammen. Wählen Sie PDF für konsistentes Drucken auf allen Geräten. Beide Formate exportieren in professioneller 300 DPI Qualität. Ihre Vorschul-Arbeitsblätter und Ausmalbilder drucken perfekt auf jedem Drucker.

Laden Sie Arbeitsblatt und Lösungsschlüssel separat für organisierte Dateiverwaltung herunter. Aktivieren Sie die Graustufen-Konvertierung vor dem Download für Druckkosteneinsparung. Drucken Sie heruntergeladene Arbeitsblätter sofort oder speichern Sie für später. Verkaufen Sie heruntergeladene Arbeitsblätter auf Teachers Pay Teachers mit inkludierter kommerzieller Lizenz. Ihr Vollzugriff Abonnement (240€/Jahr) deckt unbegrenzte Downloads von Arbeitsblätter Grundschule und allen anderen Arbeitsblatttypen ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from find-objects.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Visuelle Wahrnehmungs-Arbeitsblätter dienen unterschiedlichen pädagogischen Umgebungen. Erzieher in der Vorschule nutzen Suchbild-Arbeitsblätter für Aufmerksamkeitsentwicklung. Grundschullehrer bauen fortgeschrittene visuelle Wahrnehmungsfähigkeiten auf. Eltern im Homeschooling erstellen personalisierte Lernmaterialien. Der Generator passt sich allen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from find-objects.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Suchbilder-Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter.',
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

  // Related Apps - Apps that work well with find-objects
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Suchbild-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
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

export default findObjectsDeContent;
