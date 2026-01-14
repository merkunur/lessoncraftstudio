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
    items: [],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Mathe-Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Additions-Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
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
      securePayment: 'Sichere Bezahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [],
  },
};

export default additionDeContent;
