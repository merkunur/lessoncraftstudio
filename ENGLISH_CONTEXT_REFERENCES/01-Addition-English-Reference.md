# Addition App - English Context Reference

**App Name**: Image Addition Worksheet Generator
**File**: addition.html
**Date Created**: 2025-11-25
**Purpose**: Document what actually exists in the English version and provide context

---

## USER PERSONA

**Primary Users**:
- Kindergarten teachers (PreK-Grade 2)
- Educational content creators
- Parents creating learning materials

**Context**:
- Creating printable math worksheets for young learners (ages 4-8)
- Quick worksheet creation for classroom or home use
- Desktop/laptop browser environment

**User Characteristics**:
- Varying technical comfort levels
- Need clear, simple language
- Time-constrained (want fast results)
- Focus on educational value, not technical details

**Tone They Expect**:
- Professional but friendly
- Clear instructions
- Action-oriented (buttons tell them what happens)
- Educational terminology they're familiar with

---

## WHAT EXISTS IN ENGLISH

This documents the actual English text that appears in addition.html and translations-addition-complete.js.

---

### APP TITLE

**Key**: `app.title`
**English Text**: "Image Addition Worksheet Generator"
**Where**: Browser tab title
**Function**: Identifies the app purpose
**User Context**: Teacher sees this in browser tab when switching between apps/tabs

---

## SIDEBAR SECTIONS

### 1. WORKSHEET CONTENT SETTINGS

**Key**: `worksheetContentSettings`
**English Text**: "Worksheet Content Settings"
**Where**: First accordion button in sidebar
**Function**: Section header for language settings
**User Context**: Teacher clicks to choose what language appears ON the printed worksheet (Name/Date labels, etc.)

**Key**: `worksheetContentLanguage`
**English Text**: "Worksheet Content Language:"
**Where**: Label inside Worksheet Content Settings
**Function**: Label for dropdown that sets worksheet language
**User Context**: Teacher selects language for the actual worksheet content (different from UI language)
**Note**: Colon indicates a control follows

---

### 2. PAGE SETUP

**Key**: `pageSetup`
**English Text**: "Page Setup"
**Where**: Second accordion button
**Function**: Section for configuring page size, colors, backgrounds, borders
**User Context**: Teacher needs to match their printer/paper type

#### Page Size

**Key**: `pageSize`
**English Text**: "Page Size:"
**Where**: Label for page size dropdown
**Function**: Choose paper dimensions
**User Context**: Teacher picks based on what paper they have

**Key**: `letterPortrait`
**English Text**: "Letter Portrait (612×792)"
**Where**: Dropdown option
**Function**: US standard paper, vertical
**User Context**: Most common in US classrooms
**Note**: Dimensions shown for clarity

**Key**: `letterLandscape`
**English Text**: "Letter Landscape (792×612)"
**Where**: Dropdown option
**Function**: US standard paper, horizontal
**Note**: Dimensions shown for clarity

**Key**: `a4Portrait`
**English Text**: "A4 Portrait (595×842)"
**Where**: Dropdown option
**Function**: International standard paper, vertical
**User Context**: Common outside US
**Translation Note**: German adds "DIN" prefix → "DIN A4 Hochformat"

**Key**: `a4Landscape`
**English Text**: "A4 Landscape (842×595)"
**Where**: Dropdown option
**Function**: International standard paper, horizontal
**Translation Note**: German adds "DIN" prefix → "DIN A4 Querformat"

**Key**: `square`
**English Text**: "Square (1200×1200)"
**Where**: Dropdown option
**Function**: Non-standard square format
**User Context**: Special projects, bulletin boards

**Key**: `custom`
**English Text**: "Custom"
**Where**: Dropdown option
**Function**: User enters specific dimensions
**User Context**: Teacher has non-standard paper or wants specific size

**Key**: `widthPx`, `heightPx`
**English Text**: "Width (px):", "Height (px):"
**Where**: Show when Custom selected
**Function**: Manual dimension entry
**Note**: "px" = pixels (technical but necessary)

**Key**: `pageColor`
**English Text**: "Page Color:"
**Where**: Inside Page Setup
**Function**: Choose background color for page
**User Context**: Teacher wants colored background (not white)

**Key**: `applySize`
**English Text**: "Apply Size"
**Where**: Button in Page Setup
**Function**: Apply the selected/custom page size
**User Context**: Teacher clicks after choosing size

#### Background Subsection

**Key**: `background`
**English Text**: "Background"
**Where**: Subsection header (h4) in Page Setup
**Function**: Organizes background decoration options

**Key**: `backgroundTheme`
**English Text**: "Background Theme:"
**Where**: Label for theme dropdown
**Function**: Choose themed background images
**User Context**: Teacher wants decorative backgrounds (holidays, seasons, etc.)

**Key**: `selectBackgroundTheme`
**English Text**: "Select a theme for backgrounds."
**Where**: Message in background preview area (initially)
**Function**: Instructs teacher what to do
**Tone**: Helpful instruction, complete sentence with period

**Key**: `backgroundOpacity`
**English Text**: "Background Opacity:"
**Where**: Label for slider
**Function**: Controls how visible/transparent background is
**User Context**: Teacher adjusts so background doesn't interfere with math problems
**Note**: "Opacity" = more visible, opposite of "transparency"

#### Border Subsection

**Key**: `border`
**English Text**: "Border"
**Where**: Subsection header (h4) in Page Setup
**Function**: Organizes border decoration options

**Key**: `borderTheme`
**English Text**: "Border Theme:"
**Where**: Label for theme dropdown
**Function**: Choose themed border images
**User Context**: Teacher wants decorative page borders

**Key**: `selectBorderTheme`
**English Text**: "Select a theme to see borders."
**Where**: Message in border preview area (initially)
**Function**: Instructs teacher what to do

**Key**: `borderOpacity`
**English Text**: "Border Opacity:"
**Where**: Label for slider
**Function**: Controls border visibility

**Key**: `none`
**English Text**: "None"
**Where**: Option in both background and border theme dropdowns
**Function**: No decoration
**User Context**: Teacher wants plain worksheet

---

### 3. TEXT TOOLS

**Key**: `textTools`
**English Text**: "Text Tools"
**Where**: Third accordion button
**Function**: Add and style custom text on worksheet
**User Context**: Teacher wants to add instructions, student names, etc.

#### Add New Text

**Key**: `addNewText`
**English Text**: "Add New Text"
**Where**: Subsection header (h4)
**Function**: Section for creating new text elements

**Key**: `content`
**English Text**: "Content:"
**Where**: Label for text input field
**Function**: Teacher types what text to add
**Note**: Generic word for "what to write"

**Key**: `addText`
**English Text**: "Add Text"
**Where**: Button
**Function**: Places typed text onto canvas
**User Context**: Teacher clicks after typing

#### Selected Text Properties

**Key**: `selectedTextProperties`
**English Text**: "Selected Text Properties"
**Where**: Subsection header (h4)
**Function**: Section for editing already-placed text

**Key**: `color`
**English Text**: "Color:"
**Where**: Label for color picker
**Function**: Change text color

**Key**: `size`
**English Text**: "Size:"
**Where**: Label for number input
**Function**: Change font size

**Key**: `font`
**English Text**: "Font:"
**Where**: Label for font dropdown
**Function**: Change typeface
**User Context**: Teacher picks readable fonts for young learners

**Key**: `outlineColor`
**English Text**: "Outline Color:"
**Where**: Label for color picker
**Function**: Add/change colored border around letters
**Note**: "Outline" more user-friendly than technical "Stroke"

**Key**: `outlineWidth`
**English Text**: "Outline Width (0-10):"
**Where**: Label for slider
**Function**: Controls outline thickness
**Note**: Range shown in label for clarity

---

### 4. EXERCISE CONFIGURATION

**Key**: `exerciseConfiguration`
**English Text**: "Exercise Configuration"
**Where**: Fourth accordion button
**Function**: Configure the math problems
**User Context**: Core settings for the worksheet content
**Note**: "Exercise" is educational terminology (not "problem" or "question")

#### Exercise Mode

**Key**: `exerciseMode`
**English Text**: "Exercise Mode"
**Where**: Subsection header (h4)
**Function**: Header for mode selection

**Key**: `selectMode`
**English Text**: "Select Mode:"
**Where**: Label for mode dropdown
**Function**: Choose type of addition problems

**Key**: `modeImageImage`
**English Text**: "Image + Image"
**Where**: Dropdown option
**Function**: Both addends shown as images (e.g., 3 apples + 2 apples)
**User Context**: Most concrete for young learners

**Key**: `modeImageNumber`
**English Text**: "Image + Number"
**Where**: Dropdown option
**Function**: First addend as images, second as numeral
**User Context**: Transition between concrete and abstract

**Key**: `modeFindAddend`
**English Text**: "Find Addend"
**Where**: Dropdown option
**Function**: Missing addend problems (e.g., 3 + ? = 7)
**User Context**: More advanced kindergarten/Grade 1
**Note**: "Addend" is proper math terminology for this age group

**Key**: `modeMixed`
**English Text**: "Mixed Mode"
**Where**: Dropdown option
**Function**: Random variety of all modes on one worksheet
**User Context**: Teacher wants differentiated practice

#### Exercise Parameters

**Key**: `numberOfExercises`
**English Text**: "Number of Exercises (1–10):"
**Where**: Label for number input
**Function**: How many problems on worksheet
**User Context**: Teacher decides based on student abilities/time
**Note**: Range shown; uses "Exercises" not "Problems"

**Key**: `minItemsPerGroup`
**English Text**: "Min items per group (1-10):"
**Where**: Label for number input
**Function**: Smallest number in any addend
**User Context**: Controls difficulty (smaller = easier)
**Note**: "Items" = images shown; "group" = each addend

**Key**: `maxItemsPerGroup`
**English Text**: "Max items per group (1-10):"
**Where**: Label for number input
**Function**: Largest number in any addend
**User Context**: Controls difficulty (larger = harder)

#### Options (Checkboxes)

**Key**: `includeNameDateFields`
**English Text**: "Include Name/Date Fields"
**Where**: Checkbox label
**Function**: Add student identification area at top
**User Context**: Teacher wants students to write their names

**Key**: `showPlusSignBetweenGroups`
**English Text**: "Show '+' Between Image Groups"
**Where**: Checkbox label
**Function**: Display plus symbol between image groups
**User Context**: Teacher decides if explicit + symbol needed

**Key**: `includeExerciseNumbers`
**English Text**: "Include Exercise Numbers"
**Where**: Checkbox label
**Function**: Number problems (1), 2), 3), etc.)
**User Context**: Teacher wants numbered problems for reference

**Key**: `useChildFriendlyBox`
**English Text**: "Use child-friendly box for expressions"
**Where**: Checkbox label
**Function**: Visual style - playful box design vs plain layout
**User Context**: Teacher wants appealing presentation for young kids
**Note**: "Child-friendly" emphasizes kindergarten audience

---

### 5. IMAGE LIBRARY

**Key**: `imageLibrary`
**English Text**: "Image Library"
**Where**: Fifth accordion button
**Function**: Browse and select images for problems
**User Context**: Teacher chooses images relevant to their lesson

**Key**: `selectTheme`
**English Text**: "Select Theme:"
**Where**: Label for theme dropdown
**Function**: Filter images by category
**User Context**: Teacher looking for specific types (animals, food, toys, etc.)

**Key**: `searchImages`
**English Text**: "Search Images:"
**Where**: Label for search input
**Function**: Keyword search across all images
**User Context**: Teacher knows what they want (e.g., "apple")

**Key**: `selectedCount`
**English Text**: "Selected: {} / {}"
**Where**: Status message
**Function**: Shows progress (X selected out of Y needed)
**User Context**: Teacher sees if they've selected enough images
**Note**: {} replaced with numbers

**Key**: `availableImages`
**English Text**: "Available Images:"
**Where**: Label above image grid
**Function**: Header for clickable images

**Key**: `loadingImages`
**English Text**: "Loading images..."
**Where**: Message while images load
**Function**: Tells teacher to wait
**Note**: Ellipsis indicates ongoing process

**Key**: `selectedImagesForProblems`
**English Text**: "Selected Images for Problems:"
**Where**: Label above chosen images area
**Function**: Shows which images will be used
**Note**: "Problems" clarifies purpose

---

### 6. UPLOAD CUSTOM IMAGES

**Key**: `uploadCustomImages`
**English Text**: "Upload Custom Images"
**Where**: Sixth accordion button
**Function**: Add teacher's own images
**User Context**: Teacher wants specific images not in library

**Key**: `selectImagesToUpload`
**English Text**: "Select image(s) to upload:"
**Where**: Label for file input
**Function**: Instructs teacher to choose files
**Note**: "(s)" indicates multiple allowed

**Key**: `chooseFiles`
**English Text**: "Choose Files"
**Where**: Button
**Function**: Opens file browser
**User Context**: Teacher clicks to find images on computer
**Note**: Plural "Files" indicates multiple selection

**Key**: `noFileChosen`
**English Text**: "No file chosen"
**Where**: Status text (initial)
**Function**: Shows no files selected yet

**Key**: `filesSelected`
**English Text**: "{} file(s) selected"
**Where**: Status text (after selection)
**Function**: Confirms how many files chosen
**Note**: {} replaced with count; "(s)" handles singular/plural

**Key**: `yourUploadedImages`
**English Text**: "Your Uploaded Images (This Session):"
**Where**: Label for uploaded images area
**Function**: Header for teacher's uploaded images
**Note**: "Your" personalizes; "(This Session)" clarifies temporary storage

**Key**: `uploadedImagesWillAppearHere`
**English Text**: "Your uploaded images will appear here."
**Where**: Message in empty uploaded images area
**Function**: Tells teacher where uploads will show
**Tone**: Future tense, helpful

---

## CANVAS TOOLBAR

### Layer Controls

**Key**: `bringToFront`
**English Text**: "Bring to Front"
**Where**: Toolbar button
**Function**: Move selected object to topmost layer
**User Context**: Teacher layering decorative elements

**Key**: `bringForward`
**English Text**: "Bring Forward"
**Where**: Toolbar button
**Function**: Move selected object up one layer

**Key**: `sendBackward`
**English Text**: "Send Backward"
**Where**: Toolbar button
**Function**: Move selected object down one layer

**Key**: `sendToBack`
**English Text**: "Send to Back"
**Where**: Toolbar button
**Function**: Move selected object to bottom layer

### Alignment Controls

**Key**: `alignSelected`
**English Text**: "Align Selected:"
**Where**: Label for alignment buttons
**Function**: Header for object alignment controls

**Key**: `alignToPage`
**English Text**: "Align to Page:"
**Where**: Label for page alignment buttons
**Function**: Header for page-centering controls
**Note**: Different from "Align Selected" - this centers on page

---

## TAB BUTTONS

**Key**: `worksheet`
**English Text**: "Worksheet"
**Where**: Tab button above canvas
**Function**: Switch to worksheet view
**User Context**: Main tab teacher works in

**Key**: `answerKey`
**English Text**: "Answer Key"
**Where**: Tab button above canvas
**Function**: Switch to answer key view
**User Context**: Teacher generates solutions for themselves
**Note**: "Answer Key" is proper educational terminology (not "Solutions" or "Answers")

---

## MAIN ACTION BUTTONS

### Unlock Control

**Key**: `unlockAll`
**English Text**: "Unlock All"
**Where**: Button in action bar
**Function**: Unlocks all locked objects at once
**User Context**: Teacher locked elements to prevent accidental moving

### Generate Dropdown

**Key**: `generate`
**English Text**: "Generate"
**Where**: Dropdown button
**Function**: Opens menu to create worksheet/answer key
**User Context**: Teacher ready to create the worksheet
**Translation Pattern**: Other languages use "Create" family verbs (Erstellen, Créer, Crear, etc.) because direct translations of "Generate" sound too technical for kindergarten teachers

**Key**: `generateWorksheet`
**English Text**: "Generate Worksheet"
**Where**: Dropdown menu item
**Function**: Renders math problems on canvas
**User Context**: Teacher clicks to see worksheet
**Translation Pattern**: Other languages use "Create Worksheet" equivalents

**Key**: `generateAnswerKey`
**English Text**: "Generate Answer Key"
**Where**: Dropdown menu item
**Function**: Renders solutions on canvas
**User Context**: Teacher creates answer key for themselves
**Note**: Disabled until worksheet generated
**Translation Pattern**: Other languages use "Create Answer Key" equivalents

### Download Dropdown

**Key**: `download`
**English Text**: "Download"
**Where**: Dropdown button
**Function**: Opens export menu
**User Context**: Teacher ready to save/print

**Key**: `worksheetJpeg`
**English Text**: "Worksheet (JPEG)"
**Where**: Dropdown menu item
**Function**: Export worksheet as JPEG image
**Note**: Format in parentheses for clarity

**Key**: `answerKeyJpeg`
**English Text**: "Answer Key (JPEG)"
**Where**: Dropdown menu item
**Function**: Export answer key as JPEG

**Key**: `worksheetPdf`
**English Text**: "Worksheet (PDF)"
**Where**: Dropdown menu item
**Function**: Export worksheet as PDF
**User Context**: PDF preferred for printing

**Key**: `answerKeyPdf`
**English Text**: "Answer Key (PDF)"
**Where**: Dropdown menu item
**Function**: Export answer key as PDF

**Key**: `grayscale`
**English Text**: "Grayscale"
**Where**: Checkbox in download dropdown
**Function**: Convert to black/white for printing
**User Context**: Teacher wants printer-friendly version
**Note**: "Grayscale" is standard print terminology

### Clear Button

**Key**: `clearAll`
**English Text**: "Clear All"
**Where**: Button in action bar (red/danger style)
**Function**: Removes all content, resets to start
**User Context**: Teacher wants to start over
**Note**: "Clear" implies temporary removal (not permanent delete)

---

## SUCCESS MESSAGES

**Key**: `textAddedToWorksheet`
**English Text**: "Text added to worksheet."
**Tone**: Past tense, calm confirmation with period

**Key**: `worksheetGeneratedSuccessfully`
**English Text**: "Worksheet generated successfully!"
**Tone**: Past tense, enthusiastic with exclamation mark
**Translation Pattern**: Other languages use "created" not "generated"

**Key**: `answerKeyGenerated`
**English Text**: "Answer key generated successfully!"
**Tone**: Enthusiastic confirmation
**Translation Pattern**: Other languages use "created" not "generated"

**Key**: `downloadInitiated`
**English Text**: "Download initiated."
**Tone**: Formal, calm with period

**Key**: `pdfDownloaded`
**English Text**: "PDF downloaded successfully!"
**Tone**: Enthusiastic confirmation

---

## ERROR MESSAGES

**Key**: `pleaseSelectImages`
**English Text**: "Please select images first"
**Tone**: Polite instruction (uses "Please")
**Context**: Teacher tried to generate without selecting images

**Key**: `pleaseGenerateWorksheetFirst`
**English Text**: "Please generate worksheet first."
**Tone**: Polite instruction
**Context**: Teacher tried to generate answer key before worksheet

**Key**: `noImagesFound`
**English Text**: "No images found."
**Tone**: Neutral, informational
**Context**: Search returned no results

---

## LOADING STATES

**Key**: `searching`
**English Text**: "Searching..."
**Pattern**: Present continuous + ellipsis
**Function**: Indicates ongoing search

**Key**: `loadingImages`
**English Text**: "Loading images..."
**Pattern**: Present continuous + ellipsis

**Key**: `loadingBorders`
**English Text**: "Loading borders..."
**Pattern**: Present continuous + ellipsis

**Key**: `loadingBackgrounds`
**English Text**: "Loading backgrounds..."
**Pattern**: Present continuous + ellipsis

**Key**: `preparingFile`
**English Text**: "Preparing file..."
**Pattern**: Present continuous + ellipsis
**Context**: Export file being prepared

---

## FONT NAMES

**Keys**: `fontArial`, `fontComicSans`, `fontCourier`, `fontGeorgia`, `fontTahoma`, `fontTimes`, `fontTrebuchet`, `fontVerdana`, `fontPalatino`

**English Text**: Arial, Comic Sans MS, Courier New, Georgia, Tahoma, Times New Roman, Trebuchet MS, Verdana, Palatino

**Important**: Font names are **proper nouns** - identical in all languages, never translated

---

## TRANSLATION PATTERNS OBSERVED

### Generate vs Create
- **English**: Uses "Generate" (acceptable for English-speaking teachers)
- **Other Languages**: Use "Create" family verbs
- **Why**: Direct translations of "Generate" (German "Generieren", Swedish "Generera", etc.) sound too technical/robotic for kindergarten teachers
- **Each Language**: Uses its natural "create" verb (Erstellen, Créer, Crear, Crea, Criar, Maken, Skapa, Opret, Opprett, Luo)

### Message Tone
- **Small Actions** (add text, clear form): Period, calm
- **Major Actions** (generate, download): Exclamation mark, enthusiastic
- **Errors**: No exclamation marks, polite with "Please" when action needed
- **Loading**: Present continuous "-ing" + ellipsis "..."

### Educational Terminology
- **"Worksheet"** not "Activity Sheet" or "Exercise Sheet"
- **"Answer Key"** not "Solutions" or "Answers"
- **"Exercise"** not "Problem" (more positive)
- **"Addend"** proper math term for kindergarten

### Cultural Notes
- **German A4**: Adds "DIN" prefix (cultural expectation)
- **Portuguese**: Brazilian variant (PT-BR), not European (PT-PT)
- **Font Names**: Never translated in any language

---

## COMPLETION STATUS

✅ English reference based on actual app
✅ User persona: Kindergarten teachers & content creators
✅ Function and context documented
✅ Translation patterns observed (not prescribed)

**Date**: 2025-11-25
**Status**: Complete - Based on actual addition.html and translations-addition-complete.js
