const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');

function w(name, content) {
  fs.writeFileSync(path.join(d, name), content, 'utf8');
  console.log('Created: ' + name);
}

// === 2. create-counting-worksheets.ts ===
w('create-counting-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-counting-worksheets',
  locale: 'de',

  seo: {
    titleTag: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen | Kostenlose Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Z\u00e4hl-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Schritt-f\u00fcr-Schritt-Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: [
      'Z\u00e4hl\u00fcbungen Generator',
      'individuelle Z\u00e4hlaktivit\u00e4ten',
      'druckbare Z\u00e4hlbl\u00e4tter',
      'Z\u00e4hl\u00fcbungen erstellen',
      'Z\u00e4hl-Arbeitsblatt Generator',
    ],
    lsiKeywords: [
      'Zahlenerkennung',
      'Eins-zu-eins-Zuordnung',
      'z\u00e4hlen und schreiben',
      'Wie viele Arbeitsbl\u00e4tter',
      'Vorschule Z\u00e4hlen',
      'Kindergarten Mathe',
      'Zahlensinn Aktivit\u00e4ten',
      'Diagramm Z\u00e4hl\u00fcbungen',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/chart count/sample-1.jpeg',
      primaryAlt: 'Individuelles Z\u00e4hl-Arbeitsblatt mit thematischen Illustrationen',
      secondary: '/samples/english/chart count/sample-2.jpeg',
      secondaryAlt: 'Diagramm-Z\u00e4hlaktivit\u00e4t f\u00fcr junge Lernende',
    },
    sampleGallery: [
      { src: '/samples/english/chart count/sample-1.jpeg', alt: 'Z\u00e4hlen-und-Schreiben-Arbeitsblatt', caption: 'Z\u00e4hle und schreibe die Zahl' },
      { src: '/samples/english/chart count/sample-2.jpeg', alt: 'Thematisches Z\u00e4hl-Arbeitsblatt', caption: 'Thematische Z\u00e4hlaktivit\u00e4t' },
      { src: '/samples/english/chart count/sample-3.jpeg', alt: 'Diagramm-Z\u00e4hl\u00fcbung', caption: 'Diagrammbasiertes Z\u00e4hlen' },
      { src: '/samples/english/chart count/sample-4.jpeg', alt: 'Z\u00e4hl\u00fcbung mit L\u00f6sung', caption: 'Z\u00e4hl-Arbeitsblatt mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },

  hero: {
    title: 'Z\u00e4hl-Arbeitsbl\u00e4tter f\u00fcr den Zahlensinn erstellen',
    description: 'Wenn Sie Z\u00e4hl-Arbeitsbl\u00e4tter passend zum Niveau Ihrer Lernenden erstellen, bieten Sie die strukturierte \u00dcbung, die f\u00fcr einen soliden Zahlensinn n\u00f6tig ist. Z\u00e4hlen ist die Schl\u00fcsself\u00e4higkeit f\u00fcr alle Mathematik \u2014 Kinder, die flie\u00dfend z\u00e4hlen, machen schnellere Fortschritte bei Addition, Subtraktion und Probleml\u00f6sung. Unser Z\u00e4hl-Arbeitsblatt-Generator l\u00e4sst Sie den Zahlenbereich festlegen, aus \u00fcber 100 visuellen Themen w\u00e4hlen und professionelle Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter mit L\u00f6sungsschl\u00fcsseln erstellen. Sch\u00fcler z\u00e4hlen thematische Objekte und schreiben die Summen auf, wobei sie gleichzeitig Eins-zu-eins-Zuordnung und Zahlenschreiben \u00fcben. Lehrkr\u00e4fte nutzen Z\u00e4hl-Arbeitsbl\u00e4tter f\u00fcr Mathe-Stationen, Morgenarbeit und Lernstandserhebungen. Eltern setzen sie zur Vorschul- und Kindergartenvorbereitung ein. Printable-Verk\u00e4ufer stellen fest, dass Z\u00e4hl-Arbeitsbl\u00e4tter zu den konstant meistverkauften Produkten in der Fr\u00fchf\u00f6rderung geh\u00f6ren. Dieser Leitfaden behandelt jeden Schritt von der Konfiguration bis zum Verkauf.',
  },

  introduction: 'Z\u00e4hlen ist die grundlegendste mathematische F\u00e4higkeit, und Arbeitsbl\u00e4tter bieten die wiederholende \u00dcbung, die f\u00fcr eine Automatisierung n\u00f6tig ist. Die Eins-zu-eins-Zuordnung \u2014 das Verst\u00e4ndnis, dass jedes Objekt genau einmal gez\u00e4hlt wird \u2014 ist ein Entwicklungsmeilenstein, der erhebliche \u00dcbung erfordert. Individuelle Z\u00e4hl-Arbeitsbl\u00e4tter beschleunigen diesen Prozess durch gezielte, ansprechende \u00dcbung auf genau dem richtigen Niveau. Das Diagramm-Z\u00e4hl-Format ist besonders effektiv, weil es mehrere F\u00e4higkeiten kombiniert. Kinder betrachten eine Gruppe thematischer Bilder, z\u00e4hlen sie und schreiben die Zahl. Diese gleichzeitige \u00dcbung von Z\u00e4hlen, Zahlenerkennung und Zahlenschreiben macht jedes Arbeitsblatt zu einer Mehrf\u00e4higkeiten-\u00dcbung. Die thematischen Bilder sorgen f\u00fcr Motivation, die einfache Punkte oder Strichmarkierungen nicht bieten k\u00f6nnen. Unser Generator l\u00e4sst Sie jede Variable steuern: den Zahlenbereich (1\\u201310 f\u00fcr Anf\u00e4nger, 1\\u201320 f\u00fcr Kindergartenkinder, 1\\u2013100 f\u00fcr Fortgeschrittene), das visuelle Thema und die Anzahl der Z\u00e4hlgruppen pro Seite. Sie erstellen professionelle Arbeitsbl\u00e4tter in Sekunden. Z\u00e4hl-Arbeitsbl\u00e4tter haben eine breite Marktattraktivit\u00e4t. Sie geh\u00f6ren zu den ersten Dingen, nach denen Eltern suchen, wenn sie Kinder auf die Schule vorbereiten. Lehrkr\u00e4fte ben\u00f6tigen sie laufend f\u00fcr Mathe-Stationen, Hausaufgaben und Bewertungen. Die Nachfrage ist ganzj\u00e4hrig und erneuert sich jeden September, wenn eine neue Kohorte von Kindern mit dem Z\u00e4hlenlernen beginnt.',

  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Z\u00e4hl-Arbeitsblatt',
    steps: [
      {
        title: 'Zahlenbereich festlegen',
        description: 'W\u00e4hlen Sie den Z\u00e4hlbereich passend zu Ihrer Zielgruppe. Zahlen 1\\u20135 f\u00fcr Vorschule, 1\\u201310 f\u00fcr Vorschulalter, 1\\u201320 f\u00fcr Kindergarten und dar\u00fcber hinaus f\u00fcr die erste Klasse. Der Bereich bestimmt die Schwierigkeit.',
      },
      {
        title: 'Z\u00e4hl-Generator \u00f6ffnen',
        description: 'Rufen Sie das Diagramm-Z\u00e4hl-Tool \u00fcber Ihren Browser auf. W\u00e4hlen Sie Ihren Zahlenbereich und die Oberfl\u00e4che passt sich mit passenden Optionen an. Alles l\u00e4uft online.',
      },
      {
        title: 'Visuelles Thema w\u00e4hlen',
        description: 'W\u00e4hlen Sie thematische Bilder aus der Bibliothek. Tiere, Lebensmittel und Fahrzeuge sind beliebte Optionen. Die thematischen Bilder machen die Z\u00e4hl\u00fcbung visuell ansprechend und motivieren junge Lernende.',
      },
      {
        title: 'Layout konfigurieren',
        description: 'Legen Sie die Anzahl der Z\u00e4hlgruppen pro Seite fest. Vier bis sechs Gruppen eignen sich f\u00fcr die meisten Altersgruppen. Jede Gruppe zeigt eine Sammlung thematischer Bilder zum Z\u00e4hlen.',
      },
      {
        title: 'Antwortformat w\u00e4hlen',
        description: 'W\u00e4hlen Sie, ob Sch\u00fcler die Zahl schreiben, die richtige Zahl aus Optionen einkreisen oder die passende Menge ausmalen. Schreiben ist Standard. Multiple Choice eignet sich f\u00fcr j\u00fcngere Kinder.',
      },
      {
        title: 'Zahlenschreib\u00fcbung hinzuf\u00fcgen',
        description: 'F\u00fcgen Sie optional eine Zahlenschreibzeile neben jeder Z\u00e4hlgruppe hinzu. Sch\u00fcler z\u00e4hlen die Objekte und \u00fcben dann das Schreiben der Ziffer. Dieses Doppelf\u00e4higkeiten-Format wird von Lehrkr\u00e4ften sehr gesch\u00e4tzt.',
      },
      {
        title: 'Vorschau und Pr\u00fcfung',
        description: 'Pr\u00fcfen Sie, ob die Objektanzahlen korrekt sind, die Bilder deutlich und das Layout gen\u00fcgend Platz zum Schreiben bietet. \u00dcberpr\u00fcfen Sie, ob der L\u00f6sungsschl\u00fcssel zu jeder Gruppe passt.',
      },
      {
        title: 'PDF herunterladen',
        description: 'Erstellen Sie das finale PDF mit Arbeitsblatt und L\u00f6sungsschl\u00fcssel. Die hochaufl\u00f6sende Ausgabe druckt klar und eignet sich f\u00fcr den Einsatz zu Hause und im Unterricht.',
      },
      {
        title: 'Ein progressives Set erstellen',
        description: 'Erstellen Sie 15\\u201320 Arbeitsbl\u00e4tter mit steigendem Schwierigkeitsgrad von kleinen zu gr\u00f6\u00dferen Zahlen. Sets mit progressiver Schwierigkeit sind das beliebteste Format, weil sie mit dem Lernenden mitwachsen.',
      },
      {
        title: 'Verpacken und verkaufen',
        description: 'B\u00fcndeln Sie Ihre Arbeitsbl\u00e4tter zu thematischen Produkten. Listen Sie auf Etsy, TPT oder KDP mit klaren Beschreibungen des Zahlenbereichs und Niveaus. F\u00fcgen Sie Vorschaubilder hinzu, die die Arbeitsblattqualit\u00e4t zeigen.',
      },
    ],
  },

  platformTips: [
    {
      platform: 'Etsy',
      title: 'Z\u00e4hl-Arbeitsbl\u00e4tter auf Etsy',
      description: 'Z\u00e4hl-Arbeitsbl\u00e4tter geh\u00f6ren zu den meistverkauften Fr\u00fchf\u00f6rderungs-Printables auf Etsy. Erstellen Sie thematische B\u00fcndel mit 15\\u201325 Arbeitsbl\u00e4ttern und progressiven Zahlenbereichen. Preisgestaltung bei $3\\u2013$5. Keywords wie \\u201eZ\u00e4hl-Arbeitsbl\u00e4tter Vorschule\\u201c und \\u201eZahlen\u00fcbungen druckbar\\u201c generieren starken Traffic.',
    },
    {
      platform: 'Teachers Pay Teachers',
      title: 'Z\u00e4hlaktivit\u00e4ten auf TPT',
      description: 'Richten Sie Ihre Z\u00e4hl-Arbeitsbl\u00e4tter an den mathematischen Bildungsstandards aus. Bieten Sie sowohl \u00dcbungs- als auch Bewertungsbl\u00e4tter an. Lehrkr\u00e4fte sch\u00e4tzen Produkte mit einem Nachverfolgungsbogen oder Bewertungsraster.',
    },
    {
      platform: 'Amazon KDP',
      title: 'Z\u00e4hl-Arbeitshefte auf KDP',
      description: 'Stellen Sie 60\\u201380 Z\u00e4hl-Arbeitsbl\u00e4tter zu einem Arbeitsheft mit progressivem Schwierigkeitsgrad zusammen. Zielen Sie auf \\u201eZ\u00e4hl-Arbeitsheft f\u00fcr Kinder\\u201c und \\u201eVorschule Zahlen\u00fcbungen\\u201c. F\u00fcgen Sie Zahlen 1\\u201320 mit thematischen Bildern durch das ganze Heft ein.',
    },
  ],

  monetization: [
    {
      title: 'Zahlenbereich-B\u00fcndel',
      description: 'Erstellen Sie dedizierte B\u00fcndel f\u00fcr jeden Bereich: 1\\u20135, 1\\u201310, 1\\u201320 und 1\\u2013100. Lehrkr\u00e4fte und Eltern k\u00f6nnen genau das Niveau kaufen, das sie brauchen, und viele werden mehrere Niveaus kaufen, wenn ihre Kinder Fortschritte machen.',
    },
    {
      title: 'Thematische Z\u00e4hlsammlungen',
      description: 'Bauen Sie Z\u00e4hl-Arbeitsblattpakete um beliebte Themen auf. Ein \\u201eDinosaurier-Z\u00e4hlpaket\\u201c oder ein \\u201eMeerestiere-Z\u00e4hlset\\u201c kombiniert Mathe\u00fcbung mit thematischem Reiz f\u00fcr Premium-Preise.',
    },
    {
      title: 'Umfassende Zahlensinn-Kits',
      description: 'Kombinieren Sie Z\u00e4hlen mit Zahlenschreiben, Zahlenerkennung und Einer-mehr/Einer-weniger-\u00dcbungen in einem kompletten Kit. Mehrf\u00e4higkeiten-Kits erzielen h\u00f6here Preise und dienen als umfassende Curriculum-Werkzeuge.',
    },
  ],

  examples: 'Z\u00e4hl-Arbeitsbl\u00e4tter geh\u00f6ren zu den vielseitigsten Werkzeugen in der fr\u00fchen Mathematikerziehung. Eine Vorschullehrerin nutzt thematische Z\u00e4hl-Arbeitsbl\u00e4tter als t\u00e4gliche Morgenarbeit. Jede Woche bietet ein anderes Tierthema, und die Kinder z\u00e4hlen Gruppen thematischer Bilder und schreiben die Zahlen. Durch die Dokumentation ihrer Arbeit \u00fcber Monate kann sie den Fortschritt jedes Kindes von Z\u00e4hlen bis 5 bis Z\u00e4hlen bis 20 nachverfolgen. Eine Kindergartenlehrerin verwendet Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter zur formativen Bewertung. W\u00e4hrend der Mathe-Stationen bearbeiten Sch\u00fcler ein Z\u00e4hl-Arbeitsblatt selbstst\u00e4ndig, w\u00e4hrend sie mit Kleingruppen arbeitet. Die fertigen Arbeitsbl\u00e4tter liefern schnelle Daten dar\u00fcber, wer das Z\u00e4hlen in verschiedenen Bereichen beherrscht und wer F\u00f6rderung braucht. Eine Etsy-Verk\u00e4uferin entdeckte, dass Z\u00e4hl-Arbeitsbl\u00e4tter, die mit Zahlennachfahr\u00fcbungen geb\u00fcndelt werden, sich besser verkaufen als jedes Produkt allein. Ihr \\u201eKomplettes Zahlenpaket\\u201c enth\u00e4lt Z\u00e4hl-, Nachfahr- und Zahlenerkennungs\u00fcbungen f\u00fcr Zahlen 1\\u201320, zum Preis von $5,99. Eine Mutter im Heimunterricht wechselt durch thematische Z\u00e4hl-Arbeitsbl\u00e4tter, um die t\u00e4gliche Mathe\u00fcbung frisch zu halten. Der thematische Ansatz eliminiert den \\u201eSchon wieder Mathe\\u201c-Widerstand, weil sich jede Sitzung anders anf\u00fchlt.',

  faq: [
    {
      question: 'Welche Zahlenbereiche sind verf\u00fcgbar?',
      answer: 'Der Generator unterst\u00fctzt Z\u00e4hlbereiche von 1\\u20135 bis 1\\u2013100. Sie legen Minimum und Maximum passend zum Niveau Ihrer Sch\u00fcler fest. G\u00e4ngige Bereiche sind 1\\u20135, 1\\u201310, 1\\u201320 und 1\\u201350.',
    },
    {
      question: 'F\u00fcr welche Altersgruppen sind Z\u00e4hl-Arbeitsbl\u00e4tter geeignet?',
      answer: 'Z\u00e4hl-Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von 2 bis 7 Jahren. Kleinkinder z\u00e4hlen bis 5 mit gro\u00dfen Bildern. Vorschulkinder z\u00e4hlen bis 10. Kindergarten- und Erstklassenkinder z\u00e4hlen bis 20 und dar\u00fcber hinaus.',
    },
    {
      question: 'Enthalten die Arbeitsbl\u00e4tter Zahlenschreib\u00fcbungen?',
      answer: 'Sie k\u00f6nnen Arbeitsbl\u00e4tter so konfigurieren, dass sie eine Zahlenschreibzeile neben jeder Z\u00e4hlgruppe enthalten. Sch\u00fcler z\u00e4hlen die Objekte und \u00fcben dann das Schreiben der Ziffer f\u00fcr Doppelf\u00e4higkeiten-\u00dcbung.',
    },
    {
      question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?',
      answer: 'Jedes Arbeitsblatt wird mit einem passenden L\u00f6sungsschl\u00fcssel geliefert, der die korrekte Anzahl f\u00fcr jede Gruppe zeigt. Der L\u00f6sungsschl\u00fcssel befindet sich auf einer separaten Seite.',
    },
    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Mit einer Commercial-Lizenz k\u00f6nnen Sie auf Etsy, TPT, KDP und anderen Plattformen verkaufen. Die Full-Access-Lizenz umfasst alle 100+ visuellen Themen.',
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
    { slug: 'chart-count', pageType: 'app', anchorText: 'Z\u00e4hl-Arbeitsblatt Generator' },
    { slug: 'create-addition-worksheets', pageType: 'guide', anchorText: 'Additions-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-size-comparison-worksheets', pageType: 'guide', anchorText: 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

console.log('Script 2 complete');
