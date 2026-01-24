# IMAGE LIBRARY - Complete Reference Guide

Reference document for adding images and translations to LessonCraftStudio content manager.

**Source**: `REFERENCE CONTENT MANAGERS/content-manager-v2.html`
**Working Example**: `scripts/import-4th-of-july-images.js`

---

# PART 1: PROVEN IMAGE IMPORT PROCESS

This is the EXACT process that works. Follow it step-by-step.

---

## Step 1: Prepare Your Images Locally

### Folder Structure
```
image library/
  {Theme Name}/           <- Folder name becomes theme display name
    image1.png
    image2.png
    ...
```

### Example
```
image library/
  4th of July/
    balloon.png
    baseball.png
    cake.png
    ...
```

### File Requirements
- **Max size**: 10MB per image (will be optimized to smaller)
- **Formats**: PNG, JPG, JPEG, WebP, SVG
- **Naming**: Use descriptive names (becomes basis for translations)

---

## Step 2: Create the Import Script

Create a new file: `scripts/import-{theme-name}-images.js`

### COMPLETE SCRIPT TEMPLATE (Copy and modify):

```javascript
/**
 * Import Script: {THEME NAME} Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-{theme-name}-images.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Detect environment and set paths
const isServer = fs.existsSync('/opt/lessoncraftstudio');
let frontendRoot;

if (isServer) {
  frontendRoot = '/opt/lessoncraftstudio/frontend';
} else {
  frontendRoot = path.resolve(__dirname, '..', 'frontend');
}

process.chdir(frontendRoot);

// Load dependencies from frontend
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'));

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION - MODIFY THIS SECTION FOR EACH IMPORT
// ============================================================

const THEME_CONFIG = {
  name: 'theme_id_here',      // lowercase, underscores, no spaces
  type: 'images',             // 'images', 'borders', 'backgrounds', 'train', 'worksheet'
  displayNames: {
    en: 'Theme Name',         // American English
    de: 'German Name',
    fr: 'French Name',
    es: 'Spanish Name',       // Mexican Spanish
    it: 'Italian Name',
    pt: 'Portuguese Name',    // Brazilian Portuguese
    nl: 'Dutch Name',
    sv: 'Swedish Name',
    da: 'Danish Name',
    no: 'Norwegian Name',
    fi: 'Finnish Name'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'image1.png': {
    en: 'English Name',       // American English
    de: 'German Name',
    fr: 'French Name',
    es: 'Spanish Name',       // Mexican Spanish
    it: 'Italian Name',
    pt: 'Portuguese Name',    // Brazilian Portuguese
    nl: 'Dutch Name',
    sv: 'Swedish Name',
    da: 'Danish Name',
    no: 'Norwegian Name',
    fi: 'Finnish Name'
  },
  'image2.png': {
    en: 'English Name',
    de: 'German Name',
    fr: 'French Name',
    es: 'Spanish Name',
    it: 'Italian Name',
    pt: 'Portuguese Name',
    nl: 'Dutch Name',
    sv: 'Swedish Name',
    da: 'Danish Name',
    no: 'Norwegian Name',
    fi: 'Finnish Name'
  }
  // Add more images...
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const randomStr = crypto.randomBytes(4).toString('hex');
  const baseName = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${baseName}-${timestamp}-${randomStr}.webp`;
}

async function optimizeImage(inputBuffer) {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (metadata.format === 'svg') {
    return {
      buffer: inputBuffer,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'svg'
    };
  }

  let pipeline = image;
  if (metadata.width > 800 || metadata.height > 800) {
    pipeline = pipeline.resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const outputBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    width: outputMetadata.width,
    height: outputMetadata.height,
    format: 'webp'
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log(`Image Import Script: ${THEME_CONFIG.displayNames.en}`);
  console.log('='.repeat(60));

  // Resolve paths
  let projectRoot, sourceDir, destDir;
  const sourceFolderName = THEME_CONFIG.displayNames.en; // Use English name for folder

  if (isServer) {
    projectRoot = '/opt/lessoncraftstudio';
    sourceDir = path.join(projectRoot, 'image library', sourceFolderName);
    destDir = path.join(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  } else {
    projectRoot = path.resolve(__dirname, '..');
    sourceDir = path.resolve(projectRoot, 'image library', sourceFolderName);
    destDir = path.resolve(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  }

  console.log(`\nSource: ${sourceDir}`);
  console.log(`Destination: ${destDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`\nERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created destination directory`);
  }

  try {
    // Step 1: Create or update theme
    console.log('\n--- Step 1: Creating/Updating Theme ---');

    let theme = await prisma.imageTheme.findFirst({
      where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
    });

    if (theme) {
      console.log(`Theme exists (id: ${theme.id}), updating...`);
      theme = await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames: THEME_CONFIG.displayNames }
      });
    } else {
      theme = await prisma.imageTheme.create({
        data: {
          name: THEME_CONFIG.name,
          type: THEME_CONFIG.type,
          displayNames: THEME_CONFIG.displayNames,
          sortOrder: 0
        }
      });
      console.log(`Created new theme (id: ${theme.id})`);
    }

    // Step 2: Process images
    console.log('\n--- Step 2: Processing Images ---');

    const files = fs.readdirSync(sourceDir).filter(f =>
      /\.(png|jpg|jpeg|webp|svg)$/i.test(f)
    );

    console.log(`Found ${files.length} image files`);

    let successCount = 0, skipCount = 0, errorCount = 0;

    const maxSortOrder = await prisma.imageLibraryItem.aggregate({
      where: { themeId: theme.id },
      _max: { sortOrder: true }
    });
    let currentSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    for (const filename of files) {
      console.log(`\nProcessing: ${filename}`);

      const translations = IMAGE_TRANSLATIONS[filename];
      if (!translations) {
        console.log(`  WARNING: No translations for "${filename}", skipping`);
        skipCount++;
        continue;
      }

      try {
        const inputBuffer = fs.readFileSync(path.join(sourceDir, filename));
        const optimized = await optimizeImage(inputBuffer);
        const newFilename = generateUniqueFilename(filename);
        const destPath = path.join(destDir, newFilename);
        const relativeFilePath = `/images/${THEME_CONFIG.name}/${newFilename}`;

        fs.writeFileSync(destPath, optimized.buffer);
        console.log(`  Saved: ${newFilename} (${optimized.width}x${optimized.height})`);

        // Check if already exists
        const existing = await prisma.imageLibraryItem.findFirst({
          where: {
            themeId: theme.id,
            translations: { path: ['en'], equals: translations.en }
          }
        });

        if (existing) {
          await prisma.imageLibraryItem.update({
            where: { id: existing.id },
            data: {
              translations,
              filePath: relativeFilePath,
              filename: newFilename,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height
            }
          });
          console.log(`  Updated existing record`);
        } else {
          await prisma.imageLibraryItem.create({
            data: {
              themeId: theme.id,
              filename: newFilename,
              filePath: relativeFilePath,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height,
              translations,
              sortOrder: currentSortOrder++
            }
          });
          console.log(`  Created database record`);
        }

        successCount++;
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        errorCount++;
      }
    }

    // Step 3: Sync to standalone
    if (isServer) {
      const standaloneDir = path.join(projectRoot, 'frontend', '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- Syncing to standalone build ---`);
      if (!fs.existsSync(standaloneDir)) {
        fs.mkdirSync(standaloneDir, { recursive: true });
      }
      const destFiles = fs.readdirSync(destDir);
      for (const file of destFiles) {
        fs.copyFileSync(path.join(destDir, file), path.join(standaloneDir, file));
      }
      console.log(`Copied ${destFiles.length} files to standalone`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
    console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
```

---

## Step 3: Fill in the Translations

### Theme displayNames
```javascript
displayNames: {
  en: 'Theme Name',         // American English
  de: 'German Translation',
  fr: 'French Translation',
  es: 'Mexican Spanish',    // USE MEXICAN SPANISH
  it: 'Italian Translation',
  pt: 'Brazilian Portuguese', // USE BRAZILIAN PORTUGUESE
  nl: 'Dutch Translation',
  sv: 'Swedish Translation',
  da: 'Danish Translation',
  no: 'Norwegian Translation',
  fi: 'Finnish Translation'
}
```

### Image Translations (for each image)
```javascript
'filename.png': {
  en: 'English',            // American English
  de: 'German',
  fr: 'French',
  es: 'Mexican Spanish',    // USE MEXICAN SPANISH
  it: 'Italian',
  pt: 'Brazilian Portuguese', // USE BRAZILIAN PORTUGUESE
  nl: 'Dutch',
  sv: 'Swedish',
  da: 'Danish',
  no: 'Norwegian',
  fi: 'Finnish'
}
```

### CRITICAL: Filename Must Match Exactly!
The key in IMAGE_TRANSLATIONS must be the EXACT filename including extension:
- `'balloon.png'` - Correct
- `'balloon'` - WRONG
- `'Balloon.png'` - WRONG (case sensitive)

---

## Step 4: Upload to Server

### 4.1 Upload the Script
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" "C:\Users\rkgen\lessoncraftstudio\scripts\import-{theme-name}-images.js" root@65.108.5.250:"/opt/lessoncraftstudio/scripts/"
```

### 4.2 Create Image Folder on Server
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "mkdir -p '/opt/lessoncraftstudio/image library/{Theme Display Name}'"
```

### 4.3 Upload Images
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" "C:\Users\rkgen\lessoncraftstudio\image library\{Theme Display Name}\*.png" "root@65.108.5.250:/opt/lessoncraftstudio/image library/{Theme Display Name}/"
```

---

## Step 5: Run the Import

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio && node scripts/import-{theme-name}-images.js"
```

### Expected Output
```
============================================================
Image Import Script: {Theme Name}
============================================================

Source: /opt/lessoncraftstudio/image library/{Theme Name}
Destination: /opt/lessoncraftstudio/frontend/public/images/{theme_id}

--- Step 1: Creating/Updating Theme ---
Created new theme (id: cmxxxxxxxxxxxxxxx)

--- Step 2: Processing Images ---
Found X image files

Processing: image1.png
  Saved: image1-1234567890-abcd1234.webp (800x800)
  Created database record

...

============================================================
IMPORT COMPLETE
============================================================
Theme: theme_id (cmxxxxxxxxxxxxxxx)
Success: X | Skipped: 0 | Errors: 0
```

---

## Step 6: Restart Server

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "pm2 restart lessoncraftstudio"
```

---

## Step 7: Verify

### Check files exist
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "ls -la /opt/lessoncraftstudio/frontend/public/images/{theme_id}/"
```

### Check standalone sync
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "ls /opt/lessoncraftstudio/frontend/.next/standalone/public/images/{theme_id}/ | wc -l"
```

---

# PART 2: REFERENCE INFORMATION

---

## Language Codes (11 Total)

| Code | Language | Variant | Flag |
|------|----------|---------|------|
| en | English | **American** | US |
| de | German | Standard | DE |
| fr | French | Standard | FR |
| es | Spanish | **Mexican** | MX |
| it | Italian | Standard | IT |
| pt | Portuguese | **Brazilian** | BR |
| nl | Dutch | Standard | NL |
| sv | Swedish | Standard | SE |
| da | Danish | Standard | DK |
| no | Norwegian | Standard | NO |
| fi | Finnish | Standard | FI |

---

## Database Schema

### ImageTheme Table
```sql
CREATE TABLE image_themes (
  id TEXT PRIMARY KEY,           -- CUID (e.g., "cmjt5xd5h0000gx851nwfhtqn")
  name TEXT UNIQUE NOT NULL,     -- Theme ID (e.g., "4th_of_july")
  display_names JSONB NOT NULL,  -- {en: "...", de: "...", ...}
  type TEXT DEFAULT 'images',    -- 'images', 'borders', 'backgrounds', 'train', 'worksheet'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### ImageLibraryItem Table
```sql
CREATE TABLE image_library_items (
  id TEXT PRIMARY KEY,           -- CUID
  theme_id TEXT REFERENCES image_themes(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,        -- Generated filename (e.g., "balloon-1234567890-abcd.webp")
  file_path TEXT NOT NULL,       -- Relative path (e.g., "/images/4th_of_july/balloon-xxx.webp")
  file_size INTEGER,             -- Bytes
  mime_type TEXT,                -- "image/webp" or "image/svg+xml"
  width INTEGER,
  height INTEGER,
  translations JSONB NOT NULL,   -- {en: "Balloon", de: "Ballon", ...}
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## File Path Structure

### Server Paths
```
/opt/lessoncraftstudio/
  image library/                        <- Source images (organized by theme name)
    {Theme Display Name}/
      image1.png
      image2.png
  frontend/
    public/
      images/
        {theme_id}/                     <- Processed images (WebP)
          image1-timestamp-random.webp
    .next/
      standalone/
        public/
          images/
            {theme_id}/                 <- Copy for production
              image1-timestamp-random.webp
```

### Local Paths
```
C:\Users\rkgen\lessoncraftstudio\
  image library\
    {Theme Display Name}\
      image1.png
  scripts\
    import-{theme-name}-images.js
```

---

## Content Types

| Type | Description | Storage Path |
|------|-------------|--------------|
| `images` | Main worksheet images | `/public/images/{theme}/` |
| `borders` | Border graphics | `/public/images/borders/{theme}/` |
| `backgrounds` | Background images | `/public/images/backgrounds/{theme}/` |
| `train` | Train templates | `/public/images/train-templates/{theme}/` |
| `worksheet` | Worksheet templates | `/public/images/worksheet-templates/{theme}/` |

---

## Image Optimization Details

| Property | Value |
|----------|-------|
| Max dimensions | 800x800 pixels |
| Output format | WebP |
| Quality | 85% |
| Resize mode | fit: 'inside', withoutEnlargement: true |
| SVG handling | No optimization, keep original |

### Filename Generation
```
{original-name}-{timestamp}-{8-char-random}.webp

Examples:
balloon.png -> balloon-1767133949283-edfd4beb.webp
French fries.png -> french-fries-1767133948609-1595e182.webp
Uncle Sam.png -> uncle-sam-1767133949066-f931a721.webp
```

---

## Working Example: 4th of July Import

### Script Location
`scripts/import-4th-of-july-images.js`

### Theme Configuration Used
```javascript
const THEME_CONFIG = {
  name: '4th_of_july',
  type: 'images',
  displayNames: {
    en: '4th of July',
    de: '4. Juli',
    fr: '4 juillet',
    es: '4 de Julio',
    it: '4 luglio',
    pt: '4 de Julho',
    nl: '4 juli',
    sv: '4 juli',
    da: '4. juli',
    no: '4. juli',
    fi: 'Heinakuun 4.'
  }
};
```

### Images Imported (16 total)
balloon, baseball, cake, eagle, flag, French fries, grill, hamburger, hotdog, ice cream, lemonade, liberty, statue, Uncle Sam, US, watermelon

### Result
- Theme ID: `cmjt5xd5h0000gx851nwfhtqn`
- All 16 images optimized to WebP (800x800)
- All translations saved to database
- Files synced to standalone build

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `No translations for "X", skipping` | Filename in folder doesn't match key in IMAGE_TRANSLATIONS | Check exact filename including case and extension |
| `Source directory not found` | Folder name doesn't match | Folder name must match theme's English displayName exactly |
| `Can't reach database server` | Running locally without database | Run script on server, not locally |
| `Theme exists` | Theme already created | This is OK - script will update existing theme |

---

## Quick Checklist

- [ ] Images in `image library/{Theme Name}/` folder
- [ ] Script created with correct THEME_CONFIG.name (lowercase, underscores)
- [ ] Script has THEME_CONFIG.displayNames for all 11 languages
- [ ] IMAGE_TRANSLATIONS has entry for EVERY image file (exact filename)
- [ ] Each translation has all 11 language codes
- [ ] Script uploaded to server
- [ ] Image folder created on server
- [ ] Images uploaded to server
- [ ] Script executed successfully (check output for errors)
- [ ] Server restarted with `pm2 restart`
- [ ] Verified files exist in both public and standalone directories

---

# PART 3: BACKGROUND IMAGE IMPORT PROCESS

Background images are stored separately from main images and have different handling.

---

## Key Differences: Backgrounds vs Main Images

| Aspect | Main Images | Backgrounds |
|--------|-------------|-------------|
| **Database type** | `type: 'images'` | `type: 'backgrounds'` |
| **Storage Path** | `/public/images/{theme}/` | `/public/images/backgrounds/{theme}/` |
| **Standalone Path** | `/.next/standalone/public/images/{theme}/` | `/.next/standalone/public/images/backgrounds/{theme}/` |
| **Database filePath** | `/images/{theme}/{filename}` | `/images/backgrounds/{theme}/{filename}` |
| **Image Optimization** | Resize to 800x800 (fit inside) | **NO resize - keep original aspect ratio** |
| **Theme Name** | Must be unique | Must be unique (use `_bg` suffix if same theme exists) |

---

## Step 1: Prepare Your Background Images Locally

### Folder Structure
```
image library/
  BACKGROUNDS/
    {Theme Folder Name}/      <- Contains background images
      background landscape 001.png
      background portrait 001.png
      ...
```

### Example
```
image library/
  BACKGROUNDS/
    4th of July/
      background landscape 001.png
      background landscape 002.png
      background portrait 001.png
      ...
```

### File Requirements
- **Formats**: PNG, JPG, JPEG, WebP, SVG
- **NO size limit**: Backgrounds keep original dimensions
- **Naming**: Use descriptive names (landscape/portrait orientation recommended)

---

## Step 2: Create the Background Import Script

Create a new file: `scripts/import-{theme-name}-backgrounds.js`

### COMPLETE BACKGROUND SCRIPT TEMPLATE (Copy and modify):

```javascript
/**
 * Background Import Script: {THEME NAME}
 *
 * IMPORTANT: Backgrounds are different from main images:
 * 1. type: 'backgrounds' (not 'images')
 * 2. Stored in /images/backgrounds/{theme}/ (not /images/{theme}/)
 * 3. NO resize - keep original aspect ratio
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-{theme-name}-backgrounds.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION - MODIFY THIS SECTION FOR EACH IMPORT
// ============================================================

const THEME_CONFIG = {
  name: 'theme_name_bg',      // Use _bg suffix to avoid conflicts with main images
  type: 'backgrounds',        // KEY DIFFERENCE: 'backgrounds' not 'images'
  sourceFolderName: 'BACKGROUNDS/{Theme Folder}',
  displayNames: {
    en: 'Theme Name',         // American English
    de: 'German Name',
    fr: 'French Name',
    es: 'Spanish Name',       // Mexican Spanish
    it: 'Italian Name',
    pt: 'Portuguese Name',    // Brazilian Portuguese
    nl: 'Dutch Name',
    sv: 'Swedish Name',
    da: 'Danish Name',
    no: 'Norwegian Name',
    fi: 'Finnish Name'
  }
};

// Image translations - KEY IS FILENAME WITHOUT EXTENSION (lowercase)
const IMAGE_TRANSLATIONS = {
  'background landscape 001': {
    en: 'Landscape Background 1',
    de: 'Querformat Hintergrund 1',
    fr: 'Arrière-plan paysage 1',
    es: 'Fondo horizontal 1',
    it: 'Sfondo orizzontale 1',
    pt: 'Fundo paisagem 1',
    nl: 'Liggend achtergrond 1',
    sv: 'Liggande bakgrund 1',
    da: 'Landskabsbaggrund 1',
    no: 'Liggende bakgrunn 1',
    fi: 'Vaakasuuntainen tausta 1'
  },
  'background portrait 001': {
    en: 'Portrait Background 1',
    de: 'Hochformat Hintergrund 1',
    fr: 'Arrière-plan portrait 1',
    es: 'Fondo vertical 1',
    it: 'Sfondo verticale 1',
    pt: 'Fundo retrato 1',
    nl: 'Staand achtergrond 1',
    sv: 'Stående bakgrund 1',
    da: 'Portrætbaggrund 1',
    no: 'Stående bakgrunn 1',
    fi: 'Pystysuuntainen tausta 1'
  }
  // Add more images...
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

// PATHS - NOTE: backgrounds use /backgrounds/ subdirectory
const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images/backgrounds', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images/backgrounds', THEME_CONFIG.name);

// Image processing - NO RESIZE for backgrounds
const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);

  // NO RESIZE for backgrounds - just convert to WebP, keeping original dimensions
  await image.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  // Get final dimensions
  const outputMetadata = await sharp(outputPath).metadata();
  return {
    width: outputMetadata.width,
    height: outputMetadata.height,
    size: fs.statSync(outputPath).size
  };
}

async function main() {
  console.log('============================================================');
  console.log('Background Import Script: ' + THEME_CONFIG.displayNames.en);
  console.log('============================================================\n');

  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  // Create destination directory
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('Created destination directory');
  }

  // Create standalone directory
  if (!fs.existsSync(STANDALONE_DIR)) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
  }

  // Step 1: Create or get theme
  console.log('\n--- Step 1: Creating/Updating Theme ---');
  let theme = await prisma.imageTheme.findFirst({
    where: {
      name: THEME_CONFIG.name,
      type: THEME_CONFIG.type  // Filter by backgrounds type
    }
  });

  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({
      where: { type: THEME_CONFIG.type },
      _max: { sortOrder: true }
    });

    theme = await prisma.imageTheme.create({
      data: {
        name: THEME_CONFIG.name,
        displayNames: THEME_CONFIG.displayNames,
        type: THEME_CONFIG.type,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1
      }
    });
    console.log(`Created new theme (id: ${theme.id})`);
  } else {
    console.log(`Using existing theme (id: ${theme.id})`);
  }

  // Step 2: Process images
  console.log('\n--- Step 2: Processing Images ---');
  const files = fs.readdirSync(SOURCE_DIR).filter(f =>
    /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
  );
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase().trim();

    console.log(`Processing: ${file}`);

    // Get translations
    const translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) {
      console.log(`  WARNING: No translations found for "${lookupKey}", skipping`);
      skipCount++;
      continue;
    }

    try {
      const inputPath = path.join(SOURCE_DIR, file);
      const newFilename = generateUniqueFilename(baseName);
      const outputPath = path.join(DEST_DIR, newFilename);

      // Process image (no resize, just convert to WebP)
      const { width, height, size } = await processImage(inputPath, outputPath);

      // Copy to standalone
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height}) - Original aspect ratio preserved`);

      // Check if already exists in database
      const existing = await prisma.imageLibraryItem.findFirst({
        where: {
          themeId: theme.id,
          translations: {
            path: ['en'],
            equals: translations.en
          }
        }
      });

      if (existing) {
        console.log(`  Already in database, skipping`);
        skipCount++;
        continue;
      }

      // Get max sort order for this theme
      const maxSort = await prisma.imageLibraryItem.aggregate({
        where: { themeId: theme.id },
        _max: { sortOrder: true }
      });

      // Create database record - NOTE: filePath includes /backgrounds/
      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/backgrounds/${THEME_CONFIG.name}/${newFilename}`,
          translations: translations,
          fileSize: size,
          mimeType: 'image/webp',
          width: width,
          height: height,
          sortOrder: (maxSort._max.sortOrder || 0) + 1
        }
      });

      console.log(`  Created database record`);
      successCount++;

    } catch (error) {
      console.log(`  ERROR: ${error.message}`);
      errorCount++;
    }
  }

  // Sync to standalone
  console.log('\n--- Syncing to standalone build ---');
  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) {
    const src = path.join(DEST_DIR, file);
    const dest = path.join(STANDALONE_DIR, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`Copied ${destFiles.length} files to standalone`);

  console.log('\n============================================================');
  console.log('BACKGROUND IMPORT COMPLETE');
  console.log('============================================================');
  console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
  console.log(`Type: ${THEME_CONFIG.type}`);
  console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
```

---

## Step 3: Fill in the Translations

### Theme displayNames (same as main images)
```javascript
displayNames: {
  en: 'Theme Name',           // American English
  de: 'German Translation',
  fr: 'French Translation',
  es: 'Mexican Spanish',      // USE MEXICAN SPANISH
  it: 'Italian Translation',
  pt: 'Brazilian Portuguese', // USE BRAZILIAN PORTUGUESE
  nl: 'Dutch Translation',
  sv: 'Swedish Translation',
  da: 'Danish Translation',
  no: 'Norwegian Translation',
  fi: 'Finnish Translation'
}
```

### Image Translations
**IMPORTANT**: For backgrounds, the key is the **filename WITHOUT extension** (lowercase):
```javascript
// Filename: "background landscape 001.png"
// Key: "background landscape 001" (lowercase, no extension)

'background landscape 001': {
  en: 'Landscape Background 1',
  de: 'Querformat Hintergrund 1',
  fr: 'Arrière-plan paysage 1',
  es: 'Fondo horizontal 1',
  it: 'Sfondo orizzontale 1',
  pt: 'Fundo paisagem 1',
  nl: 'Liggend achtergrond 1',
  sv: 'Liggande bakgrund 1',
  da: 'Landskabsbaggrund 1',
  no: 'Liggende bakgrunn 1',
  fi: 'Vaakasuuntainen tausta 1'
}
```

### Standard Background Translation Terms

| Orientation | English | German | French | Spanish | Italian | Portuguese | Dutch | Swedish | Danish | Norwegian | Finnish |
|-------------|---------|--------|--------|---------|---------|------------|-------|---------|--------|-----------|---------|
| Landscape | Landscape Background | Querformat Hintergrund | Arrière-plan paysage | Fondo horizontal | Sfondo orizzontale | Fundo paisagem | Liggend achtergrond | Liggande bakgrund | Landskabsbaggrund | Liggende bakgrunn | Vaakasuuntainen tausta |
| Portrait | Portrait Background | Hochformat Hintergrund | Arrière-plan portrait | Fondo vertical | Sfondo verticale | Fundo retrato | Staand achtergrond | Stående bakgrund | Portrætbaggrund | Stående bakgrunn | Pystysuuntainen tausta |

---

## Step 4: Upload to Server

### 4.1 Upload the Script
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" "C:\Users\rkgen\lessoncraftstudio\scripts\import-{theme-name}-backgrounds.js" root@65.108.5.250:"/opt/lessoncraftstudio/scripts/"
```

### 4.2 Create Background Folder on Server
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "mkdir -p '/opt/lessoncraftstudio/image library/BACKGROUNDS/{Theme Folder Name}'"
```

### 4.3 Upload Background Images
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" "C:\Users\rkgen\lessoncraftstudio\image library\BACKGROUNDS\{Theme Folder Name}\*.png" "root@65.108.5.250:/opt/lessoncraftstudio/image library/BACKGROUNDS/{Theme Folder Name}/"
```

---

## Step 5: Run the Background Import

**IMPORTANT**: Run from the frontend directory with NODE_PATH set:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-{theme-name}-backgrounds.js"
```

### Expected Output
```
============================================================
Background Import Script: {Theme Name}
============================================================

Source: /opt/lessoncraftstudio/image library/BACKGROUNDS/{Theme Folder}
Destination: /opt/lessoncraftstudio/frontend/public/images/backgrounds/{theme_id_bg}

--- Step 1: Creating/Updating Theme ---
Created new theme (id: cmxxxxxxxxxxxxxxx)

--- Step 2: Processing Images ---
Found X image files

Processing: background landscape 001.png
  Saved: background-landscape-001-1234567890-abcd1234.webp (4000x3091) - Original aspect ratio preserved
  Created database record

...

============================================================
BACKGROUND IMPORT COMPLETE
============================================================
Theme: {theme_id_bg} (cmxxxxxxxxxxxxxxx)
Type: backgrounds
Success: X | Skipped: 0 | Errors: 0
```

---

## Step 6: Restart Server

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "pm2 restart lessoncraftstudio"
```

---

## Step 7: Verify Background Import

### Check files exist (note /backgrounds/ subdirectory)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "ls -la /opt/lessoncraftstudio/frontend/public/images/backgrounds/{theme_id_bg}/"
```

### Check standalone sync
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "ls /opt/lessoncraftstudio/frontend/.next/standalone/public/images/backgrounds/{theme_id_bg}/ | wc -l"
```

---

## Working Example: 4th of July Backgrounds

### Script Location
`scripts/import-4th-of-july-backgrounds.js`

### Theme Configuration Used
```javascript
const THEME_CONFIG = {
  name: '4th_of_july_bg',  // _bg suffix to avoid conflict with main images theme
  type: 'backgrounds',     // KEY DIFFERENCE from main images
  sourceFolderName: 'BACKGROUNDS/4th of July',
  displayNames: {
    en: '4th of July',
    de: '4. Juli',
    fr: '4 juillet',
    es: '4 de Julio',
    it: '4 luglio',
    pt: '4 de Julho',
    nl: '4 juli',
    sv: '4 juli',
    da: '4. juli',
    no: '4. juli',
    fi: 'Heinäkuun 4.'
  }
};
```

### Images Imported (11 total)
- 5 Landscape backgrounds (4000x3091 pixels)
- 6 Portrait backgrounds (3091x4000 pixels)

### Result
- Theme ID: `cmjtqnfn50000gxdclc7xdop8`
- Type: `backgrounds`
- All 11 images converted to WebP (original aspect ratio preserved)
- All translations saved to database
- Files stored in `/public/images/backgrounds/4th_of_july_bg/`

---

## Common Background Import Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Unique constraint failed on fields: (name)` | Theme name already exists (main images use same name) | Add `_bg` suffix to theme name (e.g., `4th_of_july_bg`) |
| `No translations found for "X"` | Filename doesn't match key in IMAGE_TRANSLATIONS | Use filename WITHOUT extension, lowercase |
| `Source directory not found` | Path doesn't include BACKGROUNDS subfolder | Set `sourceFolderName: 'BACKGROUNDS/{folder}'` |
| Images appear cropped | Using main image script (resizes to 800x800) | Use background script (no resize) |

---

## Background Import Checklist

- [ ] Background images in `image library/BACKGROUNDS/{Theme}/` folder
- [ ] Script uses `type: 'backgrounds'` (NOT 'images')
- [ ] Script uses `_bg` suffix in theme name if main images theme exists
- [ ] Paths include `/backgrounds/` subdirectory
- [ ] IMAGE_TRANSLATIONS keys are filename WITHOUT extension (lowercase)
- [ ] Script uploaded to server
- [ ] Background folder created on server in BACKGROUNDS subfolder
- [ ] Images uploaded to server
- [ ] Script executed with `NODE_PATH=./node_modules` from frontend directory
- [ ] Output shows "Original aspect ratio preserved"
- [ ] Server restarted with `pm2 restart`
- [ ] Verified files exist in `/images/backgrounds/{theme}/`
