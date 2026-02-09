import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Grid Match (Raster-Puzzle) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/grid-match-worksheets.ts
 * URL: /de/apps/raster-puzzle-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/raster-puzzle.md
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

export const gridMatchDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'raster-puzzle-arbeitsblaetter',
    appId: 'grid-match',
    title: 'Raster-Puzzle Arbeitsblätter | Generator Grundschule',
    description: 'Raster-Puzzle-Arbeitsblätter für räumliches Denken und Mustererkennung. Generator mit 3000+ Bildern für Grundschule und Vorschule. PDF in unter 3 Minuten.',
    keywords: 'raster-puzzle arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, räumliches denken, puzzle arbeitsblätter, schwungübungen, ausmalbilder, einmaleins',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/raster-puzzle-arbeitsblaetter',
      },

  // Hero Section - FULL text from raster-puzzle.md
  hero: {
    title: 'Raster-Puzzle-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Puzzle Generator für Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Raster-Puzzle-Arbeitsblätter mit unserem Generator. Mit Ihrem Vollzugriff Abo für 240 Euro im Jahr erstellen Sie unbegrenzt viele Arbeitsblätter Grundschule. Keine zusätzlichen Kosten pro Arbeitsblatt. Perfekt für Kinder in Vorschule und 1. Klasse. Das Raster-Puzzle fördert das räumliche Denken und die visuelle Wahrnehmung.

Kinder lieben Puzzle. Mit unserem Raster-Puzzle Generator erstellen Sie Lernmaterialien in wenigen Minuten. Die Kinder ordnen nummerierte Puzzleteile dem richtigen Rasterfeld zu. So trainieren sie spielerisch räumliches Denken. Das Puzzle bereitet auf Mathe-Arbeitsblätter und Einmaleins vor.

Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Raster-Puzzle mit Schwungübungen, Deutsch-Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
    previewImageSrc: '/samples/german/grid-match/sample-1.jpeg',
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
        videoId: 'RGtED1Bnut8',
        buttonText: 'Raster-Puzzle Funktionen',
        modalTitle: 'Raster-Puzzle Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/grid match/
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

  // Features Grid - FULL text from raster-puzzle.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Raster-Puzzle Generator bietet alle Werkzeuge für professionelle Arbeitsblätter. Die Bedienung ist einfach und intuitiv. In wenigen Minuten erstellen Sie individuelle Lernmaterialien. Perfekt für Lehrer, Erzieher und Eltern. Das Vollzugriff Abonnement schaltet alle Funktionen frei.',
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

  // How-To Guide - FULL text from raster-puzzle.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Generieren Sie professionelle Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule in unter drei Minuten. Diese Schritt-für-Schritt-Anleitung zeigt Ihnen den kompletten Erstellungsprozess. Keine Designkenntnisse erforderlich für kostenlose Arbeitsblätter. Der optimierte Workflow hilft Lehrkräften, Mathe-Arbeitsblätter und Puzzle effizient zu erstellen.',
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
        title: 'Schritt 1: Bild auswählen für Vorschul-Arbeitsblätter - Mathe-Arbeitsblätter mit Motiven',
        description: `Öffnen Sie den Raster-Puzzle Generator. Die Bildbibliothek erscheint automatisch. Wählen Sie ein Thema aus dem Dropdown-Menü. Tiere, Fahrzeuge oder Lebensmittel stehen zur Verfügung. Für Vorschul-Arbeitsblätter empfehlen wir einfache Motive.

Klicken Sie auf das gewünschte Bild. Es erscheint in der Vorschau. Auch eigene Bilder können Sie hochladen. Die Suche hilft beim Finden bestimmter Motive. Mathe-Arbeitsblätter mit Zahlenbildern sind besonders beliebt. Alternativ nutzen Sie die Suchfunktion für schnelles Finden.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Rastergröße einstellen für Arbeitsblätter Grundschule - Einmaleins Schwierigkeit anpassen',
        description: `Navigieren Sie zu den Rasteroptionen. Hier stellen Sie Zeilen und Spalten ein. Für Arbeitsblätter Grundschule eignen sich 3x3 Raster. Jüngere Kinder beginnen mit 2x2. Ältere Schüler meistern auch 4x4.

Die Hinweisfelder bestimmen die Schwierigkeit. Ein Hinweisfeld zeigt ein bereits platziertes Teil. Mehr Hinweise machen das Puzzle einfacher. Für Einmaleins Übungen wählen Sie mittlere Schwierigkeit. Wählen Sie auch das Seitenformat Letter oder A4.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt generieren - Deutsch-Arbeitsblätter und Ausmalbilder in Sekunden',
        description: `Klicken Sie auf "Neues Arbeitsblatt". Der Generator erstellt Ihr Puzzle sofort. Das Raster erscheint mit nummerierten Feldern. Die Puzzleteile zeigen sich daneben. Deutsch-Arbeitsblätter sind in Sekunden fertig.

Die Vorschau zeigt das komplette Layout. Prüfen Sie die Anordnung der Teile. Fragezeichen markieren die leeren Felder. Hinweisfelder zeigen bereits die Lösung. Ausmalbilder werden automatisch in Puzzleteile zerlegt.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Bearbeiten auf der Leinwand - Buchstaben lernen und Schwungübungen hinzufügen',
        description: `Jetzt beginnt die Feinarbeit. Alle Elemente sind verschiebbar. Ziehen Sie Objekte an die gewünschte Position. Vergrößern oder verkleinern Sie nach Bedarf. Drehen Sie Elemente mit dem Rotationsgriff.

Fügen Sie Text hinzu für Buchstaben lernen. Wählen Sie Schriftart und Größe. Farben und Umrandungen sind einstellbar. Schwungübungen können Sie als Linienmuster ergänzen. Das Kontextmenü bietet alle Bearbeitungsoptionen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Herunterladen und Drucken - Rechnen lernen mit Malvorlagen als PDF',
        description: `Ihr Arbeitsblatt ist fertig. Klicken Sie auf den Download-Button. Wählen Sie zwischen PDF und JPEG. Das PDF eignet sich perfekt zum Drucken. JPEG ist ideal für digitale Nutzung. Die Graustufen-Option spart Tinte.

Rechnen lernen Materialien drucken Sie so kostengünstig. Malvorlagen sehen auch in Schwarzweiß gut aus. Vergessen Sie nicht das Lösungsblatt. Ihr Vollzugriff Abonnement (240€/Jahr) deckt unbegrenzte Downloads von Arbeitsblätter Grundschule und allen anderen Arbeitsblatttypen ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from raster-puzzle.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Raster-Puzzle Generator eignet sich für viele Zielgruppen. Lehrer, Erzieher und Eltern nutzen ihn täglich. Die vielfältigen Einsatzmöglichkeiten überraschen immer wieder. Entdecken Sie, wie auch Sie profitieren können.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from raster-puzzle.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Raster-Puzzle Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter.',
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
        question: 'Wie funktioniert das Raster-Puzzle-Arbeitsblatt f\u00fcr Kinder?',
        answer: 'Kinder ordnen nummerierte Puzzleteile dem richtigen Rasterfeld zu. Das Bild wird in ein Raster aufgeteilt, wobei einige Felder mit Fragezeichen markiert sind. Die Sch\u00fcler m\u00fcssen herausfinden, welches Teil an welche Stelle geh\u00f6rt. Das trainiert spielerisch r\u00e4umliches Denken und Probleml\u00f6sungsf\u00e4higkeiten.',
      },
      {
        id: 'faq-2',
        question: 'Welche Rastergr\u00f6\u00dfen stehen f\u00fcr Puzzle-Arbeitsbl\u00e4tter zur Verf\u00fcgung?',
        answer: 'Sie k\u00f6nnen zwischen 2\u00d72, 3\u00d73 und 4\u00d74 Rastern w\u00e4hlen. F\u00fcr Vorschulkinder empfehlen wir 2\u00d72 Raster zum Einstieg. Arbeitsbl\u00e4tter Grundschule nutzen am besten 3\u00d73 Raster. \u00c4ltere Sch\u00fcler meistern auch das anspruchsvolle 4\u00d74 Format.',
      },
      {
        id: 'faq-3',
        question: 'Kann ich die Schwierigkeit der Raster-Puzzle anpassen?',
        answer: 'Ja, die Schwierigkeit l\u00e4sst sich \u00fcber Rastergr\u00f6\u00dfe und Hinweisfelder steuern. Hinweisfelder zeigen bereits platzierte Teile als Hilfestellung. Mehr Hinweise machen das Puzzle einfacher, weniger Hinweise erh\u00f6hen die Herausforderung. So passen Sie die Arbeitsbl\u00e4tter an jedes Niveau an.',
      },
      {
        id: 'faq-4',
        question: 'Welche F\u00e4higkeiten f\u00f6rdert das Raster-Puzzle bei Kindern?',
        answer: 'Raster-Puzzle f\u00f6rdern r\u00e4umliches Denken, visuelle Wahrnehmung und logische Probleml\u00f6sung. Kinder lernen, Teile im Kontext zu analysieren und richtig zuzuordnen. Diese F\u00e4higkeiten bereiten auf Mathe-Arbeitsbl\u00e4tter und das Einmaleins vor.',
      },
      {
        id: 'faq-5',
        question: 'Wird ein L\u00f6sungsblatt f\u00fcr das Raster-Puzzle mitgeliefert?',
        answer: 'Ja, der Generator erstellt automatisch ein L\u00f6sungsblatt mit dem vollst\u00e4ndigen Bild. Arbeitsblatt und L\u00f6sung k\u00f6nnen separat als PDF oder JPEG heruntergeladen werden. Die professionelle 300 DPI Qualit\u00e4t garantiert scharfe Ausdrucke auf jedem Drucker.',
      },
      {
        id: 'faq-6',
        question: 'Kann ich eigene Bilder f\u00fcr das Raster-Puzzle verwenden?',
        answer: 'Ja, Sie k\u00f6nnen eigene Bilder hochladen oder aus \u00fcber 3000 kindgerechten Bildern in der Bibliothek w\u00e4hlen. Die Bibliothek bietet Themen wie Tiere, Fahrzeuge und Lebensmittel. Jedes Bild wird automatisch in Puzzleteile zerlegt.',
      },
      {
        id: 'faq-7',
        question: 'Was kostet das Vollzugriff Abonnement f\u00fcr den Raster-Puzzle Generator?',
        answer: 'Das Vollzugriff Abonnement kostet 240\u20ac pro Jahr und beinhaltet alle 33 Arbeitsblatt-Generatoren. Sie erstellen unbegrenzt Raster-Puzzle und alle anderen Arbeitsblatttypen ohne Zusatzkosten. Die kommerzielle Lizenz f\u00fcr den Verkauf auf Teachers Pay Teachers und Etsy ist inklusive.',
      },
      {
        id: 'faq-8',
        question: 'Kann ich den Raster-Puzzle Generator kostenlos testen?',
        answer: 'Ja, Sie k\u00f6nnen ohne Registrierung sofort Raster-Puzzles erstellen. Die Vorschau zeigt Ihr fertiges Arbeitsblatt mit Wasserzeichen. Mit dem Vollzugriff laden Sie unbegrenzt ohne Wasserzeichen herunter. So testen Sie alle Rastergr\u00f6\u00dfen und Schwierigkeitsstufen risikofrei.',
      },
      {
        id: 'faq-9',
        question: 'Welche Seitenformate stehen f\u00fcr den Druck zur Verf\u00fcgung?',
        answer: 'Sie w\u00e4hlen zwischen Letter und A4 in Hoch- oder Querformat. Alle Arbeitsbl\u00e4tter werden in professioneller 300 DPI Qualit\u00e4t als PDF oder JPEG exportiert. Die Graustufen-Option spart Druckertinte bei farbigen Bildern.',
      },
      {
        id: 'faq-10',
        question: 'F\u00fcr welche Altersgruppen eignen sich Raster-Puzzles?',
        answer: 'Einfache 2\u00d72 Raster eignen sich ab 4 Jahren f\u00fcr Vorschulkinder. 3\u00d73 Raster sind ideal f\u00fcr Klasse 1-2. Gr\u00f6\u00dfere Raster mit mehr Puzzleteilen fordern Kinder in Klasse 3-4 heraus. Die Bildunterst\u00fctzung macht alle Schwierigkeitsstufen zug\u00e4nglich.',
      },
      {
        id: 'faq-11',
        question: 'Wie steuere ich den Schwierigkeitsgrad der Raster-Puzzles?',
        answer: 'Die Schwierigkeit wird \u00fcber die Rastergr\u00f6\u00dfe gesteuert: wenige gro\u00dfe Teile sind einfach, viele kleine Teile sind schwieriger. Zus\u00e4tzlich k\u00f6nnen Sie die Puzzleteile drehen lassen, was die r\u00e4umliche Herausforderung deutlich erh\u00f6ht.',
      },
      {
        id: 'faq-12',
        question: 'Welche Sprachen unterst\u00fctzt der Raster-Puzzle Generator?',
        answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Titel und Anweisungen werden automatisch in der gew\u00e4hlten Sprache generiert.',
      },
      {
        id: 'faq-13',
        question: 'Kann ich Raster-Puzzles mit anderen Generatoren kombinieren?',
        answer: 'Ja, erstellen Sie thematische Wahrnehmungs-Pakete indem Sie Raster-Puzzles mit Schattenbildern, Zuordnungs\u00fcbungen oder Rasterzeichnen kombinieren. Alle Generatoren nutzen dieselbe Bildbibliothek. So trainieren Kinder r\u00e4umliches Denken in verschiedenen Aufgabenformaten.',
      },
      {
        id: 'faq-14',
        question: 'Darf ich Raster-Puzzle Arbeitsbl\u00e4tter kommerziell verkaufen?',
        answer: 'Ja, der Vollzugriff enth\u00e4lt eine kommerzielle Lizenz. Sie d\u00fcrfen erstellte Arbeitsbl\u00e4tter auf Plattformen wie Teachers Pay Teachers oder Lehrermarktplatz verkaufen. Auch der Einsatz in Nachhilfe-Instituten und Ergotherapie-Praxen ist erlaubt.',
      },
      {
        id: 'faq-15',
        question: 'Eignen sich Raster-Puzzles f\u00fcr DaF/DaZ-Kinder?',
        answer: 'Ja, Raster-Puzzles sind sprachunabh\u00e4ngig verst\u00e4ndlich. Kinder ordnen Bildteile dem Raster zu ohne Lesekompetenz. Das visuelle Puzzleformat ist intuitiv und macht Spa\u00df unabh\u00e4ngig vom Sprachniveau. Die Bilder erweitern gleichzeitig den Wortschatz.',
      },
      {
        id: 'faq-16',
        question: 'Wie setze ich Raster-Puzzles zur Differenzierung ein?',
        answer: 'Verwenden Sie wenige gro\u00dfe Puzzleteile f\u00fcr Anf\u00e4nger und viele kleine Teile mit Drehung f\u00fcr Fortgeschrittene. Einfache Bilder mit klaren Formen senken die Schwierigkeit, detailreiche Bilder erh\u00f6hen sie. So arbeiten alle Kinder am selben Thema auf ihrem Niveau.',
      },
      {
        id: 'faq-17',
        question: 'Welche kognitiven F\u00e4higkeiten f\u00f6rdern Raster-Puzzles?',
        answer: 'Raster-Puzzles trainieren r\u00e4umliches Denken, visuelle Analyse, Teil-Ganzes-Beziehungen und Konzentration. Das Zuordnen von Bildteilen st\u00e4rkt die visuelle Wahrnehmung und Probleml\u00f6sekompetenz. Diese F\u00e4higkeiten sind Grundlagen f\u00fcr Geometrie und naturwissenschaftliches Denken.',
      },
      {
        id: 'faq-18',
        question: 'Sind die Raster-Puzzle \u00dcbungen an den Bildungsplan angepasst?',
        answer: 'Raster-Puzzles unterst\u00fctzen die Lernziele f\u00fcr Kita und Vorschule: visuelle Wahrnehmung, r\u00e4umliche Orientierung und Probleml\u00f6sung. In der Grundschule f\u00f6rdern sie geometrisches Verst\u00e4ndnis und logisches Denken gem\u00e4\u00df Mathematik-Lehrplan.',
      },
      {
        id: 'faq-19',
        question: 'Eignen sich Raster-Puzzles f\u00fcr Kinder mit F\u00f6rderbedarf?',
        answer: 'Ja, einfache Puzzles mit wenigen gro\u00dfen Teilen bieten einen niedrigschwelligen Einstieg. Die klare Rasterstruktur gibt Orientierung. Das Erfolgserlebnis beim richtigen Zusammensetzen motiviert und st\u00e4rkt das Selbstvertrauen, auch bei Kindern mit Lernschwierigkeiten.',
      },
      {
        id: 'faq-20',
        question: 'Kann ich Raster-Puzzle Arbeitsbl\u00e4tter zu einem Heft zusammenstellen?',
        answer: 'Ja, erstellen Sie verschiedene Puzzles von einfach bis komplex und laden Sie alle als PDF herunter. Ordnen Sie die Bl\u00e4tter progressiv: erst wenige gro\u00dfe Teile, dann mehr Teile, dann mit Drehung. Mit einem PDF-Programm f\u00fcgen Sie Arbeitsbl\u00e4tter und L\u00f6sungen zusammen.',
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

  // Related Apps - Apps that work well with grid-match
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Raster-Puzzle-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
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

export default gridMatchDeContent;
