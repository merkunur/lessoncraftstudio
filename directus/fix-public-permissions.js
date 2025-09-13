const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function fixPublicPermissions() {
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
    
    console.log('Checking and fixing public permissions...\n');
    
    // Get all permissions
    const permsResponse = await axios.get(`${DIRECTUS_URL}/permissions`, { headers });
    const permissions = permsResponse.data.data;
    
    // Find public permissions (where role is null)
    const publicPerms = permissions.filter(p => p.role === null);
    console.log(`Found ${publicPerms.length} public permissions`);
    
    // Delete existing public permissions to start fresh
    for (const perm of publicPerms) {
      if (['image_themes', 'worksheet_images', 'directus_files'].includes(perm.collection)) {
        try {
          await axios.delete(`${DIRECTUS_URL}/permissions/${perm.id}`, { headers });
          console.log(`Deleted old permission for ${perm.collection}`);
        } catch (e) {
          console.log(`Could not delete permission ${perm.id}`);
        }
      }
    }
    
    // Create fresh public permissions
    console.log('\nCreating new public permissions...');
    
    const newPermissions = [
      {
        collection: 'image_themes',
        action: 'read',
        fields: ['*']
      },
      {
        collection: 'worksheet_images', 
        action: 'read',
        fields: ['*']
      },
      {
        collection: 'directus_files',
        action: 'read',
        fields: ['*']
      }
    ];
    
    for (const perm of newPermissions) {
      try {
        const result = await axios.post(`${DIRECTUS_URL}/permissions`, {
          ...perm,
          permissions: {},
          validation: {}
        }, { headers });
        console.log(`✅ Created public read permission for ${perm.collection} (ID: ${result.data.data.id})`);
      } catch (error) {
        console.error(`❌ Failed for ${perm.collection}:`, error.response?.data?.errors?.[0]?.message);
      }
    }
    
    // Test with authenticated request first
    console.log('\nTesting with authentication...');
    const authTest = await axios.get(`${DIRECTUS_URL}/items/image_themes`, { headers });
    console.log(`✅ Found ${authTest.data.data.length} themes with auth`);
    
    // List all themes
    console.log('\nThemes in Directus:');
    authTest.data.data.forEach(theme => {
      console.log(`  - ${theme.folder_name} (active: ${theme.is_active}, sort: ${theme.sort_order})`);
    });
    
    // Test public access
    console.log('\nTesting public access (no auth)...');
    try {
      const publicTest = await axios.get(`${DIRECTUS_URL}/items/image_themes`);
      console.log(`✅ Public access works! Found ${publicTest.data.data.length} themes`);
    } catch (error) {
      console.log(`❌ Public access failed: ${error.response?.status}`);
      
      // Alternative: Update frontend to use authenticated requests
      console.log('\n💡 Alternative Solution:');
      console.log('Since public permissions are not working, you can:');
      console.log('1. Keep using the file system (themes will still work)');
      console.log('2. Or manually create the theme folder in frontend/public/images/');
      console.log('   - Create folder: frontend/public/images/[your-theme-name]');
      console.log('   - Add images to that folder');
      console.log('   - The theme will appear automatically');
    }
    
    console.log('\n✅ Done!');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixPublicPermissions();