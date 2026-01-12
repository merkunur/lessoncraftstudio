import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Was passt nicht (Odd One Out) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/was-passt-nicht-arbeitsblaetter.ts
 * URL: /de/apps/was-passt-nicht-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/was-passt-nicht.md
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
 * PRICING: Odd One Out is a FULL ACCESS app (€240/year or €25/month)
 */

export const oddOneOutDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'was-passt-nicht-arbeitsblaetter',
    appId: 'odd-one-out',
    title: 'Was passt nicht Arbeitsblätter Generator - Kostenlose Arbeitsblätter für Vorschule und Grundschule',
    description: 'Erstellen Sie professionelle "Was passt nicht"-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Perfekt für Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Laden Sie druckfertige PDF-Arbeitsblätter in weniger als 3 Minuten herunter.',
    keywords: 'was passt nicht arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/was-passt-nicht-arbeitsblaetter',
  },

  // Hero Section - FULL text from was-passt-nicht.md
  hero: {
    title: 'Was passt nicht Generator',
    subtitle: 'Kostenlose Arbeitsblätter für Vorschule und Grundschule',
    description: `Erstellen Sie professionelle "Was passt nicht"-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abonnement gestalten Sie unbegrenzt viele Übungsblätter ohne zusätzliche Kosten. Laden Sie druckfertige PDF-Arbeitsblätter in weniger als 3 Minuten herunter. Perfekt für Vorschule Arbeitsblätter und den Einsatz in der 1. Klasse bis 3. Klasse.

Der Was passt nicht Generator ist ein vielseitiges Werkzeug für Pädagogen. Kinder lernen, Kategorien zu erkennen und logisch zu denken. Jedes Arbeitsblatt zeigt vier Bilder pro Übung. Drei Bilder gehören zusammen, eines ist anders. Die Schüler kreisen das Bild ein, das nicht dazu passt. Diese Übungen fördern kritisches Denken und visuelle Wahrnehmung.

Unser Generator bietet zwei verschiedene Modi für maximale Flexibilität. Im Identisch-Modus sehen Kinder drei identische Bilder plus ein abweichendes. Im Ähnlich-Modus stammen drei Bilder aus einer Kategorie, das vierte aus einer anderen. Wählen Sie zwischen 5 und 10 Übungen pro Arbeitsblatt. Das System verhindert automatisch Bildwiederholungen.

Die umfangreiche Bildbibliothek enthält über 3000 kindgerechte Bilder. Alle Bilder sind speziell für den Bildungsbereich erstellt. Sie können auch eigene Bilder hochladen und mit der Bibliothek kombinieren. Das macht jedes Arbeitsblatt einzigartig und passend zu Ihrem Unterrichtsthema.`,
    previewImageSrc: '/samples/english/odd one out/similar.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/odd one out/
  samples: {
    sectionTitle: 'Was passt nicht Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/odd one out/similar.jpeg',
        answerKeySrc: '/samples/english/odd one out/similar answer-key.jpeg',
        altText: 'Was passt nicht Arbeitsblatt im Ähnlich-Modus für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/odd one out/similar.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/odd one out/identical.jpeg',
        answerKeySrc: '/samples/english/odd one out/identical answer-key.jpeg',
        altText: 'Was passt nicht Arbeitsblatt im Identisch-Modus für Mathe Arbeitsblätter und kostenlose Arbeitsblätter',
        pdfDownloadUrl: '/samples/english/odd one out/identical.pdf',
      },
    ],
  },

  // Features Grid - FULL text from was-passt-nicht.md feature sections
  features: {
    sectionTitle: 'Was passt nicht Generator Funktionen - Arbeitsblätter Grundschule und Vorschule Arbeitsblätter erstellen',
    sectionDescription: 'Der Was passt nicht Generator bietet alle Werkzeuge für professionelle Arbeitsblätter. Lehrkräfte erstellen individuelle Übungen in wenigen Minuten. Das System ist intuitiv und erfordert keine technischen Vorkenntnisse. Jede Funktion wurde für den Bildungsbereich optimiert. Hier sind die wichtigsten Funktionen im Detail.',
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
        title: 'Kostenlose Arbeitsblätter in 3 Klicks erstellen - Schneller Generator für Mathe Arbeitsblätter',
        description: `Die Erstellung beginnt mit der Themenwahl. Wählen Sie aus über 50 Bildthemen wie Tiere, Fahrzeuge oder Zahlen. Das System lädt passende Bilder automatisch. Klicken Sie auf "Erstellen" und Ihr Arbeitsblatt erscheint sofort. Keine Wartezeiten, keine komplizierten Einstellungen. Auch Mathe Arbeitsblätter mit Zahlenbildern gelingen mühelos.

Der Generator bietet zwei Modi für unterschiedliche Schwierigkeitsgrade. Im Identisch-Modus erscheinen drei gleiche Bilder. Die Kinder finden das eine abweichende Bild. Im Ähnlich-Modus stammen drei Bilder aus einer Kategorie. Das vierte Bild gehört zu einer anderen Kategorie. Beide Modi fördern logisches Denken.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Arbeitsblätter Grundschule vollständig bearbeiten - Alles auf der Leinwand anpassen',
        description: `Jedes Element auf dem Arbeitsblatt ist bearbeitbar. Verschieben Sie Bilder mit der Maus an beliebige Positionen. Drehen Sie Objekte für mehr Abwechslung. Vergrößern oder verkleinern Sie einzelne Elemente nach Bedarf. Löschen Sie unerwünschte Objekte mit einem Klick.

Die Textwerkzeuge bieten volle Gestaltungsfreiheit. Fügen Sie Überschriften, Anweisungen oder Namen hinzu. Wählen Sie aus sechs kindgerechten Schriftarten. Passen Sie Schriftgröße und Farbe individuell an. Textumrandungen sorgen für bessere Lesbarkeit. Perfekt für Arbeitsblätter Grundschule mit klaren Anweisungen.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Vorschule Arbeitsblätter mit eigenen Bildern personalisieren - Fotos hochladen',
        description: `Laden Sie eigene Bilder hoch und erstellen Sie einzigartige Übungen. Unterstützt werden JPEG, PNG und GIF Formate. Kombinieren Sie hochgeladene Bilder mit der Bibliothek. Erstellen Sie personalisierte Vorschule Arbeitsblätter mit Klassenfotos. Thematische Arbeitsblätter zu aktuellen Unterrichtsthemen werden möglich.

Der Upload funktioniert schnell und einfach. Wählen Sie mehrere Dateien gleichzeitig aus. Die Bilder erscheinen sofort in der Vorschau. Ziehen Sie sie in Ihre Übungen per Drag-and-Drop. Die Qualität bleibt beim Export erhalten.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Deutsch Arbeitsblätter und Buchstaben lernen in 11 Sprachen unterstützt',
        description: `Die Benutzeroberfläche ist in 11 Sprachen verfügbar. Deutsch, Englisch, Französisch, Spanisch und weitere. Wechseln Sie die Sprache mit einem Klick. Alle Menüs, Beschriftungen und Hilftexte passen sich an. Ideal für internationale Schulen und mehrsprachige Klassenzimmer.

Auch die Bildinhalte sind mehrsprachig. Buchstaben lernen gelingt in jeder Sprache. Wählen Sie deutsche Bildnamen für Deutsch Arbeitsblätter. Oder englische Namen für den Fremdsprachenunterricht. Die Bildkategorien bleiben konsistent über alle Sprachen. Perfekt für DaZ-Unterricht und Sprachförderung.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Schwungübungen und Ausmalbilder kombinieren - POD Lizenz für kommerzielle Nutzung',
        description: `Das Vollzugriff Abonnement enthält eine kommerzielle Lizenz. Verkaufen Sie erstellte Arbeitsblätter auf Etsy oder Teachers Pay Teachers. Keine zusätzlichen Lizenzgebühren erforderlich. Die Ausmalbilder und Schwungübungen in der Bibliothek sind lizenzfrei. Auch für Amazon KDP Bücher geeignet.

Die 300 DPI Exportqualität erfüllt professionelle Druckstandards. Ihre Arbeitsblätter sehen gedruckt genauso gut aus wie am Bildschirm. Keine Qualitätsverluste bei Vergrößerung. Perfekt für Lehrer-Unternehmer mit eigenem Materialshop.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Rechnen lernen mit über 3000 Bildern aus der Bibliothek - Einmaleins und mehr',
        description: `Die Bildbibliothek umfasst über 3000 kindgerechte Illustrationen. Alle Bilder sind thematisch sortiert. Finden Sie schnell passende Motive für jedes Unterrichtsthema. Tiere, Fahrzeuge, Nahrungsmittel, Zahlen, Formen und vieles mehr. Auch Bilder zum Rechnen lernen und Einmaleins üben.

Hintergründe und Rahmen vervollständigen das Design. Wählen Sie aus verschiedenen Hintergrundthemen. Fügen Sie dekorative Rahmen hinzu. Passen Sie die Deckkraft nach Wunsch an. Jedes Arbeitsblatt wird zum visuellen Highlight. Die Suchfunktion findet Bilder nach Stichwort.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Malvorlagen und Rechnen 1. Klasse in professioneller 300 DPI Qualität exportieren',
        description: `Der Export bietet höchste Qualität für den Druck. 300 DPI garantieren scharfe Linien und klare Bilder. Wählen Sie zwischen PDF und JPEG Format. PDF eignet sich für mehrseitige Dokumente. JPEG ist ideal für digitale Verwendung. Malvorlagen sehen gedruckt perfekt aus.

Die Graustufen-Option spart Tinte und Toner. Aktivieren Sie sie vor dem Download. Das Arbeitsblatt wird automatisch in Schwarz-Weiß konvertiert. Ideal für Rechnen 1. Klasse Übungen ohne Farbdruck. Schüler können die Bilder später selbst ausmalen.

Ein separater Lösungsschlüssel ist verfügbar. Nach dem Erstellen des Arbeitsblatts können Sie die Lösung generieren. Die richtigen Antworten werden mit roten Kreisen markiert. Drucken Sie ihn für schnelles Korrigieren aus. Oder zeigen Sie ihn am Smartboard.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from was-passt-nicht.md
  howTo: {
    sectionTitle: 'So erstellen Sie Arbeitsblätter Grundschule in 5 einfachen Schritten - Kostenlose Arbeitsblätter Generator Anleitung',
    sectionDescription: 'Die Erstellung von Was passt nicht Arbeitsblättern dauert weniger als 3 Minuten. Keine Vorkenntnisse erforderlich. Folgen Sie dieser Schritt-für-Schritt-Anleitung. Am Ende haben Sie ein professionelles Arbeitsblatt zum Ausdrucken. Diese Anleitung gilt für alle Arbeitsblätter Grundschule und Vorschule Arbeitsblätter.',
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
        icon: '🖼️',
        title: 'Schritt 1: Vorschule Arbeitsblätter Thema wählen - Mathe Arbeitsblätter oder Buchstaben lernen',
        description: `Öffnen Sie den Was passt nicht Generator in Ihrem Browser. Die Seitenleiste zeigt alle Einstellungen. Beginnen Sie mit der Themenwahl für Ihre Vorschule Arbeitsblätter. Das Dropdown-Menü bietet über 50 Kategorien. Wählen Sie Tiere für allgemeine Übungen. Oder Zahlen für Mathe Arbeitsblätter.

Für Buchstaben lernen wählen Sie das Alphabet-Thema. Die Bilder zeigen Buchstaben und passende Objekte. Ideal für den Anfangsunterricht. Sie können auch zwei verschiedene Themen kombinieren. Thema A für die gemeinsamen Bilder. Thema B für das abweichende Bild.

Die Bildvorschau zeigt verfügbare Motive. Scrollen Sie durch die Auswahl. Klicken Sie auf ein Bild zum Hinzufügen. Oder lassen Sie den Generator automatisch wählen. Die Zufallsauswahl sorgt für Abwechslung.`,
      },
      {
        id: '2',
        number: 2,
        icon: '⚙️',
        title: 'Schritt 2: Einmaleins und Rechnen lernen Einstellungen anpassen - Schwierigkeitsgrad wählen',
        description: `Wählen Sie die Anzahl der Übungen pro Blatt. Der Regler geht von 5 bis 10 Übungen. Weniger Übungen bedeuten größere Bilder. Mehr Übungen passen auf eine Seite. Für Einmaleins Übungen empfehlen wir 6-8 Aufgaben.

Wählen Sie den Modus für Ihre Rechnen lernen Arbeitsblätter. Der Identisch-Modus zeigt drei gleiche Bilder. Ein Bild weicht ab. Dieser Modus ist einfacher für jüngere Kinder. Der Ähnlich-Modus zeigt drei Bilder einer Kategorie. Das vierte stammt aus einer anderen Kategorie. Dieser Modus fördert Kategorisierung.

Sie können den Modus pro Übung anpassen. Mischen Sie beide Modi auf einem Blatt. Die ersten Übungen im Identisch-Modus. Die letzten im schwierigeren Ähnlich-Modus. So steigern Sie den Schwierigkeitsgrad schrittweise.

Aktivieren Sie das Namensfeld für Schülerarbeiten. Das Datumsfeld hilft bei der Organisation. Übungsnummern erleichtern die Besprechung im Unterricht. Alle Optionen sind mit einem Klick aktivierbar.`,
      },
      {
        id: '3',
        number: 3,
        icon: '✨',
        title: 'Schritt 3: Kostenlose Arbeitsblätter mit Schwungübungen erstellen - Generator starten',
        description: `Klicken Sie auf den Erstellen-Button oben rechts. Der Generator erstellt Ihr Arbeitsblatt sofort. Die Vorschau erscheint in der Mitte des Bildschirms. Prüfen Sie das Ergebnis auf der Leinwand. Jede Übung zeigt vier Bilder in einer Reihe.

Der Generator verhindert Bildwiederholungen automatisch. Kein Bild erscheint zweimal auf dem Arbeitsblatt. Die Positionen werden zufällig gemischt. Das abweichende Bild steht nicht immer an derselben Stelle. So können Schüler nicht nach Position raten.

Gefällt Ihnen das Ergebnis nicht? Klicken Sie erneut auf Erstellen. Der Generator wählt neue Bilder aus. Wiederholen Sie den Vorgang beliebig oft. Jedes Mal entsteht ein neues Arbeitsblatt. Perfekt für Schwungübungen und Konzentrationstraining.

Das Seitenformat ist anpassbar. Wählen Sie Hochformat oder Querformat. Letter oder A4 Größe verfügbar. Auch quadratische Formate für besondere Projekte. Eigene Maße sind ebenfalls möglich.`,
      },
      {
        id: '4',
        number: 4,
        icon: '✏️',
        title: 'Schritt 4: Deutsch Arbeitsblätter und Ausmalbilder auf der Leinwand bearbeiten',
        description: `Nach dem Erstellen können Sie alles anpassen. Klicken Sie auf ein Element zum Auswählen. Die Kontextleiste erscheint mit Bearbeitungsoptionen. Verschieben Sie Bilder per Drag-and-Drop. Vergrößern oder verkleinern Sie mit den Eckpunkten.

Fügen Sie Text hinzu für Deutsch Arbeitsblätter. Geben Sie Anweisungen oder Überschriften ein. Wählen Sie die passende Schriftart aus sechs Optionen. Passen Sie Größe und Farbe an. Textumrandungen verbessern die Lesbarkeit auf bunten Hintergründen.

Hintergründe und Rahmen verschönern das Design. Die Bibliothek bietet verschiedene Themen. Wählen Sie einen Hintergrund aus der Liste. Passen Sie die Deckkraft mit dem Regler an. Rahmen geben dem Arbeitsblatt einen professionellen Abschluss.

Für Ausmalbilder exportieren Sie in Graustufen. Die Schüler malen die Bilder selbst aus. Das spart Druckkosten und fördert Kreativität. Die Bilder behalten alle Details auch in Schwarz-Weiß.

Die Rückgängig-Funktion speichert bis zu 20 Schritte. Drücken Sie Strg+Z zum Zurückgehen. Strg+Y stellt Änderungen wieder her. Experimentieren Sie ohne Risiko. Jede Änderung ist korrigierbar.`,
      },
      {
        id: '5',
        number: 5,
        icon: '📥',
        title: 'Schritt 5: Malvorlagen und Rechnen 1. Klasse Arbeitsblätter herunterladen und drucken',
        description: `Der Download-Button öffnet ein Menü mit Optionen. Wählen Sie das gewünschte Format. JPEG für einzelne Bilder. PDF für Dokumente zum Drucken. Beide Formate sind in 300 DPI Qualität.

Für Malvorlagen aktivieren Sie die Graustufen-Option. Das Arbeitsblatt wird automatisch konvertiert. Ideal für Rechnen 1. Klasse Übungen ohne Farbdruck. Die Schüler können anschließend ausmalen.

Der Lösungsschlüssel ist separat verfügbar. Generieren Sie ihn nach dem Arbeitsblatt. Rote Kreise markieren die richtigen Antworten. Drucken Sie ihn für die eigene Korrektur. Oder zeigen Sie ihn am Whiteboard.

Speichern Sie die Datei auf Ihrem Computer. Drucken Sie direkt aus dem Browser. Oder senden Sie das PDF an einen Kopierer. Die Qualität bleibt bei jeder Vergrößerung erhalten.`,
      },
    ],
  },

  // Use Cases Section - FULL text from was-passt-nicht.md
  useCases: {
    sectionTitle: 'Wer nutzt den Was passt nicht Generator - Arbeitsblätter Grundschule für Lehrkräfte und Eltern',
    sectionDescription: 'Der Was passt nicht Generator eignet sich für verschiedene Nutzergruppen. Von Erziehern bis zu Eltern profitieren alle von schneller Arbeitsblatterstellung. Hier zeigen wir, wie unterschiedliche Gruppen den Generator einsetzen. Jede Zielgruppe findet passende Funktionen für ihre Bedürfnisse.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher und Kindergartenpädagogen',
        subtitle: 'Vorschule Arbeitsblätter für Buchstaben lernen vorbereiten',
        description: `Erzieher in Kindergärten und Vorschulen nutzen Was passt nicht Übungen täglich. Die Arbeitsblätter fördern visuelle Wahrnehmung bei den Kleinsten. Kinder lernen, Unterschiede zu erkennen und zu benennen. Diese Fähigkeit ist grundlegend für Buchstaben lernen später.

Der Identisch-Modus ist ideal für Vorschulkinder. Drei gleiche Bilder und ein abweichendes. Die Aufgabe ist klar und altersgerecht. Wählen Sie einfache Themen wie Tiere oder Früchte. Die großen, bunten Bilder sprechen Kinder an.

Personalisierte Vorschule Arbeitsblätter sind schnell erstellt. Laden Sie Fotos aus dem Kindergartenalltag hoch. Die Kinder erkennen sich selbst und ihre Umgebung wieder. Das steigert Motivation und Lernfreude erheblich.`,
        quote: 'Meine Vorschulkinder lieben die bunten Was passt nicht Übungen!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lehrkräfte der 1. Klasse bis 3. Klasse',
        subtitle: 'Arbeitsblätter Grundschule und Mathe Arbeitsblätter ergänzen',
        description: `Grundschullehrkräfte setzen Was passt nicht als Konzentrationstraining ein. Nach anstrengenden Mathe Arbeitsblättern bieten die Übungen Abwechslung. Die Schüler bleiben fokussiert ohne Überforderung. Perfekt für Übergänge zwischen Unterrichtseinheiten.

In der 1. Klasse beginnen Kinder mit dem Identisch-Modus. Ab der 2. Klasse steigern Sie zum Ähnlich-Modus. Die 3. Klasse bearbeitet komplexere Kategorisierungsaufgaben. Der Generator wächst mit den Fähigkeiten der Schüler.

Fächerübergreifendes Lernen gelingt mühelos. Erstellen Sie Arbeitsblätter Grundschule passend zum Sachunterricht. Themen wie Jahreszeiten, Berufe oder Verkehrsmittel sind verfügbar. Die Schüler festigen Wortschatz und Kategoriewissen gleichzeitig.`,
        quote: 'Ich erstelle differenzierte Arbeitsblätter für alle meine Gruppen in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern',
        subtitle: 'Kostenlose Arbeitsblätter für Einmaleins und Schwungübungen zu Hause',
        description: `Eltern, die ihre Kinder zu Hause unterrichten, schätzen die Flexibilität. Erstellen Sie kostenlose Arbeitsblätter passend zum aktuellen Lernstand. Keine starren Lehrpläne zwingen zu bestimmten Themen. Sie wählen selbst, was Ihr Kind gerade braucht.

Kombinieren Sie Was passt nicht mit anderen Übungen. Nach dem Einmaleins üben folgt eine visuelle Pause. Nach Schwungübungen trainieren die Kinder ihre Konzentration. Der Wechsel zwischen Aktivitäten hält die Motivation hoch.

Die Mehrsprachigkeit unterstützt bilinguale Familien. Erstellen Sie Arbeitsblätter in der Zweitsprache. Kinder lernen Vokabeln durch Bildkategorisierung. Deutsch, Englisch, Französisch und acht weitere Sprachen stehen bereit.`,
        quote: 'Ein Werkzeug deckt alle Altersstufen meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'DaZ-Lehrkräfte und Sprachförderkräfte',
        subtitle: 'Deutsch Arbeitsblätter für Rechnen lernen mehrsprachig',
        description: `DaZ-Lehrkräfte finden ideale Werkzeuge für den Sprachunterricht. Was passt nicht Übungen vermitteln Wortschatz ohne Textlastigkeit. Die Bilder sprechen für sich. Kinder verstehen die Aufgabe auch mit wenig Deutschkenntnissen.

Wählen Sie Themen passend zum Wortschatzaufbau. Diese Woche Lebensmittel, nächste Woche Kleidung. Die Kategorisierung festigt Oberbegriffe. Deutsch Arbeitsblätter werden spielerisch und motivierend. Auch Rechnen lernen gelingt mit Zahlenbildern mehrsprachig.

Die Bildnamen sind in 11 Sprachen verfügbar. Nutzen Sie die Muttersprache als Brücke. Zeigen Sie deutsche und muttersprachliche Bezeichnungen parallel. So gelingt der Wortschatztransfer schneller und nachhaltiger.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '♿',
        title: 'Förderschullehrkräfte',
        subtitle: 'Malvorlagen und Ausmalbilder für differenzierte Rechnen 1. Klasse Übungen',
        description: `Förderschullehrkräfte benötigen differenziertes Material. Der Generator bietet flexible Anpassungsmöglichkeiten. Reduzieren Sie die Übungsanzahl für kürzere Aufmerksamkeitsspannen. Vergrößern Sie die Bilder für bessere Erkennbarkeit.

Der Identisch-Modus eignet sich für basale Wahrnehmungsförderung. Schüler mit Lernschwierigkeiten profitieren von klaren Aufgaben. Die visuelle Unterscheidung trainiert grundlegende kognitive Fähigkeiten. Malvorlagen und Ausmalbilder in Graustufen bieten zusätzliche Beschäftigung.

Erstellen Sie Arbeitsblätter für Rechnen 1. Klasse mit visueller Unterstützung. Zahlenbilder helfen beim Mengenverständnis. Die Kategorisierung von Mengen fördert mathematisches Denken. Jedes Arbeitsblatt ist individuell anpassbar.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Förderbedarf erstellen.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Lehrer-Unternehmer',
        subtitle: 'Kostenlose Arbeitsblätter und Mathe Arbeitsblätter auf Etsy verkaufen',
        description: `Lehrkräfte mit eigenem Materialshop nutzen die kommerzielle Lizenz. Das Vollzugriff Abonnement für 240 Euro jährlich enthält alle Rechte. Verkaufen Sie erstellte Arbeitsblätter auf Teachers Pay Teachers. Oder listen Sie Ihre Mathe Arbeitsblätter auf Etsy.

Die 300 DPI Qualität erfüllt professionelle Druckstandards. Kunden erhalten hochwertige PDF-Dateien. Keine Qualitätsverluste bei Vergrößerung oder Ausdruck. Ihre Produkte sehen professionell aus und verkaufen sich besser.

Erstellen Sie thematische Pakete für höhere Verkaufspreise. Fünf Was passt nicht Arbeitsblätter zum Thema Tiere. Zehn kostenlose Arbeitsblätter für den Herbst. Saisonale Pakete verkaufen sich zu Schuljahresbeginn besonders gut. Der Generator spart Stunden an Designarbeit.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL text from was-passt-nicht.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Was passt nicht Arbeitsblättern - Kostenlose Arbeitsblätter und Vorschule Arbeitsblätter',
    sectionDescription: 'Hier beantworten wir die häufigsten Fragen zum Was passt nicht Generator. Von Preisen bis Funktionen finden Sie alle wichtigen Informationen. Bei weiteren Fragen steht unser Support-Team bereit.',
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
        question: 'Ist der Was passt nicht Generator für Mathe Arbeitsblätter und Einmaleins wirklich kostenlos?',
        answer: `Der Was passt nicht Generator erfordert ein Vollzugriff Abonnement für 240 Euro jährlich oder 25 Euro monatlich. Ihr Abonnement ermöglicht unbegrenzte Arbeitsblatterstellung ohne zusätzliche Kosten. Erstellen Sie beliebig viele Was passt nicht Übungen, Mathe Arbeitsblätter oder Einmaleins Materialien. Keine Gebühren pro Arbeitsblatt.

Das Vollzugriff Abonnement umfasst alle 33 Arbeitsblatt-Generatoren. Beide Abonnements beinhalten kommerzielle Lizenz, 11 Sprachen und 300 DPI Export.`,
      },
      {
        id: '2',
        question: 'Kann ich Schwungübungen und Buchstaben lernen Arbeitsblätter zu Hause drucken?',
        answer: `Alle erstellten Arbeitsblätter sind für den Heimdruck optimiert. Die PDF-Dateien drucken auf jedem Standarddrucker. Schwungübungen und Buchstaben lernen Materialien sehen auf normalem Kopierpapier professionell aus. Keine speziellen Drucker oder Papierformate erforderlich.

Die Graustufen-Option spart Tinte bei farbigen Motiven. Aktivieren Sie sie vor dem Download. Das Arbeitsblatt wird automatisch in Schwarz-Weiß umgewandelt. Perfekt für Schulen mit begrenztem Tintenbudget.`,
      },
      {
        id: '3',
        question: 'Brauche ich Design-Kenntnisse für Deutsch Arbeitsblätter und Rechnen lernen Übungen?',
        answer: `Keine Design-Erfahrung notwendig. Der Generator erstellt professionelle Layouts automatisch. Wählen Sie Thema und Anzahl der Übungen. Klicken Sie Erstellen. Deutsch Arbeitsblätter und Rechnen lernen Materialien erscheinen sofort fertig.

Die Bearbeitungsfunktionen sind intuitiv. Ziehen Sie Elemente mit der Maus. Vergrößern mit den Eckpunkten. Löschen mit einem Klick. Auch ohne technische Vorkenntnisse erstellen Sie in Minuten professionelle Arbeitsblätter.`,
      },
      {
        id: '4',
        question: 'Kann ich Was passt nicht Arbeitsblätter für Einmaleins im Unterricht verwenden?',
        answer: `Das Vollzugriff Abonnement erlaubt unbegrenzte Nutzung im Unterricht. Drucken Sie Arbeitsblätter für alle Schüler Ihrer Klasse. Verteilen Sie digitale Kopien über Lernplattformen. Keine zusätzlichen Klassenlizenzen erforderlich. Einmaleins Übungen und alle anderen Materialien sind abgedeckt.

Die Schüleranzahl ist nicht begrenzt. Ob 20 oder 200 Schüler, der Preis bleibt gleich. Schullizenzen für mehrere Lehrkräfte sind auf Anfrage verfügbar. Kontaktieren Sie den Support für Gruppenrabatte.`,
      },
      {
        id: '5',
        question: 'Welche Sprachen sind für Malvorlagen und Ausmalbilder Arbeitsblätter verfügbar?',
        answer: `Der Generator unterstützt 11 Sprachen vollständig. Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Die Benutzeroberfläche wechselt komplett in die gewählte Sprache. Malvorlagen und Ausmalbilder Beschriftungen passen sich an.

Die Bildnamen erscheinen in der gewählten Inhaltssprache. Wählen Sie deutsche Namen für den Deutschunterricht. Oder englische Namen für den Fremdsprachenunterricht. Die Kategorien bleiben über alle Sprachen konsistent.`,
      },
      {
        id: '6',
        question: 'Kann ich erstellte Schwungübungen und Mathe Arbeitsblätter verkaufen?',
        answer: `Das Vollzugriff Abonnement enthält eine vollständige kommerzielle Lizenz. Verkaufen Sie alle erstellten Materialien ohne zusätzliche Gebühren. Schwungübungen, Mathe Arbeitsblätter und Was passt nicht Übungen auf Etsy listen. Teachers Pay Teachers Shops bestücken. Amazon KDP Bücher veröffentlichen.

Die 300 DPI Qualität erfüllt professionelle Druckstandards. Ihre Kunden erhalten hochwertige Produkte. Keine Namensnennung oder Attribution erforderlich. Die Materialien gehören vollständig Ihnen.`,
      },
      {
        id: '7',
        question: 'Wie passe ich Buchstaben lernen und Rechnen 1. Klasse Arbeitsblätter für meine Schüler an?',
        answer: `Jedes Element auf dem Arbeitsblatt ist bearbeitbar. Nach dem Erstellen klicken Sie auf beliebige Objekte. Verschieben Sie Bilder an neue Positionen. Ändern Sie die Größe für bessere Sichtbarkeit. Buchstaben lernen und Rechnen 1. Klasse Materialien werden individuell anpassbar.

Fügen Sie eigene Texte und Anweisungen hinzu. Wählen Sie aus sechs kindgerechten Schriftarten. Passen Sie Farben an Ihr Klassenthema an. Laden Sie eigene Bilder für personalisierte Arbeitsblätter hoch.`,
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Vorschule Arbeitsblätter und Deutsch Arbeitsblätter?',
        answer: `Was passt nicht Übungen eignen sich für Kinder ab 3 Jahren. Vorschule Arbeitsblätter im Identisch-Modus sind ideal für die Jüngsten. Der Ähnlich-Modus fordert ältere Kinder ab 5 Jahren. Deutsch Arbeitsblätter unterstützen den Spracherwerb in allen Altersstufen.

Die Grundschule nutzt beide Modi je nach Klassenstufe. 1. Klasse beginnt mit einfachen Aufgaben. 2. und 3. Klasse bearbeitet komplexere Kategorisierungen. Der Generator wächst mit den Fähigkeiten der Schüler.`,
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder für Einmaleins und Kostenlose Arbeitsblätter hochladen?',
        answer: `Der Multi-Upload unterstützt alle gängigen Bildformate. JPEG, PNG und GIF funktionieren problemlos. Laden Sie Klassenfotos oder thematische Bilder hoch. Kombinieren Sie mit der Bibliothek für Einmaleins und kostenlose Arbeitsblätter Varianten.

Die hochgeladenen Bilder erscheinen in der Vorschau. Ziehen Sie sie in Ihre Übungen. Die Qualität bleibt beim Export erhalten. Personalisierte Arbeitsblätter motivieren Schüler besonders.`,
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Ausmalbilder und Rechnen lernen Arbeitsblättern?',
        answer: `Die Erstellung dauert unter 3 Minuten pro Arbeitsblatt. Thema wählen, Einstellungen anpassen, Erstellen klicken. Ausmalbilder und Rechnen lernen Materialien erscheinen sofort. Die Bearbeitung nimmt je nach Umfang weitere Minuten.

Der Download erfolgt in Sekunden. PDF und JPEG stehen zur Auswahl. Drucken Sie direkt aus dem Browser. Oder speichern Sie auf Ihrem Computer für späteren Druck.`,
      },
      {
        id: '11',
        question: 'Gibt es einen Lösungsschlüssel für Mathe Arbeitsblätter und Malvorlagen?',
        answer: `Nach dem Erstellen des Arbeitsblatts können Sie den Lösungsschlüssel generieren. Rote Kreise markieren die richtigen Antworten. Der Lösungsschlüssel hat das identische Layout. Mathe Arbeitsblätter und Malvorlagen Lösungen sind separat druckbar.

Zeigen Sie die Lösung am Smartboard für gemeinsame Besprechung. Oder drucken Sie für die eigene Korrektur. Die Markierungen sind deutlich und eindeutig.`,
      },
      {
        id: '12',
        question: 'Kann ich Was passt nicht mit Schwungübungen und Deutsch Arbeitsblätter zu Unterrichtsthemen erstellen?',
        answer: `Über 50 Bildthemen stehen zur Auswahl. Tiere, Fahrzeuge, Nahrungsmittel, Berufe, Jahreszeiten und mehr. Wählen Sie passend zu Ihrem aktuellen Unterrichtsthema. Schwungübungen und Deutsch Arbeitsblätter ergänzen sich thematisch.

Die Suchfunktion findet spezifische Bilder. Geben Sie Stichwörter ein wie "Herbst" oder "Bauernhof". Die Ergebnisse filtern die Bibliothek. So erstellen Sie thematisch abgestimmte Arbeitsblätter für jede Unterrichtseinheit.`,
      },
    ],
  },

  // Related Apps Section - FULL text from was-passt-nicht.md
  relatedApps: {
    sectionTitle: 'Was passt nicht kombinieren mit anderen Generatoren - Einmaleins, Schwungübungen und Buchstaben lernen Pakete',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Was passt nicht mit anderen Apps für komplette Lernpakete. Thematische Einheiten über mehrere Arbeitsblatttypen hinweg. Hier zeigen wir die besten Kombinationen für Ihren Unterricht.',
    ctaTitle: 'Bereit für professionelle Was passt nicht Arbeitsblätter?',
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
        slug: 'matching-app',
        name: 'Zuordnungsübungen',
        category: 'Visuelles Lernen',
        icon: '🔗',
        description: 'Kombinieren Sie Was passt nicht mit Zuordnungsaktivitäten für umfassende visuelle Unterscheidungsübungen.',
      },
      {
        id: '2',
        slug: 'find-objects',
        name: 'Objekte Finden',
        category: 'Visuelles Lernen',
        icon: '🔍',
        description: 'Verbinden Sie Was passt nicht Arbeitsblätter mit Objektsuche-Aktivitäten für visuelles Scannen.',
      },
      {
        id: '3',
        slug: 'picture-sort',
        name: 'Bilder Sortieren',
        category: 'Logik',
        icon: '📊',
        description: 'Erstellen Sie komplette Kategorisierungseinheiten durch Kombination von Was passt nicht mit Sortierarbeitsblättern.',
      },
      {
        id: '4',
        slug: 'missing-pieces',
        name: 'Fehlende Teile',
        category: 'Logik',
        icon: '🧩',
        description: 'Bündeln Sie Was passt nicht mit Fehlende-Teile-Arbeitsblättern für visuelle Analysefähigkeiten.',
      },
      {
        id: '5',
        slug: 'pattern-worksheet',
        name: 'Muster-Arbeitsblätter',
        category: 'Logik',
        icon: '🔢',
        description: 'Kombinieren Sie Was passt nicht mit Mustererkennung für kritisches Denken und Sequenzidentifikation.',
      },
      {
        id: '6',
        slug: 'big-small-app',
        name: 'Groß und Klein',
        category: 'Visuelles Lernen',
        icon: '📐',
        description: 'Erstellen Sie komplette Vergleichseinheiten mit Was passt nicht und Größenvergleichsarbeitsblättern.',
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

export default oddOneOutDeContent;
