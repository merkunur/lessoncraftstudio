# Big & Small Worksheet Generator - Feature Analysis

## App Purpose
Creates size comparison worksheets for early childhood education. Children learn relative size concepts (big, small, medium) through visual comparison exercises.

## Core Features (From REFERENCE APPS/big small.html)

### Exercise Settings (Lines 1095-1123)

1. **Number of Exercises** (Line 1097-1098)
   - Range: 1-10 exercises per worksheet
   - Default: 4 exercises

2. **Images per Exercise** (Line 1099-1100)
   - Options: 2 images or 3 images
   - Affects available question types

3. **Image Mode** (Line 1101-1105)
   - Identical Images: Same object in different sizes
   - Different Images: Different objects in different sizes

4. **Question Types** (Line 1106-1113)
   - "Circle the small one" (findSmall)
   - "Circle the big one" (findBig)
   - "Circle the medium one" (findMed) - requires 3 images
   - "Number 1-2-3 (small to big)" (orderAsc) - ordering smallest to largest
   - "Number 1-2-3 (big to small)" (orderDesc) - ordering largest to smallest

5. **Answer Indicators** (Line 1114-1116)
   - Optional circles/boxes to mark answers
   - Checkbox option

6. **Exercise Numbers** (Line 1117-1119)
   - Optional numbering of exercises (1, 2, 3, etc.)
   - Checked by default

7. **Worksheet Theme** (Line 1120-1122)
   - Auto-select theme if not manually picking images
   - Uses themed image sets

### Page Setup Features (Lines 1021-1068)

1. **Page Size Options** (Lines 1026-1033)
   - Letter Portrait (8.5×11") - Default
   - Letter Landscape (11×8.5")
   - A4 Portrait (210×297mm)
   - A4 Landscape (297×210mm)
   - Custom dimensions

2. **Page Color** (Line 1037)
   - Custom background color selector
   - Default: White (#FFFFFF)

3. **Name/Date Fields** (Line 1039)
   - Optional checkbox to include student name and date fields

4. **Background Themes** (Lines 1055-1059)
   - Theme-based backgrounds
   - Adjustable opacity

5. **Border Themes** (Lines 1061-1066)
   - Decorative borders
   - Adjustable opacity
   - Theme selector

### Text Tools (Lines 1071-1093)

1. **Add Custom Text** (Lines 1073-1075)
   - Text input for titles, instructions, etc.
   - Placeholder: "Worksheet Title..."

2. **Text Properties** (Line 1076)
   - Editable properties for selected text
   - Font, size, color, etc.

### Image Library (Lines 1126-1138)

1. **11 Language Support** (Lines 987-1001)
   - Image library in 11 languages
   - English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish

2. **Theme Selection** (Lines 1128-1129)
   - Browse images by theme category

3. **Search Functionality** (Lines 1130-1131)
   - Search images by keyword
   - Example: "apple, car"

4. **Image Selection** (Lines 1132-1136)
   - Select specific images for exercises
   - Preview selected images
   - Shows count of selected images

### Upload Custom Images (Lines 1141-1154)

1. **Multi-file Upload** (Lines 1143-1149)
   - Upload multiple images at once
   - Accepts common image formats (JPEG, PNG, GIF)

2. **Session Storage** (Lines 1151-1152)
   - Uploaded images available during current session

### Canvas Editing (Lines 1163-1204)

1. **Object Toolbar** (Lines 1163-1204)
   - Layer management (front, back, forward, backward)
   - Alignment tools (left, center, right, top, middle, bottom)
   - Center on page (horizontal and vertical)
   - Lock/Unlock objects
   - Delete selected objects

### Tabs (Lines 1210-1211)

1. **Worksheet Tab**
   - Main editable worksheet

2. **Answer Key Tab**
   - Automatically generated answer key
   - Shows correct answers

### Download Options (Lines 1239-1244)

1. **JPEG Format**
   - Download worksheet as JPEG
   - Download answer key as JPEG

2. **PDF Format**
   - Download worksheet as PDF
   - Download answer key as PDF

3. **Grayscale Option** (mentioned in multiple app pages)
   - Save ink for classroom printing
   - Black and white output

### Professional Features

1. **300 DPI Quality**
   - Professional print resolution
   - High-quality exports

2. **Undo/Redo** (Lines 1221-1222)
   - Full edit history
   - Keyboard shortcuts (Ctrl+Z, Ctrl+Y)

3. **Zoom Controls** (Lines 1215-1218)
   - Zoom in/out
   - Reset zoom to 100%
   - Precise editing

## Educational Value

**Age Range:** Preschool - 1st grade (ages 3-7)

**Cognitive Skills Developed:**
- Visual discrimination
- Size comparison
- Relative size concepts
- Ordering and sequencing
- Problem-solving
- Fine motor skills (circling, numbering)

**Mathematics Connection:**
- Pre-math concepts (bigger, smaller)
- Seriation and ordering
- Measurement foundations

**Language Skills:**
- Vocabulary: big, small, medium, bigger, smaller
- Following directions
- Comparative language

## Use Cases

1. **Preschool Teachers:** Size concept introduction
2. **Kindergarten Teachers:** Math readiness activities
3. **Special Education:** Visual discrimination practice
4. **ESL Teachers:** Size vocabulary in multiple languages
5. **Homeschool Parents:** Cognitive development activities
6. **Speech Therapists:** Comparative language practice

## Technical Implementation
- Fabric.js for canvas manipulation
- jsPDF for PDF generation
- Translation system for 11 languages
- Theme-based image organization system
- Auto-fix system for layout optimization
