const fs = require('fs');
const path = require('path');

// appId -> youtubeId mapping (from the 33 app content files)
const appYoutubeMap = {
  'addition': '6O5aCzHkh8M',
  'subtraction': 'til2mrWMUxk',
  'code-addition': 'vVd11Kjk9iA',
  'more-less': '', // no video
  'math-puzzle': '', // no video
  'math-worksheet': '-JIawojGNr0',
  'alphabet-train': '_dDQegRq9JQ',
  'prepositions': 'ifIXbViR5_o',
  'word-guess': 'DSwX_p4dRNM',
  'word-scramble': 'Hc3g5VsSHEU',
  'wordsearch': '36keBFzJbPo',
  'word-search': '36keBFzJbPo',
  'cryptogram': '9U0BIIjCnco',
  'big-small': 'S2s2U6Nb7FI',
  'pattern-train': '5A4aHvcC5u4',
  'pattern-worksheet': 'W94X5_RA3ug',
  'draw-and-color': '1uZubAOGIkM',
  'drawing-lines': 'P9q3ymjFnOQ',
  'coloring': 'ZdpCr2txHcc',
  'chart-count': 'CDgIihDQX6U',
  'matching': 'y3ghkjt_67s',
  'grid-match': 'RGtED1Bnut8',
  'shadow-match': 'TYvUXJeMI98',
  'bingo': 'd6AOiDXoK1c',
  'picture-sort': '9kzmlABtNVQ',
  'missing-pieces': 'gb-xE_Ay4fc',
  'odd-one-out': '0R6WFUfY7Mk',
  'sudoku': 'bqVioFbkYbA',
  'picture-path': 'Sl1o0uPBDCg',
  'find-and-count': '0cOPi7eajLs',
  'find-count': '0cOPi7eajLs',
  'find-objects': '8Y3jrVr1Phs',
  'crossword': 'b3WKDrzif-w',
  'treasure-hunt': 'flHiBXsYLLA',
  'writing': '0b4WglqyXu0',
};

const ideaDir = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'en');
const files = fs.readdirSync(ideaDir).filter(f => f.endsWith('.ts'));

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(ideaDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has youtubeId
  if (content.includes('youtubeId')) {
    console.log(`SKIP (already has youtubeId): ${file}`);
    skipped++;
    continue;
  }

  // Extract appIds from productIdeas
  const appIdMatches = [...content.matchAll(/appId:\s*'([^']+)'/g)];
  if (appIdMatches.length === 0) {
    console.log(`SKIP (no appIds found): ${file}`);
    skipped++;
    continue;
  }

  // Find first appId with a valid youtubeId
  let youtubeId = '';
  let matchedAppId = '';
  for (const match of appIdMatches) {
    const appId = match[1];
    const vid = appYoutubeMap[appId];
    if (vid) {
      youtubeId = vid;
      matchedAppId = appId;
      break;
    }
  }

  if (!youtubeId) {
    console.log(`SKIP (no valid youtubeId for any appId): ${file}`);
    skipped++;
    continue;
  }

  // Generate video title from hero title
  const heroTitleMatch = content.match(/hero:\s*\{[^}]*title:\s*'([^']+)'/s);
  const heroTitle = heroTitleMatch ? heroTitleMatch[1] : file.replace('.ts', '');
  const videoTitle = `${heroTitle} \u2014 Product Demo`;

  // Insert youtubeId and videoTitle before the closing of the content object
  // Find the last }; which closes `const content: IdeaContent = { ... };`
  // We insert before the final closing
  const insertBefore = '\n};\n\nexport default content;';
  const insertAfter = `\n  youtubeId: '${youtubeId}',\n  videoTitle: '${videoTitle}',\n};\n\nexport default content;`;

  if (content.includes('};\n\nexport default content;')) {
    // Find the LAST occurrence
    const lastIdx = content.lastIndexOf('};\n\nexport default content;');
    content = content.substring(0, lastIdx) + insertAfter;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED: ${file} -> ${matchedAppId} -> ${youtubeId}`);
    updated++;
  } else {
    console.log(`SKIP (unexpected file structure): ${file}`);
    skipped++;
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
