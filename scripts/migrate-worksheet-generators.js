const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Map HTML filenames to proper app data
const APPS_DATA = {
  'wordsearch.html': {
    name: 'Word Search Generator',
    slug: 'word-search',
    componentName: 'word-search',
    tier: 'free',
    category: 'Language Arts',
    description: 'Create custom word search puzzles with images',
    features: ['Custom grid sizes', 'Multiple directions', 'Image integration', 'Print-ready output']
  },
  'addition.html': {
    name: 'Image Addition',
    slug: 'image-addition',
    componentName: 'image-addition',
    tier: 'core',
    category: 'Math',
    description: 'Visual addition worksheets with images',
    features: ['Visual learning', 'Custom number ranges', 'Image-based problems']
  },
  'alphabet train.html': {
    name: 'Alphabet Train',
    slug: 'alphabet-train',
    componentName: 'alphabet-train',
    tier: 'core',
    category: 'Language Arts',
    description: 'Learn alphabets with fun train themed activities',
    features: ['Letter recognition', 'Sequencing', 'Visual learning']
  },
  'coloring.html': {
    name: 'Coloring Page Designer',
    slug: 'coloring',
    componentName: 'coloring',
    tier: 'core',
    category: 'Art & Creativity',
    description: 'Create custom coloring pages',
    features: ['Custom designs', 'Multiple themes', 'Print-ready']
  },
  'math worksheet.html': {
    name: 'Math Worksheet Generator',
    slug: 'math-worksheet',
    componentName: 'math-worksheet',
    tier: 'core',
    category: 'Math',
    description: 'Generate comprehensive math worksheets',
    features: ['Multiple operations', 'Custom difficulty', 'Answer keys']
  },
  'word scramble.html': {
    name: 'Word Scramble',
    slug: 'word-scramble',
    componentName: 'word-scramble',
    tier: 'core',
    category: 'Language Arts',
    description: 'Create word scramble puzzles',
    features: ['Custom word lists', 'Difficulty levels', 'Hints option']
  },
  'find and count.html': {
    name: 'Find and Count',
    slug: 'find-and-count',
    componentName: 'find-and-count',
    tier: 'core',
    category: 'Visual Perception',
    description: 'Count objects in images',
    features: ['Visual counting', 'Pattern recognition', 'Multiple themes']
  },
  'matching.html': {
    name: 'MatchUp Maker',
    slug: 'matching-app',
    componentName: 'matching-app',
    tier: 'core',
    category: 'Matching',
    description: 'Create matching activities',
    features: ['Image matching', 'Word-image pairs', 'Custom content']
  },
  'drawing lines.html': {
    name: 'Drawing Lines',
    slug: 'drawing-lines',
    componentName: 'drawing-lines',
    tier: 'core',
    category: 'Fine Motor Skills',
    description: 'Line drawing exercises',
    features: ['Motor skill development', 'Path following', 'Connect the dots']
  },
  'bingo.html': {
    name: 'Picture Bingo',
    slug: 'picture-bingo',
    componentName: 'picture-bingo',
    tier: 'core',
    category: 'Games',
    description: 'Create custom bingo cards with images',
    features: ['Custom cards', 'Multiple themes', 'Print multiple cards']
  },
  'sudoku.html': {
    name: 'Sudoku',
    slug: 'sudoku',
    componentName: 'sudoku',
    tier: 'core',
    category: 'Logic',
    description: 'Generate sudoku puzzles',
    features: ['Multiple difficulties', 'Solution included', 'Kid-friendly themes']
  },
  'big small.html': {
    name: 'Big Small App',
    slug: 'big-small-app',
    componentName: 'big-small-app',
    tier: 'full',
    category: 'Comparison',
    description: 'Size comparison activities',
    features: ['Size concepts', 'Visual comparison', 'Multiple objects']
  },
  'chart count.html': {
    name: 'Chart Count and Color',
    slug: 'chart-count-color',
    componentName: 'chart-count-color',
    tier: 'full',
    category: 'Math & Art',
    description: 'Counting and coloring charts',
    features: ['Data visualization', 'Counting practice', 'Coloring activity']
  },
  'code addition.html': {
    name: 'Code Addition',
    slug: 'code-addition',
    componentName: 'code-addition',
    tier: 'full',
    category: 'Math',
    description: 'Coded addition problems',
    features: ['Problem solving', 'Code breaking', 'Math practice']
  },
  'draw and color.html': {
    name: 'Draw and Color',
    slug: 'draw-and-color',
    componentName: 'draw-and-color',
    tier: 'full',
    category: 'Art',
    description: 'Drawing and coloring activities',
    features: ['Creative expression', 'Following instructions', 'Art skills']
  },
  'find objects.html': {
    name: 'Find Objects',
    slug: 'find-objects',
    componentName: 'find-objects',
    tier: 'full',
    category: 'Visual Perception',
    description: 'Hidden object activities',
    features: ['Visual scanning', 'Attention to detail', 'Multiple themes']
  },
  'grid match.html': {
    name: 'Grid Match',
    slug: 'grid-match',
    componentName: 'grid-match',
    tier: 'full',
    category: 'Matching',
    description: 'Grid-based matching games',
    features: ['Pattern matching', 'Memory skills', 'Custom grids']
  },
  'crossword.html': {
    name: 'Image Crossword Generator',
    slug: 'image-crossword',
    componentName: 'image-crossword',
    tier: 'full',
    category: 'Language Arts',
    description: 'Create crossword puzzles with image clues',
    features: ['Visual clues', 'Custom words', 'Auto-generation']
  },
  'cryptogram.html': {
    name: 'Image Cryptogram',
    slug: 'image-cryptogram',
    componentName: 'image-cryptogram',
    tier: 'full',
    category: 'Logic',
    description: 'Code-breaking puzzles with images',
    features: ['Logic puzzles', 'Code substitution', 'Visual hints']
  },
  'math puzzle.html': {
    name: 'Math Puzzle',
    slug: 'math-puzzle',
    componentName: 'math-puzzle',
    tier: 'full',
    category: 'Math',
    description: 'Mathematical puzzle activities',
    features: ['Problem solving', 'Multiple operations', 'Visual math']
  },
  'missing pieces.html': {
    name: 'Missing Pieces',
    slug: 'missing-pieces',
    componentName: 'missing-pieces',
    tier: 'full',
    category: 'Visual Perception',
    description: 'Complete the picture puzzles',
    features: ['Visual completion', 'Pattern recognition', 'Problem solving']
  },
  'more less.html': {
    name: 'Compare Numbers (More Less)',
    slug: 'more-less',
    componentName: 'more-less',
    tier: 'full',
    category: 'Math',
    description: 'Number comparison activities',
    features: ['Greater than/less than', 'Visual comparison', 'Number sense']
  },
  'odd one out.html': {
    name: 'Odd One Out',
    slug: 'odd-one-out',
    componentName: 'odd-one-out',
    tier: 'full',
    category: 'Logic',
    description: 'Find the different item',
    features: ['Logic skills', 'Pattern recognition', 'Critical thinking']
  },
  'pattern train.html': {
    name: 'Pattern Train',
    slug: 'pattern-train',
    componentName: 'pattern-train',
    tier: 'full',
    category: 'Patterns',
    description: 'Pattern sequence activities',
    features: ['Pattern recognition', 'Sequence completion', 'Visual patterns']
  },
  'pattern worksheet.html': {
    name: 'Pattern Worksheet Generator',
    slug: 'pattern-worksheet',
    componentName: 'pattern-worksheet',
    tier: 'full',
    category: 'Patterns',
    description: 'Create pattern worksheets',
    features: ['Custom patterns', 'Multiple types', 'Difficulty levels']
  },
  'picture path.html': {
    name: 'Picture Pathway',
    slug: 'picture-path',
    componentName: 'picture-path',
    tier: 'full',
    category: 'Logic',
    description: 'Follow the path activities',
    features: ['Path following', 'Direction skills', 'Problem solving']
  },
  'picture sort.html': {
    name: 'Picture Sort',
    slug: 'picture-sort',
    componentName: 'picture-sort',
    tier: 'full',
    category: 'Sorting',
    description: 'Sorting and categorization',
    features: ['Classification', 'Category sorting', 'Visual organization']
  },
  'prepositions.html': {
    name: 'Prepositions',
    slug: 'prepositions',
    componentName: 'prepositions',
    tier: 'full',
    category: 'Language Arts',
    description: 'Learn prepositions with images',
    features: ['Spatial concepts', 'Visual learning', 'Grammar practice']
  },
  'shadow match.html': {
    name: 'Shadow Match',
    slug: 'shadow-match',
    componentName: 'shadow-match',
    tier: 'full',
    category: 'Matching',
    description: 'Match objects to shadows',
    features: ['Visual matching', 'Shape recognition', 'Problem solving']
  },
  'story dice.html': {
    name: 'Story Dice',
    slug: 'story-dice',
    componentName: 'story-dice',
    tier: 'full',
    category: 'Creative Writing',
    description: 'Story creation with dice',
    features: ['Creative writing', 'Storytelling', 'Random prompts']
  },
  'subtraction.html': {
    name: 'Subtraction',
    slug: 'subtraction',
    componentName: 'subtraction',
    tier: 'full',
    category: 'Math',
    description: 'Visual subtraction worksheets',
    features: ['Visual math', 'Custom ranges', 'Image-based problems']
  },
  'treasure hunt.html': {
    name: 'Treasure Hunt',
    slug: 'treasure-hunt',
    componentName: 'treasure-hunt',
    tier: 'full',
    category: 'Games',
    description: 'Create treasure hunt activities',
    features: ['Adventure theme', 'Problem solving', 'Map reading']
  },
  'word guess.html': {
    name: 'Word Guess',
    slug: 'word-guess',
    componentName: 'word-guess',
    tier: 'full',
    category: 'Language Arts',
    description: 'Word guessing games',
    features: ['Vocabulary building', 'Letter recognition', 'Word formation']
  },
  'writing.html': {
    name: 'Writing App',
    slug: 'writing-app',
    componentName: 'writing-app',
    tier: 'full',
    category: 'Writing',
    description: 'Handwriting practice sheets',
    features: ['Letter tracing', 'Word practice', 'Custom content']
  }
};

// Image themes structure
const IMAGE_THEMES = [
  'alphabet', 'alphabetsvg', 'animals', 'backgrounds', 'borders',
  'coloring', 'drawing lines', 'food', 'general', 'icons',
  'prepositions', 'symbols', 'template'
];

async function createAdminUser() {
  console.log('\n📝 Creating Strapi admin user...');
  
  try {
    // First check if admin already exists
    const checkResponse = await fetch(`${STRAPI_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    });
    
    if (checkResponse.ok) {
      console.log('✅ Admin already exists');
      return;
    }
    
    // Create admin user
    const adminData = {
      email: 'admin@lessoncraftstudio.com',
      password: 'Admin123!',
      firstname: 'Admin',
      lastname: 'User',
      isActive: true
    };
    
    const response = await fetch(`${STRAPI_URL}/admin/register-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });
    
    if (response.ok) {
      console.log('✅ Admin user created successfully');
      console.log('   Email: admin@lessoncraftstudio.com');
      console.log('   Password: Admin123!');
    } else {
      console.log('ℹ️ Admin user might already exist');
    }
  } catch (error) {
    console.log('ℹ️ Admin setup will be done manually');
  }
}

async function getAuthToken() {
  if (STRAPI_TOKEN) {
    return STRAPI_TOKEN;
  }
  
  // Try to authenticate as admin
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@lessoncraftstudio.com',
        password: 'Admin123!'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data.token;
    }
  } catch (error) {
    console.log('Could not authenticate, will proceed without token');
  }
  
  return null;
}

async function createContentTypes() {
  console.log('\n🔧 Creating content types in Strapi...');
  
  // Note: Content types should be created through Strapi admin UI or through API
  // For now, we'll document what needs to be created
  
  console.log('Please create the following content types in Strapi admin:');
  console.log('\n1. App Info (app-info):');
  console.log('   - name (Text, required)');
  console.log('   - slug (UID based on name)');
  console.log('   - componentName (Text, required)');
  console.log('   - description (Rich text)');
  console.log('   - shortDescription (Text, max 200)');
  console.log('   - requiredTier (Enumeration: free, core, full)');
  console.log('   - category (Text)');
  console.log('   - features (JSON)');
  console.log('   - Enable i18n plugin for this content type');
  
  console.log('\n2. Image Theme (image-theme):');
  console.log('   - themeKey (Text, required, unique)');
  console.log('   - displayName (Text, required)');
  console.log('   - description (Text)');
  console.log('   - sortOrder (Number)');
  console.log('   - Enable i18n plugin for this content type');
  
  console.log('\n3. Image Asset (image-asset):');
  console.log('   - fileKey (Text, required, unique)');
  console.log('   - displayName (Text, required)');
  console.log('   - file (Media, single file)');
  console.log('   - themes (Relation to Image Theme, many-to-many)');
  console.log('   - isPremium (Boolean)');
  console.log('   - Enable i18n plugin for this content type');
}

async function uploadAppsData() {
  console.log('\n📱 Uploading worksheet generator apps data...');
  
  const token = await getAuthToken();
  const headers = token ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  } : {
    'Content-Type': 'application/json'
  };
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [filename, appData] of Object.entries(APPS_DATA)) {
    try {
      console.log(`  Uploading: ${appData.name}...`);
      
      const response = await fetch(`${STRAPI_URL}/api/app-infos`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data: {
            name: appData.name,
            slug: appData.slug,
            componentName: appData.componentName,
            description: appData.description,
            shortDescription: appData.description,
            requiredTier: appData.tier,
            category: appData.category,
            features: appData.features,
            locale: 'en'
          }
        })
      });
      
      if (response.ok) {
        successCount++;
        console.log(`    ✅ ${appData.name} uploaded`);
      } else {
        errorCount++;
        const error = await response.text();
        console.log(`    ❌ Failed: ${error.substring(0, 100)}`);
      }
    } catch (error) {
      errorCount++;
      console.log(`    ❌ Error uploading ${appData.name}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Apps uploaded: ${successCount}/33`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  }
}

async function uploadImageThemes() {
  console.log('\n🎨 Uploading image themes...');
  
  const token = await getAuthToken();
  const headers = token ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  } : {
    'Content-Type': 'application/json'
  };
  
  let successCount = 0;
  
  for (const theme of IMAGE_THEMES) {
    try {
      console.log(`  Uploading theme: ${theme}...`);
      
      const response = await fetch(`${STRAPI_URL}/api/image-themes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data: {
            themeKey: theme.toLowerCase().replace(/\s+/g, '-'),
            displayName: theme.charAt(0).toUpperCase() + theme.slice(1),
            description: `Images for ${theme} theme`,
            sortOrder: IMAGE_THEMES.indexOf(theme),
            locale: 'en'
          }
        })
      });
      
      if (response.ok) {
        successCount++;
        console.log(`    ✅ Theme "${theme}" uploaded`);
      } else {
        const error = await response.text();
        console.log(`    ℹ️ Theme might already exist or content type not created`);
      }
    } catch (error) {
      console.log(`    ❌ Error uploading theme ${theme}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Themes processed: ${successCount}/${IMAGE_THEMES.length}`);
}

async function uploadImageAssets() {
  console.log('\n🖼️ Uploading image assets...');
  
  const token = await getAuthToken();
  const imagesPath = path.join(process.cwd(), 'worksheet generators', 'images');
  
  let totalImages = 0;
  let uploadedImages = 0;
  
  for (const theme of IMAGE_THEMES) {
    const themePath = path.join(imagesPath, theme);
    
    try {
      const files = await fs.readdir(themePath);
      const imageFiles = files.filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));
      
      console.log(`\n  Processing ${theme} theme (${imageFiles.length} images)...`);
      
      for (const imageFile of imageFiles.slice(0, 5)) { // Upload first 5 images per theme for demo
        totalImages++;
        
        try {
          // First upload the file
          const formData = new FormData();
          const fileBuffer = await fs.readFile(path.join(themePath, imageFile));
          formData.append('files', fileBuffer, imageFile);
          
          const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
            method: 'POST',
            headers: token ? {
              'Authorization': `Bearer ${token}`
            } : {},
            body: formData
          });
          
          if (uploadResponse.ok) {
            const [uploadedFile] = await uploadResponse.json();
            
            // Create image asset entry
            const assetResponse = await fetch(`${STRAPI_URL}/api/image-assets`, {
              method: 'POST',
              headers: token ? {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              } : {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data: {
                  fileKey: `${theme}_${path.basename(imageFile, path.extname(imageFile))}`,
                  displayName: path.basename(imageFile, path.extname(imageFile))
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase()),
                  file: uploadedFile.id,
                  isPremium: false,
                  locale: 'en'
                }
              })
            });
            
            if (assetResponse.ok) {
              uploadedImages++;
              console.log(`      ✅ ${imageFile} uploaded`);
            }
          }
        } catch (error) {
          console.log(`      ❌ Failed to upload ${imageFile}`);
        }
      }
    } catch (error) {
      console.log(`    ⚠️ Could not process theme ${theme}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Images uploaded: ${uploadedImages}/${totalImages}`);
}

async function createTestData() {
  console.log('\n🧪 Creating test data...');
  
  const token = await getAuthToken();
  const headers = token ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  } : {
    'Content-Type': 'application/json'
  };
  
  // Create a test page
  try {
    const pageResponse = await fetch(`${STRAPI_URL}/api/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          title: 'Homepage',
          slug: 'homepage',
          locale: 'en',
          blocks: []
        }
      })
    });
    
    if (pageResponse.ok) {
      console.log('✅ Test homepage created');
    }
  } catch (error) {
    console.log('ℹ️ Test page creation skipped');
  }
}

async function main() {
  console.log('🚀 Starting LessonCraftStudio Content Migration');
  console.log('================================================\n');
  
  // Step 1: Create admin user
  await createAdminUser();
  
  // Step 2: Create content types (manual step)
  await createContentTypes();
  
  console.log('\n⚠️ IMPORTANT: Please create the content types in Strapi admin first!');
  console.log('Visit: http://localhost:1337/admin');
  console.log('\nPress Enter to continue after creating content types...');
  
  // For automated setup, we'll continue
  console.log('\nContinuing with data upload...');
  
  // Step 3: Upload apps data
  await uploadAppsData();
  
  // Step 4: Upload image themes
  await uploadImageThemes();
  
  // Step 5: Upload sample image assets
  await uploadImageAssets();
  
  // Step 6: Create test data
  await createTestData();
  
  console.log('\n================================================');
  console.log('✅ Migration process completed!');
  console.log('\nNext steps:');
  console.log('1. Visit http://localhost:1337/admin to manage content');
  console.log('2. Create content types if not already done');
  console.log('3. Configure permissions for API access');
  console.log('4. Add more content through the admin panel');
}

// Run migration
main().catch(console.error);