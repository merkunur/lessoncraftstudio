/**
 * Fix word count for app-content/en/ files below 2800 words.
 * Strategy: Add a "Do I need design skills?" FAQ + expand the refund FAQ answer.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');

const filesToFix = [
  'alphabet-train.ts',   // needs ~123 words
  'cryptogram.ts',       // needs ~56 words
  'math-puzzle.ts',      // needs ~83 words
  'math-worksheet.ts',   // needs ~112 words
  'more-less.ts',        // needs ~50 words
  'prepositions.ts',     // needs ~127 words
  'word-guess.ts',       // needs ~112 words
  'word-scramble.ts',    // needs ~85 words
];

// Product-specific design skills FAQ for each file
const designFaqs = {
  'alphabet-train.ts': "No design skills are needed. The generator handles all layout, spacing, and visual composition automatically. You choose a creation mode (Theme or Custom Text), select images or type your content, pick a theme and font style, and the generator produces a professional worksheet. The built-in canvas editor lets you drag, resize, and reposition elements if you want to customize further, but the default output is already print-ready. Sellers who have never used design software can produce polished alphabet worksheets that compete with products made by professional graphic designers, because the generator enforces consistent spacing, alignment, and visual hierarchy throughout every worksheet it creates.",
  'cryptogram.ts': "No design skills are required. The generator handles all puzzle construction, letter substitution, layout, and visual formatting automatically. You type or select a phrase, choose a theme, and the generator produces a complete cryptogram with hint letters, numbered blanks, and a cipher key. The built-in canvas editor lets you customize colors, fonts, and positioning, but the default layout is already professional and print-ready. Sellers without any graphic design experience can produce puzzles that look just as polished as those made by professional designers, because the generator enforces consistent formatting and visual hierarchy throughout every puzzle it creates.",
  'math-puzzle.ts': "No design skills are required. The generator handles all grid construction, problem placement, image selection, and visual formatting automatically. You choose an operation, set the difficulty, select a theme, and the generator produces a complete puzzle grid with answer key. The built-in canvas editor lets you customize colors, fonts, and positioning, but the default layout is already professional and print-ready. Sellers without graphic design experience can produce puzzles that look polished and marketplace-ready, because the generator enforces consistent formatting, alignment, and visual hierarchy throughout every puzzle page it creates.",
  'math-worksheet.ts': "No design skills are required. The generator handles all problem generation, layout formatting, and visual composition automatically. You select your operations, set number ranges, choose a theme, and the generator produces clean, professional worksheets with answer keys. The built-in canvas editor allows further customization of fonts, colors, and element positioning, but the default output is already print-ready and marketplace-quality. Sellers without any graphic design background can produce math worksheets that compete with professionally designed products, because the generator enforces consistent spacing, alignment, and typographic hierarchy across every page it creates.",
  'more-less.ts': "No design skills are required. The generator handles all comparison layout, image placement, and visual formatting automatically. You choose a theme, set the number range, and the generator produces professional worksheets with the greater-than, less-than, and equal symbols correctly positioned. The canvas editor allows customization, but default output is already print-ready and marketplace-quality. Sellers without design experience can produce polished comparison worksheets immediately.",
  'prepositions.ts': "No design skills are required. The generator handles all scene composition, preposition labeling, image placement, and visual formatting automatically. You select a theme, choose which prepositions to practice, and the generator produces a complete worksheet with scenes illustrating spatial relationships. The built-in canvas editor lets you customize fonts, colors, and element positioning, but the default layout is already professional and print-ready. ESL content creators without graphic design experience can produce worksheets that look just as polished as those from professional educational publishers, because the generator enforces consistent formatting and visual hierarchy throughout every page it creates.",
  'word-guess.ts': "No design skills are required. The generator handles all puzzle construction, blanking patterns, image clue placement, and visual formatting automatically. You choose a theme, select images, and the generator produces a complete word guess puzzle with properly blanked words and visual clues. The built-in canvas editor lets you customize fonts, colors, and element positioning, but the default layout is already professional and print-ready. Sellers without any graphic design experience can produce puzzles that look polished and marketplace-ready, because the generator enforces consistent formatting, alignment, and visual hierarchy throughout every puzzle page it creates.",
  'word-scramble.ts': "No design skills are required. The generator handles all word scrambling, layout formatting, image placement, and visual composition automatically. You choose a theme, select images, and the generator scrambles the corresponding words into a professional puzzle layout. The built-in canvas editor lets you customize fonts, colors, and element positioning, but the default output is already print-ready. Sellers without graphic design experience can produce word scramble puzzles that look polished and marketplace-quality, because the generator enforces consistent formatting and visual hierarchy across every puzzle page it creates.",
};

let fixed = 0;

for (const filename of filesToFix) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if "Do I need design skills" FAQ already exists
  if (content.includes('design skills')) {
    console.log(`SKIP (already has design FAQ): ${filename}`);
    continue;
  }

  const faqAnswer = designFaqs[filename];
  if (!faqAnswer) {
    console.error(`NO FAQ TEXT: ${filename}`);
    continue;
  }

  // Find the last FAQ item (before the closing bracket) and add a new one
  // Pattern: find "    },\n  ],\n" which closes the FAQ array
  const faqEndPattern = /(\s+\},\s*\n\s*\],\s*\n\s*\n\s*internalLinks:)/;
  const match = content.match(faqEndPattern);

  if (!match) {
    console.error(`FAQ END NOT FOUND: ${filename}`);
    continue;
  }

  const newFaq = `    },
    {
      question: 'Do I need design skills to use this tool?',
      answer:
        '${faqAnswer.replace(/'/g, "\\'")}',
    },
  ],

  internalLinks:`;

  content = content.replace(faqEndPattern, newFaq);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`ADDED FAQ: ${filename}`);
  fixed++;
}

console.log(`\nDone: ${fixed} files updated`);
