// Initialize Directus Collections for Image Library
// Run this script to set up the image library data model in Directus

const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function initializeCollections() {
  try {
    // 1. Authenticate
    console.log('Authenticating with Directus...');
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    // 2. Create Image Themes Collection
    console.log('Creating image_themes collection...');
    try {
      await axios.post(`${DIRECTUS_URL}/collections`, {
        collection: 'image_themes',
        meta: {
          collection: 'image_themes',
          icon: 'folder',
          note: 'Themes for organizing worksheet images',
          display_template: '{{folder_name}}',
          translations: {
            'en-US': 'Image Themes',
            'de-DE': 'Bildthemen',
            'fr-FR': 'Thèmes d\'images'
          }
        },
        schema: {
          name: 'image_themes',
          comment: 'Themes for organizing worksheet images'
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              hidden: true,
              readonly: true,
              interface: 'input',
              special: ['auto-increment', 'primary-key']
            },
            schema: {
              is_primary_key: true,
              auto_increment: true
            }
          },
          {
            field: 'name',
            type: 'json',
            meta: {
              interface: 'input-code',
              display: 'raw',
              note: 'Theme name in multiple languages (JSON format)',
              required: true,
              options: {
                language: 'json'
              }
            },
            schema: {
              comment: 'Multilingual theme names'
            }
          },
          {
            field: 'folder_name',
            type: 'string',
            meta: {
              interface: 'input',
              display: 'raw',
              note: 'Folder name in file system',
              required: true
            },
            schema: {
              is_unique: true
            }
          },
          {
            field: 'description',
            type: 'json',
            meta: {
              interface: 'input-code',
              display: 'raw',
              note: 'Theme description (optional)',
              options: {
                language: 'json'
              }
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              display: 'raw'
            },
            schema: {
              default_value: 0
            }
          },
          {
            field: 'is_active',
            type: 'boolean',
            meta: {
              interface: 'boolean',
              display: 'boolean'
            },
            schema: {
              default_value: true
            }
          }
        ]
      }, { headers });
      console.log('✅ image_themes collection created');
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log('⚠️ image_themes collection already exists');
      } else {
        throw error;
      }
    }
    
    // 3. Create Worksheet Images Collection
    console.log('Creating worksheet_images collection...');
    try {
      await axios.post(`${DIRECTUS_URL}/collections`, {
        collection: 'worksheet_images',
        meta: {
          collection: 'worksheet_images',
          icon: 'image',
          note: 'Images for worksheet generators',
          display_template: '{{file_name}}'
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
              special: ['auto-increment', 'primary-key']
            },
            schema: {
              is_primary_key: true,
              auto_increment: true
            }
          },
          {
            field: 'name',
            type: 'json',
            meta: {
              interface: 'input-code',
              display: 'raw',
              note: 'Image name in multiple languages (JSON format)',
              required: true,
              options: {
                language: 'json'
              }
            }
          },
          {
            field: 'file_name',
            type: 'string',
            meta: {
              interface: 'input',
              display: 'raw',
              note: 'Original filename',
              required: true
            }
          },
          {
            field: 'image_file',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              display: 'image',
              note: 'Upload the image file'
            }
          },
          {
            field: 'theme_id',
            type: 'integer',
            meta: {
              interface: 'select-dropdown-m2o',
              display: 'related-values',
              special: ['m2o']
            },
            schema: {
              foreign_key_table: 'image_themes',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'tags',
            type: 'json',
            meta: {
              interface: 'tags',
              display: 'labels',
              note: 'Tags for searching'
            }
          },
          {
            field: 'status',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              display: 'labels',
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
      console.log('✅ worksheet_images collection created');
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log('⚠️ worksheet_images collection already exists');
      } else {
        throw error;
      }
    }
    
    // 4. Set permissions for public access (for development)
    console.log('Setting public permissions...');
    try {
      // First get the public role ID (null for public)
      // In Directus, public role has ID null
      
      // Grant read permissions for image_themes to public
      try {
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: null,  // null = public role
          collection: 'image_themes',
          action: 'read',
          permissions: {},
          fields: '*'
        }, { headers });
        console.log('✅ Public read permissions set for image_themes');
      } catch (e) {
        if (!e.response?.data?.errors?.[0]?.message?.includes('already exists')) {
          console.log('⚠️ Could not set permissions for image_themes:', e.response?.data?.errors?.[0]?.message);
        }
      }
      
      // Grant read permissions for worksheet_images to public
      try {
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: null,  // null = public role
          collection: 'worksheet_images',
          action: 'read',
          permissions: {},
          fields: '*'
        }, { headers });
        console.log('✅ Public read permissions set for worksheet_images');
      } catch (e) {
        if (!e.response?.data?.errors?.[0]?.message?.includes('already exists')) {
          console.log('⚠️ Could not set permissions for worksheet_images:', e.response?.data?.errors?.[0]?.message);
        }
      }
      
      // Also grant read permissions for directus_files
      try {
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: null,  // null = public role
          collection: 'directus_files',
          action: 'read',
          permissions: {},
          fields: '*'
        }, { headers });
        console.log('✅ Public read permissions set for directus_files');
      } catch (e) {
        if (!e.response?.data?.errors?.[0]?.message?.includes('already exists')) {
          console.log('⚠️ Could not set permissions for directus_files:', e.response?.data?.errors?.[0]?.message);
        }
      }
      
    } catch (error) {
      console.log('⚠️ Error setting permissions:', error.message);
    }
    
    console.log('\n✅ Directus collections initialized successfully!');
    console.log('\nYou can now:');
    console.log('1. Go to http://localhost:8055/admin');
    console.log('2. Login with admin@lessoncraftstudio.com / admin123!');
    console.log('3. Navigate to Content > Image Themes to add themes');
    console.log('4. Navigate to Content > Worksheet Images to add images');
    
  } catch (error) {
    console.error('Error initializing collections:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Add sample data
async function addSampleData() {
  try {
    console.log('\nAdding sample data...');
    
    // Authenticate
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    // Add sample themes
    const themes = [
      {
        folder_name: 'animals',
        name: {
          en: 'Animals',
          de: 'Tiere',
          fr: 'Animaux',
          es: 'Animales',
          pt: 'Animais',
          it: 'Animali',
          nl: 'Dieren',
          sv: 'Djur',
          da: 'Dyr',
          no: 'Dyr',
          fi: 'Eläimet'
        },
        sort_order: 1,
        is_active: true
      },
      {
        folder_name: 'food',
        name: {
          en: 'Food',
          de: 'Essen',
          fr: 'Nourriture',
          es: 'Comida',
          pt: 'Comida',
          it: 'Cibo',
          nl: 'Voedsel',
          sv: 'Mat',
          da: 'Mad',
          no: 'Mat',
          fi: 'Ruoka'
        },
        sort_order: 2,
        is_active: true
      },
      {
        folder_name: 'transportation',
        name: {
          en: 'Transportation',
          de: 'Transport',
          fr: 'Transport',
          es: 'Transporte',
          pt: 'Transporte',
          it: 'Trasporti',
          nl: 'Vervoer',
          sv: 'Transport',
          da: 'Transport',
          no: 'Transport',
          fi: 'Liikenne'
        },
        sort_order: 3,
        is_active: true
      }
    ];
    
    for (const theme of themes) {
      try {
        await axios.post(`${DIRECTUS_URL}/items/image_themes`, theme, { headers });
        console.log(`✅ Added theme: ${theme.folder_name}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️ Theme ${theme.folder_name} already exists`);
        }
      }
    }
    
    console.log('\n✅ Sample data added successfully!');
    
  } catch (error) {
    console.error('Error adding sample data:', error.response?.data || error.message);
  }
}

// Run initialization
initializeCollections().then(() => {
  addSampleData();
});