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
    title: 'Bilder-Addition Arbeitsblätter | Visuelles Rechnen lernen',
    description: 'Bilder-Addition: Visuelles Rechnen lernen mit Bildern statt Zahlen. Kostenloser Generator für Grundschule und Vorschule. 3000+ Bilder, PDF in 3 Minuten.',
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
    previewImageSrc: '/samples/german/code-addition/sample-1.jpeg',
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
        videoId: 'vVd11Kjk9iA',
        buttonText: 'Bilder-Addition Funktionen',
        modalTitle: 'Bilder-Addition Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/german/code-addition/
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

  // Features Grid - FULL text from code-addition.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from code-addition.md step sections
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
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Bilder-Additions-Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Förderschullehrkräfte. Jeder profitiert von Arbeitsblättern Grundschule.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from code-addition.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
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
        id: 'faq-1',
        question: 'Was unterscheidet Bilder-Addition von normalen Additionsaufgaben?',
        answer: 'Bei der Bilder-Addition z\u00e4hlen Kinder bunte Bilder wie \u00c4pfel, Autos oder Tiere und schreiben dann die passende Additionsaufgabe. Eine Legende ordnet jedem Bild eine Zufallszahl zu. So verbindet der Generator visuelles Lernen mit mathematischem Denken und macht Rechnen lernen zum spannenden Abenteuer.',
      },
      {
        id: 'faq-2',
        question: 'Welchen Zahlenbereich kann ich f\u00fcr die Bilder-Additions-Aufgaben einstellen?',
        answer: 'Sie stellen Minimum- und Maximum-Werte f\u00fcr den Zahlenbereich ein. F\u00fcr Vorschul-Arbeitsbl\u00e4tter empfehlen wir Zahlen von 1 bis 5. F\u00fcr Rechnen 1. Klasse eignen sich Zahlen bis 10. Die 2. Klasse rechnet sicher mit Zahlen bis 20. Jedes Bild erh\u00e4lt eine Zufallszahl aus dem gew\u00e4hlten Bereich.',
      },
      {
        id: 'faq-3',
        question: 'Wie viele Aufgaben kann ich pro Arbeitsblatt erstellen?',
        answer: 'Sie w\u00e4hlen zwischen 3 und 10 Aufgaben pro Arbeitsblatt. F\u00fcr kurze \u00dcbungen reichen 5 Aufgaben, f\u00fcr ausf\u00fchrliche \u00dcbungsphasen eignen sich 8 oder 10 Aufgaben. Jede Aufgabe zeigt zwei Bilder und ein leeres Feld f\u00fcr die Antwort. Jeder Klick auf Erstellen erzeugt neue Aufgabenkombinationen.',
      },
      {
        id: 'faq-4',
        question: 'Kann ich die Bilder f\u00fcr die Additions-Aufgaben selbst ausw\u00e4hlen?',
        answer: 'Ja, Sie w\u00e4hlen 5 Bilder entweder per Themenauswahl wie Tiere oder Fahrzeuge oder manuell aus der Bibliothek mit \u00fcber 3000 Bildern. So verbinden Sie Rechnen lernen mit Sachunterricht \u2014 zum Beispiel mit Obst-Bildern passend zur Ern\u00e4hrungseinheit.',
      },
      {
        id: 'faq-5',
        question: 'Wird automatisch ein L\u00f6sungsschl\u00fcssel f\u00fcr die Bilder-Addition erstellt?',
        answer: 'Ja, der Generator erstellt mit einem Klick einen L\u00f6sungsschl\u00fcssel, der dieselben Aufgaben mit den korrekten Antworten zeigt. Sie wechseln zwischen Arbeitsblatt und L\u00f6sungsschl\u00fcssel zur \u00dcberpr\u00fcfung und laden beide Versionen separat als PDF oder JPEG herunter.',
      },
      {
        id: 'faq-6',
        question: 'F\u00fcr welche Altersstufen eignen sich die Bilder-Additions-Arbeitsbl\u00e4tter?',
        answer: 'Die Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von der Vorschule bis zur 3. Klasse Grundschule. Die Bilddarstellung macht die Aufgaben besonders f\u00fcr Anf\u00e4nger zug\u00e4nglich. Durch die einstellbare Schwierigkeit passen Sie die Mathe-Arbeitsbl\u00e4tter an jede Lerngruppe an.',
      },
      {
        id: 'faq-7',
        question: 'Kann ich die Bilder-Additions-Arbeitsbl\u00e4tter kommerziell verkaufen?',
        answer: 'Ja, das Vollzugriff Abonnement f\u00fcr 240\u20ac j\u00e4hrlich enth\u00e4lt eine kommerzielle Lizenz. Sie d\u00fcrfen Ihre erstellten Arbeitsbl\u00e4tter auf Teachers Pay Teachers, Etsy oder Amazon KDP verkaufen. Alle Downloads sind wasserzeichenfrei in professioneller 300 DPI Qualit\u00e4t.',
      },
      {
        id: 'faq-8',
        question: 'Kann ich den Bilder-Addition Generator kostenlos testen?',
        answer: 'Ja, Sie k\u00f6nnen ohne Registrierung sofort Bilder-Additions-Arbeitsbl\u00e4tter erstellen. Die Vorschau zeigt Ihr fertiges Arbeitsblatt mit Wasserzeichen. Mit dem Vollzugriff laden Sie unbegrenzt ohne Wasserzeichen herunter. So testen Sie alle 4 Aufgabenmodi risikofrei.',
      },
      {
        id: 'faq-9',
        question: 'Welche Seitenformate stehen f\u00fcr den Druck zur Verf\u00fcgung?',
        answer: 'Sie w\u00e4hlen zwischen Letter und A4 in Hoch- oder Querformat. Im Querformat passen mehr Aufgaben nebeneinander. Alle Arbeitsbl\u00e4tter werden in professioneller 300 DPI Qualit\u00e4t als PDF oder JPEG exportiert. Die Graustufen-Option spart Druckertinte.',
      },
      {
        id: 'faq-10',
        question: 'Wie viele Additions-Aufgaben passen auf eine Seite?',
        answer: 'Die Anzahl h\u00e4ngt vom Seitenformat und der gew\u00e4hlten Bildgr\u00f6\u00dfe ab. Im Hochformat passen typischerweise 4-8 Aufgaben, im Querformat bis zu 10. Weniger Aufgaben mit gr\u00f6\u00dferen Bildern sind ideal f\u00fcr Vorschulkinder, mehr Aufgaben f\u00fcr ge\u00fcbte Rechner.',
      },
      {
        id: 'faq-11',
        question: 'Welche Zahlenr\u00e4ume deckt die Bilder-Addition ab?',
        answer: 'Die Aufgaben arbeiten im Zahlenraum bis 20 mit visueller Bildunterst\u00fctzung. Einfache Aufgaben beginnen bei 1+1 mit wenigen Bildern. Durch die Bilddarstellung verstehen Kinder das Addieren als Zusammenf\u00fcgen von Mengen intuitiv.',
      },
      {
        id: 'faq-12',
        question: 'Kann ich eigene Bilder f\u00fcr die Additions-Aufgaben hochladen?',
        answer: 'Ja, \u00fcber den Datei-Upload-Button laden Sie eigene Bilder in JPEG, PNG oder GIF hoch. Kombinieren Sie hochgeladene Bilder mit Motiven aus der Bibliothek mit \u00fcber 3000 Bildern. So erstellen Sie personalisierte Mathe-Arbeitsbl\u00e4tter mit Klassenfotos oder Sachunterrichtsthemen.',
      },
      {
        id: 'faq-13',
        question: 'Kann ich Bilder-Addition mit anderen Generatoren kombinieren?',
        answer: 'Ja, erstellen Sie umfassende Mathe-Pakete indem Sie Bilder-Addition mit Subtraktions-, Z\u00e4hl- oder Muster-Arbeitsbl\u00e4ttern kombinieren. Alle Generatoren nutzen dieselbe Bildbibliothek. So \u00fcben Kinder verschiedene Rechenoperationen mit denselben vertrauten Bildern.',
      },
      {
        id: 'faq-14',
        question: 'Welche Sprachen unterst\u00fctzt der Bilder-Addition Generator?',
        answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Titel und Anweisungen werden automatisch in der gew\u00e4hlten Sprache generiert.',
      },
      {
        id: 'faq-15',
        question: 'Eignet sich Bilder-Addition f\u00fcr DaF/DaZ-Kinder?',
        answer: 'Ja, die visuelle Bilddarstellung macht Additions-Aufgaben sprachunabh\u00e4ngig verst\u00e4ndlich. Kinder z\u00e4hlen Bilder und schreiben die Zahl \u2014 daf\u00fcr brauchen sie keine Deutschkenntnisse. Gleichzeitig erweitern die Bildmotive den Wortschatz auf nat\u00fcrliche Weise.',
      },
      {
        id: 'faq-16',
        question: 'Wie setze ich Bilder-Addition zur Differenzierung ein?',
        answer: 'Verwenden Sie einfache Aufgaben mit wenigen gro\u00dfen Bildern f\u00fcr Anf\u00e4nger und komplexere Aufgaben mit mehr Bildern f\u00fcr Fortgeschrittene. Die 4 Aufgabenmodi bieten unterschiedliche Schwierigkeitsgrade. So arbeiten alle Kinder am Thema Addition auf ihrem individuellen Niveau.',
      },
      {
        id: 'faq-17',
        question: 'Sind die Bilder-Additions-\u00dcbungen an den Lehrplan angepasst?',
        answer: 'Die \u00dcbungen unterst\u00fctzen die Lernziele des Mathematik-Lehrplans f\u00fcr Vorschule und Klasse 1-2: Addition im Zahlenraum bis 20, Mengenverst\u00e4ndnis und visuelles Rechnen. Die bildgest\u00fctzte Darstellung entspricht dem handlungsorientierten Mathematikunterricht.',
      },
      {
        id: 'faq-18',
        question: 'Eignet sich Bilder-Addition f\u00fcr Kinder mit F\u00f6rderbedarf?',
        answer: 'Ja, die visuelle Bilddarstellung macht Addition besonders zug\u00e4nglich f\u00fcr Kinder mit Rechenschw\u00e4che oder Dyskalkulie. Bilder z\u00e4hlen ist konkreter als abstraktes Rechnen mit Zahlen. Wenige gro\u00dfe Aufgaben pro Seite vermeiden Reiz\u00fcberflutung.',
      },
      {
        id: 'faq-19',
        question: 'Worin unterscheidet sich Bilder-Addition von normaler Addition?',
        answer: 'Bei der Bilder-Addition werden Mengen als Bilder dargestellt statt als abstrakte Zahlen. Kinder z\u00e4hlen z.B. 3 \u00c4pfel plus 2 \u00c4pfel und schreiben das Ergebnis. Diese visuelle Darstellung hilft beim \u00dcbergang vom konkreten zum abstrakten Rechnen und st\u00e4rkt das Mengenverst\u00e4ndnis.',
      },
      {
        id: 'faq-20',
        question: 'Kann ich Bilder-Additions-Arbeitsbl\u00e4tter zu einem Heft zusammenstellen?',
        answer: 'Ja, erstellen Sie verschiedene Aufgabentypen von einfach bis komplex und laden Sie alle als PDF herunter. Ordnen Sie die Bl\u00e4tter nach Schwierigkeit f\u00fcr ein progressives Mathe-\u00dcbungsheft. Mit einem PDF-Programm f\u00fcgen Sie Arbeitsbl\u00e4tter und L\u00f6sungsschl\u00fcssel zusammen.',
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

  // Related Apps - Kombinieren Sie Bilder-Additions-Arbeitsblätter mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default codeAdditionDeContent;
