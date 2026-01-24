# Alphabet Train App - Complete Features Analysis

Source: REFERENCE APPS/alphabet train.html

## 1. LANGUAGE SETTINGS (Line 919-935)
- **11 Languages**: English, Deutsch, Français, Español, Português, Italiano, Nederlands, Svenska, Dansk, Norsk, Suomi
- UI translates to selected language
- Content language-specific (uses localized image filenames)

## 2. PAGE SETUP (Line 938-988)

### Paper Size Options (Line 940-948):
- Letter Portrait (8.5×11") - default
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200x1200)
- Custom (user-defined width/height in pixels)

### Template (Line 957-961):
- Train template: Default Train (/images/background/train.png)
- Fixed train graphic that letters are placed on

### Page Color (Line 963-964):
- Color picker for background page color
- Default: #FFFFFF (white)

### Background Theme (Line 966-975):
- Theme selection dropdown
- Opacity slider (0-1, step 0.05)
- Background dictionary shows available backgrounds from selected theme

### Border Theme (Line 977-986):
- Theme selection dropdown
- Opacity slider (0-1, step 0.05)
- Border dictionary shows available borders from selected theme

## 3. TEXT TOOLS (Line 992-1012)

### Add New Text (Line 994-996):
- Text input field
- "Add Text to Page" button
- Placeholder: "Worksheet Title..."

### Selected Text Properties (Line 997-1011):
- Color picker (default #333333)
- Font size (minimum 8, default 36)
- Font family dropdown:
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- Outline color (default #000000)
- Outline width (0-10, step 0.5)

## 4. MODE SELECTION (Line 1016-1023)

### Auto Create Mode (Line 1018-1021):
- Checkbox: "Auto Create (Random 11 Letters & Images)"
- When enabled: automatically selects 11 random letters and assigns random images
- When disabled: manual selection becomes available

## 5. LETTER & IMAGE SELECTION - MANUAL MODE (Line 1025-1043)

### Letter Selection (Line 1029-1033):
- **Exactly 11 letters must be selected**
- Alphabet grid showing all letters
- Counter shows "Selected: X/11"
- Letters clickable to select/deselect

### Image Theme Selection (Line 1035-1042):
- Theme dropdown menu
- Search input: "Search images (e.g., apple)"
- Dictionary shows available images from selected theme
- Preview pane for selected image

## 6. UPLOAD CUSTOM IMAGES (Line 1046-1062)
- Multi-file upload input
- Accepts all image formats (image/*)
- File chooser button interface
- Display shows "X files chosen" or "No file chosen"
- Uploaded images preview section
- Images available for this session only

## 7. ASSIGNMENTS & CONFIGURATION (Line 1064-1081)

### Assigned Images Display (Line 1067-1070):
- Shows which image is assigned to each selected letter
- Visual preview of letter-image pairings

### Number of Clues (Line 1073-1074):
- Range: 3-11 clues
- Default: 3
- Controls how many letters appear on the worksheet

### Include Name/Date Fields (Line 1076-1078):
- Checkbox option
- When enabled: adds Name and Date fields to worksheet

## 8. CANVAS EDITING FEATURES (Line 1092-1133)

### Object Context Toolbar (appears when object selected):

#### Layering Controls (Line 1097-1100):
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

#### Alignment Tools (Line 1108-1131):
- Align Selected: left, center, right, top, middle, bottom
- Align to Page: left, center, right, top, middle, bottom

### Lock/Unlock Feature (Line 1157-1159):
- "Unlock All" button
- Allows locking objects to prevent accidental movement

## 9. GENERATION OPTIONS (Line 1140-1167)

### Tabs (Line 1140-1141):
- Worksheet tab (default active)
- Answer Key tab

### Generate Dropdown (Line 1162-1166):
- "Create Worksheet" button
- "Create Answer Key" button (enabled after worksheet created)

## 10. DOWNLOAD OPTIONS (Line 1169-1179)

### Download Dropdown Menu (enabled after generation):
- Worksheet (JPEG)
- Answer Key (JPEG)
- Worksheet (PDF)
- Answer Key (PDF)

### Grayscale Option (Line 1177):
- Checkbox: "Grayscale"
- Converts colors to grayscale for ink-saving printing

## 11. CLEAR ALL (Line 1181)
- "Clear All" button
- Resets the entire worksheet and all settings

## KEY UNIQUE FEATURES

1. **Train Template**: Fixed train graphic where letters are placed in train cars
2. **Exactly 11 Letters**: Worksheet always uses exactly 11 letters (one alphabet train)
3. **Clue System**: Number of clues (3-11) controls how many letters are revealed vs hidden
4. **Letter-Image Pairing**: Each selected letter gets paired with an image
5. **Auto vs Manual Mode**:
   - Auto: random 11 letters + random images
   - Manual: user selects specific 11 letters and chooses images from themes
6. **Language-Aware**: Image selection uses language-specific filenames for proper matching
7. **Answer Key**: Separate answer key generation showing all letters

## WORKFLOW

1. Choose mode (Auto or Manual)
2. If Manual: Select exactly 11 letters + choose images from themes or upload custom
3. Set number of clues (3-11)
4. Configure page setup (size, colors, backgrounds, borders)
5. Add custom text if desired
6. Generate worksheet
7. Edit on canvas (move, resize, rotate, align, layer)
8. Generate answer key
9. Download as JPEG or PDF
10. Optional: Enable grayscale for printing

## EDUCATIONAL PURPOSE
- Letter recognition practice
- Alphabet sequencing
- Visual-letter association
- Fine motor skills (if printing and having students trace/color)
- Memory and matching activities
