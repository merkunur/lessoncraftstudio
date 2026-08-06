const fs = require('fs');
const path = require('path');

const deDir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
if (!fs.existsSync(deDir)) fs.mkdirSync(deDir, { recursive: true });

function w(name, content) {
  fs.writeFileSync(path.join(deDir, name), content, 'utf8');
  console.log('Created: ' + name);
}

// === 1. create-size-comparison-worksheets.ts ===
w('create-size-comparison-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-size-comparison-worksheets',
  locale: 'de',

  seo: {
    titleTag: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie Arbeitsbl\u00e4tter zum Gr\u00f6\u00dfenvergleich f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Schritt-f\u00fcr-Schritt-Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Gr\u00f6\u00dfenvergleich Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: [
      'gro\u00df und klein Arbeitsbl\u00e4tter',
      'Gr\u00f6\u00dfen sortieren Aktivit\u00e4ten',
      'druckbare Gr\u00f6\u00dfen\u00fcbungen',
      'Vergleichs\u00fcbungen erstellen',
      'Gr\u00f6\u00dfenvergleich Generator',
    ],
    lsiKeywords: [
      'gro\u00df und klein Konzepte',
      'Messbereitschaft',
      'Gr\u00f6\u00dfen vergleichen',
      'nach Gr\u00f6\u00dfe ordnen',
      'Vorschul-Mathe Konzepte',
      'fr\u00fche Messf\u00e4higkeiten',
      'relative Gr\u00f6\u00dfe',
      'Gr\u00f6\u00dfenunterscheidung',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/big small/sample-1.jpeg',
      primaryAlt: 'Individuelles Gr\u00f6\u00dfenvergleich-Arbeitsblatt mit thematischen Illustrationen',
      secondary: '/samples/english/big small/sample-2.jpeg',
      secondaryAlt: 'Gro\u00df-und-Klein-Sortier\u00fcbung f\u00fcr Vorschulkinder',
    },
    sampleGallery: [
      { src: '/samples/english/big small/sample-1.jpeg', alt: 'Gro\u00df-und-Klein-Arbeitsblatt', caption: 'Kreise das Gr\u00f6\u00dfere ein' },
      { src: '/samples/english/big small/sample-2.jpeg', alt: 'Gr\u00f6\u00dfen-Sortier\u00fcbung', caption: 'Nach Gr\u00f6\u00dfe sortieren' },
      { src: '/samples/english/big small/sample-3.jpeg', alt: 'Thematischer Gr\u00f6\u00dfenvergleich', caption: 'Thematischer Gr\u00f6\u00dfenvergleich' },
      { src: '/samples/english/big small/sample-4.jpeg', alt: 'Gr\u00f6\u00dfen-Ordnungs\u00fcbung', caption: 'Von klein nach gro\u00df ordnen' },
    ],
    youtubeId: 'S2s2U6Nb7FI',
    videoTitle: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter f\u00fcr junge Lernende erstellen',
    description: 'Wenn Sie Arbeitsbl\u00e4tter zum Gr\u00f6\u00dfenvergleich mit ansprechenden Themen erstellen, helfen Sie kleinen Kindern, eines der fr\u00fchesten mathematischen Konzepte zu meistern. Das Verst\u00e4ndnis von gro\u00df und klein, gr\u00f6\u00dfer und kleiner sowie das Ordnen nach Gr\u00f6\u00dfe bildet die Grundlage f\u00fcr Messen, Zahlenvergleiche und Datenanalyse. Unser Gr\u00f6\u00dfenvergleich-Generator l\u00e4sst Sie aus \u00fcber 100 visuellen Themen w\u00e4hlen, den \u00dcbungstyp konfigurieren (das Gr\u00f6\u00dfere einkreisen, nach Gr\u00f6\u00dfe sortieren, vom Kleinsten zum Gr\u00f6\u00dften ordnen) und professionelle PDFs mit L\u00f6sungsschl\u00fcsseln erstellen. Lehrkr\u00e4fte setzen diese Arbeitsbl\u00e4tter in Mathe-Stationen und als Gruppen\u00fcbungen ein. Eltern nutzen sie zur Vorschulvorbereitung. Printable-Verk\u00e4ufer stellen fest, dass Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter in der Fr\u00fchf\u00f6rderungsnische stark nachgefragt werden. Dieser Leitfaden behandelt das Erstellen, Anpassen und Verkaufen dieser wichtigen \u00dcbungsbl\u00e4tter.',
  },

  introduction: 'Der Gr\u00f6\u00dfenvergleich ist eines der ersten mathematischen Konzepte, denen Kinder begegnen, und seine Beherrschung legt den Grundstein f\u00fcr fortgeschrittenere F\u00e4higkeiten. Bevor Kinder verstehen k\u00f6nnen, dass 5 gr\u00f6\u00dfer als 3 ist, m\u00fcssen sie begreifen, dass ein Gegenstand gr\u00f6\u00dfer oder kleiner als ein anderer sein kann. Bevor sie mit Linealen messen k\u00f6nnen, brauchen sie Erfahrung im visuellen Vergleich relativer Gr\u00f6\u00dfen. Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter bieten strukturierte \u00dcbung f\u00fcr diesen Entwicklungsmeilenstein. Das einfachste Format fordert Kinder auf, den gr\u00f6\u00dferen oder kleineren Gegenstand in einem Paar einzukreisen. Fortgeschrittenere Versionen verlangen, mehrere Gegenst\u00e4nde nach Gr\u00f6\u00dfe zu sortieren oder vom Kleinsten zum Gr\u00f6\u00dften anzuordnen. Diese \u00dcbungen bauen Wortschatz (gro\u00df, klein, gr\u00f6\u00dfer, kleiner, am gr\u00f6\u00dften, am kleinsten) neben mathematischem Denken auf. Unser Generator macht die Erstellung dieser Arbeitsbl\u00e4tter m\u00fchelos. Sie w\u00e4hlen ein visuelles Thema, den \u00dcbungstyp, und das Tool erstellt ein professionelles, druckfertiges Arbeitsblatt. Die thematischen Bilder f\u00f6rdern die Motivation \u2014 die Gr\u00f6\u00dfen von Dinosauriern zu vergleichen ist weitaus spannender als abstrakte Formen zu vergleichen. Der Markt f\u00fcr Fr\u00fchf\u00f6rderungs-Arbeitsbl\u00e4tter ist betr\u00e4chtlich. Eltern von Vorschulkindern suchen aktiv nach Materialien zur Kindergartenvorbereitung. Der Gr\u00f6\u00dfenvergleich ist eine wichtige F\u00e4higkeit, die bei vielen Einschulungsuntersuchungen gepr\u00fcft wird. Lehrkr\u00e4fte kaufen diese Arbeitsbl\u00e4tter f\u00fcr Mathe-Stationen und Kleingruppenunterricht. Die Nachfrage ist ganzj\u00e4hrig konstant mit einem Anstieg zur Einschulung. Dieser Leitfaden behandelt alles, vom Erstellen effektiver \u00dcbungsbl\u00e4tter bis zum Verpacken als verkaufsfertige Produkte.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Gr\u00f6\u00dfenvergleich-Arbeitsblatt',
    steps: [
      {
        title: 'W\u00e4hlen Sie den \u00dcbungstyp',
        description: 'W\u00e4hlen Sie zwischen \\u201edas Gr\u00f6\u00dfere/Kleinere einkreisen\\u201c, \\u201enach Gr\u00f6\u00dfe sortieren\\u201c oder \\u201evom Kleinsten zum Gr\u00f6\u00dften ordnen\\u201c. Einkreisen ist am einfachsten f\u00fcr sehr junge Kinder. Ordnen ist anspruchsvoller und eignet sich f\u00fcr Kindergartenkinder.',
      },
      {
        title: '\u00d6ffnen Sie den Gr\u00f6\u00dfenvergleich-Generator',
        description: 'Rufen Sie das Gro\u00df-und-Klein-Tool \u00fcber Ihren Browser auf. Die Oberfl\u00e4che f\u00fchrt Sie durch \u00dcbungstyp, Themenwahl und Layout-Optionen. Keine Installation erforderlich.',
      },
      {
        title: 'W\u00e4hlen Sie ein visuelles Thema',
        description: 'W\u00e4hlen Sie thematische Bilder aus der Bibliothek. Tiere mit nat\u00fcrlichen Gr\u00f6\u00dfenunterschieden funktionieren besonders gut. Fahrzeuge, Lebensmittel und Alltagsgegenst\u00e4nde sind ebenfalls wirkungsvoll.',
      },
      {
        title: 'Schwierigkeitsgrad einstellen',
        description: 'F\u00fcr Anf\u00e4nger verwenden Sie Paare mit offensichtlichen Gr\u00f6\u00dfenunterschieden. F\u00fcr fortgeschrittene Lernende verwenden Sie Objekte mit subtilen Unterschieden oder f\u00fcgen drei oder mehr Gegenst\u00e4nde zum Vergleich hinzu.',
      },
      {
        title: 'Anzahl der Aufgaben festlegen',
        description: 'W\u00e4hlen Sie 4\\u20138 Vergleichsaufgaben pro Seite. Weniger Aufgaben mit gr\u00f6\u00dferen Bildern eignen sich f\u00fcr Vorschulkinder. Mehr Aufgaben pro Seite funktionieren f\u00fcr Kindergartenkinder.',
      },
      {
        title: 'Anweisungen hinzuf\u00fcgen',
        description: 'F\u00fcgen Sie klare, einfache Anweisungen hinzu: \\u201eKreise das Gr\u00f6\u00dfere ein\\u201c oder \\u201eMale einen Stern beim Kleinsten\\u201c. F\u00fcr Leseanf\u00e4nger verwenden Sie bildbasierte Anweisungen oder Symbole neben dem Text.',
      },
      {
        title: 'Vorschau und Pr\u00fcfung',
        description: 'Pr\u00fcfen Sie, ob die Gr\u00f6\u00dfenunterschiede deutlich sind, die Bilder erkennbar und die Anweisungen zur \u00dcbung passen. Stellen Sie sicher, dass der L\u00f6sungsschl\u00fcssel die gr\u00f6\u00dferen oder kleineren Objekte korrekt identifiziert.',
      },
      {
        title: 'PDF herunterladen',
        description: 'Erstellen Sie das hochaufl\u00f6sende PDF mit L\u00f6sungsschl\u00fcssel. Die Ausgabe eignet sich f\u00fcr den Ausdruck im Unterricht, zu Hause oder zum Hochladen auf digitale Marktpl\u00e4tze.',
      },
      {
        title: 'Ein thematisches Set erstellen',
        description: 'Erstellen Sie 10\\u201320 Arbeitsbl\u00e4tter mit verschiedenen Themen und \u00dcbungstypen. Ein komplettes Gr\u00f6\u00dfenvergleich-Paket mit allen \u00dcbungsformaten bietet hervorragenden Mehrwert.',
      },
      {
        title: 'Verpacken und verkaufen',
        description: 'B\u00fcndeln Sie Ihre Arbeitsbl\u00e4tter und listen Sie sie auf Etsy, TPT oder KDP. Verwenden Sie Keywords wie \\u201eVorschule Mathe Arbeitsbl\u00e4tter\\u201c, \\u201eGro\u00df und Klein \u00dcbungen\\u201c und \\u201eKindergartenvorbereitung\\u201c.',
      },
    ],
  },

  platformTips: [
    {
      platform: 'Etsy',
      title: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter auf Etsy',
      description: 'Eltern suchen nach Vorschul- und Kindergartenvorbereitungsmaterialien. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 Arbeitsbl\u00e4ttern. Preisgestaltung bei $3\\u2013$5. Keywords wie \\u201eGro\u00df und Klein \u00dcbungen\\u201c, \\u201eVorschule Mathe\\u201c und \\u201eKleinkind Lernmaterialien\\u201c generieren Traffic.',
    },
    {
      platform: 'Teachers Pay Teachers',
      title: 'Gr\u00f6\u00dfen\u00fcbungen auf TPT',
      description: 'Lehrkr\u00e4fte ben\u00f6tigen Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter f\u00fcr Mathe-Stationen und Lernstandserhebungen. Richten Sie die Inhalte an Kindergarten-Mathestandards aus. Bieten Sie sowohl \u00dcbungsseiten als auch ein Bewertungsraster an.',
    },
    {
      platform: 'Amazon KDP',
      title: 'Gr\u00f6\u00dfenvergleich-Arbeitshefte auf KDP',
      description: 'Integrieren Sie Gr\u00f6\u00dfenvergleich-Seiten in ein umfassenderes Vorschul-Mathe-Arbeitsheft neben Z\u00e4hlen, Mustern und Formen. Themen\u00fcbergreifende Arbeitshefte sprechen Eltern an, die umfassendes Vorbereitungsmaterial suchen.',
    },
  ],

  monetization: [
    {
      title: 'Vorschul-Mathe-B\u00fcndel',
      description: 'Kombinieren Sie Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter mit Z\u00e4hl-, Muster- und Formen\u00fcbungen zu einem kompletten Vorschul-Mathe-B\u00fcndel. Themen\u00fcbergreifende B\u00fcndel erzielen h\u00f6here Preise und sprechen Eltern an, die umfassende Vorbereitung w\u00fcnschen.',
    },
    {
      title: 'Thematische Fr\u00fchf\u00f6rderungspakete',
      description: 'Erstellen Sie thematische Pakete, die Gr\u00f6\u00dfenvergleich mit Zuordnung, Sortierung und Ausmalen kombinieren. Ein \\u201eDinosaurier-Lernpaket\\u201c mit verschiedenen \u00dcbungstypen bietet hervorragenden Mehrwert.',
    },
    {
      title: 'Lernstandserhebungs-Sets',
      description: 'Erstellen Sie Sets mit einer Checkliste zur Kindergartenreife. Lehrkr\u00e4fte und Eltern sch\u00e4tzen Materialien, die den Entwicklungsfortschritt dokumentieren.',
    },
  ],

  examples: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erf\u00fcllen eine wichtige Rolle in der fr\u00fchkindlichen Bildung. Eine Vorschullehrerin nutzt \\u201eKreise das Gr\u00f6\u00dfere ein\\u201c-Arbeitsbl\u00e4tter als Mathe-Stationen-Aktivit\u00e4t. Jede Station zeigt ein anderes Thema, und die Kinder wechseln w\u00e4hrend der Freiarbeit durch. Die visuell ansprechenden thematischen Bilder halten Dreij\u00e4hrige bei der Sache, und die Lehrerin nutzt die fertigen Arbeitsbl\u00e4tter, um das Verst\u00e4ndnis jedes Kindes f\u00fcr Gr\u00f6\u00dfenkonzepte nachzuverfolgen. Eine Kindergartenlehrerin verwendet \\u201eNach Gr\u00f6\u00dfe ordnen\\u201c-Arbeitsbl\u00e4tter als formative Bewertungen. Indem sie beobachtet, welche Kinder drei oder vier Gegenst\u00e4nde korrekt vom Kleinsten zum Gr\u00f6\u00dften anordnen k\u00f6nnen, erkennt sie, wer zus\u00e4tzliche Unterst\u00fctzung bei der Messbereitschaft ben\u00f6tigt. Eine Etsy-Verk\u00e4uferin hat eine \\u201eVorschul-Fit\\u201c-Marke mit Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4ttern unter anderen Fr\u00fchf\u00f6rderungsaktivit\u00e4ten aufgebaut. Ihre B\u00fcndel mit 20 Arbeitsbl\u00e4ttern verkaufen sich f\u00fcr $4,99 und generieren ein konstantes monatliches Einkommen. Eine Mutter im Heimunterricht nutzt Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter, um Messvokabular einzuf\u00fchren. Ihre Dreij\u00e4hrige \u00fcbt das Einkreisen des gr\u00f6\u00dferen Dinosauriers und lernt dabei W\u00f6rter wie \\u201egr\u00f6\u00dfer\\u201c, \\u201ekleiner\\u201c, \\u201eam gr\u00f6\u00dften\\u201c und \\u201eam kleinsten\\u201c. Eine Logop\u00e4din nutzt Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter zum Erlernen von Steigerungsformen und baut dabei gleichzeitig sprachliche und kognitive F\u00e4higkeiten auf.',

  faq: [
    {
      question: 'F\u00fcr welche Altersgruppen sind Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter geeignet?',
      answer: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter sind f\u00fcr Kinder von 2 bis 6 Jahren konzipiert. Kleinkinder beginnen mit einfacher \\u201eGro\u00df gegen Klein\\u201c-Erkennung. Vorschulkinder vergleichen Paare. Kindergartenkinder ordnen mehrere Objekte nach Gr\u00f6\u00dfe.',
    },
    {
      question: 'Welche \u00dcbungstypen sind verf\u00fcgbar?',
      answer: 'Der Generator unterst\u00fctzt \\u201edas Gr\u00f6\u00dfere/Kleinere einkreisen\\u201c, \\u201enach Gr\u00f6\u00dfe sortieren\\u201c und \\u201evom Kleinsten zum Gr\u00f6\u00dften ordnen\\u201c. Sie k\u00f6nnen Arbeitsbl\u00e4tter mit jeder Kombination dieser Formate erstellen.',
    },
    {
      question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?',
      answer: 'Jedes Arbeitsblatt enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel auf einer separaten Seite. Das erleichtert die \u00dcberpr\u00fcfung f\u00fcr Lehrkr\u00e4fte und Eltern und unterst\u00fctzt die Selbstkontrolle der Sch\u00fcler.',
    },
    {
      question: 'Kann ich den Gr\u00f6\u00dfenvergleich mit anderen F\u00e4higkeiten kombinieren?',
      answer: 'Ja. Sie k\u00f6nnen Arbeitsbl\u00e4tter erstellen, die Gr\u00f6\u00dfenvergleich mit Z\u00e4hlen, Farberkennung oder Wortschatz\u00fcbungen kombinieren. Mehrf\u00e4higkeiten-Arbeitsbl\u00e4tter sind bei Eltern besonders beliebt.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell verkaufen?',
      answer: 'Mit einer Commercial-Lizenz k\u00f6nnen Sie auf Etsy, TPT, KDP und anderen Plattformen verkaufen. Die Full-Access-Lizenz umfasst alle 100+ Themen f\u00fcr vielf\u00e4ltige Produkterstellung.',
    },
    {
      question: 'Was kosten die Lizenzen?',
      answer: 'Einzelne App-Lizenzen kosten $27 f\u00fcr Commercial und $47 f\u00fcr Full Access. Wenn Sie mehrere Apps m\u00f6chten, sind B\u00fcndel f\u00fcr $79 (Commercial) und $119 (Full Access) erh\u00e4ltlich, die eine gesamte Werkzeugkategorie abdecken.',
    },
    {
      question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.',
    },
  ],

  internalLinks: [
    { slug: 'big-small', pageType: 'app', anchorText: 'Gr\u00f6\u00dfenvergleich-Generator' },
    { slug: 'create-sorting-worksheets', pageType: 'guide', anchorText: 'Sortier-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-counting-worksheets', pageType: 'guide', anchorText: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

console.log('Script 1 complete');
