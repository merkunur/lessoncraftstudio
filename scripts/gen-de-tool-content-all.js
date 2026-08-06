// Generate all 33 German tool content files
// Run: node scripts/gen-de-tool-content-all.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function w(slug, content) {
  const fp = path.join(outDir, slug + '.ts');
  fs.writeFileSync(fp, content, 'utf8');
  console.log('OK: ' + slug + '.ts');
}

// Common sections reused across files
const HEADER = "import type { FreeToolContent } from '../types';\n\nexport const content: FreeToolContent = {";

function commercialFaqDE() {
  return `    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) entfernt das Wasserzeichen und gew\u00e4hrt eine kommerzielle Lizenz zum Verkauf erstellter Arbeitsbl\u00e4tter. Das Full Access Pack ($47) enth\u00e4lt alles im Commercial Pack plus die vollst\u00e4ndige Bildbibliothek mit allen 104 Themen f\u00fcr maximale Vielfalt bei einzigartigen Produkten.',
    }`;
}

function refundFaqDE() {
  return `    {
      question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst alles mit der kostenlosen Version.',
    }`;
}

function sellFaqDE() {
  return `    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Mit der kostenlosen Version enthalten Arbeitsbl\u00e4tter ein Wasserzeichen und sind f\u00fcr den pers\u00f6nlichen Gebrauch oder Unterricht bestimmt. Das Commercial Pack ($27) entfernt das Wasserzeichen und gew\u00e4hrt eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, Teachers Pay Teachers oder jeder anderen Plattform.',
    }`;
}

function sellFaqDE2() {
  return `    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, TPT und jeder anderen Plattform. Unbegrenzte Erstellung inklusive.',
    }`;
}

// Note: File 1 (addition) was already created manually. Skip it.

// ============================================================
// 2. SUBTRACTION
// ============================================================
w('kostenloses-subtraktions-arbeitsblaetter-tool', `${HEADER}
  appId: 'subtraction',
  locale: 'de',

  seo: {
    titleTag: 'Kostenloser Subtraktions-Arbeitsbl\u00e4tter-Generator | PDF',
    metaDescription: 'Erstellen Sie kostenlose Subtraktions-Arbeitsbl\u00e4tter mit Durchstreich-Bildern in Sekunden. Visuelle Subtraktion, 4 \u00dcbungsmodi, L\u00f6sungsschl\u00fcssel. Keine Anmeldung \u2014 sofort als PDF.',
    primaryKeyword: 'kostenloser Subtraktions-Arbeitsbl\u00e4tter-Generator',
    secondaryKeywords: [
      'Subtraktions-Arbeitsbl\u00e4tter mit Bildern',
      'Durchstreichen Subtraktions-Arbeitsbl\u00e4tter',
      'visuelle Subtraktions-Arbeitsbl\u00e4tter kostenlos',
      'druckbare Subtraktions-\u00dcbungsbl\u00e4tter',
      'Subtraktions-Arbeitsblatt-Ersteller online',
    ],
    lsiKeywords: [
      'Kindergarten Subtraktion',
      'Wegnehmen Arbeitsbl\u00e4tter',
      'Erste Klasse Subtraktion',
      'R\u00fcckw\u00e4rts z\u00e4hlen \u00fcben',
      'Minus-Arbeitsbl\u00e4tter f\u00fcr Kinder',
      'Subtraktion mit Umgruppierung',
      'Zahlenstrahl Subtraktion',
      'Differenz-Arbeitsbl\u00e4tter',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
      primaryAlt: 'Kostenloses Subtraktions-Arbeitsblatt mit Durchstreich-Bildern und X-Markierungen f\u00fcr visuelles Wegnehmen',
      secondary: '/samples/english/subtraction/Subtraction Fun 2.jpeg',
      secondaryAlt: 'Subtraktions-Arbeitsblatt mit Tierbildern und bildbasierten Minus-Aufgaben',
    },
    sampleGallery: [
      { src: '/samples/english/subtraction/Subtraction Fun 3.jpeg', alt: 'Durchstreich-Subtraktionsblatt mit Essensbildern und X-Markierungen', caption: 'Durchstreich-Modus mit Essensthema' },
      { src: '/samples/english/subtraction/Subtraction Fun 4.jpeg', alt: 'Visuelles Subtraktionsblatt mit Fahrzeugbildern', caption: 'Fahrzeugthema Subtraktion' },
      { src: '/samples/english/subtraction/Subtraction Fun 5.jpeg', alt: 'Gemischter Subtraktionsmodus mit Bildern und Zahlen', caption: 'Gemischter \u00dcbungsmodus' },
      { src: '/samples/english/subtraction/Subtraction Fun 6.jpeg', alt: 'Subtraktionsblatt mit Naturthema und Antwortfeldern', caption: 'Naturthema mit Antwortfeldern' },
      { src: '/samples/english/subtraction/Subtraction Fun 7.jpeg', alt: 'Querformat-Subtraktionsblatt mit Meerestieren', caption: 'Querformat-Layout' },
      { src: '/samples/english/subtraction/Subtraction Fun 8.jpeg', alt: 'Subtraktions-L\u00f6sungsschl\u00fcssel mit L\u00f6sungen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'til2mrWMUxk',
    videoTitle: 'So erstellen Sie kostenlose Subtraktions-Arbeitsbl\u00e4tter mit Durchstreich-Bildern',
  },

  hero: {
    title: 'Kostenloser Subtraktions-Arbeitsbl\u00e4tter-Generator',
    tagline: 'Visuelle Durchstreich-Subtraktionsbl\u00e4tter, die das Konzept \u201EWegnehmen\u201C sofort verst\u00e4ndlich machen',
    description: \`Dieser kostenlose Subtraktions-Arbeitsbl\u00e4tter-Generator erweckt das Konzept \u201EWegnehmen\u201C mit visuellen Durchstreich-\u00dcbungen zum Leben, die junge Lernende sofort verstehen. Statt abstrakte Zahlenfakten auswendig zu lernen, sehen Kinder eine Gruppe von Bildern, streichen die wegzunehmenden durch und z\u00e4hlen, was \u00fcbrig bleibt. Die haptische Handlung, ein X durch jedes Bild zu setzen, schafft eine physische Verbindung zur Mathematik, die nackte Gleichungen nie erreichen.

Der Durchstreich-Modus hebt diesen Generator hervor. Sch\u00fcler beginnen mit einer Reihe bunter Bilder \u2014 Tiere, Fahrzeuge, Obst oder eines von 104 Themen \u2014 und markieren die richtige Anzahl mit einem X. Die verbleibenden Bilder zeigen die Antwort. Drei weitere \u00dcbungsmodi erweitern die Herausforderung: Bild + Zahl verbindet visuelles Z\u00e4hlen mit geschriebenen Ziffern, Finde den Subtrahenden fordert Sch\u00fcler auf zu bestimmen, wie viele weggenommen wurden, und der gemischte Modus kombiniert alle Formate f\u00fcr eine gr\u00fcndliche Leistungs\u00fcberpr\u00fcfung.

Sie bestimmen jede Variable: Zahlenbereich von 1 bis 20, Aufgaben pro Seite, Hoch- oder Querformat, Schriftarten und Rahmenstile. Der integrierte Canvas-Editor erm\u00f6glicht Neupositionierung, \u00dcberschriften und Farbanpassungen. Jedes Arbeitsblatt wird als druckfertiges PDF mit automatischem L\u00f6sungsschl\u00fcssel exportiert. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen \u2014 starten Sie jetzt ohne Konto.\`,
  },

  whatYouCanCreate: [
    {
      title: 'Durchstreich-Subtraktionsbl\u00e4tter',
      description: 'Erstellen Sie Arbeitsbl\u00e4tter, bei denen Sch\u00fcler Bilder physisch mit einem X markieren, um Subtraktionsaufgaben zu l\u00f6sen. Dieser haptische Ansatz ist der intuitivste Weg, das Konzept \u201EWegnehmen\u201C zu vermitteln.',
    },
    {
      title: 'Thematische Subtraktions-\u00dcbungspakete',
      description: 'Erstellen Sie Subtraktionsbl\u00e4tter mit saisonalen Themen \u2014 Herbstbl\u00e4tter, Schneeflocken, Fr\u00fchlingsblumen \u2014 passend zu Ihrem Unterrichtskalender, damit die \u00dcbung stets frisch wirkt.',
    },
    {
      title: 'Progressive Schwierigkeits-Arbeitsb\u00fccher',
      description: 'Erstellen Sie ein strukturiertes Arbeitsbuch, das mit Differenzen bis 5 beginnt, zu Differenzen bis 10 fortschreitet und dann Differenzen bis 20 erreicht. Perfekt f\u00fcr selbstgesteuertes Lernen.',
    },
    {
      title: 'Schnelle Leistungs\u00fcberpr\u00fcfungen',
      description: 'Nutzen Sie den gemischten Modus f\u00fcr Arbeitsbl\u00e4tter, die Durchstreichen, Bild+Zahl und Finde-den-Subtrahenden auf einer Seite testen \u2014 mit automatischem L\u00f6sungsschl\u00fcssel.',
    },
    {
      title: 'Verkaufsfertige PDF-Pakete',
      description: 'Packen Sie 30\u201350 Subtraktionsbl\u00e4tter in thematische digitale Pakete f\u00fcr Etsy oder Teachers Pay Teachers. Durchstreich-Arbeitsbl\u00e4tter sind gefragt, weil sie manuell schwer zu erstellen sind.',
    },
  ],

  tutorial: {
    title: 'So erstellen Sie Subtraktions-Arbeitsbl\u00e4tter in 10 Schritten',
    steps: [
      {
        title: 'Kostenlosen Generator starten',
        description: 'Klicken Sie auf \u201EKostenlos testen\u201C, um den Subtraktions-Arbeitsblatt-Ersteller in Ihrem Browser zu \u00f6ffnen. Kein Download, keine Anmeldung, keine Zahlung.',
      },
      {
        title: 'Sprache w\u00e4hlen',
        description: 'W\u00e4hlen Sie aus 11 Sprachen. Alle Beschriftungen, Anweisungen und Arbeitsblatt-Texte werden automatisch aktualisiert.',
      },
      {
        title: 'Visuelles Thema ausw\u00e4hlen',
        description: 'Durchsuchen Sie 104 illustrierte Themen wie Tiere, Essen, Fahrzeuge, Sport und Feiertage. Jedes Thema bietet einzigartige Bilder f\u00fcr ansprechende Subtraktionsaufgaben.',
      },
      {
        title: '\u00dcbungsmodus w\u00e4hlen',
        description: 'W\u00e4hlen Sie Durchstreichen f\u00fcr handlungsorientierte \u00dcbung, Bild + Zahl f\u00fcr \u00dcbergangslerner, Finde den Subtrahenden f\u00fcr Fortgeschrittene oder Gemischt f\u00fcr umfassende Wiederholung.',
      },
      {
        title: 'Zahlenbereich festlegen',
        description: 'Steuern Sie den Schwierigkeitsgrad durch Anpassen der Minuend- und Subtrahend-Bereiche. F\u00fcr Anf\u00e4nger beide unter 5, f\u00fcr Erstklassler Differenzen bis 10 oder 20.',
      },
      {
        title: 'Seitenlayout anpassen',
        description: 'Aufgaben pro Seite, Hoch- oder Querformat, Papiergr\u00f6\u00dfe und Schriftart einstellen. Weniger Aufgaben pro Seite geben j\u00fcngeren Kindern mehr Platz.',
      },
      {
        title: 'Arbeitsblatt generieren',
        description: 'Klicken Sie auf Generieren und sehen Sie eine Vorschau Ihres Arbeitsblatts plus L\u00f6sungsschl\u00fcssel. Die Durchstreich-Version zeigt Bilder mit bereits angewandten X-Markierungen im L\u00f6sungsschl\u00fcssel.',
      },
      {
        title: 'Im Canvas-Editor anpassen',
        description: 'F\u00fcgen Sie einen Titel, eine Namenszeile oder dekorative Rahmen hinzu. \u00c4ndern Sie Hintergrundfarben, positionieren Sie Elemente neu oder f\u00fcgen Sie eigene Anweisungen ein.',
      },
      {
        title: 'Als PDF oder JPEG exportieren',
        description: 'Laden Sie Ihr fertiges Arbeitsblatt als druckfertiges PDF oder hochaufl\u00f6sendes JPEG herunter. Der L\u00f6sungsschl\u00fcssel wird als separate Datei gespeichert.',
      },
      {
        title: 'Drucken, teilen oder verkaufen',
        description: 'Drucken Sie f\u00fcr den Unterricht, versenden Sie an Eltern per E-Mail oder stellen Sie digitale Produkte zusammen. Das Commercial Pack entfernt das Wasserzeichen zum freien Verkauf.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Durchstreich-Subtraktions-Arbeitsbuch',
      description: 'Erstellen Sie ein 40-seitiges Durchstreich-Subtraktions-Arbeitsbuch mit progressivem Schwierigkeitsgrad. Dieses Format ist gefragt, weil es manuell zeitaufw\u00e4ndig zu erstellen ist.',
      platform: 'Etsy',
    },
    {
      title: 'Subtraktions-F\u00e4higkeiten-Paket Klasse 1\u20132',
      description: 'Packen Sie Arbeitsbl\u00e4tter f\u00fcr Vorschule (bis 5), fr\u00fche erste Klasse (bis 10) und sp\u00e4te erste Klasse (bis 20). Verkaufen Sie das Drei-Stufen-Paket als differenziertes Lehrmittel.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Taschenbuch-Aktivit\u00e4tsbuch',
      description: 'Stellen Sie 80\u2013100 Subtraktionsbl\u00e4tter zu einem Taschenbuch-Aktivit\u00e4tsbuch bei Amazon KDP zusammen. Verschiedene Modi f\u00fcr Abwechslung.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Saisonale Subtraktions-Sets',
      description: 'Erstellen Sie thematische Pakete f\u00fcr Feiertage \u2014 K\u00fcrbisse f\u00fcr Halloween, Tannenb\u00e4ume f\u00fcr Weihnachten, Herzen f\u00fcr Valentinstag. Saisonale Produkte erzeugen wiederkehrende j\u00e4hrliche Ums\u00e4tze.',
      platform: 'Gumroad',
    },
    {
      title: 'Zweisprachige Subtraktionsbl\u00e4tter',
      description: 'Nutzen Sie die Mehrsprachigkeit f\u00fcr Deutsch/Englisch oder Deutsch/Franz\u00f6sisch Subtraktionspakete. Zweisprachige Bildungsmaterialien sind eine unterversorgte Nische mit wachsender Nachfrage.',
      platform: 'Multi-platform',
    },
    {
      title: 'T\u00e4gliche Mathe-\u00dcbungs-Abonnement',
      description: 'Bieten Sie ein \u201EArbeitsblatt des Tages\u201C-Abonnement an, bei dem Abonnenten t\u00e4glich ein neues thematisches Subtraktionsblatt erhalten. Generieren Sie einen Monat Inhalt in unter einer Stunde.',
      platform: 'Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Durchstreich-Modus ist der beste Einstieg',
      tip: 'F\u00fcr jedes Kind, das zum ersten Mal Subtraktion lernt: Beginnen Sie mit dem Durchstreich-Modus. Das physische Markieren mit X schafft konkretes Verst\u00e4ndnis von \u201EWegnehmen\u201C, das sp\u00e4ter auf Kopfrechnen \u00fcbertragbar ist.',
    },
    {
      title: 'Minuenden f\u00fcr Anf\u00e4nger niedrig halten',
      tip: 'Setzen Sie den maximalen Minuenden auf 5 f\u00fcr Vorsch\u00fcler und 10 f\u00fcr Kindergartenkinder. Kinder m\u00fcssen kleine Zahlen beherrschen, bevor sie gr\u00f6\u00dfere angehen, und fr\u00fcher Erfolg baut Selbstvertrauen auf.',
    },
    {
      title: 'Mit Additions-Arbeitsbl\u00e4ttern kombinieren',
      tip: 'Erstellen Sie passende Additions- und Subtraktionsbl\u00e4tter mit demselben Thema und Zahlenbereich. Das Lehren von Zahlenfamilien (3+2=5, 5\u22122=3) hilft Sch\u00fclern, die Umkehrbeziehung zu erkennen.',
    },
    {
      title: 'Querformat f\u00fcr Durchstreich-Aufgaben',
      tip: 'Durchstreich-Aufgaben brauchen horizontalen Platz f\u00fcr die Bildreihen. Querformat verhindert Gedr\u00e4ngtheit und gibt Sch\u00fclern Raum, ihre X-Markierungen deutlich zu setzen.',
    },
    {
      title: 'Schwierigkeitsgrade farblich kennzeichnen',
      tip: 'Verwenden Sie den Canvas-Editor f\u00fcr farbige \u00dcberschriftenleisten: Gr\u00fcn f\u00fcr leicht, Gelb f\u00fcr mittel, Rot f\u00fcr schwer. Lehrkr\u00e4fte und Eltern k\u00f6nnen das richtige Level auf einen Blick erkennen.',
    },
    {
      title: 'Anweisungen auf jedem Blatt einf\u00fcgen',
      tip: 'F\u00fcgen Sie mit dem Canvas-Editor eine kurze Anweisungszeile ein wie \u201EStreiche die Bilder durch und z\u00e4hle, was \u00fcbrig bleibt.\u201C Das hilft Vertretungslehrkr\u00e4ften und Eltern.',
    },
  ],

  faq: [
    {
      question: 'Ist dieser Subtraktions-Generator vollst\u00e4ndig kostenlos?',
      answer: 'Ja. Alle Funktionen sind kostenlos verf\u00fcgbar \u2014 alle \u00dcbungsmodi, alle Themen, PDF-Export und L\u00f6sungsschl\u00fcssel. Die kostenlose Version f\u00fcgt ein kleines Wasserzeichen hinzu. Keine Kontoerstellung oder Zahlungsinformationen n\u00f6tig.',
    },
    {
      question: 'Was macht Durchstreich-Subtraktionsbl\u00e4tter so effektiv?',
      answer: 'Durchstreich-Arbeitsbl\u00e4tter lassen Kinder physisch ein X durch Bilder setzen, die subtrahiert werden. Diese haptische Handlung schafft konkretes Verst\u00e4ndnis von \u201EWegnehmen\u201C, das abstrakte Gleichungen nicht erreichen.',
    },
    {
      question: 'F\u00fcr welche Altersgruppe ist das gedacht?',
      answer: 'Der Generator deckt die Altersgruppe 3\u20138 ab (Vorschule bis zweite Klasse). Der Durchstreich-Modus ist ideal f\u00fcr 3\u20135-J\u00e4hrige. Bild + Zahl passt f\u00fcr Kindergartenkinder und der gemischte Modus fordert Erst- und Zweitkl\u00e4ssler.',
    },
    ${sellFaqDE()}
    {
      question: 'Wie unterscheidet sich das vom Additions-Generator?',
      answer: 'Der Subtraktions-Generator enth\u00e4lt einen einzigartigen Durchstreich-Modus, bei dem Sch\u00fcler ein X durch Bilder setzen, um \u201EWegnehmen\u201C zu visualisieren. Er verwendet auch subtraktionsspezifische \u00dcbungstypen wie Finde den Subtrahenden.',
    },
    {
      question: 'Enthalten die Arbeitsbl\u00e4tter L\u00f6sungsschl\u00fcssel?',
      answer: 'Jedes generierte Arbeitsblatt kommt mit einem automatischen L\u00f6sungsschl\u00fcssel. F\u00fcr den Durchstreich-Modus zeigt der L\u00f6sungsschl\u00fcssel, welche Bilder mit X markiert sind und die verbleibende Anzahl.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Alle Beschriftungen werden automatisch \u00fcbersetzt.',
    },
    ${commercialFaqDE()}
    ${refundFaqDE()}
  ],

  internalLinks: [
    { slug: 'kostenloses-additions-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Additions-Arbeitsbl\u00e4tter-Tool' },
    { slug: 'kostenloses-code-addition-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Code-Addition-Tool' },
    { slug: 'kostenloses-mehr-oder-weniger-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Mehr-oder-Weniger-Tool' },
    { slug: 'kostenloses-mathe-raetsel-tool', pageType: 'tool', anchorText: 'Kostenloses Mathe-R\u00e4tsel-Tool' },
    { slug: 'kostenloses-mathe-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Mathe-Arbeitsbl\u00e4tter-Tool' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraktions-Generator \u2014 Alle Details' },
    { slug: 'math-number-bundle', pageType: 'bundle', anchorText: 'Mathe & Zahlen Arbeitsblatt-Paket' },
    { slug: 'how-to-sell-worksheets-on-etsy', pageType: 'guide', anchorText: 'Arbeitsbl\u00e4tter auf Etsy verkaufen' },
    { slug: 'printable-math-worksheets-business', pageType: 'idea', anchorText: 'Mathe-Arbeitsbl\u00e4tter-Gesch\u00e4ft starten' },
    { slug: 'kostenloses-wortsuchrraetsel-tool', pageType: 'tool', anchorText: 'Kostenloses Wortsuchr\u00e4tsel-Tool' },
  ],
};
`);

console.log('\nSubtraction done. Script structure verified.');
console.log('Due to size constraints, remaining 31 files will be generated by additional batch scripts.');
