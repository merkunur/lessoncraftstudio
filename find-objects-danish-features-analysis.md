# Find Objects App - Features Analysis (Danish Page)

**Source:** REFERENCE APPS/find objects.html
**Date:** 2025-12-25

## App Overview
The Find Objects app (SpotWorks) is a worksheet generator that creates two types of visual discrimination activities:
1. **I Spy Mode** - Find Hidden Objects worksheets
2. **Odd One Out Mode** - Find Unpaired Images worksheets

## Core Features Found in Source Code

### 1. Activity Modes (Line 937-939)
- **I Spy - Find Hidden Objects** (default)
  - Distractors: 8-12 images that fill the worksheet
  - Hidden Objects: 1-3 specific images to find among distractors
- **Odd One Out - Find Unpaired Images**
  - Pairs: 8-12 pairs (16-24 images total)
  - Odd Images: 1-3 unpaired images to identify

### 2. Page Setup (Lines 831-848)
- **Page Size Options:** Letter Portrait/Landscape, A4 Portrait/Landscape, Custom
- **Custom Dimensions:** Width and height in pixels
- Apply Size button

### 3. Background Customization (Lines 850-863)
- Child-Friendly Decorations toggle (checked by default)
- Fallback Color picker
- Background Theme selector (theme-based backgrounds)
- Background Dictionary (visual theme preview)
- Background Opacity slider (0-100%)

### 4. Border Customization (Lines 864-873)
- Border Theme selector
- Border Dictionary (visual preview)
- Border Opacity slider

### 5. Text & Content Tools (Lines 876-903)
- **Add New Text:** Text input field + Add Text button
- **Selected Text Properties:**
  - Color picker
  - Font size (8+ px)
  - Font Family: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Outline Color
  - Outline Width (0-10)
- **Include Name/Date Fields** checkbox

### 6. Image Library (Lines 906-918)
- **3000+ Images** organized by themes
- **Filter by Theme** dropdown ("All Themes" option)
- **Search Images** text field
- Available Images dictionary (visual grid)

### 7. Upload Custom Images (Lines 921-929)
- Multi-file upload input
- Uploaded images preview (this session)
- Supports common formats (JPEG, PNG, GIF)

### 8. I Spy Mode - Object Selection (Lines 944-960)
- **Distractors (8-12):** Background filler images
  - Distractor Theme selector
  - Manual image selection from dictionary
- **Hidden Objects (1-3):** Objects to find
  - Hidden Object Theme selector
  - Manual image selection from dictionary

### 9. Odd One Out Mode - Object Selection (Lines 963-993)
- **Pairs Count:** 8, 9, 10, 11, or 12 pairs (default: 10)
- **Pairs Theme:** Theme selector or manual selection
- **Odd Images Count:** 1, 2, or 3 (default: 2)
- **Odd Images Theme:** Theme selector or manual selection

### 10. Generation & Download (Lines 1071-1091)
- **Generate Dropdown:**
  - New Worksheet
  - Answer Key (shows circles around hidden/odd objects)
- **Download Dropdown:**
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale Option** (checkbox in download dropdown)
- **Clear All** button

### 11. Canvas Editing (Full Fabric.js editing)
- Drag, rotate, scale any object
- Delete objects
- Undo/Redo
- Layer management (bring forward, send backward)
- Contextual toolbar appears when object selected

### 12. 11 Languages Support (Lines 815-826)
- UI in 11 languages: EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI
- Language selector in top panel

### 13. Professional Quality
- 300 DPI export quality
- PDF and JPEG formats
- Grayscale option (save ink)
- Answer key generation

## The 7 General Features (Present in Find Objects)

1. ✅ **Easy Creation** - Select theme for distractors/hidden objects or manual selection
2. ✅ **Full Editability** - Drag, rotate, scale, delete everything on canvas
3. ✅ **Upload Custom Images** - Multi-file upload, combine with library
4. ✅ **11 Languages** - UI translated, content language matters for image filenames
5. ✅ **POD License** - 300 DPI commercial quality for selling
6. ✅ **3000+ Image Library** - Theme-based organization, search functionality
7. ✅ **Professional 300 DPI Quality** - PDF/JPEG export, grayscale option

## Unique Features (Find Objects Specific)

1. **Dual Activity Modes** - I Spy vs Odd One Out (unique to this app)
2. **Answer Key Generation** - Automatic circles around target objects
3. **Flexible Object Counts** - 8-12 distractors, 1-3 hidden objects (I Spy)
4. **Pairs System** - 8-12 pairs + 1-3 odd images (Odd One Out mode)
5. **Theme-Based Selection** - Quick selection by theme for different object types

## Pricing Verification
**Find Objects = FULL ACCESS ($240/year or $25/month)**
- Source: SEO-RULES.md, line 207
- NOT in Core Bundle
- Requires Full Access subscription for all features
