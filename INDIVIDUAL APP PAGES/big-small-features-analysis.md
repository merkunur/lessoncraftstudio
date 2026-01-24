# Big & Small Worksheet Features Analysis

**Source File:** `REFERENCE APPS/big small.html` (4129 lines)
**Analysis Date:** 2025-12-12
**Purpose:** Document all actual features found in the big small app HTML file

---

## ACCORDION SECTIONS (5 Total)

The app has **5 accordion sections** in the sidebar:

1. **Page Setup** (line 1021)
2. **Text Tools** (line 1071)
3. **Exercise Settings** (line 1095)
4. **Image Library** (line 1126)
5. **Upload Custom Images** (line 1141)

---

## 1. PAGE SETUP

### Page Size Options (line 1005-1010, 1026-1031)
- **Letter Portrait (8.5×11")** - 612x792 (DEFAULT - line 1029)
- **Letter Landscape (11×8.5")** - 792x612
- **A4 Portrait (210×297mm)** - 595x842
- **A4 Landscape (297×210mm)** - 842x595
- **Square** - 1200x1200
- **Custom** - User-defined width and height

### Page Configuration (line 1023-1053)
- **Custom Dimensions:** Width and height in pixels (line 1034-1035)
- **Page Color:** Color picker (line 1037)
- **Include Name/Date Fields:** Checkbox option (line 1039)
  - Adds header space with "Name:" and "Date:" fields at top of worksheet

### Background Options (line 1055-1060)
- **Background Theme Selector:** Dropdown with theme options
- **Background Dictionary:** Visual preview of backgrounds from selected theme
- **Background Opacity:** Slider control (line 1059)

### Border Options (line 1061-1066)
- **Border Theme Selector:** Dropdown with theme options
- **Border Dictionary:** Visual preview of borders from selected theme
- **Border Opacity:** Slider control (line 1064)

---

## 2. TEXT TOOLS (line 1071-1090)

### Add New Text (line 1073-1075)
- **Text Content Input:** Text field with placeholder "Worksheet Title..."
- **Add Text Button:** Adds text to canvas

### Text Properties (line 1076-1090)
Only active when text is selected on canvas:
- **Text Color:** Color picker (line 1077)
- **Font Size:** Number input, default 48, minimum 8 (line 1078)
- **Font Family:** Dropdown selector (line 1079)
- **Outline Color:** Color picker (line 1089)
- **Outline Width:** Range slider 0-10, step 0.5 (line 1090)

---

## 3. EXERCISE SETTINGS (line 1095-1120)

**This is the core configuration section for the big/small exercises.**

### Number of Exercises (line 1097-1098)
- **Range:** 1-10 exercises
- **Default:** 4 (line 1296, 3175)
- Input type: Number

### Images per Exercise (line 1099-1100)
- **Options:** 2 or 3 images
- **Default:** 2 (line 1297, 3176)
- Controls how many items appear in each comparison

### Image Mode (line 1101-1105)
Two modes available:
1. **Identical Images** (value: "identical") - Same object shown in different sizes
2. **Different Images** (value: "different") - Different objects shown in different sizes (DEFAULT - line 1104, 3177)

### Question Type (line 1106-1113)
Five question types available:
1. **Circle the small one** (value: "findSmall")
2. **Circle the big one** (value: "findBig") - DEFAULT (line 1109, 3178)
3. **Circle the medium one** (value: "findMed") - Only available when 3 images selected
4. **Number 1-2-3 (small to big)** (value: "orderAsc") - Ordering task
5. **Number 1-2-3 (big to small)** (value: "orderDesc") - Ordering task

### Exercise Display Options (line 1115-1118)
- **Add answer indicators (circles/boxes):** Checkbox (DEFAULT: checked - line 1300, 3179)
  - Adds empty circles for "find" questions
  - Adds empty squares for "order" questions
- **Add exercise numbers:** Checkbox (DEFAULT: checked - line 1301, 3180)
  - Numbers each exercise (1., 2., 3., etc.)

### Worksheet Theme (line 1120-1121)
- Theme selector for automatic image selection
- Only used when user hasn't manually selected images from library

---

## 4. IMAGE LIBRARY (line 1126-1136)

### Theme Selection (line 1128-1129)
- **Theme Dropdown:** Select from available themes
- Loads theme-specific images into dictionary

### Image Search (line 1130-1131)
- **Search Input Field:** Filter images by keyword
- Real-time search filtering

### Image Dictionary (line 1133-1134)
- **Visual Gallery:** Shows all available images from selected theme
- Click to select images for exercises

### Selected Images Preview (line 1135-1137)
- Shows currently selected images
- Used for generating exercises

---

## 5. UPLOAD CUSTOM IMAGES (line 1141-1152)

### File Upload (line 1143-1149)
- **Multi-file Upload:** Select multiple images at once (line 1146)
- **Accepted Formats:** All image formats (accept="image/*")
- **File Status Display:** Shows number of files chosen

### Uploaded Images Preview (line 1151-1152)
- **Session Storage:** Uploaded images persist during current session
- **Visual Preview:** Shows thumbnails of uploaded images
- Can be selected for use in exercises

---

## 6. LANGUAGE SUPPORT (line 987-999)

**11 Languages Available for Image Library:**
1. English (en)
2. Deutsch / German (de)
3. Français / French (fr)
4. Español / Spanish (es)
5. Português / Portuguese (pt)
6. Italiano / Italian (it)
7. Nederlands / Dutch (nl)
8. Svenska / Swedish (sv)
9. Dansk / Danish (da)
10. Norsk / Norwegian (no)
11. Suomi / Finnish (fi)

**Language selector at top of sidebar** (line 987-999)

---

## 7. SIZE SCALING ALGORITHM (line 2578-2581)

**This is critical - how the app creates different sizes:**

### For 2 Images (line 2579)
- Scales: `[1, 1.8]` or `[1.8, 1]` (randomly ordered)
- Creates one small and one large version
- 80% size difference between images

### For 3 Images (line 2580)
- Scales: `[0.9, 1.6, 2.0]` (randomly shuffled)
- Creates small, medium, and large versions
- Provides clear size gradation for ordering tasks

**Scale factors are applied to base image height during generation** (line 2998)

---

## 8. GRID LAYOUT SYSTEM (line 2956-2962, 3293-3299)

### Automatic Column/Row Calculation

**Portrait Mode (width < height):**
- **Columns:** 2 (line 2956)
- **Rows:** Calculated based on exercise count

**Landscape Mode (width > height):**
- **Columns:** 3 (line 2956, 3293)
- **Rows:** Calculated based on exercise count

**Special Cases:**
- If exercise count ≤ 2: Columns = min(COLS, problemCount) (line 2959, 3296)
  - Prevents empty columns in grid

**Row Calculation:**
- `ROWS = Math.ceil(problemCount / COLS)` (line 2962, 3299)

**Layout Margins:**
- Top margin adjusts based on Name/Date field inclusion (line 2946, 3282)
  - With Name/Date: 100px + header height
  - Without Name/Date: 60px + header height

---

## 9. CANVAS & EDITING TOOLS

### Toolbar Features (line 1168-1205)
**Z-Order (Layering):**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment - Selected Objects:**
- Align Left
- Align Center Horizontally
- Align Right
- Align Top
- Align Center Vertically
- Align Bottom

**Alignment - To Page:**
- Center Horizontally on Page
- Center Vertically on Page

### Zoom Controls (line 1216-1219)
- **Zoom Out:** Decrease by 25%, minimum 25%
- **Zoom In:** Increase by 25%, maximum 300%
- **Reset Zoom:** Return to 100%
- **Zoom Display:** Shows current zoom percentage

### Undo/Redo System (line 1649-1788)
- **Undo:** Reverse last action
- **Redo:** Restore undone action
- **Transform-based:** Saves object positions, scales, rotations

---

## 10. GENERATION & DOWNLOAD FEATURES

### Generate Dropdown (line 1232-1236)
- **New Worksheet:** Generate new worksheet with current settings
- **Answer Key:** Generate answer key (disabled until worksheet created)

### Download Dropdown (line 1239-1248)
- **Worksheet (JPEG):** Download worksheet as JPEG image
- **Answer Key (JPEG):** Download answer key as JPEG
- **Worksheet (PDF):** Download worksheet as PDF
- **Answer Key (PDF):** Download answer key as PDF
- **Grayscale Toggle:** Convert to grayscale before download (checkbox)

### Download Quality
- **Multiplier:** 6x resolution for high-quality exports (line 1302)
- Ensures professional print quality

---

## 11. TAB SYSTEM (line 1210-1211)

**Two Canvas Tabs:**
1. **Worksheet Tab:** Main worksheet view (active by default)
2. **Answer Key Tab:** Shows answer key with solutions marked

Users can switch between tabs to work on either canvas.

---

## 12. ANSWER KEY GENERATION (line 3194-3460)

### Answer Indicators Based on Question Type

**For "Find" Questions (findSmall, findBig, findMed):** (line 3353-3363)
- Green checkmark (✔) appears on correct image
- Positioned at top-right of correct image

**For "Order" Questions (orderAsc, orderDesc):** (line 3364-3377)
- Numbers (1, 2, 3) appear in boxes below each image
- Order depends on question type:
  - orderAsc: Small=1, Medium=2, Big=3
  - orderDesc: Big=1, Medium=2, Small=3

---

## 13. MOBILE RESPONSIVENESS (line 575-596)

**Menu Toggle System:**
- Hamburger menu button appears on smaller screens
- Sidebar slides in/out on mobile
- Overlay backdrop when menu is open
- Close button in sidebar header

---

## 14. DEFAULT VALUES SUMMARY (line 1295-1301, 3173-3180)

```javascript
DEFAULT_PROBLEM_COUNT = 4        // Number of exercises
DEFAULT_IMG_COUNT = '2'          // 2 images per exercise
DEFAULT_MODE = 'different'       // Different images mode
DEFAULT_QTYPE = 'findBig'        // Circle the big one
DEFAULT_INDICATORS = true        // Show answer placeholders
DEFAULT_EXERCISE_NUMBERS = true  // Number each exercise
```

**Initial Worksheet Setup:**
- Worksheet theme: 'animals' (line 3173)
- Page size: Letter Portrait (line 3174)
- All defaults applied (line 3175-3180)

---

## 15. UNIQUE FEATURES NOT IN OTHER APPS

### Size Comparison Focus
- **Specialized for size discrimination:** This is the ONLY app focused on teaching big/small/medium concepts
- **Multiple question types:** 5 different ways to test size understanding
- **Ordering capability:** Not just identification, but sequencing by size

### Dual Image Modes
- **Identical mode:** Perfect for pure size comparison (same object, different sizes)
- **Different mode:** More challenging (different objects to compare)

### Flexible Exercise Count
- **1-10 exercises:** Highly adaptable to different age groups and attention spans
- **2 or 3 images:** Accommodates different difficulty levels

### Smart Grid Layout
- **Auto-adjusts columns:** Based on page orientation
- **Optimized spacing:** Prevents overcrowding
- **Landscape optimization:** Special adjustment for landscape mode (line 3433)

---

## TECHNICAL NOTES

### Image Loading
- Uses `fabric.Image.fromURL()` for image rendering
- Base scale factor: 0.98 for 3 images, 0.7 for 2 images (line 2997, 3330)
- Auto-scales images to fit within box dimensions

### State Management
- Preserves user transformations when regenerating with same exercise count
- Transform-based undo/redo system prevents serialization bugs
- Tracks original index for each exercise card

### Canvas Configuration
- **Retina Scaling:** Enabled for high-DPI displays (line 1479)
- **Preserve Stacking:** Maintains z-order during operations (line 1478)

---

## SUMMARY OF ALL FEATURES

✅ **Exercise Configuration:**
- 1-10 exercises per worksheet
- 2 or 3 images per exercise
- Identical or different image modes
- 5 question types (find small/big/medium, order ascending/descending)
- Answer indicators toggle
- Exercise numbers toggle

✅ **Page Setup:**
- 6 page size options (Letter/A4 portrait/landscape, square, custom)
- Custom dimensions
- Page color selection
- Name/Date field option
- Background themes with opacity
- Border themes with opacity

✅ **Text Customization:**
- Add custom text elements
- Font size, color, family
- Text outline color and width

✅ **Image Management:**
- Image library with 11 languages
- Theme-based selection
- Image search
- Multi-file upload
- Session-based storage

✅ **Editing Tools:**
- Full canvas editing (drag, rotate, scale, delete)
- Z-order controls (bring forward/back)
- Alignment tools (to objects and to page)
- Zoom controls (25%-300%)
- Undo/redo system

✅ **Download Options:**
- JPEG and PDF formats
- Worksheet and answer key
- Grayscale toggle
- 6x resolution multiplier

✅ **Smart Features:**
- Auto-grid layout (2-3 columns based on orientation)
- Size scaling algorithm (ensures clear size differences)
- Transform preservation during regeneration
- Mobile-responsive design

---

**Total Feature Count:** 50+ distinct features documented from source code
