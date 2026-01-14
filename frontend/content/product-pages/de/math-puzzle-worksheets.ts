import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/math-puzzle-worksheets.ts
 * URL: /de/apps/mathe-raetsel-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/mathe-raetsel.md
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

export const mathPuzzleDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'mathe-raetsel-arbeitsblaetter',
    appId: 'math-puzzle',
    title: 'Mathe-Rätsel Generator - Kostenlose Arbeitsblätter Grundschule und Vorschule Arbeitsblätter zum Ausdrucken',
    description: 'Erstellen Sie professionelle Mathe-Rätsel Arbeitsblätter mit unserem Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Rechnen lernen. Kinder lösen Additions- und Subtraktionsaufgaben um Bilderrätsel zu vervollständigen. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
    keywords: 'mathe-rätsel, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1. klasse, einmaleins, addition subtraktion, ausdrucken',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter',
  },

  // Hero Section - FULL text from mathe-raetsel.md
  hero: {
    title: 'Mathe-Rätsel',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Generator für Vorschule Arbeitsblätter und Rechnen lernen',
    description: `Erstellen Sie professionelle Mathe-Rätsel Arbeitsblätter mit unserem benutzerfreundlichen Generator. Ihr Vollzugriff Abonnement ermöglicht unbegrenzte Arbeitsblatt-Erstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Mathe-Rätsel perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Rechnen lernen. Laden Sie hochwertige PDF-Dateien in unter 3 Minuten herunter.

Mathe-Rätsel verbinden spielerisches Lernen mit mathematischen Grundlagen. Kinder lösen Additions- und Subtraktionsaufgaben, um ein Bilderrätsel zu vervollständigen. Jedes Arbeitsblatt enthält ein Raster mit Rechenaufgaben. Die richtigen Lösungen ergeben ein verstecktes Bild. Das motiviert Kinder zum Weiterrechnen und macht Rechnen lernen zum Abenteuer.

Unser Mathe-Rätsel Generator erstellt individuelle Arbeitsblätter für die 1. Klasse bis zur 3. Klasse. Wählen Sie zwischen Addition, Subtraktion oder einer Mischung aus beiden. Die Rastergrößen reichen von 2×2 bis 4×4 Feldern. Mit Ihrem Abonnement erhalten Sie Zugang zu über 3000 kinderfreundlichen Bildern. Tierbilder, Fahrzeuge, Nahrungsmittel und vieles mehr für Ihre Mathe Arbeitsblätter.`,
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

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
  samples: {
    sectionTitle: 'Mathe-Rätsel Arbeitsblätter Beispiele',
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

  // Use Cases - FULL descriptions from mathe-raetsel.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrer, Eltern und Pädagogen - Kostenlose Arbeitsblätter für Rechnen lernen, Einmaleins und Vorschule',
    sectionDescription: 'Mathe-Rätsel Arbeitsblätter eignen sich für verschiedene Zielgruppen und Bildungsumgebungen. Erzieher nutzen sie für spielerisches Lernen in der Vorschule. Grundschullehrer setzen sie für differenzierten Unterricht ein. Eltern unterstützen ihre Kinder beim Lernen zu Hause mit Mathe Arbeitsblättern.',
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

  // Related Apps - Apps that work well with math puzzle
  relatedApps: {
    sectionTitle: 'Mathe-Rätsel kombinieren mit anderen Apps - Komplette kostenlose Arbeitsblätter mit Rechnen lernen und Einmaleins',
    sectionDescription: 'LessonCraft Studio bietet 33 verschiedene Arbeitsblatt-Generatoren mit Ihrem Vollzugriff Abonnement. Lehrer erstellen umfassende Lernpakete durch Kombination multipler Arbeitsblatt-Typen. Mathe-Rätsel funktionieren perfekt neben anderen Mathe-Arbeitsblättern und Feinmotorik-Aktivitäten.',
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

export default mathPuzzleDeContent;
