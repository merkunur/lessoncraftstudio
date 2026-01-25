import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Schreibübungen (Writing) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/schreibuebungen-arbeitsblaetter.ts
 * URL: /de/apps/schreibuebungen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/schreibuebungen.md
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
 * PRICING: Writing is a FULL ACCESS app (€240/year or €25/month)
 */

export const writingDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'schreibuebungen-arbeitsblaetter',
    appId: 'writing',
    title: 'Schreibübungen Arbeitsblätter Kostenlos | Generator für Grundschule',
    description: 'Schreibübungen Arbeitsblätter in 3 Minuten erstellen. Schwungübungen & Buchstaben lernen für Vorschule & Grundschule. 3000+ Bilder, 300 DPI. Jetzt testen!',
    keywords: 'schreibübungen arbeitsblätter, schwungübungen, buchstaben lernen, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, einmaleins, deutsch arbeitsblätter, rechnen lernen, ausmalbilder, malvorlagen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/schreibuebungen-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/writing/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schreibübungen Arbeitsblatt kostenlos - Schwungübungen für Vorschule und Grundschule',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/writing/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Buchstaben lernen Arbeitsblatt kostenlos - Kostenloses Arbeitsblatt für Kinder zum Nachspuren',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/writing/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schreibübungen Kostenlose Druckvorlagen - Arbeitsblätter Grundschule zum Ausdrucken',
      },
    ],
  },

  // Hero Section - FULL text from schreibuebungen.md
  hero: {
    title: 'Schreibübungen Arbeitsblätter Generator',
    subtitle: 'Kostenlose Schwungübungen und Buchstaben lernen zum Ausdrucken für Vorschule und Grundschule',
    description: `Erstellen Sie professionelle Schreibübungen mit unserem Arbeitsblatt-Generator. Ihr Vollzugriff-Abo ermöglicht unbegrenzte Erstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Schwungübungen und Übungen zum Buchstaben lernen für Vorschule und Grundschule. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter.

Unser Generator für Schreibübungen hilft Pädagogen bei der Erstellung von Arbeitsblättern Grundschule mit geführten Schreiblinien. Wählen Sie zwischen Druckschrift und Schreibschrift mit verschiedenen Nachspurmodi. Jedes Arbeitsblatt enthält die richtigen Grundlinien für korrekte Buchstabenbildung. Perfekt für den Schreibunterricht in allen Klassenstufen.

Generieren Sie Schwungübungen für Buchstaben, Wörter, Namen oder eigene Texte. Ihr Vollzugriff-Abo beinhaltet den Zugang zu allen 33 Arbeitsblatt-Generatoren plus kommerzielle Lizenz. Erstellen Sie unbegrenzt kostenlose Arbeitsblätter für den Unterricht oder zum Verkauf auf Lehrerplattformen.`,
    previewImageSrc: '/samples/german/writing/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/writing/
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from schreibuebungen.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Generator für Schreibübungen bietet leistungsstarke Funktionen speziell für Schwungübungen und Buchstaben lernen. Pädagogen schätzen die Kombination aus Einfachheit und Flexibilität. Erstellen Sie professionelle Arbeitsblätter in Minuten statt Stunden. Das Vollzugriff-Abo gibt Ihnen volle Kontrolle über jeden Aspekt Ihrer Schwungübungen. Passen Sie Schriftarten an, ändern Sie Zeilenabstände, fügen Sie Bilder hinzu. Erstellen Sie genau das, was Ihre Schüler brauchen. Jede Funktion spart Zeit bei gleichbleibend professioneller Qualität.',
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

  // How-To Guide - FULL text from schreibuebungen.md
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Professionelle Schreibübungen erstellen dauert unter 3 Minuten mit unserem Generator. Der optimierte Arbeitsablauf führt Sie schnell vom leeren Blatt zum fertigen Arbeitsblatt. Keine Grafikdesign-Erfahrung erforderlich. Folgen Sie fünf einfachen Schritten für Schwungübungen nach Ihren genauen Unterrichtsbedürfnissen. Ihre Schüler erhalten hochwertige Übungsmaterialien in Minuten statt Stunden. Jeder Schritt baut natürlich auf dem vorherigen auf.',
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
        title: 'Schritt 1: Seiteneinrichtung und Bilder Wählen - Kostenlose Arbeitsblätter und Arbeitsblätter Grundschule Erstellen',
        description: `Beginnen Sie mit der Auswahl Ihrer Seitengröße im Bereich Seiteneinrichtung. Wählen Sie Letter Hochformat für deutsche Standarddrucker. Wählen Sie A4 Hochformat für internationale Einstellungen. Nehmen Sie Querformat für breitere Schreibzeilen. Die Option Benutzerdefiniert ermöglicht exakte Pixelangaben. Die Arbeitsfläche passt sich automatisch an Ihre gewählte Größe an.

Fügen Sie optional Hintergrundthemen und Rahmenverzierungen hinzu. Klicken Sie auf das Dropdown Hintergrundthema zum Durchstöbern verfügbarer Optionen. Miniaturansichten zeigen jedes Thema vor der Auswahl. Passen Sie die Hintergrunddeckkraft mit dem Schieberegler an für dezente Wasserzeicheneffekte. Rahmenthemen funktionieren identisch mit eigenen Deckkraftreglern. Diese dekorativen Elemente machen Arbeitsblätter ansprechender ohne von Schreibübungen abzulenken.

Laden Sie eigene Bilder hoch für personalisierte Inhalte. Klicken Sie auf den Bereich Eigene Bilder hochladen für die Dateiauswahl. Wählen Sie mehrere Bilddateien gleichzeitig von Ihrem Computer. Vorschau-Miniaturansichten zeigen alle hochgeladenen Bilder. Sie können Klassenfotos, Schülerbilder oder fachspezifische Grafiken hinzufügen. Hochgeladene Bilder stehen zur Platzierung auf Ihrer Arbeitsfläche bereit.

Durchstöbern Sie alternativ die Bibliothek mit über 3000 Bildern. Öffnen Sie den Bereich Bildbibliothek und wählen Sie ein Thema aus dem Dropdown. Suchen Sie nach Stichwörtern für schnelles Finden bestimmter Bildtypen. Klicken Sie auf eine Miniaturansicht zur Auswahl für Ihr Arbeitsblatt. Ausgewählte Bilder erscheinen im Vorschaubereich. Übungsbilder können automatisch Buchstabeninhalte basierend auf ihren Dateinamen generieren. Diese Verbindung zwischen Bildern und Text vereinfacht die Arbeitsblatt-Erstellung erheblich.`,
      },
      {
        id: '2',
        number: 2,
        icon: '⚙️',
        title: 'Schritt 2: Schreibzeilen-Einstellungen Anpassen - Schwungübungen und Buchstaben lernen für Alle Lernstufen',
        description: `Fügen Sie Ihre erste Schreibzeile hinzu durch Klicken auf Zeile hinzufügen oben rechts. Ein neues Akkordeon erscheint in der Seitenleiste mit der Bezeichnung Zeile 1. Klicken Sie zum Aufklappen und Anzeigen aller Anpassungsoptionen. Jede Zeile funktioniert unabhängig, sodass Sie verschiedene Einstellungen auf einem Arbeitsblatt mischen können. Diese Flexibilität ermöglicht mehrstufige Übungsblätter oder progressive Schwierigkeitssequenzen.

Wählen Sie Ihren Zeilentyp aus dem ersten Dropdown-Menü. Der Modus Nachspuren zeigt vollständige Führungsbuchstaben für Anfänger zum direkten Nachfahren. Der Modus Verblassen zeigt halbtransparente Buchstaben für Übergangsübungen. Der Modus Vorlage kopieren zeigt den ersten Buchstaben vollständig mit verblassten Folgebuchstaben. Jeder Modus dient verschiedenen pädagogischen Zwecken und Kompetenzstufen. Mischen Sie Zeilentypen auf einem Arbeitsblatt für differenzierte Übung.

Wählen Sie Ihren Schriftstil aus dem Dropdown Schriftstil. Druckschrift Normal bietet klare, einfache Buchstaben perfekt für frühe Lerner. Druckschrift Normal Pfeil fügt Richtungspfeile hinzu, die die richtige Strichfolge zeigen. Druckschrift Nachspuren liefert gepunktete Umrissbuchstaben. Druckschrift Nachspuren Pfeil kombiniert Punkte mit Strichrichtungsführung. Die Option Schreibschrift wechselt zu verbundener Handschriftübung. Die Schriftwahl beeinflusst das Lernerlebnis maßgeblich - passen Sie sie an Ihre Unterrichtsziele an.

Legen Sie Ihren Inhaltstyp im Dropdown Inhalt fest. Leere Zeilen bieten blanke Schreiblinien für selbstständige Übung. Die Option Anfangsbuchstabe extrahiert automatisch den ersten Buchstaben aus dem Dateinamen Ihres gewählten Bildes. Ganzer Dateiname zeigt den vollständigen Dateinamentext für Wortübung. Eigener Text ermöglicht die Eingabe beliebiger Texte zum Nachspuren. Ein Textfeld erscheint bei Auswahl dieser Option. Geben Sie Schülernamen, Lernwörter, Sätze oder andere benötigte Inhalte ein.

Wählen Sie die Groß-/Kleinschreibung aus dem entsprechenden Dropdown. Großbuchstaben erzeugt durchgehend Großbuchstaben. Kleinbuchstaben generiert kleine Buchstaben. Satzanfang großschreibt den ersten Buchstaben jedes Wortes. Die Auswahl gilt für automatisch generierte Inhalte aus Bildern oder eingegebenen Text. Schreibanfänger beginnen oft mit Großbuchstaben vor dem Übergang zu Kleinbuchstaben. Die Option ermöglicht gezieltes Üben beider Fertigkeitsstufen.`,
      },
      {
        id: '3',
        number: 3,
        icon: '✨',
        title: 'Schritt 3: Mehrere Schreibzeilen Hinzufügen - Deutsch Arbeitsblätter und Mathe Arbeitsblätter mit Eigenem Inhalt',
        description: `Klicken Sie erneut auf Zeile hinzufügen für weitere Schreibzeilen auf Ihrem Arbeitsblatt. Jede neue Zeile fügt ein weiteres nummeriertes Akkordeon in der Seitenleiste hinzu. Klappen Sie beliebige Zeilen-Akkordeons auf für Zugang zu individuellen Einstellungen. Klappen Sie bereits konfigurierte Zeilen zu zur Reduzierung der Seitenleistenübersicht. Die Seitenleisten-Organisation hält alles überschaubar auch bei vielen Zeilen auf einem Arbeitsblatt.

Konfigurieren Sie jede Zeile unabhängig für umfassende Übungsblätter. Erstellen Sie die erste Zeile mit Großbuchstaben-Nachspurübung. Fügen Sie eine zweite Zeile mit Kleinbuchstaben im Modus Vorlage kopieren hinzu. Nehmen Sie eine dritte Zeile mit eigenen Lernwörtern auf. Mischen Sie Schriftstile wie Druck- und Schreibschrift auf derselben Seite. Diese Mehrzeilen-Flexibilität unterstützt vielfältige Unterrichtsansätze und Schülerbedürfnisse.

Nutzen Sie die Schwungübungs-Funktion für vorbereitende Feinmotorik-Entwicklung. Ändern Sie das Dropdown Inhalt auf Leer. Ein Dropdown Strichart erscheint mit vier Musteroptionen. Senkrechte Linie erzeugt Auf-Ab-Strichübung. Waagerechte Linie bietet Links-Rechts-Bewegungsübung. Kreis ermöglicht geschwungene Strichübung. Zickzack-Linie entwickelt diagonale Kontrolle. Diese grundlegenden Striche bereiten Schüler auf Buchstabenbildung vor.

Löschen Sie beliebige Zeilen durch Klicken auf Zeile löschen am unteren Akkordeonrand. Die Zeile verschwindet sofort aus Seitenleiste und Arbeitsfläche. Das Entfernen von Zeilen hilft beim Verfeinern von Arbeitsblättern während der Erstellung. Probieren Sie verschiedene Konfigurationen aus und löschen Sie, was nicht funktioniert. Experimentieren kostet nichts, da Sie unbegrenzt Varianten sofort neu generieren können.

Fügen Sie so viele Zeilen hinzu, wie bequem auf Ihre Seitengröße passen. Hochformat nimmt typischerweise 5-8 Schreibzeilen auf je nach Höheneinstellungen. Querformat fasst 6-10 Zeilen. Beobachten Sie die Arbeitsflächenvorschau, um zu sehen, wann Ihre Seite voll wirkt. Überladene Arbeitsblätter reduzieren die Wirksamkeit - halten Sie angemessene Abstände zwischen den Zeilen ein. Ihr Gespür für visuelle Balance verbessert sich schnell mit Übung.`,
      },
      {
        id: '4',
        number: 4,
        icon: '🎨',
        title: 'Schritt 4: Auf der Arbeitsfläche Bearbeiten - Ausmalbilder und Einmaleins-Elemente Perfekt Positionieren',
        description: `Ihre Schreibzeilen erscheinen automatisch auf der Arbeitsfläche, während Sie sie erstellen. Jede Zeile wird zu einem verschiebbaren, größenveränderbaren Element, das Sie frei neu positionieren können. Klicken Sie auf eine Zeile zur Auswahl und Anzeige der Bearbeitungsleiste. Blaue Auswahlrahmen zeigen ausgewählte Elemente an. Mehrfachauswahl funktioniert durch Halten von Umschalt beim Klicken auf weitere Elemente. Dieses Arbeitsflächen-System bietet vollständige Layoutkontrolle.

Ziehen Sie ausgewählte Zeilen an neue vertikale Positionen auf der Seite. Klicken und halten Sie auf einer Zeile, dann bewegen Sie die Maus zur Neupositionierung. Lassen Sie die Maustaste los zur Platzierung am neuen Ort. Ordnen Sie die Zeilenreihenfolge durch Hoch- oder Runterziehen neu. Erstellen Sie benutzerdefinierte Abstände zwischen Zeilen durch präzise Positionierung. Visuelle Layoutkontrolle sorgt für optimales Lernmaterial-Design.

Ändern Sie die Zeilengröße durch Greifen des Anfassers unten rechts an ausgewählten Elementen. Klicken und ziehen Sie den Anfasser für höhere oder niedrigere Zeilen. Höhere Zeilen bieten mehr Platz für größere Handschrift. Niedrigere Zeilen funktionieren für ältere Schüler mit entwickelter Feinmotorik. Die Zeilenbreite passt sich automatisch an die Seitenbreite an - Sie kontrollieren nur die Höhe manuell.

Fügen Sie eigene Textblöcke überall auf dem Arbeitsblatt hinzu über den Bereich Textwerkzeuge. Geben Sie Ihren Text in das Eingabefeld ein und klicken Sie auf Text hinzufügen. Der Text erscheint als verschiebbares Element auf der Arbeitsfläche. Wählen Sie den Textblock für Zugang zu Farb-, Größen- und Schriftsteuerungen. Fügen Sie Arbeitsblatt-Titel, Anweisungen, Schülernamenzeilen oder dekorative Textelemente hinzu. Textblöcke integrieren sich nahtlos mit Schreibzeilen.

Platzieren Sie Ausmalbilder und eigene Grafiken auf der Arbeitsfläche über den Modus Eigene Bilder in der Bildbibliothek. Wählen Sie ein hochgeladenes Bild aus der Vorschaugalerie. Klicken Sie auf Ausgewähltes Bild hinzufügen zur Platzierung auf dem Arbeitsblatt. Das Bild wird zu einem beweglichen, größenveränderbaren Element. Positionieren Sie Bilder neben zugehöriger Schreibübung. Fügen Sie Bildaufforderungen über Wort-Nachspurzeilen ein. Erstellen Sie thematische Arbeitsblätter, die Bilder und Text kreativ kombinieren.

Nutzen Sie die Ausrichtungswerkzeuge in der kontextuellen Symbolleiste für präzise Positionierung. Wählen Sie mehrere Elemente, dann klicken Sie auf Ausrichten für Optionen. Linksbündig richtet alle ausgewählten Elemente an ihren linken Kanten aus. Horizontal zentrieren verteilt Elemente gleichmäßig. Oben ausrichten positioniert Elemente entlang derselben oberen Linie. Diese Werkzeuge erzeugen schnell professionell wirkende Layouts ohne mühsame manuelle Anpassung.

Sperren Sie Elemente gegen versehentliche Änderungen nach perfekter Positionierung. Wählen Sie ein Element und klicken Sie auf Sperren in der Symbolleiste. Das Schloss-Symbol ändert sich zur Anzeige des gesperrten Status. Gesperrte Elemente können nicht verschoben, vergrößert oder gelöscht werden bis zur Entsperrung. Nutzen Sie Sperren zum Schutz Ihres sorgfältig gestalteten Layouts während Sie andere Elemente weiter bearbeiten.`,
      },
      {
        id: '5',
        number: 5,
        icon: '📥',
        title: 'Schritt 5: Arbeitsblätter Herunterladen und Drucken - Malvorlagen, Rechnen 1. Klasse und Alle Arbeitsblatttypen in Profiqualität',
        description: `Klicken Sie auf Download oben rechts wenn Ihr Arbeitsblatt-Design fertig ist. Ein Dropdown-Menü bietet zwei Exportformat-Optionen. Als PDF herunterladen erzeugt eine druckfertige PDF-Datei. Als JPEG herunterladen exportiert eine hochauflösende Bilddatei. Beide Formate produzieren professionelle 300 DPI Qualität geeignet zum Drucken oder Verkaufen. Wählen Sie basierend auf Ihrer beabsichtigten Verwendung und Dateikompatibilität.

Aktivieren Sie das Kontrollkästchen Graustufen vor dem Download für Schwarzweiß-Ausgabe. Graustufenkonvertierung spart erheblich Druckertintenkosten. Farbelemente werden automatisch in Grautöne umgewandelt. Schreiblinien und Buchstaben bleiben in Graustufen perfekt klar. Viele Lehrkräfte bevorzugen Graustufen für routinemäßige Übungsarbeitsblätter zur effektiven Verwaltung des Druckbudgets. Farbversionen eignen sich besser für besondere Anlässe oder Produkte zum Verkauf.

Klicken Sie auf Als PDF herunterladen für beste Druckqualität. Das PDF-Format erhält Vektorgrafiken wo möglich. Text und Linien bleiben bei jeder Zoomstufe scharf. PDFs öffnen sich in jedem PDF-Reader auf jedem Gerät. Drucken Sie direkt aus dem PDF-Viewer auf jeden Drucker. PDF-Dateien funktionieren perfekt zum Hochladen auf Lehrermarktplätze oder Etsy als digitale Produkte.

Wählen Sie Als JPEG herunterladen wenn Sie Bilddateien benötigen. JPEG-Format funktioniert leicht mit Textverarbeitungen und Präsentationssoftware. Fügen Sie Arbeitsblatt-Bilder in größere Bildungsressourcen ein. Ergänzen Sie sie zu Klassen-Präsentationen oder Elternbriefen. JPEG-Dateien lassen sich ohne Spezialsoftware einfach anzeigen. Sie laden auf Social-Media-Plattformen zum Teilen von Unterrichtsideen mit Kollegen hoch.

Ihr Download beginnt sofort nach Klicken auf die Formatschaltfläche. Die Datei speichert in Ihren Standard-Download-Ordner. Öffnen Sie die Datei zur Überprüfung des korrekten Erscheinungsbilds vor dem Drucken oder Teilen. Falls Sie Änderungen bemerken, kehren Sie zum Editor zurück und passen Sie an. Generieren Sie Downloads unbegrenzt oft bis Ihr Arbeitsblatt perfekt ist. Keine Download-Limits mit Ihrem Vollzugriff-Abo.

Drucken Sie Ihre heruntergeladenen Arbeitsblätter auf Standarddruckerpapier oder Karton. Normales 80g-Kopierpapier funktioniert für die meisten Schreibübungen. Schwererer Karton bietet mehr Haltbarkeit für wiederholte Nutzung oder Laminierung. Professionelle Druckereien können aus Ihren PDF-Dateien professionelle Arbeitshefte produzieren. Die hohe 300 DPI Auflösung sorgt für scharfen Druck auf jeder professionellen Druckqualitätsstufe.`,
      },
    ],
  },

  // Use Cases Section - FULL text from schreibuebungen.md
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Schreibübungen-Generatoren dienen verschiedenen Unterrichtskontexten und Schülergruppen. Erzieher in der Vorschule, die Kinder auf die Grundschule vorbereiten, brauchen andere Materialien als Lehrkräfte der dritten Klasse, die Schreibschrift verfeinern. Homeschool-Eltern benötigen Flexibilität, die Klassenraumlehrkräfte nicht brauchen. DaZ-Lehrkräfte stehen vor einzigartigen Herausforderungen bei der Buchstabenbildung über Sprachen hinweg. Unser Generator passt sich nahtlos all diesen unterschiedlichen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from schreibuebungen.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Diese FAQ-Sektion beantwortet die häufigsten Fragen zum Schreibübungen-Generator. Falls Sie nach dem Lesen weitere Fragen haben, kontaktieren Sie unser Support-Team für personalisierte Unterstützung. Wir helfen Ihnen gerne bei der optimalen Nutzung aller Generator-Funktionen.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Zahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section - FULL ACCESS pricing
  pricing: {
    title: 'Vollzugriff',
    price: '€240',
    priceInterval: '/Jahr',
    priceSuffix: 'oder €25/Monat',
    benefits: [
      'Unbegrenzt Schreibübungen und Schwungübungen erstellen',
      'Alle 33 Arbeitsblatt-Generatoren inklusive',
      'Kommerzielle Print-on-Demand Lizenz',
      '11 Sprachen vollständig unterstützt',
      'Über 3000 kinderfreundliche Bilder',
      'Professionelle 300 DPI Exportqualität',
      'Eigene Bilder hochladen',
      'Vollständige Arbeitsflächen-Bearbeitung',
      'Jederzeit kündbar',
    ],
    ctaText: 'Vollzugriff Starten',
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

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Ihr Vollzugriff-Abo schaltet alle 33 Arbeitsblatt-Generatoren frei. Kombinieren Sie Schreibübungen mit ergänzenden Generatoren für thematische Lerneinheiten und gebündelte Produkte zum Verkauf.',
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default writingDeContent;
