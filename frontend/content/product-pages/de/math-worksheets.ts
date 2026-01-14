import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/math-worksheets.ts
 * URL: /de/apps/mathe-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/mathe-arbeitsblätter.md
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

export const mathWorksheetsDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'mathe-arbeitsblaetter',
    appId: 'math-worksheet',
    title: 'Mathe-Rätsel Generator - Kostenlose Mathe-Arbeitsblätter Grundschule - Rechnen lernen Vorschule',
    description: 'Erstellen Sie professionelle Mathe-Arbeitsblätter mit visuellen Rechenrätseln für Grundschule und Vorschule. Perfekt für Rechnen lernen, Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter. Der Mathe-Rätsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse.',
    keywords: 'mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder, deutsch arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
  },

  // Hero Section - FULL text from mathe-arbeitsblätter.md paragraphs 1-4
  hero: {
    title: 'Mathe-Rätsel Generator',
    subtitle: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Rechnen lernen Vorschule',
    description: `Erstellen Sie professionelle Mathe-Arbeitsblätter mit visuellen Rechenrätseln. Unser Generator macht Rechnen lernen zum spannenden Abenteuer für Kinder. Mit Ihrem Basis-Paket Abo erstellen Sie unbegrenzt viele kostenlose Arbeitsblätter ohne Zusatzkosten. Perfekt für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule bis zur 2. Klasse.

Der Generator erstellt Mathe-Rätsel, bei denen Symbole Zahlen darstellen. Kinder lösen die Gleichungen und lernen spielerisch Rechnen. Jedes Rätsel kombiniert visuelle Elemente mit mathematischen Konzepten. Das fördert logisches Denken und Problemlösungskompetenz. Ideal für Rechnen 1. Klasse und frühe mathematische Förderung.

Sie wählen Schwierigkeitsstufen von sehr leicht bis schwer. Der Generator passt sich an das Niveau Ihrer Schüler an. Addition und Subtraktion sind als Rechenarten verfügbar. Sie bestimmen den Zahlenraum selbst. Wählen Sie aus über 3000 kindgerechten Bildern. Laden Sie eigene Bilder hoch für personalisierte Mathe-Arbeitsblätter.`,
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Mathe-Arbeitsblätter Beispiele',
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

  // Use Cases - FULL text from mathe-arbeitsblätter.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte, Eltern und Pädagogen - Kostenlose Mathe-Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Mathe-Arbeitsblätter vom Generator passen zu vielen Lernsituationen. Vorschulpädagogen, Grundschullehrkräfte und Eltern profitieren gleichermaßen. Jede Zielgruppe hat spezifische Bedürfnisse beim Rechnen lernen.',
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

  // Related Apps - Kombinieren Sie Mathe-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Mathe-Arbeitsblätter mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Premium-Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Mathe-Arbeitsblätter mit Ausmalbilder für kreative Pausen. Integrieren Sie Schwungübungen für Schreibvorbereitung. Verbinden Sie mit Einmaleins-Übungen für ältere Schüler.',
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

export default mathWorksheetsDeContent;
