# Grid Match App - Complete Features Analysis
## Source: REFERENCE APPS/grid match.html (Lines 1-3842)

---

## VERIFIED APP NAME & DESCRIPTION
**App Name:** Grid Match
**Core Function:** Match numbered puzzle pieces to complete a picture by placing pieces in their correct grid positions

---

## 1. PAGE SETUP & CONFIGURATION

### Language Support (Lines 903-915)
**11 Languages Available:**
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

**Language Selector:** `#languageSelect` - Changes image library language only

### Page Size Options (Lines 934-940)
**Pre-defined Sizes:**
- Letter Portrait (8.5×11") - 612x792px
- Letter Landscape (11×8.5") - 792x612px
- A4 Portrait (210×297mm) - 595x842px
- A4 Landscape (297×210mm) - 842x595px
- Custom (user-defined dimensions)

**Custom Size Inputs:**
- Width input: `#pageWidth`
- Height input: `#pageHeight`
- Apply button: `#setPageSizeBtn`

### Background Options (Lines 949-958)
- Fallback Color: `#pageColor` (color picker, default: #FFFFFF)
- Background Theme Selector: `#backgroundThemeSelect`
- Background Gallery: `#backgroundDictionary`
- Background Opacity Slider: `#backgroundOpacity` (0-1, step 0.05, default: 1)

### Border Options (Lines 959-969)
- Border Theme Selector: `#borderThemeSelect`
- Border Gallery: `#borderGallery`
- Border Opacity Slider: `#borderOpacity` (0-1, step 0.05, default: 1)

---

## 2. TEXT TOOLS (Lines 974-994)

### Add New Text (Lines 976-978)
- Content Input: `#textInput`
- Add Button: `#addTextBtn` - "Add Text to Worksheet"
- Placeholder: "Hello!"

### Text Properties (Lines 979-993)
**Available for Selected Text:**
- Color: `#textColor` (default: #333333)
- Size: `#fontSize` (range: 8+, default: 48)
- Font Family: `#fontFamily`
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- Outline Color: `#textStrokeColor` (default: #000000)
- Outline Width: `#textStrokeWidth` (0-10, step 0.5, default: 0)

---

## 3. GRID OPTIONS (Lines 998-1006)

### Grid Configuration
**Critical Settings:**
- **Rows:** `#rowInput` - Range: 2-4 (default: 3)
- **Columns:** `#colInput` - Range: 2-4 (default: 3)
- **Clue Cells:** `#clueCountInput` - Range: 1-5 (default: 1)
  - Clue cells show correct pieces in their positions
  - Other cells show "?" with white background

**Validation (Line 3074):**
- Minimum grid size: 2×2
- Maximum grid size: 4×4
- Error if rows or cols < 2

---

## 4. IMAGE LIBRARY (Lines 1010-1023)

### Theme Selection (Line 1013)
- Theme Selector: `#themeSelect`
- Loads via API: `/api/themes-translated?locale=${currentLocale}`
- "All Themes" option loads animals by default (Lines 1998-2010)
- Default preload: Animals theme (Lines 2095-2118)

### Search Functionality (Lines 1014-1015)
- Search Input: `#searchInput`
- Placeholder: "e.g., apple, car"
- Searches across all themes when "All Themes" selected
- 300ms debounce on input (Lines 3581-3586)

### Image Display (Lines 1018, 2037-2054)
- Dictionary Display: `#dictionary`
- Shows image thumbnail + name
- Click to select
- Selected item highlighted with blue border
- Sorted alphabetically by name

### Selected Image Preview (Lines 1021, 2057-2074)
- Preview Display: `#selectedPreview`
- Shows selected image
- Click preview to deselect
- Shows "None" when no selection

---

## 5. UPLOAD CUSTOM IMAGES (Lines 1026-1038)

### Upload Functionality
- Upload Button: `#customUploadBtn` (styled button)
- File Input: `#imageUploadInput` (hidden, multi-file)
- Accepts: `image/*` (all image formats)
- Multiple files supported
- Preview Display: `#uploadedImagesPreview`

**Upload Process (Lines 3544-3574):**
- Filters non-image files
- Reads files as Data URLs
- Stores in `appState.uploadedImages`
- Displays thumbnails
- Click thumbnail to select for use
- Success message shows count

---

## 6. GENERATION BUTTONS & TABS

### Tab System (Lines 1093-1096)
**Two Tabs:**
1. **Worksheet Tab** - Shows puzzle with "?" cells and numbered pieces palette
2. **Answer Key Tab** - Shows completed picture with numbered solutions

### Generate Dropdown (Lines 1117-1123)
**Create Dropdown Menu:**
- Generate Worksheet: `#generateWorksheetBtn` - "New Worksheet"
- Generate Answer Key: `#generateAnswerKeyBtn` - "Answer Key" (disabled until worksheet created)

**Worksheet Generation Logic (Lines 3068-3132):**
- Auto-selects random image if none selected (Lines 3591-3601)
- Validates grid size and image selection
- Preserves user-edited transforms when regenerating
- Creates worksheet with clue cells and palette
- Enables answer key and download buttons

**Answer Key Generation (Lines 3134-3196):**
- Requires worksheet to exist first
- Shows complete image with numbered labels
- 30% larger grid in portrait mode (Lines 2765-2771)
- Clones background/border from worksheet
- Preserves user transforms

---

## 7. HEADER SYSTEM (Lines 2426-2630)

### Default Headers (Lines 2428-2439)
**Localized Titles & Descriptions:**
- English: "Grid Match" / "Match the pieces to complete the picture!"
- German: "Raster-Puzzle" / "Setze die Teile zusammen und vervollständige das Bild!"
- French: "Puzzle Grille" / "Assemble les pièces pour compléter l'image!"
- Spanish: "Puzzle de Cuadrícula" / "¡Junta las piezas para completar la imagen!"
- Italian: "Puzzle a Griglia" / "Metti insieme i pezzi per completare l'immagine!"
- Portuguese: "Quebra-Cabeça de Grade" / "Junte as peças para completar a imagem!"
- Dutch: "Rasterpuzzel" / "Leg de stukjes om de afbeelding compleet te maken!"
- Swedish: "Rutnätspussel" / "Matcha bitarna för att slutföra bilden!"
- Danish: "Gitterpuslespil" / "Sæt brikkerne sammen for at fuldføre billedet!"
- Norwegian: "Rutenettspuslespill" / "Sett sammen bitene for å fullføre bildet!"
- Finnish: "Ruudukkopalapeli" / "Yhdistä palaset ja täydennä kuva!"

### Header Design - Portrait Mode (Lines 2551-2627)
- **Page Border:** Orange (#FF8C42), 8px stroke, rounded corners (Lines 2459-2473)
- **Header Background:** Bright cyan (#00BCD4), 100px height, rounded (Lines 2558-2568)
- **Title Pill:** White background, 70px height, rounded (Lines 2572-2583)
- **Title Text:** Deep purple (#6A1B9A), Fredoka font, 28-48px (responsive to length)
- **Description Text:** Gray (#495057), Quicksand font, 20px, max 450px width

### Header Design - Landscape Mode (Lines 2476-2549)
- **Compact Design:** 70px height (vs 100px portrait)
- **Max Width:** 500px centered
- **Title Size:** 24-36px (smaller than portrait)
- **Description Size:** 14px (vs 20px portrait)

---

## 8. ZOOM CONTROLS (Lines 1098-1103, 1603-1628)

### Zoom Interface
- **Zoom In:** `#zoomInBtn` - Increases by 25%
- **Zoom Out:** `#zoomOutBtn` - Decreases by 25%
- **Zoom Reset:** `#zoomResetBtn` - Returns to 100%
- **Display:** `#zoomPercentage` - Shows current zoom level

### Zoom Range
- Minimum: 25%
- Maximum: 300%
- Step: 25%
- Default: 100%

**Implementation (Lines 1603-1628):**
- User zoom level stored in `userZoomLevel` variable
- Updates canvas display dimensions
- Viewport can exceed container when zoomed > 100%

---

## 9. UNDO/REDO SYSTEM (Lines 1104-1107, 1631-1724)

### History Controls
- **Undo Button:** `#undoBtn` - Keyboard: Ctrl+Z
- **Redo Button:** `#redoBtn` - Keyboard: Ctrl+Y
- **Max History:** 20 states (Line 1174)

### State Management (Lines 1634-1653)
**Saves Canvas State Including:**
- Canvas JSON (all objects + properties)
- Custom properties: `isGeneratedItem`, `isAnswerKeyItem`, `isPageBorder`, `isHeaderDesc`, `isHeaderElement`, `isBorder`, `isBackground`, `originalIndex`
- Canvas type (worksheet or answer key)
- Timestamp

**Prevents Saving During:**
- State restoration (`isRestoringState` flag)
- Bulk generation (`isGenerating` flag)
- Object:added/removed events during bulk operations

---

## 10. UNLOCK ALL FEATURE (Lines 1109-1115, 1560-1596)

### Lock/Unlock System
**Unlock All Button:**
- Shows when locked objects exist
- Hidden when no locked objects
- Orange background with white text
- Position: Header, right side

**Lock Functionality (Lines 1480-1558):**
- Lock individual objects or groups
- Locked objects become non-interactive
- Prevents selection and mouse events
- Unlock all restores full interaction

---

## 11. CONTEXTUAL TOOLBAR (Lines 1048-1090, 1401-1478)

### Toolbar Position (Line 509)
- Top: 72px from page top
- Centered horizontally
- Z-index: 100
- Shows when object(s) selected
- Hides when selection cleared

### Toolbar Groups

#### Layer Controls (Lines 1051-1058, 1422-1467)
**Dropdown Menu:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

#### Align Controls (Lines 1062-1081, 1726-1770)
**Align Selected Objects:**
- Align Left
- Center Horizontally
- Align Right
- Align Top
- Center Vertically
- Align Bottom

**Align to Page:**
- Center on Page Horizontally
- Center on Page Vertically

#### Lock/Unlock (Line 1085)
- Toggle lock state
- Icon changes: lock-open ↔ lock
- Locked objects non-selectable

#### Delete (Line 1088)
- Delete selected object(s)
- Keyboard: Delete or Backspace
- Red color for danger action

---

## 12. DOWNLOAD OPTIONS (Lines 1125-1138)

### Download Dropdown Menu
**JPEG Downloads:**
- Worksheet JPEG: `#downloadWsJpegBtn`
- Answer Key JPEG: `#downloadAkJpegBtn`

**PDF Downloads:**
- Worksheet PDF: `#downloadWsPdfBtn`
- Answer Key PDF: `#downloadAkPdfBtn`

**Grayscale Option:**
- Checkbox: `#grayscaleToggle`
- Applies to both JPEG and PDF
- Converts to grayscale during export

### Export Settings (Line 1166)
- **Export Multiplier:** 6x (high resolution)
- **Format:** JPEG (quality: 1.0)
- Resets zoom to 1:1 before export
- Restores display state after export

### Free Tier Watermark (Lines 3277-3413)
**If Free Tier Detected:**
- Adds "FREE VERSION - LessonCraftStudio.com" watermark
- Main watermark: 40px, center, -45° angle
- Multiple small watermarks across canvas
- Applied before export, removed after

---

## 13. WORKSHEET GENERATION ALGORITHM

### Grid Calculation (Lines 2638-2737)

#### Portrait Layout (Lines 2676-2683)
- Grid: Top portion (80% of available width)
- Palette: Below grid
- Grid positioned at top margin
- Centered horizontally

#### Landscape Layout (Lines 2659-2674)
- Grid: Left side (48% of available width)
- Palette: Right side
- Grid centered vertically
- Palette centered in right space

### Image Processing (Lines 2688-2707)
1. **Scale to Fit:**
   - Scale image to fit grid width
   - Maintain aspect ratio
   - Calculate render scale
   - Center crop if oversized

2. **Create Crop Data:**
   - Calculate crop regions for each cell
   - Store cropX, cropY for each piece
   - Account for offset if image larger than grid

3. **Generate Shuffle:**
   - Shuffle cell indices
   - Create solution labels (1, 2, 3...)
   - Map shuffled positions to original cells

4. **Select Clue Cells:**
   - Randomly choose cells to reveal
   - Number based on clueCount setting (1-5)
   - Revealed cells show correct piece

### Worksheet Rendering (Lines 2739-2919)

**Grid Group Contains:**
- Background image (answer key only)
- Cell images (clue cells for worksheet)
- Question marks ("?" for non-clue cells)
- Grid lines (black, 2px stroke)
- Number labels (yellow circles with numbers)

**Grid Positioning:**
- Worksheet: Top-left origin
- Answer Key: Center origin, 30% larger (portrait)

### Palette Rendering (Lines 2921-3066)

**Palette Layout:**
- **Portrait:** 2-4 columns below grid
- **Landscape:** 2-4 columns on right side
- Items scaled to 85% of cell size
- 10px padding between items

**Each Palette Item Contains:**
- Cropped image piece
- Black border (2px)
- Yellow circle with number label
- Matches answer key numbering

---

## 14. CANVAS MANAGEMENT

### Two Canvas System (Lines 2185-2192)
- **Worksheet Canvas:** `wsCanvas` (#wsCanvas)
- **Answer Key Canvas:** `akCanvas` (#akCanvas)
- Both use Fabric.js
- Default background: #FFFFFF
- Preserve object stacking

### Display Scaling (Lines 2194-2249)
**Base Scaling:**
- 25% larger for all (1.25x base scale)
- Additional 25% for landscape (1.56x total)
- User zoom multiplies base scale
- Auto-fit to viewport when zoom ≤ 100%

**Responsive Behavior:**
- Recalculates on window resize
- Maintains aspect ratio
- Allows viewport overflow when zoomed > 100%

### Object Management (Lines 3082-3101)
**Preserves User Edits:**
- Tracks object transforms (position, scale, rotation)
- Stores by `originalIndex` property
- Reapplies after regeneration
- Separates generated from user-added objects

**Object Tags:**
- `isGeneratedItem` - Generated puzzle elements
- `isAnswerKeyItem` - Answer key elements
- `isPageBorder` - Orange page border
- `isHeaderElement` - Header components
- `isHeaderDesc` - Description text
- `isBorder` - Decorative border
- `isBackground` - Background image
- `originalIndex` - Unique identifier (e.g., 'grid', 'palette')

---

## 15. ADDITIONAL FEATURES

### Clear All Function (Lines 3470-3513)
**Resets Everything:**
- Config: rows=3, cols=3, clueCount=1
- Clears selected image
- Clears uploaded images
- Resets page size to Letter Portrait
- Resets background color to white
- Clears both canvases
- Resets border/background themes
- Disables download buttons
- Success message

### Auto-Generation (Lines 3763-3807)
**Initial Worksheet:**
- Loads animals theme
- Selects random animal image
- 3×3 grid with 1 clue cell
- Letter portrait size
- Generated on page load

### Mobile Responsive (Lines 478-504)
**Breakpoint: 1024px**
- Sidebar becomes slide-out menu
- Menu toggle button appears
- Overlay dims background
- Close button in header
- Toolbar positioned below menu button

---

## 16. API ENDPOINTS USED

### Image Library
- `/api/themes-translated?locale=${locale}` - Get translated theme names
- `/api/images?theme=${theme}&locale=${locale}` - Get images by theme
- `/api/images?search=${query}&locale=${locale}` - Search all images

### Backgrounds
- `/api/backgrounds/themes?locale=${locale}` - Get background themes
- `/api/backgrounds/images?theme=${theme}&locale=${locale}` - Get background images
- `/api/backgrounds?locale=${locale}` - Get all backgrounds

### Borders
- `/api/borders/themes?locale=${locale}` - Get border themes
- `/api/borders/images?theme=${theme}&locale=${locale}` - Get border images
- `/api/borders?locale=${locale}` - Get all borders

---

## KEY TECHNICAL DETAILS

### Dependencies (Lines 7-12)
- Fabric.js 5.3.1 (canvas manipulation)
- jsPDF 2.5.1 (PDF generation)
- Font Awesome 5.15.4 (icons)

### Custom Scripts
- `translations-grid-match.js` - Translation strings
- `bulletproof-loader.js` - Asset loading
- `unified-language-manager.js` - Language management
- `border-background-sizer.js` - Asset sizing

### Fonts (Line 56)
- Baloo 2 (400, 700)
- Fredoka (400, 500, 600)
- Lexend Deca
- Nunito (400, 700)
- Quicksand (300-700)

---

## VERIFIED FEATURES SUMMARY

✅ **2-4 rows × 2-4 columns grid** (configurable)
✅ **1-5 clue cells** (pre-filled pieces)
✅ **Numbered puzzle pieces palette** (shuffled)
✅ **Worksheet + Answer Key generation**
✅ **11 languages for image library**
✅ **Theme-based image selection**
✅ **Image search across all themes**
✅ **Custom image upload** (multi-file)
✅ **Letter/A4 Portrait/Landscape** + Custom sizes
✅ **Background images** with themes & opacity
✅ **Decorative borders** with themes & opacity
✅ **Text tools** with full formatting
✅ **Canvas editing** - drag, rotate, scale, delete
✅ **Undo/Redo** (20 states, keyboard shortcuts)
✅ **Zoom** (25%-300%, 25% increments)
✅ **Lock/Unlock objects**
✅ **Contextual toolbar** (layers, align, lock, delete)
✅ **JPEG & PDF downloads** with grayscale option
✅ **Responsive design** (mobile sidebar)
✅ **Localized headers** (11 languages)
✅ **Auto-generates on load** (animals theme)
✅ **Free tier watermark** support

---

## PRICING VERIFICATION

**According to SEO-RULES.md (Line 208):**
✅ **Grid Match = Full Access ($240/year or $25/month)**

---

*End of Analysis - Grid Match App*
*Source: REFERENCE APPS/grid match.html (3842 lines)*
*Analyzed: December 12, 2025*
