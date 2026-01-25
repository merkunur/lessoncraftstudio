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
    description: 'Muster-Zug Arbeitsblätter in 3 Minuten erstellen. 5 Mustertypen, 3000+ Bilder, 300 DPI. Perfekt für Vorschule und Grundschule. Jetzt testen! Perfekt für Lehrer und Eltern.',
    keywords: 'muster zug arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
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

  // Features Grid - FULL text from muster-zug.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from muster-zug.md
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
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
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Muster-Zug Generator wurde für verschiedene pädagogische Kontexte entwickelt. Von der Vorschule bis zur dritten Klasse finden Pädagogen passende Einsatzmöglichkeiten. Auch Eltern und Therapeuten profitieren von diesem Werkzeug. Entdecken Sie, wie unterschiedliche Nutzergruppen den Generator einsetzen.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from muster-zug.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Hier finden Sie Antworten auf die häufigsten Fragen zum Muster-Zug Generator. Von Kosten über Funktionen bis zu pädagogischen Einsatzmöglichkeiten. Diese Informationen helfen bei Ihrer Entscheidung für professionelle Arbeitsblätter.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Zahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Related Apps Section - FULL text from muster-zug.md
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
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

export default patternTrainDeContent;
