# Word Guess App - Complete Features Analysis

**Source:** `REFERENCE APPS/word guess.html`
**Analysis Date:** 2025-12-13
**App Type:** Word puzzle generator with image clues

---

## ACCORDION SECTIONS (8 Total)

### 1. Language Settings (Line 681)
- **Language Selection:** 11 languages supported
  - English, German, French, Spanish, Portuguese, Italian
  - Dutch, Swedish, Danish, Norwegian, Finnish
- **Translation Key:** `word.guess.language.description`
- **Critical Feature:** Language affects word extraction from image filenames

### 2. Page Setup (Line 704)
- **Page Size Options:**
  - Letter Portrait (612×792)
  - Letter Landscape (792×612)
  - A4 Portrait (595×842)
  - A4 Landscape (842×595)
  - Square (1200×1200)
  - Custom dimensions (width/height in pixels)
- **Page Color:** Custom color picker
- **Background Theme:** Theme-based backgrounds with opacity slider
- **Border Theme:** Theme-based borders with opacity slider

### 3. Text Tools (Line 740)
- **Add Custom Text:** Type and add text to canvas
- **Text Color:** Color picker
- **Font Size:** Adjustable (minimum 8px)
- **Font Family:** Multiple font options
- **Outline Color:** Text stroke color picker
- **Outline Width:** 0-10 stroke width slider

### 4. Exercise Configuration (Line 763)
**Number of Puzzles:** 1-10 puzzles per worksheet (Line 765)

**Difficulty Levels** (Line 769-773):
- **No clues:** All boxes empty (value=0)
- **Easy:** 1/2 letters shown (value=2)
- **Normal:** 1/4 letters shown (value=4)
- **Tough:** 1/6 letters shown (value=6)

**Letter Case** (Line 780-782):
- Uppercase (default)
- Lowercase

**Exclude Letters from Clues** (Line 776):
- Custom input to exclude specific letters from being shown as clues

**Additional Options** (Line 786-789):
- Include Name & Date field
- Include Exercise Numbers (checked by default)

### 5. Image Library (Line 795)
- **Theme Selection:** Dropdown to select image theme
- **Search Images:** Search functionality for image library
- **Available Images:** Visual dictionary of available images
- **Selected Images:** Shows currently selected images for puzzles
- **Selection Feedback:** Shows "x/y selected" count (Line 2330)

### 6. Upload Custom Images (Line 810)
- **Multi-File Upload:** Choose multiple image files
- **File Selection Feedback:** Shows "No file chosen" or file count
- **Session Storage:** Uploaded images available during current session
- **Supported Formats:** Common image formats (JPEG, PNG, GIF)

### 7. Manual Image Name Editing (Line 826)
**Enable/Disable Toggle** (Line 829-831):
- Checkbox to enable manual editing mode
- When enabled, manually select and edit image names
- Edit names BEFORE generating puzzles

**Functionality:**
- Click images from library to add to editing list
- Edit the name/word for each selected image
- Prevents automatic word extraction from filename

### 8. Custom Word List (Line 845)
**Enable/Disable Toggle** (Line 848-850):
- Checkbox to use custom word list instead of images
- Textarea input for words (one per line, max 8 words)
- When enabled, puzzles use typed words only (no images displayed)

**Description** (Line 851):
- Explains custom word list overrides image-based mode
- Max 8 words allowed
- One word per line format

---

## CORE FUNCTIONALITY

### Word Extraction (Line 2458)
```javascript
const word = image.word.toUpperCase();
```
- Words extracted from image filenames (basename without extension)
- Converted to uppercase for puzzle generation
- Manual editing overrides automatic extraction

### Difficulty Algorithm (Line 2460-2468)
```javascript
if (difficulty > 0) {
    const clueCount = Math.floor(word.length / difficulty);
    // Generate random clue positions
}
```
- **No clues (0):** All boxes empty
- **Easy (2):** Shows 1/2 of letters (e.g., 4 letters in 8-letter word)
- **Normal (4):** Shows 1/4 of letters (e.g., 2 letters in 8-letter word)
- **Tough (6):** Shows 1/6 of letters (e.g., 1 letter in 6-letter word)

### Layout Algorithm (Line 2604-2674)
**Two-Column Layout** (Line 2605):
- Used when: Landscape orientation AND more than 5 puzzles
- Column gap: 5% of page width
- Items split evenly between columns

**Single-Column Layout:**
- Used for portrait orientation
- Used for landscape with 5 or fewer puzzles

**Puzzle Dimensions** (Line 2637-2638):
- Base row height: 85 units
- Base row width: 120 (image) + 15 (padding) + (8 × 45) letter cells
- Maximum 8 letters per word supported

**Auto-Scaling** (Line 2644-2661):
- Calculates optimal scale for puzzles to fit page
- Considers both horizontal and vertical constraints
- Ensures puzzles fit within available space

### Puzzle Rendering (Line 2571)
Each puzzle consists of:
1. **Image:** Visual clue for the word
2. **Letter Grid:** Boxes for each letter in the word
3. **Pre-filled Letters:** Based on difficulty level
4. **Exercise Number:** Optional numbering

---

## DOWNLOAD OPTIONS

### Worksheet vs Answer Key (Line 915-916)
- **Worksheet Tab:** Shows puzzles with partial clues
- **Answer Key Tab:** Shows all letters filled in

### Download Formats (Line 944-953)
**JPEG Downloads:**
- Worksheet (JPEG)
- Answer Key (JPEG)

**PDF Downloads:**
- Worksheet (PDF)
- Answer Key (PDF)

**Grayscale Option:**
- Checkbox to convert to grayscale
- Saves ink when printing

---

## CANVAS EDITING FEATURES

### Toolbar Buttons (Line 877-880)
- **Bring to Front:** Move selected object to top layer
- **Bring Forward:** Move selected object one layer up
- **Send Backward:** Move selected object one layer down
- **Send to Back:** Move selected object to bottom layer

### Alignment Tools (Line 894-901)
- **Align Top:** Align selected objects to top edge
- **Align Bottom:** Align selected objects to bottom edge
- **Center Horizontally:** Center on page horizontally
- **Center Vertically:** Center on page vertically

### Lock Tool (Line 933)
- **Unlock All:** Unlock all locked objects on canvas

---

## GENERATION BUTTONS (Line 937-940)

### Generate Dropdown:
1. **New Worksheet:** Generate new worksheet with current settings
2. **Answer Key:** Generate answer key for current worksheet

### Limitations:
- Answer key button disabled until worksheet generated
- Download buttons disabled until content generated

---

## KEY FEATURES SUMMARY

### 1. Two Puzzle Modes
- **Image-Based Mode:** Uses image filenames as words (default)
- **Custom Word Mode:** Type your own words (max 8)

### 2. Four Difficulty Levels
- No clues, Easy (1/2), Normal (1/4), Tough (1/6)

### 3. Manual Editing Options
- Edit image names before generating
- Exclude specific letters from clues
- Choose uppercase or lowercase

### 4. Flexible Layout
- 1-10 puzzles per page
- Auto-scaling to fit page
- Two-column layout for landscape with many puzzles

### 5. Full Customization
- Page size and orientation
- Background and border themes
- Custom text addition
- Image upload
- Color and font options

### 6. Professional Output
- 300 DPI quality
- PDF and JPEG formats
- Grayscale option
- Separate answer keys

### 7. 11 Languages
- UI translated to 11 languages
- Word extraction language-aware

### 8. Canvas Editing
- Drag, rotate, scale any element
- Layer management (bring to front/back)
- Alignment tools
- Lock/unlock objects
- Full editability after generation

---

## EDUCATIONAL USE CASES

1. **Vocabulary Building:** Students learn spelling of themed words
2. **Letter Recognition:** Identify missing letters in words
3. **Problem Solving:** Use image clue to guess the word
4. **Fine Motor Skills:** Writing letters in boxes
5. **ESL/Language Learning:** Practice vocabulary with visual support
6. **Differentiation:** Adjust difficulty for different skill levels
7. **Custom Vocabulary:** Create puzzles for specific curriculum topics

---

## TECHNICAL NOTES

- Uses Fabric.js for canvas manipulation
- Automatic theme/image loading from centralized library
- Real-time preview of worksheet and answer key
- Session-based file upload (files not saved permanently)
- Responsive UI with accordion sections
- Translation system for 11 languages
