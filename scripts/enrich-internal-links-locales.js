/**
 * Enrich Internal Links for DE, FR, ES, PT, IT, NL locales
 *
 * Reads slug configs from TS files to ensure all slugs are correct.
 * Same logic as English enrichment:
 * - Remove tool links (noindexed pages)
 * - Replace generic idea links with category-relevant ones
 * - Replace uniform start link with category-relevant one
 * - Add app-specific guide link if missing
 * - Add cross-category links to bundle files
 *
 * DOES NOT touch visuals/samples — only modifies internalLinks array.
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl'];
const configDir = path.join(__dirname, '..', 'frontend', 'config');

// ── Parse slug configs from TS files ──

function parseSlugConfig(filePath, idField) {
  const content = fs.readFileSync(filePath, 'utf8');
  const map = {}; // id -> { locale -> slug }

  // Match each config entry like: { guideId: 'create-addition-worksheets', slugs: { en: 'xxx', de: 'yyy', ... } }
  const entryRegex = new RegExp(`${idField}:\\s*'([^']+)'[^}]*slugs:\\s*\\{([^}]+)\\}`, 'g');
  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    const id = match[1];
    const slugsBlock = match[2];
    const slugMap = {};
    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let sm;
    while ((sm = slugRegex.exec(slugsBlock)) !== null) {
      slugMap[sm[1]] = sm[2];
    }
    map[id] = slugMap;
  }
  return map;
}

// Parse all config files
const guideSlugMap = parseSlugConfig(path.join(configDir, 'guide-page-slugs.ts'), 'guideId');
const ideaSlugMap = parseSlugConfig(path.join(configDir, 'idea-page-slugs.ts'), 'ideaId');
const startSlugMap = parseSlugConfig(path.join(configDir, 'start-page-slugs.ts'), 'startId');
const appSlugMap = parseSlugConfig(path.join(configDir, 'product-page-slugs.ts'), 'appId');
const bundleSlugMap = parseSlugConfig(path.join(configDir, 'bundle-page-slugs.ts'), 'bundleId');

// Verify we parsed correctly
console.log(`Parsed configs: ${Object.keys(guideSlugMap).length} guides, ${Object.keys(ideaSlugMap).length} ideas, ${Object.keys(startSlugMap).length} starts, ${Object.keys(appSlugMap).length} apps, ${Object.keys(bundleSlugMap).length} bundles\n`);

function getSlug(map, id, locale) {
  const entry = map[id];
  if (!entry) return null;
  return entry[locale] || null; // Don't fallback to English — must have locale slug
}

// ── Category Assignments (same as English) ──

const mathApps = ['addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet'];
const literacyApps = ['wordsearch', 'word-scramble', 'word-guess', 'cryptogram', 'alphabet-train', 'prepositions', 'writing'];
const visualApps = ['coloring', 'draw-and-color', 'drawing-lines', 'chart-count'];
const matchingApps = ['matching', 'shadow-match', 'big-small', 'grid-match'];
const puzzleApps = ['crossword', 'sudoku', 'missing-pieces', 'odd-one-out', 'pattern-train', 'pattern-worksheet'];
const searchApps = ['find-and-count', 'find-objects', 'bingo', 'picture-sort', 'picture-path', 'treasure-hunt'];

function getCategory(appName) {
  if (mathApps.includes(appName)) return 'math';
  if (literacyApps.includes(appName)) return 'literacy';
  if (visualApps.includes(appName)) return 'visual';
  if (matchingApps.includes(appName)) return 'matching';
  if (puzzleApps.includes(appName)) return 'puzzle';
  if (searchApps.includes(appName)) return 'search';
  return null;
}

// ── Category-specific replacement targets (by ideaId, startId, guideId) ──

const categoryIdeaIds = {
  math: ['math-facts-printable-ideas', 'back-to-school-printable-ideas'],
  literacy: ['esl-printable-ideas', 'homeschool-printable-ideas'],
  visual: ['summer-printable-ideas', 'christmas-printable-ideas'],
  matching: ['preschool-printable-ideas', 'kindergarten-printable-ideas'],
  puzzle: ['first-grade-printable-ideas', 'second-grade-printable-ideas'],
  search: ['camping-printable-ideas', 'ocean-animals-printable-ideas'],
};

const categoryStartId = {
  math: 'create-worksheets-that-sell',
  literacy: 'complete-guide-printable-business',
  visual: 'etsy-printable-business',
  matching: 'printable-business-blueprint',
  puzzle: 'amazon-kdp-activity-books',
  search: 'marketing-printable-business',
};

const appGuideIdMap = {
  addition: 'create-addition-worksheets',
  subtraction: 'create-subtraction-worksheets',
  'code-addition': 'create-addition-worksheets',
  'more-less': 'create-counting-worksheets',
  'math-puzzle': 'create-math-puzzle-worksheets',
  'math-worksheet': 'sell-math-worksheets-etsy',
  wordsearch: 'create-word-search-puzzles',
  'word-scramble': 'create-word-search-puzzles',
  'word-guess': 'create-word-search-puzzles',
  cryptogram: 'create-cryptogram-puzzles',
  'alphabet-train': 'create-alphabet-worksheets',
  prepositions: 'create-preposition-worksheets',
  writing: 'create-handwriting-sheets',
  coloring: 'create-coloring-pages',
  'draw-and-color': 'create-drawing-worksheets',
  'drawing-lines': 'create-drawing-worksheets',
  'chart-count': 'create-chart-count-worksheets',
  matching: 'create-matching-worksheets',
  'shadow-match': 'create-shadow-matching-worksheets',
  'big-small': 'create-size-comparison-worksheets',
  'grid-match': 'create-matching-worksheets',
  crossword: 'create-crossword-puzzles',
  sudoku: 'create-picture-sudoku',
  'missing-pieces': 'create-missing-pieces-puzzles',
  'odd-one-out': 'create-odd-one-out-puzzles',
  'pattern-train': 'create-pattern-worksheets',
  'pattern-worksheet': 'create-pattern-worksheets',
  'find-and-count': 'create-counting-worksheets',
  'find-objects': 'create-hidden-object-worksheets',
  bingo: 'create-bingo-cards',
  'picture-sort': 'create-sorting-worksheets',
  'picture-path': 'create-maze-worksheets',
  'treasure-hunt': 'create-treasure-hunt-worksheets',
};

// Generic idea IDs to detect and replace
const genericIdeaIds = ['farm-animals-printable-ideas', 'dinosaur-printable-ideas'];
const genericStartId = 'complete-guide-printable-business';

// ── Localized Anchor Text Templates ──

const anchorText = {
  de: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Mathe-Fakten Druckvorlagen-Ideen f\u00fcr P\u00e4dagogen & Verk\u00e4ufer',
      'back-to-school-printable-ideas': 'Schulanfang-Druckvorlagen-Ideen die sich verkaufen',
      'esl-printable-ideas': 'ESL-Druckvorlagen-Ideen f\u00fcr Sprachenlernen',
      'homeschool-printable-ideas': 'Homeschool-Druckvorlagen-Ideen f\u00fcr Eltern & P\u00e4dagogen',
      'summer-printable-ideas': 'Sommer-Druckvorlagen-Ideen f\u00fcr Kinderaktivit\u00e4ten',
      'christmas-printable-ideas': 'Weihnachts-Druckvorlagen-Ideen f\u00fcr saisonalen Verkauf',
      'preschool-printable-ideas': 'Vorschul-Druckvorlagen-Ideen f\u00fcr fr\u00fche F\u00f6rderung',
      'kindergarten-printable-ideas': 'Kindergarten-Druckvorlagen-Ideen f\u00fcr junge Sch\u00fcler',
      'first-grade-printable-ideas': 'Erste-Klasse Druckvorlagen-Ideen f\u00fcr Grundschule',
      'second-grade-printable-ideas': 'Zweite-Klasse Druckvorlagen-Ideen f\u00fcr Grundsch\u00fcler',
      'camping-printable-ideas': 'Camping-Druckvorlagen-Ideen f\u00fcr Outdoor-Lernen',
      'ocean-animals-printable-ideas': 'Meerestiere-Druckvorlagen-Ideen f\u00fcr maritime Themen',
    },
    startLabels: {
      'create-worksheets-that-sell': 'Arbeitsbl\u00e4tter erstellen, die sich verkaufen',
      'complete-guide-printable-business': 'Die Komplettanleitung f\u00fcr Ihr Druckvorlagen-Gesch\u00e4ft',
      'etsy-printable-business': 'Ihr Etsy-Druckvorlagen-Gesch\u00e4ft aufbauen',
      'printable-business-blueprint': 'Ihr Druckvorlagen-Gesch\u00e4fts-Bauplan',
      'amazon-kdp-activity-books': 'Aktivit\u00e4tsb\u00fccher auf Amazon KDP ver\u00f6ffentlichen',
      'marketing-printable-business': 'Marketing f\u00fcr Ihr Druckvorlagen-Gesch\u00e4ft',
    },
    guidePrefix: '',
  },
  fr: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Id\u00e9es d\'imprimables de faits math\u00e9matiques',
      'back-to-school-printable-ideas': 'Id\u00e9es d\'imprimables rentr\u00e9e scolaire',
      'esl-printable-ideas': 'Id\u00e9es d\'imprimables pour l\'apprentissage des langues',
      'homeschool-printable-ideas': 'Id\u00e9es d\'imprimables pour l\'\u00e9ducation \u00e0 domicile',
      'summer-printable-ideas': 'Id\u00e9es d\'imprimables d\'\u00e9t\u00e9 pour enfants',
      'christmas-printable-ideas': 'Id\u00e9es d\'imprimables de No\u00ebl pour ventes saisonni\u00e8res',
      'preschool-printable-ideas': 'Id\u00e9es d\'imprimables pour la maternelle',
      'kindergarten-printable-ideas': 'Id\u00e9es d\'imprimables pour le jardin d\'enfants',
      'first-grade-printable-ideas': 'Id\u00e9es d\'imprimables pour le CP',
      'second-grade-printable-ideas': 'Id\u00e9es d\'imprimables pour le CE1',
      'camping-printable-ideas': 'Id\u00e9es d\'imprimables camping et plein air',
      'ocean-animals-printable-ideas': 'Id\u00e9es d\'imprimables animaux marins',
    },
    startLabels: {
      'create-worksheets-that-sell': 'Cr\u00e9er des fiches qui se vendent',
      'complete-guide-printable-business': 'Le guide complet pour lancer une activit\u00e9 d\'imprimables',
      'etsy-printable-business': 'Lancez votre activit\u00e9 d\'imprimables sur Etsy',
      'printable-business-blueprint': 'Plan d\'activit\u00e9 pour imprimables',
      'amazon-kdp-activity-books': 'Publier des livres d\'activit\u00e9s sur Amazon KDP',
      'marketing-printable-business': 'Marketing pour votre activit\u00e9 d\'imprimables',
    },
  },
  es: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Ideas de imprimibles de matem\u00e1ticas para educadores y vendedores',
      'back-to-school-printable-ideas': 'Ideas de imprimibles de vuelta al cole que se venden',
      'esl-printable-ideas': 'Ideas de imprimibles ESL para aprendizaje de idiomas',
      'homeschool-printable-ideas': 'Ideas de imprimibles para educaci\u00f3n en casa',
      'summer-printable-ideas': 'Ideas de imprimibles de verano para ni\u00f1os',
      'christmas-printable-ideas': 'Ideas de imprimibles navide\u00f1os para ventas estacionales',
      'preschool-printable-ideas': 'Ideas de imprimibles para preescolar',
      'kindergarten-printable-ideas': 'Ideas de imprimibles para jard\u00edn de infancia',
      'first-grade-printable-ideas': 'Ideas de imprimibles para primer grado',
      'second-grade-printable-ideas': 'Ideas de imprimibles para segundo grado',
      'camping-printable-ideas': 'Ideas de imprimibles de camping y aire libre',
      'ocean-animals-printable-ideas': 'Ideas de imprimibles de animales marinos',
    },
    startLabels: {
      'create-worksheets-that-sell': 'C\u00f3mo crear fichas que se vendan',
      'complete-guide-printable-business': 'Gu\u00eda completa para iniciar un negocio de imprimibles',
      'etsy-printable-business': 'Lanza tu negocio de imprimibles en Etsy',
      'printable-business-blueprint': 'Plan de negocio de imprimibles',
      'amazon-kdp-activity-books': 'Publicar libros de actividades en Amazon KDP',
      'marketing-printable-business': 'Marketing para tu negocio de imprimibles',
    },
  },
  pt: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Ideias de imprim\u00edveis de matem\u00e1tica para educadores e vendedores',
      'back-to-school-printable-ideas': 'Ideias de imprim\u00edveis de regresso \u00e0s aulas',
      'esl-printable-ideas': 'Ideias de imprim\u00edveis para aprendizagem de l\u00ednguas',
      'homeschool-printable-ideas': 'Ideias de imprim\u00edveis para educa\u00e7\u00e3o em casa',
      'summer-printable-ideas': 'Ideias de imprim\u00edveis de ver\u00e3o para crian\u00e7as',
      'christmas-printable-ideas': 'Ideias de imprim\u00edveis de Natal para vendas sazonais',
      'preschool-printable-ideas': 'Ideias de imprim\u00edveis para pr\u00e9-escolar',
      'kindergarten-printable-ideas': 'Ideias de imprim\u00edveis para jardim de inf\u00e2ncia',
      'first-grade-printable-ideas': 'Ideias de imprim\u00edveis para primeiro ano',
      'second-grade-printable-ideas': 'Ideias de imprim\u00edveis para segundo ano',
      'camping-printable-ideas': 'Ideias de imprim\u00edveis de camping e ar livre',
      'ocean-animals-printable-ideas': 'Ideias de imprim\u00edveis de animais marinhos',
    },
    startLabels: {
      'create-worksheets-that-sell': 'Como criar fichas que vendem',
      'complete-guide-printable-business': 'Guia completo para iniciar um neg\u00f3cio de imprim\u00edveis',
      'etsy-printable-business': 'Lance seu neg\u00f3cio de imprim\u00edveis na Etsy',
      'printable-business-blueprint': 'Plano de neg\u00f3cio de imprim\u00edveis',
      'amazon-kdp-activity-books': 'Publicar livros de atividades na Amazon KDP',
      'marketing-printable-business': 'Marketing para seu neg\u00f3cio de imprim\u00edveis',
    },
  },
  it: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Idee di stampabili di matematica per educatori e venditori',
      'back-to-school-printable-ideas': 'Idee di stampabili per il ritorno a scuola',
      'esl-printable-ideas': 'Idee di stampabili per l\'apprendimento delle lingue',
      'homeschool-printable-ideas': 'Idee di stampabili per l\'istruzione a casa',
      'summer-printable-ideas': 'Idee di stampabili estivi per bambini',
      'christmas-printable-ideas': 'Idee di stampabili natalizi per vendite stagionali',
      'preschool-printable-ideas': 'Idee di stampabili per la scuola materna',
      'kindergarten-printable-ideas': 'Idee di stampabili per l\'asilo',
      'first-grade-printable-ideas': 'Idee di stampabili per la prima elementare',
      'second-grade-printable-ideas': 'Idee di stampabili per la seconda elementare',
      'camping-printable-ideas': 'Idee di stampabili per campeggio e attivit\u00e0 all\'aperto',
      'ocean-animals-printable-ideas': 'Idee di stampabili di animali marini',
    },
    startLabels: {
      'create-worksheets-that-sell': 'Come creare schede che vendono',
      'complete-guide-printable-business': 'Guida completa per avviare un\'attivit\u00e0 di stampabili',
      'etsy-printable-business': 'Avvia la tua attivit\u00e0 di stampabili su Etsy',
      'printable-business-blueprint': 'Piano per la tua attivit\u00e0 di stampabili',
      'amazon-kdp-activity-books': 'Pubblicare libri di attivit\u00e0 su Amazon KDP',
      'marketing-printable-business': 'Marketing per la tua attivit\u00e0 di stampabili',
    },
  },
  nl: {
    ideaLabels: {
      'math-facts-printable-ideas': 'Reken-feiten printable idee\u00ebn voor docenten en verkopers',
      'back-to-school-printable-ideas': 'Terug-naar-school printable idee\u00ebn die verkopen',
      'esl-printable-ideas': 'ESL printable idee\u00ebn voor taalonderwijs',
      'homeschool-printable-ideas': 'Thuisonderwijs printable idee\u00ebn voor ouders en docenten',
      'summer-printable-ideas': 'Zomer printable idee\u00ebn voor kinderactiviteiten',
      'christmas-printable-ideas': 'Kerst printable idee\u00ebn voor seizoensverkoop',
      'preschool-printable-ideas': 'Peuteronderwijs printable idee\u00ebn voor vroege ontwikkeling',
      'kindergarten-printable-ideas': 'Kleuterschool printable idee\u00ebn voor jonge leerlingen',
      'first-grade-printable-ideas': 'Groep 3 printable idee\u00ebn voor basisonderwijs',
      'second-grade-printable-ideas': 'Groep 4 printable idee\u00ebn voor basisschoolleerlingen',
      'camping-printable-ideas': 'Camping printable idee\u00ebn voor buitenonderwijs',
      'ocean-animals-printable-ideas': 'Zeedieren printable idee\u00ebn voor maritieme thema\u0027s',
    },
    startLabels: {
      'create-worksheets-that-sell': 'Werkbladen maken die verkopen',
      'complete-guide-printable-business': 'De complete gids voor je printable bedrijf',
      'etsy-printable-business': 'Bouw je Etsy printable bedrijf',
      'printable-business-blueprint': 'Blauwdruk voor je printable bedrijf',
      'amazon-kdp-activity-books': 'Activiteitenboeken uitgeven op Amazon KDP',
      'marketing-printable-business': 'Marketing voor je printable bedrijf',
    },
  },
};

// Guide anchor text per locale — read from existing files where possible, otherwise use a template
// For guide links, we look up the existing anchor text in the English version and use the guide name
// Since we can't auto-translate, we use the guide slug formatted as a readable title
function getGuideAnchorText(guideId, locale) {
  // Use existing anchor patterns from the content files
  const templates = {
    de: {
      'create-addition-worksheets': 'Additions-Arbeitsbl\u00e4tter erstellen, die sich verkaufen',
      'create-subtraction-worksheets': 'Subtraktions-Arbeitsbl\u00e4tter erstellen, die sich verkaufen',
      'sell-math-worksheets-etsy': 'Leitfaden: Mathe-Arbeitsbl\u00e4tter auf Etsy verkaufen',
      'create-word-search-puzzles': 'Wortsuche-R\u00e4tsel erstellen, die sich verkaufen',
      'create-cryptogram-puzzles': 'Kryptogramm-R\u00e4tsel erstellen',
      'create-alphabet-worksheets': 'Alphabet-Arbeitsbl\u00e4tter erstellen',
      'create-preposition-worksheets': 'Pr\u00e4positionen-Arbeitsbl\u00e4tter erstellen',
      'create-handwriting-sheets': 'Schreib\u00fcbungen erstellen',
      'create-coloring-pages': 'Malvorlagen erstellen, die sich verkaufen',
      'create-drawing-worksheets': 'Zeichen-Arbeitsbl\u00e4tter erstellen',
      'create-chart-count-worksheets': 'Bilddiagramm-Arbeitsbl\u00e4tter erstellen',
      'create-matching-worksheets': 'Zuordnungs-Arbeitsbl\u00e4tter erstellen',
      'create-shadow-matching-worksheets': 'Schatten-Zuordnung Arbeitsbl\u00e4tter erstellen',
      'create-size-comparison-worksheets': 'Gr\u00f6\u00dfenvergleich-Arbeitsbl\u00e4tter erstellen',
      'create-crossword-puzzles': 'Kreuzwortr\u00e4tsel erstellen, die sich verkaufen',
      'create-picture-sudoku': 'Bilder-Sudoku f\u00fcr Kinder erstellen',
      'create-missing-pieces-puzzles': 'Fehlende-Teile-R\u00e4tsel erstellen',
      'create-odd-one-out-puzzles': 'Was-passt-nicht-R\u00e4tsel erstellen',
      'create-pattern-worksheets': 'Muster-Arbeitsbl\u00e4tter erstellen',
      'create-counting-worksheets': 'Z\u00e4hl-Arbeitsbl\u00e4tter erstellen',
      'create-hidden-object-worksheets': 'Suchbilder-Arbeitsbl\u00e4tter erstellen',
      'create-bingo-cards': 'Bingo-Karten erstellen, die sich verkaufen',
      'create-sorting-worksheets': 'Sortier-Arbeitsbl\u00e4tter erstellen',
      'create-maze-worksheets': 'Labyrinth-Arbeitsbl\u00e4tter erstellen',
      'create-treasure-hunt-worksheets': 'Schatzsuche-Arbeitsbl\u00e4tter erstellen',
      'math-activity-books-kdp': 'Mathe-Aktivit\u00e4tsb\u00fccher auf Amazon KDP',
      'sell-word-search-etsy': 'Wortsuche auf Etsy verkaufen',
      'create-etsy-coloring-pages': 'Malvorlagen f\u00fcr Etsy erstellen',
      'publish-puzzle-books-kdp': 'R\u00e4tselb\u00fccher auf Amazon KDP ver\u00f6ffentlichen',
    },
    fr: {
      'create-addition-worksheets': 'Cr\u00e9er des fiches d\'addition qui se vendent',
      'create-subtraction-worksheets': 'Cr\u00e9er des fiches de soustraction qui se vendent',
      'sell-math-worksheets-etsy': 'Guide pour vendre des fiches de maths sur Etsy',
      'create-word-search-puzzles': 'Cr\u00e9er des mots cach\u00e9s qui se vendent',
      'create-cryptogram-puzzles': 'Cr\u00e9er des cryptogrammes',
      'create-alphabet-worksheets': 'Cr\u00e9er des fiches d\'alphabet',
      'create-preposition-worksheets': 'Cr\u00e9er des fiches de pr\u00e9positions',
      'create-handwriting-sheets': 'Cr\u00e9er des fiches d\'\u00e9criture',
      'create-coloring-pages': 'Cr\u00e9er des pages de coloriage qui se vendent',
      'create-drawing-worksheets': 'Cr\u00e9er des fiches de dessin',
      'create-chart-count-worksheets': 'Cr\u00e9er des fiches de graphiques d\'images',
      'create-matching-worksheets': 'Cr\u00e9er des fiches d\'association',
      'create-shadow-matching-worksheets': 'Cr\u00e9er des fiches de discrimination visuelle',
      'create-size-comparison-worksheets': 'Cr\u00e9er des fiches de comparaison de tailles',
      'create-crossword-puzzles': 'Cr\u00e9er des mots crois\u00e9s qui se vendent',
      'create-picture-sudoku': 'Cr\u00e9er des sudoku d\'images pour enfants',
      'create-missing-pieces-puzzles': 'Cr\u00e9er des puzzles de pi\u00e8ces manquantes',
      'create-odd-one-out-puzzles': 'Cr\u00e9er des fiches de l\'intrus',
      'create-pattern-worksheets': 'Cr\u00e9er des fiches de s\u00e9quences logiques',
      'create-counting-worksheets': 'Cr\u00e9er des fiches de comptage',
      'create-hidden-object-worksheets': 'Cr\u00e9er des fiches d\'objets cach\u00e9s',
      'create-bingo-cards': 'Cr\u00e9er des cartes bingo qui se vendent',
      'create-sorting-worksheets': 'Cr\u00e9er des fiches de tri',
      'create-maze-worksheets': 'Cr\u00e9er des fiches de labyrinthes',
      'create-treasure-hunt-worksheets': 'Cr\u00e9er des fiches de chasse au tr\u00e9sor',
      'math-activity-books-kdp': 'Livres d\'activit\u00e9s maths sur Amazon KDP',
      'sell-word-search-etsy': 'Vendre des mots cach\u00e9s sur Etsy',
      'create-etsy-coloring-pages': 'Cr\u00e9er des coloriages pour Etsy',
      'publish-puzzle-books-kdp': 'Publier des livres de puzzles sur Amazon KDP',
    },
    es: {
      'create-addition-worksheets': 'Crear fichas de suma que se vendan',
      'create-subtraction-worksheets': 'Crear fichas de resta que se vendan',
      'sell-math-worksheets-etsy': 'Gu\u00eda para vender fichas de matem\u00e1ticas en Etsy',
      'create-word-search-puzzles': 'Crear sopas de letras que se vendan',
      'create-cryptogram-puzzles': 'Crear criptogramas',
      'create-alphabet-worksheets': 'Crear fichas de abecedario',
      'create-preposition-worksheets': 'Crear fichas de preposiciones',
      'create-handwriting-sheets': 'Crear fichas de escritura',
      'create-coloring-pages': 'Crear p\u00e1ginas de colorear que se vendan',
      'create-drawing-worksheets': 'Crear fichas de dibujo',
      'create-chart-count-worksheets': 'Crear fichas de gr\u00e1ficos de im\u00e1genes',
      'create-matching-worksheets': 'Crear fichas de asociaci\u00f3n',
      'create-shadow-matching-worksheets': 'Crear fichas de discriminaci\u00f3n visual',
      'create-size-comparison-worksheets': 'Crear fichas de comparaci\u00f3n de tama\u00f1os',
      'create-crossword-puzzles': 'Crear crucigramas que se vendan',
      'create-picture-sudoku': 'Crear sudoku de im\u00e1genes para ni\u00f1os',
      'create-missing-pieces-puzzles': 'Crear puzzles de piezas faltantes',
      'create-odd-one-out-puzzles': 'Crear fichas del intruso',
      'create-pattern-worksheets': 'Crear fichas de patrones',
      'create-counting-worksheets': 'Crear fichas de conteo',
      'create-hidden-object-worksheets': 'Crear fichas de objetos ocultos',
      'create-bingo-cards': 'Crear tarjetas de bingo que se vendan',
      'create-sorting-worksheets': 'Crear fichas de clasificaci\u00f3n',
      'create-maze-worksheets': 'Crear fichas de laberintos',
      'create-treasure-hunt-worksheets': 'Crear fichas de b\u00fasqueda del tesoro',
      'math-activity-books-kdp': 'Libros de actividades de matem\u00e1ticas en Amazon KDP',
      'sell-word-search-etsy': 'Vender sopas de letras en Etsy',
      'create-etsy-coloring-pages': 'Crear p\u00e1ginas de colorear para Etsy',
      'publish-puzzle-books-kdp': 'Publicar libros de puzzles en Amazon KDP',
    },
    pt: {
      'create-addition-worksheets': 'Criar fichas de adi\u00e7\u00e3o que vendem',
      'create-subtraction-worksheets': 'Criar fichas de subtra\u00e7\u00e3o que vendem',
      'sell-math-worksheets-etsy': 'Guia para vender fichas de matem\u00e1tica na Etsy',
      'create-word-search-puzzles': 'Criar ca\u00e7a-palavras que vendem',
      'create-cryptogram-puzzles': 'Criar criptogramas',
      'create-alphabet-worksheets': 'Criar fichas de alfabeto',
      'create-preposition-worksheets': 'Criar fichas de preposi\u00e7\u00f5es',
      'create-handwriting-sheets': 'Criar fichas de escrita',
      'create-coloring-pages': 'Criar p\u00e1ginas de colorir que vendem',
      'create-drawing-worksheets': 'Criar fichas de desenho',
      'create-chart-count-worksheets': 'Criar fichas de gr\u00e1ficos de imagens',
      'create-matching-worksheets': 'Criar fichas de associa\u00e7\u00e3o',
      'create-shadow-matching-worksheets': 'Criar fichas de discrimina\u00e7\u00e3o visual',
      'create-size-comparison-worksheets': 'Criar fichas de compara\u00e7\u00e3o de tamanhos',
      'create-crossword-puzzles': 'Criar palavras cruzadas que vendem',
      'create-picture-sudoku': 'Criar sudoku de imagens para crian\u00e7as',
      'create-missing-pieces-puzzles': 'Criar puzzles de pe\u00e7as faltantes',
      'create-odd-one-out-puzzles': 'Criar fichas do intruso',
      'create-pattern-worksheets': 'Criar fichas de padr\u00f5es',
      'create-counting-worksheets': 'Criar fichas de contagem',
      'create-hidden-object-worksheets': 'Criar fichas de objetos ocultos',
      'create-bingo-cards': 'Criar cartelas de bingo que vendem',
      'create-sorting-worksheets': 'Criar fichas de classifica\u00e7\u00e3o',
      'create-maze-worksheets': 'Criar fichas de labirintos',
      'create-treasure-hunt-worksheets': 'Criar fichas de ca\u00e7a ao tesouro',
      'math-activity-books-kdp': 'Livros de atividades de matem\u00e1tica na Amazon KDP',
      'sell-word-search-etsy': 'Vender ca\u00e7a-palavras na Etsy',
      'create-etsy-coloring-pages': 'Criar p\u00e1ginas de colorir para Etsy',
      'publish-puzzle-books-kdp': 'Publicar livros de puzzles na Amazon KDP',
    },
    it: {
      'create-addition-worksheets': 'Creare schede di addizione che vendono',
      'create-subtraction-worksheets': 'Creare schede di sottrazione che vendono',
      'sell-math-worksheets-etsy': 'Guida per vendere schede di matematica su Etsy',
      'create-word-search-puzzles': 'Creare cerca parole che vendono',
      'create-cryptogram-puzzles': 'Creare crittogrammi',
      'create-alphabet-worksheets': 'Creare schede di alfabeto',
      'create-preposition-worksheets': 'Creare schede di preposizioni',
      'create-handwriting-sheets': 'Creare schede di scrittura',
      'create-coloring-pages': 'Creare pagine da colorare che vendono',
      'create-drawing-worksheets': 'Creare schede di disegno',
      'create-chart-count-worksheets': 'Creare schede di grafici ad immagini',
      'create-matching-worksheets': 'Creare schede di abbinamento',
      'create-shadow-matching-worksheets': 'Creare schede di discriminazione visiva',
      'create-size-comparison-worksheets': 'Creare schede di confronto dimensioni',
      'create-crossword-puzzles': 'Creare cruciverba che vendono',
      'create-picture-sudoku': 'Creare sudoku ad immagini per bambini',
      'create-missing-pieces-puzzles': 'Creare puzzle di pezzi mancanti',
      'create-odd-one-out-puzzles': 'Creare schede dell\'intruso',
      'create-pattern-worksheets': 'Creare schede di sequenze logiche',
      'create-counting-worksheets': 'Creare schede di conteggio',
      'create-hidden-object-worksheets': 'Creare schede di oggetti nascosti',
      'create-bingo-cards': 'Creare cartelle bingo che vendono',
      'create-sorting-worksheets': 'Creare schede di classificazione',
      'create-maze-worksheets': 'Creare schede di labirinti',
      'create-treasure-hunt-worksheets': 'Creare schede di caccia al tesoro',
      'math-activity-books-kdp': 'Libri di attivit\u00e0 di matematica su Amazon KDP',
      'sell-word-search-etsy': 'Vendere cerca parole su Etsy',
      'create-etsy-coloring-pages': 'Creare pagine da colorare per Etsy',
      'publish-puzzle-books-kdp': 'Pubblicare libri di puzzle su Amazon KDP',
    },
    nl: {
      'create-addition-worksheets': 'Optellen werkbladen maken die verkopen',
      'create-subtraction-worksheets': 'Aftrekken werkbladen maken die verkopen',
      'sell-math-worksheets-etsy': 'Gids: rekenwerkbladen verkopen op Etsy',
      'create-word-search-puzzles': 'Woordzoekers maken die verkopen',
      'create-cryptogram-puzzles': 'Cryptogrammen maken',
      'create-alphabet-worksheets': 'Alfabet werkbladen maken',
      'create-preposition-worksheets': 'Voorzetsels werkbladen maken',
      'create-handwriting-sheets': 'Schrijfoefeningen maken',
      'create-coloring-pages': 'Kleurplaten maken die verkopen',
      'create-drawing-worksheets': 'Teken werkbladen maken',
      'create-chart-count-worksheets': 'Telgrafiek werkbladen maken',
      'create-matching-worksheets': 'Koppel werkbladen maken',
      'create-shadow-matching-worksheets': 'Schaduw-koppelen werkbladen maken',
      'create-size-comparison-worksheets': 'Groottevergelijking werkbladen maken',
      'create-crossword-puzzles': 'Kruiswoordpuzzels maken die verkopen',
      'create-picture-sudoku': 'Plaatjes sudoku voor kinderen maken',
      'create-missing-pieces-puzzles': 'Ontbrekende stukjes puzzels maken',
      'create-odd-one-out-puzzles': 'Wat hoort er niet bij puzzels maken',
      'create-pattern-worksheets': 'Patronen werkbladen maken',
      'create-counting-worksheets': 'Tel werkbladen maken',
      'create-hidden-object-worksheets': 'Zoek-voorwerpen werkbladen maken',
      'create-bingo-cards': 'Bingokaarten maken die verkopen',
      'create-sorting-worksheets': 'Sorteer werkbladen maken',
      'create-maze-worksheets': 'Doolhof werkbladen maken',
      'create-treasure-hunt-worksheets': 'Schattenjacht werkbladen maken',
      'math-activity-books-kdp': 'Reken-activiteitenboeken op Amazon KDP',
      'sell-word-search-etsy': 'Woordzoekers verkopen op Etsy',
      'create-etsy-coloring-pages': 'Kleurplaten maken voor Etsy',
      'publish-puzzle-books-kdp': 'Puzzelboeken uitgeven op Amazon KDP',
    },
  };
  return templates[locale]?.[guideId] || null;
}

// Bundle cross-category links (by guideId/startId/ideaId — resolved to locale slug at runtime)
const bundleCrossLinkIds = {
  'math-bundle': {
    guides: ['sell-math-worksheets-etsy', 'math-activity-books-kdp'],
    start: 'create-worksheets-that-sell',
    idea: 'math-facts-printable-ideas',
  },
  'literacy-bundle': {
    guides: ['sell-word-search-etsy', 'create-word-search-puzzles'],
    start: 'complete-guide-printable-business',
    idea: 'esl-printable-ideas',
  },
  'visual-bundle': {
    guides: ['create-etsy-coloring-pages', 'create-drawing-worksheets'],
    start: 'etsy-printable-business',
    idea: 'summer-printable-ideas',
  },
  'matching-bundle': {
    guides: ['create-matching-worksheets', 'create-shadow-matching-worksheets'],
    start: 'printable-business-blueprint',
    idea: 'preschool-printable-ideas',
  },
  'puzzle-bundle': {
    guides: ['create-crossword-puzzles', 'publish-puzzle-books-kdp'],
    start: 'amazon-kdp-activity-books',
    idea: 'first-grade-printable-ideas',
  },
  'search-bundle': {
    guides: ['create-hidden-object-worksheets', 'create-treasure-hunt-worksheets'],
    start: 'marketing-printable-business',
    idea: 'camping-printable-ideas',
  },
};

// ── File Processing ──

function findInternalLinksBlock(content) {
  const startMarker = 'internalLinks: [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return null;

  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + startMarker.length; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      if (depth === 0) { endIdx = i; break; }
      depth--;
    }
  }
  if (endIdx === -1) return null;
  return { startIdx, endIdx, block: content.substring(startIdx + startMarker.length, endIdx) };
}

function parseLinks(block) {
  const links = [];
  // Match both single-line and multi-line formats
  // Use ((?:[^'\\]|\\.)*)  to handle escaped quotes like d\'Addition
  const patterns = [
    /\{\s*pageType:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*anchorText:\s*'((?:[^'\\]|\\.)*)'\s*\}/g,
    /\{\s*\n\s*pageType:\s*'([^']+)',\s*\n\s*slug:\s*'([^']+)',\s*\n\s*anchorText:\s*'((?:[^'\\]|\\.)*)'\s*,?\s*\n\s*\}/g,
  ];
  const seen = new Set();
  for (const regex of patterns) {
    let m;
    while ((m = regex.exec(block)) !== null) {
      if (!seen.has(m[2])) {
        seen.add(m[2]);
        // anchorText already contains the raw escaped content from file (e.g. d\'Addition)
        // Store it as-is — don't unescape
        links.push({ pageType: m[1], slug: m[2], anchorText: m[3] });
      }
    }
  }
  return links;
}

function slugToId(slug, slugMap) {
  for (const [id, locales] of Object.entries(slugMap)) {
    for (const s of Object.values(locales)) {
      if (s === slug) return id;
    }
  }
  return null;
}

function formatLink(link) {
  // anchorText from existing links already has \' escaping from the file
  // anchorText from new links uses raw text that needs escaping
  // We mark new links with _isNew flag
  const at = link._isNew ? link.anchorText.replace(/'/g, "\\'") : link.anchorText;
  return `    {\n      pageType: '${link.pageType}',\n      slug: '${link.slug}',\n      anchorText: '${at}',\n    }`;
}

function formatLinkInline(link) {
  const at = link._isNew ? link.anchorText.replace(/'/g, "\\'") : link.anchorText;
  return `    { pageType: '${link.pageType}', slug: '${link.slug}', anchorText: '${at}' }`;
}

function processAppFile(filePath, locale) {
  const appName = path.basename(filePath, '.ts');
  const category = getCategory(appName);
  if (!category) return 0;

  const content = fs.readFileSync(filePath, 'utf8');
  const block = findInternalLinksBlock(content);
  if (!block) {
    console.log(`    \u26a0 No internalLinks in ${appName}`);
    return 0;
  }

  const existingLinks = parseLinks(block.block);
  if (existingLinks.length === 0) {
    console.log(`    \u26a0 Empty internalLinks in ${appName}`);
    return 0;
  }

  let changes = 0;
  const newLinks = [];
  const existingSlugs = new Set(existingLinks.map(l => l.slug));

  // Resolve generic slugs for this locale
  const genericIdeaSlugsLocale = genericIdeaIds.map(id => getSlug(ideaSlugMap, id, locale)).filter(Boolean);
  const genericStartSlugLocale = getSlug(startSlugMap, genericStartId, locale);

  for (const link of existingLinks) {
    if (link.pageType === 'tool') { changes++; continue; }
    if (link.pageType === 'idea' && genericIdeaSlugsLocale.includes(link.slug)) { changes++; continue; }
    if (link.pageType === 'start' && link.slug === genericStartSlugLocale && category !== 'literacy') { changes++; continue; }
    newLinks.push(link);
  }

  // Add category-specific ideas
  for (const ideaId of categoryIdeaIds[category]) {
    const slug = getSlug(ideaSlugMap, ideaId, locale);
    if (!slug) continue;
    if (newLinks.find(l => l.slug === slug)) continue;
    const at = anchorText[locale]?.ideaLabels?.[ideaId];
    if (!at) { console.log(`    \u26a0 Missing idea anchor text: ${ideaId} (${locale})`); continue; }
    newLinks.push({ pageType: 'idea', slug, anchorText: at, _isNew: true });
    changes++;
  }

  // Add category-specific start
  const startId = categoryStartId[category];
  const startSlug = getSlug(startSlugMap, startId, locale);
  if (startSlug && !newLinks.find(l => l.pageType === 'start' && l.slug === startSlug)) {
    const at = anchorText[locale]?.startLabels?.[startId];
    if (at) { newLinks.push({ pageType: 'start', slug: startSlug, anchorText: at, _isNew: true }); changes++; }
  }

  // Add app-specific guide
  const guideId = appGuideIdMap[appName];
  if (guideId) {
    const guideSlug = getSlug(guideSlugMap, guideId, locale);
    if (guideSlug && !newLinks.find(l => l.slug === guideSlug)) {
      const at = getGuideAnchorText(guideId, locale);
      if (at) { newLinks.push({ pageType: 'guide', slug: guideSlug, anchorText: at, _isNew: true }); changes++; }
    }
  }

  if (changes === 0) return 0;

  const newLinksStr = newLinks.map(formatLink).join(',\n');
  const newContent = content.substring(0, block.startIdx) +
    'internalLinks: [\n' + newLinksStr + ',\n  ]' +
    content.substring(block.endIdx + 1);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`    \u2705 ${appName} \u2014 ${changes} link(s) changed`);
  return changes;
}

function processBundleFile(filePath, locale) {
  const bundleName = path.basename(filePath, '.ts');
  const crossIds = bundleCrossLinkIds[bundleName];
  if (!crossIds) return 0;

  const content = fs.readFileSync(filePath, 'utf8');
  const block = findInternalLinksBlock(content);
  if (!block) {
    console.log(`    \u26a0 No internalLinks in ${bundleName}`);
    return 0;
  }

  const existingLinks = parseLinks(block.block);
  let changes = 0;
  const newLinks = [];

  for (const link of existingLinks) {
    if (link.pageType === 'tool') { changes++; continue; }
    newLinks.push(link);
  }

  // Add guide links
  for (const guideId of crossIds.guides) {
    const slug = getSlug(guideSlugMap, guideId, locale);
    if (!slug || newLinks.find(l => l.slug === slug)) continue;
    const at = getGuideAnchorText(guideId, locale);
    if (at) { newLinks.push({ pageType: 'guide', slug, anchorText: at, _isNew: true }); changes++; }
  }

  // Add start link
  const startSlug = getSlug(startSlugMap, crossIds.start, locale);
  if (startSlug && !newLinks.find(l => l.slug === startSlug)) {
    const at = anchorText[locale]?.startLabels?.[crossIds.start];
    if (at) { newLinks.push({ pageType: 'start', slug: startSlug, anchorText: at, _isNew: true }); changes++; }
  }

  // Add idea link
  const ideaSlug = getSlug(ideaSlugMap, crossIds.idea, locale);
  if (ideaSlug && !newLinks.find(l => l.slug === ideaSlug)) {
    const at = anchorText[locale]?.ideaLabels?.[crossIds.idea];
    if (at) { newLinks.push({ pageType: 'idea', slug: ideaSlug, anchorText: at, _isNew: true }); changes++; }
  }

  if (changes === 0) return 0;

  const newLinksStr = newLinks.map(formatLinkInline).join(',\n');
  const newContent = content.substring(0, block.startIdx) +
    'internalLinks: [\n' + newLinksStr + ',\n  ]' +
    content.substring(block.endIdx + 1);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`    \u2705 ${bundleName} \u2014 ${changes} link(s) changed`);
  return changes;
}

// ── Main ──

let grandTotal = 0;

for (const locale of LOCALES) {
  console.log(`\n=== ${locale.toUpperCase()} ===`);

  const appDir = path.join(configDir, 'app-content', locale);
  const bundleDir = path.join(configDir, 'bundle-content', locale);

  if (!fs.existsSync(appDir)) { console.log(`  App content dir not found: ${appDir}`); continue; }

  console.log(`\n  App content:`);
  const appFiles = fs.readdirSync(appDir).filter(f => f.endsWith('.ts'));
  for (const file of appFiles) {
    grandTotal += processAppFile(path.join(appDir, file), locale);
  }

  if (fs.existsSync(bundleDir)) {
    console.log(`\n  Bundle content:`);
    const bundleFiles = fs.readdirSync(bundleDir).filter(f => f.endsWith('.ts'));
    for (const file of bundleFiles) {
      grandTotal += processBundleFile(path.join(bundleDir, file), locale);
    }
  }
}

console.log(`\n\u2705 Done \u2014 ${grandTotal} total link changes across DE, FR, ES, PT, IT`);
