const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function enablePublicAccess() {
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
    
    console.log('Enabling public access...\n');
    
    // In Directus, we need to set permissions without a role for public access
    // First, check existing permissions
    const existingPerms = await axios.get(`${DIRECTUS_URL}/permissions`, { headers });
    console.log(`Found ${existingPerms.data.data.length} existing permissions\n`);
    
    // Collections that need public read access
    const collections = [
      { collection: 'image_themes', fields: '*' },
      { collection: 'worksheet_images', fields: '*' },
      { collection: 'directus_files', fields: '*' }
    ];
    
    for (const col of collections) {
      // Check if public permission already exists
      const publicPerm = existingPerms.data.data.find(p => 
        !p.role && p.collection === col.collection && p.action === 'read'
      );
      
      if (publicPerm) {
        console.log(`✅ Public read permission already exists for ${col.collection}`);
        continue;
      }
      
      try {
        // Create public read permission (role: null means public)
        const result = await axios.post(`${DIRECTUS_URL}/permissions`, {
          collection: col.collection,
          action: 'read',
          permissions: {},
          validation: {},
          fields: col.fields,
          presets: {}
        }, { headers });
        
        console.log(`✅ Created public read permission for ${col.collection}`);
      } catch (error) {
        console.error(`❌ Failed to create permission for ${col.collection}:`, 
          error.response?.data?.errors?.[0]?.message || error.message);
      }
    }
    
    // Test public access
    console.log('\nTesting public access (without authentication)...');
    
    try {
      const themesTest = await axios.get(`${DIRECTUS_URL}/items/image_themes`);
      console.log(`✅ Public API working! Found ${themesTest.data.data.length} themes`);
      
      // Show theme names
      console.log('\nAccessible themes:');
      themesTest.data.data.forEach(theme => {
        console.log(`  - ${theme.folder_name} (sort: ${theme.sort_order})`);
      });
      
    } catch (error) {
      console.log('❌ Public access still not working');
      console.log('Error:', error.response?.status, error.response?.data?.errors?.[0]?.message);
    }
    
    // Also check frontend API endpoint
    console.log('\nChecking frontend API endpoint...');
    try {
      const frontendTest = await axios.get('http://localhost:3000/api/themes-translated?locale=en');
      console.log(`✅ Frontend API working! Found ${frontendTest.data.length} themes`);
    } catch (error) {
      console.log('❌ Frontend API error:', error.message);
    }
    
    console.log('\n✅ Setup complete!');
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure the theme folder_name matches exactly (case-sensitive)');
    console.log('2. Ensure images are linked to the correct theme_id');
    console.log('3. Check that theme is_active is set to true');
    console.log('4. Try refreshing the frontend page (Ctrl+F5)');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

enablePublicAccess();