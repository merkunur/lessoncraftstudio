import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/word-search-worksheets.ts
 * URL: /de/apps/suchsel-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/wordsearch.md
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

export const wordSearchDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchsel-arbeitsblaetter',
    appId: 'wordsearch',
    title: 'Suchsel Generator | Kostenlose Arbeitsblätter Grundschule erstellen',
    description: 'Erstellen Sie kostenlose Suchsel-Arbeitsblätter für die Grundschule in 3 Minuten. Perfekt zum Buchstaben lernen. PDF-Download sofort. 11 Sprachen verfügbar.',
    keywords: 'suchsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/wordsearch/sample-1.jpeg',
        width: 3672,
        height: 4752,
        caption: 'Kostenloses Suchsel Arbeitsblatt Grundschule - Wortschatz Übungen mit bunten Bildern für Kinder'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/wordsearch/sample-2.jpeg',
        width: 3672,
        height: 4752,
        caption: 'Suchsel Generator Arbeitsblatt - Buchstaben lernen und Deutsch-Arbeitsblätter für die Vorschule'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/wordsearch/sample-3.jpeg',
        width: 3672,
        height: 4752,
        caption: 'Kostenlose Druckvorlagen Wortsuchrätsel - Arbeitsblatt für Kinder mit thematischen Bildern'
      }
    ],
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Suchsel Generator',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Buchstaben lernen und Deutsch-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen, Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter. Der Suchsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse bis 3. Klasse.

Mit dem Suchsel Generator erstellen Sie in weniger als 3 Minuten druckfertige Arbeitsblätter Grundschule. Der Generator kombiniert spielerisch Buchstaben lernen mit Wortschatzübungen. Laden Sie fertige Suchsel als PDF oder JPEG herunter. Jedes Arbeitsblatt kann individuell angepasst werden.

Unser kostenloser Suchsel Generator bietet über 3000 kindgerechte Bilder für Arbeitsblätter Grundschule. Erstellen Sie thematische Suchsel für Mathe-Arbeitsblätter, Deutsch-Arbeitsblätter oder Vorschul-Arbeitsblätter. Der Generator funktioniert in 11 Sprachen und ist ideal für mehrsprachigen Unterricht geeignet.`,
    previewImageSrc: '/samples/german/wordsearch/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/german/wordsearch/
  samples: {
    sectionTitle: 'Suchsel Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/german/wordsearch/sample-1.jpeg',
        answerKeySrc: '/samples/german/wordsearch/sample-1-answer.jpeg',
        altText: 'Suchsel Arbeitsblätter kostenlos - Wortsuchrätsel im Hochformat für Grundschule und Buchstaben lernen mit Bildern',
        pdfDownloadUrl: '/samples/german/wordsearch/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/german/wordsearch/sample-2.jpeg',
        answerKeySrc: '/samples/german/wordsearch/sample-2-answer.jpeg',
        altText: 'Kostenlose Arbeitsblätter Suchsel Generator - Deutsch-Arbeitsblätter mit bunten thematischen Bildern für Kinder',
        pdfDownloadUrl: '/samples/german/wordsearch/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/german/wordsearch/sample-3.jpeg',
        answerKeySrc: '/samples/german/wordsearch/sample-3-answer.jpeg',
        altText: 'Wortsuchrätsel Arbeitsblatt für Vorschule - kostenlose Druckvorlagen zum Buchstaben lernen und Wortschatz üben',
        pdfDownloadUrl: '/samples/german/wordsearch/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/german/wordsearch/sample-4.jpeg',
        answerKeySrc: '/samples/german/wordsearch/sample-4-answer.jpeg',
        altText: 'Suchsel Grundschule Arbeitsblatt für Kinder - Vorschul-Arbeitsblätter mit kindgerechten Bildhinweisen kostenlos',
        pdfDownloadUrl: '/samples/german/wordsearch/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/german/wordsearch/sample-5.jpeg',
        answerKeySrc: '/samples/german/wordsearch/sample-5-answer.jpeg',
        altText: 'Kostenloses Arbeitsblatt Suchsel - Deutsch-Arbeitsblätter Wortschatzübungen für 1. Klasse bis 3. Klasse Grundschule',
        pdfDownloadUrl: '/samples/german/wordsearch/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Funktionen des Suchsel Generators - Kostenlose Arbeitsblätter Grundschule für Buchstaben lernen',
    sectionDescription: 'Der Suchsel Generator bietet alle wichtigen Funktionen für kostenlose Arbeitsblätter Grundschule. Erstellen Sie professionelle Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter in wenigen Minuten. Jede Funktion wurde speziell für Lehrkräfte entwickelt.',
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
        title: 'Suchsel erstellen in 3 Klicks - Kostenlose Arbeitsblätter Grundschule und Mathe-Arbeitsblätter',
        description: `Wählen Sie ein Thema aus. Der Generator wählt automatisch 8 passende Bilder. Klicken Sie auf Generieren. Ihr Suchsel-Arbeitsblatt ist fertig. Keine Design-Kenntnisse erforderlich.

Der kostenlose Generator erstellt sofort druckfertige Arbeitsblätter Grundschule. Perfekt für Buchstaben lernen in der Vorschule. Kombinieren Sie Suchsel mit Deutsch-Arbeitsblättern. Jedes Arbeitsblatt lädt in unter 3 Minuten herunter.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Vollständige Bearbeitung - Arbeitsblätter Grundschule individuell anpassen',
        description: `Jedes Element auf dem Arbeitsblatt ist bearbeitbar. Verschieben Sie Bilder per Drag & Drop. Drehen und skalieren Sie Objekte. Löschen Sie unerwünschte Elemente.

Passen Sie kostenlose Arbeitsblätter an Ihre Klasse an. Fügen Sie eigene Texte hinzu. Ändern Sie Schriftarten und Farben. Alle Änderungen werden sofort angezeigt.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen - Personalisierte Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter',
        description: `Laden Sie beliebig viele eigene Bilder hoch. Alle gängigen Formate werden unterstützt (JPEG, PNG, GIF). Kombinieren Sie eigene Bilder mit der Bildbibliothek. Erstellen Sie personalisierte Arbeitsblätter für Ihre Schüler.

Der Multi-Upload spart Zeit. Laden Sie mehrere Bilder gleichzeitig hoch. Perfekt für thematische Arbeitsblätter Grundschule. Ihre hochgeladenen Bilder bleiben während der Sitzung verfügbar.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprachen - Mehrsprachige Arbeitsblätter Grundschule für Buchstaben lernen',
        description: `Der Suchsel Generator unterstützt 11 Sprachen. Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch und Finnisch. Die Bildnamen erscheinen automatisch in der gewählten Sprache.

Erstellen Sie mehrsprachige Deutsch-Arbeitsblätter. Ideal für DaZ-Unterricht und Fremdsprachen. Die Sprachauswahl ändert die Wörter im Suchsel. Perfekt für kostenlose Arbeitsblätter in mehrsprachigen Klassen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📐',
        title: 'Gittergrößen anpassen - Kostenlose Arbeitsblätter für alle Klassenstufen',
        description: `Wählen Sie die Rastergröße von 5×5 bis 30×30. Kleinere Raster für Vorschul-Arbeitsblätter. Größere Raster für fortgeschrittene Schüler. Die Schwierigkeit passt sich automatisch an.

Diagonale Wörter können aktiviert oder deaktiviert werden. Rückwärts geschriebene Wörter sind optional. Jedes Suchsel-Arbeitsblatt kann individuell konfiguriert werden. Perfekt für differenzierte Arbeitsblätter Grundschule.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder - Thematische Arbeitsblätter Grundschule und Mathe-Arbeitsblätter',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Bilder. Organisiert nach Themen wie Tiere, Fahrzeuge, Essen, Natur. Durchsuchen Sie Bilder nach Kategorien. Oder nutzen Sie die Suchfunktion.

Erstellen Sie thematische kostenlose Arbeitsblätter. Kombinieren Sie Buchstaben lernen mit Sachunterricht. Jedes Bild ist hochauflösend und druckfertig. Neue Bilder werden regelmäßig hinzugefügt.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle Qualität - Druckfertige Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter',
        description: `Exportieren Sie Arbeitsblätter in 300 DPI Auflösung. Perfekt für den Druck. PDF und JPEG Formate verfügbar. Graustufen-Option spart Druckertinte.

Jedes Arbeitsblatt sieht professionell aus. Klare, scharfe Bilder. Lesbare Schrift. Die Qualität ist ideal für kostenlose Arbeitsblätter Grundschule. Drucken Sie unbegrenzt viele Kopien.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Suchsel erstellen in 5 einfachen Schritten - Kostenlose Arbeitsblätter Grundschule und Buchstaben lernen',
    sectionDescription: 'Erstellen Sie professionelle Arbeitsblätter Grundschule in unter 3 Minuten. Folgen Sie diesen 5 einfachen Schritten. Kein Design-Wissen erforderlich. Perfekt für Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter.',
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
        title: 'Thema wählen - Kostenlose Arbeitsblätter Grundschule und Mathe-Arbeitsblätter erstellen',
        description: `Wählen Sie ein Thema aus der Dropdown-Liste. Über 50 Themen verfügbar. Tiere, Fahrzeuge, Essen, Natur und mehr. Oder wählen Sie "Zufälliges Thema" für Abwechslung.

Der Generator wählt automatisch 8 passende Bilder aus dem Thema. Ideal für thematische Arbeitsblätter Grundschule. Kombinieren Sie Buchstaben lernen mit Sachunterricht. Die Bildauswahl erfolgt sofort.

Alternativ können Sie einzelne Bilder manuell auswählen. Durchsuchen Sie die Bildbibliothek. Nutzen Sie die Suchfunktion für spezifische Wörter. Perfekt für personalisierte Deutsch-Arbeitsblätter und Vorschul-Arbeitsblätter.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Einstellungen anpassen - Vorschul-Arbeitsblätter und Einmaleins Arbeitsblätter',
        description: `Wählen Sie die Rastergröße. 5×5 für Vorschul-Arbeitsblätter. 12×12 für die 1. Klasse. 20×20 für fortgeschrittene Schüler. Die Schwierigkeit passt sich an.

Aktivieren Sie diagonale Wörter für mehr Herausforderung. Deaktivieren Sie sie für einfachere kostenlose Arbeitsblätter. Rückwärts geschriebene Wörter sind optional. Jede Einstellung ändert die Schwierigkeit.

Wählen Sie Ihr Seitenformat. A4 oder Letter. Hochformat oder Querformat. Die Seitengröße beeinflusst die Lesbarkeit. Querformat eignet sich für größere Raster.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Suchsel generieren - Deutsch-Arbeitsblätter und Rechnen lernen 1. Klasse',
        description: `Klicken Sie auf "Generieren". Der Generator erstellt sofort Ihr Suchsel. Die Wörter werden automatisch im Raster platziert. Leere Felder werden mit Zufallsbuchstaben gefüllt.

Das Suchsel-Arbeitsblatt erscheint auf der Arbeitsfläche. Die Wortliste wird automatisch erstellt. Bilder oder Wörter erscheinen neben dem Raster. Alles ist sofort sichtbar.

Ein Lösungsblatt wird automatisch generiert. Die Wörter sind farblich markiert. Perfekt für schnelle Korrektur. Wechseln Sie zwischen Arbeitsblatt und Lösungsblatt mit einem Klick.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Arbeitsblatt bearbeiten - Schwungübungen und Ausmalbilder hinzufügen',
        description: `Passen Sie das Arbeitsblatt an Ihre Bedürfnisse an. Verschieben Sie das Raster per Drag & Drop. Vergrößern oder verkleinern Sie Elemente. Drehen Sie Objekte nach Belieben.

Fügen Sie eigene Texte hinzu. Schreiben Sie Überschriften oder Anweisungen. Wählen Sie aus 7 kindgerechten Schriftarten. Ändern Sie Schriftgröße und Farbe nach Wunsch.

Laden Sie eigene Bilder hoch. Kombinieren Sie kostenlose Arbeitsblätter mit persönlichen Fotos. Fügen Sie Rahmen und Hintergründe hinzu. Jedes Element ist individuell anpassbar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Herunterladen und drucken - Kostenlose Arbeitsblätter Grundschule und Buchstaben lernen',
        description: `Klicken Sie auf "Herunterladen". Wählen Sie zwischen JPEG und PDF. Beide Formate sind druckfertig. 300 DPI Qualität garantiert scharfe Ausdrucke.

Aktivieren Sie die Graustufen-Option. Spart Druckertinte bei farbigen Bildern. Ideal für große Klassensätze. Die Qualität bleibt erhalten.

Laden Sie das Arbeitsblatt herunter. Laden Sie auch das Lösungsblatt herunter. Drucken Sie beliebig viele Kopien. Jedes Arbeitsblatt ist sofort einsatzbereit für Ihre Klasse.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter Grundschule für jeden Bedarf',
    sectionDescription: 'Der Suchsel Generator eignet sich für verschiedene Nutzergruppen. Erzieher in der Vorschule. Lehrkräfte an Grundschulen. Homeschooling-Eltern. DaZ-Lehrkräfte. Sonderpädagogen. Jeder profitiert von kostenlosen Arbeitsblättern.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in Vorschule und Kindergarten',
        subtitle: 'Vorschul-Arbeitsblätter und Buchstaben lernen',
        description: `Vorschulkinder lernen spielerisch Buchstaben. Verwenden Sie kleine Raster (5×5 oder 8×8). Wählen Sie einfache Themen wie Tiere oder Farben. Die Bildnamen sind kurz und kindgerecht.

Erstellen Sie Vorschul-Arbeitsblätter für die Vorschulgruppe. Kombinieren Sie Buchstaben lernen mit Bildzuordnung. Deaktivieren Sie diagonale Wörter für Anfänger. Die Kinder können die Bilder auch ausmalen.

Nutzen Sie thematische kostenlose Arbeitsblätter für Projekte. Jahreszeiten, Feste, Berufe. Jedes Thema unterstützt den Wortschatzerwerb. Die großen Bilder helfen bei der Worterkennung.`,
        quote: 'Meine Kinder lieben die bunten Suchsel mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrkräfte 1. bis 3. Klasse',
        subtitle: 'Deutsch-Arbeitsblätter und Mathe-Arbeitsblätter',
        description: `Lehrkräfte in der 1. Klasse nutzen Suchsel für Rechtschreibung. Wählen Sie Wörter aus dem aktuellen Lehrplan. Erstellen Sie wöchentliche Arbeitsblätter Grundschule für Rechtschreibübungen. Die Schüler lernen Wörter visuell einprägen.

In der 2. und 3. Klasse werden Suchsel schwieriger. Aktivieren Sie diagonale Wörter. Verwenden Sie größere Raster (15×15 oder 20×20). Kombinieren Sie Deutsch-Arbeitsblätter mit Sachunterricht-Themen.

Erstellen Sie differenzierte Mathe-Arbeitsblätter für verschiedene Leistungsniveaus. Leistungsstarke Schüler erhalten komplexere Rätsel. Schwächere Schüler bekommen einfachere Versionen. Alle arbeiten am gleichen Thema.`,
        quote: 'Suchsel sind perfekt für differenzierten Unterricht.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschooling-Eltern',
        subtitle: 'Kostenlose Arbeitsblätter für individuelles Lernen',
        description: `Homeschooling-Eltern schätzen kostenlose Arbeitsblätter. Keine Abonnement-Kosten für Basis-Nutzung. Erstellen Sie unbegrenzt viele Suchsel. Passen Sie Arbeitsblätter an Ihr Kind an.

Nutzen Sie den Generator für mehrere Kinder. Erstellen Sie altersgerechte Vorschul-Arbeitsblätter für Vorschulkinder. Schwierigere Deutsch-Arbeitsblätter für ältere Geschwister. Jedes Kind lernt auf seinem Niveau.

Kombinieren Sie Suchsel mit anderen Lernaktivitäten. Verwenden Sie gefundene Wörter für Schreibübungen. Lassen Sie Kinder eigene Sätze bilden. Der Generator unterstützt ganzheitliches Lernen.`,
        quote: 'Ein Werkzeug deckt alle Klassenstufen meiner Kinder ab.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ und Fremdsprachenlehrkräfte',
        subtitle: 'Mehrsprachige Deutsch-Arbeitsblätter',
        description: `DaZ-Lehrkräfte nutzen die 11-Sprachen-Funktion. Erstellen Sie Arbeitsblätter Grundschule in der Muttersprache. Wechseln Sie zur deutschen Version. Schüler sehen Verbindungen zwischen Sprachen.

Die Bilder funktionieren als visuelle Brücke. Kinder erkennen das Bild. Der deutsche Bildname wird automatisch angezeigt. Wortschatz wird ohne Übersetzung gelernt.

Erstellen Sie thematische Deutsch-Arbeitsblätter für DaZ-Unterricht. Alltag, Schule, Familie, Essen. Jedes Thema baut praktischen Wortschatz auf. Die Suchsel machen Sprachenlernen spielerisch.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Sonderpädagogen',
        subtitle: 'Angepasste Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule',
        description: `Sonderpädagogen passen Arbeitsblätter an individuelle Bedürfnisse an. Verwenden Sie sehr kleine Raster (5×5). Große Schrift für bessere Lesbarkeit. Nur horizontale und vertikale Wörter.

Die visuelle Unterstützung durch Bilder hilft allen Kindern. Besonders Kinder mit Leseschwäche. Die Bilder geben Hinweise auf die Wörter. Erfolgserlebnisse motivieren zum Weiterlernen.

Erstellen Sie kostenlose Arbeitsblätter für Förderstunden. Kleingruppen oder Einzelarbeit. Jedes Kind kann in seinem Tempo arbeiten. Der Generator macht Differenzierung einfach.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrkräfte-Unternehmer',
        subtitle: 'Verkaufen Sie Arbeitsblätter Grundschule',
        description: `Viele Lehrkräfte verkaufen Unterrichtsmaterialien online. Teachers Pay Teachers, Etsy, Eduki sind beliebte Plattformen. Mit einem Abonnement erhalten Sie eine kommerzielle Lizenz. Verkaufen Sie Ihre Suchsel-Arbeitsblätter.

Erstellen Sie thematische Pakete. 10 Suchsel zum Thema Tiere. 20 Deutsch-Arbeitsblätter für die 1. Klasse. Käufer lieben umfangreiche Ressourcen. Verdienen Sie passives Einkommen.

Die professionelle 300 DPI Qualität überzeugt Käufer. Scharfe Bilder und klare Schrift. Ihre Produkte sehen hochwertig aus. Positive Bewertungen steigern Ihre Verkäufe.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zu Suchsel und kostenlosen Arbeitsblättern Grundschule',
    sectionDescription: 'Lehrkräfte haben viele Fragen zum Suchsel Generator. Hier beantworten wir die wichtigsten Fragen. Von Einmaleins-Übungen bis Schwungübungen. Von Ausmalbildern bis Mathe-Arbeitsblättern.',
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
        question: 'Ist der Suchsel Generator wirklich kostenlos für Vorschul-Arbeitsblätter?',
        answer: 'Ja, der Suchsel Generator ist kostenlos nutzbar. Erstellen Sie unbegrenzt Vorschul-Arbeitsblätter. Die kostenlose Version enthält ein Wasserzeichen. Ideal für private Nutzung und Homeschooling. Die kostenlosen Arbeitsblätter können nicht kommerziell verkauft werden. Für kommerzielle Nutzung benötigen Sie ein Abonnement. Das Kernpaket kostet 144 € jährlich. Vollzugang kostet 240 € jährlich. Mit einem Abonnement entfällt das Wasserzeichen. Sie erhalten Zugang zu allen 33 Generatoren. Erstellen Sie Mathe-Arbeitsblätter, Einmaleins-Übungen, Schwungübungen und Ausmalbilder. Die kommerzielle Lizenz ist inklusive.',
      },
      {
        id: '2',
        question: 'Kann ich Suchsel-Arbeitsblätter auf einem normalen Drucker drucken für Rechnen lernen 1. Klasse?',
        answer: 'Ja, alle Arbeitsblätter funktionieren auf normalen Druckern. Die 300 DPI Auflösung garantiert scharfe Ausdrucke. Perfekt für Rechnen lernen in der 1. Klasse. Auch Vorschul-Arbeitsblätter drucken einwandfrei. Aktivieren Sie die Graustufen-Option für Tintenersparnis. Besonders hilfreich bei großen Klassensätzen. Ausmalbilder und Schwungübungen sehen auch in Graustufen gut aus. Verwenden Sie Standard-A4-Papier oder US Letter. Beide Formate werden unterstützt. Hochformat oder Querformat nach Wahl. Jedes Arbeitsblatt ist druckoptimiert.',
      },
      {
        id: '3',
        question: 'Brauche ich Design-Kenntnisse für Mathe-Arbeitsblätter und Einmaleins-Übungen?',
        answer: 'Nein, keine Design-Kenntnisse erforderlich. Der Generator ist für Lehrkräfte entwickelt. Erstellen Sie professionelle Mathe-Arbeitsblätter in 3 Minuten. Auch Einmaleins-Übungen und Schwungübungen entstehen automatisch. Wählen Sie einfach ein Thema. Der Generator erledigt den Rest. Die Arbeitsblätter Grundschule sehen sofort professionell aus. Keine Formatierung nötig. Fortgeschrittene Nutzer können alles individuell anpassen. Verschieben Sie Elemente per Drag & Drop. Ändern Sie Farben und Schriftarten. Aber die Standardeinstellungen funktionieren bereits perfekt.',
      },
      {
        id: '4',
        question: 'Kann ich Suchsel im Unterricht verwenden für Buchstaben lernen und Ausmalbilder?',
        answer: 'Ja, Suchsel eignen sich perfekt für Buchstaben lernen. Verwenden Sie sie für tägliche Rechtschreibübungen. Kombinieren Sie Suchsel mit Ausmalbildern für Abwechslung. Die Arbeitsblätter Grundschule motivieren Schüler. Alle Abonnements beinhalten unbegrenzte Klassennutzung. Drucken Sie so viele Kopien wie benötigt. Verteilen Sie Vorschul-Arbeitsblätter an alle Kinder. Keine Mengenbeschränkung. Nutzen Sie Suchsel für Vertretungsstunden. Oder als Belohnung nach schwierigen Aufgaben. Schwungübungen können als Aufwärmaktivität dienen. Jedes Arbeitsblatt hat pädagogischen Wert.',
      },
      {
        id: '5',
        question: 'Welche Sprachen sind verfügbar für Deutsch-Arbeitsblätter und Rechnen lernen 1. Klasse?',
        answer: 'Der Generator unterstützt 11 Sprachen. Deutsch, Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Niederländisch, Dänisch, Schwedisch, Norwegisch und Finnisch. Perfekt für mehrsprachige Deutsch-Arbeitsblätter. Die Sprachauswahl ändert die Bildnamen automatisch. Erstellen Sie Suchsel für Rechnen lernen in der 1. Klasse in jeder Sprache. Ideal für DaZ-Unterricht und Fremdsprachen. Wechseln Sie die Sprache mit einem Klick. Erstellen Sie das gleiche Suchsel in mehreren Sprachen. Vergleichen Sie Vokabeln zwischen Sprachen. Die 11-Sprachen-Funktion ist einzigartig.',
      },
      {
        id: '6',
        question: 'Kann ich selbst erstellte Suchsel verkaufen mit Einmaleins und Schwungübungen?',
        answer: 'Ja, mit einem Abonnement erhalten Sie kommerzielle Rechte. Verkaufen Sie Suchsel-Arbeitsblätter auf Teachers Pay Teachers. Verkaufen Sie Einmaleins-Hefte auf Etsy. Verkaufen Sie Schwungübungen-Mappen auf Eduki. Die Print-on-Demand-Lizenz ist im Abonnement enthalten. Keine zusätzlichen Kosten für kommerzielle Nutzung. Erstellen Sie Produkte für passives Einkommen. Viele Lehrkräfte verdienen 500-5000 € monatlich. Kombinieren Sie verschiedene Arbeitsblatt-Typen. Suchsel plus Ausmalbilder. Mathe-Arbeitsblätter plus Schwungübungen. Käufer schätzen umfangreiche Pakete. Die 300 DPI Qualität überzeugt Kunden.',
      },
      {
        id: '7',
        question: 'Wie passe ich Suchsel an meine Schüler an für Vorschul-Arbeitsblätter und Ausmalbilder?',
        answer: 'Passen Sie die Rastergröße an. Kleine Raster (5×5) für Vorschul-Arbeitsblätter. Große Raster (20×20) für ältere Schüler. Deaktivieren Sie diagonale Wörter für Anfänger. Fügen Sie eigene Bilder hinzu. Fotos Ihrer Schüler oder Klassentiere. Kombinieren Sie Suchsel mit Ausmalbildern aus dem gleichen Thema. Personalisierung steigert die Motivation. Ändern Sie Schriftgröße für bessere Lesbarkeit. Verwenden Sie große Schrift für Kinder mit Sehschwäche. Passen Sie Farben an Klassenzimmer-Themen an. Jedes Arbeitsblatt kann individualisiert werden.',
      },
      {
        id: '8',
        question: 'Für welche Altersgruppen eignen sich Suchsel-Arbeitsblätter mit Mathe-Arbeitsblättern?',
        answer: 'Suchsel funktionieren von Vorschule bis 3. Klasse. Vorschulkinder (5-6 Jahre) nutzen einfache 5×5 Raster. 1. Klasse (6-7 Jahre) bewältigt 8×8 bis 12×12 Raster. 2.-3. Klasse (7-9 Jahre) löst komplexere Rätsel. Kombinieren Sie Suchsel mit altersgerechten Mathe-Arbeitsblättern. Vorschüler zählen gefundene Wörter. 1. Klasse addiert Buchstaben-Werte. 2.-3. Klasse löst Einmaleins-Aufgaben mit gefundenen Zahlen. Passen Sie Schwierigkeit durch Rasteroptionen an. Nur horizontal/vertikal für Anfänger. Diagonal für Fortgeschrittene. Rückwärts geschrieben für Profis. Differenzierung ist einfach.',
      },
      {
        id: '9',
        question: 'Kann ich eigene Bilder hochladen für Schwungübungen und Rechnen lernen 1. Klasse?',
        answer: 'Ja, laden Sie beliebig viele eigene Bilder hoch. Alle Formate werden unterstützt (JPEG, PNG, GIF). Kombinieren Sie eigene Fotos mit Schwungübungen-Vorlagen. Perfekt für Rechnen lernen in der 1. Klasse. Der Multi-Upload spart Zeit. Laden Sie 10-20 Bilder gleichzeitig hoch. Verwenden Sie Klassenfotos für personalisierte Arbeitsblätter. Oder Bilder aus Schulprojekten. Hochgeladene Bilder bleiben während Ihrer Sitzung verfügbar. Verwenden Sie sie für mehrere Arbeitsblätter. Kombinieren Sie mit Vorschul-Arbeitsblättern und Ausmalbildern. Ihre Kreativität hat keine Grenzen.',
      },
      {
        id: '10',
        question: 'Wie lange dauert die Erstellung von Arbeitsblättern Grundschule mit Einmaleins?',
        answer: 'Die Erstellung dauert unter 3 Minuten. Wählen Sie ein Thema (30 Sekunden). Passen Sie Einstellungen an (30 Sekunden). Generieren Sie das Suchsel (10 Sekunden). Laden Sie das PDF herunter (30 Sekunden). Traditionelle Erstellung dauert 30-60 Minuten pro Arbeitsblatt. Der Generator spart 90% der Zeit. Erstellen Sie wöchentliche Arbeitsblätter Grundschule in 15 Minuten. Statt 5-6 Stunden traditionell. Nutzen Sie gespeicherte Vorlagen für noch schnellere Erstellung. Duplizieren Sie erfolgreiche Designs. Ändern Sie nur das Thema. Einmaleins-Arbeitsblätter entstehen in Sekunden.',
      },
      {
        id: '11',
        question: 'Enthalten Suchsel Lösungsblätter für Ausmalbilder und Vorschul-Arbeitsblätter?',
        answer: 'Ja, jedes Suchsel enthält automatisch ein Lösungsblatt. Die gefundenen Wörter sind farblich markiert. Perfekt für schnelle Korrektur. Auch Ausmalbilder können mit Lösungen kombiniert werden. Das Lösungsblatt wird gleichzeitig mit dem Arbeitsblatt generiert. Wechseln Sie mit einem Klick zwischen beiden Ansichten. Laden Sie beide als separate PDFs herunter. Oder drucken Sie beide gleichzeitig. Die farbige Markierung erleichtert die Korrektur. Schüler können selbst kontrollieren. Fördert selbstständiges Lernen. Besonders hilfreich bei Vorschul-Arbeitsblättern.',
      },
      {
        id: '12',
        question: 'Kann ich Suchsel zu spezifischen Schulthemen erstellen mit Mathe-Arbeitsblättern und Schwungübungen?',
        answer: 'Ja, wählen Sie aus über 50 Themen. Tiere, Natur, Fahrzeuge, Essen, Berufe, Jahreszeiten. Oder erstellen Sie eigene Wortlisten. Kombinieren Sie thematische Suchsel mit Mathe-Arbeitsblättern. Nutzen Sie Suchsel für Sachunterricht-Themen. Weltraum, Dinosaurier, Körper, Wetter. Integrieren Sie Schwungübungen zum gleichen Thema. Ganzheitliches Lernen wird gefördert. Erstellen Sie Suchsel zum aktuellen Lehrplan. Rechtschreibwörter der Woche. Einmaleins-Reihen als Zahlen-Suchsel. Fächerübergreifende Arbeitsblätter Grundschule entstehen mühelos.',
      },
    ],
  },

  // Pricing - Word Search is FREE but needs subscription for no-watermark/commercial
  pricing: {
    title: 'Vollzugang',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinieren Sie Suchsel mit anderen Generatoren - Ganzheitliche Arbeitsblätter Grundschule',
    sectionDescription: 'Mit einem Abonnement erhalten Sie Zugang zu 33 Generatoren. Kombinieren Sie verschiedene Arbeitsblatt-Typen für maximale Wirkung. Suchsel allein sind bereits wertvoll. In Kombination mit anderen Apps entsteht echter Mehrwert.',
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
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Kreuzworträtsel',
        category: 'Sprache',
        icon: '📝',
        description: 'Ergänzen Sie Suchsel mit Kreuzworträtseln zum gleichen Wortschatz für umfassendes Worttraining.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Buchstabensalat',
        category: 'Sprache',
        icon: '🔤',
        description: 'Kombinieren Sie Suchsel mit Buchstabensalat-Rätseln für Rechtschreibung und Wortschatz aus verschiedenen Blickwinkeln.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Wort-Raten',
        category: 'Sprache',
        icon: '❓',
        description: 'Fügen Sie Wort-Raten-Aktivitäten zu Ihren Lernstationen hinzu, zusammen mit Suchsel-Rätseln für abwechslungsreiches Üben.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogramm',
        category: 'Logik',
        icon: '🔐',
        description: 'Fordern Sie Schüler mit Code-Knacker-Rätseln heraus, die logisches Denken und Buchstabenmuster-Erkennung entwickeln.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Belohnen Sie fertige Suchsel mit thematischen Ausmalbildern, die die Feinmotorik entwickeln.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alphabet-Zug',
        category: 'Frühe Bildung',
        icon: '🚂',
        description: 'Ergänzen Sie Suchsel-Training mit Buchstabenerkennung-Aktivitäten für umfassendes Lesenlernen.',
      },
    ],
  },
};

export default wordSearchDeContent;
