# More or Less App - Complete Features Analysis
## Source: REFERENCE APPS/more less.html

---

## APP OVERVIEW
**App Name:** More or Less / Comparison Worksheet Maker
**Primary Purpose:** Create math comparison worksheets where students compare quantities and choose the correct symbol (>, <, =)
**Target Audience:** Kindergarten through grade 2 students learning number comparison

---

## ACCORDION SECTIONS (5 Total)

### 1. Language Selection (Line 1050)
**Accordion Button:** "Language Selection"
- **UI Language Selector** (11 languages)
  - English, German, French, Spanish, Portuguese, Italian
  - Dutch, Swedish, Danish, Norwegian, Finnish
- **Description:** "Select your preferred language for the interface" (Line 1066)

### 2. Page Setup (Line 1073)
**Accordion Button:** "Page Setup"

#### Page Size Options (Line 1075-1082):
- Letter Portrait (8.5×11") - **Default**
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200x1200)
- Custom (with width/height inputs)

#### Page Color (Line 1090):
- Color picker for page background

#### Background Theme (Line 1094-1099):
- **Background Theme Selector:** Dropdown populated dynamically
- **Background Dictionary:** Visual preview of backgrounds
- **Background Opacity Slider:** Adjust transparency (Line 1100)

#### Border Theme (Line 1103-1111):
- **Border Theme Selector:** Dropdown populated dynamically
- **Border Dictionary:** Visual preview of borders
- **Border Opacity Slider:** Adjust transparency (Line 1111)

### 3. Text Tools (Line 1117)
**Accordion Button:** "Text Tools"

#### Add New Text (Line 1119-1121):
- **Content Input:** Text field with placeholder "Hello!"
- **Add Text Button:** Creates new text on canvas

#### Selected Text Properties (Line 1122-1136):
- **Color Picker:** Change text color
- **Size Input:** Font size (min 8)
- **Font Family Dropdown:**
  - Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka
  - Arial, Verdana
- **Outline Color Picker:** Text stroke color
- **Outline Width Slider:** 0-10 range, 0.5 steps

### 4. Worksheet Configuration (Line 1141) ⭐ MOST IMPORTANT
**Accordion Button:** "Worksheet Configuration"

#### Number of Exercises (Line 1143):
- **Input Range:** 1-8 exercises per worksheet
- **Default:** 5 exercises

#### Image Selection Mode (Line 1146-1162):
Two modes available:

**Mode 1: Individual Images** (Line 1148)
- **Theme Dictionary Dropdown:** Filter images by theme
- **Image Dictionary:** Visual selection of individual images
- **Selection Limit:** 1-5 images maximum
- **Selection Counter:** "0 / 5 selected" display

**Mode 2: Theme for Worksheet** (Line 1149)
- **Theme Selector:** Choose one theme
- **Random Selection:** Images randomly selected from theme
- **Note:** "Images will be randomly selected from this theme" (Line 1161)

#### Relations Checkboxes (Line 1164-1178):
Select which comparison symbols to include:
- **Greater Than (>)** - Checked by default
- **Less Than (<)** - Checked by default
- **Equal To (=)** - Checked by default

#### Symbol Display (Line 1180-1184): ⭐ UNIQUE FEATURE
Two display modes:
- **Illustrations** (default) - Uses image files:
  - `/images/symbols/more.png` for >
  - `/images/symbols/less.png` for <
  - `/images/symbols/equal.png` for =
- **Normal Symbols** - Text characters (>, <, =)

#### Comparison Mode (Line 1186-1190): ⭐ UNIQUE FEATURE
- **Image to Image** (default): Compare groups of images (e.g., 5 cats vs 7 cats)
- **Image to Number**: Compare images to numerals (e.g., 5 cats vs "7")

#### Image Variety (Line 1192-1196): ⭐ UNIQUE FEATURE
- **Same Images** (default): "5 cats vs 7 cats" - same object, different quantities
- **Different Images**: "5 cats vs 7 dogs" - different objects being compared

#### Additional Options (Line 1198-1208):
- **Show symbols for circling** checkbox (Line 1199-1201)
  - Displays all three symbols for students to circle the correct one
- **Include Name/Date Fields** checkbox (Line 1202-1204)
- **Include Exercise Numbers** checkbox (Line 1205-1207)
  - **Default:** Checked

### 5. Upload Custom Images (Line 1212)
**Accordion Button:** "Upload Custom Images"

- **Custom File Button:** Choose files to upload
- **File Selection Text:** Shows selected file names
- **Uploaded Images Preview:** Displays uploaded images from current session
- **Supported Formats:** JPEG, PNG, GIF (multi-file upload)

---

## TOP-RIGHT ACTION BUTTONS

### Toolbar (Layering Section - Line 1241-1244):
When worksheet is generated, toolbar appears with:
- **Bring to Front:** Move selected object to top layer
- **Bring Forward:** Move selected object up one layer
- **Send Backward:** Move selected object down one layer
- **Send to Back:** Move selected object to bottom layer

### Align Selected (Line 1252):
- Align multiple selected objects relative to each other

### Align to Page (Line 1264):
- Align objects to page edges or center

### Tab Buttons (Line 1281-1282):
- **Worksheet Tab:** View/edit worksheet (active by default)
- **Answer Key Tab:** View/edit answer key

### Lock/Unlock Toggle (Line 1300):
- **Unlock All:** Unlocks all objects on canvas for editing

### Generate Dropdown (Line 1305-1308):
- **Create Worksheet:** Generate new worksheet
- **Create Answer Key:** Generate answer key (disabled until worksheet created)

### Download Dropdown (Line 1312-1321):
- **Worksheet (JPEG)** - disabled until generated
- **Answer Key (JPEG)** - disabled until generated
- **Worksheet (PDF)** - disabled until generated
- **Answer Key (PDF)** - disabled until generated
- **Grayscale Toggle:** Convert to grayscale before download

### Clear All Button (Line 1325):
- **Clear All:** Resets entire worksheet and all settings

---

## UNIQUE FEATURES SPECIFIC TO MORE OR LESS

### 1. **Dual Symbol Display Modes**
- Visual learners: Illustrated symbols (cute graphics)
- Traditional approach: Standard math symbols (>, <, =)

### 2. **Flexible Comparison Modes**
- **Image-to-Image:** Count objects on both sides (e.g., 3 apples vs 5 bananas)
- **Image-to-Number:** Count objects, compare to numeral (e.g., 3 apples vs "5")

### 3. **Image Variety Control**
- **Same Images:** Focuses on quantity comparison with identical objects
- **Different Images:** Adds complexity by using different objects

### 4. **Symbol Circling Option**
- Shows all three symbols (>, <, =) below each problem
- Students circle the correct symbol instead of filling in blank
- Alternative assessment method

### 5. **Customizable Relations**
- Teachers can focus on specific comparison types
- Uncheck "Equal To" for pure greater/less practice
- Uncheck "Greater Than" for less-than practice only

### 6. **Dual Canvas System**
- **Worksheet Canvas:** Problems without answers
- **Answer Key Canvas:** Same layout with correct symbols shown

### 7. **Number Range**
- Quantities range from 1-6 objects per group (Line 1366: DEFAULT_MAX_ITEMS_PER_GROUP = 6)
- Appropriate for early learners

---

## LAYOUT & GENERATION DETAILS

### Exercise Display (From code analysis):
- **Exercises per worksheet:** 1-8 (user configurable)
- **Default:** 5 exercises
- **Layout:** Automatically arranged on page
- **Spacing:** Scaled dynamically based on page size

### Worksheet Generation Process:
1. User selects 1-5 images (individual mode) OR selects theme (theme mode)
2. User selects comparison relations to include (>, <, =)
3. User sets comparison mode (image-to-image or image-to-number)
4. User sets image variety (same or different)
5. System generates random quantities (1-6 items) for left and right sides
6. System places correct comparison symbol between groups
7. **Worksheet:** Shows empty space or circling options
8. **Answer Key:** Shows correct symbol

### Answer Key Generation:
- Uses same layout as worksheet
- **If Illustrations mode:** Shows correct symbol graphic
- **If Normal Symbols mode:** Shows correct text symbol (>, <, =)

---

## CANVAS EDITING CAPABILITIES

### After Generation:
- **Drag objects:** Reposition any element (images, text, symbols)
- **Rotate objects:** Any angle
- **Scale objects:** Resize proportionally
- **Delete objects:** Remove unwanted elements
- **Add text:** Custom labels, instructions, names
- **Layer control:** Bring forward, send backward
- **Lock/unlock:** Prevent accidental editing

### Full Customization:
- **Background themes:** Seasonal, educational, decorative
- **Border themes:** Frames and decorative borders
- **Custom images:** Upload teacher's own pictures
- **Text styling:** 7 fonts, colors, outlines, sizes
- **Page color:** Any color background

---

## 11 LANGUAGE SUPPORT ⭐ CRITICAL FOR SEO
- User interface translates to all 11 languages
- All buttons, labels, and instructions in native language
- Header text customizes per language (Line 2600-2604):
  - English: "More Less" / "Compare and choose the right symbol!"
  - German: "Mehr Weniger" / "Vergleiche und wähle das richtige Symbol!"
  - French: "Plus Moins" / "Compare et choisis le bon symbole!"
  - Spanish: "Más Menos" / "¡Compara y elige el símbolo correcto!"
  - And all other languages

---

## DOWNLOAD CAPABILITIES
- **JPEG format:** High-quality image
- **PDF format:** Print-ready document
- **Grayscale option:** Saves ink for classroom printing
- **300 DPI:** Professional quality (implied from download multiplier = 6, line 1368)
- **Separate downloads:** Worksheet and answer key downloaded separately

---

## DEFAULT SETTINGS (Code Reference)
- Page size: Letter Portrait (612x792)
- Number of exercises: 5
- Image selection mode: Individual
- Symbol display: Illustrations
- Comparison mode: Image-to-Image
- Image variety: Same images
- Relations: All checked (>, <, =)
- Show circling symbols: Unchecked
- Include name/date: Unchecked
- Include exercise numbers: Checked
- Page color: White (#FFFFFF)
- Background theme: None
- Border theme: None

---

## FEATURES ANALYSIS COMPLETE ✓

**Total Accordion Sections:** 5
**Total Configurable Options:** 20+
**Unique Educational Features:** 7
**Language Support:** 11 languages
**Download Formats:** 2 (JPEG, PDF)
**Canvas Editing:** Full Fabric.js implementation
