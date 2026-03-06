// Fix 41 broken sample image paths in guide and app content files
// These paths reference fabricated filenames that don't exist on the server

const fs = require('fs');
const path = require('path');

const replacements = {
  'addition/addition_animals.webp': 'addition/Addition Fun 1.webp',
  'addition/addition_worksheet.webp': 'addition/addition_worksheet portrait.webp',
  'big small/big_small_circle_big.webp': 'big small/big-small-different images.webp',
  'big small/big_small_worksheet.webp': 'big small/big-small-worksheet_worksheet.webp',
  'chart count/chart_count_animals.webp': 'chart count/Picture Graph 1.webp',
  'chart count/chart_count_answer_key.webp': 'chart count/chart count answer_key.webp',
  'chart count/chart_count_decorated.webp': 'chart count/Picture Graph 5.webp',
  'chart count/chart_count_worksheet.webp': 'chart count/chart count.webp',
  'coloring/coloring_animals.webp': 'coloring/coloring portrait 2.webp',
  'coloring/coloring_holiday.webp': 'coloring/coloring portrait 3.webp',
  'coloring/coloring_nature.webp': 'coloring/coloring portrait 4.webp',
  'coloring/coloring_page.webp': 'coloring/coloring portrait 5.webp',
  'coloring/coloring_worksheet.webp': 'coloring/coloring portrait 1.webp',
  'cryptogram/cryptogram_themed.webp': 'cryptogram/cryptogram_worksheet (5).webp',
  'draw and color/draw_and_color_animal.webp': 'draw and color/grid-drawing_worksheet (1).webp',
  'draw and color/draw_and_color_worksheet.webp': 'draw and color/grid-drawing_worksheet (5).webp',
  'matching/matching_animals.webp': 'matching/matching portrait.webp',
  'matching/matching_worksheet.webp': 'matching/image and word.webp',
  'math puzzle/math_puzzle_grid.webp': 'math puzzle/Math Puzzles (1).webp',
  'math puzzle/math_puzzle_worksheet.webp': 'math puzzle/Math Puzzles (5).webp',
  'math worksheet/math_worksheet.webp': 'math worksheet/Math Worksheet 1.webp',
  'missing pieces/missing_pieces_answer_key.webp': 'missing pieces/Missing Pieces answer_key.webp',
  'missing pieces/missing_pieces_worksheet.webp': 'missing pieces/Missing Pieces (1).webp',
  'odd one out/odd_one_out_answer_key.webp': 'odd one out/Find the Odd One Out answer-key.webp',
  'odd one out/odd_one_out_worksheet.webp': 'odd one out/Find the Odd One Out (1).webp',
  'picture sort/picture_sort_answer_key.webp': 'picture sort/Picture Sort answer_key.webp',
  'picture sort/picture_sort_worksheet.webp': 'picture sort/Picture Sort (1).webp',
  'shadow match/shadow_match_answer_key.webp': 'shadow match/shadow-match-horizontal answer-key.webp',
  'shadow match/shadow_match_worksheet.webp': 'shadow match/shadow-match-worksheet (1).webp',
  'subtraction/subtraction_animals.webp': 'subtraction/Subtraction Fun 1.webp',
  'subtraction/subtraction_worksheet.webp': 'subtraction/cross out.webp',
  'sudoku/sudoku_animals.webp': 'sudoku/sudoku_easy.webp',
  'sudoku/sudoku_puzzle.webp': 'sudoku/sudoku hard.webp',
  'treasure hunt/treasure_hunt_answer_key.webp': 'treasure hunt/Treasure Hunt 1 answer_key.webp',
  'treasure hunt/treasure_hunt_cardinal.webp': 'treasure hunt/north south.webp',
  'treasure hunt/treasure_hunt_puzzle.webp': 'treasure hunt/Treasure Hunt 1.webp',
  'word scramble/word_scramble_worksheet.webp': 'word scramble/Word Scramble 1.webp',
  'wordsearch/wordsearch_animals.webp': 'wordsearch/wordsearch portrait.webp',
  'wordsearch/wordsearch_food.webp': 'wordsearch/custom word list.webp',
  'wordsearch/wordsearch_puzzle.webp': 'wordsearch/wordsearch landscape.webp',
  'wordsearch/wordsearch_worksheet.webp': 'wordsearch/wordsearch portrait.webp',
};

// Directories to scan (include locale subdirs)
const baseDirs = [
  path.join(__dirname, '..', 'frontend', 'config', 'guide-content'),
  path.join(__dirname, '..', 'frontend', 'config', 'app-content'),
];
const dirs = [];
for (const base of baseDirs) {
  if (!fs.existsSync(base)) continue;
  dirs.push(base);
  // Add subdirectories (locale folders like en/, de/, etc.)
  for (const sub of fs.readdirSync(base, { withFileTypes: true })) {
    if (sub.isDirectory()) dirs.push(path.join(base, sub.name));
  }
}

let totalFixes = 0;
let filesFixed = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fixCount = 0;

    for (const [broken, fixed] of Object.entries(replacements)) {
      // Match the path in any context (src strings, etc.)
      const escapedBroken = broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedBroken, 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, fixed);
        fixCount += matches.length;
      }
    }

    if (fixCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed ${fixCount} path(s) in ${file}`);
      totalFixes += fixCount;
      filesFixed++;
    }
  }
}

console.log(`\nDone: ${totalFixes} broken paths fixed across ${filesFixed} files.`);
