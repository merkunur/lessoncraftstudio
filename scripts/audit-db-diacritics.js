#!/usr/bin/env node
/**
 * Audit database diacritics against image-vocabulary-raw.json
 * Run ON THE SERVER: node audit-db-diacritics.js
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
  // "door-1769383089276-d5f30e42.webp" → "door"
  // "air-conditioning-1769383089276-d5f30e42.webp" → "air-conditioning"
  const match = filename.match(/^(.+)-\d{13}-[a-f0-9]+\.\w+$/);
  if (match) return match[1];
  // fallback: strip extension
  return filename.replace(/\.\w+$/, '');
}

async function main() {
  // Load reference translations
  const rawPath = path.join(__dirname, 'image-vocabulary-raw.json');
  if (!fs.existsSync(rawPath)) {
    console.error('ERROR: image-vocabulary-raw.json not found at', rawPath);
    console.error('Upload it to the same directory as this script.');
    process.exit(1);
  }
  const rawJson = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  const refKeys = Object.keys(rawJson).filter(k => !k.startsWith('_'));
  console.log(`Loaded ${refKeys.length} reference entries from image-vocabulary-raw.json\n`);

  // Connect to database
  const client = new Client(DB_CONFIG);
  await client.connect();

  // Get all items
  const result = await client.query('SELECT id, filename, translations FROM image_library_items ORDER BY filename');
  console.log(`Found ${result.rows.length} rows in image_library_items\n`);

  // Track mismatches
  const mismatches = {}; // { locale: [ { baseKey, dbValue, correctValue, filename, id } ] }
  LOCALES.forEach(l => { mismatches[l] = []; });

  let matchedRows = 0;
  let unmatchedRows = 0;
  let totalMismatchedFields = 0;

  for (const row of result.rows) {
    const baseKey = extractBaseKey(row.filename);
    const ref = rawJson[baseKey];

    if (!ref) {
      unmatchedRows++;
      continue;
    }

    matchedRows++;
    const dbTranslations = row.translations || {};

    for (const locale of LOCALES) {
      const correctValue = ref[locale];
      const dbValue = dbTranslations[locale];

      if (!correctValue) continue; // no reference for this locale
      if (!dbValue) continue; // no DB value to compare

      if (dbValue !== correctValue) {
        mismatches[locale].push({
          baseKey,
          dbValue,
          correctValue,
          filename: row.filename,
          id: row.id,
        });
        totalMismatchedFields++;
      }
    }
  }

  // Print report
  console.log('='.repeat(80));
  console.log('DIACRITICS AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\nTotal DB rows: ${result.rows.length}`);
  console.log(`Rows matched to reference: ${matchedRows}`);
  console.log(`Rows with no reference match: ${unmatchedRows}`);
  console.log(`Total mismatched translation fields: ${totalMismatchedFields}`);
  console.log('');

  let totalDistinctWords = 0;

  for (const locale of LOCALES) {
    const items = mismatches[locale];
    if (items.length === 0) continue;

    const distinctWords = new Set(items.map(i => i.baseKey));
    totalDistinctWords += distinctWords.size;

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`${locale.toUpperCase()} — ${items.length} rows affected, ${distinctWords.size} distinct words`);
    console.log(`${'─'.repeat(60)}`);

    // Group by baseKey for readability
    const byKey = {};
    for (const item of items) {
      if (!byKey[item.baseKey]) {
        byKey[item.baseKey] = { dbValue: item.dbValue, correctValue: item.correctValue, count: 0 };
      }
      byKey[item.baseKey].count++;
    }

    const sortedKeys = Object.keys(byKey).sort();
    for (const key of sortedKeys) {
      const info = byKey[key];
      console.log(`  ${key}: "${info.dbValue}" → "${info.correctValue}" (${info.count} rows)`);
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`SUMMARY: ${totalMismatchedFields} translation fields to fix across ${totalDistinctWords} distinct words`);
  console.log(`${'='.repeat(80)}`);

  await client.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
