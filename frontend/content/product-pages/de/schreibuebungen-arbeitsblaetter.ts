import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Schreibübungen (Writing) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/schreibuebungen-arbeitsblaetter.ts
 * URL: /de/apps/schreibuebungen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/schreibuebungen.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * German Keywords (from keywords.txt):
 * 1. Arbeitsblätter Grundschule
 * 2. Mathe-Arbeitsblätter / Mathe Arbeitsblätter
 * 3. Vorschul-Arbeitsblätter / Vorschule Arbeitsblätter
 * 4. Einmaleins
 * 5. Schwungübungen
 * 6. Buchstaben lernen
 * 7. Ausmalbilder / Malvorlagen
 * 8. Kostenlose Arbeitsblätter
 * 9. Rechnen lernen / Rechnen 1. Klasse
 * 10. Deutsch-Arbeitsblätter / Deutsch Arbeitsblätter
 *
 * PRICING: Writing is a FULL ACCESS app (€240/year or €25/month)
 */

export const writingDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'schreibuebungen-arbeitsblaetter',
    appId: 'writing-app',
    title: 'Schreibübungen Arbeitsblätter Generator - Kostenlose Schwungübungen und Buchstaben lernen zum Ausdrucken für Vorschule und Grundschule',
    description: 'Erstellen Sie professionelle Schreibübungen mit unserem Arbeitsblatt-Generator. Mit Ihrem Vollzugriff-Abo generieren Sie unbegrenzt Schwungübungen und Buchstaben lernen Materialien ohne zusätzliche Kosten pro Blatt. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.',
    keywords: 'schreibübungen arbeitsblätter, schwungübungen, buchstaben lernen, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, einmaleins, deutsch arbeitsblätter, rechnen lernen, ausmalbilder, malvorlagen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/schreibuebungen-arbeitsblaetter',
  },

  // Hero Section - FULL text from schreibuebungen.md
  hero: {
    title: 'Schreibübungen Arbeitsblätter Generator',
    subtitle: 'Kostenlose Schwungübungen und Buchstaben lernen zum Ausdrucken für Vorschule und Grundschule',
    description: `Erstellen Sie professionelle Schreibübungen mit unserem Arbeitsblatt-Generator. Ihr Vollzugriff-Abo ermöglicht unbegrenzte Erstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Schwungübungen und Übungen zum Buchstaben lernen für Vorschule und Grundschule. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter.

Unser Generator für Schreibübungen hilft Pädagogen bei der Erstellung von Arbeitsblättern Grundschule mit geführten Schreiblinien. Wählen Sie zwischen Druckschrift und Schreibschrift mit verschiedenen Nachspurmodi. Jedes Arbeitsblatt enthält die richtigen Grundlinien für korrekte Buchstabenbildung. Perfekt für den Schreibunterricht in allen Klassenstufen.

Generieren Sie Schwungübungen für Buchstaben, Wörter, Namen oder eigene Texte. Ihr Vollzugriff-Abo beinhaltet den Zugang zu allen 33 Arbeitsblatt-Generatoren plus kommerzielle Lizenz. Erstellen Sie unbegrenzt kostenlose Arbeitsblätter für den Unterricht oder zum Verkauf auf Lehrerplattformen.`,
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

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Schreibübungen Arbeitsblätter Beispiele',
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

  // Use Cases Section - FULL text from schreibuebungen.md
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte, Eltern und Pädagogen - Vorschule Arbeitsblätter und Arbeitsblätter Grundschule für Jeden Bedarf',
    sectionDescription: 'Schreibübungen-Generatoren dienen verschiedenen Unterrichtskontexten und Schülergruppen. Erzieher in der Vorschule, die Kinder auf die Grundschule vorbereiten, brauchen andere Materialien als Lehrkräfte der dritten Klasse, die Schreibschrift verfeinern. Homeschool-Eltern benötigen Flexibilität, die Klassenraumlehrkräfte nicht brauchen. DaZ-Lehrkräfte stehen vor einzigartigen Herausforderungen bei der Buchstabenbildung über Sprachen hinweg. Unser Generator passt sich nahtlos all diesen unterschiedlichen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [],
    ctaText: 'Vollzugriff Starten',
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

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Schreibübungen mit anderen Generatoren für umfassende Lernpakete',
    sectionDescription: 'Ihr Vollzugriff-Abo schaltet alle 33 Arbeitsblatt-Generatoren frei. Kombinieren Sie Schreibübungen mit ergänzenden Generatoren für thematische Lerneinheiten und gebündelte Produkte zum Verkauf.',
    items: [],
  },
};

export default writingDeContent;
