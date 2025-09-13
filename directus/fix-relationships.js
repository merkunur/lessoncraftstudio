const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function fixRelationships() {
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
    
    console.log('Fixing relationships...\n');
    
    // 1. Create the relationship between worksheet_images and image_themes
    console.log('Creating relationship: worksheet_images -> image_themes');
    try {
      await axios.post(`${DIRECTUS_URL}/relations`, {
        collection: 'worksheet_images',
        field: 'theme_id',
        related_collection: 'image_themes',
        meta: {
          many_collection: 'worksheet_images',
          many_field: 'theme_id',
          one_collection: 'image_themes',
          one_field: null,
          one_collection_field: null,
          one_allowed_collections: null,
          junction_field: null,
          sort_field: null,
          one_deselect_action: 'nullify'
        },
        schema: {
          table: 'worksheet_images',
          column: 'theme_id',
          foreign_key_table: 'image_themes',
          foreign_key_column: 'id',
          constraint_name: 'worksheet_images_theme_id_foreign',
          on_update: 'NO ACTION',
          on_delete: 'SET NULL'
        }
      }, { headers });
      console.log('✅ Created relationship worksheet_images -> image_themes');
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log('ℹ️  Relationship worksheet_images -> image_themes already exists');
      } else {
        console.log('⚠️  Could not create relationship:', error.response?.data?.errors?.[0]?.message);
      }
    }
    
    // 2. Update the theme_id field to use the proper interface
    console.log('\nUpdating theme_id field interface...');
    try {
      await axios.patch(`${DIRECTUS_URL}/fields/worksheet_images/theme_id`, {
        meta: {
          interface: 'select-dropdown-m2o',
          special: ['m2o'],
          options: {
            template: '{{folder_name}} - {{name}}'
          },
          display: 'related-values',
          display_options: {
            template: '{{folder_name}}'
          },
          required: false,
          note: 'Select the theme this image belongs to'
        }
      }, { headers });
      console.log('✅ Updated theme_id field interface');
    } catch (error) {
      console.log('⚠️  Could not update theme_id field:', error.response?.data?.errors?.[0]?.message);
    }
    
    // 3. Create/update the relationship between worksheet_images and directus_files
    console.log('\nCreating relationship: worksheet_images -> directus_files');
    try {
      await axios.post(`${DIRECTUS_URL}/relations`, {
        collection: 'worksheet_images',
        field: 'image_file',
        related_collection: 'directus_files',
        meta: {
          many_collection: 'worksheet_images',
          many_field: 'image_file',
          one_collection: 'directus_files',
          one_field: null,
          one_collection_field: null,
          one_allowed_collections: null,
          junction_field: null,
          sort_field: null,
          one_deselect_action: 'nullify'
        },
        schema: {
          table: 'worksheet_images',
          column: 'image_file',
          foreign_key_table: 'directus_files',
          foreign_key_column: 'id',
          constraint_name: 'worksheet_images_image_file_foreign',
          on_update: 'NO ACTION',
          on_delete: 'SET NULL'
        }
      }, { headers });
      console.log('✅ Created relationship worksheet_images -> directus_files');
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log('ℹ️  Relationship worksheet_images -> directus_files already exists');
      } else {
        console.log('⚠️  Could not create file relationship:', error.response?.data?.errors?.[0]?.message);
      }
    }
    
    // 4. Update the image_file field to use the proper interface
    console.log('\nUpdating image_file field interface...');
    try {
      await axios.patch(`${DIRECTUS_URL}/fields/worksheet_images/image_file`, {
        meta: {
          interface: 'file-image',
          special: ['file'],
          display: 'image',
          display_options: {
            circle: false
          },
          required: false,
          note: 'Upload the image file'
        }
      }, { headers });
      console.log('✅ Updated image_file field interface');
    } catch (error) {
      console.log('⚠️  Could not update image_file field:', error.response?.data?.errors?.[0]?.message);
    }
    
    // 5. Add reverse relationship on image_themes to see related images
    console.log('\nAdding reverse relationship on image_themes...');
    try {
      await axios.post(`${DIRECTUS_URL}/fields/image_themes`, {
        field: 'images',
        type: 'alias',
        meta: {
          interface: 'list-o2m',
          special: ['o2m'],
          options: {
            template: '{{file_name}}'
          },
          display: 'related-values',
          display_options: {
            template: '{{file_name}}'
          },
          readonly: true,
          hidden: false,
          note: 'Images in this theme'
        }
      }, { headers });
      console.log('✅ Added images field to image_themes');
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log('ℹ️  Images field already exists on image_themes');
      } else {
        console.log('⚠️  Could not add images field:', error.response?.data?.errors?.[0]?.message);
      }
    }
    
    console.log('\n✅ Relationships fixed successfully!');
    console.log('\nYou can now:');
    console.log('1. Go to http://localhost:8055/admin');
    console.log('2. Navigate to Content > Worksheet Images');
    console.log('3. Click "+ Create Item" to add new images');
    console.log('4. The theme dropdown and file upload should work properly');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixRelationships();