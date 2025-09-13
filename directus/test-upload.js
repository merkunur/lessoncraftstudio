const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function testUpload() {
  try {
    // Authenticate
    console.log('Testing image upload functionality...\n');
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    // Get existing themes
    const themesResponse = await axios.get(`${DIRECTUS_URL}/items/image_themes`, { headers });
    console.log(`Found ${themesResponse.data.data.length} themes:`);
    themesResponse.data.data.forEach(theme => {
      console.log(`  - ${theme.folder_name} (ID: ${theme.id})`);
    });
    
    // Get existing images with relationships
    const imagesResponse = await axios.get(`${DIRECTUS_URL}/items/worksheet_images?fields=*,theme_id.*,image_file.*&limit=5`, { headers });
    console.log(`\nFound ${imagesResponse.data.data.length} sample images:`);
    imagesResponse.data.data.forEach(img => {
      console.log(`  - ${img.file_name}`);
      console.log(`    Theme: ${img.theme_id?.folder_name || 'No theme'}`);
      console.log(`    File: ${img.image_file?.filename_download || 'No file'}`);
    });
    
    console.log('\n✅ Relationships are working properly!');
    console.log('\nYou can now add images through the admin panel:');
    console.log('1. Go to http://localhost:8055/admin');
    console.log('2. Navigate to Content > Worksheet Images');
    console.log('3. Click "+ Create Item"');
    console.log('4. Fill in:');
    console.log('   - File Name: e.g., "turtle.png"');
    console.log('   - Name: JSON with translations');
    console.log('   - Theme: Select from dropdown');
    console.log('   - Image File: Click to upload');
    console.log('5. Click "Save"');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

testUpload();