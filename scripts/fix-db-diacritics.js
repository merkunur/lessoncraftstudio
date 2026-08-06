#!/usr/bin/env node
/**
 * Fix diacritics errors in image_library_items.translations
 * Run ON THE SERVER: node fix-db-diacritics.js
 *
 * Uses image-vocabulary-raw.json as the correction source.
 * Updates translations JSONB fields where DB values differ from reference.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'lessoncraftstudio_prod',
  user: 'lcs_user',
  password: 'LcS2025SecureDBPass',
};

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function extractBaseKey(filename) {
  const match = filename.match(/^(.+)-\d{13}-[a-f0-9]+\.\w+$/);
  if (match) return match[1];
  return filename.replace(/\.\w+$/, '');
}

async function main() {
  // Load reference translations
  const rawPath = path.join(__dirname, 'image-vocabulary-raw.json');
  if (!fs.existsSync(rawPath)) {
    console.error('ERROR: image-vocabulary-raw.json not found at', rawPath);
    process.exit(1);
  }
  const rawJson = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  console.log(`Loaded reference translations\n`);

  // Connect to database
  const client = new Client(DB_CONFIG);
  await client.connect();

  // Get all items
  const result = await client.query('SELECT id, filename, translations FROM image_library_items ORDER BY filename');
  console.log(`Found ${result.rows.length} rows in image_library_items\n`);

  let totalUpdated = 0;
  let totalFieldsFixed = 0;
  const fixesByLocale = {};
  LOCALES.forEach(l => { fixesByLocale[l] = 0; });

  // Begin transaction
  await client.query('BEGIN');

  try {
    for (const row of result.rows) {
      const baseKey = extractBaseKey(row.filename);
      const ref = rawJson[baseKey];

      if (!ref) continue;

      const dbTranslations = row.translations || {};
      const updatedTranslations = { ...dbTranslations };
      let rowChanged = false;

      for (const locale of LOCALES) {
        const correctValue = ref[locale];
        const dbValue = dbTranslations[locale];

        if (!correctValue) continue;
        if (!dbValue) continue;

        if (dbValue !== correctValue) {
          updatedTranslations[locale] = correctValue;
          rowChanged = true;
          fixesByLocale[locale]++;
          totalFieldsFixed++;
        }
      }

      if (rowChanged) {
        await client.query(
          'UPDATE image_library_items SET translations = $1, updated_at = NOW() WHERE id = $2',
          [JSON.stringify(updatedTranslations), row.id]
        );
        totalUpdated++;
      }
    }

    // Commit transaction
    await client.query('COMMIT');
    console.log('Transaction committed successfully.\n');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('ERROR: Transaction rolled back!', err.message);
    process.exit(1);
  }

  // Print summary
  console.log('='.repeat(60));
  console.log('FIX SUMMARY');
  console.log('='.repeat(60));
  console.log(`Rows updated: ${totalUpdated}`);
  console.log(`Total translation fields fixed: ${totalFieldsFixed}`);
  console.log('');
  console.log('Fixes by locale:');
  for (const locale of LOCALES) {
    if (fixesByLocale[locale] > 0) {
      console.log(`  ${locale.toUpperCase()}: ${fixesByLocale[locale]} fields`);
    }
  }

  await client.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
