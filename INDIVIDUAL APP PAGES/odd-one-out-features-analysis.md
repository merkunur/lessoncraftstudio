# Odd One Out - Complete Features Analysis

**Source:** REFERENCE APPS/odd one out.html
**Analysis Date:** 2025-12-12
**Pricing Tier:** Full Access ($240/year or $25/month)

---

## App Overview

The Odd One Out worksheet generator creates educational exercises where students identify which item doesn't belong in a group of 4 images. Perfect for critical thinking, categorization skills, and visual discrimination practice.

---

## 1. PAGE SETUP & CANVAS CONFIGURATION

### Page Size Options (Line 1057-1064)
- **Letter Portrait** (8.5×11" / 612x792px) - Default
- **Letter Landscape** (11×8.5" / 792x612px)
- **A4 Portrait** (210×297mm / 595x842px)
- **A4 Landscape** (297×210mm / 842x595px)
- **Square** (1200x1200px)
- **Custom** dimensions (user-defined width/height in pixels)

### Page Color (Line 1071-1072)
- Color picker for background color
- Default: White (#FFFFFF)

### Background Themes (Line 1075-1082)
- None (default)
- Multiple background themes available via API
- Background opacity slider (0-100%)
- Backgrounds scale to 70% of canvas height for professional appearance

### Border Themes (Line 1084-1093)
- None (default)
- Multiple border themes available via API
- Border opacity slider (0-100%)
- Borders scale to 70% of canvas height for professional appearance

**Professional Header Design (Lines 1647-1873):**
- **Portrait Mode:**
  - Full-width header with vibrant turquoise background (#4ECDC4)
  - White pill container for title
  - Title: "Find the Odd One Out" (or localized equivalent)
  - Description: "Circle the picture that is different in each row!"
  - Responsive font sizing based on title length (48px down to 28px)

- **Landscape Mode:**
  - Compact centered header design
  - Reduced height by 50px to maximize exercise space
  - Smaller fonts for compact display

- **Visual Design Elements:**
  - Outer border: Bright coral (#FF6B6B) with 8px stroke
  - Inner border: Sunny amber (#FFB84D) with 3px stroke
  - Rounded corners (12px outer, 8px inner)
  - Professional shadow effects

---

## 2. TEXT TOOLS

### Add New Text (Lines 1098-1102)
- Text input field for content
- "Add Text" button to place text on canvas
- Default placeholder: "New Text"

### Text Properties (Lines 1103-1117)
Available when text object is selected:
- **Color picker** - Text fill color (default: #333333)
- **Font size** - Adjustable size (default: 48px, minimum: 8px)
- **Font family** dropdown:
  - Lexend Deca (default)
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- **Outline color** - Text stroke color (default: #000000)
- **Outline width** - Stroke width slider (0-10px, step: 0.5)

---

## 3. EXERCISE CONFIGURATION

### Number of Exercises (Lines 1124-1132)
Dropdown selector:
- 5 Exercises
- 6 Exercises (default)
- 7 Exercises
- 8 Exercises
- 9 Exercises
- 10 Exercises

### Global Mode Selection (Lines 1134-1138)
Two modes available:
1. **Identical Mode** - 3 identical images + 1 different from same theme
2. **Similar Mode** (default) - 3 images from Theme A + 1 from Theme B

### Per-Exercise Configuration (Lines 1140-1148)
- **Exercise selector** - Choose which exercise to configure (1-10 based on count)
- **Per-exercise mode override** - Can set specific mode for individual exercises:
  - Use Global Mode (default)
  - Identical Mode
  - Similar Mode

### Additional Options (Lines 1152-1157)
- **Include Name/Date Fields** checkbox - Adds professional name/date input at top
- **Include Exercise Numbers** checkbox - Numbers each exercise (1., 2., 3., etc.)

### Clear Selections (Line 1150)
- Button to clear all image selections for current exercise

---

## 4. IMAGE LIBRARY & SELECTION

### Theme Selection (Lines 1164-1167)
- **Theme A** - Primary theme for identical/similar mode (default: "animals")
- **Theme B** - Secondary theme for similar mode odd-one-out selection
- Both dropdowns populated from `/api/themes-translated?locale={locale}`
- Random theme option available

### Image Search (Lines 1169-1171)
- Search input field with 300ms debounce
- Filters images by name/word
- Placeholder: "Search images..."

### Available Images Dictionary (Line 1173)
- Visual grid display of available images
- Images from both Theme A and Theme B (in similar mode)
- Lazy loading: Shows first 20 images, loads more on scroll
- 50x50px thumbnails with image names
- Click to add image to exercise

### Exercise Selections Preview (Lines 1175-1179)
Two preview areas:
1. **Common Images (3)** - Shows selected common items
2. **Odd Image (1)** - Shows selected odd-one-out item

**Selection Logic:**
- **Identical Mode:** First click selects base image (used 3x), second click selects odd image
- **Similar Mode:** First 3 clicks select common images, 4th click selects odd image

---

## 5. CUSTOM IMAGE UPLOAD

### Upload Interface (Lines 1184-1196)
- Multi-file upload input
- Accepts all image formats (JPEG, PNG, GIF, etc.)
- Custom file button with status display
- Shows "None" or file count when files selected

### Uploaded Images Preview
- Grid display of uploaded images (this session only)
- Same 50x50px thumbnail format as library
- Click to add to exercise selections
- Uploaded images combine with theme images in dictionary

---

## 6. CANVAS CONTROLS & EDITING

### Zoom Controls (Lines 1258-1263)
- **Zoom In** button (+ icon)
- **Zoom Out** button (- icon)
- **Zoom percentage** display (25% - 300%)
- **Reset Zoom** button (compress icon)
- Default: 100% zoom

### History Controls (Lines 1264-1267)
- **Undo** button (Ctrl+Z) - Up to 20 states
- **Redo** button (Ctrl+Y)
- Buttons disabled when no history available

### Unlock All Button (Lines 1270-1275)
- Only visible when locked objects exist
- Unlocks all locked objects on canvas
- Orange background indicator

### Contextual Object Toolbar (Lines 1209-1251)
Appears when objects are selected:

**Layer Controls:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Controls:**
- Align Left, Center Horizontal, Align Right (for groups)
- Align Top, Center Vertical, Align Bottom (for groups)
- Center on Page Horizontally
- Center on Page Vertically

**Lock/Unlock Button:**
- Locks/unlocks selected objects
- Locked objects: non-selectable, non-editable, don't capture mouse events
- Icon changes between locked/unlocked states

**Delete Button:**
- Removes selected objects
- Keyboard: Delete or Backspace

---

## 7. WORKSHEET GENERATION

### Create Dropdown (Lines 1277-1283)
Two generation options:
1. **New Worksheet** - Generates main exercise worksheet
2. **Answer Key** (disabled until worksheet generated) - Creates answer key with red circles around odd items

### Smart Column Layout (Lines 2989-2993)
- **Portrait + 1-6 exercises:** Single column
- **Portrait + 7+ exercises:** Two columns
- **Landscape (any count):** Two columns
- Automatic responsive spacing and sizing

### Exercise Card Design (Lines 3113-3213)
**Card Appearance:**
- White background with rounded corners
- Light gray border (#d0d0d0)
- Subtle shadow for depth
- Responsive sizing based on page size and exercise count

**Image Layout:**
- 4 images per exercise (3 common + 1 odd)
- Images automatically sized to fit card
- Intelligent spacing algorithm
- Images scale down if needed to fit
- Centered within card

**Exercise Numbering:**
- Positioned OUTSIDE card (15px gap)
- Left-aligned with card
- Bold, scalable font
- Vertical center alignment with card

### Answer Key Features (Lines 2900-2982)
- Identical layout to worksheet
- Red circles drawn around odd-one-out items
- Copies header, borders, backgrounds from worksheet
- Maintains all styling and positioning

### Name/Date Fields (Lines 2843-2878)
When enabled:
- Professional positioning at top
- Two fields: "Name: ________________" and "Date: ________"
- Responsive font sizing (2.2% of page width, max 14px)
- 10% horizontal margins
- 8% vertical margins

---

## 8. DOWNLOAD OPTIONS

### Download Dropdown (Lines 1285-1297)
Four download options:
1. **Worksheet (JPEG)** - High-resolution JPEG export
2. **Answer Key (JPEG)** - Disabled until answer key generated
3. **Worksheet (PDF)** - PDF export
4. **Answer Key (PDF)** - Disabled until answer key generated

### Grayscale Toggle (Lines 1293-1295)
- Checkbox in download dropdown
- Applies grayscale filter to exports
- Saves ink for printing
- Uses standard grayscale conversion: 0.299*R + 0.587*G + 0.114*B

### Export Quality (Line 1372)
- 6x multiplier for high-resolution exports
- Maintains aspect ratio and quality
- Proper page dimensions in PDF

---

## 9. MULTI-LANGUAGE SUPPORT

### UI Language (Lines 1318-1327)
- Controlled by URL parameter: `?locale={code}`
- 11 supported languages
- All UI elements translated

### Content Language (Lines 1032-1051)
Separate language selector for image library:
- English (en)
- German (de) - Deutsch
- French (fr) - Français
- Spanish (es) - Español
- Portuguese (pt) - Português
- Italian (it) - Italiano
- Dutch (nl) - Nederlands
- Swedish (sv) - Svenska
- Danish (da) - Dansk
- Norwegian (no) - Norsk
- Finnish (fi) - Suomi

### Localized Headers (Lines 1648-1660)
Each language has custom header text:
- **English:** "Find the Odd One Out" / "Circle the picture that is different in each row!"
- **German:** "Finde das Andere" / "Kreise das Bild ein, das anders ist!"
- **French:** "Trouve l'Intrus" / "Entoure l'image différente dans chaque rangée!"
- **Spanish:** "Encuentra el Diferente" / "¡Rodea la imagen diferente en cada fila!"
- And 7 more localized versions...

---

## 10. UNIQUE IMAGE SELECTION ALGORITHM

### Anti-Duplication System (Lines 2710-2722)
- Tracks all used image paths in Set
- Prevents same image appearing multiple times across exercises
- Up to 100 attempts to find unique image before fallback

### Mode-Specific Logic

**Identical Mode (Lines 2736-2752):**
1. Select base image from Theme A (or uploaded images)
2. Use base image 3 times as common items
3. Select different image from same pool as odd item
4. Validates sufficient images available

**Similar Mode (Lines 2753-2772):**
1. Select 3 unique images from Theme A pool
2. Select 1 image from Theme B pool as odd item
3. Ensures themes are different (swaps if needed)
4. Validates sufficient images in both pools

### Random Shuffling (Line 2780)
- Randomizes positions of all 4 images before rendering
- Prevents odd item always appearing in same position

---

## 11. RESPONSIVE DESIGN FEATURES

### Mobile/Tablet Adaptations (Lines 898-922)
- **≤1024px:** Sidebar becomes overlay
- Fixed position sidebar
- Hamburger menu toggle
- Close button in sidebar
- Overlay backdrop when sidebar open
- Reduced sidebar width (300px)

### Canvas Display Scaling (Lines 2176-2233)
**Base Scaling:**
- 125% for all orientations (better visibility)
- Additional 25% for landscape (156.25% total)

**Automatic Fitting:**
- Scales to fit available content area
- Maintains aspect ratio
- User zoom (25%-300%) applied on top

### Header Responsiveness (Lines 1719-1870)
- Portrait: Full-width design (70px margins)
- Landscape: Compact centered design (max 500px wide)
- Font sizes scale based on title length
- Layout adapts to page orientation

---

## 12. PROFESSIONAL WORKSHEET FEATURES

### Spacing & Layout Quality (Lines 3020-3048)
**Intelligent Spacing:**
- Minimum row spacing: 20px
- Maximum row spacing: 60px
- Optimal spacing calculated to fill page
- Column spacing: 8% of page width (two-column mode)

**Card Sizing:**
- Aspect ratio: 3.8:1 (width:height)
- 95% size reduction for breathing room
- Maintains proportions across different page sizes

### Z-Order Management (Lines 1613-1643)
**Layering System:**
1. Page borders (bottom layer)
2. Header elements
3. Name/Date fields
4. Worksheet/Answer key items
5. User-added content (top layer)

**Note:** Backgrounds and borders now user-controllable (not forced to back)

### Professional Quality Standards
- **Image Size:** 140% of card padding area for better visibility
- **Card Padding:** 5% horizontal, 15% vertical
- **Border Radius:** 10% of card height (max 12px)
- **Shadows:** Subtle rgba(0,0,0,0.06) 2px blur
- **Answer Key Circles:** 4% stroke width, scales with image size

---

## 13. ADVANCED CANVAS FEATURES

### Undo/Redo System (Lines 2264-2351)
- Maximum 20 history states
- Saves all custom properties
- Prevents saving during state restoration
- Prevents saving during bulk generation
- Keyboard shortcuts: Ctrl+Z, Ctrl+Y

### State Management Flags
- `isRestoringState` - Prevents saving during undo/redo
- `isGenerating` - Prevents saving during worksheet generation
- Clears history on new worksheet generation

### Transform Preservation (Lines 2796-2810)
- Preserves user positioning when regenerating
- Only if exercise count unchanged
- Only if exercise numbers setting unchanged
- Allows regeneration without losing manual adjustments

### Initial Auto-Generation (Lines 1517-1574)
**On Page Load:**
1. Wait for themes to load (max 2 seconds)
2. Set Letter Portrait (612x792)
3. Set 5 exercises
4. Set Similar mode
5. Set Theme A = "animals"
6. Set Theme B = "food"
7. Include exercise numbers
8. Auto-generate worksheet

---

## 14. ERROR HANDLING & VALIDATION

### Generation Validation (Lines 2737-2771)
- Checks for insufficient images in theme
- Validates unique odd-one-out availability
- Shows localized error messages
- Prevents generation with incomplete selections

### Answer Key Safeguards (Lines 2901-2910)
- Requires worksheet generated first
- Validates exercise count matches current setting
- Shows error if settings changed since worksheet generation

### Image Loading
- Lazy loading for performance
- Crossorigin anonymous for CORS
- Graceful fallback for missing images

---

## 15. UNIQUE FEATURES & INNOVATIONS

### Per-Exercise Mode Override
- Global mode setting affects all exercises
- Individual exercises can override mode
- Allows mixing identical and similar modes on same worksheet

### Theme Preloading (Lines 2514-2535)
- Preloads "animals" theme in background
- Caches first 8 images in browser
- Faster initial worksheet generation
- Fails silently if unavailable

### Smart Image Distribution (Lines 3136-3162)
**Adaptive Sizing Algorithm:**
1. Start with ideal image size (140% of container)
2. Calculate total width needed with 8% spacing
3. If doesn't fit, try minimal spacing (5px)
4. If still doesn't fit, scale images down
5. Center images within card
6. Ensures all images always visible

### Dynamic Row Selector (Lines 3660-3671)
- Updates options based on exercise count
- Automatically clears selections beyond count
- Forces worksheet regeneration on count change

---

## KEY IMPLEMENTATION NOTES

1. **Pricing Tier:** Full Access only ($240/year or $25/month)
2. **Default Theme:** "animals" (auto-selected and preloaded)
3. **Canvas Framework:** Fabric.js 5.3.1
4. **PDF Export:** jsPDF 2.5.1
5. **Translation System:** Unified Language Manager
6. **Image API:** `/api/images?theme={theme}&locale={locale}`
7. **Free Tier:** Watermarks applied if `?tier=free` parameter present

---

## VERIFIED LINE REFERENCES

- Page Setup: Lines 1057-1095
- Text Tools: Lines 1098-1118
- Exercise Config: Lines 1122-1159
- Image Library: Lines 1162-1181
- Upload: Lines 1184-1196
- Canvas Controls: Lines 1258-1275, 1209-1251
- Generation: Lines 2790-2898, 2900-2982
- Card Rendering: Lines 2984-3213
- Headers: Lines 1647-1873
- Multi-language: Lines 1032-1051, 1318-1366

---

**Analysis Complete** ✓
**Total Lines Analyzed:** 3994
**Features Documented:** 100+
**All Settings Verified:** Yes
