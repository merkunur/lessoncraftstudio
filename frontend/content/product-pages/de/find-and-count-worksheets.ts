import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/find-and-count-worksheets.ts
 * URL: /de/apps/suchen-und-zaehlen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/suchen-und-zaehlen.md
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

export const findAndCountDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchen-und-zaehlen-arbeitsblaetter',
    appId: 'find-and-count',
    title: 'Zählübungen-Generator - Kostenlose Arbeitsblätter Grundschule für Vorschule und Mathe-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Kombinieren Sie visuelle Diskriminierung mit Zählübungen für Vorschul-Arbeitsblätter. Perfekt für Mathe-Arbeitsblätter und kostenlose Arbeitsblätter 1. Klasse.',
    keywords: 'suchen und zählen generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, ich sehe was was du nicht siehst, zählen lernen, visuelle wahrnehmung, einmaleins',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
  },

  // Hero Section - FULL text from suchen-und-zaehlen.md paragraphs 1-4
  hero: {
    title: 'Zählübungen-Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule für Vorschule und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator. Ihr Basis-Paket-Abonnement ermöglicht unbegrenzte Arbeitsblatters erstellung ohne zusätzliche Gebühren pro Arbeitsblatt. Generieren Sie individuelle druckbare Arbeitsblätter für Grundschule und Vorschule. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter.

Das Suchen-und-Zählen-Format kombiniert visuelle Diskriminierung mit Zählübungen. Kinder suchen versteckte Objekte in einem Bildraster und führen verschiedene Aufgaben aus. Sie können Objekte einkreisen, mit einem Quadrat umrahmen, durchstreichen oder zählen. Perfekt für Erzieher in der Vorschule und Grundschullehrer.

Unser Generator erstellt Arbeitsblätter Grundschule in wenigen Sekunden. Wählen Sie 1-4 Objekte aus unserer Bildbibliothek oder laden Sie eigene Bilder hoch. Passen Sie die Rastergröße an die Fähigkeiten Ihrer Schüler an. Das System erstellt automatisch einen Lösungsschlüssel mit visuellen Markierungen. Jedes Arbeitsblatt ist vollständig editierbar auf der Leinwand.

Die Arbeitsblätter unterstützen verschiedene pädagogische Ziele. Fördern Sie visuelle Wahrnehmung und Aufmerksamkeit für Details. Üben Sie Zahlenerkennung und grundlegende Zählfähigkeiten. Entwickeln Sie Feinmotorik durch Zeichenaufgaben. Kombinieren Sie Suchen-und-Zählen mit thematischem Lernen in allen Schulfächern.`,
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Zählübungen Beispiele',
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

  // Use Cases - FULL text from suchen-und-zaehlen.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Erzieher, Eltern und Pädagogen - Kostenlose Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Suchen-und-Zählen-Generator eignet sich für verschiedene Bildungskontexte. Erzieher in der Vorschule nutzen ihn täglich. Grundschullehrer erstellen differenzierte Materialien. Eltern unterstützen ihre Kinder zu Hause. Jede Gruppe profitiert von unterschiedlichen Funktionen.',
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

  // Related Apps - Kombinieren Sie Suchen-und-Zählen mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Suchen-und-Zählen mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Suchen-und-Zählen mit Mathe-Arbeitsblättern für Rechnen lernen. Verbinden Sie mit Schwungübungen für Feinmotorik-Training. Erstellen Sie thematische Lernpakete.',
    ctaTitle: 'Bereit, fantastische Suchen-und-Zählen-Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
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

export default findAndCountDeContent;
