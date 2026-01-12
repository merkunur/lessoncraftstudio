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
    previewImageSrc: '/samples/english/math puzzle/worksheet.jpeg',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/math puzzle/worksheet.jpeg',
        answerKeySrc: '/samples/english/math puzzle/answer_key.jpeg',
        altText: 'Mathe-Rätsel Arbeitsblatt für Rechnen lernen und Arbeitsblätter Grundschule',
        pdfDownloadUrl: '/samples/english/math puzzle/worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/math puzzle/worksheet (1).jpeg',
        answerKeySrc: '/samples/english/math puzzle/answer_key (1).jpeg',
        altText: 'Arbeitsblätter Grundschule Mathe-Rätsel mit Bilderrätsel für Vorschule',
        pdfDownloadUrl: '/samples/english/math puzzle/worksheet (1).pdf',
      },
    ],
  },

  // Features Grid - FULL text from mathe-raetsel.md feature sections
  features: {
    sectionTitle: 'Mathe-Rätsel Funktionen - Alles für kostenlose Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Rechnen lernen',
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
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Mathe Arbeitsblätter in 3 Klicks erstellen - Schneller Generator für Arbeitsblätter Grundschule und Rechnen lernen',
        description: `Die Erstellung eines Mathe-Rätsels dauert nur wenige Sekunden. Wählen Sie ein Thema aus der Bildbibliothek mit über 3000 kinderfreundlichen Illustrationen. Klicken Sie auf ein Bild Ihrer Wahl aus Kategorien wie Tiere, Fahrzeuge, Lebensmittel oder Feiertage. Klicken Sie auf "Erstellen" und Ihr Arbeitsblatt ist fertig. Der Generator erstellt automatisch passende Rechenaufgaben für das Raster.

Der Generator erstellt altersgerechte Aufgaben für Ihre Mathe Arbeitsblätter. Für jüngere Kinder bleiben die Zahlen im kleinen Bereich. Für ältere Schüler werden größere Zahlen verwendet. Alle Aufgaben sind immer lösbar mit keinen negativen Ergebnissen bei der Subtraktion. Perfekt abgestimmt auf das Rechnen lernen in der Grundschule.

Diese Ein-Klick-Generierung spart Vorbereitungszeit für Arbeitsblätter Grundschule. Erstellen Sie 10 verschiedene Mathe-Rätsel in der Zeit die Sie früher für eines brauchten. Ideal für Vorschule Arbeitsblätter und Rechnen 1. Klasse die schnell fertig sein müssen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Kostenlose Arbeitsblätter vollständig bearbeiten - Jedes Element auf der Leinwand für Mathe Arbeitsblätter anpassen',
        description: `Jedes erstellte Arbeitsblatt kann vollständig bearbeitet werden für individuelle Mathe Arbeitsblätter. Verschieben Sie Bilder mit der Maus an neue Positionen. Drehen Sie Elemente nach Bedarf mit den Anfassern. Vergrößern oder verkleinern Sie jeden Bestandteil. Löschen Sie nicht benötigte Elemente. Die Leinwand bietet volle Kontrolle über Ihr Arbeitsblätter Grundschule Design.

Fügen Sie eigene Texte hinzu für Anweisungen oder Schülernamen. Wählen Sie aus 7 verschiedenen Schriftarten für professionelles Erscheinungsbild. Passen Sie Farben und Größen nach Bedarf an. Sperren Sie Elemente wenn Ihr Layout fertig ist. Gesperrte Objekte bewegen sich nicht versehentlich.

Das Bearbeiten auf der Leinwand macht jedes Mathe-Rätsel Arbeitsblatt einzigartig. Perfekt für differenzierten Unterricht in heterogenen Klassen. Schnelle Schüler bekommen größere Raster. Langsamere Schüler arbeiten mit kleineren Aufgabenmengen. Differenzierung ohne zusätzlichen Zeitaufwand für Vorschule Arbeitsblätter.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen für Mathe Arbeitsblätter - Personalisierte Arbeitsblätter Grundschule erstellen',
        description: `Laden Sie Ihre eigenen Bilder hoch für einzigartige Mathe-Rätsel Arbeitsblätter. Der Generator unterstützt JPEG, PNG und GIF Formate. Mehrere Dateien können gleichzeitig hochgeladen werden. Kombinieren Sie eigene Bilder mit unserer Bibliothek. Perfekt für personalisierte Arbeitsblätter Grundschule mit Klassenfotos oder Schullogo.

Eigene Bilder ermöglichen hochspezifische Rechnen lernen Arbeitsblätter. Laden Sie Fotos von Klassenzimmerobjekten für themenspezifische Mathe-Rätsel hoch. Verwenden Sie Klassenfotos für personalisierte Übungen. Erstellen Sie Mathe Arbeitsblätter passend zu jedem Unterrichtsthema.

Diese Funktion macht Vorschule Arbeitsblätter besonders ansprechend. Kinder erkennen vertraute Bilder aus ihrem Alltag. Die persönliche Verbindung steigert Motivation und Engagement. Perfekt für differenzierte Arbeitsblätter Grundschule mit individuellen Bildsets für Rechnen 1. Klasse.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Mathe Arbeitsblätter in 11 Sprachen - Rechnen lernen für internationale Schulen und bilinguale Klassen',
        description: `Unser Mathe-Rätsel Generator unterstützt 11 Sprachen für mehrsprachige Klassenzimmer. Erstellen Sie Arbeitsblätter auf Deutsch, Englisch, Spanisch, Französisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch oder Finnisch. Die Bildnamen werden in der gewählten Sprache angezeigt.

Internationale Schulen und bilinguale Klassen profitieren besonders von dieser Funktion. Erstellen Sie passende Vorschule Arbeitsblätter auf Deutsch und der Herkunftssprache. Schüler mit Deutsch als Zweitsprache lernen Mathematik in ihrer Muttersprache. Das Einmaleins wird verständlicher mit vertrauten Begriffen.

Die Sprachunterstützung erstreckt sich auf die gesamte Benutzeroberfläche. Arbeitsblatt-Überschriften erscheinen in Ihrer gewählten Sprache. So entstehen authentische Mathe Arbeitsblätter für den mehrsprachigen Unterricht. Der Übergang zu deutschsprachigen Materialien erfolgt schrittweise für Arbeitsblätter Grundschule.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz für Mathe Arbeitsblätter und Einmaleins Übungen - Auf Lehrermarktplatz verkaufen',
        description: `Das Vollzugriff Abonnement enthält eine vollständige kommerzielle Print-on-Demand Lizenz ohne Zusatzkosten. Verkaufen Sie Ihre Mathe-Rätsel Arbeitsblätter auf Plattformen wie Etsy, Lehrermarktplatz oder Amazon KDP. Erstellen Sie Vorschule Arbeitsblätter Pakete für passives Einkommen. Generieren Sie Arbeitsblätter Grundschule Sammlungen für Lehrplan-Marktplätze. Keine Namensnennung erforderlich.

Diese kommerzielle Lizenz macht unseren Generator wertvoll für Lehrer-Unternehmer. Erstellen Sie thematische Mathe Arbeitsblätter Pakete für saisonale Verkäufe. Entwickeln Sie umfassende Rechnen lernen Sammlungen für den Schuljahresbeginn. Bündeln Sie Einmaleins Übungen mit Mathe-Rätseln für höherwertige Produkte.

Viele Lehrer erwirtschaften mit digitalen Produkten ein Nebeneinkommen. Monatliche Einnahmen von 500€ bis 5000€ sind realistisch. Das Abonnement amortisiert sich schnell. Aus Unterrichtsvorbereitung wird passive Einnahmequelle für kostenlose Arbeitsblätter Produkte.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder für Arbeitsblätter Grundschule und Rechnen lernen - Thematisch sortierte Bildbibliothek',
        description: `Die Bildbibliothek enthält über 3000 kinderfreundliche Illustrationen für Ihre Mathe-Rätsel. Alle Bilder sind thematisch sortiert für schnelles Finden. Tiere, Fahrzeuge, Lebensmittel, Feiertage und viele weitere Kategorien. Die Suchfunktion findet passende Bilder in Sekundenschnelle. Jedes Bild eignet sich perfekt für Arbeitsblätter Grundschule.

Tierbilder sind bei Kindern besonders beliebt für Rechnen lernen. Hunde, Katzen, Elefanten und viele mehr stehen zur Verfügung. Jedes Tier kann zum Mathe-Rätsel werden. Die bunten Illustrationen motivieren zum Rechnen. Kinder lösen die Aufgaben mit mehr Begeisterung.

Die Themen-Organisation beschleunigt die Arbeitsblatt-Erstellung für Vorschule Arbeitsblätter. Wählen Sie saisonale Designs für Weihnachten, Ostern oder Herbst. Die Bildsuche funktioniert in Ihrer gewählten Sprache. Perfekt für Mathe Arbeitsblätter und Einmaleins Aktivitäten das ganze Jahr über.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität für Arbeitsblätter zum Ausdrucken - Druckfertige PDF und JPEG Exporte',
        description: `Alle Downloads erfolgen in professioneller 300 DPI Auflösung für gestochen scharfen Druck. Laden Sie als PDF für perfekte Druckqualität oder JPEG für digitale Verteilung herunter. Die Graustufen-Option reduziert Druckkosten erheblich bei professionellem Erscheinungsbild. Jeder Export erstellt druckfertige Arbeitsblätter Grundschule und Vorschule Arbeitsblätter.

Letter und A4 Formate stehen zur Verfügung für internationale Nutzung. Hochformat oder Querformat nach Wahl. Drucken Sie so viele Kopien wie Sie benötigen für Klassensätze. Scharfe Linien und klare Bilder auf jedem Drucker. Die Qualität erfüllt kommerzielle Anforderungen für den Verkauf.

PDF-Export bewahrt exaktes Layout und Formatierung auf allen Geräten. Teilen Sie Arbeitsblätter mit Kollegen im Wissen dass sie identisch drucken. Laden Sie in Lernplattformen ohne Qualitätsverlust hoch. Erstellen Sie Arbeitsblatt-Bibliotheken mit einheitlichem Erscheinungsbild für Mathe Arbeitsblätter und Rechnen lernen Materialien.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from mathe-raetsel.md step sections
  howTo: {
    sectionTitle: 'Mathe-Rätsel erstellen in 5 einfachen Schritten - Anleitung für Arbeitsblätter Grundschule, Mathe Arbeitsblätter und Rechnen lernen',
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
    sectionTitle: 'Perfekt für Lehrer, Eltern und Pädagogen - Kostenlose Arbeitsblätter für Rechnen lernen, Einmaleins und Vorschule',
    sectionDescription: 'Mathe-Rätsel Arbeitsblätter eignen sich für verschiedene Zielgruppen und Bildungsumgebungen. Erzieher nutzen sie für spielerisches Lernen in der Vorschule. Grundschullehrer setzen sie für differenzierten Unterricht ein. Eltern unterstützen ihre Kinder beim Lernen zu Hause mit Mathe Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in der Vorschule - Vorschule Arbeitsblätter für erste Rechenübungen und spielerisches Lernen',
        subtitle: 'Vorschul-Arbeitsblätter und mathematische Frühförderung',
        description: `Erzieherinnen und Erzieher in Kindertagesstätten nutzen unsere Mathe-Rätsel für spielerisches Lernen. Vorschule Arbeitsblätter mit einfachen Additionsaufgaben bereiten auf die Schule vor. Die bunten Bilder halten die Aufmerksamkeit der Kinder. Ein 2×2 Raster ist ideal für Vorschulkinder. Das Rechnen lernen wird zum Abenteuer.

Erstellen Sie wöchentliche thematische Mathe-Rätsel passend zu Ihrem Kitathema. Unterrichten Sie diese Woche Bauernhoftiere? Generieren Sie Rätsel mit Kuh, Schwein und Huhn Bildern. Studieren Sie nächste Woche Wetter? Erstellen Sie Rätsel mit Sonne, Wolke und Regen. Die thematische Verbindung verstärkt das Verständnis.

Auch für die Vorschule eignen sich unsere Mathe-Rätsel hervorragend. Einfache Additionsaufgaben im Zahlenraum bis 10 fördern das erste Rechnenverständnis. Das bunte Bilderrätsel motiviert die Kinder zum Weiterrechnen. Jedes gelöste Feld bringt sie dem fertigen Bild näher für Arbeitsblätter Grundschule Vorbereitung.`,
        quote: 'Meine Vorschulkinder lieben es, die Bilder durch Rechnen zu entdecken!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer 1. bis 3. Klasse - Arbeitsblätter Grundschule für Rechnen lernen und Mathe Arbeitsblätter',
        subtitle: 'Arbeitsblätter Grundschule für Addition und Subtraktion',
        description: `Lehrerinnen und Lehrer der Grundschule setzen Mathe-Rätsel vielfältig ein für differenzierten Unterricht. Für die 1. Klasse als Einführung in Addition mit einfachen Bilderrätsel. Für die 2. Klasse mit gemischten Rechenarten und größeren Rastern. Für die 3. Klasse mit anspruchsvolleren Aufgaben. Die Arbeitsblätter Grundschule ergänzen den regulären Unterricht perfekt.

Während Übungsphasen oder Freiarbeit bieten Mathe-Rätsel ideale Beschäftigung. Schüler arbeiten selbstständig an ihren Aufgaben. Die Lösungsblätter ermöglichen Selbstkontrolle. Das Einmaleins und die Grundrechenarten werden spielerisch gefestigt. Perfekt für heterogene Klassen mit unterschiedlichen Lernniveaus.

Verwenden Sie Mathe-Rätsel als Frühfertig-Aktivitäten für schnelle Lerner. Halten Sie einen Ordner vorgefertigter Rätsel bei verschiedenen Schwierigkeiten bereit. Schüler die zugewiesene Arbeit vervollständigen wählen ein Mathe-Rätsel. Dies hält fortgeschrittene Schüler beschäftigt während Sie mit anderen für Rechnen 1. Klasse arbeiten.`,
        quote: 'Perfekte Frühfertig-Aktivität für differenzierten Mathe-Unterricht!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Eltern für das Lernen zu Hause - Kostenlose Arbeitsblätter für Hausaufgaben und Ferienübungen',
        subtitle: 'Rechnen lernen und Homeschooling-Material',
        description: `Eltern unterstützen ihre Kinder mit unseren Mathe Arbeitsblättern beim Lernen zu Hause. Die Rätsel machen Hausaufgaben interessanter und motivierender. Zusätzliche Übung festigt den Schulstoff nachhaltig. Ferienzeit wird zur produktiven Lernzeit ohne Langeweile. Kein pädagogisches Vorwissen erforderlich für Vorschule Arbeitsblätter.

Eltern die mehrere Kinder in verschiedenen Klassenstufen betreuen profitieren von der Flexibilität. Erstellen Sie einfache Rätsel für Ihren Vorschüler mit 2×2 Raster. Ihr Drittklässler arbeitet an komplexeren 4×4 Rätseln. Beide Kinder engagieren sich mit demselben Aktivitätstyp auf unterschiedlichen Niveaus. Diese parallele Struktur maximiert begrenzte Lernzeit.

Viele Eltern nutzen unsere Plattform für umfassende Förderung zu Hause. Schwungübungen trainieren die Feinmotorik vor dem Schreiben. Buchstaben lernen bereitet auf den Deutschunterricht vor. Mathe-Rätsel fördern logisches Denken und Rechnen lernen. Alle Arbeitsblätter Grundschule können thematisch kombiniert werden.`,
        quote: 'Endlich macht meinem Kind das Rechnen üben Spaß!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Internationale Schulen und DaZ-Unterricht - Mathe Arbeitsblätter in 11 Sprachen für mehrsprachige Klassen',
        subtitle: 'Mehrsprachiger Mathematikunterricht',
        description: `Internationale Schulen und bilinguale Klassen profitieren besonders von unseren mehrsprachigen Mathe-Rätseln. Alle 11 Sprachen sind in jedem Generator verfügbar für flexible Unterrichtsgestaltung. Erstellen Sie Vorschule Arbeitsblätter auf Deutsch und Englisch. Oder Mathe Arbeitsblätter auf Französisch und Spanisch. Die Bildbibliothek zeigt Namen in der gewählten Sprache.

Schüler mit Deutsch als Zweitsprache lernen Mathematik in ihrer Muttersprache. Das Einmaleins wird verständlicher mit vertrauten Begriffen. Vorschule Arbeitsblätter in der Heimatsprache erleichtern den Einstieg. Der Übergang zu deutschsprachigen Arbeitsblätter Grundschule Materialien erfolgt schrittweise. Integration durch verständliche Lernmaterialien.

DaZ-Lehrer erstellen passende Mathe-Rätsel Sets in mehreren Sprachen zum Vergleich. Generieren Sie dasselbe thematische Rätsel auf Deutsch und der Muttersprache. Schüler lösen beide Versionen und entdecken Vokabel-Verbindungen. Die identische Rätselstruktur hilft beim Übertragen von Rechnen lernen Wissen.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Nachhilfelehrer und Lerntherapie - Rechnen 1. Klasse gezielt fördern mit individuellen Mathe Arbeitsblättern',
        subtitle: 'Differenzierte Materialien für individuelle Förderung',
        description: `Nachhilfelehrer setzen Mathe-Rätsel für individuelles Lernen ein mit angepasstem Schwierigkeitsgrad. Die spielerische Form reduziert Lernstress bei Kindern mit Rechenschwäche. Kinder mit Rechenschwäche profitieren besonders vom visuellen Element. Das Bilderrätsel unterstützt das mathematische Verständnis. Rechnen 1. Klasse wird schrittweise aufgebaut ohne Überforderung.

Erstellen Sie hochgradig strukturierte abgestufte Instruktion mit Schwierigkeitsprogression. Starten Sie alle Schüler mit einfachen 2×2 Rätseln mit Addition. Sobald Schüler konsistent erfolgreich sind führen Sie komplexere Rätsel ein. Diese schrittweise Progression baut Selbstvertrauen durch Meisterung für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.

Jeder Erfolg motiviert zum Weitermachen bei Mathe Arbeitsblättern. Die Lösungsblätter ermöglichen sofortige Selbstkontrolle. Kinder sehen ihre Fortschritte und entwickeln positive Einstellung zum Rechnen lernen. Die visuelle Belohnung durch das fertige Bild verstärkt den Lernerfolg nachhaltig.`,
        quote: 'Die visuellen Rätsel helfen meinen Schülern mit Rechenschwäche enorm!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrer-Unternehmer - Kostenlose Arbeitsblätter Grundschule und Vorschule Arbeitsblätter verkaufen mit POD-Lizenz',
        subtitle: 'Kommerzielle Lizenz für passive Einnahmen',
        description: `Lehrer-Verkäufer auf Lehrermarktplatz und Etsy nutzen unseren Generator für Produkterstellung. Das Vollzugriff Abonnement enthält volle kommerzielle Lizenzierung für Print-on-Demand Nutzung. Erstellen Sie thematische Arbeitsblatt-Pakete für saisonale Verkäufe mit Arbeitsblätter Grundschule und Vorschule Arbeitsblätter.

Generieren Sie 20 verschiedene Herbst-thematische Mathe-Rätsel für Herbst-Verkauf. Erstellen Sie 30 Ozean-thematische Rätsel für Sommer-Pakete. Produzieren Sie 25 Weihnachts-Rätsel für Dezember-Verkäufe. Jedes Paket dauert weniger als eine Stunde zu erstellen. Verkaufen Sie für 3-8 Euro pro Paket auf Lehrermarktplatz oder Etsy.

Amazon KDP eignet sich für Mathe-Rätsel Arbeitsheft-Sammlungen für den Buchmarkt. Die 300 DPI Qualität erfüllt kommerzielle Anforderungen. Keine zusätzlichen Lizenzgebühren erforderlich. Professionelle Druckqualität für alle digitalen und Print-Verkäufe. Das Abonnement amortisiert sich durch Arbeitsblatt-Verkäufe schnell für kostenlose Arbeitsblätter Bundles.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from mathe-raetsel.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen über kostenlose Arbeitsblätter - Mathe Arbeitsblätter, Rechnen lernen und Einmaleins',
    sectionDescription: 'Lehrer und Eltern stellen häufige Fragen über Mathe-Rätsel Arbeitsblätter bevor sie den Generator ausprobieren. Diese Antworten liefern klare ehrliche Information über Abonnement-Anforderungen, Druckoptionen und Anpassungsfähigkeiten.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [
      {
        id: '1',
        question: 'Ist dieser Mathe-Rätsel Generator wirklich kostenlos für Mathe Arbeitsblätter und Rechnen lernen?',
        answer: 'Wortsuchrätsel ist die einzige kostenlose App auf LessonCraft Studio. Mathe-Rätsel erfordert ein Vollzugriff Abonnement. Das Abonnement kostet 240 Euro pro Jahr oder 25 Euro pro Monat. "Kostenlose Arbeitsblätter" bezieht sich auf die Ausgabe nicht den Generator selbst. Mit Ihrem Vollzugriff Abonnement erstellen Sie unbegrenzte druckbare Arbeitsblätter ohne Gebühren pro Arbeitsblatt. Ihr Abonnement enthält kommerzielle Lizenzierung, 11 Sprachen und Zugang zu 33 verschiedenen Arbeitsblatt-Generatoren einschließlich Mathe-Rätsel kombiniert mit Mathe Arbeitsblättern für Einmaleins und Rechnen lernen.',
      },
      {
        id: '2',
        question: 'Kann ich Mathe-Rätsel Arbeitsblätter zuhause drucken für Vorschule und Rechnen 1. Klasse?',
        answer: 'Ja, alle Arbeitsblätter exportieren bei 300 DPI Auflösung perfekt für Heimdrucker. Wählen Sie Letter-Größe für US-Drucker oder A4-Größe für internationale Drucker. Reguläre Tintenstrahl- oder Laserdrucker produzieren klare professionelle Ergebnisse. Die Graustufen-Option konvertiert Arbeitsblätter zu Schwarz und Weiß vor dem Download. Diese Funktion spart farbige Tinte während Bildklarheit erhalten bleibt. Eltern die mehrere Kopien drucken schätzen signifikante Tintenersparnisse. Perfekt für Vorschule Arbeitsblätter und Rechnen 1. Klasse Materialien zu Hause.',
      },
      {
        id: '3',
        question: 'Brauche ich Design-Fähigkeiten für Arbeitsblätter Grundschule und Mathe Arbeitsblätter?',
        answer: 'Nein, Design-Fähigkeiten sind nicht erforderlich. Der Generator verwendet eine einfache Oberfläche. Wählen Sie ein Thema aus dem Dropdown-Menü. Wählen Sie ein Bild aus der Bibliothek. Klicken Sie den Erstellen-Button. Ihr vollständiges Mathe-Rätsel erscheint in wenigen Sekunden. Das automatische Layout übernimmt alle Abstände, Größen und Positionierung. Der Lösungsschlüssel generiert mit einem zusätzlichen Klick. Lehrer die nie Design-Software verwendet haben erstellen erfolgreich professionelle Arbeitsblätter Grundschule und Mathe Arbeitsblätter.',
      },
      {
        id: '4',
        question: 'Kann ich Einmaleins Aufgaben mit dem Mathe-Rätsel Generator erstellen für Mathe Arbeitsblätter?',
        answer: 'Der Mathe-Rätsel Generator fokussiert auf Addition und Subtraktion für die Grundschule. Für das Einmaleins empfehlen wir unseren separaten Mathe Arbeitsblatt Generator. Beide sind im Vollzugriff Abo enthalten. Das Einmaleins lässt sich mit verschiedenen Schwierigkeitsstufen üben. Multiplizieren und Dividieren werden abgedeckt. Die Kombination beider Generatoren bietet umfassende Mathe Arbeitsblätter für alle Grundrechenarten.',
      },
      {
        id: '5',
        question: 'Welche Altersgruppen funktionieren mit Mathe-Rätsel für Vorschule Arbeitsblätter?',
        answer: 'Mathe-Rätsel funktionieren am besten für Alter 4-10 Jahre. Jüngere Vorschüler ab Alter 4 können mit einfachen 2×2 Rätseln und Addition beginnen. Ältere Schüler ab Alter 10 bevorzugen komplexere 4×4 Rätsel mit gemischten Rechenarten. Der Sweet-Spot ist Vorschule bis dritte Klasse. Wählen Sie einfachere Raster mit Addition für Alter 4-6. Verwenden Sie komplexere Raster mit gemischten Aufgaben für Alter 7-10. Passen Sie Schwierigkeit basierend auf individuellen Schülerfähigkeiten statt strikten Altersrichtlinien für Vorschule Arbeitsblätter an.',
      },
      {
        id: '6',
        question: 'Kann ich Mathe-Rätsel Arbeitsblätter verkaufen auf Lehrermarktplatz und Etsy?',
        answer: 'Ja, Vollzugriff Abonnement enthält volle kommerzielle Lizenzierung für Print-on-Demand Nutzung. Verkaufen Sie Ihre Arbeitsblätter auf Lehrermarktplatz, Etsy, Amazon KDP oder Ihrer eigenen Website. Keine zusätzlichen Lizenzierungsgebühren jenseits des 240-Euro jährlichen Abonnements. Keine Pro-Produkt Lizenzgebühren oder Nutzungseinschränkungen. Erstellen Sie thematische Pakete und preisen Sie sie wie Sie wählen. Die kommerzielle Lizenz deckt alle digitalen und Druckverkäufe. Viele Lehrer decken ihre Abonnementkosten durch nur 5-10 Arbeitsblatt-Pakete jährlich verkaufen.',
      },
      {
        id: '7',
        question: 'Wie passe ich kostenlose Arbeitsblätter für Arbeitsblätter Grundschule an?',
        answer: 'Klicken Sie jedes Element auf der Leinwand nach Generierung um es anzupassen. Verschieben Sie das Mathe-Rätsel Gitter um es irgendwo auf der Seite neu zu positionieren. Skalieren Sie Bilder größer oder kleiner mit Eckgriffen. Fügen Sie eigene Texte für Schülernamen oder Anweisungen hinzu. Verwenden Sie das Text-Werkzeuge-Panel um Schriftarten, Farben und Größen zu ändern. Öffnen Sie das Seite und Szene Panel um dekorative Hintergründe hinzuzufügen. Wählen Sie Rahmen-Themen um Ihre Arbeitsblätter Grundschule professionell zu rahmen.',
      },
      {
        id: '8',
        question: 'Gibt es Schwungübungen im Mathe-Rätsel Generator oder sind diese separat?',
        answer: 'Schwungübungen sind ein eigenständiger Generator auf unserer Plattform. Schwungübungen trainieren die Feinmotorik vor dem Schreiben. Kombinieren Sie Schwungübungen mit Mathe-Rätseln für abwechslungsreichen Unterricht. Beide Tools sind im Vollzugriff Abo für 240€ pro Jahr enthalten. Mit allen 33 Generatoren erstellen Sie komplette Lernpakete die Rechnen lernen, Buchstaben lernen und Feinmotorik-Übungen kombinieren.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder für Mathe Arbeitsblätter und personalisierte Rätsel hochladen?',
        answer: 'Ja, die Eigene-Bilder-Hochladen Funktion akzeptiert JPEG, PNG und GIF Dateiformate. Klicken Sie den Upload-Button und wählen Sie mehrere Bilder gleichzeitig. Ihre hochgeladenen Bilder erscheinen im Vorschaubereich während Ihrer aktuellen Sitzung. Kombinieren Sie eigene Bilder mit Bibliotheksbildern für Hybrid-Rätsel. Diese Funktion ermöglicht hochgradig personalisierte Mathe Arbeitsblätter. Laden Sie Fotos von Klassenzimmerobjekten für themenspezifische Mathe-Rätsel hoch. Perfekt für individuelle Arbeitsblätter Grundschule mit Klassenfotos oder Schullogo.',
      },
      {
        id: '10',
        question: 'Wie lange dauert ein Mathe-Rätsel für Arbeitsblätter Grundschule zu erstellen?',
        answer: 'Vollständige Arbeitsblatt-Erstellung dauert unter 3 Minuten vom Start bis zur heruntergeladenen Datei. Bildauswahl dauert 10 Sekunden. Rastereinstellung dauert 10 Sekunden. Generierung dauert 2-3 Sekunden. Optionale Anpassung addiert 1-2 Minuten. Lösungsschlüssel-Generierung dauert 2 Sekunden. Download dauert 5 Sekunden. Gesamtzeit durchschnittlich 2-3 Minuten für Basis-Arbeitsblätter. Fortgeschrittene Anpassung mit Hintergründen und Rahmen erweitert Zeit auf 5-6 Minuten maximal. Vergleichen Sie dies mit 30-60 Minuten erforderlich für manuelle Arbeitsblätter Grundschule Erstellung.',
      },
      {
        id: '11',
        question: 'Enthalten Mathe-Rätsel Lösungsschlüssel für Vorschule Arbeitsblätter?',
        answer: 'Ja, automatische Lösungsschlüssel-Generierung ist enthalten. Nach Erstellung Ihres Arbeitsblatts klicken Sie auf Lösungsblatt im Erstellen-Menü. Das System zeigt die vollständige Lösung mit allen richtigen Antworten. Der Lösungsschlüssel zeigt das vervollständigte Bild. Er erhält dieselben Hintergründe, Rahmen und Text wie Ihr Arbeitsblatt. Laden Sie den Lösungsschlüssel als separate PDF- oder JPEG-Datei herunter. Drucken Sie ihn für Ihren Referenzordner. Ideal für Vorschule Arbeitsblätter Pakete mit vollständigen Antworten für schnelle Korrektur.',
      },
      {
        id: '12',
        question: 'In welchen Sprachen sind Mathe-Rätsel für Rechnen lernen und internationale Schulen verfügbar?',
        answer: 'Mathe-Rätsel generieren in 11 Sprachen: Deutsch, Englisch, Spanisch, Französisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch und Finnisch. Der Sprachauswähler ändert sowohl die Benutzeroberfläche als auch den Inhalt. Wenn Sie Deutsch wählen erscheinen alle Buttons und Beschriftungen auf Deutsch. Noch wichtiger zeigen Bildnamen auf Deutsch. Dieser sprachspezifische Inhalt macht Arbeitsblätter perfekt für DaZ-Instruktion, bilinguale Bildung und internationale Schulen besonders nützlich für Rechnen lernen und Arbeitsblätter Grundschule.',
      },
    ],
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
      guarantee: '30 Tage Geld-zurück-Garantie',
      securePayment: 'Sichere Bezahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Addition',
        category: 'Mathematik',
        icon: '➕',
        description: 'Ergänzen Sie Mathe-Rätsel mit bildbasierten Additions-Übungen für umfassenden frühen Mathe-Unterricht und Rechnen lernen.',
      },
      {
        id: '2',
        slug: 'image-subtraction',
        name: 'Subtraktion',
        category: 'Mathematik',
        icon: '➖',
        description: 'Kombinieren Sie Mathe-Rätsel mit Subtraktions-Arbeitsblättern für vollständige Grundrechenarten-Übung in der Grundschule.',
      },
      {
        id: '3',
        slug: 'math-worksheets',
        name: 'Mathe-Arbeitsblätter',
        category: 'Mathematik',
        icon: '🔢',
        description: 'Erweitern Sie mit Symbol-Gleichungen und Einmaleins für fortgeschrittene mathematische Konzepte und Arbeitsblätter Grundschule.',
      },
      {
        id: '4',
        slug: 'image-sudoku',
        name: 'Bilder-Sudoku',
        category: 'Logik',
        icon: '🧩',
        description: 'Erweitern Sie logisches Denken mit Bilder-Sudoku als Ergänzung zu Mathe-Rätseln für Vorschule Arbeitsblätter.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✍️',
        description: 'Fügen Sie Schwungübungen für umfassende Feinmotorik-Entwicklung hinzu als Ergänzung zum Rechnen lernen.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Ergänzen Sie Mathe-Rätsel mit Ausmalbildern für abwechslungsreiche Lernpakete und kreative Pausen.',
      },
    ],
  },
};

export default mathPuzzleDeContent;
