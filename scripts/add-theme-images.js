/**
 * Add themeImages to all English content files (guides, bundles, start, ideas)
 * Maps each file to relevant image-library themes based on topic keywords
 */
const fs = require('fs');
const path = require('path');

// Theme image mapping - maps keywords in filenames to image-library themes
const themeMap = {
  // Math-related
  'addition': ['animals', 'fruits', 'vehicles', 'dinosaurs'],
  'subtraction': ['animals', 'ocean life', 'space', 'farm animals'],
  'math-puzzle': ['animals', 'fruits', 'insects and bugs', 'birds'],
  'math-worksheet': ['animals', 'vegetables', 'shapes', 'colors'],
  'counting': ['animals', 'fruits', 'insects and bugs', 'flowers'],
  'chart-count': ['animals', 'farm animals', 'fruits', 'vegetables'],
  'more-less': ['animals', 'fruits', 'toys', 'vehicles'],
  'code-addition': ['animals', 'space', 'dinosaurs', 'ocean life'],

  // Letters & Words
  'alphabet': ['animals', 'fruits', 'vehicles', 'colors'],
  'word-search': ['animals', 'ocean life', 'space', 'dinosaurs'],
  'crossword': ['animals', 'fruits', 'vegetables', 'sports bw'],
  'word-scramble': ['animals', 'food bw', 'birds', 'pets'],
  'word-guess': ['animals', 'fruits', 'occupations', 'kitchen tools'],
  'cryptogram': ['animals', 'space', 'dinosaurs', 'ocean life'],
  'handwriting': ['animals', 'fruits', 'shapes', 'colors'],
  'writing': ['animals', 'flowers', 'nature bw', 'pets'],
  'literacy': ['animals', 'fruits', 'birds', 'pets'],

  // Drawing & Art
  'coloring': ['animals', 'dinosaurs', 'ocean life', 'flowers'],
  'drawing': ['animals', 'vehicles', 'shapes', 'fruits'],
  'draw-and-color': ['animals', 'flowers', 'birds', 'pets'],
  'preposition': ['animals', 'furniture', 'toys', 'classroom'],

  // Puzzles & Games
  'bingo': ['animals', 'fruits', 'vegetables', 'farm animals'],
  'sudoku': ['animals', 'fruits', 'vehicles', 'shapes'],
  'maze': ['animals', 'dinosaurs', 'space', 'ocean life'],
  'hidden-object': ['animals', 'beach', 'camping', 'christmas'],
  'find-and-count': ['animals', 'ocean life', 'insects and bugs', 'fruits'],
  'find-objects': ['animals', 'beach', 'camping', 'classroom'],
  'treasure-hunt': ['animals', 'dinosaurs', 'space', 'ocean life'],
  'odd-one-out': ['animals', 'fruits', 'vehicles', 'shapes'],
  'missing-pieces': ['animals', 'vehicles', 'fruits', 'toys'],

  // Matching & Sorting
  'matching': ['animals', 'fruits', 'colors', 'shapes'],
  'shadow-match': ['animals', 'vehicles', 'dinosaurs', 'ocean life'],
  'grid-match': ['animals', 'shapes', 'colors', 'fruits'],
  'picture-sort': ['animals', 'fruits', 'vehicles', 'toys'],
  'picture-path': ['animals', 'fruits', 'flowers', 'ocean life'],
  'big-small': ['animals', 'fruits', 'vehicles', 'dinosaurs'],
  'sorting': ['animals', 'fruits', 'vehicles', 'colors'],
  'size-comparison': ['animals', 'fruits', 'vehicles', 'dinosaurs'],

  // Pattern
  'pattern': ['animals', 'shapes', 'colors', 'fruits'],

  // Business topics (use diverse themes)
  'etsy': ['animals', 'dinosaurs', 'ocean life', 'flowers', 'space'],
  'kdp': ['animals', 'dinosaurs', 'christmas', 'ocean life', 'farm animals'],
  'tpt': ['animals', 'classroom', 'shapes', 'colors', 'fruits'],
  'printable': ['animals', 'fruits', 'flowers', 'vehicles', 'dinosaurs'],
  'business': ['animals', 'fruits', 'ocean life', 'dinosaurs', 'birds'],
  'niche': ['animals', 'dinosaurs', 'ocean life', 'space', 'christmas'],
  'marketing': ['animals', 'flowers', 'beach', 'camping', 'spring'],
  'pricing': ['animals', 'fruits', 'vegetables', 'toys'],
  'copyright': ['animals', 'flowers', 'birds', 'pets'],
  'passive-income': ['animals', 'ocean life', 'space', 'dinosaurs'],
  'sell': ['animals', 'fruits', 'dinosaurs', 'ocean life', 'flowers'],
  'automate': ['animals', 'vehicles', 'tools', 'space'],
  'scale': ['animals', 'birds', 'ocean life', 'space', 'dinosaurs'],
  'review': ['animals', 'fruits', 'flowers', 'pets'],
  'customer': ['animals', 'flowers', 'pets', 'birds'],
  'email': ['animals', 'flowers', 'beach', 'spring'],
  'pinterest': ['animals', 'flowers', 'beach', 'christmas', 'spring'],
  'social-media': ['animals', 'flowers', 'beach', 'camping'],
  'seasonal': ['christmas', 'easter', 'spring', 'summer', 'winter'],
  'digital': ['animals', 'space', 'vehicles', 'tools'],
  'quality': ['animals', 'flowers', 'birds', 'ocean life'],
  'multilingual': ['animals', 'fruits', 'colors', 'shapes', 'vehicles'],
  'commercial': ['animals', 'dinosaurs', 'ocean life', 'farm animals'],
  'bundle': ['animals', 'dinosaurs', 'ocean life', 'fruits', 'flowers', 'space'],
  'worksheet': ['animals', 'fruits', 'shapes', 'colors', 'vehicles'],
};

// Known images per theme (first few in each folder - verified on server)
const themeFiles = {
  'animals': ['cat', 'dog', 'elephant', 'fox', 'giraffe', 'koala', 'panda', 'rabbit', 'tiger', 'zebra'],
  'fruits': ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'pear', 'strawberry'],
  'vegetables': ['broccoli', 'carrot', 'corn', 'cucumber', 'eggplant', 'lettuce', 'onion', 'pepper', 'potato', 'tomato'],
  'vehicles': ['airplane', 'bicycle', 'boat', 'bus', 'car', 'helicopter', 'motorcycle', 'rocket', 'train', 'truck'],
  'dinosaurs': ['brachiosaurus', 'parasaurolophus', 'pterodactyl', 'spinosaurus', 'stegosaurus', 'triceratops', 'tyrannosaurus'],
  'ocean life': ['clownfish', 'crab', 'dolphin', 'jellyfish', 'octopus', 'seahorse', 'shark', 'starfish', 'turtle', 'whale'],
  'space': ['alien', 'astronaut', 'earth', 'jupiter', 'mars', 'moon', 'rocket', 'saturn', 'star', 'sun'],
  'flowers': ['daisy', 'lily', 'orchid', 'rose', 'sunflower', 'tulip'],
  'birds': ['eagle', 'flamingo', 'owl', 'parrot', 'peacock', 'penguin', 'robin', 'toucan'],
  'farm animals': ['chicken', 'cow', 'donkey', 'duck', 'goat', 'horse', 'pig', 'rooster', 'sheep', 'turkey'],
  'insects and bugs': ['ant', 'bee', 'beetle', 'butterfly', 'caterpillar', 'dragonfly', 'ladybug', 'snail', 'spider'],
  'pets': ['cat', 'dog', 'fish', 'hamster', 'parrot', 'rabbit', 'turtle'],
  'shapes': ['circle', 'diamond', 'heart', 'hexagon', 'oval', 'pentagon', 'rectangle', 'square', 'star', 'triangle'],
  'colors': ['blue', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'],
  'toys': ['ball', 'blocks', 'doll', 'kite', 'puzzle', 'robot', 'teddy bear', 'top', 'train', 'yo-yo'],
  'christmas': ['angel', 'bell', 'candy cane', 'christmas tree', 'gift', 'gingerbread', 'ornament', 'reindeer', 'santa', 'snowman'],
  'easter': ['bunny', 'chick', 'egg', 'basket', 'flower', 'lamb'],
  'spring': ['bee', 'bird', 'butterfly', 'flower', 'kite', 'ladybug', 'rainbow', 'umbrella'],
  'summer': ['beach ball', 'ice cream', 'palm tree', 'sandcastle', 'sun', 'sunglasses', 'surfboard', 'watermelon'],
  'winter': ['igloo', 'mitten', 'penguin', 'scarf', 'ski', 'sled', 'snowflake', 'snowman'],
  'beach': ['beach ball', 'crab', 'dolphin', 'palm tree', 'sand castle', 'seashell', 'starfish', 'surfboard'],
  'camping': ['bear', 'campfire', 'compass', 'flashlight', 'lantern', 'map', 'tent', 'tree'],
  'classroom': ['backpack', 'book', 'calculator', 'crayon', 'globe', 'pencil', 'ruler', 'scissors'],
  'furniture': ['bed', 'bookshelf', 'chair', 'desk', 'lamp', 'sofa', 'table', 'wardrobe'],
  'tools': ['drill', 'hammer', 'pliers', 'saw', 'screwdriver', 'tape measure', 'wrench'],
  'occupations': ['chef', 'doctor', 'firefighter', 'nurse', 'pilot', 'police', 'teacher'],
  'kitchen tools': ['bowl', 'cup', 'fork', 'knife', 'pan', 'plate', 'pot', 'spoon'],
  'food bw': ['bread', 'cake', 'cheese', 'cookie', 'donut', 'muffin', 'pie', 'pizza'],
  'sports bw': ['ball', 'basketball', 'football', 'helmet', 'racket', 'skateboard', 'soccer ball'],
  'nature bw': ['cloud', 'flower', 'leaf', 'mountain', 'mushroom', 'sun', 'tree'],
};

function getThemesForFile(filename) {
  const lower = filename.toLowerCase();
  let themes = [];

  for (const [keyword, kwThemes] of Object.entries(themeMap)) {
    if (lower.includes(keyword)) {
      for (const t of kwThemes) {
        if (!themes.includes(t)) themes.push(t);
      }
    }
  }

  // Default fallback
  if (themes.length === 0) {
    themes = ['animals', 'fruits', 'dinosaurs', 'ocean life', 'flowers'];
  }

  return themes;
}

function generateThemeImages(themes, count) {
  const images = [];
  const usedCombos = new Set();

  for (const theme of themes) {
    if (images.length >= count) break;
    const files = themeFiles[theme];
    if (!files) continue;

    for (const file of files) {
      if (images.length >= count) break;
      const combo = `${theme}/${file}`;
      if (usedCombos.has(combo)) continue;
      usedCombos.add(combo);

      const label = file.charAt(0).toUpperCase() + file.slice(1);
      images.push({
        src: `/image-library/${theme}/${file}.webp`,
        alt: `${label} - themed educational image`,
        caption: label,
      });
    }
  }

  return images;
}

function addThemeImagesToFile(filePath, count) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has themeImages
  if (content.includes('themeImages')) {
    return false;
  }

  const filename = path.basename(filePath, '.ts');
  const themes = getThemesForFile(filename);
  const images = generateThemeImages(themes, count);

  if (images.length === 0) return false;

  // Find the closing }; of the content object and insert before it
  // Look for the last `};` followed by optional whitespace and `export default`
  const insertPoint = content.lastIndexOf('};');
  if (insertPoint === -1) return false;

  // Build the themeImages array string
  const imagesStr = images.map(img => {
    const parts = [`    { src: '${img.src}', alt: '${img.alt}'`];
    if (img.caption) parts[0] += `, caption: '${img.caption}'`;
    parts[0] += ' }';
    return parts[0];
  }).join(',\n');

  const insertion = `  themeImages: [\n${imagesStr},\n  ],\n`;

  // Insert before the last };
  const newContent = content.slice(0, insertPoint) + insertion + content.slice(insertPoint);
  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

// Process all content directories
const dirs = [
  { dir: 'frontend/config/guide-content/en', count: 5 },
  { dir: 'frontend/config/bundle-content/en', count: 8 },
  { dir: 'frontend/config/start-content/en', count: 4 },
  { dir: 'frontend/config/idea-content/en', count: 6 },
];

let totalUpdated = 0;
for (const { dir, count } of dirs) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`Skipping ${dir} (not found)`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  let updated = 0;
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    if (addThemeImagesToFile(filePath, count)) {
      updated++;
    }
  }
  console.log(`${dir}: ${updated}/${files.length} files updated`);
  totalUpdated += updated;
}

console.log(`\nTotal: ${totalUpdated} files updated with themeImages`);
