const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = '2f796de5b60ca765429063d5dc01953dfd13fdbd8380ef22024d5d736a5d43e052fc880b7a66ead618f592589778ddc239d4338266b6970942064622d87d5967de00a411ec2db2f7d24103dc3f0b3c66d8b67f35b80e09964c3d8d2ced06737e64b0c4f6680fb3f7d4ae6cb9785effb2f3c75f4ddda1035570deaa494fa9339d';

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
  { name: 'Sudoku for Kids', slug: 'sudoku', componentName: 'sudoku', requiredTier: 'core', category: 'Logic', description: 'Generate kid-friendly sudoku puzzles with images. Develops logical thinking.', shortDescription: 'Image sudoku puzzles', features: ['4x4 and 6x6 grids', 'Image-based puzzles', 'Multiple difficulties', 'Solution included'] },
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

async function uploadContent() {
  try {
    console.log('🚀 Starting content upload to Strapi...\n');

    // Configure public permissions first
    console.log('🔓 Configuring public permissions...');
    await configurePublicPermissions();

    // Upload App Info entries
    console.log('\n📱 Uploading worksheet generator apps...');
    for (const app of APPS_DATA) {
      try {
        const response = await axios.post(
          `${STRAPI_URL}/api/app-infos`,
          {
            data: {
              name: app.name,
              slug: app.slug,
              componentName: app.componentName,
              description: app.description,
              shortDescription: app.shortDescription,
              requiredTier: app.requiredTier,
              category: app.category,
              features: app.features
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Uploaded: ${app.name}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
          console.log(`⚠️  ${app.name} already exists, skipping...`);
        } else {
          console.error(`❌ Failed to upload ${app.name}:`, error.response?.data || error.message);
        }
      }
    }

    // Upload Image Themes
    console.log('\n🎨 Uploading image themes...');
    for (const theme of IMAGE_THEMES) {
      try {
        const response = await axios.post(
          `${STRAPI_URL}/api/image-themes`,
          {
            data: {
              themeKey: theme.themeKey,
              displayName: theme.displayName,
              description: theme.description,
              sortOrder: theme.sortOrder
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Uploaded theme: ${theme.displayName}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
          console.log(`⚠️  Theme ${theme.displayName} already exists, skipping...`);
        } else {
          console.error(`❌ Failed to upload theme ${theme.displayName}:`, error.response?.data || error.message);
        }
      }
    }

    // Upload sample images for each theme
    console.log('\n🖼️  Uploading sample images...');
    await uploadSampleImages();

    console.log('\n✨ Content upload complete!');
    console.log('Visit http://localhost:1337/admin to view the content in Strapi Content Manager');

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

async function configurePublicPermissions() {
  try {
    // Get the public role
    const rolesResponse = await axios.get(
      `${STRAPI_URL}/api/users-permissions/roles`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    );

    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
    if (!publicRole) {
      console.log('⚠️  Public role not found');
      return;
    }

    // Configure permissions for public access
    const permissions = {
      'api::app-info': ['find', 'findOne'],
      'api::image-theme': ['find', 'findOne'],
      'api::image-asset': ['find', 'findOne']
    };

    for (const [controller, actions] of Object.entries(permissions)) {
      for (const action of actions) {
        try {
          await axios.put(
            `${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`,
            {
              permissions: {
                [controller]: {
                  [action]: {
                    enabled: true
                  }
                }
              }
            },
            {
              headers: {
                'Authorization': `Bearer ${API_TOKEN}`
              }
            }
          );
        } catch (error) {
          // Permissions API might work differently, continue anyway
        }
      }
    }
    console.log('✅ Public permissions configured');
  } catch (error) {
    console.log('⚠️  Could not configure permissions automatically. Please set them manually in Strapi admin.');
  }
}

async function uploadSampleImages() {
  const worksheetGeneratorsPath = path.join(__dirname, '..', 'worksheet generators', 'images');
  
  // Upload a few sample images from each theme
  const sampleThemes = ['animals', 'food', 'alphabet'];
  
  for (const themeName of sampleThemes) {
    const themePath = path.join(worksheetGeneratorsPath, themeName);
    
    if (!fs.existsSync(themePath)) {
      console.log(`⚠️  Theme folder ${themeName} not found`);
      continue;
    }

    const files = fs.readdirSync(themePath)
      .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file))
      .slice(0, 3); // Take first 3 images as samples

    for (const file of files) {
      try {
        const filePath = path.join(themePath, file);
        const form = new FormData();
        form.append('files', fs.createReadStream(filePath), file);

        // Upload file to Strapi
        const uploadResponse = await axios.post(
          `${STRAPI_URL}/api/upload`,
          form,
          {
            headers: {
              ...form.getHeaders(),
              'Authorization': `Bearer ${API_TOKEN}`
            }
          }
        );

        const uploadedFile = uploadResponse.data[0];

        // Create Image Asset entry
        const baseName = path.basename(file, path.extname(file));
        await axios.post(
          `${STRAPI_URL}/api/image-assets`,
          {
            data: {
              fileKey: `${themeName}_${baseName}`.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
              displayName: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              file: uploadedFile.id,
              isPremium: false
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(`✅ Uploaded image: ${themeName}/${file}`);
      } catch (error) {
        console.log(`⚠️  Failed to upload ${themeName}/${file}: ${error.message}`);
      }
    }
  }
}

// Run the upload
uploadContent();