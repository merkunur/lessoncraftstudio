import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - German Content
 *
 * File: frontend/content/product-pages/de/alphabet-train-worksheets.ts
 * URL: /de/apps/alphabet-zug-arbeitsblaetter (German SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/German/alphabet-train.md
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
 *
 * Pricing: Basis-Paket = 144€/year or 15€/month
 */

export const alphabetTrainDeContent: ProductPageContent = {
  // SEO Metadata - German language-specific
  seo: {
    slug: 'alphabet-zug-arbeitsblaetter',
    appId: 'alphabet-train',
    title: 'Alphabet-Zug Generator | Arbeitsblätter Grundschule',
    description: 'Alphabet-Zug Arbeitsblätter mit Buchstaben in Zugwaggons erstellen. 3000+ Bilder, 11 Sprachen. Perfekt zum Buchstaben lernen in Vorschule und Grundschule.',
    keywords: 'alphabet zug, buchstaben lernen, arbeitsblätter grundschule, vorschule arbeitsblätter, kostenlose arbeitsblätter, deutsch arbeitsblätter, schwungübungen, ausmalbilder, abc lernen, alphabet arbeitsblätter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter',
      },

  // Hero Section - FULL text from alphabet-train.md paragraphs 1-4
  hero: {
    title: 'Alphabet-Zug Generator',
    subtitle: 'Kostenlose Arbeitsblätter zum Buchstaben lernen für Vorschule und Grundschule',
    description: `Erstellen Sie professionelle Arbeitsblätter zum Buchstaben lernen mit unserem Alphabet-Zug Generator. Mit Ihrem Basis-Paket Abonnement (15 € pro Monat) erstellen Sie unbegrenzt viele Vorschul-Arbeitsblätter ohne zusätzliche Kosten pro Arbeitsblatt. Der Alphabet-Zug verbindet spielerisches Lernen mit systematischer Buchstabenerkennung. Jeder Waggon zeigt einen Buchstaben und ein passendes Bild. Perfekt für Erzieher in der Vorschule und Lehrer in der 1. bis 3. Klasse Grundschule.

Unser Generator für Buchstaben lernen macht die Erstellung kinderleicht. Wählen Sie 11 Buchstaben aus dem deutschen Alphabet aus. Der Alphabet-Zug zeigt dann jeden Buchstaben mit einem passenden Bild auf einem bunten Waggon. Kinder lernen so Buchstaben und verbinden sie gleichzeitig mit Bildern. Diese Verbindung von visuellen und sprachlichen Elementen unterstützt den Lernprozess nachhaltig.

Die Arbeitsblätter eignen sich hervorragend für Vorschul-Arbeitsblätter und Deutsch-Arbeitsblätter in der Grundschule. Laden Sie hochauflösende PDF-Dateien in professioneller 300 DPI Qualität herunter. Drucken Sie Ihre kostenlose Arbeitsblätter zu Hause oder in der Schule aus. Jedes Arbeitsblatt enthält einen Lösungsschlüssel für schnelle Kontrolle.`,
    previewImageSrc: '/samples/german/alphabet-train/sample-1.jpeg',
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
        videoId: '_dDQegRq9JQ',
        buttonText: 'Alphabet-Zug Funktionen',
        modalTitle: 'Alphabet-Zug Anleitung',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
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

  // Features Grid - FULL text from alphabet-train.md feature sections
  features: {
    sectionTitle: 'Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule und Kostenlose Arbeitsblätter',
    sectionDescription: 'Unser Alphabet-Zug Generator bietet alle Funktionen die Erzieher und Grundschullehrer benötigen. Erstellen Sie kostenlose Arbeitsblätter für Buchstaben lernen in wenigen Minuten. Jede Funktion wurde speziell für die Bedürfnisse von Vorschule und Grundschule entwickelt.',
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

  // How-To Guide - FULL text from alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder erstellen - Arbeitsblatt für Vorschule',
    sectionDescription: 'Die Erstellung von Arbeitsblätter Grundschule dauert weniger als 3 Minuten. Folgen Sie diesen fünf einfachen Schritten. Keine Design-Erfahrung erforderlich. Perfekt für Vorschul-Arbeitsblätter und Deutsch-Arbeitsblätter.',
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
        title: 'Buchstaben auswählen für Vorschul-Arbeitsblätter und Deutsch-Arbeitsblätter',
        description: `Wählen Sie 11 Buchstaben aus dem deutschen Alphabet. Klicken Sie einfach auf die gewünschten Buchstaben im Alphabet-Raster. Das deutsche Alphabet enthält alle Buchstaben inklusive Ä, Ö und Ü. Die Buchstaben erscheinen in korrekter alphabetischer Reihenfolge.

Die Auswahl von 11 Buchstaben ermöglicht gezielte Förderung. Konzentrieren Sie sich auf Problemlaute. Wählen Sie Buchstaben für eine thematische Einheit. Erstellen Sie Arbeitsblätter Grundschule die zu Ihrem aktuellen Unterricht passen.

Ein Zähler zeigt Ihren Fortschritt. "Ausgewählt: 7/11" sehen Sie während der Auswahl. So behalten Sie den Überblick. Ändern Sie Ihre Auswahl jederzeit.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Bilder zuweisen für Buchstaben lernen - Vorschul-Arbeitsblätter mit passenden Motiven',
        description: `Wählen Sie ein Thema aus der Dropdown-Liste. Über 50 verschiedene Themen stehen zur Verfügung. Tiere, Essen, Fahrzeuge, Natur und viele mehr. Jedes Thema enthält dutzende kindgerechte Bilder. Perfekt für thematische Arbeitsblätter Grundschule.

Klicken Sie auf ein Bild um es einem Buchstaben zuzuweisen. Das System ordnet das Bild automatisch dem passenden Buchstaben zu. Ein Apfel wird automatisch dem Buchstaben A zugeordnet. Intelligent und zeitsparend für Ihre kostenlose Arbeitsblätter.

Die Bildvorschau zeigt alle verfügbaren Motive. Scrollen Sie durch die Galerie. Nutzen Sie die Suchfunktion für schnelles Finden.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Arbeitsblatt generieren und mit Schwungübungen und Ausmalbilder kombinieren',
        description: `Klicken Sie auf "Arbeitsblatt erstellen" im Generieren-Menü. Der Alphabet-Zug erscheint sofort auf der Arbeitsfläche. Elf bunte Waggons zeigen Ihre gewählten Buchstaben und Bilder. Die Erstellung dauert nur Sekunden.

Passen Sie die Hinweis-Anzahl an für unterschiedliche Schwierigkeitsgrade. Wählen Sie 3 Hinweise für fortgeschrittene Schüler. Wählen Sie 11 Hinweise für Anfänger beim Buchstaben lernen.

Fügen Sie Name- und Datum-Felder hinzu mit einem Klick. Wählen Sie Ihr bevorzugtes Papierformat: Letter oder A4, Hochformat oder Querformat.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Arbeitsblätter bearbeiten und anpassen - Kostenlose Arbeitsblätter optimieren',
        description: `Jetzt kommt die vollständige Bearbeitungsphase für Ihre Arbeitsblätter Grundschule. Verschieben Sie jeden Waggon per Drag-and-Drop. Vergrößern Sie wichtige Elemente. Verkleinern Sie weniger wichtige Details.

Fügen Sie Text-Elemente für Anweisungen hinzu. Schreiben Sie "Schneide die Buchstaben aus und klebe sie auf die Waggons". Wählen Sie gut lesbare Schriftarten. Passen Sie die Schriftgröße an.

Ändern Sie Hintergrundfarben und Designs. Wählen Sie ein Thema das zu Ihrem Unterricht passt. Nutzen Sie die Rückgängig-Funktion zum Experimentieren.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lösungsschlüssel erstellen und herunterladen - Buchstaben lernen Arbeitsblätter',
        description: `Klicken Sie auf "Lösungsschlüssel erstellen" im Generieren-Menü. Ein komplettes Lösungsblatt wird automatisch generiert. Alle Buchstaben sind sichtbar auf den Waggons. Lehrer können schnell kontrollieren.

Der Lösungsschlüssel verwendet dasselbe Design wie das Arbeitsblatt. Gleiche Farben, gleiche Bilder, gleiche Anordnung. Nur die versteckten Buchstaben sind jetzt sichtbar.

Laden Sie beide Dateien herunter. Wählen Sie zwischen JPEG und PDF Format. Beide Formate in professionellen 300 DPI. Aktivieren Sie die Graustufen-Option zum Tinte sparen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Kostenloses Arbeitsblatt für Kinder - Arbeitsblatt für Vorschule mit Kostenlose Druckvorlagen',
    sectionDescription: 'Der Alphabet-Zug Generator eignet sich für verschiedenste Einsatzbereiche im Bildungswesen. Erzieher in der Vorschule nutzen ihn für Buchstaben lernen Aktivitäten. Grundschullehrer erstellen Deutsch-Arbeitsblätter für die 1. bis 3. Klasse.',
    badgeText: 'Anwendungsbereiche',
    readMoreLabel: 'Mehr lesen',
    showLessLabel: 'Weniger anzeigen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from alphabet-train.md
  faq: {
    sectionTitle: 'FAQ - Kostenloses Arbeitsblatt für Kinder und Arbeitsblatt für Vorschule',
    sectionDescription: 'Erzieher und Lehrer haben viele Fragen zum Alphabet-Zug Generator. Hier beantworten wir die häufigsten Fragen zu Arbeitsblätter Grundschule, Deutsch-Arbeitsblätter und Buchstaben lernen Materialien.',
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
        question: 'Wie funktioniert der Alphabet-Zug beim Buchstaben lernen?',
        answer: 'Der Alphabet-Zug zeigt elf bunte Waggons, wobei jeder Waggon einen Buchstaben und ein passendes Bild enth\u00e4lt. Kinder verbinden so Buchstaben mit visuellen Darstellungen, was den Lernprozess nachhaltig unterst\u00fctzt. Die Hinweis-Anzahl l\u00e4sst sich anpassen \u2014 von 3 Hinweisen f\u00fcr Fortgeschrittene bis 11 f\u00fcr Anf\u00e4nger.',
      },
      {
        id: 'faq-2',
        question: 'Kann ich Umlaute wie \u00c4, \u00d6 und \u00dc im Alphabet-Zug verwenden?',
        answer: 'Ja, das deutsche Alphabet im Generator enth\u00e4lt alle Buchstaben inklusive der Umlaute \u00c4, \u00d6 und \u00dc. Sie w\u00e4hlen 11 Buchstaben aus dem vollst\u00e4ndigen deutschen Alphabet aus und erstellen so perfekte Deutsch-Arbeitsbl\u00e4tter f\u00fcr die Vorschule und Grundschule.',
      },
      {
        id: 'faq-3',
        question: 'F\u00fcr welche Klassenstufen eignet sich der Alphabet-Zug Generator?',
        answer: 'Der Alphabet-Zug eignet sich f\u00fcr Kinder in der Vorschule und der 1. bis 3. Klasse Grundschule. F\u00fcr Vorsch\u00fclkinder stellen Sie mehr Hinweise ein, w\u00e4hrend \u00e4ltere Sch\u00fcler mit weniger Hinweisen arbeiten. Der Generator passt sich so an jede Lernphase beim Buchstaben lernen an.',
      },
      {
        id: 'faq-4',
        question: 'Wie werden die Bilder den Buchstaben zugeordnet?',
        answer: 'Sie w\u00e4hlen ein Thema aus \u00fcber 50 Kategorien wie Tiere, Fahrzeuge oder Essen. Das System ordnet Bilder automatisch dem passenden Buchstaben zu \u2014 ein Apfel wird dem Buchstaben A zugeordnet. Alternativ weisen Sie Bilder manuell zu f\u00fcr maximale Kontrolle \u00fcber Ihre Vorschul-Arbeitsbl\u00e4tter.',
      },
      {
        id: 'faq-5',
        question: 'Enth\u00e4lt jedes Alphabet-Zug Arbeitsblatt einen L\u00f6sungsschl\u00fcssel?',
        answer: 'Ja, der Generator erstellt automatisch einen L\u00f6sungsschl\u00fcssel mit demselben Design wie das Arbeitsblatt. Alle versteckten Buchstaben sind im L\u00f6sungsschl\u00fcssel sichtbar. Beide Dateien k\u00f6nnen separat als PDF oder JPEG in 300 DPI heruntergeladen werden.',
      },
      {
        id: 'faq-6',
        question: 'Kann ich das Alphabet-Zug Arbeitsblatt nach der Erstellung noch bearbeiten?',
        answer: 'Ja, nach der Generierung k\u00f6nnen Sie das Arbeitsblatt vollst\u00e4ndig bearbeiten. Verschieben Sie Waggons per Drag-and-Drop, f\u00fcgen Sie Textanweisungen hinzu und \u00e4ndern Sie Hintergrundfarben. Die R\u00fcckg\u00e4ngig-Funktion erlaubt sorgenfreies Experimentieren mit Ihren Arbeitsbl\u00e4ttern Grundschule.',
      },
    ],

  },

  // Pricing - Alphabet Train is Basis-Paket ($144/year or $15/month)
  pricing: {
    title: 'Basis-Paket',
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

  // Related Apps - Kombinieren Sie Alphabet-Zug mit anderen Generatoren
  relatedApps: {
    sectionTitle: 'Kostenlose Arbeitsblätter kombinieren - Arbeitsblatt für Kinder und Kostenlose Druckvorlagen',
    sectionDescription: 'Ihr Basis-Paket Abonnement beinhaltet 10 Premium-Generatoren, die perfekt zusammenarbeiten. Kombinieren Sie Buchstaben lernen mit Mathe-Arbeitsblätter. Integrieren Sie Schwungübungen für Schreibvorbereitung. Verbinden Sie mit Ausmalbilder für feinmotorische Förderung.',
    ctaTitle: 'Bereit, fantastische Arbeitsblätter zu erstellen?',
    ctaDescription: 'Schließen Sie sich tausenden Lehrkräften an, die professionelle Alphabet-Zug Arbeitsblätter erstellen. Unbegrenzte Generierung, kommerzielle Lizenz inklusive.',
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

export default alphabetTrainDeContent;
