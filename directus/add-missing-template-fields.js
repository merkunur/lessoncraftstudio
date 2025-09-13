const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function addMissingTemplateFields() {
  try {
    await client.connect();
    console.log('Connected to database');

    const collections = ['train_template_images', 'worksheet_template_images'];
    
    for (const collection of collections) {
      console.log(`\nProcessing ${collection}...`);
      
      // Add file_name field
      const fileNameExists = await client.query(`
        SELECT 1 FROM directus_fields 
        WHERE collection = $1 AND field = 'file_name'
      `, [collection]);
      
      if (fileNameExists.rows.length === 0) {
        console.log(`Adding file_name field to ${collection}...`);
        await client.query(`
          INSERT INTO directus_fields (
            collection, field, special, interface, options, display, display_options, 
            required, sort, width
          ) VALUES (
            $1, 'file_name', NULL, 'input', 
            '{}', 'raw', '{}', 
            false, 2, 'half'
          )
        `, [collection]);
      }
      
      // Add translations field
      const translationsExists = await client.query(`
        SELECT 1 FROM directus_fields 
        WHERE collection = $1 AND field = 'translations'
      `, [collection]);
      
      if (translationsExists.rows.length === 0) {
        console.log(`Adding translations field to ${collection}...`);
        await client.query(`
          INSERT INTO directus_fields (
            collection, field, special, interface, options, display, display_options, 
            required, sort, width
          ) VALUES (
            $1, 'translations', 'cast-json', 'input-code', 
            jsonb_build_object('language', 'json'), 'raw', '{}', 
            false, 5, 'full'
          )
        `, [collection]);
      }
      
      // Add status field
      const statusExists = await client.query(`
        SELECT 1 FROM directus_fields 
        WHERE collection = $1 AND field = 'status'
      `, [collection]);
      
      if (statusExists.rows.length === 0) {
        console.log(`Adding status field to ${collection}...`);
        await client.query(`
          INSERT INTO directus_fields (
            collection, field, special, interface, options, display, display_options, 
            required, sort, width
          ) VALUES (
            $1, 'status', NULL, 'select-dropdown', 
            jsonb_build_object(
              'choices', jsonb_build_array(
                jsonb_build_object('text', 'Active', 'value', 'active'),
                jsonb_build_object('text', 'Inactive', 'value', 'inactive')
              )
            ), 
            'labels', 
            jsonb_build_object(
              'choices', jsonb_build_object(
                'active', jsonb_build_object('foreground', '#FFFFFF', 'background', '#00C897'),
                'inactive', jsonb_build_object('foreground', '#FFFFFF', 'background', '#B0BEC5')
              )
            ), 
            false, 6, 'half'
          )
        `, [collection]);
      }
      
      // Ensure id field is visible
      const idExists = await client.query(`
        SELECT 1 FROM directus_fields 
        WHERE collection = $1 AND field = 'id'
      `, [collection]);
      
      if (idExists.rows.length === 0) {
        console.log(`Adding id field configuration to ${collection}...`);
        await client.query(`
          INSERT INTO directus_fields (
            collection, field, special, interface, options, display, display_options, 
            required, readonly, hidden, sort, width
          ) VALUES (
            $1, 'id', 'uuid', 'input', '{}', 'raw', '{}', 
            true, true, true, 1, 'half'
          )
        `, [collection]);
      }
    }

    // Now also ensure the theme collections have proper fields
    const themeCollections = ['train_template_themes', 'worksheet_template_themes'];
    
    for (const collection of themeCollections) {
      console.log(`\nProcessing theme collection ${collection}...`);
      
      // Ensure theme_name field exists and is visible
      const themeNameExists = await client.query(`
        SELECT 1 FROM directus_fields 
        WHERE collection = $1 AND field = 'theme_name'
      `, [collection]);
      
      if (themeNameExists.rows.length === 0) {
        console.log(`Adding theme_name field to ${collection}...`);
        await client.query(`
          INSERT INTO directus_fields (
            collection, field, special, interface, options, display, display_options, 
            required, sort, width
          ) VALUES (
            $1, 'theme_name', NULL, 'input', '{}', 'raw', '{}', 
            true, 2, 'half'
          )
        `, [collection]);
      }
    }

    console.log('\n✅ Successfully added all missing fields!');
    console.log('\n📝 What was added:');
    console.log('  - file_name field for image names');
    console.log('  - translations field for multilingual support');
    console.log('  - status field for active/inactive state');
    console.log('  - Proper configuration for all fields');
    console.log('\n🎉 Template collections now match the main image assets structure!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\nDatabase connection closed');
  }
}

addMissingTemplateFields();