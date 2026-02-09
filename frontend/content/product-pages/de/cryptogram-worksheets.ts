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
    description: 'Bilder-Kryptogramm: Buchstaben durch Symbole ersetzen und Wörter entschlüsseln. Generator mit 3000+ Bildern für Grundschule und Vorschule. PDF in 3 Minuten.',
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
    items: [
      {
        id: 'faq-1',
        question: 'Was ist ein Bilder-Kryptogramm und wie funktioniert es?',
        answer: 'Ein Bilder-Kryptogramm verwendet Bilder anstelle von Buchstaben als geheime Codes. Sch\u00fcler ordnen Bilder den Buchstaben zu und entschl\u00fcsseln so versteckte Botschaften. Die Bildlegende zeigt alle Bild-Buchstaben-Zuordnungen. Das kombiniert Buchstaben lernen mit kritischem Denken auf spielerische Weise.',
      },
      {
        id: 'faq-2',
        question: 'Wie kann ich die Schwierigkeit des Kryptogramms anpassen?',
        answer: 'Sie passen die Anzahl der enth\u00fcllten Buchstaben an den Schwierigkeitsgrad an. W\u00e4hlen Sie 3 bis 5 enth\u00fcllte Buchstaben f\u00fcr Vorschul-Arbeitsbl\u00e4tter. Reduzieren Sie auf 1 bis 2 f\u00fcr fortgeschrittene Grundsch\u00fcler. Die maximale Zeilenanzahl steuert zus\u00e4tzlich die R\u00e4tselgr\u00f6\u00dfe von 2 bis 4 Zeilen.',
      },
      {
        id: 'faq-3',
        question: 'Welche Botschaften kann ich f\u00fcr das Kryptogramm eingeben?',
        answer: 'Sie geben beliebige Botschaften als R\u00e4tseltext ein. F\u00fcr Buchstaben lernen eignen sich S\u00e4tze wie "DAS ABC IST TOLL". F\u00fcr Deutsch Arbeitsbl\u00e4tter verwenden Sie thematische S\u00e4tze passend zur Unterrichtseinheit. F\u00fcr Mathe Arbeitsbl\u00e4tter nutzen Sie Zahlenw\u00f6rter wie "ZWEI PLUS DREI".',
      },
      {
        id: 'faq-4',
        question: 'F\u00fcr welche Altersgruppen eignen sich Bilder-Kryptogramme?',
        answer: 'Kryptogramme eignen sich f\u00fcr Kinder von der Vorschule bis zur Grundschule. F\u00fcr j\u00fcngere Kinder w\u00e4hlen Sie kurze Botschaften mit vielen Hinweisbuchstaben. \u00c4ltere Sch\u00fcler l\u00f6sen l\u00e4ngere Texte mit weniger Hinweisen. Die visuelle Verbindung von Bildern und Buchstaben unterst\u00fctzt jede Lernphase.',
      },
      {
        id: 'faq-5',
        question: 'Wie weise ich Bilder den Buchstaben im Kryptogramm zu?',
        answer: 'Sie k\u00f6nnen ein Thema w\u00e4hlen f\u00fcr automatische Zuordnung oder Bilder manuell den Buchstaben A bis Z zuweisen. Klicken Sie die Buchstaben-Buttons und w\u00e4hlen Sie passende Bilder aus \u00fcber 3000 Motiven. Die Auto-Zuweisungsfunktion beschleunigt den Prozess erheblich.',
      },
      {
        id: 'faq-6',
        question: 'Wird ein L\u00f6sungsschl\u00fcssel f\u00fcr das Kryptogramm erstellt?',
        answer: 'Ja, der Generator erstellt automatisch einen L\u00f6sungsschl\u00fcssel mit der vollst\u00e4ndigen Botschaft und allen Buchstaben. Laden Sie R\u00e4tsel und L\u00f6sung separat als PDF oder JPEG in 300 DPI herunter. Der Lösungsschl\u00fcssel spart Lehrkr\u00e4ften Stunden bei der Korrektur.',
      },
      {
        id: 'faq-7',
        question: 'In welchen Sprachen kann ich Kryptogramme erstellen?',
        answer: 'Der Generator erstellt Kryptogramme in 11 Sprachen. Die Bildnamen passen sich automatisch an die gew\u00e4hlte Sprache an. Das macht den Generator ideal f\u00fcr DaF-Unterricht und mehrsprachige Klassen. Erstellen Sie Deutsch Arbeitsbl\u00e4tter, englische Vokabel\u00fcbungen oder mehrsprachige R\u00e4tsel.',
      },
      {
        id: 'faq-8',
        question: 'Kann ich den Kryptogramm Generator kostenlos testen?',
        answer: 'Ja, Sie k\u00f6nnen ohne Registrierung sofort Kryptogramme erstellen. Die Vorschau zeigt Ihr fertiges R\u00e4tsel mit Wasserzeichen. Mit dem Vollzugriff laden Sie unbegrenzt ohne Wasserzeichen herunter. So testen Sie alle Verschl\u00fcsselungsoptionen risikofrei.',
      },
      {
        id: 'faq-9',
        question: 'Welche Seitenformate stehen f\u00fcr den Druck zur Verf\u00fcgung?',
        answer: 'Sie w\u00e4hlen zwischen Letter und A4 in Hoch- oder Querformat. Querformat bietet mehr Platz f\u00fcr l\u00e4ngere Geheimbotschaften. Alle Arbeitsbl\u00e4tter werden in professioneller 300 DPI Qualit\u00e4t als PDF oder JPEG exportiert.',
      },
      {
        id: 'faq-10',
        question: 'F\u00fcr welche Altersgruppen eignen sich Kryptogramme?',
        answer: 'Einfache Kryptogramme mit kurzen W\u00f6rtern und der Bildlegende auf dem Blatt eignen sich ab 5 Jahren. Mittlere Schwierigkeit mit l\u00e4ngeren S\u00e4tzen ist ideal f\u00fcr Klasse 1-2. Komplexe Botschaften ohne Bildlegende fordern Kinder in Klasse 3-4 heraus.',
      },
      {
        id: 'faq-11',
        question: 'Kann ich eigene Bilder f\u00fcr den Geheimcode verwenden?',
        answer: 'Ja, \u00fcber den Datei-Upload-Button laden Sie eigene Bilder hoch und weisen sie Buchstaben zu. Alternativ w\u00e4hlen Sie Bilder aus \u00fcber 3000 Bibliotheksmotiven. Die Auto-Zuweisungsfunktion ordnet Bilder automatisch nach Anfangsbuchstaben zu.',
      },
      {
        id: 'faq-12',
        question: 'Gibt es einen Graustufen-Modus um Druckkosten zu sparen?',
        answer: 'Ja, der Graustufen-Modus wandelt alle Farben in Schwarz-Wei\u00df-T\u00f6ne um. Das spart teure Farbpatronen beim Ausdrucken ganzer Klassensets. Die Bilder im Code bleiben durch klare Konturen gut erkennbar bei voller 300 DPI Qualit\u00e4t.',
      },
      {
        id: 'faq-13',
        question: 'Kann ich Kryptogramme mit anderen Generatoren kombinieren?',
        answer: 'Ja, erstellen Sie thematische R\u00e4tsel-Pakete indem Sie Kryptogramme mit Wortsuche, Kreuzwortr\u00e4tsel oder Buchstabensalat kombinieren. Alle Generatoren nutzen dieselbe Bildbibliothek. So \u00fcben Kinder Buchstaben und W\u00f6rter in verschiedenen motivierenden R\u00e4tselformaten.',
      },
      {
        id: 'faq-14',
        question: 'Darf ich Kryptogramm-Arbeitsbl\u00e4tter kommerziell verkaufen?',
        answer: 'Ja, der Vollzugriff enth\u00e4lt eine kommerzielle Lizenz. Sie d\u00fcrfen erstellte Arbeitsbl\u00e4tter auf Plattformen wie Teachers Pay Teachers oder Lehrermarktplatz verkaufen. Kryptogramme sind besonders beliebte Verkaufsartikel f\u00fcr R\u00e4tsel- und Aktivit\u00e4tshefte.',
      },
      {
        id: 'faq-15',
        question: 'Eignen sich Kryptogramme f\u00fcr DaF/DaZ-Unterricht?',
        answer: 'Ja, Kryptogramme trainieren Buchstabenerkennung und Wortbildung spielerisch. Die Bild-Buchstaben-Zuordnung unterst\u00fctzt den Schriftspracherwerb visuell. Die Geheimbotschaft motiviert zum Entschl\u00fcsseln \u2014 Kinder \u00fcben Lesen, ohne es als Aufgabe zu empfinden.',
      },
      {
        id: 'faq-16',
        question: 'Wie setze ich Kryptogramme zur Differenzierung ein?',
        answer: 'Verwenden Sie kurze W\u00f6rter mit Bildlegende auf dem Blatt f\u00fcr Anf\u00e4nger und l\u00e4ngere S\u00e4tze ohne Legende f\u00fcr Fortgeschrittene. Die Komplexit\u00e4t der Botschaft und die Verf\u00fcgbarkeit der Bildlegende steuern den Schwierigkeitsgrad.',
      },
      {
        id: 'faq-17',
        question: 'Welche Lernziele f\u00f6rdern Kryptogramme?',
        answer: 'Kryptogramme trainieren Buchstabenerkennung, Laut-Buchstaben-Zuordnung, Lesefl\u00fcssigkeit und logisches Denken. Das Entschl\u00fcsseln erfordert systematisches Vorgehen und Konzentration. Das spielerische R\u00e4tselformat erh\u00f6ht die Lesemotivation besonders bei leseschwachen Kindern.',
      },
      {
        id: 'faq-18',
        question: 'Sind Kryptogramme an den Deutsch-Lehrplan angepasst?',
        answer: 'Die \u00dcbungen unterst\u00fctzen die Lernziele des Deutsch-Lehrplans f\u00fcr Klasse 1-3: Buchstabenerkennung, Lesef\u00e4higkeit und Textverst\u00e4ndnis. Das R\u00e4tselformat motiviert zum Lesen und f\u00f6rdert gleichzeitig systematisches Arbeiten gem\u00e4\u00df \u00fcbergreifender Kompetenziele.',
      },
      {
        id: 'faq-19',
        question: 'Eignen sich Kryptogramme f\u00fcr Kinder mit F\u00f6rderbedarf?',
        answer: 'Ja, einfache Kryptogramme mit kurzen W\u00f6rtern und Bildlegende bieten einen motivierenden Zugang zum Lesen. Das Entschl\u00fcsseln-Spielformat reduziert Leseangst. Die Bild-Buchstaben-Zuordnung unterst\u00fctzt visuelle Lerner und Kinder mit Lese-Rechtschreib-Schw\u00e4che.',
      },
      {
        id: 'faq-20',
        question: 'Kann ich Kryptogramm-Arbeitsbl\u00e4tter zu einem Heft zusammenstellen?',
        answer: 'Ja, erstellen Sie verschiedene Geheimbotschaften von einfach bis komplex und laden Sie alle als PDF herunter. Ordnen Sie die R\u00e4tsel nach Schwierigkeit f\u00fcr ein progressives R\u00e4tselheft. Mit einem PDF-Programm f\u00fcgen Sie Arbeitsbl\u00e4tter und L\u00f6sungsschl\u00fcssel zusammen.',
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
