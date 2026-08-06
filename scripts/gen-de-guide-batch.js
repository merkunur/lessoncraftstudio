const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const missing = [
  'automate-printable-business', 'copyright-printable-sellers', 'create-addition-worksheets',
  'create-bingo-cards', 'create-coloring-pages', 'create-crossword-puzzles',
  'create-handwriting-sheets', 'create-hidden-object-worksheets', 'create-matching-worksheets',
  'create-math-puzzle-worksheets', 'create-maze-worksheets', 'create-pattern-worksheets',
  'create-picture-sudoku', 'create-sell-tpt-resources', 'create-subtraction-worksheets',
  'create-word-search-puzzles', 'customer-support-digital-products', 'digital-vs-physical-printables',
  'email-marketing-printables', 'get-reviews-printable-products', 'kdp-vs-etsy-printables',
  'multilingual-printable-business', 'pinterest-marketing-worksheets', 'quality-standards-worksheets',
  'research-profitable-niches', 'seasonal-marketing-printables', 'sell-creative-fabrica',
  'sell-printables-gumroad', 'social-media-printable-marketing', 'sudoku-books-kdp',
  'tpt-store-optimization', 'understanding-commercial-licenses', 'worksheets-multiple-languages',
];

const titles = {
  'automate-printable-business': 'Druckbares Gesch\u00e4ft Automatisieren',
  'copyright-printable-sellers': 'Urheberrecht f\u00fcr Druckbare Verk\u00e4ufer',
  'create-addition-worksheets': 'Additions-Arbeitsbl\u00e4tter Erstellen',
  'create-bingo-cards': 'Bingo-Karten Erstellen',
  'create-coloring-pages': 'Ausmalbilder Erstellen',
  'create-crossword-puzzles': 'Kreuzwortr\u00e4tsel Erstellen',
  'create-handwriting-sheets': 'Schreib\u00fcbungsbl\u00e4tter Erstellen',
  'create-hidden-object-worksheets': 'Suchbild-Arbeitsbl\u00e4tter Erstellen',
  'create-matching-worksheets': 'Zuordnungs-Arbeitsbl\u00e4tter Erstellen',
  'create-math-puzzle-worksheets': 'Mathe-R\u00e4tsel-Arbeitsbl\u00e4tter Erstellen',
  'create-maze-worksheets': 'Labyrinth-Arbeitsbl\u00e4tter Erstellen',
  'create-pattern-worksheets': 'Muster-Arbeitsbl\u00e4tter Erstellen',
  'create-picture-sudoku': 'Bilder-Sudoku Erstellen',
  'create-sell-tpt-resources': 'TPT-Ressourcen Erstellen und Verkaufen',
  'create-subtraction-worksheets': 'Subtraktions-Arbeitsbl\u00e4tter Erstellen',
  'create-word-search-puzzles': 'Wortsuchr\u00e4tsel Erstellen',
  'customer-support-digital-products': 'Kundensupport f\u00fcr Digitale Produkte',
  'digital-vs-physical-printables': 'Digital vs. Physisch: Druckbare Produkte',
  'email-marketing-printables': 'E-Mail-Marketing f\u00fcr Druckbare Produkte',
  'get-reviews-printable-products': 'Bewertungen f\u00fcr Druckbare Produkte',
  'kdp-vs-etsy-printables': 'KDP vs. Etsy: Druckbare Produkte',
  'multilingual-printable-business': 'Mehrsprachiges Druckbares Gesch\u00e4ft',
  'pinterest-marketing-worksheets': 'Pinterest-Marketing f\u00fcr Arbeitsbl\u00e4tter',
  'quality-standards-worksheets': 'Qualit\u00e4tsstandards f\u00fcr Arbeitsbl\u00e4tter',
  'research-profitable-niches': 'Profitable Nischen Recherchieren',
  'seasonal-marketing-printables': 'Saisonales Marketing f\u00fcr Druckbare',
  'sell-creative-fabrica': 'Auf Creative Fabrica Verkaufen',
  'sell-printables-gumroad': 'Druckbare auf Gumroad Verkaufen',
  'social-media-printable-marketing': 'Social-Media-Marketing f\u00fcr Druckbare',
  'sudoku-books-kdp': 'Sudoku-B\u00fccher auf KDP',
  'tpt-store-optimization': 'TPT-Shop Optimierung',
  'understanding-commercial-licenses': 'Kommerzielle Lizenzen Verstehen',
  'worksheets-multiple-languages': 'Arbeitsbl\u00e4tter in Mehreren Sprachen',
};

const appMapping = {
  'create-addition-worksheets': 'addition', 'create-subtraction-worksheets': 'subtraction',
  'create-word-search-puzzles': 'wordsearch', 'create-crossword-puzzles': 'crossword',
  'create-math-puzzle-worksheets': 'math-puzzle', 'create-handwriting-sheets': 'writing',
  'create-coloring-pages': 'coloring', 'create-bingo-cards': 'bingo',
  'create-matching-worksheets': 'matching', 'create-pattern-worksheets': 'pattern-worksheet',
  'create-picture-sudoku': 'sudoku', 'create-maze-worksheets': 'picture-path',
  'create-hidden-object-worksheets': 'find-objects',
};

const ytIds = {
  'addition': '6O5aCzHkh8M', 'subtraction': 'nWq8eVCP8KE', 'wordsearch': '36keBFzJbPo',
  'crossword': '36keBFzJbPo', 'math-puzzle': 'k9p0hlfMSAo', 'writing': 'zWWP02kUAdo',
  'coloring': 'gQEk7dPTZUA', 'bingo': 'd6AOiDXoK1c', 'matching': 'gQEk7dPTZUA',
  'pattern-worksheet': 'gQEk7dPTZUA', 'sudoku': 'VXGKFQRT2rA', 'picture-path': 'VXGKFQRT2rA',
  'find-objects': 'hwMKyCpVzSQ',
};

function gen(guideId) {
  const title = titles[guideId];
  const relApp = appMapping[guideId] || 'wordsearch';
  const vid = ytIds[relApp] || '36keBFzJbPo';
  const isProductGuide = guideId.startsWith('create-');

  return `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: '${guideId}',
  locale: 'de',

  seo: {
    titleTag: '${title} | Schritt-f\u00fcr-Schritt Anleitung',
    metaDescription: 'Lernen Sie, wie Sie ${title.toLowerCase()}. Komplette Anleitung mit praktischen Tipps, Plattform-Strategien und Monetarisierungsideen f\u00fcr druckbare Produkte.',
    primaryKeyword: '${title.toLowerCase()}',
    secondaryKeywords: ['${title.toLowerCase()} Anleitung', 'druckbare Produkte erstellen', 'Arbeitsbl\u00e4tter verkaufen', 'Etsy Druckbare', 'KDP Aktivit\u00e4tsb\u00fccher'],
    lsiKeywords: ['Arbeitsblatt Generator', 'Lernmaterialien', 'druckbares Gesch\u00e4ft', 'passive Einnahmen', 'digitale Produkte', 'Printable Business', 'Unterrichtsmaterial', 'Online-Verkauf'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/${relApp.replace(/-/g, ' ')}/${relApp === 'wordsearch' ? 'Word Search' : relApp.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} 1.jpeg',
      primaryAlt: '${title} \u2014 Beispiel-Arbeitsblatt in professioneller Qualit\u00e4t',
    },
    sampleGallery: [
      { src: '/samples/english/${relApp.replace(/-/g, ' ')}/${relApp === 'wordsearch' ? 'Word Search' : relApp.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} 1.jpeg', alt: '${title} Beispiel', caption: 'Professionelles Beispiel' },
    ],
    youtubeId: '${vid}',
    videoTitle: '${title} \u2014 Video-Anleitung',
  },

  hero: {
    title: '${title}',
    description: \`Dieser umfassende Leitfaden zeigt Ihnen Schritt f\u00fcr Schritt, wie Sie ${title.toLowerCase()}. ${isProductGuide ? 'Mit dem richtigen Generator erstellen Sie professionelle Arbeitsbl\u00e4tter in Minuten statt Stunden und k\u00f6nnen sie auf Etsy, Amazon KDP und anderen Plattformen verkaufen.' : 'Entdecken Sie bew\u00e4hrte Strategien und praktische Tipps f\u00fcr den Erfolg mit druckbaren Lernmaterialien.'}

Ob Anf\u00e4nger oder erfahrener Verk\u00e4ufer \u2014 hier finden Sie praktische, sofort umsetzbare Ratschl\u00e4ge. Alle empfohlenen Tools k\u00f6nnen kostenlos getestet werden, sodass Sie sofort loslegen k\u00f6nnen.\`,
  },

  introduction: \`${isProductGuide ? `Das Erstellen von professionellen Arbeitsbl\u00e4ttern muss nicht kompliziert oder zeitaufw\u00e4ndig sein. Mit dem richtigen Arbeitsblatt-Generator k\u00f6nnen Sie in wenigen Minuten hochwertige ${title.replace('Erstellen', '').trim()} erstellen, die sich auf Etsy, Amazon KDP und anderen Marktpl\u00e4tzen verkaufen lassen.

Dieser Leitfaden f\u00fchrt Sie durch den gesamten Prozess: von der Auswahl des richtigen Themas \u00fcber die Anpassung des Schwierigkeitsgrads bis zur Optimierung f\u00fcr verschiedene Verkaufsplattformen. Die hier vorgestellten Techniken basieren auf bew\u00e4hrten Methoden erfolgreicher Verk\u00e4ufer.

Am Ende dieses Leitfadens werden Sie genau wissen, wie Sie professionelle ${title.replace('Erstellen', '').trim()} erstellen, verpacken und gewinnbringend verkaufen k\u00f6nnen.` : `Der Markt f\u00fcr druckbare Lernmaterialien bietet enorme Chancen f\u00fcr Unternehmer. ${title} ist ein wichtiger Aspekt, den jeder Verk\u00e4ufer von druckbaren Produkten verstehen sollte.

Dieser Leitfaden deckt alle wichtigen Aspekte ab und gibt Ihnen konkrete Handlungsempfehlungen. Von den Grundlagen bis zu fortgeschrittenen Strategien finden Sie hier alles, was Sie brauchen.

Die vorgestellten Methoden und Tools wurden von erfolgreichen Verk\u00e4ufern erprobt und k\u00f6nnen sofort umgesetzt werden.`}\`,

  tutorial: {
    title: '${title} \u2014 Schritt-f\u00fcr-Schritt Anleitung',
    steps: [
      { title: 'Vorbereitung und Planung', description: 'Definieren Sie Ihre Zielgruppe, w\u00e4hlen Sie das passende Thema und legen Sie den Schwierigkeitsgrad fest. Eine gute Planung ist die Grundlage f\u00fcr erfolgreiche Produkte.' },
      { title: 'Werkzeug ausw\u00e4hlen', description: 'W\u00e4hlen Sie den passenden Generator oder das richtige Tool. Alle 33 Generatoren von LessonCraftStudio k\u00f6nnen kostenlos getestet werden.' },
      { title: 'Inhalt erstellen', description: 'Nutzen Sie den Generator, um professionelle Inhalte zu erstellen. Passen Sie Thema, Layout, Schriftart und Schwierigkeitsgrad an Ihre Zielgruppe an.' },
      { title: 'Qualit\u00e4t pr\u00fcfen und anpassen', description: 'Nutzen Sie den Canvas-Editor, um das Ergebnis zu verfeinern. F\u00fcgen Sie Titel und Anweisungen hinzu, passen Sie Farben und Layouts an.' },
      { title: 'Exportieren und ver\u00f6ffentlichen', description: 'Exportieren Sie als PDF und JPEG. Erstellen Sie ansprechende Vorschaubilder und listen Sie Ihre Produkte auf den gew\u00e4hlten Plattformen.' },
    ],
  },

  platformTips: [
    { platform: 'Etsy', title: 'Optimierung f\u00fcr Etsy', description: 'Verwenden Sie SEO-optimierte Titel mit relevanten Schl\u00fcsselw\u00f6rtern. Erstellen Sie ansprechende Vorschaubilder und bieten Sie Pakete mit Mengenrabatt an. Nutzen Sie alle 13 Tags und f\u00fcllen Sie die Produktbeschreibung vollst\u00e4ndig aus.' },
    { platform: 'Amazon KDP', title: 'Formatierung f\u00fcr KDP', description: 'Achten Sie auf die richtige Seitengr\u00f6\u00dfe und R\u00e4nder. Kompilieren Sie Arbeitsbl\u00e4tter zu B\u00fcchern mit mindestens 50 Seiten. W\u00e4hlen Sie die passende Kategorie und erstellen Sie ein professionelles Cover.' },
    { platform: 'Teachers Pay Teachers', title: 'TPT-Strategie', description: 'Richten Sie Ihre Produkte an Lehrpl\u00e4nen aus. Bieten Sie kostenlose Vorschauen und differenzierte Versionen an. Gute Bewertungen sind auf TPT besonders wichtig.' },
  ],

  monetization: [
    { title: 'Einzelprodukte verkaufen', description: 'Beginnen Sie mit einzelnen Arbeitsbl\u00e4ttern oder kleinen Sets zu g\u00fcnstigen Preisen (2-5 \u20ac). Dies senkt die Kaufh\u00fcrde und generiert erste Bewertungen.' },
    { title: 'Themenpakete b\u00fcndeln', description: 'Erstellen Sie thematische Pakete mit 20-30 Arbeitsbl\u00e4ttern zu einem h\u00f6heren Preis (8-15 \u20ac). Pakete bieten dem K\u00e4ufer mehr Wert und Ihnen h\u00f6here Margen.' },
    { title: 'Saisonale Sonderangebote', description: 'Erstellen Sie spezielle Pakete f\u00fcr Feiertage und saisonale Ereignisse. Schulanfang, Weihnachten und Ostern sind Spitzenverkaufszeiten f\u00fcr Lernmaterialien.' },
  ],

  examples: \`Stellen Sie sich vor, Sie erstellen ein Paket mit 30 thematischen Arbeitsbl\u00e4ttern zum Thema Bauernhof-Tiere. Mit einem Generator dauert die Erstellung etwa eine Stunde. Das Paket k\u00f6nnen Sie auf Etsy f\u00fcr 8-12 \u20ac verkaufen. Bei 10 Verk\u00e4ufen pro Monat sind das 80-120 \u20ac \u2014 von einem einzigen Produkt. Multiplizieren Sie das mit 20 verschiedenen Themen und Sie sehen das Potenzial.

Erfolgreiche Verk\u00e4ufer erstellen nicht nur einzelne Produkte, sondern ganze Produktlinien. Ein Mathe-Arbeitsblatt-Sortiment k\u00f6nnte Addition, Subtraktion, Multiplikation und gemischte Aufgaben in jeweils 5 Schwierigkeitsstufen umfassen. Das ergibt 20 verschiedene Produkte aus einer einzigen Nische \u2014 und jedes Produkt kann saisonale Varianten haben.\`,

  faq: [
    { question: 'Brauche ich Designkenntnisse?', answer: 'Nein. Die Generatoren \u00fcbernehmen das Design komplett. Sie w\u00e4hlen nur Thema, Schwierigkeitsgrad und Layout.' },
    { question: 'Wie lange dauert die Erstellung?', answer: 'Mit einem Generator erstellen Sie ein professionelles Arbeitsblatt in 1-2 Minuten. Ein Paket mit 20 Bl\u00e4ttern in unter einer Stunde.' },
    { question: 'Welche Lizenz brauche ich zum Verkaufen?', answer: 'Das Commercial Pack (27 $) oder Full Access Pack (47 $) enth\u00e4lt die kommerzielle Lizenz. Testen Sie kostenlos, bevor Sie investieren.' },
    { question: 'Auf welcher Plattform soll ich anfangen?', answer: 'Etsy ist f\u00fcr Anf\u00e4nger am einfachsten. Amazon KDP eignet sich f\u00fcr B\u00fccher. TPT f\u00fcr Lehrressourcen.' },
    { question: 'Wie viel kann ich verdienen?', answer: 'Das h\u00e4ngt von Ihrem Einsatz ab. Erfolgreiche Verk\u00e4ufer verdienen von einigen hundert bis mehrere tausend Euro monatlich mit druckbaren Produkten.' },
    { question: 'Gibt es einen L\u00f6sungsschl\u00fcssel?', answer: 'Ja. Jeder Generator erstellt automatisch einen L\u00f6sungsschl\u00fcssel \u2014 ein wichtiges Verkaufsargument.' },
    { question: 'Kann ich kostenlos testen?', answer: 'Ja. Alle 33 Generatoren sind kostenlos mit vollem Funktionsumfang nutzbar. Einziger Unterschied: ein kleines Wasserzeichen.' },
    { question: 'Wie lautet die R\u00fcckerstattungsrichtlinie?', answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig. Testen Sie die kostenlose Version ausgiebig, bevor Sie kaufen.' },
  ],

  internalLinks: [
    { slug: '${relApp}', pageType: 'app' as const, anchorText: '${titles[guideId]?.includes('Erstellen') ? titles[guideId].replace('Erstellen', 'Generator') : 'Wortsuche Generator'}' },
    { slug: '${relApp}', pageType: 'tool' as const, anchorText: 'Kostenlos ${titles[guideId]?.includes('Erstellen') ? titles[guideId] : 'Arbeitsbl\u00e4tter erstellen'}' },
    { slug: 'complete-guide-printable-business', pageType: 'start' as const, anchorText: 'Kompletter Leitfaden zum Druckbaren Gesch\u00e4ft' },
    { slug: 'create-worksheets-that-sell', pageType: 'start' as const, anchorText: 'Arbeitsbl\u00e4tter die sich verkaufen' },
    { slug: 'math-bundle', pageType: 'bundle' as const, anchorText: 'Mathe-Komplett-Paket' },
    { slug: 'start-etsy-printable-shop', pageType: 'guide' as const, anchorText: 'Etsy-Shop starten' },
    { slug: 'niche-selection-printables', pageType: 'guide' as const, anchorText: 'Nischen-Auswahl' },
    { slug: 'farm-animals-printable-ideas', pageType: 'idea' as const, anchorText: 'Bauernhof-Tiere Ideen' },
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
