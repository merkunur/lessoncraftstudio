const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

// Main image folders to migrate (excluding special categories)
const IMAGE_FOLDERS = [
  'alphabet', 'alphabetsvg', 'animals', 'coloring', 'drawing lines',
  'food', 'furniture', 'general', 'icons', 'Miscellaneous', 
  'new', 'object', 'prepositions', 'symbols'
];

async function migrateAllImages() {
  console.log('Starting complete image library migration...\n');
  
  try {
    // Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    let totalThemes = 0;
    let totalImages = 0;
    
    // Process each folder as a theme
    for (const folder of IMAGE_FOLDERS) {
      const folderPath = path.join(__dirname, '..', 'frontend', 'public', 'images', folder);
      
      if (!fs.existsSync(folderPath)) {
        console.log(`Folder not found: ${folder}`);
        continue;
      }
      
      console.log(`\nProcessing theme: ${folder}`);
      
      // 1. Create or get theme
      let themeId;
      
      // Check if theme exists
      const checkThemeUrl = `${DIRECTUS_URL}/items/image_themes?filter[folder_name][_eq]=${folder}`;
      const checkThemeResponse = await fetch(checkThemeUrl, { headers });
      const existingTheme = await checkThemeResponse.json();
      
      if (existingTheme.data && existingTheme.data.length > 0) {
        themeId = existingTheme.data[0].id;
        console.log(`   Theme exists (ID: ${themeId})`);
      } else {
        // Create theme
        const createThemeResponse = await fetch(`${DIRECTUS_URL}/items/image_themes`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            folder_name: folder,
            is_active: true,
            sort_order: totalThemes + 1
          })
        });
        const newTheme = await createThemeResponse.json();
        themeId = newTheme.data.id;
        console.log(`   Created theme (ID: ${themeId})`);
        totalThemes++;
      }
      
      // 2. Get all images in folder
      const files = fs.readdirSync(folderPath)
        .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file));
      
      console.log(`   Found ${files.length} images`);
      
      // 3. Process each image (without actual file upload for now)
      for (const file of files) {
        const fileName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
        
        // Check if image asset already exists
        const checkImageUrl = `${DIRECTUS_URL}/items/image_assets?filter[file_name][_eq]=${fileName}&filter[theme_id][_eq]=${themeId}`;
        const checkImageResponse = await fetch(checkImageUrl, { headers });
        const existingImage = await checkImageResponse.json();
        
        if (existingImage.data && existingImage.data.length > 0) {
          console.log(`   - ${fileName} (already exists)`);
          continue;
        }
        
        // Create image asset entry (without file upload for now)
        const createImageResponse = await fetch(`${DIRECTUS_URL}/items/image_assets`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            file_name: fileName,
            theme_id: themeId,
            status: 'active'
          })
        });
        
        if (createImageResponse.ok) {
          console.log(`   + ${fileName}`);
          totalImages++;
        }
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`Migration complete!`);
    console.log(`   Themes processed: ${IMAGE_FOLDERS.length}`);
    console.log(`   Images created: ${totalImages}`);
    console.log('\nNote: Image files will be served from local filesystem');
    console.log('Refresh your Directus admin panel to see all images!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateAllImages();
