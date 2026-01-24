# Word Search Generator - Features Analysis

## SOURCE FILE
`REFERENCE APPS/wordsearch.html`

## VERIFIED FEATURES

### 1. Language Settings (Line 839-861)
- **Image Library Language Selector**: 11 languages
- English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- Language determines image names displayed on worksheet
- Independent from UI language

### 2. Page & Scene Settings (Line 863-904)

#### Page Setup:
- **Page Size Options** (Line 867-873):
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Custom (user-defined dimensions)

#### Backgrounds:
- Fallback color picker
- Background theme selector
- Background opacity slider (0-100%)

#### Borders:
- Border theme selector
- Border opacity slider (0-100%)

### 3. Text Tools (Line 906-927)
- **Add New Text**: Custom text input
- **Selected Text Properties**:
  - Color picker
  - Font size (8+ px)
  - Font family (7 options: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana)
  - Outline color
  - Outline width (0-10)

### 4. Puzzle Settings (Line 929-951)

#### Grid Size (Line 931-941):
- **Rows**: 5-30 (default 12)
- **Columns**: 5-30 (default 12)

#### Puzzle Options (Line 943-949):
- **Allow Diagonal Words** (checkbox, default ON)
- **Allow Reverse Words** (checkbox, default OFF)
- **Show Word/Image List** (checkbox, default ON)
- **Show only images** (checkbox, default OFF)
- **Show only words** (checkbox, default OFF)

### 5. Image Library (Line 954-974)
- **Image Source for Puzzle**:
  - Theme selector (including "Use Random Theme" option)
  - Automatically select 8 images from chosen theme
- **Individual Image Selection**:
  - Filter by theme
  - Search images by keyword
  - Available images display (max 8 selection)
  - Selected images preview

### 6. Upload Custom Images (Line 976-989)
- Multi-file upload
- All common image formats (JPEG, PNG, GIF)
- Uploaded images preview
- Can combine with library images

### 7. Manual Image Name Editing (Line 991-1008)
- **Enable Manual Edit Mode** (checkbox)
- Click to add images
- Edit image names before generating
- Override automatic image names

### 8. Custom Word List (Line 1010-1027)
- **Enable Custom Word List** (checkbox)
- Text-only puzzles (no images)
- Enter custom words (one per line, max 8)
- Only letters allowed (special characters removed)

### 9. Canvas Editing Features

#### Contextual Toolbar (Line 1034-1076):
- **Layers**: Bring to Front, Bring Forward, Send Backward, Send to Back
- **Align**: Left, Center Horizontal, Right, Top, Center Vertical, Bottom
- **Align to Page**: Center on Page Horizontally/Vertically
- **Lock/Unlock**: Lock selected objects
- **Delete**: Delete selected objects

#### Header Controls (Line 1077-1125):
- **Tabs**: Worksheet / Answer Key
- **Zoom Controls**: Zoom In, Zoom Out, Reset Zoom (25%-300%)
- **History**: Undo (Ctrl+Z), Redo (Ctrl+Y) - up to 20 steps
- **Unlock All**: Unlock all locked objects (shows when locked objects exist)
- **Generate Dropdown**: New Worksheet, Answer Key
- **Download Dropdown**:
  - Worksheet (JPEG/PDF)
  - Answer Key (JPEG/PDF)
  - Grayscale toggle
- **Clear All**: Remove all objects

### 10. Key Functional Features

#### Word Search Generation Algorithm (Line 2186+):
- Customizable grid size (5x5 to 30x30)
- Supports 8 directions (horizontal, vertical, diagonal)
- Optional reverse word placement
- Language-specific alphabets (including accents/special characters)
- Random letter fill for empty cells

#### Image-Based or Text-Based Puzzles:
- **Image Mode**: Uses image filenames as words
- **Text Mode**: Uses custom word list
- **Hybrid Mode**: Shows both images and words
- **Images Only**: Shows only images in word list
- **Words Only**: Shows only words in word list

#### Professional Quality:
- 300 DPI export for printing
- PDF and JPEG formats
- Grayscale option (saves ink)
- Professional-quality worksheets

#### Full Canvas Editability:
- Drag, rotate, scale any element
- Add custom text elements
- Upload and position custom images
- Backgrounds and borders fully customizable
- Complete control over worksheet layout

## UNIQUE FEATURES

1. **Language-Specific Alphabets**: Automatically uses correct character set for each language (German umlauts, French accents, Spanish ñ, etc.)

2. **11-Language Support**: Image names automatically display in selected language on worksheet

3. **Flexible Word Sources**:
   - Image filenames (automatic)
   - Manual image name editing
   - Custom word list (text-only)

4. **Answer Key Generation**: Automatic answer key with color-coded word highlighting

5. **Professional Layout Algorithm**: Automatically calculates optimal grid positioning and cell size based on page orientation

## LIMITATIONS

- Maximum 8 words/images per puzzle
- Grid size limited to 30×30
- Undo history limited to 20 steps
- Words must fit grid dimensions

## PRICING
**Word Search is the ONLY FREE APP** (with watermark on worksheets, personal use only)
- All other apps require paid subscription
- See SEO-RULES.md for complete pricing list
