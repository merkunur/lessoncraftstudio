const fs = require('fs');
const path = require('path');

// Mapping of product slug → { folder: server folder URL path, images: actual filenames }
const products = {
  'subtraction': {
    folder: 'subtraction',
    images: [
      'Soustractions Amusantes 1.webp',
      'Soustractions Amusantes 2.webp',
      'Soustractions Amusantes 3.webp',
      'Soustractions Amusantes 4.webp',
    ],
    worksheet: 'worksheet.webp',
    answerKey: 'answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    images: [
      'Train à Motifs 1.webp',
      'Train à Motifs 2.webp',
      'Train à Motifs 3.webp',
      'Train à Motifs 4.webp',
    ],
    worksheet: 'Train à Motifs 5.webp',
    answerKey: 'Train à Motifs 1 answer_key (1).webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    images: [
      'Puzzles de Motifs 1.webp',
      'Puzzles de Motifs 2.webp',
      'Puzzles de Motifs 3.webp',
      'Puzzles de Motifs 4.webp',
    ],
    worksheet: 'pattern_worksheet.webp',
    answerKey: 'pattern_answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    images: [
      "Chemin d'Images 1.webp",
      "Chemin d'Images 2.webp",
      "Chemin d'Images 3.webp",
      "Chemin d'Images 4.webp",
    ],
    worksheet: 'worksheet.webp',
    answerKey: 'answer_key.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    images: [
      "Tri d'Images 1.webp",
      "Tri d'Images 2.webp",
      "Tri d'Images 3.webp",
      "Tri d'Images 4.webp",
    ],
    worksheet: "Tri d'Images 1.webp",
    answerKey: "Tri d'Images 1 answer_key.webp",
  },
  'prepositions': {
    folder: 'prepositions',
    images: [
      'Prépositions 1.webp',
      'Prépositions 2.webp',
      'Prépositions 3.webp',
      'Prépositions 4.webp',
    ],
    worksheet: 'prepositions_worksheet.webp',
    answerKey: 'prepositions_answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    images: [
      "Trouve l'Ombre 1.webp",
      "Trouve l'Ombre 2.webp",
      "Trouve l'Ombre 3.webp",
      "Trouve l'Ombre 4.webp",
    ],
    worksheet: 'shadow-match-worksheet.webp',
    answerKey: 'shadow-match-answer-key.webp',
  },
  'sudoku': {
    folder: 'sudoku',
    images: [
      'Sudoku en Images 1.webp',
      'Sudoku en Images 2.webp',
      'Sudoku en Images 3.webp',
      'Sudoku en Images 4.webp',
    ],
    worksheet: 'sudoku_worksheet.webp',
    answerKey: 'sudoku_answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    images: [
      'Chasse au Trésor 1.webp',
      'Chasse au Trésor 2.webp',
      'Chasse au Trésor 3.webp',
      'Chasse au Trésor 4.webp',
    ],
    worksheet: 'worksheet.webp',
    answerKey: 'answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    images: [
      'Devine le Mot 1.webp',
      'Devine le Mot 2.webp',
      'Devine le Mot 3.webp',
      'Devine le Mot 4.webp',
    ],
    worksheet: 'Devine le Mot 5.webp',
    answerKey: 'Devine le Mot 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    images: [
      'Mots Mêlés 1.webp',
      'Mots Mêlés 2.webp',
      'Mots Mêlés 3.webp',
      'Mots Mêlés 4.webp',
    ],
    worksheet: 'word-scramble_worksheet.webp',
    answerKey: 'word-scramble_answer-key.webp',
  },
  'wordsearch': {
    folder: 'wordsearch',
    images: [
      'Mots Cachés 1.webp',
      'Mots Cachés 2.webp',
      'Mots Cachés 3.webp',
      'Mots Cachés 4.webp',
    ],
    worksheet: 'worksheet.webp',
    answerKey: 'answer_key.webp',
  },
  'writing': {
    folder: 'writing',
    images: [
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
      'writing.webp', // reuse for 4th slot
    ],
    worksheet: 'writing.webp',
    answerKey: 'writing beginning letter.webp',
  },
};

function encodeFilename(name) {
  return encodeURIComponent(name).replace(/%2F/g, '/');
}

const BASE = 'https://www.lessoncraftstudio.com/samples/french';

function buildUrl(folder, filename) {
  return `${BASE}/${encodeFilename(folder)}/${encodeFilename(filename)}`;
}

const tptDir = path.join(__dirname, '..', 'tpt', 'French');
let totalFixed = 0;

for (const [slug, info] of Object.entries(products)) {
  const productDir = path.join(tptDir, slug);
  if (!fs.existsSync(productDir)) {
    console.log(`SKIP: ${slug} folder not found`);
    continue;
  }

  const files = fs.readdirSync(productDir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const filePath = path.join(productDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace all img src URLs that point to the wrong samples path
    // Match pattern: https://www.lessoncraftstudio.com/samples/french/[anything]/[anything].webp
    const imgRegex = /https:\/\/www\.lessoncraftstudio\.com\/samples\/french\/[^"]+\.webp/g;
    const matches = content.match(imgRegex) || [];

    if (matches.length === 0) {
      console.log(`  No image URLs found in ${slug}/${file}`);
      continue;
    }

    // Determine which images to use based on slide type
    let newUrls;

    if (file.includes('1-hero')) {
      // Hero: 5 images - img4, img2, img1, img3, worksheet
      newUrls = [
        buildUrl(info.folder, info.images[3] || info.images[0]),
        buildUrl(info.folder, info.images[1]),
        buildUrl(info.folder, info.images[0]),
        buildUrl(info.folder, info.images[2]),
        buildUrl(info.folder, info.worksheet),
      ];
    } else if (file.includes('2-features')) {
      // Features: 1 main image
      newUrls = [
        buildUrl(info.folder, info.images[0]),
      ];
    } else if (file.includes('3-progression')) {
      // Progression: 3 images
      newUrls = [
        buildUrl(info.folder, info.images[0]),
        buildUrl(info.folder, info.images[1]),
        buildUrl(info.folder, info.images[3] || info.images[2]),
      ];
    } else if (file.includes('4-fun')) {
      // Fun: worksheet + answer key
      newUrls = [
        buildUrl(info.folder, info.images[0]),
        buildUrl(info.folder, info.answerKey),
      ];
    } else if (file.includes('5-professional')) {
      // Professional: 1 image
      newUrls = [
        buildUrl(info.folder, info.images[0]),
      ];
    }

    if (!newUrls) continue;

    // Replace each matched URL in order
    let urlIndex = 0;
    content = content.replace(imgRegex, (match) => {
      if (urlIndex < newUrls.length) {
        return newUrls[urlIndex++];
      }
      return match;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log(`  FIXED: ${slug}/${file} (${matches.length} URLs)`);
    } else {
      console.log(`  unchanged: ${slug}/${file}`);
    }
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
