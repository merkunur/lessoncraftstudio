# Pinterest Pin Generation System - Complete Reference Documentation

## Overview

This documentation enables future sessions to create Pinterest pins for new worksheet categories without reinventing the architecture. All generators follow the same core pattern with minor variations for file filtering and title rotation strategies.

---

## System Architecture

```
scripts/pinterest-pins/
├── pin-template.js                    (shared config - used by addition only)
├── generate-pins.js                   (addition - English)
├── generate-alphabet-train-pins.js    (English generators)
├── generate-big-small-pins.js
├── generate-bingo-pins.js
├── ...
├── generate-german-addition-pins.js   (German generators)
├── generate-german-alphabet-train-pins.js
├── ...
└── generate-french-addition-pins.js   (French generators)

pinterest-pins/                        (output directory)
├── addition/                          (English - legacy, no subfolder)
├── alphabet-train/
├── big-small/
├── ...
├── german/                            (Non-English languages use subfolders)
│   ├── addition/
│   ├── alphabet-train/
│   └── ...
└── french/
    ├── addition/
    └── ...
```

---

## Multi-Language Folder Organization

When creating pins for languages other than English, follow this folder structure:

### Folder Structure Rules

| Language | Script Naming | Output Folder |
|----------|---------------|---------------|
| English | `generate-[category]-pins.js` | `pinterest-pins/[category]/` |
| German | `generate-german-[category]-pins.js` | `pinterest-pins/german/[category]/` |
| French | `generate-french-[category]-pins.js` | `pinterest-pins/french/[category]/` |
| Spanish | `generate-spanish-[category]-pins.js` | `pinterest-pins/spanish/[category]/` |
| (other) | `generate-[language]-[category]-pins.js` | `pinterest-pins/[language]/[category]/` |

### Path Configuration in Scripts

**English (legacy - no language subfolder):**
```javascript
const SAMPLES_DIR = path.join(projectRoot, 'samples/english/addition');
const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/addition');
```

**Non-English languages (use language subfolder):**
```javascript
// German
const SAMPLES_DIR = path.join(projectRoot, 'samples/german/addition');
const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/german/addition');

// French
const SAMPLES_DIR = path.join(projectRoot, 'samples/french/addition');
const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/french/addition');
```

### Localization Requirements

When creating pins for non-English languages, customize these elements:

1. **Header Titles**: Use natural, native language titles (not direct translations)
   - Research local SEO keywords for educators in that language
   - Use grade-level terms native to that country (e.g., "CP CE1" in French, "Grundschule" in German)

2. **Footer Sub-Text**: Translate "Download Free" to the target language
   ```javascript
   // German
   subText: 'Kostenlos herunterladen',

   // French
   subText: 'Télécharger Gratuit',

   // Spanish
   subText: 'Descargar Gratis',
   ```

3. **Main Text**: Keep `LessonCraftStudio.com` unchanged (brand name)

### Example: French Addition Pins

```javascript
// Paths
const SAMPLES_DIR = path.join(projectRoot, 'samples/french/addition');
const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/french/addition');

// Native French titles (not translations)
titles: {
  'addition_worksheet': "Fiche d'Addition Gratuite",
  'addition amusant': [
    "Exercices d'Addition Gratuits",
    'Fiche de Calcul Maternelle',
    'Maths Faciles pour Enfants',
    'Addition CP CE1 à Imprimer',    // Uses French grade levels
    'Apprendre à Additionner',
    'Fiches de Maths Gratuites',
  ],
  'default': 'Fiche de Maths Gratuite',
}

// French footer
footer: {
  mainText: 'LessonCraftStudio.com',  // Keep brand unchanged
  subText: 'Télécharger Gratuit',      // Localized CTA
}
```

---

## Standard Configuration (Identical Across All Generators)

### Pin Dimensions (Pinterest 2:3 Ratio)
- **Width:** 1000px
- **Height:** 1500px

### 6 Color Schemes (Rotating)

```javascript
colorSchemes: [
  { name: 'Ocean Blue',    header: '#1E40AF', background: '#EFF6FF', footer: '#FB923C' },
  { name: 'Forest Green',  header: '#166534', background: '#F0FDF4', footer: '#84CC16' },
  { name: 'Royal Purple',  header: '#7C3AED', background: '#F5F3FF', footer: '#EC4899' },
  { name: 'Sunset Red',    header: '#DC2626', background: '#FEF2F2', footer: '#F59E0B' },
  { name: 'Teal Ocean',    header: '#0D9488', background: '#F0FDFA', footer: '#06B6D4' },
  { name: 'Deep Navy',     header: '#1E3A5F', background: '#F8FAFC', footer: '#F97316' },
]
```

### Header Configuration
| Property | Value |
|----------|-------|
| Height | 150px |
| Font Size | 42px |
| Font Color | white |
| Font | Arial, sans-serif, bold |

### Footer Configuration
| Property | Value |
|----------|-------|
| Height | 250px |
| Main Text | "LessonCraftStudio.com" (48px) |
| Sub Text | "Download Free" (32px) |
| Font Color | white |
| Vertical Offsets | -25 (main), +35 (sub) |

### Preview Area (Worksheet Display)
| Property | Value |
|----------|-------|
| Padding | 40px |
| Shadow Blur | 20px |
| Shadow Offset | 10px |
| Shadow Opacity | 0.3 |

### Output Settings
| Property | Value |
|----------|-------|
| Format | JPEG |
| Quality | 90% |

---

## Generator Variations Reference Table

| Generator | Source Dir | Extension | Answer Key Filter | Title Strategy |
|-----------|-----------|-----------|-------------------|----------------|
| Addition | `addition` | .jpeg | Excludes `answer_key` | Conditional + rotating |
| Alphabet Train | `alphabet train` | .jpeg | Excludes `answer_key` | Conditional + rotating |
| Big Small | `big small` | .jpeg | Excludes `answer_key` | Conditional + rotating |
| Bingo | `bingo` | .jpeg | None | Category-based |
| Chart Count | `chart count` | .jpeg | Excludes `answer_key` | Category-based |
| Code Addition | `code addition` | .jpeg | Excludes `answer_key` | Category-based |
| Coloring | `coloring` | **.png** | None | Category-based |
| Crossword | `crossword` | .jpeg | Requires "worksheet", excludes `answer_key` | Global rotating |
| Cryptogram | `cryptogram` | .jpeg | Requires "worksheet", excludes `answer_key` | Global rotating |
| Draw & Color | `draw and color` | .jpeg | Requires "worksheet" | Global rotating |

---

## Title Rotation Strategies

### Strategy A: Global Rotating (Simplest)

Single index increments for every file processed.

```javascript
// Single index increments for every file
let titleIndex = 0;
const titles = ['Title 1', 'Title 2', 'Title 3', ...];

function getHeaderTitle() {
  const title = titles[titleIndex % titles.length];
  titleIndex++;
  return title;
}
```

**Used by:** Cryptogram, Crossword, Draw & Color

### Strategy B: Category-Based Rotation

Separate indices maintained per category, allowing different title sets for different file types.

```javascript
// Separate indices per category
const titleIndices = { category1: 0, category2: 0 };
const titles = {
  category1: ['Title A1', 'Title A2'],
  category2: ['Title B1', 'Title B2'],
  default: 'Fallback Title',
};

function getFileCategory(filename) {
  const lowerName = filename.toLowerCase();
  if (lowerName.includes('keyword1')) return 'category1';
  if (lowerName.includes('keyword2')) return 'category2';
  return 'category1'; // default
}

function getHeaderTitle(filename) {
  const category = getFileCategory(filename);
  const arr = titles[category] || titles['default'];

  if (Array.isArray(arr)) {
    const index = titleIndices[category] || 0;
    titleIndices[category] = (index + 1) % arr.length;
    return arr[index];
  }
  return arr;
}
```

**Used by:** Bingo, Chart Count, Code Addition, Coloring

### Strategy C: Conditional + Rotating

Some files get static titles based on patterns, others rotate through an array.

```javascript
// Some files get static titles, others rotate
function getHeaderTitle(filename) {
  if (filename.includes('specific_pattern')) {
    return 'Static Title';
  }
  // Fall through to rotating array for other files
  return rotatingTitles[index++ % rotatingTitles.length];
}
```

**Used by:** Addition, Alphabet Train, Big Small

---

## File Filtering Patterns

### Standard JPEG filter (most generators)

```javascript
const worksheetFiles = allFiles.filter(file =>
  file.endsWith('.jpeg') && !file.toLowerCase().includes('answer_key')
);
```

### PNG filter (coloring only)

```javascript
const worksheetFiles = allFiles.filter(file => file.endsWith('.png'));
```

### Worksheet + no answer key filter

```javascript
const worksheetFiles = allFiles.filter(file =>
  file.endsWith('.jpeg') &&
  file.toLowerCase().includes('worksheet') &&
  !file.toLowerCase().includes('answer_key')
);
```

### No filter (bingo)

```javascript
const worksheetFiles = allFiles.filter(file => file.endsWith('.jpeg'));
```

---

## Output Filename Generation

```javascript
function generateOutputFilename(sourceFilename) {
  return sourceFilename
    .toLowerCase()
    .replace(/\.jpeg$/, '')    // or .png for coloring
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    + '-pin.jpeg';
}
```

---

## Complete Generator Template

Copy this template and customize for new worksheet categories.

```javascript
/**
 * Pinterest Pin Generator for [CATEGORY] Worksheets
 *
 * Generates 1000x1500 Pinterest pins from [category] worksheet samples
 * Uses Sharp for image processing (already installed in frontend)
 *
 * Usage: cd frontend && node ../scripts/pinterest-pins/generate-[category]-pins.js
 */

const path = require('path');
const fs = require('fs');

// Resolve sharp from frontend node_modules
const projectRoot = path.resolve(__dirname, '../..');
const sharp = require(path.join(projectRoot, 'frontend/node_modules/sharp'));

// Configuration
const config = {
  // Pin dimensions (Pinterest optimal: 2:3 ratio)
  pin: {
    width: 1000,
    height: 1500,
  },

  // Color schemes for variety (rotate through these)
  colorSchemes: [
    { name: 'Ocean Blue', header: '#1E40AF', background: '#EFF6FF', footer: '#FB923C' },
    { name: 'Forest Green', header: '#166534', background: '#F0FDF4', footer: '#84CC16' },
    { name: 'Royal Purple', header: '#7C3AED', background: '#F5F3FF', footer: '#EC4899' },
    { name: 'Sunset Red', header: '#DC2626', background: '#FEF2F2', footer: '#F59E0B' },
    { name: 'Teal Ocean', header: '#0D9488', background: '#F0FDFA', footer: '#06B6D4' },
    { name: 'Deep Navy', header: '#1E3A5F', background: '#F8FAFC', footer: '#F97316' },
  ],

  // Header section
  header: {
    height: 150,
    fontSize: 42,
    fontColor: 'white',
    // ADD 6-10 ROTATING TITLES HERE
    titles: [
      'Title 1 for Kids',
      'Printable Title 2',
      'Fun Title 3 Activity',
      'Educational Title 4',
      'Free Title 5 Worksheet',
      'Kids Title 6 Practice',
    ],
  },

  // Preview area (worksheet display)
  preview: {
    padding: 40,
    shadowBlur: 20,
    shadowOffset: 10,
    shadowOpacity: 0.3,
  },

  // Footer section (call-to-action)
  footer: {
    height: 250,
    mainText: 'LessonCraftStudio.com',
    mainFontSize: 48,
    subText: 'Download Free',
    subFontSize: 32,
    fontColor: 'white',
  },

  // Output settings
  output: {
    quality: 90,
    format: 'jpeg',
  },
};

// Paths - UPDATE THESE FOR YOUR CATEGORY
const SAMPLES_DIR = path.join(projectRoot, 'samples/english/[category]');
const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/[category]');

// Track title rotation index
let titleIndex = 0;

/**
 * Create SVG text element for compositing
 */
function createTextSvg(text, fontSize, fontColor, width, height, yOffset = 0) {
  // Escape special characters for SVG
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <text
        x="50%"
        y="${height / 2 + yOffset}"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, sans-serif"
        font-size="${fontSize}px"
        font-weight="bold"
        fill="${fontColor}"
      >${escapedText}</text>
    </svg>
  `);
}

/**
 * Create a colored rectangle as a base layer
 */
async function createColorBlock(width, height, color) {
  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: color,
    },
  }).png().toBuffer();
}

/**
 * Generate filename from source worksheet name
 */
function generateOutputFilename(sourceFilename) {
  return sourceFilename
    .toLowerCase()
    .replace(/\.jpeg$/, '')  // Change to .png$ for PNG sources
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    + '-pin.jpeg';
}

/**
 * Get color scheme based on file index (rotates through 6 schemes)
 */
function getColorScheme(index) {
  const schemes = config.colorSchemes;
  return schemes[index % schemes.length];
}

/**
 * Get rotating header title
 */
function getHeaderTitle() {
  const titles = config.header.titles;
  const title = titles[titleIndex % titles.length];
  titleIndex++;
  return title;
}

/**
 * Create a soft shadow effect for the worksheet preview
 */
async function createShadowLayer(width, height, blur, opacity) {
  const shadowColor = { r: 0, g: 0, b: 0, alpha: opacity };
  return sharp({
    create: {
      width: width + blur * 2,
      height: height + blur * 2,
      channels: 4,
      background: shadowColor,
    },
  })
    .blur(blur)
    .png()
    .toBuffer();
}

/**
 * Generate a single Pinterest pin from a worksheet image
 */
async function generatePin(worksheetPath, outputPath, headerTitle, colorScheme) {
  const { pin, header, preview, footer, output } = config;

  // Apply color scheme overrides
  const headerBgColor = colorScheme.header;
  const previewBgColor = colorScheme.background;
  const footerBgColor = colorScheme.footer;

  // Calculate preview area dimensions
  const previewAreaHeight = pin.height - header.height - footer.height;
  const previewAreaWidth = pin.width;

  // Get worksheet image metadata
  const worksheetMeta = await sharp(worksheetPath).metadata();

  // Calculate scaling to fit worksheet in preview area with padding
  const maxWidth = previewAreaWidth - preview.padding * 2;
  const maxHeight = previewAreaHeight - preview.padding * 2;

  const scaleX = maxWidth / worksheetMeta.width;
  const scaleY = maxHeight / worksheetMeta.height;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = Math.round(worksheetMeta.width * scale);
  const scaledHeight = Math.round(worksheetMeta.height * scale);

  // Resize worksheet
  const resizedWorksheet = await sharp(worksheetPath)
    .resize(scaledWidth, scaledHeight, { fit: 'inside' })
    .png()
    .toBuffer();

  // Create base canvas with preview background color
  const baseCanvas = await createColorBlock(pin.width, pin.height, previewBgColor);

  // Create header block
  const headerBlock = await createColorBlock(pin.width, header.height, headerBgColor);
  const headerText = createTextSvg(headerTitle, header.fontSize, header.fontColor, pin.width, header.height);

  // Composite header with text
  const headerWithText = await sharp(headerBlock)
    .composite([{ input: headerText, top: 0, left: 0 }])
    .png()
    .toBuffer();

  // Create footer block
  const footerBlock = await createColorBlock(pin.width, footer.height, footerBgColor);

  // Create footer text (two lines)
  const mainTextSvg = createTextSvg(footer.mainText, footer.mainFontSize, footer.fontColor, pin.width, footer.height, -25);
  const subTextSvg = createTextSvg(footer.subText, footer.subFontSize, footer.fontColor, pin.width, footer.height, 35);

  // Composite footer with text
  const footerWithText = await sharp(footerBlock)
    .composite([
      { input: mainTextSvg, top: 0, left: 0 },
      { input: subTextSvg, top: 0, left: 0 },
    ])
    .png()
    .toBuffer();

  // Create shadow for worksheet
  const shadowBuffer = await createShadowLayer(
    scaledWidth,
    scaledHeight,
    preview.shadowBlur,
    preview.shadowOpacity
  );

  // Calculate positions
  const worksheetX = Math.round((pin.width - scaledWidth) / 2);
  const worksheetY = Math.round(header.height + (previewAreaHeight - scaledHeight) / 2);
  const shadowX = worksheetX - preview.shadowBlur + preview.shadowOffset;
  const shadowY = worksheetY - preview.shadowBlur + preview.shadowOffset;

  // Composite all layers
  await sharp(baseCanvas)
    .composite([
      // Shadow layer
      { input: shadowBuffer, top: shadowY, left: shadowX },
      // Worksheet
      { input: resizedWorksheet, top: worksheetY, left: worksheetX },
      // Header
      { input: headerWithText, top: 0, left: 0 },
      // Footer
      { input: footerWithText, top: pin.height - footer.height, left: 0 },
    ])
    .jpeg({ quality: output.quality })
    .toFile(outputPath);
}

/**
 * Main execution
 */
async function main() {
  console.log('Pinterest Pin Generator for [CATEGORY] Worksheets');
  console.log('=================================================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all worksheet files - CUSTOMIZE THIS FILTER
  const allFiles = fs.readdirSync(SAMPLES_DIR);
  const worksheetFiles = allFiles.filter(file =>
    file.endsWith('.jpeg') && !file.toLowerCase().includes('answer_key')
  );

  console.log(`Found ${worksheetFiles.length} worksheets to process\n`);

  let successCount = 0;
  let errorCount = 0;
  let fileIndex = 0;

  for (const file of worksheetFiles) {
    const inputPath = path.join(SAMPLES_DIR, file);
    const outputFilename = generateOutputFilename(file);
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    // Get rotating title
    const headerTitle = getHeaderTitle();

    // Get color scheme for this pin (rotates through 6 schemes)
    const colorScheme = getColorScheme(fileIndex);

    try {
      await generatePin(inputPath, outputPath, headerTitle, colorScheme);
      console.log(`✓ Generated: ${outputFilename} → "${headerTitle}" [${colorScheme.name}]`);
      successCount++;
    } catch (error) {
      console.error(`✗ Error processing ${file}: ${error.message}`);
      errorCount++;
    }

    fileIndex++;
  }

  console.log('\n=================================================');
  console.log(`Complete! ${successCount} pins generated, ${errorCount} errors`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main().catch(console.error);
```

---

## Creating a New Generator - Checklist

### 0. Determine language

| Question | Action |
|----------|--------|
| Is this English? | Use `pinterest-pins/[category]/` |
| Is this non-English? | Use `pinterest-pins/[language]/[category]/` |
| Script naming | `generate-[language]-[category]-pins.js` (omit language for English) |

### 1. Analyze source folder

```bash
# English
ls "samples/english/[category]/"

# Non-English (e.g., French)
ls "samples/french/[category]/"
```

Identify:
- File extension (.jpeg or .png)
- Naming patterns (any answer keys? worksheet indicators?)
- Categories within files (if any)

### 2. Determine file patterns

| Question | Options |
|----------|---------|
| Extension | `.jpeg` (most) or `.png` (coloring) |
| Has answer keys to exclude? | Filter with `!includes('answer_key')` |
| Requires "worksheet" in filename? | Filter with `includes('worksheet')` |
| Multiple categories? | Use category-based title strategy |

### 3. Design title array (6-10 titles)

Guidelines:
- Relevant to worksheet type
- SEO-friendly keywords
- Engaging for Pinterest users
- Mix of formats: "X for Kids", "Printable X", "Fun X Activity", etc.

### 4. Copy template and customize

1. Update `SAMPLES_DIR` path (e.g., `'samples/english/subtraction'` or `'samples/french/addition'`)
2. Update `OUTPUT_DIR` path:
   - English: `'pinterest-pins/subtraction'`
   - Non-English: `'pinterest-pins/french/addition'`
3. Add titles array with 6-10 relevant titles (use native language titles, not translations)
4. For non-English: Update `footer.subText` to localized version (e.g., `'Télécharger Gratuit'`)
5. Adjust file filter if needed
6. Update console log messages with category/language name

### 5. Create output directory

```bash
mkdir -p pinterest-pins/[category]
```

### 6. Run generator

```bash
cd frontend && node ../scripts/pinterest-pins/generate-[category]-pins.js
```

### 7. Verify output

- [ ] Pin count matches source files (minus any filtered out)
- [ ] Spot-check a few pins visually
- [ ] Confirm no PDFs or answer keys processed
- [ ] Colors rotate properly across pins

---

## Troubleshooting

### "Cannot find module 'sharp'"

Run from the `frontend` directory:
```bash
cd frontend && node ../scripts/pinterest-pins/generate-[category]-pins.js
```

### "ENOENT: no such file or directory"

Check that:
1. `SAMPLES_DIR` path matches actual folder name (spaces matter!)
2. Source files exist in the samples directory

### Pins look wrong

1. Check source image dimensions (should be roughly letter/A4 size)
2. Verify file extension matches filter (.jpeg vs .png)
3. Check if shadow is appearing in wrong position (usually a math error in positions)

### Some files skipped

Check your filter logic - files might be filtered out by:
- Wrong extension
- Contains "answer_key" in filename
- Missing "worksheet" in filename (if required)

---

## Quick Reference Commands

### List all sample categories
```bash
ls samples/english/
```

### Count files in a category
```bash
ls "samples/english/[category]/" | wc -l
```

### Run a specific generator
```bash
cd frontend && node ../scripts/pinterest-pins/generate-[category]-pins.js
```

### Check output
```bash
ls pinterest-pins/[category]/ | wc -l
```

---

## Example: Creating Subtraction Pins Generator

1. **Check source files:**
   ```bash
   ls "samples/english/subtraction/"
   # Shows: worksheet_1.jpeg, worksheet_2.jpeg, answer_key_1.jpeg, etc.
   ```

2. **Create generator file:** `scripts/pinterest-pins/generate-subtraction-pins.js`

3. **Key customizations:**
   ```javascript
   const SAMPLES_DIR = path.join(projectRoot, 'samples/english/subtraction');
   const OUTPUT_DIR = path.join(projectRoot, 'pinterest-pins/subtraction');

   titles: [
     'Subtraction Practice for Kids',
     'Printable Subtraction Worksheet',
     'Fun Subtraction Activity',
     'Learn Subtraction Easily',
     'Subtraction Skills Builder',
     'Kids Subtraction Practice',
   ],

   // Filter: JPEG, exclude answer keys
   const worksheetFiles = allFiles.filter(file =>
     file.endsWith('.jpeg') && !file.toLowerCase().includes('answer_key')
   );
   ```

4. **Run:**
   ```bash
   cd frontend && node ../scripts/pinterest-pins/generate-subtraction-pins.js
   ```

---

## Version History

| Date | Change |
|------|--------|
| 2025-01-27 | Initial documentation created |
| 2026-02-01 | Added multi-language folder organization section |
