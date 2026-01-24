# Pattern Train - Complete Features Analysis
**Source:** REFERENCE APPS/pattern train.html
**Analysis Date:** 2025-12-12
**Purpose:** Source of truth for Pattern Train app page content

---

## CRITICAL INFORMATION FROM SEO-RULES.md

### Pricing Tier
**Pattern Train = Full Access ($240/year or $25/month)**
- **Line 210 in SEO-RULES.md confirms:** Pattern Train requires Full Access subscription
- NEVER use "Core Bundle" language
- ALWAYS use "Full Access" pricing ($240/year or $25/month)

### Keywords (from keywords.txt)
The top 10 keywords for English that MUST appear minimum 10 times IN H2/H3 TITLES:
1. Kindergarten worksheets
2. Math worksheets
3. Sight words worksheets
4. Phonics worksheets
5. Alphabet worksheets / ABC worksheets
6. Addition worksheets
7. Tracing worksheets / Letter tracing worksheets
8. Free printable worksheets
9. Coloring worksheets
10. First grade worksheets

---

## APP OVERVIEW

Pattern Train is a **pattern recognition worksheet generator** that teaches children to identify and complete visual patterns using a train template. Students learn pattern concepts (AB, AAB, ABB, ABC, AABB) through engaging train-themed worksheets where they match images to complete the pattern sequence.

---

## FOUR ACCORDION SECTIONS

### 1. PAGE SETUP (Line 947)

#### Language Selection (Lines 949-962)
- **11 Languages Available:**
  - English
  - German (Deutsch)
  - French (Français)
  - Spanish (Español)
  - Portuguese (Português)
  - Italian (Italiano)
  - Dutch (Nederlands)
  - Swedish (Svenska)
  - Danish (Dansk)
  - Norwegian (Norsk)
  - Finnish (Suomi)
- **Note:** Language selection affects image library content only. UI language controlled separately in header.

#### Paper Size Options (Lines 967-982)
- **Letter Portrait** (8.5×11")
- **Letter Landscape** (11×8.5")
- **A4 Landscape** (297×210mm)
- **A4 Portrait** (210×297mm)
- **Square** (1200x1200)
- **Custom** dimensions (shows width/height number inputs)
  - Width input (pixels)
  - Height input (pixels)
- **Apply Size button** to apply changes

#### Template Selection (Lines 984-988)
- **Train Template:** Default Train (fixed template)
- Template path: `/images/background/train.png`

#### Page Color (Lines 990-991)
- **Color picker** for page background color
- Default: #FFFFFF (white)

#### Background Options (Lines 993-1002)
- **Background Theme dropdown** (dynamically populated)
- **Background Opacity slider** (0 to 1, step 0.05)
- **Background Dictionary** - Visual preview area for selected theme backgrounds

#### Border Options (Lines 1004-1013)
- **Border Theme dropdown** (dynamically populated)
- **Border Opacity slider** (0 to 1, step 0.05)
- **Border Dictionary** - Visual preview area for selected theme borders

---

### 2. TEXT TOOLS (Line 1018)

#### Add New Text (Lines 1020-1022)
- **Text content input field**
- **Add Text to Worksheet button**

#### Selected Text Properties (Lines 1023-1038)
All controls disabled until text is selected:
- **Color picker** (default #333333)
- **Font size number input** (default 36, minimum 8)
- **Font family dropdown:**
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- **Outline color picker** (default #000000)
- **Outline width slider** (0-10, step 0.5)

---

### 3. PATTERN CONFIGURATION (Line 1042)

#### Pattern Type Selection (Lines 1044-1051)
**5 Pattern Types Available:**
- **AB** - Simple alternating pattern (e.g., cat-dog-cat-dog)
- **AAB** - Double-single pattern (e.g., cat-cat-dog-cat-cat-dog)
- **ABB** - Single-double pattern (e.g., cat-dog-dog-cat-dog-dog)
- **ABC** - Three-element pattern (e.g., cat-dog-bird-cat-dog-bird)
- **AABB** - Double-double pattern (e.g., cat-cat-dog-dog-cat-cat-dog-dog)

#### Theme Auto-Selection (Lines 1053-1056)
- **Worksheet Theme dropdown** (optional)
- Option: "-- Manual Image Selection --" (default)
- Auto-picks images from selected theme to match pattern elements

#### Clues Configuration (Lines 1058-1059)
- **Number of Clues input** (4-10 clues)
- Default: 4 clues
- Controls how many pattern examples are shown before the blank spaces

#### Name/Date Fields (Lines 1061-1063)
- **Checkbox:** "Include Name/Date Fields"
- Adds student name and date fields to worksheet

---

### 4. IMAGE SELECTION (Line 1068)

#### Image Library Dictionary (Lines 1071-1075)
- **Theme dropdown** for browsing image library
- **Search input field** for finding specific images
- **Dictionary display area** showing available images

#### Dictionary Preview (Line 1076)
- Shows selected image before adding to pattern

#### Custom Image Upload (Lines 1078-1091)
- **File upload input** (accepts multiple files, image formats)
- **Choose files button** (triggers file picker)
- **File count display** (shows number of files selected)
- **Uploaded images preview area** (shows all uploaded images this session)

#### Your Selected Images (Lines 1093-1096)
- **Assigned Images display area**
- Shows which images are assigned to each pattern element (A, B, C, etc.)
- Visual representation of pattern element assignments

---

## TOP BAR CONTROLS

### Tabs (Lines 1155-1156)
- **Worksheet tab** (active by default)
- **Answer Key tab** (becomes available after generation)

### Zoom Controls (Lines 1159-1163)
- **Zoom Out button**
- **Zoom percentage display** (shows current zoom level)
- **Zoom In button**
- **Reset Zoom button**

### History Controls (Lines 1166-1167)
- **Undo button** (Ctrl+Z)
- **Redo button** (Ctrl+Y)

### Unlock All Controls (Lines 1170-1175)
- **Unlock All button** (shows when objects are locked)
- Unlocks all locked objects on canvas

### Create Dropdown (Lines 1176-1181)
- **Create button** (accent blue)
- Dropdown options:
  - **New Worksheet** - Generates new pattern train worksheet
  - **Answer Key** - Generates answer key (disabled until worksheet created)

### Download Dropdown (Lines 1183-1191)
- **Download button**
- Dropdown options:
  - **Worksheet (JPEG)** - Download worksheet as JPEG image
  - **Answer Key (JPEG)** - Download answer key as JPEG image
  - **Worksheet (PDF)** - Download worksheet as PDF
  - **Answer Key (PDF)** - Download answer key as PDF
  - **Grayscale checkbox** (Line 1193) - Convert to grayscale to save ink

---

## CONTEXT TOOLBAR (Lines 1109-1151)
**Appears when objects are selected on canvas**

### Layers Dropdown (Lines 1112-1118)
- **Bring to Front**
- **Bring Forward**
- **Send Backward**
- **Send to Back**

### Align Dropdown (Lines 1123-1142)
**Align Selected Objects:**
- Align Left
- Center Horizontally
- Align Right
- Align Top
- Center Vertically
- Align Bottom

**Align to Page:**
- Center on Page Horizontally
- Center on Page Vertically

### Additional Toolbar Buttons (Lines 1145-1150)
- **Lock/Unlock button** - Lock or unlock selected object
- **Delete button** - Delete selected object

---

## HOW THE PATTERN TRAIN WORKS

### Pattern Generation Logic (Lines 2992-3092)

1. **Train Template Placement:**
   - Loads train background image from `/images/background/train.png`
   - Calculates header height based on orientation:
     - Landscape: 150px (compact header)
     - Portrait: 220px (full header)
   - Scales train to fit within available space with margins:
     - Page margin: 40px from edges
     - Top margin: header height + 20px
     - Bottom margin: 120px (space for cutouts)
   - Landscape: Decreases train size by 30%
   - Portrait: Moves train 70px up for better centering

2. **Pattern Sequence Creation:**
   - Takes selected pattern type (AB, AAB, ABB, ABC, or AABB)
   - Repeats pattern to create 11 total positions
   - Shows first N positions based on "Number of Clues" setting (4-10)
   - Places pattern images in train cars

3. **Cutout Generation:**
   - Creates cutout boxes at bottom of worksheet
   - Number of cutouts matches remaining pattern positions
   - Students cut out images and paste to complete pattern

4. **Answer Key Generation:**
   - Shows complete pattern with all positions filled
   - No cutouts (all positions show correct images)

### Pattern Element Assignment
- Pattern elements extracted from pattern type: "AB" → [A, B], "ABC" → [A, B, C]
- Manual selection: User clicks images from dictionary to assign to each element
- Theme auto-selection: System randomly picks images from selected theme for each element
- Visual feedback shows which images are assigned to A, B, C elements

---

## FULL CANVAS EDITABILITY

**Everything on the canvas is editable:**
- Drag to reposition any element
- Rotate using corner handles
- Scale/resize using corner handles
- Delete selected objects
- Lock/unlock objects to prevent accidental changes
- Change text properties (color, size, font, outline)
- Adjust background and border opacity
- Add custom text anywhere on worksheet

---

## EXPORT OPTIONS

### Download Formats (Lines 1186-1190)
1. **JPEG** (worksheet or answer key)
2. **PDF** (worksheet or answer key)
3. **Grayscale option** to save printer ink

### Quality
- **300 DPI** professional print quality (standard across all apps)
- High-resolution exports suitable for printing and selling

---

## COMMERCIAL LICENSE (POD)

Pattern Train includes **print-on-demand commercial license** with Full Access subscription:
- Sell worksheets on Teachers Pay Teachers
- Sell on Etsy
- Create Amazon KDP books
- Use in commercial teaching materials
- No attribution required
- 300 DPI quality suitable for professional products

---

## 11 LANGUAGE SUPPORT

**UI Languages:** All 11 languages
**Content Languages:** Image library organized by language with translated image filenames

This is especially important for Pattern Train because:
- Worksheet instructions and title can be in user's language
- Image library contains themed images with language-specific names
- Teachers can create pattern worksheets in their students' native language

---

## PATTERN TRAIN EDUCATIONAL VALUE

### Learning Objectives
- **Pattern Recognition:** Identify repeating visual patterns
- **Pattern Prediction:** Predict what comes next in a sequence
- **Logical Thinking:** Understand pattern rules and structures
- **Fine Motor Skills:** Cut and paste activities for younger children
- **Problem Solving:** Complete patterns using visual clues

### Pattern Types Explained
- **AB Pattern:** Simplest alternating pattern (cat-dog-cat-dog)
- **AAB Pattern:** Double-single pattern (cat-cat-dog-cat-cat-dog)
- **ABB Pattern:** Single-double pattern (cat-dog-dog-cat-dog-dog)
- **ABC Pattern:** Three-element pattern requiring tracking of three different items
- **AABB Pattern:** Double-double pattern with more complex repetition

### Age Appropriateness
- **Kindergarten (ages 5-6):** AB patterns, 4 clues
- **First Grade (ages 6-7):** AB and AAB patterns, 4-6 clues
- **Second Grade (ages 7-8):** ABC and ABB patterns, 6-8 clues
- **Third Grade (ages 8-9):** AABB patterns, 8-10 clues

---

## UNIQUE SELLING POINTS

1. **Theme-based pattern selection** - Auto-select coordinated images from themes
2. **5 different pattern types** - From simple AB to complex AABB
3. **Adjustable difficulty** - 4-10 clues to match student ability
4. **Train template** - Engaging visual context for pattern learning
5. **Cut-and-paste activity** - Hands-on learning with physical manipulation
6. **Answer key generation** - Teacher convenience and grading support
7. **Full customization** - Edit every element on the canvas

---

## TECHNICAL SPECIFICATIONS

### Canvas Framework
- **Fabric.js 5.3.1** for canvas manipulation
- Two canvases: worksheet canvas and answer key canvas
- Object types marked with flags:
  - `isTrainGeneratedItem` - Pattern images on train
  - `isTrainTemplate` - Train background image
  - `isAnswerKeyItem` - Answer key elements
  - `isHeaderElement` - Title and description
  - `isNameDate` - Name/date fields

### State Management
- Undo/redo functionality with canvas state saving
- Preserves user edits during regeneration
- Tracks object transformations (position, scale, rotation)

### Image Library
- Theme-based organization
- Search functionality
- Multi-file upload support
- Session-based uploaded image storage

---

## COMPARISON TO SIMILAR APPS

Pattern Train is similar to Alphabet Train in structure but focuses on:
- **Pattern recognition** instead of alphabet learning
- **Multiple pattern types** (5 options)
- **Adjustable clue count** (4-10)
- **Pattern element assignment** system (A, B, C elements)

Key difference from Alphabet Train:
- Alphabet Train teaches letter recognition
- Pattern Train teaches pattern recognition and logical thinking
- Both use train template and cut-and-paste methodology

---

## FEATURES SUMMARY FOR SEO CONTENT

### Page Setup Features
✓ 11 language support for content
✓ 5 paper size presets + custom dimensions
✓ Train template (fixed design)
✓ Page color customization
✓ Background themes with opacity control
✓ Border themes with opacity control

### Pattern Configuration Features
✓ 5 pattern types (AB, AAB, ABB, ABC, AABB)
✓ Theme auto-selection for coordinated images
✓ Manual image selection from 3000+ image library
✓ Adjustable clue count (4-10)
✓ Optional name/date fields

### Editing Features
✓ Add custom text with full formatting
✓ 7 font families
✓ Text color and outline customization
✓ Drag, rotate, scale all elements
✓ Lock/unlock objects
✓ Undo/redo (Ctrl+Z/Ctrl+Y)
✓ Layer management (bring to front, send to back)
✓ Alignment tools

### Image Selection Features
✓ 3000+ child-friendly image library
✓ Theme-based browsing
✓ Image search functionality
✓ Multi-file custom image upload
✓ Pattern element assignment system
✓ Visual preview of selected images

### Export Features
✓ Worksheet and answer key generation
✓ JPEG export
✓ PDF export
✓ Grayscale option to save ink
✓ 300 DPI professional quality

### Educational Features
✓ 5 pattern complexity levels
✓ Adjustable difficulty (4-10 clues)
✓ Cut-and-paste activity
✓ Visual learning through themed images
✓ Answer key for teacher convenience
✓ Name/date fields for classroom use

---

## VERIFICATION COMPLETE

✓ Read entire app HTML file
✓ Documented all 4 accordion sections
✓ Listed all dropdown options
✓ Identified all input controls
✓ Analyzed pattern generation logic
✓ Confirmed Full Access pricing tier
✓ Identified 10 English keywords
✓ Ready for app page writing
