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
    title: 'Kostenlose Mathe-Arbeitsblätter Grundschule | Mathe-Rätsel Generator',
    description: 'Erstellen Sie kostenlose Mathe-Arbeitsblätter für Grundschule und Vorschule. Mathe-Rätsel Generator mit Bildersymbolen. PDF-Download in unter 3 Minuten.',
    keywords: 'mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder, deutsch arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/math/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Mathe-Rätsel mit Symbolen für Rechnen lernen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/math/sample-2.jpeg',
        width: 3508,
        height: 2480,
        caption: 'Mathe-Arbeitsblätter Querformat - Visuelle Rechenaufgaben für Vorschul-Arbeitsblätter',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/math/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblätter Grundschule Mathematik - Rechnen 1. Klasse mit Bildsymbolen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/math/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblätter Grundschule Mathe-Rätsel - Rechnen 1. Klasse mit Symbolen und Gleichungen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/math/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Arbeitsblätter Mathematik Grundschule - Mathe-Arbeitsblätter zum Ausdrucken',
      },
    ],
  },

  // Hero Section - FULL text from mathe-arbeitsblätter.md paragraphs 1-4
  hero: {
    title: 'Mathe-Rätsel Generator',
    subtitle: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Rechnen lernen Vorschule',
    description: `Erstellen Sie professionelle Mathe-Arbeitsblätter mit visuellen Rechenrätseln. Unser Generator macht Rechnen lernen zum spannenden Abenteuer für Kinder. Mit Ihrem Basis-Paket Abo erstellen Sie unbegrenzt viele kostenlose Arbeitsblätter ohne Zusatzkosten. Perfekt für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule bis zur 2. Klasse.

Der Generator erstellt Mathe-Rätsel, bei denen Symbole Zahlen darstellen. Kinder lösen die Gleichungen und lernen spielerisch Rechnen. Jedes Rätsel kombiniert visuelle Elemente mit mathematischen Konzepten. Das fördert logisches Denken und Problemlösungskompetenz. Ideal für Rechnen 1. Klasse und frühe mathematische Förderung.

Sie wählen Schwierigkeitsstufen von sehr leicht bis schwer. Der Generator passt sich an das Niveau Ihrer Schüler an. Addition und Subtraktion sind als Rechenarten verfügbar. Sie bestimmen den Zahlenraum selbst. Wählen Sie aus über 3000 kindgerechten Bildern. Laden Sie eigene Bilder hoch für personalisierte Mathe-Arbeitsblätter.`,
    previewImageSrc: '/samples/german/math/sample-1.jpeg',
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
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/german/math/sample-1.jpeg',
        answerKeySrc: '/samples/german/math/sample-1.jpeg',
        altText: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Mathe-Rätsel mit Symbolen für Rechnen lernen',
        imageTitle: 'Kostenlose Mathe-Arbeitsblätter Grundschule',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/german/math/sample-2.jpeg',
        answerKeySrc: '/samples/german/math/sample-2.jpeg',
        altText: 'Mathe-Arbeitsblätter Querformat - Visuelle Rechenaufgaben für Vorschul-Arbeitsblätter',
        imageTitle: 'Mathe-Arbeitsblätter Querformat',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/german/math/sample-3.jpeg',
        answerKeySrc: '/samples/german/math/sample-3.jpeg',
        altText: 'Arbeitsblätter Grundschule Mathematik - Rechnen 1. Klasse mit Bildsymbolen',
        imageTitle: 'Arbeitsblätter Grundschule Mathematik',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/german/math/sample-4.jpeg',
        answerKeySrc: '/samples/german/math/sample-4.jpeg',
        altText: 'Arbeitsblätter Grundschule Mathe-Rätsel - Rechnen 1. Klasse mit Symbolen und Gleichungen',
        imageTitle: 'Arbeitsblätter Grundschule Mathe-Rätsel',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/german/math/sample-5.jpeg',
        answerKeySrc: '/samples/german/math/sample-5.jpeg',
        altText: 'Kostenlose Arbeitsblätter Mathematik Grundschule - Mathe-Arbeitsblätter zum Ausdrucken',
        imageTitle: 'Kostenlose Arbeitsblätter Mathematik Grundschule',
      },
    ],
    
  },

  // Features Grid - FULL text from mathe-arbeitsblätter.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Kostenlose Druckvorlagen und Arbeitsblatt für Vorschule',
    sectionDescription: 'Unser Generator bietet professionelle Funktionen für Lehrer und Eltern. Erstellen Sie Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter in wenigen Minuten. Alle Funktionen sind speziell für die Bedürfnisse der Grundschule entwickelt. Kombinieren Sie Rechnen lernen mit visuellen Elementen.',
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

  // How-To Guide - FULL text from mathe-arbeitsblätter.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Erstellen Sie professionelle Arbeitsblätter Grundschule in unter 3 Minuten. Folgen Sie diesen 5 einfachen Schritten. Kein Design-Wissen erforderlich. Perfekt für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter.',
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
        title: 'Bilder wählen - Thematische Mathe-Arbeitsblätter erstellen',
        description: `Wählen Sie zuerst zwischen zwei Methoden der Bildauswahl für Arbeitsblätter Grundschule. "Komplettes Thema verwenden" lädt automatisch alle Bilder eines Themas. "Bilder individuell auswählen" gibt Ihnen volle Kontrolle. Für schnelle Vorschul-Arbeitsblätter eignet sich die Themenwahl.

Bei der Themenwahl sehen Sie alle verfügbaren Kategorien für Mathe-Arbeitsblätter. Bauernhof, Tiere, Fahrzeuge, Essen und viele mehr. Der Generator wählt automatisch passende Bilder aus dem Thema. Sie müssen keine einzelnen Bilder suchen. Ideal wenn Sie schnell viele kostenlose Arbeitsblätter erstellen möchten.

Laden Sie auch eigene Bilder für Ihre Arbeitsblätter hoch. Klassenmaskottchen, Schülerfotos oder thematische Grafiken funktionieren perfekt. Kombinieren Sie Bibliotheksbilder mit eigenen Uploads. So entstehen einzigartige Mathe-Arbeitsblätter die Ihre Schüler wiedererkennen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schwierigkeit einstellen - Vorschule bis Grundschule anpassen',
        description: `Wählen Sie die Schwierigkeitsstufe passend zu Ihren Schülern für Vorschul-Arbeitsblätter. "Sehr leicht" und "Leicht" nutzen nur 2 Symbole. "Mittel" verwendet 3 Symbole für mehr Herausforderung. "Schwer" erstellt Rätsel mit 4 verschiedenen Symbolen für Arbeitsblätter Grundschule.

Legen Sie die Anzahl der Rechenrätsel pro Seite fest für Mathe-Arbeitsblätter. Wählen Sie zwischen 1 und 6 Aufgaben pro Arbeitsblatt. Für Vorschul-Arbeitsblätter empfehlen sich 1-2 Aufgaben. Für geübte Grundschüler können Sie 4-6 Rätsel einsetzen.

Bestimmen Sie die Rechenarten für Ihre kostenlose Arbeitsblätter. "Nur Addition" ist ideal für Anfänger und Vorschule. "Addition und Subtraktion" fordert fortgeschrittene Schüler. Definieren Sie den Zahlenraum mit Minimum- und Maximum-Werten für Rechnen lernen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generieren und Vorschau - Sofortiges Ergebnis für Arbeitsblätter Grundschule',
        description: `Klicken Sie auf "Erstellen" und Ihr Mathe-Rätsel Arbeitsblatt erscheint sofort auf der Arbeitsfläche für Mathe-Arbeitsblätter. Die Aufgaben werden automatisch mit Ihren gewählten Bildern und Einstellungen generiert. Das Lösungsblatt wird gleichzeitig erstellt.

Der Generator wählt zufällige Zahlenwerte im gewählten Bereich für Vorschul-Arbeitsblätter. Jedes Symbol erhält einen eindeutigen Wert. Die Gleichungen sind mathematisch korrekt konstruiert. Schüler können die Rätsel durch logisches Denken lösen.

Gefällt Ihnen das Ergebnis nicht für Ihre kostenlose Arbeitsblätter? Klicken Sie erneut auf "Generieren". Der Generator erstellt ein komplett neues Arbeitsblatt. Neue Zahlenwerte und neue Anordnung bei jedem Klick. Wählen Sie die beste Version für Ihre Klasse.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Auf der Arbeitsfläche bearbeiten - Vollständige Anpassung Ihrer Mathe-Arbeitsblätter',
        description: `Jetzt können Sie jedes Element individuell anpassen für Arbeitsblätter Grundschule. Klicken Sie auf Symbole um sie auszuwählen. Verschieben Sie sie mit der Maus an neue Positionen. Vergrößern oder verkleinern Sie Bilder nach Bedarf. Drehen Sie Elemente in beliebige Winkel.

Fügen Sie eigene Textelemente zu Ihren Mathe-Arbeitsblättern hinzu. Schreiben Sie Überschriften, Anweisungen oder Lerntipps. Wählen Sie Schriftart, Größe und Farbe frei. Positionieren Sie Texte genau wo Sie sie brauchen für Vorschul-Arbeitsblätter.

Ändern Sie Hintergründe und Rahmen nach Wunsch für kostenlose Arbeitsblätter. Wählen Sie aus thematischen Hintergrundbildern. Dekorative Rahmen verschönern Ihre Arbeitsblätter. Gestalten Sie visuell ansprechende Materialien die Schüler beim Rechnen lernen motivieren.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und Drucken - Professionelle Mathe-Arbeitsblätter',
        description: `Klicken Sie auf "Herunterladen" für Ihre fertigen Arbeitsblätter Grundschule. Wählen Sie zwischen PDF und JPEG Format. Beide exportieren in professioneller 300 DPI Auflösung. Aktivieren Sie die Graustufen-Option für Tintenersparnis bei farbigen Bildern.

Laden Sie sowohl das Arbeitsblatt als auch das Lösungsblatt herunter für Mathe-Arbeitsblätter. Beide Dateien sind druckbereit ohne weitere Bearbeitung. Perfekt formatiert für A4 oder Letter Papier. Drucken Sie beliebig viele Kopien für Ihre Klasse.

Mit dem Basis-Paket für 144 € jährlich erhalten Sie wasserzeichenfreie Downloads für Rechnen lernen. Kommerzielle Lizenz inklusive für den Verkauf Ihrer Arbeitsblätter auf Teachers Pay Teachers oder Etsy. Alle Arbeitsblätter haben professionelle Qualität.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from mathe-arbeitsblätter.md use case sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Mathe-Arbeitsblätter vom Generator passen zu vielen Lernsituationen. Vorschulpädagogen, Grundschullehrkräfte und Eltern profitieren gleichermaßen. Jede Zielgruppe hat spezifische Bedürfnisse beim Rechnen lernen.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from mathe-arbeitsblätter.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrkräfte und Eltern haben viele Fragen zum Mathe-Rätsel Generator und Basis-Paket Abonnement. Hier beantworten wir die häufigsten Fragen zu Arbeitsblätter Grundschule, Vorschul-Arbeitsblättern und kommerzieller Lizenzierung.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Math Worksheets is Basis-Paket ($144/year)
  pricing: {
    title: 'Basis-Paket',
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

  // Related Apps - Kombinieren Sie Mathe-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default mathWorksheetsDeContent;
