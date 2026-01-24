# Crossword App - Comprehensive Features Analysis

**Source File:** `REFERENCE APPS/crossword.html`
**Analysis Date:** 2025-12-12
**App Type:** Image-based Crossword Puzzle Generator

---

## ACCORDION SECTIONS (7 Total)

### 1. Image Crossword (Default Open)
**Line:** 875

**Features:**
- **Language Selector** (Line 878-890)
  - 11 language options: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
  - Controls image library language (image names and themes)
  - Note: "Image names and themes will be displayed in the selected language"

---

### 2. Page Settings
**Line:** 899

#### Page Setup (Line 901-915)
- **Page Size Selector** (Line 902-908)
  - Letter Portrait (8.5×11" / 612x792px)
  - Letter Landscape (11×8.5" / 792x612px)
  - A4 Portrait (210×297mm / 595x842px)
  - A4 Landscape (297×210mm / 842x595px)
  - Custom (shows custom width/height inputs)

- **Custom Page Size Inputs** (Line 909-915)
  - Width input (pixels) - default: 612
  - Height input (pixels) - default: 792
  - "Apply Size" button

#### Background Settings (Line 918-927)
- **Fallback Color Picker** (Line 919-920)
  - Default: #FFFFFF (white)

- **Background Theme Selector** (Line 921-925)
  - Default option: "None"
  - Dynamically populated with theme options
  - Preview div shows available backgrounds

- **Background Opacity Slider** (Line 926-927)
  - Range: 0 to 1, Step: 0.05
  - Default: 1 (fully opaque)
  - Disabled until background is selected

#### Border Settings (Line 929-938)
- **Border Theme Selector** (Line 930-933)
  - Default option: "None"
  - Dynamically populated with theme options
  - Preview div shows available borders

- **Border Opacity Slider** (Line 937-938)
  - Range: 0 to 1, Step: 0.05
  - Default: 1 (fully opaque)
  - Disabled until border is selected

---

### 3. Text Tools
**Line:** 942

#### Add New Text (Line 944-946)
- **Text Input Field** (Line 945)
  - Placeholder: "Hello!"

- **Add Text Button** (Line 946)
  - Adds text to active canvas (puzzle or answer key)

#### Selected Text Properties (Line 947-961)
All controls disabled until text object is selected:

- **Text Color Picker** (Line 948)
  - Default: #333333 (dark gray)

- **Font Size** (Line 949)
  - Number input, min: 8
  - Default: 48

- **Font Family Selector** (Line 950-958)
  - Lexend Deca (default)
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana

- **Outline Color Picker** (Line 960)
  - Default: #000000 (black)

- **Outline Width Slider** (Line 961)
  - Range: 0-10, Step: 0.5
  - Default: 0 (no outline)

---

### 4. Image Library
**Line:** 966

#### Generate from Theme (Line 968-971)
- **Worksheet Theme Selector** (Line 969-971)
  - Default: "-- Or Select Individual Images Below --"
  - Quick theme-based generation
  - Randomly selects 8 images from theme
  - Dynamically populated with all available themes

#### Individual Image Selection (Line 974-984)
- **Theme Selector** (Line 975-976)
  - Filter images by theme
  - Default: "All Themes"
  - Dynamically populated

- **Search Input** (Line 977-978)
  - Real-time search across image names
  - Placeholder: "e.g., apple, car"
  - Searches within selected theme or all themes

- **Available Images Preview** (Line 980-981)
  - Grid of clickable image thumbnails
  - Shows image name below each thumbnail
  - Click to add/remove from selection

- **Selected Images Preview** (Line 983-984)
  - Shows currently selected images
  - Click to remove from selection
  - Requires 8 images minimum for puzzle generation

---

### 5. Upload Custom Images
**Line:** 988

**Features:**
- **File Upload Input** (Line 990-994)
  - Multi-file upload support
  - Accepts: image/* (all image formats)
  - Custom styled button: "Choose files"

- **File Count Display** (Line 995)
  - Shows number of files selected or "No file chosen"

- **Uploaded Images Preview** (Line 996-999)
  - Grid display of uploaded images
  - Clickable thumbnails for selection
  - Images can be combined with library images
  - Placeholder: "Your uploaded images will appear here."

---

### 6. Manual Image Name Editing
**Line:** 1003

**Features:**
- **Enable Checkbox** (Line 1006-1007)
  - Toggle manual edit mode on/off
  - Label: "Edit image names before generating"

- **Description** (Line 1009-1010)
  - Explains the feature
  - "When enabled, you can manually select images and edit their names below before generating the puzzle."

- **Manual Edit Container** (Line 1013-1017)
  - Hidden by default, shown when checkbox enabled
  - Heading: "Select and Edit Images"
  - Instructions: "Click to add images, then edit names below:"

- **Manual Edit Preview** (Line 1015-1016)
  - Shows selected images with editable name fields
  - Each item has:
    - Image preview (45x45px)
    - Text input for custom name
    - Remove button (X icon)
  - Placeholder: "Click images from the library to add them here for editing."

**How It Works:**
1. Enable manual edit mode checkbox
2. Click images from library to add them
3. Edit the name in the text field next to each image
4. Edited names will be used in the puzzle instead of original image names
5. Minimum 8 images required

---

### 7. Custom Word List with Clues
**Line:** 1022

**Features:**
- **Enable Checkbox** (Line 1025-1026)
  - Toggle custom word list mode on/off
  - Label: "Use custom word list with clues"

- **Description** (Line 1028)
  - Explains the feature (text loaded from translation)

- **Custom Word List Container** (Line 1030-1032)
  - Hidden by default, shown when checkbox enabled
  - Heading from translation: "enterWordsAndClues"

- **Word List Textarea** (Line 1031)
  - 10 rows tall
  - Monospace font for better alignment
  - Resizable vertically
  - Placeholder from translation: "customWordsPlaceholder"

- **Note** (Line 1032)
  - Instructions (from translation: "customWordListNote")

**Format:**
```
WORD: Clue text here
APPLE: A red or green fruit
CAT: A furry pet animal
BOOK: You read this
```

**How It Works:**
1. Enable custom word list checkbox
2. Enter words and clues in format "WORD: clue text"
3. Minimum 8 word-clue pairs required
4. Generates text-based clues instead of image clues
5. Disables manual edit mode when enabled

---

## MAIN CANVAS CONTROLS

### Tab System (Line 1087-1089)
- **Puzzle Tab** (default active)
  - Main crossword puzzle view
  - Empty cells for students to fill in

- **Answer Key Tab**
  - Same puzzle with answers filled in
  - Generated after puzzle is created

### Zoom Controls (Line 1092-1096)
- **Zoom Out** button (-25% per click, min 25%)
- **Zoom Percentage** display (e.g., "100%")
- **Zoom In** button (+25% per click, max 300%)
- **Reset Zoom** button (back to 100%)

### History Controls (Line 1098-1100)
- **Undo** button (Ctrl+Z keyboard shortcut)
  - Disabled when nothing to undo
  - Max 50 history states

- **Redo** button (Ctrl+Y keyboard shortcut)
  - Disabled when nothing to redo
  - Clears when new action performed

### Unlock All Controls (Line 1103-1107)
- **Visibility:** Hidden by default, appears when locked objects detected
- **Unlock All** button
  - Unlocks all locked objects on canvas
  - Icon: unlock icon
  - Orange background theme

### Generate Dropdown (Line 1109-1113)
- **Generate Button** (accent blue, dropdown)

  **Options:**
  - **New Crossword** - Generates fresh puzzle from selected images/words
  - **Answer Key** - Creates answer key (disabled until puzzle generated)

### Download Dropdown (Line 1116-1127)
- **Download Button** (white, dropdown)

  **Download Options:**
  - **Crossword (JPEG)** - disabled until puzzle generated
  - **Answer Key (JPEG)** - disabled until answer key generated
  - (Separator)
  - **Crossword (PDF)** - disabled until puzzle generated
  - **Answer Key (PDF)** - disabled until answer key generated
  - (Separator)
  - **Grayscale Checkbox** - converts to grayscale on download

### Clear All Button (Line 1130)
- Red danger button
- Clears entire canvas
- Resets to empty state

---

## CONTEXTUAL TOOLBAR (OBJECT SELECTION)

**Location:** Floating toolbar, appears when object selected (Line 1042-1083)
**Position:** Top center of canvas area

### Layers Dropdown (Line 1044-1051)
**Button:** Layer icon

**Options:**
- **Bring to Front** - Move to topmost layer
- **Bring Forward** - Move up one layer
- **Send Backward** - Move down one layer
- **Send to Back** - Move to bottom layer

### Align Dropdown (Line 1055-1074)
**Button:** Grid icon

**Align Selected (multi-selection required):**
- **Align Left** - Align left edges
- **Center Horizontally** - Align horizontal centers
- **Align Right** - Align right edges
- **Align Top** - Align top edges
- **Center Vertically** - Align vertical centers
- **Align Bottom** - Align bottom edges

**Align to Page (single selection required):**
- **Center on Page Horizontally** - Center within page width
- **Center on Page Vertically** - Center within page height

### Lock/Unlock Button (Line 1078-1079)
- **Icon:** Lock open (unlocked) / Lock (locked)
- **Function:** Toggles lock state of selected objects
- **Locked objects:** Cannot be moved, scaled, rotated, or deleted

### Delete Button (Line 1081-1082)
- **Icon:** Trash icon
- **Color:** Red (danger color)
- **Function:** Deletes selected object(s)
- **Keyboard:** Delete or Backspace key also works

---

## PUZZLE GENERATION LOGIC

### Image Count Requirement
- **Constant:** `PUZZLE_IMAGE_COUNT = 8` (Line 1198)
- Requires exactly 8 images or words

### Grid Specifications
- **Grid Size:** 15×15 cells (Line 1256, Line 2789)
- **Cell Size:** Dynamic, calculated based on page orientation and available space
  - Portrait: 50% of height for grid
  - Landscape: 50% of width for grid
  - Maximum cell size: 40px (Line 2812)

### Word Placement Algorithm
- Words sorted by length (longest first) for better placement
- Words shuffled before sorting for variation
- Attempts to find intersecting placements
- Minimum 2 placed words required for valid puzzle (Line 2264)

### Crossword Header (Auto-generated)
**Components:**
1. **Outer Border** - Blue rounded rectangle border (#4A90E2, 8px stroke, 34px margin)
2. **Header Background** - Blue rounded rectangle (#5B9BD5)
3. **White Pill** - White rounded rectangle for title
4. **Title Text** - "Picture Crossword" (or localized equivalent)
   - Font: Fredoka, bold 700
   - Color: #1E3A5F (dark blue)
   - Size: Dynamic based on title length (24-48px)
5. **Description Text** - "Look at the pictures and fill in the words!" (or localized)
   - Font: Quicksand, 500 weight
   - Color: #495057 (gray)

**Header Sizes:**
- **Portrait:** Full-width header (100px height), description below (220px total)
- **Landscape:** Compact centered header (70px height, 500px max width, 145px total)

### Clue Image Layout
**Portrait Mode:**
- Images arranged in horizontal rows
- Row 1: Above grid (25% of vertical space)
- Row 2: Below grid (25% of vertical space)
- Optimal image width calculated to fit evenly with spacing

**Landscape Mode:**
- Images arranged in vertical columns
- Column 1: Left side of grid (25% of horizontal space)
- Column 2: Right side of grid (25% of horizontal space)
- Grid takes center 50% of width

**Clue Components:**
- Image (scaled to fit)
- Number label
- Border/frame

**Text Clue Components (Custom Word List Mode):**
- Number label
- Clue text (wrapped in Textbox)
- Background rectangle
- Scaled to fit available space

---

## CANVAS FEATURES

### Full Editability
- All elements on canvas are editable:
  - Drag to move
  - Scale handles to resize
  - Rotation handle to rotate
  - Lock/unlock to prevent changes

### Generated vs User Elements
**Generated Items** (flagged with `isGeneratedItem` or `isAnswerKeyItem`):
- Grid cells and numbers
- Clue images/text
- Answer key letters
- Can be deleted but regeneration creates fresh layout

**User Elements:**
- Text added via Text Tools
- Custom images
- Background/border (user has full control)
- Header elements (can be edited/moved)
- Preserved across regenerations

### Canvas State Management
- **Undo/Redo:** Tracks up to 50 history states
- **Auto-save:** State saved automatically after modifications
- **Debouncing:** Move/scale/rotate operations debounced for performance

---

## DOWNLOAD OPTIONS

### Image Export (JPEG)
- **Resolution:** 6× multiplier (Line 1199)
  - Letter: 3672×4752px (612×792 × 6)
- **Quality:** High-quality JPEG
- **Grayscale:** Optional via checkbox

### PDF Export
- **Quality:** Vector-based where possible
- **Size:** Original page dimensions
- **Grayscale:** Optional via checkbox

---

## LANGUAGE SUPPORT

### UI Languages (11 Total)
Controlled by main app header (URL parameter):
- English (en)
- German (de)
- French (fr)
- Spanish (es)
- Portuguese (pt) - Brazilian
- Italian (it)
- Dutch (nl)
- Swedish (sv)
- Danish (da)
- Norwegian (no)
- Finnish (fi)

### Image Library Language
Separately controlled via sidebar selector (Line 878-890):
- Changes image names and theme names
- Independent from UI language
- Uses localized translations for image filenames

### Localized Headers
Default headers for each language (Line 2326-2337):
- Title examples: "Picture Crossword", "Bilderkreuzworträtsel", "Mots Croisés en Images"
- Description examples: "Look at the pictures and fill in the words!", "Schau die Bilder an und fülle die Wörter aus!"

---

## TECHNICAL SPECIFICATIONS

### Libraries Used
- **Fabric.js 5.3.1** - Canvas manipulation
- **jsPDF 2.5.1** - PDF generation
- **Font Awesome 5.15.4** - Icons

### Fonts Loaded
- Baloo 2
- Fredoka
- Lexend Deca
- Nunito
- Quicksand

### Scripts Loaded
- `js/translations-crossword.js` - Translation strings
- `js/bulletproof-loader.js` - Border/background loading
- `js/unified-language-manager.js` - Language management
- `js/border-background-sizer.js` - Image sizing utilities

### Default Settings
- **Page Size:** Letter Portrait (612×792px)
- **Page Color:** White (#FFFFFF)
- **Background:** None
- **Border:** None
- **Initial Worksheet:** Auto-generates on load with "animals" theme

---

## UNIQUE FEATURES

### 1. Manual Image Edit Mode
- Edit image names before puzzle generation
- Custom vocabulary practice
- Spelling practice with custom words

### 2. Custom Word List Mode
- Text-based clues instead of images
- Format: "WORD: clue description"
- Useful for vocabulary quizzes
- Minimum 8 word-clue pairs

### 3. Dual Canvas System
- Separate puzzle and answer key canvases
- Answer key mirrors puzzle with answers filled
- User elements preserved on both

### 4. Responsive Grid Layout
- Adapts to page orientation
- Portrait: Clues above/below grid
- Landscape: Clues left/right of grid
- Optimal spacing calculated dynamically

### 5. Multi-lingual Image Library
- Images have localized names
- Same image, different name per language
- Supports language learning

---

## SUMMARY

**Total Accordion Sections:** 7
- Image Crossword (Language)
- Page (Size, Background, Border)
- Text Tools
- Image Library
- Upload Custom Images
- Manual Image Edit
- Custom Word List

**Main Controls:** 10
- Tabs (2)
- Zoom (4 buttons)
- History (2 buttons)
- Unlock All (1 button)
- Generate (dropdown)
- Download (dropdown)
- Clear All (1 button)

**Contextual Toolbar:** 4 groups
- Layers (4 options)
- Align (8 options)
- Lock/Unlock (1 button)
- Delete (1 button)

**Page Sizes:** 5 options
- Letter Portrait/Landscape
- A4 Portrait/Landscape
- Custom

**Languages:** 11 supported
- Full UI and content translation

**Image Sources:** 3 methods
- Theme-based generation
- Individual image selection
- Custom image upload

**Special Modes:** 2
- Manual Image Edit Mode
- Custom Word List Mode

**Download Formats:** 4 combinations
- JPEG (Puzzle/Answer Key)
- PDF (Puzzle/Answer Key)
- Optional grayscale

---

## END OF ANALYSIS
