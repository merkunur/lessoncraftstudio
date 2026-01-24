# Cryptogram Features Analysis - Complete Feature Documentation

## Source File
`REFERENCE APPS/cryptogram.html` (lines 1-3500+)

## App Overview
Image Cryptogram worksheet generator that creates puzzles where letters are replaced with images. Users enter phrases, assign images to each letter, and generate worksheets where students decode messages using picture clues.

---

## SECTION 1: PUZZLE CONFIGURATION

### 1.1 Language Selection (Line 938-950)
**UI Location:** First accordion section "Image Cryptogram"
**Feature:** Content language selector for image names
- 11 languages supported:
  - English, German (Deutsch), French (Français)
  - Spanish (Español), Portuguese (Português)
  - Italian (Italiano), Dutch (Nederlands)
  - Swedish (Svenska), Danish (Dansk)
  - Norwegian (Norsk), Finnish (Suomi)
- Changes image names and themes to selected language
- Note: "Image names and themes will be displayed in the selected language"

### 1.2 Phrase Input (Line 960-961)
**UI Location:** First accordion section
**Feature:** Text area for entering phrases/sentences
- Users enter phrases (one per line)
- Multiple phrases supported
- Placeholder: "The quick brown fox..."
- Phrases are converted to uppercase for puzzle generation
- Letters must be from alphabet of selected language

---

## SECTION 2: PUZZLE RULES

### 2.1 Reveal Count (Line 964, 1512)
**UI Location:** "Puzzle Rules" accordion section
**Feature:** Number of letters to reveal as clues
- Dropdown with options 0-10
- Default: 3
- Controls how many letters are shown in puzzle
- Helps students decode the cryptogram

### 2.2 Maximum Lines (Line 967, 1514)
**UI Location:** "Puzzle Rules" accordion section
**Feature:** Maximum number of lines to display
- Dropdown with options 1-8
- Default: 4
- Controls vertical space usage
- Wraps text by words (max 15 chars per line)

---

## SECTION 3: IMAGE ASSIGNMENT

### 3.1 Theme Selection (Line 979, 3036)
**UI Location:** "Image Assignment" accordion section
**Feature:** Choose theme for automatic image selection
- Dropdown with "All Themes" option
- Dynamically loads theme categories
- Default loads "animals" theme when "All Themes" selected
- Images organized by themes in selected language

### 3.2 Letter Buttons (Line 1523-1535)
**UI Location:** "Image Assignment" accordion section
**Feature:** Individual letter selection buttons
- Grid of buttons for each alphabet letter
- Click to select letter for image assignment
- Updates based on selected language alphabet
- Visual feedback for selected letter
- Active state styling with blue background

### 3.3 Auto-Assign Checkbox (Line 1454, 2157)
**UI Location:** "Image Assignment" accordion section
**Feature:** Automatic image assignment
- Checkbox to enable auto-assignment
- Automatically assigns random images from selected theme to all letters in phrases
- Triggered before puzzle generation
- Saves time vs manual assignment

### 3.4 Assigned Images Preview (Line 985)
**UI Location:** "Image Assignment" accordion section
**Feature:** Preview of letter-image assignments
- Shows which images are assigned to which letters
- Letter badges on image thumbnails
- Dashed border styling
- Visual confirmation of assignments

### 3.5 Image Dictionary/Library (Line 309-358)
**UI Location:** "Image Assignment" accordion section
**Feature:** Browse and select images
- 3000+ images organized by themes
- Filterable by theme
- Click image to assign to selected letter
- Shows image thumbnail and name
- Search functionality available
- Images loaded based on selected language

---

## SECTION 4: CUSTOM IMAGE UPLOAD

### 4.1 Multi-File Upload (Line 994-1007)
**UI Location:** "Upload Custom Images" accordion section
**Feature:** Upload own images
- File input accepts multiple files
- Common formats: JPEG, PNG, GIF
- Shows count of uploaded files
- Uploaded images preview area
- Can combine with library images

---

## SECTION 5: PAGE SETUP

### 5.1 Page Size Options (Line 1011-1018)
**UI Location:** "Page Setup" accordion section
**Feature:** Multiple page format options
- Letter Portrait (8.5×11") - 612x792
- Letter Landscape (11×8.5") - 792x612
- A4 Portrait (210×297mm) - 595x842
- A4 Landscape (297×210mm) - 842x595
- Square (1200×1200)
- Custom dimensions option

### 5.2 Background Themes (Line 1031-1033)
**UI Location:** "Page Setup" accordion section
**Feature:** Background image selection
- Dropdown with theme categories
- "None" option available
- Opacity slider for subtlety
- Hundreds of background options
- Seasonal, nature, abstract patterns

### 5.3 Border Themes (Line 1040-1042)
**UI Location:** "Page Setup" accordion section
**Feature:** Decorative border selection
- Dropdown with theme categories
- "None" option available
- Hundreds of border options
- Thematic borders (seasons, holidays, educational)
- Frames worksheet professionally

---

## SECTION 6: TEXT TOOLS

### 6.1 Font Selection (Line 1061-1069)
**UI Location:** "Text Tools" accordion section
**Feature:** Multiple font options
- Lexend Deca
- Baloo 2
- Nunito
- Quicksand
- Fredoka
- Arial
- Verdana

### 6.2 Text Formatting
**UI Location:** "Text Tools" accordion section
**Features:**
- Font size control
- Color picker
- Bold formatting
- Text alignment (left, center, right)
- Add custom text to canvas

---

## SECTION 7: CANVAS EDITING

### 7.1 Full Canvas Editability (Line 2448-2600)
**Feature:** Complete customization after generation
- Click any element to select
- Drag to move
- Corner handles to resize
- Rotation handle to rotate
- Edit text by double-clicking
- Modify all generated elements

### 7.2 Layer Controls (Line 1618-1680)
**UI Location:** Top canvas toolbar
**Features:**
- Bring Forward
- Send Backward
- Bring to Front
- Send to Back
- Full z-order control for composition

### 7.3 Undo/Redo (Line 1687-1798)
**UI Location:** Top canvas toolbar
**Features:**
- Up to 50 actions in history
- Undo button
- Redo button
- Preserves all custom properties
- Works across worksheet and answer key

### 7.4 Zoom Controls (Line 1587-1612)
**UI Location:** Top canvas toolbar
**Features:**
- Zoom In (+25% per click)
- Zoom Out (-25% per click)
- Reset to 100%
- Range: 25% to 300%
- Display shows current zoom percentage

---

## SECTION 8: GENERATION & OUTPUT

### 8.1 Worksheet Generation (Line 2120-2148, 2448-2620)
**Process:**
1. Validates phrases entered
2. Checks all letters have assigned images
3. Extracts unique letters from phrases
4. Selects random letters to reveal as clues
5. Wraps text by words (15 chars max per line)
6. Creates puzzle grid with image cells
7. Generates decorative header
8. Creates legend showing all letter-image mappings

**Header Elements (Line 2219-2441):**
- Title: "Picture Cryptogram" (or localized)
- Description: "Crack the code using the picture clues!"
- Purple and gold decorative borders
- Responsive design (landscape vs portrait)
- Fully editable after generation

**Puzzle Layout:**
- Cell structure: image on top, blank box below for writing letter
- Professional margins (10% of page)
- Dynamic cell sizing based on content
- Centered alignment
- Revealed letters shown in answer boxes

**Legend Section:**
- Shows all letters used in puzzle
- Image for each letter
- Grid layout (10 columns portrait, 13 landscape)
- Revealed letters visible
- Hidden letters shown blank

### 8.2 Answer Key Generation (Similar to worksheet)
**Feature:** Generates solution version
- Same layout as worksheet
- All letters filled in
- Same formatting and styling
- Accessible via tab system
- Downloadable separately

### 8.3 Download Options
**UI Location:** Download dropdown button
**Formats:**
- Worksheet as JPEG (300 DPI)
- Worksheet as PDF
- Answer Key as JPEG (300 DPI)
- Answer Key as PDF
- Grayscale checkbox to save ink

---

## SECTION 9: ADVANCED FEATURES

### 9.1 Dual Canvas System (Line 850-900)
**Feature:** Separate worksheet and answer key canvases
- Tab system switches between views
- Independent editing possible
- Synchronized generation
- Both downloadable separately

### 9.2 State Management
**Features:**
- Preserves user edits during regeneration
- Remembers positions and transforms
- Maintains user-added objects
- Only replaces generated puzzle elements

### 9.3 Responsive Design
**Features:**
- Adapts to page orientation (portrait/landscape)
- Different header layouts for each orientation
- Optimized cell and legend sizing
- Professional margins maintained
- Landscape mode uses compact header (145px)
- Portrait mode uses full header (220px)

### 9.4 Professional Quality
**Features:**
- 300 DPI export resolution
- PDF and JPEG formats
- Grayscale option for printing
- Print-ready quality
- Perfect for commercial use (POD license)

---

## KEY TECHNICAL SPECIFICATIONS

**Puzzle Grid:**
- Max 15 characters per line
- Max 8 lines total
- Automatic word wrapping
- Cell dimensions: dynamic based on content
- Cell height = width × 1.5

**Legend:**
- Grid layout: 10 columns (portrait), 13 (landscape)
- Automatic row calculation
- Dynamic scaling if doesn't fit
- Image size: 60% of cell height
- Letter font size: 20px or 33% of cell width

**Languages Supported:** 11 (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)

**Image Library:** 3000+ child-friendly images

**Canvas Controls:**
- Full Fabric.js editing
- Drag, resize, rotate, delete
- Layer ordering
- Undo/redo (50 states)
- Zoom (25%-300%)

---

## SUMMARY

The Image Cryptogram generator is a comprehensive tool for creating picture-based code-breaking puzzles. It combines phrase input, intelligent letter-to-image assignment (manual or automatic), customizable puzzle rules, professional formatting, and complete editability. The 11-language support, dual canvas system for worksheet/answer key, and high-quality export options make it suitable for classroom use, homework, and commercial worksheet sales.
