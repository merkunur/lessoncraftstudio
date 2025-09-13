const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function fixTemplateUploadInterface() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Create relationships for train_template_images
    console.log('Creating relationship for train_template_images.image_file...');
    await client.query(`
      INSERT INTO directus_relations (
        many_collection, 
        many_field, 
        one_collection,
        one_deselect_action
      ) VALUES (
        'train_template_images',
        'image_file',
        'directus_files',
        'nullify'
      ) ON CONFLICT DO NOTHING
    `);

    // Create relationships for worksheet_template_images
    console.log('Creating relationship for worksheet_template_images.image_file...');
    await client.query(`
      INSERT INTO directus_relations (
        many_collection, 
        many_field, 
        one_collection,
        one_deselect_action
      ) VALUES (
        'worksheet_template_images',
        'image_file',
        'directus_files',
        'nullify'
      ) ON CONFLICT DO NOTHING
    `);

    // Update field interfaces to ensure they have the correct settings
    console.log('Updating field interfaces...');
    
    // Update train_template_images.image_file
    await client.query(`
      UPDATE directus_fields 
      SET 
        interface = 'file-image',
        display = 'image',
        options = jsonb_build_object(
          'folder', null,
          'crop', true,
          'fileFilter', jsonb_build_object(
            'type__in', jsonb_build_array('image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp')
          )
        ),
        display_options = jsonb_build_object('circle', false)
      WHERE collection = 'train_template_images' 
      AND field = 'image_file'
    `);

    // Update worksheet_template_images.image_file
    await client.query(`
      UPDATE directus_fields 
      SET 
        interface = 'file-image',
        display = 'image',
        options = jsonb_build_object(
          'folder', null,
          'crop', true,
          'fileFilter', jsonb_build_object(
            'type__in', jsonb_build_array('image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp')
          )
        ),
        display_options = jsonb_build_object('circle', false)
      WHERE collection = 'worksheet_template_images' 
      AND field = 'image_file'
    `);

    // Also update the theme_id fields to have proper dropdown interfaces
    console.log('Updating theme relationship dropdowns...');
    
    // Train template theme dropdown
    await client.query(`
      UPDATE directus_fields 
      SET 
        interface = 'select-dropdown-m2o',
        display = 'related-values',
        options = jsonb_build_object(
          'template', '{{theme_name}}'
        ),
        display_options = jsonb_build_object(
          'template', '{{theme_name}}'
        )
      WHERE collection = 'train_template_images' 
      AND field = 'theme_id'
    `);

    // Worksheet template theme dropdown
    await client.query(`
      UPDATE directus_fields 
      SET 
        interface = 'select-dropdown-m2o',
        display = 'related-values',
        options = jsonb_build_object(
          'template', '{{theme_name}}'
        ),
        display_options = jsonb_build_object(
          'template', '{{theme_name}}'
        )
      WHERE collection = 'worksheet_template_images' 
      AND field = 'theme_id'
    `);

    // Check if we need to create the theme_id relationships too
    const trainThemeRelation = await client.query(`
      SELECT * FROM directus_relations 
      WHERE many_collection = 'train_template_images' 
      AND many_field = 'theme_id'
    `);

    if (trainThemeRelation.rows.length === 0) {
      console.log('Creating train template theme relationship...');
      await client.query(`
        INSERT INTO directus_relations (
          many_collection, 
          many_field, 
          one_collection,
          one_field,
          one_deselect_action
        ) VALUES (
          'train_template_images',
          'theme_id',
          'train_template_themes',
          'id',
          'nullify'
        )
      `);
    }

    const worksheetThemeRelation = await client.query(`
      SELECT * FROM directus_relations 
      WHERE many_collection = 'worksheet_template_images' 
      AND many_field = 'theme_id'
    `);

    if (worksheetThemeRelation.rows.length === 0) {
      console.log('Creating worksheet template theme relationship...');
      await client.query(`
        INSERT INTO directus_relations (
          many_collection, 
          many_field, 
          one_collection,
          one_field,
          one_deselect_action
        ) VALUES (
          'worksheet_template_images',
          'theme_id',
          'worksheet_template_themes',
          'id',
          'nullify'
        )
      `);
    }

    // Also ensure the collections have proper display templates
    console.log('Updating collection display templates...');
    
    await client.query(`
      UPDATE directus_collections 
      SET 
        meta = jsonb_set(
          COALESCE(meta, '{}')::jsonb,
          '{display_template}',
          '"{{file_name}} - {{theme_id.theme_name}}"'
        )
      WHERE collection = 'train_template_images'
    `);

    await client.query(`
      UPDATE directus_collections 
      SET 
        meta = jsonb_set(
          COALESCE(meta, '{}')::jsonb,
          '{display_template}',
          '"{{file_name}} - {{theme_id.theme_name}}"'
        )
      WHERE collection = 'worksheet_template_images'
    `);

    console.log('\n✅ Successfully fixed template upload interfaces!');
    console.log('\n📝 What was fixed:');
    console.log('  - Added file relationships for image uploads');
    console.log('  - Configured drag-and-drop file upload interface');
    console.log('  - Added theme dropdown selectors');
    console.log('  - Updated display templates');
    console.log('\n🎉 You can now upload images to train and worksheet templates!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\nDatabase connection closed');
  }
}

fixTemplateUploadInterface();