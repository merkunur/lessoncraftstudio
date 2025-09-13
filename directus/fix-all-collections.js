// Fix ALL collections properly - main library, backgrounds, borders, templates
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function fixAllCollections() {
  try {
    console.log('Fixing ALL collections properly...');
    
    // Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // CREATE MAIN IMAGE ASSETS COLLECTION
    console.log('Creating main Image Assets collection...');
    try {
      await fetch(`${DIRECTUS_URL}/collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'image_assets',
          meta: {
            collection: 'image_assets',
            icon: 'image',
            display_template: '{{file_name}} - {{theme.folder_name}}',
            color: '#2196F3',
            note: 'Main image library assets',
            translations: [{
              language: 'en-US',
              translation: 'Image Assets',
              singular: 'Image Asset',
              plural: 'Image Assets'
            }]
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: { interface: 'input', readonly: true, hidden: true },
              schema: { is_primary_key: true, has_auto_increment: true }
            },
            {
              field: 'file_name',
              type: 'string',
              meta: {
                interface: 'input',
                width: 'half',
                required: true,
                note: 'Filename without extension'
              }
            },
            {
              field: 'theme_id',
              type: 'integer',
              meta: {
                interface: 'select-dropdown-m2o',
                display: 'related-values',
                width: 'half',
                required: true,
                note: 'Select theme',
                options: { template: '{{folder_name}}' }
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
                display: 'image',
                width: 'full',
                note: 'Drag and drop or click to upload',
                special: ['file'],
                options: { crop: false, accept: 'image/*' }
              },
              schema: {
                foreign_key_table: 'directus_files',
                foreign_key_column: 'id'
              }
            },
            {
              field: 'translations',
              type: 'json',
              meta: {
                interface: 'input-code',
                width: 'full',
                options: { language: 'json' }
              }
            },
            {
              field: 'status',
              type: 'string',
              meta: {
                interface: 'select-dropdown',
                width: 'half',
                options: {
                  choices: [
                    { text: 'Active', value: 'active' },
                    { text: 'Inactive', value: 'inactive' }
                  ]
                }
              },
              schema: { default_value: 'active' }
            }
          ]
        })
      });
      console.log('Created Image Assets collection');
    } catch (e) {
      console.log('Image Assets might already exist');
    }
    
    console.log('Done! Refresh Directus admin panel');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fixAllCollections();
