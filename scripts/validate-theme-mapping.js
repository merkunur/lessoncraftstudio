/**
 * Validate Theme Mapping
 *
 * Ensures every sales-page theme name in includedThemes has a mapping entry,
 * and every mapped DB name actually exists in the database.
 *
 * Usage (on server):
 *   cd /opt/lessoncraftstudio && node scripts/validate-theme-mapping.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Replicate the THEME_DB_MAP from warriorplus-products.ts
const THEME_DB_MAP = {
  'animals': 'animals',
  'food': 'food_bw',
  'vehicles': 'vehicles',
  'fruits': 'fruits',
  'colors': 'colors',
  'body-parts': 'body_parts',
  'clothing': 'clothing',
  'school': 'classroom',
  'sports': 'sports_bw',
  'nature': 'nature_bw',
};

async function main() {
  console.log('=== Theme Mapping Validator ===\n');
  let errors = 0;

  // Step 1: Extract all includedThemes from warriorplus-products.ts
  const configPath = path.join(__dirname, '..', 'frontend', 'config', 'warriorplus-products.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');

  // Find all includedThemes arrays
  const themeArrayRegex = /includedThemes:\s*\[([^\]]+)\]/g;
  const allSalesThemes = new Set();
  let match;
  while ((match = themeArrayRegex.exec(configContent)) !== null) {
    const themes = match[1]
      .split(',')
      .map(t => t.trim().replace(/['"]/g, ''))
      .filter(t => t.length > 0);
    themes.forEach(t => allSalesThemes.add(t));
  }

  console.log(`Found ${allSalesThemes.size} unique sales-page theme names in config:`);
  console.log(`  ${[...allSalesThemes].join(', ')}\n`);

  // Step 2: Check every sales-page theme has a mapping
  console.log('--- Checking mapping coverage ---');
  for (const salesTheme of allSalesThemes) {
    if (!(salesTheme in THEME_DB_MAP)) {
      console.log(`  ERROR: "${salesTheme}" has no entry in THEME_DB_MAP`);
      errors++;
    } else {
      console.log(`  OK: "${salesTheme}" -> "${THEME_DB_MAP[salesTheme]}"`);
    }
  }
  console.log('');

  // Step 3: Get all DB theme names
  console.log('--- Checking DB theme existence ---');
  const dbThemes = await prisma.$queryRaw`
    SELECT DISTINCT name FROM image_themes ORDER BY name
  `;
  const dbThemeNames = new Set(dbThemes.map(t => t.name));
  console.log(`Found ${dbThemeNames.size} themes in database\n`);

  // Step 4: Verify every mapped DB name exists
  const mappedDbNames = new Set(Object.values(THEME_DB_MAP));
  for (const dbName of mappedDbNames) {
    if (!dbThemeNames.has(dbName)) {
      console.log(`  ERROR: DB name "${dbName}" (mapped from sales pages) not found in image_themes table`);
      errors++;
    } else {
      // Get image count for this theme
      const countResult = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM image_library_items
        WHERE theme = ${dbName}
      `;
      const count = Number(countResult[0].count);
      console.log(`  OK: "${dbName}" exists in DB (${count} images)`);
    }
  }
  console.log('');

  // Summary
  if (errors === 0) {
    console.log('=== PASS: All theme mappings are valid ===');
  } else {
    console.log(`=== FAIL: ${errors} error(s) found ===`);
    process.exit(1);
  }
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
