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
    title: 'Wörter Raten Arbeitsblätter Kostenlos | Generator für Grundschule',
    description: 'Wörter Raten Arbeitsblätter in 3 Minuten erstellen. Worträtsel mit Bildhinweisen für Vorschule & Grundschule. 3000+ Bilder, 300 DPI. Jetzt kostenlos testen!',
    keywords: 'wörter raten arbeitsblätter, worträtsel arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, deutsch arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/word-guess/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Wörter Raten Arbeitsblatt - Kostenloses Arbeitsblatt für Buchstaben lernen in der Grundschule',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/word-guess/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Worträtsel Kostenlose Druckvorlagen - Deutsch Arbeitsblätter für Vorschule',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/word-guess/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Wörter Raten Arbeitsblatt für Kinder - Wortschatz spielerisch erweitern',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/word-guess/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Worträtsel Arbeitsblatt für Vorschule - Buchstaben und Bilder kombinieren',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/german/word-guess/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Wörter Raten Kostenloses Arbeitsblatt - Leseverständnis und Schreibübungen',
      },
    ],
  },

  // Hero Section - FULL text from woerter-raten.md
  hero: {
    title: 'Worträtsel-Generator',
    subtitle: 'Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
    description: `Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Vollzugriff Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.

Kinder lieben Rätsel. Worträtsel mit Bildhinweisen verbinden Spaß mit Lernen. Ein Bild zeigt einen Gegenstand. Daneben stehen leere Kästchen für jeden Buchstaben. Die Kinder erraten das Wort und schreiben es auf.

Der Worträtsel-Generator erstellt Arbeitsblätter für die Grundschule in Sekunden. Wählen Sie Bilder aus über 3.000 kindgerechten Motiven. Das System extrahiert automatisch die Wörter. Sie können die Wörter auch manuell anpassen.`,
    previewImageSrc: '/samples/german/word-guess/sample-1.jpeg',
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

  // Features Grid - FULL text from woerter-raten.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from woerter-raten.md
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
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
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Worträtsel-Generator ist für viele Zielgruppen konzipiert. Lehrkräfte, Eltern und Therapeuten nutzen das Tool täglich. Jede Gruppe hat unterschiedliche Anforderungen. Unser Generator erfüllt sie alle.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from woerter-raten.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Hier finden Sie Antworten auf die häufigsten Fragen zum Worträtsel-Generator. Wir erklären alles von der Anmeldung bis zum Verkauf Ihrer Materialien.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Zahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Related Apps Section - FULL text from woerter-raten.md
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Der Worträtsel-Generator ist Teil eines umfassenden Systems. 33 Worksheet-Generatoren arbeiten zusammen. Erstellen Sie komplette Lernpakete zu jedem Thema. Alle Apps nutzen die gleiche Bildbibliothek.',
    ctaTitle: 'Bereit für professionelle Worträtsel-Arbeitsblätter?',
    ctaDescription: 'Schließen Sie sich tausenden Pädagogen an, die professionelle Arbeitsblätter in Minuten erstellen.',
    primaryCtaText: 'Kostenlos Testen',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert Perfekt Mit',
    exploreText: 'Alle Apps entdecken',
    trustBadges: {
      securePayment: 'Sichere Zahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [], // Samples loaded dynamically from content manager
    
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

export default wordGuessDeContent;
