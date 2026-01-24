# Find Objects App - Complete Features Analysis

**Source File:** `REFERENCE APPS/find objects.html` (4637 lines)
**Analysis Date:** 2025-12-12
**Status:** REFERENCE - DO NOT MODIFY

---

## ACCORDION SECTIONS (5 Total)

### 1. Page & Scene
**Translation Key:** `findobjects.page.scene`

#### Page Setup
- **Page Size Selector** (`pageSizeSelect`):
  - Letter Portrait (8.5×11") - 612x792px [DEFAULT]
  - Letter Landscape (11×8.5") - 792x612px
  - A4 Portrait (210×297mm) - 595x842px
  - A4 Landscape (297×210mm) - 842x595px
  - Custom (user-defined width/height in pixels)

#### Background
- **Use Child-Friendly Decorations** checkbox (checked by default)
  - Adds decorative elements to make worksheet visually appealing for children
- **Fallback Color Picker** - solid color background option
- **Background Theme Selector** - choose from themed backgrounds
  - "None" option to use fallback color only
- **Background Dictionary** - preview area showing available background options
- **Background Opacity Slider** (0-1, 0.05 increments, default 1)

#### Border
- **Border Theme Selector** - choose from themed borders
  - "None" option for no border
- **Border Dictionary** - preview area showing available border options
- **Border Opacity Slider** (0-1, 0.05 increments, default 1)

---

### 2. Text & Content
**Translation Key:** `findobjects.text.content`

#### Text Tools
- **Add New Text** input field
  - Default placeholder: "Find the hidden objects!"
- **Add Text Button** - places text on canvas

#### Selected Text Properties
(All controls disabled until text is selected)
- **Text Color Picker**
- **Font Size** input (8-∞, default 48)
- **Font Family** dropdown:
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- **Outline Color Picker** (default black)
- **Outline Width** slider (0-10, 0.5 increments, default 0)

#### Other Content
- **Include Name/Date Fields** checkbox
  - Adds blank fields for student name and date

---

### 3. Image Library
**Translation Key:** `findobjects.image.library`

#### Search Library
- **Filter by Theme** dropdown
  - "All Themes" option [DEFAULT]
  - Theme options populated dynamically
- **Search Images** text input
  - Placeholder: "e.g., apple, car"
  - Search by image filename/keywords
- **Available Images** - dictionary display area
  - Shows image thumbnails with:
    - Preview image (50x50px)
    - Image name
    - "Add" button
    - "View" button
  - Loads images based on selected language

---

### 4. Upload Custom Images
**Translation Key:** `findobjects.upload.custom`

- **File Upload** input (hidden, triggered by button/label)
  - Multiple file selection supported
  - Accepts: image/* (JPEG, PNG, GIF, etc.)
- **Uploaded Images Preview Area**
  - Shows thumbnails of uploaded images
  - Images persist for current session only
  - Can use uploaded images like library images

---

### 5. Object Selection
**Translation Key:** `findobjects.object.selection`

#### Activity Mode Selector
- **I Spy - Find Hidden Objects** [DEFAULT]
- **Odd One Out - Find Unpaired Images**

#### I SPY MODE CONTROLS

**Distractors Section:**
- Label: "Distractors (Select 8–12)"
- **Distractor Theme Selector** dropdown
  - Default: "-- No Theme (Use Manual Selection) --"
  - Can select theme to auto-populate distractor images
- **Selected Distractors Display Area** - shows manually selected images with remove buttons

**Hidden Objects Section:**
- Label: "Hidden Objects (Select 1–5)"
- **Hidden Object Theme Selector** dropdown
  - Default: "-- No Theme (Use Manual Selection) --"
  - Can select theme to auto-populate hidden object images
- **Selected Hidden Objects Display Area** - shows manually selected images with remove buttons

#### ODD ONE OUT MODE CONTROLS

**Pairs Section:**
- Label: "Pairs"
- **Pairs Count Selector** dropdown:
  - 8 pairs (16 images)
  - 9 pairs (18 images)
  - 10 pairs (20 images) [DEFAULT]
  - 11 pairs (22 images)
  - 12 pairs (24 images)
- **Pairs Theme Selector** dropdown
  - Default: "-- No Theme (Use Manual Selection) --"
- **Selected Pairs Display Area**

**Odd Images Section:**
- Label: "Odd Images (Unpaired)"
- **Odd Images Count Selector** dropdown:
  - 1 odd image
  - 2 odd images [DEFAULT]
  - 3 odd images
- **Odd Images Theme Selector** dropdown
  - Default: "-- No Theme (Use Manual Selection) --"
- **Selected Odd Images Display Area**

---

## TOP CANVAS TOOLBAR (Contextual - appears when object selected)

**Location:** Centered at top of canvas, appears when object is selected

### Toolbar Groups:

1. **Layers Group:**
   - Bring to Front
   - Bring Forward
   - Send Backward
   - Send to Back

2. **Align Group:**
   - Align Selected Objects:
     - Align Left
     - Center Horizontally
     - Align Right
     - Align Top
     - Center Vertically
     - Align Bottom
   - Align to Page:
     - Center on Page Horizontally
     - Center on Page Vertically

3. **Lock/Unlock Group:**
   - Lock/Unlock button (toggle)
   - Prevents/allows object editing

4. **Delete Group:**
   - Delete Selected button

---

## TAB ROW (Top Right Actions)

### Tabs:
1. **Worksheet Tab** [DEFAULT ACTIVE]
2. **Answer Key Tab**

### Header Actions (Right Side):

1. **Zoom Controls:**
   - Zoom Out button
   - Zoom Percentage display (100% default)
   - Zoom In button
   - Reset Zoom button

2. **History Controls:**
   - Undo button (Ctrl+Z)
   - Redo button (Ctrl+Y)

3. **Unlock All Controls:**
   - Unlock All button (shown when objects are locked)

4. **Generate Dropdown:**
   - **Create** button (accent style, blue)
   - Dropdown options:
     - "New Worksheet" - generates worksheet layout
     - "Answer Key" - generates answer key (disabled until worksheet exists)

5. **Download Dropdown:**
   - **Download** button (download-btn style, white)
   - Dropdown options:
     - "Worksheet (JPEG)" - disabled until generated
     - "Answer Key (JPEG)" - disabled until generated
     - --- divider ---
     - "Worksheet (PDF)" - disabled until generated
     - "Answer Key (PDF)" - disabled until generated
     - --- divider ---
     - "Grayscale" checkbox

6. **Clear All Button:**
   - Danger style (light background)
   - Clears entire canvas

---

## KEY FEATURES SUMMARY

### 1. Two Distinct Activity Modes
**I Spy Mode:**
- Find 1-5 hidden objects among 8-12 distractor images
- Classic "find the hidden objects" worksheet format
- Answer key shows circled/highlighted hidden objects

**Odd One Out Mode:**
- Create pairs of matching images (8-12 pairs)
- Add 1-3 unpaired "odd" images
- Students find which images don't have a match
- Answer key highlights the odd images

### 2. Flexible Image Selection
- **Manual Selection:** Browse and click individual images
- **Theme-Based Selection:** Choose theme for auto-population
- **Mixed Approach:** Combine theme + manual additions
- **Custom Uploads:** Add your own images (session-only)

### 3. Full Canvas Editability
- **Drag & Drop:** Move any object anywhere
- **Rotate:** Spin objects to any angle
- **Scale:** Resize images to any size
- **Lock:** Prevent accidental changes
- **Layer Control:** Bring forward/send backward
- **Alignment Tools:** Align to each other or to page

### 4. Professional Customization
- **Page Formats:** Letter/A4, Portrait/Landscape, Custom
- **Backgrounds:** Themed backgrounds or solid colors
- **Borders:** Themed decorative borders
- **Opacity Controls:** Adjust background/border transparency
- **Text Customization:** 7 fonts, colors, outlines, sizes

### 5. Multilingual Support (11 Languages)
- English, German, French, Spanish, Portuguese (Brazilian)
- Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- **Image library changes based on selected language**
- Image filenames in native language for language learning

### 6. Download Options
- **Formats:** JPEG or PDF
- **Grayscale Option:** Save ink for printing
- **Separate Downloads:** Worksheet and Answer Key separate
- **Professional Quality:** 300 DPI for printing/selling

### 7. Answer Key Auto-Generation
- Automatically creates answer key showing solutions
- **I Spy:** Circles or highlights hidden objects
- **Odd One Out:** Highlights unpaired images
- Separate tab for viewing/downloading

---

## PRICING VERIFICATION

**Looking up Find Objects in SEO-RULES.md pricing list...**

**Find Objects** = **Full Access ($240/year or $25/month)**

Source: SEO-RULES.md, Line 203:
```
7. **Find Objects** = Full Access ($240/year)
```

**CONFIRMED:** This app requires Full Access subscription, NOT Core Bundle.

**Correct pricing language to use:**
- "$240/year" or "$25/month"
- "Full Access subscription"
- "all 33 apps included"
- "Full Access includes commercial license"

**NEVER use for this app:**
- "$144/year" or "$15/month"
- "Core Bundle"
- "10 apps included"

---

## 11 LANGUAGE SUPPORT

The app supports 11 UI and content languages:
- English (en)
- German (de)
- French (fr)
- Spanish (es)
- Portuguese (pt)
- Italian (it)
- Dutch (nl)
- Swedish (sv)
- Danish (da)
- Norwegian (no)
- Finnish (fi)

**CRITICAL:** Image filenames are in the selected language, making this app excellent for:
- ESL/EFL teaching
- World language instruction
- Bilingual education
- International schools

---

## TECHNICAL DETAILS (for factual accuracy)

### Canvas Implementation:
- Uses Fabric.js 5.3.1 for canvas editing
- Two canvases: worksheetCanvas and answerKeyCanvas
- Full object manipulation (drag, rotate, scale, lock, delete)

### Image Processing:
- Auto-generates worksheet layout based on selected images
- Randomizes image placement for variety
- Auto-scales images to fit page appropriately
- Prevents overlapping when generating

### Export Quality:
- Professional 300 DPI output
- PDF generation via jsPDF library
- JPEG export via HTML5 Canvas toDataURL
- Grayscale conversion option for ink-saving

### File Upload:
- Multi-file upload supported
- Accepts all common image formats
- Session-only persistence (not saved to server)
- Combines with library images seamlessly

---

## COMPARISON TO SIMILAR APPS

**Find and Count** (different app):
- Count specific objects in a scene
- Number-based activity

**Find Objects** (this app):
- Two modes: I Spy OR Odd One Out
- More sophisticated visual discrimination
- Better for visual perception and matching skills

**Odd One Out** (different app):
- Dedicated odd one out app (simpler)
- Find Objects includes this + I Spy mode

---

## USER BENEFITS

### For Teachers:
- Create differentiated worksheets (easier with fewer objects, harder with more)
- Support visual discrimination skill development
- Engage reluctant learners with fun format
- Quick generation (under 3 minutes per worksheet)

### For ESL/Language Teachers:
- Images labeled in target language
- Vocabulary reinforcement through visual association
- 11 languages supported for maximum flexibility

### For Special Education:
- Visual perception training
- Attention and focus exercises
- Matching and discrimination skills
- Adjustable difficulty (fewer/more objects)

### For Teacher Entrepreneurs:
- POD commercial license included
- Sell on Teachers Pay Teachers, Etsy, Amazon KDP
- Quick worksheet generation = more products to sell
- Professional 300 DPI quality

---

## KEYWORDS FOR SEO (English - from keywords.txt)

Based on keywords.txt, the top 10 English worksheet keywords are:
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

**NOTE:** Find Objects is a visual discrimination tool, so keywords like "math worksheets" and "phonics worksheets" will be integrated through Section 7 (Combine with Other Apps), discussing how teachers create complete learning packets combining Find Objects with other worksheet types.

---

## END OF ANALYSIS

**This analysis is based on actual code inspection of `REFERENCE APPS/find objects.html`.**

All features listed are REAL and VERIFIED in the source code.
