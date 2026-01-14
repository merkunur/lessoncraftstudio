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
    title: 'Suchbilder Generator - Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Vorschul-Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Perfekt für Arbeitsblätter Grundschule, Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter. Generieren Sie Ich-Sehe-Was und Welches-Passt-Nicht Aktivitäten. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
    keywords: 'suchbilder arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, ich sehe was, welches passt nicht, visuelle wahrnehmung, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
  },

  // Hero Section - FULL text from find-objects.md
  hero: {
    title: 'Suchbilder-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Generator für Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Ihr Vollzugriff Abonnement für 240 Euro im Jahr ermöglicht unbegrenzte Arbeitsblatterstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Arbeitsblätter für Vorschule und Grundschule in unter drei Minuten. Laden Sie hochwertige PDF-Arbeitsblätter im 300 DPI Format herunter.

Unser Suchbilder-Generator bietet Lehrkräften zwei bewährte Aktivitätsformate. Der Ich-Sehe-Was-Modus lässt Kinder versteckte Objekte unter Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, ungepaarte Bilder zu identifizieren. Beide Formate unterstützen Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule mit anpassbaren Schwierigkeitsstufen.

Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Suchbilder mit Mathe-Arbeitsblättern, Deutsch-Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Suchbilder-Arbeitsblätter Beispiele',
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

  // Use Cases - FULL descriptions from find-objects.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Visuelle Wahrnehmungs-Arbeitsblätter dienen unterschiedlichen pädagogischen Umgebungen. Erzieher in der Vorschule nutzen Suchbild-Arbeitsblätter für Aufmerksamkeitsentwicklung. Grundschullehrer bauen fortgeschrittene visuelle Wahrnehmungsfähigkeiten auf. Eltern im Homeschooling erstellen personalisierte Lernmaterialien. Der Generator passt sich allen Bedürfnissen an.',
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

  // Related Apps - Apps that work well with find-objects
  relatedApps: {
    sectionTitle: 'Suchbilder mit 32 anderen Generatoren kombinieren - Einmaleins, Schwungübungen und Arbeitsblätter Grundschule',
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
    items: [],
  },
};

export default findObjectsDeContent;
