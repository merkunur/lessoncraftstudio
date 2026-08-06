/**
 * P11-IT-001: Add Italian slugs to all 5 slug config files
 *
 * This script adds `it:` slugs to tool, bundle, guide, idea, and start page slug configs.
 */

const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '..', 'frontend', 'config');

// === TOOL PAGE SLUGS (33) ===
const toolSlugs = {
  'image-addition': 'generatore-schede-addizione',
  'image-subtraction': 'generatore-schede-sottrazione',
  'code-addition': 'generatore-addizione-codificata',
  'more-less': 'generatore-confronto-quantita',
  'math-puzzle': 'generatore-puzzle-matematici',
  'math-worksheet': 'generatore-esercizi-matematica',
  'alphabet-train': 'generatore-treno-alfabeto',
  'prepositions': 'generatore-schede-preposizioni',
  'word-guess': 'generatore-indovina-parole',
  'word-scramble': 'generatore-parole-mescolate',
  'word-search': 'generatore-cerca-parole',
  'cryptogram': 'generatore-crittogrammi',
  'writing': 'generatore-schede-scrittura',
  'big-small': 'generatore-schede-grande-piccolo',
  'pattern-train': 'generatore-treno-sequenze',
  'pattern-worksheet': 'generatore-schede-sequenze',
  'draw-and-color': 'generatore-disegno-griglia',
  'drawing-lines': 'generatore-schede-pregrafismo',
  'coloring': 'generatore-pagine-colorare',
  'chart-count': 'generatore-grafici-immagini',
  'matching': 'generatore-schede-abbinamento',
  'grid-match': 'generatore-puzzle-griglia',
  'shadow-match': 'generatore-discriminazione-visiva',
  'bingo': 'generatore-cartelle-bingo',
  'picture-sort': 'generatore-classificazione-immagini',
  'missing-pieces': 'generatore-pezzi-mancanti',
  'odd-one-out': 'generatore-schede-intruso',
  'sudoku': 'generatore-sudoku-bambini',
  'picture-path': 'generatore-percorso-immagini',
  'find-and-count': 'generatore-cerca-e-conta',
  'find-objects': 'generatore-cerca-oggetti',
  'crossword': 'generatore-cruciverba-immagini',
  'treasure-hunt': 'generatore-caccia-tesoro',
};

// === BUNDLE PAGE SLUGS (6) ===
const bundleSlugs = {
  'math-bundle': 'pacchetto-padronanza-matematica',
  'literacy-bundle': 'pacchetto-lettura-linguaggio',
  'visual-bundle': 'pacchetto-apprendimento-visivo',
  'matching-bundle': 'pacchetto-abbinamento-classificazione',
  'puzzle-bundle': 'pacchetto-puzzle-logica',
  'search-bundle': 'pacchetto-cerca-trova',
};

// === GUIDE PAGE SLUGS (65) ===
const guideSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'vendere-schede-matematica-etsy',
  'sell-word-search-etsy': 'vendere-cerca-parole-etsy',
  'start-etsy-printable-shop': 'aprire-negozio-etsy-stampabili',
  'create-etsy-coloring-pages': 'creare-pagine-colorare-etsy',
  'sell-educational-printables-etsy': 'vendere-materiale-didattico-etsy',
  'price-etsy-printables': 'prezzi-stampabili-etsy',
  'etsy-seo-educational-printables': 'seo-etsy-materiale-didattico',
  'create-etsy-worksheet-bundles': 'creare-pacchetti-schede-etsy',
  'math-activity-books-kdp': 'libri-attivita-matematica-kdp',
  'publish-puzzle-books-kdp': 'pubblicare-libri-puzzle-kdp',
  'word-search-books-kdp': 'libri-cerca-parole-kdp',
  'make-money-kdp-activity-books': 'guadagnare-kdp-libri-attivita',
  'kdp-formatting-worksheets': 'formattazione-kdp-schede',
  'best-kdp-activity-book-niches': 'migliori-nicchie-kdp-libri-attivita',
  'sudoku-books-kdp': 'libri-sudoku-kdp',
  'kdp-vs-etsy-printables': 'kdp-o-etsy-stampabili',
  'create-sell-tpt-resources': 'creare-vendere-risorse-tpt',
  'tpt-store-optimization': 'ottimizzazione-negozio-tpt',
  'sell-printables-gumroad': 'vendere-stampabili-gumroad',
  'sell-creative-fabrica': 'vendere-creative-fabrica',
  // Product Creation Guides (25)
  'create-addition-worksheets': 'creare-schede-addizione',
  'create-subtraction-worksheets': 'creare-schede-sottrazione',
  'create-word-search-puzzles': 'creare-cerca-parole',
  'create-crossword-puzzles': 'creare-cruciverba',
  'create-math-puzzle-worksheets': 'creare-schede-puzzle-matematici',
  'create-handwriting-sheets': 'creare-schede-scrittura',
  'create-coloring-pages': 'creare-pagine-colorare',
  'create-bingo-cards': 'creare-cartelle-bingo',
  'create-matching-worksheets': 'creare-schede-abbinamento',
  'create-pattern-worksheets': 'creare-schede-sequenze-logiche',
  'create-picture-sudoku': 'creare-sudoku-immagini',
  'create-maze-worksheets': 'creare-schede-labirinti',
  'create-hidden-object-worksheets': 'creare-schede-oggetti-nascosti',
  'create-size-comparison-worksheets': 'creare-schede-confronto-dimensioni',
  'create-counting-worksheets': 'creare-schede-conteggio',
  'create-drawing-worksheets': 'creare-schede-disegno',
  'create-sorting-worksheets': 'creare-schede-classificazione',
  'create-shadow-matching-worksheets': 'creare-schede-discriminazione-visiva',
  'create-odd-one-out-puzzles': 'creare-schede-intruso',
  'create-missing-pieces-puzzles': 'creare-puzzle-pezzi-mancanti',
  'create-treasure-hunt-worksheets': 'creare-schede-caccia-tesoro',
  'create-alphabet-worksheets': 'creare-schede-alfabeto',
  'create-preposition-worksheets': 'creare-schede-preposizioni',
  'create-cryptogram-puzzles': 'creare-crittogrammi',
  'create-chart-count-worksheets': 'creare-schede-grafici-immagini',
  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'creare-pacchetti-schede-esercizi',
  'niche-selection-printables': 'selezione-nicchia-stampabili',
  'create-printable-product-line': 'creare-linea-prodotti-stampabili',
  'pricing-educational-printables': 'prezzi-materiale-didattico',
  'scale-printable-business-guide': 'guida-scalare-attivita-stampabili',
  'passive-income-worksheets': 'reddito-passivo-schede-esercizi',
  'understanding-commercial-licenses': 'comprendere-licenze-commerciali',
  'research-profitable-niches': 'ricercare-nicchie-redditizie',
  'multilingual-printable-business': 'attivita-stampabili-multilingue',
  'worksheets-multiple-languages': 'schede-esercizi-piu-lingue',
  'copyright-printable-sellers': 'diritto-autore-venditori-stampabili',
  'customer-support-digital-products': 'supporto-clienti-prodotti-digitali',
  'automate-printable-business': 'automatizzare-attivita-stampabili',
  'social-media-printable-marketing': 'marketing-social-media-stampabili',
  'pinterest-marketing-worksheets': 'marketing-pinterest-schede',
  'email-marketing-printables': 'email-marketing-stampabili',
  'get-reviews-printable-products': 'ottenere-recensioni-prodotti-stampabili',
  'seasonal-marketing-printables': 'marketing-stagionale-stampabili',
  'digital-vs-physical-printables': 'digitale-o-fisico-stampabili',
  'quality-standards-worksheets': 'standard-qualita-schede-esercizi',
};

// === IDEA PAGE SLUGS (45) ===
const ideaSlugs = {
  // Animals & Nature (8)
  'farm-animals-printable-ideas': 'animali-fattoria-idee-stampabili',
  'ocean-animals-printable-ideas': 'animali-marini-idee-stampabili',
  'safari-animals-printable-ideas': 'animali-safari-idee-stampabili',
  'pets-printable-ideas': 'animali-domestici-idee-stampabili',
  'dinosaur-printable-ideas': 'dinosauri-idee-stampabili',
  'birds-printable-ideas': 'uccelli-idee-stampabili',
  'insects-printable-ideas': 'insetti-idee-stampabili',
  'forest-animals-printable-ideas': 'animali-foresta-idee-stampabili',
  // Seasons & Holidays (10)
  'christmas-printable-ideas': 'natale-idee-stampabili',
  'halloween-printable-ideas': 'halloween-idee-stampabili',
  'easter-printable-ideas': 'pasqua-idee-stampabili',
  'valentines-day-printable-ideas': 'san-valentino-idee-stampabili',
  'back-to-school-printable-ideas': 'ritorno-scuola-idee-stampabili',
  'summer-printable-ideas': 'estate-idee-stampabili',
  'winter-printable-ideas': 'inverno-idee-stampabili',
  'spring-printable-ideas': 'primavera-idee-stampabili',
  'thanksgiving-printable-ideas': 'ringraziamento-idee-stampabili',
  'parents-day-printable-ideas': 'festa-genitori-idee-stampabili',
  // Interests & Activities (10)
  'space-printable-ideas': 'spazio-idee-stampabili',
  'transportation-printable-ideas': 'trasporti-idee-stampabili',
  'food-cooking-printable-ideas': 'cucina-alimentazione-idee-stampabili',
  'sports-printable-ideas': 'sport-idee-stampabili',
  'music-printable-ideas': 'musica-idee-stampabili',
  'construction-printable-ideas': 'cantiere-idee-stampabili',
  'pirates-printable-ideas': 'pirati-idee-stampabili',
  'fairy-tale-printable-ideas': 'fiabe-idee-stampabili',
  'camping-printable-ideas': 'campeggio-idee-stampabili',
  'underwater-printable-ideas': 'sottomarino-idee-stampabili',
  // Educational Focus (10)
  'preschool-printable-ideas': 'prescuola-idee-stampabili',
  'kindergarten-printable-ideas': 'scuola-infanzia-idee-stampabili',
  'first-grade-printable-ideas': 'prima-elementare-idee-stampabili',
  'second-grade-printable-ideas': 'seconda-elementare-idee-stampabili',
  'third-grade-printable-ideas': 'terza-elementare-idee-stampabili',
  'homeschool-printable-ideas': 'istruzione-domiciliare-idee-stampabili',
  'special-education-printable-ideas': 'educazione-speciale-idee-stampabili',
  'esl-printable-ideas': 'italiano-l2-idee-stampabili',
  'summer-learning-printable-ideas': 'apprendimento-estivo-idee-stampabili',
  'math-facts-printable-ideas': 'basi-matematica-idee-stampabili',
  // Business Models (7)
  'subscription-box-printable-ideas': 'abbonamento-box-idee-stampabili',
  'print-on-demand-printable-ideas': 'stampa-su-richiesta-idee-stampabili',
  'digital-download-printable-ideas': 'download-digitale-idee-stampabili',
  'physical-printable-product-ideas': 'prodotti-stampati-fisici-idee',
  'party-supply-printable-ideas': 'articoli-festa-idee-stampabili',
  'custom-worksheet-service-ideas': 'servizio-schede-personalizzate-idee',
  'bulk-licensing-printable-ideas': 'licenze-volume-idee-stampabili',
};

// === START PAGE SLUGS (12) ===
const startSlugs = {
  'complete-guide-printable-business': 'guida-completa-attivita-stampabili',
  'create-worksheets-that-sell': 'creare-schede-che-vendono',
  'printable-business-blueprint': 'piano-attivita-stampabili',
  'etsy-printable-business': 'attivita-stampabili-etsy',
  'amazon-kdp-activity-books': 'libri-attivita-amazon-kdp',
  'create-multilingual-worksheets': 'creare-schede-multilingue',
  'commercial-license-guide': 'guida-licenza-commerciale',
  'printable-business-income': 'reddito-attivita-stampabili',
  'tools-for-printable-business': 'strumenti-attivita-stampabili',
  'marketing-printable-business': 'marketing-attivita-stampabili',
  'scaling-printable-business': 'scalare-attivita-stampabili',
  'printable-business-legal': 'aspetti-legali-attivita-stampabili',
};

// Validate all slugs
function validateSlug(slug, id) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error(`INVALID SLUG: ${id} -> ${slug}`);
    return false;
  }
  if (slug.length > 60) {
    console.error(`TOO LONG (${slug.length}): ${id} -> ${slug}`);
    return false;
  }
  return true;
}

let allValid = true;
const allSlugs = { ...toolSlugs, ...bundleSlugs, ...guideSlugs, ...ideaSlugs, ...startSlugs };
for (const [id, slug] of Object.entries(allSlugs)) {
  if (!validateSlug(slug, id)) allValid = false;
}

if (!allValid) {
  console.error('Validation failed. Aborting.');
  process.exit(1);
}

// Check for duplicates
const slugValues = Object.values(allSlugs);
const dupes = slugValues.filter((s, i) => slugValues.indexOf(s) !== i);
if (dupes.length > 0) {
  console.error('DUPLICATE SLUGS:', [...new Set(dupes)]);
  process.exit(1);
}

console.log(`All ${Object.keys(allSlugs).length} slugs validated successfully.`);

// === Apply to files ===

function addItSlugs(filePath, idField, slugMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const [id, itSlug] of Object.entries(slugMap)) {
    // Match the line with the id and add it: slug after pt: slug
    // Pattern: find the pt: '...' and add it: '...' after it (within the same slugs object)
    const idEscaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Look for the entry by its ID and add it: after pt:
    const regex = new RegExp(
      `(${idField}:\\s*'${idEscaped}'[\\s\\S]*?pt:\\s*'[^']+')`,
      'g'
    );

    const match = content.match(regex);
    if (match) {
      const original = match[0];
      if (original.includes("it: '")) {
        console.log(`  SKIP (already has it:): ${id}`);
        continue;
      }
      content = content.replace(original, `${original}, it: '${itSlug}'`);
      count++;
    } else {
      console.error(`  NOT FOUND: ${id} in ${path.basename(filePath)}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${count}/${Object.keys(slugMap).length} entries in ${path.basename(filePath)}`);
}

console.log('\nApplying Italian slugs...');

console.log('\n1. tool-page-slugs.ts');
addItSlugs(path.join(configDir, 'tool-page-slugs.ts'), 'toolId', toolSlugs);

console.log('\n2. bundle-page-slugs.ts');
addItSlugs(path.join(configDir, 'bundle-page-slugs.ts'), 'bundleId', bundleSlugs);

console.log('\n3. guide-page-slugs.ts');
addItSlugs(path.join(configDir, 'guide-page-slugs.ts'), 'guideId', guideSlugs);

console.log('\n4. idea-page-slugs.ts');
addItSlugs(path.join(configDir, 'idea-page-slugs.ts'), 'ideaId', ideaSlugs);

console.log('\n5. start-page-slugs.ts');
addItSlugs(path.join(configDir, 'start-page-slugs.ts'), 'startId', startSlugs);

console.log('\nDone! Verify with: grep -c "it: \'" frontend/config/*-page-slugs.ts');
