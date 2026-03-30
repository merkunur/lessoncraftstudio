import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'KDP Aktivitaetsbuch Formatierung',
    secondaryKeywords: [
      'Amazon KDP Raetselbuch erstellen',
      'KDP Arbeitsbuch Format Vorlage',
      'Amazon Aktivitaetsbuch veroeffentlichen',
    ],
    lsiKeywords: [
      'KDP Interior Template',
      'Low Content Book Amazon',
      'Raetselbuch Seitenaufbau',
    ],
    titleTag: 'KDP-Aktivitaetsbuch Formatierung Guide | LCS',
    metaDescription: 'Schritt-fuer-Schritt Anleitung zur KDP-Aktivitaetsbuch Formatierung. Seitengroessen, Raender, Dateianforderungen und haeufige Fehler vermeiden.',
  },
  hero: {
    title: 'KDP-Aktivitaetsbuch Formatierung Schritt fuer Schritt',
    tagline: 'Von der Arbeitsblatt-Datei zum veroeffentlichten Amazon-Buch',
    description: 'Amazon KDP ist der groesste Marktplatz fuer Aktivitaets- und Raetselbuecher weltweit — und der DACH-Markt waechst rasant. Doch zwischen einem fertigen Arbeitsblatt und einem veroeffentlichten Buch liegen Formatierungsanforderungen, die viele Anfaenger ueberfordern. Falsche Seitengroessen, fehlende Raender, zu niedrige Aufloesung oder inkorrekte Farbprofile fuehren zur Ablehnung. Dieser Guide zeigt Ihnen jeden Schritt der Formatierung, damit Ihr Buch beim ersten Versuch akzeptiert wird.',
  },
  category: 'platform-strategy',
  introduction: 'KDP-Aktivitaetsbuecher gehoeren zu den profitabelsten Low-Content-Buch-Kategorien auf Amazon.de. Wortsuche-Sammlungen, Mathe-Uebungshefte und Raetselbuecher verkaufen sich konstant, besonders als Geschenk und zur Ferienbeschaeftigung. Die Formatierung ist der technische Teil, der viele kreative Unternehmer abschreckt — aber er ist eigentlich unkompliziert, wenn Sie die Anforderungen kennen und eine klare Checkliste befolgen.',
  sections: [
    {
      heading: 'Die richtigen Seitengroessen fuer Aktivitaetsbuecher',
      content: 'Amazon KDP unterstuetzt ueber 30 Buchformate, aber fuer Aktivitaetsbuecher sind nur wenige sinnvoll.\n\n8,5 x 11 Zoll (21,59 x 27,94 cm) ist das Standardformat fuer Arbeitsbuecher und Aktivitaetshefte. Es entspricht in etwa dem US Letter Format und ist gross genug fuer detaillierte Raetsel und Arbeitsblaetter. Fuer den deutschen Markt ist es akzeptabel, obwohl es nicht dem DIN-A4-Format (21 x 29,7 cm) entspricht.\n\n8,27 x 11,69 Zoll (21 x 29,7 cm) — dieses Format ist naeher an DIN A4 und wird von deutschen Kaeufer intuitiv erwartet. Pruefen Sie, ob es in Ihrer KDP-Region verfuegbar ist.\n\n6 x 9 Zoll (15,24 x 22,86 cm) eignet sich fuer kleinere Raetselbuecher wie Wortsuche oder Sudoku, die unterwegs geloest werden.\n\nWichtig: Waehlen Sie das Format VOR der Erstellung Ihrer Inhaltsseiten. Ein nachtraeglicher Formatwechsel erfordert die Neugestaltung aller Seiten, da sich Raender und Beschnitt aendern.',
    },
    {
      heading: 'Raender, Beschnitt und sichere Bereiche',
      content: 'Der haeufigste Ablehnungsgrund bei KDP ist der Beschnittbereich. KDP unterscheidet zwischen randabfallendem Druck (Bleed) und ohne Beschnitt (No Bleed).\n\nFuer Aktivitaetsbuecher empfehle ich \"No Bleed\", da Ihre Inhalte keinen randlosen Druck benoetigen. Die Mindestmaerder betragen: Innen (Bundsteg) 0,375 Zoll bei unter 150 Seiten, 0,75 Zoll bei ueber 150 Seiten. Aussen, oben und unten jeweils 0,25 Zoll.\n\nDer sichere Bereich ist 0,125 Zoll innerhalb des Seitenrands. Platzieren Sie keine wichtigen Inhalte, Text oder Raetselgitter in diesem Bereich, da der Druck leicht versetzt sein kann.\n\nPraktischer Tipp: Erstellen Sie eine Mastervorlage mit den korrekten Raendern und verwenden Sie diese fuer alle Seiten. Zeichnen Sie Hilfslinien in Ihrem Design-Programm, die den sicheren Bereich markieren. So vermeiden Sie, dass Raetselgitter oder Anweisungstexte zu nah am Rand erscheinen.',
    },
    {
      heading: 'PDF-Dateianforderungen und Qualitaetskontrolle',
      content: 'KDP akzeptiert ausschliesslich PDF-Dateien fuer den Buchinhalt. Die Anforderungen sind streng, aber ueberschaubar.\n\nAufloesung: Mindestens 300 DPI fuer Bilder und Grafiken. Arbeitsblaetter aus den LessonCraftStudio-Generatoren erfuellen diese Anforderung bereits. Farbprofil: Verwenden Sie RGB fuer Farbdruckbuecher, Graustufen fuer Schwarz-Weiss. Die meisten Aktivitaetsbuecher nutzen Schwarz-Weiss-Druck, was die Druckkosten und damit Ihre Gewinnmarge deutlich verbessert.\n\nSchrifteinbettung: Alle verwendeten Schriften muessen im PDF eingebettet sein. Verwenden Sie keine Systemschriften ohne Einbettung. Dateibenennung: Vermeiden Sie Umlaute und Sonderzeichen im Dateinamen. \"Aktivitaetsbuch_Mathe_Klasse1.pdf\" funktioniert, \"Aktivitaetsbüch_Mathe.pdf\" kann Probleme verursachen.\n\nVor dem Upload: Pruefen Sie Ihre PDF in Amazons eigenem Vorschau-Tool (KDP Previewer). Es zeigt exakt, wie Ihr Buch gedruckt aussehen wird, inklusive eventueller Probleme mit Raendern oder Aufloesung.',
    },
    {
      heading: 'Buchaufbau: Vom Einzelblatt zum kompletten Buch',
      content: 'Ein professionelles Aktivitaetsbuch besteht aus mehr als aneinandergereihten Arbeitsblaettern. Die Struktur beeinflusst Bewertungen und damit langfristige Verkaeufe.\n\nOptimaler Aufbau: Titelseite mit Buchtitel, Untertitel und einer ansprechenden Grafik. Copyright-Seite mit Ihrem Namen oder Verlagsnamen, Jahr und dem Hinweis \"Alle Rechte vorbehalten\". Inhaltsverzeichnis — bei Aktivitaetsbuecher optional, aber bei ueber 50 Seiten empfohlen. Einleitung oder Anleitung mit einer kurzen Erklaerung, wie das Buch verwendet wird. Hauptteil mit den eigentlichen Aktivitaetsseiten, idealerweise nach Schwierigkeit oder Thema gruppiert. Loesungsteil am Ende des Buches, klar vom Hauptteil getrennt.\n\nSeitenanzahl: KDP erfordert mindestens 24 Seiten. Fuer Aktivitaetsbuecher empfehle ich 50 bis 120 Seiten als optimalen Bereich. Weniger wirkt duenn, mehr wird teuer im Druck und schmaehlert Ihre Marge.\n\nProfi-Tipp: Nummerieren Sie die Seiten und referenzieren Sie im Loesungsteil die jeweilige Seitennummer. Das wirkt professionell und erleichtert die Nutzung.',
    },
    {
      heading: 'Cover-Design und Metadaten fuer den Verkauf',
      content: 'Ihr Cover ist das wichtigste Verkaufselement auf Amazon. Bei Aktivitaetsbuecher hat sich ein klarer Stil durchgesetzt: Heller, farbenfroher Hintergrund mit einer grossen, lesbaren Ueberschrift und einer Illustration, die das Thema sofort erkennbar macht.\n\nDas Cover muss als PDF oder JPEG mit mindestens 300 DPI hochgeladen werden. Die Mindestgroesse betraegt 625 x 1000 Pixel, aber ich empfehle deutlich groesser, mindestens 2500 x 3500 Pixel. Vergessen Sie nicht den Buchruechen: Bei einem Buch mit 100 Seiten hat der Ruecken etwa 0,25 Zoll Breite. KDP stellt einen Cover-Rechner bereit, der die exakten Masse inklusive Ruecken berechnet.\n\nMetadaten: Ihr Buchtitel, Untertitel und die sieben Keywords bestimmen die Auffindbarkeit auf Amazon.de. Verwenden Sie im Untertitel beschreibende Keywords: \"50 Additions-Uebungen fuer Klasse 1 und 2 | Mit Loesungen | Grossdruck\". Waehlen Sie die spezifischste BISAC-Kategorie, die passt. Fuer Mathe-Aktivitaetsbuecher ist \"Juvenile Nonfiction / Activity Books / General\" oder \"Education / Teaching Methods / Mathematics\" sinnvoll.',
    },
  ],
  keyTakeaways: [
    'Waehlen Sie das Buchformat vor der Inhaltserstellung — nachtraegliche Aenderungen sind aufwaendig',
    'No-Bleed-Einstellung ist fuer Aktivitaetsbuecher ideal — beachten Sie die Mindestmaerder',
    'Alle Bilder muessen mindestens 300 DPI haben, Schriften muessen eingebettet sein',
    'Optimale Seitenanzahl: 50-120 Seiten mit Titelseite, Inhaltsverzeichnis und Loesungsteil',
    'Das Cover entscheidet ueber den Klick — investieren Sie in professionelles Design',
  ],
  faq: [
    {
      question: 'Kann ich meine Etsy-Arbeitsblaetter direkt als KDP-Buch veroeffentlichen?',
      answer: 'Grundsaetzlich ja, aber Sie muessen die Formatierung anpassen. Etsy-Arbeitsblaetter sind meist im A4-Format, KDP verwendet andere Groessen. Ausserdem braucht ein Buch Titelseite, Copyright und Loesungsteil. Planen Sie 2 bis 3 Stunden fuer die Umformatierung ein.',
    },
    {
      question: 'Wie viel verdient man mit einem KDP-Aktivitaetsbuch?',
      answer: 'Die Tantiemen haengen vom Listenpreis und der Druckwahl ab. Ein Schwarz-Weiss-Buch mit 100 Seiten zum Preis von €9,99 bringt etwa €3-4 Tantiemen pro Verkauf. Top-Seller mit 10+ Buechern und guten Bewertungen berichten von €300-1.000 monatlich auf Amazon.de.',
    },
    {
      question: 'Brauche ich eine ISBN-Nummer fuer mein KDP-Buch?',
      answer: 'Nein, KDP vergibt kostenlos eine ISBN fuer jedes Taschenbuch. Sie koennen auch eine eigene ISBN verwenden, aber das ist nur sinnvoll, wenn Sie ueber eigene Vertriebskanaele verkaufen moechten. Fuer den reinen Amazon-Verkauf ist die kostenlose KDP-ISBN ausreichend.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Wortsuche-Raetsel fuer KDP-Buecher erstellen' },
    { pageType: 'app', slug: 'crossword-worksheets', anchorText: 'Kreuzwortraetsel-Generator' },
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'Raetselbuecher fuer Amazon KDP' },
  ],
  relatedPosts: [
    { slug: 'kdp-vs-etsy-which-earns-more', title: 'KDP vs Etsy: Was verdient mehr?' },
    { slug: 'print-on-demand-vs-digital-download', title: 'Print-on-Demand vs. digitaler Download' },
    { slug: 'best-printable-niches-low-competition', title: '15 Nischen mit wenig Konkurrenz 2026' },
  ],
  cta: {
    heading: 'Inhalte fuer Ihr KDP-Buch erstellen',
    description: 'Generieren Sie professionelle Raetsel und Arbeitsblaetter fuer Ihr naechstes Aktivitaetsbuch. Kostenlose Testversion mit Wasserzeichen.',
    buttonText: 'Generatoren entdecken',
    buttonUrl: '/apps',
  },
};

export default content;
