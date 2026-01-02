import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects (Suchbilder) Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/find-objects-worksheets.ts
 * URL: /de/apps/suchbilder-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/find-objects.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * German Keywords (from keywords.txt):
 * 1. Arbeitsblätter Grundschule
 * 2. Mathe Arbeitsblätter
 * 3. Vorschule Arbeitsblätter
 * 4. Einmaleins
 * 5. Schwungübungen
 * 6. Buchstaben lernen
 * 7. Ausmalbilder / Malvorlagen
 * 8. Kostenlose Arbeitsblätter
 * 9. Rechnen lernen / Rechnen 1. Klasse
 * 10. Deutsch Arbeitsblätter
 */

export const findObjectsDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchbilder-arbeitsblaetter',
    appId: 'find-objects',
    title: 'Suchbilder Generator - Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Vorschule Arbeitsblätter',
    description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Generieren Sie Ich-Sehe-Was und Welches-Passt-Nicht Aktivitäten. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
    keywords: 'suchbilder arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, ich sehe was, welches passt nicht, visuelle wahrnehmung, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
  },

  // Hero Section - FULL text from find-objects.md
  hero: {
    title: 'Suchbilder-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Generator für Vorschule Arbeitsblätter und Mathe Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Ihr Full Access Abonnement für 240 Euro im Jahr ermöglicht unbegrenzte Arbeitsblatterstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Arbeitsblätter für Vorschule und Grundschule in unter drei Minuten. Laden Sie hochwertige PDF-Arbeitsblätter im 300 DPI Format herunter.

Unser Suchbilder-Generator bietet Lehrkräften zwei bewährte Aktivitätsformate. Der Ich-Sehe-Was-Modus lässt Kinder versteckte Objekte unter Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, ungepaarte Bilder zu identifizieren. Beide Formate unterstützen Vorschule Arbeitsblätter und Arbeitsblätter Grundschule mit anpassbaren Schwierigkeitsstufen.

Das Full Access Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Suchbilder mit Mathe Arbeitsblättern, Deutsch Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
    previewImageSrc: '/samples/english/find objects/find objects portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Suchbilder-Arbeitsblätter Beispiele',
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
        worksheetSrc: '/samples/english/find objects/find objects portrait.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects portrait answer_key.jpeg',
        altText: 'Suchbilder-Arbeitsblatt Hochformat für Vorschule Arbeitsblätter und visuelle Wahrnehmung',
        pdfDownloadUrl: '/samples/english/find objects/find objects portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find objects/find objects landscape.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects landscape answer_key.jpeg',
        altText: 'Arbeitsblätter Grundschule Suchbilder Querformat mit Ich-Sehe-Was Aktivität',
        pdfDownloadUrl: '/samples/english/find objects/find objects landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Funktionen des Suchbilder Generators - Kostenlose Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Unser Suchbilder-Generator bietet vollständige Anpassungsmöglichkeiten für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule. Die Plattform enthält zwei verschiedene Aktivitätsmodi mit professionellen Bearbeitungswerkzeugen. Lehrkräfte erstellen druckbare Arbeitsblätter für visuelle Wahrnehmungsübungen in unter drei Minuten. Das Full Access Abonnement schaltet alle Funktionen frei.',
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
        title: 'Arbeitsblätter Grundschule in 3 Klicks erstellen - Schneller Generator für Ausmalbilder und Malvorlagen',
        description: `Erstellen Sie Arbeitsblätter Grundschule in nur drei Schritten. Zuerst wählen Sie den Aktivitätsmodus aus. Der Ich-Sehe-Was-Modus lässt Kinder 1-5 versteckte Objekte unter 8-12 Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, ungepaarte Bilder zu identifizieren. Dann wählen Sie Bilder aus der Bibliothek.

Die Bibliothek enthält über 3000 kindgerechte Grafiken. Wählen Sie Themen passend zu Ihrem Unterricht. Nutzen Sie saisonale Motive für Herbst, Winter, Frühling oder Sommer. Schließlich klicken Sie auf Erstellen. Der Generator ordnet alle Bilder automatisch an und erstellt gleichzeitig einen Lösungsschlüssel. Diese Effizienz macht den Generator perfekt für Ausmalbilder und Malvorlagen aller Schwierigkeitsgrade.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Vorschule Arbeitsblätter vollständig bearbeiten - Schwungübungen und Feinmotorik Training',
        description: `Jedes Element auf der Arbeitsfläche ist vollständig bearbeitbar. Ziehen Sie jedes Objekt an beliebige Positionen auf Ihrer Arbeitsblatt-Leinwand. Klicken und halten Sie ein Bild für präzise Positionierung. Drehen Sie Bilder in jeden Winkel für natürliche Platzierung. Skalieren Sie Objekte größer oder kleiner nach Bedarf.

Das Rückgängig-System speichert bis zu 20 Arbeitsschritte. Fehler lassen sich jederzeit korrigieren. Die Zoom-Funktion ermöglicht präzises Arbeiten. Ebenensteuerung bringt Objekte nach vorne oder hinten. Sperren Sie einzelne Objekte gegen versehentliche Änderungen. Diese Bearbeitungswerkzeuge machen Vorschule Arbeitsblätter professionell. Auch Schwungübungen gelingen mit präziser Positionierung.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigene Bilder hochladen für Mathe Arbeitsblätter und Buchstaben lernen Übungen',
        description: `Laden Sie eigene Bilder für personalisierte Arbeitsblätter hoch. Die Mehrfach-Upload-Funktion akzeptiert JPEG, PNG und GIF gleichzeitig. Kombinieren Sie hochgeladene Bilder mit unserer 3000+ Bildbibliothek. Erstellen Sie Arbeitsblätter mit Schülernamen oder Klassenmaskottchen.

Nutzen Sie Schülerfotos für erhöhtes Engagement. Laden Sie Bilder von Schulveranstaltungen für saisonale Arbeitsblätter hoch. Fügen Sie Schullogos für gebrandete Materialien hinzu. Eigene Uploads funktionieren nahtlos mit allen Arbeitsblatttypen. Kombinieren Sie mit Arbeitsblättern zum Buchstaben lernen für vollständige Lernpakete. Mathe Arbeitsblätter mit vertrauten Motiven motivieren Kinder zusätzlich.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kostenlose Arbeitsblätter in 11 Sprachen - Deutsch Arbeitsblätter und internationale Bildnamen',
        description: `Der Generator unterstützt elf Sprachen vollständig. Die Benutzeroberfläche ist komplett übersetzt. Alle Bildnamen erscheinen in der gewählten Sprache. Kinder sehen "Apfel" statt "apple" für Bilder. Diese Funktion ist besonders wertvoll für Deutsch Arbeitsblätter.

Die verfügbaren Sprachen sind Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Internationale Schulen nutzen diese Vielfalt täglich. DaZ-Lehrkräfte erstellen authentische Vokabelmaterialien. Die Sprachauswahl beeinflusst auch die Suchfunktion. So finden Sie schnell passende Bilder in Ihrer Sprache. Kostenlose Arbeitsblätter entstehen in jeder Zielsprache.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerzielle Lizenz für Arbeitsblätter Grundschule - Einmaleins und Rechnen lernen Materialien verkaufen',
        description: `Mit dem Full Access Abonnement erhalten Sie eine kommerzielle Lizenz. Verkaufen Sie Ihre Arbeitsblätter auf Teachers Pay Teachers. Bieten Sie Materialien auf Etsy an. Veröffentlichen Sie Arbeitsbücher auf Amazon KDP. Keine zusätzlichen Lizenzgebühren fallen an.

Die Print-on-Demand Lizenz deckt alle Verkaufskanäle ab. Sie erstellen einmal und verkaufen unbegrenzt. Erfolgreiche Lehrkräfte verdienen 500 bis 5000 Euro monatlich. Einmaleins Übungen und Rechnen lernen Materialien sind besonders gefragt. Die 300 DPI Qualität erfüllt alle Druckanforderungen. Professionelle Arbeitsblätter Grundschule verkaufen sich hervorragend auf allen Plattformen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Über 3000 Bilder für Ausmalbilder und Malvorlagen - Rechnen 1. Klasse Themen inklusive',
        description: `Die Bildbibliothek enthält über 3000 kindgerechte Grafiken. Alle Bilder sind thematisch sortiert. Sie finden Tiere, Fahrzeuge, Lebensmittel und Natur. Auch Zahlen und Buchstaben sind verfügbar. Perfekt für Rechnen 1. Klasse Arbeitsblätter.

Die Suchfunktion findet Bilder nach Namen. Tippen Sie einfach ein Stichwort ein. Die Ergebnisse erscheinen sofort. Die Themenauswahl filtert große Kategorien. Themenoptionen decken Unterrichtsthemen, Jahreszeiten und Feiertage ab. Neue Bilder werden regelmäßig hinzugefügt. Die Bibliothek wächst kontinuierlich für noch mehr Ausmalbilder und Malvorlagen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionelle 300 DPI Qualität für Vorschule Arbeitsblätter und Kostenlose Arbeitsblätter',
        description: `Der Export erfolgt in professioneller Druckqualität. 300 DPI garantieren scharfe Linien und klare Details. Die Arbeitsblätter sehen gedruckt genauso gut aus wie am Bildschirm. Diese Qualität ist wichtig für Verkaufsmaterialien. Aber auch für den Klassenraum macht sie einen Unterschied.

Sie wählen zwischen PDF und JPEG Format. PDF eignet sich für mehrseitige Dokumente. JPEG ist ideal für einzelne Arbeitsblätter. Die Graustufen-Option spart Druckertinte. Schwarzweiße Vorschule Arbeitsblätter sind genauso effektiv. Die Kostenlose Arbeitsblätter Funktion exportiert ohne Wasserzeichen. Ihr Full Access Abonnement garantiert unbegrenzten Download.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Zwei Aktivitätsmodi für Mathe Arbeitsblätter - Ich-Sehe-Was und Welches-Passt-Nicht',
        description: `Wählen Sie zwischen zwei bewährten Formaten für visuelle Wahrnehmung. Der Ich-Sehe-Was-Modus fordert Kinder heraus, 1-5 versteckte Objekte unter 8-12 Ablenkungsbildern zu finden. Schüler umkreisen oder markieren die entdeckten Objekte. Lehrkräfte bestimmen die Anzahl der versteckten Objekte je nach Fähigkeitsstufe.

Der Welches-Passt-Nicht-Modus lässt Kinder 1-3 ungepaarte Bilder unter 8-12 Bildpaaren identifizieren. Beide Modi passen die Schwierigkeit für verschiedene Klassenstufen an. Vorschule Arbeitsblätter verwenden weniger Objekte mit deutlichen visuellen Unterschieden. Diese Flexibilität macht Mathe Arbeitsblätter für alle Altersgruppen zugänglich.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '🔑',
        title: 'Automatische Lösungsschlüssel für Arbeitsblätter Grundschule und Einmaleins Übungen',
        description: `Der Generator erstellt gleichzeitig einen Lösungsschlüssel. Für den Ich-Sehe-Was-Modus umkreist der Lösungsschlüssel versteckte Objekte. Für den Welches-Passt-Nicht-Modus markiert er ungepaarte Bilder. Arbeitsblatt und Lösungsschlüssel erscheinen in separaten Tabs.

Wechseln Sie zwischen Tabs für Vorschau beider Versionen. Laden Sie Arbeitsblatt und Lösungsschlüssel separat herunter. Diese Organisation spart wertvolle Vorbereitungszeit. Arbeitsblätter Grundschule mit automatischen Lösungen erleichtern die Korrektur. Auch Einmaleins Übungen profitieren von dieser Automatisierung erheblich.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '📊',
        title: 'Anpassbare Schwierigkeit für Deutsch Arbeitsblätter und Buchstaben lernen',
        description: `Passen Sie die Schwierigkeit durch Objektanzahl und visuelle Komplexität an. Vorschulkinder beginnen mit 1-2 versteckten Objekten. Schüler der 1. Klasse bewältigen 3-5 versteckte Objekte. Der Welches-Passt-Nicht-Modus fordert fortgeschrittene Erstklässler heraus.

Beginnen Sie mit weniger Objekten für Vorschulkinder. Steigern Sie die Komplexität wenn Aufmerksamkeitsspannen sich entwickeln. Die 11-Sprachen-Unterstützung macht Deutsch Arbeitsblätter für Sprachunterricht perfekt. Kombinieren Sie mit Buchstaben lernen Aktivitäten für vollständige Alphabetisierung. Anpassbare Schwierigkeit ermöglicht differenzierten Unterricht für alle Schüler.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Anleitung: Kostenlose Arbeitsblätter Grundschule erstellen in 5 einfachen Schritten - Ausmalbilder und Malvorlagen Generator',
    sectionDescription: 'Generieren Sie professionelle Vorschule Arbeitsblätter und Arbeitsblätter Grundschule in unter drei Minuten. Diese Schritt-für-Schritt-Anleitung zeigt Ihnen den kompletten Erstellungsprozess. Keine Designkenntnisse erforderlich für kostenlose Arbeitsblätter. Der optimierte Workflow hilft Lehrkräften, Mathe Arbeitsblätter und Ausmalbilder effizient zu erstellen.',
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
        title: 'Schritt 1: Aktivitätsmodus wählen für Mathe Arbeitsblätter und Vorschule Arbeitsblätter - Thema oder eigenes Foto',
        description: `Öffnen Sie den Suchbilder-Generator und wählen Sie zuerst Ihren Aktivitätsmodus. Wählen Sie den Ich-Sehe-Was-Modus für klassische Suchbild-Arbeitsblätter. Wählen Sie den Welches-Passt-Nicht-Modus für Matching- und visuelle Unterscheidungsübungen. Ihre Auswahl bestimmt die Struktur der Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.

Für den Ich-Sehe-Was-Modus wählen Sie zuerst 8-12 Ablenkungsbilder aus der Bibliothek. Durchsuchen Sie Themen für gruppierte verwandte Bilder. Suchen Sie spezifische Objekte mit Schlüsselwörtern wie "Tiere" oder "Fahrzeuge". Dann wählen Sie 1-5 versteckte Objekte aus. Beginnen Sie mit 1-2 versteckten Objekten für Vorschulkinder. Nutzen Sie 3-5 Objekte für fortgeschrittene Erstklässler. Klicken Sie auf Themen-Dropdowns für automatische Bildbefüllung.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Seite und Hintergrund anpassen - Kostenlose Arbeitsblätter mit Malvorlagen Designs gestalten',
        description: `Wählen Sie zuerst Ihr Seitenformat aus Letter oder A4. Wählen Sie Hochformat für Standard-Arbeitsblätter für Schulordner. Wählen Sie Querformat für breitere visuelle Layouts. Die benutzerdefinierte Größenoption erlaubt exakte Pixelangaben. Die Seiteneinstellung beeinflusst alle Arbeitsblatttypen einschließlich Mathe Arbeitsblätter gleichmäßig.

Fügen Sie als nächstes ein Hintergrundthema aus der thematischen Hintergrundbibliothek hinzu. Hintergrundbilder verleihen Vorschule Arbeitsblättern visuelles Interesse. Wählen Sie saisonale Hintergründe für Feiertagseinheiten. Wählen Sie Rahmenthemen für professionelle Umrandung Ihrer kostenlose Arbeitsblätter. Diese Gestaltungsoptionen funktionieren identisch für Malvorlagen und Ausmalbilder. Fügen Sie Namens- und Datumsfelder für Schülerverantwortlichkeit hinzu.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Schritt 3: Arbeitsblatt generieren mit Einmaleins und Rechnen lernen Themen - Kostenlose Arbeitsblätter erstellen',
        description: `Klicken Sie auf die Erstellen-Schaltfläche für automatische Arbeitsblattgenerierung. Der Generator ordnet alle ausgewählten Bilder auf Ihrem Seitenlayout an. Versteckte Objekte oder ungepaarte Bilder platzieren sich zufällig unter anderen Bildern. Auto-Skalierung stellt sicher, dass Bilder angemessen passen.

Der Generator erstellt gleichzeitig einen Lösungsschlüssel. Für den Ich-Sehe-Was-Modus umkreisen Lösungsschlüssel versteckte Objekte. Für den Welches-Passt-Nicht-Modus markieren Lösungsschlüssel ungepaarte Bilder. Diese Auto-Generierungsfunktion spart Stunden im Vergleich zur manuellen Erstellung. Kombinieren Sie mit Einmaleins Themen für mathematische Suchbilder. Rechnen lernen Materialien entstehen durch Zahlenbilder als versteckte Objekte.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Schritt 4: Auf der Leinwand bearbeiten - Rechnen 1. Klasse und Deutsch Arbeitsblätter präzise anpassen',
        description: `Klicken Sie auf ein Objekt auf Ihrem Arbeitsblatt zur Auswahl. Auswahlgriffe erscheinen um angeklickte Objekte. Ziehen Sie ausgewählte Objekte an neue Positionen durch Klicken und Halten. Drehen Sie Bilder in verschiedene Winkel für visuelle Vielfalt. Skalieren Sie Objekte größer oder kleiner durch Ziehen der Eckgriffe.

Ebenensteuerung passt an, welche Objekte bei Überlappung vorne erscheinen. Bringen Sie wichtige Elemente nach vorne mit der Nach-Vorne-Schaltfläche. Sperren Sie Objekte nach der Positionierung gegen versehentliche Änderungen. Fügen Sie Textelemente direkt auf der Leinwand hinzu. Diese Bearbeitungsfähigkeiten stellen sicher, dass Ihre Rechnen 1. Klasse und Deutsch Arbeitsblätter Ihrer exakten Vision entsprechen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Ausmalbilder und Arbeitsblätter Grundschule als JPEG und PDF herunterladen - Export in Druckqualität',
        description: `Wählen Sie Ihr Download-Format aus dem Download-Dropdown-Menü. Wählen Sie JPEG für maximale Kompatibilität mit Bildbearbeitungsprogrammen. Wählen Sie PDF für konsistentes Drucken auf allen Geräten. Beide Formate exportieren in professioneller 300 DPI Qualität. Ihre Vorschule Arbeitsblätter und Ausmalbilder drucken perfekt auf jedem Drucker.

Laden Sie Arbeitsblatt und Lösungsschlüssel separat für organisierte Dateiverwaltung herunter. Aktivieren Sie die Graustufen-Konvertierung vor dem Download für Druckkosteneinsparung. Drucken Sie heruntergeladene Arbeitsblätter sofort oder speichern Sie für später. Verkaufen Sie heruntergeladene Arbeitsblätter auf Teachers Pay Teachers mit inkludierter kommerzieller Lizenz. Ihr Full Access Abonnement (240€/Jahr) deckt unbegrenzte Downloads von Arbeitsblätter Grundschule und allen anderen Arbeitsblatttypen ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from find-objects.md persona sections
  useCases: {
    sectionTitle: 'Perfekt für Lehrkräfte und Eltern - Kostenlose Arbeitsblätter für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule',
    sectionDescription: 'Visuelle Wahrnehmungs-Arbeitsblätter dienen unterschiedlichen pädagogischen Umgebungen. Erzieher in der Vorschule nutzen Suchbild-Arbeitsblätter für Aufmerksamkeitsentwicklung. Grundschullehrer bauen fortgeschrittene visuelle Wahrnehmungsfähigkeiten auf. Eltern im Homeschooling erstellen personalisierte Lernmaterialien. Der Generator passt sich allen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Erzieher in der Vorschule - Vorschule Arbeitsblätter und Schwungübungen für Frühes Lernen',
        subtitle: 'Vorschule Arbeitsblätter für kognitive Entwicklung',
        description: `Erzieherinnen und Erzieher in Kindergärten und Vorschulen profitieren besonders. Suchbild-Arbeitsblätter bauen Aufmerksamkeitsspanne bei 5-6-jährigen Kindern auf. Morgenarbeitspakete enthalten Suchbilder neben Schwungübungen und Alphabet-Aktivitäten. Kinder üben anhaltende Konzentration beim Suchen versteckter Objekte. Die Aktivität fühlt sich wie Spiel an während kritische Vorlesefähigkeiten entwickelt werden.

Nutzen Sie den Ich-Sehe-Was-Modus mit 1-2 versteckten Objekten für Vorschulkinder. Einfache Arbeitsblätter mit klaren visuellen Unterschieden funktionieren am besten. Steigern Sie auf 3 versteckte Objekte wenn Aufmerksamkeitsspannen sich entwickeln. Laden Sie Fotos von Klassenraumobjekten für vertraute Arbeitsblätter hoch. Die 11-Sprachen-Unterstützung hilft Erziehern in bilingualen Programmen kulturell ansprechende Vorschule Arbeitsblätter zu erstellen.`,
        quote: 'Meine Vorschulkinder lieben die bunten Suchbilder mit Tierbildern!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Grundschullehrer - Einmaleins und Rechnen lernen mit Mathe Arbeitsblättern kombinieren',
        subtitle: 'Arbeitsblätter Grundschule für 1. bis 3. Klasse',
        description: `Grundschullehrer nutzen Suchbild-Arbeitsblätter für fortgeschrittene visuelle Unterscheidung. Schüler der 1. Klasse bewältigen 3-5 versteckte Objekte mit subtilen Unterschieden. Der Welches-Passt-Nicht-Modus fordert Grundschüler heraus, ungepaarte Bilder zu identifizieren. Diese Komplexität passt zur kognitiven Entwicklung von 6-7-jährigen Lernenden.

Kombinieren Sie Suchbild-Arbeitsblätter mit Mathe Arbeitsblättern für fächerübergreifendes Üben. Verstecken Sie Zahlen unter Bildern für Doppelzweck-Aktivitäten. Schüler finden versteckte Objekte UND zählen gleichzeitig. Schichten Sie Einmaleins-Konzepte durch Verwendung von Zahlenbildern für Multiplikationsübungen. Nutzen Sie Suchbild-Arbeitsblätter für Frühfertig-Aktivitäten. Erstellen Sie differenzierte Arbeitsblatt-Sets für Rechnen lernen Übungen.`,
        quote: 'Ich erstelle differenzierte Suchbilder für alle meine Schüler in Minuten!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool-Eltern - Buchstaben lernen und Ausmalbilder für Mehrklassen-Unterricht',
        subtitle: 'Buchstaben lernen und Feinmotorik für zu Hause',
        description: `Homeschool-Eltern benötigen flexible Materialien für mehrere Kinder auf verschiedenen Niveaus. Der Suchbilder-Generator erstellt altersgerechte Arbeitsblätter für jedes Kind. Fünfjährige bekommen einfache Ich-Sehe-Was-Arbeitsblätter. Achtjährige erhalten komplexe Welches-Passt-Nicht-Herausforderungen. Ein Abonnement dient der gesamten Homeschool-Familie über mehrere Klassenstufen.

Laden Sie Familienfotos für personalisierte Arbeitsblätter hoch. Kinder finden Bilder von Geschwistern oder Haustieren versteckt unter anderen Bildern. Diese Personalisierung macht Homeschool-Lernen besonders und unvergesslich. Kombinieren Sie Suchbilder mit Buchstaben lernen Aktivitäten für vollständige Alphabetübungen. Kombinieren Sie mit Ausmalbildern für komplette tägliche Lektionen. Homeschool-Eltern drucken unbegrenzt Arbeitsblätter ohne Kosten pro Blatt.`,
        quote: 'Perfekt für alle meine Kinder auf unterschiedlichen Niveaus!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'DaZ-Lehrer - Deutsch Arbeitsblätter in 11 Sprachen für Sprachförderung',
        subtitle: 'Deutsch Arbeitsblätter für mehrsprachigen Unterricht',
        description: `DaZ-Lehrer nutzen die 11-Sprachen-Bildbibliothek für authentischen Vokabelunterricht. Generieren Sie Arbeitsblätter in der Zielsprache der Schüler automatisch. Deutschlernende sehen "Apfel" für Apfelbilder. Visuelles Vokabellernen geschieht durch wiederholte Bildexposition mit muttersprachlichen Beschriftungen.

Erstellen Sie Suchbild-Arbeitsblätter mit alltäglichen Vokabelkategorien. Lebensmittel, Kleidung und Haushaltsgegenstände erscheinen in thematischen Arbeitsblättern. Schüler üben sowohl visuelle Unterscheidung als auch Vokabeln gleichzeitig. Anfänger-DaZ-Schüler nutzen den Ich-Sehe-Was-Modus mit gängigen Substantiven. Kombinieren Sie Suchbilder mit Deutsch Arbeitsblättern für vollständigen DaZ-Lehrplan. Die Mehrsprachenfähigkeit macht diesen Generator essentiell für Sprachförderung.`,
        quote: 'Die Mehrsprachigkeit ist genau was meine DaZ-Schüler brauchen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Förderschullehrer - Malvorlagen und Kostenlose Arbeitsblätter für Differenzierung',
        subtitle: 'Differenzierte Materialien für individuelle Förderung',
        description: `Förderschullehrer passen Suchbild-Arbeitsblätter für individuelle Schülerbedürfnisse an. Visuelle Wahrnehmungsaktivitäten zielen auf IEP-Ziele für Aufmerksamkeit und Fokus ab. Beginnen Sie mit sehr einfachen Arbeitsblättern mit nur 1 verstecktem Objekt unter 4-5 Ablenkungsbildern. Steigern Sie die Komplexität schrittweise wenn Schüler Beherrschung zeigen.

Erstellen Sie kontrastreiche Arbeitsblätter für Schüler mit visuellen Verarbeitungsherausforderungen. Verwenden Sie einfarbige Hintergründe statt thematischer Bilder. Vergrößern Sie versteckte Objekte für Schüler die zusätzliche visuelle Unterstützung benötigen. Kombinieren Sie Suchbilder mit Malvorlagen und kostenlose Arbeitsblätter für sensorische Pausen. Schüler vervollständigen visuelle Unterscheidung dann malen ihr Arbeitsblatt aus. Die Anpassungsoptionen unterstützen diverse Förderbedürfnisse effektiv.`,
        quote: 'Ich kann schnell individualisierte Arbeitsblätter für jeden Schüler erstellen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lehrer-Unternehmer - Arbeitsblätter Grundschule und Einmaleins für Teachers Pay Teachers verkaufen',
        subtitle: 'Kommerzielle Lizenz für passive Einnahmen',
        description: `Lehrer-Unternehmer generieren passives Einkommen durch Verkauf druckbarer Arbeitsblätter. Die kommerzielle Lizenz deckt alle mit Ihrem Full Access Abonnement erstellten Arbeitsblätter ab. Keine zusätzlichen Gebühren über 240€ jährlich hinaus. Erstellen Sie ganze Produktlinien in Stunden statt Wochen. Viele Verkäufer verdienen 500-5000€ monatlich mit Bildungsdrucksachen.

Gestalten Sie thematische Arbeitsblatt-Pakete die mehrere Aktivitätstypen kombinieren. Paketieren Sie Suchbilder mit Arbeitsblätter Grundschule für verschiedene Fähigkeiten. Erstellen Sie saisonale Pakete für Schulanfang, Halloween, Weihnachten und Frühling. Kombinieren Sie Suchbilder mit Einmaleins-Übungen für mathe-thematische Produktlinien. Professionelle 300 DPI Qualität sichert Kundenzufriedenheit für bezahlte Produkte.`,
        quote: 'Mein Abonnement hat sich im ersten Monat bezahlt gemacht!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from find-objects.md
  faq: {
    sectionTitle: 'Häufig gestellte Fragen zum Suchbilder Generator - Vorschule Arbeitsblätter, Mathe Arbeitsblätter und Kostenlose Arbeitsblätter FAQ',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Suchbilder-Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschule Arbeitsblätter.',
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
        question: 'Welche Aktivitätsmodi bietet der Generator für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter?',
        answer: 'Der Generator bietet zwei unterschiedliche Aktivitätsmodi. Der Ich-Sehe-Was-Modus lässt Kinder 1-5 versteckte Objekte unter 8-12 Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, 1-3 ungepaarte Bilder unter 8-12 Bildpaaren zu identifizieren. Beide Modi funktionieren für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule mit anpassbaren Schwierigkeitsstufen.',
      },
      {
        id: '2',
        question: 'Kann ich Mathe Arbeitsblätter und Einmaleins Übungen mit Suchbildern kombinieren?',
        answer: 'Ja, der Generator funktioniert hervorragend in Kombination mit Mathe Arbeitsblättern. Verstecken Sie Zahlenbilder unter anderen Objekten für Doppelzweck-Aktivitäten. Nutzen Sie Einmaleins-Themenbilder für multiplikatives Denken. Schüler finden versteckte Objekte und vervollständigen gleichzeitig Rechenaufgaben. Diese Integration macht visuelle Wahrnehmung zu einer mathematischen Übung.',
      },
      {
        id: '3',
        question: 'Wie erstelle ich Schwungübungen und Buchstaben lernen Arbeitsblätter mit dem Generator?',
        answer: 'Der Suchbilder-Generator ergänzt Schwungübungen und Buchstaben lernen Aktivitäten perfekt. Erstellen Sie thematische Pakete die Suchbilder mit Alphabetübungen kombinieren. Laden Sie Buchstabenbilder als versteckte Objekte hoch. Kinder finden versteckte Buchstaben dann schreiben sie diese auf separaten Schwungübungen-Blättern nach. Die 11-Sprachen-Bildbibliothek unterstützt Buchstaben lernen in jeder Zielsprache.',
      },
      {
        id: '4',
        question: 'Sind die Arbeitsblätter wirklich Kostenlose Arbeitsblätter nach dem Abonnement?',
        answer: 'Nach Abschluss des Full Access Abonnements (240€/Jahr) fallen keine zusätzlichen Kosten pro Arbeitsblatt an. Laden Sie unbegrenzt kostenlose Arbeitsblätter ohne Einzelgebühren herunter. Das Abonnement deckt alle 33 Generatortypen einschließlich Suchbilder ab. Keine versteckten Kosten oder Druckgebühren. Ihre kostenlose Arbeitsblätter sind wirklich kostenlos nach der Jahresgebühr.',
      },
      {
        id: '5',
        question: 'Unterstützt der Generator Deutsch Arbeitsblätter und Rechnen lernen für DaZ-Unterricht?',
        answer: 'Absolut. Die 11-Sprachen-Bildbibliothek macht Deutsch Arbeitsblätter für DaZ-Unterricht einfach. Bildbezeichnungen erscheinen automatisch auf Deutsch für authentisches Vokabellernen. Kombinieren Sie visuelle Unterscheidung mit Rechnen lernen für fächerübergreifenden Unterricht. DaZ-Schüler üben Vokabeln während sie versteckte Objekte suchen. Die Sprachfunktion transformiert Standard-Arbeitsblätter in Sprachlerninstrumente.',
      },
      {
        id: '6',
        question: 'Welche Bildformate funktionieren für Malvorlagen und Ausmalbilder Uploads?',
        answer: 'Der Generator akzeptiert JPEG, PNG und GIF Dateiformate für eigene Uploads. Laden Sie Malvorlagen und Ausmalbilder als versteckte Objekte oder Ablenkungsbilder hoch. Mehrfach-Upload ermöglicht schnelles Hinzufügen vieler Bilder gleichzeitig. Kombinieren Sie hochgeladene Bilder nahtlos mit der 3000+ Bildbibliothek. Eigene Ausmalbilder und Malvorlagen funktionieren identisch wie Bibliotheksbilder.',
      },
      {
        id: '7',
        question: 'Wie passe ich Einmaleins und Rechnen 1. Klasse Arbeitsblätter für verschiedene Niveaus an?',
        answer: 'Passen Sie die Schwierigkeit durch Objektanzahl und visuelle Komplexität an. Vorschulkinder beginnen mit 1-2 versteckten Objekten für Einmaleins-Einführung. Schüler der 1. Klasse bewältigen 3-5 versteckte Objekte für Rechnen 1. Klasse Übungen. Der Welches-Passt-Nicht-Modus fordert fortgeschrittene Erstklässler heraus. Anpassbare Schwierigkeit ermöglicht differenzierten Unterricht.',
      },
      {
        id: '8',
        question: 'Kann ich Schwungübungen und Vorschule Arbeitsblätter für Feinmotorik-Training erstellen?',
        answer: 'Der Generator unterstützt Feinmotorik-Training durch visuelle Wahrnehmungsübungen. Erstellen Sie Vorschule Arbeitsblätter die Suchbilder mit Schwungübungen kombinieren. Kinder trainieren Augen-Hand-Koordination beim Suchen und Markieren versteckter Objekte. Die Aktivität bereitet auf Schreiben vor während sie Spaß macht. Kombinieren Sie mit separaten Schwungübungen-Blättern für vollständige Feinmotorik-Pakete.',
      },
      {
        id: '9',
        question: 'Welche Themen enthält die Bildbibliothek für Mathe Arbeitsblätter und Deutsch Arbeitsblätter?',
        answer: 'Die 3000+ Bildbibliothek enthält Tiere, Objekte, Lebensmittel, Fahrzeuge, Formen und Zahlen. Mathematische Themen unterstützen Mathe Arbeitsblätter mit Zähl- und Formbildern. Alltagsobjekte funktionieren für Deutsch Arbeitsblätter und Vokabelübungen. Saisonale Themen decken Feiertage und Jahreszeiten ab. Jedes Bild funktioniert in allen 11 unterstützten Sprachen.',
      },
      {
        id: '10',
        question: 'Wie lange dauert das Erstellen von Buchstaben lernen und Ausmalbilder Arbeitsblättern?',
        answer: 'Die meisten Lehrkräfte erstellen komplette Arbeitsblätter in unter drei Minuten. Wählen Sie Bilder, klicken Sie Erstellen, dann laden Sie herunter. Auto-Generierung platziert alle Elemente automatisch. Buchstaben lernen Pakete entstehen durch Kombination mehrerer Arbeitsblatttypen. Ausmalbilder und Suchbild-Kombinationen brauchen etwa fünf Minuten. Die Zeitersparnis gegenüber manueller Erstellung ist erheblich.',
      },
      {
        id: '11',
        question: 'Für welches Alter eignen sich Vorschule Arbeitsblätter mit Suchbildern?',
        answer: 'Suchbilder eignen sich für Kinder von 4 bis 10 Jahren. Vorschule Arbeitsblätter mit 1-2 versteckten Objekten passen für 4- bis 6-Jährige. Grundschulkinder von 6 bis 10 Jahren arbeiten mit komplexeren Suchbildern. 4-5 versteckte Objekte fordern auch ältere Schüler heraus. Der einstellbare Schwierigkeitsgrad macht den Generator universell einsetzbar.',
      },
      {
        id: '12',
        question: 'Darf ich Arbeitsblätter Grundschule auf Etsy und Teachers Pay Teachers verkaufen?',
        answer: 'Ja, mit dem Full Access Abonnement erhalten Sie eine kommerzielle Lizenz. Diese erlaubt den Verkauf auf allen Plattformen. Teachers Pay Teachers, Etsy und Amazon KDP sind abgedeckt. Keine zusätzlichen Gebühren fallen an. Arbeitsblätter Grundschule verkaufen sich besonders gut. Erfolgreiche Lehrkräfte verdienen 500 bis 5000 Euro monatlich. Die Lizenz gilt unbegrenzt für alle erstellten Materialien.',
      },
    ],
  },

  // Pricing - Full Access pricing (240€/year)
  pricing: {
    title: 'Voller Zugang',
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
    guaranteeText: '30 Tage Geld-zurück-Garantie',
  },

  // Related Apps - Apps that work well with find-objects
  relatedApps: {
    sectionTitle: 'Suchbilder mit 32 anderen Generatoren kombinieren - Einmaleins, Schwungübungen und Arbeitsblätter Grundschule',
    sectionDescription: 'Das Full Access Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Suchbild-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
    primaryCtaText: 'Kostenlose Testversion Starten',
    secondaryCtaText: 'Alle 33 Apps Ansehen',
    badgeText: 'Funktioniert hervorragend mit',
    exploreText: 'Alle Apps erkunden',
    trustBadges: {
      guarantee: '30 Tage Geld-zurück-Garantie',
      securePayment: 'Sichere Bezahlung',
      cancelAnytime: 'Jederzeit kündbar',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Additions-Generator',
        category: 'Mathematik',
        icon: '➕',
        description: 'Kombinieren Sie Rechnen lernen und Rechnen 1. Klasse mit visueller Wahrnehmung. Schüler finden versteckte Objekte dann vervollständigen sie Additionsaufgaben.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Schwungübungen',
        category: 'Feinmotorik',
        icon: '✍️',
        description: 'Ergänzen Sie Suchbilder mit Schwungübungen für vollständige Vorschule Arbeitsblätter. Beide Apps trainieren Feinmotorik und visuelle Wahrnehmung.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Buchstaben lernen',
        category: 'Sprache',
        icon: '🔤',
        description: 'Kombinieren Sie Buchstaben lernen Aktivitäten mit Suchbildern. Verstecken Sie Buchstabenbilder für Alphabet-Pakete.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Ausmalbilder',
        category: 'Kreativität',
        icon: '🎨',
        description: 'Erstellen Sie Ausmalbilder und Malvorlagen Kombi-Pakete. Kinder suchen Objekte dann malen das Arbeitsblatt aus.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Zuordnungs-Generator',
        category: 'Logik',
        icon: '🔗',
        description: 'Ergänzen Sie Suchbilder mit Vorschule Arbeitsblätter für Matching-Übungen. Beide trainieren visuelle Unterscheidung.',
      },
      {
        id: '6',
        slug: 'math-puzzle',
        name: 'Mathe Arbeitsblätter',
        category: 'Mathematik',
        icon: '🧮',
        description: 'Kombinieren Sie Mathe Arbeitsblätter mit Suchbildern für unterhaltsame Übungspakete. Einmaleins und Zahlenrätsel inklusive.',
      },
      {
        id: '7',
        slug: 'word-search',
        name: 'Deutsch Arbeitsblätter',
        category: 'Sprache',
        icon: '🔍',
        description: 'Erstellen Sie Deutsch Arbeitsblätter mit Wortsuche und Suchbildern. Perfekt für Rechtschreibung und Vokabeltraining.',
      },
      {
        id: '8',
        slug: 'sudoku',
        name: 'Rechnen lernen',
        category: 'Logik',
        icon: '🔢',
        description: 'Kombinieren Sie Rechnen lernen mit logischem Denken. Sudoku und Suchbilder trainieren Konzentration.',
      },
      {
        id: '9',
        slug: 'subtraction',
        name: 'Einmaleins Generator',
        category: 'Mathematik',
        icon: '➖',
        description: 'Ergänzen Sie Einmaleins Übungen mit visuellen Suchbildern. Mathe Arbeitsblätter für die Grundschule.',
      },
      {
        id: '10',
        slug: 'pattern-train',
        name: 'Schwungübungen Ergänzung',
        category: 'Muster',
        icon: '🚂',
        description: 'Kombinieren Sie Musterzüge mit Schwungübungen. Perfekt für Feinmotorik und visuelle Wahrnehmung.',
      },
      {
        id: '11',
        slug: 'writing',
        name: 'Buchstaben lernen Schrift',
        category: 'Schreiben',
        icon: '📝',
        description: 'Ergänzen Sie Buchstaben lernen mit Schreibübungen. Deutsch Arbeitsblätter für die Vorschule.',
      },
      {
        id: '12',
        slug: 'treasure-hunt',
        name: 'Rechnen 1. Klasse',
        category: 'Spiele',
        icon: '🗺️',
        description: 'Kombinieren Sie Schatzsuche mit Rechnen 1. Klasse Übungen. Spielerisches Rechnen lernen.',
      },
      {
        id: '13',
        slug: 'crossword',
        name: 'Deutsch Arbeitsblätter Rätsel',
        category: 'Sprache',
        icon: '✏️',
        description: 'Erstellen Sie Deutsch Arbeitsblätter mit Kreuzworträtseln. Kombinieren Sie mit Schwungübungen.',
      },
      {
        id: '14',
        slug: 'missing-pieces',
        name: 'Einmaleins Puzzle',
        category: 'Logik',
        icon: '🧩',
        description: 'Ergänzen Sie Einmaleins Übungen mit visuellen Puzzles. Buchstaben lernen und Rechnen kombiniert.',
      },
    ],
  },
};

export default findObjectsDeContent;
