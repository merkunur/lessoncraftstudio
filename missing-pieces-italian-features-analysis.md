# Missing Pieces App - Feature Analysis (Source: REFERENCE APPS/missing pieces.html)

## App Overview
Missing Pieces is an educational puzzle worksheet generator where students identify missing parts of images and select the correct piece from multiple options.

## Accordion Sections Found (Lines 980-1116)

### 1. Language Settings (Line 980)
- **11 language support**: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- Language selector dropdown affects UI and content

### 2. Page Setup (Line 1001)
**Page Size Options:**
- Letter Portrait (8.5×11")
- Default Worksheet (800x1000)
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Letter Landscape (11×8.5")
- Square (1200x1200)
- Custom dimensions

**Page Color:** Color picker for background

**Background Themes:**
- Theme selector dropdown
- Background dictionary display
- Opacity slider (0-1)

**Border Themes:**
- Theme selector dropdown
- Border dictionary display
- Opacity slider (0-1)

### 3. Text Tools (Line 1046)
**Add New Text:**
- Text content input field
- "Add Text" button

**Text Properties (for selected text):**
- Color picker
- Font size (min: 8px)
- Font family: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
- Outline color
- Outline width (0-10px slider)

### 4. Puzzle Configuration (Line 1070)
**Key Settings:**
- **Missing Pieces Count:** 1-5 pieces can be missing
- **Solution Options:** 2-6 answer choices displayed
- **Piece Shape:**
  - Square
  - Circle
  - Rectangle (Portrait)
  - Rectangle (Landscape)
  - Ellipse (Portrait)
  - Ellipse (Landscape)

### 5. Image Library (Line 1089)
- Theme selector dropdown
- Search input field
- Dictionary display of available images
- Selected images preview area
- 3000+ child-friendly images organized by themes

### 6. Upload Custom Images (Line 1103)
- Multi-file upload input
- Accepts all common image formats
- Uploaded images preview area
- Session-based storage

## How Missing Pieces Works

1. **Select an Image:** Choose from theme-based library or upload custom
2. **Configure Puzzle:** Set missing pieces count (1-5), solution options (2-6), piece shape
3. **Generate Worksheet:** App creates puzzle with missing piece(s)
4. **Solution Choices:** Multiple answer options shown at bottom
5. **Edit on Canvas:** Drag, rotate, scale all elements
6. **Download:** Export as PDF or JPEG at 300 DPI

## 7 General Features

1. **Easy Creation:** Theme selection or individual image browsing
2. **Full Editability:** Fabric.js canvas - drag, rotate, scale everything
3. **Upload Custom Images:** Multi-file upload, all formats
4. **11 Languages:** Complete UI and content translation
5. **POD License:** 300 DPI commercial quality included with subscription
6. **Image Library:** 3000+ child-friendly themed images
7. **Professional Quality:** PDF/JPEG export, grayscale option, 300 DPI

## Unique Features of Missing Pieces

- **Visual Discrimination:** Helps develop observation skills
- **Cognitive Skills:** Pattern recognition and problem-solving
- **Customizable Difficulty:** Adjust missing pieces count and solution options
- **Multiple Piece Shapes:** Square, circle, rectangle, ellipse variations
- **Special Education Friendly:** Adjustable complexity levels
- **Pre-K to Grade 3:** Suitable for wide age range

## Technical Details
- Canvas-based editing with Fabric.js
- Multi-language support via translation files
- Border and background theme system
- Custom image upload capability
- Export to PDF (jsPDF) and JPEG formats
