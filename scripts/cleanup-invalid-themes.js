const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Themes that should NOT be in the general image library
const invalidThemes = ['background', 'backgrounds', 'borders', 'drawing lines', 'template', 'alphabetsvg'];

async function deleteTheme(themeId, themeName) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/image-themes/${themeId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log(`✓ Deleted invalid theme: ${themeName}`);
      return true;
    } else {
      console.error(`✗ Failed to delete theme ${themeName}:`, response.status);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error deleting theme ${themeName}:`, error);
    return false;
  }
}

async function cleanupInvalidThemes() {
  console.log('===========================================');
  console.log('Cleaning up Invalid Themes from Strapi');
  console.log('===========================================\n');
  
  try {
    // Fetch all themes
    const response = await fetch(`${STRAPI_URL}/api/image-themes`);
    if (!response.ok) {
      console.error('Failed to fetch themes');
      return;
    }
    
    const data = await response.json();
    const themes = data.data || [];
    
    console.log(`Found ${themes.length} themes in Strapi\n`);
    
    let deletedCount = 0;
    
    for (const theme of themes) {
      const folderName = theme.attributes.folderName;
      
      if (invalidThemes.includes(folderName)) {
        console.log(`Found invalid theme: ${folderName} (ID: ${theme.id})`);
        const deleted = await deleteTheme(theme.id, folderName);
        if (deleted) {
          deletedCount++;
        }
      }
    }
    
    console.log('\n===========================================');
    console.log('Cleanup Complete!');
    console.log(`Deleted ${deletedCount} invalid themes`);
    console.log('===========================================');
    
    // List remaining valid themes
    console.log('\nValid themes that should remain:');
    console.log('- alphabet (Alphabet letters)');
    console.log('- animals (Animal images)');
    console.log('- coloring (Coloring page images)');
    console.log('- food (Food items)');
    console.log('- general (General/miscellaneous images)');
    console.log('- icons (Icon images)');
    console.log('- prepositions (Images for teaching prepositions)');
    console.log('- symbols (Mathematical and other symbols)');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Run the cleanup
cleanupInvalidThemes().catch(console.error);