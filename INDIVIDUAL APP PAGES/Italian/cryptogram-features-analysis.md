# Cryptogram App - Features Analysis (Source of Truth)

**Analyzed from:** `REFERENCE APPS\cryptogram.html`
**Date:** 2025-12-20

## Overview
Image-based cryptogram puzzle generator where letters are represented by images instead of symbols.

## Core Features Found in Code

### 1. Image Cryptogram Settings (Lines 934-991)

#### Language Selection (Lines 936-951)
- **11 Languages Supported:** English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- Image library changes based on language selection
- Important for language-specific image names

#### Puzzle Rules (Lines 958-972)
- **Phrases Input:** Multi-line textarea for entering phrases
- **Letters to Reveal:** Dropdown 0-10 (how many letters to show as hints)
- **Max Lines per Puzzle:** Dropdown 1-8 (how many lines of text in the puzzle)
- **Auto-assign Images Checkbox:** Automatically assigns random images to letters

#### Image Assignment System (Lines 976-990)
- **Theme Selector:** Choose image themes
- **Letter Selection Buttons:** A-Z buttons to select which letter to assign an image
- **Search Bar:** Search images by keyword
- **Dictionary View:** Shows available images to assign
- **Assigned Images Preview:** Shows which images are assigned to which letters

### 2. Upload Custom Images (Lines 992-1005)
- Multi-file upload support
- Custom images can be used instead of library images
- Preview of uploaded images

### 3. Page Setup (Lines 1008-1048)

#### Page Dimensions (Lines 1010-1024)
- **Letter Portrait** (8.5×11")
- **Letter Landscape** (11×8.5")
- **A4 Portrait** (210×297mm)
- **A4 Landscape** (297×210mm)
- **Square** (1200×1200px)
- **Custom** (user-defined width and height)
- **Page Color Picker**

#### Background Options (Lines 1029-1037)
- Background theme selector
- Background opacity slider
- Visual preview of backgrounds

#### Border Options (Lines 1038-1048)
- Border theme selector
- Border opacity slider
- Visual preview of borders

### 4. Text Tools (Lines 1052-1087)

#### Add New Text (Lines 1054-1056)
- Text input field
- Add text button

#### Selected Text Properties (Lines 1057-1071)
- **Color Picker**
- **Font Size:** Adjustable (minimum 8)
- **Font Family:** 7 options
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- **Outline Color Picker**
- **Outline Width:** 0-10 slider

### 5. Canvas Controls (Lines 1089-1120)

#### Layer Management
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

#### Alignment Tools
- **Align Selected Objects:**
  - Align Left
  - Align Center Horizontally
  - Align Right
  - Align Top
  - Align Center Vertically
  - Align Bottom
- **Align to Page:**
  - Center Horizontally on Page
  - Center Vertically on Page

### 6. Worksheet Tabs (Lines 1129-1130)
- **Worksheet Tab:** Shows the puzzle with images (encrypted)
- **Answer Key Tab:** Shows the solution with letters revealed

### 7. Download Options (Lines 1150-1162)
- **Unlock All:** Premium feature unlock
- **Create Button:** Generate the cryptogram
- **Download Dropdown:**
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale Toggle:** Convert to grayscale for printing

### 8. Clear All Button (Line 1165)
- Resets entire worksheet

## Unique Educational Features

### Why Cryptograms Are Educational
1. **Pattern Recognition:** Students identify letter patterns
2. **Logical Thinking:** Deduce letters from context
3. **Vocabulary Building:** Work with complete words and phrases
4. **Visual Memory:** Image-letter associations
5. **Problem-Solving:** Puzzle-solving skills

### Use Cases
- **Literacy Practice:** Letter recognition and word formation
- **Vocabulary Review:** Subject-specific word puzzles
- **Brain Breaks:** Fun educational puzzles
- **ESL Learning:** Associating images with letters
- **Special Education:** Visual learning approach
- **Early Readers:** Picture-based letter learning

## Technical Capabilities

### Canvas Editing (Full Fabric.js functionality)
- Drag, rotate, scale all objects
- Delete any element
- Undo/redo support
- Multi-select objects
- Layer management
- Alignment tools

### Professional Export
- 300 DPI quality
- JPEG and PDF formats
- Grayscale option for ink saving
- Separate worksheet and answer key

### Multi-Language Support
- UI in 11 languages
- Content in 11 languages
- Language-specific image library

## Summary of ALL Features

1. ✅ Easy creation in 3 clicks (enter phrases, select images, generate)
2. ✅ Full canvas editability (drag, rotate, scale, delete everything)
3. ✅ Upload custom images (multi-file upload)
4. ✅ 11 languages (UI and content)
5. ✅ POD license (300 DPI commercial quality)
6. ✅ 3000+ image library (theme-based, searchable)
7. ✅ Professional 300 DPI quality (JPEG/PDF, grayscale option)
8. ✅ Image-letter assignment system (unique to cryptogram)
9. ✅ Auto-assign feature (automatic random assignment)
10. ✅ Letters to reveal (0-10 hints)
11. ✅ Max lines control (1-8 lines per puzzle)
12. ✅ Dual tabs (Worksheet and Answer Key)
13. ✅ Text tools (custom titles, instructions)
14. ✅ Background themes with opacity control
15. ✅ Border themes with opacity control
16. ✅ Layer management and alignment tools
