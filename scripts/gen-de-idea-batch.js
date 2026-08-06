const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const missing = [
  'bulk-licensing-printable-ideas', 'camping-printable-ideas', 'construction-printable-ideas',
  'custom-worksheet-service-ideas', 'digital-download-printable-ideas', 'esl-printable-ideas',
  'fairy-tale-printable-ideas', 'first-grade-printable-ideas', 'food-cooking-printable-ideas',
  'homeschool-printable-ideas', 'kindergarten-printable-ideas', 'math-facts-printable-ideas',
  'music-printable-ideas', 'party-supply-printable-ideas', 'physical-printable-product-ideas',
  'pirates-printable-ideas', 'preschool-printable-ideas', 'print-on-demand-printable-ideas',
  'second-grade-printable-ideas', 'space-printable-ideas', 'special-education-printable-ideas',
  'sports-printable-ideas', 'subscription-box-printable-ideas', 'summer-learning-printable-ideas',
  'third-grade-printable-ideas', 'transportation-printable-ideas', 'underwater-printable-ideas',
];

const titles = {
  'bulk-licensing-printable-ideas': 'Mengen-Lizenzierung Druckbare Ideen',
  'camping-printable-ideas': 'Camping Druckbare Gesch\u00e4ftsideen',
  'construction-printable-ideas': 'Baustelle Druckbare Gesch\u00e4ftsideen',
  'custom-worksheet-service-ideas': 'Individuelle Arbeitsblatt-Service Ideen',
  'digital-download-printable-ideas': 'Digitaler Download Druckbare Ideen',
  'esl-printable-ideas': 'DaF Druckbare Gesch\u00e4ftsideen',
  'fairy-tale-printable-ideas': 'M\u00e4rchen Druckbare Gesch\u00e4ftsideen',
  'first-grade-printable-ideas': 'Erste Klasse Druckbare Gesch\u00e4ftsideen',
  'food-cooking-printable-ideas': 'Essen und Kochen Druckbare Ideen',
  'homeschool-printable-ideas': 'Homeschooling Druckbare Gesch\u00e4ftsideen',
  'kindergarten-printable-ideas': 'Kindergarten Druckbare Gesch\u00e4ftsideen',
  'math-facts-printable-ideas': 'Mathe-Fakten Druckbare Gesch\u00e4ftsideen',
  'music-printable-ideas': 'Musik Druckbare Gesch\u00e4ftsideen',
  'party-supply-printable-ideas': 'Partybedarf Druckbare Gesch\u00e4ftsideen',
  'physical-printable-product-ideas': 'Physische Druckbare Produkt-Ideen',
  'pirates-printable-ideas': 'Piraten Druckbare Gesch\u00e4ftsideen',
  'preschool-printable-ideas': 'Vorschule Druckbare Gesch\u00e4ftsideen',
  'print-on-demand-printable-ideas': 'Print-on-Demand Druckbare Ideen',
  'second-grade-printable-ideas': 'Zweite Klasse Druckbare Gesch\u00e4ftsideen',
  'space-printable-ideas': 'Weltraum Druckbare Gesch\u00e4ftsideen',
  'special-education-printable-ideas': 'Sonderp\u00e4dagogik Druckbare Ideen',
  'sports-printable-ideas': 'Sport Druckbare Gesch\u00e4ftsideen',
  'subscription-box-printable-ideas': 'Abo-Box Druckbare Gesch\u00e4ftsideen',
  'summer-learning-printable-ideas': 'Sommer-Lernen Druckbare Ideen',
  'third-grade-printable-ideas': 'Dritte Klasse Druckbare Gesch\u00e4ftsideen',
  'transportation-printable-ideas': 'Transport Druckbare Gesch\u00e4ftsideen',
  'underwater-printable-ideas': 'Unterwasser Druckbare Gesch\u00e4ftsideen',
};

function gen(ideaId) {
  const title = titles[ideaId];
  const nicheWord = title.replace(' Druckbare Gesch\u00e4ftsideen', '').replace(' Druckbare Ideen', '').replace(' Druckbare Produkt-Ideen', '');

  return `import type { NicheIdeaContent } from '../types';

export const content: NicheIdeaContent = {
  ideaId: '${ideaId}',
  locale: 'de',

  seo: {
    titleTag: '${title} | Druckbare Produkte Nische',
    metaDescription: 'Entdecken Sie profitable Gesch\u00e4ftsideen f\u00fcr ${nicheWord.toLowerCase()}-Druckbare. Erfahren Sie, welche Arbeitsbl\u00e4tter und Lernmaterialien sich in dieser Nische am besten verkaufen.',
    primaryKeyword: '${nicheWord.toLowerCase()} druckbare Gesch\u00e4ftsideen',
    secondaryKeywords: ['${nicheWord.toLowerCase()} Arbeitsbl\u00e4tter verkaufen', '${nicheWord.toLowerCase()} Lernmaterialien', 'druckbare ${nicheWord.toLowerCase()} Produkte', '${nicheWord.toLowerCase()} Etsy Druckbare', '${nicheWord.toLowerCase()} Nische'],
    lsiKeywords: ['druckbare Produkte verkaufen', 'Arbeitsblatt Generator', 'passives Einkommen', 'Nischen-Marketing', 'Etsy Druckbare', 'Amazon KDP B\u00fccher', 'Teachers Pay Teachers', 'Lernmaterialien erstellen'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: 'Professionelles Arbeitsblatt-Beispiel f\u00fcr ${nicheWord}-Druckbare',
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: '${nicheWord} Arbeitsblatt Beispiel', caption: '${nicheWord}-Thema' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: '${title} \u2014 So starten Sie',
  },

  hero: {
    title: '${title}',
    description: \`Die ${nicheWord}-Nische bietet hervorragende M\u00f6glichkeiten f\u00fcr Verk\u00e4ufer von druckbaren Lernmaterialien. Kinder und Eltern lieben ${nicheWord.toLowerCase()}-Themen, und die Nachfrage nach thematischen Arbeitsbl\u00e4ttern in diesem Bereich w\u00e4chst stetig. Ob auf Etsy, Amazon KDP oder Teachers Pay Teachers \u2014 ${nicheWord.toLowerCase()}-Druckbare verkaufen sich das ganze Jahr \u00fcber.

Dieser Leitfaden zeigt Ihnen die besten Produktideen in der ${nicheWord}-Nische, erkl\u00e4rt welche Arbeitsbl\u00e4tter am beliebtesten sind und gibt Ihnen konkrete Strategien f\u00fcr Erstellung, Preisgestaltung und Vermarktung. Alle vorgestellten Produkte k\u00f6nnen mit den kostenlosen Generatoren von LessonCraftStudio erstellt werden.\`,
  },

  marketOverview: \`Die ${nicheWord}-Nische ist ein attraktiver Markt f\u00fcr druckbare Lernmaterialien. Eltern und Lehrer suchen aktiv nach thematischen Arbeitsbl\u00e4ttern, die den Unterricht bereichern und Kinder motivieren. Der Vorteil dieser Nische: ${nicheWord.toLowerCase()}-Themen sind bei Kindern aller Altersgruppen beliebt.

Die Wettbewerbslage variiert je nach Plattform. Auf Etsy gibt es moderate Konkurrenz, w\u00e4hrend der deutschsprachige Markt deutlich weniger Anbieter hat. Das bedeutet Chancen f\u00fcr Verk\u00e4ufer, die hochwertige, deutschsprachige ${nicheWord.toLowerCase()}-Arbeitsbl\u00e4tter anbieten. Amazon KDP bietet zus\u00e4tzliche M\u00f6glichkeiten f\u00fcr umfangreichere Aktivit\u00e4tenb\u00fccher.\`,

  productIdeas: [
    { title: '${nicheWord} Wortsuche-Pakete', description: 'Erstellen Sie Wortsuche-R\u00e4tsel mit ${nicheWord.toLowerCase()}-Vokabular in verschiedenen Schwierigkeitsstufen. Pakete mit 20 R\u00e4tseln verkaufen sich gut als Sofort-Downloads.', appId: 'wordsearch' },
    { title: '${nicheWord} Ausmalbilder-Sammlung', description: 'Ausmalbilder mit ${nicheWord.toLowerCase()}-Motiven sind universell beliebt. Erstellen Sie Sammlungen mit 30+ Seiten f\u00fcr verschiedene Altersgruppen.', appId: 'coloring' },
    { title: '${nicheWord} Mathe-Arbeitsbl\u00e4tter', description: 'Verbinden Sie ${nicheWord.toLowerCase()}-Bilder mit Mathe-\u00dcbungen. Additions- und Subtraktions-Aufgaben mit thematischen Bildern sind bei Eltern und Lehrern beliebt.', appId: 'addition' },
    { title: '${nicheWord} Zuordnungs-\u00dcbungen', description: 'Erstellen Sie Bild-zu-Wort-Zuordnungen mit ${nicheWord.toLowerCase()}-Motiven. Ideal f\u00fcr Vokabellernen und visuelle Zuordnung.', appId: 'matching' },
    { title: '${nicheWord} Komplett-Aktivit\u00e4tsbuch', description: 'Kombinieren Sie verschiedene Arbeitsblatt-Typen zu einem umfassenden ${nicheWord}-Aktivit\u00e4tsbuch: Wortsuche, Ausmalen, Mathe, Zuordnung und mehr.', appId: 'wordsearch' },
    { title: '${nicheWord} Bingo-Spiel', description: 'Bingo-Karten mit ${nicheWord.toLowerCase()}-Bildern sind perfekt f\u00fcr den Unterricht und f\u00fcr Partys. Erstellen Sie Sets mit 30 einzigartigen Karten.', appId: 'bingo' },
  ],

  howToCreate: \`Die Erstellung von ${nicheWord}-Druckbaren ist mit den richtigen Tools einfach und schnell. Beginnen Sie mit dem Wortsuche-Generator \u2014 er ist besonders beliebt f\u00fcr thematische Pakete. W\u00e4hlen Sie ein ${nicheWord.toLowerCase()}-Thema aus den 104 verf\u00fcgbaren Illustrationsthemen und erstellen Sie R\u00e4tsel in verschiedenen Schwierigkeitsgraden.

F\u00fcr ein vollst\u00e4ndiges Produktpaket nutzen Sie mehrere Generatoren: Wortsuche f\u00fcr R\u00e4tsel, Addition und Subtraktion f\u00fcr Mathe-\u00dcbungen, Ausmalbilder f\u00fcr kreative Aktivit\u00e4ten und Zuordnungs-Arbeitsbl\u00e4tter f\u00fcr Vokabellernen. Der Canvas-Editor erm\u00f6glicht individuelle Anpassungen, und jeder Export enth\u00e4lt automatisch einen L\u00f6sungsschl\u00fcssel.

Testen Sie alle Generatoren kostenlos \u2014 ohne Anmeldung. Die kostenlose Version enth\u00e4lt alle Funktionen mit einem kleinen Wasserzeichen. Upgrade zum Commercial Pack (27 $) oder Full Access Pack (47 $), um das Wasserzeichen zu entfernen und kommerziell zu verkaufen.\`,

  platformTips: [
    { platform: 'Etsy', title: '${nicheWord} auf Etsy verkaufen', description: 'Listen Sie ${nicheWord.toLowerCase()}-Pakete mit SEO-optimierten Titeln auf Etsy. Verwenden Sie alle 13 Tags mit relevanten Schl\u00fcsselw\u00f6rtern wie "${nicheWord.toLowerCase()} Arbeitsbl\u00e4tter", "${nicheWord.toLowerCase()} Aktivit\u00e4ten Kinder", "${nicheWord.toLowerCase()} Lernmaterialien". Erstellen Sie ansprechende Vorschaubilder mit den besten Seiten Ihres Pakets.' },
    { platform: 'Amazon KDP', title: '${nicheWord} B\u00fccher auf KDP', description: 'Kompilieren Sie ${nicheWord.toLowerCase()}-Arbeitsbl\u00e4tter zu Aktivit\u00e4tenb\u00fcchern f\u00fcr Amazon KDP. Ein "${nicheWord} Aktivit\u00e4tsbuch f\u00fcr Kinder" mit 50-100 Seiten positioniert sich gut in der Kategorie Kinderb\u00fccher. Achten Sie auf professionelle Cover-Gestaltung.' },
    { platform: 'Teachers Pay Teachers', title: '${nicheWord} Ressourcen auf TPT', description: 'Erstellen Sie lehrplanorientierte ${nicheWord.toLowerCase()}-Materialien f\u00fcr TPT. Bieten Sie differenzierte Versionen f\u00fcr verschiedene Klassenstufen an. Kostenlose Vorschauen erh\u00f6hen die Sichtbarkeit und generieren erste Bewertungen.' },
  ],

  pricingIdeas: \`Die Preisgestaltung f\u00fcr ${nicheWord}-Druckbare h\u00e4ngt von der Plattform und dem Umfang ab. Auf Etsy verkaufen sich einzelne Pakete mit 20-30 Arbeitsbl\u00e4ttern f\u00fcr 4-8 \u20ac gut. Umfangreichere Sammlungen mit 50+ Seiten k\u00f6nnen 10-15 \u20ac erzielen.

Auf Amazon KDP bestimmt der Seitenumfang den Preis. B\u00fccher mit 50-80 Seiten k\u00f6nnen f\u00fcr 6-9 \u20ac positioniert werden, w\u00e4hrend umfangreiche Sammlungen mit 100+ Seiten 12-18 \u20ac erzielen. Auf TPT funktionieren differenzierte Preise gut: Einzelsets f\u00fcr 3-5 \u20ac und Komplettpakete f\u00fcr 8-15 \u20ac.

Tipp: Beginnen Sie mit niedrigeren Preisen, um erste Bewertungen zu sammeln, und erh\u00f6hen Sie die Preise schrittweise, wenn die Nachfrage steigt.\`,

  faq: [
    { question: 'Wie erstelle ich ${nicheWord}-Arbeitsbl\u00e4tter?', answer: 'Nutzen Sie die kostenlosen Generatoren von LessonCraftStudio. W\u00e4hlen Sie ein ${nicheWord.toLowerCase()}-Thema aus den 104 verf\u00fcgbaren Bildthemen und erstellen Sie Arbeitsbl\u00e4tter in Minuten.' },
    { question: 'Brauche ich eine Lizenz zum Verkaufen?', answer: 'Ja. Das Commercial Pack (27 $) oder Full Access Pack (47 $) enth\u00e4lt die kommerzielle Lizenz. Testen Sie kostenlos, bevor Sie investieren.' },
    { question: 'Welche Plattform ist am besten?', answer: 'Etsy bietet den einfachsten Einstieg. Amazon KDP eignet sich f\u00fcr B\u00fccher. TPT f\u00fcr Lehrressourcen. Idealerweise nutzen Sie alle drei Plattformen.' },
    { question: 'Wie viel kann ich verdienen?', answer: 'Das h\u00e4ngt von Ihrem Produktangebot und Marketing ab. Erfolgreiche Verk\u00e4ufer verdienen mehrere hundert bis tausend Euro monatlich mit thematischen Druckbaren.' },
    { question: 'Gibt es einen L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Alle Generatoren erstellen automatisch L\u00f6sungsschl\u00fcssel \u2014 ein wichtiges Verkaufsargument.' },
    { question: 'Funktionieren ${nicheWord}-Themen ganzj\u00e4hrig?', answer: '${nicheWord}-Themen verkaufen sich das ganze Jahr \u00fcber, mit saisonalen Spitzen zu Schulbeginn und vor den Feiertagen.' },
    { question: 'Kann ich kostenlos anfangen?', answer: 'Ja. Alle 33 Generatoren sind kostenlos nutzbar. Erstellen Sie Testprodukte und entscheiden Sie dann, ob Sie in eine kommerzielle Lizenz investieren m\u00f6chten.' },
    { question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Nutzen Sie die kostenlose Version, um alles zu testen, bevor Sie kaufen.' },
  ],

  internalLinks: [
    { slug: 'wordsearch', pageType: 'app' as const, anchorText: 'Wortsuche Generator' },
    { slug: 'addition', pageType: 'app' as const, anchorText: 'Additions-Generator' },
    { slug: 'coloring', pageType: 'app' as const, anchorText: 'Ausmalbilder Generator' },
    { slug: 'wordsearch', pageType: 'tool' as const, anchorText: 'Kostenloser Wortsuche Generator' },
    { slug: 'complete-guide-printable-business', pageType: 'start' as const, anchorText: 'Kompletter Leitfaden zum Druckbaren Gesch\u00e4ft' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide' as const, anchorText: 'Etsy-Shop starten' },
    { slug: 'niche-selection-printables', pageType: 'guide' as const, anchorText: 'Nischen-Auswahl' },
    { slug: 'math-bundle', pageType: 'bundle' as const, anchorText: 'Mathe-Komplett-Paket' },
  ],
};
`;
}

let count = 0;
for (const id of missing) {
  const fp = path.join(outDir, `${id}.ts`);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, gen(id), 'utf8');
    console.log(`Created: ${id}.ts`);
    count++;
  } else {
    console.log(`Exists: ${id}.ts`);
  }
}
console.log(`\nDone: ${count} new, ${missing.length - count} existed`);
