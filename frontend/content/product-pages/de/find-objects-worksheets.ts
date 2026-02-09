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

export const findObjectsDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'suchbilder-arbeitsblaetter',
    appId: 'find-objects',
    title: 'Suchbilder Arbeitsblätter | Generator Grundschule',
    description: 'Suchbilder und Ich-Sehe-Was Arbeitsblätter für visuelle Wahrnehmung erstellen. Generator mit 3000+ Bildern für Grundschule und Vorschule. PDF in 3 Minuten.',
    keywords: 'suchbilder arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, ich sehe was, welches passt nicht, visuelle wahrnehmung, schwungübungen, ausmalbilder',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
      },

  // Hero Section - FULL text from find-objects.md
  hero: {
    title: 'Suchbilder-Arbeitsblätter',
    subtitle: 'Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Generator für Vorschul-Arbeitsblätter und Mathe-Arbeitsblätter',
    description: `Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Ihr Vollzugriff Abonnement für 240 Euro im Jahr ermöglicht unbegrenzte Arbeitsblatterstellung ohne zusätzliche Kosten pro Arbeitsblatt. Generieren Sie individuelle Arbeitsblätter für Vorschule und Grundschule in unter drei Minuten. Laden Sie hochwertige PDF-Arbeitsblätter im 300 DPI Format herunter.

Unser Suchbilder-Generator bietet Lehrkräften zwei bewährte Aktivitätsformate. Der Ich-Sehe-Was-Modus lässt Kinder versteckte Objekte unter Ablenkungsbildern finden. Der Welches-Passt-Nicht-Modus fordert Schüler heraus, ungepaarte Bilder zu identifizieren. Beide Formate unterstützen Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule mit anpassbaren Schwierigkeitsstufen.

Das Vollzugriff Abonnement enthält alle 33 Arbeitsblatt-Generatoren. Kombinieren Sie Suchbilder mit Mathe-Arbeitsblättern, Deutsch-Arbeitsblättern und Arbeitsblättern zum Buchstaben lernen. Ihr Abonnement beinhaltet die kommerzielle Lizenz für den Verkauf auf Teachers Pay Teachers und Etsy. Professionelle 300 DPI Qualität garantiert perfektes Drucken.`,
    previewImageSrc: '/samples/german/find-objects/sample-1.jpeg',
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
        videoId: '8Y3jrVr1Phs',
        buttonText: 'Suchbilder Funktionen',
        modalTitle: 'Suchbilder Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/find objects/
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

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Suchbilder-Generator bietet vollständige Anpassungsmöglichkeiten für Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule. Die Plattform enthält zwei verschiedene Aktivitätsmodi mit professionellen Bearbeitungswerkzeugen. Lehrkräfte erstellen druckbare Arbeitsblätter für visuelle Wahrnehmungsübungen in unter drei Minuten. Das Vollzugriff Abonnement schaltet alle Funktionen frei.',
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

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Generieren Sie professionelle Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule in unter drei Minuten. Diese Schritt-für-Schritt-Anleitung zeigt Ihnen den kompletten Erstellungsprozess. Keine Designkenntnisse erforderlich für kostenlose Arbeitsblätter. Der optimierte Workflow hilft Lehrkräften, Mathe-Arbeitsblätter und Ausmalbilder effizient zu erstellen.',
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
        title: 'Schritt 1: Aktivitätsmodus wählen für Mathe-Arbeitsblätter und Vorschul-Arbeitsblätter - Thema oder eigenes Foto',
        description: `Öffnen Sie den Suchbilder-Generator und wählen Sie zuerst Ihren Aktivitätsmodus. Wählen Sie den Ich-Sehe-Was-Modus für klassische Suchbild-Arbeitsblätter. Wählen Sie den Welches-Passt-Nicht-Modus für Matching- und visuelle Unterscheidungsübungen. Ihre Auswahl bestimmt die Struktur der Vorschul-Arbeitsblätter und Arbeitsblätter Grundschule.

Für den Ich-Sehe-Was-Modus wählen Sie zuerst 8-12 Ablenkungsbilder aus der Bibliothek. Durchsuchen Sie Themen für gruppierte verwandte Bilder. Suchen Sie spezifische Objekte mit Schlüsselwörtern wie "Tiere" oder "Fahrzeuge". Dann wählen Sie 1-5 versteckte Objekte aus. Beginnen Sie mit 1-2 versteckten Objekten für Vorschulkinder. Nutzen Sie 3-5 Objekte für fortgeschrittene Erstklässler. Klicken Sie auf Themen-Dropdowns für automatische Bildbefüllung.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Schritt 2: Seite und Hintergrund anpassen - Kostenlose Arbeitsblätter mit Malvorlagen Designs gestalten',
        description: `Wählen Sie zuerst Ihr Seitenformat aus Letter oder A4. Wählen Sie Hochformat für Standard-Arbeitsblätter für Schulordner. Wählen Sie Querformat für breitere visuelle Layouts. Die benutzerdefinierte Größenoption erlaubt exakte Pixelangaben. Die Seiteneinstellung beeinflusst alle Arbeitsblatttypen einschließlich Mathe-Arbeitsblätter gleichmäßig.

Fügen Sie als nächstes ein Hintergrundthema aus der thematischen Hintergrundbibliothek hinzu. Hintergrundbilder verleihen Vorschul-Arbeitsblättern visuelles Interesse. Wählen Sie saisonale Hintergründe für Feiertagseinheiten. Wählen Sie Rahmenthemen für professionelle Umrandung Ihrer kostenlose Arbeitsblätter. Diese Gestaltungsoptionen funktionieren identisch für Malvorlagen und Ausmalbilder. Fügen Sie Namens- und Datumsfelder für Schülerverantwortlichkeit hinzu.`,
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
        title: 'Schritt 4: Auf der Leinwand bearbeiten - Rechnen 1. Klasse und Deutsch-Arbeitsblätter präzise anpassen',
        description: `Klicken Sie auf ein Objekt auf Ihrem Arbeitsblatt zur Auswahl. Auswahlgriffe erscheinen um angeklickte Objekte. Ziehen Sie ausgewählte Objekte an neue Positionen durch Klicken und Halten. Drehen Sie Bilder in verschiedene Winkel für visuelle Vielfalt. Skalieren Sie Objekte größer oder kleiner durch Ziehen der Eckgriffe.

Ebenensteuerung passt an, welche Objekte bei Überlappung vorne erscheinen. Bringen Sie wichtige Elemente nach vorne mit der Nach-Vorne-Schaltfläche. Sperren Sie Objekte nach der Positionierung gegen versehentliche Änderungen. Fügen Sie Textelemente direkt auf der Leinwand hinzu. Diese Bearbeitungsfähigkeiten stellen sicher, dass Ihre Rechnen 1. Klasse und Deutsch-Arbeitsblätter Ihrer exakten Vision entsprechen.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Schritt 5: Ausmalbilder und Arbeitsblätter Grundschule als JPEG und PDF herunterladen - Export in Druckqualität',
        description: `Wählen Sie Ihr Download-Format aus dem Download-Dropdown-Menü. Wählen Sie JPEG für maximale Kompatibilität mit Bildbearbeitungsprogrammen. Wählen Sie PDF für konsistentes Drucken auf allen Geräten. Beide Formate exportieren in professioneller 300 DPI Qualität. Ihre Vorschul-Arbeitsblätter und Ausmalbilder drucken perfekt auf jedem Drucker.

Laden Sie Arbeitsblatt und Lösungsschlüssel separat für organisierte Dateiverwaltung herunter. Aktivieren Sie die Graustufen-Konvertierung vor dem Download für Druckkosteneinsparung. Drucken Sie heruntergeladene Arbeitsblätter sofort oder speichern Sie für später. Verkaufen Sie heruntergeladene Arbeitsblätter auf Teachers Pay Teachers mit inkludierter kommerzieller Lizenz. Ihr Vollzugriff Abonnement (240€/Jahr) deckt unbegrenzte Downloads von Arbeitsblätter Grundschule und allen anderen Arbeitsblatttypen ab.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from find-objects.md persona sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Visuelle Wahrnehmungs-Arbeitsblätter dienen unterschiedlichen pädagogischen Umgebungen. Erzieher in der Vorschule nutzen Suchbild-Arbeitsblätter für Aufmerksamkeitsentwicklung. Grundschullehrer bauen fortgeschrittene visuelle Wahrnehmungsfähigkeiten auf. Eltern im Homeschooling erstellen personalisierte Lernmaterialien. Der Generator passt sich allen Bedürfnissen an.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from find-objects.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Diese Fragen beantworten die häufigsten Anliegen von Lehrkräften zum Suchbilder-Generator. Erfahren Sie mehr über Funktionen, Preise und Anwendungsmöglichkeiten für Ihre Arbeitsblätter Grundschule und Vorschul-Arbeitsblätter.',
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
        question: 'Welche Aktivit\u00e4tsmodi bietet der Suchbilder-Generator?',
        answer: 'Der Generator bietet zwei bew\u00e4hrte Formate: Den Ich-Sehe-Was-Modus, bei dem Kinder versteckte Objekte unter Ablenkungsbildern finden, und den Welches-Passt-Nicht-Modus, bei dem Sch\u00fcler ungepaarte Bilder identifizieren m\u00fcssen. Beide Modi unterst\u00fctzen anpassbare Schwierigkeitsstufen f\u00fcr Vorschule und Grundschule.',
      },
      {
        id: 'faq-2',
        question: 'Wie f\u00f6rdern Suchbilder-Arbeitsbl\u00e4tter die visuelle Wahrnehmung?',
        answer: 'Suchbilder trainieren die visuelle Diskriminierung, Aufmerksamkeit und Beobachtungsgabe. Kinder m\u00fcssen Details genau betrachten, um versteckte oder unpassende Objekte zu erkennen. Diese F\u00e4higkeiten sind grundlegend f\u00fcr das sp\u00e4tere Lesen und Rechnen lernen.',
      },
      {
        id: 'faq-3',
        question: 'F\u00fcr welche Altersgruppe sind Suchbilder-Arbeitsbl\u00e4tter geeignet?',
        answer: 'Die Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder ab 3 Jahren bis zur 3. Klasse. Beginnen Sie mit 1-2 versteckten Objekten f\u00fcr Vorschulkinder und steigern Sie auf 3-5 Objekte f\u00fcr fortgeschrittene Erstkl\u00e4ssler. Die anpassbare Schwierigkeit macht den Generator vielseitig einsetzbar.',
      },
      {
        id: 'faq-4',
        question: 'Wird automatisch ein L\u00f6sungsschl\u00fcssel erstellt?',
        answer: 'Ja, der Generator erstellt gleichzeitig einen L\u00f6sungsschl\u00fcssel. Im Ich-Sehe-Was-Modus werden versteckte Objekte umkreist, im Welches-Passt-Nicht-Modus werden ungepaarte Bilder markiert. Arbeitsblatt und L\u00f6sung k\u00f6nnen separat als PDF oder JPEG heruntergeladen werden.',
      },
      {
        id: 'faq-5',
        question: 'Kann ich thematische Hintergr\u00fcnde f\u00fcr meine Suchbilder w\u00e4hlen?',
        answer: 'Ja, die Plattform bietet eine thematische Hintergrundbibliothek mit saisonalen und dekorativen Designs. W\u00e4hlen Sie Rahmenthemen f\u00fcr professionelle Umrandungen und f\u00fcgen Sie Namens- und Datumsfelder hinzu. Diese Gestaltungsoptionen machen Ihre Arbeitsbl\u00e4tter visuell ansprechend.',
      },
      {
        id: 'faq-6',
        question: 'Wie viele Bilder kann ich f\u00fcr ein Suchbild-Arbeitsblatt ausw\u00e4hlen?',
        answer: 'Im Ich-Sehe-Was-Modus w\u00e4hlen Sie 8-12 Ablenkungsbilder und 1-5 versteckte Objekte aus der Bibliothek mit \u00fcber 3000 Bildern. Durchsuchen Sie Themen wie Tiere, Fahrzeuge oder Lebensmittel. Sie k\u00f6nnen auch eigene Bilder hochladen f\u00fcr personalisierte Arbeitsbl\u00e4tter.',
      },
      {
        id: 'faq-7',
        question: 'Darf ich die Arbeitsbl\u00e4tter kommerziell verkaufen?',
        answer: 'Ja, das Vollzugriff Abonnement beinhaltet eine kommerzielle Lizenz f\u00fcr den Verkauf auf Plattformen wie Teachers Pay Teachers und Etsy. Alle 33 Arbeitsblatt-Generatoren sind im Abo f\u00fcr 240\u20ac pro Jahr enthalten. Die professionelle 300 DPI Qualit\u00e4t eignet sich perfekt f\u00fcr den kommerziellen Einsatz.',
      },
      {
        id: 'faq-8',
        question: 'Kann ich den Suchbild Generator kostenlos testen?',
        answer: 'Ja, Sie k\u00f6nnen ohne Registrierung sofort Suchbild-Arbeitsbl\u00e4tter erstellen. Die Vorschau zeigt Ihr fertiges Arbeitsblatt mit Wasserzeichen. Mit dem Vollzugriff laden Sie unbegrenzt ohne Wasserzeichen herunter. So testen Sie alle Suchmodi risikofrei.',
      },
      {
        id: 'faq-9',
        question: 'Welche Seitenformate stehen f\u00fcr den Druck zur Verf\u00fcgung?',
        answer: 'Sie w\u00e4hlen zwischen Letter und A4 in Hoch- oder Querformat. Alle Arbeitsbl\u00e4tter werden in professioneller 300 DPI Qualit\u00e4t als PDF oder JPEG exportiert. Die Graustufen-Option spart Druckertinte bei farbigen Suchbildern.',
      },
      {
        id: 'faq-10',
        question: 'F\u00fcr welche Altersgruppen eignen sich Suchbild-\u00dcbungen?',
        answer: 'Einfache Suchbilder mit wenigen gro\u00dfen versteckten Objekten eignen sich ab 4 Jahren f\u00fcr Vorschulkinder. Mittlere Schwierigkeit mit mehr Objekten ist ideal f\u00fcr Klasse 1-2. Komplexe Szenen mit kleinen versteckten Details fordern Kinder in Klasse 3-4 heraus.',
      },
      {
        id: 'faq-11',
        question: 'Wird ein L\u00f6sungsschl\u00fcssel f\u00fcr die Suchbilder erstellt?',
        answer: 'Ja, der Generator erstellt automatisch einen L\u00f6sungsschl\u00fcssel, der die Position aller versteckten Objekte markiert. Laden Sie Arbeitsblatt und L\u00f6sung separat als PDF oder JPEG herunter. Der L\u00f6sungsschl\u00fcssel spart Lehrkr\u00e4ften Zeit bei der Korrektur.',
      },
      {
        id: 'faq-12',
        question: 'Welche Sprachen unterst\u00fctzt der Suchbild Generator?',
        answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Titel und Suchanweisungen werden automatisch in der gew\u00e4hlten Sprache generiert.',
      },
      {
        id: 'faq-13',
        question: 'Kann ich Suchbilder mit anderen Generatoren kombinieren?',
        answer: 'Ja, erstellen Sie thematische Wahrnehmungs-Pakete indem Sie Suchbilder mit Suchen-und-Z\u00e4hlen, Schattenbildern oder Zuordnungs\u00fcbungen kombinieren. Alle Generatoren nutzen dieselbe Bildbibliothek. So trainieren Kinder verschiedene Wahrnehmungsaspekte mit vertrauten Bildern.',
      },
      {
        id: 'faq-14',
        question: 'Gibt es einen Graustufen-Modus um Druckkosten zu sparen?',
        answer: 'Ja, der Graustufen-Modus wandelt alle Farben in Schwarz-Wei\u00df-T\u00f6ne um. Das spart teure Farbpatronen beim Ausdrucken ganzer Klassensets. Die versteckten Objekte bleiben durch klare Konturen erkennbar bei voller 300 DPI Qualit\u00e4t.',
      },
      {
        id: 'faq-15',
        question: 'Eignen sich Suchbilder f\u00fcr DaF/DaZ-Kinder?',
        answer: 'Ja, das Suchen und Finden von Objekten ist sprachunabh\u00e4ngig verst\u00e4ndlich. Die Bilder in der Suchleiste zeigen was gefunden werden soll \u2014 ohne Lesekompetenz. Gleichzeitig erweitern die Objektnamen den Wortschatz auf spielerische Weise.',
      },
      {
        id: 'faq-16',
        question: 'Wie setze ich Suchbilder zur Differenzierung ein?',
        answer: 'Verwenden Sie wenige gro\u00dfe versteckte Objekte f\u00fcr Anf\u00e4nger und viele kleine Objekte in komplexen Szenen f\u00fcr Fortgeschrittene. Die Anzahl der Ablenkungsbilder und die \u00c4hnlichkeit der Objekte steuern den Schwierigkeitsgrad.',
      },
      {
        id: 'faq-17',
        question: 'Welche F\u00e4higkeiten f\u00f6rdern Suchbild-\u00dcbungen?',
        answer: 'Suchbilder trainieren visuelle Wahrnehmung, Aufmerksamkeit f\u00fcr Details, Konzentration und Figur-Grund-Unterscheidung. Das systematische Absuchen der Szene f\u00f6rdert Geduld und strategisches Vorgehen. Diese F\u00e4higkeiten sind Grundlagen f\u00fcr Lesen und naturwissenschaftliches Beobachten.',
      },
      {
        id: 'faq-18',
        question: 'Sind Suchbild-\u00dcbungen an den Bildungsplan angepasst?',
        answer: 'Die \u00dcbungen unterst\u00fctzen die Lernziele f\u00fcr Kita und Vorschule: visuelle Wahrnehmung, Konzentration und Aufmerksamkeitssteuerung. In der Grundschule f\u00f6rdern sie systematisches Beobachten und detailgenaues Arbeiten gem\u00e4\u00df \u00fcbergreifender Kompetenziele.',
      },
      {
        id: 'faq-19',
        question: 'Eignen sich Suchbilder f\u00fcr Kinder mit F\u00f6rderbedarf?',
        answer: 'Ja, einfache Suchbilder mit wenigen gro\u00dfen Objekten bieten einen niedrigschwelligen Einstieg. Das spielerische Format motiviert besonders bei Konzentrationsschwierigkeiten. Das Erfolgserlebnis beim Finden jedes Objekts st\u00e4rkt das Selbstvertrauen und die Ausdauer.',
      },
      {
        id: 'faq-20',
        question: 'Kann ich Suchbild-Arbeitsbl\u00e4tter zu einem Heft zusammenstellen?',
        answer: 'Ja, erstellen Sie verschiedene Suchbilder zu unterschiedlichen Themen und laden Sie alle als PDF herunter. Ordnen Sie die Bl\u00e4tter nach Schwierigkeit f\u00fcr ein progressives R\u00e4tselheft. Mit einem PDF-Programm f\u00fcgen Sie Arbeitsbl\u00e4tter und L\u00f6sungsschl\u00fcssel zusammen.',
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

  // Related Apps - Apps that work well with find-objects
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Das Vollzugriff Abonnement enthält 33 verschiedene Arbeitsblatt-Generatoren. Kombinieren Sie Suchbild-Arbeitsblätter mit anderen Generatortypen für vollständige Lernpakete. Erstellen Sie thematische Einheiten die mehrere Fähigkeiten gleichzeitig trainieren. Jeder Generator nutzt dieselbe intuitive Benutzeroberfläche.',
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

export default findObjectsDeContent;
