import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Muster-Zug (Pattern Train) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/muster-zug-arbeitsblaetter.ts
 * URL: /de/apps/muster-zug-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/muster-zug.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * German Keywords (from keywords.txt):
 * 1. Arbeitsblätter Grundschule
 * 2. Mathe-Arbeitsblätter / Mathe Arbeitsblätter
 * 3. Vorschul-Arbeitsblätter / Vorschule Arbeitsblätter
 * 4. Einmaleins
 * 5. Schwungübungen
 * 6. Buchstaben lernen
 * 7. Ausmalbilder / Malvorlagen
 * 8. Kostenlose Arbeitsblätter
 * 9. Rechnen lernen / Rechnen 1. Klasse
 * 10. Deutsch-Arbeitsblätter / Deutsch Arbeitsblätter
 *
 * PRICING: Pattern Train is a FULL ACCESS app (€240/year or €25/month)
 */

export const patternTrainDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'muster-zug-arbeitsblaetter',
    appId: 'pattern-train',
    title: 'Muster-Zug Arbeitsblätter Kostenlos | Generator Grundschule Vorschule',
    description: 'Muster-Zug Arbeitsblätter in 3 Minuten erstellen. 5 Mustertypen, 3000+ Bilder, 300 DPI. Perfekt für Vorschule und Grundschule. Jetzt testen!',
    keywords: 'muster zug arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/pattern-train/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Muster-Zug Arbeitsblatt Hochformat - Kostenlose Arbeitsblätter für Arbeitsblätter Grundschule und Vorschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/pattern-train/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Muster-Zug Arbeitsblatt Querformat - Kostenlose Arbeitsblätter für Mathe Arbeitsblätter'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/pattern-train/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Muster-Zug Lösungsblatt Hochformat - Arbeitsblätter Grundschule mit Antworten'
      },
    ],
  },

  // Hero Section - FULL text from muster-zug.md
  hero: {
    title: 'Muster-Zug Generator',
    subtitle: 'Kostenlose Arbeitsblätter für Mustererkennung - Arbeitsblätter Grundschule und Vorschule',
    description: `Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten. Kinder lernen Muster zu erkennen und fortzusetzen. Das beliebte Zug-Design macht Lernen zum Vergnügen.

Der Muster-Zug Generator ist perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule. Kinder ordnen Bilder nach Mustern in die Waggons ein. Ausschneiden und Aufkleben trainiert die Feinmotorik. Fünf verschiedene Mustertypen bieten passende Schwierigkeitsstufen.

Dieses Lernwerkzeug verbindet Mustererkennung mit praktischem Basteln. Die fertigen Arbeitsblätter eignen sich für den Unterricht und für zu Hause. Mit über 3000 kindgerechten Bildern erstellen Sie abwechslungsreiche Übungen. Export in 300 DPI Qualität ermöglicht professionellen Druck.`,
    previewImageSrc: '/samples/german/pattern-train/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/german/pattern-train/
  samples: {
    sectionTitle: 'Muster-Zug Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/german/pattern-train/sample-1.jpeg',
        answerKeySrc: '/samples/german/pattern-train/sample-1_answer-key.jpeg',
        altText: 'Muster-Zug Arbeitsblatt Hochformat für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
        pdfDownloadUrl: '/samples/german/pattern-train/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/german/pattern-train/sample-2.jpeg',
        answerKeySrc: '/samples/german/pattern-train/sample-2_answer-key.jpeg',
        altText: 'Muster-Zug Arbeitsblatt Querformat für Mathe Arbeitsblätter und kostenlose Arbeitsblätter',
        pdfDownloadUrl: '/samples/german/pattern-train/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/german/pattern-train/sample-3.jpeg',
        answerKeySrc: '/samples/german/pattern-train/sample-3_answer-key.jpeg',
        altText: 'Muster-Zug Arbeitsblatt für Schwungübungen und Buchstaben lernen',
        pdfDownloadUrl: '/samples/german/pattern-train/sample-3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from muster-zug.md feature sections
  features: {
    sectionTitle: 'Funktionen des Muster-Zug Generators - Kostenlose Arbeitsblätter für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
    sectionDescription: 'Der Muster-Zug Generator bietet alle Werkzeuge für professionelle Arbeitsblätter. Jede Funktion wurde für Pädagogen und Eltern entwickelt. Die Bedienung ist einfach und intuitiv. Innerhalb von drei Minuten erstellen Sie druckfertige Materialien.',
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
        title: 'Kostenlose Arbeitsblätter in 3 Klicks erstellen - Schneller Generator für Vorschule Arbeitsblätter',
        description: `Die Erstellung beginnt mit der Auswahl des Mustertyps. Wählen Sie zwischen AB, AAB, ABB, ABC oder AABB. Dann wählen Sie Bilder aus der Bibliothek oder laden eigene hoch. Ein Klick auf Erstellen generiert das fertige Arbeitsblatt. Die automatische Themenwahl spart zusätzlich Zeit.

Bei der automatischen Themenwahl wählt das System passende Bilder aus. Alle Bilder eines Themas harmonieren miteinander. So entstehen optisch ansprechende Vorschule Arbeitsblätter in Sekunden. Perfekt für die schnelle Unterrichtsvorbereitung.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Vollständige Bearbeitbarkeit für Arbeitsblätter Grundschule - Jedes Element anpassbar',
        description: `Nach der Erstellung können Sie alles auf der Arbeitsfläche bearbeiten. Verschieben Sie Bilder durch einfaches Ziehen. Drehen Sie Elemente mit den Eckgriffen. Vergrößern oder verkleinern Sie jedes Objekt. Diese Flexibilität ermöglicht individuelle Anpassungen.

Die Ebenensteuerung bringt Elemente nach vorne oder hinten. Ausrichtungswerkzeuge ordnen Objekte präzise an. Die Sperr-Funktion schützt fertige Elemente vor versehentlichen Änderungen. Mit Rückgängig und Wiederholen korrigieren Sie jeden Schritt sofort.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen für Mathe Arbeitsblätter und Deutsch Arbeitsblätter - Personalisierte Inhalte',
        description: `Der Multi-Datei-Upload ermöglicht das Hochladen mehrerer Bilder gleichzeitig. Unterstützt werden JPEG, PNG und GIF Formate. Kombinieren Sie eigene Bilder mit der integrierten Bibliothek. So erstellen Sie personalisierte Mathe Arbeitsblätter mit Klassenfotos.

Eigene Bilder eignen sich besonders für thematische Einheiten. Verwenden Sie Fotos vom Schulausflug für passende Arbeitsblätter. Integrieren Sie Bilder aus dem aktuellen Unterrichtsthema. Die Kombination macht Deutsch Arbeitsblätter besonders ansprechend für Ihre Schüler.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprachen für Arbeitsblätter Grundschule - Deutsch Arbeitsblätter und internationale Inhalte',
        description: `Die Benutzeroberfläche ist in elf Sprachen verfügbar. Deutsch, Englisch, Französisch, Spanisch und sieben weitere. Die Bildbibliothek enthält sprachspezifische Beschriftungen. So finden Sie passende Bilder für Deutsch Arbeitsblätter schneller.

Für mehrsprachige Klassen erstellen Sie Arbeitsblätter in verschiedenen Sprachen. Internationale Schulen profitieren von dieser Vielfalt. Die Sprachunterstützung umfasst auch skandinavische Sprachen. Perfekt für den Einsatz in ganz Europa.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'POD-Lizenz für Kostenlose Arbeitsblätter - Verkaufen auf Etsy und Teachers Pay Teachers',
        description: `Mit Ihrem Vollzugriff Abo erhalten Sie eine kommerzielle Lizenz. Verkaufen Sie erstellte Arbeitsblätter auf Teachers Pay Teachers. Bieten Sie Materialien auf Etsy an. Erstellen Sie Amazon KDP Bücher mit Ihren Arbeitsblättern. Keine zusätzlichen Lizenzgebühren erforderlich.

Die 300 DPI Exportqualität erfüllt professionelle Druckstandards. Keine Quellenangabe notwendig. Lehrer-Unternehmer nutzen diese Funktion für passives Einkommen. Die Kostenlose Arbeitsblätter Erstellung wird zur Geschäftsmöglichkeit.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder für Vorschule Arbeitsblätter und Ausmalbilder - Themenbasierte Bildbibliothek',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Illustrationen. Alle Bilder sind nach Themen organisiert. Tiere, Fahrzeuge, Lebensmittel, Natur und viele mehr. Die Suchfunktion findet schnell passende Motive.

Hintergründe und Rahmen ergänzen die Bildbibliothek. Wählen Sie passende Hintergründe für jahreszeitliche Themen. Dekorative Rahmen verschönern jedes Arbeitsblatt. Die Transparenzregler passen die Intensität stufenlos an. Perfekt für Ausmalbilder und Malvorlagen als Ergänzung.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: '300 DPI Qualität für Mathe Arbeitsblätter und Rechnen lernen - Professioneller Druck',
        description: `Der Export erfolgt wahlweise als JPEG oder PDF. Beide Formate liefern 300 DPI Auflösung. Diese Qualität garantiert scharfe Ausdrucke. Auch bei Vergrößerung bleiben alle Details erhalten.

Die Graustufen-Option spart Druckerfarbe. Schwarz-weiß Arbeitsblätter eignen sich für große Klassensätze. Der Lösungsschlüssel wird separat exportiert. So haben Lehrkräfte die Korrekturvorlage zur Hand. Ideal für Rechnen lernen und Mathe Arbeitsblätter mit Selbstkontrolle.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '✋',
        title: 'Schwungübungen und Buchstaben lernen ergänzen - Feinmotorik durch Ausschneiden',
        description: `Die Ausschneide-Aktivität des Muster-Zugs fördert die Feinmotorik. Diese Fähigkeit ist grundlegend für Schwungübungen. Kinder trainieren die Scherenhaltung und präzises Schneiden. Das Aufkleben erfordert genaue Hand-Auge-Koordination.

Diese motorischen Übungen bereiten auf das Buchstaben lernen vor. Die Handmuskulatur wird gestärkt. Präzise Bewegungen werden eingeübt. So verbinden Muster-Arbeitsblätter kognitive und motorische Förderung. Eine ideale Vorbereitung für Schwungübungen und Schreibübungen.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '🔢',
        title: 'Einmaleins und Rechnen 1. Klasse vorbereiten - Muster als Grundlage für Mathematik',
        description: `Mustererkennung ist eine Schlüsselkompetenz für Mathematik. Das Verständnis von Wiederholungen hilft beim Einmaleins. Kinder erkennen, dass 2+2+2 ein Muster bildet. Diese Einsicht erleichtert später das Multiplizieren.

Auch Zahlenreihen basieren auf Mustererkennung. Das Rechnen 1. Klasse baut auf diesem Verständnis auf. Der Muster-Zug legt das Fundament spielerisch. Visuelle Muster werden später zu mathematischen Mustern. So unterstützt der Generator langfristig das Rechnen lernen.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '🎨',
        title: 'Ausmalbilder und Malvorlagen kombinieren - Kreative Arbeitsblätter Grundschule',
        description: `Die generierten Arbeitsblätter lassen sich mit Ausmalbilder kombinieren. Kinder können die ausgeschnittenen Bilder vor dem Aufkleben ausmalen. Diese Kombination verlängert die Beschäftigungszeit. Kreativität und logisches Denken werden gleichzeitig gefördert.

Malvorlagen aus der Bildbibliothek ergänzen die Muster-Übungen. Erstellen Sie thematisch passende Ausmalbilder als Bonus. So entsteht ein komplettes Lernpaket. Die Arbeitsblätter Grundschule werden zur umfassenden Lerneinheit.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from muster-zug.md
  howTo: {
    sectionTitle: 'Anleitung: Kostenlose Arbeitsblätter erstellen in 5 Schritten - Vorschule Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'In weniger als drei Minuten erstellen Sie professionelle Muster-Arbeitsblätter. Diese Anleitung führt Sie durch jeden Schritt. Keine technischen Vorkenntnisse erforderlich. Folgen Sie einfach den fünf Schritten für perfekte Ergebnisse.',
    ctaText: 'Jetzt Erstellen',
    badgeText: 'So Funktioniert Es',
    stepLabel: 'Schritt',
    completionTitle: 'Fertig!',
    completionSubtitle: 'Ihr Arbeitsblatt ist bereit',
    readyTime: 'In unter 3 Minuten fertig',
    noSkillsNeeded: 'Keine Designkenntnisse erforderlich',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    steps: [
      {
        id: '1',
        number: 1,
        icon: '🎯',
        title: 'Schritt 1: Mustertyp wählen für Mathe Arbeitsblätter und Rechnen lernen - Die richtige Schwierigkeit',
        description: `Öffnen Sie den Muster-Zug Generator in Ihrem Browser. Im linken Bereich finden Sie die Muster-Einstellungen. Wählen Sie einen der fünf Mustertypen aus dem Dropdown-Menü. Für Vorschulkinder empfehlen wir das einfache AB-Muster.

Das AB-Muster ist ideal für den Einstieg in Mathe Arbeitsblätter. Zwei Elemente wechseln sich ab wie Apfel-Birne-Apfel-Birne. Kinder erkennen das Schema schnell. Diese Grundlage bereitet auf komplexere Muster vor. Später können Sie AAB oder ABC für das Rechnen lernen einsetzen.

Für fortgeschrittene Schüler wählen Sie AABB oder ABC. Diese Muster fordern mehr Konzentration. Die Komplexität steigt schrittweise an. So passen Sie die Schwierigkeit an jede Lerngruppe an. Ideal zur Vorbereitung auf das Einmaleins in höheren Klassen.`,
      },
      {
        id: '2',
        number: 2,
        icon: '🖼️',
        title: 'Schritt 2: Bilder auswählen für Deutsch Arbeitsblätter und Ausmalbilder - Themen und eigene Bilder',
        description: `Nach der Musterwahl wählen Sie die Bilder für Ihre Arbeitsblätter. Zwei Methoden stehen zur Verfügung. Die automatische Themenwahl ist der schnellste Weg. Die manuelle Auswahl bietet maximale Kontrolle für Deutsch Arbeitsblätter.

Bei der automatischen Themenwahl wählen Sie ein Thema aus dem Dropdown. Tiere, Fahrzeuge, Obst oder Jahreszeiten stehen bereit. Das System wählt passende Bilder automatisch. Innerhalb von Sekunden ist Ihr Muster-Zug bestückt. Diese Methode spart Zeit bei der Unterrichtsvorbereitung.

Für personalisierte Deutsch Arbeitsblätter wählen Sie Bilder manuell. Klicken Sie auf Bilder in der Bibliothek. Jedes Bild wird einem Musterelement zugeordnet. Bei AB-Mustern wählen Sie zwei Bilder. Bei ABC-Mustern benötigen Sie drei verschiedene Bilder. Die Vorschau zeigt Ihre Auswahl sofort.

Laden Sie eigene Bilder hoch für individuelle Ausmalbilder und Arbeitsblätter. Klicken Sie auf Durchsuchen und wählen Sie Dateien. Mehrere Bilder gleichzeitig sind möglich. Ihre Bilder erscheinen im Upload-Bereich. Von dort weisen Sie sie den Musterelementen zu.`,
      },
      {
        id: '3',
        number: 3,
        icon: '⚙️',
        title: 'Schritt 3: Seitenformat und Hinweise einstellen für Kostenlose Arbeitsblätter - Papiergrößen und Optionen',
        description: `Im Bereich Seiteneinstellungen wählen Sie das Papierformat. Letter und A4 sind als Hoch- und Querformat verfügbar. Das quadratische Format eignet sich für soziale Medien. Benutzerdefinierte Größen ermöglichen spezielle Anforderungen.

Stellen Sie die Anzahl der Hinweise ein. Der Standardwert ist vier Hinweise. Für jüngere Kinder erhöhen Sie auf sechs bis acht. Mehr Hinweise bedeuten weniger auszufüllende Lücken. So passen Sie kostenlose Arbeitsblätter an das Niveau an.

Aktivieren Sie optional die Namens- und Datumsfelder. Diese Felder erscheinen oben auf dem Arbeitsblatt. Schüler tragen ihren Namen und das Datum ein. Praktisch für die Ablage und Dokumentation. Lehrer behalten den Überblick über erledigte Aufgaben.

Wählen Sie Hintergrund und Rahmen für ansprechende Malvorlagen. Die Themen-Dropdowns bieten verschiedene Designs. Passen Sie die Transparenz mit den Reglern an. Dezente Hintergründe lenken nicht vom Inhalt ab. Bunte Rahmen machen Arbeitsblätter zu Ausmalbilder mit Lerneffekt.`,
      },
      {
        id: '4',
        number: 4,
        icon: '✨',
        title: 'Schritt 4: Arbeitsblatt erstellen und bearbeiten für Schwungübungen und Buchstaben lernen - Vollständige Anpassung',
        description: `Klicken Sie auf den blauen Erstellen-Button. Das System generiert Ihr Muster-Arbeitsblatt sofort. Der Zug erscheint mit den gewählten Bildern. Darunter sehen Sie die Ausschneide-Boxen. Diese Aktivität fördert ähnliche Fähigkeiten wie Schwungübungen.

Nach der Erstellung können Sie jedes Element bearbeiten. Klicken Sie auf ein Bild zum Auswählen. Ziehen Sie es an eine neue Position. Drehen Sie es mit den Eckgriffen. Vergrößern oder verkleinern Sie nach Bedarf. Die Kontextleiste zeigt zusätzliche Optionen.

Fügen Sie Text hinzu für Buchstaben lernen Übungen. Geben Sie den gewünschten Text ein. Wählen Sie Schriftart, Größe und Farbe. Platzieren Sie den Text auf dem Arbeitsblatt. Beschriftungen helfen beim Buchstaben lernen und Lesen.

Die Ebenensteuerung ordnet überlappende Elemente. Bringen Sie wichtige Objekte nach vorne. Senden Sie Hintergründe nach hinten. Die Ausrichtungswerkzeuge positionieren präzise. Sperren Sie fertige Elemente vor versehentlichen Änderungen. Die Rückgängig-Funktion korrigiert Fehler sofort.`,
      },
      {
        id: '5',
        number: 5,
        icon: '📥',
        title: 'Schritt 5: Herunterladen und Drucken für Rechnen 1. Klasse und Einmaleins - Export in Profiqualität',
        description: `Klicken Sie auf den Download-Button für die Exportoptionen. Wählen Sie zwischen JPEG und PDF Format. PDF eignet sich ideal für den Druck. JPEG funktioniert für digitale Verwendung. Beide Formate liefern 300 DPI Qualität.

Aktivieren Sie die Graustufen-Option zum Farbsparen. Schwarz-weiß Ausdrucke reduzieren Tintenverbrauch. Für große Klassensätze ist dies besonders wirtschaftlich. Die Qualität der Linien und Details bleibt erhalten. Perfekt für Rechnen 1. Klasse Übungsblätter.

Generieren Sie den Lösungsschlüssel separat. Klicken Sie auf Erstellen und wählen Sie Lösungsschlüssel. Das vollständige Muster erscheint ohne Lücken. Exportieren Sie den Lösungsschlüssel als separate Datei. So haben Sie die Korrekturvorlage für das Einmaleins und alle Muster-Übungen.

Drucken Sie die Arbeitsblätter auf normalem Papier. Dickeres Papier eignet sich für das Ausschneiden besser. Verteilen Sie die Blätter an Ihre Schüler. Stellen Sie Scheren und Klebestifte bereit. Die Kinder schneiden die Bilder aus und kleben sie in die Lücken.`,
      },
    ],
  },

  // Use Cases Section - FULL text from muster-zug.md
  useCases: {
    sectionTitle: 'Für wen eignet sich der Muster-Zug - Kostenlose Arbeitsblätter für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Der Muster-Zug Generator wurde für verschiedene pädagogische Kontexte entwickelt. Von der Vorschule bis zur dritten Klasse finden Pädagogen passende Einsatzmöglichkeiten. Auch Eltern und Therapeuten profitieren von diesem Werkzeug. Entdecken Sie, wie unterschiedliche Nutzergruppen den Generator einsetzen.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieherinnen und Erzieher für Vorschule Arbeitsblätter und Schwungübungen',
        subtitle: 'Kindergarten und Kita',
        description: `Erzieherinnen in Kindertagesstätten nutzen den Muster-Zug für erste Musterübungen. Das AB-Muster eignet sich perfekt für Vier- bis Fünfjährige. Die bunten Bilder wecken Interesse und Motivation. Kinder lernen spielerisch logische Zusammenhänge zu erkennen.

Die Ausschneide-Aktivität ergänzt Schwungübungen im Vorschulprogramm. Beide fördern die Feinmotorik für das spätere Schreiben. Der Umgang mit Schere und Kleber trainiert wichtige Fertigkeiten. Vorschule Arbeitsblätter mit Muster-Zügen sind bei Kindern besonders beliebt.

Für thematische Einheiten wählen Erzieher passende Bildthemen. Jahreszeiten, Tiere oder Fahrzeuge unterstützen aktuelle Projekte. Die Kombination mit Ausmalbilder verlängert die Beschäftigungszeit. So entstehen komplette Lerneinheiten für den Kindergartenalltag.`,
        quote: 'Meine Vorschulkinder lieben die bunten Muster-Zug Arbeitsblätter!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer für Arbeitsblätter Grundschule und Mathe Arbeitsblätter',
        subtitle: '1. bis 3. Klasse',
        description: `Lehrkräfte der 1. Klasse setzen Muster-Arbeitsblätter zur Einführung ein. Mustererkennung gehört zu den mathematischen Grundkompetenzen. Die visuellen Übungen bereiten auf abstrakte Konzepte vor. Arbeitsblätter Grundschule mit Mustern sind im Lehrplan verankert.

In der 2. Klasse werden komplexere Muster eingeführt. AAB und ABB Muster fordern mehr Konzentration. Mathe Arbeitsblätter mit Musterübungen unterstützen das mathematische Denken. Kinder erkennen Strukturen, die beim Rechnen helfen.

Drittklässler arbeiten mit ABC und AABB Mustern. Diese komplexen Strukturen bereiten auf das Einmaleins vor. Das Erkennen von Wiederholungen ist grundlegend für Multiplikation. Der Muster-Zug macht diese Verbindung sichtbar und verständlich.`,
        quote: 'Perfekte Vorbereitung auf das mathematische Denken in der Grundschule!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Eltern beim Homeschooling für Mathe Arbeitsblätter und Buchstaben lernen',
        subtitle: 'Lernen zu Hause',
        description: `Homeschool-Familien schätzen die einfache Bedienung des Generators. Ohne pädagogische Ausbildung erstellen Eltern professionelle Materialien. Die Schritt-für-Schritt-Anleitung führt durch den Prozess. In Minuten entstehen druckfertige Mathe Arbeitsblätter.

Die verschiedenen Schwierigkeitsstufen ermöglichen individuelle Anpassung. Eltern beobachten den Lernfortschritt und steigern schrittweise. Geschwister unterschiedlichen Alters erhalten passende Aufgaben. Diese Differenzierung ist beim Unterricht zu Hause besonders wertvoll.

Muster-Übungen ergänzen das Buchstaben lernen und Rechnen. Die kognitive Förderung unterstützt alle Lernbereiche. Homeschool-Eltern kombinieren Muster-Züge mit anderen Arbeitsblättern. So entstehen abwechslungsreiche Lernpakete für das Buchstaben lernen und Zahlenverständnis.`,
        quote: 'Ein Werkzeug deckt alle Altersstufen meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'DaF und DaZ Lehrkräfte für Deutsch Arbeitsblätter und Einmaleins',
        subtitle: 'Sprachförderung mit Mustern',
        description: `Lehrkräfte für Deutsch als Fremdsprache nutzen visuelle Lernmethoden. Muster-Übungen funktionieren ohne Sprachkenntnisse. Kinder verstehen die Aufgabe durch die Bilder. Diese universelle Verständlichkeit macht Deutsch Arbeitsblätter zugänglich für alle.

Die Bildbibliothek enthält Alltagsgegenstände mit deutschen Bezeichnungen. Beim Arbeiten lernen Kinder Vokabeln nebenbei. Apfel, Birne, Auto, Hund werden durch Wiederholung gefestigt. Deutsch Arbeitsblätter mit Muster-Zügen verbinden Sprach- und Denkförderung.

DaZ-Klassen profitieren von der mehrsprachigen Benutzeroberfläche. Lehrkräfte erstellen Materialien in ihrer Unterrichtssprache. Die Kinder sehen bekannte Bilder in neuen Kontexten. Mustererkennung überbrückt sprachliche Barrieren beim Einmaleins und anderen Mathematikthemen.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '♿',
        title: 'Sonderpädagogen für Schwungübungen und Rechnen lernen',
        subtitle: 'Förderschule und Inklusion',
        description: `Sonderpädagogen passen Arbeitsblätter an individuelle Bedürfnisse an. Die einstellbare Hinweisanzahl ermöglicht Differenzierung. Mehr Hinweise reduzieren die Schwierigkeit. Weniger Hinweise fordern stärkere Schüler heraus.

Für Schüler mit Feinmotorik-Schwächen sind die Ausschneide-Übungen wertvoll. Sie ergänzen therapeutische Schwungübungen im Unterricht. Die motivierende Zug-Gestaltung erhöht die Bereitschaft zur Mitarbeit. Wiederholte Erfolge stärken das Selbstvertrauen.

In inklusiven Klassen erstellen Sonderpädagogen differenzierte Materialien. Dasselbe Thema in verschiedenen Schwierigkeitsstufen. Alle Kinder arbeiten am gleichen Projekt. Das Rechnen lernen wird durch visuelle Muster unterstützt. Niemand fühlt sich ausgeschlossen.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Förderbedarf erstellen.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Lehrer-Unternehmer für Ausmalbilder und Malvorlagen',
        subtitle: 'Verkauf auf Online-Plattformen',
        description: `Pädagogen mit unternehmerischem Interesse nutzen die kommerzielle Lizenz. Das Vollzugriff Abo für 240 Euro jährlich enthält alle Rechte. Erstellte Arbeitsblätter dürfen verkauft werden. Teachers Pay Teachers und Etsy sind beliebte Plattformen.

Die professionelle 300 DPI Qualität erfüllt Marktstandards. Käufer erwarten druckfertige Produkte. Der Muster-Zug Generator liefert diese Qualität automatisch. Keine Nachbearbeitung in Grafikprogrammen erforderlich.

Kombinieren Sie Muster-Arbeitsblätter mit Ausmalbilder für Lernpakete. Thematische Bundles erzielen höhere Preise. Malvorlagen als Bonus-Material steigern den Wert. Die über 3000 Bilder ermöglichen endlose Variationen für Ausmalbilder und Muster-Übungen.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL text from muster-zug.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Muster-Arbeitsblättern und Einmaleins Vorbereitung - Mathe Arbeitsblätter FAQ',
    sectionDescription: 'Hier finden Sie Antworten auf die häufigsten Fragen zum Muster-Zug Generator. Von Kosten über Funktionen bis zu pädagogischen Einsatzmöglichkeiten. Diese Informationen helfen bei Ihrer Entscheidung für professionelle Arbeitsblätter.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Zahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [
      {
        id: '1',
        question: 'Ist der Muster-Zug Generator für Einmaleins und Schwungübungen wirklich kostenlos nutzbar?',
        answer: `Der Muster-Zug Generator erfordert ein Vollzugriff Abo für 240 Euro jährlich oder 25 Euro monatlich. Mit Ihrem Abonnement erstellen Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten pro Blatt. Keine versteckten Gebühren für Bilder oder Downloads.

Das Vollzugriff Abo enthält alle 33 Arbeitsblatt-Generatoren der Plattform. Neben dem Muster-Zug erhalten Sie Zugang zu Generatoren für Einmaleins, Schwungübungen und vieles mehr. Die monatliche Option ermöglicht flexible Nutzung ohne langfristige Bindung.`,
      },
      {
        id: '2',
        question: 'Kann ich Muster-Arbeitsblätter für Deutsch Arbeitsblätter und Buchstaben lernen zu Hause drucken?',
        answer: `Ja, alle erstellten Arbeitsblätter können auf jedem Heimdrucker ausgedruckt werden. Die 300 DPI Qualität garantiert scharfe Ausdrucke. Sowohl Farb- als auch Schwarzweiß-Druck funktionieren einwandfrei.

Für Deutsch Arbeitsblätter und Buchstaben lernen Übungen empfehlen wir normales Kopierpapier. Bei Ausschneide-Aktivitäten ist etwas dickeres Papier von Vorteil. Die Graustufen-Option spart Druckerfarbe bei großen Klassensätzen.`,
      },
      {
        id: '3',
        question: 'Brauche ich Designkenntnisse für Mathe Arbeitsblätter und Rechnen lernen Arbeitsblätter?',
        answer: `Keine Designkenntnisse erforderlich. Der Generator führt Sie Schritt für Schritt durch den Prozess. Wählen Sie Mustertyp und Bilder aus. Das System erstellt automatisch professionelle Mathe Arbeitsblätter.

Die automatische Themenwahl wählt passende Bilder für Sie aus. Für Rechnen lernen Materialien genügen wenige Klicks. Die Vorschau zeigt das Ergebnis vor dem Download. Anpassungen sind jederzeit möglich.`,
      },
      {
        id: '4',
        question: 'Kann ich erstellte Arbeitsblätter für Schwungübungen und Buchstaben lernen im Unterricht verwenden?',
        answer: `Das Vollzugriff Abo enthält unbegrenzte Nutzungsrechte für den Unterricht. Drucken Sie so viele Kopien wie benötigt. Verteilen Sie Arbeitsblätter an alle Schüler Ihrer Klasse. Keine zusätzlichen Lizenzgebühren für Schwungübungen oder andere Materialien.

Die Arbeitsblätter eignen sich für Buchstaben lernen Aktivitäten und Musterübungen. Kombinieren Sie verschiedene Generatoren für komplette Lerneinheiten. Auch für Vertretungsstunden und Hausaufgaben nutzbar.`,
      },
      {
        id: '5',
        question: 'In welchen Sprachen sind Muster-Arbeitsblätter für Deutsch Arbeitsblätter verfügbar?',
        answer: `Der Generator unterstützt elf Sprachen vollständig. Die Benutzeroberfläche ist verfügbar in Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch.

Die Bildbibliothek enthält sprachspezifische Beschriftungen. Für Deutsch Arbeitsblätter sind alle Bilder mit deutschen Namen versehen. Diese Vielfalt macht den Generator ideal für internationale Schulen und mehrsprachige Klassen.`,
      },
      {
        id: '6',
        question: 'Darf ich erstellte Arbeitsblätter für Einmaleins und Ausmalbilder verkaufen?',
        answer: `Ja, das Vollzugriff Abo enthält eine vollständige kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsblätter auf Teachers Pay Teachers, Etsy oder Amazon KDP. Keine zusätzlichen Lizenzgebühren für Einmaleins Übungen oder andere Materialien.

Auch Ausmalbilder und Malvorlagen dürfen kommerziell genutzt werden. Die 300 DPI Qualität erfüllt professionelle Marktstandards. Keine Quellenangabe erforderlich. Perfekt für Lehrer-Unternehmer mit Online-Shops.`,
      },
      {
        id: '7',
        question: 'Wie passe ich Muster-Arbeitsblätter für Rechnen 1. Klasse und Schwungübungen an?',
        answer: `Die Schwierigkeitsanpassung erfolgt über mehrere Einstellungen. Wählen Sie einfache AB-Muster für Anfänger. Erhöhen Sie die Hinweisanzahl für mehr Unterstützung. Reduzieren Sie Hinweise für fortgeschrittene Schüler.

Für Rechnen 1. Klasse Vorbereitung eignen sich AAB und ABB Muster. Diese bereiten auf mathematische Strukturen vor. Die Schwungübungen ähnliche Ausschneide-Aktivität trainiert die Feinmotorik parallel. So entstehen ganzheitliche Lernmaterialien.`,
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Muster-Arbeitsblätter und Buchstaben lernen Übungen?',
        answer: `Muster-Arbeitsblätter eignen sich für Kinder von vier bis neun Jahren. Das AB-Muster ist ideal für Vier- bis Fünfjährige. ABC und AABB Muster fordern Sieben- bis Neunjährige angemessen heraus.

Die Kombination mit Buchstaben lernen Aktivitäten erweitert den Einsatzbereich. Vorschulkinder profitieren von visueller Mustererkennung. Grundschüler vertiefen logisches Denken. Der Generator wächst mit den Anforderungen der Kinder.`,
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder für Malvorlagen und Deutsch Arbeitsblätter hochladen?',
        answer: `Ja, der Multi-Datei-Upload ermöglicht das Hochladen eigener Bilder. Unterstützt werden JPEG, PNG und GIF Formate. Kombinieren Sie eigene Bilder mit der integrierten Bibliothek für personalisierte Malvorlagen.

Für individuelle Deutsch Arbeitsblätter laden Sie Klassenfotos oder thematische Bilder hoch. Die hochgeladenen Bilder werden den Musterelementen zugewiesen. So entstehen einzigartige Arbeitsblätter mit persönlichem Bezug.`,
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Mathe Arbeitsblättern und Einmaleins Übungen?',
        answer: `Die Erstellung eines kompletten Arbeitsblatts dauert unter drei Minuten. Wählen Sie Mustertyp, Bilder und Papierformat. Ein Klick generiert das fertige Arbeitsblatt. Die automatische Themenwahl beschleunigt den Prozess zusätzlich.

Für Mathe Arbeitsblätter und Einmaleins Vorbereitungsmaterialien ist die Zeitersparnis erheblich. Traditionelle Erstellung dauert 30 bis 60 Minuten. Mit dem Generator erstellen Sie in derselben Zeit zehn oder mehr Varianten.`,
      },
      {
        id: '11',
        question: 'Enthalten Muster-Arbeitsblätter für Rechnen lernen einen Lösungsschlüssel?',
        answer: `Ja, zu jedem Arbeitsblatt generieren Sie einen separaten Lösungsschlüssel. Der Lösungsschlüssel zeigt das vollständige Muster ohne Lücken. Lehrkräfte verwenden ihn zur schnellen Korrektur.

Für Rechnen lernen und Musterübungen ist der Lösungsschlüssel besonders wertvoll. Eltern können Hausaufgaben selbstständig kontrollieren. Die Selbstkontrolle fördert eigenständiges Lernen. Export erfolgt als separate JPEG oder PDF Datei.`,
      },
      {
        id: '12',
        question: 'Kann ich Muster-Arbeitsblätter für Ausmalbilder und bestimmte Schulthemen erstellen?',
        answer: `Die themenbasierte Bildbibliothek ermöglicht fächerübergreifende Arbeitsblätter. Wählen Sie Tierbilder für den Sachunterricht. Nutzen Sie Obst und Gemüse für Ernährungsthemen. Fahrzeuge eignen sich für Verkehrserziehung.

Kombinieren Sie Muster-Arbeitsblätter mit Ausmalbilder für kreative Einheiten. Kinder malen die Bilder vor dem Ausschneiden aus. Jahreszeitliche Themen wie Herbst oder Weihnachten sind verfügbar. So integrieren Sie Musterübungen in jeden Unterrichtskontext.`,
      },
      {
        id: '13',
        question: 'Welche Mustertypen kann ich mit dem Generator für Arbeitsblätter Grundschule erstellen?',
        answer: `Der Generator unterstützt fünf verschiedene Mustertypen für unterschiedliche Schwierigkeitsstufen. Das einfache AB-Muster eignet sich für Anfänger und jüngere Kinder. AAB und ABB Muster bieten eine mittlere Herausforderung für Vorschule Arbeitsblätter.

Für fortgeschrittene Schüler stehen ABC und AABB Muster zur Verfügung. Diese komplexen Muster fördern das mathematische Denken. Die Auswahl des Mustertyps erfolgt über ein einfaches Dropdown-Menü. So erstellen Sie differenzierte Arbeitsblätter Grundschule für jede Lerngruppe.`,
      },
      {
        id: '14',
        question: 'Kann ich die erstellten Kostenlose Arbeitsblätter digital teilen?',
        answer: `Ja, beide Exportformate eignen sich für digitale Verteilung. JPEG-Dateien können per E-Mail oder Messenger versendet werden. PDF-Dateien sind ideal für Lernplattformen und digitale Klassenzimmer.

Die 300 DPI Qualität bleibt auch bei digitaler Ansicht erhalten. Teilen Sie kostenlose Arbeitsblätter mit Eltern für Hausaufgaben. Nutzen Sie die Dateien für Online-Unterricht und Fernlernen. Die Dateigröße ist für schnellen Download optimiert.`,
      },
      {
        id: '15',
        question: 'Wie funktioniert die automatische Themenwahl für Vorschule Arbeitsblätter?',
        answer: `Die automatische Themenwahl ist der schnellste Weg zu fertigen Arbeitsblättern. Wählen Sie einfach ein Thema aus dem Dropdown-Menü. Das System wählt automatisch passende Bilder aus der Bibliothek aus.

Alle ausgewählten Bilder harmonieren thematisch miteinander. Für Vorschule Arbeitsblätter stehen kinderfreundliche Themen bereit. Tiere, Fahrzeuge, Obst, Jahreszeiten und viele mehr. In Sekunden entstehen optisch ansprechende Muster-Arbeitsblätter ohne manuelle Bildauswahl.`,
      },
      {
        id: '16',
        question: 'Gibt es eine Testversion des Muster-Zug Generators für Mathe Arbeitsblätter?',
        answer: `Das Vollzugriff Abo kann jederzeit gekündigt werden. Sie können den Generator und alle 33 Apps vollständig testen. Bei monatlicher Zahlung beträgt der Preis 25 Euro. So probieren Sie alle Funktionen für Mathe Arbeitsblätter ohne langfristige Bindung aus.

Die Kündigung erfolgt unkompliziert über Ihr Kundenkonto. Keine versteckten Kosten oder Kündigungsfristen. Alle während des Abonnements erstellten Arbeitsblätter bleiben Ihnen erhalten. Die kommerzielle Lizenz gilt auch nach Kündigung weiter für bereits erstellte Materialien.`,
      },
      {
        id: '17',
        question: 'Kann ich den Schwierigkeitsgrad der Arbeitsblätter für Rechnen lernen anpassen?',
        answer: `Ja, mehrere Einstellungen ermöglichen die Anpassung der Schwierigkeit. Die Hinweisanzahl steuert, wie viele Musterelemente vorgegeben sind. Vier bis zehn Hinweise sind einstellbar. Mehr Hinweise erleichtern die Aufgabe für jüngere Kinder.

Der Mustertyp bestimmt die Komplexität grundlegend. AB-Muster für Einsteiger, AABB für Fortgeschrittene. Diese Kombination ermöglicht perfekte Differenzierung. So bereiten Sie Arbeitsblätter für Rechnen lernen auf jedem Niveau vor.`,
      },
      {
        id: '18',
        question: 'Funktioniert der Generator auf Tablet und Smartphone für Kostenlose Druckvorlagen?',
        answer: `Der Generator ist für Desktop-Browser optimiert. Die umfangreichen Bearbeitungsfunktionen erfordern einen größeren Bildschirm. Auf Tablets mit großem Display funktioniert die Bedienung ebenfalls gut.

Smartphones eignen sich weniger für die Erstellung komplexer Arbeitsblätter. Die Vorschau und Download-Funktionen sind aber mobil nutzbar. Erstellen Sie kostenlose Druckvorlagen am Computer und laden Sie sie überall herunter. Die fertigen Arbeitsblätter können von jedem Gerät gedruckt werden.`,
      },
    ],
  },

  // Related Apps Section - FULL text from muster-zug.md
  relatedApps: {
    sectionTitle: 'Muster-Zug kombinieren mit anderen Generatoren - Schwungübungen und Buchstaben lernen Pakete',
    sectionDescription: 'Das Vollzugriff Abo enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie den Muster-Zug mit anderen Werkzeugen für umfassende Lernpakete. Thematisch abgestimmte Materialien verstärken den Lerneffekt. Entdecken Sie die besten Kombinationen für Ihren Unterricht.',
    ctaTitle: 'Bereit für professionelle Muster-Zug Arbeitsblätter?',
    ctaDescription: 'Schließen Sie sich tausenden Pädagogen an, die professionelle Arbeitsblätter in Minuten erstellen.',
    primaryCtaText: 'Kostenlos Testen',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert Perfekt Mit',
    exploreText: 'Alle Apps entdecken',
    trustBadges: {
      securePayment: 'Sichere Zahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'pattern-worksheet',
        name: 'Muster-Arbeitsblätter',
        category: 'Logik',
        icon: '🔢',
        description: 'Kombinieren Sie Muster-Zug mit klassischen Muster-Arbeitsblättern für umfassende Mustererkennung.',
      },
      {
        id: '2',
        slug: 'matching-app',
        name: 'Zuordnungsübungen',
        category: 'Visuelles Lernen',
        icon: '🔗',
        description: 'Verbinden Sie Muster-Zug mit Zuordnungsarbeitsblättern für visuelles Unterscheidungstraining.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Suchen und Zählen',
        category: 'Mathe',
        icon: '🔍',
        description: 'Erstellen Sie komplette Mathe-Pakete mit Muster-Zug und Zählübungen für Kindergarten.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Kombinieren Sie Muster-Zug mit Ausmalbilder für kreative Lernpakete mit Feinmotorik-Training.',
      },
      {
        id: '5',
        slug: 'alphabet-train',
        name: 'Alphabet-Zug',
        category: 'Sprache',
        icon: '🚂',
        description: 'Nutzen Sie beide Zug-Generatoren für konsistente Arbeitsblätter beim Buchstaben lernen.',
      },
      {
        id: '6',
        slug: 'addition',
        name: 'Additions-Arbeitsblätter',
        category: 'Mathe',
        icon: '➕',
        description: 'Verknüpfen Sie Mustererkennung mit Additionsübungen für ganzheitliche Mathe-Förderung.',
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Vollzugriff',
    price: '240€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährlich abgerechnet',
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
};

export default patternTrainDeContent;
