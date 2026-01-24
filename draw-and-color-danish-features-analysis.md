# Draw and Color App - Feature Analysis (Source of Truth)

**Source File:** `REFERENCE APPS/draw and color.html`
**Analysis Date:** 2025-12-25
**Purpose:** Document ALL actual features found in the app for Danish page content

---

## App Overview

Draw and Color is a grid-based drawing and coloring worksheet generator. Students reveal parts of a hidden image by coloring grid cells based on clues.

---

## Accordion Sections Found (5 total)

### 1. Worksheet Setup (lines 863-890)
**Translation key:** `drawcolor.worksheet.setup`

**Grid Size Controls:**
- **Rows:** 3-10 rows (line 865-866)
  - Input: number, min=3, max=10, default=5
  - Label: `drawcolor.rows.label`

- **Columns:** 3-10 columns (line 867-868)
  - Input: number, min=3, max=10, default=5
  - Label: `drawcolor.columns.label`

**Clue Cell Percentage:**
- **Clue Cells (%):** 10-75% (line 869-870)
  - Input: number, min=10, max=75, default=25
  - Label: `drawcolor.clue.cells`
  - Purpose: Controls what percentage of grid cells are pre-filled as clues

**Mirror Options** (line 872-884):
- **Mirror Type dropdown:** (line 875-879)
  - None (Random) - `drawcolor.mirror.none`
  - Horizontal - `drawcolor.mirror.horizontal`
  - Vertical - `drawcolor.mirror.vertical`
  - Purpose: Creates symmetrical clue patterns

- **Part to Reveal dropdown:** (line 880-883)
  - Appears when mirror type is selected
  - Label: `drawcolor.part.reveal`
  - Options populated dynamically

**Name/Date Fields:**
- **Include Name/Date checkbox** (line 886-888)
  - Adds name and date fields to worksheet
  - Label: `drawcolor.include.name.date`

---

### 2. Text Tools (lines 893-914)
**Translation key:** `drawcolor.text.tools`

**Add New Text:**
- **Text Input:** Text content field (line 896)
  - Label: `drawcolor.text.content.label`
  - Placeholder: "Hello!" - `drawcolor.text.placeholder`

- **Add Text Button:** (line 897)
  - Label: `drawcolor.text.add.button`

**Selected Text Properties:**
- **Color:** Color picker (line 899)
  - Default: #333333
  - Label: `drawcolor.text.color`
  - Disabled until text selected

- **Font Size:** 8+ (line 900)
  - Default: 48
  - Label: `drawcolor.text.size`
  - Disabled until text selected

- **Font Family dropdown:** (line 901-910)
  - Options: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Label: `drawcolor.text.font`
  - Disabled until text selected

- **Outline Color:** Color picker (line 911)
  - Default: #000000
  - Label: `drawcolor.text.outline.color`
  - Disabled until text selected

- **Outline Width:** 0-10 (line 912)
  - Range slider, step 0.5, default 0
  - Label: `drawcolor.text.outline.width`
  - Disabled until text selected

---

### 3. Page Setup (lines 917-960)
**Translation key:** `drawcolor.page.setup`

**Page Size dropdown:** (line 919-927)
- Letter Portrait (8.5×11") - 612x792px
- Letter Landscape (11×8.5") - 792x612px
- A4 Portrait (210×297mm) - 595x842px
- A4 Landscape (297×210mm) - 842x595px
- Square (1200x1200) - 1200x1200px
- Custom - shows custom inputs

**Custom Page Size** (line 928-933):
- Width input (px)
- Height input (px)
- Apply Size button

**Page Background Color:** (line 936-937)
- Color picker, default #FFFFFF
- Label: `drawcolor.page.color`

**Background Theme:** (line 940-947)
- Theme dropdown with "None" option
- Background dictionary preview area
- Background opacity slider 0-1, step 0.05 (line 946-947)
  - Disabled until background selected
  - Label: `drawcolor.background.opacity`

**Border Theme:** (line 949-958)
- Border theme dropdown with "None" option
- Border dictionary preview area
- Border opacity slider 0-1, step 0.05 (line 954-955)
  - Disabled until border selected
  - Label: `drawcolor.border.opacity`

---

### 4. Image Library (lines 963-976)
**Translation key:** `drawcolor.image.library`

**Theme Selection:**
- **Theme dropdown:** (line 965-966)
  - Populated dynamically from image library
  - Label: `drawcolor.theme.select`

**Image Search:**
- **Search Input:** (line 967-968)
  - Text input
  - Placeholder: "e.g., apple, car" - `drawcolor.search.placeholder`
  - Label: `drawcolor.search.label`

**Image Dictionary:**
- **Available Images display:** (line 969-970)
  - Shows thumbnails of images from selected theme or search
  - Label: `drawcolor.available.images`
  - Loading message: `drawcolor.loading.images`

**Selected Preview:**
- **Selected Image preview:** (line 971-974)
  - Shows currently selected image
  - Label: `drawcolor.selected.image`
  - Empty message: `drawcolor.no.image.selected`

---

### 5. Upload Custom Image (lines 979-994)
**Translation key:** `drawcolor.upload.custom`

**Upload Controls:**
- **File Input:** (line 981-988)
  - Accept: image/*
  - Custom styled button
  - Button text: `drawcolor.choose.files`
  - Status text: `drawcolor.no.file.chosen`
  - Label: `drawcolor.upload.label`

**Upload Preview:**
- **Uploaded Image Preview:** (line 989-992)
  - Shows uploaded image thumbnail
  - Label: `drawcolor.uploaded.label`
  - Empty message: `drawcolor.no.upload`

---

## Top Right Actions (Download Controls)

**Download Dropdown:**
- Download PDF (Full Color)
- Download PDF (Black & White)
- Download JPEG (Full Color)
- Download JPEG (Black & White)
- Download Answer Key (if applicable)

**Canvas Actions:**
- Undo button
- Redo button
- Clear All button

---

## Contextual Toolbar (lines 1003-1012+)

**Layers Management:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Object Actions:**
- Duplicate
- Delete
- Lock/Unlock
- Flip Horizontal
- Flip Vertical

---

## Key Features Summary

1. **Grid-Based Drawing System**
   - Customizable grid size (3x3 to 10x10)
   - Adjustable clue cell percentage (10-75%)
   - Mirror options for symmetrical patterns
   - Random or structured clue placement

2. **Full Canvas Editability**
   - Add custom text with full formatting
   - Drag, rotate, scale any element
   - Layer management (bring to front, send to back)
   - Duplicate, delete, lock objects
   - Undo/redo functionality

3. **Image Library Integration**
   - 3000+ themed images
   - Search functionality
   - Theme-based browsing
   - Upload custom images

4. **Professional Customization**
   - 7 font families available
   - Text color, size, and outline controls
   - Background themes with opacity control
   - Border themes with opacity control
   - Custom page sizes or standard sizes (Letter, A4, Square)
   - Page background color customization

5. **Export Options**
   - PDF (Full Color and Grayscale)
   - JPEG (Full Color and Grayscale)
   - Answer key generation
   - High-resolution 300 DPI output

6. **Educational Features**
   - Name/Date fields option
   - Suitable for kindergarten through 3rd grade
   - Fine motor skill development
   - Color recognition practice
   - Following visual clues
   - Grid coordinate understanding

---

## Verified Features Count
- 5 accordion sections ✓
- 8 select dropdowns ✓
- Multiple input types (number, text, color, range, file) ✓
- Full canvas editing with Fabric.js ✓
- Image library with 3000+ images ✓
- Upload custom images ✓
- Professional export options ✓

**Analysis Complete:** All features documented from source file.
