/**
 * Fix broken image paths in guide-content, bundle-content, and start-content files.
 * Maps sample-N.webp placeholders to actual filenames on disk.
 * Also fixes directory name mismatches (hyphens → spaces).
 */
const fs = require('fs');
const path = require('path');

// Map of directory slug (as used in content files) → correct directory name + hero filename
// Based on actual files on disk at /var/www/lcs-media/samples/english/
const dirMappings = {
  // Apps with hyphens that should be spaces
  'alphabet-train': { dir: 'alphabet train', hero: 'Alphabet Train 1.webp' },
  'big-small': { dir: 'big small', hero: 'big-small-worksheet_worksheet.webp' },
  'chart-count': { dir: 'chart count', hero: 'chart count.webp' },
  'code-addition': { dir: 'code addition', hero: 'Code Breaker Addition 1.webp' },
  'draw-and-color': { dir: 'draw and color', hero: 'grid-drawing_worksheet.webp' },
  'drawing-lines': { dir: 'drawing lines', hero: 'drawing_lines_horizontal.webp' },
  'find-and-count': { dir: 'find and count', hero: 'find and count portrait.webp' },
  'find-objects': { dir: 'find objects', hero: 'spotworks_worksheet.webp' },
  'grid-match': { dir: 'grid match', hero: 'Grid Match.webp' },
  'math-puzzle': { dir: 'math puzzle', hero: 'Math Puzzles.webp' },
  'math-worksheet': { dir: 'math worksheet', hero: 'Math Worksheet 10.webp' },
  'missing-pieces': { dir: 'missing pieces', hero: 'Missing Pieces.webp' },
  'more-less': { dir: 'more less', hero: 'More Less (10).webp' },
  'odd-one-out': { dir: 'odd one out', hero: 'Find the Odd One Out.webp' },
  'pattern-train': { dir: 'pattern train', hero: 'pattern_train_worksheet.webp' },
  'pattern-worksheet': { dir: 'pattern worksheet', hero: 'pattern_worksheet.webp' },
  'picture-path': { dir: 'picture path', hero: 'Picture Pathway.webp' },
  'picture-sort': { dir: 'picture sort', hero: 'Picture Sort.webp' },
  'shadow-match': { dir: 'shadow match', hero: 'shadow-match-worksheet.webp' },
  'treasure-hunt': { dir: 'treasure hunt', hero: 'Treasure Hunt 1.webp' },
  'word-guess': { dir: 'word guess', hero: 'clue-grid_worksheet.webp' },
  'word-scramble': { dir: 'word scramble', hero: 'word scramble portrait.webp' },
  'word-search': { dir: 'wordsearch', hero: 'wordsearch portrait.webp' },

  // Apps already with spaces (still need filename fix)
  'alphabet train': { dir: 'alphabet train', hero: 'Alphabet Train 1.webp' },
  'big small': { dir: 'big small', hero: 'big-small-worksheet_worksheet.webp' },
  'chart count': { dir: 'chart count', hero: 'chart count.webp' },
  'code addition': { dir: 'code addition', hero: 'Code Breaker Addition 1.webp' },
  'draw and color': { dir: 'draw and color', hero: 'grid-drawing_worksheet.webp' },
  'drawing lines': { dir: 'drawing lines', hero: 'drawing_lines_horizontal.webp' },
  'find and count': { dir: 'find and count', hero: 'find and count portrait.webp' },
  'find objects': { dir: 'find objects', hero: 'spotworks_worksheet.webp' },
  'grid match': { dir: 'grid match', hero: 'Grid Match.webp' },
  'math puzzle': { dir: 'math puzzle', hero: 'Math Puzzles.webp' },
  'math worksheet': { dir: 'math worksheet', hero: 'Math Worksheet 10.webp' },
  'missing pieces': { dir: 'missing pieces', hero: 'Missing Pieces.webp' },
  'more less': { dir: 'more less', hero: 'More Less (10).webp' },
  'odd one out': { dir: 'odd one out', hero: 'Find the Odd One Out.webp' },
  'pattern train': { dir: 'pattern train', hero: 'pattern_train_worksheet.webp' },
  'pattern worksheet': { dir: 'pattern worksheet', hero: 'pattern_worksheet.webp' },
  'picture path': { dir: 'picture path', hero: 'Picture Pathway.webp' },
  'picture sort': { dir: 'picture sort', hero: 'Picture Sort.webp' },
  'shadow match': { dir: 'shadow match', hero: 'shadow-match-worksheet.webp' },
  'treasure hunt': { dir: 'treasure hunt', hero: 'Treasure Hunt 1.webp' },
  'word guess': { dir: 'word guess', hero: 'clue-grid_worksheet.webp' },
  'word scramble': { dir: 'word scramble', hero: 'word scramble portrait.webp' },
  'word search': { dir: 'wordsearch', hero: 'wordsearch portrait.webp' },

  // Apps without hyphens (just need filename fix)
  'addition': { dir: 'addition', hero: 'Addition Fun 1.webp' },
  'bingo': { dir: 'bingo', hero: 'bingo_card.webp' },
  'coloring': { dir: 'coloring', hero: 'coloring portrait 1.webp' },
  'crossword': { dir: 'crossword', hero: 'crossword_worksheet.webp' },
  'cryptogram': { dir: 'cryptogram', hero: 'cryptogram_worksheet.webp' },
  'matching': { dir: 'matching', hero: 'matching portrait.webp' },
  'prepositions': { dir: 'prepositions', hero: 'prepositions_worksheet (1).webp' },
  'subtraction': { dir: 'subtraction', hero: 'Subtraction Fun 1.webp' },
  'sudoku': { dir: 'sudoku', hero: 'sudoku_worksheet.webp' },
  'wordsearch': { dir: 'wordsearch', hero: 'wordsearch portrait.webp' },
  'writing': { dir: 'writing', hero: 'writing.webp' },

  // Edge case: bare "math" reference (in printable-business-legal.ts)
  'math': { dir: 'math puzzle', hero: 'Math Puzzles.webp' },
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Match pattern: /samples/english/{dir}/{filename}.webp
  // Replace sample-N.webp with actual hero filename, and fix dir names
  content = content.replace(
    /\/samples\/english\/([^/']+)\/sample-\d+\.webp/g,
    (match, dirName) => {
      const mapping = dirMappings[dirName];
      if (mapping) {
        return `/samples/english/${mapping.dir}/${mapping.hero}`;
      }
      console.log(`  WARNING: No mapping for directory "${dirName}" in ${path.basename(filePath)}`);
      return match;
    }
  );

  // Also fix fabricated filenames like sudoku_worksheet.webp that are already correct
  // but might be in wrong directories. And fix directory hyphens even for non-sample filenames.
  content = content.replace(
    /\/samples\/english\/([a-z]+-[a-z]+(?:-[a-z]+)*)\/([^'"\s]+\.webp)/g,
    (match, dirName, fileName) => {
      const mapping = dirMappings[dirName];
      if (mapping && mapping.dir !== dirName) {
        return `/samples/english/${mapping.dir}/${fileName}`;
      }
      return match;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Process all three content directories
const dirs = [
  { name: 'guide-content', path: path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'en') },
  { name: 'bundle-content', path: path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'en') },
  { name: 'start-content', path: path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'en') },
];

let totalFixed = 0;
let totalFiles = 0;

for (const dir of dirs) {
  console.log(`\n=== ${dir.name} ===`);
  const files = fs.readdirSync(dir.path).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    totalFiles++;
    const filePath = path.join(dir.path, file);
    const fixed = fixFile(filePath);
    if (fixed) {
      console.log(`FIXED: ${file}`);
      totalFixed++;
    }
  }
}

console.log(`\nDone: ${totalFixed}/${totalFiles} files fixed`);
