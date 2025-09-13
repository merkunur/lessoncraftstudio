const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function fixThemeFields() {
  try {
    await client.connect();
    console.log('Connected to database');

    const collections = ['train_template_themes', 'worksheet_template_themes'];
    
    for (const collection of collections) {
      console.log(`\nFixing fields for ${collection}...`);
      
      // First, delete ALL existing field configurations for this collection
      await client.query(`
        DELETE FROM directus_fields 
        WHERE collection = $1
      `, [collection]);
      console.log('  - Removed existing field configurations');

      // Delete ALL existing relationships
      await client.query(`
        DELETE FROM directus_relations 
        WHERE many_collection = $1 OR one_collection = $1
      `, [collection]);
      console.log('  - Removed existing relationships');

      // Now add ALL fields properly
      const fields = [
        { field: 'id', interface: null, special: null, readonly: true, hidden: true, width: 'full', sort: 1 },
        { field: 'status', interface: 'select-dropdown', special: null, readonly: false, hidden: false, width: 'full', sort: 2,
          options: '{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]}' },
        { field: 'sort', interface: 'input', special: null, readonly: false, hidden: true, width: 'half', sort: 3 },
        { field: 'user_created', interface: 'select-dropdown-m2o', special: 'user-created', readonly: true, hidden: true, width: 'half', sort: 4 },
        { field: 'date_created', interface: 'datetime', special: 'date-created', readonly: true, hidden: true, width: 'half', sort: 5 },
        { field: 'user_updated', interface: 'select-dropdown-m2o', special: 'user-updated', readonly: true, hidden: true, width: 'half', sort: 6 },
        { field: 'date_updated', interface: 'datetime', special: 'date-updated', readonly: true, hidden: true, width: 'half', sort: 7 },
        { field: 'name', interface: 'input', special: null, readonly: false, hidden: false, width: 'full', sort: 8, required: true },
        { field: 'folder_name', interface: 'input', special: null, readonly: false, hidden: false, width: 'half', sort: 9 },
        { field: 'translations', interface: 'input-code', special: 'cast-json', readonly: false, hidden: false, width: 'full', sort: 10,
          options: '{"language":"json"}' },
        { field: 'is_active', interface: 'boolean', special: 'cast-boolean', readonly: false, hidden: false, width: 'half', sort: 11 },
        { field: 'theme_name', interface: 'input', special: null, readonly: false, hidden: true, width: 'full', sort: 12 },
        { field: 'sort_order', interface: 'input', special: null, readonly: false, hidden: true, width: 'half', sort: 13 }
      ];

      let fieldId = await client.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM directus_fields');
      let nextId = fieldId.rows[0].next_id;

      for (const field of fields) {
        await client.query(`
          INSERT INTO directus_fields (
            id, collection, field, special, interface, options, display, display_options,
            readonly, hidden, sort, width, translations, note, conditions, required, "group",
            validation, validation_message
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
          )
        `, [
          nextId++,
          collection,
          field.field,
          field.special,
          field.interface,
          field.options || null,
          null,
          null,
          field.readonly,
          field.hidden,
          field.sort,
          field.width,
          null,
          null,
          null,
          field.required || false,
          null,
          null,
          null
        ]);
      }
      console.log(`  - Added ${fields.length} field configurations`);
    }

    // Re-create the relationships for images
    let relId = await client.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM directus_relations');
    let nextRelId = relId.rows[0].next_id;

    // Train template images -> themes relationship
    await client.query(`
      INSERT INTO directus_relations (
        id, many_collection, many_field, one_collection, one_field,
        one_collection_field, one_allowed_collections, junction_field,
        sort_field, one_deselect_action
      ) VALUES (
        $1, 'train_template_images', 'theme_id', 'train_template_themes', null,
        null, null, null, null, 'nullify'
      )
    `, [nextRelId++]);
    console.log('\nRestored train_template_images -> train_template_themes relationship');

    // Worksheet template images -> themes relationship
    await client.query(`
      INSERT INTO directus_relations (
        id, many_collection, many_field, one_collection, one_field,
        one_collection_field, one_allowed_collections, junction_field,
        sort_field, one_deselect_action
      ) VALUES (
        $1, 'worksheet_template_images', 'theme_id', 'worksheet_template_themes', null,
        null, null, null, null, 'nullify'
      )
    `, [nextRelId++]);
    console.log('Restored worksheet_template_images -> worksheet_template_themes relationship');

    console.log('\n✅ All theme field configurations have been fixed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

fixThemeFields();