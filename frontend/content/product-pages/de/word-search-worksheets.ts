import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/word-search-worksheets.ts
 * URL: /de/apps/suchsel-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/wordsearch.md
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

export const wordSearchDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchsel-arbeitsblaetter',
    appId: 'word-search',
    title: 'Suchsel Generator - Kostenlose Arbeitsblätter Grundschule - Buchstaben lernen und Deutsch-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen, Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Suchsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse bis 3. Klasse.',
    keywords: 'suchsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Suchsel Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Buchstaben lernen und Deutsch-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen, Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Suchsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse bis 3. Klasse.

Mit dem Suchsel Generator erstellen Sie in weniger als 3 Minuten druckfertige Arbeitsblätter Grundschule. Der Generator kombiniert spielerisch Buchstaben lernen mit Wortschatzübungen. Laden Sie fertige Suchsel als PDF oder JPEG herunter. Jedes Arbeitsblatt kann individuell angepasst werden.

Unser kostenloser Suchsel Generator bietet über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Erstellen Sie thematische Suchsel für Mathe-Arbeitsblätter, Deutsch-Arbeitsblätter oder Vorschul-Arbeitsblätter. Der Generator funktioniert in 11 Sprachen und ist ideal für mehrsprachigen Unterricht geeignet.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Suchsel Arbeitsblätter Beispiele',
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

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter Grundschule für jeden Bedarf',
    sectionDescription: 'Der Suchsel Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Suchsel mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Mit einem Abonnement erhalten Sie Zugang zu 33 Generatoren. Kombinieren Sie verschiedene Arbeitsblatt-Typen für maximale Wirkung. Suchsel allein sind bereits wertvoll. In Kombination mit anderen Apps entsteht echter Mehrwert.',
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
    items: [],
  },
};

export default wordSearchDeContent;
