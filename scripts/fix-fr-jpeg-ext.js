const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

// Files where the original had escaped apostrophes + .jpeg extension
// These need .jpeg → .webp conversion (the filename is already correct)
const jpegToWebp = [
  // odd-one-out
  ["Trouve l\\'Intrus 1.jpeg", "Trouve l\\'Intrus 1.webp"],
  ["Trouve l\\'Intrus 2.jpeg", "Trouve l\\'Intrus 2.webp"],
  ["Trouve l\\'Intrus 1 answer-key.jpeg", "Trouve l\\'Intrus 1 answer-key.webp"],
  // shadow-match
  ["Trouve l\\'Ombre 1.jpeg", "Trouve l\\'Ombre 1.webp"],
  ["Trouve l\\'Ombre 2.jpeg", "Trouve l\\'Ombre 2.webp"],
  ["Trouve l\\'Ombre 1 answer-key.jpeg", "Trouve l\\'Ombre 1 answer-key.webp"],
  // picture-sort
  ["Tri d\\'Images 1.jpeg", "Tri d\\'Images 1.webp"],
  ["Tri d\\'Images 2.jpeg", "Tri d\\'Images 2.webp"],
  ["Tri d\\'Images 1 answer_key.jpeg", "Tri d\\'Images 1 answer_key.webp"],
  // sudoku (in case any still have .jpeg)
  ["Sudoku en Images 1.jpeg", "Sudoku en Images 1.webp"],
  ["Sudoku en Images 2.jpeg", "Sudoku en Images 2.webp"],
  ["Sudoku en Images 1 answer_key.jpeg", "Sudoku en Images 1 answer_key.webp"],
];

let totalFixed = 0;

for (const dir of dirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;

  for (const file of fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'))) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [broken, correct] of jpegToWebp) {
      content = content.split(broken).join(correct);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log('Fixed extensions: ' + dir + '/' + file);
    }
  }
}

console.log('\nTotal files with extension fixes: ' + totalFixed);
