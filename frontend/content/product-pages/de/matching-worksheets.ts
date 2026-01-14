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
    appId: 'matching-app',
    title: 'Zuordnungs-Arbeitsblätter - Kostenlose Arbeitsblätter Grundschule - Zuordnungs-Generator für Vorschule und Buchstaben lernen',
    description: 'Erstellen Sie professionelle Zuordnungsübungen mit unserem Zuordnungs-Generator. Perfekt für Arbeitsblätter Grundschule, Vorschul-Arbeitsblätter, Buchstaben lernen und Deutsch-Arbeitsblätter. Laden Sie kostenlose Arbeitsblätter in unter 3 Minuten herunter.',
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
    previewImageSrc: '',
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
    sectionTitle: 'Zuordnungs-Arbeitsblätter Beispiele',
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
    items: [],
  },

  // Use Cases - FULL descriptions from matching.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter Grundschule für jeden Bedarf',
    sectionDescription: 'Zuordnungsarbeitsblätter dienen verschiedenen Bildungsbedürfnissen in verschiedenen Unterrichtsumgebungen. Erzieher in der Vorschule nutzen Zuordnungsarbeitsblätter für Buchstabenerkennung und phonetische Praxis. Grundschullehrkräfte gestalten Deutsch-Arbeitsblätter für Leseentwicklung. Homeschool-Eltern erstellen Arbeitsblätter zum Buchstaben lernen, die an das individuelle Lerntempo angepasst sind. DaZ-Lehrkräfte entwickeln Mathe-Arbeitsblätter mit visueller Vokabelunterstützung.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [],
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
    sectionTitle: 'Kombinieren Sie Apps für umfassende Lehrplan-Bundles - Buchstaben lernen, Einmaleins und Deutsch-Arbeitsblätter',
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
    items: [],
  },
};

export default matchingDeContent;
