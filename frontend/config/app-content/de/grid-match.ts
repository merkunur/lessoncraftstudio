import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'raster-puzzle-generator',
    secondaryKeywords: [
      'druckbarer Bilder-Rasterpuzzle-Generator für Etsy-Verkäufer',
      'Kachel-Zuordnungs-Arbeitsblatt-Generator für KDP-Verleger',
      'Raster-Puzzle-Ersteller kommerzielle Lizenz',
      'Bilder-Rasterpuzzle-Arbeitsblätter auf Gumroad verkaufen',
    ],
    lsiKeywords: [
      'digitale Kachel-Zuordnungs-Druckvorlagen skalierbares Einkommen',
      'kommerzieller Raster-Puzzle-Generator mit Lösungsschlüssel',
      'Druckvorlagen-Geschäft Bilder-Rasterpuzzle-Werkzeuge',
    ],
    titleTag: 'Raster-Puzzle-Generator | Bilder-Rasterpuzzle',
    metaDescription: 'Raster-Puzzle-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Konfigurierbares Raster, Hinweiszellen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  },

  hero: {
    title: 'Raster-Puzzle-Generator für druckbare Bilder-Rasterpuzzle-Arbeitsblätter',
    tagline: 'Verwandeln Sie jedes Bild in ein rasterbasiertes Bildrätsel — teilen Sie es in Kacheln auf, zeigen Sie konfigurierbare Hinweiszellen, mischen Sie die übrigen Kacheln in eine nummerierte Palette und generieren Sie automatisch einen Lösungsschlüssel mit nummerierten Kreis-Overlays über 104 thematische Bildsammlungen.',
    description:
      'Erstellen Sie professionelle Raster-Puzzle-Arbeitsblätter, bei denen ein einzelnes Bild in ein Kachelraster aufgeteilt wird und Lernende nummerierte Kacheln ihren korrekten Positionen zuordnen. Konfigurieren Sie das Raster von 2×2 bis 4×4 (2–4 Zeilen × 2–4 Spalten) und legen Sie 1–5 Hinweiszellen fest, die als sichtbare Tipps erhalten bleiben — weniger Hinweise bedeuten schwierigere Rätsel. Die App mischt die übrigen Kacheln mittels Fisher-Yates-Zufallsverteilung und zeigt sie in einer nummerierten Kachelpalette neben oder unter dem Raster an. Lernende untersuchen die sichtbaren Hinweiszellen, betrachten die nummerierten Kacheln und schreiben, welche Nummer in jede leere Zelle gehört. Das Doppel-Canvas-System generiert sowohl ein Arbeitsblatt-Tab als auch ein Lösungsschlüssel-Tab — der Lösungsschlüssel zeigt das vollständige Bild mit nummerierten Kreisen über jeder Rasterzelle, die die korrekte Kachelplatzierung anzeigen, sodass Sie niemals Lösungsschlüssel manuell erstellen müssen. Der Raster-Puzzle-Generator ist NICHT sprachabhängig: die Puzzle-Ausgabe ist rein visuell — nur Bildkacheln und Zahlen, ohne lokalisierte Wortinhalte auf dem Arbeitsblatt selbst. Ein Sprachwechsel ändert nur die Oberflächenbeschriftungen und den Überschriftentext, NICHT die Puzzle-Ausgabe. Dasselbe Rätsel funktioniert identisch in allen Märkten ohne Übersetzung. Vollzugriff schaltet alle 104 Themen mit über 3.100 Illustrationen und alle 11 Oberflächensprachen frei. Fügen Sie Hintergrund- und Rahmenthemen mit unabhängigen Deckkraftreglern hinzu, integrieren Sie benutzerdefinierten Text mit sieben Schriftoptionen und exportieren Sie druckfertige PDFs und JPEGs mit 300 DPI in Letter, A4 oder benutzerdefinierten Größen. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen; Vollzugriff schaltet alle 104 Themen und alle 11 Oberflächensprachen frei. Ob Sie thematische Rätsel-Pakete auf Etsy.de verkaufen, Arbeitsbücher für visuelle Wahrnehmung bei Amazon KDP veröffentlichen oder Schnellabschluss-Rätselaktivitäten für den Gumroad erstellen — dieser Generator liefert produktionsfertige Raster-Puzzle in Minuten. Kostenlos testen mit allen Funktionen — keine Anmeldung, keine Kreditkarte. Downloads enthalten ein Wasserzeichen; erwerben Sie eine Lizenz, um es zu entfernen.',
  },

  howItWorks: {
    title: 'Raster-Puzzle-Arbeitsblätter erstellen in 5 Schritten',
    steps: [
      {
        title: 'Seitenlayout festlegen',
        description:
          'Öffnen Sie das Seiten-Setup-Panel und wählen Sie eine Seitengröße: Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat oder eine beliebige benutzerdefinierte Dimension. Wählen Sie eine Seitenfarbe mit dem Farbwähler als Fallback-Hintergrund. Wählen Sie ein Hintergrundthema und passen Sie dessen Deckkraft an (0–1, Schrittweite 0,05), dann wählen Sie ein Rahmenthema mit eigenem unabhängigem Deckkraftregler. Diese Layout-Einstellungen rahmen Ihr Raster-Puzzle, bevor Sie Inhalte konfigurieren. Hinweis: Die quadratische Seitengröße ist beim Raster-Puzzle-Generator nicht verfügbar.',
      },
      {
        title: 'Raster konfigurieren',
        description:
          'Öffnen Sie das Rasteroptionen-Panel und legen Sie die Anzahl der Zeilen (2–4, Standard 3) und Spalten (2–4, Standard 3) für Ihr Puzzle-Raster fest. Stellen Sie dann die Anzahl der Hinweiszellen ein (1–5, Standard 1) — das sind Kacheln, die auf dem Arbeitsblatt als Tipps für Lernende sichtbar bleiben. Ein 3×3-Raster mit 1 Hinweis erzeugt ein anspruchsvolles Rätsel mit 8 zuzuordnenden Kacheln, während ein 2×2-Raster mit 3 Hinweisen eine einfache Aufgabe mit nur 1 zu platzierenden Kachel ergibt. Diese konfigurierbare Schwierigkeit ermöglicht es, abgestufte Rätsel-Sets einfach zu erstellen.',
      },
      {
        title: 'Bild auswählen',
        description:
          'Öffnen Sie das Bildbibliothek-Panel und durchsuchen Sie 104 thematische Sammlungen mit über 3.100 farbenfrohen Illustrationen — Tiere, Lebensmittel, Fahrzeuge, Natur, Feiertage und Dutzende mehr. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie per Stichwort. Klicken Sie auf ein Bild, um es für Ihr Rätsel auszuwählen. Die Bildvorschau zeigt Ihre Auswahl vor der Generierung an. Sie können auch eigene PNG-, JPG- oder GIF-Bilder über das Panel „Eigene Bilder hochladen" verwenden, um personalisierte Raster-Puzzle aus eigenen Fotos oder Kunstwerken zu erstellen.',
      },
      {
        title: 'Raster-Puzzle-Arbeitsblatt generieren',
        description:
          'Klicken Sie auf „Generieren", um das Raster-Puzzle zu erstellen. Die App teilt Ihr ausgewähltes Bild in das konfigurierte Raster auf, zeigt die Hinweiszellen mit den tatsächlichen Bildkacheln sichtbar an und markiert die übrigen Zellen mit „?"-Platzhaltern. Alle Kacheln werden mittels Fisher-Yates-Zufallsverteilung gemischt und als nummerierte Palette angezeigt. Bei Hochformat-Layouts erscheint das Raster oben mit der Palette darunter; bei Querformat-Layouts steht das Raster links mit der Palette rechts. Eine gestaltete Überschrift erscheint mit cyanfarbenem Hintergrund (#00BCD4), tiefviolettem Titel (#6A1B9A) und orangefarbenem Rahmen (#FF8C42) mit „Grid Match" und Anweisungen in der gewählten Sprache.',
      },
      {
        title: 'Lösungsschlüssel generieren und herunterladen',
        description:
          'Wechseln Sie zum Lösungsschlüssel-Tab, um den automatisch generierten Lösungsschlüssel zu sehen. Er zeigt das vollständige, ungeteilte Bild mit nummerierten Kreisen über jeder Rasterzelle — gelber Hintergrund (#ffffe0) mit schwarzer Umrandung, die anzeigt, welche Palettennummer in jede Position gehört. Laden Sie beide Versionen über die vier Download-Buttons herunter: Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF mit 300 DPI. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen. Jeder Export ist produktionsfertig für Etsy-Listings, Amazon-KDP-Buchinhalte und Gumroad-Produktdateien.',
      },
    ],
  },

  keyFeatures: {
    title: 'Hauptfunktionen des Raster-Puzzle-Generators',
    features: [
      {
        title: 'Einzelbild-Rasterpuzzle mit konfigurierbaren Zeilen und Spalten (2–4 × 2–4)',
        description:
          'Jedes Rätsel beginnt mit einem einzelnen Bild, das in ein gleichmäßiges Kachelraster aufgeteilt wird. Stellen Sie 2–4 Zeilen und 2–4 Spalten unabhängig voneinander ein und erstellen Sie Raster von 2×2 (4 Kacheln) bis 4×4 (16 Kacheln). Das Standard-3×3-Raster erzeugt 9 Kacheln — ein ausgewogener Schwierigkeitsgrad für die meisten Altersgruppen. Kleinere Raster eignen sich gut für einführende Rätsel, während größere Raster fortgeschrittene Lernende herausfordern und hochwertige Rätselprodukte erzeugen. Im Gegensatz zu Mehrbild-Zuordnungsarbeitsblättern testet das Rasterpuzzle räumliches Denken und visuelle Analyse eines einzelnen vollständigen Bildes.',
      },
      {
        title: 'Einstellbare Hinweiszellen-Anzahl für skalierbare Schwierigkeit (1–5 sichtbare Zellen)',
        description:
          'Steuern Sie die Rätselschwierigkeit, indem Sie 1–5 Hinweiszellen festlegen, die als sichtbare Tipps auf dem Arbeitsblatt erhalten bleiben. Bei einem 3×3-Raster mit 1 Hinweis müssen Lernende 8 gemischte Kacheln zuordnen — eine echte Herausforderung. Mit 5 Hinweisen im selben Raster müssen nur 4 Kacheln zugeordnet werden — ein zugänglicher Einstieg. Dieser einzelne Schieberegler verwandelt dasselbe Bild in Rätsel von leicht bis fortgeschritten, sodass Sie abgestufte Rätsel-Sets aus einem einzigen Bild und einer einzigen Rasterkonfiguration erstellen können. Der Standard ist 1 Hinweiszelle für maximale Herausforderung.',
      },
      {
        title: 'Gemischte nummerierte Kachelpalette mit Fisher-Yates-Zufallsverteilung',
        description:
          'Verdeckte Kacheln werden mittels Fisher-Yates-Algorithmus gemischt und in einer nummerierten Palette neben dem Raster angezeigt. Jede Kachel erhält eine eindeutige Nummer, die Lernende beim Aufschreiben der Antworten referenzieren. Die Zufallsverteilung stellt sicher, dass jedes generierte Rätsel eine andere Kachelreihenfolge hat, selbst wenn dasselbe Bild und dieselben Rastereinstellungen verwendet werden. Das bedeutet, Sie können mehrere einzigartige Rätsel-Arbeitsblätter aus einem einzigen Bild erzeugen, indem Sie einfach neu generieren — wertvoll für die Erstellung von Varietätenpaketen ohne verschiedene Quellbilder zu benötigen.',
      },
      {
        title: 'Automatisch generierter Lösungsschlüssel mit nummerierten Kreis-Overlays auf dem vollständigen Bild',
        description:
          'Jedes Rasterpuzzle generiert automatisch einen begleitenden Lösungsschlüssel auf einem separaten Canvas-Tab. Der Lösungsschlüssel zeigt das vollständige, ungeschnittene Bild mit nummerierten Kreisen über jeder Rasterzelle — gelber Hintergrund (#ffffe0), schwarze Umrandung und schwarzer Zahlentext in Fredoka-Schrift. Jede Nummer entspricht der gemischten Palettenreihenfolge des Arbeitsblatts und zeigt Lernenden und Verkäufern genau, welche Kachel wohin gehört. Kein manuelles Lösungsschlüssel-Erstellen, keine separate Datei — der Lösungsschlüssel bleibt perfekt mit dem Arbeitsblatt synchronisiert.',
      },
      {
        title: 'Bildbibliothek mit 104 thematischen Sammlungen und über 3.100 Illustrationen',
        description:
          'Durchsuchen Sie 104 thematische Bildsammlungen mit Tieren, Lebensmitteln, Fahrzeugen, Natur, Berufen, Feiertagen, Sport, Jahreszeiten und Dutzenden mehr. Jedes Thema bietet farbenfrohe Illustrationen, die sich hervorragend als Quellbilder für Rasterpuzzle eignen. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie nach bestimmten Bildern per Stichwort. Klicken Sie auf ein Bild, um es als Rätselquelle auszuwählen. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen für den Einstieg; Vollzugriff schaltet alle 104 Themen für maximale kreative Vielfalt über alle Rasterpuzzle-Produkte frei.',
      },
      {
        title: 'Responsives Hoch- und Querformat-Layout mit automatischer Neupositionierung',
        description:
          'Der Generator passt sein Layout automatisch basierend auf der Seitenausrichtung an. Hochformat-Seiten (Höhe > Breite) platzieren das Raster oben mit 45% der verfügbaren Höhe und der nummerierten Palette darunter, plus einer vollbreiten Überschrift (100px Höhe, 15px Radius). Querformat-Seiten (Breite > Höhe) positionieren das Raster auf der linken Hälfte (48% der verfügbaren Breite) mit der Palette rechts und einer kompakten Überschrift (70px Höhe, 35px Radius). Diese automatische Neupositionierung stellt sicher, dass Rasterpuzzle sowohl auf Letter als auch A4 in beiden Ausrichtungen professionell aussehen — ohne manuelle Layout-Anpassungen.',
      },
      {
        title: 'Druckfertiger PDF- und JPEG-Export mit 300 DPI und Graustufen-Option',
        description:
          'Laden Sie Rasterpuzzle und Lösungsschlüssel als hochauflösende JPEG-Bilder oder druckfertige PDF-Dokumente mit 300 DPI herunter (6×-Multiplikator, JPEG-Qualität 1.0). Vier Download-Buttons exportieren Arbeitsblatt- und Lösungsschlüssel-Dateien separat. Seitengrößen umfassen Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat und völlig benutzerdefinierte Dimensionen. Die PDF-Ausrichtung wird automatisch erkannt. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen, die Toner sparen und gleichzeitig die Rasterstruktur bewahren. Jeder Export ist produktionsfertig für digitale Downloads, gedruckte Arbeitsbücher und Produktmaterialien.',
      },
      {
        title: 'Vollständige Canvas-Bearbeitung mit Textwerkzeugen, Ausrichtung und Ebenensteuerung',
        description:
          'Die Fabric.js-Arbeitsfläche bietet vollständige Kontrolle über jedes Element auf Ihrem Rasterpuzzle. Verschieben, skalieren, drehen und positionieren Sie Bilder, Text und generierte Inhalte frei. Die Ebenensteuerung verwaltet die Stapelreihenfolge — bringen Sie Elemente nach vorne oder senden Sie sie nach hinten. Sperren Sie fertige Elemente, während Sie andere bearbeiten. Fügen Sie benutzerdefinierten Text mit sieben Schriftarten hinzu (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), mit einstellbarer Größe und Farbe sowie Textumriss-Breite von 0 bis 10 mit 0,5-Schritt-Granularität. Sechs Ausrichtungsoptionen plus Auf-Seite-Zentrieren sorgen für präzise Layouts. Zoomen Sie von 25% bis 300% für Detailarbeit. Rückgängig und Wiederholen für bis zu 20 Verlaufszustände mit Strg+Z und Strg+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Raster-Puzzle-Arbeitsblätter online verkaufen',
    cases: [
      {
        title: 'Thematische Rasterpuzzle-Pakete auf Etsy',
        description:
          'Erstellen Sie thematische Rasterpuzzle-Pakete mit den 104 Bildsammlungen — Tier-Rasterpuzzle, Fahrzeug-Rasterpuzzle, Feiertags-Bildrätsel und Dutzende mehr. Jedes Thema bietet genügend Illustrationen für 20–30 einzigartige Rätsel-Arbeitsblätter mit unterschiedlichen Rastergrößen und Hinweiszahlen. Verpacken Sie 15–25 Rasterpuzzle pro Thema mit beigelegten Lösungsschlüsseln und verkaufen Sie zu €3–€7 pro Paket. Integrieren Sie eine Mischung aus leichten (2×2 mit 3 Hinweisen), mittleren (3×3 mit 2 Hinweisen) und schweren (4×4 mit 1 Hinweis) Rätseln in jedes Paket für maximale Zielgruppenansprache. Der automatisch generierte Lösungsschlüssel mit nummerierten Overlays eliminiert den zeitaufwändigsten Teil der Rätselerstellung. Da die Rätselausgabe rein visuell ist und keine sprachspezifischen Inhalte enthält, können Sie identische Puzzle-Pakete gleichzeitig auf Etsy.de und internationalen Etsy-Marktplätzen verkaufen — ein einziges Produkt bedient mehrere Märkte ohne zusätzlichen Aufwand.',
        platform: 'Etsy (etsy.de)',
      },
      {
        title: 'Bildrätsel-Arbeitsbücher auf Amazon KDP',
        description:
          'Stellen Sie 50–100 Rasterpuzzle zu einem gedruckten Arbeitsbuch im Amazon-KDP-Format zusammen. Strukturieren Sie Ihr Buch nach progressiver Schwierigkeit: Kapitel 1 verwendet 2×2-Raster mit 3 Hinweisen für Anfänger, Kapitel 2 verwendet 3×3-Raster mit 2 Hinweisen für Fortgeschrittene und Kapitel 3 verwendet 4×4-Raster mit 1 Hinweis für erfahrene Löser. Integrieren Sie Lösungsschlüssel am Ende des Buchs mit den automatisch generierten nummerierten Kreis-Overlays. Der Graustufen-Schalter erzeugt tintenschonende Seiten, die direkt als Schwarzweiß-Buchinhalte einsetzbar sind. Arbeitsbücher für visuelle Wahrnehmung und räumliches Denken performen gut in der Kategorie Aktivitätsbücher das ganze Jahr über. Nutzen Sie verschiedene Bildthemen für thematische Kapitelabschnitte — Tierkapitel, Fahrzeugkapitel, Naturkapitel — und erzeugen Sie so ein strukturiertes Gesamtwerk mit breitem Kundenpotenzial auf Amazon.de.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Schnellabschluss-Rätselaktivitäten für den Gumroad',
        description:
          'Erstellen Sie sofort einsatzfähige Rasterpuzzle-Aktivitäten für Schnellabschluss-Aufgaben, Morgenarbeit oder Enrichment-Stationen in der Produkterstellung. Verkäufer, die auf Gumroad nach Aktivitäten für visuelle Wahrnehmung suchen, schätzen Rätsel, die druckfertig mit Lösungsschlüsseln ankommen. Erstellen Sie lehrplanorientierte Sets: Tier-Bildrätsel für den Sachunterricht, Wahrzeichen-Rätsel für Geografie, Lebensmittel-Rätsel für Ernährungslehre. Die konfigurierbare Schwierigkeit ermöglicht Differenzierung innerhalb eines einzigen Produkts — leichte, mittlere und schwere Versionen derselben thematischen Rätsel, damit Verkäufer nach Leistungsniveau zuweisen können. Die automatisch generierten Lösungsschlüssel mit nummerierten Kreisen über dem vollständigen Bild ermöglichen schnelle Selbstkontrolle durch Lernende oder effiziente Korrektur durch Verkäufer — ein wesentlicher Mehrwert gegenüber einfachen Bildrätseln ohne Lösungshilfe.',
        platform: 'Gumroad',
      },
      {
        title: 'Saisonale Rasterpuzzle-Sammlungen',
        description:
          'Die 104 thematischen Bildsammlungen decken jede saisonale und feiertagsbezogene Gelegenheit ab — Weihnachten, Halloween, Ostern, Valentinstag, Schulanfang, Sommerferien und vieles mehr. Erstellen Sie aktuell verfügbare Rasterpuzzle-Sammlungen, die sich an Spitzeneinkaufszeiten orientieren. Veröffentlichen Sie Halloween-Rätselpakete im September, Weihnachts-Sammlungen im Oktober und Valentinstag-Pakete im Januar. Integrieren Sie mehrere Rastergrößen und Schwierigkeitsgrade in jedes saisonale Set für maximalen Wert. Saisonale Produkte erzielen höhere Preise während ihrer Spitzenzeiten und schaffen natürliche Gründe für Wiederholungskäufe. Nutzen Sie passende Hintergrund- und Rahmenthemen für ein stimmiges Saisondesign, das Käufer in der Vorschau sofort anspricht und die wahrgenommene Qualität Ihres Produkts steigert.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonal)',
      },
      {
        title: 'Personalisierte Foto-Rasterpuzzle als Premium-Produkte',
        description:
          'Nutzen Sie die Funktion „Eigene Bilder hochladen", um Rasterpuzzle aus beliebigen Fotos oder Kunstwerken zu erstellen. Familienfoto-Rätsel sind einzigartige personalisierte Geschenke für Geburtstage, Jubiläen oder Weihnachten. Verkäufer können Klassenfotos für Schuljahresend-Aktivitäten hochladen oder Ausflugfotos als Erinnerungsprojekte verwenden. Haustier-Foto-Rätsel, Urlaubsfoto-Rätsel und Teamfoto-Rätsel erzeugen einzigartige Produkte, die in keinem Katalog zu finden sind. Bieten Sie individuelle Rasterpuzzle-Erstellung als Premium-Service auf Etsy.de an, bei dem Kunden ihre Fotos einsenden und Sie gedruckte Rätsel-Arbeitsblätter mit Lösungsschlüsseln liefern — ein margenstarkes personalisiertes Produkt mit minimaler Produktionszeit. Verschiedene Rastergrößen ermöglichen Ihnen, aus einem einzigen Kundenfoto mehrere Rätselversionen in verschiedenen Schwierigkeitsgraden zu erstellen und als Set anzubieten.',
        platform: 'Etsy (personalisierte Produkte)',
      },
    ],
  },

  faq: [
    {
      question: 'Welche Rastergrößen sind für Rasterpuzzle verfügbar?',
      answer:
        'Der Generator unterstützt 2–4 Zeilen und 2–4 Spalten, die unabhängig konfiguriert werden können. Dies erzeugt Raster von 2×2 (4 Kacheln) bis 4×4 (16 Kacheln). Der Standard ist 3×3 (9 Kacheln). Kleinere Raster sind einfacher und eignen sich gut für Einsteiger-Rätsel; größere Raster erhöhen die Schwierigkeit und visuelle Komplexität für erfahrene Löser. Sie können Zeilen und Spalten auf unterschiedliche Werte setzen — zum Beispiel erzeugen 2 Zeilen × 4 Spalten ein breites rechteckiges Rätsel, während 4 Zeilen × 2 Spalten ein hohes, schmales Raster erzeugen. Diese Flexibilität ermöglicht kreative Variationen über die Standard-Quadratraster hinaus.',
    },
    {
      question: 'Wie steuern Hinweiszellen die Rätselschwierigkeit?',
      answer:
        'Hinweiszellen sind Rasterpositionen, an denen die Bildkachel als Tipp sichtbar bleibt. Stellen Sie 1–5 Hinweiszellen über den Schieberegler im Rasteroptionen-Panel ein (Standard ist 1). Mehr Hinweise machen das Rätsel einfacher, da Lernende mehr Referenzpunkte haben. Bei einem 3×3-Raster mit 1 Hinweis müssen 8 Kacheln zugeordnet werden — ziemlich anspruchsvoll. Mit 5 Hinweisen müssen nur 4 Kacheln zugeordnet werden — deutlich zugänglicher. Dieser einzelne Regler ermöglicht abgestufte Schwierigkeits-Sets aus demselben Bild. Für verkaufsfertige Produkte empfiehlt sich eine Mischung verschiedener Hinweiszahlen innerhalb eines Pakets, sodass Käufer Rätsel für verschiedene Fähigkeitsstufen in einem einzigen Download erhalten.',
    },
    {
      question: 'Wie funktioniert das Rasterpuzzle für Lernende?',
      answer:
        'Das Arbeitsblatt zeigt ein Raster, bei dem einige Zellen die tatsächliche Bildkachel anzeigen (Hinweiszellen) und die übrigen Zellen „?"-Platzhalter zeigen. Unter oder neben dem Raster zeigt eine nummerierte Palette alle verdeckten Kacheln in gemischter Reihenfolge. Lernende untersuchen die Hinweiszellen, studieren die nummerierten Kacheln und bestimmen, welche Nummer in jede leere Rasterposition gehört. Die Lösung erfordert räumliches Denken und visuelle Wahrnehmung — den Kachelinhalt anhand von Farbverläufen, Motivfortsetzungen und Kantenabgleich dem korrekten Platz im Gesamtbild zuzuordnen. Das fördert analytische Fähigkeiten auf eine spielerische, motivierende Weise.',
    },
    {
      question: 'Wie funktioniert der automatisch generierte Lösungsschlüssel?',
      answer:
        'Der Generator verwendet ein Doppel-Canvas-System mit einem Arbeitsblatt-Tab und einem Lösungsschlüssel-Tab. Der Lösungsschlüssel zeigt das vollständige, ungeschnittene Bild mit nummerierten Kreisen über jeder Rasterzelle. Jeder Kreis hat einen gelben Hintergrund (#ffffe0) mit schwarzer Umrandung und schwarzem Zahlentext in Fredoka-Schrift, der die Palettennummer anzeigt, die in diese Position gehört. Die Nummern entsprechen der gemischten Kachelreihenfolge des Arbeitsblatts, sodass die Antwortüberprüfung unkompliziert ist. Beide Versionen werden über vier dedizierte Download-Buttons separat exportiert: Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF.',
    },
    {
      question: 'Kann ich eigene Bilder für Rasterpuzzle verwenden?',
      answer:
        'Ja. Das Panel „Eigene Bilder hochladen" ermöglicht das Hochladen von PNG-, JPG- oder GIF-Dateien von Ihrem Computer. Hochgeladene Bilder erscheinen in einer Galerie unterhalb des Upload-Bereichs. Klicken Sie auf ein hochgeladenes Bild, um es als Rätselquelle auszuwählen. Diese Funktion eignet sich ideal für personalisierte Rätsel aus Fotos, eigenen Kunstwerken oder Markenbildern. Sie können hochgeladene Bilder neben der eingebauten Bibliothek verwenden — wechseln Sie frei zwischen beiden. Eigene Bilder werden lokal in Ihrem Browser verarbeitet und nicht auf einen Server hochgeladen, was sowohl den Datenschutz als auch die Verarbeitungsgeschwindigkeit gewährleistet.',
    },
    {
      question: 'Wie passt sich das Layout an Hoch- und Querformat an?',
      answer:
        'Der Generator erkennt automatisch Ihre Seitenausrichtung und positioniert Elemente entsprechend neu. Hochformat-Seiten platzieren das Raster oben (mit 45% der verfügbaren Höhe) mit der nummerierten Palette darunter und einer vollbreiten Überschrift (100px Höhe, 15px Radius). Querformat-Seiten positionieren das Raster auf der linken Hälfte (48% der verfügbaren Breite) mit der Palette rechts und einer kompakten Überschrift (70px Höhe, 35px Radius). Dies stellt sicher, dass Rasterpuzzle sowohl auf Letter- als auch A4-Papier in beiden Ausrichtungen ausgewogen und professionell aussehen — ohne manuelle Layout-Anpassungen. Die automatische Anpassung spart erhebliche Gestaltungszeit bei der Massenproduktion von Rätsel-Arbeitsblättern.',
    },
    {
      question: 'Kann ich mehrere einzigartige Rätsel aus demselben Bild generieren?',
      answer:
        'Ja. Jedes Mal, wenn Sie auf „Generieren" klicken, mischt die App die Kacheln mittels Fisher-Yates-Zufallsverteilung und erzeugt eine andere nummerierte Kachelreihenfolge. Auch die Hinweiszellen-Positionen ändern sich zwischen den Generierungen. Das bedeutet, Sie können mehrere verschiedene Rätsel-Arbeitsblätter aus einem einzigen Bild erstellen, ohne Einstellungen zu ändern — jedes hat andere Kachelnummern und Hinweispositionen, was sie zu einzigartigen Rätselerlebnissen macht. Diese Funktion ist besonders wertvoll für die Erstellung von Varietätenpaketen: generieren Sie 5–10 verschiedene Versionen desselben Tierbilds und verpacken Sie sie als abwechslungsreiches Rätselset, ohne verschiedene Quellbilder zu benötigen.',
    },
    {
      question: 'Wie funktioniert die Schwierigkeitsskalierung über Rastergrößen und Hinweiszahlen?',
      answer:
        'Die Schwierigkeit hängt von zwei Faktoren ab: Gesamtkacheln (Rastergröße) und sichtbare Hinweise. Ein 2×2-Raster mit 3 Hinweisen lässt nur 1 Kachel zum Zuordnen übrig — das einfachste mögliche Rätsel. Ein 4×4-Raster mit 1 Hinweis erfordert die Zuordnung von 15 Kacheln — die schwierigste Konfiguration. Zwischen diesen Extremen können Sie jedes Schwierigkeitsniveau erstellen. Für abgestufte Arbeitsbücher beginnen Sie mit 2×2-Rastern (3 Hinweise), gehen zu 3×3 (2 Hinweise) über und enden mit 4×4 (1 Hinweis) für eine natürliche Schwierigkeitskurve. Diese Abstufung eignet sich hervorragend für strukturierte Lernprodukte, bei denen Käufer einen klaren Schwierigkeitsverlauf innerhalb eines einzigen Pakets oder Arbeitsbuchs erwarten. Zwischenstufen wie 3×2 mit 2 Hinweisen oder 3×4 mit 3 Hinweisen bieten zusätzliche Flexibilität für feinere Abstufungen.',
    },
    {
      question: 'Gibt es eine kostenlose Testversion?',
      answer:
        'Ja. Sie können jede Funktion nutzen — alle Rastergrößen, einstellbare Hinweiszellen, den automatisch generierten Lösungsschlüssel mit nummerierten Overlays, die vollständige Bildbibliothek, Hintergrund- und Rahmenthemen, eigene Bild-Uploads, Textwerkzeuge und alle Download-Formate — ohne ein Konto zu erstellen, eine Kreditkarte einzugeben oder Software zu installieren. Downloads der kostenlosen Testversion enthalten ein kleines Wasserzeichen. Eine kommerzielle Lizenz entfernt das Wasserzeichen und gewährt volle Verkaufsrechte.',
    },
    {
      question: 'Ist der Raster-Puzzle-Generator sprachabhängig?',
      answer:
        'Nein. Der Raster-Puzzle-Generator ist rein visuell — die Rätselausgabe enthält nur Bildkacheln und Zahlen, ohne lokalisierte Wortinhalte auf dem Arbeitsblatt selbst. Die App-Oberfläche (Menüs, Buttons, Überschriftentext) unterstützt alle 11 Sprachen, aber das generierte Rätsel funktioniert unabhängig von der Sprachauswahl identisch. Das macht Rasterpuzzle universell verkaufbar über alle Märkte hinweg ohne Übersetzung — ein auf Deutsch erstelltes Rätsel kann ohne jede Änderung auf Etsy.com, Etsy.de und allen anderen internationalen Marktplätzen gleichzeitig gelistet werden. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen; Vollzugriff schaltet alle 104 Themen und alle 11 Oberflächensprachen frei.',
    },
    {
      question: 'Kann ich mit diesem Tool erstellte Rasterpuzzle auf Etsy und Amazon KDP verkaufen?',
      answer:
        'Ja. Mit einer kommerziellen Lizenz haben Sie volle Rechte, Ihre Rasterpuzzle als digitale Downloads auf Etsy.de, als gedruckte Arbeitsbücher auf Amazon KDP, als Lehrmaterialien auf Gumroad oder über jeden anderen Vertriebskanal zu verkaufen. Die konfigurierbaren Rastergrößen, einstellbaren Hinweiszellen, automatisch generierten Lösungsschlüssel und 104 thematischen Bildsammlungen geben Ihnen die kreativen Werkzeuge, um originale, verkaufsfertige Rasterpuzzle-Produkte zu produzieren.',
    },
    {
      question: 'Was ist Ihre Rückgabepolitik?',
      answer:
        'Da die kostenlose Testversion Ihnen vollständigen Zugang zu jeder Funktion gewährt, bieten wir keine Rückerstattung für kommerzielle Lizenzen an. Sie können alle Rastergrößen, Hinweiszellen-Konfigurationen, den automatisch generierten Lösungsschlüssel mit nummerierten Overlays, die vollständige Bildbibliothek, Hintergrund- und Rahmenthemen, eigene Bild-Uploads, Textwerkzeuge und alle Download-Formate vor dem Kauf ausgiebig testen. Die kostenlose Testversion ist die Rückgabepolitik — stellen Sie sicher, dass das Tool Ihren Anforderungen entspricht, bevor Sie eine Lizenz erwerben.',
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
      slug: 'schattenbilder-zuordnen-arbeitsblaetter',
      anchorText: 'Schattenbilder-Zuordnen-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilder-bingo-arbeitsblaetter',
      anchorText: 'Bilder-Bingo-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilder-sortieren-arbeitsblaetter',
      anchorText: 'Bilder-Sortieren-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'fehlende-puzzleteile-arbeitsblaetter',
      anchorText: 'Fehlende-Puzzleteile-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'suchbilder-arbeitsblaetter',
      anchorText: 'Suchbilder-Arbeitsblatt-Generator',
    },
    {
      pageType: 'bundle',
      slug: 'zuordnung-sortierung-paket',
      anchorText: 'Zuordnung-und-Sortierung-Paket — Alle Zuordnungs-Apps in einem Paket',
    },
    {
      pageType: 'idea',
      slug: 'vorschule-druckvorlagen-ideen',
      anchorText: 'Vorschul-Druckvorlagen-Ideen für frühe Förderung',
    },
    {
      pageType: 'idea',
      slug: 'kindergarten-druckvorlagen-ideen',
      anchorText: 'Kindergarten-Druckvorlagen-Ideen für junge Nutzer',
    },
    {
      pageType: 'start',
      slug: 'druckvorlagen-geschaeft-bauplan',
      anchorText: 'Ihr Druckvorlagen-Geschäfts-Bauplan',
    },
    {
      pageType: 'guide',
      slug: 'zuordnungs-arbeitsblaetter-erstellen',
      anchorText: 'Zuordnungs-Arbeitsblätter erstellen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/german/grid match/Raster-Puzzle 1.webp',
      primaryAlt: 'Raster-Puzzle-Arbeitsblatt mit Bildkacheln in einem Raster aufgeteilt, sichtbaren Hinweiszellen und nummerierter Kachelpalette zur Zuordnung',
    },
    sampleGallery: [
      {
        src: '/samples/german/grid match/Raster-Puzzle 2.webp',
        alt: 'Drei-mal-drei-Rasterpuzzle mit einer Hinweiszelle und acht nummerierten Kacheln in der Palette',
        caption: '3×3-Rasterpuzzle — eine Hinweiszelle sichtbar, acht Kacheln aus nummerierter Palette zuordnen',
      },
      {
        src: '/samples/german/grid match/Raster-Puzzle 3.webp',
        alt: 'Vier-mal-vier-Rasterpuzzle mit sechzehn Kacheln und minimalen Hinweisen für fortgeschrittene Rätsel',
        caption: '4×4-Fortgeschrittenes Rätsel — maximale Rastergröße für anspruchsvolle visuelle Wahrnehmungsaktivitäten',
      },
      {
        src: '/samples/german/grid match/Raster-Puzzle 1 answer_key.webp',
        alt: 'Raster-Puzzle-Lösungsschlüssel mit vollständigem Bild und nummerierten Kreisen über jeder Rasterzelle',
        caption: 'Automatisch generierter Lösungsschlüssel — nummerierte Kreise zeigen die korrekte Kachelplatzierung auf dem vollständigen Bild',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Raster-Puzzle-Arbeitsblätter mit konfigurierbarer Schwierigkeit erstellen — Schritt-für-Schritt-Anleitung',
  },
};

export default content;
