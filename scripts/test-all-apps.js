const fetch = require('node-fetch');

const apps = [
  'word-search',
  'image-addition',
  'alphabet-train',
  'coloring',
  'math-worksheet',
  'word-scramble',
  'find-and-count',
  'matching-app',
  'drawing-lines',
  'picture-bingo',
  'sudoku',
  'big-small-app',
  'chart-count-color',
  'code-addition',
  'draw-and-color',
  'find-objects',
  'grid-match',
  'image-crossword',
  'image-cryptogram',
  'math-puzzle',
  'missing-pieces',
  'more-less',
  'odd-one-out',
  'pattern-train',
  'pattern-worksheet',
  'picture-path',
  'picture-sort',
  'prepositions',
  'shadow-match',
  'story-dice',
  'subtraction',
  'treasure-hunt',
  'word-guess',
  'writing-app'
];

const htmlFileMap = {
  'word-search': 'wordsearch.html',
  'image-addition': 'addition.html',
  'alphabet-train': 'alphabet train.html',
  'coloring': 'coloring.html',
  'math-worksheet': 'math worksheet.html',
  'word-scramble': 'word scramble.html',
  'find-and-count': 'find and count.html',
  'matching-app': 'matching.html',
  'drawing-lines': 'drawing lines.html',
  'picture-bingo': 'bingo.html',
  'sudoku': 'sudoku.html',
  'big-small-app': 'big small.html',
  'chart-count-color': 'chart count.html',
  'code-addition': 'code addition.html',
  'draw-and-color': 'draw and color.html',
  'find-objects': 'find objects.html',
  'grid-match': 'grid match.html',
  'image-crossword': 'crossword.html',
  'image-cryptogram': 'cryptogram.html',
  'math-puzzle': 'math puzzle.html',
  'missing-pieces': 'missing pieces.html',
  'more-less': 'more less.html',
  'odd-one-out': 'odd one out.html',
  'pattern-train': 'pattern train.html',
  'pattern-worksheet': 'pattern worksheet.html',
  'picture-path': 'picture path.html',
  'picture-sort': 'picture sort.html',
  'prepositions': 'prepositions.html',
  'shadow-match': 'shadow match.html',
  'story-dice': 'story dice.html',
  'subtraction': 'subtraction.html',
  'treasure-hunt': 'treasure hunt.html',
  'word-guess': 'word guess.html',
  'writing-app': 'writing.html'
};

async function testApp(appSlug) {
  const htmlFile = htmlFileMap[appSlug] || `${appSlug}.html`;
  const url = `http://localhost:3002/api/worksheet/${encodeURIComponent(htmlFile)}`;
  
  try {
    const response = await fetch(url);
    const status = response.status;
    const success = status === 200;
    
    return {
      app: appSlug,
      htmlFile,
      status,
      success
    };
  } catch (error) {
    return {
      app: appSlug,
      htmlFile,
      status: 'ERROR',
      success: false,
      error: error.message
    };
  }
}

async function testAllApps() {
  console.log('Testing all 33 worksheet generator apps...\n');
  
  const results = [];
  for (const app of apps) {
    const result = await testApp(app);
    results.push(result);
    
    if (result.success) {
      console.log(`✓ ${app}: ${result.htmlFile} - OK`);
    } else {
      console.log(`✗ ${app}: ${result.htmlFile} - FAILED (${result.status})`);
    }
  }
  
  console.log('\n=== Summary ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`Total: ${apps.length} apps`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed apps:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.app}: ${r.htmlFile} (${r.status})`);
    });
  }
}

testAllApps().catch(console.error);