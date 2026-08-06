const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');

function w(name, content) {
  fs.writeFileSync(path.join(d, name), content, 'utf8');
  console.log('Created: ' + name);
}

const cFaqCom = `    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell verkaufen?',
      answer: 'Mit einer Commercial-Lizenz k\u00f6nnen Sie auf Etsy, TPT, KDP und anderen Plattformen verkaufen. Die Full-Access-Lizenz umfasst alle 100+ Themen f\u00fcr vielf\u00e4ltige Produkterstellung.',
    },`;
const cFaqP = `    {
      question: 'Was kosten die Lizenzen?',
      answer: 'Einzelne App-Lizenzen kosten $27 f\u00fcr Commercial und $47 f\u00fcr Full Access. Wenn Sie mehrere Apps m\u00f6chten, sind B\u00fcndel f\u00fcr $79 (Commercial) und $119 (Full Access) erh\u00e4ltlich, die eine gesamte Werkzeugkategorie abdecken.',
    },`;
const cFaqR = `    {
      question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.',
    },`;

// === 6. create-odd-one-out-puzzles.ts ===
w('create-odd-one-out-puzzles.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-odd-one-out-puzzles',
  locale: 'de',

  seo: {
    titleTag: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Schritt-f\u00fcr-Schritt-Anleitung mit Verkaufstipps.',
    primaryKeyword: 'Was geh\u00f6rt nicht dazu R\u00e4tsel erstellen',
    secondaryKeywords: ['Was passt nicht Generator', 'Welches ist anders R\u00e4tsel', 'druckbare Denkaufgaben', 'Logik-R\u00e4tsel erstellen', 'Ausrei\u00dfer finden Generator'],
    lsiKeywords: ['kritisches Denken R\u00e4tsel', 'Kategorisierungsf\u00e4higkeiten', 'logisches Denken', 'visuelle Unterscheidung', 'Klassifizierungs\u00fcbungen', 'Denk-Arbeitsbl\u00e4tter', 'analytisches Denken'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/odd one out/sample-1.jpeg',
      primaryAlt: 'Individuelles Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel mit thematischen Illustrationen',
      secondary: '/samples/english/odd one out/sample-2.jpeg',
      secondaryAlt: 'Welches-ist-anders-Aktivit\u00e4t f\u00fcr Kinder',
    },
    sampleGallery: [
      { src: '/samples/english/odd one out/sample-1.jpeg', alt: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel', caption: 'Finde das, was nicht dazugeh\u00f6rt' },
      { src: '/samples/english/odd one out/sample-2.jpeg', alt: 'Thematisches Ausrei\u00dfer-R\u00e4tsel', caption: 'Thematische Ausrei\u00dfer-Aktivit\u00e4t' },
      { src: '/samples/english/odd one out/sample-3.jpeg', alt: 'Visuelles Ausrei\u00dfer-R\u00e4tsel', caption: 'Visuelle Unterscheidungsaufgabe' },
      { src: '/samples/english/odd one out/sample-4.jpeg', alt: 'Ausrei\u00dfer-R\u00e4tsel mit L\u00f6sung', caption: 'R\u00e4tsel mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen, die junge K\u00f6pfe herausfordern',
    description: 'Wenn Sie Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel mit durchdachten Kategorien und ansprechenden Themen erstellen, schaffen Sie eine der effektivsten \u00dcbungen f\u00fcr kritisches Denken bei jungen Lernenden. Diese R\u00e4tsel fordern Kinder auf, eine Gruppe von Objekten zu untersuchen und zu identifizieren, welches nicht dazugeh\u00f6rt \u2014 eine Aufgabe, die Kategorisierung, logisches Denken und sorgf\u00e4ltige Beobachtung erfordert. Unser Generator l\u00e4sst Sie Objekte aus \u00fcber 100 visuellen Themen ausw\u00e4hlen, die Gruppierungslogik definieren und professionelle Arbeitsbl\u00e4tter mit L\u00f6sungsschl\u00fcsseln erstellen. Lehrkr\u00e4fte nutzen sie als Einstiegsaufgaben und Denk-Herausforderungen. Printable-Verk\u00e4ufer stellen fest, dass diese R\u00e4tsel ein unverwechselbares Produkt sind, das sich von \u00fcblichen Arbeitsbl\u00e4ttern abhebt.',
  },

  introduction: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel entwickeln eine entscheidende kognitive F\u00e4higkeit: die F\u00e4higkeit, das definierende Merkmal einer Gruppe zu erkennen und festzustellen, wenn ein Element diese Regel verletzt. Dies ist Klassifizierung in umgekehrter Form \u2014 statt Objekte in Gruppen zu sortieren, m\u00fcssen Kinder die Gruppierungskriterien ableiten und die Ausnahme finden. Das R\u00e4tselformat l\u00e4sst sich hervorragend \u00fcber Schwierigkeitsgrade skalieren. Ein Vorschul-R\u00e4tsel k\u00f6nnte drei Katzen und einen Hund zeigen \u2014 die Gruppierung ist offensichtlich. Ein Kindergarten-R\u00e4tsel k\u00f6nnte vier Objekte zeigen, von denen drei Lebensmittel und eines ein Spielzeug ist \u2014 das erfordert kategorisches Denken. Unser Generator erstellt diese R\u00e4tsel schnell und professionell. Sie w\u00e4hlen die Objekte, definieren den Ausrei\u00dfer, w\u00e4hlen ein visuelles Thema und laden ein professionelles Arbeitsblatt mit Erkl\u00e4rung herunter. Im Printable-Markt f\u00fcllen Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel eine Nische, die wenige andere Produkte bedienen. W\u00e4hrend Additions-Arbeitsbl\u00e4tter und Ausmalseiten \u00fcberall sind, sind gut gestaltete Denkaufgaben rar. Diese Knappheit bedeutet weniger Wettbewerb und mehr Chancen f\u00fcr Verk\u00e4ufer.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel',
    steps: [
      { title: 'Gruppierungslogik definieren', description: 'Entscheiden Sie, was drei Objekte \u00e4hnlich macht und eines unterschiedlich. Die Gruppierung kann auf Kategorie (Tiere vs. Objekte), Eigenschaft (Farbe, Gr\u00f6\u00dfe, Form) oder Funktion basieren.' },
      { title: 'Was-geh\u00f6rt-nicht-dazu-Generator \u00f6ffnen', description: 'Rufen Sie das Tool \u00fcber Ihren Browser auf. Die Oberfl\u00e4che f\u00fchrt Sie durch Objektauswahl und Gruppierungslogik. Kein Download oder Designkenntnisse n\u00f6tig.' },
      { title: 'Objekte ausw\u00e4hlen', description: 'W\u00e4hlen Sie 4 Objekte f\u00fcr jede R\u00e4tselreihe: 3, die ein gemeinsames Merkmal teilen, und 1, das nicht passt. Verwenden Sie Bilder aus der Themenbibliothek.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das Ihren R\u00e4tselinhalt erg\u00e4nzt. Thematische R\u00e4tsel sind ansprechender und verkaufen sich besser als einfache.' },
      { title: 'Mehrere Reihen konfigurieren', description: 'F\u00fcgen Sie 4\\u20138 R\u00e4tselreihen pro Arbeitsblatt hinzu. Jede Reihe stellt eine andere Gruppierungsherausforderung dar. Variierende Schwierigkeit h\u00e4lt Sch\u00fcler engagiert.' },
      { title: 'Erkl\u00e4rungen schreiben', description: 'F\u00fcgen Sie im L\u00f6sungsschl\u00fcssel eine kurze Erkl\u00e4rung hinzu, warum jedes Objekt der Ausrei\u00dfer ist. Erkl\u00e4rungen machen den L\u00f6sungsschl\u00fcssel zu einem Lernwerkzeug.' },
      { title: 'Vorschau und Test', description: '\u00dcberpr\u00fcfen Sie jede Reihe, um sicherzustellen, dass die Gruppierungslogik klar ist und der Ausrei\u00dfer wirklich anders ist.' },
      { title: 'PDF herunterladen', description: 'Erstellen Sie das hochaufl\u00f6sende PDF mit R\u00e4tsel und erkl\u00e4rendem L\u00f6sungsschl\u00fcssel. Die Ausgabe ist bereit zum Drucken oder Hochladen auf Marktpl\u00e4tze.' },
      { title: 'Progressives Set erstellen', description: 'Erstellen Sie 10\\u201320 R\u00e4tsel mit steigender Schwierigkeit von offensichtlichen Gruppierungen zu subtilen Unterscheidungen.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie R\u00e4tsel zu thematischen Produkten. Heben Sie die F\u00e4higkeiten f\u00fcr kritisches Denken und logisches Schlie\u00dfen hervor. Positionieren Sie Ihr Produkt als F\u00f6rder- oder Begabtenressource f\u00fcr Premium-Preise.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Was-geh\u00f6rt-nicht-dazu auf Etsy', description: 'Positionieren Sie die R\u00e4tsel als \\u201eGehirntraining\\u201c oder \\u201eKritisches Denken\\u201c-Aktivit\u00e4ten. Eltern, die Bereicherung suchen, zahlen gerne Premium-Preise. Erstellen Sie B\u00fcndel mit 15\\u201320 R\u00e4tseln bei $4\\u2013$6.' },
    { platform: 'Teachers Pay Teachers', title: 'Denk-R\u00e4tsel auf TPT', description: 'Vermarkten Sie an Begabtenf\u00f6rderung, Bereicherung und Fr\u00fchp\u00e4dagogik. Lehrkr\u00e4fte brauchen Denk\u00fcbungen f\u00fcr fortgeschrittene Sch\u00fcler und Morgen-Aufw\u00e4rm\u00fcbungen.' },
    { platform: 'Amazon KDP', title: 'R\u00e4tselb\u00fccher auf KDP', description: 'Stellen Sie 60\\u201380 Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel zu einem Logik-R\u00e4tselbuch zusammen. Zielen Sie auf \\u201eKritisches Denken f\u00fcr Kinder\\u201c und \\u201eLogik-R\u00e4tsel Vorschule\\u201c.' },
  ],

  monetization: [
    { title: 'Kritisches-Denken-B\u00fcndel', description: 'Kombinieren Sie Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel mit anderen Denk\u00fcbungen: Mustererkennung, Sortieren und Reihenfolgen. Mehrf\u00e4higkeiten-B\u00fcndel sprechen Lehrkr\u00e4fte und Eltern an, die auf kognitive Entwicklung fokussiert sind.' },
    { title: 'Fachspezifische R\u00e4tsel', description: 'Erstellen Sie R\u00e4tsel mit akademischem Inhalt: Naturwissenschaftliche Kategorien, Wortschatzgruppen, Mathekonzepte. Fachintegration rechtfertigt Premium-Preise.' },
    { title: 'Begabtenf\u00f6rderungs-Ressourcen', description: 'Entwerfen Sie herausfordernde R\u00e4tsel f\u00fcr begabte Sch\u00fcler. Diese fortgeschrittenen Produkte bedienen einen Nischenmarkt, der bereit ist, mehr f\u00fcr hochwertige Bereicherungsmaterialien zu zahlen.' },
  ],

  examples: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel dienen als kraftvolle Denkwerkzeuge in verschiedenen p\u00e4dagogischen Umgebungen. Eine Kindergartenlehrerin nutzt die Arbeitsbl\u00e4tter als Morgen-Aufw\u00e4rm\u00fcbungen. Jeden Tag beginnt mit einem neuen Satz von vier R\u00e4tseln, und Sch\u00fcler besprechen ihre Denkweise mit Tischpartnern, bevor sie mit der Klasse teilen. Die Diskussionen zeigen verschiedene Denkstrategien und lehren Kinder, dass mehrere Perspektiven existieren k\u00f6nnen. Eine Begabtenf\u00f6rderungsspezialistin nutzt komplexe R\u00e4tsel, bei denen die Gruppierungslogik Fachwissen erfordert. \\u201eWas geh\u00f6rt nicht dazu: Wal, Delfin, Hai oder Seehund?\\u201c erfordert das Wissen, dass Haie Fische sind, w\u00e4hrend die anderen S\u00e4ugetiere sind. Eine Etsy-Verk\u00e4uferin hat eine \\u201eGehirntrainer\\u201c-Marke mit Denkr\u00e4tseln aufgebaut. Sie bepreist ihre B\u00fcndel mit 20 R\u00e4tseln bei $5,99 \u2014 h\u00f6her als typische Arbeitsbl\u00e4tter \u2014 weil Eltern, die Bereicherungsaktivit\u00e4ten suchen, Qualit\u00e4t \u00fcber den Preis stellen. Eine Mutter im Heimunterricht nutzt die R\u00e4tsel als Familien-Abendessen-Aktivit\u00e4t. Verschiedene Familienmitglieder w\u00e4hlen manchmal verschiedene \\u201eAusrei\u00dfer\\u201c mit gleich g\u00fcltiger Begr\u00fcndung, was reichhaltige Diskussionen \u00fcber Kategorisierung ausl\u00f6st.',

  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel geeignet?', answer: 'Die R\u00e4tsel eignen sich f\u00fcr Kinder von 3 bis 10 Jahren. Vorschulkinder identifizieren offensichtlich verschiedene Objekte. Kindergartenkinder nutzen kategorisches Denken. \u00c4ltere Kinder l\u00f6sen R\u00e4tsel, die Fachwissen erfordern.' },
    { question: 'K\u00f6nnen R\u00e4tsel mehrere g\u00fcltige Antworten haben?', answer: 'Jedes R\u00e4tsel ist mit einer beabsichtigten Antwort gestaltet, aber die besten R\u00e4tsel k\u00f6nnen Diskussionen \u00fcber alternative Gruppierungen ausl\u00f6sen. Der L\u00f6sungsschl\u00fcssel erkl\u00e4rt die beabsichtigte Begr\u00fcndung.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel mit Erkl\u00e4rungen enthalten?', answer: 'Ja. Jedes R\u00e4tsel enth\u00e4lt einen L\u00f6sungsschl\u00fcssel, der den Ausrei\u00dfer identifiziert und erkl\u00e4rt, warum er nicht dazugeh\u00f6rt. Erkl\u00e4rungen machen den L\u00f6sungsschl\u00fcssel zum Lernwerkzeug.' },
    { question: 'Wie viele R\u00e4tsel passen auf eine Seite?', answer: 'Typischerweise 4\\u20138 R\u00e4tselreihen pro Seite, jeweils mit 4 Objekten. Weniger Reihen mit gr\u00f6\u00dferen Bildern f\u00fcr j\u00fcngere Kinder. Mehr Reihen bieten mehr \u00dcbung pro Seite.' },
${cFaqCom}
${cFaqP}
${cFaqR}
  ],

  internalLinks: [
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Was-geh\u00f6rt-nicht-dazu Generator' },
    { slug: 'create-sorting-worksheets', pageType: 'guide', anchorText: 'Sortier-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-missing-pieces-puzzles', pageType: 'guide', anchorText: 'Fehlende-Teile-R\u00e4tsel erstellen' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

// === 7. create-missing-pieces-puzzles.ts ===
w('create-missing-pieces-puzzles.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-missing-pieces-puzzles',
  locale: 'de',

  seo: {
    titleTag: 'Fehlende-Teile-R\u00e4tsel erstellen | Kostenlose Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Fehlende-Teile-R\u00e4tsel f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Fehlende Teile R\u00e4tsel erstellen',
    secondaryKeywords: ['fehlendes Teil Generator', 'visuelle Puzzle erstellen', 'druckbare Erg\u00e4nzungsr\u00e4tsel', 'Vervollst\u00e4ndigungsr\u00e4tsel erstellen', 'Puzzleteile Arbeitsbl\u00e4tter'],
    lsiKeywords: ['visuelle Vervollst\u00e4ndigung', 'r\u00e4umliches Denken', 'Teil-Ganzes-Beziehungen', 'visueller Abschluss', 'Wahrnehmungsf\u00e4higkeiten', 'Figur-Grund-Wahrnehmung', 'kognitive R\u00e4tsel\u00fcbungen'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/missing pieces/sample-1.jpeg',
      primaryAlt: 'Individuelles Fehlende-Teile-R\u00e4tsel mit thematischen Bildern',
      secondary: '/samples/english/missing pieces/sample-2.jpeg',
      secondaryAlt: 'Finde-das-fehlende-Teil-Aktivit\u00e4t f\u00fcr Kinder',
    },
    sampleGallery: [
      { src: '/samples/english/missing pieces/sample-1.jpeg', alt: 'Fehlendes-Teil-R\u00e4tsel', caption: 'Finde das fehlende Teil' },
      { src: '/samples/english/missing pieces/sample-2.jpeg', alt: 'Thematische fehlende Teile', caption: 'Thematisches Vervollst\u00e4ndigungsr\u00e4tsel' },
      { src: '/samples/english/missing pieces/sample-3.jpeg', alt: 'Visuelles Abschluss-R\u00e4tsel', caption: 'Visuelle Abschluss-Aktivit\u00e4t' },
      { src: '/samples/english/missing pieces/sample-4.jpeg', alt: 'Fehlende Teile mit L\u00f6sung', caption: 'R\u00e4tsel mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Fehlende-Teile-R\u00e4tsel erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Fehlende-Teile-R\u00e4tsel f\u00fcr visuelles Denken erstellen',
    description: 'Wenn Sie Fehlende-Teile-R\u00e4tsel erstellen, f\u00f6rdern Sie bei Kindern visuellen Abschluss und r\u00e4umliches Denken \u2014 F\u00e4higkeiten, die Lesen, Mathematik und allt\u00e4gliches Probleml\u00f6sen unterst\u00fctzen. Diese R\u00e4tsel zeigen ein Bild mit einem entfernten Abschnitt und fordern Kinder auf, das richtige fehlende Teil aus mehreren Optionen zu identifizieren. Unser Generator erstellt thematische R\u00e4tsel mit Multiple-Choice-Optionen und L\u00f6sungsschl\u00fcsseln aus \u00fcber 100 visuellen Themen. Die Schwierigkeit skaliert nat\u00fcrlich von einfachen Formen zu komplexen Szenen. Lehrkr\u00e4fte nutzen sie f\u00fcr visuelle Wahrnehmungs-Stationen und Bereicherung. Printable-Verk\u00e4ufer stellen fest, dass Fehlende-Teile-R\u00e4tsel eine unverwechselbare Produktkategorie mit starker Nachfrage sind.',
  },

  introduction: 'Fehlende-Teile-R\u00e4tsel entwickeln visuellen Abschluss \u2014 die F\u00e4higkeit des Gehirns, ein ganzes Bild zu erkennen, auch wenn ein Teil verdeckt oder fehlend ist. Diese kognitive F\u00e4higkeit ist wesentlich f\u00fcr das Lesen (teilweise verdeckte Buchstaben erkennen), Mathematik (Teil-Ganzes-Beziehungen verstehen) und das Alltagsleben. Das R\u00e4tselformat ist unkompliziert: Ein Bild wird mit einem entfernten Abschnitt angezeigt, und Kinder m\u00fcssen das richtige Teil aus mehreren Optionen identifizieren. Dies erfordert die Analyse von Farben, Mustern und r\u00e4umlicher Anordnung des Bildes. Unser Generator automatisiert diesen Prozess vollst\u00e4ndig. Sie w\u00e4hlen ein Bild, und das Tool schneidet einen Abschnitt aus, erstellt plausible Distraktoren und generiert das komplette R\u00e4tsel mit L\u00f6sungsschl\u00fcssel. Im Printable-Markt fallen Fehlende-Teile-R\u00e4tsel auf, weil sie weniger verbreitet sind als typische Arbeitsbl\u00e4tter. Die R\u00e4tsel haben auch starke Anziehungskraft bei Ergotherapeuten und Sonderp\u00e4dagogen.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Fehlende-Teile-R\u00e4tsel',
    steps: [
      { title: 'Bild ausw\u00e4hlen', description: 'W\u00e4hlen Sie ein detailreiches Bild aus der Themenbibliothek. Bilder mit deutlichen Mustern, Farben und Elementen ergeben die besten R\u00e4tsel. Vermeiden Sie einfarbige oder einf\u00f6rmige Bilder.' },
      { title: 'Fehlende-Teile-Generator \u00f6ffnen', description: 'Rufen Sie das Tool \u00fcber Ihren Browser auf. Durchsuchen Sie Bilder und w\u00e4hlen Sie die aus, die Sie verwenden m\u00f6chten.' },
      { title: 'Ausschnittbereich w\u00e4hlen', description: 'W\u00e4hlen Sie, welcher Teil des Bildes entfernt wird. W\u00e4hlen Sie einen Abschnitt mit markanten Merkmalen, damit die richtige Antwort bestimmbar, aber nicht sofort offensichtlich ist.' },
      { title: 'Distraktoren konfigurieren', description: 'Legen Sie die Anzahl der falschen Optionen fest (typischerweise 3\\u20135). Mehr Optionen machen das R\u00e4tsel schwieriger. Der Generator erstellt plausible Distraktoren, die dem richtigen Teil \u00e4hneln.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das Ihr R\u00e4tsel erg\u00e4nzt. Der thematische Rahmen und die Dekorationen verleihen visuellen Reiz.' },
      { title: 'Schwierigkeit anpassen', description: 'Steuern Sie die Schwierigkeit durch die Komplexit\u00e4t des Quellbildes und die \u00c4hnlichkeit der Distraktoren. Einfache Bilder mit deutlichen Distraktoren f\u00fcr junge Kinder. Komplexe Bilder mit \u00e4hnlichen Distraktoren f\u00fcr \u00e4ltere Sch\u00fcler.' },
      { title: 'R\u00e4tsel-Vorschau', description: 'Pr\u00fcfen Sie, ob das richtige Teil identifizierbar ist, die Distraktoren plausibel aber eindeutig falsch sind und das Layout sauber ist.' },
      { title: 'Mit L\u00f6sungsschl\u00fcssel herunterladen', description: 'Erstellen Sie das PDF mit R\u00e4tsel und L\u00f6sungsschl\u00fcssel. Der L\u00f6sungsschl\u00fcssel hebt das richtige Teil hervor und zeigt es an seiner Position im Originalbild.' },
      { title: 'Thematisches Set erstellen', description: 'Erstellen Sie 10\\u201320 R\u00e4tsel mit progressiver Schwierigkeit. Beginnen Sie mit einfachen Bildern und offensichtlichen Unterschieden, steigern Sie dann zu komplexen Szenen.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie Ihre R\u00e4tsel und listen Sie auf Etsy, TPT oder KDP. Heben Sie die visuellen Denkf\u00e4higkeiten hervor. Vermarkten Sie sowohl an allgemeine Bildung als auch an Therapie-Zielgruppen.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Fehlende-Teile-R\u00e4tsel auf Etsy', description: 'Diese R\u00e4tsel sind unverwechselbar in Etsy-Suchergebnissen. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 R\u00e4tseln bei $4\\u2013$6. Das einzigartige Format weckt Neugier-Klicks.' },
    { platform: 'Teachers Pay Teachers', title: 'Visuelle Wahrnehmung auf TPT', description: 'Vermarkten Sie an Ergotherapeuten, Sonderp\u00e4dagogen und Fr\u00fchp\u00e4dagogen. Visuelle Abschluss-\u00dcbungen werden gezielt f\u00fcr Kinder mit visuellen Verarbeitungsbed\u00fcrfnissen verschrieben.' },
    { platform: 'Amazon KDP', title: 'R\u00e4tsel-Aktivit\u00e4tenb\u00fccher auf KDP', description: 'Stellen Sie Fehlende-Teile-R\u00e4tsel mit anderen visuellen Denk\u00fcbungen zu einem Gehirntraining-Buch zusammen. Die Nischenpositionierung reduziert den Wettbewerb.' },
  ],

  monetization: [
    { title: 'Visuelle Wahrnehmungs-Therapiepakete', description: 'Erstellen Sie Sets speziell f\u00fcr den therapeutischen Einsatz mit progressiver Schwierigkeit und Nachverfolgungsb\u00f6gen. Therapeuten sind ein zuverl\u00e4ssiger, hochwertiger Markt.' },
    { title: 'Gehirntraining-B\u00fcndel', description: 'Kombinieren Sie Fehlende Teile mit anderen visuellen Denkr\u00e4tseln: Schatten-Zuordnung, Was-geh\u00f6rt-nicht-dazu und Unterschiede finden.' },
    { title: 'Thematische R\u00e4tselsammlungen', description: 'Erstellen Sie R\u00e4tselsets rund um beliebte Themen f\u00fcr den allgemeinen Verbrauchermarkt. Tiere, Fahrzeuge und Feiertage ziehen Gelegenheitsk\u00e4ufer an.' },
  ],

  examples: 'Fehlende-Teile-R\u00e4tsel dienen sowohl p\u00e4dagogischen als auch therapeutischen Zwecken. Eine Ergotherapeutin nutzt Fehlende-Teile-R\u00e4tsel als zentrale visuelle Wahrnehmungs\u00fcbung. Sie beginnt mit einfachen R\u00e4tseln mit offensichtlichen Farbunterschieden und f\u00fchrt schrittweise komplexere Bilder mit subtilen Mustervariationen ein. Der progressive Schwierigkeitsansatz zeigt messbare Verbesserung der visuellen Abschlussf\u00e4higkeiten \u00fcber 6\\u20138 Sitzungen. Eine Vorschullehrerin entdeckte, dass Fehlende-Teile-R\u00e4tsel die Lieblingsdenk\u00fcbung ihrer Sch\u00fcler sind. Kinder versammeln sich w\u00e4hrend der Freiarbeit am R\u00e4tseltisch und diskutieren, welches Teil passt und warum. Eine Etsy-Verk\u00e4uferin positioniert ihre Fehlende-Teile-R\u00e4tsel als \\u201ebildschirmfreies Gehirntraining\\u201c f\u00fcr Kinder. Ihre thematischen B\u00fcndel verkaufen sich f\u00fcr $5,99 und generieren konstantes monatliches Einkommen. Eine Kindergartenlehrerin nutzt die R\u00e4tsel als informelle Bewertung visueller Verarbeitungsf\u00e4higkeiten.',

  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Fehlende-Teile-R\u00e4tsel geeignet?', answer: 'Fehlende-Teile-R\u00e4tsel eignen sich f\u00fcr Kinder von 3 bis 8 Jahren. Einfache R\u00e4tsel mit offensichtlichen Unterschieden f\u00fcr Vorschulkinder. Komplexe R\u00e4tsel mit subtilen Unterscheidungen fordern Kindergarten- bis Zweitklasskinder heraus.' },
    { question: 'Wie viele Antwortoptionen gibt es pro R\u00e4tsel?', answer: 'Jedes R\u00e4tsel zeigt typischerweise 4\\u20136 Teileoptionen einschlie\u00dflich der richtigen Antwort. Mehr Optionen erh\u00f6hen die Schwierigkeit. Der Generator erstellt plausible Distraktoren automatisch.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes R\u00e4tsel enth\u00e4lt einen L\u00f6sungsschl\u00fcssel, der das richtige Teil hervorgehoben und an seiner Position im Originalbild platziert zeigt.' },
    { question: 'Welche F\u00e4higkeiten entwickeln Fehlende-Teile-R\u00e4tsel?', answer: 'Sie entwickeln visuellen Abschluss, r\u00e4umliches Denken, Detailgenauigkeit und Teil-Ganzes-Verst\u00e4ndnis. Diese F\u00e4higkeiten unterst\u00fctzen Lesen, Mathematik und allt\u00e4gliche visuelle Verarbeitung.' },
${cFaqCom}
${cFaqP}
${cFaqR}
  ],

  internalLinks: [
    { slug: 'missing-pieces', pageType: 'app', anchorText: 'Fehlende-Teile-R\u00e4tsel Generator' },
    { slug: 'create-shadow-matching-worksheets', pageType: 'guide', anchorText: 'Schattenbilder-Zuordnung erstellen' },
    { slug: 'create-odd-one-out-puzzles', pageType: 'guide', anchorText: 'Was-geh\u00f6rt-nicht-dazu-R\u00e4tsel erstellen' },
    { slug: 'create-picture-sudoku', pageType: 'guide', anchorText: 'Bilder-Sudoku erstellen' },
  ],
};
`);

console.log('Files 6-7 done');
