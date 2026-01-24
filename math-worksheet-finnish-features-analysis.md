# Math Worksheet App - Feature Analysis (Source of Truth)

**File Analyzed:** `REFERENCE APPS/math worksheet.html`

## Core App Purpose
Math worksheet generator that creates addition and subtraction exercises with images. Users can solve visual math problems where images represent numbers.

## Accordion Sections (5 total)

### 1. Language Settings (Line 1130)
- **Language Select Dropdown** (Line 1134)
  - Changes the image library language
  - 11 languages supported
  - Affects image filenames/keywords

### 2. Page Setup (Line 1151)
- **Page Size Select** (Line 1154):
  - Letter Portrait (8.5×11")
  - Default Worksheet (800x1000)
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Letter Landscape (11×8.5")
  - Square (1200x1200)
  - Custom (with width/height inputs)

- **Page Color** (Line 1169): Color picker for page background

- **Background Theme** (Line 1175):
  - None option
  - Multiple themed backgrounds available
  - Opacity slider (0-100%)

- **Border Theme** (Line 1184):
  - None option
  - Multiple themed borders available
  - Opacity slider (0-100%)

- **Header Toggle** (Line 1198):
  - Show/hide header
  - Header title input
  - Header description input

### 3. Text Tools (Line 1211)
- **Add New Text** (Line 1214):
  - Text input field
  - Add Text button

- **Selected Text Properties** (Line 1216):
  - Color picker
  - Font size (8+ pixels)
  - Font family dropdown
  - Outline color
  - Outline thickness slider (0-10)

### 4. Puzzle Configuration (Line 1235) **MAIN SECTION**

#### Difficulty Level (Line 1237-1243):
- Very Easy (2 symbols)
- Easy (2 symbols)
- Medium (3 symbols) - DEFAULT
- Hard (4 symbols)

#### Number of Exercises (Line 1244):
- Range: 1-6 exercises per worksheet
- Default: 2

#### Operations (Line 1246):
- Addition Only
- Addition & Subtraction

#### Image Selection Method (Line 1251-1260):
Two modes:
1. **Select Images Individually** (DEFAULT - Line 1254)
   - Choose specific images from library
   - Filter by theme
   - Search images
   - Upload custom images

2. **Use Full Theme** (Line 1258)
   - Select a complete theme
   - All images from that theme

#### Individual Image Selection Features (Line 1266):
- **Selected Images Pool** (Line 1268): Shows chosen images
- **Filter Library By Theme** (Line 1274): Dropdown to filter
- **Search Images** (Line 1279): Text search
- **Custom Images** (Line 1286):
  - File upload (multiple files)
  - Uploaded images preview
  - Click uploaded images to use them

#### Math Configuration (Line 1298-1305):
- **Allow Negative Results** checkbox (Line 1298)
- **Min Value** input (default: 0) (Line 1300)
- **Max Value** input (default: 20) (Line 1302)
- **Show Answers in Worksheet** checkbox (Line 1305)

### 5. Puzzle Numbering (Line 1310)
- **Puzzle Label** (Line 1312): Custom label text
- **Starting Number** (Line 1315): 0-99, default 1
- Example: "Puzzle 1", "Problem 1", etc.

## Canvas Controls & Actions

### Tab System (Line 1334-1335):
1. **Worksheet Tab**: Main editing canvas
2. **Answer Key Tab**: Separate answer key

### Zoom Controls (Line 1339-1343):
- Zoom Out button
- Zoom percentage display
- Zoom In button
- Reset Zoom button

## 7 General Features Present:

✓ 1. **Easy Creation** - Theme selection OR individual images
✓ 2. **Full Editability** - Fabric.js canvas, drag/rotate/scale
✓ 3. **Upload Custom Images** - Multi-file upload, all formats
✓ 4. **11 Languages** - UI and image library
✓ 5. **POD License** - Commercial use included
✓ 6. **3000+ Image Library** - Theme-based and searchable
✓ 7. **Professional Quality** - 300 DPI PDF/JPEG export

## Key Differentiators vs Other Apps:

1. **Difficulty Levels**: 4 difficulty settings (very easy to hard)
2. **Operations Choice**: Addition only OR addition+subtraction
3. **Value Range Control**: Min/max value settings
4. **Negative Numbers**: Optional negative results
5. **Show Answers**: Can show answers directly on worksheet
6. **Number of Exercises**: 1-6 exercises per page
7. **Answer Key Tab**: Separate answer key generation
8. **Puzzle Numbering**: Custom labels and starting numbers

## Pricing Tier Verification:

Looking up "Math Worksheets" in SEO-RULES.md pricing list...

**CONFIRMED: Math Worksheets = Core Bundle ($144/year or $15/month)**

- Part of the 10 Core Bundle apps
- NOT a Full Access app
- Include this pricing in ALL sections

## Summary for Content Writing:

This is a MATH-FOCUSED app (not general worksheet):
- Creates visual math problems with images
- Addition and/or subtraction
- 4 difficulty levels
- Customizable value ranges
- Optional negative numbers
- Can show answers on worksheet
- Separate answer key tab
- 1-6 exercises per worksheet
- Custom puzzle numbering

CRITICAL: This is NOT a generic "math worksheet" - it's specifically for VISUAL MATH PUZZLES where images represent numbers in addition/subtraction problems.
