const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';
const APPS_SOURCE_DIR = 'C:/Users/rkgen/Pictures/FINAL APPS READY TO UPLOAD';

// Map of all 33 apps with their details
const APPS_CONFIG = [
  { folder: 'word-search-with-images', appId: 'word-search', name: 'Word Search Generator', tier: 'free', category: 'Games', icon: '🔍', componentName: 'lcs-word-search', sourceFile: 'wordsearch.html' },
  { folder: 'addition', appId: 'image-addition', name: 'Image Addition', tier: 'core', category: 'Math', icon: '➕', componentName: 'lcs-image-addition', sourceFile: 'addition.html' },
  { folder: 'alphabet train', appId: 'alphabet-train', name: 'Alphabet Train', tier: 'core', category: 'Language Arts', icon: '🚂', componentName: 'lcs-alphabet-train', sourceFile: 'alphabet train.html' },
  { folder: 'coloring', appId: 'coloring', name: 'Coloring Page Designer', tier: 'core', category: 'Art & Creativity', icon: '🎨', componentName: 'lcs-coloring', sourceFile: 'coloring.html' },
  { folder: 'math worksheet generator', appId: 'math-worksheet', name: 'Math Worksheet Generator', tier: 'core', category: 'Math', icon: '📐', componentName: 'lcs-math-worksheet', sourceFile: 'math worksheet.html' },
  { folder: 'word scramble', appId: 'word-scramble', name: 'Word Scramble', tier: 'core', category: 'Language Arts', icon: '🔤', componentName: 'lcs-word-scramble', sourceFile: 'word scramble.html' },
  { folder: 'find and count', appId: 'find-and-count', name: 'Find and Count', tier: 'core', category: 'Visual Perception', icon: '🔢', componentName: 'lcs-find-and-count', sourceFile: 'find and count.html' },
  { folder: 'Matching App', appId: 'matching-app', name: 'MatchUp Maker', tier: 'core', category: 'Matching', icon: '🎯', componentName: 'lcs-matching-app', sourceFile: 'matching.html' },
  { folder: 'drawing lines', appId: 'drawing-lines', name: 'Drawing Lines', tier: 'core', category: 'Fine Motor Skills', icon: '✏️', componentName: 'lcs-drawing-lines', sourceFile: 'drawing lines.html' },
  { folder: 'Picture Bingo Match', appId: 'picture-bingo', name: 'Picture Bingo', tier: 'core', category: 'Games', icon: '🎲', componentName: 'lcs-picture-bingo', sourceFile: 'bingo.html' },
  { folder: 'sudoku', appId: 'sudoku', name: 'Sudoku for Kids', tier: 'core', category: 'Logic', icon: '🔢', componentName: 'lcs-sudoku', sourceFile: 'sudoku.html' },
  { folder: 'Big Small App', appId: 'big-small', name: 'Big Small Comparison', tier: 'full', category: 'Visual Perception', icon: '📏', componentName: 'lcs-big-small', sourceFile: 'big small.html' },
  { folder: 'chart count and color', appId: 'chart-count-color', name: 'Chart Count and Color', tier: 'full', category: 'Math', icon: '📊', componentName: 'lcs-chart-count-color', sourceFile: 'chart count.html' },
  { folder: 'code addition', appId: 'code-addition', name: 'Code Addition', tier: 'full', category: 'Math', icon: '🔐', componentName: 'lcs-code-addition', sourceFile: 'code addition.html' },
  { folder: 'draw and color', appId: 'draw-and-color', name: 'Draw and Color', tier: 'full', category: 'Art & Creativity', icon: '🖍️', componentName: 'lcs-draw-and-color', sourceFile: 'draw and color.html' },
  { folder: 'find objects', appId: 'find-objects', name: 'Find Objects', tier: 'full', category: 'Visual Perception', icon: '🔎', componentName: 'lcs-find-objects', sourceFile: 'find objects.html' },
  { folder: 'grid match', appId: 'grid-match', name: 'Grid Match', tier: 'full', category: 'Matching', icon: '⚡', componentName: 'lcs-grid-match', sourceFile: 'grid match.html' },
  { folder: 'image crossword generator', appId: 'image-crossword', name: 'Image Crossword Generator', tier: 'full', category: 'Games', icon: '✏️', componentName: 'lcs-image-crossword', sourceFile: 'crossword.html' },
  { folder: 'image cryptogram', appId: 'image-cryptogram', name: 'Image Cryptogram', tier: 'full', category: 'Logic', icon: '🔒', componentName: 'lcs-image-cryptogram', sourceFile: 'cryptogram.html' },
  { folder: 'math puzzle', appId: 'math-puzzle', name: 'Math Puzzle', tier: 'full', category: 'Math', icon: '🧩', componentName: 'lcs-math-puzzle', sourceFile: 'math puzzle.html' },
  { folder: 'missing pieces', appId: 'missing-pieces', name: 'Missing Pieces', tier: 'full', category: 'Visual Perception', icon: '🧩', componentName: 'lcs-missing-pieces', sourceFile: 'missing pieces.html' },
  { folder: 'more less', appId: 'more-less', name: 'Compare Numbers (More/Less)', tier: 'full', category: 'Math', icon: '⚖️', componentName: 'lcs-more-less', sourceFile: 'more less.html' },
  { folder: 'Odd One Out', appId: 'odd-one-out', name: 'Odd One Out', tier: 'full', category: 'Logic', icon: '🎯', componentName: 'lcs-odd-one-out', sourceFile: 'odd one out.html' },
  { folder: 'pattern train', appId: 'pattern-train', name: 'Pattern Train', tier: 'full', category: 'Logic', icon: '🚂', componentName: 'lcs-pattern-train', sourceFile: 'pattern train.html' },
  { folder: 'pattern worksheet generator', appId: 'pattern-worksheet', name: 'Pattern Worksheet Generator', tier: 'full', category: 'Logic', icon: '🔄', componentName: 'lcs-pattern-worksheet', sourceFile: 'pattern worksheet.html' },
  { folder: 'picture path', appId: 'picture-pathway', name: 'Picture Pathway', tier: 'full', category: 'Visual Perception', icon: '🛤️', componentName: 'lcs-picture-pathway', sourceFile: 'picture path.html' },
  { folder: 'Picture Sort App', appId: 'picture-sort', name: 'Picture Sort', tier: 'full', category: 'Visual Perception', icon: '📦', componentName: 'lcs-picture-sort', sourceFile: 'picture sort.html' },
  { folder: 'prepositions', appId: 'prepositions', name: 'Prepositions Practice', tier: 'full', category: 'Language Arts', icon: '📍', componentName: 'lcs-prepositions', sourceFile: 'prepositions.html' },
  { folder: 'shadow match', appId: 'shadow-match', name: 'Shadow Match', tier: 'full', category: 'Matching', icon: '👤', componentName: 'lcs-shadow-match', sourceFile: 'shadow match.html' },
  { folder: 'story dice', appId: 'story-dice', name: 'Story Dice', tier: 'full', category: 'Language Arts', icon: '🎲', componentName: 'lcs-story-dice', sourceFile: 'story dice.html' },
  { folder: 'subtraction', appId: 'subtraction', name: 'Subtraction Practice', tier: 'full', category: 'Math', icon: '➖', componentName: 'lcs-subtraction', sourceFile: 'subtraction.html' },
  { folder: 'treasure hunt', appId: 'treasure-hunt', name: 'Treasure Hunt', tier: 'full', category: 'Games', icon: '🏴‍☠️', componentName: 'lcs-treasure-hunt', sourceFile: 'treasure hunt.html' },
  { folder: 'word guess', appId: 'word-guess', name: 'Word Guess', tier: 'full', category: 'Language Arts', icon: '❓', componentName: 'lcs-word-guess', sourceFile: 'word guess.html' },
  { folder: 'Writing App', appId: 'writing-app', name: 'Writing Practice', tier: 'full', category: 'Fine Motor Skills', icon: '✍️', componentName: 'lcs-writing-app', sourceFile: 'writing.html' }
];

async function migrateApps() {
  console.log('🚀 Starting Worksheet Apps Migration...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const app of APPS_CONFIG) {
    try {
      console.log(`📱 Migrating: ${app.name}`);
      
      // Check if HTML file exists
      const htmlPath = path.join(APPS_SOURCE_DIR, app.folder, 'public', app.sourceFile);
      const htmlExists = await fs.access(htmlPath).then(() => true).catch(() => false);
      
      if (!htmlExists) {
        console.log(`  ⚠️ Warning: HTML file not found at ${htmlPath}`);
      }

      // Prepare app data
      const appData = {
        data: {
          appId: app.appId,
          name: app.name,
          description: `${app.name} - Professional worksheet generator for educational materials`,
          icon: app.icon,
          category: app.category,
          tier: app.tier,
          componentName: app.componentName,
          sourceFile: app.sourceFile,
          features: {
            printable: true,
            customizable: true,
            multiLanguage: true,
            exportPDF: true
          },
          instructions: `Use this app to create ${app.name.toLowerCase()} worksheets for your classroom or educational materials.`,
          isActive: true,
          sortOrder: APPS_CONFIG.indexOf(app)
        }
      };

      // Create the app entry in Strapi
      const response = await fetch(`${STRAPI_URL}/api/worksheet-apps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : ''
        },
        body: JSON.stringify(appData)
      });

      if (response.ok) {
        console.log(`  ✅ Successfully migrated: ${app.name}`);
        successCount++;
      } else {
        const error = await response.text();
        console.log(`  ❌ Failed to migrate: ${app.name}`);
        console.log(`     Error: ${error}`);
        failCount++;
      }

    } catch (error) {
      console.log(`  ❌ Error migrating ${app.name}: ${error.message}`);
      failCount++;
    }
  }

  console.log('\n========================================');
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Successfully migrated: ${successCount} apps`);
  console.log(`   ❌ Failed: ${failCount} apps`);
  console.log(`   📱 Total apps: ${APPS_CONFIG.length}`);
  console.log('========================================\n');
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateApps().catch(console.error);
}

module.exports = { migrateApps, APPS_CONFIG };