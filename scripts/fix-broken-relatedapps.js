/**
 * Fix broken relatedApps slug references in EN product page content files.
 *
 * matchup-maker-worksheets → matching-worksheets (8 files)
 * image-crossword-worksheets → crossword-worksheets (3 files)
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

const replacements = [
  {
    slugFrom: 'matchup-maker-worksheets',
    slugTo: 'matching-worksheets',
    namePatterns: [
      { from: "name: 'MatchUp Maker Worksheets'", to: "name: 'Matching Worksheets'" },
      { from: "name: 'MatchUp Maker'", to: "name: 'Matching Worksheets'" },
    ],
    categoryTo: "category: 'Visual Skills'",
  },
  {
    slugFrom: 'image-crossword-worksheets',
    slugTo: 'crossword-worksheets',
    namePatterns: [
      { from: "name: 'Image Crossword Worksheets'", to: "name: 'Crossword Worksheets'" },
    ],
    categoryTo: "category: 'Language Arts'",
  },
];

let totalFixed = 0;

for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.ts'))) {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const r of replacements) {
    if (content.includes(`slug: '${r.slugFrom}'`)) {
      // Fix slug
      content = content.replace(
        `slug: '${r.slugFrom}'`,
        `slug: '${r.slugTo}'`
      );
      // Fix name
      for (const np of r.namePatterns) {
        if (content.includes(np.from)) {
          content = content.replace(np.from, np.to);
        }
      }
      modified = true;
      totalFixed++;
      console.log(`Fixed: ${file} — ${r.slugFrom} → ${r.slugTo}`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log(`\nTotal fixes: ${totalFixed}`);
