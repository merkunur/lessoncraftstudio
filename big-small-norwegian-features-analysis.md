# Big Small App - Features Analysis (for Norwegian Page)

**Source:** C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\big small.html

## Core Purpose
Big Small worksheet generator creates size comparison worksheets where students:
- Circle the biggest/smallest/medium object
- Number objects from small to big (or big to small)
- Practice visual discrimination and size concepts

## 1. Page Setup (Lines 1021-1053)

**Page Size Options (Line 1025-1031):**
- Default Worksheet (800x1000)
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Letter Portrait (8.5×11") - SELECTED by default
- Letter Landscape (11×8.5")
- Custom size

**Custom Dimensions (Lines 1034-1035):**
- Width input (px)
- Height input (px)

**Page Color (Line 1037):**
- Color picker for page background

**Name/Date Fields (Line 1039):**
- Checkbox to include name/date fields on worksheet

## 2. Background & Border (Lines 1055-1066)

**Background Theme (Lines 1056-1058):**
- Theme dropdown (None + theme options)
- Background dictionary with theme previews
- Opacity control

**Border Theme (Lines 1061-1066):**
- Border theme dropdown (None + theme options)
- Border dictionary with theme previews
- Opacity control

## 3. Text Tools (Lines 1071-1090)

**Add New Text (Lines 1073-1075):**
- Text input field
- Add Text button

**Selected Text Properties (Lines 1076-1090):**
- Color picker
- Font size (minimum 8)
- Font family dropdown
- Outline color
- Outline width (0-10 range slider)

## 4. Exercise Settings - THE CORE FEATURE (Lines 1095-1121)

**Number of Exercises (Line 1097):**
- Input: 1 to 10 exercises per worksheet

**Images per Exercise (Lines 1099-1100):**
- 2 images (for big/small comparison)
- 3 images (for big/medium/small comparison)

**Image Mode (Lines 1101-1105):**
- **Identical Images**: Same object in different sizes
- **Different Images**: Different objects in different sizes (SELECTED by default)

**Question Type (Lines 1106-1113):**
- "Circle the small one" - findSmall
- "Circle the big one" - findBig (SELECTED by default)
- "Circle the medium one" - findMed (only available with 3 images)
- "Number 1-2-3 (small to big)" - orderAsc
- "Number 1-2-3 (big to small)" - orderDesc

**Answer Indicators (Line 1115):**
- Checkbox: Add answer indicators (circles/boxes around correct answer)

**Exercise Numbers (Line 1118):**
- Checkbox: Add exercise numbers (CHECKED by default)

**Worksheet Theme (Lines 1120-1121):**
- Theme dropdown for automatic image selection (if not manually picking images)

## 5. Image Library (Lines 1126-1136)

**11 Languages (Lines 988-999):**
- English, Deutsch, Français, Español, Português, Italiano, Nederlands, Svenska, Dansk, Norsk, Suomi

**Theme Selection (Lines 1128-1129):**
- Dropdown to select theme category
- Shows all images in that theme

**Search Functionality (Line 1130):**
- Search input to filter images

**Image Dictionary (Line 1133):**
- Grid of available images from selected theme

**Selected Images (Line 1135):**
- Shows images chosen for the worksheet problems

## 6. Upload Custom Images (Lines 1141-1152)

**File Upload (Lines 1143-1148):**
- Multi-file upload input
- "Choose files" button
- File status display

**Uploaded Images Preview (Lines 1151-1152):**
- Shows all uploaded images for current session
- Images can be used in worksheet

## 7. Canvas Editing & Toolbar (Lines 1166-1203)

**Layer Controls (Lines 1166-1171):**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Tools (Lines 1177-1194):**
- Align Selected: Left, Center H, Right, Top, Center V, Bottom
- Align to Page: Center Horizontally, Center Vertically

**Lock/Unlock (Line 1200):**
- Lock or unlock selected object

**Delete (Line 1203):**
- Delete selected object

**Additional Controls:**
- Unlock All button (Line 1226)
- Undo/Redo (Lines 1221-1222)
- Zoom In/Out/Reset (Lines 1215-1218)

## 8. Worksheet Tabs & Generation (Lines 1210-1235)

**Tabs (Lines 1210-1211):**
- Worksheet Tab (active)
- Answer Key Tab

**Create Dropdown (Lines 1232-1235):**
- New Worksheet
- Answer Key (disabled until worksheet created)

## 9. Download Options (Lines 1239-1248)

**Download Formats:**
- Worksheet (JPEG) - disabled until generated
- Answer Key (JPEG) - disabled until generated
- Worksheet (PDF) - disabled until generated
- Answer Key (PDF) - disabled until generated

**Grayscale Option (Line 1248):**
- Checkbox to convert to grayscale (save ink)

## 10. Clear All (Line 1252)
- Button to clear entire canvas and start over

---

## Key Educational Value

**Size Comparison Concept:**
- Essential pre-K and kindergarten math skill
- Visual discrimination
- Relative size understanding
- Ordering and sequencing (small → medium → big)

**Flexibility:**
- Use identical objects (clear size comparison) or different objects (more challenging)
- 2-way comparison (big/small) or 3-way comparison (big/medium/small)
- Multiple question types (circle or number)
- 1-10 exercises per worksheet for differentiation

**Answer Key:**
- Automatic answer key generation with indicators showing correct answers
- Perfect for teacher grading or self-checking

---

## Summary of ALL Features for Content Writing

✓ Easy worksheet creation in 3 clicks
✓ Full canvas editability (drag, rotate, scale, delete)
✓ Upload custom images (multi-file, any format)
✓ 11 languages for image library
✓ POD commercial license (300 DPI)
✓ 3000+ image library with theme-based organization
✓ Professional quality PDF/JPEG export
✓ Grayscale option
✓ Automatic answer key generation
✓ Undo/redo functionality
✓ Background and border themes with opacity control
✓ Customizable text with fonts, colors, outlines
✓ Layer and alignment tools
✓ Name/date fields option
✓ 1-10 exercises per worksheet
✓ 2 or 3 images per exercise
✓ Identical or different image modes
✓ 5 question types (circle big, circle small, circle medium, order ascending, order descending)
✓ Answer indicators (circles/boxes)
✓ Exercise numbering
