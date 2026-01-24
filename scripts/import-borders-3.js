/**
 * Border Import Script: Borders 3 Folder
 *
 * Usage: cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-borders-3.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const THEME_CONFIG = {
  name: 'borders_4',
  type: 'borders',
  sourceFolderName: 'BORDERS/borders 3',
  displayNames: {
    en: 'Borders 4', de: 'Rahmen 4', fr: 'Bordures 4', es: 'Marcos 4', it: 'Bordi 4',
    pt: 'Bordas 4', nl: 'Randen 4', sv: 'Ramar 4', da: 'Rammer 4', no: 'Rammer 4', fi: 'Kehykset 4'
  }
};

const IMAGE_TRANSLATIONS = {
  // Landscape borders 059-074
  'borders landscape 059': { en: 'Landscape Border 59', de: 'Querformat Rahmen 59', fr: 'Bordure paysage 59', es: 'Marco horizontal 59', it: 'Bordo orizzontale 59', pt: 'Borda paisagem 59', nl: 'Liggende rand 59', sv: 'Liggande ram 59', da: 'Landskabsramme 59', no: 'Liggende ramme 59', fi: 'Vaakakehys 59' },
  'borders landscape 060': { en: 'Landscape Border 60', de: 'Querformat Rahmen 60', fr: 'Bordure paysage 60', es: 'Marco horizontal 60', it: 'Bordo orizzontale 60', pt: 'Borda paisagem 60', nl: 'Liggende rand 60', sv: 'Liggande ram 60', da: 'Landskabsramme 60', no: 'Liggende ramme 60', fi: 'Vaakakehys 60' },
  'borders landscape 061': { en: 'Landscape Border 61', de: 'Querformat Rahmen 61', fr: 'Bordure paysage 61', es: 'Marco horizontal 61', it: 'Bordo orizzontale 61', pt: 'Borda paisagem 61', nl: 'Liggende rand 61', sv: 'Liggande ram 61', da: 'Landskabsramme 61', no: 'Liggende ramme 61', fi: 'Vaakakehys 61' },
  'borders landscape 062': { en: 'Landscape Border 62', de: 'Querformat Rahmen 62', fr: 'Bordure paysage 62', es: 'Marco horizontal 62', it: 'Bordo orizzontale 62', pt: 'Borda paisagem 62', nl: 'Liggende rand 62', sv: 'Liggande ram 62', da: 'Landskabsramme 62', no: 'Liggende ramme 62', fi: 'Vaakakehys 62' },
  'borders landscape 063': { en: 'Landscape Border 63', de: 'Querformat Rahmen 63', fr: 'Bordure paysage 63', es: 'Marco horizontal 63', it: 'Bordo orizzontale 63', pt: 'Borda paisagem 63', nl: 'Liggende rand 63', sv: 'Liggande ram 63', da: 'Landskabsramme 63', no: 'Liggende ramme 63', fi: 'Vaakakehys 63' },
  'borders landscape 064': { en: 'Landscape Border 64', de: 'Querformat Rahmen 64', fr: 'Bordure paysage 64', es: 'Marco horizontal 64', it: 'Bordo orizzontale 64', pt: 'Borda paisagem 64', nl: 'Liggende rand 64', sv: 'Liggande ram 64', da: 'Landskabsramme 64', no: 'Liggende ramme 64', fi: 'Vaakakehys 64' },
  'borders landscape 065': { en: 'Landscape Border 65', de: 'Querformat Rahmen 65', fr: 'Bordure paysage 65', es: 'Marco horizontal 65', it: 'Bordo orizzontale 65', pt: 'Borda paisagem 65', nl: 'Liggende rand 65', sv: 'Liggande ram 65', da: 'Landskabsramme 65', no: 'Liggende ramme 65', fi: 'Vaakakehys 65' },
  'borders landscape 066': { en: 'Landscape Border 66', de: 'Querformat Rahmen 66', fr: 'Bordure paysage 66', es: 'Marco horizontal 66', it: 'Bordo orizzontale 66', pt: 'Borda paisagem 66', nl: 'Liggende rand 66', sv: 'Liggande ram 66', da: 'Landskabsramme 66', no: 'Liggende ramme 66', fi: 'Vaakakehys 66' },
  'borders landscape 067': { en: 'Landscape Border 67', de: 'Querformat Rahmen 67', fr: 'Bordure paysage 67', es: 'Marco horizontal 67', it: 'Bordo orizzontale 67', pt: 'Borda paisagem 67', nl: 'Liggende rand 67', sv: 'Liggande ram 67', da: 'Landskabsramme 67', no: 'Liggende ramme 67', fi: 'Vaakakehys 67' },
  'borders landscape 068': { en: 'Landscape Border 68', de: 'Querformat Rahmen 68', fr: 'Bordure paysage 68', es: 'Marco horizontal 68', it: 'Bordo orizzontale 68', pt: 'Borda paisagem 68', nl: 'Liggende rand 68', sv: 'Liggande ram 68', da: 'Landskabsramme 68', no: 'Liggende ramme 68', fi: 'Vaakakehys 68' },
  'borders landscape 069': { en: 'Landscape Border 69', de: 'Querformat Rahmen 69', fr: 'Bordure paysage 69', es: 'Marco horizontal 69', it: 'Bordo orizzontale 69', pt: 'Borda paisagem 69', nl: 'Liggende rand 69', sv: 'Liggande ram 69', da: 'Landskabsramme 69', no: 'Liggende ramme 69', fi: 'Vaakakehys 69' },
  'borders landscape 070': { en: 'Landscape Border 70', de: 'Querformat Rahmen 70', fr: 'Bordure paysage 70', es: 'Marco horizontal 70', it: 'Bordo orizzontale 70', pt: 'Borda paisagem 70', nl: 'Liggende rand 70', sv: 'Liggande ram 70', da: 'Landskabsramme 70', no: 'Liggende ramme 70', fi: 'Vaakakehys 70' },
  'borders landscape 071': { en: 'Landscape Border 71', de: 'Querformat Rahmen 71', fr: 'Bordure paysage 71', es: 'Marco horizontal 71', it: 'Bordo orizzontale 71', pt: 'Borda paisagem 71', nl: 'Liggende rand 71', sv: 'Liggande ram 71', da: 'Landskabsramme 71', no: 'Liggende ramme 71', fi: 'Vaakakehys 71' },
  'borders landscape 072': { en: 'Landscape Border 72', de: 'Querformat Rahmen 72', fr: 'Bordure paysage 72', es: 'Marco horizontal 72', it: 'Bordo orizzontale 72', pt: 'Borda paisagem 72', nl: 'Liggende rand 72', sv: 'Liggande ram 72', da: 'Landskabsramme 72', no: 'Liggende ramme 72', fi: 'Vaakakehys 72' },
  'borders landscape 073': { en: 'Landscape Border 73', de: 'Querformat Rahmen 73', fr: 'Bordure paysage 73', es: 'Marco horizontal 73', it: 'Bordo orizzontale 73', pt: 'Borda paisagem 73', nl: 'Liggende rand 73', sv: 'Liggande ram 73', da: 'Landskabsramme 73', no: 'Liggende ramme 73', fi: 'Vaakakehys 73' },
  'borders landscape 074': { en: 'Landscape Border 74', de: 'Querformat Rahmen 74', fr: 'Bordure paysage 74', es: 'Marco horizontal 74', it: 'Bordo orizzontale 74', pt: 'Borda paisagem 74', nl: 'Liggende rand 74', sv: 'Liggande ram 74', da: 'Landskabsramme 74', no: 'Liggende ramme 74', fi: 'Vaakakehys 74' },
  // Portrait borders 048-061
  'borders portrait 048': { en: 'Portrait Border 48', de: 'Hochformat Rahmen 48', fr: 'Bordure portrait 48', es: 'Marco vertical 48', it: 'Bordo verticale 48', pt: 'Borda retrato 48', nl: 'Staande rand 48', sv: 'Stående ram 48', da: 'Portrætramme 48', no: 'Stående ramme 48', fi: 'Pystykehys 48' },
  'borders portrait 049': { en: 'Portrait Border 49', de: 'Hochformat Rahmen 49', fr: 'Bordure portrait 49', es: 'Marco vertical 49', it: 'Bordo verticale 49', pt: 'Borda retrato 49', nl: 'Staande rand 49', sv: 'Stående ram 49', da: 'Portrætramme 49', no: 'Stående ramme 49', fi: 'Pystykehys 49' },
  'borders portrait 050': { en: 'Portrait Border 50', de: 'Hochformat Rahmen 50', fr: 'Bordure portrait 50', es: 'Marco vertical 50', it: 'Bordo verticale 50', pt: 'Borda retrato 50', nl: 'Staande rand 50', sv: 'Stående ram 50', da: 'Portrætramme 50', no: 'Stående ramme 50', fi: 'Pystykehys 50' },
  'borders portrait 051': { en: 'Portrait Border 51', de: 'Hochformat Rahmen 51', fr: 'Bordure portrait 51', es: 'Marco vertical 51', it: 'Bordo verticale 51', pt: 'Borda retrato 51', nl: 'Staande rand 51', sv: 'Stående ram 51', da: 'Portrætramme 51', no: 'Stående ramme 51', fi: 'Pystykehys 51' },
  'borders portrait 052': { en: 'Portrait Border 52', de: 'Hochformat Rahmen 52', fr: 'Bordure portrait 52', es: 'Marco vertical 52', it: 'Bordo verticale 52', pt: 'Borda retrato 52', nl: 'Staande rand 52', sv: 'Stående ram 52', da: 'Portrætramme 52', no: 'Stående ramme 52', fi: 'Pystykehys 52' },
  'borders portrait 053': { en: 'Portrait Border 53', de: 'Hochformat Rahmen 53', fr: 'Bordure portrait 53', es: 'Marco vertical 53', it: 'Bordo verticale 53', pt: 'Borda retrato 53', nl: 'Staande rand 53', sv: 'Stående ram 53', da: 'Portrætramme 53', no: 'Stående ramme 53', fi: 'Pystykehys 53' },
  'borders portrait 054': { en: 'Portrait Border 54', de: 'Hochformat Rahmen 54', fr: 'Bordure portrait 54', es: 'Marco vertical 54', it: 'Bordo verticale 54', pt: 'Borda retrato 54', nl: 'Staande rand 54', sv: 'Stående ram 54', da: 'Portrætramme 54', no: 'Stående ramme 54', fi: 'Pystykehys 54' },
  'borders portrait 055': { en: 'Portrait Border 55', de: 'Hochformat Rahmen 55', fr: 'Bordure portrait 55', es: 'Marco vertical 55', it: 'Bordo verticale 55', pt: 'Borda retrato 55', nl: 'Staande rand 55', sv: 'Stående ram 55', da: 'Portrætramme 55', no: 'Stående ramme 55', fi: 'Pystykehys 55' },
  'borders portrait 056': { en: 'Portrait Border 56', de: 'Hochformat Rahmen 56', fr: 'Bordure portrait 56', es: 'Marco vertical 56', it: 'Bordo verticale 56', pt: 'Borda retrato 56', nl: 'Staande rand 56', sv: 'Stående ram 56', da: 'Portrætramme 56', no: 'Stående ramme 56', fi: 'Pystykehys 56' },
  'borders portrait 057': { en: 'Portrait Border 57', de: 'Hochformat Rahmen 57', fr: 'Bordure portrait 57', es: 'Marco vertical 57', it: 'Bordo verticale 57', pt: 'Borda retrato 57', nl: 'Staande rand 57', sv: 'Stående ram 57', da: 'Portrætramme 57', no: 'Stående ramme 57', fi: 'Pystykehys 57' },
  'borders portrait 058': { en: 'Portrait Border 58', de: 'Hochformat Rahmen 58', fr: 'Bordure portrait 58', es: 'Marco vertical 58', it: 'Bordo verticale 58', pt: 'Borda retrato 58', nl: 'Staande rand 58', sv: 'Stående ram 58', da: 'Portrætramme 58', no: 'Stående ramme 58', fi: 'Pystykehys 58' },
  'borders portrait 059': { en: 'Portrait Border 59', de: 'Hochformat Rahmen 59', fr: 'Bordure portrait 59', es: 'Marco vertical 59', it: 'Bordo verticale 59', pt: 'Borda retrato 59', nl: 'Staande rand 59', sv: 'Stående ram 59', da: 'Portrætramme 59', no: 'Stående ramme 59', fi: 'Pystykehys 59' },
  'borders portrait 060': { en: 'Portrait Border 60', de: 'Hochformat Rahmen 60', fr: 'Bordure portrait 60', es: 'Marco vertical 60', it: 'Bordo verticale 60', pt: 'Borda retrato 60', nl: 'Staande rand 60', sv: 'Stående ram 60', da: 'Portrætramme 60', no: 'Stående ramme 60', fi: 'Pystykehys 60' },
  'borders portrait 061': { en: 'Portrait Border 61', de: 'Hochformat Rahmen 61', fr: 'Bordure portrait 61', es: 'Marco vertical 61', it: 'Bordo verticale 61', pt: 'Borda retrato 61', nl: 'Staande rand 61', sv: 'Stående ram 61', da: 'Portrætramme 61', no: 'Stående ramme 61', fi: 'Pystykehys 61' }
};

const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images/borders', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images/borders', THEME_CONFIG.name);
const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  await image.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
  const outputMetadata = await sharp(outputPath).metadata();
  return { width: outputMetadata.width, height: outputMetadata.height, size: fs.statSync(outputPath).size };
}

async function main() {
  console.log('============================================================');
  console.log('Border Import Script: Borders (Folder 3)');
  console.log('============================================================\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });
  if (!fs.existsSync(STANDALONE_DIR)) fs.mkdirSync(STANDALONE_DIR, { recursive: true });

  let theme = await prisma.imageTheme.findFirst({ where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type } });
  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({ where: { type: THEME_CONFIG.type }, _max: { sortOrder: true } });
    theme = await prisma.imageTheme.create({ data: { name: THEME_CONFIG.name, displayNames: THEME_CONFIG.displayNames, type: THEME_CONFIG.type, sortOrder: (maxSortOrder._max.sortOrder || 0) + 1 } });
    console.log(`Created new theme (id: ${theme.id})`);
  } else {
    console.log(`Using existing theme (id: ${theme.id})`);
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0, skipCount = 0, errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase().trim();
    console.log(`Processing: ${file}`);

    const translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) { console.log(`  WARNING: No translations, skipping`); skipCount++; continue; }

    try {
      const inputPath = path.join(SOURCE_DIR, file);
      const newFilename = generateUniqueFilename(baseName);
      const outputPath = path.join(DEST_DIR, newFilename);
      const { width, height, size } = await processImage(inputPath, outputPath);
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));
      console.log(`  Saved: ${newFilename} (${width}x${height})`);

      const existing = await prisma.imageLibraryItem.findFirst({ where: { themeId: theme.id, translations: { path: ['en'], equals: translations.en } } });
      if (existing) { console.log(`  Already in database, skipping`); skipCount++; continue; }

      const maxSort = await prisma.imageLibraryItem.aggregate({ where: { themeId: theme.id }, _max: { sortOrder: true } });
      await prisma.imageLibraryItem.create({ data: { themeId: theme.id, filename: newFilename, filePath: `/images/borders/${THEME_CONFIG.name}/${newFilename}`, translations, fileSize: size, mimeType: 'image/webp', width, height, sortOrder: (maxSort._max.sortOrder || 0) + 1 } });
      console.log(`  Created database record`);
      successCount++;
    } catch (error) { console.log(`  ERROR: ${error.message}`); errorCount++; }
  }

  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) { const src = path.join(DEST_DIR, file); const dest = path.join(STANDALONE_DIR, file); if (!fs.existsSync(dest)) fs.copyFileSync(src, dest); }
  console.log(`\nCopied ${destFiles.length} files to standalone`);
  console.log(`\nSuccess: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);
  await prisma.$disconnect();
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
