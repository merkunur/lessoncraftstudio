const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function fixAllUploadInterfaces() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Collections that need file upload capability
    const collections = [
      'image_assets',
      'train_template_images',
      'worksheet_template_images'
    ];

    // Get the exact configuration from border_images which works
    const borderFieldResult = await client.query(`
      SELECT * FROM directus_fields 
      WHERE collection = 'border_images' 
      AND field = 'image_file'
    `);

    if (borderFieldResult.rows.length === 0) {
      console.error('Could not find border_images.image_file field configuration');
      return;
    }

    const borderConfig = borderFieldResult.rows[0];
    console.log('Border field configuration:', JSON.stringify(borderConfig, null, 2));

    for (const collection of collections) {
      console.log(`\nFixing ${collection}...`);

      // First, delete existing field if it exists
      await client.query(`
        DELETE FROM directus_fields 
        WHERE collection = $1 AND field = 'image_file'
      `, [collection]);
      console.log(`  - Deleted existing image_file field`);

      // Delete existing relationship if it exists
      await client.query(`
        DELETE FROM directus_relations 
        WHERE many_collection = $1 AND many_field = 'image_file'
      `, [collection]);
      console.log(`  - Deleted existing relationship`);

      // Get next ID for directus_fields
      const maxIdResult = await client.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM directus_fields');
      const nextFieldId = maxIdResult.rows[0].next_id;

      // Create the field with EXACT configuration from border_images
      await client.query(`
        INSERT INTO directus_fields (
          id,
          collection,
          field,
          special,
          interface,
          options,
          display,
          display_options,
          readonly,
          hidden,
          sort,
          width,
          translations,
          note,
          conditions,
          required,
          "group",
          validation,
          validation_message
        ) VALUES (
          $2,
          $1,
          'image_file',
          'file',
          'file-image',
          '{"crop":false,"folder":null,"accept":"image/*"}',
          'image',
          NULL,
          false,
          false,
          4,
          'full',
          NULL,
          'Drag and drop or click to upload image file',
          NULL,
          false,
          NULL,
          NULL,
          NULL
        )
      `, [collection, nextFieldId]);
      console.log(`  - Created image_file field with file upload interface`);

      // Get next ID for directus_relations
      const maxRelIdResult = await client.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM directus_relations');
      const nextRelId = maxRelIdResult.rows[0].next_id;

      // Create the relationship to directus_files
      await client.query(`
        INSERT INTO directus_relations (
          id,
          many_collection,
          many_field,
          one_collection,
          one_field,
          one_collection_field,
          one_allowed_collections,
          junction_field,
          sort_field,
          one_deselect_action
        ) VALUES (
          $2,
          $1,
          'image_file',
          'directus_files',
          NULL,
          NULL,
          NULL,
          NULL,
          NULL,
          'nullify'
        )
      `, [collection, nextRelId]);
      console.log(`  - Created relationship to directus_files`);

      // Ensure the column exists in the actual table
      const columnExists = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1 AND column_name = 'image_file'
      `, [collection]);

      if (columnExists.rows.length === 0) {
        await client.query(`
          ALTER TABLE ${collection} 
          ADD COLUMN IF NOT EXISTS image_file uuid 
          REFERENCES directus_files(id) ON DELETE SET NULL
        `);
        console.log(`  - Added image_file column to table`);
      }
    }

    // Also verify that the special attribute is set correctly
    console.log('\nVerifying special attribute for all collections...');
    
    const allCollections = [
      'image_assets',
      'background_images',
      'border_images',
      'train_template_images',
      'worksheet_template_images'
    ];

    for (const collection of allCollections) {
      const result = await client.query(`
        SELECT field, special, interface, options
        FROM directus_fields 
        WHERE collection = $1 AND field = 'image_file'
      `, [collection]);

      if (result.rows.length > 0) {
        const field = result.rows[0];
        console.log(`${collection}: special='${field.special}', interface='${field.interface}'`);
        
        if (field.special !== 'file') {
          // Update to ensure special is set to 'file'
          await client.query(`
            UPDATE directus_fields 
            SET special = 'file', 
                interface = 'file-image',
                options = '{"folder":"8bb4a8ce-3c6d-4b6f-b3c3-17c66e3f0e6b"}'
            WHERE collection = $1 AND field = 'image_file'
          `, [collection]);
          console.log(`  - Fixed special attribute for ${collection}`);
        }
      }
    }

    // Clear Directus cache
    console.log('\nClearing Directus cache...');
    await client.query(`DELETE FROM directus_cache`);
    
    console.log('\n✅ All upload interfaces have been fixed!');
    console.log('Please refresh your Directus admin panel to see the changes.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

fixAllUploadInterfaces();