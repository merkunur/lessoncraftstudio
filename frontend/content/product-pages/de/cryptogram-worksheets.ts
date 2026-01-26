import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Cryptogram Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/cryptogram-worksheets.ts
 * URL: /de/apps/bildkryptogramm-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/kryptogramm.md
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

export const cryptogramDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'bildkryptogramm-arbeitsblaetter',
    appId: 'cryptogram',
    title: 'Bilder-Kryptogramm Arbeitsblätter | Kostenlos Erstellen',
    description: 'Erstellen Sie professionelle Bilder-Kryptogramm Arbeitsblätter kostenlos. Perfekt für Grundschule und Vorschule. PDF in 3 Minuten herunterladen! Perfekt für Lehrer und Eltern.',
    keywords: 'bilder-kryptogramm, kryptogramm generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, deutsch arbeitsblätter, buchstaben lernen, mathe arbeitsblätter, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter',
      },

  // Hero Section - FULL text from kryptogramm.md
  hero: {
    title: 'Bildkryptogramm',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Generator für Vorschule Arbeitsblätter und Deutsch Arbeitsblätter',
    description: `Erstellen Sie professionelle Bilder-Kryptogramm Arbeitsblätter mit unserem Kryptogramm-Generator. Ihr Vollzugriff Abonnement ermöglicht unbegrenzte Arbeitsblatt-Erstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Kryptogramme perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Deutsch Arbeitsblätter. Laden Sie hochwertige PDF-Dateien in unter 3 Minuten herunter.

Bilder-Kryptogramme verwandeln Geheimschrift-Rätsel in visuelle Lernabenteuer. Jedes Kryptogramm nutzt Bilder anstelle von Buchstaben für geheime Codes. Schüler ordnen Bilder den Buchstaben zu und entschlüsseln versteckte Botschaften. Das kombiniert Buchstaben lernen Übungen mit kritischem Denken. Perfekt für Vorschule bis zur Grundschule.

Unser Kryptogramm-Generator erstellt individuelle Rätsel in 11 Sprachen. Laden Sie eigene Bilder hoch oder wählen Sie aus über 3000 kindgerechten Bildern. Jedes Kryptogramm wird als hochwertige PDF oder JPEG exportiert. Erstellen Sie Mathe Arbeitsblätter Verbindungen, Deutsch Arbeitsblätter Aktivitäten und Buchstaben lernen Übungen mit Bildcodes. Ihre Schüler werden begeistert diese kostenlose Arbeitsblätter lösen.`,
    previewImageSrc: '/samples/german/cryptogram/sample-1.jpeg',
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
        videoId: '9U0BIIjCnco',
        buttonText: 'Bildkryptogramm Funktionen',
        modalTitle: 'Bildkryptogramm Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
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

  // Features Grid - FULL text from kryptogramm.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Kostenlose Druckvorlagen und Arbeitsblatt für Vorschule',
    sectionDescription: 'Unser Bilder-Kryptogramm-Generator bietet alle professionellen Funktionen die Erzieher und Grundschullehrer benötigen. Erstellen Sie Deutsch Arbeitsblätter, Mathe Arbeitsblätter und Buchstaben lernen Aktivitäten mit visuellen Bildcodes. Jede Funktion wurde für schnelle Arbeitsblatt-Erstellung bei voller Bearbeitungskontrolle entwickelt.',
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

  // How-To Guide - FULL text from kryptogramm.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Folgen Sie diesen fünf einfachen Schritten um professionelle Bilder-Kryptogramme in unter 3 Minuten zu erstellen. Diese Anleitung zeigt Ihnen wie Sie kostenlose Arbeitsblätter perfekt für Deutsch Arbeitsblätter, Buchstaben lernen und Vorschule Arbeitsblätter erstellen.',
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
        title: 'Schritt 1: Bilder und Thema für Vorschule Arbeitsblätter auswählen - Buchstaben lernen und Deutsch Arbeitsblätter Inhalte',
        description: `Beginnen Sie mit der Auswahl eines Themas für Ihr Kryptogramm. Wählen Sie aus der Themenbibliothek oder wählen Sie individuelle Bilder. Die Themenauswahl funktioniert am besten für schnelle Vorschule Arbeitsblätter Erstellung. Die individuelle Auswahl gibt präzise Kontrolle über Ihre Arbeitsblätter Grundschule Inhalte.

Klicken Sie das Themen-Dropdown um alle verfügbaren Kategorien zu sehen. Wählen Sie Tiere für Sachkunde-Vokabular Kryptogramme. Nehmen Sie das Alphabet-Thema für fokussierte Buchstaben lernen Arbeitsblätter. Wählen Sie Essen für Ernährungs-Einheiten mit Deutsch Arbeitsblätter Integration. Die Themenauswahl zeigt sofort alle Bilder dieser Kategorie.

Für mehr Kontrolle über Ihre Mathe Arbeitsblätter oder Einmaleins Inhalte nutzen Sie die individuelle Bildauswahl. Durchsuchen Sie die Bildbibliothek mit über 3000 verfügbaren Bildern. Klicken Sie die Buchstaben-Buttons A bis Z. Weisen Sie jedem Buchstaben ein Bild zu. Diese Methode eignet sich perfekt für gezielte Schwungübungen oder spezifisches Vokabular.

Laden Sie eigene Bilder für personalisierte Vorschule Arbeitsblätter oder Arbeitsblätter Grundschule hoch. Klicken Sie den Upload-Button und wählen Sie mehrere Bilddateien von Ihrem Computer. Fügen Sie Fotos von Klassenzimmerobjekten für Schuljahresbeginn-Vokabular hinzu. Die Auto-Zuweisungsfunktion beschleunigt den Prozess erheblich für kostenlose Arbeitsblätter die schnell fertig sein müssen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Geheime Botschaft eingeben für Kostenlose Arbeitsblätter und Einmaleins Vokabular - Arbeitsblätter Grundschule Texte',
        description: `Geben Sie Ihre geheime Botschaft in das Textfeld ein. Diese Botschaft wird zum Rätsel das Schüler entschlüsseln. Verwenden Sie einfache Sätze für Vorschule Arbeitsblätter. Schreiben Sie komplexere Botschaften für Arbeitsblätter Grundschule der höheren Klassenstufen.

Wählen Sie Botschaften passend zu Ihrem Unterrichtsthema. Für Buchstaben lernen Aktivitäten verwenden Sie Sätze wie "DAS ABC IST TOLL" oder "ICH KANN LESEN". Für Mathe Arbeitsblätter nutzen Sie Zahlenwörter wie "ZWEI PLUS DREI GLEICH FÜNF". Für Einmaleins Übungen schreiben Sie Multiplikationssätze mit Wörtern.

Passen Sie die Anzahl der enthüllten Buchstaben an den Schwierigkeitsgrad an. Wählen Sie 3 bis 5 enthüllte Buchstaben für Vorschule Arbeitsblätter Anfänger. Reduzieren Sie auf 1 bis 2 enthüllte Buchstaben für fortgeschrittene Arbeitsblätter Grundschule. Fortgeschrittene Schüler lösen Kryptogramme ohne Hinweise.

Die maximale Zeilenanzahl kontrolliert die Rätselgröße. Wählen Sie 2 Zeilen für kurze Botschaften in kostenlose Arbeitsblätter. Erhöhen Sie auf 4 Zeilen für längere Texte in Deutsch Arbeitsblätter.`,
        icon: '✍️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Kryptogramm generieren und Vorschau für Mathe Arbeitsblätter und Schwungübungen - Sofortige Arbeitsblätter Grundschule Erstellung',
        description: `Klicken Sie den Generieren-Button um Ihr Bilder-Kryptogramm in Sekunden zu erstellen. Der Generator baut das Rätselgitter mit Ihrer Botschaft und zugewiesenen Bildern. Die Bildlegende zeigt alle Bild-Buchstaben-Zuordnungen. Der Lösungsschlüssel wird gleichzeitig generiert. Das spart Zeit beim Erstellen mehrerer Vorschule Arbeitsblätter oder Arbeitsblätter Grundschule.

Beobachten Sie den Generierungsprozess der in unter 5 Sekunden abgeschlossen ist. Das Kryptogramm zeigt Ihre Botschaft mit Bildern anstelle von Buchstaben. Schüler nutzen die Bildlegende um jeden Buchstaben zu identifizieren. Diese visuelle Verbindung verstärkt Buchstaben lernen auf spielerische Weise.

Zeigen Sie eine Vorschau Ihres generierten Kryptogramms vor dem Download. Überprüfen Sie dass alle Bildhinweise für Ihre Mathe Arbeitsblätter oder Deutsch Arbeitsblätter klar sichtbar sind. Bestätigen Sie dass die Bildlegende alle benötigten Buchstaben enthält. Prüfen Sie dass die Schwierigkeit für Ihre Schwungübungen oder Einmaleins Zielgruppe angemessen ist.

Klicken Sie den Lösungsschlüssel-Tab um das vervollständigte Rätsel mit allen Buchstaben zu sehen. Dieser automatische Lösungsschlüssel spart Stunden verglichen mit manuellem Erstellen von Lösungen für kostenlose Arbeitsblätter.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Kryptogramm-Layout für Ausmalbilder und Rechnen 1. Klasse bearbeiten - Kostenlose Arbeitsblätter individuell anpassen',
        description: `Klicken Sie jedes Element auf Ihrem generierten Kryptogramm um das Layout anzupassen. Ziehen Sie das Rätselgitter um es auf der Seite für optimale Abstände bei Vorschule Arbeitsblätter neu zu positionieren. Verschieben Sie die Bildlegende für perfekte Balance bei Ihrem Arbeitsblätter Grundschule Design. Skalieren Sie Elemente größer für junge Lerner oder kleiner für mehr Inhalt.

Bearbeiten Sie den Arbeitsblatt-Titel um ihn an Ihren spezifischen Unterrichtsfokus anzupassen. Ändern Sie "Bilder-Kryptogramm" zu "Buchstaben-Rätsel" für Buchstaben lernen Betonung. Benennen Sie zu "Zahlenwörter-Code" für Mathe Arbeitsblätter Integration. Aktualisieren Sie zu "Einmaleins-Geheimschrift" für Multiplikations-Vokabular.

Fügen Sie eigene Textelemente überall auf Ihrem Kryptogramm-Arbeitsblatt für Schülerinformationsfelder hinzu. Fügen Sie "Name:____" und "Datum:____" Felder oben auf Vorschule Arbeitsblätter ein. Ergänzen Sie "Punkte:____" für bewertungsfokussierte Arbeitsblätter Grundschule. Fügen Sie Anweisungen wie "Entschlüssle die geheime Botschaft" für selbstständiges Arbeiten auf kostenlose Arbeitsblätter ein.

Fügen Sie dekorative Hintergründe und Rahmen hinzu für ansprechende Malvorlagen Designs. Wählen Sie aus verschiedenen Hintergrundthemen die zu Ihrer Unterrichtseinheit passen. Rahmenthemen verleihen Ihren Deutsch Arbeitsblätter und Einmaleins Arbeitsblättern einen professionellen Abschluss.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Kryptogramm-Arbeitsblätter für Deutsch Arbeitsblätter und Einmaleins herunterladen - Mathe Arbeitsblätter als PDF exportieren',
        description: `Klicken Sie das Download-Dropdown um Exportoptionen für Ihr fertiges Kryptogramm zu öffnen. Wählen Sie JPEG-Format für digitale Verteilung oder Teilen auf Online-Lernplattformen. Wählen Sie PDF-Format für höchste Druckqualität bei Vorschule Arbeitsblätter oder Arbeitsblätter Grundschule. Aktivieren Sie den Graustufen-Modus um Tintenkosten beim Drucken von Klassensätzen zu reduzieren.

Laden Sie zuerst das Rätsel-Arbeitsblatt für Schülerkopien herunter. Diese Version zeigt das Kryptogramm mit Bildcodes. Schüler entschlüsseln die Botschaft mit der Bildlegende. Drucken Sie mehrere Kopien für Ganzklassen-Vorschule Arbeitsblätter Aktivitäten oder Hausaufgabenpakete mit Buchstaben lernen und Schwungübungen.

Laden Sie den Lösungsschlüssel separat für Lehrerreferenz herunter. Der Lösungsschlüssel zeigt die vollständige Botschaft mit allen Buchstaben. Bewahren Sie Lösungsschlüssel bei Ihren Unterrichtsplänen für schnelles Korrigieren auf. Fügen Sie Lösungsschlüssel beim Verkauf von kostenlose Arbeitsblätter Paketen auf Teachers Pay Teachers hinzu.

PDF-Downloads bewahren perfekte Formatierung auf allen Geräten und Druckern. Teilen Sie PDF-Dateien mit Kollegen im Wissen dass Ihre Kryptogramm-Arbeitsblätter identisch drucken. PDFs funktionieren perfekt für Ausmalbilder, Malvorlagen und Rechnen lernen wo Linienqualität wichtig ist.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from kryptogramm.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Bilder-Kryptogramme dienen vielen Zwecken in verschiedenen Bildungsumgebungen. Erzieher nutzen sie für Sprachzentren und Buchstaben lernen Aktivitäten. Grundschullehrer setzen sie als Frühfertig-Aufgaben und Einmaleins Vokabular-Übung ein. DaF-Lehrer integrieren sie in ihre Deutsch Arbeitsblätter Programme.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from kryptogramm.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Lehrer und Eltern stellen häufige Fragen über Bilder-Kryptogramme bevor sie den Generator ausprobieren. Diese Antworten liefern klare ehrliche Information über Abonnement-Anforderungen, Druckoptionen und Anpassungsfähigkeiten.',
    showMoreText: 'Mehr Fragen anzeigen',
    showLessText: 'Weniger anzeigen',
    badgeText: 'Häufige Fragen',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    secureCheckout: 'Sichere Bezahlung',
    cancelAnytime: 'Jederzeit kündbar',
    items: [], // Samples loaded dynamically from content manager
    
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

  // Related Apps - Apps that work well with cryptogram
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'LessonCraft Studio bietet 33 verschiedene Arbeitsblatt-Generatoren mit Ihrem Vollzugriff Abonnement. Lehrer erstellen umfassende Lernpakete durch Kombination multipler Arbeitsblatt-Typen. Bilder-Kryptogramme funktionieren perfekt neben Leseschreib-Arbeitsblättern, Mathe Arbeitsblättern und Feinmotor-Aktivitäten.',
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

export default cryptogramDeContent;
