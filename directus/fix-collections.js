const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function fixCollections() {
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
    
    // Delete existing collections to start fresh
    console.log('Deleting existing collections...');
    
    try {
      await axios.delete(`${DIRECTUS_URL}/collections/worksheet_images`, { headers });
      console.log('✅ Deleted worksheet_images');
    } catch (e) {
      console.log('⚠️ worksheet_images not found or already deleted');
    }
    
    try {
      await axios.delete(`${DIRECTUS_URL}/collections/image_themes`, { headers });
      console.log('✅ Deleted image_themes');
    } catch (e) {
      console.log('⚠️ image_themes not found or already deleted');
    }
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create image_themes collection with proper auto-increment ID
    console.log('\nCreating image_themes collection with auto-increment ID...');
    
    await axios.post(`${DIRECTUS_URL}/collections`, {
      collection: 'image_themes',
      meta: {
        collection: 'image_themes',
        icon: 'folder',
        note: 'Themes for organizing worksheet images'
      },
      schema: {
        name: 'image_themes'
      },
      fields: [
        {
          field: 'id',
          type: 'integer',
          meta: {
            hidden: true,
            readonly: true,
            interface: 'input',
            special: ['auto-increment']
          },
          schema: {
            is_primary_key: true,
            auto_increment: true,
            has_auto_increment: true
          }
        },
        {
          field: 'folder_name',
          type: 'string',
          meta: {
            interface: 'input',
            required: true
          },
          schema: {
            is_unique: true
          }
        },
        {
          field: 'name',
          type: 'json',
          meta: {
            interface: 'input-code',
            options: { language: 'json' },
            required: true
          }
        },
        {
          field: 'description',
          type: 'json',
          meta: {
            interface: 'input-code',
            options: { language: 'json' }
          }
        },
        {
          field: 'sort_order',
          type: 'integer',
          meta: {
            interface: 'input'
          },
          schema: {
            default_value: 0
          }
        },
        {
          field: 'is_active',
          type: 'boolean',
          meta: {
            interface: 'boolean'
          },
          schema: {
            default_value: true
          }
        }
      ]
    }, { headers });
    
    console.log('✅ Created image_themes with auto-increment ID');
    
    // Create worksheet_images collection
    console.log('\nCreating worksheet_images collection...');
    
    await axios.post(`${DIRECTUS_URL}/collections`, {
      collection: 'worksheet_images',
      meta: {
        collection: 'worksheet_images',
        icon: 'image',
        note: 'Images for worksheet generators'
      },
      schema: {
        name: 'worksheet_images'
      },
      fields: [
        {
          field: 'id',
          type: 'integer',
          meta: {
            hidden: true,
            readonly: true,
            interface: 'input',
            special: ['auto-increment']
          },
          schema: {
            is_primary_key: true,
            auto_increment: true,
            has_auto_increment: true
          }
        },
        {
          field: 'file_name',
          type: 'string',
          meta: {
            interface: 'input',
            required: true
          }
        },
        {
          field: 'name',
          type: 'json',
          meta: {
            interface: 'input-code',
            options: { language: 'json' },
            required: true
          }
        },
        {
          field: 'theme_id',
          type: 'integer',
          meta: {
            interface: 'select-dropdown-m2o',
            special: ['m2o']
          },
          schema: {
            foreign_key_table: 'image_themes',
            foreign_key_column: 'id'
          }
        },
        {
          field: 'image_file',
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image'
          },
          schema: {
            foreign_key_table: 'directus_files',
            foreign_key_column: 'id'
          }
        },
        {
          field: 'tags',
          type: 'json',
          meta: {
            interface: 'tags'
          }
        },
        {
          field: 'status',
          type: 'string',
          meta: {
            interface: 'select-dropdown',
            options: {
              choices: [
                { text: 'Active', value: 'active' },
                { text: 'Archived', value: 'archived' }
              ]
            }
          },
          schema: {
            default_value: 'active'
          }
        }
      ]
    }, { headers });
    
    console.log('✅ Created worksheet_images with auto-increment ID');
    
    // Set public permissions
    console.log('\nSetting public permissions...');
    
    // Create permission policy first
    const policy = {
      name: 'Public Read Access',
      description: 'Allow public read access to image library',
      ip_access: [],
      enforce_tfa: false,
      admin_access: false,
      app_access: true
    };
    
    let policyId;
    try {
      const policyResponse = await axios.post(`${DIRECTUS_URL}/policies`, policy, { headers });
      policyId = policyResponse.data.data.id;
      console.log('✅ Created policy');
    } catch (e) {
      // Policy might exist, try to find it
      const policies = await axios.get(`${DIRECTUS_URL}/policies`, { headers });
      const existing = policies.data.data.find(p => p.name === 'Public Read Access');
      if (existing) {
        policyId = existing.id;
        console.log('ℹ️ Using existing policy');
      }
    }
    
    if (policyId) {
      // Grant permissions with policy
      const permissions = [
        { collection: 'image_themes', action: 'read' },
        { collection: 'worksheet_images', action: 'read' },
        { collection: 'directus_files', action: 'read' }
      ];
      
      for (const perm of permissions) {
        try {
          await axios.post(`${DIRECTUS_URL}/permissions`, {
            ...perm,
            role: null,
            policy: policyId,
            permissions: {},
            fields: '*'
          }, { headers });
          console.log(`✅ Set public read permission for ${perm.collection}`);
        } catch (e) {
          console.log(`⚠️ Permission for ${perm.collection} may already exist`);
        }
      }
    }
    
    console.log('\n✅ Collections fixed successfully!');
    console.log('You can now run: node migrate-all-images.js');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixCollections();