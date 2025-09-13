// Sync Directus themes to filesystem so they appear in frontend
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function syncThemes() {
  try {
    // Authenticate
    console.log('Syncing Directus themes to filesystem...\n');
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    // Get all themes from Directus
    const themesResponse = await axios.get(`${DIRECTUS_URL}/items/image_themes`, { headers });
    const themes = themesResponse.data.data;
    
    console.log(`Found ${themes.length} themes in Directus:\n`);
    
    const imagesDir = path.join(process.cwd(), '..', 'frontend', 'public', 'images');
    
    // Create folders for each theme if they don't exist
    for (const theme of themes) {
      const themePath = path.join(imagesDir, theme.folder_name);
      
      if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath, { recursive: true });
        console.log(`✅ Created folder: ${theme.folder_name}`);
        
        // Create a placeholder file so the folder isn't empty
        const placeholderPath = path.join(themePath, '.placeholder');
        fs.writeFileSync(placeholderPath, 'This folder was created from Directus');
      } else {
        console.log(`ℹ️  Folder exists: ${theme.folder_name}`);
      }
    }
    
    // Get images and copy them to correct folders
    console.log('\nSyncing images...');
    const imagesResponse = await axios.get(
      `${DIRECTUS_URL}/items/worksheet_images?fields=*,theme_id.folder_name,image_file.*`, 
      { headers }
    );
    
    const images = imagesResponse.data.data;
    console.log(`Found ${images.length} images in Directus`);
    
    // Download and save images to correct theme folders
    let syncedCount = 0;
    for (const image of images) {
      if (image.theme_id && image.image_file && image.file_name) {
        const themeFolderName = image.theme_id.folder_name;
        const targetPath = path.join(imagesDir, themeFolderName, image.file_name);
        
        if (!fs.existsSync(targetPath)) {
          try {
            // Download the image from Directus
            const imageUrl = `${DIRECTUS_URL}/assets/${image.image_file.id}`;
            const imageResponse = await axios.get(imageUrl, {
              headers,
              responseType: 'stream'
            });
            
            // Save to filesystem
            const writer = fs.createWriteStream(targetPath);
            imageResponse.data.pipe(writer);
            
            await new Promise((resolve, reject) => {
              writer.on('finish', resolve);
              writer.on('error', reject);
            });
            
            console.log(`  ✅ Synced: ${themeFolderName}/${image.file_name}`);
            syncedCount++;
          } catch (error) {
            console.log(`  ❌ Failed to sync: ${themeFolderName}/${image.file_name}`);
          }
        }
      }
    }
    
    console.log(`\n✅ Sync complete! ${syncedCount} images synced`);
    console.log('\nYour themes should now appear in the frontend apps!');
    console.log('Try refreshing: http://localhost:3000/en/apps/word-search');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

syncThemes();