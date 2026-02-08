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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'So einfach geht\'s',
        modalTitle: 'Funktionen im Überblick',
      },
      appSpecific: {
        videoId: '-JIawojGNr0',
        buttonText: 'Mathe-Arbeitsblätter Funktionen',
        modalTitle: 'Mathe-Arbeitsblätter Anleitung',
      },
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
    items: [],
    
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
    items: [
      {
        id: 'faq-1',
        question: 'Wie funktionieren die Mathe-R\u00e4tsel mit Bildsymbolen?',
        answer: 'Der Generator erstellt R\u00e4tsel, bei denen Symbole wie Tiere oder Gegenst\u00e4nde f\u00fcr Zahlen stehen. Kinder l\u00f6sen die Gleichungen und finden den Wert jedes Symbols. Das f\u00f6rdert logisches Denken und Probleml\u00f6sungskompetenz und macht Rechnen lernen spielerisch.',
      },
      {
        id: 'faq-2',
        question: 'Welche Schwierigkeitsstufen bieten die Mathe-Arbeitsbl\u00e4tter?',
        answer: 'Es gibt vier Schwierigkeitsstufen: Sehr leicht und Leicht mit 2 Symbolen, Mittel mit 3 Symbolen und Schwer mit 4 verschiedenen Symbolen. Die Anzahl der Aufgaben pro Seite (1-6) ist ebenfalls einstellbar. So passen Sie die Arbeitsbl\u00e4tter perfekt an jede Klassenstufe an.',
      },
      {
        id: 'faq-3',
        question: 'F\u00fcr welche Klassenstufen eignen sich die Mathe-Arbeitsbl\u00e4tter?',
        answer: 'Die Arbeitsbl\u00e4tter eignen sich f\u00fcr Vorschule bis zur 2. Klasse. Vorsch\u00fcler beginnen mit sehr leichten R\u00e4tseln und reiner Addition. Erste Klasse verwendet die mittlere Schwierigkeit. Die schwere Stufe mit Addition und Subtraktion fordert ge\u00fcbte Grundsch\u00fcler.',
      },
      {
        id: 'faq-4',
        question: 'Kann ich den Zahlenraum f\u00fcr Rechnen 1. Klasse selbst bestimmen?',
        answer: 'Ja, Sie definieren den Zahlenraum mit Minimum- und Maximum-Werten. F\u00fcr Vorschule Arbeitsbl\u00e4tter begrenzen Sie auf Zahlen bis 10. F\u00fcr Rechnen 1. Klasse erweitern Sie den Bereich nach Bedarf. Der Generator erstellt automatisch altersgerechte Aufgaben.',
      },
      {
        id: 'faq-5',
        question: 'Wie kann ich die Bilder f\u00fcr die Mathe-R\u00e4tsel ausw\u00e4hlen?',
        answer: 'Sie haben zwei Methoden: Komplettes Thema verwenden l\u00e4dt automatisch alle Bilder eines Themas wie Bauernhof, Tiere oder Fahrzeuge. Bilder individuell ausw\u00e4hlen gibt Ihnen volle Kontrolle aus der Bibliothek mit \u00fcber 3000 Bildern. Eigene Bilder k\u00f6nnen ebenfalls hochgeladen werden.',
      },
      {
        id: 'faq-6',
        question: 'Wird ein L\u00f6sungsblatt f\u00fcr die Mathe-R\u00e4tsel mitgeliefert?',
        answer: 'Ja, das L\u00f6sungsblatt wird automatisch erstellt und zeigt alle richtigen Symbolwerte und L\u00f6sungen. Arbeitsblatt und L\u00f6sungsblatt werden separat als PDF oder JPEG in 300 DPI Qualit\u00e4t heruntergeladen. Das spart Lehrkr\u00e4ften wertvolle Korrekturzeit.',
      },
      {
        id: 'faq-7',
        question: 'Was kostet das Basis-Paket f\u00fcr den Mathe-R\u00e4tsel Generator?',
        answer: 'Das Basis-Paket kostet 144\u20ac pro Jahr und beinhaltet unbegrenzte Arbeitsblatterstellung mit allen Schwierigkeitsstufen und Rechenarten. Zus\u00e4tzlich erhalten Sie 10 Arbeitsblatt-Generatoren, \u00fcber 3000 Bilder, 11 Sprachen und eine kommerzielle Lizenz f\u00fcr den Verkauf auf Teachers Pay Teachers.',
      },
    ],

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
