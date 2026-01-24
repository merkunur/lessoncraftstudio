# Code Addition App - Feature Analysis (Swedish App Page)

## Source File
`REFERENCE APPS/code addition.html`

## App Overview
Image-based addition worksheet generator that creates visual math problems using pictures.

## Accordion Sections (5 total)

### 1. Page Setup (Sidoinställningar)
**Location:** Lines 873-921

**Features:**
- **Page Size Selection:**
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Square (1200x1200)
  - Custom dimensions (width/height in pixels)
- **Page Color:** Color picker (#FFFFFF default)
- **Background Theme:** Theme selector with thumbnail gallery
  - Opacity control slider (0-1, step 0.05)
- **Border Theme:** Theme selector with thumbnail gallery
  - Opacity control slider (0-1, step 0.05)

### 2. Text Tools (Textverktyg)
**Location:** Lines 924-945

**Features:**
- **Add New Text:**
  - Text input field
  - "Add Text" button
- **Selected Text Properties:**
  - Color picker (#333333 default)
  - Font size (min: 8, default: 48)
  - Font family dropdown:
    - Lexend Deca
    - Baloo 2
    - Nunito
    - Quicksand
    - Fredoka
    - Arial
    - Verdana
  - Outline color picker (#000000 default)
  - Outline width slider (0-10, step 0.5)

### 3. Image Library (Bildbibliotek)
**Location:** Lines 948-972

**Features:**
- **Upload Your Own:**
  - Multi-file upload support
  - Accepts all image formats (image/*)
  - User image gallery display
- **Theme Images:**
  - Theme selector dropdown
  - Search input field for filtering images
  - Thumbnail gallery with selectable images
  - 11-language support for image filenames
- **Selected Images:**
  - Preview area showing selected images (clickable thumbnails)
  - Counter showing "Selected: 0 / 5"

### 4. Worksheet Content (Arbetsbladsinnehåll)
**Location:** Lines 975-995

**Features:**
- **Generation Method:**
  - "Use Manually Selected Images" option
  - (Additional theme-based options populated via JavaScript)
- **Exercise Count:** Number input (3-10, default: 5)
- **Minimum Number:** Number input (1-20, default: 1)
- **Maximum Number:** Number input (1-20, default: 10)
- **Generation Note:** Explains theme vs manual selection

### 5. Optional Settings (Valfria inställningar)
**Location:** Lines 998-1006

**Features:**
- **Include Name/Date Fields:** Checkbox (unchecked by default)
- **Show Exercise Numbers:** Checkbox (checked by default)

## Canvas Editing Features

### Contextual Toolbar
**Location:** Lines 1016-1058

**Features:**
- **Layers Management:**
  - Bring to Front
  - Send to Back
  - Bring Forward
  - Send Backward
- **Alignment Tools:**
  - Align Selected: Left, Center Horizontally, Right, Top, Center Vertically, Bottom
  - Align to Page: Center Horizontally, Center Vertically
- **Lock/Unlock:** Toggle object locking
- **Delete:** Remove selected objects

### Header Controls
**Location:** Lines 1065-1106

**Features:**
- **Tab Navigation:**
  - Worksheet tab (active by default)
  - Answer Key tab
- **Zoom Controls:**
  - Zoom In button
  - Zoom Out button
  - Reset Zoom button
  - Zoom percentage display (100% default)
- **History Controls:**
  - Undo button (Ctrl+Z)
  - Redo button (Ctrl+Y)
- **Unlock All Button:** Appears when locked objects exist
- **Generate Dropdown:**
  - Create Worksheet
  - Create Answer Key (disabled until worksheet created)
- **Download Dropdown:**
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
  - Grayscale checkbox option
- **Clear All Button:** Danger-styled button to clear canvas

## Language Support
**Location:** Lines 856-866

Supports 11 UI and content languages:
- English (en)
- Deutsch (de)
- Français (fr)
- Español (es)
- Português (pt)
- Italiano (it)
- Nederlands (nl)
- Svenska (sv)
- Dansk (da)
- Norsk (no)
- Suomi (fi)

## Technical Implementation Details

### Key Capabilities
1. **Full Canvas Editability:**
   - Drag, rotate, scale any object
   - Multi-object selection
   - Contextual toolbar appears on selection

2. **Theme System:**
   - Background themes with opacity
   - Border themes with opacity
   - Image themes organized by category

3. **Image Management:**
   - 3000+ built-in images
   - User upload capability
   - Language-specific image filenames
   - Search and filter functionality

4. **Export Options:**
   - Professional 300 DPI quality
   - JPEG and PDF formats
   - Grayscale conversion option
   - Separate worksheet and answer key generation

5. **Page Layouts:**
   - Portrait and landscape orientations
   - US Letter and A4 paper sizes
   - Square format for social media
   - Custom dimensions for specialty uses

## Pricing Information
- **Subscription Required:** Full Access ($240/year or $25/month)
- **Commercial License:** Included with Full Access subscription
- **Unlimited Creation:** No per-worksheet fees

## Educational Use Cases
- **Addition Practice:** Visual addition problems using images
- **Number Recognition:** Counting objects (siffror och tal)
- **Math Worksheets:** Matematik arbetsblad for årskurs 1-3
- **Differentiation:** Adjustable difficulty via min/max number settings
- **Multilingual Math:** Swedish and 10 other languages for ESL/bilingual classrooms
