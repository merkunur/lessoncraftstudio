const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

let totalFixes = 0;
const fixedFiles = [];

for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Find the second-grade block
  const sgStart = content.indexOf("'second-grade'");
  if (sgStart === -1) continue;

  // Find the end of the second-grade block (the closing },\n  }, before // -- FAQ --)
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  if (faqMarker === -1) continue;

  const sgBlock = content.substring(sgStart, faqMarker);
  let fixedBlock = sgBlock;

  // Find all single-quoted string values in the block and fix unescaped apostrophes
  // Strategy: Find each string value (intro, skill, area, developmentalNotes, question, answer, teaching tips)
  // and ensure apostrophes within them are escaped

  // Match patterns like: key: 'value', or standalone 'value',
  // We need to find strings that have unescaped single quotes inside them

  // Approach: scan character by character through the block
  // When we enter a single-quoted string (after : ' or after [ '), track the nesting
  // and escape any ' that is followed by a letter (indicating it's an apostrophe, not end of string)

  // Simpler approach: find common apostrophe patterns and escape them
  const apostrophePatterns = [
    // Possessives: word's (where ' is between a letter and 's')
    { regex: /([a-zA-Z])'s(\s|,|\.|;|!|\?)/g, replacement: "$1\\'s$2" },
    // Contractions
    { regex: /(\w)'t(\s|,|\.|;|!|\?)/g, replacement: "$1\\'t$2" },
    { regex: /(\w)'re(\s|,|\.|;|!|\?)/g, replacement: "$1\\'re$2" },
    { regex: /(\w)'ve(\s|,|\.|;|!|\?)/g, replacement: "$1\\'ve$2" },
    { regex: /(\w)'ll(\s|,|\.|;|!|\?)/g, replacement: "$1\\'ll$2" },
    { regex: /(\w)'d(\s|,|\.|;|!|\?)/g, replacement: "$1\\'d$2" },
    { regex: /(\w)'m(\s|,|\.|;|!|\?)/g, replacement: "$1\\'m$2" },
    // Possessive plural: words' (where ' follows s at end of word before space)
    // Be careful not to match end-of-string quotes
  ];

  // But we need to be careful not to double-escape already escaped ones
  // First, let's find all unescaped apostrophes (single quotes not preceded by backslash)
  // that appear to be within words

  // Better approach: find unescaped ' that is between word characters
  // An apostrophe in text: letter + ' + letter (like don't, Earth's)
  // This won't be a string delimiter because string delimiters are preceded by : or , or [ etc.

  // Find all occurrences of letter'letter that are NOT already escaped
  fixedBlock = fixedBlock.replace(/([a-zA-Z])(?<!\\)'([a-zA-Z])/g, "$1\\'$2");

  if (fixedBlock !== sgBlock) {
    content = content.substring(0, sgStart) + fixedBlock + content.substring(faqMarker);

    // Count fixes
    const fixes = fixedBlock.length - sgBlock.length;
    totalFixes += fixes;
    fixedFiles.push(theme);

    fs.writeFileSync(fp, content, 'utf8');
  }
}

console.log(`Fixed ${fixedFiles.length} files with ${totalFixes} character additions`);
if (fixedFiles.length > 0) {
  console.log('Files fixed:', fixedFiles.join(', '));
}
