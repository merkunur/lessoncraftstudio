/**
 * Fix broken German sample image paths in content files.
 *
 * Two categories of fixes:
 * 1. Wrong filenames — content files reference files that don't exist on server
 * 2. Server encoding already fixed separately (Latin-1 → UTF-8 copies created)
 */

const fs = require('fs');
const path = require('path');

// Each replacement: [search, replace]
// Order matters: longer/more-specific patterns first to avoid partial matches
const replacements = [
  // Treasure hunt (answer_key MUST come before base to avoid partial match)
  ['/samples/german/treasure hunt/Schatzsuche 1 answer_key.webp', '/samples/german/treasure hunt/answer_key.webp'],
  ['/samples/german/treasure hunt/Schatzsuche Himmelsrichtungen.webp', '/samples/german/treasure hunt/worksheet (1).webp'],
  ['/samples/german/treasure hunt/Schatzsuche 1.webp', '/samples/german/treasure hunt/worksheet.webp'],

  // Missing pieces (answer_key MUST come before base)
  ['/samples/german/missing pieces/Fehlende Puzzleteile 1 answer_key.webp', '/samples/german/missing pieces/Fehlende Teile 1 answer_key.webp'],
  ['/samples/german/missing pieces/Fehlende Puzzleteile 1.webp', '/samples/german/missing pieces/Fehlende Teile 1.webp'],

  // Addition
  ['/samples/german/addition/Addition Fun 1.webp', '/samples/german/addition/Additionsspa 1.webp'],
  ['/samples/german/addition/addition_worksheet portrait.webp', '/samples/german/addition/addition_worksheet.webp'],

  // Subtraction
  ['/samples/german/subtraction/Subtraction Fun 1.webp', '/samples/german/subtraction/worksheet.webp'],
  ['/samples/german/subtraction/cross out.webp', '/samples/german/subtraction/worksheet (1).webp'],

  // Crossword
  ['/samples/german/crossword/crossword_worksheet (1).webp', '/samples/german/crossword/crossword_worksheet.webp'],

  // Find objects
  ['/samples/german/find objects/find objects portrait.webp', '/samples/german/find objects/Finde das Unpassende 1.webp'],

  // More Less
  ['/samples/german/more less/More Less (10).webp', '/samples/german/more less/Mehr Weniger 1.webp'],

  // Picture path
  ['/samples/german/picture path/Bilderpfad.webp', '/samples/german/picture path/Bilderpfad 1.webp'],

  // Sudoku
  ['/samples/german/sudoku/sudoku hard.webp', '/samples/german/sudoku/Bilder-Sudoku 1.webp'],

  // Word guess
  ['/samples/german/word guess/clue-grid_worksheet (4).webp', '/samples/german/word guess/clue-grid_worksheet.webp'],
];

// Directories to scan
const configDir = path.join(__dirname, '..', 'frontend', 'config');
const contentDirs = [
  'app-content',
  'bundle-content',
  'guide-content',
  'idea-content',
  'start-content',
  'tool-content',
];

function getAllTsFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTsFiles(fullPath));
    } else if (entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

let totalFiles = 0;
let totalReplacements = 0;

for (const contentDir of contentDirs) {
  const dirPath = path.join(configDir, contentDir);
  const files = getAllTsFiles(dirPath);

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    let fileReplacements = 0;

    for (const [search, replace] of replacements) {
      const count = content.split(search).length - 1;
      if (count > 0) {
        content = content.split(search).join(replace);
        fileReplacements += count;
      }
    }

    if (fileReplacements > 0) {
      fs.writeFileSync(filePath, content, 'utf-8');
      const relative = path.relative(configDir, filePath);
      console.log(`  Fixed ${fileReplacements} ref(s) in ${relative}`);
      totalFiles++;
      totalReplacements += fileReplacements;
    }
  }
}

console.log(`\nDone: ${totalReplacements} replacements across ${totalFiles} files`);
