import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Worträtsel (Word Guess) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/woerter-raten-arbeitsblaetter.ts
 * URL: /de/apps/woerter-raten-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/woerter-raten.md
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
 * PRICING: Word Guess is a FULL ACCESS app (€240/year or €25/month)
 */

export const wordGuessDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'woerter-raten-arbeitsblaetter',
    appId: 'word-guess',
    title: 'Worträtsel-Generator - Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
    description: 'Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.',
    keywords: 'wörter raten arbeitsblätter, worträtsel arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, deutsch arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
  },

  // Hero Section - FULL text from woerter-raten.md
  hero: {
    title: 'Worträtsel-Generator',
    subtitle: 'Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
    description: `Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.

Kinder lieben Rätsel. Worträtsel mit Bildhinweisen verbinden Spaß mit Lernen. Ein Bild zeigt einen Gegenstand. Daneben stehen leere Kästchen für jeden Buchstaben. Die Kinder erraten das Wort und schreiben es auf.

Der Worträtsel-Generator erstellt Arbeitsblätter für die Grundschule in Sekunden. Wählen Sie Bilder aus über 3.000 kindgerechten Motiven. Das System extrahiert automatisch die Wörter. Sie können die Wörter auch manuell anpassen.`,
    previewImageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Worträtsel-Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
        answerKeySrc: '/samples/english/word guess/clue-grid_answer-key.jpeg',
        altText: 'Worträtsel-Arbeitsblatt mit Hinweisraster für Arbeitsblätter Grundschule und Buchstaben lernen',
        pdfDownloadUrl: '/samples/english/word guess/clue-grid_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word guess/landscape.jpeg',
        answerKeySrc: '/samples/english/word guess/landscape answer-key.jpeg',
        altText: 'Worträtsel-Arbeitsblatt im Querformat für Deutsch Arbeitsblätter und Vorschule Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/word guess/landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word guess/custom word list.jpeg',
        answerKeySrc: '/samples/english/word guess/custom word list answer-key.jpeg',
        altText: 'Worträtsel-Arbeitsblatt mit eigener Wortliste für Kostenlose Arbeitsblätter und Mathe Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/word guess/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from woerter-raten.md feature sections
  features: {
    sectionTitle: 'Funktionen des Worträtsel-Generators - Kostenlose Arbeitsblätter für Arbeitsblätter Grundschule erstellen',
    sectionDescription: 'Der Worträtsel-Generator bietet alle Werkzeuge für professionelle Arbeitsblätter. Jede Funktion wurde für Lehrkräfte entwickelt. Keine technischen Kenntnisse erforderlich. Erstellen Sie in Minuten Arbeitsblätter, die sonst Stunden dauern würden.',
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
        title: 'Arbeitsblätter Grundschule in 3 Klicks erstellen - Kostenlose Arbeitsblätter Generator',
        description: `Die Erstellung ist kinderleicht. Schritt eins: Wählen Sie ein Thema oder einzelne Bilder. Schritt zwei: Stellen Sie die Schwierigkeit ein. Schritt drei: Klicken Sie auf Generieren. Ihr Arbeitsblatt erscheint sofort auf dem Bildschirm.

Sie brauchen keine Designkenntnisse. Der Generator übernimmt das Layout automatisch. Bis zu 10 Rätsel passen auf eine Seite. Das System berechnet die optimale Größe für jedes Element.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Vorschule Arbeitsblätter vollständig bearbeiten - Buchstaben lernen mit anpassbaren Übungen',
        description: `Jedes Element auf dem Arbeitsblatt ist bearbeitbar. Verschieben Sie Bilder per Drag-and-Drop. Drehen und skalieren Sie jedes Objekt. Löschen Sie unerwünschte Elemente mit einem Klick.

Die Bearbeitungsfunktionen sind umfangreich. Ändern Sie Schriftarten und Farben. Fügen Sie eigenen Text hinzu. Passen Sie Hintergründe und Rahmen an. Vorschule Arbeitsblätter werden so perfekt auf Ihre Bedürfnisse zugeschnitten.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen für Deutsch Arbeitsblätter und Buchstaben lernen Übungen',
        description: `Laden Sie Ihre eigenen Bilder hoch. Der Generator akzeptiert JPEG, PNG und GIF. Mehrere Dateien können gleichzeitig hochgeladen werden. Kombinieren Sie eigene Bilder mit der Bibliothek.

Personalisierte Deutsch Arbeitsblätter motivieren Schüler besonders. Verwenden Sie Fotos von Klassenausflügen. Erstellen Sie Worträtsel mit Namen der Schüler. So wird Buchstaben lernen zum persönlichen Erlebnis.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprachen für Arbeitsblätter Grundschule - Deutsch Arbeitsblätter und internationale Inhalte',
        description: `Der Generator unterstützt 11 Sprachen vollständig. Die Benutzeroberfläche ist komplett übersetzt. Alle Bildnamen sind in jeder Sprache verfügbar. Wechseln Sie die Sprache mit einem Klick.

Verfügbare Sprachen sind Deutsch, Englisch, Französisch und Spanisch. Dazu kommen Portugiesisch, Italienisch und Niederländisch. Auch Schwedisch, Dänisch, Norwegisch und Finnisch sind enthalten. Arbeitsblätter Grundschule für DaZ-Unterricht sind damit einfach erstellt.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz für Kostenlose Arbeitsblätter - Verkaufen auf Teachers Pay Teachers',
        description: `Ihr Vollzugriff Abo enthält eine kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsblätter ohne zusätzliche Gebühren. Teachers Pay Teachers, Etsy und Amazon KDP sind erlaubt. Die Lizenz ist im Preis von 240 Euro pro Jahr enthalten.

Viele Lehrkräfte verdienen Geld mit ihren Materialien. Kostenlose Arbeitsblätter bedeutet keine Kosten pro Arbeitsblatt. Erstellen Sie unbegrenzt Vorlagen zum Verkauf. Behalten Sie 100 Prozent der Einnahmen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3.000 Bilder für Mathe Arbeitsblätter und Vorschule Arbeitsblätter',
        description: `Die Bildbibliothek enthält über 3.000 kindgerechte Motive. Alle Bilder sind nach Themen sortiert. Tiere, Fahrzeuge, Lebensmittel und mehr. Jedes Bild hat einen passenden Dateinamen für das Worträtsel.

Suchen Sie nach bestimmten Bildern mit der Suchfunktion. Wählen Sie komplette Themen mit einem Klick. Mathe Arbeitsblätter nutzen Zahlenbilder. Vorschule Arbeitsblätter zeigen einfache Alltagsgegenstände.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität für Arbeitsblätter Grundschule zum Ausdrucken',
        description: `Alle Downloads haben professionelle Druckqualität. 300 DPI garantieren scharfe Bilder und Texte. Wählen Sie zwischen PDF und JPEG Format. Die Graustufen-Option spart bis zu 70 Prozent Druckertinte.

Arbeitsblätter Grundschule sehen gedruckt genauso gut aus wie am Bildschirm. Perfekt für Kopiergeräte in Schulen. Ideal für Print-on-Demand Verkauf. Jedes Arbeitsblatt enthält automatisch einen Lösungsschlüssel.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from woerter-raten.md
  howTo: {
    sectionTitle: 'Schritt-für-Schritt Anleitung - Kostenlose Arbeitsblätter für Arbeitsblätter Grundschule erstellen',
    sectionDescription: 'Erstellen Sie Ihr erstes Worträtsel in unter drei Minuten. Diese Anleitung zeigt jeden Schritt im Detail. Keine Vorkenntnisse erforderlich. Folgen Sie einfach den fünf Schritten unten.',
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
        title: 'Schritt 1: Thema und Bilder wählen für Vorschule Arbeitsblätter und Buchstaben lernen',
        description: `Öffnen Sie den Worträtsel-Generator in Ihrem Browser. Im linken Menü finden Sie die Bildbibliothek. Wählen Sie ein Thema aus dem Dropdown-Menü. Sofort erscheinen alle passenden Bilder.

Für Vorschule Arbeitsblätter eignen sich einfache Themen. Tiere, Obst und Farben sind ideal für Anfänger. Buchstaben lernen gelingt am besten mit vertrauten Gegenständen. Wählen Sie Bilder, die Ihre Kinder bereits kennen.

Klicken Sie auf einzelne Bilder zur Auswahl. Ein blauer Rahmen zeigt ausgewählte Bilder an. Sie können bis zu 10 Bilder pro Arbeitsblatt wählen. Die Anzahl erscheint unter der Bildvorschau.`,
      },
      {
        id: '2',
        number: 2,
        icon: '⚙️',
        title: 'Schritt 2: Schwierigkeit einstellen für Arbeitsblätter Grundschule und Deutsch Arbeitsblätter',
        description: `Öffnen Sie den Bereich "Übungskonfiguration" im Menü. Hier stellen Sie die Anzahl der Rätsel ein. Wählen Sie zwischen 1 und 10 Rätseln pro Seite. Für Arbeitsblätter Grundschule empfehlen wir 6 bis 8 Rätsel.

Die Schwierigkeitsstufe bestimmt die Anzahl der Hinweise. "Keine Hinweise" zeigt nur leere Kästchen. Das ist ideal für fortgeschrittene Schüler. "Leicht" zeigt die Hälfte aller Buchstaben vorab.

Für Deutsch Arbeitsblätter in der ersten Klasse wählen Sie "Leicht". Die Kinder sehen einige Buchstaben als Starthilfe. "Normal" zeigt ein Viertel der Buchstaben. "Schwer" zeigt nur jeden sechsten Buchstaben.

Wählen Sie Groß- oder Kleinbuchstaben. Für Anfänger sind Großbuchstaben empfohlen. Fortgeschrittene Schüler üben mit Kleinbuchstaben. Sie können auch bestimmte Buchstaben von Hinweisen ausschließen.`,
      },
      {
        id: '3',
        number: 3,
        icon: '✨',
        title: 'Schritt 3: Arbeitsblatt generieren mit Kostenlose Arbeitsblätter Generator für Mathe Arbeitsblätter',
        description: `Klicken Sie auf den blauen "Generieren" Button. Das Arbeitsblatt erscheint sofort auf dem Bildschirm. Die Vorschau zeigt genau, wie das gedruckte Blatt aussehen wird. Prüfen Sie Layout und Inhalt.

Der Kostenlose Arbeitsblätter Generator ordnet alle Elemente automatisch an. Bilder erscheinen links neben den Buchstabenkästchen. Bei Querformat werden zwei Spalten verwendet. Die optimale Größe wird automatisch berechnet.

Gefällt Ihnen das Ergebnis nicht? Klicken Sie erneut auf Generieren. Der Generator wählt neue zufällige Hinweise. Mathe Arbeitsblätter mit Zahlwörtern erscheinen bei jedem Klick anders. Experimentieren Sie mit verschiedenen Einstellungen.`,
      },
      {
        id: '4',
        number: 4,
        icon: '🎨',
        title: 'Schritt 4: Bearbeiten auf dem Canvas - Einmaleins und Schwungübungen anpassen',
        description: `Nach dem Generieren können Sie alles bearbeiten. Klicken Sie auf ein Element zum Auswählen. Blaue Anfasser erscheinen zum Skalieren und Drehen. Verschieben Sie Elemente per Drag-and-Drop.

Fügen Sie eigenen Text hinzu über die Texttools. Wählen Sie Schriftart, Größe und Farbe. Text für Einmaleins Übungsblätter ist schnell erstellt. Schreiben Sie "Schreibe das Wort" als Anweisung.

Die Werkzeugleiste bietet weitere Optionen. Bringen Sie Elemente nach vorne oder hinten. Richten Sie mehrere Objekte aus. Löschen Sie unerwünschte Elemente. So entstehen perfekte Schwungübungen Alternativen.

Hintergründe und Rahmen verschönern das Arbeitsblatt. Wählen Sie aus verschiedenen Themen. Passen Sie die Deckkraft an. Professionelle Designs sind mit wenigen Klicks erstellt.`,
      },
      {
        id: '5',
        number: 5,
        icon: '📥',
        title: 'Schritt 5: Download und Druck - Rechnen lernen und Buchstaben lernen Materialien speichern',
        description: `Wechseln Sie zwischen Arbeitsblatt und Lösungsschlüssel. Der Tab oben zeigt beide Versionen. Prüfen Sie den Lösungsschlüssel vor dem Download. Alle Wörter sind vollständig ausgefüllt.

Klicken Sie auf den Download-Button rechts oben. Wählen Sie zwischen PDF und JPEG Format. PDF eignet sich für mehrseitige Dokumente. JPEG ist ideal für einzelne Arbeitsblätter.

Die Graustufen-Option spart Druckertinte. Aktivieren Sie diese vor dem Download. Rechnen lernen Materialien werden so kostengünstig gedruckt. Buchstaben lernen Übungen sehen auch in Graustufen gut aus.`,
      },
    ],
  },

  // Use Cases Section - FULL text from woerter-raten.md
  useCases: {
    sectionTitle: 'Wer profitiert vom Worträtsel-Generator - Kostenlose Arbeitsblätter für jeden Bedarf',
    sectionDescription: 'Der Worträtsel-Generator ist für viele Zielgruppen konzipiert. Lehrkräfte, Eltern und Therapeuten nutzen das Tool täglich. Jede Gruppe hat unterschiedliche Anforderungen. Unser Generator erfüllt sie alle.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieherinnen in der Vorschule - Vorschule Arbeitsblätter für Buchstaben lernen und Schwungübungen',
        subtitle: 'Kindergarten und Kita',
        description: `Erzieherinnen in Kindergarten und Vorschule bereiten Kinder auf die Schule vor. Vorschule Arbeitsblätter mit Worträtseln sind perfekt für diese Altersgruppe. Kinder lernen erste Buchstaben spielerisch. Das Buchstaben lernen wird zum Abenteuer.

Worträtsel mit Bildern motivieren Vorschulkinder besonders. Das bekannte Bild gibt Sicherheit. Das Kind errät das Wort und schreibt es auf. Die Schwungübungen in den Kästchen trainieren die Hand.

Wählen Sie einfache Wörter mit 3-4 Buchstaben. Nutzen Sie die Schwierigkeitsstufe "Leicht". So sehen Kinder die Hälfte der Buchstaben. Das gibt Erfolgserlebnisse und motiviert zum Weitermachen.`,
        quote: 'Meine Vorschulkinder lieben die Worträtsel mit Bildhinweisen!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse - Arbeitsblätter Grundschule für Deutsch Arbeitsblätter und Rechnen 1. Klasse',
        subtitle: '1. bis 3. Klasse',
        description: `Lehrkräfte in der Grundschule nutzen Worträtsel vielseitig. Arbeitsblätter Grundschule für Rechtschreibung sind schnell erstellt. Lernwörter aus dem Unterricht werden zu Rätseln. Deutsch Arbeitsblätter ergänzen den Wortschatzunterricht.

In der 1. Klasse beginnt das systematische Schreibenlernen. Worträtsel unterstützen diesen Prozess ideal. Rechnen 1. Klasse wird durch Zahlwörter ergänzt. "Eins", "Zwei", "Drei" als Schreibübung festigen Zahlvorstellungen.

Die 2. und 3. Klasse nutzt schwierigere Einstellungen. Weniger Buchstabenhinweise fordern die Schüler. Längere Wörter erweitern den Wortschatz. Fachbegriffe aus dem Sachunterricht werden geübt.`,
        quote: 'Perfekt für differenzierten Deutschunterricht in der Grundschule!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Eltern im Homeschooling - Kostenlose Arbeitsblätter und Mathe Arbeitsblätter für zu Hause',
        subtitle: 'Lernen zu Hause',
        description: `Immer mehr Familien unterrichten ihre Kinder zu Hause. Kostenlose Arbeitsblätter im Sinne von unbegrenzter Erstellung sind dabei unverzichtbar. Der Generator spart Eltern wertvolle Vorbereitungszeit. Professionelle Materialien entstehen in Minuten.

Homeschooling erfordert Materialien für verschiedene Fächer. Mathe Arbeitsblätter mit Zahlwörtern decken Mathematik ab. Deutsch-Worträtsel üben Rechtschreibung. Ein Generator für alle Bedürfnisse spart Geld und Zeit.

Eltern können Inhalte perfekt auf ihr Kind abstimmen. Verwenden Sie Lieblingswörter des Kindes. Erstellen Sie Rätsel mit Haustier-Namen. Personalisierte Übungen motivieren besonders stark.`,
        quote: 'Ein Werkzeug für alle meine Kinder - verschiedene Schwierigkeiten, gleiches Thema!',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'DaZ- und DaF-Lehrkräfte - Deutsch Arbeitsblätter für Sprachförderung und Buchstaben lernen',
        subtitle: 'Sprachförderung',
        description: `Deutsch als Zweitsprache (DaZ) und Deutsch als Fremdsprache (DaF) erfordern spezielle Materialien. Deutsch Arbeitsblätter mit Bildunterstützung sind ideal für Sprachlerner. Das Bild erklärt das Wort ohne Übersetzung.

Buchstaben lernen in einer neuen Sprache ist herausfordernd. Worträtsel verbinden Bild, Wort und Schrift. Lernende sehen das Objekt und schreiben den deutschen Begriff. Wiederholung festigt den Wortschatz nachhaltig.

Die 11-Sprachen-Unterstützung hilft bei gemischten Gruppen. Erstellen Sie Arbeitsblätter in der Muttersprache der Lernenden. Vergleichen Sie deutsche Wörter mit anderen Sprachen. So wird der Sprachunterricht lebendig.`,
        quote: 'Die Mehrsprachigkeit ist genau das, was meine DaZ-Schüler brauchen!',
      },
      {
        id: '5',
        icon: '♿',
        title: 'Förderschullehrkräfte - Vorschule Arbeitsblätter und Einmaleins mit visueller Unterstützung',
        subtitle: 'Förderschule und Inklusion',
        description: `Kinder mit besonderem Förderbedarf profitieren von visuellen Hilfen. Vorschule Arbeitsblätter mit großen Bildern sind leicht verständlich. Die klare Struktur gibt Orientierung. Jedes Rätsel folgt dem gleichen Muster.

Die vier Schwierigkeitsstufen ermöglichen Differenzierung. Jedes Kind arbeitet auf seinem Niveau. Einmaleins Ergebnisse als Wörter schreiben trainiert mehrere Fähigkeiten. Motorik, Sprache und Mathematik werden verbunden.

Wiederholung ist im Förderunterricht besonders wichtig. Erstellen Sie täglich neue Arbeitsblätter zum gleichen Thema. Der Generator liefert immer neue Varianten. So bleibt die Übung interessant ohne zu überfordern.`,
        quote: 'Die individuelle Anpassung spart mir Stunden bei der Materialerstellung!',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Lehrkräfte als Unternehmer - Arbeitsblätter Grundschule verkaufen auf Teachers Pay Teachers',
        subtitle: 'Verkauf auf Online-Plattformen',
        description: `Viele Lehrkräfte verkaufen ihre Materialien online. Arbeitsblätter Grundschule sind auf Teachers Pay Teachers sehr gefragt. Der Worträtsel-Generator erstellt verkaufsfähige Produkte. Die kommerzielle Lizenz ist im Vollzugriff Abo enthalten.

Erstellen Sie thematische Pakete für verschiedene Anlässe. Weihnachts-Worträtsel im Dezember. Oster-Worträtsel im Frühling. Saisonale Produkte verkaufen sich besonders gut.

Die 300 DPI Qualität erfüllt professionelle Standards. Verkaufen Sie auf Etsy, Amazon KDP oder Ihrem eigenen Shop. Keine zusätzlichen Lizenzgebühren fallen an. Behalten Sie alle Einnahmen für sich.`,
        quote: 'Mein Abonnement hat sich schon im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL text from woerter-raten.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen - Mathe Arbeitsblätter, Einmaleins und Vorschule Arbeitsblätter erstellen',
    sectionDescription: 'Hier finden Sie Antworten auf die häufigsten Fragen zum Worträtsel-Generator. Wir erklären alles von der Anmeldung bis zum Verkauf Ihrer Materialien.',
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
        question: 'Ist der Worträtsel-Generator wirklich kostenlos für Deutsch Arbeitsblätter?',
        answer: `Der Worträtsel-Generator erfordert ein Vollzugriff Abo. Dieses kostet 240 Euro pro Jahr oder 25 Euro pro Monat. Mit Ihrem Abo erstellen Sie unbegrenzt Worträtsel ohne zusätzliche Kosten pro Arbeitsblatt.

Das Basis-Paket mit 10 Apps kostet 144 Euro pro Jahr. Der Worträtsel-Generator ist jedoch nur im Vollzugriff Abo enthalten. Vollzugriff umfasst alle 33 Worksheet-Generatoren inklusive kommerzieller Lizenz.

Deutsch Arbeitsblätter und alle anderen Sprachen sind im Preis enthalten. Keine versteckten Kosten für Bilder oder Downloads. 11 Sprachen, über 3.000 Bilder, unbegrenzte Downloads.`,
      },
      {
        id: '2',
        question: 'Kann ich Schwungübungen und Einmaleins Worträtsel zu Hause drucken?',
        answer: `Ja, alle Arbeitsblätter sind für den Heimdruck optimiert. Die 300 DPI Auflösung garantiert scharfe Ergebnisse. Schwungübungen ähnliche Schreibübungen sehen gedruckt perfekt aus.

Wählen Sie die Graustufen-Option für sparsamen Druck. Einmaleins Zahlwörter-Rätsel brauchen keine Farbe. Das spart bis zu 70 Prozent Druckertinte. Normales Kopierpapier ist ausreichend.

PDF-Downloads funktionieren mit jedem Drucker. JPEG-Dateien sind eine Alternative für ältere Geräte. Beide Formate haben identische Druckqualität.`,
      },
      {
        id: '3',
        question: 'Brauche ich Designkenntnisse für Mathe Arbeitsblätter und Ausmalbilder?',
        answer: `Nein, keinerlei Designkenntnisse erforderlich. Der Generator erstellt professionelle Layouts automatisch. Mathe Arbeitsblätter mit Zahlwörtern entstehen in drei Klicks.

Wählen Sie Bilder, stellen Sie die Schwierigkeit ein, klicken Sie Generieren. Das war's. Ausmalbilder entstehen durch die Graustufen-Option automatisch. Keine Bildbearbeitung notwendig.

Falls Sie anpassen möchten: Alles ist per Drag-and-Drop bearbeitbar. Verschieben, skalieren und drehen Sie jedes Element. Aber die Standardausgabe ist bereits professionell verwendbar.`,
      },
      {
        id: '4',
        question: 'Darf ich Vorschule Arbeitsblätter und Rechnen lernen Materialien im Unterricht nutzen?',
        answer: `Ja, Ihr Vollzugriff Abo erlaubt unbegrenzte Nutzung im Unterricht. Drucken Sie Klassensätze ohne Einschränkungen. Vorschule Arbeitsblätter für 30 Kinder? Kein Problem.

Verteilen Sie die Arbeitsblätter an Schüler und Eltern. Rechnen lernen Materialien als Hausaufgabe sind erlaubt. Digitale Verteilung über Schulplattformen ist ebenfalls gestattet.

Die Lizenz gilt für eine Person. Kollegen benötigen eigene Abos. Schullizenzen für mehrere Lehrkräfte sind auf Anfrage verfügbar.`,
      },
      {
        id: '5',
        question: 'In welchen Sprachen gibt es Einmaleins und Buchstaben Worträtsel?',
        answer: `Der Generator unterstützt 11 Sprachen vollständig. Deutsch, Englisch, Französisch, Spanisch und Portugiesisch. Dazu Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch.

Einmaleins Zahlwörter sind in jeder Sprache verfügbar. "Zwölf", "Twelve", "Douze", "Doce". Die Bildbibliothek enthält übersetzte Bildnamen. Buchstaben Worträtsel funktionieren in allen Sprachen.

Wechseln Sie die Sprache mit einem Klick im Menü. Die gesamte Benutzeroberfläche wird übersetzt. Perfekt für mehrsprachige Klassenzimmer und internationalen Unterricht.`,
      },
      {
        id: '6',
        question: 'Kann ich Schwungübungen Alternativen und Malvorlagen verkaufen?',
        answer: `Ja, das Vollzugriff Abo enthält eine kommerzielle POD-Lizenz. Verkaufen Sie Ihre Worträtsel auf allen Plattformen. Teachers Pay Teachers, Etsy und Amazon KDP sind erlaubt.

Schwungübungen Alternativen in Form von Worträtseln sind verkaufsfähig. Malvorlagen mit Worträtseln kombiniert ebenso. Keine zusätzlichen Lizenzgebühren fallen an.

Behalten Sie 100 Prozent Ihrer Verkaufseinnahmen. Die einzige Einschränkung: Keine Weitergabe der Generatoren selbst. Nur die erstellten Arbeitsblätter dürfen verkauft werden.`,
      },
      {
        id: '7',
        question: 'Wie passe ich Rechnen 1. Klasse Worträtsel an meine Schüler an?',
        answer: `Die Anpassungsmöglichkeiten sind umfangreich. Wählen Sie die Schwierigkeitsstufe passend zum Lernstand. Rechnen 1. Klasse Schüler profitieren von "Leicht" mit vielen Hinweisen.

Bestimmen Sie die Anzahl der Rätsel pro Seite. 1-10 Rätsel sind möglich. Weniger Rätsel bedeutet größere Darstellung. Ideal für Kinder mit Sehschwäche oder Konzentrationsproblemen.

Schließen Sie bestimmte Buchstaben von Hinweisen aus. Übung für schwierige Buchstaben wie "ß" oder "ä". Wählen Sie Groß- oder Kleinschreibung. Jedes Detail ist kontrollierbar.`,
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Ausmalbilder und Einmaleins Worträtsel?',
        answer: `Worträtsel eignen sich für Kinder ab 4 Jahren. Vorschulkinder nutzen einfache Wörter mit 3-4 Buchstaben. Mit Ausmalbilder Funktion sind die Blätter auch für Jüngere attraktiv.

Grundschulkinder bis zur 4. Klasse profitieren von schwierigeren Einstellungen. Einmaleins Worträtsel fordern auch Zehnjährige heraus. Längere Wörter und weniger Hinweise erhöhen die Schwierigkeit.

Auch Erwachsene nutzen Worträtsel. Sprachkurse für Erwachsene. Demenzprävention bei Senioren. Die Bilder machen die Übungen zugänglich für alle Altersgruppen.`,
      },
      {
        id: '9',
        question: 'Kann ich eigene Fotos für Mathe Arbeitsblätter hochladen?',
        answer: `Ja, der Upload eigener Bilder ist möglich. Akzeptierte Formate sind JPEG, PNG und GIF. Mehrere Dateien können gleichzeitig hochgeladen werden.

Mathe Arbeitsblätter mit Klassenfotos motivieren besonders. Laden Sie Bilder vom Schulausflug hoch. Erstellen Sie personalisierte Worträtsel mit den Namen der Kinder.

Hochgeladene Bilder bleiben nur während der Sitzung verfügbar. Für dauerhafte Speicherung laden Sie dieselben Bilder erneut hoch. Die Bibliothek mit 3.000+ Bildern steht immer zur Verfügung.`,
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Deutsch Arbeitsblätter Worträtseln?',
        answer: `Die Erstellung dauert unter 3 Minuten. Thema wählen, Schwierigkeit einstellen, Generieren klicken. Ihr Deutsch Arbeitsblätter Worträtsel ist sofort fertig.

Mit Übung geht es noch schneller. Erfahrene Nutzer erstellen Arbeitsblätter in unter einer Minute. Das spart täglich wertvolle Vorbereitungszeit.

Auch die Bearbeitung ist schnell. Kleine Anpassungen brauchen Sekunden. Komplexe Änderungen mit Text und Hintergrund dauern 2-3 Minuten zusätzlich.`,
      },
      {
        id: '11',
        question: 'Enthalten die Worträtsel Lösungsschlüssel für Vorschule Arbeitsblätter?',
        answer: `Ja, jedes Arbeitsblatt hat einen automatischen Lösungsschlüssel. Wechseln Sie zwischen Arbeitsblatt und Lösungsschlüssel mit einem Klick. Vorschule Arbeitsblätter und alle anderen haben diese Funktion.

Der Lösungsschlüssel zeigt alle Buchstaben ausgefüllt. Perfekt für Selbstkontrolle oder Lehrerkorrektur. Beide Versionen können separat heruntergeladen werden.

Drucken Sie den Lösungsschlüssel auf die Rückseite. Oder als separate Seite für Ihre Unterlagen. Die Wahl liegt bei Ihnen.`,
      },
      {
        id: '12',
        question: 'Kann ich Worträtsel zu bestimmten Schulfächern wie Einmaleins erstellen?',
        answer: `Ja, thematische Worträtsel sind einfach erstellt. Wählen Sie passende Bilder aus der Bibliothek. Einmaleins Themen nutzen Zahlenbilder und mathematische Symbole.

Sachunterricht-Worträtsel zeigen Tiere, Pflanzen oder Fahrzeuge. Sport-Worträtsel nutzen Sportgeräte-Bilder. Die umfangreiche Bibliothek deckt alle Schulfächer ab.

Alternativ geben Sie eigene Wörter ein. Bis zu 8 Wörter ohne Bilder. Fachbegriffe aus jedem Unterrichtsfach sind möglich. Perfekt für Vokabeltests und Diktatvorbereitung.`,
      },
    ],
  },

  // Related Apps Section - FULL text from woerter-raten.md
  relatedApps: {
    sectionTitle: 'Worträtsel kombinieren mit anderen Apps - Mathe Arbeitsblätter und Schwungübungen Komplettpaket',
    sectionDescription: 'Der Worträtsel-Generator ist Teil eines umfassenden Systems. 33 Worksheet-Generatoren arbeiten zusammen. Erstellen Sie komplette Lernpakete zu jedem Thema. Alle Apps nutzen die gleiche Bildbibliothek.',
    ctaTitle: 'Bereit für professionelle Worträtsel-Arbeitsblätter?',
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
        slug: 'math-worksheet',
        name: 'Mathe-Arbeitsblätter',
        category: 'Mathematik',
        icon: '🔢',
        description: 'Kombinieren Sie Worträtsel mit dem Mathe-Arbeitsblatt Generator für Rechnen lernen mit Zahlwörtern.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Linien-Ziehen',
        category: 'Feinmotorik',
        icon: '✏️',
        description: 'Der Linien-Ziehen Generator erstellt echte Schwungübungen als perfekte Ergänzung zu Worträtseln.',
      },
      {
        id: '3',
        slug: 'addition',
        name: 'Addition',
        category: 'Rechnen',
        icon: '➕',
        description: 'Kombinieren Sie Zahlwort-Rätsel mit Additions-Arbeitsblättern für Rechnen 1. Klasse Pakete.',
      },
      {
        id: '4',
        slug: 'word-search',
        name: 'Wortsuchspiel',
        category: 'Wortschatz',
        icon: '🔍',
        description: 'Worträtsel führen neue Wörter ein. Das Wortsuchspiel festigt die Schreibung danach.',
      },
      {
        id: '5',
        slug: 'image-crossword',
        name: 'Kreuzworträtsel',
        category: 'Sprache',
        icon: '📝',
        description: 'Kreuzworträtsel wiederholen den Wortschatz. Drei Apps für eine vollständige Lernsequenz.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Fügen Sie Ausmalbilder zu Ihren Worträtseln hinzu. Die Graustufen-Option macht alle Bilder zum Ausmalen bereit.',
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Voller Zugang',
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
    guaranteeText: '30-Tage-Geld-zurück-Garantie',
  },
};

export default wordGuessDeContent;
