// Initialize Directus collections for backgrounds, borders, and templates
// Using native fetch in Node 18+

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function initSpecialCollections() {
  try {
    console.log('Initializing special image collections...');
    
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
    
    // 1. Create Background Images Collection
    console.log('Creating background_images collection...');
    try {
      await fetch(`${DIRECTUS_URL}/collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'background_images',
          meta: {
            collection: 'background_images',
            icon: 'wallpaper',
            display_template: '{{name}}',
            translations: [{
              language: 'en-US',
              translation: 'Background Images',
              singular: 'Background Image',
              plural: 'Background Images'
            }]
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                interface: 'input',
                readonly: true,
                hidden: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                width: 'half',
                required: true
              }
            },
            {
              field: 'category',
              type: 'string',
              meta: {
                interface: 'select-dropdown',
                width: 'half',
                options: {
                  choices: [
                    { text: 'Forest', value: 'forest' },
                    { text: 'Ocean', value: 'ocean' },
                    { text: 'Sky', value: 'sky' },
                    { text: 'Abstract', value: 'abstract' },
                    { text: 'Classroom', value: 'classroom' },
                    { text: 'Nature', value: 'nature' },
                    { text: 'Space', value: 'space' },
                    { text: 'Seasonal', value: 'seasonal' }
                  ]
                }
              }
            },
            {
              field: 'image_file',
              type: 'uuid',
              meta: {
                interface: 'file-image',
                width: 'full',
                required: true
              },
              schema: {
                foreign_key_table: 'directus_files',
                foreign_key_column: 'id'
              }
            },
            {
              field: 'is_active',
              type: 'boolean',
              meta: {
                interface: 'boolean',
                width: 'half'
              },
              schema: {
                default_value: true
              }
            },
            {
              field: 'sort_order',
              type: 'integer',
              meta: {
                interface: 'input',
                width: 'half'
              },
              schema: {
                default_value: 0
              }
            }
          ]
        })
      });
      console.log('✅ Created background_images collection');
    } catch (error) {
      console.log('Collection might already exist:', error.message);
    }
    
    // 2. Create Border Images Collection
    console.log('Creating border_images collection...');
    try {
      await fetch(`${DIRECTUS_URL}/collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'border_images',
          meta: {
            collection: 'border_images',
            icon: 'border_outer',
            display_template: '{{name}} - {{style}}',
            translations: [{
              language: 'en-US',
              translation: 'Border Images',
              singular: 'Border Image',
              plural: 'Border Images'
            }]
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                interface: 'input',
                readonly: true,
                hidden: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                width: 'half',
                required: true
              }
            },
            {
              field: 'style',
              type: 'string',
              meta: {
                interface: 'select-dropdown',
                width: 'half',
                options: {
                  choices: [
                    { text: 'Math', value: 'math' },
                    { text: 'Fun', value: 'fun' },
                    { text: 'Simple', value: 'simple' },
                    { text: 'Decorative', value: 'decorative' },
                    { text: 'Seasonal', value: 'seasonal' },
                    { text: 'Educational', value: 'educational' }
                  ]
                }
              }
            },
            {
              field: 'image_file',
              type: 'uuid',
              meta: {
                interface: 'file-image',
                width: 'full',
                required: true
              },
              schema: {
                foreign_key_table: 'directus_files',
                foreign_key_column: 'id'
              }
            },
            {
              field: 'is_active',
              type: 'boolean',
              meta: {
                interface: 'boolean',
                width: 'half'
              },
              schema: {
                default_value: true
              }
            },
            {
              field: 'sort_order',
              type: 'integer',
              meta: {
                interface: 'input',
                width: 'half'
              },
              schema: {
                default_value: 0
              }
            }
          ]
        })
      });
      console.log('✅ Created border_images collection');
    } catch (error) {
      console.log('Collection might already exist:', error.message);
    }
    
    // 3. Create Templates Collection
    console.log('Creating worksheet_templates collection...');
    try {
      await fetch(`${DIRECTUS_URL}/collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'worksheet_templates',
          meta: {
            collection: 'worksheet_templates',
            icon: 'dashboard',
            display_template: '{{name}} - {{app_type}}',
            translations: [{
              language: 'en-US',
              translation: 'Worksheet Templates',
              singular: 'Worksheet Template',
              plural: 'Worksheet Templates'
            }]
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                interface: 'input',
                readonly: true,
                hidden: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                width: 'half',
                required: true
              }
            },
            {
              field: 'app_type',
              type: 'string',
              meta: {
                interface: 'select-dropdown',
                width: 'half',
                options: {
                  choices: [
                    { text: 'Code Addition', value: 'code-addition' },
                    { text: 'Math Worksheet', value: 'math-worksheet' },
                    { text: 'Word Search', value: 'word-search' },
                    { text: 'Whiteboard', value: 'whiteboard' },
                    { text: 'General', value: 'general' }
                  ]
                }
              }
            },
            {
              field: 'template_image',
              type: 'uuid',
              meta: {
                interface: 'file-image',
                width: 'full',
                required: true
              },
              schema: {
                foreign_key_table: 'directus_files',
                foreign_key_column: 'id'
              }
            },
            {
              field: 'description',
              type: 'text',
              meta: {
                interface: 'input-multiline',
                width: 'full'
              }
            },
            {
              field: 'config',
              type: 'json',
              meta: {
                interface: 'input-code',
                width: 'full',
                options: {
                  language: 'json'
                },
                note: 'JSON configuration for the template (positions, sizes, etc.)'
              }
            },
            {
              field: 'is_active',
              type: 'boolean',
              meta: {
                interface: 'boolean',
                width: 'half'
              },
              schema: {
                default_value: true
              }
            },
            {
              field: 'sort_order',
              type: 'integer',
              meta: {
                interface: 'input',
                width: 'half'
              },
              schema: {
                default_value: 0
              }
            }
          ]
        })
      });
      console.log('✅ Created worksheet_templates collection');
    } catch (error) {
      console.log('Collection might already exist:', error.message);
    }
    
    console.log('\n✅ Special collections initialization complete!');
    console.log('You can now manage:');
    console.log('- Background Images');
    console.log('- Border Images');
    console.log('- Worksheet Templates');
    console.log('\nAccess them at: http://localhost:8055/admin');
    
  } catch (error) {
    console.error('Failed to initialize collections:', error);
    process.exit(1);
  }
}

// Run initialization
initSpecialCollections();