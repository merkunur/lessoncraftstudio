import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Draw and Color Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/draw-and-color-worksheets.ts
 * URL: /de/apps/rasterzeichnen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/draw-and-color.md
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

export const drawAndColorDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'rasterzeichnen-arbeitsblaetter',
    appId: 'draw-and-color',
    title: 'Rasterzeichnen Arbeitsblätter | Kostenlose Grundschule Malvorlagen',
    description: 'Erstellen Sie kostenlose Rasterzeichnen-Arbeitsblätter für Grundschule und Vorschule. 3000+ Bilder, 300 DPI Qualität. PDF-Download in unter 3 Minuten.',
    keywords: 'rasterzeichnen arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, malvorlagen, ausmalbilder, schwungübungen, buchstaben lernen, mathe arbeitsblätter, feinmotorik',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/rasterzeichnen-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/draw-and-color/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Rasterzeichnen-Arbeitsblatt kostenlos - Arbeitsblätter Grundschule zum Ausdrucken für Malvorlagen und Vorschule',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/draw-and-color/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Kostenlose Arbeitsblätter Rasterzeichnen - Arbeitsblatt für Kinder mit Ausmalbilder und Schwungübungen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/draw-and-color/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Vorschul-Arbeitsblätter Rasterzeichnen Generator - Kostenloses Arbeitsblatt für Kinder Feinmotorik',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/draw-and-color/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Rasterzeichnen Malvorlagen Arbeitsblatt - Kostenlose Druckvorlagen für Arbeitsblätter Grundschule',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/draw-and-color/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbeitsblatt für Vorschule Rasterzeichnen - Ausmalbilder und Schwungübungen kostenlos zum Ausdrucken',
      },
    ],
  },

  // Hero Section - FULL text from draw-and-color.md
  hero: {
    title: 'Rasterzeichnen',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Malvorlagen für Vorschule und Schwungübungen',
    description: `Erstellen Sie professionelle Rasterzeichnen-Arbeitsblätter mit unserem Generator. Mit Ihrem Vollzugriff Abonnement für 240 Euro im Jahr gestalten Sie unbegrenzt viele Arbeitsblätter. Kinder kopieren dabei ein Bild Zelle für Zelle in ein leeres Raster. Diese Übung trainiert räumliches Denken und fördert Feinmotorik. Perfekt für Schwungübungen und Vorschul-Arbeitsblätter. Laden Sie druckfertige PDF-Dateien in unter drei Minuten herunter.

Rasterzeichnen verbindet Kunst mit Mathematik. Kinder lernen, ein Bild systematisch zu analysieren. Sie übertragen jede Zelle einzeln auf ihr eigenes Raster. Diese Methode schult die visuelle Wahrnehmung. Sie fördert auch Konzentration und Geduld. Die fertigen Arbeitsblätter eignen sich als Ausmalbilder nach dem Zeichnen.

Unser Generator bietet über 3000 kindgerechte Bilder. Sie wählen ein Thema oder laden eigene Fotos hoch. Das System erstellt automatisch ein Hinweisraster. Dort sind einige Zellen bereits ausgefüllt. Kinder nutzen diese Hinweise zum Kopieren. Der Schwierigkeitsgrad lässt sich anpassen. Einfache Raster haben mehr Hinweiszellen. Schwierige Varianten zeigen weniger Hinweise.`,
    previewImageSrc: '/samples/german/draw-and-color/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/draw and color/
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
        worksheetSrc: '/samples/german/draw-and-color/sample-1.jpeg',
        answerKeySrc: '/samples/german/draw-and-color/sample-1.jpeg',
        altText: 'Rasterzeichnen-Arbeitsblatt kostenlos - Arbeitsblätter Grundschule zum Ausdrucken für Malvorlagen und Vorschule',
        imageTitle: 'Rasterzeichnen-Arbeitsblatt kostenlos',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/german/draw-and-color/sample-2.jpeg',
        answerKeySrc: '/samples/german/draw-and-color/sample-2.jpeg',
        altText: 'Kostenlose Arbeitsblätter Rasterzeichnen - Arbeitsblatt für Kinder mit Ausmalbilder und Schwungübungen',
        imageTitle: 'Kostenlose Arbeitsblätter Rasterzeichnen',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/german/draw-and-color/sample-3.jpeg',
        answerKeySrc: '/samples/german/draw-and-color/sample-3.jpeg',
        altText: 'Vorschul-Arbeitsblätter Rasterzeichnen Generator - Kostenloses Arbeitsblatt für Kinder Feinmotorik',
        imageTitle: 'Vorschul-Arbeitsblätter Rasterzeichnen Generator',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/german/draw-and-color/sample-4.jpeg',
        answerKeySrc: '/samples/german/draw-and-color/sample-4.jpeg',
        altText: 'Rasterzeichnen Malvorlagen Arbeitsblatt - Kostenlose Druckvorlagen für Arbeitsblätter Grundschule',
        imageTitle: 'Rasterzeichnen Malvorlagen Arbeitsblatt',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/german/draw-and-color/sample-5.jpeg',
        answerKeySrc: '/samples/german/draw-and-color/sample-5.jpeg',
        altText: 'Arbeitsblatt für Vorschule Rasterzeichnen - Ausmalbilder und Schwungübungen kostenlos zum Ausdrucken',
        imageTitle: 'Arbeitsblatt für Vorschule Rasterzeichnen',
      },
    ],
    
  },

  // Features Grid - FULL text from draw-and-color.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Rasterzeichnen-Generator bietet alles für professionelle Arbeitsblätter. Von der Bildauswahl bis zum fertigen PDF dauert es nur wenige Minuten. Jede Funktion wurde für Lehrkräfte und Eltern entwickelt. Sie brauchen keine Designkenntnisse. Der Generator übernimmt die technische Arbeit. Sie konzentrieren sich auf den pädagogischen Inhalt.',
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

  // How-To Guide - FULL text from draw-and-color.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Erstellen Sie professionelle Rasterzeichnen-Arbeitsblätter in nur fünf Schritten. Der gesamte Vorgang dauert unter drei Minuten. Keine Designkenntnisse erforderlich. Der Generator führt Sie durch jeden Schritt. Am Ende haben Sie druckfertige Arbeitsblätter Grundschule für Ihren Unterricht.',
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
        title: 'Schritt 1: Bild auswählen für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter - Thema oder eigenes Foto',
        description: `Beginnen Sie mit der Bildauswahl für Ihre Arbeitsblätter. Öffnen Sie den Bereich Bildbibliothek im linken Menü. Dort finden Sie über 3000 kindgerechte Grafiken. Wählen Sie zuerst ein Thema aus dem Dropdown-Menü. Tiere, Fahrzeuge, Lebensmittel und Natur stehen zur Verfügung.

Alternativ nutzen Sie die Suchfunktion. Geben Sie ein Stichwort ein. Die Ergebnisse erscheinen sofort. Klicken Sie auf das gewünschte Bild. Es erscheint im Vorschaubereich. Für Mathe-Arbeitsblätter wählen Sie Zahlenbilder. Für Vorschul-Arbeitsblätter eignen sich einfache Formen. Sie können auch eigene Bilder hochladen. Öffnen Sie dafür den Bereich Eigene Bilder hochladen. Der Generator akzeptiert JPEG, PNG und GIF Formate.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Rastereinstellungen für Schwungübungen und Buchstaben lernen anpassen - Arbeitsblätter Grundschule konfigurieren',
        description: `Passen Sie die Rastereinstellungen an Ihre Lernziele an. Öffnen Sie den Bereich Arbeitsblatt-Einstellungen. Hier finden Sie alle Optionen für Ihre Arbeitsblätter Grundschule. Die Reihenanzahl bestimmt die vertikale Unterteilung. Wählen Sie zwischen 3 und 10 Reihen. Die Spaltenanzahl legt die horizontale Unterteilung fest.

Für Schwungübungen und Feinmotorik-Training wählen Sie kleinere Raster. Ein 4x4 Raster eignet sich für Anfänger. Größere Raster mit 8x8 oder 10x10 Zellen fordern fortgeschrittene Kinder. Der Hinweiszellen-Regler bestimmt den Schwierigkeitsgrad. Mehr Hinweise bedeuten einfachere Aufgaben. Weniger Hinweise erhöhen die Herausforderung. Für Buchstaben lernen Übungen empfehlen wir mittlere Einstellungen.

Die Spiegelungsoption erstellt symmetrische Muster. Wählen Sie horizontal oder vertikal. Diese Funktion hilft bei der räumlichen Orientierung. Aktivieren Sie das Namens- und Datumsfeld für Klassenarbeitsblätter. So können Schüler ihre Arbeiten beschriften.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt erstellen mit Einmaleins und Rechnen lernen Themen - Kostenlose Arbeitsblätter generieren',
        description: `Klicken Sie auf den Erstellen-Button. Der Generator analysiert Ihr gewähltes Bild. Er erstellt automatisch das Hinweisraster. Einige Zellen zeigen bereits Teile des Bildes. Die restlichen Zellen bleiben leer. Kinder füllen diese beim Zeichnen aus.

Die Vorschau erscheint sofort auf der Arbeitsfläche. Überprüfen Sie das Ergebnis. Ist die Schwierigkeit angemessen? Sind genug Hinweiszellen sichtbar? Falls nicht, ändern Sie die Einstellungen. Klicken Sie erneut auf Erstellen. Der Generator aktualisiert das Arbeitsblatt. Für Einmaleins Themen wählen Sie Zahlenbilder. Für Rechnen lernen Arbeitsblätter eignen sich mathematische Symbole.

Das generierte Arbeitsblatt ist vollständig bearbeitbar. Sie können es nach Ihren Wünschen anpassen. Verschieben Sie Elemente bei Bedarf. Fügen Sie Texte oder Überschriften hinzu. Die Kostenlose Arbeitsblätter Funktion erstellt unbegrenzt viele Varianten.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Ausmalbilder und Malvorlagen auf der Arbeitsfläche bearbeiten - Deutsch-Arbeitsblätter personalisieren',
        description: `Bearbeiten Sie Ihr Arbeitsblatt auf der Arbeitsfläche. Klicken Sie auf ein Element zum Auswählen. Ziehen Sie es an die gewünschte Position. Verwenden Sie die Eckpunkte zum Skalieren. Der Rotationsgriff dreht das Element.

Fügen Sie Texte über den Bereich Textwerkzeuge hinzu. Geben Sie Ihre Überschrift ein. Wählen Sie Schriftart und Größe. Sieben kinderfreundliche Schriftarten stehen zur Verfügung. Die Konturenfarbe verbessert die Lesbarkeit. Positionieren Sie den Text auf dem Arbeitsblatt. Für Deutsch-Arbeitsblätter eignen sich deutsche Anweisungen.

Wählen Sie einen Rahmen aus dem Bereich Seiteneinrichtung. Rahmen machen Ausmalbilder und Malvorlagen attraktiver. Auch Hintergründe lassen sich hinzufügen. Die Deckkraft ist einstellbar. Das Rückgängig-System speichert 20 Schritte. Korrigieren Sie Fehler jederzeit mit einem Klick.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Rechen-Arbeitsblätter für die 1. Klasse und Vorschul-Arbeitsblätter herunterladen - PDF oder JPEG Export',
        description: `Laden Sie Ihr fertiges Arbeitsblatt herunter. Klicken Sie auf den Download-Button oben rechts. Ein Dropdown-Menü öffnet sich. Wählen Sie zwischen PDF und JPEG Format. PDF eignet sich für den professionellen Druck. JPEG ist ideal für digitale Verwendung.

Aktivieren Sie die Graustufen-Option bei Bedarf. Schwarzweiße Rechen-Arbeitsblätter für die 1. Klasse sparen Druckertinte. Die Qualität bleibt bei 300 DPI erhalten. Diese Auflösung garantiert scharfe Linien. Drucken Sie die Vorschul-Arbeitsblätter zu Hause oder im Copyshop. Die Dateien sind sofort einsatzbereit.

Speichern Sie das Arbeitsblatt auf Ihrem Computer. Drucken Sie es für Ihre Klasse aus. Oder verkaufen Sie es auf Lehrerplattformen. Die kommerzielle Lizenz ist im Vollzugriff Abonnement enthalten. Erstellen Sie unbegrenzt viele Arbeitsblätter. Der Generator steht Ihnen jederzeit zur Verfügung.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from draw-and-color.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Rasterzeichnen-Arbeitsblätter eignen sich für viele Zielgruppen. Lehrkräfte an Grundschulen nutzen sie täglich. Erzieher in der Vorschule schätzen die Feinmotorik-Förderung. Eltern erstellen Übungsmaterial für zu Hause. Der Generator passt sich allen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from draw-and-color.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Hier beantworten wir die wichtigsten Fragen zum Rasterzeichnen-Generator. Diese Informationen helfen bei der Entscheidung für das richtige Werkzeug. Kontaktieren Sie uns gerne für weitere Fragen.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Vollzugriff pricing (240€/year)
  pricing: {
    title: 'Vollzugriff',
    price: '240€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Unbegrenzte Arbeitsblatterstellung',
      'Alle 33 Apps inklusive',
      'Kommerzielle Lizenz inklusive',
      '11 Sprachen unterstützt',
      '3000+ thematische Bilder',
      '300 DPI Druckqualität',
      'Lösungsblätter inklusive',
    ],
    ctaText: 'Jetzt Erstellen',
    bundleDescription: 'Ihr Abonnement umfasst Zugriff auf alle 33 Arbeitsblatt-Generatoren:',
    bundleApps: [
      'Bildzusatz',
      'Alphabet-Zug',
      'Groß oder Klein',
      'Bilder-Bingo',
      'Bilddiagramm',
      'Code Addition',
      'Malvorlagen',
      'Kreuzworträtsel',
      'Kryptogramm',
      'Malen und Zeichnen',
      'Linien Zeichnen',
      'Finden und Zählen',
      'Suchbilder',
      'Raster-Puzzle',
      'Zuordnungsspiel',
      'Mathe-Rätsel',
      'Mathe-Arbeitsblätter',
      'Fehlende Teile',
      'Mehr oder Weniger',
      'Was passt nicht',
      'Muster-Zug',
      'Muster-Arbeitsblatt',
      'Bilderpfad',
      'Bilder Sortieren',
      'Präpositionen',
      'Schattenbilder',
      'Subtraktion',
      'Sudoku',
      'Schatzsuche',
      'Wörter Raten',
      'Wortsalat',
      'Wortsuche',
      'Schreibübungen',
    ],
  },

  // Related Apps - Apps that work well with draw-and-color
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Kombinieren Sie Rasterzeichnen mit anderen Arbeitsblatt-Generatoren. Das Vollzugriff Abonnement enthält alle 33 Apps. So entstehen umfassende Lernpakete für jeden Bedarf. Thematisch abgestimmte Materialien verstärken den Lerneffekt. Kinder arbeiten motivierter mit vielfältigen Aufgabentypen.',
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

export default drawAndColorDeContent;
