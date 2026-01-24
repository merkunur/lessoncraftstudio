# Word Guess App - Complete Features Analysis
## Source: REFERENCE APPS/word guess.html

## App Overview
**App Name:** Word Guess / Image Clue Grid Worksheet Generator
**Primary Function:** Creates word-guessing puzzles where students identify words from images using letter clues
**Pricing Tier:** Full Access ($240/year or $25/month)

---

## Core Exercise Features

### 1. Puzzle Configuration
- **Number of Puzzles:** 1-10 puzzles per worksheet
- **Puzzle Format:** Grid-based image puzzles with letter clues and blank answer spaces
- **Word Source Options:**
  - Image library (by theme or individual selection)
  - Uploaded custom images
  - Manual image name editing
  - Custom word list (text-only, no images required)

### 2. Difficulty Levels (Letter Clue Settings)
- **No clues:** Students guess with no letters provided
- **Easy (1/2):** Half the letters provided as clues
- **Normal (1/4):** One quarter of letters provided
- **Tough (1/6):** One sixth of letters provided

### 3. Letter Case Options
- **Uppercase letters** (default)
- **Lowercase letters**

### 4. Exclude Letters from Clues
- Custom exclusion: Teacher can exclude specific letters (e.g., vowels "AEIOU") from being shown as clues
- Makes puzzles more challenging for advanced students

### 5. Exercise Options
- **Include Name & Date:** Optional fields for student name and date
- **Include Exercise Numbers:** Number each puzzle (1, 2, 3, etc.) - enabled by default

---

## Image Selection Methods

### Method 1: Theme Selection (Library Images)
- Select from organized theme categories
- Multiple images per theme
- Preview thumbnails with image names
- Click to select/deselect images

### Method 2: Individual Image Selection
- Browse all available images
- Search functionality for finding specific images
- Selected images preview with counter (e.g., "Selected: 5 / 10")

### Method 3: Upload Custom Images
- **Multi-file upload:** Upload multiple images at once
- **Supported formats:** JPEG, PNG, GIF
- **Preview:** Shows uploaded images in preview panel
- **Filenames become puzzle words:** Image filename (without extension) becomes the word to guess
- **Session-based:** Uploaded images available during current editing session

### Method 4: Manual Image Name Editing (NEW FEATURE)
- **Enable manual editing:** Checkbox to activate
- **Edit before generation:** Click library images to add to editing panel
- **Custom names:** Change image names to different words before generating worksheet
- **Use case:** Use "apple.jpg" image but change the word to "fruit" or Italian equivalent

### Method 5: Custom Word List (NEW FEATURE)
- **Text-only mode:** No images required
- **Format:** One word per line in textarea
- **Maximum:** Limited by puzzle count setting (max 8 words shown in notes)
- **Use case:** Pure vocabulary practice without visual clues
- **Useful for:** Spelling practice, sight words, subject-specific terminology

---

## Page Setup Options

### 1. Page Size Presets
- **Letter Portrait:** 612×792 px (8.5" × 11")
- **Letter Landscape:** 792×612 px (11" × 8.5")
- **A4 Portrait:** 595×842 px
- **A4 Landscape:** 842×595 px
- **Square:** 1200×1200 px
- **Custom:** User-defined width and height

### 2. Page Customization
- **Page Color:** Custom background color picker
- **Apply Size button:** Applies selected dimensions to canvas

---

## Visual Customization Features

### 1. Background Themes
- **Theme Selection:** Dropdown with theme categories
- **Preview:** Visual preview of background options
- **Opacity Control:** Slider (0-100%) for background transparency
- **None option:** No background

### 2. Border Themes
- **Theme Selection:** Dropdown with border categories
- **Preview:** Thumbnail preview of border designs
- **Opacity Control:** Slider (0-100%) for border transparency
- **None option:** No border

### 3. Text Tools
- **Add Custom Text:** Input field for adding text elements
- **Font Selection:** Multiple font families:
  - Baloo 2
  - Fredoka
  - Lexend Deca
  - Nunito
  - Quicksand
- **Text Color:** Color picker
- **Font Size:** Adjustable (minimum 8px)
- **Text Outline:** Color and width control (0-10)
- **Disabled until first text added:** Tools activate after adding initial text

---

## 11 Language Support

### UI Languages Available:
1. English
2. Deutsch (German)
3. Français (French)
4. Español (Spanish)
5. Português (Portuguese - Brazilian)
6. Italiano (Italian)
7. Nederlands (Dutch)
8. Svenska (Swedish)
9. Dansk (Danish)
10. Norsk (Norwegian)
11. Suomi (Finnish)

### Language Impact on Content:
- **Image library filenames:** All image names appear in selected language
- **Critical for word puzzles:** Since filenames become the answer words, language selection changes the vocabulary
- **Example:** "apple.jpg" in English library vs "mela.jpg" in Italian library

---

## Canvas Editing Features (Fabric.js)

### Full Editability on Canvas:
- **Drag:** Move any element anywhere on canvas
- **Rotate:** Rotation handles on all objects
- **Scale:** Resize images, text, decorations
- **Delete:** Remove unwanted elements
- **Layer control:** Send to back, bring to front
- **Undo/Redo:** History controls for all actions
- **Zoom:** Zoom in/out for precise editing

### Object Context Toolbar:
- Appears when object selected
- Quick access to editing tools
- Font controls for text objects
- Delete button

---

## Download & Export Features

### 1. Export Formats
- **PDF:** High-quality PDF for printing
- **JPEG:** Image format option

### 2. Quality Settings
- **300 DPI:** Professional print quality
- **Grayscale option:** Save ink for home printing
- **Answer key:** Automatic generation (shows completed words)

### 3. Download Options
- **Worksheet only:** Student version without answers
- **With answer key:** Both versions in single download

---

## Commercial Licensing (POD)

### Included with Full Access Subscription:
- **Print-on-demand license:** Sell worksheets commercially
- **300 DPI commercial quality:** Professional resolution
- **No attribution required:** Use without crediting platform
- **Sales platforms allowed:**
  - Teachers Pay Teachers
  - Etsy
  - Amazon KDP
  - Personal websites
  - Educational marketplaces

---

## Image Library Details

### Library Size:
- **3000+ images:** Child-friendly educational images
- **Theme organization:** Grouped by topic/category
- **Search functionality:** Find specific images quickly
- **Preview thumbnails:** 50×50px thumbnails with names

### Image Display:
- Shows image thumbnail
- Shows filename (becomes puzzle answer)
- Selection state indicated with border color
- Multiple selection supported

---

## Technical Features

### 1. Responsive Design
- Mobile toggle menu
- Desktop sidebar layout
- Touch-friendly controls

### 2. Modern UI Components
- Accordion-style settings panels
- Dark theme sidebar
- Light theme canvas area
- Gradient header with tabs

### 3. Tabs System
- **Create tab:** Main worksheet creation area
- **Preview tab:** (if exists) Preview before download

### 4. Real-time Updates
- Immediate canvas preview
- Live selected image counter
- Dynamic theme loading
- Instant visual feedback

---

## Unique Selling Points vs Competitors

1. **Dual Image Mode:** Use library images OR custom uploads
2. **Manual Name Editing:** Change words without changing images (NEW)
3. **Custom Word List:** Text-only vocabulary practice (NEW)
4. **Letter Exclusion:** Fine-tune difficulty by excluding specific letters
5. **Variable Clue Difficulty:** Four difficulty levels (no clues to tough)
6. **11 Languages:** Localized image names for authentic vocabulary
7. **Full Canvas Control:** Edit everything after generation
8. **Multiple Puzzles:** Create 1-10 puzzles on single worksheet
9. **Commercial License Included:** Sell worksheets at no extra cost
10. **Professional Quality:** 300 DPI for printing or selling

---

## Teaching Use Cases

### 1. Vocabulary Building
- Early readers learning sight words
- ESL/EFL vocabulary practice
- Subject-specific terminology (science, social studies)
- Spelling reinforcement

### 2. Differentiated Instruction
- Adjust difficulty per student level (no clues vs tough)
- Exclude troublesome letters for struggling readers
- Custom word lists for IEP goals
- Variable puzzle counts (1 for beginners, 10 for advanced)

### 3. Assessment
- Spelling tests in puzzle format
- Vocabulary retention checks
- Progress monitoring with increasing difficulty
- Standardized format with exercise numbers

### 4. Homework & Independent Work
- Name and date fields for accountability
- Self-checking with answer keys
- Engaging alternative to traditional worksheets
- Printable for home use

### 5. Multilingual Education
- Bilingual vocabulary practice
- Heritage language learning
- ESL/EFL visual vocabulary
- International schools

### 6. Special Education
- Visual supports for word recognition
- Adjustable difficulty levels
- High-interest images maintain engagement
- Consistent format reduces cognitive load

---

## Analysis Complete
**Total Feature Count:** 50+ distinct features
**Pricing Verified:** Full Access ($240/year)
**Target Users:** K-3 teachers, ESL/EFL educators, special education, homeschool parents
**Primary Value:** Professional vocabulary puzzles in 3 minutes vs 30+ minutes with traditional tools
