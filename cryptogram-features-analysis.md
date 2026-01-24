# Cryptogram App - Features Analysis

**Source:** REFERENCE APPS/cryptogram.html

## PRICING VERIFICATION
**App Name:** Cryptogram
**Subscription Tier:** Full Access $240/year
**Monthly Price:** $25/month
✓ I will use "Full Access" and "$240/$25" throughout this document
✓ I will NEVER use "Core Bundle" or "$144/$15" for this app

---

## App Description
Image Cryptogram Worksheet Generator - Creates cryptogram puzzles where letters are replaced with images. Users solve the puzzle by decoding which image represents which letter to reveal hidden phrases.

---

## Accordion Sections

### 1. Image Cryptogram (Language Selection)
**Line 934-954**
- **Language Selector** (line 938): Choose image library language
  - Options: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish (11 languages)
  - Affects image names and themes displayed

### 2. Puzzle Rules
**Line 958-972**
- **Phrases Input** (line 961): Textarea for entering phrases (one per line)
  - Placeholder: "The quick brown fox..."
  - 5 rows tall
- **Letters to Reveal** (line 964): Dropdown selector
  - How many letters to show as hints
- **Max Lines per Puzzle** (line 967): Dropdown selector
  - Controls puzzle complexity
- **Auto-assign images** (line 970): Checkbox
  - Automatically assigns images to letters

### 3. Image Assignment
**Line 976-988**
- **Image Theme Selector** (line 979): Dropdown with themes
- **Letter Buttons** (line 981): Click to select which letter to assign image
- **Search Images** (line 983): Text input to search for specific images
  - Placeholder: "e.g., apple, car"
- **Available Images** (line 985): Dictionary showing clickable images
- **Assigned Images Preview** (line 987): Shows which images are assigned to which letters

### 4. Upload Custom Images
**Line 992-1004**
- **File Upload Button** (line 996): "Choose Files" button
- **File Upload Status** (line 997): Shows selected file names
- **File Input** (line 998): Hidden input accepting multiple images
  - Accepts: image/* (all image formats)
- **Uploaded Images Preview** (line 1001): Shows uploaded images

### 5. Page Setup
**Line 1008-1048**

#### Page Size & Color (lines 1011-1027)
- **Page Size Selector** (line 1011):
  - Letter Portrait (8.5×11") - 612x792
  - Letter Landscape (11×8.5") - 792x612
  - A4 Portrait (210×297mm) - 595x842
  - A4 Landscape (297×210mm) - 842x595
  - Square (1200×1200)
  - Custom (with custom width/height inputs)
- **Custom Width/Height** (lines 1021-1023): Number inputs for custom dimensions
- **Page Color** (line 1026): Color picker (#FFFFFF default)
- **Apply Size & Color Button** (line 1027): Apply settings

#### Background (lines 1029-1036)
- **Background Theme Selector** (line 1031): Dropdown with background themes
  - Default: "None"
- **Background Dictionary** (line 1034): Shows available backgrounds
- **Background Opacity** (line 1036): Range slider 0-1, step 0.05
  - Disabled until background selected

#### Border (lines 1038-1047)
- **Border Theme Selector** (line 1040): Dropdown with border themes
  - Default: "None"
- **Border Dictionary** (line 1043): Shows available borders
- **Border Opacity** (line 1047): Range slider 0-1, step 0.05
  - Disabled until border selected

### 6. Text Tools
**Line 1052-1072**

#### Add New Text (lines 1054-1056)
- **Text Content Input** (line 1055): Text field for new text
  - Placeholder: "Hello!"
- **Add Text Button** (line 1056): Adds text to canvas

#### Selected Text Properties (lines 1057-1071)
- **Text Color** (line 1058): Color picker (#333333 default)
  - Disabled until text selected
- **Font Size** (line 1059): Number input (48 default, min 8)
  - Disabled until text selected
- **Font Family** (line 1061): Dropdown selector
  - Options: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Disabled until text selected
- **Outline Color** (line 1070): Color picker (#000000 default)
  - Disabled until text selected
- **Outline Width** (line 1071): Range slider 0-10, step 0.5
  - Disabled until text selected

---

## Canvas Features

### Contextual Toolbar (lines 1084-1126)
Appears when object is selected on canvas:

#### Layers (lines 1087-1093)
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

#### Align (lines 1098-1117)
**Align Selected:**
- Align Left
- Center Horizontally
- Align Right
- Align Top
- Center Vertically
- Align Bottom

**Align to Page:**
- Center on Page Horizontally
- Center on Page Vertically

#### Lock/Unlock (line 1121)
- Lock or unlock selected object

#### Delete (line 1124)
- Delete selected object

### Tab System (lines 1127-1165)

#### Worksheet Tab (line 1129)
- Shows the puzzle with images (encoded version)

#### Answer Key Tab (line 1130)
- Shows the solved puzzle with letters revealed

### Header Actions (lines 1133-1165)

#### Zoom Controls (lines 1133-1137)
- Zoom Out button
- Zoom percentage display (100% default)
- Zoom In button
- Reset Zoom button

#### History Controls (lines 1139-1142)
- Undo button (Ctrl+Z) - disabled by default
- Redo button (Ctrl+Y) - disabled by default

#### Unlock All (lines 1144-1148)
- Unlock All Locked Objects button
- Shows only when objects are locked

#### Generate Button (line 1150)
- "Create" button to generate cryptogram
- Primary action (accent color)

#### Download Dropdown (lines 1151-1164)
- Download button with dropdown
- Options:
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
  - Grayscale checkbox toggle
- Disabled until worksheet generated

#### Clear All Button (line 1165)
- "Clear All" button to reset worksheet
- Danger styling (red)

---

## Key Functionality

### How It Works
1. **Enter Phrases**: User types phrases that will be encoded
2. **Choose Settings**: Select how many letters to reveal as hints, max lines
3. **Assign Images**: Either auto-assign or manually assign images to each letter
4. **Customize**: Add backgrounds, borders, custom text
5. **Generate**: Creates two versions - worksheet (with images) and answer key (with letters)
6. **Edit on Canvas**: Drag, resize, rotate, align all elements
7. **Download**: Export as JPEG or PDF in color or grayscale

### Unique Features
- **Dual Canvas System**: Separate worksheet and answer key tabs
- **Image-to-Letter Mapping**: Each letter gets assigned an image
- **Auto-Assignment Option**: Automatically assigns images to letters
- **Letter Hints**: Can reveal some letters to make puzzle easier
- **11 Language Support**: Image names/themes in 11 languages
- **Custom Image Upload**: Add your own images to puzzles
- **Professional Quality**: 300 DPI exports

---

## Educational Use Cases
- Letter recognition practice
- Spelling and vocabulary building
- Logic and problem-solving skills
- Pattern recognition
- ESL/language learning (with image-word associations)
- Fun alternative to traditional word puzzles
- Differentiation tool (adjust difficulty with hint letters)
