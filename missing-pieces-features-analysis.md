# Missing Pieces App - Features Analysis
**Source:** REFERENCE APPS/missing pieces.html
**Date:** 2025-12-25
**App Type:** Puzzle Worksheet Generator

## PRICING VERIFICATION
**App Name:** Missing Pieces
**Subscription Tier:** Full Access $240/year
**Monthly Price:** $25/month
✓ I will use "Full Access" and "$240/$25" throughout this document
✓ I will NEVER use "Core Bundle" or "$144/$15" for this app

## App Overview
Missing Pieces is a visual puzzle generator where students identify missing pieces from images and match them to the correct options. The app creates both a worksheet with missing pieces and an answer key showing the complete images.

## Accordion Sections (6 total)

### 1. Language Settings (lines 979-998)
- **Purpose:** Select UI and content language
- **Options:** 11 languages (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
- **Impact:** Affects image library filenames and UI translation

### 2. Page Setup (lines 1000-1043)
- **Page Size Selection:**
  - Letter Portrait (8.5×11")
  - Default Worksheet (800x1000)
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Letter Landscape (11×8.5")
  - Square (1200x1200)
  - Custom (user-defined dimensions)
- **Page Color:** Color picker (default #FFFFFF)
- **Background Themes:** Dropdown with theme selection
- **Background Opacity:** Slider 0-1
- **Border Themes:** Dropdown with theme selection
- **Border Opacity:** Slider 0-1

### 3. Text Tools (lines 1045-1067)
- **Add New Text:**
  - Content input field
  - Add Text button
- **Selected Text Properties:**
  - Color picker (default #333333)
  - Font size (number input, min 8, default 48)
  - Font family dropdown: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Outline color picker (default #000000)
  - Outline width slider (0-10, step 0.5)

### 4. Puzzle Configuration (lines 1069-1086)
**CRITICAL PUZZLE SETTINGS:**
- **Missing Pieces Count:** Number input 1-5 (default 1)
  - How many pieces are removed from the image
- **Solution Options:** Number input 2-6 (default 3)
  - Total number of answer choices shown (including correct answers)
- **Piece Shape:** Dropdown with 6 options:
  - Square
  - Circle
  - Rectangle (Portrait)
  - Rectangle (Landscape)
  - Ellipse (Portrait)
  - Ellipse (Landscape)

### 5. Image Library (lines 1088-1100)
- **Theme Selection:** Dropdown populated from JSON
- **Search Images:** Text input with placeholder "e.g., apple, car"
- **Available Images:** Dictionary display showing clickable image thumbnails
- **Selected Image Preview:** Shows currently selected image for puzzle

### 6. Upload Custom Images (lines 1102-1116)
- **File Upload:** Multi-file image upload (accepts image/*)
- **Choose Files Button:** Custom styled button
- **File Selection Text:** Shows "No file chosen" or file count
- **Uploaded Images Preview:** Shows session-uploaded images as clickable thumbnails

## Canvas Features

### Dual Canvas System (lines 1221-1231)
- **Worksheet Tab:** Shows puzzle with missing pieces
- **Answer Key Tab:** Shows complete images with solutions marked
- Both canvases have:
  - Full Fabric.js editing capabilities
  - Zoom controls
  - Undo/Redo
  - Object manipulation toolbar

### Object Context Toolbar (lines 1127-1169)
**Layers:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Align:**
- Align Selected: Left, H-Center, Right, Top, V-Center, Bottom
- Align to Page: Center H, Center V

**Lock/Unlock:**
- Lock selected object
- Unlock selected object

**Delete:**
- Delete selected object

### Header Controls (lines 1171-1218)

**Tab Buttons:**
- Worksheet tab
- Answer Key tab

**Zoom Controls (lines 1177-1182):**
- Zoom In
- Zoom Out
- Zoom Reset
- Zoom Percentage Display (100% default)

**History Controls (lines 1183-1186):**
- Undo button (Ctrl+Z)
- Redo button (Ctrl+Y)
- Disabled state when no history

**Unlock All Button (lines 1188-1194):**
- Shows when objects are locked
- Unlocks all locked objects at once
- Orange background indicator

**Create Dropdown (lines 1196-1202):**
- Create Worksheet
- Create Answer Key (disabled until worksheet created)

**Download Dropdown (lines 1203-1216):**
- Worksheet (JPEG)
- Answer Key (JPEG)
- Worksheet (PDF)
- Answer Key (PDF)
- Grayscale checkbox toggle

**Clear All Button (line 1217):**
- Clears entire canvas

## Key Technical Features

### Puzzle Generation Algorithm
1. User selects image from library or uploads custom image
2. User configures:
   - How many pieces to remove (1-5)
   - How many solution options to show (2-6)
   - Shape of missing pieces (6 shape options)
3. App generates:
   - **Worksheet:** Image with pieces cut out + solution options below
   - **Answer Key:** Complete image with correct answers highlighted

### Visual Puzzle Elements
- **Missing pieces** are cut from the main image using selected shape
- **Solution options** include:
  - Correct piece(s) from the image
  - Incorrect pieces (distractors) generated from the same image or random images
- Pieces are displayed below the main image for students to match

### Full Editability
All generated elements are editable Fabric.js objects:
- Main puzzle image
- Missing piece cutouts
- Solution option pieces
- Text labels
- Background
- Border
- Custom uploaded images

## 7 General Platform Features Present

✅ **1. Easy Creation:** Select image, configure puzzle settings (pieces, options, shape), click Create
✅ **2. Full Editability:** All objects (images, text, pieces) are draggable, scalable, rotatable, deletable
✅ **3. Upload Custom Images:** Multi-file upload, any image format, combine with library
✅ **4. 11 Languages:** UI and content in 11 languages, affects image library
✅ **5. POD License:** 300 DPI export capability, commercial use included with subscription
✅ **6. 3000+ Image Library:** Theme-based browsing, search functionality
✅ **7. Professional Quality:** 300 DPI export, PDF/JPEG, grayscale option, undo/redo

## Download Formats

### Export Multiplier (line 1284)
`const downloadMultiplier = 6;`
- Canvas dimensions multiplied by 6 for export
- Example: 800x1000 canvas → 4800x6000 export (300 DPI quality)

### Available Formats
1. **JPEG** - Worksheet and Answer Key
2. **PDF** - Worksheet and Answer Key
3. **Grayscale option** - Saves ink for printing

## Unique App Features

**What makes Missing Pieces special:**
1. **Dual output:** Worksheet + Answer Key generated simultaneously
2. **Flexible puzzle difficulty:** Adjust pieces (1-5) and options (2-6)
3. **Multiple piece shapes:** 6 different shapes for variety
4. **Visual learning:** Pattern recognition, attention to detail, visual discrimination
5. **Auto-generated distractors:** App creates incorrect answer choices
6. **Perfect for differentiation:** Easy to create multiple difficulty levels

## Educational Applications

**Cognitive Skills:**
- Visual discrimination
- Pattern recognition
- Attention to detail
- Problem-solving
- Fine motor skills (when students physically match pieces)

**Subject Integration:**
- Math: Number recognition, shape matching
- Literacy: Letter recognition, sight words
- Science: Animal/plant identification
- Geography: Map completion
- Art: Pattern completion

**Age Appropriateness:**
- Preschool (0. klasse/Børnehaveklasse): Simple shapes, 1-2 missing pieces
- Kindergarten-1st grade (1. klasse): 2-3 missing pieces, 3-4 options
- 2nd-3rd grade (2.-3. klasse): 4-5 missing pieces, 5-6 options, complex shapes

## Settings Validation

### Input Constraints
- Missing Pieces: min=1, max=5
- Solution Options: min=2, max=6
- Font Size: min=8
- Custom Page Size: Numeric inputs only
- Opacity Sliders: 0-1, step 0.05
- Outline Width: 0-10, step 0.5

### Default Values
- Page Size: 612x792 (Letter Portrait)
- Page Color: #FFFFFF (white)
- Missing Pieces: 1
- Solution Options: 3
- Piece Shape: Square
- Font Size: 48
- Font Family: Lexend Deca
- Text Color: #333333
- Outline Width: 0

## Professional Features Summary
1. **Canvas manipulation:** Full Fabric.js editing (drag, rotate, scale, layer, align, lock)
2. **Zoom functionality:** Zoom in/out/reset for detailed editing
3. **History system:** Undo/Redo for mistake correction
4. **Dual canvas system:** Separate worksheet and answer key views
5. **High-resolution export:** 6x multiplier for 300 DPI professional quality
6. **Multiple export formats:** JPEG, PDF, grayscale option
7. **Theme integration:** Backgrounds and borders from theme library
8. **Text customization:** 7 fonts, unlimited colors, outline options
9. **Unlock All feature:** Convenient batch unlock for locked objects
10. **Responsive design:** Mobile-friendly sidebar, touch-friendly controls
