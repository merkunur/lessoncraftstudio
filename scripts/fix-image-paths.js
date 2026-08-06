/**
 * Fix broken image paths in new SEO content files.
 * Replaces guessed filenames/folders with verified server paths.
 */
const fs = require('fs');

// === VERIFIED SAMPLE PATHS (server folder name -> [file1, file2]) ===
const sampleMap = {
  'addition': ['Addition Fun 10.webp', 'Addition Fun 11.webp'],
  'alphabet train': ['Alphabet Train 10.webp', 'Alphabet Train 11.webp'],
  'big small': ['big-small-different images.webp', 'big-small identical images.webp'],
  'bingo': ['bingo_card_1.webp', 'bingo_card_1 word.webp'],
  'chart count': ['chart count.webp', 'Picture Graph 10.webp'],
  'code addition': ['Code Breaker Addition 1.webp', 'Code Breaker Addition 2.webp'],
  'coloring': ['coloring portrait 1.webp', 'coloring portrait 2.webp'],
  'crossword': ['crossword_worksheet (10).webp', 'crossword_worksheet (11).webp'],
  'cryptogram': ['cryptogram_worksheet (10).webp', 'cryptogram_worksheet (11).webp'],
  'draw and color': ['grid-drawing_worksheet (10).webp', 'grid-drawing_worksheet (11).webp'],
  'drawing lines': ['drawing_lines_curve 1.webp', 'drawing_lines_curve 2.webp'],
  'find and count': ['I Spy 10.webp', 'I Spy 11.webp'],
  'find objects': ['spotworks_worksheet (10).webp', 'spotworks_worksheet (11).webp'],
  'grid match': ['Grid Match (10).webp', 'Grid Match (11).webp'],
  'matching': ['image and custom word.webp', 'image and word.webp'],
  'math puzzle': ['Math Puzzles (10).webp', 'Math Puzzles (11).webp'],
  'math worksheet': ['Math Worksheet 10.webp', 'Math Worksheet 11.webp'],
  'missing pieces': ['Missing Pieces (10).webp', 'Missing Pieces (11).webp'],
  'more less': ['More Less (10).webp', 'More Less (11).webp'],
  'odd one out': ['Find the Odd One Out (10).webp', 'Find the Odd One Out (11).webp'],
  'pattern train': ['pattern_train_worksheet (10).webp', 'pattern_train_worksheet (11).webp'],
  'pattern worksheet': ['pattern_worksheet (10).webp', 'pattern_worksheet (11).webp'],
  'picture path': ['Picture Pathway (10).webp', 'Picture Pathway (11).webp'],
  'picture sort': ['Picture Sort (10).webp', 'Picture Sort (11).webp'],
  'prepositions': ['prepositions_worksheet (10).webp', 'prepositions_worksheet (11).webp'],
  'shadow match': ['shadow-match-worksheet (1).webp', 'shadow-match-horizontal.webp'],
  'subtraction': ['cross out.webp', 'find subtrahend.webp'],
  'sudoku': ['sudoku_easy.webp', 'sudoku hard.webp'],
  'treasure hunt': ['Treasure Hunt 1.webp', 'north south.webp'],
  'word guess': ['clue-grid_worksheet (1).webp', 'clue-grid_worksheet (2).webp'],
  'word scramble': ['Word Scramble 10.webp', 'Word Scramble 11.webp'],
  'wordsearch': ['Word Search 10.webp', 'Word Search 11.webp'],
  'writing': ['writing.webp', 'writing beginning letter.webp'],
};

// Hyphenated folder -> spaced folder for samples
const sampleFolderFixes = {
  'alphabet-train': 'alphabet train',
  'big-small': 'big small',
  'chart-count': 'chart count',
  'code-addition': 'code addition',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'math-puzzle': 'math puzzle',
  'math-worksheet': 'math worksheet',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'odd-one-out': 'odd one out',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'picture-path': 'picture path',
  'picture-sort': 'picture sort',
  'shadow-match': 'shadow match',
  'treasure-hunt': 'treasure hunt',
  'word-guess': 'word guess',
  'word-scramble': 'word scramble',
};

// Animals that don't exist -> valid replacements
const animalReplacements = {
  'lion': 'leopard', 'butterfly': 'seagull', 'monkey': 'orangutan', 'bear': 'koala',
  'bird': 'seagull', 'chicken': 'duck', 'cow': 'horse', 'deer': 'moose',
  'dinosaur': 'iguana', 'eagle': 'vulture', 'flamingo': 'swan', 'frog': 'iguana',
  'hedgehog': 'raccoon', 'octopus': 'dolphin', 'parrot': 'woodpecker',
  'shark': 'whale', 'squirrel': 'raccoon',
};

// Wrong folder -> correct folder in image-library
const imgFolderFixes = {
  '/image-library/food/': '/image-library/fruits/',
  '/image-library/school/': '/image-library/classroom/',
  '/image-library/household/': '/image-library/furniture/',
  '/image-library/sea animals/': '/image-library/ocean life/',
  '/image-library/farm/': '/image-library/farm animals/',
};

// Files that don't exist in the corrected folder -> valid replacements
const imgFileFixes = {
  // food items -> fruits equivalents
  'fruits/bread.webp': 'fruits/banana.webp',
  'fruits/cake.webp': 'fruits/cherry.webp',
  'fruits/cheese.webp': 'fruits/clementine.webp',
  'fruits/cookie.webp': 'fruits/coconut.webp',
  'fruits/orange.webp': 'fruits/apricot.webp',
  'fruits/strawberry.webp': 'fruits/blackberry.webp',
  'fruits/watermelon.webp': 'fruits/avocado.webp',
  // school items -> classroom equivalents
  'classroom/crayon.webp': 'classroom/binder.webp',
  'classroom/globe.webp': 'classroom/cabinet.webp',
  'classroom/pencil.webp': 'classroom/book.webp',
  'classroom/ruler.webp': 'classroom/backpack.webp',
  // household -> furniture
  'furniture/box.webp': 'furniture/bench.webp',
  'furniture/chair.webp': 'furniture/armchair.webp',
  'furniture/cup.webp': 'furniture/bed.webp',
  'furniture/lamp.webp': 'furniture/bookcase.webp',
  'furniture/table.webp': 'furniture/cabinet.webp',
  // sea animals -> ocean life
  'ocean life/seahorse.webp': 'ocean life/angelfish.webp',
  'ocean life/starfish.webp': 'ocean life/coral.webp',
  'ocean life/turtle.webp': 'ocean life/crab.webp',
  // farm -> farm animals
  'farm animals/horse.webp': 'farm animals/cow.webp',
  'farm animals/pig.webp': 'farm animals/chicken.webp',
  'farm animals/sheep.webp': 'farm animals/donkey.webp',
};

let totalFiles = 0;
let totalFixed = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Fix sample folder names (hyphens -> spaces)
  for (const [hyphenated, spaced] of Object.entries(sampleFolderFixes)) {
    const re = new RegExp('/samples/english/' + hyphenated.replace(/[-]/g, '\\-') + '/', 'g');
    content = content.replaceAll('/samples/english/' + hyphenated + '/', '/samples/english/' + spaced + '/');
  }

  // 2. Fix sample filenames - replace any file in a known folder with verified files
  for (const [folder, files] of Object.entries(sampleMap)) {
    const escaped = folder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp("'/samples/english/" + escaped + "/[^']+\\.webp'", 'g');
    const matches = [...content.matchAll(re)];
    let fileIdx = 0;
    for (const match of matches) {
      const correctFile = files[fileIdx % files.length];
      const correctPath = "'/samples/english/" + folder + '/' + correctFile + "'";
      if (match[0] !== correctPath) {
        content = content.replace(match[0], correctPath);
      }
      fileIdx++;
    }
  }

  // 3. Fix image library folder names
  for (const [wrong, right] of Object.entries(imgFolderFixes)) {
    content = content.replaceAll(wrong, right);
  }

  // 4. Fix URL-encoded folder names
  content = content.replaceAll('farm%20animals', 'farm animals');
  content = content.replaceAll('ocean%20life', 'ocean life');
  content = content.replaceAll('forest%20creatures', 'forest creatures');

  // 5. Fix nonexistent animal files
  for (const [wrong, right] of Object.entries(animalReplacements)) {
    content = content.replaceAll('/animals/' + wrong + '.webp', '/animals/' + right + '.webp');
  }

  // 6. Fix nonexistent files in corrected folders
  for (const [wrong, right] of Object.entries(imgFileFixes)) {
    content = content.replaceAll('/image-library/' + wrong, '/image-library/' + right);
  }

  // 7. Fix .jpeg -> .webp
  content = content.replace(/\.jpeg'/g, ".webp'");

  totalFiles++;
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
    return true;
  }
  return false;
}

// Process all guide content files
const guideDir = 'frontend/config/guide-content/en/';
for (const f of fs.readdirSync(guideDir).filter(f => f.endsWith('.ts'))) {
  if (processFile(guideDir + f)) {
    console.log('Fixed: guide/' + f);
  }
}

// Process all idea content files
const ideaDir = 'frontend/config/idea-content/en/';
for (const f of fs.readdirSync(ideaDir).filter(f => f.endsWith('.ts'))) {
  if (processFile(ideaDir + f)) {
    console.log('Fixed: idea/' + f);
  }
}

console.log('---');
console.log('Processed ' + totalFiles + ' files, fixed ' + totalFixed);
