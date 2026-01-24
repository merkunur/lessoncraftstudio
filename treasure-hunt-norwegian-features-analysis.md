# Treasure Hunt App - Comprehensive Features Analysis

**Source:** `REFERENCE APPS/treasure hunt.html`
**Analysis Date:** 2025-12-28
**App Tier:** Full Access ($240/year)

## Core Features

### 1. Puzzle Setup (Accordion: "settings.puzzleSetup" - line 661)
- **Theme-based generation** (line 663): Select from pre-defined themes to auto-populate 6 images
- **Manual selection** (line 667): Click 6 images individually from library
- **Direction type selector** (line 672):
  - Basic directions: up, down, left, right (Pre-K to 1st Grade) - line 674
  - Cardinal directions: north, south, east, west (2nd Grade+) - line 675
- **Selected images preview** (line 668): Shows currently selected 6 images
- **Selection counter** (line 669): "Selected: X / 6"

### 2. Page Setup (Accordion: "settings.pageSetup" - line 604)
- **Page sizes** (line 607):
  - Letter Portrait (612×792) - line 608
  - Letter Landscape (792×612) - line 609
  - A4 Portrait (595×842) - line 610
  - A4 Landscape (842×595) - line 611
  - Square (1200×1200) - line 612
  - Custom (user-defined width/height) - line 613
- **Page color picker** (line 622)
- **Background themes** (line 624): Theme selector with opacity control
- **Border themes** (line 630): Theme selector with opacity control

### 3. Language Settings (Accordion: "settings.language" - line 581)
- **11 languages supported** (lines 585-595):
  - English, German, French, Spanish, Portuguese, Italian
  - Dutch, Swedish, Danish, **Norwegian**, Finnish
- **Content language selector** (line 584): Controls language for image library words
- **UI language**: Controlled separately via URL parameter

### 4. Image Library (Accordion: "library.title" - line 684)
- **Theme filtering** (line 687): Filter by theme category
- **Search functionality** (line 689): Search images by keyword
- **Visual dictionary** (line 691): Grid of clickable images
- **Click to select**: Add images to manual selection (up to 6)

### 5. Custom Image Upload (Accordion: "library.uploadTitle" - line 696)
- **Multi-file upload** (line 702): Upload multiple images at once
- **File formats**: Accepts all image formats (JPEG, PNG, GIF, etc.)
- **Uploaded images preview** (line 705): Shows uploaded images
- **Click to select**: Add uploaded images to worksheet

### 6. Text Tools (Accordion: "settings.textTools" - line 639)
- **Add new text** (line 642): Input field for text content
- **Text properties** when selected (line 644):
  - Color picker (line 645)
  - Font size (line 646): Minimum 8px
  - Font family (lines 648-656): 7 fonts available
    - Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana

### 7. Canvas Editing Features
- **Full editability**: All elements draggable, rotatable, scalable
- **Object context toolbar** (line 719):
  - **Layer controls** (lines 722-728):
    - Bring to front
    - Bring forward
    - Send backward
    - Send to back
  - **Alignment tools** (lines 733-752):
    - Align left, center horizontally, align right
    - Align top, center vertically, align bottom
    - Center on page horizontally/vertically/both
  - **Lock/Unlock** (line 757): Prevent accidental movement
  - **Delete** (line 760): Remove selected objects

### 8. Zoom Controls (lines 771-774)
- Zoom in (+)
- Zoom out (-)
- Reset zoom (100%)
- Current zoom percentage display

### 9. History Management (lines 777-778)
- **Undo** (Ctrl+Z)
- **Redo** (Ctrl+Y)
- **Max history**: 20 steps (line 1150)
- **Unlock all button** (lines 781-785): Shown when objects are locked

### 10. Worksheet Generation (lines 788-792)
- **New Worksheet** button: Creates new treasure hunt puzzle
- **Answer Key** button: Generates answer key (enabled after worksheet created)

### 11. Download Options (lines 795-806)
- **Worksheet (JPEG)** (line 797)
- **Answer Key (JPEG)** (line 798) - disabled until generated
- **Worksheet (PDF)** (line 800)
- **Answer Key (PDF)** (line 801) - disabled until generated
- **Grayscale toggle** (line 804): Convert to black/white to save ink

### 12. Tabs (lines 766-767)
- **Worksheet tab**: Edit main puzzle
- **Answer Key tab**: View/edit answer key

### 13. Professional Header Generation (lines 1257-1468)
- **Automatic headers** in 11 languages (lines 1258-1270):
  - Norwegian: Title "Skattejakt", Description "Følg sporene og finn skatten!"
- **Responsive design**: Different layouts for portrait vs landscape (lines 1323-1465)
- **Editable text**: Both title and description are editable IText objects
- **Decorative elements**:
  - Outer border (rich amber/gold color) - line 1290
  - Inner border (soft sandy beige) - line 1307

### 14. Treasure Hunt Puzzle Generation
- **Grid-based layout**: Creates grid with images
- **Direction clues** (lines 936-1104): Translated directional vocabulary
  - Start at position
  - Move X squares north/south/east/west (or up/down/left/right)
  - Final question: "Where is the treasure?" in 11 languages
- **Answer key**: Shows solution path marked on grid

### 15. Export Quality
- **300 DPI** professional quality (mentioned in concept, standard for all apps)
- **Multiple formats**: JPEG and PDF
- **Grayscale option**: Ink-saving feature
- **High-resolution export**: Sharp, print-ready worksheets

## Technical Implementation Notes
- Uses Fabric.js canvas library (line 6)
- jsPDF for PDF generation (line 7)
- Translation system with 11 languages (line 8)
- Bulletproof loader for robustness (line 9)
- Unified language manager (line 10)
- Border/background sizer utility (line 11)

## Key Differentiators for Content
1. **Educational focus on directions/spatial reasoning**
2. **Age-appropriate vocabulary** (basic vs cardinal directions)
3. **Grid-based puzzle format** (different from wordsearch)
4. **Following sequential clues** (step-by-step logic)
5. **Treasure hunt theme** (engaging for children)
6. **Combines multiple skills**: Reading, spatial reasoning, counting squares

## Norwegian Educational Context
- Fits småskoletrinnet (1. trinn to 4. trinn)
- Supports "orientering" and spatial concepts
- Helps with directional vocabulary in Norwegian
- Combines leseforståelse (reading comprehension) with spatial skills
