import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/word-search-worksheets.ts
 * URL: /de/apps/wortsuche-arbeitsblaetter (German SEO-optimized slug - matches sitemap)
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
    slug: 'wortsuche-arbeitsblaetter',
    appId: 'wordsearch',
    title: 'Wortsuche Arbeitsblätter | Suchsel Generator Grundschule',
    description: 'Wortsuche und Suchsel-Arbeitsblätter mit 5x5 bis 20x20 Rastern erstellen. Generator mit 3000+ Bildern für Grundschule und Vorschule. PDF in 3 Minuten.',
    keywords: 'wortsuche generator, suchsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/wortsuche-arbeitsblaetter',
      },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Wortsuche & Suchsel Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Buchstaben lernen und Deutsch-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen, Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Suchsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse bis 3. Klasse.

Mit dem Suchsel Generator erstellen Sie in weniger als 3 Minuten druckfertige Arbeitsblätter Grundschule. Der Generator kombiniert spielerisch Buchstaben lernen mit Wortschatzübungen. Laden Sie fertige Suchsel als PDF oder JPEG herunter. Jedes Arbeitsblatt kann individuell angepasst werden.

Unser kostenloser Suchsel Generator bietet über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Erstellen Sie thematische Suchsel für Mathe-Arbeitsblätter, Deutsch-Arbeitsblätter oder Vorschul-Arbeitsblätter. Der Generator funktioniert in 11 Sprachen und ist ideal für mehrsprachigen Unterricht geeignet.`,
    previewImageSrc: '/samples/german/wordsearch/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'So einfach geht\'s',
        modalTitle: 'Funktionen im Überblick',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/german/wordsearch/
  samples: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Kostenlose Arbeitsblätter und Kostenlose Druckvorlagen',
    sectionDescription: 'Laden Sie kostenlose Druckvorlagen herunter - Kostenloses Arbeitsblatt für Kinder in professioneller Qualität für Arbeitsblatt für Vorschule',
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

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Der Suchsel Generator bietet alle wichtigen Funktionen für kostenlose Arbeitsblätter Grundschule. Erstellen Sie professionelle Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter in wenigen Minuten. Jede Funktion wurde speziell für Lehrkräfte entwickelt.',
    highlightBadgeText: 'Hauptfunktion',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    badgeText: 'Funktionen',
    trustBadges: {
      allFeatures: 'Alle Funktionen inklusive',
      noHiddenFees: 'Keine versteckten Kosten',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Erstellen Sie professionelle Arbeitsblätter Grundschule in unter 3 Minuten. Folgen Sie diesen 5 einfachen Schritten. Kein Design-Wissen erforderlich. Perfekt für Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter.',
    ctaText: 'Jetzt Erstellen',
    badgeText: 'So funktioniert es',
    stepLabel: 'Schritt',
    completionTitle: 'Fertig!',
    completionSubtitle: 'Ihr Arbeitsblatt ist bereit',
    readyTime: 'In unter 3 Minuten fertig',
    noSkillsNeeded: 'Keine Designkenntnisse nötig',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Thema wählen - Kostenlose Arbeitsblätter Grundschule und Mathe-Arbeitsblätter erstellen',
        description: `Wählen Sie ein Thema aus der Dropdown-Liste. Über 50 Themen verfügbar. Tiere, Fahrzeuge, Essen, Natur und mehr. Oder wählen Sie "Zufälliges Thema" für Abwechslung.

Der Generator wählt automatisch 8 passende Bilder aus dem Thema. Ideal für thematische Arbeitsblätter Grundschule. Kombinieren Sie Buchstaben lernen mit Sachunterricht. Die Bildauswahl erfolgt sofort.

Alternativ können Sie einzelne Bilder manuell auswählen. Durchsuchen Sie die Bildbibliothek. Nutzen Sie die Suchfunktion für spezifische Wörter. Perfekt für personalisierte Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Einstellungen anpassen - Vorschul-Arbeitsblätter und Einmaleins Arbeitsblätter',
        description: `Wählen Sie die Rastergröße. 5×5 für Vorschul-Arbeitsblätter. 12×12 für die 1. Klasse. 20×20 für fortgeschrittene Schüler. Die Schwierigkeit passt sich an.

Aktivieren Sie diagonale Wörter für mehr Herausforderung. Deaktivieren Sie sie für einfachere kostenlose Arbeitsblätter. Rückwärts geschriebene Wörter sind optional. Jede Einstellung ändert die Schwierigkeit.

Wählen Sie Ihr Seitenformat. A4 oder Letter. Hochformat oder Querformat. Die Seitengröße beeinflusst die Lesbarkeit. Querformat eignet sich für größere Raster.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Suchsel generieren - Deutsch-Arbeitsblätter und Rechnen lernen 1. Klasse',
        description: `Klicken Sie auf "Generieren". Der Generator erstellt sofort Ihr Suchsel. Die Wörter werden automatisch im Raster platziert. Leere Felder werden mit Zufallsbuchstaben gefüllt.

Das Suchsel-Arbeitsblatt erscheint auf der Arbeitsfläche. Die Wortliste wird automatisch erstellt. Bilder oder Wörter erscheinen neben dem Raster. Alles ist sofort sichtbar.

Ein Lösungsblatt wird automatisch generiert. Die Wörter sind farblich markiert. Perfekt für schnelle Korrektur. Wechseln Sie zwischen Arbeitsblatt und Lösungsblatt mit einem Klick.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Arbeitsblatt bearbeiten - Schwungübungen und Ausmalbilder hinzufügen',
        description: `Passen Sie das Arbeitsblatt an Ihre Bedürfnisse an. Verschieben Sie das Raster per Drag & Drop. Vergrößern oder verkleinern Sie Elemente. Drehen Sie Objekte nach Belieben.

Fügen Sie eigene Texte hinzu. Schreiben Sie Überschriften oder Anweisungen. Wählen Sie aus 7 kindgerechten Schriftarten. Ändern Sie Schriftgröße und Farbe nach Wunsch.

Laden Sie eigene Bilder hoch. Kombinieren Sie kostenlose Arbeitsblätter mit persönlichen Fotos. Fügen Sie Rahmen und Hintergründe hinzu. Jedes Element ist individuell anpassbar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und drucken - Kostenlose Arbeitsblätter Grundschule und Buchstaben lernen',
        description: `Klicken Sie auf "Herunterladen". Wählen Sie zwischen JPEG und PDF. Beide Formate sind druckfertig. 300 DPI Qualität garantiert scharfe Ausdrucke.

Aktivieren Sie die Graustufen-Option. Spart Druckertinte bei farbigen Bildern. Ideal für große Klassensätze. Die Qualität bleibt erhalten.

Laden Sie das Arbeitsblatt herunter. Laden Sie auch das Lösungsblatt herunter. Drucken Sie beliebig viele Kopien. Jedes Arbeitsblatt ist sofort einsatzbereit für Ihre Klasse.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Suchsel Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrkräfte haben viele Fragen zum Suchsel Generator. Hier beantworten wir die wichtigsten Fragen. Von Einmaleins-Übungen bis Schwungübungen. Von Ausmalbildern bis Mathe-Arbeitsblättern.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [
      {
        id: 'faq-1',
        question: 'Welche Rastergr\u00f6\u00dfen bietet der Suchsel-Generator?',
        answer: 'Der Generator bietet Rastergr\u00f6\u00dfen von 5x5 bis 20x20. Ein 5x5 Raster eignet sich f\u00fcr Vorschul-Arbeitsbl\u00e4tter und Anf\u00e4nger beim Buchstaben lernen. 12x12 ist ideal f\u00fcr die 1. Klasse. Gr\u00f6\u00dfere Raster bis 20x20 fordern fortgeschrittene Sch\u00fcler mit mehr W\u00f6rtern und komplexeren Suchmustern heraus.',
      },
      {
        id: 'faq-2',
        question: 'Kann ich die Schwierigkeit des Suchsels anpassen?',
        answer: 'Ja, neben der Rastergr\u00f6\u00dfe k\u00f6nnen Sie diagonale und r\u00fcckw\u00e4rts geschriebene W\u00f6rter aktivieren oder deaktivieren. Ohne Diagonalen und R\u00fcckw\u00e4rtsw\u00f6rter sind die Suchsel einfacher \u2014 ideal f\u00fcr Vorschul-Arbeitsbl\u00e4tter. Mit diesen Optionen steigt die Herausforderung f\u00fcr \u00e4ltere Grundsch\u00fcler.',
      },
      {
        id: 'faq-3',
        question: 'Wie werden die W\u00f6rter f\u00fcr das Suchsel ausgew\u00e4hlt?',
        answer: 'W\u00e4hlen Sie ein Thema aus \u00fcber 50 Kategorien und der Generator w\u00e4hlt automatisch 8 passende Bilder mit deutschen W\u00f6rtern. Alternativ k\u00f6nnen Sie einzelne Bilder manuell aus der Bibliothek ausw\u00e4hlen oder die Suchfunktion f\u00fcr spezifische W\u00f6rter nutzen.',
      },
      {
        id: 'faq-4',
        question: 'Zeigt das Suchsel-Arbeitsblatt Bilder oder nur eine Wortliste?',
        answer: 'Die Wortliste kann mit Bildern oder als reine Textliste dargestellt werden. Bilder neben dem Raster helfen j\u00fcngeren Kindern beim Erkennen der gesuchten W\u00f6rter. Das kombiniert spielerisch Buchstaben lernen mit Wortschatz\u00fcbungen f\u00fcr Deutsch-Arbeitsbl\u00e4tter.',
      },
      {
        id: 'faq-5',
        question: 'Wird ein L\u00f6sungsblatt automatisch erstellt?',
        answer: 'Ja, ein L\u00f6sungsblatt wird bei jeder Generierung automatisch erstellt. Die W\u00f6rter sind farblich markiert f\u00fcr schnelle Korrektur. Sie k\u00f6nnen mit einem Klick zwischen Arbeitsblatt und L\u00f6sungsblatt wechseln und beide separat als PDF oder JPEG herunterladen.',
      },
      {
        id: 'faq-6',
        question: 'F\u00fcr welche F\u00e4cher eignen sich Suchsel-Arbeitsbl\u00e4tter?',
        answer: 'Suchsel eignen sich hervorragend f\u00fcr Deutsch-Arbeitsbl\u00e4tter und Buchstaben lernen. Durch thematische Bildauswahl k\u00f6nnen Sie sie auch f\u00fcr Sachunterricht, Fremdsprachen oder Vokabeltraining einsetzen. Der Generator funktioniert in 11 Sprachen, ideal f\u00fcr mehrsprachigen Unterricht.',
      },
      {
        id: 'faq-7',
        question: 'Kann ich eigene Bilder f\u00fcr die Wortsuche hochladen?',
        answer: 'Ja, Sie k\u00f6nnen eigene Bilder hochladen und mit der Bibliothek mit \u00fcber 3000 Motiven kombinieren. Laden Sie Klassenfotos, Sch\u00fclerzeichnungen oder fachspezifische Grafiken hoch. Jedes Element auf der Arbeitsfl\u00e4che ist individuell verschiebbar und skalierbar.',
      },
    ],

  },

  // Pricing - Word Search is FREE but needs subscription for no-watermark/commercial
  pricing: {
    title: 'Vollzugang',
    price: '144€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Arbeitsblatterstellung',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
      'Lösungsblätter inklusive',
    ],
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
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default wordSearchDeContent;
