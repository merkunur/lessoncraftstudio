# Alphabet Train App - Features Analysis
## Source: REFERENCE APPS/alphabet train.html

## Core Functionality
**What it does:** Creates alphabet worksheets with a train theme where each wagon contains a letter and an image starting with that letter.

## Main Features

### 1. Letter Selection
- **Exactly 11 letters** must be selected (matches number of train wagons)
- Supports **language-specific alphabets**:
  - English: A-Z
  - German: A-Z + Ä, Ö, Ü (in proper positions)
  - Spanish: A-Z + Ñ (after N)
  - French: A-Z
  - Portuguese: A-Z
  - Italian: A-Z
  - Dutch: A-Z
  - Swedish: A-Z + Å, Ä, Ö (at end)
  - Danish: A-Z + Æ, Ø, Å (at end)
  - Norwegian: A-Z + Æ, Ø, Å (at end)
  - Finnish: A-Z + Ä, Ö (at end)
- **Alphabet grid interface** with clickable letter buttons
- Letters display in **proper alphabetical order** for each language
- Shows "Selected: X/11" counter

### 2. Image Assignment
- **3000+ image library** organized by themes
- **Theme selection dropdown** with translated theme names
- **Search functionality** to find specific images
- **Image must match first letter** of the image name
- **One image per letter** (exactly 11 images for 11 letters)
- **Assigned Images panel** shows letter + preview of assigned image
- **Prevents duplicate assignments** (same image can't be used twice)
- Supports **uploaded images** (multi-file upload, JPEG/PNG/GIF)

### 3. Auto-Create Mode
- **Checkbox** to enable/disable
- **Randomly selects 11 letters** and matching images
- **Requires theme selection** (cannot use "All Themes")
- **Disables manual selection** when active
- Creates complete worksheet instantly

### 4. Train Template & Layout
- **Default train template** (/images/background/train.png)
- **11 wagons** arranged on the train
- Each wagon shows:
  - **Letter** (uppercase)
  - **Image** starting with that letter
- **Clue system** - Shows 3-11 letters as "clues" (configurable)
- **Cut-out blocks** at bottom of page showing letter blocks that can be cut and placed on wagons

### 5. Worksheet Generation Options
- **Clue Count setting** (3-11): Number of letters to reveal as clues
- **Name/Date fields checkbox**: Adds "Name: ____" and "Date: ____" fields
- **Worksheet + Answer Key**: Two separate canvases
  - Worksheet: Shows clues only
  - Answer Key: Shows all letters filled in

### 6. Page Setup
- **Paper Size options**:
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Square (1200x1200)
  - Custom (user-defined width/height in pixels)
- **Page color picker** (default white)
- **Auto-regeneration** when page size changes (if worksheet exists)

### 7. Backgrounds & Borders
- **Background themes** dropdown
- **Background opacity slider** (0-1)
- **Border themes** dropdown
- **Border opacity slider** (0-1)
- **Visual preview** of available backgrounds/borders in theme
- **Clickable thumbnails** to apply
- Applied to **both worksheet and answer key**

### 8. Text Tools
- **Add text button** to create new text elements
- **Text input field** for content
- **When text selected**, editable properties:
  - **Color picker**
  - **Font size** (8+ pixels)
  - **Font family** (7 options: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana)
  - **Outline color picker**
  - **Outline width slider** (0-10)
- Text appears **centered on page** by default

### 9. Image Upload
- **Multi-file upload** support
- **Accepts**: JPEG, PNG, GIF formats
- **Live preview** of uploaded images
- **Session-based** (images available during current session)
- Uploaded images appear in **dictionary panel**
- Can be **assigned to letters** like library images

### 10. Canvas Editing (Full Editability)
- **Drag** any element to reposition
- **Rotate** any element
- **Scale** any element (resize)
- **Delete** any element
- Works on **all objects** (images, text, backgrounds, borders, train elements)
- **Multi-select** supported (Shift+Click or drag select)

### 11. Contextual Toolbar
- **Appears** when object(s) selected
- **Layers dropdown**:
  - Bring to Front
  - Bring Forward
  - Send Backward
  - Send to Back
- **Align dropdown**:
  - Align selected objects to each other (Left, Center, Right, Top, Middle, Bottom)
  - Center object on page (Horizontally, Vertically)
- **Lock/Unlock button** (prevents editing/moving)
- **Delete button** (removes selected objects)
- **Keyboard shortcut**: Delete/Backspace key also deletes

### 12. Unlock All Feature
- **"Unlock All" button** appears when locked objects exist
- **One-click** to unlock all locked objects on canvas
- Located in **header actions area**

### 13. Undo/Redo
- **Undo button** (Ctrl+Z keyboard shortcut)
- **Redo button** (Ctrl+Y keyboard shortcut)
- **History stack** (20 actions saved)
- Works on **both canvases** independently
- **State saved** after object additions, modifications, deletions

### 14. Zoom Controls
- **Zoom In button** (magnifies canvas view)
- **Zoom Out button** (reduces canvas view)
- **Reset Zoom button** (returns to 100%)
- **Percentage display** (shows current zoom level)
- **User-controlled** (doesn't affect export size)
- Located in **header actions**

### 15. Tab System
- **Worksheet Tab** (default active)
- **Answer Key Tab**
- **Independent canvases** (can edit each separately)
- **Switch between** using tab buttons in header

### 16. Generation Workflow
- **Generate dropdown** with two options:
  1. "Create Worksheet" - Generates main worksheet
  2. "Create Answer Key" - Generates answer key (enabled after worksheet created)
- **Button disabled** until requirements met:
  - Manual mode: 11 letters selected + 11 images assigned
  - Auto mode: Theme selected (not "All Themes")

### 17. Download Options
- **Download dropdown** with options:
  - Worksheet (JPEG)
  - Answer Key (JPEG)
  - Worksheet (PDF)
  - Answer Key (PDF)
- **Grayscale toggle** (converts colors to grayscale for ink saving)
- **Professional 300 DPI quality** (6x multiplier for exports)
- **Buttons disabled** until respective worksheet/answer key generated

### 18. Language Settings (UI)
- **11 language options** for interface:
  - English
  - Deutsch (German)
  - Français (French)
  - Español (Spanish)
  - Português (Portuguese)
  - Italiano (Italian)
  - Nederlands (Dutch)
  - Svenska (Swedish)
  - Dansk (Danish)
  - Norsk (Norwegian)
  - Suomi (Finnish)
- **Dynamic translation** of all UI elements
- **Changes alphabet** shown in letter selection grid
- **Changes image library** (images tagged with translations in each language)

### 19. Clear All
- **Clear All button** (red danger button)
- **Resets everything** to default:
  - Clears selected letters
  - Removes assigned images
  - Clears uploaded images
  - Clears both canvases
  - Resets page size to Letter Portrait
  - Resets page color to white
  - Removes backgrounds/borders
  - Resets clue count to 3
  - Unchecks Name/Date fields
  - Unchecks Grayscale
  - Disables Auto-Create mode

### 20. Responsive Mobile Menu
- **Hamburger menu button** on mobile
- **Slide-out sidebar** with close button
- **Overlay** darkens background when menu open

## Educational Design Decisions

### Why 11 Letters?
The train template has **exactly 11 wagons**, which is optimal for:
- **Early learners** (manageable subset of alphabet)
- **Focused practice** (not overwhelming)
- **Fits on one page** with clear visibility
- **Allows customization** (teacher chooses which 11 letters to focus on)

### Why Clue System?
- **Differentiation**: Teachers can adjust difficulty (3 clues = harder, 11 clues = easier)
- **Learning progression**: Start with more clues, reduce as students improve
- **Cut-and-paste activity**: Bottom blocks can be cut out and matched

### Why Answer Key?
- **Self-checking** for independent work
- **Teacher efficiency** (quick grading)
- **Parent support** (help with homework)

## Technical Architecture

### Canvas System
- **Fabric.js** for canvas manipulation
- **Two independent canvases** (worksheet and answer key)
- **Responsive sizing** with automatic scaling
- **Coordinate-based positioning** (actual vs display dimensions)

### Image Loading
- **Server-side API** (`/api/themes-translated`, `/api/images`)
- **Lazy loading** (theme images load on selection)
- **Search optimization** (server-side filtering)
- **CORS enabled** (crossOrigin="anonymous")

### Export System
- **html2canvas** for JPEG exports
- **jsPDF** for PDF exports
- **6x resolution multiplier** for 300 DPI quality
- **Off-screen rendering** (export area hidden from view)
- **Grayscale conversion** option

### State Management
- **Object flags** track item types (isTrainGeneratedItem, isTrainTemplate, isAnswerKeyItem, isPageBorder, isBorder, isBackground)
- **History tracking** with JSON serialization
- **Transform preservation** during regeneration
- **Auto-regeneration guards** (prevents infinite loops)

## User Flow - Manual Mode

1. **Select Language** (changes alphabet and image library)
2. **Select 11 Letters** (click buttons in alphabet grid)
3. **Choose Theme** or search images
4. **Click images** to assign to letters (auto-matches first letter)
5. **Verify assignments** in "Assigned Images" panel
6. **Configure options** (clue count, name/date, page size, backgrounds, borders)
7. **Click "Create Worksheet"**
8. **Edit on canvas** (drag, rotate, scale, add text, etc.)
9. **Click "Create Answer Key"** (button becomes enabled)
10. **Switch to Answer Key tab** to view/edit
11. **Download** (choose format: JPEG or PDF, enable grayscale if desired)

## User Flow - Auto Mode

1. **Enable "Auto Create" checkbox**
2. **Select specific theme** (not "All Themes")
3. **Configure options** (clue count, name/date, page size, etc.)
4. **Click "Create Worksheet"** (automatically selects 11 random letters and matching images)
5. **Edit on canvas** as desired
6. **Create Answer Key** and download

## Professional Features

- **Undo/Redo** prevents mistakes
- **Lock objects** to prevent accidental changes
- **Unlock All** for bulk unlock
- **Alignment tools** for professional layout
- **Zoom controls** for detailed editing
- **Text customization** for personalized worksheets
- **Upload images** for student-specific content (names, classroom items)
- **300 DPI export** for commercial-quality printing
- **Grayscale option** saves printer ink
- **PDF format** preserves quality across devices

## This App is Perfect For:
- **Alphabet recognition** (early literacy)
- **Letter-sound correspondence** (phonics foundation)
- **Vocabulary building** (word-image association)
- **Fine motor practice** (cut and paste activity)
- **ESL/ELL** (visual vocabulary in 11 languages)
- **Differentiated instruction** (adjustable clue count)
- **Homework packets**
- **Centers/stations** activities
- **Assessment** (check alphabet knowledge)
- **Thematic units** (animals, food, etc.)
