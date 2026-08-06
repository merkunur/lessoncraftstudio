#!/usr/bin/env node
/**
 * Fix diacritics errors in NUMBERED VARIANTS (bear-2, lion-3, etc.)
 * Run ON THE SERVER: node fix-db-diacritics-numbered.js
 *
 * For "bear-2-<timestamp>-<hash>.webp":
 *   - Base key extracted: "bear-2"
 *   - Root key (strip trailing -N): "bear"
 *   - Looks up rawJson["bear"] for correct translation
 *   - If DB has "Bjorn 2", replaces with "Björn 2"
 *   - If DB has "Bjorn" (no number), replaces with "Björn"
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
  const match = filename.match(/^(.+)-\d{13}-[a-z0-9]+\.\w+$/);
  if (match) return match[1];
  return filename.replace(/\.\w+$/, '');
}

// "bear-2" → { root: "bear", num: "2" }
// "background-landscape-001" → null (not a simple numbered variant)
// "air-conditioning-2" → { root: "air-conditioning", num: "2" }
function parseNumberedVariant(baseKey) {
  const match = baseKey.match(/^(.+)-(\d+)$/);
  if (!match) return null;
  return { root: match[1], num: match[2] };
}

// Strip diacritics for comparison
function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u00df/g, 'ss').replace(/\u0153/g, 'oe').replace(/\u00e6/g, 'ae');
}

async function main() {
  const rawPath = path.join(__dirname, 'image-vocabulary-raw.json');
  if (!fs.existsSync(rawPath)) {
    console.error('ERROR: image-vocabulary-raw.json not found');
    process.exit(1);
  }
  const rawJson = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  console.log('Loaded reference translations\n');

  const client = new Client(DB_CONFIG);
  await client.connect();

  const result = await client.query('SELECT id, filename, translations FROM image_library_items ORDER BY filename');
  console.log(`Found ${result.rows.length} rows\n`);

  let totalUpdated = 0;
  let totalFieldsFixed = 0;
  const fixesByLocale = {};
  LOCALES.forEach(l => { fixesByLocale[l] = 0; });

  await client.query('BEGIN');

  try {
    for (const row of result.rows) {
      const baseKey = extractBaseKey(row.filename);

      // Skip if already handled by first script (direct match)
      if (rawJson[baseKey]) continue;

      // Check if this is a numbered variant
      const parsed = parseNumberedVariant(baseKey);
      if (!parsed) continue;

      const ref = rawJson[parsed.root];
      if (!ref) continue;

      const dbTranslations = row.translations || {};
      const updatedTranslations = { ...dbTranslations };
      let rowChanged = false;

      for (const locale of LOCALES) {
        const correctBase = ref[locale];
        const dbValue = dbTranslations[locale];

        if (!correctBase || !dbValue) continue;

        // The DB value might be:
        //   "Bjorn 2" (stripped + number) → should be "Björn 2"
        //   "Bjorn" (stripped, no number) → should be "Björn"
        //   "Björn 2" (already correct) → skip
        //   "Björn" (already correct, no number) → skip

        // Check if the DB value ends with " N"
        const numSuffix = ` ${parsed.num}`;
        const hasNumSuffix = dbValue.endsWith(numSuffix);

        // Expected correct value
        const correctWithNum = correctBase + numSuffix;
        const correctWithout = correctBase;

        if (hasNumSuffix) {
          // DB has "Bjorn 2" — should be "Björn 2"
          if (dbValue !== correctWithNum) {
            // Verify it's actually a stripped-diacritics version
            const dbWithoutNum = dbValue.slice(0, -numSuffix.length);
            const strippedCorrect = stripDiacritics(correctBase);
            if (stripDiacritics(dbWithoutNum) === strippedCorrect || dbWithoutNum === strippedCorrect) {
              updatedTranslations[locale] = correctWithNum;
              rowChanged = true;
              fixesByLocale[locale]++;
              totalFieldsFixed++;
            }
          }
        } else {
          // DB has "Bjorn" (no number) — should be "Björn"
          if (dbValue !== correctWithout) {
            const strippedCorrect = stripDiacritics(correctBase);
            if (stripDiacritics(dbValue) === strippedCorrect || dbValue === strippedCorrect) {
              updatedTranslations[locale] = correctWithout;
              rowChanged = true;
              fixesByLocale[locale]++;
              totalFieldsFixed++;
            }
          }
        }
      }

      if (rowChanged) {
        await client.query(
          'UPDATE image_library_items SET translations = $1, updated_at = NOW() WHERE id = $2',
          [JSON.stringify(updatedTranslations), row.id]
        );
        totalUpdated++;

        // Show what we fixed (first few)
        if (totalUpdated <= 5) {
          console.log(`Fixed: ${row.filename} (base: ${baseKey}, root: ${parsed.root})`);
        }
      }
    }

    await client.query('COMMIT');
    console.log('\nTransaction committed.\n');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('ERROR: Rolled back!', err.message);
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('NUMBERED VARIANTS FIX SUMMARY');
  console.log('='.repeat(60));
  console.log(`Rows updated: ${totalUpdated}`);
  console.log(`Total translation fields fixed: ${totalFieldsFixed}`);
  console.log('');
  if (totalFieldsFixed > 0) {
    console.log('Fixes by locale:');
    for (const locale of LOCALES) {
      if (fixesByLocale[locale] > 0) {
        console.log(`  ${locale.toUpperCase()}: ${fixesByLocale[locale]} fields`);
      }
    }
  } else {
    console.log('No numbered variant diacritics issues found.');
  }

  await client.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
