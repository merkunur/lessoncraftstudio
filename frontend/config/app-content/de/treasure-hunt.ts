import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'Schatzsuche Arbeitsblatt erstellen',
    secondaryKeywords: [
      'Schnitzeljagd Generator',
      'Schatzsuche Rätsel erstellen',
      'Schnitzeljagd Arbeitsblatt',
      'Schatzsuche Spiel erstellen',
    ],
    lsiKeywords: [
      'Hinweise',
      'Abenteuer',
      'Kindergeburtstag',
      'Klassenaktivität',
    ],
    titleTag: 'Schatzsuche-Generator | LessonCraftStudio',
    metaDescription: 'Erstellen Sie Schatzsuche- und Schnitzeljagd-Arbeitsblätter mit Themenbildern. Druckfertige PDFs. Kostenlos testen — auf Etsy & KDP verkaufen.',
  },

  hero: {
    title: 'Schatzsuche-Generator — Druckvorlagen für Etsy & KDP erstellen',
    tagline: 'Richtungsbasierte Wegfindungs-Rätsel auf einem 5×5-Koordinatenraster generieren — zwei Richtungsvokabulare (Grundrichtungen: oben/unten/links/rechts und Himmelsrichtungen: Norden/Süden/Osten/Westen), vollständig lokalisierte Richtungsanweisungen in 11 Sprachen, automatisch generierter Lösungsschlüssel mit hervorgehobener Schatzposition und schatzsuchenthematische Header über 104 Bildsammlungen.',
    description:
      'Erstellen Sie Schatzsuche-Rätsel mit dem Schatzsuche-Generator und verkaufen Sie diese auf Etsy, Amazon KDP oder Gumroad. Jedes Rätsel platziert 6 thematische Bilder als Orientierungspunkte auf einem 5×5-Koordinatenraster und generiert eine Startposition mit 4 Richtungsbewegungen zur Schatzzelle. Wählen Sie zwischen zwei Richtungsvokabularen: Grundrichtungen (oben/unten/links/rechts) für Einsteiger oder Himmelsrichtungen (Norden/Süden/Osten/Westen) für Fortgeschrittene. Der Generator ist sprachabhängig — ein Sprachwechsel erzeugt automatisch lokalisierte Richtungsanweisungen in allen 11 unterstützten Sprachen, sodass Sie authentische deutsche Schatzsuche-Arbeitsblätter ohne manuelles Übersetzen erstellen. Jedes Rätsel enthält einen automatisch generierten Lösungsschlüssel mit hervorgehobener Schatzzelle. Über 3.100 Illustrationen in 104 Themen liefern abwechslungsreiche Inhalte für jede Nische. Exportieren Sie druckfertige PDFs und JPEGs mit 300 DPI in Letter, A4 oder benutzerdefinierten Größen. Die kommerzielle Lizenz umfasst 10 Themen; Vollzugriff schaltet alle 104 Themen und 11 Sprachen frei. Kostenlos testen mit allen Funktionen — Downloads enthalten ein Wasserzeichen; erwerben Sie eine Lizenz, um es zu entfernen.',
  },

  ctaHeading: 'Schatzsuche-Arbeitsblätter erstellen',

  howItWorks: {
    title: 'Schatzsuche-Arbeitsblätter erstellen in 5 Schritten',
    steps: [
      {
        title: 'Seitenlayout festlegen',
        description:
          'Öffnen Sie das Seiten-Panel und wählen Sie eine Seitengröße: Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) oder eine beliebige benutzerdefinierte Dimension. Wählen Sie eine Hintergrundfarbe mit dem Farbwähler, dann wählen Sie ein Hintergrundthema und passen Sie dessen Deckkraft an (0–1 in 0,05-Schritten). Wählen Sie ein Rahmenthema mit eigenem unabhängigem Deckkraftregler. Diese Layout-Einstellungen rahmen Ihr Schatzsuche-Rätsel, bevor Sie Inhalte konfigurieren.',
      },
      {
        title: 'Richtungstyp wählen',
        description:
          'Im Rätsel-Setup-Panel wechseln Sie zwischen zwei Richtungsvokabularen. Der Grundrichtungen-Modus verwendet oben, unten, links und rechts — ideal für Vorschule bis 1. Klasse, um grundlegendes räumliches Vokabular aufzubauen. Der Himmelsrichtungen-Modus verwendet Norden, Süden, Osten und Westen — geeignet ab der 2. Klasse, um Kompassrichtungen und Kartenlesekompetenz einzuführen. Beide Richtungssätze sind vollständig in alle 11 unterstützten Sprachen übersetzt, sodass ein Sprachwechsel den Richtungsanweisungstext auf dem Arbeitsblatt automatisch aktualisiert.',
      },
      {
        title: 'Bilder für das Raster auswählen',
        description:
          'Wählen Sie, wie Sie das 5×5-Raster mit 6 thematischen Bildern befüllen. Aus Thema generieren (Standard) wählt automatisch 6 zufällige Bilder aus dem gewählten Thema und verteilt sie über das Raster. Manuelle Bildauswahl lässt Sie 104 thematische Sammlungen mit über 3.100 farbenfrohen Illustrationen durchsuchen — Tiere, Lebensmittel, Fahrzeuge, Natur, Feiertage und Dutzende mehr — und per Klick genau 6 Bilder auswählen. Eigene Bilder hochladen ermöglicht das Hinzufügen eigener JPEG-, PNG-, GIF- oder WebP-Dateien neben den Bibliotheksinhalten.',
      },
      {
        title: 'Schatzsuche-Rätsel generieren',
        description:
          'Klicken Sie auf Generieren, um das Wegfindungs-Rätsel auf dem 5×5-Koordinatenraster (A–E Zeilen, 1–5 Spalten) zu erstellen. Der Generator verteilt Ihre 6 ausgewählten Bilder über das Raster, wählt eine zufällige Startzelle und erstellt genau 4 Richtungsbewegungen, die innerhalb der Rastergrenzen bleiben. Das Arbeitsblatt zeigt 5 Anweisungszeilen: \"Starte bei [Zelle]\" gefolgt von 4 \"Bewege dich [Richtung] [Anzahl] Feld(er)\"-Anweisungen, abgeschlossen mit \"Wo ist der Schatz?\" Ein schatzsuchenthematischer Header erscheint am oberen Rand mit türkisem Hintergrund (#2C8C7C), goldenem Titel (#D4A017) und lokalisiertem Text in Fredoka- und Quicksand-Schriften.',
      },
      {
        title: 'Lösungsschlüssel ansehen und herunterladen',
        description:
          'Wechseln Sie zum Lösungsschlüssel-Tab, um die Lösung mit der finalen Schatzzelle in Blassgelb (rgba(255, 250, 205, 0.8)) und einem dunkelgrauen Rahmen hervorgehoben zu sehen. Laden Sie beide Versionen über die vier dedizierten Buttons im Dropdown-Menü herunter: Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF. Dateien werden mit 300 DPI für druckfertige Qualität exportiert. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen. Jeder Export ist produktionsfertig für Etsy-Listings, Amazon-KDP-Buchinhalte und Gumroad-Produktdateien.',
      },
    ],
  },

  keyFeatures: {
    title: 'Hauptfunktionen des Schatzsuche-Arbeitsblatt-Generators',
    features: [
      {
        title: 'Wegfindungs-Schatzsuche-Rätsel auf einem 5×5-Koordinatenraster',
        description:
          'Generieren Sie Richtungsrätsel auf einem festen 5×5-Raster mit Buchstabenzeilen (A–E) und Zahlenspalten (1–5). Jedes Rätsel verteilt 6 thematische Bilder über die 25 Zellen als visuelle Orientierungspunkte, generiert dann eine zufällige Startposition und genau 4 sequenzielle Bewegungen, die durch das Raster zur Schatzzelle navigieren. Das konsistente 5-Anweisungen-Format — Startposition, 4 Bewegungen und eine \"Wo ist der Schatz?\"-Frage — erzeugt eine strukturierte Wegfindungs-Herausforderung, die räumliches Denken und Koordinatenkompetenz aufbaut. Alle Bewegungen bleiben innerhalb der Rastergrenzen für gültige, lösbare Rätsel bei jeder Generierung.',
      },
      {
        title: 'Zwei Richtungstypen: Grundrichtungen (Oben/Unten/Links/Rechts) und Himmelsrichtungen (Norden/Süden/Osten/Westen)',
        description:
          'Wechseln Sie zwischen zwei Richtungsvokabularen, um Ihre Zielgruppe anzusprechen. Der Grundrichtungen-Modus verwendet oben, unten, links und rechts — vertraute Richtungswörter für Anfänger, die räumliches Vokabular aufbauen. Der Himmelsrichtungen-Modus führt Norden, Süden, Osten und Westen für Kompassrichtungs-Übungen und Kartenlesekompetenz ein. Beide Vokabulare erzeugen dieselbe 4-Bewegungen-Rätselstruktur auf demselben 5×5-Raster, sodass Sie progressive Schwierigkeitsstufen erstellen können: Beginnen Sie mit Grundrichtungs-Arbeitsblättern und steigern Sie sich zu Himmelsrichtungs-Arbeitsblättern mit identischen Themen und Bildern.',
      },
      {
        title: 'Automatisch generierter Lösungsschlüssel mit hervorgehobener Schatzposition',
        description:
          'Jedes Schatzsuche-Rätsel generiert automatisch einen begleitenden Lösungsschlüssel auf einem separaten Canvas-Tab. Der Lösungsschlüssel reproduziert das exakte Rätsel-Layout und hebt die finale Schatzzelle in Blassgelb (rgba(255, 250, 205, 0.8)) mit einem dunkelgrauen Rahmen hervor, sodass das Ziel sofort sichtbar ist. Kein manuelles Markieren, keine separate Dateierstellung — der Lösungsschlüssel bleibt immer perfekt mit dem Rätsel synchronisiert. Dieser Dual-Canvas-Ansatz spart erhebliche Produktionszeit für Verkäufer, die Schatzsuche-Pakete erstellen, bei denen jedes Arbeitsblatt seinen eigenen Lösungsschlüssel benötigt.',
      },
      {
        title: 'Vollständig lokalisierte Richtungsanweisungen in 11 Sprachen',
        description:
          'Alle Richtungsanweisungstexte sind vollständig in 11 unterstützte Sprachen übersetzt: Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Grundrichtungen (oben/unten/links/rechts) und Himmelsrichtungen (Norden/Süden/Osten/Westen) sind beide lokalisiert, zusammen mit der \"Starte bei\"-Anweisung, dem \"Bewege dich\"-Verb, der \"Feld(er)\"-Einheit und der \"Wo ist der Schatz?\"-Frage. Ein Sprachwechsel aktualisiert den gesamten Arbeitsblatttext und erzeugt authentische muttersprachliche Richtungsrätsel anstelle von nur auf Englisch basierenden Inhalten mit übersetzten Titeln. Für den deutschen Markt besonders wertvoll: \"Bewege dich nach unten 2 Felder\" statt \"Move down 2 squares\".',
      },
      {
        title: 'Bildbibliothek mit 104 thematischen Sammlungen und über 3.100 Illustrationen',
        description:
          'Durchsuchen Sie 104 thematische Bildsammlungen mit Tieren, Lebensmitteln, Fahrzeugen, Natur, Berufen, Feiertagen, Sport, Jahreszeiten und Dutzenden mehr. Jedes Thema bietet einen koordinierten Satz farbenfroher Illustrationen, die das 5×5-Raster als visuelle Orientierungspunkte befüllen. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie nach bestimmten Bildern per Stichwort. Klicken Sie ein beliebiges Bild an, um es zu Ihrem Rätsel hinzuzufügen. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen für den Einstieg; Vollzugriff schaltet alle 104 Themen für maximale kreative Vielfalt über alle Schatzsuche-Rätsel frei.',
      },
      {
        title: 'Schatzsuchenthematischer Header mit goldenem Titel in 11 Sprachen',
        description:
          'Jedes generierte Arbeitsblatt enthält einen schatzsuchenthematischen Header mit türkisem Hintergrund (#2C8C7C), bernsteinfarbenem äußerem Rahmen (#D4A574), sandfarbenem innerem Rahmen (#F4E4C1) und goldenem Titel (#D4A017) in Fredoka-Schrift (Gewicht 700, adaptive 36–48px Größe). Die Beschreibung erscheint in Dunkelbraun (#5C4033) in Quicksand (Gewicht 500). Hochformat-Arbeitsblätter zeigen einen vollständigen Header (100px Höhe); Querformat-Arbeitsblätter verwenden ein kompaktes Layout (70px Höhe). Der Titel \"Schatzsuche\" und die Beschreibung \"Follge den Hinweisen und finde den Schatz!\" übersetzen automatisch in alle 11 unterstützten Sprachen.',
      },
      {
        title: 'Druckfertiger PDF- und JPEG-Export mit 300 DPI und Graustufen-Option',
        description:
          'Laden Sie Schatzsuche-Rätsel und Lösungsschlüssel als hochauflösende JPEG-Bilder oder druckfertige PDF-Dokumente mit 300 DPI (6× JPEG-Multiplikator, 3× PDF-Multiplikator) herunter. Vier dedizierte Download-Buttons im Dropdown-Menü exportieren Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF separat. Seitengrößen umfassen Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) und völlig benutzerdefinierte Dimensionen. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen, die Tonerkosten sparen. Jeder Export ist produktionsfertig für digitale Downloads, gedruckte Arbeitsbücher und Produktmaterialien.',
      },
    ],
  },

  businessUseCases: {
    title: 'Schatzsuche-Arbeitsblätter online verkaufen',
    cases: [
      {
        title: 'Thematische Schatzsuche-Pakete auf Etsy',
        description:
          'Erstellen Sie thematische Schatzsuche-Pakete mithilfe der 104 Bildsammlungen — Tier-Schatzsuchen, Ozean-Schatzsuchen, Weltraum-Schatzsuchen, Feiertags-Schatzsuchen und Dutzende mehr. Jedes Thema bietet genug Illustrationen für mehrere einzigartige Rätsel, da der Generator pro Rätsel 6 zufällige Bilder auswählt und einzigartige Startpositionen und Bewegungssequenzen erstellt. Verpacken Sie 10–20 Schatzsuche-Arbeitsblätter pro Thema mit beigelegten Lösungsschlüsseln und verkaufen Sie zu 3–7 € pro Paket auf Etsy.de. Mischen Sie Grundrichtungs- und Himmelsrichtungs-Typen innerhalb eines einzelnen Pakets für progressive Schwierigkeitsstufen. Das Koordinatenraster-Format und die thematischen Bilder erzeugen visuell ansprechende Produkt-Thumbnails, die sich von einfachen Textaufgaben in Etsy-Suchergebnissen deutlich abheben.',
        platform: 'Etsy (etsy.de)',
      },
      {
        title: 'Richtungskompetenz-Arbeitsbücher auf Amazon KDP',
        description:
          'Stellen Sie 40–80 Schatzsuche-Arbeitsblätter zu einem gedruckten Arbeitsbuch im Amazon-KDP-Format zusammen. Strukturieren Sie Kapitel nach Progression: Kapitel 1 verwendet Grundrichtungen (oben/unten/links/rechts) für grundlegendes räumliches Vokabular, Kapitel 2 führt Himmelsrichtungen (Norden/Süden/Osten/Westen) für Kompassrichtungs-Kompetenz ein. Organisieren Sie Themen über Abschnitte hinweg — Tiere, Fahrzeuge, Natur, Feiertage — mit Lösungsschlüsseln am Ende des Buches. Der Graustufen-Schalter erzeugt tintenschonende Seiten für Schwarzweiß-Buchinhalte, ideal für kostengünstige Taschenbuch-Produktion. Richtungsbasierte Wegfindungs-Arbeitsbücher füllen eine einzigartige Nische im Aktivitätsbuch-Markt auf Amazon.de, da sie Koordinatenkompetenz mit spannender Schatzsuche-Thematik verbinden.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Mehrsprachige Schatzsuche-Sets mit lokalisierten Richtungsanweisungen',
        description:
          'Nutzen Sie die vollständig lokalisierten Richtungsanweisungen, um Schatzsuche-Arbeitsblätter in 11 Sprachen zu erstellen. Dieselbe Rätselstruktur erzeugt authentische muttersprachliche Inhalte, wenn Sie die Sprache wechseln — Richtungsanweisungen, Instruktionen und Bildbeschriftungen aktualisieren sich automatisch. \"Bewege dich nach oben 2 Felder\" auf Deutsch, \"Move up 2 squares\" auf Englisch, \"Déplace-toi vers le haut de 2 cases\" auf Französisch. Erstellen Sie mehrsprachige Schatzsuche-Pakete, bei denen jede Sprachversion dieselben thematischen Bilder verwendet, aber lokalisierte Richtungsanweisungen produziert. Besonders wertvoll für Sprachlernmaterialien zum Thema Richtungsvokabular, mehrsprachige Produkterstellungsressourcen und internationale Homeschool-Familien. Verkaufen Sie sprachspezifische Pakete oder mehrsprachige Mega-Pakete zu Premium-Preisen.',
        platform: 'Etsy / Gumroad (mehrsprachiger Markt)',
      },
      {
        title: 'Koordinatenraster-Aktivitäten für den Gumroad',
        description:
          'Erstellen Sie sofort einsetzbare Koordinatenraster-Aktivitäten, die räumliches Denken und Kartenkompetenz fördern. Das 5×5-Buchstaben-Zahlen-Raster (A–E Zeilen, 1–5 Spalten) führt in Koordinatensysteme ein, die in Geografie, Mathematik und Sachunterricht verwendet werden. Auf dem Gumroad werden Koordinatenraster-Aktivitäten geschätzt, die klare visuelle Raster, sequenzielle Anweisungen und gedruckte Lösungsschlüssel bieten. Erstellen Sie lehrplanorientierte Sets: Paaren Sie Grundrichtungs-Schatzsuchen mit Himmelsrichtungs-Versionen für gestufte Produktpakete. Jedes Set enthält Arbeitsblätter und Lösungsschlüssel in PDF- und JPEG-Formaten. Das Schatzsuche-Format macht trockene Koordinatenübungen zu spannenden Wegfindungs-Abenteuern.',
        platform: 'Gumroad',
      },
      {
        title: 'Saisonale Schatzsuche-Sammlungen',
        description:
          'Die 104 thematischen Bildsammlungen decken jeden saisonalen und Feiertagsanlass ab — Weihnachts-Schatzsuchen, Halloween-Schatzsuchen, Oster-Schatzsuchen, Valentinstag-Schatzsuchen, Schulanfangs-Schatzsuchen, Sommerferien-Schatzsuchen und mehr. Erstellen Sie aktuell verfügbare Schatzsuche-Sammlungen, die mit den Spitzen-Einkaufsperioden übereinstimmen. Veröffentlichen Sie Halloween-Schatzsuche-Pakete im September, Weihnachts-Schatzsuche-Sammlungen im Oktober und Valentinstag-Rätsel im Januar. Fügen Sie sowohl Grundrichtungs- als auch Himmelsrichtungs-Typen in jedes saisonale Paket für maximalen Wert ein. Saisonale Produkte erzielen während ihrer Spitzenzeiten höhere Preise und fördern natürliche Anlässe für Wiederholungskäufe. Nutzen Sie die sprachabhängige Generierung, um saisonale Pakete gleichzeitig auf dem deutschen, französischen und spanischen Markt zu veröffentlichen.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonal)',
      },
    ],
  },

  faq: [
    {
      question: 'Was ist ein Schatzsuche-Arbeitsblatt und wie funktioniert das Rätsel?',
      answer:
        'Ein Schatzsuche-Arbeitsblatt ist ein Wegfindungs-Rätsel auf einem 5×5-Koordinatenraster mit Buchstabenzeilen (A–E) und Zahlenspalten (1–5). Sechs thematische Bilder werden als visuelle Orientierungspunkte über das Raster verteilt. Das Arbeitsblatt bietet 5 Anweisungszeilen: eine Startposition (z. B. \"Starte bei A3\"), genau 4 Richtungsbewegungen (z. B. \"Bewege dich nach unten 2 Felder\") und eine abschließende Frage \"Wo ist der Schatz?\" Die Löser befolgen die sequenziellen Anweisungen auf dem Raster, um zu bestimmen, welche Zelle den Schatz enthält. Das strukturierte Format macht Schatzsuche-Rätsel sowohl als eigenständige Aktivitäten als auch als Teil größerer Arbeitsblatt-Pakete für den Verkauf auf Etsy.de und Amazon geeignet.',
    },
    {
      question: 'Wie funktioniert das 5×5-Koordinatenraster?',
      answer:
        'Das Raster besteht aus 25 Zellen, angeordnet in 5 Zeilen (beschriftet A bis E) und 5 Spalten (beschriftet 1 bis 5). Jede Zelle wird durch eine Buchstaben-Zahlen-Koordinate identifiziert wie A1, B3 oder E5. Sechs thematische Bilder belegen 6 der 25 Zellen als visuelle Orientierungspunkte. Die Startposition und alle 4 Bewegungen bleiben innerhalb der Rastergrenzen (Zeilen A–E, Spalten 1–5), was sicherstellt, dass jedes Rätsel lösbar ist. Dieses Buchstaben-Zahlen-Koordinatensystem führt in die Rasterreferenz-Kompetenzen ein, die in Karten, Diagrammen und Mathematik verwendet werden. Für Verkäufer bietet das 5×5-Format eine ideale Balance zwischen Komplexität und Zugänglichkeit für eine breite Altersspanne.',
    },
    {
      question: 'Was sind die zwei Richtungstypen und wie unterscheiden sie sich?',
      answer:
        'Der Grundrichtungen-Modus verwendet oben, unten, links und rechts — vertraute Richtungswörter für Vorschule bis 1. Klasse, um grundlegendes räumliches Vokabular aufzubauen. Der Himmelsrichtungen-Modus verwendet Norden, Süden, Osten und Westen — Kompassrichtungen, geeignet ab der 2. Klasse für fortgeschrittenes räumliches Denken. Beide Modi erzeugen dieselbe 4-Bewegungen-Rätselstruktur auf demselben 5×5-Raster. Der Richtungstyp-Schalter ermöglicht progressive Schwierigkeitsstufen: Beginnen Sie mit Grundrichtungs-Arbeitsblättern und steigern Sie sich zu Himmelsrichtungs-Arbeitsblättern mit identischen Themen. Für Verkäufer bedeutet das zwei verschiedene Produktvarianten aus derselben Themenauswahl — doppelte Produktpalette bei minimalem Mehraufwand.',
    },
    {
      question: 'Warum hat jedes Rätsel genau 4 Bewegungen?',
      answer:
        'Die konsistente 4-Bewegungen-Struktur erzeugt ein standardisiertes Rätselformat, das zuverlässig auf dem 5×5-Raster funktioniert. Vier Bewegungen bieten genug Komplexität für sinnvolle Wegfindung, ohne jüngere Löser zu überfordern. Jedes Rätsel folgt demselben 5-Zeilen-Anweisungsformat: Startposition, 4 sequenzielle Bewegungen und die \"Wo ist der Schatz?\"-Frage. Diese Konsistenz macht Schatzsuche-Arbeitsblätter vorhersehbar für die Löser und einfach in strukturierte Aktivitäts-Sets für Verkäufer zu verpacken. Das standardisierte Format ermöglicht auch eine klare progressive Schwierigkeitssteigerung durch den Wechsel von Grundrichtungen zu Himmelsrichtungen.',
    },
    {
      question: 'Wie werden die 6 Bilder im Rätsel verwendet?',
      answer:
        'Sechs thematische Bilder werden über die 25 Zellen des 5×5-Rasters als visuelle Orientierungspunkte verteilt. Sie machen das Raster visuell ansprechend und helfen den Lösern, sich während des Befolgens der Richtungsanweisungen zu orientieren. Sie können das Raster mit drei Methoden befüllen: Aus Thema generieren (Standard) wählt automatisch 6 zufällige Bilder aus dem gewählten Thema, Manuelle Bildauswahl lässt Sie die Bibliothek durchsuchen und per Klick genau 6 Bilder auswählen, und Eigene Bilder hochladen ermöglicht das Hinzufügen eigener JPEG-, PNG-, GIF- oder WebP-Dateien. Die thematischen Bilder erzeugen visuell kohärente Schatzsuche-Arbeitsblätter, die sich in Etsy-Produkt-Listings hervorragend präsentieren.',
    },
    {
      question: 'Ist der Schatzsuche-Generator sprachabhängig?',
      answer:
        'Ja. Der Schatzsuche-Generator ist auf zwei Ebenen sprachabhängig. Erstens sind alle Richtungsanweisungstexte — Startanweisungen, Bewegungsrichtungen (Grundrichtungen und Himmelsrichtungen), Feldeinheiten und die Schatzfrage — vollständig in die ausgewählte Sprache über alle 11 unterstützten Sprachen übersetzt. Zweitens aktualisieren sich Bildinhalte aus der Bibliothek basierend auf der ausgewählten Sprache. Ein Sprachwechsel erzeugt authentische muttersprachliche Schatzsuche-Arbeitsblätter mit lokalisierten Richtungsanweisungen und Bildern. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen; Vollzugriff schaltet alle 104 Themen und alle 11 Sprachen frei. Für deutsche Verkäufer: \"Bewege dich nach rechts 3 Felder\" statt \"Move right 3 squares\" — authentische deutsche Schatzsuche-Erlebnisse.',
    },
    {
      question: 'Wie werden die Richtungsanweisungen lokalisiert?',
      answer:
        'Alle Richtungsvokabeln sind in 11 Sprachen übersetzt: Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch. Grundrichtungen (oben/unten/links/rechts) und Himmelsrichtungen (Norden/Süden/Osten/Westen) haben beide vollständige Übersetzungen, zusammen mit der \"Starte bei\"-Anweisung, dem \"Bewege dich\"-Verb, der \"Feld(er)\"-Einheit und der \"Wo ist der Schatz?\"-Frage. Zum Beispiel wird im deutschen Grundrichtungen-Modus \"Move down 2 squares\" zu \"Bewege dich nach unten 2 Felder\" mit nativem Richtungsvokabular. Der Header-Titel \"Schatzsuche\" und die Beschreibung übersetzen ebenfalls automatisch. So entstehen keine oberflächlich übersetzten, sondern echte muttersprachliche Richtungsrätsel.',
    },
    {
      question: 'Wie funktioniert der automatisch generierte Lösungsschlüssel?',
      answer:
        'Der Generator verwendet ein Dual-Canvas-System mit einem Arbeitsblatt-Tab und einem Lösungsschlüssel-Tab, jeweils mit separaten Rückgängig/Wiederherstellen-Stapeln. Das Arbeitsblatt zeigt das 5×5-Raster mit verteilten Bildern und Richtungsanweisungen — bereit zum Lösen. Der Lösungsschlüssel reproduziert das identische Layout und hebt die finale Schatzzelle in Blassgelb (rgba(255, 250, 205, 0.8)) mit einem dunkelgrauen Rahmen hervor, sodass das Ziel sofort sichtbar ist. Beide Versionen werden separat über vier dedizierte Download-Buttons exportiert: Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF. Für Verkäufer spart dieser automatische Ansatz erhebliche Produktionszeit bei der Erstellung von Schatzsuche-Paketen.',
    },
    {
      question: 'Gibt es eine kostenlose Testversion?',
      answer:
        'Ja. Sie können jede Funktion nutzen — beide Richtungstypen, das 5×5-Koordinatenraster, die 6-Bilder-Rätselgenerierung, den automatisch generierten Lösungsschlüssel, die vollständige Bildbibliothek mit 104 Themen, Hintergrund- und Rahmenthemen mit unabhängigen Deckkraftreglern, alle Download-Formate in 300 DPI und den Graustufen-Schalter — ohne ein Konto zu erstellen, eine Kreditkarte einzugeben oder Software zu installieren. Downloads der kostenlosen Testversion enthalten ein kleines Wasserzeichen. Eine kommerzielle Lizenz entfernt das Wasserzeichen und gewährt volle Verkaufsrechte.',
    },
    {
      question: 'Kann ich Hintergrund- und Rahmenthemen zu Schatzsuche-Arbeitsblättern hinzufügen?',
      answer:
        'Ja. Das Seiten-Panel enthält sowohl einen Hintergrundthema-Wähler mit Deckkraftregler (0–1 in 0,05-Schritten) als auch einen Rahmenthema-Wähler mit eigenem unabhängigem Deckkraftregler. Hintergrundthemen fügen dekorative Muster hinter dem Koordinatenraster und den Richtungsanweisungen hinzu, während Rahmenthemen die Seite umrahmen. Beide haben separate Deckkraftregler, sodass Sie dezente Hintergründe mit markanten Rahmen erstellen können, oder jede Kombination, die zu Ihrem Design passt. Diese visuellen Elemente erhöhen die wahrgenommene Qualität Ihrer Schatzsuche-Arbeitsblätter für Marktplatz-Listings und heben Ihre Produkte von Wettbewerbern mit schlichten Designs ab.',
    },
    {
      question: 'Was ist Ihre Rückgabepolitik?',
      answer:
        'Da die kostenlose Testversion Ihnen vollständigen Zugang zu jeder Funktion gewährt, bieten wir keine Rückerstattung für kommerzielle Lizenzen an. Sie können beide Richtungstypen, das 5×5-Koordinatenraster, die 6-Bilder-Rätselgenerierung, den automatisch generierten Lösungsschlüssel mit hervorgehobener Schatzzelle, die vollständige Bildbibliothek mit 104 thematischen Sammlungen, Hintergrund- und Rahmenthemen mit unabhängigen Deckkraftreglern, die lokalisierten Richtungsanweisungen und alle Download-Formate in 300 DPI vor dem Kauf ausgiebig testen. Die kostenlose Testversion ist die Rückgabepolitik — stellen Sie sicher, dass das Tool Ihren Anforderungen entspricht, bevor Sie eine Lizenz erwerben. Es ist keine zeitliche Begrenzung für die Testphase vorgesehen.',
    },
    {
      question: 'Sind die Arbeitsblätter für die Grundschule geeignet?',
      answer:
        'Ja. Die Arbeitsblätter eignen sich für die Grundschule (Deutschland), Volksschule (Österreich) und Primarschule (Schweiz). Sie können den Schwierigkeitsgrad an verschiedene Klassenstufen anpassen — von der 1. Klasse bis zur 4. Klasse. Auch Vorschulkinder und Kindergartenkinder profitieren von den einfacheren Übungsstufen.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'suchen-und-zaehlen-arbeitsblaetter',
      anchorText: 'Suchen-und-Zählen-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'suchbilder-arbeitsblaetter',
      anchorText: 'Suchbilder-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilderkreuzwortraetsel-arbeitsblaetter',
      anchorText: 'Bilderkreuzworträtsel-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilderpfad-arbeitsblaetter',
      anchorText: 'Labyrinth-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'praepositionen-arbeitsblaetter',
      anchorText: 'Präpositionen-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'mathe-raetsel-arbeitsblaetter',
      anchorText: 'Mathe-Rätsel-Arbeitsblatt-Generator',
    },
    {
      pageType: 'bundle',
      slug: 'suchen-finden-paket',
      anchorText: 'Suchen-und-Finden-Paket — Alle Such-Apps in einem Paket',
    },
    {
      pageType: 'idea',
      slug: 'camping-druckvorlagen-ideen',
      anchorText: 'Camping-Druckvorlagen-Ideen für Outdoor-Lernen',
    },
    {
      pageType: 'idea',
      slug: 'meerestiere-druckvorlagen-ideen',
      anchorText: 'Meerestiere-Druckvorlagen-Ideen für maritime Themen',
    },
    {
      pageType: 'start',
      slug: 'marketing-druckvorlagen-geschaeft',
      anchorText: 'Marketing für Ihr Druckvorlagen-Geschäft',
    },
    {
      pageType: 'guide',
      slug: 'schatzsuche-arbeitsblaetter-erstellen',
      anchorText: 'Schatzsuche-Arbeitsblätter erstellen',
    },
    {
      pageType: 'tool',
      slug: 'treasure-hunt-worksheet-maker',
      anchorText: 'Looking for the free browser version? Try the free maker tool.',
    },
    {
      pageType: 'tool',
      slug: 'kdp-royalty-calculator',
      anchorText: 'Calculate KDP royalties for your activity books',
    },
    {
      pageType: 'tool',
      slug: 'kdp-size-calculator',
      anchorText: 'Pick the right KDP book size & margins',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/german/treasure%20hunt/worksheet.webp',
      primaryAlt: 'Schatzsuche-Arbeitsblatt mit 5×5-Koordinatenraster, verteilten Bildern, Richtungsanweisungen und schatzsuchenthematischem Header',
    },
    sampleGallery: [
      {
        src: '/samples/german/treasure%20hunt/worksheet.webp',
        alt: 'Schatzsuche-Rätsel mit 6 thematischen Bildern auf einem 5×5-Raster und Grundrichtungs-Anweisungen',
        caption: 'Grundrichtungen-Modus — oben, unten, links und rechts folgen, um den Schatz zu finden',
      },
      {
        src: '/samples/german/treasure%20hunt/worksheet-1.webp',
        alt: 'Schatzsuche-Rätsel mit Himmelsrichtungs-Anweisungen (Norden, Süden, Osten, Westen)',
        caption: 'Himmelsrichtungen-Modus — Kompassrichtungen für fortgeschrittenes räumliches Denken',
      },
      {
        src: '/samples/german/treasure%20hunt/answer-key.webp',
        alt: 'Schatzsuche-Lösungsschlüssel mit finaler Schatzzelle in Blassgelb hervorgehoben auf dem Koordinatenraster',
        caption: 'Automatisch generierter Lösungsschlüssel — Blassgelbe Hervorhebung markiert die Schatzzelle',
      },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Schatzsuche-Arbeitsblätter mit Richtungsanweisungen und automatischen Lösungsschlüsseln erstellen — Schritt-für-Schritt-Anleitung',
  },
};

export default content;
