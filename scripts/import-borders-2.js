/**
 * Border Import Script: Borders 2 Folder
 *
 * Usage: cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-borders-2.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const THEME_CONFIG = {
  name: 'borders_3',
  type: 'borders',
  sourceFolderName: 'BORDERS/borders 2',
  displayNames: {
    en: 'Borders 3', de: 'Rahmen 3', fr: 'Bordures 3', es: 'Marcos 3', it: 'Bordi 3',
    pt: 'Bordas 3', nl: 'Randen 3', sv: 'Ramar 3', da: 'Rammer 3', no: 'Rammer 3', fi: 'Kehykset 3'
  }
};

const IMAGE_TRANSLATIONS = {
  // Landscape borders 046-058
  'borders landscape 046': { en: 'Landscape Border 46', de: 'Querformat Rahmen 46', fr: 'Bordure paysage 46', es: 'Marco horizontal 46', it: 'Bordo orizzontale 46', pt: 'Borda paisagem 46', nl: 'Liggende rand 46', sv: 'Liggande ram 46', da: 'Landskabsramme 46', no: 'Liggende ramme 46', fi: 'Vaakakehys 46' },
  'borders landscape 047': { en: 'Landscape Border 47', de: 'Querformat Rahmen 47', fr: 'Bordure paysage 47', es: 'Marco horizontal 47', it: 'Bordo orizzontale 47', pt: 'Borda paisagem 47', nl: 'Liggende rand 47', sv: 'Liggande ram 47', da: 'Landskabsramme 47', no: 'Liggende ramme 47', fi: 'Vaakakehys 47' },
  'borders landscape 048': { en: 'Landscape Border 48', de: 'Querformat Rahmen 48', fr: 'Bordure paysage 48', es: 'Marco horizontal 48', it: 'Bordo orizzontale 48', pt: 'Borda paisagem 48', nl: 'Liggende rand 48', sv: 'Liggande ram 48', da: 'Landskabsramme 48', no: 'Liggende ramme 48', fi: 'Vaakakehys 48' },
  'borders landscape 049': { en: 'Landscape Border 49', de: 'Querformat Rahmen 49', fr: 'Bordure paysage 49', es: 'Marco horizontal 49', it: 'Bordo orizzontale 49', pt: 'Borda paisagem 49', nl: 'Liggende rand 49', sv: 'Liggande ram 49', da: 'Landskabsramme 49', no: 'Liggende ramme 49', fi: 'Vaakakehys 49' },
  'borders landscape 050': { en: 'Landscape Border 50', de: 'Querformat Rahmen 50', fr: 'Bordure paysage 50', es: 'Marco horizontal 50', it: 'Bordo orizzontale 50', pt: 'Borda paisagem 50', nl: 'Liggende rand 50', sv: 'Liggande ram 50', da: 'Landskabsramme 50', no: 'Liggende ramme 50', fi: 'Vaakakehys 50' },
  'borders landscape 051': { en: 'Landscape Border 51', de: 'Querformat Rahmen 51', fr: 'Bordure paysage 51', es: 'Marco horizontal 51', it: 'Bordo orizzontale 51', pt: 'Borda paisagem 51', nl: 'Liggende rand 51', sv: 'Liggande ram 51', da: 'Landskabsramme 51', no: 'Liggende ramme 51', fi: 'Vaakakehys 51' },
  'borders landscape 052': { en: 'Landscape Border 52', de: 'Querformat Rahmen 52', fr: 'Bordure paysage 52', es: 'Marco horizontal 52', it: 'Bordo orizzontale 52', pt: 'Borda paisagem 52', nl: 'Liggende rand 52', sv: 'Liggande ram 52', da: 'Landskabsramme 52', no: 'Liggende ramme 52', fi: 'Vaakakehys 52' },
  'borders landscape 053': { en: 'Landscape Border 53', de: 'Querformat Rahmen 53', fr: 'Bordure paysage 53', es: 'Marco horizontal 53', it: 'Bordo orizzontale 53', pt: 'Borda paisagem 53', nl: 'Liggende rand 53', sv: 'Liggande ram 53', da: 'Landskabsramme 53', no: 'Liggende ramme 53', fi: 'Vaakakehys 53' },
  'borders landscape 054': { en: 'Landscape Border 54', de: 'Querformat Rahmen 54', fr: 'Bordure paysage 54', es: 'Marco horizontal 54', it: 'Bordo orizzontale 54', pt: 'Borda paisagem 54', nl: 'Liggende rand 54', sv: 'Liggande ram 54', da: 'Landskabsramme 54', no: 'Liggende ramme 54', fi: 'Vaakakehys 54' },
  'borders landscape 055': { en: 'Landscape Border 55', de: 'Querformat Rahmen 55', fr: 'Bordure paysage 55', es: 'Marco horizontal 55', it: 'Bordo orizzontale 55', pt: 'Borda paisagem 55', nl: 'Liggende rand 55', sv: 'Liggande ram 55', da: 'Landskabsramme 55', no: 'Liggende ramme 55', fi: 'Vaakakehys 55' },
  'borders landscape 056': { en: 'Landscape Border 56', de: 'Querformat Rahmen 56', fr: 'Bordure paysage 56', es: 'Marco horizontal 56', it: 'Bordo orizzontale 56', pt: 'Borda paisagem 56', nl: 'Liggende rand 56', sv: 'Liggande ram 56', da: 'Landskabsramme 56', no: 'Liggende ramme 56', fi: 'Vaakakehys 56' },
  'borders landscape 057': { en: 'Landscape Border 57', de: 'Querformat Rahmen 57', fr: 'Bordure paysage 57', es: 'Marco horizontal 57', it: 'Bordo orizzontale 57', pt: 'Borda paisagem 57', nl: 'Liggende rand 57', sv: 'Liggande ram 57', da: 'Landskabsramme 57', no: 'Liggende ramme 57', fi: 'Vaakakehys 57' },
  'borders landscape 058': { en: 'Landscape Border 58', de: 'Querformat Rahmen 58', fr: 'Bordure paysage 58', es: 'Marco horizontal 58', it: 'Bordo orizzontale 58', pt: 'Borda paisagem 58', nl: 'Liggende rand 58', sv: 'Liggande ram 58', da: 'Landskabsramme 58', no: 'Liggende ramme 58', fi: 'Vaakakehys 58' },
  // Portrait borders 034-047
  'borders portrait 034': { en: 'Portrait Border 34', de: 'Hochformat Rahmen 34', fr: 'Bordure portrait 34', es: 'Marco vertical 34', it: 'Bordo verticale 34', pt: 'Borda retrato 34', nl: 'Staande rand 34', sv: 'Stående ram 34', da: 'Portrætramme 34', no: 'Stående ramme 34', fi: 'Pystykehys 34' },
  'borders portrait 035': { en: 'Portrait Border 35', de: 'Hochformat Rahmen 35', fr: 'Bordure portrait 35', es: 'Marco vertical 35', it: 'Bordo verticale 35', pt: 'Borda retrato 35', nl: 'Staande rand 35', sv: 'Stående ram 35', da: 'Portrætramme 35', no: 'Stående ramme 35', fi: 'Pystykehys 35' },
  'borders portrait 036': { en: 'Portrait Border 36', de: 'Hochformat Rahmen 36', fr: 'Bordure portrait 36', es: 'Marco vertical 36', it: 'Bordo verticale 36', pt: 'Borda retrato 36', nl: 'Staande rand 36', sv: 'Stående ram 36', da: 'Portrætramme 36', no: 'Stående ramme 36', fi: 'Pystykehys 36' },
  'borders portrait 037': { en: 'Portrait Border 37', de: 'Hochformat Rahmen 37', fr: 'Bordure portrait 37', es: 'Marco vertical 37', it: 'Bordo verticale 37', pt: 'Borda retrato 37', nl: 'Staande rand 37', sv: 'Stående ram 37', da: 'Portrætramme 37', no: 'Stående ramme 37', fi: 'Pystykehys 37' },
  'borders portrait 038': { en: 'Portrait Border 38', de: 'Hochformat Rahmen 38', fr: 'Bordure portrait 38', es: 'Marco vertical 38', it: 'Bordo verticale 38', pt: 'Borda retrato 38', nl: 'Staande rand 38', sv: 'Stående ram 38', da: 'Portrætramme 38', no: 'Stående ramme 38', fi: 'Pystykehys 38' },
  'borders portrait 039': { en: 'Portrait Border 39', de: 'Hochformat Rahmen 39', fr: 'Bordure portrait 39', es: 'Marco vertical 39', it: 'Bordo verticale 39', pt: 'Borda retrato 39', nl: 'Staande rand 39', sv: 'Stående ram 39', da: 'Portrætramme 39', no: 'Stående ramme 39', fi: 'Pystykehys 39' },
  'borders portrait 040': { en: 'Portrait Border 40', de: 'Hochformat Rahmen 40', fr: 'Bordure portrait 40', es: 'Marco vertical 40', it: 'Bordo verticale 40', pt: 'Borda retrato 40', nl: 'Staande rand 40', sv: 'Stående ram 40', da: 'Portrætramme 40', no: 'Stående ramme 40', fi: 'Pystykehys 40' },
  'borders portrait 041': { en: 'Portrait Border 41', de: 'Hochformat Rahmen 41', fr: 'Bordure portrait 41', es: 'Marco vertical 41', it: 'Bordo verticale 41', pt: 'Borda retrato 41', nl: 'Staande rand 41', sv: 'Stående ram 41', da: 'Portrætramme 41', no: 'Stående ramme 41', fi: 'Pystykehys 41' },
  'borders portrait 042': { en: 'Portrait Border 42', de: 'Hochformat Rahmen 42', fr: 'Bordure portrait 42', es: 'Marco vertical 42', it: 'Bordo verticale 42', pt: 'Borda retrato 42', nl: 'Staande rand 42', sv: 'Stående ram 42', da: 'Portrætramme 42', no: 'Stående ramme 42', fi: 'Pystykehys 42' },
  'borders portrait 043': { en: 'Portrait Border 43', de: 'Hochformat Rahmen 43', fr: 'Bordure portrait 43', es: 'Marco vertical 43', it: 'Bordo verticale 43', pt: 'Borda retrato 43', nl: 'Staande rand 43', sv: 'Stående ram 43', da: 'Portrætramme 43', no: 'Stående ramme 43', fi: 'Pystykehys 43' },
  'borders portrait 044': { en: 'Portrait Border 44', de: 'Hochformat Rahmen 44', fr: 'Bordure portrait 44', es: 'Marco vertical 44', it: 'Bordo verticale 44', pt: 'Borda retrato 44', nl: 'Staande rand 44', sv: 'Stående ram 44', da: 'Portrætramme 44', no: 'Stående ramme 44', fi: 'Pystykehys 44' },
  'borders portrait 045': { en: 'Portrait Border 45', de: 'Hochformat Rahmen 45', fr: 'Bordure portrait 45', es: 'Marco vertical 45', it: 'Bordo verticale 45', pt: 'Borda retrato 45', nl: 'Staande rand 45', sv: 'Stående ram 45', da: 'Portrætramme 45', no: 'Stående ramme 45', fi: 'Pystykehys 45' },
  'borders portrait 046': { en: 'Portrait Border 46', de: 'Hochformat Rahmen 46', fr: 'Bordure portrait 46', es: 'Marco vertical 46', it: 'Bordo verticale 46', pt: 'Borda retrato 46', nl: 'Staande rand 46', sv: 'Stående ram 46', da: 'Portrætramme 46', no: 'Stående ramme 46', fi: 'Pystykehys 46' },
  'borders portrait 047': { en: 'Portrait Border 47', de: 'Hochformat Rahmen 47', fr: 'Bordure portrait 47', es: 'Marco vertical 47', it: 'Bordo verticale 47', pt: 'Borda retrato 47', nl: 'Staande rand 47', sv: 'Stående ram 47', da: 'Portrætramme 47', no: 'Stående ramme 47', fi: 'Pystykehys 47' }
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
  console.log('Border Import Script: Borders (Folder 2)');
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
