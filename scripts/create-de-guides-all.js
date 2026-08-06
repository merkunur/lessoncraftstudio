const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });

function w(name, content) {
  fs.writeFileSync(path.join(d, name), content, 'utf8');
  console.log('Created: ' + name);
}

// Common FAQ items reused across all files
const commonFaqCommercial = `    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell verkaufen?',
      answer: 'Mit einer Commercial-Lizenz k\u00f6nnen Sie auf Etsy, TPT, KDP und anderen Plattformen verkaufen. Die Full-Access-Lizenz umfasst alle 100+ Themen f\u00fcr vielf\u00e4ltige Produkterstellung.',
    },`;

const commonFaqPricing = `    {
      question: 'Was kosten die Lizenzen?',
      answer: 'Einzelne App-Lizenzen kosten $27 f\u00fcr Commercial und $47 f\u00fcr Full Access. Wenn Sie mehrere Apps m\u00f6chten, sind B\u00fcndel f\u00fcr $79 (Commercial) und $119 (Full Access) erh\u00e4ltlich, die eine gesamte Werkzeugkategorie abdecken.',
    },`;

const commonFaqRefund = `    {
      question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.',
    },`;

// Business guide pricing FAQ variant
const bizFaqPricing = `    {
      question: 'Was kosten die Arbeitsblatt-Generator-Tools?',
      answer: 'Einzelne Arbeitsblatt-Generator-Apps sind f\u00fcr $27 (Commercial-Lizenz) oder $47 (Full Access) erh\u00e4ltlich. Kategorie-B\u00fcndel mit mehreren verwandten Generatoren kosten $79 (Commercial) oder $119 (Full Access). Beide Stufen beinhalten lebenslangen Zugang und alle zuk\u00fcnftigen Updates.',
    },`;

const bizFaqRefund = `    {
      question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.',
    },`;

// === 3. create-drawing-worksheets.ts ===
w('create-drawing-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-drawing-worksheets',
  locale: 'de',

  seo: {
    titleTag: 'Mal- und Zeichen-Arbeitsbl\u00e4tter erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Mal- und Zeichen-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Schritt-f\u00fcr-Schritt-Anleitung mit Tipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Zeichen-Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: [
      'Zeichen\u00fcbungen Generator',
      'Malen und Zeichnen Arbeitsbl\u00e4tter',
      'druckbare Zeichenaktivit\u00e4ten',
      'Mal\u00fcbungen erstellen',
      'Zeichen-und-Ausmalen Generator',
    ],
    lsiKeywords: [
      'kreativer Ausdruck',
      'angeleitetes Zeichnen',
      'Schritt-f\u00fcr-Schritt Zeichnen',
      'Kunst-Arbeitsbl\u00e4tter f\u00fcr Kinder',
      'Feinmotorik Kunst\u00fcbungen',
      'Zeichenanregungen',
      'Illustrations\u00fcbungen',
      'bildende Kunst Erziehung',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/draw and color/sample-1.jpeg',
      primaryAlt: 'Individuelles Zeichen-und-Ausmalen-Arbeitsblatt mit thematischen Anregungen',
      secondary: '/samples/english/draw and color/sample-2.jpeg',
      secondaryAlt: 'Zeichenaktivit\u00e4t-Arbeitsblatt f\u00fcr Kinder',
    },
    sampleGallery: [
      { src: '/samples/english/draw and color/sample-1.jpeg', alt: 'Angeleitetes Zeichnen-Arbeitsblatt', caption: 'Schritt-f\u00fcr-Schritt Zeichenanleitung' },
      { src: '/samples/english/draw and color/sample-2.jpeg', alt: 'Zeichen-und-Ausmalen-\u00dcbung', caption: 'Zeichen-und-Ausmalen-Aktivit\u00e4t' },
      { src: '/samples/english/draw and color/sample-3.jpeg', alt: 'Thematisches Zeichen-Arbeitsblatt', caption: 'Thematische Zeichenanregungen' },
      { src: '/samples/english/draw and color/sample-4.jpeg', alt: 'Kreative Zeichenseite', caption: 'Kreative Zeichen\u00fcbung' },
    ],
    youtubeId: '1uZubAOGIkM',
    videoTitle: 'Zeichen-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Zeichen-Arbeitsbl\u00e4tter erstellen, die Kreativit\u00e4t f\u00f6rdern',
    description: 'Wenn Sie Zeichen-Arbeitsbl\u00e4tter mit strukturierten Anregungen und ansprechenden Themen erstellen, bieten Sie Kindern gef\u00fchrte kreative Erfahrungen, die Selbstvertrauen und F\u00e4higkeiten aufbauen. Zeichenaktivit\u00e4ten entwickeln Feinmotorik, r\u00e4umliches Vorstellungsverm\u00f6gen und visuellen Ausdruck \u2014 F\u00e4higkeiten, die das akademische Lernen in allen F\u00e4chern unterst\u00fctzen. Unser Zeichen-und-Ausmalen-Generator l\u00e4sst Sie aus \u00fcber 100 visuellen Themen w\u00e4hlen, gef\u00fchrte Zeichenanregungen konfigurieren und professionelle druckfertige PDFs erstellen. Lehrkr\u00e4fte nutzen Zeichen-Arbeitsbl\u00e4tter f\u00fcr Kunststationen, Zusatzaufgaben und f\u00e4cher\u00fcbergreifende Projekte. Eltern sch\u00e4tzen sie als bildschirmfreie kreative Besch\u00e4ftigung. Printable-Verk\u00e4ufer verpacken thematische Zeichensets, die kunstbegeisterte Familien ansprechen.',
  },

  introduction: 'Zeichnen ist eine kraftvolle Form des Ausdrucks und Lernens f\u00fcr junge Kinder. Bevor sie W\u00f6rter schreiben k\u00f6nnen, kommunizieren Kinder durch Bilder. Strukturierte Zeichenaktivit\u00e4ten bauen auf dieser nat\u00fcrlichen Neigung auf, indem sie Anleitung bieten, die Kindern hilft, ihre F\u00e4higkeiten zu verbessern und dabei kreative Freiheit zu bewahren. Das Zeichen-und-Ausmalen-Format ist besonders wirkungsvoll, weil es gef\u00fchrte Anleitung mit offenem kreativem Gestalten kombiniert. Eine angeleitete Zeichenanregung zeigt Kindern Schritt f\u00fcr Schritt, wie sie ein bestimmtes Motiv zeichnen, und baut Technik und Selbstvertrauen auf. Die Ausmalkomponente erg\u00e4nzt die kreative Wahlfreiheit \u2014 Kinder entscheiden, welche Farben sie verwenden, und entwickeln dabei Farbgef\u00fchl und pers\u00f6nlichen k\u00fcnstlerischen Stil. Unser Generator vereinfacht den Erstellungsprozess. Sie w\u00e4hlen ein Thema, konfigurieren den Zeichenanregungsstil und erstellen professionelle Arbeitsbl\u00e4tter, die druckfertig oder digital verkaufsbereit sind. Im Printable-Markt nehmen Zeichen- und Kunst-Arbeitsbl\u00e4tter eine besondere Position ein. Sie sprechen ein breiteres Publikum an als rein akademische Arbeitsbl\u00e4tter, weil Eltern und Lehrkr\u00e4fte sie als Bereicherung statt als Hausaufgabe sehen.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Zeichen-Arbeitsblatt',
    steps: [
      { title: 'Zeichenstil w\u00e4hlen', description: 'W\u00e4hlen Sie zwischen angeleitetem Zeichnen (Schritt-f\u00fcr-Schritt-Anleitungen), freien Zeichenanregungen (thematisch offen) oder Zeichen-und-Ausmalen (Teilbild zum Vervollst\u00e4ndigen). Jeder Stil eignet sich f\u00fcr unterschiedliche Altersstufen und Zwecke.' },
      { title: 'Zeichen-und-Ausmalen-Generator \u00f6ffnen', description: 'Rufen Sie das Zeichen-Arbeitsblatt-Tool \u00fcber Ihren Browser auf. St\u00f6bern Sie in den verf\u00fcgbaren Stilen und Themen. Keine k\u00fcnstlerischen F\u00e4higkeiten oder Design-Software n\u00f6tig.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema aus der Bildbibliothek. Tiere, Fahrzeuge und Fantasiewesen sind beliebte Zeichenmotive. Das Thema bestimmt die Zeichenanregungen und dekorativen Elemente.' },
      { title: 'Anregung konfigurieren', description: 'Legen Sie Stil und Schwierigkeitsgrad der Zeichenanregung fest. Einfache Anregungen f\u00fcr Vorschulkinder. Detailliertere Anregungen mit mehreren Schritten f\u00fcr \u00e4ltere Kinder.' },
      { title: 'Ausmalelemente hinzuf\u00fcgen', description: 'F\u00fcgen Sie vorgezeichnete Elemente hinzu, die Kinder neben ihren Zeichnungen ausmalen k\u00f6nnen. Diese Kombination bietet strukturierte und kreative Aktivit\u00e4ten auf einer Seite.' },
      { title: 'Layout festlegen', description: 'Konfigurieren Sie Zeichenfl\u00e4chengr\u00f6\u00dfe, Rahmenstil und Anweisungsplatzierung. Gro\u00dfe Zeichenfl\u00e4chen f\u00fcr j\u00fcngere Kinder. Kleinere Fl\u00e4chen mit detaillierteren Anweisungen f\u00fcr \u00e4ltere Sch\u00fcler.' },
      { title: 'Arbeitsblatt-Vorschau', description: '\u00dcberpr\u00fcfen Sie Layout, Anweisungen und visuelle Elemente. Stellen Sie sicher, dass die Zeichenfl\u00e4che ausreichend ist und die Anregungen klar sind.' },
      { title: 'PDF herunterladen', description: 'Erstellen Sie das hochaufl\u00f6sende PDF zum Drucken oder Hochladen auf Marktpl\u00e4tze. Die Ausgabe beh\u00e4lt klare Linien und Text in jeder Druckgr\u00f6\u00dfe.' },
      { title: 'Thematische Sammlung erstellen', description: 'Erstellen Sie 15\\u201325 Zeichen-Arbeitsbl\u00e4tter rund um ein Thema. Ein \\u201eTiere zeichnen lernen\\u201c- oder \\u201eSaisonale Kunstprojekte\\u201c-Set bietet hervorragenden Mehrwert und Vielfalt.' },
      { title: 'Verpacken und verkaufen', description: 'Listen Sie Ihre Zeichen-Arbeitsbl\u00e4tter auf Etsy, TPT oder Amazon KDP. Kunstfokussierte Produkte sprechen ein breites Publikum \u00fcber Lehrkr\u00e4fte und Eltern von Schulkindern hinaus an.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Zeichen-Arbeitsbl\u00e4tter auf Etsy', description: 'Kunst-Aktivit\u00e4ten-Printables haben auf Etsy starke Anziehungskraft. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 Seiten und setzen Sie den Preis bei $4\\u2013$6 an. Verwenden Sie Mockups, die fertige Arbeitsbl\u00e4tter mit bunten Zeichnungen zeigen. Keywords wie \\u201eZeichen\u00fcbungen f\u00fcr Kinder\\u201c und \\u201eKunst-Arbeitsbl\u00e4tter druckbar\\u201c funktionieren gut.' },
    { platform: 'Teachers Pay Teachers', title: 'Kunst-Aktivit\u00e4ten auf TPT', description: 'Lehrkr\u00e4fte suchen nach Kunststationen-Aktivit\u00e4ten, Vertretungspl\u00e4nen und Zusatzaufgaben. Zeichen-Arbeitsbl\u00e4tter erf\u00fcllen alle drei Bed\u00fcrfnisse. Bieten Sie angeleitete und offene Optionen an. Saisonale Kunstpakete zu Feiertagen generieren konstante Verk\u00e4ufe.' },
    { platform: 'Amazon KDP', title: 'Zeichen-Aktivit\u00e4tenb\u00fccher auf KDP', description: 'Stellen Sie 50\\u201380 Zeichen- und Ausmalseiten zu einem Buch zusammen. Zielen Sie auf \\u201eZeichnen lernen Buch f\u00fcr Kinder\\u201c und \\u201eZeichen-Aktivit\u00e4tenbuch\\u201c. F\u00fcgen Sie Schritt-f\u00fcr-Schritt-Zeichenanleitungen neben freien Zeichenseiten f\u00fcr Abwechslung ein.' },
  ],

  monetization: [
    { title: 'Zeichnen-Lernen-Serie', description: 'Erstellen Sie eine Buchserie, die Kindern das Zeichnen bestimmter Motive beibringt: Tiere, Fahrzeuge, Menschen, Natur. Serienprodukte f\u00f6rdern Wiederholungsk\u00e4ufe, wenn Kinder jeden Band meistern.' },
    { title: 'Saisonale Kunstpakete', description: 'Ver\u00f6ffentlichen Sie thematische Zeichenpakete f\u00fcr Feiertage und Jahreszeiten. Fr\u00fchlingsblumen, Sommerszenen am Strand, Herbstbl\u00e4tter und Winterlandschaften ergeben ansprechende Kunst\u00fcbungen mit nat\u00fcrlichen Verkaufszyklen.' },
    { title: 'F\u00e4cher\u00fcbergreifende Kunst-B\u00fcndel', description: 'Kombinieren Sie Zeichnen mit akademischen Inhalten: Zeichnen und Beschriften von Naturdiagrammen, Geschichtsszenen illustrieren oder Literaturszenen darstellen. F\u00e4cher\u00fcbergreifende Produkte erzielen Premium-Preise auf TPT.' },
  ],

  examples: 'Zeichen-Arbeitsbl\u00e4tter dienen kreativen und p\u00e4dagogischen Zwecken in vielen Umgebungen. Eine Kindergartenlehrerin nutzt angeleitete Zeichen-Arbeitsbl\u00e4tter als Freitags-Kunstzeit-Aktivit\u00e4t. Jede Woche folgt die Klasse Schritt-f\u00fcr-Schritt-Anweisungen, um ein anderes Tier zu zeichnen. Der strukturierte Ansatz baut Zeichenvertrauen bei Kindern auf, die sagen, sie \\u201ek\u00f6nnen nicht zeichnen\\u201c. Ein Kunstf\u00f6rderungsprogramm nutzt thematische Zeichen-Arbeitsbl\u00e4tter, um grundlegende Konzepte wie Proportion, Symmetrie und Schattierung zu vermitteln. Eine Etsy-Verk\u00e4uferin verpackt Zeichen-Arbeitsbl\u00e4tter in \\u201eRuhige-Zeit-Aktivit\u00e4tspakete\\u201c zusammen mit Ausmalseiten und Labyrinthen. Eltern kaufen sie f\u00fcr bildschirmfreie Unterhaltung an Wochenenden und in den Ferien. Eine Mutter im Heimunterricht integriert Zeichen-Arbeitsbl\u00e4tter in verschiedene F\u00e4cher. In Naturkunde zeichnen und beschriften Kinder Tierlebensr\u00e4ume. Im Deutschunterricht illustrieren sie Vokabelw\u00f6rter. Der f\u00e4cher\u00fcbergreifende Ansatz macht Zeichnen zu einem Lernwerkzeug.',

  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Zeichen-Arbeitsbl\u00e4tter geeignet?', answer: 'Zeichen-Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von 3 bis 10 Jahren. Vorschulkinder nutzen einfache Anregungen mit gro\u00dfen Zeichenfl\u00e4chen. Grundsch\u00fcler bew\u00e4ltigen detaillierteres angeleitetes Zeichnen mit Schritt-f\u00fcr-Schritt-Anleitungen.' },
    { question: 'Ben\u00f6tigen Kinder Zeichenf\u00e4higkeiten?', answer: 'Nein. Die Arbeitsbl\u00e4tter sind darauf ausgelegt, Zeichenf\u00e4higkeiten durch angeleitete \u00dcbung aufzubauen. Schritt-f\u00fcr-Schritt-Anregungen zeigen Kindern genau, wie sie jedes Element zeichnen, und bauen schrittweise Selbstvertrauen auf.' },
    { question: 'Kann ich Zeichnen mit anderen Aktivit\u00e4ten kombinieren?', answer: 'Ja. Sie k\u00f6nnen Arbeitsbl\u00e4tter erstellen, die Zeichnen mit Ausmalen, Schreiben oder Beschriften kombinieren. Multi-Aktivit\u00e4ts-Formate sind bei Lehrkr\u00e4ften beliebt, weil sie mehrere Lernziele bedienen.' },
    { question: 'Wie viele Themen sind verf\u00fcgbar?', answer: 'Der Generator enth\u00e4lt \u00fcber 100 Themen, die Tiere, Fahrzeuge, Lebensmittel, Natur, Feiertage und mehr abdecken. Jedes Thema bietet verschiedene Zeichenmotive und dekorative Elemente.' },
${commonFaqCommercial}
${commonFaqPricing}
${commonFaqRefund}
  ],

  internalLinks: [
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Zeichen-und-Ausmalen-Generator' },
    { slug: 'create-coloring-pages', pageType: 'guide', anchorText: 'Ausmalseiten erstellen' },
    { slug: 'create-handwriting-sheets', pageType: 'guide', anchorText: 'Schreib\u00fcbungsbl\u00e4tter erstellen' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

// === 4. create-sorting-worksheets.ts ===
w('create-sorting-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-sorting-worksheets',
  locale: 'de',

  seo: {
    titleTag: 'Sortier-Arbeitsbl\u00e4tter erstellen | Kostenlose Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Sortier-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Schritt-f\u00fcr-Schritt-Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Sortier-Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: ['Sortier\u00fcbungen Generator', 'Kategorisierung Arbeitsbl\u00e4tter', 'druckbare Sortier\u00fcbungen', 'Bilder sortieren Generator', 'Zuordnungs\u00fcbungen erstellen'],
    lsiKeywords: ['Kategorisierungsf\u00e4higkeiten', 'Klassifizierungs\u00fcbungen', 'Gruppieren und Sortieren', 'logisches Denken', 'Vorschule Sortieren', 'Ausschneiden und Kleben', 'Eigenschaftssortierung'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/picture sort/sample-1.jpeg',
      primaryAlt: 'Individuelles Sortier-Arbeitsblatt mit thematischen Kategorien',
      secondary: '/samples/english/picture sort/sample-2.jpeg',
      secondaryAlt: 'Bilder-Sortier-Aktivit\u00e4t f\u00fcr junge Lernende',
    },
    sampleGallery: [
      { src: '/samples/english/picture sort/sample-1.jpeg', alt: 'Kategorie-Sortier-Arbeitsblatt', caption: 'Nach Kategorie sortieren' },
      { src: '/samples/english/picture sort/sample-2.jpeg', alt: 'Bilder-Sortier-Aktivit\u00e4t', caption: 'Bilder-Sortier\u00fcbung' },
      { src: '/samples/english/picture sort/sample-3.jpeg', alt: 'Thematisches Sortier-Arbeitsblatt', caption: 'Thematische Sortier\u00fcbung' },
      { src: '/samples/english/picture sort/sample-4.jpeg', alt: 'Sortieren mit L\u00f6sung', caption: 'Sortier-Arbeitsblatt mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: 'Sortier-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Sortier-Arbeitsbl\u00e4tter erstellen, die logisches Denken f\u00f6rdern',
    description: 'Wenn Sie Sortier-Arbeitsbl\u00e4tter mit ansprechenden Themen und klaren Kategorien erstellen, helfen Sie Kindern, Klassifizierungsf\u00e4higkeiten zu entwickeln \u2014 ein Eckpfeiler des logischen Denkens. Sortier\u00fcbungen lehren Kinder, Eigenschaften zu erkennen, \u00e4hnliche Objekte zu gruppieren und zwischen Kategorien zu unterscheiden. Unser Sortier-Generator l\u00e4sst Sie Kategorien definieren, aus \u00fcber 100 visuellen Themen w\u00e4hlen und professionelle Arbeitsbl\u00e4tter mit L\u00f6sungsschl\u00fcsseln erstellen. Lehrkr\u00e4fte nutzen sie in Mathe- und Sachkunde-Stationen. Eltern sch\u00e4tzen sie f\u00fcr die kognitive Entwicklung. Printable-Verk\u00e4ufer verpacken thematische Sortier\u00fcbungen, die sich stetig auf Etsy und TPT verkaufen.',
  },

  introduction: 'Sortieren und Klassifizieren geh\u00f6ren zu den ersten logischen Operationen, die Kinder beherrschen, und die dabei aufgebauten F\u00e4higkeiten \u00fcbertragen sich auf praktisch jedes akademische Fach. Wenn ein Kind Tiere nach Lebensraum sortiert, \u00fcbt es das gleiche kategorische Denken, das in der naturwissenschaftlichen Taxonomie verwendet wird. Wenn es Formen nach Farbe und Gr\u00f6\u00dfe sortiert, legt es den Grundstein f\u00fcr mathematische Eigenschaften und Datenorganisation. Das Bilder-Sortier-Format ist besonders wirkungsvoll, weil es visuell und f\u00fcr Leseanf\u00e4nger zug\u00e4nglich ist. Kinder betrachten eine Sammlung von Bildern und sortieren sie in beschriftete Kategorien, indem sie Linien ziehen, ausschneiden und kleben oder Objekte einkreisen. Unser Generator erstellt Sortier-Arbeitsbl\u00e4tter mit anpassbaren Kategorien und Themen. Sie w\u00e4hlen die Kategorien, Bilder aus der Themenbibliothek, und das Tool ordnet alles in einem sauberen, druckbaren Format an. Der L\u00f6sungsschl\u00fcssel wird automatisch erstellt. Im Printable-Markt nehmen Sortier-Arbeitsbl\u00e4tter eine starke Nische innerhalb der Fr\u00fchf\u00f6rderungsmaterialien ein.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Sortier-Arbeitsblatt',
    steps: [
      { title: 'Kategorien definieren', description: 'W\u00e4hlen Sie 2\\u20134 Kategorien zum Sortieren. Zwei Kategorien f\u00fcr Vorschulkinder. Drei oder vier fordern Kindergartenkinder heraus. Kategorien k\u00f6nnen auf Typ (Tiere vs. Fahrzeuge), Eigenschaft (gro\u00df vs. klein) oder Funktion (Dinge die fliegen vs. Dinge die schwimmen) basieren.' },
      { title: 'Sortier-Generator \u00f6ffnen', description: 'Rufen Sie das Bilder-Sortier-Tool \u00fcber Ihren Browser auf. Geben Sie Ihre Kategorienamen ein und das Tool f\u00fchrt Sie durch Bildauswahl und Layout-Konfiguration.' },
      { title: 'Bilder f\u00fcr jede Kategorie w\u00e4hlen', description: 'W\u00e4hlen Sie 3\\u20135 Bilder pro Kategorie aus der Themenbibliothek. W\u00e4hlen Sie Objekte, die eindeutig zu einer Kategorie geh\u00f6ren.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das Ihre Kategorien erg\u00e4nzt. Tierlebensr\u00e4ume passen gut zu Naturthemen. Lebensmittelgruppen passen zu K\u00fcchen- oder Essensthemen.' },
      { title: 'Layout konfigurieren', description: 'W\u00e4hlen Sie zwischen Linien-Ziehen, Ausschneiden-und-Kleben oder Einkreisen. Ausschneiden-und-Kleben f\u00fcgt eine Feinmotorik-Komponente hinzu. Linien-Ziehen ist einfacher.' },
      { title: 'Anzahl der Objekte festlegen', description: 'Bestimmen Sie, wie viele Objekte insgesamt sortiert werden m\u00fcssen. Sechs bis zehn f\u00fcr Vorschulkinder. Zehn bis f\u00fcnfzehn f\u00fcr Kindergartenkinder.' },
      { title: 'Vorschau und Pr\u00fcfung', description: 'Pr\u00fcfen Sie, ob alle Objekte eindeutig zu ihren Kategorien geh\u00f6ren, die Bilder erkennbar und das Layout sauber ist. \u00dcberpr\u00fcfen Sie den L\u00f6sungsschl\u00fcssel.' },
      { title: 'PDF herunterladen', description: 'Erstellen Sie das hochaufl\u00f6sende PDF mit Arbeitsblatt und L\u00f6sungsschl\u00fcssel. F\u00fcr Ausschneiden-und-Kleben erstellt das Tool separate Ausschneideteile auf einer zus\u00e4tzlichen Seite.' },
      { title: 'Thematische Sammlung erstellen', description: 'Erstellen Sie 10\\u201320 Sortier-Arbeitsbl\u00e4tter mit verschiedenen Kategoriekombinationen. Ein \\u201eSachkunde-Sortierpaket\\u201c zu Lebensr\u00e4umen, Nahrungsketten und Aggregatzust\u00e4nden bietet umfassende \u00dcbung.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie Ihre Arbeitsbl\u00e4tter und listen Sie auf Etsy, TPT oder KDP. Heben Sie die behandelten Kategorien und das verwendete Sortierformat hervor.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Sortier-Arbeitsbl\u00e4tter auf Etsy', description: 'Eltern suchen nach \\u201eSortier\u00fcbungen Vorschule\\u201c und \\u201eKlassifizierungs-Arbeitsbl\u00e4tter\\u201c. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 Arbeitsbl\u00e4ttern. Preisgestaltung bei $4\\u2013$6. Ausschneiden-und-Kleben-Formate sind bei Etsy-K\u00e4ufern besonders beliebt.' },
    { platform: 'Teachers Pay Teachers', title: 'Sortier\u00fcbungen auf TPT', description: 'Lehrkr\u00e4fte wollen Sortier-Arbeitsbl\u00e4tter, die an Sachkunde- und Mathestandards ausgerichtet sind. Erstellen Sie kategoriespezifische Sets f\u00fcr Lebewesen vs. unbelebte Dinge, Vokale vs. Konsonanten oder gerade vs. ungerade.' },
    { platform: 'Amazon KDP', title: 'Sortier-\u00dcbungsb\u00fccher auf KDP', description: 'F\u00fcgen Sie Sortierseiten in ein umfassenderes Fr\u00fchf\u00f6rderungs-Arbeitsheft ein. Stellen Sie 60\\u201380 Seiten mit Sortieren, Zuordnen, Z\u00e4hlen und Mustern zusammen.' },
  ],

  monetization: [
    { title: 'Sachkunde-Sortier-Sets', description: 'Erstellen Sie Sortier-Arbeitsbl\u00e4tter zu naturwissenschaftlichen Themen: Tierlebensr\u00e4ume, Lebensmittelgruppen, Wetterarten, Pflanzenteile. Sachkunde-Sortieren ist lehrplangerecht und hat hohe Nachfrage auf TPT.' },
    { title: 'Multi-Eigenschafts-Sortierung', description: 'Entwerfen Sie Arbeitsbl\u00e4tter, bei denen Objekte nach verschiedenen Eigenschaften sortiert werden k\u00f6nnen (Farbe, Gr\u00f6\u00dfe, Form, Funktion). Diese \u00dcbungen f\u00fcr h\u00f6heres Denken erzielen Premium-Preise.' },
    { title: 'Saisonale Sortier-B\u00fcndel', description: 'Ver\u00f6ffentlichen Sie thematische Sortierpakete vor Feiertagen und Jahreszeiten. Herbsternte-Sortieren, Winter-Feiertags-Sortieren und Fr\u00fchlingsgartem-Sortieren treiben saisonale Verk\u00e4ufe an.' },
  ],

  examples: 'Sortier-Arbeitsbl\u00e4tter entwickeln kritisches Denken auf ansprechende Weise in verschiedenen p\u00e4dagogischen Umgebungen. Eine Vorschullehrerin nutzt t\u00e4gliche Sortier-Arbeitsbl\u00e4tter als Morgenkreis-Aktivit\u00e4t. Heute sortiert die Klasse Tiere in \\u201eBauernhof\\u201c und \\u201eZoo\\u201c-Kategorien. Morgen werden sie Lebensmittel in \\u201eObst\\u201c und \\u201eGem\u00fcse\\u201c sortieren. Eine Kindergartenlehrerin nutzt Sortier-Arbeitsbl\u00e4tter als Mathe-Stationen-Aktivit\u00e4t, die an Daten- und Klassifizierungsstandards ausgerichtet ist. Eine Etsy-Verk\u00e4uferin hat sich auf Ausschneiden-und-Kleben-Sortier-Arbeitsbl\u00e4tter f\u00fcr Vorschulkinder spezialisiert. Das haptische Format ist ihr Alleinstellungsmerkmal. Eltern lieben den praktischen Aspekt, und die Produkte erhalten durchg\u00e4ngig F\u00fcnf-Sterne-Bewertungen. Ihre Sortier-B\u00fcndel generieren \u00fcber $350 pro Monat. Eine Logop\u00e4din nutzt Bilder-Sortieren zum Aufbau von Wortschatzkategorien. Klienten sortieren Bilder in semantische Gruppen (Dinge zum Anziehen, zum Essen, zum Fahren), was das Wortfinden und verbale Denken st\u00e4rkt.',

  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Sortier-Arbeitsbl\u00e4tter geeignet?', answer: 'Sortier-Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von 2 bis 7 Jahren. Kleinkinder sortieren in zwei grundlegende Kategorien. Vorschulkinder bew\u00e4ltigen drei Kategorien. Kindergarten- und Erstklassenkinder schaffen vier Kategorien mit subtileren Unterscheidungen.' },
    { question: 'Welche Sortierformate sind verf\u00fcgbar?', answer: 'Der Generator unterst\u00fctzt Linien-Ziehen, Ausschneiden-und-Kleben und Einkreisen. Ausschneiden-und-Kleben f\u00fcgt eine Feinmotorik-Komponente hinzu und ist am beliebtesten. Linien-Ziehen ist am schnellsten zu bearbeiten.' },
    { question: 'Kann ich eigene Kategorien definieren?', answer: 'Ja. Sie benennen die Kategorien und w\u00e4hlen die Bilder, die in jede geh\u00f6ren. Das gibt Ihnen volle Kontrolle \u00fcber den p\u00e4dagogischen Inhalt und den Schwierigkeitsgrad.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes Arbeitsblatt enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel, der die korrekte Sortierung zeigt. Der L\u00f6sungsschl\u00fcssel befindet sich auf einer separaten Seite.' },
${commonFaqCommercial}
${commonFaqPricing}
${commonFaqRefund}
  ],

  internalLinks: [
    { slug: 'picture-sort', pageType: 'app', anchorText: 'Sortier-Arbeitsblatt Generator' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-odd-one-out-puzzles', pageType: 'guide', anchorText: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen' },
    { slug: 'create-size-comparison-worksheets', pageType: 'guide', anchorText: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

// === 5. create-shadow-matching-worksheets.ts ===
w('create-shadow-matching-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-shadow-matching-worksheets',
  locale: 'de',

  seo: {
    titleTag: 'Schattenbilder-Zuordnung Arbeitsbl\u00e4tter erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Schattenbilder Zuordnung Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: ['Schatten zuordnen Generator', 'Silhouetten-Zuordnung', 'druckbare Schatten\u00fcbungen', 'Schattenbilder-R\u00e4tsel erstellen', 'Schatten-Match Generator'],
    lsiKeywords: ['visuelle Unterscheidung', 'Formerkennung', 'Silhouetten zuordnen', 'Umriss-Zuordnung', 'visuelle Wahrnehmung', 'Vorschule visuelle \u00dcbungen', 'kognitive Entwicklung', 'Beobachtungs\u00fcbungen'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/shadow match/sample-1.jpeg',
      primaryAlt: 'Individuelles Schattenbilder-Zuordnungs-Arbeitsblatt mit thematischen Bildern',
      secondary: '/samples/english/shadow match/sample-2.jpeg',
      secondaryAlt: 'Silhouetten-Zuordnungs-Aktivit\u00e4t f\u00fcr Kinder',
    },
    sampleGallery: [
      { src: '/samples/english/shadow match/sample-1.jpeg', alt: 'Tier-Schatten-Zuordnung', caption: 'Ordne Tiere ihren Schatten zu' },
      { src: '/samples/english/shadow match/sample-2.jpeg', alt: 'Thematische Schatten-Zuordnung', caption: 'Thematische Silhouetten-Zuordnung' },
      { src: '/samples/english/shadow match/sample-3.jpeg', alt: 'Fahrzeug-Schatten-Zuordnung', caption: 'Fahrzeug-Schatten-Zuordnung' },
      { src: '/samples/english/shadow match/sample-4.jpeg', alt: 'Schatten-Zuordnung mit L\u00f6sung', caption: 'R\u00e4tsel mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter f\u00fcr visuelle F\u00e4higkeiten erstellen',
    description: 'Wenn Sie Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter erstellen, geben Sie Kindern eine fokussierte M\u00f6glichkeit, visuelle Unterscheidung zu entwickeln \u2014 die F\u00e4higkeit, Unterschiede und \u00c4hnlichkeiten in Formen zu erkennen. Schatten-Zuordnung fordert Kinder auf, farbige Bilder mit ihren Silhouetten zu verbinden und trainiert die gleichen visuellen Analysef\u00e4higkeiten, die f\u00fcr Buchstabenerkennung, Lesen und r\u00e4umliches Denken ben\u00f6tigt werden. Unser Schatten-Zuordnungs-Generator erstellt Arbeitsbl\u00e4tter mit thematischen Bildern und ihren entsprechenden Silhouetten. Sie w\u00e4hlen aus \u00fcber 100 visuellen Themen und konfigurieren die Schwierigkeit. Lehrkr\u00e4fte nutzen diese f\u00fcr visuelle Wahrnehmungs-Stationen. Eltern sch\u00e4tzen sie zur Vorschulvorbereitung. Printable-Verk\u00e4ufer verpacken thematische Schatten-Sets, die sich gut auf Etsy und TPT verkaufen.',
  },

  introduction: 'Visuelle Unterscheidung ist eine entscheidende Lesevorbereitung, die viele Eltern und Lehrkr\u00e4fte untersch\u00e4tzen. Bevor Kinder \u00e4hnliche Buchstaben wie b und d oder p und q unterscheiden k\u00f6nnen, brauchen sie umfangreiche \u00dcbung im Erkennen feiner Unterschiede in Formen. Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter bieten genau diese \u00dcbung in einem ansprechenden, zug\u00e4nglichen Format. Die Aufgabe ist intuitiv: Kinder betrachten ein farbiges Bild, untersuchen mehrere Silhouetten und identifizieren, welcher Schatten zum Original passt. Dieser Prozess erfordert sorgf\u00e4ltige Beobachtung von Umrissen, Proportionen und besonderen Merkmalen. Unser Generator automatisiert den gesamten Erstellungsprozess. Sie w\u00e4hlen ein Thema, die Anzahl der Bilder pro Arbeitsblatt, und das Tool generiert die farbigen Bilder neben ihren Silhouetten in einem sauberen, druckbaren Layout. Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter sind visuell auff\u00e4llig, was sie attraktiv in Listing-Fotos macht. Sie dienen einem klaren p\u00e4dagogischen Zweck und sind f\u00fcr sehr junge Kinder geeignet.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Schattenbilder-Zuordnungs-Arbeitsblatt',
    steps: [
      { title: 'Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema mit klar unterscheidbaren Silhouetten. Tiere funktionieren hervorragend, da jede Art einen einzigartigen Umriss hat. Fahrzeuge und Alltagsgegenst\u00e4nde sind ebenfalls gute Optionen.' },
      { title: 'Schatten-Zuordnungs-Generator \u00f6ffnen', description: 'Rufen Sie das Schatten-Match-Tool \u00fcber Ihren Browser auf. W\u00e4hlen Sie Ihr Thema und die Oberfl\u00e4che zeigt verf\u00fcgbare Bilder mit Silhouetten-Vorschau. Kein Download n\u00f6tig.' },
      { title: 'Bilder ausw\u00e4hlen', description: 'W\u00e4hlen Sie 4\\u20138 Bilder pro Arbeitsblatt. F\u00fcr junge Kinder verwenden Sie Bilder mit sehr unterschiedlichen Formen. F\u00fcr \u00e4ltere Kinder w\u00e4hlen Sie Bilder mit \u00e4hnlicheren Silhouetten f\u00fcr mehr Herausforderung.' },
      { title: 'Layout konfigurieren', description: 'Legen Sie die Anordnung fest: Farbige Bilder links, durchmischte Silhouetten rechts. Passen Sie den Abstand an, damit Kinder Platz zum Linienziehen zwischen den Zuordnungen haben.' },
      { title: 'Schwierigkeitsgrad anpassen', description: 'Einfache Arbeitsbl\u00e4tter verwenden Bilder mit offensichtlich verschiedenen Formen. Schwierige Arbeitsbl\u00e4tter enthalten Bilder mit \u00e4hnlichen Umrissen, die sorgf\u00e4ltigere Beobachtung erfordern.' },
      { title: 'Arbeitsblatt-Vorschau', description: 'Pr\u00fcfen Sie, ob Silhouetten korrekt sind, Bilder klar und der Schwierigkeitsgrad angemessen ist. Stellen Sie sicher, dass jede Silhouette bei sorgf\u00e4ltiger Betrachtung unterscheidbar ist.' },
      { title: 'Mit L\u00f6sungsschl\u00fcssel herunterladen', description: 'Erstellen Sie das PDF mit Arbeitsblatt und L\u00f6sungsschl\u00fcssel auf separaten Seiten. Die hochaufl\u00f6sende Ausgabe erzeugt klare, scharfe Silhouetten.' },
      { title: 'Thematisches Set erstellen', description: 'Erstellen Sie 10\\u201320 Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter mit verschiedenen Bildern zum selben Thema. Vielfalt h\u00e4lt Kinder \u00fcber das Set hinweg engagiert.' },
      { title: 'Multi-Themen-B\u00fcndel erstellen', description: 'Kombinieren Sie Sets aus verschiedenen Themen zu gr\u00f6\u00dferen B\u00fcndeln. Ein \\u201eTier-Schatten-B\u00fcndel\\u201c mit Bauernhof-, Zoo-, Ozean- und Waldsets bietet umfassende \u00dcbung.' },
      { title: 'Zum Verkauf listen', description: 'Verpacken und listen Sie auf Etsy, TPT oder KDP. Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter fotografieren sich gut f\u00fcr Listings, weil der visuelle Kontrast zwischen farbigen Bildern und Silhouetten ins Auge f\u00e4llt.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Schatten-Zuordnung auf Etsy', description: 'Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter sind visuell unverwechselbar in Etsy-Suchergebnissen. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 Arbeitsbl\u00e4ttern. Preisgestaltung bei $4\\u2013$6. Der starke visuelle Kontrast in Mockup-Bildern zieht Klicks an.' },
    { platform: 'Teachers Pay Teachers', title: 'Visuelle Wahrnehmung auf TPT', description: 'Positionieren Sie Schatten-Zuordnung als visuelle Unterscheidungs\u00fcbung, eine wichtige Lesevorbereitung. Sonderschullehrer und Ergotherapeuten sind starke K\u00e4ufer in dieser Kategorie.' },
    { platform: 'Amazon KDP', title: 'Schattenbilder-Zuordnungsb\u00fccher auf KDP', description: 'Stellen Sie 50\\u201370 Schattenbilder-Zuordnungsseiten zu einem thematischen Aktivit\u00e4tenbuch zusammen. Zielen Sie auf \\u201eSchatten-Zuordnung Buch f\u00fcr Kleinkinder\\u201c und \\u201eVisuelle Wahrnehmungs\u00fcbungen\\u201c.' },
  ],

  monetization: [
    { title: 'Visuelle Wahrnehmungspakete', description: 'Kombinieren Sie Schatten-Zuordnung mit anderen visuellen Unterscheidungs\u00fcbungen: Unterschiede finden, Spiegelbilder und Zuordnung. Mehrf\u00e4higkeiten-Pakete sprechen Therapeuten und Sonderschullehrer an.' },
    { title: 'Progressive Schwierigkeits-Sets', description: 'Erstellen Sie Sets, die von offensichtlichen Silhouetten zu sehr \u00e4hnlichen fortschreiten. Die eingebaute Progression macht das Produkt f\u00fcr l\u00e4ngere Nutzung geeignet.' },
    { title: 'Thematische B\u00fcndel-Serie', description: 'Ver\u00f6ffentlichen Sie regelm\u00e4\u00dfig thematische Schatten-Sets: Meerestiere, Dinosaurier, Fahrzeuge, Lebensmittel. Der Serienaufbau f\u00f6rdert Wiederholungsk\u00e4ufe.' },
  ],

  examples: 'Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter entwickeln visuelle F\u00e4higkeiten, die das Lernen in mehreren Bereichen unterst\u00fctzen. Eine Vorschullehrerin nutzt Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter als Aufw\u00e4rm\u00fcbung f\u00fcr Buchstabenerkennungsstunden. Bevor sie \u00e4hnliche Buchstaben zeigt, l\u00e4sst sie Sch\u00fcler \u00e4hnliche Silhouetten unterscheiden. Diese visuelle Unterscheidungs-Aufw\u00e4rm\u00fcbung verbessert die Buchstabenerkennungsgenauigkeit sp\u00fcrbar. Eine Ergotherapeutin bindet Schatten-Zuordnung in visuelle Wahrnehmungs-Therapieprogramme ein. Die Arbeitsbl\u00e4tter bieten strukturierte \u00dcbung f\u00fcr Kinder mit visuellen Verarbeitungsschwierigkeiten. Eine Etsy-Verk\u00e4uferin fand starke Nachfrage in der F\u00f6rderbedarfs-Gemeinschaft. Eltern von Kindern mit Entwicklungsverz\u00f6gerungen suchen aktiv nach visuellen Wahrnehmungsaktivit\u00e4ten, die von Therapeuten empfohlen werden. Eine Mutter im Heimunterricht nutzt Schatten-Zuordnung als ruhige Morgenaktivit\u00e4t. Ihre Dreij\u00e4hrige arbeitet selbstst\u00e4ndig, zieht Linien zwischen Bildern und Schatten und baut dabei Konzentration und visuelle F\u00e4higkeiten auf.',

  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Schattenbilder-Zuordnungs-Arbeitsbl\u00e4tter geeignet?', answer: 'Schatten-Zuordnung eignet sich f\u00fcr Kinder von 2 bis 6 Jahren. Kleinkinder ordnen offensichtlich verschiedene Silhouetten zu. Vorschulkinder bew\u00e4ltigen \u00e4hnlichere Formen. Kindergartenkinder l\u00f6sen subtile Unterschiede, die genaue Beobachtung erfordern.' },
    { question: 'Wie funktioniert die Schwierigkeit?', answer: 'Die Schwierigkeit wird durch die \u00c4hnlichkeit der Silhouetten gesteuert. Einfache Arbeitsbl\u00e4tter verwenden Bilder mit sehr unterschiedlichen Umrissen. Schwierige Arbeitsbl\u00e4tter enthalten Bilder mit \u00e4hnlichen Formen, die detailliertere visuelle Analyse erfordern.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes Arbeitsblatt enth\u00e4lt einen vollst\u00e4ndigen L\u00f6sungsschl\u00fcssel, der die korrekten Bild-zu-Silhouette-Zuordnungen zeigt. Der L\u00f6sungsschl\u00fcssel befindet sich auf einer separaten Seite.' },
    { question: 'Was macht Schatten-Zuordnung p\u00e4dagogisch wertvoll?', answer: 'Schatten-Zuordnung entwickelt visuelle Unterscheidung \u2014 die F\u00e4higkeit, Formenunterschiede zu erkennen. Diese F\u00e4higkeit ist eine Grundlage f\u00fcr Buchstabenerkennung, Lesebereitschaft und r\u00e4umliches Denken.' },
${commonFaqCommercial}
${commonFaqPricing}
${commonFaqRefund}
  ],

  internalLinks: [
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Schatten-Zuordnungs-Generator' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-odd-one-out-puzzles', pageType: 'guide', anchorText: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen' },
    { slug: 'create-missing-pieces-puzzles', pageType: 'guide', anchorText: 'Fehlende-Teile-R\u00e4tsel erstellen' },
  ],
};
`);

console.log('Files 3-5 done');
