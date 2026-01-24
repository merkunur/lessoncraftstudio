# Picture Bingo Features Analysis

**Source:** REFERENCE APPS/bingo.html
**App Name:** Picture Bingo Worksheet Generator
**Date Analyzed:** 2025-12-12

---

## 1. CORE APP FUNCTIONALITY

### Primary Purpose
Picture Bingo generates customizable bingo cards with images or words, along with matching calling chips. The app creates two outputs:
1. **Bingo Card Worksheet** - Contains bingo grid + calling chips (single page)
2. **Call-out Sheet** - Separate canvas with all items for calling during gameplay

### Grid Configuration
- **Rows:** 3-5 (user selectable)
- **Columns:** 3-5 (user selectable)
- **Number of Cards:** 1-10 (generates multiple unique cards)
- **Default:** 4×4 grid with 1 card

### Fill Options

**Card Cell Fill:**
- **Image** - Displays images from library in bingo cells
- **Word** - Displays image filename/word in bingo cells

**Chip Fill:**
- **Image** - Circular chips with images (30% larger than cell images, dashed border)
- **Word** - Circular chips with text labels (dashed border)

### Content Sources
1. **Image Library** - 3000+ themed images in 11 languages
2. **Theme Selection** - Pre-organized image themes (alphabet, animals, etc.)
3. **Custom Image Upload** - Multi-file upload support (JPEG, PNG, GIF)
4. **Custom Selection Mode** - Checkbox to use only manually selected images

---

## 2. CANVAS SYSTEM

### Dual Canvas Architecture
- **worksheetCanvas** - Main bingo card with grid + chips
- **calloutsCanvas** - Separate call-out sheet with all items

### Tab Navigation
- **Cards + Chips** tab - Shows bingo card
- **Call-outs** tab - Shows call-out sheet
- User switches between tabs to view/edit each canvas

### Layout Structure

**Bingo Card Layout:**
```
┌────────────────────────────────┐
│  [Page Border - Optional]      │
│  ┌──────────────────────────┐  │
│  │ [Grid Area - 60% height] │  │
│  │ ┌──┬──┬──┬──┐            │  │
│  │ │  │  │  │  │ Cells      │  │
│  │ └──┴──┴──┴──┘            │  │
│  │ [Gap - 20px]             │  │
│  │ ┌────────────────────┐   │  │
│  │ │ Calling Chips (40%) │   │  │
│  │ │ ○ ○ ○ ○            │   │  │
│  │ └────────────────────┘   │  │
│  └──────────────────────────┘  │
│  Margins: 67px all sides       │
└────────────────────────────────┘
```

**Space Allocation:**
- Content margins: 67px (matching border + padding)
- Grid height: 60% of available space (capped at 500px)
- Chips height: 40% of available space (capped at 300px)
- Middle gap: 20px between grid and chips

**Call-out Canvas:**
- Displays all items (cardCount × rows × cols × 2 images)
- Laid out in grid format
- Includes same page borders/backgrounds as main card
- Fully editable like main canvas

---

## 3. IMAGE GENERATION LOGIC

### Image Pool Preparation
```javascript
// Needs: rows × cols items per card
// Callout pool: rows × cols × 2 images (double for variety)
const itemsNeededPerCard = rows * cols
const calloutImageCount = itemsNeededPerCard * 2
```

### Custom Selection Mode
- When "Use custom selection" checkbox is checked:
  - Only manually selected images (from dictionary preview) are used
  - User must select enough images or error shown
- When unchecked:
  - All images from current theme are used
  - System auto-selects from pool

### Card Uniqueness
- Each card gets a unique random selection from the image pool
- `pickGroups()` function ensures cards have different image combinations
- Chips are shuffled independently for each card
- Prevents duplicate cards even when generating 10 cards

---

## 4. EDITING CAPABILITIES

### Object Selection & Manipulation
- Click to select any element (grid, chips, text, images)
- Drag to move
- Corner handles to resize
- Rotation handle to rotate
- Delete selected objects

### Context Toolbar (appears when object selected)
**Layer Controls:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Tools:**
- Align selected objects: Left, Center Horizontal, Right, Top, Center Vertical, Bottom
- Align to page: Center on Page Horizontally, Center on Page Vertically

**Lock/Unlock:**
- Lock objects to prevent editing
- Unlock to resume editing
- "Unlock All" button appears when locked objects exist

**Delete:**
- Delete selected objects

### Regeneration Preservation
- User-edited transforms (position, scale, rotation) preserved across regenerations
- Only works when canvas size hasn't changed
- User-added objects (text, uploaded images) maintained
- Generated bingo elements replaced while keeping customizations

---

## 5. PAGE SETUP OPTIONS

### Page Sizes
- **Letter Portrait:** 8.5×11" (612×792 px)
- **Letter Landscape:** 11×8.5" (792×612 px)
- **A4 Portrait:** 210×297mm (595×842 px)
- **A4 Landscape:** 297×210mm (842×595 px)
- **Square:** 1200×1200 px
- **Custom:** User-defined width and height

### Page Color
- Color picker for page background
- Default: White (#FFFFFF)

### Backgrounds
- Theme-based background selection
- Opacity slider (0-100%)
- Fills entire page behind content
- Preserved across regenerations

### Borders
- Theme-based border selection
- Opacity slider (0-100%)
- Placed at page edges with 40px margin
- Inner border at 52px (40+12)
- Preserved across regenerations

---

## 6. TEXT TOOLS

### Adding Text
- Text input field
- "Add Text" button creates new text object on canvas
- Text appears at center, user can move/edit

### Text Properties (Selected Text)
- **Color:** Color picker
- **Size:** Font size (min 8px)
- **Font:** 7 font options
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- **Outline Color:** Stroke color picker
- **Outline Width:** 0-10 slider (0.5 increments)

---

## 7. DOWNLOAD OPTIONS

### File Formats

**JPEG Downloads:**
- Worksheet (JPEG) - Single bingo card image
- Call-out (JPEG) - Call-out sheet image
- ZIP download - Multiple cards (when cardCount > 1)

**PDF Downloads:**
- Worksheet (PDF) - Single page PDF
- Call-out (PDF) - Single page PDF
- Multi-page PDF - All cards in one PDF (when cardCount > 1)

### Quality Settings
- Export multiplier: 6x (for 300 DPI quality)
- Grayscale toggle for ink-saving
- High-resolution JPEG export (quality: 1.0)

---

## 8. LANGUAGE SUPPORT

### UI Languages (11 Languages)
- English, German, French, Spanish, Italian, Portuguese (Brazilian), Dutch, Danish, Swedish, Norwegian, Finnish
- Set via main app header selector
- Controls interface text only

### Image Library Languages (11 Languages)
- Same 11 languages as UI
- Separate selector in sidebar: "Image Library Language"
- Changes image filenames/words used for word-based fills
- Loads themes/images from language-specific folders
- **CRITICAL SEO FEATURE** - Enables creating bingo cards in native language

---

## 9. STANDARD FEATURES (ALL APPS)

### 1. Easy Creation + Full Editability
✓ Select theme or individual images
✓ Click Generate to create bingo card
✓ Everything on canvas is editable
✓ Drag, rotate, scale, delete any element (grid, chips, text)

### 2. Unlimited Customization
✓ Background themes with opacity control
✓ Border themes with opacity control
✓ Add custom text elements with full styling
✓ Page color customization
✓ Multiple page size options
✓ Create unlimited unique designs

### 3. Upload Own Images
✓ Multi-file upload support
✓ All common formats (JPEG, PNG, GIF)
✓ Combine library images with uploaded images
✓ Uploaded images persist during session
✓ Personalize for your students

### 4. 11 Languages Support
✓ UI in 11 languages
✓ Content in 11 languages
✓ **ESPECIALLY IMPORTANT** for Picture Bingo - image filenames become words
✓ Language-specific image libraries
✓ Creates culturally appropriate content

### 5. POD License
✓ Print-on-demand commercial license included (Core Bundle)
✓ 300 DPI quality for professional printing
✓ Sell on Etsy, Teachers Pay Teachers, Amazon KDP
✓ No attribution required

### 6. 3000+ Image Library
✓ Over 3000 child-friendly images
✓ Theme-based organization (alphabet, animals, shapes, etc.)
✓ Easy theme selection dropdown
✓ Individual image browsing with click-to-select
✓ Search functionality
✓ Works with 11 languages

### 7. Professional 300 DPI Quality
✓ High-resolution export (6x multiplier)
✓ Perfect for printing and selling
✓ JPEG and PDF formats
✓ Grayscale option to save ink
✓ Professional quality worksheets

---

## 10. ZOOM & HISTORY CONTROLS

### Zoom Controls
- Zoom In (+10% per click)
- Zoom Out (-10% per click)
- Reset Zoom (100%)
- Range: 50% to 200%
- Display percentage shown

### Undo/Redo System
- Maximum 20 history states
- Undo button (Ctrl+Z)
- Redo button (Ctrl+Y)
- Buttons disabled when no history
- Clears on new generation (fresh start)
- Does not save during bulk operations

---

## 11. MOBILE RESPONSIVENESS

- Hamburger menu for sidebar on tablets/mobile (<1024px)
- Slide-out panel with overlay
- Touch-friendly controls
- Responsive canvas scaling
- All features accessible on mobile

---

## 12. EXPORT SCALING BEHAVIOR

### Critical Export Details
- Grid elements grouped for organization
- Chips remain individual for better editability
- Relative positioning ensures correct export scaling
- 6x multiplier applied during export for 300 DPI
- Grayscale conversion optional
- Multi-page PDF generation for multiple cards
- ZIP download for JPEG multi-card exports

---

## 13. UNIQUE BINGO-SPECIFIC FEATURES

### Two-Canvas System
- Separate editable canvases for cards and call-outs
- Tab navigation between views
- Both canvases downloadable independently

### Chip Customization
- Image-filled circular chips (30% larger than grid images)
- Word-filled circular chips
- Dashed border styling
- Shuffled arrangement different from grid

### Grid + Chips Layout
- Smart space allocation (60/40 split)
- Automatic sizing based on page dimensions
- Maintains playability across page sizes
- Professional bingo card appearance

### Multiple Card Generation
- 1-10 unique cards per generation
- Each card has different random selection
- Download all as ZIP (JPEG) or multi-page PDF
- Efficient batch generation

---

## KEY SELLING POINTS FOR SEO CONTENT

1. **Dual Output System** - Generates both bingo cards AND call-out sheets
2. **Image or Word Mode** - Flexible fill options for educational needs
3. **Multiple Cards** - Create up to 10 unique cards at once
4. **Custom Image Upload** - Personalize with your own photos
5. **11 Language Support** - Critical for multilingual classrooms and ESL
6. **Theme Library** - 3000+ pre-organized images
7. **Professional Quality** - 300 DPI for printing and selling
8. **Full Editability** - Customize every aspect after generation
9. **POD License** - Sell your creations on TPT, Etsy, Amazon KDP
10. **Easy to Use** - Generate in seconds, no design skills needed

---

## TECHNICAL NOTES FOR CONTENT WRITING

- Picture Bingo generates **bingo cards + calling chips on one page**
- Call-outs sheet is separate editable canvas
- Grid size 3×3 to 5×5 (not just 5×5)
- Can generate 1-10 unique cards at once
- Chips are circular with dashed borders (distinguishes from grid)
- Image chips are 30% larger than grid images for visibility
- Layout: grid (60%) + gap (20px) + chips (40%)
- Both image-based and word-based bingo supported
- Critical for ESL/language learning due to 11-language support
