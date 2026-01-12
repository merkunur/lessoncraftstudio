import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Präpositionen (Prepositions) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/praepositionen-arbeitsblaetter.ts
 * URL: /de/apps/praepositionen-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/praepositionen.md
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
 * PRICING: Prepositions is a FULL ACCESS app (240 Euro/year or 25 Euro/month)
 */

export const prepositionsDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'praepositionen-arbeitsblaetter',
    appId: 'prepositions',
    title: 'Präpositionen Generator - Kostenlose Arbeitsblätter für Vorschule und Arbeitsblätter Grundschule',
    description: 'Erstellen Sie professionelle Präpositionen-Arbeitsblätter mit unserem Generator. Mit Ihrem Vollzugriff Abonnement gestalten Sie unbegrenzt druckbare Arbeitsblätter für Vorschule und Grundschule. Kinder lernen räumliche Konzepte wie in, auf, unter und neben.',
    keywords: 'präpositionen arbeitsblätter, räumliche begriffe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, deutsch arbeitsblätter, schwungübungen, buchstaben lernen, rechnen lernen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/praepositionen-arbeitsblaetter',
  },

  // Hero Section - FULL text from praepositionen.md
  hero: {
    title: 'Präpositionen Generator',
    subtitle: 'Kostenlose Arbeitsblätter für Vorschule und Arbeitsblätter Grundschule',
    description: `Erstellen Sie professionelle Präpositionen-Arbeitsblätter mit unserem benutzerfreundlichen Generator. Ihr Vollzugriff Abonnement ermöglicht unbegrenzte Erstellung von Arbeitsblättern ohne Zusatzkosten pro Arbeitsblatt. Generieren Sie kostenlose Arbeitsblätter für Vorschule und Grundschule, die räumliche Konzepte anschaulich vermitteln. Laden Sie hochwertige PDF-Arbeitsblätter in weniger als 3 Minuten herunter.

Der Präpositionen-Generator vermittelt Kindern acht grundlegende räumliche Begriffe durch ansprechende visuelle Übungen. Schüler lernen die Präpositionen in, auf, unter, neben, hinter, zwischen, über und vor durch klare Bild-Text-Kombinationen. Jedes Arbeitsblatt verbindet farbenfrohe Illustrationen mit verständlichen Übungsformaten. Diese Methode macht das Erlernen von Präpositionen für Kinder im Vorschul- und Grundschulalter besonders effektiv.

Lehrkräfte sparen Stunden bei der manuellen Erstellung von Präpositionen-Arbeitsblättern. Unser Generator erstellt professionelle Arbeitsblätter Grundschule in Minuten statt Stunden. Wählen Sie zwischen Lückentext oder Multiple-Choice-Formaten. Bestimmen Sie selbst, welche Präpositionen geübt werden sollen, oder kombinieren Sie alle acht Begriffe in einer Übung. Ihr Vollzugriff Abonnement für 240 Euro jährlich oder 25 Euro monatlich beinhaltet unbegrenzte Downloads und eine gewerbliche Lizenz für den Verkauf Ihrer Arbeitsblätter.

Perfekt für Erzieher in der Vorschule und Lehrkräfte in der Grundschule, die schnell qualitativ hochwertige Präpositionen-Arbeitsblätter benötigen. Erstellen Sie Materialien für den Klassenunterricht oder für individuelle Förderung. Passen Sie jedes Element auf der Arbeitsfläche individuell an. Verschieben, drehen und skalieren Sie Bilder für einzigartige Layouts. Fügen Sie eigene Texte hinzu und wählen Sie aus sieben kindgerechten Schriftarten.`,
    previewImageSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Präpositionen Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions_answer_key.jpeg',
        altText: 'Präpositionen Lückentext Arbeitsblatt für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/prepositions/prepositions multiple choice.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions multiple choice answer_key.jpeg',
        altText: 'Präpositionen Multiple-Choice Arbeitsblatt für Mathe Arbeitsblätter und kostenlose Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions multiple choice.pdf',
      },
    ],
  },

  // Features Grid - FULL text from praepositionen.md feature sections
  features: {
    sectionTitle: 'Präpositionen Generator Funktionen - Kostenlose Arbeitsblätter für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
    sectionDescription: 'Unser Präpositionen-Generator bietet sieben leistungsstarke Funktionen für die schnelle Erstellung professioneller Arbeitsblätter. Diese Funktionen arbeiten zusammen und geben Ihnen volle Kontrolle über jedes Detail Ihrer kostenlosen Arbeitsblätter. Ob Sie einfache Präpositionen-Übungen oder komplexe räumliche Konzeptaktivitäten benötigen, unser Generator liefert die passenden Werkzeuge.',
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
        icon: '🖱️',
        title: 'Erstellen Sie Vorschule Arbeitsblätter und Arbeitsblätter Grundschule in 3 Klicks - Schnelle kostenlose Arbeitsblätter',
        description: `Die Erstellung von Präpositionen-Arbeitsblättern dauert nur drei einfache Klicks. Zuerst wählen Sie Ihre Präpositionen aus acht räumlichen Begriffen aus. Zweitens suchen Sie Bilder aus unserer Bibliothek oder laden eigene hoch. Drittens klicken Sie auf Generieren und Ihr Arbeitsblatt erscheint sofort. Keine Designkenntnisse erforderlich. Keine komplizierten Menüs. Unser Generator erstellt Vorschule Arbeitsblätter und Arbeitsblätter Grundschule in unter 3 Minuten vom Start bis zum Download.

Wählen Sie zwischen zwei Übungsformaten. Lückentext-Arbeitsblätter lassen Schüler die richtige Präposition selbst schreiben. Multiple-Choice-Arbeitsblätter bieten Antwortoptionen für jüngere Lernende. Wählen Sie bestimmte Präpositionen für gezieltes Üben oder kombinieren Sie alle acht zusammen. Legen Sie die Anzahl der Übungen von eins bis acht pro Arbeitsblatt fest. Jede Einstellung lässt sich über einfache Dropdown-Menüs und Kontrollkästchen anpassen.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bearbeiten Sie kostenlose Arbeitsblätter auf der Arbeitsfläche - Volle Anpassung für Vorschule und Grundschule',
        description: `Jedes Element auf Ihren Präpositionen-Arbeitsblättern lässt sich direkt auf der Arbeitsfläche bearbeiten. Klicken Sie auf ein Bild, um es auszuwählen. Ziehen Sie Bilder an neue Positionen. Drehen Sie Objekte am Drehgriff. Ändern Sie die Größe durch Ziehen an den Eckgriffen. Löschen Sie unerwünschte Elemente mit einem Klick. Diese vollständige Bearbeitbarkeit unterscheidet unsere Vorschule Arbeitsblätter von starren Vorlagen.

Fügen Sie benutzerdefinierten Text überall auf Ihren kostenlosen Arbeitsblättern hinzu. Tippen Sie Titel, Anweisungen oder Schülernamen ein. Wählen Sie aus sieben kindgerechten Schriftarten wie Baloo 2, Nunito und Quicksand. Passen Sie die Textgröße von 8 bis 72 Punkt an. Ändern Sie Textfarben passend zu Ihrem Klassenthema.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Laden Sie eigene Bilder hoch für Mathe Arbeitsblätter, Deutsch Arbeitsblätter und Ausmalbilder',
        description: `Laden Sie Ihre eigenen Fotos und Bilder hoch, um wirklich personalisierte Präpositionen-Arbeitsblätter zu erstellen. Klicken Sie auf den Upload-Button und wählen Sie mehrere Bilddateien gleichzeitig aus. Unterstützte Formate sind JPEG, PNG und GIF. Kombinieren Sie hochgeladene Bilder mit unserer Bibliothek von über 3000 kindgerechten Grafiken. So entstehen Arbeitsblätter, die das Leben und die Interessen Ihrer Schüler widerspiegeln.

Verwenden Sie Fotos von Klassenzimmerobjekten für vertraute Präpositionen-Übungen. Laden Sie Bilder der Lieblingsspielzeuge Ihrer Schüler hoch. Fügen Sie Fotos von Schulorten wie dem Spielplatz oder der Cafeteria ein. Diese persönlichen Verbindungen machen Mathe Arbeitsblätter und Deutsch Arbeitsblätter ansprechender.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Erstellen Sie Arbeitsblätter Grundschule in 11 Sprachen - Mehrsprachige Vorschule Arbeitsblätter und Deutsch Arbeitsblätter',
        description: `Unser Präpositionen-Generator arbeitet in 11 Sprachen. Erstellen Sie Arbeitsblätter auf Deutsch, Englisch, Spanisch, Französisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch oder Finnisch. Alle Präpositionen werden in jeder Sprache korrekt übersetzt. In, auf, unter, neben, hinter, zwischen, über und vor erscheinen mit präzisen Übersetzungen. Dies macht unser Tool unverzichtbar für DaZ-Lehrkräfte und mehrsprachige Klassenzimmer.

Spracheinstellungen wirken sich auf Benutzeroberfläche und Inhalt aus. Der gesamte Generator wird in Ihrer gewählten Sprache angezeigt. Alle Präpositionen werden korrekt auf den Arbeitsblättern gedruckt. Bildnamen werden automatisch übersetzt, wenn verfügbar.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Gewerbliche Lizenz für Arbeitsblätter Grundschule - Verkaufen Sie kostenlose Arbeitsblätter und Ausmalbilder online',
        description: `Das Vollzugriff Abonnement beinhaltet eine vollständige gewerbliche Lizenz für Ihre Präpositionen-Arbeitsblätter. Verkaufen Sie Arbeitsblätter auf Eduki ohne zusätzliche Gebühren. Erstellen Sie Produktangebote auf Etsy und Amazon KDP. Bauen Sie ein passives Einkommen auf, während Sie anderen Pädagogen helfen. Viele Lehrkräfte verdienen monatlich 500 bis 5000 Euro mit dem Verkauf kostenloser Arbeitsblätter und Ausmalbilder, die sie mit unserem Generator erstellt haben.

Die gewerbliche Lizenz deckt Print-on-Demand-Nutzung ab. Keine Namensnennung erforderlich. Keine Tantiemen pro Arbeitsblatt. Ihre Vollzugriff Abonnementgebühr deckt alles ab. Erstellen Sie unbegrenzt Arbeitsblätter Grundschule und verkaufen Sie sie so oft Sie möchten.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Zugriff auf über 3000 kindgerechte Bilder - Themenbibliothek für kostenlose Arbeitsblätter, Mathe Arbeitsblätter und Buchstaben lernen',
        description: `Unsere Bildbibliothek enthält über 3000 Illustrationen, perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule. Alle Bilder zeigen leuchtende Farben und einfache Designs, die junge Lernende ansprechen. Durchsuchen Sie Kategorien nach Themen, um passende Bilder schnell zu finden. Themen umfassen Tiere, Essen, Spielzeug, Fahrzeuge, Natur und Dutzende weitere Kategorien.

Die Suchfunktion hilft, bestimmte Motive schnell zu finden. Geben Sie einen Objektnamen ein und passende Bilder erscheinen sofort. Wählen Sie Bilder einzeln aus oder nutzen Sie ganze Themen für zufällige Vielfalt. Dieses organisierte System macht die Erstellung von Mathe Arbeitsblättern und Materialien für Buchstaben lernen effizient.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Laden Sie professionelle 300 DPI Arbeitsblätter Grundschule herunter - Hochwertige Vorschule Arbeitsblätter und Ausmalbilder',
        description: `Jedes Arbeitsblatt wird in professioneller 300 DPI Auflösung heruntergeladen. Dies garantiert gestochen scharfen Druck auf jedem Drucker. Text bleibt knackig und lesbar. Bilder drucken in lebendigen Farben. Selbst kleine Details werden klar reproduziert. Professionelle Qualität ist wichtig bei der Erstellung von Vorschule Arbeitsblättern für den Unterricht oder den kommerziellen Verkauf.

Wählen Sie zwischen PDF- und JPEG-Downloadformaten. PDF-Dateien bewahren die Qualität perfekt und drucken zuverlässig. JPEG-Dateien eignen sich gut für digitales Teilen und Online-Veröffentlichung. Die Graustufen-Option spart Druckertinte.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from praepositionen.md
  howTo: {
    sectionTitle: 'Präpositionen-Arbeitsblätter in 5 Schritten erstellen - Arbeitsblätter Grundschule und Vorschule Arbeitsblätter schnell und einfach',
    sectionDescription: 'Erstellen Sie professionelle Präpositionen-Arbeitsblätter in fünf einfachen Schritten. Jeder Schritt dauert weniger als eine Minute. Der gesamte Prozess vom Start bis zum fertigen Download benötigt durchschnittlich 2 bis 3 Minuten.',
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
        title: 'Schritt 1: Wählen Sie Präpositionen und Übungsformat - Konfiguration für Vorschule Arbeitsblätter und kostenlose Arbeitsblätter',
        description: `Öffnen Sie den Abschnitt Konfiguration in der linken Seitenleiste. Hier finden Sie alle Einstellungen für Ihre Präpositionen-Übung. Wählen Sie zuerst das Übungsformat. Lückentext-Modus zeigt eine Lücke, in die Schüler die richtige Präposition schreiben. Multiple-Choice-Modus bietet mehrere Antwortoptionen zum Ankreuzen. Wählen Sie das Format passend zum Alter und Können Ihrer Schüler.

Aktivieren Sie die Präpositionen, die Sie üben möchten. Acht Kontrollkästchen zeigen alle verfügbaren räumlichen Begriffe. In, auf, unter, neben, hinter, zwischen, über und vor stehen zur Auswahl. Aktivieren Sie einzelne Präpositionen für gezieltes Üben oder alle zusammen für umfassende Wiederholung.`,
      },
      {
        id: '2',
        number: 2,
        icon: '🖼️',
        title: 'Schritt 2: Wählen Sie Bilder aus der Bibliothek - Themenwahl für Mathe Arbeitsblätter, Deutsch Arbeitsblätter und Schwungübungen',
        description: `Öffnen Sie den Abschnitt Bildauswahl, um Bilder für Ihre Präpositionen-Übungen auszuwählen. Zwei Generierungsmodi stehen zur Verfügung. Der Modus Alle Themen wählt zufällig Bilder aus der gesamten Bibliothek. Der Modus Manuelle Auswahl lässt Sie bestimmte Bilder selbst auswählen. Wählen Sie den Modus, der zu Ihrer Unterrichtsplanung passt.

Bei manueller Auswahl wählen Sie zuerst ein Bildthema aus dem Dropdown-Menü. Themen umfassen Tiere, Essen, Spielzeug, Fahrzeuge, Natur und viele weitere Kategorien. Nach der Themenwahl erscheinen alle verfügbaren Bilder im Auswahlraster.`,
      },
      {
        id: '3',
        number: 3,
        icon: '📄',
        title: 'Schritt 3: Wählen Sie Referenzobjekte und laden Sie eigene Bilder hoch - Personalisierung für Arbeitsblätter Grundschule und Buchstaben lernen',
        description: `Öffnen Sie den Abschnitt Formenersetzung, um Referenzobjekte für Ihre Präpositionen auszuwählen. Referenzobjekte sind die Gegenstände, zu denen die räumliche Beziehung besteht. Der Ball liegt auf dem Tisch bedeutet, der Tisch ist das Referenzobjekt. Standardmäßig verwendet der Generator geometrische Grundformen wie Kreis, Quadrat und Dreieck.

Laden Sie eigene Bilder im Abschnitt Eigene Bilder hochladen hoch. Klicken Sie auf den Button Dateien auswählen und wählen Sie Bilddateien von Ihrem Computer. Hochgeladene Bilder erscheinen in einer Vorschaugalerie.`,
      },
      {
        id: '4',
        number: 4,
        icon: '✨',
        title: 'Schritt 4: Passen Sie Seiteneinstellungen und Design an - Professionelle Vorschule Arbeitsblätter mit Ausmalbilder und Rechnen lernen',
        description: `Öffnen Sie den Abschnitt Seiteneinrichtung für Layout- und Designoptionen. Wählen Sie zuerst das Papierformat. Letter Hochformat und A4 Hochformat eignen sich für Standardarbeitsblätter. Querformate bieten mehr horizontalen Platz. Das quadratische Format funktioniert gut für digitale Präsentationen.

Wählen Sie eine Arbeitsblattvorlage aus dem Dropdown-Menü. Vorlagen definieren das grundlegende Layout Ihrer Übungen. Die Standardvorlage funktioniert für die meisten Vorschule Arbeitsblätter. Fügen Sie dekorative Rahmen und Hintergründe hinzu.`,
      },
      {
        id: '5',
        number: 5,
        icon: '📥',
        title: 'Schritt 5: Generieren, bearbeiten und herunterladen - Fertige kostenlose Arbeitsblätter, Einmaleins und Deutsch Arbeitsblätter',
        description: `Klicken Sie auf die Schaltfläche Generieren in der oberen Symbolleiste. Der Generator erstellt Ihr Präpositionen-Arbeitsblatt sofort. Alle ausgewählten Bilder erscheinen in zufälliger räumlicher Anordnung. Präpositionslücken oder Multiple-Choice-Optionen werden automatisch platziert.

Bearbeiten Sie jedes Element nach der Generierung. Klicken Sie auf Bilder, um sie auszuwählen und zu verschieben. Klicken Sie auf Lösungsblatt erstellen für ein passendes Antwortblatt. Klicken Sie auf Herunterladen und wählen Sie Ihr Format. PDF eignet sich für Drucken, JPEG für digitales Teilen.`,
      },
    ],
  },

  // Use Cases Section - FULL text from praepositionen.md
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte Eltern und Pädagogen - Vorschule Arbeitsblätter Arbeitsblätter Grundschule und Kostenlose Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Unser Präpositionen-Generator dient verschiedenen Pädagogen mit unterschiedlichen Bedürfnissen. Vorschulerzieher erstellen täglich Materialien für räumliche Konzepte. Grundschullehrkräfte integrieren Präpositionen in den Deutschunterricht. Eltern im Homeschooling generieren individuelle Übungen für ihre Kinder.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Vorschulerzieher und Kindergarten - Kostenlose Arbeitsblätter für Schwungübungen und Buchstaben lernen',
        subtitle: 'Kindergarten und Kita',
        description: `Erzieher in Vorschule und Kindergarten nutzen Präpositionen-Arbeitsblätter für die Sprachentwicklung junger Kinder. Räumliche Begriffe gehören zu den ersten abstrakten Konzepten, die Kinder lernen. Unser Generator erstellt altersgerechte kostenlose Arbeitsblätter mit großen, farbenfrohen Bildern. Multiple-Choice-Format eignet sich perfekt für Kinder, die noch nicht schreiben können.

Kombinieren Sie Präpositionen-Arbeitsblätter mit anderen Vorschulaktivitäten. Erstellen Sie thematische Pakete mit Schwungübungen zum Üben der Stifthaltung. Fügen Sie Arbeitsblätter für Buchstaben lernen hinzu, die dieselben Bilder verwenden. Diese thematische Konsistenz verstärkt das Lernen über verschiedene Aktivitäten hinweg.`,
        quote: 'Meine Vorschulkinder lieben die bunten Präpositionen-Arbeitsblätter!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer erstellen Arbeitsblätter Grundschule - Mathe Arbeitsblätter und Deutsch Arbeitsblätter für 1. bis 4. Klasse',
        subtitle: '1. bis 4. Klasse',
        description: `Grundschullehrkräfte integrieren Präpositionen-Arbeitsblätter in verschiedene Unterrichtsfächer. Im Deutschunterricht üben Schüler räumliche Begriffe als Teil des Wortschatzes. In Sachkunde beschreiben Kinder Positionen von Objekten in der Natur. Sogar im Mathematikunterricht helfen Präpositionen beim Verständnis von Mengenrelationen.

Erstellen Sie differenzierte Materialien für unterschiedliche Leistungsniveaus. Anfänger erhalten Arbeitsblätter mit wenigen Übungen und einfachen Präpositionen. Fortgeschrittene Schüler bewältigen alle acht räumlichen Begriffe gleichzeitig. Lückentext-Format fordert Schüler, die richtige Antwort selbst zu schreiben.`,
        quote: 'Perfekte Ergänzung für den differenzierten Unterricht in der Grundschule!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern nutzen Vorschule Arbeitsblätter - Mathe Arbeitsblätter, Schwungübungen und Buchstaben lernen zu Hause',
        subtitle: 'Lernen zu Hause',
        description: `Eltern im Homeschooling schätzen die Flexibilität unseres Präpositionen-Generators. Erstellen Sie maßgeschneiderte Vorschule Arbeitsblätter passend zu den Interessen Ihres Kindes. Liebt Ihr Kind Dinosaurier? Laden Sie Dinosaurierbilder hoch und erstellen Sie personalisierte Übungen. Der T-Rex steht hinter dem Baum. Diese persönliche Verbindung steigert die Lernmotivation erheblich.

Integrieren Sie Präpositionen in Ihren Hausunterrichtsplan. Beginnen Sie den Tag mit Schwungübungen zum Aufwärmen der Feinmotorik. Wechseln Sie zu Präpositionen-Arbeitsblättern für Sprachentwicklung. Fügen Sie Mathe Arbeitsblätter hinzu, die räumliche Konzepte mit Zahlen verbinden.`,
        quote: 'Ein Werkzeug deckt alle Lernbereiche meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'DaZ-Lehrkräfte verwenden Deutsch Arbeitsblätter - Mehrsprachige Arbeitsblätter für Sprachförderung',
        subtitle: 'Sprachförderung mit Präpositionen',
        description: `DaZ-Lehrkräfte profitieren besonders von der 11-Sprachen-Unterstützung unseres Generators. Erstellen Sie Präpositionen-Arbeitsblätter in der Herkunftssprache Ihrer Schüler. Zeigen Sie dieselbe Übung auf Deutsch und Türkisch nebeneinander. Schüler verstehen das Konzept in ihrer Muttersprache und übertragen es auf Deutsch. Diese Brückenstrategie beschleunigt den Spracherwerb erheblich.

Räumliche Präpositionen gehören zu den wichtigsten Alltagsbegriffen. Neuankömmlinge brauchen Wörter wie in, auf und unter für die tägliche Kommunikation. Unser Generator erstellt Deutsch Arbeitsblätter mit klaren visuellen Hinweisen.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '♿',
        title: 'Sonderpädagogen erstellen individualisierte Vorschule Arbeitsblätter - Einmaleins, Rechnen lernen und Buchstaben lernen für Differenzierung',
        subtitle: 'Förderschule und Inklusion',
        description: `Sonderpädagogen erstellen hochgradig individualisierte Präpositionen-Arbeitsblätter für spezifische Förderziele. Laden Sie Fotos von tatsächlichen Klassenzimmerobjekten hoch. Erstellen Sie Übungen mit vertrauten Gegenständen aus der Lebenswelt des Schülers. Der Bleistift liegt neben dem Heft auf meinem Tisch. Diese Konkretheit unterstützt Schüler mit besonderen Lernbedürfnissen.

Passen Sie die Komplexität an individuelle Fähigkeiten an. Reduzieren Sie die Anzahl der Übungen auf ein oder zwei pro Blatt. Wählen Sie nur kontrastierende Präpositionen wie auf und unter. Vergrößern Sie Bilder für Schüler mit Sehschwierigkeiten.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Förderbedarf erstellen.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Lehrkräfte als Unternehmer verkaufen Ausmalbilder - Mathe Arbeitsblätter und Schwungübungen auf Eduki',
        subtitle: 'Verkauf auf Online-Plattformen',
        description: `Lehrkräfte, die Unterrichtsmaterialien verkaufen, nutzen unseren Präpositionen-Generator für profitable Arbeitsblatt-Pakete. Erstellen Sie thematische Sammlungen für verschiedene Jahreszeiten. Herbst-Präpositionen mit Blättern und Kürbissen. Winter-Übungen mit Schneemännern und Geschenken. Diese saisonalen Pakete verkaufen sich besonders gut auf Eduki und Etsy.

Die gewerbliche Lizenz im Vollzugriff Abonnement erlaubt unbegrenzten Verkauf. Keine zusätzlichen Lizenzgebühren pro Arbeitsblatt. Viele Lehrkräfte verdienen monatlich 500 bis 2000 Euro mit Arbeitsblatt-Verkäufen. Top-Verkäufer erreichen 5000 Euro und mehr.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL text from praepositionen.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Präpositionen-Arbeitsblättern - Mathe Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Hier finden Sie Antworten auf die wichtigsten Fragen zum Präpositionen-Generator. Erfahren Sie alles über Funktionen, Preise und Einsatzmöglichkeiten.',
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
        question: 'Ist der Präpositionen-Generator wirklich kostenlos für Vorschule Arbeitsblätter und kostenlose Arbeitsblätter?',
        answer: `Der Präpositionen-Generator erfordert ein Vollzugriff Abonnement für 240 Euro jährlich oder 25 Euro monatlich. Der Begriff kostenlose Arbeitsblätter bezieht sich auf das Such-Keyword, das Menschen verwenden, wenn sie nach Ressourcen suchen. Mit Ihrem Abonnement erstellen Sie unbegrenzt Präpositionen-Arbeitsblätter ohne Kosten pro Arbeitsblatt. Generieren Sie so viele Vorschule Arbeitsblätter wie Sie benötigen ohne zusätzliche Gebühren.`,
      },
      {
        id: '2',
        question: 'Welche Sprachen unterstützt der Generator für Deutsch Arbeitsblätter und Einmaleins?',
        answer: `Der Präpositionen-Generator unterstützt 11 Sprachen vollständig. Erstellen Sie Arbeitsblätter auf Deutsch, Englisch, Spanisch, Französisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Alle acht Präpositionen werden in jeder Sprache korrekt übersetzt. Die Benutzeroberfläche wechselt ebenfalls in die gewählte Sprache.`,
      },
      {
        id: '3',
        question: 'Kann ich eigene Bilder hochladen für Mathe Arbeitsblätter, Schwungübungen und Ausmalbilder?',
        answer: `Ja, laden Sie unbegrenzt eigene Bilder für personalisierte Arbeitsblätter hoch. Klicken Sie im Abschnitt Eigene Bilder hochladen auf den Datei-Selektor. Wählen Sie mehrere Bilddateien gleichzeitig aus. Unterstützte Formate sind JPEG, PNG und GIF. Hochgeladene Bilder funktionieren in allen Generatoren einschließlich Präpositionen, Mathe Arbeitsblätter, Schwungübungen und Ausmalbilder.`,
      },
      {
        id: '4',
        question: 'Kann ich Präpositionen-Arbeitsblätter für Buchstaben lernen und Rechnen lernen erstellen?',
        answer: `Ja, erstellen Sie fachübergreifende Präpositionen-Arbeitsblätter durch thematische Bildauswahl. Verwenden Sie Buchstabenbilder für Integration mit Aktivitäten für Buchstaben lernen. Der Buchstabe A steht neben dem Buchstabe B. Nutzen Sie Zahlenbilder für Verbindungen zum Rechnen lernen. Die Fünf liegt zwischen der Vier und der Sechs.`,
      },
      {
        id: '5',
        question: 'Kann ich sowohl Farb- als auch Schwarz-Weiß-Arbeitsblätter Grundschule und Ausmalbilder erstellen?',
        answer: `Ja, laden Sie jedes Arbeitsblatt in Farbe und Graustufen herunter. Generieren Sie Ihr Präpositionen-Arbeitsblatt mit farbigen Bildern. Laden Sie zuerst als Voll-Farb-PDF herunter. Aktivieren Sie dann das Kontrollkästchen Graustufen und laden Sie erneut herunter. Die Schwarz-Weiß-Version spart Druckertinte für Hausaufgaben.`,
      },
      {
        id: '6',
        question: 'Wie unterstützen Präpositionen-Arbeitsblätter Einmaleins und Rechnen lernen in der 1. Klasse?',
        answer: `Präpositionen-Arbeitsblätter unterstützen mathematisches Denken durch räumliche Konzepte. Räumliches Verständnis ist grundlegend für Mathematik. Die Drei steht zwischen der Zwei und der Vier lehrt Zahlenreihenfolge. Fünf Äpfel liegen auf dem Teller verbindet Mengen mit Präpositionen. Diese Integration macht Präpositionen-Übungen wertvoll für Einmaleins-Vorbereitung.`,
      },
      {
        id: '7',
        question: 'Kann ich den Generator für Schwungübungen, Deutsch Arbeitsblätter und Buchstaben lernen-Sammlungen verwenden?',
        answer: `Ja, Vollzugriff beinhaltet alle Arbeitsblatt-Generatoren auf einer Plattform. Erstellen Sie Präpositionen-Arbeitsblätter neben Schwungübungen für Feinmotorik-Training. Generieren Sie Deutsch Arbeitsblätter für Sprachentwicklung. Fügen Sie Materialien für Buchstaben lernen für Literacy-Stationen hinzu. Alle Generatoren teilen dieselbe Bildbibliothek für thematische Konsistenz.`,
      },
      {
        id: '8',
        question: 'Wie lange dauert die Erstellung von Vorschule Arbeitsblätter, Schwungübungen und Ausmalbilder?',
        answer: `Die Erstellung eines Präpositionen-Arbeitsblatts dauert 90 Sekunden bis 3 Minuten. Wählen Sie Präpositionen und Format in 15 Sekunden. Weisen Sie Bilder in 30 bis 60 Sekunden zu. Klicken Sie auf Generieren für sofortiges Ergebnis. Der Download dauert weitere 10 Sekunden. Dieselbe Geschwindigkeit gilt für Vorschule Arbeitsblätter, Schwungübungen und Ausmalbilder.`,
      },
      {
        id: '9',
        question: 'Kann ich Präpositionen-Arbeitsblätter kommerziell für Deutsch Arbeitsblätter und Einmaleins verkaufen?',
        answer: `Ja, Vollzugriff beinhaltet eine vollständige gewerbliche Lizenz für alle erstellten Materialien. Verkaufen Sie Präpositionen-Arbeitsblätter auf Eduki, Etsy und Amazon KDP ohne zusätzliche Gebühren. Keine Tantiemen pro Verkauf. Keine Mengenbeschränkungen. Die Lizenz deckt alle Generatoren ab. Viele Lehrkräfte verdienen monatlich 500 bis 2000 Euro durch Arbeitsblatt-Verkäufe.`,
      },
      {
        id: '10',
        question: 'Welche Papierformate unterstützt der Generator für kostenlose Arbeitsblätter und Arbeitsblätter Grundschule?',
        answer: `Der Präpositionen-Generator unterstützt sechs Papierformate für verschiedene Anforderungen. Letter Hochformat und Querformat für amerikanische Standards. A4 Hochformat und Querformat für europäische Normen. Quadratisches Format für digitale Präsentationen und soziale Medien. Benutzerdefinierte Größen für spezielle Anforderungen mit exakten Pixelmaßen.`,
      },
      {
        id: '11',
        question: 'Gibt es Lösungsblätter für Präpositionen-Arbeitsblätter mit Rechnen lernen und Mathe Arbeitsblättern?',
        answer: `Ja, jedes Präpositionen-Arbeitsblatt kann einen Lösungsschlüssel erhalten. Klicken Sie auf Lösungsblatt erstellen nach dem Generieren. Die Lösung zeigt alle korrekten Präpositionen ausgefüllt. Laden Sie Arbeitsblatt und Lösung separat herunter. Perfekt für die Selbstkontrolle bei Rechnen lernen Übungen. Auch für Mathe Arbeitsblätter mit Präpositionen-Elementen ideal.`,
      },
      {
        id: '12',
        question: 'Für welche Altersgruppen eignen sich Präpositionen-Arbeitsblätter mit Ausmalbilder und Malvorlagen?',
        answer: `Präpositionen-Arbeitsblätter eignen sich für Kinder von 4 bis 10 Jahren. Vorschulkinder lernen grundlegende Kategorisierung mit einfachen räumlichen Begriffen. Grundschüler üben komplexere Präpositionen und Satzstrukturen. Die Anzahl der Übungen und die gewählten Präpositionen bestimmen den Schwierigkeitsgrad. Kombinieren Sie mit Ausmalbilder und Malvorlagen für jüngere Kinder.`,
      },
    ],
  },

  // Related Apps Section - FULL text from praepositionen.md
  relatedApps: {
    sectionTitle: 'Präpositionen-Arbeitsblätter mit anderen Generatoren kombinieren - Schwungübungen und Buchstaben lernen Lernpakete erstellen',
    sectionDescription: 'Der Präpositionen-Generator ist eines von 33 Tools im Vollzugriff Abonnement. Kombinieren Sie verschiedene Arbeitsblatt-Typen für umfassende Lernpakete. Erstellen Sie thematisch abgestimmte Materialien für Ihren Unterricht.',
    ctaTitle: 'Bereit für professionelle Präpositionen-Arbeitsblätter?',
    ctaDescription: 'Schließen Sie sich tausenden Pädagogen an, die professionelle Arbeitsblätter in Minuten erstellen.',
    primaryCtaText: 'Kostenlos Testen',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert Perfekt Mit',
    exploreText: 'Alle Apps entdecken',
    trustBadges: {
      guarantee: '30-Tage-Garantie',
      securePayment: 'Sichere Zahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'writing-app',
        name: 'Schwungübungen',
        category: 'Schreiben',
        icon: '✏️',
        description: 'Präpositionen-Arbeitsblätter mit Schwungübungen kombinieren - Feinmotorik und Sprachentwicklung für Vorschule Arbeitsblätter',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Buchstaben-Zug',
        category: 'Sprache',
        icon: '🚂',
        description: 'Präpositionen mit Buchstaben lernen verbinden - Literacy-Pakete für Arbeitsblätter Grundschule und Vorschule',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Ausmalbilder und Malvorlagen als Ergänzung zu Präpositionen-Arbeitsblättern - Kreative Pausen einbauen',
      },
      {
        id: '4',
        slug: 'image-addition',
        name: 'Additions-Arbeitsblätter',
        category: 'Mathe',
        icon: '➕',
        description: 'Präpositionen plus Mathe Arbeitsblätter - Räumliches Denken mit Rechnen lernen und Einmaleins verbinden',
      },
      {
        id: '5',
        slug: 'word-search',
        name: 'Wortsuche',
        category: 'Sprache',
        icon: '🔍',
        description: 'Komplette Deutsch-Pakete mit Präpositionen und Wortschatzübungen - Arbeitsblätter Grundschule für jeden Tag',
      },
      {
        id: '6',
        slug: 'matching-app',
        name: 'Zuordnungsübungen',
        category: 'Logik',
        icon: '🔗',
        description: 'Thematische Lernpakete mit Zuordnung und Präpositionen - Kostenlose Arbeitsblätter für Vorschule und Grundschule',
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
  },
};

export default prepositionsDeContent;
