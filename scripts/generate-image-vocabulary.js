/**
 * Generate Image Vocabulary Data
 * ===============================
 * Queries the database for all image library items with their translations,
 * then outputs a JSON file with unique base words and their singular translations.
 *
 * Run on server:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/generate-image-vocabulary.js
 *
 * Output: ../scripts/v2-data/image-vocabulary-raw.json
 */

const { PrismaClient } = require('/opt/lessoncraftstudio/frontend/node_modules/@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const LOCALES = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

function baseKey(englishName) {
  // Convert English name to the base vocabulary key
  // "Cat" -> "cat", "Cat 2" -> "cat", "French Fries" -> "french-fries"
  const lower = englishName.trim().toLowerCase();
  // Strip trailing number variants: "cat 2" -> "cat"
  const stripped = lower.replace(/\s+\d+$/, '');
  // Convert spaces to hyphens to match filename convention
  return stripped.replace(/\s+/g, '-');
}

async function main() {
  // Get all themes with type="images" (excluding backgrounds, borders)
  const themes = await prisma.imageTheme.findMany({
    where: { type: 'images' },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' }
      }
    },
    orderBy: { name: 'asc' }
  });

  console.log(`Found ${themes.length} image themes`);

  const vocab = {};  // key -> { en: "Cat", de: "Katze", ... }
  const themeMap = {}; // key -> theme name (for reference)
  let totalImages = 0;
  let uniqueKeys = 0;

  for (const theme of themes) {
    for (const img of theme.images) {
      totalImages++;
      const translations = img.translations || {};
      const enName = translations.en || img.filename;
      const key = baseKey(enName);

      if (!vocab[key]) {
        vocab[key] = { _isNumbered: /\s+\d+$/.test(enName) };
        themeMap[key] = theme.name;
        uniqueKeys++;
      }

      const isNumbered = /\s+\d+$/.test(enName);

      // Prefer non-numbered entries over numbered ones (e.g., "Cat" over "Cat 2")
      for (const locale of LOCALES) {
        if (translations[locale]) {
          const existing = vocab[key][locale];
          if (!existing || (vocab[key]._isNumbered && !isNumbered)) {
            // Strip trailing number from translation: "Katze 2" -> "Katze"
            vocab[key][locale] = translations[locale].replace(/\s+\d+$/, '');
          }
        }
      }
      if (!isNumbered) vocab[key]._isNumbered = false;
    }
  }

  console.log(`Total images: ${totalImages}`);
  console.log(`Unique base words: ${uniqueKeys}`);

  // Sort by key for readability and clean up internal flags
  const sortedKeys = Object.keys(vocab).sort();
  const sortedVocab = {};
  for (const k of sortedKeys) {
    const { _isNumbered, ...rest } = vocab[k];
    sortedVocab[k] = { _theme: themeMap[k], ...rest };
  }

  // Write raw data
  const outDir = path.join(__dirname, 'v2-data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'image-vocabulary-raw.json');
  fs.writeFileSync(outPath, JSON.stringify(sortedVocab, null, 2), 'utf8');
  console.log(`Written to ${outPath}`);

  // Also output a stats summary
  const stats = {
    totalImages,
    uniqueKeys,
    themeCount: themes.length,
    themes: themes.map(t => ({ name: t.name, imageCount: t.images.length })),
    missingTranslations: {}
  };

  // Check for missing translations
  for (const locale of LOCALES) {
    const missing = sortedKeys.filter(k => !sortedVocab[k][locale]);
    if (missing.length > 0) {
      stats.missingTranslations[locale] = missing;
    }
  }

  const statsPath = path.join(outDir, 'image-vocabulary-stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');
  console.log(`Stats written to ${statsPath}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
