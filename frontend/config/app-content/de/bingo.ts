import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'Bingo Karten erstellen',
    secondaryKeywords: [
      'Bingo Karten Generator',
      'Bilder-Bingo erstellen',
      'eigene Bingo Karten erstellen',
      'Bingo-Spiel Generator',
    ],
    lsiKeywords: [
      'Bingo-Spiel',
      'Bingo-Brett',
      'Klassen-Bingo',
      'Party-Bingo',
      'Aufrufkarten',
    ],
    titleTag: 'Bingo-Karten erstellen | Bilder-Bingo Generator',
    metaDescription: 'Erstellen Sie Bilder-Bingo-Karten mit 3.000+ Themenbildern. Einzigartige Karten pro Set, druckfertige PDFs. Kostenlos testen — kommerzielle Lizenz.',
  },

  hero: {
    title: 'Bingo-Karten erstellen — Bilder-Bingo Generator',
    tagline: 'Generieren Sie 1–10 einzigartige Bingo-Karten pro Stapel mit konfigurierbaren Rastern von 3×3 bis 5×5 — Bild- oder Wort-Füllung für Kartenzellen und runde Chips unabhängig wählbar, ein eigenes Ansageblatt für den Spielleiter, ZIP-Stapelexport aller Karten und 104 thematische Bildsammlungen.',
    description:
      'Erstellen Sie Bilder-Bingo-Karten mit dem Bingo-Generator und verkaufen Sie druckbare Bingo-Sets auf Etsy, Amazon KDP oder Gumroad. Generieren Sie 1 bis 10 einzigartige Karten pro Stapel mit Rastern von 3×3 bis 5×5 — Bild- oder Wort-Füllung für Zellen und Chips unabhängig wählbar. Jeder Stapel enthält ein separates Ansageblatt für den Spielleiter. Der ZIP-Stapelexport liefert alle Karten in einer Datei. Die Wort-Füllung ist sprachabhängig mit lokalisierten Bildnamen in 11 Sprachen. Über 3.100 Illustrationen in 104 Themen liefern abwechslungsreiche Inhalte. Exportieren Sie druckfertige PDFs und JPEGs mit 300 DPI in Letter, A4 oder benutzerdefinierten Größen. Die kommerzielle Lizenz umfasst 10 Themen; Vollzugriff schaltet alle 104 Themen und 11 Sprachen frei. Kostenlos testen mit Wasserzeichen.',
  },

  ctaHeading: 'Bingo-Karten erstellen',

  howItWorks: {
    title: 'Bilder-Bingo-Karten erstellen in 5 Schritten',
    steps: [
      {
        title: 'Seitenlayout festlegen',
        description:
          'Öffnen Sie das Seiten-Setup-Panel und wählen Sie eine Seitengröße: Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) oder eine beliebige benutzerdefinierte Dimension. Wählen Sie eine Seitenfarbe mit dem Farbwähler als Fallback-Hintergrund. Wählen Sie ein Hintergrundthema und passen Sie dessen Deckkraft an (0–1, Schrittweite 0,05), dann wählen Sie ein Rahmenthema mit eigenem unabhängigem Deckkraftregler. Diese Layout-Einstellungen rahmen Ihre Bingo-Karte, bevor Sie Inhalte konfigurieren.',
      },
      {
        title: 'Bingo-Karten-Einstellungen konfigurieren',
        description:
          'Öffnen Sie das Bingo-Karten-Einstellungen-Panel und legen Sie Zeilen (3–5) und Spalten (3–5) fest, um die Rastergröße zu definieren — der Standard ist 4×4 mit 16 Zellen. Stellen Sie die Kartenanzahl von 1 bis 10 ein, um mehrere einzigartige Bingo-Karten im Stapel zu generieren. Wählen Sie die Kartenzellen-Füllung (Bild oder Wort) und die Chip-Füllung (Bild oder Wort) unabhängig voneinander — kombinieren Sie Bildkarten mit Wort-Chips, Wortkarten mit Bild-Chips oder verwenden Sie für beides denselben Modus. Aktivieren Sie das Kontrollkästchen \"Benutzerdefinierte Auswahl verwenden\", um bestimmte Bilder für die Ansage von Hand auszuwählen, anstatt die automatische Auswahl zu nutzen.',
      },
      {
        title: 'Bilder aus der Bibliothek auswählen',
        description:
          'Öffnen Sie das Bildbibliothek-Panel und durchsuchen Sie 104 thematische Sammlungen mit über 3.100 farbenfrohen Illustrationen — Tiere, Lebensmittel, Fahrzeuge, Natur, Feiertage und Dutzende mehr. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie per Stichwort. Klicken Sie auf Bilder, um sie für Ihre Bingo-Karten auszuwählen. Wenn die benutzerdefinierte Ansage-Auswahl aktiviert ist, erscheinen gewählte Bilder im Ansage-Pool mit einem Live-Zähler, der Ihre Auswahlanzahl anzeigt. Sie können auch eigene PNG-, JPG- oder GIF-Bilder über das Panel \"Eigene Bilder hochladen\" verwenden.',
      },
      {
        title: 'Bingo-Karten generieren',
        description:
          'Klicken Sie auf \"Generieren\", um Ihre Bingo-Karten zu erstellen. Die App füllt Ihr konfiguriertes Raster mit Bildern oder Wörtern aus dem gewählten Thema und erstellt runde Chips mit gestrichelten Rändern unterhalb der Karte — Chips werden per Fisher-Yates-Algorithmus gemischt, sodass sie niemals direkt dem Kartenlayout entsprechen. Wenn Sie mehrere Karten angefordert haben, zieht jede Karte eine andere zufällige Auswahl aus dem Bilderpool, wodurch garantiert wird, dass jede Karte im Stapel einzigartig ist. Die erste Karte erscheint sofort auf der Arbeitsfläche; alle Karten sind im ZIP-Stapelexport enthalten.',
      },
      {
        title: 'Karten und Ansageblatt herunterladen',
        description:
          'Wechseln Sie zwischen dem Tab \"Karten + Chips\" und dem Tab \"Ansage\", um beide Ausgaben in der Vorschau zu sehen. Das Ansageblatt zeigt ein dynamisches Wortraster mit einheitlicher Schriftgröße und Spalten basierend auf der längsten Wortlänge. Laden Sie einzelne Karten als JPEG oder PDF über die dedizierten Buttons herunter oder exportieren Sie alle generierten Karten als einzelne JPEGs in einer einzigen bingo_cards.zip-Datei per Stapelexport. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen. Jeder Export wird mit 300 DPI gerendert und ist produktionsfertig für Etsy-Listings, Amazon-KDP-Buchinhalte und Gumroad-Produktdateien.',
      },
    ],
  },

  keyFeatures: {
    title: 'Hauptfunktionen des Bilder-Bingo-Karten-Generators',
    features: [
      {
        title: 'Konfigurierbares Bingo-Raster von 3×3 bis 5×5 mit unabhängiger Zeilen- und Spaltensteuerung',
        description:
          'Stellen Sie Zeilen und Spalten unabhängig von 3 bis 5 ein und erstellen Sie Raster von 3×3 (9 Zellen) bis 5×5 (25 Zellen). Der Standard ist 4×4 (16 Zellen), was gut für Standard-Bingo-Karten funktioniert. Ein 3×3-Raster eignet sich für schnelle Bingo-Runden mit weniger zu verfolgenden Elementen, während ein 5×5-Raster das klassische 25-Zellen-Bingo-Erlebnis für längere Spiele bietet. Der Rasterbereich nutzt 60% der verfügbaren Canvas-Höhe (begrenzt auf 500px) für optimale Kartenproportionen. Die unabhängige Zeilen- und Spaltensteuerung ermöglicht nicht-quadratische Raster wie 3×5 oder 5×3 für einzigartige Bingo-Kartenformate, die sich in Marktplatz-Listings von der Konkurrenz abheben.',
      },
      {
        title: 'Stapel-Generierung von 1–10 einzigartigen Bingo-Karten pro Arbeitsblatt',
        description:
          'Generieren Sie 1 bis 10 einzigartige Bingo-Karten in einem einzigen Stapel. Jede Karte zieht eine andere zufällige Auswahl aus dem Bilderpool, sodass keine zwei Karten im Stapel dasselbe Layout haben. Dies ist essenziell für Bingo: Jeder Spieler braucht eine andere Karte, damit das Spiel funktioniert. Die erste Karte wird auf der Arbeitsfläche für eine sofortige Vorschau angezeigt. Alle generierten Karten stehen für den Stapelexport bereit. Dieser Stapel-Ansatz bedeutet, dass Sie ein komplettes Set von 10 einzigartigen Bingo-Karten mit einem Klick produzieren können, anstatt sie einzeln zu generieren und zu speichern.',
      },
      {
        title: 'ZIP-Stapelexport aller generierten Karten als einzelne JPEG-Dateien',
        description:
          'Exportieren Sie alle generierten Bingo-Karten in einem einzigen bingo_cards.zip-Download. Jede Karte wird als einzelne hochauflösende JPEG-Datei im ZIP-Archiv gespeichert und sequenziell benannt für einfache Organisation und sofortige Produktverpackung. Dieser Stapelexport eliminiert den mühsamen Prozess, Karten einzeln herunterzuladen — generieren Sie 10 einzigartige Karten, klicken Sie einen Button und erhalten Sie ein komplettes Bingo-Karten-Set, das für die Verpackung in Ihr Marktplatz-Produkt bereit ist. Der ZIP-Export nutzt JSZip für zuverlässige browserweite Komprimierung und funktioniert neben den Standard-Buttons für einzelne JPEG- und PDF-Downloads.',
      },
      {
        title: 'Duale Füllmodi: Bild oder Wort für Kartenzellen und runde Chips unabhängig wählbar',
        description:
          'Kartenzellen und Chips haben jeweils eine unabhängige Füllmodus-Auswahl — Bild oder Wort. Die Bild-Füllung zeigt thematische Illustrationen in Kartenzellen oder als runde Chip-Muster. Die Wort-Füllung zeigt lokalisierte Bildnamen als Text an — da der Generator sprachabhängig ist, ändern sich die Wörter je nach gewählter Sprache. Mischen Sie Modi für kreative Vielfalt: Bildkarten mit Wort-Chips erzeugen eine Bild-zu-Text-Zuordnungsherausforderung, während Wortkarten mit Bild-Chips die Dynamik umkehren. Runde Chips haben gestrichelte Ränder (#666, strokeDashArray [5,5]) und werden per Fisher-Yates-Algorithmus gemischt, sodass sie niemals das Kartenlayout spiegeln. Dieses duale Füllsystem erzeugt vier verschiedene Bingo-Kartenstile aus einem einzigen Generator und vervielfacht so Ihre Produktmöglichkeiten.',
      },
      {
        title: 'Eigenes Ansageblatt mit dynamischem Wortraster für den Spielleiter',
        description:
          'Jedes Bingo-Karten-Set enthält ein begleitendes Ansageblatt auf einem separaten Tab. Das Ansageblatt zeigt ein dynamisches Raster aller einzigartigen Wörter aus dem Bilderpool — der Spielleiter liest diese laut vor, während die Spieler ihre Karten markieren. Spalten werden basierend auf der längsten Wortlänge berechnet (2–6 Spalten) mit einheitlicher Schriftgröße über alle Einträge für saubere Lesbarkeit. Das Raster ist auf der Seite zentriert und übernimmt Seitenränder und Hintergrund von der Arbeitsfläche. Aktivieren Sie die benutzerdefinierte Ansage-Auswahl, um bestimmte Bilder für den Ansage-Pool von Hand auszuwählen, mit einem Live-Zähler, der Ihre Auswahlanzahl anzeigt.',
      },
      {
        title: 'Bildbibliothek mit 104 thematischen Sammlungen und über 3.100 Illustrationen',
        description:
          'Durchsuchen Sie 104 thematische Bildsammlungen mit Tieren, Lebensmitteln, Fahrzeugen, Natur, Berufen, Feiertagen, Sport, Jahreszeiten und Dutzenden mehr. Jedes Thema bietet einen koordinierten Satz farbenfroher Illustrationen, die in Bingo-Aktivitäten harmonisch zusammenwirken — thematische Bingo-Karten gehören zu den beliebtesten druckbaren Produkten auf Etsy und dem Gumroad. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie nach bestimmten Bildern per Stichwort. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen für den Einstieg; Vollzugriff schaltet alle 104 Themen für maximale kreative Vielfalt über alle Rastergrößen und Füllmodi frei.',
      },
      {
        title: 'Druckfertiger PDF- und JPEG-Export mit 300 DPI und Graustufen-Option',
        description:
          'Laden Sie Bingo-Karten und Ansageblätter als hochauflösende JPEG-Bilder oder druckfertige PDF-Dokumente mit 300 DPI herunter (6×-Multiplikator, JPEG-Qualität 1.0). Vier dedizierte Buttons exportieren Arbeitsblatt-JPEG, Ansageblatt-JPEG, Arbeitsblatt-PDF und Ansageblatt-PDF separat. Seitengrößen umfassen Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) und völlig benutzerdefinierte Dimensionen. Die PDF-Ausrichtung wird automatisch erkannt. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen, die Toner sparen. Jeder Export ist produktionsfertig für digitale Downloads, gedruckte Spielesets und Produktmaterialien.',
      },
      {
        title: 'Vollständige Canvas-Bearbeitung mit Textwerkzeugen, Ausrichtung und Ebenensteuerung',
        description:
          'Die Fabric.js-Arbeitsfläche bietet vollständige Kontrolle über jedes Element auf Ihrer Bingo-Karte. Verschieben, skalieren, drehen und positionieren Sie Bilder, Text und generierte Inhalte frei. Die Ebenensteuerung verwaltet die Stapelreihenfolge — bringen Sie Elemente nach vorne oder senden Sie sie nach hinten. Sperren Sie fertige Elemente, während Sie andere bearbeiten. Fügen Sie benutzerdefinierten Text mit sieben Schriftarten hinzu (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), mit einstellbarer Größe und Farbe sowie Textumriss-Breite von 0 bis 10 mit 0,5-Schritt-Granularität. Sechs Ausrichtungsoptionen plus Auf-Seite-Zentrieren sorgen für präzise Layouts. Zoomen Sie von 50% bis 200% in 10%-Schritten für Detailarbeit. Rückgängig und Wiederholen mit bis zu 20 Verlaufszuständen über Strg+Z und Strg+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Bilder-Bingo-Karten online verkaufen',
    cases: [
      {
        title: 'Thematische Bingo-Karten-Pakete auf Etsy',
        description:
          'Erstellen Sie thematische Bingo-Karten-Pakete mit den 104 Bildsammlungen — Tier-Bingo, Lebensmittel-Bingo, Fahrzeug-Bingo, Feiertags-Bingo und Dutzende mehr. Jedes Thema bietet genügend Illustrationen für einzigartige Karten über verschiedene Rastergrößen hinweg. Verpacken Sie 10–30 einzigartige Bingo-Karten pro Thema mit beigelegten Ansageblättern und verkaufen Sie zu €3–€8 pro Paket. Nutzen Sie die Stapel-Generierung, um 10 einzigartige Karten pro Set in Sekunden zu erstellen, und mischen Sie dann Rastergrößen innerhalb eines einzelnen Pakets: 3×3-Schnellspiel-Karten, 4×4-Standard-Karten und 5×5-Langspiel-Karten für Abwechslung. Der ZIP-Stapelexport optimiert die Produktion für Vielmengen-Verkäufer und macht die Erstellung großer Produktkataloge mit thematischen Bingo-Karten-Sets effizient und zeitsparend. Bieten Sie zusätzlich Varianten in Bild- und Wort-Füllung an, um aus einem einzigen Thema mehrere Produktvarianten zu erzeugen, die unterschiedliche Käufergruppen ansprechen.',
        platform: 'Etsy (etsy.de)',
      },
      {
        title: 'Bingo-Aktivitätsbücher auf Amazon KDP',
        description:
          'Stellen Sie 40–80 Bingo-Karten zu einem gedruckten Aktivitätsbuch im Amazon-KDP-Format zusammen. Strukturieren Sie Ihr Buch mit Themenkapiteln: Tiere, Lebensmittel, Fahrzeuge, Feiertage und mehr. Fügen Sie Ansageblätter nach jedem Kartenset ein, damit das Buch alles für das Spielen enthält und sofort einsatzbereit ist. Nutzen Sie den Graustufen-Schalter für tintenschonende Buchinhalte, die Druckkosten niedrig halten und als Schwarzweiß-Innenteile direkt verwendbar sind. Mischen Sie Rastergrößen für fortschreitende Schwierigkeit — beginnen Sie mit 3×3-Karten für schnelle Runden und steigern Sie bis 5×5 für längere Spiele. Bingo-Aktivitätsbücher performen ganzjährig gut auf Amazon.de und erleben Spitzenzeiten während der Ferienzeit, wenn Familien nach Gruppenaktivitäten suchen. Nutzen Sie die Wort-Füllung in Kombination mit verschiedenen Themen, um Vokabel-Bingo-Bücher zu erstellen, die Sprachlernen mit spielerischer Interaktion verbinden. Da der Generator sprachabhängig ist, können Sie mehrsprachige Bingo-Bücher erstellen, die verschiedene Sprachmärkte auf Amazon bedienen.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Bingo-Aktivitäten für den Gumroad',
        description:
          'Erstellen Sie spielfertige Bingo-Sets mit einzigartigen Spielerkarten und Ansageblättern für die Produkterstellung. Verkäufer, die nach Bingo-Aktivitäten suchen, schätzen Produkte, die sofort einsatzbereit ankommen — Karten drucken, verteilen und sofort losspielen ohne zusätzliche Vorbereitung. Erstellen Sie lehrplanorientierte Sets: Vokabel-Bingo mit der Wort-Füllung für Sprachunterricht, Bilderkennung-Bingo mit der Bild-Füllung für Sachkunde und gemischte Bingo-Sets für gestufte Produktpakete mit verschiedenen Schwierigkeitsstufen. Jedes Set enthält 10 einzigartige Karten (ausreichend für Kleingruppen) mit einem Ansageblatt. Die Wort-Füllung mit lokalisierten Bildnamen verwandelt Bingo in eine Vokabelübung — da der Generator sprachabhängig ist, können Sie Sets in verschiedenen Sprachen erstellen und so ein breites Publikum auf Gumroad erreichen. Kombinieren Sie verschiedene Rastergrößen innerhalb eines Produkts für altersgerechte Differenzierung.',
        platform: 'Gumroad',
      },
      {
        title: 'Saisonale und feiertagsbezogene Bingo-Karten-Sammlungen',
        description:
          'Die 104 thematischen Bildsammlungen decken jede saisonale und feiertagsbezogene Gelegenheit ab — Weihnachten, Halloween, Ostern, Valentinstag, Schulanfang, Sommerferien und vieles mehr. Bingo ist ein von Natur aus geselliges Spiel, das während Feiertagen Spitzenzeiten erlebt, wenn Familien und Gruppen nach gemeinsamen Aktivitäten suchen. Veröffentlichen Sie Halloween-Bingo-Sets im September, Weihnachts-Sammlungen im Oktober und Valentinstags-Pakete im Januar für maximale Sichtbarkeit während der jeweiligen Hochsaison. Jedes saisonale Set enthält verschiedene Rastergrößen, Varianten in Bild- und Wort-Füllung sowie Ansageblätter für ein spielfertiges Komplett-Paket. Saisonale Bingo-Produkte erzielen Premium-Preise während ihrer Spitzenzeiten und schaffen natürliche Gründe für Wiederholungskäufe, da Käufer zu jeder neuen Saison frische Bingo-Sets suchen. Nutzen Sie passende Hintergrund- und Rahmenthemen für ein stimmiges Saisondesign, das Käufer auf den ersten Blick anspricht und die wahrgenommene Qualität Ihres Produkts steigert.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonal)',
      },
      {
        title: 'Event-Bingo-Karten für Partys und besondere Anlässe',
        description:
          'Erstellen Sie Bingo-Karten-Sets für Partys, Babypartys, Brautduschen, Teambuilding-Events und pädagogische Workshops. Die konfigurierbaren Rastergrößen und die thematische Bildbibliothek machen es einfach, anlassbezogene Bingo-Spiele zu erstellen — Baby-Bingo für Babypartys, Lebensmittel-Bingo für Kochkurse, Tier-Bingo für Zoo-Ausflüge, Berufe-Bingo für Teambuilding-Tage. Generieren Sie 10 einzigartige Karten pro Event-Set mit einem Ansageblatt per Stapel-Generierung, verpacken Sie alles als Sofort-Download-PDF-Paket und verkaufen Sie auf Etsy.de, wo Eventplaner aktiv nach druckbaren Partyspielen suchen. Die benutzerdefinierte Ansage-Auswahl lässt Sie genau festlegen, welche Elemente im Spiel vorkommen — perfekt für thematische Events mit spezifischem Vokabular oder ausgewählten Bildern. Event-Bingo-Sets erzielen besonders hohe Margen, da sie als einzigartige, anlassbezogene Produkte wahrgenommen werden und weniger direkte Konkurrenz als generische Bingo-Vorlagen haben.',
        platform: 'Etsy (etsy.de / Eventplaner)',
      },
    ],
  },

  faq: [
    {
      question: 'Welche Rastergrößen sind für Bingo-Karten verfügbar?',
      answer:
        'Zeilen und Spalten sind unabhängig von 3 bis 5 konfigurierbar und erzeugen Raster von 3×3 (9 Zellen) bis 5×5 (25 Zellen). Der Standard ist 4×4 mit 16 Zellen. Sie können auch nicht-quadratische Raster wie 3×5 (15 Zellen) oder 5×3 (15 Zellen) für einzigartige Bingo-Kartenformate erstellen, die sich in Ihren Marktplatz-Listings von der Konkurrenz abheben. Kleinere Raster eignen sich gut für schnelle Spielrunden mit weniger zu verfolgenden Elementen, während 5×5-Raster das klassische 25-Zellen-Bingo-Erlebnis für längere, anspruchsvollere Spiele bieten.',
    },
    {
      question: 'Wie funktioniert die Stapel-Generierung für mehrere Bingo-Karten?',
      answer:
        'Stellen Sie die Kartenanzahl von 1 bis 10 im Bingo-Karten-Einstellungen-Panel ein. Jede Karte zieht eine andere zufällige Auswahl aus dem Bilderpool und garantiert so, dass jede Karte im Stapel einzigartig ist — essenziell für Bingo, wo jeder Spieler eine andere Karte braucht. Die erste Karte erscheint sofort auf der Arbeitsfläche zur Vorschau. Alle generierten Karten stehen über den ZIP-Stapelexport zum Download als einzelne JPEG-Dateien bereit.',
    },
    {
      question: 'Wie funktioniert der ZIP-Stapelexport?',
      answer:
        'Nach dem Generieren mehrerer Bingo-Karten klicken Sie auf den Stapelexport-Button, um alle Karten als einzelne hochauflösende JPEG-Dateien in einem einzigen bingo_cards.zip-Archiv herunterzuladen. Jede Karte ist sequenziell im ZIP benannt für einfache Organisation. Dies eliminiert die Notwendigkeit, Karten einzeln herunterzuladen — generieren Sie ein komplettes Set von 10 einzigartigen Karten und exportieren Sie alle mit einem Klick per JSZip-Komprimierung.',
    },
    {
      question: 'Was ist der Unterschied zwischen Kartenzellen-Füllung und Chip-Füllung?',
      answer:
        'Kartenzellen und Chips haben jeweils einen unabhängigen Füllmodus: Bild oder Wort. Die Kartenzellen-Füllung bestimmt, was in jeder Zelle des Bingo-Rasters erscheint. Die Chip-Füllung bestimmt, was auf den runden Chips unterhalb der Karte erscheint, die Spieler für die Zuordnung verwenden. Sie können Modi mischen — Bildkarten mit Wort-Chips, Wortkarten mit Bild-Chips oder beides gleich — und so vier verschiedene Bingo-Kartenstile aus einem einzigen Bilderset erzeugen.',
    },
    {
      question: 'Was ist das Ansageblatt und wie funktioniert es?',
      answer:
        'Das Ansageblatt ist eine separate Seite (erreichbar über den Ansage-Tab), die ein dynamisches Wortraster aller einzigartigen Elemente aus dem Bilderpool anzeigt. Der Spielleiter liest diese Wörter laut vor, während die Spieler ihre Bingo-Karten markieren. Spalten werden basierend auf der längsten Wortlänge berechnet (2–6 Spalten) mit einheitlicher Schriftgröße. Das Raster ist auf der Seite zentriert und übernimmt Seitenränder und Hintergrund von der Arbeitsfläche. Dies ist KEIN Lösungsschlüssel — es ist ein Referenzblatt für die Person, die das Bingo-Spiel leitet.',
    },
    {
      question: 'Was ist die benutzerdefinierte Ansage-Auswahl?',
      answer:
        'Aktivieren Sie das Kontrollkästchen \"Benutzerdefinierte Auswahl verwenden\" im Bingo-Karten-Einstellungen-Panel, um von Hand auszuwählen, welche bestimmten Bilder im Ansage-Pool erscheinen. Wenn aktiviert, klicken Sie auf Bilder in der Bildbibliothek, um sie zu Ihrer benutzerdefinierten Ansage-Auswahl hinzuzufügen — ein Live-Zähler zeigt \"Ausgewählt für benutzerdefinierte Ansage: X\" während Sie auswählen. Dies gibt Ihnen präzise Kontrolle darüber, welche Elemente im Bingo-Spiel vorkommen — nützlich für lehrplanorientierte Aktivitäten oder thematische Events, bei denen Sie bestimmtes Vokabular einsetzen möchten.',
    },
    {
      question: 'Ist der Bilder-Bingo-Karten-Generator sprachabhängig?',
      answer:
        'Ja. Bei Verwendung der Wort-Füllung für Kartenzellen oder Chips werden lokalisierte Bildnamen aus der Bildbibliothek angezeigt. Ein Sprachwechsel in den Arbeitsblatt-Einstellungen ändert die Wörter auf Karten, Chips und dem Ansageblatt. Beispielsweise zeigt ein Katzenbild \"Katze\" auf Deutsch, aber \"Cat\" auf Englisch und \"Chat\" auf Französisch. Die Bild-Füllung ist rein visuell und nicht sprachabhängig — dieselben Bildkarten funktionieren in allen Sprachmärkten ohne Änderung. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen nur auf Englisch; Vollzugriff schaltet alle 104 Themen und alle 11 Sprachen für lokalisierte Wortinhalte frei, sodass Sie Vokabel-Bingo-Sets für verschiedene Sprachmärkte erstellen und verkaufen können.',
    },
    {
      question: 'Warum gibt es keinen Lösungsschlüssel für Bingo-Karten?',
      answer:
        'Bingo-Karten verwenden ein Ansageblatt anstelle eines Lösungsschlüssels. Beim Bingo liest der Spielleiter Elemente vom Ansageblatt vor, während die Spieler passende Elemente auf ihren individuellen Karten markieren — es gibt keine einzige \"richtige Antwort\", da jede Spielerkarte unterschiedliche Elemente an unterschiedlichen Positionen hat. Das Ansageblatt dient als Referenzdokument des Spiels und listet alle möglichen Elemente auf, die der Spielleiter während des Spiels ansagen kann. Wenn Sie das Ansageblatt zusammen mit den Bingo-Karten als Produktpaket verkaufen, erhalten Ihre Käufer ein sofort spielbereites Komplett-Set.',
    },
    {
      question: 'Gibt es eine kostenlose Testversion?',
      answer:
        'Ja. Sie können jede Funktion nutzen — alle Rastergrößen, Stapel-Generierung von bis zu 10 Karten, ZIP-Stapelexport, Bild- und Wort-Füllmodi, das Ansageblatt, die vollständige Bildbibliothek, benutzerdefinierte Ansage-Auswahl, Hintergrund- und Rahmenthemen, Textwerkzeuge und alle Download-Formate — ohne ein Konto zu erstellen, eine Kreditkarte einzugeben oder Software zu installieren. Downloads der kostenlosen Testversion enthalten ein kleines Wasserzeichen. Eine kommerzielle Lizenz entfernt das Wasserzeichen und gewährt volle Verkaufsrechte.',
    },
    {
      question: 'Kann ich mit diesem Tool erstellte Bingo-Karten auf Etsy und Amazon KDP verkaufen?',
      answer:
        'Ja. Mit einer kommerziellen Lizenz haben Sie volle Rechte, Ihre Bingo-Karten als digitale Downloads auf Etsy.de, als gedruckte Aktivitätsbücher auf Amazon KDP, als Produktmaterialien auf Gumroad oder über jeden anderen Vertriebskanal zu verkaufen. Die konfigurierbaren Rastergrößen, Stapel-Generierung, ZIP-Export, dualen Füllmodi, Ansageblätter und 104 thematische Bildsammlungen geben Ihnen die kreativen Werkzeuge, um originale, verkaufsfertige Bingo-Produkte im großen Maßstab zu produzieren.',
    },
    {
      question: 'Was ist Ihre Rückgabepolitik?',
      answer:
        'Da die kostenlose Testversion Ihnen vollständigen Zugang zu jeder Funktion gewährt, bieten wir keine Rückerstattung für kommerzielle Lizenzen an. Sie können alle Rastergrößen, Stapel-Generierung, ZIP-Export, Bild- und Wort-Füllmodi, das Ansageblatt, die vollständige Bildbibliothek, benutzerdefinierte Ansage-Auswahl, Hintergrund- und Rahmenthemen, Textwerkzeuge und alle Download-Formate vor dem Kauf ausgiebig testen. Die kostenlose Testversion ist die Rückgabepolitik — stellen Sie sicher, dass das Tool Ihren Anforderungen entspricht, bevor Sie eine Lizenz erwerben.',
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
      slug: 'zuordnungs-arbeitsblaetter',
      anchorText: 'Zuordnungs-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'raster-puzzle-arbeitsblaetter',
      anchorText: 'Raster-Puzzle-Generator',
    },
    {
      pageType: 'app',
      slug: 'schattenbilder-zuordnen-arbeitsblaetter',
      anchorText: 'Schattenbilder-Zuordnen-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilder-sortieren-arbeitsblaetter',
      anchorText: 'Bilder-Sortieren-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'suchbilder-arbeitsblaetter',
      anchorText: 'Suchbilder-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'wortsuche-arbeitsblaetter',
      anchorText: 'Wortsuche-Rätsel-Generator',
    },
    {
      pageType: 'bundle',
      slug: 'zuordnung-sortierung-paket',
      anchorText: 'Zuordnung-und-Sortierung-Paket — Alle Zuordnungs-Apps in einem Paket',
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
      slug: 'bingo-karten-erstellen',
      anchorText: 'Bingo-Karten erstellen, die sich verkaufen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/german/bingo/bilder-bingo-1.webp',
      primaryAlt: 'Bilder-Bingo-Karte mit thematischen Illustrationen im Rasterlayout und runden Chips mit gestrichelten Rändern darunter',
    },
    sampleGallery: [
      {
        src: '/samples/german/bingo/bilder-bingo-2.webp',
        alt: 'Bilder-Bingo-Karte mit Bild-Füllung, die farbenfrohe thematische Illustrationen in Rasterzellen und runde Bild-Chips zeigt',
        caption: 'Bild-Füllmodus — farbenfrohe Illustrationen in Kartenzellen und runden Chips',
      },
      {
        src: '/samples/german/bingo/bilder-bingo-3.webp',
        alt: 'Bilder-Bingo-Karte mit Wort-Füllung, die lokalisierte Bildnamen in Rasterzellen und Wort-Chips zeigt',
        caption: 'Wort-Füllmodus — lokalisierte Bildnamen für vokabelbasiertes Bingo',
      },
      {
        src: '/samples/german/bingo/callout.webp',
        alt: 'Bingo-Ansageblatt mit dynamischem Wortraster, das alle Spielelemente für den Spielleiter anzeigt',
        caption: 'Ansageblatt — dynamisches Wortraster für die Person, die das Bingo-Spiel leitet',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Bilder-Bingo-Karten mit Stapel-Generierung und Ansageblättern erstellen — Schritt-für-Schritt-Anleitung',
  },
};

export default content;
