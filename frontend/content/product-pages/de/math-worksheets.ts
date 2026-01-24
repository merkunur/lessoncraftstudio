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
        id: '1',
        worksheetSrc: '/samples/german/math/sample-1.jpeg',
        answerKeySrc: '/samples/german/math/sample-1-answer.jpeg',
        altText: 'Kostenlose Mathe-Arbeitsblätter Grundschule - Mathe-Rätsel Hochformat mit Symbol-Gleichungen für Rechnen lernen Vorschule',
        pdfDownloadUrl: '/samples/german/math/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/german/math/sample-2.jpeg',
        answerKeySrc: '/samples/german/math/sample-2-answer.jpeg',
        altText: 'Mathe-Arbeitsblätter Querformat - Arbeitsblätter Grundschule mit visuellen Rechenrätseln für Kinder',
        pdfDownloadUrl: '/samples/german/math/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/german/math/sample-3.jpeg',
        answerKeySrc: '/samples/german/math/sample-3-answer.jpeg',
        altText: 'Vorschul-Arbeitsblätter Mathematik - Kostenloses Arbeitsblatt für Kinder mit Bildersymbolen zum Rechnen',
        pdfDownloadUrl: '/samples/german/math/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/german/math/sample-4.jpeg',
        answerKeySrc: '/samples/german/math/sample-4-answer.jpeg',
        altText: 'Arbeitsblätter Grundschule Mathe-Rätsel - Rechnen 1. Klasse mit farbigen Symbolen und Gleichungen',
        pdfDownloadUrl: '/samples/german/math/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/german/math/sample-5.jpeg',
        answerKeySrc: '/samples/german/math/sample-5-answer.jpeg',
        altText: 'Kostenlose Arbeitsblätter Mathematik Grundschule - Mathe-Arbeitsblätter zum Ausdrucken für Vorschule',
        pdfDownloadUrl: '/samples/german/math/sample-5.pdf',
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
    items: [
      {
        id: '1',
        icon: '🧩',
        title: 'Visuelle Mathe-Rätsel - Symbol-Gleichungen für Rechnen lernen',
        description: `Der Generator erstellt Mathe-Rätsel, bei denen Symbole Zahlen darstellen. Kinder lösen die Gleichungen und lernen spielerisch Rechnen. Jedes Rätsel kombiniert visuelle Elemente mit mathematischen Konzepten. Das fördert logisches Denken und Problemlösungskompetenz für Arbeitsblätter Grundschule.

Die Methodik folgt bewährten pädagogischen Grundsätzen für Rechnen lernen 1. Klasse. Symbole machen abstrakte Zahlen greifbar und verständlich. Schüler entwickeln algebraisches Denken durch Bildersymbole. Das Basis-Paket für 144 € jährlich bietet Zugang zu allen Funktionen ohne Beschränkungen.

Vorschulkinder und Erstklässler profitieren enorm von symbolbasiertem Lernen. Traditionelle Mathe-Arbeitsblätter mit nur Zahlen überfordern oft junge Lernende. Mit Symbolen bauen Schüler Zahlensinn und Selbstvertrauen auf. Kostenlose Arbeitsblätter machen diese Methode allen zugänglich.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '⚙️',
        title: 'Vier Schwierigkeitsstufen - Differenzierte Mathe-Arbeitsblätter für alle Niveaus',
        description: `Wählen Sie zwischen vier Schwierigkeitsstufen für differenzierte Arbeitsblätter Grundschule. "Sehr leicht" und "Leicht" nutzen nur 2 Symbole für Anfänger. "Mittel" verwendet 3 Symbole für mehr Herausforderung. "Schwer" erstellt Rätsel mit 4 verschiedenen Symbolen für Fortgeschrittene.

Verschiedene Stufen sprechen unterschiedliche Lernstadien an für Mathe-Arbeitsblätter. Vorschulkinder beginnen mit sehr leichten Aufgaben. Erstklässler arbeiten mit leichten bis mittleren Rätseln. Zweite und dritte Klasse bewältigen schwere Herausforderungen für Rechnen lernen.

Differenzierte Vorschul-Arbeitsblätter entstehen durch Stufenwahl. Gleiche Themen, unterschiedliche Schwierigkeiten. Lehrkräfte verteilen passende Arbeitsblätter nach Schülerniveau. Alle arbeiten am gleichen Thema, aber auf ihrem eigenen Niveau. Das Basis-Paket macht Differenzierung einfach.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Anpassbare Zahlenbereiche - Vorschul-Arbeitsblätter bis Grundschul-Niveau',
        description: `Stellen Sie Minimum- und Maximum-Werte für den Zahlenraum ein für kostenlose Arbeitsblätter. Vorschulkinder arbeiten im Zahlenraum 0-10 für einfache Rätsel. Erstklässler nutzen 0-20 für Mathe-Arbeitsblätter. Fortgeschrittene Schüler rechnen bis 100 für Arbeitsblätter Grundschule.

Die Schwierigkeitsanpassung ermöglicht individualisiertes Lernen für Rechnen lernen. Kämpfende Schüler üben mit kleinen Zahlen. Begabte Lernende erhalten anspruchsvollere Aufgaben. Jedes Arbeitsblatt passt zum Entwicklungsstand des Kindes. Keine generischen Einheitslösungen mehr.

Wählen Sie die Rechenarten für Ihre Vorschul-Arbeitsblätter. Nur Addition für Anfänger. Addition und Subtraktion für Fortgeschrittene. Der Generator erstellt mathematisch korrekte und lösbare Aufgaben. Flexible Einstellungen passen sich jedem Lernniveau an.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '✨',
        title: 'Automatische Lösungsblätter - Zeitsparende Korrektur für Arbeitsblätter Grundschule',
        description: `Jedes generierte Arbeitsblatt erstellt automatisch ein Lösungsblatt für Mathe-Arbeitsblätter. Die korrekten Zahlenwerte erscheinen klar für jedes Symbol. Wechseln Sie zwischen Arbeitsblatt und Lösung mit einem Klick. Beide laden als separate Dateien für kostenlose Arbeitsblätter herunter.

Lehrkräfte sparen enorme Korrekturzeit mit Vorschul-Arbeitsblättern. Keine manuelle Berechnung jeder Aufgabe mehr nötig. Schnelle visuelle Überprüfung mit dem Lösungsblatt. Mehr Zeit für eigentlichen Unterricht statt Korrektur. Das Basis-Paket maximiert Ihre Zeiteffizienz für Arbeitsblätter Grundschule.

Selbstkorrektur wird mit Lösungsblättern möglich für Rechnen lernen. Schüler können ihre Arbeit eigenständig überprüfen. Fördert Verantwortung und Selbstständigkeit. Eltern helfen bei Hausaufgaben ohne Mathe-Angst. Lösungsblätter machen Mathe-Rätsel-Übung für alle zugänglicher.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '📐',
        title: 'Flexibles Layout - Hochformat und Querformat für alle Druckbedürfnisse',
        description: `Wählen Sie zwischen Hochformat und Querformat für Arbeitsblätter Grundschule. Hochformat passt mehr Aufgaben auf eine Seite. Querformat bietet größere Symbole für bessere Sichtbarkeit. Beide Formate drucken auf Standard A4 oder Letter Papier für Mathe-Arbeitsblätter.

Die Aufgabenanzahl ist ebenfalls anpassbar für Vorschul-Arbeitsblätter. Wählen Sie zwischen 1 und 6 Rätsel pro Seite. Weniger Aufgaben für Anfänger oder kurze Übungen. Mehr Aufgaben für Hausaufgaben oder Tests. Das Layout passt sich automatisch an Ihre Wahl an.

A4 und Letter Größen decken alle Druckerbedürfnisse ab für kostenlose Arbeitsblätter. Europäische Schulen nutzen A4. Amerikanische Schulen bevorzugen Letter. Der Generator unterstützt beides. Perfekte Kompatibilität mit jedem Schuldrucker für Rechnen lernen.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder - Thematische Mathe-Arbeitsblätter für jeden Lehrplan',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Organisiert nach Themen wie Tiere, Fahrzeuge, Essen, Natur und mehr. Durchsuchen Sie Bilder nach Kategorien oder nutzen Sie die Suchfunktion. Neue Bilder werden regelmäßig hinzugefügt.

Erstellen Sie thematische Mathe-Arbeitsblätter passend zum Lehrplan. Zoo-Einheit bekommt Tier-Symbole. Herbst-Thema verwendet Blätter und Kürbisse. Ostern integriert Hasen und Eier. Thematische Kohärenz verstärkt Lernen über Fächer hinweg.

Hochwertige Bilder machen Vorschul-Arbeitsblätter attraktiv. Klare, farbenfrohe Darstellungen motivieren junge Lernende. Schüler freuen sich auf Mathe mit bunten Symbolen. Visuelle Anziehungskraft steigert Engagement und Lernbereitschaft für Rechnen lernen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle Qualität - 300 DPI Druckauflösung für alle Arbeitsblätter',
        description: `Alle heruntergeladenen Arbeitsblätter exportieren in 300 DPI Auflösung für Mathe-Arbeitsblätter. Professioneller Druckstandard garantiert scharfe Symbole. Text bleibt klar bei jeder Größe. Farben drucken lebendig auf Standard-Schuldruckern.

PDF-Exporte bewahren Qualität über Geräte und Plattformen hinweg für Arbeitsblätter Grundschule. Senden Sie Arbeitsblätter per E-Mail ohne Qualitätsverlust. Laden Sie zu Lernmanagementsystemen ohne Komprimierung hoch. Drucken Sie auf verschiedenen Druckern mit konsistenten Ergebnissen.

Professionelle Qualität baut Lehrkraft-Glaubwürdigkeit auf für kostenlose Arbeitsblätter. Eltern respektieren polierte, professionell aussehende Materialien. Administratoren bemerken Qualitätsmaterialien während Beobachtungen. Ihre Mathe-Arbeitsblätter repräsentieren Ihren professionellen Standard.`,
        highlighted: false,
      },
    ],
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
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in Vorschule und Kindergarten',
        subtitle: 'Vorschul-Arbeitsblätter und frühe mathematische Förderung',
        description: `Vorschulpädagogen führen Kinder spielerisch ans Rechnen heran. Mathe-Arbeitsblätter mit visuellen Rätseln sind perfekt dafür. Fünfjährige verstehen Symbole besser als abstrakte Zahlen. Die bildbasierte Methode macht Mathematik greifbar und konkret für Vorschul-Arbeitsblätter.

Erstellen Sie Vorschul-Arbeitsblätter mit vertrauten Alltagsgegenständen für Mathe-Arbeitsblätter. Äpfel, Bälle oder Teddybären als Rechensymbole funktionieren ideal. Kinder erkennen die Bilder sofort wieder. Die Verbindung von Bild und Zahl fördert mathematisches Grundverständnis. Perfekte Vorbereitung auf die Grundschule und Rechnen 1. Klasse.

Nutzen Sie thematische Arbeitsblätter für Projektwochen für Arbeitsblätter Grundschule. Bauernhof-Thema kombiniert mit Rechnen im Zahlenraum bis 10. Jahreszeitliche Motive für Frühling, Sommer, Herbst und Winter. Kinder lernen Rechnen im bedeutungsvollen Kontext. Das Basis-Paket erlaubt unbegrenzte Erstellung von kostenlosen Arbeitsblättern.`,
        quote: 'Meine Vorschulkinder lieben die bunten Symbol-Rätsel!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse',
        subtitle: 'Mathe-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Lehrkräfte der Klassen 1 bis 3 unterrichten täglich Rechnen lernen. Mathe-Arbeitsblätter vom Generator ergänzen das Schulbuch perfekt. Erstellen Sie Übungsmaterial passend zum aktuellen Zahlenraum. Differenzieren Sie nach Leistungsniveau innerhalb einer Klasse für Arbeitsblätter Grundschule.

Für Rechnen 1. Klasse starten Sie mit Zahlenraum 0-10 für Mathe-Arbeitsblätter. Steigern Sie im Jahresverlauf auf 0-20 und später 0-100. Der Generator passt sich flexibel an jeden Lernstand an. Erstellen Sie wöchentlich neue Vorschul-Arbeitsblätter ohne Mehraufwand.

Nutzen Sie Mathe-Arbeitsblätter für Stationenlernen und Freiarbeit für kostenlose Arbeitsblätter. Drucken Sie verschiedene Schwierigkeitsgrade für Differenzierung aus. Legen Sie Lösungsblätter zur Selbstkontrolle bereit. Schüler arbeiten eigenständig in ihrem Tempo. Sie gewinnen Zeit für individuelle Förderung.`,
        quote: 'Die vier Schwierigkeitsstufen machen Differenzierung so einfach.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern',
        subtitle: 'Kostenlose Arbeitsblätter für individuelles Lerntempo',
        description: `Homeschooling-Familien brauchen flexibles Unterrichtsmaterial für Mathe-Arbeitsblätter. Der Generator lässt sich an jedes Kind anpassen. Geschwister unterschiedlichen Alters lernen mit verschiedenen Schwierigkeitsstufen. Erstellen Sie maßgeschneiderte Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule.

Der Generator spart enorm viel Vorbereitungszeit für kostenlose Arbeitsblätter. Keine stundenlange Suche nach passenden Materialien mehr. Erstellen Sie Wochenpläne in unter 30 Minuten. Mehr Zeit bleibt für die eigentliche Lernbegleitung. Hochwertige Materialien stärken die Lernmotivation Ihrer Kinder.

Thematischer Unterricht wird einfach umgesetzt für Rechnen lernen. Dinosaurier-Woche mit passenden Mathe-Arbeitsblättern gestalten. Weltall-Projekt mit Raketen und Planeten als Rechensymbole. Kinder lernen begeisterter wenn Themen ihre Interessen treffen. Laden Sie eigene Bilder zu Spezialinteressen hoch.`,
        quote: 'Ein Werkzeug deckt alle Mathematik-Niveaus meiner drei Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ- und Sprachlehrkräfte',
        subtitle: 'Mehrsprachige Mathe-Arbeitsblätter und Deutsch-Arbeitsblätter',
        description: `DaZ-Lehrkräfte fördern Sprache und Fachlernen gleichzeitig für Mathe-Arbeitsblätter. Symbol-Rätsel mit Bildunterstützung sind ideal dafür. Symbole helfen beim Verstehen mathematischer Konzepte ohne perfektes Deutsch. Schüler lernen Fachbegriffe durch visuelle Verankerung für Arbeitsblätter Grundschule.

Erstellen Sie zweisprachige Arbeitsblätter für Willkommensklassen für Vorschul-Arbeitsblätter. Deutsche Aufgabenstellung mit Bildunterstützung für Verständnissicherung. Kombinieren Sie mit Deutsch-Arbeitsblättern zum Zahlwörter lernen. Mathematik wird zur Sprachlernchance. Integration von DaZ-Schülern gelingt leichter.

Die 11 verfügbaren Sprachen unterstützen diverse Klassenräume für Rechnen lernen. Arabische oder ukrainische Erstsprache der Schüler? Erstellen Sie kostenlose Arbeitsblätter in beiden Sprachen zum Vergleichen. Kinder sehen Parallelen zwischen Sprachsystemen. Das fördert metalinguistisches Bewusstsein gleichzeitig.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderschullehrkräfte',
        subtitle: 'Angepasste Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Sonderpädagogen brauchen stark differenzierte Materialien für Mathe-Arbeitsblätter. Der Generator lässt sich präzise an Förderziele anpassen. Visuelle Lerner profitieren von symbolbasierten Rechenrätseln enorm. Abstrakte Zahlen werden durch konkrete Bilder greifbar für Arbeitsblätter Grundschule.

Erstellen Sie Arbeitsblätter mit sehr großen Symbolen und viel Weißraum für Vorschul-Arbeitsblätter. Schüler mit Sehbeeinträchtigungen sehen Elemente deutlich. Weniger Aufgaben pro Seite reduzieren Überforderung. Wählen Sie 1-2 Rätsel statt 6 für kostenlose Arbeitsblätter.

Visuelle Mathe-Rätsel reduzieren Mathe-Angst bei sensiblen Schülern für Rechnen lernen. Symbole machen Aufgaben weniger einschüchternd als reine Zahlen. Frühe Erfolge bauen Selbstvertrauen auf. Anpassbare Schwierigkeit unterstützt jedes Lerntempo. Das Basis-Paket macht individuelle Förderung erschwinglich.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden IEP erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrkräfte-Unternehmer',
        subtitle: 'Verkaufen Sie Mathe-Arbeitsblätter',
        description: `Viele Lehrkräfte verdienen Nebeneinkommen durch den Verkauf von Unterrichtsmaterialien bei Mathe-Arbeitsblättern. Das Basis-Paket für 144 € jährlich beinhaltet vollständige kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsblätter Grundschule auf Teachers Pay Teachers, Etsy oder Amazon KDP.

Erstellen Sie thematische Mathe-Rätsel-Pakete für verschiedene Jahreszeiten für kostenlose Arbeitsblätter. 20 Herbst-Rätsel oder 30 Zoo-Tier-Mathe-Übungen als Bundles. Käufer schätzen umfangreiche, thematisch kohärente Ressourcen. Die 300 DPI Qualität rechtfertigt Premium-Preise.

Viele Lehrkräfte verdienen 500-5000 € monatlich mit druckbaren Ressourcen für Rechnen lernen. Das Abonnement zahlt sich nach wenigen Verkäufen selbst. Keine Per-Download-Gebühren oder Lizenzgebühren. Behalten Sie 100% Ihrer Einnahmen nach Plattformgebühren für Vorschul-Arbeitsblätter.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
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
        id: '1',
        question: 'Ist der Mathe-Rätsel Generator wirklich kostenlos für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter?',
        answer: 'Der Mathe-Arbeitsblätter Generator erfordert ein Basis-Paket Abo. Das kostet 144 € jährlich oder 15 € monatlich. Ihr Abo ermöglicht unbegrenzte Arbeitsblatt-Erstellung ohne Zusatzkosten. Erstellen Sie so viele kostenlose Arbeitsblätter wie Sie brauchen ohne Gebühren pro Arbeitsblatt. Das Basis-Paket umfasst 10 beliebte Generatoren für Arbeitsblätter Grundschule. Vollzugriff kostet 240 € jährlich und enthält alle 33 Generatoren. Beide Abos beinhalten kommerzielle Lizenz, 11 Sprachen und 300 DPI Qualität.',
      },
      {
        id: '2',
        question: 'Kann ich Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter zuhause auf normalem Drucker drucken?',
        answer: 'Ja, alle Arbeitsblätter Grundschule drucken perfekt auf Standard-Tintenstrahldruckern. Auch Laserdrucker funktionieren einwandfrei. Die 300 DPI Auflösung garantiert scharfe Ausdrucke. PDF-Format ist mit allen Druckern kompatibel für Mathe-Arbeitsblätter. Nutzen Sie die Graustufen-Option zum Tintesparen. Standard A4-Papier ist Standardgröße in Deutschland. Letter-Format für internationale Nutzer verfügbar.',
      },
      {
        id: '3',
        question: 'Brauche ich Design-Kenntnisse für professionelle Mathe-Arbeitsblätter und Arbeitsblätter Grundschule?',
        answer: 'Nein, absolut keine Design-Erfahrung erforderlich für Vorschul-Arbeitsblätter. Der Generator macht die gesamte Gestaltungsarbeit. Wählen Sie Optionen aus Dropdown-Menüs. Klicken Sie Buttons. Sehen Sie sofortige Vorschau für kostenlose Arbeitsblätter. Alles ist visuell und intuitiv. Die Benutzeroberfläche ist komplett auf Deutsch verfügbar. Selbst technisch unerfahrene Nutzer erstellen professionelle Mathe-Arbeitsblätter.',
      },
      {
        id: '4',
        question: 'Kann ich Mathe-Arbeitsblätter für Rechnen 1. Klasse in meinem Klassenzimmer verwenden?',
        answer: 'Ja, Basis-Paket Abo umfasst unbegrenzte Klassenraum-Nutzung für Arbeitsblätter Grundschule. Drucken Sie für alle Ihre Schüler. Nutzen Sie Mathe-Arbeitsblätter für Unterricht, Hausaufgaben und Tests. Keine Einschränkungen bei Klassensatzgröße für Vorschul-Arbeitsblätter. Teilen Sie digitale Kopien mit Schülern über Lernplattformen. Kopieren Sie kostenlose Arbeitsblätter für Vertretungskollegen. Die Lizenz deckt alle schulischen Verwendungen ab.',
      },
      {
        id: '5',
        question: 'In welchen Sprachen sind Mathe-Arbeitsblätter und Deutsch-Arbeitsblätter verfügbar?',
        answer: 'Der Generator unterstützt 11 Sprachen für Arbeitsblattinhalte. Deutsch, Englisch, Französisch, Spanisch und Italienisch verfügbar. Auch Portugiesisch, Niederländisch, Dänisch und Schwedisch für Mathe-Arbeitsblätter. Zusätzlich Norwegisch und Finnisch für skandinavische Schulen. Alle Menüs erscheinen in gewählter Sprache für Arbeitsblätter Grundschule. Besonders wertvoll für DaZ-Unterricht und Deutsch-Arbeitsblätter Kombination.',
      },
      {
        id: '6',
        question: 'Kann ich Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter verkaufen die ich erstelle?',
        answer: 'Ja, Basis-Paket Abo umfasst volle Print-on-Demand Lizenz für Arbeitsblätter Grundschule. Verkaufen Sie auf Teachers Pay Teachers ohne Einschränkungen. Etsy, Amazon KDP und eigene Websites erlaubt für kostenlose Arbeitsblätter. Keine Zusatzgebühren über 144 € Jahresabo hinaus. Behalten Sie 100% Ihrer Verkaufserlöse für Mathe-Arbeitsblätter. Die kommerzielle Lizenz gilt für alle erstellten Materialien. Viele Lehrkräfte verdienen 500-5000 € monatlich.',
      },
      {
        id: '7',
        question: 'Wie passe ich Mathe-Arbeitsblätter und kostenlose Arbeitsblätter für meine Schüler an?',
        answer: 'Vollständige Anpassung auf der Arbeitsfläche möglich für Vorschul-Arbeitsblätter. Verschieben, skalieren, drehen Sie jedes Element. Löschen Sie unerwünschte Objekte mit einem Klick für Mathe-Arbeitsblätter. Fügen Sie eigene Texte, Überschriften, Anweisungen hinzu. Wählen Sie Schriftarten, Farben und Größen frei für Arbeitsblätter Grundschule. Ändern Sie Hintergründe und Rahmen nach Wunsch. Passen Sie Schwierigkeitsgrad an jedes Lernniveau an.',
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Mathe-Arbeitsblätter zum Rechnen lernen?',
        answer: 'Die Arbeitsblätter passen für 5-9 Jahre alte Kinder für Vorschul-Arbeitsblätter. Vorschule (5-6 Jahre) mit sehr leichten Einstellungen. Grundschule 1. Klasse (6-7 Jahre) mit leicht bis mittel für Mathe-Arbeitsblätter. Klasse 2-3 (7-9 Jahre) mit mittel bis schwer für Arbeitsblätter Grundschule. Visuelle Symbol-Rätsel funktionieren besonders gut für Rechnen 1. Klasse. Auch für ältere Schüler mit Lernschwierigkeiten geeignet.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Fotos und Bilder zu Vorschul-Arbeitsblätter hochladen?',
        answer: 'Ja, unbegrenzter Upload eigener Bilder möglich für Mathe-Arbeitsblätter. JPEG, PNG und GIF Formate werden unterstützt. Mehrfach-Upload von bis zu 20 Bildern gleichzeitig für Arbeitsblätter Grundschule. Nutzen Sie Klassenmaskottchen oder Schülerfotos als Symbole. Kombinieren Sie eigene Bilder mit den 3000+ Bibliotheksbildern für kostenlose Arbeitsblätter. Hochgeladene Bilder bleiben für zukünftige Vorschul-Arbeitsblätter gespeichert.',
      },
      {
        id: '10',
        question: 'Wie lange dauert es ein Mathe Arbeitsblatt für Rechnen 1. Klasse zu erstellen?',
        answer: 'Die komplette Erstellung dauert unter 3 Minuten für Mathe-Arbeitsblätter. Schwierigkeitsstufe wählen: 30 Sekunden. Bilder auswählen: 1 Minute. Generieren: sofort fertig. Optional Anpassungen: 1-2 Minuten für Arbeitsblätter Grundschule. Traditionelle Erstellung dauert 30-60 Minuten pro Arbeitsblatt. Mit Generator sparen Sie 27-57 Minuten pro Vorschul-Arbeitsblätter. Mehr Zeit für eigentlichen Unterricht beim Rechnen lernen.',
      },
      {
        id: '11',
        question: 'Enthalten Mathe-Arbeitsblätter automatisch Lösungsblätter für Rechnen lernen?',
        answer: 'Ja, Lösungsblätter werden automatisch generiert für Mathe-Arbeitsblätter. Jedes Arbeitsblatt hat ein zugehöriges Lösungsblatt. Die Lösungen zeigen korrekte Zahlenwerte für jedes Symbol. Laden Sie Arbeitsblatt und Lösung separat herunter für Arbeitsblätter Grundschule. Vier Download-Optionen verfügbar. Perfekt für selbstständiges Lernen bei Vorschul-Arbeitsblättern. Lehrkräfte sparen Zeit bei der Korrektur.',
      },
      {
        id: '12',
        question: 'Kann ich Mathe-Arbeitsblätter mit Ausmalbildern, Schwungübungen, Buchstaben lernen oder Einmaleins kombinieren?',
        answer: 'Ja, die Plattform bietet 33 verschiedene Generatoren für Arbeitsblätter Grundschule. Kombinieren Sie Mathe-Arbeitsblätter mit Ausmalbildern für ganzheitliche Förderung. Fügen Sie Schwungübungen für Feinmotorik-Training hinzu. Erstellen Sie Lernpakete mit Buchstaben lernen Arbeitsblättern für Vorschul-Arbeitsblätter. Auch Einmaleins-Übungen sind verfügbar. Kombinieren Sie Rechnen lernen mit Deutsch-Arbeitsblättern für integrierten Unterricht.',
      },
      {
        id: '13',
        question: 'Wie bereiten Mathe-Arbeitsblätter Kinder auf das Einmaleins vor?',
        answer: 'Unsere Mathe-Arbeitsblätter legen das Fundament für späteres Einmaleins-Lernen. Symbol-Rätsel trainieren Mustererkennung und logisches Denken. Kinder verstehen durch visuelle Gleichungen die Beziehungen zwischen Zahlen. Die Rechenoperationen Addition und Subtraktion sind Grundbausteine für Multiplikation. Mit Arbeitsblätter Grundschule entwickeln Schüler Zahlensinn und Rechenflüssigkeit. Diese Fähigkeiten erleichtern später das Auswendiglernen von Einmaleins-Reihen. Kombinieren Sie Mathe-Rätsel mit spezifischen Einmaleins-Übungen aus dem Vollzugriff-Paket.',
      },
      {
        id: '14',
        question: 'Welche Schwungübungen ergänzen Mathe-Arbeitsblätter optimal für Vorschul-Arbeitsblätter?',
        answer: 'Schwungübungen und Mathe-Arbeitsblätter ergänzen sich perfekt für Vorschul-Arbeitsblätter. Vor dem Rechnen trainieren Schwungübungen die Feinmotorik und Stifthaltung. Kinder können Zahlen und Rechenzeichen sauberer schreiben. Der Schreibübungen-Generator erstellt passende Schwungübungen für jede Altersgruppe. Kombinieren Sie 10 Minuten Schwungübungen mit 15 Minuten Mathe-Rätsel. Diese Reihenfolge bereitet die Hand optimal auf das Schreiben vor. Arbeitsblätter Grundschule werden so zu ganzheitlichen Lernerlebnissen.',
      },
      {
        id: '15',
        question: 'Wie nutze ich Ausmalbilder als Belohnung nach Mathe-Arbeitsblättern?',
        answer: 'Ausmalbilder sind ideale Belohnungen nach abgeschlossenen Mathe-Arbeitsblättern. Kinder erhalten Malvorlagen nach erfolgreicher Lösung der Rätsel. Der Ausmalbilder-Generator erstellt thematisch passende Motive. Wählen Sie gleiche Kategorien für beide Arbeitsblätter Grundschule. Zoo-Mathe-Rätsel kombiniert mit Zoo-Ausmalbildern verstärken das Themenlernen. Die kreative Pause zwischen Rechenaufgaben erhöht die Konzentration. Ausmalbilder reduzieren Mathe-Angst durch positive Assoziationen mit dem Fach.',
      },
      {
        id: '16',
        question: 'Kann ich Buchstaben lernen mit Mathe-Arbeitsblättern für integrierten Vorschulunterricht verbinden?',
        answer: 'Ja, Buchstaben lernen und Mathe-Arbeitsblätter lassen sich hervorragend kombinieren für Vorschul-Arbeitsblätter. Der Alphabet-Zug-Generator erstellt Übungen zum Buchstaben lernen. Erstellen Sie Wochenthemen die beide Bereiche abdecken. Beispiel: Tiere-Woche mit Tier-Buchstaben und Tier-Mathe-Symbolen. Kinder sehen Verbindungen zwischen Fächern. Vorschul-Arbeitsblätter werden so zu ganzheitlichen Lernerlebnissen. Kombinieren Sie 15 Minuten Buchstaben lernen mit 15 Minuten Rechnen lernen für ausgewogene Förderung.',
      },
      {
        id: '17',
        question: 'Welche Deutsch-Arbeitsblätter passen zu Mathe-Arbeitsblättern für DaZ-Unterricht?',
        answer: 'Deutsch-Arbeitsblätter und Mathe-Arbeitsblätter ergänzen sich ideal für DaZ-Schüler. Symbol-Rätsel funktionieren sprachunabhängig für Arbeitsblätter Grundschule. Schüler lernen mathematische Konzepte ohne perfekte Deutschkenntnisse. Kombinieren Sie mit Deutsch-Arbeitsblättern zum Zahlwörter lernen. Der Generator erstellt Arbeitsblätter in 11 Sprachen für Vergleichsmöglichkeiten. Erstellen Sie zweisprachige Lernpakete für Herkunftssprache und Deutsch. Visuelles Lernen mit Bildsymbolen überbrückt Sprachbarrieren effektiv.',
      },
      {
        id: '18',
        question: 'Wie erstelle ich Arbeitsblätter Grundschule mit Malvorlagen für ganzheitliches Lernen?',
        answer: 'Kombinieren Sie Mathe-Arbeitsblätter mit Malvorlagen für abwechslungsreiche Arbeitsblätter Grundschule. Der Generator erlaubt thematische Koordination beider Materialtypen. Erstellen Sie Herbst-Bundles mit Kürbis-Rechnen und Blätter-Malvorlagen. Nutzen Sie Ausmalbilder als Belohnung nach erfolgreichem Rechnen lernen. Die 3000+ Bilder-Bibliothek bietet passende Motive für jedes Thema. Drucken Sie beide Arbeitsblätter auf einem Doppelblatt für Vorschul-Arbeitsblätter. Kinder erleben Mathematik und Kreativität als zusammengehörig.',
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
    items: [
      {
        id: '1',
        slug: 'addition',
        name: 'Additions-Arbeitsblätter',
        category: 'Mathematik',
        icon: '➕',
        description: 'Ergänzen Sie Mathe-Rätsel mit bildbasierten Additions-Übungen für umfassenden frühen Mathe-Unterricht.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Kombinieren Sie Rechnen lernen mit kreativer Auszeit durch passende Ausmalbilder als Belohnung.',
      },
      {
        id: '3',
        slug: 'writing-app',
        name: 'Schwungübungen',
        category: 'Schreibvorbereitung',
        icon: '✏️',
        description: 'Integrieren Sie Schwungübungen mit Mathe-Arbeitsblättern für umfassende motorische Entwicklung.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Verbinden Sie Rechnen lernen mit Buchstaben lernen für integrierte frühkindliche Bildung.',
      },
      {
        id: '5',
        slug: 'sudoku',
        name: 'Sudoku für Kinder',
        category: 'Logik',
        icon: '🧩',
        description: 'Erweitern Sie logisches Denken mit Bilder-Sudoku als Ergänzung zu Mathe-Rätseln.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Suchen und Zählen',
        category: 'Mathematik',
        icon: '🔍',
        description: 'Verstärken Sie Zählfähigkeiten mit Suchbildern als Vorbereitung für komplexere Mathe-Aufgaben.',
      },
    ],
  },
};

export default mathWorksheetsDeContent;
