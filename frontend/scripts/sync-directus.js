#!/usr/bin/env node

// Automatic Directus sync script
// This syncs all themes and images from Directus to the filesystem on startup

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function syncDirectus() {
  console.log('🔄 Syncing image library from Directus...\n');
  
  try {
    // Authenticate
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = authResponse.data.data.access_token;
    const headers = { 'Authorization': `Bearer ${token}` };
    
    // Get all active themes
    const themesResponse = await axios.get(
      `${DIRECTUS_URL}/items/image_themes?filter[is_active][_eq]=true&sort=sort_order`,
      { headers }
    );
    
    const themes = themesResponse.data.data;
    console.log(`Found ${themes.length} active themes in Directus`);
    
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    
    // Process each theme
    for (const theme of themes) {
      const themePath = path.join(imagesDir, theme.folder_name);
      
      // Create theme folder if it doesn't exist
      if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath, { recursive: true });
        console.log(`✅ Created folder: ${theme.folder_name}`);
      }
      
      // Get images for this theme
      const imagesResponse = await axios.get(
        `${DIRECTUS_URL}/items/worksheet_images?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
        { headers }
      );
      
      const images = imagesResponse.data.data;
      let syncedCount = 0;
      
      for (const image of images) {
        if (!image.image_file?.id) continue;
        
        // Ensure filename has extension
        let fileName = image.file_name;
        if (!fileName.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
          const ext = image.image_file.filename_download?.match(/\.(png|jpg|jpeg|gif|svg)$/i)?.[0] || '.png';
          fileName = fileName + ext;
        }
        
        const targetPath = path.join(themePath, fileName);
        
        // Skip if already exists
        if (fs.existsSync(targetPath)) continue;
        
        try {
          // Download image
          const imageResponse = await axios.get(
            `${DIRECTUS_URL}/assets/${image.image_file.id}`,
            { headers, responseType: 'arraybuffer' }
          );
          
          fs.writeFileSync(targetPath, Buffer.from(imageResponse.data));
          syncedCount++;
          
          // Update filename in Directus if needed
          if (image.file_name !== fileName) {
            await axios.patch(
              `${DIRECTUS_URL}/items/worksheet_images/${image.id}`,
              { file_name: fileName },
              { headers }
            );
          }
        } catch (error) {
          console.error(`  ❌ Failed to sync ${fileName}`);
        }
      }
      
      if (syncedCount > 0) {
        console.log(`  ✅ Synced ${syncedCount} new images for ${theme.folder_name}`);
      }
    }
    
    console.log('\n✅ Sync complete!');
    
  } catch (error) {
    console.log('⚠️  Directus not available, using existing filesystem content');
    console.log('    This is normal if Directus is not running or configured.\n');
  }
}

// Run sync
syncDirectus();