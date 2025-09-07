#!/usr/bin/env node

/**
 * Script to link existing images to their themes based on folder structure
 */

const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

async function linkImagesToThemes() {
  console.log('Linking images to themes based on metadata...\n');

  try {
    // Get all themes
    const { data: themesData } = await api.get('/image-themes');
    const themes = themesData.data;
    
    // Create a map of folderName to theme ID
    const themeMap = {};
    themes.forEach(theme => {
      themeMap[theme.attributes.folderName] = theme.id;
    });
    
    console.log(`Found ${themes.length} themes:`, Object.keys(themeMap));

    // Get all images
    const { data: imagesData } = await api.get('/image-assets?pagination[limit]=100');
    const images = imagesData.data;
    
    console.log(`\nFound ${images.length} images to process\n`);

    let updated = 0;
    let skipped = 0;

    for (const image of images) {
      const metadata = image.attributes.metadata;
      
      // Skip if no metadata or no theme in metadata
      if (!metadata || !metadata.theme) {
        skipped++;
        continue;
      }

      const themeFolderName = metadata.theme;
      const themeId = themeMap[themeFolderName];

      if (!themeId) {
        console.log(`⚠️  No theme found for folder: ${themeFolderName} (image: ${image.attributes.fileName})`);
        skipped++;
        continue;
      }

      // Update the image to link it to the theme
      try {
        await api.put(`/image-assets/${image.id}`, {
          data: {
            themes: [themeId]
          }
        });
        console.log(`✓ Linked ${image.attributes.fileName} to theme: ${themeFolderName}`);
        updated++;
      } catch (error) {
        console.error(`✗ Failed to link ${image.attributes.fileName}:`, error.response?.data || error.message);
      }
    }

    console.log('\n========================================');
    console.log(`✓ Updated: ${updated} images`);
    console.log(`⊘ Skipped: ${skipped} images`);
    console.log('========================================\n');

    // Test the results
    console.log('Testing theme with images...');
    const { data: testData } = await api.get('/image-themes/folder/animals?locale=de');
    console.log(`\nTheme "animals" in German: ${testData.theme.name}`);
    console.log(`Images found: ${testData.images.length}`);
    if (testData.images.length > 0) {
      console.log('Sample images:', testData.images.slice(0, 3).map(img => img.name));
    }

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run the script
if (require.main === module) {
  linkImagesToThemes();
}