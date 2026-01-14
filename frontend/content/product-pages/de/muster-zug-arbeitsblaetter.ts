import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Muster-Zug (Pattern Train) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/muster-zug-arbeitsblaetter.ts
 * URL: /de/apps/muster-zug-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/muster-zug.md
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
 * PRICING: Pattern Train is a FULL ACCESS app (€240/year or €25/month)
 */

export const patternTrainDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'muster-zug-arbeitsblaetter',
    appId: 'pattern-train',
    title: 'Muster-Zug Generator - Kostenlose Arbeitsblätter für Mustererkennung - Arbeitsblätter Grundschule und Vorschule',
    description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.',
    keywords: 'muster zug arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
  },

  // Hero Section - FULL text from muster-zug.md
  hero: {
    title: 'Muster-Zug Generator',
    subtitle: 'Kostenlose Arbeitsblätter für Mustererkennung - Arbeitsblätter Grundschule und Vorschule',
    description: `Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten. Kinder lernen Muster zu erkennen und fortzusetzen. Das beliebte Zug-Design macht Lernen zum Vergnügen.

Der Muster-Zug Generator ist perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule. Kinder ordnen Bilder nach Mustern in die Waggons ein. Ausschneiden und Aufkleben trainiert die Feinmotorik. Fünf verschiedene Mustertypen bieten passende Schwierigkeitsstufen.

Dieses Lernwerkzeug verbindet Mustererkennung mit praktischem Basteln. Die fertigen Arbeitsblätter eignen sich für den Unterricht und für zu Hause. Mit über 3000 kindgerechten Bildern erstellen Sie abwechslungsreiche Übungen. Export in 300 DPI Qualität ermöglicht professionellen Druck.`,
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

  // Sample Gallery - REAL file paths from samples/english/pattern train/
  samples: {
    sectionTitle: 'Muster-Zug Arbeitsblätter Beispiele',
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

  // Use Cases Section - FULL text from muster-zug.md
  useCases: {
    sectionTitle: 'Für wen eignet sich der Muster-Zug - Kostenlose Arbeitsblätter für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Der Muster-Zug Generator wurde für verschiedene pädagogische Kontexte entwickelt. Von der Vorschule bis zur dritten Klasse finden Pädagogen passende Einsatzmöglichkeiten. Auch Eltern und Therapeuten profitieren von diesem Werkzeug. Entdecken Sie, wie unterschiedliche Nutzergruppen den Generator einsetzen.',
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

export default patternTrainDeContent;
