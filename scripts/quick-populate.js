const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = 'http://localhost:1337';

// Sample data to populate
const SAMPLE_THEMES = [
  { themeKey: 'animals', displayName: 'Animals', description: 'Animal themes for worksheets' },
  { themeKey: 'food', displayName: 'Food', description: 'Food and nutrition themes' },
  { themeKey: 'alphabet', displayName: 'Alphabet', description: 'Letters and alphabet themes' },
  { themeKey: 'backgrounds', displayName: 'Backgrounds', description: 'Background designs for worksheets' },
  { themeKey: 'borders', displayName: 'Borders', description: 'Border designs for worksheets' }
];

const SAMPLE_APPS = [
  { 
    appId: 'word-search', 
    name: 'Word Search Generator', 
    description: 'Create custom word search puzzles with images',
    icon: '🔍', 
    category: 'Games', 
    tier: 'free',
    componentName: 'lcs-word-search',
    sourceFile: 'wordsearch.html',
    isActive: true,
    sortOrder: 0
  },
  { 
    appId: 'alphabet-train', 
    name: 'Alphabet Train', 
    description: 'Fun alphabet learning with train theme',
    icon: '🚂', 
    category: 'Language Arts', 
    tier: 'core',
    componentName: 'lcs-alphabet-train',
    sourceFile: 'alphabet train.html',
    isActive: true,
    sortOrder: 1
  },
  { 
    appId: 'coloring', 
    name: 'Coloring Page Designer', 
    description: 'Create custom coloring pages',
    icon: '🎨', 
    category: 'Art & Creativity', 
    tier: 'core',
    componentName: 'lcs-coloring',
    sourceFile: 'coloring.html',
    isActive: true,
    sortOrder: 2
  }
];

async function createTheme(theme) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/image-themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: theme })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Created theme: ${theme.displayName}`);
      return result.data;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to create theme ${theme.displayName}: ${error}`);
    }
  } catch (error) {
    console.log(`❌ Error creating theme ${theme.displayName}: ${error.message}`);
  }
}

async function createApp(app) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/worksheet-apps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        data: {
          ...app,
          features: {
            printable: true,
            customizable: true,
            multiLanguage: true
          },
          instructions: `Use this app to create ${app.name.toLowerCase()} worksheets.`
        }
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Created app: ${app.name}`);
      return result.data;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to create app ${app.name}: ${error}`);
    }
  } catch (error) {
    console.log(`❌ Error creating app ${app.name}: ${error.message}`);
  }
}

async function createSampleImageAsset(name, themeId, assetType = 'regular') {
  try {
    // For demo, we'll create a simple placeholder image asset
    const response = await fetch(`${STRAPI_URL}/api/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        data: {
          fileKey: `sample_${name.toLowerCase().replace(/\s+/g, '_')}`,
          displayName: name,
          assetType: assetType,
          themes: themeId ? [themeId] : [],
          isPremium: false,
          metadata: { sample: true }
        }
      })
    });
    
    if (response.ok) {
      console.log(`  ✅ Created sample image: ${name}`);
      return true;
    } else {
      const error = await response.text();
      console.log(`  ❌ Failed to create image ${name}: ${error}`);
    }
  } catch (error) {
    console.log(`  ❌ Error creating image ${name}: ${error.message}`);
  }
}

async function populateSampleData() {
  console.log('🚀 Starting Sample Data Population...\n');
  
  // Check if Strapi is accessible
  try {
    const test = await fetch(`${STRAPI_URL}/api/worksheet-apps`);
    if (!test.ok) {
      console.log('⚠️ Note: Strapi API may require configuration for public access.');
      console.log('Please ensure the following in Strapi admin:');
      console.log('1. Go to Settings > Roles > Public');
      console.log('2. Enable "find" and "create" for the content types');
      console.log('3. Save the changes\n');
    }
  } catch (error) {
    console.log('❌ Cannot connect to Strapi. Make sure it\'s running on http://localhost:1337');
    return;
  }
  
  console.log('📚 Creating Image Themes...');
  const createdThemes = [];
  for (const theme of SAMPLE_THEMES) {
    const created = await createTheme(theme);
    if (created) createdThemes.push(created);
  }
  
  console.log('\n📱 Creating Worksheet Apps...');
  for (const app of SAMPLE_APPS) {
    await createApp(app);
  }
  
  console.log('\n🖼️ Creating Sample Image Assets...');
  // Create a few sample images for each theme
  for (const theme of createdThemes.slice(0, 2)) { // Just first 2 themes for demo
    console.log(`\nAdding images to ${theme.attributes.displayName}:`);
    
    if (theme.attributes.themeKey === 'animals') {
      await createSampleImageAsset('Cat', theme.id, 'regular');
      await createSampleImageAsset('Dog', theme.id, 'regular');
      await createSampleImageAsset('Bird', theme.id, 'regular');
    } else if (theme.attributes.themeKey === 'food') {
      await createSampleImageAsset('Apple', theme.id, 'regular');
      await createSampleImageAsset('Banana', theme.id, 'regular');
      await createSampleImageAsset('Carrot', theme.id, 'regular');
    }
  }
  
  console.log('\n========================================');
  console.log('✅ Sample data population complete!');
  console.log('========================================\n');
  console.log('You can now:');
  console.log('1. Visit http://localhost:1337/admin to see the content');
  console.log('2. Use the full migration scripts to import all your apps and images');
  console.log('3. Create an API token in Strapi admin for full migration');
}

// Run the population
populateSampleData().catch(console.error);