/**
 * Add German (de) slugs to all 5 slug config files.
 * Run: node scripts/add-german-slugs.js
 */
const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '..', 'frontend', 'config');

// German slug mappings for each config file
const toolSlugs = {
  'addition': 'kostenloses-additions-arbeitsblaetter-tool',
  'subtraction': 'kostenloses-subtraktions-arbeitsblaetter-tool',
  'code-addition': 'kostenloses-code-addition-arbeitsblaetter-tool',
  'more-less': 'kostenloses-mehr-oder-weniger-arbeitsblaetter-tool',
  'math-puzzle': 'kostenloses-mathe-raetsel-tool',
  'math-worksheet': 'kostenloses-mathe-arbeitsblaetter-tool',
  'alphabet-train': 'kostenloses-alphabet-zug-tool',
  'prepositions': 'kostenloses-praepositionen-arbeitsblaetter-tool',
  'word-guess': 'kostenloses-wort-raten-tool',
  'word-scramble': 'kostenloses-buchstabensalat-tool',
  'wordsearch': 'kostenloses-wortsuchrraetsel-tool',
  'cryptogram': 'kostenloses-kryptogramm-tool',
  'writing': 'kostenloses-schreibuebungs-tool',
  'big-small': 'kostenloses-gross-und-klein-arbeitsblaetter-tool',
  'pattern-train': 'kostenloses-muster-zug-tool',
  'pattern-worksheet': 'kostenloses-muster-arbeitsblaetter-tool',
  'draw-and-color': 'kostenloses-malen-und-ausmalen-tool',
  'drawing-lines': 'kostenloses-linien-zeichnen-tool',
  'coloring': 'kostenloses-ausmalbilder-tool',
  'chart-count': 'kostenloses-diagramm-zaehlen-tool',
  'matching': 'kostenloses-zuordnungs-arbeitsblaetter-tool',
  'grid-match': 'kostenloses-gitter-zuordnung-tool',
  'shadow-match': 'kostenloses-schatten-zuordnung-tool',
  'bingo': 'kostenloses-bingo-karten-tool',
  'picture-sort': 'kostenloses-bilder-sortieren-tool',
  'missing-pieces': 'kostenloses-fehlende-teile-tool',
  'odd-one-out': 'kostenloses-was-passt-nicht-tool',
  'sudoku': 'kostenloses-sudoku-tool',
  'picture-path': 'kostenloses-bilderpfad-tool',
  'find-and-count': 'kostenloses-finden-und-zaehlen-tool',
  'find-objects': 'kostenloses-suchbild-tool',
  'crossword': 'kostenloses-kreuzwortraetsel-tool',
  'treasure-hunt': 'kostenloses-schatzsuche-tool',
};

const bundleSlugs = {
  'math-bundle': 'mathe-komplett-paket',
  'literacy-bundle': 'lesen-und-schreiben-paket',
  'visual-bundle': 'visuelles-lernen-paket',
  'matching-bundle': 'zuordnung-und-sortierung-paket',
  'puzzle-bundle': 'raetsel-und-logik-paket',
  'search-bundle': 'suchen-und-finden-paket',
};

const startSlugs = {
  'complete-guide-printable-business': 'kompletter-leitfaden-druckbares-geschaeft',
  'create-worksheets-that-sell': 'arbeitsblaetter-erstellen-die-sich-verkaufen',
  'printable-business-blueprint': 'druckbares-geschaeft-bauplan',
  'etsy-printable-business': 'etsy-druckbares-geschaeft',
  'amazon-kdp-activity-books': 'amazon-kdp-aktivitaetsbuecher',
  'create-multilingual-worksheets': 'mehrsprachige-arbeitsblaetter-erstellen',
  'commercial-license-guide': 'kommerzielle-lizenz-leitfaden',
  'printable-business-income': 'druckbares-geschaeft-einkommen',
  'tools-for-printable-business': 'werkzeuge-fuer-druckbares-geschaeft',
  'marketing-printable-business': 'marketing-druckbares-geschaeft',
  'scaling-printable-business': 'skalierung-druckbares-geschaeft',
  'printable-business-legal': 'druckbares-geschaeft-rechtliches',
};

const guideSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'mathe-arbeitsblaetter-auf-etsy-verkaufen',
  'sell-word-search-etsy': 'wortsuchraetsel-auf-etsy-verkaufen',
  'start-etsy-printable-shop': 'etsy-druckbaren-shop-starten',
  'create-etsy-coloring-pages': 'etsy-ausmalbilder-erstellen',
  'sell-educational-printables-etsy': 'lernmaterialien-auf-etsy-verkaufen',
  'price-etsy-printables': 'etsy-druckbare-preise-festlegen',
  'etsy-seo-educational-printables': 'etsy-seo-fuer-lernmaterialien',
  'create-etsy-worksheet-bundles': 'etsy-arbeitsblaetter-pakete-erstellen',
  'math-activity-books-kdp': 'mathe-aktivitaetsbuecher-kdp',
  'publish-puzzle-books-kdp': 'raetselbuecher-auf-kdp-veroeffentlichen',
  'word-search-books-kdp': 'wortsuchraetsel-buecher-kdp',
  'make-money-kdp-activity-books': 'geld-verdienen-mit-kdp-aktivitaetsbuecher',
  'kdp-formatting-worksheets': 'kdp-formatierung-arbeitsblaetter',
  'best-kdp-activity-book-niches': 'beste-kdp-aktivitaetsbuch-nischen',
  'sudoku-books-kdp': 'sudoku-buecher-kdp',
  'kdp-vs-etsy-printables': 'kdp-vs-etsy-druckbare',
  'create-sell-tpt-resources': 'tpt-ressourcen-erstellen-und-verkaufen',
  'tpt-store-optimization': 'tpt-shop-optimierung',
  'sell-printables-gumroad': 'druckbare-auf-gumroad-verkaufen',
  'sell-creative-fabrica': 'auf-creative-fabrica-verkaufen',
  // Product Creation Guides (25)
  'create-addition-worksheets': 'additions-arbeitsblaetter-erstellen',
  'create-subtraction-worksheets': 'subtraktions-arbeitsblaetter-erstellen',
  'create-word-search-puzzles': 'wortsuchraetsel-erstellen',
  'create-crossword-puzzles': 'kreuzwortraetsel-erstellen',
  'create-math-puzzle-worksheets': 'mathe-raetsel-arbeitsblaetter-erstellen',
  'create-handwriting-sheets': 'schreibuebungsblaetter-erstellen',
  'create-coloring-pages': 'ausmalbilder-erstellen',
  'create-bingo-cards': 'bingo-karten-erstellen',
  'create-matching-worksheets': 'zuordnungs-arbeitsblaetter-erstellen',
  'create-pattern-worksheets': 'muster-arbeitsblaetter-erstellen',
  'create-picture-sudoku': 'bilder-sudoku-erstellen',
  'create-maze-worksheets': 'labyrinth-arbeitsblaetter-erstellen',
  'create-hidden-object-worksheets': 'suchbild-arbeitsblaetter-erstellen',
  'create-size-comparison-worksheets': 'groessenvergleich-arbeitsblaetter-erstellen',
  'create-counting-worksheets': 'zaehl-arbeitsblaetter-erstellen',
  'create-drawing-worksheets': 'zeichen-arbeitsblaetter-erstellen',
  'create-sorting-worksheets': 'sortier-arbeitsblaetter-erstellen',
  'create-shadow-matching-worksheets': 'schatten-zuordnung-arbeitsblaetter-erstellen',
  'create-odd-one-out-puzzles': 'was-passt-nicht-raetsel-erstellen',
  'create-missing-pieces-puzzles': 'fehlende-teile-raetsel-erstellen',
  'create-treasure-hunt-worksheets': 'schatzsuche-arbeitsblaetter-erstellen',
  'create-alphabet-worksheets': 'alphabet-arbeitsblaetter-erstellen',
  'create-preposition-worksheets': 'praepositionen-arbeitsblaetter-erstellen',
  'create-cryptogram-puzzles': 'kryptogramm-raetsel-erstellen',
  'create-chart-count-worksheets': 'diagramm-zaehlen-arbeitsblaetter-erstellen',
  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'arbeitsblaetter-pakete-erstellen',
  'niche-selection-printables': 'nischen-auswahl-druckbare',
  'create-printable-product-line': 'druckbare-produktlinie-erstellen',
  'pricing-educational-printables': 'preisgestaltung-lernmaterialien',
  'scale-printable-business-guide': 'druckbares-geschaeft-skalieren-leitfaden',
  'passive-income-worksheets': 'passives-einkommen-arbeitsblaetter',
  'understanding-commercial-licenses': 'kommerzielle-lizenzen-verstehen',
  'research-profitable-niches': 'profitable-nischen-recherchieren',
  'multilingual-printable-business': 'mehrsprachiges-druckbares-geschaeft',
  'worksheets-multiple-languages': 'arbeitsblaetter-in-mehreren-sprachen',
  'copyright-printable-sellers': 'urheberrecht-fuer-druckbare-verkaeufer',
  'customer-support-digital-products': 'kundensupport-digitale-produkte',
  'automate-printable-business': 'druckbares-geschaeft-automatisieren',
  'social-media-printable-marketing': 'social-media-marketing-druckbare',
  'pinterest-marketing-worksheets': 'pinterest-marketing-arbeitsblaetter',
  'email-marketing-printables': 'email-marketing-druckbare',
  'get-reviews-printable-products': 'bewertungen-fuer-druckbare-produkte',
  'seasonal-marketing-printables': 'saisonales-marketing-druckbare',
  'digital-vs-physical-printables': 'digital-vs-physisch-druckbare',
  'quality-standards-worksheets': 'qualitaetsstandards-arbeitsblaetter',
};

const ideaSlugs = {
  // Animals & Nature (8)
  'farm-animals-printable-ideas': 'bauernhof-tiere-druckbare-ideen',
  'ocean-animals-printable-ideas': 'meerestiere-druckbare-ideen',
  'safari-animals-printable-ideas': 'safari-tiere-druckbare-ideen',
  'pets-printable-ideas': 'haustiere-druckbare-ideen',
  'dinosaur-printable-ideas': 'dinosaurier-druckbare-ideen',
  'birds-printable-ideas': 'voegel-druckbare-ideen',
  'insects-printable-ideas': 'insekten-druckbare-ideen',
  'forest-animals-printable-ideas': 'waldtiere-druckbare-ideen',
  // Seasons & Holidays (10)
  'christmas-printable-ideas': 'weihnachten-druckbare-ideen',
  'halloween-printable-ideas': 'halloween-druckbare-ideen',
  'easter-printable-ideas': 'ostern-druckbare-ideen',
  'valentines-day-printable-ideas': 'valentinstag-druckbare-ideen',
  'back-to-school-printable-ideas': 'schulanfang-druckbare-ideen',
  'summer-printable-ideas': 'sommer-druckbare-ideen',
  'winter-printable-ideas': 'winter-druckbare-ideen',
  'spring-printable-ideas': 'fruehling-druckbare-ideen',
  'thanksgiving-printable-ideas': 'erntedank-druckbare-ideen',
  'parents-day-printable-ideas': 'elterntag-druckbare-ideen',
  // Interests & Activities (10)
  'space-printable-ideas': 'weltraum-druckbare-ideen',
  'transportation-printable-ideas': 'transport-druckbare-ideen',
  'food-cooking-printable-ideas': 'essen-und-kochen-druckbare-ideen',
  'sports-printable-ideas': 'sport-druckbare-ideen',
  'music-printable-ideas': 'musik-druckbare-ideen',
  'construction-printable-ideas': 'baustelle-druckbare-ideen',
  'pirates-printable-ideas': 'piraten-druckbare-ideen',
  'fairy-tale-printable-ideas': 'maerchen-druckbare-ideen',
  'camping-printable-ideas': 'camping-druckbare-ideen',
  'underwater-printable-ideas': 'unterwasser-druckbare-ideen',
  // Educational Focus (10)
  'preschool-printable-ideas': 'vorschule-druckbare-ideen',
  'kindergarten-printable-ideas': 'kindergarten-druckbare-ideen',
  'first-grade-printable-ideas': 'erste-klasse-druckbare-ideen',
  'second-grade-printable-ideas': 'zweite-klasse-druckbare-ideen',
  'third-grade-printable-ideas': 'dritte-klasse-druckbare-ideen',
  'homeschool-printable-ideas': 'homeschooling-druckbare-ideen',
  'special-education-printable-ideas': 'sonderpaedagogik-druckbare-ideen',
  'esl-printable-ideas': 'daf-druckbare-ideen',
  'summer-learning-printable-ideas': 'sommer-lernen-druckbare-ideen',
  'math-facts-printable-ideas': 'mathe-fakten-druckbare-ideen',
  // Business Models (7)
  'subscription-box-printable-ideas': 'abo-box-druckbare-ideen',
  'print-on-demand-printable-ideas': 'print-on-demand-druckbare-ideen',
  'digital-download-printable-ideas': 'digitaler-download-druckbare-ideen',
  'physical-printable-product-ideas': 'physische-druckbare-produkt-ideen',
  'party-supply-printable-ideas': 'partybedarf-druckbare-ideen',
  'custom-worksheet-service-ideas': 'individuelle-arbeitsblaetter-service-ideen',
  'bulk-licensing-printable-ideas': 'mengen-lizenzierung-druckbare-ideen',
};

function addSlugsToFile(filePath, slugMap, idField) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [id, deSlug] of Object.entries(slugMap)) {
    // Find the pattern: idField: 'id',\n    slugs: { en: 'xxx' },
    // Replace with: idField: 'id',\n    slugs: { en: 'xxx', de: 'deSlug' },
    const enSlugPattern = new RegExp(
      `(${idField}: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*slugs:\\s*\\{\\s*en:\\s*'[^']+')\\s*\\}`,
      'g'
    );
    content = content.replace(enSlugPattern, `$1, de: '${deSlug}' }`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Update all 5 config files
addSlugsToFile(
  path.join(configDir, 'tool-page-slugs.ts'),
  toolSlugs,
  'appId'
);

addSlugsToFile(
  path.join(configDir, 'bundle-page-slugs.ts'),
  bundleSlugs,
  'bundleId'
);

addSlugsToFile(
  path.join(configDir, 'start-page-slugs.ts'),
  startSlugs,
  'guideId'
);

addSlugsToFile(
  path.join(configDir, 'guide-page-slugs.ts'),
  guideSlugs,
  'guideId'
);

addSlugsToFile(
  path.join(configDir, 'idea-page-slugs.ts'),
  ideaSlugs,
  'ideaId'
);

console.log('\nDone! All German slugs added.');

// Verify counts
for (const [file, expected] of [
  ['tool-page-slugs.ts', 33],
  ['bundle-page-slugs.ts', 6],
  ['start-page-slugs.ts', 12],
  ['guide-page-slugs.ts', 65],
  ['idea-page-slugs.ts', 45],
]) {
  const content = fs.readFileSync(path.join(configDir, file), 'utf8');
  const deCount = (content.match(/de: '/g) || []).length;
  console.log(`${file}: ${deCount}/${expected} German slugs`);
}
