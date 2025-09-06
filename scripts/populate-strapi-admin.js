const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'AdminPass123!';

// Complete app data for all 33 worksheet generators
const APPS_DATA = [
  { name: 'Word Search Generator', slug: 'word-search', componentName: 'word-search', requiredTier: 'free', category: 'Language Arts', description: 'Create custom word search puzzles with images. Perfect for vocabulary building and visual learning.', shortDescription: 'Create visual word search puzzles', features: ['Custom grid sizes 8x8 to 15x15', 'Multiple word directions', 'Image integration', 'Print-ready output', 'Answer key included'] },
  { name: 'Image Addition', slug: 'image-addition', componentName: 'image-addition', requiredTier: 'core', category: 'Math', description: 'Visual addition worksheets using images for counting. Ideal for early math learners.', shortDescription: 'Visual addition with images', features: ['Visual counting exercises', 'Custom number ranges', 'Image-based problems', 'Multiple difficulty levels'] },
  { name: 'Alphabet Train', slug: 'alphabet-train', componentName: 'alphabet-train', requiredTier: 'core', category: 'Language Arts', description: 'Learn alphabets with fun train themed activities. Great for letter recognition and sequencing.', shortDescription: 'Alphabet learning with trains', features: ['Letter recognition games', 'Alphabet sequencing', 'Visual learning', 'Upper and lowercase letters'] },
  { name: 'Coloring Page Designer', slug: 'coloring', componentName: 'coloring', requiredTier: 'core', category: 'Art & Creativity', description: 'Create custom coloring pages from our image library. Develops fine motor skills and creativity.', shortDescription: 'Custom coloring pages', features: ['Custom designs', 'Multiple themes', 'Print-ready format', 'Various difficulty levels'] },
  { name: 'Math Worksheet Generator', slug: 'math-worksheet', componentName: 'math-worksheet', requiredTier: 'core', category: 'Math', description: 'Generate comprehensive math worksheets for all operations. Customizable for different grade levels.', shortDescription: 'Complete math worksheet generator', features: ['Addition, subtraction, multiplication, division', 'Custom difficulty levels', 'Answer keys provided', 'Mixed operations option'] },
  { name: 'Word Scramble', slug: 'word-scramble', componentName: 'word-scramble', requiredTier: 'core', category: 'Language Arts', description: 'Create word scramble puzzles with visual hints. Enhances spelling and vocabulary skills.', shortDescription: 'Word scramble with images', features: ['Custom word lists', 'Difficulty levels', 'Visual hints with images', 'Solution keys'] },
  { name: 'Find and Count', slug: 'find-and-count', componentName: 'find-and-count', requiredTier: 'core', category: 'Visual Perception', description: 'Count objects in busy scenes. Develops counting skills and visual discrimination.', shortDescription: 'Visual counting activities', features: ['Visual counting exercises', 'Pattern recognition', 'Multiple themes', 'Progressive difficulty'] },
  { name: 'MatchUp Maker', slug: 'matching-app', componentName: 'matching-app', requiredTier: 'core', category: 'Matching', description: 'Create matching activities between images and words. Perfect for vocabulary development.', shortDescription: 'Image and word matching', features: ['Image to image matching', 'Word to image pairs', 'Custom content creation', 'Multiple layouts'] },
  { name: 'Drawing Lines', slug: 'drawing-lines', componentName: 'drawing-lines', requiredTier: 'core', category: 'Fine Motor Skills', description: 'Line drawing and tracing exercises. Develops pre-writing skills and hand control.', shortDescription: 'Line drawing practice', features: ['Motor skill development', 'Path following exercises', 'Connect the dots', 'Tracing patterns'] },
  { name: 'Picture Bingo', slug: 'picture-bingo', componentName: 'picture-bingo', requiredTier: 'core', category: 'Games', description: 'Create custom bingo cards with images. Fun group activity for learning.', shortDescription: 'Image-based bingo cards', features: ['Custom bingo cards', 'Multiple themes', 'Print multiple unique cards', 'Calling cards included'] },
  { name: 'Sudoku for Kids', slug: 'sudoku', componentName: 'sudoku', requiredTier: 'full', category: 'Logic', description: 'Generate kid-friendly sudoku puzzles with images. Develops logical thinking.', shortDescription: 'Image sudoku puzzles', features: ['4x4 and 6x6 grids', 'Image-based puzzles', 'Multiple difficulties', 'Solution included'] },
  { name: 'Big Small Comparison', slug: 'big-small-app', componentName: 'big-small-app', requiredTier: 'full', category: 'Comparison', description: 'Size comparison activities with visual objects. Teaches relative size concepts.', shortDescription: 'Size comparison activities', features: ['Size concept learning', 'Visual comparison', 'Multiple object sets', 'Progressive difficulty'] },
  { name: 'Chart Count and Color', slug: 'chart-count-color', componentName: 'chart-count-color', requiredTier: 'full', category: 'Math & Art', description: 'Counting and coloring charts combined. Integrates math with art activities.', shortDescription: 'Counting and coloring charts', features: ['Data visualization', 'Counting practice', 'Coloring activity', 'Graph creation'] },
  { name: 'Code Addition', slug: 'code-addition', componentName: 'code-addition', requiredTier: 'full', category: 'Math', description: 'Coded addition problems with secret messages. Makes math practice engaging.', shortDescription: 'Math with secret codes', features: ['Problem solving', 'Code breaking element', 'Math practice', 'Secret message reveal'] },
  { name: 'Draw and Color', slug: 'draw-and-color', componentName: 'draw-and-color', requiredTier: 'full', category: 'Art', description: 'Guided drawing and coloring activities. Develops artistic skills step by step.', shortDescription: 'Guided drawing activities', features: ['Step-by-step drawing', 'Following instructions', 'Creative expression', 'Art skill development'] },
  { name: 'Find Hidden Objects', slug: 'find-objects', componentName: 'find-objects', requiredTier: 'full', category: 'Visual Perception', description: 'Hidden object puzzles in detailed scenes. Enhances visual scanning abilities.', shortDescription: 'Hidden object puzzles', features: ['Visual scanning practice', 'Attention to detail', 'Multiple themed scenes', 'Object lists'] },
  { name: 'Grid Match', slug: 'grid-match', componentName: 'grid-match', requiredTier: 'full', category: 'Matching', description: 'Grid-based matching and memory games. Improves pattern recognition.', shortDescription: 'Grid matching games', features: ['Pattern matching', 'Memory skill development', 'Custom grid sizes', 'Progressive challenges'] },
  { name: 'Image Crossword', slug: 'image-crossword', componentName: 'image-crossword', requiredTier: 'full', category: 'Language Arts', description: 'Crossword puzzles with picture clues. Visual approach to word puzzles.', shortDescription: 'Crosswords with images', features: ['Visual clues', 'Custom word lists', 'Auto-generation', 'Difficulty settings'] },
  { name: 'Image Cryptogram', slug: 'image-cryptogram', componentName: 'image-cryptogram', requiredTier: 'full', category: 'Logic', description: 'Code-breaking puzzles with image hints. Develops logical thinking skills.', shortDescription: 'Image-based cryptograms', features: ['Logic puzzles', 'Code substitution', 'Visual hints', 'Progressive difficulty'] },
  { name: 'Math Puzzle Challenge', slug: 'math-puzzle', componentName: 'math-puzzle', requiredTier: 'full', category: 'Math', description: 'Mathematical puzzle activities and brain teasers. Advanced problem-solving practice.', shortDescription: 'Math puzzle challenges', features: ['Complex problem solving', 'Multiple operations', 'Visual math concepts', 'Challenge levels'] },
  { name: 'Missing Pieces', slug: 'missing-pieces', componentName: 'missing-pieces', requiredTier: 'full', category: 'Visual Perception', description: 'Complete the picture by finding missing parts. Develops visual completion skills.', shortDescription: 'Find missing pieces', features: ['Visual completion', 'Pattern recognition', 'Problem solving', 'Multiple themes'] },
  { name: 'More or Less', slug: 'more-less', componentName: 'more-less', requiredTier: 'full', category: 'Math', description: 'Number comparison activities with visual aids. Teaches greater than and less than concepts.', shortDescription: 'Number comparison', features: ['Number comparison', 'Visual representations', 'Progressive difficulty', 'Number sense development'] },
  { name: 'Odd One Out', slug: 'odd-one-out', componentName: 'odd-one-out', requiredTier: 'full', category: 'Logic', description: 'Find the item that doesn\'t belong. Develops categorization and logic skills.', shortDescription: 'Find the odd one', features: ['Logic skill building', 'Pattern recognition', 'Critical thinking', 'Multiple categories'] },
  { name: 'Pattern Train', slug: 'pattern-train', componentName: 'pattern-train', requiredTier: 'full', category: 'Patterns', description: 'Pattern sequence activities with train theme. Teaches pattern recognition and completion.', shortDescription: 'Pattern sequences', features: ['Pattern recognition', 'Sequence completion', 'Visual patterns', 'Increasing complexity'] },
  { name: 'Pattern Worksheet Maker', slug: 'pattern-worksheet', componentName: 'pattern-worksheet', requiredTier: 'full', category: 'Patterns', description: 'Create custom pattern worksheets. Flexible pattern creation tool.', shortDescription: 'Custom pattern worksheets', features: ['Custom pattern creation', 'Multiple pattern types', 'Difficulty levels', 'Answer keys'] },
  { name: 'Picture Pathway', slug: 'picture-path', componentName: 'picture-path', requiredTier: 'full', category: 'Logic', description: 'Follow the path puzzle activities. Develops planning and direction skills.', shortDescription: 'Path following puzzles', features: ['Path following', 'Direction skills', 'Problem solving', 'Maze variations'] },
  { name: 'Picture Sort', slug: 'picture-sort', componentName: 'picture-sort', requiredTier: 'full', category: 'Sorting', description: 'Sorting and categorization with images. Teaches classification concepts.', shortDescription: 'Image sorting activities', features: ['Classification skills', 'Category sorting', 'Visual organization', 'Multiple sort criteria'] },
  { name: 'Prepositions Practice', slug: 'prepositions', componentName: 'prepositions', requiredTier: 'full', category: 'Language Arts', description: 'Learn prepositions with visual examples. Spatial concept understanding.', shortDescription: 'Visual preposition learning', features: ['Spatial concepts', 'Visual learning', 'Grammar practice', 'Position words'] },
  { name: 'Shadow Match', slug: 'shadow-match', componentName: 'shadow-match', requiredTier: 'full', category: 'Matching', description: 'Match objects to their shadows. Develops shape recognition skills.', shortDescription: 'Shadow matching game', features: ['Visual matching', 'Shape recognition', 'Problem solving', 'Multiple themes'] },
  { name: 'Story Dice Creator', slug: 'story-dice', componentName: 'story-dice', requiredTier: 'full', category: 'Creative Writing', description: 'Story creation with randomized image dice. Sparks creative writing.', shortDescription: 'Story dice generator', features: ['Creative writing prompts', 'Storytelling practice', 'Random story elements', 'Printable dice'] },
  { name: 'Visual Subtraction', slug: 'subtraction', componentName: 'subtraction', requiredTier: 'full', category: 'Math', description: 'Subtraction worksheets with visual aids. Makes subtraction concrete and visual.', shortDescription: 'Visual subtraction', features: ['Visual math concepts', 'Custom number ranges', 'Image-based problems', 'Step-by-step solutions'] },
  { name: 'Treasure Hunt Maps', slug: 'treasure-hunt', componentName: 'treasure-hunt', requiredTier: 'full', category: 'Games', description: 'Create treasure hunt activities and maps. Adventure-based learning.', shortDescription: 'Treasure hunt creator', features: ['Adventure theme', 'Problem solving', 'Map reading skills', 'Clue creation'] },
  { name: 'Word Guess Game', slug: 'word-guess', componentName: 'word-guess', requiredTier: 'full', category: 'Language Arts', description: 'Word guessing games with picture hints. Vocabulary building through play.', shortDescription: 'Word guessing with images', features: ['Vocabulary building', 'Letter recognition', 'Word formation', 'Hint system'] },
  { name: 'Writing Practice Sheets', slug: 'writing-app', componentName: 'writing-app', requiredTier: 'full', category: 'Writing', description: 'Handwriting practice sheet generator. Develops proper letter formation.', shortDescription: 'Handwriting practice', features: ['Letter tracing', 'Word practice', 'Custom content', 'Guidelines included'] }
];

// Image themes
const IMAGE_THEMES = [
  { themeKey: 'alphabet', displayName: 'Alphabet', description: 'Letters and alphabet-related images', sortOrder: 1 },
  { themeKey: 'animals', displayName: 'Animals', description: 'Various animals from farm to wild', sortOrder: 2 },
  { themeKey: 'food', displayName: 'Food', description: 'Fruits, vegetables, and meals', sortOrder: 3 },
  { themeKey: 'general', displayName: 'General', description: 'Common everyday objects', sortOrder: 4 },
  { themeKey: 'icons', displayName: 'Icons', description: 'Simple icon illustrations', sortOrder: 5 },
  { themeKey: 'prepositions', displayName: 'Prepositions', description: 'Images showing spatial relationships', sortOrder: 6 },
  { themeKey: 'symbols', displayName: 'Symbols', description: 'Mathematical and other symbols', sortOrder: 7 },
  { themeKey: 'coloring', displayName: 'Coloring', description: 'Black and white images for coloring', sortOrder: 8 },
  { themeKey: 'backgrounds', displayName: 'Backgrounds', description: 'Background patterns and scenes', sortOrder: 9 },
  { themeKey: 'borders', displayName: 'Borders', description: 'Decorative borders and frames', sortOrder: 10 },
  { themeKey: 'template', displayName: 'Templates', description: 'Worksheet templates', sortOrder: 11 },
  { themeKey: 'drawing-lines', displayName: 'Drawing Lines', description: 'Line drawing exercises', sortOrder: 12 },
  { themeKey: 'alphabetsvg', displayName: 'Alphabet SVG', description: 'Vector alphabet images', sortOrder: 13 }
];

async function populateContent() {
  try {
    console.log('🚀 Starting Strapi content population...\n');
    console.log('📌 Important: Please complete the following steps:\n');
    console.log('1. Open Strapi Admin: http://localhost:1337/admin');
    console.log('2. Login with:');
    console.log('   Email: admin@lessoncraftstudio.com');
    console.log('   Password: AdminPass123!\n');
    console.log('3. Navigate to Content Manager\n');
    console.log('4. For each content type (App Info, Image Theme, Image Asset):');
    console.log('   - Click "Create new entry"');
    console.log('   - Use the data below to fill in the forms\n');
    
    console.log('=' .repeat(60));
    console.log('APP INFO ENTRIES (33 total)');
    console.log('=' .repeat(60));
    
    APPS_DATA.forEach((app, index) => {
      console.log(`\n${index + 1}. ${app.name}`);
      console.log('   Name:', app.name);
      console.log('   Slug:', app.slug);
      console.log('   Component Name:', app.componentName);
      console.log('   Required Tier:', app.requiredTier);
      console.log('   Category:', app.category);
      console.log('   Description:', app.description);
      console.log('   Short Description:', app.shortDescription);
      console.log('   Features:', JSON.stringify(app.features));
    });
    
    console.log('\n' + '=' .repeat(60));
    console.log('IMAGE THEME ENTRIES (13 total)');
    console.log('=' .repeat(60));
    
    IMAGE_THEMES.forEach((theme, index) => {
      console.log(`\n${index + 1}. ${theme.displayName}`);
      console.log('   Theme Key:', theme.themeKey);
      console.log('   Display Name:', theme.displayName);
      console.log('   Description:', theme.description);
      console.log('   Sort Order:', theme.sortOrder);
    });
    
    console.log('\n' + '=' .repeat(60));
    console.log('NEXT STEPS:');
    console.log('=' .repeat(60));
    console.log('\n1. After creating all entries, go to Settings > Users & Permissions > Roles > Public');
    console.log('2. Enable the following permissions:');
    console.log('   - App Info: find, findOne');
    console.log('   - Image Theme: find, findOne');
    console.log('   - Image Asset: find, findOne');
    console.log('\n3. Save the permissions');
    console.log('\n✅ Once complete, all worksheet generator content will be available in Strapi!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
populateContent();