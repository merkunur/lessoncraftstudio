// Update image fields to match main library exactly

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function updateImageFields() {
  try {
    console.log('Updating image fields to match main library...');
    
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
    
    // Update background_images image_file field
    console.log('Updating background_images.image_file field...');
    try {
      await fetch(`${DIRECTUS_URL}/fields/background_images/image_file`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image',
            note: 'Upload the image file',
            required: false,
            special: ['file']
          },
          schema: {
            foreign_key_table: 'directus_files',
            foreign_key_column: 'id'
          }
        })
      });
      console.log('✅ Updated background_images.image_file');
    } catch (e) {
      console.log('Field might not exist yet');
    }
    
    // Update border_images image_file field
    console.log('Updating border_images.image_file field...');
    try {
      await fetch(`${DIRECTUS_URL}/fields/border_images/image_file`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image',
            note: 'Upload the image file',
            required: false,
            special: ['file']
          },
          schema: {
            foreign_key_table: 'directus_files',
            foreign_key_column: 'id'
          }
        })
      });
      console.log('✅ Updated border_images.image_file');
    } catch (e) {
      console.log('Field might not exist yet');
    }
    
    // Update worksheet_templates template_image field
    console.log('Updating worksheet_templates.template_image field...');
    try {
      await fetch(`${DIRECTUS_URL}/fields/worksheet_templates/template_image`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image',
            note: 'Upload the image file',
            required: false,
            special: ['file']
          },
          schema: {
            foreign_key_table: 'directus_files',
            foreign_key_column: 'id'
          }
        })
      });
      console.log('✅ Updated worksheet_templates.template_image');
    } catch (e) {
      console.log('Field might not exist yet');
    }
    
    // Also update the relationship configurations
    console.log('\nUpdating relationship configurations...');
    
    // Create relation for background_images.image_file
    try {
      await fetch(`${DIRECTUS_URL}/relations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'background_images',
          field: 'image_file',
          related_collection: 'directus_files',
          meta: {
            one_field: null,
            sort_field: null,
            one_deselect_action: 'nullify'
          },
          schema: {
            on_delete: 'SET NULL'
          }
        })
      });
      console.log('✅ Created background_images relation');
    } catch (e) {
      console.log('Relation might already exist');
    }
    
    // Create relation for border_images.image_file
    try {
      await fetch(`${DIRECTUS_URL}/relations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'border_images',
          field: 'image_file',
          related_collection: 'directus_files',
          meta: {
            one_field: null,
            sort_field: null,
            one_deselect_action: 'nullify'
          },
          schema: {
            on_delete: 'SET NULL'
          }
        })
      });
      console.log('✅ Created border_images relation');
    } catch (e) {
      console.log('Relation might already exist');
    }
    
    // Create relation for worksheet_templates.template_image
    try {
      await fetch(`${DIRECTUS_URL}/relations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collection: 'worksheet_templates',
          field: 'template_image',
          related_collection: 'directus_files',
          meta: {
            one_field: null,
            sort_field: null,
            one_deselect_action: 'nullify'
          },
          schema: {
            on_delete: 'SET NULL'
          }
        })
      });
      console.log('✅ Created worksheet_templates relation');
    } catch (e) {
      console.log('Relation might already exist');
    }
    
    console.log('\n✅ Image fields updated to match main library!');
    console.log('The image upload interface is now exactly the same as worksheet_images.');
    
  } catch (error) {
    console.error('Failed to update fields:', error);
    process.exit(1);
  }
}

// Run update
updateImageFields();