/**
 * Script to update content files with language-specific sample paths
 *
 * This script reads each non-English content file, maps it to the corresponding
 * sample folder, and updates the sample paths to use language-specific samples.
 *
 * EXCEPTION: Coloring and Writing pages keep their English samples.
 */

const fs = require('fs');
const path = require('path');

// Locale code to language folder mapping
const localeToLanguage = {
  da: 'danish',
  nl: 'dutch',
  fi: 'finnish',
  fr: 'french',
  de: 'german',
  it: 'italian',
  no: 'norwegian',
  pt: 'portuguese',
  es: 'spanish',
  sv: 'swedish'
};

// Content file pattern to sample folder name mapping
const contentFileToSampleFolder = {
  'addition': 'addition',
  'alphabet-train': 'alphabet train',
  'treno-alfabeto': 'alphabet train',
  'big-small': 'big small',
  'bingo': 'bingo',
  'picture-bingo': 'bingo',
  'chart-count': 'chart count',
  'code-addition': 'code addition',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'find-and-count': 'find and count',
  'trova-e-conta': 'find and count',
  'find-objects': 'find objects',
  'trova-oggetti': 'find objects',
  'grid-match': 'grid match',
  'matching': 'matching',
  'math-puzzle': 'math puzzle',
  'math-worksheet': 'math worksheet',
  'math': 'math worksheet',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'mehr-weniger': 'more less',
  'odd-one-out': 'odd one out',
  'trova-intruso': 'odd one out',
  'was-passt-nicht': 'odd one out',
  'pattern-train': 'pattern train',
  'muster-zug': 'pattern train',
  'treno-sequenze': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'pattern': 'pattern worksheet',
  'muster-arbeitsblatt': 'pattern worksheet',
  'picture-path': 'picture path',
  'bilderpfad': 'picture path',
  'picture-sort': 'picture sort',
  'bilder-sortieren': 'picture sort',
  'prepositions': 'prepositions',
  'praepositionen': 'prepositions',
  'shadow-match': 'shadow match',
  'schattenbilder-zuordnen': 'shadow match',
  'subtraction': 'subtraction',
  'subtraktion': 'subtraction',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure hunt',
  'schatzsuche': 'treasure hunt',
  'word-guess': 'word guess',
  'woerter-raten': 'word guess',
  'word-scramble': 'word scramble',
  'word-search': 'wordsearch',
  'wordsearch': 'wordsearch',
  'schreibuebungen': 'SKIP', // Writing - keep English
  'writing': 'SKIP', // Writing - keep English
  'coloring': 'SKIP', // Coloring - keep English
};

// Apps to skip (keep English samples)
const skipApps = ['coloring', 'writing', 'schreibuebungen'];

const contentDir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');
const samplesDir = path.join(__dirname, '..', 'frontend', 'public', 'samples');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

function extractAppName(fileName) {
  // Remove .ts extension
  const baseName = fileName.replace('.ts', '');

  // Try to match known patterns
  for (const [pattern, sampleFolder] of Object.entries(contentFileToSampleFolder)) {
    if (baseName.includes(pattern)) {
      return sampleFolder;
    }
  }

  // Fallback: extract the app name from common patterns
  // e.g., "addition-worksheets" -> "addition"
  // e.g., "alphabet-train-worksheets" -> "alphabet train"
  const parts = baseName.split('-');

  // Remove common suffixes like "worksheets", "arbeitsblaetter", "schede", etc.
  const suffixes = ['worksheets', 'arbeitsblaetter', 'schede', 'fichas', 'werkbladen', 'arbetsblad', 'opgaver', 'oppgaver', 'tehtavat'];
  const filtered = parts.filter(p => !suffixes.includes(p.toLowerCase()));

  return filtered.join(' ');
}

function getSampleFiles(language, appFolder) {
  const folderPath = path.join(samplesDir, language, appFolder);

  if (!fs.existsSync(folderPath)) {
    return null;
  }

  const files = fs.readdirSync(folderPath);

  // Filter to get unique worksheet base names (not answer keys)
  const worksheets = [];
  const seen = new Set();

  for (const file of files) {
    if (file.endsWith('.jpeg') && !file.includes('answer_key')) {
      const baseName = file.replace('.jpeg', '');
      if (!seen.has(baseName)) {
        seen.add(baseName);
        worksheets.push({
          baseName,
          worksheetJpeg: file,
          answerKeyJpeg: `${baseName} answer_key.jpeg`,
          pdf: `${baseName}.pdf`
        });
      }
    }
  }

  // Sort by number if present
  worksheets.sort((a, b) => {
    const numA = parseInt(a.baseName.match(/(\d+)$/)?.[1] || '0');
    const numB = parseInt(b.baseName.match(/(\d+)$/)?.[1] || '0');
    return numA - numB;
  });

  return worksheets;
}

function updateContentFile(filePath, language, appFolder, worksheets) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Build new sample paths
  const sampleBasePath = `/samples/${language}/${appFolder}`;

  // Update hero.previewImageSrc - use the first worksheet
  const firstWorksheet = worksheets[0];
  const newPreviewSrc = `${sampleBasePath}/${encodeURIComponent(firstWorksheet.worksheetJpeg)}`;

  // Replace previewImageSrc
  content = content.replace(
    /previewImageSrc:\s*['"][^'"]+['"]/g,
    `previewImageSrc: '${newPreviewSrc}'`
  );

  // Build new items array
  const items = worksheets.slice(0, 5).map((ws, index) => {
    return `      {
        id: '${index + 1}',
        worksheetSrc: '${sampleBasePath}/${encodeURIComponent(ws.worksheetJpeg)}',
        answerKeySrc: '${sampleBasePath}/${encodeURIComponent(ws.answerKeyJpeg)}',
        altText: 'Worksheet sample ${index + 1}',
        pdfDownloadUrl: '${sampleBasePath}/${encodeURIComponent(ws.pdf)}',
      }`;
  });

  const newItemsString = `items: [\n${items.join(',\n')},\n    ]`;

  // Replace items array in samples section
  // Match from "items: [" to the closing "]," within the samples object
  const itemsRegex = /items:\s*\[\s*\{[\s\S]*?\}\s*,?\s*\]/;
  content = content.replace(itemsRegex, newItemsString);

  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function processLocale(locale) {
  const language = localeToLanguage[locale];
  if (!language) {
    console.log(`Unknown locale: ${locale}`);
    return;
  }

  const localeDir = path.join(contentDir, locale);
  if (!fs.existsSync(localeDir)) {
    console.log(`Locale directory not found: ${localeDir}`);
    return;
  }

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const appName = extractAppName(file);

    // Check if this app should be skipped
    if (appName === 'SKIP' || skipApps.some(skip => file.toLowerCase().includes(skip))) {
      console.log(`  SKIP: ${file} (coloring/writing - keeping English samples)`);
      skippedCount++;
      continue;
    }

    // Get the corresponding sample folder
    const sampleFolder = appName;
    const worksheets = getSampleFiles(language, sampleFolder);

    if (!worksheets || worksheets.length === 0) {
      console.log(`  NO SAMPLES: ${file} -> ${language}/${sampleFolder}`);
      skippedCount++;
      continue;
    }

    try {
      updateContentFile(filePath, language, sampleFolder, worksheets);
      console.log(`  UPDATED: ${file} -> ${language}/${sampleFolder} (${worksheets.length} samples)`);
      updatedCount++;
    } catch (err) {
      console.error(`  ERROR: ${file} - ${err.message}`);
      errorCount++;
    }
  }
}

console.log('='.repeat(60));
console.log('Updating content files with language-specific sample paths');
console.log('='.repeat(60));
console.log('');

// Process each locale
for (const locale of Object.keys(localeToLanguage)) {
  console.log(`\nProcessing locale: ${locale} -> ${localeToLanguage[locale]}`);
  console.log('-'.repeat(40));
  processLocale(locale);
}

console.log('\n' + '='.repeat(60));
console.log('Summary:');
console.log(`  Updated: ${updatedCount} files`);
console.log(`  Skipped: ${skippedCount} files`);
console.log(`  Errors: ${errorCount} files`);
console.log('='.repeat(60));
