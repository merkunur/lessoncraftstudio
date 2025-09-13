const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function fixAllUploadPermissions() {
  try {
    await client.connect();
    console.log('Connected to database\n');

    // Get admin policy ID
    const policyResult = await client.query(`
      SELECT p.id FROM directus_policies p 
      JOIN directus_access a ON p.id = a.policy 
      JOIN directus_roles r ON a.role = r.id 
      WHERE r.name = 'Administrator'
    `);
    const adminPolicyId = policyResult.rows[0].id;
    console.log('Admin policy ID:', adminPolicyId);

    // Grant permissions for ALL collections
    console.log('\nGranting permissions for all collections...');
    const collections = [
      'directus_files',
      'directus_folders',
      'image_themes',
      'image_assets',
      'background_themes',
      'background_images',
      'border_styles',
      'border_images',
      'train_template_themes',
      'train_template_images',
      'worksheet_template_themes',
      'worksheet_template_images',
      'worksheet_templates'
    ];

    for (const collection of collections) {
      for (const action of ['read', 'create', 'update', 'delete']) {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, $2, $3, '{}', '*')
          ON CONFLICT (policy, collection, action) 
          DO UPDATE SET permissions = '{}', fields = '*'
        `, [adminPolicyId, collection, action]);
      }
      console.log(`✅ Granted permissions for ${collection}`);
    }

    // Fix all file upload fields to ensure they have proper interface
    console.log('\nFixing file upload interfaces...');
    const imageFields = [
      { collection: 'image_assets', field: 'image_file' },
      { collection: 'background_images', field: 'image_file' },
      { collection: 'border_images', field: 'image_file' },
      { collection: 'train_template_images', field: 'image_file' },
      { collection: 'worksheet_template_images', field: 'image_file' },
      { collection: 'worksheet_templates', field: 'template_image' }
    ];

    for (const { collection, field } of imageFields) {
      await client.query(`
        UPDATE directus_fields 
        SET 
          interface = 'file-image',
          options = jsonb_build_object(
            'folder', null,
            'crop', false,
            'fileFilter', jsonb_build_object(
              'type__in', jsonb_build_array(
                'image/jpeg', 
                'image/png', 
                'image/gif', 
                'image/svg+xml', 
                'image/webp'
              )
            )
          ),
          display = 'image',
          display_options = jsonb_build_object('circle', false)
        WHERE collection = $1 AND field = $2
      `, [collection, field]);
      console.log(`✅ Fixed upload interface for ${collection}.${field}`);
    }

    // Ensure all relationships to directus_files exist
    console.log('\nEnsuring file relationships...');
    for (const { collection, field } of imageFields) {
      await client.query(`
        INSERT INTO directus_relations (
          many_collection, 
          many_field, 
          one_collection,
          one_deselect_action
        ) VALUES ($1, $2, 'directus_files', 'nullify')
        ON CONFLICT (many_collection, many_field, one_collection) DO NOTHING
      `, [collection, field]);
      console.log(`✅ Ensured relationship for ${collection}.${field}`);
    }

    console.log('\n🎉 SUCCESS! All fixed:');
    console.log('  ✅ All collections have full permissions');
    console.log('  ✅ All image fields have file upload capability');
    console.log('  ✅ All relationships are properly configured');
    console.log('\n👍 You can now:');
    console.log('  - Upload images by dragging and dropping');
    console.log('  - Browse your computer to select files');
    console.log('  - Access all template collections without errors');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\nDatabase connection closed');
  }
}

fixAllUploadPermissions();