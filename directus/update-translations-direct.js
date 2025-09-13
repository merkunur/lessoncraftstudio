const { Client } = require('pg');
const translations = require('../frontend/app/api/multilingual-images/translations.js');

// Database connection
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function updateTranslationsDirectly() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Update theme translations
    console.log('\nUpdating theme translations...');
    const themesResult = await client.query('SELECT id, folder_name FROM image_themes');
    
    for (const theme of themesResult.rows) {
      const folderName = theme.folder_name.toLowerCase().replace(/[- _]/g, '');
      
      if (translations.themeTranslations && translations.themeTranslations[folderName]) {
        console.log(`Updating translations for theme: ${theme.folder_name}`);
        
        await client.query(
          'UPDATE image_themes SET name = $1 WHERE id = $2',
          [JSON.stringify(translations.themeTranslations[folderName]), theme.id]
        );
      } else {
        // Try with spaces
        const folderWithSpaces = theme.folder_name.toLowerCase();
        if (translations.themeTranslations && translations.themeTranslations[folderWithSpaces]) {
          console.log(`Updating translations for theme: ${theme.folder_name}`);
          
          await client.query(
            'UPDATE image_themes SET name = $1 WHERE id = $2',
            [JSON.stringify(translations.themeTranslations[folderWithSpaces]), theme.id]
          );
        } else {
          console.log(`No translations found for theme: ${theme.folder_name}`);
        }
      }
    }

    // Update image translations
    console.log('\nUpdating image translations...');
    const imagesResult = await client.query('SELECT id, file_name FROM image_assets');
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    for (const image of imagesResult.rows) {
      // Extract base name without extension
      const baseName = image.file_name.toLowerCase()
        .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
        .replace(/[- _]/g, '');
      
      if (translations.imageTranslations && translations.imageTranslations[baseName]) {
        console.log(`Updating translations for image: ${image.file_name} -> ${baseName}`);
        
        await client.query(
          'UPDATE image_assets SET translations = $1 WHERE id = $2',
          [JSON.stringify(translations.imageTranslations[baseName]), image.id]
        );
        updatedCount++;
      } else {
        // Try partial matches
        let found = false;
        if (translations.imageTranslations) {
          for (const [key, trans] of Object.entries(translations.imageTranslations)) {
            if (baseName.includes(key) || key.includes(baseName)) {
              console.log(`Updating translations for image (partial match): ${image.file_name} -> ${key}`);
              
              await client.query(
                'UPDATE image_assets SET translations = $1 WHERE id = $2',
                [JSON.stringify(trans), image.id]
              );
              updatedCount++;
              found = true;
              break;
            }
          }
        }
        
        if (!found) {
          console.log(`No translations found for image: ${image.file_name}`);
          notFoundCount++;
          
          // Create default translations based on file name
          const defaultName = image.file_name
            .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          const defaultTranslations = {
            'en': defaultName,
            'de': defaultName,
            'fr': defaultName,
            'es': defaultName,
            'pt': defaultName,
            'it': defaultName,
            'nl': defaultName,
            'sv': defaultName,
            'da': defaultName,
            'no': defaultName,
            'fi': defaultName
          };
          
          await client.query(
            'UPDATE image_assets SET translations = $1 WHERE id = $2',
            [JSON.stringify(defaultTranslations), image.id]
          );
        }
      }
    }

    console.log('\n=== Translation Update Complete ==="');
    console.log(`Updated ${updatedCount} images with translations`);
    console.log(`Created default translations for ${notFoundCount} images`);
    console.log(`Total images processed: ${imagesResult.rows.length}`);

  } catch (error) {
    console.error('Error updating translations:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the update
updateTranslationsDirectly();