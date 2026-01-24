/**
 * Script to update content files with language-specific sample paths
 * VERSION 2 - Comprehensive file name to sample folder mapping
 *
 * All sample folders use English names, but content files use localized names.
 * This script maps each localized content file to the correct English sample folder.
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

// Comprehensive mapping of content file patterns to sample folder names
// Format: partial file name pattern -> sample folder name
const filePatternToSampleFolder = {
  // ===== ADDITION =====
  'addition': 'addition',
  'addisjon': 'addition',
  'addizione': 'addition',
  'adicao': 'addition',
  'optellen': 'addition',
  'yhteenlasku': 'addition',

  // ===== ALPHABET TRAIN =====
  'alphabet-train': 'alphabet train',
  'alfabet-tog': 'alphabet train',
  'aakkosjuna': 'alphabet train',
  'trem-alfabeto': 'alphabet train',
  'treno-alfabeto': 'alphabet train',

  // ===== BIG SMALL =====
  'big-small': 'big small',
  'stor-lille': 'big small',
  'stor-og-liten': 'big small',
  'groot-klein': 'big small',
  'iso-pieni': 'big small',
  'grande-pequeno': 'big small',
  'grande-piccolo': 'big small',

  // ===== BINGO =====
  'bingo': 'bingo',
  'picture-bingo': 'bingo',
  'kuva-bingo': 'bingo',
  'plaatjes-bingo': 'bingo',
  'bingo-immagini': 'bingo',
  'bingo-ilustrado': 'bingo',
  'bildlotto': 'bingo',

  // ===== CHART COUNT =====
  'chart-count': 'chart count',
  'billediagram': 'chart count',
  'bildediagram': 'chart count',
  'telgrafieken': 'chart count',
  'kuvakaavio': 'chart count',
  'grafico-pictorico': 'chart count',
  'grafici-immagini': 'chart count',
  'graficos-conteo': 'chart count',

  // ===== CODE ADDITION =====
  'code-addition': 'code addition',
  'kode-plusstykker': 'code addition',
  'bildeaddisjon': 'code addition',
  'visuele-optelsommen': 'code addition',
  'kuva-yhteenlasku': 'code addition',
  'addizioni-immagini': 'code addition',
  'adicao-codigo': 'code addition',
  'suma-codigo': 'code addition',

  // ===== COLORING (SKIP) =====
  'coloring': 'SKIP',
  'malebog': 'SKIP',
  'fargeleggingsbilder': 'SKIP',
  'kleurplaten': 'SKIP',
  'varityskuvat': 'SKIP',
  'disegni-da-colorare': 'SKIP',
  'desenhos-colorir': 'SKIP',

  // ===== CROSSWORD =====
  'crossword': 'crossword',
  'krydsord': 'crossword',
  'bildekryssord': 'crossword',
  'kruiswoordpuzzel': 'crossword',
  'ristisanatehtavat': 'crossword',
  'cruciverba-immagini': 'crossword',
  'palavras-cruzadas-imagens': 'crossword',
  'crucigramas-imagenes': 'crossword',

  // ===== CRYPTOGRAM =====
  'cryptogram': 'cryptogram',
  'kryptogram': 'cryptogram',
  'kuvakryptogrammi': 'cryptogram',
  'crittogramma': 'cryptogram',
  'criptograma-imagens': 'cryptogram',
  'criptogramas-imagenes': 'cryptogram',

  // ===== DRAW AND COLOR =====
  'draw-and-color': 'draw and color',
  'tegn-og-farvelaeg': 'draw and color',
  'rutenetttegning': 'draw and color',
  'rastertekenen': 'draw and color',
  'ruudukkopiirustus': 'draw and color',
  'disegno-griglia': 'draw and color',
  'desenho-grade': 'draw and color',
  'dibujo-cuadricula': 'draw and color',

  // ===== DRAWING LINES =====
  'drawing-lines': 'drawing lines',
  'linjetraening': 'drawing lines',
  'tegning-av-linjer': 'drawing lines',
  'lijnen-trekken': 'drawing lines',
  'viivojen-piirtaminen': 'drawing lines',
  'pregrafismo': 'drawing lines',
  'tracar-linhas': 'drawing lines',
  'lectoescritura': 'drawing lines',

  // ===== FIND AND COUNT =====
  'find-and-count': 'find and count',
  'trova-e-conta': 'find and count',
  'find-og-tael': 'find and count',
  'finn-og-tell': 'find and count',
  'zoek-en-tel': 'find and count',
  'etsi-ja-laske': 'find and count',
  'encontre-conte': 'find and count',

  // ===== FIND OBJECTS =====
  'find-objects': 'find objects',
  'trova-oggetti': 'find objects',
  'find-objekterne': 'find objects',
  'finn-objektene': 'find objects',
  'zoek-voorwerpen': 'find objects',
  'etsi-esineet': 'find objects',
  'encontrar-objetos': 'find objects',
  'buscar-objetos': 'find objects',

  // ===== GRID MATCH =====
  'grid-match': 'grid match',
  'raster-puslespil': 'grid match',
  'rutenett-tilpasning': 'grid match',
  'raster-puzzel': 'grid match',
  'ruudukko-sovitus': 'grid match',
  'griglia-abbinamento': 'grid match',
  'quebra-cabeca-grade': 'grid match',
  'rompecabezas-cuadricula': 'grid match',

  // ===== MATCHING =====
  'matching': 'matching',
  'matchning': 'matching',
  'kobling': 'matching',
  'verbindings': 'matching',
  'yhdista-parit': 'matching',
  'abbinamenti': 'matching',
  'ligar': 'matching',
  'schaduw-matching': 'matching',
  'skyggematching': 'matching',

  // ===== MATH PUZZLE =====
  'math-puzzle': 'math puzzle',
  'matteleger': 'math puzzle',
  'matematikkgater': 'math puzzle',
  'rekenpuzzels': 'math puzzle',
  'matematiikkapulmat': 'math puzzle',
  'puzzle-matematici': 'math puzzle',
  'quebra-cabeca-matematica': 'math puzzle',
  'rompecabezas-matematicos': 'math puzzle',

  // ===== MATH WORKSHEET =====
  'math-worksheet': 'math worksheet',
  'matematikopgaver': 'math worksheet',
  'matematikk-oppgaver': 'math worksheet',
  'rekenen': 'math worksheet',
  'matematiikka': 'math worksheet',
  'atividades-matematica': 'math worksheet',

  // ===== MISSING PIECES =====
  'missing-pieces': 'missing pieces',
  'manglende-brikker': 'missing pieces',
  'manglende-biter': 'missing pieces',
  'ontbrekende-puzzelstukjes': 'missing pieces',
  'puuttuvat-palat': 'missing pieces',
  'pezzi-mancanti': 'missing pieces',
  'pecas-faltantes': 'missing pieces',
  'piezas-faltantes': 'missing pieces',

  // ===== MORE LESS =====
  'more-less': 'more less',
  'mehr-weniger': 'more less',
  'sammenligningsopgaver': 'more less',
  'sammenligningsoppgaver': 'more less',
  'meer-minder': 'more less',
  'enemman-vahemman': 'more less',
  'confronto-numeri': 'more less',
  'maior-menor': 'more less',
  'mayor-menor': 'more less',

  // ===== ODD ONE OUT =====
  'odd-one-out': 'odd one out',
  'trova-intruso': 'odd one out',
  'was-passt-nicht': 'odd one out',
  'find-den-ulige': 'odd one out',
  'finn-den-ulike': 'odd one out',
  'welke-hoort-niet-bij': 'odd one out',
  'poikkea-joukosta': 'odd one out',
  'encontre-diferente': 'odd one out',
  'encuentra-el-diferente': 'odd one out',

  // ===== PATTERN TRAIN =====
  'pattern-train': 'pattern train',
  'muster-zug': 'pattern train',
  'treno-sequenze': 'pattern train',
  'moenstertog': 'pattern train',
  'monstertog': 'pattern train',
  'patroontrein': 'pattern train',
  'kuviojuna': 'pattern train',
  'trem-padroes': 'pattern train',
  'tren-patrones': 'pattern train',

  // ===== PATTERN WORKSHEET =====
  'pattern-worksheet': 'pattern worksheet',
  'pattern': 'pattern worksheet',
  'muster-arbeitsblatt': 'pattern worksheet',
  'schede-pattern': 'pattern worksheet',
  'moenstre': 'pattern worksheet',
  'monsteroppgaver': 'pattern worksheet',
  'patronen': 'pattern worksheet',
  'kuviotehtava': 'pattern worksheet',
  'fichas-padroes-sequencias': 'pattern worksheet',
  'fichas-patrones': 'pattern worksheet',

  // ===== PICTURE PATH =====
  'picture-path': 'picture path',
  'bilderpfad': 'picture path',
  'billedsti': 'picture path',
  'bildesti': 'picture path',
  'doolhof': 'picture path',
  'kuvapolku': 'picture path',
  'percorso-illustrato': 'picture path',
  'labirinto-caminhos': 'picture path',
  'laberintos-imagenes': 'picture path',

  // ===== PICTURE SORT =====
  'picture-sort': 'picture sort',
  'bilder-sortieren': 'picture sort',
  'billedsortering': 'picture sort',
  'bildesortering': 'picture sort',
  'sorteer': 'picture sort',
  'kuvalajittelu': 'picture sort',
  'classificazione-immagini': 'picture sort',
  'classificacao-imagens': 'picture sort',
  'clasificar-imagenes': 'picture sort',

  // ===== PREPOSITIONS =====
  'prepositions': 'prepositions',
  'praepositionen': 'prepositions',
  'praepositioner': 'prepositions',
  'preposisjoner': 'prepositions',
  'voorzetsels': 'prepositions',
  'prepositio': 'prepositions',
  'preposizioni': 'prepositions',
  'preposicoes': 'prepositions',
  'preposiciones': 'prepositions',

  // ===== SHADOW MATCH =====
  'shadow-match': 'shadow match',
  'schattenbilder-zuordnen': 'shadow match',
  'skygge-match': 'shadow match',
  'varjoyhdistely': 'shadow match',
  'abbinamento-ombre': 'shadow match',
  'combinar-sombras': 'shadow match',
  'asociacion-sombras': 'shadow match',

  // ===== SUBTRACTION =====
  'subtraction': 'subtraction',
  'subtraktion': 'subtraction',
  'subtraksjon': 'subtraction',
  'aftrekken': 'subtraction',
  'vahennyslasku': 'subtraction',
  'sottrazione': 'subtraction',
  'subtracao': 'subtraction',
  'resta': 'subtraction',

  // ===== SUDOKU =====
  'sudoku': 'sudoku',
  'sudoku-bambini': 'sudoku',
  'sudoku-criancas': 'sudoku',
  'sudoku-fichas-ninos': 'sudoku',

  // ===== TREASURE HUNT =====
  'treasure-hunt': 'treasure hunt',
  'schatzsuche': 'treasure hunt',
  'skattejagt': 'treasure hunt',
  'skattejakt': 'treasure hunt',
  'schattenjacht': 'treasure hunt',
  'aarteenetsinta': 'treasure hunt',
  'caccia-tesoro': 'treasure hunt',
  'caca-ao-tesouro': 'treasure hunt',
  'busqueda-tesoro': 'treasure hunt',

  // ===== WORD GUESS =====
  'word-guess': 'word guess',
  'woerter-raten': 'word guess',
  'gaet-ordet': 'word guess',
  'gjetteoppgaver': 'word guess',
  'woordraadsel': 'word guess',
  'kuva-arvaus': 'word guess',
  'indovina-parole': 'word guess',
  'adivinhar-palavras': 'word guess',
  'adivinar-palabras': 'word guess',

  // ===== WORD SCRAMBLE =====
  'word-scramble': 'word scramble',
  'bogstavblanding': 'word scramble',
  'bokstavoppgaver': 'word scramble',
  'woordkruisel': 'word scramble',
  'sanansekoitus': 'word scramble',
  'anagrammi': 'word scramble',
  'palavras-embaralhadas': 'word scramble',

  // ===== WORDSEARCH =====
  'word-search': 'wordsearch',
  'wordsearch': 'wordsearch',
  'ordsoegning': 'wordsearch',
  'ordsoek': 'wordsearch',
  'cerca-parole': 'wordsearch',
  'caca-palavras': 'wordsearch',

  // ===== WRITING (SKIP) =====
  'writing': 'SKIP',
  'schreibuebungen': 'SKIP',
  'skriveopgaver': 'SKIP',
  'skriveark': 'SKIP',
  'schrijfoefeningen': 'SKIP',
  'kasinkirjoitus': 'SKIP',
  'scrittura': 'SKIP',
  'caligrafia': 'SKIP',
};

const contentDir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');
const samplesDir = path.join(__dirname, '..', 'frontend', 'public', 'samples');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;
let noSamplesCount = 0;

function findSampleFolder(fileName) {
  const baseName = fileName.replace('.ts', '').toLowerCase();

  // Try each pattern in order of specificity (longer patterns first)
  const sortedPatterns = Object.keys(filePatternToSampleFolder).sort((a, b) => b.length - a.length);

  for (const pattern of sortedPatterns) {
    if (baseName.includes(pattern.toLowerCase())) {
      return filePatternToSampleFolder[pattern];
    }
  }

  return null;
}

function getSampleFiles(language, appFolder) {
  const folderPath = path.join(samplesDir, language, appFolder);

  if (!fs.existsSync(folderPath)) {
    return null;
  }

  const files = fs.readdirSync(folderPath);
  const isBingo = appFolder === 'bingo';

  // Build a map of worksheets with their answer keys
  const worksheets = [];
  const seen = new Set();

  // First pass: find all worksheet jpeg files (NOT answer keys, NOT callouts)
  const worksheetFiles = files.filter(file => {
    return file.endsWith('.jpeg') &&
           !file.includes('answer_key') &&
           !file.includes('answer-key') &&
           !file.includes('callout');
  });

  for (const file of worksheetFiles) {
    const baseName = file.replace('.jpeg', '');
    if (seen.has(baseName)) continue;
    seen.add(baseName);

    // Find the corresponding answer key by searching through all files
    let answerKeyFile = null;

    if (isBingo) {
      // For bingo, look for callout files as answer keys
      // Pattern: "BaseName N callout.jpeg" or "BaseName N callout (N).jpeg"
      answerKeyFile = findMatchingFile(files, baseName, 'callout');
    } else {
      // For other apps, look for answer_key or answer-key files
      answerKeyFile = findMatchingFile(files, baseName, 'answer_key') ||
                      findMatchingFile(files, baseName, 'answer-key');
    }

    worksheets.push({
      baseName,
      worksheetJpeg: file,
      answerKeyJpeg: answerKeyFile || file, // fallback to worksheet if no answer key
      pdf: `${baseName}.pdf`
    });
  }

  // Sort by number if present (handle numbers at end or before collision suffix)
  worksheets.sort((a, b) => {
    // Extract number from end of baseName, accounting for potential trailing space
    const numA = parseInt(a.baseName.trim().match(/(\d+)\s*$/)?.[1] || '0');
    const numB = parseInt(b.baseName.trim().match(/(\d+)\s*$/)?.[1] || '0');
    return numA - numB;
  });

  return worksheets;
}

// Helper function to find a matching answer key/callout file
function findMatchingFile(files, baseName, suffix) {
  // Try exact match first: "BaseName suffix.jpeg"
  const exactMatch = `${baseName} ${suffix}.jpeg`;
  if (files.includes(exactMatch)) {
    return exactMatch;
  }

  // Try with collision suffixes: "BaseName suffix (1).jpeg", "BaseName suffix (2).jpeg", etc.
  for (let i = 1; i <= 10; i++) {
    const withCollision = `${baseName} ${suffix} (${i}).jpeg`;
    if (files.includes(withCollision)) {
      return withCollision;
    }
  }

  // Try pattern matching for files where baseName might have trailing space or variations
  const baseNameTrimmed = baseName.trim();
  for (const file of files) {
    if (file.endsWith('.jpeg') && file.includes(suffix)) {
      // Check if this file's base matches our worksheet
      const fileWithoutExt = file.replace('.jpeg', '');
      // Remove the suffix part to get the base
      const suffixIndex = fileWithoutExt.indexOf(` ${suffix}`);
      if (suffixIndex > 0) {
        const fileBase = fileWithoutExt.substring(0, suffixIndex).trim();
        if (fileBase === baseNameTrimmed) {
          return file;
        }
      }
    }
  }

  return null;
}

// Helper function to encode file names for URLs, including apostrophes
function encodeFileName(filename) {
  // encodeURIComponent encodes commas as %2C, but nginx doesn't decode them
  // So we decode commas back after encoding
  return encodeURIComponent(filename)
    .replace(/'/g, '%27')    // Encode apostrophes (not done by encodeURIComponent)
    .replace(/%2C/g, ',');   // Decode commas (nginx doesn't handle %2C)
}

function updateContentFile(filePath, language, appFolder, worksheets) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Build new sample paths
  const sampleBasePath = `/samples/${language}/${appFolder}`;

  // Update hero.previewImageSrc - use the first worksheet
  const firstWorksheet = worksheets[0];
  const newPreviewSrc = `${sampleBasePath}/${encodeFileName(firstWorksheet.worksheetJpeg)}`;

  // Replace previewImageSrc (only the first occurrence in hero section)
  content = content.replace(
    /previewImageSrc:\s*['"][^'"]+['"]/,
    `previewImageSrc: '${newPreviewSrc}'`
  );

  // Build new items array - include ALL worksheets from the folder
  const items = worksheets.map((ws, index) => {
    return `      {
        id: '${index + 1}',
        worksheetSrc: '${sampleBasePath}/${encodeFileName(ws.worksheetJpeg)}',
        answerKeySrc: '${sampleBasePath}/${encodeFileName(ws.answerKeyJpeg)}',
        altText: 'Worksheet sample ${index + 1}',
        pdfDownloadUrl: '${sampleBasePath}/${encodeFileName(ws.pdf)}',
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
    const sampleFolder = findSampleFolder(file);

    if (!sampleFolder) {
      console.log(`  NO MAPPING: ${file}`);
      noSamplesCount++;
      continue;
    }

    // Check if this app should be skipped (coloring/writing)
    if (sampleFolder === 'SKIP') {
      console.log(`  SKIP: ${file} (coloring/writing - keeping English samples)`);
      skippedCount++;
      continue;
    }

    // Get the sample files
    const worksheets = getSampleFiles(language, sampleFolder);

    if (!worksheets || worksheets.length === 0) {
      console.log(`  NO SAMPLES: ${file} -> ${language}/${sampleFolder}`);
      noSamplesCount++;
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
console.log('VERSION 2 - Comprehensive file name mapping');
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
console.log(`  Skipped (coloring/writing): ${skippedCount} files`);
console.log(`  No samples available: ${noSamplesCount} files`);
console.log(`  Errors: ${errorCount} files`);
console.log('='.repeat(60));
