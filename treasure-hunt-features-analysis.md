# Treasure Hunt Worksheet Generator - Comprehensive Features Analysis

**Analysis Date:** 2025-12-13
**Source File:** REFERENCE APPS/treasure hunt.html
**App Type:** Full Access ($240/year)

---

## CORE CONCEPT

**What is Treasure Hunt?**
A directional learning worksheet where students follow step-by-step directions to navigate through a 5×5 grid of images to find the "treasure" (target image). Students practice reading comprehension, following multi-step instructions, and directional/spatial vocabulary.

---

## 1. PAGE SETUP & LAYOUT

### Page Size Options (Line 606-614)
- **Letter Portrait:** 612×792 px
- **Letter Landscape:** 792×612 px
- **A4 Portrait:** 595×842 px
- **A4 Landscape:** 842×595 px
- **Square:** 1200×1200 px
- **Custom:** User-defined width × height

### Page Color
- Full RGB color picker (Line 622)
- Default: White (#FFFFFF)

### Background Themes
- Theme-based background selection
- Opacity control slider (0.1 to 1.0 in 0.1 increments)
- Background dictionary with thumbnail previews
- Can be disabled (None option)

### Border Themes
- Theme-based border selection
- Opacity control slider (0.1 to 1.0 in 0.1 increments)
- Border dictionary with thumbnail previews
- Can be disabled (None option)

---

## 2. PUZZLE GENERATION SYSTEM

### Grid Structure (Lines 2593-2625)
- **Fixed 5×5 grid** (25 cells total)
- **6 images required** for puzzle generation
- **NO-OVERLAP ALGORITHM:** Each image appears EXACTLY ONCE in the grid (except 1 image repeats to fill 25 cells from 6 unique images)
- Grid is rendered with black borders (1px stroke)
- Cell size: ~105px (scales based on available canvas space)

### Content Selection Methods (Lines 663-680)

**Method 1: Theme-Based Generation (Automatic)**
- Select from theme dropdown (Lines 663-666)
- Automatically selects 6 images from chosen theme
- **Overrides manual selection** when theme is selected
- Fetches images from: `/api/images?theme={theme}&locale={currentLocale}`

**Method 2: Manual Selection (Lines 667-669)**
- Users manually select exactly 6 images
- Selected images preview area shows thumbnails
- Counter displays "Selected: X / 6"
- Images can be selected from:
  - Image library (filtered by theme)
  - Uploaded custom images
  - Search functionality

### Direction Type Options (Lines 671-679)

**Basic Directions (Pre-K to 1st Grade):**
- Up, Down, Left, Right
- Age-appropriate for preschoolers and first graders
- Default setting

**Cardinal Directions (2nd Grade+):**
- North, South, East, West
- Typically introduced in 2nd grade
- Maps to: North=Up, South=Down, East=Right, West=Left

### Move Generation Algorithm (Lines 2672-2692)
- Generates exactly **6 directional moves**
- Uses selected direction type (basic or cardinal)
- Ensures moves stay within 5×5 grid boundaries
- Tracks final position (treasure location)
- Random start position in grid

### Instructions Generation (Lines 2293-2333)
**Multilingual Instructions** (Lines 935-1078):
- "Start at {image name}"
- "Move X north/south/east/west" (or up/down/left/right)
- Translated in all 11 languages:
  - English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- Example: "Start at apple. Move 2 north. Move 1 east. Move 3 south..."

---

## 3. WORKSHEET LAYOUT SYSTEM

### Landscape Layout (Lines 2397-2438)
- **Clues on LEFT (40% of width)**
- **Grid on RIGHT (60% of width)**
- 5% gap between sections
- Instructions text aligned left
- Grid positioned with specific offsets (15px right, 30px up)

### Portrait Layout (Lines 2439-2545)
- **Clues on TOP (40% of height)**
- **Grid on BOTTOM (60% of height)**
- Vertical stacking
- Instructions centered horizontally
- Grid centered below

---

## 4. ANSWER KEY GENERATION

### Answer Key Features (Lines 2562-2660)
- **Separate canvas** for answer key (Line 1135)
- Shows same 5×5 grid with all images
- **Red circle/marker** highlights treasure location (finalPos)
- Uses fabric.Circle with:
  - Red fill (#FF0000)
  - Slight transparency (opacity < 1.0)
  - Positioned at treasure cell center
- Same layout as worksheet (landscape or portrait)
- Separate download buttons for answer key

---

## 5. IMAGE LIBRARY SYSTEM

### Language-Specific Image Selection (Lines 580-601)
- **UI Language:** Set by URL parameter (`?locale=xx`)
- **Content Language:** Controlled by sidebar dropdown (Line 584-596)
  - Can be DIFFERENT from UI language
  - Affects image library content only
  - All 11 languages supported
- Image filenames are language-specific (e.g., "apple.jpg" in English, "pomme.jpg" in French)

### Image Library Features (Lines 684-693)
- **Theme Selection:** Dropdown with all available themes
- **Search Functionality:** Text input to filter images by name
- **Image Dictionary Display:**
  - 50×50px thumbnails
  - Image filename displayed below thumbnail
  - Click to add to manual selection (for 6-image requirement)
  - Shows selected state (blue border, highlighted background)
  - Scrollable container (max-height: 180px)

### Upload Custom Images (Lines 695-708)
- **Multi-file upload** support
- Accepts all image formats (image/*)
- Custom file button UI
- Shows "No file chosen" / file count text
- Uploaded images displayed in separate preview area
- Click uploaded image to add to 6-image selection
- Uploaded images persist during session

---

## 6. TEXT TOOLS

### Add New Text (Lines 641-643)
- Text input field for content
- Placeholder: "Hello!"
- "Add Text" button
- Creates draggable, editable text on canvas

### Text Properties (Lines 644-657)
**When Text Selected:**
- **Color Picker:** Full RGB selection (default: #333333)
- **Font Size:** Number input, minimum 8px (default: 48px)
- **Font Family Dropdown:**
  - Lexend Deca (default)
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- All controls disabled until text object is selected

---

## 7. CANVAS EDITING FEATURES

### Object Context Toolbar (Lines 719-762)
**Visible when object is selected**

**Layers Menu (Lines 722-729):**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Align Menu (Lines 733-753):**
- Align Selected: Left, H-Center, Right, Top, V-Center, Bottom
- Align to Page: Center Horizontally, Center Vertically, Center Both

**Lock/Unlock Button (Line 757):**
- Toggle lock state for selected object
- Locked objects cannot be moved/edited
- Icon changes: lock-open ⇄ lock

**Delete Button (Line 760):**
- Delete selected object(s)
- Red color styling

### Unlock All Feature (Lines 431-470, 781-786)
- **Appears when ANY objects are locked** on canvas
- Orange background badge in header
- "Unlock All" button unlocks all locked objects at once
- Visible indicator shows count of locked objects

---

## 8. ZOOM & VIEW CONTROLS

### Zoom Controls (Lines 770-775)
- **Zoom Out** button (-)
- **Zoom In** button (+)
- **Reset Zoom** button (100%)
- **Zoom Percentage Display** (e.g., "100%")
- Works for both worksheet and answer key canvases

---

## 9. UNDO/REDO SYSTEM

### History Controls (Lines 776-779)
- **Undo Button:** Ctrl+Z keyboard shortcut
- **Redo Button:** Ctrl+Y keyboard shortcut
- Disabled when no history available
- Tracks:
  - Object additions
  - Object deletions
  - Object modifications
  - Canvas clears
- Works for both worksheet and answer key canvases

---

## 10. GENERATE OPTIONS

### Generate Dropdown (Lines 787-793)
**Two Generation Options:**

1. **New Worksheet (Lines 2270-2388):**
   - Validates 6 images selected (theme or manual)
   - Generates 5×5 grid with NO-OVERLAP algorithm
   - Creates random start position
   - Generates 6 random moves
   - Builds multilingual instructions
   - Renders grid + clues (landscape or portrait)
   - **Enables Answer Key button** after worksheet created

2. **Answer Key (Lines 2555-2660):**
   - **Disabled until worksheet is generated**
   - Uses same puzzle data as worksheet
   - Adds red circle marker at treasure location
   - Renders on separate answer key canvas
   - Same layout as worksheet

---

## 11. DOWNLOAD OPTIONS

### Download Dropdown (Lines 795-807)
**Six Download Options:**

1. **Worksheet (JPEG)**
2. **Answer Key (JPEG)** - disabled until answer key generated
3. **Worksheet (PDF)**
4. **Answer Key (PDF)** - disabled until answer key generated
5. **Grayscale Toggle** (checkbox) - affects all downloads

**Export Details:**
- High-resolution exports
- Maintains aspect ratio
- Grayscale option for ink-saving
- Separate files for worksheet and answer key

---

## 12. CLEAR ALL FUNCTION

### Clear Button (Line 808)
- **Clears both worksheet AND answer key canvases**
- Resets form/selection
- Disables answer key generation button
- Resets manual image selection
- Shows success message: "Form cleared successfully"

---

## 13. TAB SYSTEM

### Worksheet Tab (Lines 766, 812-816)
- Default active tab
- Shows main treasure hunt puzzle
- Editable canvas

### Answer Key Tab (Lines 767, 817-821)
- Secondary tab
- Shows answer key with treasure location marked
- Editable canvas
- **Only accessible after worksheet is generated**

---

## 14. DUAL LANGUAGE SYSTEM

### UI Language (Lines 830-841)
- Set by URL parameter: `?locale=xx`
- Controls ALL interface text (buttons, labels, menus)
- Persistent throughout session
- Cannot be changed from sidebar

### Content Language (Lines 580-601)
- **Controlled by sidebar dropdown**
- **Can differ from UI language**
- Affects:
  - Image library content (filenames in different languages)
  - Direction text in puzzles (north/south/east/west translations)
  - Instruction text ("Start at", "Move" translations)
- Example: UI in English, but generate Spanish content for Spanish-learning students

---

## 15. RESPONSIVE DESIGN

### Mobile/Tablet Breakpoint (@media max-width: 1024px) (Lines 264-272)
- Sidebar becomes slide-out panel
- Hamburger menu button appears
- Overlay darkens background when menu open
- Close button in panel header
- Touch-friendly interactions

---

## 16. VALIDATION & ERROR HANDLING

### Required Validations:
1. **Exactly 6 images** must be selected (theme or manual) before generation
2. **Image loading** must complete before puzzle renders
3. **Grid boundaries** enforced for move generation
4. **Answer key** requires worksheet to exist first

### User Messages (Lines 211-214)
- **Error messages:** Red background
- **Success messages:** Green background
- **Info messages:** Blue background
- Auto-dismiss after set duration (usually 2-3 seconds)

---

## 17. ADDITIONAL FEATURES

### Accordion Settings Panel (Lines 68-102, 580-709)
**Five Collapsible Sections:**
1. Language Settings
2. Page Setup
3. Text Tools
4. Puzzle Setup
5. Image Library
6. Upload Custom Images

### Custom File Upload Button (Lines 699-703)
- Styled custom button (not default file input)
- Shows file selection count
- Hidden actual file input
- Better UX than browser default

---

## KEY TECHNICAL HIGHLIGHTS

### Image Reuse Algorithm (Lines 2293-2333)
- **6 unique images** spread across **25 grid cells**
- Ensures NO adjacent cells have same image
- Uses leftOk/topOk checks to prevent horizontal/vertical duplicates
- Repeats images strategically to fill grid

### No-Overlap Grid Generation (Lines 2296-2333)
```
For each of 25 cells (5 rows × 5 columns):
  1. Check if left neighbor is same image (leftOk)
  2. Check if top neighbor is same image (topOk)
  3. Filter available images to exclude neighbors
  4. Randomly select from filtered list
  5. Assign image to cell
```

### Multilingual Direction System (Lines 935-1078)
- Complete translation objects for:
  - "Start at" (11 languages)
  - "Move" (11 languages)
  - "north/south/east/west" (11 languages each)
  - "up/down/left/right" (11 languages each)

---

## SUMMARY OF UNIQUE FEATURES

1. **Dual-language system** (UI vs Content language)
2. **Age-appropriate direction types** (basic vs cardinal)
3. **No-overlap grid algorithm** (6 images → 25 cells with no adjacent duplicates)
4. **Automatic layout switching** (landscape vs portrait)
5. **Separate answer key canvas** with treasure marker
6. **Theme OR manual** image selection
7. **Unlock All** feature for locked objects
8. **Multilingual instructions** (11 languages)
9. **5×5 grid** (fixed size, not customizable)
10. **Exactly 6 images required** (not 5, not 7)

---

## APP FILES & DEPENDENCIES

- **Main HTML:** treasure hunt.html
- **Translations:** js/translations-treasure-hunt.js
- **Language Manager:** js/unified-language-manager.js
- **Loader:** js/bulletproof-loader.js
- **Border/Background Tool:** js/border-background-sizer.js
- **External Libraries:**
  - Fabric.js 5.3.1 (canvas manipulation)
  - jsPDF 2.5.1 (PDF export)
  - Font Awesome 5.15.4 (icons)
  - Google Fonts (Baloo 2, Fredoka, Lexend Deca, Nunito, Quicksand)

---

## END OF ANALYSIS
