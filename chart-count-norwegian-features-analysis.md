# Chart Count App - Complete Features Analysis

**Source:** REFERENCE APPS/chart count.html
**App Type:** Picture Graph/Bar Chart Generator
**Norwegian Name:** Bildediagram (Picture Chart/Graph)

## Core Functionality

**What it creates:** Picture graphs where students count scattered pictures and color boxes to create a bar chart.

- **Grid Structure:** 6 columns × 5 rows = 30 total boxes
- **Vertical axis:** Numbers 1-5 (labeled on left side)
- **Horizontal axis:** 6 different images displayed at bottom
- **Student Activity:** Count each type of picture, then color boxes upward to match the count

## Complete Feature List

### 1. Page Setup Accordion (lines 741-807)

**Language Selection (lines 744-758):**
- 11 languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
- Important for UI translation

**Page Size Options (lines 759-778):**
- Letter Portrait (8.5×11")
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200×1200)
- Custom dimensions (user-defined width/height)

**Page Color (line 776):**
- Color picker for background

**Name/Date Fields (line 781):**
- Optional checkbox to include Name/Date fields on worksheet

**Background Theme (lines 784-792):**
- Theme-based background selection
- Opacity slider control (0-100%)

**Border Theme (lines 795-803):**
- Theme-based border selection
- Opacity slider control (0-100%)

### 2. Text Tools Accordion (lines 809-831)

**Add New Text (lines 811-813):**
- Text input field with placeholder
- Add button to place text on canvas

**Text Properties (lines 814-830):**
- Color picker
- Font size (8+ pixels)
- Font family (7 options):
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- Outline color
- Outline width (0-10 range slider)

### 3. Image Library Accordion (lines 833-856)

**Worksheet Image Source (lines 836-840):**
- Dropdown to select theme for automatic random selection
- Automatically picks 6 random images from selected theme

**Manual Image Selection (lines 841-856):**
- Theme dropdown for browsing specific theme
- Search input field to find images by keyword
- **Selected count display: "Manually Selected: 0 / 6"** (CRITICAL: exactly 6 images required)
- Click to add from available images
- Click to remove from selected images

### 4. Upload Custom Images Accordion (lines 858-871)

**File Upload (lines 860-867):**
- Multi-file selection support
- "Choose files" button
- Shows "No file chosen" status initially
- Accepts common image formats (JPEG, PNG, GIF)

**Uploaded Images Display (lines 868-871):**
- Shows all uploaded images from current session
- Can be combined with library images
- Click to add to worksheet selection

### 5. Canvas Toolbar Features (lines 888-970)

**Layering Controls (lines 888-891):**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Tools (lines 899-922):**
- Align Selected: Left, Center, Right, Top, Middle, Bottom
- Align to Page: Left, Center, Right, Top, Middle, Bottom

**Lock/Unlock Feature (line 946):**
- "Unlock All" button (locks items to prevent accidental editing)

**Generation Buttons (lines 950-953):**
- "Create" dropdown:
  - New Worksheet
  - Answer Key (enabled after worksheet generated)

**Download Options (lines 957-966):**
- Worksheet (JPEG)
- Answer Key (JPEG)
- Worksheet (PDF)
- Answer Key (PDF)
- Grayscale checkbox option

**Clear All Button (line 970):**
- Removes all elements from canvas

### 6. Worksheet Generation Logic (lines 1847-2540)

**Image Requirements (line 1821):**
```javascript
if (selectedImages.length !== 6) throw new Error(`When selecting manually, you must choose exactly 6 images...`);
```
- **CRITICAL:** Exactly 6 images required (no more, no less)

**Random Theme Selection (lines 1823-1827):**
- If theme selected, randomly picks 6 images from that theme
- Theme must have at least 6 images available

**Two Main Components Generated (lines 1972-1975):**
1. **Image Grid (Picture Scatter Area):** Shows random placement of all 6 image types
2. **Chart Area:** 6×5 grid for students to color boxes

**Chart Area Details (lines 2455-2517):**
- Cell size: 137px × 137px (scaled to 98%)
- Number labels on left: 5, 4, 3, 2, 1 (top to bottom)
- Grid: 6 columns × 5 rows with gray borders (#666666, 3px stroke)
- Images displayed at bottom of each column
- Answer key fills boxes with yellow color (#FFC857) up to correct count

**Responsive Layout (lines 2015-2045):**
- **Landscape:** Side-by-side (image grid LEFT, chart area RIGHT)
- **Portrait:** Stacked (image grid TOP, chart area BOTTOM)
- Intelligent scaling to fit available space
- Professional margins: 60px sides, 80px bottom

**Header & Borders (lines 2527-2699):**
- Norwegian header (line 2538):
  - Title: "Bildediagram"
  - Description: "Tell bildene og fargelegg rutene for å lage et diagram!"
  - Translation: "Count the pictures and color the squares to make a chart!"
- Bright orange outer border (#FF8C42, 8px stroke)
- Light peach inner border (#FFD6A5, 3px stroke)
- Yellow header background (#FFD93D)
- White pill for title text
- Responsive design (compact for landscape, full-width for portrait)

### 7. General Canvas Features

**Fabric.js Canvas Controls:**
- Drag any element
- Rotate any element
- Scale (resize) any element
- Delete selected elements
- Undo/redo functionality (from context)
- Zoom in/out controls (lines 1400-1401)

**Download Formats:**
- JPEG (high resolution)
- PDF (print-ready)
- Grayscale option (save ink when printing)

## Norwegian Educational Context

**App Name in Norwegian:** Bildediagram (Picture Chart)

**Target Users:**
- Barnehage (kindergarten, ages 1-5)
- 1. trinn (1st grade, ages 6-7)
- 2. trinn (2nd grade, ages 7-8)
- 3. trinn (3rd grade, ages 8-9)
- Småskoletrinnet (lower primary, 1.-4. trinn)

**Skills Practiced:**
- Telling (counting)
- Tallforståelse (number sense)
- Databehandling (data handling)
- Grafisk fremstilling (graphic representation)
- Finmotorikk (fine motor skills - coloring boxes)

## Pricing Tier

**Chart Count = Full Access ($240/year or $25/month)**

Source: SEO-RULES.md line 198

## Key Differentiators

1. **Exact image count requirement:** Must be exactly 6 images (not flexible)
2. **Dual layout modes:** Intelligent landscape vs portrait layouts
3. **Answer key with color-coding:** Yellow filled boxes show correct counts
4. **Editable header text:** Teachers can customize title and description
5. **Professional chart design:** 5-row height perfect for K-3 counting
6. **Combines counting + graphing:** Students practice both skills in one worksheet
