# Code Addition App - Feature Analysis

## App Purpose
Image-based addition worksheet generator that creates visual math exercises using pictures from the image library or uploaded images.

## Core Features Found in REFERENCE APPS/code addition.html

### 1. Page Setup (Lines 873-892)
- **Page sizes**: Letter Portrait (8.5×11"), Letter Landscape, A4 Portrait, A4 Landscape, Square (1200x1200), Custom
- **Page color**: Color picker for background
- **Custom dimensions**: Width and height inputs for custom page sizes

### 2. Background & Border (Lines 896-922)
- **Background theme**: Dropdown with themed backgrounds
- **Background opacity**: Slider control
- **Border theme**: Dropdown with themed borders
- **Border opacity**: Slider control

### 3. Text Tools (Lines 924-947)
- **Add text**: Input field with "Add Text" button
- **Text properties**:
  - Color picker
  - Font size (min 8)
  - Font family: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
  - Outline color
  - Outline width (0-10)

### 4. Image Library (Lines 948-973)
- **Upload own images**: Multi-file upload button
- **Theme selection**: Dropdown with image themes
- **Search**: Search input for finding specific images
- **Selected counter**: Shows "Selected: 0 / 5" - can select up to 5 images

### 5. Worksheet Content Settings (Lines 975-996)
- **Generation method**: "Use Manually Selected Images"
- **Number of exercises**: Input for how many addition problems to create
- **Minimum number**: Lowest number for addition problems
- **Maximum number**: Highest number for addition problems
- **Generation note**: Explains how the app works

### 6. Optional Settings (Lines 998-1005)
- **Include Name/Date fields**: Checkbox to add student name and date fields
- **Show numbers for each problem**: Checkbox (checked by default)

### 7. Canvas Editing Tools (Lines 1021-1060)
- **Layer control**: Bring to Front, Send to Back, Bring Forward, Send Backward
- **Align selected**: Alignment tools for selected objects
- **Align to page**: Alignment tools relative to page

### 8. Language Support (Lines 854-866)
- **11 languages**: English, German (Deutsch), French (Français), Spanish (Español), Portuguese (Português), Italian (Italiano), Dutch (Nederlands), Swedish (Svenska), Danish (Dansk), Norwegian (Norsk), Finnish (Suomi)
- **Image library language**: Changes the language for image file names

### 9. Worksheet & Answer Key (Lines 1062-1063)
- **Two tabs**: Worksheet view and Answer Key view
- **Separate canvases**: Each tab has its own canvas

### 10. Generation & Download (Lines 1086-1106)
- **Create dropdown**:
  - Create Worksheet
  - Create Answer Key
- **Download dropdown**:
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale toggle**: Convert to grayscale for ink-saving

### 11. Additional Tools
- **Lock/Unlock all**: Toggle button at line 1081
- **Clear all**: Danger button to clear canvas (line 1106)

## How It Works
1. User selects 3-5 images from library or uploads own images
2. User sets number of exercises and number range (min/max)
3. Clicks "Create Worksheet" to generate addition problems using selected images
4. Each problem shows two groups of images with + symbol and = symbol
5. Answer key shows the same layout with answers filled in
6. Full canvas editing: drag, rotate, scale, delete any element
7. Add text, backgrounds, borders for customization
8. Download as JPEG or PDF with grayscale option

## Unique Features
- **Visual addition with images**: Uses actual pictures instead of abstract numbers
- **Automatic answer key generation**: Creates answer key automatically
- **Flexible number ranges**: Set min/max for difficulty control
- **Full editability**: Everything on canvas is editable after generation
- **Theme consistency**: Can use themed image sets for cohesive worksheets
