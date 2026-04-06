import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'Was passt nicht Arbeitsblatt erstellen',
    secondaryKeywords: [
      'Ausreißer finden Arbeitsblatt Generator',
      'Was gehört nicht dazu Generator',
      'Klassifikation Rätsel erstellen',
      'Logik Arbeitsblatt Generator',
    ],
    lsiKeywords: [
      'Kategorie',
      'Oberbegriff',
      'logisches Denken',
      'Klassifizieren',
    ],
    titleTag: 'Was-passt-nicht Arbeitsblatt erstellen | Logik Generator',
    metaDescription: 'Erstellen Sie Was-passt-nicht-Arbeitsblätter mit Themenbildern für logisches Denken. Automatische Lösungen, druckfertige PDFs. Kostenlos testen.',
  },

  hero: {
    title: 'Was-passt-nicht Arbeitsblatt erstellen — Logik Generator',
    tagline: 'Zwei Erzeugungsmodi — Identisch und Ähnlich — mit Modus-Überschreibung pro Übung, 5–10 konfigurierbaren Übungen, automatisch generierten Lösungsschlüsseln mit roten Kreismarkierungen und rein visuellen Rätseln, die in allen 11 Sprachen ohne Übersetzung funktionieren.',
    description:
      'Erstellen Sie Was-passt-nicht-Rätsel mit dem Ausreißer-Generator und verkaufen Sie Druckvorlagen auf Etsy, Amazon KDP oder Gumroad. Zwei Erzeugungsmodi bieten unterschiedliche Herausforderungen: Identisch-Modus für Finde-den-Unterschied-Aufgaben und Ähnlich-Modus für thematische Ausreißer-Erkennung. Überschreiben Sie den Modus pro Übung, um Schwierigkeitsgrade auf einer Seite zu mischen. Konfigurieren Sie 5 bis 10 Übungen pro Arbeitsblatt mit automatischem Lösungsschlüssel mit roten Kreismarkierungen. Über 3.100 Illustrationen in 104 Themen liefern abwechslungsreiche Inhalte. Das vollständig visuelle Format ermöglicht globalen Verkauf ohne Übersetzungsaufwand. Exportieren Sie druckfertige PDFs und JPEGs mit 300 DPI. Die kommerzielle Lizenz umfasst 10 Themen; Vollzugriff schaltet alle 104 Themen und 11 Sprachen frei. Kostenlos testen mit Wasserzeichen.',
  },

  howItWorks: {
    title: 'Was-Passt-Nicht-Arbeitsblätter erstellen in 5 Schritten',
    steps: [
      {
        title: 'Seitenlayout festlegen',
        description:
          'Öffnen Sie das Seiten-Setup-Panel und wählen Sie eine Seitengröße: Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) oder eine beliebige benutzerdefinierte Dimension. Wählen Sie eine Seitenfarbe mit dem Farbwähler als Fallback-Hintergrund. Wählen Sie ein Hintergrundthema und passen Sie dessen Deckkraft an (0–1, Schrittweite 0,05), dann wählen Sie ein Rahmenthema mit eigenem unabhängigem Deckkraftregler. Diese Layout-Einstellungen rahmen Ihr Was-passt-nicht-Arbeitsblatt, bevor Sie Übungen konfigurieren.',
      },
      {
        title: 'Übungen konfigurieren',
        description:
          'Öffnen Sie das Übungskonfigurations-Panel und legen Sie die Anzahl der Übungen von 5 bis 10 fest (Standard: 6). Wählen Sie einen globalen Erzeugungsmodus: Der Identisch-Modus verwendet drei Klone desselben Bildes plus ein anderes Bild aus demselben Thema, während der Ähnlich-Modus drei Bilder aus Thema A und ein Bild aus Thema B verwendet. Überschreiben Sie den Modus pro Übung mithilfe der Dropdown-Auswahl auf jeder Zeile — mischen Sie Identisch- und Ähnlich-Übungen auf einem einzigen Arbeitsblatt für progressive Schwierigkeit. Aktivieren Sie das Kontrollkästchen \"Name-und-Datum-Felder einfügen\", um Namens- und Datumszeilen hinzuzufügen, und aktivieren Sie \"Übungsnummern einfügen\", um Nummern auf der linken Seite jeder Übungskarte anzuzeigen.',
      },
      {
        title: 'Themen und Bilder auswählen',
        description:
          'Öffnen Sie das Bildbibliothek-Panel und wählen Sie Thema A aus dem Dropdown — dieses liefert die drei gemeinsamen Bilder im Ähnlich-Modus. Wählen Sie Thema B für den Ausreißer im Ähnlich-Modus (z. B. Thema A = Tiere, Thema B = Lebensmittel). Durchsuchen Sie 104 thematische Sammlungen mit über 3.100 farbenfrohen Illustrationen oder suchen Sie per Stichwort. Im Identisch-Modus wird nur ein Thema benötigt, da sowohl die gemeinsamen als auch die abweichenden Bilder aus derselben Sammlung stammen. Sie können auch eigene PNG-, JPG- oder GIF-Bilder hochladen, um sie neben Bibliotheksinhalten zu verwenden.',
      },
      {
        title: 'Was-Passt-Nicht-Arbeitsblatt generieren',
        description:
          'Klicken Sie auf Generieren, um die Übungskarten zu erstellen. Jede Karte zeigt vier Bilder in einer horizontalen Reihe — drei gemeinsame Bilder und ein abweichendes Bild mit zufällig vertauschter Position. Die App ordnet Karten in 1–2 Spalten an, abhängig von Seitenausrichtung und Übungsanzahl (2 Spalten für Querformat oder Hochformat mit 7+ Übungen). Ein gestalteter \"Finde den Ausreißer\"-Header erscheint oben mit einem korallenroten äußeren Rahmen (#FF6B6B, 8px Strichstärke), bernsteinfarbenem inneren Rahmen (#FFB84D, 3px Strichstärke) und türkisfarbenem Hintergrund (#4ECDC4) — mit dem Titel in dunklem Blaugrün in Fredoka (#1A535C) und Anweisungen in Rot in Quicksand (#E63946).',
      },
      {
        title: 'Lösungsschlüssel generieren und herunterladen',
        description:
          'Wechseln Sie zum Lösungsschlüssel-Tab, um den automatisch generierten Lösungsschlüssel mit einem roten Kreis um den Ausreißer in jeder Übungsreihe zu sehen. Die Strichstärke des Kreises skaliert mit der Bildgröße (Maximum von Bildgröße × 0,04 oder 3px) für gleichmäßige Sichtbarkeit über alle Seitengrößen. Laden Sie beide Versionen über vier dedizierte Buttons herunter: Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF mit 300 DPI. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen. Jeder Export ist produktionsfertig für Etsy-Listings, Amazon-KDP-Buchinhalte und Gumroad-Produktdateien.',
      },
    ],
  },

  keyFeatures: {
    title: 'Hauptfunktionen des Was-Passt-Nicht-Generators',
    features: [
      {
        title: 'Was-Passt-Nicht-Rätsel mit zwei Erzeugungsmodi',
        description:
          'Jede Übung zeigt vier Bilder in einer horizontalen Karte — drei gemeinsame Bilder und ein abweichendes Bild — und es muss das Bild eingekreist werden, das nicht dazugehört. Der Generator bietet zwei verschiedene Modi. Der Identisch-Modus platziert drei Klone desselben Bildes neben einem anderen Bild aus demselben Thema und erzeugt eine übersichtliche Finde-den-Unterschied-Herausforderung. Der Ähnlich-Modus verwendet drei Bilder aus Thema A (z. B. Tiere) und ein Bild aus Thema B (z. B. Lebensmittel), wobei der thematische Ausreißer statt eines visuellen Duplikats erkannt werden muss. Jeder Modus erzeugt eine grundlegend andere kognitive Herausforderung aus derselben Bildbibliothek — verdoppeln Sie Ihre Produktvielfalt ohne zusätzlichen Aufwand, indem Sie beide Modi für dasselbe Thema nutzen.',
      },
      {
        title: 'Modus-Überschreibung pro Übung für gemischte Schwierigkeitsgrade',
        description:
          'Jede Übungszeile enthält ein eigenes Modus-Dropdown, mit dem Sie den globalen Modus pro Übung überschreiben können. Beginnen Sie mit einfachen Identisch-Übungen am Anfang und gehen Sie zu schwereren Ähnlich-Übungen am Ende über — oder wechseln Sie die Modi durchgehend ab für vielfältige Herausforderungen. Ein \"Auswahl zurücksetzen\"-Button setzt alle Überschreibungen auf die globale Einstellung zurück. Diese fein granulare Steuerung ermöglicht es Verkäufern, Arbeitsblätter mit progressiver Schwierigkeit zu erstellen, die mehrere Leistungsniveaus auf einer einzigen Seite bedienen und den wahrgenommenen Wert jeder Druckvorlage steigern.',
      },
      {
        title: 'Konfigurierbare Übungsanzahl von 5 bis 10 pro Arbeitsblatt',
        description:
          'Legen Sie die Anzahl der Übungen von 5 bis 10 im Übungskonfigurations-Panel fest (Standard: 6). Weniger Übungen erzeugen Arbeitsblätter mit größeren Bildkarten und mehr Abstand — ideal für jüngere Zielgruppen oder Arbeitsblätter, bei denen das Einkreisen genügend Platz benötigt. Mehr Übungen erhöhen die Inhaltsdichte und die Herausforderung für fortgeschrittene Nutzer. Das Layout passt sich automatisch an: Hochformat-Seiten mit 7 oder mehr Übungen wechseln zu einem 2-Spalten-Layout, und Querformat-Seiten verwenden stets 2 Spalten für optimalen Abstand.',
      },
      {
        title: 'Zwei-Themen-System mit Thema A (gemeinsam) und Thema B (Ausreißer)',
        description:
          'Der Ähnlich-Modus nutzt ein Zwei-Themen-System, das themenübergreifende Unterscheidungsrätsel mühelos erzeugt. Wählen Sie Thema A aus dem Dropdown für die drei gemeinsamen Bilder jeder Übung, dann wählen Sie Thema B für den einzelnen Ausreißer. Kombinieren Sie Tiere mit Lebensmitteln, Fahrzeuge mit Natur, Berufe mit Sport — beliebige Kombinationen aus den 104 verfügbaren Themen. Dieses System garantiert, dass der Ausreißer immer thematisch verschieden ist, und erzeugt klare, pädagogisch sinnvolle Rätsel ohne manuelle Bildauswahl für jede Übung.',
      },
      {
        title: 'Automatisch generierter Lösungsschlüssel mit roten Kreismarkierungen',
        description:
          'Jedes Was-passt-nicht-Arbeitsblatt generiert automatisch einen begleitenden Lösungsschlüssel auf einem separaten Canvas-Tab. Der Lösungsschlüssel reproduziert das exakte Arbeitsblatt-Layout und zeichnet einen roten Kreisumriss um den Ausreißer in jeder Übungsreihe. Die Strichstärke des Kreises skaliert dynamisch mit der Bildgröße — berechnet als Maximum von Bildgröße × 0,04 oder 3 Pixel — und gewährleistet gleichmäßige Sichtbarkeit über alle Seitengrößen und Übungsanzahlen hinweg. Keine manuelle Markierung, keine separate Dateierstellung — der Lösungsschlüssel bleibt automatisch mit dem Arbeitsblatt synchronisiert. Diese Automatisierung eliminiert den größten Zeitfresser in der Arbeitsblatt-Produktion und ermöglicht die schnelle Erstellung umfangreicher Produktpakete.',
      },
      {
        title: 'Bildbibliothek mit 104 thematischen Sammlungen und über 3.100 Illustrationen',
        description:
          'Durchsuchen Sie 104 thematische Bildsammlungen mit Tieren, Lebensmitteln, Fahrzeugen, Natur, Berufen, Feiertagen, Sport, Jahreszeiten und Dutzenden mehr. Jedes Thema bietet einen koordinierten Satz farbenfroher Illustrationen, die zusammen in Was-passt-nicht-Übungen funktionieren. Filtern Sie nach Thema über das Dropdown-Menü oder suchen Sie nach bestimmten Bildern per Stichwort. Bilder laden mit Lazy Loading (20 gleichzeitig) für flüssiges Durchsuchen. Die kommerzielle Lizenz umfasst 10 farbenfrohe Themen für den Einstieg; Vollzugriff schaltet alle 104 Themen für maximale Vielfalt über beide Erzeugungsmodi frei.',
      },
      {
        title: 'Druckfertiger PDF- und JPEG-Export mit 300 DPI und Graustufen-Option',
        description:
          'Laden Sie Was-passt-nicht-Arbeitsblätter und Lösungsschlüssel als hochauflösende JPEG-Bilder oder druckfertige PDF-Dokumente mit 300 DPI (6× Multiplikator) herunter. Vier dedizierte Download-Buttons exportieren Arbeitsblatt-JPEG, Lösungsschlüssel-JPEG, Arbeitsblatt-PDF und Lösungsschlüssel-PDF separat. Seitengrößen umfassen Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat (1200×1200) und völlig benutzerdefinierte Dimensionen. Aktivieren Sie den Graustufen-Schalter für tintenschonende Versionen, die Toner sparen. Jeder Export ist produktionsfertig für digitale Downloads, gedruckte Arbeitsbücher und Produktmaterialien.',
      },
      {
        title: 'Vollständige Canvas-Bearbeitung mit Textwerkzeugen, Name/Datum und Übungsnummern',
        description:
          'Die Fabric.js-Arbeitsfläche bietet vollständige Kontrolle über jedes Element auf Ihrem Arbeitsblatt. Verschieben, skalieren, drehen und positionieren Sie Bilder, Text und generierte Inhalte frei. Die Ebenensteuerung verwaltet die Stapelreihenfolge, und fertige Elemente können gesperrt werden, während andere bearbeitet werden. Fügen Sie benutzerdefinierten Text mit sieben Schriftarten hinzu (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), mit einstellbarer Größe und Farbe sowie Textumriss-Breite von 0 bis 10 mit 0,5-Schritt-Granularität. Aktivieren Sie Name-und-Datum-Felder für unterrichtsfertige Formatierung und Übungsnummern (25px Breite, 15px Abstand) für einfache Referenz bei der Besprechung. Zoomen Sie von 25% bis 300% für Detailarbeit. Rückgängig und Wiederholen mit bis zu 20 Verlaufszuständen über Strg+Z und Strg+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Was-Passt-Nicht-Arbeitsblätter online verkaufen',
    cases: [
      {
        title: 'Thematische Ausreißer-Rätsel-Pakete auf Etsy',
        description:
          'Erstellen Sie thematische Pakete zur visuellen Unterscheidung mithilfe des Zwei-Themen-Systems — Tiere gegen Lebensmittel, Fahrzeuge gegen Natur, Feiertage gegen Sport und Dutzende weitere themenübergreifende Kombinationen. Jede Themen-Paarung erzeugt genügend einzigartige Übungen für mehrere Arbeitsblätter mit Identisch- und Ähnlich-Modus. Verpacken Sie 10–20 Was-passt-nicht-Arbeitsblätter pro Paket mit beigelegten Lösungsschlüsseln und verkaufen Sie zu 3–7 € pro Set. Das rein visuelle Format bedeutet, dass jedes Paket ohne Anpassung für jeden Sprachmarkt funktioniert und Ihre Kundenbasis global erweitert. Nutzen Sie passende Hintergrund- und Rahmenthemen, um jedem Paket ein stimmiges visuelles Erscheinungsbild zu verleihen, das Käufer auf Etsy.de sofort anspricht.',
        platform: 'Etsy (etsy.de)',
      },
      {
        title: 'Arbeitsbücher zur visuellen Unterscheidung auf Amazon KDP',
        description:
          'Stellen Sie 40–80 Was-passt-nicht-Arbeitsblätter zu einem gedruckten Arbeitsbuch im Amazon-KDP-Format zusammen. Strukturieren Sie Ihr Buch mit progressivem Schwierigkeitsgrad: Frühe Kapitel verwenden den Identisch-Modus (Finde den Nicht-Klon), mittlere Kapitel verwenden den Ähnlich-Modus mit offensichtlichen Themenkontrasten, und fortgeschrittene Kapitel verwenden den Ähnlich-Modus mit subtileren Unterscheidungen. Nutzen Sie die Modus-Überschreibung pro Übung, um gemischte Schwierigkeitsstufen auf einzelnen Seiten zu erstellen, die zwischen visuellen Strategien wechseln. Fügen Sie Lösungsschlüssel am Ende des Buches ein, erstellt mit dem automatischen Lösungsschlüssel mit roten Kreisen. Der Graustufen-Schalter erzeugt tintenschonende Seiten für Schwarzweiß-Buchinhalte, die Druckkosten niedrig halten. Rein visuelle Rätsel benötigen keine Übersetzung — ein einziges Buch ist in jedem Amazon-Markt verkaufbar, von Amazon.de bis Amazon.com und darüber hinaus. Nutzen Sie die Seitengröße-Optionen, um KDP-konforme Formate wie Letter oder A4 direkt zu exportieren, ohne nachträgliche Anpassungen vornehmen zu müssen.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Rätsel-Aktivitäten für kritisches Denken auf Gumroad',
        description:
          'Erstellen Sie sofort einsetzbare Was-passt-nicht-Arbeitsblätter mit Name-und-Datum-Feldern, Übungsnummern und gedruckten Lösungsschlüsseln. Auf dem Gumroad werden Arbeitsblätter für kritisches Denken geschätzt, die unterrichtsfertig ankommen — das Namensfeld sichert die Zuordnung, Übungsnummern erleichtern die Klassenbesprechung, und der Lösungsschlüssel mit roten Kreisen spart wahrgenommenen Mehrwert. Erstellen Sie lehrplanbezogene Sets: Tierklassifikations-Herausforderungen, Lebensmittelgruppen-Unterscheidung, Berufe-Identifikation und jahreszeitliche Wahrnehmungsrätsel. Jedes Set enthält Arbeitsblätter und Lösungsschlüssel in PDF- und JPEG-Formaten. Kombinieren Sie verschiedene Übungsanzahlen und Modi innerhalb eines Produkts, damit Verkäufer Material für unterschiedliche Lernstufen in einem einzigen Kauf erhalten und Ihre Produkte als besonders vielseitig wahrgenommen werden.',
        platform: 'Gumroad',
      },
      {
        title: 'Saisonale und feiertagsbezogene Puzzle-Sammlungen',
        description:
          'Die 104 thematischen Bildsammlungen decken jede saisonale und feiertagsbezogene Gelegenheit ab — Weihnachten, Halloween, Ostern, Valentinstag, Schulanfang, Sommerferien und vieles mehr. Erstellen Sie aktuell verfügbare Was-passt-nicht-Sammlungen, die sich an den Haupt-Einkaufsperioden orientieren. Veröffentlichen Sie Halloween-Rätsel-Pakete im September, Weihnachts-Sammlungen im Oktober und Valentinstags-Pakete im Januar. Mischen Sie Identisch- und Ähnlich-Modi innerhalb jedes saisonalen Sets für Vielfalt und gesteigerten wahrgenommenen Wert. Saisonale Produkte erzielen höhere Preise während ihrer Spitzenzeiten und schaffen natürliche Gründe für Wiederholungskäufe, da Käufer zu jeder neuen Saison frische Rätsel-Aktivitäten suchen.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonal)',
      },
      {
        title: 'Globale Marktreichweite mit rein visuellen Rätseln',
        description:
          'Was-passt-nicht-Arbeitsblätter sind vollständig visuell — kein Text erscheint auf dem Rätselinhalt selbst. Der automatisch generierte Header übersetzt sich in alle 11 unterstützten Sprachen, aber die Übungsinhalte enthalten nur Bilder. Das bedeutet, jedes Arbeitsblatt funktioniert in jeder Sprache ohne Anpassung und macht Was-passt-nicht-Rätsel einzigartig effizient für internationale Märkte. Erstellen Sie ein Set von Arbeitsblättern und listen Sie es in mehreren sprachspezifischen Etsy-Shops oder Amazon-KDP-Marktplätzen auf. Dasselbe Produkt bedient englische, deutsche, französische, spanische und jeden anderen Markt gleichzeitig — maximale Reichweite ohne zusätzlichen Produktionsaufwand. Diese Sprachunabhängigkeit ist ein einzigartiger Wettbewerbsvorteil gegenüber textbasierten Arbeitsblatt-Produkten, die für jeden Zielmarkt separat übersetzt und angepasst werden müssen. Während Ihre Konkurrenz in Übersetzungsarbeit investiert, verkaufen Sie dasselbe Produkt weltweit und maximieren Ihren Umsatz pro erstelltem Arbeitsblatt.',
        platform: 'Etsy / Amazon KDP (globale Märkte)',
      },
    ],
  },

  faq: [
    {
      question: 'Wie funktioniert die Was-passt-nicht-Mechanik?',
      answer:
        'Jede Übung zeigt vier Bilder in einer horizontalen Karte — drei gemeinsame Bilder und ein abweichendes Bild. Es wird die Reihe betrachtet, das nicht dazugehörende Bild identifiziert und eingekreist. Die Position des Ausreißers wird innerhalb der Reihe zufällig gemischt, sodass er in jedem der vier Plätze erscheinen kann. Übungen werden vertikal auf der Seite angeordnet, wobei das Layout bei Querformat oder Hochformat mit 7 oder mehr Übungen auf 2 Spalten umschaltet. Diese Mechanik fördert visuelle Wahrnehmung und kategoriales Denken auf eine intuitiv verständliche Weise, die keine Textkenntnis oder Sprachfähigkeiten voraussetzt und deshalb für jedes Alter und jede Sprache sofort zugänglich ist.',
    },
    {
      question: 'Was ist der Unterschied zwischen Identisch- und Ähnlich-Modus?',
      answer:
        'Der Identisch-Modus platziert drei Klone desselben Bildes neben einem anderen Bild aus demselben Thema — hier wird das Nicht-Duplikat erkannt. Der Ähnlich-Modus verwendet drei Bilder aus Thema A (z. B. Tiere) und ein Bild aus Thema B (z. B. Lebensmittel) — hier wird der thematische Ausreißer identifiziert. Der Identisch-Modus ist einfacher, weil visuelle Duplikate verglichen werden. Der Ähnlich-Modus ist schwieriger, weil alle vier Bilder unterschiedlich sind und die Unterscheidung kategorial statt visuell ist.',
    },
    {
      question: 'Wie funktioniert die Modus-Überschreibung pro Übung?',
      answer:
        'Jede Übungszeile enthält ein eigenes Modus-Dropdown, mit dem der globale Modus überschrieben werden kann. Setzen Sie den globalen Modus auf Ähnlich und schalten Sie einzelne Übungen auf Identisch um — oder umgekehrt. So entstehen gemischte Schwierigkeits-Arbeitsblätter, bei denen einige Übungen einfacher (Identisch) und andere schwieriger (Ähnlich) sind — alles auf derselben Seite. Ein \"Auswahl zurücksetzen\"-Button setzt alle Überschreibungen auf die globale Einstellung zurück.',
    },
    {
      question: 'Wie viele Übungen kann ich auf ein Arbeitsblatt setzen?',
      answer:
        'Die Übungsanzahl ist von 5 bis 10 konfigurierbar (Standard: 6). Jede Übung enthält immer genau 4 Bilder (3 gemeinsame + 1 Ausreißer). Weniger Übungen erzeugen größere Bildkarten mit mehr Abstand; mehr Übungen erhöhen die Inhaltsdichte. Das Layout passt sich automatisch an — Hochformat-Seiten mit 7+ Übungen und alle Querformat-Seiten verwenden ein 2-Spalten-Layout für optimalen Abstand.',
    },
    {
      question: 'Wie funktioniert das Zwei-Themen-System im Ähnlich-Modus?',
      answer:
        'Im Ähnlich-Modus wählen Sie zwei Themen aus den Dropdown-Menüs. Thema A liefert die drei gemeinsamen Bilder für jede Übung (z. B. Tiere), und Thema B liefert den einzelnen Ausreißer (z. B. Lebensmittel). Dies garantiert, dass der Ausreißer immer thematisch verschieden ist. Wählen Sie aus beliebigen Kombinationen der 104 verfügbaren Themen. Im Identisch-Modus wird nur ein Thema benötigt, da sowohl die gemeinsamen Klone als auch das abweichende Bild aus derselben Sammlung stammen.',
    },
    {
      question: 'Wie funktioniert der automatisch generierte Lösungsschlüssel mit roten Kreisen?',
      answer:
        'Der Generator verwendet ein Dual-Canvas-System mit einem Arbeitsblatt-Tab und einem Lösungsschlüssel-Tab. Das Arbeitsblatt zeigt die Übungskarten ohne Markierungen — der Ausreißer wird selbst eingekreist. Der Lösungsschlüssel reproduziert das identische Layout und zeichnet einen roten Kreisumriss um den Ausreißer in jeder Reihe. Die Strichstärke des Kreises skaliert dynamisch mit der Bildgröße (das Größere von Bildgröße × 0,04 oder 3 Pixel). Beide Versionen werden separat über vier dedizierte Download-Buttons in JPEG und PDF exportiert.',
    },
    {
      question: 'Kann ich Name-und-Datum-Felder zu Was-passt-nicht-Arbeitsblättern hinzufügen?',
      answer:
        'Ja. Aktivieren Sie das Kontrollkästchen \"Name-und-Datum-Felder einfügen\" im Übungskonfigurations-Panel, um Namens- und Datumszeilen hinzuzufügen. Diese Felder positionieren sich responsiv basierend auf dem Seitenlayout. Name-und-Datum-Felder machen Arbeitsblätter unterrichtsfertig — Verkäufer können die Zuordnung nachverfolgen und erledigte Aktivitäten nach Datum organisieren. Diese Funktion steigert den wahrgenommenen Wert für Käufer auf Gumroad erheblich, da unterrichtsfertige Formatierung ein entscheidendes Kaufkriterium darstellt.',
    },
    {
      question: 'Wie funktionieren Übungsnummern?',
      answer:
        'Aktivieren Sie das Kontrollkästchen \"Übungsnummern einfügen\" im Übungskonfigurations-Panel, um Nummern auf der linken Seite jeder Übungskarte anzuzeigen. Die Nummern verwenden 25px Breite mit 15px Abstand zum Karteninhalt. Übungsnummern helfen bei der Klassenbesprechung und erleichtern es Verkäufern, auf bestimmte Übungen während der Diskussion zu verweisen. Für Verkäufer auf Gumroad sind nummerierte Übungen ein wichtiges Qualitätsmerkmal, das den professionellen Eindruck Ihrer Druckvorlagen verstärkt.',
    },
    {
      question: 'Gibt es eine kostenlose Testversion?',
      answer:
        'Ja. Sie können jede Funktion nutzen — beide Erzeugungsmodi, Modus-Überschreibung pro Übung, konfigurierbare Übungsanzahl, den automatisch generierten Lösungsschlüssel, die vollständige Bildbibliothek, Hintergrund- und Rahmenthemen, Name-und-Datum-Felder, Übungsnummern und alle Download-Formate — ohne ein Konto zu erstellen, eine Kreditkarte einzugeben oder Software zu installieren. Downloads der kostenlosen Testversion enthalten ein kleines Wasserzeichen. Eine kommerzielle Lizenz entfernt das Wasserzeichen und gewährt volle Verkaufsrechte für alle erstellten Was-passt-nicht-Arbeitsblätter. Der Generator läuft vollständig im Browser — keine Installation erforderlich.',
    },
    {
      question: 'Sind Was-passt-nicht-Arbeitsblätter sprachabhängig?',
      answer:
        'Nein. Anders als bei Apps, die Wörter auf dem Arbeitsblatt anzeigen, sind Was-passt-nicht-Rätsel vollständig visuell — kein Text erscheint auf dem Rätselinhalt selbst. Der automatisch generierte Header (\"Finde den Ausreißer\") übersetzt sich in alle 11 unterstützten Sprachen, aber die eigentlichen Übungen enthalten nur Bilder. Das bedeutet, jedes Arbeitsblatt funktioniert in jeder Sprache ohne Anpassung, was Was-passt-nicht-Rätsel ideal für globale Marktplatz-Verkäufe macht. Ein in Deutschland erstelltes Arbeitsblatt funktioniert identisch für Käufer in Frankreich, den USA, Japan oder Brasilien.',
    },
    {
      question: 'Kann ich mit diesem Tool erstellte Was-passt-nicht-Arbeitsblätter auf Etsy und Amazon KDP verkaufen?',
      answer:
        'Ja. Mit einer kommerziellen Lizenz haben Sie volle Rechte, Ihre Was-passt-nicht-Arbeitsblätter als digitale Downloads auf Etsy.de, als gedruckte Arbeitsbücher auf Amazon KDP, als Produktmaterialien auf Gumroad oder über jeden anderen Vertriebskanal zu verkaufen. Die zwei Erzeugungsmodi, Modus-Überschreibung pro Übung und 104 thematische Bildsammlungen geben Ihnen die kreativen Werkzeuge, um originale, verkaufsfertige Produkte zur visuellen Unterscheidung zu erstellen.',
    },
    {
      question: 'Was ist Ihre Rückgabepolitik?',
      answer:
        'Da die kostenlose Testversion Ihnen vollständigen Zugang zu jeder Funktion gewährt, bieten wir keine Rückerstattung für kommerzielle Lizenzen an. Sie können beide Erzeugungsmodi, das Modus-Überschreibungssystem pro Übung, den automatisch generierten Lösungsschlüssel, die vollständige Bildbibliothek, Hintergrund- und Rahmenthemen, Name-und-Datum-Felder, Übungsnummern und alle Download-Formate vor dem Kauf ausgiebig testen. Die kostenlose Testversion ist die Rückgabepolitik — stellen Sie sicher, dass das Tool Ihren Anforderungen entspricht, bevor Sie eine Lizenz erwerben. Es ist keine zeitliche Begrenzung für die Testphase vorgesehen — erstellen Sie so viele Arbeitsblätter wie Sie möchten und überzeugen Sie sich in Ruhe von der Qualität, bevor Sie sich für einen Kauf entscheiden.',
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
      slug: 'fehlende-puzzleteile-arbeitsblaetter',
      anchorText: 'Fehlende-Puzzleteile-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'kinder-sudoku-arbeitsblaetter',
      anchorText: 'Kinder-Sudoku-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'bilderpfad-arbeitsblaetter',
      anchorText: 'Bilderpfad-Arbeitsblatt-Generator',
    },
    {
      pageType: 'app',
      slug: 'schattenbilder-zuordnen-arbeitsblaetter',
      anchorText: 'Schattenbilder-Zuordnen-Generator',
    },
    {
      pageType: 'app',
      slug: 'suchen-und-zaehlen-arbeitsblaetter',
      anchorText: 'Suchen-und-Zählen-Arbeitsblatt-Generator',
    },
    {
      pageType: 'bundle',
      slug: 'raetsel-logik-paket',
      anchorText: 'Rätsel-und-Logik-Paket — Alle Puzzle-Apps in einem Paket',
    },
    {
      pageType: 'idea',
      slug: 'farm-animals-printable-ideas',
      anchorText: 'Bauernhof-Druckvorlagen-Ideen für Arbeitsblätter',
    },
    {
      pageType: 'idea',
      slug: 'erste-klasse-druckvorlagen-ideen',
      anchorText: 'Erste-Klasse Druckvorlagen-Ideen für Grundschule',
    },
    {
      pageType: 'idea',
      slug: 'zweite-klasse-druckvorlagen-ideen',
      anchorText: 'Zweite-Klasse Druckvorlagen-Ideen für K-2-Produktmarkt',
    },
    {
      pageType: 'start',
      slug: 'amazon-kdp-aktivitaetsbuecher',
      anchorText: 'Aktivitätsbücher auf Amazon KDP veröffentlichen',
    },
    {
      pageType: 'guide',
      slug: 'was-passt-nicht-raetsel-erstellen',
      anchorText: 'Was-passt-nicht-Rätsel erstellen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/german/odd one out/Finde das Andere 1.webp',
      primaryAlt: 'Was-passt-nicht-Arbeitsblatt mit vier Bildern pro Übungsreihe, farbenfrohen thematischen Illustrationen und lokalisiertem Finde-den-Ausreißer-Header',
    },
    sampleGallery: [
      {
        src: '/samples/german/odd one out/Finde das Andere 2.webp',
        alt: 'Ähnlich-Modus-Was-passt-nicht-Arbeitsblatt mit drei Tierbildern und einem Lebensmittelbild pro Reihe',
        caption: 'Ähnlich-Modus — drei Bilder aus Thema A und ein Ausreißer aus Thema B',
      },
      {
        src: '/samples/german/odd one out/Finde das Andere 3.webp',
        alt: 'Identisch-Modus-Was-passt-nicht-Arbeitsblatt mit drei identischen Bildern und einem abweichenden Bild pro Reihe',
        caption: 'Identisch-Modus — drei Klone desselben Bildes und ein abweichendes Bild',
      },
      {
        src: '/samples/german/odd one out/Finde das Andere 1 answer-key.webp',
        alt: 'Was-passt-nicht-Lösungsschlüssel mit roten Kreisen um den Ausreißer in jeder Übungsreihe',
        caption: 'Automatisch generierter Lösungsschlüssel — rote Kreise markieren den Ausreißer in jeder Reihe',
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Was-Passt-Nicht-Arbeitsblätter mit zwei Modi und automatischen Lösungsschlüsseln erstellen — Schritt-für-Schritt-Anleitung',
  },
};

export default content;
