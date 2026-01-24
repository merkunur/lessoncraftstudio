# Picture Bingo Worksheet Generator - Complete Feature Analysis

**Analysis Date:** 2025-12-18
**Source File:** REFERENCE APPS/bingo.html
**App Type:** Picture Bingo Card Generator

---

## Core Bingo Features

### 1. Bingo Card Settings (Accordion Section 3)
**Location:** Lines 592-615

**Grid Size Options:**
- Rows: 3-5 (adjustable)
- Columns: 3-5 (adjustable)
- Creates traditional bingo grids from 3x3 to 5x5

**Number of Cards:**
- Generate 1-10 bingo cards per worksheet
- Each card has unique image/word placement

**Card Cell Fill Options:**
- Image: Fill bingo card cells with images
- Word: Fill bingo card cells with words (image filenames)

**Chip Fill Options:**
- Image: Call-out chips show images
- Word: Call-out chips show words

**Custom Call-outs:**
- Checkbox: "Use custom selection"
- Allows user to select specific images for custom call-outs
- When enabled, only selected images appear in the bingo game

---

## 2. Image Library (Accordion Section 4)
**Location:** Lines 617-629

**Theme Selection:**
- Dropdown with theme categories
- Dynamically loaded based on language selection
- 3000+ child-friendly images organized by themes

**Search Functionality:**
- Search box to find specific images
- Filters images by filename

**Image Selection for Custom Call-outs:**
- Click images to select for custom call-outs
- Selected count displayed
- Selected images preview shown
- Can combine library images with uploaded images

---

## 3. Upload Custom Images (Accordion Section 5)
**Location:** Lines 632-646

**Multi-file Upload:**
- Accept multiple image files at once
- Supported formats: JPEG, PNG, GIF
- Shows "No file chosen" status before upload
- Preview of uploaded images in session

**Integration:**
- Uploaded images available for bingo cards
- Can be used in card cells and call-out chips
- Combine with library images

---

## 4. Page Setup (Accordion Section 1)
**Location:** Lines 524-565

**Page Size Options:**
- Letter Portrait (8.5×11")
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200x1200)
- Custom (user-defined width/height in pixels)

**Page Color:**
- Color picker for background page color

**Background Theme:**
- Dropdown with background themes
- Opacity slider (0-100%)
- Background dictionary/preview

**Border Theme:**
- Dropdown with border themes
- Opacity slider (0-100%)
- Border dictionary/preview

---

## 5. Text Tools (Accordion Section 2)
**Location:** Lines 568-588

**Add New Text:**
- Text input field with placeholder "Hello!"
- Add Text button

**Selected Text Properties:**
- Color picker for text color (default: #333333)
- Font size input (min: 8, default: 48)
- Font family dropdown:
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- Outline color picker (default: #000000)
- Outline width slider (0-10, step 0.5)

---

## 6. Canvas Editing Features

**Object Manipulation:**
- Drag to move
- Scale/resize with corner handles
- Rotate images and text
- Delete selected objects
- Lock/unlock objects

**Layering Controls:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Tools:**
- Align Selected (relative to each other)
- Align to Page (relative to page boundaries)

**Undo/Redo:**
- Full history support
- Undo button in header
- Redo button in header

---

## 7. Multi-Tab Interface

**Tab 1: Cards + Chips**
- Main bingo card preview
- Shows all generated bingo cards
- Shows call-out chips for the game

**Tab 2: Call-outs**
- Separate view for call-out sheet
- Used by game caller/teacher
- Lists all images/words to call out

---

## 8. Language Support (11 Languages)
**Location:** Lines 506-519

**UI Languages:**
- English (en)
- German (de)
- French (fr)
- Spanish (es)
- Portuguese (pt)
- Italian (it)
- Dutch (nl)
- Swedish (sv)
- Danish (da)
- Norwegian (no)
- Finnish (fi)

**Content Language:**
- Separate language selector for image library
- Image filenames in selected language
- Critical for word-based bingo cards

---

## 9. Download Options
**Location:** Lines 726-728+

**Format Options:**
- Worksheet (JPEG) - download current tab
- Worksheet (PDF) - download current tab
- Multiple formats supported

**Export Features:**
- High-resolution 300 DPI
- Professional quality
- Separate downloads for Cards/Chips and Call-outs tabs
- Grayscale option (referenced in app structure)

---

## 10. Header Controls

**Generate Button:**
- Primary action button
- Generates bingo cards based on settings
- Creates random card layouts

**Download Dropdown:**
- Download Worksheet (JPEG)
- Download Worksheet (PDF)
- Grayscale option (likely)

**Zoom Controls:**
- Zoom in button
- Zoom out button
- Zoom percentage display
- Fit to screen

**Unlock All Button:**
- Appears when objects are locked
- Unlocks all locked objects on canvas
- Helps with editing locked elements

---

## Key Bingo Game Mechanics

### How It Works:
1. User selects 3-5 rows and 3-5 columns for grid size
2. User chooses 1-10 cards to generate
3. User selects images from library or uploads custom images
4. Optional: Select specific images for custom call-outs
5. User chooses "Image" or "Word" fill for card cells and chips
6. Generate button creates:
   - Multiple unique bingo cards (each with different image placement)
   - Call-out chips sheet (for caller to draw from)
7. Each card has randomly placed images/words
8. No two cards are identical (unless very small image pool)
9. Call-outs sheet lists all possible items that can be called

### Educational Value:
- Visual recognition (image-based bingo)
- Vocabulary building (word-based bingo)
- Listening skills (following call-outs)
- Pattern recognition (completing rows/columns)
- Social interaction (group game)
- Focus and attention (tracking called items)

---

## Summary of Unique Features

1. **Flexible Grid Sizes:** 3x3, 3x4, 3x5, 4x3, 4x4, 4x5, 5x3, 5x4, 5x5
2. **Multiple Cards:** Generate 1-10 unique cards at once
3. **Dual Fill Options:** Choose images OR words for both cards and chips
4. **Custom Call-outs:** Select specific images to limit game scope
5. **Call-out Sheet:** Separate tab with all game call-outs
6. **Multi-language Support:** Critical for ESL/bilingual classrooms
7. **Upload Custom Images:** Personalize with student photos, classroom items
8. **Professional Quality:** 300 DPI for printing and selling
9. **Full Canvas Edit:** Customize every element after generation
10. **Theme Integration:** Background and border themes for attractive cards
