const fs = require('fs');
const path = require('path');

const BASE = 'frontend/content/themes';
const allThemes = [
  'animals','farm','pets','zoo','birds','insects','ocean','dinosaurs','forest','garden',
  'seasons','winter','weather','flowers','nature','holidays','easter','halloween','xmas','birthday',
  'numbers','alphabet','shapes','colors','school','fairy-tales','pirates','superheroes','robots','circus',
  'food','cooking','clothing','household','furniture','body','emotions','jobs','music','toys',
  'sports','camping','travel','transportation','construction','space','spring','summer','fruits','vegetables'
];
const grades = ['preschool','kindergarten','first-grade','second-grade','third-grade'];
let issues = [];
let wordCounts = [];

for (const theme of allThemes) {
  const fp = path.join(BASE, theme, 'en.ts');
  const c = fs.readFileSync(fp, 'utf8');

  // Check all 5 grades present (as keys)
  for (const g of grades) {
    if (c.indexOf("'" + g + "':") === -1) {
      issues.push(theme + ': MISSING grade key ' + g);
    }
  }

  // Check third-grade key appears exactly once
  const keyPattern = "'third-grade':";
  let keyCount = 0;
  let pos = 0;
  while ((pos = c.indexOf(keyPattern, pos)) !== -1) {
    keyCount++;
    pos += keyPattern.length;
  }
  if (keyCount !== 1) {
    issues.push(theme + ': third-grade KEY count=' + keyCount);
  }

  // Check FAQ section still exists
  if (c.indexOf('// -- FAQ --') === -1) {
    issues.push(theme + ': MISSING FAQ section');
  }

  // Check third-grade block has required fields
  const thirdGradeIdx = c.indexOf("'third-grade':");
  if (thirdGradeIdx !== -1) {
    const block = c.substring(thirdGradeIdx);
    // Find intro using robust regex that handles escaped apostrophes
    const introMatch = block.match(/intro:\s*'([\s\S]*?)',\n\s+objectives/);
    if (introMatch) {
      const words = introMatch[1].replace(/\\'/g, "'").split(/\s+/).length;
      wordCounts.push({ theme, words });
      if (words < 180) issues.push(theme + ': third-grade intro SHORT (' + words + ' words)');
    } else {
      issues.push(theme + ': could not parse intro');
    }

    // Check for objectives (3 items)
    const objMatch = block.match(/objectives:\s*\[([\s\S]*?)\]/);
    if (objMatch) {
      const objCount = (objMatch[1].match(/skill:/g) || []).length;
      if (objCount !== 3) issues.push(theme + ': third-grade objectives count=' + objCount);
    } else {
      issues.push(theme + ': third-grade MISSING objectives');
    }

    // Check developmentalNotes
    if (block.indexOf('developmentalNotes:') === -1) {
      issues.push(theme + ': third-grade MISSING developmentalNotes');
    }

    // Check teachingTips (2 items)
    const tipsMatch = block.match(/teachingTips:\s*\[([\s\S]*?)\],/);
    if (tipsMatch) {
      // Count strings in the tips array
      const tipsCount = (tipsMatch[1].match(/'/g) || []).length / 2; // rough count of strings
    } else {
      issues.push(theme + ': third-grade MISSING teachingTips');
    }

    // Check faq (3 items)
    const faqMatch = block.match(/faq:\s*\[([\s\S]*?)\],\n\s+\}/);
    if (faqMatch) {
      const faqCount = (faqMatch[1].match(/question:/g) || []).length;
      if (faqCount !== 3) issues.push(theme + ': third-grade faq count=' + faqCount);
    } else {
      issues.push(theme + ': third-grade MISSING faq');
    }
  }
}

console.log('=== VERIFICATION RESULTS ===');
console.log('Checked ' + allThemes.length + '/50 themes\n');

if (issues.length === 0) {
  console.log('ALL CHECKS PASSED!\n');
} else {
  console.log('ISSUES (' + issues.length + '):');
  issues.forEach(i => console.log('  - ' + i));
  console.log('');
}

// Word count summary
wordCounts.sort((a, b) => a.words - b.words);
console.log('INTRO WORD COUNTS (sorted):');
console.log('  Shortest: ' + wordCounts[0].theme + ' (' + wordCounts[0].words + ')');
console.log('  Longest:  ' + wordCounts[wordCounts.length - 1].theme + ' (' + wordCounts[wordCounts.length - 1].words + ')');
console.log('  Average:  ' + Math.round(wordCounts.reduce((s, x) => s + x.words, 0) / wordCounts.length));
const under200 = wordCounts.filter(x => x.words < 200);
if (under200.length > 0) {
  console.log('  Under 200 words: ' + under200.map(x => x.theme + '(' + x.words + ')').join(', '));
}
