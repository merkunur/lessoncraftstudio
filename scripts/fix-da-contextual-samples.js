/**
 * Fix Danish sample paths to be contextually correct.
 *
 * Problem: The previous fix script used ONE app's samples for ALL gallery entries
 * in bundle/guide/start files. A math bundle page shows Addition samples for
 * subtraction, code-addition, etc. Each gallery entry must show the CORRECT app's sample.
 *
 * This script:
 * 1. For app-content and tool-content: already 1:1 mapped (hero + gallery = same app) — verify only
 * 2. For bundle-content: each sampleGallery entry must map to the app it represents
 * 3. For guide-content: hero + samples should match the guide's primary app
 * 4. For start-content: hero + samples should match the guide's primary app
 */

const fs = require('fs');
const path = require('path');

// Complete Danish sample mapping — verified from server (all .webp, UTF-8 encoding)
const DA_SAMPLES = {
  'addition': { folder: 'addition', files: ['Sjov%20Addition%201.webp', 'Sjov%20Addition%202.webp', 'Sjov%20Addition%203.webp'] },
  'subtraction': { folder: 'subtraction', files: ['Sjov%20Subtraktion%201.webp', 'Sjov%20Subtraktion%202.webp', 'Sjov%20Subtraktion%203.webp'] },
  'code-addition': { folder: 'code%20addition', files: ['Hemmelig%20Kode%20Addition%201.webp', 'Hemmelig%20Kode%20Addition%202.webp', 'Hemmelig%20Kode%20Addition%203.webp'] },
  'more-less': { folder: 'more%20less', files: ['Mere%20Mindre%201.webp', 'Mere%20Mindre%202.webp', 'Mere%20Mindre%203.webp'] },
  'math-puzzle': { folder: 'math%20puzzle', files: ['Mattepuslespil%201.webp', 'Mattepuslespil%202.webp', 'Mattepuslespil%203.webp'] },
  'math-worksheet': { folder: 'math%20worksheet', files: ['Matematikopgave%201.webp', 'Matematikopgave%202.webp', 'Matematikopgave%203.webp'] },
  'alphabet-train': { folder: 'alphabet%20train', files: ['Alfabettog%201.webp', 'Alfabettog%202.webp', 'Alfabettog%203.webp'] },
  'prepositions': { folder: 'prepositions', files: ['Pr%C3%A6positioner%201.webp', 'Pr%C3%A6positioner%202.webp', 'Pr%C3%A6positioner%203.webp'] },
  'word-guess': { folder: 'word%20guess', files: ['G%C3%A6t%20Ordet%201.webp', 'G%C3%A6t%20Ordet%202.webp', 'G%C3%A6t%20Ordet%203.webp'] },
  'word-scramble': { folder: 'word%20scramble', files: ['Bogstavrod%201.webp', 'Bogstavrod%202.webp', 'Bogstavrod%203.webp'] },
  'wordsearch': { folder: 'wordsearch', files: ['Ords%C3%B8gning%201.webp', 'Ords%C3%B8gning%202.webp', 'Ords%C3%B8gning%203.webp'] },
  'cryptogram': { folder: 'cryptogram', files: ['Billed-Kryptogram%201.webp', 'Billed-Kryptogram%202.webp', 'Billed-Kryptogram%203.webp'] },
  'writing': { folder: 'writing', files: ['writing.webp', 'writing%20custom.webp', 'writing%20beginning%20letter.webp'] },
  'big-small': { folder: 'big%20small', files: ['Stort%20eller%20Lille%201.webp', 'Stort%20eller%20Lille%202.webp', 'Stort%20eller%20Lille%203.webp'] },
  'pattern-train': { folder: 'pattern%20train', files: ['M%C3%B8nstertoget%201.webp', 'M%C3%B8nstertoget%202.webp', 'M%C3%B8nstertoget%203.webp'] },
  'pattern-worksheet': { folder: 'pattern%20worksheet', files: ['M%C3%B8nsterg%C3%A5der%201.webp', 'M%C3%B8nsterg%C3%A5der%202.webp', 'M%C3%B8nsterg%C3%A5der%203.webp'] },
  'draw-and-color': { folder: 'draw%20and%20color', files: ['Tegn%20og%20Farvl%C3%A6g%201.webp', 'Tegn%20og%20Farvl%C3%A6g%202.webp', 'Tegn%20og%20Farvl%C3%A6g%203.webp'] },
  'drawing-lines': { folder: 'drawing%20lines', files: ['Linjetegnings%C3%B8velse%201.webp', 'Linjetegnings%C3%B8velse%202.webp', 'Linjetegnings%C3%B8velse%204.webp'] },
  'coloring': { folder: 'coloring', files: ['coloring%20portrait%201.webp', 'coloring%20portrait%202.webp', 'coloring%20landscape%201.webp'] },
  'chart-count': { folder: 'chart%20count', files: ['Billediagram%201.webp', 'Billediagram%202.webp', 'Billediagram%203.webp'] },
  'matching': { folder: 'matching', files: ['Find%20Parrene%201.webp', 'Find%20Parrene%202.webp', 'Find%20Parrene%203.webp'] },
  'grid-match': { folder: 'grid%20match', files: ['Gitterpuslespil%201.webp', 'Gitterpuslespil%202.webp', 'Gitterpuslespil%203.webp'] },
  'shadow-match': { folder: 'shadow%20match', files: ['G%C3%B8r%20Billederne%20Hele%201.webp', 'G%C3%B8r%20Billederne%20Hele%202.webp', 'G%C3%B8r%20Billederne%20Hele%203.webp'] },
  'bingo': { folder: 'bingo', files: ['Billedbingo%201.webp', 'Billedbingo%202.webp', 'Billedbingo%203.webp'] },
  'picture-sort': { folder: 'picture%20sort', files: ['Sorter%20Billeder%201.webp', 'Sorter%20Billeder%202.webp', 'Sorter%20Billeder%203.webp'] },
  'missing-pieces': { folder: 'missing%20pieces', files: ['Manglende%20Dele%201.webp', 'Manglende%20Dele%202.webp', 'Manglende%20Dele%203.webp'] },
  'odd-one-out': { folder: 'odd%20one%20out', files: ['Find%20den%20Ulige%201.webp', 'Find%20den%20Ulige%202.webp', 'Find%20den%20Ulige%203.webp'] },
  'sudoku': { folder: 'sudoku', files: ['Billede-Sudoku%201.webp', 'Billede-Sudoku%202.webp', 'Billede-Sudoku%203.webp'] },
  'picture-path': { folder: 'picture%20path', files: ['Billedsti%201.webp', 'Billedsti%202.webp', 'Billedsti%203.webp'] },
  'find-and-count': { folder: 'find%20and%20count', files: ['Jeg%20ser%2C%20jeg%20ser%201.webp', 'Jeg%20ser%2C%20jeg%20ser%202.webp', 'Jeg%20ser%2C%20jeg%20ser%203.webp'] },
  'find-objects': { folder: 'find%20objects', files: ['Find%20de%20Skjulte%20Objekter%201.webp', 'Find%20de%20Skjulte%20Objekter%202.webp', 'Find%20de%20Skjulte%20Objekter%203.webp'] },
  'crossword': { folder: 'crossword', files: ['Billedkrydsord%201.webp', 'Billedkrydsord%202.webp', 'Billedkrydsord%203.webp'] },
  'treasure-hunt': { folder: 'treasure%20hunt', files: ['Skattejagt%201.webp', 'Skattejagt%202.webp', 'Skattejagt%203.webp'] },
};

function samplePath(appId, idx) {
  const s = DA_SAMPLES[appId];
  if (!s) return null;
  return `/samples/danish/${s.folder}/${s.files[idx % s.files.length]}`;
}

// Danish app names for captions/alt text
const DA_APP_NAMES = {
  'addition': 'Additionsarbejdsark',
  'subtraction': 'Subtraktionsarbejdsark',
  'code-addition': 'Kodeadditionsarbejdsark',
  'more-less': 'Mere eller Mindre Arbejdsark',
  'math-puzzle': 'Matematikpuslespil',
  'math-worksheet': 'Matematikopgave',
  'alphabet-train': 'Alfabettog',
  'prepositions': 'Præpositionsarbejdsark',
  'word-guess': 'Gæt Ordet',
  'word-scramble': 'Bogstavrod',
  'wordsearch': 'Ordsøgning',
  'cryptogram': 'Billed-Kryptogram',
  'writing': 'Skriveøvelse',
  'big-small': 'Stort eller Lille',
  'pattern-train': 'Mønstertoget',
  'pattern-worksheet': 'Mønstergåder',
  'draw-and-color': 'Tegn og Farvlæg',
  'drawing-lines': 'Linjetegningsøvelse',
  'coloring': 'Farvelægningsside',
  'chart-count': 'Billediagram',
  'matching': 'Find Parrene',
  'grid-match': 'Gitterpuslespil',
  'shadow-match': 'Skyggematching',
  'bingo': 'Billedbingo',
  'picture-sort': 'Sorter Billeder',
  'missing-pieces': 'Manglende Dele',
  'odd-one-out': 'Find den Ulige',
  'sudoku': 'Billede-Sudoku',
  'picture-path': 'Billedsti',
  'find-and-count': 'Jeg Ser, Jeg Ser',
  'find-objects': 'Find de Skjulte Objekter',
  'crossword': 'Billedkrydsord',
  'treasure-hunt': 'Skattejagt',
};

// Bundle definitions — which apps are in each bundle
const BUNDLES = {
  'math-bundle': ['addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet'],
  'literacy-bundle': ['alphabet-train', 'prepositions', 'word-guess', 'word-scramble', 'wordsearch', 'cryptogram', 'writing'],
  'visual-bundle': ['big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color', 'drawing-lines', 'coloring', 'chart-count'],
  'matching-bundle': ['matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort'],
  'puzzle-bundle': ['missing-pieces', 'odd-one-out', 'sudoku', 'picture-path'],
  'search-bundle': ['find-and-count', 'find-objects', 'crossword', 'treasure-hunt'],
};

// Guide -> primary app mapping
const GUIDE_APP_MAP = {
  'create-addition-worksheets': 'addition',
  'create-subtraction-worksheets': 'subtraction',
  'create-word-search-puzzles': 'wordsearch',
  'create-crossword-puzzles': 'crossword',
  'create-math-puzzle-worksheets': 'math-puzzle',
  'create-handwriting-sheets': 'writing',
  'create-coloring-pages': 'coloring',
  'create-bingo-cards': 'bingo',
  'create-matching-worksheets': 'matching',
  'create-pattern-worksheets': 'pattern-worksheet',
  'create-picture-sudoku': 'sudoku',
  'create-maze-worksheets': 'picture-path',
  'create-hidden-object-worksheets': 'find-objects',
  'create-size-comparison-worksheets': 'big-small',
  'create-counting-worksheets': 'chart-count',
  'create-drawing-worksheets': 'draw-and-color',
  'create-sorting-worksheets': 'picture-sort',
  'create-shadow-matching-worksheets': 'shadow-match',
  'create-odd-one-out-puzzles': 'odd-one-out',
  'create-missing-pieces-puzzles': 'missing-pieces',
  'create-treasure-hunt-worksheets': 'treasure-hunt',
  'create-alphabet-worksheets': 'alphabet-train',
  'create-preposition-worksheets': 'prepositions',
  'create-cryptogram-puzzles': 'cryptogram',
  'create-chart-count-worksheets': 'chart-count',
  // Platform/business guides — use representative apps
  'sell-math-worksheets-etsy': 'addition',
  'sell-word-search-etsy': 'wordsearch',
  'start-etsy-printable-shop': 'coloring',
  'create-etsy-coloring-pages': 'coloring',
  'sell-educational-printables-etsy': 'matching',
  'price-etsy-printables': 'addition',
  'etsy-seo-educational-printables': 'wordsearch',
  'create-etsy-worksheet-bundles': 'addition',
  'math-activity-books-kdp': 'addition',
  'publish-puzzle-books-kdp': 'crossword',
  'word-search-books-kdp': 'wordsearch',
  'make-money-kdp-activity-books': 'sudoku',
  'kdp-formatting-worksheets': 'math-worksheet',
  'best-kdp-activity-book-niches': 'wordsearch',
  'sudoku-books-kdp': 'sudoku',
  'kdp-vs-etsy-printables': 'coloring',
  'create-sell-tpt-resources': 'matching',
  'tpt-store-optimization': 'wordsearch',
  'sell-printables-gumroad': 'draw-and-color',
  'sell-creative-fabrica': 'coloring',
  // Business strategy guides
  'create-worksheet-bundles': 'addition',
  'niche-selection-printables': 'find-and-count',
  'create-printable-product-line': 'matching',
  'pricing-educational-printables': 'math-worksheet',
  'scale-printable-business-guide': 'draw-and-color',
  'passive-income-worksheets': 'wordsearch',
  'understanding-commercial-licenses': 'wordsearch',
  'research-profitable-niches': 'bingo',
  'multilingual-printable-business': 'alphabet-train',
  'worksheets-multiple-languages': 'word-scramble',
  'copyright-printable-sellers': 'writing',
  'customer-support-digital-products': 'matching',
  'automate-printable-business': 'math-worksheet',
  'social-media-printable-marketing': 'coloring',
  'pinterest-marketing-worksheets': 'coloring',
  'email-marketing-printables': 'wordsearch',
  'get-reviews-printable-products': 'matching',
  'seasonal-marketing-printables': 'bingo',
  'digital-vs-physical-printables': 'addition',
  'quality-standards-worksheets': 'crossword',
};

// Start guide -> primary app
const START_APP_MAP = {
  'complete-guide-printable-business': 'wordsearch',
  'create-worksheets-that-sell': 'addition',
  'printable-business-blueprint': 'math-puzzle',
  'etsy-printable-business': 'coloring',
  'amazon-kdp-activity-books': 'sudoku',
  'create-multilingual-worksheets': 'alphabet-train',
  'commercial-license-guide': 'wordsearch',
  'printable-business-income': 'math-worksheet',
  'tools-for-printable-business': 'matching',
  'marketing-printable-business': 'bingo',
  'scaling-printable-business': 'draw-and-color',
  'printable-business-legal': 'writing',
};

const BASE = path.join(__dirname, '..', 'frontend', 'config');
let fixed = 0;

// === FIX BUNDLE CONTENT ===
// Each bundle's sampleGallery must show one sample from EACH bundled app
const bundleDir = path.join(BASE, 'bundle-content', 'da');
for (const file of fs.readdirSync(bundleDir).filter(f => f.endsWith('.ts'))) {
  const bundleId = file.replace('.ts', '');
  const apps = BUNDLES[bundleId];
  if (!apps) continue;

  const filePath = path.join(bundleDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Build new sampleGallery with one sample per app
  const galleryEntries = apps.map(appId => {
    const s = DA_SAMPLES[appId];
    const name = DA_APP_NAMES[appId];
    return `      { src: '/samples/danish/${s.folder}/${s.files[0]}', alt: '${name} — dansk eksempel', caption: '${name}' }`;
  });

  // Replace sampleGallery
  const galleryRegex = /sampleGallery:\s*\[[\s\S]*?\]/;
  const newGallery = `sampleGallery: [\n${galleryEntries.join(',\n')},\n    ]`;
  content = content.replace(galleryRegex, newGallery);

  // Hero = first app in bundle
  const heroApp = DA_SAMPLES[apps[0]];
  const heroPath = `/samples/danish/${heroApp.folder}/${heroApp.files[0]}`;
  content = content.replace(/(primary:\s*')[^']*(')/g, `$1${heroPath}$2`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`FIXED bundle: ${file} — ${apps.length} apps`);
  fixed++;
}

// === FIX GUIDE CONTENT ===
// Each guide's hero + samples should be from the guide's primary app
const guideDir = path.join(BASE, 'guide-content', 'da');
for (const file of fs.readdirSync(guideDir).filter(f => f.endsWith('.ts'))) {
  const guideId = file.replace('.ts', '');
  const appId = GUIDE_APP_MAP[guideId];
  if (!appId || !DA_SAMPLES[appId]) continue;

  const filePath = path.join(guideDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const s = DA_SAMPLES[appId];
  const name = DA_APP_NAMES[appId];

  // Fix heroImage src
  content = content.replace(/(heroImage:\s*\{\s*src:\s*')[^']*(')/g,
    `$1/samples/danish/${s.folder}/${s.files[0]}$2`);

  // Fix samples array
  const samplesRegex = /samples:\s*\[[\s\S]*?\]/;
  if (samplesRegex.test(content)) {
    const newSamples = `samples: [\n      { src: '/samples/danish/${s.folder}/${s.files[0]}', alt: '${name} — dansk eksempelarbejdsark', caption: '${name} eksempel 1' },\n      { src: '/samples/danish/${s.folder}/${s.files[1]}', alt: '${name} — dansk eksempel 2', caption: '${name} eksempel 2' },\n      { src: '/samples/danish/${s.folder}/${s.files[2]}', alt: '${name} — dansk eksempel 3', caption: '${name} eksempel 3' },\n    ]`;
    content = content.replace(samplesRegex, newSamples);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED guide: ${file} -> ${appId}`);
    fixed++;
  }
}

// === FIX START CONTENT ===
const startDir = path.join(BASE, 'start-content', 'da');
for (const file of fs.readdirSync(startDir).filter(f => f.endsWith('.ts'))) {
  const startId = file.replace('.ts', '');
  const appId = START_APP_MAP[startId];
  if (!appId || !DA_SAMPLES[appId]) continue;

  const filePath = path.join(startDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const s = DA_SAMPLES[appId];
  const name = DA_APP_NAMES[appId];

  // Fix heroImage src
  content = content.replace(/(heroImage:\s*\{\s*src:\s*')[^']*(')/g,
    `$1/samples/danish/${s.folder}/${s.files[0]}$2`);

  // Fix samples array
  const samplesRegex = /samples:\s*\[[\s\S]*?\]/;
  if (samplesRegex.test(content)) {
    const newSamples = `samples: [\n      { src: '/samples/danish/${s.folder}/${s.files[0]}', alt: '${name} — dansk eksempelarbejdsark', caption: '${name} eksempel 1' },\n      { src: '/samples/danish/${s.folder}/${s.files[1]}', alt: '${name} — dansk eksempel 2', caption: '${name} eksempel 2' },\n      { src: '/samples/danish/${s.folder}/${s.files[2]}', alt: '${name} — dansk eksempel 3', caption: '${name} eksempel 3' },\n    ]`;
    content = content.replace(samplesRegex, newSamples);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED start: ${file} -> ${appId}`);
    fixed++;
  }
}

// === VERIFY APP CONTENT & TOOL CONTENT ===
// These should already be correct (1:1 mapping) but let's verify
const appToolMap = {
  'image-addition': 'addition',
  'image-subtraction': 'subtraction',
  'word-search': 'wordsearch',
};

for (const dir of ['app-content/da', 'tool-content/da']) {
  const fullDir = path.join(BASE, dir);
  for (const file of fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'))) {
    const baseId = file.replace('.ts', '');
    const appId = appToolMap[baseId] || baseId;
    if (!DA_SAMPLES[appId]) continue;

    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const s = DA_SAMPLES[appId];
    const expectedPath = `/samples/danish/${s.folder}/`;

    // Check if hero references the correct app
    const heroMatch = content.match(/primary:\s*'([^']+)'/);
    if (heroMatch && !heroMatch[1].includes(expectedPath.replace(/%20/g, '%20'))) {
      // Check with decoded form too
      const decoded = decodeURIComponent(expectedPath);
      const heroDecoded = decodeURIComponent(heroMatch[1]);
      if (!heroDecoded.includes(decoded.replace('/samples/danish/', ''))) {
        console.log(`WARN ${dir}/${file}: hero references ${heroMatch[1]} but expected ${expectedPath}`);
      }
    }
  }
}

console.log(`\nTotal fixed: ${fixed} files`);
