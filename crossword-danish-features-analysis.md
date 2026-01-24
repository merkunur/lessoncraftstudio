# Crossword App - Features Analysis
## Source: REFERENCE APPS/crossword.html

## PRICING VERIFICATION
- **App Name:** Crossword
- **Subscription Tier:** Full Access $240/year
- **Monthly Price:** $25/month
- **Apps Included:** All 33 worksheet generator apps

---

## APP TYPE
Image-based Crossword Generator - Creates crossword puzzles using images and their names/words

---

## ACCORDION SECTIONS (from line 875-1040)

### 1. Image Crossword (Main Section)
**Line 875:** `<button class="accordion-button active" data-translate="crossword">Image Crossword</button>`
- **11 Language Support for Image Library** (lines 878-891)
  - English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
  - Images have localized filenames in all 11 languages
  - **CRITICAL**: Language selection affects which words appear in the crossword

### 2. Page Setup (Line 899)
**Line 899:** `<button class="accordion-button" data-translate="page">Page</button>`
- **Page Size Options** (lines 902-909):
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Custom size (user-defined width/height in pixels)
- **Background Options** (lines 918-927):
  - Fallback color picker
  - Background theme selection (from theme library)
  - Background opacity control (0-1 range)
- **Border Options** (lines 929-938):
  - Border theme selection (from theme library)
  - Border opacity control (0-1 range)

### 3. Text Tools (Line 942)
**Line 942:** `<button class="accordion-button" data-translate="textTools">Text Tools</button>`
- **Add Custom Text to Canvas** (lines 944-946):
  - Content input field
  - "Add Text to Worksheet" button
- **Text Customization** (lines 947-961):
  - Color picker
  - Font size (minimum 8px)
  - Font family selection (7 fonts):
    - Lexend Deca
    - Baloo 2
    - Nunito
    - Quicksand
    - Fredoka
    - Arial
    - Verdana
  - Outline color
  - Outline width (0-10 range, 0.5 step)

### 4. Image Library (Line 966)
**Line 966:** `<button class="accordion-button" data-translate="imageLibrary">Image Library</button>`
- **Generate from Theme** (lines 968-972):
  - Quick theme selection to auto-generate crossword
  - "Or Select Individual Images Below" option
- **Individual Image Selection** (lines 974-984):
  - Theme dropdown filter
  - Search box for finding specific images
  - Available images display
  - Selected images preview area
- **3000+ Images** organized by themes
- **Images named in 11 languages** - crucial for language learning

### 5. Upload Custom Images (Line 988)
**Line 988:** `<button class="accordion-button" data-translate="uploadCustomImages">Upload Custom Images</button>`
- Multi-file upload support (line 991: `multiple accept="image/*"`)
- Custom file button interface
- File count display
- Uploaded images preview area
- **Combine uploaded images with library images**

### 6. Manual Image Name Editing (Line 1003)
**Line 1003:** `<button class="accordion-button" data-translate="manualImageEdit">Manual Image Name Editing</button>`
- Click to add images
- Edit names below images
- **Allows teachers to customize words** used in crossword
- Important for vocabulary control and specific lesson needs

### 7. Custom Word List with Clues (Line 1022)
**Line 1022:** `<button class="accordion-button" data-translate="customWordList">Custom Word List with Clues</button>`
- Textarea input (line 1031)
- Format: `WORD: Clue text`
- Example from line 2178: word:hint pairs
- **Create crosswords without using images**
- **Custom vocabulary lists with definitions/hints**

---

## KEY FEATURES SUMMARY

### Canvas Editing (Standard across all apps)
- **Full editability**: Drag, rotate, scale, delete any element
- **Undo/Redo**: History controls
- **Zoom controls**: Zoom in/out for precise editing
- **Multi-select**: Select and move multiple elements

### Export Features
- **Download formats**: PDF and JPEG
- **Professional quality**: 300 DPI
- **Grayscale option**: Save ink when printing
- **Answer key included**: Automatic solution generation

### Unique Crossword Features
1. **Image-based crosswords** - Pictures create engaging visual clues
2. **Language-specific word generation** - Images named in 11 languages
3. **Theme-based quick generation** - Select theme, auto-create crossword
4. **Custom word lists with clues** - Create traditional crosswords with text clues
5. **Manual image name editing** - Customize vocabulary for specific lessons
6. **Combine library + uploaded images** - Mix professional and personal images

### Educational Value
- **Vocabulary building** in 11 languages
- **Reading and spelling** practice
- **Problem-solving skills** - Figure out word placement
- **Visual learning** - Pictures as clues instead of text
- **Fine motor skills** - If solving on paper

---

## DANISH EDUCATIONAL CONTEXT

### Target Users
- **Børnehaveklasse (0. klasse)** teachers - ages 5-6
- **Indskoling** teachers (0.-3. klasse) - primary grades
- **1. klasse, 2. klasse, 3. klasse** teachers
- **Dansk language** teachers
- **Homeschool parents** (hjemmeundervisning)
- **ESL/Danish as second language** teachers

### Curriculum Applications
- **Læse og skrive** (reading and writing)
- **Stavning** (spelling) practice
- **Ordforråd** (vocabulary) building
- **Bogstaver** (letters) recognition
- **Lære bogstaver** through visual association

### Popular Use Cases in Denmark
- **De 120 ord** (the 120 most common words) practice
- **Tematiske opgaver** (themed exercises) - seasons, holidays
- **Ordgenkendelse** (word recognition)
- **Morfemer og stavelser** (morphemes and syllables)
- **Sammensatte ord** (compound words)

---

## TECHNICAL SPECIFICATIONS

### Page Formats
- Letter: 612×792px (portrait), 792×612px (landscape)
- A4: 595×842px (portrait), 842×595px (landscape)
- Custom: User-defined dimensions

### Fonts Available
- Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
- **Child-friendly fonts** for educational materials

### Export Quality
- 300 DPI for professional printing
- JPEG and PDF formats
- Grayscale option available
- Orientation: Auto-detected (portrait/landscape)

---

## COMPETITIVE ADVANTAGES

1. **11 Languages** - Most crossword generators only support English
2. **Image-based clues** - Visual learning, perfect for young learners and ESL
3. **3000+ professional images** - No need to search for clipart
4. **Full customization** - Edit everything on canvas
5. **Commercial license included** - Sell on Teachers Pay Teachers, Etsy
6. **Unlimited creation** - No per-worksheet fees
7. **Custom word lists** - Traditional text-based crosswords also supported
8. **Manual image editing** - Control exact vocabulary used

---

## WORKFLOW

### Quick Theme Method (Fast)
1. Select language
2. Choose page size
3. Pick a theme (e.g., "Animals", "Food")
4. Click generate
5. Crossword created instantly
6. Edit on canvas if needed
7. Download PDF/JPEG

### Individual Image Method (Custom)
1. Select language
2. Choose page size
3. Browse or search image library
4. Click images to select (10-15 words recommended)
5. Generate crossword
6. Edit placement, add backgrounds, borders
7. Download

### Custom Word List Method (Text-based)
1. Select page size
2. Enter word:clue pairs in textarea
3. Generate crossword
4. Edit on canvas
5. Download

---

## NOTES FOR DANISH APP PAGE

### Emphasize for Danish Market
1. **11 språk** including Dansk
2. **Gratis opgaver til print** once subscribed (no per-worksheet fees)
3. **Arbejdsark** and **kopiark** creation
4. **Læse og skrive** practice
5. **Stavning** development
6. **Børnehaveklasse** through **3. klasse** appropriate
7. **Fælles Mål** compatible (Denmark's national curriculum)
8. **Print-on-demand** license for Teachers Pay Teachers sellers

### Keywords Integration
Focus on these Danish keywords (from keywords.txt):
- Opgaver til print
- Arbejdsark / Kopiark
- Læse og skrive / Stavning
- Lære bogstaver / Skriv bogstaver
- 0. klasse opgaver / 1. klasse
- Matematikopgaver (can create math vocabulary crosswords)
- Gratis skoleopgaver (emphasize unlimited creation)
- Malebog / Farvelægning (crosswords can be colored in)
- Finmotorik øvelser (writing words requires fine motor)
- Gangetabeller (multiplication vocabulary crosswords)

---

## END OF ANALYSIS
