# Math Puzzle App - Features Analysis

## Source File
`REFERENCE APPS/math puzzle.html`

## App Overview
Math puzzle worksheet generator that creates symbol-based math equations where each symbol represents a number. Students solve the puzzle to determine which number each symbol represents.

## Core Features (Verified from HTML)

### 1. Language Support (Line 943-954)
- 11 languages: EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI
- Language affects UI translations and image library content
- Dropdown selector: `#languageSelect`

### 2. Puzzle Configuration (Line 1023-1035)
- **Grid Size:**
  - Rows: 2-4 (input: `#rowInput`)
  - Columns: 2-4 (input: `#colInput`)
  - Creates a grid of math equations
- **Operations:**
  - Addition only
  - Subtraction only
  - Both addition & subtraction mixed
  - Dropdown: `#opSelect`

### 3. Page Setup (Line 962-993)
- **Page Sizes (Line 965-972):**
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Default Worksheet (800x1000)
  - Square (1200x1200)
- **Page Color:** Custom color picker (#pageColor)
- **Background Themes:** Theme dropdown with opacity control
- **Border Themes:** Theme dropdown with opacity control

### 4. Image Library (Line 1039-1052)
- **Theme Selection:** Dropdown selector
- **Search Functionality:** Search by keyword (e.g., "cat", "apple")
- **3000+ Images:** Theme-organized, child-friendly
- **Selection Preview:** Shows selected image for puzzle symbols

### 5. Upload Custom Images (Line 1055-1067)
- Multi-file upload support
- All common formats (JPEG, PNG, GIF, etc.)
- Session-based storage
- Preview of uploaded images

### 6. Text Tools (Line 999-1019)
- **Add Custom Text:** Input field + "Add Text" button
- **Fonts:** Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
- **Text Properties:**
  - Color picker
  - Font size (8+ pixels)
  - Outline color
  - Outline width (0-10)

### 7. Canvas Editing
- **Full Editability:** Drag, rotate, scale, delete any element
- **Lock/Unlock Objects:** Protect elements from accidental editing
- **Undo/Redo:** Full history management
- **Zoom Controls:** Zoom in, zoom out, reset zoom
- **Layer Management (Line 1080-1086):**
  - Bring to Front
  - Bring Forward
  - Send Backward
  - Send to Back
- **Alignment Tools (Line 1091-1109):**
  - Align selected objects (left, center, right, top, middle, bottom)
  - Center on page (horizontally, vertically)

### 8. Dual Canvas System (Line 1123-1124)
- **Worksheet Tab:** Shows puzzle with empty answer boxes
- **Answer Key Tab:** Shows puzzle with solutions filled in
- Both tabs downloadable separately

### 9. Download Options (Line 1152-1163)
- **JPEG Format:**
  - Worksheet (JPEG)
  - Answer Key (JPEG)
- **PDF Format:**
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale Option:** Checkbox to save ink when printing

### 10. Generation Features (Line 1145-1149)
- **New Worksheet:** Generates new random puzzle
- **Answer Key:** Automatically generates solution key
- **Clear All:** Reset canvas completely

## How It Works
1. Student selects image for puzzle symbols
2. Sets grid size (e.g., 3×3 = 9 equations)
3. Chooses operation type (addition, subtraction, or both)
4. Clicks "Create" - generates random math equations using symbols
5. Each symbol represents a number (1-10 typically)
6. Students solve equations to determine which number each symbol represents
7. Answer key shows the solution for teacher verification

## Example Puzzle
If ★ = 5, ● = 3, ■ = 7:
- ★ + ● = 8
- ■ - ● = 4
- ★ + ★ = 10

## Professional Quality
- 300 DPI export for printing and selling
- Commercial POD license included
- Professional worksheet appearance
- Answer key generation

## Pricing Verification
**Math Puzzle = Full Access ($240/year)**
- From SEO-RULES.md line 210
- Full Access subscription required
- Includes all 33 apps
- Commercial license included
