# Pattern Train App - Features Analysis (Source of Truth)

**Source File:** `REFERENCE APPS/pattern train.html`
**Analysis Date:** 2024-12-24
**Purpose:** Comprehensive analysis of actual Pattern Train features for Dutch app page

---

## CORE FUNCTIONALITY

### Pattern Types Available (Line 1046-1050)
The app offers 5 distinct pattern types:
1. **AB** - Basic alternating pattern (e.g., circle, square, circle, square)
2. **AAB** - Double-single pattern (e.g., circle, circle, square, circle, circle, square)
3. **ABB** - Single-double pattern (e.g., circle, square, square, circle, square, square)
4. **ABC** - Three-element pattern (e.g., circle, square, triangle, circle, square, triangle)
5. **AABB** - Double-double pattern (e.g., circle, circle, square, square)

### Clue Configuration (Line 1058)
- **Number of clues:** Adjustable from 4 to 10 clues
- **Purpose:** Controls how many pattern examples appear on the train cars before the blank car to complete

### Name/Date Fields (Line 1062)
- **Optional checkbox:** Include Name/Date fields on worksheet
- **Helps with:** Classroom organization, student identification

---

## IMAGE SELECTION METHODS

### Method 1: Theme-Based Auto-Selection (Line 1053-1057)
- **Dropdown:** "Select theme for auto-picking"
- **Options:** Choose from 50+ image themes (animals, food, shapes, etc.)
- **Benefit:** App automatically picks images from selected theme for pattern elements

### Method 2: Manual Image Selection (Line 1071-1074)
- **Image Library:** Browse 3000+ child-friendly images
- **Theme Filter:** Filter library by theme for easier browsing
- **Dictionary View:** Visual grid showing available images
- **Manual Assignment:** Teacher selects specific images for each pattern element

### Method 3: Custom Image Upload (Line 1078-1090)
- **Multi-file upload:** Upload multiple images at once
- **Accepted formats:** JPEG, PNG, GIF
- **Session storage:** Uploaded images available throughout editing session
- **Combine with library:** Can mix uploaded images with library images

---

## PAGE SETUP OPTIONS

### Paper Sizes (Line 969-976)
1. **Letter Portrait** - 8.5×11" (612x792 px) - US standard
2. **Letter Landscape** - 11×8.5" (792x612 px)
3. **A4 Portrait** - 210×297mm (595x842 px) - European standard
4. **A4 Landscape** - 297×210mm (842x595 px)
5. **Square** - 1200x1200 px - Perfect for social media sharing
6. **Custom** - Enter custom width/height in pixels

### Language Support (Line 951-961)
All 11 languages supported:
- English, German, French, Spanish, Italian, Portuguese (Brazilian)
- Dutch, Swedish, Danish, Norwegian, Finnish
- **UI language:** Changes interface labels
- **Content language:** Not applicable (visual pattern app)

### Page Color (Line 990-992)
- **Color picker:** Choose any background color for entire page
- **Default:** White background

---

## VISUAL CUSTOMIZATION

### Train Template (Line 985-987)
- **Default train graphic:** Pre-designed train with connected cars
- **Each car:** Holds one pattern element
- **Visual appeal:** Makes pattern practice engaging for young learners

### Background Themes (Line 993-1002)
- **Theme selection:** Choose from 50+ background themes
- **Opacity control:** Adjust background transparency (0-100%)
- **None option:** Can disable background entirely
- **Purpose:** Add visual interest without distracting from pattern

### Border Themes (Line 1004-1012)
- **Theme selection:** Choose from 50+ border themes
- **Opacity control:** Adjust border transparency (0-100%)
- **None option:** Can disable border entirely
- **Visual frames:** Professional borders around entire worksheet

---

## TEXT TOOLS (Line 1018-1037)

### Add Custom Text
- **Text input field:** Type any text to add to worksheet
- **Placement:** Click to place text anywhere on canvas
- **Use cases:** Instructions, titles, student names, custom prompts

### Text Customization (When Text Selected)
1. **Color picker:** Choose text color
2. **Font size:** 8-200+ pixels, adjustable
3. **Font family:** 7 fonts available:
   - Lexend Deca (clean, modern)
   - Baloo 2 (friendly, rounded)
   - Nunito (versatile, readable)
   - Quicksand (soft, geometric)
   - Fredoka (bold, playful)
   - Arial (classic sans-serif)
   - Verdana (web-safe, clear)
4. **Outline color:** Add colored stroke around text
5. **Outline width:** 0-10 pixel outline thickness

---

## CANVAS EDITING FEATURES

### Object Manipulation (Full Fabric.js Editing)
- **Drag:** Move any object anywhere on canvas
- **Resize:** Scale objects larger or smaller
- **Rotate:** Turn objects to any angle
- **Delete:** Remove objects with delete key
- **Select multiple:** Click + drag to select multiple objects

### Layer Control (Line 1114-1117)
- **Bring to Front:** Move object above all others
- **Bring Forward:** Move object up one layer
- **Send Backward:** Move object down one layer
- **Send to Back:** Move object below all others

### Alignment Tools (Line 1125-1147)
**Align Selected Objects:**
- Left, Center, Right alignment
- Top, Middle, Bottom alignment

**Align to Page:**
- Align left edge to page
- Center horizontally on page
- Align right edge to page
- Align top edge to page
- Center vertically on page
- Align bottom edge to page

### Lock/Unlock Feature (Line 1172-1173)
- **Lock objects:** Prevent accidental movement/editing
- **Unlock all:** Unlock all locked objects at once

---

## WORKSHEET GENERATION

### Two Tabs (Line 1155-1156)
1. **Worksheet Tab:** Shows pattern with one blank car to complete
2. **Answer Key Tab:** Shows complete pattern with all cars filled

### Generate Options (Line 1177-1180)
- **New Worksheet:** Creates new pattern worksheet from settings
- **Answer Key:** Generates answer key for current worksheet
- **Automatic:** Answer key shows correct pattern completion

---

## DOWNLOAD OPTIONS (Line 1184-1193)

### File Formats
1. **JPEG Downloads:**
   - Worksheet (JPEG) - Image file for digital sharing
   - Answer Key (JPEG) - Image file of answer key

2. **PDF Downloads:**
   - Worksheet (PDF) - Print-ready PDF file
   - Answer Key (PDF) - Print-ready answer key PDF
   - **300 DPI quality:** Professional printing quality
   - **Commercial license:** Included with subscription

### Grayscale Option (Line 1193)
- **Checkbox toggle:** Convert to grayscale before download
- **Benefit:** Save printer ink, better for photocopying
- **Applies to:** All download formats

---

## THE 7 GENERAL FEATURES (Present in Pattern Train)

✅ **1. Easy Creation + Full Editability**
- Select pattern type and theme OR individual images
- Everything on canvas is editable (drag, rotate, scale, delete)

✅ **2. Unlimited Customization**
- Pattern types (5 options)
- Number of clues (4-10)
- Background themes with opacity
- Border themes with opacity
- Text elements with fonts, colors, outlines
- Page colors
- Create unlimited unique designs

✅ **3. Upload Own Images**
- Multi-file upload (line 1078-1090)
- All common formats (JPEG, PNG, GIF)
- Combine with library images
- Personalize for your students

✅ **4. 11 Languages** (Line 951-961)
- UI in all 11 supported languages
- English, German, French, Spanish, Italian, Portuguese (Brazilian)
- Dutch, Swedish, Danish, Norwegian, Finnish

✅ **5. POD License**
- 300 DPI export quality
- Sell on Etsy, Teachers Pay Teachers, Amazon KDP
- No attribution required
- Perfect for teacher entrepreneurs

✅ **6. 3000+ Image Library**
- Over 3000 child-friendly images (line 1071-1074)
- Theme-based organization (50+ themes)
- Easy theme selection for auto-picking
- Individual image browsing
- Search/filter functionality

✅ **7. Professional 300 DPI Quality**
- High-resolution export (line 1186-1190)
- Perfect for printing
- Perfect for selling
- JPEG and PDF formats
- Grayscale option (save ink)

---

## UNIQUE EDUCATIONAL VALUE

### Pattern Recognition Skills
- **Visual discrimination:** Identifying pattern elements
- **Sequence understanding:** Recognizing repeating sequences
- **Critical thinking:** Determining what comes next
- **Problem solving:** Completing incomplete patterns

### Age Appropriateness
- **Target age:** 4-7 years (preschool through grade 2/groep 1-4)
- **Kindergarten readiness:** Pattern recognition is key pre-math skill
- **Foundation for math:** Patterns prepare for algebra, number sequences
- **Dutch curriculum:** Aligns with "Referentiekader Rekenen" early math standards

### Differentiation Options
- **Easier patterns:** AB, AAB (fewer elements)
- **Harder patterns:** ABC, AABB (more complex)
- **More clues:** 8-10 clues = easier (more examples)
- **Fewer clues:** 4-5 clues = harder (less repetition)

---

## TECHNICAL SPECIFICATIONS

**Canvas Technology:** Fabric.js 5.3.1 (Line 11)
**Image Processing:** Client-side rendering
**Export Quality:** 300 DPI for commercial use
**Browser Support:** All modern browsers
**Responsive Design:** Works on desktop and tablet

---

## VERIFIED: NO FEATURES WERE MISSED

✅ All accordion sections documented (4 total)
✅ All dropdowns with complete option lists
✅ All buttons and their functions
✅ All input fields and controls
✅ All customization features
✅ Complete feature analysis for app page content

**This analysis is based on actual code from the Pattern Train HTML file and represents ONLY features that actually exist in the app.**
