# Odd One Out App - Features Analysis
**Source:** REFERENCE APPS/odd one out.html
**Date:** 2025-12-24

## Core Purpose
Visual discrimination worksheet generator where students identify which image doesn't belong in a group of 4 images.

## Main Features

### 1. Language Support (Line 1031-1045)
- 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- UI language selection
- Important for accessibility

### 2. Page Setup (Lines 1054-1073)
**Page Size Options:**
- Letter Portrait (8.5×11")
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200x1200)
- Custom dimensions

**Page Color:** Color picker for background

### 3. Background Themes (Lines 1075-1081)
- Theme selection dropdown
- Background opacity slider
- Apply theme backgrounds to entire worksheet

### 4. Border Themes (Lines 1084-1093)
- Theme selection dropdown
- Border opacity slider
- Decorative borders around worksheet

### 5. Text Tools (Lines 1098-1119)
**Add Custom Text:**
- Text input field
- Add text button

**Text Properties (for selected text):**
- Color picker
- Font size control (min: 8)
- Font family selection: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana

### 6. Exercise Configuration (Lines 1122-1158)
**Number of Exercises:** 5, 6, 7, 8, 9, or 10 exercises per worksheet

**Two Modes:**
1. **Identical Mode:** 3 identical images + 1 slightly different image from SAME theme
2. **Similar Mode:** 3 images from Theme A + 1 image from Theme B (different category)

**Per-Exercise Control:**
- Select which exercise to configure
- Override global mode for specific exercises
- Clear selections button

**Optional Fields:**
- Include Name/Date fields checkbox
- Include Exercise numbers checkbox

### 7. Image Library (Lines 1162-1180)
- Theme A selection (for Similar/Identical mode)
- Theme B selection (for Similar mode odd one out)
- Search functionality for images
- Click images to add to current exercise
- Preview of selected images:
  - Common Images (3)
  - Odd Image (1)

### 8. Upload Custom Images (Lines 1184-1197)
- Multi-file upload support
- Accept all image formats
- Images available for current session
- Preview uploaded images

### 9. Canvas Editing (Lines 1209-1218)
**Layers Control:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Full Editability:**
- Drag, resize, rotate any element on canvas
- Delete elements
- Undo/redo functionality

### 10. Download Options (Lines 1285-1291)
**Worksheet Downloads:**
- Worksheet as JPEG
- Worksheet as PDF

**Answer Key Downloads:**
- Answer Key as JPEG
- Answer Key as PDF

## Unique Selling Points

1. **Two Different Modes:** Identical (subtle differences) vs Similar (category differences)
2. **Per-Exercise Customization:** Override global mode for individual exercises
3. **Answer Key Generation:** Automatic answer keys showing which image is the odd one out
4. **Flexible Exercise Count:** 5-10 exercises per worksheet
5. **Theme-Based Selection:** Easy to create themed odd-one-out exercises
6. **Visual Discrimination Practice:** Develops critical thinking and observation skills

## Educational Applications

- Visual discrimination skills
- Critical thinking development
- Category recognition
- Attention to detail practice
- Pattern recognition
- Cognitive development for preschool/kindergarten
- Special education differentiation
