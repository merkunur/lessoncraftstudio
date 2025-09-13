// Set public permissions for special collections
// Using native fetch in Node 18+

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function setPublicPermissions() {
  try {
    console.log('Setting public permissions for special collections...');
    
    // Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with Directus');
    }
    
    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Get public role ID (might be null UUID for public)
    const rolesResponse = await fetch(`${DIRECTUS_URL}/roles`, {
      headers
    });
    
    if (!rolesResponse.ok) {
      throw new Error('Failed to fetch roles');
    }
    
    const rolesData = await rolesResponse.json();
    // Public role in Directus uses null UUID
    const publicRoleId = null;
    
    console.log('Using public role (null UUID)');
    
    // Collections to grant permissions for
    const collections = [
      'background_images',
      'border_images',
      'worksheet_templates'
    ];
    
    // Grant read permissions for each collection
    for (const collection of collections) {
      console.log(`Setting permissions for ${collection}...`);
      
      // Check if permission already exists
      const existingPermResponse = await fetch(
        `${DIRECTUS_URL}/permissions?filter[role][_null]=true&filter[collection][_eq]=${collection}&filter[action][_eq]=read`,
        { headers }
      );
      
      if (existingPermResponse.ok) {
        const existingPerms = await existingPermResponse.json();
        
        if (existingPerms.data && existingPerms.data.length > 0) {
          console.log(`  Permission already exists for ${collection}`);
          continue;
        }
      }
      
      // Create read permission
      const permResponse = await fetch(`${DIRECTUS_URL}/permissions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          role: publicRoleId,
          collection: collection,
          action: 'read',
          permissions: {},
          validation: {},
          fields: '*',
          policy: publicRoleId // Policy field is required
        })
      });
      
      if (permResponse.ok) {
        console.log(`  ✅ Created read permission for ${collection}`);
      } else {
        const error = await permResponse.text();
        console.log(`  ⚠️ Failed to create permission for ${collection}:`, error);
      }
    }
    
    // Also ensure directus_files has public read access
    console.log('Checking directus_files permissions...');
    const filesPermResponse = await fetch(
      `${DIRECTUS_URL}/permissions?filter[role][_null]=true&filter[collection][_eq]=directus_files&filter[action][_eq]=read`,
      { headers }
    );
    
    if (filesPermResponse.ok) {
      const filesPerms = await filesPermResponse.json();
      
      if (!filesPerms.data || filesPerms.data.length === 0) {
        // Create read permission for files
        const filePermResponse = await fetch(`${DIRECTUS_URL}/permissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            role: publicRoleId,
            collection: 'directus_files',
            action: 'read',
            permissions: {},
            validation: {},
            fields: '*',
            policy: publicRoleId // Policy field is required
          })
        });
        
        if (filePermResponse.ok) {
          console.log('  ✅ Created read permission for directus_files');
        }
      } else {
        console.log('  Permission already exists for directus_files');
      }
    }
    
    console.log('\n✅ Public permissions setup complete!');
    console.log('The following collections are now publicly accessible:');
    console.log('- background_images');
    console.log('- border_images');
    console.log('- worksheet_templates');
    console.log('- directus_files');
    
  } catch (error) {
    console.error('Failed to set permissions:', error);
    process.exit(1);
  }
}

// Run setup
setPublicPermissions();