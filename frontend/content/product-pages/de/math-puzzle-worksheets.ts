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
    title: 'Mathe-Rätsel Arbeitsblätter | Kostenloser Generator - LessonCraft',
    description: 'Erstellen Sie Mathe-Rätsel Arbeitsblätter in 3 Minuten. Perfekt für Grundschule und Vorschule. 3000+ Bilder, Lösungsblätter inklusive. Jetzt kostenlos testen!',
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
    previewImageSrc: '/samples/german/math puzzle/sample-1.jpeg',
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
        videoId: 'n5QO39Lq5l8',
        buttonText: 'Mathe-Rätsel Funktionen',
        modalTitle: 'Mathe-Rätsel Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
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

  // Features Grid - FULL text from mathe-raetsel.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Mathe-Rätsel Generator bietet alle professionellen Funktionen die Erzieher und Grundschullehrer benötigen. Erstellen Sie Mathe Arbeitsblätter, Rechnen lernen Aktivitäten und Vorschule Arbeitsblätter mit spielerischen Bilderrätsel. Jede Funktion wurde für schnelle Arbeitsblatt-Erstellung bei voller Bearbeitungskontrolle entwickelt.',
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

  // How-To Guide - FULL text from mathe-raetsel.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Folgen Sie diesen fünf einfachen Schritten um professionelle Mathe-Rätsel Arbeitsblätter in unter 3 Minuten zu erstellen. Diese Anleitung zeigt Ihnen wie Sie kostenlose Arbeitsblätter perfekt für Rechnen lernen, Vorschule Arbeitsblätter und Arbeitsblätter Grundschule erstellen.',
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
        title: 'Schritt 1: Thema und Bild wählen für Mathe Arbeitsblätter - Kostenlose Arbeitsblätter mit 3000+ Bildern',
        description: `Öffnen Sie den Mathe-Rätsel Generator in Ihrem Browser. Die Bildbibliothek zeigt automatisch verfügbare Themen mit über 3000 kinderfreundlichen Illustrationen. Wählen Sie eine Kategorie wie Tiere, Fahrzeuge oder Jahreszeiten. Alternativ nutzen Sie die Suchfunktion für bestimmte Bilder. Geben Sie zum Beispiel "Hund" oder "Apfel" ein. Die passenden Bilder erscheinen sofort.

Klicken Sie auf das gewünschte Bild zur Auswahl für Ihr Mathe-Rätsel. Das ausgewählte Bild wird für Ihr Arbeitsblätter Grundschule verwendet. Tierbilder sind bei Kindern besonders beliebt. Hunde, Katzen, Elefanten und viele mehr stehen zur Verfügung. Jedes Tier kann zum Mathe-Rätsel werden.

Für personalisierte Vorschule Arbeitsblätter laden Sie eigene Bilder hoch. Klassenfotos oder Schullogos machen Mathe Arbeitsblätter einzigartig. Die bunten Illustrationen motivieren zum Rechnen lernen mit Begeisterung.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Rastergröße und Rechenart einstellen - Mathe Arbeitsblätter für jede Klassenstufe',
        description: `Wählen Sie die Anzahl der Zeilen und Spalten für Ihr Mathe-Rätsel Raster. Optionen reichen von 2×2 bis 4×4 Felder für verschiedene Schwierigkeitsgrade. Ein 2×2 Raster enthält 4 Rechenaufgaben für Vorschule. Ein 4×4 Raster enthält 16 Aufgaben für fortgeschrittene Schüler. Passen Sie den Schwierigkeitsgrad an Ihre Schüler an.

Wählen Sie dann die Rechenart aus dem Dropdown-Menü für Ihre Arbeitsblätter Grundschule. Drei Optionen stehen zur Verfügung: Addition für einfache Plusaufgaben. Subtraktion für Minusaufgaben. Gemischt für beide Rechenarten zusammen. Für die Vorschule Arbeitsblätter empfehlen wir Addition mit kleinem Raster. Für Rechnen 1. Klasse eignet sich die gemischte Option.

Höhere Klassenstufen meistern größere Raster problemlos. Der Generator erstellt altersgerechte Aufgaben automatisch. Für jüngere Kinder bleiben die Zahlen im kleinen Bereich. Keine negativen Ergebnisse bei der Subtraktion für Mathe Arbeitsblätter.`,
        icon: '📐',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt generieren - Kostenlose Arbeitsblätter mit einem Klick erstellen',
        description: `Klicken Sie auf den "Erstellen" Button und Ihr Mathe-Rätsel erscheint sofort auf der Leinwand. Der Generator erstellt Ihr Arbeitsblatt automatisch in wenigen Sekunden. Jedes Feld enthält das gewählte Bild mit einer Rechenaufgabe. Die Zahlen werden zufällig generiert für einzigartige Arbeitsblätter Grundschule. Bei jedem Klick entsteht ein neues Rätsel.

Das Arbeitsblatt zeigt Ihr gewähltes Bild aufgeteilt in Rasterfelder. Schüler lösen die Rechenaufgaben und vervollständigen das Bilderrätsel. Die richtigen Lösungen ergeben das versteckte Bild. Das motiviert Kinder zum Weiterrechnen und macht Rechnen lernen zum Abenteuer.

Zeigen Sie eine Vorschau Ihres generierten Mathe-Rätsels vor dem Download. Überprüfen Sie dass alle Aufgaben für Ihre Vorschule Arbeitsblätter oder Mathe Arbeitsblätter klar sichtbar sind. Das Lösungsblatt wird mit einem zusätzlichen Klick generiert für schnelle Korrektur.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Arbeitsblatt bearbeiten und anpassen - Arbeitsblätter Grundschule individualisieren',
        description: `Nach der Generierung können Sie alles auf Ihrem Mathe-Rätsel bearbeiten. Verschieben Sie Elemente per Drag-and-Drop an neue Positionen. Drehen Sie Bilder mit den Anfassern nach Bedarf. Vergrößern oder verkleinern Sie jeden Bestandteil für optimales Layout. Fügen Sie eigene Texte hinzu für Anweisungen oder Schülernamen auf Vorschule Arbeitsblätter.

Wählen Sie einen thematischen Hintergrund aus der Bibliothek für Arbeitsblätter Grundschule. Saisonale Designs für Weihnachten, Ostern oder Herbst verfügbar. Rahmen verleihen Ihrem Arbeitsblatt einen fertigen professionellen Look. Passen Sie die Deckkraft für subtile Effekte an. Alle Designelemente sind in Ihrem Abonnement enthalten.

Das Bearbeiten macht jedes Mathe Arbeitsblatt einzigartig für differenzierten Unterricht. Schnelle Schüler bekommen größere Raster. Langsamere Schüler arbeiten mit kleineren Aufgabenmengen. Differenzierung ohne zusätzlichen Zeitaufwand für Rechnen lernen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Herunterladen und Drucken - Mathe Arbeitsblätter als PDF oder JPEG speichern',
        description: `Klicken Sie auf "Download" für Ihre fertigen Mathe-Rätsel Arbeitsblätter. Wählen Sie zwischen PDF und JPEG Format für verschiedene Verwendungszwecke. PDF eignet sich perfekt für den Druck von Arbeitsblätter Grundschule. JPEG ist ideal für digitale Verwendung und Online-Sharing. Aktivieren Sie die Graustufen-Option um Druckertinte zu sparen.

Alle Downloads erfolgen in 300 DPI Auflösung für gestochen scharfe Qualität. Diese Auflösung ist perfekt für den Klassenzimmer-Druck. Scharfe Linien und klare Bilder auf jedem Drucker. Letter und A4 Formate stehen zur Verfügung. Hochformat oder Querformat nach Wahl für Vorschule Arbeitsblätter.

Laden Sie Arbeitsblatt und Lösungsblatt separat herunter für Ihre Unterlagen. Das Lösungsblatt zeigt alle richtigen Antworten. Gleiche Qualität und Format wie das Arbeitsblatt. Perfekt für die schnelle Korrektur im Klassenzimmer. Drucken Sie so viele Kopien wie Sie benötigen für Mathe Arbeitsblätter.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from mathe-raetsel.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Mathe-Rätsel Arbeitsblätter eignen sich für verschiedene Zielgruppen und Bildungsumgebungen. Erzieher nutzen sie für spielerisches Lernen in der Vorschule. Grundschullehrer setzen sie für differenzierten Unterricht ein. Eltern unterstützen ihre Kinder beim Lernen zu Hause mit Mathe Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from mathe-raetsel.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrer und Eltern stellen häufige Fragen über Mathe-Rätsel Arbeitsblätter bevor sie den Generator ausprobieren. Diese Antworten liefern klare ehrliche Information über Abonnement-Anforderungen, Druckoptionen und Anpassungsfähigkeiten.',
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

  // Related Apps - Apps that work well with math puzzle
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default mathPuzzleDeContent;
