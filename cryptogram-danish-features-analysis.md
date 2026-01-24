# Cryptogram App - Features Analysis (Danish Page)

## APP PRICING VERIFICATION
**App Name:** Cryptogram
**Subscription Tier:** Full Access $240/year
**Monthly Price:** $25/month
✓ I will use "Full Access" and "$240/$25" throughout this document
✓ I will NEVER use "Core Bundle" or "$144/$15" for this app

## Core Features Found in cryptogram.html

### 1. Image Cryptogram Settings (Main Accordion - Lines 934-956)
- Language selection for image library (11 languages: EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
- Content language selector separate from UI language
- Images are selected based on language for generating puzzles

### 2. Puzzle Rules (Accordion - Lines 958-974)
- **Phrases Input**: Multi-line textarea for entering phrases to encode (one phrase per line)
- **Letters to Reveal**: Dropdown 0-10 letters (default: 3 letters)
  - Reveals certain letters as clues to help solve the cryptogram
- **Max Lines per Puzzle**: Dropdown 1-8 lines (default: 4 lines)
  - Controls how many lines of encoded text appear on worksheet
- **Auto-assign Images**: Checkbox to automatically assign images to letters

### 3. Image Assignment (Accordion - Lines 976-990)
- **Image Theme Selection**: Dropdown with all available themes
- **Letter Selection**: Click letter buttons A-Z (or language-specific alphabet)
- **Search Images**: Search box to find images by name/keyword
- **Available Images Dictionary**: Visual grid showing clickable image thumbnails
- **Assigned Images Preview**: Shows which images are assigned to which letters

### 4. Upload Custom Images (Accordion - Lines 992-1006)
- Multi-file upload support (JPEG, PNG, GIF)
- Uploaded images appear in preview area
- Can combine uploaded images with library images
- Used for personalized cryptogram puzzles

### 5. Page Setup (Accordion - Lines 1008-1050)
- **Page Size Options**:
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Square (1200×1200)
  - Custom size (user-defined width/height in pixels)
- **Page Color**: Color picker for background color
- **Background Theme**: Dropdown selector + thumbnail preview
- **Background Opacity**: Slider control
- **Border Theme**: Dropdown selector + thumbnail preview
- **Border Opacity**: Slider control

### 6. Text Tools (Accordion - Lines 1052-1091)
- **Add New Text**: Input field + "Add Text" button
- **Text Properties** (for selected text):
  - Color picker
  - Font size (number input, minimum 8)
  - Font family dropdown (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana)
  - Outline color picker
  - Outline width slider (0-10)
- **Layering Controls**: Bring to Front, Bring Forward, Send Backward, Send to Back
- **Alignment Tools**: Align selected objects, align to page

### 7. Canvas Editing (Lines 1130-1165)
- **Two Tabs**: Worksheet tab and Answer Key tab
- **Lock/Unlock**: Toggle to lock all elements on canvas
- **Generate Button**: Creates the cryptogram puzzle
- **Download Options**:
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale Toggle**: Convert to grayscale for ink-saving
- **Clear All**: Reset everything

## How Cryptogram Works

1. User enters phrases (sentences) into textarea
2. App analyzes unique letters in all phrases
3. Each unique letter gets randomly assigned a different letter as a substitution cipher
4. User assigns an image to each letter (or uses auto-assign)
5. Worksheet shows:
   - Encoded phrases (with substitute letters)
   - Image key showing which image = which ENCODED letter
   - Empty boxes for students to write decoded letters
6. Answer key shows:
   - Original phrases
   - Complete solution with all correct letters

## Target Audience
- Danish teachers (0.-3. klasse)
- Language arts focus (learning letters, spelling, reading)
- Critical thinking and puzzle-solving
- Can be used for vocabulary building
- Works well for literacy development

## Danish-Specific Context
- Cryptogram is word/letter puzzle - perfect for "Lære bogstaver", "Stavning", "Læse og skrive"
- Uses Danish alphabet (Æ, Ø, Å included)
- Image library supports Danish language
- Combines literacy with critical thinking
- Popular in "Dansk" (Danish language) curriculum
