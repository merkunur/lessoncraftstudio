/**
 * Fix word count for tool-content/en/ files below 2800.
 * Add "What can I create with the free version?" FAQ.
 */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'en');

const filesToFix = [
  'alphabet-train.ts',
  'code-addition.ts',
  'image-subtraction.ts',
  'math-puzzle.ts',
  'math-worksheet.ts',
  'more-less.ts',
  'prepositions.ts',
  'word-guess.ts',
  'word-scramble.ts',
];

const faqTexts = {
  'alphabet-train.ts': "The free version gives you complete access to every feature — both creation modes (Theme and Custom Text), all five font styles, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration walls, and no usage limits. The only difference between the free version and the commercial license is a small watermark on downloaded files. This means you can fully evaluate every aspect of the tool, test different alphabet configurations, preview print quality, and compare output across multiple themes before deciding whether to purchase a commercial license for selling your worksheets on Etsy, Amazon KDP, or any other marketplace.",
  'code-addition.ts': "The free version gives you complete access to every feature — word generation, letter substitution, all hint options, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate puzzle quality, test different word lengths and difficulty settings, preview print output across multiple themes, and compare configurations before deciding whether to purchase a commercial license for selling your code math puzzles on Etsy, Amazon KDP, or any other marketplace.",
  'image-subtraction.ts': "The free version gives you complete access to every feature — all four exercise modes, configurable number ranges, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate worksheet quality, test different difficulty configurations, preview output across multiple themes, and compare exercise modes before deciding whether to purchase a commercial license for selling subtraction worksheets on Etsy, Amazon KDP, or any other marketplace.",
  'math-puzzle.ts': "The free version gives you complete access to every feature — all three operations, all grid sizes, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate puzzle quality, test different grid configurations and operations, preview print output across multiple themes, and compare difficulty levels before deciding whether to purchase a commercial license for selling your math puzzles on Etsy, Amazon KDP, or any other marketplace.",
  'math-worksheet.ts': "The free version gives you complete access to every feature — all four operations (addition, subtraction, multiplication, division), configurable number ranges, the full theme library, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate worksheet quality, test different operation combinations and difficulty settings, preview output across multiple themes, and compare configurations before deciding whether to purchase a commercial license for selling math worksheets on Etsy, Amazon KDP, or any other marketplace.",
  'more-less.ts': "The free version gives you complete access to every feature — all comparison modes, configurable number ranges, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate worksheet quality, test different number ranges, preview output across themes, and compare configurations before deciding whether to purchase a commercial license for selling your comparison worksheets on Etsy, Amazon KDP, or any other marketplace.",
  'prepositions.ts': "The free version gives you complete access to every feature — both exercise modes, all preposition options, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate worksheet quality, test different preposition configurations, preview scene layouts across multiple themes, and compare exercise modes before deciding whether to purchase a commercial license for selling preposition worksheets on Etsy, Amazon KDP, or any other marketplace.",
  'word-guess.ts': "The free version gives you complete access to every feature — all content sources, all blanking modes, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate puzzle quality, test different word lists and difficulty settings, preview print output across multiple themes, and compare blanking patterns before deciding whether to purchase a commercial license for selling word guess puzzles on Etsy, Amazon KDP, or any other marketplace.",
  'word-scramble.ts': "The free version gives you complete access to every feature — automatic scrambling, all display modes, the full image library with 104 themed collections, answer key generation, all page sizes, and all export formats. There are no locked features, no registration requirements, and no usage limits. The only difference is a small watermark on downloaded files. This means you can fully evaluate puzzle quality, test different theme selections and scramble patterns, preview print output, and compare configurations before deciding whether to purchase a commercial license for selling word scramble puzzles on Etsy, Amazon KDP, or any other marketplace.",
};

let fixed = 0;

for (const filename of filesToFix) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('What can I create with the free version')) {
    console.log(`SKIP (already has FAQ): ${filename}`);
    continue;
  }

  const faqText = faqTexts[filename];
  if (!faqText) {
    console.error(`NO FAQ TEXT: ${filename}`);
    continue;
  }

  // Find the pattern ],\n\n  internalLinks: or ],\n\n  upgradeLink:
  // which marks the end of the FAQ array
  const patterns = [
    /(\s*\},\s*\n\s*\],\s*\n\s*\n\s*internalLinks:)/,
    /(\s*\},\s*\n\s*\],\s*\n\s*\n\s*upgradeLink:)/,
    /(\s*\},\s*\n\s*\],\s*\n\s*\n\s*visuals:)/,
  ];

  let matched = false;
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const escapedFaq = faqText.replace(/'/g, "\\'");
      const replacement = `    },
    {
      question: 'What can I create with the free version?',
      answer:
        '${escapedFaq}',
    },
  ],

  ${match[1].includes('internalLinks') ? 'internalLinks' : match[1].includes('upgradeLink') ? 'upgradeLink' : 'visuals'}:`;

      content = content.replace(pattern, replacement);
      matched = true;
      break;
    }
  }

  if (!matched) {
    console.error(`PATTERN NOT FOUND: ${filename}`);
    continue;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`ADDED FAQ: ${filename}`);
  fixed++;
}

console.log(`\nDone: ${fixed} files updated`);
