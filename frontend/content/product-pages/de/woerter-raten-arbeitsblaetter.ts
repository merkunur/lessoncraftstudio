import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Worträtsel (Word Guess) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/woerter-raten-arbeitsblaetter.ts
 * URL: /de/apps/woerter-raten-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/woerter-raten.md
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
 * PRICING: Word Guess is a FULL ACCESS app (€240/year or €25/month)
 */

export const wordGuessDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'woerter-raten-arbeitsblaetter',
    appId: 'word-guess',
    title: 'Worträtsel-Generator - Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
    description: 'Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.',
    keywords: 'wörter raten arbeitsblätter, worträtsel arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, deutsch arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
  },

  // Hero Section - FULL text from woerter-raten.md
  hero: {
    title: 'Worträtsel-Generator',
    subtitle: 'Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
    description: `Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.

Kinder lieben Rätsel. Worträtsel mit Bildhinweisen verbinden Spaß mit Lernen. Ein Bild zeigt einen Gegenstand. Daneben stehen leere Kästchen für jeden Buchstaben. Die Kinder erraten das Wort und schreiben es auf.

Der Worträtsel-Generator erstellt Arbeitsblätter für die Grundschule in Sekunden. Wählen Sie Bilder aus über 3.000 kindgerechten Motiven. Das System extrahiert automatisch die Wörter. Sie können die Wörter auch manuell anpassen.`,
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Worträtsel-Arbeitsblätter Beispiele',
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

  // Use Cases Section - FULL text from woerter-raten.md
  useCases: {
    sectionTitle: 'Wer profitiert vom Worträtsel-Generator - Kostenlose Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Worträtsel-Generator ist für viele Zielgruppen konzipiert. Lehrkräfte, Eltern und Therapeuten nutzen das Tool täglich. Jede Gruppe hat unterschiedliche Anforderungen. Unser Generator erfüllt sie alle.',
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
};

export default wordGuessDeContent;
