/**
 * P14-DA-001: Add Danish slugs to all 5 slug config files
 *
 * Adds `da:` entries to:
 * - tool-page-slugs.ts (33 entries)
 * - bundle-page-slugs.ts (6 entries)
 * - start-page-slugs.ts (12 entries)
 * - guide-page-slugs.ts (65 entries)
 * - idea-page-slugs.ts (45 entries)
 */

const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '..', 'frontend', 'config');

// ============================================================
// DANISH SLUGS
// ============================================================

const toolSlugs = {
  'image-addition': 'additions-arbejdsark-skaber',
  'image-subtraction': 'subtraktions-arbejdsark-skaber',
  'code-addition': 'kode-additions-arbejdsark-skaber',
  'more-less': 'mere-eller-mindre-arbejdsark-skaber',
  'math-puzzle': 'mattepuslespil-skaber',
  'math-worksheet': 'matematik-arbejdsark-skaber',
  'alphabet-train': 'alfabet-tog-skaber',
  'prepositions': 'praepositioner-arbejdsark-skaber',
  'word-guess': 'gaet-ordet-skaber',
  'word-scramble': 'ordmix-skaber',
  'word-search': 'ordsoegning-skaber',
  'cryptogram': 'kryptogram-skaber',
  'writing': 'skriveovelser-skaber',
  'big-small': 'stor-lille-arbejdsark-skaber',
  'pattern-train': 'moenstertog-skaber',
  'pattern-worksheet': 'moenster-arbejdsark-skaber',
  'draw-and-color': 'tegn-og-farvelaeg-skaber',
  'drawing-lines': 'linjeovelser-skaber',
  'coloring': 'farvelaegningssider-skaber',
  'chart-count': 'billeddiagram-arbejdsark-skaber',
  'matching': 'matchnings-arbejdsark-skaber',
  'grid-match': 'gitterpuslespil-skaber',
  'shadow-match': 'skyggematchning-skaber',
  'bingo': 'billedbingo-skaber',
  'picture-sort': 'billedsortering-skaber',
  'missing-pieces': 'manglende-brikker-skaber',
  'odd-one-out': 'find-den-forkerte-skaber',
  'sudoku': 'boerne-sudoku-skaber',
  'picture-path': 'billedsti-skaber',
  'find-and-count': 'find-og-tael-skaber',
  'find-objects': 'find-genstandene-skaber',
  'crossword': 'billedkrydsord-skaber',
  'treasure-hunt': 'skattejagt-skaber',
};

const bundleSlugs = {
  'math-bundle': 'matematik-mestring-pakke',
  'literacy-bundle': 'laesning-sprog-pakke',
  'visual-bundle': 'visuel-laering-pakke',
  'matching-bundle': 'matchning-sortering-pakke',
  'puzzle-bundle': 'puslespil-logik-pakke',
  'search-bundle': 'soeg-find-pakke',
};

const startSlugs = {
  'complete-guide-printable-business': 'komplet-guide-printbar-forretning',
  'create-worksheets-that-sell': 'skab-arbejdsark-der-saelger',
  'printable-business-blueprint': 'printbar-forretning-plan',
  'etsy-printable-business': 'etsy-printbar-forretning',
  'amazon-kdp-activity-books': 'amazon-kdp-aktivitetsboeger',
  'create-multilingual-worksheets': 'skab-flersprogede-arbejdsark',
  'commercial-license-guide': 'kommerciel-licens-guide',
  'printable-business-income': 'printbar-forretning-indkomst',
  'tools-for-printable-business': 'vaerktojer-til-printbar-forretning',
  'marketing-printable-business': 'markedsfoering-printbar-forretning',
  'scaling-printable-business': 'skalering-printbar-forretning',
  'printable-business-legal': 'printbar-forretning-juridisk',
};

const guideSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'saelg-matematik-arbejdsark-etsy',
  'sell-word-search-etsy': 'saelg-ordsoegning-etsy',
  'start-etsy-printable-shop': 'start-etsy-printables-butik',
  'create-etsy-coloring-pages': 'skab-farvelaegningssider-etsy',
  'sell-educational-printables-etsy': 'saelg-paedagogisk-materiale-etsy',
  'price-etsy-printables': 'etsy-printables-prissaetning',
  'etsy-seo-educational-printables': 'seo-etsy-paedagogisk-materiale',
  'create-etsy-worksheet-bundles': 'skab-etsy-arbejdsark-pakker',
  'math-activity-books-kdp': 'matematik-aktivitetsboeger-kdp',
  'publish-puzzle-books-kdp': 'udgiv-puslespilsboeger-kdp',
  'word-search-books-kdp': 'ordsoegningsboeger-kdp',
  'make-money-kdp-activity-books': 'tjen-penge-kdp-aktivitetsboeger',
  'kdp-formatting-worksheets': 'kdp-formatering-arbejdsark',
  'best-kdp-activity-book-niches': 'bedste-kdp-aktivitetsbog-nicher',
  'sudoku-books-kdp': 'sudoku-boeger-kdp',
  'kdp-vs-etsy-printables': 'kdp-eller-etsy-printables',
  'create-sell-tpt-resources': 'skab-saelg-tpt-ressourcer',
  'tpt-store-optimization': 'tpt-butik-optimering',
  'sell-printables-gumroad': 'saelg-printables-gumroad',
  'sell-creative-fabrica': 'saelg-creative-fabrica',
  // Product Creation Guides (25)
  'create-addition-worksheets': 'skab-additions-arbejdsark',
  'create-subtraction-worksheets': 'skab-subtraktions-arbejdsark',
  'create-word-search-puzzles': 'skab-ordsoegning-puslespil',
  'create-crossword-puzzles': 'skab-krydsordspuslespil',
  'create-math-puzzle-worksheets': 'skab-mattepuslespil-arbejdsark',
  'create-handwriting-sheets': 'skab-skriveovelser',
  'create-coloring-pages': 'skab-farvelaegningssider',
  'create-bingo-cards': 'skab-bingokort',
  'create-matching-worksheets': 'skab-matchnings-arbejdsark',
  'create-pattern-worksheets': 'skab-moenster-arbejdsark',
  'create-picture-sudoku': 'skab-billedsudoku',
  'create-maze-worksheets': 'skab-labyrint-arbejdsark',
  'create-hidden-object-worksheets': 'skab-skjulte-genstande-arbejdsark',
  'create-size-comparison-worksheets': 'skab-stoerrelsesammenligning-arbejdsark',
  'create-counting-worksheets': 'skab-taelle-arbejdsark',
  'create-drawing-worksheets': 'skab-tegne-arbejdsark',
  'create-sorting-worksheets': 'skab-sorterings-arbejdsark',
  'create-shadow-matching-worksheets': 'skab-skyggematchnings-arbejdsark',
  'create-odd-one-out-puzzles': 'skab-find-den-forkerte-puslespil',
  'create-missing-pieces-puzzles': 'skab-manglende-brikker-puslespil',
  'create-treasure-hunt-worksheets': 'skab-skattejagt-arbejdsark',
  'create-alphabet-worksheets': 'skab-alfabet-arbejdsark',
  'create-preposition-worksheets': 'skab-praepositioner-arbejdsark',
  'create-cryptogram-puzzles': 'skab-kryptogrammer',
  'create-chart-count-worksheets': 'skab-billeddiagram-arbejdsark',
  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'skab-arbejdsark-pakker',
  'niche-selection-printables': 'nichevalg-printables',
  'create-printable-product-line': 'skab-printbar-produktlinje',
  'pricing-educational-printables': 'prissaetning-paedagogisk-materiale',
  'scale-printable-business-guide': 'guide-skaler-printbar-forretning',
  'passive-income-worksheets': 'passiv-indkomst-arbejdsark',
  'understanding-commercial-licenses': 'forstaa-kommercielle-licenser',
  'research-profitable-niches': 'undersoeg-profitable-nicher',
  'multilingual-printable-business': 'flersproget-printbar-forretning',
  'worksheets-multiple-languages': 'arbejdsark-flere-sprog',
  'copyright-printable-sellers': 'ophavsret-printable-saelgere',
  'customer-support-digital-products': 'kundesupport-digitale-produkter',
  'automate-printable-business': 'automatiser-printbar-forretning',
  'social-media-printable-marketing': 'sociale-medier-printable-markedsfoering',
  'pinterest-marketing-worksheets': 'pinterest-markedsfoering-arbejdsark',
  'email-marketing-printables': 'e-mail-markedsfoering-printables',
  'get-reviews-printable-products': 'faa-anmeldelser-printbare-produkter',
  'seasonal-marketing-printables': 'saeson-markedsfoering-printables',
  'digital-vs-physical-printables': 'digitalt-eller-fysisk-printables',
  'quality-standards-worksheets': 'kvalitetsstandarder-arbejdsark',
};

const ideaSlugs = {
  // Animals & Nature (8)
  'farm-animals-printable-ideas': 'bondegaardsdyr-printbare-ideer',
  'ocean-animals-printable-ideas': 'havdyr-printbare-ideer',
  'safari-animals-printable-ideas': 'safaridyr-printbare-ideer',
  'pets-printable-ideas': 'kaeledyr-printbare-ideer',
  'dinosaur-printable-ideas': 'dinosaur-printbare-ideer',
  'birds-printable-ideas': 'fugle-printbare-ideer',
  'insects-printable-ideas': 'insekter-printbare-ideer',
  'forest-animals-printable-ideas': 'skovdyr-printbare-ideer',
  // Seasons & Holidays (10)
  'christmas-printable-ideas': 'jul-printbare-ideer',
  'halloween-printable-ideas': 'halloween-printbare-ideer',
  'easter-printable-ideas': 'paaske-printbare-ideer',
  'valentines-day-printable-ideas': 'valentinsdag-printbare-ideer',
  'back-to-school-printable-ideas': 'skolestart-printbare-ideer',
  'summer-printable-ideas': 'sommer-printbare-ideer',
  'winter-printable-ideas': 'vinter-printbare-ideer',
  'spring-printable-ideas': 'foraar-printbare-ideer',
  'thanksgiving-printable-ideas': 'taksigelse-printbare-ideer',
  'parents-day-printable-ideas': 'foraeldredag-printbare-ideer',
  // Interests & Activities (10)
  'space-printable-ideas': 'rummet-printbare-ideer',
  'transportation-printable-ideas': 'koeretojer-printbare-ideer',
  'food-cooking-printable-ideas': 'mad-madlavning-printbare-ideer',
  'sports-printable-ideas': 'sport-printbare-ideer',
  'music-printable-ideas': 'musik-printbare-ideer',
  'construction-printable-ideas': 'byggeplads-printbare-ideer',
  'pirates-printable-ideas': 'pirater-printbare-ideer',
  'fairy-tale-printable-ideas': 'eventyr-printbare-ideer',
  'camping-printable-ideas': 'camping-printbare-ideer',
  'underwater-printable-ideas': 'undervandsverden-printbare-ideer',
  // Educational Focus (10)
  'preschool-printable-ideas': 'foerskole-printbare-ideer',
  'kindergarten-printable-ideas': 'boernehaveklasse-printbare-ideer',
  'first-grade-printable-ideas': '1-klasse-printbare-ideer',
  'second-grade-printable-ideas': '2-klasse-printbare-ideer',
  'third-grade-printable-ideas': '3-klasse-printbare-ideer',
  'homeschool-printable-ideas': 'hjemmeundervisning-printbare-ideer',
  'special-education-printable-ideas': 'specialpaedagogik-printbare-ideer',
  'esl-printable-ideas': 'dansk-som-andetsprog-printbare-ideer',
  'summer-learning-printable-ideas': 'sommerlaering-printbare-ideer',
  'math-facts-printable-ideas': 'mattegrundlag-printbare-ideer',
  // Business Models (7)
  'subscription-box-printable-ideas': 'abonnementsboks-printbare-ideer',
  'print-on-demand-printable-ideas': 'print-on-demand-printbare-ideer',
  'digital-download-printable-ideas': 'digital-download-printbare-ideer',
  'physical-printable-product-ideas': 'fysiske-printbare-produkt-ideer',
  'party-supply-printable-ideas': 'festartikler-printbare-ideer',
  'custom-worksheet-service-ideas': 'skraeddersyet-arbejdsark-service-ideer',
  'bulk-licensing-printable-ideas': 'bulklicensering-printbare-ideer',
};

// ============================================================
// INSERTION LOGIC
// ============================================================

function addDaSlugs(filePath, idField, slugMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const [id, daSlug] of Object.entries(slugMap)) {
    // Find the sv: entry for this item and add da: after it
    // Pattern: sv: 'something' (possibly followed by comma, space, or newline)
    // We need to find the right context - the id field helps narrow it down

    // Strategy: find the id in the file, then find the sv: line near it, add da: after
    const idPattern = new RegExp(`${idField}:\\s*'${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`);
    const idMatch = content.match(idPattern);

    if (!idMatch) {
      console.error(`  ERROR: Could not find ${idField}: '${id}'`);
      continue;
    }

    const idPos = content.indexOf(idMatch[0]);

    // Find the sv: entry after this id position
    const afterId = content.substring(idPos);
    const svMatch = afterId.match(/sv:\s*'([^']*)'/);

    if (!svMatch) {
      console.error(`  ERROR: Could not find sv: entry for ${id}`);
      continue;
    }

    // Check if da: already exists
    const nextClosingBrace = afterId.indexOf('}');
    const section = afterId.substring(0, nextClosingBrace);
    if (section.includes("da: '")) {
      console.log(`  SKIP: da: already exists for ${id}`);
      continue;
    }

    // Calculate absolute position of sv match
    const svAbsPos = idPos + afterId.indexOf(svMatch[0]);
    const svEnd = svAbsPos + svMatch[0].length;

    // Insert da: after sv:
    // Check formatting - is sv on its own line or inline?
    const beforeSv = content.substring(Math.max(0, svAbsPos - 80), svAbsPos);

    if (beforeSv.includes('\n')) {
      // sv is on its own line or formatted with newlines - add da on same pattern
      // But in many files sv is the last on a line, so we add with comma
      content = content.substring(0, svEnd) + `,\n      da: '${daSlug}'` + content.substring(svEnd);
    } else {
      // Inline format - add comma and da
      content = content.substring(0, svEnd) + `, da: '${daSlug}'` + content.substring(svEnd);
    }

    count++;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return count;
}

// Process each file
console.log('Adding Danish slugs to slug config files...\n');

const results = [];

// 1. Tool page slugs
const toolFile = path.join(configDir, 'tool-page-slugs.ts');
const toolCount = addDaSlugs(toolFile, 'toolId', toolSlugs);
results.push(`tool-page-slugs.ts: ${toolCount}/${Object.keys(toolSlugs).length} slugs added`);
console.log(results[results.length - 1]);

// 2. Bundle page slugs
const bundleFile = path.join(configDir, 'bundle-page-slugs.ts');
const bundleCount = addDaSlugs(bundleFile, 'bundleId', bundleSlugs);
results.push(`bundle-page-slugs.ts: ${bundleCount}/${Object.keys(bundleSlugs).length} slugs added`);
console.log(results[results.length - 1]);

// 3. Start page slugs
const startFile = path.join(configDir, 'start-page-slugs.ts');
const startCount = addDaSlugs(startFile, 'startId', startSlugs);
results.push(`start-page-slugs.ts: ${startCount}/${Object.keys(startSlugs).length} slugs added`);
console.log(results[results.length - 1]);

// 4. Guide page slugs
const guideFile = path.join(configDir, 'guide-page-slugs.ts');
const guideCount = addDaSlugs(guideFile, 'guideId', guideSlugs);
results.push(`guide-page-slugs.ts: ${guideCount}/${Object.keys(guideSlugs).length} slugs added`);
console.log(results[results.length - 1]);

// 5. Idea page slugs
const ideaFile = path.join(configDir, 'idea-page-slugs.ts');
const ideaCount = addDaSlugs(ideaFile, 'ideaId', ideaSlugs);
results.push(`idea-page-slugs.ts: ${ideaCount}/${Object.keys(ideaSlugs).length} slugs added`);
console.log(results[results.length - 1]);

const total = toolCount + bundleCount + startCount + guideCount + ideaCount;
const expected = Object.keys(toolSlugs).length + Object.keys(bundleSlugs).length +
  Object.keys(startSlugs).length + Object.keys(guideSlugs).length + Object.keys(ideaSlugs).length;

console.log(`\n=== TOTAL: ${total}/${expected} Danish slugs added ===`);

if (total !== expected) {
  console.error('\nWARNING: Not all slugs were added! Check errors above.');
  process.exit(1);
} else {
  console.log('\nAll Danish slugs added successfully!');
}
