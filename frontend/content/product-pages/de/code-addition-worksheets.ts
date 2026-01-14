import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Code Addition Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/code-addition-worksheets.ts
 * URL: /de/apps/bilder-additions-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/code-addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Code Addition is a FULL ACCESS app ($240/year = 240€/Jahr)
 * NOT Basis-Paket! Use "Vollzugriff" and "240€" throughout.
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

export const codeAdditionDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'bilder-additions-arbeitsblaetter',
    appId: 'code-addition',
    title: 'Bilder-Additions-Generator - Mathe-Arbeitsblätter Grundschule - Rechnen lernen mit Bildern',
    description: 'Erstellen Sie professionelle Bilder-Additions-Arbeitsblätter für Grundschule und Vorschule mit unserem Generator. Perfekt für Rechnen lernen, Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Bilder-Additions-Generator eignet sich ideal für kostenlose Arbeitsblätter mit visueller Mathematik.',
    keywords: 'bilder addition generator, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter',
  },

  // Hero Section - FULL text from code-addition.md paragraphs 1-4
  hero: {
    title: 'Bilder-Additions-Generator',
    subtitle: 'Mathe-Arbeitsblätter für die Grundschule erstellen - Rechnen lernen mit Bildern',
    description: `Erstellen Sie professionelle Mathe-Arbeitsblätter mit unserem Bilder-Additions-Generator. Mit Ihrem Vollzugriff Abonnement können Sie unbegrenzt Arbeitsblätter Grundschule erstellen. Keine zusätzlichen Kosten pro Arbeitsblatt. Laden Sie hochwertige PDF-Dateien in unter 3 Minuten herunter.

Der Bilder-Additions-Generator verwandelt das Rechnen lernen in ein spannendes Abenteuer. Kinder zählen bunte Bilder wie Äpfel, Autos oder Tiere. Dann schreiben sie die passende Additionsaufgabe. Diese Methode verbindet visuelles Lernen mit mathematischem Denken.

Unsere Bildbibliothek umfasst über 3000 Bilder. Alle Bilder sind kindgerecht und thematisch sortiert. Wählen Sie Tiere, Fahrzeuge, Obst, Spielzeug oder saisonale Themen. Jedes Bild funktioniert perfekt auf Ihren Mathe-Arbeitsblättern.`,
    previewImageSrc: '/samples/english/code addition/code addition portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/code addition/
  samples: {
    sectionTitle: 'Bilder-Additions-Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/code addition/code addition portrait.jpeg',
        answerKeySrc: '/samples/english/code addition/code addition portrait answer_key.jpeg',
        altText: 'Bilder-Additions-Arbeitsblatt im Hochformat mit Bild-zu-Zahl-Zuordnung für Vorschul-Arbeitsblätter und Rechnen lernen',
        pdfDownloadUrl: '/samples/english/code addition/code addition portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/code addition/code addition landscape.jpeg',
        answerKeySrc: '/samples/english/code addition/code addition landscape answer_key.jpeg',
        altText: 'Bilder-Additions-Arbeitsblatt im Querformat mit bunten Bildern für die Grundschule',
        pdfDownloadUrl: '/samples/english/code addition/code addition landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from code-addition.md feature sections
  features: {
    sectionTitle: 'Funktionen des Bilder-Additions-Generators - Mathe-Arbeitsblätter für Rechnen lernen',
    sectionDescription: 'Der Bilder-Additions-Generator bietet alle wichtigen Funktionen für kostenlose Mathe-Arbeitsblätter. Erstellen Sie professionelle Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter in wenigen Minuten. Jede Funktion wurde speziell für Lehrkräfte entwickelt.',
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
        icon: '🖼️',
        title: 'Visuelle Bild-zu-Zahl-Addition - Mathe-Arbeitsblätter für Rechnen lernen',
        description: `Der Bilder-Additions-Generator nutzt eine einzigartige Lernmethode für Rechnen lernen. Kinder sehen eine Legende mit Bildern und zugeordneten Zahlen. Zum Beispiel: Apfel = 3, Auto = 5, Ball = 2. Die Aufgaben zeigen dann Bilder, die addiert werden müssen.

Diese visuelle Methode macht Mathe-Arbeitsblätter greifbar und verständlich. Kinder verstehen: Apfel + Auto bedeutet 3 + 5 = 8. Das Konzept "Symbol = Zahl" bereitet auf fortgeschrittene Mathematik vor. Das Vollzugriff Abonnement für 240€ jährlich bietet Zugang zu allen Bildern.

Vorschulkinder und Erstklässler profitieren enorm von dieser Methode. Die Bilder überbrücken abstrakte Zahlenkonzepte. Arbeitsblätter Grundschule werden zum spannenden Rätsel statt zur trockenen Übung.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '⚙️',
        title: 'Anpassbare Zahlenbereiche - Vorschul-Arbeitsblätter bis Grundschul-Niveau',
        description: `Stellen Sie Minimum- und Maximum-Werte für die Bildzuordnungen ein. Vorschulkinder arbeiten mit 1-5 für einfache Summen. Erstklässler nutzen 1-10 für Mathe-Arbeitsblätter. Fortgeschrittene Schüler rechnen mit 1-20 oder höher für anspruchsvolle Arbeitsblätter Grundschule.

Die Schwierigkeitsanpassung ermöglicht individualisiertes Rechnen lernen. Wählen Sie auch die Anzahl der Aufgaben pro Arbeitsblatt. Minimum sind 3 Aufgaben, Maximum sind 10. Das Layout passt sich automatisch an.

Summen-Obergrenzen verhindern zu schwere Aufgaben für Vorschul-Arbeitsblätter. Jedes Arbeitsblatt generiert sich innerhalb Ihrer Parameter. Perfekte Kontrolle über Schwierigkeit für differenzierten Unterricht.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🎨',
        title: 'Über 3000 Bilder - Thematische Mathe-Arbeitsblätter für jeden Lehrplan',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Organisiert nach Themen wie Tiere, Fahrzeuge, Essen, Natur und mehr. Durchsuchen Sie Bilder nach Kategorien oder nutzen Sie die Suchfunktion. Neue Bilder werden regelmäßig hinzugefügt.

Erstellen Sie thematische Mathe-Arbeitsblätter passend zum Lehrplan. Zoo-Einheit bekommt Tier-Additions-Aufgaben. Herbst-Thema verwendet Blätter und Kürbisse. Ostern integriert Hasen und Eier. Thematische Kohärenz verstärkt Lernen über Fächer hinweg.

Hochwertige Bilder machen Vorschul-Arbeitsblätter attraktiv. Klare, farbenfrohe Darstellungen motivieren junge Lernende beim Rechnen lernen.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '✨',
        title: 'Automatische Lösungsblätter - Zeitsparende Korrektur für Arbeitsblätter Grundschule',
        description: `Jedes generierte Arbeitsblatt erstellt automatisch ein Lösungsblatt für Mathe-Arbeitsblätter. Die Antworten erscheinen klar in den Lösungsfeldern. Wechseln Sie zwischen Arbeitsblatt und Lösung mit einem Klick. Beide laden als separate Dateien herunter.

Lehrkräfte sparen enorme Korrekturzeit mit Vorschul-Arbeitsblättern. Keine manuelle Berechnung jeder Aufgabe mehr nötig. Schnelle visuelle Überprüfung mit dem Lösungsblatt. Das Vollzugriff Abonnement maximiert Ihre Zeiteffizienz.

Selbstkorrektur wird mit Lösungsblättern möglich für Rechnen lernen. Schüler können ihre Arbeit eigenständig überprüfen. Eltern helfen bei Hausaufgaben ohne Mathe-Angst.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '📐',
        title: 'Flexibles Layout - Hochformat und Querformat für alle Druckbedürfnisse',
        description: `Wählen Sie zwischen Hochformat und Querformat für Arbeitsblätter Grundschule. Hochformat passt mehr Aufgaben auf eine Seite. Querformat bietet größere Bilder für bessere Sichtbarkeit. Beide Formate drucken auf Standard A4 oder Letter Papier.

Die Aufgabenanzahl ist ebenfalls anpassbar für Vorschul-Arbeitsblätter. Weniger Aufgaben für Anfänger oder kurze Übungen. Mehr Aufgaben für Hausaufgaben oder Tests. Das Layout passt sich automatisch an Ihre Wahl an.

A4 und Letter Größen decken alle Druckerbedürfnisse ab für kostenlose Arbeitsblätter. Perfekte Kompatibilität mit jedem Schuldrucker für Rechnen lernen.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🖨️',
        title: 'Professionelle Qualität - 300 DPI Druckauflösung für alle Arbeitsblätter',
        description: `Alle heruntergeladenen Arbeitsblätter exportieren in 300 DPI Auflösung für Mathe-Arbeitsblätter. Professioneller Druckstandard garantiert scharfe Bilder. Text bleibt klar bei jeder Größe. Farben drucken lebendig auf Standard-Schuldruckern.

PDF-Exporte bewahren Qualität über Geräte und Plattformen hinweg für Arbeitsblätter Grundschule. Senden Sie Arbeitsblätter per E-Mail ohne Qualitätsverlust. Die Graustufenoption spart Druckertinte für tägliche Übungen.

Professionelle Qualität baut Lehrkraft-Glaubwürdigkeit auf für kostenlose Arbeitsblätter. Ihre Mathe-Arbeitsblätter repräsentieren Ihren professionellen Standard.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '📤',
        title: 'Eigene Bilder hochladen - Personalisierte Kostenlose Arbeitsblätter erstellen',
        description: `Laden Sie Ihre eigenen Fotos und Bilder hoch für personalisierte Mathe-Arbeitsblätter. Nutzen Sie Klassenfotos für individuelle Arbeitsblätter Grundschule. Verwenden Sie Bilder aus dem Schulalltag. Kombinieren Sie eigene Bilder mit unserer Bibliothek.

Der Upload unterstützt alle gängigen Formate. JPEG, PNG und GIF funktionieren problemlos. Laden Sie mehrere Dateien gleichzeitig hoch. Die Bilder werden automatisch für die Arbeitsblatterstellung optimiert.

Die Kinder erkennen vertraute Motive und lernen motivierter beim Rechnen lernen. So entstehen einzigartige kostenlose Arbeitsblätter für Ihre Klasse.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from code-addition.md step sections
  howTo: {
    sectionTitle: 'Bilder-Additions-Arbeitsblätter erstellen in 5 Schritten - Kostenlose Mathe-Arbeitsblätter',
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
        title: 'Bilder für Rechnen lernen Arbeitsblätter auswählen - Thema oder individuelle Auswahl',
        description: `Öffnen Sie den Bilder-Additions-Generator in Ihrem Browser. Wählen Sie zunächst die Sprache der Bildbibliothek. Für Deutsch-Arbeitsblätter wählen Sie "Deutsch". Die Bildnamen erscheinen dann auf Deutsch für Ihre Arbeitsblätter Grundschule.

Wählen Sie ein Thema wie "Tiere" oder "Fahrzeuge" für automatische Bildauswahl. Oder durchsuchen Sie die Bibliothek und wählen Sie 5 Bilder manuell aus. Die manuelle Auswahl eignet sich besonders für thematische Einheiten.

Unterrichten Sie gerade Obst? Wählen Sie Apfel, Birne, Banane, Orange und Erdbeere. So verbinden Sie Rechnen lernen mit Sachunterricht. Die Kinder lernen Mathe und erweitern ihren Wortschatz gleichzeitig.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Zahlenbereich für Arbeitsblätter Grundschule einstellen - Rechnen 1. Klasse bis 3. Klasse',
        description: `Stellen Sie den Schwierigkeitsgrad ein für Ihre Mathe-Arbeitsblätter. Das Feld "Minimum" bestimmt die kleinste Zahl. Das Feld "Maximum" bestimmt die größte Zahl. Jedes Bild erhält eine Zufallszahl aus diesem Bereich.

Für Vorschul-Arbeitsblätter empfehlen wir Zahlen von 1 bis 5. Für Rechnen 1. Klasse eignen sich Zahlen von 1 bis 10. Die 2. Klasse rechnet sicher mit Zahlen bis 20. Passen Sie die Einstellungen an Ihre Lerngruppe an.

Wählen Sie auch die Anzahl der Aufgaben. Minimum sind 3 Aufgaben, Maximum sind 10. Für kurze Übungen reichen 5 Aufgaben. Für ausführliche Übungsphasen wählen Sie 8 oder 10 für Arbeitsblätter Grundschule.`,
        icon: '🔢',
      },
      {
        id: '3',
        number: 3,
        title: 'Kostenlose Arbeitsblätter generieren - Ein Klick für perfekte Mathe-Arbeitsblätter',
        description: `Klicken Sie auf den Button "Erstellen" und Ihr Bilder-Additions-Arbeitsblatt erscheint sofort. Die Legende mit Bild-Zahl-Zuordnungen wird automatisch generiert. Darunter folgen die Additionsaufgaben für Rechnen lernen.

Jede Aufgabe zeigt zwei Bilder und ein leeres Feld für die Antwort. Die Kinder erkennen: Apfel = 3, Auto = 5, also Apfel + Auto = 8. Sie können beliebig oft neu generieren für neue Aufgabenkombinationen.

Jeder Klick erzeugt neue Zufallszahlen und Bildkombinationen. So entstehen unbegrenzt verschiedene kostenlose Arbeitsblätter. Ideal für tägliche Übungsroutinen in der Grundschule.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Arbeitsblätter Grundschule individuell anpassen - Texte, Hintergründe und Malvorlagen',
        description: `Nach der Generierung können Sie alles bearbeiten auf Ihren Vorschul-Arbeitsblättern. Klicken Sie auf ein Element und verschieben Sie es. Ziehen Sie an den Ecken zum Vergrößern oder Verkleinern. Drehen Sie Elemente nach Belieben.

Fügen Sie eigene Texte hinzu für Ihre Mathe-Arbeitsblätter. Schreiben Sie den Klassennamen oder Übungstitel. Wählen Sie aus 7 kinderfreundlichen Schriftarten. Passen Sie Farbe und Größe an.

Wählen Sie einen Hintergrund aus unseren Themen. Rahmen verleihen dem Arbeitsblatt einen professionellen Look. Die Bilder können nach dem Rechnen als Ausmalbilder verwendet werden.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Mathe-Arbeitsblätter und Lösungsschlüssel herunterladen - PDF und JPEG für Rechnen lernen',
        description: `Erstellen Sie den Lösungsschlüssel mit einem Klick für Ihre Arbeitsblätter Grundschule. Der Generator zeigt dieselben Aufgaben mit den korrekten Antworten. Wechseln Sie zwischen Arbeitsblatt und Lösungsschlüssel zur Überprüfung.

Klicken Sie auf "Herunterladen" für Ihre fertigen Mathe-Arbeitsblätter. Wählen Sie zwischen PDF und JPEG Format. Beide exportieren in professioneller 300 DPI Auflösung.

Aktivieren Sie die Graustufenoption für tintensparsames Drucken. Mit dem Vollzugriff Abonnement für 240€ jährlich erhalten Sie wasserzeichenfreie Downloads. Kommerzielle Lizenz inklusive für den Verkauf Ihrer kostenlose Arbeitsblätter.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from code-addition.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Mathe-Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Bilder-Additions-Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Förderschullehrkräfte. Jeder profitiert von Arbeitsblättern Grundschule.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieherinnen und Erzieher - Vorschul-Arbeitsblätter für den Mathe-Einstieg',
        subtitle: 'Vorschul-Arbeitsblätter und Schwungübungen',
        description: `Erzieherinnen in Kindergarten und Vorschule nutzen unsere Arbeitsblätter täglich für Rechnen lernen. Die bunten Bilder fesseln die Aufmerksamkeit der Kleinen. Erste Zahlen werden spielerisch eingeführt. Das Zählen von Bildern ist kindgerechter als abstrakte Zahlen.

Vorschul-Arbeitsblätter bereiten optimal auf die Grundschule vor. Kinder lernen Mengenverständnis durch visuelles Zählen. Die Addition von kleinen Zahlen trainiert logisches Denken. Kombinieren Sie Rechnen mit Schwungübungen zur Stiftführung.

Die Bildbibliothek enthält altersgerechte Motive für Mathe-Arbeitsblätter. Teddybären, Luftballons und bunte Fahrzeuge begeistern Vorschulkinder. Erstellen Sie Vorschul-Arbeitsblätter passend zu aktuellen Themen.`,
        quote: 'Meine Vorschulkinder lieben die bunten Bilder-Additions-Arbeitsblätter!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse - Arbeitsblätter Grundschule für Einmaleins-Vorbereitung',
        subtitle: 'Mathe-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Lehrkräfte der 1. bis 3. Klasse setzen unsere Arbeitsblätter Grundschule vielfältig ein. In der 1. Klasse festigen Bilder-Additions-Aufgaben das Zahlenverständnis. Die Legende trainiert das Arbeitsgedächtnis. Kinder merken sich Bild-Zahl-Zuordnungen und wenden sie an.

In der 2. Klasse erweitern Sie den Zahlenbereich für Rechnen lernen. Aufgaben bis 20 fordern die Schüler heraus. Die Bilder helfen beim Übergang zum abstrakten Rechnen. Später bereiten größere Zahlen auf das Einmaleins vor.

Das Prinzip "Symbol = Zahl" funktioniert auch bei Multiplikation. Die fünf Modi unterstützen natürlichen Lernfortschritt für Mathe-Arbeitsblätter. Die 3. Klasse nutzt Bilder-Addition als Aufwärmübung.`,
        quote: 'Die visuelle Methode macht den Übergang zum Einmaleins so viel einfacher.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Eltern und Homeschooling-Familien - Kostenlose Arbeitsblätter für Rechnen 1. Klasse',
        subtitle: 'Kostenlose Arbeitsblätter für individuelles Lernen',
        description: `Immer mehr Familien ergänzen den Schulunterricht zu Hause mit Vorschul-Arbeitsblättern. Mit dem Abonnement erstellen Sie unbegrenzt kostenlose Arbeitsblätter ohne Zusatzkosten. Eltern ohne pädagogische Ausbildung erstellen professionelle Übungen für Rechnen lernen.

Homeschooling-Familien nutzen die volle Flexibilität. Passen Sie Schwierigkeitsgrade an jedes Kind an. Geschwister unterschiedlichen Alters üben mit verschiedenen Zahlenbereichen. Thematische Bilder machen Rechnen 1. Klasse zum Familienspaß.

Ferienübungen verhindern den Lernverlust für Mathe-Arbeitsblätter. Kurze tägliche Einheiten halten Rechenfertigkeiten frisch. Die bunten Arbeitsblätter Grundschule wirken weniger wie Pflicht, mehr wie Spiel.`,
        quote: 'Ein Werkzeug deckt alle Mathematik-Niveaus meiner drei Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaF- und DaZ-Lehrkräfte - Deutsch-Arbeitsblätter kombiniert mit Mathe',
        subtitle: 'Mehrsprachige Mathe-Arbeitsblätter',
        description: `DaF-Lehrkräfte nutzen Bilder-Additions-Arbeitsblätter für Sprachintegration bei Mathe-Arbeitsblättern. Die 11-Sprachen-Funktion zeigt Bildnamen in der Zielsprache. Schüler lernen Zahlwörter und Objektnamen gleichzeitig. Mathe wird Sprachübung.

Willkommensklassen profitieren besonders für Arbeitsblätter Grundschule. Mathematik ist universell verständlich. Die Bilder überbrücken Sprachbarrieren. Sukzessiv bauen Kinder deutsches Vokabular auf. Unsere Deutsch-Arbeitsblätter kombinieren beide Lernziele.

Internationale Schulen nutzen die Sprachfunktion täglich für Rechnen lernen. Erstellen Sie dasselbe Arbeitsblatt in verschiedenen Sprachen. Vergleichen Sie Wörter zwischen Muttersprache und Deutsch.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderschullehrkräfte - Differenzierte Arbeitsblätter Grundschule und Ausmalbilder',
        subtitle: 'Angepasste Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Förderschulen benötigen stark differenziertes Material für Vorschul-Arbeitsblätter. Unser Generator ermöglicht individuelle Anpassung an Schülerbedürfnisse. Wählen Sie sehr kleine Zahlenbereiche für langsam lernende Kinder. Erhöhen Sie schrittweise nach Lernfortschritt.

Die visuellen Elemente unterstützen verschiedene Lerntypen für Mathe-Arbeitsblätter. Bildhafte Aufgaben helfen bei Leseschwäche. Kinder mit Dyskalkulie profitieren von konkreten Bildern statt abstrakter Zahlen. Kombinieren Sie Rechenaufgaben mit Ausmalbilder-Elementen.

Erstellen Sie Arbeitsblätter Grundschule für inklusive Klassen. Verschiedene Schwierigkeitsgrade auf einem Thema. Alle Kinder arbeiten am gleichen Inhalt mit angepasster Komplexität für Rechnen lernen.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Förderbedarf erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Arbeitsblatt-Verleger und Lehrmittelautoren - Mathe-Arbeitsblätter zum Verkaufen',
        subtitle: 'Verkaufen Sie kostenlose Arbeitsblätter mit POD-Lizenz',
        description: `Kreative Lehrkräfte verkaufen Unterrichtsmaterial online mit Mathe-Arbeitsblättern. Das Vollzugriff Abonnement für 240€ jährlich beinhaltet vollständige kommerzielle Lizenz. Verkaufen Sie Ihre Bilder-Additions-Arbeitsblätter auf Teachers Pay Teachers, Etsy oder Amazon KDP.

Viele Lehrkräfte verdienen 500 bis 5000€ monatlich mit Arbeitsblättern Grundschule. Die Bilder-Additions-Arbeitsblätter sind besonders gefragt. Visuelle Mathematik ist ein Nischenmarkt. Die 300 DPI Qualität überzeugt professionelle Käufer.

Kostenlose Arbeitsblätter als Marketing-Strategie funktionieren hervorragend für Rechnen lernen. Bieten Sie ein Probe-Arbeitsblatt gratis an. Kunden sehen die Qualität und kaufen mehr. Ihr Abonnement finanziert sich durch Verkäufe.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from code-addition.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Bilder-Additions-Arbeitsblättern - Kostenlose Arbeitsblätter erklärt',
    sectionDescription: 'Lehrkräfte und Eltern haben viele Fragen zum Bilder-Additions-Generator und Vollzugriff Abonnement. Hier beantworten wir die häufigsten Fragen zu Arbeitsblätter Grundschule, Vorschul-Arbeitsblättern und kommerzieller Lizenzierung.',
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
        question: 'Ist der Bilder-Additions-Generator wirklich kostenlos für Mathe-Arbeitsblätter?',
        answer: 'Der Bilder-Additions-Generator erfordert ein Vollzugriff Abonnement. Es kostet 240€ pro Jahr oder 25€ pro Monat. Mit dem Abonnement erstellen Sie unbegrenzt kostenlose Arbeitsblätter ohne Zusatzkosten pro Download. Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Nicht nur Bilder-Addition, sondern auch Subtrakion, Einmaleins-Vorbereitung und mehr. Die kommerzielle Lizenz für Verkauf ist ebenfalls enthalten. 11 Sprachen für Benutzeroberfläche und Bildbibliothek.',
      },
      {
        id: '2',
        question: 'Kann ich Vorschul-Arbeitsblätter zu Hause auf einem normalen Drucker ausdrucken?',
        answer: 'Ja, alle Vorschul-Arbeitsblätter drucken problemlos auf jedem Heimdrucker. Das PDF-Format garantiert korrekte Darstellung für Mathe-Arbeitsblätter. Sowohl Farb- als auch Schwarzweiß-Druck funktionieren. Die 300 DPI Qualität bleibt auf jedem Drucker erhalten. Die Graustufenoption spart Druckertinte für Arbeitsblätter Grundschule. Aktivieren Sie sie vor dem Download. Die Bilder bleiben klar erkennbar.',
      },
      {
        id: '3',
        question: 'Brauche ich Designkenntnisse für Einmaleins-Vorbereitungs-Arbeitsblätter und Schwungübungen?',
        answer: 'Nein, keine Designkenntnisse erforderlich für Mathe-Arbeitsblätter. Der Generator erstellt professionelle Arbeitsblätter automatisch. Einmaleins-Vorbereitungs-Übungen entstehen mit wenigen Klicks. Das gleiche gilt für Schwungübungen zur Feinmotorik. Alle Elemente sind per Drag-and-Drop anpassbar für Arbeitsblätter Grundschule. Verschieben, vergrößern, drehen Sie alles nach Belieben. Kein Grafikprogramm nötig, kein technisches Wissen erforderlich.',
      },
      {
        id: '4',
        question: 'Darf ich Deutsch-Arbeitsblätter und Buchstaben lernen Material im Unterricht verwenden?',
        answer: 'Ja, das Vollzugriff Abonnement erlaubt unbegrenzten Unterrichtseinsatz für Mathe-Arbeitsblätter. Drucken Sie Deutsch-Arbeitsblätter für Ihre gesamte Klasse. Verteilen Sie Buchstaben lernen Übungen an alle Schüler. Keine Einschränkungen bei der Anzahl. Teilen Sie Arbeitsblätter Grundschule mit Kolleginnen und Kollegen. Laden Sie sie in Ihr Lernmanagementsystem hoch. Die Lizenz deckt alle schulischen Nutzungen ab.',
      },
      {
        id: '5',
        question: 'In welchen Sprachen gibt es Vorschul-Arbeitsblätter und Ausmalbilder?',
        answer: 'Die Bildbibliothek ist in 11 Sprachen verfügbar für Mathe-Arbeitsblätter. Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch. Dazu Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Alle Bildnamen erscheinen in der gewählten Sprache. Erstellen Sie Vorschul-Arbeitsblätter auf Deutsch für deutsche Kinder. Oder wählen Sie Englisch für bilinguale Übungen. Ausmalbilder funktionieren in jeder Sprache gleich gut für Arbeitsblätter Grundschule.',
      },
      {
        id: '6',
        question: 'Kann ich Schwungübungen und Einmaleins-Arbeitsblätter verkaufen?',
        answer: 'Ja, die kommerzielle Lizenz ist im Vollzugriff enthalten für Mathe-Arbeitsblätter. Verkaufen Sie Schwungübungen auf Teachers Pay Teachers. Erstellen Sie Einmaleins-Übungspakete für Etsy. Veröffentlichen Sie Arbeitshefte bei Amazon KDP. Keine zusätzlichen Lizenzgebühren erforderlich. Die 300 DPI Qualität erfüllt professionelle Druckstandards für Arbeitsblätter Grundschule. Käufer schätzen die hohe Qualität. Ihr Nebeneinkommen wächst mit jedem verkauften Paket.',
      },
      {
        id: '7',
        question: 'Wie passe ich Buchstaben lernen Arbeitsblätter und Kostenlose Arbeitsblätter an meine Schüler an?',
        answer: 'Jedes Element ist vollständig editierbar für Mathe-Arbeitsblätter. Klicken Sie auf Bilder und verschieben Sie sie. Ändern Sie Textgröße und Schriftart. Fügen Sie eigene Bilder hinzu für Arbeitsblätter Grundschule. Löschen Sie unerwünschte Elemente. Für Buchstaben lernen wählen Sie passende Bilder. A wie Apfel, B wie Ball. Die Bildbibliothek enthält Motive für jeden Buchstaben. Kombinieren Sie Buchstaben lernen mit Rechenübungen für kostenlose Arbeitsblätter.',
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Malvorlagen und Ausmalbilder kombiniert mit Rechnen?',
        answer: 'Die Kombination aus Malvorlagen und Rechnen eignet sich für 4 bis 8 Jahre für Vorschul-Arbeitsblätter. Vorschulkinder mögen einfache Zahlen von 1 bis 5 beim Rechnen lernen. Erstklässler rechnen bis 10 oder 20 mit Mathe-Arbeitsblättern. Die Ausmalbilder motivieren nach der Rechenarbeit. Ältere Kinder nutzen Ausmalbilder als Belohnung für Arbeitsblätter Grundschule. Erst rechnen, dann ausmalen. Die Bilder auf dem Arbeitsblatt werden zu Malvorlagen.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Fotos für Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter hochladen?',
        answer: 'Ja, der Multi-Datei-Upload funktioniert einfach für Mathe-Arbeitsblätter. Laden Sie JPEG, PNG oder GIF hoch. Nutzen Sie Klassenfotos für persönliche Deutsch-Arbeitsblätter. Fotografieren Sie Gegenstände aus dem Klassenzimmer. Eigene Bilder machen Vorschul-Arbeitsblätter einzigartig für Arbeitsblätter Grundschule. Die Kinder erkennen vertraute Objekte beim Rechnen lernen. Das steigert Motivation und Engagement. Kombinieren Sie eigene Fotos mit Bibliotheksbildern für Abwechslung.',
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Einmaleins-Vorbereitung und Schwungübungen?',
        answer: 'Die Erstellung eines Arbeitsblatts dauert unter 3 Minuten für Mathe-Arbeitsblätter. Wählen Sie Thema, Zahlenbereich und Aufgabenanzahl. Klicken Sie auf Erstellen. Der Generator liefert sofort das fertige Arbeitsblatt für Arbeitsblätter Grundschule. Einmaleins-Vorbereitung durch visuelle Addition funktioniert genauso schnell. Schwungübungen-Arbeitsblätter entstehen mit dem entsprechenden Generator. Alle 33 Apps folgen dem gleichen einfachen Prinzip für Vorschul-Arbeitsblätter.',
      },
      {
        id: '11',
        question: 'Gibt es einen Lösungsschlüssel für Ausmalbilder mit Rechenaufgaben?',
        answer: 'Ja, der Generator erstellt automatisch einen Lösungsschlüssel für Mathe-Arbeitsblätter. Alle Additionsaufgaben mit korrekten Antworten für Rechnen lernen. Arbeitsblatt und Lösung als separate Dateien. Beide in gleicher Qualität exportierbar für Arbeitsblätter Grundschule. Der Lösungsschlüssel zeigt die Rechnung vollständig. Apfel (3) + Auto (5) = 8. So verstehen Eltern den Lösungsweg. Lehrkräfte sparen Korrekturzeit. Die Ausmalbilder auf dem Lösungsschlüssel sind identisch.',
      },
      {
        id: '12',
        question: 'Kann ich Buchstaben lernen und Kostenlose Arbeitsblätter zu verschiedenen Schulthemen erstellen?',
        answer: 'Ja, die thematische Vielfalt ist enorm für Mathe-Arbeitsblätter. Die Bildbibliothek enthält über 3000 Bilder. Tiere, Fahrzeuge, Obst, Gemüse, Spielzeug für Arbeitsblätter Grundschule. Saisonale Themen wie Weihnachten, Ostern, Sommer für Vorschul-Arbeitsblätter. Verbinden Sie Buchstaben lernen mit Sachunterricht. T wie Tiger bei der Tier-Einheit. Kostenlose Arbeitsblätter zu jedem Lehrplanthema erstellen für Rechnen lernen. Die Möglichkeiten sind unbegrenzt.',
      },
    ],
  },

  // Pricing - Code Addition is FULL ACCESS
  pricing: {
    title: 'Vollzugriff',
    price: '240€',
    priceInterval: '/Jahr',
    priceSuffix: 'Jährliche Abrechnung',
    benefits: [
      'Alle 33 Arbeitsblatt-Generatoren',
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

  // Related Apps - Kombinieren Sie Bilder-Additions-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Bilder-Addition mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Ihr Vollzugriff Abonnement beinhaltet alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Bilder-Additions-Arbeitsblätter mit Ausmalbilder für kreative Pausen. Integrieren Sie Schwungübungen für Schreibvorbereitung. Verbinden Sie mit Buchstaben lernen für frühkindliche Bildung.',
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
        slug: 'subtraction',
        name: 'Subtraktion',
        category: 'Mathematik',
        icon: '➖',
        description: 'Ergänzen Sie Additions-Arbeitsblätter mit Subtraktions-Übungen für umfassenden frühen Mathe-Unterricht.',
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
        description: 'Integrieren Sie Schwungübungen mit Bilder-Addition für umfassende motorische Entwicklung.',
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
        slug: 'image-addition',
        name: 'Bild-Addition',
        category: 'Mathematik',
        icon: '🖼️',
        description: 'Nutzen Sie den klassischen Additions-Generator für ergänzende Mathe-Arbeitsblätter.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Suchen und Zählen',
        category: 'Mathematik',
        icon: '🔍',
        description: 'Verstärken Sie Zählfähigkeiten mit Suchbildern als Vorbereitung für Bilder-Addition.',
      },
    ],
  },
};

export default codeAdditionDeContent;
