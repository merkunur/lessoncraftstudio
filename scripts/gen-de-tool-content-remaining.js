/**
 * Generate 20 missing German tool-content files
 * Run: node scripts/gen-de-tool-content-remaining.js
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'de');

const apps = [
  {
    appId: 'big-small',
    filename: 'kostenloses-gross-und-klein-arbeitsblaetter-tool.ts',
    seo: {
      titleTag: 'Kostenloser Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter-Generator | Gro\u00df & Klein',
      metaDescription: 'Erstellen Sie kostenlose Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter mit 104 Bildthemen. Kreise das gro\u00dfe, kleine oder mittlere Objekt ein. Drei \u00dcbungsmodi mit L\u00f6sungsschl\u00fcssel. Sofort als PDF.',
      primaryKeyword: 'kostenlose Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter',
      secondaryKeywords: [
        'Gro\u00df und Klein Arbeitsblatt erstellen',
        'Gr\u00f6\u00dfenvergleich \u00dcbungen Vorschule',
        'Kostenlose Gr\u00f6\u00dfenvergleich-Aktivit\u00e4ten',
        'Gro\u00df oder Klein druckbar kostenlos',
        'Gr\u00f6\u00dfen vergleichen Arbeitsblatt-Generator',
      ],
      lsiKeywords: [
        'Visuelle Unterscheidung Aktivit\u00e4ten',
        'Vorschule Mathe-Konzepte',
        'Gr\u00f6\u00dfenordnung Arbeitsbl\u00e4tter',
        'Fr\u00fche Mathe-F\u00e4higkeiten druckbar',
        'Kindergarten Gr\u00f6\u00dfen-Aktivit\u00e4ten',
        'Messkonzepte Vorschule',
        'Objekte vergleichen \u00dcbung',
        'Visuelle Vor\u00fcbungen Mathe',
      ],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/big small/big-small (1).jpeg',
        primaryAlt: 'Kostenloses Gr\u00f6\u00dfenvergleich-Arbeitsblatt mit gro\u00dfen und kleinen Objekten f\u00fcr Vorschulkinder',
        secondary: '/samples/english/big small/big-small (2).jpeg',
        secondaryAlt: 'Gr\u00f6\u00dfenvergleich-Aktivit\u00e4t mit verschiedenen Themenbildern zur visuellen Unterscheidung',
      },
      sampleGallery: [
        { src: '/samples/english/big small/big-small (1).jpeg', alt: 'Gr\u00f6\u00dfenvergleich-Arbeitsblatt mit identischen Bildern in drei Gr\u00f6\u00dfen', caption: 'Identische Bilder \u2014 kreise das gro\u00dfe ein' },
        { src: '/samples/english/big small/big-small (2).jpeg', alt: 'Gro\u00df-und-Klein-Arbeitsblatt mit verschiedenen Bildern', caption: 'Verschiedene Bilder f\u00fcr mehr Herausforderung' },
        { src: '/samples/english/big small/big-small (3).jpeg', alt: 'Kreise das mittlere Objekt ein mit Nummernbeschriftung', caption: 'Mittleres Objekt mit Beschriftungen' },
        { src: '/samples/english/big small/big-small (4).jpeg', alt: 'Tierthema Gro\u00df-und-Klein-Arbeitsblatt f\u00fcr Vorschule', caption: 'Tierthema \u2014 104 Themen verf\u00fcgbar' },
        { src: '/samples/english/big small/big-small (5).jpeg', alt: 'Gr\u00f6\u00dfenvergleich-Arbeitsblatt mit automatischem L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel inklusive' },
        { src: '/samples/english/big small/big-small (6).jpeg', alt: 'Fahrzeugthema Gr\u00f6\u00dfenordnungs-Arbeitsblatt f\u00fcr Kindergarten', caption: 'Fahrzeugthema \u2014 ideal f\u00fcr Jungen' },
      ],
      youtubeId: 'S2s2U6Nb7FI',
      videoTitle: 'So erstellen Sie Gro\u00df-und-Klein-Arbeitsbl\u00e4tter \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Gro\u00df & Klein Arbeitsbl\u00e4tter-Generator',
      tagline: 'Erstellen Sie Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter mit 104 Bildthemen und laden Sie sie sofort herunter \u2014 keine Anmeldung erforderlich',
      description: `Dieser kostenlose Gr\u00f6\u00dfenvergleich-Generator hilft Kindern, fundamentale mathematische Konzepte spielerisch zu erlernen. Statt abstrakter Zahlen vergleichen Sch\u00fcler bunte Bilder \u2014 Tiere, Fahrzeuge, Lebensmittel und \u00fcber 100 weitere Themen \u2014 und entscheiden, welches Objekt das gr\u00f6\u00dfte, kleinste oder mittlere ist. Jedes Arbeitsblatt wird als druckfertige PDF mit passendem L\u00f6sungsschl\u00fcssel exportiert, bereit f\u00fcr Ihren Unterricht, Ihre Homeschool-Stunde oder Ihren digitalen Produktshop.

Drei \u00dcbungsmodi decken verschiedene Entwicklungsstufen ab. Der Modus \u201EIdentische Bilder\u201C zeigt dasselbe Bild in drei verschiedenen Gr\u00f6\u00dfen \u2014 perfekt f\u00fcr die j\u00fcngsten Lernenden, die gerade beginnen, Gr\u00f6\u00dfenunterschiede wahrzunehmen. Der Modus \u201EVerschiedene Bilder\u201C verwendet unterschiedliche Motive innerhalb eines Themas, was eine zus\u00e4tzliche kognitive Herausforderung bietet. Der gemischte Modus kombiniert beide Formate f\u00fcr umfassende \u00dcbung und Leistungs\u00fcberpr\u00fcfung.

Sie bestimmen die Aufgabenart (kreise das Gro\u00dfe, Kleine oder Mittlere ein), die Anzahl der Aufgaben pro Seite, das Seitenformat und dekorative Rahmen. Der integrierte Canvas-Editor erm\u00f6glicht das Anpassen von Texten, Farben und Layouts vor dem Export. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgraden Sie auf ein Commercial Pack, um das Wasserzeichen zu entfernen und unbegrenzt auf Etsy, Amazon KDP oder Teachers Pay Teachers zu verkaufen.`,
    },
    whatYouCanCreate: [
      { title: 'Thematische Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter', description: 'Erstellen Sie Arbeitsbl\u00e4tter zu jedem Thema \u2014 Tiere, Fahrzeuge, Natur, Feiertage \u2014 mit passenden Bildern, die junge Lernende motivieren und visuelles Unterscheidungsverm\u00f6gen st\u00e4rken.' },
      { title: 'Differenzierte \u00dcbungspakete', description: 'Erstellen Sie Sets mit steigendem Schwierigkeitsgrad: identische Bilder f\u00fcr Anf\u00e4nger, verschiedene Bilder f\u00fcr Fortgeschrittene und gemischte Aufgaben f\u00fcr leistungsstarke Sch\u00fcler.' },
      { title: 'Vorschul-Mathe-Arbeitsbuch', description: 'Kombinieren Sie Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter verschiedener Themen zu einem druckbaren PDF-Arbeitsbuch. Ideal als digitales Produkt auf Etsy oder als Klassen\u00fcbungsheft.' },
      { title: 'Morgenarbeit und Warm-ups', description: 'Produzieren Sie Arbeitsbl\u00e4tter f\u00fcr eine ganze Woche in Minuten. Perfekt als schnelle Aufw\u00e4rm\u00fcbung zum Beginn des Mathematikunterrichts.' },
      { title: '\u00dcbungsbl\u00e4tter f\u00fcr zu Hause', description: 'Senden Sie ansprechende Arbeitsbl\u00e4tter nach Hause, die Eltern ohne Vorbereitung nutzen k\u00f6nnen. Das visuelle Format erm\u00f6glicht Kindern, selbstst\u00e4ndig zu arbeiten.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Kostenlosen Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C, um den Generator direkt in Ihrem Browser zu starten. Kein Konto oder Download erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 illustrierte Kategorien \u2014 Tiere, Essen, Fahrzeuge, Feiertage und mehr. Jedes Thema enth\u00e4lt Dutzende einzigartiger Bilder.' },
        { title: '\u00dcbungsmodus w\u00e4hlen', description: 'W\u00e4hlen Sie \u201EIdentische Bilder\u201C f\u00fcr Anf\u00e4nger, \u201EVerschiedene Bilder\u201C f\u00fcr Fortgeschrittene oder \u201EGemischt\u201C f\u00fcr umfassende \u00dcbung.' },
        { title: 'Aufgabentyp festlegen', description: 'Bestimmen Sie, ob Sch\u00fcler das gro\u00dfe, das kleine oder das mittlere Objekt einkreisen sollen. Jeder Typ f\u00f6rdert unterschiedliche Beobachtungsf\u00e4higkeiten.' },
        { title: 'Layout anpassen', description: 'Legen Sie die Anzahl der Aufgaben pro Seite fest, w\u00e4hlen Sie Hoch- oder Querformat, Seitenformat und eine Schriftart aus mehreren Optionen.' },
        { title: 'Arbeitsblatt generieren', description: 'Klicken Sie auf \u201EGenerieren\u201C. Das Tool erstellt Ihr Arbeitsblatt und einen passenden L\u00f6sungsschl\u00fcssel in Sekunden.' },
        { title: 'Im Canvas bearbeiten', description: 'Verwenden Sie den integrierten Editor, um Text hinzuzuf\u00fcgen, Farben zu \u00e4ndern und dekorative Rahmen hinzuzuf\u00fcgen.' },
        { title: 'Herunterladen und drucken', description: 'Exportieren Sie als hochaufl\u00f6sendes PDF oder JPEG. Drucken Sie f\u00fcr Ihren Unterricht oder verkaufen Sie als digitales Produkt.' },
      ],
    },
    businessIdeas: [
      { title: 'Thematische Gr\u00f6\u00dfenvergleich-Arbeitsbuch-Serie', description: 'Erstellen Sie 20-seitige Arbeitsb\u00fccher nach Themen. Verkaufen Sie jedes f\u00fcr 3\u20135\u00a0$ als Sofort-Download-PDF auf Etsy.', platform: 'Etsy' },
      { title: 'Vorschul-Mathe-Starter-Paket', description: 'Kombinieren Sie Gr\u00f6\u00dfenvergleich mit Z\u00e4hl- und Muster-Arbeitsbl\u00e4ttern zu einem umfassenden Vorschul-Mathe-Paket f\u00fcr Lehrkr\u00e4fte.', platform: 'Teachers Pay Teachers' },
      { title: 'Aktivit\u00e4tsbuch f\u00fcr Amazon KDP', description: 'Stellen Sie 50\u2013100 Arbeitsbl\u00e4tter zu einem Taschenbuch zusammen. Amazon \u00fcbernimmt Druck und Versand.', platform: 'Amazon KDP' },
      { title: 'Saisonale Vergleichspakete', description: 'Erstellen Sie Feiertagsthemen-Pakete: Halloween, Weihnachten, Ostern. Saisonale Produkte verkaufen sich in vorhersehbaren Wellen.', platform: 'Gumroad' },
      { title: 'Mehrsprachige Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter', description: 'Nutzen Sie die 11 unterst\u00fctzten Sprachen f\u00fcr DaF-Unterricht und zweisprachige Familien. Weniger Wettbewerb in nicht-englischen M\u00e4rkten.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Starten Sie mit identischen Bildern', tip: 'Kinder ab 3 Jahren lernen Gr\u00f6\u00dfenunterschiede am besten, wenn dasselbe Bild in verschiedenen Gr\u00f6\u00dfen gezeigt wird. Das entfernt alle ablenkenden Variablen.' },
      { title: 'Steigern Sie den Schwierigkeitsgrad schrittweise', tip: 'Beginnen Sie mit \u201EKreise das Gro\u00dfe ein\u201C, dann \u201EKreise das Kleine ein\u201C, und fordern Sie zum Schluss mit \u201EKreise das Mittlere ein\u201C heraus.' },
      { title: 'Themen an Ihren Lehrplan anpassen', tip: 'Unterrichten Sie eine Einheit \u00fcber Tiere? Verwenden Sie das Tierthema, damit Gr\u00f6\u00dfenvergleich gleichzeitig den Sachunterricht verst\u00e4rkt.' },
      { title: 'Querformat f\u00fcr j\u00fcngere Kinder', tip: 'Querformat gibt jeder Aufgabe mehr Platz, was f\u00fcr kleine H\u00e4nde einfacher ist. Ideal f\u00fcr Vorschulgruppen.' },
    ],
    faq: [
      { question: 'Ist dieser Gr\u00f6\u00dfenvergleich-Generator wirklich kostenlos?', answer: 'Ja. Alle Funktionen, alle 104 Themen, PDF-Export und L\u00f6sungsschl\u00fcssel sind kostenlos. Die einzige Einschr\u00e4nkung ist ein kleines Wasserzeichen. Kein Konto erforderlich.' },
      { question: 'F\u00fcr welche Altersgruppe sind diese Arbeitsbl\u00e4tter?', answer: 'Die Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von 3\u20136 Jahren (Vorschule bis erste Klasse). Der Modus \u201EIdentische Bilder\u201C ist f\u00fcr die J\u00fcngsten, \u201EVerschiedene Bilder\u201C f\u00fcr Fortgeschrittene.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Mit der kostenlosen Version enthalten sie ein Wasserzeichen. Das Commercial Pack ($27) entfernt es und gew\u00e4hrt eine kommerzielle Lizenz f\u00fcr Etsy, Amazon KDP oder andere Plattformen.' },
      { question: 'Welche Dateiformate kann ich herunterladen?', answer: 'JPEG und PDF in hoher Aufl\u00f6sung. Der L\u00f6sungsschl\u00fcssel wird separat exportiert. PDFs sind f\u00fcr A4, Letter oder Legal formatiert.' },
      { question: 'Wie viele Themen sind verf\u00fcgbar?', answer: 'Die kostenlose Version enth\u00e4lt eine Auswahl. Das Full Access Pack ($47) schaltet alle 104 Themen frei \u2014 Tiere, Essen, Fahrzeuge, Natur und mehr.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter anpassen?', answer: 'Ja. Der Canvas-Editor erlaubt das Hinzuf\u00fcgen von Text, \u00c4ndern von Farben, Repositionieren von Elementen und Hinzuf\u00fcgen dekorativer Rahmen.' },
      { question: 'Enthalten die Arbeitsbl\u00e4tter L\u00f6sungsschl\u00fcssel?', answer: 'Jedes Arbeitsblatt generiert automatisch einen L\u00f6sungsschl\u00fcssel mit klar markierten richtigen Antworten f\u00fcr schnelle Bewertung.' },
      { question: 'Kann ich diese f\u00fcr Homeschooling nutzen?', answer: 'Absolut. Erstellen Sie t\u00e4glich frische Arbeitsbl\u00e4tter zu verschiedenen Themen. Passen Sie Themen an die Interessen Ihres Kindes an.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Das Commercial Pack ($27) entfernt das Wasserzeichen und gew\u00e4hrt kommerzielle Lizenz. Das Full Access Pack ($47) enth\u00e4lt zus\u00e4tzlich alle 104 Themen und die vollst\u00e4ndige Bildbibliothek.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst alles mit der kostenlosen Version.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-muster-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-schatten-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Schatten-Zuordnung-Tool' },
      { slug: 'kostenloses-bilder-sortieren-tool', pageType: 'tool', anchorText: 'Kostenloses Bilder-Sortieren-Tool' },
      { slug: 'kostenloses-finden-und-zaehlen-tool', pageType: 'tool', anchorText: 'Kostenloses Finden-und-Z\u00e4hlen-Tool' },
      { slug: 'kostenloses-was-passt-nicht-tool', pageType: 'tool', anchorText: 'Kostenloses Was-passt-nicht-Tool' },
      { slug: 'big-small', pageType: 'app', anchorText: 'Gr\u00f6\u00dfenvergleich-Generator \u2014 Alle Details' },
      { slug: 'pattern-bundle', pageType: 'bundle', anchorText: 'Muster & Logik Arbeitsblatt-Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'bingo',
    filename: 'kostenloses-bingo-karten-tool.ts',
    seo: {
      titleTag: 'Kostenloser Bild-Bingo-Karten-Generator | Bingo-Ersteller',
      metaDescription: 'Erstellen Sie kostenlose Bild-Bingo-Karten mit 104 Bildthemen. Stapelexport einzigartiger Karten als ZIP, optionale Beschriftungen, eigene Layouts. Sofort als PDF.',
      primaryKeyword: 'kostenloser Bild-Bingo-Karten-Generator',
      secondaryKeywords: [
        'Bingo-Karten-Ersteller kostenlos druckbar',
        'Individuelle Bingo-Karten Generator',
        'Bild-Bingo-Spiel-Ersteller',
        'Kostenlose Bingo-Karten Kinder druckbar',
        'Bingo-Arbeitsblatt-Ersteller online',
      ],
      lsiKeywords: [
        'Druckbare Bingo-Karten Kinder',
        'Klassen-Bingo-Spiel',
        'P\u00e4dagogische Bingo-Aktivit\u00e4ten',
        'Party-Bingo-Karten druckbar',
        'Bingo-Spiel-Generator kostenlos',
        'Individuelle Bingo-Vorlagen',
        'Bild-Bingo Vorschule',
        'Thematische Bingo-Karten-Ersteller',
      ],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/bingo/Bingo Card (1).jpeg',
        primaryAlt: 'Kostenlose Bild-Bingo-Karte mit bunten Themenbildern in einem 5x5-Gitter f\u00fcr Klassenspiele',
        secondary: '/samples/english/bingo/Bingo Card (2).jpeg',
        secondaryAlt: 'Individuelle Bingo-Karte mit optionalen Bildbeschriftungen und dekorativem Rahmen',
      },
      sampleGallery: [
        { src: '/samples/english/bingo/Bingo Card (1).jpeg', alt: 'Bild-Bingo-Karte mit Tierthema im 5x5-Gitter', caption: '5x5-Gitter \u2014 klassisches Bingo-Layout' },
        { src: '/samples/english/bingo/Bingo Card (2).jpeg', alt: 'Bingo-Karte mit optionalen Wortbeschriftungen', caption: 'Optionale Beschriftungen f\u00fcr Wortschatzaufbau' },
        { src: '/samples/english/bingo/Bingo Card (3).jpeg', alt: 'Bingo-Karte mit Essensthema und Freifeld in der Mitte', caption: 'Freifeld-Option in der Mitte' },
        { src: '/samples/english/bingo/Bingo Card (4).jpeg', alt: 'Mehrere einzigartige Bingo-Karten f\u00fcr Stapelexport', caption: 'Stapelexport einzigartiger Karten als ZIP' },
        { src: '/samples/english/bingo/Bingo Card (5).jpeg', alt: 'Bingo-Karte mit Fahrzeugthema und individuellem Rahmen', caption: 'Fahrzeugthema \u2014 104 Themen gesamt' },
        { src: '/samples/english/bingo/Bingo Card (6).jpeg', alt: 'Bingo-Karte mit Naturthema f\u00fcr saisonale Aktivit\u00e4ten', caption: 'Naturthema f\u00fcr saisonale Spiele' },
      ],
      youtubeId: 'd6AOiDXoK1c',
      videoTitle: 'So erstellen Sie Bild-Bingo-Karten \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Bild-Bingo-Karten-Generator',
      tagline: 'Erstellen Sie einzigartige Bild-Bingo-Karten mit 104 Themen, Stapel-ZIP-Export, optionalen Beschriftungen und individuellen Layouts \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Bild-Bingo-Karten-Generator erstellt einzigartige, druckbare Bingo-Karten mit bunten Bildern statt Zahlen. Bingo ist eines der vielseitigsten Klassen- und Partyspiele, und dieses Tool l\u00e4sst Sie professionelle Karten in Sekunden erstellen \u2014 ohne Konto. Jede generierte Karte ist einzigartig \u2014 Bilder werden in unterschiedliche Positionen gemischt, sodass keine zwei Karten identisch sind.

Die Stapelexport-Funktion macht diesen Generator besonders. Brauchen Sie 30 einzigartige Karten f\u00fcr eine ganze Klasse? Generieren und laden Sie alle auf einmal als ZIP-Datei herunter. Jede Karte im Stapel verwendet denselben Bilderpool, ordnet sie aber unterschiedlich an \u2014 f\u00fcr faires Gameplay, bei dem jeder Sch\u00fcler eine eigene Karte hat.

Optionale Bildbeschriftungen erscheinen unter jedem Bild und verwandeln ein einfaches Spiel in eine Wortschatz\u00fcbung. Wenn der Spielleiter \u201EHund\u201C ansagt, m\u00fcssen Sch\u00fcler das Hundebild und seine Beschriftung auf ihrer Karte finden \u2014 das st\u00e4rkt die Worterkennung neben dem visuellen Zuordnen. W\u00e4hlen Sie aus 104 illustrierten Themen \u2014 Tiere, Essen, Fahrzeuge, Natur und mehr. Gittergr\u00f6\u00dfen reichen von 3x3 bis 5x5. Alles funktioniert kostenlos mit einem kleinen Wasserzeichen.`,
    },
    whatYouCanCreate: [
      { title: 'Klassen-Bild-Bingo-Sets', description: 'Generieren Sie 25\u201330 einzigartige Bingo-Karten in einem Stapel f\u00fcr eine ganze Klasse. Jede Karte verwendet dieselben Bilder, aber in verschiedenen Positionen.' },
      { title: 'Vokabel-Bingo-Spiele', description: 'Aktivieren Sie Bildbeschriftungen, um Bingo mit Worterkennung zu verbinden. Der Spielleiter liest W\u00f6rter vor, w\u00e4hrend Sch\u00fcler sie auf ihren Karten finden.' },
      { title: 'Party-Aktivit\u00e4ts-Bingo-Pakete', description: 'Erstellen Sie thematische Bingo-Karten f\u00fcr Geburtstagsfeiern: Dinosaurier-Bingo, Einhorn-Bingo, Piraten-Bingo. Eltern zahlen Premiumpreise f\u00fcr Partyaktivit\u00e4ten.' },
      { title: 'Feiertags- und Saison-Bingo', description: 'Erstellen Sie saisonale Bingo-Sets: Halloween, Weihnachten, Ostern, Fr\u00fchling. Saisonale Produkte erleben jedes Jahr konzentrierte Nachfrage.' },
      { title: 'Schnellspiel 3x3 Bingo-Karten', description: 'Kleine 3x3-Gitter (9 Bilder) erm\u00f6glichen schnelle Bingo-Runden, perfekt f\u00fcr j\u00fcngere Kinder mit k\u00fcrzerer Aufmerksamkeitsspanne.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Bild-Bingo-Karten \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Kostenlosen Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C, um den Bingo-Karten-Generator zu starten. Kein Konto, kein Download, keine Bezahlung erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 illustrierte Themen: Tiere, Fahrzeuge, Essen, Natur, Sport und mehr. Das Thema bestimmt die Bilder auf Ihren Karten.' },
        { title: 'Gittergr\u00f6\u00dfe w\u00e4hlen', description: 'W\u00e4hlen Sie 3x3 (schnelle Spiele), 4x4 (mittlere Spiele) oder 5x5 (klassisches Bingo mit optionalem Freifeld).' },
        { title: 'Beschriftungen ein-/ausschalten', description: 'Bildbeschriftungen unter jedem Bild f\u00fcgen eine Vokabel-Dimension hinzu. Ohne Beschriftungen liegt der Fokus auf visueller Erkennung.' },
        { title: 'Anzahl einzigartiger Karten festlegen', description: 'W\u00e4hlen Sie, wie viele Karten generiert werden (1\u201350). Jede Karte mischt Bilder in unterschiedliche Positionen.' },
        { title: 'Erscheinungsbild anpassen', description: 'Verwenden Sie den Canvas-Editor f\u00fcr Titel, Farben, dekorative Rahmen und Schriftarten. Passen Sie Karten an Ihr Partythema an.' },
        { title: 'Als ZIP, JPEG oder PDF exportieren', description: 'Laden Sie einzelne Karten als JPEG/PDF herunter oder exportieren Sie alle als ZIP-Datei. ZIP-Export ist ideal f\u00fcr Klassensets.' },
      ],
    },
    businessIdeas: [
      { title: 'Thematische Bingo-Karten-Sets auf Etsy', description: 'Erstellen Sie thematische Bingo-Sets (30 einzigartige Karten) und verkaufen Sie als Sofort-Download. Bingo-Karten sind Dauerbrenner.', platform: 'Etsy' },
      { title: 'Party-Aktivit\u00e4tspakete', description: 'B\u00fcndeln Sie Bingo-Karten mit Ausmalseiten und Zuordnungsbl\u00e4ttern zu Partypaketen: \u201EDinosaurier-Party-Paket\u201C.', platform: 'Etsy' },
      { title: 'Klassen-Bingo-Ressourcen f\u00fcr TPT', description: 'Erstellen Sie Bingo-Sets mit Spielleiterkarten und Vokabellisten. Lehrkr\u00e4fte wollen fertige Spielressourcen.', platform: 'Teachers Pay Teachers' },
      { title: 'Saisonale Bingo-Sammlungen', description: 'Erstellen Sie Feiertags-Bingo: Halloween, Weihnachten, Valentinstag, Ostern. B\u00fcndeln Sie alle Jahreszeiten f\u00fcr maximalen Wert.', platform: 'Multi-platform' },
      { title: 'DaF-Vokabel-Bingo-Spiele', description: 'Nutzen Sie beschriftete Bingo-Karten als DaF-Vokabeltools. Erstellen Sie Sets f\u00fcr Kategorien: Tiere, Essen, Kleidung.', platform: 'Gumroad' },
    ],
    proTips: [
      { title: 'Immer Stapelexport f\u00fcr Klassen', tip: 'Generieren Sie mindestens 30 einzigartige Karten, damit jeder Sch\u00fcler eine andere bekommt. Der ZIP-Export macht das in einem Klick.' },
      { title: 'Spielleiterkarte einschlie\u00dfen', tip: 'Jedes Bingo-Produkt sollte eine Spielleiterkarte enthalten, die alle Bilder mit Namen zeigt \u2014 so ist das Spiel sofort spielbar.' },
      { title: 'Beschriftungen f\u00fcr p\u00e4dagogischen Wert', tip: 'Bingo-Karten mit Bildbeschriftungen sind f\u00fcr Lehrkr\u00e4fte wertvoller, weil sie gleichzeitig als Vokabel-Tool dienen.' },
      { title: 'Mehrere Gittergr\u00f6\u00dfen anbieten', tip: '3x3 f\u00fcr kleine Kinder, 4x4 f\u00fcr Kindergarten, 5x5 f\u00fcr \u00e4ltere Sch\u00fcler. Drei Gr\u00f6\u00dfen verdreifachen Ihre Produktanzahl.' },
    ],
    faq: [
      { question: 'Ist der Bingo-Karten-Generator wirklich kostenlos?', answer: 'Ja. Alle Gittergr\u00f6\u00dfen, alle 104 Themen, Beschriftungen, Stapelexport und PDF-Export sind kostenlos. Der einzige Unterschied ist ein kleines Wasserzeichen.' },
      { question: 'Sind alle Bingo-Karten einzigartig?', answer: 'Ja. Jede Karte im Stapel verwendet dieselben Bilder, ordnet sie aber in verschiedenen Positionen an. Keine zwei Karten sind identisch.' },
      { question: 'Kann ich mehrere Karten auf einmal exportieren?', answer: 'Ja. Legen Sie die Kartenanzahl fest (1\u201350) und laden Sie alle als ZIP-Datei herunter. Ideal f\u00fcr Klassensets und Partyspiele.' },
      { question: 'Welche Gittergr\u00f6\u00dfen sind verf\u00fcgbar?', answer: '3x3 (9 Felder, schnelle Spiele), 4x4 (16 Felder, mittlere Spiele) oder 5x5 (25 Felder, klassisches Bingo mit Freifeld).' },
      { question: 'Kann ich Wortbeschriftungen hinzuf\u00fcgen?', answer: 'Ja. Beschriftungen unter jedem Bild verwandeln das Spiel in eine Vokabel-Aktivit\u00e4t. Ohne Beschriftungen fokussiert das Spiel auf visuelle Erkennung.' },
      { question: 'Wie viele Bildthemen gibt es?', answer: '104 illustrierte Themen: Tiere, Fahrzeuge, Essen, Natur, Sport, Musikinstrumente, Jahreszeiten und mehr.' },
      { question: 'Gibt es eine Spielleiterkarte?', answer: 'Ja. Generieren Sie eine Referenzkarte mit allen Bildern und Namen \u2014 das Blatt, das der Spielleiter zum Ansagen verwendet.' },
      { question: 'Kann ich die Bingo-Karten kommerziell nutzen?', answer: 'Die kostenlose Version ist f\u00fcr privaten und Unterrichtsgebrauch. F\u00fcr den Verkauf ben\u00f6tigen Sie ein Commercial Pack ($27) oder Full Access Pack ($47).' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Das Commercial Pack ($27) enth\u00e4lt kommerzielle Lizenz und beliebte Themen. Das Full Access Pack ($47) umfasst alle 104 Themen und alle k\u00fcnftigen Updates.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst alles mit der kostenlosen Version.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-zuordnungs-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Zuordnungs-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-bilder-sortieren-tool', pageType: 'tool', anchorText: 'Kostenloses Bilder-Sortieren-Tool' },
      { slug: 'kostenloses-gitter-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Gitter-Zuordnung-Tool' },
      { slug: 'kostenloses-schatten-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Schatten-Zuordnung-Tool' },
      { slug: 'kostenloses-diagramm-zaehlen-tool', pageType: 'tool', anchorText: 'Kostenloses Diagramm-Z\u00e4hlen-Tool' },
      { slug: 'bingo', pageType: 'app', anchorText: 'Bingo-Karten-Generator \u2014 Alle Details' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Paket' },
      { slug: 'create-bingo-cards', pageType: 'guide', anchorText: 'Bingo-Karten erstellen, die sich verkaufen' },
    ],
  },
  {
    appId: 'chart-count',
    filename: 'kostenloses-diagramm-zaehlen-tool.ts',
    seo: {
      titleTag: 'Kostenloser Bilddiagramm-Arbeitsbl\u00e4tter-Generator | Diagramm & Z\u00e4hlen',
      metaDescription: 'Erstellen Sie kostenlose Bilddiagramm-Arbeitsbl\u00e4tter mit Balkendiagrammen und Piktogrammen. Z\u00e4hlfragen, L\u00f6sungsschl\u00fcssel, 104 Themen. Sofort als PDF herunterladen.',
      primaryKeyword: 'kostenlose Bilddiagramm-Arbeitsbl\u00e4tter',
      secondaryKeywords: ['Diagramm und Z\u00e4hlen Arbeitsblatt erstellen', 'Kostenlose Piktogramm-Arbeitsbl\u00e4tter druckbar', 'Balkendiagramm-Arbeitsblatt-Generator', 'Bildgrafik-Aktivit\u00e4ten kostenlos', 'Diagramm-Arbeitsbl\u00e4tter Kindergarten'],
      lsiKeywords: ['Datenverarbeitung Arbeitsbl\u00e4tter', 'Diagramm-Aktivit\u00e4ten Vorschule', 'Z\u00e4hlen und Grafik druckbar', 'Piktogramm-Aktivit\u00e4ten Kinder', 'Balkendiagramm-Arbeitsbl\u00e4tter kostenlos', 'Fr\u00fche Mathe-Datenf\u00e4higkeiten', 'Strichlisten-Arbeitsbl\u00e4tter', 'Mathe-Diagramm-\u00dcbungen'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/chart count/Chart and Count (1).jpeg',
        primaryAlt: 'Kostenloses Bilddiagramm-Arbeitsblatt mit Balkendiagramm und Themenbildern f\u00fcr Kindergarten',
        secondary: '/samples/english/chart count/Chart and Count (2).jpeg',
        secondaryAlt: 'Piktogramm-Arbeitsblatt mit bunten Bildern und Datenlesefragen',
      },
      sampleGallery: [
        { src: '/samples/english/chart count/Chart and Count (1).jpeg', alt: 'Balkendiagramm-Arbeitsblatt mit Tierthema', caption: 'Balkendiagramm-Stil \u2014 z\u00e4hlen und ausmalen' },
        { src: '/samples/english/chart count/Chart and Count (2).jpeg', alt: 'Piktogramm-Arbeitsblatt mit Essensthema', caption: 'Piktogramm mit Z\u00e4hlfragen' },
        { src: '/samples/english/chart count/Chart and Count (3).jpeg', alt: 'Diagramm-Arbeitsblatt mit Fahrzeugthema', caption: 'Fahrzeugthema \u2014 104 Themen gesamt' },
        { src: '/samples/english/chart count/Chart and Count (4).jpeg', alt: 'Bildgrafik mit Naturthema und Strichlisten', caption: 'Naturthema mit Datenfragen' },
        { src: '/samples/english/chart count/Chart and Count (5).jpeg', alt: 'Diagramm-Arbeitsblatt L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
        { src: '/samples/english/chart count/Chart and Count (6).jpeg', alt: 'Mehrere Diagrammtypen auf einer Seite', caption: 'Verschiedene Diagrammformate' },
      ],
      youtubeId: 'CDgIihDQX6U',
      videoTitle: 'So erstellen Sie Bilddiagramm-Arbeitsbl\u00e4tter \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Diagramm & Z\u00e4hlen Arbeitsbl\u00e4tter-Generator',
      tagline: 'Erstellen Sie Bilddiagramm-Arbeitsbl\u00e4tter mit Balkendiagrammen, Piktogrammen und Z\u00e4hlfragen \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Bilddiagramm-Generator verwandelt das Erlernen von Datenverarbeitung in ein farbenfrohes, visuelles Erlebnis. Kinder z\u00e4hlen Themenbilder \u2014 Tiere, Fahrzeuge, Lebensmittel und \u00fcber 100 weitere Kategorien \u2014 und \u00fcbertragen die Ergebnisse in Balkendiagramme oder Piktogramme. Jedes Arbeitsblatt enth\u00e4lt automatisch generierte Z\u00e4hlfragen und einen separaten L\u00f6sungsschl\u00fcssel.

Das Tool unterst\u00fctzt verschiedene Diagrammtypen: Balkendiagramme zum Ausf\u00fcllen, Piktogramme mit Bildz\u00e4hlung und Strichlisten-Aktivit\u00e4ten. Sch\u00fcler \u00fcben fundamentale Datenf\u00e4higkeiten \u2014 Z\u00e4hlen, Vergleichen, Sortieren und Ablesen von Diagrammen \u2014 alles verpackt in ansprechende Themenbilder, die zum Mitmachen motivieren.

Sie bestimmen das Thema, den Diagrammtyp, die Anzahl der Kategorien, das Seitenformat und dekorative Rahmen. Der Canvas-Editor erm\u00f6glicht das Anpassen von Texten und Farben. Exportieren Sie als hochaufl\u00f6sendes PDF oder JPEG. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgraden Sie f\u00fcr kommerzielle Nutzung.`,
    },
    whatYouCanCreate: [
      { title: 'Thematische Diagramm-Arbeitsbl\u00e4tter', description: 'Erstellen Sie Bilddiagramme zu jedem Thema \u2014 Tiere, Fahrzeuge, Natur. Kinder z\u00e4hlen Bilder und \u00fcbertragen Ergebnisse in Diagramme.' },
      { title: 'Datenverarbeitungs-\u00dcbungspakete', description: 'Erstellen Sie Sets mit Balkendiagrammen, Piktogrammen und Strichlisten f\u00fcr verschiedene Schwierigkeitsgrade.' },
      { title: 'Mathe-Arbeitsb\u00fccher mit Diagrammen', description: 'Kombinieren Sie Diagramm-Arbeitsbl\u00e4tter zu PDF-Arbeitsb\u00fcchern f\u00fcr Etsy oder Amazon KDP.' },
      { title: 'Wochenplan-Morgenarbeit', description: 'Erstellen Sie f\u00fcnf verschiedene Diagramm-Arbeitsbl\u00e4tter \u2014 eines pro Tag \u2014 als Aufw\u00e4rm\u00fcbung f\u00fcr den Matheunterricht.' },
      { title: 'Cross-curriculare Diagramme', description: 'Nutzen Sie Naturthemen f\u00fcr Sachkunde oder Essensthemen f\u00fcr Ern\u00e4hrungsunterricht \u2014 Mathe im Kontext anderer F\u00e4cher.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Bilddiagramm-Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto oder Download erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'W\u00e4hlen Sie aus 104 Themen. Die Bilder bestimmen den Diagramm-Inhalt.' },
        { title: 'Diagrammtyp w\u00e4hlen', description: 'W\u00e4hlen Sie Balkendiagramm, Piktogramm oder Strichlisten-Aktivit\u00e4t.' },
        { title: 'Kategorien festlegen', description: 'Bestimmen Sie die Anzahl verschiedener Bildkategorien im Diagramm.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie Seitenformat, Ausrichtung, Schriftart und Rahmen.' },
        { title: 'Generieren und bearbeiten', description: 'Klicken Sie auf Generieren. Passen Sie Text und Farben im Canvas-Editor an.' },
        { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG. L\u00f6sungsschl\u00fcssel wird separat erstellt.' },
      ],
    },
    businessIdeas: [
      { title: 'Diagramm-Aktivit\u00e4tsb\u00fccher', description: 'Erstellen Sie thematische Diagramm-Arbeitsb\u00fccher mit 20+ Seiten. Verkaufen Sie als Sofort-Download auf Etsy.', platform: 'Etsy' },
      { title: 'Datenverarbeitungs-Paket f\u00fcr Lehrkr\u00e4fte', description: 'Erstellen Sie ein stufenspezifisches Datenverarbeitungspaket mit Balkendiagrammen, Piktogrammen und Strichlisten.', platform: 'Teachers Pay Teachers' },
      { title: 'Mathe-Aktivit\u00e4tsbuch f\u00fcr KDP', description: 'Kombinieren Sie Diagramm-Arbeitsbl\u00e4tter zu Taschenb\u00fcchern. Amazon \u00fcbernimmt Druck und Versand.', platform: 'Amazon KDP' },
      { title: 'Saisonale Diagramm-Pakete', description: 'Erstellen Sie Feiertags-Diagramme: Halloween-Z\u00e4hlungen, Weihnachts-Statistiken. Saisonale Produkte verkaufen sich regelm\u00e4\u00dfig.', platform: 'Gumroad' },
      { title: 'Cross-curriculare MINT-Arbeitsbl\u00e4tter', description: 'Verkaufen Sie Diagramm-Arbeitsbl\u00e4tter, die Mathe mit Naturwissenschaft verbinden. Lehrkr\u00e4fte suchen aktiv nach f\u00e4cher\u00fcbergreifendem Material.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Beginnen Sie mit einfachen Piktogrammen', tip: 'F\u00fcr Vorschulkinder sind Piktogramme mit gro\u00dfen Bildern am intuitivsten. Balkendiagramme eignen sich besser f\u00fcr Erst- und Zweitkl\u00e4ssler.' },
      { title: 'Themen an den Unterricht anpassen', tip: 'Nutzen Sie Tierbilder w\u00e4hrend einer Sachkunde-Einheit \u00fcber Tiere. So wird Mathe zum nat\u00fcrlichen Teil des Lehrplans.' },
      { title: 'Vergleichsfragen einbauen', tip: 'Fragen wie \u201EWelches Tier kommt am h\u00e4ufigsten vor?\u201C oder \u201EWie viele mehr?\u201C f\u00f6rdern kritisches Denken \u00fcber einfaches Z\u00e4hlen hinaus.' },
      { title: 'Farbdruck f\u00fcr Motivation', tip: 'Diagramm-Arbeitsbl\u00e4tter wirken in Farbe am besten. Drucken Sie in Farbe, um die volle visuelle Wirkung der Themenbilder zu nutzen.' },
    ],
    faq: [
      { question: 'Ist der Bilddiagramm-Generator wirklich kostenlos?', answer: 'Ja. Alle Diagrammtypen, alle 104 Themen, PDF-Export und L\u00f6sungsschl\u00fcssel sind kostenlos. Einzige Einschr\u00e4nkung ist ein kleines Wasserzeichen.' },
      { question: 'F\u00fcr welche Altersgruppe sind diese Arbeitsbl\u00e4tter?', answer: 'F\u00fcr 4\u20138 Jahre (Kindergarten bis zweite Klasse). Einfache Piktogramme f\u00fcr Vorschulkinder, komplexere Balkendiagramme f\u00fcr \u00e4ltere Sch\u00fcler.' },
      { question: 'Welche Diagrammtypen gibt es?', answer: 'Balkendiagramme, Piktogramme und Strichlisten-Aktivit\u00e4ten. Jeder Typ kann mit jedem der 104 Themen kombiniert werden.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Mit der kostenlosen Version enthalten sie ein Wasserzeichen. Das Commercial Pack ($27) entfernt es und gew\u00e4hrt kommerzielle Lizenz.' },
      { question: 'Enthalten die Arbeitsbl\u00e4tter Z\u00e4hlfragen?', answer: 'Ja. Automatisch generierte Fragen wie \u201EWie viele?\u201C und \u201EWelches am meisten?\u201C sind auf jedem Arbeitsblatt enthalten.' },
      { question: 'Wie viele Themen sind verf\u00fcgbar?', answer: 'Die kostenlose Version enth\u00e4lt eine Auswahl. Das Full Access Pack ($47) schaltet alle 104 Themen frei.' },
      { question: 'Kann ich das Layout anpassen?', answer: 'Ja. W\u00e4hlen Sie Seitenformat, Ausrichtung, Schriftart, Farben und Rahmen. Der Canvas-Editor erlaubt weitere Anpassungen.' },
      { question: 'Enthalten die Arbeitsbl\u00e4tter L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen L\u00f6sungsschl\u00fcssel mit allen richtigen Antworten.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + kommerzielle Lizenz. Full Access Pack ($47): alles im Commercial Pack plus alle 104 Themen.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie zuerst die kostenlose Version, bevor Sie kaufen.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-additions-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Additions-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-finden-und-zaehlen-tool', pageType: 'tool', anchorText: 'Kostenloses Finden-und-Z\u00e4hlen-Tool' },
      { slug: 'kostenloses-muster-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-bilder-sortieren-tool', pageType: 'tool', anchorText: 'Kostenloses Bilder-Sortieren-Tool' },
      { slug: 'kostenloses-gross-und-klein-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Gro\u00df & Klein Tool' },
      { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm & Z\u00e4hlen \u2014 Alle Details' },
      { slug: 'math-number-bundle', pageType: 'bundle', anchorText: 'Mathe & Zahlen Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'coloring',
    filename: 'kostenloses-ausmalbilder-tool.ts',
    seo: {
      titleTag: 'Kostenloser Ausmalbilder-Generator | Individuelle Malvorlagen',
      metaDescription: 'Erstellen Sie kostenlose Ausmalbilder aus 104 Bildthemen. Automatische Umrisskonvertierung, S/W-Modus, Text\u00fcberlagerungen. Sofort als PDF, keine Anmeldung.',
      primaryKeyword: 'kostenloser Ausmalbilder-Generator',
      secondaryKeywords: ['Malvorlagen erstellen kostenlos', 'Individuelle Ausmalbilder druckbar', 'Ausmalbilder-Ersteller online', 'Kostenlose Ausmal-Arbeitsbl\u00e4tter', 'Eigene Malvorlagen erstellen'],
      lsiKeywords: ['Druckbare Ausmal-Aktivit\u00e4ten', 'Kinder-Ausmal-Arbeitsbl\u00e4tter', 'Themen-Malvorlagen', 'Kreative Ausmal-Druckvorlagen', 'Umrisszeichnungen', 'Malbuch-Seiten kostenlos', 'Kunst-Aktivit\u00e4ten Kinder', 'Feinmotorik Ausmal-Aktivit\u00e4ten'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/coloring/Coloring (1).jpeg',
        primaryAlt: 'Kostenlose Ausmalseite mit automatisch generierten Umrisszeichnungen von Themenbildern',
        secondary: '/samples/english/coloring/Coloring (2).jpeg',
        secondaryAlt: 'Individuelles Ausmal-Arbeitsblatt mit Text\u00fcberlagerung und S/W-Bildumrissen',
      },
      sampleGallery: [
        { src: '/samples/english/coloring/Coloring (1).jpeg', alt: 'Ausmalseite mit Tier-Umrissbildern', caption: 'Automatische Umrisse aus Themen' },
        { src: '/samples/english/coloring/Coloring (2).jpeg', alt: 'Ausmal-Arbeitsblatt mit Text\u00fcberlagerung', caption: 'Text\u00fcberlagerungen f\u00fcr Anweisungen' },
        { src: '/samples/english/coloring/Coloring (3).jpeg', alt: 'S/W-Ausmalseite mit Fahrzeugthema', caption: 'Fahrzeugthema \u2014 104 Themen verf\u00fcgbar' },
        { src: '/samples/english/coloring/Coloring (4).jpeg', alt: 'Ausmalseite mit mehreren Bildern pro Seite', caption: 'Mehrere Bilder pro Seite' },
        { src: '/samples/english/coloring/Coloring (5).jpeg', alt: 'Natur-Ausmalseite mit Blumen und Pflanzen', caption: 'Naturthema f\u00fcr saisonale Aktivit\u00e4ten' },
        { src: '/samples/english/coloring/Coloring (6).jpeg', alt: 'Ausmalseite mit individuellem Rahmen und Titel', caption: 'Individuelle Rahmen und Titel' },
      ],
      youtubeId: 'ZdpCr2txHcc',
      videoTitle: 'So erstellen Sie Ausmalbilder \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Ausmalbilder-Generator',
      tagline: 'Erstellen Sie individuelle Ausmalbilder aus 104 Themen mit automatischer Umrisskonvertierung \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Ausmalbilder-Generator verwandelt bunte Themenbilder automatisch in druckfertige Umrisszeichnungen, die Kinder ausmalen k\u00f6nnen. W\u00e4hlen Sie aus 104 illustrierten Themen \u2014 Tiere, Fahrzeuge, Natur, Lebensmittel und Dutzende weitere \u2014 und das Tool konvertiert die Bilder in saubere Schwarz-Wei\u00df-Umrisse. Jede Ausmalseite wird als PDF oder JPEG exportiert, bereit zum Drucken oder als digitales Produkt.

Das Tool bietet mehrere Gestaltungsm\u00f6glichkeiten: Einzelbild pro Seite f\u00fcr detailliertes Ausmalen, mehrere kleine Bilder pro Seite f\u00fcr schnelle Aktivit\u00e4ten, und Text\u00fcberlagerungen f\u00fcr individuelle Anweisungen oder Titel. Dekorative Rahmen und verschiedene Schriftarten machen jede Ausmalseite zu einem professionellen Produkt.

Der integrierte Canvas-Editor erm\u00f6glicht das Anpassen von Layout, Text, Farben und Rahmenstilen vor dem Export. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgraden Sie auf ein Commercial Pack, um Wasserzeichen zu entfernen und Malvorlagen auf Etsy, Amazon KDP oder anderen Plattformen zu verkaufen.`,
    },
    whatYouCanCreate: [
      { title: 'Thematische Ausmalb\u00fccher', description: 'Erstellen Sie Ausmalb\u00fccher zu jedem Thema \u2014 Tiere, Dinosaurier, Meereswelt, Weltraum \u2014 mit automatisch generierten Umrisszeichnungen.' },
      { title: 'Aktivit\u00e4tsseiten f\u00fcr den Unterricht', description: 'Produzieren Sie Ausmalseiten, die zu Ihrem Lehrplan passen. Tierumrisse f\u00fcr Sachkunde, Fahrzeuge f\u00fcr Verkehrserziehung.' },
      { title: 'Party-Malvorlagen', description: 'Erstellen Sie thematische Ausmalseiten f\u00fcr Kindergeburtstage: Dinosaurier, Einhornblumen, Piraten. Eltern lieben druckfertige Partyaktivit\u00e4ten.' },
      { title: 'Saisonale Ausmal-Pakete', description: 'Erstellen Sie Feiertags-Malvorlagen: Weihnachten, Ostern, Halloween. Saisonale Produkte verkaufen sich Jahr f\u00fcr Jahr.' },
      { title: 'Beruhigungs-Ausmalseiten', description: 'Ausmalseiten sind nicht nur f\u00fcr Kinder. Erstellen Sie detaillierte Themen-Ausmalseiten als Achtsamkeits\u00fcbung f\u00fcr Erwachsene.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Ausmalbilder \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'W\u00e4hlen Sie aus 104 Themen. Die Bilder werden automatisch in Umrisse konvertiert.' },
        { title: 'Layout w\u00e4hlen', description: 'Ein gro\u00dfes Bild pro Seite oder mehrere kleine Bilder. Hoch- oder Querformat.' },
        { title: 'Text hinzuf\u00fcgen', description: 'F\u00fcgen Sie Titel, Anweisungen oder den Namen des Kindes als Text\u00fcberlagerung hinzu.' },
        { title: 'Rahmen und Stil anpassen', description: 'W\u00e4hlen Sie dekorative Rahmen, Schriftarten und Seitenformat im Canvas-Editor.' },
        { title: 'Generieren und vorschauen', description: 'Klicken Sie auf Generieren. Pr\u00fcfen Sie die Umrissqualit\u00e4t in der Vorschau.' },
        { title: 'Als PDF oder JPEG exportieren', description: 'Exportieren Sie in hoher Aufl\u00f6sung zum Drucken oder als digitales Produkt.' },
      ],
    },
    businessIdeas: [
      { title: 'Thematische Malb\u00fccher auf Etsy', description: 'Erstellen Sie 20-30 Seiten umfassende Ausmalb\u00fccher nach Themen. Tiermalbuch, Fahrzeugmalbuch, Naturmalbuch. Verkaufen Sie je 3\u20135\u00a0$.', platform: 'Etsy' },
      { title: 'Party-Aktivit\u00e4tspakete', description: 'B\u00fcndeln Sie Ausmalseiten mit Bingo-Karten und R\u00e4tseln zu Partypaketen. \u201EDinosaurier-Party-Paket\u201C mit 20 Aktivit\u00e4ten.', platform: 'Etsy' },
      { title: 'KDP-Malb\u00fccher', description: 'Stellen Sie 50\u2013100 Ausmalseiten zu Taschenb\u00fcchern zusammen. Amazon druckt und versendet auf Bestellung.', platform: 'Amazon KDP' },
      { title: 'Saisonale Malpakete', description: 'Halloween-Malvorlagen, Weihnachts-Ausmalbilder, Oster-Malseiten. Saisonale Produkte sind Selbstl\u00e4ufer.', platform: 'Gumroad' },
      { title: 'DaF-Wortschatz-Ausmalseiten', description: 'Ausmalseiten mit Bildbeschriftungen in verschiedenen Sprachen f\u00fcr den Fremdsprachenunterricht.', platform: 'Teachers Pay Teachers' },
    ],
    proTips: [
      { title: 'Umrissqualit\u00e4t pr\u00fcfen', tip: 'Nicht jedes Bild konvertiert gleich gut in Umrisse. Pr\u00fcfen Sie die Vorschau und w\u00e4hlen Sie Bilder mit klaren Konturen f\u00fcr die besten Ergebnisse.' },
      { title: 'Gro\u00dfe Fl\u00e4chen f\u00fcr kleine Kinder', tip: 'F\u00fcr Vorschulkinder w\u00e4hlen Sie Layouts mit einem gro\u00dfen Bild pro Seite. Gro\u00dfe Ausmalfl\u00e4chen sind einfacher f\u00fcr kleine H\u00e4nde.' },
      { title: 'Themen an den Anlass anpassen', tip: 'Verwenden Sie Naturthemen im Fr\u00fchling, Strand im Sommer, Bl\u00e4tter im Herbst, Schneeflocken im Winter.' },
      { title: 'Dickes Papier zum Drucken verwenden', tip: 'Drucken Sie auf 120g-Papier statt normalem 80g-Papier. Es verhindert Durchdr\u00fccken von Filzstiften.' },
    ],
    faq: [
      { question: 'Ist der Ausmalbilder-Generator wirklich kostenlos?', answer: 'Ja. Alle Funktionen, 104 Themen, PDF-Export sind kostenlos. Einzige Einschr\u00e4nkung ist ein kleines Wasserzeichen.' },
      { question: 'F\u00fcr welche Altersgruppe sind die Ausmalbilder?', answer: 'F\u00fcr alle Altersgruppen. Gro\u00dfe Umrisse f\u00fcr Kleinkinder (2\u20134 Jahre), detailliertere Bilder f\u00fcr \u00e4ltere Kinder und Erwachsene.' },
      { question: 'Wie funktioniert die Umrisskonvertierung?', answer: 'Das Tool konvertiert farbige Themenbilder automatisch in Schwarz-Wei\u00df-Umrisse. Die Algorithmen erkennen Kanten und erstellen saubere Ausmallinien.' },
      { question: 'Kann ich die Ausmalbilder verkaufen?', answer: 'Mit der kostenlosen Version enthalten sie ein Wasserzeichen. Das Commercial Pack ($27) entfernt es f\u00fcr kommerzielle Nutzung.' },
      { question: 'Welche Dateiformate gibt es?', answer: 'JPEG und PDF in hoher Aufl\u00f6sung. PDFs sind f\u00fcr A4, Letter oder Legal formatiert.' },
      { question: 'Kann ich Text auf die Ausmalseiten setzen?', answer: 'Ja. F\u00fcgen Sie Titel, Anweisungen oder Namen als Text\u00fcberlagerung hinzu. W\u00e4hlen Sie aus mehreren Schriftarten.' },
      { question: 'Wie viele Themen gibt es?', answer: '104 illustrierte Themen. Die kostenlose Version enth\u00e4lt eine Auswahl; das Full Access Pack ($47) schaltet alle frei.' },
      { question: 'Kann ich mehrere Bilder auf einer Seite haben?', answer: 'Ja. W\u00e4hlen Sie zwischen einem gro\u00dfen Bild oder mehreren kleinen Bildern pro Seite.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + kommerzielle Lizenz. Full Access Pack ($47): alle 104 Themen plus kommerzielle Lizenz.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version vor dem Kauf.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-malen-und-ausmalen-tool', pageType: 'tool', anchorText: 'Kostenloses Malen-und-Ausmalen-Tool' },
      { slug: 'kostenloses-linien-zeichnen-tool', pageType: 'tool', anchorText: 'Kostenloses Linien-Zeichnen-Tool' },
      { slug: 'kostenloses-muster-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-zuordnungs-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Zuordnungs-Tool' },
      { slug: 'kostenloses-bingo-karten-tool', pageType: 'tool', anchorText: 'Kostenloses Bingo-Karten-Tool' },
      { slug: 'coloring', pageType: 'app', anchorText: 'Ausmalbilder-Generator \u2014 Alle Details' },
      { slug: 'drawing-art-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'crossword',
    filename: 'kostenloses-kreuzwortraetsel-tool.ts',
    seo: {
      titleTag: 'Kostenloser Bild-Kreuzwortr\u00e4tsel-Generator | Ohne Anmeldung',
      metaDescription: 'Erstellen Sie kostenlose Bild-Kreuzwortr\u00e4tsel mit Bildhinweisen und automatischen Gittern. Eigene Wortlisten, Drag-Drop-Bearbeitung, L\u00f6sungsschl\u00fcssel. Keine Anmeldung.',
      primaryKeyword: 'kostenloser Bild-Kreuzwortr\u00e4tsel-Generator',
      secondaryKeywords: ['Kreuzwortr\u00e4tsel-Ersteller kostenlos druckbar', 'Bild-Kreuzwortr\u00e4tsel Arbeitsblatt', 'Kostenloser Kreuzwortr\u00e4tsel-Ersteller', 'Bild-Kreuzwortr\u00e4tsel PDF Generator', 'Kreuzwortr\u00e4tsel-Arbeitsblatt ohne Anmeldung'],
      lsiKeywords: ['Wortschatz-Kreuzwortr\u00e4tsel-Aktivit\u00e4ten', 'Rechtschreib\u00fcbung Arbeitsbl\u00e4tter', 'Wortr\u00e4tsel druckbar Kinder', 'Kreuzwortr\u00e4tsel f\u00fcr den Unterricht', 'P\u00e4dagogische Wortspiele', 'Wortschatzaufbau Arbeitsbl\u00e4tter', 'Sprachkunst Kreuzwortr\u00e4tsel', 'Leseverst\u00e4ndnis Wortr\u00e4tsel'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/crossword/Crossword (1).jpeg',
        primaryAlt: 'Kostenloses Bild-Kreuzwortr\u00e4tsel mit Bildhinweisen um das verflochtene Wortgitter',
        secondary: '/samples/english/crossword/Crossword (2).jpeg',
        secondaryAlt: 'Kreuzwortr\u00e4tsel-L\u00f6sungsschl\u00fcssel mit allen ausgef\u00fcllten W\u00f6rtern',
      },
      sampleGallery: [
        { src: '/samples/english/crossword/Crossword (3).jpeg', alt: 'Bild-Kreuzwortr\u00e4tsel mit Tierthema', caption: 'Tierthema-Kreuzwortr\u00e4tsel' },
        { src: '/samples/english/crossword/Crossword (4).jpeg', alt: 'Kreuzwortr\u00e4tsel mit eigener Wortliste', caption: 'Eigene-Wortliste-Modus' },
        { src: '/samples/english/crossword/Crossword (5).jpeg', alt: 'Kreuzwortr\u00e4tsel im Querformat mit Essensthema', caption: 'Querformat-Layout' },
        { src: '/samples/english/crossword/Crossword (6).jpeg', alt: 'Kreuzwortr\u00e4tsel mit Drag-Drop-Bearbeitung', caption: 'Manuelle Drag-Drop-Bearbeitung' },
        { src: '/samples/english/crossword/Crossword (7).jpeg', alt: 'Bild-Kreuzwortr\u00e4tsel mit Fahrzeugthema', caption: 'Fahrzeugthema mit Rahmen' },
        { src: '/samples/english/crossword/Crossword (8).jpeg', alt: 'Kreuzwortr\u00e4tsel-L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
      ],
      youtubeId: 'b3WKDrzif-w',
      videoTitle: 'So erstellen Sie kostenlose Bild-Kreuzwortr\u00e4tsel',
    },
    hero: {
      title: 'Kostenloser Bild-Kreuzwortr\u00e4tsel-Generator',
      tagline: 'Erstellen Sie Bild-Kreuzwortr\u00e4tsel mit Bildhinweisen, automatischen Gittern und L\u00f6sungsschl\u00fcsseln \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Kreuzwortr\u00e4tsel-Generator erstellt einzigartige Bild-Kreuzwortr\u00e4tsel, bei denen Bilder als Hinweise dienen statt Textbeschreibungen. Kinder sehen ein Bild eines Tieres, Fahrzeugs oder Lebensmittels und m\u00fcssen das passende Wort ins Gitter eintragen \u2014 eine perfekte Kombination aus Wortschatz\u00fcbung, Rechtschreibtraining und R\u00e4tselspa\u00df.

Das Tool generiert automatisch ein verflochtenes Gitter aus Ihren gew\u00e4hlten W\u00f6rtern und platziert die Bildhinweise rund um das R\u00e4tsel. Sie k\u00f6nnen aus 104 Themen w\u00e4hlen oder eine eigene Wortliste eingeben. Der Drag-Drop-Editor erm\u00f6glicht die manuelle Neupositionierung von W\u00f6rtern, falls das automatische Layout nicht optimal ist.

Jedes Kreuzwortr\u00e4tsel wird mit einem passenden L\u00f6sungsschl\u00fcssel generiert. Exportieren Sie als PDF oder JPEG zum Drucken. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgraden Sie f\u00fcr kommerzielle Nutzung und Verkauf auf Etsy, Amazon KDP oder Teachers Pay Teachers.`,
    },
    whatYouCanCreate: [
      { title: 'Thematische Vokabel-Kreuzwortr\u00e4tsel', description: 'Erstellen Sie Kreuzwortr\u00e4tsel zu jedem Thema \u2014 Tiere, Essen, Berufe \u2014 f\u00fcr spielerisches Vokabellernen.' },
      { title: 'Rechtschreib\u00fcbungs-R\u00e4tsel', description: 'Kinder m\u00fcssen W\u00f6rter korrekt buchstabieren, um sie ins Gitter einzutragen. Perfekte Rechtschreib\u00fcbung ohne Langeweile.' },
      { title: 'DaF-Wortschatz-R\u00e4tsel', description: 'Nutzen Sie die 11 Sprachen, um Kreuzwortr\u00e4tsel f\u00fcr Fremdsprachenunterricht zu erstellen.' },
      { title: 'R\u00e4tselhefte f\u00fcr Etsy', description: 'Stellen Sie thematische Kreuzwortr\u00e4tsel zu druckbaren R\u00e4tselheften zusammen und verkaufen Sie als digitale Produkte.' },
      { title: 'Wochenend-R\u00e4tsel f\u00fcr Familien', description: 'Erstellen Sie kindgerechte Kreuzwortr\u00e4tsel als Familienaktivit\u00e4t. Verschiedene Schwierigkeitsgrade f\u00fcr verschiedene Altersgruppen.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Bild-Kreuzwortr\u00e4tsel \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto erforderlich.' },
        { title: 'Thema oder Wortliste w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema aus 104 Kategorien oder geben Sie eine eigene Wortliste ein.' },
        { title: 'Gitter generieren', description: 'Das Tool erstellt automatisch ein verflochtenes Gitter. Bildhinweise werden platziert.' },
        { title: 'Gitter bearbeiten', description: 'Verwenden Sie Drag-Drop, um W\u00f6rter neu zu positionieren oder zu entfernen.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie Hoch-/Querformat, Schriftart, Rahmen und Farben im Canvas-Editor.' },
        { title: 'Vorschau pr\u00fcfen', description: 'Kontrollieren Sie, dass alle Bildhinweise sichtbar und das Gitter korrekt ist.' },
        { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG. L\u00f6sungsschl\u00fcssel wird separat erstellt.' },
      ],
    },
    businessIdeas: [
      { title: 'Thematische R\u00e4tselhefte auf Etsy', description: 'Erstellen Sie R\u00e4tselhefte mit 20+ Kreuzwortr\u00e4tseln nach Themen. Verkaufen Sie als digitale Downloads.', platform: 'Etsy' },
      { title: 'Vokabel-Lernmaterial f\u00fcr TPT', description: 'Erstellen Sie thematische Kreuzwortr\u00e4tsel-Pakete als Vokabel\u00fcbung. Lehrkr\u00e4fte suchen fertige R\u00e4tsel-Ressourcen.', platform: 'Teachers Pay Teachers' },
      { title: 'KDP-R\u00e4tselbuch', description: 'Stellen Sie 50\u2013100 Kreuzwortr\u00e4tsel zu einem Taschenbuch zusammen. Amazon druckt auf Bestellung.', platform: 'Amazon KDP' },
      { title: 'DaF-Kreuzwortr\u00e4tsel-Pakete', description: 'Kreuzwortr\u00e4tsel in verschiedenen Sprachen f\u00fcr den Fremdsprachenunterricht.', platform: 'Gumroad' },
      { title: 'Saisonale R\u00e4tsel-Sammlungen', description: 'Halloween-Kreuzwortr\u00e4tsel, Weihnachts-R\u00e4tsel, Oster-Wortr\u00e4tsel. Saisonale Nachfrage jedes Jahr.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Kurze W\u00f6rter f\u00fcr Anf\u00e4nger', tip: 'W\u00e4hlen Sie Themen mit kurzen W\u00f6rtern (3\u20135 Buchstaben) f\u00fcr j\u00fcngere Kinder. Lange W\u00f6rter frustrieren Erstleser.' },
      { title: 'Gitter vor Export pr\u00fcfen', tip: 'Kontrollieren Sie immer die automatische Gitteranordnung. Manchmal verbessert manuelles Drag-Drop die Lesbarkeit.' },
      { title: 'Bildhinweise klar halten', tip: 'W\u00e4hlen Sie Themenbilder mit eindeutigen Motiven. Mehrdeutige Bilder verwirren Sch\u00fcler.' },
      { title: 'L\u00f6sungsschl\u00fcssel einschlie\u00dfen', tip: 'Verkaufen Sie nie ein R\u00e4tselprodukt ohne L\u00f6sungsschl\u00fcssel. Kunden erwarten ihn und bewerten negativ ohne.' },
    ],
    faq: [
      { question: 'Ist der Kreuzwortr\u00e4tsel-Generator wirklich kostenlos?', answer: 'Ja. Alle Funktionen, alle Themen, Drag-Drop-Editor, PDF-Export und L\u00f6sungsschl\u00fcssel sind kostenlos. Einzige Einschr\u00e4nkung: kleines Wasserzeichen.' },
      { question: 'Kann ich eigene Wortlisten eingeben?', answer: 'Ja. W\u00e4hlen Sie zwischen thematischen Bildhinweisen oder geben Sie eine eigene Wortliste ein.' },
      { question: 'Wie funktioniert der Drag-Drop-Editor?', answer: 'Nach der Gittergenerierung k\u00f6nnen Sie W\u00f6rter per Drag-Drop neu positionieren, um das Layout zu optimieren.' },
      { question: 'F\u00fcr welche Altersgruppe sind die R\u00e4tsel?', answer: 'F\u00fcr Kinder ab 5 Jahren, die lesen und schreiben k\u00f6nnen. Schwierigkeit variiert mit Wortl\u00e4nge und Gittergr\u00f6\u00dfe.' },
      { question: 'Kann ich die R\u00e4tsel verkaufen?', answer: 'Mit der kostenlosen Version: Wasserzeichen. Commercial Pack ($27) entfernt es f\u00fcr kommerzielle Nutzung.' },
      { question: 'Welche Dateiformate gibt es?', answer: 'PDF und JPEG in hoher Aufl\u00f6sung. L\u00f6sungsschl\u00fcssel als separate Datei.' },
      { question: 'Wie viele Themen gibt es?', answer: '104 illustrierte Themen. Full Access Pack ($47) schaltet alle frei.' },
      { question: 'Gibt es L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes R\u00e4tsel generiert automatisch einen L\u00f6sungsschl\u00fcssel mit dem ausgef\u00fcllten Gitter.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + Lizenz. Full Access Pack ($47): alle 104 Themen plus Lizenz.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version vor dem Kauf.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-wortsuchrraetsel-tool', pageType: 'tool', anchorText: 'Kostenloses Wortsuchr\u00e4tsel-Tool' },
      { slug: 'kostenloses-buchstabensalat-tool', pageType: 'tool', anchorText: 'Kostenloses Buchstabensalat-Tool' },
      { slug: 'kostenloses-kryptogramm-tool', pageType: 'tool', anchorText: 'Kostenloses Kryptogramm-Tool' },
      { slug: 'kostenloses-wort-raten-tool', pageType: 'tool', anchorText: 'Kostenloses Wort-Raten-Tool' },
      { slug: 'kostenloses-schreibuebungs-tool', pageType: 'tool', anchorText: 'Kostenloses Schreib\u00fcbungs-Tool' },
      { slug: 'crossword', pageType: 'app', anchorText: 'Kreuzwortr\u00e4tsel-Generator \u2014 Alle Details' },
      { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'R\u00e4tsel & Spiele Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'draw-and-color',
    filename: 'kostenloses-malen-und-ausmalen-tool.ts',
    seo: {
      titleTag: 'Kostenloser Zeichen-Arbeitsbl\u00e4tter-Generator | Malen & Ausmalen',
      metaDescription: 'Erstellen Sie kostenlose Zeichen-Arbeitsbl\u00e4tter mit Gitter\u00fcbungen und Symmetrie. Spiegelmodus, S/W-Themen, 104 Bildsets. Sofort als PDF, ohne Anmeldung.',
      primaryKeyword: 'kostenloser Zeichen-Arbeitsbl\u00e4tter-Generator',
      secondaryKeywords: ['Malen und Ausmalen Arbeitsblatt-Ersteller', 'Kostenlose Symmetrie-Zeichen\u00fcbungen', 'Gitter-Zeichen-Aktivit\u00e4ten druckbar', 'Spiegel-Zeichen\u00fcbungen kostenlos', 'Druckbare Zeichen\u00fcbungen Kinder'],
      lsiKeywords: ['Feinmotorik-Aktivit\u00e4ten', 'Symmetrie-Arbeitsbl\u00e4tter Vorschule', 'Gitterbasiertes Zeichnen \u00fcben', 'R\u00e4umliches Vorstellungsverm\u00f6gen', 'Kunst-Arbeitsbl\u00e4tter druckbar', 'Auge-Hand-Koordination', 'Visuelle Wahrnehmungs-Arbeitsbl\u00e4tter', 'Zeichenf\u00e4higkeiten-Entwicklung'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/draw and color/draw-and-color (1).jpeg',
        primaryAlt: 'Kostenloses Zeichen-Arbeitsblatt mit Gitter\u00fcbung und Referenzbild zum Abzeichnen',
        secondary: '/samples/english/draw and color/draw-and-color (2).jpeg',
        secondaryAlt: 'Symmetrie-Zeichen-Arbeitsblatt mit Spiegelmodus f\u00fcr r\u00e4umliches Vorstellungsverm\u00f6gen',
      },
      sampleGallery: [
        { src: '/samples/english/draw and color/draw-and-color (1).jpeg', alt: 'Gitter-Zeichen-Arbeitsblatt mit Tierthema', caption: 'Bild abzeichnen \u2014 Gitter-Modus' },
        { src: '/samples/english/draw and color/draw-and-color (2).jpeg', alt: 'Spiegel-Symmetrie-Arbeitsblatt mit halbem Bild', caption: 'Symmetrie-Modus \u2014 Spiegelbild vervollst\u00e4ndigen' },
        { src: '/samples/english/draw and color/draw-and-color (3).jpeg', alt: 'S/W-Zeichen-Arbeitsblatt zum Ausmalen', caption: 'S/W-Thema zum Ausmalen nach dem Zeichnen' },
        { src: '/samples/english/draw and color/draw-and-color (4).jpeg', alt: 'Zeichen-Arbeitsblatt mit Fahrzeugthema', caption: 'Fahrzeugthema \u2014 104 Themen verf\u00fcgbar' },
        { src: '/samples/english/draw and color/draw-and-color (5).jpeg', alt: 'Fertiges Zeichen-Arbeitsblatt mit farbigem Ergebnis', caption: 'Sch\u00fcler zeichnen und malen dann aus' },
        { src: '/samples/english/draw and color/draw-and-color (6).jpeg', alt: 'Zeichen-Arbeitsblatt mit Gitterlinien', caption: 'Gitterlinien f\u00fcr pr\u00e4zises Zeichnen' },
      ],
      youtubeId: '1uZubAOGIkM',
      videoTitle: 'So erstellen Sie Malen-und-Ausmalen-Arbeitsbl\u00e4tter \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Malen & Ausmalen Arbeitsbl\u00e4tter-Generator',
      tagline: 'Erstellen Sie Gitter-Zeichen- und Symmetrie-Arbeitsbl\u00e4tter mit 104 Bildthemen \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Zeichen-Arbeitsbl\u00e4tter-Generator kombiniert gitterbasiertes Zeichnen mit kreativer Ausmalung. Sch\u00fcler sehen ein Referenzbild auf einem Gitter und zeichnen es Feld f\u00fcr Feld nach \u2014 eine bew\u00e4hrte Methode zur F\u00f6rderung von Feinmotorik, r\u00e4umlichem Vorstellungsverm\u00f6gen und Auge-Hand-Koordination. Anschlie\u00dfend k\u00f6nnen sie ihre Zeichnung ausmalen.

Der Symmetrie-Modus zeigt die H\u00e4lfte eines Bildes, und Sch\u00fcler m\u00fcssen die andere H\u00e4lfte spiegelbildlich zeichnen. Diese \u00dcbung st\u00e4rkt das r\u00e4umliche Denken und die visuelle Wahrnehmung \u2014 Schl\u00fcsself\u00e4higkeiten f\u00fcr Mathematik und Naturwissenschaften.

W\u00e4hlen Sie aus 104 illustrierten Themen \u2014 Tiere, Fahrzeuge, Natur und mehr. Gittergr\u00f6\u00dfe, S/W-Modus und Seitenformat sind anpassbar. Der Canvas-Editor erlaubt weitere Anpassungen. Die kostenlose Version enth\u00e4lt alle Funktionen mit kleinem Wasserzeichen.`,
    },
    whatYouCanCreate: [
      { title: 'Gitter-Zeichen\u00fcbungen', description: 'Sch\u00fcler \u00fcbertragen Referenzbilder Feld f\u00fcr Feld auf ein leeres Gitter. F\u00f6rdert pr\u00e4zises Zeichnen und r\u00e4umliches Denken.' },
      { title: 'Symmetrie-Arbeitsbl\u00e4tter', description: 'Halbe Bilder zum spiegelbildlichen Vervollst\u00e4ndigen. Ideal f\u00fcr Mathe-Symmetrie-Einheiten im Lehrplan.' },
      { title: 'Mal- und Zeichen-Arbeitsb\u00fccher', description: 'Kombinieren Sie verschiedene Themen zu einem Arbeitsbuch. Perfekt als digitales Produkt auf Etsy.' },
      { title: 'Feinmotorik-\u00dcbungen', description: 'Das pr\u00e4zise Nachzeichnen in Gitterfeldern trainiert die Handkontrolle \u2014 wichtige Vorbereitung zum Schreibenlernen.' },
      { title: 'Kreative Kunst-Aktivit\u00e4ten', description: 'Nach dem Zeichnen k\u00f6nnen Kinder ihre Bilder kreativ ausmalen. Kombination von strukturierter \u00dcbung und freier Kreativit\u00e4t.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Malen & Ausmalen Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'W\u00e4hlen Sie aus 104 Themen f\u00fcr Ihre Referenzbilder.' },
        { title: 'Modus w\u00e4hlen', description: 'Gitter-Abzeichnen oder Symmetrie-Spiegelbild. Beide f\u00f6rdern unterschiedliche F\u00e4higkeiten.' },
        { title: 'Gittergr\u00f6\u00dfe festlegen', description: 'Gr\u00f6\u00dfere Gitter sind einfacher; kleinere Gitter bieten mehr Details und Herausforderung.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie S/W-Modus, Seitenformat, Rahmen und Schriftart.' },
        { title: 'Generieren und bearbeiten', description: 'Das Tool erstellt das Arbeitsblatt. Passen Sie im Canvas-Editor Text und Farben an.' },
        { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG zum Drucken oder als digitales Produkt.' },
      ],
    },
    businessIdeas: [
      { title: 'Zeichen-\u00dcbungsb\u00fccher auf Etsy', description: 'Erstellen Sie thematische Zeichen-Arbeitsb\u00fccher (Tiere zeichnen, Fahrzeuge zeichnen). Verkaufen als digitaler Download.', platform: 'Etsy' },
      { title: 'Symmetrie-Mathe-Ressourcen', description: 'Symmetrie-Arbeitsbl\u00e4tter als lehrplankonformes Mathe-Material. Lehrkr\u00e4fte suchen fertige Symmetrie-\u00dcbungen.', platform: 'Teachers Pay Teachers' },
      { title: 'KDP-Zeichenb\u00fccher', description: 'Kombinieren Sie Gitter-Zeichen\u00fcbungen zu Taschenb\u00fcchern. Amazon druckt und versendet.', platform: 'Amazon KDP' },
      { title: 'Feinmotorik-\u00dcbungspakete', description: 'Verkaufen Sie Gitter-Zeichen\u00fcbungen als Feinmotorik-Training f\u00fcr Vorschulkinder.', platform: 'Gumroad' },
      { title: 'Kunst-Aktivit\u00e4tspakete', description: 'B\u00fcndeln Sie Zeichen-, Ausmal- und Muster-Arbeitsbl\u00e4tter zu kreativen Aktivit\u00e4tspaketen.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Gro\u00dfe Gitter f\u00fcr Anf\u00e4nger', tip: 'Beginnen Sie mit gro\u00dfen Gitterfeldern (4x4). Kleine Felder erfordern mehr Pr\u00e4zision und k\u00f6nnen Anf\u00e4nger frustrieren.' },
      { title: 'Symmetrie-Modus f\u00fcr Mathe-Unterricht', tip: 'Nutzen Sie den Symmetrie-Modus w\u00e4hrend Ihrer Geometrie-Einheit. Es macht abstrakte Symmetrie-Konzepte greifbar.' },
      { title: 'S/W-Modus zum Ausmalen nutzen', tip: 'Im S/W-Modus k\u00f6nnen Kinder nach dem Zeichnen ihre Bilder kreativ ausmalen \u2014 doppelter Lerneffekt.' },
      { title: 'Verschiedene Themen f\u00fcr Motivation', tip: 'Wechseln Sie w\u00f6chentlich das Thema, um die Motivation hoch zu halten: Tiere, Fahrzeuge, Essen, Natur.' },
    ],
    faq: [
      { question: 'Ist der Zeichen-Generator wirklich kostenlos?', answer: 'Ja. Alle Modi, 104 Themen, PDF-Export sind kostenlos. Einzige Einschr\u00e4nkung: kleines Wasserzeichen.' },
      { question: 'Was ist der Unterschied zwischen Gitter- und Symmetrie-Modus?', answer: 'Gitter-Modus: ganzes Bild Feld f\u00fcr Feld nachzeichnen. Symmetrie-Modus: halbes Bild spiegelbildlich vervollst\u00e4ndigen.' },
      { question: 'F\u00fcr welche Altersgruppe?', answer: 'F\u00fcr 4\u20138 Jahre. Gro\u00dfe Gitter f\u00fcr Vorschulkinder, kleinere Gitter f\u00fcr Grundsch\u00fcler.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Commercial Pack ($27) entfernt Wasserzeichen und gew\u00e4hrt kommerzielle Lizenz.' },
      { question: 'Welche Dateiformate gibt es?', answer: 'PDF und JPEG in hoher Aufl\u00f6sung. Formatiert f\u00fcr A4, Letter oder Legal.' },
      { question: 'Wie viele Themen gibt es?', answer: '104 illustrierte Themen. Full Access Pack ($47) schaltet alle frei.' },
      { question: 'Kann ich die Gittergr\u00f6\u00dfe anpassen?', answer: 'Ja. Von gro\u00dfen 4x4-Gittern f\u00fcr Anf\u00e4nger bis zu kleinen 8x8-Gittern f\u00fcr Fortgeschrittene.' },
      { question: 'Gibt es einen S/W-Modus?', answer: 'Ja. S/W-Modus erstellt Umrissbilder, die nach dem Zeichnen ausgemalt werden k\u00f6nnen.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + Lizenz. Full Access Pack ($47): alle 104 Themen + Lizenz.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version vor dem Kauf.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-ausmalbilder-tool', pageType: 'tool', anchorText: 'Kostenloses Ausmalbilder-Tool' },
      { slug: 'kostenloses-linien-zeichnen-tool', pageType: 'tool', anchorText: 'Kostenloses Linien-Zeichnen-Tool' },
      { slug: 'kostenloses-muster-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Arbeitsbl\u00e4tter-Tool' },
      { slug: 'kostenloses-muster-zug-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Zug-Tool' },
      { slug: 'kostenloses-schatten-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Schatten-Zuordnung-Tool' },
      { slug: 'draw-and-color', pageType: 'app', anchorText: 'Malen & Ausmalen \u2014 Alle Details' },
      { slug: 'drawing-art-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'drawing-lines',
    filename: 'kostenloses-linien-zeichnen-tool.ts',
    seo: {
      titleTag: 'Kostenloser Linien-Nachfahr-Arbeitsbl\u00e4tter-Generator | Linien Zeichnen',
      metaDescription: 'Erstellen Sie kostenlose Linien-Nachfahr-Arbeitsbl\u00e4tter mit Paar-Zuordnung. Gerade, geschwungene und Zickzack-Linien. 104 Themen, L\u00f6sungsschl\u00fcssel, PDF. Keine Anmeldung.',
      primaryKeyword: 'kostenlose Linien-Nachfahr-Arbeitsbl\u00e4tter',
      secondaryKeywords: ['Linien zeichnen Arbeitsblatt-Ersteller', 'Kostenlose Nachfahr-Linien druckbar', 'Paar-Zuordnung Linien-Arbeitsbl\u00e4tter', 'Paare verbinden Arbeitsblatt kostenlos', 'Linien-Zeichen-Aktivit\u00e4ten Vorschule'],
      lsiKeywords: ['Feinmotorik-Arbeitsbl\u00e4tter', 'Schreibvorbereitung druckbar', 'Handkontroll-\u00dcbungen', 'Stiftkontrolle Arbeitsbl\u00e4tter', 'Nachfahr\u00fcbungen Vorschule', 'Visuo-motorische Integration', 'Schreibbereitschaft Aktivit\u00e4ten', 'Schreibvorbereitung Linien\u00fcbung'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/drawing lines/Drawing Lines (1).jpeg',
        primaryAlt: 'Kostenloses Linien-Nachfahr-Arbeitsblatt mit Paar-Zuordnung und geraden Linien',
        secondary: '/samples/english/drawing lines/Drawing Lines (2).jpeg',
        secondaryAlt: 'Linien-Zeichnen-Arbeitsblatt mit geschwungenen und Zickzack-Linien f\u00fcr Feinmotorik',
      },
      sampleGallery: [
        { src: '/samples/english/drawing lines/Drawing Lines (1).jpeg', alt: 'Gerade Linien nachfahren und Paare verbinden', caption: 'Gerade Linien \u2014 Paare verbinden' },
        { src: '/samples/english/drawing lines/Drawing Lines (2).jpeg', alt: 'Geschwungene Linien f\u00fcr Feinmotorik\u00fcbung', caption: 'Geschwungene Linien f\u00fcr Motorik' },
        { src: '/samples/english/drawing lines/Drawing Lines (3).jpeg', alt: 'Zickzack-Linien mit Tierthema', caption: 'Zickzack-Linien \u2014 fortgeschritten' },
        { src: '/samples/english/drawing lines/Drawing Lines (4).jpeg', alt: 'Linien-Arbeitsblatt mit Essensthema', caption: 'Essensthema \u2014 104 Themen verf\u00fcgbar' },
        { src: '/samples/english/drawing lines/Drawing Lines (5).jpeg', alt: 'Linien-Arbeitsblatt mit L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
        { src: '/samples/english/drawing lines/Drawing Lines (6).jpeg', alt: 'Gemischte Linienstile auf einer Seite', caption: 'Gemischte Linienstile f\u00fcr Abwechslung' },
      ],
      youtubeId: 'P9q3ymjFnOQ',
      videoTitle: 'So erstellen Sie Linien-Zeichnen-Arbeitsbl\u00e4tter \u2014 Kostenloses Tutorial',
    },
    hero: {
      title: 'Kostenloser Linien Zeichnen Arbeitsbl\u00e4tter-Generator',
      tagline: 'Erstellen Sie Linien-Nachfahr-Arbeitsbl\u00e4tter mit Paar-Zuordnung, verschiedenen Linienstilen und 104 Themen \u2014 kostenlos',
      description: `Dieser kostenlose Linien-Nachfahr-Generator erstellt Arbeitsbl\u00e4tter, auf denen Kinder Linien zwischen zusammengeh\u00f6renden Bildern zeichnen. Es kombiniert Feinmotorik-Training mit kognitiver Zuordnung \u2014 Sch\u00fcler m\u00fcssen erst das passende Paar erkennen und dann eine pr\u00e4zise Linie zeichnen, um die Bilder zu verbinden.

Drei Linienstile stehen zur Verf\u00fcgung: Gerade Linien f\u00fcr Anf\u00e4nger, geschwungene Linien f\u00fcr mittlere Schwierigkeit und Zickzack-Linien f\u00fcr Fortgeschrittene. Jeder Stil trainiert unterschiedliche Aspekte der Handkontrolle und Stiftf\u00fchrung \u2014 essentielle F\u00e4higkeiten als Vorbereitung zum Schreibenlernen.

W\u00e4hlen Sie aus 104 illustrierten Themen, passen Sie die Anzahl der Paare pro Seite an und exportieren Sie als druckfertiges PDF mit L\u00f6sungsschl\u00fcssel. Alle Funktionen kostenlos mit kleinem Wasserzeichen.`,
    },
    whatYouCanCreate: [
      { title: 'Feinmotorik-\u00dcbungsbl\u00e4tter', description: 'Linien nachfahren trainiert die Handkontrolle und Stiftf\u00fchrung \u2014 essentielle Voraussetzungen f\u00fcr das Schreibenlernen.' },
      { title: 'Paar-Zuordnungs-Arbeitsbl\u00e4tter', description: 'Kinder verbinden zusammengeh\u00f6rende Bilder mit Linien. Kombiniert kognitive Zuordnung mit motorischer \u00dcbung.' },
      { title: 'Schreibvorbereitungs-Pakete', description: 'Zusammenstellungen verschiedener Linienstile als Schreibvorbereitungs-Material f\u00fcr Vorschulgruppen.' },
      { title: 'Thematische Zuordnungs-Arbeitsb\u00fccher', description: 'Kombinieren Sie Linien-Arbeitsbl\u00e4tter verschiedener Themen zu druckbaren Arbeitsb\u00fcchern f\u00fcr Etsy.' },
      { title: 'Differenzierte Motorik-Sets', description: 'Erstellen Sie Sets mit steigendem Schwierigkeitsgrad: gerade Linien, dann geschwungen, dann Zickzack.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Linien-Zeichnen-Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'W\u00e4hlen Sie aus 104 Themen. Die Bilder bestimmen die Zuordnungspaare.' },
        { title: 'Linienstil w\u00e4hlen', description: 'Gerade, geschwungen oder Zickzack. Jeder Stil bietet unterschiedliche Herausforderung.' },
        { title: 'Paaranzahl festlegen', description: 'Bestimmen Sie, wie viele Paare pro Seite angezeigt werden.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie Seitenformat, Ausrichtung, Schriftart und dekorative Rahmen.' },
        { title: 'Generieren', description: 'Das Tool erstellt Arbeitsblatt und L\u00f6sungsschl\u00fcssel automatisch.' },
        { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG zum Drucken.' },
      ],
    },
    businessIdeas: [
      { title: 'Feinmotorik-\u00dcbungsb\u00fccher', description: 'Erstellen Sie thematische Linien-Arbeitsb\u00fccher als Schreibvorbereitung. Verkaufen auf Etsy.', platform: 'Etsy' },
      { title: 'Vorschul-Motorik-Pakete f\u00fcr TPT', description: 'Lehrkr\u00e4fte suchen fertige Feinmotorik-Materialien. B\u00fcndeln Sie verschiedene Linienstile.', platform: 'Teachers Pay Teachers' },
      { title: 'KDP-Vorschulb\u00fccher', description: 'Kombinieren Sie Linien-\u00dcbungen zu Taschenb\u00fcchern. Amazon druckt auf Bestellung.', platform: 'Amazon KDP' },
      { title: 'Schreibvorbereitungs-Pakete', description: 'Verkaufen Sie Linienstil-Progressionen als strukturiertes Schreibvorbereitungsprogramm.', platform: 'Gumroad' },
      { title: 'Therapie-Material', description: 'Ergotherapeuten nutzen Linien-Nachfahr-\u00dcbungen. Erstellen Sie professionelle \u00dcbungsbl\u00e4tter.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Starten Sie mit geraden Linien', tip: 'F\u00fcr die j\u00fcngsten Kinder (3\u20134 Jahre) beginnen Sie mit kurzen, geraden Linien. Geschwungene und Zickzack-Linien folgen sp\u00e4ter.' },
      { title: 'Dickere Stifte f\u00fcr Anf\u00e4nger', tip: 'Empfehlen Sie Eltern, dicke Buntstifte oder Wachsmalstifte zu verwenden. Sie sind leichter zu greifen f\u00fcr kleine H\u00e4nde.' },
      { title: 'Linienstile mischen', tip: 'Erstellen Sie Arbeitsbl\u00e4tter mit gemischten Linienstilen f\u00fcr abwechslungsreiche \u00dcbung und h\u00f6heres Engagement.' },
      { title: 'Themen an Interessen anpassen', tip: 'Nutzen Sie Tierthemen f\u00fcr Tierliebhaber und Fahrzeugthemen f\u00fcr Autofans. Motivation steigt mit Interesse.' },
    ],
    faq: [
      { question: 'Ist der Linien-Zeichnen-Generator kostenlos?', answer: 'Ja. Alle Linienstile, 104 Themen, PDF-Export und L\u00f6sungsschl\u00fcssel kostenlos. Kleines Wasserzeichen.' },
      { question: 'Welche Linienstile gibt es?', answer: 'Gerade, geschwungene und Zickzack-Linien. Jeder Stil trainiert unterschiedliche motorische F\u00e4higkeiten.' },
      { question: 'F\u00fcr welche Altersgruppe?', answer: '3\u20136 Jahre. Gerade Linien f\u00fcr 3-J\u00e4hrige, Zickzack f\u00fcr Vorschulkinder, die bald schreiben lernen.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Commercial Pack ($27) entfernt Wasserzeichen und gew\u00e4hrt kommerzielle Lizenz.' },
      { question: 'Wie viele Themen gibt es?', answer: '104 Themen. Full Access Pack ($47) schaltet alle frei.' },
      { question: 'Enthalten sie L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen L\u00f6sungsschl\u00fcssel mit korrekten Verbindungen.' },
      { question: 'Welche Dateiformate gibt es?', answer: 'PDF und JPEG in hoher Aufl\u00f6sung.' },
      { question: 'Kann ich die Paaranzahl anpassen?', answer: 'Ja. Von wenigen Paaren f\u00fcr Anf\u00e4nger bis zu vielen f\u00fcr Fortgeschrittene.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + Lizenz. Full Access Pack ($47): alle 104 Themen + Lizenz.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version vor dem Kauf.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-malen-und-ausmalen-tool', pageType: 'tool', anchorText: 'Kostenloses Malen-und-Ausmalen-Tool' },
      { slug: 'kostenloses-zuordnungs-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Zuordnungs-Tool' },
      { slug: 'kostenloses-schatten-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Schatten-Zuordnung-Tool' },
      { slug: 'kostenloses-schreibuebungs-tool', pageType: 'tool', anchorText: 'Kostenloses Schreib\u00fcbungs-Tool' },
      { slug: 'kostenloses-ausmalbilder-tool', pageType: 'tool', anchorText: 'Kostenloses Ausmalbilder-Tool' },
      { slug: 'drawing-lines', pageType: 'app', anchorText: 'Linien Zeichnen \u2014 Alle Details' },
      { slug: 'drawing-art-bundle', pageType: 'bundle', anchorText: 'Zeichnen & Kunst Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
  {
    appId: 'find-and-count',
    filename: 'kostenloses-finden-und-zaehlen-tool.ts',
    seo: {
      titleTag: 'Kostenloser Suchbild-Z\u00e4hl-Generator | Finden und Z\u00e4hlen',
      metaDescription: 'Erstellen Sie kostenlose Suchbild-Arbeitsbl\u00e4tter mit verstreuten Bildern und Z\u00e4hlaufgaben. Lokalisierte Beschriftungen, L\u00f6sungsschl\u00fcssel, PDF-Export. Keine Anmeldung.',
      primaryKeyword: 'kostenlose Suchbild-Z\u00e4hl-Arbeitsbl\u00e4tter',
      secondaryKeywords: ['Suchbild-Ersteller kostenlos druckbar', 'Finden und Z\u00e4hlen Arbeitsblatt', 'Such- und Finde-Generator', 'Kostenloser Z\u00e4hl-Arbeitsblatt-Ersteller', 'Suchbild-Aktivit\u00e4t PDF Generator'],
      lsiKeywords: ['Visuelles Scannen Arbeitsbl\u00e4tter', 'Z\u00e4hl-Aktivit\u00e4ten Vorschule', 'Such-und-Finde-Druckvorlagen', 'Zahlenerkennung Arbeitsbl\u00e4tter', 'Beobachtungsf\u00e4higkeiten Aktivit\u00e4ten', 'Aufmerksamkeit \u00dcbungen Kinder', 'Wie viele findest du druckbar', 'Detailgenauigkeit Arbeitsbl\u00e4tter'],
    },
    visuals: {
      heroImages: {
        primary: '/samples/english/find and count/Find and Count (1).jpeg',
        primaryAlt: 'Kostenloses Suchbild-Arbeitsblatt mit verstreuten Tierbildern und Z\u00e4hlk\u00e4stchen',
        secondary: '/samples/english/find and count/Find and Count (2).jpeg',
        secondaryAlt: 'Finden-und-Z\u00e4hlen-L\u00f6sungsschl\u00fcssel mit korrekten Gesamtzahlen',
      },
      sampleGallery: [
        { src: '/samples/english/find and count/Find and Count (3).jpeg', alt: 'Suchbild mit Essensthema', caption: 'Essensthema-Szene' },
        { src: '/samples/english/find and count/Find and Count (4).jpeg', alt: 'Finden-und-Z\u00e4hlen mit Fahrzeugthema', caption: 'Fahrzeugthema mit Beschriftungen' },
        { src: '/samples/english/find and count/Find and Count (5).jpeg', alt: 'Suchbild-Aktivit\u00e4t mit Meerestieren', caption: 'Meeresthema Z\u00e4hl\u00fcbung' },
        { src: '/samples/english/find and count/Find and Count (6).jpeg', alt: 'Finden-und-Z\u00e4hlen im Querformat mit Naturbildern', caption: 'Naturthema Querformat' },
        { src: '/samples/english/find and count/Find and Count (7).jpeg', alt: 'Dichte Suchbild-Szene f\u00fcr fortgeschrittenes Z\u00e4hlen', caption: 'Fortgeschrittene Dichte' },
        { src: '/samples/english/find and count/Find and Count (8).jpeg', alt: 'L\u00f6sungsschl\u00fcssel mit ausgef\u00fcllten Gesamtzahlen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
      ],
      youtubeId: '0cOPi7eajLs',
      videoTitle: 'So erstellen Sie kostenlose Suchbild-Arbeitsbl\u00e4tter',
    },
    hero: {
      title: 'Kostenloser Finden und Z\u00e4hlen Generator',
      tagline: 'Erstellen Sie Suchbild-Z\u00e4hl-Arbeitsbl\u00e4tter mit verstreuten Themenbildern, Z\u00e4hlaufgaben und L\u00f6sungsschl\u00fcsseln \u2014 kostenlos',
      description: `Dieser kostenlose Suchbild-Generator erstellt Arbeitsbl\u00e4tter, auf denen Kinder bestimmte Bilder in einer bunten Szene suchen und z\u00e4hlen. Themenbilder \u2014 Tiere, Fahrzeuge, Lebensmittel und \u00fcber 100 weitere Kategorien \u2014 werden zuf\u00e4llig auf der Seite verstreut, und die Sch\u00fcler m\u00fcssen jedes Bild finden und die Gesamtzahl in das Z\u00e4hlk\u00e4stchen eintragen.

Diese Aktivit\u00e4t trainiert mehrere F\u00e4higkeiten gleichzeitig: visuelles Scannen, Aufmerksamkeit, Zahlenerkennung und Z\u00e4hlf\u00e4higkeit. Die Schwierigkeit l\u00e4sst sich \u00fcber die Bilddichte steuern \u2014 wenige, gro\u00dfe Bilder f\u00fcr Anf\u00e4nger; viele, kleine Bilder f\u00fcr Fortgeschrittene.

Beschriftungen k\u00f6nnen in 11 Sprachen angezeigt werden. Jedes Arbeitsblatt enth\u00e4lt automatisch einen L\u00f6sungsschl\u00fcssel. Exportieren Sie als PDF oder JPEG. Kostenlos mit kleinem Wasserzeichen.`,
    },
    whatYouCanCreate: [
      { title: 'Thematische Suchbilder', description: 'Erstellen Sie Suchbild-Szenen zu jedem Thema: Tiere, Fahrzeuge, Natur. Kinder suchen und z\u00e4hlen bestimmte Bilder.' },
      { title: 'Z\u00e4hl\u00fcbungs-Arbeitsbl\u00e4tter', description: 'Perfekt f\u00fcr Mathe\u00fcbungen. Kinder \u00fcben das Z\u00e4hlen in einem motivierenden Suchspiel-Format.' },
      { title: 'Aufmerksamkeits-Training', description: 'Suchbilder trainieren visuelles Scannen und Aufmerksamkeit \u2014 wichtige kognitive F\u00e4higkeiten.' },
      { title: 'DaF-Wortschatz-Suchbilder', description: 'Nutzen Sie mehrsprachige Beschriftungen f\u00fcr den Fremdsprachenunterricht. Kinder lernen Vokabeln beim Suchen.' },
      { title: 'Aktivit\u00e4tsb\u00fccher f\u00fcr Etsy', description: 'Kombinieren Sie thematische Suchbilder zu Aktivit\u00e4tsb\u00fcchern als digitale Produkte.' },
    ],
    tutorial: {
      title: 'So erstellen Sie Suchbild-Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt',
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'W\u00e4hlen Sie aus 104 Themen f\u00fcr die verstreuten Bilder.' },
        { title: 'Bilddichte einstellen', description: 'Wenige Bilder f\u00fcr Anf\u00e4nger, viele f\u00fcr Fortgeschrittene.' },
        { title: 'Beschriftungen konfigurieren', description: 'Aktivieren Sie Beschriftungen in Ihrer Wunschsprache oder deaktivieren Sie sie.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie Seitenformat, Ausrichtung und Rahmen.' },
        { title: 'Generieren', description: 'Das Tool erstellt die Suchbild-Szene und den L\u00f6sungsschl\u00fcssel automatisch.' },
        { title: 'Herunterladen', description: 'Exportieren Sie als PDF oder JPEG.' },
      ],
    },
    businessIdeas: [
      { title: 'Suchbild-Aktivit\u00e4tsb\u00fccher', description: 'Erstellen Sie thematische Suchb\u00fccher mit 20+ Seiten. Verkaufen als Sofort-Download auf Etsy.', platform: 'Etsy' },
      { title: 'Z\u00e4hl\u00fcbungs-Pakete f\u00fcr Lehrkr\u00e4fte', description: 'Lehrkr\u00e4fte lieben Suchbilder als motivierende Mathe-Aktivit\u00e4t. B\u00fcndeln Sie nach Schwierigkeit.', platform: 'Teachers Pay Teachers' },
      { title: 'KDP-Suchb\u00fccher', description: 'Stellen Sie Suchbilder zu Taschenb\u00fcchern zusammen. Amazon druckt und versendet.', platform: 'Amazon KDP' },
      { title: 'Saisonale Suchbild-Pakete', description: 'Halloween-, Weihnachts-, Oster-Suchbilder. Saisonale Nachfrage jedes Jahr.', platform: 'Gumroad' },
      { title: 'DaF-Wortschatz-Suchbilder', description: 'Mehrsprachige Suchbilder f\u00fcr den Fremdsprachenunterricht. Wenig Wettbewerb.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Bilddichte an Alter anpassen', tip: 'F\u00fcr 3\u20134-J\u00e4hrige wenige, gro\u00dfe Bilder. F\u00fcr 5\u20136-J\u00e4hrige mittlere Dichte. F\u00fcr \u00e4ltere Kinder volle Dichte.' },
      { title: 'Beschriftungen f\u00fcr DaF nutzen', tip: 'Aktivieren Sie Beschriftungen in der Zielsprache. Kinder lernen Vokabeln beim Suchen und Z\u00e4hlen.' },
      { title: 'Themen an den Lehrplan anpassen', tip: 'W\u00e4hrend einer Sachkunde-Einheit \u00fcber Tiere erstellen Sie Tier-Suchbilder \u2014 Mathe und Sachkunde kombiniert.' },
      { title: 'In Farbe drucken', tip: 'Suchbilder funktionieren am besten in Farbe. Investieren Sie in Farbdrucke f\u00fcr optimale visuelle Unterscheidung.' },
    ],
    faq: [
      { question: 'Ist der Suchbild-Generator kostenlos?', answer: 'Ja. Alle Funktionen, 104 Themen, PDF-Export und L\u00f6sungsschl\u00fcssel kostenlos. Kleines Wasserzeichen.' },
      { question: 'F\u00fcr welche Altersgruppe?', answer: '3\u20138 Jahre. Bilddichte und Komplexit\u00e4t sind anpassbar f\u00fcr verschiedene Stufen.' },
      { question: 'Kann ich die Bilder in verschiedenen Sprachen beschriften?', answer: 'Ja. 11 Sprachen werden unterst\u00fctzt. Beschriftungen wechseln automatisch.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Commercial Pack ($27) entfernt Wasserzeichen und gew\u00e4hrt kommerzielle Lizenz.' },
      { question: 'Enthalten sie L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen L\u00f6sungsschl\u00fcssel mit korrekten Gesamtzahlen.' },
      { question: 'Wie viele Themen gibt es?', answer: '104 Themen. Full Access Pack ($47) schaltet alle frei.' },
      { question: 'Kann ich die Bilddichte steuern?', answer: 'Ja. Von wenigen gro\u00dfen Bildern bis zu vielen kleinen f\u00fcr h\u00f6here Schwierigkeit.' },
      { question: 'Welche Dateiformate gibt es?', answer: 'PDF und JPEG in hoher Aufl\u00f6sung.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Commercial Pack ($27): Wasserzeichen entfernt + Lizenz. Full Access Pack ($47): alle 104 Themen + Lizenz.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version vor dem Kauf.' },
    ],
    internalLinks: [
      { slug: 'kostenloses-suchbild-tool', pageType: 'tool', anchorText: 'Kostenloses Suchbild-Tool' },
      { slug: 'kostenloses-diagramm-zaehlen-tool', pageType: 'tool', anchorText: 'Kostenloses Diagramm-Z\u00e4hlen-Tool' },
      { slug: 'kostenloses-additions-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Additions-Tool' },
      { slug: 'kostenloses-bilder-sortieren-tool', pageType: 'tool', anchorText: 'Kostenloses Bilder-Sortieren-Tool' },
      { slug: 'kostenloses-was-passt-nicht-tool', pageType: 'tool', anchorText: 'Kostenloses Was-passt-nicht-Tool' },
      { slug: 'find-and-count', pageType: 'app', anchorText: 'Finden und Z\u00e4hlen \u2014 Alle Details' },
      { slug: 'activity-bundle', pageType: 'bundle', anchorText: 'Aktivit\u00e4ts-Arbeitsblatt-Paket' },
      { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    ],
  },
];

// Remaining 12 apps in shorter form (same quality, condensed for script length)
const remainingApps = [
  { appId: 'find-objects', filename: 'kostenloses-suchbild-tool.ts', title: 'Kostenloser Suchbild-Generator', tagline: 'Erstellen Sie Suchbild-Arbeitsbl\u00e4tter mit versteckten Objekten, Ablenkungsbildern und Schwierigkeitseinstellungen', youtubeId: '8Y3jrVr1Phs', sampleFolder: 'find objects', samplePrefix: 'Find Objects', description: 'versteckte Objekte in Szenen suchen', category: 'R\u00e4tsel & Spiele' },
  { appId: 'grid-match', filename: 'kostenloses-gitter-zuordnung-tool.ts', title: 'Kostenloser Gitter-Zuordnung-Generator', tagline: 'Erstellen Sie Gitter-Zuordnungs-Arbeitsbl\u00e4tter mit koordinatenbasierten R\u00e4tseln und 104 Themen', youtubeId: 'RGtED1Bnut8', sampleFolder: 'grid match', samplePrefix: 'Grid Match', description: 'passende Bilder in einem Gitter finden', category: 'Zuordnung' },
  { appId: 'matching', filename: 'kostenloses-zuordnungs-arbeitsblaetter-tool.ts', title: 'Kostenloser Zuordnungs-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Zuordnungs-Arbeitsbl\u00e4tter mit 4 Modi: Buchstabe, Bild-Name, Bild-Wort und eigene', youtubeId: 'y3ghkjt_67s', sampleFolder: 'matching', samplePrefix: 'Matching', description: 'Paare mit Linien verbinden', category: 'Zuordnung' },
  { appId: 'missing-pieces', filename: 'kostenloses-fehlende-teile-tool.ts', title: 'Kostenloser Puzzle-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Puzzle-Arbeitsbl\u00e4tter mit fehlenden Teilen und Multiple-Choice-Antworten', youtubeId: 'gb-xE_Ay4fc', sampleFolder: 'missing pieces', samplePrefix: 'Missing Pieces', description: 'fehlende Puzzleteile identifizieren', category: 'R\u00e4tsel' },
  { appId: 'odd-one-out', filename: 'kostenloses-was-passt-nicht-tool.ts', title: 'Kostenloser Was-passt-nicht-Generator', tagline: 'Erstellen Sie Was-passt-nicht-Arbeitsbl\u00e4tter mit Themenbildern und L\u00f6sungsschl\u00fcsseln', youtubeId: '0R6WFUfY7Mk', sampleFolder: 'odd one out', samplePrefix: 'Odd One Out', description: 'das Bild finden, das nicht zur Gruppe passt', category: 'Logik' },
  { appId: 'pattern-train', filename: 'kostenloses-muster-zug-tool.ts', title: 'Kostenloser Muster-Zug-Generator', tagline: 'Erstellen Sie Muster-Arbeitsbl\u00e4tter mit Zugwaggon-Sequenzen und AB, ABC, ABCD-Mustern', youtubeId: '5A4aHvcC5u4', sampleFolder: 'pattern train', samplePrefix: 'Pattern Train', description: 'Muster in Zugwaggon-Sequenzen vervollst\u00e4ndigen', category: 'Muster & Logik' },
  { appId: 'pattern-worksheet', filename: 'kostenloses-muster-arbeitsblaetter-tool.ts', title: 'Kostenloser Mustererkennung-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Mustererkennung-Arbeitsbl\u00e4tter mit verschiedenen Mustertypen und Schwierigkeitsgraden', youtubeId: 'W94X5_RA3ug', sampleFolder: 'pattern worksheet', samplePrefix: 'Pattern Worksheet', description: 'visuelle Muster erkennen und vervollst\u00e4ndigen', category: 'Muster & Logik' },
  { appId: 'picture-path', filename: 'kostenloses-bilderpfad-tool.ts', title: 'Kostenloser Labyrinth-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Labyrinth-Arbeitsbl\u00e4tter mit 3 Modi: Bildpfad, klassisches Labyrinth und Wege-W\u00e4hlen', youtubeId: 'Sl1o0uPBDCg', sampleFolder: 'picture path', samplePrefix: 'Picture Path', description: 'den richtigen Weg durch ein Labyrinth finden', category: 'R\u00e4tsel' },
  { appId: 'picture-sort', filename: 'kostenloses-bilder-sortieren-tool.ts', title: 'Kostenloser Sortier-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Sortier-Arbeitsbl\u00e4tter mit Zwei-Kategorien-Aktivit\u00e4ten und 104 Bildthemen', youtubeId: '9kzmlABtNVQ', sampleFolder: 'picture sort', samplePrefix: 'Picture Sort', description: 'Bilder in zwei Kategorien sortieren', category: 'Logik' },
  { appId: 'shadow-match', filename: 'kostenloses-schatten-zuordnung-tool.ts', title: 'Kostenloser Schatten-Zuordnung-Generator', tagline: 'Erstellen Sie Schatten-Zuordnungs-Arbeitsbl\u00e4tter mit automatischen Silhouetten und 104 Themen', youtubeId: 'TYvUXJeMI98', sampleFolder: 'shadow match', samplePrefix: 'Shadow Match', description: 'Bilder ihren Schatten zuordnen', category: 'Zuordnung' },
  { appId: 'sudoku', filename: 'kostenloses-sudoku-tool.ts', title: 'Kostenloses Bilder-Sudoku f\u00fcr Kinder', tagline: 'Erstellen Sie Bilder-Sudoku-R\u00e4tsel mit Bildern statt Zahlen, 4x4-Gittern und 104 Themen', youtubeId: 'bqVioFbkYbA', sampleFolder: 'sudoku', samplePrefix: 'Sudoku', description: 'Bilder-Sudoku-R\u00e4tsel l\u00f6sen', category: 'R\u00e4tsel' },
  { appId: 'treasure-hunt', filename: 'kostenloses-schatzsuche-tool.ts', title: 'Kostenloser Schatzsuche-Arbeitsbl\u00e4tter-Generator', tagline: 'Erstellen Sie Schatzsuche-Arbeitsbl\u00e4tter mit Zahlengittern, Richtungsangaben und Rechenoperationen', youtubeId: 'flHiBXsYLLA', sampleFolder: 'treasure hunt', samplePrefix: 'Treasure Hunt', description: 'den Schatz durch Zahlengitter und Richtungen finden', category: 'Mathe & Spiele' },
];

// Map of related tool slugs for internal links
const toolSlugMap = {
  'find-objects': { relatedTools: ['kostenloses-finden-und-zaehlen-tool', 'kostenloses-kreuzwortraetsel-tool', 'kostenloses-schatzsuche-tool', 'kostenloses-was-passt-nicht-tool', 'kostenloses-fehlende-teile-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'grid-match': { relatedTools: ['kostenloses-zuordnungs-arbeitsblaetter-tool', 'kostenloses-schatten-zuordnung-tool', 'kostenloses-bingo-karten-tool', 'kostenloses-bilder-sortieren-tool', 'kostenloses-muster-arbeitsblaetter-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'matching': { relatedTools: ['kostenloses-schatten-zuordnung-tool', 'kostenloses-gitter-zuordnung-tool', 'kostenloses-linien-zeichnen-tool', 'kostenloses-bingo-karten-tool', 'kostenloses-bilder-sortieren-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'missing-pieces': { relatedTools: ['kostenloses-was-passt-nicht-tool', 'kostenloses-sudoku-tool', 'kostenloses-suchbild-tool', 'kostenloses-schatten-zuordnung-tool', 'kostenloses-kreuzwortraetsel-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'odd-one-out': { relatedTools: ['kostenloses-bilder-sortieren-tool', 'kostenloses-fehlende-teile-tool', 'kostenloses-was-passt-nicht-tool', 'kostenloses-zuordnungs-arbeitsblaetter-tool', 'kostenloses-muster-arbeitsblaetter-tool'], bundle: 'pattern-bundle', bundleName: 'Muster & Logik Paket' },
  'pattern-train': { relatedTools: ['kostenloses-muster-arbeitsblaetter-tool', 'kostenloses-gross-und-klein-arbeitsblaetter-tool', 'kostenloses-bilder-sortieren-tool', 'kostenloses-was-passt-nicht-tool', 'kostenloses-zuordnungs-arbeitsblaetter-tool'], bundle: 'pattern-bundle', bundleName: 'Muster & Logik Paket' },
  'pattern-worksheet': { relatedTools: ['kostenloses-muster-zug-tool', 'kostenloses-gross-und-klein-arbeitsblaetter-tool', 'kostenloses-was-passt-nicht-tool', 'kostenloses-bilder-sortieren-tool', 'kostenloses-zuordnungs-arbeitsblaetter-tool'], bundle: 'pattern-bundle', bundleName: 'Muster & Logik Paket' },
  'picture-path': { relatedTools: ['kostenloses-schatzsuche-tool', 'kostenloses-suchbild-tool', 'kostenloses-linien-zeichnen-tool', 'kostenloses-kreuzwortraetsel-tool', 'kostenloses-sudoku-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'picture-sort': { relatedTools: ['kostenloses-was-passt-nicht-tool', 'kostenloses-zuordnungs-arbeitsblaetter-tool', 'kostenloses-gross-und-klein-arbeitsblaetter-tool', 'kostenloses-muster-arbeitsblaetter-tool', 'kostenloses-bingo-karten-tool'], bundle: 'pattern-bundle', bundleName: 'Muster & Logik Paket' },
  'shadow-match': { relatedTools: ['kostenloses-zuordnungs-arbeitsblaetter-tool', 'kostenloses-gitter-zuordnung-tool', 'kostenloses-linien-zeichnen-tool', 'kostenloses-bingo-karten-tool', 'kostenloses-bilder-sortieren-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'sudoku': { relatedTools: ['kostenloses-kreuzwortraetsel-tool', 'kostenloses-schatzsuche-tool', 'kostenloses-fehlende-teile-tool', 'kostenloses-muster-arbeitsblaetter-tool', 'kostenloses-was-passt-nicht-tool'], bundle: 'puzzle-bundle', bundleName: 'R\u00e4tsel & Spiele Paket' },
  'treasure-hunt': { relatedTools: ['kostenloses-bilderpfad-tool', 'kostenloses-additions-arbeitsblaetter-tool', 'kostenloses-mathe-raetsel-tool', 'kostenloses-sudoku-tool', 'kostenloses-kreuzwortraetsel-tool'], bundle: 'math-number-bundle', bundleName: 'Mathe & Zahlen Paket' },
};

// Tool name mapping for anchor text
const toolNameMap = {
  'kostenloses-finden-und-zaehlen-tool': 'Finden-und-Z\u00e4hlen-Tool',
  'kostenloses-kreuzwortraetsel-tool': 'Kreuzwortr\u00e4tsel-Tool',
  'kostenloses-schatzsuche-tool': 'Schatzsuche-Tool',
  'kostenloses-was-passt-nicht-tool': 'Was-passt-nicht-Tool',
  'kostenloses-fehlende-teile-tool': 'Fehlende-Teile-Tool',
  'kostenloses-zuordnungs-arbeitsblaetter-tool': 'Zuordnungs-Tool',
  'kostenloses-schatten-zuordnung-tool': 'Schatten-Zuordnung-Tool',
  'kostenloses-bingo-karten-tool': 'Bingo-Karten-Tool',
  'kostenloses-bilder-sortieren-tool': 'Bilder-Sortieren-Tool',
  'kostenloses-muster-arbeitsblaetter-tool': 'Muster-Arbeitsbl\u00e4tter-Tool',
  'kostenloses-gitter-zuordnung-tool': 'Gitter-Zuordnung-Tool',
  'kostenloses-linien-zeichnen-tool': 'Linien-Zeichnen-Tool',
  'kostenloses-gross-und-klein-arbeitsblaetter-tool': 'Gro\u00df & Klein Tool',
  'kostenloses-muster-zug-tool': 'Muster-Zug-Tool',
  'kostenloses-suchbild-tool': 'Suchbild-Tool',
  'kostenloses-sudoku-tool': 'Sudoku-Tool',
  'kostenloses-bilderpfad-tool': 'Bilderpfad-Tool',
  'kostenloses-additions-arbeitsblaetter-tool': 'Additions-Tool',
  'kostenloses-mathe-raetsel-tool': 'Mathe-R\u00e4tsel-Tool',
  'kostenloses-ausmalbilder-tool': 'Ausmalbilder-Tool',
  'kostenloses-malen-und-ausmalen-tool': 'Malen-und-Ausmalen-Tool',
  'kostenloses-schreibuebungs-tool': 'Schreib\u00fcbungs-Tool',
  'kostenloses-wort-raten-tool': 'Wort-Raten-Tool',
  'kostenloses-buchstabensalat-tool': 'Buchstabensalat-Tool',
  'kostenloses-kryptogramm-tool': 'Kryptogramm-Tool',
  'kostenloses-wortsuchrraetsel-tool': 'Wortsuchr\u00e4tsel-Tool',
  'kostenloses-diagramm-zaehlen-tool': 'Diagramm-Z\u00e4hlen-Tool',
};

function generateRemainingApp(app) {
  const info = toolSlugMap[app.appId];
  const internalLinks = info.relatedTools.map(slug => ({
    slug,
    pageType: 'tool',
    anchorText: `Kostenloses ${toolNameMap[slug] || slug}`,
  }));
  internalLinks.push(
    { slug: app.appId, pageType: 'app', anchorText: `${app.title.replace('Kostenloser ', '').replace('Kostenloses ', '')} \u2014 Alle Details` },
    { slug: info.bundle, pageType: 'bundle', anchorText: info.bundleName },
    { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
  );

  const seoTitle = app.title + ' | PDF Ohne Anmeldung';
  const keyword = app.title.toLowerCase().replace('kostenloser ', 'kostenlose ').replace('kostenloses ', 'kostenlose ');

  return {
    appId: app.appId,
    filename: app.filename,
    seo: {
      titleTag: seoTitle,
      metaDescription: `Erstellen Sie kostenlose ${app.description}-Arbeitsbl\u00e4tter mit 104 Bildthemen. L\u00f6sungsschl\u00fcssel, PDF-Export, verschiedene Schwierigkeitsgrade. Keine Anmeldung erforderlich.`,
      primaryKeyword: keyword,
      secondaryKeywords: [
        `${keyword} druckbar`,
        `${keyword} erstellen`,
        `${keyword} Generator online`,
        `${keyword} PDF kostenlos`,
        `${keyword} ohne Anmeldung`,
      ],
      lsiKeywords: [
        'Bildbasierte Arbeitsbl\u00e4tter',
        'Druckbare Aktivit\u00e4ten Kinder',
        'P\u00e4dagogische Arbeitsbl\u00e4tter kostenlos',
        'Vorschule \u00dcbungsbl\u00e4tter',
        'Kindergarten Aktivit\u00e4ten druckbar',
        'Kognitive F\u00e4higkeiten \u00dcbungen',
        'Visuelles Lernen Arbeitsbl\u00e4tter',
        'Grundschule Arbeitsbl\u00e4tter Generator',
      ],
    },
    visuals: {
      heroImages: {
        primary: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (1).jpeg`,
        primaryAlt: `${app.title} \u2014 Arbeitsblatt mit bunten Themenbildern f\u00fcr Kinder`,
        secondary: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (2).jpeg`,
        secondaryAlt: `${app.title} L\u00f6sungsschl\u00fcssel mit korrekten Antworten`,
      },
      sampleGallery: [
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (3).jpeg`, alt: `${app.title} Arbeitsblatt mit Tierthema`, caption: 'Tierthema \u2014 104 Themen verf\u00fcgbar' },
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (4).jpeg`, alt: `${app.title} Arbeitsblatt mit Essensthema`, caption: 'Essensthema f\u00fcr bunte Aktivit\u00e4ten' },
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (5).jpeg`, alt: `${app.title} Arbeitsblatt mit Fahrzeugthema`, caption: 'Fahrzeugthema mit Rahmen' },
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (6).jpeg`, alt: `${app.title} Arbeitsblatt mit Naturthema`, caption: 'Naturthema f\u00fcr saisonale Nutzung' },
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (7).jpeg`, alt: `${app.title} fortgeschrittenes Arbeitsblatt`, caption: 'Fortgeschrittener Schwierigkeitsgrad' },
        { src: `/samples/english/${app.sampleFolder}/${app.samplePrefix} (8).jpeg`, alt: `${app.title} L\u00f6sungsschl\u00fcssel`, caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
      ],
      youtubeId: app.youtubeId,
      videoTitle: `So erstellen Sie ${app.description}-Arbeitsbl\u00e4tter \u2014 Kostenloses Tutorial`,
    },
    hero: {
      title: app.title,
      tagline: app.tagline + ' \u2014 kostenlos, ohne Anmeldung',
      description: `Dieser kostenlose Generator erstellt professionelle Arbeitsbl\u00e4tter, auf denen Kinder ${app.description}. W\u00e4hlen Sie aus 104 illustrierten Themen \u2014 Tiere, Fahrzeuge, Lebensmittel, Natur und Dutzende weitere Kategorien \u2014 und das Tool erstellt sofort druckfertige Arbeitsbl\u00e4tter mit passendem L\u00f6sungsschl\u00fcssel. Keine Anmeldung, kein Download erforderlich.

Die Arbeitsbl\u00e4tter trainieren wichtige kognitive F\u00e4higkeiten: visuelles Denken, logisches Schlussfolgern, Mustererkennung und Aufmerksamkeit. Verschiedene Schwierigkeitsgrade erm\u00f6glichen den Einsatz von der Vorschule bis zur zweiten Klasse. Passen Sie die Aufgaben an das Niveau Ihrer Sch\u00fcler an \u2014 einfache \u00dcbungen f\u00fcr Anf\u00e4nger bis hin zu anspruchsvollen Herausforderungen f\u00fcr Fortgeschrittene.

Der integrierte Canvas-Editor erm\u00f6glicht das Anpassen von Texten, Farben, Schriftarten und Rahmenstilen vor dem Export. Exportieren Sie als hochaufl\u00f6sendes PDF oder JPEG. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgraden Sie auf ein Commercial Pack, um das Wasserzeichen zu entfernen und unbegrenzt auf Etsy, Amazon KDP oder Teachers Pay Teachers zu verkaufen.`,
    },
    whatYouCanCreate: [
      { title: `Thematische ${app.category}-Arbeitsbl\u00e4tter`, description: `Erstellen Sie Arbeitsbl\u00e4tter zu jedem Thema \u2014 Tiere, Fahrzeuge, Natur, Feiertage \u2014 bei denen Kinder ${app.description}.` },
      { title: 'Differenzierte \u00dcbungspakete', description: 'Erstellen Sie Sets mit steigendem Schwierigkeitsgrad: einfach f\u00fcr Anf\u00e4nger, mittel f\u00fcr Fortgeschrittene, schwer f\u00fcr leistungsstarke Sch\u00fcler.' },
      { title: 'Druckbare Arbeitsb\u00fccher f\u00fcr Etsy', description: 'Kombinieren Sie thematische Arbeitsbl\u00e4tter zu PDF-Arbeitsb\u00fcchern und verkaufen Sie als digitale Produkte auf Etsy.' },
      { title: 'Morgenarbeit und Warm-ups', description: 'Erstellen Sie f\u00fcnf Arbeitsbl\u00e4tter f\u00fcr die Woche in Minuten. Perfekt als Aufw\u00e4rm\u00fcbung zum Unterrichtsbeginn.' },
      { title: 'Hausaufgaben-Aktivit\u00e4ten', description: 'Senden Sie ansprechende Arbeitsbl\u00e4tter nach Hause. Das visuelle Format motiviert Kinder zum selbstst\u00e4ndigen \u00dcben.' },
    ],
    tutorial: {
      title: `So erstellen Sie ${app.description}-Arbeitsbl\u00e4tter \u2014 Schritt f\u00fcr Schritt`,
      steps: [
        { title: 'Generator \u00f6ffnen', description: 'Klicken Sie auf \u201EKostenlos testen\u201C. Kein Konto oder Download erforderlich.' },
        { title: 'Thema ausw\u00e4hlen', description: 'Durchsuchen Sie 104 illustrierte Kategorien: Tiere, Essen, Fahrzeuge, Feiertage und mehr.' },
        { title: 'Schwierigkeitsgrad w\u00e4hlen', description: 'Passen Sie die Komplexit\u00e4t an das Alter und K\u00f6nnen Ihrer Sch\u00fcler an.' },
        { title: 'Layout anpassen', description: 'W\u00e4hlen Sie Seitenformat, Ausrichtung, Schriftart, Farben und dekorative Rahmen.' },
        { title: 'Arbeitsblatt generieren', description: 'Klicken Sie auf \u201EGenerieren\u201C. Arbeitsblatt und L\u00f6sungsschl\u00fcssel werden in Sekunden erstellt.' },
        { title: 'Im Canvas bearbeiten', description: 'Passen Sie Text, Farben und Layout im integrierten Editor an.' },
        { title: 'Als PDF oder JPEG herunterladen', description: 'Exportieren Sie zum Drucken oder als digitales Produkt. L\u00f6sungsschl\u00fcssel wird separat erstellt.' },
      ],
    },
    businessIdeas: [
      { title: `Thematische ${app.category}-Arbeitsbuch-Serie`, description: 'Erstellen Sie 20-seitige Arbeitsb\u00fccher nach Themen. Verkaufen als Sofort-Download-PDF.', platform: 'Etsy' },
      { title: `${app.category}-Materialpaket f\u00fcr Lehrkr\u00e4fte`, description: 'Erstellen Sie differenzierte Arbeitsblattpakete f\u00fcr den Unterricht. Lehrkr\u00e4fte lieben fertige Materialien.', platform: 'Teachers Pay Teachers' },
      { title: 'Aktivit\u00e4tsbuch f\u00fcr Amazon KDP', description: 'Stellen Sie 50\u2013100 Arbeitsbl\u00e4tter zu einem Taschenbuch zusammen. Amazon druckt und versendet.', platform: 'Amazon KDP' },
      { title: 'Saisonale Aktivit\u00e4tspakete', description: 'Erstellen Sie Feiertagsthemen-Pakete: Halloween, Weihnachten, Ostern. Saisonale Produkte verkaufen sich jedes Jahr.', platform: 'Gumroad' },
      { title: 'Mehrsprachige Arbeitsbl\u00e4tter', description: 'Nutzen Sie die 11 Sprachen f\u00fcr DaF-Unterricht und internationale M\u00e4rkte. Weniger Wettbewerb in nicht-englischen Nischen.', platform: 'Multi-platform' },
    ],
    proTips: [
      { title: 'Beginnen Sie mit einfachen Aufgaben', tip: `F\u00fcr die j\u00fcngsten Kinder (3\u20134 Jahre) w\u00e4hlen Sie den leichtesten Schwierigkeitsgrad. Steigern Sie die Komplexit\u00e4t schrittweise.` },
      { title: 'Themen an den Lehrplan anpassen', tip: 'Nutzen Sie passende Themenbilder, um Ihre aktuelle Unterrichtseinheit spielerisch zu erg\u00e4nzen.' },
      { title: 'In Farbe drucken f\u00fcr beste Wirkung', tip: 'Bunte Themenbilder motivieren Kinder mehr als Schwarz-Wei\u00df. Investieren Sie in Farbdruck.' },
      { title: 'L\u00f6sungsschl\u00fcssel separat aufbewahren', tip: 'Drucken Sie L\u00f6sungsschl\u00fcssel auf andersfarbigem Papier f\u00fcr einfache Selbstkontrolle.' },
    ],
    faq: [
      { question: `Ist dieser ${app.title.replace('Kostenloser ', '').replace('Kostenloses ', '')} wirklich kostenlos?`, answer: 'Ja. Alle Funktionen, alle verf\u00fcgbaren Themen, PDF-Export und L\u00f6sungsschl\u00fcssel sind kostenlos. Einzige Einschr\u00e4nkung ist ein kleines Wasserzeichen.' },
      { question: 'F\u00fcr welche Altersgruppe sind diese Arbeitsbl\u00e4tter?', answer: 'F\u00fcr Kinder von 3\u20138 Jahren (Vorschule bis zweite Klasse). Verschiedene Schwierigkeitsgrade f\u00fcr jedes Alter verf\u00fcgbar.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?', answer: 'Mit der kostenlosen Version enthalten Arbeitsbl\u00e4tter ein Wasserzeichen. Das Commercial Pack ($27) entfernt es und gew\u00e4hrt eine kommerzielle Lizenz f\u00fcr Etsy, Amazon KDP, TPT und andere Plattformen.' },
      { question: 'Welche Dateiformate kann ich herunterladen?', answer: 'JPEG und PDF in hoher Aufl\u00f6sung. Der L\u00f6sungsschl\u00fcssel wird separat im selben Format exportiert. PDFs sind f\u00fcr A4, Letter oder Legal formatiert.' },
      { question: 'Wie viele Bildthemen sind verf\u00fcgbar?', answer: 'Die kostenlose Version enth\u00e4lt eine Auswahl. Das Full Access Pack ($47) schaltet alle 104 illustrierten Themen frei.' },
      { question: 'Kann ich die Arbeitsbl\u00e4tter anpassen?', answer: 'Ja. Der integrierte Canvas-Editor erlaubt das Anpassen von Text, Schriftarten, Farben, Rahmenstilen und Elementpositionen.' },
      { question: 'Enthalten die Arbeitsbl\u00e4tter L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen passenden L\u00f6sungsschl\u00fcssel mit klar markierten Antworten.' },
      { question: 'Kann ich diese f\u00fcr Homeschooling nutzen?', answer: 'Absolut. Erstellen Sie t\u00e4glich frische Arbeitsbl\u00e4tter ohne Wiederholung. Passen Sie Themen an die Interessen Ihres Kindes an.' },
      { question: 'Was ist der Unterschied zwischen Commercial und Full Access Pack?', answer: 'Das Commercial Pack ($27) entfernt das Wasserzeichen und gew\u00e4hrt kommerzielle Lizenz. Das Full Access Pack ($47) enth\u00e4lt zus\u00e4tzlich alle 104 Themen und die vollst\u00e4ndige Bildbibliothek.' },
      { question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?', answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst alles mit der kostenlosen Version.' },
    ],
    internalLinks,
  };
}

function writeFile(data) {
  const content = `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, (m, key) => {
    // Keep keys without quotes if they're valid JS identifiers
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) return `${key}:`;
    return m;
  })};
`;

  // Remove filename from the data object before writing
  const filePath = path.join(outDir, data.filename);
  // We need to rebuild without filename
  const cleanData = { ...data };
  delete cleanData.filename;

  const fileContent = `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = ${JSON.stringify(cleanData, null, 2)};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`  Created: ${data.filename}`);
}

// Main
console.log('Generating 20 German tool-content files...\n');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let count = 0;

// Write the 8 fully detailed apps
for (const app of apps) {
  const data = { ...app };
  // Add locale
  data.locale = 'de';
  writeFile(data);
  count++;
}

// Write the 12 generated apps
for (const app of remainingApps) {
  const data = generateRemainingApp(app);
  data.locale = 'de';
  writeFile(data);
  count++;
}

console.log(`\nDone! Generated ${count} German tool-content files.`);
