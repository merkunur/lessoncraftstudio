/**
 * Fix primaryKeyword to be a substring of titleTag for all app-content/en/ files.
 * Moves old long keyword to secondaryKeywords if not already present.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');

// Mapping: filename -> new shorter primaryKeyword (must be substring of titleTag, case-insensitive)
const fixes = {
  // Already OK: addition.ts (keyword is in title)
  // Already OK: sudoku.ts (keyword is in title)
  'alphabet-train.ts': 'alphabet worksheet generator for Etsy',
  'big-small.ts': 'size comparison worksheet maker for Etsy',
  'bingo.ts': 'bingo card maker',
  'chart-count.ts': 'counting chart worksheets',
  'code-addition.ts': 'secret code math puzzles',
  'coloring.ts': 'coloring page generator',
  'crossword.ts': 'crossword puzzle maker',
  'cryptogram.ts': 'cryptogram puzzle generator',
  'draw-and-color.ts': 'draw and color activity maker for Etsy',
  'drawing-lines.ts': 'tracing line worksheet generator for Etsy',
  'find-and-count.ts': 'find and count worksheet creator for Etsy',
  'find-objects.ts': 'I Spy printable maker',
  'grid-match.ts': 'grid matching puzzle generator for sellers',
  'matching.ts': 'matching worksheet maker for Etsy sellers',
  'math-puzzle.ts': 'math puzzle generator',
  'math-worksheet.ts': 'math worksheet maker',
  'missing-pieces.ts': 'missing piece puzzle generator for KDP books',
  'more-less.ts': 'greater than less than worksheet creator',
  'odd-one-out.ts': 'odd one out puzzle maker',
  'pattern-train.ts': 'pattern activity generator for sellers',
  'pattern-worksheet.ts': 'pattern recognition worksheet maker for Etsy',
  'picture-path.ts': 'picture path maze generator',
  'picture-sort.ts': 'sorting worksheet maker for Etsy sellers',
  'prepositions.ts': 'preposition worksheet generator for ESL sellers',
  'shadow-match.ts': 'shadow matching worksheet maker for Etsy',
  'subtraction.ts': 'subtraction worksheet generator',
  'treasure-hunt.ts': 'treasure hunt generator',
  'word-guess.ts': 'word guess puzzle creator for Etsy sellers',
  'word-scramble.ts': 'word scramble maker for Etsy sellers',
  'wordsearch.ts': 'word search generator',
  'writing.ts': 'handwriting worksheet generator for Etsy',
};

let changed = 0;
let errors = 0;

for (const [filename, newPK] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filename}`);
    errors++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Extract current primaryKeyword
  const pkMatch = content.match(/primaryKeyword:\s*'([^']+)'/);
  if (!pkMatch) {
    console.error(`NO PK FOUND: ${filename}`);
    errors++;
    continue;
  }
  const oldPK = pkMatch[1];

  if (oldPK === newPK) {
    console.log(`SKIP (same): ${filename}`);
    continue;
  }

  // Extract titleTag to verify new PK is a substring
  const ttMatch = content.match(/titleTag:\s*'([^']+)'/);
  if (ttMatch) {
    const titleTag = ttMatch[1].toLowerCase();
    if (!titleTag.includes(newPK.toLowerCase())) {
      console.error(`PK NOT IN TITLE: ${filename} - "${newPK}" not in "${ttMatch[1]}"`);
      errors++;
      continue;
    }
  }

  // Replace primaryKeyword
  content = content.replace(
    `primaryKeyword: '${oldPK}'`,
    `primaryKeyword: '${newPK}'`
  );

  // Check if old keyword is already in secondaryKeywords
  if (!content.includes(`'${oldPK}'`)) {
    // Add old keyword as first secondary keyword
    content = content.replace(
      /secondaryKeywords:\s*\[\s*\n\s*'/,
      `secondaryKeywords: [\n      '${oldPK}',\n      '`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`FIXED: ${filename} - "${oldPK}" -> "${newPK}"`);
  changed++;
}

console.log(`\nDone: ${changed} files fixed, ${errors} errors`);
