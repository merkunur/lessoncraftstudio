# Pattern Train App - Feature Analysis

**Source File:** REFERENCE APPS/pattern train.html
**Analysis Date:** 2025-12-18

## App Overview
Pattern Train is a worksheet generator that creates pattern recognition worksheets with a train theme.

## Accordion Sections (Main UI Organization)

### 1. Page Setup (line 947)
- **Language Selector** (line 949-963)
  - 11 languages supported: EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI
  - Language description note

- **Paper Size Selector** (line 967-982)
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Landscape (297×210mm)
  - A4 Portrait (210×297mm)
  - Square (1200x1200)
  - Custom (with width/height inputs)
  - "Apply Size" button

- **Template** (line 984-989)
  - Train Template selector
  - Default train image: /images/background/train.png

- **Page Color** (line 990-992)
  - Color picker for page background

- **Background Theme** (line 993-1003)
  - Background theme selector
  - Background opacity slider
  - Background dictionary display

- **Border Theme** (line 1004-1013)
  - Border theme selector
  - Border opacity slider
  - Border dictionary display

### 2. Text Tools (line 1018)
- **Add New Text** (line 1020-1022)
  - Text content input
  - "Add Text to Worksheet" button

- **Selected Text Properties** (line 1023-1037)
  - Text color picker
  - Font size (8+ px)
  - Font family selector: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Outline color picker
  - Outline width slider (0-10)

### 3. Pattern Configuration (line 1042)
- **Pattern Type Selector** (line 1044-1051)
  - AB pattern
  - AAB pattern
  - ABB pattern
  - ABC pattern
  - AABB pattern

- **Theme Selector** (line 1053-1056)
  - Optional auto-picking from theme
  - Default: Manual Image Selection

- **Clue Count** (line 1058-1059)
  - Number of clues: 4-10

- **Include Name/Date** (line 1061-1063)
  - Checkbox to include name/date fields on worksheet

### 4. Image Selection (line 1068)
- **Image Theme Dictionary** (line 1071-1075)
  - Theme selector for browsing image library
  - Dictionary display showing theme images

- **Custom Image Upload** (line 1078-1091)
  - Multi-file upload
  - File selector with custom styling
  - Uploaded images preview area
  - Session-based upload storage

- **Assigned Images Section** (line 1094)
  - Shows currently selected images for pattern

## Top Action Bar Features

### Tab Switcher (line 1155-1156)
- Worksheet tab (default active)
- Answer Key tab

### Right Action Buttons
- **Unlock All** checkbox (line 1173)
  - Unlocks all objects on canvas for editing

- **Create Dropdown** (line 1177-1181)
  - "Create" main button
  - "New Worksheet" option
  - "Answer Key" option (disabled until worksheet created)

- **Download Dropdown** (line 1184-1194)
  - "Download" main button
  - Worksheet (JPEG) - disabled until created
  - Answer Key (JPEG) - disabled until created
  - Worksheet (PDF) - disabled until created
  - Answer Key (PDF) - disabled until created
  - Grayscale checkbox toggle

- **Clear All Button** (line 1197)
  - Clears entire canvas

## Canvas Toolbar (When object selected)
### Layer Control (lines 1114-1117)
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

### Alignment Tools (lines 1125-1155)
- Align Selected objects
- Align to Page

## Key Capabilities Summary

1. **Pattern Types:** 5 different pattern types (AB, AAB, ABB, ABC, AABB)
2. **Clue Range:** 4-10 clues per worksheet
3. **Image Sources:**
   - 3000+ library images organized by themes
   - Custom upload (multi-file, session-based)
4. **Languages:** 11 language UI support
5. **Paper Formats:** 6 preset sizes + custom dimensions
6. **Customization:**
   - Train template with pattern boxes
   - Page color
   - Background themes with opacity control
   - Border themes with opacity control
   - Text addition with full styling
   - Full canvas editing (drag, rotate, scale, layer control)
7. **Output:**
   - Worksheet and Answer Key
   - JPEG or PDF format
   - Grayscale option
   - 300 DPI quality

## Pattern Train Specific Features

1. **Train Template:** Fixed train graphic with pattern sequence boxes
2. **Pattern Recognition:** Educational tool for teaching AB, AAB, ABB, ABC, AABB patterns
3. **Visual Learning:** Uses images to create engaging pattern exercises
4. **Answer Key:** Automatically generates answer key showing completed pattern
5. **Name/Date Fields:** Optional student information fields

## Worksheet Generation Process
1. Select pattern type (AB, AAB, ABB, ABC, or AABB)
2. Choose number of clues (4-10)
3. Select images either:
   - Manually from theme dictionary, OR
   - Auto-pick from selected theme, OR
   - Upload custom images
4. Optionally add name/date fields
5. Generate worksheet with train template
6. Generate answer key showing completed pattern
7. Customize with backgrounds, borders, text, colors
8. Download as JPEG or PDF

## Educational Value
- **Pattern Recognition:** Core early math skill
- **Visual Learning:** Image-based pattern practice
- **Engagement:** Fun train theme appeals to young learners
- **Differentiation:** 5 difficulty levels (AB easiest → AABB hardest)
- **Customization:** Teachers can adapt to any theme or subject
