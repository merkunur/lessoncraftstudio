const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const guides = [
  { guideId: 'amazon-kdp-activity-books', title: 'Amazon KDP Aktivit\u00e4tsb\u00fccher', subtitle: 'Der komplette Leitfaden zum Ver\u00f6ffentlichen und Verkaufen von Aktivit\u00e4tsb\u00fcchern auf Amazon KDP', primaryKeyword: 'Amazon KDP Aktivit\u00e4tsb\u00fccher', youtubeId: '36keBFzJbPo' },
  { guideId: 'commercial-license-guide', title: 'Kommerzielle Lizenz Leitfaden', subtitle: 'Alles was Sie \u00fcber kommerzielle Lizenzen f\u00fcr druckbare Produkte wissen m\u00fcssen', primaryKeyword: 'kommerzielle Lizenz druckbare Produkte', youtubeId: '36keBFzJbPo' },
  { guideId: 'create-multilingual-worksheets', title: 'Mehrsprachige Arbeitsbl\u00e4tter Erstellen', subtitle: 'So erstellen Sie Arbeitsbl\u00e4tter in 11 Sprachen und erschlie\u00dfen internationale M\u00e4rkte', primaryKeyword: 'mehrsprachige Arbeitsbl\u00e4tter erstellen', youtubeId: '36keBFzJbPo' },
  { guideId: 'marketing-printable-business', title: 'Marketing f\u00fcr Ihr Druckbares Gesch\u00e4ft', subtitle: 'Bew\u00e4hrte Marketingstrategien f\u00fcr den Verkauf von druckbaren Lernmaterialien', primaryKeyword: 'Marketing druckbare Produkte', youtubeId: '36keBFzJbPo' },
  { guideId: 'printable-business-income', title: 'Einkommen mit Druckbaren Produkten', subtitle: 'Wie Sie mit druckbaren Arbeitsbl\u00e4ttern und Lernmaterialien Geld verdienen', primaryKeyword: 'Einkommen druckbare Produkte', youtubeId: '36keBFzJbPo' },
  { guideId: 'printable-business-legal', title: 'Rechtliche Grundlagen f\u00fcr Druckbare Produkte', subtitle: 'Urheberrecht, Lizenzen und rechtliche Aspekte beim Verkauf von druckbaren Materialien', primaryKeyword: 'rechtliche Grundlagen druckbare Produkte', youtubeId: '36keBFzJbPo' },
  { guideId: 'scaling-printable-business', title: 'Skalierung Ihres Druckbaren Gesch\u00e4fts', subtitle: 'Vom Nebenverdienst zum Vollzeit-Business mit druckbaren Lernmaterialien', primaryKeyword: 'druckbares Gesch\u00e4ft skalieren', youtubeId: '36keBFzJbPo' },
  { guideId: 'tools-for-printable-business', title: 'Werkzeuge f\u00fcr Ihr Druckbares Gesch\u00e4ft', subtitle: 'Die besten Tools und Generatoren f\u00fcr die Erstellung professioneller druckbarer Produkte', primaryKeyword: 'Werkzeuge druckbares Gesch\u00e4ft', youtubeId: '36keBFzJbPo' },
];

function gen(g) {
  return `import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: '${g.guideId}',
  locale: 'de',

  seo: {
    titleTag: '${g.title} (2026 Leitfaden)',
    metaDescription: '${g.subtitle}. Schritt-f\u00fcr-Schritt Anleitung mit praktischen Tipps und bew\u00e4hrten Strategien f\u00fcr den Erfolg mit druckbaren Produkten.',
    primaryKeyword: '${g.primaryKeyword}',
    secondaryKeywords: ['druckbare Produkte verkaufen', 'Arbeitsbl\u00e4tter Gesch\u00e4ft', 'passives Einkommen Druckbare', 'Etsy Druckbare', 'digitale Produkte erstellen'],
    lsiKeywords: ['Arbeitsblatt Generator', 'Lernmaterialien erstellen', 'Online-Gesch\u00e4ft starten', 'Druckbare Materialien', 'Printable Business', 'p\u00e4dagogische Ressourcen', 'digitaler Marktplatz', 'Produkterstellung'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: 'Professionelles Wortsuche-Arbeitsblatt als Beispiel f\u00fcr kommerzielle Druckprodukte',
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: 'Wortsuche-Arbeitsblatt in professioneller Qualit\u00e4t', caption: 'Professionelle Qualit\u00e4t' },
    ],
    youtubeId: '${g.youtubeId}',
    videoTitle: '${g.title} \u2014 Komplette Anleitung',
  },

  hero: {
    title: '${g.title}',
    subtitle: '${g.subtitle}',
    readingTime: '15 Min. Lesezeit',
    description: \`Dieser umfassende Leitfaden zeigt Ihnen Schritt f\u00fcr Schritt, wie Sie ${g.title.toLowerCase()} erfolgreich umsetzen. Der Markt f\u00fcr druckbare Lernmaterialien w\u00e4chst stetig, und mit den richtigen Werkzeugen und Strategien k\u00f6nnen Sie sich eine profitable Einnahmequelle aufbauen.

Ob Sie gerade erst anfangen oder Ihr bestehendes Gesch\u00e4ft ausbauen m\u00f6chten \u2014 dieser Leitfaden deckt alle wichtigen Aspekte ab. Von der Produkterstellung \u00fcber die Marktplatz-Optimierung bis hin zur Skalierung Ihres Gesch\u00e4fts finden Sie hier praktische, sofort umsetzbare Tipps.

Die hier vorgestellten Strategien basieren auf bew\u00e4hrten Methoden erfolgreicher Verk\u00e4ufer von druckbaren Produkten. Alle empfohlenen Tools k\u00f6nnen Sie kostenlos testen, sodass Sie sofort mit der Umsetzung beginnen k\u00f6nnen.\`,
  },

  introduction: \`Der Markt f\u00fcr druckbare Lernmaterialien bietet eine einzigartige Kombination aus niedrigen Einstiegsh\u00fcrden und unbegrenzter Skalierbarkeit. Sie erstellen ein Produkt einmal und verkaufen es tausendmal ohne Herstellungs-, Versand- oder Lagerkosten. Jeder Verkauf nach dem ersten ist nahezu reiner Gewinn.

Aber der Markt ist wettbewerbsintensiv. T\u00e4glich listen Tausende von Verk\u00e4ufern neue Produkte auf Etsy und Amazon. Die erfolgreichen Verk\u00e4ufer zeichnen sich durch drei Eigenschaften aus: Sie erstellen konsistent professionelle Produkte, verstehen Marktplatz-SEO und nutzen Tools, die Volumenproduktion ohne Qualit\u00e4tsverlust erm\u00f6glichen.

Dieser Leitfaden konzentriert sich auf einen spezifischen Ansatz \u2014 die Nutzung von Arbeitsblatt-Generatoren zur Erstellung kommerzieller Druckprodukte in Minuten statt Stunden. Traditionelle Verk\u00e4ufer verbringen 30 bis 60 Minuten pro Arbeitsblatt in Canva oder InDesign. Mit den richtigen Generatoren erstellen Sie dasselbe Qualit\u00e4tsprodukt in unter zwei Minuten.\`,

  mainContent: [
    {
      heading: 'Warum dieser Markt weiter w\u00e4chst',
      content: \`Der Markt f\u00fcr druckbare Lernmaterialien expandiert trotz zunehmenden Wettbewerbs weiter. Eltern, Lehrer, Homeschooler und Nachhilfelehrer brauchen regelm\u00e4\u00dfig frische Arbeitsblatt-Inhalte. Ein einzelner Lehrer kauft m\u00f6glicherweise 50 bis 100 verschiedene druckbare Produkte pro Jahr.

Mehrere Trends treiben das Wachstum an. Die Homeschool-Bewegung hat sich dramatisch beschleunigt. Nachhilfeprogramme brauchen erg\u00e4nzende Materialien. Eltern nutzen zunehmend druckbare Aktivit\u00e4ten, um Bildschirmzeit zu begrenzen. Der internationale Markt ist besonders unterversorgt \u2014 w\u00e4hrend englischsprachige Druckbare starken Wettbewerb haben, bieten deutsche, franz\u00f6sische und skandinavische M\u00e4rkte weniger Wettbewerb bei hoher Nachfrage.\`,
    },
    {
      heading: 'Die richtigen Werkzeuge w\u00e4hlen',
      content: \`Die Wahl der richtigen Werkzeuge entscheidet \u00fcber Ihren Erfolg. Worksheet-Generatoren wie die von LessonCraftStudio bieten entscheidende Vorteile gegen\u00fcber traditionellen Design-Tools: automatische L\u00f6sungsschl\u00fcssel, 104 illustrierte Themen, Canvas-Editor f\u00fcr individuelle Anpassungen und Export als druckfertiges PDF.

Mit einem Generator erstellen Sie in 2 Minuten, wof\u00fcr Sie in Canva 30-60 Minuten br\u00e4uchten. Diese Effizienz erm\u00f6glicht es Ihnen, gr\u00f6\u00dfere Produktkataloge aufzubauen und mehr Nischen abzudecken. Alle 33 Generatoren k\u00f6nnen kostenlos getestet werden \u2014 ohne Anmeldung.\`,
    },
    {
      heading: 'Produkterstellung und Qualit\u00e4t',
      content: \`Professionelle Qualit\u00e4t ist der Schl\u00fcssel zum Erfolg. K\u00e4ufer auf Etsy und Amazon vergleichen Produkte visuell, bevor sie kaufen. Arbeitsbl\u00e4tter, die professionell aussehen, erhalten mehr Klicks, bessere Bewertungen und wiederkehrende Kunden.

Achten Sie auf konsistente Gestaltung innerhalb Ihrer Produktlinie. Verwenden Sie einheitliche Schriftarten, Farbschemata und Layoutstile. Bieten Sie L\u00f6sungsschl\u00fcssel zu jedem Arbeitsblatt an \u2014 dies ist ein wichtiges Kaufargument, das viele Wettbewerber vernachl\u00e4ssigen.\`,
    },
    {
      heading: 'Marktplatz-Strategien',
      content: \`Jeder Marktplatz hat eigene Regeln und Optimierungsstrategien. Auf Etsy sind SEO-optimierte Titel und Tags entscheidend. Auf Amazon KDP bestimmt die Buchkategorie und der Umfang den Erfolg. Auf Teachers Pay Teachers z\u00e4hlt die Lehrplanausrichtung.

Beginnen Sie mit einem Marktplatz, meistern Sie ihn und expandieren Sie dann. Multipl-Plattform-Pr\u00e4senz erh\u00f6ht Ihre Reichweite und reduziert das Risiko der Abh\u00e4ngigkeit von einem einzelnen Kanal.\`,
    },
    {
      heading: 'Skalierung und langfristiger Erfolg',
      content: \`Langfristiger Erfolg erfordert Systematik. Erstellen Sie einen Produktionsplan, diversifizieren Sie Ihre Produktlinie und automatisieren Sie wiederkehrende Aufgaben. Nutzen Sie saisonale Trends \u2014 Schulanfang, Weihnachten, Ostern \u2014 f\u00fcr gezielte Produktlaunches.

Der Schl\u00fcssel zur Skalierung liegt in der Effizienz: Je mehr hochwertige Produkte Sie in k\u00fcrzerer Zeit erstellen k\u00f6nnen, desto schneller w\u00e4chst Ihr Gesch\u00e4ft. Worksheet-Generatoren sind der Multiplikator, der dieses Wachstum erm\u00f6glicht.\`,
    },
  ],

  actionSteps: [
    { step: 'Nische w\u00e4hlen', description: 'W\u00e4hlen Sie eine spezifische Nische basierend auf Nachfrage und Wettbewerb. Beginnen Sie eng und erweitern Sie sp\u00e4ter.' },
    { step: 'Erste Produkte erstellen', description: 'Nutzen Sie die kostenlosen Generatoren, um 5-10 Testprodukte in Ihrer Nische zu erstellen. Testen Sie verschiedene Themen und Schwierigkeitsgrade.' },
    { step: 'Marktplatz-Konto einrichten', description: 'Er\u00f6ffnen Sie ein Konto auf Etsy, Amazon KDP oder TPT. Optimieren Sie Ihr Profil und Ihre Shop-Beschreibung.' },
    { step: 'Erste Listings ver\u00f6ffentlichen', description: 'Listen Sie Ihre Produkte mit SEO-optimierten Titeln, Beschreibungen und Tags. Verwenden Sie hochwertige Vorschaubilder.' },
    { step: 'Feedback sammeln und optimieren', description: 'Analysieren Sie Verk\u00e4ufe und Kundenfeedback. Passen Sie Ihre Produktstrategie entsprechend an.' },
    { step: 'Produktlinie erweitern', description: 'Erstellen Sie regelm\u00e4\u00dfig neue Produkte und Pakete. Nutzen Sie saisonale Themen f\u00fcr zeitgebundene Angebote.' },
  ],

  toolsRecommended: [
    { appId: 'wordsearch', title: 'Wortsuche Generator', description: 'Einer der beliebtesten Generatoren f\u00fcr den Einstieg. Wortsuch-R\u00e4tsel verkaufen sich hervorragend auf allen Plattformen und sind einfach zu erstellen.' },
    { appId: 'addition', title: 'Additions-Arbeitsblatt Generator', description: 'Mathe-Arbeitsbl\u00e4tter sind ein Dauerseller. Erstellen Sie bildbasierte Additionsaufgaben f\u00fcr verschiedene Schwierigkeitsstufen.' },
    { appId: 'coloring', title: 'Ausmalbilder Generator', description: 'Ausmalbilder sind universell beliebt und sprachunabh\u00e4ngig. Perfekt f\u00fcr den Einstieg in internationale M\u00e4rkte.' },
  ],

  faq: [
    { question: 'Brauche ich Designkenntnisse?', answer: 'Nein. Die Generatoren \u00fcbernehmen das Design. Sie w\u00e4hlen lediglich Thema, Schwierigkeitsgrad und Layout. Der Canvas-Editor erlaubt individuelle Anpassungen ohne Designsoftware.' },
    { question: 'Wie viel Startkapital brauche ich?', answer: 'Fast keines. Die Generatoren sind kostenlos nutzbar. Ein Commercial Pack kostet 27 $ und ein Etsy-Shop 0,20 $ pro Listing. Sie k\u00f6nnen mit unter 50 $ starten.' },
    { question: 'Welche Plattform ist f\u00fcr Anf\u00e4nger am besten?', answer: 'Etsy bietet den einfachsten Einstieg f\u00fcr druckbare Produkte. Die Plattform hat eine eingebaute K\u00e4uferbasis und niedrige Geb\u00fchren. Amazon KDP eignet sich besser f\u00fcr B\u00fccher und umfangreichere Sammlungen.' },
    { question: 'Wie schnell kann ich Einnahmen erzielen?', answer: 'Erste Verk\u00e4ufe sind innerhalb von Wochen m\u00f6glich, aber ein stabiles Einkommen erfordert typischerweise 3-6 Monate konsequenter Produkterstellung und -optimierung.' },
    { question: 'Brauche ich eine kommerzielle Lizenz?', answer: 'Ja, zum Verkaufen. Das Commercial Pack (27 $) oder Full Access Pack (47 $) enth\u00e4lt die kommerzielle Lizenz. Testen Sie kostenlos, bevor Sie investieren.' },
    { question: 'Funktioniert es auch auf dem deutschen Markt?', answer: 'Absolut. Der deutsche Markt f\u00fcr druckbare Lernmaterialien hat weniger Wettbewerb als der englischsprachige. Alle Generatoren unterst\u00fctzen Deutsch vollst\u00e4ndig.' },
    { question: 'Wie viele Produkte brauche ich f\u00fcr den Anfang?', answer: 'Beginnen Sie mit 10-20 Produkten in einer fokussierten Nische. Qualit\u00e4t ist wichtiger als Quantit\u00e4t, besonders am Anfang.' },
    { question: 'Kann ich die kostenlosen Generatoren nutzen?', answer: 'Ja. Alle 33 Generatoren sind kostenlos nutzbar mit vollem Funktionsumfang. Die kostenlose Version hat ein kleines Wasserzeichen \u2014 perfekt zum Testen und Ausprobieren.' },
    { question: 'Was ist der Unterschied zwischen den Packs?', answer: 'Commercial Pack (27 $): Generator + kommerzielle Lizenz + ausgew\u00e4hlte Themen. Full Access Pack (47 $): Alles plus alle 104 Bildthemen und zuk\u00fcnftige Updates. Beide sind Einmalk\u00e4ufe.' },
    { question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind aufgrund der digitalen Natur endg\u00fcltig. Nutzen Sie die kostenlose Version ausgiebig, bevor Sie kaufen \u2014 probieren Sie vor dem Kauf.' },
  ],

  internalLinks: [
    { slug: 'complete-guide-printable-business', pageType: 'start' as const, anchorText: 'Kompletter Leitfaden zum Druckbaren Gesch\u00e4ft' },
    { slug: 'create-worksheets-that-sell', pageType: 'start' as const, anchorText: 'Arbeitsbl\u00e4tter erstellen die sich verkaufen' },
    { slug: 'etsy-printable-business', pageType: 'start' as const, anchorText: 'Etsy Druckbares Gesch\u00e4ft' },
    { slug: 'wordsearch', pageType: 'app' as const, anchorText: 'Wortsuche Generator' },
    { slug: 'addition', pageType: 'app' as const, anchorText: 'Additions-Arbeitsblatt Generator' },
    { slug: 'coloring', pageType: 'app' as const, anchorText: 'Ausmalbilder Generator' },
    { slug: 'wordsearch', pageType: 'tool' as const, anchorText: 'Kostenloser Wortsuche Generator' },
    { slug: 'math-bundle', pageType: 'bundle' as const, anchorText: 'Mathe-Komplett-Paket' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide' as const, anchorText: 'Etsy-Shop f\u00fcr Druckbare starten' },
    { slug: 'farm-animals-printable-ideas', pageType: 'idea' as const, anchorText: 'Bauernhof-Tiere Druckbare Ideen' },
  ],
};
`;
}

let count = 0;
for (const g of guides) {
  const fp = path.join(outDir, `${g.guideId}.ts`);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, gen(g), 'utf8');
    console.log(`Created: ${g.guideId}.ts`);
    count++;
  } else {
    console.log(`Exists: ${g.guideId}.ts`);
  }
}
console.log(`\nDone: ${count} new, ${guides.length - count} existed`);
