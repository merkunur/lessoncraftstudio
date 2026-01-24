/**
 * Border Import Script: Borders 4 Folder (Theme: borders_5)
 *
 * Usage: cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-borders-4.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const THEME_CONFIG = {
  name: 'borders_5',
  type: 'borders',
  sourceFolderName: 'BORDERS/borders 4',
  displayNames: {
    en: 'Borders 5', de: 'Rahmen 5', fr: 'Bordures 5', es: 'Marcos 5', it: 'Bordi 5',
    pt: 'Bordas 5', nl: 'Randen 5', sv: 'Ramar 5', da: 'Rammer 5', no: 'Rammer 5', fi: 'Kehykset 5'
  }
};

const IMAGE_TRANSLATIONS = {
  // Landscape borders 075-090
  'borders landscape 075': { en: 'Landscape Border 75', de: 'Querformat Rahmen 75', fr: 'Bordure paysage 75', es: 'Marco horizontal 75', it: 'Bordo orizzontale 75', pt: 'Borda paisagem 75', nl: 'Liggende rand 75', sv: 'Liggande ram 75', da: 'Landskabsramme 75', no: 'Liggende ramme 75', fi: 'Vaakakehys 75' },
  'borders landscape 076': { en: 'Landscape Border 76', de: 'Querformat Rahmen 76', fr: 'Bordure paysage 76', es: 'Marco horizontal 76', it: 'Bordo orizzontale 76', pt: 'Borda paisagem 76', nl: 'Liggende rand 76', sv: 'Liggande ram 76', da: 'Landskabsramme 76', no: 'Liggende ramme 76', fi: 'Vaakakehys 76' },
  'borders landscape 077': { en: 'Landscape Border 77', de: 'Querformat Rahmen 77', fr: 'Bordure paysage 77', es: 'Marco horizontal 77', it: 'Bordo orizzontale 77', pt: 'Borda paisagem 77', nl: 'Liggende rand 77', sv: 'Liggande ram 77', da: 'Landskabsramme 77', no: 'Liggende ramme 77', fi: 'Vaakakehys 77' },
  'borders landscape 078': { en: 'Landscape Border 78', de: 'Querformat Rahmen 78', fr: 'Bordure paysage 78', es: 'Marco horizontal 78', it: 'Bordo orizzontale 78', pt: 'Borda paisagem 78', nl: 'Liggende rand 78', sv: 'Liggande ram 78', da: 'Landskabsramme 78', no: 'Liggende ramme 78', fi: 'Vaakakehys 78' },
  'borders landscape 079': { en: 'Landscape Border 79', de: 'Querformat Rahmen 79', fr: 'Bordure paysage 79', es: 'Marco horizontal 79', it: 'Bordo orizzontale 79', pt: 'Borda paisagem 79', nl: 'Liggende rand 79', sv: 'Liggande ram 79', da: 'Landskabsramme 79', no: 'Liggende ramme 79', fi: 'Vaakakehys 79' },
  'borders landscape 080': { en: 'Landscape Border 80', de: 'Querformat Rahmen 80', fr: 'Bordure paysage 80', es: 'Marco horizontal 80', it: 'Bordo orizzontale 80', pt: 'Borda paisagem 80', nl: 'Liggende rand 80', sv: 'Liggande ram 80', da: 'Landskabsramme 80', no: 'Liggende ramme 80', fi: 'Vaakakehys 80' },
  'borders landscape 081': { en: 'Landscape Border 81', de: 'Querformat Rahmen 81', fr: 'Bordure paysage 81', es: 'Marco horizontal 81', it: 'Bordo orizzontale 81', pt: 'Borda paisagem 81', nl: 'Liggende rand 81', sv: 'Liggande ram 81', da: 'Landskabsramme 81', no: 'Liggende ramme 81', fi: 'Vaakakehys 81' },
  'borders landscape 082': { en: 'Landscape Border 82', de: 'Querformat Rahmen 82', fr: 'Bordure paysage 82', es: 'Marco horizontal 82', it: 'Bordo orizzontale 82', pt: 'Borda paisagem 82', nl: 'Liggende rand 82', sv: 'Liggande ram 82', da: 'Landskabsramme 82', no: 'Liggende ramme 82', fi: 'Vaakakehys 82' },
  'borders landscape 083': { en: 'Landscape Border 83', de: 'Querformat Rahmen 83', fr: 'Bordure paysage 83', es: 'Marco horizontal 83', it: 'Bordo orizzontale 83', pt: 'Borda paisagem 83', nl: 'Liggende rand 83', sv: 'Liggande ram 83', da: 'Landskabsramme 83', no: 'Liggende ramme 83', fi: 'Vaakakehys 83' },
  'borders landscape 084': { en: 'Landscape Border 84', de: 'Querformat Rahmen 84', fr: 'Bordure paysage 84', es: 'Marco horizontal 84', it: 'Bordo orizzontale 84', pt: 'Borda paisagem 84', nl: 'Liggende rand 84', sv: 'Liggande ram 84', da: 'Landskabsramme 84', no: 'Liggende ramme 84', fi: 'Vaakakehys 84' },
  'borders landscape 085': { en: 'Landscape Border 85', de: 'Querformat Rahmen 85', fr: 'Bordure paysage 85', es: 'Marco horizontal 85', it: 'Bordo orizzontale 85', pt: 'Borda paisagem 85', nl: 'Liggende rand 85', sv: 'Liggande ram 85', da: 'Landskabsramme 85', no: 'Liggende ramme 85', fi: 'Vaakakehys 85' },
  'borders landscape 086': { en: 'Landscape Border 86', de: 'Querformat Rahmen 86', fr: 'Bordure paysage 86', es: 'Marco horizontal 86', it: 'Bordo orizzontale 86', pt: 'Borda paisagem 86', nl: 'Liggende rand 86', sv: 'Liggande ram 86', da: 'Landskabsramme 86', no: 'Liggende ramme 86', fi: 'Vaakakehys 86' },
  'borders landscape 087': { en: 'Landscape Border 87', de: 'Querformat Rahmen 87', fr: 'Bordure paysage 87', es: 'Marco horizontal 87', it: 'Bordo orizzontale 87', pt: 'Borda paisagem 87', nl: 'Liggende rand 87', sv: 'Liggande ram 87', da: 'Landskabsramme 87', no: 'Liggende ramme 87', fi: 'Vaakakehys 87' },
  'borders landscape 088': { en: 'Landscape Border 88', de: 'Querformat Rahmen 88', fr: 'Bordure paysage 88', es: 'Marco horizontal 88', it: 'Bordo orizzontale 88', pt: 'Borda paisagem 88', nl: 'Liggende rand 88', sv: 'Liggande ram 88', da: 'Landskabsramme 88', no: 'Liggende ramme 88', fi: 'Vaakakehys 88' },
  'borders landscape 089': { en: 'Landscape Border 89', de: 'Querformat Rahmen 89', fr: 'Bordure paysage 89', es: 'Marco horizontal 89', it: 'Bordo orizzontale 89', pt: 'Borda paisagem 89', nl: 'Liggende rand 89', sv: 'Liggande ram 89', da: 'Landskabsramme 89', no: 'Liggende ramme 89', fi: 'Vaakakehys 89' },
  'borders landscape 090': { en: 'Landscape Border 90', de: 'Querformat Rahmen 90', fr: 'Bordure paysage 90', es: 'Marco horizontal 90', it: 'Bordo orizzontale 90', pt: 'Borda paisagem 90', nl: 'Liggende rand 90', sv: 'Liggande ram 90', da: 'Landskabsramme 90', no: 'Liggende ramme 90', fi: 'Vaakakehys 90' },
  // Portrait borders 062-076
  'borders portrait 062': { en: 'Portrait Border 62', de: 'Hochformat Rahmen 62', fr: 'Bordure portrait 62', es: 'Marco vertical 62', it: 'Bordo verticale 62', pt: 'Borda retrato 62', nl: 'Staande rand 62', sv: 'Stående ram 62', da: 'Portrætramme 62', no: 'Stående ramme 62', fi: 'Pystykehys 62' },
  'borders portrait 063': { en: 'Portrait Border 63', de: 'Hochformat Rahmen 63', fr: 'Bordure portrait 63', es: 'Marco vertical 63', it: 'Bordo verticale 63', pt: 'Borda retrato 63', nl: 'Staande rand 63', sv: 'Stående ram 63', da: 'Portrætramme 63', no: 'Stående ramme 63', fi: 'Pystykehys 63' },
  'borders portrait 064': { en: 'Portrait Border 64', de: 'Hochformat Rahmen 64', fr: 'Bordure portrait 64', es: 'Marco vertical 64', it: 'Bordo verticale 64', pt: 'Borda retrato 64', nl: 'Staande rand 64', sv: 'Stående ram 64', da: 'Portrætramme 64', no: 'Stående ramme 64', fi: 'Pystykehys 64' },
  'borders portrait 065': { en: 'Portrait Border 65', de: 'Hochformat Rahmen 65', fr: 'Bordure portrait 65', es: 'Marco vertical 65', it: 'Bordo verticale 65', pt: 'Borda retrato 65', nl: 'Staande rand 65', sv: 'Stående ram 65', da: 'Portrætramme 65', no: 'Stående ramme 65', fi: 'Pystykehys 65' },
  'borders portrait 066': { en: 'Portrait Border 66', de: 'Hochformat Rahmen 66', fr: 'Bordure portrait 66', es: 'Marco vertical 66', it: 'Bordo verticale 66', pt: 'Borda retrato 66', nl: 'Staande rand 66', sv: 'Stående ram 66', da: 'Portrætramme 66', no: 'Stående ramme 66', fi: 'Pystykehys 66' },
  'borders portrait 067': { en: 'Portrait Border 67', de: 'Hochformat Rahmen 67', fr: 'Bordure portrait 67', es: 'Marco vertical 67', it: 'Bordo verticale 67', pt: 'Borda retrato 67', nl: 'Staande rand 67', sv: 'Stående ram 67', da: 'Portrætramme 67', no: 'Stående ramme 67', fi: 'Pystykehys 67' },
  'borders portrait 068': { en: 'Portrait Border 68', de: 'Hochformat Rahmen 68', fr: 'Bordure portrait 68', es: 'Marco vertical 68', it: 'Bordo verticale 68', pt: 'Borda retrato 68', nl: 'Staande rand 68', sv: 'Stående ram 68', da: 'Portrætramme 68', no: 'Stående ramme 68', fi: 'Pystykehys 68' },
  'borders portrait 069': { en: 'Portrait Border 69', de: 'Hochformat Rahmen 69', fr: 'Bordure portrait 69', es: 'Marco vertical 69', it: 'Bordo verticale 69', pt: 'Borda retrato 69', nl: 'Staande rand 69', sv: 'Stående ram 69', da: 'Portrætramme 69', no: 'Stående ramme 69', fi: 'Pystykehys 69' },
  'borders portrait 070': { en: 'Portrait Border 70', de: 'Hochformat Rahmen 70', fr: 'Bordure portrait 70', es: 'Marco vertical 70', it: 'Bordo verticale 70', pt: 'Borda retrato 70', nl: 'Staande rand 70', sv: 'Stående ram 70', da: 'Portrætramme 70', no: 'Stående ramme 70', fi: 'Pystykehys 70' },
  'borders portrait 071': { en: 'Portrait Border 71', de: 'Hochformat Rahmen 71', fr: 'Bordure portrait 71', es: 'Marco vertical 71', it: 'Bordo verticale 71', pt: 'Borda retrato 71', nl: 'Staande rand 71', sv: 'Stående ram 71', da: 'Portrætramme 71', no: 'Stående ramme 71', fi: 'Pystykehys 71' },
  'borders portrait 072': { en: 'Portrait Border 72', de: 'Hochformat Rahmen 72', fr: 'Bordure portrait 72', es: 'Marco vertical 72', it: 'Bordo verticale 72', pt: 'Borda retrato 72', nl: 'Staande rand 72', sv: 'Stående ram 72', da: 'Portrætramme 72', no: 'Stående ramme 72', fi: 'Pystykehys 72' },
  'borders portrait 073': { en: 'Portrait Border 73', de: 'Hochformat Rahmen 73', fr: 'Bordure portrait 73', es: 'Marco vertical 73', it: 'Bordo verticale 73', pt: 'Borda retrato 73', nl: 'Staande rand 73', sv: 'Stående ram 73', da: 'Portrætramme 73', no: 'Stående ramme 73', fi: 'Pystykehys 73' },
  'borders portrait 074': { en: 'Portrait Border 74', de: 'Hochformat Rahmen 74', fr: 'Bordure portrait 74', es: 'Marco vertical 74', it: 'Bordo verticale 74', pt: 'Borda retrato 74', nl: 'Staande rand 74', sv: 'Stående ram 74', da: 'Portrætramme 74', no: 'Stående ramme 74', fi: 'Pystykehys 74' },
  'borders portrait 075': { en: 'Portrait Border 75', de: 'Hochformat Rahmen 75', fr: 'Bordure portrait 75', es: 'Marco vertical 75', it: 'Bordo verticale 75', pt: 'Borda retrato 75', nl: 'Staande rand 75', sv: 'Stående ram 75', da: 'Portrætramme 75', no: 'Stående ramme 75', fi: 'Pystykehys 75' },
  'borders portrait 076': { en: 'Portrait Border 76', de: 'Hochformat Rahmen 76', fr: 'Bordure portrait 76', es: 'Marco vertical 76', it: 'Bordo verticale 76', pt: 'Borda retrato 76', nl: 'Staande rand 76', sv: 'Stående ram 76', da: 'Portrætramme 76', no: 'Stående ramme 76', fi: 'Pystykehys 76' }
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
  console.log('Border Import Script: Borders (Folder 4 -> Theme borders_5)');
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
