/**
 * Final word count fix - expand the "Can I sell..." FAQ answer for 5 files still below 2800.
 */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');

const fixes = {
  'alphabet-train.ts': {
    old: "question: 'Can I sell worksheets made with this tool on Etsy and Amazon KDP?',",
    expandWith: " Alphabet worksheets have strong year-round demand because they target foundational literacy skills that every learner needs. Sellers who combine uppercase and lowercase sets with themed imagery report strong seasonal performance during back-to-school periods and holiday gift-giving seasons. Building a catalog of 10-20 themed alphabet sets gives you consistent passive revenue from a single product category."
  },
  'math-worksheet.ts': {
    old: "question: 'Can I sell worksheets made with this tool on Etsy and Amazon KDP?',",
    expandWith: " Math drill worksheets have consistent year-round demand because parents, tutors, and homeschool families continuously need fresh practice material. Sellers who create grade-level bundles spanning kindergarten through third grade build catalog depth that keeps buyers returning for the next difficulty tier. The combination of customizable operations, automatic answer keys, and professional export quality positions your products competitively against mass-produced alternatives."
  },
  'prepositions.ts': {
    old: "question: 'Can I sell worksheets made with this tool on Etsy and Amazon KDP?',",
    expandWith: " Preposition worksheets serve a specialized ESL and early literacy market with less competition than general math or reading categories. Sellers who create themed bundles organized by preposition groups — spatial prepositions, temporal prepositions, directional prepositions — build comprehensive product lines that attract both individual buyers and institutional purchasers looking for complete curriculum-aligned resources."
  },
  'subtraction.ts': {
    old: "question: 'Can I sell worksheets made with this tool on Etsy and Amazon KDP?',",
    expandWith: " Subtraction worksheets pair naturally with addition products, and sellers who offer both as a combined bundle consistently achieve higher average order values. Building themed bundles across multiple difficulty levels creates a product catalog with strong internal cross-selling potential. The visual format with themed images appeals to both parents buying for home practice and tutoring professionals seeking engaging materials for their sessions."
  },
  'word-guess.ts': {
    old: "question: 'Can I sell worksheets made with this tool on Etsy and Amazon KDP?',",
    expandWith: " Word guess puzzles fill a unique niche between word search and crossword formats, giving you product variety that most competing sellers overlook. Sellers who create themed bundles organized by difficulty level or vocabulary category build product lines with strong repeat purchase potential. The visual clue format appeals to both literacy learners and puzzle enthusiasts, expanding your addressable buyer audience beyond the educational printable market."
  },
};

for (const [filename, fix] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the "Can I sell..." FAQ answer and expand it
  const sellQIdx = content.indexOf(fix.old);
  if (sellQIdx === -1) {
    console.error(`QUESTION NOT FOUND: ${filename}`);
    continue;
  }

  // Find the answer's closing quote after this question
  const answerStart = content.indexOf("answer:", sellQIdx);
  if (answerStart === -1) {
    console.error(`ANSWER NOT FOUND: ${filename}`);
    continue;
  }

  // Find the closing single quote of the answer (pattern: ...revenue.',)
  // Look for the pattern: word + .',  or word + .'
  let searchFrom = answerStart;
  let closingIdx = -1;
  while (true) {
    const nextQuote = content.indexOf("',", searchFrom + 1);
    if (nextQuote === -1) break;
    // Check it's not an escaped quote
    if (content[nextQuote - 1] !== '\\') {
      closingIdx = nextQuote;
      break;
    }
    searchFrom = nextQuote + 1;
  }

  if (closingIdx === -1) {
    console.error(`CLOSING QUOTE NOT FOUND: ${filename}`);
    continue;
  }

  // Insert additional text before the closing quote
  content = content.slice(0, closingIdx) + fix.expandWith + content.slice(closingIdx);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`EXPANDED: ${filename}`);
}
