/**
 * Fix broken image paths in tool-content/en/*.ts files
 * Maps fabricated filenames to actual files on disk at /var/www/lcs-media/samples/english/
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'en');

// Map: filename.ts -> { dirPath (on server), heroImage, gallery: [{src, alt, caption}] }
// Only files that need fixes are listed. Files not listed are already correct.
const fixes = {
  'big-small.ts': {
    dir: 'big small',
    hero: 'big-small-worksheet_worksheet.webp',
    gallery: [
      'big-small-different images.webp',
      'big-small number 1-2-3.webp',
      'big-small identical images.webp',
    ],
  },
  'bingo.ts': {
    dir: 'bingo',
    hero: 'bingo_card.webp',
    gallery: [
      'bingo_card_1.webp',
      'bingo_card_1 word.webp',
      'callout.webp',
    ],
  },
  'chart-count.ts': {
    dir: 'chart count',
    hero: 'chart count.webp',
    gallery: [
      'Picture Graph 1.webp',
      'Picture Graph 5.webp',
      'chart count answer_key.webp',
    ],
  },
  'code-addition.ts': {
    dir: 'code addition',
    hero: 'Code Breaker Addition 1.webp',
    gallery: [
      'Code Breaker Addition 1.webp',
      'Code Breaker Addition 2.webp',
      'Code Breaker Addition 3.webp',
    ],
  },
  'coloring.ts': {
    dir: 'coloring',
    hero: 'coloring portrait 1.webp',
    gallery: [
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring landscape 1.webp',
    ],
  },
  'crossword.ts': {
    dir: 'crossword',
    hero: 'crossword_worksheet.webp',
    gallery: [
      'crossword_worksheet (1).webp',
      'crossword_worksheet (5).webp',
      'crossword_answer_key.webp',
    ],
  },
  'cryptogram.ts': {
    dir: 'cryptogram',
    hero: 'cryptogram_worksheet.webp',
    gallery: [
      'cryptogram_worksheet.webp',
      'cryptogram_worksheet (5).webp',
      'cryptogram_answer_key.webp',
    ],
  },
  'draw-and-color.ts': {
    dir: 'draw and color',
    hero: 'grid-drawing_worksheet.webp',
    gallery: [
      'grid-drawing_worksheet (1).webp',
      'grid-drawing_worksheet (5).webp',
      'grid-drawing_worksheet (10).webp',
    ],
  },
  'drawing-lines.ts': {
    dir: 'drawing lines',
    hero: 'drawing_lines_horizontal.webp',
    gallery: [
      'drawing_lines_curve 1.webp',
      'drawing_lines_diagonal 1.webp',
      'drawing_lines_vertical.webp',
    ],
  },
  'find-and-count.ts': {
    dir: 'find and count',
    hero: 'find and count portrait.webp',
    gallery: [
      'find and count portrait.webp',
      'find and count landscape.webp',
      'find and count portrait answer_key.webp',
    ],
  },
  'find-objects.ts': {
    dir: 'find objects',
    hero: 'spotworks_worksheet.webp',
    gallery: [
      'spotworks_worksheet (1).webp',
      'spotworks_worksheet (5).webp',
      'spotworks_answer_key.webp',
    ],
  },
  'grid-match.ts': {
    dir: 'grid match',
    hero: 'Grid Match.webp',
    gallery: [
      'Grid Match (1).webp',
      'Grid Match (5).webp',
      'Grid Match answer_key.webp',
    ],
  },
  'image-addition.ts': {
    dir: 'addition',
    hero: 'Addition Fun 1.webp',
    gallery: [
      'Addition Fun 1.webp',
      'addition_worksheet portrait.webp',
      'image and number.webp',
    ],
  },
  'image-subtraction.ts': {
    dir: 'subtraction',
    hero: 'Subtraction Fun 1.webp',
    gallery: [
      'Subtraction Fun 1.webp',
      'cross out.webp',
      'image number.webp',
    ],
  },
  'matching.ts': {
    dir: 'matching',
    hero: 'matching portrait.webp',
    gallery: [
      'matching portrait.webp',
      'image and word.webp',
      'matching portrait answer_key.webp',
    ],
  },
  'math-puzzle.ts': {
    dir: 'math puzzle',
    hero: 'Math Puzzles.webp',
    gallery: [
      'Math Puzzles (1).webp',
      'Math Puzzles (5).webp',
      'Math Puzzles (10).webp',
    ],
  },
  'missing-pieces.ts': {
    dir: 'missing pieces',
    hero: 'Missing Pieces.webp',
    gallery: [
      'Missing Pieces (1).webp',
      'Missing Pieces (5).webp',
      'Missing Pieces answer_key.webp',
    ],
  },
  'odd-one-out.ts': {
    dir: 'odd one out',
    hero: 'Find the Odd One Out.webp',
    gallery: [
      'Find the Odd One Out (1).webp',
      'Find the Odd One Out (5).webp',
      'Find the Odd One Out answer-key.webp',
    ],
  },
  'pattern-train.ts': {
    dir: 'pattern train',
    hero: 'pattern_train_worksheet.webp',
    gallery: [
      'pattern_train_worksheet (1).webp',
      'pattern_train_worksheet (5).webp',
      'pattern_train_answer_key.webp',
    ],
  },
  'pattern-worksheet.ts': {
    dir: 'pattern worksheet',
    hero: 'pattern_worksheet.webp',
    gallery: [
      'pattern_worksheet (1).webp',
      'pattern_worksheet (5).webp',
      'pattern_answer_key.webp',
    ],
  },
  'picture-path.ts': {
    dir: 'picture path',
    hero: 'Picture Pathway.webp',
    gallery: [
      'Picture Pathway (1).webp',
      'Picture Pathway (5).webp',
      'Picture Pathway answer_key.webp',
    ],
  },
  'picture-sort.ts': {
    dir: 'picture sort',
    hero: 'Picture Sort.webp',
    gallery: [
      'Picture Sort (1).webp',
      'Picture Sort (5).webp',
      'Picture Sort answer_key.webp',
    ],
  },
  'shadow-match.ts': {
    dir: 'shadow match',
    hero: 'shadow-match-worksheet.webp',
    gallery: [
      'shadow-match-horizontal.webp',
      'shadow-match-vertical.webp',
      'shadow-match-horizontal answer-key.webp',
    ],
  },
  'sudoku.ts': {
    dir: 'sudoku',
    hero: 'sudoku_worksheet.webp',
    gallery: [
      'sudoku_easy.webp',
      'sudoku hard.webp',
      'sudoku_answer_key.webp',
    ],
  },
  'treasure-hunt.ts': {
    dir: 'treasure hunt',
    hero: 'Treasure Hunt 1.webp',
    gallery: [
      'Treasure Hunt 1.webp',
      'north south.webp',
      'Treasure Hunt 1 answer_key.webp',
    ],
  },
  'word-scramble.ts': {
    dir: 'word scramble',
    hero: 'word scramble portrait.webp',
    gallery: [
      'word scramble portrait.webp',
      'Word Scramble 1.webp',
      'word scramble portrait answer-key.webp',
    ],
  },
  'word-search.ts': {
    dir: 'wordsearch',
    hero: 'wordsearch portrait.webp',
    gallery: [
      'wordsearch portrait.webp',
      'wordsearch landscape.webp',
      'custom word list.webp',
    ],
  },
  'writing.ts': {
    dir: 'writing',
    hero: 'writing.webp',
    gallery: [
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
    ],
  },
};

let totalFixed = 0;
let totalSkipped = 0;

for (const [filename, fix] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filename} not found`);
    totalSkipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Build the new image paths
  const base = `/samples/english/${fix.dir}`;
  const heroPath = `${base}/${fix.hero}`;
  const galleryPaths = fix.gallery.map(f => `${base}/${f}`);

  // Replace heroImages.primary path
  content = content.replace(
    /(heroImages:\s*\{\s*primary:\s*')[^']*(')/,
    `$1${heroPath}$2`
  );

  // Replace gallery src paths (by index)
  let galleryIdx = 0;
  content = content.replace(
    /(sampleGallery[\s\S]*?)(?:src:\s*')[^']*(')/g,
    (match, before, quote) => {
      if (galleryIdx < galleryPaths.length) {
        const result = `${before}src: '${galleryPaths[galleryIdx]}${quote}`;
        galleryIdx++;
        return result;
      }
      return match;
    }
  );

  // The regex above is greedy with the [\s\S]* - let me use a simpler approach
  // Reset and do it differently
  content = fs.readFileSync(filePath, 'utf8');

  // Replace hero primary
  content = content.replace(
    /(primary:\s*')([^']*)(')/,
    `$1${heroPath}$3`
  );

  // Replace gallery src values one at a time
  let srcIdx = 0;
  content = content.replace(
    /(\bsrc:\s*')([^']*)(')/g,
    (match, p1, oldSrc, p3) => {
      if (srcIdx < galleryPaths.length) {
        const result = `${p1}${galleryPaths[srcIdx]}${p3}`;
        srcIdx++;
        return result;
      }
      return match;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED: ${filename} (${srcIdx} gallery + 1 hero)`);
    totalFixed++;
  } else {
    console.log(`UNCHANGED: ${filename}`);
  }
}

console.log(`\nDone: ${totalFixed} fixed, ${totalSkipped} skipped`);
