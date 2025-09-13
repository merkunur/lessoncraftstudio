const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function removeReverseRelation() {
  try {
    // Authenticate
    console.log('Authenticating...');
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    console.log('Removing problematic images field from image_themes...');
    
    try {
      await axios.delete(`${DIRECTUS_URL}/fields/image_themes/images`, { headers });
      console.log('✅ Removed images field');
    } catch (error) {
      console.log('ℹ️  Images field not found or already removed');
    }
    
    console.log('\n✅ Fixed! You can now use the admin panel without errors.');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

removeReverseRelation();