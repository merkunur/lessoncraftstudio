const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
function w(name, content) { fs.writeFileSync(path.join(d, name), content, 'utf8'); console.log('Created: ' + name); }
const cFC = `    { question: 'Kann ich die Arbeitsbl\u00e4tter kommerziell verkaufen?', answer: 'Mit einer Commercial-Lizenz k\u00f6nnen Sie auf Etsy, TPT, KDP und anderen Plattformen verkaufen. Die Full-Access-Lizenz umfasst alle 100+ Themen f\u00fcr vielf\u00e4ltige Produkterstellung.' },`;
const cFP = `    { question: 'Was kosten die Lizenzen?', answer: 'Einzelne App-Lizenzen kosten $27 f\u00fcr Commercial und $47 f\u00fcr Full Access. Wenn Sie mehrere Apps m\u00f6chten, sind B\u00fcndel f\u00fcr $79 (Commercial) und $119 (Full Access) erh\u00e4ltlich, die eine gesamte Werkzeugkategorie abdecken.' },`;
const cFR = `    { question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?', answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.' },`;
const bFP = `    { question: 'Was kosten die Arbeitsblatt-Generator-Tools?', answer: 'Einzelne Arbeitsblatt-Generator-Apps sind f\u00fcr $27 (Commercial-Lizenz) oder $47 (Full Access) erh\u00e4ltlich. Kategorie-B\u00fcndel mit mehreren verwandten Generatoren kosten $79 (Commercial) oder $119 (Full Access). Beide Stufen beinhalten lebenslangen Zugang und alle zuk\u00fcnftigen Updates.' },`;
const bFR = `    { question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?', answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles vorher zu testen.' },`;

// === 10. create-preposition-worksheets.ts ===
w('create-preposition-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-preposition-worksheets',
  locale: 'de',
  seo: {
    titleTag: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Pr\u00e4positionen-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Anleitung mit Tipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Pr\u00e4positionen Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: ['Pr\u00e4positionen Generator', 'r\u00e4umliche Begriffe \u00dcbungen', 'druckbare Pr\u00e4positions\u00fcbungen', 'Lagebeziehungen Arbeitsbl\u00e4tter', 'Pr\u00e4positionen \u00dcbungsblatt Generator'],
    lsiKeywords: ['r\u00e4umlicher Wortschatz', 'Lagebeziehungen', '\u00fcber unter neben', 'auf in unter Arbeitsbl\u00e4tter', 'Sprach\u00fcbungen', 'DaF Pr\u00e4positionen', 'r\u00e4umliches Bewusstsein'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/prepositions/sample-1.jpeg',
      primaryAlt: 'Individuelles Pr\u00e4positionen-Arbeitsblatt mit thematischen Illustrationen',
      secondary: '/samples/english/prepositions/sample-2.jpeg',
      secondaryAlt: 'R\u00e4umlicher Wortschatz-Aktivit\u00e4t f\u00fcr junge Lernende',
    },
    sampleGallery: [
      { src: '/samples/english/prepositions/sample-1.jpeg', alt: 'Pr\u00e4positionen-Arbeitsblatt', caption: 'Wo ist das Objekt? Aktivit\u00e4t' },
      { src: '/samples/english/prepositions/sample-2.jpeg', alt: 'Lagebeziehungs-Aktivit\u00e4t', caption: 'Lagebeziehungen \u00fcben' },
      { src: '/samples/english/prepositions/sample-3.jpeg', alt: 'Thematisches Pr\u00e4positionsblatt', caption: 'Thematische Pr\u00e4positions\u00fcbung' },
      { src: '/samples/english/prepositions/sample-4.jpeg', alt: 'Pr\u00e4positionen mit L\u00f6sung', caption: 'Arbeitsblatt mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'ifIXbViR5_o',
    videoTitle: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },
  hero: {
    title: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter f\u00fcr das Sprachlernen erstellen',
    description: 'Wenn Sie Pr\u00e4positionen-Arbeitsbl\u00e4tter mit visuellen Szenen und ansprechenden Themen erstellen, geben Sie Lernenden wesentliche \u00dcbung mit r\u00e4umlichem Wortschatz, der sowohl die Sprachentwicklung als auch das mathematische Denken unterst\u00fctzt. Pr\u00e4positionen wie \u201e\u00fcber\u201c, \u201eunter\u201c, \u201eneben\u201c, \u201ezwischen\u201c und \u201ehinter\u201c beschreiben r\u00e4umliche Beziehungen, die Kinder brauchen, um Anweisungen zu befolgen, Geschichten zu verstehen und Geometrieaufgaben zu l\u00f6sen. Unser Generator l\u00e4sst Sie visuelle Szenen aus \u00fcber 100 Themen aufbauen, in denen Objekte an bestimmten Positionen platziert sind. Sch\u00fcler identifizieren Pr\u00e4positionen, vervollst\u00e4ndigen S\u00e4tze oder zeichnen Objekte an beschriebenen Orten.',
  },
  introduction: 'Pr\u00e4positionen geh\u00f6ren zu den am h\u00e4ufigsten verwendeten W\u00f6rtern, sind aber \u00fcberraschend schwierig f\u00fcr viele Lernende. Junge Kinder m\u00fcssen lernen, dass \\u201eauf\\u201c, \\u201ein\\u201c und \\u201eunter\\u201c verschiedene r\u00e4umliche Beziehungen beschreiben. Fremdsprachenlerner k\u00e4mpfen, weil die Pr\u00e4positionsverwendung zwischen Sprachen dramatisch variiert. Visuelle Arbeitsbl\u00e4tter sind das ideale Werkzeug f\u00fcr Pr\u00e4positionsunterricht, weil r\u00e4umliche W\u00f6rter von Natur aus visuell sind. Ein Bild einer Katze AUF einem Tisch lehrt \\u201eauf\\u201c effektiver als jede verbale Erkl\u00e4rung. Unser Generator erstellt Pr\u00e4positionen-Arbeitsbl\u00e4tter mit thematischen visuellen Szenen. Sie w\u00e4hlen ein Thema, die Zielpr\u00e4positionen, und das Tool generiert Szenen, die Objekte in verschiedenen r\u00e4umlichen Beziehungen zeigen. Der Markt f\u00fcr Pr\u00e4positionen-Arbeitsbl\u00e4tter geht \u00fcber die fr\u00fche Kindheit hinaus. DaF-Programme nutzen sie intensiv. Logop\u00e4den setzen sie f\u00fcr Sprachentwicklungsziele ein.',
  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Pr\u00e4positionen-Arbeitsblatt',
    steps: [
      { title: 'Zielpr\u00e4positionen w\u00e4hlen', description: 'W\u00e4hlen Sie, welche Pr\u00e4positionen ge\u00fcbt werden: in, auf, unter, \u00fcber, neben, zwischen, hinter, vor. Beginnen Sie mit g\u00e4ngigen (in, auf, unter) f\u00fcr Anf\u00e4nger und f\u00fcgen Sie komplexere f\u00fcr Fortgeschrittene hinzu.' },
      { title: 'Pr\u00e4positionen-Generator \u00f6ffnen', description: 'Rufen Sie das Pr\u00e4positions-Tool \u00fcber Ihren Browser auf. W\u00e4hlen Sie Ihre Zielpr\u00e4positionen und die Oberfl\u00e4che zeigt verf\u00fcgbare Szenen und Konfigurationsoptionen.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das nat\u00fcrliche r\u00e4umliche Beziehungen bietet. Zimmerszenen (K\u00fcche, Schlafzimmer) bieten nat\u00fcrliche \\u201eauf dem Tisch\\u201c und \\u201ein der Schublade\\u201c-Kontexte.' },
      { title: '\u00dcbungstyp konfigurieren', description: 'W\u00e4hlen Sie zwischen Satzvervollst\u00e4ndigung (Pr\u00e4position einsetzen), Bildzuordnung (Pr\u00e4position der Szene zuordnen) oder Zeichen\u00fcbungen (Objekt an beschriebener Position zeichnen).' },
      { title: 'Visuelle Szenen aufbauen', description: 'Platzieren Sie Objekte in bestimmten r\u00e4umlichen Beziehungen. Jede Szene sollte eine Pr\u00e4position klar demonstrieren. Eindeutige Positionierung ist f\u00fcr effektives Lernen unerlassen.' },
      { title: 'Anweisungen hinzuf\u00fcgen', description: 'F\u00fcgen Sie klare Anweisungen f\u00fcr Ihre Zielgruppe hinzu. F\u00fcr junge Kinder: \\u201eWo ist die Katze? Kreise das Wort ein.\\u201c F\u00fcr Fremdsprachenlerner: \\u201eVervollst\u00e4ndigen Sie den Satz mit der richtigen Pr\u00e4position.\\u201c' },
      { title: 'Vorschau und Pr\u00fcfung', description: 'Pr\u00fcfen Sie, ob r\u00e4umliche Beziehungen klar dargestellt sind, Pr\u00e4positionen korrekt verwendet werden und der Schwierigkeitsgrad zu Ihrer Zielgruppe passt.' },
      { title: 'PDF herunterladen', description: 'Erstellen Sie das hochaufl\u00f6sende PDF mit Arbeitsblatt und L\u00f6sungsschl\u00fcssel.' },
      { title: 'Komplettes Set erstellen', description: 'Erstellen Sie Arbeitsbl\u00e4tter, die alle g\u00e4ngigen Pr\u00e4positionen mit mehreren \u00dcbungstypen abdecken. Ein umfassendes Set bietet wochenlange \u00dcbung und maximalen Wert f\u00fcr K\u00e4ufer.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie Ihre Arbeitsbl\u00e4tter und listen Sie auf Etsy, TPT oder KDP. Sprechen Sie sowohl Fr\u00fchp\u00e4dagogik- als auch DaF-Zielgruppen mit passenden Keywords an.' },
    ],
  },
  platformTips: [
    { platform: 'Etsy', title: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter auf Etsy', description: 'Sprechen Sie sowohl Eltern als auch DaF-Lehrkr\u00e4fte an. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 Arbeitsbl\u00e4ttern bei $4\\u2013$6. Keywords wie \\u201ePr\u00e4positionen \u00dcbungsbl\u00e4tter\\u201c und \\u201eLagebeziehungen \u00dcbungen\\u201c erreichen verschiedene K\u00e4ufersegmente.' },
    { platform: 'Teachers Pay Teachers', title: 'Pr\u00e4positions\u00fcbungen auf TPT', description: 'Richten Sie an Sprachstandards f\u00fcr Grundschule und DaF-Standards aus. F\u00fcgen Sie interaktive \u00dcbungen wie \\u201eZeichne die Katze unter den Tisch\\u201c neben traditionellen L\u00fccken\u00fcbungen ein. Logop\u00e4den sind eine starke TPT-Zielgruppe f\u00fcr Pr\u00e4positionsmaterial.' },
    { platform: 'Amazon KDP', title: 'Pr\u00e4positions-Arbeitshefte auf KDP', description: 'F\u00fcgen Sie Pr\u00e4positionsseiten in ein umfassenderes Sprach- oder DaF-Arbeitsheft ein. Ein \\u201eR\u00e4umlicher Wortschatz-Arbeitsheft\\u201c f\u00fcllt eine spezifische Nische.' },
  ],
  monetization: [
    { title: 'DaF-Grammatik-B\u00fcndel', description: 'Erstellen Sie Pr\u00e4positionspakete speziell f\u00fcr Deutsch-als-Fremdsprache-Lernende. Visuelle Szenen mit klaren r\u00e4umlichen Beziehungen und Satz\u00fcbungen. DaF-Ressourcen haben einen gro\u00dfen, wachsenden globalen Markt.' },
    { title: 'Logop\u00e4die-Ressourcen', description: 'Entwerfen Sie Arbeitsbl\u00e4tter f\u00fcr spezifische Therapieziele. Logop\u00e4den brauchen Material zur r\u00e4umlichen Wortschatzentwicklung und zahlen Premium-Preise f\u00fcr spezialisierte Materialien.' },
    { title: 'Mehrf\u00e4higkeiten-Sprachpakete', description: 'Kombinieren Sie Pr\u00e4positionen mit anderen Sprach\u00fcbungen: Wortschatzzuordnung, Satzbau und Leseverst\u00e4ndnis. Mehrf\u00e4higkeiten-Pakete dienen als umfassende Spracherg\u00e4nzungen.' },
  ],
  examples: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter dienen verschiedenen Lernenden mit unterschiedlichen Bed\u00fcrfnissen. Eine Kindergartenlehrerin nutzt Pr\u00e4positionen-Arbeitsbl\u00e4tter im Morgenkreis. Sie zeigt eine thematische Szene und Sch\u00fcler beschreiben abwechselnd, wo sich Objekte befinden: \\u201eDer Vogel sitzt auf dem Ast\\u201c und \\u201eDer Fisch ist unter dem Wasser\\u201c. Eine DaF-Lehrerin nutzt Pr\u00e4positionen-Arbeitsbl\u00e4tter mit erwachsenen Sprachlernenden. Das visuelle Arbeitsblattformat umgeht \u00fcbersetzungsbasiertes Lernen und baut direkte visuell-r\u00e4umliche Assoziationen auf. Eine Logop\u00e4din zielt auf Pr\u00e4positionsziele mit thematischen Arbeitsbl\u00e4ttern ab. W\u00e4hrend der Therapiesitzungen \u00fcben Klienten das Identifizieren und Produzieren r\u00e4umlichen Wortschatzes. Eine Etsy-Verk\u00e4uferin fand unerwartete Nachfrage bei Familien mit mehrsprachigem Hintergrund. Ihre thematischen B\u00fcndel funktionieren sowohl f\u00fcr deutschsprachige als auch f\u00fcr deutschlernende Kinder in derselben Familie.',
  faq: [
    { question: 'Welche Pr\u00e4positionen werden abgedeckt?', answer: 'Der Generator unterst\u00fctzt alle g\u00e4ngigen Pr\u00e4positionen einschlie\u00dflich in, auf, unter, \u00fcber, neben, zwischen, hinter, vor, und bei. Sie w\u00e4hlen, welche in jedem Arbeitsblatt enthalten sein sollen.' },
    { question: 'F\u00fcr welche Altersgruppen sind diese geeignet?', answer: 'Pr\u00e4positionen-Arbeitsbl\u00e4tter eignen sich f\u00fcr 3 Jahre bis Erwachsene. Junge Kinder lernen grundlegende Lagebeziehungen. \u00c4ltere Sch\u00fcler \u00fcben komplexe Pr\u00e4positionen. DaF-Lernende jeden Alters profitieren von visueller Pr\u00e4positions\u00fcbung.' },
    { question: 'Kann ich diese f\u00fcr DaF-Unterricht verwenden?', answer: 'Auf jeden Fall. Visuelle Pr\u00e4positionen-Arbeitsbl\u00e4tter sind eines der effektivsten DaF-Werkzeuge, weil sie r\u00e4umlichen Wortschatz durch Bilder statt \u00dcbersetzung lehren.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes Arbeitsblatt enth\u00e4lt einen passenden L\u00f6sungsschl\u00fcssel. F\u00fcr Satzvervollst\u00e4ndigung wird die korrekte Pr\u00e4position gezeigt. F\u00fcr Zuordnungs- und Zeichen\u00fcbungen werden die richtigen Verbindungen oder Positionen angegeben.' },
${cFC}
${cFP}
${cFR}
  ],
  internalLinks: [
    { slug: 'prepositions', pageType: 'app', anchorText: 'Pr\u00e4positionen-Generator' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'Zuordnungs-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-word-search-puzzles', pageType: 'guide', anchorText: 'Wortsuchr\u00e4tsel erstellen' },
    { slug: 'create-handwriting-sheets', pageType: 'guide', anchorText: 'Schreib\u00fcbungsbl\u00e4tter erstellen' },
  ],
};
`);

// === 11. create-cryptogram-puzzles.ts ===
w('create-cryptogram-puzzles.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-cryptogram-puzzles',
  locale: 'de',
  seo: {
    titleTag: 'Kryptogramm-R\u00e4tsel erstellen | Kostenlose Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Kryptogramm-R\u00e4tsel f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Anleitung mit Verkaufstipps f\u00fcr Etsy, TPT und KDP.',
    primaryKeyword: 'Kryptogramm R\u00e4tsel erstellen',
    secondaryKeywords: ['Kryptogramm Generator', 'Geheimschrift R\u00e4tsel', 'druckbare Verschl\u00fcsselungsr\u00e4tsel', 'Code-R\u00e4tsel erstellen', 'Entschl\u00fcsselungs\u00fcbungen'],
    lsiKeywords: ['Code knacken R\u00e4tsel', 'Buchstabenersetzung', 'Geheimbotschaft entschl\u00fcsseln', 'Chiffre-R\u00e4tsel', 'kritisches Denken', 'Wortschatz-R\u00e4tsel', 'Rechtschreibung Code-\u00dcbungen'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/cryptogram/sample-1.jpeg',
      primaryAlt: 'Individuelles Kryptogramm-R\u00e4tsel mit thematischem Design',
      secondary: '/samples/english/cryptogram/sample-2.jpeg',
      secondaryAlt: 'Entschl\u00fcssele-die-Botschaft-R\u00e4tsel f\u00fcr Sch\u00fcler',
    },
    sampleGallery: [
      { src: '/samples/english/cryptogram/sample-1.jpeg', alt: 'Kryptogramm-R\u00e4tsel', caption: 'Entschl\u00fcssele die Geheimbotschaft' },
      { src: '/samples/english/cryptogram/sample-2.jpeg', alt: 'Thematisches Code-R\u00e4tsel', caption: 'Thematische Kryptogramm-Aktivit\u00e4t' },
      { src: '/samples/english/cryptogram/sample-3.jpeg', alt: 'Bilder-Code-R\u00e4tsel', caption: 'Bildbasiertes Kryptogramm' },
      { src: '/samples/english/cryptogram/sample-4.jpeg', alt: 'Kryptogramm mit L\u00f6sung', caption: 'R\u00e4tsel mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '9U0BIIjCnco',
    videoTitle: 'Kryptogramm-R\u00e4tsel erstellen \u2014 Komplette Anleitung',
  },
  hero: {
    title: 'Kryptogramm-R\u00e4tsel erstellen, die herausfordern und fesseln',
    description: 'Wenn Sie Kryptogramm-R\u00e4tsel erstellen, verbinden Sie die Aufregung des Code-Knackens mit Wortschatz- und Rechtschreib\u00fcbung in einem Format, das Sch\u00fcler unwiderstehlich finden. Kryptogramme verwenden Buchstabenersetzung zum Verschl\u00fcsseln von Botschaften, und Sch\u00fcler m\u00fcssen den Code knacken, um versteckte W\u00f6rter oder S\u00e4tze zu enth\u00fcllen. Unser Generator l\u00e4sst Sie beliebigen Text eingeben, aus \u00fcber 100 visuellen Themen w\u00e4hlen und professionelle R\u00e4tsel mit L\u00f6sungsschl\u00fcsseln erstellen. Die Schwierigkeit skaliert von einfachen Bilder-Codes f\u00fcr junge Kinder bis zu komplexer Buchstabenersetzung f\u00fcr \u00e4ltere Sch\u00fcler.',
  },
  introduction: 'Kryptogramme faszinieren Menschen seit Jahrhunderten. Der p\u00e4dagogische Wert ist betr\u00e4chtlich: Das L\u00f6sen eines Kryptogramms erfordert Mustererkennung, Buchstabenh\u00e4ufigkeitsanalyse, Wortschatzwissen und logische Deduktion. F\u00fcr Sch\u00fcler verwandelt das Code-Knack-Element eine Rechtschreib- oder Wortschatz\u00fcbung in ein spannendes R\u00e4tselabenteuer. Das Format passt sich an viele Altersstufen an. Junge Kinder l\u00f6sen Bilder-Code-Kryptogramme, bei denen jedes Symbol einen Buchstaben darstellt. \u00c4ltere Sch\u00fcler bew\u00e4ltigen Standard-Buchstabenersetzungs-Kryptogramme. Unser Generator automatisiert den Erstellungsprozess. Sie geben den zu verschl\u00fcsselnden Text ein, w\u00e4hlen den Code-Typ und ein visuelles Thema, und das Tool erstellt ein komplettes R\u00e4tsel mit L\u00f6sung. Im Printable-Markt bedienen Kryptogramm-R\u00e4tsel eine einzigartige Position. Sie sind sowohl bei Kindern als auch bei Erwachsenen beliebt.',
  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Kryptogramm-R\u00e4tsel',
    steps: [
      { title: 'Code-Typ w\u00e4hlen', description: 'W\u00e4hlen Sie zwischen Bilder-Codes (Symbole ersetzen Buchstaben \u2014 ideal f\u00fcr 4\\u20137 Jahre), Zahlen-Codes (Zahlen ersetzen Buchstaben \u2014 6\\u201310 Jahre) oder Buchstabenersetzung (jeder Buchstabe wird einem anderen zugeordnet \u2014 ab 8 Jahren).' },
      { title: 'Kryptogramm-Generator \u00f6ffnen', description: 'Rufen Sie das Kryptogramm-Tool \u00fcber Ihren Browser auf. W\u00e4hlen Sie Ihren Code-Typ und die Oberfl\u00e4che passt sich mit passenden Optionen an.' },
      { title: 'Botschaft eingeben', description: 'Geben Sie das Wort, den Satz oder die Phrase ein, die verschl\u00fcsselt werden soll. F\u00fcr junge Kinder einzelne W\u00f6rter (Vokabeln oder Lernw\u00f6rter). F\u00fcr \u00e4ltere Sch\u00fcler S\u00e4tze oder lustige Zitate.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das zur R\u00e4tselstimmung passt. Ein Spion-Thema f\u00fcgt Spannung hinzu. Ein Weltraum-Thema schafft eine \\u201eAlien-Botschaft entschl\u00fcsseln\\u201c-Erz\u00e4hlung.' },
      { title: 'Hinweise konfigurieren', description: 'Legen Sie die Anzahl der bereits entschl\u00fcsselten Buchstaben als Hinweise fest. Mehr Hinweise machen das R\u00e4tsel einfacher. F\u00fcr Anf\u00e4nger 3\\u20134 Buchstaben aufdecken. F\u00fcr Fortgeschrittene keine Hinweise geben.' },
      { title: 'Layout anpassen', description: 'Konfigurieren Sie die Code-Schl\u00fcssel-Anzeige (f\u00fcr Bilder-Codes), den Abstand zwischen verschl\u00fcsselten Zeichen und das Gesamtseitenlayout.' },
      { title: 'R\u00e4tsel-Vorschau', description: 'Pr\u00fcfen Sie, ob die Verschl\u00fcsselung korrekt ist, Hinweise hilfreich aber nicht zu verr\u00e4terisch sind und die Schwierigkeit sich richtig anf\u00fchlt.' },
      { title: 'Mit L\u00f6sungsschl\u00fcssel herunterladen', description: 'Erstellen Sie das PDF mit R\u00e4tsel und entschl\u00fcsselter L\u00f6sung auf separaten Seiten.' },
      { title: 'Thematisches Set erstellen', description: 'Erstellen Sie 10\\u201320 Kryptogramme mit progressiver Schwierigkeit. Beginnen Sie mit kurzen W\u00f6rtern und vielen Hinweisen, steigern Sie zu l\u00e4ngeren S\u00e4tzen mit weniger Hinweisen.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie R\u00e4tsel zu thematischen Produkten. Der \\u201eGeheimbotschaft\\u201c-Winkel spricht sowohl Kinder als auch Erwachsene an.' },
    ],
  },
  platformTips: [
    { platform: 'Etsy', title: 'Kryptogramm-R\u00e4tsel auf Etsy', description: 'Positionieren Sie Kryptogramme als Gehirntraining oder Code-Knack-Aktivit\u00e4ten. Erstellen Sie thematische B\u00fcndel mit 15\\u201320 R\u00e4tseln bei $4\\u2013$6. \\u201eGeheimbotschaft\\u201c und \\u201eCode knacken\\u201c Keywords ziehen Klicks an.' },
    { platform: 'Teachers Pay Teachers', title: 'Entschl\u00fcsselungs\u00fcbungen auf TPT', description: 'Lehrkr\u00e4fte nutzen Kryptogramme zur Wortschatzwiederholung und Rechtschreib\u00fcbung. Erstellen Sie fachspezifische Sets: Naturwissenschaftsvokabular entschl\u00fcsseln, historische Fakten dekodieren.' },
    { platform: 'Amazon KDP', title: 'Kryptogramm-R\u00e4tselb\u00fccher auf KDP', description: 'Kryptogramm-B\u00fccher verkaufen sich gut auf Amazon f\u00fcr Kinder und Erwachsene. Stellen Sie 80\\u2013100 R\u00e4tsel mit progressiver Schwierigkeit zusammen.' },
  ],
  monetization: [
    { title: 'Wortschatz-Code-Knacker', description: 'Erstellen Sie Kryptogramm-Sets, deren entschl\u00fcsselte Botschaften Fachvokabular aus bestimmten Gebieten sind. Naturwissenschafts-, Geschichts- und Lernwort-Kryptogramme bedienen Bildungsm\u00e4rkte.' },
    { title: 'Erwachsenen-R\u00e4tselb\u00fccher', description: 'Stellen Sie Buchstabenersetzungs-Kryptogramme mit ber\u00fchmten Zitaten zu Erwachsenen-R\u00e4tselb\u00fcchern f\u00fcr KDP zusammen. Erwachsenen-Kryptogramm-B\u00fccher sind eine bew\u00e4hrte Amazon-Kategorie.' },
    { title: 'Escape-Room-Kits f\u00fcr den Unterricht', description: 'Entwerfen Sie eine Serie von Kryptogrammen als \\u201eEscape Room\\u201c-Herausforderung. Sch\u00fcler m\u00fcssen jede Botschaft entschl\u00fcsseln, um den Hinweis f\u00fcr das n\u00e4chste R\u00e4tsel zu erhalten. Diese Premium-Produkte verkaufen sich f\u00fcr $8\\u2013$15.' },
  ],
  examples: 'Kryptogramm-R\u00e4tsel fesseln Sch\u00fcler auf Weisen, die Standard-Arbeitsbl\u00e4tter nicht erreichen. Eine Drittklasslehrerin nutzt Wortschatz-Kryptogramme als Freitags-Wiederholungsaktivit\u00e4t. Sch\u00fcler entschl\u00fcsseln W\u00f6rter aus der Sachkundeeinheit der Woche, und das Code-Knack-Format macht sie begeistert, Vokabeln zu \u00fcben. Sie berichtet, dass sich Testergebnisse bei Wortschatzabfragen sp\u00fcrbar verbessert haben. Eine Mutter im Heimunterricht nutzt Kryptogramm-R\u00e4tsel, um Rechtschreib\u00fcbung spa\u00dfig zu gestalten. Statt Lernw\u00f6rter f\u00fcnfmal abzuschreiben, entschl\u00fcsseln ihre Kinder Geheimbotschaften mit den Lernw\u00f6rtern. Eine Etsy-Verk\u00e4uferin hat eine \\u201eCode-Knacker-Akademie\\u201c-Marke mit progressiven Kryptogramm-Sets aufgebaut. Level 1 nutzt Bilder-Codes f\u00fcr 4\\u20136 Jahre. Level 2 nutzt Zahlen-Codes f\u00fcr 6\\u20138 Jahre. Level 3 nutzt Buchstabenersetzung f\u00fcr 8+ Jahre. Die Marke generiert monatlich \u00fcber $400.',
  faq: [
    { question: 'F\u00fcr welche Altersgruppen sind Kryptogramm-R\u00e4tsel geeignet?', answer: 'Kryptogramme eignen sich f\u00fcr 4 Jahre bis Erwachsene. Junge Kinder nutzen Bilder-Codes mit vorgegebenem Schl\u00fcssel. Grundsch\u00fcler nutzen Zahlen-Codes. \u00c4ltere Sch\u00fcler und Erwachsene l\u00f6sen Buchstabenersetzungs-Kryptogramme.' },
    { question: 'Welche Code-Typen sind verf\u00fcgbar?', answer: 'Der Generator unterst\u00fctzt Bilder-Codes (Symbole f\u00fcr Buchstaben), Zahlen-Codes (Zahlen f\u00fcr Buchstaben) und Buchstabenersetzungs-Codes (jeder Buchstabe wird einem anderen zugeordnet). W\u00e4hlen Sie basierend auf Alter und F\u00e4higkeit Ihrer Zielgruppe.' },
    { question: 'Kann ich eigene Botschaften eingeben?', answer: 'Ja. Sie geben ein beliebiges Wort, eine Phrase oder einen Satz ein, und der Generator verschl\u00fcsselt ihn automatisch. Verwenden Sie Vokabelw\u00f6rter, Lernw\u00f6rter, lustige Fakten oder ber\u00fchmte Zitate.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes R\u00e4tsel enth\u00e4lt einen vollst\u00e4ndigen L\u00f6sungsschl\u00fcssel mit Code-Zuordnung und entschl\u00fcsselter Botschaft auf einer separaten Seite.' },
${cFC}
${cFP}
${cFR}
  ],
  internalLinks: [
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Kryptogramm-R\u00e4tsel Generator' },
    { slug: 'create-word-search-puzzles', pageType: 'guide', anchorText: 'Wortsuchr\u00e4tsel erstellen' },
    { slug: 'create-crossword-puzzles', pageType: 'guide', anchorText: 'Kreuzwortr\u00e4tsel erstellen' },
    { slug: 'create-math-puzzle-worksheets', pageType: 'guide', anchorText: 'Mathe-R\u00e4tsel erstellen' },
  ],
};
`);

// === 12. create-chart-count-worksheets.ts ===
w('create-chart-count-worksheets.ts', `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'create-chart-count-worksheets',
  locale: 'de',
  seo: {
    titleTag: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter erstellen | Anleitung',
    metaDescription: 'Lernen Sie, wie Sie individuelle Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter f\u00fcr den Unterricht oder Ihr Printable-Business erstellen. Anleitung mit Verkaufstipps f\u00fcr Etsy und KDP.',
    primaryKeyword: 'Diagramm Z\u00e4hl Arbeitsbl\u00e4tter erstellen',
    secondaryKeywords: ['Strichlisten Arbeitsbl\u00e4tter', 'Z\u00e4hlen und Darstellen Generator', 'druckbare Diagramm\u00fcbungen', 'Daten-Arbeitsbl\u00e4tter erstellen', 'Diagramm-Z\u00e4hl-Generator'],
    lsiKeywords: ['Datenerhebung Aktivit\u00e4ten', 'Strichlisten und Diagramme', 'Bilddiagramm Arbeitsbl\u00e4tter', 'Z\u00e4hlen und Darstellen', 'fr\u00fche Datenkompetenz', 'Kindergarten Diagramme', 'Daten\u00fcbungen erste Klasse'],
  },
  visuals: {
    heroImages: {
      primary: '/samples/english/chart count/sample-1.jpeg',
      primaryAlt: 'Individuelles Diagramm-Z\u00e4hl-Arbeitsblatt mit thematischen Illustrationen',
      secondary: '/samples/english/chart count/sample-2.jpeg',
      secondaryAlt: 'Diagramm-Z\u00e4hl- und Darstellungsaktivit\u00e4t f\u00fcr Sch\u00fcler',
    },
    sampleGallery: [
      { src: '/samples/english/chart count/sample-1.jpeg', alt: 'Diagramm-Z\u00e4hl-Arbeitsblatt', caption: 'Z\u00e4hlen und Darstellen' },
      { src: '/samples/english/chart count/sample-2.jpeg', alt: 'Strichlisten-Arbeitsblatt', caption: 'Strichlisten und Aufzeichnen' },
      { src: '/samples/english/chart count/sample-3.jpeg', alt: 'Bilddiagramm-Aktivit\u00e4t', caption: 'Bilddiagramm Z\u00e4hlen' },
      { src: '/samples/english/chart count/sample-4.jpeg', alt: 'Daten-Arbeitsblatt mit L\u00f6sung', caption: 'Diagramm-Z\u00e4hlen mit L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter erstellen \u2014 Komplette Anleitung',
  },
  hero: {
    title: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter f\u00fcr Datenkompetenz erstellen',
    description: 'Wenn Sie Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter mit ansprechenden Themen erstellen, lehren Sie Kinder, Daten zu sammeln, zu ordnen und zu interpretieren \u2014 F\u00e4higkeiten, die in unserer datengetriebenen Welt immer wichtiger werden. Diagramm-Z\u00e4hl-Aktivit\u00e4ten pr\u00e4sentieren thematische Bilder, die Sch\u00fcler z\u00e4hlen, in Strichlisten eintragen und in Diagrammen darstellen, wobei Z\u00e4hl\u00fcbung mit fr\u00fcher Datenkompetenz kombiniert wird. Unser Generator l\u00e4sst Sie aus \u00fcber 100 visuellen Themen w\u00e4hlen, Datenkategorien konfigurieren und professionelle Arbeitsbl\u00e4tter mit L\u00f6sungsschl\u00fcsseln erstellen.',
  },
  introduction: 'Datenkompetenz beginnt fr\u00fch, und Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter sind die perfekte Einf\u00fchrung. Wenn Kinder thematische Objekte z\u00e4hlen, ihre Strichlisten f\u00fchren und einfache Diagramme erstellen, \u00fcben sie die gleichen Datenerhebungs- und Visualisierungsf\u00e4higkeiten, die in Naturwissenschaft, Wirtschaft und Journalismus verwendet werden. Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter kombinieren mehrere F\u00e4higkeiten in einer einzigen Aktivit\u00e4t. Sch\u00fcler scannen zun\u00e4chst eine Szene oder Sammlung thematischer Bilder, identifizieren und z\u00e4hlen jeden Typ. Dann erfassen sie ihre Z\u00e4hlungen mit Strichmarkierungen, Zahlen oder farbigen Diagrammbalken. Schlie\u00dflich beantworten sie Vergleichsfragen: \\u201eWelches Tier kam am h\u00e4ufigsten vor?\\u201c oder \\u201eWie viele Katzen mehr als Hunde hast du gez\u00e4hlt?\\u201c Unser Generator rationalisiert den Erstellungsprozess. Im Printable-Markt bedienen Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter eine spezifische Nische mit weniger Wettbewerb als grundlegende Z\u00e4hl- oder Mathe-Arbeitsbl\u00e4tter.',
  tutorial: {
    title: 'Schritt f\u00fcr Schritt: Ihr erstes Diagramm-Z\u00e4hl-Arbeitsblatt',
    steps: [
      { title: 'Datenkategorien w\u00e4hlen', description: 'Entscheiden Sie, was Sch\u00fcler z\u00e4hlen und kategorisieren werden. F\u00fcr ein Zoo-Thema k\u00f6nnten die Kategorien L\u00f6wen, Elefanten, Giraffen und Affen sein. Drei bis f\u00fcnf Kategorien funktionieren f\u00fcr die meisten Altersgruppen.' },
      { title: 'Diagramm-Z\u00e4hl-Generator \u00f6ffnen', description: 'Rufen Sie das Tool \u00fcber Ihren Browser auf. W\u00e4hlen Sie Ihr Thema und Datenkategorien.' },
      { title: 'Visuelles Thema w\u00e4hlen', description: 'W\u00e4hlen Sie ein Thema, das zu Ihren Kategorien passt. Tiere, Fahrzeuge, Lebensmittel und Natur bieten nat\u00fcrliche Z\u00e4hlkategorien.' },
      { title: 'Objektmengen konfigurieren', description: 'Legen Sie fest, wie viele von jedem Objekttyp in der Szene erscheinen. Variieren Sie die Mengen f\u00fcr interessante Daten: einige Kategorien sollten mehr Objekte haben als andere.' },
      { title: 'Diagrammformat w\u00e4hlen', description: 'W\u00e4hlen Sie zwischen Strichlisten, S\u00e4ulendiagrammen, Bilddiagrammen oder Zahlenerfassung. Strichlisten f\u00fcr Kindergarten. S\u00e4ulendiagramme f\u00fcr erste und zweite Klasse.' },
      { title: 'Analysefragen hinzuf\u00fcgen', description: 'F\u00fcgen Sie Fragen hinzu, die Dateninterpretation erfordern: \\u201eWelche Kategorie hat am meisten?\\u201c \\u201eWie viele X mehr als Y?\\u201c Diese Fragen bauen Verst\u00e4ndnis \u00fcber einfaches Z\u00e4hlen hinaus auf.' },
      { title: 'Arbeitsblatt-Vorschau', description: '\u00dcberpr\u00fcfen Sie Bildersammlung, Erfassungsdiagramm und Fragen. Pr\u00fcfen Sie, ob Mengen korrekt und das Diagrammformat angemessen ist.' },
      { title: 'Mit L\u00f6sungsschl\u00fcssel herunterladen', description: 'Erstellen Sie das PDF mit Arbeitsblatt und vollst\u00e4ndigem L\u00f6sungsschl\u00fcssel.' },
      { title: 'Thematisches Set erstellen', description: 'Erstellen Sie 10\\u201315 Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter mit verschiedenen Themen und Kategorien.' },
      { title: 'Verpacken und verkaufen', description: 'B\u00fcndeln Sie Ihre Arbeitsbl\u00e4tter und listen Sie auf Etsy, TPT oder KDP. Heben Sie die Datenkompetenz-F\u00e4higkeiten hervor. Positionieren Sie als \\u201eZ\u00e4hlen und Darstellen\\u201c oder \\u201eFr\u00fche Datenkompetenz\\u201c.' },
    ],
  },
  platformTips: [
    { platform: 'Etsy', title: 'Diagramm-Z\u00e4hlen auf Etsy', description: 'Eltern suchen nach Z\u00e4hl-Arbeitsbl\u00e4ttern, und Diagramm-Z\u00e4hlen bietet etwas Besonderes. Erstellen Sie thematische B\u00fcndel mit 12\\u201318 Arbeitsbl\u00e4ttern bei $4\\u2013$6.' },
    { platform: 'Teachers Pay Teachers', title: 'Daten\u00fcbungen auf TPT', description: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter sind direkt an die Bildungsstandards f\u00fcr Daten und Messen ausgerichtet. Heben Sie die Standardausrichtung deutlich hervor.' },
    { platform: 'Amazon KDP', title: 'Z\u00e4hl- und Diagramm-B\u00fccher auf KDP', description: 'Stellen Sie Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter zu einem Mathe-Arbeitsheft zusammen, das Z\u00e4hlen, Strichlisten und Diagramme abdeckt.' },
  ],
  monetization: [
    { title: 'Standardbasierte Dateneinheiten', description: 'Erstellen Sie komplette Dateneinheiten-Pakete, die an bestimmte Klassenstufen-Standards ausgerichtet sind. Lehrkr\u00e4fte zahlen Premium-Preise f\u00fcr komplette, standardbasierte Einheiten.' },
    { title: 'F\u00e4cher\u00fcbergreifende Datenpakete', description: 'Entwerfen Sie Diagramm-Z\u00e4hl-Aktivit\u00e4ten verbunden mit Sachkunde- oder Gesellschaftskundethemen. \\u201eLebensr\u00e4ume z\u00e4hlen\\u201c oder \\u201eWetter darstellen\\u201c integrieren Datenf\u00e4higkeiten mit Fachlernen.' },
    { title: 'Mehrformat-Daten-B\u00fcndel', description: 'B\u00fcndeln Sie Arbeitsbl\u00e4tter, die mehrere Diagrammformate abdecken: Strichlisten, S\u00e4ulendiagramme, Bilddiagramme und Kreisdiagramme. Die Progression durch Formate bietet ein komplettes Datenkompetenz-Curriculum.' },
  ],
  examples: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter bringen Datenkompetenz zum Leben in verschiedenen p\u00e4dagogischen Umgebungen. Eine Kindergartenlehrerin nutzt thematische Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter w\u00e4hrend ihrer Mathe-Dateneinheit. Sch\u00fcler z\u00e4hlen Tiere in einer Szene, tragen Strichlisten in ein Diagramm ein und beantworten \\u201eWelches hat mehr?\\u201c-Fragen. Eine Erstklasslehrerin nutzt die Arbeitsbl\u00e4tter als Grundlage f\u00fcr Diagramm-Stunden. Sch\u00fcler z\u00e4hlen zun\u00e4chst thematische Objekte selbstst\u00e4ndig, dann erstellt die Klasse gemeinsam ein S\u00e4ulendiagramm an der Tafel. Eine Etsy-Verk\u00e4uferin bemerkte, dass Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter eine L\u00fccke in ihrem Produktangebot f\u00fcllten. W\u00e4hrend sie viele grundlegende Z\u00e4hl-Arbeitsbl\u00e4tter hatte, zog der Daten- und Diagramm-Winkel einen anderen K\u00e4ufer an. Eine Mutter im Heimunterricht nutzt Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter, um Alltagsbez\u00fcge herzustellen.',
  faq: [
    { question: 'Welche Diagrammformate sind verf\u00fcgbar?', answer: 'Der Generator unterst\u00fctzt Strichlisten, S\u00e4ulendiagramme, Bilddiagramme und einfache Zahlenerfassung. W\u00e4hlen Sie das Format passend zum Niveau Ihrer Sch\u00fcler und Ihren Lehrplananforderungen.' },
    { question: 'F\u00fcr welche Altersgruppen sind Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter geeignet?', answer: 'Diagramm-Z\u00e4hl-Arbeitsbl\u00e4tter eignen sich f\u00fcr Kinder von 4 bis 8 Jahren. Vorschulkinder z\u00e4hlen und notieren Zahlen. Kindergartenkinder erstellen Strichlisten. Erst- und Zweitkl\u00e4ssler bauen S\u00e4ulendiagramme und Bilddiagramme.' },
    { question: 'Enthalten die Arbeitsbl\u00e4tter Analysefragen?', answer: 'Sie k\u00f6nnen Vergleichsfragen einf\u00fcgen wie \\u201eWelches hat mehr?\\u201c und \\u201eWie viele X mehr als Y?\\u201c Diese Fragen entwickeln Dateninterpretationsf\u00e4higkeiten \u00fcber einfaches Z\u00e4hlen hinaus.' },
    { question: 'Sind L\u00f6sungsschl\u00fcssel enthalten?', answer: 'Jedes Arbeitsblatt enth\u00e4lt einen vollst\u00e4ndigen L\u00f6sungsschl\u00fcssel mit korrekten Z\u00e4hlungen, ausgef\u00fcllten Diagrammen und Fragenantworten auf einer separaten Seite.' },
${cFC}
${cFP}
${cFR}
  ],
  internalLinks: [
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm-Z\u00e4hl-Generator' },
    { slug: 'create-counting-worksheets', pageType: 'guide', anchorText: 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-addition-worksheets', pageType: 'guide', anchorText: 'Additions-Arbeitsbl\u00e4tter erstellen' },
    { slug: 'create-pattern-worksheets', pageType: 'guide', anchorText: 'Muster-Arbeitsbl\u00e4tter erstellen' },
  ],
};
`);

console.log('Files 10-12 done (all product creation guides complete)');
