const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/product-pages/fr';
const files = [
  'drawing-lines-worksheets.ts',
  'find-and-count-worksheets.ts',
  'find-objects-worksheets.ts',
  'grid-match-worksheets.ts',
  'matching-worksheets.ts',
  'math-puzzle-worksheets.ts',
  'math-worksheets.ts',
  'missing-pieces-worksheets.ts',
];

files.forEach(f => {
  const content = fs.readFileSync(path.join(baseDir, f), 'utf8');

  // Count literal \u2019 sequences (backslash + u2019)
  let literalU2019 = 0;
  for (let i = 0; i < content.length - 5; i++) {
    if (content[i] === '\\' && content.substring(i+1, i+5) === 'u201') {
      literalU2019++;
    }
  }

  // Count \' sequences (backslash + single quote)
  let escapedApos = 0;
  for (let i = 0; i < content.length - 1; i++) {
    if (content[i] === '\\' && content[i+1] === "'") {
      escapedApos++;
    }
  }

  // Check FAQ section specifically
  const faqStart = content.indexOf("id: 'faq-1'");
  const faqEnd = content.indexOf('],', content.indexOf("id: 'faq-5'")) + 2;
  const faqSection = content.substring(faqStart, faqEnd);

  let faqU2019 = 0;
  for (let i = 0; i < faqSection.length - 5; i++) {
    if (faqSection[i] === '\\' && faqSection.substring(i+1, i+5) === 'u201') {
      faqU2019++;
    }
  }

  let faqEscaped = 0;
  for (let i = 0; i < faqSection.length - 1; i++) {
    if (faqSection[i] === '\\' && faqSection[i+1] === "'") {
      faqEscaped++;
    }
  }

  console.log(`${f}: total(\\u201x=${literalU2019}, \\'=${escapedApos}) faq(\\u201x=${faqU2019}, \\'=${faqEscaped})`);
});
