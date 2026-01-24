# Word Guess App - Features Analysis
## Source: REFERENCE APPS/word guess.html

---

## PRICING VERIFICATION (MANDATORY)

**App Name:** Word Guess
**Subscription Tier:** Full Access $240/year
**Monthly Price:** $25/month

✓ I will use "Full Access" and "$240/$25" throughout this document
✓ I will NEVER use "Core Bundle" or "$144/$15" for this app

---

## APP CONCEPT

Word Guess is an image clue grid worksheet generator that creates picture-based word guessing puzzles. Students see an image and must guess the word using letter clues provided in a grid format.

---

## KEY FEATURES FOUND IN CODE

### 1. Language Settings (Line 681-697)
- 11 languages supported: EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI
- Language affects UI and content generation
- Images use filenames as words in selected language
- CRITICAL for language learning apps

### 2. Page Setup (Line 704-734)
**Page Sizes:**
- Letter Portrait (612×792)
- Letter Landscape (792×612)
- A4 Portrait (595×842)
- A4 Landscape (842×595)
- Square (1200×1200)
- Custom dimensions (user-defined)

**Page Customization:**
- Page color picker
- Background themes (from library)
- Background opacity slider
- Border themes (from library)
- Border opacity slider

### 3. Text Tools (Line 740-757)
- Add custom text to worksheet
- Text color picker
- Font size control (8+)
- 6 font families: Baloo 2, Fredoka, Lexend Deca, Nunito, Quicksand, Segoe UI
- Text outline color
- Text outline width (0-10)

### 4. Exercise Configuration (Line 763-791)
**Puzzle Count:**
- Create 1-10 puzzles per worksheet
- Each puzzle has one image and letter grid

**Difficulty Levels:**
- No clues (0 letters shown)
- Easy - 1/2 of letters shown
- Normal - 1/4 of letters shown
- Tough - 1/6 of letters shown

**Letter Settings:**
- Exclude specific letters from clues
- Letter case: Uppercase or Lowercase

**Optional Features:**
- Include Name & Date fields
- Include Exercise Numbers (default ON)

### 5. Image Library (Line 795-804)
- Theme-based selection (dropdown)
- Search functionality
- 3000+ child-friendly images
- Selected images preview
- Click to select/deselect

### 6. Upload Custom Images (Line 810-820)
- Multi-file upload button
- Supports JPEG, PNG, GIF
- Session-based storage
- Preview uploaded images
- Combine with library images

### 7. Manual Image Name Editing (Line 826-841)
- Enable/disable toggle
- Select images for puzzle
- Edit image names before generation
- Custom word assignment
- Override default filename-based words

### 8. Custom Word List (Line 845-858)
- Enable/disable toggle
- Enter custom words (one per line, max 8)
- Bypasses image selection
- Creates puzzles with user-defined words
- Useful for spelling lists, vocabulary

### 9. Canvas Tools (Object Context Toolbar - Line 877-880)
**Layering Controls:**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Positioning:**
- Center Horizontally on Page
- Center Vertically on Page

**Editing:**
- Drag and drop elements
- Rotate, scale, delete any object
- Full editability of all canvas elements

### 10. Zoom Controls (Line 923+)
- Zoom In button
- Zoom Out button
- Zoom Reset button
- Percentage display

### 11. Unlock All Feature (Line 933)
- Toggle to unlock all objects on canvas
- Enables editing of generated elements
- Allows customization of puzzle layout

### 12. Generation Options (Line 937-940)
- Generate New Worksheet
- Generate Answer Key (after worksheet created)
- Dropdown with both options

### 13. Download Options (Line 944-953)
**Formats:**
- Worksheet (JPEG)
- Answer Key (JPEG)
- Worksheet (PDF)
- Answer Key (PDF)

**Options:**
- Grayscale toggle (save ink)
- Professional 300 DPI quality

### 14. Clear All (Line 957)
- Clear entire canvas
- Start fresh worksheet

---

## UNIQUE WORD GUESS FEATURES

### Grid-Based Letter Guessing
- Each puzzle shows an image
- Letter grid displays word length
- Clues reveal some letters based on difficulty
- Students fill in missing letters
- Answer key shows complete word

### Multiple Puzzles Per Page
- 1-10 exercises per worksheet
- Automatic layout (1 or 2 columns)
- Landscape with 5+ exercises uses 2 columns
- Portrait uses single column
- Consistent spacing and sizing

### Answer Key Generation
- Separate answer key download
- Shows all letters filled in
- Same layout as worksheet
- Professional formatting

### Educational Flexibility
- No clues = spelling test mode
- Easy clues = beginner vocabulary
- Tough clues = advanced challenge
- Custom words = targeted learning

---

## HOW IT WORKS (User Workflow)

1. **Select Language** - Choose from 11 languages
2. **Choose Images** - Select theme or individual images OR use custom word list
3. **Configure Settings:**
   - Number of puzzles (1-10)
   - Difficulty level (clue amount)
   - Letter case (upper/lowercase)
   - Optional name/date fields
4. **Generate Worksheet** - Click generate button
5. **Edit on Canvas** - Customize layout, add text, adjust elements
6. **Generate Answer Key** - Create matching answer sheet
7. **Download** - Save as JPEG or PDF (worksheet + answer key)

---

## EDUCATIONAL VALUE

### Literacy Development
- Vocabulary building
- Spelling practice
- Letter recognition
- Word-image association

### Language Learning
- ESL vocabulary acquisition
- Visual context for new words
- Multilingual support
- Progressive difficulty

### Assessment
- Spelling tests
- Vocabulary quizzes
- Reading comprehension checks
- Differentiated instruction

---

## TARGET USERS

1. **Preescolar/Infantil Teachers** - Early literacy, letter recognition
2. **Educación Primaria Teachers** - Spelling, vocabulary building
3. **ESL/Language Teachers** - Visual vocabulary teaching
4. **Homeschool Parents** - Custom vocabulary practice
5. **Special Education** - Differentiated spelling support
6. **Teacher Entrepreneurs** - Selling vocabulary worksheets on TPT, Etsy

---

## COMPARISON TO COMPETITORS

**Advantages over traditional word guess makers:**
- 11 languages (most competitors English-only)
- Custom word list feature (bypass images)
- Manual image name editing (precise control)
- 3000+ image library (vs competitors charging per image)
- Answer key auto-generation (vs manual creation)
- Multiple puzzles per page (vs one at a time)
- Full canvas editability (vs fixed templates)
- POD commercial license included (vs extra licensing fees)

---

## TECHNICAL NOTES

- Uses Fabric.js for canvas manipulation
- jsPDF for PDF generation
- Image filenames determine words (e.g., "apple.png" → "APPLE")
- Automatic grid sizing based on word length
- Responsive layout adjusts for puzzle count
- Session-based uploaded image storage
- Undo/redo history tracking
- Professional 300 DPI export quality

---

## FILES ANALYZED

- REFERENCE APPS/word guess.html (main source file)
- Lines 1-957 (full app structure)
- All data-translate attributes documented
- All UI controls identified
- All features verified in source code

---

**Analysis Complete: Ready to write Spanish (Mexican) app page.**
