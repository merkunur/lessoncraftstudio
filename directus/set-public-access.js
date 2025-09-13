const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function setPublicAccess() {
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
    
    console.log('Setting public access permissions...\n');
    
    // In Directus, public access uses null for role ID
    // This represents unauthenticated users
    const publicRoleId = null;
    
    console.log('Setting permissions for public (unauthenticated) access...');
    
    // Collections to grant public read access
    const collections = ['image_themes', 'worksheet_images', 'directus_files'];
    
    for (const collection of collections) {
      try {
        // Check if permission already exists
        const existingPerms = await axios.get(
          `${DIRECTUS_URL}/permissions?filter[role][_null]=true&filter[collection][_eq]=${collection}&filter[action][_eq]=read`,
          { headers }
        );
        
        if (existingPerms.data.data.length > 0) {
          console.log(`✅ Public read permission already exists for ${collection}`);
          continue;
        }
        
        // Create new permission
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: publicRoleId, // null for public access
          collection: collection,
          action: 'read',
          permissions: {},
          fields: '*',
          validation: {},
          presets: {}
        }, { headers });
        
        console.log(`✅ Created public read permission for ${collection}`);
      } catch (error) {
        console.error(`❌ Failed to set permission for ${collection}:`, error.response?.data?.errors?.[0]?.message || error.message);
      }
    }
    
    // Test public access
    console.log('\nTesting public access...');
    
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/items/image_themes`);
      console.log(`✅ Public access working! Found ${testResponse.data.data.length} themes`);
    } catch (error) {
      console.log('❌ Public access not working:', error.response?.status);
    }
    
    console.log('\n✅ Permissions setup complete!');
    console.log('\nYou can now access:');
    console.log('- Admin Panel: http://localhost:8055/admin');
    console.log('- Public API: http://localhost:8055/items/image_themes');
    console.log('- Frontend Apps: http://localhost:3000/en/apps');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

setPublicAccess();